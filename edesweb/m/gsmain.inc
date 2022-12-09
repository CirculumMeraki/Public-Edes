<?PHP
$tmp = explode('/',str_replace('\\','/',$_SERVER['SCRIPT_FILENAME']));
if( $tmp[count($tmp)-2]!='http' || substr_count(str_replace('\\','/',$_SERVER['SCRIPT_FILENAME']), '/edesweb/edes.php')==1 ){
if( $_gsTron ) eTron('<01>');
die('ERROR: Ejecución no permitida');
}
if( $_gsTron ) eTron('Open:[t/ma.gs]');
_LoadSqlIni('_');
$_User = -1; $_Tree = -1; $_Node = -1; $_Connection_ = 0;
$_SESSION['_User'] = $_User;
$_SESSION['_Node'] = $_Node;
$_SESSION['_Connection_'] = $_Connection_;
$_SESSION['_Tree'] = $_Tree;
include($Dir_.'t/ma.gs');
exit;
?>
