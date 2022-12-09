<?PHP
$dim = array();
$tmp = explode("|", $_POST["data"]);
for($n=0; $n<(count($tmp)-1); $n++){
$tmp2 = explode("=", $tmp[$n]);
$dim[trim($tmp2[0])] = trim($tmp2[1]);
}
$file = str_replace("/","_",$_POST["source"]).".lst.".$_SESSION["_User"];
file_put_contents("../_datos/usr/{$file}", serialize($dim));
die("Configuración guardada");
?>
