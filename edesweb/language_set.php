<?PHP
if( $_GET["_LANG"]!="" ){
$_SESSION['_LANGUAGE_'] = $_GET["_LANG"];
}
$file = eScript($_JSINCLUDEFILE);
if( file_exists($file) ) @unlink($file);
$campo = "text_{$_SESSION['_LANGUAGE_']}";
qQuery("select * from {$_SESSION['ShareDictionary']}gs_storage where type_storage='x' order by cdi");
while($r=qArray()){
$text = addslashes($r[$campo]);
if( $text=="" ) $text = addslashes($r["text_es"]);
$text = str_replace(array(chr(10), chr(13)), array("&#0A;","&#0D;"), $text);
if( $_GET["_LANG"]!="" ){
echo "localStorage.setItem('e-{$r['type_storage']}{$r['key_storage']}', '{$text}');";
}else{
error_log("localStorage.setItem('e-{$r['type_storage']}{$r['key_storage']}', '{$text}');", 3, $file);
}
}
if( $_GET["_LANG"]!="" ){
echo "localStorage.setItem('e-language', '{$_SESSION['_LANGUAGE_']}');";
}else{
error_log("localStorage.setItem('e-language', '{$_SESSION['_LANGUAGE_']}');", 3, $file);
}
if( $_GET["_LANG"]!="" ){
$idioma = qRecord("select * from {$_SESSION['ShareDictionary']}gs_language where tf_translation='S' and cd_gs_language='{$_SESSION['_LANGUAGE_']}'")['nm_gs_language'];
echo "top.S.info('Establecido idioma \"<b>{$idioma}</b>\"');";
eEnd();
}
?>
