<?PHP
session_start(); if( !isset($_SESSION['_User']) ) exit;
if( substr_count($_SERVER['QUERY_STRING'], '&_PSOURCE')>0 ){
$_SERVER['QUERY_STRING'] = substr($_SERVER['QUERY_STRING'],0,strpos( $_SERVER['QUERY_STRING'], '&_PSOURCE' ));
}
if( substr_count($_SERVER['QUERY_STRING'], '&_FORMBUTTONS')>0 ){
$_SERVER['QUERY_STRING'] = substr($_SERVER['QUERY_STRING'],0,strpos( $_SERVER['QUERY_STRING'], '&_FORMBUTTONS' ));
}
if( $_GET['LOG']!="" ){
echo '<script type="text/javascript">';
if( $_GET['LOG']=="ON" ){
echo 'top.S.info("LOG ON",3);';
file_put_contents("edes.php.log", "");
}else if( $_GET['LOG']=="OFF" ){
echo 'top.S.info("LOG OFF",3);';
@unlink("edes.php.log");
}else if( $_GET['LOG']=="EDIT" ){
echo 'top.gsEdit(window, "/http/edes.php.log", 10);';
}
echo '</script>';
eEnd();
}
if( $_GET['CAPTURAR']==1 ){
?>
<script type="text/javascript">
var a = top.document.body.clientWidth;
var h = top.document.body.clientHeight;
var ta = top.document.createElement('IFRAME');
ta.id = '_CampturarZona';
ta.className = "OFF";
ta.frameBorder = 0;
ta.NODBG = '';
with( ta.style ){
zIndex = 99999999;
position = 'absolute';
posLeft = "0px";
posTop = "0px";
width  = px(a);
height = px(h);
}
ta.src = 'edes.php?E:$a/u/tools.gs&CAPTURAR=2';
top.document.body.appendChild(ta);
</script>
<?PHP
eEnd();
}else if( $_GET['CAPTURAR']==2 ){
eHTML();
?>
<SCRIPT type="text/javascript">
var _Left = _Top = 0, _Capturar = false, WE=top;
function Inic(){
if( _Capturar ){
document.all._TODO.onmousemove = null;
var ID = top._User+'_'+Date.parse(new Date());
_Left = parseInt(_Left);
_Top = parseInt(_Top);
var Ancho = parseInt(document.all._ZONA.style.width);
var Alto = parseInt(document.all._ZONA.style.height);
if( isNaN(Ancho) ) Ancho = 15;
if( isNaN(Alto) ) Alto = 15;
if( Ancho<10 ) Ancho = 15;
if( Alto<10 ) Alto = 15;
top.eCaptureZone( _Left, _Top, Ancho, Alto, ID, window.frameElement );
return;
}
_Capturar = true;
_Left = window.event.x-0;
_Top = window.event.y-0;
with( document.all._ZONA.style ){
left = px(_Left);
top  = px(_Top);
display = 'block';
}
document.all._TODO.onmousemove = MoverElemento;
}
function MoverElemento(){
var Ancho = window.event.x-_Left;
var Alto = window.event.y-_Top;
if( Ancho > 3 ) document.all._ZONA.style.width = Ancho-0;
if( Alto > 3 ) document.all._ZONA.style.height = Alto-0;
}
</SCRIPT>
</HEAD><BODY style='margin:0px;padding:0px;' oncontextmenu='return false' onselectstart='return false' onhelp='return false' ondragstart='return false'>
<div id=_TODO style='position:absolute;top:0px;left:0px;width:100%;height:100%;cursor:crosshair;border: 0px solid blue' onclick="Inic()">
<div id=_ZONA style='position:absolute;border:1px solid red;border-style:dotted;display:none;font-size:1px;'></div>
</div>
</BODY></HTML>
<?PHP
eEnd();
}
eLngLoad();
if( $_SERVER['QUERY_STRING']=='E2' ){
$DirBase = substr($_SERVER['DOCUMENT_ROOT'],0,strrpos($_SERVER['DOCUMENT_ROOT'],'/'));
$DirWEB = substr($DirBase,strrpos($DirBase,'/')+1);
$NomDir = $DirBase.'.2p/';
if( !is_dir($NomDir) ) mkdir($NomDir, 0777 );
$sNomDir = $NomDir;
$NomDir .= '/edes';
if( !is_dir($NomDir) ) mkdir($NomDir, 0777 );
copy( $Dir_.'edes.php'		, $NomDir.'/edes.php' );
copy( $Dir_.'extraer.gs'	, $NomDir.'/extraer.gs' );
copy( $Dir_.'descarga.gs'	, $NomDir.'/descarga.gs' );
copy( $Dir_.'message.inc'	, $NomDir.'/message.inc' );
copy( $Dir_."{$_Sql}.inc"	, $NomDir."/{$_Sql}.inc" );
if( strtoupper(substr(PHP_OS,0,3)) == 'LIN' || strtoupper(substr(PHP_OS,0,3)) == 'UNI' ){
copy( $Dir_.'pdf.cab'	, $NomDir.'/pdf.cab' );
}else if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
copy( $Dir_.'pdf.exe'	, $NomDir.'/pdf.exe' );
}
$NomDir  = $sNomDir;
$NomDir .= $DirWEB;				if( !is_dir($NomDir) ) mkdir($NomDir, 0777 );
$sNomDir = $NomDir;
$NomDir  = $sNomDir;
$NomDir .= '/_datos';			if( !is_dir($NomDir) ) mkdir($NomDir, 0777 );
$NomDir  = $sNomDir;
$NomDir .= '/_datos/config';	if( !is_dir($NomDir) ) mkdir($NomDir, 0777 );
$NomDir  = $sNomDir;
$NomDir .= '/ext';				if( !is_dir($NomDir) ) mkdir($NomDir, 0777 );
$NomDir  = $sNomDir;
$NomDir .= '/ext/tmp';			if( !is_dir($NomDir) ) mkdir($NomDir, 0777 );
$NomDir  = $sNomDir;
$NomDir .= '/http';				if( !is_dir($NomDir) ) mkdir($NomDir, 0777 );
$NomDir  = $sNomDir;
$NomDir .= '/http/css';			if( !is_dir($NomDir) ) mkdir($NomDir, 0777 );
$NomDir  = $sNomDir;
copy( '../_datos/config/sql.ini', $NomDir.'/_datos/config/sql.ini' );
copy( '../http/edes.php'		, $NomDir.'/http/edes.php' );
copy( '../http/css/extraer.css'	, $NomDir.'/http/css/extraer.css' );
copy( '../http/css/ficha.css'	, $NomDir.'/http/css/ficha.css' );
eInclude('message');
eMessage( eLng('Motor de extraciones en segundo plano<br>creado en',$DirBase.'2p'), 'HS' );
exit;
}
eHTML();
?>
</HEAD>
<style> BODY { color:#FFFF00; background:#cccccc; } </style>
<BODY topmargin=0px leftmargin=3px rightmargin=0px bottommargin=0px onload="top.eBodyBackground(window)">
<?PHP
echo '<PRE><br>';
if( substr($_SERVER['QUERY_STRING'],-1)=='&' ) $_SERVER['QUERY_STRING'] = substr($_SERVER['QUERY_STRING'],0,-1);
include( eScript( '/_d_/cfg/edes.ini' ) );
$PoneColor = fale;
switch( $_SERVER['QUERY_STRING'] ){
case 'B':
BackupFuentes( $_Backup, $_Backup2 );
break;
case 'D':
BackupDatos();
break;
case 'S':
break;
case 'I':
VerPhpIni();
break;
case '2':
$FileInfo = '../_tmp/_background.info';
if( file_exists($FileInfo) ) @unlink( $FileInfo );
$_SERVER["QUERY_STRING"] = 'B:phpinfo';
$_VerFilePhpInfo = true;
include( $Dir_.'background.inc' );
exit;
case '2V':
echo '<html><head><body style="color:#000000;background:#ffffff">';
echo '<br><center><u><b>'.eLng('DATOS DEL SERVIDOR EN BACKGROUND').'</b></u></center><br>';
echo '<pre>';
readfile("../_tmp/_background.info");
echo '</pre>';
echo '<br><center>('.eLng('se necesita un path al ejecutable "php"').')</center>';
echo '<script type="text/javascript">top.eLoading(0,window);</script>';
exit;
case 'HC':
VerHttpdConf();
break;
case 'LOG':
VerLogApache();
break;
case 'U':
NuevoUsuario();
break;
case 'C':
eInclude('message');
file_put_contents( '../_datos/config/clearcache.cdi', date('Y-m-d H:i:s') );
eMessage('Limpieza de caches de los usuarios activado','HS');
break;
case 'X':
eInit();
?>
<html><head><title>System</title>
<style>
body { margin:0px; font-family:arial; font-size:20px; background-color:#c74958; cursor:default; }
div { white-space:nowrap; color:#ffffff; background-color:#c74958; padding:20px; }
</style>
</head><body onhelp='return false' oncontextmenu="return false">
<div>Es necesario que, cuando pueda, salga<br>de la aplicación y vuelva a entrar.</div>
<script type="text/javascript">
window.external._ClearCache = 1;
top.eSound('A');
setTimeout(function(){
top.eSWView(window);
top.eSWIResize(window,parseInt(document.body.children[0].offsetWidth),parseInt(document.body.children[0].offsetHeight),1);
setTimeout('top.eSWFocus(window);',100);
},250);
</script>
</body></html>
<?PHP
eEnd();
break;
case 'A':
eInclude('message');
file_put_contents('../_datos/config/closeprogram.cdi', date('Y-m-d H:i:s'));
eMessage('Petición para Salir de la Aplicación','HS');
break;
}
?>
<script type="text/javascript">
if( !top.eIsWindow(window) ){
top.eLoading(false,window);
}else{
top.eSWResize(window);
top.eSWView(window);
}
</SCRIPT>
</BODY></HTML>
<?PHP
exit;
function Status(){
$str = exec( "ping -c 1 -w 1 [IP]", $a, $a1 );
echo 'Desarrollo: 62.22.49.241: ';
if( strlen($str)>1 ){
echo "<span style='color:#FFFF00;background:#336600'> ".eLng('Conecta')." </span>";
}else{
echo "<span style='color:#FFFF00;background:#FF0000'> ".eLng('No Conecta')." </span>";
}
echo '<br>';
$str = exec( "ping -c 1 -w 1 [IP]", $a, $a1 );
echo 'Procesos..: 62.22.49.242: ';
if( strlen($str)>1 ){
echo "<span style='color:#FFFF00;background:#336600'> ".eLng('Conecta')." </span>";
}else{
echo "<span style='color:#FFFF00;background:#FF0000'> ".eLng('No Conecta')." </span>";
}
echo '<br>';
}
function DelFiles( $dorg ){
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != '.') && ($file != '..') ){
if( !is_dir($dorg. $file) && $file != 'index.htm' ){
echo '  '.eLng('Borrado').': '.$dorg.$file.'<br>';
@unlink( $dorg.$file );
}
}
}
}
function BackupFuentes( $_Backup, $_Backup2 ){
set_time_limit( 60*30 );
ignore_user_abort( 0 );
DelFiles( '../_tmp/cch/' );
DelFiles( '../_tmp/log/' );
DelFiles( '../_tmp/pdf/' );
DelFiles( '../_tmp/php/' );
DelFiles( '../_tmp/zip/' );
$NomFile = explode('/',$GLOBALS['DOCUMENT_ROOT'].$GLOBALS['SCRIPT_NAME']);
$NomFile = $NomFile[ count($NomFile)-3];
if( strtoupper(substr(PHP_OS,0,3))=='WIN' ){
if( substr($_Backup,-1) != '\\' ) $_Backup .= '\\';
if( $_Backup2!='' && substr($_Backup2,-1) != '\\' ) $_Backup2 .= '\\';
}else{
if( substr($_Backup,-1) != '/' ) $_Backup .= '/';
if( $_Backup2!='' && substr($_Backup2,-1) != '/' ) $_Backup2 .= '/';
}
chdir('../..');
if( !is_dir($_Backup) ) mkdir($_Backup,0777);
$FileZip = "{$_Backup}{$NomFile}_".date('Ymd');
if( substr_count( $_SERVER['HTTP_HOST'], '.' ) > 0 ){
$tmp = explode( '.',$_SERVER['HTTP_HOST'] );
$FileZip .= '_'.trim( $tmp[count($tmp)-1] );
}
$ZipEXE = ( strtoupper(substr(PHP_OS,0,3))=='WIN' ) ? 'edes\win\zip.exe' : 'zip';
exec( "{$ZipEXE} -9 -r {$FileZip} {$NomFile}/".'*' );
clearstatcache();
echo "  ------------------------------------------------\n  ";
$error = '';
passthru( "{$ZipEXE} -T {$FileZip}", $error );
echo "  ------------------------------------------------\n";
echo '  '.eNumberFormat(filesize("{$FileZip}.zip" ))." Kb";
if( $_Backup2!='' ){
echo "\n  ------------------------------------------------";
if( !copy( $FileZip.'.zip', "{$_Backup2}{$NomFile}_".date('Ymd').'.zip' ) ){
echo "\n  ".eLng('Error en segunda copia')."...\n {$FileZip}.zip -> {$_Backup2}{$NomFile}_".date('Ymd').'.zip';
}else{
echo "\n  ".eLng('Segunda copia en',$_Backup2);
}
}
echo '</PRE><P id="FIN">';
echo '<script type="text/javascript">';
if( $error!='' ){
echo 'document.body.style.filter = "";';
echo 'document.body.style.backgroundColor = "#FF0000";';
}
echo 'document.all("FIN").scrollIntoView();';
echo '</SCRIPT>';
}
function BackupDatos(){
$BD = 'edes';
$USU = 'felix';
$PASW = 'felix';
$FileDB = 'edes_'.date('Ymd').'.sql';
$a = array();
$al = '';
$str = exec( "mysqldump -h192.168.0.100 -ufelix -pfelix edes > gsopcion.sql", $a, $a1 );
echo '<br>';
for($i=0;$i<count($a);$i++){
echo $a[$i].'<br>';
}
echo '<br>';
echo '|'.($str+1).'|'.count($a).'|'.$a1.'|';
if( strlen($str)>1 ){
echo "<span style='color:#FFFF00;background:#336600'> ".eLng('Conecta')." </span>";
}else{
echo "<span style='color:#FFFF00;background:#FF0000'> ".eLng('No Conecta')." </span>";
}
echo '<br>';
}
function VerPhpIni(){
eInit();
ob_start();
phpinfo(INFO_GENERAL);
$string = ob_get_contents();
ob_end_clean();
$tmp = explode('Loaded Configuration File', $string);
$tmp = explode('</td>', $tmp[1]);
$tmp = explode('>', $tmp[1]);
$Dir = trim($tmp[1]);
eHTML();
?>
<style>
BODY {
SCROLLBAR-3DLIGHT-COLOR: #687074;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #a2b0b7;
SCROLLBAR-DARKSHADOW-COLOR: #687074;
SCROLLBAR-FACE-COLOR: #a2b0b7;
SCROLLBAR-HIGHLIGHT-COLOR: #a2b0b7;
SCROLLBAR-SHADOW-COLOR: #a2b0b7;
SCROLLBAR-TRACK-COLOR: #d4dfe4;
margin: 0px 0px 0px 3px;
color:#000000;
background:#FFFFFF;
font-size:14px;
font-family:arial;
}
</style>
</HEAD>
<BODY onhelp="return false;" onload='top.eBodyBackground(window)'>
<BR><CENTER style='color:blue'><B><?=eLng('FICHERO DE CONFIGURACION DE PHP')?></B></CENTER>
<PRE>
<?PHP
$Dim = file( $Dir );
for( $n=0; $n<count($Dim); $n++ ) echo htmlspecialchars( $Dim[$n] ).'<br>';
?>
<script type="text/javascript">
if( window.name=='IWORK' ){
top.eLoading(false,window);
}else{
top.eSWResize( window );
}
</SCRIPT>
</body></html>
<?PHP
eEnd();
}
function VerHttpdConf(){
eInit();
?>
<html><head>
<style>
TEXTAREA {
SCROLLBAR-3DLIGHT-COLOR: #687074;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #a2b0b7;
SCROLLBAR-DARKSHADOW-COLOR: #687074;
SCROLLBAR-FACE-COLOR: #a2b0b7;
SCROLLBAR-HIGHLIGHT-COLOR: #a2b0b7;
SCROLLBAR-SHADOW-COLOR: #a2b0b7;
SCROLLBAR-TRACK-COLOR: #d4dfe4;
}
</style>
</head>
<body style="margin:0px; font-size:14px; font-family:arial;" onload='top.eBodyBackground(window)' onhelp="return false;">
<?PHP
$DirHttpdconf = '';
echo '<table border=0px cellspacing=0px cellpadding=0px width=100% height=100% bgcolor="#ffffff"><tr><td>';
if( $DirHttpdconf == '' ){
$matriz = get_defined_vars();
if( strpos( $matriz["_"], 'apache'  ) === false ){
$Dir = '/';
}else{
$Dir = substr( $matriz["_"],0, strpos( $matriz["_"], '/', strpos( $matriz["_"], 'apache' ) ) );
}
$resultado = exec('find '.$Dir.' -name httpd.conf -print', $DimSalida );
$DirHttpdconf = '';
for( $n=0; $n<count($DimSalida); $n++ ){
if( substr_count($DimSalida[$n],':') == 0 ){
if( substr_count($DimSalida[$n],'apache') == 1 ){
$DirHttpdconf = $DimSalida[$n];
echo $DirHttpdconf.'<br>';
}
}
}
}
echo '<tr><td width=100% height=100%>';
if( $DirHttpdconf != '' ){
$Dim = file( $DirHttpdconf );
echo '<TEXTAREA NAME="txt" style="border:0px;margin-left:3px;width:100%;height:100%" WRAP=off>';
for( $n=0; $n<count($Dim); $n++ ) echo htmlspecialchars( $Dim[$n] );
echo '</TEXTAREA>';
}else{
echo eLng('No se ha encontrado el fichero para visualizar');
}
echo '</table>';
?>
<script type="text/javascript">
if( window.name=='IWORK' ){
top.eLoading(false,window);
}else{
top.eSWResize( window );
}
</SCRIPT>
<?PHP
echo '</body></html>';
}
function VerLogApache(){
global $_ApacheLog;
if( $_ApacheLog=='' ){
echo 'Falta definir la variable "/_d_/cfg/edes.ini->$_ApacheLog".';
return;
}
if( !file_exists( $_ApacheLog ) ){
eTrace('Fichero '.(($_SESSION['_D_']=="")?"":"'{$_ApacheLog}' ").'no encontrado.');
return;
}
?>
<style>
BODY {
font-style: Arial;
color: #000000;
}
#T {
color: blue;
font-size:18px;
font-weight: bold;
}
#E { color: red; }
#W { color: #007f00; }
#N { color: #000000; }
</style>
<?PHP
echo "\n";
echo '<span id=T>'.$_ApacheLog."</span> (últimas lineas)\n";
$df = fopen( $_ApacheLog, 'r' );
$Long = filesize( $_ApacheLog ) - 20000;
if( $Long > 0 ){
fseek( $df, $Long );
fgets($df,4096);
}
while( !feof($df) ){
$buffer = fgets($df,4096);
if( substr_count($buffer,'[error]')>0 ){
echo '<span id=E>';
}else if( substr_count($buffer,'[warn]')>0 ){
echo '<span id=W>';
}else{
echo '<span id=N>';
}
echo $buffer.'</span>';
}
fclose($df);
}
function NuevoUsuario(){
eInit();
die( eLng('Opción no implantada') );
}
