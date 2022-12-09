<?PHP
function gsIMG( $img ){
switch( $GLOBALS['_AlmacenIMG'] ){
case 'M': return( 'edes.php?R:$t/'.$GLOBALS['_gsPrefijo'].$GLOBALS['_DirG']."/{$img}.gif" );
case 'C': return( "c:/"."/edesweb/t/".$GLOBALS['_DirG']."/{$img}.gif" );
case 'F': return( "t/99.gs?I:{$img}" );
}
}
function gsJS( $script ){
switch( $GLOBALS['_AlmacenJS'] ){
case 'M': return( 'edes.php?R:$t/js/'.$script.'.js' );
case 'C': return( "c:/"."/edesweb/t/js/{$script}.js" );
case 'F': return( "t/99.gs?J:{$script}" );
}
}
function gsCSS( $script ){
switch( $GLOBALS['_AlmacenCSS'] ){
case 'M': return( 'edes.php?R:$t/css/'.$GLOBALS['_gsPrefijo'].$script.'.css' );
case 'C': return( "c:/"."/edesweb/t/css/{$script}.css" );
case 'F': return( "t/99.gs?C:{$script}" );
}
}
?>
