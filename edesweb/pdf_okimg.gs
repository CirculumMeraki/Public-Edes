<?PHP
function PDF_ImagenOk( $Dim ){
global $PDF_License;
$PorPantalla = true;
$NomFile = '../_tmp/pdf/pdf_okimg_'.$_SESSION['_User'].'.pdf';
$NomFile = '_pdf_okimg_.pdf';
if( file_exists($NomFile) ) unlink($NomFile);
$p = PDF_new();
if( $PDF_License!='' ) PDF_set_parameter( $p, 'license', $PDF_License );
PDF_open_file( $p, $NomFile );
$HojaAlto = 842.0;
PDF_begin_page( $p, 595.0, $HojaAlto );
$font = PDF_findfont( $p, 'Courier', 'host', 0 );
PDF_setfont( $p, $font, 8.0 );
for( $n=0; $n<count($Dim); $n++ ){
$PDF_Imagen = $Dim[$n];
$ConError = false;
$stmp = explode('.',$PDF_Imagen );
$Extension = $stmp[count($stmp)-1];
$Extension = str_replace( 'jpg', 'jpeg', $Extension );
switch( $Extension ){
case 'jpeg': $imagen = pdf_open_jpeg( $p, $PDF_Imagen ); break;
case 'gif':  $imagen = pdf_open_gif(  $p, $PDF_Imagen ); break;
case 'png':  $imagen = pdf_open_png(  $p, $PDF_Imagen ); break;
default:     $ConError = true;									break;
}
if( $ConError ){
PDF_show_xy( $p, '<ERROR> Extension no soportada. '.$PDF_Imagen, 10, $HojaAlto-15 );
$HojaAlto -= 10;
if( $PorPantalla ) echo '[ERROR] Extension no soportada. '.$PDF_Imagen.'<br>';
}else if( $imagen < 1 ){
PDF_show_xy( $p, '<ERROR> '.$PDF_Imagen, 10, $HojaAlto-15 );
$HojaAlto -= 10;
if( $PorPantalla ) echo '[ERROR] '.$PDF_Imagen.'<br>';
}else{
$Ancho = pdf_get_image_width( $p, $imagen );
$Alto = pdf_get_image_height( $p, $imagen );
}
}
PDF_end_page( $p );
PDF_close($p);
if( $PorPantalla ) if( file_exists($NomFile) ) unlink($NomFile);
}
$dim = array();
$NomDir = '../edes-inmo/_datos/fotos/';
$di = opendir( $NomDir );
while($file=readdir($di)){
if( $file!='.' && $file!='..' ) array_push($dim, $NomDir.$file);
}
closedir($di);
PDF_ImagenOk( $dim );
exit;
?>
