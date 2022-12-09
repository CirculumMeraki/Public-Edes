<?PHP
if( $_SESSION["List"]["TCPDF"] ){
include('../../edesweb/letterhead_tc.inc');
return;
}
if( file_exists("../_tmp/pdf/printtab2_{$_User}.png") ) UnirPNG( $_User );
$ConRastro = false;
if( $ConRastro ) eTron('1');
$FicheroPDF = '../_datos/config/pdf.ini';
@include( $FicheroPDF );
if( $ConRastro ) eTron('2');
if( !isset($PDF_FontSize) && isset($PDF_AltoLetra) ) $PDF_FontSize = $PDF_AltoLetra;
if( !isset($PDF_Horientacion)	 ) $PDF_Horientacion	 = 'V';
if( !isset($PDF_yMargen)		 ) $PDF_yMargen			 = 30;
if( !isset($PDF_y2Margen)		 ) $PDF_y2Margen		 = 10;
if( !isset($PDF_xMargen)		 ) $PDF_xMargen			 = 20;
if( !isset($PDF_xImagen)		 ) $PDF_xImagen			 = 15;
if( !isset($PDF_yImagen)		 ) $PDF_yImagen			 = 15;
if( !isset($PDF_FontSize)		 ) $PDF_FontSize		 = 8.0;
if( !isset($PDF_Imagen)			 ) $PDF_Imagen			 = '';
if( !isset($PDF_ImagenScale)	 ) $PDF_ImagenScale		 = 1;
if( !isset($PDF_OffsetDescripcion)) $PDF_OffsetDescripcion= 20;
if( !isset($PDF_OffsetCabecera)	 ) $PDF_OffsetCabecera	 = 20;
if( !isset($PDF_OffsetPie)		 ) $PDF_OffsetPie		 = 15;
if( !isset($PDF_OffsetSombra)	 ) $PDF_OffsetSombra	 = $PDF_FontSize/2;
if( !isset($PDF_FontFamily)		 ) $PDF_FontFamily		 = 'Courier';
if( !isset($PDF_TxtCabecera)	) $PDF_TxtCabecera	= '';
if( !isset($PDF_TxtFecha)		) $PDF_TxtFecha		= 'Fecha: #F#';
if( !isset($PDF_NumPagina)		) $PDF_NumPagina	= 'D';
if( !isset($PDF_TxtPagina)		) $PDF_TxtPagina	= 'Pág #P#';
if( !isset($PDF_Fecha)			) $PDF_Fecha		= 1;
if( !isset($PDF_Colors)  ) $PDF_Colors = false;
if( isset($BW) && $BW==1 ) $PDF_Colors = false;
$_Color = array();
ColoresEnPDF();
if( $ConRastro ) eTron('3');
global $_User, $p, $nPag, $y;
if( $PDF_Horientacion=='V' ){
$HojaAncho	= 595.0;
$HojaAlto	= 842.0;
}else{
$HojaAncho	= 842.0;
$HojaAlto	= 595.0;
}
if( isset($PDF_Width)  ) $HojaAncho = $PDF_Width;
if( isset($PDF_Height) ) $HojaAlto  = $PDF_Height;
$SaltoLinea		= 1.5;
$FontSizeTH		= $PDF_FontSize;
$FontPuntos		= ( $PDF_FontSize * 600 / 1000 );
$MargenHoja		= $PDF_xMargen;
$AltoLineas		= 0;
$y				= $HojaAlto;
$InicioY		= 0;
$nPag			= 1;
$oNomFile = '/_tmp/pdf/printtab_'.$_User.'.pdf';
if( PHP_OS=='WINNT' ){
$NomFile = str_replace( '/http/edes.php', '', $_SERVER['SCRIPT_FILENAME'] ).$oNomFile;
}else{
$NomFile = '..'.$oNomFile;
}
if( $ConRastro ) eTron($NomFile);
if( file_exists($NomFile) ) unlink($NomFile);
if( $ConRastro ) eTron('4');
if( $ConRastro ) eTron('41');
$p = PDF_new();
if( $ConRastro ) eTron('42');
if( $ConRastro ) eTron($PDF_License);
if( $PDF_License!='' ) PDF_set_parameter( $p, 'license', $PDF_License );
if( $ConRastro ) eTron('43');
PDF_open_file( $p, $NomFile );
if( $ConRastro ) eTron('44');
if( $PDF_InfoTitulo!='' ) PDF_set_info( $p, 'Title'	 , $PDF_InfoTitulo );
if( $ConRastro ) eTron('44a');
if( $_SESSION["ApplicationName"]!='' ) PDF_set_info( $p, 'Author'	 , $_SESSION["ApplicationName"] );
if( $ConRastro ) eTron('44b');
PDF_set_info( $p, 'Keywords', 'eDes' );
if( $ConRastro ) eTron('44c');
if( $_eDesTitle!='' ) PDF_set_info( $p, 'Creator' , $_eDesTitle );
if( $ConRastro ) eTron('45');
qQuery('select user_name,user_surname from gs_user where cd_gs_user='.$_GET['FILE'] );
list( $nom, $ape ) = qRow();
$_UsuarioDelPDF = trim($nom).' '.trim($ape);
pdf_set_info($p, "De", $_UsuarioDelPDF );
$VersionPDF = pdf_get_value( $p, "major", 0 );
if( $VersionPDF < 5 ) $PDF_Colors = false;
if( $ConRastro ) eTron('46');
for( $nHoja=0; $nHoja<$HOJAS; $nHoja++ ){
if( $HOJAS==1 ){
$PDF_ImagenEDF = "/_tmp/pdf/printtab_{$_User}.png";
}else{
$PDF_ImagenEDF = "/_tmp/pdf/printtab_{$nHoja}_{$_User}.png";
}
if( PHP_OS=='WINNT' ){
$PDF_ImagenEDF = str_replace( '/http/edes.php', '', $_SERVER['SCRIPT_FILENAME'] ).$PDF_ImagenEDF;
}else{
$PDF_ImagenEDF = '..'.$PDF_ImagenEDF;
}
if( $ConRastro ) eTron($PDF_ImagenEDF);
if( !file_exists($PDF_ImagenEDF) ) continue;
PDF_begin_page( $p, $HojaAncho, $HojaAlto );
if( $ConRastro ) eTron('47');
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
PDF_set_parameter( $p, 'openmode', 'none' );
PDF_set_parameter( $p, 'transition', 'dissolve' );
PDF_setlinewidth( $p, 0.1 );
if( $ConRastro ) eTron('5');
$y = 0;
if( $VersionPDF >= '6' ){
$capheight = PDF_get_value( $p, 'capheight', $font ) * $PDF_FontSize;
$ascender  = PDF_get_value( $p, 'ascender' , $font ) * $PDF_FontSize;
$descender = PDF_get_value( $p, 'descender', $font ) * $PDF_FontSize;
}else{
$capheight = PDF_get_value( $p, 'capheight' ) * $PDF_FontSize;
$ascender  = PDF_get_value( $p, 'ascender'  ) * $PDF_FontSize;
$descender = PDF_get_value( $p, 'descender' ) * $PDF_FontSize;
}
$AltoLineas = ( $ascender + ($descender*-1) ) * $SaltoLinea;
Membrete( $PDF_Imagen );
$TopY = $y;
if( $ConRastro ) eTron('6');
if( $y == 0 ){
$y = ( $HojaAlto - $PDF_yMargen );
}else{
$y -= $PDF_OffsetCabecera;
}
$_FinalListado = $y + $AltoLineas;
if( $ConRastro ) eTron('7');
if( file_exists($PDF_ImagenEDF) ){
if( $ConRastro ) eTron('888888');
$imag = PDF_open_image_file( $p, 'png', $PDF_ImagenEDF, '', 0 );
$w = pdf_get_value( $p, "imagewidth" , $imag );
$h = pdf_get_value( $p, "imageheight", $imag );
$sw = $w;
$sh = $h;
$Zoom = 0.8;
$w *= $Zoom;
$h *= $Zoom;
if( $w > ($HojaAncho*0.97) ){
$w = $sw;
$h = $sh;
$Zoom = ($HojaAncho/$w)*0.97;
$Alto = $h * $Zoom;
$xImg = ($HojaAncho - ($w*$Zoom))/2;
$yImg = $_FinalListado-$Alto;
}else{
$Alto = $h;
$Ancho = $w;
$xImg = ($HojaAncho-$w)/2;
$yImg = $_FinalListado-$Alto;
}
if( $yImg * 2 > $yImg ){
$yImg -= $PDF_yMargen;
}else{
$yImg = $yImg/2;
}
if( $yImg<0 ){
$yImg = 0;
if( $Alto > $TopY-5 ){
$Coef = ($TopY-5)/$Alto;
$Zoom *= $Coef;
$xImg = ($HojaAncho - ($w*$Zoom))/2;
}
}
PDF_save($p);
PDF_place_image( $p, $imag, $xImg, $yImg, $Zoom );
PDF_close_image( $p, $imag );
PDF_restore($p);
@unlink($PDF_ImagenEDF);
}
$PDF_NumPagina = 'No';
if( $ConRastro ) eTron('9');
Pie();
if( $ConRastro ) eTron('10');
}
PDF_close($p);
if( $ConRastro ) eTron('11');
function Membrete( $PDF_Imagen ){
global $p, $y, $MargenHoja, $HojaAncho, $HojaAlto, $FontPuntos, $PDF_yMargen;
global $FontSizeTH, $PDF_Ordenacion;
global $PDF_xImagen, $PDF_yImagen, $PDF_Fecha, $PDF_TxtCabecera, $PDF_TxtFecha;
global $PDF_OffsetDescripcion, $PDF_Titulo, $PDF_Colors, $_Color, $PDF_ImagenScale;
$Ancho = 0;
$Alto = 0;
if( $PDF_Imagen != '' ){
$Extension = str_replace('jpg','jpeg',substr( $PDF_Imagen, strpos($PDF_Imagen,'.')+1 ));
if( PHP_OS=='WINNT' ){
$PDF_Imagen = str_replace( '/http/edes.php', '', $_SERVER['SCRIPT_FILENAME'] ).$PDF_Imagen;
}else{
$PDF_Imagen = eScript($PDF_Imagen);
}
$imagen = PDF_open_image_file( $p, $Extension, $PDF_Imagen, '', 0 );
if( $imagen == -1) {
die( 'Error al leer la imagen' );
}else{
$Ancho = PDF_get_value($p,'imagewidth',$imagen);
if( $Ancho == 0 ) die( 'Error la imagen no tiene información del ancho' );
$Alto = PDF_get_value($p,'imageheight',$imagen);
if( $Alto == 0 ) die( 'Error la imagen no tiene información del alto' );
$Ancho *= $PDF_ImagenScale;
$Alto *= $PDF_ImagenScale;
PDF_place_image( $p, $imagen, $PDF_xImagen, $HojaAlto-$PDF_yImagen-$Alto, $PDF_ImagenScale );
PDF_close_image( $p, $imagen );
if( $MargenHoja < ($PDF_yImagen + $Ancho) ){
$Ancho = ($PDF_yImagen+$Ancho) - $MargenHoja;
}else{
$Ancho = 0;
}
}
}
$y = $HojaAlto - $PDF_yMargen;
if( $PDF_TxtCabecera != '' ){
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['COMPANY']['COLOR'], 'fill' );
PDF_show_xy( $p, $PDF_TxtCabecera, $Ancho+$MargenHoja, $y );
PDF_restore($p);
}
if( $PDF_Fecha ){
while( substr_count( $PDF_TxtFecha, '#' ) > 1 ){
$tmp = trim( substr( $PDF_TxtFecha, strpos( $PDF_TxtFecha, '#' )+1 ) );
$tmp = trim( substr( $tmp, 0, strpos( $tmp, '#' ) ) );
if( $tmp == 'F' || $tmp == 'D'){
$PDF_TxtFecha = str_replace( '#'.$tmp.'#', date('d-m-Y'), $PDF_TxtFecha );
}else if( $tmp == 'H' ){
$PDF_TxtFecha = str_replace( '#'.$tmp.'#', date('H:i:s'), $PDF_TxtFecha );
}else if( $tmp == 'CDI' ){
$PDF_TxtFecha = str_replace( '#'.$tmp.'#', date('Y-m-d H:i:s'), $PDF_TxtFecha );
}else if( substr_count($tmp,'(' ) > 0 ){
$PDF_TxtFecha = str_replace( '#'.$tmp.'#', @eval( "return(".$tmp.");" ), $PDF_TxtFecha );
}
}
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['DATE']['COLOR'], 'fill' );
PDF_show_xy( $p, $PDF_TxtFecha, $HojaAncho-$MargenHoja-(strlen($PDF_TxtFecha)*$FontPuntos), $y );
PDF_restore($p);
}
$y -= 2;
if( $PDF_TxtCabecera != '' ){
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['HR']['COLOR'], 'fill' );
PDF_moveto($p, $Ancho+$MargenHoja, $y); PDF_lineto( $p, $HojaAncho-$MargenHoja, $y );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
}
}
function Pie(){
global $p, $PDF_xMargen, $MargenHoja, $ascender, $nPag, $HojaAncho, $HojaAlto, $PDF_Colors, $_Color, $_FORMATTOTALSCS;
global $FontPuntos, $InicioY, $y, $AltoLineas, $PDF_y2Margen, $_PDFINCLUDE;
global $PDF_OffsetSombra, $PDF_NumPagina, $PDF_TxtPagina;
$Des = ($AltoLineas*1)-($ascender/2);
$txt = str_replace( '#P#', $nPag, $PDF_TxtPagina );
switch( $PDF_NumPagina ){
case 'I':
$x = $MargenHoja;
break;
case 'C':
$x = ($HojaAncho-(strlen($txt)*$FontPuntos)) / 2;
break;
case 'D':
$x = $HojaAncho-$MargenHoja-(strlen($txt)*$FontPuntos);
break;
default:
$x = -1;
}
if( $x >= 0 ){
if( $PDF_Colors ) SetColor( $p, $_Color['PAGNUMBER']['COLOR'], 'both' );
PDF_show_xy( $p, $txt, $x, $PDF_y2Margen );
}
PDF_end_page( $p );
$y -= $PDF_OffsetPie;
return;
}
function SetColor( $p, $Color, $Tipo ){
if( $Color=='' ) return;
if( $Color == ($Color*1).'' ){
PDF_setcolor($p, $Tipo ,'gray', $Color, 0, 0, 0 );
return;
}
list( $xr, $xg, $xb ) = explode("\n",chunk_split( str_replace('#','',$Color), 2 ));
$vr = base_convert($xr,16,10)/256;
$vg = base_convert($xg,16,10)/256;
$vb = base_convert($xb,16,10)/256;
if( $vr == $vg && $vr == $vb ){
PDF_setcolor($p, $Tipo ,'gray', $vr, 0, 0, 0 );
}else{
PDF_setcolor($p, $Tipo ,'rgb', $vr, $vg, $vb, 0 );
}
}
function ColoresEnPDF(){
global $_Color;
if( !file_exists("{$_SESSION['_PathCSS']}/pdf.css") ) return;
$Dim = file("{$_SESSION['_PathCSS']}/pdf.css");
for( $n=0; $n<count($Dim); $n++ ){
if( substr_count($Dim[$n],'{') == 1 ){
list( $Dim[$n] ) = explode('/'.'*',$Dim[$n]);
list( $Regla ) = explode('{',strtoupper($Dim[$n]));
$Regla = trim($Regla);
if( $Regla[0] == '#' || $Regla[0] == '.' ) $Regla = substr($Regla,1);
$i = $n;
while( substr_count($Dim[++$i],'}')==0 ){
list( $Dim[$i] ) = explode('/'.'*',$Dim[$i]);
list( $NomColor, $ValColor ) = explode(':',strtoupper($Dim[$i]));
$NomColor = trim($NomColor);
$ValColor = trim($ValColor);
if( substr($ValColor,-1)==';' )$ValColor =  substr($ValColor,0,-1);
$_Color[$Regla][$NomColor] = $ValColor;
}
}
}
}
function SetFuente( $Atributo ){
global $_Color, $font, $p, $PDF_FontSize ;
switch( $_Color[$Atributo]['FONT-WEIGHT'] . $_Color[$Atributo]['FONT-STYLE'] ){
case 'BOLD':
case 'BOLDNORMAL':
$font = PDF_findfont( $p, 'Courier-Bold', 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
break;
case 'ITALIC':
case 'ITALICNORMAL':
case 'OBLIQUE':
case 'OBLIQUENORMAL':
$font = PDF_findfont( $p, 'Courier-Oblique', 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
break;
case 'BOLDITALIC':
case 'BOLDOBLIQUE':
$font = PDF_findfont( $p, 'Courier-BoldOblique', 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
break;
}
}
function UnirPNG( $_User ){
$Img1   = "../_tmp/pdf/printtab_{$_User}.png";
$Img2   = "../_tmp/pdf/printtab2_{$_User}.png";
$ImgTmp = "../_tmp/pdf/printtmp_{$_User}.png";
$tImg1 = getimagesize($Img1);
$tImg2 = getimagesize($Img2);
$Ancho = max( $tImg1[0], $tImg2[0] );
$Alto = $tImg1[1] + $tImg2[1];
$baseimagen = ImageCreateTrueColor( $Ancho, $Alto );
$black = ImageColorAllocate($baseimagen, 0, 0, 0);
$logo = ImageCreateFromPng($Img1);
imagecopymerge($baseimagen, $logo     , 0,    0     , 0, 0, $tImg1[0], $tImg1[1], 100);
$ts_viewer = ImageCreateFromPng($Img2);
imagecopymerge($baseimagen, $ts_viewer, 0, $tImg1[1], 0, 0, $tImg2[0], $tImg2[1], 100);
imagePNG( $baseimagen, $ImgTmp );
ImageDestroy($logo);
ImageDestroy($ts_viewer);
ImageDestroy($baseimagen);
@unlink($Img1);
@unlink($Img2);
clearstatcache();
rename( $ImgTmp, $Img1 );
}
?>
