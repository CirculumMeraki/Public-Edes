<?PHP
$data = $_POST["scr"];
if( preg_match('/^data:image\/(\w+);base64,/', $data, $type) ){
$data = substr($data, strpos($data, ',') + 1);
$type = strtolower($type[1]);
if( !in_array($type, ['jpg', 'jpeg', 'gif', 'png']) ){
exit;
}
$data = base64_decode($data);
if( $data===false ){
exit;
}
}else{
exit;
}
if( $_GET["name"]<>"" ){
$name = str_replace(array("/","\\","&",":"), array("","","",""), trim($_GET["name"]));
file_put_contents("../_tmp/zip/{$name}.{$type}", $data);
}else if( $_SESSION["_SPIDER_"]["prefijo"]<>"" ){
file_put_contents($_SESSION["_SPIDER_"]["prefijo"].".{$type}", $data);
}
echo 'top.S.info();';
echo 'top.S.info(window, "Captura grabada", 3, "OK");';
eEnd();
?>
