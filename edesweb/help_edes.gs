<?PHP
$_DimTipoSet = array("", "~L",		   "~H",		 "~W",			 "~D");
$_DimTipoGet = array(	  "L"=>"label", "H"=>"help2", "W"=>"edesweb", "D"=>"doc");
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
$sustituir = substr($file, $p1, $p2-$p1+strlen($fin));
$css = substr($file, $p1+strlen($ini), $p2-$p1-strlen($ini));
$css = "../../edesweb/h/i/{$css}";
$css = "<style>".file_get_contents($css)."</style>";
$file = str_replace($sustituir, $css, $file);
$file = str_replace('<BODY style=', '<BODY onkeydown=top.CerrarAyuda(event) style=', $file);
if( preg_match_all('/\[help:[a-zA-Z0-9\.\/\:\=_]{4,80}]/i', $file, $dim) ){
include("../_d_/cfg/edes.ini");
if( $_JWTTo!="" ){
include("../../edesweb/itm/jwt.php");
$payLoad = array(
"from"=>$_JWTFrom,
"key"=>$_JWTKey,
"exp"=>time()+(60*60*3),
"email"=>$_SESSION["_UserEMail"],
"pass"=>$pass,
"user"=>$_SESSION["_User"]
);
$token = JWT::encode($payLoad, $_JWTKey, $_JWTAlgorithm);
setcookie($_JWTCookie, $token);
for($n=0; $n<count($dim[0]); $n++){
$url = substr($dim[0][$n],6,-1);
$b64 = 'data:image/png;base64,'.base64_encode(file_get_contents("../../edesweb/h/help.png"));
$icono = "<a href='{$_JWTTo}dex.php?{$url}' target=_blank><img src='{$b64}' title='Ejecutar ejemplo' style='cursor:pointer;height:20px'></a>";
$file = str_replace($dim[0][$n], $icono, $file);
}
}else{
$icono = "";
}
for($n=0; $n<count($dim[0]); $n++){
$file = str_replace($dim[0][$n], $icono, $file);
}
}
die($file);
}
if( isset($_GET["GRABAR"]) && $_GET["GRABAR"]==1 ){
$txt = str_replace("{#~92~#}", chr(92), html_entity_decode($_POST["AYUDAHTML"]));
$file = $_POST["FILE"];
$tipo = $_POST["TIPO"];
$fileMotor = "";
if( $file=="/_datos/config/key_help.htm" ){
$file = "..".$file;
$fileMotor = "../../edesweb/web/aplication/_datos/config/key_help.htm";
$fileApp   = "../../edesweb.app/_datos/config/key_help.htm";
$html = file_get_contents($fileMotor);
}else{
$file = "../../edesweb/h/{$file}.htm";
$html = file_get_contents("../../edesweb/h/i/{$_DimTipoGet[$tipo]}.htm");
}
$ini = ' ';
$p1 = strpos($html, $ini);
$p2 = strpos($html, '<!-- [HelpEnd] -->');
if( $p1==0 || $p2==0 ){
$html = "ERROR en el formato...";
}else{
$html= substr($html, 0, $p1).$ini.$txt.substr($html, $p2);
}
if( $fileMotor!="" ){
file_put_contents($file     , $html);
file_put_contents($fileMotor, $html);
file_put_contents($fileApp  , $html);
}else{
file_put_contents($file, $html);
}
echo "Grabado...";
eEnd();
}
if( isset($_GET["EDITHELP"]) ){
list($file, $tipoAyuda) = explode("~", $_GET["EDITHELP"]);
if( $file=="/_datos/config/key_help.htm" ){
$fileHelp = $file;
$file = "../../edesweb/web/aplication/_datos/config/key_help.htm";
$html = file_get_contents($file);
}else{
$fileHelp = eClearAccent(strtolower(str_replace(" ","_",$file)));
$file = '../../edesweb/h/'.$fileHelp.'.htm';
if( !file_exists($file) ){
$html = file_get_contents("../../edesweb/h/i/{$_DimTipoGet[$tipoAyuda]}.htm");
}else{
$html = file_get_contents($file);
}
}
eHTML('$help_edes.gs','','AYUDA');
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
$ini = ' ';
$p1 = strpos($html, $ini);
$p2 = strpos($html, '<!-- [HelpEnd] -->');
if( $p1==0 || $p2==0 ){
$html = "ERROR en el formato...";
}else{
$html= substr($html, $p1+strlen($ini), $p2-$p1-strlen($ini));
$html = trim($html);
$p1 = strpos($html, "CONTENIDO");
$p2 = strpos($html, ">");
if( substr($html,0,5)=="<DIV " && $p1>0 && $p1<$p2 ){
$html = substr($html, $p2+1, strlen($html)-1-$p2);
}
}
?>
</HEAD>
<BODY>
<DIV id=TEMPORAL style="display:none"><?=$html?></DIV>
<FORM style='margin-bottom:0px;padding-bottom:0px' eType='Directo' AUTOCOMPLETE='off' NAME='FRM1' METHOD='POST'>
<TEXTAREA name="texto" id="texto" COLS=100 ROWS=30 MAXLENGTH=-1 WRAP=VIRTUAL></TEXTAREA>
<INPUT type="hidden" name="nombre" id="nombre" value="<?=$fileHelp?>">
<INPUT type="hidden" name="tipo" id="tipo" value="<?=$tipoAyuda?>">
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
toolbar: 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | myAddEjemplo myTab mysave',
setup: (editor) => {
editor.ui.registry.addButton('myAddEjemplo', {
text: '+Ejemplo',
onAction: () => InsertEjemplo(editor)
}),
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
function GrabarAyuda(){
if( _WOPENER && _WOPENER._Source ){
if( _WOPENER._Source=="$a/d/help_edes_label.edf" || _WOPENER._Source=="$a/d/help_edes_e.edf" || _WOPENER._Source=="$a/d/help_edes_js.edf" ){
_WOPENER._oTR.style.fontStyle = "italic";
_WOPENER._oTR.style.color = "red";
}
}
tinyMCE.triggerSave();
var ini=0, fin, newtxt, txt = document.forms[0].texto.value;
txt = txt.replace(/\<code\>/g, "{_c_o_d_e_}");
txt = txt.replace(/\<\/code\>/g, "{_/_c_o_d_e_}");
txt = txt.replace(/\<p\>/g, "");
txt = txt.replace(/\<\/p>/g, "<br /><br />");
while( txt.indexOf('<td id="Ejemplo">', ini)>-1 ){
ini = txt.indexOf('<td id="Ejemplo">', ini)+17;
fin = txt.indexOf('<td id="txt">', ini)-17;
newtxt = txt.substring(ini, fin);
newtxt = newtxt.replace(/\</g, "&lt;");
newtxt = newtxt.replace(/\>/g, "&gt;");
newtxt = newtxt.replace(/\&/g, "&amp;");
newtxt = newtxt.replace(/\&amp\;lt\;br \/\&amp\;gt\;/g, "<br />");
newtxt = newtxt.replace(/\&amp\;lt\;p\&amp\;gt\;/g, "<p>");
newtxt = newtxt.replace(/\&amp\;lt\;\/p\&amp\;gt\;/g, "</p>");
newtxt = newtxt.replace(/\{_c_o_d_e_\}/g, "<code>");
newtxt = newtxt.replace(/\{_\/_c_o_d_e_\}/g, "</code>");
txt = txt.substring(0,ini)+newtxt+txt.substring(fin);
}
txt = txt.replace(/\{_c_o_d_e_\}/g, "<code>");
txt = txt.replace(/\{_\/_c_o_d_e_\}/g, "</code>");
if( top.edCall && winPadre==top ){
top.edCall("edes.php?E:$help_edes.gs&GRABAR=1", {
AYUDAHTML:txt.replace(/\\/g,"{#~92~#}"),
FILE:document.forms[0].nombre.value,
TIPO:document.forms[0].tipo.value
}, {info:true});
}else{
top.S.call("edes.php?E:$help_edes.gs&GRABAR=1", {
AYUDAHTML:txt.replace(/\\/g,"{#~92~#}"),
FILE:document.forms[0].nombre.value,
TIPO:document.forms[0].tipo.value
}, {info:true});
}
return S.eventClear(window);
}
function InsertTab(editor){
editor.insertContent('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
}
function InsertEjemplo(editor){
var mas = '<tr><td id="tEjemplo">EJEMPLO</td></tr><tr><td id="Ejemplo">&nbsp;</td></tr><tr><td id="txt">&nbsp;</td></tr>',
txt = editor.getContent(),
p = txt.lastIndexOf("</tbody>");
editor.setContent(txt.substring(0,p)+mas+"</tbody></table>");
}
</SCRIPT>
</BODY>
</HTML>
<?PHP
eEnd();
}
eHTML('$help_edes.gs');
?>
<STYLE>
body, html {
height:100%;
width:100%;
margin:0px;
padding:0px;
}
I { margin-right:3px; }
n0 { padding-left:0px; }
n1 { padding-left:10px; }
n2 { padding-left:20px; }
n3 { padding-left:30px; }
n4 { padding-left:40px; }
<?PHP
$txt = file_get_contents("{$_PathCSS}/all.css");
echo $txt;
$txt = file_get_contents("{$_PathCSS}/tab.css");
echo $txt;
?>
</STYLE>
<SCRIPT type="text/javascript" name=eDes>
document.title = "HELP";
<?PHP
if( !$_SESSION["_BYPHONE"] ){
echo 'top.S.init(window,"all,tab");';
}else{
?>
top.window.opener.S.init(window);
var oStyle = top.window.opener.document.styleSheets, r,i,t,reglas, sheet=S.sheet(window);
for(r=0; r<oStyle.length; r++){
if( oStyle[r].title=="all" ){
reglas = oStyle[r].rules
t = reglas.length;
for(i=0; i<t; i++){
if( /^@font-face /.test(reglas[i].cssText) ){
sheet.insertRule(reglas[i].cssText, sheet.cssRules.length);
}
}
}
}
<?PHP
}
?>
</SCRIPT>
<SCRIPT type="text/javascript">
function VerAyuda(){
var o = S.event(window);
if( o.tagName=="TBODY" ) return;
if( o.tagName=="TR" ) o = o.cells[0];
else if( o.tagName=="I" ) o = o.parentElement;
if( o.tagName!="TD" || S(o).attr("pk")=="" ){
if( o.getAttribute("pk")==null || o.getAttribute("pk")=="" ){
var nivel = o.id,
tabla = S.toTag(o,"TABLE"),
tr = tabla.rows,
i = o.parentElement.rowIndex,
t = tr.length,
ver = (tr[i+1].style.display=="none")?"block":"none",
n;
if( ver=="none" ){
tr[i].cells[0].children[0].innerText = tr[i].cells[0].children[0].innerText.replace("ª","©");
for(n=i+1; n<t; n++){
if( tr[n].cells[0].id>nivel ){
tr[n].style.display = ver;
tr[n].cells[0].children[0].innerText = tr[n].cells[0].children[0].innerText.replace("ª","©");
}else break;
}
}else{
nivel = "n"+((S.mid(nivel,1,0)*1)+1);
tr[i].cells[0].children[0].innerText = tr[i].cells[0].children[0].innerText.replace("©","ª");
for(n=i+1; n<t; n++){
if( tr[n].cells[0].id==nivel ){
tr[n].style.display = ver;
}else if( tr[n].cells[0].id>nivel ){
}else break;
}
}
}
}else{
<?PHP if( $_SESSION['_D_']=='~' || $_SESSION["_gsACCESO"]["Help"]==3 ){ ?>
if( event.ctrlKey ){
frames[0].location.href = "edes.php?E:$help_edes.gs&EDITHELP="+S(o).attr("pk");
}else{
frames[0].location.href = "edes.php?E:$help_edes.gs&PK="+S(o).attr("pk");
}
<?PHP }else{ ?>
frames[0].location.href = "edes.php?E:$help_edes.gs&PK="+S(o).attr("pk");
<?PHP } ?>
}
}
function ColapsarAyuda(tabla){
var tr = tabla.rows,
t = tr.length, n;
for(n=0; n<t; n++){
if( tr[n].cells[0].id=="n0" ){
tr[n].style.display = "block";
tr[n].cells[0].children[0].innerText = tr[n].cells[0].children[0].innerText.replace("©","ª");
}else if( tr[n].cells[0].id=="n1" ){
tr[n].style.display = "block";
tr[n].cells[0].children[0].innerText = tr[n].cells[0].children[0].innerText.replace("ª","©");
}else{
tr[n].style.display = "none";
tr[n].cells[0].children[0].innerText = tr[n].cells[0].children[0].innerText.replace("ª","©");
}
}
return S.eventClear(window);
}
function VerUnaAyuda(txt, chr, anterior){
var tmp, pk, tmp2, itm, low, ok=false, upper;
txt = S.nsp(txt);
upper = !/^(TEXT|text|HTML|html|\.TEXT|\.text|\.HTML|\.html)$/.test(txt);
if( upper ){
tmp = S.upper(txt).split("(");
low = txt.toLowerCase();
}else{
tmp = txt.split("(");
low = txt;
}
txt = tmp[0];
if( chr!="." && top._HelpEDESLABEL[low] ) ok = true;
else if( top._HelpEDESPHP[low] ) ok = true;
else if( top._HelpEDESJS[low] ) ok = true;
if( !ok ){
if( chr=="." ){
low = "."+low;
if( chr!="." && top._HelpEDESLABEL[low] ) ok = true;
else if( top._HelpEDESPHP[low] ) ok = true;
else if( top._HelpEDESJS[low] ) ok = true;
if( ok ){
txt = "."+txt;
}else if( anterior=="S" ){
if( upper ){
low = "s"+low;
}else{
low = "S"+low;
}
if( chr!="." && top._HelpEDESLABEL[low] ) ok = true;
else if( top._HelpEDESPHP[low] ) ok = true;
else if( top._HelpEDESJS[low] ) ok = true;
if( ok ){
if( upper ){
txt = S.upper(low);
}else{
txt = low;
}
}else return;
}else return;
}
}
S("TD",S(".TREE")).each(function(pk, o ){
if( upper ){
itm = S.mid(o.innerText.toUpperCase(),1,0);
}else{
itm = S.mid(o.innerText,1,0);
}
if( itm!="" && itm[0]=="~" ) return null;
if( itm==txt && S(o).attr("pk")!="" ){
pk = S(o).attr("pk");
frames[0].location.href = "edes.php?E:$help_edes.gs&PK="+pk;
S(".TREE").obj.scrollTop = S(o).xy(S(".TREE"))[1]-5;
top.frames["HELPEDES"].frameElement.style.display = "block";
document.body.focus();
return null;
}
});
}
function Buscar(o){
var cadena = S.trim(o.value),
seek = new RegExp(cadena.replace(".","\."), "i"), seVe = false,
trs = S("#TREEMAIN TR");
if( cadena=="" ) return;
S("#TREEMAIN TR").none();
trs.each(function(pk, tr){
if( tr.cells[0].id=="n0" || tr.cells[0].id=="n1" ){
S(tr).block("table-row");
}
});
trs.each(function(pk, tr){
if( seek.test(S(tr).text()) ){
var sid = tr.cells[0].id,
i = tr.rowIndex, n;
for(n=i; n>=0; n--){
if( trs.dim[n].cells[0].id==sid ){
S(trs.dim[n]).block("table-row");
sid = "n"+((sid.substr(1,9)*1)-1);
}
if( sid=="n0" ) break;
}
if( !seVe ){
S("#TREEMAIN").obj.scrollTop = tr.offsetTop;
tr.style.backgroundColor = "#c1c1c1";
setTimeout(function(){
tr.style.backgroundColor = "";
}, 2000);
seVe = true;
}
}
});
o.value = "";
}
function BuscarKey(o){
if( !(event.type=="focusout" || S.eventCode(event)==13 || S.eventCode(event)==9) ) return;
Buscar(o);
}
</SCRIPT>
<STYLE>
.ICONWINDOW, .ICONINPUT, I {
font-size:10px !important;
color:#1B6B8D;
}
</STYLE>
</HEAD>
<BODY onkeydown=top.CerrarAyuda(event)>
<input id="BUSCAR" onfocusout="Buscar(this)" onkeydown="BuscarKey(this)" style="position:absolute;left:0px;top:4px;z-index:99999;border-radius:0px; border-width:0px; border-bottom:1px solid #eeeeee; padding-left:25px !important;">
<i class="iconSearch" style="position:absolute;left:9px;top:9px;z-index:999999;">S</i>
<i class="ICONDESKTOP" onclick="top.Orden(15)" title="Cerrar Ayuda" style="position:absolute;top:7px;right:25px;font-size:12px;color:#758388;">x</i>
<table border=0px cellSpacing=0px cellPadding=0px style="width:100%;height:100%">
<tr>
<td style="width:1px">
<span class="TREE" id="TREEMAIN" onc-lick="S.tree(window,92)" style="padding-top:27px;position:relative; display:block; height:100%; overflow-x:hidden; overflow-y:auto;" onselectstart="return false" edesclick="1">
<table border=1px cellSpacing=1px cellPadding=2px onclick="VerAyuda()" oncontextmenu="ColapsarAyuda(this)" style="border:1px solild #888888;width:1px">
<?PHP
$dim2 = file("../../edesweb/h/i/label.ind");
$dim2 = array_merge($dim2, file("../../edesweb/h/i/help2.ind"));
$dim2 = array_merge($dim2, file("../../edesweb/h/i/edesweb.ind"));
$dim = array();
$noRem = false;
for($n=0; $n<count($dim2); $n++){
$txt = trim($dim2[$n]);
if( !$noRem && $txt=="eDesWeb" ) $noRem = true;
if( $noRem ){
if( !($txt=="" || $txt[0]=="["                ) ) $dim[] = $dim2[$n];
}else{
if( !($txt=="" || $txt[0]=="[" || $txt[0]==".") ) $dim[] = $dim2[$n];
}
}
$numTipo = 0;
for($n=0; $n<count($dim); $n++){
$txt = rTrim($dim[$n]);
$label = trim($txt);
if( $label[0]=="~" && $_SESSION["_D_"]<>"~" ) break;
$clave = $label;
$ind = strlen($txt)-strlen($label);
if( substr_count($label,"+")>0 ){
list($label) = explode("+",$label);
}
if( substr_count($label,"{")>0 ){
list($label,$clave) = explode("{",$label);
list($clave) = explode("}",$clave);
}
$nextInd = 0;
if( ($n+1)<count($dim) ){
$nextInd = strlen(rTrim($dim[$n+1]))-strlen(trim($dim[$n+1]));
}
if( $ind==0 ) $numTipo++;
$hTipo = $_DimTipoSet[$numTipo];
if( $ind<$nextInd ){
$clave = "";
$hTipo = "";
}
if( $ind>1 ){
echo "<tr style='display:none'>";
}else{
echo "<tr>";
}
$clave = str_replace(".", "_", $clave);
if( $clave=="" ){
echo "<td id='n{$ind}' pk='{$clave}{$hTipo}' style='font-weight:bold'>";
if( $ind==0 ){
echo "<i class='ICONWINDOW'>ª</i>";
}else{
echo "<i class='ICONWINDOW'>©</i>";
}
}else{
echo "<td id='n{$ind}' pk='{$clave}{$hTipo}'>";
echo "<i class='ICONWINDOW'>b</i>";
}
echo $label;
echo "</tr>";
}
?>
</table>
</span>
</td>
<td id="CONTENEDOR" style="vertical-align:top;">
<iframe frameborder=0 style="width:100%;height:100%;"></iframe>
</td>
</tr>
</table>
</BODY>
</HTML>
