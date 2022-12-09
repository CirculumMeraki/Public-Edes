<?PHP
function DimDBRangeGet( $File ){
$DimDBRange = array();
$_DimEDF = @OpenDF(eScript($File));
$ElPuntoEsRem = true;
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
if( $Chr_1=='[' && substr($buffer,-1)=="|" && !preg_match('/^\[FIELDS\]/i',$buffer) ) _addBuffer($buffer, $nDimFCH, $_DimEDF);
$ElPuntoEsRem = true;
if( $TipoEntrada=='-1' ){
$nDimFCH--;
$buffer='';
}
if( $Chr_1=='#' ){
if( substr(strtoupper($buffer),0,9)=='#INCLUDE(' ){
list($buffer, $VerError) = explode('|',$buffer);
while( substr_count($buffer,'{$')>0 ){
$p = strpos($buffer, '{$');
$tmp = substr($buffer,$p,strpos($buffer, '}')-$p+1);
if( $GLOBALS[substr($tmp,2,-1)]!='' ){
$buffer = str_replace($tmp,$GLOBALS[substr($tmp,2,-1)],$buffer);
}else{
$buffer = str_replace($tmp,$_SESSION[substr($tmp,2,-1)],$buffer);
}
}
list($cModo, $DirFile) = explode(')',str_replace(' ','',$buffer));
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
if( $TipoEntrada=='_PHPSTART' ){
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp( 'l_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART );
include_once( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
unset( $_PHPSTART );
}
}
if( $TipoEntrada=='_PDFCode' ){
$_PDFINCLUDE[$_PDFCCode] = $_PDFCode;
$_PDFCode = ''; $_PDFCCode = '';
}
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
switch( $Etiqueta ){
case 'DBRANGE':
$DimDBRange[] = array($tmp[1], ${$tmp[2]}, ${$tmp[3]}, $tmp[4], $tmp[2], $tmp[3]);
break;
}
}
}
return $DimDBRange;
}
?>
