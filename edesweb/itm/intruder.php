<?PHP
if( $GLOBALS['_gsID']!=getmypid() ) exit;
global $Dir_, $_Sql, $_HndDBSystem, $_User, $_Node, $_Connection_, $_Tree;
if( $_Sql=="" ){
$tmpFile = '../_datos/config/sql.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval(_LoadSqlIni($tmpFile));
include($Dir_.$_Sql.'.inc');
_ShowError($php_errormsg, $tmpFile);
}
if( $_SESSION['_eDes_']==1 ) $_SESSION['_iSql'] = $_Sql;
if( !$_HndDBSystem ) qConnectSystem();
$_HndDBSystem->qQuery("update gs_conexion set cdi_fin='".date('Y-m-d H:i:s')."' where conexion='{$_SESSION['_Connection_']}'");
eInit();
echo '<script type="text/javascript">top.Terminar();</script>';
eEnd();
?>
