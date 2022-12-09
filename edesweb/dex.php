<?PHP
define('_ERROR_REPORTING', 5);
error_reporting(_ERROR_REPORTING);
ini_set("display_errors", 1);
define('_TRACK_ERRORS', false);
ini_set('track_errors', false);
date_default_timezone_set(isset($_SESSION["_TimeZone"])? $_SESSION["_TimeZone"]:'Europe/Madrid');
ini_set('date.timezone', isset($_SESSION["_TimeZone"])? $_SESSION["_TimeZone"]:'Europe/Madrid');
ini_set('default_charset', isset($_SESSION["_Charset"])? $_SESSION["_Charset"]:"ISO-8859-1");
session_start();
$Dir_ = "../../edesweb/";
$tmpFile = '../_datos/config/sql.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval(_LoadSqlIni($tmpFile));
include($Dir_.$_Sql.'.inc');
_ShowError($php_errormsg, $tmpFile);
$_SESSION['_eDes_'] = 1;
if( $_SESSION['_eDes_']==1 ) $_SESSION['_iSql'] = $_Sql;
qConnectSystem();
_SaveSession(true);
$_URLDirecta = "edes.php?".$_SERVER["QUERY_STRING"];
if( !function_exists("_utf8Encode") ){
function _utf8Encode(&$a=null, &$b=null, &$c=null, &$d=null, &$e=null, &$f=null, &$g=null, &$h=null, &$i=null){
if($a!=null) $a = utf8_encode($a);
if($b!=null) $b = utf8_encode($b);
if($c!=null) $c = utf8_encode($c);
if($d!=null) $d = utf8_encode($d);
if($e!=null) $e = utf8_encode($e);
if($f!=null) $f = utf8_encode($f);
if($g!=null) $g = utf8_encode($g);
if($h!=null) $h = utf8_encode($h);
if($i!=null) $i = utf8_encode($i);
}
}
function eEntityEncode($v, $enter=true){
if( $enter ){
return str_replace(
array(  '"'  ,   "'"  ,   '<'  ,   '>'  , chr(92), chr(13), chr(10), chr(0)),
array('&#34;', '&#39;', '&#60;', '&#62;',  '&#92;', '&#13;', '&#10;',   '' ),
$v
);
}else{
return str_replace(
array(  '"'  ,   "'"  ,   '<'  ,   '>'  , chr(92) ),
array('&#34;', '&#39;', '&#60;', '&#62;',  '&#92;'),
$v
);
}
}
function eEntityDecode($v, $enter=true){
if( $enter ){
return str_replace(
array('&#34;', '&#39;', '&#60;', '&#62;',  '&#92;', chr(13), chr(10) ),
array(  '"'  ,   "'"  ,   '<'  ,   '>'  , chr(92),   '&#13;', '&#10;'),
$v
);
}else{
return str_replace(
array('&#34;', '&#39;', '&#60;', '&#62;',  '&#92;'),
array(  '"'  ,   "'"  ,   '<'  ,   '>'  , chr(92) ),
$v
);
}
}
if( !function_exists("qErrorFile") ){
function qErrorFile($TxtError, $sql, &$pkError=""){
global $_HndDB, $_HndDBSystem;
if( $_SESSION["_D_"]=="" ) $pkError = rand(1000,9999);
$LogTxt = date('Y-m-d H:i:s')."\r\n".
"\tUSER...: ".$_SESSION["_User"]."\r\n".
(($_SESSION["_D_"]=="")? "\tPK.....: ".$pkError."\r\n":"").
"\tURL....: ".$_SERVER['REQUEST_URI']."\r\n".
"\tSQL....: ".$sql."\r\n".
"\tERROR..: ".$TxtError."\r\n";
$DimNomVar = array_keys($_POST); $DimValor = array_values($_POST);
$MasInfo = "\tPOST...: "."\r\n";
for($n=0; $n<count($DimNomVar); $n++) $MasInfo .= "\t\t ".$DimNomVar[$n].' = '.$DimValor[$n]."\r\n";
$DimNomVar = array_keys($_GET); $DimValor = array_values($_GET);
$MasInfo .= "\tGET....: "."\r\n";
for($n=0; $n<count($DimNomVar); $n++) $MasInfo .= "\t\t ".$DimNomVar[$n].' = '.$DimValor[$n]."\r\n";
error_log($LogTxt.$MasInfo."\n", 3, '../_tmp/err/_log.err');
error_log($LogTxt, 3, '../_tmp/err/_log_short.err');
if( $_HndDB ){
sql_TranBack();
sql_TranOn();
}
if( $_HndDBSystem ){
$_HndDBSystem->qTranBack();
$_HndDBSystem->qTranOn();
}
}
}
$_DesktopWepe = false;
$_DesktopWepe = true;
define('_ERROR_REPORTING', 5);
error_reporting(_ERROR_REPORTING);
ini_set("display_errors",1);
global $Dir_, $_LanguageTron, $__Lng, $_Lng, $_LngPublic;
$Dir_ = dirname(__FILE__).'/';
$_LanguageTron = '';
$__Lng = array('');
$_Lng = array();
$_LngPublic = array();
$_SESSION['_eDes_'] = 1;
function eNsp($v){
return trim(str_replace(" ","",$v));
}
function eContextPut($script, $PKSeek="", $ConPost=true){
if( !$_SESSION['CONTEXTON'] ) return;
if(substr($script,-2)=="()" || substr($script,-3)=="();" ) return;
global $Dir_, $_Sql, $_HndDBSystem, $_ContextReadOnly, $_ContextFieldsMD5, $_DBRANGEADD, $_DBSERIAL;
if( $_SESSION['_eDes_']==1 ) $_SESSION['_iSql'] = $_Sql;
$dim = array();
foreach($_ContextFieldsMD5 as $k=>$v) $dim[]=$k;
foreach($_DBRANGEADD as $k=>$v) $dim[]=$k;
$dim = array_unique($dim, SORT_STRING);
sort($dim);
$_ContextFieldsMD5 = implode(";",$dim);
$md5fields = ( $_ContextFieldsMD5<>"" ? md5($_ContextFieldsMD5) : "");
if( isset($_DBSERIAL) ) $FieldGet = $_DBSERIAL[1];
if(substr($script,0,9)=="edes.php?") $script = substr($script,9);
list($script) = explode("&",$script);
$script = str_replace(["'",'"'], ["&#39;","&#34;"], $script);
if( (substr($script,2,1)==":" || substr($script,3,1)==":") && substr_count($script,'.')==0 ){
if( $script[0]=="G" ) $script .= ".gdf";
else $script .= ".edf";
}
$_HndDBSystem->qQuery("insert into gs_context
(		   cd_gs_conexion   ,			  context  ,    script  ,   pk_seek  ,     fields_readonly  ,   md5_fields ,     field_get ) values
({$_SESSION['_Connection_']}, {$_SESSION['_eDes_']}, '{$script}', '{$PKSeek}', '{$_ContextReadOnly}', '{$md5fields}', '{$FieldGet}')");
}
function _genContext(){
if( !$_SESSION['CONTEXTON'] ) return;
global $_vF, $_ADDCODE, $_ADDBUTTON, $_ONCHANGE;
$DimCheck = array();
for($n=0; $n<count($_ADDBUTTON); $n++) $DimCheck[] = $_ADDBUTTON[$n][2];
for($n=0; $n<count($_ONCHANGE); $n++ ) $DimCheck[] = $_ONCHANGE[$n][1];
foreach($_ADDCODE as $k=>$v) foreach($v as $k2=>$v2) $DimCheck[] = $v2;
$Dim = ['_JSHEAD', '_JSINI', '_JSEND', '_JSSELROW', '_JSONCLICKROW', '_PHPINI', '_PHPEND', '_ONCHANGE'];
for($i=0; $i<count($Dim); $i++){
$pk = trim($Dim[$i]);
$dim = explode("\n",$GLOBALS[$pk]);
for($n=0; $n<count($dim); $n++ ){
$txt = $dim[$n];
if( substr_count($txt,'top.eSWOpen(')>0 || substr_count($txt,'eCallSrv(')>0 || substr_count($txt,'location.href')>0 || substr_count($txt,'location.replace(') || substr_count($txt,'eUrl(') ){
$DimCheck[] = $txt;
}
}
while( substr_count($GLOBALS[$pk],'location.href')>0 ){
$txt = $GLOBALS[$pk];
$i = strpos($txt,'location.href');
$i2 = strpos($txt,'=',$i)+1;
$f = strpos($txt,';',$i);
$GLOBALS[$pk] = substr($txt,0,$i)."eUrl(".trim(substr($txt, $i2, $f-$i2)).")".substr($txt,$f);
}
$GLOBALS[$pk] = str_replace(
["location.replace", "eIWorkLocation("],
["eUrl"			   , "eUrl("],
$GLOBALS[$pk]
);
}
$DimInsert = array();
for($n=0; $n<count($DimCheck); $n++ ){
$txt = trim($DimCheck[$n]);
$func = "";
if( substr_count($txt,'top.eSWOpen(')>0 ){
$txt = _SustituyeGF($txt);
$txt = substr($txt,strpos($txt,'top.eSWOpen('));
$txt = trim(substr($txt,strpos($txt,",")+1));
$pComilla = strpos(substr($txt,1),$txt[0]);
$pParentesis = strpos(substr($txt,1),")");
if($pParentesis>0 && ($pComilla==0 || $pParentesis<$pComilla) ) $pComilla = $pParentesis;
$func = substr($txt,1, $pComilla);
}else if( substr_count($txt,'eCallSrv(')>0 ){
$txt = _SustituyeGF($txt);
$txt = substr($txt,strpos($txt,'eCallSrv('));
$txt = trim(substr($txt,strpos($txt,",")+1));
$pComilla = strpos(substr($txt,1),$txt[0]);
$pParentesis = strpos(substr($txt,1),")");
if($pParentesis>0 && ($pComilla==0 || $pParentesis<$pComilla) ) $pComilla = $pParentesis;
$func = substr($txt,1, $pComilla);
if( substr_count($func,".php")==1 && substr_count($func,"edes.php")==0 && substr($func,0,2)<>"E:" ) $func = "E:".$func;
}else if( substr_count($txt,'location.href')>0 ){
$p = strpos($txt,'location.href');
$p = strpos($txt,"=",$p)+1;
$Comilla = trim(substr($txt,$p))[0];
$ini = strpos($txt,$Comilla,$p)+1;
$fin = strpos($txt,$Comilla,$ini);
$func = substr($txt, $ini, $fin-$ini);
}else if( substr_count($txt,'location.replace(')>0 || substr_count($txt,'eUrl(')>0 ){
if( substr_count($txt,'location.replace(')>0 ){
$p = strpos($txt,'location.replace(');
}else{
$p = strpos($txt,'eUrl(');
}
$p = strpos($txt,"(",$p)+1;
$Comilla = trim(substr($txt,$p))[0];
$ini = strpos($txt,$Comilla,$p)+1;
$fin = strpos($txt,$Comilla,$ini);
$func = substr($txt, $ini, $fin-$ini);
}
if( $func<>"" && $DimInsert[$func]=="" ){
if( $func=="edes.php?" ){
if( $_SESSION['_D_']!='' ) eTron('>>>>ERROR CALCULO>>> ['.trim($DimCheck[$n]).']['.$func.']');
continue;
}
eContextFile( $func );
$DimInsert[$func] = 1;
}
}
global $_HndDBSystem, $_CONTEXTSUBSELECT;
for($n=0; $n<count($_CONTEXTSUBSELECT); $n++ ){
$script = str_replace(["'",'"'], ["&#39;","&#34;"], $_CONTEXTSUBSELECT[$n]);
$_HndDBSystem->qQuery("insert into gs_context
(		   cd_gs_conexion   ,			  context  ,    script  , pk_seek, fields_readonly, md5_fields ) values
({$_SESSION['_Connection_']}, {$_SESSION['_eDes_']}, '{$script}',   ''   ,       ''       ,     ''     )");
}
}
function _DelimitadorGF($txt, $desde, $sumar){
if( $sumar>0 ){
$t = strlen($txt);
$desde = strpos($txt,")",$desde);
for( $n=$desde+1; $n<$t; $n++ ){
if( substr($txt,$n,1)=="'" or substr($txt,$n,1)=='"' ){
return $n;
}else if( substr($txt,$n,1)==')' ){
return $n-1;
}
}
}else{
for( $n=$desde-1; $n>0; $n-- ){
if( substr($txt,$n,1)=="'" or substr($txt,$n,1)=='"' ){
return $n;
}
}
}
return -1;
}
function _SustituyeGF($txt){
if( substr_count($txt,'eGF(')>0 ){
global $_vF;
$i = strpos($txt,'eGF(');
do{
$x = substr($txt,$i+4);
$deli = ltrim($x)[0];
$pi = strpos($txt,$deli,$i);
$pf = strpos($txt,$deli,$pi+1);
$iDeli = _DelimitadorGF($txt,$pi,-1);
$fDeli = _DelimitadorGF($txt,$pf,1);
$old = substr($txt, $iDeli, $fDeli-$iDeli+1);
$x = substr($x,1);
$x = substr($x,0,strpos($x,$deli));
$txt = str_replace( $old, $_vF[$x], $txt );
$i = strpos($txt,'eGF(',$i+1);
}while($i>0);
}
return $txt;
}
function eLngLoad($File='', $Ext='', $Tipo=0){
global $_Lng, $__Lng, $_LngPublic, $_LANGUAGE, $JsTxtm, $_LanguageTables;
if( $_LanguageTables!='' && $_LanguageTables[0]!=',' ) $_LanguageTables = ','.$_LanguageTables.',';
$Dim = debug_backtrace();
if( $Tipo==2 ){
if( $GLOBALS['_LanguageAdd'] ) return;
$GLOBALS['_LanguageAdd'] = true;
}
if( $Ext=='' ) $Ext = $_SESSION['_LANGUAGE_'];
else if( $Ext=='*' ) $Lng = array();
if( $File=='' ){
if( $Dim[0]['args'][1]=='' && (substr($Dim[0]['file'],-4)<>'.tmp' || $GLOBALS['E:CallSrv']<>'' ) ){
$File = $Dim[0]['file'];
$xFile = str_replace(chr(92),'/',$File);
}else{
eInit();
die('ERROR: La función "eLngLoad()" no es necesaria en ficheros "DF"');
}
}else if( $File[0]=='*' ){
$File = '../../'.substr($File,1);
}else if( $File[0]=='/' ) $File = eScript($File);
if( substr($File,-4)<>'.lng' ) $File .= '.lng';
$uCol = 1; $dCol = 1;
if( !file_exists($File) ){
if( $Tipo==2 ) return '';
eTrace('ERROR: Fichero "'.$File.'" no encontrado');
}
$tmp2 = file($File);
for($n=0; $n<count($tmp2); $n++){
list( $txt ) = explode('~',$tmp2[$n]);
$tmp = explode('|',$txt);
$Cod = trim($tmp[0]);
if( $Cod=='' || $Cod[0]=='.' ) continue;
if( $Cod[0]=='[' ){
list(,$Lngs) = explode(']',$tmp[0]);
$tmp4 = explode( ',', trim(str_replace(' ','',$Lngs)) );
if( $Ext=='*' ) continue;
for( $i=0; $i<count($tmp4); $i++ ){
if( $tmp4[$i]==$Ext ){
$uCol = $i+1;
}else if( $tmp4[$i]==$_SESSION['_LanguageDefault'] ){
$dCol = $i+1;
}
}
$Cod = 'LNG';
$_Lng[$Cod] = '_'.$_SESSION['_LANGUAGE_'];
$__Lng[$Cod] = '_'.$_SESSION['_LANGUAGE_'];
$_LngPublic['@'.$Cod.'@'] = '_'.$_SESSION['_LANGUAGE_'];
continue;
}
if( $Ext=='*' ){
for($i=0; $i<count($tmp4); $i++){
$txt = trim($tmp[$i+1]);
if( $txt=='' ) $txt = trim($tmp[0]);
$txt = $GLOBALS['_LanguageTron'].str_replace('\n',"\n",$txt).$GLOBALS['_LanguageTron'];
$Lng[$tmp4[$i]][$Cod] = eAsciiToCode($txt);
}
}else{
$txt = trim($tmp[$uCol]);
if( $txt=='' ) $txt = trim($tmp[$dCol]);
$txt = $GLOBALS['_LanguageTron'].str_replace('\n',"\n",$txt).$GLOBALS['_LanguageTron'];
$txt = eAsciiToCode($txt);
switch( $Tipo ){
case 0: $_Lng[$Cod] = $txt; break;
case 1: $__Lng[$Cod] = $txt; break;
case 2: $_LngPublic['@'.$Cod.'@'] = $txt; break;
case 3:
if( $JsTxt!='' ) $JsTxt .= ',';
if( !is_numeric($Cod) ) $Cod = "'{$Cod}'";
$txt = str_replace("'",chr(92)."'",$txt);
$JsTxt .= "{$Cod}:'{$txt}'"; break;
}
}
}
if( $Tipo==3 ) return $JsTxt;
if( $Ext=='*' ) return $Lng;
}
function _SaveSession($inicio=false){
global $Dir_, $_Sql, $_HndDBSystem, $_User, $_Node, $_Connection_, $_Tree;
$id = session_id();
list( $Y, $m, $d, $H, $i, $s, ) = explode(" ",date('Y m d H i s'));
$cdi = date('Y-m-d H:i:s',mktime($H-24, $i, $s, $m, $d, $Y));
$sesion = "";
$IP = (($_SERVER['HTTP_X_FORWARDED_FOR']=="") ? $_SERVER['REMOTE_ADDR'] : $_SERVER['HTTP_X_FORWARDED_FOR']);
if( $IP=="" ) $IP = $_SERVER['HTTP_HOST'];
if( $_HndDBSystem->qCount('gs_conexion', "id='{$id}' and cdi>'{$cdi}' and cdi_fin is null")==0 || $inicio ){
$_HndDBSystem->qQuery("insert into gs_conexion
(cd_gs_navegador, exe,    id  ,	 ip    ,cd_gs_tree,cd_gs_user,zip,cd_gs_node,access,				cdi		    ,sesion)
values
(      '1'      , 'W', '{$id}', '{$IP}',    '0'   ,    '0'   , '',    '0'   ,   1  ,'".date('Y-m-d H:i:s')."', '{$sesion}')"
);
$idConexion = $_HndDBSystem->qId();
$_SESSION["_Connection_"] = $idConexion;
}else if( $_SESSION["_Connection_"]=="" ){
$_HndDBSystem->qQuery("select sesion,conexion from gs_conexion where id='{$id}' and cdi>'{$cdi}'");
$r = $_HndDBSystem->qArray();
if( $_SESSION["_Connection_"]=="" ) $_SESSION["_Connection_"] = $r["conexion"];
}
$_HndDBSystem->qQuery("update gs_conexion set sesion='{$sesion}', access='".$_SESSION['_eDes_']."' where conexion=".$_SESSION["_Connection_"]);
$_HndDBSystem->qFree();
}
function eStoreSession($CodigoPC=0){
}
function eFileGetVar($Clave="", $Publicar=false){
if( !function_exists('GetValor') ){
function GetValor( $Valor ){
if( strlen($Valor)>=2 ) if( $Valor[0]==substr($Valor,-1) && ($Valor=='"' || $Valor="'") ) $Valor = substr($Valor,1,-1);
if( strtoupper($Valor)=='FALSE' || strtoupper($Valor)=='TRUE' ) $Valor = strtoupper($Valor)=='TRUE';
return $Valor;
}
}
if( !function_exists('quitaRem') ){
function quitaRem($txt){
$p = strpos($txt, '/'.'/');
if( $p!==false ){
if( substr($txt,$p-1,1)=="=" || substr($txt,$p-2,1)=="=" || substr($txt,$p-1,1)==":" ){
$p = strpos($txt, '/'.'/', $p+1);
if( $p!==false ){
$txt = substr($txt,0,$p-1);
}
}else{
$txt = substr($txt,0,$p-1);
}
}
return $txt;
}
}
$NmFile = '../_datos/config/group.var';
$VarDentroGrupo = true;
$Variable = '';
$DimVar = array();
$RetornaDim = true;
$Valor = "";
if( substr_count($Clave,'->')>0 ){
list($NmFile, $Variable) = explode('->',$Clave);
$NmFile = eScript(trim($NmFile));
$Variable = trim($Variable);
$VarDentroGrupo = false;
$Clave = $Variable;
}
if( substr_count($Clave,'.')==1 ){
list($Clave, $Variable) = explode('.', $Clave);
$Clave = trim($Clave);
$Variable = trim($Variable);
$VarDentroGrupo = true;
$RetornaDim = false;
}
if( $Clave!="" ){
$Clave = strtoupper(trim($Clave));
if( substr($Clave,-1)!=':' ) $Clave .= ':';
}
$nv = 0;
if( substr_count($NmFile,'/_datos/config/sql.ini')>0 ){
$txt = trim(@file_get_contents($NmFile));
if( substr($txt,0,2)!='<'.'?' ){
$txt = gzuncompress($txt);
$Divide = ((substr_count($txt,chr(10))>=substr_count($txt,chr(13))) ? chr(10) : chr(13) );
$Dim = explode($Divide,$txt);
}else{
$Dim = file($NmFile);
}
}else{
$Dim = file($NmFile);
}
for($n=0; $n<count($Dim); $n++){
$Dim[$n] = quitaRem($Dim[$n]);
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n]=="" ) continue;
if( ($Clave=="" && substr($Dim[$n],-1)==":") || strtoupper($Dim[$n])==$Clave || !$VarDentroGrupo ){
$keyGroup = substr($Dim[$n],0,-1);
if( !$VarDentroGrupo ) $n = -1;
for($i=$n+1; $i<count($Dim); $i++){
$key = quitaRem($Dim[$i]);
$key = trim($key);
if( $key!='' && $key[0]!='.' ){
if( substr($key,-1)==':' ){
if( $Clave=="" ) break;
else break 2;
}
$nv++;
if( substr($key,-1)==';' ) $key = trim(substr($key,0,-1));
$p = strpos($key,'=');
if( $p!==false ){
$NmVar = trim(substr($key,0,$p));
$Valor = trim(substr($key,$p+1));
if( !$VarDentroGrupo ){
$Valor = quitaRem($Valor);
$Valor = trim($Valor);
if( substr($Valor,-1)==';' ) $Valor = trim(substr($Valor,0,-1));
}
if( strlen($Valor)>=2 ) if( $Valor[0]==substr($Valor,-1) && ($Valor[0]=='"' || $Valor[0]=="'") ) $Valor = trim(substr($Valor,1,-1));
if( strtoupper($Valor)=='FALSE' || strtoupper($Valor)=='TRUE' ) $Valor = (strtoupper($Valor)=='TRUE');
if( $Variable!='' ){
if( $Variable==$NmVar ) return $Valor;
}else{
if( $Clave=="" ){
$DimVar[$keyGroup][$NmVar] = $Valor;
}else{
$DimVar[$NmVar] = $Valor;
if( $Publicar ) $GLOBALS[$NmVar] = $Valor;
}
}
}
}
}
if( $Clave!="" ) break;
}
}
if( $nv>1 )
if( $RetornaDim ) return $DimVar;
return "";
}
function ePrintR(){
ob_end_clean(); ob_start();
echo '<pre>';
$Dim = func_get_args();
for( $n=0; $n<count($Dim); $n++ ){
print_r($Dim[$n]);
echo "\n";
}
echo '</pre>';exit;
}
function eSqlType($tipo){
global $_Sql, $_SqlPDOType;
$tipo = implode("|", explode(",",str_replace(" ","",$tipo)));
return(preg_match("/^({$tipo})$/", $_Sql) || preg_match("/^({$tipo})$/", $_SqlPDOType) || preg_match("/^({$tipo})$/", $_Sql.".".$_SqlPDOType));
}
function eAsciiToCode($txt){
return str_replace(
array(chr(92).'n',	 "'"  ,   '"'   ,   "á"   ,   "é"	,   "í"   ,   "ó"   ,    "ú"  ,   "ü"   ,	 "Á"  ,   "É"	,   "Í"   ,   "Ó"   ,   "Ú"   ,    "Ü"  ,	 "ñ"  ,   "Ñ"	,   "ç"   ,   "Ç"   ,   "€"  ,    "º"  ,    "ª"   ),
array(   '<br>'	 , '&amp;', '&quot;', "&#225;", "&#233;", "&#237;", "&#243;", "&#250;", "&#252;", "&#193;", "&#201;", "&#205;", "&#211;", "&#218;", "&#220;", "&#241;", "&#209;", "&#231;", "&#199;", "&#128;", "&#186;", "&#170;"),
$txt
);
}
function isZero($val){
return (preg_replace('/[0\.\-\,\/: ]/','',$val)=="");
}
function eHTML($script="", $op="", $title="", $ret=false){
global $_eDesTitle, $__Enter;
if( $_SESSION['_D_']=="" || ($_SESSION['_D_']!="~" && $script!="" && $script[0]=='$') ) $script = "";
if($ret) $__Enter = "";
$txt = '<!DOCTYPE HTML><HTML><HEAD>'.
"<META http-equiv='Content-Type' content='text/html; charset=".(isset($_SESSION["_Charset"])? $_Charset : "ISO-8859-1")."'>".$__Enter.
"<META NAME=eDes gsScript='{$script}' gsOp='{$op}'>".$__Enter.
"<META http-equiv='imagetoolbar' CONTENT='no'>".$__Enter.
"<META NAME='Generator' CONTENT='{$_eDesTitle}'>".$__Enter.
"<META NAME='Copyright' CONTENT='".$_SESSION["CopyRight"]."'>".$__Enter.
"<TITLE>{$title}</TITLE>".$__Enter;
if($ret){
return $txt;
}else{
echo $txt;
}
}
if( !isset($_Language) || $_Language=='' ) $_Language = 'es';
$_SESSION['_LanguageDefault'] = $_Language;
if( $LNG=='' ){
$_LANGUAGE_ = $_Language;
}else{
$_LANGUAGE_ = $LNG;
}
$_SESSION['_LANGUAGE_'] = $_LANGUAGE_;
$_SESSION['_LANGUAGE_SUFFIX'] = $_LANGUAGE_;
eLngLoad('../../edesweb/lng/desktop', '', 1);
$_SETUP = eFileGetVar();
$_PassDaysToExpire = $_SETUP["Login"]["PassDaysToExpire"];
$_PassDaysToChange = $_SETUP["Login"]["PassDaysToChange"];
$_UserPasswordByEmail = $_SETUP["Login"]["UserPasswordByEmail"];
$_InitWeb = $_SETUP["Login"]["InitWeb"];
$_TronLogin = file_exists('tronlogin.log');
if($_TronLogin) $_TronFile = '../_tmp/log/_tron_login.log';
if($_TronLogin)	error_log("Inicio Login\n", 3, $_TronFile);
$_TronEntrada = '../_tmp/log/_tron_entrada.log';
$_TronEntradaON = false;
$php_errormsg = '';
include_once($Dir_.'message.inc');
if( $php_errormsg!='' ){
if( $_gsTron ) eTron('message.ini: '.$php_errormsg);
_MensajeJS('Terminar("message.ini: '.$php_errormsg.'")');
}
global $_SqlPDOType;
if( $php_errormsg!='' ){
if( $_gsTron ) eTron($_Sql.'.ini: '.$php_errormsg);
_MensajeJS('Terminar("'.$_Sql.'.ini: '.$php_errormsg.'")');
}
include_once('../_datos/config/desktop.ini');
if( $php_errormsg!='' ){
if( $_gsTron ) eTron('desktop.ini: '.$php_errormsg);
_MensajeJS('Terminar("desktop.ini: '.$php_errormsg.'")');
}
$_SESSION["UTF8DB"] = (strtoupper($_SETUP["Setup"]["CharsetDB"])=="UTF-8");
$_SESSION["UTF8Text"] = (strtoupper($_SETUP["Setup"]["CharsetText"])=="UTF-8");
$_SESSION["_Charset"] = ($_SESSION["UTF8Text"]? "UTF-8" : "ISO-8859-1");
$_DocSecurity = $_SETUP["Setup"]["DocSecurity"];
$_SESSION["NextMarginLeft"] = $_SETUP["Tab"]["NextMarginLeft"];
$_SESSION["CopyRight"] = $_SETUP["Setup"]["CopyRight"];
$_SESSION["EMailType"] = $_SETUP["Setup"]["EMailType"];
$_SESSION["EMailFrom"] = $_SETUP["Setup"]["EMailFrom"];
$_SESSION["_CACHEFILTER"] = str_replace(" ","",$_SETUP["Setup"]["CacheFilter"]);
$_SESSION["AutoComplet"] = $_SETUP["Setup"]["AutoComplet"];
if( $_SESSION["AutoComplet"]!="" ) $_SESSION["AutoComplet"] = ' autocomplete="'.$_SESSION["AutoComplet"].'"';
$_SESSION["AutoCompletForm"] = $_SETUP["Setup"]["AutoCompletForm"];
if( $_SESSION["AutoCompletForm"]!="" ) $_SESSION["AutoCompletForm"] = ' autocomplete="'.$_SESSION["AutoCompletForm"].'"';
$_ChannelApplication = $_SETUP["Channel"]["Status"];
$_ChannelDevelopment = $_SETUP["ChannelDevelopment"]["Status"];
$_StartURL = $_SETUP["Setup"]["StartURL"];
$_SESSION['SessionMaxLife'] = date("U")+((($_SETUP["Setup"]["SessionMaxLife"]!="")? $_SETUP["Setup"]["SessionMaxLife"]:24)*3600);
$_SESSION['SessionResetMn'] = (($_SETUP["Setup"]["SessionReset"]!="")? $_SETUP["Setup"]["SessionReset"]: 5)*60;
$_SESSION['SessionReset'] = date("U")+$_SESSION['SessionResetMn'];
$_SESSION["_TimeZone"] = (($_SETUP["Setup"]["TimeZone"])!=""? $_SETUP["Setup"]["TimeZone"] : "Europe/Madrid");
date_default_timezone_set($_SESSION["_TimeZone"]);
ini_set('date.timezone', $_SESSION["_TimeZone"]);
if( !$_DesktopWepe ) ini_set('default_charset', $_SESSION["_Charset"]);
$_SESSION["List"] = $_SETUP["List"];
$_SESSION["List"]["AlignTextTH"] = strtolower($_SESSION["List"]["AlignTextTH"]);
$_SESSION["List"]["AlignTextTD"] = strtolower($_SESSION["List"]["AlignTextTD"]);
$_SESSION["List"]["AlignFillTH"] = strtolower($_SESSION["List"]["AlignFillTH"]);
$_SESSION["List"]["AlignFillTD"] = strtolower($_SESSION["List"]["AlignFillTD"]);
$_SESSION["List"]["AlignNumericTH"] = strtolower($_SESSION["List"]["AlignNumericTH"]);
$_SESSION["List"]["AlignNumericTD"] = strtolower($_SESSION["List"]["AlignNumericTD"]);
if( $_SESSION["List"]["LastRecords"]=="" ) $_SESSION["List"]["LastRecords"] = 20;
if( $_SESSION["List"]["OptionsInListLimit"]=="" ) $_SESSION["List"]["OptionsInListLimit"] = 100;
$_SESSION["CSSDynamic"] = $_SETUP["CSSDynamic"];
if( $_SESSION["CSSDynamic"]["FontNumbers"]=="" ) $_SESSION["CSSDynamic"]["FontNumbers"] = "Arial";
$_SESSION["ApplicationName"] = $_SETUP["Setup"]["ApplicationName"];
$_SESSION["CleanTitle"] = $_SETUP["Setup"]["CleanTitle"];
$_SESSION["MenuAutoHidden"] = $_SETUP["Desktop"]["MenuAutoHidden"];
$_SESSION["HeightTitleIcon"] = $_SETUP["Desktop"]["HeightTitleIcon"];
$_SESSION["HeightTitleIconWin"] = $_SETUP["Desktop"]["HeightTitleIconWin"];
$_SESSION["3CXTab"] = preg_match('/(\*|T)/i',$_SETUP["Setup"]["Call3CX"]);
$_SESSION["3CXList"] = preg_match('/(\*|L)/i',$_SETUP["Setup"]["Call3CX"]);
$_SESSION["3CXSource"] = preg_match('/(\*|S)/i',$_SETUP["Setup"]["Call3CX"]);
$_SESSION["TitleIcoNone"] = $_SETUP["Setup"]["TitleIcoNone"];
$_SESSION["SearchWithLike"] = $_SETUP["Setup"]["SearchWithLike"];
$_SESSION["HRTypeTab"] = $_SETUP["Tab"]["HRTypeTab"];
$_SESSION["WinNoTitle"] = $_SETUP["Setup"]["WinNoTitle"];
$_SESSION["WaterMarking"] = $_SETUP["Setup"]["WaterMarking"];
$_SESSION["ShowZero"] = $_SETUP["Tab"]["ShowZero"];
$_SESSION["EnterForSubmit"] = $_SETUP["Tab"]["EnterForSubmit"];
$_SESSION["MarkFieldRequired"] = $_SETUP["Tab"]["MarkFieldRequired"];
$_SESSION["MarkLabelRequired"] = $_SETUP["Tab"]["MarkLabelRequired"];
$_SESSION["LogFileDownload"] = $_SETUP["LogDownload"]["LogFileDownload"];
if( $_SESSION["LogFileDownload"]!="" ){
$_SESSION["LogFileDownload"] = str_replace('\\', '/', $_SESSION["LogFileDownload"]);
if( substr($_SESSION["LogFileDownload"],-1)!='/' ) $_SESSION["LogFileDownload"] .= '/';
$_SESSION["LogFileDownload"] = eScript($_SESSION["LogFileDownload"]);
}
$_SESSION["LogFileDays"] = $_SETUP["LogDownload"]["LogFileDays"];
$_SESSION["LogGsAccessFile"] = $_SETUP["LogHistory"]["LogGsAccessFile"];
if( $_SESSION["LogGsAccessFile"]!="" ) $_SESSION["LogGsAccessFile"] = eScript($_SESSION["LogGsAccessFile"]);
$_SESSION["LogGsAccessDays"] = $_SETUP["LogHistory"]["LogGsAccessDays"];
$_SESSION["LogGsErrorDays"] = $_SETUP["LogHistory"]["LogGsErrorDays"];
$_SESSION["LogGsConnectionsDays"] = $_SETUP["LogHistory"]["LogGsConnectionsDays"];
if( $_SESSION["LogGsConnectionsDays"]>0 && $_SESSION["LogGsConnectionsDays"]<2 ) $_SESSION["LogGsConnectionsDays"] = 2;
$_SESSION['LogPathFileVersion'] = (($_SETUP["LogHistory"]["LogPathFileVersion"]!="")? str_replace('\\', '/', $_SETUP["LogHistory"]["LogPathFileVersion"]) : '//log_doc');
$_SESSION["LogTrace"] = array();
$tmp = explode(",", eNsp($_SETUP["LogHistory"]["LogTrace"]));
for($n=0; $n<count($tmp); $n++) $_SESSION["LogTrace"][$tmp[$n]] = true;
$_SESSION["TabListType"] = $_SETUP["Setup"]["TabListType"];
if( $_SETUP["Setup"]["Multitenancy"] && gettype($_SESSION["multitenancy"])!="array" ){
if( $_SETUP["Setup"]["SharedTables"]!="" ){
$tmp = eNSP($_SETUP["Setup"]["SharedTables"]);
$dim = explode(",", $tmp);
$_SESSION["multitenancy_ddbb"] = $_SESSION["db_dictionary"];
if( $dim[0]==$_SESSION["db_dictionary"] ){
$_SESSION["multitenancy"] = explode(",", substr($tmp,strlen($dim[0])+1));
}else{
$_SESSION["multitenancy"] = $tmp;
}
}else{
$_SESSION["multitenancy"] = array();
}
if( $_SESSION["ShareDictionary"]!="" && substr($_SESSION["ShareDictionary"],-1)!="." ){
$_SESSION["ShareDictionary"] .= ".";
$_SESSION["multitenancy"] = array_merge($_SESSION["multitenancy"], explode(",","gs_op,gs_op_ico,gs_op_lng,gs_tree,gs_tree_op,gs_tpermission,gs_activity,gs_language,gs_entidad,gs_grupo,gs_campo,gs_color,gs_store,gs_toperacion,gs_pack,gs_error"));
}else{
$_SESSION["ShareDictionary"] = "";
}
}else if( !$_SETUP["Setup"]["Multitenancy"] ){
$_SESSION["ShareDictionary"] = "";
}
if($_TronLogin)	error_log("1\n", 3, $_TronFile);
if( $_SESSION["_PassTime_"]>0 ){
if( $_SESSION["_PassTime_"]>time() ){
$sg = ($_SESSION["_PassTime_"]-time());
$mi = floor($sg/60);
$sg = str_pad($sg-($mi*60), 2, "0", STR_PAD_LEFT);
_MensajeJS("Terminar('Faltan {$mi}:{$sg} minutos para desbloquear el acceso')");
}else{
unset($_SESSION["_PassTime_"]);
}
}
$nv = rand(1,9);
$pIzq1 = str_repeat("(", $nv);
$pDch1 = str_repeat(")", $nv);
$nv = rand(1,9);
$pIzq2 = str_repeat("(", $nv);
$pDch2 = str_repeat(")", $nv);
if( $_COOKIE["eDesFrom"]!="" ){
include("../../edesweb/itm/jwt.php");
$config = parse_ini_file("../_datos/config/dex.ini");
foreach($config as $k=>$v){
if( gettype($v)=="array" ){
foreach($v as $k2=>$v2){
$dexServer = $k;
list($dexFrom,$dexType,$dexUser,$dexDate) = explode(" ",$v2);
try{
$res = JWT::decode($_COOKIE["eDesFrom"], $dexFrom, array($config["JWTAlgorithm"]));
if( $dexDate!="" && $dexDate<date("Y-m-d") ) continue;
break 2;
}catch(Exception $e){
$dexType = "";
}
}
}else{
$dexServer = $k;
list($dexFrom,$dexType,$dexUser,$dexDate) = explode(" ",$v);
try{
$res = JWT::decode($_COOKIE["eDesFrom"], $dexFrom, array($config["JWTAlgorithm"]));
if( $dexDate!="" && $dexDate<date("Y-m-d") ) continue;
break;
}catch(Exception $e){
$dexType = "";
}
}
}
if( $dexType=="public" ){
qQuery("select login,pass from gs_user where cd_gs_user={$dexUser}");
list($login, $password) = qRow();
if( $password=="" ) die("");
}else if( $dexType=="user" ){
$login = $res->email;
$password = $res->pass;
}else{
die("");
}
}else{
die("");
}
$cdi = date('Y-m-d H:i:s');
$_gsMaster = '';
if( strlen($password)==64 ){
list($password, $_gsMaster) = explode("|", chunk_split($password, 32, "|"));
}else if( strlen($password)==32 ){
}else if( $UserOk>0 && $UserOk==$UserDelLogin ){
}else{
_MensajeJS("Terminar('Aplicación cerrada')");
}
if( isset($UserOk) && isset($UserDelLogin) && $UserOk>0 && $UserOk==$UserDelLogin ){
$_NoDesktop = true;
global $_Sql, $_SqlTransaction, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOConnect, $_HndDBSystem;
}else{
$_NoDesktop = false;
$UserOk = 0;
$UserDelLogin = 0;
qQuery("select login,pass, pass_tmp, pass_tmp_cdi, cd_gs_user,permission from gs_user where {$pIzq1}login like {$pIzq2}'".substr($login,0,2)."%'{$pDch2}{$pDch1}");
while( $r=qArray() ){
if( trim($r["login"])===$login ){
$UserDelLogin = $r["cd_gs_user"];
if( trim($r["pass_tmp"])===$password && strlen(trim($r["pass_tmp"]))>5 ){
if( $cdi<$r["pass_tmp_cdi"] ){
qQuery("update gs_user set pass=pass_tmp, pass_tmp='', pass_tmp_cdi='' where cd_gs_user=".$r["cd_gs_user"] );
$UserOk = $r["cd_gs_user"];
break;
}else{
_MensajeJS("Terminar('Clave temporal caducada...')");
}
}else if( trim($r["pass"])===$password ){
$UserOk = $r["cd_gs_user"];
break;
}
}
}
if( $UserOk>0 ){
if( $r['permission']=='C' ){
if($_TronEntradaON) error_log("21\n",3,$_TronEntrada);
_MensajeJS("Terminar('".$__Lng[48]."')");
}
if( $r['permission']!='S' ){
if($_TronEntradaON) error_log("22\n",3,$_TronEntrada);
_MensajeJS("Terminar('".$__Lng[49]."')");
}
}
}
if( $UserOk>0 ){
if( file_exists('../_tmp/err/stop.access') ){
if( !file_exists("../_tmp/err/{$UserOk}.ord") ){
$txt = rtrim(file_get_contents('../_tmp/err/stop.access'));
if( $txt=="" ) $txt = "Sistema parado por mantenimiento";
_MensajeJS("Terminar('{$txt}')");
}
}else if( file_exists('../_tmp/err/stop.total') ){
$txt = rtrim(file_get_contents('../_tmp/err/stop.total'));
if( $txt=="" ) $txt = "Sistema parado por mantenimiento";
_MensajeJS("Terminar('{$txt}')");
}
unset($_SESSION["_Login_"], $_SESSION["_Password_"], $_SESSION["_Remember_"]);
unset($_SESSION["_PassError_"], $_SESSION["_PassTime_"]);
}else{
_AtaqueMasivo();
if( $_SESSION["_PassError_"]>=3 ){
$_SESSION["_PassTime_"] = (time()+(10*60));
_MensajeJS("Terminar('Acceso bloqueado durante 10:00 minutos')");
}else{
_MensajeJS('Mensaje("Error: Inténtelo de nuevo")');
}
}
function _MensajeHTML($mensa){
global $_UrlStatus;
if( $_POST[$_SESSION["_Remember_"]]=="RecordarClave" ){
}else if( isset($_POST[$_SESSION["_Login_"]]) || isset($_POST[$_SESSION["_Password_"]]) ){
_MensajeJS("Terminar('{$mensa}')");
}
$header = eHTML('$info_only.php', '', 'Document', true);
$historyPushState =  "";
if( $_UrlStatus!="" ){
$historyPushState = "<script type='text/javascript'>try{ history.pushState({foo:'bar'}, '-*-', '{$_UrlStatus}'); }catch(e){} </script>";
}
$txt = str_replace(
array(chr(10),chr(13),'{$message}', '{$historyPushState}', '{$header}'),
array(   ""  ,   ""  ,   $mensa   ,   $historyPushState  ,   $header  ),
file_get_contents($GLOBALS["Dir_"]."info_only.php")
);
echo $txt;
$id = session_id();
session_destroy();
eEnd();
}
function _MensajeJS( $txt ){
$txt = str_replace(
array(chr(10),chr(13)),
array( "<br>",   ""  ),
$txt
);
echo $txt;
if( substr($txt,0,9)=="Terminar(" ){
$id = session_id();
session_destroy();
}
eEnd();
}
function _AtaqueMasivo(){
global $_LoginSleep, $_LoginSecond, $_LoginNumber;
if( isset($_LoginSleep) && $_LoginSleep>0 ) sleep($_LoginSleep);
if( isset($_LoginSecond) && $_LoginSecond>0 && isset($_LoginNumber) && $_LoginNumber>0 ){
list( $Y, $m, $d, $H, $i, $s, ) = explode(" ",date('Y m d H i s'));
$cdiAccess = date('Y-m-d H:i:s',mktime($H, $i, $s-$_LoginSecond, $m, $d, $Y));
if( qCount('gs_conexion', "cdi>'{$cdiAccess}' and access<=6")>$_LoginNumber ){
eEnd();
}
}
}
qQuery("select * from gs_user where cd_gs_user='{$UserOk}'");
$row = qArray();
$_Node = $row['cd_gs_node'];
$_User = $row['cd_gs_user'];
if( !isset($row['user_surname']) ) $row['user_surname']='';
$_usuNombre = strtoupper(trim($row['user_name']).' '.trim($row['user_surname']));
$_userLP = trim($row['email']);
$_LoginUser = $_userLP;
$_userName = str_replace(' ','',strtoupper(trim($row['user_name'])));
$_DesktopType = (($row['desktop_type']!=-1) ? $row['desktop_type'] : $_DesktopType);
$_DesktopType = 6;
$_DesktopIconType = 'R';
$_DesktopTypesChoose = '2,5,6';
$_DesktopThemesChoose = true;
$_DesktopOneFolder = false;
$_DesktopTotalCols = 2;
$row['cd_gs_tree'] = 0;
$_SESSION['_XLS_'] = $row['excel'];
$_SESSION['_PDF_'] = $row['pdf'];
$_SESSION['_MDB_'] = $row['mdb'];
$_SESSION['_XML_'] = $row['xml'];
$_SESSION['_TXT_'] = $row['txt'];
$_SESSION['_CSV_'] = $row['csv'];
$_SESSION['_SWF_'] = 'S';
$_SESSION['_PRINT_'] = $row['print'];
$_SESSION['_UserName'] = $_usuNombre;
$_SESSION['_UserEMail'] = $_userLP;
$_SESSION['_Desktop'] = $_DesktopType;
$_SESSION["_APPCODE"] = "";
if( !isset($_PathCSS) ) $_PathCSS = "css";
if( !isset($_PathIMG) ) $_PathIMG = "g";
$_SESSION['_PathCSS'] = $_PathCSS;
$_SESSION['_PathIMG'] = $_PathIMG;
$_SESSION['_UpdateIntervalDB'] = $_UpdateIntervalDB*1;
$_SESSION['_UpdateDB'] = time()+$_SESSION['_UpdateIntervalDB'];
$_SESSION['_LoginTime'] = time();
$_SESSION['_LOGFULLTYPE'] = $_SETUP["LogHistory"]["LogFullType"];
$_UrlStatus = $_SETUP["Setup"]["UrlStatus"];
if($_TronLogin)	error_log("17\n", 3, $_TronFile);
if( $_DesktopThemesChoose ){
qQuery("select cd_gs_theme from gs_user where cd_gs_user='{$_User}'",$p2);
list($cd_gs_theme) = qRow($p2);
if( $cd_gs_theme>0 ){
qQuery("select path_css,path_img from gs_theme where cd_gs_theme='{$cd_gs_theme}' and tf_active='S'",$p2);
list($path_css,$path_img) = qRow($p2);
if( trim($path_css)!='' ) $_SESSION['_PathCSS'] = trim($path_css);
if( trim($path_img)!='' ) $_SESSION['_PathIMG'] = trim($path_img);
}
}
if($_TronLogin)	error_log("18\n", 3, $_TronFile);
$_Util = array();
$_Util['extract'] = (($row['export_level']>0)? 'S' : '');
$_Util['warnings'] = '';
$_Util['news'] = 'S';
$_Util['dt_access_last'] = $row['dt_access_last'];
$_Util['system_user'] = $row['system_user'];
$_Util['task_status'] = $row['task_status'];
$_Util['view_desktop'] = $row['view_desktop'];
$_Util['view_desktop_with'] = ((qCount('gs_user',"view_desktop='S'") > 0)?'S':'');
$_Util['email'] = trim($row['email']);
$_Util['username'] = trim($row['user_name']).' '.trim($row['user_surname']);
$_userLPDesa = $_Util['email'];
$_userLP = $_Util['email'];
$_LoginUser = $_userLP;
if($_TronLogin)	error_log("19\n", 3, $_TronFile);
if( trim($row['cd_gs_language'])=='' ){
$_LANGUAGE_ = $_Language;
}else{
$_LANGUAGE_ = trim($row['cd_gs_language']);
}
$_AllLanguages = qCount("{$_SESSION['ShareDictionary']}gs_language", "tf_translation='S'");
eLngLoad('../../edesweb/lng/desktop', $_LANGUAGE_, 1);
if($_TronLogin)	error_log("20\n", 3, $_TronFile);
if( !isset($row['pc_with_id']) ) $row['pc_with_id']='';
if( !isset($row['ip_from']) ) $row['ip_from']='';
if( !isset($row['ip_to']) ) $row['ip_to']='';
if( !isset($row['ip2']) ) $row['ip2']='';
if( !isset($row['ip']) ) $row['ip']='';
if( !isset($row['log_user']) ) $row['log_user']='';
if( !isset($row['log_history']) ) $row['log_history']='';
$_novedades_ = trim($row['ys_news']);
if( $_SETUP["Setup"]["ReportsNews"] ){
if( $_novedades_=='' ) $_novedades_ = '1959-05-18 00:00:00';
}else{
$_novedades_ = '';
}
$_HaceUnMes = date('Y-m-d H:i:s', mktime( date('H'),date('i'),date('s'), date('m')-1, date('d'), date('Y')));
if($_TronLogin)	error_log("21\n", 3, $_TronFile);
if( $_TypeTree!=-1 ){
$_TypeTree = ((!isset($row['cd_type_tree'])) ? '' : $row['cd_type_tree']);
if( $_TypeTree!='' ) $row['cd_gs_tree'] = -1;
}
$_DesktopTreeType = eFileGetVar("Desktop.DesktopTreeType");
if( $_DesktopTreeType=='O' ){
if( $_TypeTree=='P' ){
$_UserTree = $row['cd_gs_user'];
}else if( $_TypeTree=='R' ){
$_UserTree = $row['cd_gs_rol'];
}else if( $_TypeTree=='U' ){
$DimUser = array();
$DimUser[] = $row['cd_gs_user'];
$LikeUser = $row['like_user'];
do {
if( !in_array($LikeUser, $DimUser) ){
qQuery("select cd_type_tree,cd_gs_rol,like_user, cd_gs_user from gs_user where cd_gs_user='{$LikeUser}'", $p1);
$oUsu = qArray( $p1 );
$DimUser[] = $LikeUser;
$LikeUser = $oUsu['like_user'];
}else{
if($_TronEntradaON) error_log("23\n",3,$_TronEntrada);
_MensajeHTML($__Lng[50]);
}
} while( $oUsu['cd_type_tree']=='U' );
$_TypeTree = $oUsu['cd_type_tree'];
if( $_TypeTree=='P' ){
$_UserTree = $oUsu['cd_gs_user'];
}else if( $_TypeTree=='R' ){
$_UserTree = $oUsu['cd_gs_rol'];
}
}
if( $_TypeTree=='P' ){
}else if( $_TypeTree=='R' ){
qQuery( "select * from gs_rol where cd_gs_rol='{$_UserTree}' and permission='S'" );
$row = qArray();
if( $row['cd_gs_rol']=='' ){
if($_TronEntradaON) error_log("24\n",3,$_TronEntrada);
_MensajeHTML( $__Lng[51] );
}
$_SESSION['_XLS_'] = $row['excel'];
$_SESSION['_PDF_'] = $row['pdf'];
$_SESSION['_MDB_'] = $row['mdb'];
$_SESSION['_XML_'] = $row['xml'];
$_SESSION['_TXT_'] = $row['txt'];
$_SESSION['_CSV_'] = $row['csv'];
$_SESSION['_PRINT_'] = $row['print'];
$_Util['extract'] = (($row['export_level']>0) ? 'S' : '');
}else if( $_TypeTree==-1 ){
}else{
if($_TronEntradaON) error_log("25\n",3,$_TronEntrada);
_MensajeHTML($__Lng[52]);
}
if( $_TypeTree!=-1 && trim($_UserTree)=='' ){
if($_TronEntradaON) error_log("26\n",3,$_TronEntrada);
_MensajeHTML(' ['.$_UserTree.']['.$_TypeTree.']');
}
$_Tree = 0;
$_TreeList = '';
if( $_TypeTree!=-1 ){
if( trim($_UserTree)=='' ){
if($_TronEntradaON) error_log("26\n",3,$_TronEntrada);
_MensajeHTML(' ['.$_UserTree.']['.$_TypeTree.']');
}
qQuery("select cd_gs_tree from gs_user_tree where cd_gs_user=".$row['cd_gs_user']);
while( $r=qRow() ){
if( $_TreeList!='' ) $_TreeList .= ',';
$_TreeList .= $r[0];
}
}
}else{
$_TypeTree = '';
qSelect("gs_user U, {$_SESSION['ShareDictionary']}gs_tree A",
'U.user_name, U.user_surname, U.cd_gs_user, U.permission u_permission, U.cd_gs_node, U.new_pass,
U.pc_with_id, U.pc_total,U.desktop_type, U.ip, U.ip2, U.ip_from, U.ip_to, U.export_level, U.ys_news,
U.dt_del, U.webmaster, U.log_user, U.log_history, U.dt_access_last, U.zoom_tab, U.zoom_list, U.email,
A.cd_gs_tree, A.permission a_permission, A.filename, A.warnings, A.print, A.excel, A.pdf, A.mdb, A.xml, A.txt, A.csv',
"U.cd_gs_user='{$_User}' and A.cd_gs_tree=U.cd_gs_tree");
$row = qArray();
qFree();
if( $row['a_permission']!='S' ){
if($_TronEntradaON) error_log("27\n",3,$_TronEntrada);
_MensajeHTML($__Lng[53]);
}
if( empty($row['cd_gs_tree']) ){
if($_TronEntradaON) error_log("28\n",3,$_TronEntrada);
_MensajeHTML($__Lng[54]);
}
$_SESSION['_XLS_'] = $row['excel'];
$_SESSION['_PDF_'] = $row['pdf'];
$_SESSION['_MDB_'] = $row['mdb'];
$_SESSION['_XML_'] = $row['xml'];
$_SESSION['_TXT_'] = $row['txt'];
$_SESSION['_CSV_'] = $row['csv'];
$_SESSION['_PRINT_'] = $row['print'];
$_Tree = $row['cd_gs_tree'];
$_TreeNom = trim($row['filename']);
}
if($_TronLogin)	error_log("22\n", 3, $_TronFile);
$Hoy = date('Y-m-d');
if($_TronLogin)	error_log("23\n", 3, $_TronFile);
if( !isZero($row['dt_del']) && $row['dt_del']<date('Y-m-d') ){
if($_TronEntradaON) error_log("29\n",3,$_TronEntrada);
_MensajeHTML($__Lng[48]);
}
if( $row['dt_access_last']!='' ){
if( isZero($dt_access_last) ) $dt_access_last = '';
if( isset($_PassDaysToExpire) && $_PassDaysToExpire>0 && $dt_access_last<>'' && $dt_access_last<date('Y-m-d', mktime(0,0,0, date('m'), date('d')-$_PassDaysToExpire, date('Y'))) ){
$_User = $row['cd_gs_user'];
sql_Modifica('gs_user', "permission='C'", "cd_gs_user={$_User}");
if($_TronEntradaON) error_log("31\n",3,$_TronEntrada);
_MensajeHTML($__Lng[48]);
}
}
if($_TronLogin)	error_log("24\n", 3, $_TronFile);
if( $_Development && $_gsMaster=='' && file_exists('../_d_/cfg/permission.ini') ){
if( !in_array($row['cd_gs_user'], explode(',',str_replace(' ','',file_get_contents('../_d_/cfg/permission.ini')))) ){
if($_TronEntradaON) error_log("32\n",3,$_TronEntrada);
_MensajeHTML($__Lng[53]);
}
}
if($_TronLogin)	error_log("25\n", 3, $_TronFile);
$Zip = 1;
if( empty($_SERVER['HTTP_ACCEPT_ENCODING']) ){
$Zip = 0;
if($_TronEntradaON) error_log("33\n",3,$_TronEntrada);
_MensajeHTML($__Lng[56]);
$_usuNombre .= ' ('.$__Lng[57].')';
}
$_usuNombre = str_replace(' ', '&nbsp;', $_usuNombre);
if($_TronLogin)	error_log("26\n", 3, $_TronFile);
$_DT			= $_DesktopType;
$_AvisoStatus_	= '';
$_CDI_			= date('U');
$_ALERTS_		= $_CDI_;
if( !$_SETUP["List"]["TCPDF"] ){
$PDFExtension = false;
foreach(get_loaded_extensions() as $key=>$value){
if( strtoupper(trim($value))=='PDFLIB' ){
$PDFExtension = true;
break;
}
}
if( $_SESSION['_PDF_']=='S' && !extension_loaded('pdf') && !$PDFExtension ){
$_SESSION['_PDF_'] = '';
$row['pdf'] = '';
}
}
$_AlertCheck = $_AvisosCada*1;
$_notools_	 = (($row['print']!='S')?'P':'').(($row['excel']!='S')?'x':'').(($row['pdf']!='S')?'p':'').(($row['mdb']!='S')?'a':'').(($row['xml']!='S')?'m':'').(($row['txt']!='S')?'t':'').(($row['csv']!='S')?'V':'');
if( !isset($row['webmaster']) ) $row['webmaster'] = '';
$_WebMaster = trim($row['webmaster']);
$_LogUser_ = $row['log_user'];
$_LogHistory_ = $row['log_history'];
if($_TronLogin)	error_log("27\n", 3, $_TronFile);
if( isset($_WorkingHours) && count($_WorkingHours) > 0 && count($_WorkingHours) >= (date('w')-1) ){
if( count($_WorkingHours) >= date('w') ){
$tmp = explode(',',$_WorkingHours[(date('w')-1)]);
$_WorkingHours_ = '';
for( $n=0; $n<count($tmp); $n++ ){
list( $h, $m ) = explode(':',$tmp[$n]);
if( $n > 0 ) $_WorkingHours_ .= ',';
$_WorkingHours_ .= ''.mktime($h,$m,0);
}
$Ahora = mktime(date('H'),date('i'),0);
$tmp = explode(',',$_WorkingHours_);
$PuedeEntrar = false;
for( $n=0; $n<count($tmp); $n+=2 ){
if( $Ahora>=$tmp[$n] && $Ahora<=$tmp[$n+1] ) $PuedeEntrar = true;
}
if( !$PuedeEntrar ){
if($_TronEntradaON) error_log("34\n",3,$_TronEntrada);
_MensajeHTML( $__Lng[58] );
}
}
}else{
$_WorkingHours_ = '';
}
if( $php_errormsg!='' ) die( eTrace('login_ser.gs:256 >>>> '.$php_errormsg.', '.__FILE__.', '.__LINE__) );
$IpUsuario	= trim($row['ip']);
$Ip2		= trim($row['ip2']);
$IpIni		= trim($row['ip_from']);
$IpFin		= trim($row['ip_to']);
$_ViewPassChange = $row['new_pass'];
$PcCodId = trim($row['pc_with_id']);
$PcTotal = trim($row['pc_total']);
qSelect('gs_node', 'permission,nm_gs_node,dt_del', "cd_gs_node='{$_Node}'");
$row = qArray();
$_NomNodo = strtoupper(trim($row['nm_gs_node']));
qFree();
if( $row['permission']!='S' ){
if($_TronEntradaON) error_log("35\n",3,$_TronEntrada);
_MensajeHTML( $__Lng[59] );
}
if( $row['dt_del']!='' && !isZero($row['dt_del']) ){
if( eSqlType("informix,oracle") ) $row['dt_del'] = eDateFormat($row['dt_del'], "F4", "d");
if( $row['dt_del']<date('Y-m-d') ){
if($_TronEntradaON) error_log("36\n",3,$_TronEntrada);
_MensajeHTML($__Lng[60]);
}
}
qSelect('gs_user', '*', "cd_gs_user={$_User}");
$_aUser = qArray();
qFree();
if($_TronLogin)	error_log("28\n", 3, $_TronFile);
if($_TronLogin)	error_log("29\n", 3, $_TronFile);
mt_srand((double)microtime()*1000000);
$session_id = md5(uniqid(mt_rand(),true));
$id = session_id();
$_sesion_ = $id;
if( !isset($_CacheSrv) ) $_CacheSrv = false;
if( !isset($_CachePc) ) $_CachePc = '';
if($_TronLogin)	error_log("30\n", 3, $_TronFile);
if( !empty($Parametro) ) $_SERVER['QUERY_STRING'] = substr($Parametro,1);
if($_TronLogin)	error_log("31\n", 3, $_TronFile);
list($xAncho, $xAlto, $xColor) = explode(',', $_SESSION["_Resolution_"]);
$_pxW_ = (int)$xAncho;
$_pxH_ = (int)$xAlto;
if($_TronLogin)	error_log("32\n", 3, $_TronFile);
$_Util['excel'] = $_SESSION['_XLS_'];
$_Util['xls'] = $_SESSION['_XLS_'];
$_Util['pdf'] = $_SESSION['_PDF_'];
$_Util['mdb'] = $_SESSION['_MDB_'];
$_Util['xml'] = $_SESSION['_XML_'];
$_Util['txt'] = $_SESSION['_TXT_'];
$_Util['csv'] = $_SESSION['_CSV_'];
$_Util['print'] = $_SESSION['_PRINT_'];
if( !isset($_G_) ) $_G_ = '';
$_IST_ = ((isset($_InstanceSrvType)) ? $_InstanceSrvType : -1);
$_SESSION['_LANGUAGE_SUFFIX'] = '_'.$_LANGUAGE_;
if( $_LANGUAGE_=='es' && qCount("{$_SESSION['ShareDictionary']}gs_language", "tf_translation='S'")==0 ) $_SESSION['_LANGUAGE_SUFFIX'] = '';
$_SESSION['_Node'] = $_Node;
$_SESSION['_User'] = $_User;
$_SESSION['_DT'] = $_DT;
$_SESSION['_pxH_'] = $_pxH_;
$_SESSION['_pxW_'] = $_pxW_;
$_SESSION['_AvisoStatus_'] = $_AvisoStatus_;
$_SESSION['_novedades_'] = $_novedades_;
$_SESSION['_CDI_'] = $_CDI_;
$_SESSION['_ALERTS_'] = $_ALERTS_;
$_SESSION['_WorkingHours_'] = $_WorkingHours_;
$_SESSION['_CacheSrv'] = $_CacheSrv;
$_SESSION['_CachePc'] = $_CachePc;
$_SESSION['_sesion_'] = $_sesion_;
$_SESSION['_notools_'] = $_notools_;
$_SESSION['_WebMaster'] = $_WebMaster;
$_SESSION['_LogUser_'] = $_LogUser_;
$_SESSION['_LogHistory_'] = $_LogHistory_;
$_SESSION['_InsertToSeek'] = $_InsertToSeek;
$_SESSION['_LANGUAGE_'] = $_LANGUAGE_;
$_SESSION['_DOC_'] = 0;
$_SESSION['_G_'] = $_G_;
$_SESSION['_IST_'] = $_IST_;
$_SESSION['_LoginUser'] = $_LoginUser;
$_SESSION['_Tree'] = $_Tree;
$_SESSION['_TreeList'] = $_TreeList;
$_SESSION['_iSql'] = $_Sql;
$_SESSION['_iSqlPDOType'] = $_SqlPDOType;
$_SESSION['_LANGUAGE_'] = $_LANGUAGE_;
$_SESSION['CONTEXTON'] = $_SETUP["Setup"]["ContextActivate"];
$_ChannelApplication = $_SETUP["Channel"]["Status"];
$_ChannelDevelopment = $_SETUP["ChannelDevelopment"]["Status"];
$_StartURL = $_SETUP["Setup"]["StartURL"];
$_SESSION['SessionMaxLife'] = date("U")+((($_SETUP["Setup"]["SessionMaxLife"]!="")? $_SETUP["Setup"]["SessionMaxLife"]:24)*3600);
$_SESSION['SessionResetMn'] = (($_SETUP["Setup"]["SessionReset"]!="")? $_SETUP["Setup"]["SessionReset"]: 5)*60;
$_SESSION['SessionReset'] = date("U")+$_SESSION['SessionResetMn'];
$_SESSION["_TimeZone"] = (($_SETUP["Setup"]["TimeZone"])!=""? $_SETUP["Setup"]["TimeZone"] : "Europe/Madrid");
date_default_timezone_set($_SESSION["_TimeZone"]);
ini_set('date.timezone', $_SESSION["_TimeZone"]);
if( !$_DesktopWepe ) ini_set('default_charset', $_SESSION["_Charset"]);
$_FormatMonth = $_SETUP["Setup"]["FormatMonth"];
$_FormatDate = $_SETUP["Setup"]["FormatDate"];
$_FormatDateTime = $_SETUP["Setup"]["FormatDateTime"];
$_FormatNumber = $_SETUP["Setup"]["FormatNumber"];
$_FormatPhone = $_SETUP["Setup"]["FormatPhone"];
$_FirstWeekDay = $_SETUP["Setup"]["FirstWeekDay"];
function _Simbiosis($cadena1, $cadena2){
$resto1 = preg_replace('/[\$0123456789]/','',$cadena1);
$resto2 = preg_replace('/[\$0123456789]/','',$cadena2);
if( strlen($resto1)!=strlen($resto2) ) return "";
$resto11 = str_replace(array("/", "-", "."), array(chr(92)."/", chr(92)."-", chr(92)."."), $resto1);
$dim = preg_split("/[{$resto11}]/", $cadena1);
$txt = "";
for($n=0; $n<count($dim); $n++) $txt .= $dim[$n].$resto2[$n];
return $txt;
}
function _genRegExp($prefijo, $db, $user){
$_SESSION["_Format{$prefijo}"] = $user;
$quitar = "ymdhis0123456789";
$deliDB = preg_replace("/([{$quitar}])/", "", $db);
$deliDBDiv = str_replace(array("/", "-"), array(chr(92)."/", chr(92)."-"), $deliDB);
$dimDB = preg_split("/[{$deliDBDiv}]/", $db);
$dimPos = array();
$deli = preg_replace("/([{$quitar}])/", "", $_SESSION["_Format{$prefijo}"]);
if( $deli!="" ){
$puntuacionDB = "";
$plantillaDB = "/";
$puntuacion = "";
$plantilla = "/";
$deliDiv = str_replace(array("/", "-", "."), array(chr(92)."/", chr(92)."-", chr(92)."."), $deli);
$dim = preg_split("/[{$deliDiv}]/", $_SESSION["_Format{$prefijo}"]);
for($n=0; $n<count($dim); $n++){
$plantilla .= "([0-9]{".strlen($dim[$n])."})";
$puntuacion .= '$'.($n+1).$deli[$n];
if( $prefijo<>"Phone" ){
for($i=0; $i<count($dimDB); $i++){
if( $dim[$n]==$dimDB[$i] ){
$puntuacionDB .= '$'.($i+1);
if( $n==(count($dim)-1) );
else if( $n<2 ) $puntuacionDB .= "-";
else if( $n==2 ) $puntuacionDB .= " ";
else if( $n<5 ) $puntuacionDB .= ":";
$dimPos[$i] = "([0-9]{".strlen($dimDB[$i])."})";
break;
}
}
}
}
$plantilla .= "/";
if( $prefijo<>"T" ){
for($n=0; $n<count($dimPos); $n++) $plantillaDB .= $dimPos[$n];
$plantillaDB .= "/";
}else{
$plantillaDB = $plantilla;
$puntuacionDB = $puntuacion;
}
}else{
if( $prefijo=="T" && $db==$user ){
$i = strlen($db);
$_SESSION["_Format{$prefijo}EXP"] = '/([0-9]{'.$i.'})/';
$_SESSION["_Format{$prefijo}TKN"] = '$1';
$_SESSION["_Format{$prefijo}EXPdb"] = '/([0-9]{'.$i.'})/';
$_SESSION["_Format{$prefijo}TKNdb"] = '$1';
$_SESSION["_Format{$prefijo}TKNuser"] = '$1';
return;
}
}
$puntuacion = trim($puntuacion);
$puntuacionDB = trim($puntuacionDB);
$_SESSION["_Format{$prefijo}EXP"] = $plantilla;
$_SESSION["_Format{$prefijo}TKN"] = $puntuacion;
$_SESSION["_Format{$prefijo}EXPdb"] = $plantillaDB;
$_SESSION["_Format{$prefijo}TKNdb"] = ($prefijo<>"T") ? $puntuacionDB : implode(preg_split("/[{$deliDiv}]/", $puntuacion),"");
$puntuD2U = _Simbiosis($puntuacionDB, $puntuacion);
$_SESSION["_Format{$prefijo}TKNuser"] = $puntuD2U;
}
function eDataSetup(){
global $_FormatMonth, $_FormatDate, $_FormatDateTime, $_FormatNumber, $_FormatPhone, $_FirstWeekDay;
_genRegExp("P4", "yyyy-mm", (isset($_FormatMonth))? strtolower($_FormatMonth) : "yyyy-mm");
_genRegExp("F4", "yyyy-mm-dd", (isset($_FormatDate))? strtolower($_FormatDate) : "dd-mm-yyyy");
_genRegExp("CDI", "yyyy-mm-dd hh:ii:ss", (isset($_FormatDateTime))? strtolower($_FormatDateTime) : "yyyy-mm-dd hh:ii:ss");
_genRegExp("T", "999999999", (isset($_FormatPhone))? $_FormatPhone : "999999999");
$_SESSION["_FormatNumber"] = (isset($_FormatNumber))? $_FormatNumber : ".,";
$pDate = trim(strtr($_SESSION["_FormatF4"], "dmy", "   "));
$pTime = trim(strtr($_SESSION["_FormatCDI"], "dmy his".$pDate[0], str_repeat(" ",8)));
$_SESSION["_FormatDelimiter"] = $pDate[0].$pTime[0];
$_SESSION["_FirstWeekDay"] = (isset($_FirstWeekDay) && preg_match('/^(0|1)$/',$_FirstWeekDay))? $_FirstWeekDay : 0;
}
eDataSetup();
clearstatcache();
$REMOTE_ADDR = (($_SERVER['HTTP_X_FORWARDED_FOR']=="") ? $_SERVER['REMOTE_ADDR'] : $_SERVER['HTTP_X_FORWARDED_FOR']);
if( $REMOTE_ADDR=="" ) $REMOTE_ADDR = $_SERVER['HTTP_HOST'];
$error = 'OK';
$_Reload = '';
if($_TronLogin)	error_log("33\n", 3, $_TronFile);
$sNom_gs_navegador	= $_SESSION["_Platform_"];
$sNombre			= $_SESSION["_Explorer_"];
$sResolucion		= $_SESSION["_Resolution_"];
$sVarios			= "";
if($_TronLogin)	error_log("33a\n", 3, $_TronFile);
if( $_HndDBSystem->qCount('gs_navegador', "nm_gs_navegador='{$sNom_gs_navegador}' and nombre='{$sNombre}' and resolucion='{$sResolucion}' and varios='{$sVarios}'")==0 ){
$_HndDBSystem->qQuery("insert into gs_navegador
(     nm_gs_navegador  ,     nombre  ,     resolucion  ,     varios) values
('{$sNom_gs_navegador}', '{$sNombre}', '{$sResolucion}', '{$sVarios}')" );
$xNavegador = $_HndDBSystem->qId();
}else{
$_HndDBSystem->qQuery("select cd_gs_navegador from gs_navegador where (nm_gs_navegador='{$sNom_gs_navegador}' and nombre='{$sNombre}' and resolucion='{$sResolucion}' and varios='{$sVarios}')");
$xNavegador = qRow();
$xNavegador = $xNavegador[0];
}
if($_TronLogin)	error_log("33b - "."id='{$id}'"."\n", 3, $_TronFile);
if($_TronLogin)	error_log("34\n", 3, $_TronFile);
$Pagina = $_SERVER['SCRIPT_FILENAME'];
$_HndDBSystem->qQuery("update gs_conexion set cd_gs_user='{$_User}', cd_gs_node='{$_Node}', cd_gs_tree='{$_Tree}' where conexion=".$_SESSION["_Connection_"]);
if( $_Estadistica ){
$_Connection_ = $_SESSION["_Connection_"];
$_HndDBSystem->qQuery("insert into gs_acceso
(cd_gs_toperacion,	    conexion	,    pagina  , parametro, registros, cd_gs_user, cd_gs_node,			cdi			   ) values
(   '{$error}'   , '{$_Connection_}', '{$Pagina}',    ''    ,     0    ,  {$_User} ,  {$_Node} , '".date('Y-m-d H:i:s')."' )");
}
if($_TronLogin)	error_log("35\n", 3, $_TronFile);
if($_TronLogin)	error_log("37\n", 3, $_TronFile);
function FormatoIP( $sIp ){
$sIp = trim(str_replace( ' ', '', $sIp ));
if( $sIp != '' ){
$tmp = explode( '.', $sIp );
$txt = '';
for( $n=0; $n<count($tmp); $n++ ){
$tmp[$n] = substr( '000'.$tmp[$n], -3 );
if( $txt != '' ) $txt .= '.';
$txt .= $tmp[$n];
}
$sIp = $txt;
}
return $sIp;
}
$IpSuma = $IpUsuario.$Ip2.$IpIni.$IpFin;
$IpAutorizada = false;
if( $IpSuma!='' ){
$IpUsuario	= FormatoIP($IpUsuario);
$Ip2		= FormatoIP($Ip2);
$IpIni		= FormatoIP($IpIni);
$IpFin		= FormatoIP($IpFin);
$RemoteAddr = FormatoIP($REMOTE_ADDR);
$Entrar = 0;
if( $IpUsuario	== $RemoteAddr ) $Entrar++;
if( $Ip2		== $RemoteAddr ) $Entrar++;
if( $RemoteAddr >= $IpIni && $RemoteAddr <= $IpFin ) $Entrar++;
if( $Entrar > 0 ) $IpAutorizada = true;
}
if($_TronLogin)	error_log("38\n", 3, $_TronFile);
if($_TronLogin)	error_log("39\n", 3, $_TronFile);
if( $IpSuma!='' && !$IpAutorizada ){
if($_TronEntradaON) error_log("46\n",3,$_TronEntrada);
_MensajeHTML( '24. '.$__Lng[66] );
}
if( filesize('../_datos/config/session.ini')>25 ){
include('../_datos/config/session.ini');
if( $php_errormsg!='' ){
if( $_gsTron ) eTron('session.ini: '.$php_errormsg);
die(eTrace('session.ini: '.$php_errormsg));
}
}
$tmp = explode(",", $_SESSION["_CACHEFILTER"]);
$txt = "";
for($n=0; $n<count($tmp); $n++) $txt .= $_SESSION[$tmp[$n]];
$_SESSION["_CACHEFILTER"] = $txt;
if($_TronLogin)	error_log("40\n", 3, $_TronFile);
if($_TronLogin)	error_log("41\n", 3, $_TronFile);
if( $_gsMaster!='' && substr_count('~AaMPHD',$_gsMaster)==0 ) exit;
if($_TronLogin)	error_log("42\n", 3, $_TronFile);
if( $_ViewPassChange>1 ){
$_ViewPassChange--;
sql_Modifica('gs_user', "new_pass={$_ViewPassChange}", "cd_gs_user={$_User}");
}
if($_TronLogin)	error_log("43\n", 3, $_TronFile);
if( isset($_PassDaysToChange) && $_PassDaysToChange>0 ){
if( qCount('gs_user',"cd_gs_user={$_User} and (dt_pass<'".date('Y-m-d', mktime(0,0,0, date('m'), date('d')-$_PassDaysToChange, date('Y')))."' or dt_pass is null or dt_pass='')")>0 ){
sql_Modifica('gs_user',"new_pass=1", "cd_gs_user={$_User}");
$_ViewPassChange = 1;
}
}
if($_TronLogin)	error_log("44\n", 3, $_TronFile);
$txt = '';
if( eFileGetVar('Login.HostGet') ) $txt = ", host='".$REMOTE_ADDR."'";
sql_Modifica('gs_user', "dt_access_last='".$Hoy."'{$txt}", "cd_gs_user={$_User}");
if($_TronLogin)	error_log("45\n", 3, $_TronFile);
if( file_exists('../_tmp/err/location.php') ){
if( !file_exists("../_tmp/err/{$_User}.ord") ){
include('../_tmp/err/location.php');
eEnd();
}
}
if($_TronLogin)	error_log("46\n", 3, $_TronFile);
if($_TronLogin)	error_log("47\n", 3, $_TronFile);
if( !isset($_Development) ) $_Development = false;
if( !isset($_Test) ) $_Test = false;
if( !isset($_ErrImg) ) $_ErrImg = false;
if( !isset($_DocSecurity) ) $_DocSecurity = false;
if($_TronLogin)	error_log("48\n", 3, $_TronFile);
$_ViewInfoNovedad = false;
$file = '../_datos/config/delfiles.cdi';
$fp = fopen($file, "r+");
if( flock($fp, LOCK_EX | LOCK_NB) ){
fwrite($fp, date('Y-m-d'));
include($Dir_.'del_fichero.inc');
BorraFicheros('../_d_', 1, 'dvl');
BorraFicheros('../_tmp', 7);
BorraFicheros('../_tmp/cch', 1);
BorraFicheros('../_tmp/exc', 7);
BorraFicheros('../_tmp/pdf', 1);
BorraFicheros('../_tmp/php', 1);
BorraFicheros('../_tmp/zip', 7);
BorraFicheros('../_tmp/lcl', 2);
BorraFicheros('../_tmp/sess', 2);
BorraFicheros('../_tmp/err', 30, 'png');
BorraFicheros('../_tmp/err', 15, 'bkg');
if( !isset($_DownloadPath) || $_DownloadPath=='' ) $_DownloadPath = '/_tmp/exp';
if( !isset($_DownloadDelete) || $_DownloadDelete=='' ) $_DownloadDelete = 5*365;
BorraFicheros(eScript($_DownloadPath), $_DownloadDelete);
if( substr_count($_DownloadPath, '/_tmp/exp')==0 ){
BorraFicheros('../_tmp/exp', 7);
}
BorraFicheros('../_tmp/log', 1);
$n = eFileGetVar('/_d_/cfg/edes.ini->$_nDaily');
if( gettype($n)=="array" ) $n = 7;
BorraFicheros('../_bak_/_daily', $n*1);
if( $_SESSION["LogFileDays"]>0 ){
$HastaCDI = date('Y-m-d H:i:s', mktime(date('H'), date('i'), date('s'), date('m'), date('d')-$_SESSION["LogFileDays"], date('Y')));
if( qCount('gs_acceso', "objeto='D' and cdi<'{$HastaCDI}'")>0 ){
$tmp = $_SESSION["LogFileDownload"];
if( substr($tmp,-1)!='/' ) $tmp .= '/';
qQuery("select num_acceso,cdi from gs_acceso where objeto='D' and cdi<'{$HastaCDI}'");
while( $row=qRow() ) @unlink($tmp.$row[0].'.zip');
qQuery("delete from gs_acceso where objeto='D' and cdi<'{$HastaCDI}'");
}
}
if( $_SESSION["LogGsAccessDays"]>0 ){
qQuery("delete from gs_acceso where cdi<'".date('Y-m-d H:i:s',mktime(0,0,0, gmdate('m'), gmdate('d')-$_SESSION["LogGsAccessDays"], gmdate('Y')))."'");
}
if( $_SESSION["LogGsErrorDays"]>0 ){
qQuery("delete from {$_SESSION['ShareDictionary']}gs_error where cdi<'".date('Y-m-d H:i:s',mktime(0,0,0, gmdate('m'), gmdate('d')-$_SESSION["LogGsErrorDays"], gmdate('Y')))."'");
}
if( $_SESSION["LogGsConnectionsDays"]>0 ){
qQuery("delete from gs_conexion where cdi<'".date('Y-m-d H:i:s',mktime(0,0,0, gmdate('m'), gmdate('d')-$_SESSION["LogGsConnectionsDays"], gmdate('Y')))."'");
}
if( $_SESSION['CONTEXTON'] ){
if( !$_HndDBSystem ) qConnectSystem();
$_HndDBSystem->qQuery("select max(conexion) from gs_conexion where cdi<'".date('Y-m-d 00:00:00',mktime(0,0,0, gmdate('m'), gmdate('d')-1, gmdate('Y')))."'");
list($MaxConexion) = $_HndDBSystem->qRow();
if( $MaxConexion>0 ) $_HndDBSystem->qQuery("delete from gs_context where cd_gs_conexion<{$MaxConexion}");
}
$extErrDel = date('ym', mktime(12,0,0, gmdate('m')-4, gmdate('d'), gmdate('Y')));
$extErr = date('ym', mktime(12,0,0, gmdate('m')-1, gmdate('d'), gmdate('Y')));
$rutaErr = '../_tmp/err/_log.';
if( !file_exists($rutaErr.$extFile) && file_exists($rutaErr.'err') ){
rename($rutaErr.'err', $rutaErr.$extErr);
@unlink($rutaErr.$extErrDel);
}
$rutaErr = '../_tmp/err/_log_short.';
if( !file_exists($rutaErr.$extFile) && file_exists($rutaErr.'err') ){
rename($rutaErr.'err', $rutaErr.$extErr);
@unlink($rutaErr.$extErrDel);
}
if( $_SESSION["LogFileDays"]>0 ){
$HastaCDI = date('Y-m-d H:i:s', mktime( date('H'), date('i'), date('s'), date('m'), date('d')-$_SESSION["LogFileDays"], date('Y')));
if( qCount('gs_acceso', "objeto='D' and cdi<'{$HastaCDI}'" )>0 ){
$tmp = $_SESSION["LogFileDownload"];
if( substr($tmp,-1)!='/' ) $tmp .= '/';
qQuery("select num_acceso,cdi from gs_acceso where objeto='D' and cdi<'{$HastaCDI}'");
while( $row=qRow() ) @unlink($tmp.$row[0].'.zip');
qQuery("delete from gs_acceso where objeto='D' and cdi<'{$HastaCDI}'");
}
}
if( file_exists('../_datos/config/system_sql.log') ){
$fp = fopen('../_datos/config/system_sql.log','r');
if( !($fp===false) ){
if( flock($fp,LOCK_EX) ){  // bloqueo exclusivo - ...ojo... poder distingir entre ddbb: MySql, Informix, Oracle
$CDI = trim(file_get_contents('../_datos/config/system_sql.cdi'));
$Dim = explode("\n",fread($fp,filesize('../_datos/config/system_sql.log')));
for($n=0; $n<count($Dim); $n++){
if( trim($Dim[$n])!='' ){
$Dim[$n] = trim($Dim[$n]);
$oCDI = trim(substr( $Dim[$n], 0, 19 ));
$txt = trim(substr( $Dim[$n], 20 ));
if( $oCDI>$CDI ){
error_log(date('Y-m-d H:i:s').' [SystemIni] '.$txt."\n", 3, '../_datos/config/system_trace.log');
qQuery($txt);
error_log("[SystemEnd]\n", 3, '../_datos/config/system_trace.log');
file_put_contents('../_datos/config/system_sql.cdi', $oCDI);
clearstatcache();
}
}
}
flock($fp,LOCK_UN);    // libera el bloqueo
fclose($fp);
}
}
}
flock($fp, LOCK_UN);    // libera el bloqueo
}
fclose($fp);
if( !file_exists($file) ) file_put_contents($file, date('Y-m-d'));
if($_TronLogin)	error_log("50\n", 3, $_TronFile);
if($_TronLogin)	error_log("51\n", 3, $_TronFile);
function _EsUnSubTree( $NomArbol, $nNewTree ){
qQuery( "select filename,permission from {$_SESSION['ShareDictionary']}gs_tree where cd_gs_tree='{$nNewTree}'", $pntT );
list( $NewNomTree, $ConPermiso ) = qRow($pntT);
$NewNomTree = trim($NewNomTree);
if( $NewNomTree=='' || $ConPermiso<>'S' ) return '';
$oTree = file('../tree/'.$NomArbol);
$nTree = file('../tree/'.$NewNomTree);
if( count($oTree)<count($nTree) ) return '';
$oTOp = count($oTree);
$nTOp = count($nTree);
$oDesde = 0;
for($n=0; $n<$nTOp; $n++ ){
$EstaIncluido = false;
for($o=$oDesde; $o<$oTOp; $o++ ){
if( $oTree[$o]==$nTree[$n] ){
$EstaIncluido = true;
$oDesde = $o+1;
break;
}
}
if( !$EstaIncluido ){
return '';
break;
}
}
return $NewNomTree;
}
function _LngLoad( $File ){
$tmp = file( $File.'.lng' );
list(,$Lngs) = explode(']',$tmp[0]);
list($Lngs) = explode('|',$Lngs);
$tmp4 = explode( ',', trim(str_replace(' ','',$Lngs)) );
for( $i=0; $i<count($tmp4); $i++ ){
$tmp4[$i] = trim($tmp4[$i]);
if( $tmp4[$i]==$_SESSION['_LANGUAGE_'] ){
$uCol = $i+1;
}
if( $tmp4[$i]==$_SESSION['_LanguageDefault'] ){
$dCol = $i+1;
}
}
$Dim = array();
$mk = 0;
for( $n=1; $n<count($tmp); $n++ ){
$tmp2 = explode('|',$tmp[$n]);
$k = $tmp2[0];
$txt = trim($tmp2[$uCol]);
if( $txt=='' ) $txt = trim($tmp2[$dCol]);
$v = str_replace('"','&quot;',trim($txt));
$k = $k*1;
$mk = max( $mk, $k );
$Dim[$k] = $v;
}
$txt = ''; for( $n=0; $n<$mk+1; $n++ ) $txt .= $Dim[$n].'|';
return $txt;
}
function eScript($File, &$Bak=NULL, &$EsEdes=NULL){
global $Dir_;
$File = str_replace('\\', '/', trim($File));
if( substr_count($File, "/etc/")>0 ){
eInit();
exit;
}
$EsEdes = false;
while( substr_count( $File, '../../' )>0 ) $File = str_replace('../../', '../', $File);
while( substr_count( $File, '/edesweb/')>0 ) $File = str_replace('/edesweb/', '/', $File);
if( substr_count('~AM',$_SESSION['_D_'])==0 ){
while( substr_count( $File, '/sql.ini' ) > 0 ) $File = str_replace('/sql.ini', '/', $File);
}
switch( $File[0] ){
case '/':
case '.':
if( substr($File,0,2)=='//' || substr($File,0,2)=='./' ){
$tmp = explode('/',$_SERVER['SCRIPT_FILENAME']);
$DirFile = '';
for( $n=1; $n<count($tmp)-2; $n++ ) $DirFile .= '/'.$tmp[$n];
$Bak .= $DirFile.'/_bak_.file/'.substr($File,2);
$DirFile .= '.file/'.substr($File,2);
$File = $DirFile;
}elseif( substr($File,0,11)=='/_doc_/edf/' ){
$tmp = explode( '/',$File);
$Bak = '../_bak_'.$File;
$File  = '..'.$File;
}else{
$Bak = '../_bak_'.$File;
$File = '..'.$File;
}
break;
case '$':
$File = $Dir_.substr($File,1);
$tmp = explode('/',$File);
$Bak  = $Dir_.'m/_bak_/'.$tmp[count($tmp)-1];
$EsEdes = true;
break;
case '^':
case '>':
$File = substr($File,1);
break;
case '?':
$File = substr($File,1);
if( substr($File,-1)!='/' ) $File .= '/';
$Dir = eScript($File);
$DirRoot = eGetCWD();
if( substr($DirRoot,-1)!='/' ) $DirRoot .= '/';
$Sumar = false;
if( substr($Dir,0,3)=='../' ){
$DirRoot = substr($DirRoot,0,strrpos($DirRoot,'/'));
$DirRoot = substr($DirRoot,0,strrpos($DirRoot,'/'));
$Dir = substr($Dir,2);
$Sumar = true;
}
if( $Sumar ){
$File = $DirRoot.$Dir;
}else{
$File = $Dir;
}
break;
case '*':
$txt = explode( '/', str_replace( chr(92), '/', substr($File,1) ) );
$File = '../../'.substr($File,1);
if( !file_exists('../../'.$txt[0].'/http/edes.php') ) eEnd('ERROR:32Q');
return $File;
case '=':
while( substr_count($File, '../')>0 ) $File = str_replace('../', '', $File);
if( $File[0]=="/" ) $File = substr($File,1);
$File = "../../".substr($File,1);
break;
case '%':
while( substr_count($File, '../')>0 ) $File = str_replace('../', '', $File);
if( $File[0]=="/" ) $File = substr($File,1);
$File = "../../wp/".substr($File,1);
break;
default:
$Bak = '../_bak_/d/'.$File;
$File = '../d/'.$File;
}
$Bak = trim($Bak);
return str_replace('....', '..', trim($File));
}
function _LoadSqlIni($_Diccionario, $TipoDB=''){
global $Dir_, $_gsTron;
if( $_Diccionario=='_') return;
$txt = trim(@file_get_contents( $_Diccionario ));
if( substr($txt,0,2)!='<'.'?' ){
return gzuncompress($txt);
}else{
return substr($txt, ((strtoupper(substr($txt,0,5))=='<'.'?PHP') ? 5 : 2), -2);
}
}
function _ShowError($xErrorMsg, $tmpFile, $LenDoc=0, $Macro='', $EditFile=''){
global $php_errormsg, $_Include, $_TmpInclude;
error_reporting(_ERROR_REPORTING);
ini_set('track_errors', false);
if( $php_errormsg=='' && $xErrorMsg=='' ){
if( substr_count($tmpFile,'/_tmp/')==1 ) @unlink($tmpFile);
$_Include = "";
$_TmpInclude = "";
return;
}
chdir($GLOBALS['_CURRENT_PATH']);
if( $php_errormsg=='' ) $php_errormsg = $xErrorMsg;
global $Opcion, $OriFichero, $_User, $_Sql, $_Script_, $TipoEntrada, $nDimFCH;
global $__EVAL__, $__eLINE__, $__iSCRIPT__, $__iniSCRIPT__, $_CALL, $__DIR__, $Dir_;
if( $EditFile!='' ) $OriFichero = $EditFile;
$_User *= 1;
$ErrorLinea = 0;
if( substr_count($_Include,'_')==1 ) list( ,$_Include ) = explode('_',$_Include);
if( $LenDoc==0 ){
$TxtError = $php_errormsg;
}else if( trim($php_errormsg)!='' ){
$TxtError = $php_errormsg;
}else{
$TxtError = trim(substr(ob_get_contents(), $LenDoc));
if( $TxtError=='' || strlen($TxtError)>100 && substr_count( $TxtError, 'on line <b>' )==0) $TxtError = $php_errormsg;
if( strlen(trim($TxtError))==0 ) $TxtError = $php_errormsg;
}
$Cdi = date('Y-m-d H:i:s');
$CodErr = chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90));
$xTexto = ' ';
eInit();
echo '<'.'!-- ERROR EN PHP --'.'>';
if( $tmpFile=='_eval_' ){
$TxtError = $__EVAL__;
$xTexto = trim(str_replace("'",'"',$__EVAL__));
$LogTxt = $Cdi."\r\n".
"\tUSER...: ".$_User."\r\n".
"\tQUERY..: ".$_SERVER['REQUEST_URI']."\r\n".
"\tERROR..: ".$CodErr.': '.$TxtError."\r\n";
error_log($LogTxt."\r\n", 3, '../_tmp/err/_log.err');
echo '<html><head><title>SOURCE</title></head><body style="display:inline-table">';
echo '<script type="text/javascript">if(window.frameElement.MODAL!=undefined) top.ShowCallSrv();</SCRIPT>';
echo '<script type="text/javascript">if(top.eIsWindow(window)) top.eSWView(window);</SCRIPT>';
echo '<pre>';
if( $_SESSION['_D_']!='' ){
echo '<span style="color:red;">Error en Macro: </span>'.htmlspecialchars($__EVAL__).'';
}else{
echo '<span style="color:red;"> ERROR INTERNO "'.$CodErr.'"</span>';
}
echo '<br><span style="color:red;">Script........: </span>'.$_Script_.' <span style="color:red;">Nº Linea: </span>'.($nDimFCH+1);
if( $TipoEntrada!='#' ) echo '<br><span style="color:red;">Label.........: </span>['.substr($TipoEntrada,1).']';
echo '<br><B>QUERY:</B> '.$_SERVER['QUERY_STRING'];
if( $_Include!='' ){
echo '<br><B>ULTIMO INCLUDE:</B> '.$_Include;
if( $_Include!=$__iniSCRIPT__ ) echo ' - Error en la carga';
}
$n=0;
echo '<br><B>GET:</B>'; foreach($_GET as $k=>$v){
echo '<br> &nbsp; '.$k.': '.$v;
if( $n==0 ) $sGET = $k;
$n++;
}
echo '<br><B>POST:</B>'; foreach($_POST as $k=>$v) echo '<br> &nbsp; '.$k.': '.$v;
echo '</pre>';
KeyEditFile( $OriFichero );
echo '</body></html>';
}else{
if( $Macro=='' ){
if( file_exists($tmpFile) ) show_source($tmpFile);
}else{
$_Include = substr($tmpFile,1);
echo $Macro;
}
$FilePHP = ob_get_contents();
eInit();
$FilePHP = str_replace( '<br />', '<br>', $FilePHP );
$Dim = explode('<br>',$FilePHP);
$DimFuente = @file( $_TmpInclude.'.php' );
$Dim = array_merge( $Dim, $DimFuente );
if( substr_count( $TxtError, ' on line <b>' ) > 0 ){
list( ,$ErrorLinea ) = explode('on line <b>',$TxtError);
list( $ErrorLinea ) = explode('<',$ErrorLinea);
$ErrorLinea = (int)$ErrorLinea;
$tmp = explode('/',$tmpFile);
list( $Dir ) = explode($tmp[count($tmp)-1],$TxtError);
$NomFile = substr( $Dir, strrpos($Dir,'>')+1).$tmp[count($tmp)-1];
$xError = trim(str_replace($NomFile,'"['.strtoupper($_Include).'] '.$Opcion.'"',strip_tags($TxtError)));
}else{
$xError = '"['.strtoupper($_Include).'] '.$Opcion.'" '.strip_tags($TxtError);
}
$xError = str_replace('\\','/',$xError);
if( $_SESSION['_D_']!='' ){
echo '<html><head><title>SOURCE</title><style>A:visited,A:link,A:active,A:hover{color:red;}</style>';
echo '<script type="text/javascript">if(window.frameElement.MODAL!=undefined) top.ShowCallSrv();</SCRIPT>';
echo '<script type="text/javascript">if(top.eIsWindow(window)) top.eSWView(window);</SCRIPT>';
echo '</head><body scroll=auto style="display:inline-table">';
echo '<code>';
echo '<span style="color:red;">Script........: </span>'.$_Script_.' <span style="color:red;">Nº Linea: </span>'.($nDimFCH+1);
if( $TipoEntrada!='#' ) echo '<br><span style="color:red;">Label.........: </span>['.substr($TipoEntrada,1).']';
echo '<br><B>QUERY:</B> '.$_SERVER['QUERY_STRING'];
if( $_Include!='' ){
echo '<br><B>ULTIMO INCLUDE:</B> '.$_Include;
if( $_Include!=$__iniSCRIPT__ ) echo ' - Error en la carga.';
}
$n=0;
echo '<br><B>GET:</B>'; foreach( $_GET as $k=>$v ){
echo '<br> &nbsp; '.$k.': '.$v;
if( $n==0 ) $sGET = $k;
$n++;
}
echo '<br><B>POST:</B>'; foreach( $_POST as $k=>$v ) echo '<br> &nbsp; '.$k.': '.$v;
$Ini = 0;
if( $Dim[0]=='<!-- ERROR EN PHP -->' ) $Ini++;
if( substr($Dim[1],0,23)=='<'.'?PHP $__iniSCRIPT__ = ' ) $Ini++;
if( $__eLINE__!='' ) echo '[ $__eLINE__ = '.($__eLINE__-$Ini).' ]';
echo '<hr>';
list($sGET) = explode("&",$_SERVER['QUERY_STRING']);
$oTmp = '';
$eDim = explode(' ',$xError);
if( is_numeric($eDim[count($eDim)-1]) && $eDim[count($eDim)-2]=='line' && $eDim[count($eDim)-3]=='on' && substr($eDim[count($eDim)-4],-4)=='.tmp' ){
$oTmp = str_replace('\\','/',$eDim[count($eDim)-4]);
$oTmp = str_replace( substr($__DIR__,0,-5), '', $oTmp );
if( !file_exists($tmpFile) ){
list( $xMode, $xFile ) = explode(':',$sGET);
$OriFichero = $xFile;
if( substr_count($OriFichero,'.')==0 ) $OriFichero .=  (( $xMode[0]=='G' ) ? '.gdf':'.edf');
}
}
if( $__EVAL__!='' ) echo '<B>ERROR EN EVAL:</B> '.$__EVAL__.'<br>';
echo '<span style="color:red;"><A HREF="#ERROR" id=kError onclick=EditTmp("'.$_TmpInclude.'")> '.$xError.'</A></span><BR>';
$LongNLinea = strlen((string)count($Dim));
for( $n=$Ini; $n<count($Dim); $n++ ){
$Dim[$n] = rtrim($Dim[$n]);
$Dim[$n] = htmlentities( $Dim[$n] );
if( $ErrorLinea==$n+1 ){
echo '<A NAME="ERROR"><B style="border: 1px solid red; olor:#9900FF">&nbsp;'.str_pad($n+1-$Ini,$LongNLinea,'0',STR_PAD_LEFT).': ';
echo $Dim[$n].' </B><br></A>';
}else{
echo '<font color="#9900FF">&nbsp;'.str_pad($n+1-$Ini,$LongNLinea,'0',STR_PAD_LEFT).'</font>: ';
echo $Dim[$n].'<br>';
}
}
echo '</code>';
$xTexto = $xError;
if( $_TmpInclude!="" ){
KeyEditFile( $_TmpInclude );
}else{
KeyEditFile( $GLOBALS["OriFichero"] );
}
if( $_SESSION['_D_']=='~' ){
echo '<hr><pre>';
debug_print_backtrace();
echo '</pre><hr><pre>';
print_r(debug_backtrace());
echo '</pre><hr>';
}
}else{
global $_Sql, $OriFichero, $_HndDB;
$TxtError = trim(strip_tags($xError));
$LogTxt = $Cdi."\r\n".
"\tUSER...: ".$_User."\r\n".
"\tQUERY..: ".$_SERVER['REQUEST_URI']."\r\n".
"\tERROR..: ".$CodErr.': '.$TxtError."\r\n";
error_log($LogTxt."\r\n", 3, '../_tmp/err/_log.err');
echo '<script type="text/javascript">if(window.frameElement.MODAL!=undefined) top.ShowCallSrv();if(top.eIsWindow(window)) top.eSWView(window);</SCRIPT>';
echo '<span style="color:red;"> ERROR INTERNO "'.$CodErr.'"</span>';
}
}
$xTexto = eEntityEncode($xTexto);
$TxtError = eEntityEncode($TxtError);
if( !function_exists('sql_Query') ){
global $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOType, $_SqlInit, $_SqlPDOConnect;
}else{
global $_HndDB;
if( $_HndDB===false ) qConnect();
}
$_Include = '';
if( eSqlType('informix') ){
global $DimText;
$DimText[] = ifx_create_blob(1, 0, $TxtError);
$sql = "insert into {$_SESSION['ShareDictionary']}gs_error (cdi,cd_gs_user,tipo,desde,fichero,linea,texto,trace) values ('{$Cdi}', '{$_User}', 'P', 'PHP', '{$OriFichero}', {$ErrorLinea}, $xTexto, ?)";
ifx_query($sql, $_HndDB, $DimText);
}else{
sql_Inserta("{$_SESSION['ShareDictionary']}gs_error", 'cdi,cd_gs_user,tipo,desde,fichero,linea,texto,trace',			  "'{$Cdi}', '{$_User}', 'P', 'PHP', '{$OriFichero}', {$ErrorLinea}, '{$xTexto}', '{$TxtError}'", 'codigo');
}
$Id = qId();
?>
<script type="text/javascript">
function Ini(){
top.eLoading(false,window);
var ID = new Date().getTime();
}
setTimeout('Ini()',100);
</script>
</body></html>
<?PHP
$_Include = '';
if( $_CALL ){
file_put_contents( $__DIR__.'/../_tmp/log/'.$_User.'.htm', ob_get_contents() );
}
eEnd();
}
function eInit($ConEdes=false, $ConCabecera=false){
ob_end_clean(); ob_start();
_HeaderAdd();
if( $ConEdes || $ConCabecera ){
$txt = $GLOBALS["_SourceScript"];
if( $txt=="" ) $txt = $GLOBALS["_Script_"];
if( $txt<>"" ){
if( substr($txt,0,5)=="../d/" ) $txt = substr($txt,5);
}
eHTML($txt);
}
if( $ConEdes ) _FileNoCache('edes.js');
if( isset( $GLOBALS['_gsTRACE'] ) ){
global $_gsTRACE;
for($i=0; $i<count($_gsTRACE); $i++) echo '<span style="font-family:monospace; font-size:12px; color:#00009C;background:#D6DFE7;"><B>:'.htmlspecialchars($_gsTRACE[$i]).'</B></span><br>';
}
}
function eEnd($MsgError=''){
global $_DEBUG, $_Development, $_HndDB, $_HndDBSystem, $_SessionCopy, $_SqlStart, $_SqlStartSystem, $_LOGREQUEST, $_LOGANSWER, $_LOGFULLSTATUS, $_LOGFULLTYPE, $_Mode, $_D_, $_User;
$_User = $_SESSION['_User']*1;
$_D_ = $_SESSION['_D_'];
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:1");
if( $_SqlStart ){
$_SqlStart = false;
if( $_LOGFULLSTATUS && $_LOGFULLTYPE==1 ){
$_LOGFULLSTATUS = preg_match('/(A|mR|M|bR|B)/', $_Mode);
}
if( $_LOGFULLSTATUS && $_LOGFULLTYPE>0 and !preg_match('/(\$a\/d\/logfull.edf|\$t\/ed.gs)/', $_LOGREQUEST["script"]) ){
foreach($_LOGREQUEST as $k=>$v){
if( gettype($v)=="array" ){
foreach($_LOGREQUEST[$k] as $k2=>$v2){
if( gettype($v2)=="array" ){
foreach($_LOGREQUEST[$k][$k2] as $k3=>$v3){
$_LOGREQUEST[$k][$k2][$k3] = utf8_encode(eEntityEncode($v3));
}
}else{
$_LOGREQUEST[$k][$k2] = utf8_encode(eEntityEncode($v2));
}
}
}else{
$_LOGREQUEST[$k] = utf8_encode(eEntityEncode($v));
}
}
foreach($_LOGANSWER as $k=>$v){
if( gettype($v)=="array" ){
foreach($_LOGANSWER[$k] as $k2=>$v2){
if( gettype($v2)=="array" ){
foreach($_LOGANSWER[$k][$k2] as $k3=>$v3){
$_LOGANSWER[$k][$k2][$k3] = utf8_encode(eEntityEncode($v3));
}
}else{
$_LOGANSWER[$k][$k2] = utf8_encode(eEntityEncode($v2));
}
}
}else{
$_LOGANSWER[$k] = utf8_encode(eEntityEncode($v));
}
}
$_LOGREQUEST = addslashes($_LOGREQUEST);
$_LOGREQUEST = json_encode($_LOGREQUEST);
if( json_last_error()!=JSON_ERROR_NONE ){
eInit();die("Error en JSON _LOGREQUEST: ".json_last_error());
}
$_LOGANSWER = addslashes($_LOGANSWER);
$_LOGANSWER = json_encode($_LOGANSWER);
if( json_last_error()!=JSON_ERROR_NONE ){
eInit();die("Error en JSON _LOGANSWER: ".json_last_error());
}
qQuery("insert into gs_logfull (cd_gs_user, request, answer) values ({$_User}, '{$_LOGREQUEST}', '{$_LOGANSWER}')");
}
qEnd();
}
if( $MsgError!='' ){
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:5");
eInit();
eError($MsgError);
$MsgError = eEntityEncode($MsgError);
die("<script type='text/javascript'>top.S.error('ERROR CRITICO<br><br>{$MsgError}');</script>");
}
if( $_DEBUG==31 ) file_put_contents('../_tmp/log/'.$_User.'_'.date('dHis').'.htm', ob_get_contents());
if( $_D_!='' && preg_match('/edes.php\?(F|G|L):\$/', $_SERVER["REQUEST_URI"]) ){
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:6");
$txt = $GLOBALS["_SourceScript"];
if( $txt=="" ) $txt = $GLOBALS["_Script_"];
file_put_contents('../_tmp/log/'.$_User.'_'.str_replace(array('/',':'),array('_','_'),$txt), ob_get_contents());
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ){
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:7");
include_once($Dir_."itm/spider.php");
__SpiderSaveHtml($txt);
}
}
if( $_DEBUG==9 ){
global $_DimDebug;
echo "\n<div>";
for($i=0; $i<count($_DimDebug); $i++){
if( substr($_DimDebug[$i],0,3)=='[#]' ){
echo '</div><BR>'.'<div style="background:#D6DFE7;border:1px solid #00009C; text-align:left;font-size:12px"><A HREF="javascript:{}">';
eTrace($_DimDebug[$i]);
echo '</A>';
}else{
eTrace($_DimDebug[$i], 1);
}
}
echo '</div>';
echo '<SCRIPT type="text/javascript">setTimeout("document.body.scrollTop=document.body.scrollHeight;",500);</SCRIPT>';
}else if( $_DEBUG==11 ){
global $_DimDebug;
for($i=0; $i<count($_DimDebug); $i++) eTron($_DimDebug[$i]);
}
if( isset($_SESSION['_SP_']) ) echo '<SCRIPT type="text/javascript">top.eInfo(window,"~ AVISO: Ejecutando DDBB de Procesos ~",-1);</SCRIPT>';
if( $_POST["_FIELDSWITHFILES"]!='' ){
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:8");
_FileDeleteTemp();
}
if( $_SessionCopy && $_SESSION["_sesion_"]!="" ){
$sg = date("U");
if( $_SESSION['SessionReset']<$sg ){
$_SESSION['SessionReset'] = $sg+$_SESSION['SessionResetMn'];
}
if( $GLOBALS["_SessionMD5"]!=md5(serialize($_SESSION)) ){
$file = 'sess_'.$_COOKIE["PHPSESSID"];
session_write_close();
file_put_contents("../_tmp/sess/{$file}", serialize($_SESSION));
}
}
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:9");
if( $_DEBUG==7 || $_Development ){
EnviaGZip(0,true);
}else if( $GLOBALS['_CachearPag'] ){
EnviaGZip(1,false);
}else{
EnviaGZip(9,false);
}
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:10");
}
function EnviaGZip($level=1, $debug=false){
global $_LogUsuario, $_User, $_D_, $_DEBUG, $php_errormsg, $_CompressedPages;
if( !isset($_CompressedPages) ) $_CompressedPages = true;
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:11");
if( $_CompressedPages && !$debug ){
$ENCODING = TieneGZip();
if( $ENCODING ) $Contents = ob_get_contents();
}
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:12");
if( $php_errormsg!='' ) exit;
if( $_SESSION['_D_']!='' ) include( $GLOBALS['Dir_'].'t/source.inc' );
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:13");
if( $_CompressedPages && $ENCODING && !$debug ){
ob_end_clean();
header("Content-Encoding: {$ENCODING}");
print "\x1f\x8b\x08\x00\x00\x00\x00\x00";
$Size = strlen($Contents);
$Crc = crc32($Contents);
$Contents = gzcompress($Contents, $level);
$Contents = substr($Contents, 0, strlen($Contents)-4);
print $Contents;
print pack('V',$Crc);
print pack('V',$Size);
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:14");
if( isset($_LogUsuario) && in_array($_User, $_LogUsuario) ){
$fd = fopen('../_tmp/log/'.date('dHis').'.'.$_User, 'w');
fwrite($fd, "\x1f\x8b\x08\x00\x00\x00\x00\x00".$Contents.pack('V',$Crc).pack('V',$Size));
fclose($fd);
}
}else{
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:15");
if( isset($_LogUsuario) && in_array($_User, $_LogUsuario) ){
$fd = fopen('../_tmp/log/'.date('dHis').'.'.$_User, 'w');
fwrite($fd, ob_get_contents());
fclose($fd);
}
}
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:16");
if( $_CompressedPages ) while(ob_get_level()>0) ob_end_flush();
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:17");
if( $_DEBUG==4 ) eLogDebug("HTML End");
if( isset($_GET['_DEBUG']) && $_GET['_DEBUG']==99 ) file_put_contents('_debug_end.txt','PHP End '.date('H:i:s').substr(microtime(),1,7));
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:18");
if( isset($_SESSION['SessionMaxLife']) && $_SESSION['SessionMaxLife']<date("U") ){
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:19");
eTron("sessión borrada: ".$_SESSION["_sesion_"]." | ".$_SESSION['SessionMaxLife']." < ".date("U") );
@unlink("../_tmp/sess/sess_".$_SESSION["_sesion_"]);
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:20");
$_SESSION = array();
session_destroy();
}
if( $_SESSION['_TRON_'] ) eTron(date('His: ')."eEnd:END");
exit;
}
function qConnectSystem($GetPuntero=false){
global $_HndDBSystem, $_Sql;
if( !isset($_SESSION['_iSql']) ) $_SESSION['_iSql'] = $_Sql;
switch( $_SESSION['_iSql'] ){
case 'mysql':
eInclude('mysql.class');
if( $GetPuntero ) return new eMySql();
$_HndDBSystem = new eMySql();
break;
case 'mysqli':
eInclude('mysqli.class');
if( $GetPuntero ) return new eMySqli();
$_HndDBSystem = new eMySqli();
break;
case 'informix':
eInclude('informix.class');
if( $GetPuntero ) return new eInformix();
$_HndDBSystem = new eInformix();
break;
case 'oracle':
eInclude('oracle.class');
if( $GetPuntero ) return new eOracle();
$_HndDBSystem = new eOracle();
break;
case 'pdo':
eInclude('pdo.class');
if( $GetPuntero ) return new ePdo();
$_HndDBSystem = new ePdo();
break;
}
$_HndDBSystem->qConnect('sql');
}
function eInclude(){
global $Dir_;
error_reporting(_ERROR_REPORTING);
for($i=0; $i<func_num_args(); $i++){
$File = strtolower(func_get_arg($i));
if( $_SERVER['HTTP_HOST']=="localhost" && file_exists($Dir_."{$File}.enc") ){
if( !function_exists("_zipSource") ) include_once($Dir_."itm/zipsource.php");
$txt = _zipSource($Dir_."{$File}.enc");
$txt = gzcompress($txt, 6);
file_put_contents($Dir_."{$File}.enz", substr($txt,18).substr($txt,0,18));
}
if( file_exists($Dir_."{$File}.enz") ){
$txt = file_get_contents($Dir_."{$File}.enz");
eval(gzuncompress(substr($txt,-18).substr($txt,0,-18)));
continue;
}
if( !strstr($File,'.') || (substr($File,-6)=='.class' && substr_count($File,'.')==1) ){
$File .= '.inc';
include_once($Dir_.$File);
}else{
include_once(eScript($File));
}
}
}
function _HeaderAdd(){
$charset = $_SESSION["_Charset"];
header("Content-Type: text/html; charset={$charset}");
}
function eTrace($para="", $Alert=false, $Caja=''){
if( !isset($GLOBALS['_gsTRACE']) ) global $_gsTRACE;
$Contenido = strtoupper(ob_get_contents());
$t = substr_count($Contenido, '<SCRIPT');
$pIni = -1;
for($n=0; $n<$t; $n++) $pIni = strpos($Contenido, '<SCRIPT', $pIni+1);
$t = substr_count($Contenido, '</SCRIPT>');
$pFin = -1;
for($n=0; $n<$t; $n++) $pFin = strpos($Contenido, '</SCRIPT>', $pFin+1);
$ConJS = ($pIni>$pFin);
if( gettype($para)!="array" ) $para = array($para);
for($n=0; $n<count($para); $n++){
$txt = $para[$n];
if( $Caja!='' ) $txt = '['.$txt.']';
$_gsTRACE[] = $txt;
echo "\n";
if( $ConJS ){
$txt = str_replace(array('"',"\n", chr(10), chr(13)), array("'",'<br>','<br>','<br>'), $txt);
if( $Alert ){
echo 'alert("'.$txt.'");';
}else{
echo 'document.write("<span style=\"font-family:monospace; font-size:12px; color:#00009C;background:#D6DFE7;\"><B>&nbsp;'.$txt.'&nbsp;</B></span><br>");';
}
}else{
if( !$Alert ){
$txt = str_ireplace('&lt;br&gt;', '<br>', htmlspecialchars($txt));
$txt = str_ireplace('<br><br>', '<br>', $txt);
echo '<span style="font-family:monospace; font-size:12px; color:#00009C; background:#D6DFE7;"><B>&nbsp;'.$txt.'&nbsp;</B></span><br>';
}else{
echo htmlspecialchars($txt).'<br>';
}
}
}
}
function qErrorFile($TxtError, $sql, &$pkError=""){
global $_HndDB, $_HndDBSystem;
if( $_SESSION["_D_"]=="" ) $pkError = rand(1000,9999);
$LogTxt = date('Y-m-d H:i:s')."\r\n".
"\tUSER...: ".$_SESSION["_User"]."\r\n".
(($_SESSION["_D_"]=="")? "\tPK.....: ".$pkError."\r\n":"").
"\tURL....: ".$_SERVER['REQUEST_URI']."\r\n".
"\tSQL....: ".$sql."\r\n".
"\tERROR..: ".$TxtError."\r\n";
$DimNomVar = array_keys($_POST); $DimValor = array_values($_POST);
$MasInfo = "\tPOST...: "."\r\n";
for($n=0; $n<count($DimNomVar); $n++) $MasInfo .= "\t\t ".$DimNomVar[$n].' = '.$DimValor[$n]."\r\n";
$DimNomVar = array_keys($_GET); $DimValor = array_values($_GET);
$MasInfo .= "\tGET....: "."\r\n";
for($n=0; $n<count($DimNomVar); $n++) $MasInfo .= "\t\t ".$DimNomVar[$n].' = '.$DimValor[$n]."\r\n";
error_log($LogTxt.$MasInfo."\n", 3, '../_tmp/err/_log.err');
error_log($LogTxt, 3, '../_tmp/err/_log_short.err');
if( $_HndDB ){
sql_TranBack();
sql_TranOn();
}
if( $_HndDBSystem ){
$_HndDBSystem->qTranBack();
$_HndDBSystem->qTranOn();
}
}
?>
<?PHP
if( !file_exists("g/logo.png") ){
eInit();
die('Falta el fichero "g/logo.png"');
}
if( !is_dir('../_tmp/sess') ){
eInit();
die('Falta el directorio "/_tmp/sess"');
}
if( !is_dir('../_tmp/lcl') ){
eInit();
die('Falta el directorio "/_tmp/lcl"');
}
if( $_DesktopWepe ){
setcookie('PHPSESSID', $_COOKIE['PHPSESSID'], 0, '/', '', false, true);
}else{
$_Desktop = $_SETUP["Desktop"];
$_Desktop["MenuAutoHidden"] = (($_Desktop["MenuAutoHidden"])?1:0);
$IconFolder = "©ª";
$IconDoc = "b";
if( $_Desktop["DefaultTreeIcon"] && $_Desktop["DefaultTreeIconChar"]<>"" ){
$dim = explode(",", $_Desktop["DefaultTreeIconChar"]);
$IconFolder = $dim[0].$dim[1];
$IconDoc = $dim[2];
}
$_Desktop["DefaultTreeFolder"] = explode(",", $_Desktop["DefaultTreeFolder"].",");
}
if( !function_exists("_FileNoCache") ){
function _FileNoCache($file, $inner=""){
$para = filemtime("../../edesweb/{$file}");
echo '<SCRIPT type="text/javascript"'.$inner.' SRC="edes.php?R:$'.$file.'&j='.$para.'" charset="ISO-8859-1"></SCRIPT>'.$GLOBALS['__Enter'];
}
}
$_SESSION['_eDes_'] += rand(0,99);
?>
<?PHP if( !$_DesktopWepe ){ ?>
<?= eHTML('$desktop2_web.php', '', $_SETUP["Setup"]["TabTitle"]) ?>
<link id="FAVICON" rel="icon" href="g/logo.ico" type="image/x-icon"/>
<?PHP }else{ ?>
<?PHP
if( file_exists("../tree/usr_{$_User}.txt") ){
eInit();
die("Acceso no autorizado");
}
?>
<?PHP } ?>
<?PHP
$factorZoom = 1;
$_SESSION['cssSufijo'] = "";
$dim = file("../_datos/config/core.css");
for($n=0; $n<count($dim); $n++){
$dim[$n] = trim($dim[$n]);
if( substr($dim[$n],0,7)=='$fBase:' ){
list(,$fBase) = explode(":",$dim[$n]);
list($fBase) = explode("px",$fBase);
}else if( substr($dim[$n],0,10)=='$fBaseBIG:' ){
list(,$fBaseBIG) = explode(":",$dim[$n]);
list($fBaseBIG) = explode("px",$fBaseBIG);
}else if( substr($dim[$n],0,10)=='$fBaseTLF:' ){
list(,$fBaseTLF) = explode(":",$dim[$n]);
list($fBaseTLF) = explode("px",$fBaseTLF);
}else if( substr($dim[$n],0,12)=='$fBaseSmall:' ){
list(,$fBaseSmall) = explode(":",$dim[$n]);
list($fBaseSmall) = explode("px",$fBaseSmall);
}
}
if( $_SESSION["_BYPHONE"] ){
$factorZoom = number_format($fBaseTLF/$fBase, 4);
$_SESSION['cssSufijo'] = "_tlf";
}
$_SESSION['zoomBIG'] = (int)$fBaseBIG / (int)$fBase;
$_SESSION['zoomTLF'] = (int)$fBaseTLF / (int)$fBase;
$_SESSION['zoomSmall'] = (int)$fBaseSmall / (int)$fBase;
$_SESSION['factorZoom'] = $factorZoom;
?>
<style title="all" name="all" type="text/css">
<?PHP
$sufijo = $_SESSION['cssSufijo'];
$txt = file_get_contents($_SESSION['_PathCSS']."/all{$sufijo}.css");
$txt = str_replace("v=4.7.0","v=4.7.0.".time(), $txt);
echo str_replace("../", "", $txt);
unset($txt);
?>
</style>
<style title="tab" name="tab" disabled=1 type="text/css">
<?PHP include($_SESSION['_PathCSS']."/tab{$sufijo}.css"); ?>
</style>
<style title="list" name="list" disabled=1 type="text/css">
<?PHP include($_SESSION['_PathCSS']."/list{$sufijo}.css"); ?>
</style>
<style title="all_big" name="all_big" disabled=1 type="text/css">
<?PHP
$txt = file_get_contents($_SESSION['_PathCSS']."/all_big.css");
echo str_replace("v=4.7.0","v=4.7.0.".time(), $txt);
echo str_replace("../", "", $txt);
unset($txt);
?>
</style>
<style title="tab_big" name="tab_big" disabled=1 type="text/css">
<?PHP include($_SESSION['_PathCSS']."/tab_big.css"); ?>
</style>
<style title="list_big" name="list_big" disabled=1 type="text/css">
<?PHP include($_SESSION['_PathCSS']."/list_big.css"); ?>
</style>
<style title="styleCARD" name="styleCARD" type="NO" type="text/css">
<?PHP include($_SESSION['_PathCSS']."/list_card.css"); ?>
</style>
<?PHP if( !$_DesktopWepe ){ ?>
<style type="text/css"></style>
<?PHP } ?>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js" charset="ISO-8859-1"></script>
<script type='text/javascript' charset="ISO-8859-1">
if(typeof(google)!="undefined") google.charts.load('current', {packages: ['corechart']});
</script>
<?=_FileNoCache('core.js',' Comment="Motor Javascript" id="eDesCore"')?>
<script type='text/javascript' SRC='edes.php?E:$lng.php' charset="ISO-8859-1"></script>
<script type='text/javascript' SRC='edes.php?E:$t/developer.js' charset="ISO-8859-1"></script>
<?PHP if( $_ChannelApplication || $_ChannelDevelopment ){ ?>
<script src="js/socket.io.js"></script>
<?PHP } ?>
<script type="text/javascript" charset="ISO-8859-1" Comment="Carga Motor Javascript">
if( !/(Chrome|Google Inc|Opera|Vivaldi|Safari)/i.test(navigator.userAgent) ){
location.href = "edes.php?r:$nocompatible.htm&'"+escape(document.title)+"'";
}
if( window.frameElement!=null || top.location!=self.location ){
top.location.href = self.location.href;
}
<?PHP if( $_SETUP["Setup"]["Notification"] ){ ?>
if( S.session.notification && S.session.notification.permission!=="granted" ){
S.session.notification.requestPermission();
location.href = "edes.php?r:$nonotification.htm&'"+escape(document.title)+"'";
}
<?PHP }else{ ?>
S.session.notification = false;
<?PHP } ?>
<?PHP
$_UrlStatus = "Help";
echo "try{ history.pushState({foo:'bar'}, '-*-', '{$_UrlStatus}'); }catch(e){}";
echo "top.S.init(window);";
?>
window.name = 'Main';
<?PHP
$SinNovedad = "true";
echo "var _WEB_=true,".
"_Master=".(($_gsMaster=='~')?'true,':'false,').
"_WebMaster=".(($_SESSION['_WebMaster']=='S')?'true,':'false,').
"_M_='{$_gsMaster}',".
"_FontNumber='font-family:".$_SESSION["CSSDynamic"]["FontNumbers"]."',";
?>
_BYPHONE = <?= (($_SESSION["_BYPHONE"]) ? 'true' : 'false') ?>,
_factorZoom = <?= $factorZoom ?>,
_CdiNovedad = '<?= $_novedades_ ?>', _SinNovedad = <?= $SinNovedad ?>,
_User = <?= $_User ?>,
_Node = <?= $_Node ?>,
_Tree = <?= $_Tree ?>,
_Avisos = <?= ($_Avisos*60000); ?>,
_pAvisos = null,
_ymd = _D2S = '<?= date('Ymd'); ?>',
_ToDay = '<?= date('Y-m-d'); ?>',
_dmy = '<?= date('d-m-Y'); ?>',
_cdi = _Y2S = '<?= date('Y-m-d H:i:s'); ?>',
_CONTEXT = '<?=$_SESSION['_eDes_']?>'*1,
_Source="",
_WebOFF="", _WebUser="",
_NotificationWarning = null,
_ENTER = String.fromCharCode(10);
S.setup.language = "_<?=$_SESSION['_LANGUAGE_']?>"
S.exitMaxLife(<?=(($_SESSION['SessionMaxLife']-date("U"))/3600)?>, "La sesión caducará en 5 minutos.<br><b>La aplicación se cerrará.</b>");
S.marksSetup({
thousands:"<?=$_SESSION["_FormatNumber"][0]?>",
decimal:"<?=$_SESSION["_FormatNumber"][1]?>",
month:"<?=$_SESSION["_FormatP4"]?>",
date:"<?=$_SESSION["_FormatF4"]?>",
datetime:"<?=$_SESSION["_FormatCDI"]?>",
delimiter:"<?=$_SESSION["_FormatDelimiter"]?>",
phone:"<?=$_SESSION["_FormatT"]?>",
formatP4: ["<?=substr($_SESSION["_FormatP4EXP"],1,-1)?>", "<?=$_SESSION["_FormatP4TKNdb"]?>", "<?=substr($_SESSION["_FormatP4EXPdb"],1,-1)?>", "<?=$_SESSION["_FormatP4TKNuser"]?>"],
formatF4: ["<?=substr($_SESSION["_FormatF4EXP"],1,-1)?>", "<?=$_SESSION["_FormatF4TKNdb"]?>", "<?=substr($_SESSION["_FormatF4EXPdb"],1,-1)?>", "<?=$_SESSION["_FormatF4TKNuser"]?>"],
formatCDI: ["<?=substr($_SESSION["_FormatCDIEXP"],1,-1)?>", "<?=$_SESSION["_FormatCDITKNdb"]?>", "<?=substr($_SESSION["_FormatCDIEXPdb"],1,-1)?>", "<?=$_SESSION["_FormatCDITKNuser"]?>"],
formatT: ["<?=substr($_SESSION["_FormatTEXP"],1,-1)?>", "<?=$_SESSION["_FormatTTKNdb"]?>", "<?=substr($_SESSION["_FormatTEXPdb"],1,-1)?>", "<?=$_SESSION["_FormatTTKNuser"]?>"],
weekday: <?=$_SESSION["_FirstWeekDay"]?>
});
</script>
</head>
<body style="margin:0px;padding:0px;o-verflow:hidden;">
<span class='MODAL' id='TAPAINIT' onselectstart='return S.eventClear(window)' style='display:none;position:absolute;z-index:9999999;width:100%;height:100%;'><!-- b-ackground-color:rgba(0,0,0,0.75); -->
<div class='loader' style='position:relative; top:50%; left:50%;'></div>
</span>
<div id="PROGRESS" style="display:none">
<table border=0px cellSpacing=0px cellPadding=0px style="width:100%;">
<tr><th class="progress-title"></th></tr>
<tr><td>
<div class="progress-wrap">
<div class="progress-value" style='background-image:url(<?=$_PathIMG?>/progress.png)'></div>
<div class="progress-text" style='background-image:url(<?=$_PathIMG?>/progress.png)'></div>
</div>
</td></tr>
<tr><td class="Detail"></td></tr>
</table>
</div>
<div class="PROGRESSUPLOAD" title="Enviando ficheros..." style="display:none">
<div id="PROGRESSVALUE">&nbsp;</div>
<div id="PROGRESSNUMBER">&nbsp;</div>
<div id="PROGRESFILE"></div>
</div>
<span id="PROGRESSCIRCLE" style="display:none">
<div id="PROGRESSCIRCLEVALUE"></div>
</span>
<audio id="SOUNDNOTIFICATION" src="g/aviso.wav" style="display:none"></audio>
<iframe frameborder="0px" src="" id="ICALL" name="TLF" eNORESIZE=true style="z-index:10000; display:none;position:absolute;left:0px;top:0px;width:100%;height:200px;border-width:1px 1px 1px 0px;border-color:#9900cc;border-style:solid;"></iframe>
<iframe frameborder=0px name="IWORK2" eNORESIZE=true src="" style="width:100%;height:100%;display:none;"></iframe>
<iframe frameborder=0px name="IWORK" eNORESIZE=true src="<?=$_URLDirecta?>" style="width:100%;height:100%;"></iframe>
<table class='WINDOWLOADING' onclick='S(this).hidden();S.eventClear(window);' style='position:absolute;display:none;'>
<tr><td align='center' valign='middle'>
<div class='loader'></div>
</td></tr>
</table>
<script type="text/javascript" charset="ISO-8859-1">
<?PHP if( !$_DesktopWepe ){ ?>
S(frames["IWORK"].frameElement).attr("WOPENER", window);
<?PHP } ?>
var _oIWORK, _pIWORK;
function eInitIWork(){
if( document && document.body && S(":IWORK").obj!=null ){
_oIWORK = S(":IWORK").nodeCopy();
_pIWORK = S(":IWORK").obj.parentNode;
S.scrollSetWidth();
}else{
setTimeout(function(){
eInitIWork();
}, 500);
}
}
<?PHP
function _LngLoad2($tipo, $File){
list(, $LngUser, $_Language) = explode(',',$tipo);
$tmp = file($File.'.lng');
list(,$Lngs) = explode(']', $tmp[0]);
list($Lngs) = explode('|', $Lngs);
$tmp4 = explode(',', str_replace(' ','',$Lngs));
for( $i=0; $i<count($tmp4); $i++ ){
$tmp4[$i] = trim($tmp4[$i]);
if( $tmp4[$i]==$LngUser ){
$uCol = $i+1;
}
if( $tmp4[$i]==$_Language ){
$dCol = $i+1;
}
}
$Dim = array();
$mk = 0;
for($n=1; $n<count($tmp); $n++){
list( $tmp[$n] ) = explode('~', $tmp[$n]);
$tmp[$n] = trim($tmp[$n]);
$tmp2 = explode('|', $tmp[$n]);
$k = $tmp2[0];
$txt = trim($tmp2[$uCol]);
if( $txt=='' ) $txt = trim($tmp2[$dCol]);
$v = str_replace('"', '&quot;', trim($txt));
$k = $k*1;
$mk = max($mk, $k);
$Dim[$k] = $v;
}
$txt = '';
for($n=0; $n<$mk+1; $n++){
if( $Dim[$n]=="" ) $txt .= '|';
else $txt .= str_replace(chr(92).'n','<br>',$Dim[$n]).'|';
}
return $txt;
}
?>
</script>
<?PHP
$Hoy = date('Y-m-d');
$txt = '';
if( eFileGetVar('Login.HostGet') ) $txt = ", host='".$REMOTE_ADDR."'";
qQuery("update gs_user set dt_access_last='{$Hoy}'{$txt} where cd_gs_user={$_User}");
?>
<script type="text/javascript" charset="ISO-8859-1">
document.body.onload = function(){
}
</script>
<?PHP
echo '</body></html>';
eEnd();
?>
