<?PHP
function __SpiderDDBB(){
global $_Sql, $_SqlPDOType;
$VersionPHP = file_get_contents("../../edesweb/version");
$txt = file_get_contents($_SESSION["_SPIDER_"]["prefijo"]."0.def");
$txt = str_replace("{#SQL#}", "{$_Sql}|{$_SqlPDOType}|{$VersionPHP}", $txt);
file_put_contents($_SESSION["_SPIDER_"]["prefijo"]."0.def", $txt);
}
function __SpiderScript(&$File){
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ){
if( $_SESSION["_SPIDER_"]["pk"]==0 ){
$_SESSION['CONTEXTON'] = false;
$_SESSION["_SPIDER_"]["file"] = array();
$txt = str_replace($_SERVER["PHP_SELF"], "", $_SERVER["REQUEST_URI"])."\n".
":SYS\n{#SQL#}|".$_SESSION["_User"]."|".$_SESSION["_WebMaster"]."|".$_SESSION["_SystemUser"]."|".$_SESSION["_D_"]."|".$_SERVER["HTTP_REFERER"]."\n";
$txt .= ":GET\n"; foreach($_GET as $k=>$v) $txt .= $k.'='.$v."\n";
$txt .= ":POST\n"; foreach($_POST as $k=>$v) $txt .= $k.'='.$v."\n";
if( $txt[0]=="?" ) $txt = trim(substr($txt,1));
file_put_contents($_SESSION["_SPIDER_"]["prefijo"]."0.def", $txt);
}
eExplodeLast($File, ".", $xFile, $xExt);
$spider = $_SESSION["_SPIDER_"]["prefijo"].(++$_SESSION["_SPIDER_"]["pk"]).".".$xExt;
error_log($File.' >>> '.$spider."\n", 3, $_SESSION["_SPIDER_"]["prefijo"]."0.dim");
file_put_contents($spider, file_get_contents($File));
}
return $File;
}
function __SpiderDataDef($result, $sql){
$pnt = (gettype($result)=="object" && $result->queryString)? $result->queryString : $result;
$spider = $_SESSION["_SPIDER_"]["prefijo"].(++$_SESSION["_SPIDER_"]["pk"]).".dt";
$_SESSION["_SPIDER_"]["file"][md5(serialize($pnt))] = $spider;
$sql = str_replace(array(chr(10),chr(13)), array(" "," "), trim($sql));
error_log($spider.' >>> '.$sql."\n", 3, $_SESSION["_SPIDER_"]["prefijo"]."0.sql");
}
function __SpiderDataPut($puntero, $row){
if( $row ){
$pnt = (gettype($puntero)=="object" && $puntero->queryString)? $puntero->queryString : $puntero;
error_log(serialize($row)."\n", 3, $_SESSION["_SPIDER_"]["file"][md5(serialize($pnt))]);
}
}
function __SpiderDataUnDef($sql){
$sql = str_replace(array(chr(10),chr(13)), array(" "," "), trim($sql));
$md = md5(trim($sql));
$_SESSION["_SPIDER_"]["linea"][$md] = 0;
}
function __SpiderDataGet($sql){
$sql = str_replace(array(chr(10),chr(13)), array(" "," "), trim($sql));
$md = md5(trim($sql));
$file = $_SESSION["_SPIDER_"]["file"][$md];
$pk = $_SESSION["_SPIDER_"]["linea"][$md];
$datos = trim(file($file)[$pk]);
$_SESSION["_SPIDER_"]["linea"][$md]++;
return unserialize($datos);
}
function __SpiderSaveHtml($file){
file_put_contents($_SESSION["_SPIDER_"]["prefijo"].$_SESSION["_SPIDER_"]["pk"]."_0.htm", ob_get_contents());
}
if( $_GET["STOP"]=="SPIDER" ){
unset($_SESSION["_SPIDER_"]);
die("delete top._Spider;");
}
?>
