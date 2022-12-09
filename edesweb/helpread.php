<?PHP
if( $_POST["file"][0]=="$" ){
$_POST["file"] = "../../edesweb/lng/help/".substr($_POST["file"],1);
}else{
$_POST["file"] = "../help/doc/".$_POST["file"];
}
if( file_exists($_POST["file"]."_".$_SESSION["_LANGUAGE_"]) ){
$_POST["file"] .= "_".$_SESSION["_LANGUAGE_"];
}
readfile($_POST["file"]);
?>
