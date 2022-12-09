<?PHP
session_start(); if( !isset($_SESSION['_User']) ) exit;
chdir('..');
if( $Tipo=='' ){
eHTML('$a/u/directorio.gs');
echo '<script type="text/javascript">top.eLoading(false,window);</SCRIPT>';
echo '</HEAD><BODY topmargin=10px bottommargin=0px leftmargin=10px rightmargin=0px>';
?>
<FORM METHOD='POST'>
<INPUT TYPE="checkbox" NAME="Expandir" VALUE="D"> Expadir carpetas<br><br>
<INPUT TYPE="checkbox" NAME="Tipo" VALUE="D"> Definiciones<br>
<INPUT TYPE="checkbox" NAME="Tipo" VALUE="C"> Código<br>
<INPUT TYPE="checkbox" NAME="Tipo" VALUE="G"> Gráficos<br>
<INPUT TYPE="checkbox" NAME="Tipo" VALUE="S"> Sonidos<br>
<INPUT TYPE="checkbox" NAME="Tipo" VALUE="P"> Películas<br>
<INPUT TYPE="checkbox" NAME="Tipo" VALUE="T" checked> Todo (*.*)<br>
<INPUT TYPE="submit" VALUE="Ver directorios">
<FORM>
<?PHP
echo "</BODY></HTML>";
exit;
}
$_Directorio = '.';
$Todo = false;
switch( $Tipo ){
case 'D':
$_Extension = array( 'GDF','EDF', 'GDF', 'LDF', 'LST', 'SEL', 'DEF','INI' );
break;
case 'C':
$_Extension = array( 'HTM','HTML', 'CSS', 'PHP', 'PHP4', 'JS' );
break;
case 'G':
$_Directorio = 'g';
$_Extension = array( 'GIF','JPG','PNG' );
break;
case 'P':
$_Extension = array( 'AVI' );
break;
case 'S':
$_Extension = array( 'WAV', 'MID' );
break;
case 'T':
$_Extension = array( );
$Todo = true;
break;
default:
exit;
}
$Nivel = 0;
function VerDirectorio( $Dir ){
global $_Extension, $Tipo, $Todo, $Nivel, $Expandir;
$Nivel++;
$sDir = $Dir;
if( substr( $sDir,0,2 ) == './' ) $sDir = substr( $sDir,2 );
if( $Tipo != 'G' ){
if( $Expandir ){
if( $Nivel > 1 ){
if( $Dir != '.' ) echo '<LI CLASS="CarON" style="list-Style-Image:URL(g/c1_1.gif);list-style-type:none">'.$sDir.'</LI>';
echo '<UL>';
}else{
if( $Dir != '.' ) echo '<LI CLASS="CarON" style="list-Style-Image:URL(g/c1_1.gif);list-style-type:none">'.$sDir.'</LI>';
echo '<UL style="display:block">';
}
}else{
if( $Nivel > 1 ){
if( $Dir != '.' ) echo '<LI CLASS="CarOFF" style="list-Style-Image:URL(g/c1_0.gif);list-style-type:none">'.$sDir.'</LI>';
echo '<UL style="display:none">';
}else{
if( $Dir != '.' ) echo '<LI CLASS="CarON" style="list-Style-Image:URL(g/c1_1.gif);list-style-type:none">'.$sDir.'</LI>';
echo '<UL style="display:block">';
}
}
}
if( !is_readable( $Dir ) ) die( "<br>Error al abrir el directorio: $Dir" );
$nImgEnLinea = 0;
$pDir = opendir( $Dir );
while( $file = readdir( $pDir ) ){
if( ( $file != "." ) && ( $file != ".." ) ){
if( is_dir($Dir.'/'.$file) ){
VerDirectorio( "$Dir/$file" );
}else{
if( $Todo || in_array( substr(strtoupper($file), strrpos($file, ".")+1), $_Extension ) ){
if( $Tipo == 'G' ){
$FileImg = $Dir.'/'.$file;
if( substr($FileImg,0,2) == './' ) $FileImg = substr($FileImg, 2 );
if( substr_count( $FileImg,'.cur' ) ){
echo "<SPAN style='cursor:url(\"{$FileImg}\")' title='{$file}' style='border:1px solid #cccccc'> Cursor </span>";
}else{
echo "<IMG src='{$FileImg}' title='{$file}'>";
}
if( substr_count($FileImg,'_0.')==0 ){
echo '<br>';
}else{
echo '&nbsp;';
}
}else{
echo '<LI CLASS="Doc" style="list-Style-Image:URL(g/doc_0.gif);list-style-type:none">'.$file.'</LI>';
}
}
}
}
}
closedir( $pDir );
echo '</UL>';
$Nivel--;
}
eHTML();
?>
<style>
BODY {
FONT-FAMILY: ARIAL;
FONT-SIZE: 13px;
BACKGROUND: #f2f2f2;
}
TD {
COLOR: #000099;
BACKGROUND: #c2d1d9;
}
#MENU TD {
padding: 0px 10px 0px 10px;
FONT-SIZE: 12px;
}
#Linea {
BACKGROUND: #000099;
}
TABLE {
BACKGROUND: #000099;
cursor:pointer;
}
A {
COLOR: #FFFF33;
BACKGROUND: blue;
}
LI {
padding-left: 5px;
}
UL {
margin-left: 12px;
}
.Doc {
COLOR: #003399;
}
.CarOFF .CarON {
COLOR: #000099;
}
IMG {
border: 1px solid #cccccc;
}
</style>
</HEAD>
<BODY topmargin=0 leftmargin=0 rightmargin=0 bottommargin=0>
<?PHP
echo '<div id=Directorio style="margin-left:10px;margin-top:5px;">';
VerDirectorio( $_Directorio );
if( $_Directorio == 'g' ) VerDirectorio( 'i' );
echo '</div>';
?>
<IFRAME name='TLF' style='display:none' FRAMEBORDER=1 src='' width='100%' height='100%' SCROLLING='auto'></iframe>
<DIV id='MENU' style='display:none; position:absolute;'>
<table cellspacing=1px cellpadding=4px border=0px onclick="Menu();">
<tr><td>Ver</td></tr>
<tr><td disabled>Editar</td></tr>
<tr><td id=Linea></td></tr>
<tr><td disabled>Copiar</td></tr>
<tr><td disabled>Renombrar</td></tr>
<tr><td disabled>Mover</td></tr>
<tr><td disabled>Borrar</td></tr>
</table>
</DIV>
<script type="text/javascript">
var _OpActual = '#';
var _UltOpcion = '#';
function NivelMenu(){
var open = S.event(window);
var el = null;
if( open.className == "Doc" ){
var ObjMenu = DGI( 'MENU' );
ObjMenu.style.display = 'block';
ObjMenu.style.top = event.y + 10;
ObjMenu.style.left = event.x;
ObjMenu.style.top = open.offsetTop + open.offsetHeight;
ObjMenu.style.left = open.offsetLeft;
_OpActual = open;
if( _UltOpcion != "#" ) _UltOpcion.style.listStyleImage = _UltOpcion.style.listStyleImage.replace('_1','_0');
_UltOpcion = open;
open.style.listStyleImage = open.style.listStyleImage.replace('_0','_1');
return true;
}
if( open.tagName != 'LI' ) return;
while( open != null ){
if( open.tagName == "LI" ){
el = open;
switch( el.className ){
case "CarON":
el.className = "CarOFF";
el.style.listStyleImage = el.style.listStyleImage.replace('_1','_0');
break;
case "CarOFF":
el.className = "CarON";
el.style.listStyleImage = el.style.listStyleImage.replace('_0','_1');
break;
}
break;
}
open = open.parentNode;
}
if( null == el ) return;
var pos = 0;
for( var pos=0; pos<el.children.length; pos++ ){
if( "UL"==el.children[pos].tagName ) break;
}
if( pos == el.children.length ) return;
el = el.children[pos];
if( "UL" == el.tagName ) el.style.display = ( "none" == el.style.display || "" == el.style.display ) ? "block" : "none";
S.eventClear(window);
}
var _ColorOn   = '#0033CC';
var _ColorOff  = '#000000';
var _sColorOn  = "#000000";
var _sColorOff = "#336633";
function Opcion(){
var clase = S.event(window).className;
if ( clase == 'ARBOL' ){
var sId = S.event(window).id;
var p = DGI("OpF").all;
var a = S.event(window).getAttribute("nOp");
var n = ( a - 1 ) * 8 - (a-1);
if( sId == 'OpFOn' ){
p[4+n].style.color = ( event.type == 'mouseover' ) ? _ColorOn : _ColorOff;
}else{
p[4+n].style.color = ( event.type == 'mouseover' ) ? _sColorOn : _sColorOff;
}
}else if( clase.search("ExeDoc") == 0 ){
S.event(window).style.color = (event.type == 'mouseover') ? _ColorOn : _ColorOff;
}
}
document.onclick = NivelMenu;
var _Ventana = null;
function Menu(){
if( S.event(window).tagName == 'A' ) return true;
var _nOpActual = _OpActual.sourceIndex;
var Opcion = S.event(window).textContent;
var Fichero = _OpActual.textContent;
var Dir = '';
for( var n = _nOpActual-1; n > 0; n-- ){
if( document.children[n].tagName == 'LI' ){
if( document.children[n].className.substring(0,3) == 'Car' && _OpActual.offsetLeft > document.children[n].offsetLeft && document.children[n].offsetLeft > 0 ){
Dir = document.children[n].firstChild.nodeValue;
DGI('MENU').style.display = 'none';
break;
}
}
}
var NewDir = 'edes.php?E:$a/u/fichero.gs&' +Dir + '/' + Fichero;
TLF.location.href = NewDir;
DGI('MENU').style.display = 'none';
top.eAutoMenu(2);
DGI('Directorio').style.display = 'none';
TLF.frameElement.style.display = 'block';
}
top.eLoading(false,window);
</SCRIPT>
</BODY>
</HTML>
