<?PHP
if( !isset($_SESSION['_User']) ){
include( 'index.html' );
exit;
}
eLngLoad('../../edesweb/lng/varios.lng');
eInclude($_Sql);
qQuery( "select * from {$_SESSION['ShareDictionary']}gs_error where codigo={$PK}" );
$row = qArray();
if( $row['codigo']=='' ) exit;
$File = "/_tmp/err/{$PK}.png";
if( !file_exists('..'.$File) ) $File = "/_tmp/err/{$PK}.jpg";
$File2 = "/_tmp/err/{$PK}_before.png";
if( !file_exists('..'.$File2) ) $File2 = "/_tmp/err/{$PK}_before.jpg";
?>
<!DOCTYPE HTML>
<HTML><HEAD>
<META HTTP-EQUIV="imagetoolbar" CONTENT="no">
<TITLE>Error en PC</TITLE>
<SCRIPT type="text/javascript">
top.S.init(window);
top.eSWSetCaption( window, '<?=eLng('IMAGEN DEL ERROR').': '.$row['cdi']?>' );
function Mensaje(ad){
top.eInfoError( window, S.event(window).title, 5 );
}
function PonFoco(){
document.body.focus();
}
function CerrarVentana(){
if( S.eventCode(event)==27 ) top.eSWClose(window);
}
window.frameElement.CloseEsc = true;
S(S("TD",S.toTag(window.frameElement,"SPAN","*")).dim[0]).class("+ANIMATION");
function Init(){
PonFoco();
top.eSWLoading(window,0);
top.eSWView(window);
<?PHP
?>
setTimeout('document.body.focus();',250);
}
function Tecla(t){
if( t.keyCode==27 ) top.eSWClose(window);
else if( t.keyCode==40 || t.keyCode==34 || t.keyCode==35 ){
DGI("ImgOk").style.display = 'none';
DGI("ImgError").style.display = 'block';
}else if( t.keyCode==38 || t.keyCode==33 || t.keyCode==36 ){
DGI("ImgOk").style.display = 'block';
DGI("ImgError").style.display = 'none';
}else if( t.keyCode==39 || t.keyCode==37 ){
if( DGI("ImgOk").offsetWidth > 0 ){
DGI("ImgOk").style.display = 'none';
DGI("ImgError").style.display = 'block';
}else{
DGI("ImgOk").style.display = 'block';
DGI("ImgError").style.display = 'none';
}
}
document.body.focus();
}
function CambiaSlider(){
if( event.wheelDelta > 0 ){
DGI("ImgOk").style.display = 'none';
DGI("ImgError").style.display = 'block';
}else{
DGI("ImgOk").style.display = 'block';
DGI("ImgError").style.display = 'none';
}
}
</SCRIPT>
</HEAD>
<BODY onkeydown='Tecla(event)' onmousewheel='CambiaSlider()' style='margin:0px' onload='Init();' onhelp='return false' oncontextmenu='<?=(($_SESSION['_D_']=='~')?'':'return false')?>' onkeydown='CerrarVentana()'><?PHP
if( file_exists('..'.$File2) ){
echo "<IMG id=ImgOk style='border:5px solid #18bf21;display:none;' SRC='edes.php?R:{$File2}' BORDER=0 ALT='' TITLE='".eLng('IMAGEN ANTES DEL ERROR')."' width=100% height=100% onclick=Mensaje('a')>";
}else echo '<span id=ImgOk style="border:5px solid #18bf21;display:none;width:100%;height:100%"></span>';
if( file_exists('..'.$File) ){
echo "<IMG id=ImgError style='border:5px solid red' SRC='edes.php?R:{$File}' BORDER=0 ALT='' TITLE='".eLng('IMAGEN DESPUES DEL ERROR')."' width=100% height=100% onclick=Mensaje('d')>";
}else{
echo '<span id=ImgError style="color:red; font-size:30px; font-family:Arial; position:absolute; left:40px; top:40px; cursor:default;">'.eLng('Imagen no disponible').'</span>';
}
?></BODY></HTML>
