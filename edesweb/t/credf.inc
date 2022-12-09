<?PHP
function CreaFCH($_Sql, $_SqlPDOType, $_AddCreateEDF, $xFicheroD, $Opcion){
if( !function_exists("qQuery") ){
include($GLOBALS["Dir_"].$_Sql.".inc");
}
if( eSqlType('mysql') ) $_DimEDF = explode("\n", $_AddCreateEDF.CreaFCHMySql( $xFicheroD, true, (substr_count(',c,b,m,',",{$Opcion},")>0) ));
if( eSqlType('mysqli') ) $_DimEDF = explode("\n", $_AddCreateEDF.CreaFCHMySqli( $xFicheroD, true, (substr_count(',c,b,m,',",{$Opcion},")>0) ));
if( eSqlType('informix') ) $_DimEDF = explode("\n", $_AddCreateEDF.CreaFCHInformix( $xFicheroD, true, (substr_count(',c,b,m,',",{$Opcion},")>0) ));
if( eSqlType('oracle') ) $_DimEDF = explode("\n", $_AddCreateEDF.CreaFCHOracle( $xFicheroD, true, (substr_count(',c,b,m,',",{$Opcion},")>0) ));
return $_DimEDF;
}
function AddFieldQuestion($gsCampos){;
$txt2 = "";
if( $GLOBALS["_CreateQuestion"] ){
$_SL = "\n";
$_ST = " ";
$dimQ = array();
$pRem = -1;
$dim = explode("\n", PintaCampos($gsCampos, $_SL));
for($n=0; $n<count($dim); $n++){
if( $dim[$n][0]=="." && $pRem==-1 ) $pRem = $n;
$tmp = explode("|", $dim[$n]);
if( substr_count($tmp[6], "Q") ){
$tmp[6] = str_replace(array("A","M","L"), array(" "," "," "), $tmp[6]);
array_push($dimQ, implode("|",$tmp));
}
}
if( count($dimQ)>0 ){
$txt2 = '[Fields] ?'.$_SL;
if( $pRem==-1 ){
$txt2 .= ". Label | Field | TE | TC | Lng | Px | Mod | Default | Cnd | Msg Error".$_SL;
}else{
$txt2 .= $dim[1].$_SL;
}
for($n=0; $n<count($dimQ); $n++) $txt2 .= $dimQ[$n].$_SL;
$txt2 = $_SL.$txt2.$_SL.$_SL;
}
}
return $txt2;
}
function CreaFCHMySql( $table, $QTodos=false, $MarcarIndex=false, &$DimField=NULL ){
global $Opcion, $__DDBB;
qQuery('show tables');
$OkTabla = array();
$HayTablas = false;
while( $row = qRow() ){
$OkTabla[trim($row[0])] = true;
if( strtoupper($table)==strtoupper(trim($row[0])) ) $HayTablas = true;
}
if( !$HayTablas ) die('ERROR: Tabla no encontrada "SHOW TABLES"');
$vt = false;
global $_Sql;
$Tipo['mysql'] = '
TINYINT		2			-		T
SMALLINT	4			-		T
MEDIUMINT	6			-		T
INT			9			-		T
INTEGER		9			-		T
BIGINT		18			-		T
FLOAT		9,5			-,		T
DOUBLE		18,7		-,		T
DECIMAL		#			-,		T
DATE		10			F4		T
DATETIME	19			CDI		T
TIMESTAMP	14			0		T
TIME		8			H		T
YEAR		#			0		T
CHAR		#			D		T
VARCHAR		#			D		T
TINYBLOB	255,80,4	D		A
TINYTEXT	255,80,4	D		A
TEXT		2000,80,4	#		A
BLOB		2000,80,4	#		A
MEDIUMBLOB	2000,80,4	#		A
MEDIUMTEXT	2000,80,4	#		A
LONGBLOB	2000,80,4	#		A
LONGTEXT	2000,80,4	#		A
ENUM		2			0		S
SET			10			D		M
';
$txt = '';
$TIPO = array();
$Tipo = explode(chr(10), $Tipo[$_Sql]);
for($i=0;$i<count($Tipo);$i++){
if( trim($Tipo[$i])!='' ){
$Tipo[$i] = str_replace(' ', '', trim($Tipo[$i]));
while( substr_count($Tipo[$i], chr(9).chr(9))>0 ){
$Tipo[$i] = str_replace(chr(9).chr(9), chr(9), $Tipo[$i]);
}
if( substr_count($Tipo[$i], chr(9))==3 ) $TIPO[] = explode(chr(9), $Tipo[$i]);
}
}
if( $vt ) echo '<table border=1px cellspacing=0px cellpadding=2px>';
if( $vt ) echo '<caption>Definicion '.$_Sql.'</caption>';
for($i=0;$i<count($TIPO);$i++){
if( $vt ) echo '<tr>';
$TIPO[$i][0] = strtolower( $TIPO[$i][0] );
for($n=0;$n<count($TIPO[$i]);$n++){
$TIPO[$i][$n] = trim( $TIPO[$i][$n] );
if( $vt ) echo '<td>'.$TIPO[$i][$n];
}
}
if( $vt ) echo '</table><br>';
$_SL = "\n";
$_ST = " ";
$gsTabla = $table;
$gsIndice = '';
$gsOrden = '';
$NomOrden = '';
$gsCampos = array();
$gsXIndice = '';
$Autoincremental = '';
$DimNTX = array();
$DimUnico = array();
$DimALTA = array();
$uCampo = '';
$RelationFields = array();
$nRelationFields = 0;
if( $vt ) echo 'Tabla: '.$table.'<br>';
$result = mysql_query('SHOW KEYS FROM '.$table) or die('ERROR: Indices');
if( mysql_num_rows($result) > 0 ){
if( $vt ) echo '<table border=1 cellspacing=0 cellpadding=1><tr><th>Nombre de la clave<th>Unico<th>Campo</tr>';
for( $i=0 ; $i<mysql_num_rows($result); $i++ ){
$row = mysql_fetch_array($result);
if( $vt ){
echo '<tr bgcolor="#e0e0e0">';
echo "<td>{$row['Key_name']}</td>";
echo '<td>'.(($row['Non_unique']=='0') ? 'Si' : 'No' ).'</td>';
echo "<td>{$row['Column_name']}";
}
$DimNTX[trim($row['Column_name'])] = true;
if( $row['Non_unique']==="0" ){
$DimALTA[trim($row['Column_name'])] = true;
$DimUnico[] = $row['Column_name'];
}
if( strtoupper(trim($row['Key_name'])) == 'PRIMARY' ){
if( $gsIndice != '' ) $gsIndice .= ',';
$gsIndice .= trim($row['Column_name']);
}else{
if( $NomOrden == '' ) $NomOrden = $row['Key_name'];
if( $NomOrden == $row['Key_name'] ){
if( $gsOrden!='' ) $gsOrden .= ',';
$gsOrden .= trim($row['Column_name']);
}
}
if( $vt ) echo '</td></tr>';
}
if( $vt ) echo "</table>\n<br>";
}
if( $vt ){
?>
<table border=1px cellspacing=0px cellpadding=1px>
<TR><TH>Campo<TH>Tipo<TH>Atributos<TH>Null<TH>PorDefecto<TH>Extras</TR>
<?PHP
}
$xgsIndice = $gsIndice;
if( $xgsIndice=='' ) $xgsIndice = $gsXIndice;
if( $xgsIndice=='' ) $xgsIndice = $DimUnico[0];
if( $xgsIndice=='' ) $xgsIndice = $gsOrden;
$FormStatic = 0;
$PrimerCampo = "";
$result = mysql_query("SHOW FIELDS FROM {$table}") or die('ERROR:Campos');
while( $row=mysql_fetch_array($result) ){
if( 'cd_'.$table==$row['Field'] || 'nm_'.$table==$row['Field'] ) $FormStatic++;
if( $PrimerCampo=="" ) $PrimerCampo = $row['Field'];
$Obligatorio = '';
if( $row['Null']!='YES' ) $Obligatorio = '#';
if( $vt ) echo '<tr bgcolor="#e0e0e0">';
if( $vt ) echo "<td>{$row['Field']}&nbsp;</td>";
if( $vt ) echo '<td>';
$Type = stripslashes($row['Type']);
$Type = preg_replace('/BINARY/'  , '', $Type);
$Type = preg_replace('/ZEROFILL/', '', $Type);
$Type = preg_replace('/UNSIGNED/', '', $Type);
if( $vt ) echo $Type.'&nbsp;';
$Type = str_replace(')','',$Type);
$tmp = explode('(',$Type);
$tmp[0] = trim(strtolower(trim($tmp[0])));
$Deci = array( $tmp[1] );
$TipoOk = false;
for( $i=0; $i<count($TIPO); $i++ ){
if( $tmp[0] == $TIPO[$i][0] ){
$TipoOk = true;
$Control = $TIPO[$i][3];
$sTipo = $TIPO[$i][2];
if( $DimNTX[trim($row['Field'])] ){
$Modo = 'MQ';
}else{
$Modo = 'M';
}
if( $DimALTA[trim($row['Field'])] ) $Modo = str_replace( 'M','A',$Modo );
if( strtoupper(trim($row['Extra'])) == 'AUTO_INCREMENT' ){
$Modo = '-';
if( substr_count( ',b,c,m,s,q,', ",{$Opcion}," ) > 0 ) $Modo = 'Q';
$Autoincremental = $row["Field"];
}
if( $vt ) echo ' -> '.$TIPO[$i][0].':';
if( $TIPO[$i][1] == '#' ){
if( count($tmp)==2 ) $Deci = explode(',',$tmp[1]);
if( $vt ) echo trim($Deci[0]);
$Long = $Deci[0];
if( $Deci[1]!='' && $Deci[1]!='0'){
if( $vt ) echo ','.trim($Deci[1]);
$Long .= ','.$Deci[1];
}
}else{
if( $vt ) echo $TIPO[$i][1];
$Long = $TIPO[$i][1];
}
$xLong = $Long;
if( strtoupper(substr($row['Field'],0,3))!='CD_' ) $nRelationFields++;
if( $OkTabla[substr($row['Field'],3)] && strtoupper(substr($row['Field'],0,3))=='CD_' && strtoupper($row['Field'])!=strtoupper("CD_{$table}") ){
if( $_GET["_DBLimit"] ){
$Control = 'T';
}else{
$Control = 'S';
$sTipo = '0';
$Long = LongitudDelCampoMySql( $row['Field'], $Long );
if( strtoupper(substr($uCampo,0,3))=='CD_' && $OkTabla[substr($uCampo,3)] ){
$Control = 'Ss';
if( $RelationFields[$nRelationFields]=='' ){
$RelationFields[$nRelationFields] = "[RelationFields] {$uCampo},{$row['Field']}";
}else{
$RelationFields[$nRelationFields] .= ",{$row['Field']}";
}
}
}
}else if( strtoupper(substr($row['Field'],0,3))=='DT_' && $Long==10 ){
$sTipo = 'F4';
}else if( (strtoupper(substr($row['Field'],0,2))=='P_' || strtoupper(substr($row['Field'],0,3))=='PR_') && $Long==7 ){
$sTipo = 'P4';
}else{
if( substr_count(strtoupper(stripslashes($row['Type'])), 'UNSIGNED')>0 ) $sTipo = str_replace('-', '+', $sTipo);
if( strtoupper(trim($row['Extra'])) == 'AUTO_INCREMENT' ) $sTipo = str_replace('-', '+', $sTipo);
list($no1, $no2) = explode(',',$Long); $no2 = trim($no2);
if( $no2=='0' ){
$sTipo = str_replace( ',','', $sTipo );
$Long = str_replace( ',0','', $Long );
}else if( $no2>0 ){
$Long = ($no1-$no2).",".$no2;
}
}
if( $Long>80 && substr_count($Long,',')==0 ){
$Long = $Long.',80,'.floor($Long/80);
$Control = 'A';
$sTipo = '#';
}
if( $Control=='A' && $sTipo=='#' ) $Modo .= 'L';
$Label = $row['Field'];
if( substr_count(",{$xgsIndice},", ",{$Campo},") == 1 ) $Modo = str_replace('M','A',$Modo);
if( $MarcarIndex && substr_count($Modo,'Q')==1 ) $Label = '<b><u>'.$Label.'</b></u>';
if( $QTodos && substr_count($Modo,'Q')==0 ) $Modo = 'Q'.$Modo;
$DimField[] = array( $row['Field'], $sTipo, $xLong );
$Label = ucfirst(strtolower(str_replace('_',' ',$Label)));
$gsCampos[] = array( $Label, $row['Field'], $sTipo, $Control, $Long, $Modo, $Obligatorio );
$uCampo = $row['Field'];
break;
}
}
if( !$TipoOk ) die( 'Tipo de dato no reconocido: '.strtoupper(trim($tmp[0])) );
if( $vt ) echo '</td>';
$binary   = preg_match('/BINARY/i'  , $row['Type'], $test);
$unsigned = preg_match('/UNSIGNED/i', $row['Type'], $test);
$zerofill = preg_match('/ZEROFILL/i', $row['Type'], $test);
$strAttribute = '';
if($binary)   $strAttribute='BINARY';
if($unsigned) $strAttribute='UNSIGNED';
if($zerofill) $strAttribute='UNSIGNED ZEROFILL';
if( strtoupper(trim($row['Extra'])) == 'AUTO_INCREMENT' ) $gsXIndice = $row['Field'];
if( $vt ){
echo '<td>'.$strAttribute.'&nbsp;</td>';
echo '<td>'.( ( $row['Null'] == '' ) ? 'No' : 'Si' ).'</td>';
echo '<td>'.(( isset($row['Default']) ) ? $row['Default'] : '' ).'&nbsp;</td>';
echo '<td>'.$row['Extra'].'&nbsp;</td>';
echo '</tr>';
}
}
if( $vt ) echo '</table>';
if( $gsIndice=='' ) $gsIndice = $gsXIndice;
if( $gsIndice=='' ) $gsIndice = $DimUnico[0];
if( $gsOrden =='' ) $gsOrden = $gsIndice;
if( $gsIndice=='' ) $gsIndice = $gsOrden;
if( $gsOrden=='' ) $gsOrden = $PrimerCampo;
$ConSerial = '';
if( $Autoincremental!='' ) $ConSerial = ' ';
if( file_exists('../_d_/cfg/include.edf') ) $txt .= file_get_contents('../_d_/cfg/include.edf')."\n";
$txt .= "[Title]  {$ConSerial} ".strtoupper($gsTabla).$_SL.$_SL;
if( $__DDBB!='' ) $txt .= "[DB]      {$ConSerial}{$__DDBB}{$_SL}";
$txt .= "[DBTable] {$ConSerial}{$gsTabla}{$_SL}";
if( $gsIndice<>"" ){
$txt .= "[DBIndex] {$ConSerial}{$gsIndice}{$_SL}";
}else{
$txt .= "[DBIndex] {$ConSerial}{$gsOrden}{$_SL}";
}
$txt .= "[DBOrder] {$ConSerial}{$gsOrden}{$_SL}";
if( $_GET["_DBLimit"] && substr($GLOBALS["FicheroD"],-4)=='.tbl' ){
$txt .= "[DBLimit] ".$_GET["_DBLimit"]."{$_SL}";
}
if( $Autoincremental != '' ) $txt .= '[DBSerial] '.$Autoincremental;
if( $FormStatic==2 ) $txt .= $_SL.'[FormStatic]';
$txt .= "{$_SL}{$_SL}";
if( count($RelationFields)>0 ){
for( $n=0; $n<count($RelationFields); $n++ ){
if( $RelationFields[$n]!='' ) $txt .= $RelationFields[$n].$_SL;
}
}
$txt .= AddFieldQuestion($gsCampos);
$txt .= '[Fields]'. PintaCampos( $gsCampos, $_SL ). $_SL.$_SL.$_SL.$_SL;
if( $_SESSION["_D_"]=="~" && $_GET["_IncludeDF"] ){
$txt .= file_get_contents(eScript($_GET["_IncludeDF"]));
$txt .= $_SL;
}
if( file_exists('../_d_/cfg/include_end.edf') ) $txt .= file_get_contents('../_d_/cfg/include_end.edf')."\n";
$txt .= '[Note]'.$_SL;
return $txt;
}
function CreaFCHMySqli( $table, $QTodos=false, $MarcarIndex=false, &$DimField=NULL ){
global $Opcion, $__DDBB;
qQuery('show tables');
$OkTabla = array();
$HayTablas = false;
while( $row = qRow() ){
$OkTabla[trim($row[0])] = true;
if( strtoupper($table)==strtoupper(trim($row[0])) ) $HayTablas = true;
}
if( !$HayTablas ) die( 'ERROR: Tabla "'.$table.'" no encontrada "SHOW TABLES"');
$vt = false;
global $_Sql;
$Tipo['mysqli'] = '
TINYINT		2			-		T
SMALLINT	4			-		T
MEDIUMINT	6			-		T
INT			9			-		T
INTEGER		9			-		T
BIGINT		18			-		T
FLOAT		9,5			-,		T
DOUBLE		18,7		-,		T
DECIMAL		#			-,		T
DATE		10			F4		T
DATETIME	19			CDI		T
TIMESTAMP	14			0		T
TIME		8			H		T
YEAR		#			0		T
CHAR		#			D		T
VARCHAR		#			D		T
TINYBLOB	255,80,4	D		A
TINYTEXT	255,80,4	D		A
TEXT		2000,80,4	#		A
BLOB		2000,80,4	#		A
MEDIUMBLOB	2000,80,4	#		A
MEDIUMTEXT	2000,80,4	#		A
LONGBLOB	2000,80,4	#		A
LONGTEXT	2000,80,4	#		A
ENUM		2			0		S
SET			10			D		M
';
$txt = '';
$TIPO = array();
$Tipo = explode(chr(10), $Tipo[$_Sql]);
for($i=0;$i<count($Tipo);$i++){
if( trim($Tipo[$i])!='' ){
$Tipo[$i] = str_replace(' ', '', trim($Tipo[$i]));
while( substr_count($Tipo[$i], chr(9).chr(9))>0 ){
$Tipo[$i] = str_replace(chr(9).chr(9), chr(9), $Tipo[$i]);
}
if( substr_count($Tipo[$i], chr(9))==3 ) $TIPO[] = explode(chr(9), $Tipo[$i]);
}
}
if( $vt ) echo '<table border=1px cellspacing=0px cellpadding=2px>';
if( $vt ) echo '<caption>Definicion '.$_Sql.'</caption>';
for($i=0;$i<count($TIPO);$i++){
if( $vt ) echo '<tr>';
$TIPO[$i][0] = strtolower( $TIPO[$i][0] );
for($n=0;$n<count($TIPO[$i]);$n++){
$TIPO[$i][$n] = trim( $TIPO[$i][$n] );
if( $vt ) echo '<td>'.$TIPO[$i][$n];
}
}
if( $vt ) echo '</table><br>';
$_SL = "\n";
$_ST = " ";
$gsTabla = $table;
$gsIndice = '';
$gsOrden = '';
$NomOrden = '';
$gsCampos = array();
$gsXIndice = '';
$Autoincremental = '';
$DimNTX = array();
$DimUnico = array();
$DimALTA = array();
$uCampo = '';
$RelationFields = array();
$nRelationFields = 0;
if( $vt ) echo 'Tabla: '.$table.'<br>';
qQuery('SHOW KEYS FROM '.$table);
if( $vt ) echo '<table border=1 cellspacing=0 cellpadding=1><tr><th>Nombre de la clave<th>Unico<th>Campo</tr>';
while( $row=qArray() ){
if( $vt ){
echo '<tr bgcolor="#e0e0e0">';
echo "<td>{$row['Key_name']}</td>";
echo '<td>'.(($row['Non_unique']=='0') ? 'Si' : 'No' ).'</td>';
echo "<td>{$row['Column_name']}";
}
$DimNTX[trim($row['Column_name'])] = true;
if( $row['Non_unique']==="0" ){
$DimALTA[trim($row['Column_name'])] = true;
$DimUnico[] = $row['Column_name'];
}
if( strtoupper(trim($row['Key_name']))=='PRIMARY' ){
if( $gsIndice != '' ) $gsIndice .= ',';
$gsIndice .= trim($row['Column_name']);
}else{
if( $NomOrden == '' ) $NomOrden = $row['Key_name'];
if( $NomOrden == $row['Key_name'] ){
if( $gsOrden!='' ) $gsOrden .= ',';
$gsOrden .= trim($row['Column_name']);
}
}
if( $vt ) echo '</td></tr>';
}
if( $vt ) echo "</table>\n<br>";
if( $vt ){
?>
<table border=1px cellspacing=0px cellpadding=1px>
<TR><TH>Campo<TH>Tipo<TH>Atributos<TH>Null<TH>PorDefecto<TH>Extras</TR>
<?PHP
}
$xgsIndice = $gsIndice;
if( $xgsIndice=='' ) $xgsIndice = $gsXIndice;
if( $xgsIndice=='' ) $xgsIndice = $DimUnico[0];
if( $xgsIndice=='' ) $xgsIndice = $gsOrden;
$FormStatic = 0;
$PrimerCampo = "";
qQuery("SHOW FIELDS FROM {$table}");
while( $row=qArray() ){
if( 'cd_'.$table==$row['Field'] || 'nm_'.$table==$row['Field'] ) $FormStatic++;
if( $PrimerCampo=="" ) $PrimerCampo = $row['Field'];
$Obligatorio = '';
if( $row['Null']!='YES' ) $Obligatorio = '#';
if( $vt ){
echo '<tr bgcolor="#e0e0e0">';
echo "<td>{$row['Field']}&nbsp;</td>";
echo '<td>';
}
$Type = stripslashes($row['Type']);
$Type = preg_replace('/BINARY/'  , '', $Type);
$Type = preg_replace('/ZEROFILL/', '', $Type);
$Type = preg_replace('/UNSIGNED/', '', $Type);
if( $vt ) echo $Type.'&nbsp;';
$Type = str_replace(')','',$Type);
$tmp = explode('(',$Type);
$tmp[0] = trim(strtolower(trim($tmp[0])));
$Deci = array($tmp[1]);
$TipoOk = false;
for($i=0; $i<count($TIPO); $i++){
if( $tmp[0]==$TIPO[$i][0] ){
$TipoOk = true;
$Control = $TIPO[$i][3];
$sTipo = $TIPO[$i][2];
if( $DimNTX[trim($row['Field'])] ){
$Modo = 'MQ';
}else{
$Modo = 'M';
}
if( $DimALTA[trim($row['Field'])] ) $Modo = str_replace( 'M','A',$Modo );
if( strtoupper(trim($row['Extra'])) == 'AUTO_INCREMENT' ){
$Modo = '-';
if( substr_count( ',b,c,m,s,q,', ",{$Opcion}," ) > 0 ) $Modo = 'Q';
$Autoincremental = $row["Field"];
}
if( $vt ) echo ' -> '.$TIPO[$i][0].':';
if( $TIPO[$i][1] == '#' ){
if( count($tmp)==2 ) $Deci = explode(',',$tmp[1]);
if( $vt ) echo trim($Deci[0]);
$Long = $Deci[0];
if( $Deci[1]!='' && $Deci[1]!='0'){
if( $vt ) echo ','.trim($Deci[1]);
$Long .= ','.$Deci[1];
}
}else{
if( $vt ) echo $TIPO[$i][1];
$Long = $TIPO[$i][1];
}
$xLong = $Long;
if( strtoupper(substr($row['Field'],0,3)) != 'CD_' ) $nRelationFields++;
if( $OkTabla[substr($row['Field'],3)] && strtoupper(substr($row['Field'],0,3)) == 'CD_' && strtoupper($row['Field']) != strtoupper("CD_{$table}") ){
if( $_GET["_DBLimit"] ){
$Control = 'T';
}else{
$Control = 'S';
$sTipo = '0';
$Long = LongitudDelCampoMySql( $row['Field'], $Long );
if( strtoupper(substr($uCampo,0,3)) == 'CD_' && $OkTabla[substr($uCampo,3)] ){
$Control = 'Ss';
if( $RelationFields[$nRelationFields]=='' ){
$RelationFields[$nRelationFields] = "[RelationFields] {$uCampo},{$row['Field']}";
}else{
$RelationFields[$nRelationFields] .= ",{$row['Field']}";
}
}
}
}else if( strtoupper(substr($row['Field'],0,3)) == 'DT_' && $Long==10 ){
$sTipo = 'F4';
}else if( (strtoupper(substr($row['Field'],0,2)) == 'P_' || strtoupper(substr($row['Field'],0,3)) == 'PR_') && $Long==7 ){
$sTipo = 'P4';
}else{
if( substr_count( strtoupper(stripslashes($row['Type'])), 'UNSIGNED' ) > 0 ) $sTipo = str_replace( '-','+', $sTipo );
if( strtoupper(trim($row['Extra'])) == 'AUTO_INCREMENT' ) $sTipo = str_replace( '-','+', $sTipo );
list( $no1, $no2 ) = explode(',',$Long); $no2 = trim($no2);
if( $no2=='0' ){
$sTipo = str_replace( ',','', $sTipo );
$Long = str_replace( ',0','', $Long );
}else if( $no2>0 ){
$Long = ($no1-$no2).",".$no2;
}
}
if( $Long>80 && substr_count($Long,',')==0 ){
$Long = $Long.',80,'.floor($Long/80);
$Control = 'A';
$sTipo = '#';
}
if( $Control == 'A' && $sTipo == '#' ) $Modo .= 'L';
$Label = $row['Field'];
if( substr_count(",{$xgsIndice},", ",{$Campo},")==1 ) $Modo = str_replace('M','A',$Modo);
if( $MarcarIndex && substr_count($Modo,'Q')==1 ) $Label = '<b><u>'.$Label.'</b></u>';
if( $QTodos && substr_count($Modo,'Q')==0 ) $Modo = 'Q'.$Modo;
$DimField[] = array($row['Field'], $sTipo, $xLong);
$Label = ucfirst(strtolower(str_replace('_',' ',$Label)));
$gsCampos[] = array($Label, $row['Field'], $sTipo, $Control, $Long, $Modo, $Obligatorio);
$uCampo = $row['Field'];
break;
}
}
if( !$TipoOk ) die('Tipo de dato no reconocido: '.strtoupper(trim($tmp[0])));
if( $vt ) echo '</td>';
$binary   = preg_match('/BINARY/i'  , $row['Type'], $test);
$unsigned = preg_match('/UNSIGNED/i', $row['Type'], $test);
$zerofill = preg_match('/ZEROFILL/i', $row['Type'], $test);
$strAttribute = '';
if($binary)   $strAttribute='BINARY';
if($unsigned) $strAttribute='UNSIGNED';
if($zerofill) $strAttribute='UNSIGNED ZEROFILL';
if( strtoupper(trim($row['Extra'])) == 'AUTO_INCREMENT' ) $gsXIndice = $row['Field'];
if( $vt ){
echo '<td>'.$strAttribute.'&nbsp;</td>';
echo '<td>'.( ( $row['Null'] == '' ) ? 'No' : 'Si' ).'</td>';
echo '<td>'.(( isset($row['Default']) ) ? $row['Default'] : '' ).'&nbsp;</td>';
echo '<td>'.$row['Extra'].'&nbsp;</td>';
echo '</tr>';
}
}
if( $vt ) echo '</table>';
if( $gsIndice=='' ) $gsIndice = $gsXIndice;
if( $gsIndice=='' ) $gsIndice = $DimUnico[0];
if( $gsOrden =='' ) $gsOrden = $gsIndice;
if( $gsIndice=='' ) $gsIndice = $gsOrden;
if( $gsOrden=='' ) $gsOrden = $PrimerCampo;
$ConSerial = '';
if( $Autoincremental!='' ) $ConSerial = ' ';
if( file_exists('../_d_/cfg/include.edf') ) $txt .= file_get_contents('../_d_/cfg/include.edf')."\n";
$txt .= "[Title]  {$ConSerial} ".strtoupper($gsTabla).$_SL.$_SL;
if( $__DDBB!='' ) $txt .= "[DB]      {$ConSerial}{$__DDBB}{$_SL}";
$txt .= "[DBTable] {$ConSerial}{$gsTabla}{$_SL}";
if( $gsIndice<>"" ){
$txt .= "[DBIndex] {$ConSerial}{$gsIndice}{$_SL}";
}else{
$txt .= "[DBIndex] {$ConSerial}{$gsOrden}{$_SL}";
}
$txt .= "[DBOrder] {$ConSerial}{$gsOrden}{$_SL}";
if( $_GET["_DBLimit"] && substr($GLOBALS["FicheroD"],-4)=='.tbl' ){
$txt .= "[DBLimit] ".$_GET["_DBLimit"]."{$_SL}";
}
if( $Autoincremental != '' ) $txt .= '[DBSerial] '.$Autoincremental;
if( $FormStatic==2 ) $txt .= $_SL.'[FormStatic]';
$txt .= "{$_SL}{$_SL}";
if( count($RelationFields)>0 ){
for($n=0; $n<count($RelationFields); $n++){
if( $RelationFields[$n]!='' ) $txt .= $RelationFields[$n].$_SL;
}
}
$txt .= AddFieldQuestion($gsCampos);
$txt .= '[Fields]'. PintaCampos($gsCampos, $_SL). $_SL.$_SL.$_SL.$_SL;
if( $_SESSION["_D_"]=="~" && $_GET["_IncludeDF"] ){
$txt .= file_get_contents(eScript($_GET["_IncludeDF"]));
$txt .= $_SL;
}
if( file_exists('../_d_/cfg/include_end.edf') ) $txt .= file_get_contents('../_d_/cfg/include_end.edf')."\n";
$txt .= '[Note]'.$_SL;
return $txt;
}
function CreaFCHInformix( $gsTabla, $QTodos=false, $MarcarIndex=false, &$DimField=NULL ){
global $Opcion, $__DDBB;
qSelect( 'systables', 'tabname', 'tabid>100 and ( tabtype=="T" or tabtype=="S" )' );
$OkTabla = array();
while( $row = qRow() ) $OkTabla[trim($row[0])] = true;
$Tipo['informix'] = '
year to year				4			0		T
year to month				7			P4		T
year to day					10			F4		T
year to minute				16			CDI		T
year to second				19			CDI		T
date						10			F4		T
char						#			D		T
nchar						#			D		T
varchar						#			D		T
nvarchar					#			D		T
money						#			-		T
decimal						#			-,		T
smallint					4			-		T
int							2			-		T
integer						9			-		T
serial						9			-		T
int8						18			-		T
serial8						18			-		T
float						14,2		-,		T
smallfloat					6,2			-,		T
byte						1			D		T
text						2000,80,4	#		A
';
$txt = '';
$TIPO = array();
$Tipo = explode( chr(10), $Tipo['informix'] );
for( $i=0;$i<count($Tipo);$i++ ){
if( trim($Tipo[$i])!='' ){
$Tipo[$i] = str_replace( ' ', '', trim($Tipo[$i]) );
while( substr_count( $Tipo[$i], chr(9).chr(9) ) > 0 ){
$Tipo[$i] = str_replace( chr(9).chr(9), chr(9), $Tipo[$i] );
}
if( substr_count( $Tipo[$i], chr(9) ) == 3 ){
$tmp = explode( chr(9), $Tipo[$i]);
$TIPO[$tmp[0]] = array($tmp[1],$tmp[2],$tmp[3]);
}
}
}
$_SL = "\n";
$_ST = " ";
$gsIndice = '';
$gsOrden = '';
$NomOrden = '';
$gsCampos = array();
$gsXIndice = '';
$Autoincremental = '';
$DimNTX = array();
$DimALTA = array();
$uCampo = '';
$RelationFields = array();
$nRelationFields = 0;
$OriTabla = $NomTabla = $gsTabla;
if( qCount('systables',"tabname='{$NomTabla}'" ) == 0 ){
die( 'ERROR: Tabla no encontrada "systables"');
}
qSelect('systables','*',"tabname='{$NomTabla}'" );
$row = qArray();
if( $row['tabtype']=='S' ){
qSelect('syssyntable','*',"tabid='".$row['tabid']."'" );
$row = qArray();
qSelect('systables','*',"tabid='".$row['btabid']."'" );
$row = qArray();
}
$bd_tabid = $row['tabid'];
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
$PrimerCampo = "";
$DimCampo = array();
$DimDim = array();
while( ($Dim = qArray($pTabla)) ){
$DimDim[] = $Dim;
$DimCampo[$Dim['colno']] = trim($Dim['colname']);
if( $PrimerCampo=="" ) $PrimerCampo = trim($Dim['colname']);
}
$DimNTX = array();
$DimLstNTX = array();
$DimUnico = array();
$npart = 17;
$cad_sql = 'select part1,part2,part3,part4,part5,part6,part7,part8,part9,part10,part11,part12,part13,part14,part15,part16,idxtype from sysindexes where tabid = '.$bd_tabid;
qQuery( $cad_sql );
$i = 0;
while( $Dim = qArray() ){
$xIndice = '';
$num = 0;
for( $l=1; $l<$npart; $l++ ){
if( trim($Dim['part'.$l]) ){
$ind[$i][$num] = trim($Dim['part'.$l]);
if( $num > 0 && trim($DimCampo[$ind[$i][$num]])!='' ) $xIndice .= ', ';
$xIndice .= $DimCampo[$ind[$i][$num]];
$DimNTX[ $DimCampo[$ind[$i][$num]] ] = true;
$num++;
}
}
$DimLstNTX[$i] = $xIndice;
if( trim($Dim['idxtype']) == 'U' ){
$ind[$i][16] = 'S';
if( $gsIndice == '' ){
$gsIndice = $xIndice;
$tmp = explode(',',str_replace(' ','',$gsIndice));
for( $l=0; $l<count($tmp); $l++ ){
$DimUnico[$tmp[$l]] = true;
}
}else{
if( substr_count($xIndice,',') < substr_count($gsIndice,',') ) $gsIndice = $xIndice;
}
}else{
$ind[$i][16] = 'N';
}
$i++;
}
$ConSerial = '';
$Memo = '';
for( $p=0; $p<count($DimDim); $p++ ){
$Dim = $DimDim[$p];
$Nulos = '';
if( $Dim['coltype'] > 255 ){
$Nulos = ' not null ';
$Restar = 32768;
for( $n=0; $n<8; $n++ ){
if( $Dim['coltype'] >= $Restar ) $Dim['coltype'] -= $Restar;
$Restar = $Restar/2;
}
}
$Campo = trim($Dim['colname']);
$Label = $Campo;
$sTipo = 'D';
$Control = 'T';
$Modo = 'M';
$Obligatorio = '';
$i = strtolower($DimTipos[$Dim['coltype']]);
$Control = $TIPO[$i][2];
$sTipo = $TIPO[$i][1];
$Long = $TIPO[$i][0];
if( $Long=='#' ) $Long = $Dim['collength'];
if( $DimNTX[$Campo] ) $Modo = 'MQ';
if( $DimUnico[$Campo] ) $Obligatorio = '#';
if( $Nulos != '' ) $Obligatorio = '#';
$DimNTX[ $Campo ] = $Campo;
switch( $DimTipos[$Dim['coltype']] ){
case 'DATETIME':
case 'INTERVAL':
for( $n=11; $n<16; $n++ ){
if( $Dim[collength] >= (256*$n) ) $Dim[collength] -= (256*$n);
}
$bin = decbin( $Dim['collength'] );
$bin = substr($bin,-8);
$desde = substr($bin,0,4);
$hasta = substr($bin,-4);
$i = $DimPrecision[$desde].'to'.$DimPrecision[$hasta];
if( $TIPO[$i][0] != '' ){
$Control = $TIPO[$i][2];
$sTipo = $TIPO[$i][1];
$Long = $TIPO[$i][0];
}
break;
case 'DATE':
$sTipo = 'F4';
$Long = 10;
break;
case 'TEXT':
if( $Memo!='' ) $Memo .= ', ';
$Memo .= $Campo;
case 'SMALLINT';
case 'INTEGER':
case 'FLOAT':
case 'SMALLFLOAT':
break;
case 'DECIMAL':
$Long = floor($Dim['collength'] / 256).','.($Dim['collength'] % 256);
break;
case 'VARCHAR':
$Long = ($Dim['collength'] % 256);
break;
case 'SERIAL':
$Modo = '-';
if( substr_count( ',b,c,m,s,q,', ",{$Opcion}," ) > 0 ) $Modo = 'Q';
$Autoincremental = $Campo;
$ConSerial = ' ';
break;
default:
}
if( strtoupper(substr($Campo,0,3))!='CD_' ) $nRelationFields++;
if( $OkTabla[substr($Campo,3)] && strtoupper(substr($Campo,0,3))=='CD_' && strtoupper($Campo)!=strtoupper("CD_{$gsTabla}") ){
$Control = 'S';
$sTipo = '0';
if( $OkTabla[substr($uCampo,3)] && strtoupper(substr($uCampo,0,3))=='CD_' ){
if( $_GET["_DBLimit"] ){
$Control = 'T';
}else{
$Control = 'Ss';
if( $RelationFields[$nRelationFields]=='' ){
$RelationFields[$nRelationFields] = "[RelationFields] {$uCampo},{$Campo}";
}else{
$RelationFields[$nRelationFields] .= ",{$Campo}";
}
}
}
}else if( strtoupper(substr($Campo,0,3))=='DT_' && $Long==10 ){
$sTipo = 'F4';
}else if( (strtoupper(substr($Campo,0,2))=='P_' || strtoupper(substr($Campo,0,3))=='PR_' ) && $Long==7 ){
$sTipo = 'P4';
}else{
list( $no1, $no2 ) = explode(',',$Long); $no2 = trim($no2);
if( $no2=='0' ){
$sTipo = str_replace( ',','', $sTipo );
$Long = str_replace( ',0','', $Long );
}else if( $no2>0 ){
$Long = ($no1-$no2).",".$no2;
}
}
if( $Long > 80 && substr_count($Long,',')==0 ){
$Long = $Long.',80,'.floor($Long/80);
$Control = 'A';
$sTipo = '#';
}
if( $Control == 'A' && $sTipo == '#' ) $Modo .= 'L';
if( substr_count( ",{$gsIndice},", ",{$Campo}," ) == 1 ) $Modo = str_replace('M','A',$Modo);
if( $MarcarIndex && substr_count($Modo,'Q')==1 ) $Label = '<b><u>'.$Label.'</b></u>';
if( $QTodos && substr_count($Modo,'Q')==0 ) $Modo = 'Q'.$Modo;
$Label = ucfirst(strtolower(str_replace('_',' ',$Label)));
$gsCampos[] = array( $Label, $Campo, $sTipo, $Control, $Long, $Modo, $Obligatorio );
}
if( $gsIndice=='' ) $gsIndice = $gsXIndice;
if( $gsIndice=='' ) $gsIndice = $DimLstNTX[0];
if( $gsOrden =='' ) $gsOrden = $gsIndice;
if( $Autoincremental != '' ) $gsIndice = $Autoincremental;
if( $gsIndice=='' ) $gsIndice = $gsOrden;
if( $gsOrden=="" ) $gsOrden = $PrimerCampo;
if( file_exists('../_d_/cfg/include.edf') ) $txt .= file_get_contents('../_d_/cfg/include.edf')."\n";
$txt .= "[Title]  {$ConSerial} ".strtoupper($gsTabla).$_SL.$_SL;
if( $__DDBB!='' ) $txt .= "[DB]      {$ConSerial}{$__DDBB}{$_SL}";
$txt .= "[DBTable] {$ConSerial}{$gsTabla}{$_SL}";
if( $gsIndice<>"" ){
$txt .= "[DBIndex] {$ConSerial}{$gsIndice}{$_SL}";
}else{
$txt .= "[DBIndex] {$ConSerial}{$gsOrden}{$_SL}";
}
$txt .= "[DBOrder] {$ConSerial}{$gsOrden}{$_SL}";
if( $_GET["_DBLimit"] && substr($GLOBALS["FicheroD"],-4)=='.tbl' ){
$txt .= "[DBLimit] ".$_GET["_DBLimit"]."{$_SL}";
}
if( $Autoincremental != '' ) $txt .= '[DBSerial] '.$Autoincremental;
if( $Memo != '' ) $txt .= "[DBMemo]  {$ConSerial}".$Memo;
$txt .= "{$_SL}{$_SL}";
if( count($RelationFields)>0 ){
for( $n=0; $n<count($RelationFields); $n++ ){
if( $RelationFields[$n]!='' ) $txt .= $RelationFields[$n].$_SL;
}
}
$txt .= AddFieldQuestion($gsCampos);
$txt .= '[Fields]'. PintaCampos( $gsCampos, $_SL ). $_SL.$_SL.$_SL.$_SL;
if( file_exists('../_d_/cfg/include_end.edf') ) $txt .= file_get_contents('../_d_/cfg/include_end.edf')."\n";
$txt .= '[Note]'.$_SL;
return $txt;
}
function CreaFCHOracle( $gsTabla, $QTodos=false, $MarcarIndex=false, &$DimField=NULL ){
global $Opcion, $_SqlUsuario, $_SqlOwner, $__DDBB;
$SqlUsuario = strtoupper($_SqlUsuario);
$Tipo['oracle'] = '
date				10		F4		T
day to second		8		T		T
year to month		7		P4		T
timestamp			14		0		T
char				#		D		T
nchar				#		D		T
varchar2			#		D		T
nvarchar2			#		D		T
number				#		-		T
int					2		-		T
integer				9		-		T
smallint			4		-		T
dec					#		-		T
decimal				#		-		T
numeric				#		-		T
doble precision		#		-		T
float				14,2	-,		T
real				#		-		T
';
$OkTabla = array();
$Owner = (($_SqlOwner!='')? $_SqlOwner : $SqlUsuario);
$Owner = strtolower($Owner);
$sql = "SELECT TABLE_NAME FROM all_tables where lower(OWNER)='{$Owner}'";
if( file_exists('__create.txt') ) error_log($sql."\n",3,'__create.txt');
qQuery( $sql );
while( $row = qRow() ){
$OkTabla[trim(strtolower($row[0]))] = true;
}
$txt = '';
$TIPO = array();
$Tipo = explode( chr(10), $Tipo['oracle'] );
for( $i=0;$i<count($Tipo);$i++ ){
if( trim($Tipo[$i])!='' ){
$Tipo[$i] = str_replace( ' ', '', trim($Tipo[$i]) );
while( substr_count( $Tipo[$i], chr(9).chr(9) ) > 0 ){
$Tipo[$i] = str_replace( chr(9).chr(9), chr(9), $Tipo[$i] );
}
if( substr_count( $Tipo[$i], chr(9) ) == 3 ){
$tmp = explode( chr(9), $Tipo[$i]);
$TIPO[$tmp[0]] = array($tmp[1],$tmp[2],$tmp[3]);
}
}
}
$_SL = "\n";
$_ST = " ";
$uTabla = strtolower($gsTabla);
$gsIndice = '';
$gsOrden = '';
$NomOrden = '';
$gsCampos = array();
$gsXIndice = '';
$Autoincremental = '';
$DimNTX = array();
$DimALTA = array();
$uCampo = '';
$RelationFields = array();
$nRelationFields = 0;
$OriTabla = $NomTabla = $gsTabla;
if( file_exists('__create.txt') ) error_log('select count(*) from all_tables where '."lower(table_name)='{$uTabla}' and lower(OWNER)='{$Owner}'"."\n",3,'__create.txt');
if( qCount('all_tables', "lower(table_name)='{$uTabla}' and lower(OWNER)='{$Owner}'") == 0 ){
die( 'ERROR: Tabla no encontrada "all_tables"');
}
global $_Result;
$YaIndice = false;
$YaOrden = false;
$sql = "SELECT INDEX_NAME,UNIQUENESS FROM all_indexes where lower(TABLE_OWNER)='{$Owner}' and lower(TABLE_NAME)='{$uTabla}'";
if( file_exists('__create.txt') ) error_log($sql."\n",3,'__create.txt');
qQuery($sql);
while( OCIFetch($_Result) ){
$EsUnico = ( OCIResult($_Result,'UNIQUENESS')=='UNIQUE' );
$sql = "SELECT COLUMN_NAME,DESCEND FROM all_ind_columns where lower(INDEX_OWNER)='{$Owner}' and lower(TABLE_NAME)='{$uTabla}' and INDEX_NAME='".OCIResult($_Result,'INDEX_NAME')."' order by COLUMN_POSITION";
if( file_exists('__create.txt') ) error_log($sql."\n",3,'__create.txt');
qQuery($sql, $pt);
while( OCIFetch($pt) ){
$iCampo = strtolower(OCIResult($pt,'COLUMN_NAME'));
$DimNTX[$iCampo] = true;
if( OCIResult($_Result,'UNIQUENESS')=='UNIQUE' ){
$DimALTA[$iCampo] = true;
$DimUnico[] = $iCampo;
}
if( $EsUnico && !$YaIndice ){
if( $gsIndice != '' ) $gsIndice .= ',';
$gsIndice .= $iCampo;
}else{
if( !$YaOrden ){
if( $gsOrden!='' ) $gsOrden .= ',';
$gsOrden .= $iCampo;
}
}
}
if( $gsIndice!='' ) $YaIndice = true;
if( $gsOrden!='' ) $YaOrden = true;
}
if( $gsOrden=='' ) $gsOrden = $gsIndice;
if( file_exists('__create.txt') ) error_log('select count(*) from all_sequences where '."lower(SEQUENCE_NAME)='sq{$uTabla}' and lower(SEQUENCE_OWNER)='{$Owner}'"."\n",3,'__create.txt');
if( qCount('all_sequences', "lower(SEQUENCE_NAME)='sq{$uTabla}' and lower(SEQUENCE_OWNER)='{$Owner}'", $pt ) == 1 ){
$Autoincremental = ' ';
$ConSerial = ' ';
}
$PrimerCampo = "";
$txt = '';
$sql = "select * from all_tab_cols where lower(table_name)='{$uTabla}' order by COLUMN_ID";
if( file_exists('__create.txt') ) error_log($sql."\n",3,'__create.txt');
qQuery($sql);
while( OCIFetch($_Result) ){
$Label = $Campo = strtolower(OCIResult($_Result,'COLUMN_NAME'));
if( $PrimerCampo=="" ) $PrimerCampo = $Campo;
$sTipo = 'D';
$Control = 'T';
$Long = 0;
$Modo = 'M';
if( substr_count(",{$gsIndice},",",{$Campo}," )==1 ) $Modo = 'A';
if( $DimNTX[$Campo] ) $Modo = 'Q'.$Modo;
$Obligatorio = '';
$txt .= '<TR><TD>'.strtolower(OCIResult($_Result,'COLUMN_NAME')).'<TD nowrap> '.strtolower(OCIResult($_Result,'DATA_TYPE'));
if( OCIResult($_Result,'DATA_TYPE')!='DATE' && substr(OCIResult($_Result,'DATA_TYPE'),0,9)!='TIMESTAMP' ){
$txt .= '(';
if( OCIResult($_Result,'DATA_PRECISION')== 0 ){
$txt .= OCIResult($_Result,'DATA_LENGTH');
$Long = OCIResult($_Result,'DATA_LENGTH');
}else{
$txt .= OCIResult($_Result,'DATA_PRECISION');
$Long = OCIResult($_Result,'DATA_PRECISION');
if( OCIResult($_Result,'DATA_SCALE')!=0 ){
$txt .= ','.OCIResult($_Result,'DATA_SCALE');
$Long .= ','.OCIResult($_Result,'DATA_SCALE');
$sTipo = '-,';
}
}
$txt .= ') ';
}else{
if( OCIResult($_Result,'DATA_TYPE')=='DATE' ){
$sTipo = 'F4';
$Long = '10';
}else if( substr(OCIResult($_Result,'DATA_TYPE'),0,9)=='TIMESTAMP' ){
$sTipo = 'CDI';
$Long = '19';
}
}
if( OCIResult($_Result,'DATA_TYPE')=='NUMBER' ) $sTipo = '-';
if( OCIResult($_Result,'NULLABLE')=='N' ){
$txt .= ' not null';
$Obligatorio = '#';
}
$txt .='<br>';
if( strtoupper(substr($Campo,0,3)) != 'CD_') $nRelationFields++;
if( $OkTabla[substr($Campo,3)] && strtoupper(substr($Campo,0,3))=='CD_' && strtoupper($Campo)!=strtoupper("CD_{$gsTabla}") ){
if( $_GET["_DBLimit"] ){
$Control = 'T';
}else{
$Control = 'S';
$sTipo = '0';
if( strtoupper(substr($uCampo,0,3)) == 'CD_' && $OkTabla[substr($uCampo,3)] ){
$Control = 'Ss';
if( $RelationFields[$nRelationFields]=='' ){
$RelationFields[$nRelationFields] = "[RelationFields] {$uCampo},{$Campo}";
}else{
$RelationFields[$nRelationFields] .= ",{$Campo}";
}
}
}
}else if( strtoupper(substr($Campo,0,3)) == 'DT_' && $Long==10 ){
$sTipo = 'F4';
}else if( (strtoupper(substr($Campo,0,2)) == 'P_' || strtoupper(substr($Campo,0,3)) == 'PR_') && $Long==7 ){
$sTipo = 'P4';
}else{
list( $no1, $no2 ) = explode(',',$Long); $no2 = trim($no2);
if( $no2=='0' ){
$sTipo = str_replace( ',','', $sTipo );
$Long = str_replace( ',0','', $Long );
}else if( $no2>0 ){
$Long = ($no1-$no2).",".$no2;
}
}
if( $Long > 80 && substr_count($Long,',')==0 ){
$Long = $Long.',80,'.floor($Long/80);
$Control = 'A';
$sTipo = '#';
}
if( $Control == 'A' && $sTipo == '#' ) $Modo .= 'L';
if( substr_count( ",{$gsIndice},", ",{$Campo}," ) == 1 ) $Modo = str_replace('M','A',$Modo);
if( $MarcarIndex && substr_count($Modo,'Q')==1 ) $Label = '<b><u>'.$Label.'</b></u>';
if( $QTodos && substr_count($Modo,'Q')==0 ) $Modo = 'Q'.$Modo;
$Label = ucfirst(strtolower(str_replace('_',' ',$Label)));
$gsCampos[] = array( $Label, $Campo, $sTipo, $Control, $Long, $Modo, $Obligatorio );
$uCampo = $Campo;
}
$txt = '';
if( $gsIndice=='' ) $gsIndice = $gsXIndice;
if( $gsIndice=='' ) $gsIndice = $DimLstNTX[0];
if( $gsOrden =='' ) $gsOrden = $gsIndice;
if( trim($Autoincremental) != '' ) $gsIndice = $Autoincremental;
if( $gsIndice=='' ) $gsIndice = $gsOrden;
if( $gsOrden=="" ) $gsOrden = $PrimerCampo;
if( file_exists('../_d_/cfg/include.edf') ) $txt .= file_get_contents('../_d_/cfg/include.edf')."\n";
$txt .= "[Title]  {$ConSerial} ".strtoupper($gsTabla).$_SL.$_SL;
if( $__DDBB!='' ) $txt .= "[DB]      {$ConSerial}{$__DDBB}{$_SL}";
$txt .= "[DBTable] {$ConSerial}{$gsTabla}{$_SL}";
if( $gsIndice<>"" ){
$txt .= "[DBIndex] {$ConSerial}{$gsIndice}{$_SL}";
}else{
$txt .= "[DBIndex] {$ConSerial}{$gsOrden}{$_SL}";
}
$txt .= "[DBOrder] {$ConSerial}{$gsOrden}{$_SL}";
if( $_GET["_DBLimit"] && substr($GLOBALS["FicheroD"],-4)=='.tbl' ){
$txt .= "[DBLimit] ".$_GET["_DBLimit"]."{$_SL}";
}
if( $Autoincremental != '' ) $txt .= '[DBSerial] '.$Autoincremental;
if( $Memo != '' ) $txt .= "[DBMemo]  {$ConSerial}".$Memo;
$txt .= "{$_SL}{$_SL}";
if( count($RelationFields) > 0 ){
for( $n=0; $n<count($RelationFields); $n++ ){
if( $RelationFields[$n]!='' ) $txt .= $RelationFields[$n].$_SL;
}
}
$txt .= AddFieldQuestion($gsCampos);
$txt .= '[Fields]'. PintaCampos( $gsCampos, $_SL ). $_SL.$_SL.$_SL;
if( file_exists('../_d_/cfg/include_end.edf') ) $txt .= file_get_contents('../_d_/cfg/include_end.edf')."\n";
$txt .= '[Note]'.$_SL;
return $txt;
}
function PintaCampos($sDim, $_SL){
$Long = array(0,0,0,0,0,0,0,0,0,0);
$txt = '';
$Dim = array();
$Dim[0] = explode('|', 'Label|Field|TE|TC|Lng|Px|Mod|Default|Cnd|Msg Error');
for( $i=0; $i<count($sDim); $i++ ){
$Dim[] = array(
$sDim[$i][0],
$sDim[$i][1],
$sDim[$i][2],
$sDim[$i][3],
$sDim[$i][4],
'',
$sDim[$i][5],
'',
$sDim[$i][6],
$sDim[$i][7]
);
}
for( $i=0; $i<count($Dim); $i++ ){
for( $e=0; $e<10; $e++ ) $Long[$e] = max( strlen($Dim[$i][$e]), $Long[$e] );
}
for( $i=0; $i<count($Dim); $i++ ){
if($i==0){
$txt .= $_SL.'.  ';
}else{
$txt .= $_SL.'   ';
}
for( $e=0; $e<10; $e++ ){
$txt .= ' ';
if( $e<9 ){
if( $e==3 && $Dim[$i][$e]=="T" && $Dim[$i][4]==1 ) $Dim[$i][$e] = "C";
$txt .= str_pad($Dim[$i][$e], $Long[$e]);
}else if( $i==0 ){
$txt .= $Dim[$i][$e];
}
if( $e<9 ) $txt .= ' |';
}
}
return $txt;
}
function LongitudDelCampoMySql($NomCampo, $Long){
$NomCampo = 'nm_'.substr($NomCampo, 3);
$table = substr($NomCampo, 3);
qQuery("SHOW FIELDS FROM {$table}", $p);
while( $row=qArray($p) ){
if( $NomCampo==trim($row['Field']) ){
$Type = str_replace(')','',$row['Type']);
$tmp = explode('(',$Type);
$tmp[0] = trim(strtolower(trim($tmp[0])));
return $tmp[1]*1;
}
}
return $Long;
}
function LongitudDelCampoInformix( $NomCampo, $Long ){
$NomCampo = 'nm_'.substr( $NomCampo, 3 );
$table = substr( $NomCampo, 3 );
return $Long;
}
function LongitudDelCampoOracle( $NomCampo, $Long ){
$NomCampo = 'nm_'.substr( $NomCampo, 3 );
$table = substr( $NomCampo, 3 );
return $Long;
}
?>
