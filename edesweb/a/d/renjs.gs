<?PHP
_FileNoCache('edes.js');
chdir('../../edes');
$Rastro = true;
$_TReg = 0;
$_ValorActual = '';
$Copy = array( 'gs', 'inc', 'php', 'sel',  'edf','gdf','ldf','fdf','zdf' );
$NoCopy = array( 'bak', 'alb', 'hta', 'xar', 'old', 'OLD', 'no', 'NO',    'gif','jpg','png', 'htm', 'css', 'js' );
$NoDir = array( './a/chart','./a/g','./a/h','./h','./http/css','./http/g','./i','./lng','./m/_bak_','./m/edes.help','./tcpdf','./win', './web/aplication/http/install' );
$Dim = file('_ficha.gs');
for( $n=0; $n<count($Dim); $n++ ){
if( substr_count( $Dim[$n], 'edicion.js&j=' ) > 0 ){
$_ValorActual = substr( $Dim[$n], strrpos( $Dim[$n],'edicion.js&j=') + 13, 1 );
break;
}
}
if( $_ValorActual=='' ) die('Valor no encontrado');
$_NuevoValor = ((int)$_ValorActual)+1;
if( $_NuevoValor > 9 ) $_NuevoValor = '0';
echo 'Modificado el parámetro de los script JS de ['.$_ValorActual.'] a ['.$_NuevoValor.']<br>';
ModScript( ".", $Copy, $NoCopy, $NoDir );
echo '<br><br>Total ficheros cambiados: '.$_TReg;
function ModScript( $dorg, $ext, $NoExt, $NoDir ){
global $Rastro, $_Nivel, $_NuevoValor, $_ValorActual, $_TReg;
$_Nivel++;
if( in_array( $dorg, $NoDir ) ){
$_Nivel--;
return;
}
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( is_dir($dorg.'/'.$file) ){
if( $file[0]!='_' && substr($file,-1)!='_' ){
ModScript( "$dorg/$file", $ext, $NoExt, $NoDir );
}
}else{
if( in_array( substr($file, strrpos($file,'.')+1), $ext ) ){
$Dim = file($dorg.'/'.$file);
for( $n=0; $n<count($Dim); $n++ ){
if( substr_count( $Dim[$n], '.js&j='.$_ValorActual ) > 0 ){
ModificarScript( $dorg.'/'.$file );
$_TReg++;
break;
}
}
}
}
}
}
closedir( $di );
$_Nivel--;
}
function ModificarScript( $File ){
global $Rastro, $_NuevoValor, $_ValorActual;
echo '<br>'.$File;
$Kb = filesize($File);
$txt = '';
$Dim = file( $File );
for( $n=0; $n<count($Dim); $n++ ){
if( substr_count( $Dim[$n], '.js&j='.$_ValorActual ) > 0 ){
$Dim[$n] = str_replace( '.js&j='.$_ValorActual, '.js&j='.$_NuevoValor, $Dim[$n] );
}
$txt .= $Dim[$n];
}
if( $Kb<>strlen($txt) ) die('Error en la longitud resultante');
file_put_contents( $File, $txt );
}
?>
