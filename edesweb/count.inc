<?PHP
session_start();
if( !isset($_SESSION['_User']) ) exit;
if( isset($_GET['_DBRANGE_']) ){
$tmp = explode('|',$_GET['_DBRANGE_']);
for( $n=0; $n<count($tmp); $n+=3 ){
$Campo		= $tmp[ $n  ];
$VarIni		= ${$tmp[$n+1]};
$VarFin		= ${$tmp[$n+2]};
$Inclusive	= ( substr_count( ',TRUE,!FALSE,1,,', ','.strtoupper($tmp[4]).',' ) == 1 );
if(		 $VarIni=='' && $VarFin=='' ){
}else if( $VarIni=='' && $VarFin!='' ){
${$Campo} = $VarFin;
}else if( $VarIni!='' && $VarFin=='' ){
${$Campo} = $VarIni;
}else if( $VarIni!='' && $VarFin!='' ){
if( $VarIni != $VarFin ){
if( $Inclusive ){
if( $VarIni < $VarFin ){
${$Campo} = '>='.$VarIni.' <='.$VarFin;
}else{
${$Campo} = '>='.$VarFin.' <='.$VarIni;
}
}else{
if( $VarIni < $VarFin ){
${$Campo} = '>'.$VarIni.' <'.$VarFin;
}else{
${$Campo} = '>'.$VarFin.' <'.$VarIni;
}
}
}else{
${$Campo} = $VarFin;
}
}
$_POST[$Campo] = ${$Campo};
}
}
eInclude( $_Sql, 'message', 'condicion' );
$DimNomVar  = array_keys($_POST);
$DimValor   = array_values($_POST);
$DimValorIn = array_values($_POST);
for( $n=0; $n < count($_POST); $n++ ){
$DimValor[$n] = trim(stripslashes( $DimValor[$n] ));
$_vF[ $DimNomVar[$n] ] = $DimValor[$n];
if( $_DBMEMO[ $DimNomVar[$n] ] ){
$DimValor[$n] = urldecode( $DimValor[$n] );
if( eSqlType("","pdo.informix") ){
$_MemoContenido[] = $DimValor[$n];
}else if( eSqlType('informix') ){
$_MemoContenido[] = ifx_create_blob( 1, 0, $DimValor[$n] );
}
}
}
if( $_DBINI != '' ){
$tmpFile = GrabaTmp( 'f_dbini', $_DBINI, $LenDoc );
include( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
unset( $_DBINI ); unset( $tmpFile );
for( $n=0; $n < count($_POST); $n++ ){
$DimValor[$n] = $_vF[ $DimNomVar[$n] ];
}
}
$xCampos = '';
$xValores = '';
for( $n=0; $n < count($DimNomVar); $n++ ){
if( substr( $DimNomVar[$n], 0, 1 ) == '_' ){
if( strlen($_Grabar) > 0 ) $_Grabar .= ', ';
$_Grabar .= $DimNomVar[$n]. '="' .$DimValor[$n]. '" ';
continue;
}
if( strlen($DimValor[$n])==10 && substr($DimValor[$n],2,1)=='-' && substr($DimValor[$n],5,1)=='-' ){
if( !eSqlType('oracle', 'pdo.informix') ){
$DimValor[$n] = substr($DimValor[$n],6,4).substr($DimValor[$n],2,4).substr($DimValor[$n],0,2);
}
}
$DimValor[$n] = trim($DimValor[$n]);
if( count($_DBSERIAL)==0 || ( count($_DBSERIAL)>0 && $_DBSERIAL[1] != $DimNomVar[$n] ) ){
if( strlen($Grabar) > 0 ) $Grabar .= ', ';
if( $xCampos != '' ) $xCampos .= ', ';
if( $xValores != '' ) $xValores .= ', ';
$xCampos .= $DimNomVar[$n];
if( $_DBMEMO[ $DimNomVar[$n] ] && eSqlType('informix') ){
$Grabar .= $DimNomVar[$n]. '=?';
$xValores .= '?';
}else{
if( !$DimOtrosCampos[$DimNomVar[$n]] ){
$Grabar .= $DimNomVar[$n]. '="' .$DimValor[$n]. '" ';
$xValores .= '"'.$DimValor[$n]. '"';
}
}
}
if( is_array($_POST[ $DimNomVar[$n] ]) ){
$iValor = '';
while( list( $clave, $val ) = each( $_POST[ $DimNomVar[$n] ] )){
if( $iValor!='' ) $iValor .= '|';
$iValor .= $val;
}
$DimValor[$n] = $iValor;
$sBusca = CondiSQL( $DimNomVar[$n].'[]', $DimValor[$n] );
}else{
$sBusca = CondiSQL( $DimNomVar[$n], $DimValor[$n] );
}
if( $sBusca!= '' ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $sBusca;
}
if( in_array($DimNomVar[$n], $DimIndice) ){
if( !empty($NTX) ) $NTX .= ' and ';
$NTX .= $DimNomVar[$n]. '="' .$DimValor[$n]. '" ';
$ValIndice[$n] = $DimValor[$n];
}
if( $_DBINDEX2!='' ){
if( in_array($DimNomVar[$n], $DimIndice2) ){
if( !empty($NTX2) ) $NTX2 .= ' and ';
$NTX2 .= $DimNomVar[$n]. '="' .$DimValor[$n]. '" ';
$ValIndice2[$n] = $DimValor[$n];
}
}
if( $_DBINDEX3!='' ){
if( in_array($DimNomVar[$n], $DimIndice3) ){
if( !empty($NTX3) ) $NTX3 .= ' and ';
$NTX3 .= $DimNomVar[$n]. '="' .$DimValor[$n]. '" ';
$ValIndice3[$n] = $DimValor[$n];
}
}
}
if( substr_count($_Accion, '.file')==1 && $Opcion=='A' ){
if( strlen($NTX)>0 ) $NTX .= ' and ';
if( is_array($FICHERO_name) ){
$NTX .= 'FICHERO="'.$FICHERO_name[0].'"';
}else{
$NTX .= 'FICHERO="'.$FICHERO_name.'"';
}
}
if( substr_count($Opcion,'R')>0 && !empty($_DBADDFILTER) ){
if( strlen($Busca)>0 ) $Busca .= ' and ';
if( substr_count($_DBADDFILTER, '{')>0 && substr_count($_DBADDFILTER, '}')>0 ){
$_DBADDFILTER = eval('return "'.$_DBADDFILTER.'";');
}else if( (substr_count($_DBADDFILTER,'()')==1 || substr_count($_DBADDFILTER,'( )')==1) && substr_count($_DBADDFILTER,'now()')==0 ){
$_DBADDFILTER = eval('return '.$_DBADDFILTER.';');
}
$Busca .= $_DBADDFILTER;
}
qCount($_DBTABLE, $Busca);
Estadistica('Rec', $_TReg, '', $_DBTABLE);
$_COUNT = str_replace('#', eNumberFormat($_TReg,0), $_COUNT);
if( substr_count($_COUNT, '(')>0 ){
if( !empty($_PHPINI) ){
$tmpFile = GrabaTmp('f_phpini', $_PHPINI, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPINI);
}
if( substr($_COUNT,-1)!=';' ) $_COUNT .= ';';
eval($_COUNT);
}else{
eInit();
if( $_GET['_OBJ']=='-G-' ){
eMessage('Registros encontrados: '.eNumberFormat($_TReg,0), 'V');
eEnd();
}else{
eHTML();
?>
</HEAD><BODY>
<SCRIPT type="text/javascript">
try{
var _WOPENER = window.frameElement.WOPENER;
<?PHP
echo 'top.eLoading(false,window);';
$SeTardo = number_format(eGetMicrotime()-$GLOBALS['_IniSg'], 2);
if( $_COUNT=='' ) $_COUNT = eNumberFormat($_TReg,0);
if( substr_count($_SERVER['QUERY_STRING'],'.gdf&')==0 || $_GET['_COUNT']==3 ){
eInit();
echo eQuote($_COUNT)."|".$SeTardo;
qEnd();
eEnd();
?>
if( window.name=='_SUBLISTADO' ) _WOPENER.DGI('_Div_SUBLISTADO').style.display = 'none';
if( _WOPENER.DimCount==undefined ){
_WOPENER.DimCount = new Array();
_WOPENER.DimCountPK = new Array();
}
_WOPENER.DimCount[_WOPENER.DimCount.length] = "<?= eQuote($_COUNT) ?>";
_WOPENER.DimCountPK[_WOPENER.DimCountPK.length] = _WOPENER._CountPK;
<?PHP
echo 'top.eInfoHide(_WOPENER);';
echo 'top.eInfo(_WOPENER, "Registros encontrados: '.eQuote($_COUNT).'", 3);';
echo '_WOPENER.eDisableButton(0);';
echo 'if( _WOPENER.DGI("DimRecuentos")!=null ) _WOPENER._AddCountLast("'.$SeTardo.'");';
echo 'if( _WOPENER.DGI("DimRecuentos")==null ) _WOPENER._LastCounts("'.$SeTardo.'");';
}else{
?>
if( window.name=='_SUBLISTADO' ) _WOPENER.DGI('_Div_SUBLISTADO').style.display = 'none';
if( _WOPENER.DimCount==undefined ){
_WOPENER.DimCount = new Array();
_WOPENER.DimCountPK = new Array();
}
_WOPENER.DimCount[_WOPENER.DimCount.length] = "<?= eQuote($_COUNT) ?>";
_WOPENER.DimCountPK[_WOPENER.DimCountPK.length] = _WOPENER._CountPK;
<?PHP
echo 'if( _WOPENER.DGI("DimRecuentos")!=null ) _WOPENER._AddCountLast("'.$SeTardo.'");';
echo 'if( _WOPENER.DGI("DimRecuentos")==null ) _WOPENER._LastCounts("'.$SeTardo.'");';
echo 'var win = (window.frameElement.id=="ICALL" ? _WOPENER : window);';
echo 'top.eInfoHide(win);';
echo 'top.eInfo(win, "'.eQuote($_COUNT).'", 3);';
echo 'top.eLoading(false,win);';
echo 'win.eDisableButton(0);';
}
echo '}catch(e){}';
echo 'try{';
echo '_WOPENER.document.body.disabled = false;';
echo '}catch(e){}';
echo '_WOPENER.document.body.style.visibility = "visible";';
echo '</SCRIPT>';
echo '</BODY></HTML>';
}
}
qEnd();
eEnd();
?>
