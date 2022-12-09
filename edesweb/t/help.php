<?PHP
if( isset($_GET["ADDHELP"]) ){
addLabelHelp(trim(urldecode($_GET["ADDHELP"])));
die("top.S.info('Ayuda Grabada')");
}
if( isset($_GET["FILEDELETE"]) ){
removeLabelHelp();
}
if( $_POST["FILE"]<>"" ){
$_POST["AYUDA"] = trim($_POST["AYUDA"]);
if( substr($_POST["AYUDA"],0,3)=="<p>" && substr($_POST["AYUDA"],-4)=="</p>" ){
$_POST["AYUDA"] = substr($_POST["AYUDA"],3,-4);
}
$file = trim(urldecode($_POST["FILE"]));
while( substr($file,-1)=="." ){
$file = substr($file,0,-1);
}
if( $file[0]=="$" ){
if( $_SESSION["_D_"]<>"~" ){
echo "<span style='color:red'>¡¡¡SIN PERMISO DE MODIFICACIÓN!!!</span><br><br>";
}
$file = substr($file,1);
$file = "../../edesweb/lng/help/".$file;
}else{
$file = "../help/tip/".$file;
}
$txt = $_POST["AYUDA"];
file_put_contents($file, $txt);
if( substr_count($file, ".")>0 ){
addLabelHelp($file);
}
die("Grabado");
}
$file = trim(urldecode($_GET["HELP"]));
if( substr($file,-5)==".mark" ){
?>
<SCRIPT>
location.replace("edes.php?Fa:$a/d/markdown.edf&_MARK=<?=$_GET["HELP"]?>");
</SCRIPT>
<?PHP
eEnd();
}
?>
<?= eHTML('$t/help.php', '', 'AYUDA') ?>
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
?>
</STYLE>
<SCRIPT>
document.title = "TAB";
top.S.init(window,"all,tab");
function Ini(){
setTimeout(function(){
frames[0].document.body.onkeydown = function(ev){
if( ev.keyCode==115 ){
InsertTab(tinyMCE.editors[0]);
return S.eventClear(window);
}else if( ev.keyCode==121 ){
GrabarAyuda();
}
}
}, 2000);
}
</SCRIPT>
<SCRIPT SRC="lib/tinymce/js/tinymce/tinymce.min.js"></SCRIPT>
</HEAD>
<BODY onload=Ini()>
<FORM style='margin-bottom:0px;padding-bottom:0px' eType='Directo' AUTOCOMPLETE='off' NAME='FRM1' METHOD='POST' style="display:none">
<TEXTAREA name="texto" id="texto" COLS=100 ROWS=30 MAXLENGTH=-1 WRAP=VIRTUAL>
<?PHP
if( $_GET["HELP"]<>"" ){
if( $file[0]=="$" ){
if( $_SESSION["_D_"]<>"~" ){
echo "<span style='color:red'>¡¡¡SIN PERMISO DE MODIFICACIÓN!!!</span><br><br>";
}
$file = substr($file,1);
$file = "../../edesweb/lng/help/".$file;
}else{
$file = "../help/tip/".$file;
}
echo file_get_contents($file);
}
?>
</TEXTAREA>
<INPUT type="hidden" name="nombre" id="nombre" value="<?=$fileHelp?>">
<INPUT type="hidden" name="tipo" id="tipo" value="<?=$tipoAyuda?>">
</FORM>
<script>
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
onAction: () => GrabarAyuda()
});
},
content_css: ['edes.php?R:$h/i/label.css']
});
var _HelpEdit = top.S.session.helpEdit, iHelp=null;
top.S.session.helpEdit = null;
if( _HelpEdit!=null ){
iHelp = S(_HelpEdit).attr("iHelp");
S(window).windowIcon("N", "m");
}
function GrabarAyuda(){
tinyMCE.triggerSave();
S.call("edes.php?E:$t/help.php", {
AYUDA: S(":texto").val(),
FILE: "<?=$_GET["HELP"]?>"
}, {info:true});
return S.eventClear(window);
}
</script>
</BODY>
</HTML>
<?PHP
function removeLabelHelp(){
$file = trim(urldecode($_GET["FILEDELETE"]));
$txt = "";
list($file, $ext, $modo, $campo, $oType, $oMark) = explode(".", $file);
$nomHelp = str_replace("/","_",$file).".".$ext.".".$modo;
$lineasVacias = 0;
$uLinea = null;
$file = eScript($file.".".$ext);
$dim = file($file);
for($n=0; $n<count($dim); $n++){
$linea = trim($dim[$n]);
if( $linea=="" ){
$lineasVacias++;
if( $lineasVacias>2 ) continue;
}else{
$lineasVacias = 0;
}
$uLinea = $linea;
if( preg_match('/^\[(Note|Exit)\]/i', $linea) ){
for($i=$n; $i<count($dim); $i++){
$txt .= $dim[$i];
}
break;
}
if( $campo=="TITLEICON" ){
if( preg_match('/^\[TitleIcon\]/i', $linea) ){
continue;
}
}else{
if( preg_match('/^\[TipForm\]/i', $linea) ){
$tmp = explode("|", $linea);
if( trim($tmp[2])==$campo ){
continue;
}
}
}
$txt .= $dim[$n];
}
copy($file, $file.'.bak');
file_put_contents($file, $txt);
if( $campo!="TITLEICON" ){
$nomHelp .= ".".$campo;
}
BorraUnaAyuda("../help/tip/".$nomHelp);
BorraUnaAyuda("../help/tip/".$nomHelp.".mark");
$dim = array(".pdf",".chm",".mp4");
for($n=0; $n<count($dim); $n++){
BorraUnaAyuda("../help/doc/".$nomHelp.$dim[$n]);
BorraUnaAyuda("../help/doc/".$nomHelp.".mark".$dim[$n]);
}
echo "top.S.info('Ayuda Eliminada')";
eEnd();
}
function BorraUnaAyuda($file){
if( file_exists($file.".bak") ){
@unlink($file.".bak");
@rename($file, $file.".bak");
}
@unlink($file);
}
function addLabelHelp($file){
$sFile = $file;
$txt = "";
list($file, $ext, $modo, $campo, $oType, $oMark) = explode(".", $file);
$iMode = "";
if( substr_count($modo, "q")>0 ){
if( $iMode!="" ) $iMode .= ",";
$iMode .= "?";
}
if( substr_count($modo, "t")>0 ){
if( $iMode!="" ) $iMode .= ",";
$iMode .= "a,mR";
}
if( substr_count($modo, "l")>0 ){
if( $iMode!="" ) $iMode .= ",";
$iMode .= "l";
}
if( $oMark!="" ) $oMark = " | ".$oMark;
$ayadido = false;
if( $campo=="TITLEICON" ){
$ayadir = "[TitleIcon] {$iMode} | {$oType}{$oMark}\n";
}else{
$ayadir = "[TipForm] {$iMode} | E | {$campo}{$oMark}\n";
}
$uTipForm = -1;
$lineasVacias = 0;
$uLinea = null;
$file = eScript($file.".".$ext);
$dim = file($file);
for($n=0; $n<count($dim); $n++){
$linea = trim($dim[$n]);
if( $linea=="" ){
$lineasVacias++;
if( $lineasVacias>2 ) continue;
}else{
$lineasVacias = 0;
}
$uLinea = $linea;
if( preg_match('/^\[(Note|Exit)\]/i', $linea) ){
if( !$ayadido && $uTipForm==-1 ){
if( $lineasVacias<2 ) $txt .= "\n";
$txt .= $ayadir."\n";
$ayadido = true;
}
for($i=$n; $i<count($dim); $i++){
$txt .= $dim[$i];
}
if( !$ayadido && $uTipForm>-1 ){
$ayadido = true;
$dim = file($file);
$dim[$uTipForm] .= $ayadir;
$txt = "";
for($i=0; $i<count($dim); $i++) $txt .= $dim[$i];
}
break;
}
if( preg_match('/^(\[TitleIcon\]|\[TipForm\])/i', $linea) ) $uTipForm = $n;
if( $campo=="TITLEICON" ){
if( preg_match('/^\[TitleIcon\]/i', $linea) ){
$tmp = explode("|", $linea);
RenombraUnaAyuda($sFile, _ModeHelp(trim(eMid($linea,"]","|"))), trim($tmp[2]));
$dim[$n] = $ayadir;
$ayadido = true;
}
}else{
if( preg_match('/^\[TipForm\]/i', $linea) ){
$tmp = explode("|", $linea);
if( trim($tmp[2])==$campo ){
RenombraUnaAyuda($sFile, _ModeHelp(trim(eMid($linea,"]","|"))), trim($tmp[3]));
$dim[$n] = $ayadir;
$ayadido = true;
}
}
}
$txt .= $dim[$n];
}
if( !$ayadido ){
$txt .= "\n".$ayadir."\n";
}
copy($file, $file.'.bak');
file_put_contents($file, $txt);
}
function RenombraUnaAyuda($file, $oldMode, $oldMark){
list($file, $ext, $modo, $campo, $oType, $oMark) = explode(".", $file);
$file = str_replace("/","_",$file);
$oFile = "{$file}.{$ext}.{$oldMode}.{$campo}.{$oldMark}";
$nFile = "{$file}.{$ext}.{$modo}.{$campo}.{$oMark}";
$oFile = str_replace(".TITLEICON","",$oFile);
$nFile = str_replace(".TITLEICON","",$nFile);
while( substr($oFile,-1)=="." ) $oFile = substr($oFile,0,-1);
while( substr($nFile,-1)=="." ) $nFile = substr($nFile,0,-1);
if( !file_exists("../help/tip/{$nFile}") ){
@rename("../help/tip/{$oFile}", "../help/tip/{$nFile}");
}
$dim = array(".pdf",".chm",".mp4");
for($n=0; $n<count($dim); $n++){
if( !file_exists("../help/doc/{$nFile}") ){
@rename("../help/doc/{$oFile}{$dim[$n]}", "../help/doc/{$nFile}{$dim[$n]}");
}
}
}
function getTipForm(){
eTron("___".$_GET["HELP"]);
exit;
$txt = "";
list($file, $campo) = explode(",", $_GET["HELP"]);
$dim = file(eScript($file));
for($n=0; $n<count($dim); $n++){
$linea = trim($dim[$n]);
if( preg_match('/^\[TipForm\]/i', $linea) ){
$tmp = explode("|", $linea);
if( trim($tmp[2])==$campo ){
for($i=$n+1; $i<count($dim); $i++){
$linea = trim($dim[$i]);
if( $linea[0]=="[" ){
return $txt;
}
$txt .= $dim[$i];
}
}
}
}
return $txt;
}
function putTipForm($file){
$txt = "";
list($file, $campo) = explode(",", $file);
$dim = file(eScript($file));
for($n=0; $n<count($dim); $n++){
$linea = trim($dim[$n]);
$txt .= $dim[$n];
if( preg_match('/^\[TipForm\]/i', $linea) ){
$tmp = explode("|", $linea);
if( trim($tmp[2])==$campo ){
$txt .= "\t".str_replace("<br />", "<br />\n\t", $_POST["AYUDA"])."\n\n";
for($i=$n+1; $i<count($dim); $i++){
$linea = trim($dim[$i]);
if( $linea[0]=="[" ){
$n = $i-1;
break;
}
}
}
}
}
die("Grabado 2");
}
?>
