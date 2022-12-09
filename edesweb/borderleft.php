<?PHP
$file = str_replace("/","_",$_POST["source"]).".bleft.".$_SESSION["_User"];
if( $_POST["px"]==1 ){
file_put_contents("../_datos/usr/{$file}", $_POST["px"]);
}else if( file_exists("../_datos/usr/{$file}") ){
@unlink("../_datos/usr/{$file}");
}
die("Configuración guardada");
?>
