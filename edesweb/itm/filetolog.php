<?PHP
function eFileToLog($eFile, $_TReg, $Password, $Path){
global $_TITLETOEXTRACT, $_Connection_, $_HndDBSystem, $OriFichero;
global $_User, $_Node, $_SubMode, $Extension, $_TITLE, $_DBTABLE;
$TipoFile = strtolower(substr($eFile,-3));
if( $_SESSION["LogGsAccessFile"]=='' ){
$sTitle = eEntityEncode($_TITLE, false);
list($sTable) = explode(" ", trim($_DBTABLE));
$sTable = trim($sTable);
$Extension = strtolower($Extension);
if( $sTitle[0]=="=" ) $sTitle = trim(substr($sTitle,1));
if( !$_HndDBSystem ) qConnectSystem();
$_HndDBSystem->qQuery("insert into gs_log_file (cdi,type_file, script, records, cd_gs_node, cd_gs_user, title, nm_table) values('".date('Y-m-d H:i:s')."', '{$Extension}','{$OriFichero}', '{$_TReg}', '{$_Node}', '{$_User}', '{$sTitle}', '{$sTable}')");
$SerialDOC = $_HndDBSystem->qId();
$_HndDBSystem->qFree();
}else{
$SerialDOC = 't_'.time();
}
if( $Path!='' ){
if( substr($Path,-1)!='/' ) $Path .= '/';
if( $TipoFile!="zip" ){
$Dir = eGetCWD();
$pass = "";
if( $Password<>"" ){
$pass = " -P ".gzuncompress(base64_decode(substr($Password,3)));
}
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ){
$ExeZip = "zip";
}else{
$ExeZip = eScript('$win/zip.exe');
}
$ExeZip .= "{$pass} -9 -j -b {$Dir} ".eScript($Path).$SerialDOC." ".eScript($eFile);
$Dim = array();
exec($ExeZip, $Dim);
}else{
copy(eScript($eFile), eScript($Path).$SerialDOC.'.'.$TipoFile);
}
}
if( $_SESSION["LogGsAccessFile"]!='' ){
error_log(date('Y-m-d H:i:s')."|{$_User}|{$_Node}|{$_SESSION['_Connection_']}|{$_SERVER['QUERY_STRING']}|".eScript($Path)."{$SerialDOC}.zip\n", 3, $_SESSION["LogGsAccessFile"]);
}
}
function _transformaClave($clave){
$str = "abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ1234567890";
$prefijo = "";
for($i=0; $i<3; $i++){
$prefijo .= substr($str,rand(0,strlen($str)-1),1);
}
$encodado = base64_encode(gzcompress($clave, 9));
while( substr($encodado,-1)=="=" ) $encodado = substr($encodado,0,-1);
$newClave = $prefijo.$encodado;
return $newClave;
}
?>
