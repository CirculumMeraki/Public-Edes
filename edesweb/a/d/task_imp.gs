<?PHP
_FileNoCache('edes.js');
$DimFile = array();
$di = opendir( '../_tmp/tsk/' );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( substr($file,0,5)=='task_' && substr($file,-4)=='.txt' && strlen($file)==17 ) $DimFile[] = $file;
}
}
closedir( $di );
sort($DimFile);
if( count($DimFile) > 0 ){
eInclude( $_Sql );
$FuncExterna = false;
if( file_exists('../_datos/config/task_import.php') ){
include( '../_datos/config/task_import.php' );
$FuncExterna = true;
}
}
for( $f=0; $f<count($DimFile); $f++ ){
$file = $DimFile[$f];
$Campos = '';
$Valores = '';
$_vF = array();
$Dim = file('../_tmp/tsk/'.$file);
for( $n=0; $n<count($Dim); $n++ ){
$Campo = substr($Dim[$n],0,strpos($Dim[$n],'='));
$Valor = rtrim(substr($Dim[$n],strpos($Dim[$n],'=')+1));
if( $Campo=='description' ) $Valor = str_replace( '"', '&quot;', urldecode($Valor));
$_vF[$Campo] = $Valor;
if( $Campo[0]=='_' ) continue;
if( $Campos!='' ) $Campos .= ',';
$Campos .= $Campo;
if( $Valores!='' ) $Valores .= ',';
$Valores .= '"'.$Valor.'"';
}
$_DEBUG = 1;
if( $FuncExterna ){
task_import( $_vF );
}else{
qQuery( 'insert into gs_development ('.$Campos.') values ('.$Valores.')' );
}
@unlink( '../_tmp/tsk/'.$file );
@unlink( '../_tmp/tsk/'.substr($file,0,14).'jpg' );
}
?>
