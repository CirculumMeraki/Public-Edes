<?PHP
global $_HndDB, $_HndDBSystem;
if( $_SESSION["_D_"]=="" ) $pkError = rand(1000,9999);
$LogTxt = date('Y-m-d H:i:s')."\r\n".
"\tUSER...: ".$_SESSION["_User"]."\r\n".
(($_SESSION["_D_"]=="")? "\tPK.....: ".$pkError."\r\n":"").
"\tURL....: ".$_SERVER['REQUEST_URI']."\r\n".
"\tSQL....: ".$sql."\r\n".
"\tERROR..: ".$TxtError."\r\n";
$DimNomVar = array_keys($_POST); $DimValor = array_values($_POST);
$MasInfo = "\tPOST...: "."\r\n";
for($n=0; $n<count($DimNomVar); $n++) $MasInfo .= "\t\t ".$DimNomVar[$n].' = '.$DimValor[$n]."\r\n";
$DimNomVar = array_keys($_GET); $DimValor = array_values($_GET);
$MasInfo .= "\tGET....: "."\r\n";
for($n=0; $n<count($DimNomVar); $n++) $MasInfo .= "\t\t ".$DimNomVar[$n].' = '.$DimValor[$n]."\r\n";
error_log($LogTxt.$MasInfo."\n", 3, '../_tmp/err/_log.err');
error_log($LogTxt, 3, '../_tmp/err/_log_short.err');
if( $_HndDB ){
sql_TranBack();
sql_TranOn();
}
if( $_HndDBSystem ){
$_HndDBSystem->qTranBack();
$_HndDBSystem->qTranOn();
}
?>
