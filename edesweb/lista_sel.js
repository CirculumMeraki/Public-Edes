var _Fila = _oTR = null,
_Celda = _oTD = null,
_Columna=[], _ValCol=[], _aTR=[],
_NumCol=[], _NomCol=[],
_vF=[], _oF=[],
_WL = ''+window.location,
_WasPulse = null;
function SePulso(){
if( _WasPulse!=null ){
S(_WasPulse).around(S("#PROCESANDO",window), {hide:true, type:"13,-1"});
_WasPulse = null;
}else if( event==null || ( event.type!='click' && event.type!='contextmenu' ) ){
S(document.body).around(S("#PROCESANDO",window), {type:"14"});
}else{
var o = S.event(window)
S(o).around(S("#PROCESANDO",window), {hide:true, type:"13,-1", point:(o.tagName=="TD")});
}
}
function eHideBusy(){
S("#PROCESANDO",window).none();
}
function SePulsoOff(){ eHideBusy(); }
function _GetNumCol(){
var cmp;
_NumCol['0'] = '';
S("#BROWSE TH[nc]").each(function(k,o){
cmp = S(o).attr("campo,nc");
_NumCol[cmp["campo"]] = cmp["nc"];
_NomCol[cmp["nc"]] = cmp["campo"];
if( cmp["campo"][0]=="*" ){
cmp["campo"] = S.left(cmp["campo"],1,0);
_NumCol[cmp["campo"]] = cmp["nc"];
_NomCol[cmp["nc"]] = cmp["campo"];
}
});
}
function eGF(NomCampo, el){
if( _NumCol['0']==undefined ) _GetNumCol();
if( event!=null || el!=undefined ){
var Obj = (el==undefined) ? _Celda : el;
if( Obj==undefined ) Obj = S.event(window);
if( Obj.tagName=='IMG' || Obj.tagName=='I' || Obj.tagName=='BUTTON' ) Obj = Obj.parentNode;
if( Obj.tagName=='DIV' ){
var iCode = S.eventCode(event);
Obj = _RowEdit;
if( !event.shiftLeft ){
if( iCode==40 || iCode==13 || iCode==9 ){
if( _RowEdit.rowIndex<BROWSE.rows.length-1 ){
if( BROWSE.rows[_RowEdit.rowIndex+1].className!='PieLista' ) Obj = BROWSE.rows[_RowEdit.rowIndex+1];
}
}else if( iCode==38 ){
if( _RowEdit.rowIndex>parseInt(BROWSE.AltoTH)+1 ) Obj = BROWSE.rows[_RowEdit.rowIndex-1];
}
}else if( iCode==9 ){
Obj = BROWSE.rows[_RowEdit.rowIndex-1];
}
}
}else{
var Obj = _Celda;
}
if( Obj.tagName=='IMG' || Obj.tagName=='I' ) Obj = Obj.parentNode;
if( Obj.tagName=='TD' ) Obj = Obj.parentNode;
if( NomCampo.indexOf('+')!=-1 ){
var tmp = NomCampo.split('+'); txt = '', n;
for(n=0; n<tmp.length; n++){
tmp[n] = eTrim(tmp[n]);
if( tmp[n].substring(0,1)=='"' || tmp[n].substring(0,1)=="'" ){
txt += tmp[n].substring(1,tmp[n].length-1).replace(/^\s+/g,'').replace(/\s+$/g,'');
}else{
txt += eTrim(Obj.cells[_NumCol[tmp[n]]].textContent);
}
}
return eTrim(txt);
}
if( NomCampo=='' ) return '';
try{
if( S(BROWSE.children[0].children[_NumCol[NomCampo]]).attr("te")=='T' && '+,-,*,'.indexOf(S(BROWSE.children[0].children[_NumCol[NomCampo]]).attr("td"))>-1 ){
return S.thousandsClear(Obj.cells[_NumCol[NomCampo]].textContent);
}else{
return eTrim(Obj.cells[_NumCol[NomCampo]].textContent);
}
}catch(e){
alert(NomCampo+' / eGF', _Source, -1, eGF);
}
}
function ePF(n, v, c){
var Obj = _Celda;
if( Obj.tagName=='IMG' || Obj.tagName=='I' ) Obj = Obj.parentNode;
if( Obj.tagName=='TD' ) Obj = Obj.parentNode;
if( _NumCol['0']==undefined ) _GetNumCol();
var attr = S(".BROWSE THEAD TH[nc='"+_NumCol[n]+"']").attr("td,nd,te");
if( (attr["td"][0]=="+" || attr["td"][0]=="-") && Obj.cells[_NumCol[n]].offsetWidth>0 ){
v = S.thousands(v, attr["nd"]);
}
Obj.cells[_NumCol[n]].textContent = v;
}
function _PutSerial(NmCampo, Valor, nc){
if( _NumCol['0']==undefined ) _GetNumCol();
var c=_NumCol[NmCampo];
try{
if( BROWSE.children[0].children[c].te=='T' && '+,-,'.indexOf(BROWSE.children[0].children[c].td)>-1 ){
Valor = eShowThousands( Valor, BROWSE.children[0].children[c].nd );
}
_FilaLastInsert.cells[c].textContent = Valor;
}catch(e){
alert( NmCampo+' / ePF', _Source, -1, _PutSerial );
}
}
function eGCol(NomCampo){
return S.colNumber(NomCampo);
}
function nC(n){ return eGCol(n); }
function LstSetup(Op){
var Obj = DGI('LstSetup');
if( Obj!=null ){
Obj.children[(Op)?0:1].style.display = 'none';
Obj.children[Op].style.display = 'block';
}
_PagIncremental = Op;
if( Op==1 ){
if( DGI("TIPO").value!='P' ) PagReg(DGI("TIPO"));
if( DGI("DESDE").value>1 ) Paginar('I');
_PagIncremental = true;
MovTitulos();
if( document.body.scrollHeight<=document.body.clientHeight ) Paginar('>',1);
}
}
function _PagNormal(){
if( event && S(S.event(event)).class("?OFF") ) return;
var Obj = DGI('LstSetup');
if( Obj!=null ){
Obj.children[0].style.display = 'block';
Obj.children[1].style.display = 'none';
}
_PagIncremental = false;
}
var _AnchoCols = [], _AnchoTable;
function _PaginarFull(tipo){
if( _PaginarFullFilter ) return;
var TR = S("#BROWSE TR").dim,
TotalReg = TR.length,
MaxRec = sMaxRec = DGI('MAXREC').value*1,
Desde = DGI('DESDE').value*1, n;
if( tipo=='?' ) Desde = parseInt(DGI('DESDE')["OldValue"]);
var oTable = DGI("BROWSE"),
vDesde = parseInt(oTable.getAttribute("vDesde")),
vHasta = parseInt(oTable.getAttribute("vHasta")),
AltoTH = parseInt(oTable.getAttribute("AltoTH"))+1;
if( isNaN(vDesde) ) vDesde = 0;
_AnchoTable = oTable.offsetWidth;
try{
S("#BROWSE THEAD TH[nc]").each(function(k,o){
_AnchoCols[k] = o.offsetWidth;
});
}catch(e){}
try{
for(n=vDesde; n<=vHasta; n++){
TR[n].style.display = 'none';
}
if( S(".CONTENEDORCARD").length>0 ){
S(".CONTENEDORCARD .card").each(function(k,o){
o.style.display = "none";
});
}
}catch(e){}
if( _cDeslizante>0 ){
var oDestino = S("#TablaTV TR").dim;
if( oDestino.length>0 ){
try{
for(n=vDesde-AltoTH; n<=vHasta-AltoTH; n++){
oDestino[n].style.display = 'none';
}
}catch(e){}
}
}
switch(tipo){
case 'I':
Desde = 1;
break;
case '<':
Desde--;
break;
case '>':
Desde++;
break;
case 'F':
Desde = DGI('HASTA').value*1;
break;
case '?':
Desde = DGI('DESDE').value*1;
break;
case 38:
break;
case 40:
break;
case 80:
break;
case 27:
break;
}
MaxRec = sMaxRec;
vDesde = (Desde-1)*MaxRec;
if( vDesde>=TotalReg ) vDesde = TotalReg-1;
vDesde += AltoTH;
oTable.setAttribute("vDesde", vDesde);
for(n=vDesde; n<TotalReg; n++){
TR[n].style.display = '';
vHasta = n;
if( --MaxRec<1 ) break;
}
oTable.setAttribute("vHasta", vHasta);
if( S(".CONTENEDORCARD").length ){
MaxRec = sMaxRec;
S(".CONTENEDORCARD .card").each(function(k,o){
if( k>=vDesde ){
o.style.display = "";
if( --MaxRec<1 ) return null;
}
});
}
try{
n = 0;
S("#BROWSE TH[nc]").each(function(k,o){
if( _AnchoCols[k]>o.offsetWidth ){
o.style.width = px(_AnchoCols[k]);
n = 1;
}
});
if( n>0 ) Recalcula();
}catch(e){}
if( _cDeslizante>0 ){
if( oDestino.length>0 ){
S("#TablaTV").css("width:auto");
S("#TablaTV TABLE").css("width:auto");
MaxRec = sMaxRec;
for(n=vDesde-AltoTH; n<TotalReg-AltoTH; n++){
oDestino[n].style.display = '';
oDestino[n].style.height = px(TR[n].offsetHeight);
for(i=0; i<_cDeslizante; i++){
oDestino[n].cells[i].style.width = px(TR[n].cells[i].offsetWidth);
}
if( --MaxRec<1 ) break;
}
var xy = S("#BROWSE TBODY").xy(),
s = S.scrollGet(document.body);
S("#TablaTV").css({top:xy.y, left:s["scrollLeft"]});
var oDestino = S("#TablaTE TABLE TH").dim;
if( oDestino.length>0 ){
S("#TablaTE").css("width:");
S("#TablaTE TABLE").css("width:");
var oOrigen = S("#BROWSE THEAD TH").dim, ancho=-2, padding=0;
for(n=0; n<_cDeslizante; n++){
i = oOrigen[n].offsetWidth;
oDestino[n].style.width = px(i);
ancho += i;
if( padding==0 ){
padding = S(oOrigen[n]).cssVal("paddingLeft")+S(oOrigen[n]).cssVal("paddingRight");
}
}
S("#TablaTE").css("width:"+S("#TablaTV").obj.offsetWidth);
}
}
}
DGI('DESDE').value = Desde;
DGI('DESDE')["OldValue"] = Desde;
if( DGI("oDESDE")!=null ) DGI("oDESDE").value = Desde;
if( DGI('_Pie')!=null ) DGI('_Pie').textContent = Desde;
PaginationBarCalc();
if( top.eIsWindow(window) ) top.eSWIResize(window,document.body.scrollWidth );
if( S("#MENUTRFLOAT").length ) S("#MENUTRFLOAT").hidden();
return true;
}
function _PaginarFilter(pk){
S(":_Filter_View_").val(pk);
S("#BROWSE TBODY TR").each(function(k, o){
o.style.display = (o.cells[0].innerText==pk) ? "table-row":"none";
});
S("body").scrollSet(BROWSE);
}
function Paginar(tipo, PagIncr){
if( event && S(S.event(event)).class("?OFF") ) return;
if( DGI("HASTA")==null ){
eHideBusy();
return;
}
var r = S(":HASTA.TPAG");
if( r==1 && tipo!='R' && S(".PaginationBar").length==0 ){
eHideBusy();
return;
}
S.info();
if( tipo!='R' ){
if( (tipo=='I' || tipo=='<' ) && DGI("DESDE").value==1 ){
top.S.info();
S("body").tip(eLng(107), 3);
return;
}
if( (tipo=='F' || tipo=='>' ) && DGI("DESDE").value==r ){
top.S.info();
S("body").tip(eLng(108), 3);
return;
}
}
if( _MAXRECFULL && tipo!='R' ){
eClearEvent();
return _PaginarFull(tipo);
}
eVisitedGet();
var txt = escape(DGI('BROWSE').getAttribute("FiltroTabla")),
d = location.href+'';
if( typeof(_dDir)!='undefined' ) d = d.replace(_oDir,_dDir);
if( txt!='' ){
if( d.search('&_FILTER=')==-1 ) d += '&_FILTER='+txt;
if( d.search('&_AUX_=')==-1 ) d += '&_AUX_='+_Aux;
if( d.search('&_SEL_=')==-1 ) d += '&_SEL_='+_Sel;
}
if( tipo=='R' ){
DGI("TIPO").value = 'P';
DGI("DESDE").value = 0;
if( DGI("oDESDE")!=null ) DGI("oDESDE").value = 0;
if( !_MAXRECFULL ) tipo = '>';
nPagina = 0;
}
var nPagina = DGI("TIPO").value+tipo+(DGI("DESDE").value-1);
if( !_MAXRECFULL ){
if( d.search('&_REG_=')==-1 ){
d += '&_REG_='+nPagina;
}else{
var i = d.search('&_REG_='),
f = d.indexOf('&',d.search('&_REG_=')+1),
old = (f==-1) ? d.substring(i) : d.substring(i,f);
d = d.replace(old, '&_REG_='+nPagina);
}
}
if( DGI('MAXREC')!=null ) d += '&_VISIBLE_ROWS_=' + DGI('MAXREC').value;
if( _MAXRECFULL && tipo=='R' ){
DGI("DESDE").value = 0;
if( DGI("oDESDE")!=null ) DGI("oDESDE").value = 0;
tipo = '>';
nPagina = 0;
document.FieldCondi.target = '';
document.FieldCondi.action = d;
document.FieldCondi.submit();
return eClearEvent();
}
SePulso();
if(_Mover){
_Mover = false;
BROWSE.rows[_smFila].className = '';
}
if( typeof(PagIncr)!='undefined' ) d += '&_PAGINCR=1';
if( _eViewCSS!=null ) d += '&_VIEWFORMAT='+_eViewCSS;
S.callCreate(window);
S(":_ORDEN_").val(S(BROWSE).attr("eOrder"));
document.FieldCondi.target = 'TLF';
document.FieldCondi.action = d;
document.FieldCondi.submit();
S("#MasInfo").none();
top.S.info();
}
function eSetFileCache( File ){
if( DGI("PDF")!=null ) S("#PDF").attr("CacheFILE", File+".pdf");
if( DGI("XLS")!=null ) S("#XLS").attr("CacheFILE", File+".xls");
}
function _gsExpor(tipo, NomPDF, Cache, NmPersona){
var txt = escape(S("#BROWSE.FiltroTabla")),n,img,map,g=_listaSVG,
d = location.href+'';
if( txt!='' ) if( d.search('&_FILTER=')==-1 ) d += '&_FILTER='+ txt;
if( tipo.substr(0,1)=='P' ){
img = document.getElementsByTagName('IMG');
for(n=0; n<img.length; n++){
map = S(img[n]).attr("usemap");
if( map ){
if( g!='' ) g+=',';
g += S.mid(map,1,0);
}
}
if( g!='' ) document.FieldCondi._GRAPHS.value = g;
}
var MasParametros = '';
if( _USERFUNCTION!='' ){
try{
MasParametros = eval(_USERFUNCTION)(tipo.substring(0,1));
if( MasParametros!='' ){
document.FieldCondi.action = window.location.href+'&'+MasParametros;
}
}catch(e){ alert('ERROR in function '+_USERFUNCTION); }
}
if( tipo=='P' && DGI('PDF')!=null && S("#PDF.CacheFILE")!=null ) Cache = S("#PDF.CacheFILE");
if( tipo=='X' && DGI('XLS')!=null && S("#XLS.CacheFILE")!=null ) Cache = S("#XLS.CacheFILE");
if( tipo=='M' && DGI('XML')!=null && S("#XML.CacheFILE")!=null ) Cache = S("#XML.CacheFILE");
if( tipo=='A' && DGI('MDB')!=null && S("#MDB.CacheFILE")!=null ) Cache = S("#MDB.CacheFILE");
if( tipo=='T' && DGI('TXT')!=null && S("#TXT.CacheFILE")!=null ) Cache = S("#TXT.CacheFILE");
if( Cache==undefined ){
Cache = '';
}else{
FieldCondi._CACHEFILESRV.value = Cache;
Cache = '&_CACHEFILESRV='+Cache;
}
if( NomPDF==undefined ){
NomPDF = '';
}else{
FieldCondi._FILEPDF.value = NomPDF;
NomPDF = '&_FILEPDF='+NomPDF;
}
FieldCondi._gs_formato_.value = tipo;
S.callCreate(window);
document.FieldCondi.submit();
setTimeout(function(){
document.forms['FieldCondi']._gs_formato_.value = '';
var fo = document.forms['FieldCondi'],c;
for(c=0; c<fo.length; c++){
if( fo[c].name.substr(0,7)=='_E_X_P_' ) S(fo[c]).nodeRemove();
}
}, 250);
}
function __gsExpor(tipo, PER, NmUser){
var view = (typeof(_eViewCSS)=="undefined" || _eViewCSS==null)? "":_eViewCSS;
top.eSWOpen(window, 'edes.php?Fa:$a/d/export_doc.edf&CONFIG='+PER+'&TIPO='+tipo+'&VIEW='+view);
}
function gsExpor(tipo){
if( event!=null && event.ctrlKey ) return false;
S.eventClear(window);
if( tipo!='C' ){
SePulso();
setTimeout(function(){
_enviarSVG(tipo, 1);
},100);
}else{
if( top.DimDivValor['cmp:'+_Source+'|'+_SubMode]==undefined ){
top.DimDivValor['cmp:'+_Source+'|'+_SubMode] = new Array(_iEDes, window, null);
top.eInfo(window, 'Informe memorizado');
}else{
for(var i in top.DimDivValor){
if( i=='cmp:'+_Source+'|'+_SubMode ){
if( top.DimDivValor[i][0]!=_iEDes ){
top.DimDivValor['cmp:'+_Source+'|'+_SubMode][2] = window;
top.eInfo(top,'Calculando Informe de comparación');
top.eSWOpen(window, 'edes.php?E:$lst_cmp.gs', 'Informe de Comparación');
break;
}
}
}
}
}
}
var _oEnviarSVG=[], _listaSVG="";
function _enviarSVG(ini, envia){
if( envia ){
_oEnviarSVG=[];
_listaSVG="";
S(".CHART_SYSTEM").add(".CHART_USER").each(function(pk, o){
if( o.children[0] ){
_oEnviarSVG.push(o.children[0].children[0].children[0].children[0]);
}
});
if( _oEnviarSVG.length==0 ){
setTimeout(function(){
_gsExpor(ini);
},100);
return;
}
}
var svg=null, n;
for(n=0; n<_oEnviarSVG.length; n++){
if( _oEnviarSVG[n] ){
svg = _oEnviarSVG[n];
break;
}
}
if( !svg ){
setTimeout(function(){
_gsExpor(ini);
},100);
return;
}
var canvas = S('<canvas/>').nodeEnd("body").obj,
ctxt = canvas.getContext("2d"),
ancho = S(svg).css("width"),
alto = S(svg).css("height"),
svgURL = (new XMLSerializer()).serializeToString(svg),
img = new Image(ancho, alto);
img.style.visibility = "hidden";
canvas.style.visibility = "hidden";
canvas.width = ancho;
canvas.height = alto;
img.onload = function(){
var t = new Date().getTime();
if( _listaSVG!="" ) _listaSVG += ",";
_listaSVG += t;
ctxt.drawImage(this,0,0);
S.call("edes.php?cluster", {
file: "/_tmp/php/"+_User+"_"+t+".png",
position: 1,
total: 1,
content: canvas.toDataURL("image/png")
}, {
return: function(){
delete _oEnviarSVG[n];
_enviarSVG(ini);
S(canvas).nodeRemove();
}
});
}
img.src = 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
}
function PaginarKey(){
if( DGI('BUSCAR')!=null && S.event(window).name=='BUSCAR' ) return true;
var k = S.eventCode(event);
if( k==8 && !_EdEditList ) return eClearEvent();
var Mas = '';
if( event.altKey ) Mas = 'a';
if( event.ctrlKey ) Mas = 'c';
if( event.shiftLeft ) Mas = 's';
if( k==17 ) return true;
if( ',114,116,122,a39,a37,a8,c53,c65,c69,c72,c79,c76,c73,c85,s121,'.indexOf(','+Mas+k+',')!=-1 ) return eClearEvent();
if( ',93,a36,a37,c81,'.indexOf(','+Mas+k+',')!=-1 ) return eClearEvent(1);
switch( k ){
case 36:
if( !_PagIncremental ) Paginar('I');
break;
case 33:
if( !_PagIncremental ) Paginar('<');
break;
case 34:
if( !_PagIncremental ) Paginar('>');
break;
case 35:
if( !_PagIncremental ) Paginar('F');
break;
case 38:
case 37:
if( DGI("BUSCAR")!=null && DGI("BUSCAR").value.length>0 ) Buscar(DGI("BUSCAR").value,-1);
break;
case 40:
case 39:
if( DGI("BUSCAR")!=null && DGI("BUSCAR").value.length>0 ) Buscar(DGI("BUSCAR").value, 1);
break;
case 80:
if( !_ConImpresora && Mas=='c' ) eClearEvent();
break;
case 27:
if( window.frameElement.CloseEsc ) top.eSWClose(window);
break;
case 112:
S.help(window, event);
break;
default:
if(k>=97 && k<=105 && document.activeElement.tagName!="INPUT"){
k-=96;
if( (DGI("HASTA").value*1)>=k ){
DGI("DESDE").value = (k==1)? 0:k;
Paginar("?");
}
}
}
}
function PaginarRueda(){
var o = S.event(event);
if( S("#BROWSE").attr("eCard")!=1 && S.toTag(o, "DIV", "=className=SELECT")==null && S.toTag(o, "TABLE", "=className=SUBMENU")==null ){
if( S(":DESDE").length>0 && S(":HASTA").val()>1 && S.toTag(o, "TABLE", "=id=BROWSE") ){
Paginar((event.wheelDelta<0)?'>':'<');
return S.eventClear(window);
}
}
return true;
}
if( document.body ){
document.body.onkeydown = PaginarKey;
document.body.onmousewheel = PaginarRueda;
}
function PaginarDesde(xObj, xn){
var n = xn || S.eventCode(event),
obj = xObj || S.event(window),
Char = String.fromCharCode(n);
if( obj.name=="MAXREC" && DGI("oMAXREC")!=null ) DGI("oMAXREC").value = DGI("MAXREC").value;
if( obj.name=="oMAXREC" ){
_VisibleRows = DGI("MAXREC").value = DGI("oMAXREC").value;
CalcTPag(true);
setTimeout(function(){ Recalcula() },1);
}
if( !xn && (( Char>='0' && Char<='9' ) || ( n>=96 && n<=105 ) || n==8 || n==46) ){
return true;
}else if( n==13 || n==9 || n==0 || xn ){
var DESDE = DGI("DESDE"), ultimo;
if( obj.name=="oDESDE" ){
DESDE.value = DGI("oDESDE").value;
DESDE = DGI("oDESDE");
}
if( S(DESDE).attr("OldValue")==DESDE.value && !S.is("MAXREC",obj.name) ) return false;
ultimo = ((DGI("TIPO").value=='R') ? S(":HASTA.TREG") : S(":HASTA.TPAG"))*1;
if( DESDE.value*1<=ultimo && DESDE.value*1>0 ){
}else if( DESDE.value*1==0 ){
DESDE.value = 1;
}else if( DESDE.value*1<1 ){
DESDE.value = 1;
}else{
DESDE.value = 1;
S("body").tip(((DGI("TIPO").value=='R') ? eLng(109) : eLng(110,ultimo)), 3);
}
Paginar("?");
}else if( n>=33 || n<=39 ){
PaginarKey();
}
return eClearEvent();
}
function PagReg(Obj){
if( Obj.value=='R' ){
DGI("DESDE").title = eLng(111);
DGI("TIPO").title  = eLng(112);
DGI("HASTA").title = eLng(113);
DGI("DESDE").value = S(":DESDE.NPAG");
DGI("TIPO").value  = 'P';
DGI("HASTA").value = S(":HASTA.TPAG");
}else{
DGI("DESDE").title = eLng(114);
DGI("TIPO").title  = eLng(115);
DGI("HASTA").title = eLng(116);
DGI("DESDE").value = S(":DESDE.NREG");
DGI("TIPO").value  = 'R';
DGI("HASTA").value = S(":HASTA.TREG");
}
}
function CalcTPag(saltaPaginar){
if( DGI("TIPO").value!='P' ) return;
var reg = DGI("MAXREC").value.replace(/\./g,'')*1, val;
if(reg==0){
val = DGI("MAXREC").getAttribute("bakMAXREC");
DGI("MAXREC").value = val;
DGI("HASTA").setAttribute("TPAG", Math.ceil(_TotalRec/val));
if(DGI("oMAXREC")) DGI("oMAXREC").value = val;
}else if(reg>_TotalRec){
val = _TotalRec;
DGI("MAXREC").value = val;
DGI("HASTA").setAttribute("TPAG", Math.ceil(_TotalRec/val));
if(DGI("oMAXREC")) DGI("oMAXREC").value = val;
}else{
val = Math.ceil(_TotalRec/reg);
}
var vDesde = parseInt(S("#BROWSE").attr("vDesde"));
if( isNaN(vDesde) ) vDesde = 1;
var pagActual = Math.ceil(vDesde/reg)
DGI("DESDE").value = pagActual;
if(DGI("oDESDE")) DGI("oDESDE").value = pagActual;
DGI("HASTA").value = val;
S("#HASTA").attr("TPAG", val);
if(DGI("oHASTA")) DGI("oHASTA").value = val;
if(DGI("_Pie2")) DGI("_Pie2").textContent = val;
if( !saltaPaginar ) Paginar("R");
}
function _PaginationBar(valor, oField, oValue, oBox, label){
if( valor==undefined ){
var o = S.event(window), n=S(o).text(), t=S(":HASTA").attr("TReg")*1;
if( S(o).class("?Activated") && S(o).class("?ButtonIn") ){
return;
}else{
if( S(o).attr("eGroup")!=null ) n = S(o).attr("eGroup")*1;
if( n>t ) n = t;
else if( n<1 ) n = 1;
valor = n;
oField = S(":oDESDE").obj;
oValue = S("*[eSelectSpan='oDESDE'] *[eValue]");
}
}
S(oValue).text(valor);
S(oField).obj.value = valor;
PaginarDesde(oField, valor);
}
function aXLS(){
eClearEvent();
top.UtilXLS( window );
}
function eMarkVisited(o, v){
if( v==undefined && _MarkVisited!='' ) v = _MarkVisited;
o.className = v;
}
var _Seleccionado = false,
_SortTD;
function SeleccionaLinea(){
if( _Seleccionado ){
return eClearEvent();
}
if( DGI('UtilList')!=null && UtilList.contains(S.event(window)) ){
return;
}
var _AUX_= _Aux,
Destino = _Destino,
ObjLlamada,
eObj = S.event(window),
oBROWSE = DGI("BROWSE"),
oTDReal = S.toTag(eObj, "TD", "<id=BROWSE"),
oTH;
if( eObj.tagName=="TCXSPAN" ){
_3CXClear();
S.eventClear(window);
}
if( /^(IMG|I|TCXSPAN)$/.test(eObj.tagName) ) eObj = eObj.parentNode;
if( eObj.tagName=="TD" ){
oTH = S("#BROWSE TH[nc='"+oTDReal.cellIndex+"']");
if( (_3CXList && oTH.attr("TD")=="T") || _3CXCols[oTH.attr("campo")] ){
S.phone(S(oTDReal).text());
return
}
}
if( eObj.tagName!='IMG' && eObj.name!=undefined ) return S.eventClear(window);
if( eObj.getAttribute("te")!=null && /^(?:A|H)$/i.test(eObj.getAttribute("te")) ){
if( _ActivePaginate!=undefined && _ActivePaginate ){
S(eObj).info("La columna no se puede ordenar",3,"ERROR");
return S.eventClear(window);
}
}
if( oTDReal && oTDReal!=eObj){
eObj = oTDReal;
}
if( eObj.tagName=="TD" && eObj.children.length==1 && /^(I|IMG)$/.test(eObj.children[0].tagName) ){
if( eObj.children[0].tagName=='I' && _SortList==eObj.cellIndex ){
MovCampo();
return;
}
if( /^(I|IMG)$/.test(eObj.children[0].tagName) && eObj.children[0].onclick ){
S(eObj.children[0]).eventFire("click");
return;
}
}
var NomTag = eObj.tagName,
ctrl = event && event.ctrlKey;
if( NomTag!='TH' && NomTag!='TD' ){
return eClearEvent();
}
if( !BROWSE.contains(eObj) && !TablaTH.contains(eObj) && !TablaTV.contains(eObj) && !TablaTE.contains(eObj) ){
return;
}
if( NomTag=='TH' && !_NOSORT ){
_SortTD = eObj;
SePulso();
setTimeout(function(){
var sortAsc = !S.is("underline",S(eObj).css("textDecoration")),
type = S(eObj).attr("TD");
if( !type ){
S("#PROCESANDO",window).none();
return;
}else if( type[0]=="-" || type[0]=="+" || type[0]=="*" ){
type = "N";
}else if( type=="F4" ){
type = "D";
}else if( type=="P4" ){
type = "P";
}else if( type=="CDI" ){
type = "CDI";
}else{
type = "S";
}
if( S(oBROWSE).attr("eMultiSort")!=null ) ctrl=false;
S(oBROWSE).sort(S(eObj).attr("nc"), type, sortAsc?"asc":"desc", ctrl, S(":DESDE").length);
if( S(":DESDE").length ){
S(":DESDE").val(0);
Paginar("I");
}
S("#PROCESANDO", window).none();
}, 1);
return;
}
if( NomTag!='TD' ){
return;
}
if( eObj.parentNode.disabled || /^(GR1|GR2|GR3|GR4)$/.test(oTDReal.parentNode.id) ) return eClearEvent();
if( S(oTDReal.parentElement).attr("eDetail")==1 ){
var i = S(oTDReal).css("padding-left"),
ri = oTDReal.parentElement.rowIndex,
tr = oBROWSE.rows,
t = tr.length,
op = tr[ri+1].offsetHeight>0 ? "none":"table-row";
for(n=ri+1; n<t; n++){
if( S(tr[n].cells[0]).css("paddingLeft")>i ){
S(tr[n]).display(op);
}else break;
}
return;
}
if( eObj.colSpan>1 ){
return;
}
if( eObj.parentNode.className=='PieLista' || eObj.parentNode.className=='PieListaGraf' ){
return;
}
if( !_SelectON && !_sJS ){
return;
}
_Celda = _oTD = eObj;
_Fila = _oTR = _Celda.parentNode;
if( TablaTV.contains(_Celda) ){
var Des = 0;
if( _MAXRECFULL ){
var MaxRec = DGI("MAXREC").value*1,
Desde = DGI("DESDE").value*1;
Des = (Desde-1)*MaxRec;
}
S(BROWSE.rows[_Fila.rowIndex+1+Des].cells[0]).eventFire("click");
return;
}
if( S(_Fila).css("textDecorationLine")=="line-through" ){
S.error(eLng(117));
return;
}
SePulso();
_Seleccionado = true;
ePublic(1);
var vTmp = _Fila.cells,
nTmp = eObj.parentNode.parentNode.parentNode.rows[0].cells, n;
if( _NumCol['0']==undefined ) _GetNumCol();
for(n=0; n<vTmp.length; n++){
var sVal = vTmp[n].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'');
if( '*+,-,'.indexOf(_TH_td[n])>-1 ) sVal = sVal.replace(/\./g,'').replace(/\,/g,'.');
_ValCol[_NomCol[n]] = _Columna[n] = _aTR[n] = _vF[_NomCol[n]] = sVal;
_oF[_NomCol[n]] = vTmp[n];
}
if( _sJS && !_ManagementON ){
if( !SelecUsu() ){
eHideBusy();
_Seleccionado = false;
return;
}
}
if( _SubMode=="l" && !(typeof(_Sel)!="undefined" && _Sel!="") ){
eHideBusy();
_Seleccionado = false;
return;
}
if( _AUX_=='J' && _sJS && !_ManagementON ){
SelecUsu();
eHideBusy();
_Seleccionado = false;
return;
}
if( _AUX_=='C' ){
var Obj = eObj.parentNode.children, i;
for(i=0; i<Obj.length; i++) Obj[i].textContent = Obj[i].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'');
S.ppublic(window, 1);
if( _SelFunc!='' ){
eval(_SelFunc);
}else{
Rellena(DimObj, Obj);
}
S.ppublic(window);
_WOPENER.document.body.focus();
top.eSWClose(window);
oBROWSE.onclick = null;
_Seleccionado = false;
return eClearEvent();
}
if( _AUX_=='S' ){
var Obj = eObj.parentNode.children;
ObjLlamada = Destino;
var control = eval('window.frameElement.WOPENER.'+ObjLlamada);
if( control.tagName=='SELECT' ){
control.children[0].value = Obj[0].textContent;
control.children[0].textContent = Obj[1].textContent;
if( control.style.width==0 ){
control.style.width = "300px";
control.style.width = '';
}
}else{
control.value = eval('Obj[0].textContent');
Destino = Destino+'';
var tmp = Destino.split('.');
if( eval('window.frameElement.WOPENER.'+tmp[0]+'._'+tmp[1])=='[object]' ) eval('window.frameElement.WOPENER.'+tmp[0]+'._'+tmp[1]).value = Obj[1].textContent;
if( eval('window.frameElement.WOPENER.'+tmp[0]+'.__'+tmp[1])=='[object]' ) eval('window.frameElement.WOPENER.'+tmp[0]+'.__'+tmp[1]).value = Obj[1].textContent;
}
var Obj = eval('window.frameElement.WOPENER.'+ObjLlamada);
if( Obj.onchange!=null && control.tagName=='SELECT' ){
var txt = Obj.onchange + '';
if( txt.length > 0 ){
txt = txt.replace('function anonymous()','');
txt = txt.replace('{','');
txt = txt.replace('}','');
var DimFunc = txt.split(';');
for(var y=0; y<DimFunc.length; y++){
txt = DimFunc[y];
if( txt.search('this') > -1 ){
txt = 'javascript:{window.frameElement.WOPENER.' + txt.replace( 'this', '"'+ObjLlamada+'"' )+';}';
}else{
txt = 'javascript:{window.frameElement.WOPENER.' + txt +';}';
}
try{
eval( txt );
}catch( e ){
alert(e+'\n'+txt);
}
}
}
}
top.eSWClose(window);
oBROWSE.onclick = null;
_Seleccionado = false;
return;
}
if( !_SelectON ){
_Seleccionado = false;
return;
}
var Buscar = eObj.parentNode.parentNode.parentNode.getAttribute("SeekCampos");
if( Buscar==undefined ){
eHideBusy();
_Seleccionado = false;
return eClearEvent();
}
var Dato = Buscar.split(','),
Obj = eObj.parentNode.cells,
txt = valor = Celda = sTxt = '', i, dimValor=[];
if( Buscar.length>0 ){
for(i=0; i<Dato.length; i++){
Celda = Dato[i].split(':');
valor = eTrim(Obj[ Celda[1] ].textContent);
dimValor.push("'"+valor+"'");
if( txt.length>0 ) txt += '&';
if( '*+,-,'.indexOf(_TH_td[Celda[1]])>-1 ) valor = valor.replace(/\./g,'').replace(/\,/g,'.');
txt += Celda[0]+"='"+valor+"'";
if( Celda[0]==' '+_GetCampo ){
sTxt = '_WOPENER.document.FRM1.'+_GetCampo;
try{
eval(sTxt).value = valor;
}catch( e ){
alert(e+'\n'+sTxt+'.value = valor;');
}
}
}
}
if( _GetCampo!='#' ){
alert('Error:594');
_Seleccionado = false;
return;
}
if( typeof(_OptionsInListFunction)=="function" ){
_OptionsInListFunction(_Fila, dimValor, S.mid(S.mid(_InSubWinURL,"?",":"),1,1));
return;
}
var stxt = _WL;
_ManagementON = false;
try{
if( _Action!=undefined ) if( _Action.indexOf('&_PSOURCE=')>0 ) stxt = _Action;
}catch(e){}
if( _CambiaURL_ ) stxt = stxt.replace(_oDir, _dDir);
if( typeof(_InSubWin)!="undefined" && _InSubWin ){
if( _InSubWinURL[0]=="-" ){
ePublic(1);
eval(_InSubWinURL.substr(1)+"(_Fila,"+dimValor.join(",")+")");
SePulsoOff();
_Seleccionado = false;
return;
}
stxt = "/"+"/"+_InSubWinURL;
}
var v = stxt.search('edes.php')+9, dir = '';
if( stxt.search('&')>0 ) stxt = stxt.substring(0, stxt.search('&'));
stxt = stxt.replace(/\//g,'/');
for(var n=v; n>0; n--){
if( stxt.substring(n,n+1)=='/' ){
dir = stxt.substring(n+1,stxt.length);
n = -1;
}
}
if( _WL.indexOf('_PERSISTENTDB=')>0 ){
var pi = _WL.indexOf('_PERSISTENTDB='),
pf = _WL.indexOf('&',pi+1);
if( pf > 0 ){
dir += '&'+_WL.substr( pi, pf-pi );
}else{
dir += '&'+_WL.substr( pi );
}
}
if( (dir.indexOf(':')+1)==dir.indexOf('=') ){
v = dir.indexOf('=',dir.indexOf(':')+2);
}else{
v = dir.search('=');
}
dir = dir+'&_CONTEXT='+_CONTEXT+'&_SEEK&'+txt;
if( typeof(_InSubWin)!="undefined" && _InSubWin ){
dir += "&_SUBINSERT=1";
}
if( typeof(_SWTitle)=="undefined" ) _SWTitle = "";
var ConCtr = (event && event.ctrlKey) || (typeof(_InSubWin)!="undefined" && _InSubWin);
if( window.name=='IWORK' || _SUBLISTADO_ || _INSUBWIN_ ){
if( null!=DGI('SubVentana') ){
var i = dir.indexOf('?')+2,
op = dir.substr(i,1), pv;
if( _INSUBWIN_ ){
var Ancho=_dEnVentana[0], Alto=_dEnVentana[1],
x=(screen.width-Ancho)/2,
y=(screen.availHeight-Alto)/2;
if( Ancho=="" ) Ancho = null;
if( Alto=="" ) Alto = null;
if( typeof(_PERSISTENTVAR)!='undefined' ) for(pv=0; pv<_PERSISTENTVAR.length; pv+=2) dir += '&'+_PERSISTENTVAR[pv]+'="'+_PERSISTENTVAR[pv+1]+'"';
if( _MarkVisited!='' ) eMarkVisited(_oTR);
top.eSWOpen(window, dir+'&_CLOSE_=1&_PSOURCE='+_Source+((window.name=='_SUBLISTADO')? '&_WSList=1':'')+_TargetUrl, _SWTitle, (op=='m'||op=='b'), Ancho, Alto);
if( _TargetUrl!="" ) eHideBusy();
}else{
if( typeof(_PERSISTENTVAR)!='undefined' ) for(pv=0; pv<_PERSISTENTVAR.length; pv+=2) dir += '&'+_PERSISTENTVAR[pv]+'="'+_PERSISTENTVAR[pv+1]+'"';
if( ConCtr ){
clearSelection();
if( _MarkVisited!='' ) eMarkVisited(_oTR);
var NewPag = top.eSWOpen(window, dir+'&_CLOSE_=1&_PSOURCE='+_Source, _SWTitle, (op=='m'||op=='b'));
}else{
top.eLoading(true,window);
location.href = S.accessHref(window, dir+'&_FORMBUTTONS='+_FORMBUTTONS+'&_PSOURCE='+_PSOURCE);
eHideBusy();
}
}
_Seleccionado = false;
return;
}
}
if( typeof(_PERSISTENTVAR)!='undefined' ) for(var pv=0; pv<_PERSISTENTVAR.length; pv+=2) dir += '&'+_PERSISTENTVAR[pv]+'="'+_PERSISTENTVAR[pv+1]+'"';
try{
if( SubVentana.src!=undefined && SubVentana.src.indexOf('_1.') > 0 ) ConCtr = true;
}catch(e){}
if( ConCtr ){
clearSelection();
v = (dir.indexOf(_Source)>-1 )?'&_CLOSE_=1':'';
if( typeof(_SWTitle)=="undefined" ) _SWTitle = "";
top.eSWOpen(window, dir+v+'&_PSOURCE='+_Source+_TargetUrl, _SWTitle, (op=='m'||op=='b'));
}else{
top.eLoading(true,window);
oBROWSE.onclick = null;
if( top.eIsWindow(window) ) window.frameElement.OW = window.frameElement.OH = -1;
location.href = S.accessHref(window, dir+'&_FORMBUTTONS='+_FORMBUTTONS+'&_PSOURCE='+_PSOURCE);
}
_Seleccionado = false;
}
function clearSelection(){
if( document.selection ){
document.selection.empty();
}else if( window.getSelection ){
window.getSelection().removeAllRanges();
}
}
var _SkipTR = false,
_UltimoReg = false;
function SiguienteFila(Dir, Borrar){
_UltimoReg = false;
if( Borrar!=undefined ){
_SkipTR = true;
_Fila.Skipe = 1;
_Fila.style.display = 'none';
MovTitulos();
}
var nFila = _Fila.rowIndex + Dir;
var n = (_FilaConTotales) ? 2 : 1;
if( nFila<1 ){
S("body").tip(eLng(118),3);
}else if( (nFila+n)>BROWSE.rows.length ){
_UltimoReg = true;
S("body").tip(eLng(119),3);
}else{
if( _SkipTR && BROWSE.rows[nFila].Skipe!=undefined ){
SiguienteFila( Dir+((Dir>0)?1:-1) );
}else{
with( top.DGI("zFichaAux") ){
rows[0].style.display = 'block';
rows[1].style.display = 'block';
}
S(BROWSE.rows[nFila].cells[0]).eventFire("click");
}
}
}
var _ManagementON = false;
function _Management(Op, OpTextContent, Obj, OpObj, VarUser){
if( Op==null ) return;
_INSUBWIN_ = true;
_SUBLISTADO_ = 1;
Op = Op.toLowerCase();
_Action = Op;
_CambiaURL_ = false;
_SelectON = true;
switch( Op ){
case "a":
top.eSWOpen(window, 'edes.php?Fa:'+_Source+'&_CLOSE_=1&_PSOURCE='+_Source);
break;
case "m":
case "c":
case "b":
_ManagementON = true;
_WL = '/'+'/edes.php?F'+Op+'R:'+_Source;
var xyWin = top.eXYWindow(window),
xy = eXY(OpObj);
S("body").tip('Seleccionar registro...', 0.5);
break;
default:
Op = Op.toUpperCase();
Obj = S.toTag(OpObj,'TABLE');
if( Obj.DimSelRow[Op][0] ){
_ManagementON = true;
_WL = '/'+'/edes.php?'+Obj.DimSelRow[Op][1];
var xyWin = top.eXYWindow(window),
xy = eXY(OpObj);
S("body").tip('Seleccionar registro...', 0.5);
}else{
Obj.FuncUser(Op.toUpperCase(),"E");
}
}
}
function eManagement(Mode, Type, uFunc){
if( Type=='D' ) return _Management2(Mode,uFunc);
Mode = Mode.toUpperCase();
var Menu = {'-':'Menú'}, n, Op, SelRow, DimSelRow=new Array();
for(n=0; n<Mode.length; n++){
Op = eMid(Mode,n,1);
SelRow = (Op=="_");
if( SelRow ) Op = eMid(Mode,++n,1);
switch( Op ){
case 'I': Menu['a'] = '[g/op_insert.png]_Alta'; break;
case 'D': Menu['b'] = '[g/op_delete.png]_Borrar'; break;
case 'V': Menu['c'] = '[g/op_view.png]_Consultar'; break;
case 'U': Menu['m'] = '[g/op_update.png]_Modificar'; break;
case '-': Menu['~'+n] = ''; break;
default:
if( uFunc==undefined ) break;
var uOp = uFunc(Op,'C');
Menu[Op] = '[g/'+uOp[0]+'.png]_'+uOp[1];
DimSelRow[Op] = [SelRow, uOp[2]];
}
}
var Menu = top.eMenu(window, document.body, Menu, _Management, false, null, false, true),
oTable = Menu.obj;
S(Menu.obj).toScroll();
S(oTable).move(false, S("TH",Menu));
oTable.rows[0].cells[0].style.cursor = 'move';
oTable.setAttribute('FuncUser',uFunc);
oTable.setAttribute('DimSelRow',DimSelRow);
function _Management2(Mode, uFunc){
if( !top.eReadyState(window) ){
setTimeout(function(){_Management2(Mode,uFunc)},10);
return;
}
var oTABLE = document.createElement('TABLE'),
oTR = oTABLE.insertRow(),
Op,n,SelRow;
oTABLE.className = 'SubMenuFoot';
S(oTABLE).css("position:absolute;left:0;top:0;width:100%;zIndex:10");
for(n=0; n<Mode.length; n++){
Separador(oTR);
Op = eMid(Mode,n,1);
SelRow = (Op=="_");
if( SelRow ) Op = eMid(Mode,++n,1);
switch( Op ){
case 'I': oTR.insertCell().appendChild(CreaOp('op_insert','Alta')); break;
case 'D': oTR.insertCell().appendChild(CreaOp('op_delete','Borrar')); break;
case 'V': oTR.insertCell().appendChild(CreaOp('op_view','Consultar')); break;
case 'U': oTR.insertCell().appendChild(CreaOp('op_update','Modificar')); break;
case '-':
Separador(oTR);
oTR.cells[oTR.cells.length-1].className = 'Separator';
break;
default:
if( uFunc==undefined ) break;
var uOp = uFunc(Op,'C');
oTR.insertCell().appendChild(CreaOp( uOp[0], uOp[1], uFunc, SelRow, uOp[2] ));
}
}
Separador(oTR);
with( oTR.insertCell() ){
textContent = '';
style.width = '100%';
}
document.body.appendChild(oTABLE);
setTimeout(function(){
var h = oTABLE.offsetHeight,
scr = S.screen(window);
oTABLE.style.top = (scr["h"]-h-2)+"px";
S(oTABLE).toScroll();
setTimeout(function(){
var t,n,i;
S("TD",oTABLE).each(function(k, o){
o.style.height = (h-2)+"px";
});
if( S("#PAGINA").css("height")>(scr["h"]-h-2) ){
i = S("#BROWSE.AltoTH")*1+1;
t = (DGI("BROWSE").getAttribute("vHasta")!=null) ? DGI("BROWSE").getAttribute("vHasta")*1+i : DGI("BROWSE").rows.length;
if( _MAXRECFULL ){
}else if( DGI("HASTA")!=null ){
}else{
S("body").css("overflow-y:scroll");
}
_VisibleRows = t-2-i;
DGI("MAXREC").value = _VisibleRows;
DGI("BROWSE").setAttribute("vHasta", _VisibleRows+1);
if( DGI("oMAXREC")!=null ) DGI("oMAXREC").value = _VisibleRows;
for(n=t-2; n<t; n++){
DGI("BROWSE").rows[n].style.display = "none";
}
var max = Math.ceil(_TotalRec / _VisibleRows),
nMaxRec = DGI('MAXREC');
if( DGI('_Pie2')!=null ) DGI('_Pie2').textContent = max;
DGI("HASTA").value = max;
DGI("HASTA").setAttribute("TPAG", max);
if( DGI('oHASTA')!=null ){
DGI("oHASTA").value = max;
DGI("oHASTA").setAttribute("TPAG", max);
DGI("oMAXREC").value = _VisibleRows;
}
}
}, 500);
}, (top.eIsWindow(window)) ? 1000:1);
function CreaOp(Img, Label, uFunc, SelRow, url){
var iTABLE = document.createElement('TABLE'),
iTR = iTABLE.insertRow();
iTR.insertCell().innerHTML = '<img src=g/'+Img+'.png>';
iTR.insertCell().innerHTML = Label;
iTABLE.onmouseover = function(){ this.rows[0].cells[0].className=this.rows[0].cells[1].className='ON'; }
iTABLE.onmouseout = function(){ this.rows[0].cells[0].className=this.rows[0].cells[1].className=''; }
if( uFunc==undefined ) iTABLE.onclick = Click;
else iTABLE.onclick = function(){
if( iTABLE.SelRow ){
S.replace(DGI("SubVentana"), 'src', [['_0.','_1.']]);
_CambiaURL_ = false;
_SelectON = true;
_ManagementON = true;
_WL = '/'+'/edes.php?'+url;
var xyWin = top.eXYWindow(window),
xy = eXY(iTABLE);
S("body").tip('Seleccionar registro...', 0.5);
}else uFunc(iTABLE.Op);
}
iTABLE.style.cursor = 'pointer';
iTABLE.Op = eMid(Label,0,1);
iTABLE.SelRow = SelRow;
return iTABLE;
}
function Separador(oTR,w){
with( oTR.insertCell() ){
textContent = '';
style.paddingLeft = '10px';
}
}
function Click(){
var Obj = S.event(window);
if( Obj.tagName!='TABLE' ) Obj = S.toTag(Obj,'TABLE');
_Management(Obj.Op, Obj.textContent, Obj, Obj);
}
}
}
