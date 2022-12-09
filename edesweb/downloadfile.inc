<?PHP
include_once($Dir_.'message.inc');
if( eFileGetVar("LogDownload.SaveInfo") && (substr($NomFile,-3)=="pdf" || substr($NomFile,-3)=="xls") ){
function getUserIpAddress(){
foreach(['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR'] as $key){
if( array_key_exists($key, $_SERVER) ){
foreach(array_map('trim', explode(',', $_SERVER[$key])) as $ip){
if( filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)!==false ){
return $ip;
}
}
}
}
return '?'; // Retornamos '?' si no hay ninguna IP o no pase el filtro
}
$txt = '|'.$_SESSION["_User"].'|'.$_SESSION["_Node"].'|'.date('YmdHis').'|'.$_SourceScript.'|'.$_TReg.'|'.getUserIpAddress();
$txt .= "|POST|POST"; foreach($_POST as $k=>$v) $txt .= "|{$k}|{$v}";
$txt .= "|GET|GET"; foreach($_GET as $k=>$v) $txt .= "|{$k}|{$v}";
$txt .= '|';
$txt = gzcompress($txt);
$txt = str_pad(strlen($txt)-7, 4, "0", STR_PAD_LEFT).$txt;
$fp = fopen(eScript($NomFile), "a");
fwrite($fp, $txt);
fclose($fp);
}
if( $_CACHEFILESRV!='' ) copy(eScript($NomFile), eScript($_CACHEFILESRV));
if( function_exists('uFileSupport') ) uFileSupport($NomFile);
if( $_SystemCopyTo<>'' ) copy(eScript($NomFile), $_SystemCopyTo);
$ConRemoto = (isset($_REMOTE_)) ? "R":"";
eContextFile("edes.php?{$ConRemoto}D:{$NomFile}");
eFileGetVar("LogFile", true);
$_xLogFile = "";
if( in_array($Extension, $_LOGFILE[0]) && ($_LOGFILE[1]==0 || $_TReg>=$_LOGFILE[1]) ) $_xLogFile = '&_LOG=1';
if( ($TypeFile=="*" || strtoupper($TypeFile)==$Extension) && ($MinRecords*1==0 || $_TReg>=$MinRecords) ){
$SaveTables = explode(",", str_replace(" ", "", $SaveTables));
if( in_array(trim(explode(" ", trim($_DBTABLE))[0]), $SaveTables) ) $_xLogFile = '&_LOG=1';
$SavePaths = explode(",", str_replace(" ", "", $SavePaths));
if( in_array(explode("/", $OriFichero)[0], $SavePaths) ) $_xLogFile = '&_LOG=1';
}
global $_TITLETOEXTRACT;
if( $_TITLETOEXTRACT[0]=='=' ) $_TITLETOEXTRACT = substr($_TITLETOEXTRACT,1);
$GLOBALS["_LOGREQUEST"]["title"] = $_TITLETOEXTRACT;
$_TITLETOEXTRACT = str_replace(array('<br>','<BR>'), array(' ',' '),$_TITLETOEXTRACT);
if( $_Estadistica && ((($_POST['_SendDocByMail']==1 || $_POST['_doc_password_']<>'') && ($_SESSION["LogTrace"]["D*"] || $_SESSION["LogTrace"]["D".$Extension])) || $_xLogFile<>"") ){
include('../../edesweb/itm/filetolog.php');
eFileToLog($NomFile, $_TReg, $Password, $Path);
}
if( $_POST['_SendDocByMail']==1 && isset($_POST['_doc_password_']) && $_POST['_doc_password_']=='-' ){
include('../../edesweb/itm/generatekey.php');
$_POST['_doc_password_'] = eGenerateKey();
}
if( $_POST['_doc_password_']<>'' ){
include('../../edesweb/itm/zip_pass.php');
eZipWithPassword($NomFile, $OriFichero, $_TReg, $_SubModo, $_TITLETOEXTRACT);
eEnd();
}
if( $_POST['_SendDocByMail']==1 ){
include('../../edesweb/itm/senddocmail.php');
eSendDocByMail($NomFile);
eEnd();
}
$addGet = "";
if( substr_count($_DownloadPDF, "&_DOWN=1")>0 ){
$addGet = '&_DOWN=1';
}else{
}
eContextFile("edes.php?{$ConRemoto}D:{$NomFile}");
eMessage('~'.$Extension,'HS','','try{_WOPENER.eHideBusy();}catch(e){};location.href = "edes.php?'.$ConRemoto.'D:'.$NomFile.$addGet.'&_CONTEXT='.$_SESSION['_eDes_'].'&_Source='.$OriFichero.'&_TReg='.$_TReg.'&_SubMode='.$_SubModo.$_xLogFile.'";');
eEnd();
?>
