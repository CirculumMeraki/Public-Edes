<?PHP
if( !isset($_SESSION['_User']) || $GLOBALS['_gsID'] != getmypid() ) exit;
$Opcion = $sModo;
global $_User, $_Node, $_Development;
$_DimEDF = @OpenDF($File);
$_gsCreate_ = false;
$DimOpcion = array($sModo,'?','l');
array_push( $DimOpcion, 'u'.$_User, 'n'.$_Node );
if( $_SESSION['_TreeList']!='' ){
$tmp = explode(',',$_SESSION['_TreeList']);
for( $n=0; $n<count($tmp); $n++ ) $DimOpcion[] = 't'.$tmp[$n];
}else{
$DimOpcion[] = 't'.$_Tree;
}
if( $_Development!='' ) array_push( $DimOpcion, 'd' );
if( $_SESSION['_WebMaster']=='S' ) array_push( $DimOpcion, 'w' );
$_ePermission = $DimOpcion;
$ElPuntoEsRem = true;
$OriginalOpcion = $Opcion;
for( $nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++ ){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
$ElPuntoEsRem = true;
if( $TipoEntrada=='-1' ){
if( !empty($_PHPSTART) ){
$tmpFile = GrabaTmp( 'f_phpstart', $_PHPSTART, $LenDoc, $_FILE_PHPSTART );
include_once( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
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
case 'CC':
eExplodeOne( $buffer, '|', $txt1, $txt2 );
$_Variable[$tmp[0]] = _ExeEval( $txt2, $buffer );
break;
case 'CREATEVAR':
$_CREATEVAR[$tmp[0]] = _ExeEval( $tmp[1], $buffer, 1 );
break;
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
if( $OkModo ){
$_TmpFieldSet = array('','','','');
$_EnLinea = array();
$_TmpEnLinea = array('','','');
$_EnColumna = array();
$_TmpEnColumna = array('','','','');
$_NewNColumnas = array();
$_TmpNColumnas = array('','','','');
$TipoEntrada = $Comando;
}
break;
}
break;
case  0:
case 10:
break;
default:
switch( $TipoEntrada ){
case '_FIELDS':
if( IncluirEnForm( 'F', $Opcion, $buffer, $_Form, $_DEFAUX, 1 ) ){
if( $_TmpFieldSet[1] == '+' ) $_TmpFieldSet[1]	= NombreCampo( $_Form[count($_Form)-1][1] );
if( $_TmpEnLinea[1]	 == '+' ) $_TmpEnLinea[1]	= NombreCampo( $_Form[count($_Form)-1][1] );
if( $_TmpEnColumna[1]== '+' ) $_TmpEnColumna[1] = NombreCampo( $_Form[count($_Form)-1][1] );
if( $_TmpNColumnas[1]== '+' ) $_TmpNColumnas[1] = NombreCampo( $_Form[count($_Form)-1][1] );
}
break;
case '_LANGUAGE':
global $_LANGUAGE, $_LanguageTron, $_LNGCOL;
list($buffer) = explode( '~', $buffer );
$tmp = explode( '|', $buffer );
$Clave = trim($tmp[0]);
$txt = trim($tmp[$_LNGCOL]);
if( $txt=='' ) $txt = trim($tmp[$_LNGCOLDEFAULT]);
$txt = str_replace("'",'&amp;',str_replace('"','&quot;',$txt));
$_LANGUAGE[] = array( '@'.$Clave.'@', $_LanguageTron.$txt.$_LanguageTron );
break;
}
}
}
unset($_DimEDF);
?>
