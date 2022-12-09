<?PHP
session_start();
if( !isset($_SESSION['_User']) ){
include('index.htm');
exit;
}
$txt = '';
$DimValor = array_values($_GET);
for( $n=0; $n<count($DimValor); $n++ ) $txt .= $DimValor[$n];
$DimValor = array_values($_POST);
for( $n=0; $n<count($DimValor); $n++ ) $txt .= $DimValor[$n];
$txt .= $_SERVER['HTTP_COOKIE'];
$txt .= 'USU='.$_User;
$_FileCache = crc32(trim($txt));
if( file_exists( "../_tmp/cch/{$_FileCache}" ) ){
header("Expires: ".gmdate("D, d M Y H:i:s T",mktime(23,59,59)) );
header("Pragma: no-cache");
header("Content-Encoding: gzip");
header("Content-Disposition: inline; filename=page_cch.htm");
readfile("../_tmp/cch/{$_FileCache}");
exit;
}
$_CachearPag = true;
include( $Dir_.'edes.php' );
exit;
?>
