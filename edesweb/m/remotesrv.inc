<?PHP
$_SERVER['QUERY_STRING'] = substr($_SERVER['QUERY_STRING'],1);
if( isset($_REMOTESRV) ){
include($Dir_.'remotesrv.inc');
exit;
}
?>
