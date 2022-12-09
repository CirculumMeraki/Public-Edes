<?PHP
if( !isset($_SESSION['_User']) || $GLOBALS['_gsID']!=getmypid() ) exit;
if( $_GET["_Cache"]==1 ) $_ENV["."]["cache"] = eScriptToCache();
$_DEBUG = false;
if( isset($_SESSION["_SPIDER_"]) ){
if( !function_exists("__SpiderScript") ) include($Dir_."itm/spider.php");
}
if( $_GET['xSELECT']!='' ){
if( substr($_GET['xSELECT'],0,4)=="B2A:" ){
$SQL = base64_decode(str_replace("{43}","+",substr($_GET['xSELECT'],4)));
}else if( substr_count($_GET['xSELECT'],':')==1 && substr_count($_GET['xSELECT'],' ')==0 ){
list( $p1, $p2 ) = explode(':',$_GET['xSELECT']);
$_GET['xSELECT'] = "select {$p2}, nm_".substr($p2,3).' from '.substr($p2,3).' order by nm_'.substr($p2,3);
$SQL = $_GET['xSELECT'];
}else $SQL = $_GET['xSELECT'];
}
$_GET['WhereSelect'] = str_replace( "\\'", "'", $_GET['WhereSelect'] );
if( isset($_SCRIPT) ){
$_DESTINO_ = $_GET['_DESTINO_'];
unset($_GET['_SCRIPT'] );
unset($_GET['_DESTINO_'] );
unset($_REQUEST['_SCRIPT'] );
unset($_REQUEST['_DESTINO_'] );
unset($_REQUEST['E:$sub_select_gs'] );
$_SERVER["argv"]		= str_replace( 'E:$sub_select.gs&_SCRIPT='.$_SCRIPT.'&_DESTINO_='.$_GET['_DESTINO_'].'&', '', $_SERVER["argv"] );
$_SERVER["QUERY_STRING"]= str_replace( 'E:$sub_select.gs&_SCRIPT='.$_SCRIPT.'&_DESTINO_='.$_GET['_DESTINO_'].'&', '', $_SERVER["QUERY_STRING"] );
$_SERVER["QUERY_STRING"]= str_replace(					'_SCRIPT='.$_SCRIPT.'&_DESTINO_='.$_GET['_DESTINO_'].'&', '', $_SERVER["QUERY_STRING"] );
$_SERVER["REQUEST_URI"]	= str_replace( 'E:$sub_select.gs&_SCRIPT='.$_SCRIPT.'&_DESTINO_='.$_GET['_DESTINO_'].'&', '', $_SERVER["REQUEST_URI"] );
$Dim2 = include(eScript($_SCRIPT));
if( isset($_GET['ADDOPTIONVALUE']) ) $_ADDOPTIONVALUE = $_GET['ADDOPTIONVALUE'];
$Fichero = $_SCRIPT;
if( !isset($_ADDOPTIONVALUE) ) $_ADDOPTIONVALUE = '';
_ConCursor($Dim2);
eEnd();
}
if( isset($_DEBUGSubSelect) ) $_DEBUG = $_DEBUGSubSelect;
if( !isset($_DesdeEditList) ) $_DesdeEditList = false;
if( isset($ADDOPTIONVALUE) ){
$_ADDOPTIONVALUE = str_replace(' ','',$ADDOPTIONVALUE);
}else{
$_ADDOPTIONVALUE = '';
}
if( $_LanguageTables!='' && $_LanguageTables[0]!=',' ) $_LanguageTables = ','.$_LanguageTables.',';
if( !isset($_ORDEN_)	) $_ORDEN_ = '';
if( !isset($_DESTINO_)	) $_DESTINO_ = '';
if( !isset($_FILTER)	) $_FILTER = '';
else{
$_FILTER = stripslashes( $_FILTER );
if( substr_count( $_FILTER, '&'		 ) > 0 ) $_FILTER = str_replace( '&', ' AND ', $_FILTER );
if( substr_count( $_FILTER, '_PADRE' ) > 0 ) $_FILTER .= " and ACTIVO='S'";
$_FILTER = ' '.$_FILTER;
while( substr_count( $_FILTER, ' _' ) > 0 ){
$_FILTER = trim( str_replace( ' _', ' ', $_FILTER ));
}
}
if( substr($_GET['WhereSelect'],0,8)=='order by' ){
$_ORDEN_ = substr($_GET['WhereSelect'],8);
$_DBORDER = $_ORDEN_;
}else{
if( $_FILTER!='' ){
if( $_GET['WhereSelect']!='' ) $_FILTER .= ' and '.$_GET['WhereSelect'];
}else{
if( $_GET['WhereSelect']!='' ) $_FILTER = $_GET['WhereSelect'];
}
}
$NewSql = '';
if( $_ORDEN_[0]=='*' && substr_count($_Accion,'[')>0 ){
$i = strpos($_Accion,'[')+1;
$f = strpos($_Accion,']');
$NewSql = substr($_Accion, $i, $f-$i);
$_Accion = substr($_Accion, 0, $i-1 ).substr($_Accion, $f+1);
$_DESTINO_ = substr($_DESTINO_, 0, strpos($_DESTINO_,'['));
}
if( $_ORDEN_[0]=='*' ){
$_ORDEN_ = substr($_ORDEN_,1);
if( $_ORDEN_[0]=='_' ) $_ORDEN_ = substr($_ORDEN_,1);
$_ORDEN_ = 'nm'.substr($_ORDEN_,2);
}else if( $_ORDEN_[0]=='_' ) $_ORDEN_ = substr($_ORDEN_,1);
list($Opcion, $Fichero) = explode(':', $_Accion);
$Opcion = $_Mode;
$NomFile = substr(strrchr($_SERVER['PHP_SELF'],'/'), 1);
$_DBINI = '';
$_DBEND = '';
$_DESDE_ = ','.str_replace(' ','',$_DESDE_).',';
$Fichero = eScript( $Fichero );
$FicheroD = $Fichero;
$ConFileExterno = file_exists($FicheroD);
if( $ConFileExterno ){
if( is_readable($FicheroD)!=1 ){
echo '<script type="text/javascript">';
if( $_SESSION['_D_']=='' ){
echo 'alert("ERROR 5:\nLDF no se puede leer");';
}else{
echo 'alert("ERROR 5:\nLDF no se puede leer ['.$FicheroD.']");';
}
echo '<'.'/SCRIPT>';
eEnd();
}
$_Form = array();
$_RELATIONFIELDS = array();
$_ADDOPTION = array();
$_SelVirtual = array();
$_DEFAUX = array();
$SubJsHtm = true;
$_Variable = array();
$_CC = &$_Variable;
$SaltarLinea = false;
$_FIELDSET = array();
$_TmpFieldSet = array('','','','');
$_EnLinea = array();
$_TmpEnLinea = array('','','','');
$_EnColumna = array();
$_TmpEnColumna = array('','','','');
$TipoEntrada = '#';
$nf = $nc = 0;
$_Opcion = $_DBADDFILTER = $_DBORDER = '';
$DimOpcion =  array($Opcion,'*');
if( substr_count( ',c,b,m,', ",{$Opcion}," ) > 0 ) array_push( $DimOpcion, '?' );
if( substr_count( ',cR,bR,mR,', ",{$Opcion}," ) > 0 ){
array_push( $DimOpcion, '?R' );
array_push( $DimOpcion, '*R' );
}
$_DimEDF = @OpenDF($FicheroD,0);
$_CallLabel = "";
$ElPuntoEsRem = true;
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
if( $Chr_1=='[' && substr($buffer,-1)=="|" && !preg_match('/^\[FIELDS\]/i',$buffer) ) _addBuffer($buffer, $nDimFCH, $_DimEDF);
$ElPuntoEsRem = true;
if( $_CallLabel<>"" && $Chr_1<>'[' ){
call_user_func("eCall_".$_CallLabel, null, $buffer);
continue;
}
$_CallLabel = "";
if( $Chr_1=='#' ){
if( substr(strtoupper($buffer),0,9)=='#INCLUDE(' ){
list( $buffer, $VerError ) = explode('|',$buffer);
while( substr_count($buffer,'{$') > 0 ){
$p = strpos( $buffer, '{$' );
$tmp = substr($buffer,$p,strpos($buffer, '}')-$p+1);
if( $GLOBALS[substr($tmp,2,-1)]!='' ){
$buffer = str_replace($tmp,$GLOBALS[substr($tmp,2,-1)],$buffer);
}else{
$buffer = str_replace($tmp,$_SESSION[substr($tmp,2,-1)],$buffer);
}
}
list( $cModo, $DirFile ) = explode(')',str_replace(' ','',$buffer));
$DirFile = strtolower($DirFile);
if( eOkMode( $Opcion, substr($cModo,9) ) ){
if( trim(strtoupper($DirFile)=='LNG' ) ){
if( $OriFichero[0]=='$' ){
$tmp = explode('/',str_replace(chr(92),'/',$OriFichero));
$DirFile = '$lng/'.$tmp[count($tmp)-1].'.lng';
}else $DirFile = $OriFichero.'.lng';
}
$tmp = eScript(trim($DirFile));
if( file_exists($tmp) ){
if( substr($tmp,-4)=='.zdf' ){
$txt = file_get_contents($tmp);
if( substr($txt,0,5)=='eDes ' ){
$iDimEDF = explode( "\n", gzuncompress(substr($txt,5)) );
}else{
$iDimEDF = explode( "\n", $txt );
}
$txt = '';
}else{
$iDimEDF = file($tmp);
}
for( $n=0; $n<count($iDimEDF); $n++ ){
$tmp = ltrim($iDimEDF[$n]);
if( $tmp[0]=='[' && substr(strtoupper($tmp),0,6)=='[NOTE]' ){
for( $i=$n; $i<count($iDimEDF); $i++ ) $iDimEDF[$i] = '';
break;
}
}
$tDim = array_slice($_DimEDF,0,$nDimFCH);
$tDim = array_merge($tDim,array($iDimEDF[0]));
$tDim = array_merge($tDim,$iDimEDF);
$tDim = array_merge($tDim,array_slice($_DimEDF,$nDimFCH+1));
$_DimEDF = $tDim;
unset($tDim);
}else if( strtoupper(trim($VerError))!='TRUE' ) eTrace("ERROR: Fichero {$tmp} no encontrado");
}
continue;
}
}
switch( ord($Chr_1) ){
case 91:
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
switch( $Etiqueta ){
case 'DBTABLE':
$tmp[0] = _InVar($tmp[0]);
$_DBTABLE = $tmp[0];
break;
case 'DBORDER':
$_DBORDER = $tmp[0];
break;
case 'DBINDEX':
list($_DBINDEX, $_DBINDEX2, $_DBINDEX3) = explode(';', $tmp[0]);
$_DBINDEX = trim($_DBINDEX);
$_DBINDEX2 = trim($_DBINDEX2);
$_DBINDEX3 = trim($_DBINDEX3);
break;
case 'FIELDS':
if( count($_Form) > 0 ) break;
if( $tmp[0][0]=='#' ){
if( $_Variable[$tmp[0]] ){
$TipoEntrada = $Comando;
break;
}
}
if( !empty($tmp[0]) ){
if( ord($tmp[0][0]) > 48 && ord($tmp[0][0]) < 58 ){
$_TCol = $tmp[0] * 1;
$OkModo = true;
}else{
$cModo = explode( ',', $tmp[0] );
$OkModo = ( count( array_intersect( $cModo, $DimOpcion ) ) > 0 );
if( strtoupper($tmp[0])=='ELSE' && count($_Form)==0 ) $OkModo = true;
if( !$OkModo ) break;
}
}else{
$OkModo = true;
}
if( !empty($tmp[1]) ){
if( ord($tmp[1][0]) > 48 && ord($tmp[1][0]) < 58 ){
$_TCol = $tmp[1] * 1;
$OkModo = true;
}else{
$cModo = explode( ',', $tmp[1] );
$OkModo = ( count( array_intersect( $cModo, $DimOpcion ) ) > 0 );
if( strtoupper($tmp[1])=='ELSE' && count($_Form)==0 ) $OkModo = true;
}
}
if( $OkModo ) $TipoEntrada = 'Ca';
break;
case 'WHERESELECT':
if( $OkModo ) array_push( $_WHERESELECT, array( $tmp[1], $tmp[2] ) );
break;
case 'DBADDFILTER':
$_DBADDFILTER = $tmp[0];
break;
case 'DEBUG':
if( $OkModo ){
if( $tmp[2]=='' ){
$_DEBUG = $tmp[1];
}else{
if( $tmp[2]==$_User ) $_DEBUG = $tmp[1];
}
}
break;
case 'DB':
$_OtroDiccionario = true;
$tmp[0] = str_replace(' ','',$tmp[0]);
if( substr_count($tmp[0],',')==0 ){
if( $tmp[0][0]=='>' ) $tmp[0] = trim(substr($tmp[0],1));
$_DB = $tmp[0];
if( substr_count(str_replace('\\','/',$tmp[0]),'/')==0 ) $tmp[0] = '/_datos/config/'.$tmp[0];
if( substr_count($tmp[0],'.')==0 ) $tmp[0] .= '.ini';
include(eScript($tmp[0]));
}else{
list($_Sql, $_SqlHostName, $_SqlDiccionario, $_SqlUsuario, $_SqlPassword, $_SqlPDOConnect) = explode(',', $tmp[0]);
if( $_SqlHostName[0]=='$' ) $_SqlHostName = ${$_SqlHostName};
}
list( $_Sql, $_SqlPDOType ) = explode(':', str_replace(' ','',$_Sql));
if( $_Sql=='pdo' && $_SqlPDOConnect!='' ) $_SqlPDOConnect = eval('return("'.$_SqlPDOConnect.'");');
break;
case 'ADDOPTION':
eCall_ADDOPTION($OkModo, $bufferData, $tmp);
break;
case 'DEFAUX':
$_DEFAUX[$tmp[0]] = $tmp[1];
break;
case 'DBINI':
case 'DBEND':
if( $OkModo ){
if( $tmp[1] != '' ){
if( substr_count( ",{$tmp[1]},", $_PSOURCE ) == 1 ){
$TipoEntrada = $Comando;
}else{
$TipoEntrada = '#';
}
}else{
$TipoEntrada = $Comando;
}
}else{
$TipoEntrada = '#';
}
break;
case 'NOTE':
break 3;
}
break;
case  0:
case 10:
break;
default:
switch( $TipoEntrada ){
case 'Ca':
if ( $buffer[0]=='-' || $buffer[0]=='>' ){
list($_Form[$nf][0], $_Form[$nf][1]) = explode('|', $buffer);
list($_Form[$nf][2], $_Form[$nf][3], $_Form[$nf][4], $_Form[$nf][5], $_Form[$nf][6], $_Form[$nf][7], $_Form[$nf][8], $_Form[$nf][9]) = array( '','','','','','','','' );
$_Form = array_splice ($_Form, 0, count($_Form)-1);
$nf--;
}else{
list( $_Form[$nf][0], $_Form[$nf][1], $_Form[$nf][2], $_Form[$nf][3], $_Form[$nf][4], $_Form[$nf][5], $_Form[$nf][6], $_Form[$nf][7], $_Form[$nf][8], $_Form[$nf][9] ) = explode ( "|", $buffer );
$_Form[$nf][1] = trim($_Form[$nf][1]);
if( $_DEFAUX[$_Form[$nf][1]] != '' ){
$_Form[$nf][1] .= '{'.$_DEFAUX[$_Form[$nf][1]].'}';
}
if( $_Form[$nf][1][0] == '_' || strlen($_Form[$nf][2]) == 0 || trim($_Form[$nf][3]) == 'G' || substr_count( $_Form[$nf][6], 'L' ) > 0 ){
$_Form = array_splice ( $_Form, 0, count($_Form)-1 );
$nf--;
}
}
$nf++;
break;
case '_DBINI':
case '_DBEND':
$p = strpos( $buffer, '//' );
if( $p !== false ){
if( substr_count( chr(39).'":', substr( $buffer, $p-1, 1 ) ) == 0 ) $buffer = chop(substr( $buffer, 0, $p ));
}
${$TipoEntrada} .= $buffer.$__Enter;
break;
}
}
}
$HaySelect = false;
for($nf=0; $nf<count($_Form); $nf++){
for($n=0; $n<=9; $n++){
$_Form[$nf][$n] = trim( $_Form[$nf][$n] );
}
if( $_Form[$nf][3]=='SV' && !empty($_ADDOPTION[$_Form[$nf][1]]) ){
$tmp = explode(';', $_ADDOPTION[$_Form[$nf][1]]);
for($i=0; $i<count($tmp); $i++){
$tmp1 = explode(',', $tmp[$i]);
$tmp1[0] = trim($tmp1[0]);
$tmp1[1] = trim($tmp1[1]);
$_SelVirtual[$_Form[$nf][1]][$tmp1[0]] = trim($tmp1[1]);
}
}
if( substr_count('SSsX.SL.', $_Form[$nf][3])>0 ) $HaySelect = true;
}
$HayQue = true;
}else if( $NewSql!='' ){
$HayQue = false;
list($_DBTABLE, $Condi, $Ver) = explode(':',$NewSql);
$Campos = $Condi.','.$Ver;
$_DBORDER = $Ver;
}else{
$HayQue = false;
if( substr($_ORDEN_,0,3)=='nm_' ){
$_DBTABLE = substr($_ORDEN_,3);
$Campos = 'cd_'.$_DBTABLE.',nm_'.$_DBTABLE;
}
$_DBORDER = $_ORDEN_;
}
if( !$ConFileExterno && isset($SQL) && $SQL!='' ){
$SQL = stripslashes($SQL);
list( $NomCampo, $NomSql ) = explode( '{', $SQL );
list( $NomSql ) = explode( '}', $NomSql );
list( $_DBTABLE,,$_DBORDER ) = explode( ',', $NomSql );
$Campos = substr( $NomSql, strlen($_DBTABLE)+1 );
if( substr($_GET['WhereSelect'],0,8)=='order by' ){
$_DBORDER = $_ORDEN_;
}
if( !(strpos($_LanguageTables,",{$_DBTABLE},")===false) ){
$tmp = explode( ',', $Campos );
$tmp[1] = trim($tmp[1]).'_'.$_SESSION['_LANGUAGE_'];
$Campos = '';
for( $n=0; $n<count($tmp); $n++ ){
if( $n>0 ) $Campos .= ',';
$Campos .= $tmp[$n];
}
$_DBORDER = $_DBORDER.'_'.$_SESSION['_LANGUAGE_'];
}
}
if( isset($_DB) ){
$_OtroDiccionario = true;
$tmp2 = str_replace(' ','',$_DB);
if( substr_count(str_replace('\\','/',$tmp2),'/')==0 ) $tmp2 = '/_datos/config/'.$tmp2;
if( substr_count($tmp2,'.')==0 ) $tmp2 .= '.ini';
include( eScript($tmp2) );
list( $_Sql, $_SqlPDOType ) = explode( ':', str_replace(' ','',$_Sql) );
if( $_Sql=='pdo' && $_SqlPDOConnect!='' ) $_SqlPDOConnect = eval('return ("'.$_SqlPDOConnect.'");');
}
if( isset($gs_Sql) ) $_Sql = $gs_Sql;
if( $_SESSION["_SPIDER_"]["opcion"]=="E" ){
$_Sql = "spider";
}
include_once($Dir_.$_Sql.'.inc');
eHTML("Ss:{$Fichero}", $Opcion);
?>
<script type="text/javascript">
function CopySelect(){
try{
var win = (typeof(CopySubSelect)=="undefined") ? window.frameElement.WOPENER : window;
win.CopySubSelect(Array('<?= $_DESTINO_.'='.$_DESTINO_; ?>'), document.getElementById('<?=$_DESTINO_?>_TABLE_BAK'), "<?= $_ADDOPTIONVALUE; ?>");
<?PHP
if( $ONCHANGESRV!='' ){
?>
<?PHP
echo stripslashes($ONCHANGESRV).';';
}
?>
win._ExeDimRelationFields();
<?PHP
if( $PUTVALOR!='' ){
?>
<?PHP
echo "win.ePF('{$_DESTINO_}', '{$PUTVALOR}');";
}
if( $_GET['EXEFUNC']!='' ){
?>
<?PHP
echo "".$_GET['EXEFUNC']."();";
}
?>
}catch(e){
}
}
</SCRIPT>
<?PHP
if( $HayQue && $Campos=='' ){
$Campos  = '';
$sCampos = '';
$NCampos = count($_Form);
for($n=0; $n<$NCampos; $n++){
if( substr_count($_Form[$n][1], ':')>0 ){
$_Form[$n][1] = substr($_Form[$n][1], 0, strpos($_Form[$n][1], ':'));
}
if( $n>0 ){
$Campos .= ',';
$sCampos .= ',';
}
switch( $_Form[$n][2] ){
case '_F4_':
$Campos .= " date_format(".rtrim($_Form[$n][1]).",'%d-%m-%Y')";
break;
default:
$Campos .= rtrim($_Form[$n][1]);
}
$sCampos .= rtrim($_Form[$n][1]);
}
}
if( strlen($_DBADDFILTER)>0 ){
if( substr_count( $_DBADDFILTER, '{' ) > 0 && substr_count( $_DBADDFILTER, '}' ) > 0 ){
$_DBADDFILTER = eval( 'return "'.$_DBADDFILTER.'";');
}else if( (substr_count($_DBADDFILTER,'()')==1 || substr_count($_DBADDFILTER,'( )')==1) && substr_count($_DBADDFILTER,'now()')==0 ){
$_DBADDFILTER = eval( 'return '.$_DBADDFILTER.';');
}
if( substr_count( $_DBADDFILTER, '#' ) > 0 ){
$_DBADDFILTER = str_replace( '#', ${$_DBINDEX}, $_DBADDFILTER );
}
$_DBADDFILTER = BuscaConAlias( $_DBADDFILTER );
}else{
$_DBADDFILTER = '';
}
$_DBORDER = OrdenConAlias( $_DBORDER );
if( strlen($_FILTER)>0 ){
if( $_DBADDFILTER!='' ) $_FILTER .= ' and '.$_DBADDFILTER;
$_DBADDFILTER = $_FILTER;
}
$_FILTER = $_DBADDFILTER;
if( $_MULTI_ == 'true' ){
$Multiple = ' MULTIPLE';
}else{
$Multiple = '';
}
if( eSqlType('oracle') ) $_DBADDFILTER = str_replace('"',"'",$_DBADDFILTER);
$_DBADDFILTER = trim($_DBADDFILTER);
while( substr_count($_DBADDFILTER, '||')>0 ){
$txt = $_DBADDFILTER;
$p0 = strpos($txt, '||');
$p1 = strrpos(substr($txt,0,$p0), '=');
$comilla = substr($txt,$p1+1,1);
$p2 = strpos($txt, $comilla, $p0);
$interior = substr($txt,$p1,$p2-$p1+1);
$izq = substr($txt,0,$p1);
$dch = substr($txt,$p2+1);
$interior = substr($interior,1);
$por = $interior[0].",".$interior[0];
$valor = ' in ('.str_replace('||', $por, $interior).')';
$_DBADDFILTER = $izq.$valor.$dch;
}
if( $_GET['_eDBLimit']!='' ){
$_DBLIMIT = $_GET['_eDBLimit'];
}
if( $_GET["_ORDERBY"]<>"" ) $_DBORDER = str_replace(["'",'"'],["",""], $_GET["_ORDERBY"]);
$DemasiadosRegistros = false;
if( $_DBORDER=='' ) $_DBORDER = '2';
if( isset($SQL) && strtolower(substr($SQL,0,7))=='select ' ){
if( eSqlType('oracle') ) $SQL = str_replace('"',"'",$SQL);
if( $_GET['_eFilter']!='' ){
list($campos,$from) = explode(" from ",$SQL);
list($tabla) = explode(" ",$from);
list($izq,$order) = explode(" order by ",$from);
list(,$where) = explode(" where ",$izq);
if( $_DBADDFILTER<>"" ) $where .= ' and '.$_DBADDFILTER;
$tmpTReg = qCount($tabla, $where);
if( $tmpTReg>$_DBLIMIT ){
$DemasiadosRegistros = true;
}
eMultitenancy($tabla);
$SQL = "{$campos} from {$tabla} where {$where} order by {$order}";
}
qQuery($SQL);
}else if( $_ADDOPTIONVALUE!='' ){
if( $_GET['_eFilter']!='' ){
$tmpTReg = qCount($_DBTABLE, $_DBADDFILTER);
if( $tmpTReg>$_DBLIMIT ){
$DemasiadosRegistros = true;
}
}
eMultitenancy($_DBTABLE);
qSelect($_DBTABLE, $Campos.','.$_ADDOPTIONVALUE, $_DBADDFILTER, $_DBORDER);
}else{
if( $_GET['_eFilter']!='' ){
$tmpTReg = qCount($_DBTABLE, $_DBADDFILTER);
if( $tmpTReg>$_DBLIMIT ){
$DemasiadosRegistros = true;
}
}
eMultitenancy($_DBTABLE);
qSelect($_DBTABLE, $Campos                     , $_DBADDFILTER, $_DBORDER);
}
echo "<TABLE id='{$_DESTINO_}_TABLE_BAK' class='col_0n, col_2n, col_3n, col_4n, col_5n' cols=2>";
echo '<COL id=o><COL>';
$Dim = array(); $ii = -1;
$Dim[++$ii] = array('','&nbsp;');
if( $_ADDOPTIONVALUE!='' ){
$tmp = explode(',',str_replace(' ','',$_ADDOPTIONVALUE));
if( $NMATRIBUTE!='' ){
echo '<COL id=o NM_ATRIBUTE='.$NMATRIBUTE.'>';
}else{
for( $i=0; $i<count($tmp); $i++ ) echo '<COL id=o NM_ATRIBUTE='.$tmp[$i].'>';
}
for( $i=0; $i<count($tmp); $i++ ) $Dim[$ii][$i+2] = '';
}else{
}
if( $_DBINI != '' ){
$tmpFile = GrabaTmp( 's_dbini', $_DBINI, $LenDoc );
include( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
unset( $_DBINI );
}
if( $ADDOPTION!='' ){
$MasValores = 0;
if( $_ADDOPTIONVALUE!='' ){
$tmp = explode(',',str_replace(' ','',$_ADDOPTIONVALUE));
$MasValores = count($tmp)+2;
}
$ADDOPTION = stripslashes(urldecode($ADDOPTION));
if( $ADDOPTION[0]=='"' || $ADDOPTION[0]=="'" ) $ADDOPTION = substr($ADDOPTION,1,-1);
$tmp = explode(';',$ADDOPTION);
for( $n=0; $n<count($tmp);$n++ ){
$tmp1 = explode(',',$tmp[$n]);
$Dim[++$ii] = array();
$MasValores = Max( $MasValores, count($tmp1) );
for( $i=0; $i<$MasValores;$i++ ) $Dim[$ii][$i] = trim($tmp1[$i]);
}
}
$MasVacio = true;
if( $_ADDOPTIONVALUE!='' ){
$tmp = explode(',',str_replace(' ','',$_ADDOPTIONVALUE));
$tc = count($tmp);
while($row=qRow()){
if( $MasVacio ){
$MasVacio = false;
}
$Dim[++$ii] = array(trim($row[0]), trim($row[1]));
for($i=2; $i<count($row)-$tc; $i++) $Dim[$ii][1] .= $row[$i];
$nc = 0; for($i=count($row)-$tc; $i<count($row); $i++) $Dim[$ii][$i] = trim($row[$i]);
}
}else{
while($row=qRow()){
if( $MasVacio ){
$MasVacio = false;
}
$Dim[++$ii] = array(trim($row[0]), trim($row[1]));
for($i=2; $i<count($row); $i++) $Dim[$ii][1] .= $row[$i];
}
}
$sDim = array();
for( $f=0; $f<count($Dim); $f++ ) $sDim[] = implode("\t",$Dim[$f])."\t".$f;
sort($sDim);
$iDim = array();
for( $f=0; $f<count($sDim); $f++ ){
$tmp = explode("\t",$sDim[$f]);
$iDim[$tmp[0]] = array( $Dim[$f][0], $f );
}
$pr=0;
for($f=0; $f<count($Dim); $f++){
echo '<TR v="'.strtoupper($iDim[$Dim[$f][0]][0]).'" r='.($iDim[$Dim[$f][0]][1]+$pr).'>';
for($c=0; $c<count($Dim[$f]); $c++) echo '<td>'.$Dim[$f][$c];
if( $f==0 && $Dim[$f][0]=='' && $_GET['_QED']==1 && $GLOBALS['_QuestionsEmptyData'] ){
_ShowQuestionsEmptyData( count($Dim[$f]) );
$pr+=2;
}
}
if( $_DBEND!='' ){
$tmpFile = GrabaTmp('s_dbend', $_DBEND, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_DBEND);
}
?>
</TABLE>
<SCRIPT type="text/javascript">
CopySelect();
</SCRIPT>
<?PHP
eEnd();
function BuscaConAlias( $txt ){
global $_Form, $HaySelect;
if( strlen($txt) == 0 ) return $txt;
if( !$HaySelect ) return $txt;
$txt = ' '.$txt;
for( $n=0; $n<count($_Form); $n++ ){
if( substr_count('SSsX', $_Form[$n][3] ) == 0 ){
if( substr_count( $txt,			' '.$_Form[$n][1].'<>' ) > 0 ){
$txt = str_replace(			' '.$_Form[$n][1].'<>', ' A.'.$_Form[$n][1].'<>', $txt );
}elseif( substr_count( $txt,	' '.$_Form[$n][1].'>=' ) > 0 ){
$txt = str_replace(			' '.$_Form[$n][1].'>=', ' A.'.$_Form[$n][1].'>=', $txt );
}elseif( substr_count( $txt,	' '.$_Form[$n][1].'<=' ) > 0 ){
$txt = str_replace(			' '.$_Form[$n][1].'<=', ' A.'.$_Form[$n][1].'<=', $txt );
}elseif( substr_count( $txt,	' '.$_Form[$n][1].'!=' ) > 0 ){
$txt = str_replace(			' '.$_Form[$n][1].'!=', ' A.'.$_Form[$n][1].'!=', $txt );
}elseif( substr_count( $txt,	' '.$_Form[$n][1].'='  ) > 0 ){
$txt = str_replace(			' '.$_Form[$n][1].'=' , ' A.'.$_Form[$n][1].'=' , $txt );
}elseif( substr_count( $txt,	' '.$_Form[$n][1].'>'  ) > 0 ){
$txt = str_replace(			' '.$_Form[$n][1].'>' , ' A.'.$_Form[$n][1].'>' , $txt );
}elseif( substr_count( $txt,	' '.$_Form[$n][1].'<'  ) > 0 ){
$txt = str_replace(			' '.$_Form[$n][1].'<' , ' A.'.$_Form[$n][1].'<' , $txt );
}elseif( substr_count( $txt,	' '.$_Form[$n][1].' '  ) > 0 ){
$txt = str_replace(			' '.$_Form[$n][1].' ' , ' A.'.$_Form[$n][1].' ' , $txt );
}
}
}
return rtrim($txt);
}
function OrdenConAlias( $txt ){
global $Campos;
if( substr_count($txt, '*') > 0 ){
$tmp = explode(" ", trim($txt));
for ($i=0; $i<count($tmp); $i++){
if( $tmp[$i][0]=='*' ) {
if( strpos( $Campos.',', '.'.substr($tmp[$i], 1).',' )){
$p = strpos( $Campos.',', '.'.substr($tmp[$i], 1).',' );
$txt = str_replace('*', substr($Campos, $p-1, 1).'.', $txt);
}
}
}
}
return $txt;
}
function GetCampos( &$Campos ){
global $_Form;
for( $n=0; $n < count($_Form); $n++ ){
if( !empty($Campos) ) $Campos .= ', ';
$Campos .= $_Form[$n][1];
}
}
function qGetSelect( &$Campos ){
global $_Form;
for( $n=0; $n < count($_Form); $n++ ){
if( !empty($Campos) ) $Campos .= ', ';
$Campos .= $_Form[$n][1];
}
}
function _ConCursor( $Dim ){
global $__Enter, $Fichero, $Opcion, $_DESTINO_, $_ADDOPTIONVALUE, $NMATRIBUTE, $PUTVALOR;
eHTML("Ss:{$Fichero}", $Opcion);
?>
<script type="text/javascript">
function CopySelect(){
try{
var win = (typeof(CopySubSelect)=="undefined") ? window.frameElement.WOPENER : window;
win.CopySubSelect(Array('<?= $_DESTINO_.'='.$_DESTINO_; ?>'), document.getElementById('<?=$_DESTINO_?>_TABLE_BAK'), "<?=$_ADDOPTIONVALUE?>");
win._ExeDimRelationFields();
<?PHP
if( $PUTVALOR!='' ){
echo "win.ePF('{$_DESTINO_}', '{$PUTVALOR}');";
}
if( $_GET['EXEFUNC']!='' ){
echo "".$_GET['EXEFUNC']."();";
}
?>
}catch(e){}
}
</SCRIPT>
<?PHP
if( isset($_ADDOPTIONVALUE) ){
$DimAtributo = explode(",",",,".$_ADDOPTIONVALUE);
}
echo "<TABLE id='{$_DESTINO_}_TABLE_BAK' cols=2>";
echo '<COL id=o><COL>';
if( count($Dim)>0 ){
for($c=2; $c<count($Dim[0]); $c++){
if( $DimAtributo[$c]!='' ){
echo '<COL id=o NM_ATRIBUTE='.$DimAtributo[$c].'>';
}else if( $NMATRIBUTE!='' ){
echo '<COL id=o NM_ATRIBUTE='.$NMATRIBUTE.'>';
}else{
echo '<COL id=o>';
}
}
}
$sDim = array();
for($f=0; $f<count($Dim); $f++) $sDim[] = implode("\t",$Dim[$f])."\t".$f;
sort($sDim);
$iDim = array();
for( $f=0; $f<count($sDim); $f++ ){
$tmp = explode("\t",$sDim[$f]);
$iDim[$tmp[0]] = array( $Dim[$f][0], $f );
}
$pr=0;
for( $f=0; $f<count($Dim); $f++ ){
echo '<TR v="'.strtoupper($iDim[$Dim[$f][0]][0]).'" r='.($iDim[$Dim[$f][0]][1]+$pr).'>';
for( $c=0; $c<count($Dim[$f]); $c++ ) echo '<td>'.$Dim[$f][$c];
if( $f==0 && $Dim[$f][0]=='' && $_GET['_QED']==1 && $GLOBALS['_QuestionsEmptyData'] ){
_ShowQuestionsEmptyData( count($Dim[$f]) );
$pr+=2;
}
}
echo '</TABLE>';
echo '<SCRIPT type="text/javascript">CopySelect();</SCRIPT>';
eEnd();
}
function _ShowQuestionsEmptyData( $nc=2 ){
global $_QuestionsEmptyDataStyle, $__Lng;
eLngLoad( '../../edesweb/lng/tab', '', 1 );
if( $_QuestionsEmptyDataStyle=='' ){
echo '<TR v="<=" r=1><TD><=<TD>'.$__Lng[162];
echo '<TR v=">" r=2><TD>><TD>'.$__Lng[163];
}else{
echo '<TR v="<=" r=1><TD><=<TD style="'.$_QuestionsEmptyDataStyle.'">'.$__Lng[162];
echo '<TR v=">" r=2><TD>><TD style="'.$_QuestionsEmptyDataStyle.'">'.$__Lng[163];
}
for($c=2; $c<$nc; $c++) echo '<td>';
}
?>
