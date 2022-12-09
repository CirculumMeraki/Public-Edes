var WE = top;
var _CEDDim = new Array();
var _CEDChk = null;
var _CEDFileLocal = _CEDFileServer = '';
var __UD = WE.eUD();
function CEDCheckFile( NomFile ){
NomFile = '{dir}tmp/'+NomFile;
if( _CEDDim[NomFile]!=undefined && _CEDDim[NomFile][1]!=WE.eFileWriteTime(_CEDDim[NomFile][0]) ){
_CEDDim[NomFile][1] = WE.eFileWriteTime(_CEDDim[NomFile][0]);
WE.eFilePutFree( _CEDDim[NomFile][0], _CEDDim[NomFile][2] );
}
}
function CEDOnLoad(){
_CEDDim[_CEDFileLocal] = new Array( _CEDFileLocal, WE.eFileWriteTime(_CEDFileLocal), _CEDFileServer );
eFileView( _CEDFileLocal );
}
function eDocUpdate( Ori, NomFile, FuncUser, Win, ConInfo ){
if( FuncUser==undefined ) FuncUser = 'CEDOnLoad';
if( NomFile==undefined ) NomFile = Ori;
if( Win==undefined ) Win = window;
if( ConInfo==undefined ) ConInfo = true;
if( ConInfo ) top.eAlert('',eLng(143),'-','I');
var tmp = NomFile.split('/');
var FileLocal = '{dir}tmp/'+tmp[tmp.length-1];
_CEDFileLocal = FileLocal;
_CEDFileServer = Ori;
if( eFileExists( FileLocal ) ){
if( !eFileDelete( FileLocal, false ) ){
eAlertHide();
eAlert( S.lng(209), eLng(144,tmp[tmp.length-1]), 'A', 'W' );
return;
}
}
WE.eFileGet( Ori, FileLocal );
if( FuncUser=='CEDOnLoad' ){
CEDOnLoad();
}else if( FuncUser!='' ){
if( FuncUser.indexOf('(') > 0 ){
Win.eval( FuncUser );
}else{
eval(FuncUser)();
}
}
top.eAlertHide();
}
function eDocDownloadRun(Ori,FileLocal,Des){
eInfo(window,'Descargando Documento...',-1);
WE.eFileGet(Ori,FileLocal);
eRun(FileLocal);
Des.NewValue = FileLocal.replace(/\//g,'\\');
Des.eUpload = 1;
eInfo(window,'Documento descargado',1);
}
function eDocDownload_(Op,Dim,Datos){
if( Op==null || Op!=2 ) return;
if( !eFileDelete( Datos[1], false ) ){
eAlert( S.lng(209), eLng(144,Datos[1]), 'A', 'W' );
return;
}
eDocDownloadRun(Datos[0],Datos[1],Datos[2]);
}
function eDocDownload( win, Ori ){
var Dir='',n, Des;
n = win.S.event(window).sourceIndex-1;
while( win.document.children[n].tagName!='INPUT' ) n--;
Des = win.document.children[n];
if( Des.className=='READONLY' ){
eInfo(window,'Acción no permitida');
return;
}
if( win.DGI('_working_directory')!=null ){
Dir = win.eGF('_working_directory');
if( Dir=='' ){
eInfoError(window,'Falta definir la carpeta destino');
return;
}
}else{
if( eFileExists(WE._DirEDes+'docpath.put') ){
var Dir = WE.eFileReadAll(WE._DirEDes+'docpath.put');
if( !eDirectoryExists(Dir) ){
eInfoError(window,'Falta definir la carpeta destino');
return;
}
}
}
var FileLocal = Dir+'/'+Des.value;
if( eFileExists(FileLocal) ){
eInfoHide();
eAlert( "EL FICHERO YA EXISTE", "¿Desea borrarlo?", "accept,cancel", "W", eDocDownload_, null, Array(Ori,FileLocal,Des) );
}else{
eDocDownloadRun(Ori,FileLocal,Des);
}
}
function eMSExcel( NomFile, Imprimir, DimReplaze, Grabar, FuncUser, VerDoc ){
try{
var EXCEL = new ActiveXObject("Excel.Application");
}catch(e){
eAlert( S.lng(209), 'Excel no instalado', 'A', 'W' );
return;
}
EXCEL.Visible = false;
try{
NomFile = WE._DirEDes + NomFile;
var workbook = EXCEL.Workbooks.Open( NomFile );
}catch(e){
eAlert( S.lng(209), 'Documento no econtrado', 'A', 'W' );
return;
}
EXCEL.DisplayAlerts = false;
if( FuncUser!=undefined ) eval(FuncUser)( EXCEL, workbook );
if( VerDoc==undefined ) VerDoc = false;
if( DimReplaze!=undefined ){
var worksheet = EXCEL.Application.Workbooks(1).Sheets(1);
var cell = EXCEL.Range('A:'+'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substr(workbook.ActiveSheet.UsedRange.Columns.Count,1) );
cell.Select();
for( n=0; n<DimReplaze.length; n++ ){
try{
worksheet.Application.Selection.Replace( DimReplaze[n][0], DimReplaze[n][1] );
}catch(e){}
}
cell = EXCEL.Range("A1"); cell.Select();
if( Grabar!=undefined && Grabar ) workbook.Save();
}
EXCEL.DisplayAlerts = true;
if( VerDoc ){
EXCEL.Visible = true;
workbook = null;
EXCEL = null;
return;
}
try{
if( Imprimir ){
workbook.PrintOut();
}
if( Grabar!=undefined && Grabar ){
EXCEL.DisplayAlerts = false;
EXCEL.ActiveWorkbook.SaveAs(NomFile);
EXCEL.DisplayAlerts = true;
workbook.Application.Quit();
}else{
workbook.Close(false);
workbook = null;
EXCEL.Quit();
EXCEL = null;
}
}catch(e){
EXCEL.Visible = true;
eAlert( S.lng(209), eLng(3), 'A', 'W' );
}
workbook = null;
EXCEL = null;
}
function eMSWord( NomFile, Imprimir, DimReplaze, Grabar, FuncUser, VerDoc ){
try{
var WORD = new ActiveXObject('Word.Application');
}catch(e){
eAlert( S.lng(209), 'Word no instalado', 'A', 'W' );
return;
}
WORD.Visible = false;
while( NomFile.indexOf('/')>-1 ) NomFile = NomFile.replace('/','\\');
try{
if( NomFile.indexOf('\\')==-1 ) NomFile = WE._DirEDes + NomFile;
var Doc = WORD.Documents.Open( NomFile );
}catch(e){
eAlert( S.lng(209), 'Documento no econtrado', 'A', 'W' );
return;
}
if( FuncUser!=undefined ) eval(FuncUser)( WORD );
if( VerDoc==undefined ) VerDoc = false;
if( DimReplaze!=undefined ){
for( var n=0; n<DimReplaze.length; n++ ){
WORD.Selection.WholeStory();
while( WORD.Selection.Find.Execute( DimReplaze[n][0] ) ){
WORD.Selection.Text = DimReplaze[n][1];
WORD.Selection.MoveRight(1);
}
}
WORD.Selection.WholeStory();
WORD.Selection.HomeKey();
var sec = WORD.Documents(1).Sections(1);
for( var n=0; n<DimReplaze.length; n++ ){
while( sec.Headers(1).Range.Text.indexOf(DimReplaze[n][0]) > -1 ) sec.Headers(1).Range.Text = sec.Headers(1).Range.Text.replace( DimReplaze[n][0], DimReplaze[n][1] );
while( sec.Footers(1).Range.Text.indexOf(DimReplaze[n][0]) > -1 ) sec.Footers(1).Range.Text = sec.Footers(1).Range.Text.replace( DimReplaze[n][0], DimReplaze[n][1] );
}
var sh = Doc.Shapes;
for( var s=1; s<=sh.Count; s++ ){
try{
var sh_1 = sh.getElementsByTagName("*")[s];
for( var n=0; n<DimReplaze.length; n++ ){
sh_1.Select();
sh_1.TextFrame.TextRange.Text = sh_1.TextFrame.TextRange.Text.replace( DimReplaze[n][0], DimReplaze[n][1] );
}
}catch(e){}
}
Doc.Words(1).Select();
WORD.Selection.WholeStory();
WORD.Selection.MoveLeft(1);
if( Grabar!=undefined && Grabar ) WORD.ActiveDocument.Save();
}
if( VerDoc ){
WORD.Visible = true;
WORD = null;
return;
}
try{
if( Imprimir ){
WORD.Options.PrintBackground = false;
WORD.ActiveDocument.PrintOut( false );
}
WORD.Application.Quit(false);
}catch(e){
WORD.Visible = true;
eAlert( S.lng(209), eLng(3), 'A', 'W' );
}
WORD = null;
}
function _eMSDocPrint( FilePC ){
FilePC = FilePC.split('/');
FilePC = WE._DirEDes + FilePC[FilePC.length-1];
if( eFileExists( FilePC ) ){
if( FilePC.substr(FilePC.length-4).toUpperCase()=='.DOC' || FilePC.substr(FilePC.length-5).toUpperCase()=='.DOCX' ){
WE.eWord('OPEN|'+FilePC);
WE.eWord('PRINT');
WE.eWord('EXIT');
}
if( FilePC.substr(FilePC.length-4).toUpperCase()=='.XLS' || FilePC.substr(FilePC.length-5).toUpperCase()=='.XLSX' ){
WE.eExcel('OPEN|'+FilePC);
WE.eExcel('PRINT');
WE.eExcel('EXIT');
}
}else{
}
}
function eFilePrint( FilePC, Srv, Msg ){
if( Srv!=undefined ){
var tmp = FilePC.split('/');
var FileLocal = '{dir}tmp/'+tmp[tmp.length-1];
eFileGet( FilePC, FileLocal );
FilePC = FileLocal;
}
if( eFileExists( FilePC ) ){
var Ext = FilePC.toUpperCase().split('.');
switch( Ext[Ext.length-1] ){
case 'DOC': case 'DOCX':
WE.eWord('OPEN|'+FilePC);
WE.eWord('PRINT');
WE.eWord('EXIT');
break;
case 'XLS': case 'XLSX':
WE.eExcel('OPEN|'+FilePC);
WE.eExcel('PRINT');
WE.eExcel('EXIT');
break;
default:
top.eRun( "print", FilePC.replace('{dir}',WE._DirEDes) );
}
}
}
function eMSDocPrint( FilePC, FileSRV ){
if( FilePC.substr(0,1)=='/' && FileSRV==undefined ){
FileSRV = FilePC;
var tmp = FilePC.split('/');
FilePC = '{dir}tmp/'+tmp[tmp.length-1];
eDocUpdate( FileSRV, FilePC, 'eFilePrint("'+FilePC+'")', window );
}else{
var oFilePC = FilePC;
while( FilePC.indexOf('/')>-1 ) FilePC = FilePC.replace('/','\\');
if( FilePC.indexOf('\\')==-1 ) FilePC = WE._DirEDes + FilePC;
if( eFileExists( FilePC ) ){
_eMSDocPrint2( FilePC );
}else{
if( FileSRV==undefined ) FileSRV = oFilePC;
if( FilePC.indexOf('{dir}')==-1 ){
var tmp = FilePC.split('\\');
alert( tmp.length );
alert( tmp[tmp.length-1] );
oFilePC = '{dir}tmp/'+tmp[tmp.length-1];
}
eDocUpdate( FileSRV, oFilePC, '_eMSDocPrint("'+oFilePC+'")', window );
}
}
}
