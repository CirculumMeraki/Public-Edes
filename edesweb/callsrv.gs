<?PHP
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
if(!$_RegisterShutdown){
register_shutdown_function('_ExitPHP');
$_RegisterShutdown = true;
}
$test = false;
$i = strpos($argv[0],'CallSrv=')+8;
$f = strpos($argv[0],'&');
$Fichero = substr( $argv[0], $i, $f-$i );
include_once( $Dir_.$_Sql.'.inc' );
list( $_SqlPDOType ) = explode( ':', $_SqlPDOConnect );
$argv[0] = substr($argv[0],strpos($argv[0],'|')+1);
$_SERVER['QUERY_STRING'] = $argv[0];
$__EXE = '';
unset( $_REQUEST['E:CallSrv'] );
unset( $_GET['E:CallSrv'] );
foreach( $_GET as $k=>$v ){
$v = stripslashes(urldecode($v));
if( strlen($v)>=2 ){
if( ($v[0]=='"' || $v[0]=="'" ) and substr($v,-1)==$v[0] ) $v = substr($v,1,-1);
}
$_REQUEST[$k] = $v;
$_GET[$k] = $v;
${$k} = $v;
if( $__EXE=='' ) $__EXE = $k;
}
if( $test ){
eTrace( 'Fichero: '.$Fichero ); eTrace('QUERY_STRING: '.$_SERVER['QUERY_STRING']);
for( $i=0; $i<count($argv); $i++ ) eTrace('Argv['.$i.']: '.$argv[$i]);
}
$oFichero = $Fichero;
$Fichero = eScript( $Fichero );
if( $test ){
eTrace( 'Fichero: '.$Fichero );
eTrace( '$argv[0]: '.$argv[0] );
eTrace( '$argv[0].Valor: '.$__EXE );
eTrace( '' );
}
if( substr($Fichero,-4)=='.php' ) $Fichero = substr($Fichero,0,-4).'_callsrv.gs';
if( !isset($_LANGUAGE) ) $_LANGUAGE = array();
if( !isset($_LNGCOL) ) $_LNGCOL = 1;
if( !isset($_LNGCOLDEFAULT) ) $_LNGCOLDEFAULT = 1;
$_CALLSRV = '';
$NO = array();
$txt = '';
$Ok = false;
$TipoEntrada = '#';
$_DimEDF = @OpenDF($Fichero);
$ElPuntoEsRem = true;
for( $n=0; $n<count($_DimEDF); $n++ ){
$buffer = trim($_DimEDF[$n]);
if( !@LeeDF($buffer, array('#NO#'), $NO, $NO, $NO, $Chr_1, $NO, $NO, $NO, $NO, $NO, $NO, $NO, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
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
list( $cModo, $DirFile ) = explode(')',str_replace(' ','',$buffer));
$DirFile = strtolower($DirFile);
if( true || eOkMode( $Opcion, substr($cModo,9) ) ){
if( trim(strtoupper($DirFile)=='LNG' ) ){
$tmp = explode('/',str_replace(chr(92),'/',$oFichero));
$DirFile = (($oFichero[0]=='$')?'$':'').'lng/'.$tmp[count($tmp)-1].'.lng';
}
$tmp = eScript(trim($DirFile));
if( file_exists($tmp) ){
$txt = file_get_contents($tmp);
if( substr($tmp,-4)=='.zdf' ){
if( substr($txt,0,5)=='eDes ' ){
$iDimEDF = explode( "\n", gzuncompress(substr($txt,5)) );
}else{
$iDimEDF = explode( "\n", $txt );
}
$txt = '';
}else{
$iDimEDF = file($tmp);
}
if( trim(strtoupper($DirFile)=='LNG' ) ) $iDimEDF[] = '[.]';
for( $c=0; $c<count($iDimEDF); $c++ ){
$tmp = ltrim($iDimEDF[$c]);
if( $tmp[0]=='[' && substr(strtoupper($tmp),0,6)=='[NOTE]' ){
for( $i=$c; $i<count($iDimEDF); $i++ ) $iDimEDF[$i] = '';
break;
}
}
$tDim = array_slice($_DimEDF,0,$n);
$tDim = array_merge($tDim,array($iDimEDF[0]));
$tDim = array_merge($tDim,$iDimEDF);
$tDim = array_merge($tDim,array_slice($_DimEDF,$n+1));
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
case 'LANGUAGE':
$_LANGUAGE = array();
$tmp2 = explode( ',', trim(str_replace(' ','',$tmp[0])) );
for( $i=0; $i<count($tmp2); $i++ ){
if( $tmp2[$i]==$_SESSION['_LANGUAGE_'] ) $_LNGCOL = $i+1;
if( $tmp2[$i]==$_SESSION['_LanguageDefault'] ) $_LNGCOLDEFAULT = $i+1;
}
$TipoEntrada = '_LANGUAGE';
if( (strtoupper($tmp[2])=='TRUE' || $tmp[2]=='1') && $_Development ) $_LanguageTron = '~';
if( strtoupper($tmp[1])=='TRUE' || $tmp[1]=='1' ) eLngLoad('../_datos/config/language.lng', '', 2);
break;
case 'CALLSRV':
list(,$Tipo) = explode(']',$buffer);
if( $__EXE==trim($Tipo) ) $TipoEntrada = '_CALLSRV';
break;
case 'NOTE':
case 'EXIT':
break 3;
}
break;
case   0:
case  10:
case 123:
break;
default:
switch( $TipoEntrada ){
case '#':
break;
case '_LANGUAGE':
list($buffer) = explode( '~', $buffer );
$tmp = explode( '|', $buffer );
$Clave = trim($tmp[0]);
$txt = trim($tmp[$_LNGCOL]);
if( $txt=='' ) $txt = trim($tmp[$_LNGCOLDEFAULT]);
$txt = str_replace("'",'&amp;',str_replace('"','&quot;',$txt));
$_LANGUAGE[] = array( '@'.$Clave.'@', $_LanguageTron.$txt.$_LanguageTron );
break;
case '_CALLSRV':
$_CALLSRV .= $buffer.$__Enter;
break;
}
}
}
if( !$test ) eInit();
$tmpFile = GrabaTmp('callsrv_'.$argv[0], $_CALLSRV, $LenDoc);
$callSrvKO = (trim($_CALLSRV)=="");
unset( $n );
unset( $i );
unset( $f );
unset( $NO );
unset( $Chr_1 );
unset( $_CALLSRV );
unset( $TipoEntrada );
unset( $_DimEDF );
unset( $test );
unset( $tmp );
unset( $Clave );
eHTML("E:{$oFichero}", $__EXE);
echo '</head><body>';
include_once( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
echo '</body></html>';
eEnd();
?>
