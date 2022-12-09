<?PHP
if( !function_exists("qQuery") ){
include_once("../_datos/config/sql.ini");
eInclude($_Sql);
}
function grabarFichero($file, $txt){
$cdi = date('Y-m-d H:i:s');
file_put_contents($file, $txt);
if( preg_match('(\/all|\/fonts|\/list|\/tab)', $file) || $file=="css/desktop.css" ){
$txt = '(storage)';
if( qCount("{$_SESSION['ShareDictionary']}gs_storage", "type_storage='c' and key_storage='{$file}'")==0 ){
qQuery("insert into {$_SESSION['ShareDictionary']}gs_storage (type_storage,key_storage,cdi,text_es) values ('c','{$file}','{$cdi}','{$txt}')");
}else{
qQuery("update {$_SESSION['ShareDictionary']}gs_storage set cdi='{$cdi}', text_es='{$txt}' where type_storage='c' and key_storage='{$file}'");
}
}
}
if( !function_exists("copyToDir") ){
function copyToDir($pattern, $dir){
foreach(glob($pattern) as $file){
if( !is_dir($file) && is_readable($file) ){
$dest = $dir.basename($file);
copy($file, $dest);
}
}
}
function cambiaVar($txt){
global $cssVar;
list(,$pk) = explode('{$',$txt);
list($pk) = explode('}',$pk);
$pk = trim($pk);
$opk = $pk;
$tmp = "";
if( substr_count($pk, "+")>0 ){
$tmp = explode("+",$pk);
if( $cssVar[$tmp[0]] ){
$tmp[0] = $cssVar[$tmp[0]];
}
if( $tmp[0][0]=="#" ){
$pk = colorTone( $tmp[0], $tmp[1] );
}else{
$x = str_replace("(",",",$pk);
$x = str_replace(")",",",$x);
$pk = colorTone( array($x[1],$x[2],$x[3]), $tmp[1] );
}
}else if( substr_count($pk, "-")>0 ){
$tmp = explode("-",$pk);
$tmp[0] = trim($tmp[0]);
$tmp[1] = trim($tmp[1]);
if( $cssVar[$tmp[0]]!="" ){
$tmp[0] = $cssVar[$tmp[0]];
}
if( $tmp[0][0]=="#" ){
$pk = colorTone( $tmp[0], "-".$tmp[1] );
}else{
$x = str_replace("(",",",$pk);
$x = str_replace(")",",",$x);
$pk = colorTone( array($x[1],$x[2],$x[3]), "-".$tmp[1] );
}
}else if( substr_count($pk, ":")>0 ){
$tmp = explode(":", $pk);
$tmp[0] = trim($tmp[0]);
$tmp[1] = trim($tmp[1]);
if( $tmp[1]=="hex" ){
$x =  str_replace( "(", ",", $cssVar[$tmp[0]] );
$x =  str_replace( ")", ",", $x );
$tmp = explode(",", $x);
$tmp = rgb2hex( array($tmp[1],$tmp[2],$tmp[3]) );
$txt = trim(str_replace('{$'.$pk.'}', $tmp, $txt));
if( substr_count($txt, '{')>0 ){
$txt = cambiaVar( $txt );
}
return $txt;
}
}
if( $pk[0]=="#" ){
$txt = trim(str_replace('{$'.$opk.'}', $pk, $txt));
}else{
$txt = trim(str_replace('{$'.$opk.'}', $cssVar[$pk], $txt));
}
if( substr_count($txt, '{$')>0 ){
$txt = cambiaVar( $txt );
}
return $txt;
}
function cambiaZoom($txt, $zoom, $tipo){
while( strpos($txt,'{%')!==false ){
$i = strpos($txt,'{%');
$f = strpos($txt,'}',$i)+1;
$buscar = substr($txt, $i, $f-$i);
$num = substr($buscar, 2, -1);
if( $zoom==1 || ($tipo=="b" && $num<3) ){
$txt = str_replace($buscar, $num, $txt);
}else{
$valor = number_format($num*$zoom, 0);
if( substr($valor,-3)==".00" ) list($valor) = explode(".", $valor);
$txt = str_replace($buscar, $valor, $txt);
}
}
return $txt;
}
function colorTone($r, $t){
$g = "";
$b = "";
if( gettype($r)=="array" ){
return( [ Op($r[0],$t), Op($r[1],$t), Op($r[2],$t) ] );
}else if( substr($r,0,4)=="rgb(" ){
$r = str_replace("(",",",$r);
$r = str_replace(")",",",$r);
$r = explode(",",$r);
return( [ Op($r[1],$t), Op($r[2],$t), Op($r[3],$t) ] );
}
$t = str_replace("%","",$t)*1;
$r = str_replace("#","",$r);
if( strlen($r)==3 ) $r = $r[0]+$r[0]+$r[1]+$r[1]+$r[2]+$r[2];
$g = hexdec($r[2].$r[3]);
$b = hexdec($r[4].$r[5]);
$r = hexdec($r[0].$r[1]);
return( "#".Op($r,$t).Op($g,$t).Op($b,$t) );
}
function Op($c, $t){
$inc = $t>0 ? floor(((256-$c)*$t)/100) : -floor(($c*($t*-1))/100);
$c = dechex($c+$inc);
return (strlen($c)<2 ? "0":"").$c;
}
function rgb2hex($c){
return "#". str_pad( dechex($c[0]*1), 2, "0", STR_PAD_LEFT). str_pad( dechex($c[1]*1), 2, "0", STR_PAD_LEFT). str_pad( dechex($c[2]*1), 2, "0", STR_PAD_LEFT);
}
}
if( !is_dir("css{$_Sufijo}") ){
mkdir("css{$_Sufijo}");
chmod("css{$_Sufijo}", 0666);
copyToDir("css/"."*", "css{$_Sufijo}/");
}
$FileCore = "../_datos/config/core{$_Sufijo}.css";
$dim = file($FileCore);
$FileGen = array(
"desktop.css",
"login_web.css",
"all.css",
"tab.css",
"list.css",
"fonts.css"
);
$rem = false;
$grupo = false;
$txtgrupo = "";
$nmgroup = "";
$nmvar = "";
$css = "";
$valor = "";
$cssVar = array();
global $cssVar;
$cssVar["iconSelectPNG"] = "data:image/png;base64,".base64_encode(file_get_contents("../../edesweb/a/g/sel.png"));
$cssVar["HeightTitleIcon"] = $_SESSION["HeightTitleIcon"];
$cssVar["HeightTitleIconWin"] = $_SESSION["HeightTitleIconWin"];
$cssVar["fBase"] = 14;
$cssVar["fBaseBIG"] = 18;
$cssVar["fBaseTLF"] = 50;
$cssVar["fBaseSmall"] = 10;
$cssVar["fIconTab"] = 10;
$cssVar["fIconTabBIG"] = 12;
$cssVar["fIconTabSmall"] = 8;
for($n=0; $n<count($dim); $n++){
$dim[$n] = trim($dim[$n]);
if( substr($dim[$n],0,7)=='$fBase:' ){
list(,$fBase) = explode(":",$dim[$n]);
list($cssVar["fBase"]) = explode("px",$fBase);
}else if( substr($dim[$n],0,10)=='$fBaseBIG:' ){
list(,$fBaseBIG) = explode(":",$dim[$n]);
list($cssVar["fBaseBIG"]) = explode("px",$fBaseBIG);
}else if( substr($dim[$n],0,12)=='$fBaseSmall:' ){
list(,$fBaseSmall) = explode(":",$dim[$n]);
list($fBaseSmall) = explode("px",$fBaseSmall);
}else if( substr($dim[$n],0,10)=='$fIconTab:' ){
list(,$fIconTab) = explode(":",$dim[$n]);
list($cssVar["fIconTab"]) = explode("px",$fIconTab);
}else if( substr($dim[$n],0,13)=='$fIconTabBIG:' ){
list(,$fIconTabBIG) = explode(":",$dim[$n]);
$cssVar["fIconTabBIG"] = explode("px",$fIconTabBIG);
}else if( substr($dim[$n],0,15)=='$fIconTabSmall:' ){
list(,$fIconTabSmall) = explode(":",$dim[$n]);
$cssVar["fIconTabSmall"] = explode("px",$fIconTabSmall);
}else if( substr($dim[$n],0,10)=='$fBaseTLF:' ){
list(,$fBaseTLF) = explode(":",$dim[$n]);
list($cssVar["fBaseTLF"]) = explode("px",$fBaseTLF);
}else if( substr($dim[$n],0,15)=='$inputPaddingV:' ){
list(,$inputPaddingV) = explode(":",$dim[$n]);
$inputPaddingV = trim($inputPaddingV);
}
}
$cssVar["fBase"] = trim($cssVar["fBase"]);
$cssVar["fBaseBIG"] = trim($cssVar["fBaseBIG"]);
$cssVar["fBaseTLF"] = trim($cssVar["fBaseTLF"]);
$cssVar["fBaseSmall"] = trim($cssVar["fBaseSmall"]);
$cssVar["fIconTab"] = trim($cssVar["fIconTab"]);
$cssVar["fIconTabBIG"] = trim($cssVar["fIconTabBIG"]);
$cssVar["fIconTabSmall"] = trim($cssVar["fIconTabSmall"]);
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" ) continue;
if( substr($txt,0,2)=="/"."*" ){
$rem = true;
continue;
}else if( substr($txt,0,2)=="*"."/" ){
$rem = false;
continue;
}else if( $rem ){
continue;
}
if( $txt[0]=="/" ) continue;
list($txt) = explode("/"."/",$txt);
$txt = trim($txt);
if( $txt[0]=="$" ){
if( substr($txt,-1)=="{" ){
$grupo = true;
list(,$nmgroup) = explode("$",$txt);
list($nmgroup) = explode("{",$nmgroup);
$nmgroup = trim($nmgroup);
$txtgrupo = "";
continue;
}else{
eExplodeOne($txt,":",$tmp[0],$tmp[1]);
$nmvar = trim(substr($tmp[0],1));
$valor = trim($tmp[1]);
if( substr_count($valor, '{$')>0 ) $valor = cambiaVar( $valor );
$cssVar[$nmvar] = $valor;
}
}else if( $txt=="}" && $grupo ){
$grupo = false;
$cssVar[$nmgroup] = $txtgrupo;
}else if( substr_count($txt, '{$')>0 ){
$txt = cambiaVar( $txt );
}else if( $txt[0]=="[" ){
$nmvar = trim(substr(str_replace('$','',$txt),1));
$valor = "";
if( $nmvar=="CSSADD" ){
$valor .= "/"."* CSSADD:INI *"."/\n";
}
for($i=$n+1; $i<count($dim); $i++){
$txt = trim($dim[$i]);
if( $txt=="]" ){
if( $nmvar=="CSSADD" ){
$valor .= "/"."* CSSADD:END *"."/\n";
}
if( $nmvar=="FUENTES" || $nmvar=="FUENTES-eDes" ){
$cssVar[$nmvar.".."] = str_replace("../fonts/", "fonts/", $valor);
}
$cssVar[$nmvar] = $valor;
$n = $i;
break;
}else{
$valor .= $txt."\n";
}
}
}
if( $grupo ){
$txtgrupo .= ($txtgrupo!="" ? "\n":"").$txt;
}
}
$cssVar["fBase"] = trim($cssVar["fBase"]);
$cssVar["fBaseBIG"] = trim($cssVar["fBaseBIG"]);
$cssVar["fBaseTLF"] = trim($cssVar["fBaseTLF"]);
$cssVar["fBaseSmall"] = trim($cssVar["fBaseSmall"]);
eFilePutVar('/_datos/config/group.var', array(
array("cListGrid", $cssVar["cListGrid"])
));
$FontFamilyNumber = $_SESSION["CSSDynamic"]["FontNumbers"];
$zoomBIG = (int)$cssVar["fBaseBIG"] / (int)$cssVar["fBase"];
$zoomTLF = (int)$cssVar["fBaseTLF"] / (int)$cssVar["fBase"];
$zoomSmall = (int)$cssVar["fBaseSmall"] / (int)$cssVar["fBase"];
$cssVar["imgZoom"] = "100%";
for($i=0; $i<count($FileGen); $i++){
$txt = file_get_contents('../_datos/config/'.$FileGen[$i]);
$newTxt = "";
$rem = false;
$txt = str_replace('{$CSSADD}', $cssVar["CSSADD"], $txt);
foreach($cssVar as $k=>$v){
$txt = str_replace('{$'.$k.'}', $v, $txt);
}
$dim = explode("\n",$txt);
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" ) continue;
if( substr($txt,-1)=="{" ) $txt = trim(substr($txt,0,-1))."{";
if( substr_count($txt, ":")==1 ){
list($iz, $dch) = explode(":", $txt);
$txt = trim($iz).':'.trim($dch);
}
if( substr($txt,0,10)=="/"."* CSSADD:" ){
$newTxt .= $txt."\n";
continue;
}else if( $txt=="/"."*" ){
$rem = true;
continue;
}else if( $txt=="*"."/" ){
$rem = false;
continue;
}else if( $rem ){
continue;
}
list($txt) = explode("/"."*", $txt);
$txt = trim($txt);
if( $txt=="" ) continue;
if( substr_count($txt,":")>0 ){
eExplodeOne($txt,":",$tmp[0],$tmp[1]);
$txt = trim($tmp[0]).":".trim($tmp[1]);
}
$newTxt .= $txt."\n";
}
if( $FileGen[$i]=="all.css" ){
$op = array("n","display:none", "c","text-align:center", "l","text-align:left", "r","text-align:right");
for($s=0; $s<60; $s++){
for($n=0; $n<8; $n+=2){
$newTxt .= ".col_".$s.$op[$n]." th:nth-child(".($s+1)."), .col_".$s.$op[$n]." td:nth-child(".($s+1)."){".$op[$n+1].";}"."\n";
}
}
for($s=0; $s<60; $s++){
$newTxt .= ".col_".$s."ff td:nth-child(".($s+1)."){font-family:".$FontFamilyNumber.";}"."\n";
}
}
$newTxt = str_replace('{ ','{',$newTxt);
$newTxt = str_replace(' }','}',$newTxt);
$newTxt = str_replace(';;',';',$newTxt);
$newTxt = trim($newTxt);
$txt = cambiaZoom($newTxt, 1, "n");
$txt = str_replace(array('{$FUENTES}','{$CSSADD}'), array('',''), $txt);
$txt = str_replace(array(chr(10),chr(13)), array("",""), $txt);
grabarFichero("css{$_Sufijo}/".$FileGen[$i], $txt);
}
$cssVar["fBase"] = $cssVar["fBaseBIG"];
$cssVar["fIconTab"] = $cssVar["fIconTabBIG"];
$cssVar["imgZoom"] = number_format($zoomBIG*100, 0)."%";
for($i=0; $i<count($FileGen); $i++){
$txt = file_get_contents('../_datos/config/'.$FileGen[$i]);
$newTxt = "";
$rem = false;
foreach($cssVar as $k=>$v){
$txt = str_replace('{$'.$k.'}', $v, $txt);
}
$dim = explode("\n",$txt);
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" ) continue;
if( $txt=="/"."*" ){
$rem = true;
continue;
}else if( $txt=="*"."/" ){
$rem = false;
continue;
}else if( $rem ){
continue;
}
list($txt) = explode("/"."*", $txt);
$txt = trim($txt);
if( $txt=="" ) continue;
if( substr_count($txt,":")>0 ){
eExplodeOne($txt,":",$tmp[0],$tmp[1]);
$txt = trim($tmp[0]).":".trim($tmp[1]);
}
$newTxt .= $txt."\n";
}
if( $FileGen[$i]=="all.css" ){
$op = array("n","display:none", "c","text-align:center", "l","text-align:left", "r","text-align:right");
for($s=0; $s<60; $s++){
for($n=0; $n<8; $n+=2){
$newTxt .= ".col_".$s.$op[$n]." th:nth-child(".($s+1)."), .col_".$s.$op[$n]." td:nth-child(".($s+1)."){".$op[$n+1].";}"."\n";
}
}
for($s=0; $s<60; $s++){
$newTxt .= ".col_".$s."ff td:nth-child(".($s+1)."){font-family:".$FontFamilyNumber.";}"."\n";
}
$newTxt .= '.SELECTINPUT INPUT {background-size:'.number_format($zoomBIG*8, 2).'px;}';
}
$newTxt = str_replace('{ ','{',$newTxt);
$newTxt = str_replace(' }','}',$newTxt);
$newTxt = str_replace(';;',';',$newTxt);
$newTxt = trim($newTxt);
$txt = cambiaZoom($newTxt, $zoomBIG, "b");
$txt = str_replace(array('{$FUENTES}','{$CSSADD}'), array('',''), $txt);
$txt = str_replace(array(chr(10),chr(13)), array("",""), $txt);
grabarFichero("css{$_Sufijo}/".str_replace(".css", "_big.css", $FileGen[$i]), $txt);
}
$cssVar["fBase"] = $cssVar["fBaseTLF"];
$cssVar["imgZoom"] = number_format($zoomTLF*100, 0)."%";
for($i=0; $i<count($FileGen); $i++){
$txt = file_get_contents('../_datos/config/'.$FileGen[$i]);
$newTxt = "";
$rem = false;
foreach($cssVar as $k=>$v){
$txt = str_replace('{$'.$k.'}', $v, $txt);
}
$dim = explode("\n",$txt);
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" ) continue;
if( $txt=="/"."*" ){
$rem = true;
continue;
}else if( $txt=="*"."/" ){
$rem = false;
continue;
}else if( $rem ){
continue;
}
list($txt) = explode("/"."*", $txt);
$txt = trim($txt);
if( $txt=="" ) continue;
if( substr_count($txt,":")>0 ){
eExplodeOne($txt,":",$tmp[0],$tmp[1]);
$txt = trim($tmp[0]).":".trim($tmp[1]);
}
$newTxt .= $txt."\n";
}
if( $FileGen[$i]=="all.css" ){
$op = array("n","display:none", "c","text-align:center", "l","text-align:left", "r","text-align:right");
for($s=0; $s<60; $s++){
for($n=0; $n<8; $n+=2){
$newTxt .= ".col_".$s.$op[$n]." th:nth-child(".($s+1)."), .col_".$s.$op[$n]." td:nth-child(".($s+1)."){".$op[$n+1].";}"."\n";
}
}
for($s=0; $s<60; $s++){
$newTxt .= ".col_".$s."ff td:nth-child(".($s+1)."){font-family:".$FontFamilyNumber.";}"."\n";
}
$newTxt .= '.SELECTINPUT INPUT {background-size:'.number_format($zoomTLF*8, 2).'px;}';
}
$newTxt = str_replace('{ ','{',$newTxt);
$newTxt = str_replace(' }','}',$newTxt);
$newTxt = str_replace(';;',';',$newTxt);
$newTxt = trim($newTxt);
$txt = cambiaZoom($newTxt, $zoomTLF, "t");
$txt = str_replace(array('{$FUENTES}','{$CSSADD}'), array('',''), $txt);
$txt = str_replace(array(chr(10),chr(13)), array("",""), $txt);
grabarFichero("css{$_Sufijo}/".str_replace(".css", "_tlf.css", $FileGen[$i]), $txt);
}
$cssVar["fBase"] = $cssVar["fBaseSmall"];
$cssVar["fIconTab"] = $cssVar["fIconTabSmall"];
$cssVar["imgZoom"] = number_format($zoomSmall*100, 0)."%";
for($i=0; $i<count($FileGen); $i++){
$txt = file_get_contents('../_datos/config/'.$FileGen[$i]);
$newTxt = "";
$rem = false;
foreach($cssVar as $k=>$v){
$txt = str_replace('{$'.$k.'}', $v, $txt);
}
$dim = explode("\n",$txt);
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" ) continue;
if( $txt=="/"."*" ){
$rem = true;
continue;
}else if( $txt=="*"."/" ){
$rem = false;
continue;
}else if( $rem ){
continue;
}
list($txt) = explode("/"."*", $txt);
$txt = trim($txt);
if( $txt=="" ) continue;
if( substr_count($txt,":")>0 ){
eExplodeOne($txt,":",$tmp[0],$tmp[1]);
$txt = trim($tmp[0]).":".trim($tmp[1]);
}
$newTxt .= $txt."\n";
}
if( $FileGen[$i]=="all.css" ){
$op = array("n","display:none", "c","text-align:center", "l","text-align:left", "r","text-align:right");
for($s=0; $s<60; $s++){
for($n=0; $n<8; $n+=2){
$newTxt .= ".col_".$s.$op[$n]." th:nth-child(".($s+1)."), .col_".$s.$op[$n]." td:nth-child(".($s+1)."){".$op[$n+1].";}"."\n";
}
}
for($s=0; $s<60; $s++){
$newTxt .= ".col_".$s."ff td:nth-child(".($s+1)."){font-family:".$FontFamilyNumber.";}"."\n";
}
$newTxt .= '.SELECTINPUT INPUT {background-size:'.number_format($zoomSmall*8, 2).'px;}';
}
$newTxt = str_replace('{ ','{',$newTxt);
$newTxt = str_replace(' }','}',$newTxt);
$newTxt = str_replace(';;',';',$newTxt);
$newTxt = trim($newTxt);
$txt = cambiaZoom($newTxt, $zoomSmall, "b");
$txt = str_replace(array('{$FUENTES}','{$CSSADD}'), array('',''), $txt);
$txt = str_replace(array(chr(10),chr(13)), array("",""), $txt);
grabarFichero("css{$_Sufijo}/".str_replace(".css", "_small.css", $FileGen[$i]), $txt);
}
$cdi = "";
$campo = "text_{$_SESSION['_LANGUAGE_']}";
$where = "";
if( $_GET['e_cdi']!="" ){
$where = "where cdi>'{$_GET['e_cdi']}'";
}
qQuery("select * from {$_SESSION['ShareDictionary']}gs_storage {$where} order by cdi");
while($r=qArray()){
if( $r['type_storage']=="c" ){
$text = addslashes(file_get_contents($r['key_storage']));
$text = str_replace(array(chr(10), chr(13)), array("&#0A;","&#0D;"), $text);
echo "localStorage.setItem('e-{$r['type_storage']}{$r['key_storage']}', '{$text}');";
}else{
if( $r['type_storage']=="r" ){
$text = addslashes($r["text_es"]);
}else{
$text = addslashes($r[$campo]);
if( $text=="" ) $text = addslashes($r["text_es"]);
}
$text = str_replace(array(chr(10), chr(13)), array("&#0A;","&#0D;"), $text);
echo "localStorage.setItem('e-{$r['type_storage']}{$r['key_storage']}', '{$text}');";
}
if( $r['cdi']>$cdi ) $cdi = $r['cdi'];
}
if( $cdi!="" ) echo "localStorage.setItem('e-cdi', '{$cdi}');";
?>
