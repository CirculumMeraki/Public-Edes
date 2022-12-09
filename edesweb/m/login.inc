<?PHP
_SaveSession(count($_POST)==0);
if( $_POST['_eDes_']=="closed" || $_POST[$_SESSION["_Remember_"]]=="RecordarClave" ){
include($Dir_."login_ser_web.php");
eEnd();
}
if( $_SERVER["QUERY_STRING"]=="" ){
$_SESSION['_eDes_'] = 1;
$_SESSION['_TMP_'] = 1;
$_SESSION["QueryString"] = $_SERVER['QUERY_STRING'];
include($Dir_."navegador.php");
eEnd();
}else if( $_SERVER["QUERY_STRING"]=="login1" ){
$_SESSION['_eDes_'] = 2;
$_SERVER['QUERY_STRING'] = $_SESSION["QueryString"];
unset($_SESSION["QueryString"]);
include($Dir_."login_web.php");
eEnd();
}else if( $_SERVER["QUERY_STRING"]=="login2" ){
include($Dir_."login_ser_web.php");
eEnd();
}else{
eJS("top.S.theSessionHasExpired()");
session_destroy();
eEnd();
}
if( $_SERVER['QUERY_STRING']=="" && $_SESSION["QueryString"]<>"" ){
$_SERVER['QUERY_STRING'] = $_SESSION["QueryString"];
}
$tmp = explode( '/',str_replace('\\','/',$_SERVER['SCRIPT_FILENAME']));
if( $tmp[count($tmp)-3]=='edes' || substr_count( str_replace('\\','/',$_SERVER['SCRIPT_FILENAME']), '/edesweb/edes.php' )==1 ){
if( $_gsTron ) eTron('<03>');
die('ERROR: Ejecución no permitida');
}
if( strtoupper($_SERVER['QUERY_STRING'])!='U' ){
list($tmp,) = explode('&',$_SERVER['QUERY_STRING']);
if( count($_GET)==6 && $_GET['HR']!='' && $_GET['E']!='' && $_GET['U']!='' && $_GET['V']!='' && substr($tmp,0,5)=='E:$t/' && substr($tmp,-4)=='.php' ){
if( $_gsTron ) eTron('<3>');
include($Dir_.'edes.inc');
die("1");
}else if( !isset($_Accion) ){
if( $_SERVER['QUERY_STRING'][0]=='R' && substr_count($_SERVER['QUERY_STRING'],'.ind')==1 ){
}else if( substr($_SERVER['QUERY_STRING'],0,2)=='E:' ){
if( $_gsTron ) eTron('<5">');
include($Dir_.'edes.inc');
die("2");
}else{
if( $_gsTron ) eTron('<4>');
include($Dir_.'login_ser_web.php');
die("3");
}
}else{
_LoadSqlIni('_');
if( $_gsTron ) eTron('<5>');
include( $Dir_.'edes.inc' );
die("4");
}
unset($_SESSION['_TMP_']);
}
?>
