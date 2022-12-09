<?PHP //[_PROTECCION_]
session_start();
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() ) exit;
if( $_SESSION['_PDF_']<>'S' ) eEnd();
include_once($Dir_.'message.inc');
$FicheroD = '../_datos/config/pdf.ini';
@include($FicheroD);
foreach( $_PDFVAR as $value ) @eval( $value );
if( !isset($PDF_Horientacion) ) $PDF_Horientacion = 'V';
if( $PDF_Horientacion=='V' ){
$HojaAncho	= 595.0;
$HojaAlto	= 842.0;
}else{
$HojaAncho	= 842.0;
$HojaAlto	= 595.0;
}
if( isset($PDF_Width)  ) $HojaAncho = $PDF_Width;
if( isset($PDF_Height) ) $HojaAlto  = $PDF_Height;
if( !isset($PDF_FontFamily) ) $PDF_FontFamily = 'Courier';
$SaltoLinea		= 1.5;
$FontSizeTH		= $PDF_AltoLetra;
$FontFamilyTH	= $PDF_FontFamily . '-Bold';
$UltimaLinea	= 0;
$FontPuntos		= ( $PDF_AltoLetra * 600 / 1000 );
$Separador		= str_repeat( ' ', $PDF_Separacion );
$MargenHoja		= $PDF_xMargen;
$MargenDerecho	= 0;
$AltoLineas		= 0;
$_NumReg		= 0;
$y				= $HojaAlto;
$x				= $MargenHoja;
$SePintoPie		= true;
$InicioY		= 0;
$nPag			= 1;
$_TipoLetra = array(
'C'=>'Courier',
'CI'=>'Courier-Oblique',
'CN'=>'Courier-Bold',
'CNI'=>'Courier-BoldOblique',
'CIN'=>'Courier-BoldOblique',
'H'=>'Helvetica',
'HI'=>'Helvetica-Oblique',
'HN'=>'Helvetica-Bold',
'HNI'=>'Helvetica-BoldOblique',
'HIN'=>'Helvetica-BoldOblique',
'T'=>'Times-Roman',
'TI'=>'Times-Italic',
'TN'=>'Times-Bold',
'TNI'=>'Times-BoldItalic',
'TIN'=>'Times-BoldItalic'
);
$_Mes = array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' );
$_Elementos = array( 0,0,0,0,-1,0 );
$_TabH = array();
$_TabV = array();
$_uTab = 1;
$_DefLabel = array();
$_DefVariable = array();
$_xT = $_yT = 0;
$_x1G = $_y1G = $_x2G = $_y2G = 0;
$xy = array();
$Datos = file( '../d/'.$_gs_ficha_ );
for( $i=0; $i<count($Datos); $i++ ){
$Datos[$i] = trim($Datos[$i]);
$d = explode(';',$Datos[$i]);
$d[0] = trim($d[0]);
if( $d[0]=='PAG' ){
if( $_Elementos[0]==0 && $_Elementos[1]==0 ){
$_Elementos[0] = $d[1]-1; $_Elementos[1] = $d[2]-1;
$_Elementos[2] = cW($d[3]+1); $_Elementos[3] = cH($d[4]);
}
break;
}
}
$ww = 0;
$hh = 0;
$PDF_xMargen = 0;
$PDF_yMargen = 0;
$NuevaPag = true;
while( $row = qArray() ){
$_NumReg++;
$_TabH = array();
$_TabV = array();
$_uTab = 1;
$_DefLabel = array();
$_DefVariable = array();
$_xT = $_yT = 0;
$_xG = $_yG = 0;
$Cabecera = false;
if( $NuevaPag ){
if( $nPag == 1 ){
$oNomFile = '/_tmp/pdf/inf_'.$_User.'.pdf';
if( $_FILEPDF!='' ){
$oNomFile = '/_tmp/pdf/inf_'.$_User.'_file_'.$_FILEPDF.'.pdf';
}
if( PHP_OS=='WINNT' ){
$NomFile = str_replace( '/http/edes.php', '', $_SERVER['SCRIPT_FILENAME'] ).$oNomFile;
}else{
$NomFile = eScript($oNomFile);
}
if( file_exists($NomFile) ) unlink($NomFile);
$p = PDF_new();
if( $PDF_License!='' ) PDF_set_parameter( $p, 'license', $PDF_License );
$optlist = '';
if( $_POST['_doc_password_']<>'' ) $optlist = 'userpassword='.$_POST['_doc_password_'].' ';
if( $PDF_FullPermissions ){
if( PDF_begin_document( $p, $NomFile, $optlist )==-1 ){
}
}else{
if( PDF_begin_document( $p, $NomFile, $optlist.'masterpassword=1805eDes1959 permissions={nomodify noassemble noannots noforms nocopy noaccessible plainmetadata}' )==-1 ){
}
}
PDF_set_info( $p, 'Title'	, $PDF_InfoTitulo );
PDF_set_info( $p, 'Author'  , $_SESSION["ApplicationName"] );
PDF_set_info( $p, 'Keywords', 'eDes' );
PDF_set_info( $p, 'Creator' , $_eDesTitle );
$VersionPDF = pdf_get_value( $p, "major", 0 );
if( $VersionPDF < 5 ) $PDF_Colors = false;
}
PDFBeginPage( $p, $HojaAncho, $HojaAlto );
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_AltoLetra );
PDF_set_parameter( $p, 'openmode', 'none' );
PDF_set_parameter( $p, 'transition', 'dissolve' );
PDF_setlinewidth( $p, 0.1 );
if( $nPag == 1 ){
if( $VersionPDF >= '6' ){
$capheight = PDF_get_value( $p, 'capheight', $font ) * $PDF_AltoLetra;
$ascender  = PDF_get_value( $p, 'ascender' , $font ) * $PDF_AltoLetra;
$descender = PDF_get_value( $p, 'descender', $font ) * $PDF_AltoLetra;
}else{
$capheight = PDF_get_value( $p, 'capheight' ) * $PDF_AltoLetra;
$ascender  = PDF_get_value( $p, 'ascender'  ) * $PDF_AltoLetra;
$descender = PDF_get_value( $p, 'descender' ) * $PDF_AltoLetra;
}
$AltoLineas = ( $ascender + ($descender*-1) ) * $SaltoLinea;
$EntreLineas = $AltoLineas - ( $ascender + ($descender*-1) );
$UltimaLinea = $PDF_y2Margen + $AltoLineas + $PDF_OffsetPie;
$IncrY = (($PDF_AltoLetra * $SaltoLinea) / 2);
}
$Cabecera = true;
}
$NuevaPag = false;
if( $_Elementos[4] < $_Elementos[0] ){
$_Elementos[4]++;
}else{
$_Elementos[4] = 0;
if( $_Elementos[5] < $_Elementos[1] ){
$_Elementos[5]++;
}else{
$_Elementos[5] = 0;
}
}
$ww = ( $_Elementos[4] * $_Elementos[2] );
$hh = (( $_Elementos[5] * $_Elementos[3] ) * -1 ) - $EntreLineas;
pdf_translate( $p, $ww, $hh );
PDF( $Datos, $nPag, $Cabecera );
pdf_translate( $p, -($ww), -($hh) );
if( $_Elementos[4] == $_Elementos[0] && $_Elementos[5] == $_Elementos[1] ){
$_Elementos[4] = -1;
$_Elementos[5] = 0;
$nPag++;
PDFEndPage( $p );
$NuevaPag = true;
}
}
if( $_NumReg > 0 ){
if( !$NuevaPag ){
$nPag++;
PDFEndPage( $p );
}
PDF_close($p);
$oNomFile = str_replace( '..','',$oNomFile );
if( isset($_REMOTE_) ){
eMessage( '~PDF','HS','','location.href = "edes.php?RD:'.$oNomFile.'";' );
}else{
eMessage( '~PDF','HS','','location.href = "edes.php?D:'.$oNomFile.'";' );
}
}else{
eMessage( '~NR','HS','','','NR' );
}
eEnd();
function cX( $x ){
global $FontPuntos, $PDF_xMargen, $_uTab;
$x = strtoupper(trim($x));
$_uTab = 1;
switch( $x[0] ){
case '';
return( $GLOBALS[_xT] );
case 'A':
return( substr($x,1) );
case 'P':
return( $PDF_xMargen + substr($x,1) );
case 'T':
global $_TabH;
$_uTab = substr($x,1);
return( $_TabH[ substr($x,1) ] );
case '%':
return( $PDF_xMargen + (($GLOBALS[HojaAncho] * substr($x,1)) / 100 ) );
case 'X1G';
return( $GLOBALS[_x1G] );
case 'C':
$x = substr($x,1);
default:
return( $PDF_xMargen + (($x-1) * $FontPuntos ) );
}
}
function cY( $y ){
global $HojaAlto, $PDF_AltoLetra, $SaltoLinea, $EntreLineas, $PDF_yMargen;
$y = strtoupper(trim($y));
switch( $y[0] ){
case '';
return( $GLOBALS[_yT] );
case 'P':
return( substr($y,1) - $PDF_yMargen );
case 'T':
global $_TabV;
return( $_TabV[ substr($y,1) ] - $PDF_yMargen );
case '%':
return( $HojaAlto - ( ( $HojaAlto * substr($y,1) ) / 100 ) - $PDF_yMargen );
case '+':
if( strlen($y) == 1 ){
return( $GLOBALS[_yT] - ( $PDF_AltoLetra * $SaltoLinea ) );
}else{
return( $GLOBALS[_yT] - ( substr($y,1) * $PDF_AltoLetra * $SaltoLinea ) );
}
break;
case 'L':
$y = substr($y,1);
default:
return( $HojaAlto - ( $y * $PDF_AltoLetra * $SaltoLinea ) + $EntreLineas - $PDF_yMargen );
}
}
function cW( $x ){
global $FontPuntos;
$x = strtoupper(trim($x));
switch( $x[0] ){
case 'P':
return substr( $x, 1 );
case 'T':
global $_TabH;
return( $_TabH[ substr( $x, 1 ) ] );
case '%':
return( ($GLOBALS[HojaAncho] * substr( $x, 1 ) ) / 100 );
case 'C':
$x = substr( $x, 1 );
default:
return( ($x-1) * $FontPuntos );
}
}
function cH( $y ){
global $HojaAlto, $PDF_AltoLetra, $SaltoLinea, $EntreLineas, $ascender;
$y = strtoupper(trim($y));
switch( $y[0] ){
case 'P':
return substr( $y, 1 );
case 'T':
global $_TabV;
return( $_TabV[ substr( $y, 1 ) ] );
case '%':
return( $HojaAlto - ( ( $HojaAlto * substr( $y, 1 ) ) / 100 ) );
case '+':
if( strlen($y) == 1 ){
}else{
}
break;
case 'L':
$y = substr( $y, 1 );
default:
return( $y * ($PDF_AltoLetra * $SaltoLinea) + $EntreLineas - ($ascender/8) );
}
}
function cT( $txt, $ConFormato ){
global $row, $_DefLabel, $_uTab, $_Mes;
if( !isset( $ConFormato ) ) $ConFormato = true;
$Def = false;
$txt = trim($txt);
if( $txt[0] == '{' ){
$Def = true;
$txt = substr( $txt, 1 );
$v = explode( '}', $txt );
if( $v[0][0] == 'R' ){
$v[0] = substr( $v[0], 1 );
$txt = str_pad($v[1], $v[0]-1, '.').': ';
}else if( $v[0][0] == 'M' ){
$txt = str_replace( '$[','$row[', $v[1] );
$txt = trim(@eval( "return eNumberFormat($txt);" ));
}else if( $v[0][0] == '#' ){
$txt = str_replace( '$[','$row[', $v[1] );
$txt = trim(@eval( "return urldecode($txt);" ));
}
}
$t = '';
if( substr_count( $txt, '#' ) > 0 ){
$txt = str_replace('#',' ',$txt);
}
if( substr( $txt,0,2 ) == '$[' ){
$txt = str_replace( '$[','$row[', $txt );
$t = trim(@eval( "return $txt;" )).$t;
}else if( $txt[0] == '$' ){
$txt = str_replace('$','$GLOBALS[',$txt).']';
$t = trim(${$txt}).$t;
}else if( $txt[0] == '+' ){
if( substr_count( $txt, '#' ) > 0 ) $t = str_repeat( ' ', substr_count( $txt, '#' ) );
$t = trim(@eval( 'return '.substr($txt,1).';' )).$t;
}else{
if( $ConFormato && !$Def && $_DefLabel[$_uTab]!='' ){
if( $_DefLabel[$_uTab][0] == 'R' ){
$v[0] = substr( $v[0], 1 );
$t .= str_pad($txt, substr($_DefLabel[$_uTab],1)-1, '.').': ';
}
}else{
$t = $txt.$t;
}
}
return $t;
}
function IncGlobal( $txt ){
if( substr_count( $txt,'$[' ) > 0 ) $txt = str_replace( '$[','$row[', $txt );
$tmp = explode( '$', $txt );
for( $i=0; $i<count($tmp); $i++ ){
$NewTxt = '';
for( $p=0; $p<strlen($tmp[$i]); $p++ ){
$c = substr( $tmp[$i], $p, 1 );
if( substr_count( '.+-*/[ ', $c ) == 0 ){
$NewTxt .= $c;
}else{
break;
}
}
if( substr($NewTxt,0,3) != 'row' ) $tmp[$i] = 'GLOBALS['.$NewTxt.']'.substr( $tmp[$i], strlen($NewTxt) );
}
$NewTxt = '';
for( $i=1; $i<count($tmp); $i++ ) $NewTxt .= '$'.$tmp[$i];
return $NewTxt;
}
function PDF( $tmp, $nPag, $NuevaPag ){
global $p, $row, $_DefVariable, $_TipoLetra;
global $_xT, $_yT, $_xG, $_yG;
global $PDF_AltoLetra, $IncrY;
for( $i=0; $i<count($tmp); $i++ ){
$tmp[$i] = trim($tmp[$i]);
$d = explode(';',$tmp[$i]);
$d[0] = trim($d[0]);
if( $PorPag && !$NuevaPag ){
if( $d[0] != ']' ) continue;
$PorPag = false;
continue;
}
if( $d[0][0] == '¿' ){
$Condi = substr( $d[0], 1 );
$sTmp = explode( '?', $Condi );
$Condi = $sTmp[0];
$d[0] = trim($sTmp[1]);
$Condi = IncGlobal( $Condi );
if( !@eval('return ('.$Condi.');') ) continue;
}
switch( $d[0] ){
case '[PorPagina':
case '[PorPag':
$PorPag = true;
break;
case '(*)':
$x = cX($d[1]); $y = cY($d[2]);
$w = cW('2');
$z = $w*0.80;
if( $d[4] != '' ){
$d[4] = (1-($d[4]/100));
pdf_save($p);
pdf_setgray_fill( $p, $d[4] );
}
PDF_circle($p, $x+($GLOBALS[FontPuntos]/2), $y+($GLOBALS[capheight]/2), $z );
if( $d[5] != '' ){
$inc = str_replace(',','.',$d[5])*1;
PDF_circle($p, $x+($GLOBALS[FontPuntos]/2), $y+($GLOBALS[capheight]/2), $z+$inc );
}
if( $d[4] == '' ){
PDF_stroke($p);
}else{
PDF_closepath_fill_stroke($p);
pdf_restore($p);
}
$t = cT($d[3]);
ePDF_ShowXY( $p, $t, $x+($GLOBALS[FontPuntos]*2), $y ); $_yT = $y;
break;
case '[*]':
$x = cX($d[1]); $y = cY($d[2]);
$w = cW('2');
$h = $w;
$z = $w*0.15;
$h = $w = $w + 2 * $z;
if( $d[4] != '' ){
$d[4] = (1-($d[4]/100));
pdf_save($p);
pdf_setgray_fill( $p, $d[4] );
}
PDF_rect($p,$x-$z,$y+($GLOBALS[AltoLineas]/2)+$z,$w,-$h);
if( $d[5] != '' ){
$inc = str_replace(',','.',$d[5])*1;
$sx = $x-$z - $inc;
$sy = $y+($GLOBALS[AltoLineas]/2)+$z + $inc;
$w += (2*$inc);
$h += (2*$inc);
PDF_rect($p,$sx,$sy,$w,-$h);
}
if( $d[4] == '' ){
PDF_stroke($p);
}else{
PDF_closepath_fill_stroke($p);
pdf_restore($p);
}
$t = '  '.cT($d[3]);
ePDF_ShowXY( $p, $t, $x, $y ); $_yT = $y;
break;
case 'L':
case '/';
global $FontPuntos,$ascender;
$x  = cX($d[1])+($FontPuntos/2); $y  = cY($d[2])+$IncrY+($ascender/2);
$x1 = cX($d[3])+($FontPuntos/2); $y1 = cY($d[4])+$IncrY+($ascender/2);
PDF_moveto($p, $x, $y ); PDF_lineto($p, $x1, $y1 );
PDF_stroke($p);
break;
case 'H':
case '-':
global $FontPuntos,$ascender;
$x = cX($d[1])+($FontPuntos/2); $y = cY($d[2])+$IncrY+($ascender/2);
$w = cW($d[3]);
PDF_moveto($p, $x, $y ); PDF_lineto($p, $x+$w, $y );
PDF_stroke($p);
break;
case 'V':
case '|':
global $FontPuntos,$ascender;
$x = cX($d[1])+($FontPuntos/2); $y = cY($d[2])+$IncrY+($ascender/2);
$h = cH($d[3]);
PDF_moveto($p, $x, $y ); PDF_lineto($p, $x, $y-$h );
PDF_stroke($p);
break;
case 'T':
$x = cX($d[1]); $y = cY($d[2]);
$t = cT($d[3]);
if( count($_DefVariable) > 0 && substr_count( $d[3], '$' ) > 0 ){
$sfont = PDF_findfont( $p, $_TipoLetra[$_DefVariable[1]], 'host', 0 ); PDF_setfont( $p, $sfont, $_DefVariable[0] );
ePDF_ShowXY( $p, $t, $x, $y );
$font = PDF_findfont( $p, $_TipoLetra[C], 'host', 0 ); PDF_setfont( $p, $font, 8 );
}else{
ePDF_ShowXY( $p, $t, $x, $y );
}
if( $d[4] != '' ){
$t = cT( $d[4] );
if( count($_DefVariable) > 0 && substr_count( $d[4], '$' ) > 0 ){
$sfont = PDF_findfont( $p, $_TipoLetra[$_DefVariable[1]], 'host', 0 ); PDF_setfont( $p, $sfont, $_DefVariable[0] );
PDF_show( $p, $t );
$font = PDF_findfont( $p, $_TipoLetra[C], 'host', 0 ); PDF_setfont( $p, $font, 8 );
}else{
PDF_show( $p, $t );
}
}
$_yT = $y;
break;
case 't':
$t = cT( $d[1] );
if( count($_DefVariable) > 0 && substr_count( $d[1], '$' ) > 0 ){
$sfont = PDF_findfont( $p, $_TipoLetra[$_DefVariable[1]], 'host', 0 ); PDF_setfont( $p, $sfont, $_DefVariable[0] );
PDF_show( $p, $t );
$font = PDF_findfont( $p, $_TipoLetra[C], 'host', 0 ); PDF_setfont( $p, $font, 8 );
}else{
PDF_show( $p, $t );
}
$t = cT( $d[2] );
if( $t != '' ){
if( count($_DefVariable) > 0 && substr_count( $d[2], '$' ) > 0 ){
$sfont = PDF_findfont( $p, $_TipoLetra[$_DefVariable[1]], 'host', 0 ); PDF_setfont( $p, $sfont, $_DefVariable[0] );
PDF_show( $p, $t );
$font = PDF_findfont( $p, $_TipoLetra[C], 'host', 0 ); PDF_setfont( $p, $font, 8 );
}else{
PDF_show( $p, $t );
}
}
break;
case 'P':
if( $d[1] == 1 ){
PDF_show( $p, $nPag );
}else{
PDF_show( $p, $nPag.'/'.$tPag );
}
break;
case 'A':
$Alig = array( 'J'=>'justify', 'L'=>'left', 'R'=>'right' );
$ConBorde = false;
if( substr_count( $d[5], '-' ) > 0 ){
$d[5] = str_replace('-','',$d[5]);
$ConBorde = true;
}
$d[5] = strtoupper(trim($d[5]));
$x = cX($d[1]); $y = cY($d[2]-1);
$w = cW($d[3]); $h = cH($d[4]);
$t = cT($d[6]);
if( $d[7] != '' ) $t .= cT($d[7]);
if( count($_DefVariable) > 0 ){
$sfont = PDF_findfont( $p, $_TipoLetra[$_DefVariable[1]], 'host', 0 ); PDF_setfont( $p, $sfont, $_DefVariable[0] );
if( trim(PDF_get_value( $p, 'capheight' )) == '' ){
PDF_set_value( $p, 'leading', $_DefVariable[0]*$SaltoLinea );
}else{
PDF_set_leading( $p, $_DefVariable[0]*$SaltoLinea );
}
$c = PDF_show_boxed($p,$t,$x,$y-$h,$w,$h, $Alig[$d[5]], ''); $_yT = $y;
$font = PDF_findfont( $p, $_TipoLetra[C], 'host', 0 ); PDF_setfont( $p, $font, 8 );
if( trim(PDF_get_value( $p, 'capheight' )) == '' ){
PDF_set_value( $p, 'leading', $PDF_AltoLetra*$SaltoLinea );
}else{
PDF_set_leading( $p, $PDF_AltoLetra*$SaltoLinea );
}
}else{
$c = PDF_show_boxed($p,$t,$x,$y-$h,$w,$h, $Alig[$d[5]], '');  $_yT = $y;
}
if( $ConBorde ){ PDF_rect($p,$x,$y-$h,$w,$h); PDF_stroke($p); }
break;
case '':
if( count($d) == 2 ) pdf_show( $p, str_repeat(' ',$d[1] ) );
break;
case 'TH':
global $_TabH;
for( $x=1; $x<count($d); $x++ ) $_TabH[$x] = cX( $d[$x] );
break;
case 'TV':
global $_TabV;
for( $y=1; $y<count($d); $y++ ) $_TabV[$y] = cY( $d[$y] );
break;
case 'DL':
for( $n=0; $n<count($d); $n++ ) $d[$n] = trim($d[$n]);
$GLOBALS[_DefLabel] = $d;
break;
case 'D$':
$_DefVariable = array( trim($d[1]), trim($d[2]) );
break;
case 'DT':
$d[1] = trim($d[1]);
if( $d[1] == '' ) $d[1] = $GLOBALS[PDF_AltoLetra];
$d[2] = trim($d[2]);
if( strlen( $d[2] ) <= 3 ){
$font = PDF_findfont( $p, $_TipoLetra[$d[2]], 'host', 0 );
}else{
$font = PDF_findfont( $p, $d[2], 'host', 0 );
}
PDF_setfont( $p, $font, $d[1] );
global $PDF_AltoLetra,$capheight,$ascender,$descender,$AltoLineas,$SaltoLinea,$EntreLineas;
global $UltimaLinea,$PDF_y2Margen,$PDF_OffsetPie, $FontPuntos, $IncrY;
$PDF_AltoLetra = $d[1];
$FontPuntos = ( $PDF_AltoLetra * 600 / 1000 );
if( trim(PDF_get_value( $p, 'capheight' )) == '' ){
$capheight = PDF_get_value( $p, 'capheight', $font ) * $PDF_AltoLetra;
$ascender  = PDF_get_value( $p, 'ascender' , $font ) * $PDF_AltoLetra;
$descender = PDF_get_value( $p, 'descender', $font ) * $PDF_AltoLetra;
}else{
$capheight = PDF_get_value( $p, 'capheight' ) * $PDF_AltoLetra;
$ascender  = PDF_get_value( $p, 'ascender'  ) * $PDF_AltoLetra;
$descender = PDF_get_value( $p, 'descender' ) * $PDF_AltoLetra;
}
$AltoLineas = ( $ascender + ($descender*-1) ) * $SaltoLinea;
$EntreLineas = $AltoLineas - ( $ascender + ($descender*-1) );
$UltimaLinea = $PDF_y2Margen + $AltoLineas + $PDF_OffsetPie;
if( trim(PDF_get_value( $p, 'capheight' )) == '' ){
PDF_set_value( $p, 'leading', $PDF_AltoLetra*$SaltoLinea );
}else{
PDF_set_leading( $p, $PDF_AltoLetra*$SaltoLinea );
}
$IncrY = (($PDF_AltoLetra * $SaltoLinea) / 2);
break;
case '[]':
Caja( $d );
break;
case '[':
$Cajas = array();
$n = $i+1;
while( trim($tmp[$n]) != ']' && $p<count($tmp) ){
array_push( $Cajas, $tmp[$n] );
$n++;
}
$i = $n;
CajaMultiple( $d[1], $d[2], $Cajas );
break;
case '[T':
$Textos = array();
$n = $i+1;
while( trim($tmp[$n]) != ']' && $p<count($tmp) ){
array_push( $Textos, trim($tmp[$n]) );
$n++;
}
$i = $n;
global $xy;
for( $s=0; $s<count($Textos); $s++ ){
for( $n=0; $n<count($xy); $n++ ){
if( $xy[$n][2] == 2 && $xy[$n][3] == ($s+1) ){
ePDF_ShowXY( $p, $Textos[$s], $xy[$n][0]+$d[1], $xy[$n][1]-$d[2] );
}
}
}
break;
case '.':
break;
case 'E':
@eval( 'return '.$d[1].';' );
break;
case 'I':
PintaImagen( $d );
break;
case 'M':
$GLOBALS[PDF_xMargen] = cW($d[1]+1);
$GLOBALS[PDF_yMargen] = cH($d[2]) - $GLOBALS[ascender] + $GLOBALS[descender];
break;
case 'C':
pdf_setrgbcolor_fill($p, $d[1], $d[2], $d[3] );
break;
case '.PAG.':
global $_Elementos;
if( $_Elementos[0]==0 && $_Elementos[1]==0 ){
$_Elementos[0] = $d[1]; $_Elementos[1] = $d[2];
$_Elementos[2] = cW($d[3]+1); $_Elementos[3] = cH($d[4]);
}
break;
case '+':
pdf_rotate( $p, $d[1] );
break;
case 'NOTA':
return;
default:
}
}
}
function CajaMultiple( $x, $y, $Caja ){
global $p, $IncrY, $descender, $ascender, $capheight, $FontPuntos, $PDF_AltoLetra, $xy;
$nCaja = 0;
$DimCaja = array();
$y2 = cY($y+1) + $IncrY;
$y2 += ($ascender/2);
$sx = cX($x);
$sy = cY($y) + $IncrY;
$sx += ($FontPuntos/2);
$sy += ($ascender/2);
$Salto = $sy-$y2;
$xy = array( array( $sx, $sy, 1, 1 ) );
$MaxAncho = $sx;
$mc = explode( ';', $Caja[0] );
for( $i=0; $i<count($mc); $i++ ){
$DimCaja[] = $mc[$i];
$c = explode( ',', $mc[$i] );
$w = cW($c[0]);
$h = cH($c[1]);
$h -= ($ascender/2);
$nCaja++;
Caja2( array('[]', $sx, $sy, $w, $h ) );
$MaxAncho += $w;
NuevaXY( $sx, $sy, $sx+$w, $sy-$h, 0, $xy, count($DimCaja) );
$sx += $w;
}
for( $nc=1; $nc<count($Caja); $nc++ ){
$mc = explode( ';', $Caja[$nc] );
for( $i=0; $i<count($mc); $i++ ){
$DimCaja[] = $mc[$i];
$c = explode( ',', $mc[$i] );
$w = cW($c[0]);
$h = cH($c[1]);
$h -= ($ascender/2);
$okX = 9999; $okY = 0; $okI = 0;
for( $n=0; $n<count($xy); $n++ ){
if( $xy[$n][2] == 0 && ceil($MaxAncho) >= ceil($xy[$n][0]+$w) ){
if( $okY < $xy[$n][1] ){
$okX = $xy[$n][0];
$okY = $xy[$n][1];
$okI = $n;
}else if( $okY == $xy[$n][1] && $okX > $xy[$n][0] ){
$okX = $xy[$n][0];
$okY = $xy[$n][1];
$okI = $n;
}
}
}
$nCaja++;
$okX = $xy[$okI][0];
$okY = $xy[$okI][1];
$xy[$okI][2] = 2;
$xy[$okI][3] = $nCaja;
Caja2( array('[]', $okX, $okY, $w, $h ) );
NuevaXY( $okX, $okY, ($okX+$w), ($okY-$h), $MaxAncho, $xy, count($DimCaja) );
}
}
}
function NuevaXY( $x1, $y1, $x2, $y2, $MaxAncho, &$xy, $tCajas ){
for( $i=0; $i<count($xy); $i++ ){
if( $xy[$i][3]==0 && $y1 == $xy[$i][1] && ( $x1 <= $xy[$i][0] && $x2 > $xy[$i][0] ) ){
$xy[$i][2]=1;
$xy[$i][3]=$tCajas;
}
if( $xy[$i][3]==0 && $x1 == $xy[$i][0] && ( $y1 >= $xy[$i][1] && $y2 < $xy[$i][1] ) ){
$xy[$i][2]=1;
$xy[$i][3]=$tCajas;
}
}
$Esta = false;
for( $i=0; $i<count($xy); $i++ ){
if( $x1 == $xy[$i][0] && $y1 == $xy[$i][1] ){
$xy[$i][2] = 2;
$Esta = true;
break;
}
}
if( !$Esta ) array_push( $xy, array( $x1, $y1, 2 ) );
$Esta = false;
for( $i=0; $i<count($xy); $i++ ){
if( $x2 == $xy[$i][0] && $y1 == $xy[$i][1] ){
$Esta = true;
break;
}
}
if( !$Esta && ( $MaxAncho == 0 || ($MaxAncho > 0 && $x2 < $MaxAncho ) )) array_push( $xy, array( $x2, $y1, 0 ) );
$Esta = false;
for( $i=0; $i<count($xy); $i++ ){
if( $x1 == $xy[$i][0] && $y2 == $xy[$i][1] ){
$Esta = true;
break;
}
}
if( !$Esta ) array_push( $xy, array( $x1, $y2, 0 ) );
$Esta = false;
for( $i=0; $i<count($xy); $i++ ){
if( $x2 == $xy[$i][0] && $y2 == $xy[$i][1] ){
$Esta = true;
break;
}
}
if( !$Esta && ( $MaxAncho == 0 || ($MaxAncho > 0 && $x2 < $MaxAncho )) ){
array_push( $xy, array( $x2, $y2, 0 ) );
}
}
function Caja2( $d ){
global $p, $IncrY;
$x = $d[1]; $y = $d[2];
$w = $d[3]; $h = $d[4];
$d[5] = trim($d[5]); $d[6] = trim($d[6]);
if( $d[5] != '' ){
$d[5] = (1-($d[5]/100));
pdf_save($p);
pdf_setgray_fill( $p, $d[5] );
}
PDF_rect($p,$x,$y,$w,-$h);
if( $d[6] != '' ){
$inc = str_replace(',','.',$d[6])*1;
$x -= $inc;
$y += $inc;
$w += (2*$inc);
$h += (2*$inc);
$h = -$h;
PDF_rect($p,$x,$y,$w,$h);
}
if( $d[5] == '' ){
PDF_stroke($p);
}else{
PDF_closepath_fill_stroke($p);
pdf_restore($p);
}
}
function Caja( $d ){
global $p, $IncrY;
$x = cX($d[1]); $y = cY($d[2]) + $IncrY;
$w = cW($d[3]); $h = cH($d[4]);
$d[5] = trim($d[5]); $d[6] = trim($d[6]);
global $FontPuntos;
$x += ($FontPuntos/2);
global $ascender;
$y += ($ascender/2);
$h -= ($ascender/2);
if( $d[5] != '' ){
$d[5] = (1-($d[5]/100));
pdf_save($p);
pdf_setgray_fill( $p, $d[5] );
}
PDF_rect($p,$x,$y,$w,-$h);
if( $d[6] != '' ){
$inc = str_replace(',','.',$d[6])*1;
$x -= $inc;
$y += $inc;
$w += (2*$inc);
$h += (2*$inc);
$h = -$h;
PDF_rect($p,$x,$y,$w,$h);
}
if( $d[5] == '' ){
PDF_stroke($p);
}else{
PDF_closepath_fill_stroke($p);
pdf_restore($p);
}
}
function PintaImagen( $d ){
global $p, $IncrY, $_x1G, $_y1G, $_x2G, $_y2G;
$x = cX($d[1]); $y = cY($d[2]) + $IncrY;
$PDF_Imagen = cT( $d[3], false );
if( $d[5] != '' ) $MaxAncho = cW($d[5]);
if( $d[6] != '' ) $MaxAlto = cH($d[6]);
$TxtError = '';
$stmp = explode('.',$PDF_Imagen );
$Extension = $stmp[count($stmp)-1];
$Extension = str_replace( 'jpg', 'jpeg', $Extension );
switch( $Extension ){
case 'jpeg':
$imagen = pdf_open_jpeg( $p, $PDF_Imagen );
break;
case 'gif':
$imagen = pdf_open_gif( $p, $PDF_Imagen );
break;
case 'png':
$imagen = pdf_open_png( $p, $PDF_Imagen );
break;
default:
$tmp = explode('/',$PDF_Imagen);
$TxtError = $tmp[count($tmp)-1];
break;
}
if( $TxtError!='' ){
}else if( $imagen < 1 ){
$tmp = explode('/',$PDF_Imagen);
$TxtError = $tmp[count($tmp)-1];
}else{
$Ancho = pdf_get_image_width( $p, $imagen );
$Alto = pdf_get_image_height ( $p, $imagen );
$sAncho = $Ancho;
$sAlto = $Alto;
$zoom = 1;
switch( trim($d[4]) ){
case '#':
break;
case '+':
if( $Ancho <= $MaxAncho && $Alto <= $MaxAlto ) break;
case '=':
$zw = $MaxAncho / $Ancho;
$zh = $MaxAlto / $Alto;
if( $zw < $zh ){
$zoom = $zw;
}else{
$zoom = $zh;
}
break;
default:
}
$Ancho = $Ancho * $zoom;
$Alto = $Alto * $zoom;
PDF_place_image( $p, $imagen, $x, $y-$Alto, $zoom );
PDF_close_image( $p, $imagen );
$_x1G = $x;
$_y1G = $y-$Alto;
$_x2G = $x+$Ancho;
$_y2G = $y;
if( $d[8] != 0 ){
PDF_rect( $p, $x, $y, $Ancho, -$Alto );
PDF_stroke($p);
}
}
if( $TxtError!='' ){
$_x1G = $x;
$_y1G = $y-$MaxAlto;
$_x2G = $x+$MaxAncho;
$_y2G = $y;
PDF_rect( $p, $x, $y, $MaxAncho, -$MaxAlto );
PDF_stroke($p);
ePDF_ShowXY( $p, $TxtError, $x+2, $y-7 );
}
}
function ExitError( $txt, $MasInfo ){
PDFEndPage( $p );
PDF_close( $p );
eMessage( 'ERROR ['.$txt.'] '.$MasInfo, 'HS' );
exit;
}
function ePDF_ShowXY( $p, $text, $x, $y ){
PDF_show_xy( $p, $text, $x, $y );
}
function ePDF_ContinueText( $p, $text ){
PDF_continue_text( $p, $text );
}
function PDFBeginPage( $p, $HojaAncho, $HojaAlto ){
PDF_Begin_Page( $p, $HojaAncho, $HojaAlto );
$GLOBALS['_PaginaAbierta'] = true;
$_SePintoPie = false;
}
function PDFEndPage( $p ){
PDF_End_Page( $p );
$GLOBALS['_PaginaAbierta'] = false;
}
?>
