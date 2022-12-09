<?= eHTML('$form.php', '', 'Editor de Documentos en PDF') ?>
<SCRIPT type="text/javascript">
document.title = "TAB/LIST";
top.S.init(window, "all,list");
S.windowView(window);
</SCRIPT>
<STYLE>
body, html{
height:100%;
width:100%;
}
BODY{
margin:0px;
padding:0px;
}
.BROWSE TD {
cursor:pointer;
}
.BROWSE TD {
vertical-align: middle !important;
}
input {
border-width:0px;
background-color:transparent;
}
text {
font-family: Helvetica;
}
.resizer{
width: 10px;
height: 10px;
border-radius: 50%;
background: transparent;
border: 1px solid #4286f4;
position: absolute;
z-index:1000;
}
.SeparadorVertical {
width:50px;
}
#EntradaDeTexto {
border: 1px solid red;
border-radius: 0px;
padding: 0px !important;
margin: 0px !important;
}
.spanMultilinea DIV {
font-size:inherit;
font-family:inherit;
}
.spanMultilinea I {
font-size:inherit;
font-family:inherit;
}
.spanMultilinea B {
font-size:inherit;
font-family:inherit;
}
.spanMultilinea U {
font-size:inherit;
font-family:inherit;
}
.spanMultilinea * {
font-size:inherit;
font-family:inherit;
}
#edCONTAINER DIV {
font-size:inherit;
font-family:inherit;
}
#edCONTAINER I {
font-size:inherit;
font-family:inherit;
}
#edCONTAINER B {
font-size:inherit;
font-family:inherit;
}
#edCONTAINER U {
font-size:inherit;
font-family:inherit;
}
#edCONTAINER * {
font-size:inherit;
font-family:inherit;
}
.BROWSE th, .BROWSE td {
padding: 2px;
}
input, textarea, #edCONTAINER {
border-radius: 0px;
padding: 2px !important;
}
svg, div, span {
cursor:crosshair;
}
#idFORMULARIO INPUT {
border:1px solid #aaaaaa !important;
}
#edCONTAINER {
BORDER-BOTTOM: #6c7b82 1px solid;
BORDER-LEFT: #6c7b82 1px solid;
BORDER-RIGHT: #6c7b82 1px solid;
BORDER-TOP: #6c7b82 1px solid;
MARGIN-BOTTOM: 1px;
MARGIN-LEFT: 5px;
MARGIN-TOP: 1px;
PADDING-BOTTOM: 0px;
PADDING-LEFT: 0px;
PADDING-RIGHT: 0px;
PADDING-TOP: 0px;
background-color: #ffffff;
}
#edCONTAINER SPAN {
CURSOR: default;
FONT-FAMILY: ARIAL;
FONT-SIZE: 14px;
MARGIN: 0px;
PADDING-BOTTOM: 3px;
PADDING-LEFT: 3px;
PADDING-RIGHT: 3px;
PADDING-TOP: 3px;
}
#texto_ {
cursor:text !important;
}
#texto_ * {
cursor:text !important;
}
SPAN I {
font-style:italic;
font-family:ARIAL;
}
.edOUT {
BACKGROUND-COLOR: #dfffff;
COLOR: #001f78;
}
.edOVER {
BACKGROUND-COLOR: #ffffe7;
COLOR: #000f78;
}
#edMENUS {
BACKGROUND-COLOR: #ffffff;
BORDER-BOTTOM: #6c7b82 1px solid;
BORDER-LEFT: #6c7b82 1px solid;
BORDER-RIGHT: #6c7b82 1px solid;
BORDER-TOP: #6c7b82 1px solid;
cursor:pointer;
}
#edMENUS IMG {
BORDER-BOTTOM-WIDTH: 0px;
BORDER-LEFT-WIDTH: 0px;
BORDER-RIGHT-WIDTH: 0px;
BORDER-TOP-WIDTH: 0px;
MARGIN: 0px;
PADDING-BOTTOM: 0px;
PADDING-LEFT: 0px;
PADDING-RIGHT: 0px;
PADDING-TOP: 0px;
}
#edCOLORES {
BORDER-BOTTOM: #6c7b82 1px solid;
BORDER-COLLAPSE: collapse;
BORDER-LEFT: #6c7b82 1px solid;
BORDER-RIGHT: #6c7b82 1px solid;
BORDER-TOP: #6c7b82 1px solid;
CURSOR: default;
DISPLAY: none;
PADDING-BOTTOM: 0px;
PADDING-LEFT: 0px;
PADDING-RIGHT: 0px;
PADDING-TOP: 0px;
POSITION: absolute;
}
#edCOLORES TD {
HEIGHT: 10px;
WIDTH: 10px;
}
</STYLE>
<SCRIPT type="text/javascript" SRC="edes.php?R:$ed.js&j=1570467373"></SCRIPT>
<SCRIPT type="text/javascript">
const SVG_NS = "http://www.w3.org/2000/svg";
var _Source=_DESDE_=_FCH_="$form.php",
_HojaAncho = 630,
_HojaAlto = 891;
var DGI	= function(a){
var el;
if( document.getElementById ){
el = document.getElementById(a);
}else if( document.all ){
el = document.document.all[a];
}else if( document.layers ){
el = document.document.layers[a];
}
return el || document.getElementsByName(a)[0] || null;
}
function eXY(el, obj){
var c = (obj) ? S(el).around(obj) : S(el).xy();
return Array(c["x"],c["y"],c["w"],c["h"]);
}
function inside(x, y, vs, o){
var inside=false, i, xi, yi, xj, yj, intersect;
for(i=0, j=vs.length-1; i<vs.length; j=i++){
xi = vs[i][0];
yi = vs[i][1];
xj = vs[j][0];
yj = vs[j][1];
intersect = ((yi>y)!=(yj>y)) && (x<(xj-xi)*(y-yi)/(yj-yi)+xi);
if( intersect ) inside = !inside;
}
return inside;
}
function insideCircle(p1, p2, radius){
return(Math.sqrt(Math.pow(p2[0]-p1[0], 2)+Math.pow(p2[1]-p1[1], 2))<radius);
}
function anguloRecta(x1, y1, x2, y2){
var distY = Math.abs(y2-y1),
distX = Math.abs(x2-x1),
dist = Math.sqrt((distY*distY)+(distX*distX)),
val = distY/dist,
aSine = Math.asin(val);
return (aSine*(180/Math.PI));
}
function pDistance(x, y, x1, y1, x2, y2){
var A = x - x1,
B = y - y1,
C = x2 - x1,
D = y2 - y1,
dot = A * C + B * D,
len_sq = C * C + D * D,
param = dot / len_sq,
xx, yy;
if( param<0 || (x1==x2 && y1==y2) ){
xx = x1;
yy = y1;
}else if( param>1 ){
xx = x2;
yy = y2;
}else{
xx = x1 + param * C;
yy = y1 + param * D;
}
var dx = x - xx,
dy = y - yy;
return Math.sqrt(dx * dx + dy * dy);
}
function interseccion2(x1,y1, x2,y2, X1,Y1, X2,Y2){
var x,y;
x = (Y1*X2 - Y2*X1)/((X2-X1)*((y2-y1)/(x2-x1) - (Y2-Y1)/(X2-X1))) - (y1*x2 - y2*x1)/((x2-x1)*((y2-y1)/(x2-x1) - (Y2-Y1)/(X2-X1)));
y = ((y2-y1)/(x2-x1))*x + (y1*x2 - y2*x1)/(x2-x1);
return [x,y];
}
function slope(x1, y1, x2, y2){
if (x1 == x2) return false;
return (y1 - y2) / (x1 - x2);
}
function yInt(x1, y1, x2, y2){
if (x1 === x2) return y1 === 0 ? 0 : false;
if (y1 === y2) return y1;
return y1 - slope(x1, y1, x2, y2) * x1 ;
}
function getXInt(x1, y1, x2, y2){
var slope;
if (y1 === y2) return x1 == 0 ? 0 : false;
if (x1 === x2) return x1;
return (-1 * ((slope = slope(x1, y1, x2, y2)) * x1 - y1)) / slope;
}
function interseccion3(x11, y11, x12, y12,  x21, y21, x22, y22){
var slope1, slope2, yint1, yint2, intx, inty;
if (x11 == x21 && y11 == y21) return [x11, y11];
if (x12 == x22 && y12 == y22) return [x12, y22];
slope1 = slope(x11, y11, x12, y12);
slope2 = slope(x21, y21, x22, y22);
if (slope1 === slope2) return false;
yint1 = yInt(x11, y11, x12, y12);
yint2 = yInt(x21, y21, x22, y22);
if (yint1 === yint2) return yint1===false ? false : [0, yint1];
if (slope1 === false) return [y21, slope2 * y21 + yint2];
if (slope2 === false) return [y11, slope1 * y11 + yint1];
intx = (slope1 * x11 + yint1 - yint2)/ slope2;
return [intx, slope1 * intx + yint1];
}
function intersection($ax1, $ay1, $ax2, $ay2, $bx1, $by1, $bx2, $by2){
var $a1 = $ax1 - $ax2,
$a2 = $bx1 - $bx2,
$b1 = $ay1 - $ay2,
$b2 = $by1 - $by2,
$c = ($a1 * $b2) - ($b1 * $a2),
$a,$b,$x,$y;
if( Math.abs($c)>0.01 ){						 // En caso de que haya interseccion
$a = ($ax1 * $ay2) - ($ay1 * $ax2);
$b = ($bx1 * $by2) - ($by1 * $bx2);
$x = ($a * $a2 - $b * $a1) / $c;
$y = ($a * $b2 - $b * $b1) / $c;
}else{
$x = 0;
$y = 0;
}
return [$x, $y];
}
function distanciaEntrePuntos(x1,y1, x2,y2){
var a = x1 - x2,
b = y1 - y2;
return Math.sqrt(a*a + b*b);
}
function alargar(idr) {
x1=parseInt(getAtr(idr,"x1")); x2=parseInt(getAtr(idr,"x2")); y1=parseInt(getAtr(idr,"y1")); y2=parseInt(getAtr(idr,"y2"));
avanzaX=x2-x1; avanzaY=y2-y1;
n=1000;
recta(x1-avanzaX*n, y1-avanzaY*n, x2+avanzaX*n, y2+avanzaY*n);
}
function DibujarPoligono(d){
var txt = "", n;
for(n=0; n<d.length; n++){
if( txt!="" ) txt += " ";
txt += d[n][0]+","+d[n][1];
}
let polygon = document.createElementNS(SVG_NS, 'polygon');
polygon.setAttributeNS(null, "points", txt);
polygon.setAttributeNS(null, "stroke", "orange");
polygon.setAttributeNS(null, "fill", "transparent");
polygon.setAttributeNS(null, "stroke-width", 1);
polygon.setAttributeNS(null, "eType", "P");
S("#vmlHoja").obj.appendChild(polygon);
}
function ParpadearOp(o){
S(o).css("color:red");
setTimeout(function(){ S(o).css("color:"); }, 1000);
}
function ResizeFondo(){
if( S(":fondo_ancho").val()!="" && S(":fondo_alto").val()!="" ){
S("#ImgFondo").obj.style.backgroundSize = (S(":fondo_ancho").val()*3)+"px "+(S(":fondo_alto").val()*3)+"px";
}else{
S("#ImgFondo").obj.style.backgroundSize = "";
}
}
var _TipoImagen, _LastImg=null;
function InsertImagen(img){
_LastImg = img;
S("#idIMG").obj.src = "";
S("#idIMG").obj.src = "edes.php?R:/_datos/portfolio/"+img;
if( !S.is("not", _TipoImagen) ){
S("#ImgFondo").obj.style.backgroundPosition = "0px 0px";
S("#ImgFondo").css({backgroundImage:"url('edes.php?R:/_datos/portfolio/"+img+"')"});
if( S(":fondo_ancho").val()!="" && S(":fondo_alto").val()!="" ){
S("#ImgFondo").obj.style.backgroundSize = (S(":fondo_ancho").val()*3)+"px "+(S(":fondo_alto").val()*3)+"px";
}else{
S("#ImgFondo").obj.style.backgroundSize = "";
}
return;
}
S("body").on("click", function(o){
var scroll = S.scrollGet(window),
xHoja = S("#vmlHoja").xy().x,
x = event.clientX-xHoja+scroll.scrollLeft,
y = event.clientY+scroll.scrollTop;
CreateSvgElement({svg:'image',
x: x,
y: y,
width: S("#idIMG").obj.offsetWidth,
height: S("#idIMG").obj.offsetHeight,
href: "edes.php?R:/_datos/portfolio/"+img
});
S("#idIMG").obj.src = "";
S("body").on("click", null);
});
}
function MoverFondo(o){
if( S("#ImgFondo").css("backgroundImage")!="" ){
if( o.getAttribute("eCapturar")==null || o.getAttribute("eCapturar")=="0" ){
EliminaCapturas();
o.setAttribute("eCapturar", "1");
S(o).css("color:red");
S("body").css("overflow:hidden");
_ObjAMover = document.body;
S("body").on("keydown", function(o){
desplazar(o);
});
}else{
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").css("overflow:auto");
S("body").on("click", null);
S("body").on("keydown");
}
}
S.eventClear(event);
}
function uSelectImagen(o, tipo){
EliminaCapturas();
ParpadearOp(o);
_TipoImagen = tipo;
if( !S.is("not", _TipoImagen) ){
S("#ImgFondo").css({backgroundPosition:"0px 0px", backgroundImage:"", backgroundSize:""});
}
S.window("edes.php?Lcl:$a/d/portfolio_sel.edf&_FILTER="+escape(tipo), {modal:true});
}
function GestorImagenes(o){
S.window("edes.php?Lgl:$a/d/portfolio.edf", {fullscreen:true});
}
function uVerImagen(o){
var campo = S("INPUT", S.toTag(o,"TR")).obj.name;
if( eGF(campo)!="" ){
campo = eGF(campo).split(".")[0];
top.eCallSrv(window,"edes.php?E:$/a/poll/poll_img.php&IMG="+campo);
}
return S.eventClear(window);
}
function Marcar(OnOff, o, tipo){
if( OnOff ){
if( tipo=="H" ){
S(o).attr("bakBorderColor", S(o).css("border-color"));
S(o).css("border-color:red");
}else if( tipo=="I" ){
S(o).css("opacity:0.4");
}else if( tipo=="T" ){
S(o).attr("bakFill", S(o).attr("fill"));
S(o).attr("fill", "red");
}else{
S(o).attr({oStroke:S(o).attr("stroke"), stroke:"red"});
}
setTimeout(function(){ Marcar(false, o, tipo); }, 500);
}else{
if( tipo=="H" ){
S(o).css("border-color:"+S(o).attr("bakBorderColor"));
}else if( tipo=="I" ){
S(o).css("opacity:");
}else if( tipo=="T" ){
S(o).attr("fill", S(o).attr("bakFill"));
}else{
S(o).attr("stroke", S(o).attr("oStroke"));
}
}
}
var _numSeleccion=0;
function SeleccionarSVG(noMarcar, soloUno, esteTipo){
var scroll = S.scrollGet(window),
xHoja = S("#vmlHoja").xy().x,
x = event.clientX-xHoja+scroll.scrollLeft,
y = event.clientY+scroll.scrollTop,
data = PrintBoceto("O"), n, c, ok, v, marX, marY, ang,
dimSel = [];
for(v=0; v<3; v++){
for(n=0; n<data.length; n++){
ok = false;
c = data[n];
if( v==0 && !/^(T)$/.test(c[1]) ) continue;
if( v==1 && !/^(-|L)$/.test(c[1]) ) continue;
if( v==2 && /^(-|L|T)$/.test(c[1]) ) continue;
if( esteTipo!=undefined && esteTipo!=c[0].tagName ) continue;
switch(c[1]){
case "-":
ok = inside(x, y, [
[c[2]-5, c[3]+5],
[c[4]+5, c[3]+5],
[c[4]+5, c[5]-5],
[c[2]-5, c[5]-5]
], c[1]);
break;
case "L":
marX = 5;
marY = 5;
ang = anguloRecta(c[2],c[3],c[4],c[5]);
if( (ang>35 && ang<55) || (ang>215 && ang<235) ){
marX=7;
marY=14;
}
ok = inside(x, y, [
[c[2]-marX, c[3]+marY],
[c[2]+marX, c[3]-marY],
[c[4]+marX, c[5]-marY],
[c[4]-marX, c[5]+marY]
], c[1]);
break;
case "R":
ok = inside(x, y, [
[c[2]     , c[3]	 ],
[c[2]+c[4], c[3]	 ],
[c[2]+c[4], c[3]+c[5]],
[c[2]     , c[3]+c[5]]
], c[1]);
break;
case "T":
ok = inside(x, y, [
[c[2]-5, c[3]+5],
[c[4]+5, c[3]+5],
[c[4]+5, c[5]-5],
[c[2]-5, c[5]-5]
], c[1]);
break;
case "I":
ok = inside(x, y, [
[c[2]     , c[3]	 ],
[c[2]+c[4], c[3]	 ],
[c[2]+c[4], c[3]+c[5]],
[c[2]     , c[3]+c[5]]
], c[1]);
break;
case "C":
ok = insideCircle([x,y], [c[2], c[3]], c[4]);
break;
case "H":
ok = inside(x, y, [
[c[2]     , c[3]	 ],
[c[2]+c[4], c[3]	 ],
[c[2]+c[4], c[3]+c[5]],
[c[2]     , c[3]+c[5]]
], c[1]);
break;
case "poligon":
break;
default:
}
if( ok ){
dimSel.push([c[0], c[1]]);
}
}
}
if( dimSel.length==1 ){
if( !noMarcar ) Marcar(true, dimSel[0][0], dimSel[0][1]);
_numSeleccion = -1;
return dimSel[0][0];
}else if( dimSel.length>1 ){
if( soloUno ){
S.info('Se ha encontrado "'+dimSel.length+'" elementos.<br>Mueva el elemento a borrar para tener<br>certeza de que se borra el que quiere.');
return null;
}
_numSeleccion++;
if( _numSeleccion>=dimSel.length ) _numSeleccion = 0;
if( !noMarcar ) Marcar(true, dimSel[_numSeleccion][0], dimSel[_numSeleccion][1]);
return dimSel[_numSeleccion][0];
}
_numSeleccion = -1;
return null;
}
function SuElementoAsociado(o, yy){
var oAso=null;
if( o.id=="CrearLineaDeCorte" ){
var y = S(o).attr("y1")*1;
if( yy!=undefined ) y = yy;
S("image[id=Tijeras").each(function(k,obj){
if( (S(obj).attr("y")*1)==(y-10) ){
oAso = obj;
return null;
}
});
}else if( o.id=="Tijeras" ){
var y = S(o).attr("y")*1;
if( yy!=undefined ) y = yy;
S("line[id=CrearLineaDeCorte]").each(function(k,obj){
if( (S(obj).attr("y1")*1)==(y+10) ){
oAso = obj;
return null;
}
});
}
return oAso;
}
function BorrarSVG(o){
if( o.getAttribute("eCapturar")==null || o.getAttribute("eCapturar")=="0" ){
EliminaCapturas();
o.setAttribute("eCapturar", "1");
S(o).css("color:red");
S("body").on("click", function(o){
var o = SeleccionarSVG(false,true);
if( o!=null ){
if( o.id=="CrearLineaDeCorte" ) S(SuElementoAsociado(o)).nodeRemove();
if( o.id=="Tijeras" ) S(SuElementoAsociado(o)).nodeRemove();
S(o).nodeRemove();
}
});
}else{
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").css("overflow:auto");
S("body").on("click", null);
}
S.eventClear(event);
}
function JuntarRectas(o){
if( o.getAttribute("eCapturar")==null || o.getAttribute("eCapturar")=="0" ){
EliminaCapturas();
o.setAttribute("eCapturar", "1");
S(o).css("color:red");
var line1=null, line2=null, o;
S("body").on("click", function(o){
if( line1==null ){
o = SeleccionarSVG(false,true, "line");
if( o!=null && o.tagName=="line" ){
line1 = o;
}
}else if( line2==null ){
o = SeleccionarSVG(false,true, "line");
if( o!=null && o.tagName=="line" && line1!=o ){
line2 = o;
var p1x1 = line1.getAttribute("x1")*1,
p1y1 = line1.getAttribute("y1")*1,
p1x2 = line1.getAttribute("x2")*1,
p1y2 = line1.getAttribute("y2")*1,
p2x1 = line2.getAttribute("x1")*1,
p2y1 = line2.getAttribute("y1")*1,
p2x2 = line2.getAttribute("x2")*1,
p2y2 = line2.getAttribute("y2")*1, min=9999, d;
if( line1.getAttribute("eType")=="H" ){
if( Math.abs(p1x1-p2x1)<Math.abs(p1x2-p2x1) ){
line1.setAttribute("x1", line2.getAttribute("x1"));
}else{
line1.setAttribute("x2", line2.getAttribute("x2"));
}
}else{
if( Math.abs(p1y1-p2y1)<Math.abs(p1y2-p2y1) ){
line1.setAttribute("y1", line2.getAttribute("y1"));
}else{
line1.setAttribute("y2", line2.getAttribute("y2"));
}
}
line1=null;
line2=null;
}
}
});
}else{
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").css("overflow:auto");
S("body").on("click", null);
}
S.eventClear(event);
}
function CrearFondoCelda(o){
if( o.getAttribute("eCapturar")==null || o.getAttribute("eCapturar")=="0" ){
EliminaCapturas();
o.setAttribute("eCapturar", "1");
S(o).css("color:red");
S("body").on("click", function(o){
var scroll = S.scrollGet(window),
objClick = S.event(o),
xHoja = S("#vmlHoja").xy().x,
x = event.clientX-xHoja+scroll.scrollLeft,
y = event.clientY+scroll.scrollTop;
if( objClick.tagName=="rect" ){
S.info("Se ha borrado primero el fondo anterior.");
S(objClick).nodeRemove();
return;
}
var data = PrintBoceto("O","line"), n,c,ok,v,i,dis, dim=[], caja=[], dimPuntos=[], H=V=0;
for(n=0; n<data.length; n++){
if( data[n][1]=="L" && data[n][0].id!="CrearLineaDeCorte" ){
dis = pDistance(x, y, data[n][2], data[n][3], data[n][4], data[n][5]);
dim.push(dis);
}
}
dim.sort(function(a, b){return a - b});
v=0;
for(n=0; n<dim.length; n++){
for(i=0; i<data.length; i++){
if( data[i][1]=="L" && data[i][0].id!="CrearLineaDeCorte" ){
dis = pDistance(x, y, data[i][2], data[i][3], data[i][4], data[i][5]);
if( dis==dim[n] ){
if( (data[i][6]=="H" && H<2) || (data[i][6]=="V" && V<2) ){
if( data[i][6]=="H" ) H++;
if( data[i][6]=="V" ) V++;
v++;
caja.push(data[i]);
break;
}
}
}
}
if( v>=4 ) break;
}
if( caja.length==4 && H==2 && V==2 ){
var minX1=minY1=9999, maxX2=maxY2=ancho=alto=0;
for(n=0; n<4; n++){
if( caja[n][6]=="H" ){
for(i=0; i<4; i++){
if( caja[i][6]=="V" ){
dimPuntos.push([caja[i][2],caja[n][3]]);
}
}
}
}
for(i=0; i<4; i++){
minX1 =  Math.min(dimPuntos[i][0], minX1);
minY1 =  Math.min(dimPuntos[i][1], minY1);
}
for(i=0; i<4; i++){
maxX2 =  Math.max(dimPuntos[i][0], maxX2);
maxY2 =  Math.max(dimPuntos[i][1], maxY2);
}
ancho =  maxX2-minX1;
alto  =  maxY2-minY1;
CreateSvgElement({svg:'rect',
x: minX1,
y: minY1,
width: ancho,
height: alto,
stroke: S(":color_papel").val(),
fill: S(":color_papel").val()
}, true);
}
});
}else{
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").css("overflow:auto");
S("body").on("click", null);
}
S.eventClear(event);
}
function EliminaCapturas(){
S(".resizer").nodeRemove();
S("body").css("overflow:auto");
S("body").on("click", null);
S("body").on("keydown", null);
S("*[eCapturar='1']").each(function(k,o){
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").css("overflow:auto");
S("body").on("click", null);
S("body").on("keydown", null);
});
_ObjAMover = null;
}
var _ObjAMover, _DimAMover=[];
function MoverON(o){
if( o.getAttribute("eCapturar")==null || o.getAttribute("eCapturar")=="0" ){
EliminaCapturas();
o.setAttribute("eCapturar", "1");
S(o).css("color:red");
S("body").on("click", function(o){
if( S.event(o).getAttribute("eCapturar")!=null ){
S("body").on("click", null);
}else{
S("body").on("keydown", null);
if( S.event(window).tagName=="text" ){
_ObjAMover = S.event(window);
if( _ObjAMover!=null ) Marcar(true, _ObjAMover, "T");
}else{
_ObjAMover = SeleccionarSVG(false);
}
if( _ObjAMover==null ){
S("body").css("overflow:auto");
return;
}
if( event && event.ctrlKey ){
_DimAMover.push(_ObjAMover);
}else{
_DimAMover = [_ObjAMover];
}
S("body").css("overflow:hidden");
S("body").on("keydown", function(o){
desplazar(o);
});
}
});
}else{
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").css("overflow:auto");
S("body").on("click", null);
S("body").on("keydown", null);
_DimAMover = [];
}
S.eventClear(event);
}
function PrimerPlano(o){
if( o.getAttribute("eCapturar")==null || o.getAttribute("eCapturar")=="0" ){
EliminaCapturas();
o.setAttribute("eCapturar", "1");
S(o).css("color:red");
S("body").on("click", function(o){
if( S.event(o).getAttribute("eCapturar")!=null ){
S("body").on("click", null);
}else{
S("body").on("keydown", null);
_ObjAMover = SeleccionarSVG(false);
if( _ObjAMover!=null && _ObjAMover.tagName!="SPAN" ){
S(_ObjAMover).nodeMove(S("#vmlHoja").obj);
}
}
});
}else{
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").css("overflow:auto");
S("body").on("click", null);
S("body").on("keydown", null);
_DimAMover = [];
}
S.eventClear(event);
}
function CreateSvgElement(d, elPrimero){
var o = document.createElementNS(SVG_NS, d["svg"]), e;
for(e in d){
if( e!="svg" && d[e]!="" ){
o.setAttributeNS(null, e, d[e]);
}
}
var oNew =S("#vmlHoja").obj.appendChild(o);
if( elPrimero ){
S("#vmlHoja").obj.insertBefore(oNew, S("*","#vmlHoja").obj);
}
return oNew;
}
var _Linea=null;
function CrearLineaHorizontal(o){
if( event.ctrlKey ){
CrearConForm('LH','.anchoalto,.lapizpapel,.gruesotrama',':v_alto,:v_papel');
return;
}
if( o.getAttribute("eCapturar")==null || o.getAttribute("eCapturar")=="0" ){
EliminaCapturas();
o.setAttribute("eCapturar", "1");
S(o).css("color:red");
S("body").on("click", function(o){
var scroll = S.scrollGet(window),
xHoja = S("#vmlHoja").xy().x,
x = event.clientX-xHoja+scroll.scrollLeft,
y = event.clientY+scroll.scrollTop;
if( _Linea==null ){
_Linea=[x,y];
}else{
CreateSvgElement({svg:'line',
x1: _Linea[0],
y1: _Linea[1],
x2: x,
y2: _Linea[1],
stroke: S(":color_lapiz").val(),
"stroke-width": S(":grueso_linea").val(),
"stroke-dasharray": S(":trama").val(),
eType: "H"
});
_Linea = null;
}
});
}else{
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").css("overflow:auto");
S("body").on("click", null);
}
S.eventClear(event);
}
function CrearLineaVertical(o){
if( event.ctrlKey ){
CrearConForm('LV','.anchoalto,.lapizpapel,.gruesotrama',':v_ancho,:v_papel');
return;
}
if( o.getAttribute("eCapturar")==null || o.getAttribute("eCapturar")=="0" ){
EliminaCapturas();
o.setAttribute("eCapturar", "1");
S(o).css("color:red");
S("body").on("click", function(o){
var scroll = S.scrollGet(window),
xHoja = S("#vmlHoja").xy().x,
x = event.clientX-xHoja+scroll.scrollLeft,
y = event.clientY+scroll.scrollTop;
if( _Linea==null ){
_Linea=[x,y];
}else{
CreateSvgElement({svg:'line',
x1: _Linea[0],
y1: _Linea[1],
x2: _Linea[0],
y2: y,
stroke: S(":color_lapiz").val(),
"stroke-width": S(":grueso_linea").val(),
"stroke-dasharray": S(":trama").val(),
eType: "V"
});
_Linea = null;
}
});
}else{
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").css("overflow:auto");
S("body").on("click", null);
}
S.eventClear(event);
}
function CrearLineaOblicua(o){
if( event.ctrlKey ){
CrearConForm('LO','.x2y2,.lapizpapel,.gruesotrama',':v_papel');
return;
}
if( o.getAttribute("eCapturar")==null || o.getAttribute("eCapturar")=="0" ){
EliminaCapturas();
o.setAttribute("eCapturar", "1");
S(o).css("color:red");
S("body").on("click", function(o){
var scroll = S.scrollGet(window),
xHoja = S("#vmlHoja").xy().x,
x = event.clientX-xHoja+scroll.scrollLeft,
y = event.clientY+scroll.scrollTop;
if( _Linea==null ){
_Linea=[x,y];
}else{
CreateSvgElement({svg:'line',
x1: _Linea[0],
y1: _Linea[1],
x2: x,
y2: y,
stroke: S(":color_lapiz").val(),
"stroke-width": S(":grueso_linea").val(),
"stroke-dasharray": S(":trama").val(),
eType: "O"
});
_Linea = null;
}
});
}else{
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").css("overflow:auto");
S("body").on("click", null);
}
S.eventClear(event);
}
function CrearRectangulo(o, func){
if( event.ctrlKey ){
CrearConForm('R','.anchoalto,.lapizpapel,.gruesotrama');
return;
}
_Linea = null;
if( o.getAttribute("eCapturar")==null || o.getAttribute("eCapturar")=="0" ){
EliminaCapturas();
o.setAttribute("eCapturar", "1");
S(o).css("color:red");
S("body").on("click", function(o){
var scroll = S.scrollGet(window),
xHoja = S("#vmlHoja").xy().x,
x = event.clientX-xHoja+scroll.scrollLeft,
y = event.clientY+scroll.scrollTop;
if( _Linea==null ){
_Linea=[x,y];
}else{
if( !func ){
if( _Linea[0]>x ) [_Linea[0], x] = [x, _Linea[0]];
if( _Linea[1]>y ) [_Linea[1], y] = [y, _Linea[1]];
CreateSvgElement({svg:'rect',
x: _Linea[0],
y: _Linea[1],
width: Math.abs(x-_Linea[0]),
height: Math.abs(y-_Linea[1]),
stroke: S(":color_lapiz").val(),
"stroke-width": S(":grueso_linea").val(),
"stroke-dasharray": S(":trama").val(),
fill: ((S(":color_papel").val()=="#FFFFFF") ? "transparent":S(":color_papel").val())
});
}else{
func([(_Linea[0]+xHoja), _Linea[1], (Math.abs(x-_Linea[0])), (Math.abs(y-_Linea[1]))]);
}
_Linea = null;
}
});
}else{
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").css("overflow:auto");
S("body").on("click", null);
}
S.eventClear(event);
}
function CrearCirculo(o, func){
if( event.ctrlKey ){
CrearConForm('C','.radio,.lapizpapel,.gruesotrama');
return;
}
_Linea = null;
if( o.getAttribute("eCapturar")==null || o.getAttribute("eCapturar")=="0" ){
EliminaCapturas();
o.setAttribute("eCapturar", "1");
S(o).css("color:red");
S("body").on("click", function(o){
var scroll = S.scrollGet(window),
xHoja = S("#vmlHoja").xy().x,
x = event.clientX-xHoja+scroll.scrollLeft,
y = event.clientY+scroll.scrollTop;
if( _Linea==null ){
_Linea=[x,y];
}else{
if( !func ){
CreateSvgElement({svg:'circle',
cx: _Linea[0],
cy: _Linea[1],
r:  Math.sqrt( Math.abs(_Linea[0]-x)*Math.abs(_Linea[0]-x) + Math.abs(_Linea[1]-y)*Math.abs(_Linea[1]-y) ),
stroke: S(":color_lapiz").val(),
"stroke-width": S(":grueso_linea").val(),
"stroke-dasharray": S(":trama").val(),
fill:"transparent"
});
}else{
var xHoja = S("#vmlHoja").xy().x;
func([(_Linea[0]+xHoja), _Linea[1], (Math.abs(x-_Linea[0])), (Math.abs(y-_Linea[1]))]);
}
_Linea = null;
}
});
}else{
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").css("overflow:auto");
S("body").on("click", null);
}
S.eventClear(event);
}
var _PosFont={
"H2": [ -1,-1,  -1, 2, -2, 1],
"H3": [ -1,-1,  -1, 2, -2, 1],
"H5": [ -2, 0,  -2, 4, -2, 0],
"H10":[ -3, 0,  -3, 9, -2, 0],
"H30":[ -8, 0,  -7,23, -2, 0],
"H50":[-12, 0, -11,35, -3, 0],
"T2": [  0,-1,   0, 2, -2, 1],
"T3": [  0,-1,   0, 2, -2, 1],
"T5": [ -1, 0,  -1, 5, -2, 0],
"T10":[ -1, 0,  -1, 8, -2, 0],
"T30":[  0, 0,  -0,22, -2, 1],
"T50":[  1,-1,  -1,36, -1, 2],
"C2": [ -1,-1,  -1, 2, -2, 1],
"C3": [ -1, 0,  -1, 4, -2, 1],
"C5": [ -1, 0,  -1, 5, -2, 1],
"C10":[ -1, 0,  -1, 9, -2, 2],
"C30":[ -1, 0,  -1,27, -3, 6],
"C50":[ -3, 0,  -3,47, -4,11],
"":""
};
function AjustaLineaDeTexto(font, n){
var dim=[2,3,5,10,30,50], d=[0,0, 0,0, 0,0], i,p,prt;
font = font[0];
n = parseInt(n);
if( n<2 ) n = 2;
else if( n>50 ) n = 50;
else{
for(i=0; i<dim.length; i++){
if( n<dim[i] ){
if( (n-dim[i-1])>(dim[i]-n) ){
prt = (((n-dim[i-1])*100)/(dim[i]-dim[i-1]))/100;
for(p=0; p<6; p++){
d[p] = _PosFont[font+dim[i]][p] - _PosFont[font+dim[i-1]][p];
if( d[p]!=0 ){
d[p] = (d[p]*prt)+_PosFont[font+dim[i-1]][p];
}
}
return d;
}else{
prt = (((n-dim[i-1])*100)/(dim[i]-dim[i-1]))/100;
for(p=0; p<6; p++){
d[p] = _PosFont[font+dim[i]][p] - _PosFont[font+dim[i-1]][p];
if( d[p]!=0 ){
d[p] = (d[p]*prt)+_PosFont[font+dim[i-1]][p];
}
}
return d;
}
}
}
}
return _PosFont[font+n];
}
function SetLineaDeTexto(){
VerLabel(false);
if( S("#EntradaDeTexto").val()!="" ){
if( S("#EntradaDeTexto").obj.offsetWidth==0 ){
var text = CreateSvgElement({svg:'text',
x: _Linea[0],
y: _Linea[1],
fill: S(":color_lapiz").val(),
transform: "rotate(270,"+_Linea[0]+","+_Linea[1]+")"
});
text.style.fontFamily = S(":font_family").val();
text.style.fontSize = S(":font_size").val()*3;
text.style.fontStyle = S(":font_style").val();
text.style.fontWeight = S(":font_weight").val();
text.textContent = S("#EntradaDeTexto").val();
}else{
var text = CreateSvgElement({svg:'text',
x: _Linea[0],
y: _Linea[1],
fill: S("#EntradaDeTexto").css("color"),
transform: "rotate(270,"+_Linea[0]+","+_Linea[1]+")"
});
text.style.fontFamily = S("#EntradaDeTexto").css("font-family");
text.style.fontSize = (S("#EntradaDeTexto").css("font-size"))+"px";
text.style.fontStyle = S("#EntradaDeTexto").css("font-style");
text.style.fontWeight = S("#EntradaDeTexto").css("font-weight");
text.textContent = S("#EntradaDeTexto").val();
}
}
S("#EntradaDeTexto").val("");
S("#EntradaDeTexto").hidden();
_Linea=null;
}
function CrearTexto(o){
if( event.ctrlKey ){
VerLabel(true);
CrearConForm('T','.lapizpapel,.sizegrueso,.fuentestilo,.solotexto',':v_papel')
return;
}
EliminaCapturas();
S("body").on("click", function(o){
VerLabel(true);
var scroll = S.scrollGet(window),
xHoja = S("#vmlHoja").xy().x,
x = event.clientX-xHoja+scroll.scrollLeft,
y = event.clientY+scroll.scrollTop;
var	mas = AjustaLineaDeTexto(S(":font_family").val(), S(":font_size").val());
_Linea = [x+mas[0], y+mas[1]];
var p = S("#EntradaDeTexto").css("padding-left,padding-right"),
ancho = (_HojaAncho-x-p["padding-left"]-p["padding-right"]);
if( ancho>(p["padding-left"]+p["padding-right"]) ){
S("#EntradaDeTexto").css("width:"+ancho);
S("#EntradaDeTexto").css("font-family:"+S(":font_family").val()+";font-size:"+(S(":font_size").val()*3)+";color:"+S(":color_lapiz").val()+";font-style:"+S(":font_style").val()+";font-weight:"+ S(":font_weight").val());
var h = S("#EntradaDeTexto").css("height")*1;
S("#EntradaDeTexto").css({visibility:"visible", left:x+S("#vmlHoja").xy().x+mas[2], top:y-h+mas[3]});
S("#EntradaDeTexto").obj.focus();
}
S("body").on("click", null);
});
S.eventClear(event);
}
function CrearLineaDeCorte(o){
if( event.ctrlKey ){
CrearConForm('-','.lapizpapel',':v_x,:v_papel');
return;
}
EliminaCapturas();
ParpadearOp(o);
S("body").on("click", function(o){
var scroll = S.scrollGet(window),
xHoja = S("#vmlHoja").xy().x,
x = event.clientX-xHoja+scroll.scrollLeft,
y = event.clientY+scroll.scrollTop;
CreateSvgElement({svg:'line',
x1: 0,
y1: y,
x2: _HojaAncho,
y2: y,
stroke: S(":color_lapiz").val(),
"stroke-width": 0.1,
"stroke-dasharray": "6.4",
id: "CrearLineaDeCorte"
});
CreateSvgElement({svg:'image',
x: _HojaAncho-25,
y: y-10,
width: 20,
href: "edes.php?R:$t/g/e/tijeras.png",
id: "Tijeras"
});
S("body").on("click", null);
});
S.eventClear(event);
}
function ModificarSVG(o, conForm){
EliminaCapturas();
ParpadearOp(o);
S(".resizer").nodeRemove();
S("body").on("click", function(o){
if( S(".resizer").length>0 ) return;
var xHoja = S("#vmlHoja").xy().x,
zona = S("#vmlHoja").xy(),
obj = S.event(o),
oPadre = S.toTag(obj,"span", "class=spanMultilinea"),
oc = S(obj).xy(),
x,y,h;
if( event.ctrlKey ) conForm = true;
_ObjAMover = SeleccionarSVG(conForm);
if( _ObjAMover==null ) return;
switch(_ObjAMover.tagName){
case "line":
if( conForm ){
if( /^(CrearLineaDeCorte|Tijeras)$/.test(_ObjAMover.id) ){
CrearConForm('-','.lapizpapel',':v_x,:v_papel', true);
return;
}
switch(S(_ObjAMover).attr("eType")){
case "H":
CrearConForm('LH','.anchoalto,.lapizpapel,.gruesotrama',':v_alto,:v_papel', true);
break;
case "V":
CrearConForm('LV','.anchoalto,.lapizpapel,.gruesotrama',':v_ancho,:v_papel', true);
break;
case "O":
CrearConForm('LO','.x2y2,.lapizpapel,.gruesotrama',':v_papel', true);
break;
}
return;
}
if( /^(CrearLineaDeCorte|Tijeras)$/.test(_ObjAMover.id) ) break;
var eType = _ObjAMover.getAttribute("eType"),
xx = S(_ObjAMover).attr("x1")*1,
yy = S(_ObjAMover).attr("y1")*1,
s = S.scrollGet(document.body),
xIni = (S(_ObjAMover).attr("x1")*1+xHoja-4),
yIni = (S(_ObjAMover).attr("y1")*1-4),
xEnd = (S(_ObjAMover).attr("x2")*1+xHoja-4),
yEnd = (S(_ObjAMover).attr("y2")*1-4),
xCen = (xIni+xEnd)/2,
yCen = (yIni+yEnd)/2;
var obj = S("<div class='resizer' style='position:fixed; width:9px; height:9px; border-radius:50%; background:transparent; border:1px solid #4286f4; z-index:1000;'></div>").nodeEnd("body");
S(obj).css("left:"+xIni+";top:"+yIni);
S(obj).move(zona, null, {addLeft:xHoja, addTop:0, function:function(x,y){
if( eType=="V" ){
obj.obj.style.left = (xx+xHoja-4)+"px";
}else{
_ObjAMover.setAttribute("x1", (x-xHoja+4));
}
if( /^(V|O)$/.test(eType) ){
_ObjAMover.setAttribute("y1", (y+4));
}else{
obj.obj.style.top = (yy-4)+"px";
}
var d1 = S(obj).css("left,top"),
d2 = S(obj2).css("left,top"),
cx = (d1.left+d2.left)/2,
cy = (d1.top+d2.top)/2;
xCen = cx;
yCen = cy;
S(cu).css("left:"+cx+";top:"+cy);
}});
var cu = S("<div class='resizer' style='position:fixed; width:9px; height:9px; border-radius:50%; background:transparent; border:1px solid #4286f4; z-index:1000;'></div>").nodeEnd("body");
S(cu).css("left:"+((xIni+xEnd)/2)+";top:"+((yIni+yEnd)/2));
S(cu).move(zona, null, {addLeft:xHoja, addTop:0, function:function(x,y){
var d = S(_ObjAMover).attr("x1,y1,x2,y2"),
d2 = S(cu).css("left,top");
x -= xHoja;
y += 0;
var incX = xCen-x,
incY = yCen-y,
nx1 = d.x1*1-incX,
ny1 = d.y1*1-incY,
nx2 = d.x2*1-incX,
ny2 = d.y2*1-incY;
S(_ObjAMover).attr("x1",nx1);
S(_ObjAMover).attr("y1",ny1);
S(_ObjAMover).attr("x2",nx2);
S(_ObjAMover).attr("y2",ny2);
S(obj).css("left:"+(xHoja+nx1-4)+";top:"+(ny1-4));
S(obj2).css("left:"+(xHoja+nx2-4)+";top:"+(ny2-4));
xIni = (nx1-4);
yIni = (ny1-4);
xEnd = (nx2-4);
yEnd = (ny2-4);
xCen = (xIni+xEnd)/2,
yCen = (yIni+yEnd)/2;
xx = nx1;
yy = ny1;
}});
var obj2 = S("<div class='resizer' style='position:fixed; width:9px; height:9px; border-radius:50%; background:transparent; border:1px solid #4286f4; z-index:1000;'></div>").nodeEnd("body");
S(obj2).css("left:"+xEnd+";top:"+yEnd);
S(obj2).move(zona, null, {addLeft:xHoja, addTop:0, function:function(x,y){
if( eType=="V" ){
obj2.obj.style.left = (xx+xHoja-4)+"px";
}else{
_ObjAMover.setAttribute("x2", (x-xHoja+4));
}
if( /^(V|O)$/.test(eType) ){
_ObjAMover.setAttribute("y2", (y+4));
}else{
obj2.obj.style.top = (yy-4)+"px";
}
var d1 = S(obj).css("left,top"),
d2 = S(obj2).css("left,top"),
cx = (d1.left+d2.left)/2,
cy = (d1.top+d2.top)/2;
xCen = cx;
yCen = cy;
S(cu).css("left:"+cx+";top:"+cy);
}});
break;
case "text":
if( conForm ){
CrearConForm('T','.lapizpapel,.sizegrueso,.fuentestilo,.solotexto',':v_papel', true);
return;
}
VerLabel(true);
Marcar(false, _ObjAMover, "T");
S("#EntradaDeTexto").val(_ObjAMover.textContent);
var p = S("#EntradaDeTexto").css("padding-left,padding-right"),
ancho = (_HojaAncho-x-p["padding-left"]-p["padding-right"]);
S("#EntradaDeTexto").css("width:"+ancho);
S("#EntradaDeTexto").css("font-family:"+S(_ObjAMover).css("font-family")+";font-size:"+(S(_ObjAMover).css("font-size"))+";color:"+S(_ObjAMover).attr("fill")+";font-style:"+S(_ObjAMover).css("font-style")+";font-weight:"+S(_ObjAMover).css("font-weight"));
h = S("#EntradaDeTexto").css("height");
x = S(_ObjAMover).attr("x")*1;
y = S(_ObjAMover).attr("y")*1;
_Linea = [x,y];
S(_ObjAMover).nodeRemove();
S("#EntradaDeTexto").css({visibility:"visible", left:x+xHoja-p["padding-left"], top:y-h});
S("#EntradaDeTexto").obj.focus();
break;
case "rect":
if( conForm || event.ctrlKey ){
CrearConForm('R','.anchoalto,.lapizpapel,.gruesotrama',null, true);
return;
}
oc[0]-=2;
oc[1]-=2;
vWidth = Math.abs(oc[0]-oc[2]);
vHeight = Math.abs(oc[1]-oc[3]);
vWidth = S(_ObjAMover).attr("width")*1;
vHeight = S(_ObjAMover).attr("height")*1;
var eui = S("<div class='resizer' style='position:fixed; width:9px; height:9px; border-radius:50%; background:transparent; border:1px solid #4286f4; z-index:9999;'></div>").nodeEnd("body");
S(eui).css("left:"+(oc[0]-4)+";top:"+(oc[1]-4));
S(eui).move(zona, null, {addLeft:xHoja, addTop:0, function:function(x,y){
var difX = (x-xHoja+4)-S(_ObjAMover).attr("x")*1;
difY = (y+4)-S(_ObjAMover).attr("y")*1;
vWidth = S(_ObjAMover).attr("width")*1-difX;
vHeight = S(_ObjAMover).attr("height")*1-difY;
if( vWidth<5 || vHeight<5 || (x-xHoja+4)<0 ) return;
S(_ObjAMover).attr("x",(x-xHoja+4));
S(_ObjAMover).attr("y",(y+4));
S(_ObjAMover).attr("width" , vWidth);
S(_ObjAMover).attr("height", vHeight);
S(cu).css("left:"+(x+vWidth/2)+";top:"+(y+vHeight));
}});
var cu = S("<div class='resizer' style='position:fixed; width:9px; height:9px; border-radius:50%; background:transparent; border:1px solid #4286f4; z-index:9999;'></div>").nodeEnd("body");
S(cu).css("left:"+(oc[0]+(vWidth/2)-4)+";top:"+(oc[1]+vHeight-4));
S(cu).move(zona, null, {addLeft:xHoja, addTop:0, function:function(x,y){
var sx = (x-xHoja-(vWidth/2)+4);
sy = (y+4)-vHeight;
S(_ObjAMover).attr("x",sx);
S(_ObjAMover).attr("y",sy);
sx-=4; sy-=4;
S(eui).css("left:"+(xHoja+sx)+";top:"+sy);
S(eid).css("left:"+(xHoja+sx+vWidth)+";top:"+(sy+vHeight));
}});
var eid = S("<div class='resizer' style='position:fixed; width:9px; height:9px; border-radius:50%; background:transparent; border:1px solid #4286f4; z-index:9999;'></div>").nodeEnd("body");
S(eid).css("left:"+(oc[0]+vWidth-4)+";top:"+(oc[1]+vHeight-4));
S(eid).move(zona, null, {addLeft:xHoja, addTop:0, function:function(x,y){
var d = S(eui).css("left,top");
vWidth = x-d.left;
vHeight = y-d.top;
if( vWidth<5 || vHeight<5 || (x-xHoja)>_HojaAncho ) return;
S(_ObjAMover).attr("width" , vWidth);
S(_ObjAMover).attr("height", vHeight);
S(cu).css("left:"+(d.left+(vWidth/2))+";top:"+(d.top+vHeight));
}});
break;
case "image":
if( conForm || event.ctrlKey ){
_LastImg = _ObjAMover;
CrearConForm('I','.anchoalto',null, true);
return;
}
_LastImg = null;
break;
case "circle":
if( conForm || event.ctrlKey ){
CrearConForm('C','.radio,.lapizpapel,.gruesotrama', null, true);
return;
}
var cx = S(_ObjAMover).attr("cx")*1,
cy = S(_ObjAMover).attr("cy")*1,
r = S(_ObjAMover).attr("r")*1;
var eui = S("<div class='resizer' style='position:fixed; width:9px; height:9px; border-radius:50%; background:transparent; border:1px solid #4286f4; z-index:9999;'></div>").nodeEnd("body");
S(eui).css("left:"+(cx-4+xHoja)+";top:"+(cy-4));
S(eui).move(zona, null, {addLeft:xHoja, addTop:0, function:function(x,y){
S(_ObjAMover).attr("cx",(x-xHoja+4));
S(_ObjAMover).attr("cy",(y+4));
S(eud).css("left:"+(x+S(_ObjAMover).attr("r")*1)+";top:"+(y));
}});
var eud = S("<div class='resizer' style='position:fixed; width:9px; height:9px; border-radius:50%; background:transparent; border:1px solid #4286f4; z-index:9999;'></div>").nodeEnd("body");
S(eud).css("left:"+(cx-4+xHoja+r)+";top:"+(cy-4));
S(eud).move(zona, null, {addLeft:xHoja, addTop:0, function:function(x,y){
eud.obj.style.top = (S(_ObjAMover).attr("cy")*1-4)+"px";
S(_ObjAMover).attr("r",(x-S(_ObjAMover).attr("cx")*1-xHoja+4));
}});
break;
case "SPAN":
if( conForm || event.ctrlKey ){
CrearConForm('M','.anchoalto,.lapizpapel,.sizegrueso,.fuentestilo',':v_papel,:v_font_weight_label,:v_font_style_label', true);
return;
}
VerLabel(true);
obj = _ObjAMover;
oc = S(obj).xy(),
_CajaNew = obj;
S(":texto").val(obj.innerHTML);
var x = xHoja = S("#vmlHoja").xy().x,
margen = 30,
zona = S("#vmlHoja").xy(),
vLeft = (oc[0]-5),
vTop = (oc[1]-1),
vWidth = oc[2],
vHeight = oc[3];
S("#edCONTAINER").css("overflow:hidden; position:absolute; left:"+vLeft+"px; top:"+vTop+"px; width:"+vWidth+"px; height:"+vHeight+"px");
S("#edCONTAINER").block();
S("#EDITOR").block();
S("#edCONTAINER").css("font-family:"+S(obj).css("font-family"));
S("#edCONTAINER *").css("font-family:"+S(obj).css("font-family"));
S("#edCONTAINER").css("font-size:"+S(obj).css("font-size")+"px");
S("#edCONTAINER *").css("font-size:"+S(obj).css("font-size")+"px");
S("#edCONTAINER").css("color:"+S.rgb2hex(S(obj).css("color")));
S("#edCONTAINER *").css("color:"+S.rgb2hex(S(obj).css("color")));
var eui = S("<div class='resizer' style='position:fixed; width:9px; height:9px; border-radius:50%; background:transparent; border:1px solid #4286f4; z-index:9999;'></div>").nodeEnd("body");
S(eui).css("left:"+(oc[0]-4)+";top:"+(oc[1]-4));
S(eui).move(zona, null, {addLeft:xHoja, addTop:0, function:function(x,y){
var ancho = (vWidth +(vLeft-(x+1))),
alto  = (vHeight+(vTop -(y+4)));
if( ancho<20 || alto<20 ) return;
S("#edCONTAINER").css("left:"+(x)+"; width:"+ancho);
S("#edCONTAINER").css("top:"+(y+4)+"; height:"+alto);
S("#edMENUS").css("left:"+(x+5)+";top:"+(y-S("#edMENUS").css("height")+4));
S(cu).css("left:"+(x+(ancho/2))+";top:"+(y+alto));
}, functionClick:function(op){
if( op=="D" ){
S("#edMENUS").css("z-index:500;");
}else if( op=="U" ){
vLeft = S("#edCONTAINER").css("left");
vTop = S("#edCONTAINER").css("top");
vWidth = S("#edCONTAINER").css("width");
vHeight = S("#edCONTAINER").css("height");
}
}});
var cu = S("<div class='resizer' style='position:fixed; width:9px; height:9px; border-radius:50%; background:transparent; border:1px solid #4286f4; z-index:9999;'></div>").nodeEnd("body");
S(cu).css("left:"+(oc[0]+(vWidth/2)-4)+";top:"+(oc[1]+vHeight-4));
S(cu).move(zona, null, {addLeft:xHoja, addTop:0, function:function(x,y){
var sx = (x-(vWidth/2)),
sy = (y-(vHeight)+0);
if( (y-vHeight-S("#edMENUS").css("height")+12)<0 || (x-xHoja-(vWidth/2)+6)<0 || (x+(vWidth/2)-xHoja+4)>_HojaAncho ) return;
S("#edCONTAINER").css("left:"+(x-(vWidth/2))+";top:"+(y-(vHeight)+4));
S("#edMENUS").css("left:"+(x-(vWidth/2)+5)+";top:"+(y-(vHeight)-S("#edMENUS").css("height")+4));
S(eui).css("left:"+sx+";top:"+sy);
S(eid).css("left:"+(sx+vWidth)+";top:"+(sy+vHeight));
}, functionClick:function(op){
if( op=="D" ){
S("#edMENUS").css("z-index:500;");
}else if( op=="U" ){
vLeft = S("#edCONTAINER").css("left");
vTop = S("#edCONTAINER").css("top");
vWidth = S("#edCONTAINER").css("width");
vHeight = S("#edCONTAINER").css("height");
}
}});
var eid = S("<div class='resizer' style='position:fixed; width:9px; height:9px; border-radius:50%; background:transparent; border:1px solid #4286f4; z-index:9999;'></div>").nodeEnd("body");
S(eid).css("left:"+(oc[0]+vWidth-4)+";top:"+(oc[1]+vHeight-4));
S(eid).move(zona, null, {addLeft:xHoja, addTop:0, function:function(x,y){
var ancho = (x-vLeft),
alto  = ((y+4)-vTop);
if( ancho<20 || alto<20 ) return;
S("#edCONTAINER").css("width:"+ancho);
S("#edCONTAINER").css("height:"+alto);
S(cu).css("left:"+(x-(ancho/2))+";top:"+y);
}, functionClick:function(op){
if( op=="D" ){
S("#edMENUS").css("z-index:500;");
}else if( op=="U" ){
vLeft = S("#edCONTAINER").css("left");
vTop = S("#edCONTAINER").css("top");
vWidth = S("#edCONTAINER").css("width");
vHeight = S("#edCONTAINER").css("height");
}
}});
_Modal = S("#EDITOR").modal();
S("body").on("click", null);
S("#texto_").obj.focus();
S("#texto_").eventFire("click");
break;
}
});
return S.eventClear(event);
}
function desplazaUno(tecla, dis, obj){
var n1=null,n2, v;
switch(tecla){
case 37:
if( /^(rect|image)$/.test(obj.tagName) ){
n1 = obj.getAttribute("x")*1; //if( n1<=0 ) return null;
obj.setAttribute("x", n1-dis);
}else if( /^(line)$/.test(obj.tagName) ){
n1 = obj.getAttribute("x1")*1; //if( n1<=0 ) return null;
n2 = obj.getAttribute("x2")*1; //if( n2>=_HojaAncho ) return null;
obj.setAttribute("x1", n1-dis);
obj.setAttribute("x2", n2-dis);
}else if( /^(circle)$/.test(obj.tagName) ){
n1 = obj.getAttribute("cx")*1; //if( n1<=0 ) return null;
obj.setAttribute("cx", n1-dis);
}else if( /^(BODY)$/.test(obj.tagName) && S("#ImgFondo").css("backgroundImage")!="" ){
v = S.replace(S("#ImgFondo").obj.style.backgroundPosition, "px","").split(" ");
S("#ImgFondo").obj.style.backgroundPosition = (v[0]*1-dis)+"px "+v[1]+"px";
}else if( /^(SPAN)$/.test(obj.tagName) ){
obj.style.left = (S(obj).css("left")-dis)+"px";
}else if( /^(text)$/.test(obj.tagName) ){
n1 = obj.getAttribute("x")*1; //if( n1<=0 ) return null;
obj.setAttribute("x", n1-dis);
obj.setAttribute("transform", "rotate(270,"+obj.getAttribute("x")+","+obj.getAttribute("y")+")");
}
break;
case 39:
if( /^(rect|image)$/.test(obj.tagName) ){
n1 = obj.getAttribute("x")*1; //if( n1<=0 ) return null;
obj.setAttribute("x", n1+dis);
}else if( /^(line)$/.test(obj.tagName) ){
n1 = obj.getAttribute("x1")*1; //if( n1<=0 ) return null;
n2 = obj.getAttribute("x2")*1; //if( n2>=_HojaAncho ) return null;
obj.setAttribute("x1", n1+dis);
obj.setAttribute("x2", n2+dis);
}else if( /^(circle)$/.test(obj.tagName) ){
n1 = obj.getAttribute("cx")*1; //if( n1<=0 ) return null;
obj.setAttribute("cx", n1+dis);
}else if( /^(BODY)$/.test(obj.tagName) && S("#ImgFondo").css("backgroundImage")!="" ){
v = S.replace(S("#ImgFondo").obj.style.backgroundPosition, "px","").split(" ");
S("#ImgFondo").obj.style.backgroundPosition = (v[0]*1+dis)+"px "+v[1]+"px";
}else if( /^(SPAN)$/.test(obj.tagName) ){
obj.style.left = (S(obj).css("left")+dis)+"px";
}else if( /^(text)$/.test(obj.tagName) ){
n1 = obj.getAttribute("x")*1; //if( n1<=0 ) return null;
obj.setAttribute("x", n1+dis);
obj.setAttribute("transform", "rotate(270,"+obj.getAttribute("x")+","+obj.getAttribute("y")+")");
}
break;
case 38:
if( /^(rect|image)$/.test(obj.tagName) ){
n1 = obj.getAttribute("y")*1; //if( n1<=0 ) return null;
obj.setAttribute("y", n1-dis);
}else if( /^(line)$/.test(obj.tagName) ){
n1 = obj.getAttribute("y1")*1; //if( n1<=0 ) return null;
n2 = obj.getAttribute("y2")*1; //if( n2>=_HojaAncho ) return null;
obj.setAttribute("y1", n1-dis);
obj.setAttribute("y2", n2-dis);
}else if( /^(circle)$/.test(obj.tagName) ){
n1 = obj.getAttribute("cy")*1; //if( n1<=0 ) return null;
obj.setAttribute("cy", n1-dis);
}else if( /^(BODY)$/.test(obj.tagName) && S("#ImgFondo").css("backgroundImage")!="" ){
v = S.replace(S("#ImgFondo").obj.style.backgroundPosition, "px","").split(" ");
S("#ImgFondo").obj.style.backgroundPosition = v[0]+"px "+(v[1]*1-dis)+"px";
}else if( /^(SPAN)$/.test(obj.tagName) ){
obj.style.top = (S(obj).css("top")-dis)+"px";
}else if( /^(text)$/.test(obj.tagName) ){
n1 = obj.getAttribute("y")*1; //if( n1<=0 ) return null;
obj.setAttribute("y", n1-dis);
obj.setAttribute("transform", "rotate(270,"+obj.getAttribute("x")+","+obj.getAttribute("y")+")");
}
break;
case 40:
if( /^(rect|image)$/.test(obj.tagName) ){
n1 = obj.getAttribute("y")*1; //if( n1<=0 ) return null;
obj.setAttribute("y", n1+dis);
}else if( /^(line)$/.test(obj.tagName) ){
n1 = obj.getAttribute("y1")*1; //if( n1<=0 ) return null;
n2 = obj.getAttribute("y2")*1; //if( n2>=891 ) return null;
obj.setAttribute("y1", n1+dis);
obj.setAttribute("y2", n2+dis);
}else if( /^(circle)$/.test(obj.tagName) ){
n1 = obj.getAttribute("cy")*1; //if( n1<=0 ) return null;
obj.setAttribute("cy", n1+dis);
}else if( /^(BODY)$/.test(obj.tagName) && S("#ImgFondo").css("backgroundImage")!="" ){
v = S.replace(S("#ImgFondo").obj.style.backgroundPosition, "px","").split(" ");
S("#ImgFondo").obj.style.backgroundPosition = v[0]+"px "+(v[1]*1+dis)+"px";
}else if( /^(SPAN)$/.test(obj.tagName) ){
obj.style.top = (S(obj).css("top")+dis)+"px";
}else if( /^(text)$/.test(obj.tagName) ){
n1 = obj.getAttribute("y")*1;
obj.setAttribute("y", n1+dis);
obj.setAttribute("transform", "rotate(270,"+obj.getAttribute("x")+","+obj.getAttribute("y")+")");
}
break;
default:
}
return n1;
}
function desplazar(obj){
for(var n=0; n<_DimAMover.length; n++){
_ObjAMover = _DimAMover[n];
if( /^(CrearLineaDeCorte|Tijeras)$/.test(_ObjAMover.id) ){
var y = (_ObjAMover.id=="CrearLineaDeCorte" ? S(_ObjAMover).attr("y1")*1 : S(_ObjAMover).attr("y")*1);
}
var n1 = desplazaUno(obj.which, dis=(event.ctrlKey?10:1), _ObjAMover);
if( n1!=null && /^(CrearLineaDeCorte|Tijeras)$/.test(_ObjAMover.id) ){
o = SuElementoAsociado(_ObjAMover, y);
desplazaUno(obj.which, dis=(event.ctrlKey?10:1), o);
}
}
}
function PrintBoceto(op, esteTipo){
var dim=[], txt="", data=[], v,tmp,mas,
xStroke, xStrokeWidth, xFill;
dim.push(S(":hoja_info").val());
if( S("#ImgFondo").css("background-image")!="none" ){
if( S("#ImgFondo").obj.style.backgroundPosition!="" ){
txt = ","+S.replace(S("#ImgFondo").obj.style.backgroundPosition, "px","", " ",",");
txt += ","+S.replace(S("#ImgFondo").obj.style.backgroundSize, "px", "", " ",",");
}
tmp = S("#ImgFondo").css("background-image").split("/http/");
dim.push("P,"+S.left(tmp[1], 0 ,-2)+txt);
}
S("#vmlHoja *").each(function(k,o){
if( esteTipo!=undefined && esteTipo!=o.tagName ) return;
switch(o.tagName){
case "line":
var x = S(o).attr("x1")*1,
y = S(o).attr("y1")*1;
if( (x<0 || x>_HojaAncho) && (y<0 && y>_HojaAlto) ) break;
xStroke = S(o).attr("stroke");
xStrokeWidth = S(o).attr("stroke-width");
xStrokeDasharray = "";
if( S(o).attr("stroke-dasharray") ) xStrokeDasharray = S.replace(S(o).attr("stroke-dasharray"), ",", ":");
if( o.id=="CrearLineaDeCorte" ){
dim.push("-,"+S(o).attr("y1")+","+(xStroke||""));
data.push([o, "-", 0, S(o).attr("y1")*1, S("#vmlHoja").css("width")*1, S(o).attr("y1")*1]);
o = SuElementoAsociado(o);
v = o.getBBox();
data.push([o, "I", v.x, v.y, v.width, v.height, o.href.animVal]);
}else if( /G/.test(S(o).attr("eType")) ){
}else{
dim.push("L"+S(o).attr("eType")+","+(S(o).attr("x1")*1)+","+(S(o).attr("y1")*1)+","+(S(o).attr("x2")*1)+","+(S(o).attr("y2")*1)+","+(xStroke||"")+","+(xStrokeWidth||"")+","+(xStrokeDasharray||""));
data.push([o, "L", S(o).attr("x1")*1, S(o).attr("y1")*1, S(o).attr("x2")*1, S(o).attr("y2")*1, S(o).attr("eType")]);
}
break;
case "rect":
xStroke = S(o).attr("stroke");
xStrokeWidth = S(o).attr("stroke-width");
xFill = S(o).attr("fill");
xStrokeDasharray = "";
if( S(o).attr("stroke-dasharray") ) xStrokeDasharray = S.replace(S(o).attr("stroke-dasharray"), ",", ":");
dim.push("R,"+(S(o).attr("x")*1)+","+(S(o).attr("y")*1)+","+S(o).attr("width")+","+S(o).attr("height")+","+(xStroke||"")+","+(xStrokeWidth||"")+","+(xFill||"")+","+(xStrokeDasharray||""));
data.push([o, "R", S(o).attr("x")*1, S(o).attr("y")*1, S(o).attr("width")*1, S(o).attr("height")*1]);
break;
case "text":
if( S.trim(o.textContent)=="" ) break;
mas = AjustaLineaDeTexto(S(o).css("font-family"), S(o).css("font-size"));
dim.push(     "T,"+(S(o).attr("x")*1)+","+(S(o).attr("y")*1-S(o).css("font-size"))+","+S(o).css("font-size")+","+S(o).css("font-family")+","+S(o).css("font-style")+","+S(o).css("font-weight")+","+S(o).attr("fill")+",~"+o.textContent);
data.push([o, "T", S(o).attr("x")*1-S(o).css("font-size")*1, S(o).attr("y")*1, S(o).attr("x")*1, S(o).attr("y")*1-o.getComputedTextLength(), S(o).attr("fill"), o.textContent]);
break;
case "image":
if( o.id=="Tijeras" ) return;
v = o.getBBox();
dim.push("I,"+S(o).attr("x")+","+S(o).attr("y")+","+S(o).attr("width")+","+S(o).attr("height")+","+o.href.animVal);
data.push([o, "I", v.x, v.y, v.width, v.height, o.href.animVal]);
break;
case "circle":
xStroke = S(o).attr("stroke");
xStrokeWidth = S(o).attr("stroke-width");
xFill = S(o).attr("fill");
xStrokeDasharray = "";
if( S(o).attr("stroke-dasharray") ) xStrokeDasharray = S.replace(S(o).attr("stroke-dasharray"), ",", ":");
dim.push("C,"+S(o).attr("cx")+","+S(o).attr("cy")+","+S(o).attr("r")+","+(xStroke||"")+","+(xStrokeWidth||"")+","+(xFill||"")+","+(xStrokeDasharray||""));
data.push([o, "C", S(o).attr("cx")*1, S(o).attr("cy")*1, S(o).attr("r")*1]);
break;
case "poligon":
break;
default:
}
});
var xHoja = S("#vmlHoja").xy().x;
S(".spanMultilinea").each(function(k,o){
var c = S.xy(o),
txt = S.rtrim(S(o).html());
dim.push("H,"+(c.x-xHoja)+","+c.y+","+c.w+","+c.h+","+S(o).css("font-size")+","+S(o).css("font-family")+","+S.rgb2hex(S(o).css("color"))+",~"+txt);
data.push([o,"H", (c.x-xHoja), c.y, c.w, c.h]);
});
if( op=="O" ) return data;
txt = dim.join("|");
if( op=="G" ){
txt +=	"|F,color_lapiz="+S(":color_lapiz").val()+
"|F,color_papel="+S(":color_papel").val()+
"|F,grueso_linea="+S(":grueso_linea").val()+
"|F,trama="+S(":trama").val()+
"|F,font_family="+S(":font_family").val()+
"|F,font_style="+S(":font_style").val()+
"|F,font_style_label="+S(":font_style_label").val()+
"|F,font_weight="+S(":font_weight").val()+
"|F,font_weight_label="+S(":font_weight_label").val()+
"|F,font_size="+S(":font_size").val()+
"|F,margenes="+S(":margenes").val()+
"|F,hoja="+S(":hoja").val()+
"|F,hoja_info="+S(":hoja_info").val()+
"|F,fondo_ancho="+S(":fondo_ancho").val()+
"|F,fondo_alto="+S(":fondo_alto").val()+
"|F,guia_horizontal="+S(":guia_horizontal").val()+
"|F,guia_vertical="+S(":guia_vertical").val()+
"";
top.eCallSrvPost("edes.php?E:$form_save.php", {cd_gs_form:<?=$_GET["cd_gs_form"]?>, DATOS:txt}, window);
}else if( op=="I" ){
if( event && event.ctrlKey ){
top.eCallSrvPost("edes.php?E:$form_pdf.php", {DATOS:txt, TYPE:_TypeForm}, window);
}else{
S(window).callSrvPost("edes.php?E:$form_pdf.php&_IFRAME", {DATOS:txt, TYPE:_TypeForm}, window.frames["VIEWPDF"]);
}
}
return S.eventClear(event);
}
function AsignaValor(campo){
if( _ObjAMover==null ) return;
var dim = {
color_lapiz: "stroke",
color_papel: "fill",
grueso_linea: "stroke-width"
};
if( dim[campo]==undefined ) return;
switch(_ObjAMover.tagName){
case "line":
case "rect":
case "circle":
S(_ObjAMover).attr(dim[campo], S(":"+campo).val());
break;
case "text":
if( campo=="color_lapiz" ){
S(_ObjAMover).css("color:"+S(":"+campo).val());
}
break;
case "image":
break;
case "poligon":
break;
default:
}
}
function ConfigHoja(o){
S(o).menu([
["-Hoja"],
["A4 Vertical", "", "A4,V,630,891"],
["A4 Horizontal", "", "A4,H,891,630"],
["-"],
["A5 Vertical", "", "A5,V,445,630"],
["A5 Horizontal", "", "A5,H,630,445"]
], {function:function(op, label){
if( op!=null ){
S(":hoja").value(label);
S(":hoja_info").value(op);
var tmp = op.split(",");
S("#vmlHoja").attr({width:tmp[2], height:tmp[3], eHoja:tmp[0]+","+tmp[1]});
_HojaAncho = tmp[2];
_HojaAlto = tmp[3];
window.frames["VIEWPDF"].frameElement.style.width = tmp[2]+"px";
window.frames["VIEWPDF"].frameElement.style.height = tmp[3]+"px";
}
}});
}
var _oInput;
function TipoDeLetra(o, func){
_oInput = o;
S(o).menu([
["-Tipo de letra"],
["Courier", "", "Courier"],
["Helvética", "", "Helvetica"],
["Times", "", "Times"]
], {function:function(op, label){
var txt = "";
if( op!=null ){
if( !func ){
if( _oInput.tagName=="INPUT" ){
txt = _oInput.name;
}else{
txt = S("INPUT", _oInput ).obj.name;
}
txt = S.replace(txt, "_label", "");
S(":"+txt).value(op);
S(":"+txt+"_label").value(label);
}else{
func(op);
}
}
}});
}
var _DimLabel = {
courier: "Courier",
helvetica: "Helvética",
times: "Times",
italic: "Itálica",
normal: "Normal",
bold: "Negrita"
}
function EstiloDeLetra(o){
_oInput = o;
S(o).menu([
["-Estilo de letra"],
["Itálica", "", "italic"],
["Normal", "", "normal"]
], {function:function(op, label){
if( op!=null ){
if( _oInput.tagName=="INPUT" ){
txt = _oInput.name;
}else{
txt = S("INPUT", _oInput ).obj.name;
}
txt = S.replace(txt, "_label", "");
S(":"+txt).value(op);
S(":"+txt+"_label").value(label);
}
}});
}
function BoldDeLetra(o){
_oInput = o;
S(o).menu([
["-Grueso de letra"],
["Negrita", "", "bold"],
["Normal" , "", "normal"]
], {function:function(op, label){
if( op!=null ){
if( _oInput.tagName=="INPUT" ){
txt = _oInput.name;
}else{
txt = S("INPUT", _oInput ).obj.name;
}
txt = S.replace(txt, "_label", "");
S(":"+txt).value(op);
S(":"+txt+"_label").value(label);
}
}});
}
function Guias(op){
var dim, n, i, color, trama;
if( op=="H" ){
S("line[eType=HG]").nodeRemove();
dim = S.nsp(S(":guia_horizontal").val()).split(",");
for(n=0; n<dim.length; n++){
color = "#dddddd";
trama = "1 3";
if( S.upper(dim[n])=="C" ){
dim[n] = _HojaAlto/2/3;
color = "#0000cc";
trama = "1 3 7 3";
}else if( /Xx/.test(dim[n]) ){
dim[n] = S.replace(dim[n], "X","", "x","");
i = dim[n]/_HojaAlto;
}
dim[n] = dim[n]*3;
CreateSvgElement({svg:'line',
x1: 0,
y1: dim[n],
x2: _HojaAncho,
y2: dim[n],
stroke: color,
"stroke-width": 0.1,
"stroke-dasharray": trama,
eType: "HG"
});
}
}else{
S("line[eType=VG]").nodeRemove();
dim = S.nsp(S(":guia_vertical").val()).split(",");
for(n=0; n<dim.length; n++){
color = "#dddddd";
trama = "1 3";
if( S.upper(dim[n])=="C" ){
dim[n] = _HojaAncho/2/3;
color = "#0000cc";
trama = "1 3 7 3";
}else if( /Xx/.test(dim[n]) ){
dim[n] = S.replace(dim[n], "X","", "x","");
i = dim[n]/_HojaAncho;
}
dim[n] = dim[n]*3;
CreateSvgElement({svg:'line',
x1: dim[n],
y1: 0,
x2: dim[n],
y2: _HojaAlto,
stroke: color,
"stroke-width": 0.1,
"stroke-dasharray": trama,
eType: "VG"
});
}
}
}
function uDefault(o, val){
if( o.value=="" ) o.value = val;
}
function AltoDeLetra(o){
var cor = S.screen(window);
var tapa = S("<span class='MODAL' onselectstart='return S.eventClear(window)' style='z-index:10000;width:"+(cor.sw-1)+"px;height:"+(cor.sh-1)+"px;'></span>").nodeEnd();
var c = S.xy(o);
S("#FontSize2").css("display:block; left:"+c[0]+";top:"+(c[1]+23));
S(":font_size2").obj.value = S.thousands(S("#edCONTAINER").css("font-size")/3,1);
S(":font_size2").obj.focus();
S(tapa).on("click", function(){
AsignaAltoAText();
S("#FontSize2").none();
S(tapa).nodeRemove();
});
}
function AsignaAltoAText(){
if( S(":font_size2").val()>0 ){
S("#edCONTAINER").css("font-size:"+(S(":font_size2").val()*3).toFixed(1));
S("#edCONTAINER *").css("font-size:"+(S(":font_size2").val()*3).toFixed(1));
}
S("#FontSize2").none();
}
function AsignaFuenteAText(fuente){
S("#edCONTAINER").css("font-family:"+fuente);
S("#edCONTAINER *").css("font-family:"+fuente);
}
function AsignaColorAText(color){
S("#edCONTAINER").css("color:"+color);
S("#edCONTAINER *").css("color:"+color);
}
function eClearEvent(men){
return S.eventClear(window, window.event);
}
function eGF(Campo){
if( typeof(Campo)=="object" ) Campo = Campo.name;
if( Campo==undefined ){
if( event!=null ){
for(var n=S.event(window).sourceIndex-1; n>0; n--) if( eIndex(n).tagName=='INPUT' && eIndex(n).name.substr(0,7)!='_INPUT_' ) return eIndex(n).value;
}
return '';
}
if( Campo.substr(0,7)=='_INPUT_' ){
}else if( DGI(Campo)!=null ){
var Obj = DGI(Campo), res="";
if( Obj.type=="radio" ){
S(":"+Campo).each(function(pk, obj){
if( obj.checked ) res = obj.getAttribute("eValue");
});
return res;
}else if( Obj.type=="checkbox" ){
return (Obj.checked) ? "S":"";
}
var txt = Obj.value;
if( S(Obj).attr("DCM")!=undefined ){
txt = S.thousandsClear(txt);
return(txt*1);
}else{
return S.trim(txt);
}
}
if( DGI(Campo)!=null ) return DGI(Campo).value;
_ErrCampo = -10;
_ErrMensaje = 'eGF.'+Campo;
alert(eLng(81,Campo,'eGF()'), _Source, -1, 'eGF' );
return "";
}
function _SetColor(Campo){
if( eGF(Campo)=="" ){
eGO(Campo).style.backgroundColor = "";
}else{
try{
eGO(Campo).style.backgroundColor = eGF(Campo);
eGO(Campo).style.color = top.eColorContrastBW(eGF(Campo));
}catch(e){}
}
}
function eGO(NomCampo, AvisaErr){
if( NomCampo==undefined ){
if( event!=null ){
for(var n=S.event(window).sourceIndex-1; n>0; n--) if( eIndex(n).tagName=='INPUT' && eIndex(n).name.substr(0,7)!='_INPUT_' ) return eIndex(n);
}
return null;
}
var res = S(":"+NomCampo).obj;
if( res==null ) res = S("#"+NomCampo).obj;
if( res==null ){
_ErrCampo = -10;
_ErrMensaje = 'eGO.'+NomCampo;
console.log('ERROR: eGO('+NomCampo+')');
}
return res;
}
function eSelectRGB(obj, l, func, cp){
EliminaCapturas();
if( S.type(obj)=="function" ){
func(function(c, cp){
obj(c);
}, cp, null);
return;
}
if( obj==null ) obj = eGO();
else if( typeof(obj)=='string' ) obj = eGO(obj);
if( eGO(obj.name).className=='READONLY' ) return;
func(function(c, cp){
var atr;
S(obj).val(S(obj).attr("tc")=="CLR" ? S.upper(c) : c);
S(obj).css({backgroundColor:c, color:top.eColorContrastBW(c)});
S(obj).attr("eChange",1);
atr = obj.getAttribute("eLinkPaper");
if( atr!=null && cp==185 ){
S(":"+atr).css("background-color", c);
}
atr = obj.getAttribute("eLinkColor");
if( atr!=null && cp==184 ){
S(":"+atr).css("color", c);
}
}, cp, obj.value);
}
var _Modal, _Caja, _CajaNew;
function FUNCTION_ed(op, obj){
VerLabel(false);
_Linea = null;
if( op=="S" ){
if( _CajaNew ){
var xFamily = S(obj).css("font-family"),
xSize = S(obj).css("font-size"),
xColor = S.rgb2hex(S(obj).css("color"));
if( S("div",obj).length>0 ){
xFamily = S("div",obj).css("font-family");
xSize = S("div",obj).css("font-size");
xColor = S.rgb2hex(S("div",obj).css("color"));
}
S(_CajaNew).html(S("#texto_").html());
S("*", _CajaNew).css("font-family:"+xFamily+";font-size:"+xSize+"px;color:"+xColor+";");
S(_CajaNew).css("font-family:"+xFamily+";font-size:"+xSize+"px;color:"+xColor+";");
_Caja = S.xy(S("#edCONTAINER").obj);
S(_CajaNew).css("left:"+_Caja[0]+"px; top:"+_Caja[1]+"px; width:"+_Caja[2]+"px; height:"+_Caja[3]+"px");
}else{
var v = S("#edCONTAINER").css("font-family,font-size,color");
if( v["color"][0]!="#" ) v["color"] = S.rgb2hex(v["color"]);
S("<span class='spanMultilinea' style='position:absolute; left:"+_Caja[0]+"px; top:"+_Caja[1]+"px; width:"+_Caja[2]+"px; height:"+_Caja[3]+"px; border:1px solid #dddddd; font-family:"+v["font-family"]+"; font-size:"+v["font-size"]+"px; color:"+v["color"]+";'>"+S("#texto_").html()+"</span>").nodeEnd("body");
}
}
S(".resizer").nodeRemove();
S("#_SELECTCOLOR").none();
_CajaNew = null
S("#EDITOR").none();
S(_Modal).nodeRemove();
S(":texto").val("");
S("body").css("overflow:auto");
}
function CrearMultilinea(o){
if( event.ctrlKey ){
CrearConForm('M','.anchoalto,.lapizpapel,.sizegrueso,.fuentestilo',':v_papel,:v_font_weight_label,:v_font_style_label')
return;
}
EliminaCapturas();
_Linea = null;
CrearRectangulo(S("#idMultilinea").obj, function(c){
var o = S("#idMultilinea").obj;
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").css("overflow:auto");
S("body").on("click", null);
_Caja = c;
CrearUnaMultilinea(c);
});
}
function CrearUnaMultilinea(c, newColor, newSize, newFamily){
if( newColor==undefined ) newColor = S(":color_lapiz").val();
if( newSize==undefined ) newSize = S(":font_size").val()*3;
if( newFamily==undefined ) newFamily = S(":font_family").val();
if( _Caja[1]<20 ) _Caja[1] = 20;
S("#edCONTAINER").css("overflow:hidden; position:absolute; left:"+(c[0]-5)+"px; top:"+(c[1]-1)+"px; width:"+c[2]+"px; height:"+c[3]+"px");
S("#edCONTAINER").block();
S("#EDITOR").block();
_Modal = S("#EDITOR").modal();
S("body").css("overflow:hidden");
S("#edCONTAINER").css("font-family:"+newFamily+";font-size:"+(newSize)+"px;color:"+newColor+";");
S("#texto_").css("font-family:"+newFamily+";font-size:"+(newSize)+"px;color:"+newColor+";");
S("#texto_").obj.focus();
S("#texto_").eventFire("click");
VerLabel(true);
}
_ShowZero = 1;
function CerrarRejilla(){
EliminaCapturas();
_Linea = null;
S('#RejillaSize').none();
S('#idTapaCreaRejilla').nodeRemove();
}
function AceptarRejilla(){
S.eventClear(window);
if( S(":rejilla_rows").val()==0 || S(":rejilla_cols").val()==0 ){
S.error('El número de columnas y filas tiene que ser mayor de "0"');
return;
}
S('#RejillaSize').none();
S('#idTapaCreaRejilla').eventFire("click");
}
function CrearRejilla(o){
if( event.ctrlKey ){
CrearConForm('J','.anchoalto,.colsrows,.lapizpapel,.gruesotrama',':v_papel');
return;
}
EliminaCapturas();
_Linea = null;
var cor = S.screen(window),
tapa = S("<span class='MODAL' id='idTapaCreaRejilla' onselectstart='return S.eventClear(window)' style='z-index:10000;width:"+(cor.sw-1)+"px;height:"+(cor.sh-1)+"px;'></span>").nodeEnd(),
c = S.xy(o);
S("#RejillaSize").css("display:block; left:"+c[0]+"; top:"+(c[1]+23));
S(":rejilla_cols").obj.focus();
S(tapa).on("click", function(){
if( S(":rejilla_cols")==0 || S(":rejilla_rows").val()==0 ){
return;
}
CrearRectangulo(S("#idCreaRejilla").obj, function(c){
var o = S("#idCreaRejilla").obj,
xHoja = S("#vmlHoja").xy().x;
o.setAttribute("eCapturar", "0");
S(o).css("color:");
S("body").on("click", null);
var nCols = S(":rejilla_cols").val(),
nRows = S(":rejilla_rows").val();
_Caja = c;
c[0] -= xHoja;
c[2]--;
c[3]--;
CrearLaRejilla(c, nCols, nRows);
});
S("#RejillaSize").none();
S(tapa).nodeRemove();
});
}
function CrearLaRejilla(c, nCols, nRows){
var i,d,n;
d = c[3]/nRows;
i = 0;
for(n=0; n<=nRows; n++){
CreateSvgElement({svg:'line',
x1: c[0],
y1: c[1]+i,
x2: c[0]+c[2],
y2: c[1]+i,
stroke: S(":color_lapiz").val(),
"stroke-width": S(":grueso_linea").val(),
"stroke-dasharray": S(":trama").val(),
eType: "H"
});
i += d;
}
d = c[2]/nCols;
i = c[0];
for(n=0; n<=nCols; n++){
CreateSvgElement({svg:'line',
x1: i,
y1: c[1],
x2: i,
y2: c[1]+c[3],
stroke: S(":color_lapiz").val(),
"stroke-width": S(":grueso_linea").val(),
"stroke-dasharray": S(":trama").val(),
eType: "V"
});
i += d;
}
}
var _Tapa, _ModElemento, _SeModificaElElemento;
function CrearConForm(tipo, mostrar, desactivar, esMod){
var el = _ObjAMover;
EliminaCapturas();
_Linea = null;
_SeModificaElElemento = false;
if( false && _LastImg==null ){
S.error("Ha de seleccionar una imagen");
}else{
var cor = S.screen(window),
c = S.xy(S.event(event)), dim;
if( esMod ){
_ModElemento = el;
switch(el.tagName){
case "image":
S(":v_x").val(S(el).attr("x"));
S(":v_y").val(S(el).attr("y"));
break;
case "line":
S(":v_x").val(S(el).attr("x1"));
S(":v_y").val(S(el).attr("y1"));
S(":v_x2").val(S(el).attr("x2"));
S(":v_y2").val(S(el).attr("y2"));
S(":v_lapiz").val(S(el).attr("stroke"));
switch(S(el).attr("eType")){
case "H":
S(":v_ancho").val(Math.abs(S(el).attr("x1")-S(el).attr("x2")));
break;
case "V":
S(":v_alto").val(Math.abs(S(el).attr("y1")-S(el).attr("y2")));
break;
case "O":
break;
}
break;
case "rect":
S(":v_x").val(S(el).attr("x"));
S(":v_y").val(S(el).attr("y"));
S(":v_ancho").val(S(el).attr("width"));
S(":v_alto").val(S(el).attr("height"));
S(":v_lapiz").val(S(el).attr("stroke"));
S(":v_papel").val(S(el).attr("fill"));
break;
case "circle":
S(":v_x").val(S(el).attr("cx"));
S(":v_y").val(S(el).attr("cy"));
S(":v_r").val(S(el).attr("r"));
S(":v_lapiz").val(S(el).attr("stroke"));
S(":v_papel").val(S(el).attr("fill"));
break;
case "text":
var color = el.getAttribute("fill"),
xBold = S(el).css("font-weight");
if( color[0]!="#" ) color = S.rgb2hex(color);
S(":v_x").val(S(el).attr("x"));
S(":v_y").val(S(el).attr("y"));
S(":v_lapiz").val(color);
S(":v_font_family").val(S(el).css("font-family"));
S(":v_font_family_label").val(_DimLabel[S(el).css("font-family").toLowerCase()]);
S(":v_font_size").val(S(el).css("font-size"));
S(":v_font_weight").val(xBold);
if( xBold==400 ) xBold = "normal";
if( xBold==700 ) xBold = "bold";
S(":v_font_weight_label").val(_DimLabel[xBold.toLowerCase()]);
S(":v_font_style").val(S(el).css("font-style"));
S(":v_font_style_label").val(_DimLabel[S(el).css("font-style").toLowerCase()]);
S(":v_texto").val(S(el).obj.textContent);
break;
case "SPAN":
_SeModificaElElemento = true;
var cd = S(el).xy(),
color = S(el).css("color"),
xBold = S(el).css("font-weight"),
xHoja = S("#vmlHoja").xy().x;
if( color[0]!="#" ) color = S.rgb2hex(color);
S(":v_lapiz").val(color);
S(":v_font_weight").val(xBold);
if( xBold==400 ) xBold = "normal";
if( xBold==700 ) xBold = "bold";
S(":v_x").val(cd.x-xHoja);
S(":v_y").val(cd.y);
S(":v_ancho").val(el.offsetWidth);
S(":v_alto").val(el.offsetHeight);
S(":v_font_family").val(S(el).css("font-family"));
S(":v_font_family_label").val(_DimLabel[S(el).css("font-family").toLowerCase()]);
S(":v_font_size").val(S(el).css("font-size"));
S(":v_font_weight_label").val(_DimLabel[xBold.toLowerCase()]);
S(":v_font_style").val(S(el).css("font-style"));
S(":v_font_style_label").val(_DimLabel[S(el).css("font-style").toLowerCase()]);
break;
}
S(":v_grueso").val(S(el).attr("stroke-width"));
S(":v_trama").val(S(el).attr("stroke-dasharray"));
if( S(":v_papel").val()=="transparent" || S(":v_papel").val()=="" ) S(":v_papel").val("#FFFFFF");
var dim = "v_x,v_y,v_x2,v_y2,v_r,v_ancho,v_alto,v_grueso,v_font_size".split(","),n,v,xTrama="";
for(n=0; n<dim.length; n++){
v = S(":"+dim[n]).val();
if( v>0 ) S(":"+dim[n]).val(v/3);
}
v = S(":v_trama").val();
if( v!="" ){
dim = v.split(",");
for(n=0; n<dim.length; n++){
if( xTrama!="" ) xTrama += ",";
xTrama += (dim[n]/3);
}
S(":v_trama").val(xTrama);
}
}else{
_ModElemento = null;
S(":v_lapiz").val(S(":color_lapiz").val());
S(":v_papel").val(S(":color_papel").val());
S(":v_grueso").val(S(":grueso_linea").val());
S(":v_trama").val(S(":trama").val());
S(":v_font_size").val(S(":font_size").val());
S(":v_font_family").val("helvetica");	S(":v_font_family_label").val(_DimLabel["helvetica"]);
S(":v_font_weight").val("normal");		S(":v_font_weight_label").val(_DimLabel["normal"]);
S(":v_font_style").val("normal");		S(":v_font_style_label").val(_DimLabel["normal"]);
}
_Tapa = S("<span class='MODAL' id='idTapaCreaRejilla' onselectstart='return S.eventClear(window)' style='z-index:2; width:"+(cor.sw-1)+"px;height:"+(cor.sh-1)+"px;'></span>").nodeEnd();
S(".x2y2,.radio,.anchoalto,.colsrows,.lapizpapel,.gruesotrama,.sizegrueso,.fuentestilo,.solotexto").none();
if( mostrar ) S(mostrar).display("table-row");
S("#idFORMULARIO INPUT").class("=EDITABLE");
S("#idFORMULARIO INPUT").attr("readonly", "");
if( desactivar!=undefined ){
dim = desactivar.split(",");
S(dim).each(function(k,o){
S(o).class("=READONLY");
S(o).attr("readonly", "true");
if(o.name=="v_papel"){
o.value = "";
o.style.backgroundColor = "";
}
});
}
c[0] = event.layerX;
c[1] = event.layerY;
S("#idFORMULARIO").css("display:block; left:"+c[0]+"; top:"+(c[1]+23));
S("#idFORMULARIO").attr("eAccion", tipo);
S(":v_x").obj.focus();
}
S.eventClear(window);
}
function AceptarFormulario(){
var tipo = S("#idFORMULARIO").attr("eAccion"), ok=true, contenidoMultiText="",
error = "Falta rellenar datos.";
S("#_SELECTCOLOR").none();
S("#idFORMULARIO INPUT").each(function(k,o){
if( tipo[0]=="I" && (o.name=="v_ancho" || o.name=="v_alto") ){
if( S(":v_ancho").val()>0 && S(":v_alto").val()>0 ){
ok = false;
error = 'No se puede cambiar la proporción.<br>Puede definir:<br>&nbsp;&nbsp;&nbsp;- El "ancho".<br>&nbsp;&nbsp;&nbsp;- El "alto"<br>&nbsp;&nbsp;&nbsp;- Tamaño original ("Ancho" y "Alto" vacios)';
return null;
}
return;
}
if( o.offsetWidth>0 && o.className=="EDITABLE" && o.name!="v_trama" && o.value=="" ){
ok = false;
return null;
}
});
if( !ok ){
S.error(error);
return;
}
if( _ModElemento!=null ){
if( _ModElemento.id=="CrearLineaDeCorte" ) S(SuElementoAsociado(_ModElemento)).nodeRemove();
if( _ModElemento.id=="Tijeras" ) S(SuElementoAsociado(_ModElemento)).nodeRemove();
if( !_SeModificaElElemento ) S(_ModElemento).nodeRemove();
}
if( S(":v_papel").val()=="#FFFFFF" || S(":v_papel").val()=="" ) S(":v_papel").val("transparent");
var dim = "v_x,v_y,v_x2,v_y2,v_r,v_ancho,v_alto,v_grueso,v_font_size".split(","),n,v,xTrama="";
for(n=0; n<dim.length; n++){
v = S(":"+dim[n]).val();
if( v>0 ) S(":"+dim[n]).val(v*3);
}
v = S(":v_trama").val();
if( v!="" ){
dim = v.split(",");
for(n=0; n<dim.length; n++){
if( xTrama!="" ) xTrama += ",";
xTrama += (dim[n]*3);
}
S(":v_trama").val(xTrama);
}
switch(tipo[0]){
case "J": //case "rejilla":
CrearLaRejilla([S(":v_x").val(), S(":v_y").val(), S(":v_ancho").val(), S(":v_ancho").val()], S(":v_cols").val(), S(":v_rows").val());
break;
case "L": //case "line":
var dim = [S(":v_x").val(), S(":v_y").val(), S(":v_x2").val(), S(":v_y2").val()];
switch(tipo){
case "LH":
dim[2] = dim[0]+S(":v_ancho").val();
dim[3] = dim[1];
break;
case "LV":
dim[2] = dim[0];
dim[3] = dim[1]+S(":v_alto").val();
break;
}
CreateSvgElement({svg:'line',
x1: dim[0],
y1: dim[1],
x2: dim[2],
y2: dim[3],
stroke: S(":v_lapiz").val(),
"stroke-width": S(":v_grueso").val(),
"stroke-dasharray": S(":v_trama").val(),
eType: S.mid(tipo,1,1)
});
break;
case "R": //case "rect":
CreateSvgElement({svg:'rect',
x: S(":v_x").val(),
y: S(":v_y").val(),
width: S(":v_ancho").val(),
height: S(":v_alto").val(),
stroke: S(":v_lapiz").val(),
"stroke-width": S(":v_grueso").val(),
"stroke-dasharray": S(":v_trama").val(),
fill: S(":v_papel").val()
});
break;
case "C": //case "circle":
CreateSvgElement({svg:'circle',
cx: S(":v_x").val(),
cy: S(":v_y").val(),
r: S(":v_r").val(),
stroke: S(":v_lapiz").val(),
"stroke-width": S(":v_grueso").val(),
"stroke-dasharray": S(":v_trama").val(),
fill: S(":v_papel").val()
});
break;
case "M":
if( _SeModificaElElemento ){
S(_ModElemento).css("left:"+(S(":v_x").val()+S("#vmlHoja").xy().x)+";top:"+S(":v_y").val()+";width:"+S(":v_ancho").val()+";height:"+S(":v_alto").val()+";color:"+S(":v_lapiz").val()+";");
S("*",_ModElemento).css("color:"+S(":v_lapiz").val());
}else{
_Caja = [S(":v_x").val()+S("#vmlHoja").xy().x, S(":v_y").val(), S(":v_ancho").val(), S(":v_alto").val()];
CrearUnaMultilinea(_Caja, S(":v_lapiz").val(), S(":v_font_size").val(), S(":v_font_family").val());
}
break;
case "I": //case "image":
CreateSvgElement({svg:'image',
x: S(":v_x").val(),
y: S(":v_y").val(),
width: S(":v_ancho").val(),
height: S(":v_alto").val(),
href: _LastImg.href.animVal
});
break;
case "-":
CreateSvgElement({svg:'line',
x1: 0,
y1: S(":v_y").val(),
x2: _HojaAncho,
y2: S(":v_y").val(),
stroke: S(":v_lapiz").val(),
"stroke-width": 0.1,
"stroke-dasharray": "6.4",
id: "CrearLineaDeCorte"
});
CreateSvgElement({svg:'image',
x: _HojaAncho-25,
y:S(":v_y").val()-10,
width: 20,
href: "edes.php?R:$t/g/e/tijeras.png",
id: "Tijeras"
});
break;
case "T": //case "text":
VerLabel(false);
if( S.trim(S(":v_texto").val())=="" ) break;
text = CreateSvgElement({svg:'text',
x: S(":v_x").val(),
y: S(":v_y").val()-1,
fill: S(":v_lapiz").val(),
transform: "rotate(270,"+(S(":v_x").val())+","+(S(":v_y").val())+")"
});
text.style.fontSize = S(":v_font_size").val();
text.style.fontFamily = S(":v_font_family").val();
text.style.fontStyle = S(":v_font_style").val();
text.style.fontWeight = S(":v_font_weight").val();
text.textContent = S.trim(S(":v_texto").val());
break;
}
CancelarFormulario();
}
function CancelarFormulario(){
VerLabel(false);
S("#_SELECTCOLOR").none();
S("#idFORMULARIO").none();
S(_Tapa).nodeRemove();
S("#idFORMULARIO INPUT").each(function(k,o){
o.value = "";
});
}
var _MenuVariables=[], _TypeForm="";
<?PHP
include("../../edesweb/itm/etoneselect.js");
include("../../edesweb/ed.js");
$nombreImpreso = "";
$_HojaAncho = 630;
$_HojaAlto = 891;
$eHoja = "A4,V,630,891";
$eHojaLabel = "A4 Vertical";
$backgroundPosition = "0px 0px";
$backgroundImage = "";
$dim = "";
$_MenuConVariables = false;
$_MenuVariables = array();
if( isset($_GET["cd_gs_form"])  ){
$cd_gs_form = $_GET["cd_gs_form"];
if( !function_exists("qQuery") ) eInclude($_Sql);
qQuery("select * from gs_form where cd_gs_form={$cd_gs_form} && cd_gs_node={$_Node}");
$r = qArray();
$nombreImpreso = $r["nm_gs_form"];
if( $r["cd_gs_form"]!=$cd_gs_form ){
eMessage('Acceso no autorizado', 'HSE');
}
echo "_TypeForm='{$r['cd_gs_form_type']}';";
$dim = $r["data"];
$file = "../_datos/config/form_".$r["cd_gs_form_type"].".var";
if( file_exists($file) ){
$dim2 = file($file);
echo "\n_MenuVariables.push(['-Variables']);";
for($n=0; $n<count($dim2); $n++){
$tmp = explode("~",trim($dim2[$n]));
$tmp[0] = trim($tmp[0]);
if( $tmp[0]!="" ){
echo "_MenuVariables.push(['".$tmp[0]."','','']);";
$_MenuVariables[] = $tmp[0];
$_MenuConVariables = true;
}
}
}
}
?>
function VerVariables(o){
var lastCursor = _edCursorBlur;
S(o).menu(_MenuVariables, {function:function(op, label){
if( op!=null ){
edMENUS.oCONTAINER.focus();
if( _edCursorBlur!=null ){
S.posCursorHtml(edMENUS.oCONTAINER, lastCursor[0], lastCursor[1]);
lastCursor[0] += label.length;
lastCursor[1] += label.length;
}
var r = getSelection().getRangeAt(0);
r.insertNode(r.createContextualFragment(label));
getSelection().removeAllRanges();
getSelection().addRange(r);
getSelection().collapseToEnd();
}
}});
}
function VerLabelOnOff(o){
if( S(":ver_label").val()=="Si" ){
S(":ver_label").val("No");
}else{
S(":ver_label").val("Si");
}
}
function VerLabel(OnOff){
if( S("#idVerVariables").obj.rows.length<=1 ) return;
if( OnOff && S(":ver_label").val()=="Si" ){
var xHoja = S("#vmlHoja").xy().x;
S("#idVerVariables").display("table");
S("#idVerVariables").css("left:"+(xHoja-S("#idVerVariables").obj.offsetWidth));
}else{
S("#idVerVariables").none();
}
}
</SCRIPT>
</HEAD>
<BODY onselectstart="return false"<?=(($_SESSION["_D_"]=="~") ? "":' oncontextmenu="return false"')?>>
<table border="0px" cellspacing="0px" cellpadding="0px" style="padding:0px; margin:0px; display:table; width:100%; height:100%;"><tr>
<td valign=top style="margin:0px;padding:0px; width:1px;">
<table class="BROWSE" border="0px" cellspacing="0px" cellpadding="0px">
<tr><th>Elementos</th></tr>
<tr><td onclick="CrearCirculo(this)" oncontextmenu="CrearConForm('C','.radio,.lapizpapel,.gruesotrama')"><i class="ICONWINDOW">&#317;</i> Círculo</td></tr>
<tr><td onclick="CrearFondoCelda(this)" id="idFondoCelda"><i class="ICONWINDOW">&#333;</i> Fondo Celda</td></tr>
<tr onclick="uSelectImagen(this,'tipo not in (\'B\',\'N\')')" on-contextmenu="CrearConForm('I','--.anchoalto')"><td id="OpIcono"><i class="ICONWINDOW">&#298;</i> Imagen</td></tr>
<tr onclick="uSelectImagen(this,'tipo in (\'B\',\'N\')')"><td id="OpFondo"><i class="ICONWINDOW" style="color:#999999;">&#298;</i> Imagen de fondo</td></tr>
<tr><td onclick="CrearLineaHorizontal(this)" oncontextmenu="CrearConForm('LH','.anchoalto,.lapizpapel,.gruesotrama',':v_alto,:v_papel')" ><i class="ICONWINDOW">&#311;</i> Linea Horizonal</td></tr>
<tr><td onclick="CrearLineaVertical(this)"	 oncontextmenu="CrearConForm('LV','.anchoalto,.lapizpapel,.gruesotrama',':v_ancho,:v_papel')"><i class="ICONWINDOW">&#310;</i> Linea Vertical</td></tr>
<tr><td onclick="CrearLineaOblicua(this)"	 oncontextmenu="CrearConForm('LO','.x2y2,.lapizpapel,.gruesotrama',':v_papel')"				 ><i class="ICONWINDOW">&#312;</i> Linea Oblicua</td></tr>
<tr><td onclick="CrearLineaDeCorte(this)"	 oncontextmenu="CrearConForm('-','.lapizpapel',':v_x,:v_papel')"							 ><i class="ICONWINDOW">&#282;</i> Linea de corte</td></tr>
<tr><td onclick="CrearRectangulo(this)" oncontextmenu="CrearConForm('R','.anchoalto,.lapizpapel,.gruesotrama')"	><i class="ICONWINDOW">&#316;</i> Rectángulo</td></tr>
<tr><td onclick="CrearRejilla(this)" id="idCreaRejilla" oncontextmenu="CrearConForm('J','.anchoalto,.colsrows,.lapizpapel,.gruesotrama',':v_papel')"><i class="ICONWINDOW">&#319;</i> Rejilla</td></tr>
<tr><td onclick="CrearMultilinea(this)" id="idMultilinea" oncontextmenu="CrearConForm('M','.anchoalto,.lapizpapel,.sizegrueso,.fuentestilo',':v_papel,:v_font_weight_label,:v_font_style_label')"><i class="ICONWINDOW">&#314;</i> Texto horizontal</td></tr>	<!-- Multilinea de Texto -->
<tr><td onclick="CrearTexto(this)" oncontextmenu="CrearConForm('T','.lapizpapel,.sizegrueso,.fuentestilo',':v_papel')"><i class="ICONWINDOW">&#341;</i> Texto vertical</td></tr>
<tr><th>Acciones</th></tr>
<tr><td onclick="BorrarSVG(this)" ><i class="ICONWINDOW">&#334;</i> Borrar</td></tr>
<tr><td onclick="GestorImagenes()"><i class="ICONWINDOW" pp="1" title="Gestión de imagenes">&#337;</i> Gestor de imágenes</td></tr>
<tr><td onclick="PrintBoceto('G')"><i class="ICONWINDOW">&#335;</i> Grabar</td></tr>
<tr><td onclick="PrintBoceto('I')" title="Click IZQ: Muestra el PDF en la ventana derecha<?="\n"?>Control Click: Muestra el PDF en una subventana"><i class="ICONWINDOW">&#336;</i> Imprimir</td></tr>
<tr><td onclick="JuntarRectas(this)" title="La primera linea se prolonga hasta la seguna"><i class="ICONWINDOW">&#342;</i> Juntar rectas</td></tr>
<tr><td onclick="ModificarSVG(this, false)" oncontextmenu="ModificarSVG(this, true)"><i class="ICONWINDOW">&#339;</i> Modificar</td></tr>
<tr><td onclick="MoverON(this)"		><i class="ICONWINDOW">&#340;</i> Mover</td></tr>
<tr><td onclick="MoverFondo(this)"	><i style="color:#999999;">&#340;</i> Mover fondo</td></tr>
<tr><td onclick="PrimerPlano(this)"	><i class="ICONWINDOW">(</i> Primer plano</td></tr>
</table>
<br>
<form name=FRM1>
<table class="BROWSE" border="0px" cellspacing="0px" cellpadding="0px">
<tr><th colspan=2>Configuración</th></tr>
<tr onclick="eSelectRGB('color_lapiz',1,eToneSelect,184)"><td>Color lapiz</td><td>
<input name="color_lapiz" pp="1" onchange="_SetColor(&quot;color_lapiz&quot;);AsignaValor('color_lapiz');" value="#000000" onchange="uDefault(this,'#000000')" class="EDITABLE" ewe="1" leng="7" maxlength="7" size="7" onfocus="S.key('CLR',7,0)" tc="CLR" style="width:80px; color:#FFFFFF; background-color:#000000;"><i class="ICONINPUT" onclick="eSelectRGB('color_lapiz',1,eToneSelect,184)" title="Seleccionar color">¸</i>
</td></tr>
<tr onclick="eSelectRGB('color_papel',1,eToneSelect,185)"><td>Color papel</td><td>
<input name="color_papel" pp="1" onchange="_SetColor(&quot;color_papel&quot;);AsignaValor('color_papel');" value="#FFFFFF" onchange="uDefault(this,'#FFFFFF')" class="EDITABLE" ewe="1" leng="7" maxlength="7" size="7" onfocus="S.key('CLR',7,0)" tc="CLR" style="width:80px; color:#000000; background-color:#FFFFFF;"><i class="ICONINPUT" onclick="eSelectRGB('color_papel',1,eToneSelect,185)" title="Seleccionar color">¹</i>
</td></tr>
<tr style="display:none" onclick="EstiloDeLetra(this)"><td>Estilo letra</td><td>
<input name="font_style_label" value="Normal" class="READONLY" readonly="true" onclick="" leng="15" maxlength="15" size="15" onchange="uDefault(this,'Helvetica')" onfocus="S.key('#',15,0)" tc="#" style="cursor:default; width:100px;">
<input name="font_style" value="normal" style="display:none">
</td></tr>
<tr style="display:none" onclick="BoldDeLetra(this)"><td>Gruesor letra</td><td>
<input name="font_weight_label" value="Normal" class="READONLY" readonly="true" onclick="" leng="15" maxlength="15" size="15" onchange="uDefault(this,'Helvetica')" onfocus="S.key('#',15,0)" tc="#" style="cursor:default; width:100px;">
<input name="font_weight" value="normal" style="display:none">
</td></tr>
<tr><td>Grueso linea</td><td>
<input name="grueso_linea" value="0,2" onchange="uDefault(this,1);AsignaValor('grueso_linea');" class="EDITABLE" ewe="1" maxlength="2" size="2" dcm="1" leng="2" onfocus="S.key('+,',1,1)" tc="+," style="text-align:right; width:100px;" ehelpno="1">
</td></tr>
<tr><td>Guias Horizontales</td><td>
<input name="guia_horizontal" onchange='Guias("H")' value="" class="EDITABLE" ewe="1" leng="11" maxlength="11" size="11" onfocus="S.key(/^[CcxX0123456789,]{0,90}$/,90,0)" tc="trama" style="width:100px;" ehelpno="1">
</td></tr>
<tr><td>Guias Verticales</td><td>
<input name="guia_vertical" onchange='Guias("V")' value="" class="EDITABLE" ewe="1" leng="11" maxlength="11" size="11" onfocus="S.key(/^[CcxX0123456789,]{0,90}$/,90,0)" tc="trama" style="width:100px;" ehelpno="1">
</td></tr>
<tr onclick="ConfigHoja(this)"><td>Hoja</td><td>
<input name="hoja" value="<?=$eHojaLabel?>" class="READONLY" readonly="true" onclick="" leng="15" maxlength="15" size="15" onfocus="S.key('#',15,0)" tc="#" style="cursor:default;width:100px;">
<input name="hoja_info" value="<?=$eHoja?>" style="display:none;">
</td></tr>
<tr><td>Imagen de fondo</td><td>
<input name="fondo_ancho" value="210" class="EDITABLE" ewe="1" maxlength="3" size="3" dcm="0" leng="3" onchange="ResizeFondo(this)" onfocus="S.key('+',3,0)" tc="+" style="text-align:right; width:30px;" ehelpno="1">
<span style="vertical-align:middle">x</span>
<input name="fondo_alto" value="297" class="EDITABLE" ewe="1" maxlength="3" size="3" dcm="0" leng="3" onchange="ResizeFondo(this)" onfocus="S.key('+',3,0)" tc="+" style="text-align:right; width:30px;" ehelpno="1">
</td></tr>
<tr style="display:none"><td>Margenes</td><td>
<input name="margenes" value="" class="EDITABLE" ewe="1" leng="11" maxlength="11" size="11" onfocus="S.key(/^[0123456789,]{0,11}$/,11,0)" tc="trama" style="width:100px;" ehelpno="1">
</td></tr>
<tr><td>Trama linea</td><td>
<input name="trama" value="" class="EDITABLE" ewe="1" leng="10" maxlength="10" size="10" onfocus="S.key(/^[0123456789,]{0,10}$/,10,0)" tc="trama" style="width:100px;" ehelpno="1">
</td></tr>
<tr><td>Tamaño letra</td><td>
<input name="font_size" value="3,5" class="EDITABLE" ewe="1" maxlength="3" size="3" dcm="1" leng="3" onchange="uDefault(this,12)" onfocus="S.key('+,',2,1)" tc="+," style="text-align:right; width:100px;" ehelpno="1">
</td></tr>
<tr onclick="TipoDeLetra(this)"><td>Tipo letra</td><td>
<input name="font_family_label" value="Helvetica" class="READONLY" readonly="true" onclick="" leng="15" maxlength="15" size="15" onchange="uDefault(this,'Helvetica')" onfocus="S.key('#',15,0)" tc="#" style="cursor:default; width:100px;">
<input name="font_family" value="Helvetica" style="display:none">
</td></tr>
<?PHP if( $_MenuConVariables ){ ?>
<tr onclick="VerLabelOnOff(this)"><td><i class="ICONWINDOW" style="font-family:eDes; zoom:0.9; color:#000000;">&#198;</i> Ver etiquetas</td><td>
<input name="ver_label" value="Si" class="READONLY" readonly="true" onclick="" leng="2" maxlength="2" size="2" style="cursor:default; width:100px;">
</td></tr>
<?PHP } ?>
<?PHP
if( $_SESSION["_D_"]!="" ){
echo '<tr onclick=\'top.gsEdit(window,"/_datos/config/form_'.$r["cd_gs_form_type"].'.var")\'><td colspan=2>';
echo '<i class="ICONWINDOW" style="font-family:eDes; zoom:0.9; color:#000000;">&#230;</i> Editar variables';
echo '</td></tr>';
}
?>
</table>
</form>
Unidades en milímetros
</td><td class="SeparadorVertical">&nbsp;&nbsp;&nbsp;
</td><td id="ImgFondo" valign=top style="margin:0px; padding:0px; width:<?=$_HojaAncho?>px; background-image:<?=$backgroundImage?>; background-repeat:no-repeat; background-size:<?=$_HojaAncho."px ".$_HojaAlto?>px; background-position:<?=$backgroundPosition?>; vertical-align:top; text-align:left;">
<svg id="vmlHoja" height="<?=$_HojaAlto?>" width="<?=$_HojaAncho?>" eHoja="<?=$eHoja?>" style="cursor:crosshair; border:1px solid #dddddd;">
</svg>
</td><td class="SeparadorVertical">&nbsp;&nbsp;&nbsp;
</td><td valign=top style="margin:0px;padding:0px; width:100%; vertical-align:top; text-align:left;">
<iframe frameborder=0px src="" name="VIEWPDF" eNORESIZE=true style="z-index:2000; width:<?=$_HojaAncho?>px; height:<?=($_HojaAlto-10)?>px; border:1px solid #dddddd;"></iframe>
</td></tr>
</table>
<input id="EntradaDeTexto" onfocusout="SetLineaDeTexto()" type=text style="visibility:hidden; position:absolute; left:0px; top:0px; z-index:10; margin:0px; padding:0px;">
<span id="FontSize2" style="display:none; position:absolute; z-index:11000; background-color:#ffffff; border:1px solid #aaaaaa; padding:5px;">
Tamaño letra <input name="font_size2" value="" class="EDITABLE" ewe="1" maxlength="3" size="3" dcm="1" leng="3" onchange="AsignaAltoAText()" onfocus="S.key('+,',2,1)" tc="+," style="text-align:right; width:30px; border:1px solid #aaaaaa;" ehelpno="1">
</span>
<span id="RejillaSize" style="display:none; position:absolute; z-index:11000; background-color:#ffffff; border:1px solid #aaaaaa; padding:5px;">
<form name="FRM3">
<table style="display:table" border="0px" cellspacing="0px" cellpadding="0px">
<tr>
<td align=right>Columnas<td><input name="rejilla_cols" value="2" class="EDITABLE" ewe="1" maxlength="2" size="2" dcm="0" leng="2" onfocus="S.key('+',2,0)" tc="+" style="text-align:right; width:30px; border:1px solid #aaaaaa;" ehelpno="1">
<tr>
<td align=right>Filas<td><input name="rejilla_rows" value="2" class="EDITABLE" ewe="1" maxlength="2" size="2" dcm="0" leng="2" onfocus="S.key('+',2,0)" tc="+" style="text-align:right; width:30px; border:1px solid #aaaaaa;" ehelpno="1">
<tr>
<td colspan=2 style="text-align:right;">
<i class="ICONWINDOW" style="font-family:eDes" onclick="CerrarRejilla()">i</i>
<i class="ICONWINDOW" style="font-family:eDes;margin-left:10px;" onclick="AceptarRejilla()">j</i>
</table>
</form>
</span>
<span id="idFORMULARIO" style="display:none; position:absolute; z-index:3; background-color:#ffffff; border:1px solid #aaaaaa; padding:5px;">
<form name="FRM2">
<table style="display:table" border="0px" cellspacing="0px" cellpadding="0px">
<tr>
<td align=right>X		<td><input name="v_x"		value="" class="EDITABLE" ewe="1" maxlength="4" size="4" dcm="1" leng="4" onfocus="S.key('+,',3,1)" tc="+," style="text-align:right; width:36px; border:1px solid #aaaaaa;" ehelpno="1">
<td align=right>Y		<td><input name="v_y"		value="" class="EDITABLE" ewe="1" maxlength="4" size="4" dcm="1" leng="4" onfocus="S.key('+,',3,1)" tc="+," style="text-align:right; width:36px; border:1px solid #aaaaaa;" ehelpno="1">
<tr class="x2y2">
<td align=right>X2		<td><input name="v_x2"		value="" class="EDITABLE" ewe="1" maxlength="4" size="4" dcm="1" leng="4" onfocus="S.key('+,',3,1)" tc="+," style="text-align:right; width:36px; border:1px solid #aaaaaa;" ehelpno="1">
<td align=right>Y2		<td><input name="v_y2"		value="" class="EDITABLE" ewe="1" maxlength="4" size="4" dcm="1" leng="4" onfocus="S.key('+,',3,1)" tc="+," style="text-align:right; width:36px; border:1px solid #aaaaaa;" ehelpno="1">
<tr class="radio">
<td align=right>Radio	<td><input name="v_r"		value="" class="EDITABLE" ewe="1" maxlength="4" size="4" dcm="1" leng="4" onfocus="S.key('+,',3,1)" tc="+," style="text-align:right; width:36px; border:1px solid #aaaaaa;" ehelpno="1">
<tr class="anchoalto">
<td align=right>Ancho	<td><input name="v_ancho"	value="" class="EDITABLE" ewe="1" maxlength="4" size="4" dcm="1" leng="4" onfocus="S.key('+,',3,1)" tc="+," style="text-align:right; width:36px; border:1px solid #aaaaaa;" ehelpno="1">
<td align=right>Alto	<td><input name="v_alto"	value="" class="EDITABLE" ewe="1" maxlength="4" size="4" dcm="1" leng="4" onfocus="S.key('+,',3,1)" tc="+," style="text-align:right; width:36px; border:1px solid #aaaaaa;" ehelpno="1">
<tr class="colsrows">
<td align=right>Columnas<td><input name="v_cols"	value="" class="EDITABLE" ewe="1" maxlength="4" size="4" dcm="1" leng="4" onfocus="S.key('+,',3,1)" tc="+," style="text-align:right; width:36px; border:1px solid #aaaaaa;" ehelpno="1">
<td align=right>Filas	<td><input name="v_rows"	value="" class="EDITABLE" ewe="1" maxlength="4" size="4" dcm="1" leng="4" onfocus="S.key('+,',3,1)" tc="+," style="text-align:right; width:36px; border:1px solid #aaaaaa;" ehelpno="1">
<tr class="lapizpapel">
<td align=right>Color: Lapiz</td>
<td><input name="v_lapiz" pp="1" onchange="_SetColor('v_lapiz');AsignaValor('v_lapiz');" value="#000000" onchange="uDefault(this,'#000000')" class="EDITABLE" ewe="1" leng="7" maxlength="7" size="7" onfocus="S.key('CLR',7,0)" tc="CLR" style="width:58px; color:#FFFFFF; background-color:#000000;"><i class="ICONINPUT" onclick="eSelectRGB('v_lapiz',1,eToneSelect,184)" title="Seleccionar color" style="font-family:eDes">&#184;</i></td>
<td align=right>Papel</td>
<td><input name="v_papel" pp="1" onchange="_SetColor('v_papel');AsignaValor('v_papel');" value="#FFFFFF" onchange="uDefault(this,'#FFFFFF')" class="EDITABLE" ewe="1" leng="7" maxlength="7" size="7" onfocus="S.key('CLR',7,0)" tc="CLR" style="width:58px; color:#000000; background-color:#FFFFFF;"><i class="ICONINPUT" onclick="eSelectRGB('v_papel',1,eToneSelect,185)" title="Seleccionar color" style="font-family:eDes">&#185;</i></td>
<tr class="gruesotrama">
<td align=right>Linea: Grueso</td>
<td><input name="v_grueso" value="0,1" onchange="uDefault(this,1);AsignaValor('v_grueso');" class="EDITABLE" ewe="1" maxlength="2" size="2" dcm="1" leng="2" onfocus="S.key('+,',1,1)" tc="+," style="text-align:right; width:36px;" ehelpno="1"></td>
<td align=right>Trama</td>
<td><input name="v_trama" value="" class="EDITABLE" ewe="1" leng="10" maxlength="10" size="10" onfocus="S.key(/^[0123456789,]{0,10}$/,10,0)" tc="trama" style="width:58px;" ehelpno="1"></td>
<tr class="sizegrueso">
<td align=right>Tamaño letra</td>
<td><input name="v_font_size" value="12" class="EDITABLE" ewe="1" maxlength="3" size="3" dcm="1" leng="3" onchange="uDefault(this,12)" onfocus="S.key('+,',2,1)" tc="+," style="text-align:right; width:70px;" ehelpno="1"></td>
<td align=right>Gruesor letra</td>
<td>
<input name="v_font_weight_label" onclick="BoldDeLetra(this)" value="Normal" class="READONLY" readonly="true" onclick="" leng="15" maxlength="15" size="15" onchange="uDefault(this,'Helvetica')" onfocus="S.key('#',15,0)" tc="#" style="cursor:default; width:70px;">
<input name="v_font_weight" value="normal" style="display:none">
</td>
<tr class="fuentestilo">
<td align=right>Tipo letra</td>
<td>
<input name="v_font_family_label" onclick="TipoDeLetra(this)" value="Helvetica" class="READONLY" readonly="true" onclick="" leng="15" maxlength="15" size="15" onchange="uDefault(this,'Helvetica')" onfocus="S.key('#',15,0)" tc="#" style="cursor:default; width:70px;">
<input name="v_font_family" value="Helvetica" style="display:none">
</td>
<td align=right>Estilo letra</td>
<td>
<input name="v_font_style_label" onclick="EstiloDeLetra(this)" value="Normal" class="READONLY" readonly="true" onclick="" leng="15" maxlength="15" size="15" onchange="uDefault(this,'Helvetica')" onfocus="S.key('#',15,0)" tc="#" style="cursor:default; width:70px;">
<input name="v_font_style" value="normal" style="display:none">
</td>
<tr class="solotexto">
<td align=right>Texto</td>
<td colspan=3>
<input name="v_texto" value="" class="EDITABLE" readonly="true" onclick="" leng="15" maxlength="15" size="15" onchange="uDefault(this,'Helvetica')" onfocus="S.key('#',265,0)" tc="#" style="cursor:default; width:100%;">
</td>
<tr>
<td colspan=4 style="text-align:right;height:1px;">
<table style="display:table;width:100%;" border="0px" cellspacing="0px" cellpadding="0px"><tr>
<td style="width:100%">
<td onclick="CancelarFormulario()"><span class="AddButton"><i class="ICONWINDOW" style="font-style:normal;font-family:eDes;font-weight:bold;">i</i> Cancelar</span>
<td onclick="AceptarFormulario()"><span class="AddButton" style="margin-left:15px;"><i class="ICONWINDOW" style="font-style:normal;font-family:eDes;font-weight:bold;">j</i> Aceptar</span>
</table>
</table>
</form>
</span>
<span id="EDITOR" style="z-index:500;">
<div id="edCONTAINER" style="position:absolute; left:330px; top:250px; overflow-y:auto; width:300px; height:200px; display:none; border:1px solid #acacac; z-index:500; padding:0px !important; marging:0px !important; border-radius:0px;" class="edOVER">
<textarea name="texto" cols="80" rows="14" maxlength="40000" _maxlength="40000" class="EDITABLE" ewe="1" wrap="VIRTUAL" onfocus="S.key('#',40000,0)" ehtml="true" eimg="0" style="display:none;"
eIconNone="edCOLOR,edBACKGROUND,edSPACE2,edFONTSIZE3,edFONTSIZE2,edFONTSIZE1,edSPACE3,edOUTDENT,edINDENT,edINSERTORDEREDLIST,edINSERTUNORDEREDLIST,edIMAGE"
></textarea>
<span id="texto_" class="MultiLinea" w="1" style="width:100%; height:100%; display:block; z-index:500; padding:0px !important; marging: 0px !important;" contenteditable="true" ewe="1" elong="2000" onclick="edSetCursor()" onkeydown="edDown()" onfocus="edShow()" onblur="edBlur()"></span>
</div>
<table id="edMENUS" border="0px" cellspacing="0px" cellpadding="0px" style="position:absolute; left:330px; top:100px; z-index:2000; display:none; border:1px solid #acacac;"><tbody><tr>
<td id="edBOLD" style="display:inline-block;"><img title="Negrita" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAAAEBAQMDAwYGBgcHBwkJCQoKCgsLCygoKC0tLS8vLzExMTY2NktLS0xMTE9PT1BQUF1dXV9fX2dnZ2pqanNzc3V1dYGBgZOTkwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQIBATACAAcAAAEAAbBIHAiDwcAMGoTDITxGBcLicRYsACNxqCsDjkAYvByCSMlcKoHLpQAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIsR1QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAhXAAEIHEiwoMGDCBMexMCAYIMLCCFkQDBQgAOEDzJkmCDQIsYMCgZ0vHgwIwADCQB4LJkBQIUMFFYaNAlgAYEAJGe2FFggQ86CEg4MtJAhgsKjSJMqRRgQADs=" exe="bold" onclick="ed()"></td><!-- 98|Negrita -->
<td id="edITALIC" style="display:inline-block;"><img title="Itálica" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAAF9vj5WIbQAAAFNwoiVjAPf1+NDh8K6m/ldusbSvov/4/05Yxgk5hkxwl8jZ8N/f4PD48Ki4uMLW/kqydvC2Y7Cztai1x9rm/qK63SJa4hL+ArvI4NqOcoevh6XY8LDQ4M7NzKae5lC4tvTj31VnizJScja/f95bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAgyAAEIHEiwoMGDCBMqHMCQoUKBDAU8BBDA4USGASZWHDARAEaNFh9+XNgwZMeTKFMqDAgAOw==" exe="italic" onclick="ed()"></td><!-- 99|Itálica -->
<td id="edUNDERLINE" style="display:inline-block;"><img title="Subrayado" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAAAEBAQMDAwUFBQYGBgwMDA0NDRUVFRgYGCgoKC0tLS4uLjAwMDY2NkNDQ0lJSUxMTE9PT1NTU1VVVVhYWF9fX2FhYW1tbW9vb3Z2dn9/f4CAgIGBgYKCgoODg4iIiJCQkJKSkpOTkwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQIBATUCAAIAAAEAILBIHAiDwcAUGoaAABwyD8VhEWYlEWNwuD8UjnHIvAAAgNk0lIJLoZy+YwAgMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIsR2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAhaAAEIHEiwoMGDCBMmvPAgggeFABAYcKBgBIWEG0Z0ENjgQMIQIxJsgCiwAoERARiIIMkBwgACCTF4FGhhxAeEGkZIELhAgMIJAkaMKJCBJAiSEZIqTUqyKcSAADs=" exe="underline" onclick="ed()"></td><!-- 100|Subrayado -->
<td id="edREMOVEFORMAT" style="display:inline-block;"><img title="Elimina formato" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAADRLY19vj3mOrpGjuaezxr/I19Ha7OPs++bx/Pv8/QAAALCztYOXw5Snw6ezxp/PqLrD0dDQjdTLtPfvrt/V0MDQ7+vv9vDv8Pv8/f///xkVEbvI4NqOcoevh6XY8LDQ4M7NzKae5lC4tvTj31VnizJScja/f95bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAhoAAEIHEiwoMGDCAceIEBgwIADCRcqmHjg4UGJEykOMIhxIgIECjYS7KjgY0gBIwlkLAnSYQCFKjMmaDkgQIGBMT3StEmQgMmMLm8SHGDAwIGdQkc6ZFigZlKDBQRIXUC1KtWEWLMODAgAOw==" exe="removeformat" onclick="ed()"></td><!-- 101|Elimina formato -->
<td id="edSPACE1" style="display:inline-block;"><img src="data:image/gif;base64,R0lGODdhBAAQAOcAAAAAAP///4CAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQIBARYCAAEAAAEAQCAoFACDQZhcHobCoXRKH0BhcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIsRtwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAEABAAAAgbAAEIFCggAEGDAAoeXJgQocKGDB9KdEhxoMCAADs=" exe="space"></td>
<td id="edCOLOR" style="display:inline-block;"><img title="Color texto" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAAD04KTRLY2tXQFVni3mOro14WaeYa7WqT8+wUca0cfHvbrCztYOXw5Snw6ezxp/PqLrD0dDQjdTLtPfvrt/V0MDQ7+vv9vDv8Pv8/f///xkVEbvI4NqOcoevh6XY8LDQ4M7NzKae5lC4tvTj31VnizJScja/f95bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAiDAAEIHEiwoMGDCBMOXMCQ4YaGCwxCXPCwIYAIDQoUeIBgwwYEFD2CxLixAYGGDx92XOAggwUBBAR09EjRoQQNGCwUEMCgYsoFCAZQuGDBAU8AHQNsSOAxAIScDY4CmLhAAYQKRaVOhXiAwgQBOxkg7EphwYENYhEaWBsgQFqFcOMODAgAOw==" exe="color" onclick="edColor(0)"></td><!-- 102|Color texto -->
<td id="edBACKGROUND" style="display:inline-block;"><img title="Color fondo" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAADRLY1ldZjFRjl9vj1dusY14WbSVFZWIbc+wUca0cYODhpqbmrCztYOXw46O7MS4kdDQjdTLtO3YiuPcsffvrsrL1NHa7N/f4Pv5xvDv8D04KbvI4NqOcoevh6XY8LDQ4M7NzKae5lC4tvTj31VnizJScja/f95bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAiVAAEIHEiwoMGDGBw4sHCQoAUHDwoQMHihgcWHEQcIKIihAQYLGBg4KKCxAUEIECg00AByAQEBJgFIiAChQoYMFBhgWNAgwAKBEijcHFohwgIGBAgEADrBZoYKFSZMgCBggYClAilEsBlVqgIEV2MChSDVa4IDG8QOhIDALFoGDSEYUHB2A9yGAKgasIt3rQADfQMLDAgAOw==" exe="background" onclick="edColor(1)"></td><!-- 103|Color fondo -->
<td id="edSPACE2" style="display:inline-block;"><img src="data:image/gif;base64,R0lGODdhBAAQAOcAAAAAAP///4CAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQIBARYCAAEAAAEAQCAoFACDQZhcHobCoXRKH0BhcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIsRtwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAEABAAAAgbAAEIFCggAEGDAAoeXJgQocKGDB9KdEhxoMCAADs=" exe="space"></td>
<td id="edFONTSIZE3" style="display:inline-block;"><img title="Extra Grande" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAAFldZgk5hh1ChDFRjkBgmUxwl1Vni1dusWR9qmKBt3mOrpGjuYOXw5Snw6Gvw6ezxqy1yzRLY2R7rm2DnnmFnH2ImWiBpmmArmyCqmuAsW2CtG6Hs3WKr3aJrHmLqH+PrHuPsHySsoGUqYSatImYtImevo6eupSftZCgu6CotqKtv6mssaqutaivvKawvKexvquyvqyyu5ypwaCrwqqxwayzwK21waq0ybK4w7u9wiNEc4J4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAhuAAEIHEiwoMGDCAc+UJCwoAIEEBoKjIAAQQGJABQoKECggcQCETheTNgAAQAHHB0kNPBAIMcDCCEUmDmTwICWBhMgcMCAgQMCEmAWDBmBYAIBEgpCMEAgwMAFAyQMGFB04gMHKif27BkRo9eDAQEAOw==" exe="fontsize_5" onclick="ed()"></td><!-- 104|Extra Grande -->
<td id="edFONTSIZE2" style="display:inline-block;"><img title="Grande" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAAC1LdTdXkjhYkzlZlEZfhEVgikJgmENhnV5wk01qoVZyplZxr1l1pV14o114pF55plx2tGJ6o2R7rm2DnnmFnH2ImWiBpmmArmyCqmuAsW2CtG6Hs3WKr3aJrHmLqH+PrHuPsHySsoGUqYSatImYtImevo6eupSftZCgu6CotqKtv6mssaqutaivvKawvKexvquyvqyyu5ypwaCrwqqxwayzwK21waq0ybK4w7u9wiNEc4J4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAhlAAEIHEiwoMGDCBMqXFjQRAqGAHRE2OCC4QwGCDww7MCBgIKFNSasaDDghsIRJACAEFAhYQwMCx5AOGBABcISGmi8gJEhgIWDORwkYAFAhoQdBVAYxCHiQwsANkJQuHAColWEAQEAOw==" exe="fontsize_4" onclick="ed()"></td><!-- 105|Grande -->
<td id="edFONTSIZE1" style="display:inline-block;"><img title="Normal" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAADxajj5dmEBdlE9ql1hukVx1mFJvoVlyoFl0qWd+pmR+qml/oWZ8sWZ/smmCq2qDrGyDqmyFq3WIsHWJuH6RsoCQr46ZroOTt4eZu5acp5CgvZenv5mhspqlupumuqGqu6etuamwvKmwvq6zvLS4vrG3wSxKdd5bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAhLAAEIHEiwoMGDCBMqXMiwIcMNGRxSaECC4QcHAiwwnIDhAAKGCzwoGHBBIYgEDyAEKJDQRIQOJUQQOBECIQcJGgCMYGCggsOfBwMCADs=" exe="fontsize_3" onclick="ed()"></td><!-- 106|Normal -->
<td id="edSPACE3" style="display:inline-block;"><img src="data:image/gif;base64,R0lGODdhBAAQAOcAAAAAAP///4CAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQIBARYCAAEAAAEAQCAoFACDQZhcHobCoXRKH0BhcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIsRtwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAEABAAAAgbAAEIFCggAEGDAAoeXJgQocKGDB9KdEhxoMCAADs=" exe="space"></td>
<td id="edJUSTIFYLEFT" style="display:inline-block;"><img title="Justificación izquierda" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAAAAAAE9QrViE35Gr8d/V0FFRUqeYa7WqT8+wUca0cfHvbrCztYOXw5Snw6ezxp/PqLrD0dDQjdTLtPfvrt/V0MDQ7+vv9vDv8Pv8/f///xkVEbvI4NqOcoevh6XY8LDQ4M7NzKae5lC4tvTj31VnizJScja/f95bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAgtAAEIHEiwoMGDCBMSDMCwoUOHChE+fBgx4sSLASoaxMhQY0KOFD0OBCmypMGAADs=" exe="justifyleft" onclick="ed()"></td><!-- 107|Justificación izquierda -->
<td id="edJUSTIFYCENTER" style="display:inline-block;"><img title="Centrado" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAAAAAAE9QrViE35Gr8d/V0FFRUqeYa7WqT8+wUca0cfHvbrCztYOXw5Snw6ezxp/PqLrD0dDQjdTLtPfvrt/V0MDQ7+vv9vDv8Pv8/f///xkVEbvI4NqOcoevh6XY8LDQ4M7NzKae5lC4tvTj31VnizJScja/f95bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAgtAAEIHEiwoMGDCBMSDMCwoUOHChU+fBgx4cSLASoixMhQ40GOFD0WBCmyJMGAADs=" exe="justifycenter" onclick="ed()"></td><!-- 108|Centrado -->
<td id="edJUSTIFYFULL" style="display:inline-block;"><img title="Justificación completa" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAAAAAAE9QrViE35Gr8d/V0FFRUqeYa7WqT8+wUca0cfHvbrCztYOXw5Snw6ezxp/PqLrD0dDQjdTLtPfvrt/V0MDQ7+vv9vDv8Pv8/f///xkVEbvI4NqOcoevh6XY8LDQ4M7NzKae5lC4tvTj31VnizJScja/f95bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAgvAAEIHEiwoMGDCBMSDMCwoUOHChE+nNgw4kGKFC0axDhRY0GODz0uBFlRpEkAAQEAOw==" exe="justifyfull" onclick="ed()"></td><!-- 109|Justificación completa -->
<td id="edOUTDENT" style="display:inline-block;"><img title="Disminuir sangría" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAADljwliE35GjuaezxtDV3NHa7AAAAAAAAM+wUca0cfHvbrCztYOXw5Snw6ezxp/PqLrD0dDQjdTLtPfvrt/V0MDQ7+vv9vDv8Pv8/f///xkVEbvI4NqOcoevh6XY8LDQ4M7NzKae5lC4tvTj31VnizJScja/f95bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAhHAAEIHEiwoEGBBw4qXIjwgEMADiNKZLiQwICGEiMCICBAgAGMGQ90FBCgJMMCA0p+hJjRYEqQDykunBhSo8yCNBPe3IlQYUAAOw==" exe="outdent" onclick="ed()"></td><!-- 110|Indentar <- -->
<td id="edINDENT" style="display:inline-block;"><img title="Aumentar sangría" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAADljwl9vj1iE35GjuaezxtDV3NHa7AAAAM+wUca0cfHvbrCztYOXw5Snw6ezxp/PqLrD0dDQjdTLtPfvrt/V0MDQ7+vv9vDv8Pv8/f///xkVEbvI4NqOcoevh6XY8LDQ4M7NzKae5lC4tvTj31VnizJScja/f95bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAhKAAEIHEiwoEGBCA4qXIgQgUMADiNKZHhwwIADAyVqBHDAIgGMGiVaHBCgJEUDJQMUgLhxoAABGBtOpLhwYsiINA3aTJizJ0KFAQEAOw==" exe="indent" onclick="ed()"></td><!-- 111|Indentar -> -->
<td id="edINSERTORDEREDLIST" style="display:inline-block;"><img title="Lista ordenada" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAADljwliE35GjuaezxtHa7AAAAJqbmpGjuaezxgAAAP/4/05Yxgk5hkxwl8jZ8N/f4PD48Ki4uMLW/kqydvC2Y7Cztai1x9rm/qK63SJa4hL+ArvI4NqOcoevh6XY8LDQ4M7NzKae5lC4tvTj31VnizJScja/f95bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAhIAAEIHEiwoMACAgwqBCAgwEADECNGPBiAwMKCATJe3LhRgIABHAcScAhAokmBIy2GzEgypEuBHltyFKDSpMSBA2RezKjyZciAADs=" exe="insertorderedlist" onclick="ed()"></td><!-- 112|Lista ordenada -->
<td id="edINSERTUNORDEREDLIST" style="display:inline-block;"><img title="Lista con marcas" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAAB1ChF9vj3mOrliE36ezxgAAAJqbmpGjuaezxgAAAP/4/05Yxgk5hkxwl8jZ8N/f4PD48Ki4uMLW/kqydvC2Y7Cztai1x9rm/qK63SJa4hL+ArvI4NqOcoevh6XY8LDQ4M7NzKae5lC4tvTj31VnizJScja/f95bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAhDAAEIHEiwoMACAwoYXDiAQACBBiJKlHgwwICFGDNq3IhQ4UYADR8CmEiy4sWPKFMWLCDA40YBDiGSpAiggEWVOFEGBAA7" exe="insertunorderedlist" onclick="ed()"></td><!-- 113|Lista con marcas -->
<td id="edIMAGE" style="display:inline-block;"><img title="Insertar imagen" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAAEpJUkpNUlJNUlJRUlpZWlpdWmNlY2tpa2tta2ttc2txa2txc3N1c3N5c3t9eylJjHt9hHuCe4SGe+/HSoSChISGhISCjISGjIyOhIyOjJSWjJSajJSWlJyenISWvZyapZyilJymlKWepaWunKWipa2mra22pa2yrb3HpZzD3ozH/5TL/6XH3qXL1qXT76XT/7Xb/73b987Ppd7b58bj/87j99br/97v/+fr5////0JFSjMTBbhcKoeNIMDGIcHh42YzGAMEUEI6gwPZFAeQjzHI7JUMgQQeYZFBw9xsAweCcH8Hn7N5uBubhnIRCCIRBGgsiYqH0z4OQ4B0+jwvHzBxwESuCPDIEAqFRTi4YYRENpQ0A6DiMcwoFUDAkAIBgbg4kA6IhVA4JADAoBwGRsLh/BILCAAQGKgKEY1eqwAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIsSYRQUFAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAitAAEIHEiwoMAPCBMqTAjh4IqHEB+moJBiRUMAH1ho3KiRgg4KLC5+gEGyJMkZFGbAEBnjxQMGKmLInBlDpIsFOnQIaOECAwgZNWqInJAzJ4EKOS/YuCEyR46cORAoyEljBI6mTrMKoEEDhQYTIjdkdbphQAUUJSKIPCE2x4YNDRAIsOChg0gSId5KcJDgQAEBASyIFMEhwwQHCw4YICBgx46LECJLnjzZoGWCAQEAOw==" exe="img" onclick="edImg()" id="_edIMG" style="display:none;"></td><!-- 114|Insertar imagen -->
<td style="display:inline-block;"><img src="data:image/gif;base64,R0lGODdhBAAQAOcAAAAAAP///4CAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQIBARYCAAEAAAEAQCAoFACDQZhcHobCoXRKH0BhcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIsRtwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAEABAAAAgbAAEIFCggAEGDAAoeXJgQocKGDB9KdEhxoMCAADs=" exe="space"></td>
<td onclick="TipoDeLetra(this, AsignaFuenteAText)" style="display:inline-block; cursor:pointer;" title="Tipo letra"><b>T</b></td>
<td style="display:inline-block;"><img src="data:image/gif;base64,R0lGODdhBAAQAOcAAAAAAP///4CAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQIBARYCAAEAAAEAQCAoFACDQZhcHobCoXRKH0BhcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIsRtwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAEABAAAAgbAAEIFCggAEGDAAoeXJgQocKGDB9KdEhxoMCAADs=" exe="space"></td>
<td onclick="AltoDeLetra(this)" style="display:inline-block; cursor:pointer;" title="Alto letra"><b>A</b></td>
<td style="display:inline-block;"><img src="data:image/gif;base64,R0lGODdhBAAQAOcAAAAAAP///4CAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQIBARYCAAEAAAEAQCAoFACDQZhcHobCoXRKH0BhcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIsRtwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAEABAAAAgbAAEIFCggAEGDAAoeXJgQocKGDB9KdEhxoMCAADs=" exe="space"></td>
<td onclick="eSelectRGB(AsignaColorAText,1,eToneSelect,184)" style="display:inline-block; cursor:pointer;" title="Color"><i class="ICONWINDOW" style="font-family:eDes; zoom:0.9; color:#000000;">&#184;</i></td>
<?PHP if( $_MenuConVariables ){ ?>
<?PHP } ?>
<td id="edSPACE4" style="display:inline-block;"><img src="data:image/gif;base64,R0lGODdhBAAQAOcAAAAAAP///4CAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQIBARYCAAEAAAEAQCAoFACDQZhcHobCoXRKH0BhcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIsRtwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAEABAAAAgbAAEIFCggAEGDAAoeXJgQocKGDB9KdEhxoMCAADs=" exe="space"></td>
<td><img title="Anular cambios" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAAPggHvsuLfhBOPtNR/5iVf9nZPzLyvv8/fUHB/v8/QAAALCztYOXw5Snw6ezxp/PqLrD0dDQjdTLtPfvrt/V0MDQ7+vv9vDv8Pv8/f///xkVEbvI4NqOcoevh6XY8LDQ4M7NzKae5lC4tvTj31VnizJScja/f95bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAiLAAEIHEiwYMEACRIqDGAQQAABBgwUmFggAEOCDw0QEMBRwICKFx1CLHBgowACJQlYFJhA4wEECAgQgHngZAKWBU7C3IlgQAACNwEkyKlzp88EQHFynGk04YCgQ4vyFJDgqdKXPQfQDGDV4U+UTxMIqOlTwECLGxUm4Prw4M8BcOG2NYhQ7dqGeAsGBAA7" exe="close" onclick="edClose()"></td><!-- 116|Anular cambios -->
<td><img title="Grabar" src="data:image/gif;base64,R0lGODdhEAAQAOcAAAAAADw8PyU0TyFAeFFRUlldZhFNsS1Nqk81hEZImk9QrWBwhXB6jU5YxnRs046O7JOt4qae5ru+wa6m/r6+/sPJ3sjZ8Nfe9Ojo9/f1+P7+/gAAALvI4NqOcoevh6XY8LDQ4M7NzKae5lC4tvTj31VnizJScja/f95bW/i+Wj+uy5CosCgpJ/v7+9/V0KCltKDg8MDt+oCwwDljwgAAAAAAAAAACQIBAXECAAAAAB/cgOc/gYJ4P0/Xy1klRN15+Ffk/nff5Y4HwDePAM+oWFn+L9fmff7n7Zj2b4eZ90+wR1uG11fvfv9n9Xb1z5B8eIBMymoBSMhEBP/n9///9wJ/iGgsEn/CIGg9esOh8M3/CYuFxTcTCfHo7CKQyGkskpTKJGyyV8wl8tJnMibzaXc6nMCJPA2gxGos9KTSKG0yl9Qp9FKnUir1ardarPXq7WKw2GstkrTaLG2y19Pt9gYFEE68AoSwS9JqGMfb/QAAAIsSiP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAioAAEIHEiwoEAKCClMmBDhgcMHDiIepPBAg8WLFhsoUDCxIkaLGRoI4AhgAsWPGjJgOOCApEkHH1VeYEkyAgWYF2VaoCnwwc2cGC5YsGDAQYKeCB00WHqgadEGRwH4VPgwYkSNUR0sfFCga9cFGhUgEKjVYYENAS5cWLAxwVgAZbkGYIABA4MDCQ68deDwQAAJEipUINBUr0AILTcqSMAYgWMEAwxKJhgQADs=" exe="save" onclick="edSave()"></td><!-- 117|Grabar -->
</tr></tbody></table>
</span>
<TABLE id=edCOLORES onmouseleave='this.style.display="none";this.Obj.title=this.eTitle;' style='position:absolute; z-index:550;' onclick='edColor()'><!-- edPutCursor(); -->
<TR><TD style="background:rgb(100,  0,  0)"></TD><TD style="background:rgb(143,114,  0)"></TD><TD style="background:rgb(100,100,  0)"></TD><td style="background:rgb(  0,100,  0)"></td><TD style="background:rgb(  0,  0,100)"></TD><TD style="background:rgb(  0,100,100)"></TD><TD style="background:rgb(100,  0,100)"></TD><TD style="background:rgb( 75, 56, 37)"></TD><TD style="background:rgb(  0,  0,  0)"></TD></TR>
<TR><TD style="background:rgb(150,  0,  0)"></TD><TD style="background:rgb(180,144,  0)"></TD><TD style="background:rgb(150,150,  0)"></TD><td style="background:rgb(  0,150,  0)"></td><TD style="background:rgb(  0,  0,150)"></TD><TD style="background:rgb(  0,150,150)"></TD><TD style="background:rgb(150,  0,150)"></TD><TD style="background:rgb( 95, 70, 48)"></TD><TD style="background:rgb(100,100,100)"></TD></TR>
<TR><TD style="background:rgb(200,  0,  0)"></TD><TD style="background:rgb(217,174,  0)"></TD><TD style="background:rgb(200,200,  0)"></TD><td style="background:rgb(  0,200,  0)"></td><TD style="background:rgb(  0,  0,200)"></TD><TD style="background:rgb(  0,200,200)"></TD><TD style="background:rgb(200,  0,200)"></TD><TD style="background:rgb(115, 85, 59)"></TD><TD style="background:rgb(140,140,140)"></TD></TR>
<TR><TD style="background:rgb(255,  0,  0)"></TD><TD style="background:rgb(255,204,  0)"></TD><TD style="background:rgb(255,255,  0)"></TD><td style="background:rgb(  0,255,  0)"></td><TD style="background:rgb(  0,  0,255)"></TD><TD style="background:rgb(  0,255,255)"></TD><TD style="background:rgb(255,  0,255)"></TD><TD style="background:rgb(135,100, 70)"></TD><TD style="background:rgb(190,190,190)"></TD></TR>
<TR><TD style="background:rgb(255,100,100)"></TD><TD style="background:rgb(255,217, 69)"></TD><TD style="background:rgb(255,255, 66)"></TD><td style="background:rgb(100,255,100)"></td><TD style="background:rgb(100,100,255)"></TD><TD style="background:rgb(100,255,255)"></TD><TD style="background:rgb(255,100,255)"></TD><TD style="background:rgb(167,142,120)"></TD><TD style="background:rgb(230,230,230)"></TD></TR>
<TR><TD style="background:rgb(255,150,150)"></TD><TD style="background:rgb(255,230,140)"></TD><TD style="background:rgb(255,255,130)"></TD><td style="background:rgb(150,255,150)"></td><TD style="background:rgb(150,150,255)"></TD><TD style="background:rgb(150,255,255)"></TD><TD style="background:rgb(255,150,255)"></TD><TD style="background:rgb(199,184,170)"></TD><TD style="background:rgb(255,255,255)"></TD></TR>
<TR><TD style="background:rgb(255,200,200)"></TD><TD style="background:rgb(255,245,207)"></TD><TD style="background:rgb(255,255,200)"></TD><td style="background:rgb(200,255,200)"></td><TD style="background:rgb(200,200,255)"></TD><TD style="background:rgb(200,255,255)"></TD><TD style="background:rgb(255,200,255)"></TD><TD style="background:rgb(232,226,219)"></TD><TD style="background:rgb(250,250,250);border:1px solid #6c7b82;" align=center valign=middle title='<?=$__Lng[118]?>'></TD></TR><!-- 118|Color por defecto -->
</TABLE>
<img id="idIMG" style="position:absolute;left:0pc;top:0px;visibility:hidden;">
<table id="idVerVariables" class="BROWSE" border="0px" cellspacing="0px" cellpadding="0px" style="position:absolute;left:0pc;top:0px;display:none;">
<tr><th>Variables
<?PHP
for($n=0; $n<count($_MenuVariables); $n++){
if( $_MenuVariables[$n]!="-" ) echo "<tr><td>".$_MenuVariables[$n];
}
?>
</TABLE>
<script>
window.onload = function(){
document.body.onselectstart = function(){ return true; };
var data = "<?=$dim?>".split("|"), n,i,d,e,text,parte,
xHoja = S("#vmlHoja").xy().x;
for(n=0; n<data.length;n++){
parte = S.replace(data[n], [
["&#34;", '"'],
["&#39;", "'"],
["&#60;", "<"],
["&#62;", ">"],
["&#92;", "\\"]
]).split("~");
d = parte[0].split(",");
switch(d[0][0]){
case "L": case "line":
CreateSvgElement({svg:'line',
x1: d[1],
y1: d[2],
x2: d[3],
y2: d[4],
stroke: d[5],
"stroke-width": d[6],
"stroke-dasharray": S.replace(d[7], ":", ","),
eType: S.mid(d[0],1,1)
});
break;
case "R": case "rect":
CreateSvgElement({svg:'rect',
x: d[1],
y: d[2],
width: d[3],
height: d[4],
stroke: d[5],
"stroke-width": d[6],
"stroke-dasharray": S.replace(d[8], ":", ","),
fill: d[7]
});
break;
case "C": case "circle":
CreateSvgElement({svg:'circle',
cx: d[1],
cy: d[2],
r: d[3],
stroke: d[4],
"stroke-width": d[5],
"stroke-dasharray": S.replace(d[7], ":", ","),
fill: d[6]
});
break;
case "T": case "text":
if( S.trim(parte[1])=="" ) break;
text = CreateSvgElement({svg:'text',
x: d[1]*1,
y: d[2]*1+d[3]*1,
fill: d[7],
transform: "rotate(270,"+(d[1]*1+2)+","+(d[2]*1+d[3]*1)+")"
});
text.style.fontSize = d[3];
text.style.fontFamily = d[4];
text.style.fontStyle = d[5];
text.style.fontWeight = d[6];
text.textContent = parte[1];
break;
case "H":
texto = parte[1];
S("<span class='spanMultilinea' style='position:absolute; left:"+(d[1]*1+xHoja)+"px; top:"+d[2]+"px; width:"+d[3]+"px; height:"+d[4]+"px; border:1px solid #dddddd; font-family:"+d[6]+"; font-size:"+(d[5])+"px; color:"+d[7]+";'>"+texto+"</span>").nodeEnd("body");
break;
case "I": case "image":
if( d[3]=="null" ) d[3] = "";
if( d[4]=="null" ) d[4] = "";
CreateSvgElement({svg:'image',
x: d[1],
y: d[2],
width: d[3],
height: d[4],
href: d[5]
});
break;
case "-":
CreateSvgElement({svg:'line',
x1: 0,
y1: d[1],
x2: _HojaAncho,
y2: d[1],
stroke: d[2],
"stroke-width": 0.1,
"stroke-dasharray": "6.4",
id: "CrearLineaDeCorte"
});
CreateSvgElement({svg:'image',
x: _HojaAncho-25,
y: d[1]-10,
width: 20,
href: "edes.php?R:$t/g/e/tijeras.png",
id: "Tijeras"
});
break;
case "P":
e = S("#ImgFondo").obj.style;
e.backgroundImage = "url('"+d[1]+"')";
e.backgroundPosition = d[2]+"px "+d[3]+"px";
e.backgroundSize = d[4]+"px "+d[5]+"px";
break
case "F":
e = "";
for(i=1; i<d.length; i++){
if( i>1 ) e += ",";
e += d[i];
}
d = e.split("=");
S(":"+d[0]).val(d[1]);
if( d[0]=="hoja_info" ){
i = d[1].split(",");
_HojaAncho = i[2];
_HojaAlto = i[3];
S("#vmlHoja").attr({width:i[2], height:i[3], eHoja:i[0]+","+i[1]});
window.frames["VIEWPDF"].frameElement.style.width = i[2]+"px";
window.frames["VIEWPDF"].frameElement.style.height = i[3]+"px";
}
break;
}
}
};
</script>
</BODY>
</HTML>
<?PHP
?>
