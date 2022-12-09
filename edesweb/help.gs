<?PHP
$NomFile = $Dir_.'h/'.strtolower($_SERVER['QUERY_STRING']).'.htm';
if( file_exists( $NomFile ) ){
include( $NomFile );
}else{
exit;
}
?>
<SCRIPT type="text/javascript">
function Fin(){
window.frameElement.style.display = 'none';
}
function Ini(){
with( window.frameElement.style ){
zIndex = 9999;
borderWidth = '1 1 1 1';
borderStyle = 'solid';
borderColor = '#789aab';
display = 'none';
}
var x = y = 0;
x = (window.frameElement.clientWidth-Ancho)/2;
y = (window.frameElement.clientHeight-Alto)/2 + window.frameElement.document.body.scrollTop;
window.frameElement.style.display = 'block';
window.focus();
document.onfocusout = Fin;
}
window.onload = Ini;
</SCRIPT>
<?PHP
exit;
ShowMensaje( $_SERVER['QUERY_STRING'] );
function ShowMensaje( $txt ){
eHTML('$help.gs');
$Color = '#001296';
if( substr( $txt,0,6)=='ERROR:' ) $Color = '#CC0000';
?>
<style>
BODY {
FONT-SIZE: 20px;
}
TABLE {
BACKGROUND: #d8dcdf;
COLOR: #0a00af;
FONT-SIZE: 100%;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #dd8800;
}
TH {
COLOR: #0009a5;
FONT-SIZE: 120%;
FONT-SIZE: 20px;
}
</style>
<SCRIPT type="text/javascript">
var _oPopup = window.createPopup();
var oPopBody = _oPopup.document.body;
oPopBody.innerHTML = '<div style="background:#FFFFCC; border:2px outset <?= $Color; ?>;padding:5px 20px 5px 20px; width:1px;height:1px;text-align:center; vertical-align: middle;">'+
'<div style="width:1px;height:1px; text-align:center; vertical-align:middle; color:<?= $Color; ?>; font-family:ARIAL; font-size:20px">'+
'<IFRAME name="TLF" src="edes.php?R:$h/addcode.htm" width="400px" height="400px" FRAMEBORDER=0 SCROLLING="auto"><_/IFRAME>'+
'</DIV>'+
'</DIV>';
_oPopup.show(0,0,10,10);
var aHeight = oPopBody.scrollHeight;
var aWidth = oPopBody.scrollWidth;
_oPopup.hide();
_oPopup.show( (screen.width-aWidth)/2, (screen.availHeight-aHeight)/2, aWidth, aHeight );
window.focus();
setTimeout('_oPopup.hide();', 2000);
</SCRIPT>
<?PHP
echo '</HEAD><BODY>';
echo '</BODY></HTML>';
eEnd();
}
?>
