<?PHP //[_PROTECCION_]
session_start();
if( !isset($_SESSION['_User']) ) exit;
session_write_close();
if( !file_exists( '../_datos/config/aux_page.ini' ) ) SinAux();
include_once( $Dir_.$_Sql.'.inc' );
$_NFunc = 0;
$_ADDOPTION = array();
set_time_limit( 60 );
eHTML('$auxiliar.gs');
eLink('auxiliar');
echo str_repeat(' ',date('s'));
?>
<script type="text/javascript">
if( !top._Master ) document.oncontextmenu = new Function('return false');
function eClearEvent(){
try{
if( event.altKey && S.eventCode(event)==36 ) alert(S.lng(216));
S.eventClear(window);
}catch(e){}
return false;
}
document.onkeypress = document.onkeydown = document.onselectstart = eClearEvent;
var ObjLlamada;
var NombreAuxiliar;
function AuxiliarOFF(){
var el = S('TABLE');
for( var n=0; n<el.length; n++ ) if( el(n).className == 'AUXI' ) el(n).style.display = 'none';
parent.frames.AUX.window.frameElement.style.display = 'none';
}
var _OBJ = '';
var _OBJBuscar = '';
var _Event = null;
var _TFin = '';
function Buscar(){
if( _OBJ.readyState != 'complete' ){
_Event = setTimeout('Buscar()',100);
return;
}
if( _OBJBuscar>_OBJ.rows[_OBJ.rows.length-1].cells[1].textContent ){
_OBJ.nextPage();
_Event = setTimeout('Buscar()',100);
return;
}
clearTimeout(_Event);
AnchosAux();
}
function FinPagina(){
if( _OBJ.readyState != 'complete' ){
_Event = setTimeout('FinPagina()',100);
return;
}
clearTimeout(_Event);
_TFin = _OBJ.rows[_OBJ.rows.length-1].cells[1].textContent;
_OBJ.Hasta = _TFin.replace(/\'/,'');
_OBJ.firstPage();
_OBJ.Desde = '';
if( _OBJBuscar <= _TFin ) setTimeout('Buscar()',100);
AnchosAux();
}
var _TablaON = null;
var _yTH = 0;
var _gsAuxPagina = '';
function SelAuxiliar( NomTabla, NomControl ){
parent.frames.AUX.window.frameElement.style.display = 'block';
ObjLlamada = NomControl;
NombreAuxiliar = NomTabla;
_TablaON = DGI(NomTabla);
if( null != DGI('DB'+NomTabla) ){
_gsAuxPagina = NomTabla;
_OBJ = DGI(NomTabla);
if( _OBJ.Desde != '' ){
_OBJBuscar = _OBJ.Desde;
_OBJ.lastPage();
_Event = setTimeout('FinPagina()',100);
}
document.onkeydown = PaginarKey;
}else{
_gsAuxPagina = '';
document.onkeydown = null;
}
_TablaON.style.display = 'block';
_TablaON.focus();
window.scroll(0,0);
_yTH = 0;
var iObj = _TablaON.offsetParent;
while( iObj != null ){
_yTH += iObj.offsetTop;
iObj = iObj.offsetParent;
}
}
function SeleccionaLinea(){
if( !top.eReadyState(window) ) return false;
var Obj = S.event(window);
if( Obj.tagName == 'IMG' ) return true;
if( Obj.tagName == 'SPAN' ) Obj = Obj.parentNode;
if( Obj.tagName == 'TD' && Obj.id != 'OFF' ){
if( Obj.id == '0' ) return;
var p = DGI(NombreAuxiliar);
p.style.display = 'none';
var Obj = Obj.parentNode;
var txt = Obj.cells[1].textContent;
while( txt.substring(0,1) == ' ' ) txt = txt.substring( 1, txt.length );
var Dato = eval('window.frameElement.WOPENER.document.'+ObjLlamada );
Dato.children[0].value = Obj.cells[0].textContent;
Dato.children[0].textContent = txt;
}else{
var Dato = eval('window.frameElement.WOPENER.document.'+ObjLlamada );
var p = DGI( NombreAuxiliar );
p.style.display = 'none';
}
window.frameElement.WOPENER.focus();
parent.frames.AUX.window.frameElement.style.display = 'none';
Dato.focus();
return true;
}
function QuitaSelect( NomId ){
DGI(NomId).style.display = 'none';
}
function PonSelect( NomId, NomObj ){
ObjLlamada = NomObj;
var p = DGI(NomId);
p.style.display = 'block';
p.focus();
}
function CancelaAux(){
if( S.eventCode(event) == 27 ){
DGI( NombreAuxiliar ).style.display = 'none';
parent.frames.AUX.window.frameElement.style.display = 'none';
return true;
}
}
function THScroll(){
_TablaON.rows[0].style.top = ( _TablaON.offsetTop + _yTH < document.body.scrollTop ) ? document.body.scrollTop - _TablaON.offsetTop - _yTH : 0;
}
function AnchosAux(){
var a = _OBJ.rows[0].cells[1].clientWidth-2;
if( _OBJ.ancho < a ) _OBJ.ancho = a;
_OBJ.rows[0].cells[1].width = _OBJ.ancho;
_OBJ.rows[0].cells[1].style.width = _OBJ.ancho;
}
function rPag( sId ){
AnchosAux();
_OBJ.previousPage();
}
function aPag( sId ){
AnchosAux();
_OBJ.nextPage();
}
function PaginarKey(){
switch( S.eventCode(event) ){
case 36:
AnchosAux();
_OBJ.firstPage();
break;
case 33:
rPag(_gsAuxPagina);
break;
case 34:
aPag(_gsAuxPagina);
break;
case 35:
AnchosAux();
_OBJ.lastPage();
break;
case 38:
break;
case 40:
break;
default:
var Char = String.fromCharCode(S.eventCode(event)).toUpperCase();
if( 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.indexOf(Char)>-1 ){
_OBJBuscar = Char;
_OBJ.firstPage();
_Event = setTimeout('Buscar()',100);
}
}
AnchosAux();
}
</SCRIPT>
<?PHP
function gsAuxTabla( $Tabla, $Titulo, $where='', $Vacio='' ){
eLoadList( $Tabla, $Titulo, $where, $Vacio );
}
function eLoadList( $Tabla, $Titulo, $where='', $Vacio='' ){
global $_NFunc;
$_NFunc++;
if( substr($Tabla,0,3)=='cd_' ) $Tabla = substr($Tabla,3);
$Campos = 'cd_'.$Tabla.', nm_'.$Tabla;
$Orden = 'nm_'.$Tabla;
qSelect( $Tabla, $Campos, $where, $Orden );
echo "<table CLASS='AUXI' id='{$Tabla}' style='display:none' cellspacing=1px cellpadding=1px>";
echo '<COL id=o><COL>';
echo '<TR style="position:relative; top:0px">';
echo "<th><th ID=H>{$Titulo}";
if( trim(strtoupper($Vacio)) != 'NOEMPTY' ){
echo '<tr>';
echo '<td><td>&nbsp;';
}
while( $row = qRow() ){
echo '<tr>';
echo '<td>'.trim($row[0]);
echo '<td>'.trim($row[1]);
}
echo '</table>';
qFree();
}
function gsAuxPagina( $Tabla, $Titulo, $where='', $Desde='', $Vacio='' ){
eLoadPList( $Tabla, $Titulo, $where, $Desde, $Vacio );
}
function eLoadPList( $Tabla, $Titulo, $where='', $Desde='', $Vacio='' ){
global $_NFunc;
$_NFunc++;
?>
<object id="DB<?= $Tabla; ?>" classid="clsid:333C7BC4-460F-11D0-BC04-0080C7055A83">
<param Name="dataURL" Value="">
<param Name="useHeader" value="true">
<param Name="FieldDelim" Value="|">
</object>
<SCRIPT type="text/javascript">
DB<?= $Tabla; ?>.DataURL = "edes.php?T:&T=<?= $Tabla; ?>&F="+escape("<?= $where; ?>")+'&E=<?= trim(strtoupper($Vacio)); ?>';
DB<?= $Tabla; ?>.Reset();
<?PHP  if( $Desde!='' ){ ?>
<?PHP  } ?>
</SCRIPT>
<?PHP
echo "<table CLASS='AUXI' id='{$Tabla}' Desde='".str_replace("'",'',$Desde)."' Hasta='' ancho=0 datasrc='#DB{$Tabla}' DataPagesize=".$_SESSION["List"]["MaxVisibleRows"]." style='display:none' cellspacing=1px cellpadding=1px>";
echo '<COL id=o><COL>';
echo '<thead>';
echo '<TR style="position:relative; top:0px">';
echo '<th><th>';
echo '<TABLE cellspacing=0 cellpadding=0 ID=H width=100%><TR>';
echo "<th ID=H><IMG a='gsPagAnt' SRC='g/ts_pg_pr.gif' onclick='rPag(\"{$Tabla}\")' title='Página anterior'></TD>";
echo "<th ID=H width=100%>{$Titulo}</TD>";
echo "<th ID=H><IMG a='gsPagSig' SRC='g/ts_pg_nx.gif' onclick='aPag(\"{$Tabla}\")' title='Siguiente página'></TD>";
echo '</TR></TABLE>';
echo '</thead>';
echo '<Tbody>';
echo '<tr>';
echo '<td><span DataFld="CODIGO"></Span></td>';
echo '<td><span DataFld="NOMBRE"></Span></td>';
echo '</Tbody>';
echo '</table>';
}
function gsAuxTab( $Tabla, $Titulo, $where ){
eLoadTList( $Tabla, $Titulo, $where );
}
function eLoadTList( $Tabla, $Titulo, $where ){
global $_NFunc;
$_NFunc++;
if( substr($Tabla,0,3)=='cd_' ) $Tabla = substr($Tabla,3);
$Campos = 'cd_'.$Tabla.', nm_'.$Tabla.', nivel';
if( eSqlType('informix') ) $Campos = $Campos.',orden';
qSelect( $Tabla, $Campos, $where, 'orden' );
echo "<table CLASS='AUXI' id='{$Tabla}' style='display:none' cellspacing=1px cellpadding=1px>";
echo '<COL id=o>';
echo '<COL>';
echo '<TR style="position:relative; top:0px">';
echo '<th>';
echo "<th ID=H>{$Titulo}";
echo '<tr>';
echo '<td>';
echo '<td ID=V>&nbsp;';
while( $row = qRow() ){
echo '<tr>';
echo '<td>'.trim($row[0]);
echo '<td id='.trim($row[2]).'>'.trim($row[1]);
}
echo '</table>';
qFree();
}
function eAddOption( $Campo, $Contenido ){
global $_ADDOPTION;
$_ADDOPTION[ $Campo ] = $Contenido;
}
function MasSelect( $Campo, $Contenido ){
eAddOption( $Campo, $Contenido );
}
function CreaSelect( $NomCampo, $condicion, $Orden, $Vacio ){
global $_ADDOPTION;
if( substr_count($NomCampo,'{') > 0 ){
$tmp = str_replace( '{', ',', $NomCampo );
$tmp = str_replace( '}', '', $tmp );
$tmp = explode( ',', $tmp );
$Tabla = $tmp[1];
$Ordenacion = $tmp[3];
$NomCampo = $tmp[0];
$Campos = $tmp[2];
$tCampos = count($tmp);
for( $i=3; $i<$tCampos; $i++ ) $Campos .= ','.$tmp[$i];
}else if( substr_count($NomCampo,':') > 0 ){
list( $NomCampo, $nNomCampo ) = explode( ':', $NomCampo );
$tCampos = 1;
$Tabla = substr( strchr($nNomCampo,'_'), 1 );
$Campos = $nNomCampo.', nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
$NomCampo = $nNomCampo;
}else{
$tCampos = 1;
$Tabla = substr( strchr($NomCampo,'_'), 1 );
$Campos = $NomCampo.', nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
}
if( trim(strtoupper($Vacio)) != 'NOEMPTY' ) echo '<TR><TD><TD>&nbsp;';
if( !empty( $_ADDOPTION[ $NomCampo ] ) ){
$tmp = explode( ';', $_ADDOPTION[ $NomCampo ] );
for( $i=0; $i<count($tmp); $i++){
$tmp1 = explode( ',', $tmp[$i] );
echo '<TR><TD>'.trim($row[0]).'<TD>'.trim($row[1]);
}
}
if( $Orden != '' ) $Ordenacion = $Orden;
qSelect( $Tabla, $Campos, $condicion, $Ordenacion );
while( $row = qRow() ){
echo '<TR><TD>'.trim($row[0]).'<TD>'.trim($row[1]);
for( $i=2; $i<=$tCampos; $i++ ) echo $row[$i];
}
qFree();
}
function gsAuxSelect( $NomSelect, $Tabla, $Campos, $Condicion, $Orden, $Vacio='' ){
eLoadSelect( $NomSelect, $Tabla, $Campos, $Condicion, $Orden, $Vacio );
}
function eLoadSelect( $NomSelect, $Tabla, $Campos, $Condicion, $Orden, $Vacio='' ){
global $_NFunc;
$_NFunc++;
echo "<TABLE INIT=0 id='TMP_{$NomSelect}' style='display:none' onmouseover='_SelCursor(true)' onmouseout='_SelCursor(false)' cols=2>";
echo '<COL id=o><COL>';
CreaSelect( $Tabla.'{'.$Tabla.','.$Campos.'}', $Condicion, $Orden, $Vacio );
echo '</TABLE>';
}
echo '</HEAD><BODY onscroll="THScroll()" onhelp="return false">';
echo '<table id="Cargando" WIDTH="100%" HEIGHT="100%" cellspacing=0 cellpadding=0 onclick="this.style.display=\'none\'">';
echo '<tr><td id=OFF align="center" valign="middle">';
$_FileLoading = 'g/loading_d5_1.gif';
if( isset($_FileLoading) ){
if( $_FileLoading=='' ){
}else if( file_exists($_FileLoading) ){
if( substr($_FileLoading,-4)=='.swf' ){
echo '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" _height="50">';
echo "<param name='movie' value='{$_FileLoading}'>";
echo '<param name="quality" value="high">';
echo '<param name="WMode" value="transparent">';
echo "<embed type='application/x-shockwave-flash' src='{$_FileLoading}' quality='high'></embed>";
echo '</OBJECT>';
}else echo "<img src='{$_FileLoading}'>";
}else echo $_FileLoading;
}
echo '</td></tr>';
echo '</table>';
echo '<table id="BROWSE" WIDTH="100%" HEIGHT="100%" cellspacing=1px cellpadding=0>';
echo '<tr><td id=OFF align="center" valign="top" WIDTH="100%" HEIGHT="100%">';
echo '<span id="Titulo">SELECCIONA DATO AUXILIAR</span><BR>';
include( '../_datos/config/aux_page.ini' );
echo '</td></tr></table>';
if( $_NFunc == 0 ) SinAux();
?>
<script type="text/javascript">
document.onkeypress = CancelaAux;
document.onclick = SeleccionaLinea;
</SCRIPT>
</BODY></HTML>
<?PHP
eEnd();
exit;
function SinAux(){
eInit();
?>
<!DOCTYPE HTML><HTML><HEAD>
<META gsScript='AUX'>
<META NAME='Generator' CONTENT='<?= $_eDesTitle; ?>'>
</HEAD><BODY><script type="text/javascript">
function AuxiliarOFF(){
parent.frames.Pag.window.frameElement.style.display = 'block';
parent.frames.AUX.window.frameElement.style.display = 'none';
}
function SeleccionaLinea(){ return false; }
document.onclick = SeleccionaLinea;
</SCRIPT></BODY></HTML>
<?PHP
eEnd();
exit;
}
?>
