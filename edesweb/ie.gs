<?PHP
$_GET['FILTRO'] = urldecode($_GET['FILTRO']);
$_GET['FILTRO'] = str_replace( chr(92).'"','"',$_GET['FILTRO']);
$_GET['FILTRO'] = str_replace( chr(92)."'","'",$_GET['FILTRO']);
eHTML('$ie.gs','','Imp/Exp');
?>
<LINK REL='stylesheet' HREF='<?=$_SESSION['_PathCSS']?>/lista.css' TYPE='text/css'>
<?PHP
set_time_limit( 0 );
$Enter = chr(13).chr(10);
if( $TABLA!='' ){
set_time_limit( 20*60 );
$ZIP = (strtoupper(trim($ZIP))=='TRUE');
$UNZIP = (strtoupper(trim($UNZIP))=='TRUE');
$ESTRUCTURA = (strtoupper(trim($ESTRUCTURA))=='TRUE');
$GEN_ESTRUCTURA = (strtoupper(trim($GEN_ESTRUCTURA))=='TRUE');
$TABLA = $_GET['TABLA'];
if( substr_count($TABLA, ':')>0 ){
list($NewDB, $TABLA) = explode(':', $TABLA);
$NewDB = trim($NewDB);
$TABLA = trim($TABLA);
if( $NewDB!='' ){
if( function_exists('qQuery') ) qEnd();
if( substr_count($NewDB,'.ini')==0 ) $NewDB .= '.ini';
include_once('../_datos/config/'.$NewDB);
}
}
include_once($Dir_.$_Sql.'.inc');
if( $NewDB!='' ) qConnect();
?>
</HEAD>
<BODY style="BACKGROUND:#EBF0F3" onhelp="return false;" oncontextmenu="return false;">
<SCRIPT type="text/javascript">
var _Color = document.body.style.backgroundColor;
</SCRIPT>
<?PHP
if( $ESTRUCTURA ){
echo '</BODY></HTML>';
qFree();
qEnd();
exit;
}
if( $CAMPO!='' ){
if( $UPPER_LOWER=='' ) die('ERROR');
if( substr_count($TABLA, ',')>0 ) die('ERROR');
eMultitenancy($TABLA);
$tmp = '';
$n = 0;
qSelect($TABLA, $CAMPO);
if( $UPPER_LOWER=='U' ){
$Tipo = 'mayúsculas';
while( $row=qRow() ){
qQuery('update '.$TABLA.' set '.$CAMPO.'="'.trim(strtoupper($row[0])).'" where '.$CAMPO.'="'.trim($row[0]).'"', $tmp);
$n++;
}
}else if( $UPPER_LOWER=='L' ){
$Tipo = 'minúsculas';
while( $row=qRow() ){
qQuery('update '.$TABLA.' set '.$CAMPO.'="'.trim(strtolower($row[0])).'" where '.$CAMPO.'="'.trim($row[0]).'"', $tmp);
$n++;
}
}else if( $UPPER_LOWER=='X' ){
$Tipo = 'mixto';
while( $row=qRow() ){
qQuery('update '.$TABLA.' set '.$CAMPO.'="'.ucfirst(trim(strtolower($row[0]))).'" where '.$CAMPO.'="'.trim($row[0]).'"', $tmp);
$n++;
}
}
echo '<center>';
echo $n.' Registros modificados ( '.$Tipo.' )';
echo '</center>';
echo '</BODY></HTML>';
qFree();
qEnd();
exit;
}
if( $IE=='E' || $GEN_ESTRUCTURA ){
echo '<center>';
echo '<TABLE cellspacing=1px cellpadding=2px border=0 cols=2>';
echo '<col class=Celda><col class=Celda style="text-align:right">';
echo '<TR><TH>TABLA<TH align=right>REGISTROS';
$TTRegistros = 0;
$TTablas = 0;
$DimOkTabla = array();
$DimTABLAS = explode(',', $TABLA);
for($n=0; $n<count($DimTABLAS); $n++) $DimTABLAS[$n] = trim($DimTABLAS[$n]);
if( eSqlType('mysql,mysqli') ){
qQuery('show tables');
}else if( eSqlType('pdo.informix') ){
qSelect('systables', 'tabname,tabtype', 'tabid>100');
}else if( eSqlType('informix') ){
qSelect('systables', 'tabname,tabtype', 'tabid>100');
}
if( !$GEN_ESTRUCTURA || $GEN_ESTRUCTURA=='' ){
while( ($row=qRow()) || eSqlType('oracle') ){
$sTABLA = trim($row[0]);
if( $sTABLA=='' && eSqlType('oracle') ) $sTABLA = $TABLA;
if( in_array($sTABLA, $DimTABLAS) || $TABLA=='*' ){
$oTABLA = $sTABLA;
eMultitenancy($sTABLA);
if( substr_count($sTABLA, '.')==1 ){
list($dic) = explode('.', $sTABLA);
$DimTABLAS[$sTABLA] = (qCount('INFORMATION_SCHEMA.TABLES', "TABLE_SCHEMA='{$dic}' and TABLE_NAME='{$oTABLA}'")>0);
}
$uWhere = $_GET['FILTRO'];
if( $uWhere!='' ) $uWhere = ' where '.$uWhere;
$DimOkTabla[] = $sTABLA;
$pnt = '';
$TTablas++;
$resultado = qQuery("SELECT * FROM {$sTABLA}{$uWhere}", $pnt);
if( $ZIP ){
$zp = gzopen("../_tmp/exp/{$oTABLA}.unl", 'w9');
}else{
$fd = fopen("../_tmp/exp/{$oTABLA}.unl", 'w');
}
$TReg = 0;
$Pipa = false;
while( $linea=qRow($pnt) ){
$txt = '';
if( $Pipa ) $txt .= "\n";
$Pipa = false;
foreach($linea as $valor){
if( $Pipa ){
$txt .= '|';
}else{
$Pipa = true;
}
$valor = str_replace(chr(10), '{&#10;}', $valor);
$valor = str_replace(chr(13), '{&#13;}', $valor);
$valor = str_replace('"', '&quot;', $valor);
$valor = str_replace('|', '{&#124;}', $valor);
$txt .= trim((string)$valor);
}
if( $ZIP ){
gzwrite($zp, $txt);
}else{
fputs($fd, $txt);
}
$TReg++;
}
if( $ZIP ){
gzclose($zp);
}else{
fclose($fd);
}
echo '<TR><TD>'.$sTABLA.'<TD align=right>'.eNumberFormat($TReg);
if( $TReg==0 ) @unlink("../_tmp/exp/{$oTABLA}.unl");
$TTRegistros += $TReg;
}
if( eSqlType('oracle') ) break;
}
}else{
while( $row=qRow() ){
$sTABLA = trim($row[0]);
$oTABLA = $sTABLA;
eMultitenancy($sTABLA);
if( substr_count($sTABLA, '.')==1 ){
list($dic) = explode('.', $sTABLA);
$DimTABLAS[$sTABLA] = (qCount('INFORMATION_SCHEMA.TABLES', "TABLE_SCHEMA='{$dic}' and TABLE_NAME='{$oTABLA}'")>0);
}
if( in_array($sTABLA, $DimTABLAS) || $TABLA=='*' ){
$DimOkTabla[] = $sTABLA;
$pnt = '';
$TTablas++;
}
}
}
echo '<TR><TH>'.$TTablas.'<TH align=right>'.eNumberFormat($TTRegistros);
echo '</TABLE>';
echo '</center>';
for($n=0; $n<count($DimOkTabla); $n++){
$sTABLA = $DimOkTabla[$n];
if( trim($sTABLA)!='' ){
if( eSqlType('mysql,mysqli') ) $txt = GetTablaMySql($sTABLA);
if( eSqlType('informix') ) $txt = GetTablaInformix($sTABLA);
if( eSqlType('pdo.informix') ) $txt = GetTablaInformix($sTABLA);
if( substr_count($sTABLA, '.')==1 ){
list($dic, $sTABLA) = explode('.', $sTABLA);
$txt = str_replace("create table {$dic}.{$sTABLA} (", "create table {$sTABLA} (", $txt);
}
$fd = fopen("../_tmp/exp/{$sTABLA}.str", 'w');
fputs($fd, $txt);
fclose($fd);
}
}
?>
<SCRIPT type="text/javascript">
document.body.style.backgroundColor = window.frameElement.WOPENER.S(document.body).css("backgroundColor");
window.frameElement.WOPENER.eDisableButton(0);
</SCRIPT>
</BODY></HTML>
<?PHP
qFree();
qEnd();
eEnd();
}else{
echo '<center>';
echo '<TABLE cellspacing=1px cellpadding=2px border=0 cols=2>';
echo '<col class=Celda><col class=Celda style="text-align:right">';
echo '<TR><TH>TABLA<TH align=right>REGISTROS';
if( eSqlType('mysql,mysqli') ){
qQuery('show tables');
}else if( eSqlType('pdo.informix') ){
qSelect('systables', 'tabname,tabtype', 'tabid>100');
}else if( eSqlType('informix') ){
qSelect('systables', 'tabname,tabtype', 'tabid>100');
}
while( $row=qRow() ){
$sTABLA = trim($row[0]);
$DimTabla[$sTABLA] = true;
}
if( $TABLA!='*' ){
$DimTABLAS = explode(',', $TABLA);
}else{
$DimTABLAS = array();
$DirBase = '../_tmp/imp';
$di = opendir($DirBase);
while( $file=readdir($di) ){
if( $file!='.' && $file!='..' ){
if( !is_dir("{$DirBase}/{$file}") ){
if( substr($file, -4)=='.str' ) $DimTABLAS[] = substr($file, 0, -4);
}
}
}
closedir($di);
}
for($n=0; $n<count($DimTABLAS); $n++){
$TABLA = trim($DimTABLAS[$n]);
$oTABLA = $TABLA;
eMultitenancy($TABLA);
if( substr_count($TABLA, '.')==1 ){
list($dic) = explode('.', $TABLA);
$DimTabla[$TABLA] = (qCount('INFORMATION_SCHEMA.TABLES', "TABLE_SCHEMA='{$dic}' and TABLE_NAME='{$oTABLA}'")>0);
}
if( $DimTabla[$TABLA]==false ){
if( file_exists("../_tmp/imp/{$oTABLA}.str") ){
$txt = file_get_contents("../_tmp/imp/{$oTABLA}.str");
$DimSQL = explode(';', $txt);
for($i=0; $i<count($DimSQL); $i++) if( trim($DimSQL[$i])<>'' ){
if( $TABLA!=$oTABLA ){
$DimSQL[$i] = str_replace("create table {$oTABLA} (", "create table {$TABLA} (", $DimSQL[$i]);
}
qQuery($DimSQL[$i]);
}
}
}else if( $ADD_DELETE=='B' && $_GET['FILTRO']=='' && file_exists("../_tmp/imp/{$oTABLA}.str") ){
$txt = file_get_contents("../_tmp/imp/{$oTABLA}.str");
qQuery("drop table {$TABLA}");
$DimSQL = explode(';', $txt);
for($i=0; $i<count($DimSQL); $i++) if( trim($DimSQL[$i])<>'' ){
if( $TABLA!=$oTABLA ){
$DimSQL[$i] = str_replace("create table {$oTABLA} (", "create table {$TABLA} (", $DimSQL[$i]);
}
qQuery($DimSQL[$i]);
}
}
if( $DimTabla[$TABLA]==true ){
if( qCount($TABLA)>0 ){
if( $ADD_DELETE=='B' ){
sql_Borra($TABLA);
}else if( $_GET['FILTRO']<>'' and ($_GET['FILTRO']*1)!=$_GET['FILTRO']  ){
$uWhere = $_GET['FILTRO'];
sql_Borra($TABLA, $uWhere);
}
}
$TReg = 0;
$Saltar = 0;
$fd = fopen("../_tmp/imp/{$oTABLA}.unl", 'r');
$Parcial = false;
if( $_GET['FILTRO']!='' ){
if( ($_GET['FILTRO']*1)==$_GET['FILTRO'] ){
$Parcial = true;
$Saltar = qCount($TABLA);
if( $Saltar==0 ){
}else{
for($n=0; $n<$Saltar; $n++) $txt = fgets($fd, 10000);
}
}
}
while( ($txt=fgets($fd, 90000)) ){
$txt = addslashes($txt);
$txt =	   str_replace('|'		, "','"  , chop($txt));
$txt =	   str_replace('{&#124;}', '|'    , $txt);
$txt =	   str_replace('{&#13;}' , chr(13), $txt);
$txt = "'".str_replace('{&#10;}', chr(10), $txt)."'";
$txt =	   str_replace("'0000-00-00'", "NULL", $txt);
$txt =	   str_replace("''", 'NULL', $txt);
$TReg++;
qQuery( "insert into {$TABLA} values ({$txt})" );
qFree();
if( $Parcial && $TReg>=($_GET['FILTRO']*1) ) break;
}
fclose($fd);
echo '<TR><TD>'.$TABLA.'<TD align=right>'.eNumberFormat($TReg+$Saltar);
if( $TABLA=="{$_SESSION['ShareDictionary']}gs_storage" ){
$cdi = date('Y-m-d H:i:59');
qQuery("update {$TABLA} set cdi='{$cdi}'");
}
}
$DimTabla[$TABLA] = true;
}
}
?>
<SCRIPT type="text/javascript">
document.body.style.backgroundColor = window.frameElement.WOPENER.S(document.body).css("backgroundColor");
window.frameElement.WOPENER.eDisableButton(0);
</SCRIPT>
</BODY></HTML>
<?PHP
qFree();
qEnd();
eEnd();
}
?>
<script type="text/javascript">
function Ejecutar(){
DGI("TABLA").value = DGI("TABLA").value.replace(/\s/g,'');
if( DGI("TABLA").value!='' ){
window.EXE.location.href = 'edes.php?E:$ie.gs&TABLA='+DGI("TABLA").value+'&IE='+((DGI(IE[0]).checked) ? 'E':'I')+'&ZIP='+DGI("ZIP").checked+'&ESTRUCTURA='+document.all.ESTRUCTURA.checked+'&ADD_DELETE='+((DGI(ADD_DELETE[0]).checked) ? 'B':'A');
}
}
</script>
</HEAD>
<BODY onload='top.eLoading(false,window)'>
Nombre Tabla/s: <input type=text NAME='TABLA' value=''>
Exportar<INPUT TYPE="radio" NAME="IE" VALUE='E' checked>
Importar<INPUT TYPE="radio" NAME="IE" VALUE='I'>
Comprimido<INPUT TYPE="checkbox" NAME="ZIP">
Un ZIP<INPUT TYPE="checkbox" NAME="UNZIP">
Ver estructura<INPUT TYPE="checkbox" NAME="ESTRUCTURA">
Generar estructura<INPUT TYPE="checkbox" NAME="GEN_ESTRUCTURA">
<input type='button' value='Ejecutar' onclick='Ejecutar()'>
<span style='width:177'></span>
Borrar registros<INPUT TYPE="radio" NAME="ADD_DELETE" VALUE='B'>
Añadir registros<INPUT TYPE="radio" NAME="ADD_DELETE" VALUE='A'>
<IFRAME name='EXE' _src='edes.php?E:/_datos/config/index.htm' width='100%' height='100%' FRAMEBORDER='1' SCROLLING='auto'></IFRAME>
</BODY>
</HTML>
<?PHP
function GetTablaMySql( $table, $SolCampos=false ){
global $TablasAuxiliares, $Enter;
$TotalCampos = 0;
$txt = "create table {$table} (".$Enter;
qQuery("SHOW FIELDS FROM {$table}");
while( $row=qArray() ){
$txt .= "{$row[Field]} {$row[Type]}";
if(isset($row["Default"]) && (!empty($row["Default"]) || $row["Default"] == "0"))
if( strtoupper(trim($row['Default']))=='CURRENT_TIMESTAMP' ){
$txt .= " DEFAULT {$row['Default']}";
}else{
$txt .= " DEFAULT '{$row['Default']}'";
}
if($row["Null"]!="YES")
$txt .= " NOT NULL";
if($row["Extra"]!="")
$txt .= " {$row['Extra']}";
$txt .= ",".$Enter;
$TotalCampos++;
}
$txt = preg_replace('/,$/', "", $txt);
if( $SolCampos ) return $TotalCampos;
qQuery("SHOW KEYS FROM {$table}");
while( $row = qArray() ){
$kname = $row['Key_name'];
if(($kname != "PRIMARY") && ($row['Non_unique'] == 0))
$kname="UNIQUE|{$kname}";
if(!isset($index[$kname]))
$index[$kname] = array();
$index[$kname][] = $row['Column_name'];
}
while( list($x, $columns) = @each($index) ){
$txt .= "";
if($x == "PRIMARY")
$txt .= "PRIMARY KEY (" . implode($columns, ", ") . ")";
elseif (substr($x,0,6) == "UNIQUE")
$txt .= "UNIQUE ".substr($x,7)." (" . implode($columns, ", ") . ")";
else
$txt .= "KEY $x (" . implode($columns, ", ") . ")";
$txt .= ",".$Enter;
}
$txt = substr($txt,0,strrpos($txt,',')).$Enter;
$txt .= ")".$Enter;
return(stripslashes($txt));
}
function GetTablaInformix( $table, $SolCampos=false ){
global $TablasAuxiliares, $Enter;
$TotalCampos = 0;
$OriTabla = $NomTabla = $table;
$NomAlias = '';
if( qCount('systables',"tabname='{$NomTabla}'" ) == 0 ){
die( 'ERROR: Tabla no encontrada');
}
qSelect('systables','*',"tabname='{$NomTabla}'" );
$row = qArray();
$TablaSinonimo = $row['tabtype'];
if( $row['tabtype']=='S' ){
qSelect('syssyntable','*',"tabid='".$row['tabid']."'" );
$row = qArray();
qSelect('systables','*',"tabid='".$row['btabid']."'" );
$row = qArray();
}else if( $row['tabtype']=='T' ){
qSelect('syssyntable','*',"btabid='".$row['tabid']."'",'',$p );
$row2 = qArray($p);
qSelect('systables','*',"tabid='".$row2['tabid']."'",'',$p );
$row2 = qArray($p);
$NomAlias = trim($row2['tabname']);
}
$bd_tabid = $row['tabid'];
$txt = "create table {$table} (".$Enter;
$DimTipos = array('CHAR','SMALLINT','INTEGER','FLOAT','SMALLFLOAT','DECIMAL','SERIAL','DATE','MONEY','',
'DATETIME','BYTE','TEXT','VARCHAR','INTERVAL','NCHAR','NVARCHAR','INT8','SERIAL8','SET','MULTISET','LIST','');
$DimTipos[40] = '';
$DimPrecision = array(
'0000'=>'year',
'0010'=>'month',
'0100'=>'day',
'0110'=>'hour',
'1000'=>'minute',
'1010'=>'second' );
$cad_sql = 'select A.tabname,A.ncols,A.nindexes,B.colname,B.colno,B.coltype,B.collength from systables as A, outer syscolumns as B where A.tabtype = "T" and A.tabid = B.tabid and A.tabid = '.$bd_tabid;
qQuery( $cad_sql, $pTabla );
$DimCampo = array();
$nc = 0;
while( ($Dim = qArray($pTabla)) ){
$Nulos = '';
if( $Dim['coltype'] > 255 ){
$Nulos = ' not null';
$Restar = 32768;
for( $n=0; $n<8; $n++ ){
if( $Dim['coltype'] >= $Restar ) $Dim['coltype'] -= $Restar;
$Restar = $Restar/2;
}
}
if( $nc > 0 ) $txt .= ','.$Enter;
$nc++;
$txt .= trim($Dim['colname']).' ';
$txt .= strtolower($DimTipos[$Dim['coltype']]);
switch( $DimTipos[$Dim['coltype']] ){
case 'DATETIME':
case 'INTERVAL':
for( $n=11; $n<16; $n++ ){
if( $Dim['collength'] >= (256*$n) ) $Dim['collength'] -= (256*$n);
}
$bin = decbin( $Dim['collength'] );
$bin = substr($bin,-8);
$desde = substr($bin,0,4);
$hasta = substr($bin,-4);
$txt .= ' '.$DimPrecision[$desde].' to '.$DimPrecision[$hasta];
$Dim['collength'] = '';
break;
case 'SERIAL':
case 'DATE':
case 'TEXT':
case 'SMALLINT';
case 'INTEGER':
case 'FLOAT':
case 'SMALLFLOAT':
$Dim['collength'] = '';
break;
case 'DECIMAL':
$Dim['collength'] = '('.floor($Dim['collength'] / 256).','.($Dim['collength'] % 256).')';
break;
case 'VARCHAR':
$Dim['collength'] = '('.($Dim['collength'] % 256).','.floor($Dim['collength'] / 256).')';
break;
default:
$txt .= '(';
$Dim['collength'] .= ')';
}
$txt .= $Dim['collength'].$Nulos;
$DimCampo[$Dim['colno']] = trim($Dim['colname']);
$TotalCampos++;
}
if( $SolCampos ) return $TotalCampos;
$txt .= $Enter.');'.$Enter;
$npart = 17;
$cad_sql = 'select part1,part2,part3,part4,part5,part6,part7,part8,part9,part10,part11,part12,part13,part14,part15,part16,idxtype from sysindexes where tabid = '.$bd_tabid;
qQuery( $cad_sql );
$i = 0;
while( $Dim = qArray() ){
$ListCampos = '';
$num = 0;
for( $l=1;$l<$npart;$l++ ){
if( trim($Dim['part'.$l]) ){
$ind[$i][$num] = trim($Dim['part'.$l]);
if( $ListCampos!='' ) $ListCampos .= ',';
$ListCampos .= $DimCampo[$ind[$i][$num]];
$num++;
}
}
$NTX = $i+1;
if( trim($Dim['idxtype']) == 'U' ){
$ind[$i][16] = 'S';
$txt .= "create unique index {$table}_{$NTX} on {$table} ( {$ListCampos} );".$Enter;
}else{
$ind[$i][16] = 'N';
$txt .= "create index {$table}_{$NTX} on {$table} ( {$ListCampos} );".$Enter;
}
$i++;
}
return($txt);
}
?>
