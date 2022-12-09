<?= eHTML('$form_visor.php') ?>
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
zoom: 0.75;
}
text {
font-family: Helvetica;
}
.SeparadorVertical {
width:50px;
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
input, textarea, #edCONTAINER {
border-radius: 0px;
padding: 2px !important;
}
svg, div, span {
cursor:crosshair;
}
#ImgFondo {
background-repeat: no-repeat;
}
</STYLE>
<SCRIPT type="text/javascript">
document.title = "LIST";top.S.init(window,"all,list");
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
}
?>
</SCRIPT>
</HEAD>
<BODY id="ImgFondo" onselectstart="return false"<?=(($_SESSION["_D_"]=="~") ? "":' oncontextmenu="return false"')?>>
<div id="PAGINA" style="display:inline-table;text-align:-webkit-center;background:transparent;padding:0px;">
<svg id="vmlHoja" height="<?=$_HojaAlto?>" width="<?=$_HojaAncho?>" eHoja="<?=$eHoja?>" style="cursor:crosshair; border:1px solid #dddddd;">
</svg>
</div>
<script>
window.onload = function(){
document.body.onselectstart = function(){ return true; };
S(window).windowCaption('<?=$nombreImpreso?>');
S(window).windowResize(<?=$_HojaAncho?>*0.75+7, <?=$_HojaAlto?>*0.75+6, true);
S(window).windowIcon("F", "P", function(){
S.eventClear(window);
S.window("edes.php?E:$form_pdf.php&cd_gs_form=<?=$cd_gs_form?>");
});
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
if( (d[1]<0 || d[1]>_HojaAncho) && (d[2]<0 && d[2]>_HojaAlto) ) break;
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
S("<span class='spanMultilinea' style='position:absolute; left:"+(d[1]*1+xHoja)+"px; top:"+d[2]+"px; width:"+d[3]+"px; height:"+d[4]+"px; border:0px solid #dddddd; font-family:"+d[6]+"; font-size:"+(d[5])+"px; color:"+d[7]+";'>"+texto+"</span>").nodeEnd("body");
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
S(window).windowResize(_HojaAncho*0.75+7, _HojaAlto*0.75+6, true);
}
break;
}
}
};
</script>
</BODY>
</HTML>
<?PHP
eEnd();
?>
