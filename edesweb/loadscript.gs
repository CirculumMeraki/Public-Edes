<?PHP
if( !isset($_SESSION['_User']) ){
include( 'index.html' );
exit;
}
include( '../../edesweb/'.strtolower($_GET['ScriptJS']).'.js' );
?>
