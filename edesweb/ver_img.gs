<?PHP
if( !isset($_SESSION['_Tree']) ){
include( 'index.html' );
exit;
}
$_SERVER['QUERY_STRING'] = substr( $_SERVER['QUERY_STRING'],4);
list( $_SERVER['QUERY_STRING'] ) = explode( '&', $_SERVER['QUERY_STRING'] );
$File = $_SERVER['QUERY_STRING'];
$NomExt = substr($File,strrpos($File,'.')+1);
if( $NomExt!='' ){
}else{
exit;
}
?>
<!DOCTYPE HTML>
<HTML><HEAD>
<META HTTP-EQUIV="imagetoolbar" CONTENT="no">
<TITLE> <?= $TITULO ?> </TITLE>
<style>
BODY {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
}
TD {
FONT-SIZE: 11px;
COLOR: #0009a5;
text-align: center;
}
</style>
<SCRIPT type="text/javascript">
top.S.init(window);
function Recalcular(){
var Ancho = DGI("FOTO").clientWidth,
Alto = DGI("FOTO").clientHeight;
top.eSWIResize(window,Ancho,Alto);
<?PHP
if( $_GET['MAXIMIZE'] ){
?>
document.body.style.scroll = "none";
with( DGI("FOTO").style ){
width = "100%";
height = "100%";
}
with( DGI("iFOTO").style ){
width = document.body.offsetWidth+"px";
height = document.body.offsetHeight+"px";
}
<?PHP
}
?>
top.eSWLoading(window,0);
top.eSWView(window);
}
function PonFoco(){ document.body.focus(); }
function CerrarVentana(){ if( S.eventCode(event)==27 ) top.eSWClose(window); }
window.frameElement.CloseEsc = true;
S(S("TD",S.toTag(window.frameElement,"SPAN","*")).dim[0]).class("+ANIMATION");
</SCRIPT>
</HEAD>
<BODY style='margin:0' onload='Recalcular();PonFoco();' onhelp='return false;' onkeydown=CerrarVentana() oncontextmenu='<?=(($_SESSION['_D_']=='~')?'':'return false;')?>' onselectstart='return false' ondragstart='return false'>
<div id=FOTO style='width:1;height:1;' <?=(($_GET['MAXIMIZE'])?'':' onresize="Recalcular()"')?>>
<?PHP
if( substr_count( $NomExt, 'avi' ) == 1 ){
if( substr_count($File,'/http/')>0 ){
list( ,$File ) = explode('/http/',$File);
echo "<EMBED SRC='{$File}' LOOP='TRUE' AUTOSTART='TRUE'>";
}else{
echo "<EMBED SRC='edes.php?R:{$File}' LOOP='TRUE' AUTOSTART='TRUE'>";
}
}else if( substr_count( $NomExt, 'swf' ) == 0 ){
if( substr_count($File,'/http/')>0 ){
list( ,$File ) = explode('/http/',$File);
echo "<IMG SRC='{$File}' id=iFOTO BORDER=0 ALT='' TITLE='{$TITULO}'>";
}else{
echo "<IMG SRC='edes.php?R:{$File}' id=iFOTO BORDER=0 ALT='' TITLE='{$TITULO}'>";
}
}else if( substr_count( $NomExt, 'swf' ) == 1 ){
if( substr_count($File,'/http/')>0 ){
list( ,$File ) = explode('/http/',$File);
echo '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0">';
echo "<PARAM NAME=movie   VALUE='{$File}'>";
echo '<PARAM NAME=quality VALUE=high>';
echo '<PARAM NAME=bgcolor VALUE=#F8F8E3>';
echo "<EMBED src='{$File}' quality=high bgcolor=#F8F8E3 TYPE='application/x-shockwave-flash' PLUGINSPAGE='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash'></EMBED>";
echo '</OBJECT>';
}else{
echo '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0">';
echo "<PARAM NAME=movie   VALUE='edes.php?R:{$File}'>";
echo '<PARAM NAME=quality VALUE=high>';
echo '<PARAM NAME=bgcolor VALUE=#F8F8E3>';
echo "<EMBED src='edes.php?R:{$File}' quality=high bgcolor=#F8F8E3 TYPE='application/x-shockwave-flash' PLUGINSPAGE='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash'></EMBED>";
echo '</OBJECT>';
}
}
?>
</div>
</BODY></HTML>
<?PHP
?>
