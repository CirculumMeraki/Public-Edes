var _SelBrowserBuscar = '',
_WinBrowser = new Array(),
SelBROWSER;
function _SelBrowserParameter(obj){
var eParameters="", tmp, n;
if( obj.getAttribute("eParameters")!=null && obj.getAttribute("eParameters")!="" ){
eParameters = '&PARAMETERS="';
tmp = obj.getAttribute("eParameters").split(",");
for(n=0; n<tmp.length; n++){
if(n>0) eParameters += "|";
eParameters += S(":"+tmp[n]).val();
}
eParameters += '"';
}
return eParameters;
}
function _SelBrowserSlider(){
var Obj = S.toTag(S.event(window),'table'),
NmField = Obj.getAttribute("uField"),
Include = (Obj.getAttribute("Include")==null)? "" : '&Include='+Obj.getAttribute("Include"),
eParameters = _SelBrowserParameter(Obj),
el = eGO(NmField);
if( ((event.detail<0)? 1 : (event.wheelDelta>0)? 1 : -1)<0 ){
if( SelBROWSER.children[0].getAttribute("HayMas")==1 ){
el.setAttribute("ePag", el.getAttribute("ePag")+1);
top.eCallSrv(window,'edes.php?E:$seltable.gs&VALUE='+escape(_SelBrowserBuscar)+'&DESTINO='+NmField+'&ALTO='+el.getAttribute("eHeight")+'&COLS='+el.getAttribute("eViewCols")+eParameters + Include+'&PAGINA='+el.getAttribute("ePag") + ((typeof(_DB)!='undefined')?"&_DB='"+_DB+"'":'') );
}
}else if( el.getAttribute("ePag")>0 ){
el.setAttribute("ePag", el.getAttribute("ePag")-1);
top.eCallSrv(window,'edes.php?E:$seltable.gs&VALUE='+escape(_SelBrowserBuscar)+'&DESTINO='+NmField+'&ALTO='+el.getAttribute("eHeight")+'&COLS='+el.getAttribute("eViewCols")+eParameters + Include+'&PAGINA='+el.getAttribute("ePag")+'&ATRAS=1' + ((typeof(_DB)!='undefined')?"&_DB='"+_DB+"'":'') );
}
S.eventClear(window);
}
function _SelBrowserCopy(Destino, Contenido){
var xy = eXY( DGI(Destino) );
with(SelBROWSER.style){
left = px(xy[0] + 1);
top = px(xy[1] + DGI(Destino).offsetHeight - 1);
zIndex = 50000;
}
if( top.eIsWindow(window) ){
try{
if( window.frameElement.FSCREEN==undefined || window.frameElement.FSCREEN==false ) SelBROWSER.style.left = px(SelBROWSER.style.left-2);
}catch(e){}
}
S.selectNone(window);
if( SelBROWSER.children[0].rows.length==0 ) S(".SELECT", window).none();
SelBROWSER.innerHTML = Contenido;
SelBROWSER.setAttribute("Field", Destino);
SelBROWSER.style.height = '';
SelBROWSER.style.display = (SelBROWSER.children[0].rows.length>0) ? 'block':'none';
if( SelBROWSER.style.display=='none' ) return;
if( DGI(Destino).getAttribute("eViewCols")=='1' ){
SelBROWSER.style.width = px(DGI(Destino).offsetWidth-3);
}else{
SelBROWSER.children[0].style.width = "1px";
}
SelBROWSER.style.height = "1px";
if( SelBROWSER.children[0].offsetHeight>SelBROWSER.clientHeight ){
SelBROWSER.style.height = px(SelBROWSER.children[0].scrollHeight);
SelBROWSER.style.height = px(SelBROWSER.children[0].scrollHeight + (SelBROWSER.scrollHeight-SelBROWSER.clientHeight) + 2);
}
if( parseInt(SelBROWSER.style.top)+parseInt(SelBROWSER.style.height)>document.body.clientHeight ){
SelBROWSER.style.top = px(parseInt(SelBROWSER.style.top) - parseInt(SelBROWSER.style.height) - parseInt(DGI(Destino).clientHeight) + 1);
if( parseInt(SelBROWSER.style.top) < 0 ) SelBROWSER.style.top = "10px";
}
}
function _SelBrowserOut(){
var NmField = S.event(window).name,
obj = DGI(NmField);
if( SelBROWSER.length ) SelBROWSER = SelBROWSER[1];
if( eGF(NmField)=='' && obj.getAttribute("eAssign")!='' ){
if( obj.getAttribute("eAssign").indexOf('(')>-1 ){
eval( obj.getAttribute("eAssign").substr(0,obj.getAttribute("eAssign").length-2) )( new Array('','','','','','','','','','') );
}else{
var Dim = obj.getAttribute("eAssign").split(','), i;
for(i=0; i<Dim.length; i++) if( Dim[i]!='' ) ePF(Dim[i], '');
}
}else if( SelBROWSER.children[0].rows.length>0 && eGF(NmField)!=S.trim(SelBROWSER.children[0].rows[0].cells[0].innerText) ){
_SelBrowseSet(NmField, 0);
}
}
function _SelBrowseClear(NmField){
var obj = DGI(NmField), i;
if( obj.getAttribute("eAssign")!='' ){
if( obj.getAttribute("eAssign").indexOf('(')>-1 ){
var Dim = new Array(), NomFunc;
for(i=0; i<SelBROWSER.children[0].rows[0].cells.length; i++) Dim[i] = "";
NomFunc = obj.getAttribute("eAssign").substr(0,obj.getAttribute("eAssign").length-2);
eval(NomFunc)(Dim);
}else{
var Dim = obj.getAttribute("eAssign").split(',');
for(i=0; i<Dim.length; i++) if( Dim[i]!='' ){
ePF(Dim[i], "");
}
}
}
ePF(NmField, "");
for(i=0; i<70; i++) if( _WinBrowser[NmField+'_'+i]!=undefined  ) _WinBrowser[NmField+'_'+i] = undefined;
}
function _SelBrowseSet(NmField, n){
if( SelBROWSER.children.length==0 ) return;
var obj = DGI(NmField);
if( SelBROWSER.children[0].rows.length>0 ){
var txt = eTrim(SelBROWSER.children[0].rows[n].cells[0].textContent),
vacio = (SelBROWSER.offsetWidth==0 && obj.value=="");
if( SelBROWSER.offsetWidth==0 && obj.value!="" ) return;
if( txt=='...' ) return;
if( obj.getAttribute("eAssign")!='' ){
if( obj.getAttribute("eAssign").indexOf('(')>-1 ){
var Dim = new Array(), i, NomFunc;
for(i=0; i<SelBROWSER.children[0].rows[n].cells.length; i++) Dim[i] = (vacio)?"":SelBROWSER.children[0].rows[n].cells[i].textContent;
NomFunc = obj.getAttribute("eAssign").substr(0,obj.getAttribute("eAssign").length-2);
eval(NomFunc)(Dim);
}else{
var Dim = obj.getAttribute("eAssign").split(','),
MaxCol = Math.min(Dim.length, SelBROWSER.children[0].rows[n].cells.length), i;
for(i=0; i<MaxCol; i++) if( Dim[i]!='' ){
ePF(Dim[i], (vacio)?"":SelBROWSER.children[0].rows[n].cells[i+1].textContent);
}
}
}
ePF(NmField, (vacio)?"":txt);
for(i=0; i<70; i++) if( _WinBrowser[NmField+'_'+i]!=undefined  ) _WinBrowser[NmField+'_'+i] = undefined;
}
SelBROWSER.style.display = 'none';
}
function _SelBrowseClick(){
var obj = S.event(window),
tr = S.toTag(obj,"TR","*"),
table = S.toTag(obj,"TABLE","*");
_SelBrowseSet(S(table).attr("uField"), tr.rowIndex);
}
function eFireChange(obj, oValue, tipo){
var NmField = obj.name, i;
if( typeof(tipo)=='undefined' ){
var uTime = obj.getAttribute("uTime") || 0,
aTime =  S.date("u"),
_idEvent = obj.getAttribute("_idEvent"), idEvent;
if( (aTime-uTime)<1000 ){
if( _idEvent!=null ) clearTimeout(_idEvent);
idEvent = setTimeout(function(){
eFireChange(obj, oValue, tipo);
}, 1000);
obj.setAttribute("_idEvent", idEvent);
return;
}
if( _idEvent!=null ) clearTimeout(_idEvent);
var Include = obj.getAttribute("Include") || "";
obj.style.backgroundColor = '#cccccc';
var eParameters = _SelBrowserParameter(obj);
top.eCallSrv(window,'edes.php?E:$seltable.gs&VALUE='+escape(obj.value)+'&DESTINO='+NmField+'&ALTO='+obj.getAttribute("eHeight")+'&COLS='+obj.getAttribute("eViewCols")+eParameters + Include + ((typeof(_DB)!='undefined')?"&_DB='"+_DB+"'":'') );
obj.setAttribute("uTime", S.date("u"));
}else{
switch( tipo ){
case -2:
if( SelBROWSER.getAttribute("field")==NmField && obj.value!="" ){
setTimeout(function(){
for(i=0; i<SelBROWSER.children[0].rows.length; i++){
if( obj.value==eTrim(SelBROWSER.children[0].rows[0].cells[0].textContent).substr(0,obj.value.length) ){
_SelBrowseSet(NmField, i);
break;
}
}
},300);
}
break;
case -1:
var Dim = obj.getAttribute("eAssign").split(',');
obj.setAttribute("nmValue", oValue);
obj.setAttribute("cdValue", DGI(Dim[0]).value);
break;
case 8:
case 46:
var Buscar = eGF(NmField);
if( Buscar=='' || _WinBrowser[NmField+'_'+Buscar.length]==undefined ){
SelBROWSER.style.display = 'none';
if( Buscar=='' ){
_SelBrowseClear(NmField);
}
if( _WinBrowser[NmField+'_'+Buscar.length]==undefined ){
var NmField = obj.name,
Include = obj.getAttribute("Include") || "";
obj.style.backgroundColor = '#cccccc';
var eParameters = _SelBrowserParameter(obj);
top.eCallSrv(window,'edes.php?E:$seltable.gs&VALUE='+escape(obj.value)+'&DESTINO='+NmField+'&ALTO='+obj.getAttribute("eHeight")+'&COLS='+obj.getAttribute("eViewCols")+eParameters + Include + ((typeof(_DB)!='undefined')?"&_DB='"+_DB+"'":'') );
}
}else{
if( _WinBrowser[NmField+'_'+Buscar.length] ) SelBROWSER.children[0].outerHTML = _WinBrowser[NmField+'_'+Buscar.length];
try{
SelBROWSER.style.display = "block";
SelBROWSER.style.height = "1px";
if( SelBROWSER.children[0].offsetHeight > SelBROWSER.clientHeight ){
SelBROWSER.style.height = SelBROWSER.children[0].scrollHeight+"px";
SelBROWSER.style.height = (SelBROWSER.children[0].scrollHeight + (SelBROWSER.scrollHeight-SelBROWSER.clientHeight) + 2)+"px";
}
}catch(e){
}
}
break;
case 13:
case 9:
if( obj.value!="" ){
_SelBrowseSet(obj.name, SelBROWSER.children[0].getAttribute("Pnt"));
}else{
SelBROWSER.style.display = 'none';
}
break;
case 27:
if( obj.getAttribute("nmValue")!=null ){
var Dim = obj.getAttribute("eAssign").split(',');
ePF(NmField, obj.getAttribute("nmValue"));
ePF(Dim[0], obj.getAttribute("cdValue"));
}
eGO(NmField).select();
SelBROWSER.style.display = 'none';
return eClearEvent();
default:
}
}
}
function _SelBrowserClick(){
var NmField = SelBROWSER.children[0].getAttribute("uField"),
Obj = S.event(window);
if( Obj.tagName=='TD' ) Obj = Obj.parentNode;
if( Obj.tagName=='TR' ) if( Obj.cells[0].textContent!="..." ){
ePF(NmField, Obj.cells[0].textContent, 0);
_SelBrowseSet(NmField, Obj.rowIndex);
SiguienteCampo(NmField);
}
return S.eventClear(window);
}
function _SelBrowseOut(){
}
function _SelBrowseHide(){
SelBROWSER.style.display = 'none';
}
