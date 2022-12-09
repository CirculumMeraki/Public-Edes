<?PHP
if( file_exists(__FILE__.'.log') ){
list($i) = explode(' ',microtime());
error_log(date('Y-m-d H:i:s:').substr($i,2,8).': '.$_SERVER["QUERY_STRING"]."\n",3, __FILE__.'.log');
}
include('../edes.php');
?>
