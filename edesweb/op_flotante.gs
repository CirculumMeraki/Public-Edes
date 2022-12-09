<?PHP
session_start();
if( !isset($_SESSION['_User']) ) exit;
$Datos = $_SERVER['QUERY_STRING'];
$Datos = str_replace('_1.','_0.',$Datos);
$Datos = str_replace('_2.','_0.',$Datos);
$Datos = str_replace('_3.','_0.',$Datos);
list( $Accion, $Usuario, $Gif, $x, $y, $Title ) = explode( ',', $Datos );
if( $_User != $Usuario ) exit;
$Fichero = '../_datos/usr/'.$Usuario.'.op';
if( file_exists($Fichero) ){
$pnt = fopen( $Fichero, 'r' );
$Datos = fread( $pnt, filesize($Fichero) );
fclose( $pnt );
$Dim = unserialize($Datos);
if( $Accion == 'G' ){
$Dim[$Gif.$Title] = array( $Gif, $x, $y, $Title );
$pnt = fopen( $Fichero, 'w' );
fputs( $pnt, serialize($Dim) );
fclose( $pnt );
echo 'ok';
}else if( $Accion == 'B' ){
unset($Dim[$Gif.$Title]);
$pnt = fopen( $Fichero, 'w' );
fputs( $pnt, serialize($Dim) );
fclose( $pnt );
echo 'ok';
}else if( $Accion == 'E' ){
$Datos = '';
foreach( $Dim as $v1 ){
foreach( $v1 as $v2 ){
$Datos .= "$v2,";
}
$Datos .= "\n";
}
echo trim($Datos);
}
}else{
if( $Accion == 'G' ){
$Dim[$Gif.$Title] = array( $Gif, $x, $y, $Title );
$pnt = fopen( $Fichero, 'w' );
fputs( $pnt, serialize($Dim) );
fclose( $pnt );
}
echo 'ok';
}
exit;
?>
