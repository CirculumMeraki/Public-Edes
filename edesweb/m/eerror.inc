<?PHP
$buffer = ob_get_contents();
ob_end_clean();
ob_start();
debug_print_backtrace();
$trace = "\t".str_replace(chr(10), chr(10)."\t", trim(ob_get_contents()));
ob_end_clean();
ob_start();
echo $buffer;
$tab = "\t";
$LogTxt = date('Y-m-d H:i:s')."\n".
$tab.'Usuario...: '.$_SESSION["_User"]."\n".
$tab.'Error.....: '.$Error."\n".
$tab.'RequestURI: '.explode("edes.php?", $_SERVER["REQUEST_URI"])[1]."\n".
$trace."\n";
error_log($LogTxt."\n", 3, '../_tmp/err/_log.err');
?>
