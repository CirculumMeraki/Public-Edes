<?PHP
include_once($Dir_.'formulario.inc');
include_once($Dir_.'message.inc');
$_DimEDF = @OpenDF(eScript($_GET["_DF"]));
$_CallLabel = "";
$ElPuntoEsRem = true;
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
$_NextLine = "";
$ElPuntoEsRem = true;
if( $Chr_1=='[' ){
if( substr(strtoupper($buffer),0,8)=='[PLUGIN]' ){
$tmp = explode('|', substr($buffer,8));
$buffer = '#INCLUDE('.$tmp[0].')'.$tmp[1];
$tmp[1] = str_replace(chr(92),'/',$tmp[1]); $sTmp = explode('/',$tmp[1]); $tmp[1] = $sTmp[count($sTmp)-1];
if( count($tmp)==3 ){
$_PLUGIN[trim($tmp[1])] = trim($tmp[2]);
}else if( count($tmp)>3 ){
for($i=2; $i<count($tmp); $i++) $_PLUGIN[trim($tmp[1])][$i-2] = trim($tmp[$i]);
}
$Chr_1 = '#';
}else if( $buffer=="[" || substr($buffer,1,1)=="'" || substr($buffer,1,1)=='"' || ((substr($buffer,1,1)*1)."")===substr($buffer,1,1) ){
$Chr_1=' ';
}else if( !preg_match('/^[A-Za-z]{0,}[2]{0,1}$/', substr($buffer, 1, strpos($buffer,']')-1)) ){
$Chr_1 = '#';
}
}
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
list($cModo, $DirFile) = explode(')',eNsp($buffer));
$DirFile = strtolower($DirFile);
if( eOkMode($Opcion, substr($cModo,9)) ){
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
if( $Chr_1=='[' ){
if( preg_match('/^\[DB\]/i', $buffer) ){
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando, $_SubModo);
$_DBBuffer = $tmp[0];
}else if( preg_match('/^(\[NOTE\]|\[EXIT\])$/i', $buffer) ){
break;
}
}
}
if( $_GET['_DB']<>"NO" && !function_exists("qQuery") ){
if( $_DBBuffer!="" ){
$tmp[0] = eNsp($_DBBuffer);
if( substr_count($tmp[0], ',')==0 ){
if( $tmp[0][0]=='>' ) $tmp[0] = trim(substr($tmp[0],1));
$_DB = $tmp[0];
if( substr_count(str_replace('\\','/',$tmp[0]),'/')==0 ) $tmp[0] = '/_datos/config/'.$tmp[0];
if( substr_count($tmp[0],'.')==0 ) $tmp[0] .= '.ini';
if( $tmp[0][0]=='~' ){
$_SqdDefinitionFile = str_replace('~','../..',$tmp[0]);
}else{
$_SqdDefinitionFile = eScript($tmp[0]);
}
include($_SqdDefinitionFile);
}else{
list($_Sql, $_SqlHostName, $_SqlDiccionario, $_SqlUsuario, $_SqlPassword, $_SqlPDOConnect) = explode(',', $tmp[0]);
if( $_SqlHostName[0]=='$' ) $_SqlHostName = ${$_SqlHostName};
}
list($_Sql, $_SqlPDOType) = explode(':', eNsp($_Sql));
if( $_Sql=='pdo' && $_SqlPDOConnect!='' ) $_SqlPDOConnect = eval('return ("'.$_SqlPDOConnect.'");');
unset($_DBBuffer);
}else{
if( $_GET["_SPIDER_"]=="E" ){
$_SESSION["_SPIDER_"]["opcion"] = "E";
if( !function_exists("__SpiderScript") ) include($Dir_."itm/spider.php");
$filePnt = str_replace(
array("_1.edf","../_tmp/log/"),
array("_0.pnt","../d/_spider/"),
$_Script_
);
$dim = file($filePnt);
$_SESSION["_SPIDER_"]["file"] = array();
for($n=0; $n<count($dim); $n++){
if( trim($dim[$n])<>"" ){
list($md, $fl) = explode("=", $dim[$n]);
$_SESSION["_SPIDER_"]["file"][$md] = trim($fl);
}
}
$_Sql = "spider";
}
}
include_once($Dir_.$_Sql.'.inc');
}
$_CallLabel = "";
$ElPuntoEsRem = true;
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
if( $Chr_1=='[' && substr($buffer,-1)=="|" && !preg_match('/^\[FIELDS\]/i',$buffer) ) _addBuffer($buffer, $nDimFCH, $_DimEDF);
$_NextLine = "";
$ElPuntoEsRem = true;
if( $_CallLabel<>"" && $Chr_1<>'[' ){
call_user_func("eCall_".$_CallLabel, null, $buffer);
continue;
}
$_CallLabel = "";
if( $TipoEntrada=='-1' ){
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp('l_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART);
include_once($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPSTART);
}
$nDimFCH--;
$buffer='';
}
if( $Chr_1=='[' ){
if( substr(strtoupper($buffer),0,8)=='[PLUGIN]' ){
$tmp = explode('|', substr($buffer,8));
$buffer = '#INCLUDE('.$tmp[0].')'.$tmp[1];
$tmp[1] = str_replace(chr(92),'/',$tmp[1]); $sTmp = explode('/',$tmp[1]); $tmp[1] = $sTmp[count($sTmp)-1];
if( count($tmp)==3 ){
$_PLUGIN[trim($tmp[1])] = trim($tmp[2]);
}else if( count($tmp)>3 ){
for($i=2; $i<count($tmp); $i++) $_PLUGIN[trim($tmp[1])][$i-2] = trim($tmp[$i]);
}
$Chr_1 = '#';
}else if( $buffer=="[" || substr($buffer,1,1)=="'" || substr($buffer,1,1)=='"' || ((substr($buffer,1,1)*1)."")===substr($buffer,1,1) ){
$Chr_1=' ';
}else if( !preg_match('/^[A-Za-z]{0,}[2]{0,1}$/', substr($buffer, 1, strpos($buffer,']')-1)) ){
$Chr_1 = '#';
}
}
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
list($cModo, $DirFile) = explode(')',eNsp($buffer));
$DirFile = strtolower($DirFile);
if( eOkMode($Opcion, substr($cModo,9)) ){
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
$sElPuntoEsRem = true;
if( $TipoEntrada=='_PDFCode' ){
$_PDFINCLUDE[$_PDFCCode] = $_PDFCode;
$_PDFCode = ''; $_PDFCCode = '';
}
if( $TipoEntrada=='_PHPSTART' ){
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp('l_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART);
include_once($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPSTART);
}
}
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando, $_SubModo);
switch( $Etiqueta ){
case 'DBTABLE':
$tmp[0] = _InVar($tmp[0]);
eMultitenancy($tmp[0]);
$_sDBTABLE = $tmp[0];
if( isset($tmp[1]) ) $_ISUBLISTSUFIJO = $tmp[1];
${$Comando} = $tmp[0];
break;
case 'DBSERIAL':
$_DBSERIAL = array($_DBTABLE, $tmp[0], '');
if( $_DBINDEX=="" ) $_DBINDEX = $tmp[0];
break;
case 'DBADDFILTER':
$_DBADDFILTER = $tmp[0];
break;
case 'FIELDS':
if( strtoupper($tmp[0])=='CARD' ){
if( $_SESSION["List"]["CardSwitch"] ){
$_CARDSHOW = true;
$dimCard = array();
$_FormCard = array();
$_pFieldCard = array();
$TipoEntrada = '_FIELDSCARD';
}
break;
}
if( $Opcion=='l' && ($tmp[0]=='?' || $tmp[0][0]=='c' || $tmp[0][0]=='b' || $tmp[0][0]=='m') && substr_count(',cl,bl,ml,',",{$tmp[0]},")==0 ){
$TipoEntrada = '_FIELDSQUESTION';
break;
}
if( strtoupper($tmp[0])=='XLS' && $_POST['_gs_formato_']!='X' ) break;
if( strtoupper($tmp[0])=='XML' && $_POST['_gs_formato_']!='M' ) break;
if( strtoupper($tmp[0])=='PDF' && $_POST['_gs_formato_']!='P' ) break;
if( strtoupper($tmp[0])=='MDB' && $_POST['_gs_formato_']!='A' ) break;
if( strtoupper($tmp[0])=='TXT' && $_POST['_gs_formato_']!='T' ) break;
if( strtoupper($tmp[0])=='CSV' && $_POST['_gs_formato_']!='V' ) break;
if( preg_match('/^(XLS|XML|PDF|MDB|TXT|CSV)$/', strtoupper($tmp[0])) ){
$_Form = array();
$tmp[0] = '1';
}
if( count($_Form)>0 ) break;
if( $tmp[0][0]=='#' ){
if( $_Variable[$tmp[0]] ){
$TipoEntrada = $Comando;
break;
}
}else if( $tmp[0][0]=='$' ){
if( _ExeEval($tmp[0], $buffer) ){
$TipoEntrada = $Comando;
break;
}
}
if( !empty($tmp[0]) ){
if( ord($tmp[0][0])>48 && ord($tmp[0][0])<58 ){
$_TCol = $tmp[0]*1;
$OkModo = true;
}else{
$cModo = explode(',', $tmp[0]);
$OkModo = (count(array_intersect($cModo, $DimOpcion))>0 );
if( (strtoupper($tmp[0])=='ELSE' || ($_ISUBLIST && strtoupper($tmp[0])=='ISUBLIST')) && count($_Form)==0 ) $OkModo = true;
if( !$OkModo ) break;
}
}else{
$OkModo = true;
}
if( !empty($tmp[1]) ){
if( ord($tmp[1][0])>48 && ord($tmp[1][0])<58 ){
$_TCol = $tmp[1]*1;
$OkModo = true;
}else{
$cModo = explode(',', $tmp[1]);
$OkModo = (count(array_intersect( $cModo, $DimOpcion))>0 );
if( strtoupper($tmp[1])=='ELSE' && count($_Form)==0 ) $OkModo = true;
}
}
if( $OkModo ){
$TipoEntrada = $Comando;
$tmp[2] = strtoupper($tmp[2]);
$_FieldsMix = ($tmp[2]=="MIX");
if( $tmp[2]=="TRIM" ){
$_ColsTrim = true;
$_WideListing = 0;
}
if( strtoupper($tmp[0])=="ISUBLIST" ){
$_FieldsMix = true;
$_FieldsISubList = true;
$_ColsTrim = false;
$_WideListing = 0;
}
}
break;
}
case  0:
case 10:
$ElPuntoEsRem = $sElPuntoEsRem;
break;
default:
$NoExePHPInterno = false;
switch( $TipoEntrada ){
case '_FIELDS':
if( IncluirEnForm('L', $Opcion, $buffer, $_Form, $_DEFAUX, 1) ){
$nf = count($_Form)-1;
if( substr_count($_Form[$nf][1], "[")>0 && $_Form[$nf][1][0]!="[" ){
list($ExtObj, $ExtField) = explode("[",str_replace("]","[",$_Form[$nf][1]));
if( $ExtObj[0]=='$' ){
@include_once("../_datos/config/{$ExtObj}.plugin");
}else{
@include_once("../../edesweb/itm/{$ExtObj}.plugin");
}
$_Form[$nf][1] = $ExtField;
call_user_func($ExtObj, $_Mode, $_Form[$nf]);
}
$txt = eFieldName($_Form[$nf][1]);
$_Field[$txt] = true;
$_pField[$txt] = $_Form[$nf];
eExplodeLast(" ".$txt, " ", $txt1, $txt);
$_pCol[$txt] = $nf;
if( $_Form[$nf][1]=='_gs_formato_' && $_Form[$nf][7]=='P' ) $PDF_Formato = 'L';
}elseif( strtoupper(substr(trim($buffer),0,3))=='{P}' ){
$NomSubEti = trim(substr(trim($buffer),3));
if( $_DimInclude['IncP'][$NomSubEti]=='' ) _CargarSubEti($nDimFCH, 'P', $NomSubEti);
$tmpFile = GrabaTmp('l_php_'.strtolower($NomSubEti), $_DimInclude['IncP'][$NomSubEti], $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
}
break;
}
}
}
$addCampo = "";
$AddValor = "";
if( $_DBADDFILTER!="" ){
list($addCampo, $AddValor) = explode("=", $_DBADDFILTER);
}
$DBSerial = $_DBSERIAL[1];
$pPK = null;
$campos = "";
for($n=0; $n<count($_Form); $n++){
if( $_Form[$n][1]==$DBSerial ){
$pPK = $n;
}
if( $campos!="" ) $campos .= ",";
$campos .= $_Form[$n][1];
}
if( $addCampo!="" ){
array_push($_Form, array("",$addCampo));
$campos .= ",".$addCampo;
}
$dimTR = explode("~", $_POST["_DATAEDITLIST"]);
$dim = array();
for($n=0; $n<count($dimTR); $n++){
$dim[$n] = explode("|", $dimTR[$n]);
if( $addCampo!="" ) array_push($dim[$n], $AddValor);
}
$test = false;
for($r=0; $r<count($dimTR); $r++){
if( $dim[$r][$pPK]<0 ){
$sql = "delete from {$_DBTABLE} where {$DBSerial}=".($dim[$r][$pPK]*-1);
if( $test ) eTron($sql);
else qQuery($sql);
}else if( $dim[$r][$pPK]=="" ){
$valores = "";
for($c=0; $c<count($dim[$r]); $c++){
$v = $dim[$r][$c];
if( $v=="" ) $v = "NULL";
else $v = "'{$v}'";
if( $valores!="" ) $valores .= ", ";
$valores .= $v;
}
$sql = "insert into {$_DBTABLE} ({$campos}) values ({$valores})";
if( $test ) eTron($sql);
else qQuery($sql);
}else{
$set = "";
for($c=0; $c<count($dim[$r]); $c++){
$v = $dim[$r][$c];
if( $v=="" ) $v = "NULL";
else $v = "'{$v}'";
if( $set!="" ) $set .= ", ";
$set .= $_Form[$c][1]."=".$v;
}
$sql = "update {$_DBTABLE} set {$set} where {$DBSerial}=".$dim[$r][$pPK];
if( $test ) eTron($sql);
else qQuery($sql);
}
}
eMessage("~U", "HS");
?>
