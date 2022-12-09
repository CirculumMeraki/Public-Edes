function _VisibilityFrames(w){
for( var n=0; n<w.frames.length; n++ ){
if( !(w.frames[n].frameElement.offsetWidth==0 || S(w.frames[n].frameElement).css("display")=='none' || S(w.frames[n].frameElement).css("visibility")=='hidden') ){
return true;
}
}
return false;
}
var _LastFileName = new Array(), _LastFileLength = 50, _LastFileSuffix = '';
function LastFilesMenu(){
var Obj = S.event(window);
if( Obj.tagName!='TH' ) return;
var TR = DGI("LastFiles").rows;
if( TR[1].offsetHeight == 0 ){
TR[0].cells[0].style.borderBottomWidth = "1px";
TR[1].style.display = "block";
TR[2].cells[0].style.borderBottomWidth = "0px";
TR[3].style.display = "none";
}else{
TR[0].cells[0].style.borderBottomWidth = "0px";
TR[1].style.display = "none";
TR[2].cells[0].style.borderTopWidth = TR[2].cells[0].style.borderBottomWidth = "1px";
TR[3].style.display = "block";
}
}
function LastFileView_(n){
var Obj = DGI("LastFiles");
Obj.style.width = Obj.offsetWidth;
Obj.rows[n].style.display = "none";
var xy = eXY(Obj.eIMG,Obj);
with( Obj.style ){
left = px(xy[0]);
top = px(xy[1]);
}
}
function LastFileView(){
var Obj = document.all.LastFiles;
Obj.eIMG = S.event(window);
Obj.eTitle = Obj.eIMG.title;
S.event(window).title = '';
Obj.style.display = "block";
var n = (Obj.rows[1].offsetHeight==0)?1:3;
Obj.rows[1].style.display = Obj.rows[3].style.display = "block";
setTimeout('LastFileView_('+n+')',1);
}
function LastFilesKey(){
if( S.eventCode(event)==13 || S.event(window).textContent.length>60 ) return eClearEvent();
var xy = eXY(document.all.LastFiles.eIMG,document.all.LastFiles);
document.all.LastFiles.style.left = px(xy[0]);
}
function LastFilesDown(){
var k = S.eventCode(event);
if( k==13 || k==121 || k==27 ){
if( k==27 ) S.event(window).textContent = S.event(window).Old;
S(S.event(window)).eventFire("focusout");
return eClearEvent();
}
}
function LastFilesMod( Obj ){
if( Obj.tagName!='TD' ) return;
if( Obj.cellIndex!=1 ) return;
Obj.focus();
var Old = Obj.textContent;
Obj.innerHTML = '<span eKey=1 contentEditable=true onkeyPress="LastFilesKey()" onKeyDown="LastFilesDown()" oncontextmenu="return eClearEvent()">'+Obj.textContent+'</span>';
Obj.children[0].Old = Old;
Obj.children[0].focus();
document.all.LastFiles.onmouseleave = '';
Obj.onfocusout = function anonymous(){
var Obj = S.event(window).parentNode;
Obj.innerHTML = S.event(window).textContent;
Obj.onfocusout = '';
var el = document.all.LastFiles;
el.onmouseleave = function anonymous(){ this.style.display="none"; }
el.style.display = 'none';
el.style.display = el.rows[1].children[1].style.display = el.rows[3].children[1].style.display = 'block';
var a = Math.max( el.rows[1].children[1].offsetWidth, el.rows[3].children[1].offsetWidth );
el.rows[1].children[1].style.width = el.rows[3].children[1].style.width = a;
LastFileSave();
}
}
function LastFilesOpFunc( Op, textContent, Obj ){
document.all.LastFiles.disabled = false;
switch( Op ){
case "E":
eSWOpen( window, 'edes.php?R:'+Obj.parentNode.eURL, Obj.textContent );
break;
case "M":
LastFilesMod(Obj);
break;
case "G":
if( document.all.LastFiles.rows[3].children[1].children[0].rows.length >= _LastFileLength ){
eInfoError(window,'Demasiados documentos memorizados');
}else{
eInfo(window,'Grabando...',10);
var tmp = Obj.parentNode.eURL.split('.'), dFile = '/_datos/usr/'+_User+'_'+eDate('YmdHis')+'.'+tmp[tmp.length-1];
eFilePut( Obj.parentNode.eURL.replace('{dir}',WE._DirEDes), dFile );
if( eTrim(Obj.textContent).length==16 && Obj.textContent.substr(0,4)=='Doc·' && Obj.textContent.substr(6,1)=='·' && Obj.textContent.substr(9,1)=='·' && Obj.textContent.substr(12,1)=='.' ){
LastFilesAdd( dFile, 'Doc '+eDate('Y-m-d ')+Obj.textContent.substr(4).replace(/·/g,':'), 2, 'd_'+tmp[tmp.length-1], 0 );
}else{
LastFilesAdd( dFile, eTrim(Obj.textContent), 2, 'd_'+tmp[tmp.length-1], 0 );
}
LastFileSave();
eInfoHide();
eToTag(Obj,'TABLE').deleteRow(Obj.parentNode.rowIndex);
}
break;
case "T":
break;
case "B":
if( Obj.tagName!='TR' ) Obj = Obj.parentNode;
var t = eToTag(Obj,'TABLE');
if( eToTag(Obj,'TR').rowIndex==3 ){
eCallSrv( window, 'edes.php?E:$mmhtml.gs&DELETE='+Obj.eURL );
t.deleteRow(Obj.rowIndex);
setTimeout('LastFileSave();',100);
}else{
t.deleteRow(Obj.rowIndex);
}
break;
case "C":
var Dir = top.eDirectorySelect( 'Seleccionar directorio' );
if( Dir=='' ) break;
var File = Obj.parentNode.eURL.split('/');
File = File[File.length-1];
Dir = Dir.replace(/\\/g,'/');
if( Dir.substr(Dir.length-1)!='/' ) Dir += '/';
var oFile = Obj.parentNode.eURL.replace('{dir}',WE._DirEDes);
if( oFile.substr(0,1)=='/' ){
top.eFileGet( oFile, Dir+File );
}else{
eFileCopy( oFile, Dir+File );
eInfo(window,'Copiado');
}
break;
}
eMenuHide(window);
}
function LastFilesOp(){
var cObj = eToTag( S.event(window), 'TR' );
var Obj = eToTag( S.event(window), 'TR', 2 );
var Dim = new Array();
if( Obj.rowIndex==3 && cObj.eURL.substr(cObj.eURL.length-4)=='.htm' ) Dim['E'] = '[g/l_op_exe.gif] Ejecutar en subventana';
if( Obj.rowIndex!=3 ) Dim['G'] = '[g/l_op_update.gif] Guardar documento';
Dim['M'] = '[g/l_op_update.gif] Modificar título';
if( Obj.rowIndex==3 && cObj.eURL.substr(cObj.eURL.length-4)!='.htm' ) Dim['C'] = '[g/l_op_update.gif] Copiar a...';
Dim['-'] = '';
Dim['B'] = '[g/l_op_delete.gif] Borrar';
eMenu( window, S.event(window), Dim, LastFilesOpFunc, true );
document.all.LastFiles.disabled = true;
return eClearEvent();
}
function LastFilesOnClick(){
var Obj = S.event(window);
if( Obj.tagName=='IMG' ) Obj = Obj.parentNode;
if( Obj.tagName!='TD' ) return;
var el = eToTag(Obj,'TR',2), URL = Obj.parentNode.eURL;
if( el.rowIndex==1 ){
eRun((URL.indexOf('{')==-1 && URL.indexOf(':')==-1?WE.eUD():'')+URL);
}else{
try{
var tmp = URL.split('.');
switch( tmp[tmp.length-1] ){
case 'pdf': case 'xls': case 'xlsx': case 'doc': case 'docx': case 'mdb':
var d = eDate('YmdHis');
d = d.substr(8,2)+'·'+d.substr(10,2)+'·'+d.substr(12,2);
eFileGetAsync( URL, '{dir}tmp/Doc·'+d+'.'+tmp[tmp.length-1], 1 );
break;
default:
try{
if( Pag.document.readyState!='complete' ) return eClearEvent();
}catch(e){
LimpiaPag();
setTimeout('_LastFilesOnClick("'+URL+'");',200);
return;
}
LimpiaPag();
if( URL.indexOf('.png')==-1 ){
Pag.location.href = 'edes.php?R:'+URL;
}else{
_LastFilesOnClick( URL );
}
}
}catch(e){}
}
return eClearEvent();
}
function _LastFilesOnClick( sUrl ){
Pag.document.open();
Pag.document.write('<HTML><HEAD></HEAD><BODY style="margin:0px;padding:0px;border:1px solid red" onclick="top.eInfo(window,\'La página es una Imagen\')"><IMG src="edes.php?R:'+sUrl+'" style="width:100%"></BODY></HTML>');
Pag.document.close();
}
function _LastImgDefault(){
var Obj = S.event(window);
var tmp = Obj.src.split('g/l_');
Obj.src = tmp[0]+'g/l_d_.gif';
}
function LastFilesAdd( Url, Nom, Mas, Tipo, Ocultar, oURL ){
if( Mas==undefined ) Mas = 0;
var Obj = document.all.LastFiles;
Obj.style.display = 'block';
var Altura = Obj.offsetHeight;
var TABLA = Obj.rows[1+Mas].children[1].children[0];
var TR = TABLA.insertRow(0);
var TD = TR.insertCell();
if( Tipo==undefined ){
var tmp = Nom.split('.');
Tipo = 'd_'+tmp[tmp.length-1];
}
TD.innerHTML = '<img src=g/l_'+Tipo+'.gif onerror="_LastImgDefault()">';
TD = TR.insertCell();
TD.style.whiteSpace = 'nowrap';
TD.textContent = Nom;
if( oURL==undefined ){
TR.eURL = Url;
}else{
var oPara = oURL.replace(/"/g,'\"');
TR.oURL = oPara;
if( oPara.indexOf('edes.php')>-1 ){
oPara = eSplitOne( '&', oPara );
}else{
oPara = eSplitOne( '?', oPara );
}
TR.eURL = Url+((oPara[1]==undefined) ? '' : '?'+oPara[1]);
}
if( Obj.Recalc==0 && Altura < Obj.offsetHeight ){
Obj.rows[1].children[1].style.height = Obj.rows[3].children[1].style.height = TABLA.offsetHeight;
Obj.Recalc = 1;
}
if( Ocultar==undefined || Ocultar ) Obj.style.display = 'none';
}
function LastFilesOver(){
var Obj = S.event(window);
if( Obj.tagName=='TD' ) Obj = Obj.parentNode;
if( Obj.tagName=='TR' ) Obj.cells[0].className = Obj.cells[1].className = 'Over';
}
function LastFilesOut(){
var Obj = S.event(window);
if( Obj.tagName=='TD' ) Obj = Obj.parentNode;
if( Obj.tagName=='TR' ) Obj.cells[0].className = Obj.cells[1].className = '';
}
function LastFileMem(){
var CapturarScr = false;
try{
if( Pag.location.href ){}
if( _VisibilityFrames(Pag) ) CapturarScr = true;
}catch(e){
CapturarScr = true;
}
if( CapturarScr ){
var Obj = document.all.IWORK;
var c = eXY(Obj);
WE.eCaptureScreen( c[0], c[1]+_ScreenTop, Obj.clientWidth, Obj.clientHeight, 'edes_pag' );
var Titulo = eDate('Y-m-d H:i:s');
var dFile = '/_datos/usr/'+_User+'_'+Titulo.replace(/\-/g,'').replace(/\s/g,'').replace(/\:/g,'')+'.png';
eFilePut( '{dir}tmp/edes_pag.png', dFile );
eFileDelete( '{dir}tmp/edes_pag.png', false );
eInfo(S.event(window),'Grabando imagen...',-1);
LastFilesAdd( dFile, 'Doc '+Titulo, 2, 'd_jpg' );
LastFileSave();
return;
}
if( !eReadyState(Pag) ){
}else if( document.all.LastFiles.rows[3].children[1].children[0].rows.length >= _LastFileLength ){
eInfoError(window,'Demasiados documentos memorizados');
}else{
if( (Pag.location.href+'').indexOf('R:/_datos/usr/'+_User+'_')>-1 ){
eInfoError(S.event(window),'Opción ya memorizada');
return;
}
eInfo(S.event(window),'Grabando...',10);
var Tipo = 'd_htm', Action = '',File = eDate('Y-m-d H:i:s'), Titulo = 'Doc '+File;
File = File.replace(/\-/g,'').replace(/\s/g,'').replace(/\:/g,'');
try{
if( Pag._Obj!=undefined ){
if( Pag._Obj=='L' ){
Tipo = 'op_list';
Titulo = Pag.DGI('TITULO').textContent;
Action = ''+Pag.window.location;
}else{
Titulo = Pag.DGI('TABHeader').textContent;
if( Pag._Mode=='a' ){
Tipo = 'op_insert';
}else if( Pag._Mode.length==1 ){
Tipo = 'op_seek';
}else if( Pag._Mode=='cR' ){
Tipo = 'op_view';
}else if( Pag._Mode=='mR' ){
Tipo = 'op_update';
}else if( Pag._Mode=='bR' ){
Tipo = 'op_delete';
}
if( _LastFileName[Pag._Source]!=undefined ){
var tmp = _LastFileName[Pag._Source].split('+'), sTit = '';
for( var n=0; n<tmp.length; n++ ){
tmp[n] = eTrim(tmp[n]);
if( tmp[n].substr(0,1)=='"' || tmp[n].substr(0,1)=="'" ){
sTit += tmp[n].substr(1,tmp[n].length-2);
}else{
if( n==0 && eTrim( Pag.eGF(tmp[n]) )=='' ) break;
sTit += eTrim( Pag.eGF(tmp[n]) );
}
}
if( eTrim(sTit)!='' ) Titulo = sTit;
}
}
}
LastFilesAdd( '/_datos/usr/'+_User+'_'+File+'.htm', Titulo, 2, Tipo, true, (Pag.location.href+'') );
TLF.document.write( '<!DOCTYPE HTML><HTML><HEAD>'+
'<META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">'+
'</HEAD><BODY><FORM METHOD=POST ACTION="edes.php?E:$mmhtml.gs" NAME="FRM1">'+
'<INPUT TYPE="text" NAME="ID" VALUE="'+_User+'_'+File+'">'+
'<INPUT TYPE="text" NAME="UTF" VALUE="Ñ">'+
'<INPUT TYPE="text" NAME="TITULO" VALUE="">'+
'<INPUT TYPE="text" NAME="ACTION" VALUE="">'+
'<INPUT TYPE="text" NAME="SUFIJO" VALUE="'+_LastFileSuffix+'">'+
'<INPUT TYPE="text" NAME="DELDIR" VALUE="'+_DelDirUOP+'">'+
'<INPUT TYPE="text" NAME="SubListENVIAR" VALUE="">'+
'<TEXTAREA NAME="TABLA"></TEXTAREA>'+
'<TEXTAREA NAME="HTML"></TEXTAREA></FORM></BODY></HTML>' );
TLF.document.close();
TLF.document.FRM1.HTML.value = (Pag.document.children[0].outerHTML + Pag.document.children[1].outerHTML).replace(/\\/g,'{&#92#&}');
try{
if( Pag._SaveList.length>0 && (Pag._Mode=='mR' || Pag._Mode=='a') ){
var txt='',n,Dim;
for( n=0; n<Pag._SaveList.length; n++ ){
Dim = Pag._SaveList[n].split('|');
if( Pag.DGI(Dim[0]).ENVIAR==1 ) txt += 'DGI("'+Dim[0]+'").ENVIAR=1;';
}
if( txt!='' ) TLF.document.FRM1.SubListENVIAR.value = txt;
}
}catch(e){}
TLF.document.FRM1.TABLA.value = document.all.LastFiles.rows[3].children[1].children[4].innerHTML;
if( Action!='' ) TLF.document.FRM1.ACTION.value = Action;
TLF.document.FRM1.TITULO.value = Titulo;
TLF.document.FRM1.submit();
}catch(e){}
}
return eClearEvent();
}
function LastFileSave(){
if( !eReadyState(TLF) ) setTimeout('LastFileSave()',500);
TLF.document.write( '<!DOCTYPE HTML><HTML><HEAD>'+
'<META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">'+
'</HEAD><BODY><FORM METHOD=POST ACTION="edes.php?E:$mmhtml.gs" NAME="FRM1">'+
'<INPUT TYPE="text" NAME="UTF" VALUE="Ñ">'+
'<INPUT TYPE="text" NAME="SUFIJO" VALUE="'+_LastFileSuffix+'">'+
'<INPUT TYPE="text" NAME="DELDIR" VALUE="'+_DelDirUOP+'">'+
'<TEXTAREA NAME="TABLA"></TEXTAREA>'+
'</FORM></BODY></HTML>' );
TLF.document.close();
TLF.document.FRM1.TABLA.value = DGI("LastFiles").rows[3].children[1].children[4].innerHTML;
TLF.document.FRM1.submit();
}
