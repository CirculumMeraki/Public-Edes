<?PHP
if( isset($_GET["PK"]) ){
list($file,$tipo) = explode("~", $_GET["PK"]);
$file = '../../edesweb/h/'.strtolower(str_replace(" ","_",$file)).'.htm';
$file = eClearAccent($file);
if( !file_exists($file) ){
if( $_SESSION["_D_"]!="" ) echo "[{$file}]";
else echo 'Ayuda no encontrada.';
exit;
}
$file = file_get_contents($file);
$file = str_replace('<!DOCTYPE HTML>', '<!DOCTYPE HTML>', $file);
$ini = '<LINK REL="stylesheet" HREF="edes.php?R:$h/i/';
$fin = '" TYPE="text/css">';
$p1 = strpos($file, $ini);
$p2 = strpos($file, $fin);
$css = substr($file, $p1+strlen($ini), $p2-$p1-strlen($ini));
$sustituir = substr($file, $p1, $p2-$p1+strlen($fin));
$css = "../../edesweb/h/i/{$css}";
$css = "<style>".file_get_contents($css)."</style>";
$file = str_replace($sustituir, $css, $file);
$file = str_replace('<BODY style=', '<BODY onkeydown=top.CerrarAyuda(event) style=', $file);
die($file);
}
if( isset($_GET["GRABAR"]) && $_GET["GRABAR"]==1 ){
$txt = str_replace("{#~92~#}", chr(92), html_entity_decode($_POST["AYUDAHTML"]));
$file = $_POST["FILE"];
if( substr_count($txt, "<!-- changeData -->")>0 ){
$dim = explode("\n", $txt);
for($n=0; $n<count($dim); $n++){
if( substr($dim[$n],0,4)=="<th " ){
$dim[$n] = str_replace(strtolower(eFileGetVar('/_datos/config/core.css->$pDesktop')), "{background}", $dim[$n]);
$dim[$n] = str_replace(strtolower(eFileGetVar('/_datos/config/core.css->$cDesktop')), "{color}", $dim[$n]);
$txt = implode("\n", $dim);
break;
}
}
}
gsActivity("/_datos/config/".$file);
file_put_contents("../_datos/config/".$file.'.html', $txt);
echo "Grabado...";
eEnd();
}
if( isset($_GET["file"]) ){
if( file_exists('../_datos/config/'.$_GET["file"].$_SESSION["_LANGUAGE_SUFFIX"].'.html') ){
$file = '../_datos/config/'.$_GET["file"].$_SESSION["_LANGUAGE_SUFFIX"].'.html';
$fileHelp = $_GET["file"].$_SESSION["_LANGUAGE_SUFFIX"];
}else if( file_exists('../_datos/config/'.$_GET["file"].'.html') ){
$file = '../_datos/config/'.$_GET["file"].'.html';
$fileHelp = $_GET["file"];
}
$html = file_get_contents($file);
$ChangeData = false;
if( substr_count($html, "<!-- changeData -->")>0 ){
$ChangeData = true;
$html = str_replace("{background}", eFileGetVar('/_datos/config/core.css->$pDesktop'), $html);
$html = str_replace("{color}", eFileGetVar('/_datos/config/core.css->$cDesktop'), $html);
}
eHTML('$wysiwyg_file.php', '', 'AYUDA');
?>
<STYLE>
body{
margin:0px;
padding:0px;
_visibility:hidden;
}
.ICONWINDOW, .ICONINPUT, I {
font-size:10px !important;
color:#1B6B8D;
}
<?PHP
if( $file!="/_datos/config/key_help.htm" ){
$ini = '<LINK REL="stylesheet" HREF="edes.php?R:$h/i/';
$fin = '" TYPE="text/css">';
$p1 = strpos($html, $ini);
$p2 = strpos($html, $fin);
$css = substr($html, $p1+strlen($ini), $p2-$p1-strlen($ini));
$css = "../../edesweb/h/i/{$css}";
echo file_get_contents($css);
}
?>
</STYLE>
<SCRIPT>
document.title = "TAB";
var winPadre = top.window.opener;
try{
if( top.window.opener.name ){}
}catch(e){
winPadre = top;
}
winPadre.S.init(window,"all,tab");
setTimeout(function(){
var winFrame = (top.window.opener) ? frames[0] : window;
winFrame.document.body.onkeydown = function(ev){
if( ev.keyCode==115 ){
InsertTab(tinyMCE.editors[0]);
return S.eventClear(window);
}else if( ev.keyCode==121 ){
GrabarAyuda();
}
}
},2000);
</SCRIPT>
<SCRIPT SRC="lib/tinymce/js/tinymce/tinymce.min.js"></SCRIPT>
<?PHP
?>
</HEAD>
<BODY>
<DIV id=TEMPORAL style="display:none"><?=$html?></DIV>
<FORM style='margin-bottom:0px;padding-bottom:0px' eType='Directo' AUTOCOMPLETE='off' NAME='FRM1' METHOD='POST'>
<TEXTAREA name="texto" id="texto" COLS=100 ROWS=30 MAXLENGTH=-1 WRAP=VIRTUAL></TEXTAREA>
<INPUT type="hidden" name="nombre" id="nombre" value="<?=$fileHelp?>">
<!--<button name="submitbtn"></button>-->
</FORM>
<SCRIPT>
document.forms[0].texto.value = document.getElementById("TEMPORAL").innerHTML;
var _Tiny = tinymce.init({
selector: 'textarea#texto',
width: document.body.clientWidth,
height: document.body.clientHeight,
menubar: true,
plugins: [
'advlist autolink lists link image charmap print preview anchor textcolor',
'searchreplace visualblocks code fullscreen',
'insertdatetime media table paste code help wordcount save'
],
toolbar: 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | myTab mysave',
setup: (editor) => {
editor.ui.registry.addButton('myTab', {
text: 'Tab',
onAction: () => InsertTab(editor)
}),
editor.ui.registry.addButton('mysave', {
text: 'Grabar',
tooltip: "<?=$fileHelp?>.html",
onAction: () => GrabarAyuda()
});
},
content_css: ['edes.php?R:$h/i/label.css']
});
function GrabarAyuda(){
if( _WOPENER && _WOPENER._Source ){
if( _WOPENER._Source=="$a/d/help_edes_label.edf" || _WOPENER._Source=="$a/d/help_edes_e.edf" || _WOPENER._Source=="$a/d/help_edes_js.edf" ){
_WOPENER._oTR.style.fontStyle = "italic";
_WOPENER._oTR.style.color = "red";
}
}
tinyMCE.triggerSave();
if( top.edCall && winPadre==top ){
top.edCall("edes.php?E:$wysiwyg_file.php&GRABAR=1", {
AYUDAHTML:document.forms[0].texto.value.replace(/\\/g,"{#~92~#}"),
FILE:document.forms[0].nombre.value
}, {info:true});
}else{
top.S.call("edes.php?E:$wysiwyg_file.php&GRABAR=1", {
AYUDAHTML:document.forms[0].texto.value.replace(/\\/g,"{#~92~#}"),
FILE:document.forms[0].nombre.value
}, {info:true});
}
return S.eventClear(window);
}
function InsertTab(editor){
editor.insertContent('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
}
<?PHP
?>
</SCRIPT>
</BODY>
</HTML>
<?PHP
eEnd();
}
