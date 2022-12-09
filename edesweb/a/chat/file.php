<?PHP
if( !function_exists("qQuery") ){
eInclude($_Sql);
}
if( $_GET["FILE"]!="" ){
list($pk, $md5) = explode(".", $_GET["FILE"]);
qQuery("select * from gs_chat_file where cd_gs_chat_file=".($pk*1));
$r = qArray();
if( $r["md5"]==$md5 ){
$ext = eFileExtension($r["file"]);
$archivo = eScript("/"."/chat/".$r["cd_gs_chat_file"].".".$ext);
$nom = eClearAccent(str_replace("&#769;","",$r["file"]), false);
header("Content-Type: application/force-download");
header("Content-Disposition: attachment; filename={$nom}.{$ext}");
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".filesize($archivo));
readfile($archivo);
eEnd();
}
}else{
$file = eEntityEncode($_POST["file"]);
$md5 = md5(rand(10000,99999));
qQuery("insert into gs_chat_file
(  cd_gs_chat_room ,       cd_gs_user     ,         cdi_create      ,   file  ,   md5  ) values
(".$_POST["room"].",".$_SESSION["_User"].",'".date("Y-m-d H:i:s")."','{$file}','{$md5}')
");
$pk = qId();
$fileOri = "../_tmp/zip/".$_POST["tmp"];
$fileDes = eScript("/"."/chat/".$pk.".".eFileExtension($file));
@rename($fileOri, $fileDes);
die($pk.".".$md5);
}
?>
