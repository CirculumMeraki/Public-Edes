<!DOCTYPE HTML>
<HTML>
<HEAD>
<TITLE>TEST DE ENCUESTA</TITLE>
<META NAME="Generator" CONTENT="">
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">
<SCRIPT type="text/javascript">
document.title = "TAB/LIST";
top.S.init(window, "all,list");
</SCRIPT>
<STYLE>
body, html {
height:100%;
width:100%;
background-color:#f2f2f2;
}
body {
CURSOR:default;
FONT-SIZE: 14px;
MARGIN:0px;
}
TH, TD {
display: table-cell;
overflow-wrap: break-word;
white-space: pre;
white-space: pre-wrap;
white-space: pre-line;
white-space: -pre-wrap;
white-space: -o-pre-wrap;
white-space: -moz-pre-wrap;
white-space: -hp-pre-wrap;
word-wrap: break-word;
}
#POLL {
display:table;
width:100%;
height:100%;
border:0px solid blue;
padding:10px;
}
#CABECERA {
border:0px solid purple;
}
#PREGUNTA {
font-size:130%;
text-align: justify;
border:0px solid green;
padding-bottom:5px;
font-weight:bold;
}
#RESPUESTA {
text-align: left;
vertical-align:top;
border:0px solid red;
padding-left: 20px;
padding-right: 20px;
}
#RESPUESTA SELECT {
width: 100%;
}
#RESPUESTALIBRE {
_display: flex !important;
text-align: left;
}
#RESPUESTALIBRE INPUT {
margin-top:10px;
width:100%;
}
#RESPUESTALIBRE TEXTAREA {
margin-top:10px;
width:100%;
height:75px;
}
#BOTONES {
white-space: nowrap;
text-align:center;
vertical-align: bottom;
border:0px solid orange;
}
#STATUS {
border:0px solid yellow;
text-align:center;
}
#PIE {
border:0px solid purple;
}
.cNOWRAP {
white-space: nowrap;
}
#winREJILLA {
display:table;
position:absolute;
left:0px;
top:0px;
}
#REJILLA {
background-color:#dddddd;
border: 1px;
}
#REJILLA TH {
background-color:#f8f8f8;
width:200px;
margin:0px;
padding:0px;
vertical-align:top;
text-align: justify;
}
#REJILLA>TBODY>TR>TD {
background-color:#ffffff;
width:200px;
margin:0px;
padding:0px;
vertical-align:top;
text-align:center;
}
#REJILLA TEXTAREA {
width:100%;
height:100%;
border-width: 0px;
background-color: transparent;
margin:0px;
padding:0px;
border-radius:0px;
}
-BODY {
-background-image: linear-gradient(red, yellow);
-background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
-background-image: linear-gradient(to right, rgba(0,0,0), rgba(255,255,255));
-background-image: linear-gradient("#ffffff", "#000000");
}
.RangeLabel span{
padding-top: 6px;
padding-bottom: 0px;
contain: layout;
}
.RangeLabel span::after{
top: -2px !important;
padding-top: 6px;
left: 12px;
padding-bottom: 0px;
}
.OFFIMG {
opacity:0.2;
filter:alpha(opacity:20);
cursor:default;
}
#ENCUESTADIRECTA {
display:inline-block;
border:1px solid #cccc;
}
</STYLE>
<SCRIPT type="text/javascript">
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
function Espejo(){}
function _SubSelectFill2(o, d){
var tmp = o.split(','), n, v = '';
for( n=0; n<tmp.length; n++ ) v += ""+S(":"+tmp[n]).val();
var o = DGI(d+'_TABLE'), t = o.rows.length;
S(":"+d).val('',false);
for( n=0; n<t; n++ ) o.deleteRow(0);
if( v!='' ){
var m=eval('__'+d+'["'+v+'"]'), TR, c, tc;
if(m==undefined ) return;
t = m.length;
tc = m[0].length;
TR = o.insertRow();
TR.insertCell().textContent = '';
for(c=1; c<tc; c++) TR.insertCell().innerHTML = '&nbsp;';
if( DGI('_INPUT_'+d).ADDOPTION!=undefined ){
var tmp = DGI('_INPUT_'+d).ADDOPTION.split(';'), tmp2;
for( c=0; c<tmp.length; c++ ){
tmp2 = tmp[c].split(',');
TR = o.insertRow();
for( n=0; n<tmp2.length; n++ ) TR.insertCell().textContent = tmp2[n];
}
}
for( n=0; n<t; n++ ){
TR = o.insertRow();
for( c=0; c<tc; c++ ) TR.insertCell().textContent = m[n][c];
}
}
DGI('_INPUT_'+d).style.backgroundColor = '';
o.style.display = "table";
}
function _SubSelectFill(o,d){
DGI('_INPUT_'+d).style.backgroundColor = '#cccccc';
setTimeout(function(){ _SubSelectFill2(o,d); },100);
}
function AuxFiltro(txt, NomFile){
if( _SSMemory[NomFile]!=undefined ){
_SubSelectFill(txt, NomFile);
}
}
var _VistaPrevia = <?=(($_GET["_VISTAPREVIA"]==1 || $_GET["_QUESTIONMEM"]==1)? "true":"false")?>,
_RespuestasMin, _RespuestasMax, _RespuestasLibre, _Dim=[], _Segundos=0,
_MapaDim=[], _MapaPregunta=0,
_PruebaCabecera = false, _UltimaPregunta=false,
_DimPregunta=[], _nPregunta=-1;
function eFor(id){
var o = S("#"+id).obj;
if( o.type=="checkbox" ){
o.checked = !o.checked;
}else{
o.checked = true;
if( _tf_jump_auto ) Siguiente();
}
}
function JumpChecbox(){
if( _tf_jump_auto && S("input[type=checkbox]:checked").length==_RespuestasMax ) Siguiente();
}
function JumpOculta(){
var n=0;
S("INPUT[name^=hueco_respuesta_]").each(function(k,o){
if( S.trim(o.value)!="" ) n++;
});
if( _tf_jump_auto && _RespuestasMax==n ) Siguiente();
}
function JumpRejilla(){
var res=[0], total=0, n, ok=true;
if( !_tf_jump_auto ) return;
switch(_Dim["rejilla_tipo"][0]){
case "R":
S("INPUT[name^=respuesta_]").each(function(k,o){
if( o.checked ){
n = S.right(o.name,"_");
if( res[n]==undefined ) res[n] = 0;
res[n]++;
total++;
}
});
if( _Dim["rejilla_tipo"]=="RR" ){
Siguiente();
}else{
if( _Dim["rejilla_tipo"]=="RC" ){
for(n=1; n<=_Dim["rejilla_col"]; n++) if( res[n]==undefined || res[n]!=1 ) ok = false;
}else if( _Dim["rejilla_tipo"]=="RF" ){
for(n=1; n<=_Dim["rejilla_row"]; n++) if( res[n]==undefined || res[n]!=1 ) ok = false;
}
if( ok ) Siguiente();
}
break;
case "C":
S("INPUT[name^=respuesta_]").each(function(k,o){
if( o.checked ){
if( _Dim["rejilla_tipo"]=="CC" ){
n = S.right(o.name,"_");
}else if( _Dim["rejilla_tipo"]=="CF" ){
n = S.mid(o.name,"_","_");
}
if( res[n]==undefined ) res[n] = 0;
res[n]++;
total++;
}
});
if( _Dim["rejilla_tipo"]=="CR" ){
if( _Dim["rejilla_max"]>0 && total==_Dim["rejilla_max"] ) Siguiente();
}else{
if( _Dim["rejilla_tipo"]=="CC" ){
for(n=1; n<=_Dim["rejilla_col"]; n++) if( res[n]==undefined || res[n]<_Dim["rejilla_col_max"] ) ok = false;
}else if( _Dim["rejilla_tipo"]=="CF" ){
for(n=1; n<=_Dim["rejilla_row"]; n++) if( res[n]==undefined || res[n]<_Dim["rejilla_row_max"] ) ok = false;
}
if( ok ) Siguiente();
}
break;
case "M":
S("SELECT[name^=respuesta_]").each(function(k,o){
if( S.trim(o.value)!="" ){
if( _Dim["rejilla_tipo"]=="MC" ){
n = S.right(o.name,"_");
}else if( _Dim["rejilla_tipo"]=="MF" ){
n = S.mid(o.name,"_","_");
}
if( res[n]==undefined ) res[n] = 0;
res[n]++;
total++;
}
});
if( _Dim["rejilla_tipo"]=="MR" ){
if( _Dim["rejilla_max"]>0 && total==_Dim["rejilla_max"] ) Siguiente();
}else{
if( _Dim["rejilla_tipo"]=="MC" ){
for(n=1; n<=_Dim["rejilla_col"]; n++) if( res[n]==undefined || res[n]<_Dim["rejilla_col_max"] ) ok = false;
}else if( _Dim["rejilla_tipo"]=="MF" ){
for(n=1; n<=_Dim["rejilla_row"]; n++) if( res[n]==undefined || res[n]<_Dim["rejilla_row_max"] ) ok = false;
}
if( ok ) Siguiente();
}
break;
}
}
function Ranking(o){
var oTD = S.toTag(o, "TABLE").rows[0].cells, n;
for(n=0; n<oTD.length; n++){
S(oTD[n]).css("background-color:#d6eaef; color:#2b5c5f;");
}
S(":valor_question").obj.value = o.cellIndex;
for(n=0; n<=o.cellIndex; n++){
S(oTD[n]).css("background-color:red; color:#ffffff;");
}
if( _tf_jump_auto ) Siguiente();
}
function Valoracion(o){
var oTD = S.toTag(o, "TABLE").rows[1].cells, n,
cIni = _Dim["ranking_color_ini"], cEnd = _Dim["ranking_color_end"];
for(n=0; n<oTD.length; n++){
if( oTD[n].children[0].tagName=="I" ){
if( cIni=="" && cEnd=="" ){
S(oTD[n].children[0]).css("color:#aaaaaa; text-shadow:;");
}else{
if( cIni=="" || cEnd=="" || cIni==cEnd ){
S(oTD[n].children[0]).css("color:#aaaaaa; text-shadow:;");
}else{
S(oTD[n].children[0]).css("color:#aaaaaa; background:; -webkit-background-clip:; -webkit-text-fill-color:; text-shadow:;");
}
}
}
if( oTD[n].children[0].tagName=="IMG" ) S(oTD[n].children[0]).class("=OFFIMG");
}
S(":valor_question").obj.value = o.cellIndex;
for(n=0; n<=o.cellIndex; n++){
if( oTD[n].children[0].tagName=="I" ){
if( cIni=="" && cEnd=="" ){
S(oTD[n].children[0]).css("color:#ffbf00; text-shadow:1px 1px 4px #a56b37;");
}else{
if( cIni=="" || cEnd=="" || cIni==cEnd ){
if( cIni=="" ) cIni = cEnd;
else if( cEnd=="" ) cEnd = cIni;
S(oTD[n].children[0]).css("color:"+cIni+"; text-shadow:1px 1px 4px #acacac;");
}else{
S(oTD[n].children[0]).css("color:; background:linear-gradient(to right, "+cIni+" 0%, "+cEnd+" 100%); background:-webkit-linear-gradient("+cIni+", "+cEnd+"); -webkit-background-clip:text; -webkit-text-fill-color:transparent; text-shadow:;");
}
}
}
if( oTD[n].children[0].tagName=="IMG" ) S(oTD[n].children[0]).class("-OFFIMG");
}
if( _tf_jump_auto ) Siguiente();
}
function AlinearImagen(type, src, txt){
if( src!="" ){
switch(type){
case "LF":
txt = '<img id="" src="poll/'+src+'" style="float:left; margin-right:10px; margin-bottom:5px;">'+txt;
break;
case "RF":
txt = '<img id="" src="poll/'+src+'" style="float:right; margin-left:10px; margin-bottom:5px;">'+txt;
break;
case "U":
txt = '<center><img id="" src="poll/'+src+'" style="margin-bottom:3px;"></center>'+txt;
break;
case "D":
txt += '<center><img id="" src="poll/'+src+'" style="margin-top:3px;"></center>';
break;
case "L":
txt = '<table><tr><td><img id="" src="poll/'+src+'" style="margin-right:3px;"><td style="text-align:justify">'+txt+'</table>';
break;
case "R":
txt = '<table><tr><td style="text-align:justify">'+txt+'<td><img id="" src="poll/'+src+'" style="margin-left:3px;"></table>';
break;
}
}
return txt;
}
function SiguienteArea(ev){
var rect = S("#IMAGENMAPA").obj.getBoundingClientRect(),
x = ev.clientX - rect.left,
y = ev.clientY - rect.top;
_MapaDim[_MapaPregunta][2] = x+"~"+y;
if( _MapaPregunta<_MapaDim.length-1 ){
_MapaPregunta++;
S("#nPreguntaMapa").text(_MapaPregunta+1);
S("#PreguntaMapa").text(_MapaDim[_MapaPregunta][1]);
}else{
_MapaPregunta++;
S(S.toTag(S("#PreguntaMapa").obj, "DIV")).hidden();
S("#bSIGUIENTE").obj.disabled = false;
if( _tf_jump_auto ) Siguiente();
}
}
function OrdenAleatorio(aleatorio, dimRes, entreRespuestas){
var t, n, ok=true, txt="";
if( entreRespuestas==undefined ) entreRespuestas = "";
if( aleatorio=="S" ){
t = dimRes.length;
while( ok ){
n = Math.floor((Math.random()*t)+1)-1;
if( dimRes[n]!=null ){
if( txt!="" ) txt += entreRespuestas;
txt += dimRes[n];
dimRes[n] = null;
}else{
ok = false;
for(n=0; n<dimRes.length; n++){
if( dimRes[n]!=null ) ok = true;
}
}
}
}else{
for(n=0; n<dimRes.length; n++){
if( txt!="" ) txt += entreRespuestas;
txt += dimRes[n];
}
}
return txt;
}
function replaceVar(d){
var txt=S("#RESPUESTA").html(), i;
for(i in d){
txt = S.replace(txt, i, d[i]);
}
S("#RESPUESTA").html(txt);
}
function VerEncuesta(txt){
var dim = S.json(txt),
txt = "", n, i, campo, indice, tmp, tmp2, dimRes=[], t, ok=true,
nRespuesta = 1;
_Dim = dim;
campo = "respuesta_"+nRespuesta;
_RespuestasMin = dim["respuestas_min"]*1;
_RespuestasMax = dim["respuestas_max"]*1;
_RespuestasLibre = (dim["respuestas_libre"]!="");
_Segundos = S.date("u");
switch(dim["respuesta_type"]){
case "R":
_RespuestasMin = 0;
_RespuestasMax = 1;
if( dim["respuesta_obligatoria"]=="S" ) _RespuestasMin = 1;
txt = "<table>";
for(n=1; n<99; n++){
indice = "respuesta_"+n+"_fld";
if( dim[indice]==undefined ) break;
if( dim[indice]!="" ){
tmp = "<tr>";
if( dim["respuesta_"+n+"_img"]!="" && dim["respuesta_conimg"]=="S" ){
tmp += "<td>";
tmp += '<img id="respuesta_'+n+'_img" src="poll/'+dim["respuesta_"+n+"_img"]+'" style="float:left; margin-right:10px; margin-bottom:5px;" onclick=eFor("respuesta_'+nRespuesta+'")>';
}
tmp += "<td><input type=radio name='respuesta' id='respuesta_"+nRespuesta+"' eJump='"+dim["respuesta_"+n+"_jump"]+"' onchange='if(_tf_jump_auto)Siguiente()'><td><label for='respuesta_"+nRespuesta+"'>"+dim[indice]+"</label>";
nRespuesta++;
dimRes.push(tmp);
}
}
txt += OrdenAleatorio(dim["respuesta_aleatoria"], dimRes);
txt += "</table>";
break;
case "B":
nRespuesta = 0;
txt = "<table style='width:100%;display:table;'>";
for(n=1; n<99; n++){
indice = "pregunta_"+n;
if( dim[indice]==undefined ) break;
if( dim[indice]!="" ){
txt += "<tr><td width=1px>"+S.replace(dim[indice]," ","&nbsp;")+"<td> <input name='pregunta_"+n+"' style='width:100%'>";
nRespuesta++;
}
}
txt += "</table>";
_RespuestasMin = 0;
_RespuestasMax = 0;
if( dim["respuesta_obligatoria"]=="S" ){
_RespuestasMin = nRespuesta;
_RespuestasMax = nRespuesta;
}
break;
case "C":
txt = "<table>";
for(n=1; n<99; n++){
indice = "respuesta_"+n+"_fld";
if( dim[indice]==undefined ) break;
if( dim[indice]!="" ){
tmp = "<tr>";
if( dim["respuesta_"+n+"_img"]!="" && dim["respuesta_conimg"]=="S" ){
tmp += "<td>";
tmp += '<img id="respuesta_'+n+'_img" src="poll/'+dim["respuesta_"+n+"_img"]+'" style="float:left; margin-right:10px; margin-bottom:5px;" onclick=eFor("respuesta_'+nRespuesta+'")>';
}
tmp += "<td><input type=checkbox name='respuesta_"+nRespuesta+"' id='respuesta_"+nRespuesta+"' eJump='"+dim["respuesta_"+n+"_jump"]+"' onchange='JumpChecbox()'><td><label for='respuesta_"+nRespuesta+"'>"+dim[indice]+"</label>";
nRespuesta++;
dimRes.push(tmp);
}
}
txt += OrdenAleatorio(dim["respuesta_aleatoria"], dimRes);
txt += "</table>";
if( _RespuestasMax==0 ) _RespuestasMax = nRespuesta-1;
break;
case "M":
_RespuestasMin = 0;
_RespuestasMax = 1;
if( dim["respuesta_obligatoria"]=="S" ) _RespuestasMin = 1;
txt = "<input name='"+campo+"' i_ss='1' value='' style='display:none' alto='1' size='30' td='0'>";
txt += '<span class="SELECTINPUT" onclick="S.key(&quot;S&quot;)">';
txt += '<input name="_INPUT_'+campo+'" ind="-1" tmpind="-1" pp="1" eRelationList="" onfocus="S.key(\'S\')" class="EDITABLE" ewe="1" style="width:98%;" type="TEXT" value="" ehelpno="1" eselectrows="11">';
txt += '</span>';
txt += '<div class="SELECT EDITABLE SCROLLBAR" style="display:none; width:89%;">';
txt += '<table id="'+campo+'_TABLE" cols="2" style="display:table">';
txt += '<colgroup><col><col></colgroup>';
txt += '<tbody>';
txt += '<tr v="" r="0" class=""><td></td><td>&nbsp;</td></tr>';
for(n=1; n<99; n++){
indice = "respuesta_"+n+"_fld";
if( dim[indice]==undefined ) break;
if( dim[indice]!="" ){
tmp = '<tr v="" r="'+(n+1)+'" class=""><td>'+dim["respuesta_"+n+"_jump"]+'</td><td>'+dim[indice]+'</td></tr>';
nRespuesta++;
dimRes.push(tmp);
}
}
txt += OrdenAleatorio(dim["respuesta_aleatoria"], dimRes);
txt += '</tbody>';
txt += '</table>';
txt += '</div>';
break;
case "MM":
_RespuestasMax = ((dim["respuesta_obligatoria"]=="S")?1:0);
var tmp3, ultimo, esMultiMenu=false, RelationList="", numMenus=0, cabecera=[], menus=[];
txt = "";
tmp2 = dim["menu_extendido"].split("\n");
tmp = [];
for(n=0; n<tmp2.length; n++){
tmp2[n] = S.trim(tmp2[n]);
if( tmp2[n]!="" ) tmp.push(tmp2[n]);
}
numMenus = S.count(",", tmp[0])+1;
if( numMenus>1 ){
esMultiMenu = true;
tmp2 = tmp;
tmp = [];
cabecera = tmp2[0].split(",");
menus.push(tmp2[1].split(","));
ultimo = S.trim(menus[0][0]);
tmp[0] = ultimo;
for(n=2; n<tmp2.length; n++){
menus.push(tmp2[n].split(","));
tmp3 = S.trim(tmp2[n].split(",")[0]);
if( ultimo!=tmp3 ){
ultimo = tmp3;
tmp.push(tmp3);
}
}
if( dim["respuesta_obligatoria"]=="S" ){
_RespuestasMin = numMenus;
_RespuestasMax = numMenus;
}
for(i=0; i<menus.length; i++) for(n=0; n<menus[i].length; n++) menus[i][n] = S.trim(menus[i][n]);
var indice="", p, q=2, f;
for(q=2; q<=numMenus; q++){
window["__menu_"+q] = new Array();
for(p=0; p<menus.length; p++){
for(i=1; i<menus[0].length; i++){
indice = "";
for(n=0; n<i; n++) indice += ""+menus[p][n];
if( typeof(window["__menu_"+q])[indice]=="undefined" ) window["__menu_"+q][indice] = new Array();
ok = true;
if( window["__menu_"+q][indice].length>0 ){
for(f=0; f<window["__menu_"+q][indice].length; f++){
if( window["__menu_"+q][indice][f][0]==menus[p][i] ){
ok = false;
break;
}
}
}
if( ok ){
window["__menu_"+q][indice].push([menus[p][i], menus[p][i]]);
}
}
}
}
_SSMemory = [];
for(n=1; n<=numMenus; n++){
if( RelationList!="" ) RelationList += ",";
RelationList += "menu_"+n;
if( n>1 ){
_SSMemory['menu_'+n] = true;
}
}
txt += "<table style='display:table;width:100%'><tr><td width='1px'>"+S.trim(cabecera[0])+"</td><td>";
}
txt += "<input name='menu_1' i_ss='1' value='' style='display:none' alto='1' size='30' td='0'>";
txt += '<span class="SELECTINPUT" onclick="S.key(&quot;S&quot;)">';
txt += '<input name="_INPUT_menu_1" IND="-1" TMPIND="-1" pp="1" onchange="S.relationReset(this,window,event);" eRelationList="'+RelationList+'" onfocus="S.key(\'S\')" class="EDITABLE" ewe="1" style="width:98%;" type="TEXT" value="" ehelpno="1" eselectrows="11">';
txt += '</span>';
txt += '<div class="SELECT EDITABLE SCROLLBAR" style="display:none; width:89%;">';
txt += '<table id="menu_1_TABLE" cols="2" style="display:table">';
txt += '<colgroup><col><col></colgroup>';
txt += '<tbody>';
txt += '<tr v="" r="0" class=""><td></td><td>&nbsp;</td></tr>';
for(n=0; n<tmp.length; n++){
txt += '<tr v="" r="'+(n+1)+'" class=""><td>'+tmp[n]+'</td><td>'+tmp[n]+'</td></tr>';
}
txt += '</tbody>';
txt += '</table>';
txt += '</div>';
if( numMenus>1 ){
txt += "</td></tr>";
for(n=2; n<=numMenus; n++){
txt += "<tr><td width='1px'>"+cabecera[n-1]+"</td><td>";
txt += "<input name='menu_"+n+"' i_ss='1' value='' style='display:none' alto='1' size='30' td='0'>";
txt += '<span class="SELECTINPUT" onclick="S.key(&quot;S&quot;)">';
txt += '<input name="_INPUT_menu_'+n+'" IND="-1" TMPIND="-1" pp="1" onchange="S.relationReset(this,window,event);" eRelationList="'+RelationList+'" onfocus="S.key(\'S\')" class="EDITABLE" ewe="1" style="width:98%;" type="TEXT" value="" ehelpno="1" eselectrows="11">';
txt += '</span>';
txt += '<div class="SELECT EDITABLE SCROLLBAR" style="display:none; width:89%;">';
txt += '<table id="menu_'+n+'_TABLE" cols="2" style="display:table">';
txt += '<colgroup><col><col></colgroup>';
txt += '<tbody>';
txt += '<tr v="" r="0" class=""><td></td><td>&nbsp;</td></tr>';
txt += '</tbody>';
txt += '</table>';
txt += '</div>';
txt += "</td></tr>";
}
txt += "</table>";
}
break;
case "K":
txt = "<table width='100%' style='display:table; border-collapse:collapse; border:0px solid red'>";
txt += "<tr><th id='ANCHODIV' width=50% align=center style='border-right:1px solid #dddddd; border-bottom:1px solid #dddddd;'>Lista desordenada</th><th width=50% align=center style='border-bottom:1px solid #dddddd;'>Lista ordenada</th></tr>";
txt += "<tr><td id='FIJARALTO' width=50% style='vertical-align:top; border-right:1px solid #dddddd;'>";
for(n=1; n<99; n++){
indice = "respuesta_"+n+"_fld";
if( dim[indice]==undefined ) break;
if( dim[indice]!="" ){
tmp = "<div eJump='"+dim["respuesta_"+n+"_jump"]+"' style='background-color:#f0f8ff; border:1px solid #dddddd; display:inline-block; padding-left:10px; padding-right:10px; margin:3px 0px 3px 0px; cursor:move'>";
if( dim["respuesta_"+n+"_img"]!="" && dim["respuesta_conimg"]=="S" ){
tmp += '<img id="respuesta_'+n+'_img" src="poll/'+dim["respuesta_"+n+"_img"]+'" style="float:left; margin-right:10px; margin-bottom:5px;">';
}
tmp += dim[indice];
tmp += "</div>";
dimRes.push(tmp);
}
}
txt += OrdenAleatorio(dim["respuesta_aleatoria"], dimRes);
txt += "</td><td width=50% id='AQUII' style='vertical-align:top;'></td></tr></table>";
break;
case "V":
_RespuestasMin = 0;
_RespuestasMax = 1;
if( dim["respuesta_obligatoria"]=="S" ) _RespuestasMin = 1;
var icono = "";
if( dim["respuesta_conimg"]=="S" && dim["ranking_img"]!="" ){
icono = '<img id="" src="poll/'+dim["ranking_img"]+'" class="OFFIMG"{JUMP}>';
}else{
switch(dim["ranking_forma"]){
case "E":
icono = "<i class='ICONINPUT' style='color:#aaaaaa'{JUMP}>Z</i>";
break;
case "C":
icono = "<i class='ICONINPUT' style='color:#aaaaaa'{JUMP}>*</i>";
break;
case "O":
icono = "<img id='' src='poll/ok_2.png' class='OFFIMG'{JUMP}>";
break;
case "N":
break;
case "B":
break;
}
}
txt = "<table><tr>";
for(n=1; n<=dim["ranking"]; n++){
indice = "ranking_"+n;
txt += "<td align=center>"+dim[indice];
}
txt += "<tr id='COLSIGUALES'>";
for(n=1; n<=dim["ranking"]; n++){
txt += "<td align=center onclick='Valoracion(this)'>";
if( dim["ranking_"+n+"_jump"]>0 ){
txt += icono.replace("{JUMP}", " eJump='"+dim["ranking_"+n+"_jump"]+"'");
}else{
txt += icono.replace("{JUMP}", "");
}
}
txt += "</table>";
txt += "<td><input name='valor_question' id='valor_question' style='display:none'>";
break;
case "P":
_RespuestasMin = 0;
_RespuestasMax = 1;
if( dim["respuesta_obligatoria"]=="S" ) _RespuestasMin = 1;
txt = "<span>";
txt += "<table width='100%'><tr><td class='cNOWRAP'>"+dim["valoracion_1"];
txt += "<td style='width:100%'>";
txt += "<td class='cNOWRAP'>"+dim["valoracion_2"]+"</table>";
txt += "<table style='background-color:#d6eaef;color:#2b5c5f;'><tr>";
for(n=0; n<=10; n++){
txt += "<td onclick='Ranking(this)' width='70px' style='text-align:center;border:1px solid #4f9196'";
if( n==0  && dim["valoracion_1_jump"]>0 ) txt += " eJump='"+dim["valoracion_1_jump"]+"'";
if( n==10 && dim["valoracion_2_jump"]>0 ) txt += " eJump='"+dim["valoracion_2_jump"]+"'";
txt += ">"+n;
}
txt += "</table>";
txt += "<span>";
txt += "<td><input name='valor_question' id='valor_question' style='display:none'>";
break;
case "X":
txt = "<table width='100%' style='display:table; border-collapse:collapse; border:0px solid red'><tr>";
txt += "<td id='UNIR_ORIGEN' style='width:50%;border:0px solid red;vertical-align:top;'>";
for(n=1; n<99; n++){
indice = "unir_pregunta_"+n;
if( dim[indice]==undefined ) break;
if( dim[indice]!="" ){
tmp = "<div style='background-color:#f0f8ff; border:1px solid #dddddd; display:inline-block; width:90%; padding-left:10px; padding-right:10px; margin:3px 0px 3px 0px; cursor:move'>";
if( dim["unir_"+n+"_img"]!="" && dim["respuesta_conimg"]=="S" ){
tmp += '<img id="unir_'+n+'_img" src="poll/'+dim["unir_"+n+"_img"]+'" style="float:left; margin-right:10px; margin-bottom:5px;">';
}
tmp += dim[indice];
tmp += "</div>";
dimRes.push(tmp);
}
}
if( _RespuestasMax==0 ) _RespuestasMax = dimRes.length;
txt += OrdenAleatorio(dim["respuesta_aleatoria"], dimRes);
dimRes = [];
txt += "<td style='border:0px solid blue;width:50%;'>";
txt += "<table id='ASOCIACIONES' border=0 style='width:100%;display:table'>";
for(n=1; n<99; n++){
indice = "unir_respuesta_"+n;
if( dim[indice]==undefined ) break;
if( dim[indice]!="" ){
tmp = "<tr><td style='background-color:#fcfcfc; border:1px solid #dddddd;' id='UNIR_PREGUNTA'>";
tmp += dim[indice];
tmp += "<tr><td style='background-color:#f0f8ff; border:1px solid #dddddd;' id='UNIR_DESTINO'>";
dimRes.push(tmp);
}
}
txt += OrdenAleatorio(dim["respuesta_aleatoria"], dimRes);
txt += "</table></table>";
break;
case "S":
_RespuestasMin = 0;
_RespuestasMax = 1;
if( dim["respuesta_obligatoria"]=="S" ) _RespuestasMin = 1;
var long = (dim["slide_max"]+"").length;
dim["slide_min"] *= 1;
dim["slide_max"] *= 1;
txt += "<table style='display:table'><tr><td>";
txt += "<table style='display:table'><tr>";
txt += "<td width='33%' style='text-align:left'>"+dim["slide_1"]+"<td width='33%' style='text-align:center'>"+dim["slide_2"]+"<td width='33%' style='text-align:right'>"+dim["slide_3"];
txt += "<tr><td colspan=3>"
txt += '<span class="RangeLabel">';
if( dim["slide_type"]!="S" ){
txt += '<span></span>';
}
txt += '<input name="range_1" id="range_1" type="range" eEmpty=1 tc="+" min="'+dim["slide_min"]+'" value="" max="'+dim["slide_max"]+'" step="'+dim["slide_step"]+'" autocomplete="off" style="width:450px" eUpdate="">';
txt += "</span></table><td valign=bottom>";
if( dim["slide_type"]=="S" ){
txt += '<input name="_range_1" type="text" min="'+dim["slide_min"]+'" value="" max="'+dim["slide_max"]+'" step="'+dim["slide_step"]+'" size="'+long+'" maxlength="'+long+'" dcm="0" onfocus=S.key("+",'+long+',0) tc="+" onchange="S(this).range(this.value)" style="text-align:right;width:23px">';
}
txt += "</table>";
break;
case "L":
case "FE":
S.callSrv("edes.php?E:CallSrv=/_datos/config/poll.edf&END=1&poll="+_Dim["cd_gs_poll"]+"&campaing="+_cd_gs_campaign, window);
txt = dim["pagina_texto"];
if( dim["pagina_img_type"]!="" && dim["pagina_img"]!="" ){
switch(dim["pagina_img_type"]){
case "LF":
txt = '<img id="pagina_img" src="poll/'+dim["pagina_img"]+'" style="cursor:default; float:left; margin-right:10px; margin-bottom:5px;">'+txt;
break;
case "RF":
txt = '<img id="pagina_img" src="poll/'+dim["pagina_img"]+'" style="cursor:default; float:right; margin-left:10px; margin-bottom:5px;">'+txt;
break;
case "U":
txt = '<center><img id="pagina_img" src="poll/'+dim["pagina_img"]+'" style="cursor:default; margin-bottom:3px;"></center>'+txt;
break;
case "D":
txt += '<center><img id="pagina_img" src="poll/'+dim["pagina_img"]+'" style="cursor:default; margin-top:3px;"></center>';
break;
case "L":
txt = '<table><tr><td><img id="pagina_img" src="poll/'+dim["pagina_img"]+'" style="cursor:default; margin-right:3px;"><td style="text-align:justify">'+txt+'</table>';
break;
case "R":
txt = '<table><tr><td style="text-align:justify">'+txt+'<td><img id="pagina_img" src="poll/'+dim["pagina_img"]+'" style="cursor:default; margin-left:3px;"></table>';
break;
}
}
break;
case "T":
_RespuestasMin = 0;
_RespuestasMax = 1;
if( dim["respuesta_obligatoria"]=="S" ) _RespuestasMin = 1;
txt = "<input type=text style='width:97%'>";
break;
case "A":
_RespuestasMin = 0;
_RespuestasMax = 1;
if( dim["respuesta_obligatoria"]=="S" ) _RespuestasMin = 1;
txt = "<textarea rows='10' cols='60' style='width:97%'></textarea>";
break;
case "F":
_RespuestasMin = 0;
_RespuestasMax = 1;
if( dim["respuesta_obligatoria"]=="S" ) _RespuestasMin = 1;
txt  = "<input name='fichero' type=file style='width:97%'>";
txt += "<input name='cd_gs_poll' value='"+_Dim["cd_gs_poll"]+"' style='display:none'>";
txt += "<input name='cd_gs_campaign' value='"+_cd_gs_campaign+"' style='display:none'>";
txt += "<input name='cd_gs_question' value='' style='display:none'>";
txt += "<input name='cd_gs_reply_user' value='<?=$_SESSION["_User"]?>' style='display:none'>";
txt += "<input name='segundos' value='0' style='display:none'>";
break;
case "D":
_RespuestasMin = 0;
_RespuestasMax = 1;
if( dim["respuesta_obligatoria"]=="S" ) _RespuestasMin = 1;
txt = '<input name="fecha" value="" class="EDITABLE FondoSelect" ewe="1" leng="10" maxlength="10" size="10" onfocus=S.key("F4",10,0) tc="F4" style="width:72px;"><i class="ICONINPUT" onclick="S(&quot;:fecha&quot;).calendar()" oncontextmenu="S(&quot;:fecha&quot;).calendar(&quot;t&quot;)" id="TOOLSDate">,</i>';
break;
case "H":
_RespuestasMin = 0;
_RespuestasMax = 1;
if( dim["respuesta_obligatoria"]=="S" ) _RespuestasMin = 1;
txt = '<input name="hora" value="" class="EDITABLE FondoSelect" ewe="1" leng="2" maxlength="2" size="2" onfocus=S.key("H2",2,0) tc="H2" style="width:17px;" ehelpno="1">';
break;
case "DH":
txt = '<input name="fecha" value="" class="EDITABLE FondoSelect" ewe="1" leng="10" maxlength="10" size="10" onfocus=S.key("F4",10,0) tc="F4" style="width:72px;"><i class="ICONINPUT" onclick="S(&quot;:fecha&quot;).calendar()" oncontextmenu="S(&quot;:fecha&quot;).calendar(&quot;t&quot;)" id="TOOLSDate">,</i>';
txt += '&nbsp;<input name="hora" value="" class="EDITABLE FondoSelect" ewe="1" leng="2" maxlength="2" size="2" onfocus=S.key("H2",2,0) tc="H2" style="width:17px;" ehelpno="1">';
break;
case "U":
var dimContacto = {
user_nombre:"Nombre",
user_sexo:"Sexo",
user_edad:"Edad",
user_nacimiento:"Fecha nacimiento",
user_empresa:"Empresa",
user_direccion:"Dirección",
user_localidad:"Localidad",
user_provincia:"Provincia",
user_cpostal:"Código postal",
user_pais:"Pais",
user_email:"EMail",
user_telefono:"Teléfono"
}
txt = "<table style='width:100%;display:table;'>";
for(k in dim){
if( /^user_/.test(k) && dim[k]=="S" ){
txt += "<tr><td width=1px>"+S.replace(dimContacto[k]," ","&nbsp;")+"<td> <input name='"+k+"' style='width:100%'>";
}
}
txt += "</table>";
break;
case "J":
txt = EditRejilla(dim);
break;
case "O":
for(n=1; n<99; n++){
indice = "hueco_pregunta_"+n;
if( dim[indice]==undefined ) break;
if( dim[indice]!="" ){
tmp = "<p style='display:inline-block;'>";
if( dim["hueco_"+n+"_img"]!="" && dim["respuesta_conimg"]=="S" ){
tmp += '<img id="hueco_'+n+'_img" src="poll/'+dim["hueco_"+n+"_img"]+'" style="float:left; margin-right:10px; margin-bottom:5px;">';
}
tmp2 = dim["hueco_respuesta_"+n].split(";");
for(i=0; i<tmp2.length; i++){
campo = tmp2[i];
dim[indice] = S.replace(dim[indice], "{"+campo+"}", "<input onchange='JumpOculta()' name='hueco_respuesta_"+n+"' id='hueco_respuesta_"+n+"' size=12 style='color:blue; padding:0px !important; border:0px; border-bottom: 1px solid #dddddd; border-radius:0px; text-align:center;'>");
nRespuesta++;
}
tmp += dim[indice];
tmp += "</p>";
dimRes.push(tmp);
}
}
txt = OrdenAleatorio(dim["respuesta_aleatoria"], dimRes, "<br><br>");
if( _RespuestasMax==0 ) _RespuestasMax = nRespuesta-1;
break;
case "Z":
var n, tmp = dim["mapa_json"].split("~"), tmp2, i=0, t,ok=true;
_MapaPregunta = 0;
_MapaDim=[];
for(n=0; n<tmp.length; n++){
tmp2 = tmp[n].split("|");
if( tmp2[0]=="S" ) dimRes.push([tmp2[1], tmp2[2], ""]);
}
if( dim["respuesta_aleatoria"]=="S" ){
t = dimRes.length;
while( ok ){
n = Math.floor((Math.random()*t)+1)-1;
if( dimRes[n]!=null ){
_MapaDim.push(dimRes[n]);
dimRes[n] = null;
}else{
ok = false;
for(n=0; n<dimRes.length; n++){
if( dimRes[n]!=null ) ok = true;
}
}
}
}else{
_MapaDim = dimRes;
}
_RespuestasMin = 0;
_RespuestasMax = 1;
if( dim["respuesta_obligatoria"]=="S" ){
_RespuestasMin = _MapaDim.length;
_RespuestasMax = _RespuestasMin;
}
txt = '<img id="IMAGENMAPA" src="poll/'+dim["mapa_img"]+'" onclick="SiguienteArea(event)" style="cursor:crosshair"><br>';
txt += "<div style='width:100%;text-align:left'><span id='nPreguntaMapa'>1</span>/"+_MapaDim.length+" Haz click en: <span id='PreguntaMapa' style='font-weight:bold;'>"+_MapaDim[_MapaPregunta][1]+"</span></div>";
break;
}
var pregunta = S.replace(dim["pregunta"], [["{nombre}", "--NOMBREENCUESTADO--"], ["{apellidos}", "--APELLIDOSENCUESTADO--"]]);
if( dim["pregunta_img"]!="" ){
pregunta = '<img src="poll/'+dim["pregunta_img"]+'" style="float:left; margin-right:10px; margin-bottom:5px;">'+pregunta;
}
S("#PREGUNTA").html(pregunta);
S("#RESPUESTA").html(txt);
if( dim["respuestas_libre"]!="" ){
if( dim["respuestas_libre"]=="L" ){
S("#RESPUESTALIBRE").html("Otra respuesta<input style='width:98%'>").block();
}else{
S("#RESPUESTALIBRE").html("Otra respuesta<textarea style='width:98%' rows='5'></textarea>").block();
}
}else{
S("#RESPUESTALIBRE").none();
}
if( /^(T|A|F)$/.test(dim["respuesta_type"]) ){
S("#RESPUESTA").obj.style.width = S("#RESPUESTA").obj.parentNode.offsetWidth+"px";
}else if( dim["respuesta_type"]=="V" ){
var mAncho = 0;
S("#COLSIGUALES TD").each(function(k,o){
mAncho = Math.max(mAncho, o.offsetWidth);
});
S("#COLSIGUALES TD").each(function(k,o){
o.style.width = mAncho+"px";
});
}
if( S("#ANCHODIV").length ){
var mAncho = (S("#ANCHODIV").obj.offsetWidth-24-1)+"px";
S("#RESPUESTA DIV").each(function(k,o){
o.style.width = mAncho;
});
}
if( S("#FIJARALTO").length ) S("#FIJARALTO").css("height", S("#FIJARALTO").css("height"));
for(n in dim){
if( /_data$/.test(n) && dim[n]!="" && S("#"+n).length ){
S("#"+n).obj.src = dim[n];
}
}
if( dim["respuesta_type"]=="K" ){
S("#FIJARALTO DIV").drag("#AQUII", (_RespuestasMax==0)?null:_RespuestasMax, function(oContenedor, oMover){
var t = S("DIV", oContenedor).length+1;
if( S.is(oMover, S("DIV", oContenedor).dim) ){
}else if( _tf_jump_auto && _RespuestasMax==t ){
setTimeout(function(){Siguiente();}, 1);
}
return true;
});
}
if( dim["respuesta_type"]=="X" ){
S("#UNIR_ORIGEN DIV").drag("*[id='UNIR_DESTINO']", 1, function(oContenedor, oMover){
if( _RespuestasMax==0 ) return null;
n = 1;
S("#ASOCIACIONES #UNIR_DESTINO").each(function(k,o){
if( o.children.length && o.children[0]==oMover ){
n--;
return null;
}
});
S("#ASOCIACIONES #UNIR_DESTINO").each(function(k,o){
if( o.children.length ) n++;
});
if( _RespuestasMax<n ){
S.info("No hace falta mas respuestas",2);
return false;
}
if( _tf_jump_auto && _RespuestasMax==n ){
setTimeout(function(){Siguiente();}, 1);
}
return true;
});
n = S("#UNIR_PREGUNTA").css("height");
S("*[id='UNIR_DESTINO']").css("height",n);
}
if( dim["respuesta_type"]=="S" ){
S(':range_1').range();
}
if( dim["respuesta_type"]=="FE" ){
if( S("input[type=checkbox]").length ){
n = S(S("input[type=checkbox]").obj.parentNode).css("font-size");
n = n+"px !important;"
S(window).rule("input[type=checkbox]{"+"height:"+n+"width:"+n+"}");
}
S("#PREGUNTA").none();
S("#STATUS").hidden();
S("#bSIGUIENTE").val("Terminar");
_UltimaPregunta = true;
}else{
S("#PREGUNTA").block();
S("#STATUS").visible();
S("#bSIGUIENTE").val("Siguiente");
_UltimaPregunta = false;
}
if( dim["respuesta_type"]=="J" ){
S("#RESPUESTA").css("padding:0px");
}
if( dim["respuesta_type"]=="Z" ){
S("#RESPUESTA").css("text-align:center");
}else{
S("#RESPUESTA").css("text-align:left");
}
S("#bSIGUIENTE").obj.disabled = false;
S("#BOTONES").css("height:100%");
S("#RESPUESTA").css("height:1px");
}
function uQuitaFoco(win){
var o = S('<input autofocus>',win).nodeEnd("body");
setTimeout(function(){
o.obj.focus();
o.nodeRemove();
},1);
return false;
}
function EditRejilla(dim){
var tipo = dim["rejilla_tipo"],
col = dim["rejilla_col"],
row = dim["rejilla_row"],
tmp = dim["rejilla_contenido"], txt="", f,c,n,o,valor="",
cBak = S.ruleGet(window, "#TABHeader", "background-color"),
cColor = S.ruleGet(window, "#TABHeader", "color"),
nmCampo="";
if( tmp!="" ){
var filas = tmp.split("~R~"), cols=[];
for(f=0; f<=row; f++){
cols[f] = filas[f].split("~C~");
}
}
txt = "";
txt += "<table id='REJILLA'>";
for(f=0; f<=row; f++){
txt += "<tr>";
for(c=0; c<=col; c++){
if( cols[f][c]==undefined ) cols[f][c] = "";
if( f==0 && c==0 ){
txt += '<td style="background-color:'+S.ruleGet(window, "#REJILLA", "background-color")+'"></td>';
}else if( f==0 || c==0 ){
if( tmp!="" ) valor = S.replace(cols[f][c],"<br>","\n");
txt += '<th>';
txt += valor;
txt += '</th>';
}else{
switch(tipo[0]){
case "R":
if( tipo=="RC" ) nmCampo = "respuesta_"+c;
if( tipo=="RF" ) nmCampo = "respuesta_"+f;
if( tipo=="RR" ) nmCampo = "respuesta";
txt += '<td style="vertical-align:middle">';
txt += '<input name="'+nmCampo+'" id="respuesta_'+f+'_'+c+'" type="radio" onchange="JumpRejilla()">';
break;
case "C":
txt += '<td style="vertical-align:middle">';
txt += '<input name="respuesta_'+f+'_'+c+'" id="respuesta_'+f+'_'+c+'" type="checkbox" value="" onchange="JumpRejilla()">';
break;
case "M":
if( tmp!="" ) valor = S.replace(cols[f][c],"<br>","\n");
txt += '<td style="vertical-align:middle">';
tmp = valor.split("\n");
campo = "";
txt += '<select name="respuesta_'+f+'_'+c+'" id="respuesta_'+f+'_'+c+'" onchange="JumpRejilla()">';
txt += "<option value=''></option>";
for(n=0; n<tmp.length; n++){
if( S.trim(tmp[n])!="" ){
txt += "<option value='"+tmp[n]+"'>"+tmp[n]+"</option>";
}
}
txt += "</select>";
txt += '</td>';
break;
}
}
}
txt += "</tr>";
}
txt += "</table>";
return txt;
}
var wPadre=null, _colorIni, _colorEnd, _pRespuestaType, _tf_retroceder, _tf_save_answer, _tf_jump_auto,
_pJson, _pQuestion, _pOrden, oTR, _dimQuestion=[], _uQuestion=null, _tQuestion;
function Ini(){
if( top.eIsWindow(window) ) S.windowView(window);
<?PHP if( $_PSOURCE=='$a/poll/gs_question.edf' || $_PSOURCE=='$a/poll/gs_poll.edf' ){ ?>
if( S("#BROWSE", _WOPENER).length==1 ){
wPadre = _WOPENER;
}else if( _WOPENER._Source=="$a/poll/gs_poll.edf" ){
wPadre = _WOPENER;
_PruebaCabecera = true;
}else if( S("#BROWSE", _WOPENER._WOPENER).length==1 ){
wPadre = _WOPENER._WOPENER;
}
<?PHP }else{ ?>
wPadre = window;
if( top.eIsWindow(window) ){
S(window).windowResize(602,652,true);
}else{
S("body").css("overflow:auto");
S("#ENCUESTADIRECTA").css("margin-left:"+(S("body").obj.clientWidth-S("#ENCUESTADIRECTA").css("width"))/2);
S("#ENCUESTADIRECTA").css("margin-top:"+(S("body").obj.clientHeight-S("#ENCUESTADIRECTA").css("height"))/2);
}
<?PHP } ?>
if( _PruebaCabecera ){
_colorIni = S(":color_ini", wPadre).val();
_colorEnd = S(":color_end", wPadre).val();
}else if( wPadre!=null ){
_colorIni = S(":_color_ini", wPadre).val();
_colorEnd = S(":_color_end", wPadre).val();
_tf_retroceder = S(":_tf_retroceder", wPadre).val();
_tf_save_answer = S(":_tf_save_answer", wPadre).val();
_tf_jump_auto = S(":_tf_jump_auto", wPadre).val();
_pRespuestaType = S("#BROWSE TH[campo='type']", wPadre).attr("nc");
}
if( S("#ENCUESTADIRECTA").exists() ){
var obj = S("#ENCUESTADIRECTA");
}else{
var obj = S("BODY");
}
if( S(":_image", wPadre).length && S(":_image", wPadre).val()!="" ){
obj.css("background-image", 'url("poll/'+S(":_image", wPadre).val()+'")');
}else if( _colorIni!="" && _colorEnd!="" ){
var color = "linear-gradient(rgb("+S.hex2rgb(_colorIni).join(",")+"), rgb("+S.hex2rgb(_colorEnd).join(",")+"))";
obj.css("background-image", color);
}else if( (_colorIni+_colorEnd)!="" ){
obj.css("background-color", _colorIni+_colorEnd);
}
if( _PruebaCabecera ){
if( S(":image", wPadre).val()!="" ){
S("BODY").css("background-image", 'url("poll/'+S(":image", wPadre).val()+'"');
}
var txt = "";
txt = AlinearImagen(S(":cabecera_img_type", wPadre).val(), S(":cabecera_img", wPadre).val(), S(":cabecera_texto", wPadre).val());
S("#CABECERA").html(txt);
txt = AlinearImagen(S(":pie_img_type", wPadre).val(), S(":pie_img", wPadre).val(), S(":pie_texto", wPadre).val());
S("#PIE").html(txt);
S("#BOTONES *").each(function(k,o){
o.disabled = true;
});
return;
}
<?PHP if( $_GET["_QUESTIONMEM"]==1 ){ ?>
<?PHP }else{ ?>
_pJson = S("#BROWSE TH[campo='json']", wPadre).attr("nc");
_pQuestion = S("#BROWSE TH[campo='cd_gs_question']", wPadre).attr("nc");
_pOrden = S("#BROWSE TH[campo='orden']", wPadre).attr("nc");
oTR = S("#BROWSE TR", wPadre).dim;
_dimQuestion = [];
_uQuestion = null;
_tQuestion = oTR.length;
<?PHP } ?>
Siguiente();
}
function Encuestar(np){
if( np>=_tQuestion ){
S.window(window);
return;
}
_DimPregunta[_nPregunta] = [np, 0];
_uQuestion = np*1;
S("#BOTONES").obj.children[0].style.visibility = np==1 ? "hidden":"visible";
if( <?=(($_PSOURCE!='$a/poll/gs_question.edf' && $_PSOURCE!='$a/poll/gs_poll.edf')? "true || ":"")?> oTR[np].offsetHeight>0 ){
VerEncuesta(oTR[np].cells[_pJson].innerHTML);
}else{
S("#PREGUNTA").html("<span style='color:red'>Pregunta borrada</span>");
S("#RESPUESTA, #RESPUESTALIBRE").html("");
}
S("#NUMPREGUNTA").text(oTR[np].cells[_pOrden].innerHTML);
_uQuestion = np*1;
_dimQuestion.push(np);
}
function Siguiente(){
if( _UltimaPregunta ){
if( S(":encuesta_por_email").length ){
}
S.window(window);
return;
}
if( _uQuestion!=null ){
var pkRespuesta = _Dim["cd_gs_poll"]+","+_Dim["cd_gs_question"],
nRespuesta = 0, xError="", dimRespuesta=[], xRespuesta="", n;
S("INPUT,TEXTAREA,SELECT", "#POLL").each(function(k,o){
if( o.type!="button" ){
if( o.type=="radio" || o.type=="checkbox" ){
if( o.checked ){
dimRespuesta.push([o, o.tagName]);
nRespuesta++;
}
}else{
if( o.value!="" ){
dimRespuesta.push([o, o.tagName]);
nRespuesta++;
}
}
}
});
switch(_Dim["respuesta_type"]){
case "K":
nRespuesta = S("#AQUII DIV").length;
S("#AQUII DIV").each(function(k,o){
if( xRespuesta!="" ) xRespuesta += "|";
xRespuesta += S.trim(o.innerText);
});
break;
case "X":
S("#ASOCIACIONES #UNIR_DESTINO").each(function(k,o){
if( o.children.length ){
nRespuesta++;
if( xRespuesta!="" ) xRespuesta += "|";
var i = S.toTag(o,"TR").rowIndex;
xRespuesta += S.trim(S.toTag(o,"TABLE").rows[i-1].cells[0].innerText)+"~"+S.trim(o.children[0].innerText);
}
});
break;
case "Z":
nRespuesta = _MapaPregunta;
for(n=0; n<_MapaDim.length; n++){
if( xRespuesta!="" ) xRespuesta += "|";
xRespuesta += _MapaDim[n][0]+"~"+_MapaDim[n][2];
}
break;
case "J":
switch(_Dim["rejilla_tipo"][0]){
case "R":
case "C":
S("INPUT[name^=respuesta_]").each(function(k,o){
if( o.checked ){
if( xRespuesta!="" ) xRespuesta += "|";
xRespuesta += S.replace(o.id,"respuesta_","","_",",");
}
});
break;
case "M":
S("SELECT[name^=respuesta_]").each(function(k,o){
if( o.value!="" ){
if( xRespuesta!="" ) xRespuesta += "|";
xRespuesta += S.replace(o.name,"respuesta_","","_",",")+"="+o.value;
}
});
}
break;
case "D":
case "H":
if( _Dim["respuesta_obligatoria"]=="S" && S("#RESPUESTA *").val()=="" ){
xError = 'Falta responder a la pregunta';
}
break;
case "DH":
if( _Dim["respuesta_obligatoria"]=="S" && (S(":fecha").val()=="" || S(":hora").val()=="") ){
xError = 'Falta responder a la pregunta';
break;
}
S([":fecha",":hora"]).each(function(k,o){
if( xRespuesta!="" ) xRespuesta += "|";
xRespuesta += o.value;
});
break;
case "L":
case "FE":
break;
case "F":
if( _Dim["respuesta_obligatoria"]=="S" && S(":fichero").val()=="" ){
xError = 'Falta responder a la pregunta';
break;
}
S(":segundos").val(parseInt((S.date("u")-_Segundos)/1000));
S(":cd_gs_question").val(_Dim["cd_gs_question"]);
break;
case "A":
case "T":
if( _Dim["respuesta_obligatoria"]=="S" && S("#RESPUESTA *").val()=="" ){
xError = 'Falta responder a la pregunta';
break;
}
case "U":
S(["#RESPUESTA INPUT", "#RESPUESTA TEXTAREA"]).each(function(k,o){
if( xRespuesta!="" ) xRespuesta += "|";
xRespuesta += S.replace(o.value, '"','&#34;', "'",'&#39;', '<','&#60;', '>','&#62;', '\\','&#92;', S.char(10), '&#10;');
});
break;
case "O":
for(n=0; n<dimRespuesta.length; n++){
if( xRespuesta!="" ) xRespuesta += "|";
xRespuesta += S.replace(dimRespuesta[n][0].id,"hueco_respuesta_","")+'~'+dimRespuesta[n][0].value;
}
break;
case "S":
if( S(":range_1").attr("eUpdate")=="1" ){
xRespuesta = dimRespuesta[0][0].value;
nRespuesta = 1;
}else{
xRespuesta = "";
nRespuesta = 0;
}
break;
case "M":
xRespuesta = S("#RESPUESTA INPUT[name^=_INPUT_]").val();
if( _Dim["respuesta_obligatoria"]=="S" && xRespuesta=="" ){
xError = 'Falta responder a la pregunta';
}
break;
case "MM":
nRespuesta = 0;
xRespuesta = "";
for(n=1; n<9; n++){
if( S(":menu_"+n).length && S(":menu_"+n).val()!="" ){
nRespuesta++;
if( xRespuesta!="" ) xRespuesta += "|";
xRespuesta += S(":menu_"+n).val();
}
}
break;
default:
if( dimRespuesta.length==0 ){
}else if( dimRespuesta[0][0].id=="valor_question" ){
xRespuesta = dimRespuesta[0][0].value;
}else if( /^respuesta_/.test(dimRespuesta[0][0].id) ){
if( dimRespuesta[0][1]=="INPUT" ){
for(n=0; n<dimRespuesta.length; n++){
if( xRespuesta!="" ) xRespuesta += ",";
xRespuesta += S.replace(dimRespuesta[n][0].id,"respuesta_","");
}
}else if( dimRespuesta[0][1]=="SELECT" ){
for(n=0; n<dimRespuesta[0][0].options.length; n++){
if( dimRespuesta[0][0].value==dimRespuesta[0][0].options[n].value ){
xRespuesta = S.replace(dimRespuesta[0][0].options[n].id,"respuesta_","");
break;
}
}
}
}
}
if( _RespuestasMin>0 ){
if( nRespuesta==0 && _RespuestasLibre && S("#RESPUESTALIBRE *").length && S("#RESPUESTALIBRE *").val()=="" ){
xError = "Falta contestar a la pregunta";
}else if( nRespuesta>=_RespuestasMin && (_RespuestasMax==0 || nRespuesta<=_RespuestasMax) ){
}else{
if( _RespuestasMin==1 ){
xError = 'Falta contestar a la pregunta';
}else{
var plural = (_RespuestasMin-nRespuesta)>1;
xError = 'Falta'+(plural?"n":"")+' "'+(_RespuestasMin-nRespuesta)+'" respuesta'+(plural?"s":"");
}
}
}
if( xError!="" ){
if( _VistaPrevia ){
S.info(xError, 1);
}else{
S.error(xError);
return;
}
}else{
if( _Dim["respuesta_type"]=="F" ){
S.callSrv("", window);
document.forms[0].target = "TLF";
document.FRM1.submit();
setTimeout(function(){
document.forms[0].target = "";
}, 1000);
}else if( xRespuesta!="" ){
S.call("edes.php?E:$a/poll/reply.php", {
cd_gs_poll: _Dim["cd_gs_poll"],
cd_gs_campaign: _cd_gs_campaign,
cd_gs_reply_user: <?=$_SESSION["_User"]?>,
cd_gs_question: _Dim["cd_gs_question"],
respuesta: xRespuesta,
segundos: parseInt((S.date("u")-_Segundos)/1000)
});
}
}
}
<?PHP if( $_GET["_QUESTIONMEM"]==1 ){ ?>
var dim = _WOPENER.S.values(),
json = S.json(dim, true), k, n;
json = S.replace(json, "\n", "<br>");
if( dim["respuesta_type"]=="Z" ){
var txt = "";
S("#mapa_span TD", _WOPENER).each(function(k,o){
if( o.children.length ){
if( txt!="" ) txt += "~";
txt += (o.children[0].checked)?"S":"";
}else{
txt += "|"+o.innerText;
}
});
dim["mapa_json"] = txt;
json = S.json(dim, true);
json = S.replace(json, "\n", "<br>");
}
S("#BOTONES *").each(function(k,o){
o.disabled = true;
});
_uQuestion = dim["cd_gs_question"]*1;
VerEncuesta(json);
return;
<?PHP } ?>
if( _uQuestion==null ) S("#TOTALPREGUNTAS").text(oTR.length-1);
var nFila=null, nJump=null;
if( _uQuestion==null ){
nFila = 1;
}else{
switch(_Dim["respuesta_type"]){
case "R":
S("INPUT[type='radio']").each(function(k,o){
var jump = S(o).attr("eJump");
if( o.checked && jump!="0" && nJump!="undefined" ){
nJump = jump;
return null;
}
});
break;
case "C":
S("INPUT[type='checkbox']").each(function(k,o){
var jump = S(o).attr("eJump");
if( o.checked && jump!="0" && nJump!="undefined" ){
nJump = jump;
return null;
}
});
break;
case "M":
if( S("#RESPUESTA INPUT").val()>0 ) nJump = S("#RESPUESTA INPUT").val();
break;
case "V":
var n=-1;
xRespuesta *= 1;
S("#RESPUESTA I, #RESPUESTA IMG").each(function(k,o){
var jump = S(o).attr("eJump");
n++;
if( xRespuesta==n && jump!="0" && jump!="undefined" && jump!=null ){
nJump = jump;
return null;
}
});
break;
case "P":
xRespuesta *= 1;
if( xRespuesta==0 && _Dim["valoracion_1_jump"]>0 ){
S("#RESPUESTA TD[eJump]").each(function(k,o){
if( o.cellIndex==0 ){
nJump = S(o).attr("eJump");
return null;
}
});
}else if( xRespuesta==10 && _Dim["valoracion_2_jump"]>0 ){
S("#RESPUESTA TD[eJump]").each(function(k,o){
if( o.cellIndex==10 ){
nJump = S(o).attr("eJump");
return null;
}
});
}
break;
case "K":
var o = S("#AQUII DIV");
if( o.length>0 ){
var jump = S(o.obj).attr("eJump");
if( jump!="0" && nJump!="undefined" ){
nJump = jump;
}
}
break;
case "S":
if( xRespuesta==_Dim["slide_min"] && _Dim["slide_1_jump"]>0 ){
nJump = _Dim["slide_1_jump"];
}else if( xRespuesta==_Dim["slide_max"] && _Dim["slide_3_jump"]>0 ){
nJump = _Dim["slide_3_jump"];
}else if( _Dim["slide_2_jump"]>0 ){
nJump = _Dim["slide_2_jump"];
}
break;
}
if( nJump==null || nJump=="undefined" ){
nFila = _uQuestion+1;
}else if( nJump==-1 ){
S(oTR).each(function(k,o){
if( S.trim(o.cells[_pRespuestaType].innerText)=="FE" ){
nFila = o.rowIndex;
return null;
}
});
}else{
S(oTR).each(function(k,o){
if( o.cells[_pQuestion].innerText==nJump ){
nFila = o.cells[_pOrden].innerText;
return null;
}
});
}
}
if( nFila!=null ){
_nPregunta++;
Encuestar(nFila);
}
}
function Anterior(){
if( _nPregunta<0 ) return;
S.call("edes.php?E:$a/poll/reply_bak.php", {
cd_gs_poll: _Dim["cd_gs_poll"],
cd_gs_campaign: _cd_gs_campaign,
cd_gs_reply_user: <?=$_SESSION["_User"]?>,
cd_gs_question: _Dim["cd_gs_question"]
});
_nPregunta--;
Encuestar(_DimPregunta[_nPregunta][0]);
}
</SCRIPT>
</HEAD>
<BODY onload="Ini()">
<?PHP
eInclude($_Sql);
if( isset($_GET["cd_gs_campaign"]) && $_PSOURCE!='$a/poll/gs_question.edf' && $_PSOURCE!='$a/poll/gs_poll.edf' ){
qQuery("select * from gs_campaign where cd_gs_campaign=".$_GET["cd_gs_campaign"]);
$cmp = qArray();
if( $cmp["cd_gs_poll"]=="" ){
eInit();
eEnd();
}
echo "<script>var _cd_gs_campaign='{$cmp["cd_gs_campaign"]}';</script>";
$tmp = explode("-",$cmp["dt_start"]);
if( strlen($tmp[0])==4 ){
}else{
$cmp["dt_start"] = "{$tmp[2]}-{$tmp[1]}-{$tmp[0]}";
$tmp = explode("-",$cmp["dt_end"]);
$cmp["dt_end"]   = "{$tmp[2]}-{$tmp[1]}-{$tmp[0]}";
}
if( $cmp["hour_start"]=="" ) $cmp["hour_start"] = "00";
if( $cmp["hour_end"]==""   ) $cmp["hour_end"]   = "23";
$hoy = date("Y-m-dH");
if( ($cmp["dt_start"].$cmp["hour_start"])>$hoy ){
eInclude("message");
eMessage("La encuesta todavía no ha empezado.<br>Empezará el ".eYmd2Dmy($cmp["dt_start"])." a las ".$cmp["hour_start"]." horas", "HS");
}
if( ($cmp["dt_end"].$cmp["hour_end"])<=$hoy ){
eInclude("message");
eMessage("La encuesta finalizó el ".eYmd2Dmy($cmp["dt_end"])." a las ".$cmp["hour_end"]." horas", "HS");
}
qQuery("select * from gs_poll where cd_gs_poll=".$cmp["cd_gs_poll"]);
$r = qArray();
echo '<div style="display:none">';
echo '<input name="_cd_gs_campaign" value="'.$cmp["cd_gs_campaign"].'">';
echo '<input name="_cd_gs_poll" value="'.$r["cd_gs_poll"].'">';
echo '<input name="_color_ini" value="'.$r["color_ini"].'">';
echo '<input name="_color_end" value="'.$r["color_end"].'">';
echo '<input name="_image" value="'.$r["image"].'">';
echo '<input name="_tf_retroceder" value="'.$r["tf_retroceder"].'">';
echo '<input name="_tf_save_answer" value="'.$r["tf_save_answer"].'">';
echo '<input name="_tf_jump_auto" value="'.$r["tf_jump_auto"].'">';
qQuery("select * from gs_question where cd_gs_poll=".$cmp["cd_gs_poll"]." order by orden");
echo '<TABLE id="BROWSE" style="">';
echo '<tr>';
echo '<th campo="icon" ocampo="orden as icon" nc="0" td="#" te="T" ts="" pcs="">Or.</th>';
echo '<th campo="cd_gs_poll" nc="1" ocampo="cd_gs_poll" td="0">cd_gs_poll</th>';
echo '<th campo="cd_gs_question" nc="2" ocampo="cd_gs_question" td="+">cd_gs_question</th>';
echo '<th campo="orden" nc="3" ocampo="orden" td="+">orden</th>';
echo '<th campo="pregunta" ocampo="pregunta" nc="4" td="#" te="A" ts="" pcs="">Pregunta</th>';
echo '<th campo="respuesta_type" ocampo="respuesta_type" nc="5" td="N" te="SV" ts="" pcs="">Tipo<br>Respuesta</th>';
echo '<th campo="respuesta_con_salto" ocampo="respuesta_con_salto" nc="6" td="D" te="C" ts="" pcs="">Respuesta<br>con salto</th>';
echo '<th campo="json" nc="7" ocampo="json" td="#">json</th>';
echo '<th campo="dt_update" nc="8" ocampo="dt_update" td="CDI">dt_update</th>';
echo '<th campo="type" nc="9" ocampo="respuesta_type as type" td="D">respuesta_type as type</th></tr>';
echo "</tr>";
while($r=qArray()){
echo "<tr>";
echo "<td>".$r["icon"]."</td>";
echo "<td>".$r["cd_gs_poll"]."</td>";
echo "<td>".$r["cd_gs_question"]."</td>";
echo "<td>".$r["orden"]."</td>";
echo "<td>".$r["pregunta"]."</td>";
echo "<td>".$r["respuesta_type"]."</td>";
echo "<td>".$r["respuesta_con_salto"]."</td>";
echo "<td>".$r["json"]."</td>";
echo "<td>".$r["dt_update"]."</td>";
echo "<td>".$r["type"]."</td>";
echo "</tr>";
}
echo '</TABLE>';
echo '</div>';
}else{
$cmp["cd_gs_poll"] = $_GET["cd_gs_poll"];
echo "<script>var _cd_gs_campaign='0';</script>";
}
qQuery("select user_name,user_surname from gs_user where cd_gs_user=".$_SESSION["_User"]);
list($_UserName, $_UserSurname) = qRow();
?>
<form name="FRM1" action="edes.php?E:$a/poll/reply.php" style="height:100%;" method="post" enctype="multipart/form-data">
<?PHP
if(  $_PSOURCE!='$a/poll/gs_question.edf' && $_PSOURCE!='$a/poll/gs_poll.edf' ) echo "<div id='ENCUESTADIRECTA' style='width:600px; height:650px'>";
?>
<TABLE id="POLL" border=0px cellspacing=1px cellpadding=0px>
<thead>
<TR><TH id="CABECERA" style="display:inline-block;">
<?PHP
AlinearImagen($cmp["cd_gs_poll"], "cabecera_img", "cabecera_img_type", "cabecera_texto");
?>
</TH></TR>
</thead>
<tbody>
<TR><TD id="PREGUNTA"></TD></TR>
<TR><TD id="RESPUESTA"></TD></TR>
<TR><TD id="RESPUESTALIBRE"></TD></TR>
<TR><TD id="BOTONES" height="100%">
<input type=button id="bANTERIOR" value="Anterior" onclick="Anterior()">
<input type=button id="bSIGUIENTE" value="Siguiente" onclick="Siguiente()">
</TD></TR>
<TR style="height:1px;"><TD id="STATUS" style="display:block;">
<span id="NUMPREGUNTA">1</span>/<span id="TOTALPREGUNTAS"></span>
</TD></TR>
</tbody>
<tfoot>
<TR><TD id="PIE" style="display:inline-block;">
<?PHP
AlinearImagen($cmp["cd_gs_poll"], "pie_img", "pie_img_type", "pie_texto");
?>
</TD></TR>
</tfoot>
</TABLE>
<?PHP
if(  $_PSOURCE!='$a/poll/gs_question.edf' && $_PSOURCE!='$a/poll/gs_poll.edf' ) echo "</div>";
?>
</form>
</BODY>
</HTML>
<?PHP
function AlinearImagen($pk, $img, $tipo, $texto){
global $_UserName, $_UserSurname;
qQuery("select * from gs_poll where cd_gs_poll=".$pk);
$r = qArray();
$txt = "";
if( $r[$texto]!="" ){
$txt = $r[$texto];
if( $_GET["_VISTAPREVIA"]!=1 ){
$txt = str_replace(array("{nombre}","{apellidos}"), array($_UserName, $_UserSurname) , $txt);
}
}
if( $r[$img]!="" ){
switch($type){
case "LF":
echo '<img id="" src="poll/'.$r[$img].'" style="cursor:default; float:left; margin-right:10px; margin-bottom:5px;">'.$txt;
break;
case "RF":
echo '<img id="" src="poll/'.$r[$img].'" style="cursor:default; float:right; margin-left:10px; margin-bottom:5px;">'.$txt;
break;
case "U":
echo '<center><img id="" src="poll/'.$r[$img].'" style="cursor:default; margin-bottom:3px;"></center>'.$txt;
break;
case "D":
echo $txt.'<center><img id="" src="poll/'.$r[$img].'" style="cursor:default; margin-top:3px;"></center>';
break;
case "L":
echo '<table><tr><td><img id="" src="poll/'.$r[$img].'" style="cursor:default; margin-right:3px;"><td style="text-align:justify">'.$txt.'</table>';
break;
case "R":
echo '<table><tr><td style="text-align:justify">'.$txt.'<td><img id="" src="poll/'.$r[$img].'" style="cursor:default; margin-left:3px;"></table>';
break;
default:
echo '<img id="" src="poll/'.$r[$img].'" style="cursor:default; float:left; margin-right:10px; margin-bottom:5px;">';
echo $txt;
}
}else{
echo $txt;
}
}
?>
