var _oSelTable = null, _EsteTD, elExist = false,
_SLHeight = null,
_RowEdit=null, _RowExit=false, _CellEdit, _CellSelect;
function eEditListResetCell(){
_CellEdit.innerHTML = _CellEdit.getAttribute("vOld");
EditTD(_CellEdit);
return eClearEvent();
}
function elNextField(oTD){
var aTD = oTD,
attr = S(DGI("BROWSE").children[0].children[oTD.cellIndex]).attr("te,td,long,DCM,Leng,oCAMPO,MAXLENGTH,size");
nTR = oTD.parentNode.rowIndex,
tCol = S("#BROWSE").attr("eCols")*1,
tTR = BROWSE.rows.length,
iTD = oTD.cellIndex,
Ok = false,
nTD = 0;
if( nTR==-1 ) return;
for(nTD=iTD+1; nTD<tCol; nTD++){
if( _CmpAEditar.indexOf(','+BROWSE.children[0].children[nTD].getAttribute("oCAMPO")+',')>-1 && BROWSE.rows[nTR].cells[nTD].offsetWidth>0 ){
Ok = true;
break;
}
}
if( !Ok ){
for(nTD=0; nTD<=iTD; nTD++){
if( _CmpAEditar.indexOf(','+BROWSE.children[0].children[nTD].getAttribute("oCAMPO")+',')>-1 && BROWSE.rows[nTR].cells[nTD].offsetWidth>0 ){
break;
}
}
if( _EditMode==2 ){
if( S.trim(S.left(S(BROWSE.rows[nTR]).text(),0,-1))!="" ){
var stTR = tTR;
if( BROWSE.rows[tTR-1].className=='PieLista' ) stTR--;
if( nTR==stTR-1 ){
elRowNew();
return;
}
}
}
if( _EditMode!=1 ){
while( ++nTR<tTR && BROWSE.rows[nTR].offsetHeight==0 ){}
if( nTR>=tTR || BROWSE.rows[nTR].className=='PieLista' ){
nTR = S("#BROWSE.AltoTH");
while( ++nTR<tTR && BROWSE.rows[nTR].offsetHeight==0 ){}
if( nTR>=tTR || BROWSE.rows[nTR].className=='PieLista' ) return eClearEvent();
}
}
}
elEdit(BROWSE.rows[nTR].cells[nTD]);
}
function _CheckEditMode(oTD){
if( document.activeElement.parentElement.tagName=="HTML" || (_RowEdit!=null && _RowEdit!=oTD.parentElement) ){
if( S("#EditListButtons").width()>0 && S(".TIP").length==0 && !_RowExit ){
_EsteTD = oTD;
S.error("Para salir utilice los botones de la fila.", {function:_editaEsteTD});
}
}
}
function elExit(o, lastKey, evt){
var oTD = o["eParent"];
nVal = o.value,
oCOL = DGI("BROWSE").children[0].children[oTD.cellIndex],
attr = S(DGI("BROWSE").children[0].children[oTD.cellIndex]).attr("te,td,long,DCM,Leng,oCAMPO,MAXLENGTH,size");
if( _EditMode==1 && _RowEdit!=null ){
setTimeout(function(){ _CheckEditMode(oTD); }, 500);
}
if( lastKey==0 && oTD.getAttribute("vOld")==nVal ){
oTD.innerHTML = nVal;
return true;
}
if( oTD.getAttribute("vOld")==nVal && !((attr["Cond"]=='#' && nVal.length==0) || (attr["Cond"]=='=' && attr["Long"]!=nVal.length)) ){
oTD.innerHTML = nVal;
eClearEvent();
elNextField(oTD);
return true;
}
if( _FuncChkEd!='' ){
try{
if( oTD.getAttribute("vOld")!=nVal ){
Res = window[_FuncChkEd](attr["oCAMPO"], oTD.parentNode, oTD.getAttribute("vOld"), nVal, oTD, oTD.cellIndex);
if( Res!='' ){
if( Res.substr(0,1)=='=' ){
nVal = Res.substr(1);
}else{
top.eAlert(S.lng(212), Res, 'A', 'W', function(){
_CellEdit.children[0].value = oTD.getAttribute("vOld");
_CellEdit.children[0].focus();
});
return eClearEvent();
}
}
}
}catch(e){
var txt = 'ERROR in function "'+_FuncChkEd+'()"\n', i;
for(i in e) txt += '\n'+ i+': '+e[i];
top.eAlert(S.lng(212), txt, 'A', 'W');
oTD.innerHTML = oTD.getAttribute("vOld");
return eClearEvent();
}
}
_Celda = oTD;
ePublic();
if( attr["Cond"]=='%' && attr["Long"]!=nVal.length && nVal.length!=0 ){
top.eAlert(S.lng(212), 'Longitud del dato erroneo', 'A', 'W', oTD.children[0]);
oTD.focus();
return eClearEvent();
}
if( (attr["Cond"]=='#' && nVal.length==0) || (attr["Cond"]=='=' && attr["Long"]!=nVal.length) ){
top.eAlert( S.lng(212), 'Falta rellenar el dato', 'A', 'W', oTD.children[0] );
oTD.focus();
return eClearEvent();
}
oTD.innerHTML = nVal;
if( '*,+,-,'.indexOf(attr["td"])>-1 ){
nVal = S.thousandsClear(nVal);
}else if( /^(P4|F4|CDI|T)$/.test(attr["td"]) ){
if( nVal!='' ) nVal = S.dataFormat(nVal, attr["td"], "d");
}
elUpdate(oTD, nVal);
}
function elGetIndice(oTR){
var Indice = '',
tmp = S("#BROWSE").attr("SeekCampos").split(','),
Orden,val,tCol,i;
for(i=0; i<tmp.length; i++){
Orden = tmp[i].split(':');
tCol = BROWSE.children[0].children[Orden[1]].getAttribute("td");
val = oTR.cells[Orden[1]].textContent;
switch( tCol ){
case '+': case '-': case '*':
case '+,': case '-,':
val = eClearThousands(val);
break;
case 'F4':
if( val!='' ) val = top.eDTS(val, "-");
break;
default:
val = eTrim(val);
}
if( Indice!='' ) Indice += ' and ';
Indice += Orden[0]+"='"+(val+"").replace(/\'/g,"\\'")+"'";
}
return Indice;
}
function elUpdate(oTD, nVal){
var Indice = elGetIndice(oTD.parentNode), tmp;
var AddValue = '|';
if( oTD.parentNode.getAttribute('ADDVALUE')!=null ){
AddValue += oTD.parentNode.getAttribute('ADDVALUE');
oTD.parentNode.removeAttribute('ADDVALUE');
}
_CellEdit.setAttribute("vOld", nVal);
if( _EditMode==0 ){
tmp = _DBTABLE+'|'+DGI("BROWSE").children[0].children[oTD.cellIndex].getAttribute("oCAMPO")+"='"+(nVal+"").replace(/\'/g,"\\'")+"'|"+Indice + AddValue + _ScriptEd;
top.eCallSrv(window, 'edes.php?E:$mod_td.gs&'+escape(tmp)+_DBExt);
oTD.style.fontStyle = 'italic';
setTimeout('_RecalcSlideTH()', 750);
eClearEvent();
}
if( nVal=="" ) S(_RowEdit).css("height", _RowEdit.getAttribute("eHeight"));
if( !elExist ){
setTimeout(function(){
elNextField(oTD);
}, 250);
}
elExist = false;
return eClearEvent();
}
function _editaEsteTD(){
elEdit(_EsteTD);
}
function _ultimoCampo(){
elEdit(_CellEdit);
}
function elEdit(xObj){
if( event!=null ){
if( event.ctrlKey && event.button==2 ) return true;
}
if( _RowExit ) return;
var oTD = (xObj==undefined || xObj.tagName==undefined) ? S.event(window) : xObj;
if( oTD.tagName=='IMG' || oTD.tagName=='I' ) oTD = oTD.parentNode;
if( oTD.tagName=='TH' && event && event.type=='click' ){
try{
if( event.type=='click' ) SeleccionaLinea();
}catch(e){}
return true;
}
if( oTD.tagName!='TD' || oTD.disabled || oTD.parentNode.className=='PieLista' || oTD.parentNode.getAttribute("libre")==1 ) return eClearEvent();
var aVal = S.trim(oTD.innerText),
attr = S(DGI("BROWSE").children[0].children[oTD.cellIndex]).attr("te,td,long,DCM,Leng,oCAMPO,MAXLENGTH,size,SF,ConFiltro,eSelMultiple");
if( _CmpAEditar.indexOf(','+attr["oCAMPO"]+',')==-1 ){
if( window.name=="_ISUBLIST" ) opISubList();
try{
if( event.type=='click' ) SeleccionaLinea();
}catch(e){}
return false;
}
if( attr["eSelMultiple"]!=undefined || /^(?:A|H|F|f|P|ICON)$/i.test(attr["te"]) ){
return eClearEvent();
}
if( _EditMode==1 ){
if( _RowEdit==null ){
elMemRec(oTD.parentNode);
S("#EditListButtons").css("left:0;top:0");
S("#EditListButtons").block("flex");
var xy = S.xy(oTD.parentNode),
bt = S.xy(S("#EditListButtons")),
sc = S.screen(window), n;
S(oTD.parentNode).css("height:"+(xy.h+bt.h));
n = (xy.x+xy.w-bt.w-sc.sb);
if( n>(sc.x+sc.w) ){
n = sc.x+sc.w-sc.sb-bt.w;
}
S("#EditListButtons").css("left:"+n+";top:"+(xy.y+xy.h+bt.h-bt.h-5));
}else if( _RowEdit!=oTD.parentNode ){
S.error("Para salir utilice los botones de la fila.", {function:_ultimoCampo});
return false;
}
}
_CellEdit = oTD;
_RowEdit = oTD.parentNode;
BROWSE["UltimoTD"] = oTD;
_RowEdit.setAttribute("eHeight", _RowEdit.offsetHeight);
if( _FuncIniEd!='' ){
_Celda = oTD;
ePublic(1);
if( !eval(_FuncIniEd)(oTD.parentNode, oTD.innerText, oTD.cellIndex) ){
return eClearEvent();
}
}
if( attr["te"]=='SV' || attr["te"]=='S' ){
elSelEdit(attr["oCAMPO"], oTD);
return eClearEvent();
}else if( attr["te"].toUpperCase()=='C' ){
slCheckEdit(attr["oCAMPO"], oTD);
return eClearEvent();
}else if( attr["te"].toUpperCase()=='SS' ){
var txt = attr["oCAMPO"],
tmp = attr["SF"].split('|'),
Filtro = '', ValorActual, n, i;
for(n=0; n<tmp.length; n++){
ValorActual = BROWSE.rows[oTD.parentNode.rowIndex].cells[tmp[n]].getAttribute("v");
if( ValorActual==undefined ) ValorActual = eTrim(BROWSE.rows[oTD.parentNode.rowIndex].cells[tmp[n]].textContent);
txt += '|'+ BROWSE.children[0].children[parseInt(tmp[n])+0].getAttribute("oCAMPO") +'|'+ ValorActual;
if( BROWSE.rows[oTD.parentNode.rowIndex].cells[tmp[n]].getAttribute("v")=='' ){
return eClearEvent();
}
if( Filtro!='' ) Filtro += '|';
Filtro += BROWSE.rows[oTD.parentNode.rowIndex].cells[tmp[n]].getAttribute("v");
}
if( DGI('Sel_'+attr["oCAMPO"]).getAttribute("Filtro")!=Filtro ){
if( attr["ConFiltro"]!=null ) txt += '~'+attr["ConFiltro"];
top.eCallSrv(window, 'edes.php?E:$loadsel.gs&'+escape(txt));
}else{
elSelEdit(attr["oCAMPO"], oTD);
}
return eClearEvent();
}
oTD.setAttribute("vOld", S.trim(oTD.textContent));
var a = S(oTD).css("width"),
txt = "<input size=50 style='"+("*,+,-,".indexOf(attr["td"])>-1 ? "text-align:right;":"")+"width:"+a+"px; background:transparent; border-style:hidden; padding-left:0px !important; padding-right:0px !important'";
if( typeof(_TDato)=="undefined" ){
txt += " onfocus=S.key('"+attr["td"]+"',"+attr["long"]+",0)";
}else{
if( typeof(_TDato[attr["td"]])=="undefined" ){
txt += " onfocus=S.key('"+attr["td"]+"',"+attr["long"]+",0)";
}else{
var td = _TDato[attr["td"]], xChr, MaxLen=attr["long"];
switch( S.upper(td[0]) ){
case 'U':
xChr = S.upper(td[1]);
break;
case 'L':
xChr = S.lower(td[1]);
break;
case 'UL':
case 'LU':
xChr = S.upper(td[1])+S.lower(td[1]);
break;
default:
xChr = td[1];
}
if( xChr[0]=="^" ){
xChr = S.replace(xChr, [
[">"	, S.char(92)+"&gt;"],
[S.char(92), S.char(92)+S.char(92)],
["*"	, S.char(92)+"*"],
["."	, S.char(92)+"."],
["-"	, S.char(92)+"-"]
]);
xChr = S.replace(xChr, " ", S.char(92)+"s");
txt += " onfocus=S.key(/"+xChr+"{0,"+MaxLen+"}$/,"+MaxLen+",0)";
}else{
txt+= " onfocus=S.key("+xChr+","+MaxLen+",0)";
}
}
}
txt += ">";
oTD.innerHTML = "";
var o = S(txt).nodeEnd(oTD).val(aVal);
o.obj["eJumpFunc"] = elExit;
o.obj["eParent"] = oTD;
o.obj.focus();
S.session.lastKey = 0;
return S.eventClear(window);
}
function slCheckEdit(NomField, el){
var oDIV = DGI('Sel_TrueFalse'),
tmp = (location.href+'').split('edes.php'),
EsTrue = (el.innerHTML.toUpperCase().replace(/\"/g,'').replace(/\'/g,'').replace(tmp[0].toUpperCase(),'')==BROWSE.children[0].children[el.cellIndex].getAttribute("CheckON").toUpperCase().replace(/\"/g,'').replace(/\'/g,'').replace(tmp[0].toUpperCase(),''));
oDIV.children[0].rows[((EsTrue)?0:1)].cells[1].className = 'SELECTED';
oDIV.children[0].rows[((EsTrue)?1:0)].cells[1].className = '';
oDIV.Obj = el;
oDIV["eParent"] = el;
oDIV.NmField = NomField;
S(el).around(oDIV,{display:"table"});
S(oDIV).modal().on("click",function(){
S(this.eCover).none();
S(this).nodeRemove();
});
_oSelTable = oDIV.children[0];
_oSelTable.Reg = (EsTrue)?0:1;
oDIV["eKeyPress"] = S.mid((document.onkeypress+""), " ", "(");
oDIV["eKeyDown"] = S.mid((document.onkeydown+""), " ", "(");
_CalculatorOFF = true;
document.onkeypress = slCheckKeyPress;
document.onkeydown = slCheckKeyDown;
}
function slCheckPutValue(Obj){
var el = (Obj!=null)? Obj : S.event(window);
if( /^(?:IMG|I|U)$/i.test(el.tagName) ) el = el.parentNode;
if( el.tagName!='TD' ) return;
var oDIV = DGI('Sel_TrueFalse'),
oTD = oDIV["eParent"],
valorDB = S.trim(el.parentNode.cells[0].textContent),
valorTD="", img;
if( (img = S("i,img",el).obj)!=null ){
valorTD = img.outerHTML;
}
if( valorTD!=oTD.innerHTML ){
oTD.innerHTML = valorTD;
elUpdate(oTD, valorDB);
}else{
elNextField(oTD);
}
_CalculatorOFF = false;
document.onkeypress = window[oDIV["eKeyPress"]];
document.onkeydown = window[oDIV["eKeyDown"]];
S(S('#Sel_TrueFalse').obj["Parent"]).nodeRemove();
oDIV.style.display = 'none';
}
function slCheckKeyDown(){
var Obj = _CellEdit,
key = S.eventCode(event),
nCol, NextObj, n, Ok=false, Executa=false,
nFila = Obj.parentNode.rowIndex,
ObjTD = BROWSE.children[0].children[Obj.cellIndex];
if( key==13 || key==121 ){
if( !event.shiftLeft ){
if( _oSelTable.Reg>-1 ){
slCheckPutValue(_oSelTable.rows[_oSelTable.Reg].cells[1]);
}else{
elNextField(_CellEdit);
}
return;
}else{
}
}else if( key==9 ){
if( !event.shiftLeft ){
elNextField(_CellEdit);
S(S('#Sel_TrueFalse').obj["Parent"]).nodeRemove();
S('#Sel_TrueFalse').none();
return;
}else{
}
}else if( key==38 ){
_oSelTable.rows[0].cells[1].className = "SELECTED";
_oSelTable.rows[1].cells[1].className = "";
_oSelTable.Reg = 0;
}else if( key==40 ){
_oSelTable.rows[0].cells[1].className = "";
_oSelTable.rows[1].cells[1].className = "SELECTED";
_oSelTable.Reg = 1;
}else if( key==27 ){
S(S('#Sel_TrueFalse').obj["Parent"]).nodeRemove();
S('#Sel_TrueFalse').none();
return eClearEvent();
}
return true;
}
function slCheckKeyPress(){
var row;
if( (row = S('#Sel_TrueFalse.eKeyExe').indexOf( S.upper(S.char(S.eventCode(event))) ))>-1 ){
slCheckPutValue( DGI('Sel_TrueFalse').children[0].rows[row].cells[1] );
}
return eClearEvent();
}
function elSelEdit(NomField, el){
var oDIV = DGI('Sel_'+NomField);
if( oDIV.children[0].rows.length==0 ){
elNextField(_CellEdit);
return;
}
oDIV.eParent = el;
oDIV.scrollTop = 0;
oDIV.style.display = 'block';
_oSelTable = oDIV.children[0];
_oSelTable.Reg = 0;
oDIV.style.height = px(_oSelTable.offsetHeight+3);
if( oDIV.offsetHeight>document.body.clientHeight ){
var OpXPag = parseInt(document.body.clientHeight/(_oSelTable.rows[0].cells[1].offsetHeight-2))-1;
oDIV.style.height = px((_oSelTable.rows[0].cells[1].offsetHeight-2)*OpXPag+4);
}
oDIV.Reg = -1;
S(el).around(oDIV, {"type":"7,5,11,1,15,16,13,14"});
S(oDIV).modal().on("click", function(){
elSelOFF(this.eCover);
});
var VActual = eTrim(el.textContent),
TR = oDIV.children[0].rows, n;
_oSelTable.Reg = -1;
for(n=0; n<TR.length; n++){
if( eTrim(TR[n].cells[1].textContent)==VActual ){
TR[n].cells[1].className = 'SELECTED';
oDIV.scrollTop = TR[n].offsetTop+TR[n].cells[1].offsetHeight/2-oDIV.clientHeight/2;
_oSelTable.Reg = n;
}else{
if( TR[n].cells[1].className!='' ) TR[n].cells[1].className = '';
}
}
_CalculatorOFF = true;
oDIV["eKeyDown"] = S.mid((document.onkeydown+""), " ", "(");
document.onkeydown = elSelKeyDown;
}
function elSelKeyDown(){
if( _oSelTable==null ) return;
var Obj = _oSelTable.parentNode,
TR = _oSelTable.rows,
key = S.eventCode(event), n;
if( ',38,40,36,35,34,33,'.indexOf(','+key+',')>-1 ){
if( !_oSelTable.Reg || _oSelTable.Reg==-1 ) _oSelTable.Reg = 0;
_oSelTable.rows[_oSelTable.Reg].cells[1].className = '';
if( key==40 && _oSelTable.Reg < _oSelTable.rows.length-1 ) _oSelTable.Reg++;
if( key==38 && _oSelTable.Reg > 0 ) _oSelTable.Reg--;
if( key==36 ) _oSelTable.Reg = 0;
if( key==35 ) _oSelTable.Reg = _oSelTable.rows.length-1;
var OpXPag = parseInt( Obj.clientHeight / TR[0].cells[1].offsetHeight );
if( key==34 && _oSelTable.Reg < _oSelTable.rows.length-1 ){
_oSelTable.Reg += OpXPag;
if( _oSelTable.Reg >= _oSelTable.rows.length ) _oSelTable.Reg = _oSelTable.rows.length-1;
}
if( key==33 && _oSelTable.Reg > 0 ){
_oSelTable.Reg -= OpXPag;
if( _oSelTable.Reg < 0 ) _oSelTable.Reg = 0;
}
_oSelTable.rows[_oSelTable.Reg].cells[1].className = 'SELECTED';
n = _oSelTable.Reg;
Obj.scrollTop = TR[n].offsetTop+TR[n].cells[1].offsetHeight/2-Obj.clientHeight/2;
}else if( key==13 || key==121 ){
if( _oSelTable.Reg>-1 ){
elSelUpdate(_oSelTable.rows[_oSelTable.Reg].cells[1]);
}else{
elNextField(_CellEdit);
elSelOFF(Obj);
}
}else if( key==9 ){
elNextField(_CellEdit);
elSelOFF(Obj);
}else if( key==27 ){
elSelOFF(Obj);
}else{
if( Obj.children[0].getAttribute('Ini') == null ){
Obj.children[0].Ini = 1;
for(n=0; n<TR.length; n++) TR[n].Inicial = TR[n].cells[1].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'').substring(0,1).toUpperCase();
}
var VActual = String.fromCharCode(key).toUpperCase(), Paso = false;
for(n=0; n<TR.length; n++) TR[n].cells[1].className = '';
for(n=_oSelTable.Reg+1; n<TR.length; n++){
if( !Paso && TR[n].Inicial == VActual ){
_oSelTable.Reg = n;
Paso = true;
break;
}
}
if( !Paso ){
for(n=0; n<TR.length; n++){
if( !Paso && TR[n].Inicial == VActual ){
_oSelTable.Reg = n;
break;
}
}
}
TR[_oSelTable.Reg].cells[1].className = 'SELECTED';
Obj.scrollTop = TR[_oSelTable.Reg].offsetTop+TR[_oSelTable.Reg].cells[1].offsetHeight/2-Obj.clientHeight/2;
}
return eClearEvent();
}
function elSelUpdate(oCursor){
function BorraHijos(n){
for(var i=n+1; i<col.length; i++){
if( S(col[i]).attr("SF") && S.is(n,S(col[i]).attr("SF").split("|")) ){
BROWSE.rows[oTR.rowIndex].cells[i].textContent = "";
BROWSE.rows[oTR.rowIndex].cells[i].setAttribute("v","");
BorraHijos(i);
}
}
}
var oTD = oCursor || S.event(window);
if( oTD.tagName!='TD' ) return;
var valorDB = eTrim(oTD.parentNode.cells[0].textContent),
Inner = eTrim(oTD.parentNode.cells[1].textContent),
oDIV = S.toTag(oTD,"SPAN"),
Grabar = !(Inner==eTrim(oDIV["eParent"].textContent));
if( Inner!=eTrim(oDIV["eParent"].textContent) ){
if( _FuncChkEd!='' ){
try{
var attr = S(DGI("BROWSE").children[0].children[oDIV["eParent"].cellIndex]).attr("te,td,long,DCM,Leng,oCAMPO,MAXLENGTH,size");
Res = window[_FuncChkEd](attr["oCAMPO"], oDIV["eParent"].parentNode, oDIV["eParent"].textContent, Inner, oDIV["eParent"], oDIV["eParent"].cellIndex, S(oDIV.children[0]).td(1, oDIV["eParent"].textContent).parentNode.cells[0].textContent, valorDB);
if( Res!='' ){
if( Res.substr(0,1)!='=' ){
top.eAlert(S.lng(212), Res, 'A', 'W');
return eClearEvent();
}
}
}catch(e){
var txt = 'ERROR in function "'+_FuncChkEd+'()"\n', i;
for(i in e) txt += '\n'+ i+': '+e[i];
S.alert({
title:S.lng(212),
icon:'E',
button:"A",
text:txt,
function:function(){
}
});
return eClearEvent();
}
}
_Celda = oDIV["eParent"];
ePublic();
oDIV["eParent"].innerHTML = Inner;
oDIV["eParent"].setAttribute("v", valorDB);
var col = BROWSE.children[0].children,
oTR = oDIV["eParent"].parentNode;
BorraHijos(oDIV["eParent"].cellIndex);
elUpdate(oDIV["eParent"], valorDB);
}else{
elNextField(oDIV["eParent"]);
}
elSelOFF(oDIV);
}
function elSelWheel( oDIV ){
var dir = ((event.detail<0) ? 1 : (event.wheelDelta>0) ? 1 : -1);
oDIV.scrollTop += oDIV.offsetHeight*dir;
return eClearEvent();
}
function elSelOFF(oDIV){
_CalculatorOFF = false;
document.onkeydown = oDIV["eKeyDown"];
S(oDIV["Parent"]).nodeRemove();
S(oDIV).none();
}
function elInsertRec(){
var xTR = "<tr>", pCampo=null, campo,
oTR = S("#BROWSE TBODY").obj.insertRow(),
i = oTR.rowIndex;
S("#BROWSE TH[nc]").each(function(k,o){
xTR += "<td>&nbsp;";
if( pCampo==null && o.offsetWidth>0 && (new RegExp(","+S(o).attr("oCAMPO")+",")).test(_CmpAEditar) ) pCampo = k;
});
S(oTR).HTML(xTR+"</tr>");
oTR = S("#BROWSE TR").dim[i];
document.documentElement.scrollTop = oTR.offsetTop+S("#BROWSE").obj.offsetTop;
setTimeout(function(){
elEdit(oTR.cells[pCampo]);
}, 100);
return oTR;
}
function elRowKill(){
var o = S.event(event, "tr"),
oBrowse = S("#BROWSE"),
pPK = oBrowse.attr("seekcampos").split(":")[1], v;
v = S.trim(o.cells[pPK].innerText);
if( v!="" ) o.cells[pPK].innerText = v*-1;
S(o).none();
if( oBrowse.attr("eKill")==null ) oBrowse.attr("eKill", 0);
oBrowse.attr("eKill", oBrowse.attr("eKill")*1+1);
S(o).attr("eKill", oBrowse.attr("eKill"));
return S.eventClear();
}
function elUnKill(){
var rec=null;
S("#BROWSE TR[eKill]").each(function(k,o){
if( rec==null ){
rec = o;
}else if( S(rec).attr("eKill")<S(o).attr("eKill") ){
rec = o;
}
});
if( rec!=null ){
var oBrowse = S("#BROWSE"),
pPK = oBrowse.attr("seekcampos").split(":")[1], v;
v = S.trim(rec.cells[pPK].innerText);
if( v!="" ) rec.cells[pPK].innerText = v*-1;
S(rec).attr("eKill",null);
S(rec).block("table-row");
}
}
function elRowNew(){
var o = elInsertRec(),
oTD = o.insertCell();
oTD.innerText = "D";
oTD.onclick = elRowKill;
}
function elGrabaTable(){
var def=[], dimTH=[], dimTR=[], datos=[], linea=[], valor, oTD, n,r, tCol, tRow=0, error=false, todo,enviar="",
pPK = S("#BROWSE").attr("seekcampos").split(":")[1];
S("#EditListButtons").none();
document.body.focus();
S("#BROWSE TH[oCAMPO]").each(function(k,o){
def[k] = S(o).attr("nc,td,te,cond,long,oCampo");
dimTH[k] = S(o).html();
});
tCol = dimTH.length;
S("#BROWSE TBODY TR").each(function(k,oTR){
dimTR[k] = oTR;
todo = "";
for(n=0; n<tCol; n++){
valor = S.replace(S(oTR.cells[n]).html(), "&nbsp;","");
if( '*,+,-,'.indexOf(def[n].td)>-1 ){
valor = S.thousandsClear(valor);
if( (valor+"").replace(/[0\.\-]/g, "")=="" ) valor = "";
}else if( /^(P4|F4|CDI|T)$/.test(def[n].td) && valor!='' ){
valor = S.dataFormat(valor, def[n].td, "d");
}else if( def[n].te=="SV" && valor!='' ){
valor = window["Sel_"+def[n].oCampo][valor];
}else{
valor = S.trim(valor);
}
linea[n] = valor;
todo += valor+"";
}
if( todo=="" ) return;
tRow++;
datos[k] = [];
for(n=0; n<tCol; n++) datos[k][n] = linea[n];
valor = S.replace(S(oTR.cells[pPK]).html(), "&nbsp;","");
if( valor[0]=="-" ) return;
for(n=0; n<tCol; n++){
valor = datos[k][n];
if( valor=="" && def[n].cond=="#" && !error ){
error = true;
S.error(S.lng(200,dimTH[n]), {function:function(){
elEdit(oTR.cells[n]);
}});
return null;
}else if( def[n].cond=="%" && !error && valor!="" && valor.length!=def[n].long ){
error = true;
S.error(S.lng(239,dimTH[n]), {function:function(){
elEdit(oTR.cells[n]);
}});
return null;
}
}
});
if( error ){
S("#EditListButtons").block();
return;
}
if( _FuncChkEd!='' ){
try{
for(r=0; r<tRow; r++){
if( enviar!="" ) enviar += "~";
enviar += datos[r].join("|");
for(n=0; n<tCol; n++){
window["$"+def[n].oCampo] = datos[r][n];
}
var res = window[_FuncChkEd](datos[r], dimTR[r], dimTH, def);
if( S.type(res)=="array" ){
pCampo = res[1];
if( (pCampo*1)==pCampo ){
pCampo = dimTR[r].cells[1];
}else{
for(n=0; n<tCol; n++){
if( pCampo==def[n].oCampo ){
pCampo = dimTR[r].cells[n];
break;
}
}
}
res = res[0];
}
if( res!='' ){
S.alert({
title:S.lng(212),
icon:'E',
button:"A",
text:res,
function:function(){
elEdit(pCampo);
}
});
return eClearEvent();
}
}
}catch(e){
var txt = 'ERROR in function "'+_FuncChkEd+'()"\n', i;
for(i in e) txt += '\n'+ i+': '+e[i];
S.alert({
title:S.lng(212),
icon:'E',
button:"A",
text:txt,
function:function(){
elEdit(pCampo);
}
});
return eClearEvent();
}
}else{
for(r=0; r<tRow; r++){
if( enviar!="" ) enviar += "~";
enviar += datos[r].join("|");
}
}
S("#_DATAEDITLIST").val(enviar);
S("#FORMEDITLIST").obj.submit();
}
function elGrabaRec(){
var oTR = _RowEdit, oTD, td, valor, cond, long, error=false, campo,
Indice = elGetIndice(_RowEdit), datos=[], pCampo=null, dimTH=[];
elExist = true;
S("#BROWSE TH[oCAMPO]").each(function(k,o){
campo = S(o).attr("oCAMPO");
if( (new RegExp(","+campo+",")).test(_CmpAEditar) ){
oTD = oTR.cells[S(o).attr("nc")];
if( oTD.offsetWidth>0 ){
if( pCampo==null ) pCampo = oTD;
valor = S(oTD).html();
cond = S(o).attr("cond");
long = S(o).attr("long");
if( valor==null ){
valor = "";
}else{
td = S(o).attr("td");
if( '*,+,-,'.indexOf(td)>-1 ){
valor = S.thousandsClear(valor);
}else if( /^(P4|F4|CDI|T)$/.test(td) && valor!='' ){
valor = S.dataFormat(valor, td, "d");
}
}
if( valor=="" && cond=="#" && !error ){
error = true;
S.error(S.lng(200,S(o).html()), {function:function(){
elEdit(oTD);
}});
return null;
}else if( cond=="%" && !error && valor!="" && valor.length!=long ){
error = true;
S.error(S.lng(239,S(o).html()), {function:function(){
elEdit(oTD);
}});
return null;
}
dimTH[campo] = S(o).html();
datos[campo] = valor;
window["$"+campo] = valor;
}
}
});
if( error ) return S.eventClear();
if( _FuncChkEd!='' ){
try{
var res = window[_FuncChkEd](datos, oTR, dimTH);
if( S.type(res)=="array" ){
pCampo = res[1];
res = res[0];
}
if( res!='' ){
S.alert({
title:S.lng(212),
icon:'E',
button:"A",
text:res,
function:function(){
elEdit(pCampo);
}
});
return eClearEvent();
}
}catch(e){
var txt = 'ERROR in function "'+_FuncChkEd+'()"\n', i;
for(i in e) txt += '\n'+ i+': '+e[i];
S.alert({
title:S.lng(212),
icon:'E',
button:"A",
text:txt,
function:function(){
elEdit(pCampo);
}
});
return eClearEvent();
}
}
S.info(150);
_RowExit = true;
datos["_index_"] = Indice;
datos["_script_"] = _ScriptEd;
datos["_dbtable_"] = _DBTABLE;
S("#EditListButtons").none();
_RowEdit.style.height = "";
_RowEdit = null;
document.body.focus();
setTimeout('_RecalcSlideTH()', 750);
S.call("edes.php?E:$mod_td.gs", datos, {function:function(v){
S.info();
var ok = true;
if( (v*1)==v ){
S.info(237);
var pPK = S("#BROWSE").attr("seekcampos").split(":")[1];
_CellEdit.parentElement.cells[pPK].innerText = v;
}else if( v=="ok" ){
S.info(238);
}else{
ok = false;
_RowExit = false;
S.error(v, {function:function(){
elEdit(_CellEdit);
}});
}
if( ok ){
oTR.style.fontStyle = 'italic';
}
setTimeout(function(){
_RowExit = false;
}, 500);
}});
return S.eventClear();
}
function elMemRec(oTR){
var oTD;
S("#BROWSE TH[oCAMPO]").each(function(k,o){
if( (new RegExp(","+S(o).attr("oCAMPO")+",")).test(_CmpAEditar) ){
oTD = oTR.cells[S(o).attr("nc")];
if( oTD.offsetWidth>0 ){
S(oTD).attr("bakValue", S(oTD).html());
}
}
});
oTR.style.fontStyle = '';
}
function elAnulaRec(){
var oTR = _RowEdit, oTD, txt="";
S("#BROWSE TH[oCAMPO]").each(function(k,o){
if( (new RegExp(","+S(o).attr("oCAMPO")+",")).test(_CmpAEditar) ){
oTD = oTR.cells[S(o).attr("nc")];
if( oTD.offsetWidth>0 ){
S(oTD).html(S(oTD).attr("bakValue"));
txt += S(oTD).html();
}
}
});
txt = txt.replace(/&nbsp;/g,"");
S("#EditListButtons").none();
var pPK = S("#BROWSE").attr("seekcampos").split(":")[1];
if( S.trim(_CellEdit.parentElement.cells[pPK].innerText)=="" ){
S(_RowEdit).nodeRemove();
}else{
_RowEdit.style.height = "";
}
_RowEdit = null;
document.body.focus();
}
