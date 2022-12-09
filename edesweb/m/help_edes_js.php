<?PHP
$generarAyudaLabel = true;
$dir = "../../edesweb/h/";
if( $generarAyudaLabel ) $txt = "# Version: 2019-08\n\n";
$dimTodo = array();
$df = opendir($dir);
while( $file=readdir($df) ){
if( $file!="." && $file!=".." && substr($file,-4)==".htm" ){
if( !($file[0]=="_" || substr($file,0,2)=="s_") ) continue;
$pos = false;
$txt2 = file_get_contents($dir.$file);
$txt22 = strtoupper($txt2);
$descripcion = "";
$pos1 = strpos($txt22, ' ID="DESCRIPCION">');
$pos2 = strpos($txt22, " ID='DESCRIPCION'>");
$pos3 = strpos($txt22, ' ID=DESCRIPCION>');
if( $pos1!==false ) $pos = $pos1;
if( $pos2!==false ) $pos = $pos2;
if( $pos3!==false ) $pos = $pos3;
if( $pos!==false ){
$pos = strpos($txt2, ">", $pos+1);
$fin = strpos($txt2, "<", $pos+1);
if( $fin!==false ){
$descripcion = trim(substr($txt2, $pos+1, $fin-$pos-1));
}
}
$pos = false;
$pos1 = strpos($txt22, ' ID="SINTAXIS">');
$pos2 = strpos($txt22, " ID='SINTAXIS'>");
$pos3 = strpos($txt22, ' ID=SINTAXIS>');
if( $pos1!==false ) $pos = $pos1;
if( $pos2!==false ) $pos = $pos2;
if( $pos3!==false ) $pos = $pos3;
if( $pos!==false ){
$linea = "";
$pos = strpos($txt2, ">", $pos+1);
$fin = strpos($txt2, "<", $pos+1);
if( $fin!==false ){
if( strtoupper(substr($txt2, $fin,3))=="<BR" ){
$fin = strpos($txt2, "<", $fin+1);
}
$linea = trim(substr($txt2, $pos+1, $fin-$pos-1));
}
if( $linea<>"" && $linea[0]<>"[" ){
$linea = trim(str_replace("&nbsp;", " ", $linea));
$linea = str_replace(array("  ","</td>","</TD>"), array(" ","",""), $linea);
if( $generarAyudaLabel ){
$dimTodo[] = $linea.'~'.$descripcion;
}
}
}
}
}
closedir($df);
if( $generarAyudaLabel ){
sort($dimTodo);
$txt = implode("\n", $dimTodo);
@unlink($dir."help_edes_js.txt");
file_put_contents($dir."help_edes_js.txt", "# Version: ".date('Y-m')."\n\n".$txt);
echo '<script>top.S.info(\'Fichero "help_edes_js.txt" generado.\');</script>';
}else{
echo '<script>top.S.info("Simulación ejecutada.");</script>';
}
exit;
$generarAyudaJS = true;
if( $generarAyudaJS ) $txt = "# Version: 2019-08\n\n";
$dim = file("../../edesweb/core.js");
for($n=0; $n<count($dim); $n++){
$linea = trim($dim[$n]);
if( substr($linea,0,5)=='eDes.' && substr_count($linea, "function(")>0 ){
if( substr_count($linea, "/"."/INTERNA:")>0 ) continue;
list($linea) = explode("/"."/", $linea);
$linea = trim($linea);
$linea = str_replace(" = function", "", $linea);
$linea = str_replace("eDes.fn.", ".", $linea);
$linea = str_replace("eDes.", "S.", $linea);
if( substr($linea,-1)=="{" ) $linea = substr($linea,0,-1);
if( substr($linea,0,3)=="S._" || substr($linea,0,8)=="S.setup." || substr_count($linea, "_(")>0 || substr_count($linea, "_function(")>0 ) continue;
if( $generarAyudaJS ) $txt .= $linea."\n";
}
}
if( $generarAyudaJS ){
file_put_contents("../../edesweb/h/help_edes_js.txt", $txt);
echo '<script>top.S.info(\'Fichero "help_edes_js.txt" generado.\');</script>';
}else{
echo '<script>top.S.info("Simulación ejecutada.");</script>';
}
?>
