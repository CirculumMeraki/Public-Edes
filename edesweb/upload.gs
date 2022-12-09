<?PHP
if( $_gsID <> getmypid() ) exit;
foreach( $_FILES as $k=>$v ){
$uploadFile = $_FILES[$k]['name'];
$Dir = '../_tmp/exc/upload_';
move_uploaded_file( $_FILES[$k]['tmp_name'], $Dir.$uploadFile );
if( substr_count( $uploadFile, '.einfo' ) == 1 ){
$Dim = file($Dir.$uploadFile);
@unlink( $Dir.$uploadFile );
$uploadFile = $Dir.substr($uploadFile,0,-6).'_000';
$Dim[0] = '/'.str_replace(chr(92),'/',trim($Dim[0]));
$NuevoFile = '../_tmp/exc/'.substr( $Dim[0], strrpos($Dim[0],'/')+1 );
@unlink( $NuevoFile );
rename( $uploadFile, $NuevoFile );
@unlink( $uploadFile );
if( trim($Dim[1])<>"" ){
for( $n=2; $n<count($Dim); $n++ ){
if( trim($Dim[$n])<>"" ){
if( substr(trim($Dim[$n]),0,6)=='M.A.C=' ){
list(,$MAC) = explode('"',$Dim[$n]);
_MoverFileInfoPC( $MAC );
$Dim[1] = '';
}else{
eval( trim($Dim[$n]) );
}
}
}
$_NMFILE = trim($NuevoFile);
$nm_include = trim($Dim[1]);
if( $nm_include <> '' ){
unset( $_gsID );
unset( $Dim ); unset( $uploadFile ); unset( $NuevoFile );
unset( $v ); unset( $k ); unset( $Dir ); unset( $n ); unset( $_D_ ); unset( $_gsTron );
unset( $_POST ); unset( $_FILES ); unset( $HTTP_POST_FILES );
unset( $file_name ); unset( $file_type ); unset( $file ); unset( $file_size );
unset( $argv ); unset( $argc );
$REQUEST_URI = $_SERVER['SCRIPT_NAME'];
if( !isset($_DB) ){
eval( _LoadSqlIni( '../_datos/config/sql.ini' ) );
include_once( '../../edesweb/'.$_Sql.'.inc' );
}
include( eScript($nm_include) );
}
eEnd();
}
}else{
list( $User, $CDI, $NFile ) = explode('_',$uploadFile);
if( $NFile > 0 ){
$pnW = fopen( $Dir.$User.'_'.$CDI.'_000', 'a+' );
$pnL = fopen( $Dir.$uploadFile, 'r' );
$Long = filesize($Dir.$uploadFile);
$Leer = ceil( $Long / ceil( $Long / 5000 ) );
while( $Long > 0 ){
fwrite( $pnW, fread( $pnL, $Leer ) );
$Long -= $Leer;
if( $Long < $Leer ) $Leer = $Long;
}
fclose($pnL);
fclose( $pnW );
@unlink( $Dir.$uploadFile );
}
}
}
eEnd();
function _MoverFileInfoPC( $MAC ){
$File = eScript('/_datos/usr/'.$MAC.'.pc');
if( file_exists($File) ){
@unlink( $File );
}
rename( '../_tmp/exc/'.$MAC.'.pc', $File );
}
?>
