<?PHP
if( $_SERVER["QUERY_STRING"][0]=="~" ){
list($txt) = explode("&_CONTEXT=", $_SERVER["QUERY_STRING"]);
if( strlen($txt)==64 && $txt[0]=="~" && substr($txt,-1)=="~" ){
if( file_exists("../_datos/config/".substr($txt,1,-1).".edes") ){
$tmp = explode('/', eGetCWD());
die(file_get_contents("../../edesweb/web/aplication/_datos/config/version_edes.cdi")." > ".$tmp[count($tmp)-2]);
}
}
}
exit;
?>
