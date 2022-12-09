<?PHP
if( !isset($_SESSION['_User']) ) exit;
if( isset($_GET['CHECK']) ){
list( $CdGsFormato, $CdGsEntidad, $NmGsFormato ) = explode( '|', urldecode( $_GET['CHECK'] ) );
$NmGsFormato = str_replace( "'", chr(92)."'", trim($NmGsFormato) );
if( $NmGsFormato=='' ){
?>
<SCRIPT type="text/javascript">
window.frameElement.WOPENER._ConChequeo = false;
</SCRIPT>
<?PHP
eEnd();
}
$CdGsFormato = trim($CdGsFormato);
$CdGsEntidad = trim($CdGsEntidad);
eInclude( $_Sql );
$YaExiste = false;
if( $CdGsFormato==0 ){
$YaExiste = qCount("{$_SESSION['ShareDictionary']}gs_formato", "cd_gs_entidad='{$CdGsEntidad}' and nm_gs_formato='{$NmGsFormato}'");
}else{
$YaExiste = qCount("{$_SESSION['ShareDictionary']}gs_formato", "cd_gs_entidad='{$CdGsEntidad}' and nm_gs_formato='{$NmGsFormato}' and cd_gs_formato!='{$CdGsFormato}'");
}
echo '<SCRIPT type="text/javascript">';
echo 'setTimeout("window.frameElement.WOPENER._ConChequeo = false;",250);';
if( $YaExiste > 0 ){
?>
top.eAlert( 209, 'El nombre del formato ya existe', 'A', 'W', window.frameElement.WOPENER.DGI("nm_gs_formato") );
window.frameElement.WOPENER.DGI("nm_gs_formato").value = '';
<?PHP
}
echo '</SCRIPT>';
eEnd();
}else{
if( !isset($MODO) ) die('Error:27');
}
eInclude( $_Sql, 'message' );
if( $MODO=='a' && $ENTIDAD=='' ){
$_TReg = qCount("{$_SESSION['ShareDictionary']}gs_entidad", "");
if( $_TReg == 0 ){
eMessage('NO HAY NINGUNA ENTIDAD CREADA','HES');
}else if( $_TReg == 1 ){
qSelect("{$_SESSION['ShareDictionary']}gs_entidad", 'cd_gs_entidad', '');
$row = qArray();
$ENTIDAD = $row['cd_gs_entidad'];
}else{
eInit();
$_Accion = 'l:$a/d/x_entidad.ldf';
$__='{#}eDes{#}';
include( $Dir_.'_lista.gs' );
eEnd();
}
}
if( isset($_SEEK) ){
if( substr_count($MODO, 'R')==0 ) $MODO = strtolower($_SEEK).'R';
$cd_gs_formato = str_replace("\\",'',str_replace("'",'',$cd_gs_formato));
}else{
if( !isset($cd_gs_formato) ){
$cd_gs_formato = $_Fila['cd_gs_formato'];
}else if( empty($cd_gs_formato) ){
$cd_gs_formato = $_Fila['cd_gs_formato'];
}
}
qQuery( "select export_level from gs_user where cd_gs_user={$_User}" );
$row = qArray();
$_export_level_ = trim($row['export_level'])*1;
if( empty($_export_level_) ) $_export_level_ = 0;
if( $_export_level_ == 0 ){
eMessage( 'USUARIO SIN NIVEL DE EXTRACCION', 'HS' );
}
$Activo = '';
$_TotalCampos	= 0;
$_TotalAncho	= 0;
$_Orden			= 0;
$OtraDB = '';
if( $_GET['_PERSISTENTDB']!='' ) $OtraDB = '&_PERSISTENTDB='.$_GET['_PERSISTENTDB'];
switch( $MODO ){
case 'a':
$cd_gs_formato	= '';
$grupo			= '';
$nm_gs_formato	= '';
$titulo_list	= '';
$descripcion	= '';
$cd_gs_entidad	= $ENTIDAD;
$NewModo		= 'A';
$VentanaTitulo	= 'INSERTAR ';
$Accion			= '<FORM NAME=DATOS AUTOCOMPLETE="off" METHOD=POST ACTION="edes.php?E:$a/d/listados_def.gs&MODO=A'.$OtraDB.'">';
$Boton			= '<table class="AddButton" onclick="AltaFormato()" border="0px" cellspacing="0px" cellpadding="0px" style="display:table"><tbody><tr><td class="ICONSUBMIT"><i class="ICONINPUT ICONINSERT">I</i></td><td style="padding-left:4px">Insertar</td></tr></tbody></table>';
qSelect("{$_SESSION['ShareDictionary']}gs_entidad", 'nm_gs_entidad', "cd_gs_entidad='{$cd_gs_entidad}'" );
$row = qArray();
$nm_gs_entidad = $row["nm_gs_entidad"];
break;
case 'A':
$nm_gs_formato = eEntityEncode($nm_gs_formato, false);
$descripcion = eEntityEncode($descripcion, false);
$nm_gs_formato = trim(stripslashes( $nm_gs_formato ));
$titulo_list = trim(stripslashes( $titulo_list ));
$descripcion = trim(stripslashes( $descripcion ));
sql_Inserta( 'gs_formato',
'cd_gs_user, cd_gs_entidad, formato, ordenacion, cabecera, operacion, grupo, nm_gs_formato, titulo_list, descripcion, cd_gs_user2, cd_gs_position, cd_gs_node, cd_gs_tree, cd_scope, informe',
"'{$_User}', '{$cd_gs_entidad}', '{$formato}', '{$ordenacion}', '{$cabecera}', '{$operacion}', '{$grupo}', '{$nm_gs_formato}', '{$titulo_list}', '{$descripcion}', '{$cd_gs_user2}', '{$cd_gs_position}', '{$cd_gs_node}', '{$cd_gs_tree}', '{$cd_scope}', ''", 'cd_gs_formato' );
$Id = qId();
qQuery( "select formato, ordenacion from gs_formato where cd_gs_formato={$Id}" );
$r = qArray();
$Formato = trim($r['formato']);
if( substr($Formato,-1)!='#' ){
$Formato = substr( $Formato, 0, strrpos($Formato,'#')+1 );
qQuery( "update gs_formato set formato='{$Formato}' where cd_gs_formato={$Id}" );
}
$Ordenacion = trim($r['ordenacion']);
if( substr($Ordenacion,-1)!='#' ){
$Ordenacion = substr( $Ordenacion, 0, strrpos($Ordenacion,'#')+1 );
qQuery( "update gs_formato set ordenacion='{$Ordenacion}' where cd_gs_formato={$Id}" );
}
PaginaPuente( 'a', 'FORMATO Insertado' );
break;
$MODO = 'a';
$cd_gs_formato	= '';
$grupo			= '';
$nm_gs_formato	= '';
$titulo_list	= '';
$descripcion	= '';
$NewModo = 'A';
$NewModo = 'a';
$VentanaTitulo = 'INSERTAR ';
$Accion = '<FORM NAME=DATOS AUTOCOMPLETE="off" METHOD=POST ACTION="edes.php?E:$a/d/listados_def.gs&MODO=A'.$OtraDB.'">';
$Boton 	 = '<table class="AddButton" onclick="AltaFormato()" border="0px" cellspacing="0px" cellpadding="0px" style="display:table"><tbody><tr><td class="ICONSUBMIT"><i class="ICONINPUT ICONINSERT">I</i></td><td style="padding-left:4px">Insertar</td></tr></tbody></table>';
$Activo = '';
break;
case 'bR':
case 'cR':
case 'mR':
$NewModo = str_replace( 'R', '', strtoupper( $MODO ) );
if( $cd_gs_formato=="" ){
qSelect('gs_formato', '*');
$Formato = qArray();
$cd_gs_formato = $Formato['cd_gs_formato'];
}else{
qSelect('gs_formato', '*', "cd_gs_formato='{$cd_gs_formato}'");
$Formato = qArray();
}
$Formato['formato'] = str_replace('##','#',$Formato['formato']);
$cd_gs_entidad	= $Formato['cd_gs_entidad'];
$formato		= $Formato['formato'];
$ordenacion		= $Formato['ordenacion'];
$cabecera		= $Formato['cabecera'];
$operacion		= $Formato['operacion'];
$grupo			= $Formato['grupo'];
$nm_gs_formato	= $Formato['nm_gs_formato'];
$titulo_list	= $Formato['titulo_list'];
$descripcion	= $Formato['descripcion'];
$cd_gs_user2	= $Formato['cd_gs_user2'];
$cd_gs_position	= $Formato['cd_gs_position'];
$cd_gs_node		= $Formato['cd_gs_node'];
$cd_gs_tree		= $Formato['cd_gs_tree'];
$cd_scope		= $Formato['cd_scope'];
$ListaCampos	= '#'.$Formato['formato'];
$ListaOrdenacion= '#'.$Formato['ordenacion'];
qSelect("{$_SESSION['ShareDictionary']}gs_entidad", 'nm_gs_entidad', "cd_gs_entidad='{$cd_gs_entidad}'");
$row = qArray();
$nm_gs_entidad = $row['nm_gs_entidad'];
switch( $MODO ){
case 'mR';
$Activo = '';
$VentanaTitulo = 'MODIFICAR ';
$Accion = '<FORM NAME=DATOS AUTOCOMPLETE="off" METHOD=POST ACTION="edes.php?E:$a/d/listados_def.gs&MODO=M'.$OtraDB.'">';
$Boton	 = '<table class="AddButton" onclick="AltaFormato()" border="0px" cellspacing="0px" cellpadding="0px" style="display:table"><tbody><tr><td class="ICONSUBMIT"><i class="ICONINPUT ICONUPDATE">U</i></td><td style="padding-left:4px">Modificar formato</td></tr></tbody></table>';
break;
case 'cR';
$NmScript = 'listados_def.edf';
$Activo = ' disabled';
$VentanaTitulo = 'CONSULTAR ';
$Accion = "<FORM NAME=DATOS AUTOCOMPLETE='off' METHOD=POST ACTION='edes.php?Fc:".'$'."a/d/{$NmScript}{$OtraDB}&_ASSIGN=c&cd_gs_entidad={$cd_gs_entidad}'>";
$Boton	 = '<table class="AddButton" onclick="AltaFormato()" border="0px" cellspacing="0px" cellpadding="0px" style="display:table"><tbody><tr><td class="ICONSUBMIT"><i class="ICONINPUT ICONVIEW">V</i></td><td style="padding-left:4px">Consultar formato</td></tr></tbody></table>';
break;
case 'bR';
$Activo = ' disabled';
$VentanaTitulo = 'BORRAR ';
$Accion = '<FORM NAME=DATOS AUTOCOMPLETE="off" METHOD=POST ACTION="edes.php?E:$a/d/listados_def.gs&MODO=B'.$OtraDB.'">';
$Boton	 = '<table class="AddButton" onclick="AltaFormato()" border="0px" cellspacing="0px" cellpadding="0px" style="display:table"><tbody><tr><td class="ICONSUBMIT"><i class="ICONINPUT ICONDELETE">D</i></td><td style="padding-left:4px">Borrar formato</td></tr></tbody></table>';
break;
}
break;
case 'M':
$nm_gs_formato = eEntityEncode($nm_gs_formato, false);
$descripcion = eEntityEncode($descripcion, false);
$nm_gs_formato = trim(stripslashes($nm_gs_formato));
$titulo_list = trim(stripslashes($titulo_list));
$descripcion = trim(stripslashes($descripcion));
$formato = str_replace('##','#',$formato);
$updateUser = "cd_gs_user='{$_User}', ";
if( $_SESSION["_WebMaster"]=="S" ) $updateUser = "";
$sTReg = qCount('gs_formato', "cd_gs_formato='{$cd_gs_formato}'");
sql_Modifica('gs_formato',
$updateUser.
"cd_gs_entidad='{$cd_gs_entidad}', formato='{$formato}', ".
"ordenacion='{$ordenacion}', cabecera='{$cabecera}', ".
"operacion='{$operacion}', grupo='{$grupo}', ".
'nm_gs_formato="'.$nm_gs_formato.'", titulo_list="'.$titulo_list.'", descripcion="'.$descripcion.'", '.
"cd_gs_user2='{$cd_gs_user2}', cd_gs_position='{$cd_gs_position}', cd_gs_node='{$cd_gs_node}', cd_gs_tree='{$cd_gs_tree}', cd_scope='{$cd_scope}', informe=''",
"cd_gs_formato='{$cd_gs_formato}'"
);
if(!$_Result ) sql_Error( $sql );
$_TReg = $sTReg;
if( $_DEBUG ) echo "[Reg.Modificados: {$_TReg}]<br>";
$Id = $cd_gs_formato;
qQuery( "select formato, ordenacion from gs_formato where cd_gs_formato={$Id}" );
$r = qArray();
$Formato = trim($r['formato']);
if( substr($Formato,-1)!='#' ){
$Formato = substr( $Formato, 0, strrpos($Formato,'#')+1 );
qQuery( "update gs_formato set formato='{$Formato}' where cd_gs_formato={$Id}" );
}
$Ordenacion = trim($r['ordenacion']);
if( substr($Ordenacion,-1)!='#' ){
$Ordenacion = substr( $Ordenacion, 0, strrpos($Ordenacion,'#')+1 );
qQuery( "update gs_formato set ordenacion='{$Ordenacion}' where cd_gs_formato={$Id}" );
}
PaginaPuente( 'm', 'FORMATO Modificado' );
break;
case 'C':
PaginaPuente( 'c', '-1' );
break;
case 'B':
sql_Borra( 'gs_formato',  "cd_gs_formato='{$cd_gs_formato}'" );
PaginaPuente( 'b', 'Formato BORRADO' );
break;
default:
eEnd();
}
function PaginaPuente( $Op, $Mensa ){
global $cd_gs_entidad;
eHTML();
eLink('ficha');
echo '<BODY onhelp="return false;" oncontextmenu="return false;">';
if( $Mensa != '-1' ) eMessage( $Mensa, 'HSV' );
echo '<script type="text/javascript">';
echo 'setTimeout( "OcultaRespuesta2()", 1500 );';
echo 'function OcultaRespuesta2(){';
if( $Op=='a' ){
echo "location.href = 'edes.php?E:".'$'."a/d/listados_def.gs&MODO={$Op}&ENTIDAD={$cd_gs_entidad}';";
}else{
echo "location.href = 'edes.php?F{$Op}:".'$'."a/d/listados_def.edf&_ASSIGN={$Op}&cd_gs_entidad={$cd_gs_entidad}';";
}
echo '}';
echo '</SCRIPT></BODY></HTML>';
eEnd();
}
function ListaDeCampos(){
global $_export_level_, $cd_gs_entidad;
global $ListaCampos;
$Grupo = array();
qQuery("select cd_gs_grupo, count(*) from {$_SESSION['ShareDictionary']}gs_campo where cd_gs_entidad='{$cd_gs_entidad}' and extraccion='S' and nivel>=0 and (nivel<={$_export_level_} or nivel is null) and (log_only<>'S' or log_only is null) group by cd_gs_grupo");
while( $row = qRow() ){
$Grupo[ $row[0] ] = (int)$row[1];
}
$sTitle = '';
$TCampos = 0;
$TGrupos = 0;
qSelect("{$_SESSION['ShareDictionary']}gs_campo as C, {$_SESSION['ShareDictionary']}gs_grupo as G", 'C.*,G.orden as g_orden,G.nm_gs_grupo as g_nm_grupo', "C.cd_gs_entidad='{$cd_gs_entidad}' and extraccion='S' and nivel>=0 and (C.nivel<={$_export_level_} or C.nivel is null) and (log_only<>'S' or log_only is null) and C.cd_gs_grupo=G.cd_gs_grupo", 'g_orden,g_nm_grupo,C.orden');
while( $row=qArray() ){
$TCampos++;
echo '<tr i='.$row['cd_gs_campo'].'>';
if( $sCodGrupo != $row['cd_gs_grupo'] ){
$TGrupos++;
echo '<td class=SelectOFF valign=top id="tabl'.$TGrupos.'"';
echo ' rowspan='.$Grupo[ $row['cd_gs_grupo'] ];
$sCodGrupo = $row['cd_gs_grupo'];
if( $TCampos == 1 ) echo ' width=119';
echo '>';
echo trim($row['g_nm_grupo']);
echo '</td>';
$sTitle = trim($row['g_nm_grupo']);
}
echo "<td id=S L='{$row['ancho']}' class=";
echo ( substr_count( $ListaCampos, '#'.$row['cd_gs_campo'].'#' ) > 0 ) ? 'SelectON' : 'SelectOFF';
echo " title='{$sTitle}'>";
echo str_replace('·',' ',trim($row['etiqueta']));
echo '</td>';
echo '</tr>';
}
}
function CamposSeleccionados(){
global $cd_gs_entidad, $_export_level_;
if( $GLOBALS[MODO]=='a' ) return;
global $ListaCampos, $ListaOrdenacion, $Formato;
global $_TotalAncho, $_TotalCampos, $_Orden;
$nLineas = 0;
$DimGrupo = array();
qQuery("select cd_gs_grupo,nm_gs_grupo from {$_SESSION['ShareDictionary']}gs_grupo order by 1");
while( $r=qRow() ) $DimGrupo[$r[0]] = trim($r[1]);
$tmp = explode('#',$ListaOrdenacion);
for( $n=1; $n<count($tmp)-1; $n++ ){
$DimOrden[$tmp[$n]] = $n;
$_Orden++;
}
$ListaNumCampos = str_replace('#' ,',',$Formato['formato']).",";
$ListaNumCampos = str_replace(' ' ,'' ,$ListaNumCampos);
$ListaNumCampos = str_replace(',,','' ,$ListaNumCampos);
if( $ListaNumCampos == ',' ) return;
$DimCampos = explode(',', $ListaNumCampos);
for( $n=0; $n<count($DimCampos); $n++ ){
qQuery( "select * from {$_SESSION['ShareDictionary']}gs_campo where cd_gs_campo={$DimCampos[$n]}" );
$DimCampo = qArray();
$sCodCampo = $DimCampo['cd_gs_campo'];
if( $sCodCampo == '' ) continue;
$sOrdenacion =' ';
if( substr_count( $ListaOrdenacion, '#'.$DimCampo['cd_gs_campo'].'#' ) > 0 ){
$sOrdenacion = $DimOrden[ $DimCampo['cd_gs_campo'] ];
}
$sEtiqueta	= trim($DimCampo['etiqueta']);
$sTitulo	= $DimGrupo[$DimCampo['cd_gs_grupo']].' : '.trim($DimCampo['etiqueta']);
$sAncho		= $DimCampo['ancho'];
$_TotalCampos++;
$_TotalAncho += $sAncho;
echo "<tr i={$sCodCampo} style='cursor:pointer'>";
echo "<td class='SelectOFF' style='cursor:pointer' id='C'>".$sOrdenacion;
echo "<td class='SelectOFF' style='cursor:pointer' title='{$sTitulo}'>".$sEtiqueta;
echo "<td class='SelectOFF'>".$sAncho;
}
}
eHTML();
?>
<LINK REL="stylesheet" HREF="<?=$_SESSION['_PathCSS']?>/listados_def.css" TYPE="text/css">
<style>
.Transparente {
background: transparent;
}
#FORM TD {
background: transparent;
}
#Titulo {
cursor:default;
}
#TLisCampos {
cursor:default;
}
#TSelCampos {
cursor:default;
}
.SelectOFF {
cursor:default;
}
#SelCampos {
cursor:pointer;
}
</style>
<?=_FileNoCache('edes.js')?>
<script type="text/javascript">
top.S.init(window,"all,tab");
document.onselectstart = new Function("return false");
if( window.name=='IWORK'){
if( top._Desktop<2 ) top.eAutoMenu(1);
}else{
top.eSWResize( window );
}
function ControlTeclado(){
var Obj = S.event(window);
Campo = Obj.name;
code = S.eventCode(event);
if( code==13 || code==9 ){
if( Obj.type=="select-one" ){
S.fieldNext(Obj);
}
S.eventClear(window);
return true;
}
return true;
}
var _ConChequeo = false;
function ExisteFormato(){
_ConChequeo = true;
top.eCallSrv( window, 'edes.php?E:$a/d/listados_def.gs&CHECK='+escape(DGI("cd_gs_formato").value+'|'+DGI("cd_gs_entidad").value+'|'+DGI("nm_gs_formato").value) );
}
function AceptaFicha(){
if( _ConChequeo ) return;
if( S.eventCode(event) == 121 ){
S.eventClear(window);
<?PHP
if( strtoupper($MODO[0])=='M' || strtoupper($MODO[0])=='A' ){
echo 'return AltaFormato();';
}else{
echo 'document.DATOS.submit();';
}
?>
return true;
}
}
function VerUso(Anchos){
if( Anchos==1 ){
LisCampos.parentNode.scrollTop = 20;
LisCampos.parentNode.scrollTop = 0;
setTimeout("VerUso(2)",100);
return;
}
var Obj = DGI("cd_scope"), Ver = 'none', n, m=0;
for(n=0; n<Obj.length; n++){
if( Obj[n].checked && Obj[n].value==1 ) Ver = 'block';
}
Obj = DGI("COMPARTIR");
if( Anchos!=undefined ){
Obj2 = S("SELECT", FORM[1]).dim;
for(n=0; n<Obj2.length; n++) m = Math.max( m, Obj2[n].offsetWidth );
for(n=0; n<Obj2.length; n++) Obj2[n].style.width = m+"px";
}
for(n=0; n<Obj.length; n++) Obj[n].style.display = Ver;
var TAncho = LisCampos.parentNode.offsetWidth+2,
aTD = LisCampos.rows[0].cells[0].offsetWidth-4;
TLisCampos.style.width = TAncho+"px";
TLisCampos.rows[1].cells[0].style.width = aTD+"px";
TLisCampos.rows[1].cells[2].style.width = (TAncho - LisCampos.offsetWidth - 5)+"px";
n = DGI("TSelCampos").parentNode.offsetWidth;
DGI("TSelCampos").style.width = (n+2)+"px";
S(".ScrollDes").css({width:n, height:S(".ScrollDes").obj.parentNode.offsetHeight-S("#TSelCampos").obj.offsetHeight-S("#FORM").obj.offsetHeight-4});
}
</SCRIPT>
</HEAD>
<BODY onload='UnZip();VerUso(1);' onhelp='return false;' oncontextmenu='return false;'>
<?PHP
qCount("{$_SESSION['ShareDictionary']}gs_campo", "cd_gs_entidad='{$cd_gs_entidad}' and extraccion='S' and nivel<={$_export_level_}");
if( $_TReg < 1 ){
eMessage('DATOS NO DISPONIBLES', 'HS');
}
echo $Accion;
?>
<CENTER>
<table cellspacing=0px cellpadding=5px height=100% style='background:transparent'>
<tr>
<td id=Titulo colspan=2 class=Transparente><?= $VentanaTitulo; ?>DEFINICION DE FORMATO PARA - <?= $nm_gs_entidad; ?></td>
</tr>
<tr>
<td valign='top' id=Todo class=Transparente style='background:transparent'>
<table id='TLisCampos' width='280px'>
<tr><th colspan=3>LISTA DE CAMPOS</th></tr>
<tr><th width=119>GRUPO</th><th>DATO</th><th width='11px'>&nbsp;</th></tr>
</table>
<div class='ScrollOri' style='overflow:auto; margin:0px;' onscroll='top.eScrollText(this,2)'>
<table id='LisCampos' style='position:relative;top:-1px;left:-1px' width='100%'>
<?PHP  ListaDeCampos(); ?>
</table>
</div>
</td>
<td valign='top' class=Transparente>
<table id='TSelCampos' width=100%>
<tr><th colspan=4>CAMPOS SELECCIONADOS</th></tr>
<tr><th width='25px' title='Ordenación'>Or</th><th width='258px' title='Título Columna'>DATO</th><th width='30px' title='Longitud'>Lg</th><th width='12px'>&nbsp;</th></tr>
</table>
<div class='ScrollDes' style='overflow:auto; margin:0px; width:100%; padding:0px;'>
<table id='SelCampos' class="col_2r" style='position:relative;top:-1px;left:-1px;cursor:pointer;'>
<?PHP  CamposSeleccionados(); ?>
</table>
</div>
<table id='FORM' width=100% cellspacing=0px cellpadding=0px border=0px style='padding-left:10px; padding-right:10px; border-collapse:collapse;' class='Contorno'>
<tr>
<th>Total&nbsp;Columnas</th><th width=100%><INPUT TYPE="text" SIZE=3 NAME="TCampos" VALUE="<?= $_TotalCampos; ?>" style="text-align:right" disabled></th>
<th width=100%></th>
<th>Total&nbsp;Caracteres</th><th><INPUT TYPE="text" SIZE=3 NAME="TLong" VALUE="<?= $_TotalAncho; ?>" style="text-align:right" disabled></th>
</tr>
</table>
</td>
</tr>
<tr>
<td colspan=2 height=100% class=Transparente>
<table id='FORM' cellspacing=0px cellpadding=0px width=100% border=0px style='cursor:default'>
<tr id=o><td id=TC>Cod.Formato</td><td><INPUT TYPE="text" SIZE=5 NAME="cd_gs_formato" VALUE="<?= $cd_gs_formato; ?>"></td></tr>
<tr id=o><td id=TC>Cod.Usuario</td><td><INPUT TYPE="text" SIZE=5 NAME="cd_gs_user" VALUE="<?= $_User; ?>"></td></tr>
<tr id=o><td id=TC>Cod.Entidad</td><td><INPUT TYPE="text" SIZE=5 NAME="cd_gs_entidad" VALUE="<?= $cd_gs_entidad; ?>"></td></tr>
<tr id=o><td colspan=2><HR></td></tr>
<tr id=o><td id=TC>Formato</td>		<td><TEXTAREA NAME="formato"	ROWS="3" COLS="50"></TEXTAREA></td></tr>
<tr id=o><td id=TC>Ordenación</td>	<td><TEXTAREA NAME="ordenacion"	ROWS="3" COLS="50"></TEXTAREA></td></tr>
<tr id=o><td id=TC>Cabecera</td>	<td><TEXTAREA NAME="cabecera"	ROWS="3" COLS="50"></TEXTAREA></td></tr>
<tr id=o><td id=TC>Operación</td>	<td><TEXTAREA NAME="operacion"	ROWS="3" COLS="50"></TEXTAREA></td></tr>
<tr id=o><td colspan=2><HR></td></tr>
<tr><td id=TC>Nombre Formato</td><td><INPUT TYPE="text" SIZE=60 NAME="nm_gs_formato" VALUE="<?= trim($nm_gs_formato); ?>"<?= $Activo; ?> onfocusout='ExisteFormato()' style="width:415px" onfocus="S.key('D',60,0)" tc="D"></td></tr>
<tr style='display:none'><td id=TC>Título Listado</td><td><TEXTAREA NAME="titulo_list" ROWS="2" COLS="62"<?= $Activo; ?>><?= trim($titulo_list); ?></TEXTAREA></td></tr>
<tr><td id=TC class=Transparente>Descripción</td>	  <td><TEXTAREA NAME="descripcion" ROWS="3" COLS="62"<?= $Activo; ?> style="width:415px" onfocus="S.key('#',2000,0)"><?= trim($descripcion); ?></TEXTAREA></td></tr>
<tr style='display:none'>
<td id=TC onclick='top.eHelp("$listados_def")' style='cursor:pointer'>Tipo de uso</td>
<td>
<INPUT TYPE="radio" NAME="cd_scope" VALUE=0<?=(($cd_scope==0)?' checked':'')?> style='border:0px;cursor:pointer' onclick='VerUso()'> Privado&nbsp;&nbsp;&nbsp;
<INPUT TYPE="radio" NAME="cd_scope" VALUE=1<?=(($cd_scope==1)?' checked':'')?> style='border:0px;cursor:pointer' onclick='VerUso()'> Compartido&nbsp;&nbsp;&nbsp;
<INPUT TYPE="radio" NAME="cd_scope" VALUE=2<?=(($cd_scope==2)?' checked':'')?> style='border:0px;cursor:pointer' onclick='VerUso()'> Público&nbsp;&nbsp;&nbsp;
<INPUT TYPE="hidden" NAME="informe" VALUE="">
</td>
</tr>
<tr id=COMPARTIR>
<td id=TC>Usuario</td>
<td><select name='cd_gs_user2'<?=(($MODO=="cR" || $MODO=="bR")?" disabled":"")?>><option value=''><?PHP
qQuery('select cd_gs_user, user_name, user_surname from gs_user where permission="S" order by user_name, user_surname');
while( $r=qArray() ) echo '<option value='.$r['cd_gs_user'].(($cd_gs_user2==$r['cd_gs_user'])?' selected':'').'>'.trim($r['user_name']).' '.trim($r['user_surname']);
?></select>
</td>
</tr>
<tr id=COMPARTIR>
<td id=TC>Cargo</td>
<td><select name='cd_gs_position'<?=(($MODO=="cR" || $MODO=="bR")?" disabled":"")?>><option value=''><?PHP
qQuery( 'select * from gs_position order by nm_gs_position' );
while( $r=qArray() ) echo '<option value='.$r['cd_gs_position'].(($cd_gs_position==$r['cd_gs_position'])?' selected':'').'>'.$r['nm_gs_position'];
?></select>
</td>
</tr>
<tr id=COMPARTIR>
<td id=TC>Local</td>
<td><select name='cd_gs_node'<?=(($MODO=="cR" || $MODO=="bR")?" disabled":"")?>><option value=''><?PHP
qQuery( 'select cd_gs_node, nm_gs_node from gs_node order by nm_gs_node' );
while( $r=qArray() ) echo '<option value='.$r['cd_gs_node'].(($cd_gs_node==$r['cd_gs_node'])?' selected':'').'>'.$r['nm_gs_node'];
?></select>
</td>
</tr>
<tr id=COMPARTIR>
<td id=TC>Arbol</td>
<td><select name='cd_gs_tree'<?=(($MODO=="cR" || $MODO=="bR")?" disabled":"")?>><option value=''><?PHP
qQuery("select cd_gs_tree, nm_gs_tree from {$_SESSION['ShareDictionary']}gs_tree order by nm_gs_tree");
while( $r=qArray() ) echo '<option value='.$r['cd_gs_tree'].(($cd_gs_tree==$r['cd_gs_tree'])?' selected':'').'>'.$r['nm_gs_tree'];
?></select>
</td>
</tr>
<tr><td colspan=2><CENTER><?= $Boton; ?></CENTER></td></tr>
</table>
</td>
</tr>
</table>
</CENTER>
</FORM>
<?PHP
?>
<script type="text/javascript">
function eClearEvent(men){
try{
if( event==null ) return false;
S.eventClear(window);
if( null!=men ) alert(S.lng(216));
}catch(e){}
return false;
}
function ConfigRow( row ){
row.cells[0].width = (TSelCampos.rows[1].cells[0].offsetWidth-4)+'px';
row.cells[1].width = (TSelCampos.rows[1].cells[1].offsetWidth-4)+'px';
row.cells[2].width = (TSelCampos.rows[1].cells[2].offsetWidth-4)+'px';
row.cells[0].className='SelectOFF';
row.cells[1].className='SelectOFF';
row.cells[2].className='SelectOFF';
row.cells[0].id = 'C';
row.cells[2].id = 'D';
}
if( SelCampos.rows.length>1 ) ConfigRow(SelCampos.rows[0]);
function LisCampo(){
if( S.event(window).tagName!='TD' ) return;
var Obj = S.event(window),
Grupo = '';
if( Obj.parentNode.cells.length==2 && Obj.cellIndex==0 ) return;
if( Obj.parentNode.cells.length==2 ){
Grupo = Obj.parentNode.cells[0].textContent;
}else{
var Obj2 = Obj.parentNode;
for(var n = Obj.parentNode.rowIndex-1; n>=0; n--){
if( LisCampos.rows[n].cells.length==2 ){
Grupo = LisCampos.rows[n].cells[0].textContent;
break;
}
}
}
if( Obj.className=='SelectOFF' ){
if( DATOS.TCampos.value>=100 ){
top.eAlert(S.lng(209), 'Solo se pueden extraer "99" campos', 'A', 'W');
return false;
}
Obj.className = 'SelectON';
var row = SelCampos.insertRow();
row.insertCell(0).textContent = '';
row.insertCell(1).textContent = Obj.textContent;
row.insertCell(2).textContent = Obj.getAttribute("L");
row.cells[0].style.cursor = row.cells[1].style.cursor = 'pointer';
row.cells[1].title = Grupo+': '+Obj.textContent;
ConfigRow( row );
row.setAttribute("i", Obj.parentNode.getAttribute("i"));
DATOS.TCampos.value++;
if( isNaN( parseInt(DATOS.TLong.value) ) ){
DATOS.TLong.value = Obj.getAttribute("L");
}else{
DATOS.TLong.value = ( parseInt(DATOS.TLong.value) + parseInt(Obj.getAttribute("L")) );
}
}else if( Obj.className == 'SelectON' ){
Obj2 = SelCampos.rows;
for(var n=0; n<Obj2.length; n++){
if( Obj2[n].getAttribute("i")==Obj.parentNode.getAttribute("i") ){
RestaOrden( Obj2[n].rowIndex );
Obj.className = 'SelectOFF';
DATOS.TCampos.value--;
DATOS.TLong.value = (parseInt(DATOS.TLong.value) - parseInt(Obj2[n].cells[2].textContent));
SelCampos.deleteRow(Obj2[n].rowIndex);
_Mover = false;
break;
}
}
}
}
var _Mover = false,
_Fila = 0,
_Orden = <?= $_Orden; ?>;
function SelCampo(){
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return;
if( Obj.cellIndex == 0 ){
if( Obj.textContent.replace(/\s/g,"") == '' ){
if( _Orden < 7 ){
Obj.textContent = ++_Orden;
}else{
top.eAlert( S.lng(209), 'Solo se puede ordenar por 7 campos', 'A', 'W' );
}
}else{
RestaOrden( Obj.parentNode.rowIndex );
}
return;
}
if( Obj.cellIndex != 1 ) return;
if( _Mover ){
Obj.className = 'SelectOFF';
if( Obj.parentNode.rowIndex > _Fila ){
var row = SelCampos.insertRow( Obj.parentNode.rowIndex+1 );
row.setAttribute("i", SelCampos.rows[_Fila].getAttribute("i"));
row.insertCell(0).textContent = SelCampos.rows[_Fila].cells[0].textContent;
row.insertCell(1).textContent = SelCampos.rows[_Fila].cells[1].textContent;
row.insertCell(2).textContent = SelCampos.rows[_Fila].cells[2].textContent;
row.cells[1].title = SelCampos.rows[_Fila].cells[1].title;
SelCampos.deleteRow( _Fila );
}else{
var row = SelCampos.insertRow( Obj.parentNode.rowIndex );
row.setAttribute("i", SelCampos.rows[_Fila+1].getAttribute("i"));
row.insertCell(0).textContent = SelCampos.rows[_Fila+1].cells[0].textContent;
row.insertCell(1).textContent = SelCampos.rows[_Fila+1].cells[1].textContent;
row.insertCell(2).textContent = SelCampos.rows[_Fila+1].cells[2].textContent;
row.cells[1].title = SelCampos.rows[_Fila+1].cells[1].title;
SelCampos.deleteRow( _Fila+1 );
}
row.cells[0].style.cursor = row.cells[1].style.cursor = 'pointer';
ConfigRow( row );
}else{
Obj.className = 'SelectON';
_Fila = Obj.parentNode.rowIndex;
}
_Mover = !_Mover;
}
function RestaOrden( nFila ){
var Obj = SelCampos.rows[ nFila ].cells[0],
sOrd = Obj.textContent,
Obj2 = SelCampos.rows, n;
if( sOrd=='' ) return;
for(n=0; n<Obj2.length; n++){
if( Obj2[n].cells[0].textContent>sOrd ){
Obj2[n].cells[0].textContent = parseInt(Obj2[n].cells[0].textContent)-1;
}
}
_Orden--;
Obj.textContent = '';
}
function _ModCampo( Op, Valores, Para ){
if( Op!=2 ) return;
Para[0].textContent = Valores[0];
}
function ModCampo(){
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return;
if( Obj.cellIndex != 1 ) return;
_Mover = false;
Obj.className = 'SelectOFF';
top.eAlert('','ENTRADA DE DATOS','A,C','g/sys_keyboard.gif', _ModCampo, Array(Array('Nuevo título\nde columna',30,'^[0-9A-Za-zÇçÜúÑñ ªº\'".,/()-]*$','^[0-9A-Za-zÇçÜúÑñ ªº\'".,/()-]*$',Obj.textContent)), Array( Obj ) );
eClearEvent();
}
function AltaFormato(){
if( _ConChequeo ){
if( !top.__eAlert && top.DGI("ALERT").offsetWidth==0 ) setTimeout('AltaFormato()',250);
return;
}
var n, error = 0;
Compacta( document.DATOS.nm_gs_formato );
Compacta( document.DATOS.titulo_list );
document.DATOS.formato.value = '';
document.DATOS.ordenacion.value = '';
document.DATOS.cabecera.value = '';
document.DATOS.operacion.value = '';
var Orden = new Array();
for( n=0; n<SelCampos.rows.length; n++ ){
document.DATOS.formato.value += SelCampos.rows[n].getAttribute("i") + '#';
if( SelCampos.rows[n].cells[0].textContent.replace(/\s/g,"") != "" ){
Orden[ SelCampos.rows[n].cells[0].textContent ] = SelCampos.rows[n].getAttribute("i");
}
}
for( n=1; n<Orden.length; n++ ){
document.DATOS.ordenacion.value += Orden[n] + '#';
}
if( document.DATOS.nm_gs_formato.value.length == 0 ){
top.eAlert( S.lng(209), 'Falta el campo "Nombre Formato"', 'A', 'W' );
return false;
}
if( document.DATOS.titulo_list.value.length == 0 ){
}
if( document.DATOS.formato.value.length == 0 ){
top.eAlert( S.lng(209), 'No se ha seleccionado ningún campo', 'A', 'W' );
return false;
}
if( document.DATOS.ordenacion.value.length == 0 ){
top.eAlert( S.lng(209), 'No se ha seleccionado ninguna ordenación', 'A', 'W' );
return false;
}
if( document.DATOS.formato.value.length >= 500 ){
alert( 'Demasiados campos' ); error++;
}
if( document.DATOS.cabecera.value.length >= 255 ){
alert( 'Demasiado texto de cabecera' ); error++;
}
if( document.DATOS.operacion.value.length >= 255 ){
alert( 'Demasiadas operaciones' ); error++;
}
if( error == 0 ){
document.DATOS.titulo_list.value = escape(document.DATOS.titulo_list.value);
document.DATOS.descripcion.value = escape(document.DATOS.descripcion.value);
document.DATOS.submit();
}
return( error==0 );
}
function UnZip(){
document.DATOS.titulo_list.value = unescape(document.DATOS.titulo_list.value);
document.DATOS.descripcion.value = unescape(document.DATOS.descripcion.value);
}
function Compacta( Obj ){
while( Obj.value.indexOf('  ', 0) != -1 ) Obj.value = Obj.value.replace('  ', ' ');
while( Obj.value.substring(0,1) == ' ' ) Obj.value = Obj.value.substring(1, Obj.value.length);
}
<?PHP  if( empty($Activo) ){ ?>
DGI("LisCampos").onclick = LisCampo;
DGI("SelCampos").onclick = SelCampo;
DGI("SelCampos").ondblclick = ModCampo;
document.DATOS.onkeypress = ControlTeclado;
<?PHP  } ?>
document.onkeydown = AceptaFicha;
top.eLoading(false,window);
</script>
</BODY>
</HTML>
<?PHP  eEnd(); ?>
