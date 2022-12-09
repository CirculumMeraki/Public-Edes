<?PHP
if( isset($_GET['_DEBUG']) && $_GET['_DEBUG']==99 ) file_put_contents('_debug_ini.txt', 'PHP Ini '.date('H:i:s').substr(microtime(),1,7));
define('_ERROR_REPORTING', 5);
error_reporting(_ERROR_REPORTING);
ini_set("display_errors", 1);
define('_TRACK_ERRORS', false);
ini_set('track_errors', false);
date_default_timezone_set(isset($_SESSION["_TimeZone"])? $_SESSION["_TimeZone"]:'Europe/Madrid');
ini_set('date.timezone', isset($_SESSION["_TimeZone"])? $_SESSION["_TimeZone"]:'Europe/Madrid');
ini_set('default_charset', isset($_SESSION["_Charset"])? $_SESSION["_Charset"]:"ISO-8859-1");
$_IniSg = eGetMicrotime();
if(!isset($_SESSION)) session_start();
if( file_exists('edes.php.log') ){
list($i) = explode(' ',microtime());
error_log(date('Y-m-d H:i:s:').substr($i,2,8).': '.$_SERVER["QUERY_STRING"]."\n",3, 'edes.php.log');
}
if( isset($_SESSION["_TRACE_URL_"]) ) include(__DIR__.'/itm/trace_url.inc');
list($_Accion) = explode('&', $_SERVER['QUERY_STRING']);
$_oAccion = $_Accion;
if( isset($_SESSION['_User']) && substr($_oAccion,-2)=="df" ){
$fileCch = eScriptToCache();
if( file_exists($fileCch) ){
_HeaderAdd();
readfile($fileCch);
exit;
}
}
$_PathHTTP = str_replace(chr(92),'/',getCWD());
if( substr($_PathHTTP, -1)<>'/' ) $_PathHTTP .= '/';
if( substr($_SERVER["QUERY_STRING"],0,12)=='UPLOAD&FILE=' ){
include(__DIR__.'/up.inc'); exit;
}else if( substr($_SERVER["QUERY_STRING"],0,14)=='DOWNLOAD&FILE=' ){
include(__DIR__.'/down.inc'); exit;
}else if( substr($_SERVER["QUERY_STRING"],0,13)=='PHPLOAD&FILE=' ){
include(__DIR__.'/printtab.gs'); exit;
}else if( substr($_SERVER["QUERY_STRING"],0,8)=='session=' ){
include(__DIR__.'/session.php');
}else if( $_SERVER["QUERY_STRING"]=="~EXE~" ){
$dim = getallheaders();
foreach($dim as $k=>$v){
list(,$kk,$nom) = explode("~",$k);
if( $k=="" ) continue;
$GLOBALS["_".$kk][$nom] = $v;
if( $kk=="SERVER" ) list(,$_SERVER[$nom]) = explode("?",$v);
}
unset($_GET["~EXE~"]);
if( !file_exists("../_tmp/php/curl_".$_SESSION["_sesion_"]) ) exit;
@unlink("../_tmp/php/curl_".$_SESSION["_sesion_"]);
}else if( $_GET["AP"]!='' ){
if( $_GET["AP"][0]=='$' && $_GET["TE"]<>"" && $_GET["SS"]<>"" ){
include(__DIR__.'/t/v30.gs'); exit;
}
}else if( $_GET["IC"]!='' && $_GET["IC"][0]=='$' ){
if( substr($_GET["IC"],-3)=='gif' ){
header("Content-Type: image/gif");
header("Last-Modified: ".gmdate("D, d M Y 00:00:01 T"));
header("Expires: ".gmdate("D, d M Y 23:50:50 T"));
header("Cache-Control: max-age");
die( file_get_contents(__DIR__.'/'.substr($_GET["IC"],1) ) );
}
}
$_SessionCopy = false;
$_QueryString = $_SERVER['QUERY_STRING'];
_HeaderAdd();
if($_SERVER["QUERY_STRING"][0]=="~" && strlen(explode("&_CONTEXT=", $_SERVER["QUERY_STRING"])[0])==64) include(__DIR__.'/m/current_ver.inc');
if($_SERVER['QUERY_STRING']==chr(71).'e'.chr(83).'o'.'ft'.date('Ym')) die('Tecnología eDes Versión 2021-03, Copyright GeSoft SL. © 2001');
$_BinaryMode = array("i"=>"a", "I"=>"A",  "d"=>"b", "dR"=>"bR", "D"=>"B",   "v"=>"c", "vR"=>"cR",   "u"=>"m", "uR"=>"mR", "U"=>"M",   "dl"=>"bl", "vl"=>"cl", "ul"=>"mp");
list($Objeto, $NomScript) = explode(':', $_SERVER['QUERY_STRING']);
$Objeto = str_replace('_Accion=', '', $Objeto);
list($Objeto) = explode('&',$Objeto);
$_Mode = substr($Objeto,1);
if( $_BinaryMode[$_Mode]<>"" ) $_Mode = $_BinaryMode[$_Mode];
list($Objeto) = explode('&',$Objeto);
list($_DF) = explode('?',$NomScript);
list($_DF) = explode('&',$_DF);
$_Object = $Objeto[0];
$_SqlStart = false;
$_SqlStartSystem = false;
$_DBRLOCK = true;
foreach($_POST as $k=>$v){
if( gettype($_POST[$k])<>"array" ){
$v = stripslashes($_POST[$k]);
if( $_SESSION["HackingProtection"] || !$_SESSION["_User"] ){
if( $k=="fuente" && substr_count($_SERVER["QUERY_STRING"],'E:$t/ed.gs&')>0 ){
}else{
$v = eEntityEncode($v);
if( preg_match('/^(cR|bR|mR)$/', $_Mode) ){
$v = str_replace("&#60;&#62;", "<>", $v);
if( (substr_count($v,"&#60;")+substr_count($v,"&#62;"))<=2 ){
$v = str_replace(
array("&#60;", "&#62;"),
array(  "<"  ,   ">"  ),
$v
);
}
if(($v[0]==")" || $v[0]=="(") && (substr_count($v,"&#39;")+substr_count($v,"&#34;"))>0 ){
if( (($v[0]==")" && substr($v,-1)=="(") || ($v[0]=="(" && substr($v,-1)==")")) && (substr_count($v,",")+1)*2==(substr_count($v,"&#39;")+substr_count($v,"&#34;")) ){
$v = str_replace(
array('&#34;', '&#39;'),
array(  '"'  ,   "'"  ),
$v
);
}
}
}
}
}else if( $k[0]=="_" ){
$v = eEntityEncode($v);
}
if( preg_match('/^(cR|bR|mR)$/', $_Mode) ){
$v = str_replace(
array("&#60;", "&#62;"),
array(  "<"  ,   ">"  ),
$v
);
}
}
$_POST[$k] = $v;
$GLOBALS[$k] = $v;
}
if( $_POST["_FIELDSWITHFILES"]!='' ){
$nf = 0;
$tmp = explode('|', $_POST["_FIELDSWITHFILES"]);
for($n=0; $n<count($tmp)-1; $n++){
if( $_POST[$tmp[$n]]!='' ){
$FileTmp = '../_tmp/zip/'.$_SESSION['_User'].'_'.$nf;
$nf++;
$_FILES[$tmp[$n]]['tmp_name'] = $FileTmp;
$GLOBALS[$tmp[$n].'_tmp_name'] = $FileTmp;
}
}
}
foreach($_GET as $k=>$v){
if( $v[0]==chr(92) ){
$v = str_replace(substr($v,0,2), substr($v,1,1), $v);
}
if( ($v[0]=='"' || $v[0]=="'") && $v[0]==substr($v,-1) ){
$v = substr($v,1,-1);
}
if( $_SESSION["HackingProtection"] || !$_SESSION["_User"] ){
if( $k=="_FILTER" ){
$n = substr_count($v, "'");
if( $n>0 && $n%2!=0 ){
$v = str_replace("'", '&#39;', $v);
}
$n = substr_count($v, '"');
if( $n>0 && $n%2!=0 ){
$v = str_replace('"', '&#34;', $v);
}
}else if( $k[0]=="_" ){
$v = eEntityEncode($v);
}
}
$_GET[$k] = $v;
${$k} = $v;
$GLOBALS[$k] = $v;
if( $k=='_SEEK' ) $_SEEK = true;
if( $k=='_CALL' ) $_CALL = true;
}
$_LOGFULLTYPE = $_SESSION["_LOGFULLTYPE"];
if( $_LOGFULLTYPE>0 ){
$_LOGFULLSTATUS = true;
$_LOGREQUEST = array("object"=>$_Object, "mode"=>$_Mode, "script"=>$_DF, "get"=>$_GET, "post"=>$_POST);
$_LOGANSWER = array();
}
if( isset($_GET['_SEEK']) ) $_SEEK = true;
if( isset($_GET['_CALL']) ) $_CALL = true;
if( !isset($_GET['_PSOURCE']) ) $_GET['_PSOURCE'] = "WWORK";
if( !isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ) $_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'es';
$argv[0] = $_SERVER['QUERY_STRING'];
$Dir_ = dirname(__FILE__).'/';
if( strtoupper(substr(PHP_OS,0,3))=='WIN' ) $Dir_ = str_replace('\\','/',$Dir_);
$_gsTron = false;
if( isset($_TRON_) && $_TRON_==1 ){
$argv[0] = '';
$_gsTron = true;
$_SERVER['QUERY_STRING'] = str_replace('_TRON_=1', '', $_SERVER['QUERY_STRING']);
if( substr($_SERVER['QUERY_STRING'],-1)=='&' ) $_SERVER['QUERY_STRING'] = substr($_SERVER['QUERY_STRING'], 0, -1);
}
$_gsID = getmypid();
if( $_SERVER["QUERY_STRING"]=='UPLOAD' ){
include($Dir_.'upload.gs');
eEnd();
}
$_Estadistica = false;
$_AlmacenIMG = 'M';
$_AlmacenJS  = 'M';
$_AlmacenCSS = 'M';
$_WidthField = array();
$_IntranetPrefix = '';
$_pxH_ = '';
$_pxW_ = '';
$_Trace = array();
$_CheckBox = array();
$_CheckBox['H']['ON'] = '<img src=g/tf_1.gif>';
$_CheckBox['H']['OFF'] = '';
$_CheckBox['P']['ON']  = 'S';
$_CheckBox['P']['OFF'] = '';
$_CheckBox['X']['ON']  = 'S';
$_CheckBox['X']['OFF'] = '';
$_IconsSubmit = array(
'I'=>array('','g/op_insert.gif'),
'D'=>array('','g/op_delete.gif'),
'V'=>array('','g/op_view.gif'),
'U'=>array('','g/op_update.gif'),
'Q'=>array('','g/op_seek.gif'),
'C'=>array('','g/op_close.gif')
);
$_Include = '';
$_TmpInclude = '';
$_TmpPhpFile = 0;
$php_errormsg = '';
$_SqlInit = array();
$_DEBUG = 0;
$_TRACELABEL = '';
$_CheckBoxSave = array('S','','<>S');
$_EOD = "";
$_STOP = isset($_GET['_STOP']);
$_NOBUTTON = isset($_GET['_NOBUTTON']);
$__Lng = array('');
$_Lng = array();
$_LanguageAdd = false;
$_LanguageTron = '';
if( isset($__) ) unset($__);
if( substr($_SERVER['QUERY_STRING'],0,2)=='P:' ) session_cache_limiter('none');
$_RastrearSESS = false;
if( !isset($_SESSION['_User']) || $_SESSION['_User']=="" ){
$_COOKIE["PHPSESSID"] = trim($_COOKIE["PHPSESSID"]);
if( $_COOKIE["PHPSESSID"]<>"" ){
$file = "../_tmp/sess/sess_".$_COOKIE["PHPSESSID"];
if( file_exists($file) && filesize($file)>1024 ){
$_SESSION = unserialize(file_get_contents($file));
if( !isset($_SESSION['_User']) || $_SESSION['_User']<1 || $_SESSION['_User']=="" ){
}
}
}
}
if( $_GET['_DEBUG']==4 ) eLogDebugIni('[HTML Ini]');
if( $_gsTron ){
$_SESSION['_gsTron'] = $_gsTron;
eTron('-> Query:['.$_SERVER['QUERY_STRING'].']');
}
$_eDesTitle = ((substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2)=='es')?'Tecnología eDes':'eDes Technology');
if( !function_exists("_utf8Encode") ){
function _utf8Encode(&$a=null, &$b=null, &$c=null, &$d=null, &$e=null, &$f=null, &$g=null, &$h=null, &$i=null){
if($a!=null) $a = utf8_encode($a);
if($b!=null) $b = utf8_encode($b);
if($c!=null) $c = utf8_encode($c);
if($d!=null) $d = utf8_encode($d);
if($e!=null) $e = utf8_encode($e);
if($f!=null) $f = utf8_encode($f);
if($g!=null) $g = utf8_encode($g);
if($h!=null) $h = utf8_encode($h);
if($i!=null) $i = utf8_encode($i);
}
}
if( $_SERVER['QUERY_STRING']!='' && $_SERVER['QUERY_STRING'][0]==chr(126) ){
if( substr($_SERVER['QUERY_STRING'],1,1)=='E' ) include($Dir_.'emisor.gs');
if( substr($_SERVER['QUERY_STRING'],1,1)=='R' ) include($Dir_.'receptor.gs');
}
if( preg_match('/^(gsmain|gscreate)$/', $_SERVER['QUERY_STRING']) ) include(__DIR__.'/m/'.$_SERVER['QUERY_STRING'].'.inc');
if( substr($_SERVER['QUERY_STRING'],0,2)!='R:' ){
$CheckDB = true;
ob_start();
ob_implicit_flush(0);
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-Type: text/html; charset=".(isset($_SESSION["_Charset"])? $_SESSION["_Charset"]:"ISO-8859-1"));
if( $_SERVER['QUERY_STRING']!='FmR:/_doc_/install.ini' ){
$tmpFile = '../_datos/config/sql.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval(_LoadSqlIni($tmpFile));
_ShowError($php_errormsg, $tmpFile);
}else{
}
}else{
$CheckDB = false;
}
$__Enter = "\n";
$_DimDebug = array();
$_SAVETRACE = false;
$_LimitOn = false;
$_TReg = 0;
$_Records = &$_TReg;
$_Result = '';
$_HndDB = false;
$_HndDBSystem = false;
$_Conexion = &$_HndDB;
$_IdInsert = array();
$_IdRegistro = array();
$_InsertId = &$_IdRegistro;
$_Fila = array();
$_vF = array();
if( $_SERVER['REQUEST_METHOD']=="POST" ) $_vF = $_POST;
$_ObjetoIni = '';
$_SQL_ = '';
$_MacroField = array();
$_TypeField = array();
$_ePermission = array();
$__eLINE__ = 0;
$__iSCRIPT__ = '';
$__iniSCRIPT__ = '';
$__EVAL__ = '';
$__DIR__ = eGetCWD();
$_ContextReadOnly = "";
$_ContextFieldsMD5 = array();
$_ContextFieldsADD = array();
if( isset($_POST['pp']) ){
unset($_SESSION['_User']);
$_SERVER['QUERY_STRING'] = str_replace('~','&',$_POST['pp']);
$_SERVER['QUERY_STRING'] = str_replace('__SD__=','',$_SERVER['QUERY_STRING']);
}
$_PathCSS = $_SESSION['_PathCSS'];
if( $_PathCSS=='' ){
$_PathCSS = 'css';
$_SESSION['_PathCSS'] = $_PathCSS;
}
$_PathIMG = $_SESSION['_PathIMG'];
if( $_PathIMG=='' ){
$_PathIMG = 'g';
$_SESSION['_PathIMG'] = $_PathIMG;
}
if( !isset($_SESSION['_eDes_']) ) $_SESSION['_eDes_'] = 0;
$_SESSION['_eDes_']++;
if( !isset($_SESSION['_User']) ){
include(__DIR__.'/m/login.inc');
}else{
if( $_SERVER["QUERY_STRING"]=="" && isset($_SESSION["_User"]) ){
if( isset($_COOKIE["PHPSESSID"]) ){
$file = "../_tmp/sess/sess_".$_COOKIE["PHPSESSID"];
if( file_exists($file) ) @unlink($file);
}
eJS("location.href = '{$_SESSION['_DIRWEB']}';");
$_SESSION = null;
session_unset();
session_destroy();
session_write_close();
exit;
}
$_User = $_SESSION['_User'];
$_Node = $_SESSION['_Node'];
$_Connection_ = $_SESSION['_Connection_'];
$_HndWeb = $_SESSION['_HndWeb'];
$_Tree = $_SESSION['_Tree'];
}
if( $_SESSION['_D_']!='' && session_id()!=$_SESSION['_sesion_'] ){
if( $_gsTron ) eTron('>> 3 <<');
die('Error:2');
}
define('_LABEL'		,  0);
define('_FIELD'		,  1);
define('_EDITION'	,  2);
define('_CONTROL'	,  3);
define('_SIZE'		,  4);
define('_WIDTH'		,  5);
define('_MODE'		,  6);
define('_DEFAULT'	,  7);
define('_CONDITION'	,  8);
define('_MESSAGE'	,  9);
define('_TAB'		, 10);
define('_STATUS'	, 11);
define('_OFIELD'	, 12);
define('_ALIAS'		, 13);
define('_SQL'		, 14);
define('_VALUE'		, 15);
define('_OOFIELD'	, 17);
define('_CONSTANTE'	, 18);
define('_PLUGIN'	, 19);
$_User = $_SESSION['_User'];
$_Node = $_SESSION['_Node'];
$_Connection_ = $_SESSION['_Connection_'];
$_Tree = $_SESSION['_Tree'];
$_LANGUAGE_ = $_SESSION['_LANGUAGE_'];
$_CURRENT_PATH = eGetCWD();
$_RegisterShutdown = false;
$_PKSeek = "";
$_SessionMD5 = md5(serialize($_SESSION));
if( isset($ChartXML) ) include(__DIR__.'/m/chart_swf.inc');
if( $_gsTron ) eTron("[ {$Objeto} ][ {$_Accion} ][ {$NomScript} ][ {$_SERVER['QUERY_STRING']} ]");
if( $Objeto!='R' && $Objeto[0]=='R' && substr($Objeto,1,1)!=':' ) include(__DIR__.'/m/remotesrv.inc');
if( strtoupper($Objeto)=='PLG' ){
$_SERVER['QUERY_STRING'] = substr( $_SERVER['QUERY_STRING'], strpos($_SERVER['QUERY_STRING'],':')+1 );
if( substr_count($NomScript,'&') > 0 ) $NomScript = substr( $NomScript, 0, strpos($NomScript,'&') );
if( $_gsTron ) eTron('{19}'.$Dir_.'plg/'.$NomScript);
include($Dir_.'plg/'.$NomScript);
eEnd();
}else if( strtoupper($Objeto)=='LNG' ){
echo 'var _lng = {'.eLngLoad(eScript($NomScript),'',3).'}';
eEnd();
}else if( strtoupper($Objeto)=='IMG' ){
include($Dir_.'ver_img.gs');
exit;
}else if( substr($Objeto,0,8)=='Desktop=' ){
$__='{#}eDes{#}';
include($Dir_.'login_tab.gs');
eEnd();
}else if( $Objeto=='JSON' ){
ob_end_clean();
ob_implicit_flush(1);
header('Content-type: application/json; charset=utf-8');
list($NomScript) = explode('&',$NomScript);
readfile( eScript($NomScript).'.json' );
exit;
}else if( $Objeto=='cluster222' ){
$file = "../_tmp/zip/prueba.pdf";
$fo = fopen($file, 'wb');
fwrite($fo, $_POST["content"]);
fclose($fo);
clearstatcache();
echo "ok";
eEnd();
}else if( $Objeto=='cluster' ){
$oFile = eScript($_POST["file"]);
if( $_POST["position"]==1 ){
if( substr($_POST["content"], 0, 22)=="data:image/png;base64," ){
$_POST["content"] = substr($_POST["content"], 22);
}
@unlink($oFile);
@unlink($oFile.'.tmp');
}
$fo = fopen($oFile.'.tmp', 'ab');
fwrite($fo, base64_decode($_POST["content"]));
fclose($fo);
if( $_POST["position"]==$_POST["total"] ){
clearstatcache();
@rename($oFile.'.tmp', $oFile);
}
echo "ok";
eEnd();
}
if( $_GET["_SPIDER_"]=="E" ) include(__DIR__.'/m/spider_e.inc');
else if( $_SESSION["_SPIDER_"]["opcion"]=="E" ) include(__DIR__.'/m/spider_op_e.inc');
$_CallLabel = "";
if( isset($_GET["_ACCESS"]) ){
list($_ENV["_"]["accessNew"], $_ENV["_"]["accessOld"]) = explode("/", $_GET["_ACCESS"]."/");
if( isset($_SESSION["_sql_".$_ENV["_"]["accessOld"]]) ){
unset($_SESSION["_sql_".$_ENV["_"]["accessOld"]]);
}
}
$_DBLIMIT =	$_SESSION["List"]["DBLimit"];
$_PDFLIMIT = $_SESSION["List"]["PDFLimit"];
$_XLSLIMIT = $_SESSION["List"]["XLSLimit"];
if( $_Sql!="" && preg_match('/^(E|I|S|D|M|C|-)$/', $Objeto[0]) ){
if( isset($_GET['_PERSISTENTDB']) ) $_GET['_DB'] = $_GET['_PERSISTENTDB'];
if( isset($_GET['_DB']) && $_GET['_DB']<>"NO" ){
$_OtroDiccionario = true;
$tmp2 = eNsp($_GET['_DB']);
if( substr_count(str_replace('\\','/',$tmp2),'/')==0 ) $tmp2 = '/_datos/config/'.$tmp2;
if( substr_count($tmp2,'.')==0 ) $tmp2 .= '.ini';
include_once(eScript($tmp2));
if( $_SESSION["_SPIDER_"]["opcion"]=="E" ) $_Sql = "spider";
list($_Sql, $_SqlPDOType) = explode(':', eNsp($_Sql));
if( $_Sql=='pdo' && $_SqlPDOConnect!='' ) $_SqlPDOConnect = eval('return ("'.$_SqlPDOConnect.'");');
include_once($Dir_.$_Sql.'.inc');
}else if( $_GET['_DB']<>"NO" ){
include_once($Dir_.$_Sql.'.inc');
}
}
switch($Objeto[0]){
case 's':
$_DesdeEditList = true;
case 'S':
$_LOGFULLSTATUS = false;
eContextGet();
if( $Objeto=='ST' ) include(__DIR__.'/st.inc');
if( substr_count($_Accion,'.')==0 ) $_Accion .= '.ldf';
$NomScript = 'sub_select.gs';
if( $_CacheSrv=='S' ){
header("Expires: ".gmdate("D, d M Y {$_CachePc} T"));
header("Cache-Control: max-age");
}
break;
case 'T':
case 'F':
$_SessionCopy = true;
_TraceDevelopment();
$__='{#}eDes{#}';
$_ObjetoIni = 'F';
if( substr_count($_Accion,'.')==0 ){
$_Accion .= '.edf';
$_DF .= '.edf';
}
$NomScript = '_ficha.gs';
break;
case 'L':
$_SessionCopy = true;
_TraceDevelopment();
$__='{#}eDes{#}';
$_ObjetoIni = 'L';
if( substr_count($_Accion,'.')==0 ){
$_Accion .= '.edf';
$_DF .= '.edf';
}
$NomScript = '_lista.gs';
break;
case 'G':
$_SessionCopy = true;
_TraceDevelopment();
$__='{#}eDes{#}';
$_ObjetoIni = 'G';
if( substr_count($_Accion,'.')==0 ){
$_Accion .= '.gdf';
$_DF .= '.gdf';
}
$NomScript = '_gficha.gs';
break;
case 'P':
header("Cache-control: private, max-age=$expires, pre-check=$expires");
header('Pragma: private');
header("Expires: Mon, 18 May 1959 18:05:59 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header('Content-Type: text/plain;');
ini_set('track_errors',true);
$_JsEncodeTXT = 'JavaScript1.2';
case 'I':
case 'E':
$_SessionCopy = true;
if( $_SESSION['_D_']<>"" && substr($_SERVER["QUERY_STRING"],0,10)=='E:$t/ed.gs' ){
}else if( $_SERVER["QUERY_STRING"]<>'E:$estadistica.gs&F=1' ) eContextGet();
_TraceDevelopment();
if( $_CacheSrv=='S' && isset($_GET['_CACHE']) ){
header("Expires: ".gmdate("D, d M Y {$_CachePc} T"));
header("Cache-Control: max-age");
}
if( substr($NomScript,0,8)=='CallSrv=' ){
include($Dir_.'callsrv.gs');
eEnd();
}
if( count($_POST)==1 && $_POST["_PK_MULTISELECT_"]<>"" ){
include($Dir_.'listmulti.inc');
}
$ZZ = false;
$xQUERY = $_SERVER['QUERY_STRING'];
$oQUERY = $_SERVER['QUERY_STRING'];
if( substr_count($xQUERY, '.sdf')>0 && substr_count($xQUERY, '$t/31.gs')==0 && substr($_SERVER["QUERY_STRING"],0,10)<>'E:$t/ed.gs' ){
$SelInfoWidthTab = true;
include($Dir_.'selinfo.gs');
eEnd();
}
if( $ZZ ){
eTrace('1)'); eTrace('Q) '.$_SERVER['QUERY_STRING']);
for($i=0; $i<count($argv); $i++) eTrace('A) '.$i.': '.$argv[$i]);
eTrace('F) '.$NomScript);
}
if( substr_count($_SERVER['QUERY_STRING'], '_REMOTE_')>0 ){
list($_SERVER['QUERY_STRING']) = explode('_REMOTE_',$_SERVER['QUERY_STRING']);
if( substr($_SERVER['QUERY_STRING'],-1)=='&' ) $_SERVER['QUERY_STRING'] = substr($_SERVER['QUERY_STRING'],0,-1);
}
list(,$_SERVER['QUERY_STRING']) = explode(':',$_SERVER['QUERY_STRING']);
if( substr($_SERVER['QUERY_STRING'],0,3)=='$t/' ){
$__='{#}eDes{#}';
}
if( substr_count($_SERVER['QUERY_STRING'],'?')>0 ){
if( $ZZ ) eTrace('(1)');
list($NomScript,) = explode('?',$_SERVER['QUERY_STRING']);
$_SERVER['QUERY_STRING'] = substr( $_SERVER['QUERY_STRING'], strpos($_SERVER['QUERY_STRING'],'?')+1 );
$oNomScript = $NomScript;
$NomScript = eScript( $NomScript );
}else if( substr_count($_SERVER['QUERY_STRING'],'&')>0 ){
if( $ZZ ) eTrace('(2)');
$tmp = explode('&',$_SERVER['QUERY_STRING']);
$_SERVER['QUERY_STRING'] = substr( $_SERVER['QUERY_STRING'], strpos($_SERVER['QUERY_STRING'],'&')+1 );
array_shift($argv);
array_shift($_GET);
$oNomScript = $NomScript;
$NomScript = eScript( $tmp[0] );
}else{
if( $ZZ ) eTrace('(3)');
$_SERVER['QUERY_STRING'] = '';
for($i=0; $i<count($argv)-1; $i++) $argv[$i] = $argv[$i+1];
array_pop($argv);
$oNomScript = $NomScript;
$NomScript = eScript( $NomScript );
}
if( $ZZ ){
eTrace('2)'); eTrace('Q) '.$_SERVER['QUERY_STRING']);
for( $i=0; $i<count($argv); $i++ ) eTrace('A) '.$i.': '.$argv[$i]);
eTrace('F)  '.$NomScript);
}
if( $_SERVER['QUERY_STRING']!='' ){
$argv = explode('&',$_SERVER['QUERY_STRING']);
for($i=0; $i<count($argv); $i++) parse_str($argv[$i]);
}
if( $ZZ ){
eTrace('. 3)'); eTrace('. Q) '.$_SERVER['QUERY_STRING']);
for($i=0; $i<count($argv); $i++) eTrace('. A) '.$i.': '.$argv[$i]);
eTrace('. F) '.$NomScript);
eTrace(strlen($NomScript));
}
if( $_gsTron ) eTron('{8}'.$NomScript);
if( substr_count($NomScript,'&')>0 ){
if( $ZZ ) eTrace('(2)');
list($NomScript) = explode('&',$NomScript);
}
if( !file_exists($NomScript) ){
if( substr($NomScript,-5)=='.test' ){
echo "if(top.gsEdit) top.gsEdit(window, '{$NomScript}');";
}else{
if( $_gsTron ) eTron('{E8}'.$NomScript);
eTrace('Fichero '.(($_SESSION['_D_']=="")?"":"'{$NomScript}' ").'no encontrado.');
KeyEditFile($oNomScript);
}
eEnd();
}
if( isset($_GET["_NODDBB"]) ) $_Estadistica = false;
if( $_Estadistica && substr($xQUERY,0,3)<>'E:$' ){
if( $_SESSION["LogTrace"][$Objeto[0]] ){
$xQUERY = substr($xQUERY,2);
if( substr_count($xQUERY,'&_PSOURCE=')>0 ) $xQUERY = substr($xQUERY, 0, strpos($xQUERY, '&_PSOURCE='));
$xQUERY = str_replace("'",'"',$xQUERY);
if( !$_HndDBSystem ) qConnectSystem();
$_HndDBSystem->qQuery("insert into gs_acceso
(cd_gs_toperacion,   conexion  , objeto, modo,					edf			   , tabla,   parametros  , pagina, parametro, registros, cd_gs_user, cd_gs_node,             cdi           ) values
(     'EXE'      , '{$_Connection_}',   'E' ,  '' , '".substr($xQUERY,0,250)."',   '' , '{$NomScript}',   ''  ,    ''    ,     1    , '{$_User}', '{$_Node}', '".date('Y-m-d H:i:s')."' )"
);
$_HndDBSystem->qFree();
}
if( isset($_SESSION["LogGsAccessFile"]) && $_SESSION["LogGsAccessFile"]!='' ) error_log( date('Y-m-d H:i:s')."|{$_User}|{$_Node}|{$_Connection_}|{$oQUERY}\n", 3, $_SESSION["LogGsAccessFile"]);
}
if( $Objeto[0]!='P' ) eInit();
if(!$_RegisterShutdown){
register_shutdown_function('_ExitPHP');
$_RegisterShutdown = true;
}
$_Include = $NomScript;
$_SourceScript = $NomScript;
include($NomScript);
if( $_DEBUG!=7 && strtoupper($_DEBUG)!='NOZIP' ) eEnd();
eEnd();
case 'Y':
include($Dir_.'selinfo.gs');
eEnd();
case 'M':
include($Dir_.'relation.inc');
eEnd();
case 'C':
eContextGet();
include( $Dir_.'chart_multiple.inc' );
case 'U':
_TraceDevelopment();
$__='{#}eDes{#}';
$NomScript = 'login_ser.gs';
break;
default:
include($Dir_."edesfree.php");
eEnd();
}
$_Accion = substr($_Accion, 1);
if( $_gsTron ) eTron('{19}'.$Dir_.$NomScript);
include($Dir_.$NomScript);
eEnd();
function eInclude(){
global $Dir_;
error_reporting(_ERROR_REPORTING);
for($i=0; $i<func_num_args(); $i++){
$File = strtolower(func_get_arg($i));
if( $_SERVER['HTTP_HOST']=="localhost" && file_exists($Dir_."{$File}.enc") ){
if( !function_exists("_zipSource") ) include_once($Dir_."itm/zipsource.php");
$txt = _zipSource($Dir_."{$File}.enc");
$txt = gzcompress($txt, 6);
file_put_contents($Dir_."{$File}.enz", substr($txt,18).substr($txt,0,18));
}
if( file_exists($Dir_."{$File}.enz") ){
$txt = file_get_contents($Dir_."{$File}.enz");
eval(gzuncompress(substr($txt,-18).substr($txt,0,-18)));
continue;
}
if( !strstr($File,'.') || (substr($File,-6)=='.class' && substr_count($File,'.')==1) ){
$File .= '.inc';
include_once($Dir_.$File);
}else{
include_once(eScript($File));
}
}
}
function gsInclude(){
global $Dir_;
for($i=0; $i<func_num_args(); $i++){
$File = strtolower(func_get_arg($i));
if( !strstr($File,'.') ) $File .= '.inc';
include_once($Dir_.$File);
}
}
function eRun(){
$Para1 = func_get_arg(0);
list($File, $Func) = explode('.', trim($Para1));
if( $Func=='' ) $Func = $File;
include_once($GLOBALS["Dir_"].'itm/'.strtolower($File).'.php');
$DimArg = array(); for($i=1; $i<func_num_args(); $i++) $DimArg[] = func_get_arg($i);
call_user_func_array(str_replace('.','',$Para1), $DimArg);
}
function eExecute($url, $post=array(), $get=array()){
eInclude('itm/execute');
return _eExecute($url, $post, $get);
}
function eQuote($Dim){
if( is_Array($Dim) ){
foreach($Dim as $k=>$v){
if( is_string($v) ) $Dim[$k] = addslashes(trim($v));
}
return $Dim;
}else{
return addslashes(trim($Dim));
}
}
function qSetup(){
return _LoadSqlIni('../_datos/config/sql.ini');
}
function qOpen($sql="sql", $class=false){
global $_HndDB, $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlInit, $_SqlTransaction;
eval(_LoadSqlIni("../_datos/config/{$sql}.ini"));
if( $class ){
$pnt = qConnectSystem(true);
$pnt->qConnect($sql);
return $pnt;
}else{
$sufi = ($class)? '.class':'';
include_once(__DIR__."/{$_Sql}{$sufi}.inc");
}
}
function _LoadSqlIni($_Diccionario, $TipoDB=''){
global $Dir_, $_gsTron;
if( $_Diccionario=='_') return;
$txt = trim(@file_get_contents( $_Diccionario ));
if( substr($txt,0,2)!='<'.'?' ){
return gzuncompress($txt);
}else{
return substr($txt, ((strtoupper(substr($txt,0,5))=='<'.'?PHP') ? 5 : 2), -2);
}
}
function KeyEditFile($fch, $verIFrame=true){
include(__DIR__.'/m/keyeditfile.inc');
}
function _ShowCallSrv(){
eJS('if( window.frameElement.name=="TLF" ) top.S(window.frameElement).block();');
}
function eStripTags($txt, $print=false){
$txt = str_replace(
array("<="	  ,	"< "	, " >="	   , "<>"	     , "< "    ),
array("&#60;=", "&#60; ", " &#62;=", "&#60;&#62;", "&#60; "),
$txt
);
$txt = strip_tags($txt);
$txt = str_replace(
array("&#60;=", "&#60; ", " &#62;=", "&#60;&#62;", "&#60; "),
array("<="	  ,	"< "	, " >="	   , "<>"	     , "< "    ),
$txt
);
if( $print ){
$txt = str_replace(
array('&#92;', '&#43;', '&#39;', '&#60;','&lt;', '&#62;', '&gt;'),
array('\\'   , '+'    , "'"    , "<"    , "<"  , ">"    , ">"   ),
$txt
);
}
return $txt;
}
function OpenDF($File, $Check=1){
global $_CryptDF, $_Script_;
$_Script_ = $File;
if( $_CryptDF ){
return gzfile($File);
}else{
if( $Check ){
if( file_exists($File)!=1 ){
echo "No existe el fichero".(($_SESSION['_D_']<>'') ? " [{$File}]":"...");
if( substr_count($File,'/edesweb/')==1 ){
list(,$fch) = explode('/edesweb/',$File);
$fch = '$'.$fch;
}else{
list(,$fch) = explode('/d/',$File);
}
KeyEditFile($fch);
exit;
}
if( is_readable($File)!=1 ) die('5.No se puede leer'.(($GLOBALS['_Tree']==1) ? " [$File]":''));
}
if( substr($File,-4)=='.zdf' ){
$txt = file_get_contents($File);
if( substr($txt,0,5)=='eDes ' ){
return explode("\n", gzuncompress(substr($txt,5)));
}else{
return explode("\n", $txt);
}
}else{
if( isset($_SESSION["_SPIDER_"]) ){
include_once($Dir_."itm/spider.php");
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ) __SpiderScript($File);
}
return file($File);
}
}
}
function ePF(){
include_once(__DIR__.'/epf.php');
call_user_func_array("_PF", func_get_args());
}
function ePPF(){
include_once(__DIR__.'/epf.php');
call_user_func_array('_PPF', func_get_args());
}
function eHide($field, $nivel, $ocultar=true, $window=''){
$ocultar = ($ocultar)? 'true':'false';
eJS("{$window}eHide('{$field}', '{$nivel}', {$ocultar});");
}
function ePHide($field, $nivel, $ocultar=true){ eHide($field, $nivel, $ocultar, "window.frameElement.WOPENER."); }
function eShow($field, $nivel, $ocultar=true, $window=''){
$ocultar = ($ocultar)? 'true':'false';
eJS("{$window}eShow('{$field}', '{$nivel}', {$ocultar});");
}
function ePShow($field, $nivel, $ocultar=true){ eShow($field, $nivel, $ocultar, "window.frameElement.WOPENER."); }
function eEF($field, $on, $css='', $imgOn='', $window=''){
if( gettype($on)=='boolean' ) $on = ($on)? 'true':'false';
if( $imgOn<>'' ){
if( gettype($imgOn)=='boolean' ) $imgOn = ",".(($imgOn)? 'true':'false');
}
eJS("{$window}eEF('{$field}', {$on}, '{$css}' {$imgOn});");
}
function ePEF($field, $on, $css='', $imgOn='', $window){ eEF($field, $on, $css, $imgOn, "window.frameElement.WOPENER."); }
function eJS($txt){
echo "<script type='text/javascript'>{$txt}</script>";
}
function eExeScript($txt){
eJSAnswer($txt);
}
function eJSAnswer($txt){
eInit();
echo '<!DOCTYPE HTML><HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></HEAD><BODY><SCRIPT type="text/javascript">';
echo "var win = window.frameElement.WOPENER; if(win.eHideBusy) win.eHideBusy();";
echo $txt;
echo '</SCRIPT></BODY></HTML>';
eEnd();
}
function eHTML($script='', $op='', $title='', $ret=false){
global $_eDesTitle, $__Enter;
if( $_SESSION['_D_']=='' || ($_SESSION['_D_']!='~' && $script!='' && $script[0]=='$') ) $script = '';
if($ret) $__Enter = '';
$charset = $_SESSION['_Charset'];
$txt = '<!DOCTYPE HTML><HTML><HEAD>'.
"<META http-equiv='Content-Type' content='text/html; charset={$charset}'>".$__Enter.
"<META NAME=eDes gsScript='{$script}' gsOp='{$op}'>".$__Enter.
"<META http-equiv='imagetoolbar' CONTENT='no'>".$__Enter.
"<META NAME='Generator' CONTENT='{$_eDesTitle}'>".$__Enter.
"<META NAME='Copyright' CONTENT='".$_SESSION["CopyRight"]."'>".$__Enter.
"<TITLE>{$title}</TITLE>".$__Enter;
if($ret){
return $txt;
}else{
echo $txt;
}
}
function eSubListInsert($subList, $dim, $padre){
if( $padre<>"" && substr($padre,-1)<>"." ) $padre.=".";
echo $padre."eSubListInsert('{$subList}', Array(";
for($n=0; $n<count($dim); $n++){
if( $n>0 ) echo ",";
echo "'".AddSlashes($dim[$n])."'";
}
echo "));";
}
function eMid($txt, $ci, $cf, $apostro=true){
$i = strpos($txt,$ci); if( $i===false ) return NULL;
if( is_string($cf) ){
$f = strpos($txt,$cf,$i+1);
}else{
$f = strpos($txt,$cf,$i);
if( $f===false ) return NULL;
}
$i += strlen($ci);
$f--;
$txt = substr($txt, $i, $f-$i+1);
if( !$apostro && ($txt[0]=='"' || $txt[0]=="'")) $txt = substr($txt,1,-1);
return $txt;
}
function eLeft($txt, $ci){
if( gettype($ci)=="string" ){
$i = strpos($txt, $ci); if( $i===false ) return NULL;
$i++;
}else $i = $ci;
return substr($txt, 0, $i);
}
function eRight($txt, $ci){
if( gettype($ci)=="string" ){
$i = strpos($txt, $ci); if( $i===false ) return NULL;
$i++;
}else $i = $ci;
return substr($txt, $i);
}
function qConnectSystem($GetPuntero=false){
global $_HndDBSystem, $_Sql;
if( !isset($_SESSION['_iSql']) ) $_SESSION['_iSql'] = $_Sql;
eInclude($_SESSION['_iSql'].'.class');
switch( $_SESSION['_iSql'] ){
case 'mysql':
if( $GetPuntero ) return new eMySql();
$_HndDBSystem = new eMySql();
break;
case 'mysqli':
if( $GetPuntero ) return new eMySqli();
$_HndDBSystem = new eMySqli();
break;
case 'informix':
if( $GetPuntero ) return new eInformix();
$_HndDBSystem = new eInformix();
break;
case 'oracle':
if( $GetPuntero ) return new eOracle();
$_HndDBSystem = new eOracle();
break;
case 'pdo':
if( $GetPuntero ) return new ePdo();
$_HndDBSystem = new ePdo();
break;
}
$_HndDBSystem->qConnect('sql');
}
function Estadistica($Operacion, $TReg, $xParametros='', $xTabla='', $xSubModo=''){
global $_REMOTE_, $_L_, $_HndDBSystem;
global $_Connection_, $_Node, $_User, $_Estadistica, $_Trace, $_SAVETRACE;
if( empty($_Connection_) ) $_Connection_ = 0;
$Objeto = $Modo = $EDF = $Parametros = '';
$tmp = substr($_SERVER['QUERY_STRING'], 0, 4);
if( substr_count($tmp, ':')>0 ){
$Objeto = $tmp[0];
$Modo   = substr($tmp,1,strpos($tmp,':')-1);
if( $xSubModo!='' ) $Modo = $xSubModo;
$i = strpos($_SERVER['QUERY_STRING'],':')+1;
if( substr_count( $_SERVER['QUERY_STRING'], '?' ) > 0 ){
$p = strpos( $_SERVER['QUERY_STRING'], '?' );
$EDF = substr( $_SERVER['QUERY_STRING'], $i, $p-$i );
$Parametros = substr( $_SERVER['QUERY_STRING'], $p+1 );
}else if( substr_count( $_SERVER['QUERY_STRING'], '&' ) > 0 ){
$p = strpos( $_SERVER['QUERY_STRING'], '&' );
$EDF = substr( $_SERVER['QUERY_STRING'], $i, $p-$i );
$Parametros = substr( $_SERVER['QUERY_STRING'], $p+1 );
}else{
$EDF = substr( $_SERVER['QUERY_STRING'], $i );
}
if( $Modo=='' && substr($tmp,0,2)=='D:' ){
$Parametros = str_replace( 'WHO=1', '' , $Parametros );
$Parametros = str_replace( 'FILE=', '' , $Parametros );
$Parametros = trim($Parametros);
if( $Parametros[0]=='&' ) $Parametros = substr( $Parametros, 1 );
}
$Parametros = urldecode($Parametros);
$Parametros = str_replace( "'", '"' , $Parametros );
$Parametros = str_replace( chr(92), '' , $Parametros );
$Parametros = trim(substr( $Parametros,0, 250 ));
if( $xParametros!='' ) $Parametros = $xParametros;
}
if( $_L_!='' ){
$tmp = $_SERVER['QUERY_STRING'];
if( substr_count($tmp,'?')>0 ) list($tmp) = explode('?',$tmp);
if( substr_count($tmp,'&')>0 ) list($tmp) = explode('&',$tmp);
gsLogear('FW', 'u', $tmp);
}
if( !$_Estadistica && !$_SAVETRACE ) return;
$sObjeto = substr($_SERVER['QUERY_STRING'],0,1);
$sOp = substr($_SERVER['QUERY_STRING'],1);
$sOp = substr($sOp,0,strpos($sOp,':'));
if( $xSubModo!='' ) $sOp = $xSubModo;
if( !$_SAVETRACE && !$_SESSION["LogTrace"][$sObjeto.$sOp] ) return;
if( $Parametros=='' ){
$eQuery = $_SERVER['QUERY_STRING'];
}else{
$eQuery = $Parametros;
}
$eQuery = stripslashes($eQuery);
$eQuery = urldecode($eQuery);
$eQuery = str_replace('=', '#', $eQuery);
$eQuery = str_replace("'", '' , $eQuery);
$eQuery = str_replace(",", '.', $eQuery);
$eQuery = str_replace(chr(92), '/' , $eQuery);
$eQuery = trim(substr($eQuery, 0, 250));
$Parametros = substr(str_replace("'",'"',$Parametros),0,255);
$ePagina = '';
$EDF = str_replace("'",'"',$EDF);
$ePagina = str_replace("'",'"',$ePagina);
if( $_SESSION["LogGsAccess"]=='' ){
if( !$_HndDBSystem ) qConnectSystem();
$_HndDBSystem->qQuery( "insert into gs_acceso
( cd_gs_toperacion,      conexion    ,    objeto  ,   modo  ,			edf			 ,     tabla  ,    parametros  ,    pagina  ,  parametro , registros, cd_gs_user, cd_gs_node,             cdi           ) values
( '{$Operacion}'  , '{$_Connection_}', '{$Objeto}','{$Modo}','".substr($EDF,0,250)."', '{$xTabla}', '{$Parametros}','{$ePagina}', '{$eQuery}',  {$TReg} , '{$_User}', '{$_Node}', '".date('Y-m-d H:i:s')."' )"
);
$_HndDBSystem->qFree();
}else{
error_log(date('Y-m-d H:i:s')."|{$_User}|{$_Node}|{$_Connection_}|{$_SERVER['QUERY_STRING']}\n", 3, $_SESSION["LogGsAccess"]);
}
}
function eSqlType($tipo){
global $_Sql, $_SqlPDOType;
$tipo = implode("|", explode(",",eNsp($tipo)));
return(preg_match("/^({$tipo})$/", $_Sql) || preg_match("/^({$tipo})$/", $_SqlPDOType) || preg_match("/^({$tipo})$/", $_Sql.".".$_SqlPDOType));
}
function eSqlConcat(){
global $_Sql, $_SqlPDOType;
$t = func_num_args();
$dim = func_get_args();
if( eSqlType('mysql,mysqli') ){
$txt = "concat(";
for($i=0; $i<$t; $i++){
$x = trim($dim[$i]);
if( $i>0 ) $txt .= ",";
if( $x=="" || !preg_match('/^[A-Za-z]$/', $x[0]) ){
$txt .= "'".$dim[$i]."'";
}else{
$txt .= $dim[$i];
}
}
$txt .= ")";
}else{
$txt = "";
for($i=0; $i<$t; $i++){
$x = trim($dim[$i]);
if( $i>0 ) $txt .= "||";
if( $x=="" || !preg_match('/^[A-Za-z]$/', $x[0]) ){
$txt .= "'".$dim[$i]."'";
}else{
$txt .= $dim[$i];
}
}
}
return $txt;
}
function TieneGZip(){
if( !headers_sent() ){
if( strpos($_SERVER['HTTP_ACCEPT_ENCODING'],'x-gzip')!==false) return "x-gzip";
if( strpos($_SERVER['HTTP_ACCEPT_ENCODING'],'gzip')!==false) return "gzip";
}
return 0;
}
function EnviaGZip($level=1, $debug=false){
global $_LogUsuario, $_User, $_D_, $_DEBUG, $php_errormsg, $_CompressedPages;
if( !isset($_CompressedPages) ) $_CompressedPages = true;
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:11");
if( $_CompressedPages && !$debug ){
$ENCODING = TieneGZip();
if( $ENCODING ) $Contents = ob_get_contents();
}
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:12");
if( $php_errormsg!='' ) exit;
if( $_SESSION['_D_']!='' ) include( $GLOBALS['Dir_'].'t/source.inc' );
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:13");
if( $_CompressedPages && $ENCODING && !$debug ){
ob_end_clean();
header("Content-Encoding: {$ENCODING}");
print "\x1f\x8b\x08\x00\x00\x00\x00\x00";
$Size = strlen($Contents);
$Crc = crc32($Contents);
$Contents = gzcompress($Contents, $level);
$Contents = substr($Contents, 0, strlen($Contents)-4);
print $Contents;
print pack('V',$Crc);
print pack('V',$Size);
if( isset($_ENV["."]["cache"]) ){
file_put_contents($_ENV["."]["cache"], "\x1f\x8b\x08\x00\x00\x00\x00\x00".ob_get_contents().pack('V',$Crc).pack('V',$Size));
}
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:14");
if( isset($_LogUsuario) && in_array($_User, $_LogUsuario) ){
file_put_contents('../_tmp/log/'.date('dHis').'.'.$_User, "\x1f\x8b\x08\x00\x00\x00\x00\x00".$Contents.pack('V',$Crc).pack('V',$Size));
}
}else{
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:15");
if( $_CachearPag ){
global $_FileCache;
file_put_contents($_FileCache, $Contents);
}
if( isset($_ENV["."]["cache"]) ){
file_put_contents($_ENV["."]["cache"], ob_get_contents());
}
if( isset($_LogUsuario) && in_array($_User, $_LogUsuario) ){
file_put_contents('../_tmp/log/'.date('dHis').'.'.$_User, ob_get_contents());
}
}
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:16");
if( $_CompressedPages ) while(ob_get_level()>0) ob_end_flush();
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:17");
if( $_DEBUG==4 ) eLogDebug("HTML End");
if( isset($_GET['_DEBUG']) && $_GET['_DEBUG']==99 ) file_put_contents('_debug_end.txt','PHP End '.date('H:i:s').substr(microtime(),1,7));
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:18");
if( isset($_SESSION['SessionMaxLife']) && $_SESSION['SessionMaxLife']<date("U") ){
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:19");
@unlink("../_tmp/sess/sess_".$_SESSION["_sesion_"]);
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:20");
$_SESSION = array();
}
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:END");
session_write_close();
exit;
}
function _gsLastInsert($indice, $pk=null){
global $_DBSERIAL, $_DBINDEX, $_vF;
if( isset($_DBSERIAL[1]) ){
$indice = $_DBSERIAL[1]."=".$_vF[$_DBSERIAL[1]];
}elseif( $_DBINDEX!="" && substr_count($_DBINDEX,",")==0 ){
$indice = $_DBINDEX."=".$_vF[$_DBINDEX];
}else{
return;
}
if( $_SESSION["List"]["LastRecords"]==0 || substr_count(" and ", $indice)>0 ) return;
$cdi = date('Y-m-d H:i:s');
$script = explode("&", $_SERVER["QUERY_STRING"]."&")[0];
$obj = $script[0];
$action = substr($script,1,1);
$return = $script[0].strtolower($action)."R";
$script = $GLOBALS["_FileDF"];
if( $obj=="G" ) $script = $GLOBALS["DFichero"][0];
list($db_field,$db_value) = explode("=",$indice);
$db_field = trim($db_field);
$db_value = trim($db_value);
if( $db_value[0]=="'" || $db_value[0]=='"' ) $db_value =  substr($db_value,1,-1);
if( $db_value=="" && $pk<>null ) $db_value = $pk;
$sSql = $GLOBALS["_SQL_"];
qQuery("insert into gs_last values ({$_SESSION['_User']}, '{$cdi}', '{$action}', '{$return}', '{$script}', '{$db_field}', '{$db_value}')", $p);
$n = 0;
qQuery("select cdi, action from gs_last where cd_gs_user={$_SESSION['_User']} and script='{$script}' order by cdi desc", $p);
while($r=qRow($p)){
if( $r[1]!="B" ){
if( ++$n>$_SESSION["List"]["LastRecords"] ) break;
$cdi = $r[0];
}
}
if( $n>$_SESSION["List"]["LastRecords"] ){
qQuery("delete from gs_last where cd_gs_user={$_SESSION['_User']} and script='{$script}' and cdi<'{$cdi}'", $p);
}
$GLOBALS["_SQL_"] = $sSql;
}
function eInit($ConEdes=false, $ConCabecera=false){
ob_end_clean(); ob_start();
_HeaderAdd();
if( $ConEdes || $ConCabecera ){
$txt = $GLOBALS["_SourceScript"];
if( $txt=="" ) $txt = $GLOBALS["_Script_"];
if( $txt<>"" ){
if( substr($txt,0,5)=="../d/" ) $txt = substr($txt,5);
}
eHTML($txt);
}
if( $ConEdes ) _FileNoCache('edes.js');
if( isset( $GLOBALS['_gsTRACE'] ) ){
global $_gsTRACE;
for($i=0; $i<count($_gsTRACE); $i++) echo '<span style="font-family:monospace; font-size:12px; color:#00009C;background:#D6DFE7;"><B>:'.htmlspecialchars($_gsTRACE[$i]).'</B></span><br>';
}
}
function eEnd($MsgError=''){
global $_DEBUG, $_Development, $_HndDB, $_HndDBSystem, $_SessionCopy, $_SqlStart, $_SqlStartSystem, $_LOGREQUEST, $_LOGANSWER, $_LOGFULLSTATUS, $_LOGFULLTYPE, $_Mode, $_D_, $_User;
$_User = $_SESSION['_User']*1;
$_D_ = $_SESSION['_D_'];
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:1");
if( $_SqlStart ){
$_SqlStart = false;
if( $_LOGFULLSTATUS && $_LOGFULLTYPE==1 ){
$_LOGFULLSTATUS = preg_match('/(A|mR|M|bR|B)/', $_Mode);
}
if( $_LOGFULLSTATUS && $_LOGFULLTYPE>0 and !preg_match('/(\$a\/d\/logfull.edf|\$t\/ed.gs)/', $_LOGREQUEST["script"]) ){
foreach($_LOGREQUEST as $k=>$v){
if( gettype($v)=="array" ){
foreach($_LOGREQUEST[$k] as $k2=>$v2){
if( gettype($v2)=="array" ){
foreach($_LOGREQUEST[$k][$k2] as $k3=>$v3){
$_LOGREQUEST[$k][$k2][$k3] = utf8_encode(eEntityEncode($v3));
}
}else{
$_LOGREQUEST[$k][$k2] = utf8_encode(eEntityEncode($v2));
}
}
}else{
$_LOGREQUEST[$k] = utf8_encode(eEntityEncode($v));
}
}
foreach($_LOGANSWER as $k=>$v){
if( gettype($v)=="array" ){
foreach($_LOGANSWER[$k] as $k2=>$v2){
if( gettype($v2)=="array" ){
foreach($_LOGANSWER[$k][$k2] as $k3=>$v3){
$_LOGANSWER[$k][$k2][$k3] = utf8_encode(eEntityEncode($v3));
}
}else{
$_LOGANSWER[$k][$k2] = utf8_encode(eEntityEncode($v2));
}
}
}else{
$_LOGANSWER[$k] = utf8_encode(eEntityEncode($v));
}
}
$_LOGREQUEST = addslashes($_LOGREQUEST);
$_LOGREQUEST = json_encode($_LOGREQUEST);
if( json_last_error()!=JSON_ERROR_NONE ){
eInit();die("Error en JSON _LOGREQUEST: ".json_last_error());
}
$_LOGANSWER = addslashes($_LOGANSWER);
$_LOGANSWER = json_encode($_LOGANSWER);
if( json_last_error()!=JSON_ERROR_NONE ){
eInit();die("Error en JSON _LOGANSWER: ".json_last_error());
}
qQuery("insert into gs_logfull (cd_gs_user, request, answer) values ({$_User}, '{$_LOGREQUEST}', '{$_LOGANSWER}')");
}
qEnd();
}
if( $_SqlStartSystem ){
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:2");
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:3");
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:4");
}
if( $MsgError!='' ){
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:5");
eInit();
eError($MsgError);
$MsgError = eEntityEncode($MsgError);
die("<script type='text/javascript'>top.S.error('ERROR CRÍTICO<br><br>{$MsgError}');</script>");
}
if( $_DEBUG==31 ) file_put_contents('../_tmp/log/'.$_User.'_'.date('dHis').'.htm', ob_get_contents());
if( $_D_!="" && preg_match('/edes.php\?(F|G|L):\$/', $_SERVER["REQUEST_URI"]) ){
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:6");
$txt = $GLOBALS["_SourceScript"];
if( $txt=="" ) $txt = $GLOBALS["_Script_"];
file_put_contents('../_tmp/log/'.$_User.'_'.str_replace(array('/',':'),array('_','_'),$txt), ob_get_contents());
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ){
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:7");
include_once($Dir_."itm/spider.php");
__SpiderSaveHtml($txt);
}
}
if( $_DEBUG==9 ){
global $_DimDebug;
echo "\n<div>";
for($i=0; $i<count($_DimDebug); $i++){
if( substr($_DimDebug[$i],0,3)=='[#]' ){
echo '</div><BR>'.'<div style="background:#D6DFE7;border:1px solid #00009C; text-align:left;font-size:12px"><A HREF="javascript:{}">';
eTrace($_DimDebug[$i]);
echo '</A>';
}else{
eTrace($_DimDebug[$i], 1);
}
}
echo '</div>';
echo '<SCRIPT type="text/javascript">setTimeout("document.body.scrollTop=document.body.scrollHeight;",500);</SCRIPT>';
}else if( $_DEBUG==11 ){
global $_DimDebug;
for($i=0; $i<count($_DimDebug); $i++) eTron($_DimDebug[$i]);
}
if( isset($_SESSION['_SP_']) ) echo '<SCRIPT type="text/javascript">top.eInfo(window,"~ AVISO: Ejecutando DDBB de Procesos ~",-1);</SCRIPT>';
if( $_POST["_FIELDSWITHFILES"]!='' ){
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:8");
_FileDeleteTemp();
}
if( $_SessionCopy && $_SESSION["_sesion_"]!="" ){
$sg = date("U");
if( $_SESSION['SessionReset']<$sg ){
$_SESSION['SessionReset'] = $sg+$_SESSION['SessionResetMn'];
}
if( $GLOBALS["_SessionMD5"]!=md5(serialize($_SESSION)) ){
$file = 'sess_'.$_COOKIE["PHPSESSID"];
file_put_contents("../_tmp/sess/{$file}", serialize($_SESSION));
}
}
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:9");
if( $_DEBUG==7 || $_Development ){
EnviaGZip(0,true);
}else if( $GLOBALS['_CachearPag'] ){
EnviaGZip(1,false);
}else{
EnviaGZip(9,false);
}
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:10");
}
function eOkMode($Opcion, $cModo, $_SubModo=''){
if( $cModo=='' ) return false;
if( $cModo=='l' && $cModo==substr($Opcion,-1) ) return true;
$cModo = trim(str_replace(
array(',*R,'	  ,',?R,'	   , ',*l,'		 , ',?l,'	   , ',?,'	  , ',F,'			    , ',T,'			      , ',L,'         ),
array(',cR,bR,mR,',',cR,bR,mR,', ',cl,bl,ml,', ',cl,bl,ml,', ',c,b,m,', ',c,b,m,a,cR,bR,mR,', ',c,b,m,a,cR,bR,mR,', ',l,cl,bl,ml,'),
eNsp(','.$cModo.',')
));
$cModo = substr($cModo,1,-1);
return (
$cModo==$Opcion ||
substr_count(",{$cModo},", ",{$Opcion},")>0 ||
$cModo=='*' ||
(strlen($Opcion)==2 && substr($Opcion,1,2)=='R' && substr_count(",{$cModo},", ',*R,')>0) ||
($cModo=='?' && substr_count(',c,b,m,', ",{$Opcion},")>0) ||
($_SubModo!='' && substr_count(",{$cModo},", ",{$_SubModo},")>0));
}
function _ModeHelp($tmp){
$tmp = explode(",",eNsp($tmp));
$comb = array(
"*"=>"lqt",
"a"=>"t", "?R"=>"t", "*R"=>"t", "bR"=>"t", "cR"=>"t", "mR"=>"t", "F"=>"t",
"?"=>"q", "b"=>"q", "c"=>"q", "m"=>"q",
"l"=>"l", "?l"=>"l", "*l"=>"l", "bl"=>"l", "cl"=>"l", "ml"=>"l"
);
$modo = array();
for($n=0; $n<count($tmp); $n++) $modo[$comb[$tmp[$n]]] = 1;
$txt = "";
foreach($modo as $k=>$v) $txt .= $k;
$txt = explode(",", wordwrap($txt,1,",",1));
sort($txt);
return implode($txt, "");
}
function eEntityEncode($v, $enter=true){
if( $enter ){
return str_replace(
array(  '"'  ,   "'"  ,   '<'  ,   '>'  , chr(92), chr(13), chr(10), chr(0)),
array('&#34;', '&#39;', '&#60;', '&#62;',  '&#92;', '&#13;', '&#10;',   '' ),
$v
);
}else{
return str_replace(
array(  '"'  ,   "'"  ,   '<'  ,   '>'  , chr(92) ),
array('&#34;', '&#39;', '&#60;', '&#62;',  '&#92;'),
$v
);
}
}
function eEntityDecode($v, $enter=true){
if( $enter ){
return str_replace(
array('&#34;', '&#39;', '&#60;', '&#62;',  '&#92;', chr(13), chr(10) ),
array(  '"'  ,   "'"  ,   '<'  ,   '>'  , chr(92),   '&#13;', '&#10;'),
$v
);
}else{
return str_replace(
array('&#34;', '&#39;', '&#60;', '&#62;',  '&#92;'),
array(  '"'  ,   "'"  ,   '<'  ,   '>'  , chr(92) ),
$v
);
}
}
function eMultitenancy(&$Tabla){
if( $_SESSION["ShareDictionary"]!="" ){
$Tabla = trim($Tabla);
if( substr_count($Tabla, " ")>0 ){
list(,$tmp3) = explode(" from ",$Tabla);
list($tmp3) = explode(" where ", $tmp3);
list($tmp3) = explode(" order by ", $tmp3);
$tmp4 = trim($tmp3);
if( in_array($tmp4, $_SESSION["multitenancy"]) ){
$tmp4 = $_SESSION["ShareDictionary"].$tmp4;
$Tabla = str_replace(" ".trim($tmp3)." ", " ".$tmp4." ", $Tabla);
}
}else{
if( in_array($Tabla, $_SESSION["multitenancy"]) ) $Tabla = $_SESSION["ShareDictionary"].$Tabla;
}
}
}
function eGetOpcions(){
list($url) = explode("&", $_SERVER["QUERY_STRING"]);
list($url, $ext) = explode(".", $url);
list(,$patron) = explode(":", $url);
$dim = file('../_tmp/php/'.$_SESSION['_G_'].'menu.'.$_SESSION["_User"]);
$dimOp = array();
$patron = '/(F|G|L){1}(a|b|c|m|bl|cl|ml){1,2}:'.str_replace("/", chr(92)."/",$patron).':/';
for($n=0; $n<count($dim); $n++){
list($url,  $icon) = explode("|",trim($dim[$n]));
list($txt) = explode(".", $url);
if( preg_match($patron, $txt.":") ){
$modo = substr($url,1,1);
if( !isset($dimOp[$modo]) ) $dimOp[$modo] = $icon;
}
}
return $dimOp;
}
function ePrintTron(){
$funcGetArgs = func_get_args();
include(__DIR__.'/m/eprinttron.inc');
}
function ePrintR(){
$funcGetArgs = func_get_args();
include(__DIR__.'/m/eprintr.inc');
}
function eBacktrace(){
eInit();
echo '<pre>'; debug_print_backtrace(); echo '</pre><hr><pre>'; print_r(debug_backtrace()); echo '</pre>';
call_user_func_array("ePrintR", $funcGetArgs);
}
function _Debug($tmp){
include(__DIR__.'/m/_debug.inc');
}
function eTron($para='', $caja=false, $borrar=false){
include(__DIR__.'/m/etron.inc');
}
function eTrace($para="", $Alert=false, $Caja=''){
include(__DIR__.'/m/etrace.inc');
}
function eTronSql($txt){
eLogDebug($txt);
}
function _PrintBoolean($cnd){
return($cnd?"true":"false");
}
function gsLogear($Apli, $Modo, $File){
include(__DIR__.'/m/gslogear.inc');
}
function ePlugin(){
$funcGetArgs = func_get_args();
include(__DIR__.'/m/eplugin.inc');
}
$_LeeDFEsRem = false;
function LeeDF(&$buffer, $DimOpcion, &$_Variable, &$SaltarLinea, &$_Form, &$Chr_1, &$_FIELDSET, &$_TmpFieldSet, &$_EnLinea, &$_TmpEnLinea, &$_EnColumna, &$_TmpEnColumna, &$TipoEntrada, $ElPuntoEsRem=true, &$nextLine="", $nHoja=1){
global $_LeeDFEsRem, $_User, $_Node, $_Tree, $_WebMaster, $_DEBUG, $_Development, $_EOD;
$prefijo = ($_Development) ? substr($buffer, 0, strlen($buffer)-strlen(ltrim($buffer))) : "";
$buffer = trim($buffer);
if( $nextLine!="" ){
$buffer = $nextLine." ".$buffer;
$nextLine = "";
}
if( $buffer=='' ){
$Chr_1 = "";
if( $_Development ){
$buffer = chr(13);
return true;
}
$Chr_1 = substr($TipoEntrada,0,3);
if( $_DEBUG==2 && !$_LeeDFEsRem && ($Chr_1=='_PH' || $Chr_1=='_JS' || $Chr_1=='_DB') ){
$buffer = '';
return true;
}
return false;
}
$Chr_3 = substr($buffer,0,3);
$Chr_2 = substr($Chr_3,0,2);
$Chr_1 = $Chr_2[0];
if( strpos($buffer,'/'.'/')!==false ){
if( substr_count(strtoupper($buffer), '[UPLOADFILE]')==1 ){
$p = strpos($buffer, '/'.'/');
if( $p!==false ){
if( count(explode("|", substr($buffer,0,$p)))>3 ){
$buffer = trim(substr($buffer,0,$p));
}else{
$p = strpos($buffer, '/'.'/', $p+1);
if( $p!==false && count(explode("|", substr($buffer,0,$p)))>3 ){
$buffer = trim(substr($buffer,0,$p));
}
}
}
}else{
$p = strpos($buffer, '/'.'/');
if( substr($buffer, $p-1,1)!='\\' ){
if( substr_count(chr(39).'":', substr($buffer, $p-1, 1))==0 ) $buffer = chop(substr($buffer, 0, $p));
}
}
}
if( substr($buffer,-1)=="_" && (substr($buffer,-2,1)==" " || substr($buffer,-2,1)==chr(9) || substr($buffer,-2,1)=="|") ){
$nextLine = trim(substr($buffer,0,-1));
return false;
}
if( $Chr_2=='/'.'*' && substr_count($buffer, '*'.'/')==0 ){
$_LeeDFEsRem = true;
}else if( $_LeeDFEsRem && substr_count($buffer, '*'.'/')>0 ){
$_LeeDFEsRem = false;
$buffer = trim(substr($buffer,strpos($buffer, '*'.'/')+2 ));
if( $buffer=='' ) return false;
}
if( $_LeeDFEsRem ) return false;
if( ($Chr_1=='.' && $ElPuntoEsRem) || $Chr_2=='//' ) return false;
if( $Chr_1=='¿' ){
list($tmp) = explode('?', $buffer);
$tmp = trim(substr($tmp, 1));
$buffer = trim(substr($buffer, strpos($buffer, '?')+1));
if( substr($tmp,0,2)=='#(' ){
list($tmp) = explode(')',substr($tmp,2));
$tmp = trim($tmp);
$cModo = explode(',',$tmp );
$acc = (count(array_intersect($cModo, $DimOpcion))>0 );
}else if( substr($tmp,0,3)=='#!(' ){
list( $tmp ) = explode(')',substr($tmp,3));
$tmp = trim($tmp);
$cModo = explode(',',$tmp );
$acc = !( count( array_intersect($cModo, $DimOpcion))>0 );
}else if( substr($tmp,0,2)=='#!' ){
$acc = !( $_Variable[str_replace('!','',$tmp)] );
}else if( $tmp[0]=='#' ){
if(  substr_count($tmp, ',')==0 ){
$acc = ($_Variable[$tmp]);
}else{
$tmp2 = explode(",", eNsp($tmp));
for($i=0; $i<count($tmp2); $i++){
$acc = ($_Variable[$tmp2[$i]]);
if( $acc ) break;
}
}
}else{
if( $TipoEntrada=='_PHPSTART' && $buffer[0]=='[' ){
$TipoEntrada = '-1';
return true;
}
$acc = _ExeEval($tmp, $buffer);
}
if( $buffer=="" || $buffer=="¿" ){
if( !$acc ) $SaltarLinea = true;
return false;
}else{
if( $buffer[0]=='[' ) $TipoEntrada = '';
if( !$acc ){
$Chr_1 = $buffer[0];
return false;
}
}
$Chr_3 = substr($buffer,0,3);
$Chr_2 = substr($Chr_3,0,2);
$Chr_1 = $buffer[0];
}else if( $Chr_1=='?' ){
if( $Chr_2=='?¿' ){
$SaltarLinea = !$SaltarLinea;
return false;
}else if( strlen($buffer)>2 ){
}else if( $Chr_2!='?'.'>' ){
$SaltarLinea = false;
return false;
}
}
if( $SaltarLinea ) return false;
if( $Chr_1=='#' ){
if( substr_count($buffer, '¿')>0 ){
$ConSalto = true;
}
if( $Chr_2=='#P' || $Chr_3=='#!P' ){
if( substr($buffer,0,3)=='#P(' || substr($buffer,0,4)=='#!P(' || strtoupper(substr($buffer,0,12))=='#PERMISSION(' || strtoupper(substr($buffer,0,13))=='#!PERMISSION(' ){
$i = strpos($buffer,'(')+1;
$Label = trim(substr($buffer,$i,strpos($buffer,')')-$i));
$Label_2 = '';
if( substr_count($Label,'"')+substr_count($Label,"'")>2 ){
$i = strpos($Label,$Label[0],1)+1;
$Label_1 = substr($Label,0,$i);
$i = strpos($Label,substr($Label,-1),$i);
$Label_2 = substr($Label,$i);
}
$buffer = ltrim(substr($buffer,strpos($buffer,')')+1));
if( $Label_2<>'' ){
$res = (ePermission($Label_1) || ePermission($Label_2));
}else{
$res = ePermission($Label);
}
if( substr($Chr_2,1)=='!' ) $res = !$res;
if( $buffer[0]=='¿' ) $SaltarLinea = !$res;
if( $buffer[0]=='[' ) $TipoEntrada = '';
return $res;
}
}
if( $Chr_2!='#(' && $Chr_2!='#!' && $ConSalto ){
list($tmp) = explode('¿',$buffer);
if( substr_count($tmp, ',')==0 ){
$SaltarLinea = !$_Variable[trim($tmp)];
}else{
$tmp2 = explode(",", eNsp($tmp));
for($i=0; $i<count($tmp2); $i++){
$SaltarLinea = !($_Variable[$tmp2[$i]]);
if( !$SaltarLinea ) break;
}
}
return false;
}else if( $Chr_2=='#(' || $Chr_2=='#!' ){
$i = strpos($buffer, '(')+1;
if( $i>1 ){
$cModo = trim(substr($buffer, $i, strpos($buffer,')')-$i));
if( $cModo[0]=='$' ){
$Chr_1 = '[';
$acc = _ExeEval($cModo, $buffer);
$buffer = trim(substr($buffer, strpos($buffer, (($ConSalto)?'¿':')'))+1));
if( $buffer[0]=='[' ) $TipoEntrada = '';
return $acc;
}
$buffer = trim(substr($buffer, strpos($buffer, (($ConSalto)?'¿':')') )+1));
if( $buffer[0]=='[' ) $TipoEntrada = '';
$cModo = str_replace('"',"'",$cModo);
if( strpos($cModo,"'")==0 ){
$cModo = explode(',', eNsp($cModo));
$acc = (count(array_intersect($cModo, $DimOpcion))>0);
}else{
}
if( $Chr_2!='#(' ) $acc = !$acc;
}else if( $Chr_2=='#!' ){
list($acc) = explode('¿', $buffer);
$acc = '#'.trim(substr($acc,2));
$acc = !$_Variable[$acc];
$buffer = '';
}
if( $acc ){
if( $ConSalto && $buffer=='' ) return false;
}else{
if( $ConSalto ) $SaltarLinea = true;
return false;
}
$Chr_1 = $buffer[0];
}else{
list($tmp) = explode('¿',$buffer);
$tmp = trim($tmp);
if( $tmp[0]=='#' ){
foreach($_Variable as $k=>$v){
if( $k==$tmp ){
$acc = ($_Variable[$tmp]);
if( $acc ){
$SaltarLinea = false;
return false;
}else{
$SaltarLinea = true;
return false;
}
break;
}
}
}
}
}
if( $Chr_1=='{' && $TipoEntrada=='_FIELDS' && $DimOpcion[0]!='l' ){
if( $GLOBALS['_LNGCOL']>-1 && !(strpos($buffer, '@')===false) ){
global $_LANGUAGE, $_LngPublic;
for($n=0; $n<count($_LANGUAGE); $n++) $buffer = str_replace($_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $buffer);
foreach($_LngPublic as $k=>$v) $buffer = str_replace($k, $v, $buffer);
}
if( substr($buffer,0,5)=='{FS}{' ){
list(,, $_TmpFieldSet[0]) = explode('{',$buffer);
list($_TmpFieldSet[0], $_TmpFieldSet[3]) = explode('|',$_TmpFieldSet[0]);
$_TmpFieldSet[0] = trim($_TmpFieldSet[0]);
$_TmpFieldSet[1] = true;
$_TmpFieldSet[4] = count($_Form);
return false;
}else if( substr($buffer,0,5)=='{FR}{' ){
list(,, $_TmpEnLinea[0]) = explode('{',$buffer);
$_TmpEnLinea[0] = trim($_TmpEnLinea[0]);
$_TmpEnLinea[1] = '+';
$_TmpEnLinea[3] = count($_Form);
return false;
}else if( substr($buffer,0,5)=='{FC}{' ){
list(,, $_TmpEnColumna[0]) = explode('{',$buffer);
$_TmpEnColumna[0] = trim($_TmpEnColumna[0]);
$_TmpEnColumna[1] = '+';
$_TmpEnColumna[3] = count($_Form);
return false;
}else if( strtoupper(substr($buffer,0,10))=='{COLUMNS}{' ){
global $_TmpNColumnas;
list(,,$_TmpNColumnas[0]) = explode('{',$buffer);
$_TmpNColumnas[0] = trim($_TmpNColumnas[0]);
$_TmpNColumnas[1] = '+';
$_TmpNColumnas[2] = "";
$_TmpNColumnas[3] = count($_Form);
return false;
}else if( strtoupper(substr($buffer,0,5))=='{TAB}' ){
global $_SUBTAB;
list(,$tmp) = explode('|',substr($buffer,5));
for($n=0; $n<count($tmp); $n++) $tmp[$n] = trim($tmp[$n]);
$_SUBTAB[$nHoja] = $tmp;
return true;
}else if( strtoupper(substr($buffer,0,9))=='{ISUBLIST}' ){
return true;
}else if( strtoupper(substr($buffer,0,6))=='{CARD}' ){
return true;
}
}else if( $buffer=='}' ){
global $_NewNColumnas, $_TmpNColumnas;
if( $_TmpEnLinea[1] ){
$_TmpEnLinea[2] = $_Form[count($_Form)-1][1];
if( substr_count( $_TmpEnLinea[2], '{' )==1 ) list( $_TmpEnLinea[2] ) = explode( '{', $_TmpEnLinea[2] );
if( substr_count( $_TmpEnLinea[2], ':' )==1 ) list( $_TmpEnLinea[2] ) = explode( ':', $_TmpEnLinea[2] );
$_EnLinea[$_TmpEnLinea[1]]['I'] = $_EnLinea[$_TmpEnLinea[2]][F] = true;
$_EnLinea[$_TmpEnLinea[1]]['S'] = $_TmpEnLinea[0];
for($i=count($_Form)-1; $i>$_TmpEnLinea[3]; $i--){
list( $sCampo ) = explode('{',$_Form[$i][1]);
list( $sCampo ) = explode(':',$sCampo);
if( $sCampo==$_TmpEnLinea[1] ) break;
if( ($_Form[$i][0][0]!='<' && $_Form[$i][0][0]!=',') || strtoupper(substr($_Form[$i][0],0,4))=='<BR>' ) $_Form[$i][0] = ','.$_Form[$i][0];
}
$_TmpEnLinea = array('','','');
return false;
}else if( $_TmpEnColumna[1] ){
$_TmpEnColumna[2] = $_Form[count($_Form)-1][1];
if( substr_count( $_TmpEnColumna[2], '{' )==1 ) list( $_TmpEnColumna[2] ) = explode( '{', $_TmpEnColumna[2] );
if( substr_count( $_TmpEnColumna[2], ':' )==1 ) list( $_TmpEnColumna[2] ) = explode( ':', $_TmpEnColumna[2] );
$_EnColumna[$_TmpEnColumna[1]]['I'] = $_EnColumna[$_TmpEnColumna[2]]['F'] = true;
$_EnColumna[$_TmpEnColumna[1]]['S'] = $_TmpEnColumna[0];
for( $i=count($_Form)-1; $i>$_TmpEnColumna[3]; $i-- ){
list( $sCampo ) = explode('{',$_Form[$i][1]);
list( $sCampo ) = explode(':',$sCampo);
if( $sCampo==$_TmpEnColumna[1] ) break;
if( ($_Form[$i][0][0]!='<' && $_Form[$i][0][0]!=',') || strtoupper(substr($_Form[$i][0],0,4))=='<BR>' ) $_Form[$i][0] = ','.$_Form[$i][0];
}
$_TmpEnColumna = array('','','');
return false;
}else if( $_TmpNColumnas[1] ){
$_TmpNColumnas[2] = $_Form[count($_Form)-1][1];
if( count($_Form)>$_TmpNColumnas[3] ){
list($_TmpNColumnas[2]) = explode('{', $_TmpNColumnas[2]);
list($_TmpNColumnas[2]) = explode(':', $_TmpNColumnas[2]);
$_NewNColumnas[$_TmpNColumnas[1]]['I'] = true;
$_NewNColumnas[$_TmpNColumnas[2]]['F'] = true;
$_NewNColumnas[$_TmpNColumnas[1]]['NC'] = $_TmpNColumnas[0];
}else{
}
$_TmpNColumnas = array('','','','');
return false;
}else if( $_TmpFieldSet[1] ){
$_TmpFieldSet[2] = $_Form[count($_Form)-1][1];
if( substr_count( $_TmpFieldSet[2], '{' )==1 ) list( $_TmpFieldSet[2] ) = explode( '{', $_TmpFieldSet[2] );
if( substr_count( $_TmpFieldSet[2], ':' )==1 ) list( $_TmpFieldSet[2] ) = explode( ':', $_TmpFieldSet[2] );
$_FIELDSET[$_TmpFieldSet[1]]['I'] = $_FIELDSET[$_TmpFieldSet[2]]['F'] = ($_TmpFieldSet[1]!='+');
$_FIELDSET[$_TmpFieldSet[1]]['T'] = $_TmpFieldSet[0];
$_FIELDSET[$_TmpFieldSet[1]]['S'] = $_TmpFieldSet[3];
for( $i=count($_Form)-1; $i>$_TmpFieldSet[4]; $i-- ){
list( $sCampo ) = explode('{',$_Form[$i][1]);
list( $sCampo ) = explode(':',$sCampo);
if( $sCampo==$_TmpFieldSet[1] ) break;
if( ($_Form[$i][0][0]!='<' && $_Form[$i][0][0]!=',') || strtoupper(substr($_Form[$i][0],0,4))=='<BR>' ) $_Form[$i][0] = ','.$_Form[$i][0];
}
$_TmpFieldSet = array('','','','');
return false;
}
}
if( $buffer!='' ){
if( $_DEBUG==9 || $_DEBUG==11 ){
global $_DimDebug;
$_DimDebug[] = $buffer;
}
$c = substr($TipoEntrada,0,3);
if( $GLOBALS['_LNGCOL']>-1 && !(strpos($buffer, '@')===false) ){
global $_LANGUAGE, $_LngPublic;
for($n=0; $n<count($_LANGUAGE); $n++) $buffer = str_replace($_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $buffer);
foreach($_LngPublic as $k=>$v) $buffer = str_replace($k, $v, $buffer);
}
$buffer = str_replace("location.href(", "eUrl(", $buffer);
if( strpos($buffer, '<<<')!==false ){
$_EOD = explode(" ",explode('<<<',$buffer)[1]." ")[0].";";
}
if( $_Development && $buffer[0]!="[" ){
if( $buffer<>$_EOD ){
$buffer = $prefijo.$buffer;
}else{
$_EOD = "";
}
}
return true;
}else if( $_Development ){
$buffer = chr(13);
return true;
}
return false;
}
function gsActivity($File){
global $_User, $Dir_, $_Sql;
if( substr_count($File,'/_tmp/__tron.')==1 ) return;
if( substr_count($File,'/edesweb/')==1 ){
list(,$File) = explode('/edesweb/',$File);
$File = '$'.$File;
}else if( substr_count($File,'/d/')==1 ){
list(,$File) = explode('/d/',$File);
}else{
if( substr($File,0,3)=='../' ) $File = substr($File,2);
}
if( !function_exists('sql_Query') ){
global $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOType, $_SqlInit, $_SqlPDOConnect;
$tmpFile = '../_datos/config/sql.ini';
eval(_LoadSqlIni($tmpFile));
include($Dir_.$_Sql.'.inc');
}else{
qConnect();
}
$_Include = '';
$tipo = "F";
if( substr_count($File, "/tree/")>0 || substr_count($File, "/config/")>0 ) $tipo = "C";
$Cdi = date('Y-m-d H:i:s');
$esEDes = (($File[0]=='$')? "'S'":"NULL");
sql_Query("insert into {$_SESSION['ShareDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_SESSION['_User']}, '{$Cdi}', '{$File}', {$esEDes}, '{$_SESSION['_UserEMail']}')");
}
function eGetCWD(){
return str_replace('\\','/',getcwd());
}
function eScript($File, &$Bak=NULL, &$EsEdes=NULL){
global $Dir_;
$File = str_replace('\\', '/', trim($File));
if( substr_count($File, "/etc/")>0 ){
eInit();
exit;
}
$EsEdes = false;
while( substr_count( $File, '../../' )>0 ) $File = str_replace('../../', '../', $File);
while( substr_count( $File, '/edesweb/')>0 ) $File = str_replace('/edesweb/', '/', $File);
if( substr_count('~AM',$_SESSION['_D_'])==0 ){
while( substr_count( $File, '/sql.ini' ) > 0 ) $File = str_replace('/sql.ini', '/', $File);
}
switch( $File[0] ){
case '/':
case '.':
if( substr($File,0,2)=='//' || substr($File,0,2)=='./' ){
$tmp = explode('/',$_SERVER['SCRIPT_FILENAME']);
$DirFile = '';
for( $n=1; $n<count($tmp)-2; $n++ ) $DirFile .= '/'.$tmp[$n];
$Bak .= $DirFile.'/_bak_.file/'.substr($File,2);
$DirFile .= '.file/'.substr($File,2);
$File = $DirFile;
}elseif( substr($File,0,11)=='/_doc_/edf/' ){
$tmp = explode( '/',$File);
$Bak = '../_bak_'.$File;
$File  = '..'.$File;
}else{
$Bak = '../_bak_'.$File;
$File = '..'.$File;
}
break;
case '$':
$File = $Dir_.substr($File,1);
$tmp = explode('/',$File);
$Bak  = $Dir_.'m/_bak_/'.$tmp[count($tmp)-1];
$EsEdes = true;
break;
case '^':
case '>':
$File = substr($File,1);
break;
case '?':
$File = substr($File,1);
if( substr($File,-1)!='/' ) $File .= '/';
$Dir = eScript($File);
$DirRoot = eGetCWD();
if( substr($DirRoot,-1)!='/' ) $DirRoot .= '/';
$Sumar = false;
if( substr($Dir,0,3)=='../' ){
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
while( substr_count($File, '../')>0 ) $File = str_replace('../', '', $File);
if( $File[0]=="/" ) $File = substr($File,1);
$File = "../../".substr($File,1);
break;
case '%':
while( substr_count($File, '../')>0 ) $File = str_replace('../', '', $File);
if( $File[0]=="/" ) $File = substr($File,1);
$File = "../../wp/".substr($File,1);
break;
default:
$Bak = '../_bak_/d/'.$File;
$File = '../d/'.$File;
}
$Bak = trim($Bak);
return str_replace('....', '..', trim($File));
}
function gsCambiaComa2($Valor){
if( substr_count($Valor, '{')==0 ) return $Valor;
$txt = '';
$Cambiar = false;
for($n=0; $n<strlen($Valor); $n++){
$c = substr($Valor,$n,1);
if( $c=='{' ) $Cambiar = true;
if( $c=='}' ) $Cambiar = false;
$txt .= ($Cambiar && $c==',') ? '|' : $c;
}
return $txt;
}
function eNumberFormat($val, $nDeci=0, $conMiles=true){
$miles = ($conMiles)? $_SESSION["_FormatNumber"][0]: "";
return number_format($val, $nDeci, $_SESSION["_FormatNumber"][1], $miles);
}
function isZero($val){
return (preg_replace('/[0\.\-\,\/: ]/','',$val)=="");
}
function eDataFormat($val, $tipo, $dir="u"){
if( gettype($tipo)=="integer" || is_numeric($tipo) ){
if( $dir=="u" ){
return eNumberFormat($val, $tipo);
}else{
return number_format(str_replace(array($_SESSION["_FormatNumber"][0],$_SESSION["_FormatNumber"][1]), array("","."), $val), $tipo, ".", "");
}
}
if( preg_match('/^(P4|F4|CDI)$/', $tipo) ){
if( preg_replace('/['.chr(92).implode(chr(92),str_split($_SESSION["_FormatDelimiter"])).'0 ]/','',$val)=="" ) return "";
}
switch($dir){
case "u":
return preg_replace($_SESSION["_Format{$tipo}EXPdb"], $_SESSION["_Format{$tipo}TKNuser"], preg_replace('([^0-9])', '', $val));
case "d":
return preg_replace($_SESSION["_Format{$tipo}EXP"], $_SESSION["_Format{$tipo}TKNdb"], preg_replace('([^0-9])', '', $val));
case "U":
return preg_replace($_SESSION["_Format{$tipo}EXP"], $_SESSION["_Format{$tipo}TKN"], preg_replace('([^0-9])', '', $val));
}
}
$_gsWarning = '';
function eCheckAlert(){
$_CDI_ = date('U')-100;
}
function eAlertIcon($NomIcono, $Mensaje, $Avisa=1){
global $_gsWarning;
if( !$Avisa ) $Avisa = 0;
$_gsWarning .= "{$NomIcono},{$Avisa},{$Mensaje};";
}
function eAddEvent($Id, $HoraAviso, $Momento, $Descripción, $Href, $Titulo, $Tabla){
global $_eAddEvento;
$_eAddEvento[] = array($Id, $HoraAviso, $Momento, $Descripción, $Href, $Titulo, $Tabla);
}
function CodeHELP($Script, $Modo){
if( !$GLOBALS['_HelpActive'] ) return '';
switch( $GLOBALS['_HelpType'] ){
case 1:
break;
case 2:
$Script .= '_'.$Modo[0];
break;
case 3:
$Script .= '_'.$Modo;
break;
default:
return '';
}
return 'top.gsHelp("'.$Script.'",event);';
}
$_eParseError = 0;
function eParseError($ConTron=false){
include(__DIR__.'/m/eparseerror.inc');
}
function _ShowError($xErrorMsg, $tmpFile, $LenDoc=0, $Macro='', $EditFile=''){
include(__DIR__.'/m/_showerror.inc');
}
function _Error($pk){
include(__DIR__.'/m/_error.inc');
}
function eError($Error){
include(__DIR__.'/m/eerror.inc');
}
function qErrorFile($TxtError, $sql, &$pkError=""){
include(__DIR__.'/m/qerrorfile.inc');
}
function FormStaticError(){
include(__DIR__.'/m/formstaticerror.inc');
}
function _ExitPHP(){
global $_Include, $php_errormsg, $__DIR__, $OriFichero, $_HndDB;
chdir($__DIR__);
$txt = ob_get_contents();
if( substr_count($txt, 'xdebug-error xe-')>0 ){
eInit();
$p = strpos($txt, 'xdebug-error xe-');
$p = strrpos(substr($txt,0,$p), '<table ');
$f = strpos($txt, '</table>', $p)+8;
echo substr($txt, $p, $f-$p);
echo "<script type='text/javascript'>document.body.oncontextmenu = function(){top.gsEdit(window, '{$OriFichero}');}</script>";
exit;
}
if( substr_count($txt, '<b>Parse error</b>')>0 ){
$Dim = explode("\n", $txt);
for( $n=0; $n<count($Dim); $n++ ){
if( substr_count($Dim[$n], 'Parse error')>0 ){
$php_errormsg = trim($Dim[$n]);
$php_errormsg = str_replace('<br />', '', $php_errormsg);
$php_errormsg = str_replace('<b>Parse error</b>', '<B>Parse error</B>', $php_errormsg);
$OriFichero = $_Include;
if( substr_count($_Include, 'edes/t/31.gs')>0 ) exit;
_ShowError($php_errormsg, $__DIR__.'/'.$_Include);
return;
}
}
echo "<script type='text/javascript'>alert('ERROR en script \"{$_Include}\"');</script>";
}
if( !isset($php_errormsg) || $php_errormsg=='' ) return;
if( $_Include=='' ) exit;
_ShowError($php_errormsg, $__DIR__.'/'.$_TmpInclude);
if( $_HndDB ) qEnd();
}
function _ExeEval($Exe, $Buffer, $Saltar=false){
global $__EVAL__, $_Modo, $_SubModo, $_Mode, $Opcion, $_vF, $_Sql, $_Variable;
$__EVAL__ = $Buffer;
if( !$Saltar && ($Exe[0]=='&' || $Exe[0]=='<' || $Exe[0]=='(') ) return $Exe;
foreach($_GET as $k=>$v) ${$k} = $v;
foreach($_POST as $k=>$v) ${$k} = $v;
foreach($GLOBALS as $k=>$v) if( !is_array($v) ) ${$k} = $v;
foreach($_SESSION as $k=>$v) ${$k} = $v;
$Exe = trim($Exe);
if( substr($Exe,-1)==';') $Exe = rtrim(substr($Exe,0,-1));
$Long = strlen(ob_get_contents());
if( substr($Exe,0,7)=='select ' || substr($Exe,0,7)=='qCount(' ){
if( !function_exists('qQuery') ) include_once($GLOBALS['Dir_'].$_Sql.'.inc');
if( substr($Exe,0,7)=='select ' ){
$txt = _InVar($Exe);
qQuery($txt);
$r=qRow();
return($r[0]<>0);
}else $Exe = _InVar($Exe);
}
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return ('.$Exe.');');
$txt = eval('return ('.$Exe.');');
if( substr_count(substr(ob_get_contents(),$Long), '<b>Parse error</b>')==1 ) _ShowError('*', '_eval_');
$__EVAL__ = '';
if( is_bool($txt) ) return $txt*1;
return $txt;
}
function _InVar($txt, &$Valor="", $conIcon=false){
while( substr_count($txt, '{$')>0 && substr_count($txt, '}')>0 ){
$Ini = strpos($txt,'{$');
$Fin = strpos($txt,'}');
$var = substr($txt, $Ini, $Fin-$Ini+1);
$var2 = eMid($txt,'{$','}',false);
if( substr_count($var2,'][')==1 ){
list($tmp) = explode('[',$var2);
eval('global $'.$tmp.';');
$Valor = eval(';return $'."{$var2};");
}else if( isset($GLOBALS[$var2]) ){
$Valor = trim($GLOBALS[$var2]);
if( $Valor=='' && isset($GLOBALS['_vF'][$var2]) ) $Valor = $GLOBALS['_vF'][$var2];
}else{
if( substr($var2,0,4)=='_vF[' ){
$Valor = $GLOBALS['_vF'][eMid($var2,"[","]",false)];
}else if( substr($var2,0,9)=='_SESSION[' ){
$Valor = $_SESSION[eMid($var2,"[","]",false)];
}else if( substr($var2,0,6)=='_POST[' ){
$Valor = $_POST[eMid($var2,"[","]",false)];
}else if( substr($var2,0,5)=='_GET[' ){
$Valor = $_GET[eMid($var2,"[","]",false)];
}else if( substr($var2,0,8)=='GLOBALS[' ){
$var2 = eMid($var2,"[","]",false);
if( $var2[0]=="'" || $var2[0]=='"' ) $var2 = eMid($var2,1,-1);
$Valor = $GLOBALS[$var2];
}else{
$Valor = $GLOBALS['_vF'][$var2];
}
}
$txt = str_replace($var, trim($Valor), $txt);
}
if( $txt[0]=='$' ) $txt = $GLOBALS[substr($txt,1)];
if( $conIcon ){
while( substr_count($txt, "[")>0 && substr_count($txt, "]")>0 ){
$desde = strpos($txt,"[");
$hasta = strpos($txt,"]");
$iz = substr($txt,0,$desde);
$dch = substr($txt,$hasta+1);
$Macro = trim(substr($txt, $desde+1, $hasta-$desde-1));
eExplodeOne($Macro, ",", $icono, $dentro);
if( $dentro!="" ) $dentro = ' title="'.str_replace(array('"',"'"), array("&#34;","&#39;"), $dentro).'"';
$txt = eIcon(trim($icono), $dentro);
$txt = $iz.$txt.$dch;
}
}
return $txt;
}
function _InFunction($buffer){
$Inicio = '<'.'?';
$Final = '?'.'>';
if( substr_count($buffer, $Inicio)>0 && substr_count($buffer, $Final)>0 ){
for($n=0; $n<2; $n++){
$Inicio = ($n==0) ? '<'.'?=' : '<'.'?';
while( substr_count($buffer, $Inicio)>0 && substr_count($buffer, $Final)>0 ){
$desde = strpos($buffer,$Inicio);
$hasta = strpos($buffer,$Final);
$Macro = trim(substr($buffer, $desde+strlen($Inicio), $hasta-$desde-strlen($Inicio)));
$oEti = _ExeEval($Macro, $buffer);
if( substr($Macro,0,11)=='ePermission' || substr($Macro,0,12)=='!ePermission' ) $oEti = (($oEti)?'true':'false');
$buffer = substr($buffer, 0, $desde).$oEti.substr($buffer, $hasta+2);
}
}
}
return $buffer;
}
function _CreateVar(&$_Form=NULL){
global $_CREATEVAR;
if( !isset($_CREATEVAR) ) return;
foreach($_CREATEVAR as $k=>$v){
for($nf=0; $nf<count($_Form); $nf++){
for($c=0; $c<count($_Form[$nf]); $c++){
while( ($p=strpos($Dato, $k, $p))!==false ){
$sc = substr($_Form[$nf][$c], $p+strlen($k), 1);
if( $sc=='' || $sc==' ' || $sc=='|' || $sc=='#' ){
$_Form[$nf][$c] = substr($_Form[$nf][$c],0,$p). $v .substr($_Form[$nf][$c],$p+strlen($k));
}
$p++;
}
}
}
}
}
function _CreateVarOne(&$Dato=NULL){
global $_CREATEVAR;
if( !isset($_CREATEVAR) ) return;
foreach($_CREATEVAR as $k=>$v){
while( ($p = strpos( $Dato, $k, $p ))!==false ){
$sc = substr( $Dato, $p+strlen($k), 1 );
if( $sc=='' || $sc==' ' || $sc=='|' || $sc=='#' ){
$Dato = substr($Dato,0,$p). $v .substr($Dato,$p+strlen($k));
}
$p++;
}
}
}
function ePermission($Label, $uDF=''){
global $_DF, $_User, $_ePermission, $_Sql;
if( $uDF=='' ) $uDF = $_DF;
$Label = trim($Label);
if( $Label[0]=="'" || $Label[0]=='"' ) $Label = substr($Label,1,-1);
if( !function_exists('qQuery') ){
eval(_LoadSqlIni( '../_datos/config/sql.ini'));
if( $_SESSION["_SPIDER_"]["opcion"]=="E" ) $_Sql = "spider";
include_once(__DIR__.'/'.$GLOBALS['_Sql'].'.inc');
}
$tmp = explode(',',$Label);
if( count(array_intersect($tmp, $_ePermission))>0 ) return true;
$Label = '';
for($n=0; $n<count($tmp); $n++){
if( in_array($tmp[$n], $_ePermission)==0 ){
if( $Label!='' ) $Label .= ',';
$Label .= $tmp[$n];
}
}
$Label = "'".str_replace(',',"','",$Label)."'";
qQuery("select script from {$_SESSION['ShareDictionary']}gs_tpermission where nm_gs_tpermission in ( {$Label} ) and active='S'", $p1);
list($sDF) = qRow($p1);
if( trim($sDF)=='' ){
$Condi = '';
}else{
$Condi = " and t.script='{$uDF}'";
}
if( eSqlType('mysql,mysqli') ){
qQuery("select count(*) as n from {$_SESSION['ShareDictionary']}gs_tpermission as t left join gs_permission as p on p.cd_gs_tpermission=t.cd_gs_tpermission
where p.cd_gs_user={$_User} {$Condi} and t.nm_gs_tpermission in ( {$Label} ) and t.active='S'", $p1);
}else{
qQuery("select count(*) n from {$_SESSION['ShareDictionary']}gs_tpermission t, gs_permission p
where p.cd_gs_user={$_User} {$Condi} and t.nm_gs_tpermission in ( {$Label} ) and t.active='S' and p.cd_gs_tpermission=t.cd_gs_tpermission", $p1);
}
list($n) = qRow($p1);
return($n>0);
}
function ePermissionOption($nOp){
if( eFileGetVar("Desktop.DesktopTreeType")!="O" ) return false;
$dimPrefijo = array();
foreach($_SESSION["multitenancy"] as $k=>$v) $dimPrefijo[$v] = $_SESSION["ShareDictionary"];
qQuery("select mode from {$dimPrefijo['gs_op']}gs_op where cd_gs_op={$nOp} and type='O'");
list($uMode) = qRow();
if( $uMode=="" ) return false;
$TieneElArbol   = (qCount($dimPrefijo["gs_user_tree"]."gs_user_tree",  "cd_gs_user={$_SESSION['_User']} and cd_gs_tree in (select cd_gs_tree from {$dimPrefijo['gs_tree_op']}gs_tree_op where cd_gs_op={$nOp}) and (mode like '%,{$uMode},%' or mode='{$uMode}')")>0);
$TieneLaOpcion  = (qCount($dimPrefijo["gs_user_op"]."gs_user_op", "cd_gs_op={$nOp} and action='I'")>0);
$OpcionDenegada = (qCount($dimPrefijo["gs_user_op"]."gs_user_op", "cd_gs_op={$nOp} and action='D'")>0);
return (($TieneElArbol || $TieneLaOpcion) && !$OpcionDenegada);
}
function _IncludeJsHtml(&$txt, $label, $conDef=true){
global $_vF, $__EVAL__, $_DEBUG, $_TRACELABEL;
$EsJS = (strtoupper(substr($label,0,2))=='JS');
$EsHTML = (strtoupper(substr($label,0,2))=='HT');
$traceConConsole = $traceConVar = false;
if( $_DEBUG==2 && ($label==$_TRACELABEL || $_TRACELABEL=="JS") && $EsJS ){
global $__eLINE__;
if( $GLOBALS["_TRACECONSOLE"] ) $traceConConsole = true;
else $traceConVar = true;
}
$dim = explode("\n", $txt);
$txt = null;
unset($txt);
if( $EsJS ){
if( $conDef ) echo "<SCRIPT name='{$label}'>S.public(1);\n";
}else{
echo " \n";
}
foreach($_GET as $k=>$v) ${$k} = $v;
foreach($_POST as $k=>$v) ${$k} = $v;
foreach($_vF as $k=>$v) ${$k} = $v;
foreach($_SESSION as $k=>$v) ${$k} = $v;
$inicio = array('<'.'?=', '<'.'?');
$final = '?'.'>';
$t = count($dim);
$txt = "";
for($n=0; $n<$t; $n++){
$linea = $dim[$n];
if( $traceConConsole ) echo 'console.log('.$n.'.'.(++$__eLINE__).");\n";
else if( $traceConVar ) echo '__eLINE__ = '.(++$__eLINE__).";\n";
if( $EsHTML && substr($linea,0,5)=='&#46;' ) $linea = '.'.substr($linea,5);
if( preg_match('/^include(/', $linea) ){
$res = eMid($linea, '(', ')', false);
echo file_get_contents(trim($res));
continue;
}
do{
if( ($res=eMid($linea, '{$', '}', false))<>null ){
if( substr_count($res, "[")>0 ){
$arg1 = explode("[", $res)[0];
$arg2 = eMid($res, '[', ']', false);
switch($arg1){
case '_POST':
$valor = $_POST[$arg2];
break;
case '_GET':
$valor = $_GET[$arg2];
break;
case '_SESSION':
$valor = $_SESSION[$arg2];
break;
case '_vF':
$valor = $_vF[$arg2];
break;
default:
$valor = $GLOBALS[$arg1][$arg2];
}
}else{
$valor = $GLOBALS[$res];
}
$linea = str_replace('{$'.$res.'}', $valor, $linea);
}
}while( $res<>NULL );
for($i=0; $i<2; $i++){
do{
if( ($res=eMid($linea, $inicio[$i], $final, false))<>null ){
$sres = $res;
$res = trim($res);
if( substr($res,-1)==';') $res = trim(substr($res,0,-1));
$__EVAL__ = $res;
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return('.$res.');');
$valor = eval('return('.$res.');');
if( $valor=="" && preg_match('/^[$]{1}[_A-Za-z]{1,35}$/', $res) ){
$valor = $GLOBALS[substr($res,1)];
}
if( substr($res,0,11)=='ePermission' || substr($res,0,12)=='!ePermission' ) $valor = (($valor)?'true':'false');
$linea = str_replace($inicio[$i].$sres.$final, $valor, $linea);
}
}while( $res<>NULL );
}
echo $linea."\n";
}
if( $EsJS ){
if( $conDef ) echo "\nS.public();</SCRIPT>\n";
}else{
echo " \n";
}
}
function eCheckUser(){
global $__DIR__, $_gsID, $__iniSCRIPT__;
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() ){
eInit();
die('Acceso no autorizado');
}
$File = debug_backtrace();
$File = str_replace('\\','/',$File[0]['file']);
$Quitar = str_replace('/http', '/d/', $__DIR__);
$__iniSCRIPT__ = str_replace($Quitar, '', $File);
}
function eUnSet($txt){
global $_ContextFieldsADD;
$tmp = explode(',', eNsp($txt));
for($n=0; $n<count($tmp); $n++){
$NmVar = $tmp[$n];
unset($GLOBALS[$NmVar]);
unset($_POST[$NmVar]);
unset($_REQUEST[$NmVar]);
unset($_GET[$NmVar]);
unset($_SERVER[$NmVar]);
$_ContextFieldsADD[$NmVar] = 1;
}
}
function eGetMicroTime(){
list($milisegundos,$segundos) = explode(' ',microtime());
return number_format(((float)$milisegundos + (float)$segundos),6,'.','');
}
function eGetInterval(){
return number_format(eGetMicrotime() - $GLOBALS['_IniSg'], 2, '.', '');
}
function eGetCDI(){
return date('Y-m-d H:i:s');
}
function _MicroSg(){
return date('H:i:').str_pad(sprintf( "%2.6f", (date('s')+substr(microtime(),0,8))), 9 ,'0',STR_PAD_LEFT);
}
$_eLogIniFile = '';
$_eLogIniWidth = 0;
$_eLogMicroTime = 0;
$_eLogIMicroTime = 0;
$_eLogEMicroTime = 0;
function eLogIni($File, $AnchoIz=2){
$File = '../_tmp/'.$File;
@unlink($File);
$GLOBALS['_eLogIniFile'] = $File;
$GLOBALS['_eLogIniWidth'] = $AnchoIz+3;
$GLOBALS['_eLogMicroTime'] = eGetMicrotime();
$GLOBALS['_eLogIMicroTime'] = $GLOBALS['_eLogMicroTime'];
eLogTxt('START '.date('Y-m-d H:i:s'));
}
function eLogTxt($txt){
if( $GLOBALS['_eLogIniFile']!='' ){
error_log(
str_pad(number_format(eGetMicrotime()-$GLOBALS['_eLogMicroTime'] ,2,',',''), $GLOBALS['_eLogIniWidth'], ' ', STR_PAD_LEFT).
str_pad(number_format(eGetMicrotime()-$GLOBALS['_eLogIMicroTime'],2,',',''), 3, ' ', STR_PAD_LEFT).
" {$txt}\n", 3, $GLOBALS['_eLogIniFile'] );
$GLOBALS['_eLogIMicroTime'] = eGetMicrotime();
}
}
function eLogEnd(){
eLogTxt('FINISH '.date('Y-m-d H:i:s'));
}
function eLogDebugIni($txt){
if( $GLOBALS['_eLogMicroTime']==0 ){
error_log(date('Y-m-d H:i:s')." {$txt}\n", 3, '../_tmp/log/sql.'.$_SESSION['_User']);
$GLOBALS['_eLogMicroTime'] = eGetMicroTime();
$GLOBALS['_eLogEMicroTime'] = $GLOBALS['_eLogMicroTime'];
}else{
error_log(str_repeat(" ",20)."{$txt}\n", 3, '../_tmp/log/sql.'.$_SESSION['_User']);
}
}
function eLogDebug($txt){
error_log(
str_pad(number_format(eGetMicroTime()-$GLOBALS['_eLogMicroTime'] ,2,',',''), 6, ' ', STR_PAD_LEFT).
str_pad(number_format(eGetMicroTime()-$GLOBALS['_eLogEMicroTime'],4,',',''), 8, ' ', STR_PAD_LEFT).
" {$txt}\n", 3, '../_tmp/log/sql.'.$_SESSION['_User'] );
$GLOBALS['_eLogEMicroTime'] = eGetMicroTime();
}
function eStoreSession($CodigoPC=0){
}
function _RecuperarSesion(){
}
function _SaveSession($inicio=false){
global $Dir_, $_Sql, $_HndDBSystem, $_User, $_Node, $_Connection_, $_Tree;
if( $_Sql=="" ){
$tmpFile = '../_datos/config/sql.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval(_LoadSqlIni($tmpFile));
include($Dir_.$_Sql.'.inc');
_ShowError($php_errormsg, $tmpFile);
}
if( $_SESSION['_eDes_']==1 ) $_SESSION['_iSql'] = $_Sql;
if( !$_HndDBSystem ) qConnectSystem();
$id = session_id();
list($Y, $m, $d, $H, $i, $s) = explode(" ", date('Y m d H i s'));
$cdi = date('Y-m-d H:i:s',mktime($H-24, $i, $s, $m, $d, $Y));
$sesion = "";
$IP = (($_SERVER['HTTP_X_FORWARDED_FOR']=="") ? $_SERVER['REMOTE_ADDR'] : $_SERVER['HTTP_X_FORWARDED_FOR'] );
if( $IP=="" ) $IP = $_SERVER['HTTP_HOST'];
if( $_HndDBSystem->qCount('gs_conexion', "id='{$id}' and cdi>'{$cdi}' and cdi_fin is null")==0 || $inicio ){
$_HndDBSystem->qQuery("insert into gs_conexion
(cd_gs_navegador, exe,    id  ,    ip  ,cd_gs_tree,cd_gs_user,zip,cd_gs_node,access,				cdi		    ,sesion)
values
(      '1'      , 'W', '{$id}', '{$IP}',    '0'   ,    '0',    '',    '0'   ,   1  ,'".date('Y-m-d H:i:s')."', '{$sesion}')"
);
$idConexion = $_HndDBSystem->qId();
$_SESSION["_Connection_"] = $idConexion;
}else if( $_SESSION["_Connection_"]=="" ){
$_HndDBSystem->qQuery("select sesion,conexion from gs_conexion where id='{$id}' and cdi>'{$cdi}'");
$r = $_HndDBSystem->qArray();
$_SESSION["_Connection_"] = $r["conexion"];
}
$_HndDBSystem->qQuery("update gs_conexion set sesion='{$sesion}', access='".$_SESSION['_eDes_']."' where conexion=".$_SESSION["_Connection_"]);
$_HndDBSystem->qFree();
}
function _EsIntruso(){
global $Dir_, $_Sql, $_HndDBSystem, $_User, $_Node, $_Connection_, $_Tree;
if( $_Sql=="" ){
$tmpFile = '../_datos/config/sql.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval(_LoadSqlIni($tmpFile));
include($Dir_.$_Sql.'.inc');
_ShowError($php_errormsg, $tmpFile);
}
if( $_SESSION['_eDes_']==1 ) $_SESSION['_iSql'] = $_Sql;
if( !$_HndDBSystem ) qConnectSystem();
if( !isset($_SESSION["_SPIDER_"]) && $_SESSION['_IST_']!=0 && $_HndDBSystem->qCount('gs_conexion', "id='{$_COOKIE['PHPSESSID']}' and conexion={$_SESSION['_Connection_']} and exe='-'")>0 ){
include(__DIR__.'/itm/intruder.php');
}
}
function eNextTime($an=0, $me=0, $di=0, $ho=0, $mi=0, $se=0){
return date('Y-m-d H:i:s', mktime( date('H')+$ho, date('i')+$mi, date('s')+$se,  date('m')+$me, date('d')+$di, date('Y')+$an));
}
function _IDSRV(){
$dim = eFileGetVar("Setup");
if( !$dim["Multitenancy"] ){
global $_SqlHostName, $_Sql, $_SqlDiccionario, $_SqlUsuario, $_SqlPassword;
if( $_Sql==null || $_Sql!='' ){
$tmpFile = '../_datos/config/sql.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval(_LoadSqlIni($tmpFile));
}
}else{
$tmpFile = '../_datos/config/share.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval(_LoadSqlIni($tmpFile));
}
return strtoupper(md5($_SqlHostName.'|'.$_Sql.'|'.$_SqlDiccionario.'|'.$_SqlUsuario.'|'.$_SqlPassword));
}
function eFillSelect($NmField, $Dim, $AddAtributo=""){
$NCol = 2;
if( count($Dim)>0 ) $NCol = count($Dim[0]);
echo "<TABLE INIT=0 id='{$NmField}_TABLE' onmouseover='_SelCursor(true)' onmouseout='_SelCursor(false)' border=0 cellspacing=0 cellpadding=2px cols={$NCol}>";
echo '<COL id=o><COL>';
if( is_string($AddAtributo) && $AddAtributo<>"" ){
echo "<COL id=o NM_ATRIBUTE={$AddAtributo}>";
}else if( is_array($AddAtributo) ){
for( $f=0; $f<count($AddAtributo); $f++ ) echo "<COL id=o NM_ATRIBUTE=".$AddAtributo[$f].">";
}
for( $n=2; $n<$NCol; $n++ ) echo '<COL id=o>';
for( $f=0; $f<count($Dim); $f++ ){
echo '<TR>';
for( $c=0; $c<count($Dim[$f]); $c++ ){
if( $c==1 ){
if( $Dim[$f][$c]=='' ){
$Dim[$f][$c] = '&nbsp;';
}else if( $Dim[$f][$c]=='-' ){
echo '<TD id=Line>';
continue;
}
}
echo '<TD>'.$Dim[$f][$c];
}
}
echo '</TABLE>';
?>
<SCRIPT type="text/javascript">
var _WOPENER = window.frameElement.WOPENER;
_WOPENER.CopySubSelect(Array('<?=$NmField?>=<?=$NmField?>'), DGI("<?=$NmField?>_TABLE"), "");
_WOPENER.DGI("<?=$NmField?>").value = '';
</SCRIPT>
<?PHP
}
function eFileGetVar($Clave="", $Publicar=false){
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
$signoIgual = "=";
if( eFileType($NmFile)=="css" ) $signoIgual = ":";
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
$p = strpos($key, $signoIgual);
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
function eExplodeOne($txt, $Char, &$txt1=NULL, &$txt2=NULL){
if( $Char=='' ){
$p = strpos($txt,'/'.'/');
}else{
$p = strpos($txt,$Char);
}
if( $p === false ){
$txt1 = $txt;	    // no encontrado ...
$txt2 = '';
}else{
$txt1 = substr($txt,0,$p);
if( $Char=='' ) $p--;
$txt2 = substr($txt,$p+1);
if( strlen(rtrim($txt1)) < strlen($txt1) ){
$txt2 = substr($txt1,strlen(rtrim($txt1))-strlen($txt1) ) . $txt2;
}
$txt1 = rtrim($txt1);
}
}
function eExplodeLast($txt, $Char, &$txt1=NULL, &$txt2=NULL){
if( $Char=='' ){
$p = strrpos($txt, '/'.'/');
}else{
$p = strrpos($txt, $Char);
}
if( $p===false ){
$txt1 = $txt;
$txt2 = "";
}else{
$txt1 = substr($txt, 0, $p);
if( $Char=="" ) $p--;
$txt2 = substr($txt, $p+1);
if( strlen(rtrim($txt1))<strlen($txt1) ){
$txt2 = substr($txt1, strlen(rtrim($txt1))-strlen($txt1)).$txt2;
}
$txt1 = rtrim($txt1);
}
}
function eFilePutVar($File, $Dim){
if( $File=='group.var' ) $File = '/_datos/config/group.var';
$EsGroupVar = ($File=='/_datos/config/group.var');
$grupo = "";
for( $i=0; $i<count($Dim); $i++ ){
$Dim[$i][0] = trim($Dim[$i][0]);
if( !$EsGroupVar && $Dim[$i][0][0]!='$' ) $Dim[$i][0] = '$'.$Dim[$i][0];
}
$text = '';
$EsRem = false;
$Lineas = file(eScript($File));
for($n=0; $n<count($Lineas); $n++){
$Linea = trim($Lineas[$n]);
if( $Linea=='/'.'*'){
$EsRem = true;
}else if( $Linea=='*'.'/'){
$EsRem = false;
}else if( !$EsRem && $Linea[0]!='/' && ($Linea[0]=='$' || $EsGroupVar) && substr_count($Lineas[$n],'=')>0 ) {
eExplodeOne($Lineas[$n], '=', $Variable, $Valor);
$FinLinea = (($EsGroupVar)?'':';');
for($i=0; $i<count($Dim); $i++){
if( $grupo.trim($Variable)==$Dim[$i][0] ){
if( $EsGroupVar ){
eExplodeOne($Valor, '', $oValor, $Rem);
}else{
eExplodeOne($Valor, ';', $oValor, $Rem);
}
$oValor = trim($oValor);
if( ($oValor[0]=='"' && substr($oValor,-1)=='"') || ($oValor[0]=="'" && substr($oValor,-1)=="'") ){
$Lineas[$n] = rtrim($Variable).' = '.$oValor[0].$Dim[$i][1].$oValor[0].';'.$Rem;
}else if( is_bool($Dim[$i][1]) ){
$Lineas[$n] = rtrim($Variable).' = '.(($Dim[$i][1]==true)? 'true':'false').$FinLinea.$Rem;
}else{
$Lineas[$n] = rtrim($Variable).' = '.$Dim[$i][1].$FinLinea.$Rem;
}
break;
}
}
}else{
if( $EsGroupVar && substr($Linea,-1)==":" ) $grupo = substr($Linea,0,-1).".";
}
$text .= $Lineas[$n];
if( substr($Lineas[$n],-1)!="\n" ) $text .= "\n";
}
copy(eScript($File), eScript($File.'.bak'));
return file_put_contents(eScript($File), trim($text));
}
function qRecordMD5($xTabla, $NTX, $DBRLOCKNOFIELD=""){
if( !is_array($xTabla) ) $xTabla = array($xTabla);
$sRLOCK = '';
if( trim($NTX)!='' ) $NTX = ' where '.$NTX;
for($n=0; $n<count($xTabla); $n++){
$sTabla = '';
if( substr_count($xTabla[$n], ', gs_dct zz ')>0 ){
list($sTabla) = explode(', gs_dct zz ', $xTabla[$n]);
$sTabla = trim($sTabla).'.';
}
qQuery("select {$sTabla}* from ".$xTabla[$n].$NTX, $p1);
$r = qArray($p1);
if( is_array($r) ) foreach($r as $key=>$val){
if( !is_numeric($key) && substr_count($DBRLOCKNOFIELD, ",{$key},")==0 ){
if( !is_object($val) ){
$sRLOCK .= $key.$val;
}else{
$sRLOCK .= $key.$val->load();
}
}
}
}
return md5($sRLOCK);
}
function _CheckDir($dir){
if( !file_exists(eScript($dir)) && !file_exists($dir) ){
eTron('El directorio "'.eScript($dir).'" - "'.$dir.'" no existe', "HSE");
eMessage('El directorio "'.$dir.'" no existe', "HSE");
}
}
function qDBAddFilter($campo, $sql="", $incluido=false, $valor=NULL){
global $_DBADDFILTER;
if( gettype($valor)=="NULL" && gettype($_POST[$campo])=="NULL" ) return;
$condi = qCondition($campo, $sql, $incluido, $valor);
if( $condi<>"" ){
if( $_DBADDFILTER<>"" ) $_DBADDFILTER .= " and ";
$_DBADDFILTER .= $condi;
}
}
function qCondition($campo, $sql="", $incluido=false, $valor=NULL){
if( !function_exists('CondiSQLOracle') ) include_once(__DIR__.'/condicion.inc');
$condi = '';
if( gettype($campo)=='array' ){
for($n=0; $n<count($campo); $n++){
$txt = qCondition($campo[$n][0], $campo[$n][1], $campo[$n][2], $campo[$n][3]);
if( $txt<>'' ){
if( $condi<>'' ) $condi .= ' and ';
$condi .= $txt;
}
}
return $condi;
}
$condi = '';
$val = ($valor==NULL)? trim($_POST[$campo]) : $valor;
if( $val<>"" ){
if( $incluido && !preg_match("/[<>=]/", $val) ){
$val = str_replace("**", "*", "*{$val}*");
}
if( eSqlType('oracle') ){
$condi = CondiSQLOracle($campo, $val);
}else{
$condi = CondiSQL($campo, $val);
}
}
if( $condi<>"" && $sql<>"" ) $condi = str_replace("#", $condi, $sql);
return $condi;
}
function ___Lng($buffer){
if( $GLOBALS['_LNGCOL']>-1 && !(strpos($buffer, '@')===false) ){
global $_LANGUAGE, $_LngPublic;
for($n=0; $n<count($_LANGUAGE); $n++) $buffer = str_replace($_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $buffer);
foreach($_LngPublic as $k=>$v) $buffer = str_replace($k, $v, $buffer);
}
return $buffer;
}
function eLngReplaze($buffer){
if( $GLOBALS['_LNGCOL']>-1 ){
global $__Lng;
$sbuffer = '';
while( $sbuffer!=$buffer && substr_count($buffer, '@')>1 ){;
$sbuffer = $buffer;
$Dim = explode('@', $buffer);
for($i=1; $i<count($Dim); $i++){
$txt = $Dim[$i];
if( $__Lng[$txt]<>'' ){
$buffer = str_replace('@'.$txt.'@', $__Lng[$txt], $buffer);
break;
}
}
}
}
return str_replace(array("'",'"'), array('&#39;','&#34;'), $buffer);
}
function eLng($i, $v1='', $v2='', $v3=''){
$txt = $GLOBALS['_Lng'][$i];
if( $txt=='' ){
global $_LANGUAGE, $_LngPublic;
$buffer = '@'.$i.'@';
for($n=0; $n<count($_LANGUAGE); $n++){
if( !(strpos($buffer, $_LANGUAGE[$n][0])===false) ){
$txt = str_replace($_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $buffer);
break;
}
}
if( $txt=='' ){
foreach($_LngPublic as $k=>$v){
if( !(strpos($buffer, $k)===false) ){
$txt = str_replace($k, $v, $buffer);
break;
}
}
}
if( $GLOBALS['__Lng'][$i]!="" ) $txt = $GLOBALS['__Lng'][$i];
if( $txt=='' ) return '';
}
$txt = str_replace('&#','{~}',$txt);
if( $v3!='' ) $txt = str_replace('#3', $v3, $txt);
if( $v2!='' ) $txt = str_replace('#2', $v2, $txt);
if( $v1!='' ){
$txt = str_replace('#1', $v1, $txt);
$txt = str_replace('#', $v1, $txt);
}
$txt = str_replace('{~}','&#',$txt);
return $txt;
}
function eLngLoad($File='', $Ext='', $Tipo=0){
global $_Lng, $__Lng, $_LngPublic, $_LANGUAGE, $JsTxtm, $_LanguageTables;
if( $_LanguageTables!='' && $_LanguageTables[0]!=',' ) $_LanguageTables = ','.$_LanguageTables.',';
$Dim = debug_backtrace();
if( $Tipo==2 ){
if( $GLOBALS['_LanguageAdd'] ) return;
$GLOBALS['_LanguageAdd'] = true;
}
if( $Ext=='' ) $Ext = $_SESSION['_LANGUAGE_'];
else if( $Ext=='*' ) $Lng = array();
if( $File=='' ){
if( $Dim[0]['args'][1]=='' && (substr($Dim[0]['file'],-4)<>'.tmp' || $GLOBALS['E:CallSrv']<>'' ) ){
$File = $Dim[0]['file'];
$xFile = str_replace(chr(92),'/',$File);
}else{
eInit();
die( 'ERROR: La función "eLngLoad()" no es necesaria en ficheros "DF"' );
}
}else if( $File[0]=='*' ){
$File = '../../'.substr($File,1);
}else if( $File[0]=='/' || $File[0]=='$' ) $File = eScript($File);
if( substr($File,-4)<>'.lng' ) $File .= '.lng';
$uCol = 1; $dCol = 1;
if( !file_exists($File) ){
if( $Tipo==2 ) return '';
eTrace('ERROR: Fichero "'.$File.'" no encontrado');
}
$tmp2 = file($File);
for($n=0; $n<count($tmp2); $n++){
list( $txt ) = explode('~',$tmp2[$n]);
$tmp = explode('|',$txt);
$Cod = trim($tmp[0]);
if( $Cod=='' || $Cod[0]=='.' ) continue;
if( $Cod[0]=='[' ){
list(,$Lngs) = explode(']',$tmp[0]);
$tmp4 = explode( ',', trim(eNsp($Lngs)) );
if( $Ext=='*' ) continue;
for( $i=0; $i<count($tmp4); $i++ ){
if( $tmp4[$i]==$Ext ){
$uCol = $i+1;
}else if( $tmp4[$i]==$_SESSION['_LanguageDefault'] ){
$dCol = $i+1;
}
}
$Cod = 'LNG';
$_Lng[$Cod] = '_'.$_SESSION['_LANGUAGE_'];
$__Lng[$Cod] = '_'.$_SESSION['_LANGUAGE_'];
$_LngPublic['@'.$Cod.'@'] = '_'.$_SESSION['_LANGUAGE_'];
continue;
}
if( $Ext=='*' ){
for( $i=0; $i<count($tmp4); $i++ ){
$txt = trim($tmp[$i+1]);
if( $txt=='' ) $txt = trim($tmp[0]);
$txt = $GLOBALS['_LanguageTron'].str_replace('\n',"\n",$txt).$GLOBALS['_LanguageTron'];
if( $_SESSION["UTF8Text"] ){
$Lng[$tmp4[$i]][$Cod] = eAsciiToCode($txt);
}else{
$Lng[$tmp4[$i]][$Cod] = $txt;
}
}
}else{
$txt = trim($tmp[$uCol]);
if( $txt=='' ) $txt = trim($tmp[$dCol]);
$txt = $GLOBALS['_LanguageTron'].str_replace('\n',"\n",$txt).$GLOBALS['_LanguageTron'];
if( $_SESSION["UTF8Text"] ){
$txt = eAsciiToCode($txt);
}
switch( $Tipo ){
case 0: $_Lng[$Cod] = $txt; break;
case 1: $__Lng[$Cod] = $txt; break;
case 2: $_LngPublic['@'.$Cod.'@'] = $txt; break;
case 3:
if( $JsTxt!='' ) $JsTxt .= ',';
if( !is_numeric($Cod) ) $Cod = "'{$Cod}'";
$txt = str_replace("'",chr(92)."'",$txt);
$JsTxt .= "{$Cod}:'{$txt}'"; break;
}
}
}
if( $Tipo==3 ) return $JsTxt;
if( $Ext=='*' ) return $Lng;
}
function eMail($sPara, $sAsunto, $sTexto, $sDe, $nmFrom='', $cc='', $bcc='', $ConFiles=true, $SoloUno=true){
if( file_exists('../_datos/config/mail.inc') ){
if( !function_exists('eMailSmtp') ) include_once('../_datos/config/mail.inc');
if( is_bool($ConFiles) && $ConFiles ){
$ConFiles = array();
foreach($_FILES as $vAdjunto){
@unlink($vAdjunto['name']);
copy($vAdjunto['tmp_name'], $vAdjunto['name']);
$ConFiles[] = $vAdjunto['name'];
}
}else if( is_string($ConFiles) ){
if( $ConFiles=='' ){
$ConFiles = array();
}else{
$ConFiles = array($ConFiles);
}
}else if( is_array($ConFiles) ){
}
return eMailSmtp($sPara, $sAsunto, $sTexto, $sDe, $nmFrom, $cc, $bcc, $ConFiles);
}
if( !function_exists('eMail_') ) include_once(eScript('$email.inc'));
return eMail_($sPara, $sAsunto, $sTexto, $sDe, $nmFrom, $cc, $bcc, $ConFiles, $SoloUno);
}
function eOpCheck($NOp){
if( !function_exists('eOpCheck_') ) include_once( eScript('$itm/eopcheck.php') );
return eOpCheck_( $NOp );
}
function eExportSrvTable($t, $z){
if( !function_exists('eExportSrvTable_') ) include_once(eScript('$itm/ex_srv_tb.php'));
return eExportSrvTable_($t,$z);
}
function eNodeSend($records){
if( !function_exists('eNodeSend_') ){
eIncludeFileGlobal("../_datos/config/node_config.php");
include_once(eScript('$itm/enodesend.php'));
}
return eNodeSend_($records);
}
function eIncludeFileGlobal($file){
require($file);
foreach(get_defined_vars() as $k=>$v) $GLOBALS[$k] = $v;
}
function _PedirLogin(){
global $_RastrearSESS, $_QueryString;
if( !function_exists('_PedirLogin_') ) include_once(eScript('$pedirlogin.php'));
_PedirLogin_();
}
function eUnEscape($txt, $AlReves=false){
$Dim = array(
array('&','&amp;'),
array('+','&#43;'),
array('<','&lt;'),
array('>','&gt;'),
array(chr(92),'&#92;'),
array('"','&quot;'),
array("'",'&#39;')
);
$p=0; $s=1;
if( $AlReves ){
$p=1; $s=0;
}
for($n=0; $n<count($Dim); $n++) $txt = str_replace($Dim[$n][$p], $Dim[$n][$s], $txt);
return $txt;
}
function eStrTranslater(&$Dim){
if( is_array($Dim) ){
foreach($Dim as $k=>$v) $Dim[$k] = eUnEscape($v, true);
}else{
$Dim = eUnEscape($Dim, true);
}
}
function eStrUpper($txt){
$txt = str_replace('&EURO;', 'EUR', $txt);
return strtr(strtoupper($txt), 'ñçáéíóúàèìòùâêîôûäëïöüãõ', 'ÑÇÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÄËÏÖÜÃÕ');
}
function eStrLower($txt){
$txt = str_replace('&EURO;', 'EUR', $txt);
return strtr(strtolower($txt), 'ÑÇÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙÄËÏÖÜÃÕ', 'ñçáéíóúâêîôûàèìòùäëïöüãõ');
}
function eUcFirst($txt){
$txt = eStrLower($txt);
return eStrUpper($txt[0]).substr($txt,1);
}
function eClearAccent($txt, $eye=false){
return strtr($txt, "ÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙÄËÏÖÜÃÕáéíóúâêîôûàèìòùäëïöüãõ".(($eye)?"Ññ":"Yy"), "AEIOUAEIOUAEIOUAEIOUAOaeiouaeiouaeiouaeiouao".(($eye)?"Nn":"Yy"));
}
function eCleanFilename($txt){
return preg_replace('([^A-Za-z0-9\.\s_-])', '', strtr(eClearAccent($txt), "Ççºª", "Ccoa"));
}
function eScriptToCache($script=''){
$txt = '';
foreach($_GET as $k=>$v) if( !preg_match('/^(_CONTEXT|_CACHE_|_ACCESS)$/', $k) ) $txt .= $k.'='.$v;
foreach($_POST as $k=>$v) if( $k[0]!="_" ) $txt .= $k.'='.$v;
return '../_tmp/cch/'.strtr(strtolower(preg_replace("/['\"]/", "", (($script=='')? $GLOBALS["_oAccion"] : '').'~'.md5($txt))), ':/&=', '____');
}
function eBoolean($valor){
return (($valor)?"true":"false");
}
function eIn($esto, $aqui, $divide=NULL){
if( gettype($esto)=="array" ) $esto = implode("|", $esto);
if( $divide<>NULL ) $esto = str_replace($divide,"|",$esto);
$esto = str_replace(["[","]","-","+"], ["\[","\]","\-","\+"], $esto);
return preg_match("/[".$esto."]/", $aqui);
}
function eIs($esto, $aqui, $divide=NULL){
if( gettype($aqui)=="array" ) $aqui = implode('|',$aqui);
if( $divide<>NULL ) $aqui = str_replace($divide,"|",$aqui);
$aqui = str_replace(["[","]","+","-"], ["\\[","\\]","\\+","\\+"], $aqui);
return preg_match('/^('.$aqui.')$/', $esto);
}
function eNsp($v){
return trim(str_replace(array(" ","\t"),array("",""),$v));
}
function eAsciiToCode($txt, $code=true){
$as = array(  "'"  ,   '"'   ,   "á"   ,   "é"	 ,   "í"   ,   "ó"   ,    "ú"  ,   "ü"   ,	 "Á"   ,   "É"	 ,   "Í"   ,   "Ó"   ,   "Ú"   ,    "Ü"  ,	 "ñ"   ,   "Ñ"	 ,   "ç"   ,   "Ç"   ,   "€"   ,    "º"  ,    "ª"  );
$cd = array('&amp;', '&quot;', "&#225;", "&#233;", "&#237;", "&#243;", "&#250;", "&#252;", "&#193;", "&#201;", "&#205;", "&#211;", "&#218;", "&#220;", "&#241;", "&#209;", "&#231;", "&#199;", "&#128;", "&#186;", "&#170;");
if( $code ){
$as[] = chr(92).'n';
$cd[] = "<br>";
return str_replace($as, $cd, $txt);
}else{
return str_replace($cd, $as, $txt);
}
}
function eReplaceVar($txt){
$numargs = func_num_args();
$cambiar = (substr_count($txt, "&#")>0);
if( $cambiar ) $txt = str_replace("&#", "&~23~", $txt);
for($n=1; $n<$numargs; $n+=2){
$v = func_get_arg($n+1);
if( ($v*1)==(int)$v && $v>999 ) $v = eNumberFormat($v);
$txt = str_replace(func_get_arg($n), $v, $txt);
}
if( $cambiar ) $txt = str_replace("&~23~", "&#", $txt);
return $txt;
}
function eReplaceAll($esto, $por, $aqui){
do{
$long = strlen($aqui);
$aqui = str_replace($esto, $por, $aqui);
}while( $long!=strlen($aqui) );
return $aqui;
}
function _NomFields($campo){
$campo = trim($campo);
if( substr_count($campo,'{') ) list($campo) = explode('{',$campo);
if( substr_count($campo,':') ) list($campo) = explode(':',$campo);
if( substr_count($campo,' ') ){
$tmp = explode(' ',$campo);
$campo = $tmp[count($tmp)-1];
}
return trim($campo);
}
function _QueNmField($Form, $i){
$NomCampo = $Form[1];
if( $Form[0]=='-' ){
$NomCampo = '';
}else if( $NomCampo=='' && $Form[0][0]=='{' ){
$NomCampo = '';
}else if( $Form[0][0]=='{' ){
return $i;
}else if( substr_count($NomCampo, '{')>0 ){
list($NomCampo) = explode('}',$NomCampo);
$tmp = explode(',',$NomCampo);
$NomCampo = trim($tmp[2]);
if( count($tmp)==5 ){
if( $tmp[3][0]=='"' || $tmp[3][0]=="'" ){
$NomCampo = trim($tmp[4]);
if( substr_count($NomCampo, ' ')==0 ){
list($NomCampo) = explode('{',$Form[1]);
return trim($NomCampo);
}
}
}else if( count($tmp)==3 ){
if( substr_count($NomCampo, ' ')==0 ){
list($NomCampo) = explode('{',$Form[1]);
return trim($NomCampo);
}else{
return trim(substr($NomCampo, strrpos($NomCampo,' ')+1));
}
}else{
list($NomCampo) = explode('{',$NomCampo);
return trim($NomCampo);
}
if( substr_count($NomCampo, ' ')>0 ){
$NomCampo = trim(substr($NomCampo, strrpos($NomCampo,' ')+1));
}
}else if( substr_count($NomCampo, ':')>0 ){
list(,$NomCampo) = explode(':',$NomCampo);
$NomCampo = trim($NomCampo);
}else if( substr_count($NomCampo, ' ')>0 ){
$NomCampo = trim(substr($NomCampo, strrpos($NomCampo,' ')+1));
}
if( $NomCampo=='' ) $NomCampo = $i;
return $NomCampo;
}
function _FileDeleteTemp(){
$tmp = explode('|',$_POST["_FIELDSWITHFILES"]);
for( $n=0; $n<count($tmp)-1; $n++ ){
if( $_POST[$tmp[$n]]!='' ){
$FileTmp = '../_tmp/zip/'.$_SESSION['_User'].'_'.$_POST[$tmp[$n]];
if( file_exists($FileTmp) ) @unlink( $FileTmp );
}
}
}
function qGetWhere($Prefijo="", $Transforma=true, &$Dim=NULL){
if( $Prefijo!='' && substr($Prefijo,-1)!='.' ) $Prefijo .= '.';
if( gettype($Transforma)=="array" ){
$Busca = "";
GetCondicion($Prefijo, $Busca, true, $Dim, $Transforma);
return $Busca;
}
$Busca = $GLOBALS['_DBADDFILTER'];
if( $GLOBALS['_DBADDFILTEREXTRA']!='' ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $GLOBALS['_DBADDFILTEREXTRA'];
}
GetCondicion($Prefijo, $Busca, $Transforma, $Dim);
return $Busca;
}
function GetCondicion($Prefijo, &$Busca, $Transforma=true, &$DimFilter=NULL, $NewDim=false){
global $_Sql, $_ConDBRange, $_SqlPDOType, $_FILTER, $MemDBRange, $_DeleteWhereFields;
$DimFilter = array();
if( $NewDim==false ){
if( trim($_FILTER)!='' ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $_FILTER;
}
$TotalCondi = count($_POST);
$DimNomVar = array_keys($_POST);
$DimValor  = array_values($_POST);
}else{
$TotalCondi = 0;
$DimNomVar = array();
$DimValor  = array();
foreach($NewDim as $k=>$v){
$TotalCondi++;
$DimNomVar[] = $k;
$DimValor[]  = $v;
}
}
if( substr($Busca,-5)==" and " ) $Busca = substr($Busca,0,-5);
if( substr($Busca,0,5)==" and " ) $Busca = trim(substr($Busca,5));
for($n=0; $n<$TotalCondi; $n++){
$DimNomVar[$n] = trim($DimNomVar[$n]);
if( in_array($DimNomVar[$n], $_DeleteWhereFields) ) continue;
if( substr(trim($DimNomVar[$n]), 0, 1)=='_' ) continue;
$DimValor[$n] = trim(stripslashes( $DimValor[$n] ));
if( $DimValor[$n]=='*' ) continue;
if( substr($DimValor[$n],0,5)=='&#62;' ){
$DimValor[$n] = str_replace('&#62;', '>', $DimValor[$n]);
}
if( substr($DimValor[$n],0,5)=='&#60;' ){
$DimValor[$n] = str_replace('&#60;', '<', $DimValor[$n]);
}
if( substr($DimNomVar[$n],0,4)=='dct_' && $DimValor[$n]!='' ){
global $_DCT, $_DCT_SUFFIX;
$_DCT = $DimNomVar[$n];
$xBusca = '';
$tmp = explode(',',str_replace('  ',' ',trim($DimValor[$n])));
for( $p=0; $p<count($tmp); $p++ ){
if( $xBusca!='' ) $xBusca .= ' or ';
if( substr_count($tmp[$p], '*')>0 ){
$xBusca .= "zz.dct_work like '".str_replace('*','%',trim($tmp[$p]))."'";
}else{
$xBusca .= "zz.dct_work='".trim($tmp[$p])."'";
}
}
$xBusca = "zz.dct_field='{$DimNomVar[$n]}{$_DCT_SUFFIX}' and (".$xBusca.')';
if( !_CondiRepetida($xBusca, $Busca) ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $xBusca;
$DimFilter[] = $xBusca;
}
$DimValor[$n] = '';
continue;
}
if( strlen($DimValor[$n])>0 ){
$ConRange = false;
if( $_ConDBRange[$DimNomVar[$n]] ){
if( substr_count($DimValor[$n], ' and ')>0 ){
$ConRange = true;
$DimValor[$n] = str_replace(' and '.$DimNomVar[$n], ' and '.$Prefijo.$DimNomVar[$n], $DimValor[$n]);
}
}
if( !eSqlType('oracle') && strlen($DimValor[$n])==10 && substr($DimValor[$n],2,1)=='-' && substr($DimValor[$n],5,1)=='-' ){
if( !eSqlType('pdo.informix') ){
$DimValor[$n] = substr($DimValor[$n],6,4).substr($DimValor[$n],2,4).substr($DimValor[$n],0,2);
}
}
if( $ConRange ){
if( substr_count($DimValor[$n], '>=')>0 ){
$xBusca = $Prefijo.$DimNomVar[$n]. ">='".str_replace('"',"'",substr($DimValor[$n],2))."' ";
}else{
$xBusca = $Prefijo.$DimNomVar[$n]. ">'" .str_replace('"',"'",substr($DimValor[$n],1))."' ";
}
}else if( substr_count($DimValor[$n],'*')>0 || substr_count($DimValor[$n],'?')>0 ){
$xBuscar = str_replace("*", "%", $DimValor[$n]);
$xBuscar = str_replace("?", "_", $xBuscar);
$xBusca = $Prefijo.$DimNomVar[$n]. " like '" .$xBuscar. "'";
}elseif( $DimValor[$n]=='=' ){
$xBusca = $Prefijo.$DimNomVar[$n]. " is null ";
}elseif( $DimValor[$n]=='<' || strtoupper($DimValor[$n])=='NULL' || $DimValor[$n]=='<=' ){
$xBusca = '('.$Prefijo.$DimNomVar[$n]." is null or ".$Prefijo.$DimNomVar[$n]."='')";
}elseif( $DimValor[$n]=='>' ){
$xBusca = $Prefijo.$DimNomVar[$n].">' ' ";
}elseif( $DimValor[$n]=='<=' ){
if( !eSqlType('oracle') ){
$xBusca = '('.$Prefijo.$DimNomVar[$n]. " is null or ".$Prefijo.$DimNomVar[$n]."='') ";
}else{
$xBusca = $Prefijo.$DimNomVar[$n]. " is null ";
}
}elseif( $DimValor[$n]=='<>' ){
$xBusca = $Prefijo.$DimNomVar[$n]. " is not null ";
}elseif( $DimValor[$n][0]=='[' ){
$xBusca = $Prefijo.$DimNomVar[$n]. " matches '" .$DimValor[$n]."' ";
}elseif( $DimValor[$n][0]=='(' ){
$xBusca = $Prefijo.$DimNomVar[$n]. ' in ' .str_replace('.',',',$DimValor[$n]). ' ';
}elseif( $DimValor[$n][0]==')' ){
$xBusca = $Prefijo.$DimNomVar[$n]. ' not in (' .str_replace('.',',',substr($DimValor[$n],1,strlen($DimValor[$n])-2)). ') ';
}else{
if( substr_count($DimValor[$n],'||')>0 ){
$xBusca = $Prefijo.$DimNomVar[$n]. " in ('" .str_replace('||',"','",$DimValor[$n]). "') ";
if( !_CondiRepetida($xBusca, $Busca) ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $xBusca;
$DimFilter[] = $xBusca;
}
continue;
}
$xBusca = '';
$Campo = $Prefijo.$DimNomVar[$n];
$Valor = trim($DimValor[$n]);
$uc = false;
$nc = 0;
$nValor = '';
for($i=0; $i<strlen($Valor); $i++){
$c = substr($Valor,$i,1);
if( substr_count('<>=*',$c)==0 ){
if( $uc ) $nValor .= '|';
$uc = false;
}else{
if( !$uc ) $nValor .= '|';
$uc = true;
$nc++;
}
$nValor .= $c;
}
$DimPar = array();
$nValor = trim($nValor);
if( $nValor[0]=='|' ) $nValor = substr($nValor,1);
$par = explode('|',$nValor);
for($i=0 ; $i<count($par); $i++){
$par[$i] = trim($par[$i]);
if( !eSqlType('informix') ){
if( !eSqlType('oracle') && strlen($par[$i])==10 && substr($par[$i],2,1)=='-' && substr($par[$i],5,1)=='-' ){
$par[$i] = substr($par[$i],6,4).substr($par[$i],2,4).substr($par[$i],0,2);
}
}
if( $par[$i]!='' ) $DimPar[] = $par[$i];
}
$Comilla = "'";
switch( count($DimPar) ){
case 1:
if( $nc > 0 ){
$xBusca = $Campo . $DimPar[0] .$Comilla.$Comilla.' ';
}else{
$xBusca = $Campo . '='.$Comilla.$Valor.$Comilla.' ';
}
break;
case 2:
$xBusca = $Campo . $DimPar[0].$Comilla. $DimPar[1] .$Comilla.' ';
break;
case 4:
if( !eSqlType('oracle', 'pdo.informix') ){
$xFecha = substr($DimPar[1],0,10);
if( strlen($xFecha)==10 && substr($xFecha,2,1)=='-' && substr($xFecha,5,1)=='-' ){
$xFecha = substr($xFecha,6,4).substr($xFecha,2,4).substr($xFecha,0,2);
$DimPar[1] = $xFecha . substr($DimPar[1],10);
}
$xFecha = substr($DimPar[3],1,10);
if( strlen($xFecha)==10 && substr($xFecha,2,1)=='-' && substr($xFecha,5,1)=='-' ){
$xFecha = substr($xFecha,6,4).substr($xFecha,2,4).substr($xFecha,0,2);
$DimPar[3] = $DimPar[3][0].$xFecha;
}
}
$xBusca = $Campo . $DimPar[0].$Comilla. $DimPar[1].$Comilla.' and '. $Campo.$DimPar[2].$Comilla.$DimPar[3].$Comilla.' ';
break;
default:
$xBusca = '';
$BuscaAnd = '';
$BuscaOr = '';
$NumAnd = 0;
$NumOr = 0;
$ConMayor = false;
$ConMenor = false;
for($i=0; $i<count($DimPar); $i+=2){
if( substr_count($DimPar[$i], '>')>0 ){
$ConMayor = true;
if( $ConMenor ){
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumOr++;
}else{
if( $BuscaAnd!='' ) $BuscaAnd .= ' and ';
$BuscaAnd .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumAnd++;
}
}else if( substr_count($DimPar[$i], '<')>0 ){
$ConMenor = true;
if( $ConMayor ){
if( $BuscaAnd!='' ) $BuscaAnd .= ' and ';
$BuscaAnd .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumAnd++;
}else{
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumOr++;
}
}else{
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumOr++;
}
}
if( $BuscaAnd!='' && $BuscaOr!='' ){
$xBusca = '(';
if( $NumAnd>1 ){
$xBusca .= '( '.$BuscaAnd.' )';
}else{
$xBusca .= $BuscaAnd;
}
$xBusca .= ' or '.$BuscaOr.')';
}else if( $BuscaOr!='' ){
$xBusca = '( '.$BuscaOr.' )';
}else if( $BuscaAnd!='' ){
$xBusca = $BuscaAnd;
}
break;
}
}
if( !_CondiRepetida($xBusca, $Busca) ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $xBusca;
$DimFilter[] = $xBusca;
}
}
}
}
function _CondiRepetida($esto, $aqui){
if( substr_count(" ".$aqui, " ".$esto)>0 ||
substr_count(" ".$aqui, ".".$esto)>0 ||
substr_count(" ".$aqui, ".".str_replace("'",'"',$esto))>0 ||
substr_count(" ".$aqui, ".".str_replace('"',"'",$esto))>0 ||
substr_count(" ".$aqui, " ".str_replace("'",'"',$esto))>0 ||
substr_count(" ".$aqui, " ".str_replace('"',"'",$esto))>0 ){
return true;
}
return false;
}
function _qBuscar($txt, $Tabla){
global $_DBADDFILTEREXTRA;
$Alias = '';
$Dim = explode(' ',trim(str_replace('  ',' ',$Tabla)));
for( $n=0; $n<count($Dim); $n++ ) if( strlen($Dim[$n])==1 ) $Alias = 'A.';
if( $Alias=='' ){
$txt = str_replace('#.','',$txt);
$_DBADDFILTEREXTRA = str_replace('#.','',$_DBADDFILTEREXTRA);
}
if( trim($_DBADDFILTEREXTRA)!='' ){
$txt = (( trim($txt)!='' ) ? $txt.' and ':'' ).str_replace('#.',$Alias,$_DBADDFILTEREXTRA);
}
if( $Alias=='' ){
$txt = str_replace('#.','',$txt);
}else{
$txt = str_replace('#.','A.',$txt);
}
return $txt;
}
function _NmFileConPrefijo($xNomFile, $pre=""){
if( $pre=='' || $pre[0]!='_' ){
$xNomFile = $pre.$xNomFile;
}else{
$pp = strrpos($xNomFile,'.');
$xNomFile = substr($xNomFile,0,$pp).$pre.substr($xNomFile,$pp);
}
return strtolower($xNomFile);
}
function eSplitPath($Nom, $Dir=""){
if( $Dir=='' ) $Dir = $Nom;
$n = substr_count($Dir,'!');
if( $n>0 ){
list($Nom) = explode('.',$Nom);
$Nom = substr(str_repeat('0',$n).$Nom,-$n);
$Dir = str_replace( str_repeat('!',$n), $Nom, $Dir );
$oDir = eScript($Dir);
if( !file_exists($oDir) ) mkdir($oDir,0777);
}
return $Dir;
}
function eExplodeTrim($div, $txt){
$dim = explode($div, $txt);
for($n=0; $n<count($dim); $n++) $dim[$n] = trim($dim[$n]);
return $dim;
}
function _SubListGetImg($img, $conContext=false, $nmFile="", $opcional=false){
$class = array(
"i"=>"INSERT",
"d"=>"DELETE",
"v"=>"VIEW",
"u"=>"UPDATE",
"f"=>"DESCARGAR",
"ti"=>"INSERTAR",
"td"=>"BORRAR",
"tv"=>"VER",
"tu"=>"MODIFICAR",
"tf"=>"DESCARGAR"
);
$img = trim($img);
$na = substr_count($img,"[");
if( $na==0 || $na!=substr_count($img,"]") ) return $img;
$dim = explode("[", str_replace("]", "[", $img));
$img = "";
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" && ($n%2)==1 ){
$img .= '<i class="ICONINPUT ICONVIEW" style="visibility:hidden">V</i>';
}else if( $txt[0]=="<" ){
$img .= $dim[$n];
}else{
list($op, $tit) = eExplodeTrim(",", $dim[$n]);
$op = trim(strtolower($op));
if( $op=="" ) continue;
if( $tit=="" ) $tit = $class["t".$op];
$tit = str_replace('"', '&#34;', $tit);
$img .= '<i class="ICONINPUT ICON'.$class[$op].'" onclick="eSubList(\''.$op.'\')"';
if(  strtoupper($op)=="F" && $opcional ){
$img .= ' title="Ver fichero"';
}else if( $conContext && strtoupper($op)=="F" && preg_match('/(\.gif|\.png|\.jpg|\.jpeg|\.pdf|\.mp4)$/i', $nmFile) ){
$img .= ' oncontextmenu="eSubList(\''.$op.'\')"';
$img .= ' title="Click Izq: Ver fichero'."\n".'Click Dch: Descargar Fichero"';
}else{
$img .= ' title="'.$tit.'"';
}
$sStyle = "";
if( $img=="" ) $sStyle .= 'margin-left:0px;';
if( $sStyle!="" ) $sStyle = " style='{$sStyle}'";
$img .= $sStyle.'>'.strtoupper($op).'</i>';
}
}
return $img;
}
function eIcon($icon, $interior="", $class="", $campo=""){
$sicon = $icon;
$icon = strtoupper($icon);
$dim = array(
"I"=>"I", "D"=>"D", "U"=>"U", "V"=>"V", "L"=>"&#306;", "X"=>"R",
"S"=>"S", "DOC"=>"F", "M"=>"}", "MENU"=>"}", "="=>"=", "C"=>",", "CALENDAR"=>",", "FILTER"=>"f",
"INSERT"=>"I", "DELETE"=>"D", "UPDATE"=>"U", "VIEW"=>"V", "SEEK"=>"S",
"PRINT"=>"8", "SETUP"=>"Y",
"HELP"=>"?", "HELP2"=>"@", "INFO"=>"&#162;",
"USER"=>"q", "USERS"=>"&#241;",
"DOWNLOAD"=>"v", "UPLOAD"=>"w",
"W"=>"&#251;", "WEB"=>"&#251;", "@"=>"n", "EMAIL"=>"n",
"FACEBOOK"=>"&#163;", "TWITTER"=>"&#164;",
"OFF"=>"i", "ON"=>"j",
"TOOLS"=>"T", "COPY"=>"C", "PASTE"=>"P",
"OPEN"=>"&#169;", "CLOSE"=>"&#170;", "HOME"=>"&#209;",
"PDF"=>"&#202;", "EXCEL"=>"&#203;", "WORD"=>"&#204;", "FILE"=>"&#234;",
"EXP"=>"&#178;", "EXPORT"=>"&#178;", "IMP"=>"&#179;", "IMPORT"=>"&#179;",
"STAR"=>"Z", "PIN"=>"/", "GPS"=>"&#167;", "EXE"=>"&#124;"
);
if( preg_match('/^\&\#[0-9]{2,3};$/', $icon) ) $dim[$icon] = $icon;
else if( substr($icon,0,2)=="==" ) $dim[$icon] = substr($sicon,2);
$interior = str_replace('\\n', "\n", $interior);
if( $campo!="" ) $interior .= " eFilled='{$campo}'";
if( $class!="" && $dim[$icon]!="" ) return '<i class="'.$class.'" '.$interior.'>'.$dim[$icon].'</i>';
if( $dim[$icon]!="" ){
return '<i class="ICONINPUT" '.$interior.'>'.$dim[$icon].'</i>';
}else{
return '<img src="'.(substr_count($sicon,"/")?"":"g/").$sicon.'" '.$interior.'>';
}
}
function eIconShow($ext=null, $inner=""){
if( preg_match('/\./', $ext) ) $ext = eFileType($ext);
$dim = array(
"pdf"=>202,
"xls"=>203, "xlsx"=>203, "xml"=>203,
"doc"=>204, "docx"=>204, "txt"=>204,
"png"=>206, "jpeg"=>206, "jpg"=>206, "gif"=>206, "tif"=>206, "tiff"=>206, "bmp"=>206,
"avi"=>229, "mpeg"=>229, "mp4"=>229,
"mp3"=>228, "wav"=>228,
"zip"=>345, "rar"=>345
);
$ext = strtolower($ext);
$ext = (($dim[$ext]!="") ? $dim[$ext] : 234);
return "<i class='ICONINPUT' {$inner}>&#{$ext};</i>";
}
function eImg64($file){
$file = eScript($file);
$ext = pathinfo($file, PATHINFO_EXTENSION);
return "data:image/{$ext};base64,".base64_encode(file_get_contents($file));
}
function eIcon2($tipo, $interior){
$dim = [
SEEK=>["S","buscar.gif"],
EMAIL=>["n","t_email.gif"]
];
$tipo = strtoupper($tipo);
return "<i class='ICONINPUT' {$interior}>".$dim[$tipo][0]."</i>";
}
function eCallSrvRow($file){
if( !function_exists("_eCallSrvRow") ) include($GLOBALS["Dir_"]."itm/callsrvrow.php");
return _eCallSrvRow($file);
}
function eFormPrint($Registro, $DimReplace=array(), $TotalCopias=1, $DescargarPDF=true, $CopiarComo=""){
if( !function_exists("_eFormPrint") ) include($GLOBALS["Dir_"]."form_pdf.php");
return _eFormPrint($Registro, $DimReplace, $TotalCopias, $DescargarPDF, $CopiarComo);
}
function eProgress($Realizado, $Titulo='', $TextoEnBarra='', $TextoDetalle='', $Sonido='M'){
if( gettype($Realizado)=="string" && substr_count($Realizado,'/')==1 ){
$tmp = explode('/',$Realizado);
$Realizado = round(($tmp[0]/$tmp[1])*100);
if( $TextoEnBarra=='%' ) $TextoEnBarra = $Realizado.'%';
}else{
if( $TextoEnBarra=='%' ) $TextoEnBarra = $Realizado.'%';
}
if( $Realizado==0 ){
set_time_limit(0);
ignore_user_abort(0);
ob_end_clean(); ob_start();
eHTML("");
echo str_repeat(' ',1024).'</head><body>';
}
echo "<script type='text/javascript'>top.eProgress(window,{$Realizado},'{$Titulo}','{$TextoEnBarra}','{$TextoDetalle}')</script>";
if( $Realizado==100 ) echo '</body></html>';
$Contenido = ob_get_contents();
ob_end_clean();
echo $Contenido;
if( $Realizado==100 ){
eEnd();
}
ob_flush(); flush();
ob_end_clean(); ob_start();
}
function eProgressHidden($Sonido='M'){
$Contenido = ob_get_contents();
ob_end_clean();
echo "<script type='text/javascript'>";
echo "top.eProgress(window,100);";
echo "top.eLoading(0,window)</script>";
ob_flush(); flush();
ob_end_clean(); ob_start();
}
function eZipFile($FileZip, $Files){
if( !function_exists("_eZipFile") ) include($GLOBALS["Dir_"]."itm/zip.php");
return _eZipFile($FileZip, $Files);
}
function eZipDirectory($Dir, $FileZip, $Ext=NULL, $NoExt=NULL){
if( !function_exists("_eZipDirectory") ) include($GLOBALS["Dir_"]."itm/zip.php");
return _eZipDirectory($Dir, $FileZip, $Ext, $NoExt);
}
function eZipDir($file){
if( !function_exists("_eZipDir") ) include($GLOBALS["Dir_"]."itm/zip.php");
return _eZipDir($file);
}
function eUnZip($Zip, $Dir, $Files=""){
if( !function_exists("_eUnZip") ) include($GLOBALS["Dir_"]."itm/zip.php");
return _eUnZip($Zip, $Dir, $Files);
}
function eLink($File, $FileToCopy=''){
$File = eFileName($File);
if( $FileToCopy!='' && $FileToCopy[0]=='+' && !file_exists("{$_SESSION['_PathCSS']}/{$File}.css") ) copy("{$_SESSION['_PathCSS']}/".substr($FileToCopy,1).".css", "{$_SESSION['_PathCSS']}/{$File}.css");
$suf = "?".rand(1000, 9999);
echo "<LINK REL='stylesheet' HREF='{$_SESSION['_PathCSS']}/{$File}.css{$suf}' TYPE='text/css'>";
if( file_exists("{$_SESSION['_PathCSS']}/{$File}_off.css") ){
echo "<LINK REL='off' id='CssOffWindow' HREF='{$_SESSION['_PathCSS']}/{$File}_off.css{$suf}' TYPE='text/css'>";
}
for($i=1; $i<func_num_args(); $i++){
$File = eFileName(func_get_arg($i));
if( $File[0]=='+' ) continue;
echo "<LINK REL='stylesheet' HREF='{$_SESSION['_PathCSS']}/{$File}.css{$suf}' TYPE='text/css'".((substr_count($File,'_print.')==0) ? '':" MEDIA='print'").">";
}
}
function eLinkPrint($File){
$suf = "?".rand(1000, 9999);
for($i=1; $i<func_num_args(); $i++) echo "<LINK REL='stylesheet' HREF='{$_SESSION['_PathCSS']}/".eFileName(func_get_arg($i)).".css{$suf}' TYPE='text/css' MEDIA='print'>";
}
function _FileNoCache($file, $inner=""){
$para = filemtime(__DIR__."/{$file}");
if( $inner<>"" ) $inner = " ".$inner;
echo '<SCRIPT type="text/javascript"'.$inner.' SRC="edes.php?R:$'.$file.'&j='.$para.'" charset="ISO-8859-1"></SCRIPT>'.$GLOBALS['__Enter'];
}
function isDate($v){
if( strlen((string)$v)!=10 ) return false;
return preg_match('/^([1-2]{1}[0-9]{3})\-([0-1]{1}[0-9]{1})\-([0-3]{1}[0-9]{1})$/', (string)$v);
}
function eYmd2Dmy($f){
if( strlen($f)==8 ){
return substr($f,6,2).'-'.substr($f,4,2).'-'.substr($f,0,4);
}else{
return substr($f,8,2).'-'.substr($f,5,2).'-'.substr($f,0,4);
}
}
function eDmy2Ymd( $f ){
if( strlen($f)==8 ){
return substr($f,4,4).'-'.substr($f,2,2).'-'.substr($f,0,2);
}else{
return substr($f,6,4).'-'.substr($f,3,2).'-'.substr($f,0,2);
}
}
function eDateDiff( $d1, $d2 ){
$dias = (strtotime($d1)-strtotime($d2))/86400;
return floor($dias);
}
function eDateOk($a, $m, $d){
$d = str_pad($d,2,'0',STR_PAD_LEFT);
$m = str_pad($m,2,'0',STR_PAD_LEFT);
return("{$a}{$m}{$d}"==date("Ymd",mktime(0,0,0, $m,$d,$a)));
}
function eDateSql($date=""){
$date = date("d-m-Y");
if( !eSqlType('oracle') && strlen($date)==10 && substr($date,2,1)=='-' && substr($date,5,1)=='-' ){
$date = substr($date,6,4).substr($date,2,4).substr($date,0,2);
}
return $date;
}
function eAge($fecha){
list($Y,$m,$d) = explode("-", $fecha);
return( date("md")<$m.$d ? date("Y")-$Y-1 : date("Y")-$Y );
}
function _eImgOpen($oImg){
clearstatcache();
if( preg_match('/\.gif$/i',$oImg) ) $fuente = @imageCreatefromGIF($oImg);
if( preg_match('/\.jpg$/i',$oImg) ) $fuente = @imageCreateFromJPEG($oImg);
if( preg_match('/\.png$/i',$oImg) ) $fuente = @imageCreateFromPNG($oImg);
if( preg_match('/\.bmp$/i',$oImg) ) $fuente = @imageCreateFromWBMP($oImg);
return $fuente;
}
function _eImgSave($imagen, $nImg){
if( preg_match('/\.gif$/i',$nImg) ) imageGIF($imagen, $nImg);
if( preg_match('/\.jpg$/i',$nImg) ) imageJPEG($imagen, $nImg);
if( preg_match('/\.png$/i',$nImg) ) imagePNG($imagen, $nImg);
if( preg_match('/\.bmp$/i',$nImg) ) imageWBMP($imagen, $nImg);
}
function _eImgHeader($Img){
if( preg_match('/\.gif$/i',$Img) ) header('Content-type: image/gif');
if( preg_match('/\.jpg$/i',$Img) ) header('Content-type: image/jpeg');
if( preg_match('/\.png$/i',$Img) ) header('Content-type: image/png');
if( preg_match('/\.bmp$/i',$Img) ) header('Content-type: image/bmp');
}
function eFieldName($tmp){
if( substr_count($tmp, ':')>0 ){
$tmp = substr($tmp, 0, strpos($tmp,':'));
}else if( substr_count($tmp, '{')>0 ){
$tmp = substr($tmp, 0, strpos($tmp,'{'));
}else if( substr_count($tmp, ' as ')>0 ){
list(,$tmp) = explode(" as ",$tmp);
}
return trim($tmp);
}
function eFileExtension($nmFile, &$viewOnline=false){
$viewOnline = preg_match('/(\.gif|\.png|\.jpg|\.jpeg|\.pdf|\.mp4)$/i', $nmFile);
return pathinfo($nmFile, PATHINFO_EXTENSION);
}
function eFileType($nmFile, &$viewOnline=false){
return eFileExtension($nmFile, $viewOnline);
}
function eFileName($nmFile){
return pathinfo($nmFile, PATHINFO_FILENAME);
}
function _CheckServer(){
if( file_exists('../_tmp/err/stop.total') ){
if( (filemtime('../_tmp/err/stop.total')+(15*60))<time() ){
$txt = date("H:m", filemtime('../_tmp/err/stop.total'));
die("<script type='text/javascript'>if(top.S)top.S.exitNow('{$txt}');else top.document.write('Sistema parado por mantenimiento.<br>Se avisó a las {$txt}.');</script>");
}
}else if( file_exists('../_tmp/err/stop.access') && !file_exists("../_tmp/err/{$_SESSION['_User']}.ord") ){
if( (filemtime('../_tmp/err/stop.access')+(15*60))<time() ){
$txt = date("H:m", filemtime('../_tmp/err/stop.access'));
die("<script type='text/javascript'>if(top.S)top.S.exitNow('{$txt}');else top.document.write('Sistema parado por mantenimiento.<br>Se avisó a las {$txt}.');</script>");
}
}else if( file_exists('../_datos/config/closeprogram.cdi') ){
if( $_SESSION['_LoginTime']<trim(file_get_contents('../_datos/config/closeprogram.cdi')) ){
die("<script type='text/javascript'>top.document.write('Lo sentimos, la sesión ha caducado, vuelva a entrar.');</script>");
}
}
}
function _TraceDevelopment(){
_CheckServer();
if( $_SESSION['_D_']=='' ) return;
$Dim = explode('-',date('y-m-d-H-i'));
$Dia = '';
for( $n=0; $n<3; $n++ ){
$v = base_convert($Dim[$n]+17,10,36);
if( strlen($v)==1 ) $v = '0'.$v;
$Dia .= $v;
}
$Hora = '';
for( $n=3; $n<5; $n++ ){
$v = base_convert($Dim[$n]+17,10,36);
if( strlen($v)==1 ) $v = '0'.$v;
$Hora .= $v;
}
$File = '../_d_/usr/'.date('Y').'.'.$_SESSION['_User'];
if( file_exists($File) ){
$fp = @fopen($File,"r");
fseek($fp, 0, SEEK_END);
$LongFile = ftell( $fp );
fseek($fp, -4, SEEK_END);
$UltimaHora = fgets($fp,5);
$Ayadir = '';
if( $UltimaHora!=$Hora ){
if( $LongFile>5000 ){
fseek($fp, -5000, SEEK_END);
}else{
fseek($fp, 0, SEEK_SET);
}
while( !feof($fp) ) $Linea = fgets($fp);
$UltimoDia = substr($Linea,0,6);
if( $UltimoDia!=$Dia ){
$Ayadir = 'D';
}else{
$Ayadir = 'H';
}
}
fclose($fp);
if( $Ayadir!='' ){
$fp = @fopen($File,"a");
if( $Ayadir=='D' ) fwrite($fp,chr(13).chr(10).$Dia);
fwrite($fp,",".$Hora);
fclose($fp);
}
}else{
file_put_contents($File,$Dia.','.$Hora);
}
}
function eDivide($a, $b){
return ($a!=0 ? $a/$b : 0);
}
function eGraphGet( $TIPO, $usuCursor, $Form, $TituloGrafica, $TitleCol, $TitleRow, $TituloLeyenda="", $Var=array() ){
if( !function_exists('eGraf') ) eInclude('graph');
$sForm = array();
$sCOLSOP = array();
for( $n=0; $n<count($Form); $n++ ){
$Tipo = (( $Form[$n][1]==0 ) ? '-':'-,' );
$Long = (( $Form[$n][1]==0 ) ? '10':'10,'.$Form[$n][1] );
$sForm[] = array($Form[$n][0],"Campo_{$n}",$Tipo,'T',$Long,'','-','','','','','',"Campo_{$n}");
$sCOLSOP[] = $Form[$n][2];
}
$res = eGraph( $TIPO, $usuCursor, $sForm, $sCOLSOP, $TituloGrafica, $TitleCol, $TitleRow, $TituloLeyenda, $Var );
if( count($res)==2 ){
return false;
}else{
return array( $res[0], $res[1],$res[4], $res[3] );
}
}
function eGetClientIP(){
if(		 $_SERVER['HTTP_CLIENT_IP'] ) return $_SERVER['HTTP_CLIENT_IP'];
else if( $_SERVER['HTTP_X_FORWARDED_FOR'] ) return $_SERVER['HTTP_X_FORWARDED_FOR'];
else if( $_SERVER['HTTP_X_FORWARDED'] ) return $_SERVER['HTTP_X_FORWARDED'];
else if( $_SERVER['HTTP_FORWARDED_FOR'] ) return $_SERVER['HTTP_FORWARDED_FOR'];
else if( $_SERVER['HTTP_FORWARDED'] ) return $_SERVER['HTTP_FORWARDED'];
else if( $_SERVER['REMOTE_ADDR'] ) return $_SERVER['REMOTE_ADDR'];
else return 'UNKNOWN';
}
function _CodigoScript( $txt='' ){
global $_SourceScript;
return substr(md5($_SourceScript),-6);
}
function eTest(){
if( !function_exists('_eTest') ) include_once(__DIR__.'/itm/etest.php');
$Dim = array();
$txt = 'call_user_func("_eTest"';
for( $i=0; $i<func_num_args(); $i++ ){
$Dim[$i] = func_get_arg($i);
$txt .= ',$Dim['.$i.']';
}
eval($txt.');');
}
function eTXTLOG($_TXTLOG, $_DBINDEX, $mode){
global $_Mode;
if( $mode=='' ) $mode = $_Mode;
$pkIndex = (($_TXTLOG[1]<>"") ? $_TXTLOG[1].'|' : '');
$tmp = explode(",",$_DBINDEX);
for($n=0; $n<count($tmp); $n++) $pkIndex .= $_POST[$tmp[$n]];
$query = str_replace('&_PSOURCE=WWORK','',$_SERVER['QUERY_STRING']);
$txt = "\n~[".$pkIndex."]".$_SESSION['_User']."|{$mode}|".$_SESSION['_Node']."|".date('YmdHis')."|{$query}\n";
foreach($_POST as $k=>$v){
if( $k<>'_MD5' ) $txt .= $k.'='.$v."\n";
}
if( $_TXTLOG[2]<>"" ) $_TXTLOG[0] .= '_'.date($_TXTLOG[2]);
error_log($txt, 3, eScript($_TXTLOG[0].'.log'));
}
function eUpload($file, $nom=""){
include(__DIR__.'/m/eupload.inc');
}
function eLabelList($tipo, &$txt="", $click="", $inner=""){
$colores = "";
if( $click!="" ) $click = " onclick='".str_replace(array('"', "'"), array("&#34;", "&#39;"), $click)."'";
if( strlen($tipo)>1 && $tipo[0]=="#" ){
list($lapiz,$papel) = explode(";", $tipo);
$resto = str_replace("{$lapiz};{$papel}", "", $tipo);
$colores = " style='color:{$lapiz};background-color:{$papel}{$resto}'";
$tipo = "";
}
$txt .= "";
$txt = "<span class='Shell {$tipo}'{$colores}{$click}{$inner}>{$txt}</span>";
return $txt;
}
function eBar($d){
if( gettype($d)!="array" ) $d = ["value"=>$d];
if( !isset($d["value"]) ) return "ERROR eBar()";
if( !isset($d["title"]) ) $d["title"] = "";
if( !isset($d["view"]) ) $d["view"] = "";
$vDecimal = preg_replace('/[^0-9]+/', '', $d["view"])*1;
$d["view"] = preg_replace('/[^%N]+/', '', strtoupper($d["view"]));
$tDecimal = preg_replace('/[^0-9]+/', '', $d["title"])*1;
$d["title"] = preg_replace('/[^Y]+/', '', strtoupper($d["title"]));
if( $d["view"]=="" ) $d["view"] = "%";
$title = "";
$mas = (($d["value"]>=0)? "+":"-");
$d["value"] = abs($d["value"]);
if( !isset($d["total"]) ){
$tpc = $d["value"];
$xNum = eNumberFormat($tpc, $vDecimal)."%";
}else if( isset($d["value"]) && isset($d["total"]) ){
$tpc = ($d["value"]*100)/$d["total"];
if( $d["view"]=="N" ){
$xNum = eNumberFormat($d["value"], $vDecimal);
if( $d["title"]=="Y" ){
$title = eNumberFormat($tpc, $tDecimal)."%";
$title = " title='{$title}'";
}
}else if( $d["view"]=="%" ){
$xNum = eNumberFormat($tpc, $vDecimal)."%";
if( $d["title"]=="Y" ){
$title = eNumberFormat($d["value"], $tDecimal);
$title = " title='{$title}'";
}
}
}
return "<div id='BAR'{$title}><div eType='{$mas}' style='width:{$tpc}%'>{$xNum}</div></div>";
}
function eAddButton($icon="", $label="", $click="", $title="", $inner="", $addClass=""){
$class = 'AddButton';
if( gettype($icon)=="array" ){
$label = $icon["label"];
$click = $icon["click"];
$title = $icon["title"];
$inner = $icon["inner"];
$classArray = $icon["class"];
$addClass = $icon["addClass"];
$icon = $icon["icon"];
}
$icon = trim($icon);
if( $icon!="" && !preg_match('/^<i.{1,}<\/i>$/i', $icon) && !preg_match('/^<img.{1,}>$/i', $icon) ){
$icon = eIcon($icon);
}
$click = str_replace('"','&#34;',$click);
$title = str_replace('"','&#34;',$title);
if( $click!="" ){
if( substr_count($click, "(")==0 ) $click .= "()";
$click = _AddPublic("", $click);
}
if( $classArray!="" ){
$class = $classArray;
}else if( is_numeric($addClass) ){
if( $addClass=="1" ) $addClass = "";
else $addClass = " AddButton{$addClass}";
}else if( $addClass!="" ){
$addClass = " ".trim($addClass);
}else{
$addClass = " AddButton2";
}
echo "<span class='{$class}{$addClass}' onclick=\"{$click}\" title=\"{$title}\" {$inner}>{$icon}{$label}</span>";
}
function eButtonList($dim){
$txt = "<span style='display:inline-block;margin-bottom:9px;'>";
for($n=0; $n<count($dim); $n++){
$css = trim($dim[$n][2]);
if( !preg_match('/margin\-left\:/i', $css) && $n>0 ) $css .= ";margin-left:5px;";
$txt .= eButton4($css, $dim[$n][0], $dim[$n][1], $dim[$n][3]." e-ButtonList=".$n, $dim[$n][4]);
}
$txt .= "</span>";
$GLOBALS["_BUTTONLIST"] = $txt;
}
function eButton4($tipo, $txt="", $click="", $inner="", $on){
if( $click!="" ) $click = " onclick='".str_replace(array('"', "'"), array("&#34;", "&#39;"), $click)."'";
eExplodeOne($tipo, ";", $class, $css);
if( trim($css)!="" ) $css = " style='{$css}'";
if( $on ){
$class .= " Activated";
$GLOBALS["_EVENTFIRE"] = $txt;
}
return "<span class='AddButton4 {$class}'{$css}{$click}{$inner}>{$txt}</span>";
}
function _AddPublic($ev, $txt){
if($txt[0]=="-") return substr($txt,1);
preg_match("/on{$ev}(=| =|	=)('| '|\"| \"|)/i", $txt, $xclick);
$ci = 'S.public(1);';
$cf = ';S.public();';
if( $ev=="" || count($xclick)==0 ){
if( trim($txt)[0]<>"<" ){
$txt = "{$ci}{$txt}{$cf}";
}
}else{
$i = strpos($txt, $xclick[0])+strlen($xclick[0]);
$c = substr(trim($xclick[0]), -1);
if( $c=="=" ){
$f = strpos($txt, " ", $i);
$centro = substr($txt, $i, $f-$i);
$txt = substr($txt,0,$i)."{{$ci}{$centro}{$cf}}".substr($txt,$f);
}else{
$f = strpos($txt, $c, $i);
$centro = substr($txt, $i, $f-$i);
$txt = substr($txt,0,$i)."{$ci}{$centro}{$cf}".substr($txt,$f);
}
}
return $txt;
}
function GrabaTmp($NomEti, $Contenido, &$Long, $NomFile="", $NomFuncCall=""){
global $_Include, $_TmpInclude, $php_errormsg, $__eLINE__, $__iSCRIPT__, $__iniSCRIPT__, $_DEBUG, $_TRACELABEL, $_Development, $_TmpPhpFile, $_DebugParseador;
if($_DebugParseador) eTron("{$NomEti}: ini");
$__iSCRIPT__ .= $NomEti.', ';
$_Include = $NomEti;
if( func_num_args()==3 ) $Long = strlen(ob_get_contents());
if( $_Development && !preg_match("/FUNCTION_EXISTS/i", $Contenido) ){
$Dim = explode("\n", trim($Contenido));
for($n=0; $n<count($Dim); $n++){
if( preg_match("/^FUNCTION /i", trim($Dim[$n])) ){
list($NomFunc) = explode('(', substr(trim($Dim[$n]),8));
if( function_exists(trim($NomFunc)) ){
list(,$NomEti) = explode('_',$NomEti);
$php_errormsg = ' Función "'.trim($NomFunc).'()" ya definida.';
_ExitPHP();
}
}
}
}
if( $NomFuncCall=="" ){
$Contenido = '<'.'?PHP /'.'/ '.$NomEti.chr(10).$Contenido.' ?'.'>';
}else{
$Contenido = '<'.'?PHP '							.chr(10).
"function {$NomFuncCall}(){"	.chr(10).
$Contenido					.chr(10).
'}'								.chr(10).
'?'.'>';
}
if( $NomFile=='' ){
$_TmpPhpFile++;
$_TmpInclude = '../_tmp/lcl/'.$_SESSION['_User'].'_'.$_TmpPhpFile;
}else{
$_TmpInclude = '../_tmp/lcl/'.$NomFile;
}
list(,$Eti) = explode('_',$NomEti);
if( $_DEBUG==2 && strtoupper($Eti)==$_TRACELABEL ){
$__eLINE__ = 2;
$Contenido = '<'.'?PHP '.'$__iniSCRIPT__ = "'.$_Include.'";'.' ?'.'>'."\n".$Contenido."\n";
file_put_contents($_TmpInclude.'.php', $Contenido);
$Dim = explode("\n", trim($Contenido));
$Contenido = '';
$EnPHP = false;
for($n=0; $n<count($Dim)-1; $n++){
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n]=='?'.'>' ) $EnPHP = false;
if( $EnPHP ){
$__eLINE__++;
if( $Old!='switch(' ) $Contenido .= '$__eLINE__='.$__eLINE__.";" . 'if( $php_errormsg!="" ){ eInit(); die("LINEA: ".$__eLINE__."   ERROR: ".$php_errormsg); }'."\n";
}
$Contenido .= $Dim[$n]."\n";
if( $Dim[$n]=='<'.'?' ) $EnPHP = true;
$Old = substr($Dim[$n],0,7);
}
}
file_put_contents($_TmpInclude, $Contenido);
if( $GLOBALS['_DEBUG']==2 ){
file_put_contents('../_tmp/log/'.$_SESSION['_User'].'_'.$NomEti.'.'.$GLOBALS['Opcion'], $_TmpInclude."\n".$Contenido);
}
$php_errormsg = '';
ini_set('track_errors', _TRACK_ERRORS);
error_reporting(_ERROR_REPORTING);
if($_DebugParseador) eTron("{$NomEti}: end");
return $_TmpInclude;
}
function _HeaderAdd(){
$charset = $_SESSION["_Charset"];
header("Content-Type: text/html; charset={$charset}");
}
function eOpCkeck( $OpAChequear ){
include_once(__DIR__.'/opcheck.inc');
return _eOpCkeck( $OpAChequear );
}
function eVarSave($NomVar, $dir){
file_put_contents(eScript($dir), serialize($NomVar));
}
function eVarGet($dir){
return unserialize(file_get_contents(eScript($dir)));
}
function px($v){
if( !preg_match('/px$/i', $v) ) $v.='px';
return $v;
}
function eContextFile($script, $FieldsReadOnly=""){
if( !$_SESSION['CONTEXTON'] ) return;
global $Dir_, $_Sql, $_HndDBSystem, $_Mode;
if( $_GET["_REG_"]<>"" && $_Mode=="l" && substr($script,0,11)<>"edes.php?D:" ) return;
if( $_Sql=="" ){
$tmpFile = '../_datos/config/sql.ini';
ini_set( 'track_errors', _TRACK_ERRORS );
eval( _LoadSqlIni( $tmpFile ) );
include( $Dir_.$_Sql.'.inc' );
_ShowError( $php_errormsg, $tmpFile );
}
if( $_SESSION['_eDes_']==1 ) $_SESSION['_iSql'] = $_Sql;
if( !$_HndDBSystem ) qConnectSystem();
if(substr($script,0,9)=="edes.php?"){
$script = substr($script,9);
list($script) = explode("&",$script);
}else if(substr($script,0,2)=="E:"){
list($script) = explode("&",$script);
}else if(substr($script,-1)=="="){
list($script) = explode("=",$script);
list(,$df)=explode(":",$_SERVER["QUERY_STRING"]);
list($df)=explode("&",$df);
if( substr_count($df,".")==0 ) $df.=".edf";
$script = "E:CallSrv={$df}&{$script}=";
}else{
list($script) = explode("&",$script);
}
if( (substr($script,2,1)==":" || substr($script,3,1)==":") && substr_count($script,'.')==0 ){
if( $script[0]=="G" ) $script .= ".gdf";
else $script .= ".edf";
}
$script = str_replace(["'",'"'], ["&#39;","&#34;"], $script);
$_HndDBSystem->qQuery("insert into gs_context
(		   cd_gs_conexion   ,			  context  ,    script  , pk_seek,   fields_readonly  , md5_fields ) values
({$_SESSION['_Connection_']}, {$_SESSION['_eDes_']}, '{$script}',   ''   , '{$FieldsReadOnly}',     ''     )");
}
function eContextUrl($url){
if( !$_SESSION['CONTEXTON'] ) return;
eContextPut($url);
if( substr_count($url,"_CONTEXT=")==0 ){
$url .= ((substr_count($url,"?"))?"&":"?").'_CONTEXT='.$_SESSION['_eDes_'];
}
return $url;
}
function eContextPut($script, $PKSeek="", $ConPost=true){
if( !$_SESSION['CONTEXTON'] ) return;
if(substr($script,-2)=="()" || substr($script,-3)=="();" ) return;
if( $_SESSION['_D_']!='' ) eTron("original: {$script}");
global $Dir_, $_Sql, $_HndDBSystem, $_ContextReadOnly, $_ContextFieldsMD5, $_ContextFieldsADD, $_DBSERIAL, $_Mode;
if( $_GET["_REG_"]<>"" && $_Mode=="l" ) return;
if( $_Sql=="" ){
$tmpFile = '../_datos/config/sql.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval( _LoadSqlIni( $tmpFile ) );
include( $Dir_.$_Sql.'.inc' );
_ShowError( $php_errormsg, $tmpFile );
}
if( $_SESSION['_eDes_']==1 ) $_SESSION['_iSql'] = $_Sql;
if( !$_HndDBSystem ) qConnectSystem();
$dim = array();
if( $ConPost ){
foreach($_ContextFieldsMD5 as $k=>$v) $dim[]=$k;
foreach($_ContextFieldsADD as $k=>$v) $dim[]=$k;
$dim = array_unique($dim, SORT_STRING);
sort($dim);
$ReadOnly = $_ContextReadOnly;
}else{
$ReadOnly = "";
}
$ListaFields = implode(";",$dim);
$md5fields = ($ListaFields<>"" ? md5($ListaFields) : "");
$DebugMd5 = ($_SESSION['_D_']!='') ? $ListaFields : "";
if( isset($_DBSERIAL) ) $FieldGet = $_DBSERIAL[1];
if(substr($script,0,9)=="edes.php?") $script = substr($script,9);
if(substr($script,0,3)=="Fa:" || substr($script,0,3)=="Ga:") $FieldGet = "";
if( substr_count($script,"&_SEEK&")>0 ){
list(,$seek) = explode("&_SEEK&",$script);
$ReadOnly = str_replace("&",";",$seek);
}
list($script) = explode("&",$script);
if( (substr($script,2,1)==":" || substr($script,3,1)==":") && substr_count($script,'.')==0 ){
if( $script[0]=="G" ) $script .= ".gdf";
else $script .= ".edf";
}
$script = str_replace(["'",'"'], ["&#39;","&#34;"], $script);
if( $_SESSION['_D_']!='' ){
eTron("memoriza: {$_SESSION['_eDes_']} - {$script} - {$ListaFields} - {$DebugMd5} - {$PKSeek}");
}
$_HndDBSystem->qQuery("insert into gs_context
(		   cd_gs_conexion   ,			  context  ,    script  ,   pk_seek  , fields_readonly,   md5_fields ,     field_get ,    debug_md5 ) values
({$_SESSION['_Connection_']}, {$_SESSION['_eDes_']}, '{$script}', '{$PKSeek}',  '{$ReadOnly}' , '{$md5fields}', '{$FieldGet}', '{$DebugMd5}')");
}
function eContextGet($Seek=""){
if( !$_SESSION['CONTEXTON'] ) return;
global $Dir_, $_Sql, $_HndDBSystem, $_Mode, $_CONTEXTFREE, $_ContextFieldsADD;
$error = "Operación no permitida";
if( $_Sql=="" ){
$tmpFile = '../_datos/config/sql.ini';
ini_set( 'track_errors', _TRACK_ERRORS );
eval( _LoadSqlIni( $tmpFile ) );
include( $Dir_.$_Sql.'.inc' );
_ShowError( $php_errormsg, $tmpFile );
}
if( $_SESSION['_eDes_']==1 ) $_SESSION['_iSql'] = $_Sql;
if( !$_HndDBSystem ) qConnectSystem();
list($script,$no) = explode("&",$_SERVER["QUERY_STRING"]);
if( preg_match("/(E:CallSrv=)/", $_SERVER['QUERY_STRING']) ){
list($no) = explode("=",$no);
$script .= "&{$no}=";
}
if( substr($_SERVER["QUERY_STRING"],0,2)=="S:" && $_GET["xSELECT"]<>"" ){
$script = $_GET["xSELECT"];
}
if( substr($script,2,1)==":" && substr_count($script,'.')==0 ){
if( $script[0]=="G" ) $script .= ".gdf";
else $script .= ".edf";
}
$script = str_replace(["'",'"','|'], ["&#39;","&#34;","&#124;"], $script);
if( $_GET['_CONTEXT']=="" ) $_GET['_CONTEXT'] = 1;
if( substr($script,0,2)=="D:" && $_GET["SUBLIST"]==1 ){
$tmp = explode("/",$script);
$file = $tmp[count($tmp)-1];
$dir = str_replace($file, "", $script);
$sql = "select * from gs_context where cd_gs_conexion={$_SESSION['_Connection_']} and context='{$_GET['_CONTEXT']}' and script like '{$dir}%'";
$_HndDBSystem->qQuery($sql);
$r = $_HndDBSystem->qArray();
list($pk) = explode(".",$file);
list(,$sufijo) = explode("{",$r["script"]);
$file = "../_tmp/php/".$_SESSION["_User"]."_".$_GET["_CONTEXT"].".srl.{$sufijo}";
$dim = file($file, FILE_IGNORE_NEW_LINES);
$t = count($dim);
for($n=0; $n<$t; $n++){
if( $dim[$n]==$pk ){
return true;
}
}
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( $_SESSION['_D_']!='' ){
$error = "NoPKSeek-DOC:<br>[{$r['pk_seek']}]<>[{$Seek}]<br>sql: [{$sql}]<br>QUERY_STRING: [".str_replace("%27","'",$_SERVER['QUERY_STRING']).']';
eTron( "\n".str_replace("<br>","\n",$error) );
}
eMessage( "".$error, 'HSE' );
return false;
}
$sql = "select * from gs_context where cd_gs_conexion={$_SESSION['_Connection_']} and context='{$_GET['_CONTEXT']}' and script='{$script}'";
if( $_SESSION['_D_']!='' ){
eTron($_SERVER["QUERY_STRING"]);
eTron($sql.' - ['.$Seek.']');
}
$_HndDBSystem->qQuery($sql);
$r = $_HndDBSystem->qArray();
if( $Seek<>"" && $r["pk_seek"]<>"" && $r["pk_seek"]<>$Seek ){
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( $_SESSION['_D_']!='' ){
$error = "NoPKSeek-1:<br>[{$r['pk_seek']}]<>[{$Seek}]<br>sql: [{$sql}]<br>QUERY_STRING: [".str_replace("%27","'",$_SERVER['QUERY_STRING']).']';
eTron( "\n".str_replace("<br>","\n",$error) );
}
eMessage( "".$error, 'HSE' );
}
if( trim($r["script"])=="" || $r["context"]<>$_GET['_CONTEXT'] ){
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( $_SESSION['_D_']!='' ){
$error = "NoPKSeek-2:".'<br>Mode: ['.$_Mode.']<br>Script: ['.$r["script"].']<br>Context DB: ['.$r["context"].'] <> Context GET: ['.$_GET['_CONTEXT'].']<br>sql: ['.$sql.']<br>QUERY_STRING: ['.str_replace("%27","'",$_SERVER['QUERY_STRING']).']';
eTron( "\n".str_replace("<br>","\n",$error) );
}
eMessage( "".$error, 'HSE' );
}
if( trim($r["md5_fields"])<>"" && $_SERVER["REQUEST_METHOD"]=="POST" ){
$dim2 = array();
foreach($_POST as $k=>$v) if( $k[0]<>"_" ) $dim2[] = $k;
foreach($_ContextFieldsADD as $k=>$v) $dim2[] = $k;
$dim = array();
$dim = array_unique($dim2, SORT_STRING);
sort($dim);
$dim = implode(";",$dim);
if( trim($r["md5_fields"])<>md5($dim) ){
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( $_SESSION['_D_']!='' ){
$error = "NoPKSeek-3 (error MD5 POST)".'<br>Mode: ['.$_Mode.']<br>fields: ['.$dim.']<br>debug_md5: ['.$r["debug_md5"].']<br>sql: ['.$sql.']<br>QUERY_STRING: ['.$_SERVER["QUERY_STRING"].']<br>Context DB: ['.$r["context"].'] <> Context GET: ['.$_GET['_CONTEXT'].']';
eTron("\n".str_replace("<br>","\n",$error));
}
eMessage("".$error, 'HSE');
}
}
if( trim($r['fields_readonly'])<>"" && $_SERVER["REQUEST_METHOD"]=="POST" ){
$tmp = explode(";",trim($r['fields_readonly']));
for($n=0; $n<count($tmp); $n++){
list($k,$v) = explode("=",$tmp[$n]);
if( $_POST[$k]<>$v ){
if( $_CONTEXTFREE[$k] ) continue;
if( $_POST[$k]=="" && preg_replace('[0,.]','',$v)=="" ) continue;
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( $_SESSION['_D_']!='' ){
$error = "NoPKSeek-4".'<br>method: '.$_SERVER["REQUEST_METHOD"].'<br>fields_readonly: '.$r['fields_readonly'].'<br>campo: "'.$k.'" = ['.$_POST[$k].']<>['.$v.']<br>sql: '.$sql;
eTron("\n".str_replace("<br>","\n",$error));
}
eMessage("".$error, 'HSE');
}
}
}
if( $_SERVER["REQUEST_METHOD"]=="GET" && (trim($r['field_get'])<>"" || preg_match("/(edes.php\?[DRr]:)/i", $_SERVER['QUERY_STRING'])) ){
global $_DBSERIAL, $_DBINDEX;
$sufijo = trim($r["field_get"]);
if( $sufijo<>"" ) $sufijo = ".{$sufijo}";
$file = "../_tmp/php/".$_SESSION["_User"]."_".$_GET["_CONTEXT"].".srl{$sufijo}";
$dim = file($file, FILE_IGNORE_NEW_LINES);
$t = count($dim);
if( $t==1 ) return;
if( $dim[0]==$_DBSERIAL[1] ){
$valor = $_GET[$_DBSERIAL[1]];
}else if( $dim[0]==$_DBINDEX ){
$valor = $_GET[$_DBINDEX];
}
for($n=1; $n<$t; $n++){
if( $dim[$n]==$valor ){
return $r;
}
}
if( $_SESSION['_D_']!='' ){
$error = "NoPKSeek-5".'<br>field_get ['.$r['field_get'].']<br>serial ['.$valor.']<br>file seriales ['.$file.']<br>sql ['.$sql.']<br>QUERY_STRING ['.$_SERVER['QUERY_STRING'].']';
eTron("\n".str_replace("<br>","\n",$error));
}
eMessage("".$error, 'HSE');
}
if( $_Mode=="l" && $r["pk_seek"]<>"" && $r["pk_seek"]<>str_replace("'","",$_GET["_FILTER"]) ){
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( $_SESSION['_D_']!='' ){
$error = "NoPKSeek-6:<br>[{$r['pk_seek']}]<>[".str_replace("'","",$_GET["_FILTER"])."]<br>sql: [{$sql}]<br>QUERY_STRING: [".str_replace("%27","'",$_SERVER['QUERY_STRING']).']';
eTron("\n".str_replace("<br>","\n",$error));
}
eMessage("".$error, 'HSE');
}
if( trim($r['fields_readonly'])<>"" && $_SERVER["REQUEST_METHOD"]=="GET" && substr($_SERVER['QUERY_STRING'],0,3)<>"Fa:" && substr($_SERVER['QUERY_STRING'],0,3)<>"Ga:" ){
$tmp = explode(";",trim($r['fields_readonly']));
for($n=0; $n<count($tmp); $n++){
list($k,$v) = explode("=",$tmp[$n]);
if( $_GET[$k]<>$v ){
if( $_CONTEXTFREE[$k] ) continue;
if( $_POST[$k]=="" && isZero($v) ) continue;
if( !function_exists("eMessage") ) include_once($GLOBALS['Dir_'].'message.inc');
if( $_SESSION['_D_']!='' ){
$error = "NoPKSeek-7".'<br>method: '.$_SERVER["REQUEST_METHOD"].'<br>fields_readonly: '.$r['fields_readonly'].'<br>campo: "'.$k.'" = ['.$_POST[$k].']<>['.$v.']<br>sql: '.$sql;
eTron("\n".str_replace("<br>","\n",$error));
}
eMessage("".$error, 'HSE');
}
}
}
return $r;
}
function _genContext(){
if( !$_SESSION['CONTEXTON'] ) return;
global $_vF, $_ADDCODE, $_ADDBUTTON, $_ONCHANGE, $_DimInclude;
$DimCheck = array();
for($n=0; $n<count($_ADDBUTTON); $n++) $DimCheck[] = $_ADDBUTTON[$n][2];
for($n=0; $n<count($_ONCHANGE); $n++ ) $DimCheck[] = $_ONCHANGE[$n][1];
foreach($_ADDCODE as $k=>$v) foreach($v as $k2=>$v2) $DimCheck[] = $v2;
foreach($_DimInclude as $k2=>$v2){
if( $k2=="IncJ" ) continue;
foreach($v2 as $k=>$v){
if( $v<>"" && (substr_count($v,' src="')>0 || substr_count($v," src='")>0) ){
$Comilla = ((substr_count($v," src='")>0)? "'":'"');
$p = strpos($v," src=".$Comilla);
$ini = strpos($v, $Comilla, $p)+1;
$fin = strpos($v, $Comilla, $ini);
$url = substr($v, $ini, $fin-$ini);
$v = str_replace(" src=".$Comilla.$url.$Comilla, " src=".$Comilla.$url.'&_CONTEXT='.$_SESSION['_eDes_'].$Comilla, $v);
$_DimInclude[$k2][$k] = $v;
if( $url<>"" && $DimInsert[$url]=="" ){
eContextFile($url);
$DimInsert[$url] = 1;
}
}
}
}
$Dim = ['_JSHEAD', '_JSINI', '_JSEND', '_JSSELROW', '_JSONCLICKROW', '_PHPINI', '_PHPEND', '_HTMINI', '_HTMEND', '_ONCHANGE'];
for($i=0; $i<count($Dim); $i++){
$pk = trim($Dim[$i]);
$dim = explode("\n",$GLOBALS[$pk]);
for($n=0; $n<count($dim); $n++ ){
$txt = $dim[$n];
if( substr_count($txt,'S.window(')>0 || substr_count($txt,'top.eSWOpen(')>0 || substr_count($txt,'eCallSrv(')>0 || substr_count($txt,'location.href')>0 || substr_count($txt,'location.replace(') || substr_count($txt,'eUrl(') ){
$DimCheck[] = $txt;
}
}
while( substr_count($GLOBALS[$pk],'location.href')>0 ){
$txt = $GLOBALS[$pk];
$i = strpos($txt,'location.href');
$i2 = strpos($txt,'=',$i)+1;
$f = strpos($txt,';',$i);
$GLOBALS[$pk] = substr($txt,0,$i)."eUrl(".trim(substr($txt, $i2, $f-$i2)).")".substr($txt,$f);
}
$GLOBALS[$pk] = str_replace(
["location.replace", "eIWorkLocation("],
["eUrl"			   , "eUrl("],
$GLOBALS[$pk]
);
$txt = $GLOBALS[$pk];
if( substr_count($txt, '<iframe ')>0 ){
$Comilla = ((substr_count($txt," src='")>0)? "'":'"');
$p = strpos($txt," src=".$Comilla);
$ini = strpos($txt,$Comilla,$p)+1;
$fin = strpos($txt,$Comilla,$ini);
$url = substr($txt, $ini, $fin-$ini);
$txt = str_replace(" src=".$Comilla.$url.$Comilla, " src=".$Comilla.$url.'&_CONTEXT='.$_SESSION['_eDes_'].$Comilla, $txt);
$GLOBALS[$pk] = $txt;
if( $url<>"" && $DimInsert[$url]=="" ){
eContextFile( $url );
$DimInsert[$url] = 1;
}
}
}
$DimInsert = array();
for($n=0; $n<count($DimCheck); $n++ ){
$txt = trim($DimCheck[$n]);
$func = "";
if( substr_count($txt,'top.eSWOpen(')>0 ){
$txt = _SustituyeGF($txt);
$txt = substr($txt,strpos($txt,'top.eSWOpen('));
$txt = trim(substr($txt,strpos($txt,",")+1));
$pComilla = strpos(substr($txt,1),$txt[0]);
$pParentesis = strpos(substr($txt,1),")");
if($pParentesis>0 && ($pComilla==0 || $pParentesis<$pComilla) ) $pComilla = $pParentesis;
$func = substr($txt,1, $pComilla);
}else if( substr_count($txt,'eCallSrv(')>0 ){
$txt = _SustituyeGF($txt);
$txt = substr($txt,strpos($txt,'eCallSrv('));
$txt = trim(substr($txt,strpos($txt,",")+1));
$pComilla = strpos(substr($txt,1),$txt[0]);
$pParentesis = strpos(substr($txt,1),")");
if($pParentesis>0 && ($pComilla==0 || $pParentesis<$pComilla) ) $pComilla = $pParentesis;
$func = substr($txt,1, $pComilla);
if( substr_count($func,".php")==1 && substr_count($func,"edes.php")==0 && substr($func,0,2)<>"E:" ) $func = "E:".$func;
}else if( substr_count($txt,'location.href')>0 ){
$p = strpos($txt,'location.href');
$p = strpos($txt,"=",$p)+1;
$Comilla = trim(substr($txt,$p))[0];
$ini = strpos($txt,$Comilla,$p)+1;
$fin = strpos($txt,$Comilla,$ini);
$func = substr($txt, $ini, $fin-$ini);
}else if( substr_count($txt,'location.replace(')>0 || substr_count($txt,'eUrl(')>0 ){
if( substr_count($txt,'location.replace(')>0 ){
$p = strpos($txt,'location.replace(');
}else{
$p = strpos($txt,'eUrl(');
}
$p = strpos($txt,"(",$p)+1;
$Comilla = trim(substr($txt,$p))[0];
$ini = strpos($txt,$Comilla,$p)+1;
$fin = strpos($txt,$Comilla,$ini);
$func = substr($txt, $ini, $fin-$ini);
}else if( substr_count($txt,'S.window(')>0 ){
$p = strpos($txt,'S.window(')+1;
$Comilla = trim(substr($txt,$p))[0];
$ini = strpos($txt,$Comilla,$p)+1;
$fin = strpos($txt,$Comilla,$ini);
$func = substr($txt, $ini, $fin-$ini);
list($func) = explode("&",$func);
}
if( $func<>"" && $DimInsert[$func]=="" ){
if( $func=="edes.php?" ){
if( $_SESSION['_D_']!='' ) eTron('>>>>ERROR CALCULO>>> ['.trim($DimCheck[$n]).']['.$func.']');
continue;
}
eContextFile( $func );
$DimInsert[$func] = 1;
}
}
global $_HndDBSystem, $_CONTEXTSUBSELECT;
for($n=0; $n<count($_CONTEXTSUBSELECT); $n++ ){
$script = str_replace(["'",'"'], ["&#39;","&#34;"], $_CONTEXTSUBSELECT[$n]);
$_HndDBSystem->qQuery("insert into gs_context
(		   cd_gs_conexion   ,			  context  ,    script  , pk_seek, fields_readonly, md5_fields ) values
({$_SESSION['_Connection_']}, {$_SESSION['_eDes_']}, '{$script}',   ''   ,       ''       ,     ''     )");
}
}
function _DelimitadorGF($txt, $desde, $sumar){
if( $sumar>0 ){
$t = strlen($txt);
$desde = strpos($txt,")",$desde);
for( $n=$desde+1; $n<$t; $n++ ){
if( substr($txt,$n,1)=="'" or substr($txt,$n,1)=='"' ){
return $n;
}else if( substr($txt,$n,1)==')' ){
return $n-1;
}
}
}else{
for( $n=$desde-1; $n>0; $n-- ){
if( substr($txt,$n,1)=="'" or substr($txt,$n,1)=='"' ){
return $n;
}
}
}
return -1;
}
function _SustituyeGF($txt){
if( substr_count($txt,'eGF(')>0 ){
global $_vF;
$i = strpos($txt,'eGF(');
do{
$x = substr($txt,$i+4);
$deli = ltrim($x)[0];
$pi = strpos($txt,$deli,$i);
$pf = strpos($txt,$deli,$pi+1);
$iDeli = _DelimitadorGF($txt,$pi,-1);
$fDeli = _DelimitadorGF($txt,$pf,1);
$old = substr($txt, $iDeli, $fDeli-$iDeli+1);
$x = substr($x,1);
$x = substr($x,0,strpos($x,$deli));
$txt = str_replace( $old, $_vF[$x], $txt );
$i = strpos($txt,'eGF(',$i+1);
}while($i>0);
}
return $txt;
}
function _IsLabel($txt){
$txt = ltrim($txt);
if( $txt[0]=="[" ){
if( !preg_match('/(\])/', $txt) ) return false;
$txt = eMid($txt, "[", "]");
}else if( $txt[0]=="{" ){
if( !preg_match('/(\})/', $txt) ) return false;
$txt = eMid($txt, "{", "}");
}else return false;
return !preg_match('/([0-9]|\s|\t|\.|\,|\;|\:|\=|\-|\+|_|\'|\")/', $txt);
}
function _AtomizaLabel($Opcion, $buffer, &$Etiqueta, &$bufferData, &$tmp, &$OkModo, &$TipoEntrada="#", &$JsHtm=false, &$Comando="_", $_SubModo=""){
$i = strpos($buffer,']');
$Etiqueta = strtoupper(substr($buffer, 1, $i-1));
$bufferData = substr($buffer, $i+1);
$tmp = explode('|', str_replace('\|', '&#124;', $bufferData));
for($n=0; $n<count($tmp); $n++) $tmp[$n] = str_replace('&#124;', '|', trim($tmp[$n]));
$OkModo = eOkMode($Opcion, $tmp[0], $_SubModo);
$TipoEntrada = '#';
$JsHtm = false;
$Comando = '_'.$Etiqueta;
}
function _Atomizar($txt, &$tmp=array(), &$ok=false){
$i = strpos($buffer,']');
if( $i!==false ) $txt = substr($txt, $i+1);
$tmp = explode('|', str_replace('\|', '&#124;', $txt));
for($n=0; $n<count($tmp); $n++) $tmp[$n] = str_replace('&#124;', '|', trim($tmp[$n]));
$ok = eOkMode($GLOBALS["Opcion"], $tmp[0]);
}
function _addBuffer(&$buffer, &$nDimFCH, $_DimEDF){
while( substr($buffer,-1)=="|" ){
$nDimFCH++;
list($txt) = explode("/"."/", $_DimEDF[$nDimFCH]);
$txt = trim($txt);
if( $txt[0]=="[" ){
$nDimFCH--;
break;
}else{
$buffer .= $txt;
}
}
}
function eCall_DBGATEWAYONE($ok, $buffer=NULL, $tmp=NULL){
$GLOBALS["_DBGATEWAYONE"][] = $buffer;
}
function eCall_JSGATEWAYONE($ok, $buffer=NULL, $tmp=NULL){
$GLOBALS["_JSGATEWAYONE"][] = $buffer;
}
function eCall_ADDBUTTON($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "ADDBUTTON";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
$GLOBALS["_ADDBUTTON"][] = array($tmp[1], $tmp[2], $tmp[3], $tmp[4], $tmp[5], $tmp[6]);
}
}
}
function eCall_ONCHANGE($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "ONCHANGE";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
$tmp[2] = str_replace("'", '"', $tmp[2]);
$stmp = explode(',',eNsp($tmp[1]));
if( substr($tmp[2],-1)==';' ) $tmp[2] = substr($tmp[2],0,-1);
$tmp[4] = ((isset($tmp[4])) ? !(strtoupper($tmp[4])=='FALSE'||$tmp[4]=='0') : true);
for($n=0; $n<count($stmp); $n++){
$tmp[2] = str_replace('?','&',str_replace("'",'"',$tmp[2]));
$tmp[2] = str_replace('edes.php&','edes.php?',$tmp[2]);
if( substr_count($tmp[2],'.sdf&')>0 ) $tmp[2] = '_SelInfo(this.value,'.$tmp[2].');';
if( $tmp[2]!='' && substr($tmp[2],-1)!=';' ) $tmp[2] .= ';';
array_push($GLOBALS["_ONCHANGE"], array($stmp[$n], $tmp[2], $tmp[3], $tmp[4]));
if( $tmp[4] ) $GLOBALS["_EXEONCHANGE"][] = array($stmp[$n], str_replace('&#63;','?',$tmp[2]));
if( $tmp[5]<>"" ){
list($txt) = explode(".sdf", $tmp[2]);
$txt .= ".sdf";
$txt = substr($txt,max(strrpos($txt,"'"),strrpos($txt,'"'))+1);
$GLOBALS["_ADDCODE"][$stmp[$n]]["A"] = eIcon($tmp[5], 'onclick=_IconSDF("'.$txt.'","'.$stmp[$n].'");');
}
}
}
}
}
function eCall_ADDCODE($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "ADDCODE";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
if( count($tmp)>4 ) for($n=4; $n<count($tmp); $n++) $tmp[3] .= '|'.$tmp[$n];
$tmp[2] = strtoupper($tmp[2]);
if( $tmp[2]=='I' ) $tmp[3] = ' '.$tmp[3];
if( substr_count($tmp[3], "[")>0 && substr_count($tmp[3], "]")>0 ){
while( substr_count($tmp[3], "[")>0 && substr_count($tmp[3], "]")>0 ){
$txt = "";
$desde = strpos($tmp[3],"[");
$hasta = strpos($tmp[3],"]");
$Macro = trim(substr($tmp[3], $desde+1, $hasta-$desde-1));
eExplodeOne($Macro, ",", $icono, $dentro);
$txt = eIcon(trim($icono), _InVar($dentro));
$tmp[3] = substr($tmp[3],0,$desde).$txt.substr($tmp[3],$hasta+1);
}
}
$stmp = explode(',', eNsp($tmp[1]));
for($n=0; $n<count($stmp); $n++){
if( $tmp[2]=="I" ){
if( trim($tmp[3])=="NUMBERS" ){
$GLOBALS["_ADDCODE"][$stmp[$n]]["F"] = "NUMBERS";
continue;
}else{
$tmp[3] = " pp=1 ".$tmp[3];
}
}else{
$tmp[3] = str_replace(" onclick=", " pp=1 onclick=", $tmp[3]);
}
$GLOBALS["_ADDCODE"][$stmp[$n]][$tmp[2]] .= str_replace('\\n', "\n", $tmp[3]);
if( $tmp[2]=='I' && substr_count($tmp[3], " eAccent=")>0 ){
$GLOBALS["_EACCENT"][$stmp[$n]] = 1;
}
}
}
}
}
function eCall_TAB($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "TAB";
else{
global $Opcion, $_ZoneHide, $DOpcion, $DFichero, $DTitle, $TOpcion, $DFunction, $DSubOpcion, $TOpcion, $_BinaryMode;
if( $tmp==NULL ){
_Atomizar($buffer, $tmp, $ok);
$opNew = $_BinaryMode[$Opcion[0]];
if( $opNew<>"" ) $opNew = "|".$opNew;
$ok = preg_match('/('.$Opcion[0].$opNew.')/i', $tmp[0]);
}else{
$opNew = $_BinaryMode[$Opcion[0]];
if( $opNew<>"" ) $opNew = "|".$opNew;
$ok = preg_match('/('.$Opcion[0].$opNew.')/i', $tmp[0]);
}
if( $ok ){
if( preg_match('/-NoZone/i',$tmp[count($tmp)-1]) ){
$tmp[count($tmp)-1] = trim(preg_replace('/-NoZone/i','',$tmp[count($tmp)-1]));
$_ZoneHide .= ',1';
}else{
$_ZoneHide .= ',0';
}
if( substr_count($tmp[2], ".")==0 ) $tmp[2] .= '.edf';
$DOpcion[$TOpcion] = $tmp[1];
$DFichero[$TOpcion] = $tmp[2];
if( $tmp[3]!='' ) $DTitle[$TOpcion] = ' title="'.eQuote($tmp[3]).'"';
if( $tmp[4]!='' ) $DFunction[$TOpcion] = $tmp[4];
$DSubOpcion[$TOpcion][0] = $tmp[5];
$DSubOpcion[$TOpcion][1] = $tmp[6];
$DSubOpcion[$TOpcion][2] = $tmp[7];
if( $TOpcion==0 && ($Opcion=='cR' || $Opcion=='mR' || $Opcion=='bR') ){
$txt = _RecuperarDBRange($tmp[2], $Opcion);
}
$TOpcion++;
}
}
}
function eCall_ADDOPTION($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "ADDOPTION";
else{
if( $tmp==NULL ){
if( trim($buffer)=="" ) return;
_Atomizar($buffer, $tmp, $ok);
$dim = explode(",", $GLOBALS["_CallLabelField"]);
for($n=0; $n<count($dim); $n++){
if( $GLOBALS["_ADDOPTION"][$dim[$n]]<>"" ) $GLOBALS["_ADDOPTION"][$dim[$n]] .= ";";
$GLOBALS["_ADDOPTION"][$dim[$n]] .= _InVar(trim($buffer));
}
}
if( $ok ){
if( preg_match("/^SELECT /i", $tmp[2]) ){
if( $tmp[3]<>'' ){
if( strtoupper($tmp[3])=="BLANK" ){
$tmp[3] = '';
$GLOBALS["_ADDOPTIONBLANK"][$tmp[1]] = true;
}
}
}else if( $tmp[2][0]==">" ){
}else if( !eIn([",", ";"], $tmp[2]) && eIn(".", $tmp[2]) ){
$tmp[2] = eFileGetVar($tmp[2]);
}else if( $tmp[1]<>"" && $tmp[2]=="" ){
$tmp[1] = eNsp($tmp[1]);
$GLOBALS["_CallLabel"] = "ADDOPTION";
$GLOBALS["_CallLabelField"] = $tmp[1];
$dim = explode(",", eNsp($tmp[1]));
for($n=0; $n<count($dim); $n++) $GLOBALS["_ADDOPTION"][$dim[$n]] = "";
return;
}else{
}
$tmp2 = explode(';', eNsp($tmp[3]));
for($n=0; $n<count($tmp2); $n++){
if( $tmp2[$n]!='' ){
$tmp3 = explode(',',$tmp2[$n]);
$txt = '';
for($i=0; $i<count($tmp3); $i++){
if( $tmp3[$i]=='' ) continue;
switch( $i ){
case 0:
$txt .= 'color:'.$tmp3[$i].';';
break;
case 1:
$txt .= 'background-color:'.$tmp3[$i].';';
break;
case 2:
$txt .= 'font-weight:'.$tmp3[$i].';';
break;
}
}
$tmp2[$n] = $txt;
}else $tmp2[$n] = '';
}
$tmp1 = explode(',', eNsp($tmp[1]));
for($n=0; $n<count($tmp1); $n++){
$GLOBALS["_ADDOPTION"][$tmp1[$n]] = $tmp[2];
if( $tmp[3]<>'' ){
for($i=0; $i<substr_count($tmp[3], ';')+1; $i++){
if( $tmp2[$i]<>'' ){
$GLOBALS["_ADDOPTIONSTYLE"][$tmp1[$n]][$i] = $tmp2[$i];
}
}
}
}
}
}
}
function eCall_DELOPTION($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "DELOPTION";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
$GLOBALS["_DELOPTION"][] = array($tmp[1], $tmp[2]);
if( strtoupper($tmp[3])=='NOEMPTY' ) $GLOBALS["_FILLOPTION"][$tmp[1]] = true;
}
}
}
function eCall_ICON($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "ICON";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
$stmp = explode(',', str_replace(array(' ',"\t"), array('',''), $tmp[1]));
for($n=0; $n<count($stmp); $n++){
$GLOBALS["_ADDCODE"][$stmp[$n]]["E"] .= eIcon($tmp[2], " pp=1 ".$tmp[3], "", ((strtoupper($tmp[4])=="FILLED")? $stmp[$n]:""));
}
}
}
}
function eCall_RELATIONFIELDS($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "RELATIONFIELDS";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
$tmp[0] = eNsp($tmp[0]);
array_push($GLOBALS["_RELATIONFIELDS"], ','.$tmp[0].',');
if( eIn(",", $tmp[1]) ){
$tmp[1] = eNsp($tmp[1]);
$tmp1 = explode(",", $tmp[1]);
$tmp0 = explode(",", $tmp[0]);
if( $tmp0[0]==$tmp1[0] ){
$tmp[1] = substr($tmp[1], strlen($tmp1[0])+1);
$GLOBALS["_SELECTFREE"][$tmp0[1]] = $tmp1[0];
}
}
if( $tmp[1]!='' ){
$GLOBALS["_RELATIONJUMP"][$tmp[1]] = 1;
$tmp2 = explode(',', $tmp[0]);
if( $tmp[2]!='' && (strtoupper($tmp[2])=='FALSE' || $tmp[2]=='0') ){
$GLOBALS["_RELATIONJUMP"][$tmp[1]] = 2;
for($i=0; $i<count($tmp2); $i++) if( $tmp2[$i]==$tmp[1] ){
$GLOBALS["_RELATIONJUMP"][$tmp[1].'Jump'] = $tmp2[$i+1];
break;
}
}
for($i=0; $i<count($tmp2); $i++) if( $tmp2[$i]==$tmp[1] ){
$GLOBALS["_ADDOPTIONVALUE"][$tmp2[$i+1]] = $tmp[1];
break;
}
}
if( $tmp[3]!='' ){
if( $tmp[3]=='*' ) $tmp[3] = $tmp[0];
$tmp = explode(',', eNsp($tmp[3]));
for($i=0; $i<count($tmp); $i++) $GLOBALS["_SUBSELECTMEMORY"][$tmp[$i]] = true;
}
}
}
function eCall_SHOWFIELDS($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "SHOWFIELDS";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
$p = strpos($buffer, "|", strpos($buffer, "|")+1);
$GLOBALS["_SHOWFIELDS"][$tmp[1]] = trim(substr($buffer,$p+1));
}
}
}
function eCall_WHERESELECT($ok, $buffer=NULL, $tmp=NULL){
if( $buffer=="" ) $GLOBALS["_CallLabel"] = "WHERESELECT";
else{
if( $tmp==NULL ) _Atomizar($buffer, $tmp, $ok);
if( $ok ){
array_push($GLOBALS["_WHERESELECT"], array($tmp[1], $tmp[2]));
$GLOBALS["_pWHERESELECT"][$tmp[1]] = $tmp[2];
}
}
}
function eCurl($url, $dim, $eDesKey=null, $header=null){
if( $eDesKey!=null ){
$dataJson = json_encode($dim);
}
$ch = curl_init();
if( $ch===false ){
return false;
}else{
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
if( $eDesKey!=null ){
curl_setopt($ch, CURLOPT_POSTFIELDS, $dataJson);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
"eDesKey: ".$eDesKey,
"Content-Type: application/json",
"Content-Length: ".strlen($dataJson))
);
}else{
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($dim));
if( $header!=null ){
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
}
}
curl_setopt($ch, CURLOPT_TIMEOUT, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$res = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
if( $httpCode!=200 ) return "ERROR: ".$httpCode;
return $res;
}
}
function eHexToRGB($c){
$rgb=array();
if( $c[0]=="#" ) $c = substr($c,1);
for($n=0; $n<=2; $n++) $rgb[$n] = intval(substr($c,$n*2,2),16);
return $rgb;
}
function eColorLuma($c){
$c = eHexToRGB($c);
return(0.2126*$c[0]) + (0.7152*$c[1]) + (0.0722*$c[2]);
}
function eColorContrastBW2($c){
return(eColorLuma($c)>=165)?"#000000":"#FFFFFF";
}
class S {
public function __construct(){}
public function __destruct(){}
public function check($exe){
if( !isset($_ENV["."][$exe]) ){
return;
}
list($op, $type) = explode(".", $exe);
if( !method_exists(S, $op) ){
spl_autoload_register(function($op){
$file = 'class.'.$op.'.inc.php';
if( file_exists($file) ){
include('class.'.$op.'.inc.php');
}else{
eEnd('El metodo "S.'.$op.'" no existe');
}
});
return $op::exe($_ENV['.'][$exe]);
}
S::toHtml($exe);
return S::$op($exe, $type);
}
private function button($op, $type){
$res = "";
for($n=0; $n<count($_ENV['.'][$op]); $n++){
$var = $_ENV['.'][$op][$n];
if( $var['click']=='' && $var['options'] ){
if( $var['type']=='multiple' ){
$txt = '[';
$dim = $var['options'];
$t = count($dim);
for($i=0; $i<$t; $i++){
$txt .= ($i>0? ',':'').'["'.join('","', $dim[$i]).'"]';
}
$txt .= ']';
$var['click'] = ' onclick=\'eFilterSelect('.$var['field'].','.$var['titleWin'].','.$txt.')\'';
}else if( $var['type']=='simple' ){
$txt = '[["-'.substr($var['titleWin'],1,-1).'"]';
$dim = $var['options'];
$t = count($dim);
for($i=0; $i<$t; $i++){
$txt .= ',["'.$dim[$i][1].'","","'.$dim[$i][0].'"]';
}
$txt .= ']';
$var['click'] = ' onclick=\'S(this).menu('.$txt.',{function:eFilterOne, scroll:true}, '.$var['field'].')\'';
}
}
if( $type=='bar' ){
$txt = '<span class="Button ROUNDED2 SHADOW"'.$var['click'].$var['inner'].'>'.
'<span class="ButtonIn ROUNDED2">'.
$var['icon'].
$var['label'].
'</span></span>';
}
if( $var['return'] ){
$res .= $txt;
}else{
if( $n>0 ) echo ' ';
echo $txt;
}
}
unset($_ENV['.'][$op]);
return $res;
}
private function toHtml($op){
if( count($_ENV['.'][$op][0])==0 ) $_ENV['.'][$op] = [$_ENV['.'][$op]];
$t = count($_ENV['.'][$op]);
for($n=0; $n<$t; $n++){
$var = &$_ENV['.'][$op][$n];
$icon = $var['icon'] ?? '';
if( $icon!='' ) $icon = eIcon($icon,'','ICONWINDOW').' ';
$var['icon'] = $icon;
$var['label'] = $var['label'] ?? '';
$type = $var['type'] ?? 'simple';
if( $type=="function" ){
$var['onclick'] = str_replace(array('"',"'"), array('&#34;','&#39;'), $var['onclick']);
if( preg_match('/[\(\)]/', $var['onclick']) ){
$var['click'] = ' onclick="'.$var['onclick'].';"';
}else{
$var['click'] = ' onclick="'.$var['onclick'].'();"';
}
}else{
if( !preg_match('/^(|multiple|simple)$/i', $type) ) $type = "";
else $type = strtolower($type);
$click = $var['click'] ?? '';
if( $click!='' ) $click = ' onclick='.$click;
$var['click'] = $click;
}
$inner = $var['inner'] ?? '';
if( $inner!='' ) $inner = ' '.$inner;
$var['inner'] = $inner;
$title = $var['title'] ?? '';
if( $title!='' ) $title = ' title="'.addslashes($title).'"';
$var['inner'] .= $title;
$titleWin = $var['titleWin'] ?? '';
$var['titleWin'] = '"'.str_replace(array('"',"'"), array('&#34;','&#39;'), $titleWin).'"';
$field = $var['field'] ?? '';
$var['field'] = '"'.$field.'"';
$return = $var['return'] ?? false;
$var['return'] = $return;
$options = $var['options'] ?? '';
if( $options!='' ){
$options = trim($options);
if( preg_match('/\;/', $options) ){
$tmp = explode(";", $options);
$dim = [];
for($i=0; $i<count($tmp); $i++){
$item = explode(",", $tmp[$i]);
$dim[] = [trim($item[0]), trim($item[1])];
}
$options = $dim;
}else{
if( !preg_match('/(\ |\:)/', $options) ) $options = ":".$options;
if( preg_match('/\:/', $options) ){
$cmp = substr(trim(explode(":", $options)[1]),3);
$options = "select cd_{$cmp},nm_{$cmp} from {$cmp} order by nm_{$cmp}";
}
if( preg_match('/^[\s\t]*select\b/i', $options) ){
$dim = [];
qQuery($options, $p);
while($r=qRow($p)){
$r[1] = addslashes($r[1]);
$dim[] = $r;
}
$options = $dim;
}
}
}
$var['options'] = $options;
}
}
}
function gsAvisos($OtraDB, $DesdeMain=false){
}
?>
