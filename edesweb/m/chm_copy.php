<?PHP
chdir('../../');
copy('edesweb.help/tmp/edes.chm','edesweb/h/i/manual/edes.chm');
$NewCDI = date('Y-m-d H:i:s');
$pnt = fopen('edesweb/t/edes.key', 'w');
if( !$pnt ) die('No se ha podido abrir el fichero para escritura: "edes/t/edes.key"');
fputs($pnt, $NewCDI);
fclose($pnt);
exec('rm -r edesweb.help');
echo 'CHM Copiado y ficheros temporales borrados';
?>
