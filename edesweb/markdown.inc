<?PHP
function eMarkdown($txt){
$respuesta = "";
$esLU = false;
$nivelLU = 0;
$dimLU = array(0,0,0,0,0,0,0,0,0,0);
$esLO = false;
$nivelLO = 0;
$dimLO = array(0,0,0,0,0,0,0,0,0,0);
$oNivelLU = 0;
$oNivelLO = 0;
$negritaYCursiva = false;
$negrita = false;
$cursiva = false;
$codigo = false;
$codigoLinea = false;
$br = false;
$esTabla = false;
$tablaAlign = array();
$tablaAlignOk = false;
$dim = explode("\n", $txt);
for($n=0; $n<count($dim); $n++){
$linea = rtrim($dim[$n]);
$lineaNSP = trim($linea);
$br = true;
$esLU = false;
$esLO = false;
if( preg_match('/^(\*\*\*|---|___|\* \* \*|- - -|_ _ _)$/', $lineaNSP) ){
$linea = "<hr>";
$lineaNSP = $linea;
$br = false;
}
while( true ){
$ini = strpos($linea, "***");
if( $ini===false ) $ini = strpos($linea, "___");
if( $ini!==false ){
if( !$negritaYCursiva ){
$negritaYCursiva = true;
$linea = substr($linea,0,$ini)."<b><i>".substr($linea,$ini+3,strlen($linea));
$lineaNSP = trim($linea);
}
}
$ini = strpos($linea, "***");
if( $ini===false ) $ini = strpos($linea, "___");
if( $ini!==false ){
if( $negritaYCursiva ){
$negritaYCursiva = false;
$linea = substr($linea,0,$ini)."</i></b>".substr($linea,$ini+3,strlen($linea));
$lineaNSP = trim($linea);
}
}else{
break;
}
}
while( true ){
$ini = strpos($linea, "**");
if( $ini!==false ){
if( !$negrita ){
$negrita = true;
$linea = substr($linea,0,$ini)."<b>".substr($linea,$ini+2,strlen($linea));
$lineaNSP = trim($linea);
}
$ini = strpos($linea, "**");
if( $ini!==false ){
if( $negrita ){
$negrita = false;
$linea = substr($linea,0,$ini)."</b>".substr($linea,$ini+2,strlen($linea));
$lineaNSP = trim($linea);
}
}
}else{
break;
}
}
while( true ){
$ini = strpos($linea, "*");
if( $ini!==false ){
if( !$cursiva ){
$cursiva = true;
$linea = substr($linea,0,$ini)."<i>".substr($linea,$ini+1,strlen($linea));
$lineaNSP = trim($linea);
}
$ini = strpos($linea, "*");
if( $ini!==false ){
if( $cursiva ){
$cursiva = false;
$linea = substr($linea,0,$ini)."</i>".substr($linea,$ini+1,strlen($linea));
$lineaNSP = trim($linea);
}
}
}else{
break;
}
}
$ini = strpos($linea, "~~~");
if( $ini!==false ){
if( !$codigo ){
$br = false;
$codigo = true;
$linea = substr($linea,0,$ini)."<code>".substr($linea,$ini+3,strlen($linea));
$lineaNSP = trim($linea);
}
}
$ini = strpos($linea, "~~~");
if( $ini!==false ){
if( $codigo ){
$br = false;
$codigo = false;
$linea = substr($linea,0,$ini)."</code>".substr($linea,$ini+3,strlen($linea));
$lineaNSP = trim($linea);
}
}
$ini = strpos($linea, "`");
if( $ini!==false ){
if( !$codigoLinea ){
$br = false;
$codigoLinea = true;
$linea = substr($linea,0,$ini)."<code>".substr($linea,$ini+1,strlen($linea));
$lineaNSP = trim($linea);
}
}
$ini = strpos($linea, "`");
if( $ini!==false ){
if( $codigoLinea ){
$br = true;
$codigoLinea = false;
$linea = substr($linea,0,$ini)."</code>".substr($linea,$ini+1,strlen($linea));
$lineaNSP = trim($linea);
}
}
if( $lineaNSP[0]=="-" || $lineaNSP[0]=="*" || $lineaNSP[0]=="+" ){
$br = false;
$esLU = true;
$nivelLU = strlen($linea)-strlen($lineaNSP);
$linea = "<li>".substr($linea,1+$nivelLU,strlen($linea))."</li>";
if( $nivelLU>0 ) $nivelLU = $nivelLU/4;
for($i=$nivelLU+1; $i<=$oNivelLU; $i++){
$dimLU[$i] = 0;
$linea = "</ul>".$linea;
}
if( $dimLU[$nivelLU]==0 ){
$linea = "<ul>".$linea;
$dimLU[$nivelLU] = 1;
}
$oNivelLU = $nivelLU;
}else{
for($i=0; $i<10; $i++){
if( $dimLU[$i]==1 ){
$dimLU[$i] = 0;
$linea .= "</ul>";
$br = false;
}
}
}
if( substr($lineaNSP,1,1)=="." && is_numeric($lineaNSP[0]) ){
$br = false;
$esLO = true;
$nivelLO = strlen($linea)-strlen($lineaNSP);
$linea = "<li>".substr($linea,2+$nivelLO,strlen($linea))."</li>";
if( $nivelLO>0 ) $nivelLO = $nivelLO/4;
for($i=$nivelLO+1; $i<=$oNivelLO; $i++){
$dimLO[$i] = 0;
$linea = "</ol>".$linea;
}
if( $dimLO[$nivelLO]==0 ){
$linea = "<ol>".$linea;
$dimLO[$nivelLO] = 1;
}
$oNivelLO = $nivelLO;
}else{
for($i=0; $i<10; $i++){
if( $dimLO[$i]==1 ){
$dimLO[$i] = 0;
$linea .= "</ol>";
$br = false;
}
}
}
for($i=6; $i>0; $i--){
if( substr($linea,0,$i)==str_repeat("#",$i) ){
$linea = "<h{$i}>".substr($linea,$i,strlen($linea))."</h{$i}>";
$br = false;
}
}
if( $lineaNSP[0]=="|" && substr($lineaNSP,-1)=="|" ){
$br = false;
$tmp = explode("|", $lineaNSP);
$bak = "";
if( !$esTabla ) $bak = "<table>";
$okTR = 0;
for($i=1; $i<count($tmp)-1; $i++){
$tmp[$i] = trim($tmp[$i]);
if( $tmp[$i][0]=="-" || substr($tmp[$i],1,1)=="-" ) $okTR++;
if( !$tablaAlignOk ){
switch( $tmp[$i][0].substr($tmp[$i],-1) ){
case '::':
$tablaAlign[$i] = " style='text-align:center'";
break;
case '-:':
$tablaAlign[$i] = " style='text-align:right'";
break;
case ':-':
$tablaAlign[$i] = " style='text-align:left'";
break;
default:
$tablaAlign[$i] = "";
}
}
}
if( $okTR<>(count($tmp)-2) ){
$bak .= "<tr>";
for($i=1; $i<count($tmp)-1; $i++){
if( !$esTabla ){
$bak .= "<th>".$tmp[$i]."</th>";
}else{
$bak .= "<td".$tablaAlign[$i].">".$tmp[$i]."</td>";
}
}
$bak .= "</tr>";
}else{
$tablaAlignOk = true;
}
$linea = $bak;
$esTabla = true;
}else if( $esTabla ){
$linea = "</table>".$linea;
$esTabla = false;
$tablaAlignOk = false;
}
$ini = strpos($linea, "![") && strpos($linea, "](");
if( $ini!==false ){
$desde = strpos($linea, "[", $ini);
$fin = strpos($linea, "]", $ini);
$alt = substr($linea, $desde+1, $fin-$desde-1);
if( $alt<>"" ) $alt = " alt='".str_replace("'", "&#39;", $alt)."'";
$desde = strpos($linea, "(", $ini);
$fin = strpos($linea, ")", $ini);
$img = substr($linea, $desde+1, $fin-$desde-1);
$linea = substr($linea,0,$ini)."<img src='{$img}'{$alt}>".substr($linea, $fin+1, strlen($linea)+1);
$lineaNSP = trim($linea);
}
$ini = strpos($linea, "[") && strpos($linea, "](");
if( $ini!==false ){
$desde = strpos($linea, "[", $ini);
$fin = strpos($linea, "]", $ini);
$alt = substr($linea, $desde+1, $fin-$desde-1);
$desde = strpos($linea, "(", $ini);
$fin = strpos($linea, ")", $ini);
$href = substr($linea, $desde+1, $fin-$desde-1);
$linea = substr($linea,0,$ini)."<a href='{$href}'>{$alt}</a>".substr($linea, $fin+1, strlen($linea)+1);
$lineaNSP = trim($linea);
}
$respuesta .= $linea;
if( $br ) $respuesta .= "<br>";
}
return $respuesta;
}
?>
