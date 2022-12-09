<?PHP
define( '_ERROR_REPORTING', 5 );
error_reporting( _ERROR_REPORTING );
date_default_timezone_set('Europe/Madrid');
ini_set( 'track_errors', false );
set_time_limit( 0 );
$sg = gettimeofday();
$_SecondINI = (int)$sg["sec"];
if( $argv[3][0]=="'" && substr($argv[3],-1)=="'" ) $argv[3] = substr($argv[3],1,-1);
if( $argv[3][0]=='"' && substr($argv[3],-1)=='"' ) $argv[3] = substr($argv[3],1,-1);
$argv[3] = str_replace('{36}','$',$argv[3]);
$FileInfo = '../_tmp/_background.info';
if( $argv[3]=='phpinfo' ){
if( file_exists($FileInfo) ) @unlink( $FileInfo );
error_log( 'HOST NAME: '.php_uname('n')."\n", 3, $FileInfo );
error_log( 'Directorio actual: '.getCWD()."\n", 3, $FileInfo );
error_log( "argv\n", 3, $FileInfo );
foreach( $argv as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "argc\n", 3, $FileInfo );
foreach( $argc as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_SERVER\n", 3, $FileInfo );
foreach( $_SERVER as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_ENV\n", 3, $FileInfo );
foreach( $_ENV as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_GLOBALS\n", 3, $FileInfo );
foreach( $_GLOBALS as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_GET\n", 3, $FileInfo );
foreach( $_GET as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_POST\n", 3, $FileInfo );
foreach( $_POST as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_FILE\n", 3, $FileInfo );
foreach( $_FILE as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_REQUEST\n", 3, $FileInfo );
foreach( $_REQUEST as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_SESSION (sin session_start)\n", 3, $FileInfo );
foreach( $_SESSION as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
error_log( "_SESSION (con session_start)\n", 3, $FileInfo );
session_start();
foreach( $_SESSION as $k=>$v ) error_log( "\t".$k.': '.$v."\n", 3, $FileInfo );
$Dim = ini_get_all();
error_log( "ini_get_all():\n", 3, $FileInfo );
foreach( $Dim as $kp=>$vp ){
error_log( "\t".$kp.":\n", 3, $FileInfo );
foreach( $vp as $k=>$v ) error_log( "\t\t".$k.' = '.$v."\n", 3, $FileInfo );
}
exit;
}
if( !function_exists('eTron') ){
$_GET = array();
$_BKG = $argv[1];
$_User = $argv[2];
$_File = $argv[3];
$_GET['_DB'] = $argv[4];
}
$GLOBALS['PHP_SELF'] = $_File;
$GLOBALS['SCRIPT_NAME'] = $_File;
$GLOBALS['PATH_TRANSLATED'] = $_File;
$_SERVER['SCRIPT_FILENAME'] = $_File;
$_SERVER['PHP_SELF'] = $_File;
$_SERVER['SCRIPT_NAME'] = $_File;
$_SERVER['SCRIPT_FILENAME'] = $_File;
$_SERVER['PATH_TRANSLATED'] = $_File;
for($i=4; $i<$argc; $i++){
$Parametro = $argv[$i];
$p = strpos($Parametro, '=');
if( $p>0 ){
$k = substr($Parametro, 0, $p);
$v = substr($Parametro, $p+1);
$GLOBALS[$k] = $v;
$_GET[$k] = $v;
}else{
}
}
unset( $_SERVER['argv'] );
unset( $_SERVER['argc'] );
unset( $argc );
unset( $argv );
unset( $Parametro );
unset( $i );
unset( $p );
if( $_GET['_DB']!='' ){
$FileIni = '../_datos/config/'.$_GET['_DB'].'.ini';
}else{
$FileIni = '../_datos/config/sql.ini';
}
$txt = trim( @file_get_contents( $FileIni ) );
if( substr($txt,0,2)!='<'.'?' ){
eval( gzuncompress($txt) );
}else{
eval( substr( $txt, ( ( strtoupper(substr($txt,0,5))=='<'.'?PHP' ) ? 5 : 2 ), -4 ) );
}
unset( $txt );
list($_File) = explode(' ',trim($_File));
if( !function_exists('eTron') ){
include_once( '../../edesweb/background2.inc' );
}else{
eTrace( 'File: '.eScript($_File) );
}
include_once( '../../edesweb/'.$_Sql.'.inc' );
if( $_File=='$report.gs' ){
$NomFile = '../_tmp/ext/bkg_var.'.$_User;
}else{
$NomFile = '../_tmp/ext/bkg_post.'.$_User;
}
$Dim = file($NomFile);
for($n=0; $n<count($Dim); $n++){
list($k,$v) = explode('|',$Dim[$n]);
$v = trim($v);
${$k} = $v;
if( $k=='SCRIPT_FILENAME' ){
$_SERVER['SCRIPT_FILENAME'] = $v;
}else{
if( $k=='_DB' ){
$_GET[$k] = $v;
}else if( $k=='_iSql' ){
$_SESSION['_iSql'] = $v;
}else if( $k=='_PathCSS' ){
$_SESSION['_PathCSS'] = $v;
}else{
$_POST[$k] = $v;
}
}
}
@unlink($NomFile);
switch( $_SESSION['_iSql'] ){
case 'mysql':
eInclude('mysql.class');
$_db = new eMySql();
break;
case 'mysqli':
eInclude('mysqli.class');
$_db = new eMySqli();
break;
case 'informix':
eInclude('informix.class');
$_db = new eInformix();
break;
case 'oracle':
eInclude('oracle.class');
$_db = new eOracle();
break;
case 'pdo':
eInclude('pdo.class');
$_db = new ePdo();
break;
}
$_db->qConnect('sql');
$_db->qQuery( "update gs_bkg set bkg_pid=".getmypid()." where cd_gs_bkg={$_BKG}" );
$_db->qEnd();
include( eScript($_File) );
exit;
function qConnectSystem(){
global $_HndDBSystem;
switch( $_SESSION['_iSql'] ){
case 'mysql':
eInclude('mysql.class');
$_HndDBSystem = new eMySql();
break;
case 'mysqli':
eInclude('mysqli.class');
$_HndDBSystem = new eMySqli();
break;
case 'informix':
eInclude('informix.class');
$_HndDBSystem = new eInformix();
break;
case 'oracle':
eInclude('oracle.class');
$_HndDBSystem = new eOracle();
break;
case 'pdo':
eInclude('pdo.class');
$_HndDBSystem = new ePdo();
break;
}
$_HndDBSystem->qConnect('sql');
}
function eBkgError( $Txt ){
global $_db;
$CDIFin = date('Y-m-d H:i:s');
$_db->qConnect('sql');
$_db->qQuery( "update gs_bkg set bkg_status='e', y2s_end='{$CDIFin}' where cd_gs_bkg={$_BKG}" );
eBkgEnd( 'E', $Txt, false );
}
function eBkgNote( $Txt ){
global $_db;
global $_BKG;
$Txt = str_replace('"','\"',str_replace("'","\'",$Txt));
$_db->qQuery( "update gs_bkg set
y2s_note='".date('Y-m-d H:i:s')."',
note='".$Txt."' where cd_gs_bkg={$_BKG}" );
}
function eBkgEnd( $Estado='F', $uError='', $Conectar=true ){
global $_db;
global $_BKG;
if( $Conectar ) $_db->qConnect('sql');
$_db->qQuery( "select y2s_start from gs_bkg where cd_gs_bkg={$_BKG}" );
list( $CDIIni ) = $_db->qRow();
$sCDIFin = $CDIFin = date('Y-m-d H:i:s');
$CDIIni = str_replace(' ','-',str_replace(':','-',$CDIIni));
$CDIFin = str_replace(' ','-',str_replace(':','-',$CDIFin));
list( $iA, $iM, $iD, $ih, $im, $is ) = explode('-',$CDIIni );
list( $fA, $fM, $fD, $fh, $fm, $fs ) = explode('-',$CDIFin );
$n = mktime( $fh, $fm, $fs, $fM, $fD, $fA ) - mktime( $ih, $im, $is, $iM, $iD, $iA );
$TotalTime = date('H:i:s',$n-3600);
$File = "../_tmp/err/{$_BKG}.bkg";
$TxtError = @file_get_contents( $File );
if( $TxtError=='' && $uError!='' ) $TxtError = $uError;
$TxtError = str_replace('"','\"',str_replace("'","\'",trim($TxtError)));
$TxtError = str_replace( chr(13), chr(10), $TxtError );
$TxtError = str_replace( chr(10).chr(10), chr(10), $TxtError );
$TxtError = str_replace( chr(10), '~', $TxtError );
$BkgSTime = $BkgTime = '';
if( strtoupper(substr(PHP_OS,0,3)) != 'WIN' ){
$xSalida = shell_exec( 'ps -F -p '.getmypid() );
$DimPS = explode("\n",$xSalida);
for( $n=0; $n<count($DimPS); $n++ ){
$txt = trim($DimPS[$n]);
while( substr_count($txt,'  ') > 0 ) $txt = str_replace('  ',' ',$txt);
if( trim($txt)=='' ) continue;
$Dim = explode(' ',$txt);
if( count($Dim)<11 ) continue;
$xPID = $Dim[1];
if( $xPID=='PID' ) continue;
$BkgSTime = $Dim[7];
$BkgTime = $Dim[9];
$xCMD = $Dim[10];
break;
}
}
$_db->qQuery( "update gs_bkg set bkg_status='{$Estado}', txt_error='{$TxtError}', bkg_stime='{$BkgSTime}', bkg_time='{$BkgTime}', total_time='{$TotalTime}', y2s_end='{$sCDIFin}' where cd_gs_bkg={$_BKG}" );
@unlink( $File );
$_BKG = -1;
$_db->qEnd();
exit;
}
if( !function_exists('eScript') ){
function eScript( $File, &$Bak=NULL, &$EsEdes=NULL ){
global $Dir_;
$File = str_replace( '\\', '/', trim($File) );
$EsEdes = false;
while( substr_count( $File, '../../' ) > 0 ) $File = str_replace( '../../', '../', $File );
while( substr_count( $File, '/edesweb/' ) > 0 ) $File = str_replace( '/edesweb/', '/', $File );
if( substr_count('~AM',$_SESSION['_D_']) == 0 ){
while( substr_count( $File, '/sql.ini' ) > 0 ) $File = str_replace( '/sql.ini', '/', $File );
}
switch( $File[0] ){
case '/':
case '.':
if( substr($File,0,2) == '//' || substr($File,0,2) == './' ){
$tmp = explode('/',$_SERVER['SCRIPT_FILENAME']);
$DirFile = '';
for( $n=1; $n<count($tmp)-2; $n++ ) $DirFile .= '/'.$tmp[$n];
$Bak .= $DirFile.'/_bak_.file/'.substr($File,2);
$DirFile .= '.file/'.substr($File,2);
$File = $DirFile;
}elseif( substr($File,0,11) == '/_doc_/edf/' ){
$tmp = explode( '/',$File);
$Bak = '../_bak_'.$File;
$File  = '..'.$File;
}else{
$Bak = '../_bak_'.$File;
$File = '..'.$File;
}
break;
case '$':
$tmp = explode('/',$File);
$Bak  = $Dir_.'m/_bak_/'.$tmp[count($tmp)-1];
$File = $Dir_.substr($File,1);
$EsEdes = true;
break;
case '^':
case '>':
$File = substr($File,1);
break;
case '?':
$File = substr($File,1);
if( substr($File,-1) != '/' ) $File .= '/';
$Dir = eScript($File);
$DirRoot = eGetCWD();
if( substr($DirRoot,-1) != '/' ) $DirRoot .= '/';
$Sumar = false;
if( substr($Dir,0,3) == '../' ){
$DirRoot = substr($DirRoot,0,strrpos($DirRoot,'/'));
$DirRoot = substr($DirRoot,0,strrpos($DirRoot,'/'));
$Dir = substr($Dir,2);
$Sumar = true;
}
if( $Sumar ){
$File = $DirRoot.$Dir;
}else{
$File = $Dir;
}
break;
case '*':
$txt = explode( '/', str_replace( chr(92), '/', substr($File,1) ) );
$File = '../../'.substr($File,1);
if( !file_exists('../../'.$txt[0].'/http/edes.php') ) eEnd('ERROR:32Q');
return $File;
case '=':
while( substr_count( $File, '../' ) > 0 ) $File = str_replace( '../', '', $File );
if( $File[0]=="/" ) $File = substr($File,1);
$File = "../../".substr($File,1);
break;
default:
$Bak = '../_bak_/d/'.$File;
$File = '../d/'.$File;
}
$Bak = trim($Bak);
return str_replace( '....', '..', trim($File) );
}
}
?>
