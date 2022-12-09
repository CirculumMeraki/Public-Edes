<?PHP
$file = str_replace("/","_",$_POST["source"]).".offset.".$_SESSION["_User"];
if( $_POST["px"]!=5 ){
file_put_contents("../_datos/usr/{$file}", $_POST["px"]);
}else if( file_exists("../_datos/usr/{$file}") ){
@unlink("../_datos/usr/{$file}");
}
die("Configuración guardada");
?>
