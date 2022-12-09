<?PHP
eInit(true, true);
echo '</head><body>';
include('../_datos/desktop.ini');
$_gsMaster = $_SESSION["_D_"];
$_gsNomUser = $_SESSION["_Email_"];
$tmp = array();
RecuperaArboles($tmp);
echo '<script type="text/javascript">var op=[';
$enter = "\n";
$enter = "";
$dimUrl = array();
$dimNop = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
$indent = 0;
$uindent = 0;
$tipo = "";
$utipo = "F";
$nop = 0;
$padre = array();
$addOptions = array();
for($n=0; $n<count($tmp); $n++){
if( $tmp[$n]["caption"]=="" ) continue;
$tmp[$n]["caption"] = str_replace('"', '&#34;', $tmp[$n]["caption"]);
$tmp[$n]["script_url"] = str_replace('"', '&#34;', $tmp[$n]["script_url"]);
$indent = $tmp[$n]["indent"]*1;
$tipo = $tmp[$n]["type"];
if( $indent<$uindent ){
for($i=$indent; $i<$uindent; $i++){
echo "]]";
echo $enter;
}
}
if( $tmp[$n]["script_url"][0]==":" ){
$padre[$indent] = substr($tmp[$n]["script_url"],1);
}
if( $tmp[$n]["type"]=="-" || $tmp[$n]["type"]=="L" ){
if( $utipo<>"F" ) echo ",";
echo "['-']".$enter;
}else if( $tmp[$n]["type"]=="F" ){
if( $utipo<>"F" ) echo ",";
echo '["'.$tmp[$n]["caption"].'", "", "'.$tmp[$n]["script_url"].'", ['.$enter;
$uindent = $indent;
$utipo = $tipo;
continue;
}else if( $tmp[$n]["type"]=="O" ){
if( $utipo<>"F" ) echo ",";
echo '["'.$tmp[$n]["caption"].'", "", "'.$tmp[$n]["script_url"].'"'."]".$enter;
$Icon = $tmp[$n]["icon"];
$Url = $tmp[$n]["script_url"];
if( substr($Url,-1)==":" ){
$sUrl = $Url.$padre[$indent-1];
}else{
$sUrl = $Url;
}
$sUrl = trim($sUrl);
if( substr($sUrl,-1)!=")" && substr($sUrl,-2)!=");" && $sUrl!="edes.php?u" ){
$bak = $sUrl;
if( $sUrl[0]=="¿" ){
list(,$sUrl) = explode("?", $sUrl);
$sUrl = trim($sUrl);
}
if( substr($sUrl,0,9)=="edes.php?" ) $sUrl = substr($sUrl,9);
if( substr($sUrl,0,8)=="edes.gs?" ) $sUrl = substr($sUrl,8);
list($sUrl) = explode(".", $sUrl);
list($sUrl) = explode("&", $sUrl);
if( $sUrl[0]=="?" ) $sUrl = substr($sUrl,1);
if( $sUrl[0]=="2" ) $sUrl = substr($sUrl,1);
if( $sUrl[0]=="3" ) $sUrl = substr($sUrl,1);
if( $sUrl[0]=="w" ) $sUrl = substr($sUrl,1);
if( $sUrl[0]=="W" ) $sUrl = substr($sUrl,1);
if( $sUrl[0]=="#" ) $sUrl = "F".substr($sUrl,1);
if( $sUrl[0]=="@" ) $sUrl = "G".substr($sUrl,1);
if( $sUrl[0]=="=" ) $sUrl = "L".substr($sUrl,1);
if( $sUrl[0]==">" ) $sUrl = "E:".substr($sUrl,1);
if( $sUrl[0]!="^" ){
$addOptions[] = $sUrl."|".$Icon;
}
}
}else{
}
$uindent = $indent;
$utipo = $tipo;
$nop++;
}
if( $indent>0 ){
for($i=0; $i<$indent; $i++){
echo "]]";
}
}
echo "];";
$txt = file_get_contents('../_tmp/php/'.$_SESSION['_G_'].'menu.'.$_User).implode(chr(10),$addOptions);
file_put_contents('../_tmp/php/'.$_SESSION['_G_'].'menu.'.$_User, $txt);
if( $_GET["Development"]=="Tree" ) $_GET["Development"] = "System";
?>
if( op.length==0 ){
top.eInfo(top, "No hay opciones", 3);
}else{
if( S("#TREEMAIN", top).exists() ){
if( !S("#Tree_<?=$_GET["Development"]?>",top).exists() ){
top.S("body").tree(op, {expanded:false, modal:true, icon:"system", id:"Tree_<?=$_GET["Development"]?>"});
S(S("#TREEMAIN",top).obj.children[0]).tr("O", null, '<tr nivel=0 a=1 op="" open="+" id="addTree_<?=$_GET["Development"]?>"><td class="UnPX"><i class="ICONWINDOW" eicon="©ª">©</i></td><td><?=$_GET["Development"]?></td><td class="UnPX"><i class="ICONWINDOW">M</i></td></tr>');
S(S("#TREEMAIN",top).obj.children[0]).tr("O", null, '<tr nivel=0 a=2 style="display:none;"><td colspan="3" class="TAB">'+S(S("#Tree_<?=$_GET["Development"]?>",top).obj.children[0]).HTML()+'</td></tr>');
S("#Tree_<?=$_GET["Development"]?>",top).nodeRemove();
}
}else{
var nomTree = '#TREEMAIN2_wepe',
TreePersonal = "Tree_<?=$_GET["Development"]?>";
if( !S(nomTree, top).exists() ){
S('<span class="TREE" id="'+S.left(nomTree,1,0)+'" on-contextmenu="eTreeCollaps()" style="z-index:3; position:absolute; top:0px; left:0px; display:block; height:100%; overflow: hidden auto; width: 309px;" onselectstart="return false" edesclick="1"></span>', top).nodeEnd();
if( !S("#arSTOOLS", top).exists() ){
top._CrearAccesosDirectos();
<?PHP
if( qCount("{$_SESSION['ShareDictionary']}gs_language", "tf_translation='S'")>1 ){
?>
if(S('#arSTOOLS',top).length>0){
S('#eIDIOMA','#arSTOOLS',top).text('<?=$_SESSION['_LANGUAGE_']?>');
S('#eIDIOMA','#arSTOOLS',top).block('table-cell');
}
<?PHP
$dimLanguage = "top['_DimLanguage']=[['-Idioma']";
qQuery("select * from {$_SESSION['ShareDictionary']}gs_language where tf_translation='S' order by nm_gs_language");
while($r=qArray()){
$dimLanguage .= ",['{$r['nm_gs_language']}','','{$r['cd_gs_language']}'";
if( $r['cd_gs_language']==$_SESSION['_LANGUAGE_'] ){
$dimLanguage .= ",null,null,'font-weight:bold']";
}else{
$dimLanguage .= ",null,null,null]";
}
}
$dimLanguage .= "];";
echo $dimLanguage;
}
?>
}
}
if( !S("#"+TreePersonal,top).exists() ){
top.S(nomTree,top).tree(op, {expanded:false, modal:false, icon:"system", id:TreePersonal, container:S(nomTree, top).obj});
S("#"+TreePersonal, top).nodeRemove();
var n = S(nomTree, top).obj.children.length-1;
S(nomTree, top).obj.children[n].style.height = "1px";
S(nomTree, top).obj.children[n].id = TreePersonal;
}
}
if( S.getCookie()["eDesURL"]!=undefined ) top._AccesosDirectos(1);
S("#_TreeUserIcon", top).block();
top.S.toDo();
}
<?PHP
if( $_GET["Development"] && file_exists("../_d_/usr/opworking.".$_SESSION["_User"]) ){
setcookie("eDesURL", trim(file_get_contents("../_d_/usr/opworking.".$_SESSION["_User"])));
}
echo '</script>';
echo '</body></html>';
eEnd();
function RecuperaArboles(&$tmp){
global $_gsMaster, $_Development, $Dir_;
if( substr_count('~AMP',$_gsMaster)==1 ){
if( $_Development ){
if( $_SERVER['HTTP_HOST']=='localhost' ){
$Menu[]  = '{$edes_l.gif}';
}else{
$Menu[]  = '{$edes.gif}';
}
}else{
$Menu[]  = '{$edes_p.gif}';
}
$ShowType[] = '';
$Alias[]    = '';
$VerURL = false;
if( $_gsMaster=='~' ){
$VerURL = true;
}
if( $_GET["Development"]=="Tree" ){
if( $_gsMaster=='~' ) RecuperaArbol2($Dir_.'t/__edes.arb', $tmp);
if( substr_count('~A',$_gsMaster)==1 ) RecuperaArbol2($Dir_.'t/__analista.arb', $tmp);
if( substr_count('~AM',$_gsMaster)==1 ){
if( substr_count('~A',$_gsMaster)==1 ){
$Menu[] = "\t-";
$ShowType[] = '';
$Alias[] = '';
}
RecuperaArbol2($Dir_.'t/__master.arb', $tmp);
}
if( substr_count('~AMP',$_gsMaster)==1 ) RecuperaArbol2($Dir_.'t/__programador.arb', $tmp);
}
if( $_GET["Development"]=="Personal" ){
if( substr_count('~AMP',$_gsMaster)==1 ) RecuperaArbol2('../tree/__personal.'.str_replace(' ','',strtolower($_SESSION["_LoginUser"])), $tmp);
}
}
}
function RecuperaArbol2($NomFile, &$tmp){
global $_User, $_Node, $_aUser, $_DocSecurity, $_gsACCESO, $_TreeOptions, $_DimTree;
if( file_exists($NomFile)!=1 && is_readable($NomFile)!=1 ) return;
$DimIdioma = array();
qQuery("select * from {$_SESSION['ShareDictionary']}gs_language where tf_translation='S' order by nm_gs_language");
while( $r=qArray() ) $DimIdioma[] = array( trim($r['cd_gs_language']), eUcFirst(trim($r['nm_gs_language'])) );
$fd = fopen($NomFile, 'r');
$Todo = fread($fd, filesize($NomFile));
fclose($fd);
$dim = explode(chr(10), gzuncompress($Todo));
if( substr_count($NomFile, "__personal")>0 ){
$oEmail = $dim[0];
if( trim(substr($oEmail,11))!=$_SESSION["_LoginUser"] ){
return;
}
}
for($n=1; $n<count($dim); $n++){
$xLine = $dim[$n];
if( trim($xLine)=="" ) continue;
list($macro1, $macro) = explode('|', $dim[$n]);
$sMacro1 = $macro1;
$macro1 = trim($macro1);
$macro  = trim($macro);
if( $macro1[0]=='.' ) continue;
if( $macro==':eEditConfidential' || $macro==':eEditKeyHelp' ){
if( $_DocSecurity || $macro==':eEditKeyHelp' ){
$i = $n+1;
if( count($DimIdioma) > 0 ){
for( $p=0; $p<count($DimIdioma); $p++ ){
array_splice( $dim, $i, 0, str_repeat(chr(9),strlen($dim[$n])-strlen(ltrim($dim[$n]))+1).$DimIdioma[$p][1]."|".substr($macro,1)."('".$DimIdioma[$p][0]."')" );
$i++;
}
$macro = '';
}else{
$macro = substr($macro,1).'("_es")';
}
}else{
continue;
}
}
if( substr($macro,0,6)=='@LNGS@' ){
$i = $n+1;
$sMacro = substr($macro,6);
if( count($DimIdioma)>0 ){
for( $p=0; $p<count($DimIdioma); $p++ ){
array_splice( $dim, $i, 0, str_repeat(chr(9),strlen($dim[$n])-strlen(ltrim($dim[$n]))+1).$DimIdioma[$p][1]."|". $sMacro[0].str_replace('#',$DimIdioma[$p][0],substr($sMacro,1)) );
$i++;
}
$dim[$n] = str_replace( $macro, '', $dim[$n] );
$macro = '';
}else{
$macro = $sMacro[0].str_replace('#','es',substr($sMacro,1));
$dim[$n] = $sMacro1.'|'.$macro;
}
}
if( $macro1!='' ){
if( $macro1[0]=='-' && substr_count($macro1,'¿')>0 ){
list( ,$macro1 ) = explode('¿',$macro1);
$macro1 = trim(substr( $macro1,0,-1 ));
if( !( @eval('return ('.$macro1.');')) ) continue;
$dim[$n] = '-';
}
}
if( $macro!='' ){
if( $macro[0]=='¿' ){
list($macro) = explode('?', $macro);
$macro = trim(substr($macro, 1));
if( !( @eval('return ('.$macro.');')) ) continue;
$dim[$n] = substr($dim[$n],0,strpos($dim[$n],'¿')).trim(substr($dim[$n],strpos($dim[$n],'?')+1));
$xLine = substr($xLine,0,strpos($xLine,'¿')).trim(substr($xLine,strpos($xLine,'?')+1));
}
}
if( substr_count($dim[$n],'~')>1 ){
$xTmp = explode('~',$dim[$n]);
$dim[$n] = $xTmp[0].'~'.$xTmp[1];
$xAlias = trim($xTmp[2]); if( $xAlias!='' ) $xAlias = '.'.$xAlias;
$xShow = trim($xTmp[3]);
}else{
$xAlias = '';
$xShow = '';
}
$Menu[] = chop("\t".$dim[$n]);
$ShowType[] = $xShow;
$Alias[] = $xAlias;
$dim2 = explode('~',$xLine);
$item = explode('|',$dim2[0]);
$indent = strlen($item[0])-strlen(ltrim($item[0]));
$icon = "";
$item[0] = trim($item[0]);
$item[1] = trim($item[1]);
if( $item[0][0]=="[" || $item[0][0]=="{" ){
if( $item[0][0]=="[" ){
list($icon, $item[0]) = explode(']',substr($item[0],1));
}else{
list($icon, $item[0]) = explode('}',substr($item[0],1));
}
$icon = trim($icon);
}
$item[0] = trim($item[0]);
if( $item[0][0]=="-" ){
$tipoOp = "L";
}else if( $item[1]=="" || $item[1][0]==":" ){
$tipoOp = "F";
if( $item[1]=="" && $n+1<count($dim) ){
$xLine = $dim[$n+1];
if( trim($xLine)=="" && $n+2<count($dim) ) $xLine = $dim[$n+2];
if( trim($xLine)!="" ){
$indent2 = strlen($xLine)-strlen(ltrim($xLine));
if( $indent2<=$indent ){
$tipoOp = "O";
}
}
}
}else{
$tipoOp = "O";
}
$tmp[] =  array(
"seq"=>0,
"indent"=>$indent,
"type"=>$tipoOp,
"caption"=>$item[0],
"script_url"=>$item[1],
"cd_gs_op"=>0,
"tip"=>"",
"icon"=>$icon,
"show_type"=>"",
"alias"=>"",
"icons"=>"",
"mode"=>""
);
}
}
function HelpCargaArbol($NomFile, &$tmp){
$dim = array();
$dim2 = file($NomFile);
$treg = count($dim2)-1;
for($n=0; $n<=$treg; $n++){
$item = trim($dim2[$n]);
if( $item=="" || $item[0]=="[" || $item[0]=="." ) continue;
$dim[] = $dim2[$n];
}
$treg = count($dim)-1;
for($n=0; $n<=$treg; $n++){
$item = $dim[$n];
if( trim($item)=="" ) continue;
$indent = strlen($item)-strlen(ltrim($item));
$icon = "";
$item = trim($item);
if( $item[0]=="[" || $item[0]=="." ) continue;
if( $treg==$n ){
$tipoOp = "O";
}else{
$indent2 = strlen($dim[$n+1])-strlen(ltrim($dim[$n+1]));
if( $indent2>$indent ) $tipoOp = "F";
else $tipoOp = "O";
}
$tmp[] =  array(
"seq"=>0,
"indent"=>$indent,
"type"=>$tipoOp,
"caption"=>$item,
"script_url"=>'R:$h/'.strtolower($item).".htm",
"cd_gs_op"=>0,
"tip"=>"",
"icon"=>$icon,
"show_type"=>"",
"alias"=>"",
"icons"=>"",
"mode"=>""
);
}
}
?>
