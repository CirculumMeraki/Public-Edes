<?PHP
set_time_limit( 0 );
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
include_once("../../lib/tcpdf/tcpdf.inc");
include_once("../../lib/tcpdf/tcpdf.php");
$NomFile = '../_tmp/pdf/printtab_88.pdf';
$p = new TCPDF( 'P', 'pt', 'A4', false, 'ISO-8859-1', false );
$p->SetDisplayMode( 'fullpage', 'continuous' );
$p->setPrintHeader(false);
$p->setPrintFooter(false);
if( $ConRastro ) eTron('43');
if( $PDF_InfoTitulo!='' ) $p->SetTitle($PDF_InfoTitulo);
if( $ConRastro ) eTron('44a');
if( $_SESSION["ApplicationName"]!='' ) $p->SetAuthor($_SESSION["ApplicationName"]);
if( $ConRastro ) eTron('44b');
$p->SetKeywords('eDes');
if( $ConRastro ) eTron('44c');
if( $_eDesTitle!='' ) $p->SetCreator($_eDesTitle);
if( $ConRastro ) eTron('45');
qQuery('select user_name,user_surname from gs_user where cd_gs_user='.$_GET['FILE'] );
list( $nom, $ape ) = qRow();
$_UsuarioDelPDF = trim($nom).' '.trim($ape);
for( $nHoja=0; $nHoja<$HOJAS; $nHoja++ ){
if( $ConRastro ){ eTron('');eTron('HOJA: '.$nHoja); }
if( $HOJAS==1 ){
$PDF_ImagenEDF = "/_tmp/pdf/printtab_{$_User}.png";
}else{
$PDF_ImagenEDF = "/_tmp/pdf/printtab_{$nHoja}_{$_User}.png";
}
if( $ConRastro ) eTron('1: '.$PDF_ImagenEDF);
if( $ConRastro ) eTron('PHP_OS: '.PHP_OS);
if( PHP_OS=='WINNT' ){
if( $ConRastro ) eTron('SCRIPT_FILENAME: '.$_SERVER['SCRIPT_FILENAME']);
$PDF_ImagenEDF = str_replace( '/http/edes.php', '', $_SERVER['SCRIPT_FILENAME'] ).$PDF_ImagenEDF;
$PDF_ImagenEDF = str_replace('http/printtab.php/','',$PDF_ImagenEDF);
if( $ConRastro ) eTron('1a: '.$PDF_ImagenEDF);
}else{
$PDF_ImagenEDF = '..'.$PDF_ImagenEDF;
if( $ConRastro ) eTron('1b: '.$PDF_ImagenEDF);
}
if( $ConRastro ) eTron('2: '.$PDF_ImagenEDF);
if( !file_exists($PDF_ImagenEDF) ) continue;
if( $ConRastro ) eTron('   > Existe la img');
$p->startPage();
if( $ConRastro ) eTron('47');
$p->SetFont( $PDF_FontFamily, '', $PDF_FontSize );
$p->SetLineWidth( 0.1 );
if( $ConRastro ) eTron('5');
$y = 0;
PDFCalcSizeFont( $PDF_FontSize );
if( $ConRastro ) eTron('5a');
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
list($w,$h) = getImageSize( $PDF_ImagenEDF );
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
if( $ConRastro ) eTron( $nHoja.' : '.$PDF_ImagenEDF.' : '.$xImg.' : '.getY($yImg, $sh*$Zoom).' : '.$sw*$Zoom.' : '.$sh*$Zoom );
$p->Image( $PDF_ImagenEDF, $xImg, getY($yImg, $sh*$Zoom), $sw*$Zoom, $sh*$Zoom, 'PNG' );
@unlink($PDF_ImagenEDF);
}
$PDF_NumPagina = 'No';
if( $ConRastro ) eTron('9');
Pie();
if( $ConRastro ) eTron('10');
$p->endPage();
if( $ConRastro ) eTron('11');
}
if( $ConRastro ) eTron('Output: INI: '.eGetInterval());
$p->Output($NomFile,'F');
if( $ConRastro ) eTron('Output: FIN: '.eGetInterval());
clearstatcache();
if( $ConRastro ) eTron('Total sg: '.eGetInterval());
function Membrete( $PDF_Imagen ){
global $p, $y, $MargenHoja, $HojaAncho, $HojaAlto, $FontPuntos, $PDF_yMargen;
global $FontSizeTH, $PDF_Ordenacion, $PDF_FontSize, $ConRastro;
global $PDF_xImagen, $PDF_yImagen, $PDF_Fecha, $PDF_TxtCabecera, $PDF_TxtFecha;
global $PDF_OffsetDescripcion, $PDF_Titulo, $PDF_Colors, $_Color, $PDF_ImagenScale;
$Ancho = 0;
$Alto = 0;
if( $PDF_Imagen != '' ){
$Extension = str_replace('jpg','jpeg',substr( $PDF_Imagen, strpos($PDF_Imagen,'.')+1 ));
if( PHP_OS=='WINNT' ){
$PDF_Imagen = str_replace( '/http/edes.php', '', $_SERVER['SCRIPT_FILENAME'] ).$PDF_Imagen;
$PDF_Imagen = str_replace('http/printtab.php/','',$PDF_Imagen);
}else{
$PDF_Imagen = eScript($PDF_Imagen);
}
if( $ConRastro ) eTron('Membrete: '.$PDF_Imagen);
list($Ancho,$Alto) = getImageSize( $PDF_Imagen );
$Ancho *= $PDF_ImagenScale;
$Alto *= $PDF_ImagenScale;
if( $MargenHoja < ($PDF_yImagen + $Ancho) ){
$Ancho = ($PDF_yImagen+$Ancho) - $MargenHoja;
}else{
$Ancho = 0;
}
if( $ConRastro ) eTron( 'Membrete: '.$PDF_Imagen.' : '.$PDF_xImagen.' : '.getY($HojaAlto-$PDF_yImagen-$Alto,$Alto).' : '.$Ancho.' : '.$Alto );
global $_PDFHeadImg;
$_PDFHeadImg = array(
$PDF_Imagen,
$PDF_xImagen,
getY($HojaAlto-$PDF_yImagen-$Alto,$Alto),
$Ancho,
$Alto,
$Extension
);
$p->Image( $_PDFHeadImg[0], $_PDFHeadImg[1], $_PDFHeadImg[2], $_PDFHeadImg[3], $_PDFHeadImg[4], $_PDFHeadImg[5] );
if( $ConRastro ) eTron('Membrete: Fin IMG');
}else if( isset($_PDFHeadImg) ){
$p->Image( $_PDFHeadImg[0], $_PDFHeadImg[1], $_PDFHeadImg[2], $_PDFHeadImg[3], $_PDFHeadImg[4], $_PDFHeadImg[5] );
}
$y = $HojaAlto - $PDF_yMargen;
if( $ConRastro ) eTron( 'Membrete: a' );
if( $PDF_TxtCabecera != '' ){
$p->Text( $Ancho+$MargenHoja, getY($y,$PDF_FontSize), $PDF_TxtCabecera );
}
if( $ConRastro ) eTron( 'Membrete: b' );
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
$p->Text( $HojaAncho-$MargenHoja-(strlen($PDF_TxtFecha)*$FontPuntos), getY($y,$PDF_FontSize), $PDF_TxtFecha );
}
$y -= 2;
if( $ConRastro ) eTron( 'Membrete: c' );
if( $PDF_TxtCabecera != '' ){
$p->Line( $Ancho+$MargenHoja, getY($y), $HojaAncho-$MargenHoja, getY($y) );
}
if( $ConRastro ) eTron( 'Membrete: d' );
}
function Pie(){
global $p, $PDF_xMargen, $MargenHoja, $ascender, $nPag, $HojaAncho, $HojaAlto, $PDF_Colors, $_Color, $_FORMATTOTALSCS;
global $FontPuntos, $InicioY, $y, $AltoLineas, $PDF_y2Margen, $_PDFINCLUDE;
global $PDF_OffsetSombra, $PDF_NumPagina, $PDF_TxtPagina, $PDF_FontSize;
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
$p->Text( $x, getY($PDF_y2Margen,$PDF_FontSize), $txt );
}
$y -= $PDF_OffsetPie;
return;
}
function SetColor( $p, $Color, $Tipo ){
if( $Color=='' ) return;
return;
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
global $_Color, $font, $p, $PDF_FontSize;
switch( $_Color[$Atributo]['FONT-WEIGHT'] . $_Color[$Atributo]['FONT-STYLE'] ){
case 'BOLD':
case 'BOLDNORMAL':
$p->SetFont( 'Courier', 'B', $PDF_FontSize );
break;
case 'ITALIC':
case 'ITALICNORMAL':
case 'OBLIQUE':
case 'OBLIQUENORMAL':
$p->SetFont( 'Courier', 'I', $PDF_FontSize );
break;
case 'BOLDITALIC':
case 'BOLDOBLIQUE':
$p->SetFont( 'Courier', 'BI', $PDF_FontSize );
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
function PDFCalcSizeFont( $PDF_FontSize, &$capheight=NULL, &$ascender=NULL, &$descender=NULL, &$FontPuntos=NULL ){
$capheight = $PDF_FontSize / 1.7452006980803;
$ascender = $PDF_FontSize / 1.5948963317384;
$descender = $PDF_FontSize / -2.6809651474531;
$FontPuntos	= ( $PDF_FontSize * 600 / 1000 );
}
function getY( $y, $AltoFont=0 ){
global $HojaAlto;
return $HojaAlto-$y-$AltoFont;
}
?>
