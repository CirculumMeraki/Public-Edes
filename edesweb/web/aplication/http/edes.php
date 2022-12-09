<?PHP
if( !isset($file) ) session_start();
error_reporting(5);
if( file_exists(__FILE__.'.log') ){
list($i) = explode(' ',microtime());
error_log(date('Y-m-d H:i:s:').substr($i,2,8).': '.$_SERVER["QUERY_STRING"]."\n",3, __FILE__.'.log');
}
if( isset($_SESSION["_TRACE_URL_"]) ) $_SESSION["_TRACE_URL_"][] = date('Y-m-d H:i:s:').substr(explode(" ",microtime())[0],2,8).': '.$_SERVER["QUERY_STRING"];
$_PathHTTP = str_replace(chr(92),'/',getCWD());
if( substr($_PathHTTP, -1)<>'/' ) $_PathHTTP .= '/';
if( $_SERVER["QUERY_STRING"]=='chat' || substr($_SERVER["QUERY_STRING"],0,12)=='chat&NMFILE=' ){
include('../../edesweb/chat.gs'); exit;
}else if( substr($_SERVER["QUERY_STRING"],0,12)=='UPLOAD&FILE=' ){
include('../../edesweb/up.inc'); exit;
}else if( substr($_SERVER["QUERY_STRING"],0,14)=='DOWNLOAD&FILE=' ){
include('../../edesweb/down.inc'); exit;
}else if( substr($_SERVER["QUERY_STRING"],0,13)=='PHPLOAD&FILE=' ){
include('../../edesweb/printtab.gs'); exit;
}else if( substr($_SERVER["QUERY_STRING"],0,8)=='session=' ){
include('../../edesweb/session.php');
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
include('../../edesweb/t/v30.gs'); exit;
}
}else if( $_GET["IC"]!='' && $_GET["IC"][0]=='$' ){
if( substr($_GET["IC"],-3)=='gif' ){
header("Content-Type: image/gif");
header("Last-Modified: ".gmdate("D, d M Y 00:00:01 T"));
header("Expires: ".gmdate("D, d M Y 23:50:50 T"));
header("Cache-Control: max-age");
die( file_get_contents( '../../edesweb/'.substr($_GET["IC"],1) ) );
}
}
include('../../edesweb/edes.php');
?>
