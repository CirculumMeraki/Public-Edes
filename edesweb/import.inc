<?PHP
function eImportCSV( $File, $Tabla ){
$arrResult = array();
$df = fopen(eScript($File),"r");
if( $df ){
$Campos = fgetcsv($df,1000,";");
$TCampos = count($Campos);
echo '<table border=1>';
echo '<tr>';
for( $n=0; $n<$TCampos; $n++ ){
if( $Campos[$n]!='' ) echo '<th>'.$Campos[$n];
}
while(( $Linea = fgetcsv($df,1000,";"))!==false ){
$arrResult[] = $Linea;
echo '<tr>';
for( $n=0; $n<$TCampos; $n++ ){
if( $Campos[$n]!='' ){
echo '<td>'.$Linea[$n];
}
}
}
fclose($df);
echo '</table>';
echo '<pre>';
print_r($arrResult);
echo '</pre>';
}
}
?>
