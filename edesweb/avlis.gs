<?PHP //[_PROTECCION_]
if( !isset($_SESSION['_User']) ) exit;
include_once( $Dir_.'message.inc' );
include_once( $Dir_.$_Sql.'.inc' );
$MasInfo = isset($INFO);
eHTML('$avlis.gs');
?>
<LINK REL="stylesheet" HREF="<?=$_SESSION['_PathCSS']?>/splano.css" TYPE="text/css">
<style>
#o { display: none; }
#c { text-align: center; }
#d { text-align: right; }
</style>
<?PHP
if( $_Development || $_SESSION['_D_']!='' ){
}else{
echo '<script type="text/javascript">';
echo 'document.oncontextmenu = new Function("return false");';
echo '</SCRIPT>';
}
?>
</HEAD>
<BODY style='margin:0px;' onhelp='return false;'>
<?PHP
if( qCount( 'gs_exp_file', "cd_gs_user={$_User} and estado='T'" ) == 0 ){
?>
<script type="text/javascript">
function Cerrar(){
top.eSWClose(window);
}
top.eAlert( S.lng(209), 'No hay ninguna extracción', 'A', 'W', Cerrar );
</SCRIPT>
</BODY></HTML>
<?PHP
exit;
}
echo '<center>';
if( $MasInfo ){
?>
<BR><TABLE cellspacing=0 cellpadding=0 style='background:transparent'><tr><td id=TITULO align=center nowrap style='cursor:default;background:transparent;'>LISTADO DE EXTRACCIONES</td></tr></TABLE>
<?PHP
}
$DimFormato = array('RECUENTO','HTML','TXT','DBF','XLS','PDF');
echo "<table border=0 id='FICHEROS' cellspacing=1px cellpadding=3px WIDTH='".(( $MasInfo )?'95':'100')."%'>";
echo '<col class=Celda><col id=c class=Celda><col width=100% class=Celda><col id=d class=Celda><col id=W class=Celda>';
if( $MasInfo ) echo '<col id=W class=Celda><col id=c class=Celda><col id=d class=Celda><col id=d class=Celda><col id=d class=Celda><col id=d class=Celda>';
echo '<tr><th>TIPO<th>FORMATO<th id=c>DESCRIPCION</th><th id=c>REGISTROS</th><th id=c>FECHA</th>';
if( $MasInfo ) echo "<th>DOWNLOAD<th title='Estado:\n  Pendiente\n  Terminado\n  Histórico'>E<th>SG<th title='Nº de descargas'>Nº<th INFO title='Código de usuario'>USU";
$HastaCDI = date( 'Y-m-d H:i:s', mktime( date('H'), date('i'), date('s'), date('m'), date('d')-7, date('Y') ) );
if( $MasInfo ){
qSelect( 'gs_exp_file', '*', "cd_gs_user={$_User} and cdi>='{$HastaCDI}'", 'cdi DESC' );
}else{
qSelect( 'gs_exp_file', '*', "cd_gs_user={$_User} and estado='T' and cdi>='{$HastaCDI}'", 'cdi DESC' );
}
while( $row = qArray() ){
echo '<tr FILE="'.trim($row['fichero']).'" z='.$row['comprimido'].'>';
echo '<td>';
switch( trim($row['tipo']) ){
case 'L': echo 'Listado'; break;
case 'I': echo 'Informe'; break;
case 'R': echo 'Recuento'; break;
case 'E': echo 'Etiquetas'; break;
case 'F': echo 'Fichas'; break;
}
echo '<td>'.$DimFormato[$row['formato']];
if( $row['descargado'] == 0 ){
echo '<td id=ND>';
}else{
echo '<td>';
}
echo trim($row['descripcion']);
echo "<td>". str_replace(',','.',eNumberFormat($row['t_reg']));
echo '<td>'.$row['cdi'];
if( $MasInfo ){
echo '<td>'.$row['download'];
echo '<td>'.$row['estado'];
echo '<td>'.$row['sg'];
echo '<td>'.$row['descargado'];
echo '<td>'.$row['cd_gs_user'];
}
}
echo '</table>';
echo '</center>';
qFree();
?>
<DIV id=TablaTH STYLE="z-index:2; display:none; position:absolute;"></DIV>
<script type="text/javascript">
if( top.eIsWindow(window) ) top.eSWResize( window );
function LeerFile(){
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return;
if( null != FICHEROS.rows[0].cells[Obj.cellIndex].getAttribute('INFO') ){
top.eSWOpen(window,'edes.php?FcR:$a/d/usu_ficha.edf&_SEEK&cd_gs_user='+Obj.textContent, 'USUARIO', false );
return;
}
var ext = Obj.parentNode.FILE.substr( Obj.parentNode.FILE.indexOf('.') );
var Dato =	'<?= ( (isset($_DownloadFile)) ? $_DownloadFile : $_DownloadUrl ) ?>edes.php?E:$descarga.gs&'+
'F=' + escape(Obj.parentNode.FILE) +
'&H='+ escape(Obj.parentNode.cells[4].textContent) +
'&U=<?= $_User ?>';
DESCARGA.location.href = Dato;
Obj.parentNode.cells[2].id = '';
}
DGI("FICHEROS").onclick = LeerFile;
var _yHOrigen, _yEOrigen, _xVOrigen;
var _ColorOrigen  = DGI("FICHEROS").style.background;
var _VColorOrigen = '';
if( DGI("FICHEROS").rows.length > 1 ) _VColorOrigen = DGI("FICHEROS").rows[1].cells[0].style.background;
function TitulosON(){
var Origen  = DGI('FICHEROS');
var Destino = DGI('TablaTH');
Destino.innerHTML = '<table>'+Origen.rows[0].innerHTML+'</table>';
Destino.children[0].cellSpacing	= Origen.cellSpacing;
Destino.children[0].cellPadding	= Origen.cellPadding;
Destino.children[0].border			= Origen.border;
Destino.children[0].className		= 'Flotante';
Destino.children[0].id				= '';
_yHOrigen = Origen.parentNode.offsetTop + Origen.offsetTop;
Destino.style.width   = px(Origen.clientWidth);
Destino.style.posTop  = px(_yHOrigen);
Destino.style.posLeft = px(Origen.parentNode.offsetLeft + Origen.offsetLeft);
for(var n=0; n<Origen.rows[0].cells.length; n++){
if( Origen.rows[0].cells[n].id != 'o' ){
Destino.children[0].cells[n].style.width  = px(Origen.rows[0].cells[n].offsetWidth  - 6);
Destino.children[0].cells[n].style.height = px(Origen.rows[0].cells[n].offsetHeight + 1);
}
}
_xVOrigen = px(Origen.parentNode.offsetLeft + Origen.offsetLeft + Origen.offsetLeft);
}
function MovTitulos(){
if( _yHOrigen<document.body.scrollTop ){
DGI("TablaTH").style.display = 'block';
DGI("TablaTH").style.posTop  = px(document.body.scrollTop);
}else{
DGI("TablaTH").style.display = 'none';
}
}
TitulosON();
top.eLoading(false,window);
if( document.body.scrollHeight > document.body.clientHeight ) document.body.scroll = 'yes';
</SCRIPT>
<?PHP
echo '<IFRAME name="DESCARGA" src="" width="100%" height="0px" FRAMEBORDER=0px border=1px SCROLLING="auto"></IFRAME>';
?>
</BODY></HTML>
