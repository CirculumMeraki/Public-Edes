<?PHP
if( file_exists('../_tmp/err/stop.total') ){
$txt = rtrim(file_get_contents('../_tmp/err/stop.total'));
if( $txt=="" ) $txt = "Sistema parado por mantenimiento";
die("{$txt}");
}
if( !isset($_SESSION["_BYPHONE"]) ) $_SESSION["_BYPHONE"] = false;
$_SESSION["_DIRWEB"] = $_POST["dirweb"];
if( !isset($_POST["platform"]) || !isset($_POST["explorer"]) || !isset($_POST["resolution"]) ){
_PedirLogin();
exit;
}
$Dir_ = dirname(__FILE__).'/';
if( strtoupper(substr(PHP_OS,0,3))=='WIN' ) $Dir_ = str_replace('\\','/',$Dir_);
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
eLngLoad('../../edesweb/lng/login', $uLanguage, 1);
eLngLoad('../_datos/config/login', $uLanguage, 1);
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
function getImagenLogin(){
global $_PedirEmpresa;
$buscar = "";
if( $_PedirEmpresa || !eFileGetVar('Setup.Multitenancy') ){
$buscar = 'g/logo_desktop.*';
$_SESSION["pk_login"] = glob('g/logo_desktop.*')[0];
}else if( $_SESSION["pk_login"][0]=="g" ){
$buscar = $_SESSION["pk_login"];
}else{
$buscar = 'g/logos/'.$_SESSION["pk_login"].'_login.*';
$_SESSION["pk_login"] = glob('g/logos/'.$_SESSION["pk_login"].'_login.*')[0];
}
if( $_SESSION["pk_login"]=="" ){
eInit();
die('Falta el fichero "'.$buscar.'"');
}
return $_SESSION["pk_login"];
}
if( file_exists(str_replace('.', '_'.$uLanguage.'.', $_LoginSecondImg)) ) $_LoginSecondImg = str_replace( '.', '_'.$uLanguage.'.', $_LoginSecondImg);
if( $_LoginSecondImg!='' && strlen($_LoginSecondFrom)==5 && strlen($_LoginSecondTo)==5 && file_exists($_LoginSecondImg) ){
list($d, $m) = explode('-',$_LoginSecondFrom);
$_LoginSecondFrom = "{$m}{$d}";
list($d, $m) = explode('-',$_LoginSecondTo);
$_LoginSecondTo = "{$m}{$d}";
if( $_LoginSecondFrom > $_LoginSecondTo ){
if( date('md')>=$_LoginSecondFrom || date('md')<=$_LoginSecondTo ) $_ImageLoginBackground = $_LoginSecondImg;
}else{
if( date('md')>=$_LoginSecondFrom && date('md')<=$_LoginSecondTo ) $_ImageLoginBackground = $_LoginSecondImg;
}
}
$gsEdition = '';
$letra = "";
for( $i=65; $i<=90; $i++ ) $letra .= chr($i);
$l = substr($letra,rand(0,strlen($letra)-1),1);
$p = substr($letra,rand(0,strlen($letra)-1),1);
$r = substr($letra,rand(0,strlen($letra)-1),1);
for( $i=97; $i<=122; $i++ ) $letra .= chr($i);
for( $i=48; $i<=57; $i++ ) $letra .= chr($i);
for($i=1; $i<64; $i++){
$l .= substr($letra,rand(0,strlen($letra)-1),1);
$p .= substr($letra,rand(0,strlen($letra)-1),1);
$r .= substr($letra,rand(0,strlen($letra)-1),1);
}
$_SESSION["_Login_"] = $l;
$_SESSION["_Password_"] = $p;
$_SESSION["_Remember_"] = $r;
$_Setup = eFileGetVar('Login');
$_PedirEmpresa = false;
if( eFileGetVar('Setup.Multitenancy') ){
if( !$_SESSION["db_path"] ) $_PedirEmpresa = true;
if( $_SESSION["pk_login"]=="" || $_SESSION["pk_login"][0]=="g" ) $_PedirEmpresa = true;
if( $_PedirEmpresa ) unset($_SESSION["db_path"]);
}
$tmpFile = '../_datos/config/sql.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval(_LoadSqlIni($tmpFile));
$sso = explode(",", str_replace(" ","",$_Setup['Login.SSO']));
$ssoCheck = 0;
foreach($_COOKIE as $pk=>$val) if( in_array($pk, $sso) ) $ssoCheck++;
if( $ssoCheck>0 && $ssoCheck==count($sso) ){
if( !function_exists("qQuery") ){
include($Dir_.$_Sql.'.inc');
_ShowError($php_errormsg, $tmpFile);
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
$_keyCase = $_Setup["key_case"];
$ParametroSrv = $_SERVER['QUERY_STRING'];
if( $ParametroSrv!="" && substr_count($ParametroSrv, "&")==1 ){
list( $xLogin, $xPass ) = explode('&',$ParametroSrv);
}
$_Cookie = $_Setup["CookieName"];
if( $_Cookie=="" ) $_Cookie = "eDes";
$_CookieExpire = $_Setup["CookieDaysExpire"];
if( $_CookieExpire=="" ) $_CookieExpire = 365;
$_CookieExpire = (60*60*24*$_CookieExpire);
header("Content-Type: text/html; charset=ISO-8859-1");
?>
<!doctype html>
<html lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="Generator" content="gsEdit">
<meta name="Author" content="eDes">
<meta name="Keywords" content="eDes">
<meta name="Description" content="<?= $_SubTituloApli."-----" ?>">
<META HTTP-EQUIV='imagetoolbar' CONTENT='no'>
<?PHP
$logo = "";
if( file_exists("g/logo.ico") ) $logo = "logo";
if( $_Development && file_exists("g/logo_development.ico") ) $logo = "logo_development";
if( $logo!="" ) echo "<link id='FAVICON' rel='icon' href='g/{$logo}.ico' type='image/x-icon'/>";
?>
<title><?= eFileGetVar("Setup.TabTitle") ?></title>
<style>
<?PHP
include("{$_PathCSS}/login_web.css");
?>
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
*, INPUT, DIV, #LabelPath, #LabelLogin, #LabelPassword, #Login, #Password {
font-size: 50px;
}
#LabelTitle {
font-size: 60px;
}
<?PHP } ?>
</style>
<script type="text/javascript">
if( !/(Chrome|Google Inc|Opera|Vivaldi|Safari)/i.test(navigator.userAgent) ){
setTimeout(function(){
top.location.href = "edes.php?r:$nocompatible.htm";
}, 1);
}
if( !window.localStorage ){
setTimeout(function(){
document.write("La verisón del navegador no es compatible.");
}, 10);
}
top.document.title = "<?= eFileGetVar("Setup.TabTitle") ?>";
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
if( window!=top && !window.frameElement.getAttribute("eNORESIZE")==null ) setTimeout(function(){
top.location.href = location.href;
}, 1);
function DGI(a){
var el;
if( document.getElementById ){
el = document.getElementById(a);
}else if( document.all ){
el = document.document.all[a];
}else if( document.layers ){
el = document.document.layers[a];
}
return el || document.getElementsByName(a)[0] || null;
}
function eTrim(txt){
return txt.replace(/^\s+|\s+$/g,'').replace(/\s\s/g,' ');
}
function eventCode(ev){
return typeof ev.which=="number" ? ev.which : ev.keyCode;
}
function Init(){
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
var pass = eTrim(document.forms[0].elements["Password"].value), pass2="", tmp;
<?PHP if( $Desencadenante<>"" ){ ?>
<?PHP
if( strlen($Desencadenante)>1 ){
$tmp = str_split($Desencadenante);
$txt = "(".implode("|",$tmp).")";
echo "pass = pass.replace(new RegExp('{$txt}','g'), '{$Desencadenante[0]}');";
}
?>
tmp = pass.split("<?= $Desencadenante ?>"[0]);
if( tmp.length>1 ) pass = eTrim(tmp[1]);
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
DGI("IconAccept").style.visibility = "hidden";
var xError = "",
login = eTrim(document.forms[0].elements["Login"].value),
pass = eTrim(document.forms[0].elements["Password"].value),
path = null;
if( DGI("Path")!=null ) path = eTrim(document.forms[0].elements["Path"].value);
if( pass=="" ) xError = '<?= $__Lng[5] ?>';
if( login=="" ) xError = '<?= $__Lng[2] ?>';
if( path!=null && path=="" ) xError = '<?= $__Lng[16] ?>';
if( xError!="" ){
Mensaje(xError.replace(/&quot;/g,'"'));
event.returnValue = false;
DGI("IconAccept").style.visibility = "visible";
return false;
}
call("edes.php?login2", {
<?=$_SESSION["_Login_"]   ?>:login,
<?=$_SESSION["_Password_"]?>:getPass(),
<?=$_SESSION["_Remember_"]?>:"",
<?=(($_PedirEmpresa)? "Path:path,":"")?>
e_cdi:localStorage.getItem("e-cdi")||"",
e_language:localStorage.getItem("e-language")||"es",
_eDes_:document.forms[0].elements["eDes"].value
});
<?PHP if( $_TwoStepVerificationType<>"" && $_TwoStepVerificationSg>0 ){ ?>
Mensaje("Confirmando acceso...");
<?PHP } ?>
event.preventDefault ? event.preventDefault() : (event.returnValue = false);
event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
return false;
}
function eSubmit(){
document.onkeydown = null;
document.forms[0].style.display = "none";
document.forms[0].elements["Password"].value = getPass();
document.forms[0].submit();
}
function Cerrar(){
document.onkeydown = null;
document.forms[0].elements["eDes"].value = "closed";
document.forms[0].submit();
}
function call(url, datos){
var xhr = new XMLHttpRequest();
xhr.open("POST", url);
var data = new FormData(), v;
for(v in datos){
data.append(v, datos[v]);
}
xhr.onload = function(){
if( xhr.status===200 ){
document.forms[0].elements["eDes"].value = document.forms[0].elements["eDes"].value*1+1;
xhr.responseText = eTrim(xhr.responseText);
var res = eTrim(xhr.responseText);
eval(res);
DGI("IconAccept").style.visibility = "visible";
}else{
Mensaje("Error en la conexión");
}
};
xhr.send(data);
}
function RecordarClave(){
if( <?= (($_LoginReal) ? 'false':'true') ?> ) return;
var xError = "";
if( eTrim(document.forms[0].elements["Login"].value)=="" ) xError = '<?= $__Lng[2] ?>';
if( xError!="" ){
Mensaje(xError.replace(/&quot;/g,'"'));
event.returnValue = false;
return false;
}
document.onkeydown = null;
document.forms[0].elements["Remember"].value = "RecordarClave";
document.forms[0].submit();
}
function Mensaje(txt){
DGI("TEXTO_MEN").innerHTML = txt;
DGI("MENSAJE").style.display = 'inline-table';
}
function Terminar(txt){
DGI("TEXTO_FIN").innerHTML = txt;
DGI("TERMINAR").style.display = 'inline-table';
document.forms[0].elements["Login"].value = "";
document.forms[0].elements["Password"].value = "";
}
function documentWrite(txt){
document.body.innerHTML = txt;
}
document.onkeydown = function(){
var k = eventCode(event);
if( k==121 ) Entrar();
else if( k==13 || k==9 ){
var campo = "";
switch( document.activeElement.id ){
case 'Login':
campo = "Password";
break;
case 'Password':
if( DGI("Path")!=null ){
campo = "Path";
}else{
campo = "Login";
}
break;
case 'Path':
campo = "Login";
break;
}
DGI(campo).focus();
event.preventDefault ? event.preventDefault() : (event.returnValue = false);
event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
return false;
}
return true;
}
function cookieAcept(){
document.getElementsByClassName("cFOOT")[0].style.display = "none";
document.cookie = "<?=$_Cookie?>=S;max-age=<?=$_CookieExpire?>";
}
function verCookies(){
document.getElementsByClassName('cookieLongBoxExt')[0].style.display='block';
}
function _ViewPass(icon, pass){
if( icon.innerText=="y" ){
icon.innerText = "z";
document.forms[0].elements[pass].type = "text";
}else{
icon.innerText = "y";
document.forms[0].elements[pass].type = "password";
}
}
</script>
</head>
<body onload="Init()">
<?PHP if( !$_SESSION["_BYPHONE"] ){ ?>
<div class="cookieLongBoxExt">
<div class="cookieLongBox SCROLLBAR">
<table class="maxInfo" width=100% height=100%>
<thead>
<tr class="cookieLongTitle">
<th width=100%><?=$__Lng["cookies"]?></th>
<th style="cursor:pointer" title="<?=$__Lng[15]?>" onclick="document.getElementsByClassName('cookieLongBoxExt')[0].style.display='none';">x</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan=2 class="cookieLongText">
<?PHP
$file = file_get_contents("../_datos/config/cookies_long".(($_SESSION["_LANGUAGE_SUFFIX"]!="")?$_SESSION["_LANGUAGE_SUFFIX"]:"_".$_COOKIE["idioma"]).".html");
$file = str_replace("{EMAIL}", eFileGetVar("Setup.EMailSystem"), $file);
echo $file;
?>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<table width="100%" height="100%" cellpadding=0px cellspacing=0px border=0px>
<tr><td class="cHEAD">
<img style="cursor:default" src="<?=getImagenLogin()?>" id="LOGODESKTOP">
</td></tr>
<tr><td class="cBODY" valign="middle" align="center">
<form action='<?=$nmBalanceo?>edes.php?login2' method="POST" autocomplete='new-password' spellcheck='false' target="_top">
<div id="RECIPIENTE">
<div class="cTITLE">
<div class="Titulo1"><?=$__Lng["title1"]?></div>
<div class="Titulo2"><?=$__Lng["title2"]?></div>
</div>
<div class="cLOGIN">
<?PHP if( $_PedirEmpresa ){ ?>
<div id="LabelPath"><?=$__Lng["db_path"]?></div>
<div><INPUT TYPE="text" NAME="Path" value="<?=$xLogin?>" id="Path" autocomplete="false" autofocus></div>
<?PHP } ?>
<div id="LabelLogin"><?=$__Lng["login"]?></div>
<div>
<INPUT TYPE="text" NAME="<?=$_SESSION["_Login_"]?>" value="<?=$xLogin?>" id="Login" autocomplete="false" autofocus>
<span style="width:20px;display:inline-block;"></span>
</div>
<div id="LabelPassword"><?=$__Lng["password"]?></div>
<div>
<INPUT TYPE="password" NAME="<?=$_SESSION["_Password_"]?>" value="<?=$xPass?>" id="Password" autocomplete="false">
<span style="width:20px;display:inline-block;vertical-align:middle;">
<i class="ICONINPUT" onclick="_ViewPass(this, '<?=$_SESSION["_Password_"]?>')" title="Ver clave" style="font-family:eDes">y</i>
</span>
</div>
<div>
<span id="IconAccept" onclick="Entrar()" title='<?=$__Lng[11]?>'><?=$__Lng["submit"]?></span>
</div>
<div>
<span id="infRemember"><?=$__Lng["rememberPrefix"]?></span> <a id="IconRemember"  onclick="RecordarClave()" title='<?=$__Lng["rememberTitle"]?>'><?=$__Lng["rememberButton"]?></a>
</div>
</div>
</div>
<INPUT TYPE="text" name="<?=$_SESSION["_Remember_"]?>" value="" id="Remember" style="display:none">
<INPUT type="text" name="e_cdi" value="" id="e_cdi" style="display:none">
<INPUT type="text" name="e_language" value="" id="e_language" style="display:none">
<INPUT type="text" name="_eDes_" value="<?=$_SESSION['_eDes_']?>" id="eDes" style="display:none">
</form>
</td></tr>
<?PHP if( $_COOKIE[$_Cookie]=="" ){ ?>
<tr><td class="cFOOT">
<div id="cookiesTitle"><?=$__Lng["cookies"]?></div>
<div id="cookiesText">
<?PHP
$file = "../_datos/config/cookies_short".(($_SESSION["_LANGUAGE_SUFFIX"]!="")?$_SESSION["_LANGUAGE_SUFFIX"]:"_".$_COOKIE["idioma"]).".html";
echo str_replace("{LINK}", '<span id="cookiesLink" onclick="verCookies()">'.$__Lng["cookies"].' <img src="g/icono_launch.png">', file_get_contents($file));
?>
</span>
</div>
<div style="display:-webkit-inline-box;">
<span id="IconAccept2" onclick="cookieAcept()"><?=$__Lng["cookiesAcept"]?></span>
</div>
</td></tr>
<?PHP } ?>
</table>
<?PHP }else{ ?>
<form action='<?=$nmBalanceo?>edes.php' method="POST" autocomplete='new-password' spellcheck='false'>
<DIV id="LabelTitle"><?=$_Setup["Company"]?></DIV>
<?PHP if( $_PedirEmpresa ){ ?>
<div id="LabelPath"><?=$__Lng["db_path"]?></div>
<div><INPUT TYPE="text" NAME="Path" value="<?=$xLogin?>" id="Path" autocomplete="false" autofocus></div>
<br>
<?PHP } ?>
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
