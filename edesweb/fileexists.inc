<?PHP
if( !isset($_SESSION['_User']) ) exit;
if( $GLOBALS['_gsID'] != getmypid() ) exit;
if( $argv[0][0]=='$' ) exit;
if( $argv[2]!='' ){
include( eScript( $argv[2] ) );
}
if( $argv[1]!='' ){
echo '<SCRIPT type="text/javascript">';
if( file_exists( eScript($argv[0]) ) ){
echo 'window.frameElement.WOPENER.'.$argv[1].'(true);';
}else{
echo 'window.frameElement.WOPENER.'.$argv[1].'(false);';
}
echo '</SCRIPT>';
}
eEnd();
?>
