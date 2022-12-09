<?php
eHTML('$navegador.php', "", eFileGetVar("Setup.TabTitle"));
$tmpFile = '../_datos/config/sql.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval(_LoadSqlIni($tmpFile));
$logo = "";
if( file_exists("g/logo.ico") ) $logo = "logo";
if( $_Development && file_exists("g/logo_development.ico") ) $logo = "logo_development";
if( $logo!="" ) echo "<link id='FAVICON' rel='icon' href='g/{$logo}.ico' type='image/x-icon'/>";
?>
<style>
body, html {
height:100%;
width:100%;
padding:0px;
margin: 0px;
background-color:#eeeeee;
}
<?PHP
include("css/fonts.css");
?>
</style>
</head>
<body>
<span id="container"></span>
<script type="text/javascript">
var _AppVersion = window.navigator.appVersion.toLowerCase(),
_UserAgent = window.navigator.userAgent.toLowerCase(),
Sistema = "unknown";
if(_AppVersion.indexOf('win') != -1){
Sistema = 'Windows';
}else if(_AppVersion.indexOf('linux') != -1){
Sistema = 'Linux';
}else if(_AppVersion.indexOf('mac') != -1){
Sistema = 'Macintosh';
}
var Explorador = "unknown";
if(_UserAgent.indexOf("msie") >= 0 || _UserAgent.indexOf("trident") >= 0)
Explorador = "Internet Explorer";
else if(_UserAgent.indexOf("opera") >= 0 || _UserAgent.indexOf("presto") >= 0)
Explorador = "Opera";
else if(_UserAgent.indexOf("safari") >= 0 && _UserAgent.indexOf("chrome") < 0)
Explorador = "Safari";
else if(_UserAgent.indexOf("safari") >= 0 && _UserAgent.indexOf("chrome") >= 0)
Explorador = "Chrome";
else if(_UserAgent.indexOf("firefox") >= 0)
Explorador = "Firefox o similar";
var isAndroid = _UserAgent.indexOf("android") > -1; //&& _UserAgent.indexOf("mobile");
if(isAndroid) {
}
var isiPad = navigator.userAgent.match(/iPad/i)!=null,
ua = navigator.userAgent,
isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
if (document.cookie.indexOf("iphone_redirect=false") == -1){
}
}
function Browser(){
this.fullName = 'unknow'; // getName(false);
this.name = 'unknow'; // getName(true);
this.code = 'unknow'; // getCodeName(this.name);
this.fullVersion = 'unknow'; // getVersion(this.name);
this.version = 'unknow'; // getBasicVersion(this.fullVersion);
this.mobile = false; // isMobile(navigator.userAgent);
this.width = screen.width;
this.height = screen.height;
this.platform =  'unknow'; //getPlatform(navigator.userAgent);
this.init = function() { //operative system, is an auxiliary var, for special-cases
var navs = [
{ name:'Opera Mobi', fullName:'Opera Mobile', pre:'Version/' },
{ name:'Opera Mini', fullName:'Opera Mini', pre:'Version/' },
{ name:'Opera', fullName:'Opera', pre:'Version/' },
{ name:'MSIE', fullName:'Microsoft Internet Explorer', pre:'MSIE ' },
{ name:'BlackBerry', fullName:'BlackBerry Navigator', pre:'/' },
{ name:'BrowserNG', fullName:'Nokia Navigator', pre:'BrowserNG/' },
{ name:'Midori', fullName:'Midori', pre:'Midori/' },
{ name:'Kazehakase', fullName:'Kazehakase', pre:'Kazehakase/' },
{ name:'Chromium', fullName:'Chromium', pre:'Chromium/' },
{ name:'Flock', fullName:'Flock', pre:'Flock/' },
{ name:'Galeon', fullName:'Galeon', pre:'Galeon/' },
{ name:'RockMelt', fullName:'RockMelt', pre:'RockMelt/' },
{ name:'Fennec', fullName:'Fennec', pre:'Fennec/' },
{ name:'Konqueror', fullName:'Konqueror', pre:'Konqueror/' },
{ name:'Arora', fullName:'Arora', pre:'Arora/' },
{ name:'Swiftfox', fullName:'Swiftfox', pre:'Firefox/' },
{ name:'Maxthon', fullName:'Maxthon', pre:'Maxthon/' },
{ name:'Firefox',fullName:'Mozilla Firefox', pre:'Firefox/' },
{ name:'Chrome', fullName:'Google Chrome', pre:'Chrome/' },
{ name:'Safari', fullName:'Apple Safari', pre:'Version/' }
];
var agent = navigator.userAgent, pre;
for (i in navs) {
if (agent.indexOf(navs[i].name)>-1) {
pre = navs[i].pre;
this.name = navs[i].name.toLowerCase(); //the code name is always lowercase
this.fullName = navs[i].fullName;
if (this.name=='msie') this.name = 'iexplorer';
if (this.name=='opera mobi') this.name = 'opera';
if (this.name=='opera mini') this.name = 'opera';
break; //when found it, stops reading
}
}//for
if ((idx=agent.indexOf(pre))>-1) {
this.fullVersion = '';
this.version = '';
var nDots = 0;
var len = agent.length;
var indexVersion = idx + pre.length;
for (j=indexVersion; j<len; j++) {
var n = agent.charCodeAt(j);
if ((n>=48 && n<=57) || n==46) { //looking for numbers and dots
if (n==46) nDots++;
if (nDots<2) this.version += agent.charAt(j);
this.fullVersion += agent.charAt(j);
}else j=len; //finish sub-cycle
}//for
this.version = parseInt(this.version);
}
var mobiles = ['mobi', 'mobile', 'mini', 'iphone', 'ipod', 'ipad', 'android', 'blackberry'];
for (var i in mobiles) {
if (agent.indexOf(mobiles[i])>-1) this.mobile = true;
}
if (this.width<700 || this.height<600) this.mobile = true;
var plat = navigator.platform;
if (plat=='Win32' || plat=='Win64') this.platform = 'Windows';
if (agent.indexOf('NT 5.1') !=-1) this.platform = 'Windows XP';
if (agent.indexOf('NT 6') !=-1)  this.platform = 'Windows Vista';
if (agent.indexOf('NT 6.1') !=-1) this.platform = 'Windows 7';
if (agent.indexOf('Mac') !=-1) this.platform = 'Macintosh';
if (agent.indexOf('Linux') !=-1) this.platform = 'Linux';
if (agent.indexOf('iPhone') !=-1) this.platform = 'iOS iPhone';
if (agent.indexOf('iPod') !=-1) this.platform = 'iOS iPod';
if (agent.indexOf('iPad') !=-1) this.platform = 'iOS iPad';
if (agent.indexOf('Android') !=-1) this.platform = 'Android';
if (this.name!='unknow') {
this.code = this.name+'';
if (this.name=='opera') this.code = 'op';
if (this.name=='firefox') this.code = 'ff';
if (this.name=='chrome') this.code = 'ch';
if (this.name=='safari') this.code = 'sf';
if (this.name=='iexplorer') this.code = 'ie';
if (this.name=='maxthon') this.code = 'mx';
}
if (this.name=='safari' && this.platform=='Linux') {
this.name = 'unknow';
this.fullName = 'unknow';
this.code = 'unknow';
}
};//function
this.init();
}//Browser class
<?PHP
if( !isset($_COOKIE["idioma"]) ) setcookie("idioma","es");
$nomIframe = "IFRAME".rand(10000,99999);
?>
</script>
<form method="post" action="edes.php" style="display:none" target="<?=$nomIframe?>">
<input type="text" name="platform">
<input type="text" name="explorer">
<input type="text" name="resolution">
<input type="text" name="dirweb">
<input type="text" name="idioma">
<input type="text" name="_DirEDes">
<input type="text" name="_eDes_" value="<?=$_SESSION['_eDes_']?>">
</form>
<iframe frameborder=0px src="about:blank" name="<?=$nomIframe?>" eNORESIZE=true style="width:100%;height:100%;border:0px solid red"></iframe>
<script type="text/javascript">
if( (location.pathname+"").indexOf("/http/")>-1 ){
href = location.origin+(location.pathname+"").split("/http/")[0]+"/http/edes.php";
}else{
href = location.origin+"/edes.php";
}
document.forms[0].platform.value = Sistema;
document.forms[0].explorer.value = Explorador;
document.forms[0].resolution.value = screen.width+","+screen.height;
document.forms[0].dirweb.value = location.href;
document.forms[0].idioma.value = window.navigator.language;
var Dim = document.forms[0].elements, i,
txt = '<!DOCTYPE HTML><HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></HEAD><BODY style="display:none">'+
'<FORM METHOD=POST action="'+href+'?login1">';
for(i=0; i<Dim.length; i++) txt += '<INPUT TYPE="text" NAME="'+Dim[i].name+'" value="'+Dim[i].value+'">';
txt += '</FORM></BODY></HTML>';
<?=$nomIframe?>.document.write(txt);
setTimeout(function(){
<?=$nomIframe?>.document.forms[0].submit();
}, 100);
</script>
</body>
</html>
