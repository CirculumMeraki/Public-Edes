<?PHP
eHTML();
?>
<SCRIPT type="text/javascript">
var _ViewPrint = false;
document.title = "TAB";
top.S.init(window,"all,tab");
S.windowView(window);
function setConfig(o){
if( _ViewPrint ){
setTimeout(function(){
if( S(":setup_width").val() && S(":setup_height").val() ){
var cons = 0.682;
S(".MarcasPrint").block();
top._FIELDS["_A4Width"] = S(":setup_width").val()*cons;
top._FIELDS["_A4Height"] = S(".MarcasPrint SPAN").obj.offsetHeight*S(":setup_height").val()*cons;
top._SaveDefaults();
S.windowClose(window);
}
}, 100);
}else{
setTimeout(function(){
S(":setup_width").val("");
S(":setup_height").val("");
}, 100);
S.error('Primero pulse el botón de "Imprimir"');
}
}
function Init(){
S("INPUT").class("=READONLY");
}
</SCRIPT>
<style type="text/css" media="print">
@page {
s-ize: auto;
s-ize: 10cm 10cm;
s-ize: A4 landscape;
size: A4;
margin: 0mm;
}
body {
background-color:#FFFFFF;
margin: 0px;
-border: solid 1px black ;
-margin-left: auto;
-margin-right: auto;
}
#Papel {
background-color:#FFFFFF;
}
.Description * {
display:none;
}
label {
display:none;
}
#LD {
display:none;
}
.MarcasPrint {
display:block;
}
.MarcasPrint span {
display:block;
font-family:monospace;
font-size:20px;
padding:3px;
height:30px;
border:1px solid #dddddd;
text-align:right;
}
</style>
<style type="text/css" media="screen">
BODY {
overflow:hidden;
}
#LD {
margin-left: 4px;
}
.MarcasPrint {
display:none;
}
.MarcasPrint SPAN {
display:block;
font-family:monospace;
font-size:20px;
padding:3px;
height:30px;
border:1px solid #dddddd;
text-align:right;
}
.Description {
display:block;
padding-left:5px;
}
.SELECT TD {
font-family:monospace;
}
</style>
</head><body onclick="S('.SELECT').none()" onload="S('INPUT').class('=READONLY')">
<div class="Description">
<form name="FRM1">
<div style="width:365px;padding-left:4px;line-height:1.5;">
<b>Pasos a seguir para configurar la impresora:</b><br><br>
Pulsar el botón "Imprimir", le saldrán varias páginas con rectángulos numerados y deberá elegir:<br>
<span style="margin-right:25px;"></span>El nº del último rectángulo de la primera página.<br>
<span style="margin-right:25px;"></span>El nº del último rectángulo visible completo.<br><br>
Después pulsar "Cancelar" para salir de la previsualización.<br><br>
Introducir los números de los rectángulos.
</div>
<br>
<?PHP
echo "&nbsp;";
eAddButton("print", "Imprimir", "_ViewPrint=true;S('INPUT').class('=EDITABLE');window.print()", "", "style='margin-left:6px;'");
?>
<br>
<input name="setup_height" i_ss="1" value="" style="display:none" alto="1" td="0" autocomplete="new_password">
<label for="setup_height" id="LD">Nº del último rectángulo de la primera página (ej. 44)</label> <span class="SELECTINPUT" onclick="S.key('S')">
<input name="_INPUT_setup_height" ind="-1" tmpind="-1" pp="1" onfocus="S.key('S')" class="EDITABLE" ewe="1" style="width:350px;" type="TEXT" onchange="setConfig(this)" value="" autocomplete="new_password" ehelpno="1" eselectrows="11">
</span>
<div class="SELECT EDITABLE SCROLLBAR" style="width:100px; display:none;">
<table id="setup_height_TABLE" cols="2">
<colgroup><col><col></colgroup><tbody>
<tr><td></td><td>&nbsp;</td></tr>
<?PHP
for($n=30; $n<150; $n++){
echo "<tr><td>{$n}</td><td>{$n}</td></tr>";
}
?>
</tbody></table>
</div>
<br><br>
<input name="setup_width" i_ss="1" value="" style="display:none" alto="1" td="0" autocomplete="new_password">
<label for="setup_width" id="LD">Nº del último rectángulo visible completo (ej. 117)</label> <span class="SELECTINPUT" onclick="S.key('S')">
<input name="_INPUT_setup_width" ind="-1" tmpind="-1" pp="1" onfocus="S.key('S')" class="EDITABLE" ewe="1" style="width:350px;" type="TEXT" onchange="setConfig(this)" value="" autocomplete="new_password" ehelpno="1" eselectrows="11">
</span>
<div class="SELECT EDITABLE SCROLLBAR" style="width:100px; display:none;">
<table id="setup_width_TABLE" cols="2">
<colgroup><col><col></colgroup><tbody>
<tr><td></td><td>&nbsp;</td></tr>
<?PHP
$i = 0;
for($n=600; $n<1850; $n+=5){
$i++;
if( $i>29 ) echo "<tr><td>{$n}</td><td>{$i}</td></tr>";
}
?>
</tbody></table>
</div>
</form>
</div>
<div class="MarcasPrint">
<?PHP
$i = 0;
for($n=600; $n<1850; $n+=5){
$i++;
echo "<span e-v={$n} style='width:{$n}px'>{$i}</span>";
}
echo "</div>";
echo "</body></html>";
eEnd();
?>
