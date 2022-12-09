<?PHP
function _eCallSrvRow($file){
eInit();
list($desde, $hasta) = explode(",", $_GET["_CALLSRVROW"]);
if( $desde==1 ) $_SESSION["_CALLSRVROW"] = array();
if( $file<>"" ) $_SESSION["_CALLSRVROW"][] = $file;
if( $desde==$hasta ){
if( $_SESSION["CALLSRVROW"][3]<>"" ){
$dim = array();
for($n=0; $n<count($_SESSION["_CALLSRVROW"]); $n++){
$dim[] = $_SESSION["_CALLSRVROW"][$n];
}
if( count($dim)>0 ) eZipFile("../_tmp/php/callsrv_{$_SESSION['_User']}.zip", $dim);
}
echo "<script>";
echo "top.S.modalDelete(window.frameElement.WOPENER); top.S.progressUpload();";
if( $_SESSION["CALLSRVROW"][3]<>"" ){
if( count($dim)>0 ){
echo "top.eCallSrv(window, 'edes.php?D:/_tmp/php/callsrv_{$_SESSION['_User']}.zip&FILE=".$_SESSION["CALLSRVROW"][3]."');";
}else{
echo "top.S.info('No hay ningún archivo para descargar', -1);";
}
}else{
echo "top.S.info('PROCESO TERMINADO', -1);";
}
echo "</script>";
}else{
echo "<script>";
echo "window.frameElement.WOPENER.{$_SESSION['CALLSRVROW'][1]}({$desde});";
echo "</script>";
}
eEnd();
}
?>
