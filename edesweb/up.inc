<?PHP
date_default_timezone_set('Europe/Madrid');
define('_ERROR_REPORTING', 5);
define('_TRACK_ERRORS', false);
ini_set('track_errors', false);
error_reporting(_ERROR_REPORTING);
if( isset($_GET['PKSERVER']) ){
if( file_exists("../_datos/config/".$_GET['PKSERVER'].".edes") ){
die("Test OK|"._IDSRV());
}
}
if( $_POST['TO_UPDATE']=='test' ) die("Test OK|"._IDSRV());
foreach($_GET  as $k=>$v) $GLOBALS[$k] = $v;
foreach($_POST as $k=>$v) $GLOBALS[$k] = $v;
$_Tron = false;
if( !isset($_SESSION["ShareDictionary"]) ){
$_SETUP = eFileGetVar("Setup");
if( $_SETUP["Multitenancy"] ){
$file = "../_datos/config/share.ini";
if( file_exists($file) ){
include($file);
session_start();
$_SESSION = array();
$_SESSION['ShareDictionary'] = $_SqlDiccionario;
if( $_SETUP["SharedTables"]!="" ){
$tmp = trim(str_replace(" ","",$_SETUP["SharedTables"]));
$dim = explode(",", $tmp);
$_SESSION["multitenancy_ddbb"] = $_SESSION["db_dictionary"];
if( $dim[0]==$_SESSION["db_dictionary"] ){
$_SESSION["multitenancy"] = explode(",", substr($tmp,strlen($dim[0])+1));
}else{
$_SESSION["multitenancy"] = $tmp;
}
}else{
$_SESSION["multitenancy"] = array();
}
if( $_SESSION["ShareDictionary"]!="" && substr($_SESSION["ShareDictionary"],-1)!="." ){
$_SESSION["ShareDictionary"] .= ".";
$_SESSION["multitenancy"] = array_merge($_SESSION["multitenancy"], explode(",","gs_op,gs_op_ico,gs_op_lng,gs_tree,gs_tree_op,gs_tpermission,gs_activity,gs_language,gs_entidad,gs_grupo,gs_campo,gs_color,gs_store,gs_toperacion,gs_pack,gs_error"));
}else{
$_SESSION["ShareDictionary"] = "";
}
}else if( !$_SETUP["Multitenancy"] ){
$_SESSION["ShareDictionary"] = "";
}
}
}
if( !isset($_SESSION["ShareDictionary"]) ) $_SESSION["ShareDictionary"] = "";
if( $_POST['TO_UPDATE']=='eDes' ){
$_GET['FILE'] = $_POST['file_name'];
$_GET['IDSRV'] = $_POST['IDSRV'];
}
if( $_Tron ){
error_log(date('Y-m-d H:i:s')."\n",3,'_upload.info');
error_log('QUERY..................: '.$_SERVER['QUERY_STRING']		."\n",3,'_upload.info');
}
$Dir_ = dirname(__FILE__).'/';
if( strtoupper(substr(PHP_OS,0,3))=='WIN' ) $Dir_ = str_replace('\\','/',$Dir_);
if( isset( $_GET['FILELOCAL'] ) ) $_FILES['file']['tmp_name'] = $_GET['FILELOCAL'];
if( $_Tron ){
error_log('FILELOCAL..............: '.$_GET['FILELOCAL']			."\n",3,'_upload.info');
error_log('_FILES[files][tmp_name]: '.$_FILES['file']['tmp_name']	.' ('.count($_FILES).")\n",3,'_upload.info');
error_log('count($_FILES).........: '.count($_FILES)				."\n",3,'_upload.info');
error_log('FILE...................: '.$_GET['FILE']					."\n",3,'_upload.info');
error_log('IDSRV..................: '.$_GET['IDSRV']				."\n",3,'_upload.info');
error_log('MD5 PC.................: '.$_GET['MD5']					."\n",3,'_upload.info');
error_log('Dir_...................: '.$Dir_							."\n",3,'_upload.info');
foreach( $_FILES as $k=>$v ){
error_log('   _FILES['.$k."]\n",3,'_upload.info');
foreach( $v as $k2=>$v2 ) error_log('   _FILES: '.$k2.' = '.$v2."\n",3,'_upload.info');
if( $_FILES[$k]["error"] > 0 ){
die("ERROR ".$_FILES[$k]["error"]);
}
}
}
if( count($_FILES)>0 ){
$CacheON = eFileGetVar("Setup.Cache");
$DirApli = GetCWD();
$DirApli = str_replace( '\\', '/', $DirApli );
$DirApli = str_replace( '/'.'/', '/', $DirApli );
if( substr($DirApli,-1)=='/' ) $DirApli = substr($DirApli,0,-1);
$tmp = explode('/',$DirApli);
$DirApli = $tmp[count($tmp)-2];
if( $_Tron ) error_log('DirApli: '.$DirApli."\n",3,'_upload.info');
$NomFile = $_GET['FILE'];
$utf8File = utf8_decode($_GET['FILE']);
if( $NomFile!=$utf8File ){
rename($NomFile, $utf8File);
$NomFile = $utf8File;
}
if( substr($NomFile,0,23)=='/_bak_/update/_update_.' ){
$MacroFile = $_FILES['file']['tmp_name'];
if( $_Tron ) eTrace('PROCESO con MacroFile: '.$MacroFile);
}else{
if( $_Tron ) eTrace('PROCESO normal: '.$NomFile);
$MacroFile = '';
}
if( $MacroFile!='' ){
if( $_Tron ) eTrace( 'Long MacroFile: '.filesize($MacroFile) );
$sDir = '../_bak_/update/';
if( !is_dir( $sDir ) ) mkdir( $sDir, 0777 );
$MacroFile = '..'.$_GET['FILE'];
move_uploaded_file( $_FILES['file']['tmp_name'], $MacroFile );
clearstatcache();
if( $_Tron ) eTrace( 'MacroFile:'.$MacroFile );
$MaxFileSize = filesize($MacroFile);
$fp = fopen( $MacroFile, 'r' );
}
$nd = 0;
do{
if( $MacroFile!='' ){
$LongNombre = (int)fread( $fp, 2 );
$NomFile = fread( $fp, $LongNombre );
$LongFile = (int)fread( $fp, 8 );
$nd++;
$FileTemp = '../_tmp/_update_.'.$nd;
$_FILES['file']['tmp_name'] = $FileTemp;
file_put_contents( $FileTemp, fread( $fp, $LongFile ) );
clearstatcache();
if( $_Tron ){
eTrace( 'FileTemp: '.$FileTemp ); eTrace( 'LongNombre: '.$LongNombre ); eTrace( 'Nombre: '.$NomFile ); eTrace( 'LongFile: '.$LongFile ); eTrace(' > Posición: '.ftell($fp) );
}
}
if( substr($NomFile,0,4)=='[OP]' ){
if( !function_exists('qQuery') ){
if( $_Tron ) error_log('> sql.ini: '.$NomFile."\n",3,'_upload.info');
eval(_LoadSqlIni('../_datos/config/sql.ini'));
if( $_Tron ) error_log('SQL: '.$_Sql."\n",3,'_upload.info');
include_once( "../../edesweb/{$_Sql}.inc" );
}
$tmp = explode('~',substr($NomFile,4));
if( $_Tron ) eTrace("update {$_SESSION['ShareDictionary']}gs_op set show_type='{$tmp[2]}' where cd_gs_op='{$tmp[1]}'");
qQuery("update {$_SESSION['ShareDictionary']}gs_op set show_type='{$tmp[2]}' where cd_gs_op='{$tmp[1]}'");
}else{
if( $_Tron ) error_log('NomFile: '.$NomFile."\n",3,'_upload.info');
if( $CacheON ){
$dir = "../_tmp/cch/";
if( is_dir($dir) ){
if( $dh = opendir($dir) ){
while( ($file = readdir($dh))!==false ){
@unlink($dir.$file);
}
closedir($dh);
}
}
}
if( substr($NomFile,0,2)=='/'.'/' ){
if( $_Tron ) error_log('Tipo: '.'/'.'/'."\n",3,'_upload.info');
$NomFile = '../../'.$DirApli.'.file'.substr($NomFile,1);
}else if( substr($NomFile,0,8)=='/../lib/' ){
if( $_Tron ) error_log('Tipo: '.'/lib/'."\n",3,'_upload.info');
$NomFile = '..'.$NomFile;
}else if( $NomFile[0]=='/' ){
if( $_Tron ) error_log('Tipo: '.'/'."\n",3,'_upload.info');
$NomFile = '..'.$NomFile;
}else if( $NomFile[0]=='$' ){
if( $_Tron ) error_log('Tipo: $'."\n",3,'_upload.info');
if( $_Tron ) error_log('IDSRV: '._IDSRV().' = '.$_GET['IDSRV']."\n",3,'_upload.info');
if( _IDSRV()<>$_GET['IDSRV'] ){
error_log('pcIDSRV 1: '.$_GET['IDSRV']."\n",3,'_upload.info');
error_log('srIDSRV 1: '._IDSRV(true)  ."\n",3,'_upload.info');
die('ERROR IDSRV');
}
$NomFile = '../../edesweb/'.substr($NomFile,1);
}else if( $NomFile[0]=='=' ){
$NomFile = str_replace('\\','/',$NomFile);
$NomFile = str_replace('../','',$NomFile);
$NomFile = '../../'.substr($NomFile,1);
}else{
if( $_Tron ) error_log('Tipo: else'."\n",3,'_upload.info');
if( $_Tron ) error_log('IDSRV: '._IDSRV().' = '.$_GET['IDSRV']."\n",3,'_upload.info');
if( _IDSRV()<>$_GET['IDSRV'] ){
error_log('pcIDSRV 2: '.$_GET['IDSRV']."\n",3,'_upload.info');
error_log('srIDSRV 2: '._IDSRV(true)  ."\n",3,'_upload.info');
die('ERROR IDSRV');
}
$NomFile = '../d/'.$NomFile;
}
if( $_Tron ) error_log('File Real: '.$NomFile."\n",3,'_upload.info');
$oFile = $_FILES['file']['tmp_name'];
if( substr_count( $NomFile.'/', '/crypt/' )>0 ){
$xNomFile = _NmFileConPrefijo( $NomFile, '' );
list( $Clave, $Ext ) = _UnPath( $NomFile );
list(,$xNomFile) = explode('/',$Clave);
copy( $oFile, '../_tmp/zip/'.$xNomFile );
$oFile = '../_tmp/zip/'.$xNomFile;
$xNomFile = substr($xNomFile,0,(strlen($Ext)+1)*-1);
$dFile = '../_tmp/zip/'.$xNomFile;
$Clave = md5($Clave);
if( strtoupper(substr(PHP_OS,0,3)) != 'WIN' ){
$ExeZip = "zip -9 -P {$Clave} -j ".$dFile." ".$oFile;
}else{
$ExeZip = eScript('$win/zip.exe')." -9 -P {$Clave} -j ".$dFile." ".$oFile;
}
$Dim = array();
exec( $ExeZip, $Dim );
@unlink($dFile.'.'.$Ext);
@unlink($oFile);
$FileTmp = $dFile.'.zip';
$df = fopen( $FileTmp, 'r+' );
fwrite( $df, chr(rand(48,127)).chr(rand(48,127)) );
fclose( $df );
$oFile = $FileTmp;
}
if( !move_uploaded_file($oFile, $NomFile) ){
copy($oFile, $NomFile);
@unlink($oFile);
}
if( $_Tron ) eTrace('Mover File de: "'.$oFile.'" a "'.$NomFile.'"');
if( $_GET['MD5']!='' ){
if( $_Tron ){
error_log('MD5 PC.....: '.$_GET['MD5']			."\n",3,'_upload.info');
error_log('MD5 Server.: '.md5_file( $NomFile ) 	."\n",3,'_upload.info');
}
if( $_GET['MD5']<>md5_file($NomFile) ){
die('ERROR AL SUBIR EL FICHERO Al SERVIDOR');
}
}
}
if( $NomFile=='../tree/_gs_op_.txt' || $NomFile=='../tree/_gs_tree_.txt' ){
if( !function_exists('qQuery') ){
if( $_Tron ) error_log('> _gs_op_.txt: '.$_Sql."\n",3,'_upload.info');
eval(_LoadSqlIni('../_datos/config/sql.ini'));
if( $_Tron ) error_log('SQL: '.$_Sql."\n",3,'_upload.info');
include_once( "../../edesweb/{$_Sql}.inc" );
}
if( $_Tron ) error_log('Actualiza tabla: '.$NomFile."\n",3,'_upload.info');
$TABLA = $_SESSION['ShareDictionary'].(($NomFile=='../tree/_gs_op_.txt')?'gs_op':'gs_tree');
$FICHERO = $NomFile;
if( $_Tron ) error_log('Borra registros de: '.$TABLA."\n",3,'_upload.info');
if( sql_Cuenta($TABLA)>0 ) sql_Borra($TABLA);
$TReg = 0;
if( $_Tron ) error_log('Abre fichero de: '.$FICHERO."\n",3,'_upload.info');
$fd = fopen($FICHERO, 'r');
while( ($txt = fgets($fd,50000)) ){
$Valores = "'".str_replace('|', "','", chop($txt))."'";
if( $_Tron ) error_log("insert into {$TABLA} values ( $Valores )"."\n",3,'_upload.info');
qQuery("insert into {$TABLA} values ( $Valores )");
$TReg++;
}
fclose($fd);
if( $_Tron ) error_log("Tabla {$TABLA} importada ({$TReg})\n",3,'_upload.info');
}
if( $NomFile=='../tree/gs_op.unl' ){
set_time_limit(5*60);
if( !function_exists('qQuery') ){
if( $_Tron ) error_log('> gs_op.unl: '.$_Sql."\n",3,'_upload.info');
eval(_LoadSqlIni('../_datos/config/sql.ini'));
if( $_Tron ) error_log('SQL: '.$_Sql."\n",3,'_upload.info');
include_once("../../edesweb/{$_Sql}.inc");
}
if( $_Tron ) error_log('SQL: Borrar gs_op'."\n",3,'_upload.info');
qQuery("delete from {$_SESSION['ShareDictionary']}gs_op");
$txt = file_get_contents($NomFile);
$Dim = explode("\n", $txt);
for($n=0; $n<count($Dim); $n++){
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n]!='' ){
$txt = "'".str_replace('|',"','",trim(substr($Dim[$n],0,-1)))."'";
$sql = "insert into {$_SESSION['ShareDictionary']}gs_op values ({$txt})";
if( $_Tron ) error_log('SQL: '.$sql."\n",3,'_upload.info');
qQuery($sql);
}
}
if( $_Tron ) error_log('SQL: END'."\n",3,'_upload.info');
}else if( $NomFile=='../tree/gs_op_lng.unl' ){
set_time_limit(5*60);
if( !function_exists('qQuery') ){
if( $_Tron ) error_log('> gs_op_lng.unl: '.$_Sql."\n",3,'_upload.info');
eval(_LoadSqlIni('../_datos/config/sql.ini'));
if( $_Tron ) error_log('SQL: '.$_Sql."\n",3,'_upload.info');
include_once("../../edesweb/{$_Sql}.inc");
}
if( $_Tron ) error_log('SQL: Borrar gs_op_lng'."\n",3,'_upload.info');
qQuery("delete from {$_SESSION['ShareDictionary']}gs_op_lng");
$txt = file_get_contents($NomFile);
$Dim = explode("\n", $txt);
for($n=0; $n<count($Dim); $n++){
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n]!='' ){
$txt = "'".str_replace('|',"','",trim(substr($Dim[$n],0,-1)))."'";
$sql = "insert into {$_SESSION['ShareDictionary']}gs_op_lng values ( $txt )";
if( $_Tron ) error_log('SQL: '.$sql."\n",3,'_upload.info');
qQuery($sql);
}
}
if( $_Tron ) error_log('SQL: END'."\n",3,'_upload.info');
}else if( $NomFile=='../tree/gs_op_ico.unl' ){
if( !function_exists('qQuery') ){
if( $_Tron ) error_log('> gs_op_ico.unl: '.$_Sql."\n",3,'_upload.info');
eval(_LoadSqlIni('../_datos/config/sql.ini'));
if( $_Tron ) error_log('SQL: '.$_Sql."\n",3,'_upload.info');
include_once( "../../edesweb/{$_Sql}.inc" );
}
$file = 'gs_op_ico';
$TABLA = "{$_SESSION['ShareDictionary']}gs_op_ico";
sql_Borra($TABLA);
$fd = fopen( "../tree/{$file}.unl", 'r' );
while( ($txt = fgets($fd,10000)) ){
$txt =	  str_replace( '|'		 , '","'  , chop($txt) );
$txt =	  str_replace( '{&#124;}', '|'    , $txt );
$txt =	  str_replace( '{&#34;}' , '"'    , $txt );
$txt =	  str_replace( '{&#13;}' , chr(13), $txt );
$txt = '"'.str_replace( '{&#10;}' , chr(10), $txt ).'"';
if( $_Tron ) error_log('SQL: '."insert into {$TABLA} values ({$txt})"."\n",3,'_upload.info');
qQuery("insert into {$TABLA} values ({$txt})");
}
fclose($fd);
}else if( $NomFile=='../tree/gs_tpermission.unl' ){
if( !function_exists('qQuery') ){
if( $_Tron ) error_log('> gs_tpermission.unl: '.$_Sql."\n",3,'_upload.info');
eval(_LoadSqlIni('../_datos/config/sql.ini'));
if( $_Tron ) error_log('SQL: '.$_Sql."\n",3,'_upload.info');
include_once("../../edesweb/{$_Sql}.inc");
}
$file = 'gs_tpermission';
$TABLA = "{$_SESSION['ShareDictionary']}gs_tpermission";
sql_Borra($TABLA);
$fd = fopen("../tree/{$file}.unl", 'r');
while( ($txt = fgets($fd,10000)) ){
$txt =	  str_replace( '|'		 , '","'  , chop($txt) );
$txt =	  str_replace( '{&#124;}', '|'    , $txt );
$txt =	  str_replace( '{&#34;}' , '"'    , $txt );
$txt =	  str_replace( '{&#13;}' , chr(13), $txt );
$txt = '"'.str_replace('{&#10;}' , chr(10), $txt ).'"';
if( $_Tron ) error_log('SQL: '."insert into {$TABLA} values ({$txt})"."\n",3,'_upload.info');
qQuery("insert into {$TABLA} values ({$txt})");
}
fclose($fd);
}else if( substr($NomFile,0,8)=='../tree/' && substr($NomFile,-4)=='.unl' ){
set_time_limit(5*60);
if( !function_exists('qQuery') ){
if( $_Tron ) error_log('> gs_tpermission.unl: '.$_Sql."\n",3,'_upload.info');
eval(_LoadSqlIni('../_datos/config/sql.ini'));
if( $_Tron ) error_log('SQL: '.$_Sql."\n",3,'_upload.info');
include_once("../../edesweb/{$_Sql}.inc");
}
$TABLA = substr($NomFile,8,-4);
sql_Borra( $TABLA );
$fd = fopen( "../tree/{$TABLA}.unl", 'r' );
while( ($txt = fgets($fd,10000)) ){
$txt =	   str_replace( '|'		 , '","'  , chop($txt) );
$txt =	   str_replace( '{&#124;}', '|'    , $txt );
$txt =	   str_replace( '{&#34;}' , '"'    , $txt );
$txt =	   str_replace( '{&#13;}' , chr(13), $txt );
$txt = '"'.str_replace( '{&#10;}' , chr(10), $txt ).'"';
if( $_Tron ) error_log('SQL: '."insert into {$TABLA} values ({$txt})"."\n",3,'_upload.info');
qQuery( "insert into {$TABLA} values ({$txt})" );
}
fclose($fd);
}
if( $NomFile=='../_datos/config/sql.log' ){
if( !function_exists('qQuery') ){
if( $_Tron ) error_log('> sql.log: '.$_Sql."\n",3,'_upload.info');
eval(_LoadSqlIni('../_datos/config/sql.ini'));
if( $_Tron ) error_log('SQL: '.$_Sql."\n",3,'_upload.info');
include_once( "../../edesweb/{$_Sql}.inc" );
}
$CDI = trim(file_get_contents('../_datos/config/sql.cdi'));
$Dim = file('../_datos/config/sql.log');
for( $n=0; $n<count($Dim); $n++ ){
if( trim($Dim[$n])!='' ){
$oCDI = trim(substr( $Dim[$n], 0, 19 ));
$txt = trim(substr( $Dim[$n], 20 ));
if( $oCDI > $CDI ){
if( $_Tron ) error_log('SQL Ejecutar: '.$txt."\n",3,'_upload.info');
qQuery( $txt );
file_put_contents( '../_datos/config/sql.cdi', $oCDI );
clearstatcache();
}
}
}
}
if( $NomFile=='../_datos/config/directory.log' ){
if( $_Tron ) error_log("Inicio actualización Directory\n",3,'_upload.info');
$CDI = trim(file_get_contents('../_datos/config/directory.cdi'));
if( $_Tron ) error_log('CDI actual: '.$CDI."\n",3,'_upload.info');
$Dim = file('../_datos/config/directory.log');
for( $n=0; $n<count($Dim); $n++ ){
if( $Dim[$n]!='' ){
$oCDI = trim(substr( $Dim[$n], 0, 19 ));
$txt = trim(substr( $Dim[$n], 20 ));
if( $_Tron ) error_log('Comando: '.$oCDI.' '.$txt."\n",3,'_upload.info');
if( $oCDI > $CDI ){
if( $_Tron ) error_log('Ejecutar COMANDO: '.$txt."\n",3,'_upload.info');
passthru( $txt );
file_put_contents( '../_datos/config/directory.cdi', $oCDI );
clearstatcache();
}
}
}
}
if( $NomFile=='../_datos/config/update.log' ){
include( $NomFile );
}
} while( $MacroFile!='' and !feof($fp) and ftell($fp) < $MaxFileSize );
if( $MacroFile!='' ) fclose( $fp );
if( $_Tron ) error_log("FIN\n",3,'_upload.info');
}else if( $_GET['FILE']=='~' ){
$xUsuario = strip_tags($_POST['email']);
$ListChr = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789ÇÜ'.
'abcdefghijklmnñopqrstuvwxyz0123456789çü'.'&.-_@';
for($i=0; $i<strlen($xUsuario); $i++) if( substr_count($ListChr, substr($xUsuario,$i,1))==0 ) die('ERROR EMAIL-4');
if( !function_exists('qQuery') ){
eval(_LoadSqlIni('../_datos/config/sql.ini'));
include_once("../../edesweb/{$_Sql}.inc");
}
if( qCount('gs_user', "login='{$xUsuario}'")==0 ){
$Trigger = '';
}else{
qQuery("select trigger_chr from gs_user where login='{$xUsuario}'");
list($Trigger) = qRow();
}
echo '<script type="text/javascript">top._EntrarYA("'.trim($Trigger).'");</script>';
qEnd();
if( $_HndDB ){
qFree();
qEnd();
}
die("ok");
}
echo 'ok';
if( $_HndDB ){
qFree();
qEnd();
}
exit;
function eFileGetVar2($Clave="", $Publicar=false){
if( !function_exists('GetValor') ){
function GetValor($Valor){
if( strlen($Valor)>=2 ) if( $Valor[0]==substr($Valor,-1) && ($Valor=='"' || $Valor="'") ) $Valor = substr($Valor,1,-1);
if( strtoupper($Valor)=='FALSE' || strtoupper($Valor)=='TRUE' ) $Valor = strtoupper($Valor)=='TRUE';
if( $Valor==NULL ) $Valor = "";
return $Valor;
}
}
if( !function_exists('quitaRem') ){
function quitaRem($txt){
$p = strpos($txt, '/'.'/');
if( $p!==false ){
if( substr($txt,$p-1,1)=="=" || substr($txt,$p-2,1)=="=" || substr($txt,$p-1,1)==":" ){
$p = strpos($txt, '/'.'/', $p+1);
if( $p!==false ){
$txt = substr($txt,0,$p-1);
}
}else{
$txt = substr($txt,0,$p-1);
}
}
return $txt;
}
}
$NmFile = '../_datos/config/group.var';
$VarDentroGrupo = true;
$Variable = '';
$DimVar = array();
$RetornaDim = true;
$Valor = "";
if( substr_count($Clave,'->')>0 ){
list($NmFile, $Variable) = explode('->',$Clave);
$NmFile = eScript(trim($NmFile));
$Variable = trim($Variable);
$VarDentroGrupo = false;
$Clave = $Variable;
}
if( substr_count($Clave,'.')==1 ){
list($Clave, $Variable) = explode('.', $Clave);
$Clave = trim($Clave);
$Variable = trim($Variable);
$VarDentroGrupo = true;
$RetornaDim = false;
}
if( $Clave!="" ){
$Clave = strtoupper(trim($Clave));
if( substr($Clave,-1)!=':' ) $Clave .= ':';
}
$nv = 0;
if( substr_count($NmFile,'/_datos/config/sql.ini')>0 ){
$txt = trim(@file_get_contents($NmFile));
if( substr($txt,0,2)!='<'.'?' ){
$txt = gzuncompress($txt);
$Divide = ((substr_count($txt,chr(10))>=substr_count($txt,chr(13))) ? chr(10) : chr(13) );
$Dim = explode($Divide,$txt);
}else{
$Dim = file($NmFile);
}
}else{
$Dim = file($NmFile);
}
for($n=0; $n<count($Dim); $n++){
$Dim[$n] = quitaRem($Dim[$n]);
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n]=="" ) continue;
if( ($Clave=="" && substr($Dim[$n],-1)==":") || strtoupper($Dim[$n])==$Clave || !$VarDentroGrupo ){
$keyGroup = substr($Dim[$n],0,-1);
if( !$VarDentroGrupo ) $n = -1;
for($i=$n+1; $i<count($Dim); $i++){
$key = quitaRem($Dim[$i]);
$key = trim($key);
if( $key!='' && $key[0]!='.' ){
if( substr($key,-1)==':' ){
if( $Clave=="" ) break;
else break 2;
}
$nv++;
if( substr($key,-1)==';' ) $key = trim(substr($key,0,-1));
$p = strpos($key,'=');
if( $p!==false ){
$NmVar = trim(substr($key,0,$p));
$Valor = trim(substr($key,$p+1));
if( !$VarDentroGrupo ){
$Valor = quitaRem($Valor);
$Valor = trim($Valor);
if( substr($Valor,-1)==';' ) $Valor = trim(substr($Valor,0,-1));
}
if( strlen($Valor)>=2 ) if( $Valor[0]==substr($Valor,-1) && ($Valor[0]=='"' || $Valor[0]=="'") ) $Valor = trim(substr($Valor,1,-1));
if( strtoupper($Valor)=='FALSE' || strtoupper($Valor)=='TRUE' ) $Valor = (strtoupper($Valor)=='TRUE');
if( strtoupper($Valor)=='!FALSE' || strtoupper($Valor)=='!TRUE' ) $Valor = (strtoupper($Valor)=='!FALSE');
if( $Variable!='' ){
if( $Variable==$NmVar ) return $Valor;
}else{
if( $Clave=="" ){
$DimVar[$keyGroup][$NmVar] = $Valor;
}else{
$DimVar[$NmVar] = $Valor;
if( $Publicar ) $GLOBALS[$NmVar] = $Valor;
}
}
}
}
}
if( $Clave!="" ) break;
}
}
if( $nv>1 )
if( $RetornaDim ) return $DimVar;
return "";
}
function gsUpdateScript($Time, $File, $Op, $NewText, $De, $Desde='', $Hasta='', $Test=true){
$CDI = trim(file_get_contents('../_datos/config/update.cdi'));
if( $Time <= $CDI && $CDI!='' ) return;
$xFile = trim(file_get_contents( $File ));
switch( $Op ){
case 'S':
$xFile = $NewText . $xFile;
break;
case 'B':
if( substr_count( strtoupper($xFile), strtoupper($De) ) > 0 ){
$i = strpos( strtoupper($xFile), strtoupper($De) );
$xFile = substr( $xFile, 0, $i ) . $NewText . substr( $xFile, $i );
}
break;
case 'I':
if( substr_count( strtoupper($xFile), strtoupper($De) ) > 0 ){
$i = strpos( strtoupper($xFile), strtoupper($De) );
if( $Desde!='' ){
$i = strpos( strtoupper($xFile), strtoupper($Desde), $i ) + strlen($Desde);
}
if( $Hasta!='' ){
$f = strpos( strtoupper($xFile), strtoupper($Hasta), $i );
}
$xFile = substr( $xFile, 0, $i ) . $NewText . substr( $xFile, $f );
}
break;
case 'A':
if( substr_count( strtoupper($xFile), strtoupper($De) ) > 0 ){
$i = strpos( strtoupper($xFile), strtoupper($De) ) + strlen($De);
$xFile = substr( $xFile, 0, $i ) . $NewText . substr( $xFile, $i );
}
break;
case 'E':
$xFile .= "\n".$NewText;
break;
}
file_put_contents( $File, $xFile );
file_put_contents( '../_datos/config/update.cdi', $Time );
clearstatcache();
}
function _UnPath( $txt ){
$Dim = explode('/',str_replace('\\','/',$txt));
$Ext = explode('.',$txt);
return array( $Dim[count($Dim)-2].'/'.$Dim[count($Dim)-1], $Ext[count($Ext)-1] );
}
?>
