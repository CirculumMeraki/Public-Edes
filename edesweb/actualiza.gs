<?PHP
if( $_gsID != getmypid() ) exit;
$_DirG = 'g/e'; include_once( $Dir_.'t/lp.gs' );
set_time_limit( 30*60 );
$_FechaHora = mktime(3,1,0, 01,03,2007);
$_SERVER['QUERY_STRING'] = str_replace( chr(126).'R','',$_SERVER['QUERY_STRING'] );
$Help = true;
if( strtoupper($_SERVER['QUERY_STRING'])=='NOHELP' ) $Help = false;
$Help = false;
eHTML('$actualiza.gs');
?>
</HEAD>
<BODY style='color:#000066; background:#F3F3F3;'>
<?PHP
chdir('../../'.$DIR_DESTINO);
if( substr_count( eGetCWD(), '/'.$DIR_DESTINO ) == 0 || trim($DIR_DESTINO)=='' ){
die( "ERROR: No se ha podido cambiar al directorio '{$DIR_DESTINO}'" );
}
echo '<pre>';
echo '<BR><B><U>FICHEROS A RECIBIR</U></B>';
$_TotalByts = 0;
$FICHEROS = urldecode($FICHEROS);
$NomFile = explode('|',$FICHEROS);
$OkFile = array();
$LeerFile = array();
for( $n=1; $n<count($NomFile); $n++ ){
$tmp = explode('#',$NomFile[$n]);
$tmp[0] = trim($tmp[0]);
$OkFile[ $tmp[0] ] = 1;
$sFile = '';
if( !$Help && $DIR_DESTINO == 'edes' && substr( $tmp[0],0,2 ) == 'h/' ){
}else{
if( file_exists( $tmp[0] ) ){
$Long = filesize($tmp[0]);
$fd = fopen( $tmp[0], 'r' );
$Contenido = fread( $fd, $Long );
fclose($fd);
$sFile = $tmp[0].'#'.$Long.'#'.crc32($Contenido);
if( $NomFile[$n] != $sFile ){
if( substr_count( $NO_ACTUALIZAR,','.$tmp[0].',') == 0 ){
$LeerFile[] = $NomFile[$n];
echo '<br>RECIBIR: '.$tmp[0].', '.$tmp[1];
$_TotalByts += ($tmp[1]*1);
}
}
}else{
$LeerFile[] = $NomFile[$n];
echo '<br>RECIBIR: '.$tmp[0].', '.$tmp[1];
$_TotalByts += ($tmp[1]*1);
}
}
}
echo '<br><B><U>RECIBIR FICHERO</U></B> ('. eNumberFormat($_TotalByts). ')';
$NoDel = array();
RecibirFiles( $_TotalByts, $NoDel );
echo '</BODY></HTML>';
exit;
function RecibirFiles( $_TotalByts, &$NoDel ){
global $SERVIDOR, $SEMILLA, $LeerFile;
$Error = '';
foreach( $LeerFile as $key => $value ){
$txt = '';
$tmp = explode('#',$value);
echo '<br>RECIBIENDO: '.$tmp[0].', '.$tmp[1];
$FICHERO = trim($tmp[0]);
$Longitud = $tmp[1]*1;
if( $tmp[1]*1 > 0 ){
$fd = fopen( $SERVIDOR.'/edes.php?~E&CVS_FICHERO='.urlencode($FICHERO).'&CVS_SEMILLA='.$SEMILLA, 'rb' );
if( !$fd ){
echo '<br>   ERROR de conexion '.$fd.' : '.$FICHERO;
continue;
}
while( !feof($fd) ){
$txt .= fread( $fd, $Longitud );
}
$sLongitud = strlen( $txt );
fclose($fd);
}
$sLongitud = strlen( $txt );
$SeGrabo = false;
if( $sLongitud != $Longitud ){
echo '<br>   ERROR Longitud '.$sLongitud.'<>'.$Longitud.': '.$FICHERO;
}else if( $tmp[2] != crc32($txt) ){
echo '<br>   ERROR CRC '.$tmp[2].'<>'.crc32($txt).': '.$FICHERO;
}else{
unlink( $FICHERO );
$fd = fopen( $FICHERO, 'w' );
$sLongitud = fputs( $fd, $txt, $Longitud );
fclose($fd);
@chmod($FICHERO,0777);
if( $sLongitud != $Longitud ){
echo '<br>      ERROR Longitud(2) '.$sLongitud.'<>'.$Longitud.': '.$FICHERO;
}else{
$_TotalByts -= $sLongitud;
echo ', '.eNumberFormat($_TotalByts);
$SeGrabo = true;
}
}
if( !$SeGrabo ){
if( strrpos($FICHERO,'/') === false ){
$FICHERO = '___'.$FICHERO;
}else{
$FICHERO = substr($FICHERO,0,strrpos($FICHERO,'/')+1).'___'.substr($FICHERO,strrpos($FICHERO,'/')+1);
}
unlink( $FICHERO );
$fd = fopen( $FICHERO, 'w' );
$sLongitud = fputs( $fd, $txt );
fclose($fd);
$NoDel[$FICHERO] = 'X';
@chmod($FICHERO,0777);
}
}
}
function CrearDirectorios( $BakFile ){
$tmp = explode( '/', $BakFile );
$sDir = '';
for( $n=0; $n<count($tmp)-1; $n++ ){
$sDir .= $tmp[$n].'/';
if( !is_dir( $sDir ) ) mkdir( $sDir, 0777 );
if( !is_writeable( $sDir ) ){
if( !chmod( $sDir, 0777 ) ) die( "<br>Error al abrir el directorio: {$sDir}" );
}
}
}
?>
