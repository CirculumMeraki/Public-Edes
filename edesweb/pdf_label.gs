<?PHP
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() ) exit;
if( $_SESSION['_PDF_']<>'S' ) eEnd();
set_time_limit(60*5);
foreach( $_PDFVAR as $value ) @eval( $value );
if( !isset($PDF_FontSize) && isset($PDF_AltoLetra) ) $PDF_FontSize = $PDF_AltoLetra;
if( !isset($PDF_FontFamily) ) $PDF_FontFamily = 'Helvetica';
$ValoresRellenos = array();
for( $n=0; $n<count($_PDFLABEL); $n++ ){
for( $i=0; $i<count($_PDFLABEL[$n]); $i++ ){
$_PDFLABEL[$n][$i] = trim($_PDFLABEL[$n][$i]);
if( $i==5 ){
if( ($_PDFLABEL[$n][$i][0]=='"' && substr($_PDFLABEL[$n][$i],-1)=='"') || ($_PDFLABEL[$n][$i][0]=="'" && substr($_PDFLABEL[$n][$i],-1)=="'") ){
$_PDFLABEL[$n][$i] = substr($_PDFLABEL[$n][$i],1,-1);
}
}
}
if( $_PDFLABEL[$n][4] == '#' ) $ValoresRellenos[] = trim($_PDFLABEL[$n][0]);
}
$tmp = explode(']',$_PDFLABEL[0][0]);
$tmp = trim($tmp[1]);
$tmp = str_replace('\\','/',$tmp);
$LabelRellena = ( strtolower($tmp)=='label' );
if( $tmp=='' ){
$NomPDF = "/_tmp/pdf/eti.pdf";
}else if( $tmp=='#' ){
$NomPDF = "/_tmp/pdf/".$_User."_".rand(10000,99999).".pdf";
}else if( substr_count( $tmp, '/' ) > 0 ){
$NomPDF = $tmp;
}else{
$NomPDF = "/_tmp/pdf/{$tmp}.pdf";
}
if( substr_count( $NomPDF, '.pdf' ) == 0 ) $NomPDF .= '.pdf';
$NomFile = $NomPDF;
$NomPDF = str_replace('.pdf',"_{$_User}.pdf",$NomPDF);
$oNomPDF = $NomPDF;
if( PHP_OS=='WINNT' ){
$NomPDF = str_replace( '/http/edes.php', '', $_SERVER['SCRIPT_FILENAME'] ).$NomPDF;
}else{
$NomPDF = eScript($NomPDF);
}
if( file_exists($NomPDF) ) unlink($NomPDF);
clearstatcache();
$tmp = trim($_PDFLABEL[0][1]);
$tmp = str_replace(' ','',strtoupper($tmp));
list( $OffsetX, $OffsetY ) = explode(',',$tmp);
$tmp = trim($_PDFLABEL[0][2]);
$tmp = str_replace(' ','',strtoupper($tmp));
list( $tmp1, $tmp2 ) = explode( '/', $tmp );
list( $Ancho, $Alto ) = explode(',',$tmp1);
list( $AnchoPT, $AltoPT ) = explode(',',$tmp2);
$tmp = trim($_PDFLABEL[0][3]);
$tmp = str_replace(' ','',strtoupper($tmp));
list( $MargenRight, $MargenBottom ) = explode(',',$tmp);
$tmp = trim($_PDFLABEL[0][4]);
$tmp = str_replace(' ','',$tmp);
list( $NEtiPorLinea, $NEtiPorColumna ) = explode(',',$tmp);
$tmp = trim($_PDFLABEL[0][5]);
if( $tmp!='' ) $PDF_FontSize = $tmp;
$_TipoLetra = array(
'C'=>'Courier',
'CO'=>'Courier-Oblique',
'CB'=>'Courier-Bold',
'CBO'=>'Courier-BoldOblique',
'H'=>'Helvetica',
'HO'=>'Helvetica-Oblique',
'HB'=>'Helvetica-Bold',
'HBO'=>'Helvetica-BoldOblique',
'T'=>'Times-Roman',
'TO'=>'Times-Italic',
'TB'=>'Times-Bold',
'TBO'=>'Times-BoldItalic',
);
$tmp = trim($_PDFLABEL[0][6]);
if( $tmp!='' ){
if( strlen($tmp)<='3' ){
$tmp = strtoupper($tmp);
if( substr_count('CHT',$tmp[0])==0 ) eMessage("ERROR: Tipo letra desconocido '{$tmp}'",'HES');
$tmp = str_replace('I','O',$tmp);
$tmp = str_replace('N','B',$tmp);
if( strlen($tmp)>=2 && substr_count('OB',substr($tmp,1,1))==0 ) eMessage("ERROR: Tipo letra desconocido '{$tmp}'",'HES');
if( strlen($tmp)==3 && substr_count('OB',substr($tmp,2,1))==0 ) eMessage("ERROR: Tipo letra desconocido '{$tmp}'",'HES');
if( strlen($tmp)==3 && substr($tmp,-1)=='B' ) $tmp = str_replace('OB','BO',$tmp);
$PDF_FontFamily = $_TipoLetra[$tmp];
}else{
$PDF_FontFamily = $tmp;
}
}
$FuncUser = trim($_PDFLABEL[0][7]);
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
if( !isset($PDF_FontFamily) ) $PDF_FontFamily = 'Helvetica';
$SaltoLinea		= 1.5;
$FontSizeTH		= $PDF_FontSize;
$FontPuntos		= ( $PDF_FontSize * 600 / 1000 );
$MargenHoja		= $PDF_xMargen;
$MargenDerecho	= 0;
$AltoLineas		= 0;
$_NumReg			= 0;
$y					= $HojaAlto;
$x					= $MargenHoja;
$InicioY			= 0;
$nPag				= 1;
if( isset($usuCursor) ){
for( $n=1; $n<count($_PDFLABEL); $n++ ){
for( $i=0; $i<count($_Form); $i++ ){
if( $_Form[$i][1] == $_PDFLABEL[$n][0] ){
$_PDFLABEL[$n][0] = $i;
break;
}
}
}
for( $n=0; $n<count($ValoresRellenos); $n++ ){
for( $i=0; $i<count($_Form); $i++ ){
if( $_Form[$i][1] == $ValoresRellenos[$n] ){
$ValoresRellenos[$n] = $i;
break;
}
}
}
}
$p = PDF_new();
if( $PDF_License!='' ) PDF_set_parameter( $p, 'license', $PDF_License );
PDF_open_file( $p, $NomPDF );
PDF_set_info( $p, 'Title'	 , $PDF_InfoTitulo." " );
PDF_set_info( $p, 'Author'	 , $_SESSION["ApplicationName"]." " );
PDF_set_info( $p, 'Keywords', 'eDes' );
PDF_set_info( $p, 'Creator' , $_eDesTitle." " );
$VersionPDF = pdf_get_value( $p, "major", 0 );
if( $VersionPDF < 5 ) $PDF_Colors = false;
$OffsetX = strtoupper($OffsetX);
$OffsetY = strtoupper($OffsetY);
$sNEtiPorLinea   = 0; if( isset($_PDFLabelCol) ) $sNEtiPorLinea   = $_PDFLabelCol;
$sNEtiPorColumna = 0; if( isset($_PDFLabelRow) ) $sNEtiPorColumna = $_PDFLabelRow;
if( $LabelRellena ){
if( !isset($usuCursor) ) $usuCursor = array();
for( $n=0; $n<$NEtiPorLinea*$NEtiPorColumna; $n++ ) $usuCursor[$n] = array( 'x','x','x','x','x','x','x','x','x','x' );
}
$uX = 0;
$uY = 0;
$Indice = -1;
$NuevaPag = true;
while( $_vF = NewFila() ){
if( $NuevaPag ){
PDF_begin_page( $p, $HojaAncho, $HojaAlto );
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
PDF_set_parameter( $p, 'openmode', 'none' );
PDF_set_parameter( $p, 'transition', 'dissolve' );
PDF_setlinewidth( $p, 0.1 );
if( $nPag == 1 ){
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
$EntreLineas = $AltoLineas - ( $ascender + ($descender*-1) );
$IncrY = (($PDF_FontSize * $SaltoLinea) / 2);
if( substr_count( $OffsetX, 'P' ) == 0 ){
$OffsetX = $FontPuntos * $OffsetX;
}else{
$OffsetX = str_replace('P','',$OffsetX);
}
if( substr_count( $OffsetY, 'P' ) == 0 ){
$OffsetY = ( $PDF_FontSize * $SaltoLinea ) * $OffsetY;
}else{
$OffsetY = str_replace('P','',$OffsetY);
}
if( substr_count( $MargenRight , 'P' ) == 0 ){
$MargenRight  = $FontPuntos * $MargenRight;
}else{
$MargenRight = str_replace('P','',$MargenRight);
}
if( substr_count( $MargenBottom , 'P' ) == 0 ){
$MargenBottom = ( $PDF_FontSize * $SaltoLinea ) * $MargenBottom;
}else{
$MargenBottom = str_replace('P','',$MargenBottom);
}
}
}
$OkEti = true;
if( !$LabelRellena ){
for( $n=0; $n<count($ValoresRellenos); $n++ ){
if( trim($_vF[$ValoresRellenos[$n]])=='' ) $OkEti = false;
}
}
$NuevaPag = false;
if( $OkEti ){
if( !$LabelRellena ){
for( $n=1; $n<count($_PDFLABEL); $n++ ){
if( $_PDFLABEL[$n][0]==='' ){
$txt = $_PDFLABEL[$n][5];
$SoloLabel = true;
}else{
$txt = trim($_vF[$_PDFLABEL[$n][0]]);
$SoloLabel = false;
}
if( $_PDFLABEL[$n][3]!='' ){
$txt = substr( $txt, 0, $_PDFLABEL[$n][3] );
}
$txt = ePDF_ReplaceChr(trim($txt));
if( $_PDFLABEL[$n][1]=='' && $_PDFLABEL[$n][2]=='' ){
PDF_show( $p, $txt );
}else{
if(		$_PDFLABEL[$n][1]!='' && $_PDFLABEL[$n][2]=='' ){
$ax = $_PDFLABEL[$n][1];
$ay = $uY;
}elseif( $_PDFLABEL[$n][1]=='' && $_PDFLABEL[$n][2]!='' ){
$ax = $uX;
$ay = $_PDFLABEL[$n][2];
}else{
$ax = $_PDFLABEL[$n][1];
$ay = $_PDFLABEL[$n][2];
}
$uX = $ax;
$uY = $ay;
$x = $OffsetX + ($sNEtiPorLinea * ( ($Ancho * $FontPuntos) + $MargenRight ) ) + ($ax * $FontPuntos) - $FontPuntos;
$y = $ay + ($sNEtiPorColumna * $Alto );
$y = $HojaAlto - ( $y * $PDF_FontSize * $SaltoLinea ) - ($sNEtiPorColumna * $MargenBottom ) + $EntreLineas - $OffsetY + ( $PDF_FontSize * $SaltoLinea + $EntreLineas );
PDF_show_xy( $p, substr($txt,0,$Ancho), $x, $y );
}
if( !$SoloLabel && $_PDFLABEL[$n][5]!='' ) PDF_show( $p, $_PDFLABEL[$n][5] );
}
if( $FuncUser!='' ){
if( $AnchoPT=='' ){
$x = $OffsetX + ($sNEtiPorLinea * ( ($Ancho * $FontPuntos) + $MargenRight ) );
$y = $sNEtiPorColumna * $Alto;
$y = $HojaAlto - ( $y * $PDF_FontSize * $SaltoLinea ) - ($sNEtiPorColumna * $MargenBottom ) + $EntreLineas - $OffsetY + ( $PDF_FontSize * $SaltoLinea + $EntreLineas );
}else{
$x = $OffsetX + ($sNEtiPorLinea * ( $AnchoPT + $MargenRight ) );
$y = $sNEtiPorColumna * $AltoPT;
$y = $HojaAlto - $y - $OffsetY;
}
call_user_func( $FuncUser, $p, $x, $y, $sNEtiPorLinea, $sNEtiPorColumna, $_vF );
}
}else{
for( $n=1; $n<=$Alto; $n++ ){
$ax = 0;
$x = $OffsetX + ($sNEtiPorLinea * ( ($Ancho * $FontPuntos) + $MargenRight ) ) + ($ax * $FontPuntos) - $FontPuntos;
$ay = $n;
$y = $n + ($sNEtiPorColumna * $Alto );
$y = $HojaAlto - ( $y * $PDF_FontSize * $SaltoLinea ) - ($sNEtiPorColumna * $MargenBottom ) + $EntreLineas - $OffsetY + ( $PDF_FontSize * $SaltoLinea + $EntreLineas );
PDF_show_xy( $p, substr(str_repeat('123456789-',20),0,$Ancho), $x, $y );
}
}
$_NumReg++;
$sNEtiPorLinea++;
if( $sNEtiPorLinea >= $NEtiPorLinea ){
$sNEtiPorLinea = 0;
$sNEtiPorColumna++;
if( $sNEtiPorColumna >= $NEtiPorColumna ){
$sNEtiPorColumna = 0;
$nPag++;
PDF_end_page( $p );
$NuevaPag = true;
if( $LabelRellena ) break;
}
}
}
}
if( $_NumReg > 0 ){
if( !$NuevaPag ){
$nPag++;
PDF_end_page( $p );
}
PDF_close($p);
$NomFile = explode('/',$NomFile);
$NomFile = $NomFile[count($NomFile)-1];
if( isset($_REMOTE_) ){
eMessage( '~PDF','HS','','location.href = "edes.php?RD:'.$oNomPDF.'&FILE='.$NomFile.'";' );
}else{
eMessage( '~PDF','HS','','location.href = "edes.php?D:'.$oNomPDF.'&FILE='.$NomFile.'";' );
}
}else{
eMessage( '~NR','HS','','','NR' );
}
eEnd();
function NewFila(){
global $usuCursor, $Indice;
if( !isset($usuCursor) ){
return qArray();
}else{
$Indice++;
return $usuCursor[$Indice];
}
}
class PDFLabel {
function Text( $txt, $x, $y, $Modo ){
global $p,$uY,$uX;
global $OffsetX, $sNEtiPorLinea, $Ancho, $MargenRight;
global $OffsetY, $sNEtiPorColumna, $Alto, $MargenBottom;
global $FontPuntos, $HojaAlto, $PDF_FontSize, $SaltoLinea, $EntreLineas;
if(			$x=='' && $y=='' ){
PDF_show( $p, $txt );
}else{
if(		$x<>'' && $y=='' ){
$ax = $x;
$ay = $uY;
}elseif( $x=='' && $y<>'' ){
$ax = $uX;
$ay = $y;
}else{
$ax = $_x;
$ay = $y;
}
$uX = $ax;
$uY = $ay;
$x = $ax + $OffsetX + ($sNEtiPorLinea   * ($Ancho + $MargenRight ) );
$y = $ay + $OffsetY + ($sNEtiPorColumna * ($Alto  + $MargenBottom) );
$x = ($x-1) * $FontPuntos;
$y = $HojaAlto - ( $y * $PDF_FontSize * $SaltoLinea ) + $EntreLineas;
PDF_show_xy( $p, $txt, $x, $y );
}
}
function JPG( $x, $y, $NomJPG ){
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
PDF_place_image( $p, $imagen, $x, $y-$Alto, 1 );
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
PDF_show_xy( $p, $TxtError, $x+2, $y-7 );
}
}
}
function _ean13Chequeo( $Codigo ){
if( strlen($Codigo)> 13 ) die( "Codigo superior a 13 caracteres" );
if( strlen($Codigo)< 12 ) $Codigo = str_pad($Codigo, 12, '0', STR_PAD_LEFT);
if( strlen($Codigo)==12 ) $Codigo = _ean13CheckDigit($Codigo) . $Codigo;
if( strlen($Codigo)<=12 ) $Codigo = str_pad($Codigo, 13, '0', STR_PAD_LEFT);
$nChecksum = 0;
for( $i=0; $i<strlen($Codigo); $i++ ){
if( $i % 2 == 0 ){
$nChecksum += intval($Codigo[$i]);
}else{
$nChecksum += (3 * intval($Codigo[$i]));
}
}
if( $nChecksum % 10 == 0 ){
$DC = '';
}else{
$DC = 10 - ($nChecksum % 10);
}
return $Codigo.$DC;
}
function _eanEncode($Codigo){
$leftOdd =array("0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011");
$leftEven=array("0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111");
$rightAll=array("1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100");
$encTable=array("000000","001011","001101","001110","010011","011001","011100","010101","010110","011010");
$guards = array("bab","ababa","bab");
$mfcStr = '';
$prodStr= '';
$encbit = $Codigo[0];
for( $i=1; $i<strlen($Codigo); $i++ ){
$num = (int)$Codigo{$i};
if( $i < 7 ){
$even=(substr($encTable[$encbit],$i-1,1)==1);
if( !$even ){
$mfcStr.=$leftOdd[$num];
}else{
$mfcStr.=$leftEven[$num];
}
}elseif( $i >= 7 ){
$prodStr.=$rightAll[$num];
}
}
return $guards[0].$mfcStr.$guards[1].$prodStr.$guards[2];
}
function eEAN13( $Codigo, $Alto, $xPDF, $yPDF ){
$Escala = 1;
if( $Alto < 15 ) $Alto = 15;
$Dim = array();
$Codigo = _ean13Chequeo($Codigo);
$bars = _eanEncode($Codigo);
if( $Escala<1 ) $Escala=2;
$yTotal = (double)$Escala * $Alto;
$space = array( 'top'=>2*$Escala, 'bottom'=>2*$Escala, 'left'=>2*$Escala, 'right'=>2*$Escala );
$x = $space['left']+($Escala*6);
$Alto  = floor($yTotal-($Escala*8));
$Alto2 = floor($yTotal-$space['bottom']);
for( $i=0; $i<strlen($bars); $i++ ){
$h = $Alto;
$val = strtoupper($bars[$i]);
if( preg_match("/[a-z]/i",$val) ){
$val = ord($val)-65;
$h = $Alto2;
}
if( $val==1 ){
$Dim[] = array( $x, $space['top'], ($x+$Escala-1), $h );
}
$x += $Escala;
}
$str = substr($Codigo,0,1);
$Dim[] = array( $space['left'], $Alto, $str );
$str = substr($Codigo,1,6);
$x = $space['left']+$Escala*strlen($Codigo)+$Escala*6;
$Dim[] = array( $x, $Alto2, $str );
$str = substr($Codigo,7,6);
$x = $space['left']+$Escala*strlen($bars)/1.65+$Escala*6;
$Dim[] = array( $x, $Alto2, $str );
return _eEAN13PDF( $Dim, $Escala, $xPDF, $yPDF, $Alto );
}
function _eEAN13PDF( $tmp, $Escala, $x, $y, $Alto ){
global $p;
$y += 2.5;
$x -= 6.5;
$uX = 0;
for( $n=0; $n<count($tmp)-3; $n++ ){
$Ancho = $tmp[$n][2]-$tmp[$n][0]+1;
$tmp[$n][0] += $x;
$tmp[$n][1] += $y;
$tmp[$n][3] += $y;
$uX = $tmp[$n][0] + $Ancho-1;
PDF_rect( $p,
$tmp[$n][0], $tmp[$n][1],
$Ancho,
$tmp[$n][1]-$tmp[$n][3]
);
PDF_closepath_fill_stroke($p);
}
$n = count($tmp)-3;
$yTXT = $tmp[$n][1] + $y - $Alto*2-2;
$tmp[$n+1][0] -= 4;
$tmp[$n+2][0] -= 2;
for( $n=count($tmp)-3; $n<count($tmp); $n++ ){
$tmp[$n][0] += $x;
$tmp[$n][1] = $yTXT;
PDF_show_xy( $p, $tmp[$n][2], $tmp[$n][0], $tmp[$n][1] );
}
return $uX;
}
function _ean13CheckDigit($barnumber){
$csumTotal = 0;
if(strlen($barnumber) <= 12 ) $barnumber = str_pad($barnumber, 13, "0", STR_PAD_LEFT);
for($i=0;$i<strlen($barnumber);$i++) {
if($i % 2 == 0 ){
$csumTotal = $csumTotal + intval($barnumber{$i});
}else{
$csumTotal = $csumTotal + (3 * intval($barnumber{$i}));
}
}
if( $csumTotal % 10 == 0 ){
$checksumDigit = '';
}else{
$checksumDigit = 10 - ($csumTotal % 10);
}
return $checksumDigit;
}
function ePDF_ReplaceChr( $Celda ){
$Celda = str_replace('&amp;' ,'&',$Celda);
$Celda = str_replace('&quot;','"',$Celda);
$Celda = str_replace('&#34;','"',$Celda);
$Celda = str_replace('&#39;',"'",$Celda);
$Celda = str_replace('&#43;','+',$Celda);
$Celda = str_replace('&#92;','\\',$Celda);
return $Celda;
}
?>
