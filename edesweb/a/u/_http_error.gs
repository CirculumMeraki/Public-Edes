<?PHP
eLngLoad('../../edesweb/lng/_http.gs.lng');
if( !isset($_SESSION['_User']) ) exit;
if( $_gsID != getmypid() ) exit;
$_DirG = 'g/e'; //include_once( $Dir_.'t/lp.gs' );
$_IniSg = microtime();
if( isset( $_HttpConfigLoad ) ){
return _HttpLoad();
}
if( isset($_POST['Desarrollo']) ){
HTTPSave( $_POST['Desarrollo'] );
}else{
HTTPEditar();
}
function LeerHTTP(){
$_Fichero = eScript('/_d_/cfg/http_error.ini');
$df = fopen( $_Fichero, 'r' );
if( !$df ){
eHTML();
?>
</HEAD><BODY onhelp='return false;' oncontextmenu='return false;'><SCRIPT type="text/javascript">
top.eInfoError( window, '<?= eLng('ERROR: No se ha podido leer el fichero') ?>' );
</SCRIPT></BODY></HTML>
<?PHP
eEnd();
}
$cTxt = fread( $df, filesize($_Fichero) );
fclose( $df );
if( substr($cTxt,0,9)=='[Titulo]'."\t" ) return($cTxt);
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+1,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+2+$n,1));
$Basura += $LongDeLong + 2;
$txt = substr( $cTxt, $Basura, $LenCadena );
$txt = gzuncompress($txt);
return $txt;
}
function _HttpLoad(){
$txt = LeerHTTP();
list(,$txt) = explode('[Data]',$txt);
$txt = trim($txt);
$DimFila = explode("\n",$txt);
return( explode("\t",trim($DimFila[1])) );
}
function HTTPEditar(){
$txt = LeerHTTP();
list(,$txt) = explode('[Data]',$txt);
$txt = trim($txt);
$DimFila = explode("\n",$txt);
for( $f=1; $f<count($DimFila); $f++ ){
$tmp = explode("\t",$DimFila[$f]);
}
$gsEdition = ( ( $_SESSION['_D_']=='~' ) ? ' onload="top.eITools(window);"':'');
?>
<html><head><title>e-Des · Usuarios</title>
<?=_FileNoCache('edes.js')?>
<style>
#I { TEXT-ALIGN: left; }
#C { TEXT-ALIGN: center; }
#D { TEXT-ALIGN: right; }
#H { display: none; }
body {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
FONT-SIZE: 13px;
MARGIN: 10px;
BORDER: 0px;
CURSOR: default;
}
TABLE {
BACKGROUND: #3f474c;
FONT-SIZE: 13px;
}
TABLE TH {
FILTER: progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr=#f2f2f2, endColorstr=#789aab);
COLOR: #001087;
cursor: default;
TEXT-TRANSFORM: uppercase;
}
TABLE TD {
background: #fffbf0;
cursor: pointer;
WHITE-SPACE: nowrap;
}
.SUBMENU {
position: absolute;
display: none;
background: #3f474c;
}
.SUBMENU TD {
background: #FFFFCC;
padding: 0px 5px 0px 5px;
}
.Boton {
BORDER: #789aab 1px outset;
FONT-WEIGHT: bold;
FILTER: progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr=#f2f2f2, endColorstr=#789aab);
COLOR: #ffffff;
cursor: pointer;
}
.Boton TABLE, .Boton TD {
background: transparent;
color: #ffffff;
FONT-WEIGHT: bold;
}
</style>
</HEAD><BODY<?= $gsEdition; ?> onhelp='top.eHelp("$dv_http_error")' oncontextmenu='return false;' onselectstart='return false;'>
<SCRIPT type="text/javascript">
var _FCH_ = '$a/u/_http_error.gs';
if( window.name == 'IWORK' ){
document.write('<CENTER><B><?= eLng('CONFIGURACION HTTP-TASK') ?></B></CENTER>');
top.eLoading(false,window);
}
function Grabar(){
_Baja = false;
var Obj = document.all.DATOS.rows;
var txt = '';
for( var f=0; f<Obj.length; f++ ){
if( f > 0 ) txt += '\n';
var UnUsu = '';
for( var c=0; c<Obj[0].cells.length; c++ ){
txt += Obj[f].cells[c].textContent.replace('<BR>','·').replace('\n','·') + '\t';
if( Obj[f].cells[c].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'') == '' ){
top.eInfoError( window, '<?= eLng('ERROR Todas las columnas son obligatorias') ?>' );
return;
}
}
}
var sHTM = "<?=eHTML('','','',true)?></HEAD><BODY>"+
'<FORM METHOD=POST ACTION="edes.php?E:$a/u/_http_error.gs">';
sHTM += '<INPUT TYPE="HIDDEN" NAME="Desarrollo" VALUE="'+txt+'">';
sHTM += '</FORM></BODY></HTML>';
top.TLF.document.write( sHTM );
top.TLF.document.close();
top.TLF.document.forms[0].submit();
}
function Alta(){
_Baja = false;
var Obj = document.all.DATOS;
var TR = Obj.insertRow(Obj.rows.length);
for( var c=0; c<Obj.rows[0].cells.length; c++ ){
TR.insertCell(c).textContent=' ';
}
}
var _Baja = false;
function Baja(){
_Baja = true;
}
function xy( el ){
var xy = new Array(0,0);
while( el != null ){
xy[0] += el.offsetLeft;
xy[1] += el.offsetTop;
el = el.offsetParent;
}
return xy;
}
var _Obj = null;
function SubMenu(){
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return;
if( _Baja ){
var TR = Obj.parentNode;
document.all.DATOS.deleteRow(TR.rowIndex);
_Baja = false;
return;
}
_Baja = false;
var TH = Obj.parentNode.parentNode.parentNode.rows[0].cells[Obj.cellIndex];
_Obj = Obj
var NomSMenu = 'SM'+TH.T;
EditTd();
return false;
}
</SCRIPT>
<SCRIPT type="text/javascript">
function eClearEvent(men){
try{
S.eventClear(window);
}catch(e){}
return false;
}
function EditTdExit(){
var Obj = S.event(window);
Obj = Obj.parentNode;
var txt = Obj.textContent.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+\s+/g,' ');
document.body.focus();
setTimeout(function(){
Obj.innerHTML = txt;
},1);
return eClearEvent();
}
function EditTdKey(){
var iCode = S.eventCode(event);
event.returnValue = true;
if( iCode == 13 ){
EditTdExit();
return eClearEvent();
}else if( iCode == 27 ){
var Obj = S.event(window);
Obj = Obj.parentNode;
Obj.innerHTML = Obj.vOld;
return eClearEvent();
}
return true;
}
function EditTd(){
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return false;
Obj.vOld = Obj.textContent;
var oInput = document.createElement('DIV');
oInput.onkeydown = EditTdKey;
oInput.textContent = Obj.textContent;
oInput.onblur = EditTdExit;
Obj.textContent = '';
Obj.appendChild(oInput);
oInput.contentEditable = true;
oInput.focus();
return false;
}
</SCRIPT>
<CENTER><BR>
<?PHP
$_DimCol  = explode( ',', 'HTTP/S,'.eLng('CODIGO').','.eLng('DESCRIPCION').','.eLng('APLICACION') );
$TEdicion = explode( ',', 'TL	 , TL	 , TL		  , TL        ' );
$TAlign   = explode( ',', 'I	 , I	 , I		  , I         ' );
$DimTE = array();
$DimAlign = array();
for( $c=0; $c<count($_DimCol); $c++ ){
$_DimCol[$c] = trim($_DimCol[$c]);
$DimTE[$_DimCol[$c]] = $TEdicion[$c];
$DimAlign[$_DimCol[$c]] = $TAlign[$c];
}
$ColEdit = array();
echo '<TABLE id=DATOS onclick="SubMenu()">';
$tmp = explode("\t",$DimFila[0]);
$TotalCol = count($tmp);
for( $c=0; $c<count($_DimCol); $c++ ){
echo '<COL id='.$THAlign[$c].'>';
}
echo '<TR>';
for( $c=0; $c<count($_DimCol); $c++ ){
echo '<TH T='.$DimTE[$tmp[$c]].' id=C>'.str_replace('·','<BR>',$_DimCol[$c]);
}
for( $f=1; $f<count($DimFila); $f++ ){
$tmp = explode("\t",$DimFila[$f]);
echo '<TR>';
for( $c=0; $c<count($_DimCol); $c++ ){
echo '<TD>'.$tmp[$c];
}
}
echo '</TABLE><BR>';
?>
<button onclick=Alta()   class=Boton><table border=0 cellspacing=0 cellpadding=0><tr><td><img src=g/op_insert.gif><td>&nbsp;<?= eLng('Alta') ?></table></button>&nbsp;
<button onclick=Baja()   class=Boton><table border=0 cellspacing=0 cellpadding=0><tr><td><img src=g/op_delete.gif><td>&nbsp;<?= eLng('Borrar') ?></table></button>&nbsp;&nbsp;&nbsp;
<button onclick=Grabar() class=Boton><table border=0 cellspacing=0 cellpadding=0><tr><td><img src=g/op_update.gif><td>&nbsp;<?= eLng('Grabar') ?></table></button>
<?PHP
echo '</CENTER>';
?>
<SCRIPT type="text/javascript">
top.eBodyBackground( window );
if( top.eIsWindow(window) ) top.eSWIResize( window, -1 );
</SCRIPT>
<?PHP
echo '<br><bt><center>';
echo eLng('Código de actualización').': <b onclick=window.clipboardData.setData("Text","'._IDSRV().'") style="cursor:pointer">'._IDSRV().'</b>';
echo '</center>';
echo '</BODY></HTML>';
eEnd();
}
function HTTPSave( $NewUSU ){
$Ini = LeerHTTP();
list($Ini) = explode('[Data]',$Ini);
$Doc = $Ini."[Data]\n".$NewUSU;
$Fichero = eScript('/_d_/cfg/http_error.ini');
$pnt = fopen( $Fichero, 'w' );
if( !$pnt ){
eHTML();
?>
</HEAD><BODY onhelp='return false;' oncontextmenu='return false;'><SCRIPT type="text/javascript">
top.eInfoError( window, '<?= eLng('ERROR: No se ha podido abrir el fichero') ?>' );
</SCRIPT></BODY></HTML>
<?PHP
eEnd();
}
$Basura = rand(50,250);
$Buffer = chr($Basura);
srand((double)microtime()*1000000);
for( $n=0; $n<$Basura; $n++ ) $Buffer .= chr(rand(0,255));
$txt = $Doc;
$txt = gzcompress($txt);
$lf = strlen($txt);
$llf = strlen($lf);
$Buffer .= chr($llf);
for( $n=0; $n<$llf; $n++ ) $Buffer .= chr(substr($lf,$n,1));
$Buffer .= $txt;
$Basura = rand(50,250);
srand((double)microtime()*1000000);
for( $n=0; $n<$Basura; $n++ ) $Buffer .= chr(rand(0,255));
fputs( $pnt, $Buffer );
fclose( $pnt );
eHTML();
?>
</HEAD><BODY onhelp='return false;' oncontextmenu='return false;'><SCRIPT type="text/javascript">
top.eInfo( window, top.eLng(27) );
</SCRIPT></BODY></HTML>
<?PHP
eEnd();
}
?>
