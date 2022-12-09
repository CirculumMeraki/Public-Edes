<?PHP
if( $_POST["op"]=="" ){
@unlink("../_d_/usr/opworking.".$_SESSION["_User"]);
}else{
file_put_contents("../_d_/usr/opworking.".$_SESSION["_User"], $_POST["op"]);
}
?>ok
