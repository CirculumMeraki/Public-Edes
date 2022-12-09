<?PHP
if( !function_exists("eMessage") ) include_once($GLOBALS["Dir_"].'message.inc');
function __Error($pk){
global $_Lng;
eLngLoad('$lng/error_sys.php.lng');
eMessage($_Lng[0].":<br>".$_Lng[$pk], "HSE");
}
?>
