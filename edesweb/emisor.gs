<?PHP
if( $_gsID != getmypid() ){
if( $_gsTron ) eTron('>> B <<');
die('Error:16');
}
if( $_SERVER['QUERY_STRING'] == 'eDes' ){
$FileConfig = $Dir_.'m/_doc/xls/url_motores';
$EsEdes = true;
}else{
$FileConfig = '../_d_/cfg/http.ini';
$EsEdes = false;
}
$_FechaHora = mktime(3,1,0, 01,03,2007);
$tmp = explode('/',$_SERVER['HTTP_REFERER']);
$ServerMaestro = $tmp[0].'//'.$_SERVER['HTTP_HOST'];
$NoActualizar = ',t/ed.lp,';
set_time_limit( 20*60 );
if( !isset($CVS_SEMILLA) && !isset($DEF_SINCRONIZACION) ){
DefSincronizacion();
exit;
}else if( isset($DEF_SINCRONIZACION) ){
if( $EsEdes ){
$DirUrl = file($FileConfig);
}else{
$txt = LeerHTTP($FileConfig);
$DirUrl = explode("\n",$txt);
}
$tmp = explode( "\t",$DirUrl[$DEF_SINCRONIZACION] );
$dir_origen		= trim($tmp[3]);
$dir_destino	= trim($tmp[4]);
$DirReceptor	= trim($tmp[0]).':/'.'/'.trim($tmp[1]).'/edes.php?~R';
$DirSrvRemoto	= trim($tmp[2]);
$TipoOperacion = trim($tmp[6]);
mt_srand((double)microtime()*1000000);
$_Semilla_ = md5(uniqid(mt_rand(),true));
$txt = '<'.'?PHP'."\n".
'/'."/ {$SERVER_SOFTWARE}\n".
'/'.'/ '.date('Y-m-d H:i:s')."\n".
'$_Semilla_ = "'.$_Semilla_.'";'."\n".
'$_DesdeURL = "'.$DirSrvRemoto.'";'."\n".
'$_HastaSG  = '.(time()+(10*60)).';'."\n".
'$dir_origen = "'.$dir_origen.'";'."\n".
'?'.'>';
$fd = fopen( '../_d_/sincronizar.cnt', 'w' );
fputs( $fd, $txt );
fclose($fd);
$_DirG = 'g/e'; include_once( $Dir_.'t/lp.gs' );
}else{
$VerError = !true;
if( $VerError ) eTron('>> include << '.$CVS_FICHERO.' : '.urldecode($CVS_FICHERO) );
include( '../_d_/sincronizar.cnt' );
if( $_HastaSG < time() ){
if( $VerError ) eTron('>> time << '.$_HastaSG .' < '. time());
exit;
}
if( $_DesdeURL != $_SERVER['REMOTE_ADDR'] ){
if( $VerError ) eTron('>> URL << '.$_DesdeURL .' != '. $_SERVER['REMOTE_ADDR'] );
exit;
}
if( $CVS_SEMILLA != $_Semilla_ ){
if( $VerError ) eTron('>> SEMILLA <<');
exit;
}
if( $VerError ) eTron('>> OK <<');
}
chdir('../../'.$dir_origen);
if( $CVS_SEMILLA==$_Semilla_ ){
global $_User;
if( $CVS_FICHERO==$CVS_SEMILLA ){
@unlink( '../_d_/sincronizar.cnt' );
exit;
}
$CVS_FICHERO = urldecode($CVS_FICHERO);
ob_start();
ini_set( 'url_rewriter.tags', '' );
readfile($CVS_FICHERO);
exit;
}else{
}
eHTML('$emisor.gs',"","EMISOR·EDES");
?>
<style>
BODY {
color:#000066;
background:#dde5ea;
font-size:16px;
FONT-FAMILY:ARIAL;
}
.Boton {
BORDER: #789aab 1px outset;
FONT-WEIGHT: bold;
FILTER: progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr=#dde5ea, endColorstr=#789aab);
COLOR: #ffffff;
}
</style>
<?PHP
echo '</HEAD><BODY>';
echo "<FORM eType='Directo' NAME='FRM1' METHOD='POST' ACTION='{$DirReceptor}'>".$__Enter;
echo "EQUIPO: <B>".$_SESSION["ApplicationName"]."</B><BR><BR>";
echo "Tipo Operación<BR><INPUT NAME='_t_op' TYPE='TEXT' VALUE='{$TipoOperacion}' SIZE=80><BR>";
echo "Servidor Maestro<BR><INPUT NAME='SERVIDOR' TYPE='TEXT' VALUE='{$ServerMaestro}' SIZE=80><BR>";
echo "Servidor Receptor<BR><INPUT NAME='_RECEPTOR' TYPE='TEXT' VALUE='{$DirReceptor}' SIZE=80><BR>";
echo "Dir Origen<BR><INPUT NAME='_dir_' TYPE='TEXT' VALUE='{$dir_origen}' SIZE=80><BR>";
echo "Dir Destino<BR><INPUT NAME='DIR_DESTINO' TYPE='TEXT' VALUE='{$dir_destino}' SIZE=80><BR>";
echo "Semilla<BR><INPUT NAME='SEMILLA' TYPE='TEXT' VALUE='{$_Semilla_}' SIZE=80><BR>";
echo 'Directorios<BR><TEXTAREA NAME="DIRECTORIOS" ROWS="3" COLS="80">';
Directorio( '.' );
echo '</TEXTAREA><BR>';
echo 'Ficheros<BR><TEXTAREA NAME="FICHEROS" ROWS="5" COLS="80">';
Ficheros( '.' );
echo '</TEXTAREA><BR>';
echo "Operación<BR><INPUT NAME='OPERACION' VALUE='DIR' SIZE=80 MAXLENGTH=8><BR>";
echo "No Actualizar<BR><INPUT NAME='NO_ACTUALIZAR' TYPE='TEXT' VALUE='{$NoActualizar}' SIZE=80><BR>";
echo '<INPUT TYPE="submit" VALUE="Actualizar servidor" class=Boton>';
echo '</FORM>';
?>
<SCRIPT type="text/javascript">
if( top.eIsWindow(window) ) top.eSWIResize( window, -1 );
</SCRIPT>
<?PHP
echo '</BODY></HTML>';
function Directorio( $DirBase ){
global $_FechaHora, $_Nivel;
$_Nivel++;
$di = opendir( $DirBase );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( is_dir( "{$DirBase}/{$file}" ) ){
$NomFile = $DirBase.'/'.$file;
echo '|'. substr($NomFile,2);
Directorio( "{$DirBase}/{$file}" );
}else{
}
}
}
closedir( $di );
$_Nivel--;
}
function Ficheros( $DirBase ){
global $_FechaHora, $_Nivel;
$_Nivel++;
$di = opendir( $DirBase );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( is_dir( "{$DirBase}/{$file}" ) ){
Ficheros( "{$DirBase}/{$file}" );
}else{
$NomFile = $DirBase.'/'.$file;
$Long = filesize($NomFile);
$fd = fopen( $NomFile, 'r' );
$Contenido = fread( $fd, $Long );
fclose($fd);
echo '|'. trim(substr($NomFile,2)).str_replace(' ','','#'.$Long.'#'.crc32($Contenido));
}
}
}
closedir( $di );
$_Nivel--;
}
function DefSincronizacion(){
global $__Enter, $Dir_, $FileConfig, $EsEdes;
eHTML('$emisor.gs',"","EMISOR·EDES");
?>
<style>
BODY {
color:#000066;
background:#dde5ea;
font-size:16px;
FONT-FAMILY:ARIAL;
}
.Boton {
BORDER: #789aab 1px outset;
FONT-WEIGHT: bold;
FILTER: progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr=#dde5ea, endColorstr=#789aab);
COLOR: #ffffff;
}
</style>
<?PHP
echo '</HEAD><BODY>';
echo "<FORM eType='Directo' NAME='FRM1' METHOD='POST' ACTION=''>".$__Enter;
echo "<center><br>EQUIPO: <b>".$_SESSION["ApplicationName"]."</b><BR><BR>";
$Dim = array();
$Ok = 0;
if( $EsEdes ){
$DirUrl = file($FileConfig);
}else{
$txt = LeerHTTP( $FileConfig );
$DirUrl = explode("\n",$txt);
}
for( $n=0; $n<count($DirUrl); $n++ ){
$tmp = explode("\t",$DirUrl[$n]);
if( $Ok==2 && trim($tmp[6])!='' ){
$Dim[] = array( $n, $tmp[6] );
}
if( $Ok==1 ) $Ok = 2;
if( trim($DirUrl[$n]) == '[Data]' ) $Ok = 1;
}
if( count($Dim) > 0 ){
echo 'Servidor a Sincronizar<br>';
echo '<SELECT NAME="DEF_SINCRONIZACION" SIZE='.count($Dim).' MULTIPLE>';
for( $n=0; $n<count($Dim); $n++ ){
echo '<OPTION value="'.$Dim[$n][0].'">'.$Dim[$n][1];
}
echo '</SELECT><BR>';
echo '<INPUT TYPE="submit" VALUE="Actualizar servidor" class=Boton>';
}else{
eInclude('message');
eMessage('HTTP no Configurado','HS');
}
echo '</center></FORM>';
?>
<SCRIPT type="text/javascript">
if( top.eIsWindow(window) ){
top.eSWIResize( window, -1 );
}else{
top.eLoading(false,window);
}
</SCRIPT>
<?PHP
echo '</BODY></HTML>';
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
function LeerHTTP( $_Fichero ){
$df = fopen( $_Fichero, 'r' );
if( !$df ){
eHTML('$emisor.gs','','eDes · HTTP');
?>
</HEAD><BODY onhelp='return false;' oncontextmenu='return false;'><SCRIPT type="text/javascript">
alert('ERROR: No se ha podido abrir el fichero');
</SCRIPT></BODY></HTML>
<?PHP
eEnd();
}
$cTxt = fread( $df, filesize($_Fichero) );
fclose( $df );
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+1,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+2+$n,1));
$Basura += $LongDeLong + 2;
$txt = substr( $cTxt, $Basura, $LenCadena );
$txt = gzuncompress($txt);
return $txt;
}
?>
