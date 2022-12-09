<?PHP
function _PedirLogin_(){
eInit();
$url = _getURL($_SERVER);
if( $_SESSION["db_path"]!="" ){
$url = str_replace("/edes.php","",$url);
$url .= "/".$_SESSION["db_path"];
$_SESSION["db_path"] = "";
}
$file = "../_tmp/sess/sess_".$_COOKIE["PHPSESSID"];
if( file_exists($file) ) @unlink($file);
unset($_COOKIE["PHPSESSID"]);
unset($_SESSION['_User']);
$_SESSION = array();
session_destroy();
clearstatcache();
echo '<!DOCTYPE HTML><HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></HEAD><BODY><SCRIPT type="text/javascript">';
echo "setTimeout(function(){top.location.href='{$_SESSION['_DIRWEB']}';}, 100);";
echo '</SCRIPT></BODY></HTML>';
exit;
eEnd();
}
function _getURL($s, $use_forwarded_host=false){
$ssl = (!empty($s['HTTPS']) && $s['HTTPS']=='on')? true : false;
$sp = strtolower($s['SERVER_PROTOCOL']);
$protocol = substr($sp, 0, strpos($sp, '/')).(($ssl)? "s" : "");
$port = $s['SERVER_PORT'];
$port = ((! $ssl && $port=='80') || ($ssl && $port=='443'))? "" : ":".$port;
$host = ($use_forwarded_host && isset($s['HTTP_X_FORWARDED_HOST']))? $s['HTTP_X_FORWARDED_HOST'] : (isset($s['HTTP_HOST']) ? $s['HTTP_HOST'] : null);
$host = isset($host) ? $host : $s['SERVER_NAME'].$port;
return $protocol.'://'.$host.$s['REQUEST_URI'];
}
?>
