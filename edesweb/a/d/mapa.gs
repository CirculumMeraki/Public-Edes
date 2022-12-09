<?=eHTML();?>
</HEAD>
<?PHP
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
eInclude($_Sql);
include_once('../_datos/config/desktop.ini');
qQuery("select * from gs_user where cd_gs_user='{$_User}'");
$row = qArray();
$_TypeTree = ((!isset($row['cd_type_tree'])) ? '' : $row['cd_type_tree']);
if( $_TypeTree!='' ) $row['cd_gs_tree'] = -1;
$_DesktopTreeType = eFileGetVar("Desktop.DesktopTreeType");
if( $_DesktopTreeType=='O' ){
if( $_TypeTree=='P' ){
$_UserTree = $row['cd_gs_user'];
}else if( $_TypeTree=='R' ){
$_UserTree = $row['cd_gs_rol'];
}else if( $_TypeTree=='U' ){
$DimUser = array();
$DimUser[] = $row['cd_gs_user'];
$LikeUser = $row['like_user'];
do {
if( !in_array($LikeUser, $DimUser) ){
qQuery("select cd_type_tree,cd_gs_rol,like_user, cd_gs_user from gs_user where cd_gs_user='{$LikeUser}'", $p1);
$oUsu = qArray( $p1 );
$DimUser[] = $LikeUser;
$LikeUser = $oUsu['like_user'];
}else{
eMessage($__Lng[50], 'HELS', 10);
}
} while( $oUsu['cd_type_tree']=='U' );
$_TypeTree = $oUsu['cd_type_tree'];
if( $_TypeTree=='P' ){
$_UserTree = $oUsu['cd_gs_user'];
}else if( $_TypeTree=='R' ){
$_UserTree = $oUsu['cd_gs_rol'];
}
}
}
include('../../edesweb/arbol.inc');
if( !isset($TIPO) ) $TIPO = 0;
eLink('status','manager_op');
if( $_SESSION['_D_']=='~' ) _FileNoCache('edes.js');
?>
<SCRIPT type="text/javascript">
var _FILAS;
function AjustaCeldas(){
top.eSWResize(window);
BUSCAR.focus();
_FILAS = BROWSE.rows;
}
function _Imprimir(v){
if( v==-1 ) return;
window.document.body.focus();
window.print();
}
function Imprimir_OLD(){
top.eAlert(S.lng(209), S.lng(218), 'A,C', 'P', _Imprimir);
}
function AntesPrint(){
S("#BROWSE").obj.parentNode.style.height = '';
}
function DespuesPrint(){
S("#BROWSE").obj.parentNode.style.height = '100%';
}
window.onbeforeprint = AntesPrint;
window.onafterprint = DespuesPrint;
var _ShowEstado;
function ShowEstado(){
var Obj = S.event(window);
if( Obj.tagName=='TD' && Obj.cellIndex==0 ) return;
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
while( i < tTR && oID < _FILAS[i].cells[1].id  ){
if( sID == _FILAS[i].cells[1].id ){
_FILAS[i].style.display = 'block';
if( _FILAS[i].cells[1].all.length == 1 ) _FILAS[i].cells[1].firstChild.src = _FILAS[i].cells[1].firstChild.src.replace('_0.','_1.');
}
i++;
}
}
return;
}
if( Obj.tagName!='TD' ) return;
if( Obj.cellIndex!=1 ) return;
if( Obj.linea!=undefined ) return;
var EnSubVentana = false;
if( DGI('OpEnSubVentana')!=null || event.ctrlKey ){
if( DGI('OpEnSubVentana').valor==1 || event.ctrlKey ) EnSubVentana = true;
}
if( Obj.parentNode.HR!=undefined ){
var Op = Obj.parentNode.HR;
if( Op.substr(Op.length-1,1) == ':' ){
var i = Obj.parentNode.rowIndex-1;
while( _FILAS[i].cells[1].id == Obj.id ) i--;
top.VerPag( Op + _FILAS[i].HR.substr(1), null, EnSubVentana );
}else{
top.VerPag( Op, null, EnSubVentana );
}
}
}
function eClearEvent(){
try{
if( event==null ) return false;
S.eventClear(window);
}catch(e){}
return false;
}
var _Buscar = new Array(), _nBuscar = 0;
function BuscarN( Entrar ){
var n = S.eventCode(event), v;
if( n==13 || n==9 || Entrar ){
_nBuscar = 0;
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
}
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
function _CambiaTF(){
var Obj = S.event(window);
if( Obj.src.indexOf('_1.') > -1  ){
Obj.src = Obj.src.replace('_1.','_0.');
Obj.valor = 0;
}else{
Obj.src = Obj.src.replace('_0.','_1.');
Obj.valor = 1;
}
}
function Imprimir(){
top.eCallSrv(window,'edes.php?E:$pdf_arbol.gs&TipoArbol=U');
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
function Buscar( Entrar ){
_SeBusco = true;
var n = S.eventCode(event), v;
if( n==13 || n==9 || Entrar ){
if( _Cursor!=-1 ){
_FILAS[_Cursor].cells[1].style.fontWeight = 'normal';
_Cursor = -1;
}
_nBuscar = 0;
_nSeek = 0;
_Buscar = new Array();
var Buscar = BUSCAR.value.toUpperCase(), no=0;
if( Buscar=='' ) return;
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
if( no==0 ) S("body").tip('No se ha encontrado ninguna opción.');
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
if( _Cursor!=-1 ) _FILAS[_Cursor].cells[1].style.fontWeight = 'normal';
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
</script>
<BODY onload=AjustaCeldas() onhelp='return false' oncontextmenu="return false"<?=(( $_SESSION['_D_']!='~')?' onselectstart="return false"':'')?>>
<table border=0px cellspacing=0px cellpadding=0px width=100% height=100%>
<tr><td>
<table id=BROWSETH width=100%>
<?PHP if( $_GET['WIN']!=1 ){ ?>
<TH class=THOption align=left style="padding-left:19px" nowrap>MAPA DE OPCIONES
<?PHP } ?>
<TH class=THOption width=50px>&nbsp;
<TH class=THOption width=1px><img src='g/t_print.gif' onclick='Imprimir()'>
<TH class=THOption width=50px>&nbsp;
<TH class=THOption style='font-weight:normal; width:1px'>Buscar
<TH class=THOption width=1px><input name=BUSCAR SIZE=20 MAXLENGTH=40 onkeypress="Buscar()" onkeydown="return true;" onblur="Buscar(1);_tSeek=-1;" title="Opción a buscar">
<TH class=THOption width=1px><input name=ENCONTRADOS SIZE=3 title="Nº de ocurrencias" style="cursor:default;width:25px">
<TH class=THOption width=1px><IMG SRC="g/mapa_izq.gif" onclick='Siguiente(-1)' title='Anterior' style='MARGIN-LEFT:2px;MARGIN-RIGHT:0px;'>
<TH class=THOption width=1px><IMG src='g/mapa_buscar.gif' onclick='Siguiente(0)' title='Buscar' style='MARGIN-RIGHT:2px;'>
<TH class=THOption width=1px><IMG SRC="g/mapa_dch.gif" onclick='Siguiente(1)' title='Siguinte'>
<TH class=THOption width=1px><img src=g/clear.png onclick=aClearBuscar()>
<TH class=THOption width=1px><img src=g/tree_1.gif onclick=VerTodo() title='Mostrar todas las opciones'>
<TH class=THOption width=1px><img src=g/tree_2.gif onclick=Ver2Resumen() title='Mostrar dos niveles'>
<TH class=THOption width=1px><img src=g/tree_0.gif onclick=VerResumen() title='Mostrar solapas'>
<TH class=THOption><span style='width:50'></span>
<?PHP if( $_Development ){ ?>
<TH class=THOption width=1px style='font-weight:normal'>SubVentana <TH class=THOption width=1px><img src=g/check_0.gif id=OpEnSubVentana valor=0 onclick=_CambiaTF()>
<TH class=THOption width=1px>&nbsp;
<TH class=THOption width=1px style='font-weight:normal'>gsEdit <TH class=THOption width=1px><img src=g/check_0.gif id=OpGsEdit valor=0 onclick=_CambiaTF()>
<?PHP } ?>
<TH class=THOption width=100%>&nbsp;
</table>
<tr><td height=100%>
<div id=Container style="overflow:auto; height:100%; width:100% padding:0px">
<table id=BROWSE width=100% onclick="ShowEstado()">
<col class=ModeCol style='width:1px;text-align:center;cursor:default'><col class=Option style='width:100%'>
<?PHP
$Dim = array();
for( $n=0; $n<count($_DimUser); $n++ ) $Dim[] = $_DimUser[$n][1].'|'.$_DimUser[$n][0].'|'.$_DimUser[$n][2];
sort($Dim);
$_DimUser[0] = array( '', '&nbsp;', $nFalta);
for( $n=0; $n<count($Dim); $n++ ){
list( $NomUser, $NumUser, $TOpciones ) = explode('|',$Dim[$n]);
$_DimUser[$n+1] = array( $NumUser, $NomUser, $TOpciones);
}
$c = 0;
$TOpciones = count($_DimTree);
$_Mode = array(
'I'=>'I',
'D'=>'B',
'V'=>'C',
'U'=>'M',
'S'=>'E'
);
$_ModeLabel = array(
'I'=>'Insertar',
'D'=>'Borrar',
'V'=>'Consultar',
'U'=>'Modificar',
'S'=>'Especial'
);
for( $n=0; $n<$TOpciones; $n++ ){
$r = $_DimTree[$n];
if( $r['status']=='' ) $r['status'] = '0';
echo '<tr n="'.$r['id'].'"';
if( $r['indent'] > 1 ) echo ' id=o';
if( $r['indent']==0 ) echo ' id=TAB';
if( $r['script_url']!='' ) echo " HR='".$r['script_url']."'";
echo '>';
if( $r['mode']=='' ){
echo '<td>&nbsp;';
}else{
echo '<td id="mc'.$r['mode'].'" title="'.$_ModeLabel[$r['mode']].'">'.$_Mode[$r['mode']];
}
if( $r['type']=='L' ){
if( $r['caption'][0]=='-' ) $r['caption'] = trim(substr($r['caption'],1));
if( $r['caption']=='' ){
echo "<td id=n{$r['indent']}><img src=g/linea.gif width=200px height=2px>";
}else{
echo "<td id=n{$r['indent']}><img src=g/linea.gif width=50px height=2px>".$r['caption']."<img src=g/linea.gif width=50px height=2px>";
}
}else{
$txt = trim($r['caption']);
if( $txt[0]=='{' ){
$txt = trim(substr( $txt,strpos( $txt,'}')+1 ));
}else if( $txt[0]=='[' ){
$txt = trim(substr( $txt,strpos( $txt,']')+1 ));
}
echo "<td id=n{$r['indent']}>";
if( $n<$TOpciones-1 ){
if( $r['indent']==0 ){
echo '<img src=g/tree_0.gif>';
}else if( $r['indent']<$_DimTree[$n+1]['indent'] ) echo '<img src=g/tree_1.gif>';
}
echo $txt;
}
echo '</td></tr>';
}
echo '<td height=1px style="font-size:1px;background-color:#f0f1ff"><td height=1px style="font-size:1px;background-color:#f0f1ff">';
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
