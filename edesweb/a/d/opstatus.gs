<?=eHTML();?>
<script type="text/javascript">
var WE = top;
</script>
</HEAD>
<?PHP
if( !isset($_SESSION['_User']) ) exit;
if( $_gsID != getmypid() ) exit;
eInclude($_Sql);
if( isset($STATUS) ){
if( eSqlType('oracle', 'pdo.informix') ){
$Hoy = date('d-m-Y');
}else{
$Hoy = date('Y-m-d');
}
if( $ID > 0 ){
qQuery( "update {$_SESSION['ShareDictionary']}gs_op set status='{$STATUS}', cd_gs_user='{$_User}', dt_status='{$Hoy}' where cd_gs_op='{$ID}'" );
$zp = gzopen( "../_d_/log/opstatus.{$_User}", "w9" );
gzwrite( $zp, date('Y-m-d H:i:s').'|T|'.$ID.'|'.$STATUS."\n" );
gzclose($zp);
$CDI = date('Y-m-d H:i:s');
qQuery( "insert into gs_op_status values( '{$ID}', '{$CDI}', '{$STATUS}', '{$_User}' )" );
?>
<script type="text/javascript">
S("body").tip(eLng(27),1);
</script>
<?PHP
}
eEnd();
}else if( isset($USUARIO) ){
if( eSqlType('oracle', 'pdo.informix') ){
$Hoy = date('d-m-Y');
}else{
$Hoy = date('Y-m-d');
}
if( $USUARIO=='' ) $Hoy = '';
if( $ID > 0 ){
qQuery( "update {$_SESSION['ShareDictionary']}gs_op set cd_gs_user='{$USUARIO}', dt_status='{$Hoy}' where cd_gs_op='{$ID}'" );
?>
<script type="text/javascript">
S("body").tip(eLng(27),1);
</script>
<?PHP
}
eEnd();
}
if( !isset($TIPO) ) $TIPO = 0;
$cd_tree = 'MASTER';
if( qCount("{$_SESSION['ShareDictionary']}gs_op", "")==0 ){
eInclude('message');
eMessage( "No hay ninguna opción generada.", 'HSE' );
}
if( eSqlType('oracle', 'pdo.informix') ){
$HaceUnMes = date( 'd-m-Y', mktime( 0,0,0, date('m')-1, date('d'), date('Y') ));
}else{
$HaceUnMes = date( 'Y-m-d', mktime( 0,0,0, date('m')-1, date('d'), date('Y') ));
}
qQuery( "update {$_SESSION['ShareDictionary']}gs_op set status='9' where status='8' and dt_status<'{$HaceUnMes}'" );
eLink('status');
echo '<style>';
if( $_SESSION['_D_']=="" ) echo '#SelEstado TD { cursor:default; }';
echo '.SoloEnDesarrollo { border-left: 3px solid red; }';
echo '</style>';
if( $_SESSION['_D_']=='~' ) _FileNoCache('edes.js');
?>
<SCRIPT type="text/javascript">
var _FILAS,
_dmy = '<?= date('d-m-Y') ?>';
function AjustaCeldas(){
var O = document.all.BROWSE.rows[0].cells;
var D = document.all.BROWSETH.rows[0].cells
<?PHP  if( $_SESSION['_D_']=='~' ){ ?>
D[0].width = parseInt(O[0].offsetWidth)+parseInt(O[1].offsetWidth) - 4;
<?PHP  } ?>
top.eSWResize( window );
BUSCAR.focus();
_FILAS = BROWSE.rows;
}
function _Imprimir( v ){
if( v==-1 ) return;
window.document.body.focus();
window.print();
}
function Imprimir(){
top.eAlert( S.lng(209), S.lng(218), 'A,C', 'P', _Imprimir );
}
function AntesPrint(){
document.all.BROWSE.parentNode.style.height = '';
document.all.Header.rows[1].style.display = 'none';
}
function DespuesPrint(){
document.all.Header.rows[1].style.display = 'block';
document.all.BROWSE.parentNode.style.height = '100%';
}
window.onbeforeprint = AntesPrint;
window.onafterprint = DespuesPrint;
function SetEstado(){
var Obj = S.event(window);
if( Obj.tagName!="TD" ) return false;
var nStatus = Obj.parentNode.cells[0].id.substr(3);
if( nStatus > 8 ) nStatus = 8;
_ShowEstado.id = 'st_'+nStatus;
_ShowEstado.parentNode.cells[2].textContent = _USUARIO['u'+top._User]+' ';
_ShowEstado.parentNode.cells[3].textContent = ' '+_dmy;
SelEstado.style.display = 'none';
top.eCallSrv( window, 'edes.php?E:$a/d/opstatus.gs&STATUS='+nStatus+'&ID='+_ShowEstado.parentNode.n );
}
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
if( Obj.cellIndex==1 ){
var EnSubVentana = Ejecutar = false;
if( DGI('EjecutarEnPag')!=null ){
if( DGI('EjecutarEnPag').valor==1 ) Ejecutar = true;
}
if( DGI('OpEnSubVentana')!=null ){
if( DGI('OpEnSubVentana').valor==1 ) EnSubVentana = true;
}
if( !Ejecutar && !EnSubVentana ) return;
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
return;
}
if( Obj.cellIndex!=0 ) return;
if( Obj.linea!=undefined ) return;
if( top._User!=Obj.parentNode.u && Obj.parentNode.u!=0 && Obj.parentNode.u!='' ){
if( top._M_!='~' ){
S("body").tip('Esta opción pertenece a otro usuario',2);
return;
}
}
_ShowEstado = Obj;
var xyCont = top.eXY( Container );
var xy = top.eXY( Obj );
SelEstado.style.left = px(xy[0]);
SelEstado.style.top = px(xy[1]);
SelEstado.style.display = 'block';
if( parseInt(SelEstado.style.top) + SelEstado.offsetHeight > xyCont[1] + Container.clientHeight ){
SelEstado.style.top = parseInt(SelEstado.style.top) + Obj.offsetHeight - SelEstado.offsetHeight
}
}
function ShowAsignUser(){
if( top._M_!='~' ) return;
var Obj = S.event(window);
if( Obj.tagName!='TD' ) return;
if( Obj.cellIndex!=0 ) return;
if( Obj.linea!=undefined ) return;
_ShowEstado = Obj;
var xyCont = top.eXY( Container );
var xy = top.eXY( Obj );
ListUsuarios.style.left = xy[0];
ListUsuarios.style.top = xy[1];
ListUsuarios.style.display = 'block';
if( parseInt(ListUsuarios.style.top) + ListUsuarios.offsetHeight > xyCont[1] + Container.clientHeight ){
ListUsuarios.style.top = parseInt(ListUsuarios.style.top) + Obj.offsetHeight - ListUsuarios.offsetHeight
}
}
function SetAsignUser(){
var Obj = S.event(window);
if( Obj.tagName!='TD' ) return;
Obj = Obj.parentNode;
_ShowEstado.parentNode.u = Obj.u;
_ShowEstado.parentNode.cells[2].textContent = _USUARIO['u'+Obj.u]+' ';
if( _USUARIO['u'+Obj.u]!='' ){
_ShowEstado.parentNode.cells[3].textContent = ' '+_dmy;
}else{
_ShowEstado.parentNode.cells[3].textContent = ' ';
}
ListUsuarios.style.display = 'none';
top.eCallSrv( window, 'edes.php?E:$a/d/opstatus.gs&USUARIO='+Obj.u+'&ID='+_ShowEstado.parentNode.n );
}
function eClearEvent(){
try{
if( event==null ) return false;
S.eventClear(window);
}catch(e){}
return false;
}
var _Buscar = new Array(), _nBuscar = 0;
function Buscar(){
var n = S.eventCode(event), v;
if( n==13 || n==9 ){
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
function VerUsuarios(){
var xy = top.eXY( S.event(window) );
with( document.all.SelUsuario.style ){
display = 'block';
left = xy[0];
top = xy[1];
}
}
function FiltrarUsuarios(){
var Obj = S.event(window);
if( Obj.tagName=='TH' ){
VerTodo();
}else{
if( Obj.tagName=='TD' ) Obj = Obj.parentNode;
FiltrarUnUsuario( Obj.u );
}
}
function FiltrarUnUsuario( Usuario ){
for( var v=_FILAS.length-1; v>=0; v-- ){
if( _FILAS[v].u == Usuario ){
_FILAS[v].style.display = 'block';
if( _FILAS[v].cells[1].all.length == 1 ) _FILAS[v].cells[1].firstChild.src = _FILAS[v].cells[1].firstChild.src.replace('_1.','_0.');
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
</script>
<BODY onload=AjustaCeldas() onhelp='return false' oncontextmenu="return false"<?=(( $_SESSION['_D_']!='~')?' onselectstart="return false"':'')?>>
<table border=0px cellspacing=0px cellpadding=0px width=100% height=100%>
<tr><td>
<table id=BROWSETH width=100%>
<TH class=THOption align=left style="padding-left:19px" nowrap>ARBOL&nbsp;DE&nbsp;OPCIONES
<TH class=THOption width=50px>&nbsp;
<TH class=THOption style='font-weight:normal; width:1'>Buscar
<TH class=THOption width=1px><input name=BUSCAR SIZE=20 MAXLENGTH=40 onkeypress="Buscar()" onkeydown="return true;" onblur="_tSeek=-1" title="Opción a buscar">
<TH class=THOption width=1px><input name=ENCONTRADOS SIZE=3 title="Nº de ocurrencias" style="cursor:default;width:25">
<TH class=THOption width=1px><img src=g/clear.png onclick=aClearBuscar()>
<TH class=THOption width=1px><img src=g/tree_1.gif onclick=VerTodo() title='Mostrar todas las opciones'>
<TH class=THOption width=1px><img src=g/tree_2.gif onclick=Ver2Resumen() title='Mostrar dos niveles'>
<TH class=THOption width=1px><img src=g/tree_0.gif onclick=VerResumen() title='Mostrar solapas'>
<?PHP  if( $_SESSION['_D_']=='~' ){ ?>
<TH class=THOption width=1px><img src=edes.php?R:$a/g/usuario.gif onclick=VerUsuarios() title='Filtrar por usuario'>
<?PHP  } ?>
<?PHP  if( $_SESSION['_D_']<>"" ){ ?>
<TH class=THOption width=1px><img src=edes.php?R:$a/g/usuarioa.gif onclick=FiltrarUnUsuario(top._User) title='Ver sólo mis opciones'>
<?PHP  } ?>
<TH class=THOption><span style='width:50px'></span>
<?PHP  if( $_Development && $_SESSION['_D_']<>"" ){ ?>
<TH class=THOption width=1px style='font-weight:normal'>Ejecutar <TH class=THOption width=1px><img src=g/check_0.gif id=EjecutarEnPag valor=0 onclick=_CambiaTF()>
<TH class=THOption width=1px>&nbsp;
<TH class=THOption width=1px style='font-weight:normal'>SubVentana <TH class=THOption width=1px><img src=g/check_0.gif id=OpEnSubVentana valor=0 onclick=_CambiaTF()>
<TH class=THOption width=1px>&nbsp;
<TH class=THOption width=1px style='font-weight:normal'>gsEdit <TH class=THOption width=1px><img src=g/check_0.gif id=OpGsEdit valor=0 onclick=_CambiaTF()>
<?PHP  } ?>
<TH class=THOption width=100%>&nbsp;
</table>
<tr><td height=100%>
<div id=Container style="overflow:auto; height:100%; width:100% padding:0px" oncontextmenu="ShowAsignUser()">
<table id=BROWSE width=100% onclick="ShowEstado()">
<col class=Status>
<col class=Option>
<?PHP
echo '<col class=MasDatos'.( ($_SESSION['_D_']!='~') ? ' style="display:none"' : '' ).'>';
echo '<col class=MasDatos'.( ($_SESSION['_D_']!='~') ? ' style="display:none"' : '' ).'>';
echo '<col class=Option width=100%>';
if( $_SESSION['_D_']=='~' ){
$_DimUser = array();
$_DimNomUser = array();
$_DimNomUser['u'] = $_DimNomUser['u0'] = '&nbsp;';
qQuery( "select cd_gs_user, user_name, user_surname from gs_user where cd_gs_user in ( select distinct cd_gs_user from {$_SESSION['ShareDictionary']}gs_op where cd_gs_user>0 )" );
while( $r=qRow() ){
$n = qCount("{$_SESSION['ShareDictionary']}gs_op", "cd_gs_user='{$r[0]}'", $p2);
$_DimUser[] = array( $r[0], trim($r[1]).' '.trim($r[2]), $n );
$_DimNomUser['u'.$r[0]] = trim($r[1]).' '.trim($r[2]);
}
}
$Dim = array();
$nFalta = qCount("{$_SESSION['ShareDictionary']}gs_op", "( cd_gs_user='0' or cd_gs_user='' or cd_gs_user is null )", $p2 );
if( $nFalta>0 ) $Dim[] = '&nbsp;||'.$nFalta;
for( $n=0; $n<count($_DimUser); $n++ ) $Dim[] = $_DimUser[$n][1].'|'.$_DimUser[$n][0].'|'.$_DimUser[$n][2];
sort($Dim);
for( $n=0; $n<count($Dim); $n++ ){
list( $NomUser, $NumUser, $TOpciones ) = explode('|',$Dim[$n]);
$_DimUser[$n] = array( $NumUser, $NomUser, $TOpciones );
}
qQuery( "select * from {$_SESSION['ShareDictionary']}gs_op order by seq" );
$c = 0;
$Dim = array();
while( $r=qArray() ) $Dim[] = $r;
$TOpciones = count($Dim);
for( $n=0; $n<$TOpciones; $n++ ){
$r = $Dim[$n];
if( $r['status']=='' ) $r['status'] = '0';
echo '<tr n='.$r['cd_gs_op'];
if( $r['indent'] > 1 ) echo ' id=o';
if( $r['indent']==0 ) echo ' id=TAB';
if( $r['script_url']!='' ) echo " HR='".$r['script_url']."'";
echo ' u='.$r['cd_gs_user'].'>';
if( $r['caption']=='-' ){
echo '<td id=st_9 linea=1>&nbsp;&nbsp;';
echo "<td id=n{$r['indent']}><img src=g/linea.gif width=100% height=2px>";
}else{
echo '<td id=st_'.$r['status'].(($r['show_type']=="D") ? ' class="SoloEnDesarrollo"':'').'>&nbsp;&nbsp;';
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
echo '<td>'.$_DimNomUser['u'.$r['cd_gs_user']];
$v = $r['dt_status'];
if( strlen($v)==10 && substr($v,4,1)=='-' && substr($v,7,1)=='-' ){
$v = eDataFormat($v,"F4");
}
if( isZero($v) ) $v = '';
echo '<td>&nbsp;'.$v;
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
<TABLE id=SelEstado border=0 cellspacing=0 cellpadding=0 style='position:absolute;display:none;'
<?=(( $_SESSION['_D_']<>"" ) ? ' onclick="SetEstado()"' : ' style="cursor:default"')?> onmouseleave='this.style.display="none"'>
<COL width=20>
<TR><TH colspan=2>STATUS</TH></TR>
<TR><TD id=st_0></TD><TD style='border-left: solid 1px #000099;'>&nbsp;Pendiente desarrollo</TD></TR>
<TR><TD id=st_1></TD><TD style='border-left: solid 1px #000099;'>&nbsp;<B>Desarrollandose</B></TD></TR>
<TR><TD id=st_2></TD><TD style='border-left: solid 1px #000099;'>&nbsp;Pendiente revisión</TD></TR>
<TR><TD id=st_3></TD><TD style='border-left: solid 1px #000099;'>&nbsp;<B>Revisandose</B></TD></TR>
<TR><TD id=st_4></TD><TD style='border-left: solid 1px #000099;'>&nbsp;Pendiente corrección</TD></TR>
<TR><TD id=st_5></TD><TD style='border-left: solid 1px #000099;'>&nbsp;<B>Corrigiendose</B></TD></TR>
<TR><TD id=st_6></TD><TD style='border-left: solid 1px #000099;'>&nbsp;Pendiente modificación&nbsp;</TD></TR>
<TR><TD id=st_7></TD><TD style='border-left: solid 1px #000099;'>&nbsp;<B>Modificandose</B></TD></TR>
<TR><TD id=st_8></TD><TD style='border-left: solid 1px #000099;'>&nbsp;Ok (menos de un mes)</TD></TR>
<TR><TD id=st_9></TD><TD style='border-left: solid 1px #000099;'>&nbsp;Ok</TD></TR>
</TABLE>
<TABLE id=SelUsuario class=Usuario style='position:absolute;display:none;' onclick='FiltrarUsuarios()' onmouseleave='this.style.display="none"'>
<TR><TH colspan=2 style='cursor:pointer'>OPCIONES&nbsp;ASIGNADAS</TH></TR>
<?PHP
if( $_SESSION['_D_']=='~' ){
for( $i=0; $i<count($_DimUser); $i++ ){
if( $_DimUser[$i][1]=='' ) $_DimUser[$i][1] = '&nbsp;';
if( $_DimUser[$i][2]=='' ) $_DimUser[$i][2] = '&nbsp;';
echo '<tr u='.$_DimUser[$i][0].'><td align=right title="Opciones asignadas">'.$_DimUser[$i][2].'<td>'.$_DimUser[$i][1];
}
}
?>
</TABLE>
<TABLE id=ListUsuarios class=Usuario style='position:absolute;display:none;height:1' onclick='SetAsignUser()' onmouseleave='this.style.display="none"'>
<TR><TH>ASIGNAR USUARIO</TH></TR>
<?PHP
$xDim = file_get_contents( '../_d_/cfg/dim.lp' );
$DimUser = array();
echo '<tr u=""><td>&nbsp;';
if( $xDim!='' ) $DimUser = unserialize( gzuncompress($xDim) );
foreach( $DimUser as $k=>$v ){
$k = substr($k,1);
if( strlen(trim($v))>0 ) echo '<tr u='.$k.'><td>'.trim($v);
}
?>
</TABLE>
<script type="text/javascript">
<?PHP
echo 'var _USUARIO = new Array();';
echo '_USUARIO["u"] = "";';
echo '_USUARIO["u0"] = "";';
foreach( $DimUser as $k=>$v ){
$k = substr($k,1);
echo '_USUARIO["u'.$k.'"] = "'.$v.'";';
}
?>
top.eLoading(0,window);
</script>
</BODY></HTML>
<?PHP
eEnd();
?>
