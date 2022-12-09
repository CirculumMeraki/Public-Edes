<?PHP
if( isset($_SESSION["_SPIDER_"]) ) unset($_SESSION["_SPIDER_"]);
if( $_SESSION["_x_y_z_"]!="" ){
$dim = explode("|", $_SESSION["_x_y_z_"]);
unset($_POST);
$_POST = array();
$_POST[$_SESSION["_Login_"]] = $dim[0];
$_POST[$_SESSION["_Password_"]] = $dim[1];
$_POST[$_SESSION["_Remember_"]] = "OK";
$_POST['_eDes_'] = $_SESSION['_eDes_'];
$_SESSION["_Remember_"] = "OK";
$_SESSION["_User"] = $dim[2]*-1;
unset($_SESSION["_x_y_z_"]);
if( !$_HndDBSystem ) qConnectSystem();
}
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
if( !function_exists("eEntityEncode") ){
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
if( !function_exists("eLngLoad") ){
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
if( $_Sql=="" ){
$tmpFile = '../_datos/config/sql.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval(_LoadSqlIni($tmpFile));
include($Dir_.$_Sql.'.inc');
_ShowError($php_errormsg, $tmpFile);
}
if( $_SESSION['_eDes_']==1 ) $_SESSION['_iSql'] = $_Sql;
if( !$_HndDBSystem ) qConnectSystem();
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
$tmpFile = '../_datos/config/sql.ini';
ini_set( 'track_errors', _TRACK_ERRORS );
include($tmpFile);
if( $_SESSION['_eDes_']==1 ) $_SESSION['_iSql'] = $_Sql;
if( !$_HndDBSystem ) qConnectSystem();
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
function qConnectSystem($GetPuntero=false){
global $_HndDBSystem;
switch( $_SESSION['_iSql'] ){
case 'mysql':
include('../../edesweb/mysql.class.inc');
if( $GetPuntero ) return new eMySql();
$_HndDBSystem = new eMySql();
break;
case 'mysqli':
include('../../edesweb/mysqli.class.inc');
if( $GetPuntero ) return new eMySqli();
$_HndDBSystem = new eMySqli();
break;
case 'informix':
include('../../edesweb/informix.class.inc');
if( $GetPuntero ) return new eInformix();
$_HndDBSystem = new eInformix();
break;
case 'oracle':
include('../../edesweb/oracle.class.inc');
if( $GetPuntero ) return new eOracle();
$_HndDBSystem = new eOracle();
break;
case 'pdo':
include('../../edesweb/pdo.class.inc');
if( $GetPuntero ) return new ePdo();
$_HndDBSystem = new ePdo();
break;
}
$_HndDBSystem->qConnect('sql');
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
array(chr(92).'n',	 "'"  ,   '"'   ,   "á"   ,   "é"	,   "í"   ,   "ó"   ,    "ú"  ,   "ü"   ,	 "Á"  ,   "É"	,   "Í"   ,   "Ó"   ,   "Ú"   ,    "Ü"  ,	 "ñ"  ,   "Ñ"	,   "ç"   ,   "Ç"   ,   "#~#8364;"  ,    "º"  ,    "ª"   ),
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
if( $_POST['_eDes_']=="closed" ){
_MensajeHTML("Aplicación cerrada");
}
$_SETUP = eFileGetVar();
$_PassDaysToExpire = $_SETUP["Login"]["PassDaysToExpire"];
$_PassDaysToChange = $_SETUP["Login"]["PassDaysToChange"];
$_UserPasswordByEmail = $_SETUP["Login"]["UserPasswordByEmail"];
$_InitWeb = $_SETUP["Login"]["InitWeb"];
$n = 6;
if( $_SETUP["Setup"]["Multitenancy"] && isset($_POST["Path"]) ) $n++;
if( count($_POST)!=$n ){
_PedirLogin();
}
if( !isset($_SESSION["db_path"]) && $_SETUP["Setup"]["Multitenancy"] ){
function _GetDicctionary(){
include("../_datos/config/share.ini");
return $_SqlDiccionario;
}
function getImagenLogin(){
global $_PedirEmpresa;
$buscar = "";
if( $_PedirEmpresa || !eFileGetVar('Setup.Multitenancy') ){
$buscar = 'g/logo_desktop.*';
$_SESSION["pk_login"] = glob('g/logo_desktop.*')[0];
}else if( $_SESSION["pk_login"][0]=="g" ){
$buscar = $_SESSION["pk_login"];
}else{
$buscar = 'g/logos/'.$_SESSION["pk_login"].'_login.*';
$_SESSION["pk_login"] = glob('g/logos/'.$_SESSION["pk_login"].'_login.*')[0];
}
if( $_SESSION["pk_login"]=="" ){
eInit();
die('Falta el fichero "'.$buscar.'"');
}
return $_SESSION["pk_login"];
}
$sISql = $_SESSION['_iSql'];
$_SESSION['_iSql'] = 'mysqli';
$_HndShared = qConnectSystem(true);
$_HndShared->qConnect('sql', "../_datos/config/share.ini");
if( !$_HndShared ) die("NO");
$tenan = $_POST["Path"];
$_HndShared->qQuery("select * from gs_sharedb where (db_path=('{$tenan}'))");
$r = $_HndShared->qArray();
$_HndShared->qFree();
$_SESSION['_iSql'] = $sISql;
$_SESSION['ShareDictionary'] = _GetDicctionary();
if( trim($r["db_path"])==$tenan ){
if( $r["status"]=="D" || $r["dt_delete"]!="" ){
_MensajeJS('Mensaje("Empresa de baja en el servicio desde '.$r["dt_delete"].'")');
}
foreach($r as $k=>$v) $r[$k] = trim($v);
$_SESSION["pk_login"] = $r["pk"];
$_SESSION["pk_share"] = $r["pk"];
$_SESSION["db_path"] = $r["db_path"];
$_SESSION["db_hostname"] = $r["db_hostname"];
$_SESSION["db_dictionary"] = $r["db_dictionary"];
$_SESSION["db_user"] = $r["db_user"];
$_SESSION["dt_password"] = $r["dt_password"];
getImagenLogin();
}else{
if( $_SESSION["_PassError_"]>=3 ){
$_SESSION["_PassTime_"] = (time()+(10*60));
_MensajeJS("Terminar('Acceso bloqueado durante 10:00 minutos')");
}else{
$_SESSION["_PassError_"]++;
_MensajeJS('Mensaje("Error: Inténtelo de nuevo")');
}
}
}else{
}
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
include($Dir_.$_Sql.'.inc');
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
$_SESSION["_CACHE"] = $_SETUP["Setup"]["Cache"];
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
$_SESSION["_DevelopmentSrv"] = ($_Development ? true : false);
$_SESSION["3CX"] = ($_SETUP["Setup"]["Call3CX"]!="");
$_SESSION["3CXTab"] = preg_match('/(\*|T)/i',$_SETUP["Setup"]["Call3CX"]);
$_SESSION["3CXList"] = preg_match('/(\*|L)/i',$_SETUP["Setup"]["Call3CX"]);
$_SESSION["3CXSource"] = preg_match('/(\*|S)/i',$_SETUP["Setup"]["Call3CX"]);
$_SESSION["3CXUrl"] = $_SETUP["Setup"]["Call3CXUrl"];
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
if( $_SESSION["ShareDictionary"]!="" && substr($_SESSION["ShareDictionary"], -1)!="." ){
$_SESSION["ShareDictionary"] .= ".";
$_SESSION["multitenancy"] = array_merge($_SESSION["multitenancy"], explode(",","gs_op,gs_op_ico,gs_op_lng,gs_tree,gs_tree_op,gs_tpermission,gs_activity,gs_language,gs_entidad,gs_grupo,gs_campo,gs_color,gs_store,gs_toperacion,gs_pack,gs_error,gs_storage"));
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
if( isset($_SESSION["_Remember_"]) && $_POST[$_SESSION["_Remember_"]]=="RecordarClave" ){
_AtaqueMasivo();
eLngLoad('../../edesweb/lng/usu_ficha.edf', '', 1);
$email = trim($_POST[$_SESSION["_Login_"]]);

		// si el tipo de login es "dni" busca el email para poderselo enviar
		// if( $_ENV[SETUP]['Login']['Type']=="dni" && preg_match('/^[A-Z]{0,1}[0-9]{7,9}[A-Z]{0,1}$/', $email) ){
		if( preg_match('/^[A-Z]{0,1}[0-9]{7,9}[A-Z]{0,1}$/', $email) ){
			qQuery("select email from gs_user where {$pIzq1}dni='{$email}'{$pDch1}");
			$r=qArray();
			$email = trim($r["email"]);
			eTron("Recordad clave con dni: ".$_POST[$_SESSION["_Login_"]].' -> '.$email);
		}

if( filter_var($email, FILTER_VALIDATE_EMAIL) ){
$emailOk = false;
qQuery("select email from gs_user where {$pIzq1}email like {$pIzq2}'".substr($email,0,2)."%'{$pDch2}{$pDch1}");
while( $r=qArray() ){
if( $email!="" && trim($r["email"])===$email ){
$emailOk = true;
break;
}
}
if( $emailOk ){
eFileGetVar('Login', true);
$_EMailSystem = eFileGetVar("Setup.EMailSystem");
if( $UserPasswordByEmail && $email!='' && $_EMailSystem!='' ){
$str = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
$LonClave = 6;
$MinNum = 2;
$MinChr = 2;
$nMinNum = 0;
$nMinChr = 0;
if( $min_password>$LonClave ) $LonClave = $min_password;
switch( $key_case ){
case '0':
break;
case '1':
$str = strtolower($str);
break;
case '2':
$str .= "abcdefghijklmnpqrstuvwxyz";
break;
}
while( $nMinNum<$MinNum || $nMinChr<$MinChr ){
$nMinNum = 0;
$nMinChr = 0;
$Pass = "";
for( $i=0; $i<$LonClave; $i++ ){
$c = substr($str,rand(0,strlen($str)-1),1);
$Pass .= $c;
if( is_numeric($c) ){
$nMinNum++;
}else{
$nMinChr++;
}
}
}
$txt = ___Lng('Nueva clave').': '.$Pass;
if( file_exists( eScript('/_datos/config/user_new@LNG@.html') ) ){
$txt = file_get_contents( eScript('/_datos/config/user_new@LNG@.html') );
}else if( file_exists( eScript('/_datos/config/user_new.html') ) ){
$txt = file_get_contents( eScript('/_datos/config/user_new.html') );
}
$txt = str_replace('{COMPANY}' , eFileGetVar("Setup.ApplicationName"), $txt);
$txt = str_replace('{EMAIL}'   , $email, $txt);
$txt = str_replace('{PASSWORD}', $Pass, $txt);
if( eMail($email, ___Lng('CLAVE DE USUARIO'), $txt, $_EMailSystem) ){
$Duracion = eFileGetVar("Login.PasswordTmpMinutes")*1;
if( $Duracion==0 ) $Duracion = 5;
list($Y, $m, $d, $H, $i, $s) = explode(" ",date('Y m d H i s'));
$cdi = date('Y-m-d H:i:s',mktime($H, $i+$Duracion, $s, $m, $d, $Y));
if( trim($Duracion)=="" ) $cdi = "";
$Pass = strtoupper(md5($Pass));
qQuery("update gs_user set pass_tmp='{$Pass}', pass_tmp_cdi='{$cdi}' where {$pIzq1}email={$pIzq2}'{$email}'{$pDch2}{$pDch1}");
}
}
}
}
_MensajeHTML(___Lng('Clave enviada por email'), true);
}
if( $_POST["_eDes_"]=="" ||
(!isset($_POST[$_SESSION["_Remember_"]]) && $_SESSION["_Remember_"]<>"OK") ||
!isset($_POST[$_SESSION["_Login_"]]) ||
!isset($_POST[$_SESSION["_Password_"]])	){
_PedirLogin();
}
if( !isset($_SESSION["_PassError_"]) ) $_SESSION["_PassError_"] = 0;
$_SESSION["_PassError_"]++;
if( $_SESSION["_PassError_"]>4 ) _MensajeJS("Terminar('Aplicación cerrada')");
$cdi = date('Y-m-d H:i:s');
$login = trim($_POST[$_SESSION["_Login_"]]);
$password = trim($_POST[$_SESSION["_Password_"]]);
$_gsMaster = '';


if( strlen($password)==64 ){
list($password, $_gsMaster) = explode('|', chunk_split($password, 32, '|'));
}else if( strlen($password)==32 ){
}else if( $UserOk>0 && $UserOk==$UserDelLogin ){
}else{
_MensajeJS("Terminar('Aplicación cerrada')");
}
if( isset($UserOk) && isset($UserDelLogin) && $UserOk>0 && $UserOk==$UserDelLogin ){
$_NoDesktop = true;
global $_Sql, $_SqlTransaction, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOConnect, $_HndDBSystem;
$_Sql = "";
include('../_datos/config/sql.ini');
$_SESSION['_iSql'] = $_Sql;
_SaveSession(true);
if( !function_exists("qQuery") ){
include($Dir_.$_Sql.".inc");
}
$_TypeTree = -1;
}else{
$_NoDesktop = false;
$UserOk = 0;
$UserDelLogin = 0;
qQuery("select login,pass, pass_tmp, pass_tmp_cdi, cd_gs_user,permission,cd_gs_language from gs_user where {$pIzq1}login like {$pIzq2}'".substr($login,0,2)."%'{$pDch2}{$pDch1}");
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
$_SESSION['_LANGUAGE_'] = $r["cd_gs_language"];
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
if( $_SESSION["_Remember_"]<>"OK" ){
$_SESSION["_Remember_"] = "OK";
if( $_TwoStepVerificationType<>"" && $_TwoStepVerificationSg>0 ){
qQuery("select email from gs_user where cd_gs_user='{$UserOk}'");
list($eMail2Pasos) = qRow();
$FileConfirmacion = "../_tmp/php/";
$claveTmp1 = md5(rand(1,99999).$eMail2Pasos.rand(1,99999));
$claveTmp2 = md5($claveTmp1);
$claveTmp1 = explode("|",chunk_split($claveTmp1,6,"|"));
$claveTmp2 = explode("|",chunk_split($claveTmp2,6,"|"));
for( $n=0; $n<count($claveTmp1); $n++ ){
$FileConfirmacion .= $claveTmp1[$n].$claveTmp2[$n];
}
$paso = $_TwoStepVerificationSg/5;
set_time_limit( ($paso+1)*5 );
for($n=0; $n<$paso; $n++ ){
sleep(5);
if( file_exists($FileConfirmacion) ){
_MensajeJS("eSubmit()");
}
}
_MensajeJS("Terminar('Tiempo expirado para confirmar el acceso')");
}else{
_MensajeJS("eSubmit()");
}
eEnd();
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
if( $txt=="eSubmit()" ){
$cdi = "";
$campo = "text_{$_SESSION['_LANGUAGE_']}";
$where = "";
if( $_POST['e_cdi']!="" ) $where = " and cdi>'{$_POST['e_cdi']}'";
$whereCSS = $where;
if( $_POST['e_language']!=$_SESSION['_LANGUAGE_'] && $_POST['e_language']!="" ){
$where = "";
}
qQuery("select * from {$_SESSION['ShareDictionary']}gs_storage where type_storage<>'c' {$where} order by cdi");
while($r=qArray()){
if( $r['type_storage']=="r" ){
$text = addslashes($r["text_es"]);
}else{
$text = addslashes($r[$campo]);
if( $text=="" ) $text = addslashes($r["text_es"]);
}
$text = str_replace(array(chr(10), chr(13)), array("&#0A;","&#0D;"), $text);
echo "localStorage.setItem('e-{$r['type_storage']}{$r['key_storage']}', '{$text}');";
if( $r['cdi']>$cdi ) $cdi = $r['cdi'];
}
qQuery("select * from {$_SESSION['ShareDictionary']}gs_storage where type_storage='c' {$whereCSS} order by cdi");
while($r=qArray()){
$text = addslashes(file_get_contents($r['key_storage']));
$text = str_replace(array(chr(10), chr(13)), array("&#0A;","&#0D;"), $text);
echo "localStorage.setItem('e-{$r['type_storage']}{$r['key_storage']}', '{$text}');";
if( $r['cdi']>$cdi ) $cdi = $r['cdi'];
}
if( $whereCSS!=$where ){
qQuery("select * from {$_SESSION['ShareDictionary']}gs_storage where type_storage='c' {$whereCSS} order by cdi desc");
$r=qArray();
if( $r['cdi']>$cdi ) $cdi = $r['cdi'];
}
if( $cdi!="" ){
echo "localStorage.setItem('e-cdi', '{$cdi}');";
echo 'console.log("Update localStorage");';
}
if( $_POST['e_language']!=$_SESSION['_LANGUAGE_'] ){
echo "localStorage.setItem('e-language', '{$_SESSION['_LANGUAGE_']}');";
echo "console.log('New Language: {$_SESSION['_LANGUAGE_']}');";
}
}
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
if( isset($row['call3cx']) && trim($row['call3cx'])=="" ){
$_SESSION["3CX"] = "";
$_SESSION["3CXTab"] = false;
$_SESSION["3CXList"] = false;
$_SESSION["3CXSource"] = false;
$_SESSION["3CXUrl"] = "";
}
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
_MensajeHTML($__Lng[59]);
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
if( $_gsMaster==$_InitWeb && $_InitWeb<>"" ){
ActivarWeb($NumSerie); exit;
}
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
function crearToken(&$payLoad, $_privateKey, $_algorithm, $_maxLifeTime){
$payLoad['exp'] = mktime(date("H"), date("i")+$_maxLifeTime , date("s"), date("n"), date("j"), date("Y"));
return JWT::encode($payLoad, $_privateKey, $_algorithm);
}
if( $_ChannelApplication || $_ChannelDevelopment ){
$_SESSION["ChatChannel"] = true;
include_once("../../edesweb/itm/jwt.php");
$payLoad = array();
$payLoad['exp'] = mktime(date("H"), date("i")+$ChatChannel["jwt"]["maxLifeTime"], date("s"), date("n"), date("j"), date("Y"));
foreach($ChatChannel["filter"] as $k=>$v){
$payLoad[$k] = $row[$k];
}
$token = JWT::encode($payLoad, $ChatChannel["jwt"]["key"], $ChatChannel["jwt"]["method"]);
setcookie("eDesChatChannel", $token, 0, "/");
}
if( file_exists('../_tmp/err/location.php') ){
if( !file_exists("../_tmp/err/{$_User}.ord") ){
include('../_tmp/err/location.php');
eEnd();
}
}
if($_TronLogin)	error_log("46\n", 3, $_TronFile);
function eAddSelect( $oCampo, $oCampoLen, $oCampoPx, $Valor, $OnChange ){
echo "<INPUT NAME='{$oCampo}' VALUE=\"{$Valor}\" style='display:none' ALTO=1>";
if( $OnChange!='' ){
${$OnChange} = str_replace( "'", '"', ${$OnChange} );
$OnChange = " onchange='{$OnChange}'";
}
echo "<INPUT NAME='_INPUT_{$oCampo}' IND=-1 TMPIND=-1{$OnChange}";
echo " onmousewheel='_SelSlider()' onfocusin='_SelMemValue(this)' onfocusout='_SelPutValue(this)' onkeypress='_SelNewChar(this)' onkeydown='_SelDelChar(this)' onclick='_SelShow(this)'";
echo " style='background-image:url(g/sel.gif); background-position-x:100%; background-position-y:100%; background-repeat:no-repeat; cursor:pointer;'";
if( $oCampoPx > 0 ) echo " style='width:{$oCampoPx};'";
echo " TYPE='TEXT' SIZE={$oCampoLen} MAXLENGTH={$oCampoLen} VALUE=''>";
echo "<DIV onclick='_SelClick(this)' onselectstart='return false;' onmouseleave='this.style.display=\"none\"' id=Select class='SELECT EDITABLE'>";
echo "<TABLE INIT=0 id='{$oCampo}_TABLE' width=1px onmouseover='_SelCursor(true)' onmouseout='_SelCursor(false)' cols=2>";
echo '<COL style="display:none"><COL>';
echo '<TR><TD><TD>&nbsp;';
$textContent = '';
while( $row=qArray() ){
echo '<TR><TD>'.trim($row[0]).'<TD>'.trim($row[1]);
if( $Valor == trim($row[0]) ) $textContent = trim($row[1]);
}
echo '</TABLE></DIV>';
if( $textContent!='' ) echo "\n<script type='text/javascript'>DGI('{$oCampo}').value=".'"'.$Valor.'";'."DGI('_INPUT_{$oCampo}').value=".'"'.$textContent.'";</script>';
}
function _HayAddSelect(){
$txt = file_get_contents('../_datos/config/desktop_user.ini');
return( substr_count($txt, 'eAddSelect(')>0 || substr_count($txt, 'eAddSelect (')>0 );
}
$_HayAddSelect = _HayAddSelect();
$xDim = file_get_contents('../_d_/cfg/dim.lp');
$DimUser = array();
if( $xDim!='' ) $DimUser = unserialize(gzuncompress($xDim));
if( $_gsMaster!='' && substr_count('~AMP',$_gsMaster)==1 && $_gsNomUser!='' && $DimUser['u'.$_User]!=$_gsNomUser ){
$DimUser['u'.$_User] = $_gsNomUser;
$xDim = serialize($DimUser);
file_put_contents('../_d_/cfg/dim.lp', gzcompress($xDim,1));
}
if($_TronLogin)	error_log("47\n", 3, $_TronFile);
if( !isset($_Development) ) $_Development = false;
if( !isset($_Test) ) $_Test = false;
if( !isset($_ErrImg) ) $_ErrImg = false;
if( !isset($_DocSecurity) ) $_DocSecurity = false;
if($_TronLogin)	error_log("48\n", 3, $_TronFile);
$_ViewInfoNovedad = false;
if( $_SETUP["Setup"]["ReportsNews"] ){
if( qCount('gs_novedad', "cdi>='{$_novedades_}'")>0 ) $_ViewInfoNovedad = true;
}
$file = '../_datos/config/delfiles.cdi';
if( file_exists($file) ){
if( trim(file_get_contents($file))<date('Y-m-d') ){
$fp = fopen($file, "r+");
if( !($fp===false) ){
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
$fp2 = fopen('../_datos/config/system_sql.log','r');
if( !($fp2===false) ){
if( flock($fp2, LOCK_EX) ){  // bloqueo exclusivo - ...ojo... poder distingir entre ddbb: MySql, Informix, Oracle
$CDI = trim(file_get_contents('../_datos/config/system_sql.cdi'));
$Dim = explode("\n",fread($fp2, filesize('../_datos/config/system_sql.log')));
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
flock($fp2, LOCK_UN);    // libera el bloqueo
fclose($fp2);
}
}
}
flock($fp, LOCK_UN);    // libera el bloqueo
}
}
fclose($fp);
}
}else{
file_put_contents($file, date('Y-m-d'));
}
if($_TronLogin)	error_log("50\n", 3, $_TronFile);
include($Dir_."desktop{$_DesktopType}_web.php");
if($_TronLogin)	error_log("51\n", 3, $_TronFile);
if( !$_NoDesktop ) eEnd();
function _ProxCDI($CDI, $Tipo){
$Tipo = strtoupper($Tipo);
$sTipo = $Tipo;
if( $Tipo!='' && $Tipo!='NONE' && $CDI < date('Y-m-d H:i:s') ){
$CDI = trim($CDI);
if( $CDI=='' ){
$CDI = date('Y-m-d H:i:s');
}else{
list($Iz,$Dr) = explode(' ',$CDI);
list($an,$me,$di) = explode('-',$Iz);
list($ho,$mi,$se) = explode(':',$Dr);
switch( $Tipo ){
case 'DAILY':
$di++;
break;
case 'WEEKLY':
do{
$di++;
}while( date("N", mktime( $ho, $mi, $sg, $me, $di, $an ) )!=1 );
break;
case 'FORTNIGHTLY':
for( $n=0; $n<2; $n++ ){
do{
$di++;
}while( date("N", mktime( $ho, $mi, $sg, $me, $di, $an ) )!=1 );
}
break;
case 'MONTHLY':
$me++;
break;
case 'YEARLY':
$an++;
break;
default:
$di += (int)$Tipo;
}
$CDI = date( 'Y-m-d H:i:s', mktime( $ho, $mi, $sg, $me, $di, $an ) );
if( $CDI <= date('Y-m-d H:i:s') ) $CDI = _ProxCDI( $CDI, $sTipo );
}
return $CDI;
}
return $CDI;
}
function ActivarWeb($NumSerie){}
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
function _GetEmptyPage(){
$Leer = true;
$Dim = file('../_datos/config/empty_page.htm');
$PagVacia = '';
for( $i=0; $i<count($Dim); $i++ ){
$Dim[$i] = trim($Dim[$i]);
if( substr_count(strtoupper($Dim[$i]),'<'.'/SCRIPT>')>0 && substr_count(strtoupper($Dim[$i]),'<SCRIPT')>0 ){
continue;
}else if( strtoupper($Dim[$i])=='<'.'/SCRIPT>' || strtoupper(substr($Dim[$i],0,7))=='<SCRIPT' ){
$Leer = !$Leer;
continue;
}
if( $Leer ) $PagVacia .= $Dim[$i];
}
return $PagVacia;
}
function eAddMenuOption( $Label, $HR='', $Icon='', $Title='', $Activo=true ){
global $_DesktopType;
if( $_DesktopType == 2 || $_DesktopType == 3 ){
if( $Label=='-' ){
echo '<TR><TD class=Linea colspan=3>';
}else{
if( $HR!='' ) $HR = " HR='".str_replace("'",'"',$HR)."'";
if( $Icon!='' ) $Icon = "<img src='{$Icon}'>";
if( $Title!='' ) $Title = " title='{$Title}'";
$Activo = (( !$Activo ) ? ' disabled':'');
echo "<TR{$HR}{$Title}{$Activo}><TD>{$Icon}<TD>{$Label}<TD>";
}
}else if( $_DesktopType < 2 ){
if( $Label=='-' ){
echo "<tr id=o><td id=2 LIN=1 style='font-size:1px;vertical-align:middle;' HR=''><IMG SRC='g/linea.gif' width=100% height=1>";
}else{
if( $HR!='' ) $HR = " HR='".str_replace("'",'"',$HR)."'";
if( $Icon!='' ){
$Icon = "<img src='{$Icon}'>";
}else{
$Icon = "<IMG SRC='g/doc_0.gif'>";
}
if( $Title!='' ){
$Title = str_replace( '&#92;n', chr(10), $Title );
$Title = " title='{$Title}'";
}
$Activo = (( !$Activo ) ? ' disabled':'');
echo "<tr id=o{$Title}><td id=2 {$HR}>{$Icon}{$Label}";
}
}
}
?>
