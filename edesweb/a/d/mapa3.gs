<?PHP
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() ) exit;
eLngLoad();
eInclude($_Sql);
eHTML('$mapa3.gs','','Mapa de Opciones').'</HEAD>';
if( isset($STATUS) ){
if( eSqlType('pdo.informix') ){
$Hoy = date('d-m-Y');
}else{
$Hoy = date('Y-m-d');
}
if( $ID > 0 ){
qQuery( "update {$_SESSION['ShareDictionary']}gs_op set status='{$STATUS}', cd_gs_user='{$_User}', dt_status='{$Hoy}' where id='{$ID}'" );
$zp = gzopen( "../_d_/log/opstatus.{$_User}", "w9" );
gzwrite( $zp, date('Y-m-d H:i:s').'|T|'.$ID.'|'.$STATUS."\n" );
gzclose($zp);
?>
<script type="text/javascript">
S("body").tip(top.eLng(27),1);
</script>
<?PHP
}
eEnd();
}else if( isset($USUARIO) ){
if( eSqlType('pdo.informix') ){
$Hoy = date('d-m-Y');
}else{
$Hoy = date('Y-m-d');
}
if( $USUARIO=='' ) $Hoy = '';
if( $ID > 0 ){
qQuery( "update {$_SESSION['ShareDictionary']}gs_op set cd_gs_user='{$USUARIO}', dt_status='{$Hoy}' where id='{$ID}'" );
?>
<script type="text/javascript">
S("body").tip(top.eLng(27),1);
</script>
<?PHP
}
eEnd();
}
if( !isset($TIPO) ) $TIPO = 0;
if( qCount("{$_SESSION['ShareDictionary']}gs_op", '')==0 ){
eInclude('message');
eMessage( eLng("No hay ninguna opción generada"), 'HSE' );
}
if( eSqlType('pdo.informix') ){
$HaceUnMes = date( 'd-m-Y', mktime( 0,0,0, date('m')-1, date('d'), date('Y') ));
}else{
$HaceUnMes = date( 'Y-m-d', mktime( 0,0,0, date('m')-1, date('d'), date('Y') ));
}
qQuery( "update {$_SESSION['ShareDictionary']}gs_op set status='9' where status='8' and dt_status<'{$HaceUnMes}'" );
eLink('status');
if( $_SESSION['_D_']=='~' ) _FileNoCache('edes.js');
?>
<SCRIPT type="text/javascript">
var _FILAS;
var _dmy = '<?= date('d-m-Y') ?>';
function AjustaCeldas(){
var O = document.all.BROWSE.rows[0].cells;
var D = document.all.BROWSETH.rows[0].cells
top.eSWResize( window );
BUSCAR.focus();
_FILAS = BROWSE.rows;
}
function _Imprimir( v ){
if( v==-1 ) return;
window.document.body.focus();
window.external.ePrint();
}
function Imprimir(){
top.eAlert( S.lng(209), S.lng(218), 'A,C', 'P', _Imprimir );
}
function MPAntesPrint(){
document.all.BROWSE.parentNode.style.height = '';
document.all.Header.rows[1].style.display = 'none';
}
function MPDespuesPrint(){
document.all.Header.rows[1].style.display = 'block';
document.all.BROWSE.parentNode.style.height = '100%';
}
window.onbeforeprint = MPAntesPrint;
window.onafterprint = MPDespuesPrint;
var _ShowEstado;
function ShowEstado(){
var Obj = S.event(window);
if( Obj.all.length==1 ) Obj = Obj.parentNode.cells[1].children[0];
if( Obj.tagName=='IMG' ){
var tmp = Obj.src.split('_');
var Estado = tmp[tmp.length-1].substring(0,1);
var i = Obj.parentNode.parentNode.rowIndex + 1;
var oID = Obj.parentNode.id;
var sID = 'n'+(parseInt(oID.substring(1))+1);
var tTR = _FILAS.length;
if( Estado == 0 ){
Obj.src = Obj.src.replace('_0.','_1.');
while( i < tTR && oID < _FILAS[i].cells[1].id ) _FILAS[i++].style.display = 'none';
}else{
Obj.src = Obj.src.replace('_1.','_0.');
if( !event.ctrlKey ){
while( i < tTR && oID < _FILAS[i].cells[1].id  ){
if( sID == _FILAS[i].cells[1].id ){
_FILAS[i].style.display = 'block';
if( _FILAS[i].cells[1].all.length == 1 ) _FILAS[i].cells[1].firstChild.src = _FILAS[i].cells[1].firstChild.src.replace('_0.','_1.');
}
i++;
}
}else{
while( i < tTR && oID < _FILAS[i].cells[1].id  ){
_FILAS[i].style.display = 'block';
if( _FILAS[i].cells[1].all.length == 1 ) _FILAS[i].cells[1].firstChild.src = _FILAS[i].cells[1].firstChild.src.replace('_1.','_0.');
i++;
}
}
}
return;
}
if( Obj.tagName!='TD' ) return;
if( Obj.all.length==0 ){
var HR = Obj.parentNode.H;
if( HR=='' || HR.substr(0,1) == ':' ) return;
if( HR.substr(HR.length-1) == ':' ){
var Nivel = Obj.id;
var nTR = Obj.parentNode.rowIndex-1;
while( Nivel==Obj.id && nTR>0 ){
Obj = _FILAS[nTR].cells[1];
nTR--;
}
HR = HR + Obj.parentNode.H.substr(1);
}
if( window.name=='IWORK' && !event.ctrlKey ){
top.VerPag( HR );
}else{
top.VerPag( HR, null, true );
}
}
if( Obj.cellIndex!=0 ) return;
if( Obj.linea!=undefined ) return;
}
function eClearEvent(){
try{
if( event==null ) return false;
S.eventClear(window);
}catch(e){}
return false;
}
function EsTab(){
var n = S.eventCode(event);
if( n==9 ){
Buscar()
return false;
}
return true;
}
var _Buscar = new Array(), _nBuscar = 0, _nSeek = 0;
var _Cursor = -1;
function Buscar(){
_SeBusco = true;
var n = S.eventCode(event), v;
if( n==13 || n==9 ){
if( _Cursor!=-1 ){
_FILAS[_Cursor].cells[1].style.fontWeight = 'normal';
_Cursor = -1;
}
_nBuscar = 0;
_nSeek = 0;
_Buscar = new Array();
var Buscar = BUSCAR.value.toUpperCase(), no=0;
for( v=_FILAS.length-1; v>=0; v-- ){
if( _FILAS[v].cells[1].textContent.toUpperCase().indexOf(Buscar) > -1 ){
_FILAS[v].style.backgroundColor = 'red';
_Buscar[_nBuscar++] = v;
no++;
}else{
_FILAS[v].style.backgroundColor = '';
}
}
ENCONTRADOS.value = no;
if( no==0 ) S("body").tip('<?= eLng('No se ha encontrado ninguna opción') ?>');
}
}
var _SeBusco = false;
function Siguiente( Accion ){
if( Accion==0 && !_SeBusco ){
if( BUSCAR.value!='' ){
try{ event.keyCode = 13; }catch(e){}
Buscar();
Siguiente( Accion );
}
return;
}
_SeBusco = false;
if( _Cursor!=-1 ){
_FILAS[_Cursor].cells[1].style.fontWeight = 'normal';
}
if( Accion==0 ){
_nSeek = 0;
}else{
_nSeek += Accion;
if( _nSeek<0 ) _nSeek = _Buscar.length-1;
if( _nSeek>=_Buscar.length ) _nSeek = 0;
}
var v = _Buscar.length - _nSeek - 1;
if( v==-1 || _Buscar.length==0 ) return;
v = sv = _Buscar[v];
var sId = _FILAS[v].cells[1].id;
_Cursor = _FILAS[v].rowIndex;
while( sId==_FILAS[sv].cells[1].id && sv<_FILAS.length ){
_FILAS[sv++].style.display = 'block';
}
sv = v-1;
var EsElPadre = -1;
while( sId!='n0' && sv>=0 ){
if( sId == _FILAS[sv].cells[1].id ){
_FILAS[sv].style.display = 'block';
}else if( sId > _FILAS[sv].cells[1].id ){
if( EsElPadre == -1 ) EsElPadre = sv;
sId = _FILAS[sv].cells[1].id;
_FILAS[sv].style.display = 'block';
if( _FILAS[sv].cells[1].all.length == 1 ) _FILAS[sv].cells[1].firstChild.src = _FILAS[sv].cells[1].firstChild.src.replace('_1.','_0.');
var h = sv+1;
while( sId<=_FILAS[h].cells[1].id && _FILAS[h].cells[1].id!='n0' && h<_FILAS.length ){
if( sId==_FILAS[h].cells[1].id ) _FILAS[h].style.display = 'block';
h++;
}
}
sv--;
}
if( EsElPadre == -1 ){
document.all.Container.scrollTop = _FILAS[v].offsetTop;
}else{
document.all.Container.scrollTop = _FILAS[EsElPadre].offsetTop;
}
_FILAS[_Cursor].cells[1].style.fontWeight = 'bold';
}
function aClearBuscar(){
for( var v=_FILAS.length-1; v>=0; v-- ) _FILAS[v].style.backgroundColor = '';
BUSCAR.value = ENCONTRADOS.value = '';
}
function VerTodo(){
for( var v=_FILAS.length-1; v>=0; v-- ){
_FILAS[v].style.display = 'block';
if( _FILAS[v].cells[1].all.length == 1 ) _FILAS[v].cells[1].firstChild.src = _FILAS[v].cells[1].firstChild.src.replace('_1.','_0.');
}
}
function VerResumen(){
for( var v=_FILAS.length-1; v>=0; v-- ){
if( _FILAS[v].cells[1].id=='n0' ){
_FILAS[v].style.display = 'block';
if( _FILAS[v].cells[1].all.length == 1 ) _FILAS[v].cells[1].firstChild.src = _FILAS[v].cells[1].firstChild.src.replace('_0.','_1.');
}else{
_FILAS[v].style.display = 'none';
}
}
}
function Ver2Resumen(){
for( var v=_FILAS.length-1; v>=0; v-- ){
if( _FILAS[v].cells[1].id < 'n2' ){
_FILAS[v].style.display = 'block';
if( _FILAS[v].cells[1].all.length == 1 ) _FILAS[v].cells[1].firstChild.src = _FILAS[v].cells[1].firstChild.src.replace('_0.','_1.');
}else{
_FILAS[v].style.display = 'none';
}
}
}
</script>
<BODY onload=AjustaCeldas() onhelp='return false' oncontextmenu="<?=(( $_SESSION['_D_']!='~')?'return false;':'')?>"<?=(( $_SESSION['_D_']!='~')?' onselectstart="return false"':'')?>>
<table border=0px cellspacing=0px cellpadding=0px width=100% height=100%>
<tr><td>
<table id=BROWSETH width=100%>
<TH class=THOption align=left style="padding-left:19px" nowrap><?= eLng('MAPA DE OPCIONES') ?>
<TH class=THOption width=50px>&nbsp;
<TH class=THOption style='font-weight:normal; width:1'><?= eLng('Buscar') ?>
<TH class=THOption width=1px><input name=BUSCAR SIZE=20 MAXLENGTH=40 onkeypress="Buscar()" onkeydown="EsTab()" onblur="_tSeek=-1" title="<?= eLng('Opción a buscar') ?>">
<TH class=THOption width=1px><input name=ENCONTRADOS SIZE=3 title="<?= eLng('Nº de ocurrencias') ?>" style="cursor:default;width:25px">
<TH class=THOption width=1px><img src=g/clear.png onclick=aClearBuscar() title='<?= eLng('Limpiar busqueda') ?>'>
<TH class=THOption width=1px><IMG SRC="g/mapa_izq.gif" onclick='Siguiente(-1)' title='<?= eLng('Anterior') ?>' style='MARGIN-LEFT:2px;MARGIN-RIGHT:0px;'>
<TH class=THOption width=1px><IMG src='g/mapa_buscar.gif' onclick='Siguiente(0)' title='<?= eLng('Buscar') ?>' style='MARGIN-RIGHT:2px;'>
<TH class=THOption width=1px><IMG SRC="g/mapa_dch.gif" onclick='Siguiente(1)' title='<?= eLng('Siguinte') ?>'>
<TH class=THOption width=1px>&nbsp;&nbsp;
<TH class=THOption width=1px><img src=g/tree_1.gif onclick=VerTodo() title='<?= eLng('Mostrar todas las opciones') ?>'>
<TH class=THOption width=1px><img src=g/tree_2.gif onclick=Ver2Resumen() title='<?= eLng('Mostrar dos niveles') ?>'>
<TH class=THOption width=1px><img src=g/tree_0.gif onclick=VerResumen() title='<?= eLng('Mostrar solapas') ?>'>
<TH class=THOption width=100%>&nbsp;
<TH class=THOption width=1px><img src=g/helpkey_1.gif onclick=top.eFileHelp('Mapa3HelpTeclado',event) title='<?= eLng('Ayuda de Teclado') ?>'>
</table>
<tr><td height=100%>
<div id=Container style="overflow:auto; height:100%; width:100% padding:0px">
<table id=BROWSE width=100% onclick="ShowEstado()">
<col style='display:none'>
<col class=Option style='cursor:pointer'>
<?PHP
echo '<col class=Option width=100%>';
include( '../../edesweb/arbol.inc' );
unset($_DimTree);
$Dim = array();
$TOpciones = count($Menu);
for( $n=0; $n<$TOpciones; $n++ ){
$r['indent'] = strlen($Menu[$n])-strlen(ltrim($Menu[$n]));
list( $txt ,$r['cd_gs_op'] ) = explode('~',$Menu[$n]);
$r['cd_gs_op'] = $r['cd_gs_op']*1;
list( $r['caption'], $r['script_url'] ) = explode('|',$txt);
$r['caption'] = trim($r['caption']);
$r['script_url'] = trim($r['script_url']);
$r['type'] = ( $r['script_url']=='' || $r['script_url'][0]==':' ) ? 'F':'O';
if( $r['caption']=='' || $r['caption'][0]=='-' ) $r['type'] = 'L';
$Dim[] = $r;
}
$TOpciones = count($Dim);
for( $n=0; $n<$TOpciones; $n++ ){
$r = $Dim[$n];
echo '<tr n='.$r['cd_gs_op'];
if( $r['indent'] > 1 ) echo ' id=o';
if( $r['indent']==0 ) echo ' id=TAB';
echo " H='{$r['script_url']}'";
echo '>';
if( $r['caption']=='-' || $r['type']=='L' ){
echo '<td linea=1>';
echo "<td id=n{$r['indent']}><img src=g/linea.gif width=100% height=2px>";
}else{
echo '<td>';
$txt = trim($r['caption']);
if( $txt[0]=='{' ){
$txt = trim(substr( $txt,strpos( $txt,'}')+1 ));
}else if( $txt[0]=='[' ){
$txt = trim(substr( $txt,strpos( $txt,']')+1 ));
}
echo "<td id=n{$r['indent']}>";
if( $n < $TOpciones-1 ){
if( $r['indent']==0 ){
echo '<img src=g/tree_0.gif>';
}else if( $r['indent'] < $Dim[$n+1]['indent'] ) echo '<img src=g/tree_1.gif>';
}
echo $txt;
}
echo '<td>&nbsp;';
}
echo '<tr height=1px style="font-size:1px">';
echo '<td height=1px style="font-size:1px;background-color:#f0f1ff">';
echo '<td height=1px style="font-size:1px">';
echo '<td>';
?>
</table>
</div>
</table>
<script type="text/javascript">
top.eLoading(0,window);
</script>
</BODY></HTML>
<?PHP
eEnd();
?>
