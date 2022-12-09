<?PHP
if( isset($_SESSION['_CDI_']) ){
if( $_gsTron ) eTron('Open:[t/cr.gs]');
_LoadSqlIni('_');
if( !isset($_SESSION['_Web_']) ){
$_User = -1; $_Tree = -1; $_Node = -1; $_Connection_ = 0; $_Web_ = '';
$_SESSION['_User'] = $_User;
$_SESSION['_Node'] = $_Node;
$_SESSION['_Connection_'] = $_Connection_;
$_SESSION['_Tree'] = $_Tree;
$_SESSION['_Web_'] = $_Web_;
}
$__='{#}eDes{#}';
include($Dir_.'t/cr.gs');
}else{
$tmp = explode( '/',str_replace('\\','/',$_SERVER['SCRIPT_FILENAME']));
if( $tmp[count($tmp)-2]!='http' || substr_count( str_replace('\\','/',$_SERVER['SCRIPT_FILENAME']), '/edesweb/edes.php' )==1 ){
if( $_gsTron ) eTron('<02>');
die('ERROR: Ejecución no permitida');
}
if( $_gsTron ) eTron('<4.>');
$_CDI_ = 3;
$_SESSION['_CDI_'] = $_CDI_;
include($Dir_.'login_cfg.gs');
}
exit;
?>
