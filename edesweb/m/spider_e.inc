<?PHP
list(,$_Script_) = explode(':', $_SERVER['QUERY_STRING']);
list($_Script_) = explode("&", $_Script_);
$_SESSION["_SPIDER_"]["opcion"] = "E";
if( !function_exists("__SpiderScript") ) include($Dir_."itm/spider.php");
$filePnt = str_replace(
array("_1.edf","../_tmp/log/"),
array("_0.pnt","../d/_spider/"),
$_Script_
);
$dim = file(eScript($filePnt));
$_SESSION["_SPIDER_"]["file"] = array();
for($n=0; $n<count($dim); $n++){
if( trim($dim[$n])<>"" ){
list($md, $fl) = explode("=", $dim[$n]);
$_SESSION["_SPIDER_"]["file"][$md] = trim($fl);
}
}
$_Sql = "spider";
?>
