function eEvent(){
return S.event(window);
}
function eEventClear(){
return S.eventClear(window);
}
var W = window,
WE	= top,
WO	= window.open,
DB	= document.body,
DGT	= document.getElementsByTagName;
var _WType = 1,
_ErrMensaje = '',
_ErrCampo = '',
_ErrForm = -1,
_ErrorOut = -1,
_ViewFIELDS = false,
_CHR = new Array(),
_Filtrar = false,
_CampoFoco = null,
_SubListaHija = false,
_SinCargar = false,
_DimRelationFields = new Array(),
_CheckIndex = false,
_FocusLast = null,
_ISubListTotal = 0,
_DCT_SUFFIX = '',
_OnLoadCallSrv=false,
_SubListGetRecords = false,
_SearchConditions = false,
_SSMemory = new Array(),
_WithAccents = new Array(),
_UpdateToView = false,
_SelectMultiple = false,
_SelectMultipleField = new Array(),
_RecalcOptionsInList = false,
_TabListType = "L",
_TabListON = false;
function _CallSrv( url ){
top.eCallSrv( window, url );
}
function eTron(){
}
function eClearEvent(men){
return S.eventClear(window, window.event);
}
var HojasV = 0,
_Action = '',
_AccionSeek = ',cR,bR,mR,S,Q,L,',
_Question = (_AccionSeek.indexOf(','+_Accion+',')!=-1),
_SinEdicion = (':cR:bR:'.indexOf(':'+_Mode+':')>-1),
Hojas = new Array(),
_cForm = new Array(),
_cGlobal = new Array(),
_Tipo = new Array(),
_DefCampo = new Array(),
_InFormOnLine = new Array(),
xFRM = 'FRM1',
_ConError = false,
_NomCampo = '',
_MsgSubmit = _MsgSubmitCondi = _MsgSubmitWidth = _MsgSubmitAlign = '',
_FormStaticConect = false,
_SubmitHidden = false,
_ChrNum = '0123456789',
_ChrDni = 'XY',
_ChrNif = 'TRWAGMYFPDXBNJZSQVHLCKE',
_ChrCif = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
_ChrMa  = _ChrCif + '���',
_ChrAcento = '������'+'�����'+'�����'+"��",
_ChrMi  = 'abcdefghijklmnopqrstuvwxyz�������������������',
_ChrFile= 'abcdefghijklmnopqrstuvwxyz.-_',
_ChrColor= '#ABCDEF'+_ChrNum,
_ChrPatterns = '+ *=.:,;_-�@#$%&()/\<>{}[]�!�?';
function _BN(o, el, val){
if( el!=undefined ){
if( el.name && /^_INPUT_/.test(el.name) ) el = el.parentNode;
if( o && val ){
el.style.display = val;
}else{
el.style.display = (o)?'table-row':'none';
}
}else return (o)?'table-row':'none';
}
function _VH(o,el){
if( el!=undefined ){
if( el.name && /^_INPUT_/.test(el.name) ) el = el.parentNode;
el.style.visibility = (o)?'visible':'hidden';
}else return (o)?'visible':'hidden';
}
function _Src(Obj){
for(n=1; n<arguments.length; n+=2) Obj.src = Obj.src.replace('_'+arguments[n]+'.','_'+arguments[n+1]+'.');
}
function _Replace(txt){
for(var n=1; n<arguments.length; n+=2){
var patt = new RegExp(arguments[n], 'g');
txt = txt.replace(patt, arguments[n+1]);
}
return txt;
}
function eView(id,tf,win){
tf = (typeof(tf)=='undefined' || tf)?'table':'none';
if( typeof(id)=='string' ){
if( win!=undefined ) win.DGI(id).style.display = tf;
else DGI(id).style.display = tf;
}else id.style.display = tf;
}
var __HideNotOver;
function _HideNotOver(id){
if( id!=undefined ){
__HideNotOver = id;
document.body.onmousemove = _HideNotOver;
}else{
document.body.onmousemove = null;
if( !DGI(__HideNotOver).contains(S.event(window)) ) eView(__HideNotOver,0);
}
}
function eHideNotOver( id, sg ){ setTimeout('_HideNotOver("'+id+'")',sg*1000); }
function eConcat(){
var txt="", n;
for(n=0; n<arguments.length; n++){
txt += ""+arguments[n];
}
return txt;
}
function UnZipCmp(Cmp){
var i,d;
_cForm = new Array();
_cGlobal = new Array();
for(i=0; i<Cmp.length; i++){
d = Cmp[i].split('|');
if(d[6]=='') d[6] = d[0];
_cForm[i] = {'Nombre':d[0], 'Tipo':d[1], 'PorDefecto':d[2], 'Condicion':d[3], 'Mensaje':d[4].replace(/'/g,'"'), 'Formulario':d[5], 'Label':d[6].replace(/<BR>/gi, ' '), 'Indice':i};
_Tipo[d[0]] = d[1];
_DefCampo[d[0]] = _cForm[i];
}
}
function RecalcField(){
var i=0,n;
for(n in _Tipo) i++;
S("INPUT").each(function(k,o){
if( _Tipo[o.name]==undefined ){
_cForm[i] = {
'Nombre':o.name,
'Tipo':o.getAttribute("tc"),
'PorDefecto':"",
'Condicion':"",
'Mensaje':"",
'Formulario':S.mid(o.form.name,3,0),
'Label':"",
'Indice':i
};
_Tipo[o.name] = o.getAttribute("tc");
_DefCampo[o.name] = _cForm[i];
i++;
}
});
}
function CondGlobal(Condicion, Mensaje, Formulario, Tipo){
this.Condicion	= Condicion;
this.Mensaje	= Mensaje.replace(/'/g,'"');
this.Formulario = Formulario;
this.Tipo		= Tipo;
return this;
}
function Escapar(Obj){
return Obj.replace(/&/g,'&amp;').replace(/\+/g,'&#43;').replace(/</g,'&lt;').replace(/>/gi,'&gt;').replace(/\\/g,'&#92;').replace(/\"/gi,'&quot;').replace(/\'/gi,'&#39;');
}
function Descapar(Obj){
return Obj.replace(/&amp;/g,'&').replace(/&#43;/g,'+').replace(/&lt;/g,'<').replace(/&gt;/gi,'>').replace(/&#92;/g,'\\').replace(/&quot;/gi,'"').replace(/&#39;/gi,"'");
}
function eFormatDate(nTxt, Char, Tipo){
if( Char==undefined ) Char='';
nTxt = nTxt.replace(/-/g,'');
var cTxt='', n;
for( n=0; n<nTxt.length; n++ ){
if( Tipo=='F4' && ( n==2 || n==4 ) ) cTxt += '-';
else if( n==4 ) cTxt += '-';
cTxt += nTxt.charAt(n);
}
if( Char=='-' ){
if( Tipo=='F4' ){
if( cTxt.length==2 || cTxt.length==5 ) cTxt += '-';
}else{
if( cTxt.length==4 ) cTxt += '-';
}
}
return cTxt;
}
function eFormatNumber( nTxt ){
nTxt = nTxt.replace(/\./g,'');
var Num = nTxt.split(','), cTxt='', i=0, Menos = false;
if( nTxt.charAt(0)=='-' ){
Menos = true;
Num[0] = Num[0].replace(/-/g,'');
}
var x = Num[0].length, cadena = "";
while( x>=0 ) cadena += Num[0].charAt(x--);
nTxt = cadena;
for( n=0; n<nTxt.length; n++ ){
if( ++i==4 ){
i = 1;
cTxt = '.'+cTxt;
}
cTxt = nTxt.charAt(n)+cTxt;
}
if( Num.length==2 ) cTxt += ','+Num[1];
return (Menos?'-':'')+cTxt;
}
function eFormatFree( Cadena, Formato ){
var n, Patron, txt = '', c=0;
for( n=0; n<_ChrPatterns.length; n++ ){
Patron = new RegExp('\\'+_ChrPatterns.charAt(n),'g');
Cadena = Cadena.replace(Patron,'');
}
for( n=0; n<Formato.length; n++ ){
s = Formato.charAt(n);
if( '0123456789#AaSHh'.indexOf(s)==-1 ){
txt += s;
}else{
txt += Cadena.charAt(c++);
if( c>=Cadena.length ) break;
}
}
return txt;
}
function eFormat( e, t, nChar, iCampo ){
var Char = String.fromCharCode(nChar);
var v = e.value;
var p = v.length;
var s = t.charAt(p);
var Dim = getCursorPos(e);
if( Dim['start']<p ){
s = t.charAt(Dim['start']);
if( S.setup.modeInsert ){
while( '0123456789#AaSHh'.indexOf(t.charAt(Dim['start']))==-1 ){
Dim['start']++;
putCursorPos(e,Dim['start']);
s = t.charAt(Dim['start']);
}
}else{
if( _ChrPatterns.indexOf(t.charAt(Dim['start']))>-1 ){
Dim['start']++;
s = t.charAt(Dim['start']);
}
t = t.substr(0,Dim['start'])+t.substr(Dim['start']+1);
e.value = eFormatFree( e.value, t );
p = Dim['start'];
putCursorPos(e,Dim['start']);
}
}else{
while( '0123456789#AaSHh'.indexOf(s)==-1 ){
e.value += s;
s = t.charAt(++p);
}
}
var ss = s;
if( '0123456789'.indexOf(s)>-1 ) s = '9';
switch( s ){
case '9':
if( !/^[0-9]{1}$/.test(Char) ) return eClearEvent();
if( Char>ss ) return eClearEvent();
break;
case '#':
case 'A':
case 'a':
if( !/^[a-zA-Z]{1}$/.test(Char) ) return eClearEvent();
if( s!='#' ) Char = (s=='A') ? Char.upper() : Char.lower();
event.keyCode = Char.charCodeAt(0);
break;
case 'H': case 'h':
if( !/^[0-9a-fA-F]{1}$/.test(Char) ) return eClearEvent();
Char = (s=='H') ? Char.upper() : Char.lower();
event.keyCode = Char.charCodeAt(0);
break;
default:
return eClearEvent();
}
if( e.getAttribute('AJump')!=null ){
if( e.maxLength==e.value.length+1 ) setTimeout('SiguienteCampo('+iCampo+')',100);
}
return true;
}
function ePatternDel(){
var nChar = S.eventCode(event), Obj = S.event(window);
var Dim = getCursorPos(Obj);
var p = Dim['start'], f = Dim['end'], Mask,v;
if( nChar==8 ){
eClearEvent();
if( p==0 ) return;
v = Obj.value;
if( Obj.bakValue==undefined ) Obj.bakValue = v;
if( f!=p ) v = v.substr(0,p)+Array(f-p+1).join(' ')+v.substr(p+f-p);
Mask = !(/[A-Z0-9]+/i).test(v.substr(p-1,1));
if( !(Mask && v.replace(/\s+$/g,'').length>p) ){
v = (v.substr(0,p-1)+" "+v.substr(p)).replace(/\s+$/g,'');
}
Obj.value = v;
putCursorPos( Obj, p-1 );
return;
}
if( nChar==46 ){
if( _Question && p==0 && Obj.CopyOf==undefined && '<=>'.indexOf(Obj.value.substr(0,1))>-1 ) return true;
eClearEvent();
v = Obj.value;
if( p==v.replace(/\s+$/g,'').length ) return;
if( Obj.bakValue==undefined ) Obj.bakValue = v;
if( f!=p ) v = v.substr(0,p)+Array(f-p+1).join(' ')+v.substr(p+f-p);
Mask = !(/[A-Z0-9]+/i).test(v.substr(p,1));
if( !(Mask && v.replace(/\s+$/g,'').length-1>p) ){
v = (v.substr(0,p)+" "+v.substr(p+1)).replace(/\s+$/g,'');
}
Obj.value = v;
putCursorPos( Obj, p );
return;
}
if( nChar==13 ){
if( Obj.name.substr(0,11)=='_cnd_value_' ) AceptaFicha();
else SiguienteCampo();
}
}
function ePattern(){
var Obj = S.event(window), Char = oChar = String.fromCharCode(S.eventCode(event));
var Dim = getCursorPos(Obj);
var p = Dim['start'], f = Dim['end'];
var Mask = oMask = Obj.eFormat.substr(p,1);
if( Obj.bakValue==undefined ) Obj.bakValue = Obj.value;
if( p==0 && '<=>'.indexOf(Char)>-1 ){
if( _Question && Obj.CopyOf==undefined ){
_EditCondition(Obj,Char);
return eClearEvent();
}
}
if( f!=p ){
Obj.value = Obj.value.substr(0,p)+Array(f-p+1).join(' ')+Obj.value.substr(p+f-p);
putCursorPos(Obj,p);
}
eClearEvent();
if( p==Obj.maxLength ) return;
var uChar = Char.toUpperCase(), lChar = Char.toLowerCase(), SumaMask = false;
var EsChar = (uChar!=lChar), EsNum = "0123456789".indexOf(Char)>-1;
var EsMask = !EsChar && !EsNum;
if( "0123456789ULulHh#_".indexOf(Mask)==-1 ){
Mask = Obj.eFormat.substr(p+1,1);
SumaMask = true;
}
switch( Mask ){
case 'H':
if( !(/[A-F0-9]+/i).test(oChar) ) return;
Char = uChar;
break;
case 'h':
if( !(/[a-f0-9]+/i).test(oChar) ) return;
Char = lChar;
break;
case 'U':
if( !EsChar ) return;
Char = uChar;
break;
case 'L':
if( !EsChar ) return;
Char = lChar;
break;
case 'u':
if( !EsChar && !EsNum ) return;
Char = uChar;
break;
case 'l':
if( !EsChar && !EsNum ) return;
Char = lChar;
break;
case '#':
if( !EsChar && !EsNum ) return;
break;
case '_':
break;
default:
if( '0123456789'.substr(0,'0123456789'.indexOf(Mask)+1).indexOf(oChar)==-1 ){
if( !(/[A-Z0-9]+/i).test(oChar) ){
Char = '';
}else{
return;
}
}
}
if( SumaMask ) Char = oMask+Char;
if( Obj.value.substr(p,1)!='' ){
Obj.value = Obj.value.substr(0,p)+Obj.value.substr(p+Char.length);
}
Obj.value = Obj.value.substr(0,p)+Char+Obj.value.substr(p);
putCursorPos( Obj, p+Char.length );
return;
}
function ControlTeclado( ExtChr, Saltar ){
var Char = sChar = oChar = cadena = nForm = '',
nChar = nCampo = iCampo = 0,
ChrOk = true, ChrEspecial = false,
Obj = document.activeElement,
tControl = Obj.type,
cKey = '', CntV = (ExtChr!=undefined);
if( Saltar==undefined ) Saltar = false;
if( Obj.NotFilter ){
Char = (CntV) ? ExtChr : String.fromCharCode(S.eventCode(event));
if( !CntV && S.eventCode(event)==13 && tControl!='textarea' ){
iCampo = _DefCampo[Obj.name.replace('[]','')].Indice;
SiguienteCampo( iCampo );
}
return Char;
}
if( Obj.CopyOf!=undefined ){
oChar = Char = (CntV) ? ExtChr : String.fromCharCode(S.eventCode(event));
nChar = CntV ? sChar.charCodeAt(0) : S.eventCode(event);
if( S(Obj).attr("TC")!='CN' ){
iCampo = _DefCampo[Obj.CopyOf.replace('[]','')].Indice;
cKey = _cForm[iCampo].Tipo;
}else cKey = 'CN';
}else{
if( Obj.form==null ) return true;
if( Obj.tagName=='SPAN' && Obj.eLONG!=undefined ) return true;
if( tControl==undefined || tControl=='' ) return false;
if( tControl=='file' && !CntV && S.eventCode(event)!=13 ) return false;
if( Obj.readOnly ) return false;
nForm = Obj.form.name.replace('FRM','');
oChar = Char = (CntV) ? ExtChr : String.fromCharCode(S.eventCode(event));
iCampo = _DefCampo[Obj.name.replace('[]','')].Indice;
cKey = _cForm[iCampo].Tipo;
if( _CHR[cKey]!=undefined && _CHR[cKey][0]=='NOCHECK' ){
tLeng = Escapar(Obj.value).length;
if( Obj._MaxLength > 0 && tLeng+1 > Obj._MaxLength ){
if( !CntV ) event.returnValue = false;
S("body").tip(eLng(35),1);
}
return true;
}
sChar = Char.toUpperCase();
if( !CntV ) if(sChar!=Char) event.keyCode = sChar.charCodeAt(0);
Char = sChar;
nChar = CntV ? sChar.charCodeAt(0) : S.eventCode(event);
nCampo = 0;
iCampo = -1;
if( nChar==42 && Obj.eSQL!=undefined ) return true;
if( _DefCampo[Obj.name.replace('[]','')]==undefined ) return true;
iCampo = _DefCampo[Obj.name.replace('[]','')].Indice;
cKey = _cForm[iCampo].Tipo;
}
if( !CntV ){
if( S.eventCode(event)==13 && cKey.substring(0,1)!='#' ){
SiguienteCampo( iCampo );
return false;
}else if( S.eventCode(event)==10 && event.ctrlKey && cKey.substring(0,1)=='#' ){
SiguienteCampo( iCampo );
return false;
}
if( S.eventCode(event)!=13 ) document.execCommand('Cut');
if( tControl!='text' && tControl!='textarea' && tControl!='password' ){
event.returnValue = false;
return true;
}
}
if( !Saltar && tControl=='textarea' ){
var tLeng = Obj.value.length;
if( cKey.substring(0,1)=='#' ) tLeng = Escapar(Obj.value).length;
if( Obj._MaxLength > 0 && tLeng+1 > Obj._MaxLength ){
if( !CntV ) event.returnValue = false;
S("body").tip(eLng(35),1);
return true;
}
}
if( ':n:d:f:x:#L:'.search(':'+cKey+':')>-1 ){
Char = Char.toLowerCase();
if( CntV ){
nChar = Char.charCodeAt(0);
}else{
event.keyCode = Char.charCodeAt(0);
nChar = S.eventCode(event);
}
}
if( Obj.getAttribute('eFormat')!=null ){
if( _Question && Obj.noConditions==undefined && ('<=>').indexOf(Char)>-1 && Obj.CopyOf==undefined ){
_EditCondition(Obj,String.fromCharCode(nChar));
return eClearEvent();
}else{
eFormat( Obj, Obj.eFormat, nChar, iCampo );
return true;
}
}
switch( cKey ){
case '+':
case '-':
case '+,':
case '-,':
if( Obj.bakValue==undefined ) Obj.bakValue = Obj.value;
if( ('<=>').indexOf(Char)>-1 ){
if( Obj.CopyOf!=undefined ) return eClearEvent();
break;
}
if( S(Obj).attr("DCM")==undefined ) return false;
if( cKey.charAt(0)=='+' && Char=='-' ) return false;
if( S(Obj).attr("DCM")==0 && '.,'.indexOf(Char)>-1 ) return false;
if( oChar=='.' ){
Char = oChar = ',';
if( !CntV ) event.keyCode = Char.charCodeAt(0);
}
if( (_ChrNum+',-').indexOf(Char)==-1 ) return eClearEvent();
var Dim = getCursorPos(Obj), PonCursor = false, v = Obj.value;
var v1=v.charAt(0), v2=v.substring(0,2);
var ConDec = (v.indexOf(',')>-1);
if( Char=='0' && Obj.value=='-0' ) return eClearEvent();
if( Char=='0' && !ConDec && (v1=='0' || v2=='-0') ) return eClearEvent();
if( Char!=',' && ((Dim['start']==1 && v1=='0' ) || (Dim['start']==2 && v2=='-0')) ) return eClearEvent();
if( Char=='-' && v1=='-' ) return eClearEvent();
var n = v.indexOf(',');
if( n > 0 && Char==',' ) return eClearEvent();
if( oChar==',' && v=='' ) Obj.value = '0';
var Dato = Obj.value.split(',');
if( Dato[1]==undefined ) Dato[1] = '';
if( Dim['start']>n && (n >= 0 || Char==',') ){
if( !PonCursor && Dato[1].length >= S(Obj).attr("DCM") ) return eClearEvent();
}else{
if( Dato[0].replace(/\./g,'').length >= Obj.Leng ) return eClearEvent();
}
Dim = getCursorPos(Obj);
if( !Saltar && Dim['start']==Dim['end'] && Dim['start']!=Obj.value.length ){
if( Char==',' && !(n==-1 && Obj.value.length-Dim['end']<=S(Obj).attr("DCM")) ) return eClearEvent();
eInsertAtCursor(Obj, Char);
Char = '';
PonCursor = true;
}else{
Obj.value = Obj.value+Char;
}
Long = Obj.value.length;
Obj.value = eFormatNumber(Obj.value);
if( !Saltar && PonCursor ){
putCursorPos( Obj, Obj.value.length-Long+Dim['start']+1 );
}
event.keyCode = 0;
if( Obj.getAttribute('AJump')!=null ){
if( (S(Obj).attr("DCM")==0 && Obj.maxLength==Obj.value.replace(/\./g,'').length) || (S(Obj).attr("DCM")>0 && Dato[1].length==S(Obj).attr("DCM")-1) ){
setTimeout('SiguienteCampo('+iCampo+')',100);
return true;
}
}
return Char;
case 'CP':
case 'NSS':
case 'TC':
case 'T':
case '*':
case 'CCC':
case 'NAF':
case '0':
cadena = _ChrNum;
break;
case 'DC':
cadena = _ChrNum + '*';
break;
case 'H':
ePattern();
return;
if( Char=='.' ){
Char = ':';
if( CntV ){
nChar = Char.charCodeAt(0);
}else{
event.keyCode = Char.charCodeAt(0);
nChar = S.eventCode(event);
}
}
cadena = _ChrNum + ':.';
break;
case 'DNI':
cadena = _ChrNum + _ChrDni;
break;
case 'F4':
case 'P4':
ePattern();
return;
if( Obj.bakValue==undefined ) Obj.bakValue = Obj.value;
if( ('<=>').indexOf(Char)>-1 ) break;
if( (_ChrNum+'-./').indexOf(Char)==-1 ) return eClearEvent();
if( oChar=='.' || oChar=='/' ){
Char = '-';
event.keyCode = Char.charCodeAt(0);
}
if( Obj.maxLength<=Obj.value.length ) return eClearEvent();
var Dim = getCursorPos(Obj), PonCursor = false;
if( Dim['start']==Dim['end'] && Dim['start']<Obj.value.length ){
eInsertAtCursor( Obj, Char );
PonCursor = true;
}else{
if( Char=='-' ){
if( cKey=='F4' ){
if( Obj.value.length==1 && Obj.value>0 && Obj.value<10 ) Obj.value = '0'+Obj.value;
if( Obj.value.length==4 ){
var c = Obj.value.substr(Obj.value.length-1);
if( c>0 && c<10 ) Obj.value = Obj.value.substr(0,Obj.value.length-1)+'0'+c;
}
}else{
switch( Obj.value.length ){
case 0:
Obj.value = _D2S.substring(0,4);
break;
case 1:
Obj.value = _D2S.substring(0,3)+Obj.value;
break;
case 2:
Obj.value = _D2S.substring(0,2)+Obj.value;
break;
}
}
}
Obj.value = Obj.value+Char;
}
Obj.value = eFormatDate(Obj.value,Char,cKey);
if( PonCursor ) putCursorPos(Obj,Dim['start']+1);
event.keyCode = 0;
if( Obj.getAttribute('AJump')!=null ){
if( Obj.maxLength==Obj.value.length ){
setTimeout('SiguienteCampo('+iCampo+')',100);
return true;
}
}
return Char;
case 'CDI':
ePattern();
return;
if( oChar=='.' ){
Char = oChar = ':';
if( !CntV ) event.keyCode = Char.charCodeAt(0);
}
cadena = _ChrNum + '-: ';
break;
case 'NIF':
case 'nif':
cadena = _ChrNif;
if( Obj.size==9 ) cadena += _ChrNum + _ChrDni;
break;
case 'cif':
case 'CIF':
cadena = _ChrNum + _ChrCif;
break;
case 'N':
cadena = _ChrMa + " .-��\"'";
break;
case 'n':
cadena = _ChrMi + " .-��\"'";
break;
case '#N':
cadena = _ChrMi + _ChrMa + " .-��\"'";
Char = oChar;
if( !CntV ) event.keyCode = Char.charCodeAt(0);
break;
case 'D':
cadena = _ChrNum + _ChrMa + " .,-/()��\"'EUR";
break;
case 'd':
cadena = _ChrNum + _ChrMi + " .,-/()��\"'EUR";
break;
case '#D':
cadena = _ChrNum + _ChrMi + _ChrMa + " .,-/()��\"'EUR";
Char = oChar;
if( !CntV ) event.keyCode = Char.charCodeAt(0);
break;
case 'f':
cadena = _ChrNum + _ChrFile;
break;
case 'F':
cadena = _ChrNum + _ChrFile.toUpperCase();
break;
case 'C':
cadena = _ChrNum + _ChrMa;
break;
case 'X':
cadena = _ChrNum + _ChrMa + " .,_/()��\"'EUR[]:;-+=&";
break;
case 'x':
cadena = _ChrNum + _ChrMi + " .,_/()��\"'EUR[]:;-+=&";
break;
case '#X':
cadena = _ChrNum + _ChrMi + _ChrMa + _ChrAcento + " .,_/()��\"'EUR[]:;-+=&";
Char = oChar;
if( !CntV ) event.keyCode = Char.charCodeAt(0);
break;
case '@':
cadena = _ChrNum + _ChrMa + _ChrMi + '.-_@';
Char = oChar;
if( !CntV ) event.keyCode = Char.charCodeAt(0);
break;
case 'W':
cadena = _ChrNum + _ChrMa + _ChrMi + '.-_/:?=&';
Char = oChar;
if( !CntV ) event.keyCode = Char.charCodeAt(0);
break;
case '#U':
if( !CntV ) event.keyCode = Char.toUpperCase().charCodeAt(0);
cadena = Char;
break;
case '#L':
if( !CntV ) event.keyCode = Char.toLowerCase().charCodeAt(0);
cadena = Char;
break;
case '#':
if( !CntV ) event.keyCode = oChar.charCodeAt(0);
cadena = Char;
if( CntV ) cadena = Char = oChar;
break;
case 'CLR':
event.keyCode = Char.toUpperCase().charCodeAt(0);
cadena = _ChrColor;
break;
case 'CN':
cadena = '<>=';
break;
default:
try{
if( _CHR[cKey]==undefined ) alert(eLng(36,cKey,Obj.name));
if( Obj._MaxLength>0 && Obj.maxLength<=Obj.value.length ) return eClearEvent();
if( _CHR[cKey][6]!=undefined ){
var p = Obj.value.length;
var s = _CHR[cKey][6].charAt(p);
while( s!='#' && p<_CHR[cKey][6].length ){
Obj.value += s;
s = _CHR[cKey][6].charAt(++p);
}
}
if( _CHR[cKey][0]=='L' ){
Char = oChar.toLowerCase();
}else if( _CHR[cKey][0]=='U' ){
Char = oChar.toUpperCase();
}else{
Char = oChar;
}
if( _CHR[cKey][4].indexOf(Char)>-1 ){
nChar = Char = _CHR[cKey][5].substr(_CHR[cKey][4].indexOf(Char),1);
event.keyCode = nChar.charCodeAt(0);
}
if( CntV ){
nChar = Char.charCodeAt(0);
}else{
event.keyCode = Char.charCodeAt(0);
nChar = S.eventCode(event);
}
if( _CHR[cKey][2]!='' ){
var Patron = new RegExp( _CHR[cKey][2] );
if( !Patron.test( Obj.value+Char ) ) return eClearEvent();
cadena = Char;
}else{
cadena = _CHR[cKey][1];
}
}catch(e){
ChrEspecial = true;
return false;
}
}
if( _WithAccents[Obj.name]!=undefined || _WithAccents['*'] ) cadena += _ChrAcento;
switch( nChar ){
case 61:
if( cKey=='#' || cKey=='W' ) break;
case 62:
case 60:
if( _CHR[cKey]!=undefined ) break;
if( !_Question ) return eClearEvent();
if( cKey!='#' && !(nChar==61 && ':x:X:#X:W:'.indexOf(':'+cKey+':')>-1 ) ){
ChrOk = _ConBusqueda;
ChrEspecial = true;
if( _DBRange[Obj.name]!=undefined ) ChrEspecial = false;
if( Obj.noConditions!=undefined ) ChrEspecial = false;
}
if( _Question && Obj.noConditions==undefined && ':+:-:+,:-,:F4:P4:CDI:'.indexOf(':'+cKey+':')>-1 && Obj.CopyOf==undefined ){
_EditCondition(Obj,String.fromCharCode(nChar));
return eClearEvent();
}
break;
case 63:
case 42:
if( _ConBusqueda ){
ChrOk = ( ':+:-:+,:-,:F4:P4:'.indexOf(':'+cKey+':')==-1 );
ChrEspecial = true;
}
break;
case 13:
if( !CntV && tControl!='textarea' ){
SiguienteCampo( iCampo );
event.returnValue = false;
return false;
}
return true;
}
if( ChrEspecial ){
if( !CntV ) event.returnValue = ChrOk;
return ChrOk;
}
if( Saltar ) return( ( cadena.indexOf(Char)==-1 ) ? '' : Char );
if( CntV ) return( ( cadena.indexOf(Char)==-1 ) ? false : Char );
if( cadena.indexOf(Char)==-1 ) return eClearEvent();
if( Obj.getAttribute('AJump')!=null ){
if( Obj.maxLength==Obj.value.length+1 ){
setTimeout('SiguienteCampo('+iCampo+')',100);
return true;
}
}
}
function _CpField(){
var obj = S.event(window);
if( /^(input|textarea)$/i.test(obj.tagName) && !/(checkbox|radio)/i.test(obj.type) ){
if( obj.tagName=='TEXTAREA' ){
var xy = eXY(obj);
if( (xy[0]+xy[2]-20)<event.x ){
document.body.focus();
return;
}
}
if( obj.value!='' ){
S(obj).tip(eLng(37), 1, "OK");
obj.select();
try {
var resul = document.execCommand('copy');
}catch(e){}
}
}
S.selectOff(window);
if( obj.nextElementSibling && /^(I|IMG)$/i.test(obj.nextElementSibling.tagName) ){
S(obj.nextElementSibling).eventFire("click");
}
return S.eventClear(window);
}
function SiguienteCampo(campo, aTras){
if( campo==-2 ){
aTras = undefined;
campo = -1;
}else if( campo!=undefined && isNaN(parseInt(campo)) ){
var CampoFoco=campo;
for( campo in _cForm ) if( _cForm[campo].Nombre==CampoFoco ){
S.fieldNext(S(":"+CampoFoco).obj, aTras);
return;
}
}else{
try{
if( document.activeElement.name && (campo==undefined || campo==-1) ) for(campo in _cForm){
if( _cForm[campo].Nombre==document.activeElement.name ) break;
}
}catch(e){
campo==undefined;
}
}
if( campo==undefined ){
setTimeout(function(){eFocus(_FieldFocus);},100);
return eClearEvent();
}
if( S.type(campo)=="number" ){
campo = DGI(_cForm[campo].Nombre);
}else{
campo = (S.type(campo)=="string") ? DGI(campo) : S.event(window);
}
S.fieldNext(campo, aTras);
_CampoFoco = document.activeElement;
}
function OtroPeriodo(v){
var Obj = S.event(window);
if( v!=undefined ){
var n = v;
if( Obj.tagName=='INPUT' ) Obj = Obj.nextSibling;
}else{
var n = ( event.offsetY > Obj.height/2 )? -1:1;
}
Obj = Obj.previousSibling;
var txt = Obj.value;
if( txt=='' ){
txt = _D2S.substring(0,4)+'-'+_D2S.substring(4,6);
n = 0;
}
var ano = txt.substring(0,4)*1;
var mes = (txt.substring(5,7)*1) + n;
if( mes > 12 ){
mes = 1;
ano++;
}else{
while( mes < 1 ){
mes = 12;
ano--;
}
}
txt = ano+'-'+((mes<10)? '0':'')+mes;
var c = _DefCampo[Obj.name]['Condicion'];
if( c!='' ){
c = c.replace(/#/g,txt);
if( !eval(c) ) txt = Obj.value;
}
Obj.value = txt;
if( Obj.onchange!=null ) S(Obj).eventChange();
if( !Obj.readOnly ) Obj.focus();
}
function eSlider(Obj,Min,Max,ObjDes,Change){
Obj.PosX = Obj.getBoundingClientRect().left;
Obj.MaxX = Obj.parentNode.offsetWidth-Obj.offsetWidth-3;
Obj.PosA = Obj.offsetLeft - event.offsetX;
Obj.Paso = (Max-Min)/Obj.MaxX;
Obj.Min = Min;
Obj.ObjValue = (ObjDes==null || ObjDes==undefined) ? Obj : ObjDes;
if( Change!=undefined ) Obj.onchange = function anonymous(){ Change(Obj); }
Obj.parentNode.className = 'SliderON';
Obj.parentNode.onselectstart = function anonymous(){ return false; }
document.body.onmousemove = function anonymous(){ _SliderMove(Obj); }
document.body.onmouseup = function anonymous(){ _SliderOff(Obj); }
}
function _SliderOff(Obj){
document.body.onmousemove = document.body.onmouseup = null;
Obj.parentNode.className = 'SliderOFF';
if( Obj.onchange!=undefined ) Obj.onchange( Obj );
}
function _SliderMove(Obj){
var x = event.x - Obj.PosX + Obj.PosA - document.body.scrollLeft;
if( x<0 ) x = 0;
if( x>Obj.MaxX ) x = Obj.MaxX;
var v = parseInt(x*Obj.Paso)+Obj.Min;
_SliderValue(Obj,x,v);
}
function _SliderValue(Obj,x,v){
Obj.style.marginLeft = x;
if( Obj.ObjValue.tagName=='INPUT' ){
Obj.ObjValue.value = v;
}else if( Obj.ObjValue.tagName=='IMG' ){
Obj.ObjValue.title = v;
}else{
Obj.ObjValue.textContent = v;
}
}
function eSliderSet(Obj,v,ObjTxt){
if( ObjTxt==undefined ) ObjTxt = Obj;
if( Obj.offsetWidth==0 ){
setTimeout('eSliderSet(DGI('+Obj.sourceIndex+'),'+v+',DGI('+ObjTxt.sourceIndex+'))', 100);
}else{
Obj.ObjValue = ObjTxt;
var p = (Obj.onmousedown+'').split(',');
var MaxX = Obj.parentNode.offsetWidth-Obj.offsetWidth-3;
var Paso = (p[2]-p[1])/MaxX;
var x = parseInt(v/Paso)-p[1];
_SliderValue(Obj,x,v);
}
}
function _F10(Mas, evt){
if( DGI('OpExe')==null || DGI('OpExe').offsetWidth==0 ) return;
if( typeof(evt)!="object" ) evt = event;
if( Mas==undefined ) Mas = (evt.ctrlKey)?'c':'';
if( Mas==undefined ) Mas = (evt.altKey)?'a':'';
if( typeof(ConF10)==undefined || ConF10 ){
try{
window.focus();
S.eventClear(window);
}catch(e){}
var oFoco = document.activeElement;
if( evt!=null ) if( oFoco && S(oFoco).attr("F10")!=null ){
var n, o;
for(n=oFoco.sourceIndex+1; n<eIndex(); n++){
o = eIndex(n);
if( o.name!=undefined && o.name.substr(0,5)=='_op__' ){
if( DGI('['+o.name.substr(4)+']').MODO=='I' && o.getAttribute('OpInsert')=='-1' ) return false;
S(eIndex(o.sourceIndex+1)).eventClick();
return false;
}
}
}
if( Mas=='a' && ',cR,bR,mR,'.indexOf(','+_Accion+',')!=-1 && OpExe.oncontextmenu!=null ){
_SubListado();
if( oFoco!=null ) oFoco.focus();
}else{
if( document.FRM1.target!='_SUBLISTADO' ){
if(oFoco) oFoco.blur();
document.body.focus();
setTimeout(function(){
if( _oMode!='o' ){
eOkTab();
}else{
_ChangeOp();
}
}, 100);
}
}
}
return false;
}
function _AvRePag( Av ){
if( HojasV==0 ) return;
var nf = xFRM.substring(3);
if( Av ){
do{
nf++;
if( Hojas[nf]==-1 ) nf = 1;
}while( Hojas[nf]!=1 || TABMenu.rows[nf-1].disabled );
}else{
do{
nf--;
if( Hojas[nf]==-1 ) nf = Hojas.length-1;
}while( Hojas[nf]!=1 || TABMenu.rows[nf-1].disabled );
}
PonSolapa(nf);
return false;
}
function getCursorPos( campo ){
if( document.selection ){
campo.focus();
var oSel = document.selection.createRange();
oSel.moveStart('character',-campo.value.length);
campo.selectionEnd = oSel.text.length;
oSel.setEndPoint('EndToStart',document.selection.createRange());
campo.selectionStart = oSel.text.length;
}
return { start: campo.selectionStart, end: campo.selectionEnd };
}
function putCursorPos(Obj,pos){
if( typeof document.selection!='undefined' && document.selection ){
var tex=Obj.value;
Obj.value='';
Obj.focus();
var str = document.selection.createRange();
Obj.value=tex;
str.move("character", pos);
str.moveEnd("character", 0);
str.select();
}else if( typeof Obj.selectionStart!='undefined' ){
Obj.setSelectionRange(pos,pos);
Obj.focus();
}
}
function eInsertAtCursor( Obj, Valor ){
if( document.selection ){
Obj.focus();
document.selection.createRange().text = Valor;
}else if( Obj.selectionStart || Obj.selectionStart=='0' ){
Obj.value = Obj.value.substring(0,Obj.selectionStart) + Valor + Obj.value.substring(Obj.selectionEnd,Obj.value.length);
}else{
Obj.value += Valor;
}
}
function AceptaFicha(){
if( !top.eReadyState(window) ) return eClearEvent();
if( S.eventCode(event)==8 ){
if( document.activeElement.tagName=='A' ) if( document.activeElement.href=='javascript:' ) return eClearEvent();
if( document.activeElement.tagName=='SPAN' && document.activeElement.contentEditable ) return true;
if( document.activeElement.type==undefined ) return eClearEvent();
else if( document.activeElement.type=='text' && document.activeElement.readOnly ) return eClearEvent();
}
var Mas = '';
if( event.altKey ) Mas = 'a';
if( event.ctrlKey ) Mas = 'c';
if( event.shiftLeft ) Mas = 's';
if( S.eventCode(event)==17 ) return true;
if( Mas=='c' && S.eventCode(event)==80 ){
if( _ConImpresora ) top.UtilPrint( window );
eClearEvent();
return;
}
if( ',116,122,a39,a37,a8,c65,c53,c69,c72,c79,c76,c73,c81,c85,s121,'.indexOf(','+Mas+S.eventCode(event)+',')!=-1 ) return eClearEvent();
if( ',93,a36,a37,'.indexOf(','+Mas+S.eventCode(event)+',')!=-1 ) return eClearEvent(1);
var Obj = S.event(window);
if( Obj && Obj.name && Obj.name.indexOf('_FILTER_')==0 && Obj.type=="textarea" ) return true;
var Valor = Obj.value;
if( Mas+S.eventCode(event)=='c67' && Obj.type=='text' ){
try{
window.clipboardData.clearData();
window.clipboardData.setData("Text",Valor);
top.eInfo(window,eLng(37), 1 ,"OK");
eClearEvent();
}catch(e){}
return false;
}else if( Mas+S.eventCode(event)=='c86' && (Obj.type=='text' || Obj.type=='textarea') ){
eInsertAtCursor(Obj, window.clipboardData.getData('Text'));
var txt = eTrim(Obj.value), nValor='';
var iCampo = _DefCampo[Obj.name.replace('[]','')].Indice;
var cKey = _cForm[iCampo].Tipo,n,c;
if( txt!=null ){
ePF( Obj.name, '', 0 );
if( S(Obj).attr("TC")!=undefined && (S(Obj).attr("TC").charAt(0)=='+' || S(Obj).attr("TC").charAt(0)=='-') ) txt = txt.replace(/\./g,'');
for( n=0; n<txt.length; n++ ){
c = ControlTeclado( txt.charAt(n), true );
if( typeof(c)=='string' ) nValor += c;
else if( S(Obj).attr("TC")!=undefined && S(Obj).attr("TC").indexOf(',')==-1 && txt.charAt(n)==',' ) break;
if( cKey.substring(0,1)=='#' && Obj.type=='textarea' ){
if( Escapar(nValor).length > Obj._MaxLength ){
nValor = nValor.substr(0,nValor.length-1);
break;
}
}
}
nValor = nValor.substr(0,Obj.type=='textarea'?Obj._MaxLength:Obj.maxLength);
if( Obj.name.substr(0,7)!='_INPUT_' ){
if( Valor!=nValor ) top.eInfo(window,eLng(38),1);
ePF( Obj.name, nValor );
}
}
eClearEvent();
return false;
}
if( Mas=='a' && '12345'.indexOf(String.fromCharCode(S.eventCode(event)))>-1 ){
var n=1, oIMG=null, p=String.fromCharCode(S.eventCode(event))*1;
try{
if( eIndex(Obj.sourceIndex+n).tagName=='NOBR' ) n++;
if( Obj.name.indexOf('_INPUT_')>-1 ){
if( eIndex(Obj.sourceIndex+n).tagName=='IMG' ) oIMG = eIndex(Obj.sourceIndex+n);
else if( eIndex(Obj.sourceIndex+n).nextSibling.tagName=='IMG' ) oIMG = eIndex(Obj.sourceIndex+n).nextSibling;
}else if( eIndex(Obj.sourceIndex+n).tagName=='INPUT' ){
if( eIndex(Obj.sourceIndex+n).readOnly ){
n++;
if( eIndex(Obj.sourceIndex+n).tagName=='IMG' ) oIMG = eIndex(Obj.sourceIndex+n);
}
}else if( Obj.name==undefined ){
}else if( Obj.tagName=='INPUT' ){
if( eIndex(Obj.sourceIndex+1).tagName=='IMG' ) oIMG = eIndex(Obj.sourceIndex+1);
}
if( oIMG!=null ){
var el=oIMG,n=1;
while( el.tagName=='IMG' ){
if( n==p ){
S(el).eventFire("click");
return;
}
n++;
el = eIndex(el.sourceIndex+1);
}
}
}catch(e){}
}
switch( S.eventCode(event) ){
case 38:
case 40:
case 37:
if( Obj.tagName=='A' ){
if( Obj.href=='javascript:' ){
for( var n in _cForm ){
if( _cForm[n].Nombre==Obj.children[0].name.substring(2) ){
SiguienteCampo(n,-1);
return false;
}
}
}
}
break;
case 13:
if( Obj.CopyOf!=undefined ){
var x = Obj.id, t;
if( x.indexOf('_type_')>-1 ){
DGI(x.replace('_type_','_value_')).focus();
}else{
t = x.split('_value_');
t[1] = (t[1]<3) ? ++t[1] : 1;
DGI('_INPUT__cnd_type_'+t[1]).focus();
}
return false;
}
if( _EnterForSubmit ){
_F10(Mas);
return false;
}
if( event.ctrlKey ) return SiguienteCampo();
if( Obj.tagName=='TEXTAREA' && Obj.MaxRows!=undefined ){
if( (Obj.value.split(String.fromCharCode(13)).length+1) > Obj.MaxRows ){
S("body").tip(eLng(130),1);
return eClearEvent();
}
}
case 39:
if( Obj.tagName=='A' ){
if( Obj.href=='javascript:' ){
for( var n in _cForm ){
if( _cForm[n].Nombre==Obj.children[0].name.substring(2) ){
SiguienteCampo(n);
return false;
}
}
}
}
if( Obj.tagName=='TEXTAREA' && event.shiftLeft ){
SiguienteCampo(-1);
return false;
}
if( S.eventCode(event)==39 && _Question && '<=>'.indexOf(Obj.value.charAt(0))>-1 && Obj.value.charAt(0)!='' ){
_EditCondition(Obj);
return eClearEvent();
}
break;
case 9:
if( Obj.CopyOf!=undefined ){
var x = Obj.id, t;
if( x.indexOf('_type_')>-1 ){
DGI(x.replace('_type_','_value_')).focus();
}else{
t = x.split('_value_');
t[1] = (t[1]<3) ? ++t[1] : 1;
DGI('_INPUT__cnd_type_'+t[1]).focus();
}
return false;
}
if( event.ctrlKey && Obj.tagName=='TEXTAREA' ){
try{ event.keyCode = 0; }catch(e){}
document.selection.createRange().text = String.fromCharCode(9);
event.returnValue = false;
}else{
Mas = (Obj.tagName!='A') ? Obj.name : Obj.children[0].name.substr(2);
for( var n in _cForm ){
if( _cForm[n].Nombre==Mas ){
if( event.shiftKey ){
SiguienteCampo(n,-1);
}else{
SiguienteCampo(n);
}
return false;
}
}
}
break;
case 32:
if( Obj.tagName=='A' ) if( Obj.href=='javascript:' ){
S(Obj).eventFire("click");
}
break;
case 187:
case 107:
if( Obj.tagName=='A' ) if( Obj.href=='javascript:' ){
ePF(Obj.children[0].name.substr(2),_CheckBoxSave[0]);
_Src(Obj.children[0],0,3,2,3,'22',3);
}
break;
case 189:
case 109:
if( Obj.tagName=='A' ) if( Obj.href=='javascript:' ){
if( !_Question && Obj.children[0].className=='Radio' ) return false;
ePF(Obj.children[0].name.substr(2),_CheckBoxSave[1]);
_Src(Obj.children[0],1,2,3,2,'22',2);
}
break;
case 34:
var nf = xFRM.substring(3);
if( HojasV==0 ) break;
do{
nf++;
if( Hojas[nf]==-1 ) nf = 1;
}while( Hojas[nf]!=1 || TABMenu.rows[nf-1].disabled );
PonSolapa(nf);
return false;
case 33:
var nf = xFRM.substring(3);
if( HojasV==0 ) break;
do{
nf--;
if( Hojas[nf]==-1 ) nf = Hojas.length-1;
}while( Hojas[nf]!=1 || TABMenu.rows[nf-1].disabled );
PonSolapa(nf);
return false;
case 121:
if( _Question && Obj.CopyOf!=undefined ){
_EditConditionOk();
return eClearEvent();
}
if( !ConF10 ) return false;
if( _Mode=='cR' && DGI('OpExe').outerHTML.indexOf('g/op_close')>-1 ){
setTimeout('top.eSWClose(window);',100);
return eClearEvent();
}
_ConCtrlKey = (Mas=='c')?2:0;
_F10(Mas);
return false;
case 120:
if( eIndex(Obj.sourceIndex+1).id=='_'+Obj.name ){
if( Obj.value!='' ){
top.Memoriza(eIndex(Obj.sourceIndex+1), window);
}else{
top.Restaura(eIndex(Obj.sourceIndex+2), window);
}
}else{
if( Obj.value!='' ){
top._F9Mem[Obj.name] = Obj.value;
}else{
if( top._F9Mem[Obj.name]!=undefined )  ePF(Obj.name, top._F9Mem[Obj.name]);
}
}
break;
case 8:
case 46:
if( ':+,:-,:-:+:F4:P4:'.indexOf(':'+S(Obj).attr("TC")+':')>-1 && Obj.onchange!=null && Obj.bakValue==undefined ) Obj.bakValue = Obj.value;
if( null!=document.activeElement ){
if( document.activeElement.getAttribute("DCM")!=null ){
setTimeout( function(){
var Dim = getCursorPos(Obj);
document.activeElement.value = eFormatNumber(document.activeElement.value);
putCursorPos(document.activeElement,Dim['start']);
},1);
}else if( document.activeElement.TC=='F4' ){
setTimeout( function(){
var Dim = getCursorPos(Obj);
document.activeElement.value = eFormatDate(document.activeElement.value,null,'F4');
putCursorPos(document.activeElement,Dim['start']);
},1);
}else if( document.activeElement.TC=='CDI' ){
setTimeout( function(){
var Dim = getCursorPos(Obj);
document.activeElement.value = eFormatFree( document.activeElement.value, document.activeElement.eFormat );
putCursorPos(document.activeElement,Dim['start']);
},1);
}
return true;
}
break;
case 27:
if( window.frameElement.CloseEsc || ConF10 ){
if( top.eIsWindow(window) ){
var id = top.eSWTools(window,'ID');
if( top.DGI('swV_'+id).getAttribute('NoMinimize')==null ){
top.eSWClose( window );
}else{
S.windowHidden(window);
}
}else{
top.eSWClose( window );
}
}
if( _Question && Obj.CopyOf!=undefined ){
_EditConditionClose();
return eClearEvent();
}
break;
case 112:
eTipForm();
break;
case 114:
if( Obj.tagName!='INPUT' && Obj.tagName!='TEXTAREA' ) return;
if( DGI('_INPUT_'+Obj.name)!=null ) _SelShow(DGI('_INPUT_'+Obj.name));
return eClearEvent();
case 115:
if( Obj.tagName!='INPUT' && Obj.tagName!='TEXTAREA' ) return;
if( _Question && Obj.CopyOf==undefined && ':+:-:+,:-,:F4:P4:CDI:'.indexOf(':'+S(Obj).attr("TC")+':')>-1 ){
_EditCondition(Obj);
break;
}
if( Obj.name.indexOf('_INPUT_')==-1 ){
if( DGI('_INPUT_'+Obj.name)!=null ) Obj = DGI('_INPUT_'+Obj.name);
}
var n = 1, oIMG = null;
try{
if( eIndex(Obj.sourceIndex+n).tagName=='NOBR' ) n++;
if( Obj.name.indexOf('_INPUT_')>-1 ){
if( eIndex(Obj.sourceIndex+n).tagName=='IMG' ) oIMG = eIndex(Obj.sourceIndex+n);
else if( eIndex(Obj.sourceIndex+n).nextSibling.tagName=='IMG' ) oIMG = eIndex(Obj.sourceIndex+n).nextSibling;
}else if( eIndex(Obj.sourceIndex+n).tagName=='INPUT' ){
if( eIndex(Obj.sourceIndex+n).readOnly ){
n++;
if( eIndex(Obj.sourceIndex+n).tagName=='IMG' ) oIMG = eIndex(Obj.sourceIndex+n);
}
}else if( eIndex(Obj.sourceIndex+n).tagName=='IMG' ){
oIMG = eIndex(Obj.sourceIndex+n);
}else if( Obj.name==undefined ){
}else if( Obj.tagName=='INPUT' ){
if( eIndex(Obj.sourceIndex+1).tagName=='IMG' ) oIMG = eIndex(Obj.sourceIndex+1);
}
if( oIMG!=null && oIMG.offsetWidth>0 ){
if( eIndex(oIMG.sourceIndex+1).tagName=='IMG' ){
var Dim = new Array(),el=oIMG,p,n=1,txt,i,pp=1;
while( el.tagName=='IMG' ){
txt = el.title;
i = n++;
if( el.eTitle!=undefined ) Dim[pp++] = Array('-',el.eTitle);
if( el.eTrigger!=undefined ){
i = el.eTrigger;
p = txt.indexOf(el.eTrigger);
if( p>-1 ) txt = txt.substr(0,p)+'<b><u>'+i+'</u></b>'+txt.substr(p+1);
}else txt = ' <b><u>'+i+'</u></b>�'+txt;
Dim[pp++] = Array( (i+'').toUpperCase(), '['+el.src+'] '+txt );
el = eIndex(el.sourceIndex+1);
}
top.eMenu( window, oIMG, Dim, _ToolsIMG );
}else{
S(oIMG).eventFire("click");
}
}
}catch(e){}
break;
}
}
function _ToolsIMG( Op, OpTextContent, Obj, OpObj ){
if( Op==null ) return;
var TR = S.toTag(OpObj,'TABLE').rows,n,i=0;
for( n=0; n<TR.length; n++ ){
if( TR[n].P!=undefined ){
if( TR[n].P==Op ){
S(eIndex(Obj.sourceIndex+i)).eventFire("click");
top.eMenuHide(window);
eClearEvent();
}
i++;
}
}
}
function _EfectoJump(n,i){
if( n==0 ) eIndex(i).style.borderBottomColor = top._AutoJumpCSS;
if( n==1 ) eIndex(i).style.borderRightColor = top._AutoJumpCSS;
if( n==2 ) eIndex(i).style.borderTopColor = top._AutoJumpCSS;
if( n==3 ) eIndex(i).style.borderLeftColor = top._AutoJumpCSS;
if( n==5 ) eIndex(i).style.borderBottomColor = '';
if( n==6 ) eIndex(i).style.borderRightColor = '';
if( n==7 ) eIndex(i).style.borderTopColor = '';
if( n==8 ) eIndex(i).style.borderLeftColor = '';
if( n<8 ) setTimeout('_EfectoJump('+(n+1)+','+i+')',50);
}
function eMarkFieldRequired(Dim, label, field){
if( label==undefined ) label = false;
if( field==undefined ) field = false;
var n, css=S.ruleGet(window, '.REQUIRED');
Dim = Dim.split(',');
for(n=0; n<Dim.length; n++) if( Dim[n]!="" ){
if( label ) S("label[for='"+Dim[n]+"']").class("=REQUIREDLABEL");
if( field ) S([":"+Dim[n], ":_INPUT_"+Dim[n]]).css(css);
}
}
var Mensaje = '',
_CamposOk = 0;
function eAllTrim( txt ){
return txt.replace(/^ +/g,'').replace(/ +$/g,'').replace(/  +/g,' ');
}
function eTrim( txt ){
txt = txt.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+\s+/g,' ');
return txt.replace(String.fromCharCode(0),'').replace(String.fromCharCode(13),'').replace(String.fromCharCode(10),'');
}
String.prototype.trim = function(){ return this.replace(/^\s+|\s+$/g,'').replace(/\s+\s+/g,' '); }
function eTrimTArea(txt){
return txt.replace( /[\r\n\t\s]*$/g, '' );
}
function eRound(num, dec, miles){
return S.round(num, dec, miles);
}
function eAddMonth(txt, n){
if( txt=='' ){
txt = _D2S.substring(0,4)+'-'+_D2S.substring(4,6);
n = 0;
}
if( n==0 ) return txt;
var ano = txt.substring(0,4)*1;
var mes = txt.substring(5,7)*1;
if( n > 0 ){
mes += n;
if( mes > 12 ){
ano += Math.floor( mes/12 );
mes = mes - (Math.floor( mes/12 )*12);
if( mes==0 ){
mes = 12;
ano--;
}
}
}else if( n < 0 ){
ano += Math.ceil( n/12 );
n = n-(Math.ceil( n/12 )*12);
mes += n;
if( mes<=0 ){
ano--;
mes += 12;
}
}
return( ano+'-'+((mes<10)? '0':'')+mes );
}
function Ok_Formulario(sFormulario, slDesde, slHasta, slMode){
function putError(ObjCampo){
if( ObjCampo.className!="ERROR" ) ObjCampo.OldClass = ObjCampo.className;
if( ObjCampo.className!="READONLY" ) ObjCampo.className = "ERROR";
if( DGI('_INPUT_'+ObjCampo.name)!=null ) DGI('_INPUT_'+ObjCampo.name).className = "ERROR";
if( DGI('_FILE_'+ObjCampo.name)!=null ) ObjCampo.className = "ERROR";
if( DGI(ObjCampo.name+'_')!=null ) DGI(ObjCampo.name+'_').className = "ERROR";
if( ObjCampo.ALTO!=undefined ) if( ObjCampo.ALTO!=1 ) DGI(ObjCampo.name+'_TABLE').className = "ERROR";
}
var nc = indice = 0,
sCondicion = NomCampo = valor = FocoCampo = FocoTipo = FocoHoja = '',
resultado = true,
ConError = false,
sTipo = sFRM = "", Obj = null, ConSubmit = false, xMensaje = "";
Mensaje = "";
_CamposOk = 0;
if( slDesde==undefined || slHasta==undefined ) ConSubmit = true;
if( slDesde==undefined ) slDesde = 0;
if( slHasta==undefined ) slHasta = _cForm.length;
if( slMode==undefined ) slMode = '';
for(var nCampo=slDesde; nCampo<slHasta; nCampo++){
_CamposOk++;
if( ConSubmit && _InFormOnLine[_cForm[nCampo].Nombre]!=undefined ) continue;
ConError = false;
sCondicion = _cForm[nCampo].Condicion;
sFRM = 'FRM'+_cForm[nCampo].Formulario;
_NomCampo = NomCampo = sFRM+'.'+_cForm[nCampo].Nombre;
try{
var ObjCampo = eval(NomCampo),
ObjFRM = sFormulario;
if( ObjCampo.length!=undefined ) if( ObjCampo[0].type=='text' ) continue;
sTipo = ObjCampo.type;
if( sTipo=='button' ) continue;
if( sTipo=='file' && slMode=='U' ) continue;
if( sTipo=='text' || sTipo=='textarea' || sTipo=='password' ){
var oldDato = ObjCampo.value;
ObjCampo.value = (sTipo!='textarea')? eTrim(ObjCampo.value) : eTrimTArea(ObjCampo.value);
if( null!=ObjCampo.onchange && oldDato!=ObjCampo.value ){
var txt = ObjCampo.onchange+'';
txt = txt.replace('function anonymous()','').replace('function onchange()','').replace('{','').replace('}','');
var DimFunc = txt.split(';'), y;
for(y=0; y<DimFunc.length; y++){
txt = DimFunc[y];
while( txt.charCodeAt(0)==10 ) txt = txt.substring(1);
if( txt.substring(0,1)!='_' && txt.indexOf( '(', 0 )!=-1 ){
txt = txt.replace( 'this', 'FRM'+_cForm[nCampo].Formulario+'.'+_cForm[nCampo].Nombre );
if( txt.search('Espejo')!=-1 ) eval( txt );
}
}
}
if( sTipo!='textarea' ){
if( sCondicion=='' && DGI('_INPUT_'+_cForm[nCampo].Nombre)!=null ){
var zObj = DGI(_cForm[nCampo].Nombre+'_TABLE');
if(	oldDato=='' && zObj!=null && zObj.rows.length>0 && eTrim(zObj.rows[0].cells[0].textContent)!='' ){
sCondicion = _cForm[nCampo].Condicion = "#";
if( _cForm[nCampo].Label=='' || _cForm[nCampo].Label==_cForm[nCampo].Nombre ){
_cForm[nCampo].Label = _cForm[nCampo-1].Label;
}
}
}
if( !OkCampo(nCampo, NomCampo) ){
putError(ObjCampo);
ConError = true;
if( resultado ){
FocoCampo = _cForm[nCampo].Nombre;
FocoTipo  = sTipo;
FocoHoja  = sFRM;
resultado = false;
}
}
}else{
if( ObjCampo.name.substring(0,4)=='dct_' ){
if( ObjCampo.dctLeng!=undefined ){
txt = eTrim(ObjCampo.value).replace(/\n/g,',').split(','), SumarTxt='';
for( y=0; y<txt.length; y++ ){
if( txt[y].length>ObjCampo.dctLeng ){
SumarTxt += '\n&nbsp;&nbsp;&nbsp;"'+eTrim(txt[y])+'"';
ConError = true;
if( resultado ){
FocoCampo = _cForm[nCampo].Nombre;
FocoTipo  = sTipo;
FocoHoja  = sFRM;
resultado = false;
}
}
}
if( SumarTxt!='' ) Mensaje += eLng(160, _cForm[nCampo].Label.toUpperCase(),ObjCampo.dctLeng+SumarTxt);
}
}
}
}
if( sCondicion.length>0 ){
valor = '';
while( sCondicion.indexOf('#',0)!=-1 ){
valor = ObjCampo.value;
if( ObjCampo.eAssign!=undefined ){
if( eGF(ObjCampo.eAssign)=='0' && ';+;-;'.indexOf(';'+_Tipo[ObjCampo.eAssign]+';') > -1 ) valor = '';
}
if( valor.indexOf("'")>-1 ) valor = valor.replace(/'/g,'"');
if( _cForm[nCampo].Condicion=='#' || _cForm[nCampo].Condicion=='=' || _cForm[nCampo].Condicion=='%' ){
valor = "'"+valor+"'";
}
if( ';+;-;+,;-,;'.indexOf(';'+_cForm[nCampo].Tipo+';')>-1 ){
if( valor=='' || valor=="''" ){
sCondicion = sCondicion.replace('#', '0');
}else{
sCondicion = sCondicion.replace('#', eGF(_cForm[nCampo].Nombre));
}
}else{
sCondicion = sCondicion.replace('#', valor.replace(/#/g, ""));
}
if( sTipo=='textarea' ){
sCondicion = (ObjCampo.value.length>0) ? 'true' : 'false';
}else if( (valor.length==0 || valor=="''" ) && _cForm[nCampo].Condicion=='#' ){
sCondicion = 'false';
}
}
if( valor=='' ) valor = "'"+ObjCampo.value+"'";
while( sCondicion.indexOf(' or ' ,0)!=-1 ) sCondicion = sCondicion.replace(' or ' ,' || ');
while( sCondicion.indexOf(' and ',0)!=-1 ) sCondicion = sCondicion.replace(' and ',' && ');
switch( _cForm[nCampo].Condicion ){
case '#':
sCondicion = (valor=='' || valor=="''") ? 'false' : 'true';
break;
case '=':
sCondicion = (valor.length!=(ObjCampo.size + 2)) ? 'false' : 'true';
break;
case '%':
sCondicion = (ObjCampo.value=='' || ObjCampo.value.length==ObjCampo.size) ? 'true' : 'false';
break;
default:
if( _cForm[nCampo].Condicion.length==0 ) sCondicion = 'true';
}
if( '+-'.indexOf(_cForm[nCampo].Tipo.substr(0,1))!=-1 ){
if( _cForm[nCampo].Condicion=='#' || _cForm[nCampo].Condicion=='=' || _cForm[nCampo].Condicion=='%' ){
var sValor = valor;
sValor = sValor.replace(/,/g,'').replace(/0/g,'').replace(/"/g,'').replace(/'/g,'');
sCondicion = (sValor.length>0);
}
}
if( _cForm[nCampo].Tipo.substring(0,1)=='#' && sTipo=='textarea' ){
if( _cForm[nCampo].Condicion.length>0 ){
if( _cForm[nCampo].Condicion=='#' && ObjCampo.value.length>0 ){
sCondicion = 'true';
}else{
if( resultado ){
FocoCampo = _cForm[nCampo].Nombre;
FocoTipo = sTipo;
FocoHoja = sFRM;
resultado = false;
}
sCondicion = 'false';
}
}
}
if( ObjCampo.type=='textarea' ){
if( _cForm[nCampo].Condicion=='=' ){
sCondicion = ( ObjCampo.value.length==ObjCampo.maxLength );
}else if( _cForm[nCampo].Condicion=='%' ){
sCondicion = ( ObjCampo.value.length==ObjCampo.maxLength || ObjCampo.value=='' );
}
}else if( ObjCampo.type=='file' && _Mode=='mR' ){
sCondicion = 'true';
}
try{
if( !eval(sCondicion) ){
if( resultado ){
FocoCampo = _cForm[nCampo].Nombre;
FocoTipo = sTipo;
FocoHoja = sFRM;
resultado = false;
}
if( _cForm[nCampo].Mensaje.length==0 || _cForm[nCampo].Mensaje.substr(0,2)=='L:' ){
if( _cForm[nCampo].Condicion=='=' || _cForm[nCampo].Condicion=='%' ){
if( _cForm[nCampo].Condicion=='%' && ConError ){
putError(ObjCampo);
continue;
}
if( _cForm[nCampo].Mensaje.length==0 ){
xMensaje = eLng(39);
}else{
xMensaje = eLng(40);
}
}else if( _cForm[nCampo].Condicion=='#' ){
xMensaje = eLng(41);
}else{
xMensaje = eLng(42);
}
if( _cForm[nCampo].Mensaje.substr(0,2)!='L:' ){
_cForm[nCampo].Label = _cForm[nCampo].Label.replace(/PADDING/gi,'NO').replace(/MARGIN/gi,'NO');
xMensaje = xMensaje.replace('#',_cForm[nCampo].Label.toUpperCase())+'<BR>';
}else{
xMensaje = xMensaje.replace('#',_cForm[nCampo].Mensaje.substr(2).toUpperCase())+'<BR>';
}
Mensaje += xMensaje;
if( S(ObjCampo).attr("eMultifile")==1 ){
S(":_MULTIFILE").class("ERROR");
}else if( S(ObjCampo).attr("MultipleValues")!=null ){
if( S("#_"+_cForm[nCampo].Nombre).length ){
S("#_"+_cForm[nCampo].Nombre).class("+ERROR");
}else{
S(":_INPUT__"+_cForm[nCampo].Nombre).class("+ERROR");
}
}
}else{
Mensaje += _cForm[nCampo].Mensaje+"<BR>";
}
putError(ObjCampo);
}else{
if( ObjCampo.className=="ERROR" ) ObjCampo.className = ObjCampo.OldClass;
}
}catch(e){
for(var i in e) alert('ERROR Condition: '+sCondicion+'\n\n'+i+': '+e[i]);
}
}
}catch(e){
for(var i in e) alert('ERROR field: '+_NomCampo+'\n\n'+i+': '+e[i]);
}
}
var i = f = 0, xCondi = '';
for(nCampo=0; nCampo<_cGlobal.length; nCampo++){
if( sFormulario!=0 && _cGlobal[nCampo].Formulario!=sFormulario ) continue;
if( sFormulario==0 && _cGlobal[nCampo].Tipo=='I' ) continue;
_NomCampo = xCondi = _cGlobal[nCampo].Condicion;
while( xCondi.search('{')!=-1 ){
i = xCondi.search('{');
f = xCondi.search('}');
NomCampo = xCondi.substring(i+1,f);
for( nc=0; nc < _cForm.length; nc++ ){
if( _cForm[nc].Nombre==NomCampo ){
sFRM = 'FRM'+_cForm[nc].Formulario;
ObjFRM = eval(sFRM);
ObjCampo = eval( sFRM+'.'+NomCampo );
break;
}
}
if( typeof(ObjCampo.type)=='undefined' ){
sTipo = ObjCampo[0].type;
}else{
sTipo = ObjCampo.type;
}
valor = ObjCampo.value;
if( valor.indexOf("'")>-1 ) valor = valor.replace(/'/g,'"');
for( indice=0; indice<_cForm.length; indice++ ){
if( _cForm[indice].Nombre==NomCampo ) break;
}
if( _cForm[nc].Tipo.substring(0,1)=='F' ){
valor = "'" + valor + "'";
}else{
if( _cForm[nc].Tipo!='+' && _cForm[nc].Tipo!='-' ) valor = "'"+valor+"'";
}
xCondi = xCondi.replace( '{'+NomCampo+'}', valor );
}
while( xCondi.indexOf(' or ' ,0)!=-1 ) xCondi = xCondi.replace(' or ' ,' || ');
while( xCondi.indexOf(' and ',0)!=-1 ) xCondi = xCondi.replace(' and ',' && ');
try{
if( !eval( xCondi.replace(/\\/g,'/') ) ){
if( resultado ){
FocoCampo = NomCampo;
FocoTipo = sTipo;
FocoHoja = sFRM;
resultado = false;
}
Mensaje += _cGlobal[nCampo].Mensaje+"<BR>";
}
}catch(e){
for( i in e )alert(i+': '+e[i]);
}
}
if( !resultado ){
_ConError = true;
while( Mensaje.indexOf('&NBSP;', 0)!=-1 ) Mensaje = Mensaje.replace('&NBSP;', ' ');
while( Mensaje.indexOf('  ', 0)!=-1 ) Mensaje = Mensaje.replace('  ', ' ');
if( FocoTipo!='radio' ){
Obj = eval(FocoHoja+'.'+FocoCampo);
if( DGI('_INPUT_'+FocoCampo)!=null ) Obj = DGI('_INPUT_'+FocoCampo);
}else{
Obj = eval(FocoHoja+'.'+FocoCampo+'[0]');
}
if( !_CARD && S.toTag(Obj,'TR').getAttribute("SubTab")!=null ) S(DGI('SubTab'+S.toTag(Obj,'TR').getAttribute("SubTab"))).eventFire("click");
top.eAlert(eLng(43), Mensaje, 'A','W', function(){
var exe = (S(Obj).attr("ST")==null) ? Obj:eSelectTreeFoco;
if( typeof(exe)=="object" ){
eFocus(exe);
if( S(Obj).attr("eFILENAME")!=null ){
S(Obj).eventFire("click");
}else if( Obj.readOnly && S(Obj).attr("ST")==null ){
Obj.className = "ERROR";
setTimeout(function(){
Obj.className = "READONLY";
}, 750);
}
}else if( typeof(exe)=="function" ){
exe();
}
});
if( xFRM!=FocoHoja && eval(FocoHoja).getAttribute("eType")!='Constante' ){
PonSolapa(FocoHoja.substring(3));
}
if( Obj.readOnly ){
}else{
if( !Obj.readOnly && Obj.offsetWidth>0 ){
}else{
if( !Obj.readOnly && Obj.offsetWidth==0 ) SeekVerTR( Obj );
}
}
}
_NomCampo = '';
return resultado;
}
function OkCampo(nCampo, NomCampo){
var valor = eval(NomCampo).value, e=0,
LenMen = Mensaje.length, i;
if( valor.length==0 ){
if( _cForm[nCampo].Tipo=='DC' && _cForm[nCampo].Condicion.length>0 ) valor = '**';
return true;
}
var uLabel = _cForm[nCampo].Label.toUpperCase();
switch( _cForm[nCampo].Tipo ){
case 'T':
if( valor.length!=eval(NomCampo).getAttribute("Leng") ) e = 1;
break;
case 'CP':
if( valor.length!=5 ) e = 1;
if( !( (valor>='01000' && valor<'54000') || (valor>='60000' && valor<'62000') ) ) Mensaje += eLng(45)+"\n";
break;
case 'DNI':
if( _Accion=='A' || _Accion=='M' ){
for(i=1; i<8; i++){
if( _ChrNum.indexOf(valor.charAt(i))<0 ){
Mensaje += eLng(46,'DNI')+"\n";
break;
}
}
ePadLeft(eval(NomCampo), 8);
}
break;
case 'NIF':
if( valor.length!=1 && valor.length!=9 ){
e = 1;
}else if( valor.length==9 ){
if( (_ChrNum+_ChrDni).indexOf(valor.charAt(0))<0 || _ChrCif.indexOf(valor.charAt(8))<0 ){
Mensaje += eLng(46,'DNI')+"\n";
break;
}
for(i=1; i<8; i++){
if( _ChrNum.indexOf(valor.charAt(i))<0 ){
Mensaje += eLng(46,'DNI')+"\n";
break;
}
}
if( !eOkDNI(valor.substring(0,8), valor.charAt(8)) ){
Mensaje += eLng(47)+"\n";
break;
}
}
break;
case 'nif':
if( valor.length!=8 && valor.length!=9 ){
e = 1;
}else{
if( (_ChrNum+_ChrDni).indexOf(valor.charAt(0)) < 0 ){
Mensaje += eLng(46,'DNI')+"\n";
break;
}
for(i=1; i<8; i++){
if( _ChrNum.indexOf(valor.charAt(i)) < 0 ){
Mensaje += eLng(46,'DNI')+"\n";
break;
}
}
if( valor.length==9 ){
if( _ChrCif.indexOf(valor.charAt(8)) < 0 ){
Mensaje += eLng(46,'DNI')+"\n";
break;
}
if( !eOkDNI( valor.substring(0,8), valor.charAt(8) ) ){
Mensaje += eLng(47)+"\n";
break;
}
}
}
break;
case 'CIF':
if( valor.length!=9 ) e = 1;
if( e==0 && (_Accion=='A' || _Accion=='M') && !eOkCompany(valor) ) Mensaje += eLng(42,uLabel)+"\n";
break;
case 'cif':
if( valor.length!=9 ) e = 1;
if( _Accion=='A' ){
for(i=1; i<8; i++){
if( _ChrNum.indexOf(valor.charAt(i)) < 0 ){
Mensaje += eLng(46,'CIF')+"\n";
break;
}
}
}
break;
case 'CCC':
if( valor.length!=11 ) e = 1;
if( e==0 && _Accion=='A' && !okccc(valor) ) Mensaje += eLng(42,uLabel)+"\n";
break;
case 'NAF':
if( valor.length!=12 ) e = 1;
if( e==0 && _Accion=='A' && !oknaf(valor) ) Mensaje += eLng(42,uLabel)+"\n";
break;
case 'F4':
if( valor.length!=10 ){
e = 1;
}else{
if( eOkDate(valor)===false ) Mensaje += eLng(48,uLabel)+"\n";
}
break;
case 'P4':
if( valor.length!=7 ){
e = 1;
}else{
if( eOkPeriod(valor,4)===false ) Mensaje += eLng(49,uLabel)+"\n";
}
break;
case 'H':
if( eval(NomCampo).size!=valor.length ){
e = 1;
}else{
if( eOkHour(valor, eval(NomCampo).size)===false ) Mensaje += eLng(50,uLabel)+"\n";
}
break;
case 'DC':
if( valor.length!=2 ) Mensaje += eLng(51)+"\n";
if( valor.length==0 && _cForm[nCampo].Condicion.length > 0 ) valor = '**';
break;
case 'NSS':
if( valor.length!=11 ) e = 1;
if( e==0 && (valor.substring(0,2)<'01' || valor.substring(0,2)>'52') ) Mensaje += eLng(42,uLabel)+"\n";
break;
case '@':
if( !eOkEMail(valor) ) Mensaje += eLng(52,uLabel)+"\n";
break;
case 'f':
break;
case 'F':
break;
case '-,':
case '+,':
var DCM = S(eval(NomCampo)).attr("DCM"),
Leng = S(eval(NomCampo)).attr("Leng"),
t = S.keyCheck[_cForm[nCampo].Tipo].length-1;
txt = S.keyCheck[_cForm[nCampo].Tipo][t][0].replace("{LONG-1}", "{0,"+(Leng-1)+"}").replace("{LONG}", "{0,"+Leng+"}").replace("{DEC}", "{0,"+DCM+"}").replace("{SEEK}", "");
if( !(new RegExp(txt)).test(S.replace(valor, S.setup.thousands,"")) ){
e = 1;
}
break;
case 'CLR':
if( !eOkColor(valor) ) Mensaje += eLng(155)+"\n";
break;
default:
if( _CHR[_cForm[nCampo].Tipo]!=undefined && _CHR[_cForm[nCampo].Tipo][3]!='' ){
var Patron = new RegExp(_CHR[_cForm[nCampo].Tipo][3]);
if( !Patron.test(valor) ) Mensaje += eLng(53,uLabel)+"\n";
}
}
if( e==1 ){
if( _cForm[nCampo].Label!='' ){
Mensaje += eLng(55,uLabel);
}else{
Mensaje += eLng(54);
}
Mensaje += "\n";
}
return(LenMen==Mensaje.length);
}
function eD2S(d,s){
return top.eD2S(d,s);
}
function eDTS(d,s){
return top.eD2S(d,s);
}
function eS2D(d){
return top.eS2D(d);
}
function eS2S(d){
return( (d.length==8) ? d.substring(0,4)+'-'+d.substring(4,6)+'-'+d.substring(6,8) : d );
}
function eCheckDate(Fecha){
try{
if( Fecha.replace(/\s/g,'')=='' ) return true;
Fecha = Fecha.replace(/\//g,'-');
var t = (Fecha+'--').replace(/\//g,'-').split('-');
var F = new Date( t[2], (t[1]*1)-1, t[0] );
var D = F.getDate()+''; if( D.length==1 ) D = '0'+D;
var M = (F.getMonth()+1)+''; if( M.length==1 ) M = '0'+M;
var A = F.getFullYear()+'';
return( D+'-'+M+'-'+A==Fecha );
}catch(e){ return false; }
}
function eOkDate(Valor){
var res = S.check("D", Valor);
return(res==false)? false:Valor;
}
function eOkPeriod(Valor){
if( Valor=="" ) return Valor;
Valor = S.format("P4", Valor);
var ret = S.check("M", Valor);
return(ret ? Valor : false);
}
function eOkHour( Valor, Long ){
while( Valor.length > 0 && Valor.substring(0,1)==':' ) Valor = Valor.substring(1);
while( Valor.length > 0 && Valor.substring(Valor.length-1)==':' ) Valor = Valor.substring(0,Valor.length-1);
if( Valor.length==0 ) return '';
if( Valor.indexOf(':')>-1 ){
var tmp = Valor.split(':');
for( var n=0; n<tmp.length; n++ ) if( tmp[n].length < 2 ) tmp[n] = ePadLeft(tmp[n],2);
Valor = tmp[0];
for( var n=1; n<tmp.length; n++ ) Valor = Valor+':'+tmp[n];
}
if( Valor.length==1 ) Valor = '0'+Valor;
if( Long > 2 && Valor.substring(2,3)!=':' ){
Valor = Valor.substring(0,2)+':'+Valor.substring(2);
if( Valor.length==3 ) Valor += '00';
}
if( Long > 6 && Valor.substring(5,6)!=':' ){
Valor = Valor.substring(0,5)+':'+Valor.substring(5);
if( Valor.length==6 ) Valor += '00';
}
if( Valor.length!=Long ) return false;
var tmp = Valor.split(':');
for( var n=0; n<tmp.length; n++ ){
if( tmp[n].length!=2 ) return false;
if( (tmp[n]*1) > ((n==0)?23:59) ) return false;
}
return Valor;
}
function eOkEMail( email ){
email = eTrim(email);
if( email=="" ) return true;
if( email.length<7 ) return false;
if( email.substr(0,1)=='.' || email.substr(0,1)=='@' ) return false;
if( email.substr(email.length-1)=='.' || email.substr(email.length-1)=='@' ) return false;
if( email.indexOf('@')==-1 ) return false;
if( email.indexOf('..')>-1 || email.indexOf('.@')>-1 || email.indexOf('@.')>-1 ) return false;
return true;
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
return( filter.test(email) );
}
function okmail( txt ){
if( txt=='' ) return true;
return !( txt.indexOf('@')<1 || txt.length<7 );
}
function oknumero( Valor, Dec ){
var i = Valor.length, c = patron = '';
if( i==0 ) return '';
for( var n=0; n<i; n++ ){
c = Valor.substring(n,n+1);
switch( c ){
case ',':
case '-':
patron += c;
break;
default:
patron += 'N';
}
}
while( patron.indexOf('NN')!=-1 ) patron = patron.replace('NN','N');
if( patron==',N' ){
Valor = '0'+Valor;
patron = 'N'+patron;
}else if( patron=='-,N' ){
Valor = '-0'+Valor.substring(1);
patron = '-N'+patron.substring(1);
}
if( ':-N,N:N,N:N:-N:'.indexOf(patron)==-1 ) return false;
return eShowThousands( Valor, Dec );
}
function okCondicion( dato ){
if( dato=='*' ){
top.eAlert(S.lng(209), eLng(56), 'A','W');
return false;
}
var Busca = new Array('<=','>=','<>','<','>','=','*');
var Hay   = new Array( 0  , 0  , 0  , 0 , 0 , 0 , 0 );
var MaxCon= new Array( 1  , 1  , 9  , 1 , 1 , 9 , 9 );
var c = uc = cb = patron = '', tc = 0, u = false, ok;
for( var i=0; i<dato.length; i++ ){
c = dato.substring(i,i+1);
if( '<>=*'.indexOf(c)!=-1 ){
cb += c;
patron += 'c';
}else{
patron += 'D';
if( cb!='' ){
ok = false;
for( var n=0; n<Busca.length; n++ ){
if( Busca[n]==cb ){
Hay[n]++;
ok = true;
break;
}
}
if( !ok ){
top.eAlert(S.lng(209),  eLng(57,cb), 'A','W');
return false;
}
tc++;
uc = cb;
}
cb = '';
}
}
if( cb!='' ){
ok = false;
for( var n=0; n<Busca.length; n++ ){
if( Busca[n]==cb ){
Hay[n]++;
ok = true;
break;
}
}
if( !ok ){
top.eAlert(S.lng(209),  eLng(57,cb), 'A','W');
return false;
}
tc++;
uc = cb;
}
if( Hay[6] > 0 ){
for( var i=0; i<Busca.length; i++ ){
if( i!=6 && Hay[i] > 0 ){
top.eAlert(S.lng(209), eLng(58), 'A','W');
return false;
}
}
}
var txt = '';
for( var i=0; i<Busca.length; i++ ){
if( Hay[i] > MaxCon[i] ){
if( txt!='' ) txt += '\n';
if( MaxCon[i]==0 ){
txt += eLng(59,Busca[i]);
}else{
txt += eLng(60,Busca[i]);
}
return false;
}
}
if( txt!='' ){
top.eAlert(S.lng(209), txt, 'A','W');
return false;
}
if( Hay[0]+Hay[3] > 1 ){
top.eAlert(S.lng(209), eLng(61,Busca[0],Busca[3]), 'A','W');
return false;
}
if( Hay[1]+Hay[4] > 1 ){
top.eAlert(S.lng(209), eLng(61,Busca[1],Busca[4]), 'A','W');
return false;
}
while( patron.indexOf('cc')!=-1 ) patron = patron.replace('cc','c');
while( patron.indexOf('DD')!=-1 ) patron = patron.replace('DD','D');
if( patron.substring(patron.length-1,patron.length)=='c' && uc!='*' && patron!='c' ){
top.eAlert(S.lng(209), eLng(62,uc), 'A','W');
return false;
}
if( patron.substring(0,1)!='c' && tc>0 && Hay[6]!=tc && uc!='*' ){
top.eAlert(S.lng(209), eLng(63), 'A','W');
return false;
}
return true;
}
function eClearThousands(Obj){
return S.thousandsClear(Obj);
}
function eShowThousands(Pts, Deci){
return S.thousands(Pts, Deci);
}
function eOkDNI(oDNI, Letra){
if( (oDNI+Letra).match('^[T]{1}[A-Z0-9]{8}$')!=null ) return true;
var DNI = oDNI.replace('X','0').replace('Y','1');
if( DNI.length!=8 ) return false;
if( DNI.length==8 && Letra=='' ) return true;
if( _ChrDni.indexOf(DNI.substr(0,1)) > -1 && Letra=='' ) return true;
if( !isNaN(oDNI+Letra) && Letra=='' ) return true;
if( isNaN(DNI) || !isNaN(Letra) ) return false;
return (Letra.toUpperCase()==_ChrNif.charAt(DNI%23));
}
function eOkCIF(CIF, Letra){
var pares = 0, impares = 0,
suma, dc, resultado, cont,
uLetra = new Array("J","A","B","C","D","E","F","G","H","I");
CIF = CIF.toUpperCase();
var regular = /^[ABCDEFGHKLMNPQS]\d\d\d\d\d\d\d$/g;
if( !regular.exec(CIF) ) return false;
for(cont=1; cont<7; cont++){
resultado = (2 * parseInt(CIF.substr(cont++,1))).toString() + "0";
impares += parseInt(resultado.substr(0,1)) + parseInt(resultado.substr(1,1));
pares += parseInt(CIF.substr(cont,1));
}
resultado = (2 * parseInt(CIF.substr(cont,1))).toString() + "0";
impares += parseInt(resultado.substr(0,1)) + parseInt(resultado.substr(1,1));
suma = (pares + impares).toString();
dc = parseInt(suma.substr(suma.length - 1, 1));
dc = (10 - dc).toString();
if( dc==10 ) dc = 0;
if( (Letra==dc) || (Letra==uLetra[dc]) ) return true;
return false;
}
function eOkCompany( dato ){
if( dato=='' ) return true;
if( isNaN( (dato.substring(0,1)).replace('X','0').replace('Y','0').replace('T','0') ) ){
return eOkCIF( dato.substring(0,8), dato.charAt(8) );
}else{
return eOkDNI( dato.substring(0,8), dato.charAt(8) );
}
}
function okccc( nss ){
if( nss=='' ) return true;
if( nss.length!=11 ) return false;
var dc = nss.substr(9,2), cad = '';
if( nss.charAt(2)=='0' ){
cad = nss.substr(0,2) + nss.substr(3,6);
}else{
cad = nss.substr(0,9);
}
return( ((cad*1) % 97)==dc );
}
function oknaf( nss ){
if( nss=='' ) return true;
if( nss.length!=12 ) return false;
var dc = nss.substr(10,2), cad = '';
if( nss.charAt(2)=='0' ){
cad = nss.substr(0,2) + nss.substr(3,7);
}else{
cad = nss.substr(0,10);
}
return( ((cad*1) % 97)==dc );
}
function eOkNCC( banco, sucur, dc, ccc ){
var peso = new Array(1,2,4,8,5,10,9,7,3,6);
var suma = ndc = xdc = n = 0;
var txt = '0';
if( dc=='' ) return true;
if( ccc=='0000000000' ) return false;
if( dc.substring(0,1)!=' ' && dc.substring(0,1)!='*' ){
xdc = dc.substring(0,1);
txt = '00' + banco + sucur;
suma = 0;
for( n=1; n<=10; ++n ){
suma += (parseInt(txt.substring(n-1,n)) * peso[n-1]);
}
ndc = (11 - (suma % 11));
if(Math.abs(ndc==10)) ndc = 1;
if(Math.abs(ndc==11)) ndc = 0;
if(xdc!=ndc) return false;
}
if( dc.substring(1,2)!=' ' && dc.substring(1,2)!='*' ){
xdc = dc.substring(1,2);
txt = ccc;
suma = 0;
for( n=1; n<=10; ++n ){
suma += (parseInt(txt.substring(n-1,n)) * peso[n-1]);
}
ndc = (11 - (suma % 11));
if(ndc==10) ndc = 1;
if(ndc==11) ndc = 0;
if(xdc!=ndc) return false;
}
return true;
}
function eIBANCountry(PAIS){
var n,t="";
for( n=0; n<2; n++ ) t += "" + ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.search(PAIS.substring(n,n+1)) + 10);
return t;
}
function eIBAN( PAIS, BANCO, OFICINA, DC, CUENTA ){
PAIS = PAIS.toUpperCase();
var nPAIS = eIBANCountry(PAIS);
var iban = "" + (("" + BANCO + OFICINA) % 97) + DC + CUENTA.substring(0,2);
var Mod = iban % 97;
iban = "" + Mod + CUENTA.substring(2,CUENTA.length) + nPAIS + "00";
Mod = iban % 97;
var Cod = 98 - Mod;
if( Cod<10 ) Cod = "0" + Cod;
return PAIS+Cod;
}
function eOkNSS(nss){
if( nss.length!=11 ) return false;
top.eAlert(S.lng(209), nss+'\n'+nss.substring(2,3), 'A', 'W');
return false;
}
function eOkColor(valor){
var patron = /^[#][A-Fa-f0-9]{6}$/;
return(valor=='' || patron.test(valor));
}
function _SetColor(Campo){
if( eGF(Campo)=='' ){
eGO(Campo).style.backgroundColor = '';
}else{
try{
eGO(Campo).style.backgroundColor = eGF(Campo);
eGO(Campo).style.color = top.eColorContrastBW(eGF(Campo));
}catch(e){}
}
}
function ePadLeft( campo, nLong, Fill ){
if( typeof(campo)=='object' && null==event ) return campo.value;
if( typeof(campo)=='string' && DGI(campo)!=null ) campo = eGO(campo);
var Valor = ( typeof(campo)=='object' ) ? campo.value : campo+'';
if( Valor=='' ) return Valor;
var aux = Valor;
var lon = aux.length;
var aux2 = aux.substring(1,lon);
var sLetra = '';
if( Fill==undefined ) Fill = '0';
for( var i=0; i<nLong; i++ ) if( aux.charAt(i)=='*' ) return Valor;
if( typeof(campo)=='object' && (_Tipo[campo.name]=='DNI' || _Tipo[campo.name]=='NIF' || _Tipo[campo.name]=='nif') && ( aux.charAt(0) < '0' || aux.charAt(0) > '9' )){
sLetra = aux.charAt(0);
for(; lon<nLong; ++lon,aux=campo.value ) campo.value = sLetra +Fill+ aux.substring(1,lon);
}else{
for(; lon<nLong; ++lon ) Valor = Fill+ Valor;
if( typeof(campo)=='object' ){
campo.value = Valor;
}else{
return Valor;
}
}
return Valor;
}
function _eFileOnClick(){
var Obj = S.event(window);
if( Obj.readOnly && eIndex(Obj.sourceIndex+1).oi!=undefined ) eIndex(Obj.sourceIndex+1).onclick();
}
function VerFile( xObj ){
if( xObj.substring(0,1)=='>' ){
var Dir = xObj.substring(1);
}else{
var Dir = eTrim(DGI(xObj).getAttribute("NewValue"));
}
if( Dir=='' ) return;
if( Dir.indexOf("fakepath")>-1 ){
S.error("El fichero todav�a no se ha enviado al servidor",5);
return;
}
top.eInfo(window,"Descargando...");
Dir = Dir.replace(/\//g,'\\');
var obj = document.createElement('a');
obj.setAttribute('href',Dir);
obj.setAttribute('target',"_blank");
obj.style.display = 'none';
document.body.appendChild(obj);
S(obj).eventFire("click");
document.body.removeChild(obj);
setTimeout("top.eInfoHide()",1000);
}
function _DelFile2(Valor, NO, DimPara){
if( Valor==2 ){
S._fileRecalSpace(eGO(DimPara[0]), 0);
ePF(DimPara[0],'');
var o = eGO(DimPara[0]), txt,dim,
vImg = S(".IMGBOX[eFrom='"+DimPara[0]+"'] IMG");
if( vImg.length ){
vImg.hidden();
setTimeout(function(){
vImg.obj.src = "";
vImg.visible();
}, 100);						 // vImg.attr("src","")
}
txt = S(o).attr("eCopy");
if( txt!="" ){
tmp = S.nsp(txt).split(",");
for(n=0; n<tmp.length; n++){
od = tmp[n].split("=");
if( S(":"+od[0]).length ){
S(":"+od[0]).val("");
}
}
}
o.setAttribute("eUpload", -1);
S(":_FILE_"+DimPara[0]).attr("eOnChange","").val("");
o = S("I[eFO='"+DimPara[0]+",D']");
if( S(o).exists() ){
o.obj.disabled = false;
S(o).class("+OFF");
S(o).attr("eSizeFile",0);
}
}
}
function _DelFile(xObj){
var obj = eGO(xObj);
if( obj.value!="" ){
top.eAlert(S.lng(210), eLng(73,obj.value), 'A,C', 'g/sys_delete.gif', _DelFile2, null, Array(xObj,obj));
}
}
function CallSrvIFrame( sUrl, Obj ){
if( parent.frames.WinSelect==undefined ){
if( window.WinSelect==undefined ){
NewTLF.insertAdjacentHTML("beforeEnd","<IFRAME id='WinSelect' src='' eNORESIZE=true width='100px' height='100px' FRAMEBORDER=0 SCROLLING='no' STYLE='display:none; position:absolute; left:0px; top:0px; z-index:-10;'></IFRAME>");
}
}
if( Obj!=undefined ){
var x = y = 0, el = Obj;
while( el!=null ){
x += el.offsetLeft;
y += el.offsetTop;
el = el.offsetParent;
}
sUrl = sUrl +'&_FORMA_='+ x+','+y+','+Obj.offsetWidth+','+Obj.offsetHeight+','+document.body.clientWidth+','+document.body.clientHeight;
}
DGI("PAGINA").style.filter = 'gray()';
try{
WinSelect.location.href = sUrl;
}catch(e){}
}
function CallSrvCnd(file, Condi, valor){
if( null==event ) return;
if( !Condi ) return;
if( file.indexOf('.')==-1 ) file += '.php';
var txt = file+'&'+valor;
try{
_CallSrv( 'edes.php?E:'+txt );
}catch(e){}
}
function eCallSrv(win, File, Cond){
if( null==event && !_OnLoadCallSrv ) return;
if( Cond!=undefined && !Cond ) return;
var n = File.indexOf('=');
if( n>-1 && File.substr(0,n).indexOf('.')==-1 && File.substr(0,n).indexOf(':')==-1 ){
File = 'edes.php?E:CallSrv='+_Source+'&'+File;
}else{
File = ((File.indexOf('edes.php?')!=-1)?'':'edes.php?E:')+File;
}
if( File.indexOf('.')==-1 ) File += '.php';
if( _Remote ) File = File.replace('edes.php?','edes.php?R');
top.eCallSrv( win, File, Cond );
}
function _eCallSrv(win, File, Cond){
if( top.eReadyState(win) ){
eCallSrv(win, File, Cond);
}
}
function eCallParent(file, ConEvent){
if( ConEvent!=undefined ) if( ConEvent ) if( null==event ) return;
var txt = ((file.indexOf('edes.php?')!=-1)?'':'edes.php?E:')+file;
if( window.ICALLPARENT==undefined ){
document.body.insertAdjacentHTML("beforeEnd", "<IFRAME name=ICALLPARENT id=ICALLPARENT src='' eNORESIZE=true width='100%' height='100%' style='display:none'></IFRAME>");
}
try{
if( top.eReadyState(ICALLPARENT) ){
if( _Remote ) txt = txt.replace('edes.php?','edes.php?R');
ICALLPARENT.location.href = txt;
ICALLPARENT.frameElement.WOPENER = window;
}else{
setTimeout('eCallParent("'+txt+'")', 300);
}
}catch(e){
if( e['number']==-2147024891 || e['number']==-2147467259 ) ICALLPARENT.location.href = 'edes.php?r:/_datos/config/empty_page.htm';
setTimeout('eCallParent("'+txt+'")', 300);
}
}
function CallSrvWinList( file, valor, Obj ){
if( file.indexOf('.')==-1 ) file += '.php';
var txt = file+'&'+valor;
try{
_CallSrv('edes.php?E:'+txt);
}catch(e){}
}
function SelInfo(val, txt){
var o = S.event(event);
S(o).css("backgroundColor:#cccccc");
top.eCallSrv(window, 'edes.php?Y:'+txt.replace('this.value',val)+'&_FOCUS='+o.name+'&_SOURCE='+_Source);
}
function _SelInfo(val, txt){
if( event!=null ) SelInfo(val, txt);
}
function gsLimpia( txt ){
if( null!=event ){
var NomForm = S.event(window).form.name+'.';
if( S.event(window).value.length==0 ){
var tmp = txt.split(',');
for( var n=0; n<tmp.length; n++ ){
if( tmp[n].indexOf('.')==-1 ){
eval(NomForm+tmp[n]).value = '';
}else{
eval(tmp[n]).value = '';
}
}
}
}
}
function Cerrar(){
}
function AbreVentana(sNomFile, exe, MasInfo, NoEvent){
var tipo = 's';
if( NoEvent==undefined ) NoEvent = 0;
if( '_'==sNomFile.substring(0,1) ) sNomFile = sNomFile.substring(1);
var NomFile = sNomFile.toLowerCase();
if( MasInfo.search(':')!=-1 ){
var tmp = MasInfo.split(':');
MasInfo = tmp[0];
NomFile = tmp[1];
while( NomFile.indexOf(' ',0)!=-1 ) NomFile = NomFile.replace(' ','');
}
if( exe=='F' ){
NomFile = 'c:'+NomFile;
if( NomFile.indexOf('.')==-1 ) NomFile += '.fdf';
}else{
tipo += 'r';
NomFile = 'l:'+NomFile;
if( NomFile.indexOf('.')==-1 ) NomFile += '.ldf';
}
if( MasInfo!='' ){
MasInfo = '&_NOEVENT='+NoEvent + '&_SEL_=' + escape(MasInfo);
MasInfo = MasInfo.replace('%26_FILTER%3D', '&_FILTER=');
MasInfo = MasInfo.replace('%26_AUX_%3D', '&_AUX_=');
MasInfo = MasInfo.replace('%26_ASSIGN%3D', '&_ASSIGN=');
var tmp = MasInfo.split('&_ASSIGN=');
if( tmp.length==2 ){
tmp[1] = tmp[1].replace(/%26/g,'&').replace(/%3D/g,'=').replace(/%34/g,'"').replace(/%27/g,"'");
MasInfo = tmp[0]+'&_ASSIGN='+tmp[1];
}
}
var iUrl = 'edes.php?'+ exe + NomFile+ '&_CAMPO_='+sNomFile+MasInfo+'&_PSOURCE='+_Source;
if( _Remote ) iUrl = iUrl.replace('edes.php?','edes.php?R');
top.eSWOpen(window, iUrl);
}
function eSelInfo(EDF, nForm, Asignaciones, WTitulo){
top.eSWOpen(window, 'edes.php?Fc:'+EDF+'&_CAMPO_=&_SEL_='+escape(nForm+';'+Asignaciones)+'&_PSOURCE='+_Source, WTitulo);
}
function FunPadre(ele, NomFunc, MasInfo, NoEvent){
switch( NomFunc ){
case 'B':
var fch = (typeof(ele)=='object') ? ele.id : ele;
if( NoEvent==undefined ) NoEvent = 0;
AbreVentana(fch, 'F', MasInfo, NoEvent);
break;
case 'b':
var fch = (typeof(ele)=='object') ? ele.id : ele;
if( NoEvent==undefined ) NoEvent = 0;
AbreVentana(fch, 'L', MasInfo, NoEvent);
break;
case 'c':
top.Memoriza(ele, window);
break;
case 'p':
top.Restaura(ele, window);
break;
case 'd':
if( !event.ctrlKey ) top.VerRestaura(ele, window);
break;
case 'D':
if( eIndex(ele.sourceIndex-1).readOnly ) return;
top.eSWOpen(window, 'edes.php?Ll:$a/d/word_key.edf&_FILTER='+escape('dct_field="'+ele.id.substr(1)+'"')+'&_DCT_SUFFIX='+_DCT_SUFFIX);
break;
case 'a':
break;
}
}
function _SetDefault(Obj){
if( /^(I|IMG)$/i.test(Obj.tagName) ){
var NomField=Obj.id.substring(2), sObj=Obj, on=true, Valor2='';
}else{
var NomField=Obj.name, sObj=Obj, on=true, Valor2='';
S.info(Obj.value==""? "Valor por defecto eliminado": "Valor fijado por defecto", 2);
}
Obj = DGI(NomField);
try{
var Valor = (eGF(NomField)+'').replace(/0/g,'').replace(/\./g,'').replace(/\,/g,'.');
if( S(sObj).text()=="g" || Valor=="" || DGI(NomField).ConValor==eGF(NomField) ){
on = false;
}
if( on ){
if( S(sObj).text()=="h" ) S(sObj).text("g").title(false).class("-OFF");
top._FIELDS['default_'+Obj.name] = eGF(NomField);
if( DGI('_INPUT_'+NomField)!=null ){
Valor2 = eSelectValue(NomField);
top._FIELDS['default_INPUT_'+NomField] = Valor2;
}
if( eGA(NomField, 'eAssign')!=null && eGA(NomField, 'eAssign')!='' ){
top._FIELDS['default_eAssign_'+Obj.name] = eGA(NomField, 'eAssign');
top._FIELDS['default_eValue_'+Obj.name] = eGF(eGA(NomField, 'eAssign'));
}
}else{
if( S(sObj).text()=="g" ) S(sObj).text("h").title(true).class("+OFF");
DGI(NomField).ConValor = null;
top._FIELDS['default_'+NomField] = undefined;
if( DGI('_INPUT_'+NomField)!=null ){
Valor2 = "";
top._FIELDS['default_INPUT_'+NomField] = undefined;
}
if( eGA(NomField, 'eAssign')!=null && eGA(NomField, 'eAssign')!='' ){
top._FIELDS['default_eAssign_'+Obj.name] = undefined;
top._FIELDS['default_eValue_'+Obj.name] = undefined;
}
}
}catch(e){}
if( top.eDefaultShow ) top.eDefaultShow(Obj.name, Obj.value, Valor2);
top._SaveDefaults();
}
function _eDefault(Obj){
if( top._FIELDS['default_'+Obj]!=undefined && top._FIELDS['default_'+Obj]!=eGF(Obj) ){
ePF(Obj, top._FIELDS['default_'+Obj]);
S('#__'+Obj).text("g").title(false).class("-OFF");
if( eGA(Obj, 'eAssign')!=null && eGA(Obj, 'eAssign')!='' ){
ePF(top._FIELDS['default_eAssign_'+Obj], top._FIELDS['default_eValue_'+Obj]);
}
}
if( DGI(Obj)!=null ) DGI(Obj).setAttribute('ConValor', eGF(Obj));
}
function _eDefaultAll(){
var f,c,tc;
for(f=0; f<document.forms.length; f++){
tc = document.forms[f].elements;
for(c=0; c<tc.length; c++){
try{
if( DGI('__'+tc[c].name)!=null ) _eDefault(tc[c].name);
}catch(e){}
}
}
}
function eDefaults(ConModo, campos){
var Indice = top._gsScript(window,ConModo)+'__default_',
ico = S('#_eDefaults_');
if( campos!=undefined ) Indice = campos;
if( top._FIELDS[Indice]=='S' ){
top.Fields('U', window, ConModo, campos);
if(ico.exists()) S(ico).text("h").title(false).class("+OFF");
delete( top._FIELDS[Indice] );
}else{
top._FIELDS[Indice] = 'S';
top.Fields('G', window, ConModo, campos);
if(ico.exists()) S(ico).text("g").title(true).class("-OFF");
}
}
function _SubSelectFill2(o, d){
var tmp = o.split(','), n, v = '';
for(n=0; n<tmp.length; n++) v += ""+eGF(tmp[n]);
var o = DGI(d+'_TABLE'), t = o.rows.length;
ePF(d,"",0);
for(n=0; n<t; n++) o.deleteRow(0);
if( v!="" ){
var m=eval('__'+d+'["'+v+'"]'), TR, c, tc;
if(m==undefined ){
DGI('_INPUT_'+d).style.backgroundColor = "";
return;
}
t = m.length;
tc = m[0].length;
TR = o.insertRow();
TR.insertCell().textContent = '';
for(c=1; c<tc; c++) TR.insertCell().textContent = ' ';
if( DGI('_INPUT_'+d).ADDOPTION!=undefined ){
var tmp = DGI('_INPUT_'+d).ADDOPTION.split(';'), tmp2;
for(c=0; c<tmp.length; c++){
tmp2 = tmp[c].split(',');
TR = o.insertRow();
for(n=0; n<tmp2.length; n++) TR.insertCell().textContent = tmp2[n];
}
}
for(n=0; n<t; n++){
TR = o.insertRow();
for(c=0; c<tc; c++) TR.insertCell().textContent = m[n][c];
}
}
DGI('_INPUT_'+d).style.backgroundColor = "";
}
function _SubSelectFill(o,d){
DGI('_INPUT_'+d).style.backgroundColor = '#cccccc';
setTimeout(function(){ _SubSelectFill2(o,d); },100);
}
function AuxFiltro(txt, NomFile, Ss, PutValor, FuncFiltro, ExeFunc){
var sTxt = txt,
sNomFile = NomFile,
sSs = Ss;
if( _SSMemory[NomFile]!=undefined ){
_SubSelectFill(txt, NomFile);
return;
}
if( txt!='' ){
var tmp = txt.split(',');
for( var n=0; n<tmp.length; n++ ){
if( tmp[n].indexOf('.')>-1 ) tmp[n] = tmp[n].substring(tmp[n].indexOf('.')+1);
else if( tmp[n].indexOf(':')>-1 ) tmp[n] = tmp[n].substring(tmp[n].indexOf(':')+1);
if( DGI(tmp[n]).value=='' ){
try{
DGI(tmp[n]).focus();
}catch(e){}
try{
if( DGI('_INPUT_'+NomFile).getAttribute("DynamicSQL")==null ) return;
}catch(e){ return; }
}
}
}
var Ancho = 350, Alto = 400, tipo = 'rs',
Filtro = '', TFiltro = '',
Destino = NomFile;
if( FuncFiltro!=undefined && FuncFiltro!=null ){
Filtro = FuncFiltro(txt, NomFile);
}else if( txt!='' ){
var NomCampo = txt.split(',');
for(var n=0 in NomCampo){
if( n>0 ) Filtro += '&';
if( NomCampo[n].indexOf(':')>-1 ){
var tmp = NomCampo[n].split(':');
Filtro += tmp[1] + '="' + DGI(tmp[0]).value + '"';
TFiltro += DGI(tmp[0]).value;
}else{
if( NomCampo[n].indexOf('.')>-1 ) NomCampo[n] = NomCampo[n].substring(NomCampo[n].indexOf('.')+1);
if( DGI(NomCampo[n]).getAttribute("FRF")!=null ){
Filtro += DGI(NomCampo[n]).getAttribute("FRF") + '="' + DGI(NomCampo[n]).value + '"';
}else{
Filtro += NomCampo[n] + '="' + DGI(NomCampo[n]).value + '"';
}
TFiltro += DGI(NomCampo[n]).value;
}
}
try{
if( DGI('_INPUT_'+NomFile).getAttribute("DynamicSQL")==null ) if( TFiltro.length==0 ) return;
}catch(e){
if( TFiltro.length==0 ) return;
}
}
var oNomFile = NomFile;
if( NomFile.indexOf('[')>-1 ) NomFile = NomFile.substring(0,NomFile.indexOf('['));
var Obj = DGI(NomFile),
NomOrd='*',
NomSel = '_INPUT_'+NomFile;
if( NomFile.substring(0,3)=='cd_' ){
NomFile = NomFile.substring(3);
NomOrd = 'nm_';
}
var Accion = (AuxFiltro.arguments.length>2)? 'S' : 'Ll';
if( Obj.getAttribute("eScript")!=null && Obj.getAttribute("eScript").indexOf("?")>-1 ){
if( Filtro!="" ) Filtro += "&";
Filtro += Obj.getAttribute("eScript").split("?")[1];
}
var we = 'edes.php?'+((_Remote)?'R':'')+Accion+':'+oNomFile.toLowerCase()+'.ldf&_AUX_=S&_ORDEN_='+NomOrd+NomFile+'&_FILTER='+escape(Filtro)+'&_DESTINO_='+escape(Destino)+'&_PSOURCE='+_Source;
if( DGI(NomSel).getAttribute("ORDERBY")!=null ) we += "&_ORDERBY="+DGI(NomSel).getAttribute("ORDERBY");
if( AuxFiltro.arguments.length>2 ){
DGI(NomSel).style.backgroundColor = '#cccccc';
we += '&_SIZE_='+Obj.size+'&_MULTI_='+Obj.multiple+'&_Mode='+_Mode;
if( DGI(Destino).getAttribute('OnChangeSrv')!=null ) we += '&ONCHANGESRV='+ DGI(Destino).getAttribute('OnChangeSrv');
if( Obj.getAttribute("NMATRIBUTE")!=null ) we += '&NMATRIBUTE='+ DGI(Destino).getAttribute("NMATRIBUTE");
if( Obj.getAttribute("ADDOPTIONVALUE")!=null ) we += '&ADDOPTIONVALUE='+ DGI(Destino).getAttribute("ADDOPTIONVALUE");
if( DGI(NomSel).getAttribute("ADDOPTION")!=null ) we += "&ADDOPTION='"+ DGI(NomSel).getAttribute("ADDOPTION")+"'";
if( typeof(_DB)!='undefined' ) we += "&_DB='"+_DB+"'";
if( Obj.getAttribute("xSELECT")!=null || DGI(NomSel).getAttribute("DynamicSQL")!=null ){
if( DGI(NomSel).getAttribute("DynamicSQL")!=null ){
var tmp = eval(DGI(NomSel).getAttribute("DynamicSQL"))();
if( tmp[0]=='' ){
eClearSelect(Obj.name,0);
DGI(NomSel).style.backgroundColor = '';
return eClearEvent();
}
we += '&xSELECT='+tmp[0];
if( tmp[1]!='' ) PutValor = tmp[1];
if( tmp[2]!=undefined && tmp[2]!='' ) ExeFunc = tmp[2];
}else{
we += '&xSELECT='+ DGI(Destino).getAttribute("xSELECT");
}
}
if( PutValor!=undefined && PutValor!=null ) we += '&PUTVALOR='+PutValor;
if( ExeFunc!=undefined && ExeFunc!=null ) we += '&EXEFUNC='+ExeFunc;
if( DGI(Destino).getAttribute("WhereSelect")!=null ) we += '&WhereSelect="'+DGI(Destino).getAttribute("WhereSelect")+'"';
if( DGI(NomSel).getAttribute("_QED")!=null ) we += '&_QED=1';
if( DGI("_INPUT_"+Obj.name).getAttribute("eFilter")!=null ) we += '&_eFilter=1';
if( Obj.getAttribute("eCache")!=null ) we += '&_Cache=1';
if( Obj.getAttribute("eDBLimit")!=null ) we += '&_eDBLimit='+Obj.getAttribute("eDBLimit");
if( Obj.getAttribute("eScript")!=null ) we += '&_SCRIPT='+Obj.getAttribute("eScript");
if( we.indexOf("&_CONTEXT=")==-1 ) we += "&_CONTEXT="+_CONTEXT;
try{
S.callSrv(we, window);
}catch(e){
if( e['number']==-2147024891 || e['number']==-2147467259 ) _CallSrv('edes.php?r:/_datos/config/empty_page.htm');
}
}else{
}
}
function gsFireEvent(Obj, Evento){
var txt = (eval(Obj+'.'+Evento)+'').replace('function anonymous()','').replace('{','').replace('}','').replace(/\n/g,'');
eval(txt);
}
function eSelectLoad(NomCampo, DependeDe, Sql, PutValor, ExeFunc, eScript){
if( Sql!=undefined && Sql!=null ) DGI(NomCampo).setAttribute("xSELECT", "B2A:"+S.replace(btoa(Sql),"+","{43}"));
if( DependeDe==undefined || DependeDe==null ) DependeDe = '';
if( eScript ) eGO(NomCampo).eScript = eScript;
S.selectReset(NomCampo);
AuxFiltro(DependeDe, NomCampo, 1, PutValor, null, ExeFunc);
}
function Espejo(prefijo, Obj, desactivo){
var Propagar = (Obj.name.substr(0,7)=='_INPUT_' ),
Campo = Obj.name.replace('_INPUT_','');
if( prefijo=='_' ){
if( DGI('_'+Campo)!=null && DGI(Campo)!=null ) ePF('_'+Campo, eGF(Campo), Propagar);
}else{
if( DGI(Campo.substr(1))!=null && DGI(Campo)!=null ) ePF(Campo.substr(1), eGF(Campo), Propagar);
}
return eClearEvent();
}
var _CmpHoja;
function SetControl( nSolapa ){
if( _CmpHoja[nSolapa]=='#' || _CmpHoja[nSolapa].charAt(0)=='[' ) return;
var FocoCampo = eval('FRM' + nSolapa + '.' + _CmpHoja[nSolapa]);
if( !FocoCampo.readOnly && FocoCampo.offsetWidth > 0 ){
try{
FocoCampo.focus();
}catch(e){}
}
xFRM = "FRM"+nSolapa;
}
function SeCargo(NomFunc, CampoFoco){
if( (CampoFoco==undefined || CampoFoco=="") && _FieldFocus!="" ) CampoFoco = _FieldFocus;
try{
if( !top.eReadyState(window) ){
setTimeout('SeCargo("'+NomFunc+'","'+CampoFoco+'")', 50);
return;
}
}catch(e){
setTimeout('SeCargo("'+NomFunc+'","'+CampoFoco+'")', 50);
return;
}
if( NomFunc.length>0 ) eval(NomFunc);
(top.eIsWindow(window)) ? eLoading(false) : top.eLoading(false,window);
if( /^(?:a|mR)$/.test(_Mode) && S("INPUT[type=file]").length>0 ){
S("#PAGINA").on('dragover', S.fileDrag);
}
window.focus();
if( CampoFoco!='' && !_UpdateToView ){
var FocoOn = false;
try{
if( !DGI(CampoFoco).readOnly && !DGI(CampoFoco).getAttribute("eReadOnly") && DGI(CampoFoco).offsetWidth>0 ){
eFocus(CampoFoco);
FocoOn = true;
}else{
SiguienteCampo(CampoFoco);
}
}catch(e){
SiguienteCampo();
}
_CampoFoco = document.activeElement;
}
}
function _MueveFiles( txt ){
for(var n=0; n<=_slNumFile; n++){
if( DGI(txt+'_'+n)!=null ) document.FRM1.appendChild(DGI(txt+'_'+n));
}
}
var _Fila = 0;
try{
if( typeof(top.eIsWindow)!='undefined'  && ',A,B,M,'.indexOf(','+_Accion+',')!=-1 && (_Source==_WOPENER._Source || _SourceOne==_WOPENER._Source || _Source==_WOPENER._NmGDF || _Source==_WOPENER._Source.replace('.edf','.gdf')) ){
_Fila = _WOPENER._Fila;
}
}catch(e){}
function _ModList(){
if( _pID!=_WOPENER._eID ) return;
var o = S(".BROWSE", _WOPENER);
if( o.obj.offsetWidth==0 ){
if( !_WOPENER._ModeCard ) o.block();
if( !_WOPENER._ListMenuRow ){
o = S(".MENUFOOTLIST", _WOPENER).display("table");
S("TD", o).display("table-cell");
}
}
var ValorNew=ValorOld=oCAMPO='', n,i, sShowZero, Reutilizar=false, dimAction__={"M":"Modificado", "B":"Borrado", "A":"Insertado"};
_WOPENER._FilaLastInsert = null;
_WOPENER._FilaLastUpdate = null;
if( _Accion=='B' ){
_Fila.style.textDecoration = 'line-through';
if( _WOPENER.name=='_ISUBLIST' ){
try{
var TD = _Fila.cells;
for(n=0; n<TD.length; n++){
for(i=0; i<TD[n].children.length; i++){
if( TD[n].children[i].tagName=='IMG' ){
TD[n].children[i].className = "OFF";
TD[n].children[i].disabled = true;
}
}
}
}catch(e){}
_WOPENER._RecalcColsOp();
}
if( _WOPENER._CARDSHOW ){
var i = _Fila.rowIndex-S("#BROWSE THEAD TR", _WOPENER).length,
oCard = S(".card[eTR='"+i+"']", _WOPENER);
oCard.attr("eDelete",1);
S("*", oCard).css("color:#cccccc;text-decoration:line-through;")
}
if( window.name=="IWORK2" ) S("#BROWSE",_WOPENER).block("table");
return;
}else if( _Accion=='A' ){
if( _WOPENER.name=='_ISUBLIST' ) var oTRows = _WOPENER.BROWSE.rows.length;
if( _WOPENER.frames._SUBLISTADO!==undefined ) _WOPENER = _WOPENER.frames._SUBLISTADO;
n = _WOPENER.BROWSE.rows.length;
if( _WOPENER.BROWSE.rows[n-1].className!='' && _WOPENER.BROWSE.rows[n-1].className!="Visited" ) n--;
if( _WOPENER.BROWSE.rows[n-1].getAttribute("LIBRE")==1 ){
for(i=n-1; i>=0; i--){
if( _WOPENER.BROWSE.rows[i].getAttribute("LIBRE")!=1 ){
_Fila = _WOPENER.BROWSE.rows[i+1];
_Fila.removeAttribute('LIBRE');
Reutilizar = true;
break;
}
}
}else{
_Fila = _WOPENER.BROWSE.tBodies[0].insertRow(_WOPENER.BROWSE.tBodies[0].rows.length);
_Fila.style.fontStyle = "italic";
if( S("TABLE[class=BODYLIST", _WOPENER).length ){
S('#ToolsPaginate', _WOPENER).none();
S("I", _WOPENER).each(function(k,o){
if( o.innerHTML=="(" ) S(S.toTag(o,"TR")).none();
});
_WOPENER.document.body.onkeydown = null;
_WOPENER.document.body.onmousewheel = null;
S("TABLE[class=BODYLIST", _WOPENER).none();
}
if( _WOPENER.BROWSE["eMenu"]!=undefined ){
if( S("TABLE[class=BODYLIST", _WOPENER).length==1 ) S("TABLE[class=BODYLIST", _WOPENER).none();
S(_WOPENER).menuRow(_Fila);
}
}
_WOPENER.eMarkVisited(_Fila);
_WOPENER._FilaLastInsert = _Fila;
var t = S(".BROWSE TH[nc]", _WOPENER).length;
for(i=0; i<t; i++) _Fila.insertCell(i);
if( _WOPENER._CARDSHOW ){
var i = _Fila.rowIndex-S("#BROWSE THEAD TR", _WOPENER).length,
oCard = S(".CONTENEDORCARD .card[eTR='"+i+"']", _WOPENER),
q = S(".CONTENEDORCARD .card[eTR='0']", _WOPENER).nodeCopy();
q.attr({ePK:-1, eTR:i});
S("*[i]", q).each(function(k,o){ o.innerHTML=""; });
S("*", q).css("color:;text-decoration:none;");
if( _WOPENER._ModeCard ) q.css("display:");
q.nodeEnd(S(".CONTENEDORCARD", _WOPENER).obj);
_WOPENER._CardEvent(q);
}
}else if( _Accion=='M' ){
_Fila.style.fontStyle = "italic";
_WOPENER._FilaLastUpdate = _Fila;
if( _WOPENER._CARDSHOW ){
var i = _Fila.rowIndex-S("#BROWSE THEAD TR", _WOPENER).length,
oCard = S(".card[eTR='"+i+"']", _WOPENER);
S("*[i]", oCard).css("color:#cccccc;font-style:italic");
}
}
var Obj = S("#BROWSE TH[nc]", _WOPENER).dim, Valor, tmp, nn, attr;
for(n=0; n<Obj.length; n++){
if( Obj[n].getAttribute("te")==null ) continue;
if( S("IMG, I",_Fila.cells[n]).length && !/^(ICON|IMG)$/.test(Obj[n].getAttribute("te")) ){
if( Obj[n].getAttribute("te").toUpperCase()!='C' && Obj[n].getAttribute("te").toUpperCase()!='H' ){
if( Obj[n].getAttribute("te").toUpperCase()=="I" ){
for(nn=0; nn<_Fila.cells[n].children.length; nn++){
var tipoFile, sFile, oExt, oFile, nExt;
if( S(_Fila.cells[n].children[nn]).attr("eFile")!=null ){
oFile = S(_Fila.cells[n].children[nn]).attr("eFile");
tipoFile = S("TH[te=F]", _WOPENER.BROWSE);
if( tipoFile ){
sFile = eTrim(_Fila.cells[S(tipoFile).attr("nc")].innerHTML);
nExt = "."+S.fileType(sFile);
oExt = "."+S.fileType(oFile);
S(_Fila.cells[n].children[nn]).attr("eFile", S.replace(oFile, oExt, nExt));
}
}
}
}
continue;
}
}
if( Obj[n].getAttribute("oCAMPO").indexOf('{')>-1 ){
tmp = Obj[n].getAttribute("oCAMPO").split('{');
oCAMPO = eTrim(tmp[0]);
}else if( Obj[n].getAttribute("oCAMPO").indexOf(':')>-1 ){
tmp = Obj[n].getAttribute("oCAMPO").split(':');
oCAMPO = eTrim(tmp[0]);
}else{
tmp = Obj[n].getAttribute("oCAMPO").split(' ');
oCAMPO = eTrim(tmp[tmp.length-1]);
}
ValorOld += eTrim(_Fila.cells[n].innerHTML);
try{
switch( Obj[n].getAttribute("te") ){
case "T":
case "F":
if( DGI(oCAMPO)==null ){
if( oCAMPO=="cdi__" ){
_Fila.cells[n].textContent = S.date("Y-m-d H:m:s");
}else if( oCAMPO=="action__" ){
_Fila.cells[n].textContent = dimAction__[_Accion];
}
continue;
}
var o = DGI(oCAMPO),
tc = o.getAttribute("tc");
if( /^(P4|F4|CDI|T)$/i.test(tc) ){
_Fila.cells[n].textContent = S.dataFormat(o.value, tc);
}else if( Obj[n].getAttribute("td")=='+' || Obj[n].getAttribute("td")=='-' ){
sShowZero = _ShowZero; _ShowZero = 1;
_Fila.cells[n].textContent = eShowThousands( DGI(oCAMPO).value, 0 );
_ShowZero = sShowZero;
}else if( Obj[n].getAttribute("td")=='+,' || Obj[n].getAttribute("td")=='-,' ){
sShowZero = _ShowZero; _ShowZero = 1;
_Fila.cells[n].textContent = eShowThousands( DGI(oCAMPO).value, Obj[n].getAttribute("nd") );
_ShowZero = sShowZero;
}else if( o.getAttribute("MultipleValues")!=null ){
tmp = [];
if( S("#LIST_"+oCAMPO).length ){
S(S("#LIST_share_group").col(2)).each(function(k,o){
tmp.push(S.trim(o.textContent));
});
}else{
S(".ITEM", "#_"+oCAMPO).each(function(k,o){
tmp.push(S.trim(o.innerHTML.split("<i>")[0]));
});
}
_Fila.cells[n].innerHTML = tmp.join("<br>");
}else{
_Fila.cells[n].textContent = S.replace(eGF(oCAMPO), "&#39;","'", "&#34;",'"', "&quot;",'"', "&#92;","\\");
}
break;
case "S": case "SS": case "Ss": case "SV":
if( Obj[n].getAttribute("oCAMPO").indexOf('{')==-1 ){
if( DGI( Obj[n].getAttribute("oCAMPO") )==null ) continue;
if( DGI( '_INPUT_'+Obj[n].getAttribute("oCAMPO") )==null ) continue;
Valor = eGF('_INPUT_'+Obj[n].getAttribute("oCAMPO"));
}else{
var Campo = Obj[n].getAttribute("oCAMPO").replace(/\s/g,'');
Campo = '_INPUT_'+Campo.substring(0,Campo.indexOf('{'));
if( DGI(Campo)==null ) continue;
Valor = eGF(Campo);
}
_Fila.cells[n].textContent = S.replace(Valor, "&#39;","'", "&#34;",'"', "&quot;",'"', "&#92;","\\");
break;
case "R": case "r":
if( DGI( oCAMPO )==null ) continue;
tmp = Obj[n].getAttribute("DimRadio").split('|');
Valor = eGF(oCAMPO);
if( tmp.length==0 ){
_Fila.cells[n].textContent = Valor;
}else{
_Fila.cells[n].textContent = '';
for(i=0; i<tmp.length-1; i+=2) if( tmp[i]==Valor ){
_Fila.cells[n].textContent = tmp[i+1];
break;
}
}
break;
case "C": case "c":
if( DGI(oCAMPO)==null ) continue;
Valor = S(":"+oCAMPO).val();
attr = ( Valor==_CheckBoxSave[0] )? "CheckON" : "CheckOFF";
_Fila.cells[n].innerHTML = (S("col[nc='"+n+"']", _WOPENER).attr(attr)!=_CheckBoxSave[1]) ? S("col[nc='"+n+"']", _WOPENER).attr(attr) : Valor;
break;
case "H":
case "A":
if( DGI(oCAMPO )==null ) continue;
Valor = S(":"+oCAMPO).val();
if( Obj[n].getAttribute("td")=='#' ) Valor = Valor.replace(/&amp;/g,'&').replace(/&#43;/g,'+').replace(/&lt;/g,'<').replace(/&gt;/gi,'>').replace(/&#92;/g,'\\').replace(/&quot;/gi,'"').replace(/&#39;/gi,"'");
if( Obj[n].getAttribute("te")!='H' ){
_Fila.cells[n].innerHTML = S.replace(Valor, S.char(10), "<br>");
}else{
_Fila.cells[n].innerHTML = Valor;
}
break;
case "SORT":
_Fila.cells[n].innerHTML = '<i class="ICONINPUT">&#294;</i>';
break;
case "P":
_Fila.cells[n].textContent = S(":"+oCAMPO).val();
break;
case "IMG":
case "ICON":
try{
var v = S(":"+oCAMPO).val(), ext, txt="", seek,
eFile = _WOPENER.BROWSE.getAttribute("down_"+oCAMPO)+"/",
pre = _WOPENER.BROWSE.getAttribute("pre_"+oCAMPO),
alto = _WOPENER.BROWSE.getAttribute("height_"+oCAMPO);
if( v!="" ){
ext = S.fileType(v);
seek = _WOPENER.BROWSE.getAttribute("seekcampos");
if( seek.indexOf(",")==-1 ){
eFile += pre+_Fila.cells[seek.split(":")[1]].textContent+"."+ext;
var dimTipo = {
pdf:202,
xls:203, xlsx:203, xml:203,
doc:204, docx:204, txt:204,
png:206, jpeg:206, jpg:206, gif:206, tiff:206, tif:206, bmp:206,
avi:229, mpeg:229, mp4:229,
mp3:228, wav:228,
zip:345, rar:345
}
if( typeof(dimTipo[ext])=="undefined" ) ext = 234;
else ext = dimTipo[ext];
txt = ' onclick="eVD()" oncontextmenu="eVD()" efile="'+eFile+'" title="Click IZQ: Ver documento\nClick DCH: Descargar documento">&#'+ext;
}else{
txt = '>&#234';
}
if( Obj[n].getAttribute("te")=="ICON" ){
txt = '<i class="ICONINPUT"'+txt+";</i>";
}else{
if( _Fila.cells[n].children.length ) S(_Fila.cells[n].children[0]).nodeRemove();
txt = "<img src='edes.php?R:"+eFile+"&_pk="+S.date("u")+"'"+S.mid(txt,0,">")+" style='"+alto+"'>";
_WOPENER._ImgRefresh(_Fila.cells[n], txt);
txt = "<img src='' style='width:1px;"+alto+"'>";
}
}
_Fila.cells[n].innerHTML = txt;
}catch(e){}
break;
default:
_Fila.cells[n].textContent = '';
if( Obj[n].getAttribute("oCAMPO")=='_TOTAL_' ) _Fila.cells[n].className = 'PieLista';
}
if( _WOPENER._CARDSHOW ){
var i = _Fila.rowIndex-S("#BROWSE THEAD TR", _WOPENER).length,
oCard = S(".CONTENEDORCARD .card[eTR='"+i+"']", _WOPENER);
S("*[i='"+n+"']", oCard).html(_Fila.cells[n].innerHTML);
}
}catch(e){}
ValorNew += eTrim(_Fila.cells[n].innerHTML);
}
if( _Accion=='A' && _WOPENER.name=='_ISUBLIST' ){
if( !Reutilizar ) _Fila.insertCell();
n = _Fila.cells.length-1;
with( _Fila.cells[n] ){
innerHTML = _WOPENER._ISLOPTD;
className = 'Celda';
style.textDecoration = 'none';
}
if( (''+_WOPENER._HISubList).indexOf('R')>-1 && oTRows<=parseInt(_WOPENER._HISubList) ){
n = _WOPENER.BROWSE.offsetHeight + _WOPENER.BROWSE.offsetTop + top.eXY(_WOPENER.BROWSE)[1];
_WOPENER.window.frameElement.style.height = n+"px";
if( oTRows==parseInt(_WOPENER._HISubList) ) _WOPENER._HISubList = n;
}
}
if( (_Accion=='A' || _Accion=='M') && _WOPENER.name=='_ISUBLIST' ){
try{
eval('FUNCTION_iSubList')(_Accion, _Fila);
}catch(e){}
}
var tmp = window.location.href.split('edes.php');
ValorNew = ValorNew.replace(tmp[0],'').replace(/0|,|\.|\s/g,'');
ValorOld = ValorOld.replace(tmp[0],'').replace(/0|,|\.|\s/g,'');
if( _Accion=='A' || ValorOld!=ValorNew ){
_Fila.style.fontStyle = 'italic';
_WOPENER._RecalcColsOp();
_WOPENER.Recalcula(1);
if( _Accion=='A' ) _WOPENER.document.body.scrollTop = _WOPENER.document.body.scrollHeight;
}
if( typeof(_ISubList)!="undefined" && _ISubList ) document.FRM1.action += "&_ISUBLIST";
if( window.name=="IWORK2" ) S("#BROWSE",_WOPENER).block("table");
}
var _MemSubmit = false,
_BakReplace = false,
_FileSufijo = 0;
function BakReplace_(){
var Obj = null, nc;
for(nc in _cForm){
if( _cForm[nc].Tipo.substring(0,1)=='#' ){
Obj = eGO(_cForm[nc].Nombre);
Obj.value = Obj.value.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#92;/g,'\\').replace(/&#43;/g,'+');
}else if( '|+|-|'.indexOf(_cForm[nc].Tipo)!=-1 || _cForm[nc].Tipo.search(',')!=-1 ){
Obj = eGO(_cForm[nc].Nombre);
Obj.value = eShowThousands( Obj.value, S(Obj).attr("DCM") ) ;
}
}
}
function _CountResult(val){
S("#DimRecuentos TR").each(function(k,o){
if( k>0 ) o.className = "";
});
val = val.split("|");
if( typeof(DimCount)=="undefined" ){
DimCount = new Array();
DimCountPK = new Array();
}
DimCount[DimCount.length] = val[0];
DimCountPK[DimCountPK.length] = _CountPK;
S.infoHide();
S.info("Registros encontrados: "+val[0], 3);
eDisableButton(0);
if( DGI("DimRecuentos")!=null ){
_AddCountLast(val[1]*1);
}else{
_LastCounts(val[1]*1);
}
try{ document.body.disabled = false; }catch(e){}
document.body.style.visibility = "visible";
}
function eRestoreCheckbox(){
	S("input[eCheckToInput='1']").each(function(k, o){
		o.removeAttribute("eCheckToInput");
		o.type = "checkbox";
		o.style.width = "";
	});

	S("input[eValueBAK]").each(function(k, o){				//toDo:
		o.value = o.getAttribute("eValueBAK");
		o.removeAttribute("eCheckToInput");
	});	
}
function _Submit(){
if( _DEBUG==13 && (_Accion=='M' || _Accion=='A') ){
top.gsViewFields(window, "Antes de procesar - 2");
}
_F10(0);
try{
if( DGI('_ICALL')!=null ) S(DGI('_ICALL')).nodeRemove();
}catch(e){}
if( ',a,c,m,b,'.indexOf(','+_Accion+',')!=-1 ){
location.href = document.FRM1.action+((document.FRM1.action.indexOf("&_CONTEXT=")==-1)? "&_CONTEXT="+_CONTEXT : "");
}else{
if( document.forms[0].target=="TLF" ){
top.TLF.frameElement.WOPENER = window;
document.FRM1.target = 'TLF';
}else if( _CountType==1 ){
var dim=[], n,v;
S("INPUT").each(function(k,o){
//if( o.name[0]!="_" ){
v = S(o).obj.value;							// S(o).val();
if( v!="" ) dim[o.name] = v;
//}
});
S.call(_Action, dim, {function:_CountResult});
eRestoreCheckbox();
return;
}else top.eSWLoading(window,1);
if( _MemSubmit ){
_MemSubmit = false;
if( top._MemForm!=null ) S(top._MemForm).nodeRemove();
top._MemForm = S(document.FRM1).nodeCopy();
top._MemForm.style.display = 'none';
if( window.name=='' ) window.name = window.frameElement.id;
top._MemForm.target = window.name;
top.document.body.appendChild(top._MemForm);
}
var t = S("INPUT[type=FILE]").dim, n, ConFile=false, sufijo, nmFile;
_FileSufijo = 0;
for(n=0; n<t.length; n++){
if( t[0].getAttribute("eMultifile")!="1" && t[n].value!="" ){
if( !ConFile ){
if( DGI('_FIELDSWITHFILES')==null ){
var i = document.createElement('INPUT');
i.name = i.id = '_FIELDSWITHFILES';
i.value = '';
i.style.display = 'none';
document.FRM1.appendChild(i);
var i = document.createElement('INPUT');
i.name = i.id = '_FILESUPDATE';
i.value = '';
i.style.display = 'none';
document.FRM1.appendChild(i);
}else{
DGI('_FIELDSWITHFILES').value = '';
DGI('_FILESUPDATE').value = '';
}
ConFile = true;
}
if( t[n].name=="_FILE__MULTIFILE" ){
DGI('_FIELDSWITHFILES').value += t[n].getAttribute("pFile")+'|';
t[n].setAttribute("eDivide", 0);
if( (t[n].files[t[n].getAttribute("nFile")].size*1)>(S.setup.maxFileUploads*1) ){
t[n].setAttribute("eDivide", 1);
}
S(".OneOfN").hidden();
}else{
DGI('_FIELDSWITHFILES').value += t[n].name.replace("_FILE_","")+'|';
if( S(":"+S.mid(t[n].name,6,0)).length && S(":"+S.mid(t[n].name,6,0)).attr("eFileUpdate") ){
DGI('_FILESUPDATE').value += S(":"+S.mid(t[n].name,6,0)).attr("eFileUpdate");
}
DGI('_FILESUPDATE').value += "|";
}
sufijo = S(t[n]).attr("SUFIJOFILE");
nmFile = (sufijo) ? '/_tmp/php/'+_User+'_'+sufijo : nmFile = '/_tmp/zip/'+_User+'_'+_FileSufijo;
if( t[n].getAttribute("eDivide")==1 ){
previewFile(t[n], S(":"+t[n].name).obj, nmFile);
}else{
_DimFile.push(["e", "f", t[n].name, nmFile]);
}
if( !sufijo ) _FileSufijo++;
}
}
if( typeof(_NewAction)!="undefined" && _NewAction=="S" ){
for(n=0; n<document.forms.length; n++){
if( /^FRM[0-9]{1,2}$/.test(document.forms[0].name) && document.forms[0].name!="FRM1" ){
var dim = document.forms[n].elements, i;
for(i=dim.length-1; i>=0; i--) if( dim[i].tagName=="INPUT") document.FRM1.appendChild(dim[i]);
}
}
for(n in _cForm) _cForm[n].Formulario = "1";
}
_submitFile();
}
}
function _submitFile(){
var n,t=_DimFile.length;
for(n=0; n<t; n++) if(_DimFile[n] && _DimFile[n][0]=="p" ){
setTimeout(function(){_submitFile();}, 250);
return;
}
for(n=0; n<t; n++){
if(_DimFile[n]){
switch( _DimFile[n][1] ){
case 'f':
S.file(S(":"+_DimFile[n][2]).obj, _DimFile[n][3], _submitFile, (n+1)/t*100);
_DimFile[n] = null;
return;
case 'd':
S.progressUpload(((n+1)/(t))*100, "");
top.S.call("edes.php?cluster", {
file: _DimFile[n][3],
position: _DimFile[n][4],
total: _DimFile[n][5],
content: _DimFile[n][6]
}, {function:_submitFile, pct:(n+1)/t*100, asynchronous:false, window:window});
_DimFile[n] = null;
return;
}
}
}
_Submit2();
S.progressUpload();
}
var _DimFile=[];
function previewFile(obj, oFile, srvFile){
_DimFile.push(["p", "d", oFile, srvFile, 0, 0, ""]);
if( window.File && window.FileReader && window.FileList && window.Blob ){
var file = oFile.files[S(oFile).attr("nFile")*1],
reader = new FileReader();
reader.onloadend = function(){
var i = reader.result.substring(i, 60).indexOf(",")+1, n,p,
long = reader.result.length-i,
div = Math.ceil(long / S.setup.maxFileUploads),
trozo = S.setup.maxFileUploads;
long += i;
top.S.progressText();
for(n=0; n<_DimFile.length; n++){
if( _DimFile[n]!=null && _DimFile[n][0]=="p" && _DimFile[n][3]==srvFile ){
_DimFile[n][0] = "e";
_DimFile[n][4] = 1;
_DimFile[n][5] = div;
_DimFile[n][6] = reader.result.substring(i, i+trozo);
for(p=1; p<div; p++){
i += trozo;
if( p==(div-1) ) trozo = long-i;
_DimFile.push(["e", "d", _DimFile[n][2], _DimFile[n][3], p+1, div, reader.result.substring(i, i+trozo)]);
}
break;
}
}
}
if(file){
top.S.progressText("Loading...");
reader.readAsDataURL(file);
}
}
}
function _Submit2(){
if( typeof(_Progress)!='undefined' ){
var title = (typeof(_ProgressTitle)!='undefined') ? _ProgressTitle : '',
detail = (typeof(_ProgressDetail)!='undefined') ? _ProgressDetail : '';
top.eProgress(window, 0, title, '', detail);
}
if( _WOPENER && _Mode.length==1 && _Mode!="a" && (typeof(_WOPENER._InSubWin)!="undefined" && _WOPENER._InSubWin) ){
var nam = _WOPENER.name, txt;
if( nam=="" ){
nam = new Date().getTime();
_WOPENER.name = nam;
}
txt = S.mid(document.FRM1.action, "?", ":");
document.FRM1.action = S.replace(document.FRM1.action, [["?"+txt+":", "?L"+txt[1]+"l:"],["&_SUBINSERT=1",""]]);
document.FRM1.target = nam;
document.FRM1.submit();
setTimeout(function(){top.eSWClose(window)}, 1);
return;
}
S("INPUT").each(function(k,o){
try{ o.disabled = false; }catch(e){}
});
if( _ConCtrlKey>0 && ',c,m,b,'.indexOf(','+_Mode+',')!=-1 ){
if( S.is('edes.php?B:', document.FRM1.action) ){
var NewPag = S.callCreate(window);
}else{
var NewPag = top.eSWOpen(window, 'append-blank', '', false, -5,-3);
}
var ins = new Date().getTime();
NewPag.name = ins;
document.FRM1.target = ins;
document.FRM1.submit();
document.FRM1.target = '';
/*
S("input[eCheckToInput='1']").each(function(k, o){	//toDo:
o.removeAttribute("eCheckToInput");
o.type = "checkbox";
o.style.width = "";
});
*/
eRestoreCheckbox();
eDisableButton(0);
S.loading(window, 0);
}else{
if( _CountType!=1 ) S.loading(window, 1);
else eDisableButton(0);
if( ',cR,mR,bR,'.indexOf(','+_Accion+',')>-1 && document.FRM1.target!='_SUBLISTADO' && _Action.indexOf(_Source)>-1 ){
if( (document.FRM1.action+'').indexOf('&_BAK=1')==-1 && (document.FRM1.action+'').indexOf('edes.php?Ll:')==-1 ) document.FRM1.action += '&_BAK=1';
}
_OkChange = null;
if( document.FRM1.action.indexOf("&_CONTEXT=")==-1) document.FRM1.action += '&_CONTEXT='+_CONTEXT;
if( _RecalcOptionsInList ) document.FRM1.action += '&_RECALCOPTIONSINLIST=1';
if( _DEBUG==13 && (_Accion=='M' || _Accion=='A') ) top.gsViewFields(window, "Antes del submit");
S.accessAction(window, document.FRM1);
document.FRM1.submit();
document.FRM1.target = '';
/*
S("input[eCheckToInput='1']").each(function(k, o){	//toDo:
o.removeAttribute("eCheckToInput");
o.type = "checkbox";
o.style.width = "";
});
*/
eRestoreCheckbox();									//toDo:
}
if( 'c,b,m'.indexOf(_Mode)>-1 && top._M_!='' ) top._ReloadForm = new Array(document.FRM1.action, document.FRM1.outerHTML);
_ConCtrlKey = 0;
_Action = _Action.replace('&_SUBLISTADO_=1', '');
if( _CountType==1 ){
try{
if( _BakReplace ) BakReplace_();
eFocus(_LastFocusField);
}catch(e){}
}
if( _DEBUG==13 && (_Accion=='M' || _Accion=='A') ) top.gsViewFields(window, "Despues del submit");
}
function eDisableButton(On){
if( On==undefined ) On = true;
ConF10 = !On;
if( null==DGI("OpExe") ) return;
S("TABLE#OpButtons").visibility(!On);
}
function _CancelSubmit(){
if( null!=DGI("OpExe") ){
if( _Obj=='F' && _ChildrenData.length>0 && _Mode=='c' ){
}else{
eDisableButton(0);
}
}
return true;
}
var _Intentos=_ConCtrlKey=0, _SysOcupado=null, _SeekForUpdate=false, _IniSubmit=0;
function eOkTab(Btn){
if( _DEBUG==13 && (_Accion=='M' || _Accion=='A') ) top.gsViewFields(window, "Antes de procesar - 1");
if( _TabListON && 'bcm'.indexOf(_Mode)>-1 && Btn==undefined ){
_ChangeOp();
return eClearEvent();
}
if( _IniSubmit===2 ){
_IniSubmit = 0;
return;
}
_IniSubmit = 1;
if( top._DimEvent.length>0 || _CheckIndex || !top.eReadyState(window) ){
top.eInfo(window, S.lng(220));
setTimeout(function(){
eOkTab(Btn);
}, 500);
return eClearEvent();
}
_IniSubmit = 0;
_ErrMensaje = _ErrCampo = ''; _ErrForm = -1;
var saveSort = false;
S("IFRAME.ISubList").each(function(k, o){
if( o.contentWindow._SortListSave ){
saveSort = true;
o.contentWindow.GrabarSort();
return null;
}
});
if( saveSort ){
setTimeout(function(){
eOkTab(Btn);
}, 500);
return eClearEvent();
}
if( _Mode=='c' && _SeekForUpdate && event!=null && event.shiftKey ){
_Action = _Action.replace("?GcR:","?GmR:").replace("?FcR:","?FmR:");
}
if( _Action.indexOf('&_SUBLISTADO_=1')==-1 && _ConCtrlKey<2 ) _ConCtrlKey = (event!=null && event.ctrlKey) ? 1 : 0;
_Intentos++;
if( _Intentos<3 && (top.__eAlert || _CheckIndex) ) return eClearEvent();
if( _SysOcupado==null ) _SysOcupado = new Date().getTime();
try{
if( !top.eReadyState(window) ){
if( (new Date().getTime()-_SysOcupado)>5000 ){
_SysOcupado = null;
top.eInfo( window, S.lng(220), -1 );
}
setTimeout(function(){
eOkTab(Btn);
}, 500);
return;
}
}catch(e){
if( e['number']==-2147024891 || e['number']==-2147467259 ) top.eRepairIFrame(window);
top.eInfo(window, S.lng(220));
setTimeout(function(){
eOkTab(Btn);
}, 500);
return;
}
top.__eAlert = false;
_CheckIndex = false;
if( _FormStatic ){
if( _FormStaticConect ){
top.eInfo(window, S.lng(220));
setTimeout(function(){
eOkTab(Btn);
}, 500);
return;
}
}
_SysOcupado = null;
top.eInfoHide(window);
_eOkTab(2, Btn);
}
function _eOkTab2(Ok){
_eOkTab(Ok, undefined);
}
function _eOkTab(Ok, Btn){
try{
if( !top.eReadyState(window) ){
top.eInfo(window, S.lng(220));
setTimeout(function(){
eOkTab(Ok, Btn);
}, 500);
return;
}
}catch(e){
if( e['number']==-2147024891 || e['number']==-2147467259 ) top.eRepairIFrame(window);
top.eInfo(window, S.lng(220));
setTimeout(function(){
eOkTab(Ok, Btn);
}, 500);
return;
}
if( Ok!=2 ) return;
window.focus();
if( null!=event ) eClearEvent();
if( _ErrorOut==new Date().getTime() ) return;
if( _Action.indexOf('(')>-1 && _Action.indexOf('=')==-1 && _Action.indexOf('_GetValue_(')==-1 ){
_ErrForm = -1;
if( _Action.indexOf('this')>-1 ){
var n = _Action.indexOf('this'),
i = _Action.substring(n-1,n),
f = _Action.substring(n+4,n+5);
if( ' (),\t'.indexOf(i)>-1 && ' (),\t'.indexOf(f) > -1 ) _Action = _Action.replace('this','S.event(window)');
}
if( _MsgSubmit!='' ){
if( _MsgSubmitCondi=='' || eval(_MsgSubmitCondi)==true ){
x = "";
if( _MsgSubmitAlign!='' ) x += "white-space:normal;text-align:"+_MsgSubmitAlign+";";
if( _MsgSubmitWidth!='' ) x += "width:"+_MsgSubmitWidth+"px;";
S.alert({
title:S.lng(210),
icon:"DH",
button:"A,C",
text:(_MsgSubmit.substr(_MsgSubmit.length-2)=='()') ? eval(_MsgSubmit) : _MsgSubmit,
function: _eOkTab2,
style:x
});
return;
}
}
eval(_Action);
return;
}
eSubmit(undefined, Btn);
}
var _eSubmitBTN = null;
function eSubmit(uAction, Btn){
if( top._DimEvent && top._DimEvent.length>0 ){
top.eInfoError(window, S.lng(220));
return eClearEvent();
}
_eSubmitBTN = null;
if( uAction!=undefined ){
_Action = (S.mid(uAction,-1)==":") ? "edes.php?"+uAction+S.mid(S.url(window)["http"],":",0) : uAction;
}
var enviar=false, ok=true, n, x="";
if( !top.eReadyState(window) ) return false;
if( DGI('OpExe')!=null && (Btn==undefined || _CountType==1) ){
eDisableButton(1);
}
S("TEXTAREA").each(function(pk,o){
var div = S("#"+o.name+"_");
if( div.length ){
o.value = div.obj.innerHTML;
}
});
if( _Question ){
S("INPUT[tc]").each(function(pk,o){
var tc = S(o).attr("tc");
if( /^(\<|\=|\>)$/.test(o.value[0]) && /^(P4|F4|CDI|T|\+,|\-,|\+|\-)$/i.test(tc) ){
o.value = S(o).val();
}
});
}
if( ',M,A,'.indexOf(','+_Accion+',')!=-1 || _SearchConditions ){
if( _ErrForm==-10 ){
top.eAlert(S.lng(212), _ErrForm, 'A', 'E');
return false;
}
var res = Ok_Formulario(0);
ok = (res && _CamposOk==_cForm.length);
}else if( _Accion=='c' && _WOPENER._Obj=='L' && _WOPENER._SUBLISTADO_ ){
top.eSWClose(window);
}
if( ok && typeof(_Plugin)=='object' ){
for(n=0; n<_Plugin.length; n++){
if( _Plugin[n][0]=='S' ){
ok = eval( _Plugin[n][1] );
if( !ok ) break;
}
}
}
if( ok ){
if( event!=null && _Action.indexOf('&_SUBLISTADO_=1')==-1 && _CountType==1 ) top.eInfo(window, eLng(75), -1);
if( _MsgSubmit!='' ){
if( _MsgSubmitCondi=='' || eval(_MsgSubmitCondi)==true ){
if( _MsgSubmitAlign!='' ) x += "white-space:normal;text-align:"+_MsgSubmitAlign+";";
if( _MsgSubmitWidth!='' ) x += "width:"+_MsgSubmitWidth+"px;";
_eSubmitBTN = Btn;
S.alert({
title:S.lng(210),
icon:"DH",
button:"A,C",
text:(_MsgSubmit.substr(_MsgSubmit.length-2)=='()') ? eval(_MsgSubmit) : _MsgSubmit,
function: _eSubmit,
style:x
});
return;
}
}
_eSubmit(2);
}else{
_CancelSubmit();
}
}
var _CountPK='',
_slNumFile=0;
function _eSubmit(Ok){
if( Ok!=2 ){
_CancelSubmit();
return;
}
var Btn,enviar;
if( _eSubmitBTN!=null ) Btn = _eSubmitBTN;
var ok = true;
if( ok ){
if( _CountType==1 ){
_CountPK = Date.parse(new Date());
var n, txt="";
S("INPUT").each(function(k,o){
if( txt!="" ) txt += "|";
n = o.name;
txt += n+"|"+S(o).value();
if( S.mid(n,7)=="_INPUT_" && S("#"+S.mid(n,7,0)+"_TABLE").length ){
txt += "|#"+S.mid(n,7,0)+"_TABLE"+"|"+S("#"+S.mid(n,7,0)+"_TABLE").HTML();
}
});
try{
sessionStorage.setItem(_CountPK, txt);
txt = null;
}catch(e){}
}
if( DGI('edMENUS')!=null && DGI('edMENUS').style.display=='block' ) edSave();
if( _Action.search('G')>-1 || (_CountType==1 && DGI('TABMenu')!=null) ){
ok = OkExterno(1);
if( ok ){
enviar = preEnviarMF(Btn);
if( _SubmitHidden ){
top.TLF.frameElement.WOPENER = window;
document.FRM1.target = 'TLF';
_FormStaticConect = true;
}
}
}else{
ok = OkExterno(0);
if( ok ){
if( _FormStatic || _SubmitHidden ){
top.TLF.frameElement.WOPENER = window;
document.FRM1.target = 'TLF';
_FormStaticConect = true;
}
enviar = preEnviarF();
}
}
if( ok ){
if( _CountType!=1 ) S("BODY").hidden();
S("INPUT[eType='password']", window).each(function(p, o){
o.value = (o.value!="")? _e_(o.value) : o.getAttribute("eValueOld");
});
S("TEXTAREA", window).each(function(p, o){
if( o.form==null && S.mid(o.name,8)=="_FILTER_" ){
S(o).nodeEnd(document.forms[0]);
}
});
if( typeof(_SubmitTarget)!='undefined' ){
if( typeof(_SubmitTarget)=='object' ) _SubmitTarget = _SubmitTarget.frameElement.id;
var win = top.eGetIFrameById(top, _SubmitTarget);
win.name = _SubmitTarget;
win.frameElement.WOPENER = window;
document.FRM1.target = _SubmitTarget;
_FormStaticConect = true;
eDisableButton(false);
delete _SubmitTarget;
document.FRM1.action = _Action+((_Action.indexOf("&_CONTEXT=")==-1)? "&_CONTEXT="+_CONTEXT : "");
document.FRM1.submit();
document.FRM1.target = '';
eRestoreCheckbox();
return eClearEvent();
}
}
}
if( ok && enviar ){
if( window!=top && window.name=='IWORK' ){
if( _ViewFIELDS ){
_ViewFIELDS = false;
top.ViewFields();
eDisableButton(0);
return false;
}
if( window.name=='IWORK' && Btn==undefined && !_FormStatic && _CountType!=1 ) top.eLoading(true,window);
}
try{
_Action += '&_CLOSE_='+_CLOSE_;
}catch(e){}
if( _SubmitHidden && _Action.indexOf('_SubmitHidden')==-1 ) _Action += '&_SubmitHidden=1';
document.FRM1.action = _Action+((_Action.indexOf("&_CONTEXT=")==-1)? "&_CONTEXT="+_CONTEXT : "");
_Action = _Action.replace('&_LISTEMPTY=1','');
if( _CountType!=1 && _SaveList.length>0 && _Mode!='cR' ){
var nId = Date.parse(new Date())/1000, n;
try{
var SubListChildrenDATA = new Array();
for(n=0; n<_SaveList.length; n++) SubListChildrenDATA[n] = true;
var ReplaceData = SubListChildren();
if( typeof(ReplaceData)=='object' ){
for(n=0; n<_SaveList.length; n++) SubListChildrenDATA[n] = ReplaceData[n];
}
}catch(e){}
var txt='',r,d,c=0;
for(n=0; n<_SaveList.length; n++){
var Dim = _SaveList[n].split('|'),
eTabla = DGI(Dim[0]);
if( eTabla.getAttribute("ENVIAR")==1 || _Accion=='B' ){
if( !SubListChildrenDATA[n] ){
txt += ReplaceData[n+_SaveList.length]+'\n';
continue;
}
var xFILE = S(eTabla).attr("FILE") || "";
if( xFILE!='' ){
if( xFILE[0]!='>' ){
var sField = DGI(xFILE);
if( sField!=null ){
if( sField.value !='' && S(sField).attr("NUMFILE")!=undefined ){
var sRow = DGI(xFILE+'_0');
S(sRow).nodeSwap(sField);
sField.name = S(sField).attr("NUMFILE");
sField.id = S(sField).attr("NUMFILE");
sRow.name = xFILE;
sRow.id = xFILE;
}
_MueveFiles( xFILE );
}
}else{
S(eTabla).attr("FIELDFILE", xFILE.substr(1));
}
}
var posIndex = posFile = posFileIndex = -1, xCAMPO,
nAltoTH = S(eTabla).attr("AltoTH");
for(c=0; c<eTabla.rows[nAltoTH].cells.length; c++){
xCAMPO = S(eTabla.rows[nAltoTH].cells[c]).attr("CAMPO");
var oc = xCAMPO.split('.');
oc = oc[oc.length-1];
if( xCAMPO==Dim[4] || oc==Dim[4] ) posIndex = c;
if( S(eTabla).attr("FORMSTATIC")==1 ){
if( xCAMPO==eTabla.DBINDEX || oc==eTabla.DBINDEX ) posFileIndex = c;
if( '>'+xCAMPO==xFILE || '>'+oc==xFILE ) posFile = c;
}
}
var Campos = '';
for(c=nAltoTH; c<eTabla.rows[nAltoTH].cells.length; c++){
xCAMPO = S(eTabla.rows[nAltoTH].cells[c]).attr("CAMPO");
if( xCAMPO.substring(0,1)=="'" || xCAMPO.substring(0,1)=='"' || xCAMPO.toUpperCase().indexOf(' AS ') > 0 || xCAMPO.substr(0,1)=='_' ) continue;
Campos += ','+xCAMPO;
}
Campos = Campos.substring(1);
c=0;
for(r=1+parseInt(nAltoTH); r<eTabla.rows.length; r++){
if( S(eTabla.rows[r]).attr("LIBRE")==undefined && eTabla.rows[r].cells[0].id!='PieLista' ) c++;
}
var cFile='', td;
if( eTabla.getAttribute("FIELDFILE")!=null ) if( eTabla.getAttribute("FIELDFILE")!='' && eTabla.getAttribute("FIELDFILE").substr(0,1)!='_' ) cFile = eTabla.getAttribute("FIELDFILE");
if( xFILE!=undefined ) if( xFILE!='' && xFILE[0]!='_' ) cFile = xFILE;
var dimTD=[];
S("TH[nc]", eTabla).each(function(k,o){
var dim = S(o).attr("nc,td");
dimTD[dim["nc"]] = dim["td"];
});
txt += c+'|'+Dim[1]+'|'+Dim[2]+'|'+Campos+'|'+Dim[4]+'|'+posIndex+'|'+eTabla.getAttribute("FUNCTION")+'|'+cFile+'~'+n+'~|'+eTabla.getAttribute("SubDir")+'|'+_DBTABLE+'|'+S(eTabla).attr("FORMSTATIC")+'|'+eTabla.id+'|'+eTabla.getAttribute("ePrefix")+'|'+eTabla.getAttribute("eSequence")+'|'+eTabla.getAttribute("eAlias")+'|'+eTabla.getAttribute("eAddWhere")+'\n';
for(r=1+parseInt(nAltoTH); r<eTabla.rows.length; r++){
if( eTabla.rows[r].cells[0].id!='PieLista' && S(eTabla.rows[r]).attr("LIBRE")==null ){
for(c=0; c<eTabla.rows[r].cells.length; c++){
xCAMPO = S(eTabla.rows[nAltoTH].cells[c]).attr("CAMPO");
td = dimTD[c];
if( xCAMPO.substring(0,1)=="'" || xCAMPO.substring(0,1)=='"' || (!_SubListGetRecords && xCAMPO.toUpperCase().indexOf(' AS ')>0) || xCAMPO.substring(0,1)=='_' ) continue;
d = S.trim(eTabla.rows[r].cells[c].innerHTML);
if( !/^(\+|\+\,|\-|\-\,)$/i.test(td) ){
if( /^(P4|F4|CDI|T)$/i.test(td) ){
txt += (d.replace(/[^0-9]/g,"")).replace(new RegExp(S.setup["format"+td][0]), S.setup["format"+td][1])+'|';
}else if( td=='C' ){
txt += ((eTabla.rows[r].cells[c].children[0].textContent=="j") ? _CheckBoxSave[0] : _CheckBoxSave[1])+'|';
}else{
txt += d.replace(/\r\n/g,'<BR>');
if( eTabla.rows[r].cells[c].getAttribute("NewValue")!=null && eTabla.rows[r].cells[c].getAttribute("NewValue")!='' ){
if( eTabla.rows[r].cells[c].getAttribute("nId")==null ){
txt += '~'+_User+'_'+nId;
}else{
txt += '~'+_User+'_'+eTabla.rows[r].cells[c].getAttribute("nId");
}
S(":_FILE_"+S(eTabla.rows[r].cells[c]).attr("NUMFILE")).attr("SUFIJOFILE",nId);
nId++;
txt = txt.replace('~'+n+'~', '~'+S(eTabla).attr("FILECONTENT"));
}
txt += '|';
}
}else{
txt += eClearThousands(d)+'|';
}
}
txt += '\n';
}
}
txt += '\n';
}
}
if( txt!='' ){
DGI('_SAVEDATALIST').value = txt;
}
}
try{
if( ',A,B,M,'.indexOf(','+_Accion+',')!=-1 && (_Source==_WOPENER._Source || _SourceOne==_WOPENER._Source || _Source==_WOPENER._NmGDF || _Source==_WOPENER._Source.replace('.edf','.gdf')) ){
if( S.right(_WOPENER._SubMode,1)=='l' ) _ModList();
}
}catch(e){}
if( typeof(_ProgressFields)=='undefined' ){
setTimeout('_Submit()', 100);
}else{
var sp = _Source, s;
try{
s = _Action.split(':');
s = s[1].split('&');
sp = s[0];
}catch(e){}
var t = document.FRM1.elements, n, Dim={'_SOURCE_':sp};
if( _ProgressFields!='' ){
for(n=0; n<t.length; n++){
if( t[n].tagName=='FIELDSET' || t[n].type=='button' ) continue;
if( t[n].name.substring(0,1)=='_' ) continue;
if( _ProgressFields.substr(0,1)=='-' ){
if( (','+_ProgressFields+',').indexOf(','+t[n].name+',')==-1 ) Dim[t[n].name] = t[n].value;
}else{
if( _ProgressFields=='*' || (','+_ProgressFields+',').indexOf(','+t[n].name+',')>-1 ) Dim[t[n].name] = t[n].value;
}
}
}
top.eCallSrvPost('edes.php?E:$progress.gs', Dim, window);
}
}else{
S("body").visible();
eRestoreCheckbox();
_CancelSubmit();
}
}
function preEnviarF(){
var t = document.FRM1.elements, n, Obj = null, Datos = '';
if( _Filtrar && _AccionSeek.indexOf(','+_Accion+',')!=-1 ){
for(n=0; n<t.length; n++){
if( t[n].tagName=='FIELDSET' || t[n].type=='button' ) continue;
if( !t[n].readOnly && t[n].offsetWidth>0 ) Datos += t[n].value+"";
}
var sDato = Datos, Quitar = new Array('<','>','=','*',' '), i;
for(i=0; i<Quitar.length; i++){
while( sDato.indexOf( Quitar[i] )!=-1 ) sDato = sDato.replace( Quitar[i], '' );
}
if( sDato.length==0 ){
top.eAlert(S.lng(209), eLng(269), 'A','W');
return false;
}
}
if( _ErrForm==0 ){
for(n=0; n<t.length; n++){
if( t[n].tagName=='FIELDSET' || t[n].type=='button' ) continue;
if( t[n].readOnly ) t[n].readOnly = false;
if( t[n].name.substring(0,1)=='_' ) t[n].readOnly = false;
if( t[n].type=="checkbox" ) t[n].value = t[n].checked ? "S":"";
}
for(n in _cForm){
Obj = S(":"+ _cForm[n].Nombre, ":FRM"+ _cForm[n].Formulario).obj;
if( _cForm[n].Tipo.substring(0,1)=='#' ){
if(Obj.value!=undefined) Obj.value = Obj.value.replace(/\"/g,'&quot;').replace(/\'/g,'&#39;').replace(/\\/g,'&#92;').replace(/\+/g,'&#43;');
}else if( '|+|-|*|'.indexOf(_cForm[n].Tipo[0])!=-1 ){
Obj.setAttribute("eValueBAK", Obj.value);
Obj.value = S(Obj).val();
if( Obj.value*1==0 ) Obj.value = "";
}else if( /^(P4|F4|CDI|T)$/.test(_cForm[n].Tipo) ){
Obj.setAttribute("eValueBAK", Obj.value);
Obj.value = S(Obj).val();
}
}
return true;
}else{
top.eAlert(S.lng(212), eLng(7)+': '+_ErrMensaje, 'A','E');
return false;
}
}
function preEnviarMF(Btn){
var Datos=txt=sNum=cnf='', snf,nc,nf,tf,v,n,
nf = -1,
Obj = null,
Off = new Array(),
DimEsc = new Array(),
DimMiles = new Array(),
ConEscape = false;
for(snf=0; snf<document.forms.length; snf++){
if( document.forms[snf].name<'FRM1' || document.forms[snf].name>'FRM99' ) continue;
nf++;
if( !_FormStatic ){
cnf = ((nf>9) ? String.fromCharCode(55+nf) : nf)+'.';
}
if( eval('document.FRM'+(nf+1))==undefined ) continue;
if( eval('document.FRM'+(nf+1)).getAttribute("eType")=='Oculto' && _Accion.search('R')!=-1 ) continue;
if( eval('document.FRM'+(nf+1)).getAttribute("eType")!='InDirecto' ){
var p = eval('document.FRM'+(nf+1)).elements, n;
for(n=0; n<p.length; n++){
if( p[n].tagName=='FIELDSET' || p[n].type=='button' ) continue;
if( _Tipo[p[n].name]==undefined ) continue;
ConEscape = false;
if( p[n].type=='textarea' ){
for(var nc in _cForm){
if( _cForm[nc].Nombre==p[n].name ){
if( _cForm[nc].Tipo.substring(0,1)=='#' ){
ConEscape = true;
DimEsc.push(p[n]);
break;
}
}
}
}
if( p[n].type=="checkbox" ) p[n].value = p[n].checked ? "S":"";
if( p[n].readOnly ) p[n].readOnly = false;
if( p[n].name.substring(0,1)=='_' ) p[n].readOnly = false;
if( p[n].name=='' ){
_ErrForm = -10;
top.eAlert(S.lng(212), eLng(77,(nf+1)), 'A', 'E');
return false;
}
if( p[n].name=='PHPSESSID' ) continue;
if( ConEscape ){
txt += '&'+cnf + p[n].name +'="'+ p[n].value.replace(/\"/gi,'&quot;').replace(/\'/gi,'&#39;').replace(/\\/g,'&#92;').replace(/\+/g,'&#43;') +'"';
}else if( '|+|-|*|'.indexOf(_Tipo[p[n].name][0])!=-1 ){
v = S(p[n]).val();
if( v*1==0 ) v = "";
txt += '&'+cnf + p[n].name +'="'+ v +'"';
}else if( /^(P4|F4|CDI|T)$/.test(_Tipo[p[n].name]) ){
txt += '&'+cnf + p[n].name +'="'+ S(p[n]).val() +'"';
}else{
txt += '&'+cnf + p[n].name +'="'+ p[n].value +'"';
}
if( !p[n].readOnly && p[n].offsetWidth>0 ) Datos += p[n].value+"";
}
}
}
if( _Filtrar && _AccionSeek.indexOf(','+_Accion+',')!=-1 ){
var sDato = Datos, Quitar = new Array('<','>','=','*',' '), i;
for(i=0; i<Quitar.length; i++){
while( sDato.indexOf(Quitar[i])!=-1 ) sDato = sDato.replace(Quitar[i], '');
}
if( sDato.length==0 ){
top.eAlert(S.lng(209), eLng(269), 'A','W');
return false;
}
}
if( !_FormStatic ){
txt = _Action + txt;
txt += '&0._ok_="OK"';
}
if( _ErrForm!=0 ){
top.eAlert(S.lng(212), eLng(7)+': '+_ErrMensaje, 'A','E');
return false;
}
if( _FormStatic ){
for(nc in DimEsc){
DimEsc[nc].value = DimEsc[nc].value.replace(/\"/gi,'&quot;').replace(/\'/gi,'&#39;').replace(/\\/g,'&#92;').replace(/\+/g,'&#43;');
}
for(nc=0; nc<DimMiles.length; nc++) DimMiles[nc][0].value = DimMiles[nc][1];
return txt;
}else{
var FieldsList="", Nom="", DimCampo=new Array();
for(nc=0; nc<document.forms[0].elements.length; nc++){
Nom = document.forms[0].elements[nc].name;
if( Nom!=undefined ){
FieldsList += Nom+',';
DimCampo[Nom] = 1;
if( document.forms[0].elements[nc].type=='textarea' ){
document.forms[0].elements[nc].value = document.forms[0].elements[nc].value.replace(/\"/gi,'&quot;').replace(/\'/gi,'&#39;').replace(/\\/g,'&#92;').replace(/\+/g,'&#43;');
}
}
}
for(nc=document.forms[0].elements.length-1; nc>=0; nc--){
if( document.forms[0].elements[nc].getAttribute("DCM")!=null && document.forms[0].elements[nc].value!="" ) document.forms[0].elements[nc].value = S.thousandsClear(document.forms[0].elements[nc].value);
}
if( _CountType==1 ){
document.FRM1.action = _Action+((_Action.indexOf("&_CONTEXT=")==-1)? "&_CONTEXT="+_CONTEXT : "");
return true;
}
for(n in _cForm) if( /^(\+|\+\,|\-|\-\,|P4|F4|CDI|T)$/.test(_cForm[n].Tipo) ){
Obj = DGI(_cForm[n].Nombre);
Obj.value = S(Obj).val();
}
tf = document.forms.length;
for(nf=1; nf<tf; nf++){
FieldsList += '|';
var tc = document.forms[nf].elements.length-1;
for(nc=tc; nc>=0; nc--){
Nom = document.forms[nf].elements[nc].name;
if( Nom!=undefined && DimCampo[Nom]!=1 ){
FieldsList += Nom+',';
DimCampo[Nom] = 1;
if( document.forms[nf].elements[nc].type=='textarea' ){
Obj = S('<textarea name="'+Nom+'" style="display:none"></textarea>',window).nodeEnd(document.forms[0]).obj;
Obj.value = document.forms[nf].elements[nc].value.replace(/\"/gi,'&quot;').replace(/\'/gi,'&#39;').replace(/\\/g,'&#92;').replace(/\+/g,'&#43;');
}else{
document.forms[0].appendChild(document.forms[nf].elements[nc]);
}
}
}
}
if( DGI('_FIELDSLIST')==null ){
var i = document.createElement('TEXTAREA');
i.id = i.name = '_FIELDSLIST';
i.value = FieldsList;
document.forms[0].appendChild(i);
}else{
DGI('_FIELDSLIST').value = FieldsList;
}
DGI('_FIELDSLIST').style.display = 'none';
document.FRM1.action = _Action+((_Action.indexOf("&_CONTEXT=")==-1)? "&_CONTEXT="+_CONTEXT : "");
return true;
}
}
function SubmitError(ok, xMen){
var tf = document.forms.length,tc,n,Obj,t,nf;
for(nf=1; nf<tf; nf++){
t = document.forms[nf].elements;
tc = t.length-1;
for(n=tc; n>=0; n--){
if( t[n].tagName=='FIELDSET' || t[n].type=='button' ) continue;
if( t[n].readOnly ) t[n].readOnly = true;
if( t[n].name.substring(0,1)=='_' ) t[n].readOnly = true;
}
}
for(n in _cForm){
if( _cForm[n].Tipo.substring(0,1)=='#' ){
Obj = S(":"+ _cForm[n].Nombre, ":FRM"+ _cForm[n].Formulario).obj;
if(Obj.value!=undefined) Obj.value = Obj.value.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#92;/g,'\\').replace(/&#43;/g,'+');
}else if( '|+|-|'.indexOf(_cForm[n].Tipo)!=-1 ){
Obj = S(":"+ _cForm[n].Nombre, ":FRM"+ _cForm[n].Formulario).obj;
Obj.value = eShowThousands( Obj.value, 0 );
}else if( _cForm[n].Tipo.search(',')!=-1 ){
Obj = S(":"+ _cForm[n].Nombre, ":FRM"+ _cForm[n].Formulario).obj;
if( S(Obj).attr("DCM")!=undefined ) Obj.value = eShowThousands( Obj.value, S(Obj).attr("DCM") );
}
}
try{
eval('FUNCTION_SubmitHidden')(ok, xMen);
}catch(e){}
}
function _FormStaticIni(){
var p = document.forms[0].elements, Obj, e, c, n, tmp, od, x;
for(n=0; n<p.length; n++){
if( p[n].tagName=='FIELDSET' || p[n].type=='button' ) continue;
if( p[n].name=="_MULTIFILE" || p[n].name=="_FILE__MULTIFILE" ) continue;
if( p[n].NoClear==undefined ){
if( p[n].offsetWidth==0 && p[n].name=='cd_gs_user' ) continue;
if( p[n].className=='READONLY' && p[n].name=='_INPUT_cd_gs_user' ) continue;
if( p[n].type=="checkbox" ) p[n].checked = false;
if( p[n].getAttribute("MultipleValues")==2 ) S("span#_"+p[n].name).html("<span>&nbsp;</span>");
p[n].value = '';
}
}
if( DGI('_FILE__MULTIFILE')!=null ){
var oFileText = S(":_MULTIFILE").obj,
oFile = S(":_FILE__MULTIFILE").obj,
pFile = S(oFile).attr("pFile"),
dFileText = S(":"+pFile).obj,
dFile = S(":_FILE_"+pFile).obj,
nFile = S(oFile).attr("nFile")*1+1,
xFiles = "", xNom, oNom, n;
if( nFile>=oFile.files.length ){
S(".OneOfN").hidden();
S(oFileText).attr({
NewValue: "",
eUpload: 0
});
S(dFileText).val("");
dFile.setAttribute("NewValue", "");
dFile.value = "";
dFile.setAttribute("eUpload", 0);
}else{
if( S(oFile).attr("eCopy") ){
S.fileAttrCopy(window, oFile.files[nFile], S(oFile).attr("eCopy"), S(oFile).attr("TC"));
}
xNom = S.mid(S.replace(oFile.files[nFile]["name"],"\\","/"),"/", null, true);
oNom = oFile.files[nFile]["name"];
for(n=nFile; n<oFile.files.length; n++){
if(xFiles!="") xFiles += "\n";
xFiles += oFile.files[n]["name"];
}
S(".OneOfN").obj.children[0].innerText = (nFile+1);
S(".OneOfN").visibility();
S(".OneOfN").attr({title:xFiles});
S(dFileText).attr({
value: xNom,
NewValue: oNom,
eUpload: 1
});
S(oFileText).attr({
value: xNom,
NewValue: oNom,
eUpload: 1
});
S(oFileText).attr({nFile:nFile});
S(oFile).attr({nFile:nFile});
dFileText.setAttribute("NewValue", oNom);
S(dFileText).val(xNom);
dFileText.setAttribute("eUpload", 1);
dFileText.setAttribute("eFileUpdate", S.date("H,i,s,m,d,Y", oFile.files[0].lastModifiedDate));
S._fileRecalSpace(dFileText, oFile.files[0]["size"]);
}
}
try{
FUNCTION_FormStatic();
}catch(e){}
S('.SELECT').none();
S(document.body).visibility();
eDisableButton(0);
try{
setTimeout(function(){_CampoFoco.focus();}, 250);
}catch(e){}
_FormStaticConect = false;
}
function CheckList(NmCampo, o){
var Obj, nCol, Valor;
if( o==undefined ){
if( !(Obj = S.event(window, "TD", "<className=CheckList")) ) return;
}else{
Obj = o.parentNode;
}
nCol = Obj.cellIndex;
Valor = eGF(NmCampo);
if( (nCol%3)>0 ) nCol -= (nCol%3);
Obj = Obj.parentNode;
if( Obj.cells[nCol].getAttribute("e")==0 ){
if( Valor=='' ) Valor = ',';
if( eGO(NmCampo).size >= Valor.length+1+S.trim(Obj.cells[nCol+1].textContent).length ){
Valor += S.trim(Obj.cells[nCol+1].textContent)+',';
}else{
S(Obj.cells[nCol].children[0]).val("");
S("body").tip(eLng(78),1.5);
return;
}
S(Obj.cells[nCol].children[0]).val("S");
Obj.cells[nCol].setAttribute("e",1);
}else{
S(Obj.cells[nCol].children[0]).val("");
Obj.cells[nCol].setAttribute("e",0);
Valor = Valor.replace(','+S.trim(Obj.cells[nCol+1].textContent)+',', ',');
if( Valor==',' ) Valor = '';
}
S(":"+NmCampo).val(Valor);
}
function eCheckListAll(Campo, OnOff){
if( DGI('CheckList_'+Campo)==null ) return;
ePF(Campo,"");
S("INPUT", DGI('CheckList_'+Campo)).each(function(pk, o){
o.parentNode.setAttribute("e", (OnOff)?0:1);
CheckList(Campo, o);
});
}
function eCheckListPut(Campo, Valores){
if( DGI('CheckList_'+Campo)==null ) return;
ePF(Campo,"");
if( Valores!="" ){
if( S.left(Valores,1)!="," ) Valores = ","+Valores;
if( S.right(Valores,1)!="," ) Valores += ",";
}
S("INPUT", DGI('CheckList_'+Campo)).each(function(pk, o){
var Obj = o.parentNode;
OnOff = ( Valores.indexOf(','+eTrim(Obj.parentNode.cells[Obj.cellIndex+1].textContent)+',')>-1 );
o.parentNode.setAttribute("e", (OnOff)?0:1);
CheckList(Campo, o);
});
}
function RadioList(NmCampo, o){
var Obj, nCol;
if( !(Obj = S.event(window, "TD", "<className=CheckList")) ) return;
nCol = Obj.cellIndex;
if( (nCol%3)>0 ) nCol -= (nCol%3);
Obj = Obj.parentNode;
Obj.cells[nCol].children[0].checked = true;
ePF(NmCampo, S.trim(Obj.cells[nCol+1].textContent));
}
function eRadioListPut(Campo, valor){
ePF("__"+Campo, valor);
ePF(Campo, valor);
}
function CopySelect( Dim ){
var n, i, tmp, Ori, Des;
for(n=0; n<Dim.length; n++){
tmp = Dim[n].split('=');
Ori = top.AUX.DGI( 'TMP_'+tmp[1] );
Des = DGI(tmp[0]+'_TABLE');
Des.outerHTML = Ori.outerHTML;
DGI('TMP_'+tmp[1]).id = tmp[0]+'_TABLE';
DGI(tmp[0]+'_TABLE').style.display = 'block';
_SelTABLE = DGI(tmp[0]+'_TABLE');
}
}
function CopySubSelect(Dim, ObjCopy, AddField){
var DimAddField = AddField.split(','), n, i, Ori, tmp, Des, SelTABLE;
for(n=0; n<Dim.length; n++){
Ori = ObjCopy;
tmp = Dim[n].split('=');
Des = DGI(tmp[0]+'_TABLE');
Des.outerHTML = Ori.outerHTML.replace(Ori.id, Des.id).replace(' style="display:none"','');
DGI('_INPUT_'+tmp[0]).style.backgroundColor = '';
DGI('_INPUT_'+tmp[0]).value = '';
SelTABLE = DGI(tmp[0]+'_TABLE');
SelTABLE.style.width = "0px";
SelTABLE.style.width = '100%';
}
var o = S(":"+tmp[0]).obj,
newValor = S(o).attr("SetValue");
if( newValor!=null ){
ePF(tmp[0], newValor, true);
if( DGI('__'+Des.name)!=null ) DGI('__'+Des.name).value = Des.SetValue;
S(o).attr("SetValue", null);
}
if( DGI('_INPUT_'+tmp[0]).getAttribute("EXECUTE")!=null ) eval(DGI('_INPUT_'+tmp[0]).getAttribute("EXECUTE")+'();');
if( DGI('_INPUT_'+tmp[0]).getAttribute("OnChangeSrv")!=null ) eval(DGI('_INPUT_'+tmp[0]).getAttribute("OnChangeSrv")+';');
}
function eSelectLength(Campo){ return DGI(Campo+'_TABLE').rows.length; }
function eLengthSelect(Campo){ return eSelectLength(Campo); }
function eValueSelect(Campo, f, c){
return eTrim(DGI(Campo+'_TABLE').rows[f].cells[ ((c==undefined)?0:c) ].textContent);
}
function _SelSetValue( txt, Valor ){
var SelINPUT = DGI('_INPUT_'+txt),
SelTABLE = DGI(txt+'_TABLE'), i;
Valor = (Valor+'').toUpperCase();
for(i=0; i<SelTABLE.rows.length; i++){
if( Valor===SelTABLE.rows[i].cells[0].innerText.toUpperCase().trim() ){
try{
if( parseInt(SelINPUT.IND)>0 ) SelTABLE.rows[parseInt(SelINPUT.IND)].cells[1].id = '';
}catch(e){}
SelINPUT.value = SelTABLE.rows[i].cells[1].innerText.trim();
SelINPUT.TMPIND = i;
SelINPUT.OLDVALUE = SelINPUT.value;
SelTABLE.rows[i].cells[1].id = (Valor=='') ? "":"Selected";
SelINPUT.IND = SelINPUT.TMPIND;
if( SelTABLE.uStyle!=undefined ){
SelINPUT.style.color = DGI(txt).style.color = SelTABLE.rows[i].cells[1].style.color;
SelINPUT.style.backgroundColor = DGI(txt).style.backgroundColor = SelTABLE.rows[i].cells[1].style.backgroundColor;
SelINPUT.style.fontWeight = DGI(txt).style.fontWeight = SelTABLE.rows[i].cells[1].style.fontWeight;
}
break;
}else{
if( SelTABLE.rows[i].cells[1].id!='' ) SelTABLE.rows[i].cells[1].id = '';
}
}
}
var _nRelationFields = 0;
function ePutRelationFields(txt, valor, ConEvento){
if( ConEvento==undefined ) ConEvento = true;
if( typeof(txt)=="object" ){
if( txt.length==undefined ){
for(var campo in txt){
valor = txt[campo];
if( typeof(valor)=="object" ){
ConEvento = valor[1];
valor = valor[0];
}
S(":"+campo).attr("SetValue", valor);
ePF(campo, valor, ConEvento);
}
}else{
for(var n=0; n<txt.length; n++){
valor = txt[n][1];
if( typeof(valor)=="object" ){
ConEvento = valor[1];
valor = valor[0];
}
S(":"+txt[n][0]).attr("SetValue", valor);
ePF(txt[n][0], valor, ConEvento);
}
}
return;
}
var Obj = eGO(txt);
S(Obj).attr("SetValue", valor);
ePF(txt, valor, ConEvento);
}
function ePFS(txt, valor){
if( (txt.indexOf('_INPUT_')==0 && DGI('_INPUT_'+txt)!=null) ){
ePutRelationFields(txt, valor, 1);
}else{
ePF(txt, valor, 0);
}
}
function _ExeDimRelationFields(){
for(var f=0; f<_DimRelationFields.length; f++){
if( _DimRelationFields[f]!=undefined ){
eval(_DimRelationFields[f]);
delete _DimRelationFields[f];
return;
}
}
}
function eClearSelect(Nom, ConChange){
if( ConChange==undefined ) ConChange = true;
S.selectClear(Nom, ConChange);
}
function eDelOption(Nom, Dim){
var Obj, p, q, n, Obj2;
try{
if( typeof(Nom)!='object' ) Nom = new Array(new Array(Nom, Dim));
else var Dim;
for(p=0; p<Nom.length; p++){
Obj = DGI(Nom[p][0]+'_TABLE');
if( Obj==null || Obj.length==0 ) continue;
Dim = Nom[p][1];
if( typeof(Dim)!='object' ) Dim = new Array(Dim);
q = Dim.length-1;
while( q>=0 ){
for(n=Obj.rows.length-1; n>=0; n--){
if( Obj.rows[n].cells[0].textContent.replace(/\s+$/g,'')==Dim[q] || (Obj.rows[n].className=="Line" && Dim[q]=="~") ){
Obj.deleteRow(n);
Obj2 = DGI(Nom[p][0]);
if( Obj2.value==Dim[q] ) Obj2.value = "";
break;
}
}
q--;
}
}
}catch(e){}
return true;
}
function eShowOption(Nom, Dim, tf){
var Obj = DGI(Nom+'_TABLE');
if( Obj==null || Obj.length==0 ) return false;
if( tf==undefined ) tf=true;
tf = _BN(tf);
try{
if( typeof(Dim)!='object' ) Dim = new Array( Dim );
var q = Dim.length-1;
while( q >= 0 ){
for( var n=Obj.rows.length-1; n>=0; n-- ){
if( Obj.rows[n].cells[0].textContent.replace(/\s+$/g,'')==Dim[q] ){
Obj.rows[n].style.display = tf;
if( tf=='none' ){
Obj.rows[n].eNone = 1;
}else{
Obj.rows[n].removeAttribute('eNone');
}
var Obj2 = DGI(Nom);
if( Obj2.value==Dim[q] ) Obj2.value=='';
break;
}
}
q--;
}
}catch(e){}
return true;
}
function eAddOption( Nom, Dim, p ){
var Obj = DGI(Nom+'_TABLE'),TR,n,i;
if( Obj==null ){
if( DGI('LIST_'+Nom)!=null ){
Nom = '_'+Nom;
Obj = DGI(Nom+'_TABLE');
if( Obj==null ) return false;
}else return false;
}
try{
if( typeof(Dim)!='object' ) Dim = new Array(Dim);
if(p==undefined) p=Obj.rows.length;
for(n=0; n<Dim.length; n++){
TR = Obj.insertRow(p++);
if( Dim[n][0]=="~" ){
TR.className = "Line";
for(i=0; i<Dim[n].length; i++) TR.insertCell();
continue;
}
for(i=0; i<Dim[n].length; i++){
TR.insertCell().innerHTML = Dim[n][i];
if(i==1 && Dim[n][i]=='') TR.cells[i].innerHTML = "&nbsp;";
}
}
}catch(e){}
return true;
}
function eStyleOption(Nom, Dim, Estilo, Mem){
var Obj = DGI(Nom+'_TABLE'), q,n;
if( Obj==null || Obj.length==0 ) return false;
try{
Estilo = Estilo.replace(/=/g,':');
if( typeof(Dim)!='object' ) Dim = new Array( Dim );
for(q=0; q<Dim.length; q++){
for(n=0; n<Obj.rows.length; n++){
if( Obj.rows[n].cells[0].textContent.replace(/\s+$/g,'')==Dim[q] ){
Obj.rows[n].cells[1].style.cssText = Estilo;
if( Mem!=undefined && Mem ){
Obj.uStyle = 1;
}else{
if( Obj.uStyle!=undefined ) Obj.removeAttribute('uStyle');
}
break;
}
}
}
}catch(e){}
return true;
}
function eEF(txt, On, CSS, OnImg){
var SoloVisible = true;
if( On=="-1" ){
On = false;
SoloVisible = false;
}else if( On=="2" ){
On = true;
SoloVisible = false;
}
function _eEF(Campo, On, CSS){
var Obj = eGO(Campo);
if( !Obj || Obj.getAttribute('eAlwaysRead') ) return;
if( DGI(Obj.name+"_")!=null ){
Obj = DGI(Obj.name+"_");
if( DGI("edMENUS")!=null ) S("#edMENUS").none();
}
if( SoloVisible && Obj.offsetWidth==0 ) return;
if( CSS ){
S(Obj).css(CSS);
}
if( On==null ) return;
try{
if( Obj.type=="radio" ){
S(":"+Campo).each(function(op,obj){
obj.disabled = !On;
});
}else if( Obj.type=="checkbox" ){
Obj.disabled = !On;
}else{
Obj.disabled = !On;
}
}catch(e){}
if( On ){
if( Obj.id==Campo+"_" ){
Obj.readOnly = false;
Obj.className =	"ISubListBODY";
}else{
if( Obj.name.indexOf('_INPUT_')==0 && Obj.getAttribute("eWE")!=1 ){
return;
}else if( S(":_INPUT_"+Obj.name).length ){
var o = S(":_INPUT_"+Obj.name).obj;
if( o.name.indexOf('_INPUT_')==0 && o.getAttribute("eWE")!=1 ){
return;
}
}
Obj.readOnly = (Obj.getAttribute('eFILENAME')!=null);
Obj.className =	"EDITABLE";
}
Obj["eDisabled"] = false;
}else{
try{
if( document.activeElement==Obj ){
document.activeElement.blur();
S.selectOff(window);
}
}catch(e){}
Obj.readOnly = (Obj.getAttribute('eFILENAME')==null);
if(Obj.className=="EDITABLE") Obj["eDisabled"] = true;
Obj.className = "READONLY";
}
}
_UpdateToView = false;
if( txt=='*' ){
_UpdateToView = true;
var f,t,n;
txt = '';
for(f=0; f<document.forms.length; f++){
if( document.forms[f].name=="GETCONDITION" ) continue;
t = document.forms[f].elements;
for(n=0; n<t.length; n++){
if( t[n].tagName=='FIELDSET' || t[n].type=='button' ) continue;
if( txt!='' ) txt = txt+',';
txt = txt+t[n].name;
}
}
}
var Dim = (typeof(txt)=='string') ? txt.split(',') : new Array(txt), i,n;
for(n=0; n<Dim.length; n++){
var Campo = Dim[n].replace(/\s/g,'');
if( Campo.toUpperCase()=='OPEXE' ){
if( DGI(Campo)!=null ){
DGI(Campo).style.visibility = _VH(On);
ConF10 = On;
}
}else if( Campo.substring(0,9).toUpperCase()=='ADDBUTTON' ){
if( DGI(Campo)!=null ) eGO(Campo).style.visibility = _VH(On);
}else if( eGO(Campo).tagName=='IMG' ){
S("#"+Campo).class((!On)?"+OFF":"-OFF").attr("disabled",!On);
}else{
if( DGI('_INPUT_'+Campo)!=null ) _eEF('_INPUT_'+Campo, On, CSS);
try{
if( eGO(Campo).getAttribute('eFILENAME')!=null ){
eGO(Campo).disabled = !On;
i = eGO(Campo).sourceIndex;
while( /^(?:IMG|I)$/i.test(eIndex(++i).tagName) ){
if( eIndex(i).getAttribute('oi')!=null ){
S(eIndex(i)).class((!On)?"+OFF":"-OFF").attr("disabled",!On);
}
}
}
}catch(e){}
if( eGO(Campo).eHTML!=undefined ){
eGO(Campo+'_').disabled = !On;
}
if( typeof(OnImg)=='boolean' ){
i = eGO(Campo).sourceIndex;
while( /^(?:IMG|I)$/i.test(eIndex(++i).tagName) ){
S(eIndex(i)).class((!OnImg)?"+OFF":"-OFF").attr("disabled",!OnImg);
}
}else OnImg = On;
if( DGI('_INPUT__'+Campo)!=null ){
_eEF( '_INPUT__'+Campo, On, CSS );
}else if( /^(F4|P4)/i.test(eGO(Campo).getAttribute("TC")) ){
i = eGO(Campo).sourceIndex;
while( /^(IMG|I)$/i.test(eIndex(++i).tagName) ){
if( eIndex(i).id=="TOOLSDate" ){
S(eIndex(i)).class((!OnImg)?"+OFF":"-OFF").attr("disabled",!OnImg);
break;
}
}
}else if( /^_op_/.test(Campo) && eGO(Campo).className=="slBUTTON" ){
i = eGO(Campo).sourceIndex;
S(eIndex(i+1)).class((!OnImg)?"+OFF":"-OFF").attr("disabled",!OnImg);
DGI('['+S.mid(Campo,4,0)+']').disabled = !OnImg;
S(DGI('['+S.mid(Campo,4,0)+']')).class((!OnImg)?"+OFF":"-OFF");
}
if( DGI(Campo+'_')!=null ){
S("#"+Campo).class((!OnImg)?"+OFF":"-OFF").attr("disabled",!OnImg);
}
i = eGO(Campo).sourceIndex;
while( /^(IMG|I)$/i.test(eIndex(++i).tagName) ){
if( eIndex(i).className.indexOf("ICONINPUT")>-1 ){
S(eIndex(i)).class((!OnImg)?"+OFF":"-OFF").attr("disabled",!OnImg);
break;
}
}
_eEF(Campo, On, CSS);
}
}
}
function eEditField(a,b,c,d){
eEF(a,b,c,d);
}
function eEditSubList(txt, on){
var dim = S.toArray(txt), n, obj;
for(n=0; n<dim.length; n++){
txt = dim[n];
obj = DGI("["+txt+"]");
obj.disabled = !on;
S("img", obj).each(function(k, o){
if( S.trim(S.mid(o.onclick,"{","("))=="eSLAction" ){
S(o).class((!on)?"+OFF":"-OFF").attr("disabled",!on);
o["eDisabled"] = on;
}
});
if( DGI("___op_"+txt) ){
if( on ){
S(DGI("___op_"+txt)).visible();
}else{
S(DGI("___op_"+txt)).hidden();
}
}
}
}
function eEditISubList(txt, on){
var dim = S.toArray(txt), n, obj;
for(n=0; n<dim.length; n++){
txt = dim[n];
S(".ISubList").each(function(k, o){
if( o.src.indexOf(txt)>-1 ){
S("img", o.contentWindow).each(function(k, o){
if( S.trim(S.mid(o.onclick,"{","("))=="_ModeChange" ){
S(o).class((!on)?"+OFF":"-OFF").attr("disabled",!on);
o["eDisabled"] = on;
}
});
}
});
}
}
function _ShowGroupHR( Obj, On, Tipo ){
if( typeof(Obj)=='string' ) Obj = DGI(Obj);
var el = Obj, dTR,n,Desde,Hasta;
while( true ){
el = el.parentNode;
if( el.tagName=='TR' && el.id==']' ) dTR = el;
if( el.tagName=='TABLE' ){
if( el.id.substr(0,9)=='TABNumber' || el.id=='HOJAzona' ){
for( n=dTR.rowIndex; n>0; n-- ){
if( el.rows[n].getAttribute("sT")!=null ){
Desde = n;
break;
}
}
Hasta = el.rows.length-1;
for( n=dTR.rowIndex; n<el.rows.length; n++ ){
if( el.rows[n].getAttribute("sT")!=null ){
Hasta = n-1;
break;
}
}
for( n=Desde; n<=Hasta; n++ ){
if( Tipo ){
_BN(On,el.rows[n]);
}else{
_VH(On,el.rows[n]);
}
}
break;
}
}
}
}
function eHideGroups(){
var Obj = S("*[VerTr][eFRM='"+S.left(xFRM,3,0)+"']").dim, n;
for(n=0; n<Obj.length; n++){
if( Obj[n].getAttribute("VerTr")!=null ) if( Obj[n].getAttribute("VerTr")=='block' ){
eShowGroup(Obj[n]);
}
}
}
function eShowGroup(Obj, ConLinea, On, Tipo){
if( Tipo==undefined ) Tipo = true;
if( typeof(Obj)=='string' ) Obj = DGI(Obj);
var el = Obj, OnOff, n, nn, Tabla, nTR,
SubTab = Obj.getAttribute('SubTab');
if( Obj.tagName=='DIV' && Obj.getAttribute("VerTr")!=null ){
while( el.tagName!='TABLE' ) el = el.parentNode;
while( el.tagName!='TR' ) el = el.parentNode;
nTR = el.rowIndex * 1;
while( el.tagName!='TABLE' ) el = el.parentNode;
Tabla = el;
}else if( Obj.tagName=='TD' && Obj.getAttribute("VerTr")!=null ){
while( el.tagName!='TABLE' ) el = el.parentNode;
while( el.tagName!='TR' ) el = el.parentNode;
nTR = el.rowIndex * 1;
while( el.tagName!='TABLE' ) el = el.parentNode;
Tabla = el;
}else{
while( el.tagName!='TR' ) el = el.parentNode;
nTR = el.rowIndex;
while( el.tagName!='TABLE' && el.id.substr(0,9)!='TABNumber' ) el = el.parentNode;
Tabla = el;
for(n=nTR-1; n>0; n--){
if( Tabla.rows[n].getAttribute('sT')!=null ){
nTR = n;
if( S("DIV",Tabla.rows[n]).length==0 ){
Obj = Tabla.rows[n];
ConLinea = true;
}
break;
}
}
}
if( ConLinea==undefined ) ConLinea = false;
if( On!=undefined ){
if( Tipo ){
OnOff = _BN(On);
}else{
OnOff = _VH(On);
}
}else{
if( Tipo ){
OnOff = (Obj.getAttribute("VerTr")=='block') ? 'none':'block';
}else{
OnOff = (Obj.getAttribute("VerTr")=='visible') ? 'hidden':'visible';
}
}
Obj.setAttribute("VerTr", OnOff);
if( OnOff=="block" ) OnOff = "";
if( Tipo ){
if( ConLinea || OnOff=='block' || OnOff=='' ) Tabla.rows[nTR].style.display = OnOff;
}else{
if( ConLinea || OnOff=='visible' ) Tabla.rows[nTR].style.visibility = OnOff;
}
if( S("IMG",Obj).length>0 ){
el = S("IMG",Obj).obj;
if( OnOff=='block' || OnOff=='visible' || OnOff=='' ){
_Src(el,1,0);
if( S(el).attr("titleOn")!=null ) el.title = S(el).attr("titleOn");
}else{
_Src(el,0,1);
if( S(el).attr("titleOff")!=null ) el.title = S(el).attr("titleOff");
}
}else if( S("I",Obj).length>0 ){
el = S("I",Obj).obj;
if( OnOff=='block' || OnOff=='visible' || OnOff=='' ){
el.innerText = "d";
if( S(el).attr("titleOn")!=null ) el.title = S(el).attr("titleOn");
}else{
el.innerText = "c";
if( S(el).attr("titleOff")!=null ) el.title = S(el).attr("titleOff");
}
}
if( SubTab ){
for(n=nTR+1; n<Tabla.rows.length; n++){
if( SubTab==Tabla.rows[n].getAttribute('SubTab') ){
if( Tabla.rows[n].id=="o" ){
}else if( Tipo ){
Tabla.rows[n].style.display = OnOff;
}else{
Tabla.rows[n].style.visibility = OnOff;
}
}
}
}else{
for(n=nTR+1; n<Tabla.rows.length; n++){
if( Tabla.rows[n].getAttribute('NewColumns')!=null && Tabla.rows[n].getAttribute('NewColumns')==1 ){
for(nn=0; nn<Tabla.rows[n].cells[0].children[0].rows.length; nn++){
if( Tabla.rows[n].id=="o" ){
}else if( Tipo ){
Tabla.rows[n].cells[0].children[0].rows[nn].style.display = OnOff;
}else{
Tabla.rows[n].cells[0].children[0].rows[nn].style.visibility = OnOff;
}
}
}else{
if( Tabla.rows[n].getAttribute('sT')!=null ) break;
if( Tabla.rows[n].id=="o" ){
}else if( Tipo ){
Tabla.rows[n].style.display = OnOff;
}else{
Tabla.rows[n].style.visibility = OnOff;
}
}
}
}
if( Tipo ){
if( _Obj=='G' ) eTabResize();
if( top.eIsWindow(window) ) setTimeout(function(){Recalcula(1);},10);
CheckScroll();
}
}
function VerTR( o ){
eShowGroup(o);
}
function _eShow(txt, Nivel, On, Tipo){
if( Tipo==undefined ) Tipo = true;
if( Nivel==undefined ) Nivel = '';
if( typeof(Nivel)=='string' ) Nivel = Nivel.toUpperCase();
if( txt.toUpperCase()=='SUBMIT' ){
var o=null;
if( Nivel=='' ) o = S.toTag(eGO('OpExe'),'TABLE');
else if( Nivel=='TR' ) o = S.toTag(eGO('OpExe'),'TR',3);
if( o!=null ){
if( Tipo ) S(o).css("display", On ? "table"+(Nivel=="TR"?"-row":""):"none");
else _VH(On,o);
}
return;
}
if( Nivel=="-" ){
_ShowGroupHR(txt, On, Tipo);
return;
}else if( Nivel=="SLSUBMIT" ){
var o = S(":___op_"+txt).obj;
if(o!=null){
o = S.toTag(o,"TABLE");
if( Tipo ){
S.display(o, On, On?"table":null);
}else{
S.visibility(o, On);
}
}
return;
}else if( Nivel!="" ){
if( typeof(Nivel)!='number' && Nivel=='GROUP' ){
eShowGroup(txt, false, On, Tipo);
return;
}
}
var i,n,Dim = (typeof(txt)=='string') ? txt.split(',') : new Array( txt );
for(n=0; n<Dim.length; n++){
var Campo = Dim[n].replace(/\s/g,''),
Label = null,
Obj = DGI(Campo),
xType = 'T';
if( Obj==null ){
continue;
}else if( DGI('_INPUT_'+Campo)!=null ){
xType = 'S';
}else if( Obj.type=='radio' ){
xType = 'R';
Obj = S(Obj).toTag("FIELDSET");
}else if( Obj.type=='textarea' && Obj.getAttribute('eHTML')!=null ){
xType = 'H';
}else if( Obj.getAttribute('eFILENAME')!=null ){
xType = 'F';
}
if( Nivel!='' ){
if( typeof(Nivel)=='number' ){
for( i=0; i<Nivel; i++ ) Obj = Obj.parentNode;
}else{
if( typeof(Nivel)=='string' && Nivel=='L' ){
if( xType!='H' ){
if( (S.toTag(Obj,'TD').sourceIndex==Obj.sourceIndex-2) || (xType=="F" && S.toTag(Obj,'TD').sourceIndex==Obj.sourceIndex-3) ){
var el = S.toTag(Obj,'TR');
if( el.id==']' ){
i = Obj.sourceIndex-1;
Label = eIndex(i-(xType!="F" ? 2:3));
if( Label.tagName=='TD' ) Label = el.cells[Label.cellIndex-1].children[0];
}else{
Label = S.toTag(Obj,'TABLE').rows[0].cells[0];
}
}else{
Label = eIndex(Obj.sourceIndex-(xType!="F" ? 2:3));
}
}else{
if( Obj.sourceIndex-2==Obj.parentNode.parentNode.sourceIndex ){
var el = S.toTag(Obj,'TR'),
oTD = S.toTag(Obj,'TD');
if( oTD.cellIndex>0 ){
Label = el.cells[ oTD.cellIndex-1 ].children[0];
}else{
Label = oTD.children[0];
}
}
}
}else{
if( Nivel=='FIELDSET' ){
Obj = S.toTag(Obj,'FIELDSET');
Obj = S.toTag(Obj,'TR');
}else{
var el = S.toTag(Obj,'TR');
if( el.LF=='V' ){
Obj = S.toTag(Obj,'TABLE');
Obj = S.toTag(Obj,'TR');
}else if( el.id==']' ){
Obj = S.toTag(Obj,Nivel);
}else if( Nivel=='TR' ){
Obj = S.toTag(Obj,'TR');
}
}
}
}
}
if( Nivel=='TR' || Nivel=='FIELDSET' ){
(Tipo) ? _BN(On,Obj) : _VH(On,Obj);
if( Nivel=='TR' && Obj.getAttribute("STShow")!=null ) Obj.setAttribute("STShow",On);
}else{
if( xType=='C' ){
if(Tipo){
if( Label!=null ) _BN(On,Label);
_BN(On,eIndex(Obj.sourceIndex+1));
}else{
if( Label!=null ) _VH(On,Label);
_VH(On,eIndex(Obj.sourceIndex+1));
}
}else{
if( xType=='S' ){
if( Tipo ){
_BN(On,DGI('_INPUT_'+Campo));
}else{
_VH(On,DGI('_INPUT_'+Campo));
}
if( !On ){
if( Obj.offsetWidth>0 ){
S(Obj).attr("eHide",1);
_BN(On,Obj);
}
}else if( S(Obj).attr("eHide")=="1" ){
S(Obj).attr("eHide",0);
_BN(On,Obj);
}
}
if( Tipo ){
if( Obj.type=='textarea' && Obj.getAttribute('eHTML')!=null ){
_BN(On,Obj.parentNode);
}else{
if( xType!='S' ) _BN(On,Obj,"inherit");
}
if( Label!=null ) _BN(On,Label,"inherit");
}else{
if( xType!='S' ) _VH(On,Obj);
if( Label!=null ) _VH(On,Label);
}
}
try{
var i = Obj.sourceIndex+1;
while( /^(?:IMG|I|SPAN)$/i.test(eIndex(i).tagName) ){
if( eIndex(i).tagName=="SPAN" ){
if( S(eIndex(i)).attr("eType")!="DiscSpace" ){
break;
}else{
if( eIndex(i).nextSibling!=null ) i = eIndex(i).nextSibling.sourceIndex;
continue;
}
}
if( Tipo ){
_BN(On,eIndex(i++), On ? "initial":null);
}else{
_VH(On,eIndex(i++));
}
if( eIndex(i).tagName=="INPUT" && S.left(eIndex(i).name,6)=="_FILE_" ) i++;
}
}catch(e){}
}
}
if( Tipo ) eTabResize();
}
function eShow(c,n,t){
_eShow(c,n,1,t);
}
function eHide(c,n,t){
_eShow(c,n,0,t);
}
var _SelAux = 'P';
function SelAuxiliar( NomAux, nForm ){
if( window.frameElement.WOPENER!=undefined ){
var SEL = eval(nForm);
if( SEL.length > 1 ) return;
SEL.length = 0;
var cTB = top.AUX.DGI(NomAux).rows, i;
for(i=0; i<cTB.length-1; i++){
var newOpt = document.createElement('<OPTION>');
SEL.add(newOpt,i);
SEL.children[i].value = cTB[i+1].cells[0].textContent;
SEL.children[i].textContent = cTB[i+1].cells[1].textContent;
}
}else{
top.AUX.frameElement.WOPENER = window;
top.AUX.SelAuxiliar( NomAux, nForm );
}
}
function SetSelect( Obj ){
if( null==event ) return;
var sNom = Obj.name.substring(2),
txtSelObj = Obj.form.name+'.'+sNom,
SelObj = eval( txtSelObj ),
len = Obj.value.length, ok = 0, n;
for( n=0; n<SelObj.length; n++ ){
if( SelObj.children[n].value.substr(0,len)==Obj.value ){
SelObj.selectedIndex = n;
ok = 1;
break;
}
}
if( ok==0 ){
Obj.value = '';
SelObj.selectedIndex = 0;
GenChange( SelObj.onchange+'', txtSelObj );
eClearEvent();
}else{
GenChange( SelObj.onchange+'', txtSelObj );
SiguienteCampo(-1);
}
}
function GenChange( txt, txtSelObj ){
if( txt=='' ) return;
txt = txt.replace( 'function anonymous()' , '' ).replace('{','').replace('}','');
var DimFunc = txt.split( ';' );
for( var y=0; y<DimFunc.length; y++ ){
txt = DimFunc[y];
while( txt.charCodeAt(0)==10 ) txt = txt.substring(1);
if( txt.substring(0,1)!='_' && txt.indexOf('(',0)!=-1 ){
txt = txt.replace( 'this', txtSelObj );
eval( txt );
}
}
}
var _eWaiting=null;
function eWaiting(url){
if( _ErrMensaje=="" ) {
if( eWaiting.caller==null ){
if( url==undefined ){
_eWaiting = 1;
eSubmit(_Action);
}else{
_eWaiting = null;
eDisableButton(false);
S.error(url, 7);
}
}else if( eWaiting.caller.name=="eJSCheck" ){
_eWaiting = 0;
setTimeout(function(){
eDisableButton(true);
setTimeout(function(){
S.callSrv(url, window);
}, 100);
}, 1);
}
}
}
function OkExterno(ConSolapa){
var Obj = null;
if( _ErrForm==-10 ){
top.eAlert(S.lng(212), 'ERROR: (-10) '+_ErrMensaje, 'A', 'E');
return false;
}
if( _eWaiting===null ){
_ErrMensaje = _ErrCampo = ''; _ErrForm = -1;
if( eJSCheck()==false || _ErrForm==-2 ) return false;
}
if( _eWaiting===0 ){
return false;
}
_eWaiting = null;
if( _Obj=='F' ){
var n=0; for(i in _OnLineIMG) n++;
if( n==0 && _ChildrenData.length>0 ){
S.info("Grabando...", 0.5, "OK");
return _FormularioASubLista();
}
}
if( _ErrForm==-1 ){
top.eAlert(S.lng(212), eLng(7)+': '+_ErrMensaje, 'A','E');
return false;
}else if( _ErrMensaje.length>0 ){
_ConError = true;
if( _ErrForm>0 && ConSolapa==1 ){
PonSolapa(_ErrForm);
}else{
_ErrForm = 1;
}
var tmp = _ErrCampo.split(','), i;
for(i=0; i<tmp.length; i++){
if( eGO(tmp[i]).className!="READONLY" ) eGO(tmp[i]).className = "ERROR";
if( DGI('_INPUT_'+tmp[i])!=null ) DGI('_INPUT_'+tmp[i]).className = "ERROR";
}
_ErrCampo = tmp[0];
Obj = eGO(_ErrCampo);
if( Obj.readOnly || Obj.offsetWidth<1 ) Obj = '';
top.eAlert(eLng(43), _ErrMensaje, 'A','W', Obj);
return false;
}
var t, n, snf;
for(snf=0; snf<document.forms.length; snf++){
if( document.forms[snf].name<'FRM1' || document.forms[snf].name>'FRM99' ) continue;
t = document.forms[snf].elements;
for(n=0; n<t.length; n++){
if( t[n].type=="checkbox" ){
t[n].setAttribute("eCheckToInput", "1");
t[n].style.width = "7px";
if( !t[n].checked ){
t[n].value = "";
}else{
t[n].value = "S";
}
t[n].type = "INPUT";
t[n].disabled = false;
}
}
}
return true;
}
function NumForm(NomCampo){
if( _DefCampo[NomCampo]!=undefined ) return _DefCampo[NomCampo].Formulario;
_ErrCampo = -10;
_ErrMensaje = 'nF.'+NomCampo;
alert(eLng(80,NomCampo));
return -1;
}
function eCheck(dim){
ePE(dim, undefined, undefined);
return(_ErrMensaje=="");
}
function ePE(Campo, Mensa, View){
var dim=[], n,e,x,s;
if( S.type(Campo)!="array" ){
dim.push([Campo, Mensa, true]);
}else{
dim = Campo;
View = Mensa;
}
for(n=0; n<dim.length; n++){
if( typeof(dim[n][0])=="boolean" ){
if( dim[n][0] ){
s = ePE(dim[n][1], Mensa, View);
if( s!=undefined && e==undefined ) e=s;
}
}else if( dim[n][2] ){
Campo = dim[n][0];
Mensa = (dim[n][1]+"").replace(/�/g,' ');
e = NumForm(Campo),
x = Mensa.split('"');
if( x.length==3 ){
Mensa = x[0]+'"<b>'+x[1]+'</b>"'+x[2];
}
if( _ErrMensaje!='' ){
_ErrMensaje = _ErrMensaje+'<br>'+Mensa;
_ErrCampo += ','+Campo;
if( eGA(Campo, 'eHTML') ) _ErrCampo += '_';
}else{
_ErrForm = e;
_ErrCampo = Campo;
_ErrMensaje = Mensa;
}
}
}
if( View!=undefined && View ){
eShowError();
}
return e;
}
function eOkForm(){
return(_ErrMensaje=="");
}
function eWarningBelow(Obj, txt, x){
if( typeof(Obj)!='string' ) Obj = Obj.name;
var TABLA = eGO(Obj), n=p=0, i;
if( DGI('_INPUT_'+Obj)!=null ) TABLA = DGI('_INPUT_'+Obj);
var TR = TABLA, TD, nTR;
if( x!=undefined ) p = x;
while( TABLA.id.substr(0,9)!='TABNumber' ) TABLA = TABLA.parentNode;
while( TR.id!=']' ){
p += TR.offsetLeft;
TR = TR.parentNode;
}
if( txt=='' ){
if( TABLA.rows(TR.rowIndex+1).id=='DeleteRow' ) TABLA.deleteRow(TR.rowIndex+1);
return;
}
var oAncho = TABLA.rows(TR.rowIndex).offsetWidth;
if( TABLA.rows.length >= TR.rowIndex+1 && TABLA.rows(TR.rowIndex+1).id=='DeleteRow' ){
TD = TABLA.rows(TR.rowIndex+1).cells[0];
with( TD ){
innerHTML = txt;
style.paddingLeft = p;
align = 'left';
}
}else{
for( i=0; i<TR.cells.length; i++ ) n += TR.cells[i].colSpan;
nTR = TABLA.insertRow( TR.rowIndex+1 );
nTR.id = 'DeleteRow';
TD = nTR.insertCell();
with( TD ){
className = 'ErrorInstr';
colSpan = n;
align = 'left';
style.paddingLeft = p;
innerHTML = txt;
style.color = 'red';
}
}
if( oAncho!=TABLA.rows(TR.rowIndex).offsetWidth ){
with( TD ){
style.paddingLeft = 0;
align = 'right';
}
}
}
function _eShowError(){
_ConError = true;
if( _ErrCampo==-10 || _ErrCampo=="" ) return;
var tmp = _ErrCampo.split(','), i;
Obj = eGO(tmp[0]);
setTimeout(function(){
for(i=0; i<tmp.length; i++){
if( i==0 ){
Obj.eChange = 1;
}
eGO(tmp[i]).className = "ERROR";
if( DGI('_INPUT_'+tmp[i])!=null ) DGI('_INPUT_'+tmp[i]).className = "ERROR";
}
},100);
if( !Obj.readOnly && (Obj.offsetWidth>0 || Obj.className=="ERROR" || Obj.className=="EDITABLE") ){
top.eAlert(S.lng(209), _ErrMensaje, 'A', 'W', Obj);
}else{
top.eAlert(S.lng(209), _ErrMensaje, 'A', 'W');
}
_ErrMensaje = '';
_ErrCampo = '';
_ErrForm = -2;
setTimeout(function(){
var FocoHoja = Obj.form.name;
if( xFRM!=FocoHoja && eval(FocoHoja).getAttribute("eType")!='Constante' ){
PonSolapa(FocoHoja.substring(3));
}
if( S.toTag(Obj,'TR').getAttribute("SubTab")!=null ) S(DGI('SubTab'+S.toTag(Obj,'TR').getAttribute("SubTab"))).eventFire("click");
}, 1);
}
function eShowError(){
if( _ErrMensaje=="" ) return;
document.body.focus();
_eShowError();
_ErrForm = -2;
if( _IniSubmit===1 ) _IniSubmit = 2;
return eClearEvent();
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
return S(Obj).val();
}
if( DGI(Campo)!=null ) return DGI(Campo).value;
_ErrCampo = -10;
_ErrMensaje = 'eGF.'+Campo;
alert(eLng(81,Campo,'eGF()'), _Source, -1, 'eGF' );
return "";
}
function eGL(Nom){
var o=eGO(Nom), i=o.sourceIndex, n, txt="";
if( o.getAttribute("eFileName")!=null ){
i = o.parentNode.sourceIndex-2;
}
for(n=i; n>i-3; n--){
if( eIndex(n).tagName=='SPAN' || eIndex(n).tagName=='LABEL' ) return eIndex(n);
if( eIndex(n).tagName=='TD' ){
var Obj = S.toTag(eIndex(n),'TR');
if( Obj.id==']' ){
txt = Obj.cells[eIndex(n).cellIndex-1].children[0];
}else{
txt = S.toTag(eIndex(n),'TABLE').rows[0].cells[0];
}
break;
}
}
if( txt==undefined ) txt = "";
return txt;
}
function ePGF(Campo){
return window.frameElement.WOPENER.eGF( Campo );
}
function eGA(xCampo, xAtri){
if( DGI('_INPUT_'+xCampo)!=null ){
return S.selectAttr(xCampo, xAtri);
}else{
return S(":"+xCampo).attr(xAtri);
}
}
function _ePF(txt, valor, ConChange){
if( top.eReadyState(window) ){
ePF(txt, valor, ConChange);
}
}
function ePF(txt, valor, ConEvento){
var Dim, n, campo;
if( ConEvento==undefined ) ConEvento = true;
if( typeof(txt)=="object" ){
var allConEvento = valor;
ConEvento = valor;
if( txt.tagName ){
S(txt).attr("SetValue", valor);
S(txt).val(valor, ConEvento);
}else if( txt.length==undefined ){
for(campo in txt){
valor = txt[campo];
if( typeof(valor)=="object" ){
ConEvento = (allConEvento==undefined)? valor[1] : allConEvento;
valor = valor[0];
}
Dim = /\,/.test(campo) ? S.nsp(campo).split(",") : [campo];
for(i=0; i<Dim.length; i++){
S(":"+Dim[i]).attr("SetValue", valor);
S(":"+Dim[i]).val(valor, ConEvento);
}
}
}else{
for(n=0; n<txt.length; n++){
valor = txt[n][1];
if( typeof(valor)=="object" ){
ConEvento = (allConEvento==undefined)? valor[1] : allConEvento;
valor = valor[0];
}
S(":"+txt[n][0]).attr("SetValue", valor);
S(":"+txt[n][0]).val(valor, ConEvento);
}
}
}else if( typeof(txt)=='string' ){
if( txt=="*" ){
_FrmPaste();
return;
}
Dim = S.nsp(txt).split(',');
for(n=0; n<Dim.length; n++){
S(":"+Dim[n]).val(valor, ConEvento);
}
}else{
S(txt).val(valor, ConEvento);
}
}
function ePPF(txt, valor, ConChange){
var Dim, n;
if( ConChange==undefined ) ConChange = true;
if( S.type(txt)=="object" ){
for(n in txt){
if( S.type(txt[n])=="array" ){
S(":"+n, _WOPENER).val(txt[n][0], txt[n][1]);
}else{
Dim = S.nsp(n).split(',');
for(i=0; i<Dim.length; i++){
S(":"+Dim[i], _WOPENER).val(txt[n], ConChange);
}
}
}
}else if( typeof(txt)=='string' ){
Dim = S.nsp(txt).split(',');
for(n=0; n<Dim.length; n++){
S(":"+Dim[n], _WOPENER).val(valor, ConChange);
}
}else{
S(txt, _WOPENER).val(valor, ConChange);
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
function ePGO(field){
return S(":"+field, _WOPENER).obj;
}
function eGetFileName( Campo ){
if( DGI(Campo)!=null ){
var Obj = DGI(Campo);
if( Obj.getAttribute("NewValue")!=null ) return( Obj.getAttribute("NewValue")!=null ? Obj.getAttribute("NewValue") : "" );
}
return "";
}
function eSelectValue(NomCampo){
return S(":"+NomCampo).option();
}
function _SelectAncho(el, nVar){
var a = S(':_INPUT_'+el).css("width");
if( a==0 && null!=DGI(el+'_TABLE') ) a = eGO(el+'_TABLE').parentNode.offsetWidth;
if( nVar!=undefined && a>0 ) nVar.style.width = px(a);
return a;
}
function eGetCondition(nm){
return _cForm[_DefCampo[nm].Indice].Condicion;
}
function ePutCondition( nm, val, ConClass ){
if( eGO(nm)._BakCondition==undefined ) eGO(nm)._BakCondition = _cForm[_DefCampo[nm].Indice].Condicion;
_cForm[_DefCampo[nm].Indice].Condicion = val;
if( ConClass!=undefined && ConClass ){
eGO(nm).className = 'EDITABLE';
try{ eGO('_INPUT_'+nm).className = 'EDITABLE'; }catch(e){}
}
}
function eResetCondition( nm ){
if( eGO(nm)._BakCondition!=undefined ) _cForm[_DefCampo[nm].Indice].Condicion = eGO(nm)._BakCondition;
}
function eAlign(co, ac, cd){
var label2 = (S("LABEL[for="+co+"]").length) ? S("LABEL[for="+co+"]").obj:null;
var co=DGI(co), cd=DGI(cd), Label, m, oa, o, d;
if( co==null || cd==null ) return;
if( DGI('_INPUT_'+cd.name)!=null ) cd = DGI('_INPUT_'+cd.name);
if( co.offsetWidth==0 && DGI('_INPUT_'+co.name)!=null ) co = DGI('_INPUT_'+co.name);
if( co.offsetWidth==0 || cd.offsetWidth==0 ) return;
Label = co;
oa = eIndex(Label.sourceIndex-1);
if( oa.tagName=='NOBR' ) oa = eIndex(Label.sourceIndex-2);
if( oa.tagName=='LABEL' && '.LD.LC.LS.LE.'.indexOf(oa.id)>-1 ) Label = oa;
if( oa.className=="FILEGROUP" )  Label = eIndex(Label.sourceIndex-3);
if( co.eHTML!=undefined ) co = eGO(co.name+'_');
o = eXY(co);
if( cd.eHTML!=undefined ) cd = eGO(cd.name+'_');
d = eXY(cd);
if( ac=='>' ){
}else{
o[0] += co.offsetWidth - cd.offsetWidth;
}
if( ac=='<<' ){
o[0] -= _SizeInputIcons(cd).wi;
}
if( label2!=null ) Label = label2;
m = (isNaN(parseInt(Label.style.marginLeft))) ? 0 : parseInt(Label.style.marginLeft);
m = m+(d[0]-o[0]);
Label.style.marginLeft = px((m>0)?m:0);
}
function RadioClear(Nom){
if( event.ctrlKey && _Question ){
S(":"+Nom).each(function(p, o){
o.checked = false;
});
}
return eClearEvent();
}
function _CheckRadioON(el){
if( el.tagName=='A' ) el = el.children[0];
if( el.src.indexOf('_0.') > -1 ){
_Src(el,0,2);
}else if( el.src.indexOf('_1.') > -1 ){
_Src(el,1,3);
}else if( el.src.indexOf('_00.') > -1 ){
_Src(el,'00',22);
}
if( el.onmouseenter!=null && (el.onmouseenter+'').indexOf('S(this).tip(')>-1 ){
el.AutoTimeOff=1;
S(el).eventFire("mouseenter");
}
}
function _CheckRadioOFF(el){
if( el.tagName=='A' ) el = el.children[0];
if( el.src.indexOf('_2.') > -1 ){
_Src(el,2,0);
}else if( el.src.indexOf('_3.') > -1 ){
_Src(el,3,1);
}else if( el.src.indexOf('_22.') > -1 ){
_Src(el,22,'00');
}
}
var _OkChange = null;
function OkChange(){
if( /^(a|mR|b|c|m)$/.test(_Mode) && event && event.type=="load" ){
setTimeout(function(){
S("INPUT").each(function(k,o){
if( S(o).css("background-color")=="rgb(232, 240, 254)" ){
o.value = "";
}
});
}, 500);
}
if( !/^(a|mR)$/.test(_Mode) ) return true;
var txt="", o=S.values(), k;
for(k in o) txt += ""+o[k];
S(".ISubListBODY TABLE").each(function(k, o){
txt += o.textContent;
});
if( _OkChange==null ) _OkChange = txt;
return(_OkChange==txt);
}
function OkSalir(){
var txt = "";
if( !OkChange() ){
S("body").visible();
txt = S.lng(199);
event.returnValue = txt;
}
return txt;
}
function OcultaRespuesta(){
if( !top.eReadyState(window) ){
setTimeout('OcultaRespuesta();', 100);
}else{
try{ Oculta_Respuesta(); }catch(e){}
if( (_Accion=='mR' || _Accion=='bR') && _WOPENER._Obj=='L' && _WOPENER._SUBLISTADO_ ) top.eSWClose(window);
}
}
function CheckScroll(){
S(document.body).scrollSet("#TABContainer");
}
var _iAncho = _iAlto = 0;
function Recalcula(CalcForma, FijarY){
try{
_SubmitToSeek_FUNCTION();
}catch(e){}
try{
_WOPENER.eHideBusy();
}catch(e){}
if( _Obj=='G' && CalcForma!=undefined ) CalculoForma();
else{
S(".ISubList").each(function(pk, obj){
var tmp = S.mid(/(\&_SIZE\=.+\&)/.exec(obj.src+"&")[0], "=",",");
S(obj).css("width:"+S.lower(tmp));
});
}
if( window.frameElement.name=="IWORK" ){
if( S("#TABContainer").length ) S(document.body).scrollSet("#TABContainer");
}else if( window.frameElement.eNORESIZE!=undefined || S(window.frameElement).attr("eNORESIZE")!=null ){
return;
}else{
if( _AutoSize[0]!=0 ){
S(window).windowResize(_AutoSize[0], _AutoSize[1], true);
if( _AutoSize[2] ) S("body").css("overflow:scroll");
if( _AutoSize[3]!="" ) S(window).windowCaption(_AutoSize[3]);
return;
}else if( window.frameElement.getAttribute("_WIDTH") || window.frameElement.getAttribute("_HEIGHT") ){
if( window.frameElement.getAttribute("_WIDTH")=="" ) window.frameElement.setAttribute("_WIDTH", document.body.scrollWidth);
if( window.frameElement.getAttribute("_HEIGHT")=="" ) window.frameElement.setAttribute("_HEIGHT", document.body.scrollHeight);
S(window).windowResize(window.frameElement.getAttribute("_WIDTH"), window.frameElement.getAttribute("_HEIGHT"), true, window.frameElement.getAttribute("_x")==null);
return;
}
if( _BYPHONE || _CARD ){
S(window).windowResize(document.body.scrollWidth, document.body.scrollHeight, true);
return;
}
S("#PAGINA").css({width:1, height:1});
var mw = document.body.scrollWidth,
mh = document.body.scrollHeight;
if( S("#PAGINA").exists() ){
mw = Math.min(mw, S("#PAGINA").obj.offsetWidth)+1;
mh = Math.min(mh, S("#PAGINA").obj.offsetHeight)+1;
if( DGI('PAGINA').getAttribute("eWidth")!=null ) mw = Math.max(mw, DGI('PAGINA').getAttribute("eWidth"));
}
S(window).windowResize(mw, mh, true);
var s = S(document.body).scrollSet("#PAGINA"), ancho=0, alto=0;
if(s.sw) alto = S.setup.scrollWidth;
if(s.sh) ancho = S.setup.scrollWidth;
if( (ancho+alto)==0 ) return;
S("#PAGINA").css({width:"", height:""});
S(window).windowResize(mw+ancho, mh+5+alto, true);
}
}
function ISubListCargada(win){
if( window.name=='IWORK' && typeof(_PreView)!='undefined' ){
top.eLoading(false,window);
_PreView = false;
}
_ISubListTotal--;
if( _ISubListTotal>0 ) return;
_ExeRecalc();
}
var _x,_y;
function VerFicha(xTipo){
Recalcula();
}
function AltoNFilas(xObj, tRow){
var Obj = S.type(xObj)=="string"? DGI(xObj): xObj;
if( Obj==null ) return;
if( Obj.tagName!='TABLE' ) Obj = Obj.firstChild;
if( Obj==null || Obj.tagName!='TABLE' ) return;
if( S(Obj.parentNode).attr("NF")==undefined ) S(Obj.parentNode).attr("NF",tRow);
tRow = S(Obj.parentNode).attr("NF");
if( tRow==undefined ){
tRow = Obj.rows.length;
if( tRow > 5 ) tRow = 5;
}
var nfv=0, f, el=Obj.rows[0], y=3;
for(f=0; f<Obj.rows.length; f++){
if( Obj.rows[f].offsetHeight>0 ){
el = Obj.rows[f];
if( ++nfv>=tRow ){
y += el.offsetHeight;
while( el.tagName!='TABLE' ){
y += el.offsetTop;
el = el.offsetParent;
}
return y;
}
}
}
return y + Obj.rows[0].offsetHeight + (el.offsetHeight * (tRow-1));
}
function SortTabla(){
top.SortTabla( window, S.event(window) );
}
function SeekVerTR( Obj ){
var ne = Obj.sourceIndex-1;
while( Obj.tagName !='BODY' && !(Obj.tagName=='DIV' && Obj.getAttribute("VerTr")!=null ) ){
ne--;
Obj = eIndex(ne);
}
if( Obj.tagName=='DIV' && Obj.getAttribute("VerTr")!=null && Obj.getAttribute("VerTr")=='none') S(Obj).eventFire("click");
}
function THScroll(NomId, nRow){
var obj = S.event(window);
obj.onscroll = null;
S(obj.children[0]).scroll();
}
var _vSeCargo, _NomVentana,
_SWPapel = _SWLapiz = _SWBorde = _SWTitulo = _SWFunction = '';
function vSeCargo(x, y, Modal){
var oIFrame = DGI('_'+_NomVentana+'IFRAME');
try{
var status = top.eReadyState(oIFrame.eWindow);
}catch(e){
_vSeCargo = setTimeout(function(){
vSeCargo(x, y, Modal);
}, 250);
return;
}
if( status ){
var sTLF = oIFrame.eWindow,
sVentana = DGI(_NomVentana);
if( eTrim(sTLF.document.body.innerHTML)=='' ){
_vSeCargo = setTimeout(function(){
vSeCargo(x, y, Modal);
}, 250);
return;
}
sVentana.innerHTML = sTLF.document.body.innerHTML;
var sWidth = document.body.scrollWidth,
sHeight = document.body.scrollHeight,
ObjTitulo = DGI('_'+_NomVentana+'Titulo');
if( sTLF.ColorPapel!=undefined ) ObjTitulo.parentNode.style.background = ObjTitulo.parentNode.parentNode.cells[1].style.background = sTLF.ColorPapel;
if( sTLF.ColorLapiz!=undefined ) ObjTitulo.style.color = sTLF.ColorLapiz;
if( sTLF.Titulo	 !=undefined ) ObjTitulo.innerHTML = sTLF.Titulo;
if( _SWTitulo!='' ) ObjTitulo.innerHTML = _SWTitulo;
if( _SWPapel!='' ) ObjTitulo.parentNode.style.background = ObjTitulo.parentNode.parentNode.cells[1].style.background = _SWPapel;
if( _SWLapiz!='' ) ObjTitulo.style.color = _SWLapiz;
var Obj = DGI('_'+_NomVentana);
if( sTLF.Coord_X!=undefined ) Obj.style.posLeft = px(sTLF.Coord_X);
if( sTLF.Coord_Y!=undefined ) Obj.style.posTop  = px(sTLF.Coord_Y);
if( sTLF.ColorBorde!=undefined ){
with(Obj.style){
border = '2px outset';
color  = sTLF.ColorBorde;
}
}
if( _SWBorde!='' ){
with(Obj.style){
border = '2px outset';
color  = _SWBorde;
}
}
Obj.style.display = 'table';
Obj.style.zIndex = 10;
Obj.firstChild.rows[0].cells[0].style.width = px(sVentana.offsetWidth-16);
var sx=x, sy=y, xy;
if( x < 0 || y < 0 ){
xy = eXY(_eLoadDiv);
}else{
xy = new Array(0,0,0,0);
}
if( x==-1 ){
x = xy[0];
}else if( x==-2 ){
x = xy[0]+xy[2]/2-(Obj.offsetWidth/2);
}else if( x==-3 ){
x = (document.body.clientWidth-xy[2])/2;
}
if( y==-1 ){
y = xy[1];
}else if( y==-2 ){
y = xy[1]-xy[3]/2-(Obj.offsetHeight/2);
}else if( y==-3 ){
y = (document.body.clientHeight-xy[3])/2;
}
with( Obj.style ){
posTop = px(y);
posLeft = px(x);
}
S(Obj.children[0].rows[0].cells[0].children[0]).move();
with( oIFrame.style ){
left = px(x);
top = px(y);
width = px(Obj.offsetWidth);
height = px(Obj.offsetHeight);
display = 'block';
zIndex = 9;
}
if( sx==-1 && x+Obj.offsetWidth > sWidth ) oIFrame.style.left = Obj.style.left = px(sWidth-Obj.offsetWidth);
if( sy==-1 && y+Obj.offsetHeight > sHeight ) oIFrame.style.top = Obj.style.top = px(sHeight-Obj.offsetHeight);
oIFrame.isModal = Modal;
if( Modal ){
with( oIFrame.style ){
left = "0px";
top = "0px";
width = '100%';
height = '100%';
}
oIFrame.className = "OFF";
frames['_'+_NomVentana+'IFRAME'].document.write("<HTML><HEAD><META http-equiv='Content-Type' content='text/html; charset=ISO-8859-1'><TITLE></TITLE></HEAD><BODY class='OFF' STYLE='background-color:#000000;'></BODY></HTM>");
frames['_'+_NomVentana+'IFRAME'].document.close();
}
for(var n=0; n<_SubVentana.length; n++) if( _SubVentana[n]!=_NomVentana ) DGI('_'+_SubVentana[n]).style.zIndex = 9;
if( _SWFunction!='' ) eval(_SWFunction)();
top.eInfoHide();
Obj.focus();
}else{
_vSeCargo = setTimeout(function(){
vSeCargo(x, y, Modal);
}, 250);
}
}
function eLoadDiv_(){
var d = _LoadDivARG;
with( DGI('_'+d[0]) ){
onkeydown = function anonymous(){ eClearEvent(); }
children[0].cells[0].onmousedown = function anonymous(){ vDown(); }
children[0].cells[1].children[0].onclick = function anonymous(){
DGI("_"+d[0]+"IFRAME").style.display="none";
DGI("_"+d[0]).style.display="none";
}
}
eLoadDiv(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10]);
}
var _eLoadDiv=null, _LoadDivARG;
function eLoadDiv(NomVentana, sURL, Titulo, x, y, Lapiz, Papel, Borde, nomFunc, Reload, Modal){
if( event!=null ) _eLoadDiv = S.event(window);
if( _eLoadDiv==null ) _eLoadDiv = document.body;
if( DGI(NomVentana)==null ){
_LoadDivARG = eLoadDiv.arguments;
top.eCallSrv(window, 'edes.php?E:$loaddiv.gs&NmWin='+NomVentana);
return;
}
_NomVentana = NomVentana;
_SWPapel = _SWLapiz = _SWBorde = _SWTitulo = '';
if( Titulo!=undefined && Titulo!=null ) _SWTitulo=Titulo;
if( Lapiz!=undefined && Lapiz!=null ) _SWLapiz=Lapiz;
if( Papel!=undefined && Papel!=null ) _SWPapel=Papel;
if( Borde!=undefined && Borde!=null ) _SWBorde=Borde;
if( x==undefined || x==null ) x = -1;
if( y==undefined || y==null ) y = -1;
if( nomFunc==undefined || nomFunc==null ) nomFunc = '';
if( Reload==undefined || Reload==null ) Reload = false;
if( Modal==undefined || Modal==null ) Modal = false;
_SWFunction = nomFunc;
for(var n=0; n<_SubVentana.length; n++){
if( _SubVentana[n]=='' ) continue;
var Obj = DGI('_'+_SubVentana[n]).style;
if( _SubVentana[n]==NomVentana ){
if( _Remote ) sURL = sURL.replace('edes.php?','edes.php?R');
if( _cSubVentana[n]!=sURL || Reload ){
_cSubVentana[n] = sURL;
try{
top.eInfo(_eLoadDiv, eLng(133));
var iframe = top.eCallSrv(window, sURL);
DGI('_'+_NomVentana+'IFRAME').eWindow = iframe;
_vSeCargo = setTimeout(function(){
vSeCargo(x, y, Modal);
}, 250);
}catch(e){
for(i in e) alert('ERROR: '+i+': '+e[i]);
}
}else{
if( Modal ) DGI("_uFiltroPorOpIFRAME").style.display = 'block';
Obj.display = 'block';
Obj.zIndex = 10;
}
}else{
Obj.zIndex = 9;
}
}
}
function LoadDiv(NomVentana, sURL, nomFunc, win){
eLoadDiv(NomVentana, sURL, '',-1,-1,'','','', nomFunc, win);
}
var vObj,vX,vY;
function vDown(){
var Obj = S.event(window);
while( Obj.tagName!='DIV' && Obj.dragON==null ) Obj = Obj.parentNode;
vObj = Obj;
DGI(vObj.id+'Titulo').style.cursor = 'move';
if( DGI(vObj.id+'IFRAME')!=null )DGI(vObj.id+'IFRAME').style.display = 'none';
sX = parseInt(Obj.style.posLeft)-event.clientX-document.body.scrollLeft;
sY = parseInt(Obj.style.posTop )-event.clientY-document.body.scrollTop;
document.onmousemove = vMove;
document.onmouseup = vUp;
Obj.style.zIndex = 10;
for( var n=0; n<_SubVentana.length; n++ ){
if( '_'+_SubVentana[n]!=Obj.id ) DGI( '_'+_SubVentana[n] ).style.zIndex = 9;
}
}
function vMove(){
if( vObj ){
if( S.event(window).tagName==undefined ) return false;
var x = sX + event.clientX + document.body.scrollLeft;
var y = sY + event.clientY + document.body.scrollTop;
vObj.style.pixelLeft = x+"px";
vObj.style.pixelTop = y+"px";
return false;
}
}
function vUp(){
document.onmousemove = document.onmouseup = null;
DGI(vObj.id+'Titulo').style.cursor = 'pointer';
if( DGI(vObj.id+'IFRAME')!=null ){
DGI(vObj.id+'IFRAME').style.display = 'block';
if( !DGI(vObj.id+'IFRAME').isModal ){
with( DGI(vObj.id+'IFRAME').style ){
left = px(DGI(vObj.id).style.left);
top = px(DGI(vObj.id).style.top);
}
}
}
vObj = null;
}
var _eFormReadOnly = new Array();
function eFormReadOnly( On ){
var n=0,f,c,fc;
for(f=0; f<document.forms.length; f++){
fc = document.forms[f].elements;
for(c=0; c<fc.length; c++){
if( On ){
_eFormReadOnly[n++] = fc[c].readOnly;
fc[c].readOnly = true;
}else{
fc[c].readOnly = _eFormReadOnly[n++];
}
}
}
}
function _AnchoField(Nom, nVar){
try{
if( S(":_INPUT_"+Nom).obj ) Nom = '_INPUT_'+Nom;
if( S(":"+Nom).attr("eHTML")==null ){
var d = S(":"+Nom).css("width,padding-left,padding-right"),
Ancho = d["width"],
mas = d["padding-left"]+d["padding-right"];
}else{
var obj = S(":"+Nom).obj.parentNode,
Ancho = obj.offsetWidth,
mar = S(obj).css("margin-left,margin-right");
Ancho -= mar["margin-left"]-mar["margin-right"];
}
}catch(e){
top.eAlert(S.lng(212), eLng(80,Nom), 'A','E');
}
if( nVar!=undefined && Ancho>0 ){
if( nVar.tagName=="SPAN" ){
var d2 = S(nVar).css("padding-left,padding-right"),
mas2 = d2["padding-left"]+d2["padding-right"];
if( mas!=mas2 ) Ancho += (mas-mas2);
}
nVar.style.width = px(Ancho);
}
return Ancho||10;
}
function _AnchoGrupo(Campos, Obj){
var tmp = (Campos.replace("-","+")).split('+'), xyi,xyf,
des = eGO(tmp[1]),
oObj = eGO(Obj);
if( DGI('_INPUT_'+tmp[0])!=null ) tmp[0] = '_INPUT_'+tmp[0];
if( DGI('_INPUT_'+tmp[1])!=null ) tmp[1] = '_INPUT_'+tmp[1];
xyi = eXY(eGO(tmp[0])); if( xyi[0]==0 ) xyi = eXY(eGO(tmp[0]+'_'));
xyf = eXY(eGO(tmp[1])); if( xyf[0]==0 ) xyf = eXY(eGO(tmp[1]+'_'));
if( S.mid(Obj,-6)=="_TABLE" ) oObj = oObj.parentNode.parentNode;
if( Campos.indexOf("-")>0 ){
xyf[2] += _SizeInputIcons(tmp[1]).wi;
}
oObj.style.width = px(xyf[0] - xyi[0] + xyf[2] - (des.offsetWidth-des.clientWidth)*2-2);
}
function _AnchoHasta(Como, Obj, ConIconos){
if( DGI('_INPUT_'+Como)!=null ) Como = '_INPUT_'+Como;
if( DGI('_INPUT_'+Obj )!=null ) Obj = '_INPUT_'+Obj;
var oObj = eGO(Obj),
oComo = eGO(Como);
if( oObj.type=="hidden" && S("#"+Obj).length ) oObj = S("#"+Obj).obj;
if( oComo.type=="hidden" && S("#"+Como).length ) oComo = S("#"+Como).obj;
if( oObj.type=="hidden" || oComo.type=="hidden" ) return;
var ancho = oObj.offsetWidth,
xyd = eXY(oObj),
xyo = eXY(oComo),
a = Math.abs(S(oComo).css("width") - (xyd[0]-xyo[0])),
n, i, o, xyi;
if( oObj.tagName=="SPAN" ) a += S(oComo).css("paddingRight")+1;
if( ConIconos!=undefined ){
a += _SizeInputIcons(oComo).wi;
}
if(a>0 && ancho>0){
if( S.mid(Obj,-6)=="_TABLE" ) oObj = oObj.parentNode.parentNode;
oObj.style.width = px(a);
}
return(a>0);
}
function _SizeInputIcons(obj){
if( typeof(obj)=="string" ) obj = DGI(obj);
var xy = eXY(obj),
xyi = xy,
padre = obj.parentElement,
hijos = padre.children.length, n,o,i;
if( S(padre).class("?FILEGROUP") ){
padre = padre.parentElement;
hijos = padre.children.length;
for(n=0; n<hijos; n++){
o = padre.children[n];
if( o.tagName=="SPAN" && o.className=="FILEGROUP" ) break;
}
}else{
for(n=0; n<hijos; n++){
if( padre.children[n]==obj ) break;
}
}
if( hijos>1 ){
for(i=n+1; i<hijos; i++){
o = padre.children[i];
if( o.offsetWidth==0 ){
}else if( /(IMG|I)/.test(o.tagName) ){
xyi = eXY(o);
}else break;
}
}
return {x:xy[0], w:xy[2], wi:(xyi[0]+xyi[2])-(xy[0]+xy[2])};
}
function eLoading(on){
S.loading(window, on);
}
var _xOnChangeIndex = '';
function _OnChangeIndex(txt){
if( _CheckIndex ){
setTimeout(function(){
_OnChangeIndex(txt);
},250);
}else{
var ObjName = (event!=null) ? S.event(window).name : '',
tmp = txt.split('|'), valor='', Mas='', n;
tmp[0] = tmp[0].replace(';',',');
var Dim = tmp[0].split(',');
for(n=0; n<Dim.length; n++) valor += eGF(Dim[n])+'|';
if( _xOnChangeIndex!=valor && valor.replace(/\|/g,'')!='' ){
_CheckIndex = true;
S(":"+ObjName).css("background-color:#cccccc");
if( _Mode=='mR' && txt.indexOf(_DBINDEX)==-1 ) Mas = '&_Indice_='+_DBINDEX+'&_Valor_='+eGF(_DBINDEX);
top.eCallSrv(window, 'edes.php?E:$checkindex.gs&'+escape(txt+'|'+ObjName+'|'+valor + _Source+'|'+ ((typeof(_CheckDBIndexFunc)!='undefined')?_CheckDBIndexFunc:'') )+((typeof(_CheckDBIndexDB)!='undefined')?'&_DB='+_CheckDBIndexDB:'')+Mas);
_xOnChangeIndex = valor;
}
}
return true;
}
function eOp(nOp){
var x = location.href+'', i = x.indexOf('?')+2, f = x.indexOf(':',x.indexOf('edes.php')),
hr = x.substring(0,i)+nOp+x.substring(f);
if( hr.indexOf('&_SEEK&')==-1 && hr.indexOf('&_PSOURCE=')>-1 ){
var Dim = _DBINDEX.split(','), b = '', n;
for(n=0; n<Dim.length; n++) b += '&'+Dim[n]+"='"+eGF(Dim[n])+"'";
hr = hr.replace('&_PSOURCE=','&_SEEK'+b+'&_PSOURCE=');
if( hr.indexOf('&_FORMBUTTONS=')==-1 ) hr = hr.replace('&_PSOURCE=','&_FORMBUTTONS='+_FORMBUTTONS+'&_PSOURCE=');
}
top.eLoading(1,window);
location.href = hr;
return eClearEvent();
}
function eLog(tipo, Script){
var Datos='|', n, Dim=(_DBLOG!='') ? _DBLOG.split(',') : _DBINDEX.split(',');
for(n=0; n<Dim.length; n++){
if( DGI(Dim[n]).getAttribute("DCM")!=null ){
Datos += eClearThousands(DGI(Dim[n]).value);
}else{
Datos += DGI(Dim[n]).value;
}
}
var DDBB = (_DB!='') ? '&_DB='+_DB : '';
if( tipo=='user' ){
top.eCallSrv(window, 'edes.php?E:$log'+tipo+'.gs&'+_DBLOGTABLE+'|'+_DBINDEX+Datos+'&_LogUser="'+_LogUser+'"'+DDBB);
}else{
top.eSWOpen(window, 'edes.php?E:$log'+tipo+'.gs&'+_DBLOGTABLE+'|'+_DBINDEX+Datos+'|'+Script+DDBB, eLng(83), 1);
}
return eClearEvent();
}
function xy(e){
return eXY(e);
}
function ePosition(Obj, x, y, Des){
if( typeof(Obj)=='string' )	Obj=DGI(Obj);
Obj.style.display = 'block';
if( typeof(x)=='undefined' ) return;
if( typeof(Des)=='undefined' ){
if( isNaN(x) ){
switch( x.toUpperCase() ){
case 'L':
x = 0;
break;
case 'C':
x = (document.body.clientWidth/2)-(Obj.offsetWidth/2)-document.body.scrollLeft;
break;
case 'R':
x = document.body.clientWidth-Obj.offsetWidth-document.body.scrollLeft;
break;
default:
x = eXY(Obj)[0];
}
}
if( isNaN(y) ){
switch( y.toUpperCase() ){
case 'T':
y = 0;
break;
case 'M':
y = (document.body.clientHeight/2)-(Obj.offsetHeight/2)-document.body.scrollTop;
break;
case 'B':
y = document.body.clientHeight-Obj.offsetHeight+document.body.scrollTop;
break;
default:
y = eXY(Obj)[1];
}
}
}else{
var xy = eXY(Des);
x = xy[0];
y = xy[1];
}
with(Obj.style){
left = px(x);
top = px(y);
}
}
function _BorderWidth(vpx, Obj, Hori){
var v = parseInt(vpx);
if( isNaN(v) ){
if( vpx=='medium' ) v = 1;
else if( vpx=='thin' ) v = 1;
else if( vpx=='thick' ) v = 1;
else v = 0;
}
return v;
}
function eGetFocus( Obj, win ){
if( win==undefined ) win = window;
if( typeof(Obj)=='string' ) Obj = win.DGI(Obj);
if( win.DGI('_INPUT_'+Obj.name)!=null ){
if( Obj.readOnly || Obj.offsetWidth==0 ) Obj = win.DGI('_INPUT_'+Obj.name);
}
if( !Obj.disabled && !Obj.readOnly && Obj.type!='hidden' && Obj.offsetWidth>0 ) return Obj;
return null;
}
function eFocus(Obj, win){
if( win==undefined ) win = window;
if( typeof(Obj)=='string' ) Obj = win.DGI(Obj);
Obj = eGetFocus(Obj, win);
if( Obj!=null ){
Obj.focus();
return true;
}
return false;
}
function _ModeChange(Op){
var winList = window.frames._SUBLISTADO;
if( winList.DGI('BROWSE')==null ){
top.eInfo(window,eLng(139));
return;
}
var line = S(".LineSubModos").obj;
if( S(window).windowIs() && /(b|c|m)/.test(Op) ){
var nTit = S.upper(S("I[op='"+Op+"']", line).attr("title")), oTit, c,
tit = S(window).windowGetCaption();
S("[op]",line).each(function(k,o){
c = o.getAttribute("op");
if( /(b|c|m)/.test(c) ){
if( !S(o).class("?OFF") ) oTit = S.upper(S(o).attr("title"));
}
});
if( tit.indexOf(oTit)==0 ) S(window).windowCaption(S.replace(tit, oTit, nTit), 1);
}
if( S("#TITULO span[id='ESUBACTION']", winList).length && /(b|c|m)/.test(Op) ){
var dim={m:"A MODIFICAR", c:"A CONSULTAR", b:"A BORRAR" }
S("#TITULO span[id='ESUBACTION']", winList).text(dim[Op]);
}
if( Op!="a" ) S("I", line).class("+OFF");
S(["I[op='a']", "I[op='s']", "I[op='"+Op+"']"], line).class("-OFF");
if( Op!="a" ){
var txt = S("I[op='"+Op+"']", line).attr("eAction");
S("#LineSubModosAction").text(txt? txt:"");
}
var url = ''+window.location;
if( Op=='a' ){
url = 'edes.php'+S.replace(url, [
['?Fo:'			,'?Fa:'], ['?Go:'		 , '?Ga:'],
['?F'+_Mode+':'	,'?Fa:'], ['?G'+_Mode+':', '?Ga:']
]).split('edes.php')[1];
top.eSWOpen(winList, url+'&_CLOSE_=1&_SUBINSERT=1&_PSOURCE='+_Source, "", true);
}else{
url = S.replace(url, [
['?Fo:'		   , '?F'+Op+'R:'], ['?Go:'		   , '?G'+Op+'R:'],
['?F'+_Mode+':', '?F'+Op+'R:'], ['?G'+_Mode+':', '?G'+Op+'R:']
]);
winList._WL = url;
}
}
function _RestauraBusqueda(){
if( _TabListType=="L" ){
if( S("#PAGINA").obj.rows[0].style.display!="none" ){
S("#PAGINA").obj.rows[0].style.display = "none";
return;
}
S("#PAGINA").obj.rows[0].style.display = "";
}
eView('_RestauraBusqueda',0);
eView('TABBorder');
if( DGI('_SUBLISTADO').offsetHeight<frames['_SUBLISTADO'].document.body.scrollHeight ) frames['_SUBLISTADO'].document.body.scroll = 'yes';
SeCargo('',FRM1.CampoFoco);
}
function _CreaListado(){
var idIFrame = '_SUBLISTADO';
if( DGI(idIFrame)!=null ){
eView('_Div'+idIFrame);
eView('TABBorder',0);
DGI("_RestauraBusqueda").style.display = "table-cell";
if( _TabListType=="L" ) S("#PAGINA").obj.rows[0].style.display = "none";
return idIFrame;
}
_TabListON = true;
var Obj = DGI('TABBorder');
if( top.eIsWindow(window) && window.frameElement.eNORESIZE==undefined ){
S(S.toTag(window.frameElement,"SPAN","*")).hidden();
}
var TD = DGI("PAGINA").insertRow().insertCell();
TD.style.height = '100%';
DGI('TABContainer').style.height = "20px";
var ta = document.createElement('DIV');
with(ta.style){
width = px(DGI('TABBorder').offsetWidth);
textAlign = 'center';
padding = '5px 50px 5px 50px';
cursor = 'pointer';
display = "table-cell";
}
with(ta){
id = '_RestauraBusqueda';
className = 'AddButton';
onclick = _RestauraBusqueda;
}
ta.innerHTML = S("#OpExe").html();
DGI('TABContainer').appendChild(ta);
if( _oMode!='o' ) eView('TABBorder',0);
else ta.style.display = 'none';
if( _TabListType=="L" ) ta.parentNode.parentNode.parentNode.style.display = 'none';
var ta = document.createElement('IFRAME'), n;
ta.name = ta.id = idIFrame;
ta.WOPENER = window;
ta.eNORESIZE = true;
ta.frameBorder = 0;
ta.style.width = '100%';
ta.style.height = '100%';
TD.appendChild(ta);
for(n=0; n<window.frames.length; n++) if( window.frames[n].window.frameElement.name==idIFrame ){
window.frames[n].name = idIFrame;
window.frames[n].frameElement.WOPENER = window;
}
var oTD = DGI("PAGINA").insertRow().insertCell();
var txt = '<table><tr>';
txt += ((_TabListType=="L")? '<td><i op="s" class="ICONINPUT ICONSEEK" onclick="_RestauraBusqueda()" title="Cambiar filtro">S</i> ':"");
txt += ((_FORMBUTTONS.indexOf('a')>-1)? '<td><i i-d=l op="a" class="ICONINPUT ICONINSERT" onclick="_ModeChange(\'a\')" title="Insertar">I</i> ':"");
txt += ((_FORMBUTTONS.indexOf('b')>-1)? '<td><i i-d=o op="b" class="ICONINPUT ICONDELETE OFF" onclick="_ModeChange(\'b\')" title="Eliminar" eAction="Eliminando">D</i> ':"");
txt += ((_FORMBUTTONS.indexOf('c')>-1)? '<td><i i-d=o op="c" class="ICONINPUT ICONVIEW OFF" onclick="_ModeChange(\'c\')" title="Consultar" eAction="Consultando">V</i> ':"");
txt += ((_FORMBUTTONS.indexOf('m')>-1)? '<td><i i-d=o op="m" class="ICONINPUT ICONUPDATE OFF" onclick="_ModeChange(\'m\')" title="Modificar" eAction="Modificando">U</i>':"");
oTD.innerHTML = txt+'<td style="padding-left:12px" id="LineSubModosAction"></table>';
oTD.className = 'LineSubModos';
var xy = eXY(TD),
cTABLE = document.createElement('TABLE');
with(cTABLE){
id = '_Div'+idIFrame;
border = 0;
cellPadding = "0px";
cellSpacing = "0px";
onclick = function anonymous(){ this.style.display='none'; }
}
with(cTABLE.style){
position = 'absolute';
top = px(xy[1]);
left = px(xy[0]);
width = px(TD.offsetWidth);
height = px(TD.offsetHeight);
}
var cTD = cTABLE.insertRow().insertCell();
with(cTD.style){
textAlign = 'center';
verticalAlign = 'middle';
backgroundColor = S(document.body).css("backgroundColor");
}
S(cTABLE).nodeStart(document.body);
S("I[op='"+_Mode+"']", ".LineSubModos").class("-OFF");
S("#LineSubModosAction").text(S("I[op='"+_Mode+"']", ".LineSubModos").attr("eAction"));
return idIFrame;
}
function _SubListado(v){
if( top._DimEvent.length>0 ){
top.eInfoError(window,S.lng(220));
S("body").visible();
return eClearEvent();
}
document.FRM1.target = _CreaListado();
if( _Action.indexOf('&_SUBLISTADO_=1')==-1 ) _Action = _Action+'&_SUBLISTADO_=1&_Mode='+_Mode;
_ConCtrlKey = 0;
eOkTab(0);
}
function _FrmCopy(){
if( document.FRM1 ){
var t = document.FRM1.elements, n;
for(n=0; n<t.length; n++){
if( t[n].tagName=='FIELDSET' || t[n].type=='button' ) continue;
t[n].BAK = t[n].value;
t[n].eReadOnly = t[n].readOnly;
t[n].eDisabled = t[n].disabled;
t[n].eClass = t[n].className;
if( t[n].getAttribute("ss")!=null && S.left(t[n].name,7)=="_INPUT_" ){
t[n].setAttribute("BAKTABLE", S("#"+S.mid(t[n].name,7,0)+"_TABLE").HTML());
}
}
}
}
function _FrmPaste(){
try{
_CampoFoco.focus();
}catch(e){}
var t = document.FRM1.elements, oImg, c,e,n;
for(n=0; n<t.length; n++){
if( t[n].tagName=='FIELDSET' || t[n].type=='button' ) continue;
t[n].readOnly = t[n].eReadOnly;
t[n].disabled = t[n].eDisabled;
t[n].className = t[n].eClass;
if( t[n].className=="ERROR" ) t[n].className = 'EDITABLE';
if( t[n].BAK==undefined ) t[n].BAK = '';
t[n].value = t[n].BAK;
if( t[n].getAttribute("ss")!=null && S.left(t[n].name,7)=="_INPUT_" ){
S("#"+S.mid(t[n].name,7,0)+"_TABLE").HTML( t[n].getAttribute("BAKTABLE") );
}
//else if( DGI('_INPUT_'+t[n].name)!=null ) DGI('_INPUT_'+t[n].name).readOnly = t[n].eReadOnly;
}
}
function _ResetViewSelect(){
var f,p,c,Nom;
for( f=0; f<document.forms.length; f++ ){
p = document.forms[f].elements;
for( c=0; c<p.length; c++ ){
try{
if( p[c].tagName!='FIELDSET' && p[c].name.substring(0,7)=='_INPUT_' ){
Nom = p[c].name.substring(7)+'_TABLE';
if( DGI(Nom)!=null ) DGI(Nom).INIT = 0;
}
}catch(e){
}
}
}
}
var _eBlink=false, __eBlink=null;
function eBlink( tf ){
clearTimeout(__eBlink);
if( tf==undefined ){
DGI("TABHeaderTitle").style.visibility = _VH(_eBlink);
_eBlink = !_eBlink;
__eBlink = setTimeout("eBlink()",(_eBlink)?250:750);
}else{
DGI("TABHeaderTitle").style.visibility = _VH(tf);
}
}
function eSelectJump(el){
var obj = (el==undefined)? S.event(window) : DGI(el),
on = "j", off = "i", n,field,attr,xAttr,p;
if( obj==null ) return;
n = obj.sourceIndex-1;
while( n>0 ){
try{
if( eIndex(n).name.substr(0,7)=='_INPUT_' ) break;
}catch(e){}
n--;
}
field = eIndex(n).name.substr(7);
xAttr = S(":_INPUT_"+field).attr("eRelationList");
attr = xAttr.split(",");
p = S.is(field, attr, 1);
if( p>0 ){
if( obj.innerText==off ){
if( S(":"+attr[p-1]).val()=="" ){
top.eInfo(window, eLng(89), 2);
return;
}
eEF(attr[p], 0);
S(":_INPUT_"+attr[p+1]).attr("eSetParentValue", attr[p]);
attr[p] = S.upper(attr[p]);
obj.innerText = on;
obj.title = eLng(90);
setTimeout(function(){eFocus(attr[p+1])}, 250);
}else{
eEF(attr[p], 1);
S(":_INPUT_"+attr[p+1]).attr("eSetParentValue", null);
attr[p] = S.lower(attr[p]);
obj.innerText = off;
obj.title = eLng(91);
setTimeout(function(){eFocus(attr[p])}, 250);
}
S(":_INPUT_"+attr[p-1]).attr("eRelationList", attr.join(","));
S(":_INPUT_"+attr[p-1]).eventFire("change");
}
}
function eSwapCol(txt,c1,c2){
var Obj = DGI(txt+'_TABLE').rows, sTD, n, v = eGF(txt);
for(n=0; n<Obj.length; n++){
sTD = Obj[n].cells[c1].textContent;
Obj[n].cells[c1].textContent = Obj[n].cells[c2].textContent;
Obj[n].cells[c2].textContent = sTD;
if( Obj[n].cells[0].textContent==v ) DGI('_INPUT_'+txt).value = Obj[n].cells[c1].textContent;
}
}
function _eGroupPDF( Existe ){
if( Existe==undefined || !Existe ){
top.TLF.frameElement.eEXE = _eGroupPDF;
for( var n=0; n<_eGroupPDFUrl.length; n++ ){
if( _eGroupPDFUrl[n]!='' ){
top.eInfo( window, eLng(92,(n+1),_eGroupPDFUrl.length), -1 );
document.FRM1.action = 'edes.php?Ll:'+_eGroupPDFUrl[n]+'&_FILEPDF='+(n+1)+','+_eGroupPDFUrl.length+'&_gs_formato_=P&_FORMBUTTONS=&_PSOURCE=MAIN'+"&_CONTEXT="+_CONTEXT;
document.FRM1.target = 'TLF';
document.FRM1.submit();
_eGroupPDFUrl[n] = '';
return;
}
}
}
top.TLF.frameElement.removeAttribute("eEXE");
top.eCallSrv( window, 'edes.php?D:'+_eGroupPDFDoc+'&_FILEPDF='+_eGroupPDFUrl.length+','+_eGroupPDFUrl.length + ((!_eGroupPDFCache)?'':'&_CACHEFILESRV='+_eGroupPDFDoc) );
_eGroupPDFUrl = _eGroupPDFDoc = null;
}
var _eGroupPDFUrl = _eGroupPDFDoc = null, _eGroupPDFCache = false;
function eGroupPDF( Dim, NomDoc, ConCache ){
if( ConCache==undefined ) ConCache = false;
_eGroupPDFUrl = Dim;
_eGroupPDFDoc = NomDoc;
_eGroupPDFCache = ConCache;
if( ConCache ){
top.eFileExistsSrv( window, NomDoc, '_eGroupPDF' );
return;
}
_eGroupPDF2(false,ConCache);
}
function _SMAddOption(Campo, uValor){
var Codigo = eGF('_'+Campo), Insertar=true, f, ni;
if( uValor!=undefined ) Codigo = uValor;
if( Codigo=='' ) return;
var Obj = DGI('LIST_'+Campo), txt = ','+Codigo+',';
for(f=0; f<Obj.rows.length; f++){
if( Obj.rows[f].cells[0].textContent==Codigo ){
S(":_"+Campo).val("");
Insertar = false;
top.eInfo(window, eLng(93));
return false;
}
txt = txt+Obj.rows[f].cells[0].textContent+',';
}
ni = S(":"+Campo).attr("eMaxItem")*1;
if( txt.length>eGO(Campo).maxLength || (ni>0 && (S(":"+Campo).val().split(",").length-1)>ni) ){
S(":_"+Campo).val("");
Insertar = false;
top.eInfo(window, eLng(94));
return false;
}
if( Insertar ){
if( eGA('_INPUT__'+Campo,'SMultipleSort')==1 ){
while( Obj.rows.length>0 ) Obj.deleteRow(0);
var sObj = Obj;
Obj = DGI('_'+Campo+'_TABLE');
for(f=0; f<Obj.rows.length; f++){
if( txt.indexOf(','+eTrim(Obj.rows[f].cells[0].textContent)+',')>-1 ){
var TR = sObj.insertRow();
TR.insertCell().textContent = eTrim(Obj.rows[f].cells[0].textContent);
TR.insertCell().innerHTML = "<I class='ICONINPUT' onclick=_SMDelOption('"+Campo+"') style='margin-right:2px' title='"+eLng(95)+"'>D</I>";
TR.insertCell().textContent = Obj.rows[f].cells[1].textContent;
Obj.rows[f].id = Obj.rows[f].cells[1].id = 'Selected';
}
}
}else{
var TR = Obj.insertRow();
TR.insertCell().textContent = Codigo;
TR.insertCell().innerHTML = "<I class='ICONINPUT' onclick=_SMDelOption('"+Campo+"') style='margin-right:2px' title='"+eLng(95)+"'>D</I>";
if( Codigo!=undefined ){
Obj = DGI('_'+Campo+'_TABLE');
for(f=0; f<Obj.rows.length; f++){
if( Obj.rows[f].cells[0].textContent==Codigo ){
TR.insertCell().textContent = Obj.rows[f].cells[1].textContent;
Obj.rows[f].id = Obj.rows[f].cells[1].id = 'Selected';
break;
}
}
}else{
TR.insertCell().textContent = eGF('_INPUT__'+Campo);
}
}
DGI(Campo).value = txt;
if( S(window).windowIs() ) Recalcula();
if( S(":_INPUT__"+Campo).length ) S.eventFire(S(":_INPUT__"+Campo).obj, "change");
}
DGI('_'+Campo).value = DGI('_INPUT__'+Campo).value = '';
return true;
}
function _SMDelOption(Campo, pEl){
var el = (pEl==undefined)? S.event(window):pEl, f, Obj, txt='',
Cod = el.parentNode.parentNode.cells[0].textContent,
Cambio = (DGI(Campo).value!=txt);
S(el.parentNode.parentNode).nodeRemove();
Obj = DGI('LIST_'+Campo);
for(f=0; f<Obj.rows.length; f++) txt = txt+','+Obj.rows[f].cells[0].textContent;
if( txt!='' ) txt += ',';
DGI(Campo).value = txt;
Obj = DGI('_'+Campo+'_TABLE');
for(f=0; f<Obj.rows.length; f++){
if( Obj.rows[f].cells[0].textContent==Cod ){
Obj.rows[f].id = Obj.rows[f].cells[1].id = "";
break;
}
}
if( S(window).windowIs() ) Recalcula();
if( Cambio && DGI("_INPUT__"+Campo) ) S.eventFire(DGI("_INPUT__"+Campo), "change");
}
function _EqualWidths(t,c,Min,campo){
var m=0, n, Dim=c.split(','), i,o,dif=0, ml=0,l,of,pl=0;
if( c=="*" ){
Dim = [];
o = document.forms[0].elements;
for(n=0; n<o.length; n++){
if( o[n].tagName!="FIELDSET" ){
if( o[n].name.substring(0,7)=='_INPUT_' && S(o[n]).css("width")>0 ) Dim.push(S.mid(o[n].name,7));
else Dim.push(o[n].name);
}
}
c = Dim.join(",");
}
if( t=='c' ){
for(n=0; n<Dim.length; n++) if( m<eGO(Dim[n]).offsetWidth ) m = eGO(Dim[n]).offsetWidth;
for(n=0; n<Dim.length; n++) eGO(Dim[n]).style.width = m+"px";
}else{
if( campo==undefined || campo=="=" ){
for(n=0; n<Dim.length; n++){
o = S("LABEL[for="+Dim[n]+"]").obj;
if( o!=null ){
if( m<o.offsetWidth ) m = o.offsetWidth;
l = S(o).css("margin-left");
if( ml<l ) ml = l;
of = S(o).toTag("fieldset");
if( of!=null && pl==0 ) pl = S(of).css("paddingLeft");
}
}
}else if( campo==campo*1 ){
m = campo;
}else if( DGI(campo)!=null ){
m = S("LABEL[for="+campo+"]").obj.offsetWidth;
}
if( Min*1!=Min ){
o = S(":"+Min).obj;
if( o!=null && o.offsetWidth>0 ){
dif = S.xy(o)["x"] - S.xy(S(":"+Dim[0]).obj)["x"];
Min = S("LABEL[for="+Dim[0]+"]").obj.offsetWidth+dif;
}
}
if( Min!="" && m<parseInt(Min) ) m = parseInt(Min);
for(n=0; n<Dim.length; n++){
o = S("LABEL[for="+Dim[n]+"]").obj;
if( o!=null ){
Min = (S(o).toTag("fieldset")==null)? m+pl : m;
S(o).css({width:Min, marginLeft:ml});
}
}
}
}
function _listColor(f,i,c,obj){
S.eventClear(window);
S.window("edes.php?E:$t/paleta.php&color='"+S.right(c,6)+"'", {title:"Seleccionar color", width:620, height:"100%", modal:true, maximize:false});
window["_FldLinkColor"] = obj;
}
function eSelectRGB(obj, l, func, cp){
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
}, cp, obj.value, obj);
}
function _SetCaption(tag){
if( top.eIsWindow(window) && S.event(window).tagName==tag ){
top.eSWSetCaption(window, S.event(window).textContent);
top.eSWFocus(window, true);
}
}
function eTipFormHide(Gen){ S.tip(); }
function eTipForm(txt, oDes){
var obj = S.event(window);
S(obj).tip(S("#"+oDes).obj.innerHTML);
}
function _ChangeOp(){
if( _ConCtrlKey || (event && event.ctrlKey) ){
if( _Mode=='a' ) S.loadJS(window, '$inserttoseek.gs&_url='+S.url(window)["http"]);
else if( 'bcm'.indexOf(_Mode)>-1 && _Action.indexOf(_Accion+':')>0 ) S.loadJS(window,'$seektocount.gs');
}else if( 'bcm'.indexOf(_Mode)>-1 ) _SubListado();
_ConCtrlKey = 0;
return eClearEvent();
}
var _OnDownload="";
function _SetDownload(){
_OnDownload = "&_DOWN=1";
setTimeout("_OnDownload=''",500);
S.eventFire(S.event(window), "click");
return S.eventClear(window);
}
function _HelpMenu(Op, i,o,p, tabla, VarUser){
if( Op!=null ) if( VarUser[0]==undefined ) VarUser = new Array(VarUser);
if( Op!='H' ) top.eInfo(window, S.lng(219), 5);
if( S.type(VarUser)=="string" ) VarUser = [VarUser];
if( /\(.*?\)/.test(VarUser[0]) ){
eval(VarUser[0]);
return;
}
VarUser[0] = S.replace(VarUser[0], ",TITLEICON","", "/","_", ",",".");
var ev = o ? S.windowObject(o).event : window.event;
switch( Op ){
case 'H':
var ayuda = S.replace(VarUser[0], "$", "\\$", "-", "\\-");
if( !S.is(".", ayuda) && S("#HELP_"+ayuda).exists() ){
top.S.info();
txt = S("#HELP_"+ayuda).html();
top.S.info(txt);
top.S(".TIP").class("+HELP");
return S.eventClear(ev);
}else{
top.gsHelp(VarUser[0], ev);
}
break;
case 'C':
var pk = VarUser[0]+'.chm';
if( top._M_!="" && null!=ev && ev.ctrlKey ){
try{
top.S.info();
S.window("edes.php?Fa:$t/help.edf&_HELP="+escape(pk), {title:"Fichero de ayuda: "+pk});
}catch(e){}
return S.eventClear(ev);
}else{
top.eCallSrv(window, 'edes.php?D:/help/doc/'+VarUser[0]+'.chm::'+VarUser[1]+'.htm' );
}
break;
case 'P':
case 'V':
var pk = VarUser[0]+((Op=='P')?'.pdf':'.mp4');
if( top._M_!="" && null!=ev && ev.ctrlKey ){
try{
top.S.info();
S.window("edes.php?Fa:$t/help.edf&_HELP="+escape(pk), {title:"Fichero de ayuda: "+pk});
}catch(e){}
return S.eventClear(ev);
}else{
top.eCallSrv(window, 'edes.php?D:/help/doc/'+pk+_OnDownload+'&FILE="AYUDA '+VarUser[0]+'"');
}
break;
}
top.eInfoHide(window);
}
function gsHelp(url, icons, eve){
var menu = [["-Ayuda"]];
if( S.is("H", icons) ) menu.push(['Ver ayuda', "g/help_htm.png", "H"]);
if( S.is("P", icons) ) menu.push(['Ayuda en formato PDF', "g/help_pdf.png", "P"]);
if( S.is("V", icons) ) menu.push(['Video tutorial', "g/help_avi.png", "V"]);
if( S.is("C", icons) ) menu.push(['Ayuda en formato CHM', "g/help_chm.png", "C"]);
S(eve.target).menu(menu, {function:_HelpMenu, trigger:eve.target, oncontextmenu:_SetDownload}, url);
}
function _InsertSelectAdd(Field,cd,nm){
var Obj = DGI('cd_'+Field+'_TABLE'),n,TR,p=Obj.rows.length;
if( Obj!=null ){
for( n=0; n<p; n++ ) if( Obj.rows[n].cells[1].textContent > nm ){
p = n;
break;
}
TR = Obj.insertRow(p);
TR.insertCell(0).textContent = cd;
TR.insertCell(1).textContent = nm;
TR.v = TR.r = "";
S(DGI('_INPUT_cd_'+Field)).eventFire("click");
}
}
function _InsertSelect(){
var i = S.event(window).sourceIndex,n;
for( n=i; i>0; i-- ) if( eIndex(i).tagName=='INPUT' && eIndex(i).name.substring(0,7)=='_INPUT_' ){
top.eSWOpen(window,'edes.php?Fa:'+eIndex(i).name.substring(10)+'&_INSERTAUX='+eIndex(i).name.substring(10));
break;
}
}
function eSubTabShow(o,ST){
var TD = S.toTag(DGI('SubTab'+ST),'TABLE').rows[0].cells, n,
Obj = S.toTag(DGI('SubTab'+ST),'TABLE',2),
TR = Obj.rows,
xFunc = S.replace(S(o).attr("Func"), "#", ST);
for(n=1; n<TD.length; n+=2){
TD[n].className = (TD[n].id=='SubTab'+ST)? 'TABMenuOn':'TABMenuOff';
}
for(n=0; n<TR.length; n++){
if( TR[n].getAttribute("SubTab") && TR[n].getAttribute("STShow")==1 ){
TR[n].style.display = (TR[n].getAttribute("SubTab")==ST)? '':'none';
}
}
if( xFunc )	eval(xFunc);
}
function _SubTabWheel(){
var Obj = S.event(window), ns;
var TD = S.toTag(Obj,'TR').cells, n;
for( n=1; n<TD.length; n+=2 ){
if( TD[n].className.indexOf('TABMenuOn')>-1 ){
ns = (n+1)/2;
break;
}
}
var ts = (Obj.parentNode.cells.length-1)/2;
if( event.wheelDelta >= 120 ){
if( --ns < 1 ) ns = ts;
}else if( event.wheelDelta <= -120 ){
if( ++ns>ts ) ns = 1;
}
S(Obj.parentNode.cells[ns*2-1]).eventFire("click");
eClearEvent();
}
function _EditConditionOk(){
var txt='',eSeek="", oTitle="",n, o,v,c,nc=nv=0, noRepet={}, error=false, saltar=false, cnd="";
for(n=1; n<4; n++){
cnd += DGI('_cnd_type_'+n).value; 
if( DGI('_cnd_type_'+n).value!="" ) nc++;
if( DGI('_cnd_value_'+n).value!="" ) nv++;
}
if( nc==0 && nv==1 ) saltar = true;
if( nc==1 && nv==0 && cnd!=">=" ) saltar = true;
if( !saltar ){
nc = 0; nv = 0;
for(n=1; n<4; n++){
c = DGI('_cnd_type_'+n);
v = DGI('_cnd_value_'+n);
if( !/^(?:<>|=|)$/.test(c.value) ){
if( noRepet[c.value] ){
top.eAlert(209, 240, 'A', 'E', v);
return;
}
noRepet[c.value] = true;
}
if( c.value!='' && v.value=='' ){
top.eAlert(209, 243, 'A', 'E', v);
return;
}
if( c.value=='' && v.value!='' ){
top.eAlert(209, 244, 'A', 'E', c);
return;
}
if( c.value!='' ) nc++;
if( v.value!='' ) nv++;
}
}
for(n=1; n<4; n++){
t = DGI('_cnd_type_'+n);
o = DGI('_cnd_value_'+n);
if( (t.value!='' && o.value!='') || (nc==0 && nv==1) || (t.value!='' && o.value=='') ){
if( o.value!="" && /^(\+|\-|\+\,|\-\,)$/i.test(o.getAttribute("TC")) ){
}else if( o.getAttribute("TC")=='F4' ){
v = eOkDate(o.value);
if( S.type(v)=="boolean" ) error = true;
}else if( o.getAttribute("TC")=='P4' ){
v = eOkPeriod(o.value);
if( S.type(v)=="boolean" ) error = true;
}
txt += t.value+o.value;
if( eSeek!="" ) eSeek += "|";
eSeek += t.value+"|"+o.value;
if( oTitle!="" ) oTitle += "\n";
oTitle += t.value+o.value;
}else if( !(t.value=='' && o.value=='') && !saltar ){
error = true;
}
if( error ){
top.eAlert(209, 241, 'A', 'E', o);
return;
}
}
o = DGI('GetCondition').Obj;
o.value = txt;
if( !saltar ){
o.setAttribute("eSeek", eSeek);
if( o.getAttribute("eSeekTitle")==null ) o.setAttribute("eSeekTitle", o.title);
o.title = oTitle;
}else o.removeAttribute("eSeek");
_EditConditionClose(false);
o.focus;
o.scrollLeft = 0;
SiguienteCampo();
}
function _EditConditionClose(){
var oCondi = DGI('GetCondition');
S(oCondi['Tapa']).nodeRemove();
oCondi.style.display = 'none';
oCondi['Obj'].focus();
}
function _EditCondition(Obj, Char){
var el, tmp, n, Valor='', Tipo='', NCondi=0, tools,
iObj = eIndex(Obj.sourceIndex+1),
txt = Obj.value,
oCondi = DGI('GetCondition');
if( oCondi==null ){
S(S.resouce("GetCondition")).nodeEnd();
oCondi = DGI('GetCondition');
}
Obj.bakValue = Obj.value;
oCondi['Obj'] = Obj;
if(	S(Obj).attr("TC")=='F4' ){
var attr = S(Obj).attr("eFrom,eTo,eWeekday");
}else if( S(Obj).attr("TC")=='P4' ){
var attr = S(Obj).attr("eFrom,eTo,eMonth");
}
for(n=1; n<4; n++){
var oNew = S(Obj).nodeCopy().obj;
oNew.id = oNew.name = '_tmp_';
var cObj = DGI('_cnd_value_'+n);
S(oNew).nodeStart(cObj.parentNode);
S(cObj).nodeRemove();
oNew.id = oNew.name = '_cnd_value_'+n;
cObj = DGI('_cnd_value_'+n);
cObj.setAttribute('CopyOf',Obj.name);
cObj.maxLength = Obj.size;
DGI('_cnd_type_'+n).value = DGI('_INPUT__cnd_type_'+n).value = cObj.value = '';
el = eIndex(cObj.sourceIndex+1);
tools = eIndex(Obj.sourceIndex+1);
if( tools.tagName=="I" && tools.textContent=="," && (S(Obj).attr("TC")=='F4' || S(Obj).attr("TC")=='P4') ){
el.style.visibility = 'visible';
S(oNew).attr(attr);
el.onclick = function anonymous(){
if( S(Obj).attr("TC")=='F4' ){
S(S.event(window).parentNode.children[0]).calendar();
}else{
S(S.event(window).parentNode.children[0]).calendarMonth();
}
}
el.oncontextmenu = function anonymous(){
if( S(Obj).attr("TC")=='F4' ){
S(S.event(window).parentNode.children[0]).calendar('t');
}else{
S(S.event(window).parentNode.children[0]).calendarMonth('t');
}
}
}else{
el.style.visibility = 'hidden';
}
}
if( txt=='' && Char!=undefined ) txt = Char;
for( n=0; n<txt.length; n++ ){
switch( txt.charAt(n) ){
case '<':
case '>':
case '=':
if( Tipo=='' || Tipo=='F' ){
Valor += txt.charAt(n);
}else if( Tipo=='V' ){
DGI('_cnd_value_'+NCondi).value = Valor;
Valor = txt.charAt(n);
}
Tipo = 'F';
break;
default:
if( Tipo=='' || Tipo=='V' ){
Valor += txt.charAt(n);
}else if( Tipo=='F' ){
NCondi++;
DGI('_cnd_type_'+NCondi).value = DGI('_INPUT__cnd_type_'+NCondi).value = Valor;
Valor = txt.charAt(n);
}
Tipo = 'V';
}
}
if( Valor!='' ){
if( Tipo=='V' ){
if( NCondi==0 ) NCondi=1;
DGI('_cnd_value_'+NCondi).value = Valor;
}else{
if( NCondi<3 ){
if( NCondi<1 ) NCondi++;
DGI('_cnd_type_'+NCondi).value = DGI('_INPUT__cnd_type_'+NCondi).value = Valor;
}
}
}
S(window).windowInside(oCondi);
S(Obj).around(oCondi, {hide:true});
oCondi['Tapa'] = S(Obj).modal();
DGI('_INPUT__cnd_type_1').focus();
}
function _CheckCondition(){
var Obj = S.event(window);
if(_Question && event.ctrlKey){
_FilterUser(Obj.name);
return S.eventClear(window);
}
if(_Question && Obj.value!='' && ('<=>').indexOf(Obj.value.charAt(0))>-1 && Obj.CopyOf==undefined){
if( DGI('GetCondition')==null ){
S(S.resouce("GetCondition")).nodeEnd();
}
setTimeout( function(){
DGI('GetCondition').setAttribute('pCursor', getCursorPos(Obj)['start']);
_EditCondition(Obj,'');
setTimeout(function(){
DGI('_cnd_value_1').focus();
setTimeout(function(){
S(DGI('_cnd_value_1')).eventFire("click");
setTimeout(function(){
putCursorPos(DGI('_cnd_value_1'), DGI('GetCondition').pCursor-DGI('_cnd_type_1').value.length);
},300);
},300);
},300);
},500);
}
}
function _MenuIco(Obj){
var i=Obj.sourceIndex, Menu=new Array('-Men�'), n=1, img,x;
if( _CARD ){
S(Obj.parentElement.children).each(function(k,o){
if( /^(?:IMG|I)$/i.test(o.tagName) && o.style.display=='none' ){
if( o.tagName=="IMG" ){
img = o.src.split('/http/');
}else{
img = [0,"=="+o.innerText];
}
x = o.title;
if( x=="" && S(o).attr("eTitle")!=null ) x = S(o).attr("eTitle");
x = (x.indexOf('PC')>-1)? x.replace('PC','_PC') : '_'+x;
Menu[n++] = '['+img[1]+'] '+x;
}
});
}else{
while( /^(?:IMG|I)$/i.test(eIndex(++i).tagName) ){
if( eIndex(i).style.display=='none' ){
if( eIndex(i).tagName=="IMG" ){
img = eIndex(i).src.split('/http/');
}else{
img = [0,"=="+eIndex(i).innerText];
}
x = eIndex(i).title;
if( x=="" && S(o).attr("eTitle")!=null ) x = S(o).attr("eTitle");
x = (x.indexOf('PC')>-1)? x.replace('PC','_PC') : '_'+x;
Menu[n++] = '['+img[1]+'] '+x;
}
}
}
top.eMenu(window, Obj, Menu, function(Op, OpTextContent, Obj, OpObj){
if( Op==null ) return;
if( _CARD ){
S(Obj.parentElement.children).each(function(k,o){
if( /^(?:IMG|I)$/i.test(o.tagName) && o.style.display=='none' ){
ejecutaIcon(o, OpObj);
}
});
}else{
var i = Obj.sourceIndex;
while(/^(?:IMG|I)$/i.test(eIndex(++i).tagName) ){
if( eIndex(i).style.display=='none' ){
ejecutaIcon(eIndex(i), OpObj);
}
}
}
});
function ejecutaIcon(o, OpObj){
if( (o.tagName=="IMG" && o.src.indexOf(OpObj.cells[0].children[0].src)>-1) || (o.tagName=="I" && o.innerText==OpObj.cells[0].children[0].innerText) ){
S(o).eventFire((o.onclick==null)?"mouseenter":"click");
}
}
}
function eSelectTreeResize(TABLA, Repetir){
var DIV = TABLA.parentNode.parentNode,
hOp = DIV.children[1].clientHeight+2;
if( hOp==2 ) hOp = -2;
if( TABLA.getAttribute('def').split("|")[13]=="1" ) return;
if( DIV.offsetWidth==0 ) DIV.style.display = 'block';
if( DIV.children[0].clientWidth > DIV.children[0].scrollWidth ){
DIV.children[0].style.width = px(TABLA.offsetWidth + (DIV.children[0].scrollWidth-DIV.children[0].offsetWidth) + 4);
}
var xy = top.eXY(DIV);
if( DIV.children[0].clientWidth < DIV.children[0].scrollWidth ){
DIV.children[0].style.width = px(TABLA.offsetWidth + (DIV.children[0].scrollWidth-DIV.children[0].offsetWidth) + 4);
}
if( DIV.children[0].clientWidth > TABLA.offsetWidth ){
DIV.children[0].style.width = px(TABLA.offsetWidth + (DIV.children[0].scrollWidth-DIV.children[0].offsetWidth) + 4);
}
if( xy[1]+TABLA.offsetHeight+hOp > _clientHeight ){
DIV.children[0].style.height = px(_clientHeight - xy[1] - hOp);
DIV.style.height = px(_clientHeight - xy[1] - 2);
}else if( DIV.clientHeight < TABLA.offsetHeight+hOp ){
DIV.children[0].style.height = px(TABLA.offsetHeight - hOp);
DIV.style.height = px(TABLA.offsetHeight + 2);
}
if( DIV.clientHeight > TABLA.offsetHeight+hOp ){
DIV.children[0].style.height = px(TABLA.offsetHeight - hOp);
DIV.style.height = px(TABLA.offsetHeight + 2);
}
if( TABLA.offsetWidth > TABLA.MaxAncho ){
TABLA.MaxAncho = TABLA.offsetWidth;
}else{
TABLA.style.width = px(TABLA.MaxAncho+4);
}
if( Repetir==undefined ){
setTimeout( function(){
eSelectTreeResize(TABLA,1);
}, 250 );
}else{
_SelectTreeParent = -1;
}
}
function eSelectTreeStatic(Nom){
var DIV = DGI(Nom+"_TABLE").parentNode.parentNode,
hOp = DIV.children[1].clientHeight+2;
DIV.children[0].style.height = px(DIV.offsetHeight - hOp);
}
var _SelectTreeParent = -1, _clientHeight;
function _SelectTree(){
function selecciona(multi){
if( _TABLA.getAttribute('SelectFunction')=='' ){
var c = _TABLA.getAttribute('SelectField');
DGI(c).value = _TR.getAttribute('n');
DGI('_INPUT_'+c).value = S.mid(_TR.cells[1].textContent,1,-1);
DGI(c).className = 'READONLY';
DGI('_INPUT_'+c).className = 'READONLY';
}else{
eval(_TABLA.getAttribute('SelectFunction'))(_TR);
}
if( _TABLA.getAttribute("Option")!="" ){
_FILAS[_TABLA.getAttribute("Option")].className = "";
}
if(!multi) _TR.className = "SelectedTree";
_TABLA.setAttribute("Option", _TR.rowIndex);
if( _TABLA.getAttribute('def').split("|")[13]=="" ){
S(DIV).none();
}
}
var el = S.event(window);
if( el.tagName=='I' ) el = el.parentNode;
if( el.tagName!='TD' ) return;
var _TR = el.parentNode,
_TABLA = _TR.parentNode.parentNode,
_FILAS = _TABLA.rows,
DIV = _TABLA.parentNode.parentNode,
tmp = _TABLA.getAttribute('def').split("|"),
func = tmp[8],
multi = (tmp[11]=="1"),
folder = (tmp[12]=="1"),
xStatic = (tmp[13]=="1");
if( func!="" ){
if( !window[func](_TR.getAttribute('n'), _TR.getAttribute("t"),	(S.trim(_TR.cells[1].children[0].textContent)=="d"), !el.cellIndex, _TR) ){
return S.eventClear();
}
}
if( el.cellIndex==0 ){
if( !folder ){
if( el.parentNode.getAttribute("t")=="O" ){
selecciona(multi);
}
return false;
}
el.textContent = (S.trim(el.textContent)!="")?"":"j";
if( xStatic ){
eSelectTreeMulti(S.mid(_TABLA.id,0,-6));
}
}else if( el.cellIndex==1 ){
if( _TR.getAttribute("t")=='O' ){
if( multi ){
el = el.parentNode.cells[0];
el.textContent = (S.trim(el.textContent)!="")?"":"j";
if( xStatic ){
eSelectTreeMulti(S.mid(_TABLA.id,0,-6));
}
return;
}
selecciona(multi);
return;
}
var Obj = el.children[0],
Estado = S.trim(Obj.textContent),
i = el.parentNode.rowIndex + 1,
oID = el.id,
tTR = _FILAS.length;
if( Estado=="d" ){
Obj.innerText = "c";
while( i < tTR && oID < _FILAS[i].cells[1].id ){
_FILAS[i++].style.display = "none";
}
}else{
var Cargar = true;
if( _FILAS.length>_TR.rowIndex+1 ){
Cargar = !(_TR.cells[1].getAttribute("id")<_FILAS[_TR.rowIndex+1].cells[1].getAttribute("id"));
}
if( Cargar ){
if( _SelectTreeParent!=-1 ) return;
Obj.innerText = "r";
_SelectTreeParent = _TR.rowIndex;
i = DIV.children[0].scrollTop;
top.eCallSrv(window, 'edes.php?ST:C='+_TABLA.getAttribute("def")+"|"+_TR.getAttribute("n"));
DIV.scrollTop = i;
return eClearEvent();
}else{
var sID = 'n'+(parseInt(oID.substring(1))+1);
Obj.innerText = "d";
while( i<tTR && oID<_FILAS[i].cells[1].id ){
if( sID==_FILAS[i].cells[1].id ){
_FILAS[i].id = "";
_FILAS[i].style.display = "";
if( _FILAS[i].getAttribute("t")!="O" ){
_FILAS[i].cells[1].firstChild.textContent = "c";
}
}
i++;
}
}
}
eSelectTreeResize(_TABLA);
}
return false;
}
function eSelectTreeDelete(Nom){
var tr = S("#"+Nom+"_TABLE").obj.rows, t=tr.length, n;
for(n=0; n<t; n++){
tr[n].cells[0].textContent = "";
}
DGI(Nom).value = "";
DGI("_INPUT_"+Nom).value = "";
DGI(Nom).className = 'READONLY';
DGI('_INPUT_'+Nom).className = 'READONLY';
var TABLA = DGI(Nom+'_TABLE');
if( TABLA.getAttribute("Option")!=""){
TABLA.rows[TABLA.getAttribute("Option")].cells[1].className = '';
}
TABLA.setAttribute("Option","");
S.TEXT['_TIP_F_'+Nom] = "";
}
function eSelectTreeView(Nom){
var TABLA = DGI(Nom+'_TABLE'),
TR = TABLA.rows,
DIV = TABLA.parentNode.parentNode,
pk = eGF(Nom),
BodyHeight = document.body.clientHeight,
BodyWidth = document.body.clientWidth,
nTop=0, n, c, img, nivel, nr;
if( TABLA.getAttribute('def').split("|")[13]=="" && DIV.parentNode.tagName!='BODY' ) document.body.appendChild(DIV);
DIV.pCursor = -1;
_clientHeight = document.body.clientHeight;
if( pk=="" ){
if(TR.length==0){
alert("No hay filas");
return;
}
}else{
for(n=0; n<TR.length; n++){
if( TR[n].getAttribute("n")!=pk ) continue;
nivel = TR[n].getAttribute("nivel")*1;
TR[n].className = "SelectedTree";
TABLA.setAttribute("Option",n);
for(c=n+1; c<TR.length; c++){
nr = TR[c].getAttribute("nivel")*1;
if( nr==nivel ){
TR[c].style.display = '';
if( TR[c].getAttribute("t")=="F" ){
TR[c].cells[1].children[0].innerText = "c";
}
}else if( nr<nivel ){
break;
}else{
TR[c].style.display = 'none';
if( TR[c].getAttribute("t")=="F" ){
TR[c].cells[1].children[0].innerText = "d";
}
}
}
for(c=n; c>=0; c--){
nr = TR[c].getAttribute("nivel")*1;
if( nr==nivel ){
TR[c].style.display = '';
if( TR[c].getAttribute("t")=="F" ){
TR[c].cells[1].children[0].innerText = "d";
}
}else if( nr<nivel ){
TR[c].style.display = '';
if( TR[c].getAttribute("t")=="F" ){
TR[c].cells[1].children[0].innerText = "d";
}
if( nr==0 ) break;
}
}
break;
}
if( n<TR.length ){
nTop = TR[n].offsetTop-TR[n].offsetHeight;
DIV.pCursor = n;
}
}
S(DIV).css({left:"0px",top:"0px",height:"",width:"",display:"block"});
eSelectTreeResize(TABLA);
if( nTop<DIV.scrollTop || nTop>DIV.scrollTop+DIV.offsetHeight ) DIV.scrollTop = nTop;
S(':_INPUT_'+Nom).around(DIV, {type:"6,12,13,14", hide:true});
DIV.focus();
}
function eSelectTreeClose(Nom){
if( _SelectTreeParent!=-1 ) return;
if( DGI(Nom).getAttribute('def').split("|")[13]=="" ){
S(DGI(Nom).parentNode.parentNode).none();
}
}
function eSelectTreeMulti(Nom){
var tr = S("#"+Nom+"_TABLE").obj.rows, t=tr.length, n, val="", txt="";
for(n=0; n<t; n++){
if( S.trim(tr[n].cells[0].textContent)!="" ){
if( val!="" ){
val += ",";
txt += "<br>";
}
val += tr[n].getAttribute('n');
txt += S.repeat("\t", S.mid(tr[n].cells[1].id,1,0)*1);
if( S.mid(tr[n].cells[1].innerText,1)=="d" ){
txt += "<b>"+S.mid(tr[n].cells[1].innerText,1,0)+"</b>";
}else{
txt += S.mid(tr[n].cells[1].innerText,1,0);
}
}
}
if( _Question ){
if( val.indexOf(",")>-1 ) val = "("+val+")";
}else if( val.indexOf(",")>-1 ){
val = ","+val+",";
if( val.length>S(":"+Nom).obj.size ){
S.error("Demasiados registros seleccionados",5);
return;
}
}
S(":_INPUT_"+Nom).attr("eInfo",txt);
S(":"+Nom).val(val);
if( val=="" ){
}else if( val[0]=="," || val[0]=="(" ){
val = "(varios)";
}else{
val = txt;
}
S(":_INPUT_"+Nom).val(val);
eSelectTreeClose(Nom+"_TABLE");
S.TEXT['_TIP_F_'+Nom] = txt;
}
function eSelectTreeFoco(){
S(":"+FocoCampo).eventFire("click");
S([":"+FocoCampo, ":_INPUT_"+FocoCampo]).class("READONLY");
}
function _SelectTreeWheel(obj, ev){
var incr = ((ev.detail<0)? -1 : (ev.wheelDelta>0)? -1 : 1),
y = obj.scrollTop;
if( event.ctrlKey ){
y += incr*obj.clientHeight;
}else{
if( y==0 ) y = 3;
y += incr*obj.children[0].rows[1].offsetHeight;
}
obj.scrollTop = y;
}
function _FilterUser(nom){
if( typeof(nom)!="string" ){
var i = S.toTag(nom,"DIV"),
nomText = i.id.replace("_DIV_FILTER_",""),
o = DGI(nomText), v;
i.style.display = "none";
S(".MODAL").nodeRemove();
eFocus(nomText);
v = S.rtrim(S.ltrim(S(":_FILTER_"+nomText).val()));
S(":_FILTER_"+nomText).obj.value = (nom.getAttribute("e-op")==1)? v : S(":_FILTER_"+nomText).attr("e-bak");
if(v!=""){
o.placeholder = "(varios datos)";
if( /^(\+|\+\,|\-|\-\,|F4|P4|CDI)$/.test(S(o).attr("tc")) ) S(o).css("font-family", "");
}else{
o.placeholder = "";
if( /^(\+|\+\,|\-|\-\,|F4|P4|CDI)$/.test(S(o).attr("tc")) ) S(o).css("font-family", "numbers");
}
S(o).val("");
return;
}
var nomText = '_FILTER_'+nom,
nomDiv = '_DIV'+nomText, i, o, xy;
if( DGI(nomDiv)==null ){
var txt = S.resouce("MultipleFilter", nomText);
i = document.createElement('div');
i.id = nomDiv;
i.className = "TOOLBAR";
i.innerHTML = txt;
i = S(i).nodeEnd(document.body).obj;
i.style.zIndex = 10;
}else{
i = DGI(nomDiv);
}
DGI(nomText).setAttribute("e-bak", DGI(nomText).value);
S(window).windowInside(i);
S(":"+nom).around(i);
DGI(nomText).focus();
S(i).modal();
}
var _CalcFrm=null, _NoRecalc=false;
function CalculoForma(Forma, x, y, SUBTAB, SUBTABFORM, TABFormType, WINCAPTION, CalColumnaUno){
S("TR[ttr='-']").none();
S("TABLE[id=HOJAzona], TABLE[id^=TABNumber]").css("width:1px;display:table;");
if(_NoRecalc){
S("TABLE[id=HOJAzona], TABLE[id^=TABNumber]").css("border:5px dashed red");
S(document.body).visibility();
}
if( _NoRecalc==4 ) return;
var calSubList, n;
if( Forma ){
for(n=0; n<2; n++){
if(typeof(_AjustaCampos)!="undefined") _AjustaCampos();
if(typeof(__EqualWidths)!="undefined") __EqualWidths();
}
}
if( _NoRecalc==3 ) return;
var MaxAncho = cCalcWidth(Forma);
if( _NoRecalc==2 ) return;
if( Forma ){
_CalcFrm = [Forma, x, y, SUBTAB, SUBTABFORM, TABFormType, WINCAPTION, CalColumnaUno];
calSubList = true;
S(".Columns").each(function(k,o){
var e = S("tr[SubTab]",o).obj;
if( e!=null ){
o.parentNode.parentNode.setAttribute("SubTab",e.getAttribute("SubTab"));
o.parentNode.parentNode.setAttribute("STShow",e.getAttribute("STShow"));
}
});
return;
}else{
if( _CalcFrm==null ){
setTimeout(function(){CalculoForma();}, 1);
return;
}
calSubList = false;
Forma = _CalcFrm[0];
x = _CalcFrm[1];
y = _CalcFrm[2];
SUBTAB = _CalcFrm[3];
SUBTABFORM = _CalcFrm[4];
TABFormType = _CalcFrm[5];
WINCAPTION = _CalcFrm[6];
CalColumnaUno = _CalcFrm[7];
}
var _CalColumnaUno=[0],
tHojas = document.forms.length,
n, sx=sy=2000, Obj;
if( document.forms["GETCONDITION"] ) tHojas--;
for(n=0; n<=tHojas; n++) _CalColumnaUno.push(0);
if(CalColumnaUno) _CalColumnaUno = CalColumnaUno.split(",");
var DimForma = new Array();
try{
var Obj, nc, MaxAlto=MaxColAncho=n=0, constWidth=2;
if( DGI('TABGroupInner')!=null ) DGI("TABGroupInner").style.height = "1px";
if( calSubList ){
S(".ISubListBODY").each(function(pk, obj){
obj.style.height = (AltoNFilas(obj.children[0],S(obj).attr("NF"))-2)+'px';
obj.scrollTop = "1px";
obj.scrollTop = "0px";
});
}
S(".ISubList").each(function(pk, obj){
var tmp = S.mid(/(\&_SIZE\=.+\&)/.exec(obj.src+"&")[0], "=",",");
S(obj).css("width:"+S.lower(tmp));
});
Obj = DGI('HOJAzona');
if( Obj!=null ){
}
try{
_RecalcAdd();
}catch(e){}
DGI('PAGINA').setAttribute("eWidth", MaxAncho);
var HayZoneHide = 0;
for(nc=1; nc<=tHojas; nc++){
HayZoneHide += _ZoneHide[nc];
if( eval('document.FRM'+nc)==undefined || eval('document.FRM'+nc).getAttribute("eType")=='Oculto' || eval('document.FRM'+nc).getAttribute("eType")=='Constante' ) continue;
Obj = DGI('TABNumber'+nc);
DimForma[n++] = new Array(Obj.offsetWidth, Obj.offsetHeight, Obj.rows[0].cells[0].offsetWidth);
if( SUBTAB>1 ){
var DimSTab = SUBTABFORM.split('|'), nSTab, j,
TabMax = -1, TabHeight = -1, SubTabView = -1;
for(j=0; j<DimSTab.length-1; j++){
nSTab = DimSTab[j].split(',');
if( nSTab[0]==nc ){
var TR,tST,pST;
TR = DGI('TABNumber'+nc).rows;
for(pST=0; pST<TR.length; pST++){
if( S(TR[pST]).attr("SubTab")!=null ){
if( TR[pST].style.display=='' ){
if( SubTabView==-1 ) SubTabView = S(TR[pST]).attr("SubTab");
}
if(!_NoRecalc) TR[pST].style.display = 'none';
}
}
for(tST=1; tST<nSTab.length; tST++){
for(pST=0; pST<TR.length; pST++){
if( S(TR[pST]).attr("SubTab")==nSTab[tST] ) TR[pST].style.display = '';
}
if( TabHeight<Obj.offsetHeight ){
TabHeight = Obj.offsetHeight;
TabMax = nSTab[tST];
}
for(pST=0; pST<TR.length; pST++){
if( !_NoRecalc && S(TR[pST]).attr("SubTab")==nSTab[tST] ) TR[pST].style.display = 'none';
}
}
for(pST=0; pST<TR.length; pST++){
if( S(TR[pST]).attr("SubTab")==TabMax ) TR[pST].style.display = '';
}
}
}
}
if( Obj.offsetHeight>MaxAlto  ) MaxAlto  = Obj.offsetHeight;
if( _CalColumnaUno[nc] ){
}else{
DimForma[n-1][2] = 9999;
}
if( SUBTAB>1 ){
var DimSTab = SUBTABFORM.split('|'), nSTab, j;
for(j=0; j<DimSTab.length-1; j++){
nSTab = DimSTab[j].split(',');
if( nSTab[0]==nc ){
var TR,tST,pST;
TR = DGI('TABNumber'+nc).rows;
for(pST=0; pST<TR.length; pST++){
if( !_NoRecalc && S(TR[pST]).attr("SubTab") ) TR[pST].style.display = (S(TR[pST]).attr("SubTab")==SubTabView) ? '' : 'none';
}
}
}
}
}
Obj = DGI('HOJAzona');
if( Obj!=null ){
MaxAlto += Obj.offsetHeight;
}
var bh = _BorderWidth(S(TABBorder).css("borderRightWidth"), TABBorder, 'H' )+_BorderWidth( S(TABBorder).css("borderLeftWidth"), TABBorder, 'H'),
bv = _BorderWidth(S(TABBorder).css("borderTopWidth"), TABBorder, 'V' )+_BorderWidth( S(TABBorder).css("borderBottomWidth"), TABBorder, 'V');
MaxAlto += (TABContainer.offsetHeight - TABBodyForm.offsetHeight + parseInt(S(TABBodyForm).css("paddingTop")) + parseInt(S(TABBodyForm).css("paddingBottom")) + bv/2);
if(TABFormType=='E' || WINCAPTION!=""){
S("#TABBodyForm").css({
height: MaxAlto - (TABContainer.offsetHeight - TABBodyForm.offsetHeight)
});
}
for(nc=1; nc<=tHojas; nc++){
if( eval('document.FRM'+nc)==undefined || eval('document.FRM'+nc).getAttribute("eType")=='Oculto' || eval('document.FRM'+nc).getAttribute("eType")=='Constante' ) continue;
Obj = DGI('TABNumber'+nc);
if( nc>1 ){
if(!_NoRecalc) Obj.style.display = 'none';
}
}
var DimAlto = [1];
for(nc=1; nc<=tHojas; nc++){
DimAlto[nc] = 1;
if( eval('document.FRM'+nc)==undefined || eval('document.FRM'+nc).getAttribute("eType")=='Oculto' || eval('document.FRM'+nc).getAttribute("eType")=='Constante' ) continue;
if(HayZoneHide){
if(!_NoRecalc) DGI("HOJAzona").style.display = (_ZoneHide[nc])?'none':'table';
}
Obj = DGI('TABNumber'+nc);
if( Obj.rows[0].cells.length==2 ){
Obj.style.display = 'table';
DimAlto[nc] = parseInt(DGI("TABBorder").offsetHeight);
if(!_NoRecalc) Obj.style.display = 'none';
}
}
var ZoneMaxHeight = 0;
for(nc=1; nc<=tHojas; nc++){
if(!_NoRecalc && HayZoneHide) DGI("HOJAzona").style.display = (_ZoneHide[nc])?'none':'table';
DGI('TABNumber'+nc).style.display = 'table';
DimAlto[nc] = parseInt(DGI("TABContainer").offsetHeight);
if(HayZoneHide){
_ZoneHideHeight[nc] = DGI('TABBodyForm').offsetHeight;
if( _ZoneHideHeight[nc]>ZoneMaxHeight ) ZoneMaxHeight = _ZoneHideHeight[nc];
}
if(!_NoRecalc) DGI('TABNumber'+nc).style.display = 'none';
}
DimAlto.sort(sortNumberAsc);  DGI("TABContainer").style.height = px(DimAlto[DimAlto.length-1]);
if( HayZoneHide && top.eIsWindow(window) ){
for(nc=1; nc<=tHojas; nc++) if( _ZoneHideHeight[nc]>0 ) _ZoneHideHeight[nc] = ZoneMaxHeight;
DGI("HOJAzona").style.display = 'table';
DGI('TABBodyForm').style.height = px(ZoneMaxHeight);
}
if( tHojas>1 ){
if( !top.eIsWindow(window) ){
MaxAlto = DimAlto[DimAlto.length-1];
if( x>0 || y>0 ){
sx = x;
sy = y;
}else if( top.eIsWindow(window) && window.name!='FichaAux' ){
sx = sy = 0;
}else{
sx = (document.body.clientWidth  - S('#TABContainer').css("marginLeft")-S("#TABContainer").css("marginRight") -MaxAncho)/2;
sy = (document.body.clientHeight - S('#TABContainer').css("marginTop") -S("#TABContainer").css("marginBottom")-MaxAlto )/2;
if( sx<0 ) sx = 0;
if( sy<0 ) sy = 0;
}
S("#TABContainer").css({
position: 'absolute',
left: sx,
top: sy,
width: MaxAncho,
height: MaxAlto
});
}
}
if( DGI('HOJAzona')!=null ) DGI('HOJAzona').style.display = 'table';
DGI('TABNumber'+_nSolapa).style.display = 'table';
}catch(e){
for(var i in e) console.log(i+': '+e[i]);
}
_SeCalculoForma++;
eTabResize();
}
function cCalcWidth(ponAnchos){
var dim=[], maxTable=0, maxCol=0, c,f,n,ancho, tTD;
S("TD[eSubListBox]").none();
S("TABLE[id=HOJAzona], TABLE[id^=TABNumber]").each(function(k,o){
var ok = false;
o.style.display = "table";
o.style.width = "1px";
for(f=1; f<o.rows.length; f++){
if( o.rows[f].cells.length>1 && !/^(TABMenuOne|TABMenuContainer)$/.test(o.rows[f].cells[0].className) ){
maxCol = Math.max(maxCol, o.rows[0].cells[0].offsetWidth);
ok = true;
break;
}
}
maxTable = Math.max(maxTable, o.offsetWidth);
dim.push([ok, o, o.rows[0].cells.length, o.offsetWidth, 0, []]);
});
S("TD[eSubListBox]").block("table-cell");
S("TR[ttr='-']").block("table-row");
for(n=0; n<dim.length; n++){
tTD = dim[n][1].rows[0].cells.length;
for(c=0; c<tTD; c++){
dim[n][5].push(dim[n][1].rows[0].cells[c].offsetWidth);
dim[n][4] += dim[n][1].rows[0].cells[c].offsetWidth;
}
dim[n][1].rows[0].cells[0].children[0].style.width = ((dim[n][1])? maxCol:dim[n][5][0])+"px";
ancho = maxCol;
if( tTD>1 ){
for(c=1; c<tTD-1; c++){
dim[n][1].rows[0].cells[c].children[0].style.width = dim[n][5][c]+"px";
ancho += dim[n][5][c];
}
c = tTD-1;
dim[n][1].rows[0].cells[c].children[0].style.width = (maxTable-ancho)+"px";
}
}
return maxTable;
}
function CalculoTAB(SUBTABFORM){
var DimSTab = SUBTABFORM.split('|'),
Obj = S("#TABBody").obj,
TR = DGI('TABNumber1').rows,
nSTab, j, TabHeight = -1, SubTabView = -1, tST, pST, n;
for(j=0; j<DimSTab.length-1; j++){
nSTab = DimSTab[j].split(',');
for(n=0; n<TR.length; n++){
if( S(TR[n]).attr("SubTab")!=null ){
if( SubTabView==-1 ) SubTabView = S(TR[n]).attr("SubTab");
TR[n].style.display = 'none';
}
}
for(tST=1; tST<nSTab.length; tST++){
for(pST=0; pST<TR.length; pST++){
if( S(TR[pST]).attr("SubTab")==nSTab[tST] ) TR[pST].style.display = '';
}
if( TabHeight < Obj.offsetHeight ){
TabHeight = Obj.offsetHeight;
}
for(pST=0; pST<TR.length; pST++){
if( S(TR[pST]).attr("SubTab")==nSTab[tST] ) TR[pST].style.display = 'none';
}
}
}
for(n=0; n<TR.length; n++){
if( S(TR[n]).attr("SubTab") ) TR[n].style.display = (S(TR[n]).attr("SubTab")==SubTabView) ? '' : 'none';
}
S("#TABBody").css("height:"+TabHeight);
}
function _eCheck(Campo, On){
if( On==undefined ) On = true;
eEF(Campo, On);
}
function _eRadio(Campo, On){
if( On==undefined ) On = true;
eEF(Campo, On);
}
function _IconSDF(x, cmp, title){
S.call("edes.php?Y:>"+x+"&TITLE='"+title+"'", null, {window:window});
}
function _LogDocList(txt){
var o = S.event(window);
if( o!=null && o.disabled ) return;
S.window("edes.php?Ll:$a/d/logdoc.edf&_FILTER="+escape(txt)+((typeof(_DB)!='undefined') ? "&_DB='"+_DB+"'":""), {title:"Hist�rico de modificaciones"});
}
function _MenuTabPie(Op, OpTextContent, Obj, OpObj){
switch( Op ){
case null: return;
case 'CL': _FrmPaste(); break;
case 'I': eOp("a"); break;
case 'V': eOp("cR"); break;
case 'U': eOp("mR"); break;
case 'D': eOp("bR"); break;
case 'v': eOp("c"); break;
case 'u': eOp("m"); break;
case 'd': eOp("b"); break;
case 'H':
if( typeof(_DBLOGINCLUDE)=="undefined" ) _DBLOGINCLUDE = "";
eLog("history", _DBLOGINCLUDE);
break;
case 'LU': eLog("user"); break;
case 'LD': eLog("user"); break;
case 'SL': _SubListado(); break;
case 'CO': _ConCtrlKey=2; _ChangeOp(); break;
case 'ES': _ConCtrlKey=2; eOkTab(); break;
case 'AA':
_TabListON = false;
eOkTab();
break;
}
}
function _ExeRecalc(){
if( arguments.length==0 ){
var obj = S("I[eFilled]");
if( obj!=null && obj.length ){
S(obj).each(function(k,o){
if( S(":"+S(o).attr("eFilled")).val()=="" ) S(o).none();
});
}
}
var n,txt="";
_OnLoadCallSrv=true;
for(n=0; n<_DimRecalc.length; n++){
if( _DimRecalc[n]!=null ){
try{
eval(_DimRecalc[n]);
}catch(e){
alert("ERROR EN: "+_DimRecalc[n]+"\n"+e);
}
_DimRecalc[n] = null;
setTimeout('_ExeRecalc(0)',1);
return;
}
}
_OnLoadCallSrv=false;
if( _Obj=='F' && _SUBTAB>1 ){
var DimSTab = _SUBTABFORM.split('|'), nSTab, j,
TabMax = -1, TabHeight = -1,
Obj = DGI('TABNumber1');
for(j=0; j<DimSTab.length-1; j++){
nSTab = DimSTab[j].split(',');
var TR,tST,pST;
TR = DGI('TABNumber1').rows;
for(pST=0; pST<TR.length; pST++){
if( TR[pST].SubTab!=undefined ) TR[pST].style.display = 'none';
}
for(tST=1; tST<nSTab.length; tST++){
for(pST=0; pST<TR.length; pST++){
if( TR[pST].SubTab==nSTab[tST] ) TR[pST].style.display = 'block';
}
if( TabHeight<Obj.offsetHeight ){
TabHeight = Obj.offsetHeight;
TabMax = nSTab[tST];
}
for(pST=0; pST<TR.length; pST++){
if( TR[pST].SubTab==nSTab[tST] ) TR[pST].style.display = 'none';
}
}
for(pST=0; pST<TR.length; pST++){
if( TR[pST].SubTab==TabMax ) TR[pST].style.display = 'block';
}
}
var DimSTab = _SUBTABFORM.split('|'), nSTab, j;
for(j=0; j<DimSTab.length-1; j++){
nSTab = DimSTab[j].split(',');
var TR,tST,pST;
tST = 1;
TR = DGI('TABNumber1').rows;
for(pST=0; pST<TR.length; pST++){
if(TR[pST].SubTab!=undefined ) TR[pST].style.display = (TR[pST].SubTab==nSTab[tST]) ? 'block' : 'none';
}
}
}
S("body",window).css({visibility:"visible"});
}
function ePhone(o){
var phone = o.previousSibling.value;
try{
if( typeof(FUNCTION_phone)=="function" ){
phone = FUNCTION_phone(phone);
if( typeof(phone)=='boolean' ) return;
}
}catch(e){}
S.phone(phone);
}
function _PhoneIcon(o){
S(o.nextSibling).class(o.value=="" ? "+OFF":"-OFF");
}
function _ViewPass(xObj){
var Obj = S.event(window), t,
o = S(":"+xObj).obj;
if( Obj.innerText=="y" ){
t = 'text';
Obj.innerText = "z";
Obj.title = 'Ocultar clave';
}else{
t = 'password';
Obj.innerText = "y";
Obj.title = 'Ver clave';
}
o.type = t;
}
function _toPublic(){
S("*[pp='1']").each(function(k,o){
if(o.onchange) o.onchange = _Public(o.onchange);
if(o.onclick) o.onclick = _Public(o.onclick);
if(o.oncontextmenu) o.oncontextmenu = _Public(o.oncontextmenu);
});
}
function _Public(fn){
return function(){
S.public(1);
var ok = fn.apply(this, arguments);
S.public();
return ok;
};
}
function _ReturnIWORK(){
if( S("#TABContainer", top.frames["IWORK2"]).length ){
top.frames["IWORK2"]._OkChange = null;
S("#TABContainer", top.frames["IWORK2"]).html("");
}
top.frames["IWORK2"].frameElement.style.display = "none";
top.frames["IWORK"].frameElement.style.display = "block";
}
