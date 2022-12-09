<?PHP
if( !isset($_SESSION['_User']) || $GLOBALS["_gsID"]!=getmypid() ) exit;
if( $_SESSION['_PDF_']<>'S' ) eEnd();
set_time_limit(60*5);
include("../../lib/tcpdf/tcpdf.inc");
eInclude("message");
if( !function_exists("qQuery") ) eInclude($GLOBALS["_Sql"]);
$dato = array();
$dim = explode("~", $_POST["screen"]);
for($n=0; $n<count($dim)-1; $n++){
$dato[] = explode("|", $dim[$n]);
}
define('tagName'		,  0);
define('x'				,  1);
define('y'				,  2);
define('w'				,  3);
define('h'				,  4);
define('zIndex'			,  5);
define('color'			,  6);
define('backgroundColor',  7);
define('fontSize'		,  8);
define('fontWeight'		,  9);
define('borderLeftColor'		, 10);
define('borderRightColor'		, 11);
define('borderBottomColor'		, 12);
define('borderTopColor'			, 13);
define('borderLeftWidth'		, 14);
define('borderRightWidth'		, 15);
define('borderBottomWidth'		, 16);
define('borderTopWidth'			, 17);
define('borderTopLeftRadius'	, 18);
define('borderTopRightRadius'	, 19);
define('borderBottomLeftRadius'	, 20);
define('borderBottomRightRadius', 21);
define('textAlign'				, 22);
define('verticalAlign'			, 23);
define('paddingLeft'	, 24);
define('paddingBottom'	, 25);
define('src'			, 26);
define('value'			, 27);
define('innerText'		, 28);
define('sourceIndex'	, 29);
$minX = $dato[0][x];
$minY = $dato[0][y];
$maxX = $dato[0][x]+$dato[0][w];
$maxY = $dato[0][y]+$dato[0][y];
for($n=0; $n<count($dato); $n++){
$minX = min($minX, $dato[$n][x]);
$minY = min($minY, $dato[$n][y]);
$maxX = max($maxX, $dato[$n][x]+$dato[$n][w]);
$maxY = max($maxY, $dato[$n][y]+$dato[$n][h]);
}
function array_orderby(){
$args = func_get_args();
$data = array_shift($args);
foreach($args as $n=>$field){
if(is_string($field)){
$tmp = array();
foreach($data as $key=>$row) $tmp[$key] = $row[$field];
$args[$n] = $tmp;
}
}
$args[] = &$data;
call_user_func_array('array_multisort', $args);
return array_pop($args);
}
$dato = array_orderby($dato, zIndex, SORT_ASC, y, SORT_ASC, x, SORT_ASC);
_eScreenToPDF($dato);
function _eScreenToPDF($dim){
global $p, $_mm, $_PaginaAbierta, $_Color;
global $HojaAlto, $PDF_FontSize, $font, $capheight, $ascender, $descender, $FontPuntos;
if( $CopiarComo=="" ){
$NomPDF = "/_tmp/pdf/screen_{$_SESSION['_User']}.pdf";
$oNomPDF = $NomPDF;
if( PHP_OS=='WINNT' ){
$NomPDF = str_replace('/http/edes.php', '', $_SERVER['SCRIPT_FILENAME']).$NomPDF;
}else{
$NomPDF = eScript($NomPDF);
}
}else{
if( !preg_match('/\.pdf$/', $CopiarComo) ) $CopiarComo .= ".pdf";
$oNomPDF = $CopiarComo;
$NomPDF = eScript($CopiarComo);
}
if( file_exists($NomPDF) ) unlink($NomPDF);
clearstatcache();
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
'Z'=>'zapfdingbats'
);
if( !isset($PDF_FontSize) && isset($PDF_AltoLetra) ) $PDF_FontSize = $PDF_AltoLetra;
if( !isset($PDF_FontFamily) ) $PDF_FontFamily = 'Helvetica';
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
$_mm = 2.834;
$SaltoLinea		= 1.5;
$FontPuntos		= ($PDF_FontSize * 600 / 1000);
$MargenHoja		= $PDF_xMargen;
$MargenDerecho	= 0;
$AltoLineas		= 0;
$_NumReg		= 0;
$y				= $HojaAlto;
$x				= $MargenHoja;
$InicioY		= 0;
$nPag			= 1;
$Zoom = 6;
$dimImg = array();
$p = new TCPDF((($PDF_Horientacion=='V')?'P':'L'), 'pt', 'A4', false, 'ISO-8859-1', false);
$p->SetDisplayMode('fullpage', 'continuous');
$p->setPrintHeader(false);
$p->setPrintFooter(false);
$p->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
$p->SetAutoPageBreak(false, PDF_MARGIN_BOTTOM);
$p->SetFillColor(0);
$p->SetLineWidth(0.05);
$p->SetKeywords('eDes');
$formato[0] = "A4,".(($PDF_Horientacion=='V')?'P':'L');
$PDF_FontFamily = 'helvetica';
$PDF_FontSize = 14;
$tmp = explode(",", $formato[0]);
if( $tmp[1]=='P' ){
$HojaAncho	= 595.0;
$HojaAlto	= 842.0;
$_Ancho = 210;
$_Alto  = 297;
}else{
$HojaAncho	= 842.0;
$HojaAlto	= 595.0;
$_Ancho = 297;
$_Alto  = 210;
}
if( $tmp[0]=="A5" ){
$HojaAncho /= 2;
$HojaAlto  /= 2;
$_Ancho /= 2;
$_Alto  /= 2;
}
$restarY = 0;
$p->AddPage($tmp[1], $tmp[0]);
$p->SetFont($PDF_FontFamily, '', $PDF_FontSize);
$p->SetLineWidth(0.1);
for($n=0; $n<count($dim); $n++){
$d = $dim[$n];
switch( trim(strtoupper($d[tagName])) ){
case "EDES":
$p->SetTitle("ERROR: ".$d[color]);
break;
case "=":
$dimImg[$d[1]] = $d[3];
break;
case "I":
case "IMG":
if( trim($d[src])=="" ) break;
if( $d[src][0]=="=" ){
$d[src] = $dimImg[$d[src]];
}
if( substr($d[src],0,11)=="data:image/" ){
list($Extension,$imagen) = explode(";base64,",$d[src]);
list(,$Extension) = explode("/",$Extension);
$file = "../_tmp/php/icon_{$_SESSION['_User']}_{$n}.{$Extension}";
file_put_contents($file, base64_decode($imagen));
}else if( substr_count($d[src],"edes.php?R:")>0 ){
list(,$file) = explode("edes.php?R:",$d[src]);
list($file) = explode("?",$file);
list($file) = explode("&",$file);
$file = eScript($file);
}else{
list(,$file) = explode("/g/", $d[src]);
$file = "g/{$file}";
$Extension = eFileType($file);
}
$p->Image($file, mm($d[x])/$Zoom, mm($d[y]-4)/$Zoom, mm($d[w])/$Zoom*1.2, mm($d[h])/$Zoom*1.2, $Extension);
break;
case "A":
break;
case "LABEL":
case "FIELDSET":
case "LEGEND":
case "TABLE":
case "TH":
case 'DIV':
case 'INPUT':
case 'SPAN':
case 'TD':
case 'TH':
case "TEXTAREA":
if( $d[w]==0 && $d[h]==0 ) break;
$d[y] -= $restarY;
$txt = "";
$conBorde = false;
if( ($d[borderLeftWidth]+$d[borderRightWidth]+$d[borderBottomWidth]+$d[borderTopWidth])>3 && $d[borderLeftColor]!="" ){
$conBorde = true;
$p->SetLineWidth(mm($d[borderWidth])/$Zoom);
eSetTextColor($p, $d[borderLeftColor], "draw");
}else{
if( $d[borderBottomWidth]>0 && $d[borderBottomColor]!=""){
$p->SetLineWidth(0.1);
eSetTextColor($p, $d[borderBottomColor], "draw");
eLine(mm($d[x])/$Zoom, mm($d[y]+$d[h])/$Zoom, mm($d[x]+$d[w])/$Zoom, mm($d[y]+$d[h])/$Zoom);
}
$p->SetLineWidth(0);
}
if( $d[borderTopLeftRadius]>0 && $d[borderTopRightRadius]==$d[borderTopLeftRadius] and $d[borderBottomLeftRadius]==$d[borderTopLeftRadius] and $d[borderBottomRightRadius]==$d[borderTopLeftRadius] ){
if( $d[backgroundColor]=="" ){
if( $conBorde ){
$p->Rect(mm($d[x])/$Zoom, mm($d[y])/$Zoom, mm($d[w])/$Zoom, mm($d[h])/$Zoom);
}
}else{
$p->RoundedRect(mm($d[x])/$Zoom, mm($d[y])/$Zoom, mm($d[w])/$Zoom, mm($d[h])/$Zoom, mm($d[borderTopLeftRadius])/$Zoom, '1111', 'DF', "", eHexToRGB($d[backgroundColor]));
}
}else{
if( $d[backgroundColor]=="" ){
if( $conBorde ){
$p->Rect(mm($d[x])/$Zoom, mm($d[y])/$Zoom, mm($d[w])/$Zoom, mm($d[h])/$Zoom);
}
}else{
$p->Rect(mm($d[x])/$Zoom, mm($d[y])/$Zoom, mm($d[w])/$Zoom, mm($d[h])/$Zoom, "DF", "", eHexToRGB($d[backgroundColor]));
}
}
$d[value] = trim(str_replace("&nbsp;", "", $d[value].""));
$d[innerText] = trim(str_replace("&nbsp;", "", $d[innerText].""));
if( $d[value]!="" || $d[innerText]!="" ){
$txt = (($d[value]!="")? $d[value] : $d[innerText]);
$txt = eEntityDecode($txt, false);
if( $d[color]!="" ) eSetTextColor($p, $d[color], "text");
$d[fontSize] = $d[fontSize]*0.85/2;
$p->SetFont("helvetica", "", $d[fontSize]);
$x = mm($d[x])/$Zoom;
$y = mm($d[y])/$Zoom;
$d[w] = mm($d[w])/$Zoom;
$d[h] = mm($d[h])/$Zoom;
$tLineas = substr_count($txt, "{[br]}");
if( $tLineas>0 ){
$dimText = explode("{[br]}", $txt);
$y -= $d[fontSize]*1.6*($tLineas/2);
}else{
$dimText = array($txt);
}
$tLineas = count($dimText);
$sx = $x;
$sy = $y;
for($nl=0; $nl<$tLineas; $nl++){
$x = $sx;
$txt = $dimText[$nl];
if( $d[textAlign]=="center" || $d[textAlign]=="-webkit-center" ){
$w = $p->GetStringWidth($txt, "helvetica", "", $d[fontSize]);
$x += (($d[w]-$w)/2)-2;
}else if( $d[textAlign]=="right" ){
$w = $p->GetStringWidth($txt, "helvetica", "", $d[fontSize]);
$x += $d[w]-$w-5;
}
if( $d[verticalAlign]=="middle" ){
$y = $y+(($d[h]-$d[fontSize])/2);
}else if( $d[verticalAlign]=="baseline" ){
$y += $d[fontSize]*0.5;
}else if( $d[verticalAlign]=="top" ){
$y += 2.5;
}
ePDF_ShowXY($p, $txt, $x, $y);
$y += $d[fontSize]*0.4;
}
}
break;
}
}
PDFEndPage($p);
$p->Output($NomPDF, 'F');
$DescargarPDF = true;
if( $DescargarPDF ){
$MasGet = "";
if( isset($_GET["_IFRAME"]) ) $MasGet = "&_IFRAME";
$NomFile = explode('/',$NomFile);
$NomFile = $NomFile[count($NomFile)-1];
$NomFile = "/_tmp/pdf/prueba_".time().".pdf";
$NomFile = "doc.pdf";
if( isset($_REMOTE_) ){
eMessage('~PDF','HS','','top.S.info(top); location.href="edes.php?RD:'.$oNomPDF.'&FILE='.$NomFile.$MasGet.'";');
}else{
eMessage('~PDF','HS','','top.S.info(top); location.href="edes.php?D:'.$oNomPDF.'&FILE='.$NomFile.$MasGet.'";');
}
}
}
function ePDF_ShowXY($p, $text, $x, $y, $FontHeight=0){
global $PDF_FontSize, $ascender;
if( $FontHeight==0 ) $FontHeight = $PDF_FontSize;
$p->Text($x, $y, $text);
}
function ePDF_ContinueText($p, $text){
$p->Text( $p->getX(), getY($p->getY()), $text );
}
function PDFBeginPage($p, $HojaAncho, $HojaAlto){
$p->startPage();
$GLOBALS['_PaginaAbierta'] = true;
$_SePintoPie = false;
}
function PDFEndPage($p){
$p->endPage();
$GLOBALS['_PaginaAbierta'] = false;
}
function PDFFuente( $Font, $FontSize=10 ){
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
case 'ZAPFDINGBATS':
$p->SetFont('zapfdingbats', '', $FontSize);
break;
default:
eTron('NO - PDFFuente() - '.$Font);
}
}
function SetFuente( $Atributo ){
global $_Color, $font, $p, $PDF_FontSize;
switch( $_Color[$Atributo]['FONT-WEIGHT'].$_Color[$Atributo]['FONT-STYLE'] ){
case 'BOLD':
case 'BOLDNORMAL':
$p->SetFont('Courier', 'B', $PDF_FontSize);
break;
case 'ITALIC':
case 'ITALICNORMAL':
case 'OBLIQUE':
case 'OBLIQUENORMAL':
$p->SetFont('Courier', 'I', $PDF_FontSize);
break;
case 'BOLDITALIC':
case 'BOLDOBLIQUE':
$p->SetFont('Courier', 'BI', $PDF_FontSize);
break;
default:
$p->SetFont('Courier', '', $PDF_FontSize);
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
function eSetTextGris($r){
global $p;
$r = 256-$r*256;
if( $r>255 ) $r = 255; if( $r<0 ) $r = 0;
$p->SetTextColor($r);
}
function PDFCalcSizeFont($PDF_FontSize, &$capheight=NULL, &$ascender=NULL, &$descender=NULL, &$FontPuntos=NULL){
global $capheight, $ascender, $descender, $FontPuntos;
$capheight = $PDF_FontSize / 1.7452006980803;
$ascender = $PDF_FontSize / 1.5948963317384;
$descender = $PDF_FontSize / -2.6809651474531;
$FontPuntos	= ( $PDF_FontSize * 600 / 1000 );
}
function ePDF_ReplaceChr($Celda){
$Celda = str_replace('&amp;' ,'&',$Celda);
$Celda = str_replace('&quot;','"',$Celda);
$Celda = str_replace('&#34;','"',$Celda);
$Celda = str_replace('&#39;',"'",$Celda);
$Celda = str_replace('&#43;','+',$Celda);
$Celda = str_replace('&#92;','\\',$Celda);
return $Celda;
}
function getY($y, $AltoFont=0){
global $HojaAlto;
return $HojaAlto-$y-$AltoFont;
}
function eRect($x, $y, $Ancho, $Alto, $df='DF'){
global $p;
$p->Rect($x, $y, $Ancho, $Alto, $df);
}
function eLine($x1, $y1, $x2, $y2){
global $p;
$p->Line($x1, $y1, $x2, $y2, array(256*0.75));
}
function mm($n){
return $n*$GLOBALS["_mm"];
}
function eImagen($x, $y, $imagen){
global $p, $IncrY, $_x1G, $_y1G, $_x2G, $_y2G;
$TxtError = '';
$stmp = explode('.',$imagen);
$Extension = $stmp[count($stmp)-1];
$Extension = str_replace('jpg', 'jpeg', $Extension);
switch( $Extension ){
case 'jpeg':
$imagen = pdf_open_jpeg( $p, $imagen );
break;
case 'gif':
$imagen = pdf_open_gif( $p, $imagen );
break;
case 'png':
$imagen = pdf_open_png( $p, $imagen );
break;
default:
$tmp = explode('/',$imagen);
$TxtError = $tmp[count($tmp)-1];
break;
}
if( $TxtError!='' ){
}else if( $imagen < 1 ){
$tmp = explode('/',$imagen);
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
?>
