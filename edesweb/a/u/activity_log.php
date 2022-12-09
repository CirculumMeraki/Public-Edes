<?= eHTML('$a/u/activity_log.php') ?>
<style>
BODY {
margin: 0px;
scroll: no;
font-family:arial;
font-size:12px;
}
#_GRTAB {
border-bottom: solid red 1;
}
.Op {
background:#d4d4d4;
cursor:pointer;
border-style:solid;
border-color:#666666;
border-width: 1px 1px 1px 0px;
padding: 0px 7px 0px 7px;
}
.OpOn {
background:#ffffff;
cursor:pointer;
border-style:solid;
border-color:#666666;
border-width: 1px 1px 0px 0px;
padding: 0px 7px 0px 7px;
}
.OpRight {
width:100%;
text-align: right;
cursor:default;
border-style:solid;
border-color:#666666;
border-width: 0px 0px 1px 0px;
}
TD {
text-align: center;
}
TD SPAN {
font-size:70%;
color: #666666;
WHITE-SPACE: nowrap;
}
.iMenu {
background:transparent;
border-style:solid;
border-color:#666666;
border-width: 0px 1px 1px 0px;
padding: 0px 7px 0px 7px;
}
IMG {
cursor:pointer;
}
.SUBMENU {
BORDER-BOTTOM: #cccccc 1px outset;
POSITION: absolute;
BORDER-LEFT: #cccccc 1px outset;
BACKGROUND-COLOR: #ffffff;
BORDER-TOP: #cccccc 1px outset;
BORDER-RIGHT: #cccccc 1px outset;
}
.SUBMENU TR {
BACKGROUND-COLOR: #f7efff;
FONT-FAMILY: helvetica;
COLOR: #57007f;
FONT-SIZE: 11px;
FONT-WEIGHT: normal;
}
.SUBMENU TD {
CURSOR: pointer;
text-align: left;
}
.SUBMENU .ON {
BACKGROUND-COLOR: #cf0c00;
COLOR: #f7efff;
FONT-WEIGHT: normal;
}
.SUBMENU .Linea {
BACKGROUND-COLOR: #808080;
FONT-SIZE: 1px;
CURSOR: default;
}
.SUBMENU .TITULO {
BORDER-BOTTOM: #c8c3c0 1px outset;
TEXT-ALIGN: center;
BACKGROUND-COLOR: #57007f;
COLOR: #ffffff;
CURSOR: default;
}
</style>
<?=_FileNoCache('edes.js')?>
<script type="text/javascript">
top.S.init(window,"all,tab");
top.eSWTools(window,'H',2);
function PonSolapa( pp ){
if( pp==undefined ){
var Obj = S.event(window);
if( Obj.tagName=='SPAN' ) Obj = Obj.parentNode;
if( Obj.tagName!='TD' ) return;
var p = Obj.cellIndex;
}else{
var p = pp;
}
var Obj = S("#_GRTAB").obj.rows[0], n;
if( _Comparar != null ){
for(n=1; n<Obj.cells.length-1; n++){
if( Obj.cells[n].className=='OpOn' ){
if( _Comparar==p ){
top.eInfoError(window, 'No se puede comparar con sigo mismo');
return;
}
}
}
}
for(n=1; n<Obj.cells.length-1; n++){
Obj.cells[n].style.borderBottomWidth = "1px";
Obj.cells[n].className = 'Op';
}
Obj.cells[p].style.borderBottomWidth = "0px";
Obj.cells[p].className = 'OpOn';
S("#MENU").obj.style.display = (p==0)? 'none' : 'block';
var Obj = S("#_GRTAB").obj.rows[0], n;
for(n=0; n<Obj.cells.length; n++) Obj.cells[n].style.display = 'none';
Obj.cells[p-1].style.display = 'block';
if( _Comparar != null ){
Comparar( p );
_Comparar = null;
}
}
function SaltaSolapa(){
var nop = String.fromCharCode(S.eventCode(event));
if( nop<'1' || nop>'9' ) return;
nop = parseInt(nop);
if( nop>S("#_GRTAB").obj.rows[0].cells.length ) return;
PonSolapa( nop );
}
var _Comparar = null;
function _eMenu( Op, OpTextContent, Obj ){
switch( Op ){
case "D":
break;
case "U":
break;
case "C":
var Obj = S("#_GRTAB").obj.rows[0], n;
for( n=1; n<Obj.cells.length-1; n++ ){
if( Obj.cells[n].className == 'OpOn' ){
if( n <= 1 ){
top.eInfo(window,'Tiene que estar visualizando el Script a comparar');
}else if( Obj.cells[n].pk==undefined ){
top.eInfoError(window,'No se puede seleccionar un fichero de comparación');
}else{
_Comparar = n;
}
}
}
break;
case "E":
var Obj = S("#_GRTAB").obj.rows[0], n;
for( n=2; n<Obj.cells.length-1; n++ ){
if( Obj.cells[n].style.borderBottomWidth == '0px' ){
top.eAlert( 'CONFIRMAR', '¿Eliminar solapa?', 'A,C', 'DH', _EliminarScript, null, n );
break;
}
}
break;
case "A":
var Obj = S("#_GRTAB").obj.rows[0], n;
for( n=1; n<Obj.cells.length-1; n++ ){
if( Obj.cells[n].className == 'OpOn' ){
if( n <= 1 ){
top.eInfo(window,'Tiene que estar visualizando el Script a leer');
}else if( Obj.cells[n].pk==undefined ){
top.eInfoError(window,'No se puede seleccionar un fichero de comparación');
}else if( Obj.cells[n].pk.indexOf('~') > 0 ){
top.eInfoError(window,'El script seleccionado es el original');
}else{
ScriptActual( Obj.cells[n].pk.substr(0,Obj.cells[n].pk.length-19), n );
}
}
}
break;
case 'R':
var Obj = S("#_GRTAB").obj.rows[0], n;
for( n=1; n<Obj.cells.length-1; n++ ){
if( Obj.cells[n].className == 'OpOn' ){
if( n <= 1 ){
top.eInfo(window,'Tiene que estar visualizando el Script a leer');
}else if( Obj.cells[n].pk==undefined ){
top.eInfoError(window,'No se puede seleccionar un fichero de comparación');
}else if( Obj.cells[n].pk.indexOf('~') > 0 ){
top.eInfoError(window,'El script seleccionado es el original');
}else{
top.eAlert( 'CONFIRMAR', '¿Restaurar Script?', 'A,C', 'DH', _RestaurarScript, null, Obj.cells[n].pk );
}
}
}
break;
case 'S':
var Obj = S("#_GRTAB").obj.rows[0], n;
for( n=1; n<Obj.cells.length-1; n++ ){
if( Obj.cells[n].className == 'OpOn' ){
if( Obj.cells[n].CompararID!=undefined ){
var pnt = Obj.cells[n].CompararID.split('|');
var id1 = pnt[0].replace('tab_','iSource_');
var id2 = pnt[1].replace('tab_','iSource_');
window.frames[id2].document.body.scrollTop = window.frames[id1].document.body.scrollTop;
window.frames[id1].document.body.onscroll = function anonymous(){ MultiScroll(id1,id2) };
window.frames[id2].document.body.onscroll = function anonymous(){ MultiScroll(id2,id1) };
}
}
}
break;
case 'Q':
var Obj = S("#_GRTAB").obj.rows[0], n;
for( n=1; n<Obj.cells.length-1; n++ ){
if( Obj.cells[n].className == 'OpOn' ){
if( Obj.cells[n].CompararID!=undefined ){
var pnt = Obj.cells[n].CompararID.split('|');
var id1 = pnt[0].replace('tab_','iSource_');
var id2 = pnt[1].replace('tab_','iSource_');
window.frames[id1].document.body.onscroll = null;
window.frames[id2].document.body.onscroll = null;
}
}
}
break;
}
}
function MultiScroll( Server, Esclavo ){
window.frames[Esclavo].document.body.scrollTop = window.frames[Server].document.body.scrollTop;
}
function DivideScreen(){
var Obj = S.event(window);
var nTab = Obj.Comparar.split(',');
var pnt = Obj.CompararID.split('|');
var Obj = S("#_GRTAB").obj.rows[0], n;
for( n=0; n<Obj.cells.length; n++ ){
Obj.cells[n].style.display = 'none';
Obj.cells[n].style.width = '100%';
}
with( DGI(pnt[0].replace('tab_','pag_')).style ){
width = '50%';
display = 'block';
}
with( DGI(pnt[1].replace('tab_','pag_')).style ){
width = '50%';
display = 'block';
}
return false;
}
function _EliminarScript( Op, DimNo, nCol ){
if( Op < 1 ) return;
var sId = S("#_GRTAB").obj.rows[0].cells[nCol].id;
S(S("#_GRTAB").obj.rows[0].cells[nCol]).nodeRemove();
S('#pag_'+sId.substr(4)).nodeRemove();
PonSolapa(1);
_CargarScript = true;
}
function _RestaurarScript( Op, DimNo, Script ){
if( Op < 1 ) return;
RestaurarScript( Script );
}
function eMenu(){
top.eMenu( window, S.event(window), {
".-":"MENU",
"D":"Dividir pantalla",
"U":"Pantalla única",
"A":"Script actual",
".--":"",
"C":"Comparar con",
"S":"Enlazar scroll",
"Q":"Quitar Enlace scroll",
".---":"",
"E":"Eliminar solapa",
"R":"Restaurar script"
}, _eMenu );
}
var _CargarScript = true;
function Comparar( CompararCon ){
if( S("#_GRTAB").obj.rows[0].cells[CompararCon].pk==undefined ){
top.eInfoError(window, 'No se puede seleccionar un fichero de comparación');
return;
}
if( !_CargarScript ){
PonSolapa( 1 );
top.eInfo(window,'No caben mas solapas');
return;
}
_iSource++;
document.getElementsByTagName('TABLE')[0].rows[0].style.display = 'block';
DGI("MENU").style.display = 'block';
document.getElementsByTagName('TABLE')[0].rows[1].style.display = 'block';
var Obj = DGI("_GRTAB").rows[0], n;
var Comparar   = Obj.cells[_Comparar].pk+'|'+Obj.cells[CompararCon].pk;
var CompararID = Obj.cells[_Comparar].id+'|'+Obj.cells[CompararCon].id;
for( n=1; n<Obj.cells.length-1; n++ ){
Obj.cells[n].style.borderBottomWidth = "1px";
Obj.cells[n].className = 'Op';
}
var oAncho = S("#_GRTAB").obj.offsetWidth;
var newSolapa = ( CompararCon > _Comparar ) ? CompararCon : _Comparar;
var TD = Obj.insertCell(newSolapa);
TD.onclick = PonSolapa;
TD.className = 'OpOn';
TD.style.borderBottomWidth = "0px";
TD.textContent = 'Comparación';
TD.style.fontSize = '70%';
TD.Comparar = _Comparar+','+CompararCon;
TD.CompararID = CompararID;
TD.oncontextmenu = DivideScreen;
TD.id = 'tab_'+_iSource;
if( oAncho < S("#_GRTAB").obj.offsetWidth ){
TD.style.display = 'none';
_CargarScript = false;
return;
}
var Obj = S("#_GRTAB").obj.rows[0];
for( n=0; n<Obj.cells.length; n++ ) Obj.cells[n].style.display = 'block';
var TD = Obj.insertCell(newSolapa-1);
for( n=0; n<Obj.cells.length; n++ ) Obj.cells[n].style.display = 'none';
TD.style.display = 'block';
TD.style.width = '100%';
TD.style.height = '100%';
TD.id = 'pag_'+_iSource;
var ta = document.createElement('IFRAME');
ta.frameBorder = 0;
ta.WOPENER = window;
ta.FSCREEN = 0;
ta.eDes = window;
ta.MODAL = 0;
ta.style.width = '100%';
ta.style.height = '100%';
ta.id = 'iSource_'+_iSource;
TD.appendChild(ta);
ta.src = 'edes.php?E:$t/source.gs&COMPARAR='+Comparar+'|'+_Comparar+'|'+CompararCon+'|'+CompararID;
}
var _iSource = 0;
function ScriptActual( NomScript, newSolapa ){
if( S("#_GRTAB").obj.rows[0].cells[newSolapa].pk==undefined ){
top.eInfoError(window,'No se puede seleccionar un fichero de comparación');
return;
}
if( !_CargarScript ){
PonSolapa( 1 );
top.eInfo(window,'No caben mas solapas');
return;
}
_iSource++;
document.getElementsByTagName('TABLE')[0].rows[0].style.display = 'block';
DGI("MENU").style.display = 'block';
document.getElementsByTagName('TABLE')[0].rows[1].style.display = 'block';
var Obj = DGI("_GRTAB").rows[0], n;
for( n=1; n<Obj.cells.length-1; n++ ){
Obj.cells[n].style.borderBottomWidth = "1px";
Obj.cells[n].className = 'Op';
}
var oAncho = DGI("_GRTAB").offsetWidth;
var TD = Obj.insertCell(newSolapa);
TD.onclick = PonSolapa;
TD.className = 'OpOn';
TD.style.borderBottomWidth = "0px";
TD.textContent = NomScript;
TD.pk = NomScript+'~ACTUAL'
TD.id = 'tab_'+_iSource;
if( oAncho<S("#_GRTAB").obj.offsetWidth ){
TD.style.display = 'none';
_CargarScript = false;
return;
}
var Obj = S("#_GRTAB").obj.rows[0];
for(n=0; n<Obj.cells.length; n++) Obj.cells[n].style.display = 'block';
var TD = Obj.insertCell(newSolapa-1);
for(n=0; n<Obj.cells.length; n++) Obj.cells[n].style.display = 'none';
TD.style.display = 'block';
TD.style.width = '100%';
TD.style.height = '100%';
TD.id = 'pag_'+_iSource;
var ta = document.createElement('IFRAME');
_iSource++;
ta.id = 'iSource_'+_iSource;
ta.frameBorder = 0;
ta.WOPENER = window;
ta.FSCREEN = 0;
ta.eDes = window;
ta.MODAL = 0;
ta.style.width = '100%';
ta.style.height = '100%';
TD.appendChild(ta);
ta.src = 'edes.php?E:$t/source.gs&SCRIPT='+NomScript+'&CDI=ACTUAL';
}
function RestaurarScript( Script ){
top.eCallSrv( window, 'edes.php?E:$t/source.gs&RESTAURAR='+Script );
}
</SCRIPT>
</HEAD>
<BODY>
<table border=0px cellspacing=0px cellpadding=0px style='width:100%;height:100%;cursor:default;' onkeypress='SaltaSolapa()'>
<tr height=1px style='display:none;'>
<th style='padding-top:5px'>LOG DE GRABACIONES</th>
</tr>
<tr height=1px style='display:none'>
<td valign=middle align=left>
<table id=_GRTAB>
<tr>
<td class=iMenu><img src='g/op_menu.gif' onclick='eMenu()' id=MENU></td>
<td onclick='PonSolapa()' class=Op style='font-weight:bold'>LISTADO</td>
<td class=OpRight>&nbsp;</td>
</tr>
</table>
</td>
</tr>
<tr>
<td valign=middle align=center height=100% id=cIFrame>
<table border=0 cellspacing=0 cellpadding=0 id=_GRPAG width=100% height=100%>
<tr>
<td>
<IFRAME id=IWORK2 eNORESIZE=true src='edes.php?Fc:$a/u/activity_log.edf' on_activate='_eIWorkFocus()' width='100%' height='100%' FRAMEBORDER=0 SCROLLING='auto'></IFRAME>
<script type="text/javascript">
window.IWORK2.WOPENER = window;
top.eLoading(0,window);
</SCRIPT>
</td>
</tr>
</table>
</td>
</tr>
</table>
</BODY>
</HTML>
<?PHP
exit;
