<?PHP
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() ) exit;
if( $_SESSION['_PDF_']<>'S' ) eEnd();
set_time_limit(60*5);
foreach($_PDFVAR as $value) @eval($value);
include("../../lib/tcpdf/tcpdf.inc");
if( !isset($PDF_FontSize) && isset($PDF_AltoLetra) ) $PDF_FontSize = $PDF_AltoLetra;
if( !isset($PDF_FontFamily) ) $PDF_FontFamily = 'Helvetica';
$ValoresRellenos = array();
for($n=0; $n<count($_PDFLABEL); $n++){
for($i=0; $i<count($_PDFLABEL[$n]); $i++){
$_PDFLABEL[$n][$i] = trim($_PDFLABEL[$n][$i]);
if( $i==5 ){
if( ($_PDFLABEL[$n][$i][0]=='"' && substr($_PDFLABEL[$n][$i],-1)=='"') || ($_PDFLABEL[$n][$i][0]=="'" && substr($_PDFLABEL[$n][$i],-1)=="'") ){
$_PDFLABEL[$n][$i] = substr($_PDFLABEL[$n][$i],1,-1);
}
}
}
if( $_PDFLABEL[$n][4]=='#' ) $ValoresRellenos[] = trim($_PDFLABEL[$n][0]);
}
$tmp = explode(']',$_PDFLABEL[0][0]);
$tmp = trim($tmp[1]);
$tmp = str_replace('\\','/',$tmp);
$LabelRellena = (strtolower($tmp)=='label');
if( $tmp=='' ){
$NomPDF = "/_tmp/pdf/eti_.pdf";
}else if( $tmp=='#' ){
$NomPDF = "/_tmp/pdf/".rand(10000,99999).".pdf";
}else if( substr_count($tmp, '/')>0 ){
$NomPDF = $tmp;
}else{
$NomPDF = "/_tmp/pdf/{$tmp}.pdf";
}
if( substr_count($NomPDF, '.pdf')==0 ) $NomPDF .= '.pdf';
$NomFile = $NomPDF;
$NomPDF = str_replace('.pdf',"_{$_User}.pdf",$NomPDF);
$oNomPDF = $NomPDF;
if( PHP_OS=='WINNT' ){
$NomPDF = str_replace('/http/edes.php', '', $_SERVER['SCRIPT_FILENAME']).$NomPDF;
}else{
$NomPDF = eScript($NomPDF);
}
if( file_exists($NomPDF) ) unlink($NomPDF);
clearstatcache();
list($OffsetX, $OffsetY) = explode(',', trim(str_replace(' ','',strtoupper($_PDFLABEL[0][1]))));
$OffsetX = strtoupper($OffsetX);
$OffsetY = strtoupper($OffsetY);
list($tmp1, $tmp2) = explode('/', trim(str_replace(' ','',strtoupper($_PDFLABEL[0][2]))));
list($Ancho, $Alto) = explode(',', $tmp1);
list($AnchoPT, $AltoPT) = explode(',', $tmp2);
$tmp = trim($_PDFLABEL[0][3]);
$tmp = str_replace(' ','',strtoupper($tmp));
list($MargenRight, $MargenBottom) = explode(',',$tmp);
$tmp = trim($_PDFLABEL[0][4]);
$tmp = str_replace(' ','',$tmp);
list($NEtiPorLinea, $NEtiPorColumna) = explode(',',$tmp);
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
$sNEtiPorLinea   = 0; if( isset($_POST["_PDFLabelCol"]) ) $sNEtiPorLinea   = $_POST["_PDFLabelCol"];
$sNEtiPorColumna = 0; if( isset($_POST["_PDFLabelRow"]) ) $sNEtiPorColumna = $_POST["_PDFLabelRow"];
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
$FontPuntos		= ($PDF_FontSize * 600/1000);
$MargenHoja		= $PDF_xMargen;
$MargenDerecho	= 0;
$AltoLineas		= 0;
$_NumReg		= 0;
$y				= $HojaAlto;
$x				= $MargenHoja;
$InicioY		= 0;
$nPag			= 1;
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
$p = new TCPDF( (($PDF_Horientacion=='V')?'P':'L'), 'pt', 'A4', false, 'ISO-8859-1', false );
$p->SetDisplayMode( 'fullpage', 'continuous' );
$p->setPrintHeader(false);
$p->setPrintFooter(false);
$p->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
$p->SetAutoPageBreak(false, PDF_MARGIN_BOTTOM);
$p->SetFillColor(0);
if( $LabelRellena ){
if( !isset($usuCursor) ) $usuCursor = array();
for($n=0; $n<$NEtiPorLinea*$NEtiPorColumna; $n++) $usuCursor[$n] = array('x','x','x','x','x','x','x','x','x','x');
}
$uX = 0;
$uY = 0;
$Indice = -1;
$NuevaPag = true;
while( $_vF = NewFila() ){
if( $NuevaPag ){
PDFBeginPage($p, $HojaAncho, $HojaAlto);
PDFFuente($PDF_FontFamily, $PDF_FontSize);
$GLOBALS["__font"] = $PDF_FontFamily;
$GLOBALS["__size"] = $PDF_FontSize;
$p->SetLineWidth(0.1);
if( $nPag==1 ){
PDFCalcSizeFont($PDF_FontSize);
$AltoLineas = ($ascender + ($descender*-1)) * $SaltoLinea;
$EntreLineas = $AltoLineas - ( $ascender + ($descender*-1));
$IncrY = (($PDF_FontSize * $SaltoLinea) / 2);
if( substr_count($OffsetX, 'P')==0 ){
$OffsetX = $FontPuntos * ($OffsetX+0);
}else{
$OffsetX = str_replace('P','',$OffsetX);
}
if( $OffsetX<$FontPuntos*2 ) $OffsetX = $FontPuntos*2;
if( substr_count($OffsetY, 'P')==0 ){
$OffsetY = ($PDF_FontSize * $SaltoLinea) * ($OffsetY+0);
if( $OffsetY<=0 ) $OffsetY = 0.1;
}else{
$OffsetY = str_replace('P','',$OffsetY);
}
$OffsetY += 4;
if( substr_count($MargenRight, 'P')==0 ){
$MargenRight  = $FontPuntos * $MargenRight;
}else{
$MargenRight = str_replace('P','',$MargenRight);
}
if( substr_count($MargenBottom, 'P')==0 ){
$MargenBottom = ($PDF_FontSize * $SaltoLinea) * $MargenBottom;
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
for($n=1; $n<count($_PDFLABEL); $n++){
if( $_PDFLABEL[$n][0]=='' ){
$txt = $_PDFLABEL[$n][5];
$SoloLabel = true;
}else{
$txt = trim($_vF[$_PDFLABEL[$n][0]]);
$SoloLabel = false;
}
if( $_PDFLABEL[$n][3]!='' ){
$txt = substr($txt, 0, $_PDFLABEL[$n][3]);
}
$txt = ePDF_ReplaceChr(trim($txt));
if( $_PDFLABEL[$n][1]=='' && $_PDFLABEL[$n][2]=='' ){
ePDF_ContinueText($p, $txt);
}else{
if(		  $_PDFLABEL[$n][1]!='' && $_PDFLABEL[$n][2]=='' ){
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
$x = $OffsetX + ($sNEtiPorLinea * (($Ancho * $FontPuntos) + $MargenRight)) + ($ax * $FontPuntos) - $FontPuntos;
$y = $ay + ($sNEtiPorColumna * $Alto);
$y = $HojaAlto - ($y * $PDF_FontSize * $SaltoLinea) - ($sNEtiPorColumna * $MargenBottom) + $EntreLineas - $OffsetY - ($PDF_FontSize * $SaltoLinea);
ePDF_ShowXY($p, substr($txt,0,$Ancho), $x, $y);
}
if( !$SoloLabel && $_PDFLABEL[$n][5]!='' ) ePDF_ContinueText($p, $_PDFLABEL[$n][5]);
}
if( $FuncUser!='' ){
$ax = 0;
$ay = 0;
if( $AnchoPT=='' ){
$x = $OffsetX + ($sNEtiPorLinea * (($Ancho * $FontPuntos) + $MargenRight)) + ($ax * $FontPuntos) - $FontPuntos;
$y = $ay + ($sNEtiPorColumna * $Alto);
$y = $HojaAlto - ($y * $PDF_FontSize * $SaltoLinea) - ($sNEtiPorColumna * $MargenBottom) + $EntreLineas - $OffsetY - ($PDF_FontSize * $SaltoLinea);
}else{
$x = $OffsetX + ($sNEtiPorLinea * (($Ancho * $FontPuntos) + $MargenRight)) + ($ax * $FontPuntos) - $FontPuntos;
$y = $ay + ($sNEtiPorColumna * $Alto);
$y = $HojaAlto - ($y * $PDF_FontSize * $SaltoLinea) - ($sNEtiPorColumna * $MargenBottom) + $EntreLineas - $OffsetY - ($PDF_FontSize * $SaltoLinea);
}
$x -= $ascender/2;
$y = getY($y, $PDF_FontSize);
$GLOBALS["__x"] = $x;
$GLOBALS["__y"] = $y;
$GLOBALS["__rx"] = $x;
$GLOBALS["__ry"] = $y;
call_user_func($FuncUser, $p, $x, $y, $sNEtiPorLinea, $sNEtiPorColumna, $_vF);
}
}else{
for($n=1; $n<=$Alto; $n++){
$ax = 0;
$x = $OffsetX + ($sNEtiPorLinea * (($Ancho * $FontPuntos) + $MargenRight)) + ($ax * $FontPuntos) - $FontPuntos;
$ay = $n-1;
$y = $ay + ($sNEtiPorColumna * $Alto);
$y = $HojaAlto - ($y * $PDF_FontSize * $SaltoLinea) - ($sNEtiPorColumna * $MargenBottom) + $EntreLineas - $OffsetY - ($PDF_FontSize * $SaltoLinea);
ePDF_ShowXY($p, substr(str_repeat('123456789-',20),0,$Ancho), $x, $y);
}
}
$_NumReg++;
$sNEtiPorLinea++;
if( $sNEtiPorLinea>=$NEtiPorLinea ){
$sNEtiPorLinea = 0;
$sNEtiPorColumna++;
if( $sNEtiPorColumna>=$NEtiPorColumna ){
$sNEtiPorColumna = 0;
$nPag++;
PDFEndPage($p);
$NuevaPag = true;
if( $LabelRellena ) break;
}
}
}
}
if( $_NumReg > 0 ){
if( !$NuevaPag ){
$nPag++;
PDFEndPage( $p );
}
$p->Output($NomPDF,'F');
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
if(			 $x=='' && $y=='' ){
ePDF_ContinueText( $p, $txt );
}else{
if(		 $x<>'' && $y=='' ){
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
ePDF_ShowXY( $p, $txt, $x, $y );
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
ePDF_ShowXY( $p, $TxtError, $x+2, $y-7 );
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
eRect(  $tmp[$n][0], $tmp[$n][1],
$Ancho,
$tmp[$n][1]-$tmp[$n][3]
);
}
$n = count($tmp)-3;
$yTXT = $tmp[$n][1] + $y - $Alto*2-2;
$tmp[$n+1][0] -= 4;
$tmp[$n+2][0] -= 2;
for( $n=count($tmp)-3; $n<count($tmp); $n++ ){
$tmp[$n][0] += $x;
$tmp[$n][1] = $yTXT;
ePDF_ShowXY( $p, $tmp[$n][2], $tmp[$n][0], $tmp[$n][1] );
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
function ePDF_ShowXY($p, $text, $x, $y, $FontHeight=0){
global $PDF_FontSize, $ascender;
if( $FontHeight==0 ) $FontHeight = $PDF_FontSize;
$p->Text( $x-$ascender/2, getY($y,$FontHeight), $text );
}
function ePDF_ContinueText($p, $text){
$p->Text($p->getX(), getY($p->getY()), $text);
}
function PDFBeginPage($p, $HojaAncho, $HojaAlto){
$p->startPage();
$GLOBALS['_PaginaAbierta'] = true;
$_SePintoPie = false;
}
function PDFEndPage( $p ){
$p->endPage();
$GLOBALS['_PaginaAbierta'] = false;
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
default:
$p->SetFont( 'Courier', '', $PDF_FontSize );
eTron( 'NO - SetFuente() - '.$Atributo );
}
}
function eSetTextColor( $p, $Color, $Tipo ){
if( $Color=='' ) return;
if( $Color == ($Color*1).'' ){
$p->SetColor($Tipo, 255*$Color );
return;
}
list( $xr, $xg, $xb ) = explode("\n",chunk_split( str_replace('#','',$Color), 2 ));
$vr = base_convert($xr,16,10);
$vg = base_convert($xg,16,10);
$vb = base_convert($xb,16,10);
$p->SetColor($Tipo, $vr, $vg, $vb );
}
function eSetFillColor($Color){
global $p;
$xColor = $Color.'';
if( $xColor[0]!='#' ){
$p->SetFillColor(255*$Color);
}else{
list( $xr, $xg, $xb ) = explode("\n",chunk_split( str_replace('#','',$Color), 2 ));
$vr = base_convert($xr,16,10);
$vg = base_convert($xg,16,10);
$vb = base_convert($xb,16,10);
$p->SetFillColor($vr,$vg,$vb);
}
}
function eSetTextGris( $r ){
global $p;
$r = 256-$r*256;
if( $r>255 ) $r = 255; if( $r<0 ) $r = 0;
$p->SetTextColor($r);
}
function PDFCalcSizeFont( $PDF_FontSize, &$capheight=NULL, &$ascender=NULL, &$descender=NULL, &$FontPuntos=NULL ){
global $capheight, $ascender, $descender, $FontPuntos;
$capheight = $PDF_FontSize / 1.7452006980803;
$ascender = $PDF_FontSize / 1.5948963317384;
$descender = $PDF_FontSize / -2.6809651474531;
$FontPuntos	= ( $PDF_FontSize * 600 / 1000 );
}
function getY( $y, $AltoFont=0 ){
global $HojaAlto;
return $HojaAlto-$y-$AltoFont;
}
function eRect( $x, $y, $Ancho, $Alto, $df='DF' ){
global $p;
$p->Rect( $x, $y, $Ancho, $Alto, $df );
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
function PDFFuente($Font, $FontSize=10){
global $p;
switch( str_replace('-','',strtoupper($Font)) ){
case 'COURIER':
$p->SetFont('Courier', '', $FontSize);
break;
case 'COURIERBOLD':
case 'BOLD':
case 'BOLDNORMAL':
$p->SetFont('Courier', 'B', $FontSize);
break;
case 'ITALIC':
case 'ITALICNORMAL':
case 'OBLIQUE':
case 'OBLIQUENORMAL':
$p->SetFont('Courier', 'I', $FontSize);
break;
case 'BOLDITALIC':
case 'BOLDOBLIQUE':
$p->SetFont('Courier', 'BI', $FontSize);
break;
case 'HELVETICA':
$p->SetFont('Helvetica', '', $FontSize);
break;
case 'HELVETICABOLD':
$p->SetFont('Helvetica', 'B', $FontSize);
break;
case 'HELVETICABOLDITALIC':
$p->SetFont('Helvetica', 'BI', $FontSize);
break;
case 'HELVETICAITALIC':
$p->SetFont('Helvetica', 'I', $FontSize);
break;
default:
$p->SetFont('Courier', '', 10);
eTron('NO - PDFFuente() - '.$Font.' - '.$FontSize);
}
}
function ePDFText($x, $y, $text){
global $p;
$p->Text($x, $y, $text);
}
function mm($n){
return $n*2.834;
}
function pMM($n){
return mm($n);
}
function pHeaderY($top){
global $PDF_Height, $y;
$y = ($PDF_Height)-pMM($top);
}
function pHtml($x, $y, $ancho, $alto, $txt, $cnf=[]){
global $p;
$cnf["box"] = (($cnf["box"]===true)? 1:0);
$x = mm($x);
$y = mm($y);
$ancho = mm($ancho);
$alto = mm($alto);
if( $cnf["color"]!="" ) $GLOBALS["__color_text"] = $cnf["color"];
if( $cnf["size"]!="" ) $GLOBALS["__size"] = $cnf["size"];
if( $cnf["font"]!="" ) $GLOBALS["__font"] = $cnf["font"];
if( $cnf["textAlign"]!="" ) $cnf["textAlign"] = trim(strtoupper($cnf["textAlign"]))[0];
else $cnf["textAlign"] = "";
pFont($GLOBALS["__font"], $GLOBALS["__size"]);
pColor($GLOBALS["__color_text"], "text");
if( $cnf["borderColor"]!="" ) $GLOBALS["__color_draw"] = $cnf["borderColor"];
pColor($GLOBALS["__color_draw"], "draw");
if( $cnf["backgroundColor"]!="" ) $GLOBALS["__color_fill"] = $cnf["backgroundColor"];
pColor($GLOBALS["__color_fill"], "fill");
if( $cnf["width"]!="" ) $GLOBALS["__width"] = $cnf["width"];
$p->SetLineStyle(array('width'=>$GLOBALS["__width"]));
$GLOBALS["__rotate"] = "";
if( $cnf["rotate"]!="" ){
$p->StartTransform();
$p->Rotate($cnf["rotate"], $x, $y);
$GLOBALS["__rotate"] = $cnf["rotate"];
}
$p->writeHTMLCell($ancho, $alto, $x, $y, $txt, $cnf["box"], 1, true, true, $cnf["textAlign"], true);
if( $cnf["rotate"]!="" ) $p->StopTransform();
$p->SetLineStyle(array('width'=>0.1));
return $p->getY()/2.834;
}
$__x = 0;
$__y = 0;
$__rx = 0;
$__ry = 0;
$__font = "courier";
$__size = 10;
$__color_text = "#000000";
$__color_draw = "#000000";
$__color_fill = "#ffffff";
$__width = 0.1;
$__rotate = "";
$__borderColor = "#000000";
$__backgroundColor = "#eeeeee";
$__fill = false;
function pText($x, $y=0, $txt=false, $cnf=[]){
global $p;
$srx = $GLOBALS["__rx"];
$sry = $GLOBALS["__ry"];
if( $txt==false ){
pFont($GLOBALS["__font"], $GLOBALS["__size"]);
pColor($GLOBALS["__color_text"], 'text');
if( $GLOBALS["__rotate"]!="" ){
$p->StartTransform();
$p->Rotate($GLOBALS["__rotate"], $GLOBALS["__x"], $GLOBALS["__y"]);
}
ePDFText($GLOBALS["__x"], $GLOBALS["__y"], $x);
if( $GLOBALS["__rotate"]!="" ) $p->StopTransform();
return ($GLOBALS["__y"]+$GLOBALS["__size"])/2.834;
}else{
ePDFText($srx+$x, $sry-$y, $txt);
$GLOBALS["__x"] = $srx+$x;
$GLOBALS["__y"] = $sry-$y;
return ($p->getY()+$GLOBALS["__size"])/2.834;
}
}
function pLine($x, $y, $x2, $y2, $cnf=[]){
global $p;
$x = mm($x);
$y = mm($y);
$x2 = mm($x2);
$y2 = mm($y2);
if( $cnf["color"]!="" ) $GLOBALS["__color_draw"] = $cnf["color"];
if( $cnf["width"]!="" ) $GLOBALS["__width"] = $cnf["width"];
pColor($GLOBALS["__color_draw"], "draw");
$p->SetLineStyle(array('width'=>$GLOBALS["__width"]));
$p->Line($x, $y, $x2, $y2);
$p->SetLineStyle(array('width'=>0.1));
}
function pFont($font, $height){
$GLOBALS["__size"] = $height;
$GLOBALS["__font"] = $font;
PDFFuente($font, $height);
}
function pColor($color, $tipo='text'){
global $p;
$GLOBALS["__color_{$tipo}"] = $color;
eSetTextColor($p, $color, $tipo);
}
function pRect($x, $y, $ancho, $alto, $cnf=[]){
$x = mm($x);
$y = mm($y);
$ancho = mm($ancho);
$alto = mm($alto);
if( isset($cnf["fill"]) ) $GLOBALS["__fill"] = $cnf["fill"];
if( $cnf["borderColor"]!="" ) $GLOBALS["__borderColor"] = $cnf["borderColor"];
if( $cnf["backgroundColor"]!="" ) $GLOBALS["__backgroundColor"] = $cnf["backgroundColor"];
pColor($GLOBALS["__borderColor"], 'draw');
pColor($GLOBALS["__backgroundColor"], 'fill');
eRect($x, $y, $ancho, $alto, (($GLOBALS["__fill"])?"DF":""));
}
function pImg($x, $y, $file, $zoom=1){
global $p;
if( gettype($zoom)=="array" ){
$zoomX = $zoom[0];
$zoomY = $zoom[1];
}else{
$zoomX = $zoom;
$zoomY = $zoom;
}
$Extension = str_replace('jpg','jpeg', substr($file, strpos($file,'.')+1));
if( PHP_OS=='WINNT' ){
$file = str_replace('/http/edes.php', '', $_SERVER['SCRIPT_FILENAME']).$file;
}else{
$file = eScript($file);
}
$x += $GLOBALS["__x"];
$y += $GLOBALS["__y"];
list($Ancho, $Alto) = getimagesize($file);
$Ancho *= $zoomX;
$Alto *= $zoomY;
$p->Image($file, $x, $y, $Ancho, $Alto, $Extension);
$GLOBALS["PDF_ImgX1"] = $x/2.834;
$GLOBALS["PDF_ImgY1"] = ($y)/2.834;
$GLOBALS["PDF_ImgX2"] = ($x+$Alto)/2.834;
$GLOBALS["PDF_ImgY2"] = ($y+$Alto)/2.834;
return $GLOBALS["PDF_ImgY2"];
}
?>
