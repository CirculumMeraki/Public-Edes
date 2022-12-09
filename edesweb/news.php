<?PHP
if( file_exists('../_tmp/err/stop.total') ){
$txt = file_get_contents('../_tmp/err/stop.total');
echo "top.S.exitToTime('{$txt}');";
}else if( file_exists('../_tmp/err/stop.access') && !file_exists("../_tmp/err/{$_SESSION['_User']}.ord") ){
$txt = file_get_contents('../_tmp/err/stop.access');
echo "top.S.exitToTime('{$txt}');";
}else if( file_exists('../_datos/config/closeprogram.cdi') ){
if( $_SESSION['_LoginTime']<trim(file_get_contents('../_datos/config/closeprogram.cdi')) ){
die("top.document.write('Lo sentimos, la sesión ha caducado, vuelva a entrar.');");
}
}
die("ok");
?>
