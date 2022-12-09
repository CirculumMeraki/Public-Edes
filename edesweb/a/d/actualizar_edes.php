<?PHP //[_PROTECCION_]
echo '<br>Login: '.$login;
echo '<br>EMail: '.$email;
echo '<br>Password: '.$password;
echo '<br>Fichero: '.$fichero;
echo '<script type="text/javascript">top.eLoading(false,window);</script>';
exit;
function DelFicheros( $DirBase ){
global $OkFile;
$di = opendir( $DirBase );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( is_dir( "{$DirBase}/{$file}" ) ){
DelFicheros( "{$DirBase}/{$file}" );
}else{
$NomFile = substr( $DirBase.'/'.$file, 2 );
if( !isset($OkFile[$NomFile]) && $file!='_temp_' ){
echo '<BR>DEL: '. $NomFile;
@unlink( $NomFile );
}
}
}
}
closedir( $di );
}
function ActualizarFichero( $tmp, $fd ){
echo '<br>ACTUALIZANDO: '.$tmp[0].', '.$tmp[1];
$FICHERO = trim($tmp[0]);
$Longitud = $tmp[1]*1;
$txt = '';
if( $tmp[1]*1 > 0 ){
$txt = fread( $fd, $Longitud );
if( $tmp[3]!='' ){
$txt = @gzuncompress( $txt );
if( $txt == false ) echo '==========================================';
}
}
$sLongitud = strlen( $txt );
if( $sLongitud != $Longitud ){
echo ' --> ERROR Longitud "'.$sLongitud.'"<>"'.$Longitud.'"';
}else if( $tmp[2] != crc32($txt) ){
echo ' --> ERROR CRC '.$tmp[2].'<>'.crc32($txt);
}else{
if( file_exists( $FICHERO ) ) unlink( $FICHERO );
$nf = fopen( $FICHERO, 'w' );
$sLongitud = fputs( $nf, $txt, $Longitud );
fclose($nf);
@chmod($FICHERO,0777);
if( $sLongitud != $Longitud ){
echo ' --> ERROR Longitud al grabar "'.$sLongitud.'"<>"'.$Longitud.'"';
}
}
}
function DelDirectorio( $DirBase ){
global $OkDir;
$di = opendir( $DirBase );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( is_dir( "{$DirBase}/{$file}" ) ){
$NomDir = substr( $DirBase.'/'.$file, 2);
if( !isset($OkDir[$NomDir]) ){
echo 'DEL: '.$NomDir.' -> '.$file.'<br>';
exec( 'rm -r '.$NomDir );
}else{
DelDirectorio( "{$DirBase}/{$file}" );
}
}
}
}
closedir( $di );
}
$BakFile = $Dir_.'m/_version/edes.zip';
$fd = fopen( $BakFile, 'r' );
chdir('../../edes.restore');
echo '<b><u>RESTAURANDO COPIA</u></b> ('.eGetCWD().')<br>';
$TD = fgets($fd,100);
$NomDir = array();
for( $d=0; $d < $TD; $d++ ) $NomDir[$d] = trim(fgets($fd,100));
echo '<b><u>CREANDO DIRECTORIOS</u></b><br>';
$OkDir = array();
for( $n=0; $n<count($NomDir); $n++ ){
$OkDir[ $NomDir[$n] ] = 1;
if( !is_dir( $NomDir[$n] ) ){
echo '<br>mkdir: '.$NomDir[$n];
mkdir( $NomDir[$n], 0777 );
}
}
echo '<b><u>BORRANDO DIRECTORIOS</u></b><br>';
DelDirectorio( '.' );
echo '<b><u>SINCRONIZANDO FICHEROS</u></b>';
$TF = fgets($fd,100);
$pDFicheros = ftell( $fd );
for( $d=0; $d < $TF; $d++ ) fgets($fd,100);
$pScript = ftell( $fd );
$OkFile = array();
fseek( $fd, $pDFicheros );
for( $d=0; $d < $TF; $d++ ){
$Datos = trim(fgets($fd,100));
$p = ftell( $fd );
$tmp = explode('#',$Datos);
$sDatos = $tmp[0].'#'.$tmp[1].'#'.$tmp[2];
$Longitud = $tmp[1]*1;
if( $tmp[3]!='' ) $Longitud = $tmp[3]*1;
$OkFile[ $tmp[0] ] = 1;
fseek( $fd, $pScript );
if( file_exists( $tmp[0] ) ){
$Long = filesize($tmp[0]);
$dTmp = fopen( $tmp[0], 'r' );
$Contenido = fread( $dTmp, $Long );
fclose($dTmp);
$sFile = $tmp[0].'#'.$Long.'#'.crc32($Contenido);
if( $sDatos != $sFile ){
ActualizarFichero( $tmp, $fd );
}else{
echo '<br>ok: '.$tmp[0];
}
}else{
ActualizarFichero( $tmp, $fd );
}
fseek( $fd, $p );
$pScript += $Longitud;
}
fclose($fd);
echo '<br><b><u>BORRA FICHEROS</u></b>';
DelFicheros( '.' );
echo '<br><b>- FIN -</b>';
?>
<SCRIPT type="text/javascript">
top.eLoading(false,window);
</SCRIPT>
