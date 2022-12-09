<?PHP
if( $_gsID != getmypid() ) exit;
$_DirG = 'g/e'; include_once( $Dir_.'t/lp.gs' );
set_time_limit( 30*60 );
$_FechaHora = mktime(3,1,0, 01,03,2007);
$_SERVER['QUERY_STRING'] = str_replace( chr(126).'R','',$_SERVER['QUERY_STRING'] );
$Help = true;
if( strtoupper($_SERVER['QUERY_STRING'])=='NOHELP' ) $Help = false;
@eval( _LoadSqlIni( '../_datos/config/sql.ini' ) );
include( $Dir_.$_Sql.'.inc' );
eHTML('$receptor.gs');
?>
<SCRIPT type="text/javascript">
function Fin(){
window.scroll(0,document.body.scrollHeight);
}
var _Ver = setInterval('Fin()',1000);
</SCRIPT>
</HEAD>
<BODY style='color:#000066; background:#F3F3F3;' onload='clearInterval(_Ver);'>
<?PHP
chdir('../../'.$DIR_DESTINO);
if( substr_count( eGetCWD(), '/'.$DIR_DESTINO ) == 0 || trim($DIR_DESTINO)=='' ){
die( "ERROR: No se ha podido cambiar al directorio '{$DIR_DESTINO}'" );
}
echo '<pre>';
$HoraIni = date('Y-m-d H:m:s');
$SgIni = microtime();
echo $HoraIni.' ('.$SgIni.')<br>';
echo '<br><B><U>CREA DIRECTORIOS</U></B>';
$DIRECTORIOS = urldecode($DIRECTORIOS);
$NomDir = explode('|',$DIRECTORIOS);
$OkDir = array();
for( $n=1; $n<count($NomDir); $n++ ){
$OkDir[ $NomDir[$n] ] = 1;
if( !is_dir( $NomDir[$n] ) ){
echo '<br>'.$NomDir[$n];
mkdir( $NomDir[$n], 0777 );
}
}
echo '<br><B><U>BORRA DIRECTORIOS</U></B>';
DelDirectorio( '.' );
echo '<br><B><U>FICHEROS A RECIBIR</U></B>';
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
echo '<br><B><U>FICHEROS A BORRAR</U></B>';
DelFicheros( '.', $NoDel );
echo '<br><B><U>TIEMPO UTILIZADO</U></B>';
$fd = fopen( $SERVIDOR.'/edes.php?~E&CVS_FICHERO='.$SEMILLA.'&CVS_SEMILLA='.$SEMILLA, 'rb' );
fclose($fd);
$SgFin = microtime();
$HoraFin = date('H:m:s',$SgFin);
echo '<br>'.$HoraIni.' ('.$SgIni.')<br>'.$HoraFin.' ('.$SgFin.')<br>'.'<br>FIN';
echo '</BODY></HTML>';
exit;
function RecibirFiles( $_TotalByts, &$NoDel=NULL ){
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
@unlink( $FICHERO );
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
if( $FICHERO=='_gs_op_.txt' ) ImportarTABLA("{$_SESSION['ShareDictionary']}gs_op", $FICHERO);
}
}
if( !$SeGrabo ){
if( strrpos($FICHERO,'/') === false ){
$FICHERO = '___'.$FICHERO;
}else{
$FICHERO = substr($FICHERO,0,strrpos($FICHERO,'/')+1).'___'.substr($FICHERO,strrpos($FICHERO,'/')+1);
}
@unlink( $FICHERO );
$fd = fopen( $FICHERO, 'w' );
$sLongitud = fputs( $fd, $txt );
fclose($fd);
$NoDel[$FICHERO] = 'X';
@chmod($FICHERO,0777);
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
if( $OkDir[ $NomDir ] != 1 ){
echo '<br>DEL: '.$NomDir.' -> '.$file;
exec( 'rm -r '.$NomDir );
}
DelDirectorio( "{$DirBase}/{$file}" );
}
}
}
closedir( $di );
}
function DelFicheros( $DirBase, $NoDel ){
global $OkFile;
$di = opendir( $DirBase );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( is_dir( "{$DirBase}/{$file}" ) ){
DelFicheros( "{$DirBase}/{$file}", $NoDel );
}else{
$NomFile = substr( $DirBase.'/'.$file, 2 );
if( $OkFile[$NomFile] != 1 && $file!='_temp_' ){
if( $NoDel[$NomFile] == 'X' ){
echo '<BR> NO DEL: '. $NomFile;
}else{
echo '<BR>DEL: '. $NomFile;
@unlink( $NomFile );
}
}
}
}
}
closedir( $di );
}
function ImportarTABLA( $TABLA, $FICHERO ){
if( qCount( $TABLA ) > 0 ) sql_Borra( $TABLA );
$TReg = 0;
$fd = fopen( $FICHERO, 'r' );
while( ($txt = fgets($fd,50000)) ){
$txt = str_replace('#%0A#%0B#',chr(13).chr(10),$txt);
$txt = str_replace( "'", '"', $txt );
$Valores = "'".str_replace( '|', "','", chop($txt) )."'";
qQuery("insert into {$TABLA} values ( $Valores )");
$TReg++;
}
fclose($fd);
echo ' ( Importado en: '.$TABLA.' - '.$TReg.' Regs. )';
}
?>
