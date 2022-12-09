var _ed=null, _edON=true;
function _edFont(){
S("font",edMENUS.oCONTAINER).each(function(k,o){
if( o.getAttribute("FS")===null ){
S(o).css("fontSize",["100%","130%","160%"][o.getAttribute("SIZE")*1-3]);
o.setAttribute("FS","1");
}
});
}
function edNO(opcion, orden){
var Bak = edMENUS.oCONTAINER.innerHTML,
p = document.body.scrollTop;
var pIni = _edSelect.startOffset,
pEnd = _edSelect.endOffset;
opcion = S.event(window).getAttribute("exe");
if( opcion==null ) return;
var left = Bak.substr(0,pIni),
centro = Bak.substr(pIni, pEnd-pIni),
right = Bak.substr(pEnd, Bak.length);
switch( opcion ){
case "bold":
centro = "<b>"+centro+"</b>";
break;
case "italic":
centro = "<i>"+centro+"</i>";
break;
case "underline":
centro = "<u>"+centro+"</u>";
break;
case "removeformat":
document.execCommand(opcion);
return;
break;
default:
}
Bak = left+centro+right;
edMENUS.oCONTAINER.innerHTML = Bak;
edShow(edMENUS.oCONTAINER);
S.posCursorHtml(edMENUS.oCONTAINER, pEnd, pEnd);
return eClearEvent();
}
function ed(opcion, orden){
var Bak = edMENUS.oCONTAINER.innerHTML,
p = document.body.scrollTop;
if( opcion==undefined ){
opcion = S.event(window).getAttribute("exe");
if( opcion.indexOf('_') > 0 ){
tmp = opcion.split('_');
opcion = tmp[1];
orden = tmp[0];
}
}
edMENUS.oCONTAINER.focus();
if( orden==undefined ){
document.execCommand(opcion);
}else{
if( orden=="fontsize" ){
if( S.getSelection(window).length==0 ){
S.info("Seleccione primero el texto", 3);
return false;
}
}
document.execCommand(orden, false, opcion);
setTimeout(function(){ _edFont(); }, 1);
}
document.body.scrollTop = p;
if( edMENUS.oCONTAINER.getAttribute("eLONG")>-1 && edMENUS.oCONTAINER.innerHTML.length>=edMENUS.oCONTAINER.getAttribute("eLONG") ){
top.eInfo(window,eLng(145));
edMENUS.oCONTAINER.innerHTML = Bak;
return eClearEvent();
}
return true;
}
function edPut(txt){
if( edMENUS.oCONTAINER.getAttribute("eLONG")>-1 && edMENUS.oCONTAINER.innerHTML.length+txt.length>=edMENUS.oCONTAINER.getAttribute("eLONG") ){
top.eInfo(window,eLng(145));
eClearEvent();
return -1;
}
edMENUS.oCONTAINER.focus();
if(document.selection && document.selection.createRange){
var myRange = document.selection.createRange(),
m = myRange.pasteHTML("<p>");
}else if (window.getSelection) {
var selection = window.getSelection(),
range = window.getSelection().getRangeAt(0);
range.deleteContents();
var newP = document.createElement("p");
newP.id = "prueba";
range.insertNode(newP);
var o = document.getElementById("prueba");
o.id = "";
o.contentEditable = true;
o.focus();
}
}
function edDown(){
var o = S.event(window), t;
if( o.className=="READONLY" ) return eClearEvent();
switch( S.eventCode(event) ){
case 8:
case 46:
return true;
case 121:
edSave();
break;
case 27:
edClose();
break;
case 9:
if( event.shiftKey || event.ctrlKey ){
edPut('<SPAN style="WIDTH:25px"></SPAN>');
}else{
edSave();
edNextField();
}
break;
case 13:
if( event.shiftLeft || event.ctrlKey ){
edSave();
edNextField();
}else{
var txt = S.replace(o.innerHTML, [
['"',"&#34;"],
["'","&#39;"],
["<","&#60;"],
[">","&#62;"],
["\\","&#92;"]
]),
t = o.getAttribute("eLONG")*1;
if( t>-1 && txt.length>t ){
top.eInfo(window,eLng(145));
return eClearEvent();
}
return true;
}
break;
default:
t = o.getAttribute("eLONG")*1;
if( t>-1 ){
var txt = S.replace(o.innerHTML, [
['"',"&#34;"],
["'","&#39;"],
["<","&#60;"],
[">","&#62;"],
["\\","&#92;"]
]);
if( txt.length>t ){
top.eInfo(window,eLng(145));
return eClearEvent();
}
}
return true;
}
function edNextField(){
for(var nCampo in _cForm) if( _cForm[nCampo].Nombre==edMENUS.oFIELD.name ){
SiguienteCampo(_cForm[nCampo].Nombre);
break;
}
}
return eClearEvent();
}
function edSave(){
with( edMENUS ){
oFIELD.value = edMENUS.oCONTAINER.innerHTML;
oCONTAINER.parentNode.className = 'edOUT';
style.display = 'none';
oCONTAINER.contentEditable = false;
oCONTAINER.parentNode.scrollTop = "0px";
}
document.body.focus();
try{
FUNCTION_ed("S", edMENUS.oFIELD);
}catch(e){}
}
var _edSelect = null;
function edSetCursor(e){
var Obj = (e==undefined) ? S.event(window) : e, bak;
while( Obj.id!="edCONTAINER" ){
bak = Obj;
Obj = Obj.parentNode;
}
if( Obj.id=="edCONTAINER" ) Obj = bak;
if( Obj.parentNode.className=="edOUT" ){
edShow();
}
return true;
}
var _edCursorBlur=null;
function edBlur(){
_edSelect = saveSelection();
if( _edSelect!=null ){
_edCursorBlur = [_edSelect.startOffset, _edSelect.endOffset];
}
}
function saveSelection(){
if( window.getSelection ){
var sel = window.getSelection();
if( sel.rangeCount>0 ) return sel.getRangeAt(0);
}else if( document.selection ){
var sel = document.selection;
return sel.createRange();
}
return null;
}
function restoreSelection(savedSel){
if( !savedSel )	return;
if( window.getSelection ){
var sel = window.getSelection();
sel.removeAllRanges();
sel.addRange(savedSel);
}else if( document.selection ){
savedSel.select();
}
}
function edShow(e){
var Obj = (e==undefined)? S.event(window):e, bak, xy, n, tmp;
while( Obj.id!="edCONTAINER" ){
bak = Obj;
Obj = Obj.parentNode;
}
if( Obj.id=="edCONTAINER" ) Obj = bak;
if( Obj.className=="READONLY" ) return eClearEvent();
if( Obj.className=="ERROR" ) Obj.className = "";
edMENUS.oFIELD = DGI(Obj.id.substr(0,Obj.id.length-1));
S("TD[id]",edMENUS).display("inline-block");
if( edMENUS.oFIELD.getAttribute("eIconNone")!=null ){
tmp = S.nsp(edMENUS.oFIELD.getAttribute("eIconNone")).split(",");
for(n=0; n<tmp.length; n++) S("#"+tmp[n]).none();
}
if( edMENUS.oCONTAINER!=undefined ) edMENUS.oCONTAINER.parentNode.className = 'edOUT';
Obj.parentNode.className = 'edOVER';
edMENUS.oCONTAINER = Obj;
DGI("_edIMG").style.display = (S(edMENUS.oFIELD).attr("eIMG")>0)?'block':'none';
xy = eXY(Obj);
S(edMENUS).css({
left: 0,
top: 0,
display: 'block'
});
S(edMENUS).css({
left: xy[0]-1,
top: xy[1]-edMENUS.offsetHeight+Obj.parentNode.scrollTop
});
Obj.parentNode.parentNode.style.whiteSpace = 'normal';
Obj.contentEditable = true;
Obj.contentEditable = false;
Obj.contentEditable = true;
Obj.onfocus = null;
Obj.focus();
Obj.onfocus = function anonimous(){edShow();};
}
function edIni(Nom){
_edON = true;
var Obj = DGI(Nom);
Obj.eHTML = 1;
var Contenedor = Obj.parentNode.children[1];
Contenedor.innerHTML = Obj.value;
Obj.style.display = 'none';
Contenedor.style.display = (Contenedor.className=="READONLY") ? 'inline-table':'block';
Obj.parentNode.parentNode.style.whiteSpace = 'normal';
if( Obj.parentNode.parentNode.tagName=='FIELDSET' ) Obj.parentNode.parentNode.parentNode.style.whiteSpace = 'normal';
}
function edClose(){
with( edMENUS.oCONTAINER ){
innerHTML = edMENUS.oFIELD.value;
parentNode.className = 'edOUT';
contentEditable = false;
parentNode.scrollTop = "0px";
}
edMENUS.style.display = 'none';
document.body.focus();
try{
FUNCTION_ed("C", edMENUS.oFIELD);
}catch(e){}
}
function edCheckbox(){
var Obj = edMENUS.oCONTAINER;
if( Obj.isContentEditable ){
Obj.contentEditable = false;
_edON = false;
}else{
Obj.contentEditable = true;
_edON = true;
}
return eClearEvent();
}
function edImgOp(Op, OpTextContent){
if( Op!=null ){
var txt = _edImg['htmlText'],
i = txt.indexOf('"FLOAT')+1,
f = txt.indexOf('"',i);
txt = txt.substr(0,i)+'FLOAT:'+Op+txt.substr(f);
_edImg.pasteHTML(txt);
return eClearEvent();
}
}
var _edImg;
function edImg(){
return;
var Obj = document.selection.createRange(),
txt = Obj['htmlText'];
if( txt==undefined ) return;
if( txt.substr(0,4)=='<IMG' ){
_edImg = Obj;
top.eMenu( window, S.event(window), {'left':eLng(146), 'right':eLng(147)}, edImgOp );
}else{
var oFile = WE.eFileSelect( eLng(148), "|*.gif;*.png;*.jpg", S(edMENUS.oFIELD).attr("eIMG") );
if( oFile!='' ){
top.eInfo(window,eLng(149), -1);
var dFile = top.eDate('YmdHis'),
Ext = oFile.split('.');
top.eFilePut(oFile, '/_tmp/php/'+dFile+'.'+_User);
top.eCallSrv(window, 'edes.php?E:$insertimg.gs&FILE='+dFile+'.'+Ext[Ext.length-1]+'&eImgSize='+edMENUS.oCONTAINER.parentNode.eImgSize);
}
}
return eClearEvent();
}
function edColor(LP){
var obj = S.event(window),
oColores = DGI("edCOLORES");
if( LP==undefined ){
restoreSelection(_edSelect);
if( S.nsp(obj.style.backgroundColor)=='rgb(250,250,250)' ) return ed('removeformat');
ed(obj.style.backgroundColor, (oColores.tipo==0)?"forecolor":"backcolor");
oColores.style.display = 'none';
}else{
var el=obj, Obj=oColores, xy=eXY(el);
Obj.tipo = LP;
Obj.eTitle = el.title;
Obj.Obj = el;
el.title = '';
S(Obj).css({
left: xy[0]-1,
top: xy[1]+1
});
setTimeout(function(){
oColores.style.display = "block";
}, 1);
}
return eClearEvent();
}
