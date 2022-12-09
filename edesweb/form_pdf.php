<?PHP
if( !isset($_SESSION['_User']) || $GLOBALS["_gsID"]!=getmypid() ) exit;
if( $_SESSION['_PDF_']<>'S' ) eEnd();
set_time_limit(60*5);
include("../../lib/tcpdf/tcpdf.inc");
eInclude("message");
if( !function_exists("qQuery") ) eInclude($GLOBALS["_Sql"]);
if( isset($_GET["cd_gs_form"]) || isset($_POST["cd_gs_form"]) ){
if( isset($_GET["cd_gs_form"]) ) $cd_gs_form = $_GET["cd_gs_form"];
else if( isset($_POST["cd_gs_form"]) ) $cd_gs_form = $_POST["cd_gs_form"];
_eFormPrint($cd_gs_form*1);
}else if( isset($_POST["DATOS"]) ){
if( isset($_POST["TYPE"]) ){
$_MenuVariables = array();
$file = "../_datos/config/form_".$_POST["TYPE"].".var";
if( file_exists($file) ){
$dim2 = file($file);
for($n=0; $n<count($dim2); $n++){
$tmp = explode("~",trim($dim2[$n]));
$tmp[1] = trim($tmp[1]);
if( $tmp[1]!="" ){
$_MenuVariables[] = $tmp;
}
}
}
_eFormPrint(array(array(-1, $_POST["DATOS"])), $_MenuVariables);
}else{
_eFormPrint(array(array(-1, $_POST["DATOS"])));
}
}
function _eFormPrint($Registro, $oDimReplace=array(), $TotalCopias=1, $DescargarPDF=true, $CopiarComo=""){
global $p, $_mm, $_PaginaAbierta, $_Color;
global $HojaAlto, $PDF_FontSize, $font, $capheight, $ascender, $descender, $FontPuntos;
if( $CopiarComo=="" ){
$NomPDF = "/_tmp/pdf/form_{$_User}.pdf";
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
$p = new TCPDF((($PDF_Horientacion=='V')?'P':'L'), 'pt', 'A4', false, 'ISO-8859-1', false);
$p->SetDisplayMode('fullpage', 'continuous');
$p->setPrintHeader(false);
$p->setPrintFooter(false);
$p->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
$p->SetAutoPageBreak(false, PDF_MARGIN_BOTTOM);
$p->SetFillColor(0);
$DimRegAImprimir = array();
if( gettype($Registro)=="integer" || gettype($Registro)=="string" ){
$DimRegAImprimir[] = $Registro;
}else if( gettype($Registro)=="array" ){
$DimRegAImprimir = $Registro;
}
for($NCopia=1; $NCopia<=$TotalCopias; $NCopia++){
for($NReg=0; $NReg<count($DimRegAImprimir); $NReg++){
$NextForm = "";
$DimReplace = array();
if( gettype($DimRegAImprimir[$NReg])=="array" ){
$Registro = $DimRegAImprimir[$NReg][0];
$DimReplace = $DimRegAImprimir[$NReg][1];
}else{
$Registro = $DimRegAImprimir[$NReg];
if( gettype($oDimReplace)=="array" ) $DimReplace = $oDimReplace;
}
if( $Registro!=-1 ){
if( gettype($Registro)=="string" &&  !is_numeric($Registro) ){
qQuery("select * from gs_form where token='{$Registro}'");
}else{
qQuery("select * from gs_form where cd_gs_form={$Registro} && cd_gs_node=".$_SESSION["_Node"]);
}
$r = qArray();
if( $r["cd_gs_form"]!=$Registro ){
eMessage('Acceso no autorizado', 'HSE');
}
$txt = $r["data"];
$NextForm = trim($r["next_form"]);
}else{
$txt = $DimReplace;
$DimReplace = $oDimReplace;
}
for($v=0; $v<count($DimReplace); $v++){
$txt = str_replace($DimReplace[$v][0], $DimReplace[$v][1], $txt);
}
$dim = explode("|", $txt);
do{
$dim[0] = str_replace(array("V","H"), array("P","L"), strtoupper($dim[0]).",V");
$PDF_FontFamily = 'helvetica';
$PDF_FontSize = 14;
$tmp = explode(",", $dim[0]);
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
$p->AddPage($tmp[1], $tmp[0]);
$p->SetFont($PDF_FontFamily, '', $PDF_FontSize);
$p->SetLineWidth(0.1);
for($v=0; $v<2; $v++){
for($n=1; $n<count($dim); $n++){
$cuerpo = explode("~", $dim[$n]);
$dat = explode(",", $cuerpo[0]);
if( $v==0 && trim(strtoupper($dat[0])[0])!="R" ) continue;
if( $v==1 && trim(strtoupper($dat[0])[0])=="R" ) continue;
switch( trim(strtoupper($dat[0])[0]) ){
case '-':
$p->SetLineWidth(0.1);
$p->SetLineStyle(array('width'=>0.1, 'cap'=>'butt', 'join'=>'miter', 'dash'=>mm(2.7).",".mm(1.55)));
eLine(mm(0), mm($dat[1])/3, mm($_Ancho), mm($dat[1])/3);
PDFFuente('zapfdingbats', 20);
ePDF_ShowXY($p, '"', mm($_Ancho)-mm(10), (mm($dat[1])/3)-mm(4.432), mm(20));
$p->SetFont($PDF_FontFamily, '', $PDF_FontSize);
$p->SetLineStyle(array('width'=>0.1, 'cap'=>'butt', 'join'=>'miter', 'dash'=>''));
break;
case 'L':
$txt = "";
if( $dat[7]!="" ){
$guion = explode(":", $dat[7]);
for($i=0; $i<count($guion); $i++){
if( $txt!="" ) $txt.=",";
$txt .= mm($guion[$i])/3;
}
}
$p->SetLineStyle(array('width'=>0.1, 'cap'=>'butt', 'join'=>'miter', 'dash'=>$txt));
if( $dat[4]=="" ){
$dat[4] = $dat[2];
$dat[3] += $dat[1];
}
if( $dat[6]!="" ){
$p->SetLineWidth(mm($dat[6])/3);
}
eSetTextColor($p, $dat[5], "draw");
eLine(mm($dat[1])/3, mm($dat[2])/3, mm($dat[3])/3, mm($dat[4])/3);
break;
case 'R':
$txt = "";
if( $dat[8]!="" ){
$guion = explode(":", $dat[8]);
for($i=0; $i<count($guion); $i++){
if( $txt!="" ) $txt.=",";
$txt .= mm($guion[$i])/3;
}
}
$p->SetLineStyle(array('width'=>0.1, 'cap'=>'butt', 'join'=>'miter', 'dash'=>$txt));
if( $dat[6]!="" ){
$p->SetLineWidth(mm($dat[6])/3);
}
eSetTextColor($p, $dat[5], "draw");
if( $dat[7]=="transparent" ){
$p->Rect(mm($dat[1])/3, mm($dat[2])/3, mm($dat[3])/3, mm($dat[4])/3);
}else{
$p->Rect(mm($dat[1])/3, mm($dat[2])/3, mm($dat[3])/3, mm($dat[4])/3, "DF", "", eHexToRGB($dat[7]));
}
$p->SetLineWidth(0.1);
break;
case 'C':
$txt = "";
if( $dat[7]!="" ){
$guion = explode(":", $dat[7]);
for($i=0; $i<count($guion); $i++){
if( $txt!="" ) $txt.=",";
$txt .= mm($guion[$i])/3;
}
}
$p->SetLineStyle(array('width'=>0.1, 'cap'=>'butt', 'join'=>'miter', 'dash'=>$txt));
if( $dat[5]!="" ){
$p->SetLineWidth(mm($dat[5])/3);
}
eSetTextColor($p, $dat[4], "draw");
if( $dat[6]=="transparent" ){
$p->Circle(mm($dat[1])/3, mm($dat[2])/3, mm($dat[3])/3);
}else{
$p->Circle(mm($dat[1])/3, mm($dat[2])/3, mm($dat[3])/3, 0, 360, "DF", "", eHexToRGB($dat[6]));
}
break;
case 'T':
$cuerpo[1] = eEntityDecode($cuerpo[1], false);
$dat[4] = strtolower($dat[4]);
if( $dat[6]=="bold" || $dat[6]=="700" ) $dat[4] .= "B";
if( $dat[5]=="italic" ) $dat[4] .= "I";
$isUTF8 = preg_match('//u', $cuerpo[1]);
if( $isUTF8 ) $cuerpo[1] = utf8_decode($cuerpo[1]);
eSetTextColor($p, $dat[7], "text");
$p->SetFont($dat[4], '', $dat[3]*0.95);
$x = mm($dat[1])/3;
$y = mm($dat[2])/3;
$x -= ($dat[3]*0.945);
$y += ($dat[3]*0.945)+3;
$p->StartTransform();
$p->Rotate(90, $x, $y);
ePDF_ShowXY($p, $cuerpo[1], $x, $y);
$p->StopTransform();
break;
case 'H':
$cuerpo[1] = eEntityDecode($cuerpo[1], false);
$isUTF8 = preg_match('//u', $cuerpo[1]);
if( $isUTF8 ) $cuerpo[1] = utf8_decode($cuerpo[1]);
$txt = $cuerpo[1];
$dat[1] = $dat[1]/3;
$dat[2] = $dat[2]/3;
$dat[3] = $dat[3]/3;
$dat[4] = $dat[4]/3;
$dat[1] -= 0.9;
$dat[2] -= 0.9;
$dat[3] += 5;
$dat[6] = strtolower($dat[6]);
eSetTextColor($p, $dat[7], "text");
$p->SetFont($dat[6], '', $dat[5]*0.945);
$txt = str_replace($dat[5]."px", ($dat[5]*0.945)."px", $txt);
$p->writeHTMLCell(mm($dat[3]), mm($dat[4]), mm($dat[1]), mm($dat[2]), $txt, 0, 0, false, true, '', true);
break;
case 'I':
$dat[5] = str_replace("edes.php?R:", "..", $dat[5]);
if( $dat[3]=="null" ) $dat[3] = "";
if( $dat[4]=="null" ) $dat[4] = "";
$Ancho = null;
if( $dat[3]!="" ) $Ancho = mm($dat[3])/3;
$Alto = null;
if( $dat[4]!="" ) $Ancho = mm($dat[4])/3;
$p->Image($dat[5], mm($dat[1])/3, mm($dat[2])/3, $Ancho, $Alto, $Extension);
break;
case 'P':
$dat[1] = str_replace("edes.php?R:", "..", $dat[1]);
$Ancho = $dat[4]/3;
$Alto  = $dat[5]/3;
$x = 0;
$y = 0;
$xm = 0;
$ym = 0;
$xm = $dat[2]/3;
$ym = $dat[3]/3;
$p->Image($dat[1], mm($x+$xm), mm($y+$ym), mm($Ancho), mm($Alto), $Extension);
break;
}
}
}
$NextPagina = false;
if( $NextForm!="" ){
qQuery("select * from gs_form where cd_gs_form={$NextForm} && cd_gs_node=".$_SESSION["_Node"]);
$r = qArray();
if( $r["cd_gs_node"]!=$_SESSION["_Node"] ){
eMessage('Acceso no autorizado', 'HSE');
}
$dim = explode("|", $r["data"]);
$NextForm = trim($r["next_form"]);
$NextPagina = true;
}
PDFEndPage($p);
}while($NextPagina);
}
}
$p->Output($NomPDF, 'F');
if( $DescargarPDF ){
$MasGet = "";
if( isset($_GET["_IFRAME"]) ) $MasGet = "&_IFRAME";
$NomFile = explode('/',$NomFile);
$NomFile = $NomFile[count($NomFile)-1];
$NomFile = "/_tmp/pdf/prueba_".time().".pdf";
if( isset($_REMOTE_) ){
eMessage('~PDF','HS','','location.href = "edes.php?RD:'.$oNomPDF.'&FILE='.$NomFile.$MasGet.'";');
}else{
eMessage('~PDF','HS','','location.href = "edes.php?D:'.$oNomPDF.'&FILE='.$NomFile.$MasGet.'";');
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
$p->SetFont( 'Courier', '', $FontSize );
break;
case 'COURIERBOLD':
case 'BOLD':
case 'BOLDNORMAL':
$p->SetFont( 'Courier', 'B', $FontSize );
break;
case 'ITALIC':
case 'ITALICNORMAL':
case 'OBLIQUE':
case 'OBLIQUENORMAL':
$p->SetFont( 'Courier', 'I', $FontSize );
break;
case 'BOLDITALIC':
case 'BOLDOBLIQUE':
$p->SetFont( 'Courier', 'BI', $FontSize );
break;
case 'ZAPFDINGBATS':
$p->SetFont( 'zapfdingbats', '', $FontSize );
break;
default:
eTron( 'NO - PDFFuente() - '.$Font );
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
?>
