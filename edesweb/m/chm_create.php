<?PHP
$compiler = "C:/wamp64/www/edesweb.mkhelp/hhc.exe C:/wamp64/www/edesweb.help/tmp/edes.hhp";
for($n=0; $n<5; $n++) chdir("..");
$ret = exec($compiler);
print_r($ret);
?>
