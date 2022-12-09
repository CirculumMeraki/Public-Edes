<?PHP
if( !isset($_SESSION['_User']) ){
include('index.htm');
exit;
}
$_DEBUG = 0;
$UrlPDF = '';
if( count($_POST)==0 ){
list($txt) = explode('&_CALL=', $_SERVER["QUERY_STRING"]);
list($txt) = explode('&_PSOURCE=', $txt);
$UrlPDF = $txt;
list($Tabla, $Indice, $Valor, $Script) = explode('|', $txt);
$_POST["clave"] = $Valor;
$_POST["tabla"] = $Tabla;
}else{
$Valor = $_POST["clave"];
$Tabla = $_POST["tabla"];
}
eLngLoad('$lng/loghistory.gs');
$_DimOp['A'] = substr(eLng('A: Alta'),strlen($_LanguageTron),1);
$_DimOp['B'] = substr(eLng('B: Baja'),strlen($_LanguageTron),1);
$_DimOp['M'] = substr(eLng('M: Modificación'),strlen($_LanguageTron),1);
$_no_fields = str_replace(' ', '', $_no_fields);
if( $_no_fields!='' ) $_no_fields = ','.$_no_fields.',';
include_once($Dir_.'message.inc');
if( !isset($_no_fields) ) $_no_fields='';
$_no_fields = trim($_no_fields).',';
if( $_no_fields[0] != ',' ) $_no_fields = ','.$_no_fields;
if( !isset($_change_fields) ) $_change_fields='';
$_change_fields = trim($_change_fields).',';
if( $_change_fields[0]!=',' ) $_change_fields = ','.$_change_fields;
$DimChange = array();
$DimNewValor = array();
$tmp = explode(',',$_change_fields);
for($n=0; $n<count($tmp); $n++){
list($o, $d) = explode('=', $tmp[$n]);
$DimChange[trim($o)] = trim($d);
}
if( empty($_POST["clave"]) ){
eMessage( eLng('Necesita introducir el valor de la clave'), 'EHS' );
}
$PkUser = $_SESSION['_User'];
$Log = $CampoLog = '';
$AddCampos = 0;
$AddTH = array();
if( !empty($_POST["_log_"]) ){
$Log = str_replace(' ','',$_POST["_log_"]);
$txt = explode(',',$Log);
$CampoLog = '';
for($n=0;$n<count($txt); $n++){
$CampoLog .= ', U.'.$txt[$n];
$AddTH[] = $txt[$n];
}
$AddCampos = substr_count($CampoLog,',');
if( $_POST["_log_title_"]!='' ){
$AddTH = array();
$txt = explode(',',$_POST["_log_title_"]);
for( $n=0;$n<count($txt); $n++ ) $AddTH[] = $txt[$n];
}
}
include_once($Dir_.$_Sql.'.inc');
if( file_exists("../_datos/config/log_tab_{$Tabla}.inc") ){
include("../_datos/config/log_tab_{$Tabla}.inc");
if( $_RelationFields!='' ) $_RelationFields = ','.$_RelationFields.',';
}
if( $Script!='' ) include( $Script );
$_ValueRelationFields = array();
$LabelTabla = $_POST["tabla"];
$DimFuncUser = get_defined_functions();
$_SufijoLanguage = '';
if( qCount("{$_SESSION['ShareDictionary']}gs_language", "tf_translation='S'")>0 ) $_SufijoLanguage = '_'.$_SESSION['_LANGUAGE_'];
if( qCount("{$_SESSION['ShareDictionary']}gs_language")==1 ) $_SufijoLanguage = '';
qQuery("select export_level from gs_user where cd_gs_user='{$_User}'");
list( $ExportLevel ) = qRow();
qQuery("select nm_gs_entidad from {$_SESSION['ShareDictionary']}gs_entidad where tabla='{$LabelTabla}'");
$row = qRow();
if( $row[0]!='' ) $LabelTabla = trim($row[0]);
qQuery("delete from gs_log_tmp where pk_user={$PkUser}");
if( $_DEBUG==1 ) eTrace('---> USER: '.$_User );
$DimVerSiNoSystem = array();
qQuery("select campo, log_history from {$_SESSION['ShareDictionary']}gs_campo where tabla='".$_POST["tabla"]."' and log_history<>'N' and log_no_system='S'");
while( $row=qRow() ){
if( $_DEBUG==1 ) eTrace('---> Log si no es Sistema: '.$row[0] );
$DimVerSiNoSystem[$row[0]] = 'S';
}
$DimLogHistory = array();
qQuery("select campo, log_history from {$_SESSION['ShareDictionary']}gs_campo where tabla='".$_POST["tabla"]."' and log_history<>'N'");
while( $row=qRow() ){
$DimLogHistory[$row[0]] = trim($row[1]);
}
$DimTablas = Array();
$DimDato = Array();
$Dim = Array();
$DimCAMPO = array();
$DimTablaLog = array('gs_log');
$ayo = substr(date('Y'),2);
while( qExists('gs_log_'.$ayo) ){
$DimTablaLog[] = 'gs_log_'.$ayo;
$ayo--;
}
for($tl=0; $tl<count($DimTablaLog); $tl++){
$TablaLog = $DimTablaLog[$tl];
$sql = "select
L.cdi,L.cd_gs_user,L.operacion,L.tabla,L.clave,L.sqlexe,
U.user_surname, U.user_name {$CampoLog}
from
{$TablaLog} L, gs_user U
where L.clave='".$_POST["clave"]."' and L.tabla='".$_POST["tabla"]."' and L.cd_gs_user=U.cd_gs_user
order by L.cdi";
$sql = "select
L.cdi,L.cd_gs_user,L.operacion,L.tabla,L.clave,L.sqlexe,
U.user_surname, U.user_name {$CampoLog}
from
{$TablaLog} L left join gs_user U on L.cd_gs_user=U.cd_gs_user
where L.clave='".$_POST["clave"]."' and L.tabla='".$_POST["tabla"]."'
order by L.cdi";
qQuery($sql);
while( $row=qArray() ){
$DimTablas[$row['tabla']] = 1;
$dat = str_replace("\n", "<br>", $row['sqlexe']);
$tmp = array();
$t = strlen($dat);
$esCampo = true;
$esTxt = false;
$valor = "";
$ultimaComilla = "";
$ultimoChr = "";
for($n=0; $n<$t; $n++){
$c = substr($dat, $n, 1);
switch( $c ){
case '"':
case "'":
if( $ultimoChr=='\\' ){
$valor .= $c;
}else if( $ultimaComilla=="" ){
$ultimaComilla = $c;
$esTxt = true;
}else if( $ultimaComilla==$c ){
$ultimaComilla = "";
$esTxt = false;
}else{
$valor .= $c;
}
break;
case "=":
if( $ultimaComilla=="" ){
$esCampo = false;
$campo = $valor;
$valor = "";
}else{
$valor .= $c;
}
break;
case ",":
case "|":
if( $ultimaComilla=="" ){
$esCampo = true;
if( $valor=="NULL" ) $valor = "";
else if( substr_count($valor, '%20')>1 ) $valor = urldecode($valor);
if( substr_count($_no_fields, ",{$campo},")==0 ){
$valor = str_replace(array("'",'"'), array('&#39;','&#34;'), $valor);
$tmp[] = [$campo, $valor];
}
$campo = "";
$valor = "";
}else{
$valor .= $c;
}
break;
case '\\':
break;
default:
$valor .= $c;
}
$ultimoChr = $c;
}
if( $valor=="NULL" ) $valor = "";
else if( substr_count($valor, '%20')>1 ) $valor = urldecode($valor);
if( substr_count($_no_fields, ",{$campo},")==0 ){
$valor = str_replace(array("'",'"'), array('&#39;','&#34;'), $valor);
$tmp[] = [$campo, $valor];
}
for($n=0; $n<count($tmp); $n++){
list($campo, $valor) = $tmp[$n];
if( $Dim[$campo]['control']!=1 || $DimDato[$campo]!=$valor ){
$Dim[$campo]['control'] = 1;
if( substr_count($_RelationFields, ",{$campo},")>0 ) $_ValueRelationFields[$row['cdi']][$campo] = $valor;
qQuery("insert into gs_log_tmp (pk_user, cdi,operacion,cd_gs_user,tabla,campo,valor) values
( {$PkUser}, '".$row['cdi']."','".$row['operacion']."','".$row['cd_gs_user']."','".$row['tabla']."','".$campo."','".$valor."')", $pnt);
}
$DimDato[$campo] = $valor;
}
}
}
if( count($DimDato)==0 ) eMessage('~NR', 'HSE');
$Definicion = Array();
$DimTipoDato = array(
'BIGINT'=>'N',
'DEC'=>'N',
'DECIMAL'=>'N',
'DOBLE PRECISION'=>'N',
'DOUBLE'=>'N',
'FLOAT'=>'N',
'FLOAT'=>'N',
'INT'=>'N',
'INT8'=>'N',
'INTEGER'=>'N',
'MEDIUMINT'=>'N',
'MONEY'=>'N',
'NUMBER'=>'N',
'NUMERIC'=>'N',
'REAL'=>'N',
'SERIAL'=>'N',
'SERIAL8'=>'N',
'SMALLFLOAT'=>'N',
'SMALLINT'=>'N',
'TINYINT'=>'N',
'DATE'=>'F',
'DATETIME'=>'F',
'TIME'=>'F',
'TIMESTAMP'=>'F',
'YEAR TO DAY'=>'F'
);
if( eSqlType('mysql,mysqli') ){
foreach( $DimTablas as $Tabla=>$v ){
qQuery("SHOW FIELDS FROM {$Tabla}");
while( $row=qArray() ){
list($Tipo, $Longitud) = explode('(', $row['Type']);
$Tipo = strtoupper(trim($Tipo));
$row['Field'] = trim($row['Field']);
$Definicion[$Tabla][$row['Field']] = $Tipo;
}
}
}else if( eSqlType('pdo.informix') ){
}else if( eSqlType('informix') ){
}else if( eSqlType('oracle') ){
}else{
exit;
}
if( eSqlType('mysql,mysqli') ){
qQuery("select count(distinct(C.cd_gs_grupo)) from gs_log_tmp L, {$_SESSION['ShareDictionary']}gs_campo C where L.pk_user={$PkUser} and L.tabla=C.tabla and L.campo=C.campo and C.log_history<>'N'");
}else{
qQuery("select count(distinct C.cd_gs_grupo)  from gs_log_tmp L, {$_SESSION['ShareDictionary']}gs_campo C where L.pk_user={$PkUser} and L.tabla=C.tabla and L.campo=C.campo and C.log_history<>'N'");
}
list($TotalGrupos) = qRow();
$Ultimo = '';
$NRepetidos = 0;
qQuery("select * from gs_log_tmp where pk_user={$PkUser} order by tabla,campo,cdi,valor", $p1);
while( $r=qArray($p1) ){
$OldValor = $r['valor'];
$r['valor'] = str_replace(' ','',trim($r['valor']));
$r['valor'] = str_replace(chr(10),'',$r['valor']);
$r['valor'] = str_replace(chr(13),'',$r['valor']);
$ValorActual = trim($r['tabla']).'|'.trim($r['campo']).'|'.trim($r['valor']);
if( $Ultimo == $ValorActual ){
$NRepetidos++;
qQuery("update gs_log_tmp set borrar='S' where pk_user={$PkUser} and tabla='{$r[tabla]}' and campo='{$r[campo]}' and cdi='{$r[cdi]}'", $p2);
}
$Ultimo = $ValorActual;
}
if( $NRepetidos>0 ) qQuery("delete from gs_log_tmp where pk_user={$PkUser} and borrar='S'");
$n = 0;
qQuery("select C.cd_gs_grupo, C.orden, count(*) from gs_log_tmp L, {$_SESSION['ShareDictionary']}gs_campo C where L.pk_user={$PkUser} and L.tabla=C.tabla and L.campo=C.campo and C.log_history<>'N' group by C.cd_gs_grupo, C.orden order by C.cd_gs_grupo, C.orden");
$DimRowSpan = array();
while( $r=qRow() ){
$DimRowSpan[trim($r[0]).'.'.trim($r[1])] = $r[2];
$n++;
}
if($n==0) eMessage('NO HAY DEFINICION EN EL LOG PARA ESTA TABLA', 'HSE', 5);
if( !eSqlType('mysql,mysqli') ){
$sql = "select
G.nm_gs_grupo{$_SufijoLanguage}, C.etiqueta{$_SufijoLanguage}, L.valor, L.operacion, L.cdi, (U.user_name||' '||U.user_surname) nombre,
L.cd_gs_user, L.tabla, L.campo,
C.tipo_log, C.decimales, C.cd_gs_grupo, C.orden COrden,
G.orden GOrden, C.label_tab{$_SufijoLanguage}, C.tipo
{$CampoLog}
from
gs_log_tmp L,
gs_user U,
{$_SESSION['ShareDictionary']}gs_campo C,
{$_SESSION['ShareDictionary']}gs_grupo G
where
L.pk_user={$PkUser} and
L.cd_gs_user=U.cd_gs_user and
L.tabla=C.tabla and
L.campo=C.campo and
C.cd_gs_grupo=G.cd_gs_grupo and
C.log_history<>'N' and
(C.nivel<={$ExportLevel})
order by
C.cd_gs_grupo, COrden, L.tabla, L.campo, L.cdi
";
}else{
$sql = "select
G.nm_gs_grupo{$_SufijoLanguage}, C.etiqueta{$_SufijoLanguage}, L.valor, L.operacion, L.cdi, concat(trim(U.user_name),' ',trim(U.user_surname)) nombre,
L.cd_gs_user, L.tabla, L.campo,
C.tipo_log, C.decimales, C.cd_gs_grupo, C.orden COrden,
G.orden GOrden, C.label_tab{$_SufijoLanguage}, C.tipo
{$CampoLog}
from
gs_log_tmp L,
gs_user U,
{$_SESSION['ShareDictionary']}gs_campo C,
{$_SESSION['ShareDictionary']}gs_grupo G
where
L.pk_user={$PkUser} and
L.cd_gs_user=U.cd_gs_user and
L.tabla=C.tabla and
L.campo=C.campo and
C.cd_gs_grupo=G.cd_gs_grupo and
C.log_history<>'N' and
(C.nivel<={$ExportLevel})
order by
C.cd_gs_grupo, COrden, L.tabla, L.campo, L.cdi
";
}
qQuery($sql);
eHTML('$loghistory.gs');
?>
<SCRIPT type="text/javascript">
document.title = "LIST";
top.S.init(window,"all,list");
</SCRIPT>
<?=_FileNoCache('edes.js')?>
<!--< ?= eLink('lista') ? >-->
<style>
body, html {
height:100%;
width:100%;
}
TH {
CURSOR:default;
}
TD {
CURSOR:default;
}
IMG {
CURSOR:default;
}
TH, #GR1 {
font-size:100%;
}
#h {
cursor:pointer;
}
@media screen {
#GROUPTITLE {
display:none;
}
}
@media print {
#GROUPTITLE {
display:block;
}
}
#ColDatos {
white-space:pre; white-space:pre-wrap; white-space:pre-line; white-space:-pre-wrap; white-space:-o-pre-wrap; white-space:-moz-pre-wrap; white-space:-hp-pre-wrap; word-wrap:break-word;
}
#BROWSE2ID td:nth-child(1){
-font-family: Arial;
}
#BROWSEID td:nth-child(5){
-font-family: Arial;
}
</style>
<SCRIPT type="text/javascript">
function Ini(parar){
if( top.eIsWindow(window) ){
top.eSWResize(window);
top.eSWView(window);
S("#GROUPTITLE").none();
}
top.eScrollTH(BROWSEID);
top.eScrollTH(BROWSE2ID);
CONTENEDOR.style.width = document.body.clientWidth+"px";
BROWSEID.style.width = (S("#ColMovimientos").css("width")-20)+"px";
var AnchoCelda = BROWSE.rows[0].cells[1].offsetWidth,
NewAncho = BROWSEID.parentNode.offsetWidth-BROWSE.offsetWidth+AnchoCelda,
Obj = DGI("ColDatos"),
n;
DGI("ColDatosTH").style.width = NewAncho+"px";
for(n=0; n<Obj.length; n++) Obj[n].style.width = NewAncho+"px";
BROWSE.style.width = (BROWSEID.parentNode.offsetWidth-25)+"px";
S.tableFit(BROWSE);
if( typeof(parar)=="undefined" ){
setTimeout(function(){
Ini(1);
}, 500);
return;
}
document.body.visibility = "visible";
<?PHP if( $_SESSION['_D_']=='~' ){ ?>
setTimeout(function(){
document.body.oncontextmenu = null;
}, 2000);
<?PHP } ?>
}
<?PHP
echo 'function CargarPDF2(){';
echo "top.eCallSrv(window, 'edes.php?E:".'$'."loghistory.gs&{$UrlPDF}&_ByPDF=1');";
echo '}';
echo 'function CargarPDF(){';
eLngLoad('../../edesweb/lng/message', '', 1);
echo "top.eInfo(window,'{$__Lng[72]}');";
echo 'setTimeout("CargarPDF2()",1);';
echo '}';
?>
</SCRIPT>
<?PHP
echo '</HEAD><BODY onload=Ini() style="visibility:hidden">';
if( $_SESSION['_PDF_']=='S' && $UrlPDF!='' ) echo '<img src="g/l_d_pdf.gif" style="position:absolute;top:5px;right:5px;cursor:pointer;" onclick="CargarPDF()">';
echo '<CENTER style="height:100%">';
echo '<table id=CONTENEDOR border=0px cellspacing=0px cellpadding=0px style="display:table;background-color:transparent;height:100%;width:1px;">';
?>
<TR class=TITULO height=1px><TD align=center colspan=2>
<TABLE class=TITULO id=GROUPTITLE cellspacing=0px cellpadding=0px style='background:transparent;'>
<tbody style="display:inline">
<tr><td id=TITULO align=center nowrap style='cursor:default;background:transparent'><?=eLng('HISTÓRICO DE MOVIMIENTOS')?></td></tr>
</tbody>
</TABLE>
</TD></TR>
<?PHP
echo '<TR class=TITULO height=1px style="padding-top:2px"><TD align=center id=ColMovimientos>'.eLng('MOVIMIENTOS').'</TD><TD align=center id=ColResumen>'.eLng('RESUMEN').'</TD></TR>';
echo '<TR><TD align=center style="margin:0px; padding:0px; vertical-align:top; background-color:transparent;">';
echo '<SPAN id=BROWSEID onscroll=top.eScrollTH(this) style="display:block; border:0px solid red; height:100%; overflow-y:scroll; padding:0px; margin:0px;">';
echo '<TABLE id="BROWSE" class="BROWSE col_0n col_3c" onclick=Linea() oncontextmenu=Todo() style="display:table;">';
echo '<COLGROUP>';
if( $TotalGrupos==1 || true ){
echo '<COL style="display:none">';
}else{
echo '<COL class=Celda>';
}
echo '<COL class=Celda style="font-size:110%;font-weight:bold;white-space:wrap;">';
echo '<COL class=Celda id=ColDatos width=100px style="white-space:normal;">';
echo '<COL class=Celda style="text-align:center"><COL class=Celda><COL class=JSOnClickRow style="cursor:pointer;">';
if( $AddCampos > 0 ) for($n=0; $n<$AddCampos; $n++) echo '<COL class=Celda>';
echo '</COLGROUP>';
echo '<tr style="position:relative; top:0px; left:-1px">';
echo '<th>'.eLng('GRUPO').'</th>';
echo '<th>'.eLng('DATO').'</th>';
echo '<th id=ColDatosTH>'.eLng('VALOR').'</th>';
echo "<th title='".eLng('A: Alta')."\n".eLng('M: Modificación')."'>".eLng('OP').'</th>';
echo '<th>'.eLng('FECHA Y HORA').'</th>';
echo '<th>'.eLng('USUARIO').'</th>';
if( $AddCampos>0 ) for($n=14; $n<14+$AddCampos; $n++) echo '<TH>'.strtoupper($AddTH[$n-14]).'</TH>';
echo '</tr>';
$_vF = array();
$LineaPar = true;
$Ultimo = '#';
$DimCDI = array();
$ViewFolder = eFileGetVar('LogHistory');
$nLinea = -1;
$usuCursor = array();
while( $r=qRow() ){
$nLinea++;
if( $_ByPDF ) $usuCursor[$nLinea] = array();
if( $TotalGrupos>1 && $r[0]!=$UltimoGrupo ){
$UltimoGrupo = $r[0];
echo '<tr><td><td id=GR1 colspan='.(5+$AddCampos).'>';
echo '<i class="ICONINPUT" style="font-size:50%;margin-right:4px;vertical-align:middle !important;">'.(($ViewFolder)?'d':'c').'</i>';
echo $r[0];
}
if( $_ByPDF ) $usuCursor[$nLinea][0] = $UltimoGrupo;
if( $r[1]!=$Ultimo ){
$LineaPar = !$LineaPar;
$Ultimo = $r[1];
}
if( $LineaPar ){
echo '<tr id=P>';
}else{
echo '<tr>';
}
$_vF[trim($r[8])] = trim($r[2]);
$aRowSpan = trim($r[11]).'.'.trim($r[12]);
for($n=0; $n<7; $n++){
if( $n==1 ){
if( $r[14]!='' ) $r[$n] = $r[14];
if( $uRowSpan==$aRowSpan ){
}else if( $DimRowSpan[$aRowSpan]==1 ){
echo '<td>'.str_replace('·',' ',$r[$n]);
}else{
echo '<td rowspan='.$DimRowSpan[$aRowSpan].'>'.str_replace('·',' ',$r[$n]);
$uRowSpan = $aRowSpan;
}
if( $_ByPDF ) $usuCursor[$nLinea][$n] = $r[$n];
}else if( $n==5 ){
echo '<td id=h u='.$r[$n+1].'>'.$r[$n];
if( $_ByPDF ) $usuCursor[$nLinea][$n] = $r[$n];
$n++;
}else if( $n==2 ){
echo '<td id=ColDatos style="width:100px">';
$r[$n] = trim($r[$n]);
		if( strlen($r[$n])>9 && substr($r[$n],0,5)=='&#34;' && substr($r[$n],-5)=='&#34;' ){
			$r[$n] = substr($r[$n],5,-5);
		}
if( $_ByPDF ) $usuCursor[$nLinea][$n] = $r[$n];
switch( $DimLogHistory[$r[8]] ){
case 'V':
if( $_ByPDF ) $usuCursor[$nLinea][$n] = $r[$n];
echo $r[$n];
continue;
case 'T':
if( substr($r[8],0,3)=='cd_' ){
$NomTabla = substr($r[8],3);
qQuery( "select nm_{$NomTabla} from {$NomTabla} where {$r[8]}='{$r[$n]}'", $ps );
list( $ValorSelect ) = qRow($ps);
if( $_ByPDF ) $usuCursor[$nLinea][$n] = $ValorSelect;
echo $ValorSelect;
}else{
if( $_ByPDF ) $usuCursor[$nLinea][$n] = $r[$n];
echo $r[$n];
}
continue;
case 'A':
if( substr($r[8],0,3)=='cd_' ){
$NomTabla = substr($r[8],3);
qQuery( "select nm_{$NomTabla} from {$NomTabla} where {$r[8]}='{$r[$n]}'", $ps );
list( $ValorSelect ) = qRow($ps);
if( $_ByPDF ) $usuCursor[$nLinea][$n] = $r[$n].'·'.$ValorSelect;
echo $r[$n].'·'.$ValorSelect;
}else{
if( $_ByPDF ) $usuCursor[$nLinea][$n] = $r[$n];
echo $r[$n];
}
continue;
default:
$TipoLog = str_replace( '&quot;', '"', trim($r[15]) );
if( trim($r[9])<>'' ) $TipoLog = str_replace( '&quot;', '"', trim($r[9]) );
if( $DimTipoDato[$Definicion[$r[7]][$r[8]]]=='F' ){
if( isZero($r[$n]) ) $r[$n] = "";
$TipoLog = 'OK';
}else if( $DimTipoDato[$Definicion[$r[7]][$r[8]]]=='N' ){
$TipoLog = 'OK';
}else if( isZero($r[$n]) ){
$r[$n] = "";
}
if( $_ByPDF ) $usuCursor[$nLinea][$n] = $r[$n];
if( $TipoLog=='' || $TipoLog=='OK' ){
echo $r[$n];
if( $_ByPDF ) $usuCursor[$nLinea][$n] = strip_tags($r[$n],"<br>");
}else{
if( substr_count( $TipoLog, '#' ) > 0 ){
if( $TipoLog[0]=='(' ){
$Macro = str_replace('#',$r[$n],$TipoLog);
if( $_ByPDF ) $usuCursor[$nLinea][$n] = eval( 'return ('.$Macro.');' );
echo eval( 'return ('.$Macro.');' );
}else{
if( substr_count( $TipoLog, '(') == 1 && substr_count( $TipoLog, ')') == 1 ){
list( $FuncDePHP ) = explode( '(', $TipoLog );
if( in_array( strtolower(trim($FuncDePHP)), $DimFuncUser['user'] ) ){
$TipoLog = str_replace( '&#39;', "'", $TipoLog );
$TipoLog = str_replace( '&#34;', '"', $TipoLog );
$Macro = str_replace('#',$r[$n],$TipoLog);
if( substr($Macro,-1)==')' && substr($Macro,-2)!='()' ) $Macro = substr($Macro,0,-1).',"'.$r[8].'","'.$r[4].'")';
if( $_ByPDF ) $usuCursor[$nLinea][$n] = eval( 'return ('.$Macro.');' );
echo eval( 'return ('.$Macro.');' );
}else{
if( $_ByPDF ) $usuCursor[$nLinea][$n] = eLng('FALTA DEFINIR',$TipoLog);
echo '<span style="color:red">··· '.eLng('FALTA DEFINIR',$TipoLog).' ···</span>';
}
}
}
}else if( $TipoLog[0]=='{' ){
$tmp = str_replace( '{', ',', str_replace(' ','',$TipoLog) );
$tmp = str_replace( '}', '', $tmp );
$tmp = explode( ',', $tmp );
qQuery("select {$tmp[3]} from {$tmp[1]} where {$tmp[2]}='{$r[$n]}'", $ps);
list( $ValorSelect ) = qRow($ps);
if( $_ByPDF ) $usuCursor[$nLinea][$n] = $ValorSelect;
echo $ValorSelect;
}else{
$Dim = explode(';',$TipoLog);
for( $i=0; $i<count($Dim); $i++ ){
list( $k, $v ) = explode( ',', $Dim[$i] );
if( trim($k)==trim($r[$n]) ){
if( $_ByPDF ) $usuCursor[$nLinea][$n] = trim($v);
echo trim($v);
break;
}
}
}
}
}
}else if( $n==4 ){
if( $_ByPDF ) $usuCursor[$nLinea][$n] = $r[$n];
echo '<td v=2 id=h style="text-align:center">'.$r[$n];
$DimCDI[$r[$n]] = 1;
}else{
if( $_ByPDF && $n>1 ) $usuCursor[$nLinea][$n] = $_DimOp[$r[$n]];
echo '<td';
if( $n==3 ) echo ' style="text-align:center"';
echo '>'.(($_DimOp[$r[$n]]!='') ? $_DimOp[$r[$n]] : $r[$n]);
}
}
for($n=14; $n<14+$AddCampos; $n++){
if( $_ByPDF ) $usuCursor[$nLinea][$n] = $r[$n];
echo '<td>'.$r[$n];
}
}
if( $_ByPDF ){
eInit();
include('../../edesweb/pdf_log.gs');
eEnd();
}
echo '</TABLE>';
echo '</SPAN>';
echo '</TD>';
if( eSqlType('mysql,mysqli') ){
qQuery( "select
L.cdi,L.operacion,concat(trim(U.user_name),' ',trim(U.user_surname)) nombre, U.cd_gs_user
from
gs_log_tmp L,
gs_user U
where
L.pk_user={$PkUser} and
L.cd_gs_user=U.cd_gs_user
group by
L.cdi,L.operacion,nombre,U.cd_gs_user
order by
L.cdi, L.operacion, nombre
" );
}else if( eSqlType('oracle') ){
qQuery( "select
L.cdi,L.operacion,(trim(U.user_name)||' '||trim(U.user_surname)) nombre, U.cd_gs_user
from
gs_log_tmp L,
gs_user U
where
L.pk_user={$PkUser} and
L.cd_gs_user=U.cd_gs_user
group by
L.cdi,L.operacion, (trim(U.user_name)||' '||trim(U.user_surname)), U.cd_gs_user
order by
L.cdi, L.operacion, nombre
" );
}else{
qQuery( "select
L.cdi,L.operacion,(trim(U.user_name)||' '||trim(U.user_surname)) nombre, U.cd_gs_user
from
gs_log_tmp L,
gs_user U
where
L.pk_user={$PkUser} and
L.cd_gs_user=U.cd_gs_user
group by
L.cdi,L.operacion,3,U.cd_gs_user
order by
L.cdi, L.operacion, nombre
" );
}
echo '<TD align=center style="width:1px; margin:0px; padding:0px; vertical-align:top; background-color:transparent">';
echo '<SPAN id=BROWSE2ID onscroll=top.eScrollTH(this) style="display:table-cell; border:0px solid red; height:100%; width:100%; overflow-y:scroll; background-color:transparent">';
echo '<TABLE id="BROWSE2" class="BROWSE col_1c" onclick=Linea() style="display:table;" _style="position:relative">';
echo '<COLGROUP>';
echo '<COL class=Celda>';
echo '<COL class=Celda style="text-align:center">';
echo '<COL class=JSOnClickRow>';
echo '</COLGROUP>';
echo '<tr>';
echo '<th>'.eLng('FECHA Y HORA').'</th>';
echo "<th title='".eLng('A: Alta')."\n".eLng('M: Modificación')."'>".eLng('OP').'</th>';
echo '<th>'.eLng('USUARIO').'</th>';
echo '</tr>';
while( $r=qRow() ){
if( $DimCDI[$r[0]]==1 ) echo '<tr><td v=1 id=h>'.$r[0].'<td>'.$_DimOp[$r[1]].'<td id=h u='.$r[3].'>'.$r[2].'</td></tr>';
}
echo '</table>';
echo '</span>';
echo '</td>';
echo '</tr></table>';
echo '</CENTER>';
if( !$VIEW_gs_log_tmp ) qQuery( "delete from gs_log_tmp where pk_user={$PkUser}" );
?>
<script type="text/javascript">
function Todo(){
if( !top.eReadyState(window) ) return;
var Obj = S.event(window);
if( Obj.tagName=="I" ) Obj = Obj.parentNode;
if( Obj.id=='GR1' ){
var ver = (Obj.children[0].innerText=="c"),
oTR = S.toTag(Obj,"TR"),
oTRS = S.toTag(Obj,"TABLE").rows, n,
icon = (ver ? "d":"c");
for(n=1; n<oTRS.length; n++){
if( oTRS[n].cells[1].id=="GR1" ){
oTRS[n].cells[1].children[0].innerText = icon;
}else{
S.display(oTRS[n], ver, "table-row");
}
}
}
return S.eventClear(window);
}
function Linea(){
if( !top.eReadyState(window) ) return;
var Obj = S.event(window);
if( Obj.tagName=="I" ) Obj = Obj.parentNode;
if( Obj.id=='GR1' ){
var ver = (Obj.children[0].innerText=="c"),
oTR = S.toTag(Obj,"TR"),
oTRS = S.toTag(Obj,"TABLE").rows, n;
Obj.children[0].innerText = (ver ? "d":"c");
for(n=oTR.rowIndex+1; n<oTRS.length; n++){
if( oTRS[n].cells[1].id=="GR1" ){
break;
}
S.display(oTRS[n], ver, "table-row");
}
return;
}
if( Obj.tagName!="TD" ) return;
if( Obj.getAttribute("u")!=null ){
top.eSWOpen(window, 'edes.php?FcR:$a/d/usu_ficha.edf&_SEEK&cd_gs_user='+Obj.getAttribute("u"), "");
setTimeout("top.eScrollTH(BROWSEID);", 1);
}else if( Obj.getAttribute("v")!=null ){
var CDI = Obj.textContent,
TR = DGI('BROWSE2').rows, m, n,
i = (Obj.getAttribute("v")==1) ? 0 : Obj.cellIndex-2;
if( Obj.parentNode.cells[i].style.backgroundColor=='#ffffcc' ) CDI = '#';
for(n=1; n<TR.length; n++) TR[n].cells[0].style.backgroundColor = '';
if( CDI!='#' && Obj.getAttribute("v")==1 ) Obj.style.backgroundColor = '#ffffcc';
TR = DGI('BROWSE').rows;
for(n=1; n<TR.length; n++){
m = TR[n].cells.length;
if( m==2 ) continue;
m = (m==6) ? 0:1 ;
if( TR[n].cells[4-m].textContent==CDI ){
TR[n].cells[2-m].style.backgroundColor = '#ffffcc';
}else{
TR[n].cells[2-m].style.backgroundColor = '';
}
}
top.eScrollTH(BROWSEID);
return true;
}
return false;
}
function RecalcTH(){
if( document.body.clientWidth < DGI("CONTENEDOR").offsetWidth ){
DGI("BROWSE").children[0].children[2].style.width = (DGI("BROWSE").rows[0].cells[2].offsetWidth - (DGI("CONTENEDOR").offsetWidth - document.body.clientWidth))+"px";
}
DGI("BROWSE").style.width = (DGI("BROWSE").offsetWidth+2)+"px";
var TD = DGI("BROWSE").rows[0].cells;
for( n=0; n<TD.length; n++ ) TD[n].style.width = TD[n].offsetWidth+"px";
}
var _ColorBody = '';
function AntesPrint(){
var Obj = DGI('BROWSE');
Obj.rows[0].style.top = "0px";
Obj.rows[0].style.left = "0px";
var _ColorBody = S(document.body).css("backgroundColor");
document.body.style.backgroundColor = '#FFFFFF';
}
function DespuesPrint(){
document.body.style.backgroundColor = _ColorBody;
top.eScrollTH(BROWSEID);
top.eScrollTH(BROWSE2ID);
}
window.onbeforeprint = AntesPrint;
window.onafterprint = DespuesPrint;
function FunctionOnClick(){
top.eCallSrvPost('edes.php?E:$htmlto.gs', {'html':document.body.outerHTML, 'file':'loghistory.xls'}, window);
}
if( top.eIsWindow(window) ){
top.eSWTools(window,'H',"P");
top.eSWTools(window,'H',"M");
}
</SCRIPT>
<?PHP
echo '</BODY></HTML>';
eEnd();
?>
<?PHP
?>
