<?PHP
global $Dir_;
$_User = $_SESSION['_User'];
if( $_User=='' ) $_User = '-1';
if( $_SERVER['PHP_SELF']=='/edesweb/http/edes.php' ){
$NomFile = $Dir_.'web/edesweb/_tmp/__tron.'.$_User;
}else{
$NomFile = substr($_SERVER['SCRIPT_FILENAME'],0,strrpos($_SERVER['SCRIPT_FILENAME'],'/'));
$NomFile = substr($NomFile,0,strrpos($NomFile,'/')).'/_tmp/__tron.'.$_User;
}
if( preg_match('/SQL/i', $borrar) ) $NomFile = str_replace('/_tmp/__tron.','/_tmp/log/sql.', $NomFile);
if( $para==null ){
@unlink($NomFile);
return;
}
if( gettype($para)!="array" ) $para = array($para);
for($n=0; $n<count($para); $n++){
$txt = $para[$n];
if( $caja ) $txt = '['.$txt.']';
error_log($txt."\n", 3, $NomFile);
}
?>
