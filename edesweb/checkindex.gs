<?PHP
$Dim = explode( '|', urldecode($argv[0]) );
?>
<SCRIPT type="text/javascript">
var WOPENER = window.frameElement.WOPENER;
WOPENER._CheckIndex = false;
WOPENER.DGI("<?=$Dim[4]?>").style.backgroundColor = "";
</SCRIPT>
<?PHP
$ConDebug = false;
if( $ConDebug ){
echo urldecode($_SERVER['QUERY_STRING']).'<br>';
echo 'Arg: '.$argv[0].'<br><br>';
echo 'Arg: '.urldecode($argv[0]).'<br><br>';
}
$_DB = $_GET['_DB'];
if( $_DB!='' ){
if( $_DB[0]=='>' ) $_DB = trim(substr($_DB,1));
if( substr_count(str_replace('\\','/',$_DB),'/')==0 ) $_DB = '/_datos/config/'.$_DB;
if( substr_count($_DB,'.')==0 ) $_DB .= '.ini';
if( $_DB[0]=='~' ){
$_SqdDefinitionFile = str_replace('~','../..',$_DB);
}else{
$_SqdDefinitionFile = eScript($_DB);
}
include( $_SqdDefinitionFile );
}
$_CheckDBIndexFunc = array_pop( $Dim );
list( $Buscar, $Buscar2 ) = explode( ';', $Dim[0] );
$Dim[0] = str_replace(';',',',$Dim[0]);
$Indices = explode( ',', $Dim[0] );
if( substr_count( $Dim[2], chr(92) ) > 0 ){
list( $uMensaje, $Linea2 ) = explode( chr(92), $Dim[2] );
}else{
$uMensaje = '<FONT COLOR=RED><B>'.$Dim[2].'</B></FONT>';
$Linea2 = 'El registro ya existe.';
}
$_Form = array();
eInclude( $_Sql );
if( $ConDebug ) $_DEBUG = 1;
$Comprobar = true;
$DimBuscar = explode( ',', $Buscar );
$txt = '';
for( $n=0; $n<count($DimBuscar); $n++ ){
if( $Dim[$n+5]=='' ) $Comprobar = false;
if( $txt!='' ) $txt .= ' and ';
if( eSqlType('oracle') ){
$Dim[$n+5] = str_replace( "'", "''", $Dim[$n+5] );
}else{
$Dim[$n+5] = str_replace( "'", "\\'", $Dim[$n+5] );
}
$txt .= $DimBuscar[$n]."='".$Dim[$n+5]."'";
if( $ConDebug ) echo '<br>['.($n+5).'] '.$DimBuscar[$n].'="'.$Dim[$n+5].'"';
}
if( $ConDebug ) echo '<br>1: Tabla: '.$Dim[3].'<br>1: Condicion: '.$txt.'<br>';
if( $_Indice_!='' && $_Valor_!='' ) $txt .= " and {$_Indice_}<>'{$_Valor_}'";
if( $ConDebug ) echo '<br>2: Tabla: '.$Dim[3].'<br>2: Condicion: '.$txt.'<br>';
if( $Comprobar ){
if( qCount( $Dim[3], $txt ) > 0 ){
if( substr_count( $Dim[1], '.' ) == 1 ){
qSelect( $Dim[3], '*', $txt );
$_vF = qArray();
eInit();
include( eScript( $Dim[1] ) );
?>
<SCRIPT type="text/javascript">
var WOPENER = window.frameElement.WOPENER;
WOPENER._CheckIndex = false;
WOPENER.DGI("<?=$Dim[4]?>").style.backgroundColor = "";
</SCRIPT>
<?PHP
eEnd();
}
?>
<SCRIPT type="text/javascript">
function DeleteField(){
try{
WOPENER.DGI("<?=$Dim[4]?>").value='';
WOPENER._xOnChangeIndex = '';
}catch(e){}
<?PHP
if( substr($Dim[4],0,7)=='_INPUT_'){
echo 'try{';
echo 'WOPENER.DGI("'.substr($Dim[4],7).'").value="";';
echo '}catch(e){}';
}
if( $_CheckDBIndexFunc!='' ){
echo 'try{';
echo "WOPENER.{$_CheckDBIndexFunc}();";
echo '}catch(e){}';
}
?>
try{
WOPENER.DGI("<?=$Dim[4]?>").focus();
}catch(e){}
}
<?PHP
if( $Dim[1]=='' && $Dim[2]=='' ){
if( $_CheckDBIndexFunc!='NoInfo' ){
?>
top.eAlert( 209, '<?=$Linea2?>', 'A', 'W', DeleteField );
<?PHP
}
}else if( $Dim[1]=='' && $Dim[2]!='' ){
if( $_CheckDBIndexFunc!='NoInfo' ){
?>
top.eAlert( '<?=$uMensaje?>', '<?=$Linea2?>', 'A', 'W', DeleteField );
<?PHP
}
}else if( $Dim[1]!='' ){
if( $Dim[2]=='' ) $uMensaje = $Linea2;
qSelect( $Dim[3], '*', $txt );
$row = qArray();
LeeFormulario( $Dim[count($Dim)-1], $_Form );
$CamposAVer = explode(',', $Dim[1]);
$CamposABorrar = '';
$xCampos = '';
for( $n=0; $n<count($_Form); $n++ ){
$nomCampo = _NomFields($_Form[$n][1]);
if( in_array($nomCampo, $CamposAVer) ){
if( $_Form[$n][4] > 60 ) $_Form[$n][4] = 60;
if( $xCampos!='' ) $xCampos .= ',';
list( ,$xLabel ) = explode( '\\',$_Form[$n][9]);
if( $xLabel=='' ){
$xLabel = $_Form[$n][0];
}else{
$xLabel = str_replace('"',"'",$xLabel);
if( substr_count($xLabel,"'")==2 ) list(,$xLabel) = explode("'",$xLabel);
$xLabel = eUcFirst($xLabel);
}
if( $_Form[$n][3]=='S' ){
if( substr($nomCampo,0,3)=="cd_" ){
$SubTabla = trim(substr( $_Form[$n][1], 3 ));
qSelect($SubTabla, "nm_{$SubTabla}", "cd_{$SubTabla}='{$row[$_Form[$n][1]]}'", '', $ps);
}else if( substr_count($_Form[$n][1], '{')==1 ){
$qCampo = str_replace('&#124;','|',$_Form[$n][1]);
$tmp = str_replace('{', ',', $qCampo);
$tmp = str_replace('}', '', $tmp);
$tmp = explode(',', $tmp);
qSelect($tmp[1], $tmp[3], $tmp[2]."='{$row[$nomCampo]}'", '', $ps);
}else if( substr_count($_Form[$n][1],':')>0 ){
list($NomCampo, $nNomCampo) = explode(':', $_Form[$n][1]);
$SubTabla = substr($nNomCampo, 3);
if( strpos($_LanguageTables, ",{$SubTabla},")===false ){
$Campos = $nNomCampo.', nm_'.$SubTabla;
}else{
$Campos = $nNomCampo.', nm_'.$SubTabla.'_'.$_SESSION['_LANGUAGE_'];
}
qSelect($SubTabla, "nm_{$SubTabla}", "cd_{$SubTabla}='{$row[$_Form[$n][1]]}'", '', $ps);
}else{
if( substr($xCampos,-1)=="." ) $xCampos = substr($xCampos,0,-1);
continue;
}
$row2 = qRow( $ps );
$xCampos .= 'Array("'.$xLabel.'",'.$_Form[$n][4].',null,"","'.eQuote($row2[0]).'")';
}else{
$tmp = $row[$_Form[$n][1]];
$xCampos .= 'Array("'.$xLabel.'",'.$_Form[$n][4].',null,"","'.eQuote($tmp).'")';
}
if( $CamposABorrar!='' ) $CamposABorrar .= ',';
$CamposABorrar .= $_Form[$n][1];
}else{
}
}
$xCampos = 'Array('.$xCampos.')';
if( $CamposABorrar!='' ){
?>
try{
WOPENER.ePF('<?= $CamposABorrar ?>','');
}catch(e){}
<?PHP
}
if( $_CheckDBIndexFunc!='NoInfo' ){
?>
top.eAlert('', '<?= $uMensaje ?>', 'A', 'W', DeleteField, <?= $xCampos ?>);
<?PHP
}
}
if( $_CheckDBIndexFunc=='NoInfo' ) echo 'DeleteField();';
?>
WOPENER.DGI("<?=$Dim[4]?>").style.backgroundColor = "";
</SCRIPT>
<?PHP
eEnd();
}
}
if( $Buscar2!='' ){
if( $ConDebug ) echo '<br>';
$Comprobar = true;
$DimBuscar = explode(',',$Buscar2 );
$txt = '';
$D = count($DimBuscar)+5;
for( $n=0; $n<count($DimBuscar); $n++ ){
if( $Dim[$n+$D]=='' ) $Comprobar = false;
if( $txt!='' ) $txt .= ' and ';
$txt .= $DimBuscar[$n].'="'.$Dim[$n+$D].'"';
if( $ConDebug ) echo '<br>['.($n+$D).'] '.$DimBuscar[$n].'="'.$Dim[$n+$D].'"';
}
if( $ConDebug ) echo '<br>2: Tabla: '.$Dim[3].'<br>2: Condicion: '.$txt.'<br>';
if( $Comprobar ){
if( qCount( $Dim[3], $txt ) > 0 ){
if( substr_count( $Dim[1], '.' ) == 1 ){
qSelect( $Dim[3], '*', $txt );
$_vF = qArray();
eInit();
include( eScript( $Dim[1] ) );
?>
<SCRIPT type="text/javascript">
var WOPENER = window.frameElement.WOPENER;
WOPENER._CheckIndex = false;
WOPENER.DGI("<?=$Dim[4]?>").style.backgroundColor = "";
</SCRIPT>
<?PHP
eEnd();
}
?>
<SCRIPT type="text/javascript">
function DeleteField(){
try{
WOPENER.DGI("<?=$Dim[4]?>").value='';
WOPENER._xOnChangeIndex = '';
WOPENER.DGI("<?=$Dim[4]?>").focus();
<?PHP
if( substr($Dim[4],0,7)=='_INPUT_'){
echo 'WOPENER.DGI("'.substr($Dim[4],7).'".value="";';
}
?>
}catch(e){}
}
<?PHP
if( $Dim[1]=='' && $Dim[2]=='' ){
if( $_CheckDBIndexFunc!='NoInfo' ){
?>
top.eAlert( 209, 'El registro ya existe.', 'A', 'W', DeleteField );
<?PHP
}
}else if( $Dim[1]=='' && $Dim[2]!='' ){
if( $_CheckDBIndexFunc!='NoInfo' ){
?>
top.eAlert( '<?= $uMensaje ?>', 'El registro ya existe.', 'A', 'W', DeleteField );
<?PHP
}
}else if( $Dim[1]!='' ){
if( $Dim[2]=='' ) $uMensaje = 'El registro ya existe.';
qSelect( $Dim[3], '*', $txt );
$row = qArray();
LeeFormulario( $Dim[count($Dim)-1], $_Form );
$CamposAVer = explode( ',', $Dim[1] );
$xCampos = '';
for( $n=0; $n<count($_Form); $n++ ){
if( in_array( $_Form[$n][1], $CamposAVer ) ){
if( $_Form[$n][4] > 60 ) $_Form[$n][4] = 60;
if( $xCampos!='' ) $xCampos .= ',';
list( ,$xLabel ) = explode( '\\',$_Form[$n][9]);
if( $xLabel=='' ){
$xLabel = $_Form[$n][0];
}else{
$xLabel = str_replace('"',"'",$xLabel);
if( substr_count($xLabel,"'")==2 ) list(,$xLabel) = explode("'",$xLabel);
$xLabel = eUcFirst($xLabel);
}
if( $_Form[$n][3]=='S' ){
$SubTabla = trim(substr( $_Form[$n][1], 3 ));
qSelect( $SubTabla, "nm_{$SubTabla}", "cd_{$SubTabla}='{$row[$_Form[$n][1]]}'", '', $ps );
$row2 = qRow( $ps );
$xCampos .= 'Array("'.$xLabel.'",'.$_Form[$n][4].',null,"","'.$row2[0].'")';
}else{
$xCampos .= 'Array("'.$xLabel.'",'.$_Form[$n][4].',null,"","'.$row[$_Form[$n][1]].'")';
}
}else{
}
}
$xCampos = 'Array('.$xCampos.')';
if( $_CheckDBIndexFunc!='NoInfo' ){
?>
top.eAlert( '', '<?= $uMensaje ?>', 'A', 'W', DeleteField, <?= $xCampos ?> );
<?PHP
}
}
if( $_CheckDBIndexFunc=='NoInfo' ) echo 'DeleteField();';
?>
WOPENER.DGI("<?=$Dim[4]?>").style.backgroundColor = "";
</SCRIPT>
<?PHP
}
}
}
eEnd();
function LeeFormulario( $FicheroD, &$_Form ){
global $_User, $_Node, $_Tree, $_Development, $_ePermission;
$OriFichero = $FicheroD;
$cModo = 'a'; $Option = 'a';
$DFichero = array();
$Opcion = 'a';
$DimOpcion = array($Opcion,'*');
if( substr_count( ',c,b,m,', ",{$Opcion}," ) > 0 ) array_push( $DimOpcion, '?' );
if( substr_count( ',cR,bR,mR,', ",{$Opcion}," ) > 0 ){
array_push( $DimOpcion, '?R' );
array_push( $DimOpcion, '*R' );
}
if( substr_count( ',cl,bl,ml,', ",{$_SubModo}," ) > 0 ){
array_push( $DimOpcion, '?l' );
array_push( $DimOpcion, '*l' );
}
array_push( $DimOpcion, 'u'.$_User, 'n'.$_Node );
if( $_SESSION['_TreeList']!='' ){
$tmp = explode(',',$_SESSION['_TreeList']);
for( $n=0; $n<count($tmp); $n++ ) $DimOpcion[] = 't'.$tmp[$n];
}else{
$DimOpcion[] = 't'.$_Tree;
}
if( $_Development!='' ) array_push($DimOpcion, 'd');
if( $_SESSION['_WebMaster']=='S' ) array_push($DimOpcion, 'w');
if( $_SESSION['_D_']!="" ) array_push($DimOpcion, 'D');
$_ePermission = $DimOpcion;
$FicheroD = eScript( $FicheroD );
$_DimEDF = @OpenDF($FicheroD);
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
call_user_func("eCall_".$_CallLabel, true, $buffer);
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
case 'FIELDS':
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
if( $OkModo ) $TipoEntrada = $Comando;
break;
case 'TAB':
call_user_func("eCall_".$Etiqueta, $OkModo, $bufferData, $tmp);
break;
case 'LANGUAGE':
global $_LANGUAGE, $_LNGCOL, $_LNGCOLDEFAULT, $_LanguageTron;
$_LANGUAGE = array();
$tmp2 = explode( ',', trim(str_replace(' ','',$tmp[0])) );
for( $n=0; $n<count($tmp2); $n++ ){
if( $tmp2[$n]==$_SESSION['_LANGUAGE_'] ) $_LNGCOL = $n+1;
if( $tmp2[$n]==$_SESSION['_LanguageDefault'] ) $_LNGCOLDEFAULT = $n+1;
}
$TipoEntrada = '_LANGUAGE';
if( (strtoupper($tmp[2])=='TRUE' || $tmp[2]=='1') && $_Development ) $_LanguageTron = '~';
if( strtoupper($tmp[1])=='TRUE' || $tmp[1]=='1' ) eLngLoad( '../_datos/config/language.lng', '', 2 );
break;
case 'EXIT';
break 3;
}
break;
case  0:
case 10:
break;
case 123:
default:
if( $TipoEntrada == '_FIELDS' ){
IncluirEnForm( 'F', 'a', $buffer, $_DEFAUX, 1 );
break;
}elseif( $TipoEntrada == '_LANGUAGE' ){
list($buffer) = explode( '~', $buffer );
$tmp = explode( '|', $buffer );
$Clave = trim($tmp[0]);
$txt = trim($tmp[$_LNGCOL]);
if( $txt=='' ) $txt = trim($tmp[$_LNGCOLDEFAULT]);
$txt = str_replace("'",'&amp;',str_replace('"','&quot;',$txt));
$_LANGUAGE[] = array( '@'.$Clave.'@', $_LanguageTron.$txt.$_LanguageTron );
}
}
}
if( count($DFichero) > 0 ){
for( $n=0; $n<count($DFichero); $n++ ) LeeFormulario( $DFichero[$n], $_Form );
}
}
function IncluirEnForm( $Objeto, $Opcion, $buffer, $_DEFAUX, $nHoja ){
global $_Form;
if( $Objeto=='F' && $Opcion=='l' ) $Opcion = 'c';
$tmp = explode('|', $buffer);
for($i=0; $i<10; $i++) $tmp[$i] = trim($tmp[$i]);
$tmp[6] = str_replace(' ','',$tmp[6]);
$tmp[10] = $nHoja;
$tmp[11] = 'E';
$tmp[12] = ''; $tmp[13] = ''; $tmp[14] = ''; $tmp[15] = ''; $tmp[16] = '';
$Ok = false;
if( $tmp[0][0]=='<' ){
if( substr_count( $tmp[0], '<' ) != substr_count( $tmp[0], '>' ) ){
$tmp[0] = trim(substr($tmp[0],1));
global $_SKIPTD;
list( $sCampo ) = explode( '{', $tmp[1] );
$_SKIPTD[trim($sCampo)] = true;
}
}
if( $tmp[1][0]=='#' ){
global $_MacroField;
if( count($_MacroField)==0 ) CargaMacroField();
$tmp[1] = $_MacroField[$tmp[1]];
}
if( substr_count( $tmp[6], ';' ) > 0 ){
$v1 = explode( ';', $tmp[6] );
$tmp[6] = trim($v1[count($v1)-1]);
for( $i=0; $i<count($v1); $i++ ){
$v2 = explode( '=', $v1[$i] );
$v2[0] = str_replace(' ','',$v2[0]);
if( substr_count( ",{$v2[0]},", $Opcion ) > 0 || $v2[0]=='*' ){
$tmp[6] = str_replace(' ','',$v2[1]);
break;
}
}
}
$Ok = false;
if( substr_count('bcmsq',$Opcion) > 0 ){
if( substr_count( $tmp[6], 'Q' ) > 0 ) $Ok = true;
}else{
if( $Opcion!='l' && ($tmp[0][0] == '-' || $tmp[0][0] == '>' || $tmp[1][0] == '[') ) $Ok = true;
else if( substr_count( $tmp[6], 'A' ) > 0 ||  substr_count( $tmp[6], 'M'   ) > 0 ) $Ok = true;
else if( substr_count( $tmp[6], '*' ) > 0 && (substr_count( $tmp[6], '*Q*' ) == 1 || substr_count( $tmp[6], '*Q' ) == 0 ) ) $Ok = true;
else if( substr_count( $tmp[6], '-' ) > 0 && (substr_count( $tmp[6], '-Q-' ) == 1 || substr_count( $tmp[6], '-Q' ) == 0 ) ) $Ok = true;
if( $Opcion=='l' && $Ok ){
if( substr_count( $tmp[6], 'L' ) > 0 ) $Ok = false;
else if( $tmp[1][0] == '_' && !in_array( $tmp[1], array( '_fichero','_estructura','_exe','_no_contar' ) ) ) $Ok = false;
else if( $tmp[0][0] == '-' || $tmp[1][0] == '[' || strlen($tmp[2]) == 0 || $tmp[3] == 'G' ) $Ok = false;
}
}
if( $Ok ){
list( $tmp[0], $MsgList, $MsgError ) = explode( chr(92), $tmp[0] );
$tmp[0] = str_replace('·',' ',$tmp[0]);
if( $MsgError!= '' ){
global $_Etiqueta;
$_Etiqueta[$tmp[1]] = trim($MsgError);
}
if( $tmp[0]!='' && substr_count('+,123456789=]', $tmp[0][0] ) > 0 ){
if( $tmp[0][0] == ',' ) $tmp[0] = trim(substr( $tmp[0], 1 ));
if( $tmp[0][0] == '=' ) $tmp[0] = trim(substr( $tmp[0], 1 ));
if( $tmp[0][0] == '+' ) $tmp[0] = trim(substr( $tmp[0], 1 ));
if( substr_count('123456789', $tmp[0][0] ) > 0 ){
$tmp[0] .= ' ';
$tmp[0] = trim(substr( $tmp[0], strpos( $tmp[0],' ' ) ));
$tmp[0] = trim($tmp[0]);
}
if( $tmp[0][0] == ']' ) $tmp[0] = trim(substr( $tmp[0], 1 ));
}
if( $_DEFAUX[$tmp[1]] != '' ) $tmp[1] .= '{'.$_DEFAUX[$tmp[1]].'}';
$tmp[9] = str_replace('"',"'",$tmp[9]);
$_Form[] = $tmp;
$i = count($_Form)-1;
}
return $Ok;
}
?>
