<?PHP
if( file_exists('../_tmp/err/stop.access') ){
if( !file_exists("../_tmp/err/{$UserOk}.ord") ){
$txt = rtrim(file_get_contents('../_tmp/err/stop.access'));
$txt = "Sistema parado por mantenimiento";
die("{$txt}");
}
}else if( file_exists('../_tmp/err/stop.total') ){
$txt = rtrim(file_get_contents('../_tmp/err/stop.total'));
$txt = "Sistema parado por mantenimiento";
die("{$txt}");
}
if( !isset($_SESSION["_BYPHONE"]) ) $_SESSION["_BYPHONE"] = false;
if( !isset($_POST["platform"]) || !isset($_POST["explorer"]) || !isset($_POST["resolution"]) ){
die("");
}
$Dir_ = dirname(__FILE__).'/';
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ) $Dir_ = str_replace('\\','/',$Dir_);
$_SESSION["_Platform_"] = $_POST["platform"];
$_SESSION["_Explorer_"] = $_POST["explorer"];
$_SESSION["_Resolution_"] = $_POST["resolution"];
setcookie('PHPSESSID', $_COOKIE['PHPSESSID'], 0, '/', '', false, true);
$Desencadenante = "";
if( $_SERVER['QUERY_STRING']<>"" ){
$Desencadenante = $_SERVER['QUERY_STRING'];
}
if( !isset($_Language) || $_Language=='' ) $_Language = 'es';
if( $sLNG=='' ){
$uLanguage = $_Language;
}else{
$uLanguage = $sLNG;
}
$uLanguage = "es";
if( !isset($_PathCSS) ) $_PathCSS = "css";
include_once('../_datos/config/desktop.ini');
$_SESSION["HackingProtection"] = $_HackingProtection;
eLngLoad( '../../edesweb/lng/login', $uLanguage, 1 );
if( isset($_SESSION['_User']) ){
$_LoginReal = false;
}else{
$_LoginReal = true;
}
function GetImage($Nombre, $Sufijo){
$File = $Nombre.$Sufijo;
if( file_exists($File.'.gif') ){
$File .= '.gif';
}else if( file_exists($File.'.png') ){
$File .= '.png';
}else if( file_exists($File.'.jpg') ){
$File .= '.jpg';
}else{
$File = $Nombre;
if( file_exists($File.'.gif') ){
$File .= '.gif';
}else if( file_exists($File.'.png') ){
$File .= '.png';
}else if( file_exists($File.'.jpg') ){
$File .= '.jpg';
}else{
return "";
}
}
return $File;
}
$_ImageLoginBackground	= GetImage( "{$_PathIMG}/login"			, "_{$uLanguage}" );
$_ImageBotonAccept		= GetImage( "{$_PathIMG}/login_accept"	, "_{$uLanguage}" );
$_ImageBotonCancel		= GetImage( "{$_PathIMG}/login_cancel"	, "_{$uLanguage}" );
$_ImageBotonRemember	= GetImage( "{$_PathIMG}/login_remember", "_{$uLanguage}" );
$_NoCache = "?".rand(1000,9999);
if( file_exists(str_replace( '.', '_'.$uLanguage.'.', $_LoginSecondImg)) ) $_LoginSecondImg = str_replace( '.', '_'.$uLanguage.'.', $_LoginSecondImg);
if( $_SESSION["_BYPHONE"] ){
$_LoginTitle = "MiBMS";
$_LoginPasswordLabel = "Login";
$_LoginUserLabel = "Password";
}
if( $_LoginSecondImg!='' && strlen($_LoginSecondFrom)==5 && strlen($_LoginSecondTo)==5 && file_exists($_LoginSecondImg) ){
list( $d,$m ) = explode('-',$_LoginSecondFrom);
$_LoginSecondFrom = "{$m}{$d}";
list( $d,$m ) = explode('-',$_LoginSecondTo);
$_LoginSecondTo = "{$m}{$d}";
if( $_LoginSecondFrom > $_LoginSecondTo ){
if( date('md')>=$_LoginSecondFrom || date('md')<=$_LoginSecondTo ) $_ImageLoginBackground = $_LoginSecondImg;
}else{
if( date('md')>=$_LoginSecondFrom && date('md')<=$_LoginSecondTo ) $_ImageLoginBackground = $_LoginSecondImg;
}
}
if( file_exists('../_datos/config/customize_login.php') && $_GET['USR']>0 ){
include('../_datos/config/customize_login.php');
}
$gsEdition = '';
$letra = "";
for( $i=65; $i<=90; $i++ ) $letra .= chr($i);
$l = substr($letra,rand(0,strlen($letra)-1),1);
$p = substr($letra,rand(0,strlen($letra)-1),1);
$r = substr($letra,rand(0,strlen($letra)-1),1);
for( $i=97; $i<=122; $i++ ) $letra .= chr($i);
for( $i=48; $i<=57; $i++ ) $letra .= chr($i);
for( $i=1; $i<64; $i++ ){
$l .= substr($letra,rand(0,strlen($letra)-1),1);
$p .= substr($letra,rand(0,strlen($letra)-1),1);
$r .= substr($letra,rand(0,strlen($letra)-1),1);
}
$_SESSION["_Login_"] = $l;
$_SESSION["_Password_"] = $p;
$_SESSION["_Remember_"] = $r;
$sso = explode(",", str_replace(" ","",eFileGetVar('Login.SSO')));
$ssoCheck = 0;
foreach($_COOKIE as $pk=>$val) if( in_array($pk, $sso) ) $ssoCheck++;
if( $ssoCheck>0 && $ssoCheck==count($sso) ){
if( !function_exists("qQuery") ){
$tmpFile = '../_datos/config/sql.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval( _LoadSqlIni( $tmpFile ) );
include( $Dir_.$_Sql.'.inc' );
_ShowError( $php_errormsg, $tmpFile );
$login = eEntityEncode($_COOKIE[$sso[0]], false);
qQuery("select * from gs_user where login='{$login}'");
$r = qArray();
$pass = $r["pass"];
$user = $r["cd_gs_user"];
}
eInit();
echo '<script type="text/javascript">location.href = "edes.php?E:$login_ser_web.php";</script>';
$_SESSION["_User"] = -$user;
$_SESSION["_x_y_z_"] = "{$login}|{$pass}|{$user}";
eEnd();
}
$_keyCase = eFileGetVar("Login.key_case");
$ParametroSrv = $_SERVER['QUERY_STRING'];
if( $ParametroSrv!="" && substr_count($ParametroSrv, "&")==1 ){
list( $xLogin, $xPass ) = explode('&',$ParametroSrv);
}
header("Content-Type: text/html; charset=ISO-8859-1");
?>
<!doctype html>
<html lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="Generator" content="gsEdit">
<meta name="Author" content="eDes">
<meta name="Keywords" content="eDes">
<meta name="Description" content="<?= $_SubTituloApli ?>">
<META HTTP-EQUIV='imagetoolbar' CONTENT='no'>
<title><?= eFileGetVar("Setup.ApplicationName") ?></title>
<style>
<?PHP
include("{$_PathCSS}/login_web.css");
?>
#MENSAJE {
position: absolute;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
display: none;
background: rgba(0,0,0,0.2);
cursor: pointer;
}
#MENSAJE SPAN {
display: inline-block;
background: #F5F5F5;
color: #333333;
border: 1px solid #A4A4A4;
padding: 20px;
-moz-border-radius: 10px;
-webkit-border-radius: 10px;
border-radius: 10px;
box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
-moz-box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
-webkit-box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
}
#TERMINAR {
position:absolute;
left:0px;
top:0px;
width: 100%;
height: 100%;
display: none;
background: rgba(0,0,0,0.5);
cursor: default;
}
#TERMINAR SPAN {
display: inline-block;
background: #D9534F;
color: #ffffff;
border: 1px solid #C02E29;
padding: 20px;
-moz-border-radius: 10px;
-webkit-border-radius: 10px;
border-radius: 10px;
box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
-moz-box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
-webkit-box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
}
<?PHP if( $_SESSION["_BYPHONE"] ){ ?>
.OPBUTTON {
cursor:pointer;
BACKGROUND-COLOR:#fefefd;
COLOR:#000000;
BORDER:#96CFDA 1px outset;
padding:10px 30px 10px 30px;
margin-right:10px;
-moz-border-radius: 10px;
-webkit-border-radius: 10px;
border-radius: 10px;
box-shadow: 4px 4px 6px rgba(0,0,0,0.2);
-moz-box-shadow: 4px 4px 6px rgba(0,0,0,0.2);
-webkit-box-shadow: 4px 4px 6px rgba(0,0,0,0.2);
}
.OPBUTTON:hover {
BACKGROUND-COLOR:#F0F0F0;
}
*, INPUT, DIV, #LabelLogin, #LabelPassword, #Login, #Password {
font-size: 50px;
}
#LabelTitle {
font-size: 60px;
}
<?PHP } ?>
</style>
<script type="text/javascript">
if( !/(Chrome|Google Inc|Opera|Vivaldi)/i.test(navigator.userAgent) ){
setTimeout(function(){
top.location.href = "edes.php?r:$nocompatible.htm";
}, 1);
}
<?PHP
@include_once('../_datos/config/desktop.ini');
if( $_UrlStatus!="" ){
echo "try{ history.pushState({foo:'bar'}, '-*-', '{$_UrlStatus}'); }catch(e){}";
}
?>
var PK = "<?=str_repeat(' ',date('s'))?>";
<?PHP
include($Dir_."_e.js");
?>
if( window!=top ) setTimeout(function(){
top.location.href = location.href;
}, 1);
function DGI(a){
var o = document.getElementById(a);
if( o==null ) o = document.getElementsByName(a)[0];
return o;
}
function eTrim(txt){
return txt.replace(/^\s+|\s+$/g,'').replace(/\s\s/g,' ');
}
function eventCode(ev){
return typeof ev.which=="number" ? ev.which : ev.keyCode;
}
function Init(){
var s = DGI("LabelTitle");
if( s.textContent.length<2 ){
s.parentNode.style.display = "none";
}
setTimeout(function(){
document.forms[0].elements[0].type = "text";
}, 1);
document.forms[0].elements[0].focus();
<?PHP
if( $xLogin<>"" ){
echo "Entrar();";
}else{
}
?>
}
function getPass(){
var pass = eTrim(document.forms[0].elements[1].value), pass2="", tmp;
<?PHP if( $Desencadenante<>"" ){ ?>
<?PHP
if( strlen($Desencadenante)>1 ){
$tmp = str_split($Desencadenante);
$txt = "(".implode("|",$tmp).")";
echo "pass = pass.replace(new RegExp('{$txt}','g'), '{$Desencadenante[0]}');";
}
?>
tmp = pass.split("<?= $Desencadenante ?>"[0]);
if( tmp.length > 1 ) pass = eTrim(tmp[1]);
<?PHP } ?>
if( pass.indexOf('&') > -1 ){
tmp = pass.split('&');
pass = tmp[0];
pass2 = _e_(tmp[1]);
}
<?PHP
if( $_keyCase==0 ){
echo "pass = pass.toUpperCase(pass);";
}else if( $_keyCase==1 ){
echo "pass = pass.toLowerCase(pass);";
}else{
}
?>
return _e_(pass)+pass2;
}
function Entrar(){
if( <?= (($_LoginReal) ? 'false':'true') ?> ) return;
var xError = "",
login = eTrim(document.forms[0].elements[0].value),
pass = eTrim(document.forms[0].elements[1].value);
if( pass=="" ) xError = '<?= $__Lng[5] ?>';
if( login=="" ) xError = '<?= $__Lng[2] ?>';
if( xError!="" ){
Mensaje( xError.replace(/&quot;/g,'"') );
event.returnValue = false;
return false;
}
call( "edes.php", {
<?=$_SESSION["_Login_"]   ?>:login,
<?=$_SESSION["_Password_"]?>:getPass(),
<?=$_SESSION["_Remember_"]?>:"",
_eDes_:document.forms[0].elements[3].value
});
<?PHP if( $_TwoStepVerificationType<>"" && $_TwoStepVerificationSg>0 ){ ?>
Mensaje("Confirmando acceso...");
<?PHP } ?>
}
function eSubmit(){
document.forms[0].style.display = "none";
document.forms[0].elements[1].value = getPass();
document.forms[0].submit();
}
function Cerrar(){
document.forms[0].elements[3].value = "closed";
document.forms[0].submit();
}
function call(url, datos){
var xhr = new XMLHttpRequest();
xhr.open("POST", url);
var data = new FormData(), v;
for(v in datos) data.append(v, datos[v]);
xhr.onload = function(){
if( xhr.status===200 ){
document.forms[0].elements[3].value = document.forms[0].elements[3].value*1+1;
xhr.responseText = eTrim(xhr.responseText);
eval(xhr.responseText);
}else{
Mensaje("Error en la conexión");
}
};
xhr.send(data);
}
function RecordarClave(){
if( <?= (($_LoginReal) ? 'false':'true') ?> ) return;
var xError = "";
if( eTrim(document.forms[0].elements[0].value)=="" ) xError = '<?= $__Lng[2] ?>';
if( xError!="" ){
Mensaje( xError.replace(/&quot;/g,'"') );
event.returnValue = false;
return false;
}
document.forms[0].elements[2].value = "RecordarClave";
document.forms[0].submit();
}
function Mensaje(txt){
DGI("TEXTO_MEN").innerHTML = txt;
DGI("MENSAJE").style.display = 'inline-table';
}
function Terminar(txt){
DGI("TEXTO_FIN").innerHTML = txt;
DGI("TERMINAR").style.display = 'inline-table';
document.forms[0].elements[0].value = "";
document.forms[0].elements[1].value = "";
}
function documentWrite(txt){
document.body.innerHTML = txt;
}
document.onkeydown = function(){
var k = eventCode(event);
if( k==121 ) Entrar();
else if( k==13 || k==9 ){
var campo = document.activeElement.id=="Login" ? "Password" : "Login";
DGI(campo).focus();
event.preventDefault ? event.preventDefault() : (event.returnValue = false);
event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
return false;
}
return true;
}
</script>
</head>
<body onload="Init()">
<?PHP if( !$_SESSION["_BYPHONE"] ){ ?>
<table width="100%" height="100%" cellpadding=0px cellspacing=0px border=0px><tr><td valign="middle" align="center">
<form action='<?=$nmBalanceo?>edes.php' method="POST" autocomplete='new-password' spellcheck='false'>
<TABLE id="RECIPIENTE" style='background-image:url(<?=$_ImageLoginBackground.$_NoCache?>);background-repeat:no-repeat;' border=0px cellspacing=0px cellpadding=0px>
<TR><TD align="left" valign="top">
<TABLE id="MarginForm" border=0px cellspacing=0px cellpadding=0px>
<TR>
<TD id="LabelTitle" colspan=2><?=$_LoginTitle?></TD>
</TR>
<TR>
<TD id="LabelLogin"><?=$_LoginUserLabel?></TD>
<TD><INPUT TYPE="text" NAME="<?=$_SESSION["_Login_"]?>" value="<?=$xLogin?>" id="Login" autocomplete="false" autofocus></TD>
</TR>
<TR id="InputSpacing" colspan=2><TD></TD></TR>
<TR>
<TD id="LabelPassword"><?=$_LoginPasswordLabel?></TD>
<TD><INPUT TYPE="password" NAME="<?=$_SESSION["_Password_"]?>" value="<?=$xPass?>" id="Password" autocomplete="false"></TD>
</TR>
<TR><TD><TD>
<TABLE id="MarginIconos" border=0px cellspacing=0px cellpadding=0px><TR>
<TD><IMG id="IconAccept" src="<?=$_ImageBotonAccept.$_NoCache?>" onclick="Entrar()" title='<?=$__Lng[11]?>'></TD>
<TD><IMG id="IconCancel" src="<?=$_ImageBotonCancel.$_NoCache?>" onclick="Cerrar()" title='<?=$__Lng[12]?>'></TD>
</TR></TABLE>
</TD></TR>
</TABLE>
</TD></TR>
<TR><TD>
<?PHP if( $_ImageBotonRemember<>"" ){ ?>
<IMG id="IconRemember" src="<?=$_ImageBotonRemember.$_NoCache?>" onclick="RecordarClave()" title='<?= $__Lng[14] ?>'>
<?PHP } ?>
<INPUT TYPE="text" name="<?=$_SESSION["_Remember_"]?>" value="" style="display:none">
<INPUT type="text" name="_eDes_" value="<?=$_SESSION['_eDes_']?>" style="display:none">
</TD></TR>
</TABLE>
</form>
</td></tr></table>
<?PHP }else{ ?>
<form action='<?=$nmBalanceo?>edes.php' method="POST" autocomplete='new-password' spellcheck='false'>
<DIV id="LabelTitle"><?=$_LoginTitle?></DIV>
<DIV id="LabelLogin"><?=$_LoginUserLabel?></DIV>
<DIV><INPUT TYPE="text" NAME="<?=$_SESSION["_Login_"]?>" value="<?=$xLogin?>" id="Login" autocomplete="false" autofocus></DIV>
<br>
<DIV id="LabelPassword"><?=$_LoginPasswordLabel?></DIV>
<DIV><INPUT TYPE="password" NAME="<?=$_SESSION["_Password_"]?>" value="<?=$xPass?>" id="Password" autocomplete="false"></DIV>
<br>
<DIV>
<table border=0px class="OPBUTTON" onclick="Entrar()" title='<?= $__Lng[11] ?>'>
<tr><td align="center" valign="middle">Entrar</td></tr>
</table>
</DIV>
<INPUT TYPE="text" NAME="<?=$_SESSION["_Remember_"]?>" value="" style="display:none">
<INPUT type="text" name="_eDes_" value="<?=$_SESSION['_eDes_']?>" style="display:none">
</form>
<?PHP } ?>
<table border=0px id="MENSAJE" onclick="this.style.display='none'">
<tr>
<td align="center" valign="middle">
<span id="TEXTO_MEN"></span>
</td>
</tr>
</table>
<table border=0px id="TERMINAR">
<tr>
<td align="center" valign="middle">
<span id="TEXTO_FIN"></span>
</td>
</tr>
</table>
</body>
</html>
