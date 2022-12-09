var _TError = 0, _xError = _HtmError = _SourceError = _ErrorAlert = '';
function eErrorReporting( win, Descripcion, NomFile, NumLinea, Func ){
var EsMain = ( win.name=='Main' );
if( !EsMain ) win.onerror = null;
win._TError++;
if( EsMain ) setTimeout('window._TError=0;',5000);
if( win._TError>1 ) return false;
try{ win.eLoading(); }catch(e){}
if( win.name=='IWORK' ) top.eLoading(false,window);
var ID = ( _ErrImg ) ? new Date().getTime() : '';
var Desde = ( EsMain ) ? 'Desktop' : win.frameElement.WOPENER._Source;
var txt = 'FILE:\t\t'+NomFile.substr(NomFile.indexOf(win.location.pathname+'')+1)+'\n'+
'NAME:\t\t'+win.name+'\n'+
'FROM:\t\t'+Desde+'\n'+
'Nº LINE:\t\t'+NumLinea+'\nDESCRIPTION:\t'+Descripcion+'\nTRACE:';
var tmp,para='',i,f,arg,nom='eErrorReporting',uNom='#',eActivo='', BuscaLabel, L, n, Label;
if( _ErrorAlert!='' ){
tmp = (_ErrorAlert+'').split('{');
txt += tmp[0]+'\n';
}
_ErrorAlert = '';
if( Func!=undefined ) nom = Func;
try{
var __eLINE__ = ''; if( typeof(win.__eLINE__) != 'undefined' ) __eLINE__ = win.__eLINE__;
}catch(e){}
try{
var _ShowError = ''; if( typeof(win._ShowError) != 'undefined' ) _ShowError = win._ShowError;
}catch(e){}
try{
var _Eval = '1:'+nom, SeAbrio = false;
while( nom!='anonymous' && (f = win.eval(nom).caller+'') != 'null' && (f = win.eval(nom).caller+'') != 'undefined' && nom!=uNom && !EsMain ){
tmp = f.split('(');
if( tmp[0]=='function anonymous' ){
eActivo = '\nACTIVE ELEMENT:\n';
if( win.document.activeElement.tagName!='BODY' ) eActivo += win.document.activeElement.outerHTML.replace(/</g,'&#60;').replace(/>/g,'&#62;');
}
tmp = tmp[0].split(' ');
uNom = nom;
nom = tmp[1];
tmp = f.split(')');
if( _M_=='~' && para=='' ){
para = f;
}else{
para = tmp[0].replace('function ','')+')';
}
txt += '\t\t'+para + '\n';
if( para != 'anonymous()' ){
arg = win.eval(nom).arguments;
if( arg!=undefined ){
for(i=0; i<arg.length; i++){
if( arg[i]=='[object]' ){
txt += '\t\t\t'+ i + ' = ' + arg[i] + '\n';
txt += '\t\t\t'+ i + ' = ' + arg[i].name + '\n';
txt += '\t\t\t'+ i + ' = ' + arg[i].value + '\n';
}else{
txt += '\t\t\t'+ i + ' = ' + arg[i] + '\n';
}
}
}
}else break;
}
}catch(e){
txt += '\n'; for( i in e ) txt += ' '+i+': '+e[i]+'\n';
}
_HtmError = '';
if( _Development ){
if( (win.location.href+'').indexOf(NomFile) > -1 ){
try{
var tmp = NomFile.split(':');
if( tmp.length==1 ) tmp[1] = NomFile;
var tmp2 = tmp[1].split('&');
if( tmp2[0].indexOf('.')==-1 ) tmp2[0] += ( NomFile.indexOf('edes.php?G')==-1 ) ? '.edf':'.gdf';
_SourceError = tmp2[0];
tmp2[0] = tmp2[0].replace(/\//g,'_');
_HtmError = WE._FileGet( '/_tmp/log/'+_User+'_'+tmp2[0], "<?=_IDSRV()?>" );
}catch(e){
_HtmError = win.document.getElementsByTagName("*")[1].outerHTML+'';
}
BuscaLabel = true;
}else{
for( i=0; i<win.document.scripts.length; i++) if( NomFile.indexOf(win.document.scripts(i).src) > -1 && win.document.scripts(i).src!='' ){
_SourceError = win.document.scripts(i).src;
try{
_HtmError = WE._FileGet( _SourceError, "<?=_IDSRV()?>" );
}catch(e){
_HtmError = '';
}
if( _SourceError.indexOf('edes.php?R:')>-1 ) _SourceError = _SourceError.substr(_SourceError.indexOf('edes.php?R:')+10);
BuscaLabel = false;
break;
}
}
if( _HtmError!='' ){
var Dim = (_HtmError.replace(/</g,'&#60;').replace(/>/g,'&#62;')).split("\n");
_HtmError = '<html><head><title>eDes·Debug</title></head><body style="font-size:12px;margin:0px;cursor:default;" onload="document.body.focus();try{DGI(\"PrimeraLinea\").scrollIntoView(true);}catch(e){}top.eSWLoading(window,0);" onclick="top.eScrollIntoView(document.body,DGI(\"PrimeraLinea\"));"><pre id="#">';
for( L=0; L<Dim.length; L++ ){
if( L==NumLinea-4 ){
_HtmError += '<span id=PrimeraLinea>'+(L+1)+': '+Dim[L]+'</span><br>';
}else if( L==NumLinea-1 ){
_HtmError += '<span style="background:#ffffbf;color:blue;font-weight:bold;border:1px solid red;">'+(L+1)+': '+Dim[L].replace(/\r/g,'')+'<span style="color:red">   ERROR: ';
if( BuscaLabel ){
for( i=L; i>0; i-- ){
if( Dim[L].toUpperCase().indexOf('&#60;SCRIPT') > -1 ){
n = Dim[L].toUpperCase().indexOf('&#60;SCRIPT')+1;
Label = Dim[L].substring( Dim[L].toUpperCase().indexOf('NAME=',n)+5 );
Label = Label.substring(0,Label.indexOf('&#62;'));
if( Label.substring(0,1)=='"' || Label.substring(0,1)=="'" ) Label = Label.substring(1,Label.length-1);
_HtmError += '['+Label+'] ';
break;
}
}
}
_HtmError += eTrim(Descripcion) + '</span></span>\n';
}else{
_HtmError +=  (L+1)+': '+Dim[L]+'\n';
}
}
_HtmError += '</pre></body></html>';
}
}
var Obj = win.frameElement, Desde = win.location.href+'\n';
if( !EsMain ){
try{
while( Obj.WOPENER!=undefined ){
Obj = Obj.WOPENER;
if( Obj._Source!=undefined ) Desde += Obj.window.location.href+'\n';
if( window.name=='Main' || Obj.window.frameElement==null ) break;
Obj = Obj.window.frameElement;
}
}catch(e){}
}else __eAlert = false;
var Host = win.location.protocol+'//'+win.location.host+'/';
while( Desde.indexOf(Host)>-1 ) Desde = Desde.replace(Host,'');
txt += '\nTRACE SCRIPT:\n' + Desde + eActivo;
_xError = txt;
try{
if( (__eLINE__*1) > 0 ){
__eLINE__ = '\nVALOR __eLINE__ = '+__eLINE__;
}else __eLINE__ = '';
if( _HtmError=='' ) eAlert( S.lng(212), 'DESCRIPTION: '+Descripcion+'\nNº LINE: '+NumLinea+__eLINE__, 'A', 'E' );
}catch(e){
alert( 'ERROR\n\nDESCRIPTION: '+Descripcion+'\nNº LINE: '+NumLinea );
}
var txt = "", xRef, Obj, Campo, Valor;
for( var w=0; w<window.frames.length; w++ ){
Obj = window.frames[w];
xRef = Obj.location.href+'';
if( Obj.frameElement.NODBG==undefined && xRef!='about:blank' ){
txt += '['+((S(Obj).windowIs()) ? "eSWOpen":Obj.frameElement.id )+'] '+xRef+"\n";
if( Obj._Obj!=undefined ) txt += '_Obj = "'+Obj._Obj+'", ';
if( Obj._Mode!=undefined ) txt += '_Mode = "'+Obj._Mode+'", ';
if( Obj._Source!=undefined ) txt += '_Source = "'+Obj._Source+'", ';
if( Obj._PSOURCE!=undefined ) txt += '_PSOURCE = "'+Obj._PSOURCE+'"';
txt += '\n';
for( var f=0; f<Obj.document.forms.length; f++ ){
var p = Obj.document.forms[f].elements;
for( var n=0; n<p.length; n++ ){
if( p[n].name=='PHPSESSID' || p[n].name=='_MD5' || p[n].name=='' ) continue;
if( p[n].tagName=='FIELDSET' ) continue;
if( p[n].type=='button' ) continue;
Campo = '\t'+p[n].name+' = ';
Valor = p[n].value;
if( Valor!='' ) txt += Campo + Valor +'\n';
}
}
txt += '\n';
}
}
_xError += '\nSTATUS PC:\n'+txt;
try{
if( typeof(win._ErrForm) != 'undefined' ) win._ErrForm = -10;
}catch(e){}
win.onerror = ( EsMain ) ? eErrorReportingMAIN : win.eErrorReporting;
setTimeout('_SaveError("'+ID+'")',100);
return false;
}
function _SaveSCRError( ID ){
try{
eCaptureWin(ID);
eFilePut( '{dir}tmp/'+ID+'.png', '/_tmp/err/'+ID+'.png' );
eFileDelete( '{dir}tmp/'+ID+'.png', false );
if( eFileExists( '{dir}tmp/edes_before.png' ) ){
eFilePut( '{dir}tmp/edes_before.png', '/_tmp/err/'+ID+'_before.png' );
eFileDelete( '{dir}tmp/edes_before.png', false );
}
}catch(e){
ID = '';
}
return ID;
}
function _SaveError( ID ){
if( _ErrImg ) ID = _SaveSCRError( ID );
try{
ERROR.document.write( '<HTML><HEAD></HEAD><BODY><FORM METHOD=POST ACTION="edes.php?E:$error.gs" NAME="FRM1">'+
'<INPUT TYPE="text" NAME="ID", VALUE="'+ID+'">'+
'<TEXTAREA NAME="ERROR">'+_xError+'</TEXTAREA></FORM></BODY></HTML>'
);
ERROR.document.close();
ERROR.document.FRM1.submit();
}catch(e){}
if( _HtmError!='' ) setTimeout('__SaveError()',1000);
}
function __SaveError(){
var ErrWin = eSWOpen(window,'about:blank','SOURCE ERROR: '+_SourceError,true,0,0,0,0,0,0,'df');
_xError = _xError.replace( 'TRACE:', '<hr>TRACE:' );
_xError = _xError.replace( 'TRACE SCRIPT:', '<hr>TRACE SCRIPT:' );
_xError = _xError.replace( 'STATUS PC:', '<hr>STATUS PC:' );
_HtmError = _HtmError.replace( '<pre id="#">', '<pre>'+_xError+'<hr>' );
ErrWin.document.write(_HtmError);
ErrWin.document.close();
eSWView(ErrWin);
_HtmError = '';
_xError = '';
}
function eErrorReportingMAIN( Description, File, Linea ){
return eErrorReporting( window, Description, File, Linea );
}
window.onerror = eErrorReportingMAIN;
function _GetAllHref2( win, nTab ){
var txt = '', sId, sName, sHRef;
for( var i=0; i<win.frames.length; i++ ){
try{
sId = win.frames[i].frameElement.id;
sName = win.frames[i].frameElement.name;
sHRef = win.frames[i].location.href+'';
if( win.frames[i].frameElement.IFrameSys!=undefined ) continue;
if( sHRef=='about:blank' ) continue;
txt += nTab;
if( sId!='' ){
txt += sId;
}else{
txt += sName;
}
if( sHRef.indexOf('edes.php?')>-1 ){
sHRef = sHRef.split('edes.php?');
sHRef = 'edes.php?'+sHRef[1];
}
txt += ' ~ '+sHRef+'<br><br>';
if( win.frames[i].length > 0 ){
txt += _GetAllHref2( win.frames[i].window, nTab+'···' );
}
}catch(e){
txt += nTab + '# ERROR al acceder al IFrame #<br><br>';
}
}
return txt.substr(0,txt.length-8);
}
function _GetAllHref(){
return eTrim(_GetAllHref2(window,''));
}
