<?PHP
if( !function_exists("_FileNoCache") ){
function _FileNoCache($file, $inner=""){
$para = filemtime("../../edesweb/{$file}");
echo '<SCRIPT type="text/javascript"'.$inner.' SRC="edes.php?R:$'.$file.'&j='.$para.'"></SCRIPT>'.$GLOBALS['__Enter'];
}
}
if( !function_exists("GrabaTmp") ){
function GrabaTmp($NomEti, $Contenido, &$Long, $NomFile="", $NomFuncCall=""){
global $_Include, $_TmpInclude, $php_errormsg, $__eLINE__, $__iSCRIPT__, $__iniSCRIPT__, $_DEBUG, $_TRACELABEL, $_Development, $_TmpPhpFile;
$__iSCRIPT__ .= $NomEti.', ';
$_Include = $NomEti;
if( func_num_args()==3 ) $Long = strlen(ob_get_contents());
if( $_Development && !preg_match("/FUNCTION_EXISTS/i", $Contenido) ){
$Dim = explode( "\n", trim($Contenido) );
for( $n=0; $n<count($Dim); $n++ ){
if( preg_match("/^FUNCTION /i", trim($Dim[$n]) ) ){
list($NomFunc) = explode( '(', substr(trim($Dim[$n]),8) );
if( function_exists( trim($NomFunc) ) ){
list(,$NomEti) = explode('_',$NomEti);
$php_errormsg = ' Función "'.trim($NomFunc).'()" ya definida.';
_ExitPHP();
}
}
}
}
if( $NomFuncCall=="" ){
$Contenido = '<'.'?PHP /'.'/ '.$NomEti.chr(10).$Contenido.' ?'.'>';
}else{
$Contenido = '<'.'?PHP '							.chr(10).
"function {$NomFuncCall}(){"	.chr(10).
$Contenido					.chr(10).
'}'								.chr(10).
'?'.'>';
}
if( $NomFile=='' ){
$_TmpPhpFile++;
$_TmpInclude = '../_tmp/php/'.$_SESSION['_User'].'_'.$_TmpPhpFile;
}else{
$_TmpInclude = '../_tmp/php/'.$NomFile;
}
list(,$Eti) = explode('_',$NomEti);
if( $_DEBUG==2 && strtoupper($Eti)==$_TRACELABEL ){
$__eLINE__ = 2;
$Contenido = '<'.'?PHP '.'$__iniSCRIPT__ = "'.$_Include.'";'.' ?'.'>'."\n".$Contenido."\n";
file_put_contents($_TmpInclude.'.php', $Contenido);
$Dim = explode("\n", trim($Contenido));
$Contenido = '';
$EnPHP = false;
for($n=0; $n<count($Dim)-1; $n++){
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n]=='?'.'>' ) $EnPHP = false;
if( $EnPHP ){
$__eLINE__++;
if( $Old!='switch(' ) $Contenido .= '$__eLINE__='.$__eLINE__.";" . 'if( $php_errormsg!="" ){ eInit(); die("LINEA: ".$__eLINE__."   ERROR: ".$php_errormsg); }'."\n";
}
$Contenido .= $Dim[$n]."\n";
if( $Dim[$n]=='<'.'?' ) $EnPHP = true;
$Old = substr($Dim[$n],0,7);
}
}
file_put_contents($_TmpInclude, $Contenido);
if( $GLOBALS['_DEBUG']==2 ){
file_put_contents('../_tmp/log/'.$_SESSION['_User'].'_'.$NomEti.'.'.$GLOBALS['Opcion'], $_TmpInclude."\n".$Contenido);
}
$php_errormsg = '';
ini_set('track_errors', _TRACK_ERRORS);
error_reporting(_ERROR_REPORTING);
return $_TmpInclude;
}
function GrabaTmp2($NomEti, $Contenido, &$Long){
global $_Include, $_TmpInclude, $php_errormsg, $__eLINE__, $__iSCRIPT__, $__iniSCRIPT__, $_DEBUG, $_TRACELABEL, $_Development;
$__iSCRIPT__ .= $NomEti.', ';
$_Include = $NomEti;
if( func_num_args()==3 ) $Long = strlen(ob_get_contents());
if( $_Development && !preg_match("/FUNCTION_EXISTS/i", $Contenido ) ){
$Dim = explode( "\n", trim($Contenido) );
for( $n=0; $n<count($Dim); $n++ ){
if( preg_match("/^FUNCTION /i", trim($Dim[$n]) ) ){
list( $NomFunc ) = explode( '(', substr(trim($Dim[$n]),8) );
if( function_exists( trim($NomFunc) ) ){
list( ,$NomEti ) = explode('_',$NomEti);
$php_errormsg = ' Función "'.trim($NomFunc).'()" ya definida.';
_ExitPHP();
}
}
}
}
$Contenido = '<'.'?PHP '						.chr(10).
'function __SelInfo__(){'	.chr(10).
$Contenido				.chr(10).
'}'							.chr(10).
'?'.'>';
$_TmpInclude = tempnam('../_tmp/php',$_SESSION['_User']);
list(,$Eti) = explode('_',$NomEti);
if( $_DEBUG==2 && strtoupper($Eti)==$_TRACELABEL ){
$Contenido = '<'.'?PHP '. '$__iniSCRIPT__ = "'.$_Include.'";'.' ?'.'>'."\n".$Contenido."\n";
$Dim = explode( "\n", trim($Contenido) );
$Contenido = '';
$EnPHP = false;
for( $n=0; $n<count($Dim)-1; $n++ ){
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n]=='?'.'>' ) $EnPHP = false;
if( $EnPHP ){
$__eLINE__++;
$Contenido .= '$__eLINE__='.$__eLINE__.";\n";
$Contenido .= 'if( $php_errormsg!="" ){ eInit(); die( "LINEA: ".$__eLINE__."   ERROR: ".$php_errormsg ); }'."\n";
}
$Contenido .= $Dim[$n]."\n";
if( $Dim[$n]=='<'.'?' ) $EnPHP = true;
}
}
file_put_contents( $_TmpInclude, $Contenido );
if( $GLOBALS['_DEBUG'] == 2 ){
file_put_contents( '../_tmp/log/'.$_SESSION['_User'].'_'.$NomEti.'.'.$GLOBALS['Opcion'], $_TmpInclude."\n".$Contenido );
}
$php_errormsg = '';
ini_set( 'track_errors', _TRACK_ERRORS );
error_reporting( _ERROR_REPORTING );
return $_TmpInclude;
}
}
eCheckUser();
if( $_gsTron ) eTron('{12}'.$Dir_.'selinfo.gs');
$Parameter = explode('&',$argv[0]);
list(,$NomFile) = explode(':',$Parameter[0]);
if( substr($NomFile,0,3)=="%3E" ){
$_ExeTab = true;
$NomFile = substr($NomFile,3);
}
$argv = array();
for($n=1; $n<count($Parameter); $n++){
$argv[] = $Parameter[$n];
}
$_TITLE = $_GET["TITLE"] ? $_GET["TITLE"]:"Filtrar";
$_TITLE = str_replace(array('"',"'"," "), array('\"','&#39;','&#32;'), $_TITLE);
$_DEBUG = 0;
$Dim = file('../d/'.$NomFile);
for( $n=0; $n<count($Dim); $n++ ){
list( $Orden, $Parametro ) = explode( ':', trim($Dim[$n]) );
if( $n==0 && $Orden=='DEBUG' ){
$_DEBUG = 1;
continue;
}
if( $n==0 && $Orden=='SAVESQL' ){
$_DEBUG = 4;
continue;
}
if( $n==0 && $Orden=='SAVESQLH' ){
$_DEBUG = 10;
continue;
}
if( $Orden=='DB' ){
$Parametro = str_replace(' ','',$Parametro);
if( substr_count($Parametro,',') == 0 ){
if( $Parametro[0]=='>' ) $Parametro = trim(substr($Parametro,1));
$tmp2 = $Parametro;
$_DB = $tmp2;
if( substr_count(str_replace('\\','/',$tmp2),'/')==0 ) $tmp2 = '/_datos/config/'.$tmp2;
if( substr_count($tmp2,'.')==0 ) $tmp2 .= '.ini';
if( $tmp2[0]=='~' ){
$_SqdDefinitionFile = str_replace('~','../..',$tmp2);
}else{
$_SqdDefinitionFile = eScript($tmp2);
}
include($_SqdDefinitionFile);
}else{
list($_Sql, $_SqlHostName, $_SqlDiccionario, $_SqlUsuario, $_SqlPassword, $_SqlPDOConnect) = explode(',', $Parametro);
if( $_SqlHostName[0]=='$' ) $_SqlHostName = ${$_SqlHostName};
}
list($_Sql, $_SqlPDOType) = explode(':', str_replace(' ','',$_Sql));
if( $_Sql=='pdo' && $_SqlPDOConnect!='' ) $_SqlPDOConnect = eval('return ("'.$_SqlPDOConnect.'");');
break;
}
if( $n > 3 ) break;
}
if( $_SERVER['QUERY_STRING'][0]=='E' ) $SelInfoWidthTab = true;
if( !isset($SelInfoWidthTab) ) eInclude($_Sql);
$ConRastroTrace = false;
$ConRastroTron = false;
$FuenteOk = true;
$FuenteParticular = false;
$EsRem = false;
$EsPHP = false;
$FuentePHP = '';
$TReg = -1000;
$_vF = array();
if( $ConRastroTrace ){
eTrace( 'QUERY_STRING: '.$_SERVER['QUERY_STRING'] );
eTrace( 'SOURCE: '.$_SOURCE );
}
if( $ConRastroTron ){
eTron( 'QUERY_STRING: '.$_SERVER['QUERY_STRING'] );
eTron( 'SOURCE: '.$_SOURCE );
}
$Comando = array();
$_SourceScript = $NomFile;
$_DimOnChange = array();
$_Focus = '';
$FuenteYaOk = false;
$Dim = file( '../d/'.$NomFile );
for( $n=0; $n<count($Dim); $n++ ){
$Linea = trim($Dim[$n]);
if( $n==0 ){
if( strtoupper($Linea)=='DEBUG' || strtoupper($Linea)=='DEBUG:' ){
$_DEBUG = 1;
continue;
}else if( strtoupper($Linea)=='SAVESQL' || strtoupper($Linea)=='SAVESQL:' ){
$_DEBUG = 4;
continue;
}else if( strtoupper($Linea)=='SAVESQLH' || strtoupper($Linea)=='SAVESQLH:' ){
$_DEBUG = 10;
continue;
}else if( strtoupper($Linea)=='TRON' || strtoupper($Linea)=='TRON:' ){
eTron( 'QUERY_STRING: '.$_SERVER['QUERY_STRING'] );
$ConRastroTron = true;
continue;
}else if( strtoupper($Linea)=='TRACE' || strtoupper($Linea)=='TRACE:' ){
eTrace( 'QUERY_STRING: '.$_SERVER['QUERY_STRING'] );
$ConRastroTrace = true;
continue;
}
}
if( $Linea=='' || $Linea[0]=='.' || substr($Linea,0,2)=='//' ) continue;
if( substr($Linea,0,2)=='/'.'*' && substr_count( $Linea, '*'.'/' ) == 0 ){
$EsRem = true;
}else if( $EsRem && substr_count( $Linea, '*'.'/' ) > 0 ){
$EsRem = false;
$Linea = trim(substr($buffer,strpos($Linea, '*'.'/')+2 ));
if( $Linea=='' ) continue;
}
if( $EsRem ) continue;
if( substr_count($Linea,'//')>0 ){
$Linea = trim(substr($Linea,0,strpos($Linea,'//')));
if( $Linea=='' ) continue;
}
if( strtoupper($Linea)=='[NOTE]' ) break;
$Linea = str_replace("\t",' ',$Linea);
$Linea = str_replace('  ',' ',$Linea);
if( $ConRastroTrace ) eTrace('Original: '.$Linea );
if( $ConRastroTron ) eTron('Original: '.$Linea );
if( preg_match("/^SELECT /i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
$CadenaABuscar = '';
while( substr_count($Linea,'{$') > 0 && substr_count($Linea,'}') > 0 ){
$p = strpos( $Linea, '{$' );
$tmp = substr($Linea,$p,strpos($Linea, '}')-$p+1);
$Variable = substr($tmp,2,-1);
if( substr($Variable,-1)==']' ){
list($Variable,$Indice) = explode('[',$Variable);
list($Indice) = explode(']',$Indice);
$Indice = trim($Indice);
if( $Indice[0]=="'" || $Indice[0]=='"' ) $Indice = substr($Indice,1,-1);
if( $Indice=='' ) $Indice = 0;
$CadenaABuscar .= ''.$GLOBALS[ $Variable ][$Indice];
$Linea = str_replace( $tmp, $GLOBALS[ $Variable ][$Indice], $Linea );
}else{
$CadenaABuscar .= ''.$GLOBALS[ $Variable ];
$Linea = str_replace( $tmp, $GLOBALS[ $Variable ], $Linea );
}
}
if( $ConRastroTrace ) eTrace( 'Cadena a buscar ['.$CadenaABuscar.']');
if( $TReg == -1000 ){
if( isset($SelInfoWidthTab) ){
$TReg = '100000';
}else if( $CadenaABuscar !='' ){
list( ,$DBCount ) = explode(' from ',$Linea );
$DBCount = 'select count(*) from '.$DBCount;
qQuery( $DBCount );
list( $TReg ) = qRow();
if( $TReg==1 ){
qQuery($Linea);
$_vF = qArray();
}
}else{
$TReg = -2000;
continue;
}
}else if( $TReg==1 ){
qQuery($Linea);
$sFila = qArray();
foreach($sFila as $key=>$val){
if( isDate($val) ){
if( isZero($val) ) $val = '';
}
$_vF[$key] = $val;
}
}else if( $TReg==-2000 ){
continue;
}
}else if( preg_match("/^count /i", $Linea) || preg_match("/^count:/i", $Linea) || preg_match("/^count :/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
$Linea = str_replace(':','',$Linea);
}else if( preg_match("/^empty /i", $Linea) || preg_match("/^empty:/i", $Linea) || preg_match("/^empty :/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
$Linea = str_replace(':','',$Linea);
}else if( preg_match("/^put /i", $Linea) || preg_match("/^put :/i", $Linea) || preg_match("/^put:/i", $Linea) ){
if( !$FuenteOk ) continue;
$Linea = str_replace('+','.',$Linea);
$EsPHP = false;
}else if( preg_match("/^clear /i", $Linea) || preg_match("/^clear :/i", $Linea) || preg_match("/^clear:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^onchange /i", $Linea) || preg_match("/^onchange:/i", $Linea) || preg_match("/^onchange :/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = true;
}else if( preg_match("/^list /i", $Linea) || preg_match("/^list :/i", $Linea) || preg_match("/^list:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^tab /i", $Linea) || preg_match("/^tab :/i", $Linea) || preg_match("/^tab:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
if( $_ExeTab ){
echo '<script>';
$Linea = trim(substr($Linea,3));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
CalcVariables($Linea);
if( $ConRastroTron ){
if( substr_count($Linea, '.gdf')==1 ){
eTron('top.eSWOpen(_WOPENER, "edes.php?Gc:'.$Linea.'", "Aplique más filtros");');
}else{
eTron('top.eSWOpen(_WOPENER, "edes.php?Fc:'.$Linea.'", "Aplique más filtros");');
}
}
if( $ConRastroTrace ){
if( substr_count($Linea, '.gdf')==1 ){
eTrace('top.eSWOpen(_WOPENER, "edes.php?Gc:'.$Linea.'", "Aplique más filtros");');
}else{
eTrace('top.eSWOpen(_WOPENER, "edes.php?Fc:'.$Linea.'", "Aplique más filtros");');
}
}else{
if( substr_count($Linea, '_FILTER=')>0 ){
list($script, $filtro) = explode('_FILTER',$Linea);
$filtro = trim($filtro);
list($filtro, $asignar) = explode('_ASSIGN',$filtro);
$filtro = trim($filtro);
}else{
list($script, $asignar) = explode('_ASSIGN',$Linea);
}
$script = trim($script);
$asignar = str_replace('+','.',trim($asignar));
$asignar = str_replace('"',"'",$asignar);
if( substr($script,-1)=='&' ) $script = substr($script,0,-1);
if( substr($script,-1)=='?' ) $script = substr($script,0,-1).'&';
if( $filtro[0]=='=' ) $filtro = substr($filtro,1);
if( substr($filtro,-1)=='&' ) $filtro = substr($filtro,0,-1);
if( $asignar[0]=='=' ) $asignar = substr($asignar,1);
$asignar = str_replace(';',',',$asignar);
if( $_Focus != '' ) echo "_WOPENER._FocusLast = '{$_Focus};'";
if( substr_count($Linea, '.gdf')==1 ){
?>
top.eSWOpen(window, "edes.php?Gc:<?=$script?>&_ASSIGN=c&<?=eQuote($filtro)?>"+"&_CAMPO_=&_SEL_="+escape(";<?=$asignar?>")+"&_PSOURCE=<?=$_GET["_SOURCE"]?>&_AUX_=C&_NOEVENT=1", "<?=$_TITLE?>");
<?PHP
}else{
?>
top.eSWOpen(window, "edes.php?Fc:<?=$script?>&_ASSIGN=c&<?=eQuote($filtro)?>"+"&_CAMPO_=&_SEL_="+escape(";<?=$asignar?>")+"&_PSOURCE=<?=$_GET["_SOURCE"]?>&_AUX_=C&_NOEVENT=1", "<?=$_TITLE?>");
<?PHP
}
}
if( $_GET["_FOCUS"]!="" ) echo "_WOPENER.S(':".$_GET["_FOCUS"]."').css('backgroundColor:');";
echo '</script>';
eEnd();
}
}else if( preg_match("/^function :/i", $Linea) || preg_match("/^function:/i", $Linea) ){
$EsPHP = false;
}else if( preg_match("/^EditField /i", $Linea) || preg_match("/^EditField :/i", $Linea) || preg_match("/^EditField:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^NoEditField /i", $Linea) || preg_match("/^NoEditField :/i", $Linea) || preg_match("/^NoEditField:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^HideFields /i", $Linea) || preg_match("/^HideFields :/i", $Linea) || preg_match("/^HideFields:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^ShowFields /i", $Linea) || preg_match("^ShowFields :/i", $Linea) || preg_match("^ShowFields:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^ShowTR /i", $Linea) || preg_match("/^ShowTR :/i", $Linea) || preg_match("/^ShowTR:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^HideTR /i", $Linea) || preg_match("/^HideTR :/i", $Linea) || preg_match("/^HideTR:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^ShowGrpTR /i", $Linea) || preg_match("/^ShowGrpTR :/i", $Linea) || preg_match("/^ShowGrpTR:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^HideGrpTR /i", $Linea) || preg_match("/^HideGrpTR :/i", $Linea) || preg_match("/^HideGrpTR:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^ShowGrpTR- /i", $Linea) || preg_match("/^ShowGrpTR- :/i", $Linea) || preg_match("/^ShowGrpTR-:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^HideGrpTR- /i", $Linea) || preg_match("/^HideGrpTR- :/i", $Linea) || preg_match("/^HideGrpTR-:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^ShowTab /i", $Linea) || preg_match("/^ShowTab :/i", $Linea) || preg_match("/^ShowTab:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^HideTab /i", $Linea) || preg_match("/^HideTab :/i", $Linea) || preg_match("/^HideTab:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/language :/i", $Linea) || preg_match("/language:/i", $Linea) ){
global $_LANGUAGE, $_LngPublic;
$tmp = explode(':',$Linea);
$Idiomas = explode(',',str_replace(' ','',strtolower($tmp[1])));
$p = 1;
for( $i=0; $i<count($Idiomas); $i++ ){
if( $Idioma[$i]==$_SESSION['_LANGUAGE_'] ){
$p = $i+1;
break;
}
}
for( $i=$n+1; $i<count($Dim); $i++ ){
$txt = trim($Dim[$i]);
if( $txt=='' ){
}else if( substr_count( $txt, '|' )==0 ){
$n = $i-1;
break;
}else{
$tmp = explode('|',$txt);
$tmp[$p] = trim($tmp[$p]);
if( $tmp[$p]=='' ) $tmp[$p] = trim($tmp[1]);
$_LngPublic['@'.trim($tmp[0]).'@'] = $tmp[$p];
}
}
continue;
}else if( preg_match("/^message /i", $Linea) || preg_match("/^message :/i", $Linea) || preg_match("/^message:/i", $Linea) ){
if( !$FuenteOk ) continue;
for( $i=0; $i<count($_LANGUAGE); $i++ ) $Linea = str_replace( $_LANGUAGE[$i][0], $_LANGUAGE[$i][1], $Linea );
foreach( $_LngPublic as $k=>$v ) $Linea = str_replace( $k, $v, $Linea );
$EsPHP = false;
}else if( preg_match("/^help /i", $Linea) || preg_match("/^help :/i", $Linea) || preg_match("/^help:/i", $Linea) ){
if( !$FuenteOk ) continue;
for( $i=0; $i<count($_LANGUAGE); $i++ ) $Linea = str_replace( $_LANGUAGE[$i][0], $_LANGUAGE[$i][1], $Linea );
foreach( $_LngPublic as $k=>$v ) $Linea = str_replace( $k, $v, $Linea );
$EsPHP = false;
}else if( preg_match("/^focus /i", $Linea) || preg_match("/^focus :/i", $Linea) || preg_match("/^focus:/i", $Linea) ){
if( !$FuenteOk ) continue;
$EsPHP = false;
}else if( preg_match("/^source /i", $Linea) || preg_match("/^source :/i", $Linea) || preg_match("/^source:/i", $Linea) ){
if( $FuenteYaOk ){
$FuenteOk = false;
continue;
}
$EsPHP = false;
$Linea = str_replace(' ','',$Linea);
if( preg_match("/^source:/i",$Linea) ){
$NmVar = trim(substr($Linea,7));
if( substr($NmVar,0,1)=='$' ){
$Linea = 'SOURCE:'.substr($Linea,7);
}else{
$Linea = 'SOURCE:,'.substr($Linea,7).',';
}
}else{
$NmVar = trim(substr($Linea,6));
if( substr($NmVar,0,1)=='$' ){
$Linea = 'SOURCE:'.substr($Linea,6);
}else{
$Linea = 'SOURCE:,'.substr($Linea,6).',';
}
}
if( substr($NmVar,0,1)=='$' ){
if( eval('return ('.$NmVar.');') ){
$FuenteOk = true;
$FuenteParticular = true;
$FuenteYaOk = true;
}else{
$FuenteOk = false;
}
}else if( substr_count( $Linea, ",{$_SOURCE}," ) > 0 ){
$FuenteOk = true;
$FuenteParticular = true;
}else{
$FuenteOk = false;
}
continue;
}else if( preg_match("/^elsesource /i", $Linea) || preg_match("/^elsesource :/i", $Linea) || preg_match("/^elsesource:/i", $Linea) ){
$EsPHP = false;
if( $FuenteParticular ){
$FuenteOk = false;
}else{
$FuenteOk = true;
}
continue;
}else if( preg_match("/^php/i", $Linea) || preg_match("/^php:/i", $Linea) || preg_match("/^php :/i", $Linea) ){
$EsPHP = true;
continue;
}else{
if( $EsPHP ){
for( $i=0; $i<count($_LANGUAGE); $i++ ) $Linea = str_replace( $_LANGUAGE[$i][0], $_LANGUAGE[$i][1], $Linea );
foreach( $_LngPublic as $k=>$v ) $Linea = str_replace( $k, $v, $Linea );
if( $ConRastroTrace ) eTrace( '..PHP...: ................... '.$Linea );
if( $ConRastroTron ) eTron( '..PHP...: ................... '.$Linea );
$FuentePHP .= $Linea."\n";
continue;
}else{
if( $ConRastroTrace ) eTrace('????????: '.$Linea );
if( $ConRastroTron ) eTron('????????: '.$Linea );
}
}
if( !$FuenteOk ) continue;
if( $ConRastroTrace ) eTrace('........: '.$Linea );
if( $ConRastroTron ) eTron('........: '.$Linea );
$Comando[] = $Linea;
}
if( $ConRastroTrace ) eTrace('[PHP] '.strlen($FuentePHP) );
if( $ConRastroTron ) eTron('[PHP] '.strlen($FuentePHP) );
if( $ConRastroTrace ){
eTrace('-------------- COMANDOS ----------------' );
for( $n=0; $n<count($Comando); $n++ ) eTrace('- '.$Comando[$n] );
eTrace('--------- Según registros ['.$TReg.'] ---------' );
}
if( $ConRastroTron ){
eTron('-------------- COMANDOS ----------------' );
for( $n=0; $n<count($Comando); $n++ ) eTron('- '.$Comando[$n] );
eTron('--------- Según registros ['.$TReg.'] ---------' );
}
$EjecutarDesde = 0;
$Linea = $Comando[0];
if( substr($Linea,-1)==')' && !isset($SelInfoWidthTab) ){
if( substr_count($Linea,'(')==1 && substr_count($Linea,')')==1 && substr($Linea,-1) == ')' && $FuentePHP!='' ){
$_TRACELABEL = '#';
$tmpFile = GrabaTmp( 'selinfo', $FuentePHP, $LenDoc, "", "__SelInfo__" );
include_once( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
__SelInfo__();
$TReg = _ExeEval( $Linea, 'SELINFO: "'.$_SOURCE.'" '.$Linea ).'';
if( $ConRastroTrace ) eTrace('--------- Nuevo valor ['.$TReg.'] ---------' );
if( $ConRastroTron ) eTron('--------- Nuevo valor ['.$TReg.'] ---------' );
$EjecutarDesde = 1;
}
}else if( $TReg==-1000 && $FuentePHP!='' ){
$_TRACELABEL = '#';
$tmpFile = GrabaTmp( 'selinfo', $FuentePHP, $LenDoc, "", "__SelInfo__" );
include_once( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
__SelInfo__();
$TReg = _ExeEval( $Linea, 'SELINFO: "'.$_SOURCE.'" '.$Linea ).'';
if( $ConRastroTrace ) eTrace('--------- Nuevo valor ['.$TReg.'] ---------' );
if( $ConRastroTron ) eTron('--------- Nuevo valor ['.$TReg.'] ---------' );
$EjecutarDesde = 1;
}
$RangoOk = true;
$RangoEXE = false;
if( $ConRastroTrace ) eTrace( 'REGISTROS: '.$TReg );
if( $ConRastroTron ) eTron( 'REGISTROS: '.$TReg );
$Ejecutar = array();
for( $n=$EjecutarDesde; $n<count($Comando); $n++ ){
$Linea = $Comando[$n];
if( preg_match("/^empty/i",$Linea) ){
if( $TReg == -2000 ){
$RangoOk = true;
$RangoEXE = true;
if( $ConRastroTrace ){
eTrace( 'empty' );
eTrace( '   SI' );
}
if( $ConRastroTron ){
eTron( 'empty' );
eTron( '   SI' );
}
}else{
$RangoOk = false;
}
continue;
}else if( preg_match("/^count/i", $Linea) ){
$oLinea = $Linea;
$Linea = preg_replace( '/count/i', $TReg, $Linea );
if( substr_count( $Linea, '=' ) == 1 ){
if( substr_count( $Linea, '!' ) == 0 && substr_count( $Linea, '<' ) == 0 && substr_count( $Linea, '>' ) == 0 ){
$Linea = str_replace('=','==',$Linea);
}
}
if( $ConRastroTrace ) eTrace( $Linea );
if( $ConRastroTron ) eTron( $Linea );
if( substr_count($Linea,'(')==1 && substr_count($Linea,')')==1 && substr($Linea,-1) == ')' && $FuentePHP!='' ){
if( !isset($SelInfoWidthTab) ){
$_TRACELABEL = '#';
$tmpFile = GrabaTmp( 'selinfo', $FuentePHP, $LenDoc, "", "__SelInfo__" );
include_once( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
__SelInfo__();
}
}
if( _ExeEval( $Linea, 'SELINFO: "'.$_SOURCE.'" '.$oLinea ) ){
if( $ConRastroTrace ) eTrace( '   SI: ['.$Linea. '] - SELINFO: "'.$_SOURCE.'" '.$oLinea  );
if( $ConRastroTron ) eTron( '   SI: ['.$Linea. '] - SELINFO: "'.$_SOURCE.'" '.$oLinea  );
if( $RangoEXE ){
$RangoOk = false;
}else{
$RangoOk = true;
$RangoEXE = true;
}
}else{
if( $ConRastroTrace ) eTrace( '   NO' );
if( $ConRastroTron ) eTron( '   NO' );
$RangoOk = false;
}
continue;
}
if( !$RangoOk ) continue;
$Ejecutar[] = $Linea;
}
if( $ConRastroTrace ){
eTrace('------------ COMANDOS REALES-------------' );
for( $n=0; $n<count($Ejecutar); $n++ ) eTrace(' > '.$Ejecutar[$n] );
eTrace('-----------------------------------------' );
}
if( $ConRastroTron ){
eTron('------------ COMANDOS REALES-------------' );
for( $n=0; $n<count($Ejecutar); $n++ ) eTron(' > '.$Ejecutar[$n] );
eTron('-----------------------------------------' );
}
eHTML('$selinfo.gs');
_FileNoCache('edes.js');
echo '</HEAD><BODY>'."\n";
if( !$ConRastroTrace ) echo '<SCRIPT type="text/javascript">'."\n";
if( $ConRastroTrace ) eTrace('  TRegistros: '.$TReg );
if( $ConRastroTron ) eTron('  TRegistros: '.$TReg );
for( $n=0; $n<count($Ejecutar); $n++ ){
$Linea = $Ejecutar[$n];
if( preg_match("/^select/i",$Linea) ){
if( $ConRastroTrace ) eTrace(' - '.$Linea );
if( $ConRastroTron ) eTron(' - '.$Linea );
}else{
if( $ConRastroTrace ) eTrace('> '.$Linea );
if( $ConRastroTron ) eTron('> '.$Linea );
if( preg_match("/^put /i", $Linea) || preg_match("/^put :/i", $Linea) || preg_match("/^put:/i", $Linea) ){
$Linea = trim(substr($Linea,3));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
CalcVariables( $Linea );
$Linea = trim($Linea);
$Dim = array();
$txt = '';
$Rastro = false;
$EsCadena = false;
$DentroParentesis = false;
$ChrCadena = '';
if( $Rastro ) eTrace( '--- Desgrana elementos ---');
for( $nc=0; $nc<strlen($Linea); $nc++ ){
$c = substr($Linea,$nc,1);
switch( $c ){
case '"':
if( $EsCadena ){
if( $ChrCadena == '"' ) $EsCadena = false;
}else{
$EsCadena = true;
$ChrCadena = '"';
}
$txt .= $c;
break;
case "'":
if( $EsCadena ){
if( $ChrCadena == "'" ) $EsCadena = false;
}else{
$EsCadena = true;
$ChrCadena = "'";
}
$txt .= $c;
break;
case '(':
if( !$EsCadena ) $DentroParentesis = true;
$txt .= $c;
break;
case ')':
$txt .= $c;
if( !$EsCadena ) $DentroParentesis = false;
break;
case '.':
case ',':
if( $DentroParentesis || $EsCadena ){
$txt .= $c;
}else{
$txt = trim($txt);
$Dim[] = array('',$txt,'');	if( $Rastro ) eTrace( '1: '.$txt );
$txt = '';
$Dim[] = array('',$c,'');		if( $Rastro ) eTrace( '2: '.$c );
}
break;
case '=':
if( $EsCadena ){
$txt .= $c;
}else{
$txt = trim($txt);
$Dim[] = array('',$txt,'');	if( $Rastro ) eTrace( $txt );
$txt = '';
$Dim[] = array('',$c,'');		if( $Rastro ) eTrace( $c );
}
break;
default:
$txt .= $c;
}
}
$txt = trim($txt);
$Dim[] = array('',$txt,'');	if( $Rastro ) eTrace( $txt );
if( $Rastro ) eTrace('--- Datos a CALCULAR ---');
$Destino = '';
$Origen = '';
if( $ConRastroTrace ) eTrace( '1:================= oCampo: '.$oCampo );
if( $ConRastroTron ) eTron( '1:================= oCampo: '.$oCampo );
for( $nc=0; $nc<count($Dim); $nc++ ){
switch( $Dim[$nc][1] ){
case '.':
case '=';
case ',';
$Dim[$nc][0] = $Dim[$nc][1];
break;
default:
if( $Dim[$nc][1][0]=='"' || $Dim[$nc][1][0]=="'" ){
$Dim[$nc][0] = 'C';
$Dim[$nc][2] = substr($Dim[$nc][1],1,-1);
}else{
if( $Rastro ) eTrace( $Dim[$nc][1] );
$Dim[$nc][0] = 'X';
$Dim[$nc][1] = str_replace( 'substr (', 'substr(', $Dim[$nc][1] );
$oCampo = $Dim[$nc][1];
if( $ConRastroTrace ) eTrace( '2:================= oCampo: '.$oCampo );
if( $ConRastroTron ) eTron( '2:================= oCampo: '.$oCampo );
if( substr( $Dim[$nc][1],0,7 ) == 'substr(' ){
$oCampo = str_replace( '(', ',', $oCampo );
$txt = '';
$DimCampo = explode( '.', $oCampo );
for( $p=0; $p<count($DimCampo); $p++ ){
$oCampo = $DimCampo[$p];
list( , $oCampo, $Desde, $Hasta ) = explode( ',', $oCampo );
$oCampo = trim($oCampo);
if( $Hasta=='' ){
$txt .= eQuote(substr($_vF[$oCampo],$Desde));
}else{
$txt .= eQuote(substr($_vF[$oCampo],$Desde,$Hasta));
}
}
if( $ConRastroTrace ) eTrace( '25:================= oCampo: '.$oCampo );
if( $ConRastroTron ) eTron( '25:================= oCampo: '.$oCampo );
}else{
if( substr_count($oCampo, "||")>0 ){
if( $ConRastroTrace ) eTrace( '3a:================= oCampo: '.$oCampo );
if( $ConRastroTron ) eTron( '3a:================= oCampo: '.$oCampo );
$txt = "";
$tmp3 = explode("||", $oCampo);
for($p=0; $p<count($tmp3); $p++){
$tmp3[$p] = trim($tmp3[$p]);
if( $ConRastroTrace ) eTrace( '3b:================= oCmp: '.$tmp3[$p] );
if( $ConRastroTron ) eTron( '3b:================= oCmp: '.$tmp3[$p] );
if( trim($_vF[$tmp3[$p]])!="" ){
$txt = eQuote($_vF[$tmp3[$p]]);
break;
}
}
}else{
$txt = eQuote($_vF[$oCampo]);
}
}
$Dim[$nc][2] = $txt;
}
}
}
if( $ConRastroTrace ) eTrace( '3:================= oCampo: '.$oCampo );
if( $ConRastroTron ) eTron( '3:================= oCampo: '.$oCampo );
for( $nc=count($Dim)-1; $nc>=0; $nc-- ){
if( $Dim[$nc][0]=='.' ){
$Dim[$nc-1][2] = $Dim[$nc-1][2] . $Dim[$nc+1][2];
$Dim[$nc]   = array('','','');
$Dim[$nc+1] = array('','','');
}
}
$NewDim = array();
for( $nc=0; $nc<count($Dim); $nc++ ) if( $Dim[$nc][0]!='' ) $NewDim[] = $Dim[$nc];
for( $nc=0; $nc<count($NewDim); $nc++ ) if( $NewDim[$nc][0]=='=' ) $NewDim[$nc-1][2] = '';
if( $ConRastroTrace ){
echo '<table border=1px cellspacing=0px cellPadding=2px>';
for( $nc=0; $nc<count($NewDim); $nc++ ){
echo '<tr>';
echo '<td>'.$NewDim[$nc][0].'&nbsp;';
echo '<td>'.$NewDim[$nc][1].'&nbsp;';
echo '<td>'.$NewDim[$nc][2].'&nbsp;';
echo '<td>'.$_vF[$NewDim[$nc][1]].'&nbsp;';
}
echo '</table>';
}
if( $ConRastroTron ){
eTron('===========================');
for( $nc=0; $nc<count($NewDim); $nc++ ){
eTron('1: '.$NewDim[$nc][0] );
eTron('2: '.$NewDim[$nc][1] );
eTron('3: '.$NewDim[$nc][2] );
eTron('4: '.$_vF[$NewDim[$nc][1]] );
}
eTron('===========================');
}
for( $nc=0; $nc<count($NewDim); $nc++ ){
if( $NewDim[$nc][0] == 'X' ){
$dCampo = trim($NewDim[$nc][1]);
if( $ConRastroTrace ) eTrace( 'oCampo: '.$oCampo.' - dCampo: '.$dCampo );
if( $ConRastroTron ) eTron( 'oCampo: '.$oCampo.' - dCampo: '.$dCampo );
if( $NewDim[$nc][2]=='' ){
if( $Rastro ) eTrace( $NewDim[$nc][1] .' = '.$NewDim[$nc+2][2] );
$txt = eQuote($NewDim[$nc+2][2]);
$nc+=3;
}else{
if( $Rastro ) eTrace( $NewDim[$nc][1] .' = '.$NewDim[$nc][2]. ' ( '.$oCampo.' )' );
$txt = eQuote($_vF[$oCampo]);
if( $ConRastroTrace ) eTrace( '_vF = '.$_vF[$oCampo]. ' ( '.$oCampo. ')' );
if( $ConRastroTron ) eTron( '_vF = '.$_vF[$oCampo]. ' ( '.$oCampo. ')' );
$nc++;
}
if( $ConRastroTron ) eTron( '= ePPF("'.$dCampo.'","'.$txt.'",false);' );
if( $ConRastroTrace ){
eTrace( '= ePPF("'.$dCampo.'","'.$txt.'",false);' );
}else{
echo 'ePPF("'.$dCampo.'","'.$txt.'",false);'."\n";
}
}
}
if( $ConRastroTrace ){
}else{
}
}else if( preg_match("/^clear /i", $Linea) || preg_match("/^clear :/i", $Linea) || preg_match("/^clear:/i", $Linea) ){
$Linea = trim(substr($Linea,5));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
$Dim = explode(',',$Linea);
for( $i=0; $i<count($Dim); $i++ ){
$dCampo = trim($Dim[$i] );
if( $ConRastroTron ) eTron( 'ePPF("'.$dCampo.'","",false);' );
if( $ConRastroTrace ){
eTrace( 'ePPF("'.$dCampo.'","",false);' );
}else{
echo 'ePPF("'.$dCampo.'","",false);'."\n";
}
}
if( $ConRastroTrace ){
}else{
}
}else if( preg_match("/^EditField /i", $Linea) || preg_match("/^EditField :/i", $Linea) || preg_match("/^EditField:/i", $Linea) ){
$Linea = trim(substr($Linea,9));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
$Dim = explode(',',$Linea);
for( $i=0; $i<count($Dim); $i++ ){
$dCampo = trim($Dim[$i] );
if( $ConRastroTron ) eTron( '_WOPENER.eEF("'.$dCampo.'",true);' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eEF("'.$dCampo.'",true);' );
}else{
echo '_WOPENER.eEF("'.$dCampo.'",true);'."\n";
}
}
}else if( preg_match("/^NoEditField /i", $Linea) || preg_match("/^NoEditField :/i", $Linea) || preg_match("/^NoEditField:/i", $Linea) ){
$Linea = trim(substr($Linea,11));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
$Dim = explode(',',$Linea);
for( $i=0; $i<count($Dim); $i++ ){
$dCampo = trim($Dim[$i] );
if( $ConRastroTron ) eTron( '_WOPENER.eEF("'.$dCampo.'",false);' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eEF("'.$dCampo.'",false);' );
}else{
echo '_WOPENER.eEF("'.$dCampo.'",false);'."\n";
}
}
}else if( preg_match("/^list /i", $Linea) || preg_match("/^list :/i", $Linea) || preg_match("/^list:/i", $Linea) ){
$Linea = trim(substr($Linea,4));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
CalcVariables($Linea);
if( $ConRastroTron ) eTron('top.eSWOpen( _WOPENER, "edes.php?Ll:'.$Linea.', "Listado de selección");');
if( $ConRastroTrace ){
eTrace('top.eSWOpen( _WOPENER, "edes.php?Ll:'.$Linea.', "Listado de selección");');
}else{
list( $script, $filtro ) = explode('_FILTER',$Linea);
$script = trim($script);
$filtro = trim($filtro);
list( $filtro, $asignar ) = explode('_ASSIGN',$filtro);
$filtro = trim($filtro);
$asignar = str_replace('+','.',trim($asignar));
$asignar = str_replace('"',"'",$asignar);
if( substr($script,-1)=='&' ) $script = substr($script,0,-1);
if( substr($script,-1)=='?' ) $script = substr($script,0,-1).'&';
if( $filtro[0]=='=' ) $filtro = substr($filtro,1);
if( substr($filtro,-1)=='&' ) $filtro = substr($filtro,0,-1);
if( $asignar[0]=='=' ) $asignar = substr($asignar,1);
$asignar = str_replace(';',',',$asignar);
if( $_Focus != '' ) echo "_WOPENER._FocusLast = '{$_Focus};'";
?>
top.eSWOpen(_WOPENER, "edes.php?Ll:<?=$script?>&_FILTER="+escape("<?=eQuote($filtro)?>")+"&_CAMPO_=&_SEL_="+escape(";<?=$asignar?>")+"&_PSOURCE=<?=$_GET["_SOURCE"]?>&_AUX_=C&_NOEVENT=1", "Listado de selección");
<?PHP
}
}else if( preg_match("/^tab /i", $Linea) || preg_match("/^tab :/i", $Linea) || preg_match("/^tab:/i", $Linea) ){
$Linea = trim(substr($Linea,3));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
CalcVariables($Linea);
if( $ConRastroTron ){
if( substr_count($Linea, '.gdf')==1 ){
eTron('top.eSWOpen(_WOPENER, "edes.php?Gc:'.$Linea.'", "Aplique más filtros" );');
}else{
eTron('top.eSWOpen(_WOPENER, "edes.php?Fc:'.$Linea.'", "Aplique más filtros" );');
}
}
if( $ConRastroTrace ){
if( substr_count( $Linea, '.gdf' )==1 ){
eTrace('top.eSWOpen(_WOPENER, "edes.php?Gc:'.$Linea.'", "Aplique más filtros");');
}else{
eTrace('top.eSWOpen(_WOPENER, "edes.php?Fc:'.$Linea.'", "Aplique más filtros");');
}
}else{
if( substr_count($Linea, '_FILTER=')>0 ){
list($script, $filtro) = explode('_FILTER',$Linea);
$filtro = trim($filtro);
list($filtro, $asignar) = explode('_ASSIGN',$filtro);
$filtro = trim($filtro);
}else{
list( $script, $asignar ) = explode('_ASSIGN',$Linea);
}
$script = trim($script);
$asignar = str_replace('+','.',trim($asignar));
$asignar = str_replace('"',"'",$asignar);
if( substr($script,-1)=='&' ) $script = substr($script,0,-1);
if( substr($script,-1)=='?' ) $script = substr($script,0,-1).'&';
if( $filtro[0]=='=' ) $filtro = substr($filtro,1);
if( substr($filtro,-1)=='&' ) $filtro = substr($filtro,0,-1);
if( $asignar[0]=='=' ) $asignar = substr($asignar,1);
$asignar = str_replace(';',',',$asignar);
if( $_Focus != '' ) echo "_WOPENER._FocusLast = '{$_Focus};'";
if( substr_count( $Linea, '.gdf' )==1 ){
?>
top.eSWOpen(_WOPENER, "edes.php?Gc:<?=$script?>&_ASSIGN=c&<?=eQuote($filtro)?>" + "&_CAMPO_=&_SEL_=" + escape(";<?=$asignar?>") + "&_PSOURCE=<?=$_GET["_SOURCE"]?>&_AUX_=C&_NOEVENT=1", "Aplique más filtros");
<?PHP
}else{
?>
top.eSWOpen(_WOPENER, "edes.php?Fc:<?=$script?>&_ASSIGN=c&<?=eQuote($filtro)?>" + "&_CAMPO_=&_SEL_=" + escape(";<?=$asignar?>") + "&_PSOURCE=<?=$_GET["_SOURCE"]?>&_AUX_=C&_NOEVENT=1", "Aplique más filtros");
<?PHP
}
}
}else if( preg_match("/^message /i", $Linea) || preg_match("/^message :/i", $Linea) || preg_match("/^message:/i", $Linea) ){
$Linea = trim(substr($Linea,7));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
CalcVariables( $Linea );
if( $ConRastroTron ) eTron( 'top.eAlert(S.lng(209),"'.eQuote($Linea).'","A","W");' );
if( $ConRastroTrace ){
eTrace( 'top.eAlert(S.lng(209),"'.eQuote($Linea).'","A","W");' );
}else{
echo 'top.eAlert(S.lng(209),"'.eQuote($Linea).'","A","W");'."\n";
}
}else if( preg_match("/^help /i", $Linea) || preg_match("/^help :/i", $Linea) || preg_match("/^help:/i", $Linea) ){
$Linea = trim(substr($Linea,4));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
CalcVariables( $Linea );
if( $ConRastroTron ) eTron( 'top.eInfo(_WOPENER,"'.eQuote($Linea).'");' );
if( $ConRastroTrace ){
eTrace( 'top.eInfo(_WOPENER,"'.eQuote($Linea).'");' );
}else{
echo 'top.eInfo(_WOPENER,"'.eQuote($Linea).'");'."\n";
}
}else if( preg_match("/^focus /i", $Linea) || preg_match("/^focus :/i", $Linea) || preg_match("/^focus:/i", $Linea) ){
$Linea = trim(substr($Linea,5));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
$_Focus = $Linea;
if( $ConRastroTron ) eTron( '_WOPENER.eFocus("'.$Linea.'");' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eFocus("'.$Linea.'");' );
}else{
echo '_WOPENER.eFocus("'.$Linea.'");'."\n";
}
}else if( preg_match("/^function :/i", $Linea) || preg_match("/^function:/i", $Linea) ){
$Linea = trim(substr($Linea,8));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
CalcVariables( $Linea );
if( $ConRastroTron ) eTron( '_WOPENER.eval("'.eQuote($Linea).'");' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eval("'.eQuote($Linea).'");' );
}else{
echo '_WOPENER.eval("'.eQuote($Linea).'");'."\n";
}
}else if( preg_match("/^ShowTab /i", $Linea) || preg_match("/^ShowTab :/i", $Linea) || preg_match("/^ShowTab:/", $Linea) ){
$Linea = trim(substr($Linea,7));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
if( $ConRastroTron ) eTron( '_WOPENER.eTabShow("'.$Linea.'",true);' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eTabShow("'.$Linea.'",true);' );
}else{
echo '_WOPENER.eTabShow("'.$Linea.'",true);'."\n";
}
}else if( preg_match("/^HideTab /i", $Linea) || preg_match("/^HideTab :/i", $Linea) || preg_match("/^HideTab:/i", $Linea) ){
$Linea = trim(substr($Linea,7));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
if( $ConRastroTron ) eTron( '_WOPENER.eTabShow("'.$Linea.'",false);' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eTabShow("'.$Linea.'",false);' );
}else{
echo '_WOPENER.eTabShow("'.$Linea.'",false);'."\n";
}
}else if( preg_match("/^HideTR /i", $Linea) || preg_match("/^HideTR :/i", $Linea) || preg_match("/^HideTR:/i", $Linea) ){
$Linea = trim(substr($Linea,6));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
$Dim = explode(',',$Linea);
for( $i=0; $i<count($Dim); $i++ ){
$dCampo = trim($Dim[$i] );
if( $ConRastroTron ) eTron( '_WOPENER.eHide("'.$dCampo.'","TR");' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eHide("'.$dCampo.'","TR");' );
}else{
echo '_WOPENER.eHide("'.$dCampo.'","TR");'."\n";
}
}
}else if( preg_match("/^ShowTR /i", $Linea) || preg_match("/^ShowTR :/i", $Linea) || preg_match("/^ShowTR:/i", $Linea) ){
$Linea = trim(substr($Linea,6));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
$Dim = explode(',',$Linea);
for( $i=0; $i<count($Dim); $i++ ){
$dCampo = trim($Dim[$i] );
if( $ConRastroTron ) eTron( '_WOPENER.eShow("'.$dCampo.'","TR");' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eShow("'.$dCampo.'","TR");' );
}else{
echo '_WOPENER.eShow("'.$dCampo.'","TR");'."\n";
}
}
}else if( preg_match("/^HideFields /i", $Linea) || preg_match("/^HideFields :/i", $Linea) || preg_match("/^HideFields:/i", $Linea) ){
$Linea = trim(substr($Linea,10));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
$Dim = explode(',',$Linea);
for( $i=0; $i<count($Dim); $i++ ){
$dCampo = trim($Dim[$i] );
if( $ConRastroTron ) eTron( '_WOPENER.eHide("'.$dCampo.'");' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eHide("'.$dCampo.'");' );
}else{
echo '_WOPENER.eHide("'.$dCampo.'");'."\n";
}
}
}else if( preg_match("/^ShowFields /i", $Linea) || preg_match("/^ShowFields :/i", $Linea) || preg_match("/^ShowFields:/i", $Linea) ){
$Linea = trim(substr($Linea,10));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
$Dim = explode(',',$Linea);
for( $i=0; $i<count($Dim); $i++ ){
$dCampo = trim($Dim[$i] );
if( $ConRastroTron ) eTron( '_WOPENER.eShow("'.$dCampo.'");' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eShow("'.$dCampo.'");' );
}else{
echo '_WOPENER.eShow("'.$dCampo.'");'."\n";
}
}
}else if( preg_match("/^ShowGrpTR /i", $Linea) || preg_match("/^ShowGrpTR :/i", $Linea) || preg_match("/^ShowGrpTR:/i", $Linea) ){
$Linea = trim(substr($Linea,9));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
$Dim = explode(',',$Linea);
for( $i=0; $i<count($Dim); $i++ ){
$dCampo = trim($Dim[$i] );
if( $ConRastroTron ) eTron( '_WOPENER.eShowGroup("'.$dCampo.'",0,1);' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eShowGroup("'.$dCampo.'",0,1);' );
}else{
echo '_WOPENER.eShowGroup("'.$dCampo.'",0,1);'."\n";
}
}
}else if( preg_match("/^HideGrpTR /i", $Linea) || preg_match("/^HideGrpTR :/i", $Linea) || preg_match("/^HideGrpTR:/i", $Linea) ){
$Linea = trim(substr($Linea,9));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
$Dim = explode(',',$Linea);
for( $i=0; $i<count($Dim); $i++ ){
$dCampo = trim($Dim[$i] );
if( $ConRastroTron ) eTron( '_WOPENER.eShowGroup("'.$dCampo.'",0,0);' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eShowGroup("'.$dCampo.'",0,0);' );
}else{
echo '_WOPENER.eShowGroup("'.$dCampo.'",0,0);'."\n";
}
}
}else if( preg_match("/^ShowGrpTR- /i", $Linea) || preg_match("/^ShowGrpTR- :/i", $Linea) || preg_match("/^ShowGrpTR-:/i", $Linea) ){
$Linea = trim(substr($Linea,10));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
$Dim = explode(',',$Linea);
for( $i=0; $i<count($Dim); $i++ ){
$dCampo = trim($Dim[$i] );
if( $ConRastroTron ) eTron( '_WOPENER.eShowGroup("'.$dCampo.'",1,1);' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eShowGroup("'.$dCampo.'",1,1);' );
}else{
echo '_WOPENER.eShowGroup("'.$dCampo.'",1,1);'."\n";
}
}
}else if( preg_match("/^HideGrpTR- /i", $Linea) || preg_match("/^HideGrpTR- :/i", $Linea) || preg_match("/^HideGrpTR-:/i", $Linea) ){
$Linea = trim(substr($Linea,10));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
$Dim = explode(',',$Linea);
for( $i=0; $i<count($Dim); $i++ ){
$dCampo = trim($Dim[$i] );
if( $ConRastroTron ) eTron( '_WOPENER.eShowGroup("'.$dCampo.'",1,0);' );
if( $ConRastroTrace ){
eTrace( '_WOPENER.eShowGroup("'.$dCampo.'",1,0);' );
}else{
echo '_WOPENER.eShowGroup("'.$dCampo.'",1,0);'."\n";
}
}
}else if( preg_match("/^onchange /i", $Linea) || preg_match("/^onchange:/i", $Linea) || preg_match("/^onchange :/i", $Linea) ){
$Linea = trim(substr($Linea,10));
if( $Linea[0]==':' ) $Linea = trim(substr($Linea,1));
$Dim = explode(',',$Linea);
for( $i=0; $i<count($Dim); $i++ ){
$dCampo = trim($Dim[$i] );
if( $ConRastroTron ) eTron( 'onchange: '.$dCampo );
if( $ConRastroTrace ){
eTrace( 'onchange: '.$dCampo );
}else{
$_DimOnChange[] = $dCampo;
}
}
}
}
}
if( count($_DimOnChange)>0 ){
echo 'var Obj;';
for($n=0; $n<count($_DimOnChange); $n++){
echo "Obj = _WOPENER.DGI('{$_DimOnChange[$n]}');";
echo 'if( Obj.onchange!=null ) S(Obj).eventChange();';
}
}
if( $_GET["_FOCUS"]!="" ) echo "_WOPENER.S(':".$_GET["_FOCUS"]."').css('backgroundColor:');";
if( !$ConRastroTrace ) echo '</SCRIPT>';
echo '</BODY></HTML>';
if( $ConRastroTrace ){
eTrace('--------------------------------');
echo $_SERVER['QUERY_STRING'];
echo '<pre>'; print_r($_vF); echo '</pre>';
eTrace('------------- FIN --------------');
}
if( $ConRastroTron ){
eTron('--------------------------------');
eTron( $_SERVER['QUERY_STRING'] );
eTron('------------- FIN --------------');
}
eEnd();
function CalcVariables( &$Linea ){
while( substr_count($Linea,'{$') > 0 && substr_count($Linea,'}') > 0 ){
$p = strpos( $Linea, '{$' );
$tmp = substr($Linea,$p,strpos($Linea, '}')-$p+1);
$Variable = substr($tmp,2,-1);
if( substr($Variable,-1)==']' ){
list($Variable,$Indice) = explode('[',$Variable);
list($Indice) = explode(']',$Indice);
$Indice = trim($Indice);
$Comillas = '';
if( $Indice[0]=="'" || $Indice[0]=='"' ){
$Indice = substr($Indice,1,-1);
}
if( $Indice=='' ) $Indice = 0;
$Linea = str_replace( $tmp, $Comillas.$GLOBALS[ $Variable ][$Indice].$Comillas, $Linea );
}else{
$Linea = str_replace( $tmp, $GLOBALS[ $Variable ], $Linea );
}
}
$Linea = str_replace('\n','<br>',$Linea);
}
?>
