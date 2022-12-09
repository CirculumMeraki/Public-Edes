<?PHP
if( $_SERVER["REDIRECT_STATUS"]==404 && !isset($_SESSION) && $_SERVER["REQUEST_METHOD"]=="GET" ){
$txt = $_SERVER["REDIRECT_URL"];
$p = strrpos($txt, "/");
if( $p!==false ){
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-Type: text/html; charset=ISO-8859-1");
$tenan = trim(substr($txt,$p+1));
$url = substr($txt,0,$p);
$domain = $_SERVER['SERVER_NAME'];
if( !preg_match('/\./', $tenan) ){
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
$file = "../_datos/config/share.ini";
if( file_exists($file) ){
include($file);
include("../../edesweb/{$_Sql}.inc");
qQuery("select * from gs_sharedb where (db_path=('{$tenan}'))");
$r = qArray();
if( trim($r["db_path"])==$tenan ){
if( $r["status"]=="D" || $r["dt_delete"]!="" ){
die("Empresa de baja en el servicio desde ".$r["dt_delete"]);
}
foreach($r as $k=>$v) $r[$k] = trim($v);
session_start();
$_SESSION = array();
$_SESSION["pk_login"] = $r["pk"];
$_SESSION["pk_share"] = $r["pk"];
$_SESSION["db_path"] = $r["db_path"];
$_SESSION["db_hostname"] = $r["db_hostname"];
$_SESSION["db_dictionary"] = $r["db_dictionary"];
$_SESSION["db_user"] = $r["db_user"];
$_SESSION["dt_password"] = $r["dt_password"];
$tmp = explode("/", $_SERVER["REDIRECT_URL"]);
$n = count($tmp)-1;
if( $n>2 && $tmp[$n]==$tmp[$n-1] ){
$url = str_replace("/".$tmp[$n]."/".$tmp[$n], "/".$tmp[$n], $_SERVER["REDIRECT_URL"]);
header("Location: {$url}");
exit;
}
include("edes.php");
}
}
}
}
}
?>
