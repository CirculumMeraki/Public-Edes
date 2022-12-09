<?PHP
$archivo = eScript($file);
if( preg_match('/(\.gif|\.png|\.jpg|\.jpeg|\.pdf|\.mp4)$/i', $archivo) && $_GET["_DOWN"]<>"1" ){
if( isset($_GET["_IFRAME"]) ){
eExeScript('location.href = "edes.php?E:$img.php'.(isset($_GET["_TOOLSIMG"])? "&_TOOLSIMG=1":"").'&IMG='.$file.'";');
}else{
eExeScript('top.S.window("edes.php?E:$img.php'.(isset($_GET["_TOOLSIMG"])? "&_TOOLSIMG=1":"").'&IMG='.$file.'");');
}
}else{
$ext = eFileExtension($sFile);
eExplodeLast(basename($nom), ".", $nom, $ext);
$nom = eClearAccent(str_replace("&#769;","",$nom), false);
header("Content-Type: application/force-download");
header("Content-Disposition: attachment; filename={$nom}.{$ext}");
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".filesize($archivo));
readfile($archivo);
}
eEnd();
?>
