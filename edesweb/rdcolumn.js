var _RDTime;
function _RDMove(){
var x = event.clientX - 3, Ancho, Zona = DGI('RDResizeColumn');
Zona.Ini = true;
if( x > Zona.MinX ){
Ancho = x - Zona.PosX - 1 + document.body.scrollLeft;
if( Ancho < 0 ) Ancho = 0;
with( Zona.style ){
left = px(Zona.PosX + 2);
width = px(Ancho);
}
_RDTime = null;
}else{
if( _RDTime==null ) _RDTime = Date.parse(new Date());
if( (Date.parse(new Date())-_RDTime) > 1000 ){
var n,t=0, oDIV = DGI('_RDColDIV'), oCOL = DGI("BROWSE").children[0].all;
for( n=0; n<oCOL.length; n++ ) if( oCOL[n].offsetWidth>0 ) t++
if( t>1 ){
oCOL[oDIV.oCol.NC].style.display = 'none';
_RDUp();
}
}
}
return false;
}
function _RDUp(){
_RDTime = null;
document.onmouseup = document.onmousemove = document.onkeypress = null;
var RDDiv = DGI('RDResizeColumn');
var oDIV = DGI('_RDColDIV'); oDIV.style.display = 'none';
if( RDDiv.Ini == false ) return;
var oCol = oDIV.oCol;
var c = oCol.NC, n = (parseInt(RDDiv.style.width)-3);
if( oDIV.getAttribute('IniCol'+c)==undefined ){
var oTABLA = oCol.parentNode.parentNode.parentNode;
oTABLA.children[0].children[c].style.width = '';
var xSpan = '<SPAN style="overflow-x:hidden; float:left; white-space:nowrap; text-overflow:ellipsis; width:100%;">';
DGI('TablaTH').children[0].rows[oCol.parentNode.rowIndex].cells[oCol.cellIndex].innerHTML = xSpan+oCol.innerHTML+'</SPAN>';
oCol.innerHTML = xSpan+oCol.innerHTML+'</SPAN>';
for( var r=parseInt(oTABLA.AltoTH)+1; r<oTABLA.rows.length; r++ ) oTABLA.rows[r].cells[c].innerHTML = xSpan+oTABLA.rows[r].cells[c].innerHTML+'</SPAN>';
oDIV.setAttribute('IniCol'+c,1);
if( oCol.pCS!=undefined && oCol.pCS!="" ){
if( oTABLA.rows[0].cells[oCol.pCS].pCS==undefined ){
oTABLA.rows[0].cells[oCol.pCS].innerHTML = xSpan+oTABLA.rows[0].cells[oCol.pCS].innerHTML+'</SPAN>';
oTABLA.rows[0].cells[oCol.pCS].pCS = 1;
DGI('TablaTH').children[0].rows[0].cells[oCol.pCS].innerHTML = xSpan+DGI('TablaTH').children[0].rows[0].cells[oCol.pCS].innerHTML+'</SPAN>';
oCol.removeAttribute('pCS');
}
}
}
if( oDIV.oCSS[c]==undefined ){
document.styleSheets[0].addRule( '#RDCol'+c, 'width:'+n );
var oStyle = document.styleSheets, r, i;
for( r=0; r<oStyle.length; r++ ) for( i=oStyle[r].rules.length-1; i>=0; i-- ) if( oStyle[r].rules[i].selectorText == '#RDCol'+c ){
oDIV.oCSS[c] = oStyle[r].rules[i].style;
break;
}
}
oDIV.oCSS[c].cssText = 'width:'+n;
setTimeout('_RecalcSlideTH();',250);
}
function _RDDown(e){
var Obj = S.event(window);
if( Obj.tagName!='TH' ) Obj = Obj.parentNode;
if( S(Obj).css("cursor")!='col-resize' ) return;
if( DGI('BROWSE').contains(Obj)==false ) Obj = DGI('BROWSE').rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex];
var oCol = Obj;
var xy = top.eXY(oCol);
var Zona = DGI('RDResizeColumn');
Zona.Ini = false;
with( Zona.style ){
left = px(xy[0]+1 + Obj.offsetWidth + document.body.scrollLeft);
top  = px(xy[1]-1 + document.body.scrollTop);
width = "0px";
}
Zona.PosX = xy[0] - 1 + document.body.scrollLeft;
xy = top.eXY(oCol);
Zona.MinX = xy[0] + 10;
with( Zona.parentNode.style ){
height = px(document.body.scrollHeight);
width = px(document.body.scrollWidth);
}
var oTABLA = oCol.parentNode.parentNode.parentNode;
if( oCol.parentNode.rowIndex==0 ){
Zona.style.height = oTABLA.offsetHeight - 2;
}else{
Zona.style.height = oTABLA.offsetHeight - 2 - oCol.offsetHeight - 1;
Zona.style.top = xy[1]+document.body.scrollTop-1;
}
var oDIV = DGI('_RDColDIV');
oDIV.oX = event.screenX;
oDIV.oIX = event.screenX-oCol.offsetWidth;
oDIV.oWidth = oCol.scrollWidth;
oDIV.oCol = oCol;
if( oDIV.oCSS==undefined ){
oDIV.oCSS = new Array();
var oStyle = document.styleSheets, r, i, AltaCss = true;
for( r=0; r<oStyle.length; r++ ) for( i=oStyle[r].rules.length-1; i>=0; i-- ) if( oStyle[r].rules[i].selectorText == '#RDResizeColumn' ){
AltaCss = false;
break;
}
if( AltaCss ) document.styleSheets[0].addRule( '#RDResizeColumn', 'background:#555555' );
}
oDIV.style.display = 'block';
document.onmouseup = _RDUp;
document.onmousemove = _RDMove;
document.onkeypress = _RDCancel;
return false;
}
function _RDCursorOver(){
var Margen = 5, Obj = S.event(window);
if( Obj.tagName!='TH' ) Obj = Obj.parentNode;
if( Obj.NC!=undefined && ( Obj.offsetWidth-Margen < event.offsetX ) ){
Obj.style.cursor = 'col-resize';
}else{
Obj.style.cursor = 'pointer';
}
}
function _RDCursorOut(){
S.event(window).style.cursor = 'pointer';
}
function _RDCancel(){
if( S.eventCode(event)==27 ){
document.onmouseup = document.onmousemove = document.onkeypress = null;
DGI('_RDColDIV').style.display = 'none';
}
}
