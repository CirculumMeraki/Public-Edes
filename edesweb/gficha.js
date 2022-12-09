var _nSolapa = 1;
function eTabResize(){
S(".SELECT", window).none();
if( DGI('TABGroupInner')==null ) return;
DGI("TABGroupInner").style.height = "1px";
DGI("TABGroupInner").style.height = DGI("TABGroupInner").parentNode.offsetHeight;
if( _TABGroupEmpty=='TABHeader' ) TABGroupEmpty.style.height = (TABHeader.offsetHeight + top.eStyleWidth(S("#TABBodyForm").css("marginTop")))+"px";
}
function _TabMenu(){
var Obj = S.toTag(S.event(window), "TD", 0), n, i=1;
if( Obj.tagName!='TD' || S(Obj).attr("nOp")==undefined || Obj.parentNode.disabled ) return;
for(n=0; n<TABMenu.rows[0].cells.length; n++){
if( S(TABMenu.rows[0].cells[n]).attr("nOp")!=undefined ){
TABMenu.rows[0].cells[n].className = 'TABMenuOff';
DGI('TABNumber'+i).style.display = 'none';
i++;
}
}
if( DGI('edMENUS')!=null ){
if( DGI('edMENUS').style.display=='block' ) edSave();
}
Obj.className = 'TABMenuOn';
i = Obj.parentNode.rowIndex+1;
S(".AddButton[eTabView]").none();
S(".AddButton[eTabView*=',"+i+",']").block("table");
if( DGI('HOJAzona')!=null ) DGI("HOJAzona").style.display = (_ZoneHide[i])?'none':'block';
if( _ZoneHide[i] ) DGI('TABBodyForm').style.height = _ZoneHideHeight[i];
DGI('TABNumber'+i).style.display = 'block';
if( !_WinCaption ){
if( S(".WINDOWTITLETEXT").length ){
S(".WINDOWTITLETEXT").html(_DimTITLE[i]);
}else{
S("#TABHeaderTitle").html(_DimTITLE[i]);
}
}else{
top.eSWSetCaption(window, _DimTITLE[i]);
}
_nSolapa = Obj.parentNode.rowIndex+1;
eTabResize();
if( Obj.getAttribute("Func") ) eval(Obj.getAttribute("Func"))();
SetControl(_nSolapa);
xFRM = "FRM"+_nSolapa;
eClearEvent();
_eTabOnClick(_nSolapa);
}
function PonSolapa(a){
if( a==_nSolapa || Hojas[a]==0 ) return;
if( DGI('edMENUS')!=null ){
if( DGI('edMENUS').style.display=='block' ) edSave();
}
var sa = a, p, n;
DGI('TABNumber'+_nSolapa).style.display = 'none';
DGI('TABNumber'+a).style.display = 'block';
S(".AddButton[eTabView]").none();
S(".AddButton[eTabView*=',"+a+",']").block("table");
if( _Zona && (_nSolapa==1 || a==1) ) AnulaFRM1( ( _nSolapa==1) );
TABMenu.rows[a-1].cells[0].className = 'TABMenuOn';
TABMenu.rows[_nSolapa-1].cells[0].className = 'TABMenuOff';
if( !_WinCaption ){
if( S(".WINDOWTITLETEXT").length ){
S(".WINDOWTITLETEXT").html(_DimTITLE[a]);
}else{
S("#TABHeaderTitle").html(_DimTITLE[a]);
}
}else{
top.eSWSetCaption(window, _DimTITLE[a]);
}
_nSolapa = sa;
if( DGI('HOJAzona')!=null ) DGI("HOJAzona").style.display = (_ZoneHide[_nSolapa])?'none':'block';
if( _ZoneHide[_nSolapa] ) DGI('TABBodyForm').style.height = _ZoneHideHeight[_nSolapa];
eTabResize();
if( TABMenu.rows[sa-1].cells[0].Func ) eval(TABMenu.rows[sa-1].cells[0].Func)();
SetControl(_nSolapa);
xFRM = "FRM"+_nSolapa;
_eTabOnClick(_nSolapa);
}
function eTabFocus(a){ PonSolapa(a); }
function _eTabOnClick(n){
if( S(".ISubList", DGI('TABNumber'+_nSolapa)).length>0 ){
S(".ISubList", DGI('TABNumber'+_nSolapa)).each(function(k,o){
var padre = S.screen(o),
hijo = S.screen(S("#BROWSE", o.contentDocument.body).obj);
if( padre.w<hijo.w || padre.h<hijo.h ){
o.contentDocument.body.style.overflow = "auto";
if( S(o).attr("eFixHeight")==null ){
o.style.height = (hijo.h+S.setup.scrollWidth)+"px";
}
if( S(o).attr("eFixWidth")==null ){
o.style.width = (hijo.w+S.setup.scrollWidth)+"px";
}
}
});
}
n--;
if( TABMenu.rows[n].ScriptRun!=undefined ){
eval(TABMenu.rows[n].ScriptRun)(n+1);
if( TABMenu.rows[n].ScriptClear!=undefined ) TABMenu.rows[n].ScriptRun = undefined;
}
}
function _nOpTab(vNs){
if( typeof(vNs)=='number' ){
return vNs;
}else{
for(var n=0; n<_NomSolapa.length; n++) if( _NomSolapa[n]==vNs ) return n;
}
alert('ERROR: Solapa no encontrada "'+vNs+'"');
}
function eTabOnClick(vNs, Func, UnaVez){
var ns = _nOpTab( vNs );
if( typeof(TABMenu)!='undefined' ){
TABMenu.rows[ns-1].ScriptRun = Func;
if( UnaVez==undefined || UnaVez ) TABMenu.rows[ns-1].ScriptClear = 1;
}
}
function AnulaFRM1( Op ){
var Hasta = DGI('TABNumber1').sourceIndex, el;
for( var i=0; i<document.FRM1.length; i++ ){
el = document.FRM1.elements[i];
if( el.sourceIndex < Hasta && el.type!=undefined && el.type!='hidden' ){
if( Op ){
if( el.readOnly ){
el.Off = false;
}else{
el.readOnly = true;
el.Off = true;
el.className = 'READONLY';
}
}else{
if( el.Off ){
el.readOnly = false;
el.Off = true;
el.className = 'EDITABLE';
}
}
}else break;
}
}
function eTabShow( vNs, ver ){
var ns =_nOpTab( vNs );
TABMenu.rows[ns-1].style.display = (ver) ? 'table-row' : 'none';
Hojas[ns] = (ver) ? 1 : 0;
if( ver==2 ) PonSolapa(ns);
}
function eTabOff( vNs ){
var ns =_nOpTab( vNs );
TABMenu.rows[ns-1].disabled = true;
}
function eTabOn( vNs ){
var ns =_nOpTab( vNs );
TABMenu.rows[ns-1].disabled = false;
}
function _TabWheel(){
var nf = xFRM.substring(3);
if( event.wheelDelta >= 120 ){
do{
nf--;
if( Hojas[nf] == -1 ) nf = Hojas.length-1;
}while( Hojas[nf] != 1 || TABMenu.rows[nf-1].disabled );
}else if( event.wheelDelta <= -120 ){
do{
nf++;
if( Hojas[nf] == -1 ) nf = 1;
}while( Hojas[nf] != 1 || TABMenu.rows[nf-1].disabled );
}
PonSolapa(nf);
eClearEvent();
}
