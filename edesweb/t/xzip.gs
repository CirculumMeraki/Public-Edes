<?PHP //[_PROTECCION_]
set_time_limit( 0 );
function _LoadSqlIni2( $File ){
$txt = trim(@file_get_contents( $File ));
if( substr($txt,0,2)!='<'.'?' ){
return gzuncompress($txt);
}else{
return substr( $txt, ( ( strtoupper(substr($txt,0,5))=='<'.'?PHP' ) ? 5 : 2 ), -2 );
}
}
$_DirBase = eGetCWD();
$_DirBase = str_replace('\\','/',$_DirBase);
$tmp = explode('/',$_DirBase);
$_DirBase = $tmp[ count($tmp)-2 ];
$NoExt = array('bak', 'alb', 'hta', 'xar', 'old', 'OLD', 'no', 'NO', '___');
if( $_gsID!=getmypid() ) exit;
$_DirG = 'g/e'; //include_once( $Dir_.'t/lp.gs' );
if( $_SESSION["_gsACCESO"]['ACCESO'] < 1 ) exit;
if( $_SESSION["_gsACCESO"]['Edit'] < 1 ) exit;
if( $_SESSION["_gsACCESO"]['TIPO'] != '~' ) exit;
$LINUX = ( $LINUX=='true' );
include( $Dir_.'m/edes.php' );
$__DirOrigen = '';
$__DirDestino = '';
$_FechaHora = mktime(3,1,0, 01,03,2007);
if( $TIPO_VERSION=='D' ){
$df = fopen( '../../edesweb/m/__demo.gs', 'r' );
$_PHPDemo = fread( $df, filesize('../../edesweb/m/__demo.gs') );
$_PHPDemo = str_replace("\t",'',$_PHPDemo);
$_PHPDemo = str_replace("\r",'',$_PHPDemo);
fclose($df);
}
if( $CHECKUNPHP==1 ){
$CheckFILE = '../../'.$CheckFILE;
$fd = fopen($CheckFILE,'r');
$txt = fread($fd,filesize($CheckFILE));
fclose($fd);
$fd = fopen( '../../edesweb/m/_tmp/_prueba.php', 'w' );
fputs( $fd, '<'.'?PHP echo "Script CORRECTO"; return; ?'.'>'.$txt );
fclose( $fd );
include( '../../edesweb/m/_tmp/_prueba.php' );
unlink( '../../edesweb/m/_tmp/_prueba.php' );
exit;
}
if( $ENCODARUNPHP!='' ){
EncodarSoloUnPHP( $ENCODARUNPHP );
exit;
}
function PeticionesPendientes(){
global $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario;
$_SqlHostName = '195.49.177.213';
$_SqlUsuario = 'felix';
$_SqlPassword = 'felix';
$_SqlDiccionario = 'e_gesoft';
$NumPeticiones = 0;
$NumError = 0;
?>
<html><head>
<style>
BODY {
FONT-FAMILY: ARIAL;
FONT-SIZE: 16px;
}
TD {
FONT-FAMILY: ARIAL;
FONT-SIZE: 12px;
}
</style>
<SCRIPT type="text/javascript">
function PutValores(){
var Obj = event.target || event.srcElement;
if( Obj.tagName!='TD' ) return;
Obj = Obj.parentElement;
if( Obj.parentElement.parentElement.getAttribute('OK') != 1 ) return;
parent.document.all.MACKADRESS.value = Obj.cells[0].innerText.replace(/^\s+/g,'').replace(/\s+$/g,'');
parent.document.all.USUARIO.value	 = Obj.cells[1].innerText.replace(/^\s+/g,'').replace(/\s+$/g,'');
parent.document.all.EMAIL.value		 = Obj.cells[2].innerText.replace(/^\s+/g,'').replace(/\s+$/g,'');
parent.document.all.CDI.value			 = Obj.cells[3].innerText.replace(/^\s+/g,'').replace(/\s+$/g,'');
}
document.onclick = PutValores;
</SCRIPT>
</head><body style='cursor:default;margin:0'><CENTER>
<?PHP
global $_SqlInit;
if( $NumPeticiones + $NumError > 0 ){
$Peticiones .= '<tr bgcolor="#CCCCCC"><td style="font-size:1px;">&nbsp;<td style="font-size:1px;">&nbsp;<td style="font-size:1px;">&nbsp;<td style="font-size:1px;">&nbsp;<TD>';
}
$Peticiones .= '<tr bgcolor="#FFFFCC"><td>M:XGQRS-N8FAX-EE36H-AP7FZ,M:2W97N-DF99E-WLX7W-UNRAV,M:9SMSY-99S5K-6D5MP-65ZUA,M:JT7PM-YUVET-25NNB-JNQX7,M:CHNV2-DPADR-J4SNN-W3BFM,M:4XKTX-SUXR4-K4EVG-5VMPN,M:VVCNN-G58GH-4FBXK-SBHK7,M:4FGC3-Z7FNB-6VUWM-AZF3K,M:X9FY5-Y5G5U-WV79H-VY6YP<td>FELIX<td>faranda@e-gesoft.com<td>¡¡¡ Los 7 !!!<TD>';
$Peticiones .= '<tr bgcolor="#CCCCCC"><td style="font-size:1px;">&nbsp;<td style="font-size:1px;">&nbsp;<td style="font-size:1px;">&nbsp;<td style="font-size:1px;">&nbsp;<TD>';
$Peticiones .= '<tr bgcolor="#FFFFCC"><td>M:2W97N-DF99E-WLX7W-UNRAV<td>FELIX<td>faranda@e-gesoft.com<td>Portatil FÉLIX<TD>';
$Peticiones .= '<tr bgcolor="#FFFFCC"><td>M:9SMSY-99S5K-6D5MP-65ZUA<td>ALBERTO<td>agarcia@e-gesoft.com<td>Portatil ALBERTO<TD>';
$Peticiones .= '<tr bgcolor="#FFFFCC"><td>M:JT7PM-YUVET-25NNB-JNQX7<td>FELIX<td>faranda@e-gesoft.com<td>Gesoft Pro+Desa<TD>';
$Peticiones .= '<tr bgcolor="#FFFFCC"><td>M:CHNV2-DPADR-J4SNN-W3BFM<td>FELIX<td>faranda@e-gesoft.com<td>Tecnor Procesos<TD>';
$Peticiones .= '<tr bgcolor="#FFFFCC"><td>M:4XKTX-SUXR4-K4EVG-5VMPN<td>FELIX<td>faranda@e-gesoft.com<td>Grupo 7 Procesos<TD>';
$Peticiones .= '<tr bgcolor="#CCCCCC"><td style="font-size:1px;">&nbsp;<td style="font-size:1px;">&nbsp;<td style="font-size:1px;">&nbsp;<td style="font-size:1px;">&nbsp;<TD>';
$Peticiones .= '<tr bgcolor="#FFFFCC"><td>M:NETSM-TKVKA-77TL3-TJKSC,M:2W97N-DF99E-WLX7W-UNRAV<td>JUAN JOSE<td>juan@netextrem.com<td>26-02-2008 14:41<td>JUAN JOSE FERNANDEZ IBAÑEZ / FELIX';
$Peticiones .= '<tr bgcolor="#FFFFCC"><td>M:DVQD9-CGKRA-L6FL5-CYJYJ,M:2W97N-DF99E-WLX7W-UNRAV<td>JUAN CARLOS<td>sukotruco@hotmail.com<td>04-04-2008 14:30<td>Juan Carlos Sahuquillo Garcia / FELIX';
$Peticiones .= '<tr bgcolor="#FFFFCC"><td>M:WHBTB-6858F-FFW5P-2BCPW,M:2W97N-DF99E-WLX7W-UNRAV<td>JUAN CARLOS<td>sukotruco@hotmail.com<td>16-04-2008 14:30<td>Juan Carlos Sahuquillo Garcia 2 / FELIX';
if( $Peticiones!='' ){
if( $NumPeticiones>0 ) echo '<FONT COLOR="red">';
echo '<B>DESCARGAS PENDIENTES "'.$NumPeticiones.'" ('.$TotalLicencias.'/'.$Descargadas.')</B><br>';
if( $NumPeticiones>0 ) echo '</FONT>';
echo '<table border=1 cellspacing=0 style="cursor:pointer" OK=1>';
echo '<col><col><col><col align=right><col>';
echo $Peticiones;
echo '</table>';
}
if( $ConError!='' ){
if( $Peticiones!='' ) echo '<br>';
echo '<B>DESCARGAS CON DATOS ERRONEOS ('.$NumError.')</B><br>';
echo '<table border=1 cellspacing=0 OK=0>';
echo '<col><col><col><col align=right><col>';
echo $ConError;
echo '</table>';
}
echo '</CENTER></body></html>';
unlink('../../edesweb.motor/edesweb/edes.php');
unlink('../../edesweb.motor/edesweb/web/edesweb/_d_/cfg/ed.lp');
}
if( $Peticiones==1 ){
PeticionesPendientes();
exit;
}
if( $ChequeaEncoder==1 ){
clearstatcache();
chdir( '../../edesweb.motor/' );
if( $SCRIPT!='' ){
sleep(2);
clearstatcache();
$file = $SCRIPT;
$fd  = fopen( 'edesweb/'.$file,'r');
$txt = fread($fd,4);
fclose($fd);
if( $txt != 'Zend' ){
if( substr_count( "$dorg/$file", '/edesweb/tcpdf/' )==0 && substr_count( "$dorg/$file", '/edesweb/tcpdf.old/' )==0  ){
echo '<br>Sin encodar: ';
if( substr($file,-3) == '.gs' || substr($file,-4) == '.inc' || substr($file,-4) == '.php' ){
echo '<font color=red>'.$dorg.'/'.$file.'</font>';
}else{
echo $dorg.'/'.$file;
}
}
}else{
echo 'Encodado Ok<br>';
$_User = 0;
eval( _LoadSqlIni2( '../'.$_GET['APLICACION'].'/_datos/config/sql.ini' ) );
include( '../edesweb/'.$_Sql.'.inc' );
$NomFile = $dorg.'/'.$file;
if( $NomFile[0]=='/' ) $NomFile = substr($NomFile,1);
$NomFile = '$'.$NomFile;
$Cdi = date('Y-m-d H:i:s');
qQuery( "insert into {$_SESSION['ShareDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '{$Cdi}', '{$NomFile}', 'S', '{$_SESSION['_UserEMail']}')");
}
exit;
}
ChequeaEncoder('.');
echo '<br>ok';
exit;
}
if( $RAUL=='23' ){
chdir('../../');
echo '<table border=1>';
if( $TIPO_VERSION=='F' ){
copy( 'edesweb/tapi_ctl_avaya.inc', 'edesweb.motor/tapi_ctl_avaya.inc' );
copy( 'edesweb/tapi_log_avaya.gs' , 'edesweb.motor/tapi_log_avaya.gs'  );
CopyTodoDir( 'edesweb/t/tree'		 , 'edesweb.motor/t/tree'		  , array( 'bak' ) );
}else if( $TIPO_VERSION=='D' || $TIPO_VERSION=="V" || $TIPO_VERSION=="B" ){
copy( 'edesweb/tapi_ctl_avaya.inc', 'edesweb.motor/edesweb/tapi_ctl_avaya.inc' );
copy( 'edesweb/tapi_log_avaya.gs' , 'edesweb.motor/edesweb/tapi_log_avaya.gs'  );
CopyTodoDir( 'edesweb/t/tree'		 , 'edesweb.motor/edesweb/t/tree'  , array( 'bak' ) );
}else{
die('ERROR: Falta definir el tipo Version');
}
echo '</table>';
die('Ficheros de RAUL copiados Ok');
}
function EnviarZIP( $FileLocal, $IdReg ){
global $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario;
$FTPServidor	= '195.49.177.210';
$FTPUsuario		= 'alberto';
$FTPPassord		= 'gavilan';
$FileServidor	= $FileLocal;
echo '<html><head></head><body>';
$IdConnect = ftp_connect($FTPServidor);
if( !$IdConnect ){
die('<SCRIPT type="text/javascript">alert("¡ La conexión FTP ha fallado !");</SCRIPT>');
}
$LoginOK = ftp_login( $IdConnect, $FTPUsuario, $FTPPassord );
if( !$LoginOK ){
die('<SCRIPT type="text/javascript">alert("¡ El Login FTP ha fallado !");</SCRIPT>');
}else{
echo "Conectado con {$FTPServidor}, para el usuario {$FTPUsuario}<br>";
}
$carga = ftp_put( $IdConnect, '/'.$FileServidor, $FileLocal, FTP_BINARY );
if( !$carga ){
die('<SCRIPT type="text/javascript">alert("¡ El envío FTP ha fallado !\n'.$FileLocal.'");</SCRIPT>');
}else{
echo "Fichero enviado: {$FileServidor}<br>";
?>
<SCRIPT type="text/javascript">
parent.document.all.MACKADRESS.value = '';
parent.document.all.USUARIO.value	 = '';
parent.document.all.EMAIL.value		 = '';
parent.document.all.CDI.value			 = '';
</SCRIPT>
<?PHP
}
ftp_quit( $IdConnect );
if( $carga ){
global $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario;
$_SqlHostName = '195.49.177.210';
$_SqlUsuario = 'felix';
$_SqlPassword = 'felix';
$_SqlDiccionario = 'e_gesoft';
eInclude($_Sql);
sql_Modifica( 'descarga', 'ok="S", cdi_gen="'.date('Y-m-d H:i:s').'"', "cd_descarga='{$IdReg}'" );
qEnd();
qFree();
echo 'Petición realizada OK<br>';
$df = fopen( "http://www.e-des.org/aviso_beta.gs?{$IdReg}", 'r' );
if( !$df ) die('ERROR al lanzar el emal<br>'."http://www.e-des.org/aviso_beta.gs?{$IdReg}<br>");
echo 'Email enviado: '.fread( $df, 1024 );
fclose($df);
}
echo '</body></html>';
}
if( $EnviarZIP==1 ){
chdir( '../../edesweb.motor' );
$MACKADRESS = trim(strtolower($MACKADRESS));
list( $CDI ) = explode(' ',$CDI);
$CDI = strtolower(trim($CDI));
EnviarZIP( $MACKADRESS.trim($CDI).'.zip', $CDI );
exit;
}
if( $LimpiarVersion==1 ){
chdir( '../../edesweb.motor/' );
echo '<B><U>SE DEJAN LOS FICHEROS:</U></B><br>';
if( substr_count( getCWD().'/', 'edesweb.motor/' ) == 1 ){
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
exec('rmdir /Q/S edes');
}else{
exec('rm -r edes');
}
LimpiarVersion( '.' );
}
exit;
}
if( $MENSAJE==1 ){
die(' Encriptar JS ok');
}
if( $LicenciaCrear==1 ){
$MACKADRESS = $_GET['MACKADRESS'];
Cabecera(' scroll="no"');
$__DirOrigen = '../';
$__DirDestino = 'edesweb/';
$error = LicenciaCrear( 'x', 'edesweb', true );
rename( "edesweb/web/edesweb/_d_/cfg/eedd.lp", "edesweb/web/edesweb/_d_/cfg/ed.lp" );
Pie( false, $error );
exit;
}
if( $LicenciaZIP == 1 ){
Cabecera(' scroll="no"');
$MACKADRESS = trim(strtolower($MACKADRESS));
if( strlen($MACKADRESS)!=12 ) die('ERROR: Longitud erronea en la MackAdress');
list( $CDI ) = explode(' ',$CDI);
$CDI = strtolower(trim($CDI));
$error = LicenciaZIP( $MACKADRESS, $CDI );
Pie( false, $error );
exit;
}
if( $ZIPENCODE==1 ){
global $_VERSIONZIP_;
$MACKADRESS = trim(strtolower($MACKADRESS));
$FileZip = $_VERSIONZIP_;
$FileZip = 'edesweb';
if( $NOMZIP!='' ) $FileZip = $NOMZIP;
chdir( '../../edesweb.motor' );
exec( "edesweb\win\zip -9 -r {$FileZip} edesweb/".'*' );
$error = '';
passthru( "edesweb\win\zip -T {$FileZip}", $error );
echo '  '.eNumberFormat(filesize("{$FileZip}.zip")).' Kb<br>';
die( 'Error['.$error.']' );
}
if( $ZIPENCODE != '' ){
Cabecera(' scroll="no"');
echo "<TR><TH colspan=2 id=c class=GRUPO>ZIP eDes</TH>";
echo "<TR><TD id=0>";
$FileZip = $_VERSIONZIP_;
chdir( 'edesweb.motor' );
unlink( $FileZip.'.zip' );
exec( "zip -9 -r {$FileZip} edes/".'*' );
$error = '';
passthru( "zip -T {$FileZip}", $error );
echo '  '.eNumberFormat(filesize("{$FileZip}.zip")).' Kb';
touch( $FileZip.'.zip', $_FechaHora );
Pie( false, $error );
exit;
}
if( $FechaYHora == 1 ){
chdir('../../edesweb.motor');
$_Nivel = 0;
echo '<table border=1>';
FechaMotor('.');
echo '<br>'.$_FechaHora;
exit;
}
if( $ZIPBASE != '' ){
if( file_exists($Dir_.'m/_tmp/_zend.log') ) unlink($Dir_.'m/_tmp/_zend.log');
Cabecera(' scroll="no"');
echo "<TR><TH colspan=2 id=c class=GRUPO>ZIP BASE de eDes</TH>";
echo "<TR><TD id=0>";
$FileZip = $_VERSIONZIP_;
chdir( 'edesweb.motor' );
unlink( $FileZip.'.zip' );
exec( "zip -9 -r {$FileZip} edes/".'*' );
$error = '';
passthru( "zip -T {$FileZip}", $error );
echo '  '.eNumberFormat(filesize("{$FileZip}.zip")).' Kb';
touch( $FileZip.'.zip', $_FechaHora );
echo "<TR><TH colspan=2 id=c class=GRUPO>ZIP BASE de eDes - FUENTES</TH>";
echo "<TR><TD id=0>";
$FileZip = 'edesweb.motor/'.$_VERSIONZIP_.'f';
chdir( '..' );
unlink( $FileZip.'.zip' );
exec( "zip -9 -r {$FileZip} edes/".'*' );
$error = '';
passthru( "zip -T {$FileZip}", $error );
echo '  '.eNumberFormat(filesize("{$FileZip}.zip")).' Kb';
touch( $FileZip.'.zip', $_FechaHora );
EncriptaZIP( "{$FileZip}.zip" );
Pie( false, $error );
exit;
}
if( $ZIP!='' ){
if( file_exists($Dir_.'m/_tmp/_zend.log') ) unlink($Dir_.'m/_tmp/_zend.log');
Cabecera(' scroll="no"');
$Encriptar = 'edes_'.date('ymd').'_'.$_VERSION_.'_';
$error = BackupFuentes( 'x', 'edesweb.motor', true );
EncriptaZIP($Encriptar.'x.zip');
EncriptaZIP($Encriptar.'f.zip');
EncriptaZIP($Encriptar.'z.zip');
if( $TIPO_VERSION=='D' ){
echo "<TR><TH colspan=2 id=c class=GRUPO>ZIP DEMO eDes</TH>";
echo "<TR><TD id=0>";
$FileZip = 'edes_demo_'.date('ym');
chdir( 'edesweb.motor' );
unlink( $FileZip.'.zip' );
exec( "zip -9 -r {$FileZip} edes/".'*' );
$error = '';
passthru( "zip -T {$FileZip}", $error );
echo '  '.eNumberFormat(filesize("{$FileZip}.zip")).' Kb';
touch( $FileZip.'.zip', $_FechaHora );
}
Pie( false, $error );
exit;
}
if( $ENCODER != '' ){
$Encriptar = $ENCRIPTAR;
chdir('../../');
EncriptaZIP( $Encriptar.'x.zip' );
EncriptaZIP( $Encriptar.'f.zip' );
EncriptaZIP( $Encriptar.'z.zip' );
exit;
}
function EncriptaZIP( $Fichero ){
if( !file_exists($Fichero) ) return;
$Encripta = $Fichero;
$Leng = strlen($Encripta);
$Xor = str_repeat($Encripta,floor(1024/$Leng)).substr($Encripta,0,1024%$Leng);
$Camufla = str_repeat('GeSoft',floor(1024/6)).substr('GeSoft',0,1024%6);
$Xor = $Xor^$Camufla;
$TLong = $Long = filesize($Fichero);
$Long = 1024;
$PosFile = 0;
$fd = fopen( $Fichero, 'r+' );
while( !feof($fd) && $PosFile < $TLong ){
fseek( $fd, $PosFile );
$txt = fread( $fd, 1024 );
$Long = strlen($txt);
fseek( $fd, $PosFile );
fwrite( $fd, ( $txt ^ substr($Xor,0,$Long) ) );
$PosFile += 1024;
}
fclose($fd);
echo ' -> Encriptación OK';
}
if( $INFO != '' ){
InformaDeLosPasos();
exit;
}
$dir_origen = 'edesweb';
$dir_destino = 'edesweb.motor';
$compactar = true;
$Copy = array('gs', 'inc', 'js', 'hta', 'htc', 'css', 'ini', 'php', 'sel',  'edf','gdf','ldf','fdf','idf','zdf');
$NoCopy = array('enc', 'bak', 'alb', 'hta', 'xar', 'old', 'OLD', 'no', 'NO', '___');
if( $VerLOG == 1 ){
$tmp = file( $Dir_.'m/_tmp/_zend.log' );
echo '[<br>';
for( $n=0; $n<count($tmp); $n++ ) echo $tmp[$n].'<br>';
echo ']';
exit;
}
Cabecera('');
if( isset($CHECK) ){
echo "<TR><TH colspan=2 id=c class=GRUPO>Chequea JavaScript</TH>";
$JSConError = $JSFileError = 0;
CheckJS( $dir_origen );
PieJS( ($JSFileError>0) );
exit;
}
if( isset($CHECKCSS) ){
echo "<TR><TH colspan=2 id=c class=GRUPO>Chequea JavaScript</TH>";
$JSConError = $JSFileError = 0;
CheckCSS( $dir_origen );
PieJS( ($JSFileError>0), true );
exit;
}
if( isset($ALMACEN) ){
if( $TIPO_VERSION!='F' ) $dir_destino .= '/edes';
CreaAlmacenEnC( $dir_destino );
exit;
}
copy( 'edesweb/abcm_f.inc', 'edesweb/abcm_f2.inc' );
CrearDirBase( $dir_destino );
$SubDir = false;
if( $TIPO_VERSION!='F' ){
$SubDir = true;
if( !is_dir($dir_destino.'/edes' ) ) mkdir( $dir_destino.'/edes', 0777 );
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
$dir_destino .= '\\edes';
}else{
$dir_destino .= '/edes';
}
if( !is_dir($dir_destino) ) mkdir( $dir_destino, 0777 );
}
if( $TIPO_VERSION!='F' ){
CrearLP( $USUARIO, $MACKADRESS, $EMAIL );
}
echo '<TR><TH colspan=2 id=c class=GRUPO>Copia MOTOR</TH>';
unlink( "{$dir_origen}/web/edesweb/_tmp/__tron.-1" );
CopyDirectorio( "{$dir_origen}", "{$dir_destino}", $Copy, $NoCopy );
CopyTodoDir( "{$dir_origen}/web/aplication", "{$dir_destino}/web/aplication"	, array('bak','log','old','OLD') );
CopyTodoDir( "{$dir_origen}/web/edesweb"	, "{$dir_destino}/web/edesweb"		, array('bak','log','old','OLD') );
unlink( "{$dir_destino}/web/edesweb/_d_/cfg/_ed.lp_" );
copy( "{$dir_origen}/web/edesweb/_d_/cfg/eedd.lp", "{$dir_destino}/web/edesweb/_d_/cfg/ed.lp" );
unlink( "{$dir_destino}/_definicion.sdf" );
unlink( "{$dir_destino}/__edita_lp.gs" );
unlink( "{$dir_destino}/__gp__lp.gs" );
unlink( "{$dir_destino}/_correo.gs" );
unlink( "{$dir_destino}/web/edesweb/_d_/cfg/eedd.lp" );
unlink( "{$dir_destino}/web/edesweb/_tmp/__tron.txt" );
unlink( "{$dir_destino}/web/edesweb/_tmp/__tron.-1" );
unlink( "{$dir_destino}/a/d/ver_motor.edf" );
unlink( "{$dir_destino}/http/config_edes.reg" );
unlink( "{$dir_destino}/i/i/js.ind" );
unlink( "{$dir_destino}/i/i/ie.ind" );
unlink( "{$dir_destino}/i/i/css_tools.ind" );
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
exec( 'rmdir /Q/S '.$dir_destino.'\\m' );
exec( 'del /S '.$dir_destino.'\\h\\i\\_std_*' );
}else{
exec( 'rm -r '.$dir_destino.'/m' );
exec( 'rm '.$dir_destino.'/h/i/_std_*' );
}
unlink( "{$dir_destino}/a/d/ver_motor.edf" );
unlink( "{$dir_destino}/a/d/actualizar_edes.php" );
$FileSQL = "{$dir_destino}/web/aplication/_datos/config/sql.ini";
$fd = fopen( $FileSQL, 'r' );
$txt = fread($fd,filesize($FileSQL));
fclose($fd);
$txt = str_replace( '<'.'? //[CVS] ', '<'.'? //[CVS] '.date('Y-m-d:H'), $txt );
$txt = str_replace( '<'.'?PHP //[CVS] ', '<'.'?PHP //[CVS] '.date('Y-m-d:H'), $txt );
$fd = fopen( $FileSQL, 'w' );
fputs( $fd, $txt );
fclose( $fd );
echo "<TR><TD id={$_Nivel}>".$file;
copy( "{$dir_origen}/t/__edes.arb"			, "{$dir_destino}/t/__edes.arb" );
copy( "{$dir_origen}/t/__analista.arb"		, "{$dir_destino}/t/__analista.arb" );
copy( "{$dir_origen}/t/__master.arb"		, "{$dir_destino}/t/__master.arb"		);
copy( "{$dir_origen}/t/__programador.arb"	, "{$dir_destino}/t/__programador.arb"	);
copy( "{$dir_destino}/edes.php"				, "{$dir_origen}/m/_version/edes.php"	);
copy( "{$dir_origen}/_vb/gsInventory/bin/Release/gsInventory.exe", "{$dir_destino}/t/gsinventory.exe" );
$compactar = true;
DelDirFile( $dir_destino.'/h/'		, '_'		);
DelDirFile( $dir_destino.'/h/'		, 'doc_'	);
DelDirFile( $dir_destino.'/t/g/'		, ''		);
DelDirFile( $dir_destino.'/t/store/', ''		);
DelHelp( $dir_destino.'/h', '_edes' );
DelHelp( $dir_destino.'/h', 'doc'   );
$DelFileT = array(
'/web/aplication/_d_/cfg/alerts.ini',
'/a/u/edes.php',
'/h/g/como.jpg',
'/h/g/como1.jpg',
'/h/g/edesdeveloped.jpg',
'/h/g/esquema.jpg',
'/h/g/gs_db.jpg',
'/h/g/gs_db1.jpg',
'/h/g/gs_folder2.jpg',
'/h/g/icono.jpg',
'/h/g/manual.jpg',
'/h/g/portada_label.jpg',
'/h/i/help22.ind',
'/i/js.ind',
'/i/ie.ind',
'/web/edesweb/_tmp/__tron.-1'
);
$tmp = explode( ',', $DelFileT );
for( $n=0; $n<count($DelFileT); $n++ ) unlink( $dir_destino.$DelFileT[$n] );
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
exec( 'rmdir /Q/S '.$dir_destino.'\\t\\m' );
}else{
exec( 'rm -r '.$dir_destino.'/t/m' );
}
if( $TIPO_VERSION!='F' ){
if( $TIPO_VERSION!='D' ){
unlink( "{$dir_destino}/edes.php" );
unlink( "{$dir_destino}/web/edesweb/_d_/cfg/ed.lp" );
}
}else{
$fdo = fopen( "{$dir_destino}/edes.php", 'r' );
$txt = fread( $fdo, filesize("{$dir_destino}/edes.php") );
fclose( $fdo );
$MACKADRESS = trim(strtoupper($MACKADRESS));
$Mac = str_replace(',',',,',$MACKADRESS);
$Mac = chunk_split($Mac,2,"'.'");
$Mac = "'".substr(str_replace(',,',',',$Mac),0,-2);
$oo = "'000BCDCF87E3,00C0A8F86697,000BCD713474,0016173DDCB1'";
$aa = $Mac;
$txt = str_replace( $oo, $aa, $txt );
$fdo = fopen( "{$dir_destino}/edes.php", 'w' );
fwrite( $fdo, $txt );
fclose( $fdo );
}
BorraFicherosDePruebas( $dir_destino );
if( $TIPO_VERSION=='B' ){
echo "<TR><TH colspan=2 id=c class=GRUPO>Versión BetaTester";
}
if( $TIPO_VERSION=='DDDDDDDDDDDD' ){
echo "<TR><TH colspan=2 id=c class=GRUPO>Versión DEMO";
include("{$dir_origen}/m/_demo.php");
$oo = "if(".'$'."_SERVER['QUERY_STRING']==chr(71).'e'.chr(83).'o'.'ft'.date('Ym')){";
$aa = "if( date('Y'.'m'.'d') > '".date('Y'.'m'.'d',mktime(0,0,0, date('m'), date('d')+$DiasDeDemo, date('Y') ))."' ) exit;\n";
$txt = str_replace( $oo, $aa.$oo, $txt );
$oo = "if(".'$'."_SERVER['QUERY_STRING']==chr(71).'e'.chr(83).'o'.'ft'.date('Ym')){";
$aa = "if( strtoupper(substr(PHP_OS,0,3)) != 'WIN' ) exit;\n";
$txt = str_replace( $oo, $aa.$oo, $txt );
$fdo = fopen( "{$dir_destino}/edes.php", 'w' );
fwrite( $fdo, $txt );
fclose( $fdo );
for( $n=0; $n<count($DelFile); $n++ ) unlink( $dir_destino.'/'.str_replace('../','',$DelFile[$n]) );
for( $n=0; $n<count($DelDir) ; $n++ ){
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
exec( 'rmdir /Q/S '.$dir_destino.'\\'.str_replace('../','',$DelDir[$n] ) );
}else{
exec( 'rm -r '.$dir_destino.'/'.str_replace('../','',$DelDir[$n] ) );
}
}
$DimDF = array( '_ficha.gs','_gficha.gs','_lista.gs' );
for( $f=0; $f<count($DimDF); $f++ ){
$lineas = file( $dir_destino.'/'.$DimDF[$f] );
$txt = '';
foreach( $lineas as $linea ){
for( $e=0; $e<count($DelLabel); $e++ ){
if( $linea == "case '".$DelLabel[$e]."':\n" ){
$linea = str_replace( $DelLabel[$e], '.', $linea );
break;
}
}
$txt .= $linea;
}
$fdo = fopen( $dir_destino.'/'.$DimDF[$f], 'w' );
fwrite( $fdo, $txt );
fclose( $fdo );
}
}
$error = BackupFuentes( 'f', 'edesweb', true );
$error = BackupFuentes( 'z', 'edesweb.motor', false );
Pie( true, $error );
exit;
function GrabaLoginPassword( $_SqlHostName,$_xLogin, $_xPassword,$_DirDestino ){
$txt = 'GeSoft'.chr(10).
$_SqlHostName.','.$_SERVER['HTTP_HOST'].chr(10).
'7'.chr(10).
'A	'.'ALBERTO'.'	'.'091808FCFE95AD6473DEC65AEDD05E90'.chr(10).
'A	'.'FELIX'  .'	'.'86FB29239506DD89717107ADAA23E65D'.chr(10);
if( $_xLogin!='' && $_xPassword!='' ) $txt = $txt .'M	'.strtoupper($_xLogin).'	'.strtoupper(md5($_xPassword)).chr(10);
$rr = GrabarLP( $txt, '../edesweb.motor/t/ed.df' );
echo '<BR><BR>'.str_replace( chr(10),'<br>',$txt);
echo '<BR>Fichero de claves creado';
exit;
}
if( !isset($dir_origen) || !isset($dir_destino) ){
?>
<!DOCTYPE HTML><HTML><HEAD>
<TITLE> edes-edit </TITLE>
<style>
TABLE { FONT-SIZE: 12px; }
#c { text-align: center; }
#d { text-align: right; }
#s { padding-left: 10; }
TD { padding-left: 10; }
INPUT { BORDER: 1 solid #019; }
</style>
</HEAD>
<BODY style='margin:0; font-family: ARIAL;'>
<table style='width=100%;height:100%;'><tr><td valign=middle align=center>
<div style='padding:10; background:#ccc; border: 1 solid #019; width:1;height:1'>
<table cellspacing=0 cellpadding=0 style='background:#ccc; color:#01c'>
<FORM NAME='FRM1' METHOD='POST' enctype="multipart/form-data">
<tr><th colspan=2 align=center valign=top><b>COMPACTAR VERSION</b></th></tr>
<tr height=5><th colspan=2></th></tr>
<?PHP  if( !isset($dir_destino) ){ ?>
<tr><td id=d>Directorio Origen<td><INPUT NAME='dir_origen'  TYPE='TEXT' VALUE='../edes' MAXLENGTH=20 SIZE=20 TITLE='Directorio donde están los ORIGINALES'></tr>
<?PHP  } ?>
<?PHP  if( isset($dir_origen) ){ ?>
<tr><td id=d>Directorio Destino	<td><INPUT NAME='dir_destino'	TYPE='TEXT'  VALUE='/usr/paginas/edes.zip' MAXLENGTH=20 SIZE=20 TITLE='Directorio TEMPORAL donde colocaremos los fuentes'></tr>
<tr><td id=d>Directorio BASE		<td><INPUT NAME='dir_base'		TYPE='TEXT'  VALUE='edesweb.motor'				 MAXLENGTH=20 SIZE=20 TITLE='Directorio donde se EJECUTARAN los fuentes'></tr>
<tr><td id=d>Acción a ejecutar	<td>
<SELECT NAME='ejecutar'>
<OPTION VALUE='C'>Compactar script
<OPTION VALUE='J' style='background: red; color: #FFFFFF'>Copiar solo JS
</SELECT>
</tr>
<tr><td id=d>IPs permitidas<td>
<SELECT NAME='ip[]' MULTIPLE>
<?PHP
$Dim = file( "../{$dir_origen}/_datos/config/sql.ini" );
for( $i=0; $i<count($Dim); $i++ ){
$tmp = trim($Dim[$i]);
if( substr($tmp,0,5) == 'case ' ){
$tmp = explode('//',$tmp);
$tmp[0] = substr($tmp[0],5);
$tmp[0] = trim($tmp[0]);
$tmp[0] = str_replace("'",'',$tmp[0]);
$tmp[0] = str_replace('"','',$tmp[0]);
$tmp[0] = str_replace(':','',$tmp[0]);
$tmp[0] = str_replace(' ','',$tmp[0]);
echo "<OPTION VALUE='{$tmp[0]}'>{$tmp[1]}";
}
}
?>
</SELECT>
</tr>
<tr><td id=d>Tipo de copia<td>
<SELECT NAME='tipo_copia'>
<OPTION VALUE='D'>Desarrollo
<OPTION VALUE='P' style='background: red; color: #FFFFFF'>Procesos
</SELECT>
</tr>
<?PHP  } ?>
<tr><td colspan=2>&nbsp;</tr>
</form>
<tr><td id=c colspan=2><INPUT TYPE='submit' VALUE='ENVIAR' onclick='Enviar()' style='background: #019;color: #ccc;FONT-WEIGHT: bold;'></tr>
</table>
</div>
</table>
<SCRIPT type="text/javascript">
function Enviar(){ document.FRM1.submit(); }
</SCRIPT>
</BODY>
</HTML>
<?PHP
exit;
}else{
?>
<!DOCTYPE HTML><HTML><HEAD>
<TITLE> edes-edit </TITLE>
<style>
#0  { padding-left:  10; color: #000099; }
#1  { padding-left:  40; color: #000099; }
#2  { padding-left:  70; color: #000099; }
#3  { padding-left: 100; color: #000099; }
#4  { padding-left: 130; color: #000099; }
#5  { padding-left: 160; color: #000099; }
#0c { padding-left:  10; color: red; }
#1c { padding-left:  40; color: red; }
#2c { padding-left:  70; color: red; }
#3c { padding-left: 100; color: red; }
#4c { padding-left: 130; color: red; }
#5c { padding-left: 160; color: red; }
TH { background: #cccccc; text-align: left; }
TD { background: #FFFFCC; }
#c { text-align: center; }
#d { text-align: right; }
.GRUPO {
background: #000099;
color:#FFFFFF;
}
</style>
</HEAD>
<BODY style='margin:0; font-family: ARIAL;'>
<?PHP
$ejecutar == 'C';
$compactar	= (( $ejecutar == 'C' ) ? true : false );
$dir_destino= trim($dir_destino);
$dir_origen = trim($dir_origen);
echo '<table width="100%" border=1 cellspacing=0 cellpadding=0>';
}
if(!in_array($_SERVER['HTTP_HOST'],array('62.22.87.31','172.16.1.31','192.168.0.100'))) exit;
$BytsOri = $BytsDes = $BytsCOri = $BytsCDes = 0;
$Rastro = false;
$_Nivel = -1;
if( $ejecutar=='J' ){
$compactar = true;
}else{
CrearDirBase( '../'.$dir_destino );
CreaIndexHtml( $dir_origen, $dir_destino, $dir_base );
echo "<TR><TH colspan=2 id=c class=GRUPO>Copiando a '{$dir_destino}'</TH>";
if( $tipo_copia=='D' ){
$Copy = array( 'gs', 'inc', 'js', 'css', 'ini' );
}else{
$Copy = array( 'gs', 'inc', 'js', 'css', 'ini', 'php', 'php3', 'php4' );
}
$NoCopy = array( 'bak', 'alb', 'hta', 'xar', 'old', 'OLD', 'no', 'NO' );
CopyDirectorio( "../{$dir_origen}", "../{$dir_destino}", $Copy, $NoCopy );
$compactar = false;
CopyJS( '../edes-edit/_js_/encoder'   , "../{$dir_destino}/edesweb"			  , '', false );
CopyJS( '../edes-edit/_js_/encoder_ed', "../{$dir_destino}/edesweb/js_encoder", '', false );
ZipSqlUsu( "../{$dir_destino}/_datos/config/sql.ini", $ListIP );
copy( "../{$dir_origen}/_datos/config/empty_page.htm", "../{$dir_destino}/_datos/config/empty_page.htm" );
copy( "../{$dir_origen}/_datos/config/empty_html.htm", "../{$dir_destino}/_datos/config/empty_html.htm" );
copy( "../{$dir_origen}/_datos/config/about.htm", "../{$dir_destino}/_datos/config/about.htm" );
CopyLP( "../{$dir_origen}/edesweb/t/ed.df", "../{$dir_destino}/edesweb/t/ed.df", $ListIP );
FechaLib( "../{$dir_destino}/" );
}
echo '</table>';
echo '<CENTER>';
echo "<table border=1 cellspacing=0 cellpadding=2>";
echo "<TR><TH colspan=2 id=c class=GRUPO>RESUMEN</TH>";
echo "<TR><TH colspan=2 id=c>SOLO COPIA</TH>";
echo "<TR><TD>Total Origen					<TD id=d>".eNumberFormat($BytsOri);
echo "<TR><TD>Total Destino					<TD id=d>".eNumberFormat($BytsDes);
echo "<TR><TH colspan=2 id=c>COMPRIMIDO "			  .eNumberFormat(($BytsCDes*100)/$BytsCOri,2)."%</TH>";
echo "<TR><TD>Total Origen					<TD id=d>".eNumberFormat($BytsCOri);
echo "<TR><TD>Total Destino COMPACTADO		<TD id=d>".eNumberFormat($BytsCDes);
echo '</table></CENTER>';
echo '</BODY>';
echo '</HTML>';
exit;
function ZipFile( $fichorg, $fichdest, $SoloJS, $IpOk ){
global $_Nivel, $compactar, $tipo_copia, $DimIP, $SubDir, $TIPO_VERSION, $dir_origen;
$dir = substr( $fichorg, 0, strrpos($fichorg,'/')+1 );
$NomFile = substr( $fichorg, strrpos($fichorg,'/')+1 );
$NomExt = substr($NomFile, strrpos($NomFile,'.')+1);
echo "<TR><TD id={$_Nivel}c>".substr($fichdest,strrpos($fichdest,'/')+1);
if( $NomExt == 'js' ){
$fdo = fopen( $fichorg, 'r' );
$buffer = fread( $fdo, 3 );
fclose( $fdo );
if( '#@~' == $buffer ){
copy( $fichorg, $fichdest );
touch( $fichdest, filemtime($fichorg) );
return;
}
}
$Mostrar = false;
$fdd = fopen( $fichdest, 'w' );
$fdo = fopen( $fichorg, 'r' );
while( !feof($fdo) ){
$buffer = fgets( $fdo, 4096 );
$buffer = trim( $buffer );
if( empty( $buffer ) ) continue;
if( $NomExt=='gs' ){
if( $buffer=='//{#}eDes{#}' ){
if( $TIPO_VERSION=='D' ){
global $_PHPDemo;
$buffer = $_PHPDemo;
}
}
if( $NomFile == 'edes.php' ){
if( $TIPO_VERSION=='D' ){
if( $buffer=='//IfProcesoEDes:' ){
while( !feof($fdo) ){
if( trim( fgets( $fdo, 4096 ) )=='//ElseProcesoEDes:' ) break;
}
fgets( $fdo, 4096 );
$buffer='';
while( !feof($fdo) ){
$xbuffer = trim( fgets( $fdo, 4096 ) );
if( $xbuffer=='*/' ){
fgets( $fdo, 4096 );
break;
}else{
$buffer .= $xbuffer."\n";
}
}
}
}
}
}
if( $buffer[0].$buffer[1] == '/'.'/' ) continue;
if( $NomFile == 'main.gs' ){
if( substr_count( $buffer, "<META NAME='Generator' CONTENT='gsEdit " ) == 1 ){
$i = strpos( $buffer, "<META NAME='Generator' CONTENT='gsEdit " );
$f = strpos( $buffer, "'>", $i )+2;
$buffer = str_replace( substr($buffer,$i,$f-$i ), "<META NAME='Generator' CONTENT='gsEdit ".date('y.m')."a'>", $buffer );
}
}
if( $TIPO_VERSION=='D' && $NomFile == 'login.gs' ){
if( substr_count( $buffer, '$_i_ = -1;' ) == 1 ){
$buffer = str_replace( '$_i_ = -1;', '$_i_ = 1;', $buffer );
}
}
if( $NomFile == 'edes.php' ){
if( substr_count( $buffer, "'#nSerie#'" ) > 0 ){
$FileLicencias = 'edesweb/m/_licencias.txt';
$NumLicencia = (date('Hyimsd') / (pow(2,6)*3*643));
$buffer = str_replace( "'#nSerie#'", $NumLicencia, $buffer );
global $USUARIO, $MACKADRESS, $EMAIL, $_VERSION_, $LINUX;
error_log(	'Fecha....: '.date('Y-m-d H:i:s').chr(10).
'Versión..: '.$_VERSION_.chr(10).
'S.O. ....: '.(( $LINUX ) ? 'LINUX':'WINDOWS').chr(10).
'KeyCode..: '.round($NumLicencia*(pow(2,6)*3*643)).chr(10).
'Usuario..: '.$USUARIO.chr(10).
'MacAddres: '.$MACKADRESS.chr(10).
'EMail....: '.$EMAIL.chr(10).
chr(10), 3, $FileLicencias );
}
}
$pos = strpos( $buffer, "\t".'//' );
if( $pos !== false ){
$buffer = trim(substr( $buffer, 0, $pos ));
$sBuf = trim(substr( $buffer, 0, $pos ));
if( substr_count( '*;:{}', substr( $sBuf, strlen( $sBuf )-1 ) ) == 1 ){
if( strtoupper(substr( $sBuf, strlen( $sBuf )-5 )) != 'HTTP:' && strtoupper(substr( $sBuf, strlen( $sBuf )-6 )) != 'HTTPS:' ){
$buffer = trim(substr( $buffer, 0, $pos ));
}
}
}
$pos = strpos( $buffer, '/'.'*' );
if( $pos !== false ){
$buff = substr( $buffer, 0, $pos );
$pos = strpos( $buffer, '*'.'/' );
while($pos === false && !feof($fdo)){
$buffer = fgets( $fdo, 4096 );
$pos = strpos( $buffer, '*'.'/' );
}
$buffer = $buff.' '.substr( $buffer, $pos+2 );
$buffer = trim( $buffer );
if( empty($buffer) ) continue;
}
$pos = strpos( $buffer, '<'.'!--' );
if( $pos !== false && ( substr($buffer,4,1)==' ' || ord(substr($buffer,4,1))==chr(10) ) ){
$buff = substr( $buffer, 0, $pos );
$pos = strpos( $buffer, '--'.'>' );
while($pos === false && !feof($fdo)){
$buffer = fgets( $fdo, 4096 );
$pos = strpos( $buffer, '--'.'>' );
}
$buffer = $buff.' '.substr( $buffer, $pos+3 );
$buffer = trim( $buffer );
if( empty($buffer) ) continue;
}
fwrite( $fdd, $buffer.chr(10) );
}
fclose( $fdo );
fclose( $fdd );
if( $NomExt == '.js.' ){
$fdo = fopen( $fichdest, 'r' );
$buffer = fread( $fdo, filesize($fichdest) );
fclose( $fdo );
$Dim = explode( "\n", $buffer );
$txt = '';
for( $n=0; $n<count($Dim);$n++ ){
$txt .= trim($Dim[$n]);
}
$fdd = fopen( $fichdest, 'w' );
fwrite( $fdd, trim($txt) );
fclose( $fdd );
}
if( $NomExt == 'css' ){
$fdo = fopen( $fichdest, 'r' );
$buffer = fread( $fdo, filesize($fichdest) );
fclose( $fdo );
$Dim = explode( "\n", $buffer );
$txt = '';
for( $n=0; $n<count($Dim);$n++ ){
$txt .= $Dim[$n];
}
$fdd = fopen( $fichdest, 'w' );
fwrite( $fdd, trim($txt) );
fclose( $fdd );
}
if( substr_count( '.edf.gdf.ldf.fdf.idf.zdf.sdf.', ".{$NomExt}." ) > 0 ){
$fdo = fopen( $fichdest, 'r' );
$buffer = fread( $fdo, filesize($fichdest) );
fclose( $fdo );
$ElPuntoEsRem = true;
$EnFields = false;
$Dim = explode( "\n", $buffer );
$txt = '';
for( $n=0; $n<count($Dim);$n++ ){
if( $Dim[$n][0] == '.' && $ElPuntoEsRem ){
}else if( $Dim[$n][0] == '/' && $Dim[$n][1] == '/' ){
}else if( $Dim[$n] == '' ){
}else if( $Dim[$n][0] == '[' ){
$EnFields = false;
$i = strpos($Dim[$n],']');
$Etiqueta = strtoupper( substr( $Dim[$n], 1, $i-1 ) );
$ElPuntoEsRem = ( $Etiqueta<>'CSSADD' );
$Iz = substr($Dim[$n],0,$i+1);
$De = substr($Dim[$n],$i+1);
$tmp = explode('|',$De);
$nDe = '';
for( $i=0; $i<count($tmp); $i++ ){
if( $i>0 ) $nDe .= '|';
$nDe .= trim($tmp[$i]);
}
$Dim[$n] = $Iz.$nDe;
if( $Etiqueta == 'NOTE' ){
break;
}else if( $Etiqueta == 'EXIT' ){
$txt .= $Dim[$n];
break;
}else if( substr_count( ',LOADSEL,LOADINI,DEBUG,GPFIELDS,LOCKFILE,SAVEFORM,TEMPLATE,', ",{$Etiqueta}," ) == 1 ){
}else{
$txt .= $Dim[$n]."\n";
if( $Etiqueta == 'FIELDS' ) $EnFields = true;
}
}else{
if( $EnFields ){
$tmp = explode('|',$Dim[$n]);
$nDe = '';
for( $i=0; $i<count($tmp); $i++ ){
if( $i>0 ) $nDe .= '|';
$nDe .= trim($tmp[$i]);
}
$Dim[$n] = $nDe;
}
$txt .= $Dim[$n]."\n";
}
}
if( $NomExt == 'zdf' ){
$nfa = count(explode( "\n", $txt ));
$zTxt = gzcompress($txt);
$zDTxt = gzuncompress($zTxt);
$Info = '<pre>';
$Info .= 'Longitud old:'.strlen($txt);
$Info .= '<br>Longitud new:'.strlen($zDTxt);
$nfd = count(explode( "\n", $zDTxt ));
$Info .= '<br>Nº lineas old:'.$nfa;
$Info .= '<br>Nuevas lineas:'.$nfd;
$Info .= '</pre>';
$txt = 'eDes '.$zTxt;
if( $nfa<>$nfd ){
echo $Info;
die('Error: No se ha encriptado correctamente');
}
file_put_contents($fichdest,$txt);
}else{
file_put_contents($fichdest,trim($txt));
}
}
}
function LimpiarVersion( $dorg ){
$PathDir = array(
'edes',
'edes/web',
'edes/web/edesweb',
'edes/web/edesweb/_d_',
'edes/web/edesweb/_d_/cfg',
);
for( $i=0; $i<count($PathDir); $i++ ){
$NomDir = $dir.$PathDir[$i];
CreaDir( $NomDir );
}
}
function CreaDir( $dir ){
echo 'Crea directorio: '.$dir.'<br>';
if( is_dir( $dir ) ){
if( !is_readable(  $dir ) ) die('ERROR: (a) No es de lectura: '.$dir);
if( !is_writeable( $dir ) ) die('ERROR: (a) No es de escritura: '.$dir);
return;
}
if( !mkdir( $dir, 0777 ) )  die('No se ha podido crear el directorio: '.$dir);
if( !is_dir( $dir ) )		 die('No está el directorio: '.$dir);
if( !is_readable(  $dir ) ) die('ERROR: (d) No es de lectura: '.$dir);
if( !is_writeable( $dir ) ) die('ERROR: (d) No es de escritura: '.$dir);
}
function CopyDirectorio( $dorg, $ddest, $ext, $NoExt, $ConBarra=false ){
global $BytsOri, $BytsDes, $BytsCOri, $BytsCDes, $Rastro;
global $dir_origen, $dir_destino, $_Nivel, $compactar, $tipo_copia;
$_Nivel++;
if( $Rastro ) echo "<BR><BR>[$dorg -> $ddest]";
if( !is_dir( $ddest ) ) mkdir( $ddest, 0777 );
if( !is_readable(  $dorg  ) ) die( "<br>Error al abrir el directorio de origen '$dorg'" );
if( !is_writeable( $ddest ) ) die( "<br>Error al abrir el directorio de destino '$ddest'" );
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( strtoupper($file)=='THUMBS.DB' ){
unlink($dorg.'/'.$file);
continue;
}else if( substr($file,0,3)=='zct' && substr($file,-4)=='.tmp' && strlen($file)==9 ){
unlink($dorg.'/'.$file);
continue;
}else if( substr($file,-5)=='.old2' ){
unlink($dorg.'/'.$file);
continue;
}
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( is_dir($dorg.'/'.$file) && $file != $ddest ){
if( $file[0]!='_' && substr($file,-1)!='_' ){
if( !is_dir( "$ddest/$file" ) ) mkdir( "$ddest/$file", 0777 );
echo "<TR><TH id={$_Nivel}>{$ddest}/{$file}";
CopyDirectorio( "$dorg/$file", "$ddest/$file", $ext, $NoExt, $ConBarra );
}
}else{
if( substr_count( $ddest, '/_bak_/' ) == 0 ){
if( in_array( substr($file, strrpos($file,'.')+1), $ext ) ){
$BytsOri += filesize( "$dorg/$file" );
$BytsCOri += filesize( "$dorg/$file" );
if( !$compactar ){
if( $ConBarra || $file[0] != '_' ){
echo "<TR><TD id={$_Nivel}>".$file;
copy( "$dorg/$file", "$ddest/$file" );
}
}else{
if( substr( "$dorg/$file",0,11 ) == 'edes/tcpdf/' ){
echo "<TR><TD id={$_Nivel}>".$file;
copy( "$dorg/$file", "$ddest/$file" );
}else{
ZipFile( "$dorg/$file", "$ddest/$file", false );
}
}
$BytsDes += filesize( "$ddest/$file" );
$BytsCDes += filesize( "$ddest/$file" );
}else{
if( !in_array( substr($file, strrpos($file,'.')+1), $NoExt ) ){
if( $file != 'index.htm' && (substr_count( $dorg,'/_')==0 || $ConBarra ) ){
if( $file != 'ws_ftp.log' && ( substr($file,0,2) != '__' || $ConBarra ) ){
if( $Rastro ) echo '<br>&nbsp;&nbsp;&nbsp;'.$dorg.'/'.$file;
echo "<TR><TD id={$_Nivel}>".$file;
$BytsOri += filesize( "$dorg/$file" );
$BytsDes += filesize( "$dorg/$file" );
copy( "$dorg/$file", "$ddest/$file" );
}
}
}
}
}
}
}
}
closedir( $di );
if( $Rastro ) echo '<BR>';
$_Nivel--;
}
function CopyJS( $dorg, $ddest, $IpOk, $ConZip ){
global $compactar;
echo "<TR><TH colspan=2 id=c class=GRUPO>Encoder: {$dorg}</TH>";
$dorg = str_replace('\\','/',$dorg);
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != ".") && ($file != "..") ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( is_dir($dorg.'/'.$file) && ($file != $ddest) ){
}else{
if( substr($file, strrpos($file,'.')+1) == 'js' && ( (substr_count($dorg,'/')==2 && substr_count($dorg.'/','/edesweb/')==1) || (substr_count($dorg,'/')==3 && strstr($dorg,'/lib/js')) || $IpOk == '' ) ){
if( $ConZip && substr_count( '/'.$dorg.'/'.$file.'/', '/tcpdf/' )==0 ){
ZipFile( "$dorg/$file", "$ddest/$file", true, $IpOk );
}else{
echo "<TR><TD id=0>".$file;
copy( "$dorg/$file", "$ddest/$file" );
}
}else{
}
}
}
}
closedir( $di );
}
function CopyTodoDir( $dorg, $ddest, $NoExt ){
global $BytsOri, $BytsDes, $BytsCOri, $BytsCDes, $Rastro;
global $dir_origen, $dir_destino, $_Nivel, $compactar, $tipo_copia;
$_Nivel++;
if( $Rastro ) echo "<BR><BR>[$dorg -> $ddest]";
if( !is_dir( $ddest ) ) mkdir( $ddest, 0777 );
if( !is_readable(  $dorg  ) ) die( "<br>Error al abrir el directorio de origen '$dorg'" );
if( !is_writeable( $ddest ) ) die( "<br>Error al abrir el directorio de destino '$ddest'" );
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( is_dir($dorg.'/'.$file) && $file != $ddest ){
if( !is_dir( "$ddest/$file" ) ) mkdir( "$ddest/$file", 0777 );
echo "<TR><TH id={$_Nivel}>{$ddest}/{$file}";
CopyTodoDir( "$dorg/$file", "$ddest/$file", $NoExt );
}else{
if( !in_array( substr($file, strrpos($file,'.')+1), $NoExt ) ){
if( $Rastro ) echo '<br>&nbsp;&nbsp;&nbsp;'.$dorg.'/'.$file;
echo "<TR><TD id={$_Nivel}>".$file;
$BytsOri += filesize( "$dorg/$file" );
$BytsDes += filesize( "$dorg/$file" );
copy( "$dorg/$file", "$ddest/$file" );
}
}
}
}
closedir( $di );
if( $Rastro ) echo '<BR>';
$_Nivel--;
}
function BorraFicherosDePruebas( $Dir ){
if( !is_readable(  $Dir ) ) die( "<br>Error al abrir el directorio de destino '{$Dir}'" );
if( !is_writeable( $Dir ) ) die( "<br>Error al abrir el directorio de destino '{$Dir}'" );
$di = opendir( $Dir );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( is_dir($Dir.'/'.$file) ){
BorraFicherosDePruebas( "$Dir/$file" );
}else{
if( substr($file,0,2)=='__' && substr($file,-4)!='.arb' ) @unlink( "$Dir/$file" );
}
}
}
closedir( $di );
}
function CheckJS( $dorg ){
global $JSConError, $JSFileError;
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != '.') && ($file != '..') ){
if( is_dir($dorg.'/'.$file) && $file[0]!='_' ){
echo "<TR><TH id={$_Nivel}>{$dorg}/{$file}";
CheckJS( "$dorg/$file" );
}else{
if( substr($file, strrpos($file,'.')+1) == 'js' && ( (substr_count($dorg,'/')==2 && substr_count($dorg.'/','/edesweb/')==1) || (substr_count($dorg,'/')==3 && strstr($dorg,'/lib/js')) || $IpOk == '' ) ){
echo "<TR><TD id=0>".$file;
$fichdest = "$dorg/$file";
$fdo = fopen( $fichdest, 'r' );
$buffer = fread( $fdo, filesize($fichdest) );
fclose( $fdo );
$ConError = false;
$Dim = explode( "\n", $buffer );
$txt = '';
for( $n=0; $n<count($Dim);$n++ ){
$linea = trim($Dim[$n]);
if( $linea[0].$linea[1] == '//' ) continue;
$pos = strpos( $linea, "\t".'//' );
if( $pos !== false ){
$linea = trim(substr( $linea, 0, $pos ));
}
$pos = strpos( $linea, '/'.'*' );
if( $pos !== false ){
$buff = substr( $linea, 0, $pos );
$pos = strpos( $linea, '*'.'/' );
while($pos === false){
$n++;
$linea = trim($Dim[$n]);
$pos = strpos( $linea, '*'.'/' );
}
$linea = $buff.' '.substr( $linea, $pos+2 );
$linea = trim( $linea );
if( empty($linea) ) continue;
}
switch( substr($linea,-1)){
case '':
case ')':
case ',':
case '{':
case '}':
case ':':
case ';':
case '+':
break;
default:
$JSConError++;
if( !$ConError ) $JSFileError++;
$ConError = true;
echo '<tr><td style="background:red">'.($n+1).': '.str_replace('>','&gt;',str_replace('<','&lt;',$Dim[$n]));
}
}
}
}
}
}
closedir( $di );
}
function CheckCSS( $dorg ){
global $JSConError, $JSFileError;
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != '.') && ($file != '..') ){
if( is_dir($dorg.'/'.$file) && $file[0]!='_' ){
echo "<TR><TH id={$_Nivel}>{$dorg}/{$file}";
CheckCSS( "$dorg/$file" );
}else{
if( substr($file, strrpos($file,'.')+1) == 'css' ){
echo "<TR><TD id=0>".$file;
$fichdest = "$dorg/$file";
$fdo = fopen( $fichdest, 'r' );
$buffer = fread( $fdo, filesize($fichdest) );
fclose( $fdo );
$ConError = false;
$Dim = explode( "\n", $buffer );
$txt = '';
for( $n=0; $n<count($Dim);$n++ ){
$linea = trim($Dim[$n]);
if( $linea[0].$linea[1] == '/'.'*' ) continue;
if( $linea[0] == '}' ) continue;
if( $linea == '' ) continue;
list( $linea, ) = explode( '/'.'*', $linea );
$linea = trim($linea);
if( substr($linea,-1) == '}' ) continue;
list( $linea, ) = explode( '}', $linea );
$linea = trim($linea);
if( substr($linea,-1) == '{' ) continue;
if( substr($linea,-1) != ';' ){
if( $n+1<count($Dim) ){
$linea = trim($Dim[$n+1]);
if( $linea=='{' ) continue;
}
$JSConError++;
if( !$ConError ) $JSFileError++;
$ConError = true;
echo '<tr><td style="background:red">'.($n+1).': '.str_replace('>','&gt;',str_replace('<','&lt;',$Dim[$n]));
}
}
}
}
}
}
closedir( $di );
}
function ChequeaEncoder( $dorg ){
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != '.') && ($file != '..') ){
if( is_dir($dorg.'/'.$file) ){
ChequeaEncoder( $dorg.'/'.$file );
}else{
$Ext = substr($file, strrpos($file,'.')+1);
if( substr_count( ',gs,inc,sel,php,php4,', ",{$Ext}," ) == 1 ){
$fd  = fopen($dorg.'/'.$file,'r');
$txt = fread($fd,4);
fclose($fd);
if( $txt != 'Zend' ){
if( substr_count( "$dorg/$file", '/edesweb/tcpdf/' )==0 && substr_count( "$dorg/$file", '/edesweb/tcpdf.old/' )==0  ){
echo '<br>Sin encodar: ';
if( substr($file,-3) == '.gs' || substr($file,-4) == '.inc' ){
echo '<font color=red>'.$dorg.'/'.$file.'</font>';
}else{
echo $dorg.'/'.$file;
}
}
}
}else if( $Ext == 'js' ){
$fd  = fopen($dorg.'/'.$file,'r');
$txt = fread($fd,4);
fclose($fd);
if( $txt != '#@~^' ) echo '<br>Sin encodar: '.'<font color=blue>'.$dorg.'/'.$file.'</font>';
}
}
}
}
closedir( $di );
}
function CrearDirBase( $NomDir ){
if( is_dir( $NomDir ) ){
if( !is_readable(  $NomDir ) ) die('ERROR: (a) No es de lectura: '.$NomDir);
if( !is_writeable( $NomDir ) ) die('ERROR: (a) No es de escritura: '.$NomDir);
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
exec( 'rmdir /Q/S '.$NomDir );
}else{
exec( 'rm -r '.$NomDir );
}
}
if( !mkdir( $NomDir, 0777 ) )  die('No se ha podido crear el directorio: '.$NomDir);
@chmod($NomDir,0777);
if( !is_dir( $NomDir ) )		 die('No está el directorio: '.$NomDir);
if( !is_readable(  $NomDir ) ) die('ERROR: (d) No es de lectura: '.$NomDir);
if( !is_writeable( $NomDir ) ) die('ERROR: (d) No es de escritura: '.$NomDir);
echo "<TR><TH colspan=2 id=c class=GRUPO>Creando el directorio '".str_replace('../','',$NomDir)."'</TH>";
}
function CreaIndexHtml( $dir_origen, $dir_destino, $dir_base ){
echo "<TR><TH colspan=2 id=c class=GRUPO>Creando 'index.htm'</TH>";
$DirWeb = '';
$Empresa = '';
$DimTxt = file( "../{$dir_origen}/_datos/config/sql.ini" );
for( $i=0; $i<count($DimTxt); $i++ ){
if( substr_count( $DimTxt[$i], '[DirWEB]' ) > 0 ){
$DirWeb = explode('=',$DimTxt[$i]);
$DirWeb = explode('//',$DirWeb[1]);
if( count($DirWeb) > 2 ) $DirWeb[0] = $DirWeb[0].'//'.$DirWeb[1];
$DirWeb = str_replace( chr(9), '', $DirWeb[0] );
$DirWeb = str_replace( ';', '', trim($DirWeb) );
$DirWeb = str_replace( "'", '', $DirWeb );
$DirWeb = str_replace( '"', '', $DirWeb );
}else if( substr_count( $DimTxt[$i], '$_Empresa' ) > 0 && $Empresa=='' ){
$Empresa = explode('=',$DimTxt[$i]);
$Empresa = explode('//',$Empresa[1]);
$Empresa = str_replace( chr(9), '', $Empresa[0] );
$Empresa = str_replace( ';', '', trim($Empresa) );
$Empresa = str_replace( "'", '', $Empresa );
$Empresa = str_replace( '"', '', $Empresa );
}
}
$txt = '';
$DimTxt = file( "../{$dir_origen}/_datos/config/index.htm" );
for( $i=0; $i<count($DimTxt); $i++ ){
if( substr_count( $DimTxt[$i], '{DirWEB}' ) > 0 ){
$DimTxt[$i] = str_replace( '{DirWEB}', "{$DirWeb}", $DimTxt[$i] );
}else if( substr_count( $DimTxt[$i], '{EMPRESA}' ) > 0 ){
$DimTxt[$i] = str_replace( '{EMPRESA}', $Empresa, $DimTxt[$i] );
}
$txt .= trim($DimTxt[$i]).chr(10);
}
$fd = fopen( "../{$dir_destino}/index.htm", "w" );
fwrite( $fd, $txt );
fclose( $fd );
}
function ZipSqlUsu( $NomFile, $ListIP ){
echo "<TR><TH colspan=2 id=c class=GRUPO>ReCompactado 'sql.ini'</TH>";
$ListIP = ','.$ListIP.',';
$txt = '';
$Mem = false;
$HastaBreak = false;
$DimTxt = file( $NomFile );
$fd = fopen( $NomFile, "w" );
for( $i=0; $i<count($DimTxt); $i++ ){
$MemLinea = true;
$stxt = trim(strtoupper($DimTxt[$i]));
if( $Mem ){
if( substr( $stxt,0,5 ) == 'CASE ' ){
$tmp = trim($DimTxt[$i]);
$tmp = explode('//',$tmp);
$tmp[0] = substr($tmp[0],5);
$tmp[0] = trim($tmp[0]);
$tmp[0] = str_replace("'",'',$tmp[0]);
$tmp[0] = str_replace('"','',$tmp[0]);
$tmp[0] = str_replace(':','',$tmp[0]);
$tmp[0] = str_replace(' ','',$tmp[0]);
if( substr_count( $ListIP, ','.$tmp[0].',' ) == 1 ){
$HastaBreak = true;
}else{
$MemLinea = false;
}
}
if( $stxt == '}' || $stxt == 'DEFAULT:' ){
$Mem = false;
}
}
if( !$Mem || ( $Mem && $HastaBreak ) ){
if( $MemLinea ){
fwrite( $fd, $DimTxt[$i] );
}
}
if( !$Mem ){
while( substr_count( $stxt, ' ' ) > 0 ) $stxt = str_replace(' ','',$stxt);
if( $stxt == 'SWITCH($_SERVER["HTTP_HOST"]){' ){
$Mem = true;
}
}
if( $stxt == 'BREAK;' ){
$HastaBreak = false;
}
}
fclose( $fd );
}
function CopyLP( $Origen, $Destino, $IpOk ){
echo "<TR><TH colspan=2 id=c class=GRUPO>Login y Password</TH>";
$fd  = fopen($Origen,'r');
$txt = fread($fd,(1900+59)*100);
fclose($fd);
LeerLP( $txt, $Destino, $IpOk );
}
function _LeerLP( $cTxt, $Destino, $IpOk ){
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+2,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+3+$n,1));
$Basura += $LongDeLong +3;
$b = 0;
$txt = '';
for( $n=$Basura; $n<$Basura+($LenCadena*2); $n++ ){
if( $b==0 ) $txt .= substr($cTxt,$n,1);
$b++; if( $b>1 ) $b=0;
}
$tmp = explode(chr(10),gzuncompress($txt));
if( 212940319 != crc32(trim($tmp[0])) ) exit;
if( !in_array( $_SERVER['HTTP_HOST'], explode(',',$tmp[1]) ) ) exit;
$tmp[1] = str_replace( ' ', '', $IpOk );
$txt = '';
for( $n=0; $n<count($tmp); $n++ ) $txt .= $tmp[$n].chr(10);
GrabarLP( $txt, $Destino );
return;
}
function _GrabarLP( $txt, $Destino ){
global $_FechaHora;
$Buffer = '';
$tmp = explode(chr(10),$txt);
$txt = gzcompress( $txt, 1 );
$Basura = rand(50,250);
$Buffer .= chr($Basura);
srand((double)microtime()*1000000);
for( $n=0; $n<$Basura; $n++ ) $Buffer .= chr(rand(0,255));
$Buffer .= chr(count($tmp));
$lf = strlen($txt);
$llf = strlen($lf);
$Buffer .= chr($llf);
for( $n=0; $n<$llf; $n++ ) $Buffer .= chr(substr($lf,$n,1));
for( $n=0; $n<$lf; $n++ ){
$Buffer .= substr($txt,$n,1);
$Buffer .= chr(rand(0,255));
}
$nb = ( ceil( strlen($Buffer) / 1959 ) * 1959 ) - strlen($Buffer);
for( $n=0; $n<$nb; $n++ ) $Buffer .= chr(rand(0,255));
$pnt = fopen( $Destino, 'w' );
if( !$pnt ) die('');
fputs( $pnt, $Buffer );
fclose( $pnt );
touch( $Destino, $_FechaHora );
return $Buffer;
}
function FechaMotor( $DirBase ){
global $_FechaHora, $_Nivel;
if( $_Nivel == 0 ) echo "<TR><TH colspan=2 id=c class=GRUPO>Fecha y Hora</TH>";
$_Nivel++;
$di = opendir( $DirBase );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( is_dir( "{$DirBase}/{$file}" ) ){
echo "<TR><TH id={$_Nivel}>{$DirBase}/{$file}";
FechaMotor( "{$DirBase}/{$file}" );
}else{
echo '<TR><TD>'. $DirBase.'/'.$file.' ';
touch( "{$DirBase}/{$file}", $_FechaHora );
}
}
}
closedir( $di );
$_Nivel--;
}
function DirVerContenido( $NomDir ){
echo '<br>'.str_repeat( '-', strlen($NomDir) );
echo '<br>'.$NomDir;
echo '<br>'.str_repeat( '-', strlen($NomDir) );
$di = opendir( $NomDir );
while( $file = readdir( $di ) ){
echo '<br>'.$file;
echo ' |'.date( 'Y-m-d H:i:s', filemtime( $NomDir.$file) ).'|';
}
closedir( $di );
echo '<br>'.str_repeat( '-', strlen($NomDir) );
}
function TodosLosDir( $dorg, $ddest ){
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != '.') && ($file != '..') ){
if( file_exists("{$dorg}/{$file}") != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [{$file}]");
if( is_dir("{$dorg}/{$file}") && ($file != $ddest) ){
echo "<TR><TH>{$ddest}/{$file}";
CopyJS( "{$dorg}/{$file}", "{$ddest}/{$file}", '', false );
}else{
if( substr($file, strrpos($file,'.')+1) == 'js' && substr_count($dorg,'/')==2 && substr_count("{$dorg}/",'/'.'edesweb/')==1 ){
echo "<TR><TD>{$dorg}/{$file}";
}
}
}
}
closedir( $di );
}
function CopiaLoModificado( $dorg, $ddest, $NoExt, $DesdeCDI ){
global $BytsOri, $BytsDes, $BytsCOri, $BytsCDes, $Rastro;
global $dir_origen, $dir_destino, $_Nivel, $compactar, $tipo_copia;
$_Nivel++;
if( $Rastro ) echo "<BR><BR>[$dorg -> $ddest]";
if( !is_readable(  $dorg ) ) die( "<br>Error al abrir el directorio de origen '$dorg'" );
if( !is_writeable( $dorg ) ) die( "<br>Error al abrir el directorio de destino '$ddest'" );
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != ".") && ($file != "..") ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( is_dir($dorg.'/'.$file) && ($file != $ddest) ){
if( !is_dir( "$ddest/$file" ) ) mkdir( "$ddest/$file", 0777 );
echo "<TR><TH id={$_Nivel}>"."$ddest/$file";
CopiaLoModificado( "$dorg/$file", "$ddest/$file", $NoExt, $DesdeCDI );
}else{
if( substr_count( $dorg, '/_bak_/' ) == 0 && substr_count( $dorg, '/_tmp/' ) == 0 ){
if( date( 'Y-m-d H:i:s', filemtime("$dorg/$file") ) > $DesdeCDI ){
if( !in_array( substr($file, strrpos($file,'.')+1), $NoExt ) ){
if( $Rastro ) echo '<br>&nbsp;&nbsp;&nbsp;'.$dorg.'/'.$file;
echo "<TR><TD id={$_Nivel}>".$file;
$BytsOri += filesize( "$dorg/$file" );
copy( "$dorg/$file", "$ddest/$file" );
}
}
}
}
}
}
closedir( $di );
if( $Rastro ) echo '<BR>';
$_Nivel--;
}
function TraduceEDes( $dorg, $ext ){
global $Rastro, $_Nivel;
$_Nivel++;
if( $Rastro ) echo "<BR><BR>[$dorg]";
if( !is_readable(  $dorg ) ) die( "<br>Error de lectura '$dorg'" );
if( !is_writeable( $dorg ) ) die( "<br>Error de escritura '$dorg'" );
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != '.') && ($file != '..') ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$dorg.'/'.$file."]");
if( is_dir($dorg.'/'.$file) ){
echo "<TR><TH id={$_Nivel}>"."$dorg/$file";
TraduceEDes( "$dorg/$file", $ext );
}else{
if( substr_count( $dorg, '/_bak_/' ) == 0 ){
if( in_array( substr($file, strrpos($file,'.')+1), $ext ) ){
echo "<TR><TD id={$_Nivel}>".$file;
TraduceFile( "$dorg/$file" );
}
}
}
}
}
closedir( $di );
if( $Rastro ) echo '<BR>';
$_Nivel--;
}
function TraduceFile( $File ){
global $EtiOld, $EtiNew, $EtiLen;
$txt = '';
$sEti = '';
$Dim = file( $File );
for( $i=0; $i<count($Dim); $i++ ){
$tmp = $Dim[$i];
if( substr_count( $tmp,'[' ) > 0 && substr_count( $tmp,']' ) > 0 ){
$desde = strpos($tmp,'[');
$hasta = strpos($tmp,']');
$oEti = substr( $tmp, $desde, $hasta-$desde+1 );
$uEti = strtoupper( $oEti );
for( $n=0; $n<count($EtiOld); $n++ ){
if( $uEti == $EtiOld[$n] ){
$oEti = $EtiNew[$n];
break;
}
}
$Dim[$i] = substr( $tmp, 0, $desde ). $oEti .substr($tmp, $hasta+1);
}
$txt .= chop($Dim[$i]).chr(10);
}
$pnt = fopen( $File, 'w' );
fputs( $pnt, $txt );
fclose( $pnt );
echo ' *';
}
function LeeCambEti(){
global $EtiOld, $EtiNew, $EtiLen;
$Dim = file( 'edes/t/m/_cambiar_edes.txt' );
for( $i=0; $i<count($Dim); $i++ ){
$tmp = explode( chr(9), $Dim[$i] );
$EtiNew[] = trim($tmp[0]);
$EtiOld[] = strtoupper(trim($tmp[1]));
$EtiLen[] = strlen(trim($tmp[1]));
}
}
function TraduceEdesGs( $File ){
global $EtiOld, $EtiNew, $EtiLen;
echo $File.'<br>';
$txt = '';
$Dim = file( $File );
for( $i=0; $i<count($Dim); $i++ ){
$tmp = trim($Dim[$i]);
for( $n=0; $n<count($EtiOld); $n++ ){
if( strtoupper(substr($tmp,0,$EtiLen[$n]+5)) == 'CASE '.$EtiOld[$n] ){
$Dim[$i] = str_replace( $EtiOld[$n], $EtiNew[$n], $Dim[$i] );
break;
}
}
$txt .= chop($Dim[$i]).chr(10);
}
$pnt = fopen( $File.'.new', 'w' );
fputs( $pnt, $txt );
fclose( $pnt );
}
function LeeCambEtiEdes(){
global $EtiOld, $EtiNew, $EtiLen;
$Dim = file( 'edes/t/m/_cambiar_edes.txt' );
for( $i=0; $i<count($Dim); $i++ ){
if( $Dim[$i][0]==':' ) return;
$Dim[$i] = str_replace( '[',"'", $Dim[$i] );
$Dim[$i] = str_replace( ']',"'", $Dim[$i] );
$tmp = explode( chr(9), $Dim[$i] );
$EtiNew[] = strtoupper(trim($tmp[0]));
$EtiOld[] = strtoupper(trim($tmp[1]));
$EtiLen[] = strlen(trim($tmp[1]));
}
}
function RenombraEDes( $dorg ){
global $Rastro, $_Nivel;
global $ExtOld, $ExtNew;
$_Nivel++;
if( $Rastro ) echo "<BR><BR>[$dorg]";
if( !is_readable(  $dorg ) ) die( "<br>Error de lectura '$dorg'" );
if( !is_writeable( $dorg ) ) die( "<br>Error de escritura '$dorg'" );
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != ".") && ($file != "..") ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$dorg.'/'.$file."]");
if( is_dir($dorg.'/'.$file) ){
echo "<TR><TH id={$_Nivel}>"."$dorg/$file";
RenombraEDes( "$dorg/$file" );
}else{
if( substr_count( $dorg, '/_bak_/' ) == 0 ){
if( in_array( substr($file, strrpos($file,'.')+1), $ExtOld ) ){
$Old = substr($file, strrpos($file,'.')+1);
for( $i=0; $i<count($ExtOld); $i++ ){
if( $Old == $ExtOld[$i] ){
echo "<TR><TD id={$_Nivel}>{$file}";
$NewFile = str_replace( '.'.$Old, '.'.$ExtNew[$i], $file );
rename( "$dorg/$file", "$dorg/$NewFile" );
break;
}
}
}
}
}
}
}
closedir( $di );
if( $Rastro ) echo '<BR>';
$_Nivel--;
}
function Cabecera( $iBody ){
?>
<!DOCTYPE HTML><HTML><HEAD>
<TITLE> edes-edit </TITLE>
<style>
TABLE { FONT-SIZE: 12px; }
#0  { padding-left:  10; color: #000099; }
#1  { padding-left:  40; color: #000099; }
#2  { padding-left:  70; color: #000099; }
#3  { padding-left: 100; color: #000099; }
#4  { padding-left: 130; color: #000099; }
#5  { padding-left: 160; color: #000099; }
#0c { padding-left:  10; color: red; }
#1c { padding-left:  40; color: red; }
#2c { padding-left:  70; color: red; }
#3c { padding-left: 100; color: red; }
#4c { padding-left: 130; color: red; }
#5c { padding-left: 160; color: red; }
TH { background: #cccccc; text-align: left; }
TD { background: #FFFFCC; }
#c { text-align: center; }
#d { text-align: right; }
.GRUPO {
background: #000099;
color:#FFFFFF;
}
</style>
</HEAD>
<BODY style='margin:0; font-family:ARIAL;'<?= $iBody; ?>>
<?PHP
chdir('../../');
echo '<table width="100%" border=1 cellspacing=0 cellpadding=0>';
}
function Pie( $ConResumen, $error ){
global $BytsOri, $BytsDes,$BytsCDes, $BytsCOri;
echo '</table>';
if( $ConResumen ){
echo '<CENTER>';
echo "<table border=1 cellspacing=0 cellpadding=2>";
echo "<TR><TH colspan=2 id=c class=GRUPO>RESUMEN</TH>";
echo "<TR><TH colspan=2 id=c>SOLO COPIA</TH>";
echo "<TR><TD>Total Origen					<TD id=d>".eNumberFormat($BytsOri);
echo "<TR><TD>Total Destino					<TD id=d>".eNumberFormat($BytsDes);
echo "<TR><TH colspan=2 id=c>COMPRIMIDO "			  .eNumberFormat(($BytsCDes*100)/$BytsCOri,2)."%</TH>";
echo "<TR><TD>Total Origen					<TD id=d>".eNumberFormat($BytsCOri);
echo "<TR><TD>Total Destino COMPACTADO		<TD id=d>".eNumberFormat($BytsCDes);
echo '</table></CENTER>';
}
echo '<script type="text/javascript">';
echo 'document.body.style.backgroundColor = "'.(($error)?'#FF0000':'#339900').'";';
echo 'document.body.scrollTop = document.body.scrollHeight;';
echo 'top.eLoading(false,window);';
echo '</SCRIPT>';
echo '</BODY>';
echo '</HTML>';
}
function PieJS( $error, $EsCSS=false ){
global $JSConError, $JSFileError;
echo '</table>';
echo '<CENTER>';
echo "<TABLE border=1 cellspacing=0 cellpadding=2>";
echo "<TR><TH colspan=2 id=c class=GRUPO>CHEQUEA ".(($EsCSS) ? 'CSS':'JavaScript')."</TH>";
echo "<TR><TD>Ficheros con error<TD id=d>".eNumberFormat($JSFileError);
echo "<TR><TD>Total errores		<TD id=d>".eNumberFormat($JSConError);
echo '</TABLE></CENTER>';
echo '<P id="FIN">';
echo '<script type="text/javascript">';
echo 'document.body.style.backgroundColor = ';
if( $error ){
echo '"#FF0000";';
}else{
echo '"#339900";';
}
echo 'document.all("FIN").scrollIntoView();';
echo 'document.all("FIN").style.display = "none";';
echo 'top.eLoading(false,window);';
echo '</SCRIPT>';
echo '</BODY>';
echo '</HTML>';
}
function CreaAlmacenEnC( $dir_destino ){
$FileZip = $dir_destino.'/t/edes';
$dir_origen = 'edes';
$NewCDI = date('Y-m-d H:i:s');
$pnt = fopen( $dir_origen.'/t/edes.key', 'w' );
if( !$pnt ) die('No se ha podido abrir el fichero para escritura: '.$dir_origen.'/t/edes.key');
fputs( $pnt, $NewCDI );
fclose( $pnt );
$pnt = fopen( $dir_destino.'/t/edes.key', 'w' );
if( !$pnt ) die('No se ha podido abrir el fichero para escritura: '.$dir_destino.'/t/edes.key');
fputs( $pnt, $NewCDI );
fclose( $pnt );
if( file_exists($FileZip.'.zip') ) unlink($FileZip.'.zip');
echo "<TR><TH colspan=2 id=c class=GRUPO>&nbsp;Crea almacén eDes (edes.zip)</TH>";
echo '<TR><TD>&nbsp;&nbsp;edes.zip -> ';
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
$txt = exec( "edes\\win\\zip -9 -r {$dir_destino}/t/edes {$dir_origen}/t/ -i *.key {$dir_origen}/t/lng/"."*.mbr {$dir_origen}/t/lng/"."*.lng {$dir_origen}/t/manual/"."*.chm" );
}else{
$txt = exec(            "zip -9 -r {$dir_destino}/t/edes {$dir_origen}/t/ -i *.key {$dir_origen}/t/lng/"."*.mbr {$dir_origen}/t/lng/"."*.lng {$dir_origen}/t/manual/"."*.chm" );
}
clearstatcache();
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
echo '<tr><td>&nbsp;'.passthru( "edes\\win\\zip -T {$dir_destino}/t/edes" );
}else{
echo '<tr><td>&nbsp;'.passthru(            "zip -T {$dir_destino}/t/edes" );
}
copy( "{$dir_destino}/t/edes.zip", "{$dir_origen}/t/edes.zip");
echo $txt;
echo '</TD>';
}
function BackupFuentes( $Tipo, $DirZIP, $ConTH ){
global $_VERSION_, $_HD_MOTOR_, $_ENCODER_, $_ENCODERIONCUBE_, $_VERSIONZIP_, $_OK_ENCODER, $SERVER_SOFTWARE;
if( $ConTH ) echo "<TR><TH colspan=2 id=c class=GRUPO>ZIP de fuentes Comprimidos</TH>";
echo "<TR><TD id=0>";
$FileZip = 'edes_'.date('ymd').'_'.$_VERSION_.'_'.$Tipo;
if( $Tipo == 'x' ){
$Sufijo = 'a';
if( file_exists( 'edes_'.date('ym').$Sufijo.'.zip' ) ) $Sufijo = 'b';
$Ion = (($_ENCODERIONCUBE_!='')? '$_ENCODERIONCUBE_ = "'.$_ENCODERIONCUBE_.'";'."\n" : '');
$txt = '<'.'?PHP'."\n".
'/'."/ {$SERVER_SOFTWARE}\n".
'/'.'/ '.date('Y-m-d H:i:s')."\n".
'$_VERSION_ = "'.($_VERSION_+1).'";'."\n".
'$_HD_MOTOR_ = "'.$_HD_MOTOR_.'";'."\n".
'$_ENCODER_ = "'.$_ENCODER_.'";'."\n".
$Ion.
'$_VERSIONZIP_ = "edes_'.date('ym').$Sufijo.'";'."\n".
'?'.'>';
$fd = fopen( 'edes/m/edes.php', 'w' );
fputs( $fd, $txt );
fclose($fd);
}
$DirExe = '';
if( strtoupper(substr(PHP_OS,0,3))=='WIN' ) $DirExe = 'edes\\win\\';
unlink( $FileZip.'.zip' );
exec( $DirExe."zip -9 -r {$FileZip} {$DirZIP}/".'*' );
$error = '';
passthru( $DirExe."zip -T {$FileZip}", $error );
echo '  '.eNumberFormat(filesize("{$FileZip}.zip")).' Kb';
return( $error );
}
function LicenciaCrear( $Tipo, $DirZIP, $ConTH ){
global $USUARIO, $MACKADRESS, $EMAIL, $_FechaHora, $TIPO_VERSION;
$DiasDeDemo = 90;
if( $ConTH ) echo "<TR><TH colspan=2 id=c class=GRUPO>Crear Licencia</TH>";
echo "<TR><TD id=0>";
chdir('edesweb.motor');
$SubDir = 'edesweb/';
unlink( $SubDir.'edes.php' );
unlink( $SubDir.'web/edesweb/_d_/cfg/ed.lp' );
copy( '../edesweb/m/_version/edes.php', $SubDir.'edes.php' );
clearstatcache();
$fdo = fopen( $SubDir.'edes.php', 'r' );
$txt = fread( $fdo, filesize($SubDir.'edes.php') );
fclose( $fdo );
$fdo = fopen( $SubDir.'edes.php', 'w' );
fwrite( $fdo, $txt );
fclose( $fdo );
clearstatcache();
touch( $SubDir.'edes.php', $_FechaHora );
echo 'Ok';
$MACKADRESS = trim($MACKADRESS);
if( $MACKADRESS=='eDes' ) $MACKADRESS = '{#}eDes{#}';
CrearLP( $USUARIO, $MACKADRESS, $EMAIL );
return !true;
}
function LicenciaZIP( $MACKADRESS, $CDI ){
global $_VERSIONZIP_;
$MACKADRESS = trim(strtolower($MACKADRESS));
$FileZip = $_VERSIONZIP_;
chdir( 'edesweb.motor' );
copy( $FileZip.'.zip', $MACKADRESS.trim($CDI).'.zip' );
$FileZip = $MACKADRESS.trim($CDI);
exec( "zip -9 -u {$FileZip} edes/edes.php edes/web/edesweb/_d_/cfg/ed.lp" );
$error = '';
passthru( "zip -T {$FileZip}", $error );
echo '  '.eNumberFormat(filesize("{$FileZip}.zip")).' Kb';
return( $error );
}
function InformaDeLosPasos(){
global $_HD_MOTOR_, $_ENCODER_, $_ENCODERIONCUBE_, $_OK_ENCODER;
?>
<!DOCTYPE HTML>
<HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"><TITLE> Para Generar la Versión eDes con el ENCODER </TITLE>
<style>
BODY {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
FONT-SIZE: 12px;
}
TABLE {
BACKGROUND: #d8dcdf;
COLOR: #0a00af;
FONT-SIZE: 100%;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #dd8800;
}
TH {
BACKGROUND: #009900;
COLOR: #FFFFFF;
FONT-SIZE: 120%;
PADDING-TOP: 5px;
}
TD {
FONT-SIZE: 100%;
WHITE-SPACE: nowrap;
BACKGROUND: #FFFFCC;
COLOR: #000066;
}
#C {
cursor:pointer;
}
</style>
<script type="text/javascript">
function SePulso(){
var obj = event.target || event.srcElement;
if( obj.type!='radio' ){
obj.innerHTML = '<U><I>'+obj.innerHTML+'</I></U>';
try{ event.keyCode = 0; }catch(e){}
event.cancelBubble = true;
event.returnValue = false;
}
}
function Memoriza(){
var Obj = event.target || event.srcElement;
if( Obj.id=='C' ){
window.clipboardData.setData( 'Text', Obj.innerText.replace(/^\s+/g,'').replace(/\s+$/g,'').replace('<B>','' ).replace('</B>','' ) );
try{
ObjWAV.Run();
}catch( e ){
alert( Obj.innerText );
}
}
}
function CkeckJS(){
SePulso();
RESULTADO.location.href = "edes.php?E:$m/xzip.gs&CHECK=1";
}
function CkeckCSS(){
SePulso();
RESULTADO.location.href = "edes.php?E:$m/xzip.gs&CHECKCSS=1";
}
function ZipFuentes(){
if( (event.target || event.srcElement).tagName == 'INPUT' ) return;
SePulso();
var Valor = '';
for( var n=0; n<document.all.TIPO_VERSION.length; n++ ) if( document.all.TIPO_VERSION[n].checked ) Valor = document.all.TIPO_VERSION[n].value;
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs"+'&TIPO_VERSION='+Valor+'&LINUX='+document.all.LINUX.checked+'&MACKADRESS='+document.all.MACKADRESS.value+'&EMAIL='+document.all.EMAIL.value+'&USUARIO='+document.all.USUARIO.value );
}
function ChangeScript(){
if( document.all.PHP.value == '' ) return;
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs&ENCODARUNPHP="+document.all.PHP.value+'&APLICACION='+document.all.APLICACION.value );
}
function EncodarScriptSiEnter(){
if( event.keyCode==13 ) ChangeScript();
}
function LicenciaCrear(){
SePulso();
LicenciaCrear2();
}
function LicenciaCrear2(){
var Valor = '';
for( var n=0; n<document.all.TIPO_VERSION.length; n++ ) if( document.all.TIPO_VERSION[n].checked ) Valor = document.all.TIPO_VERSION[n].value;
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs"+'&LicenciaCrear=1&TIPO_VERSION='+Valor+'&LINUX='+document.all.LINUX.checked+'&MACKADRESS='+document.all.MACKADRESS.value+'&EMAIL='+document.all.EMAIL.value+'&USUARIO='+document.all.USUARIO.value );
}
function LicenciaZIP(){
SePulso();
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs"+'&LicenciaZIP=1&MACKADRESS='+document.all.MACKADRESS.value+'&CDI='+document.all.CDI.value );
}
function FechaYHora(){
SePulso();
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs"+'&FechaYHora=1' );
}
function CreaAlmacen(){
SePulso();
var Valor = '';
for( var n=0; n<document.all.TIPO_VERSION.length; n++ ) if( document.all.TIPO_VERSION[n].checked ) Valor = document.all.TIPO_VERSION[n].value;
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs&ALMACEN=1"+'&TIPO_VERSION='+Valor );
}
function VerErrores(){
SePulso();
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs&VerLOG=1" );
return false;
}
function ZipEdes(){
SePulso();
var Valor = '';
for( var n=0; n<document.all.TIPO_VERSION.length; n++ ) if( document.all.TIPO_VERSION[n].checked ) Valor = document.all.TIPO_VERSION[n].value;
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs&ZIP=1"+'&TIPO_VERSION='+Valor );
}
function ZipBase(){
SePulso();
var Valor = '';
for( var n=0; n<document.all.TIPO_VERSION.length; n++ ) if( document.all.TIPO_VERSION[n].checked ) Valor = document.all.TIPO_VERSION[n].value;
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs&ZIPBASE=1"+'&TIPO_VERSION='+Valor );
}
function ZipEncode(){
for( var n=0; n<document.all.TIPO_KEY.length; n++ ) if( document.all.TIPO_KEY[n].checked ) _TIPO_KEY = document.all.TIPO_KEY[n].value;
var Nombre = prompt( 'Tipo de motor', _TIPO_KEY );
if( null == Nombre ) return;
SePulso();
var Valor = '';
for( var n=0; n<document.all.TIPO_VERSION.length; n++ ) if( document.all.TIPO_VERSION[n].checked ) Valor = document.all.TIPO_VERSION[n].value;
if( _TIPO_KEY=='order' ){
var Dim = document.all.MACKADRESS.value.split(',');
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs&ZIPENCODE=1"+'&TIPO_VERSION='+Valor+'&NOMZIP='+Dim[0].replace(/-/g,'_').replace(/:/g,'_') );
}else{
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs&ZIPENCODE=1"+'&TIPO_VERSION='+Valor+'&NOMZIP=edes' );
}
}
function ChequeaEncoder( UnScript ){
if( UnScript==undefined ){
SePulso();
RESULTADO.location.replace( 'edes.php?E:$m/xzip.gs&ChequeaEncoder=1' );
}else{
RESULTADO.location.replace( 'edes.php?E:$m/xzip.gs&ChequeaEncoder=1&SCRIPT='+UnScript+'&APLICACION='+document.all.APLICACION.value );
}
}
function EnviarZIP(){
SePulso();
RESULTADO.location.replace( 'edes.php?E:$m/xzip.gs&EnviarZIP=1&MACKADRESS='+document.all.MACKADRESS.value+'&CDI='+document.all.CDI.value );
}
function DateFicheros(){
SePulso();
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs&PUTDATE=1" );
}
function EncriptarZIP(){
SePulso();
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs&ENCODER=1&ENCRIPTAR="+document.all.ENCRIPTAR.VALUE );
}
function FicherosRAUL(){
SePulso();
var Valor = '';
for( var n=0; n<document.all.TIPO_VERSION.length; n++ ) if( document.all.TIPO_VERSION[n].checked ) Valor = document.all.TIPO_VERSION[n].value;
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs&RAUL=23&TIPO_VERSION="+Valor );
return false;
}
function Peticiones(){
SePulso();
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs&Peticiones=1" );
}
function LimpiarVersion(){
SePulso();
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs&LimpiarVersion=1" );
}
function EncriptaUnJS( oFile ){
if( (oFile+'').indexOf('edes.js')>-1 ) return;
var dFile = oFile;
try{
var _FSO = new ActiveXObject('Scripting.FileSystemObject');
var OTxt = _FSO.OpenTextFile(oFile,1,0).ReadAll();
}catch(e){ alert('Error al leer "'+oFile+'"');}
if( OTxt.substring(0,4) == "#@~^" ) return;
try{
var e = new ActiveXObject("Scripting.Encoder");
var ETxt = e.EncodeScriptFile('.js',OTxt,0,'JScript');
}catch(e){ alert('Error al codificar "'+oFile+'"');}
try{
_FSO.CreateTextFile(dFile).Write(ETxt);
}catch(e){ alert('Error al grabar "'+oFile+'"');}
}
function ListFile( Dir ){
var f, fc, tmp;
f = new ActiveXObject("Scripting.FileSystemObject").GetFolder(Dir);
fc = new Enumerator(f.files);
for(; !fc.atEnd(); fc.moveNext()){
tmp = (fc.item()+'').split('.');
if( tmp[tmp.length-1]=='js' ) EncriptaUnJS( fc.item() );
}
}
function ListDir( Dir ){
ListFile( Dir );
var f, fc;
f = new ActiveXObject("Scripting.FileSystemObject").GetFolder(Dir);
fc = new Enumerator(f.SubFolders);
for(; !fc.atEnd(); fc.moveNext()) ListDir( fc.item() );
}
function EncriptaJS(){
SePulso();
ListDir( '<?= $_HD_MOTOR_; ?>/edesweb.motor' )
RESULTADO.document.write( 'Fichero JavaScript ENCRIPTADOS.' );
}
<?PHP
?>
function ioncube_encoder(){
try{
var _WS = new ActiveXObject("WScript.Shell");
}catch(e){ alert('No se ha activado la "SHELL"'); }
try{
<?PHP
echo "var ExeEncodar = '".$_ENCODERIONCUBE_."';";
echo 'var a = _WS.run( ExeEncodar, 0, false );';
?>
}catch(e){ alert('Error "'+e.name+'"'); }
}
function EncriptaUnGS( oFile, Encriptar ){
if( Encriptar ){
try{
var _WS = new ActiveXObject("WScript.Shell");
}catch(e){ alert('No se ha activado la "SHELL"'); }
try{
<?PHP
if( $_ENCODERIONCUBE_=='' ){
echo "var ExeEncodar = '".$_ENCODER_."'.replace('{TipoKey}',_TIPO_KEY);";
echo 'var a = _WS.run( ExeEncodar+" "+oFile, 0, false );';
}else{
echo "var ExeEncodar = '".$_ENCODERIONCUBE_."';";
echo 'var a = _WS.run( ExeEncodar, 0, false );';
}
?>
}catch(e){ alert('Error al encriptar "'+oFile+'"');}
}else{
}
}
function ListFileGS( Dir, Encriptar ){
var f, fc, tmp;
f = new ActiveXObject("Scripting.FileSystemObject").GetFolder(Dir);
fc = new Enumerator(f.files);
for(; !fc.atEnd(); fc.moveNext()){
tmp = (fc.item()+'').split('.');
if( tmp[tmp.length-1]=='gs' || tmp[tmp.length-1]=='inc' || tmp[tmp.length-1]=='sel' ){
EncriptaUnGS( fc.item(), Encriptar );
}else if( tmp[tmp.length-1]=='php' && (fc.item()+'').indexOf('\\http\\install\\')>-1 ){
EncriptaUnGS( fc.item(), Encriptar );
}
}
}
function ListDirGS( Dir, Encriptar ){
if( (Dir+'').indexOf('edesweb.motor\\edesweb\\tcpdf')>-1 ) return;
ListFileGS( Dir, Encriptar );
var f, fc;
f = new ActiveXObject("Scripting.FileSystemObject").GetFolder(Dir);
fc = new Enumerator(f.SubFolders);
for(; !fc.atEnd(); fc.moveNext()) ListDirGS( fc.item(), Encriptar );
}
var _TIPO_KEY = '';
function EncoderGS(){
for( var n=0; n<document.all.TIPO_KEY.length; n++ ) if( document.all.TIPO_KEY[n].checked ) _TIPO_KEY = document.all.TIPO_KEY[n].value;
var Nombre = prompt( 'Tipo de motor', _TIPO_KEY );
if( null == Nombre ) return;
RESULTADO.document.open('about:blank');
SePulso();
var NomFile = '<?= $_HD_MOTOR_; ?>/edesweb/m/_tmp/_zend.log';
try{
var df = new ActiveXObject("Scripting.FileSystemObject");
if( df.FileExists(NomFile) ) df.Delete(NomFile);
}catch(e){ alert('Error al borrar "'+NomFile+'"');}
ListDirGS( '<?= $_HD_MOTOR_; ?>/edesweb.motor', true )
ListDirGS( '<?= $_HD_MOTOR_; ?>/edesweb.motor', false )
RESULTADO.document.write( "- TERMINADO -\n<br>" );
}
function LicenciaWEncoder(){
for( var n=0; n<document.all.TIPO_KEY.length; n++ ) if( document.all.TIPO_KEY[n].checked ) _TIPO_KEY = document.all.TIPO_KEY[n].value;
var Nombre = prompt( 'Tipo de motor', _TIPO_KEY );
if( null == Nombre ) return;
SePulso();
var NomFile = '<?= $_HD_MOTOR_; ?>/edesweb/m/_tmp/_zend.log';
var df = new ActiveXObject("Scripting.FileSystemObject");
try{
if( df.FileExists(NomFile) ) df.Delete(NomFile);
}catch(e){
alert('No se ha podido borrar el fichero:\n'+NomFile);
}
EncriptaUnGS( '<?= $_HD_MOTOR_; ?>/edesweb.motor/edesweb/edes.php', true );
RESULTADO.document.write( 'Fichero "edes.php" ENCODADO.' );
}
function EncodarUnPHP(){
return;
var NomFile = document.all.PHP.value,
df = new ActiveXObject("Scripting.FileSystemObject");
try{
NomFile = 'c:/xampp/htdocs/edesweb.motor/edesweb/'+NomFile;
if( df.FileExists(NomFile) ){
RESULTADO.document.open('about:blank');
EncriptaUnGS( NomFile, true );
EncriptaUnGS( NomFile, false );
RESULTADO.document.write( 'Fichero "'+NomFile+'" ENCODADO.' );
ChequeaEncoder( document.all.PHP.value );
}else{
alert( 'ERROR: Fichero no encontrado' );
}
}catch(e){
alert('No se ha podido borrar el fichero:\n'+NomFile);
}
}
function CheckUnPHP(){
RESULTADO.location.replace( "edes.php?E:$m/xzip.gs&CHECKUNPHP=1&CheckFILE="+escape(document.all.cPHP.value) );
}
</script>
</HEAD>
<BODY style="color:#000066; background:#F3F3F3;margin:0px;" scroll='no'>
<OBJECT ID=ObjWAV STYLE="display:none" CLASSID="CLSID:05589FA1-C356-11CE-BF01-00AA0055595A">
<PARAM NAME="AutoRewind" VALUE="-1"><PARAM NAME="PlayCount" VALUE="1"><PARAM NAME="FileName" VALUE="g/aviso.wav">
</OBJECT>
<TABLE cellspacing=1px cellpadding=3px border=0px onclick='Memoriza()' width='100%' height='100%' style='cursor:default'>
<TR><TH style='background-color:#90a4ae; color:#ffffff'>PASOS PARA CREAR e-Des</TD></TR>
<TR><TD onclick='Peticiones()'			id=C> Peticiones
<span style='width:200px'></span>
Gesoft<INPUT TYPE="radio" NAME="TIPO_KEY" value="gesoft" style='cursor:pointer' checked>&nbsp;
Developer<INPUT TYPE="radio" NAME="TIPO_KEY" value="developer" style='cursor:pointer'>&nbsp;
Order<INPUT TYPE="radio" NAME="TIPO_KEY" value="order" style='cursor:pointer'>
<span style='width:200px'></span>
Aplicación por defecto <INPUT TYPE="text" NAME="APLICACION" value='i_iu' SIZE=20 MAXLENGTH=20>
</TD></TR>
<TR><TD style='background-color:#f2f2f2'>
Félix			<INPUT TYPE="radio"		NAME="TIPO_VERSION"	value="F" style='cursor:pointer'>&nbsp;
Versión OK	<INPUT TYPE="radio"		NAME="TIPO_VERSION"	value="V" style='cursor:pointer' checked>&nbsp;
BetaTester	<INPUT TYPE="radio"		NAME="TIPO_VERSION"	value="B" style='cursor:pointer'>&nbsp;
DEMO			<INPUT TYPE="radio"		NAME="TIPO_VERSION"	value="D" style='cursor:pointer'>&nbsp;<span style='width:30px'></span>
Linux			<INPUT TYPE="checkbox"	NAME="LINUX"			style='cursor:pointer' checked>&nbsp;<span style='width:77px'></span>
CDI			<INPUT TYPE="text"		NAME="CDI"				value='' SIZE=22 style='cursor:pointer' checked>&nbsp;
Check PHP	<INPUT TYPE="text"		NAME="cPHP" value='' SIZE=30 MAXLENGTH=60><img src='edes.php?R:$a/g/opcion.gif' onclick='CheckUnPHP()'><br>
MacAddres	<INPUT TYPE="text"		NAME="MACKADRESS"		value='' SIZE=40 MAXLENGTH=200>&nbsp;
Usuario		<INPUT TYPE="text"		NAME="USUARIO"			value='' SIZE=8  MAXLENGTH=15>
EMail			<INPUT TYPE="text"		NAME="EMAIL"			value='' SIZE=22 MAXLENGTH=30><span style='width:20px'></span>
Encodar		<INPUT TYPE="text"		NAME="PHP" value='' SIZE=30 MAXLENGTH=60 onkeydown=EncodarScriptSiEnter()><img src='edes.php?R:$a/g/opcion.gif' onclick='ChangeScript()' old='EncodarUnPHP()'>
<img src='edes.php?R:$a/g/opcion.gif' onclick='ioncube_encoder()' title='IONCube Encoder'>
</TD></TR>
<TR><TD onclick='CkeckJS()'				id=C> Chequear JavaScript	</TD></TR>
<TR><TD onclick='CkeckCSS()'				id=C> Chequear CSS			</TD></TR>
<TR><TD onclick='ZipFuentes()'			id=C> Compactar fuentes		</TD></TR>
<TR><TD onclick='EncriptaJS()'			id=C> Encriptar JavaScript	</TD></TR>
<TR><TD onclick='CreaAlmacen()'			id=C> Generar almacén eDes	- <span style='color:green'>( DEMO: Crear licencia y continuar )</span></TD></TR>
<TR><TD onclick='LicenciaCrear()'		id=C> Crear Licencia			</TD></TR>
<TR><TD onclick='EncoderGS()'				id=C> Encoder Windows		</TD></TR>
<TR><TD onclick='ChequeaEncoder()'		id=C> Chequear Encoder		</TD></TR>
<TR><TD onclick='ZipEncode()'				id=C> Zip eDesEncodado		</TD></TR>
<TR><TD											id=C>** <B>cd</B> /usr/paginas/edesweb.motor; <B>sh</B> ../edesweb/m/xzip.sh</TD></TR>
<TR><TD onclick='VerErrores()'			id=C><span>** Ver LOG</span><span style='margin-left:250px' onclick='FicherosRAUL()' id=C>[ Ficheros RAUL ]</span></TD></TR>
<TR><TD onclick='FechaYHora()'			id=C> Pone Fecha y Hora		</TD></TR>
<TR><TD onclick='ZipEdes()'				id=C>** ZIP eDes				</TD></TR>
<TR><TD												 ><span style='width:40px'></span>
<span onclick='ChequeaEncoder()' style='' id=C>Chequear Encoder</span>
<span style='width:40px'></span>
<span onclick='ZipBase()' style='' id=C>Zip Base</span>
<span style='width:40px'></span>
<span onclick='LimpiarVersion()' style='' id=C>Limpiar Version</span>
<span style='width:40px'></span>
<span style='width:40px'></span>
</TD></TR>
<TR><TD onclick='LicenciaWEncoder()'	id=C><span style='width:80px'></span>Encodar Licencia con Windows</TD></TR>
<TR><TD onclick='LicenciaZIP()'			id=C><span style='width:80px'></span>ZIP de la Licencia</TD></TR>
<TR><TD onclick='EnviarZIP()'				id=C><span style='width:80px'></span>Enviar ZIP</TD></TR>
<TR><TD onclick='EncriptarZIP()'			id=C style='background-color:#f2f2f2'> Encriptar On/Off &nbsp;&nbsp;&nbsp;<INPUT TYPE="text" NAME="ENCRIPTAR" SIZE=12 value=''></TD></TR>
<TR><TD height='100%' style='background-color:#90a4ae'><IFRAME name='RESULTADO' src='' width='100%' height='100%' FRAMEBORDER=1 SCROLLING='auto'></IFRAME></TD></TR>
</TABLE>
<SCRIPT type="text/javascript">
top.eLoading(false,window);
</SCRIPT>
</BODY></HTML>
<?PHP
exit;
}
function Leer_LP( &$Login, &$Pass, &$_TipoUsu, &$NumBak, &$_gsNomUser, &$_gsACCESO=NULL, $NewDir='' ){
global $Dir_, $__DirOrigen;
if( $NewDir=='eDes' ){
if( file_exists('edes/web/edesweb/_d_/cfg/_ed.lp_') ){
$fd = @fopen('edes/web/edesweb/_d_/cfg/_ed.lp_','r');
}else{
exit;
}
}else if( file_exists($__DirOrigen.'edes/web/edesweb/_d_/cfg/_ed.lp_') ){
$fd = @fopen($__DirOrigen.'edes/web/edesweb/_d_/cfg/_ed.lp_','r');
}else{
exit;
}
$cTxt = @fread($fd,(1900+59)*100);
@fclose($fd);
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+2,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+3+$n,1));
$Basura += $LongDeLong + 3;
$b = 0;
$txt = '';
for( $n=$Basura; $n<$Basura+($LenCadena*2); $n++ ){
if( $b==0 ) $txt .= substr($cTxt,$n,1);
$b++; if( $b>1 ) $b=0;
}
$tmp = explode(chr(10),gzuncompress($txt));
if( 212940319 != crc32(trim($tmp[0])) ) exit;
return gzuncompress($txt);
}
function CrearLP( $USUARIO, $MACKADRESS, $EMAIL ){
echo '<TR><TH colspan=2 id=c class=GRUPO>Personaliza DESARROLLADOR</TH>';
$USUARIO = strtoupper($USUARIO);
if( $MACKADRESS!='{#}eDes{#}' ) $MACKADRESS = strtoupper($MACKADRESS);
$EMAIL = strtolower($EMAIL);
$NewUSU = trim(Leer_LP());
$NewUSU = str_replace('[MAC]'  ,$MACKADRESS	,$NewUSU);
$NewUSU = str_replace('[LOGIN]',$USUARIO		,$NewUSU);
$NewUSU = str_replace('[EMAIL]',$EMAIL			,$NewUSU);
$DimFila = explode("\n",$NewUSU);
$DimTH = explode("\t",$DimFila[3]);
$TotalCol = count($DimTH);
$NewUSU = $DimFila[3]."\n".$DimFila[4];
$txt = '';
for( $f=0; $f<4; $f++ ) $txt .= trim($DimFila[$f]).chr(10);
$txt = chop($txt);
$DimPassword = array();
for( $f=4; $f<count($DimFila); $f++ ){
$tmp = explode("\t",$DimFila[$f]);
$DimPassword[$tmp[0].$tmp[1]] = $tmp[2];
}
$DimFila = explode("\n",trim($NewUSU));
$TH = explode("\t",$DimFila[0]);
$nTotalCol = count($TH);
for( $f=1; $f<count($DimFila); $f++ ){
$txt .= "\n";
$tmp = explode("\t",$DimFila[$f]);
$NewDato = array();
for( $c=0; $c<$nTotalCol; $c++ ) $NewDato[$TH[$c]] = $tmp[$c];
for( $c=0; $c<$TotalCol; $c++ ){
$Dato = trim($NewDato[$DimTH[$c]]);
$txt .= $Dato."\t";
}
$txt = chop($txt);
}
if( GrabarUnLP( $txt ) ) echo '<TR><TD id=0>Ok';
return;
}
function GrabarUnLP( $txt ){
global $Dir_, $__DirOrigen, $__DirDestino, $_FechaHora;
unlink( 'edes/web/edesweb/_d_/cfg/eedd.lp' );
$Buffer = '';
$tmp = explode(chr(10),$txt);
$txt = gzcompress( $txt, 1 );
$Basura = rand(50,250);
$Buffer .= chr($Basura);
srand((double)microtime()*1000000);
for( $n=0; $n<$Basura; $n++ ) $Buffer .= chr(rand(0,255));
$Buffer .= chr(count($tmp));
$lf = strlen($txt);
$llf = strlen($lf);
$Buffer .= chr($llf);
for( $n=0; $n<$llf; $n++ ) $Buffer .= chr(substr($lf,$n,1));
for( $n=0; $n<$lf; $n++ ){
$Buffer .= substr($txt,$n,1);
$Buffer .= chr(rand(0,255));
}
$nb = ( ceil( strlen($Buffer) / 1959 ) * 1959 ) - strlen($Buffer);
for( $n=0; $n<$nb; $n++ ) $Buffer .= chr(rand(0,255));
$pnt = @fopen('edes/web/edesweb/_d_/cfg/eedd.lp','w');
if( !$pnt ) die('');
fputs( $pnt, $Buffer );
fclose( $pnt );
clearstatcache();
touch( 'edes/web/edesweb/_d_/cfg/eedd.lp', $_FechaHora );
return true;
}
function Test_LP( $NomFile ){
echo "\n<br>Fichero: ".$NomFile."\n<br>\n<br>";
if( file_exists($NomFile) ){
$fd = @fopen($NomFile,'r');
}else{
echo "NO EXISTE:\n<br>";
exit;
}
$cTxt = @fread($fd,(1900+59)*100);
@fclose($fd);
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+2,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+3+$n,1));
$Basura += $LongDeLong + 3;
$b = 0;
$txt = '';
for( $n=$Basura; $n<$Basura+($LenCadena*2); $n++ ){
if( $b==0 ) $txt .= substr($cTxt,$n,1);
$b++; if( $b>1 ) $b=0;
}
$tmp = explode(chr(10),gzuncompress($txt));
if( 212940319 != crc32(trim($tmp[0])) ) exit;
echo gzuncompress($txt)."\n<br>";
}
function DelDirFile( $Dir, $Prefijo ){
$Long = strlen($Prefijo);
$di = opendir( $Dir );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( !is_dir($Dir.$file) ){
if( substr( $file, 0, $Long ) == $Prefijo ){
unlink( $Dir.$file );
}
}
}
}
closedir( $di );
}
function DelHelp( $dir_destino, $NomHelp ){
$Dim = file( $dir_destino.'/i/'.$NomHelp.'.ind' );
$Prefijo = '';
for( $n=0; $n<count($Dim); $n++ ){
if( substr($Dim[$n],0,8)=='[prefix]' ){
list( , $Prefijo ) = explode( ']', $Dim[$n] );
break;
}
}
$Prefijo = trim($Prefijo);
for( $d=0; $d<count($Dim); $d++ ){
$Key = strtolower(trim($Dim[$d]));
if( $Key=='' || $Key[0] == '[' ) continue;
if( $Key[0]=='.' ){
$Key = substr($Key,1);
}
$Ori = ' áéíóúüñç+';
$Des = '_aeiouunc_';
for( $n=0; $n<strlen($Ori); $n++ ){
$Key =str_replace( substr($Ori,$n,1), substr($Des,$n,1), $Key );
}
if( substr_count( $Key, '{' ) == 1 ){
list( , $Key ) = explode( '{', $Key );
list( $Key ) = explode( '}', $Key );
$Key = trim($Key);
}
if( substr_count( $Key, '.' ) == 1 ){
list( $Key, ) = explode( '.', $Key );
}
$NomFile = $Prefijo.$Key.'.htm';
if( file_exists( $dir_destino.'/'.$NomFile ) ){
unlink( $dir_destino.'/'.$NomFile );
}
}
$Ext = array( 'body', 'css', 'htm', 'ind' );
for( $n=0; $n<count($Ext); $n++ ){
$NomFile = $dir_destino.'/i/'.$NomHelp.'.'.$Ext[$n];
if( file_exists( $NomFile ) ){
unlink( $NomFile );
}
}
}
function CambiaFuentes( $File ){
$dorg = '../../edesweb/h';
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
$ext = explode('.',$file);
if( $ext[count($ext)-1]=='htm' ){
echo $dorg.'/'.$file.'<br>';
$NomFile = $dorg.'/'.$file;
$fd = fopen( $NomFile, 'r' );
$buffer = fread( $fd, filesize($NomFile) );
fclose( $fd );
$buffer = str_replace("\r",'',$buffer);
$fd = fopen( $NomFile, 'w' );
fwrite( $fd, $buffer );
fclose( $fd );
}
}
}
closedir( $di );
}
function CrearLPDemo( $_DirBase, $DIR ){
if( $_DirBase!='edes' ) die('El gsMain a ejecutar tienen que ser el del motor');
chdir('../..');
if( !file_exists( $DIR.'/_d_/cfg/ed.lp' ) ) die( 'Directorio erroneo en "'.$DIR.'"' );
$USUARIO = 'DEMO';
$MACKADRESS = '[DEMO]';
$EMAIL = 'demo@demo.com';
$Login=$Pass=$_TipoUsu=$NumBak=$_gsNomUser=$_gsACCESO='';
$NewUSU = trim( Leer_LP( $Login, $Pass, $_TipoUsu, $NumBak, $_gsNomUser, $_gsACCESO, 'eDes' ) );
$NewUSU = str_replace('[MAC]'  ,$MACKADRESS	,$NewUSU);
$NewUSU = str_replace('[LOGIN]',$USUARIO		,$NewUSU);
$NewUSU = str_replace('[EMAIL]',$EMAIL			,$NewUSU);
$NewUSU = str_replace('[DIR]'  ,$DIR			,$NewUSU);
$DimFila = explode("\n",$NewUSU);
$DimTH = explode("\t",$DimFila[3]);
$TotalCol = count($DimTH);
$NewUSU = $DimFila[3]."\n".$DimFila[4];
$txt = '';
for( $f=0; $f<4; $f++ ) $txt .= trim($DimFila[$f]).chr(10);
$txt = chop($txt);
$DimPassword = array();
for( $f=4; $f<count($DimFila); $f++ ){
$tmp = explode("\t",$DimFila[$f]);
$DimPassword[$tmp[0].$tmp[1]] = $tmp[2];
}
$DimFila = explode("\n",trim($NewUSU));
$TH = explode("\t",$DimFila[0]);
$nTotalCol = count($TH);
for( $f=1; $f<count($DimFila); $f++ ){
$txt .= "\n";
$tmp = explode("\t",$DimFila[$f]);
$NewDato = array();
for( $c=0; $c<$nTotalCol; $c++ ) $NewDato[$TH[$c]] = $tmp[$c];
for( $c=0; $c<$TotalCol; $c++ ){
$Dato = trim($NewDato[$DimTH[$c]]);
$txt .= $Dato."\t";
}
$txt = chop($txt);
}
GrabarLPDemo( $txt, $DIR );
die( 'Login y Password de DEMO creado en "'.$DIR.'"' );
}
function GrabarLPDemo( $txt, $DIR ){
global $Dir_, $__DirOrigen, $__DirDestino, $_FechaHora;
$Buffer = '';
$tmp = explode(chr(10),$txt);
$txt = gzcompress( $txt, 1 );
$Basura = rand(50,250);
$Buffer .= chr($Basura);
srand((double)microtime()*1000000);
for( $n=0; $n<$Basura; $n++ ) $Buffer .= chr(rand(0,255));
$Buffer .= chr(count($tmp));
$lf = strlen($txt);
$llf = strlen($lf);
$Buffer .= chr($llf);
for( $n=0; $n<$llf; $n++ ) $Buffer .= chr(substr($lf,$n,1));
for( $n=0; $n<$lf; $n++ ){
$Buffer .= substr($txt,$n,1);
$Buffer .= chr(rand(0,255));
}
$nb = ( ceil( strlen($Buffer) / 1959 ) * 1959 ) - strlen($Buffer);
for( $n=0; $n<$nb; $n++ ) $Buffer .= chr(rand(0,255));
$pnt = @fopen($DIR.'/_d_/cfg/ed.lp','w');
if( !$pnt ) die('');
fputs( $pnt, $Buffer );
fclose( $pnt );
clearstatcache();
touch( $DIR.'/_d_/cfg/ed.lp', $_FechaHora );
}
function EncodarSoloUnPHP( $NomFile, $Stop=true ){
$tmp = explode('.',$NomFile);
$Ext = $tmp[count($tmp)-1];
if( $Stop ) chdir('../..');
if( !file_exists('edesweb/'.$NomFile) ) die('ERROR: Fichero "'.$NomFile.'" no existe');
ZipFile( 'edesweb/'.$NomFile, 'edesweb.motor/edesweb/'.$NomFile, false );
if( $Ext == 'gs' || $Ext == 'inc' || $Ext == 'php' || $Ext == 'class' ){
echo '<script type="text/javascript">alert("parent.EncodarUnPHP();");</script>';
}else{
echo '<br>Script compactado<br>';
global $_Sql, $_SqlTransaction, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOConnect;
$_User = 0;
eval( _LoadSqlIni2( $_GET['APLICACION'].'/_datos/config/sql.ini' ) );
include_once( 'edesweb/'.$_Sql.'.inc' );
if( $NomFile[0]=='/' ) $NomFile = substr($NomFile,1);
$NomFile = '$'.$NomFile;
$Cdi = date('Y-m-d H:i:s');
qQuery("insert into {$_SESSION['ShareDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '{$Cdi}', '{$NomFile}', 'S', '{$_SESSION['_UserEMail']}')");
}
echo '<br>';
if( $Stop ) exit;
}
function ChequeaEtiquetas(){
$Miembros = file_get_contents( '../../edesweb/t/lng/edes.mbr' );
$df = fOpen('label.txt','r');
while ( !feof($df) ){
$txt = fgets ($df);
if( substr_count($txt,'<token>')==1 ){
$txt = trim($txt);
$txt = substr($txt,8,-9);
if( $txt!='' ){
if( substr_count($Miembros, '"'.$txt.'"' )==0 ) echo $txt."<br>\n";
}
}
}
fclose($df);
}
?>
