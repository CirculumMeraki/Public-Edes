<?PHP
$generarAyudaLabel = true;
$dir = "../../edesweb/h/";
if( $generarAyudaLabel ) $txt = "# Version: 2019-08\n\n";
$dimTodo = array();
$dim = file("../../edesweb/h/i/help2.ind");
for($na=0; $na<count($dim); $na++){
$buscar = trim($dim[$na]);
if( $buscar=="" || substr_count($buscar, " ")>0 ) continue;
if( $buscar[0]=="e" || $buscar[0]=="q" || substr($buscar,0,3)=="xls" || substr($buscar,0,3)=="xml" ){
$file = "";
if( substr_count($buscar, "{")>0 ){
$file = eMid($buscar, "{", "}");
}else if( substr_count($buscar, "+")>0 ){
list($file, $sufi) = explode("+", $buscar);
$file = $file.'_'.$sufi;
}else{
$file = $buscar;
}
$file = strtolower($file).'.htm';
$pos = false;
$txt2 = file_get_contents($dir.$file);
if( strlen($txt2)==0 ) eTron("Falta la ayuda de: ".$buscar);
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
if( $linea<>"" ){
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
@unlink($dir."help_edes_e.txt");
file_put_contents($dir."help_edes_e.txt", "# Version: ".date('Y-m')."\n\n".$txt);
echo '<script>top.S.info(\'Fichero "help_edes_e.txt" generado.\');</script>';
}else{
echo '<script>top.S.info("Simulación ejecutada.");</script>';
}
exit;
?>
