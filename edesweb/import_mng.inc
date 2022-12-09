<?PHP
if( !isset($_SESSION['_User']) || $GLOBALS['_gsID']!=getmypid() ) exit;
if( isset($_POST['RelationTH']) ){
if( !function_exists('sql_Query') ){
$tmpFile = '../_datos/config/sql.ini';
eval( _LoadSqlIni( $tmpFile ) );
include( $Dir_.$_Sql.'.inc' );
}
$ViewTrace = false;
$ViewRec = false;
$VerSql = false;
$InsertTemporary = true;
$InsertTmp = true;
$InsertRec = true;
$ModeTest = false;
if( $_POST["_ImportType"]==-1 ){
$ViewRec = true;
$InsertRec = false;
}
$_DebugImport = array(
'ViewTrace'		 => $ViewTrace,
'ViewRec'		 => $ViewRec,
'VerSql'		 => $VerSql,
'InsertTemporary'=> $InsertTemporary,
'InsertTmp'		 => $InsertTmp,
'InsertRec'		 => $InsertRec,
'ModeTest'		 => $ModeTest
);
$_Source = $_POST["_Source"];
$_AllRelationFields = explode('|', $_POST["_AllRelationFields"]);
$_RelationField = array();
for($n=1; $n<count($_AllRelationFields); $n++){
$tmp = explode(',',substr($_AllRelationFields[$n],1));
for( $i=1; $i<count($tmp)-1; $i++ ){
list($re) = explode(','.$tmp[$i].',',$_AllRelationFields[$n]);
if( trim(substr($re,1))!='' && $tmp[$i]!='' && !$_RelationField[$tmp[$i]] ){
$_RelationField[$tmp[$i]] = explode(',',substr($re,1));
}
}
}
$_AllImport = array();
$tmp = explode('|',$_POST["_AllImport"]);
for($n=1; $n<count($tmp); $n++){
$tmp1 = explode(';',$tmp[$n]);
$tmp2 = explode(',',$tmp1[2]);
$tmp22 = array();
for( $i=0; $i<count($tmp2); $i++ ){
if( substr_count($tmp2[$i],'=')==0 ) $tmp2[$i] .= '='.$tmp2[$i];
$tmp22[] = explode('=',$tmp2[$i]);
}
$tmp3 = explode(',',$tmp1[3]);
$tmp33 = array();
for( $i=0; $i<count($tmp3); $i++ ){
if( substr_count($tmp3[$i],'=')==0 ) $tmp3[$i] .= '='.$tmp3[$i];
$tmp33[] = explode('=',$tmp3[$i]);
}
$_AllImport[] = array(
(strtoupper($tmp1[0])=='TRUE' || $tmp1[0]==1 ),
$tmp1[1],
$tmp22,
$tmp33
);
}
$DimSeek = explode(',',$_POST["_DBINDEX"]);
$SqlInsert = 'insert into _imp_'.$_POST["_DBTABLE"].' ( #F# ) values ( #V# )';
$FuncUser = false;
if( file_exists('../_datos/config/import_user.php') ){
include('../_datos/config/import_user.php');
$FuncIni = (function_exists('importIni'));
if( $FuncIni ) importIni($_POST["_DBTABLE"], $DimSeek, $SqlInsert, $_DebugImport);
$FuncRecord = (function_exists('importRecord'));
$FuncEnd = (function_exists('importEnd'));
foreach($_DebugImport as $k=>$v) ${$k} = $v;
}
if( $ViewTrace ){
eTrace( 'RelationTH........: '.$_POST["RelationTH"] );
eTrace( 'RelationField.....: '.$_POST["RelationField"] );
eTrace( '_AllRelationFields: '.$_POST["_AllRelationFields"] );
eTrace( '_AllImport........: '.$_POST["_AllImport"] );
eTrace( '_DBTABLE..........: '.$_POST["_DBTABLE"] );
eTrace( '_DBINDEX..........: '.$_POST["_DBINDEX"] );
eTrace( '_DBSERIAL.........: '.$_POST["_DBSERIAL"] );
eTrace( '_ChrDni...........: '.$_POST["_ChrDni"] );
eTrace( '_Source...........: '.$_POST["_Source"] );
eTrace( 'Datos.............: '.$_POST["Datos"] );
}
if( $InsertTemporary ){
qQuery('CREATE TEMPORARY TABLE _imp_'.$_POST["_DBTABLE"].' LIKE '.$_POST["_DBTABLE"]);
}else{
qQuery('CREATE TABLE _imp_'.$_POST["_DBTABLE"].' LIKE '.$_POST["_DBTABLE"]);
}
if( $_POST["_DBSERIAL"]!='' ){
qQuery('alter table _imp_'.$_POST["_DBTABLE"].' modify '.$_POST["_DBSERIAL"].' int(10) default 0');
qQuery('alter table _imp_'.$_POST["_DBTABLE"].' drop PRIMARY KEY');
}
define( '_vCAMPO'		, 0 );
define( '_vTIPO'		, 1 );
define( '_vPORDEFECTO'	, 2 );
define( '_vLABEL'		, 3 );
define( '_vSIZE'		, 4 );
define( '_vCONDICION'	, 5 );
define( '_vTYPE'		, 6 );
define( '_vRADIO'		, 7 );
define( '_vPOSICION'	, 8 );
$pError = array();
$xError = '';
$Def = array();
$PosDef = array();
$tmp = explode("\n",$_POST["Datos"]);
for($n=0; $n<count($tmp); $n++) $Def[] = explode('|',trim($tmp[$n]));
for($i=0; $i<count($Campos); $i++) $PosDef[$i] = -1;
$DimCampo = explode("|", $_POST["RelationField"]);
$TotalDimCampo = count($DimCampo);
$constanteSeek = array();
$File = '../_tmp/php/import_'.$_SESSION['_User'].'.csv';
$Linea = array();
$df = fopen(eScript($File),"r");
if( $df ){
$Campos = fgetcsv($df,1000,";");
$TCampos = count($Campos);
for($n=0; $n<count($Def); $n++) $Def[$n][_vPOSICION] = -1;
for($n=0; $n<count($Def); $n++){
for($i=0; $i<count($DimCampo); $i++){
if( $DimCampo[$i]==$Def[$n][_vCAMPO] ){
$Def[$n][_vPOSICION] = $i;
$PosDef[$i] = $n;
if( $Def[$n][_vTYPE]=='radio' ){
$tmp = explode(',',$Def[$n][_vRADIO]);
$Long = 0;
for( $p=0; $p<count($tmp); $p++ ) $Long = max($Long, strlen($tmp[$p]));
$Def[$n][_vSIZE] = $Long;
}
break;
}
}
if( $Def[$n][_vLABEL]=="===" ){
$constanteSeek[$Def[$n][_vCAMPO]] = $Def[$n][_vPORDEFECTO];
}
}
if( trim($_POST["_DBINDEX"])=="" ){
fclose($df);
eInit();
echo '<script type="text/javascript">top.eInfoError(window,"FALTA EL CAMPO INDICE",-1);</script>';
exit;
}
eInit(true);
echo '</head><body style="text-align:center">';
echo '<div id="PAGINA" style="display:inline-table;text-align:-webkit-center;background:transparent;padding:0px;">';
if( $ViewRec ){
echo '<table border=0px cellspacing=1px cellpadding=4px id="BROWSE" class="BROWSE col_0r">';
echo "<caption>DATOS A IMPORTAR</caption>";
echo '<tr>';
echo '<th>Nº';
}
$lstCampos = '';
for($n=0; $n<$TCampos; $n++) if( $Campos[$n]!='' ){
if( $Def[$PosDef[$n]][_vCAMPO]!='' ){
if( $ViewRec ) echo '<th>'.$Campos[$n].'<br>('.$Def[$PosDef[$n]][_vCAMPO].')';
if( $lstCampos!='' ) $lstCampos .= ',';
$lstCampos .= $Def[$PosDef[$n]][_vCAMPO];
}
}
if( $ViewRec ) echo '<th>ACCIÓN';
$NReg = 0;
$RegistrosVacios = 0;
$RegistrosErroneos = 0;
$RegistrosRepetidos = 0;
$RegistrosDuplicados = 0;
$TotalRegistros = 0;
while( ($Linea=fgetcsv($df,1000,";"))!==false ){
$TotalRegistros++;
$Contenido = '';
$SqlValor = '';
$xErrorRow = '';
$ok = true;
$txt = '<tr>';
$txt .= '<td>'.eNumberFormat($NReg,0);
$Values = array();
for($n=0; $n<$TCampos; $n++){
if( $Campos[$n]!='' && $Def[$PosDef[$n]][_vCAMPO]!="" ){
$Valor = eStrFilter($Linea[$n], $Def[$PosDef[$n]][_vTIPO], $Def[$PosDef[$n]][_vSIZE], $Def[$PosDef[$n]][_vTYPE], $Def[$PosDef[$n]][_vRADIO]);
switch( $Def[$PosDef[$n]][_vCONDICION] ){
case '#':
if( $Valor=='' ){
if( $ViewRec ) $xErrorRow .= 'Error:# - '.$Def[$PosDef[$n]][_vCAMPO].'<br>';
$ok = false;
}
break;
case '=':
if( strlen($Valor)!=$Def[$PosDef[$n]][_vSIZE] ){
if( $ViewRec ) $xErrorRow .= 'Error:= - '.$Def[$PosDef[$n]][_vCAMPO].'<br>';
$ok = false;
}
break;
case '%':
if( $Valor!='' && strlen($Valor)!=$Def[$PosDef[$n]][_vSIZE] ){
if( $ViewRec ) $xErrorRow .= 'Error:% - '.$Def[$PosDef[$n]][_vCAMPO].'<br>';
$ok = false;
}
break;
}
if( $Def[$PosDef[$n]][_vTYPE]=='sselect' ){
$Campo = $Def[$PosDef[$n]][_vCAMPO];
if( $_RelationField[$Campo] ){
if( substr($Campo,0,3)=='cd_' ){
eTrace( $Campo.' = '.$Valor );
$sql = $Campo."='{$Valor}'";
for( $i=0; $i<count($_RelationField[$Campo]); $i++ ){
$sql .= ' and '.$_RelationField[$Campo][$i]."='".$Values[$_RelationField[$Campo][$i]]."'";
}
if( $VerSql ) echo 'select count(*) from '.substr($Campo,3).' where '.$sql.'<br>';
if( !qCount( substr($Campo,3), $sql ) ) $ok = false;
}
}
}
$Values[$Def[$PosDef[$n]][_vCAMPO]] = $Valor;
$Linea[$n] = $Valor;
$txt .= '<td>'.$Valor;
$Contenido .= $Valor;
}
}
foreach($constanteSeek as $k=>$v){
$Values[$k] = $v;
}
if( $ViewRec ) echo $txt.'<td>'.$xErrorRow;
if( $Contenido!='' && $FuncRecord ) $ok = importRecord($_POST["_DBTABLE"], $Values, $ok);
for($n=0; $n<count($_AllImport); $n++){
$CamposRellenos = true;
$xWhere = '';
for( $i=0; $i<count($_AllImport[$n][2]); $i++ ){
if( $xWhere!='' ) $xWhere .= ' and ';
$xWhere .= $_AllImport[$n][2][$i][1]."='".$Values[ $_AllImport[$n][2][$i][0] ]."'";
if( trim($Values[ $_AllImport[$n][2][$i][0] ])=='' ){
if( $ViewRec ) echo 'Error Aux: '.$_AllImport[$n][2][$i][0].'<br>';
$CamposRellenos = false;
}
}
if( $_AllImport[$n][0] || $CamposRellenos ){
if( !$CamposRellenos ){
$ok = false;
}
if( $ok ){
$xSelect = '';
for( $i=0; $i<count($_AllImport[$n][3]); $i++ ){
if( $xSelect!='' ) $xSelect .= ',';
$xSelect .= $_AllImport[$n][3][$i][1];
}
$sql = 'select '.$xSelect.' from '.$_AllImport[$n][1].' where '.$xWhere;
if( $VerSql ) echo $sql.'<br>';
qQuery( $sql );
$r = qArray();
for($i=0; $i<count($_AllImport[$n][3]); $i++){
$Values[ $_AllImport[$n][3][$i][0] ] = $r[ $_AllImport[$n][3][$i][0] ];
}
}
}
}
if( $Contenido!='' ){
$Where = '';
for($i=0; $i<count($DimSeek); $i++){
if( $Where!='' ) $Where .= ' and ';
$Where .= $DimSeek[$i]."='".$Values[$DimSeek[$i]]."'";
if( $Values[$DimSeek[$i]]=="" ){
if( $ViewRec ) echo 'Error Index: '.$DimSeek[$i].'<br>';
$ok = false;
}
}
$ok = true;
if( $ok ){
if( $VerSql ) echo 'select count(*) from '.$_POST["_DBTABLE"].' where '.$Where.'<br>';
if( qCount($_POST["_DBTABLE"], $Where)>0 ){
$RegistrosRepetidos++;
if( $ViewRec ) echo '[Existe]';
$pError['L'.$TotalRegistros] = 'E';
$xError .= $TotalRegistros.',E;';
}else{
if( $VerSql ) echo 'select count(*) from _imp_'.$_POST["_DBTABLE"].' where '.$Where.'<br>';
if( qCount('_imp_'.$_POST["_DBTABLE"], $Where)>0 ){
if( $ViewRec ) echo '[Duplicado]';
$RegistrosDuplicados++;
$pError['L'.$TotalRegistros] = 'D';
$xError .= $TotalRegistros.',D;';
}else{
$SqlValores = '';
$SqlCampos = '';
foreach($Values as $k=>$v){
if( $k[0]=='_' ) continue;
if( $SqlValores!='' ){
$SqlValores .= ',';
$SqlCampos .= ',';
}
$SqlValores .= "'".$v."'";
$SqlCampos .= $k;
}
$sql = str_replace('#V#', $SqlValores, str_replace('#F#', $SqlCampos, $SqlInsert));
if( $ViewRec ) echo '[OK]<br>';
if( $VerSql ) echo $sql;
if( $InsertTmp ) qQuery($sql);
$NReg++;
}
}
}else{
if( $ViewRec ) echo '[Faltan valores]';
$RegistrosErroneos++;
$pError['L'.$TotalRegistros] = 'F';
$xError .= $TotalRegistros.',F;';
}
}else{
if( $ViewRec ) echo '[Sin datos]';
$RegistrosVacios++;
$pError['L'.$TotalRegistros] = 'V';
$xError .= $TotalRegistros.',V;';
}
}
fclose($df);
if( $ViewRec ) echo '</table><br>';
}else{
eInit();
echo '<script type="text/javascript">top.eInfoError(window, "ERROR ABRIENDO FICHERO CVS", -1);</script>';
eEnd();
}
$masDatos = "";
if( $ViewTrace ){
$masDatos = '<tr><td>Registros en TEMPORAL<td>'.eNumberFormat(qCount('_imp_'.$_POST["_DBTABLE"]),0);
}
if( $FuncEnd ) importEnd($_POST["_DBTABLE"], '_imp_'.$_POST["_DBTABLE"]);
if( $InsertRec ) qQuery('insert into '.$_POST["_DBTABLE"].' select * from _imp_'.$_POST["_DBTABLE"]);
echo '<TABLE border=0px cellspacing=1px cellpadding=4px class="BROWSE col_1r" id="BROWSE" style="cursor:default" '.(($_SESSION["_D_"]!="")? "":'oncontextmenu="return eClearEvent()"').' ondblclick="return eClearEvent()">';
echo 	'<col class=Celda><col class=Celda style="text-align:right">'.
"<caption>RESULTADO&nbsp;IMPORTACIÓN</caption>".
'<tr><th colspan=2>REGISTROS</th>'.
$masDatos.
'<tr><td>Fichero Excel	<td>'.eNumberFormat($TotalRegistros).
'<tr><td>Vacíos			<td>'.eNumberFormat($RegistrosVacios*1).
'<tr><td>Erróneos		<td>'.eNumberFormat($RegistrosErroneos*1).
'<tr><td>Repetidos		<td>'.eNumberFormat($RegistrosRepetidos*1).
'<tr><td>Duplicados		<td>'.eNumberFormat($RegistrosDuplicados*1).
'<tr><td class=PieLista><b>Importados</b><td class=PieLista><b>'.eNumberFormat($NReg).'</b>'.
'</table>';
echo "</div></body></html>";
eEnd();
}
if( isset($_GET['ImportCSV']) ){
?>
<style>
.SubWin TD {
PADDING-BOTTOM: 0px;
PADDING-LEFT: 0px;
PADDING-RIGHT: 0px;
PADDING-TOP: 0px;
}
#MenuIMPORTXLS TD { cursor:pointer; }
</style>
<?PHP
echo '<table id=_ImportCSV>';
$nf = 0;
$num = 0;
$fp = fopen('../_tmp/php/import_'.$_User.'.csv', "r");
while( $data = fgetcsv($fp, 1000, ";") ){
if( $nf==0 ){
$num = count($data);
echo '<tr>';
for($c=0; $c<$num; $c++) echo '<td>&nbsp;</td>';
echo '</tr>';
echo '<tr>';
for($c=0; $c<$num; $c++) echo '<th>'.$data[$c].'</th>';
echo '</tr>';
}else{
$txt = '';
for( $c=0; $c<$num; $c++ ) $txt .= $data[$c];
if( $txt=='' ) continue;
echo '<tr>';
for( $c=0; $c<$num; $c++ ) echo '<td>'.$data[$c].'</td>';
echo '</tr>';
}
if( $nf>2 ) break;
$nf++;
}
while( $data = fgetcsv($fp, 1000, ";") ){
$txt = '';
for( $c=0; $c<$num; $c++ ) $txt .= $data[$c];
if( $txt=='' ) continue;
$nf++;
}
$nf-2;
$nf = eNumberFormat($nf);
echo "<tr><td colspan={$num}>3 / {$nf} ...</td></tr>";
fclose($fp);
?>
<tr><td colspan=<?=$num?>>
<TABLE id=MenuIMPORTXLS style='cursor:pointer' oncontextmenu='return eClearEvent()' ondblclick='return eClearEvent()'>
<tr>
<td onclick='_ImportLeft()'><i class="ICONWINDOW"><</i> Anterior
<td onclick='_ImportRight()'><i class="ICONWINDOW">></i> Siguiente
<td onclick='_ImportClear()' onmousewheel='_ImportSkip()'><i class="ICONWINDOW">&#183;</i> Borrar
</tr>
</TABLE>
</td></tr>
<?PHP
echo '</table>';
?>
<script type="text/javascript">
window.frameElement.WOPENER._TotalCols = <?=$num?>;
top.eInfoHide();
</script>
<?PHP
eEnd();
}
$_All = ''; for( $n=0; $n<count($_RELATIONFIELDS); $n++ ) $_All .= '|'.$_RELATIONFIELDS[$n];
$_Imp = ''; for( $n=0; $n<count($_Import); $n++ ) $_Imp .= '|'.str_replace(' ','',$_Import[$n][0]).';'.str_replace(' ','',$_Import[$n][1]).';'.str_replace(' ','',$_Import[$n][2]).';'.str_replace(' ','',$_Import[$n][3]);
?>
<script type="text/javascript">
document.title = "TAB";
top.S.init(window,"all,tab");
S("#AddButton2").none();
S("#AddButton3").none();
var _AllRelationFields = '<?=$_All?>',
_AllImport = '<?=$_Imp?>',
_TotalCols = 0, _ImportCol=null,
_ImportColorPag = '#FFFFFF',
_ImportColorCursor = '#009900',
_ImportColorTH = '#0099cc',
_ImportColorError = '#FF0000';
var _DimNoRequired = new Array();
function _DesactivaLoNoImportable(){
var Obj = S("SPAN").dim;
for( var n=0; n<Obj.length; n++ ) if( Obj[n].className=='SubLista' ){
Obj[n].style.visibility = 'hidden';
}
for( var i=0; i<_SaveOnLine.length; i++ ){
var tmp = _SaveOnLine[i].split("|"),
Obj = DGI("["+tmp[0]+"]"),
Desde = Obj.slDESDE,
Hasta = Obj.slHASTA,
t = Obj.slFORM.elements;
for( var n=Desde; n<Hasta; n++ ){
if( t[n].tagName=='FIELDSET' || t[n].type=='button' ) continue;
_DimNoRequired[t[n].name] = 1;
with( t[n] ){
onclick = null;
onmousewheel = null;
oncontextmenu = null;
readOnly = true;
className = "READONLY";
onfocus = function anonymous(){ document.body.focus() }
}
var el = DGI("___op_"+tmp[0]).parentNode;
el.style.visibility = 'hidden';
}
}
var Obj = S("IFRAME").dim;
for( var n=0; n<Obj.length; n++ ) if( Obj[n].className=='ISubList' ){
Obj[n].style.visibility = 'hidden';
}
var Obj = S("IMG").dim;
for( var n=0; n<Obj.length; n++ ) if( Obj[n].className!='CheckBox' && Obj[n].className!='Radio' ) Obj[n].style.visibility = 'hidden';
}
_DesactivaLoNoImportable();
function _ImportTH(){
try{
var v = (DGI('_ImportNumTH').value*1), f,c;
if( v>0 ){
for(f=2; f<v+2; f++)
for(c=1; c<_TotalCols+1; c++) top.eExcel("IC|"+f+","+c+"|"+_ImportColorPag);
}
if( event.wheelDelta >= 120 && v>0 ) v--;
else if( v<9 ) v++;
DGI('_ImportNumTH').value = v;
for(f=2; f<v+2; f++)
for(c=1; c<_TotalCols+1; c++) top.eExcel("IC|"+f+","+c+"|"+_ImportColorTH);
}catch(e){}
}
function _Reiniciar(){
DGI('AddButton1').style.display = 'block';
DGI('AddButton2').style.display = 'none';
DGI('AddButton3').style.display = 'none';
DGI("__ImportDATA").style.width = "1px";
DGI("__ImportDATA").children[3].style.width = "1px";
DGI("__ImportDATA").style.display = 'none';
frames['__ImportDATAIFRAME'].frameElement.style.display = 'none';
_ImportCol = null;
}
function SeCargoTabla(){
for( var c=0; c<_TotalCols; c++ ){
S("#_ImportCSV").obj.rows[0].cells[c].style.fontWeight = 'bold';
S("#_ImportCSV").obj.rows[0].cells[c].onclick = _ImportTD;
}
S("#_ImportCSV").obj.rows[0].cells[0].style.backgroundColor = _ImportColorCursor;
S("#__ImportDATA").obj.children[0].rows[0].cells[1].children[0].onclick = _Reiniciar;
if( S("#__ImportDATA").obj.children[0].rows[1].cells[0].children[0].offsetWidth > document.body.offsetWidth ){
S("#__ImportDATA").obj.style.top = S("#__ImportDATAIFRAME").obj.style.top = "4px";
S("#__ImportDATA").obj.style.left = S("#__ImportDATAIFRAME").obj.style.left = "4px";
S("#__ImportDATA").obj.children[0].rows[1].cells[0].children[0].style.overflow = 'auto';
var Ancho = parseInt(document.body.offsetWidth)-10,
Alto = parseInt(S("#__ImportDATA").obj.offsetHeight)+17,
Alto2 = S("#__ImportDATA").obj.children[0].rows[1].cells[0].children[0].offsetHeight+17;
S("#__ImportDATA").obj.children[0].rows[0].cells[0].style.width = px(Ancho-23);
S("#__ImportDATA").obj.children[0].rows[1].cells[0].children[0].style.width = px(Ancho-6);
S("#__ImportDATAIFRAME").obj.style.width = px(Ancho);
S("#__ImportDATA").obj.style.height = px(Alto);
S("#__ImportDATAIFRAME").obj.style.height = px(Alto);
S("#__ImportDATA").obj.children[0].rows[1].cells[0].children[0].style.height = px(Alto2);
}
}
var _File = '';
function _ImportFileSel(){
S.file(S(":_FILE___csv").obj, '/_tmp/php/import_'+_User+'.csv', function(){
_ImportCol = 0;
eLoadDiv('_ImportDATA', 'edes.php?E:$import_mng.inc&ImportCSV='+_User, 'Fichero a Importar', null, null, null, null, null, SeCargoTabla, true);
S("#AddButton1").none();
S("#AddButton2").block();
S("#AddButton3").block();
}, 100);
}
function _ImportClose(Load){
try{
S('#AddButton1').hidden();
var txt="", n, tipo, el;
for(n=0; n<_cForm.length; n++){
if( typeof(_ImportLabel[_cForm[n].Nombre])=='undefined' ){
if( _cForm[n].Nombre.substr(0,7)=='_INPUT_' ){
_ImportLabel[_cForm[n].Nombre] = _ImportLabel[_cForm[n].Nombre.substr(7)];
}else{
vRadio = "";
el = S(":"+_cForm[n].Nombre).obj;
tipo = el.type;
if( txt!="" ) txt += '\n';
txt += _cForm[n].Nombre +'|'+_cForm[n].Tipo +'|'+ _cForm[n].PorDefecto+'|===|'+el.size+'|'+_cForm[n].Condicion+'|'+ tipo+'|'+    vRadio;
}
continue;
}
vRadio = "";
el = S(":"+_cForm[n].Nombre).obj;
tipo = el.type;
if( el.CheckBox==1 ) tipo = 'check';
else if( el.RadioButton==1 ){
tipo = 'radio';
var Obj = S(":"+'__'+_cForm[n].Nombre).obj;
for(var i=0; i<Obj.length; i++){
if( vRadio!='' ) vRadio += ',';
vRadio += Obj[i].Value;
}
}else if( _cForm[n].Nombre.indexOf('_INPUT_')>-1 || S(":"+_cForm[n].Nombre+'_TABLE').length ){
tipo = 'select';
if( S(":"+_cForm[n].Nombre.replace('_INPUT_','')).attr("SS")!=undefined ) tipo = 'sselect';
var Obj = S(":"+_cForm[n].Nombre.replace('_INPUT_','')+'_TABLE').obj.rows;
for(var i=0; i<Obj.length; i++){
if( vRadio!='' ) vRadio += ',';
vRadio += eTrim(Obj[i].cells[0].textContent);
}
}
if( txt!="" ) txt += '\n';
txt += _cForm[n].Nombre +'|'+_cForm[n].Tipo +'|'+ _cForm[n].PorDefecto+'|'+ _ImportLabel[_cForm[n].Nombre]+'|'+el.size+'|'+_cForm[n].Condicion+'|'+ tipo+'|'+    vRadio;
}
var TD = S("#_ImportCSV").obj.rows[0].cells,
TH = '', NmCampo = '';
for(n=0; n<TD.length; n++){
if( n>0 ){
TH += '|';
NmCampo += '|';
}
TH += TD[n].textContent;
NmCampo += ((TD[n].NmField==undefined)?'':TD[n].NmField);
}
var xIndex = _DBINDEX;
if( _DBINDEX==_DBSERIAL && _DBINDEX2!='' ) xIndex = _DBINDEX2;
if( _ImportType==1 ){
S('#AddButton2').hidden();
S('#AddButton3').hidden();
S(window).callSrvPost('edes.php?E:$import_mng.inc', {
'_DBTABLE':_DBTABLE,
'_DBINDEX':xIndex,
'_DBSERIAL':_DBSERIAL,
'Datos':txt,
'RelationTH':TH,
'RelationField':NmCampo,
'_ImportType':_ImportType,
'_AllRelationFields':_AllRelationFields,
'_AllImport':_AllImport,
'_Source':_Source,
'_ChrDni':_ChrDni
}, window);
_ImportCol=null;
}else{
var win = S.window("", {fullscreen:true, title:"Informe Chequeo de la Importación"});
S(window).callSrvPost('edes.php?E:$import_mng.inc', {
'_DBTABLE':_DBTABLE,
'_DBINDEX':xIndex,
'_DBSERIAL':_DBSERIAL,
'Datos':txt,
'RelationTH':TH,
'RelationField':NmCampo,
'_ImportType':_ImportType,
'_AllRelationFields':_AllRelationFields,
'_AllImport':_AllImport,
'_Source':_Source,
'_ChrDni':_ChrDni
}, win);
}
}catch(e){for(var i in e)alert(i+': '+e[i]);}
}
function _ImportConfirm2(Op){
if( Op==2 ) _ImportClose(1);
}
var _ImportType;
function _ImportConfirm(op){
if( _ImportCol==null ){
top.eInfo(window, 'No ha seleccionado ningún campo a importar');
return;
}
_ImportType = op;
var TD = S("#_ImportCSV").obj.rows[0].cells, n,i, ok, Lab;
for(n=0; n<_cForm.length; n++){
ok = false
switch( _cForm[n].Condicion ){
case '=':
case '#':
for(i=0; i<TD.length; i++){
if( TD[i].NmField==_cForm[n].Nombre ){
ok = true;
break;
}
}
break;
default:
ok = true;
}
if( !ok && S(":"+_cForm[n].Nombre).obj.offsetWidth>0 ){
if( _ImportLabel[_cForm[n].Nombre]!='' ){
Lab = _ImportLabel[_cForm[n].Nombre];
}else{
Lab = _cForm[n].Nombre;
}
top.eAlert("ERROR", 'Falta importar el dato "'+Lab+'"', "ACCEPT", "DI");
return;
}
}
top.eAlert( S.lng(209), "Confirmar Ejecutar "+((_ImportType==1)? "IMPORTACIÓN":"CHEQUEO"), "A,C", "DH", _ImportConfirm2 );
}
function _ImportTD(){
var Obj = S.event(window);
if( Obj.tagName!='TD' ) return;
try{
with( S("#_ImportCSV").obj.rows[0].cells[_ImportCol].style ){
color = _ImportCol;
backgroundColor = _ImportColorPag;
}
_ImportCol = Obj.cellIndex;
if( _ImportCol >= _TotalCols ) _ImportCol = 0;
with( S("#_ImportCSV").obj.rows[0].cells[_ImportCol].style ){
color = _ImportCol;
backgroundColor = _ImportColorCursor;
}
}catch(e){ for(var i in e) alert(i+': '+e[i]); }
}
function _ImportRight(){
try{
with( S("#_ImportCSV").obj.rows[0].cells[_ImportCol].style ){
color = _ImportCol;
backgroundColor = _ImportColorPag;
}
_ImportCol++;
if( _ImportCol >= _TotalCols ) _ImportCol = 0;
with( S("#_ImportCSV").obj.rows[0].cells[_ImportCol].style ){
color = _ImportCol;
backgroundColor = _ImportColorCursor;
}
}catch(e){ for( var i in e ) alert(i+': '+e[i]); }
}
function _ImportLeft(){
try{
with( S("#_ImportCSV").obj.rows[0].cells[_ImportCol].style ){
color = _ImportCol;
backgroundColor = _ImportColorPag;
}
_ImportCol--;
if( _ImportCol<0 ) _ImportCol = _TotalCols-1;
with( S("#_ImportCSV").obj.rows[0].cells[_ImportCol].style ){
color = _ImportCol;
backgroundColor = _ImportColorCursor;
}
}catch(e){ for( var i in e ) alert(i+': '+e[i]); }
}
function _ImportSkip(){
if( _ImportCol==null ) return;
if( event.wheelDelta >= 120 ) _ImportLeft();
else _ImportRight();
}
function _ImportClear(){
try{
S("#_ImportCSV").obj.rows[0].cells[_ImportCol].innerHTML = "&nbsp;";
S("#_ImportCSV").obj.rows[0].cells[_ImportCol].NmField = '';
}catch(e){}
return eClearEvent();
}
function _ImportField(){
var Obj = S.event(window), n;
try{
if( Obj.name=='' ) return;
if( Obj.tagName=='IMG' ){
if( Obj.className=='CheckBox' || Obj.className=='Radio' ){
Obj = DGI(Obj.name.substr(2));
}
}
if( typeof(_ImportLabel[Obj.name])=='undefined' ){
if( Obj.name.substr(0,7)=='_INPUT_' ) _ImportLabel[Obj.name] = _ImportLabel[Obj.name.substr(7)];
}
if( eTrim(S("#_ImportCSV").obj.rows[0].cells[_ImportCol].textContent)==_ImportLabel[Obj.name] ){
S("#_ImportCSV").obj.rows[0].cells[_ImportCol].textContent = '';
S("#_ImportCSV").obj.rows[0].cells[_ImportCol].NmField = '';
return;
}
for( n=0; n<_TotalCols; n++ ){
if( _ImportLabel[Obj.name]==eTrim(S("#_ImportCSV").obj.rows[0].cells[n].textContent) ){
S("#_ImportCSV").obj.rows[0].cells[n].textContent = '';
S("#_ImportCSV").obj.rows[0].cells[n].NmField = '';
break;
}
}
S("#_ImportCSV").obj.rows[0].cells[_ImportCol].textContent = ((_ImportLabel[Obj.name]==undefined) ? Obj.name : _ImportLabel[Obj.name]);
S("#_ImportCSV").obj.rows[0].cells[_ImportCol].NmField = Obj.name.replace('_INPUT_','');
_ImportRight();
}catch(e){}
Obj.blur();
}
function VerErrores( txt ){
if( !WE.eFileFree(_File) ){
top.eInfoError(window,'El fichero importado está en uso');
return;
}
var tmp = txt.split(';'), n, e;
var Texto = { 'E':'Ya Existe', 'D':'Duplicado', 'F':'Faltan valores', 'V':'Fila en blanco' };
top.eExcel("O|"+_File);
top.eExcel("V|1");
top.eExcel("INSERTCOLUMN|1");
top.eExcel("P|1,1|ESTADO IMPORTACION");
top.eExcel("IC|1,1|#FF0000");
var TD = S("#_ImportCSV").obj.rows[0].cells;
for( n=0; n<TD.length; n++ ){
if( TD[n].NmField!=undefined ) top.eExcel("IC|1,"+(n+2)+"|#00FF00");
}
for( n=0; n<tmp.length-1; n++ ){
e = tmp[n].split(',');
top.eExcel("P|"+(parseInt(e[0])+1)+",1|"+Texto[e[1]]);
top.eExcel("IC|"+(parseInt(e[0])+1)+",1|#FF0000");
}
DGI("TABBorder").style.display = 'none';
DGI("__ImportDATA").style.display = 'none';
frames['__ImportDATAIFRAME'].frameElement.style.display = 'none';
var Estilo = document.styleSheets,r;
for( r=0; r<Estilo.length; r++ ){
if( Estilo[r].href.indexOf('lista.css')>-1 || Estilo[r].href=='' ){
Estilo[r].disabled = false;
}else{
Estilo[r].disabled = true;
}
}
with( DGI('BROWSE').style ){
display = 'block';
left = (document.body.clientWidth-DGI('BROWSE').offsetWidth)/2;
top = (document.body.clientHeight-DGI('BROWSE').offsetHeight)/2;
}
}
</SCRIPT>
<TABLE border=0px cellspacing=1px cellpadding=4px id=BROWSE style='cursor:default;position:absolute;left:0px;top:0px;' oncontextmenu='return eClearEvent()' ondblclick='return eClearEvent()'>
</TABLE>
<?PHP
echo '<script type="text/javascript">';
echo 'var _ImportLabel = new Array();';
for( $n=0; $n<count($_Form); $n++ ){
$Lable =  $_Form[$n][0];
if( $Label=='' && substr($_Form[$n][9],0,2)=='L:' ) $Label = substr($_Form[$n][9],2);
if( $Lable=='' || $Lable[0]=='-' || $Lable[0]=='{' ) continue;
$txt = strip_tags(str_replace('"',chr(92).'"',$Lable));
$txt = str_replace('·',' ',$txt);
$txt = str_replace('&nbsp;',' ',$txt);
$txt = trim($txt);
$nCampo = $_Form[$n][1];
if( substr_count( $nCampo, ':' ) > 0 ){
list($nCampo) = explode( ':', $nCampo );
}else if( substr_count( $nCampo, '{' ) > 0 ){
list($nCampo) = explode( '{', $nCampo );
}
$nCampo = trim($nCampo);
echo '_ImportLabel["'.$nCampo.'"] = "'.$txt.'";'."\n";
if( $_Form[$n][8]!='' && $_Form[$n][8]!='%' ) echo 'if(typeof(_DimNoRequired["'.$nCampo.'"])=="undefined") eMarkFieldRequired("'.$nCampo.'");'."\n";
}
echo '</SCRIPT>';
function _StrFilter( $Valor, $Chrs ){
$v = '';
for( $i=0; $i<strlen($Valor); $i++ ){
$c = substr($Valor,$i,1);
if( !(strpos($Chrs,$c)===false) ) $v .= $c;
}
return $v;
}
function eStrFilter( $Valor, $Tipo, $Longitud, $Control, $vRadio ){
$ChrNum = '0123456789';
$ChrDni = 'XY';
$ChrNif = 'TRWAGMYFPDXBNJZSQVHLCKE';
$ChrCif = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
$ChrMa  = $ChrCif . 'ÇÜÑ';
$ChrAcento = 'ÁÉÍÓÚÖ';
$ChrMi  = 'abcdefghijklmnopqrstuvwxyzçüñáéíóúö';
$ChrFile= 'abcdefghijklmnopqrstuvwxyz.-_';
$ChrColor= '#ABCDEF'.$ChrNum;
$Valor = str_replace('  ',' ',trim($Valor));
if( $Control=='check' ){
$Valor = strtoupper($Valor);
if( strlen($Valor)>$Longitud ) $Valor = substr( $Valor, 0, $Longitud );
return _StrFilter( strtr($Valor,'SY','SS'), 'S' );
}else if( $Control=='radio' ){
$Valor = strtoupper($Valor);
if( strlen($Valor)>$Longitud ) $Valor = substr( $Valor, 0, $Longitud );
$DimValor = explode(',',$vRadio);
return (( in_array( $Valor, $DimValor ) ) ? $Valor : '' );
}else if( $Control=='select' ){
$Valor = strtoupper($Valor);
if( strlen($Valor)>$Longitud ) $Valor = substr( $Valor, 0, $Longitud );
$DimValor = explode(',',$vRadio);
return (( in_array( $Valor, $DimValor ) ) ? $Valor : '' );
}
switch( $Tipo ){
case 'CP':
case 'NSS':
case 'TC':
case 'T':
case '*':
case '+':
case 'CCC':
case 'NAF':
case '0':
$Valor = _StrFilter( $Valor, $ChrNum );
break;
case '-':
$Valor = str_replace('.','',$Valor);
$Valor = str_replace(',','.',$Valor);
list( $Valor ) = explode('.',$Valor);
if( $Valor[0]=='-' ){
$Valor = '-'._StrFilter( substr($Valor,1), $ChrNum );
}else{
$Valor = _StrFilter( $Valor, $ChrNum );
}
break;
case '+':
$Valor = str_replace('.','',$Valor);
$Valor = str_replace(',','.',$Valor);
list( $Valor ) = explode('.',$Valor);
$Valor = _StrFilter( $Valor, $ChrNum );
break;
case '-,':
$Valor = str_replace('.','',$Valor);
$Valor = str_replace(',','.',$Valor);
if( $Valor[0]=='-' ){
$Valor = '-'._StrFilter( substr($Valor,1), $ChrNum.'.' );
}else{
$Valor = _StrFilter( $Valor, $ChrNum.'.' );
}
break;
case '+,':
$Valor = str_replace('.','',$Valor);
$Valor = str_replace(',','.',$Valor);
$Valor = _StrFilter( $Valor, $ChrNum.'.' );
break;
case 'DC':
$Valor = _StrFilter( $Valor, $ChrNum.'*' );
break;
case 'H':
$Valor = _StrFilter( $Valor, $ChrNum.':' );
break;
case 'DNI':
$Valor = _StrFilter( strtoupper($Valor), $ChrNum.$ChrDni.$_POST["_ChrDni"] );
if( strlen($Valor)<8 ){
if( $Valor[0]=='X' || $Valor[0]=='Y' ){
$Valor = $Valor[0].str_pad( substr($Valor,1), 7, "0", STR_PAD_LEFT );
}else{
$Valor = str_pad( $Valor, 8, "0", STR_PAD_LEFT );
}
}
break;
case 'NIF':
case 'nif':
$Chrs = $ChrNif;
if( $Longitud==9 ) $Chrs .= $ChrNum.$_POST["_ChrDni"];
$Valor = _StrFilter( strtoupper($Valor), $Chrs );
break;
case 'cif':
case 'CIF':
$Valor = _StrFilter( strtoupper($Valor), $ChrNum.$ChrCif );
break;
case 'P4':
$Valor = _StrFilter( str_replace('/','-',$Valor), $ChrNum.'-' );
break;
case 'F4':
$Valor = _StrFilter( str_replace('/','-',$Valor), $ChrNum.'-' );
list($d,$m,$a) = explode('-',$Valor);
$Valor = "{$a}-{$m}-{$d}";
break;
case 'CDI':
$Valor = _StrFilter( str_replace('/','-',$Valor), $ChrNum.'- :' );
break;
case 'N':
$Valor = _StrFilter( eStrUpper(strtoupper($Valor)), $ChrMa." .-ªº\"'" );
break;
case 'n':
$Valor = _StrFilter( eStrLower(strtolower($Valor)), $ChrMi." .-ªº\"'" );
break;
case '#N':
$Valor = _StrFilter( $Valor, $ChrMi.$ChrMa." .-ªº\"'" );
break;
case 'D':
$Valor = _StrFilter( eStrUpper(strtoupper($Valor)), $ChrNum.$ChrMa." .,-/()ªº\"'EUR" );
break;
case 'd':
$Valor = _StrFilter( eStrLower(strtolower($Valor)), $ChrNum.$ChrMi." .,-/()ªº\"'EUR" );
break;
case '#D':
$Valor = _StrFilter( $Valor, $ChrNum.$ChrMi.$ChrMa." .,-/()ªº\"'EUR" );
break;
case 'f':
$Valor = _StrFilter( $Valor, $ChrNum.$ChrFile );
break;
case 'F':
$Valor = _StrFilter( $Valor, $ChrNum.strtoupper($ChrFile) );
break;
case 'C':
$Valor = _StrFilter( $Valor, $ChrNum.$ChrMa );
break;
case 'X':
$Valor = _StrFilter( $Valor, $ChrNum.$ChrMa." .,_/()ªº\"'EUR[]:;-+=&" );
break;
case 'x':
$Valor = _StrFilter( $Valor, $ChrNum.$ChrMi." .,_/()ªº\"'EUR[]:;-+=&" );
break;
case '#X':
$Valor = _StrFilter( $Valor, $ChrNum.$ChrMi.$ChrMa.$ChrAcento." .,_/()ªº\"'EUR[]:;-+=&" );
break;
case '@':
$Valor = _StrFilter( $Valor, $ChrNum.$ChrMi.$ChrMa.'.-_@' );
break;
case 'W':
$Valor = _StrFilter( $Valor, $ChrNum.$ChrMi.$ChrMa.'.-_/:?=&' );
break;
case '#U':
$Valor = eStrUpper(strtoupper($Valor));
break;
case '#L':
$Valor = eStrLower(strtolower($Valor));
break;
case '#':
break;
case 'CLR':
$Valor = _StrFilter( strtoupper($Valor), $ChrColor);
break;
default:
}
if( strlen($Valor)>$Longitud ) $Valor = substr( $Valor, 0, $Longitud );
$Valor = str_replace("'",'&#39;',str_replace('"','&quot;',$Valor));
return $Valor;
}
