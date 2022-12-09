<?PHP
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() ) exit;
if( $_SESSION['_PDF_']<>'S' ) eEnd();
set_time_limit(60*5);
include("../../lib/tcpdf/tcpdf.inc");
if( $_POST['_ReportAll']=='S' && !function_exists('gsActivity') ){
$_POST['_GRAPHS'] = '*';
$_GRAPH = '*';
if( !function_exists('eGraph') ) include('../../edesweb/graph.inc');
$TituloGraph = '';
$TipoGraph = strtoupper(str_replace('*', 'P,C,R,G', (($_GRAPH[0]=='')?'*':$_GRAPH[0])));
if( isset($_THCOLSPAN[0]) ){
list(,,$TituloCol) = explode(',', $_THCOLSPAN[count($_THCOLSPAN)-1]);
}else{
$TituloCol = $_Form[$_TotalColIzq-1][0];
}
$DimVar = array();
if( $_GRAPH[6]!='' ){
$tmp = explode(',',$_GRAPH[6]);
for($n=0; $n<count($tmp); $n++){
list($k,$v) = explode('=',$tmp[$n]);
$k = trim($k);
if( $k[0]=='$' ) $k = substr($k,1);
$v = trim($v);
if( $v[0]==substr($v,-1) && ($v[0]=="'" || $v[0]=='"') ) $v = substr($v,1,-1);
$DimVar[trim($k)] = trim($v);
}
}
if( $_GRAPH[1]!='' ) $TituloFila = $_GRAPH[1];
if( $_GRAPH[2]!='' ) $TituloCol = $_GRAPH[2];
if( substr_count($TipoGraph,'P')>0 ) $xGraphP = eGraph('P', $usuCursor, $_Form, $_COLSOP, $TituloGraph, $TituloCol, $TituloFila, '', $DimVar);
if( substr_count($TipoGraph,'C')>0 ) $xGraphC = eGraph('C', $usuCursor, $_Form, $_COLSOP, $TituloGraph, $TituloCol, $TituloFila, '', $DimVar);
$TituloCol2 = $_Form[0][0];
if( !isset($_THCOLSPAN[0]) && count($_ROWSOP)==0 ){
$_ROWSOP = array();
for($n=0; $n<count($_Form)-1; $n++) $_ROWSOP[$n] = 'C';
$_ROWSOP[count($_Form)-1] = '+';
}
if( $_GRAPH[3]!='' ) $TituloCol2 = $_GRAPH[3];
if( substr_count($TipoGraph,'R')>0 ) $xGraphR = eGraph( 'R', $usuCursor, $_Form, $_ROWSOP, $TituloGraph, $TituloCol2, $TituloFila, '', $DimVar );
if( $_GRAPH[4]!='' ) $TituloCol = $_GRAPH[4];
$TituloLeyenda = ''; if( $_GRAPH[5]!='' ) $TituloLeyenda = trim($_GRAPH[5]);
if( substr_count($TipoGraph,'G')>0 ) $xGraphG = eGraph( 'G', $usuCursor, $_Form, $_COLSOP, $TituloGraph, $TituloCol, $TituloFila, $TituloLeyenda, $DimVar );
$_POST['_GRAPHS'] = '';
if( $xGraphP[2]!='' ) $_POST['_GRAPHS'] .= ','.$xGraphP[2];
if( $xGraphR[2]!='' ) $_POST['_GRAPHS'] .= ','.$xGraphR[2];
if( $xGraphC[2]!='' ) $_POST['_GRAPHS'] .= ','.$xGraphC[2];
if( $xGraphG[2]!='' ) $_POST['_GRAPHS'] .= ','.$xGraphG[2];
if( $_POST['_GRAPHS'][0]==',' ) $_POST['_GRAPHS'] = substr($_POST['_GRAPHS'],1);
}
$_DimCondicion = array();
$sPDF_Ordenacion = '';
$_TITLE = str_replace('<br>', '<BR>', $_TITLE);
$_TITLE = str_replace('&#183;', ' ', $_TITLE);
$_TITLE = str_replace("&#47;", "/", $_TITLE);
$_x1G = $_y1G = $_x2G = $_y2G = 0;
$PDF_ImgMarginRight = 0;
$PDF_MarginLetterHead = 0;
$_NumberLines = false;
$_LineNumber = 0;
$PDF_ShowCondition = true;
foreach($_PDFVAR as $value){
@eval($value);
}
if( isset($PDF_GREENBAR) )  $_GREENBAR = $PDF_GREENBAR;
if( isset($PDF_DataHeight) )  $DataHeight = $PDF_DataHeight;
$PDF_ImgMarginRight *= 1;
$PDF_MarginLetterHead *= 1;
if( isset($PDF_SQL) && $PDF_SQL=='' ) $PDF_SQL = ' ';
if( isset($_VerUserCondiciones) ){
$tmp = call_user_func(trim($_VerUserCondiciones));
for($n=0; $n<count($tmp); $n++){
if( count($tmp[$n])==2 ){
$_DimCondicion[] = $tmp[$n][0].' '.$tmp[$n][1];
}else{
$PDF_TxtCondicion = $tmp[$n][0];
}
}
}else{
$_DimCondicion = PintaCondiciones($_DBADDFILTER);
if( function_exists('eChangeListCondition') ) $_DimCondicion = eChangeListCondition($_DimCondicion);
}
if( isset($_eShowFilter) ){
$_DimCondicion = array();
$tmp = $_eShowFilter;
for($n=0; $n<count($tmp); $n++){
if( count($tmp[$n])==2 ){
$_DimCondicion[] = $tmp[$n][0].' '.$tmp[$n][1];
}else{
$PDF_TxtCondicion = $tmp[$n][0];
}
}
}
if( (isset($_PDFNoCondition) && $_PDFNoCondition) || (isset($PDF_NoCondition) && $PDF_NoCondition) ) $_DimCondicion = array();
$_TITLE = str_replace('<BR>','#BR#',$_TITLE);
if( !$_TITLENOUPPER ) $_TITLE = eStrUpper( strip_tags($_TITLE) );
$_TITLE = str_replace('#BR#','<BR>',$_TITLE);
while( substr_count($_TITLE, '  ')>0 ) $_TITLE = str_replace('  ', ' ', $_TITLE);
$_Summary = ($_POST["_Summary"]=="S");
if( $_Summary ) $_TITLE .= " (resumen)";
if( !isset($PDF_FontSize)  && isset($PDF_AltoLetra) ) $PDF_FontSize = $PDF_AltoLetra;
if( !isset($PDF_Condition) && isset($PDF_Condicion) ) $PDF_Condition = $PDF_Condicion;
if( !isset($PDF_Horientacion)		) $PDF_Horientacion		 = 'V';
if( !isset($PDF_yMargen)			) $PDF_yMargen			 = 30;
if( !isset($PDF_y2Margen)			) $PDF_y2Margen			 = 10;
if( !isset($PDF_xMargen)			) $PDF_xMargen			 = 20;
if( !isset($PDF_xImagen)			) $PDF_xImagen			 = 15;
if( !isset($PDF_yImagen)			) $PDF_yImagen			 = 15;
if( !isset($PDF_Separacion)			) $PDF_Separacion		 = 1;
if( !isset($PDF_UpperCabecera)		) $PDF_UpperCabecera	 = 1;
if( !isset($PDF_FontSize)			) $PDF_FontSize			 = 8.0;
if( !isset($PDF_Imagen)				) $PDF_Imagen			 = '';
if( !isset($PDF_ImagenScale)		) $PDF_ImagenScale		 = 1;
if( !isset($_PDFLIMIT)				) $_PDFLIMIT			 = 0;
if( !isset($PDF_OffsetDescripcion)	) $PDF_OffsetDescripcion = 20;
$PDF_OffsetDescripcionBak = $PDF_OffsetDescripcion;
if( !isset($PDF_OffsetCabecera)		) $PDF_OffsetCabecera	 = 20;
if( !isset($PDF_OffsetPie)			) $PDF_OffsetPie		 = 15;
if( !isset($PDF_AnchoSombra)		) $PDF_AnchoSombra		 = 0.5;
if( !isset($PDF_OffsetSombra)		) $PDF_OffsetSombra		 = $PDF_FontSize/2;
if( trim($PDF_InfoTitulo)==''		) $PDF_InfoTitulo		 = $_TITLE;
if( !isset($PDF_MarginBottom)		) $PDF_MarginBottom		 = 0;
if( !isset($PDF_TxtTitulo)		) $PDF_TxtTitulo		= '      TITULO ';
if( !isset($PDF_TxtOrdenacion)	) $PDF_TxtOrdenacion	= 'ORDENADO POR ';
if( !isset($PDF_Ordenacion)	) $PDF_Ordenacion = $sPDF_Ordenacion;
$PDF_Ordenacion = str_replace('ñ','Ñ',strtoupper($PDF_Ordenacion));
if( !isset($PDF_Titulo)	) $PDF_Titulo = trim($_TITLE);
$PDF_Titulo = EnPlural($PDF_Titulo, 'LISTADO DE #', true);
$PDF_Titulo = str_replace('<BR>','#BR#',$PDF_Titulo);
$PDF_Titulo = _TransformaChr( $PDF_Titulo );
$PDF_Titulo = str_replace('#BR#','<BR>',$PDF_Titulo);
if( !isset($PDF_SubTitulo)		) $PDF_SubTitulo	= '';
if( !isset($PDF_SQL)			) $PDF_SQL			= '';
if( !isset($PDF_TxtSinDatos)	) $PDF_TxtSinDatos	= 'No hay datos...';
if( !isset($PDF_TxtLimite)		) $PDF_TxtLimite	= 'Se ha llegado al límite de la extracción #L# de #R#';
if( !isset($PDF_TxtCabecera)	) $PDF_TxtCabecera	= '';
if( !isset($PDF_TxtFecha)		) $PDF_TxtFecha		= 'Fecha: #F#';
if( !isset($PDF_NumPagina)		) $PDF_NumPagina	= 'D';
if( !isset($PDF_TxtPagina)		) $PDF_TxtPagina	= 'Pág #P#';
if( !isset($PDF_Fecha)			) $PDF_Fecha		= 1;
if( !isset($PDF_ShowHeader)	) $PDF_ShowHeader = false;
if( !isset($PDF_ShowFilter)	) $PDF_ShowFilter = false;
if( !isset($PDF_FontFamily)	) $PDF_FontFamily = 'Courier';
if( !isset($PDF_Grid)		) $PDF_Grid = false;
if( !isset($PDF_LetterHead)	) $PDF_LetterHead = false;
if( isset($PDF_FillCols) ){
if( !isset($usuCursor) ){
$usuCursor = array();
while( $row = NewFila() ) $usuCursor[] = $row;
}
$tmp = explode(',',$PDF_FillCols);
$t = count($tmp);
$DimMaxAncho = array();
for( $n=0; $n<count($usuCursor); $n++ ) $DimMaxAncho[$n] = 0;
for( $n=0; $n<count($usuCursor); $n++ ){
for( $c=0; $c<$t; $c++ ) $DimMaxAncho[$tmp[$c]] = max( $DimMaxAncho[$tmp[$c]], strlen(trim($usuCursor[$n][$tmp[$c]])) );
}
for( $n=0; $n<count($usuCursor); $n++ ){
if( $DimMaxAncho[$n]>0 && ($_Form[$n][3]=='T' || $_Form[$n][3][0]=='S'|| $_Form[$n][3]=='F') ) $_Form[$n][4] = $DimMaxAncho[$n];
}
}
if( isset($_PDFBREAKPAGE) ){
if( is_string($_PDFBREAKPAGE) ){
$_PDFBREAKPAGE = explode(',',str_replace(' ','',str_replace('+',',',$_PDFBREAKPAGE)));
}
}
if( isset($PDF_Condition) ){
if( is_array($PDF_Condition) ){
if( count($PDF_Condition)>0 ) $_DimCondicion = $PDF_Condition;
}else if( is_string($PDF_Condition) ){
if( $PDF_Condition!='' ) $_DimCondicion = array($PDF_Condition);
}
}
$PDF_TxtCondicion = $__Lng[count($_DimCondicion)<=1 ? 78:43];
if( $_TextOverride['condition']<>'' ){
$PDF_TxtCondicion = $_TextOverride['condition'];
if( $PDF_TxtCondicion=='-' ) $PDF_TxtCondicion = '';
}
$Long = max(strlen(trim($PDF_TxtTitulo)), strlen(trim($PDF_TxtOrdenacion)), strlen(trim($PDF_TxtCondicion)));
if( $PDF_TxtTitulo<>''		) $PDF_TxtTitulo		= str_pad($PDF_TxtTitulo	, $Long, " ", STR_PAD_LEFT).' ';
if( $PDF_TxtOrdenacion<>''	) $PDF_TxtOrdenacion	= str_pad($PDF_TxtOrdenacion, $Long, " ", STR_PAD_LEFT).' ';
if( $PDF_TxtCondicion<>''	) $PDF_TxtCondicion		= str_pad($PDF_TxtCondicion	, $Long, " ", STR_PAD_LEFT).' ';
for($n=1; $n<=9; $n++){
for($i=0; $i<count($_PDFTH); $i++){
$_PDFTH[$i] = str_replace('<br>', '#BR#', $_PDFTH[$i]);
$_PDFTH[$i] = str_replace('<BR>', '#BR#', $_PDFTH[$i]);
$_PDFTH[$i] = str_replace('&#'.(48+$n).';', $n, strip_tags($_PDFTH[$i]));
$_PDFTH[$i] = str_replace('#BR#','<BR>', $_PDFTH[$i]);
}
}
if( count($_DimCondicion)>0 ){
for($n=0; $n<count($_DimCondicion); $n++){
$_DimCondicion[$n] = _TransformaChr($_DimCondicion[$n]);
}
}
if( $_NotInTemporary<>"" ) $_DimCondicion = array();
$PDF_TxtTitulo = trim(strip_tags($PDF_TxtTitulo));
$PDF_TxtOrdenacion = trim(strip_tags($PDF_TxtOrdenacion));
$PDF_TxtCondicion = trim(strip_tags($PDF_TxtCondicion));
$PDF_TxtCondicion = eAsciiToCode($PDF_TxtCondicion, false);
$PDF_TxtCondicion = str_replace('&#92;','\\', $PDF_TxtCondicion);
$PDF_TxtCondicion = str_replace('&#43;', '+', $PDF_TxtCondicion);
$PDF_TxtCondicion = str_replace('&#39;', "'", $PDF_TxtCondicion);
$LenMax = max(strlen($PDF_TxtTitulo), strlen($PDF_TxtOrdenacion), strlen($PDF_TxtCondicion));
$PDF_TxtTitulo		= str_pad($PDF_TxtTitulo	, $LenMax, ' ', STR_PAD_LEFT).' ';
$PDF_TxtOrdenacion	= str_pad($PDF_TxtOrdenacion, $LenMax, ' ', STR_PAD_LEFT).' ';
$PDF_TxtCondicion	= str_pad($PDF_TxtCondicion	, $LenMax, ' ', STR_PAD_LEFT).' ';
$PDF_ColStyle = array();
if( isset($PDF_ShadowRows) ){
$tmp = explode(',',$PDF_ShadowRows);
$PDF_ShadowRows = array();
$tmp2 = explode(',',$PDF_ColorRows);
$PDF_ColorRows = array();
for($n=0; $n<count($tmp); $n++ ){
$i = ($tmp[$n]*1)-1;
$PDF_ShadowRows[$i] = 1;
$PDF_ColorRows[$i] = trim($tmp2[$n]);
}
}else{
$PDF_ShadowRows = array();
}
if( isset($PDF_LineRows) ){
$tmp = explode(',',$PDF_LineRows);
$PDF_LineRows = array();
for($n=0; $n<count($tmp); $n++) $PDF_LineRows[($tmp[$n]*1)] = 1;
}else{
$PDF_LineRows = array();
}
$PDF_Colors = true;
if( !isset($PDF_Colors) ) $PDF_Colors = false;
if( isset($BW) && $BW==1 ) $PDF_Colors = false;
$_Color = array();
ColoresEnPDF();
if( $_COLSNOREPEATFILL ) $_Color['TD']['COLORFILL'] = eColorTone($_Color['TD']['COLOR'], "","", -75);
global $_User, $p, $row, $nPag, $y;
$ConSubTotales = false;
$_InfSinTotales = true;
$_BreakPage = array();
$Visible = array();
$_yUltimaLinea = $y;
$_yPrimeraLinea = $y;
$_HeaderLine = array(-1, -1, -1);
$PDF_ImgX1 = 0;
$PDF_ImgY1 = 0;
$PDF_ImgX2 = 0;
$PDF_ImgY2 = 0;
list(,$conView) = explode('&VIEW=', $_DownloadPDF);
if( count($_ROWSOP)>0 ){
$_Form[] = $_ROWSOPFORM;
}
$_ChartMin = null; $_ChartMax = null; $_ChartLong = null;
if( count($_CHARTCOL)>0 && $PDF_ChartCol ){
if( $_CHARTCOL[2]=="" ) $_CHARTCOL[2] = "Gráfica";
$n = $_CHARTCOL[0]+1;
$_Form[$n] = explode("|", str_replace(" ", "", $_CHARTCOL[2]." | # | chart | T | 30 | | M | | |"));
$_PDFCOL[$n] = 30;
$_ALIGN[$n] = "l";
$Visible[$n] = 1;
$_ChartMin = $usuCursor[0][$_CHARTCOL[0]];
$_ChartMax = $usuCursor[0][$_CHARTCOL[0]];
for($n=0; $n<count($usuCursor); $n++){
$_ChartMin = min($usuCursor[$n][$_CHARTCOL[0]], $_ChartMin);
$_ChartMax = max($usuCursor[$n][$_CHARTCOL[0]], $_ChartMax);
}
$_ChartMin = ($_ChartMin<0) ? abs($_ChartMin) : 0;
if( $_ChartMax<0 ) $_ChartMax = 0;
$_ChartLong = $_ChartMin+$_ChartMax;
}
$_MasColPrimera = 0;
for($n=0; $n<count($_Form); $n++){
if( isset($_VIEW) && $conView!="" ){
if( substr_count($_Form[$n][6], $conView)==0  ){
$_Form[$n][6] = "*";
$_PDFCOL[$n] = 0;
}
}
if( substr($_Form[$n][0],0,6)=='&nbsp;' ) $_Form[$n][0] = substr($_Form[$n][0],6);
if( isset($_PDFBREAKPAGE) ){
for($i=0; $i<count($_PDFBREAKPAGE); $i++){
if( $_Form[$n][1]==str_replace('&nbsp;',' ',$_PDFBREAKPAGE[$i]) ){
$_BreakPage[] = $n;
break;
}
}
}
$_ALIGN[$n] = strtolower($_ALIGN[$n]);
$_ALIGN[$n] = trim(str_replace('id=','',$_ALIGN[$n]));
$_Form[$n][0] = str_replace(array("<BR>","<br>"), array("\n","\n"), $_Form[$n][0]);
$_Form[$n][0] = strip_tags($_Form[$n][0]);
$_Form[$n][0] = str_replace("\n", "<BR>", $_Form[$n][0]);
$Visible[$n] = (substr_count($_Form[$n][6],'*')==0 && substr_count($_Form[$n][6],'L')==0 );
if( !$Visible[$n] && $_PDFCOL[$n]>0 ) $Visible[$n] = true;
if( strtoupper($_PDFCOL[$n])=='XLS'  ) $_PDFCOL[$n] = '0';
if( strtoupper($_FORMAT[$n])=='IMG'  ) $_PDFCOL[$n] = '0';
if( strtoupper($_FORMAT[$n])=='ICON' ) $_PDFCOL[$n] = '0';
if( $_PDFCOL[$n]==='0' ) $Visible[$n] = false;
$_ALIGN[$n] = trim(str_replace('id=','',$_ALIGN[$n]));
if( $_COLSOP[$n]=='S' ){
$Visible[$n] = false;
$ConSubTotales = true;
$_MasColPrimera += 2;
}
if( $_Form[$n][4]==0 || $_Form[$n][3]=="H" ) $Visible[$n] = false;
if( substr_count('+C#', $_COLSOP[$n])>0 ){
$_InfSinTotales = false;
}
if( $_PDFCOLSSHADE[$n]!='' && $_PDFCOLSSHADE[$n][0]!='#' ){
$_PDFCOLSSHADE[$n] = $_PDFCOLSSHADE[$n] * 1;
if( $_PDFCOLSSHADE[$n]<=0 || $_PDFCOLSSHADE[$n]>=100 ){
$_PDFCOLSSHADE[$n] = '';
}else{
$_PDFCOLSSHADE[$n] = 1-($_PDFCOLSSHADE[$n]/100);
}
}else if( $_PDFCOLSSHADE[$n][0]=='#' && !$PDF_Colors ){
$_PDFCOLSSHADE[$n] = RGBToGray($_PDFCOLSSHADE[$n]);
}
if( $_PDFCOLBORDER[$n]=='' ){
$_PDFCOLBORDER[$n] = 0.1;
$PDF_ColStyle[$n] = '';
}else{
$_PDFCOLBORDER[$n] = str_replace('  ',' ', $_PDFCOLBORDER[$n]);
$tmp = explode(' ', $_PDFCOLBORDER[$n]);
$_PDFCOLBORDER[$n] = (($tmp[0]=='') ? 0.1 : (double)$tmp[0]);
$PDF_ColStyle[$n] = $tmp[1];
}
if( strtoupper($_Form[$n][3])=='C' ){
$_ADDOPTION[$_Form[$n][1]] = true;
if( $_LISTCHECKBOX['P']=='' ){
$_SelVirtual[$_Form[$n][1]]['S'] = $_CheckBox['P']['ON'];
$_SelVirtual[$_Form[$n][1]]['']  = $_CheckBox['P']['OFF'];
}else{
$_SelVirtual[$_Form[$n][1]]['S'] = strip_tags($_LISTCHECKBOX['P'][0]);
$_SelVirtual[$_Form[$n][1]]['']  = strip_tags($_LISTCHECKBOX['P'][1]);
}
}
}
$_PDFWRAPCOL = array();
if( $_PDFWRAP[0]>0 ) for($n=0; $n<count($_Form); $n++) $_PDFWRAPCOL[$n] = true;
if( isset($_PDFWRAPFIELDS) ){
for( $n=0; $n<count($_Form); $n++ ){
$_PDFWRAPCOL[$n] = false;
for( $i=0; $i<count($_PDFWRAPFIELDS); $i++ ){
if( $_PDFWRAPFIELDS[$i]==$_Form[$n][1] ){
$_PDFWRAPCOL[$n] = true;
break;
}
}
}
}
if( !$ConSubTotales ) $_InfSinTotales = false;
if( $ConSubTotales ){
$_OpDeGrupo = false;
for( $n=$_TGrupos; $n<count($_Form); $n++ ) if( $_COLSOP[$n] != '' && $_COLSOP[$n] != '%' && $_COLSOP[$n] != 'L' ) $_OpDeGrupo = true;
if( !$_OpDeGrupo ) $ConSubTotales = false;
}
$i = $n;
for( $n=$i; $n<$i+1; $n++ ){
if( $_PDFCOLBORDER[$n]=='' ){
$_PDFCOLBORDER[$n] = 0.1;
$PDF_ColStyle[$n] = '';
}else{
$_PDFCOLBORDER[$n] = str_replace('  ',' ', $_PDFCOLBORDER[$n]);
$tmp = explode(' ', $_PDFCOLBORDER[$n]);
$_PDFCOLBORDER[$n] = (($tmp[0]=='') ? 0.1 : (double)$tmp[0]);
$PDF_ColStyle[$n] = $tmp[1];
}
}
if( $PDF_Horientacion=='V' ){
$HojaAncho	= 595.0;
$HojaAlto	= 842.0;
}else{
$HojaAncho	= 842.0;
$HojaAlto	= 595.0;
}
if( isset($PDF_Width)  ) $HojaAncho = $PDF_Width;
if( isset($PDF_Height) ) $HojaAlto  = $PDF_Height;
$PDF_Width = $HojaAncho;
$PDF_Height = $HojaAlto;
$SaltoLinea		= 1.5;
$FontSizeTH		= $PDF_FontSize;
$FontFamilyTH	= $PDF_FontFamily.'-Bold';
$UltimaLinea	= 0;
$FontPuntos		= ($PDF_FontSize*600/1000);
$Separador		= str_repeat(' ', $PDF_Separacion);
$MargenHoja		= $PDF_xMargen;
$MargenDerecho	= 0;
$AltoLineas		= 0;
$AnchoTotal		= 0;
$_NumReg		= 0;
$y				= $HojaAlto;
$SePintoPie		= true;
$InicioY		= 0;
$nPag			= 1;
$Calcular		= true;
$Indice			= -1;
$Titulos		= array();
$yTitulos		= array();
$xTitulos		= array();
$_AnchoPt		= array();
$_AnchoCol		= array();
$_AnchoCOL		= array();
$_AnchoColSpan	= array();
$_ConColSpan	= array();
$_UltimoDato	= array();
$_SinTerminar	= false;
$_AltoTH		= 0;
$_xPDFWRAP		= array();
$_MaxPDFWRAP	= 1;
$_UltimaFila	= array();
$_RowSpan		= array();
$THVisible	= array();
$THTitulos	= array();
$TH_AnchoPt	= array();
$TH_AnchoCol= array();
$THxTitulos	= array();
$THyTitulos	= array();
$TH_xPDFWRAP= array();
$THAltoLineas = 0;
$_AlignCabecera = array();
$_GrisCabecera = array(0.8, 0.9, 0.95, 0.95);
$_GrisSubTotal = array(0.8, 0.9, 0.95, 0.95);
$_PDFSHEET = array(0,0,0,0);
$_SepGrupoUno = 0.5;
if( isset($_PDFAlignCabecera) ) $_AlignCabecera = $_PDFAlignCabecera;
if( isset($_PDFGrisCabecera ) ) $_GrisCabecera  = $_PDFGrisCabecera;
if( isset($_PDFGrisSubTotal ) ) $_GrisSubTotal  = $_PDFGrisSubTotal;
if( isset($_PDFSepGrupoUno  ) ) $_SepGrupoUno   = $_PDFSepGrupoUno;
if( !isset($_PDFADDMARGENTOP) ) $_PDFADDMARGENTOP = 0;
$PDF_InfoTitulo = preg_replace('/&nbsp;/i', ' ', $PDF_InfoTitulo);
if( substr_count($PDF_InfoTitulo, '<')>0 ){
$PDF_InfoTitulo = preg_replace('/<BR>/i', ' ', $PDF_InfoTitulo);
$PDF_InfoTitulo = str_replace( '  ', ' ', $PDF_InfoTitulo);
$PDF_InfoTitulo = strip_tags($PDF_InfoTitulo);
}
for($n=0; $n<count($_TextGrupo); $n++) $_TextGrupo[$n] = preg_replace('/&nbsp;/i', ' ', $_TextGrupo[$n]);
foreach($_PDFINCLUDE as $k=>$v){
if( $_PDFINCLUDE[$k]!='' ){
$tmpFile = GrabaTmp('l_pdfinclude_'.$k, 'function PDFInclude'.$k.'($handle, $dw=NULL, $dh=NULL, &$page=NULL, $header_line=NULL, $BreakPage=NULL, $LineHeight=NULL){'."\n".'global $lx, $ly;'."\n".$_PDFINCLUDE[$k]."}\n", $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_PDFINCLUDE[$k] = '#';
}
}
$oNomFile = '/_tmp/pdf/lst_'.$_User.'.pdf';
if( $_FILEPDF!='' ){
$oNomFile = '/_tmp/pdf/lst_'.$_User.'_file_'.$_FILEPDF.'.pdf';
}
if( PHP_OS=='WINNT' ){
$NomFile = str_replace( '/http/edes.php', '', $_SERVER['SCRIPT_FILENAME'] ).$oNomFile;
}else{
$NomFile = eScript($oNomFile);
}
if( file_exists($NomFile) ) unlink($NomFile);
$ConTOTALSROWS = ($_TOTALSROWS && count($_COLSOP)==0);
$_PaginaAbierta = false;
$_SePintoPie = false;
function PDFBeginPage( $p, $HojaAncho, $HojaAlto ){
$p->startPage();
$GLOBALS['_PaginaAbierta'] = true;
$_SePintoPie = false;
}
function PDFEndPage( $p ){
$p->endPage();
$GLOBALS['_PaginaAbierta'] = false;
}
$p = new TCPDF((($PDF_Horientacion=='V')?'P':'L'), 'pt', 'A4', false, 'ISO-8859-1', false);
$p->SetDisplayMode( 'fullpage', 'continuous' );
$p->setPrintHeader(false);
$p->setPrintFooter(false);
$p->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
$p->SetAutoPageBreak(false, PDF_MARGIN_BOTTOM);
$optlist = '';
if( $_POST['_doc_password_']<>'' ) $optlist = 'userpassword='.$_POST['_doc_password_'].' ';
if( $PDF_InfoTitulo[0]=='=' ) $PDF_InfoTitulo = trim(substr($PDF_InfoTitulo,1));
if( $PDF_InfoTitulo=='' ) $PDF_InfoTitulo = ' ';
if( $_eDesTitle=='' ) $_eDesTitle = ' ';
$p->SetTitle($PDF_InfoTitulo);
$p->SetAuthor($_SESSION["ApplicationName"]." ");
$p->SetKeywords('eDes');
$p->SetCreator($_eDesTitle);
$_UsuarioDelPDF = $_SESSION["_UserName"];
$uBreakPage = null;
if( $_PDFINCLUDE['M']!='' ){
PDFIncludeM( $p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas'] );
}
if( $_PDFGraphicsOnly ){
$SePintoPie = true;
$_NumReg = 1;
}
if( $_BrowseInTemporary!="" ){
$_FileDownload = fopen($_BrowseInTemporary.'.dat', 'r');
}else{
$_FileDownload = "";
}
while( !$_PDFGraphicsOnly && $row=NewFila() ){
$_vF = &$row;
foreach($_pCol as $k=>$v){
$_vF[$k] = &$_vF[$v];
}
if( isset($_DBREADROW) ) if( !call_user_func($_DBREADROW, $row) ) continue;
if( count($_BreakPage)>0 ){
$aBreakPage = ''; for($i=0; $i<count($_BreakPage); $i++) $aBreakPage .= $row[$_BreakPage[$i]].'|';
if( $uBreakPage!=null && $uBreakPage!=$aBreakPage ){
if( $_NumReg==$TotalReg ){
if( $ConSubTotales ){
for($n=$TotalCol-1; $n>=0; $n--){
if( $_COLSOP[$n]=='S' ) Fin(true, true, $n);
}
}
Fin(false);
FootTitle();
if( $ConTOTALSROWS ){
$ConTOTALSROWS = false;
$incr = ($AltoLineas*1)-($ascender/2);
if( $PDF_Colors ){
eSetTextColor( $p, $_Color['TOTALS']['BACKGROUND'], 'fill' );
eSetTextColor( $p, $_Color['TOTALS']['COLOR'], 'text' );
SetFuente('TOTALS');
}else{
eSetTextGris(0.90);
}
eRect($PDF_xMargen, getY($sy-($ascender/2),($AltoLineas*1)), $MargenDerecho, ($AltoLineas*1));
foreach($_UltimaFila as $k=>$v) ePDF_ShowXY($p, $v[0], $v[1], $v[2]);
eLine(
$PDF_xMargen,
getY($sy+($incr)),
$PDF_xMargen+$MargenDerecho,
getY($sy+($incr))
);
}
}
Fin( true );
Pie( $_SinTerminar );
PDFEndPage( $p );
$nPag++;
$SePintoPie = true;
$y = $HojaAlto;
}
$uBreakPage = $aBreakPage;
}
if( $_FORMATPHP!='' ){
$_PDFColor = NULL; $_PDFBackgroundColor = NULL; $_PDFLineRows = NULL; $_PDFRowShadow = false;
_ExeFormato($row, $_CellsStyle, $_CellsClass, $RowNumber, $_RowStyle, $_RowClass, $_RowDisabled, $_RowAdd, $_CellsAdd, $_PDFColor, $_PDFBackgroundColor, $_PDFLineRows, $_PDFRowShadow, $_pCol, $_pF);
}
if( $Calcular ){
$TotalCol = count($row);
for($n=0; $n<count($row); $n++) $_UltimoDato[$n] = $row[$n];
$PDF_xMargen = ($HojaAncho-CalculaTitulos($row, $AnchoTotal))/2;
if( $PDF_xMargen<0 ){
if( $PDF_Horientacion=='V' ){
$PDF_Horientacion = 'H';
$HojaAncho = 842.0;
$HojaAlto  = 595.0;
if( isset($PDF_Width)  ) $HojaAncho = $PDF_Height;
if( isset($PDF_Height) ) $HojaAlto  = $PDF_Width;
$y = $HojaAlto;
$p->setPageOrientation('L');
}
}
if( count($_CHARTCOL)>0 ){
$_PDFCOL[$_CHARTCOL[0]+1] = (int)($_CHARTCOL[1]/$PDF_FontSize);
}
$Calcular = false;
}
if( $y>=($HojaAlto-10) ){
$snPag = $nPag;
if( $nPag==1 && $_PDFINCLUDE['S']!='' ){
PDFBeginPage( $p, $HojaAncho, $HojaAlto );
PDFFuente($PDF_FontFamily, $PDF_FontSize);
$p->SetLineWidth(0.1);
PDFIncludeS($p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas']);
PDFEndPage($p);
}
PDFBeginPage($p, $HojaAncho, $HojaAlto);
PDFFuente($PDF_FontFamily, $PDF_FontSize);
$p->SetLineWidth(0.1);
$y = 0;
if( $snPag==1 ){
PDFCalcSizeFont($PDF_FontSize);
$AltoLineas = ($ascender+($descender*-1))*$SaltoLinea;
$EntreLineas = $AltoLineas-($ascender+($descender*-1));
$UltimaLinea = $PDF_y2Margen+$AltoLineas+$PDF_OffsetPie;
Membrete_($PDF_Imagen, $nPag);
$PDF_xMargen = ($HojaAncho-CalculaTitulos($row, $AnchoTotal))/2;
if( count($_THCOLSPAN)>0 ){
$sPDF_xMargen = $PDF_xMargen;
$PDF_xMargen = ($HojaAncho-CalculaTitulosTH($row, $AnchoTotal))/2;
$PDF_xMargen = min($sPDF_xMargen, $PDF_xMargen);
}
if( $PDF_xMargen<0 ) $PDF_xMargen = 1;
}else{
if( $PDF_ShowHeader || $PDF_LetterHead ){
$PDF_OffsetDescripcion = 20;
if( $PDF_LetterHead ) $PDF_OffsetDescripcion = 15;
$PDF_OffsetDescripcionBak = $PDF_OffsetDescripcion;
Membrete_($PDF_Imagen, $nPag);
}
}
if( $y==0 ){
$y = ($HojaAlto-$PDF_yMargen);
if( $_PDFADDMARGENTOP>0 ) $y -= $_PDFADDMARGENTOP;
}else{
$y -= $PDF_OffsetCabecera;
}
if( count($_THCOLSPAN)>0 ){
$OldVisible    = $Visible;
$OldTitulos    = $Titulos;
$Old_AnchoPt   = $_AnchoPt;
$Old_AnchoCol  = $_AnchoCol;
$OldxTitulos   = $xTitulos;
$OldyTitulos   = $yTitulos;
$Old_xPDFWRAP  = $_xPDFWRAP;
$OldAltoLineas = $AltoLineas;
$Visible	= $THVisible;
$Titulos	= $THTitulos;
$_AnchoPt	= $TH_AnchoPt;
$_AnchoCol	= $TH_AnchoCol;
$xTitulos	= $THxTitulos;
$yTitulos	= $THyTitulos;
$_xPDFWRAP	= $TH_xPDFWRAP;
$AltoLineas	= $THAltoLineas;
Cabecera(-1, $nPag);
$Visible    = $OldVisible;
$Titulos    = $OldTitulos;
$_AnchoPt   = $Old_AnchoPt;
$_AnchoCol  = $Old_AnchoCol;
$xTitulos   = $OldxTitulos;
$yTitulos   = $OldyTitulos;
$_xPDFWRAP  = $Old_xPDFWRAP;
$AltoLineas = $OldAltoLineas;
}
Cabecera($nPag, $nPag);
if( $nPag==1 && ($ConSubTotales || $_InfSinTotales) ){
for($n=0; $n<count($row); $n++){
if( $_COLSOP[$n]=='S' ){
$Celda = $row[$n];
if( $ConSubTotales || $_InfSinTotales ){
if( $n==0 ) $incr = ( ($FontPuntos * $PDF_Separacion ) / 2 );
if( $PDF_Colors ){
eSetTextColor( $p, $_Color['GROUPHEADER_'.($n+1)]['BACKGROUND'], 'fill' );
eSetTextColor( $p, $_Color['GROUPHEADER_'.($n+1)]['COLOR'], 'text' );
}else{
eSetTextColor($p, $_GrisCabecera[$n], 'fill');
if( $n==0 ) $y -= $_SepGrupoUno;
}
eRect( $PDF_xMargen, getY($y-($ascender/2),($AltoLineas*1)), $MargenDerecho, ($AltoLineas*1), 'DF' );
if( $PDF_Colors ){
eSetTextColor( $p, $_Color['GROUPHEADER_'.($n+1)]['COLOR'], 'fill' );
}
if( $PDF_Colors ) SetFuente('GROUPHEADER_'.($n+1));
if( $_ADDOPTION[$_Form[$n][1]]!='' ) $Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
$Celda = trim(strip_tags($Celda));
if( $_COLSOPPREFIX[$n]<>'' ) $Celda = $_COLSOPPREFIX[$n].' '.$Celda;
$Celda = str_repeat(' ',$n*2).$Celda;
if( !$PDF_Colors && count($_AlignCabecera)>0 ){
switch( $_AlignCabecera[$n] ){
case 'R':
ePDF_ShowXY($p, str_pad($Celda,$AnchoTotal-$n*2,' ',STR_PAD_LEFT), (double)($PDF_xMargen+$incr), (double)$y);
break;
case 'C':
ePDF_ShowXY($p, str_pad($Celda,$AnchoTotal-$n*2,' ',STR_PAD_BOTH), (double)($PDF_xMargen+$incr), (double)$y);
break;
default:
ePDF_ShowXY($p, substr($Celda,0,$AnchoTotal), (double)($PDF_xMargen+$incr), (double)$y );
}
}else{
switch( $_Color['GROUPHEADER_'.($n+1)]['TEXT-ALIGN'] ){
case 'RIGHT':
ePDF_ShowXY($p, str_pad($Celda,$AnchoTotal-$n*2,' ',STR_PAD_LEFT), (double)($PDF_xMargen+$incr), (double)$y);
break;
case 'CENTER':
ePDF_ShowXY($p, str_pad($Celda,$AnchoTotal-$n*2,' ',STR_PAD_BOTH), (double)($PDF_xMargen+$incr), (double)$y);
break;
default:
ePDF_ShowXY($p, substr($Celda,0,$AnchoTotal), (double)($PDF_xMargen+$incr), (double)$y);
}
}
SetFuente('NORMAL');
for($i=0; $i<count($row); $i++) $_RowSpan[$i+1][] = $y;
$y -= ($AltoLineas*1);
}
}
}
}
}
$sy = $y;
Fila($row);
for($n=0; $n<count($row); $n++) $_UltimoDato[$n] = $row[$n];
$_NumReg++;
$SaltoObligado = false;
if( $y<$PDF_LastAfterMarginBottom ) if( (($TotalReg-$_NumReg)*$AltoLineas) < ($y+$UltimaLinea ) ) $SaltoObligado = true;
$SePintoPie = false;
if( $y<$UltimaLinea || $SaltoObligado || (isset($PDF_MarginBottom) && $y<$PDF_MarginBottom) ){
if( $_NumReg==$TotalReg ){
if( $ConSubTotales ){
for($n=$TotalCol-1; $n>=0; $n--){
if( $_COLSOP[$n]=='S' ) Fin(true, true, $n);
}
}
Fin(false);
FootTitle();
if( $ConTOTALSROWS ){
$ConTOTALSROWS = false;
$incr = ($AltoLineas*1)-($ascender/2);
if( $PDF_Colors ){
eSetTextColor( $p, $_Color['TOTALS']['BACKGROUND'], 'fill' );
eSetTextColor( $p, $_Color['TOTALS']['COLOR'], 'text' );
SetFuente('TOTALS');
}else{
eSetTextGris(0.90);
}
eRect($PDF_xMargen, getY($sy-($ascender/2),($AltoLineas*1)), $MargenDerecho, ($AltoLineas*1), 'DF');
foreach($_UltimaFila as $k=>$v) ePDF_ShowXY($p, $v[0], $v[1], $v[2]);
eLine(
$PDF_xMargen,
getY($sy+($incr)),
$PDF_xMargen+$MargenDerecho,
getY($sy+($incr))
);
}
}
if( count($_BreakPage) > 0 && isset($usuCursor) ){
if( count($usuCursor) > ($Indice+1) ){
$row2 = $usuCursor[$Indice+1];
$aBreakPage = ''; for( $i=0; $i<count($_BreakPage); $i++ ) $aBreakPage .= $row2[$_BreakPage[$i]].'|';
if( $uBreakPage!=null && $uBreakPage!=$aBreakPage ) Fin( true );
}
}
Pie( $_SinTerminar );
PDFEndPage( $p );
$nPag++;
$uBreakPage = null;
$SePintoPie = true;
$y = $HojaAlto;
}
if( $_NumReg==$_PDFLIMIT ){
$PDF_TxtLimite = str_replace('#L#', $_PDFLIMIT, $PDF_TxtLimite);
$PDF_TxtLimite = str_replace('#R#', $TotalReg , $PDF_TxtLimite);
ePDF_ShowXY($p, $PDF_TxtLimite, ($HojaAncho-(strlen($PDF_TxtLimite)*$FontPuntos))/2, $y-$AltoLineas);
break;
}
for($n=0; $n<count($row); $n++) $_OldValGrupo[$n] = $row[$n];
}
if( $_BrowseInTemporary!="" ){
fclose($_FileDownload);
}
if( !$SePintoPie && $ConSubTotales ){
for($n=$TotalCol-1; $n>=0; $n--){
if( $_COLSOP[$n]=='S' ) Fin(true, true, $n);
}
}
if( $ConTOTALSROWS ){
$incr = ($AltoLineas*1)-($ascender/2);
if( $PDF_Colors ){
eSetTextColor($p, $_Color['TOTALS']['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['TOTALS']['COLOR'], 'text');
SetFuente('TOTALS');
}else{
eSetTextGris(0.90);
}
eRect($PDF_xMargen, getY($sy-($ascender/2),($AltoLineas*1)), $MargenDerecho, ($AltoLineas*1), 'DF');
foreach($_UltimaFila as $k=>$v) ePDF_ShowXY($p, $v[0], $v[1], $v[2]);
eLine(
$PDF_xMargen,
getY($sy+($incr)),
$PDF_xMargen+$MargenDerecho,
getY($sy+($incr))
);
}
$_FinalListado = $y - $AltoLineas;
$_FootTextHeight = 0;
if( $_FOOTTITLE!='' ){
if( substr($_FOOTTITLE,-1)!=';' ) $_FOOTTITLE .= ';';
if( substr($_FOOTTITLE,0,5)=='echo ' ){
$txt = @eval(str_replace('echo ','return ',$_FOOTTITLE));
}else{
$txt = @eval('return '.$_FOOTTITLE);
}
$txt = str_replace('<br>', '<BR>', $txt);
$txt = CambiaCHR( $txt );
$_TxtFOOTTITLE = $txt;
$Dim = explode('<BR>', $txt);
$_FootTextHeight = ($ascender/2) + $AltoLineas*(count($Dim)+1) + ($ascender/2);
}
if( !$SePintoPie ){
Fin( false );
FootTitle();
Pie();
}
if( $_POST['_GRAPHS']!='' ){
if( !$GLOBALS['_PaginaAbierta'] ) NuevaPagina();
if( $_PDFGraphicsOnly ){
$_yUltimaLinea -= 15;
$_yPrimeraLinea -= 15;
}
$cx1 = 10;
$cx2 = $HojaAncho-10;
$cy0 = $_yPrimeraLinea-$AltoLineas;
$cy1 = $_yUltimaLinea-$AltoLineas;
$cy2 = $PDF_y2Margen+$AltoLineas+$incr;
$cy  = ($cy0==$cy1) ? $cy0 : $cy1;
$cAncho = $cx2-$cx1;
$cAncho0= $cAncho;
$cAlto0 = $cy0-$cy2;
$cAlto1 = $cy1-$cy2;
$cAlto  = $cAlto1;
define( 'gAncho'  , 0 );
define( 'gAlto'	  , 1 );
define( 'gX'	  , 2 );
define( 'gY'	  , 3 );
define( 'gNewPag' , 4 );
define( 'gFile'   , 5 );
define( 'gZoom'   , 6 );
define( 'gFila'   , 7 );
define( 'gColumna', 8 );
$_TronGraph = false;
if($_TronGraph){eTron('',false,true);eTron('_GRAPHS: '.$_POST['_GRAPHS']);}
$Zoom = 0.65;
$DimGraph = explode(',',$_POST['_GRAPHS']);
$DimGraphAA = array();
for( $n=0; $n<count($DimGraph); $n++ ){
$Imagen = "/_tmp/php/{$_User}_".$DimGraph[$n].'.png';
if( PHP_OS=='WINNT' ){
$Imagen = str_replace( '/http/edes.php', '', $_SERVER['SCRIPT_FILENAME'] ).$Imagen;
}else{
$Imagen = eScript($Imagen);
}
if( file_exists($Imagen) ){
list($w,$h) = getimagesize( $Imagen );
$sZoom = $Zoom;
if( $w*$Zoom > ($HojaAncho-20) ) $sZoom = ($HojaAncho-20)/$w;
$DimGraphAA[] = array( $w*$sZoom, $h*$sZoom, 0, 0, false, $Imagen, $sZoom, -1, -1 );
if($_TronGraph) eTron('Imagen: '.$Imagen );
}
}
if( $_TronGraph ){
eTron('Ancho Hoja: '.$cAncho0);
eTron('Alto Hoja: '.$cAlto0);
}
$uDesde = -1;
$TotalGraph = count($DimGraphAA);
for( $n=0; $n<$TotalGraph; $n++ ){
if($_TronGraph)eTron('Calcula: '.$n);
$Desde = $n;
$ok = -1;
$TAncho = 0;
$MaxAlto = 0;
for( $a=$Desde; $a<$TotalGraph; $a++ ){
$TAncho += $DimGraphAA[$a][gAncho];
$MaxAlto = max( $MaxAlto, $DimGraphAA[$a][gAlto] );
if($_TronGraph)eTron( 'MaxAlto='.$MaxAlto.' <= cAlto='.$cAlto.' && TAncho='.$TAncho.' <= cAncho='.$cAncho);
if( $MaxAlto <= $cAlto && $TAncho <= $cAncho ) $ok = $a;
}
if( $ok==-1 ){
if( $uDesde == $Desde ) continue;
$DimGraphAA[$n][gNewPag] = true;
if($_TronGraph)eTron('Nueva Pag para: '.$n);
$cy = $cy0;
$cAlto = $cAlto0;
$cAncho = $cAncho0;
$n--;
$uDesde = $Desde;
continue;
}else{
if($_TronGraph)eTron($Desde.' -> '.$ok);
$TAncho = 0;
$MaxAlto = 0;
$GraficaPorFila = 0;
for( $a=$Desde; $a<=$ok; $a++ ){
$TAncho += $DimGraphAA[$a][gAncho];
$MaxAlto = max( $MaxAlto, $DimGraphAA[$a][gAlto] );
$GraficaPorFila++;
}
$m = ($cAncho-$TAncho)/($GraficaPorFila+1);
$tx = $cx1;
for( $i=$Desde; $i<=$ok; $i++ ){
$DimGraphAA[$i][gX] = $tx + $m;
if($_TronGraph)eTron('Calcula x de '.$i.': '.$DimGraphAA[$i][gX]);
$tx = $DimGraphAA[$i][gAncho] + $DimGraphAA[$i][gX];
$DimGraphAA[$i][gY] = $cy - $DimGraphAA[$i][gAlto];
}
$cy -= $MaxAlto+10;
$cAlto -= $MaxAlto;
$n = $ok;
$uDesde = $Desde;
continue;
}
}
$SeUsoNewPag = false;
$OldNewPag = false;
$Pasar = true;
for( $ni=0; $ni<count($DimGraphAA); $ni++ ){
$Imagen = $DimGraphAA[$ni][gFile];
$Zoom = $DimGraphAA[$ni][gZoom];
$xImg = $DimGraphAA[$ni][gX];
$yImg = $DimGraphAA[$ni][gY];
$NewPagina = $DimGraphAA[$ni][gNewPag];
if($_TronGraph)eTron('NºGraf: '.$ni.'  '.$Imagen.' x:'.$xImg.' y:'.$yImg.'  NewPag: '.(($NewPagina)?'SI':'NO'));
if( $NewPagina ){
if($_TronGraph)eTron(1);
if( $GLOBALS['_PaginaAbierta'] ){
if($_TronGraph)eTron(2);
PDFEndPage( $p );
}
$SeUsoNewPag = true;
if($_TronGraph)eTron(3);
$nPag++;
NuevaPagina();
if( $_PDFGraphicsOnly ){
$_yUltimaLinea -= 15;
$_yPrimeraLinea -= 15;
}
if($_TronGraph)eTron(4);
}
if($_TronGraph)eTron('Grafica Ini: '.$ni);
list($sw,$sh) = getimagesize( $Imagen );
$p->Image( $Imagen, $xImg, getY($yImg, $sh*$Zoom), $sw*$Zoom, $sh*$Zoom, 'PNG' );
if($_TronGraph)eTron('Grafica Fin: '.$ni);
}
if( $SeUsoNewPag ){
if($_TronGraph)eTron('PDFEndPage: Ini');
PDFEndPage( $p );
if($_TronGraph)eTron('PDFEndPage: Fin');
}
if($_TronGraph)eTron('SALIR');
}
if( $_CHARTGRID!='' ){
$PDF_Imagen = "/_tmp/php/{$_User}.png";
if( PHP_OS=='WINNT' ){
$PDF_Imagen = str_replace( '/http/edes.php', '', $_SERVER['SCRIPT_FILENAME'] ).$PDF_Imagen;
}else{
$PDF_Imagen = eScript($PDF_Imagen);
}
if( file_exists($PDF_Imagen) ){
list($w,$h) = getimagesize( $PDF_Imagen );
$sw = $w;
$sh = $h;
$Zoom = 0.8;
$w *= $Zoom;
$h *= $Zoom;
if( $w > $HojaAncho ){
$w = $sw;
$h = $sh;
$Alto = $h*($HojaAncho/$w);
$Zoom = $HojaAncho/$w;
$xImg = 2;
$yImg = $_FinalListado-$Alto;
$ZoomRec = 1;
}else{
$Alto = $h;
$Ancho = $w;
$xImg = ($HojaAncho-$w)/2;
$yImg = $_FinalListado-$Alto;
$ZoomRec = 1.25;
}
$yImg += $_FootTextHeight;
$NewPagina = $PDF_y2Margen > $yImg;
if( $yImg * 2 > $yImg ){
$yImg -= $PDF_yMargen;
}else{
$yImg = $yImg/2;
}
if( $NewPagina ){
$yImg = $HojaAlto-$PDF_yMargen-$Alto;
Fin( false );
FootTitle();
Pie();
PDFEndPage( $p );
$nPag++;
$SePintoPie = true;
PDFBeginPage( $p, $HojaAncho, $HojaAlto );
$y = 0;
$p->SetLineWidth(0.1);
PDFFuente($PDF_FontFamily, $PDF_FontSize);
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
}
list($sw,$sh) = getimagesize( $PDF_Imagen );
$p->Image( $PDF_Imagen, $xImg, getY($yImg, $sh*$Zoom), $sw*$Zoom, $sh*$Zoom, 'PNG' );
if( $NewPagina ){
if( $x >= 0 ) ePDF_ShowXY( $p, $txt, $x, $PDF_y2Margen );
PDFEndPage( $p );
}
}
}
if( $GLOBALS['_PaginaAbierta'] ) PDFEndPage($p);
if( $_NumReg==0 ){
PDFBeginPage($p, $HojaAncho, $HojaAlto);
PDFFuente($PDF_FontFamily, $PDF_FontSize);
ePDF_ShowXY( $p, $PDF_TxtSinDatos, $MargenHoja, $HojaAlto - $PDF_yMargen );
PDFEndPage($p);
}
if( $_PDFINCLUDE['E']!='' ){
PDFBeginPage($p, $HojaAncho, $HojaAlto);
PDFFuente($PDF_FontFamily, $PDF_FontSize);
$p->SetLineWidth(0.1);
eResetColor($p);
PDFIncludeE($p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas']);
PDFEndPage($p);
}
$oNomFile = '/_tmp/pdf/lst_'.$_User.'.pdf';
$p->Output('..'.$oNomFile,'F');
if( $_PDFINCLUDE['EF']!='' ){
}
if( $_BackgroundReport ){
_DownloadEnd(eScript($oNomFile), eScript($_DownloadPath).$_CdGsExpFile.'.zip');
eEnd();
}
if( $_ToPDF===true ){
eInit();
echo "<a href='edes.php?D:{$oNomFile}' style='display:none'>Descargar PDF</a>";
echo '<script>setTimeout(function(){top.S("A",window).eventFire("click");},250);</script>';
eEnd();
}
if( isset($_PDFPrint) ){
?>
<HTML><HEAD><LINK REL='stylesheet' HREF='<?=$_SESSION['_PathCSS']?>/lista.css' TYPE='text/css'></HEAD>
<BODY onload='PDF.printAll();PDF.style.display="block";'>
<BR><OBJECT ID="PDF" width=100% height=100% CLASSID="CLSID:CA8A9780-280D-11CF-A24D-444553540000" style='display:none'>
<PARAM NAME="SRC" VALUE="edes.php?D:<?= $oNomFile ?>#nocache">
</OBJECT>
</BODY></HTML>
<?PHP
eEnd();
}
$NomFile = $oNomFile;
$_TReg = $_NumReg;
$Extension = "PDF";
include_once($Dir_.'downloadfile.inc');
eEnd();
function FootTitle(){
global $y, $ascender, $_FOOTTITLE, $_TxtFOOTTITLE, $p, $PDF_xMargen, $incr, $TotalReg;
global $nPag, $_PDFINCLUDE, $HojaAncho, $HojaAlto, $AltoLineas, $PDF_yMargen, $PDF_Colors, $_Color;
$FootNewPag = false;
if( $_TxtFOOTTITLE!="" ){
$txt = $_TxtFOOTTITLE;
$Dim = explode('<BR>', $txt);
$Mas = ($ascender/2);
for( $n=0; $n<count($Dim); $n++ ) $Mas += ($AltoLineas*1);
if( ($y-$Mas)<$PDF_yMargen ){
global $SePintoPie, $PDF_FontFamily, $font, $PDF_FontSize, $PDF_TxtPagina, $PDF_NumPagina, $MargenHoja, $FontPuntos, $PDF_y2Margen;
Pie();
PDFEndPage( $p );
$FootNewPag = true;
$nPag++;
$SePintoPie = true;
PDFBeginPage( $p, $HojaAncho, $HojaAlto );
$p->SetLineWidth( 0.1 );
PDFFuente( $PDF_FontFamily, $PDF_FontSize );
Membrete_( '', $nPag );
$txt = str_replace('#P#', $nPag, $PDF_TxtPagina);
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
if( $x>=0 ) ePDF_ShowXY( $p, $txt, $x, $PDF_y2Margen );
$y = $HojaAlto - $PDF_yMargen - $PDF_FontSize*2;
}
}
if( $_PDFINCLUDE['LB']!='' ) PDFIncludeLB($p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas']);
if( $_TxtFOOTTITLE!="" ){
$y -= ($ascender/2);
if( $PDF_Colors ) eSetTextColor($p, $_Color['FOOTTITLE']['COLOR'], 'text');
else eSetTextGris(0.75);
$txt = $_TxtFOOTTITLE;
$Dim = explode('<BR>', $txt);
$sy = $y;
$Mas = 0;
for($n=0; $n<count($Dim); $n++){
$txt = str_replace('&nbsp;', ' ', strip_tags($Dim[$n]));
ePDF_ShowXY($p, $txt, $PDF_xMargen+$incr, $sy);
$sy -= ($AltoLineas*1);
$Mas -= ($AltoLineas*1);
}
$y += ($ascender/2);
if( $Mas!=0 ) $Mas -= ($ascender/2);
}
global $lx, $ly;
$lx = $PDF_xMargen+$incr;
$ly = $y + $Mas;
$GLOBALS['_yUltimaLinea'] = $ly;
if( $_PDFINCLUDE['LA'] != '' ) PDFIncludeLA($p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas']);
return $FootNewPag;
}
function NewFila(){
global $usuCursor, $Indice, $_FileDownload;
if( $_FileDownload!="" ){
$txt = fgets($_FileDownload);
if( $txt===false ) return false;
return explode("|", rtrim($txt));
}else if( !isset($usuCursor) ){
return qRow();
}else{
$Indice++;
return $usuCursor[$Indice];
}
}
function Membrete_($PDF_Imagen, $nPag){
global $PDF_FontFamily, $PDF_FontSize;
global $p, $y, $MargenHoja, $HojaAncho, $HojaAlto, $FontPuntos, $PDF_yMargen, $_HeaderLine, $AnchoTotal;
global $FontFamilyTH, $FontSizeTH, $PDF_Ordenacion, $PDF_TxtOrdenacion, $PDF_LetterHead, $PDF_xMargen;
global $PDF_xImagen, $PDF_yImagen, $PDF_Fecha, $PDF_TxtCabecera, $PDF_TxtFecha, $PDF_CdScript, $PDF_ShowCondition;
global $PDF_TxtCondicion, $_DimCondicion, $PDF_OffsetDescripcion, $AltoLineas, $_DocLabelUserTo, $_DocLabelUserFrom, $PDF_y2Margen;
global $PDF_TxtTitulo, $PDF_Titulo, $PDF_SubTitulo, $PDF_Colors, $_Color, $PDF_ShowFilter, $PDF_ImagenScale, $PDF_ImgMarginRight, $PDF_MarginLetterHead;
$Ancho = 0;
$Alto = 0;
if( $PDF_Imagen!='' ){
$Extension = str_replace('jpg','jpeg', substr($PDF_Imagen, strpos($PDF_Imagen,'.')+1));
if( PHP_OS=='WINNT' ){
$PDF_Imagen = str_replace('/http/edes.php', '', $_SERVER['SCRIPT_FILENAME']).$PDF_Imagen;
}else{
$PDF_Imagen = eScript($PDF_Imagen);
}
list($Ancho, $Alto) = getimagesize($PDF_Imagen);
$Ancho *= $PDF_ImagenScale;
$Alto *= $PDF_ImagenScale;
$yImg = getY($HojaAlto-$PDF_yImagen);
$p->Image($PDF_Imagen, $PDF_xImagen, $yImg, $Ancho, $Alto, $Extension);
$GLOBALS["PDF_ImgX1"] = $PDF_xImagen/2.834;
$GLOBALS["PDF_ImgY1"] = ($yImg)/2.834;
$GLOBALS["PDF_ImgX2"] = ($PDF_xImagen+$Alto)/2.834;
$GLOBALS["PDF_ImgY2"] = ($yImg+$Alto)/2.834;
if( $MargenHoja<($PDF_yImagen+$Ancho) ){
$Ancho = ($PDF_yImagen+$Ancho) - $MargenHoja+5;
}else{
$Ancho = 0;
}
}
$y = $HojaAlto - $PDF_yMargen;
if( $PDF_TxtCabecera!='' ){
if( $PDF_Colors ) eSetTextColor($p, $_Color['COMPANY']['COLOR'], 'text');
else eSetTextGris(0.75);
ePDF_ShowXY($p, $PDF_TxtCabecera, $Ancho+$MargenHoja, $y);
}
if( $PDF_Fecha ){
while( substr_count($PDF_TxtFecha, '#')>1 ){
$tmp = trim(substr($PDF_TxtFecha, strpos($PDF_TxtFecha, '#')+1));
$tmp = trim(substr($tmp, 0, strpos($tmp, '#')));
if( $tmp=='F' || $tmp == 'D'){
$PDF_TxtFecha = str_replace('#'.$tmp.'#', date('d-m-Y'), $PDF_TxtFecha);
}else if( $tmp=='H' ){
$PDF_TxtFecha = str_replace('#'.$tmp.'#', date('H:i:s'), $PDF_TxtFecha);
}else if( $tmp=='CDI' ){
$PDF_TxtFecha = str_replace('#'.$tmp.'#', date('Y-m-d H:i:s'), $PDF_TxtFecha);
}else if( substr_count($tmp,'(' )>0 ){
$PDF_TxtFecha = str_replace('#'.$tmp.'#', @eval("return(".$tmp.");"), $PDF_TxtFecha);
}
}
if( $PDF_Colors ) eSetTextColor($p, $_Color['DATE']['COLOR'], 'text');
else eSetTextGris(0.75);
ePDF_ShowXY($p, $PDF_TxtFecha, $HojaAncho-$MargenHoja-(strlen($PDF_TxtFecha)*$FontPuntos), $y);
if( $PDF_CdScript ){
eSetTextColor( $p, $_Color['CDSCRIPT']['COLOR'], 'text' );
$txt = _CodigoScript();
ePDF_ShowXY( $p, $txt, $HojaAncho-$MargenHoja-(strlen($txt)*$FontPuntos), $y-$AltoLineas+($AltoLineas/4) );
}
}
if( $_DocLabelUserTo<>'' || $_DocLabelUserFrom<>'' ){
if( $_DocLabelUserTo<>'' && $_DocLabelUserFrom<>'' ){
$_DocLabelUserTo = ePDF_ReplaceChr($_DocLabelUserTo);
$_DocLabelUserFrom = ePDF_ReplaceChr($_DocLabelUserFrom);
$Long = max(strlen($_DocLabelUserTo),strlen($_DocLabelUserFrom));
$_DocLabelUserTo = str_pad($_DocLabelUserTo,$Long,' ',STR_PAD_LEFT);
$_DocLabelUserFrom = str_pad($_DocLabelUserFrom	 ,$Long,' ',STR_PAD_LEFT);
}
eSetTextColor( $p, $_Color['SHOWRECIPIENT']['COLOR'], 'text' );
if( $_POST['_doc_to_']=='' ){
ePDF_ShowXY( $p, ePDF_ReplaceChr($_POST['_doc_from_']), 10, $PDF_y2Margen );
}else{
if( trim($_DocLabelUserFrom)<>'' ) ePDF_ShowXY( $p, ePDF_ReplaceChr($_DocLabelUserFrom.': '.$GLOBALS['_UsuarioDelPDF']), 10, $PDF_y2Margen+((trim($_DocLabelUserTo)<>'') ? $AltoLineas : 0 ) );
if( trim($_DocLabelUserTo)<>'' ) ePDF_ShowXY( $p, ePDF_ReplaceChr($_DocLabelUserTo.': '.$_POST['_doc_to_']), 10, $PDF_y2Margen );
}
}
$GLOBALS['_yUltimaLinea'] = $y;
$y -= 2;
if( $PDF_TxtCabecera!='' ){
if( $PDF_Colors ) eSetTextColor( $p, $_Color['HR']['COLOR'], 'text' );
else eSetTextGris(0.75);
$_HeaderLine = array( $Ancho+$MargenHoja, $y, $HojaAncho-$MargenHoja );
eLine(
$Ancho+$MargenHoja,
getY($y),
$HojaAncho-$MargenHoja,
getY($y)
);
$GLOBALS['_yUltimaLinea'] = $y;
}
if( !$PDF_ShowFilter && $nPag>1 && !$PDF_LetterHead ) return;
$cx = 1;
$cy = -0.5;
PDFFuente('Courier', $PDF_FontSize);
if( trim($PDF_Titulo)!="" && trim($PDF_TxtTitulo)!="" ){
$y -= $PDF_OffsetDescripcion;
$PDF_OffsetDescripcion = 0;
$sx = $Ancho+$MargenHoja;
if( $PDF_Colors ) eSetTextColor($p, $_Color['TITLE_TEXT']['COLOR'], 'text');
else eSetTextGris(0.75);
ePDF_ShowXY($p, $PDF_TxtTitulo, $sx, $y);
$sx += strlen($PDF_TxtTitulo)*$FontPuntos;
$GLOBALS['_yUltimaLinea'] = $y;
PDFFuente('Courier-bold', $PDF_FontSize);
if( count(explode('<BR>',$PDF_Titulo))==1 ){
$tmp = explode(' ',$PDF_Titulo);
$PDF_Titulo = $tmp[0];
$txt = $tmp[0];
for($i=1; $i<count($tmp); $i++){
if( ($HojaAncho-$MargenHoja-$sx-$PDF_ImgMarginRight-$p->GetStringWidth($txt." ".$tmp[$i]))<=0 ){
$PDF_Titulo .= "<BR>".$tmp[$i];
$txt = $tmp[$i];
}else{
$PDF_Titulo .= " ".$tmp[$i];
$txt .= " ".$tmp[$i];
}
}
}
$tmp = explode('<BR>',$PDF_Titulo);
for($i=0; $i<count($tmp); $i++){
if( $PDF_Colors ) eSetTextColor($p, $_Color['CIRCLE']['COLOR'], 'fill');
else eSetTextGris(0.75);
if( $i==0 ) $p->Circle($sx+$cx, getY($y+$FontPuntos/2)+$cy, 1.5, 0, 360, 'F');
if( $PDF_Colors ) eSetTextColor( $p, $_Color['TITLE_VALUE']['COLOR'], 'text' );
ePDF_ShowXY( $p, trim($tmp[$i]), $sx+(1*$FontPuntos), $y );
$GLOBALS['_yUltimaLinea'] = $y;
$y -= $AltoLineas;
}
}
if( $PDF_SubTitulo!='' ){
$y -= $PDF_OffsetDescripcion;
$PDF_OffsetDescripcion = 0;
$sx = $Ancho+$MargenHoja;
$sx += strlen($PDF_TxtTitulo)*$FontPuntos;
PDFFuente('Courier-bold', $PDF_FontSize);
if( $PDF_Colors ) eSetTextColor($p, $_Color['CIRCLE']['COLOR'], 'fill');
else eSetTextGris(0.75);
$p->Circle($sx+$cx, getY($y+$FontPuntos/2)+$cy, 1.5, 0, 360, 'F');
if( $PDF_Colors ) eSetTextColor( $p, $_Color['TITLE_VALUE']['COLOR'], 'text' );
ePDF_ShowXY($p, trim($tmp[$i]), $sx+(1*$FontPuntos), $y);
ePDF_ShowXY($p, $PDF_SubTitulo, $sx+(1*$FontPuntos), $y);
$GLOBALS['_yUltimaLinea'] = $y;
$y -= $AltoLineas;
}
PDFFuente('Courier', $PDF_FontSize);
if( $PDF_Ordenacion!='' ){
$y -= $PDF_OffsetDescripcion;
$PDF_OffsetDescripcion = 0;
$sx = $Ancho+$MargenHoja;
if( $PDF_Colors ) eSetTextColor( $p, $_Color['ORDER_TEXT']['COLOR'], 'text' );
else eSetTextGris(0.75);
ePDF_ShowXY( $p, $PDF_TxtOrdenacion, $sx, $y );
$sx += strlen($PDF_TxtOrdenacion)*$FontPuntos;
if( $PDF_Colors ) eSetTextColor( $p, $_Color['CIRCLE']['COLOR'], 'fill' );
$p->Circle($sx+$cx, getY($y+$FontPuntos/2)+$cy, 1.5, 0, 360, 'F');
if( $PDF_Colors ) eSetTextColor( $p, $_Color['ORDER_VALUE']['COLOR'], 'text' );
else eSetTextGris(0.75);
PDFFuente( 'Courier-Bold', $FontSizeTH );
ePDF_ShowXY($p, $PDF_Ordenacion, $sx+(1*$FontPuntos), $y);
$GLOBALS['_yUltimaLinea'] = $y;
$y -= $AltoLineas;
}
PDFFuente('Courier', $PDF_FontSize);
if( count($_DimCondicion)>0 && $PDF_ShowCondition ){
$y -= $PDF_OffsetDescripcion;
$sx = $Ancho+$MargenHoja;
if( $PDF_TxtCondicion!='' ){
if( $PDF_Colors ) eSetTextColor( $p, $_Color['CONDITION_TEXT']['COLOR'], 'text' );
else eSetTextGris(0.75);
ePDF_ShowXY($p, $PDF_TxtCondicion, $sx, $y);
}
$sx += strlen($PDF_TxtCondicion)*$FontPuntos;
PDFFuente('Courier-Bold', $PDF_FontSize);
for($n=0; $n<count($_DimCondicion); $n++){
if( trim($_DimCondicion[$n])=="" ) continue;
$_DimCondicion[$n] = eStripTags($_DimCondicion[$n], true);
if( $PDF_Colors ) eSetTextColor( $p, $_Color['CIRCLE']['COLOR'], 'fill' );
else eSetTextGris(0.75);
$p->Circle($sx+$cx, getY($y+$FontPuntos/2)+$cy, 1.5, 0, 360, 'F');
if( $PDF_Colors ) eSetTextColor( $p, $_Color['CONDITION_VALUE']['COLOR'], 'text' );
else eSetTextGris(0.75);
if( ($sx+(1*$FontPuntos)+strlen($_DimCondicion[$n])*$FontPuntos)>($HojaAncho-$MargenHoja-$PDF_ImgMarginRight) ){
$AnchoLibre = ($HojaAncho-$MargenHoja-$PDF_ImgMarginRight) - ($sx+(1*$FontPuntos));
$AnchoLibre = $AnchoLibre / $FontPuntos;
$Dim = explode("\n",wordwrap($_DimCondicion[$n], $AnchoLibre, "\n"));
for($ii=0; $ii<count($Dim); $ii++){
if( $ii>0 ) $y -= $AltoLineas;
ePDF_ShowXY($p, $Dim[$ii], $sx+(1*$FontPuntos), $y, $PDF_FontSize);
}
}else{
ePDF_ShowXY($p, $_DimCondicion[$n], $sx+(1*$FontPuntos), $y, $PDF_FontSize);
}
$GLOBALS['_yUltimaLinea'] = $y;
$y -= $AltoLineas;
}
}
$GLOBALS['_yPrimeraLinea'] = $GLOBALS['_yUltimaLinea'];
if( $PDF_Colors ) eSetTextColor( $p, $_Color['TD']['COLOR'], 'text' );
else eSetTextGris(0.75);
if( $PDF_MarginLetterHead>0 && $y>($HojaAlto-$PDF_MarginLetterHead) ) $y = $HojaAlto-$PDF_MarginLetterHead;
}
function Cabecera($nPag, $PagReal=-1){
global $PDF_FontFamily, $PDF_FontSize;
global $p, $PDF_xMargen, $PDF_OffsetCabecera, $_RowSpan, $_Color, $PDF_Colors, $_THCOLSPAN, $_PDFINCLUDE;
global $y, $HojaAlto, $PDF_yMargen, $AltoLineas, $Separador, $FontPuntos, $_PDFCOLBORDER;
global $Titulos, $xTitulos, $yTitulos, $InicioY, $_AnchoPt, $ascender, $FontFamilyTH, $FontSizeTH, $_AltoTH;
if( (count($_THCOLSPAN)>0 && $nPag==-1 && $PagReal==1) || (count($_THCOLSPAN)==0 && $nPag==1) ){
if( $_PDFINCLUDE['FH']!='' ) PDFIncludeFH($p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas']);
}
if( (count($_THCOLSPAN)>0 && $nPag==-1) || (count($_THCOLSPAN)==0 && $nPag!=-1) ){
if( $_PDFINCLUDE['EH']!='' ) PDFIncludeEH($p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas']);
}
$_RowSpan = array();
$MinY = $y;
$InicioY = $y;
$incr = 0;
for($n=0; $n<count($Titulos); $n++){
$incr += $_AnchoPt[$n];
$sy = $y+$yTitulos[$n];
for($i=0; $i<count($Titulos[$n]); $i++){
$sy -= $AltoLineas;
if( $MinY>$sy ) $MinY = $sy;
}
}
if( $PDF_Colors ){
eSetTextColor($p, $_Color['TH']['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['TABLE']['BACKGROUND'], 'draw');
}else{
eSetFillColor(0.75);
}
$NuevaY = $y+$AltoLineas-($ascender/2) + $MinY-$y-($ascender/2);
eRect($PDF_xMargen, getY($y+$AltoLineas-($ascender/2), $MinY-$y-($ascender/2)), $incr, $MinY-$y-($ascender/2), 'DF');
if( count($_THCOLSPAN)>0 ){
if( $nPag==-1 ){
global $PDF_AnchoSombra;
if( $PDF_Colors ){
eSetTextColor($p, $_Color['TABLE']['BACKGROUND'], 'draw');
}else{
eSetTextGris(1);
}
$incr = 0;
$tLineas = count($_AnchoPt);
if( $_PDFCOLBORDER[0]!=0 ){
$p->SetLineWidth( $_PDFCOLBORDER[0] );
eLine(
$PDF_xMargen+$incr,
getY($y+$AltoLineas-($ascender/2)),
$PDF_xMargen+$incr,
getY($y+$AltoLineas-($ascender/2)+($MinY-$y-($ascender/2)))
);
}
for($n=0; $n<$tLineas; $n++){
$incr += $_AnchoPt[$n];
if( $_AnchoPt[$n]>0 && $_PDFCOLBORDER[$n+1]!=0 ){
$p->SetLineWidth($_PDFCOLBORDER[$n+1]);
eLine(
$PDF_xMargen+$incr,
getY($y+$AltoLineas-($ascender/2)),
$PDF_xMargen+$incr,
getY($y+$AltoLineas-($ascender/2)+($MinY-$y-($ascender/2)))
);
}
$p->SetLineWidth(0.1);
}
$p->SetLineWidth(0.1);
if( $PDF_AnchoSombra>0 && $_PDFCOLBORDER[$n]!=0 ){
eLine(
$PDF_xMargen+$incr+$PDF_AnchoSombra,
getY($InicioY+$Des-$PDF_OffsetSombra),
$PDF_xMargen+$incr+$PDF_AnchoSombra,
getY($y+$Des-$PDF_AnchoSombra+($MinY-$y-($ascender/2)))
);
}
}else{
global $_ConColSpan;
if( $PDF_Colors ){
eSetTextColor($p, $_Color['TH']['BACKGROUND'], 'draw');
}else{
eSetTextColor($p, 0.75, 'draw');
}
$incr = 0;
$tLineas = count($_AnchoPt);
$p->SetLineWidth(0.2);
for($n=0; $n<$tLineas; $n++){
$incr += $_AnchoPt[$n];
if( $_AnchoPt[$n]>0 && $_PDFCOLBORDER[$n+1]!=0 && !$_ConColSpan[$n] ){
eLine(
$PDF_xMargen+$incr,
getY($y+$AltoLineas-($ascender/2)),
$PDF_xMargen+$incr-$_AnchoPt[$n],
getY($y+$AltoLineas-($ascender/2)), array(256*0.75)
);
}
}
$p->SetDrawColor(0);
}
}
$_AltoTH = $MinY-$y-($ascender/2);
if( $PDF_Colors ) eSetTextColor($p, $_Color['TH']['COLOR'], 'text');
else eSetTextGris(1);
PDFFuente($FontFamilyTH, $FontSizeTH);
$incr = 0;
for($n=0; $n<count($Titulos); $n++){
$incr += $_AnchoPt[$n];
$sy = $y+$yTitulos[$n];
for($i=0; $i<count($Titulos[$n]); $i++){
$Celda = $Titulos[$n][$i];
ePDF_ShowXY($p, $Celda, $PDF_xMargen+$xTitulos[$n][$i], $sy, $FontSizeTH);
$sy -= $AltoLineas;
if( $MinY>$sy ) $MinY = $sy;
}
}
$y = $MinY - $ascender + ($ascender/2);
PDFFuente('Courier', $PDF_FontSize);
if( $PDF_Colors ) eSetTextColor($p, $_Color['TD']['COLOR'], 'text');
else eSetTextGris(0.75);
return;
}
function iNuevaPagina(){
global $p, $nPag;
Pie();
PDFEndPage( $p );
$nPag++;
NuevaPagina( false );
Cabecera( $nPag );
}
function CuentaLineasTextarea( $row ){
global $Visible, $_ADDOPTION, $_SelVirtual, $_Form, $_CHECKLIST, $_RADIOLIST, $_RADIO, $_SELECTMULTIPLE;
global $_PDFWRAP, $_AnchoCol, $_PDFWRAPCOL, $_SelVirtualType, $_NOZERO, $_NOZEROFORMATTOTALS;
$MultiLinea = array();
$ConPDFWrap = 1;
for($n=0; $n<count($row); $n++){
if( !$Visible[$n] ) continue;
$Celda = $row[$n];
if( !empty($_ADDOPTION[$_Form[$n][1]]) ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}else{
$Celda = trim($row[$n]);
if( $_Form[$n][3]=='H' ){
$Celda = strip_tags(str_replace('<BR>',"\n",$Celda));
$Celda = str_replace('&#39;' ,"'",$Celda);
$Celda = str_replace('&quot;','"',$Celda);
}else if( $_Form[$n][2]=='#' ){
$Celda = urldecode( $Celda );
$Celda = str_replace('&#43;','+',$Celda);
$Celda = str_replace('&#92;','\\',$Celda);
}else if( $_Form[$n][2]=='o' ){
if( $Celda!='' ){
if( isset($_CHECKLIST[ $_Form[$n][1] ]) ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]!='' ){
$tmp = explode(',',$Celda);
$Celda = '';
for( $i=1; $i<count($tmp)-1; $i++ ){
if( $i>1 ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]=='NOWRAP' ) $Celda .= ', ';
else if( $_CHECKLIST[ $_Form[$n][1] ][2]=='WRAP' ) $Celda .= '<br>';
}
$Celda .= $_SelVirtual[$_Form[$n][1]][$tmp[$i]];
}
}
}else if( isset($_RADIOLIST[ $_Form[$n][1] ]) ){
if( $_RADIOLIST[ $_Form[$n][1] ][2]!='' ){
if( $_RADIOLIST[ $_Form[$n][1] ][2]=='' ){
}else if( $_RADIOLIST[ $_Form[$n][1] ][2]=='TEXT' ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}else if( $_RADIOLIST[ $_Form[$n][1] ][2]=='ALL' ){
$Celda .= '·'.$_SelVirtual[$_Form[$n][1]][$Celda];
}
}
}
}
}else if( $_SELECTMULTIPLE[ $_Form[$n][1] ] > 0 && $Celda!='' ){
if( $_SelVirtualType[ $_Form[$n][1] ] != 'T' ){
$tmp = explode(',',$Celda);
$Celda = '';
for( $i=1; $i<count($tmp)-1; $i++ ){
if( $i>1 ) $Celda .= '<br>';
$Celda .= $_SelVirtual[$_Form[$n][1]][$tmp[$i]];
}
}else $Celda = substr($Celda,1,-1);
}
if( $_HayRadio ){
if( count( $_RADIO[ $_Form[$n][1] ] ) > 0 ){
$Celda = $_RADIO[ $_Form[$n][1] ][ $Celda ];
}
}
}
if( $_Form[$n][3]!='H' ) $Celda = ePDF_ReplaceChr($Celda);
if( ($_Form[$n][2]=='F4' && isZero($Celda)) || ($_Form[$n][2]=='CDI' && isZero($Celda)) ){
$Celda = '';
}else{
if( $_FORMAT[$n]!="" ){
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ){
$Formato = '$Celda = "";';
}else{
$Formato = '$Celda = '.str_replace('#', $Celda, $_FORMAT[$n]).';';
}
}else{
$Formato = '$Celda = '.str_replace('#', $Celda, $_FORMAT[$n]).';';
}
if( substr($Formato,-3)=='();' ){
$Celda = call_user_func(substr($Formato,9,-3), $n, $Celda);
}else{
if( $Formato=='$'."Celda = eNumberFormat(#,2)" ){
$Celda = eNumberFormat($Celda,2);
}else if( $Formato=='$'."Celda = eNumberFormat(#,0)" ){
$Celda = eNumberFormat($Celda);
}else if( $Formato=='$Celda = "";' ){
$Celda = '';
}else{
@eval($Formato);
}
}
}else{
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ) $Celda = '';
}
}
}
$Celda = str_replace('&amp;' ,'&',$Celda);
$Celda = str_replace('&quot;','"',$Celda);
$Celda = str_replace('&nbsp;',' ',$Celda);
if( ($_PDFWRAP[0]>1 && strlen($Celda)>$_AnchoCol[$n] && $_PDFWRAPCOL[$n]) || $_Form[$n][3]=='H' || $_SELECTMULTIPLE[ $_Form[$n][1] ]>0 ){
if( !$_PDFWRAP[1] ){
$Celda = str_replace("\n",' ',$Celda);
$Celda = str_replace("\r",' ',$Celda);
}
$Celda = preg_replace( '/&nbsp;/i', ' ', $Celda );
$Celda = preg_replace( '/<br>/i', "\n", $Celda );
$NewTxt = explode( "\n", wordwrap( chop($Celda), $_AnchoCol[$n], "\n", 1 ) );
for($i=0; $i<count($NewTxt); $i++){
$NewTxt[$i] = trim($NewTxt[$i]);
if( $NewTxt[$i]!='' ) $MultiLinea[$n][] = $NewTxt[$i];
}
$Celda = $MultiLinea[$n][0];
if( $ConPDFWrap<count($MultiLinea[$n]) ) $ConPDFWrap = count($MultiLinea[$n]);
if( $_PDFWRAP[0]<count($MultiLinea[$n]) ){
$MultiLinea[$n][$_PDFWRAP[0]-1] = substr( $MultiLinea[$n][$_PDFWRAP[0]-1], 0, $_AnchoCol[$n]-3 ).'...';
}
}
$MaxAlto = max(count($MultiLinea[$n]),$MaxAlto);
}
return array($MaxAlto, $ConPDFWrap);
}
function Fila($row){
global $p, $y, $PDF_Separacion, $Separador, $FontPuntos, $AltoLineas, $PDF_xMargen, $MargenDerecho, $_GrisCabecera, $_SepGrupoUno;
global $Visible, $_Form, $_ADDOPTION, $_SelVirtual, $_HayRadio, $_RADIO, $_FORMAT, $_ALIGN, $_PDFCOLSSHADE, $_OpRegMedia;
global $_AnchoCol, $_COLSOP, $_OpCol, $_OpSubCol, $_UltimoDato, $_AnchoPt, $_TGrupos, $AnchoTotal, $_AlignCabecera;
global $ascender, $descender, $ConSubTotales, $_InfSinTotales, $_GREENBAR, $PDF_Grid, $PDF_ShadowRows, $PDF_LineRows, $_NumReg;
global $_PDFWRAP, $_MaxPDFWRAP, $_xPDFWRAP, $_NOZERO, $_NOZEROFORMATTOTALS,	$_UltimaFila, $_RowSpan, $_Color, $PDF_Colors, $PDF_FontSize, $_PDFWRAPCOL;
global $_OldValGrupo, $_FORMATPHP, $_FORMATTOTALSPHP, $_RADIOLIST, $_CHECKLIST, $_SELECTMULTIPLE, $PDF_ColorRows, $_SelVirtualType;
global $_COLSNOREPEAT, $_COLSBAK, $_COLSNOREPEATFILL, $_SummaryGroupTitle, $_SummaryNoHeaders, $_COLSOPPREFIX, $UltimaLinea, $DataHeight;
global $_ROWSOP, $_OpLin, $_OpLinCol, $_exeROWSOPCALC, $_NumberLines, $_LineNumber;
global $_PDFBackgroundColor, $_PDFColor, $_PDFLineRows, $_PDFRowShadow, $_Summary, $_CHARTCOL, $_ChartMin, $_ChartMax, $_ChartLong, $_PDFCOL;
$sy = $y;
$MaxAlto = 1;
if( $_PDFWRAP[0]>1 ){
list( $MaxAlto, $ConPDFWrap ) = CuentaLineasTextarea( $row );
if( ($y-$AltoLineas*min($MaxAlto,$ConPDFWrap)) < $UltimaLinea ){
iNuevaPagina();
}
}
$Ancho = 0;
if( !$ConSubTotales && !$_InfSinTotales ){
if( $_NumberLines ){
$_LineNumber++;
eSetTextColor($p, "#bbbbbb", 'text');
ePDF_ShowXY($p, $_LineNumber, 3, (double)$y);
eSetTextColor($p, $_Color['TD']['COLOR'], 'text');
}
for($n=0; $n<count($row); $n++){
if( $_COLSOP[$n]=='L' ){
$incr = $ascender-$descender;
if( $_Form[$n][2]=='#' ){
$row[$n] = urldecode($row[$n]);
$row[$n] = str_replace('&#43;','+',$row[$n]);
$row[$n] = str_replace('&#92;','\\',$row[$n]);
}else if( $_Form[$n][3]=='H' ){
$row[$n] = str_replace('&#39;' ,"'",$row[$n]);
$row[$n] = str_replace('&quot;','"',$row[$n]);
}
$Celda = $row[$n];
$Old = ''; $New = '';
for($i=$n; $i>=0; $i--){
$Old .= $_UltimoDato[$n];
$New .= $row[$n];
}
if( $Old!=$New ){
if( $ConSubTotales ){
Fin(true);
}else{
if( $PDF_Colors ){
eSetTextColor($p, $_Color['TABLE']['BACKGROUND'], 'draw');
}else{
eSetTextGris(0.97);
}
$y += 0.1*5;
eLine(
$PDF_xMargen,
getY($y+$incr),
$PDF_xMargen+$MargenDerecho,
getY($y+$incr)
);
$y += $descender;
$y += 0.1*5;
}
}
$_UltimoDato[$n] = $Celda;
break;
}
}
}else{
for($n=count($row)-1; $n>=0; $n--){
if( $_COLSOP[$n]=='S' ){
$incr = $ascender-$descender;
$Celda = $row[$n];
$Old = ''; $New = '';
for($i=$n; $i>=0; $i--){
$Old .= $_UltimoDato[$i];
$New .= $row[$i];
}
if( $Old!=$New && !$_InfSinTotales ){
if( $ConSubTotales ){
Fin(true, true, $n);
}else{
eLine(
$PDF_xMargen,
getY($y+$incr),
$PDF_xMargen+$MargenDerecho,
getY($y+$incr)
);
$y += $descender;
}
}
}
}
for($n=0; $n<count($row); $n++){
if( $_COLSOP[$n]=='S' ){
$incr = $ascender-$descender;
$Celda = $row[$n];
$Old = ''; $New = '';
for($i=$n; $i>=0; $i--){
$Old .= $_UltimoDato[$i];
$New .= $row[$i];
}
if( $Old!=$New ){
for($i=$n+1; $i<count($_UltimoDato); $i++) $_UltimoDato[$i]=null;
if( $ConSubTotales || $_InfSinTotales ){
if( $PDF_Colors ){
eSetTextColor($p, $_Color['GROUPHEADER_'.($n+1)]['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['GROUPHEADER_'.($n+1)]['COLOR'], 'text');
}else{
eSetTextColor($p, $_GrisCabecera[$n], 'fill');
if( $n==0 ) $y -= $_SepGrupoUno;
}
eRect($PDF_xMargen, getY($y-($ascender/2),($AltoLineas*1)), $MargenDerecho, ($AltoLineas*1), 'DF');
$incr = (($FontPuntos*$PDF_Separacion)/2);
if( $_ADDOPTION[$_Form[$n][1]]!='' ) $Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
if( $_COLSOPPREFIX[$n]<>'' ) $Celda = $_COLSOPPREFIX[$n].' '.$Celda;
$Celda = trim(strip_tags($Celda));
if( !$PDF_Colors && count($_AlignCabecera)>0 ){
switch( $_AlignCabecera[$n] ){
case 'R':
$sCelda = str_pad($Celda,$AnchoTotal,' ',STR_PAD_LEFT);
break;
case 'C':
$sCelda = str_pad($Celda,$AnchoTotal,' ',STR_PAD_BOTH);
break;
default:
$sCelda = $Celda;
}
}else{
switch( $_Color['GROUPHEADER_'.($n+1)]['TEXT-ALIGN'] ){
case 'RIGHT':
$sCelda = str_pad($Celda,$AnchoTotal,' ',STR_PAD_LEFT);
break;
case 'CENTER':
$sCelda = str_pad($Celda,$AnchoTotal,' ',STR_PAD_BOTH);
break;
default:
$sCelda = $Celda;
}
}
if( $_TGrupos>0 ) $sCelda = str_repeat(' ',$n*2).$sCelda;
$_SummaryGroupTitle[$n] = str_repeat(' ',strlen($sCelda)-strlen(trim($sCelda))).$_Form[$n][0].': '.trim($sCelda);
if( !$_SummaryNoHeaders ){
if( $ConSubTotales && $PDF_Colors ){
eSetTextColor( $p, $_Color['GROUPHEADER_'.($n+1)]['COLOR'], 'fill' );
SetFuente('GROUPHEADER_'.($n+1));
}
ePDF_ShowXY($p, substr($sCelda,0,$AnchoTotal), (double)($PDF_xMargen+$incr), (double)$y);
SetFuente('NORMAL');
for($i=0; $i<count($row); $i++) $_RowSpan[$i+1][] = $y;
$y -= ($AltoLineas*1);
}
}else{
eLine(
$PDF_xMargen,
getY($y+$incr),
$PDF_xMargen+$MargenDerecho,
getY($y+$incr)
);
$y += $descender;
}
}
$_UltimoDato[$n] = $Celda;
}else{
break;
}
}
}
if( $_GREENBAR && ($_NumReg % 2)!=0 ){
if( $PDF_Colors ){
eSetTextColor($p, $_Color['GREENBAR']['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['GREENBAR']['COLOR'], 'text');
}else{
eSetFillColor(0.97);
}
$newAlto = ($AltoLineas*1);
if( $DataHeight>0 && ($sy-$y)<$DataHeight ) $newAlto = $DataHeight;
eRect($PDF_xMargen, getY($y-($ascender/2),($AltoLineas*1)), $MargenDerecho, $newAlto, 'DF');
}
if( $PDF_ShadowRows[$_NumReg]==true || $_PDFRowShadow==true ){
eSetFillColor(0.90);
eRect($PDF_xMargen, getY($y-($ascender/2),($AltoLineas*1)), $MargenDerecho, ($AltoLineas*1), 'DF');
}
$incr = (($FontPuntos*$PDF_Separacion)/2);
$oIncr = $incr;
$ConPDFWrap = 1;
$MultiLinea = array();
if( $PDF_Colors ){
if( (($_GREENBAR && ($_NumReg % 2)!=0) || ($PDF_ShadowRows[$_NumReg]==true || $_PDFRowShadow==true)) ){
if( $PDF_ColorRows[$_NumReg]!='' ){
eSetTextColor($p, $PDF_ColorRows[$_NumReg], 'fill');
eSetTextColor($p, $PDF_ColorRows[$_NumReg], 'draw');
}else{
eSetTextColor($p, $_Color['GREENBAR']['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['GREENBAR']['COLOR'], 'text');
}
}else{
eSetTextColor($p, $_Color['TD']['BACKGROUND'], 'fill');
}
$newAlto = ($AltoLineas*1);
if( $DataHeight>0 && ($sy-$y)<$DataHeight ) $newAlto = $DataHeight;
if( $PDF_Grid ) eRect($PDF_xMargen, getY($y-($ascender/2),($AltoLineas*1)), $MargenDerecho, $newAlto, 'DF');
}
$_OpLin = 0;
for($n=0; $n<count($row); $n++){
if( $_COLSOP[$n]=='S' ) for($g=0; $g<$_TGrupos; $g++) $_OpSubCol[$g][$n]++;
if( count($_ROWSOP)>0 ){
if(      $_ROWSOP[$n]=='+' ) $_OpLin += $row[$n];
else if( $_ROWSOP[$n]=='-' ) $_OpLin -= $row[$n];
else if( $_ROWSOP[$n]=='*' ) $_OpLin *= $row[$n];
}
if( !$Visible[$n] ) continue;
$Celda = $row[$n];
if( $_COLSOP[$n]!='' ){
switch( $_COLSOP[$n] ){
case '+':
case 'M':
$_OpCol[$n] += $Celda;
for($g=0; $g<$_TGrupos; $g++){
$_OpSubCol[$g][$n] += $Celda;
$_OpRegMedia[$g][$n]++;
}
break;
case 'C':
case 'R':
$_OpCol[$n]++;
for($g=0; $g<$_TGrupos; $g++) $_OpSubCol[$g][$n]++;
break;
case '#':
if( $Celda!="" ){
$_OpCol[$n]++;
for($g=0; $g<$_TGrupos; $g++) $_OpSubCol[$g][$n]++;
}
break;
}
}
if( !empty($_ADDOPTION[$_Form[$n][1]]) ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}else{
$Celda = trim($Celda);
if( $_Form[$n][2][0]=="+" || $_Form[$n][2][0]=="-" ) $Celda*=1;
if( $_Form[$n][3]=='H' ){
$Celda = strip_tags( str_replace('<BR>',"\n",$Celda) );
$Celda = str_replace('&#39;' ,"'",$Celda);
$Celda = str_replace('&quot;','"',$Celda);
}else if( $_Form[$n][2]=='#' ){
$Celda = urldecode( $Celda );
$Celda = str_replace('&#43;','+',$Celda);
$Celda = str_replace('&#92;','\\',$Celda);
}else if( $_Form[$n][2]=='o' ){
if( $Celda!='' ){
if( isset($_CHECKLIST[ $_Form[$n][1] ]) ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]!='' ){
$tmp = explode(',',$Celda);
$Celda = '';
for( $i=1; $i<count($tmp)-1; $i++ ){
if( $i>1 ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]=='NOWRAP' ) $Celda .= ', ';
else if( $_CHECKLIST[ $_Form[$n][1] ][2]=='WRAP' ) $Celda .= '<br>';
}
$Celda .= $_SelVirtual[$_Form[$n][1]][$tmp[$i]];
}
}
}else if( isset($_RADIOLIST[ $_Form[$n][1] ]) ){
if( $_RADIOLIST[ $_Form[$n][1] ][2]!='' ){
if( $_RADIOLIST[ $_Form[$n][1] ][2]=='' ){
}else if( $_RADIOLIST[ $_Form[$n][1] ][2]=='TEXT' ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}else if( $_RADIOLIST[ $_Form[$n][1] ][2]=='ALL' ){
$Celda .= '·'.$_SelVirtual[$_Form[$n][1]][$Celda];
}
}
}
}
}else if( $_SELECTMULTIPLE[$_Form[$n][1]]>0 && $Celda!='' ){
if( $_SelVirtualType[$_Form[$n][1]]!='T' ){
$tmp = explode(',',$Celda);
$Celda = '';
for($i=1; $i<count($tmp)-1; $i++){
if( $i>1 ) $Celda .= ', ';
$Celda .= $_SelVirtual[$_Form[$n][1]][$tmp[$i]];
}
}else $Celda = substr($Celda,1,-1);
}
if( $_HayRadio ){
if( count($_RADIO[ $_Form[$n][1]])>0 ){
$Celda = $_RADIO[$_Form[$n][1]][ $Celda ];
}
}
}
if( $_Form[$n][3]!='H' ) $Celda = ePDF_ReplaceChr($Celda);
if( ($_Form[$n][2]=='F4' && isZero($Celda)) || ($_Form[$n][2]=='CDI' && isZero($Celda)) ){
$Celda = '';
}else{
if( $_FORMAT[$n]!='' ){
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ){
$Formato = '$Celda = "";';
}else{
$Formato = '$Celda = '.str_replace('#', $Celda, $_FORMAT[$n]).';';
}
}else{
$Formato = '$Celda = '.str_replace('#', $Celda, $_FORMAT[$n]).';';
}
if( substr($Formato,-3)=='();' ){
$Celda = call_user_func( substr($Formato,9,-3), $n, $Celda );
}else{
if( $Formato=='$'."Celda = eNumberFormat(#,2)" ){
$Celda = eNumberFormat($Celda,2);
}else if( $Formato=='$'."Celda = eNumberFormat(#,0)" ){
$Celda = eNumberFormat($Celda);
}else if( $Formato=='$Celda = "";' || $Celda=="" ){
$Celda = '';
}else{
@eval($Formato);
}
}
}else{
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ) $Celda = '';
}
}
}
$indent = 0;
if( $_TGrupos>0 && $n==$_TGrupos ) $indent = $_TGrupos*2;
$Celda = str_replace('&amp;' ,'&',$Celda);
$Celda = str_replace('&quot;','"',$Celda);
$Celda = str_replace('&nbsp;',' ',$Celda);
$Celda = str_replace('&lt;','<',strip_tags($Celda));
$_xPDFWRAP[$n] = (double)($PDF_xMargen+$incr);
if( ($_PDFWRAP[0]>1 && strlen($Celda)>$_AnchoCol[$n] && $_PDFWRAPCOL[$n]) || $_Form[$n][3]=='H' || $_SELECTMULTIPLE[$_Form[$n][1]]>0 ){
if( !$_PDFWRAP[1] ){
$Celda = str_replace("\n",' ',$Celda);
$Celda = str_replace("\r",' ',$Celda);
}
$Celda = preg_replace('/&nbsp;/i', ' ', $Celda);
$Celda = preg_replace('/<br>/i', "\n", $Celda);
$NewTxt = explode("\n", wordwrap(chop($Celda), $_AnchoCol[$n]-$indent, "\n", 1));
for($i=0; $i<count($NewTxt); $i++){
$NewTxt[$i] = trim($NewTxt[$i]);
if( $NewTxt[$i]!='' ) $MultiLinea[$n][] = str_repeat(' ',$indent).trim($NewTxt[$i]);
}
$Celda = $MultiLinea[$n][0];
if( $ConPDFWrap<count($MultiLinea[$n]) ) $ConPDFWrap = count($MultiLinea[$n]);
if( $_PDFWRAP[0]<count($MultiLinea[$n]) ){
$MultiLinea[$n][$_PDFWRAP[0]-1] = substr($MultiLinea[$n][$_PDFWRAP[0]-1], 0, $_AnchoCol[$n]-3).'...';
}
}else{
$Celda = str_repeat(' ',$indent).trim($Celda);
}
$oCelda = $Celda;
$Celda = substr($Celda, 0, $_AnchoCol[$n]);
if( $_ALIGN[$n]!='' ){
if( $_ALIGN[$n]=='d' ){
if( strlen($oCelda."")>$_AnchoCol[$n] ){
$Celda = str_repeat("*",$_AnchoCol[$n]);
}else{
$Celda = substr(str_repeat(' ', $_AnchoCol[$n]).$Celda, -($_AnchoCol[$n]));
}
}elseif( $_ALIGN[$n]=='c' ){
$Celda = str_repeat(' ', ($_AnchoCol[$n]-strlen(str_replace('&lt;','<',strip_tags($Celda))))/2).$Celda;
}
}
switch( gettype($_PDFBackgroundColor) ){
case 'NULL':
$BackgroundColor = $_PDFCOLSSHADE[$n];
break;
case 'array':
$BackgroundColor = $_PDFBackgroundColor[$n];
break;
case 'string':
$BackgroundColor = $_PDFBackgroundColor;
break;
}
if( $BackgroundColor!='' ){
if( $PDF_Colors ){
eSetTextColor($p, $BackgroundColor, 'fill');
}else{
eSetTextColor($p, $BackgroundColor, 'fill');
}
eRect( (double)($PDF_xMargen+$incr) - (($Ancho+$PDF_Separacion)*$FontPuntos)/2, getY($y-($ascender/2)-0.1,($AltoLineas*1)), $_AnchoPt[$n], ($AltoLineas*1), 'DF' );
if( !$PDF_Colors ){
eSetTextColor($p, $_Color['TD']['BACKGROUND'], 'fill');
}
}
$enGris = false;
if( $_COLSNOREPEAT[$n] ){
if( $_COLSBAK[$n]===$Celda ){
if( !$_COLSNOREPEATFILL ){
$Celda = '';
}else{
$enGris = true;
}
}else{
$_COLSBAK[$n] = $Celda;
for($i=$n+1; $i<count($_COLSNOREPEAT); $i++) if( $_COLSNOREPEAT[$i] ) $_COLSBAK[$i] = null;
}
}
if( $enGris ){
if( $PDF_Colors ) eSetTextColor($p, $_Color['TD']['COLORFILL'], 'text');
else eSetTextGris(0.25);
}else{
}
$_UltimaFila[$n] = Array(strip_tags($Celda), (double)($PDF_xMargen+$incr), (double)$y);
switch( gettype($_PDFColor) ){
case 'array':
if( $_PDFColor[$n]<>"" ) eSetTextColor($p, $_PDFColor[$n], 'text');
break;
case 'string':
if( $_PDFColor<>"" ) eSetTextColor($p, $_PDFColor, 'text');
break;
}
if( !$_Summary ) ePDF_ShowXY($p, $Celda, (double)($PDF_xMargen+$incr), (double)$y);
$oIncr = $incr;
$incr += $_AnchoPt[$n];
}
if( $_CHARTCOL[0]>0 ){
$xi = (double)($PDF_xMargen+$oIncr);
$yi = getY((double)$y)-$PDF_FontSize+($ascender/10);
$v = $row[$_CHARTCOL[0]];
$long = $FontPuntos*$_PDFCOL[$_CHARTCOL[0]+1];
if( $_ChartMin==0 ){
$xChart = 0;
}else{
$xChart = ($_ChartMin*$long)/($_ChartMin+$_ChartMax);
}
if( $v>=0 ){
$imagen = "g/chart_p.jpg";
$xi += $xChart;
$long = ($v*$long)/($_ChartMin+$_ChartMax);
}else{
$imagen = "g/chart_n.jpg";
$xi += $xChart;
$long = (abs($v)*$long)/($_ChartMin+$_ChartMax);
$xi -= $long;
}
$p->Image($imagen, $xi, $yi, $long, $PDF_FontSize, "jpg");
}
if( $_Summary )  $y += $AltoLineas;
if( count($_ROWSOP)>0 ){
if( isset($_exeROWSOPCALC) ) $_OpLin = eval($_exeROWSOPCALC);
if( empty($_FORMAT[$n]) ){
list($u,$d) = explode(",",$_Form[$n][4]);
$Celda = eNumberFormat($_OpLin, $d);
}else{
$Formato = '$Celda = '.str_replace('#', $_OpLin, $_FORMAT[$n]).';';
@eval($Formato);
}
$_OpLinCol += $_OpLin;
if( strlen($Celda."")>$_AnchoCol[$n] ){
$Celda = str_repeat("*",$_AnchoCol[$n]);
}else{
$Celda = substr(str_repeat(' ', $_AnchoCol[$n]).$Celda, -($_AnchoCol[$n]));
}
ePDF_ShowXY($p, $Celda, (double)($PDF_xMargen+$incr), (double)$y);
}
if( $PDF_Grid ){
if( $PDF_Colors ) eSetTextColor($p, $_Color['TABLE']['BACKGROUND'], 'draw');
$incr = ($AltoLineas*1)-($ascender/2);
$p->SetLineWidth(0.01);
eLine(
$PDF_xMargen,
getY($y+$incr),
$PDF_xMargen+$MargenDerecho,
getY($y+$incr)
);
}
if( $PDF_LineRows[$_NumReg]==true ){
if( $PDF_Colors ) eSetTextColor($p, $_Color['TABLE']['BACKGROUND'], 'fill');
$incr = ($AltoLineas*1)-($ascender/2);
eLine(
$PDF_xMargen,
getY($y+$incr),
$PDF_xMargen+$MargenDerecho,
getY($y+$incr)
);
}
if( $_PDFWRAP[2]>0 ) $ConPDFWrap = $_PDFWRAP[2];
if( $ConPDFWrap>1 ){
$MaxFila = min($_PDFWRAP[0],$ConPDFWrap);
if( $_PDFWRAP[2]>0 ) $MaxFila = $_PDFWRAP[2];
for($i=1; $i<$MaxFila; $i++){
$y -= $AltoLineas;
if( $_GREENBAR ){
if( ($_NumReg % 2)!=0 ){
if( $PDF_Colors ){
eSetTextColor($p, $_Color['GREENBAR']['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['GREENBAR']['BACKGROUND'], 'draw');
}else{
eSetTextGris(0.97);
}
eRect($PDF_xMargen, getY($y-($ascender/2),($AltoLineas*1)), $MargenDerecho, ($AltoLineas*1), 'DF');
}
}
if( $PDF_ShadowRows[$_NumReg]==true ){
if( $PDF_Colors ){
eSetTextColor($p, $_Color['GREENBAR']['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['GREENBAR']['BACKGROUND'], 'draw');
}else{
eSetTextGris(0.90);
}
eRect($PDF_xMargen, getY($y-($ascender/2),($AltoLineas*1)), $MargenDerecho, ($AltoLineas*1), 'DF');
}
for($n=0; $n<count($row); $n++){
if( $_PDFCOLSSHADE[$n]!='' ){
if( $PDF_Colors ){
eSetTextColor($p, $_PDFCOLSSHADE[$n], 'fill');
}else{
eSetTextGris($_PDFCOLSSHADE[$n]);
}
eRect( (double)($_xPDFWRAP[$n] - (($Ancho+$PDF_Separacion)*$FontPuntos)/2), getY($y-($ascender/2)-0.1,($AltoLineas*1)), $_AnchoPt[$n], ($AltoLineas*1), 'DF' );
}
if( $MultiLinea[$n][$i]!='' ){
if( $PDF_Colors && !($_GREENBAR && $_NumReg % 2!=0) ){
if( $_PDFCOLSSHADE[$n]!='' ){
eSetTextColor($p, $_PDFCOLSSHADE[$n], 'fill' );
eSetTextColor($p, $_Color['TD']['BACKGROUND'], 'draw');
}else{
eSetTextColor($p, $_Color['TD']['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['TD']['BACKGROUND'], 'draw');
}
eRect( (double)($_xPDFWRAP[$n] - (($Ancho+$PDF_Separacion)*$FontPuntos)/2), getY($y-($ascender/2)-0.1,($AltoLineas*1)), $_AnchoPt[$n], ($AltoLineas*1), 'DF' );
}
$Celda = substr($MultiLinea[$n][$i], 0, $_AnchoCol[$n]);
ePDF_ShowXY($p, $Celda, $_xPDFWRAP[$n], (double)$y);
}else{
if( $PDF_Colors && !($_GREENBAR && $_NumReg % 2 != 0) ){
if( $_PDFCOLSSHADE[$n]!='' ){
eSetTextColor($p, $_PDFCOLSSHADE[$n], 'fill' );
eSetTextColor($p, $_Color['TD']['BACKGROUND'], 'draw');
}else{
eSetTextColor($p, $_Color['TD']['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['TD']['BACKGROUND'], 'draw');
}
eRect( (double)($_xPDFWRAP[$n] - (($Ancho+$PDF_Separacion)*$FontPuntos)/2), getY($y-($ascender/2)-0.1,($AltoLineas*1)), $_AnchoPt[$n], ($AltoLineas*1), 'DF' );
}
}
}
}
}
$y -= $AltoLineas;
if( $DataHeight>0 && ($sy-$y)<$DataHeight ) $y -= $DataHeight-($sy-$y);
if( $PDF_Colors && $_GREENBAR && ($_NumReg % 2)!=0 ){
eSetTextColor($p, $_Color['TD']['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['TD']['COLOR'], 'text');
}
}
function eToneGrisRGB( $n ){
$n = dechex(255-$n*255);
if( strlen($n."")==1 ) $n = "0".$n;
return "#".$n.$n.$n;
}
function Pie(){
global $p, $PDF_xMargen, $MargenHoja, $ascender, $nPag, $HojaAncho, $HojaAlto, $PDF_Colors, $_Color, $_FORMATTOTALSCS;
global $_AnchoPt, $FontPuntos, $InicioY, $y, $AltoLineas, $PDF_y2Margen, $_RowSpan, $_PDFINCLUDE;
global $PDF_AnchoSombra, $PDF_OffsetSombra, $PDF_NumPagina, $PDF_TxtPagina, $_AltoTH, $_PDFCOLBORDER, $_SePintoPie, $_PDFSHEET;
if( $_PDFINCLUDE['EB']!='' || ($nPag==1 && $_PDFINCLUDE['FB']!='') ){
eResetColor($p);
}
$_SePintoPie = true;
if( $nPag==1 && $_PDFINCLUDE['FB']!='' ) PDFIncludeFB($p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas']);
if( $_PDFINCLUDE['EB']!='' ) PDFIncludeEB($p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas']);
$Des = ($AltoLineas*1)-($ascender/2);
if( $PDF_Colors ) eSetTextColor($p, $_Color['TABLE']['BACKGROUND'], 'text');
$incr = 0;
$tLineas = count($_AnchoPt);
$_PDFSHEET = array(
$PDF_xMargen+$incr,
getY($InicioY+$Des),
$HojaAncho-$PDF_xMargen,
getY($y+$Des)
);
if( $_PDFCOLBORDER[0]!=0 ){
$p->SetLineWidth($_PDFCOLBORDER[0]);
eLine(
$PDF_xMargen+$incr,
getY($InicioY+$Des),
$PDF_xMargen+$incr,
getY($y+$Des)
);
}
for( $n=0; $n<$tLineas; $n++ ){
$incr += $_AnchoPt[$n];
if( $_AnchoPt[$n]>0 && $_PDFCOLBORDER[$n+1]!=0 ){
$p->SetLineWidth($_PDFCOLBORDER[$n+1]);
if( count($_RowSpan[$n])==0 || $n+1==$tLineas ){
if( $_FORMATTOTALSCS>$n+1 ){
eLine(
$PDF_xMargen+$incr,
getY($InicioY+$Des),
$PDF_xMargen+$incr,
getY($y+$Des+$AltoLineas)
);
}else{
eLine(
$PDF_xMargen+$incr,
getY($InicioY+$Des),
$PDF_xMargen+$incr,
getY($y+$Des)
);
}
}else{
$sIni = $InicioY+$Des;
$sFin = $y+$Des;
for( $i=0; $i<count($_RowSpan[$n]); $i++ ){
eLine(
$PDF_xMargen+$incr,
getY($sIni),
$PDF_xMargen+$incr,
getY($_RowSpan[$n][$i]-($ascender/2)+($AltoLineas*1))
);
$sIni = $_RowSpan[$n][$i]-($ascender/2);
}
if( $_FORMATTOTALSCS > $n+1 ){
eLine(
$PDF_xMargen+$incr,
getY($sIni),
$PDF_xMargen+$incr,
getY($y+$Des+$AltoLineas)
);
}else{
eLine(
$PDF_xMargen+$incr,
getY($sIni),
$PDF_xMargen+$incr,
getY($y+$Des)
);
}
}
}
$p->SetLineWidth(0.1);
}
if( $PDF_AnchoSombra>0 && $_PDFCOLBORDER[$n]!=0 ){
eLine(
$PDF_xMargen+$incr+$PDF_AnchoSombra,
getY($InicioY+$Des-$PDF_OffsetSombra),
$PDF_xMargen+$incr+$PDF_AnchoSombra,
getY($y+$Des-$PDF_AnchoSombra)
);
}
eLine(
$PDF_xMargen,
getY($y+$Des),
$PDF_xMargen+$incr,
getY($y+$Des)
);
$GLOBALS['_yUltimaLinea'] = $y+$Des;
if( $PDF_AnchoSombra > 0 ){
eLine(
$PDF_xMargen+$PDF_OffsetSombra,
getY($y+$Des-$PDF_AnchoSombra),
$PDF_xMargen+$PDF_AnchoSombra+$incr,
getY($y+$Des-$PDF_AnchoSombra)
);
$GLOBALS['_yUltimaLinea'] = $y+$Des-$PDF_AnchoSombra;
}
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
if( $x>=0 ){
if( $PDF_Colors ) eSetTextColor($p, $_Color['PAGNUMBER']['COLOR'], 'text');
ePDF_ShowXY($p, $txt, $x, $PDF_y2Margen);
}
if( $_PDFINCLUDE['EA']!='' || ($nPag==1 && $_PDFINCLUDE['FA']!='') ){
eResetColor($p);
}
if( $_PDFINCLUDE['EA']!='' ) PDFIncludeEA($p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas']);
if( $nPag==1 && $_PDFINCLUDE['FA']!='' ) PDFIncludeFA($p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas']);
$y -= $PDF_OffsetPie;
return;
}
function eResetColor($p){
global $PDF_Colors, $_Color;
if( $PDF_Colors ){
eSetTextColor($p, $_Color['TD']['COLOR'], 'text');
eSetTextColor($p, $_Color['TD']['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['TABLE']['BACKGROUND'], 'draw');
}else{
eSetTextColor($p, $_Color['TD']['BACKGROUND'], 'fill');
eSetTextGris(0.75);
}
}
function Fin($SubTotal, $ConGrupos=false, $NivelGrupo=0){
global $p, $PDF_xMargen, $_COLSOP, $_oCOLSOP, $_OpCol, $_OpSubCol, $y, $AltoLineas, $ascender, $MargenDerecho, $_GRID, $_GrisSubTotal, $_OldValGrupo;
global $FontPuntos, $PDF_Separacion, $_AnchoPt, $Visible, $_UltimoDato, $_RowSpan, $_Color, $PDF_Colors, $_SepGrupoUno, $PDF_Grid;
global $_FORMAT, $_FORMATTOTALS, $_AnchoCol, $_PDFCOL, $_ALIGN, $_NumReg, $_TGrupos, $_OpDeGrupo, $_GrupoColSpan, $_TextGrupo, $_BreakPage;
global $_FORMATTOTALSPHP, $_OpRegMedia, $_NameField, $_SelVirtual, $_ADDOPTION, $_Form, $PDF_OffsetGroup, $_InfSinTotales, $_SummaryGroupTitle, $_SummaryNoHeaders;
global $_ROWSOP, $_OpLin, $_OpLinCol, $_exeROWSOPCALC, $_FORMATTOTALSALIGN, $_FORMATTOTALSCS, $_NOZERO, $_NOZEROFORMATTOTALS;
if( !$SubTotal && $_InfSinTotales ) return;
if( count($_COLSOP)==0 ) return;
if( !$SubTotal && !$ConGrupos ) $y -= $_SepGrupoUno;
if( $PDF_Colors ){
if( $ConGrupos ){
eSetTextColor($p, $_Color['GROUPSUBTOTAL_'.($NivelGrupo+1)]['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['GROUPSUBTOTAL_'.($NivelGrupo+1)]['BACKGROUND'], 'draw');
SetFuente('GROUPSUBTOTAL_'.($NivelGrupo+1));
}else{
eSetTextColor($p, $_Color['TOTALS']['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['TOTALS']['COLOR'], 'text');
SetFuente('TOTALS');
}
}else{
eSetTextColor($p, $_Color['TOTALS']['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['TOTALS']['COLOR'], 'text');
}
eRect($PDF_xMargen, getY($y-($ascender/2),($AltoLineas*1)), $MargenDerecho, ($AltoLineas*1), 'DF');
if( count($_GRID)>0 ){
if( !$SubTotal ){
$t = 0;
for($n=$_TGrupos; $n<count($_AnchoPt); $n++) if( $_COLSOP[$n]=='<' ) $t += $_OpCol[$n-1];
for($n=$_TGrupos; $n<count($_AnchoPt); $n++) if( $_COLSOP[$n]=='<' ) $_OpCol[$n] = ($_OpCol[$n-1]*100)/$t;
}else{
$t = 0;
for($n=$_TGrupos; $n<count($_AnchoPt); $n++) if( $_COLSOP[$n]=='<' ) $t += $_OpSubCol[$NivelGrupo][$n-1];
for($n=$_TGrupos; $n<count($_AnchoPt); $n++) if( $_COLSOP[$n]=='<' ) $_OpSubCol[$NivelGrupo][$n] = ($_OpSubCol[$NivelGrupo][$n-1]*100)/$t;
}
}
if( $_FORMATTOTALSPHP!='' ){
if( $SubTotal ){
_ExeFormatoTotal($_OpCol, $NivelGrupo, $_NameField[$NivelGrupo], $_OpSubCol);
}else{
$_OpSubCol[-1] = array();
for($i=0; $i<count($_OpCol); $i++){
$_OpSubCol[-1][$i] = $_OpCol[$i];
}
_ExeFormatoTotal($_OpCol, -1, '', $_OpSubCol);
$_OpCol = $_OpSubCol[-1];
}
}
$SaltarCelda = array();
for($n=0; $n<count($_AnchoPt); $n++) $SaltarCelda[$n] = false;
if( $ConGrupos && $_GrupoColSpan>1 ) for($n=1; $n<$_GrupoColSpan; $n++) $SaltarCelda[$n+$_TGrupos] = true;
$_vF = array();
$incr = (($FontPuntos*$PDF_Separacion)/2);
for($n=0; $n<count($_AnchoPt); $n++){
if( !$Visible[$n] ) continue;
if( $SubTotal ){
$Celda = $_OpSubCol[$NivelGrupo][$n];
}else{
$Celda = $_OpCol[$n];
}
if( count($_BreakPage)>0 ){
$Celda = $_OpCol[$n];
$_OpCol[$n] = 0;
}
switch( $_COLSOP[$n] ){
case 'M':
if( $SubTotal ){
$Celda = $Celda / $_OpRegMedia[$NivelGrupo][$n];
$_OpRegMedia[$NivelGrupo][$n] = 0;
$_OpSubCol[$NivelGrupo][$n] = $Celda;
}else{
$Celda = $Celda / $_NumReg;
}
break;
case '+':
case 'R':
case 'C':
case '#':
break;
case '<':
break;
default:
$Celda = '';
}
if( $_FORMATTOTALS[$n]!='' ){
$Formato = '$Celda = '.str_replace('#', $Celda, $_FORMATTOTALS[$n]).';';
if( substr($Formato,-3)=='();' ){
$Celda = call_user_func(substr($Formato,9,-3), $n, $_OpCol);
}else if( $Celda==="" ){
}else{
@eval($Formato);
}
if( $_oCOLSOP[$n]!='%' ){
$Celda = strip_tags($Celda);
}else{
$xCelda = str_replace('.','',$Celda);
$xCelda = str_replace(',','',$xCelda);
$xCelda = str_replace('0','',$xCelda);
if( trim($xCelda)!='' ) $Celda = '100%';
}
}else{
$Saltar = false;
if( $_COLSOP[$n]=='C' ){
}else if( substr_count('<=>"'."'",$_COLSOP[$n][0])>0 ){
switch( $_COLSOP[$n][0] ){
case '<':
case '=':
case '>':
$_COLSOP[$n] = trim(substr($_COLSOP[$n],1));
break;
}
if( $_COLSOP[$n][0]=='"' || $_COLSOP[$n][0]=="'" ) $Celda = substr($_COLSOP[$n],1,-1);
$Saltar = true;
}elseif( $_COLSOP[$n]=='#' ){
}else{
}
if( !$Saltar ){
if( $_NOZEROFORMATTOTALS[$n]=='S' ){
if( isZero($Celda) ) $Celda = '';
}
if( $_oCOLSOP[$n]!='%' ){
if( $_COLSOP[$n]!='S' ){
if( strtoupper($_COLSOP[$n])=='C' ){
$Celda = eNumberFormat($Celda);
}
}
}else{
if( $Celda!='' ) $Celda = '100%';
}
}
}
$PintaGrupo = false;
if( $ConGrupos || $_InfSinTotales ){
if( $n==$_TGrupos ){
if( $_TextGrupo[$NivelGrupo]!='' ){
$tmp = str_replace('{C}', $_OldValGrupo[$NivelGrupo], $_TextGrupo[$NivelGrupo]);
if( !empty($_ADDOPTION[$_Form[$NivelGrupo][1]]) ){
$Celda = $_SelVirtual[$_Form[$NivelGrupo][1]][$Celda];
$Celda = str_replace('{V}', trim($Celda), $tmp);
}else{
$Celda = str_replace('{V}', trim($Celda), $tmp);
}
$PintaGrupo = true;
$_nGrupoColSpan = -1;
for($i=$_TGrupos; $i<$n+$_GrupoColSpan; $i++) $_nGrupoColSpan += $_AnchoCol[$i]+1;
}else{
if( $_COLSOP[$n]=='' ) $Celda = ' ';
}
$_OpSubCol[$NivelGrupo][0] = 0;
for($i=$n; $i<$n+$_GrupoColSpan-1; $i++) $_RowSpan[$i][] = $y;
}else{
if( $_COLSOP[$n]=='' ){
$Celda = '';
}else{
$Celda = $_OpSubCol[$NivelGrupo][$n];
if( $_FORMATTOTALS[$n]!='' ){
$Formato = '$Celda = '.str_replace('#', $Celda, $_FORMATTOTALS[$n]).';';
@eval(str_replace("eNumberFormat(,", "eNumberFormat(0,", $Formato));
$Celda = strip_tags($Celda);
}
}
$_OpSubCol[$NivelGrupo][$n] = 0;
$_OpRegMedia[$NivelGrupo][$n] = 0;
}
}
if( $n==$_TGrupos ) $Celda = str_repeat(' ', $NivelGrupo*2).$Celda;
$sLen = strlen(trim($Celda));
if( $_NOZEROFORMATTOTALS[$n]=='S' ) if( isZero($Celda) ) $Celda = '';
if( $ConGrupos && $n==$_TGrupos ){
if( $_TextGrupo[$NivelGrupo]!='' ){
}else if( $_ALIGN[$n]=='d' ){
$Celda = substr(str_repeat(' ', $_AnchoCol[$n] ).$Celda, -($_AnchoCol[$n]));
}elseif( $_ALIGN[$n]=='c' ){
$Celda = str_repeat(' ', ($_AnchoCol[$n]-strlen($Celda))/2).$Celda;
}
}else if( $_ALIGN[$n]!='' ){
if( $_FORMATTOTALS[$n][0]=='"' || $_FORMATTOTALS[$n][0]=="'" ){
}else if( $_ALIGN[$n]=='d' ){
$Celda = substr(str_repeat(' ', $_AnchoCol[$n]).$Celda, -($_AnchoCol[$n]));
}else if( $_ALIGN[$n]=='c' ){
$Celda = str_repeat(' ', ($_AnchoCol[$n]-strlen($Celda))/2).$Celda;
}
}
if( $_PDFCOL[$n]>0 ){
if( $_ALIGN[$n]!='' ){
if( $_ALIGN[$n]=='d' ){
$Celda = substr($Celda, -($_PDFCOL[$n]));
}elseif( $_ALIGN[$n]=='c' ){
}
}else{
$Celda = substr($Celda, 0, $_PDFCOL[$n]);
}
}
if( $sLen>strlen($Celda) ){
if( $PintaGrupo ){
$Celda = substr($Celda, 0, $_nGrupoColSpan);
}else{
$Celda = str_repeat('*', strlen($Celda));
}
}
if( !$SaltarCelda[$n] ){
if( $PDF_Colors ){
if( $ConGrupos ){
eSetTextColor($p, $_Color['GROUPSUBTOTAL_'.($NivelGrupo+1)]['COLOR'], 'fill');
SetFuente('GROUPSUBTOTAL_'.($NivelGrupo+1));
}else{
eSetTextColor($p, $_Color['TOTALS']['COLOR'], 'fill');
SetFuente('TOTALS');
}
}else{
eSetTextColor($p, $_Color['TOTALS']['BACKGROUND'], 'fill');
eSetTextColor($p, $_Color['TOTALS']['COLOR'], 'text');
}
if( $PintaGrupo ){
$Celda = substr($Celda, 0, $_nGrupoColSpan);
global $PDF_FontSize, $PDF_FontFamily;
PDFFuente($PDF_FontFamily, $PDF_FontSize*.8);
}
if( $_SummaryNoHeaders && $ConGrupos && $_SummaryGroupTitle[$NivelGrupo]!='' && $n==$_TGrupos ){
$Celda = $_SummaryGroupTitle[$NivelGrupo];
$_SummaryGroupTitle[$NivelGrupo] = '';
}
$_vF[$n] = str_replace(array(".",","), array("","."), $Celda);
if( $n==count($_AnchoPt)-1 && count($_ROWSOP)>0 ){
if( isset($_exeROWSOPCALC) ){
$Celda = eval($_exeROWSOPCALC);
}
if( empty($_FORMATTOTALS[$n]) ){
list($u,$d) = explode(",",$_Form[$n][4]);
$Celda = eNumberFormat($Celda, $d);
}else if( $_FORMATTOTALS[$n][0]=="'" || $_FORMATTOTALS[$n][0]=='"' ){
$Celda = substr($_FORMATTOTALS[$n],1,-1);
}else{
$Formato = '$Celda = '.str_replace('#', $Celda, $_FORMATTOTALS[$n]).';';
@eval($Formato);
}
if( strlen($Celda."")>$_AnchoCol[$n] ){
$Celda = str_repeat("*",$_AnchoCol[$n]);
}else{
$Celda = substr(str_repeat(' ', $_AnchoCol[$n]).$Celda, -($_AnchoCol[$n]));
}
}else if( $SubTotal && $_TextGrupo[$NivelGrupo]<>"" ){
}else if( $_FORMATTOTALS[$n][0]=="'" || $_FORMATTOTALS[$n][0]=='"' ){
$Celda = substr($_FORMATTOTALS[$n],1,-1);
if( $_FORMATTOTALSALIGN<>"" ){
$totalColSpan = 0;
if( $_FORMATTOTALSCS>1 ){
for($i=0; $i<$_FORMATTOTALSCS; $i++) $totalColSpan += $_AnchoCol[$i]+1;
$totalColSpan--;
}
if( $_FORMATTOTALSALIGN=="C" ){
$Celda = str_pad($Celda, $totalColSpan, " ", STR_PAD_BOTH);
}else if( $_FORMATTOTALSALIGN=="D" ){
$Celda = str_pad($Celda, $totalColSpan, " ", STR_PAD_LEFT);
}
}
}
ePDF_ShowXY($p, $Celda, $PDF_xMargen+$incr, $y);
}
$incr += $_AnchoPt[$n];
}
if( $PDF_Grid ){
if( $PDF_Colors ) eSetTextColor( $p, $_Color['TABLE']['BACKGROUND'], 'draw' );
$incr = ($AltoLineas*1)-($ascender/2);
$p->SetLineWidth( 0.01 );
eLine(
$PDF_xMargen,
getY($y+($incr)),
$PDF_xMargen+$MargenDerecho,
getY($y+($incr))
);
}
for($n=0; $n<count($_AnchoPt); $n++){
$_OpSubCol[$NivelGrupo][$n] = 0;
$_OpRegMedia[$NivelGrupo][$n] = 0;
}
$y -= ($AltoLineas*1);
}
function CalculaTitulos($row, &$AnchoTotal){
global $_Form, $Separador, $PDF_Separacion, $_PDFTH, $_PDFCOL, $_AnchoCOL, $_TGrupos;
global $FontPuntos, $AltoLineas, $Titulos, $xTitulos, $yTitulos, $_AnchoColSpan;
global $_AnchoCol, $_AnchoPt, $ascender, $PDF_UpperCabecera, $Visible;
global $_ADDOPTION, $_SelVirtual, $_HayRadio, $_RADIO, $MargenDerecho, $_MaxPDFWRAP, $_PDFWRAP, $_xPDFWRAP;
global $_HEADER_ORIGINAL, $_MasColPrimera, $_COLSOP;
$sX = 0;
$MaxFilas = 0;
$iv = -1;
for($n=0; $n<count($_Form); $n++){
$Titulos[$n] = '';
$_AnchoCol[$n] = 0; $_AnchoCOL[$n] = 0;
$_AnchoPt[$n] = 0;
if( !$Visible[$n] ) continue;
$iv++;
$Celda = $_Form[$n][0];
if( $_PDFTH[$n]!='' ) $Celda = $_PDFTH[$n];
$Celda = str_replace('&nbsp;',' ',$Celda);
$Celda = str_replace('&NBSP;',' ',$Celda);
$Celda = str_replace('&#92;','\\',$Celda);
$Celda = str_replace('&#43;','+',$Celda);
if( $PDF_UpperCabecera ){
$Celda = strtoupper($Celda);
}else{
if( substr_count( $Celda, '<' ) > 0 ){
$Celda = str_replace('<br>','<BR>',$Celda);
$Celda = str_replace('<bR>','<BR>',$Celda);
$Celda = str_replace('<Br>','<BR>',$Celda);
}
}
$Celda = str_replace( "\t", ' ', $Celda );
if( isset($_HEADER_ORIGINAL) && $_HEADER_ORIGINAL ){
$Titulos[$n] = explode( '<BR>', $Celda );
}else{
$Titulos[$n] = explode( '<BR>', eStrUpper($Celda) );
}
list($Ancho, $Decimales, $Alto) = explode(',',$_Form[$n][4]);
if( $Decimales*1>0 ) $Ancho += ($Decimales*1)+1;
if( $_COLSOP[0]=="S" && $iv==0 ) $Ancho += $_MasColPrimera;
if( $Alto!='' ) $Ancho = $Decimales;
if( !empty($_ADDOPTION[$_Form[$n][1]]) ){
foreach($_SelVirtual[$_Form[$n][1]] as $valor){
$Ancho = max($Ancho, strlen($valor));
}
}else{
if( $_Form[$n][2]=='#' ) $row[$n] = urldecode($row[$n]);
$Celda = trim($row[$n]);
if( $_HayRadio ){
if( count($_RADIO[$_Form[$n][1]])>0 ){
foreach($_RADIO[$_Form[$n][1]] as $valor){
$Ancho = max($Ancho, strlen($valor));
}
}
}
}
for($i=0; $i<count($Titulos[$n]); $i++){
$Titulos[$n][$i] = str_replace('&amp;' ,'&', $Titulos[$n][$i]); $Titulos[$n][$i] = str_replace('&AMP;' ,'&', $Titulos[$n][$i]);
$Titulos[$n][$i] = str_replace('&quot;','"', $Titulos[$n][$i]); $Titulos[$n][$i] = str_replace('&QUOT;','"', $Titulos[$n][$i]);
$Titulos[$n][$i] = str_replace('&lt;'  ,'<', $Titulos[$n][$i]); $Titulos[$n][$i] = str_replace('&LT;'  ,'<', $Titulos[$n][$i]);
$Titulos[$n][$i] = trim($Titulos[$n][$i]);
if( $Ancho<strlen($Titulos[$n][$i]) ) $Ancho = strlen($Titulos[$n][$i]);
$xTitulos[$n][$i] = $sX;
}
$Ancho = max($Ancho, $_AnchoColSpan[$n]);
if( $_PDFCOL[$n]!=0 && $Ancho!=$_PDFCOL[$n] ) $Ancho = $_PDFCOL[$n];
$_AnchoCol[$n] = $Ancho; $_AnchoCOL[$n] = $Ancho;
$_AnchoPt[$n] = ($Ancho+$PDF_Separacion)*$FontPuntos;
for($i=0; $i<count($Titulos[$n]); $i++){
$xTitulos[$n][$i] = $xTitulos[$n][$i]+((($Ancho-strlen($Titulos[$n][$i]))*$FontPuntos)/2)+(($PDF_Separacion*$FontPuntos)/2);
}
$sX += ($Ancho+$PDF_Separacion)*$FontPuntos;
if( count($Titulos[$n])>$MaxFilas ) $MaxFilas = count($Titulos[$n]);
}
$MaxI = 0;
for($n=0; $n<count($_Form); $n++){
$_xPDFWRAP[$n] = 0;
if( !$Visible[$n] ) continue;
$i = count($Titulos[$n]);
$MaxI = max($i,$MaxI);
if( $yTitulos[$n]=='' ) $yTitulos[$n] = -((($MaxFilas-$i)*$AltoLineas)/2)-($ascender/2);
}
$MargenDerecho = $sX;
$AnchoTotal = 0;
for($n=0; $n<count($_Form); $n++) $AnchoTotal += $_AnchoPt[$n];
$AnchoTotal = ($AnchoTotal/$FontPuntos)-1;
return $sX;
}
function ePDFImage($d){
global $p, $IncrY, $_x1G, $_y1G, $_x2G, $_y2G, $HojaAlto, $HojaAncho, $MargenHoja;
$x = $d[1];
$y = $d[2] + $IncrY;
$PDF_Imagen = $d[3];
$PDF_Imagen = eScript($PDF_Imagen);
if( $d[5]!='' ) $MaxAncho = $d[5];
if( $d[6]!='' ) $MaxAlto = $d[6];
$stmp = explode('.', $PDF_Imagen);
$Extension = $stmp[count($stmp)-1];
$Extension = str_replace('jpg', 'jpeg', $Extension);
list($Ancho, $Alto) = getimagesize($PDF_Imagen);
$sAncho = $Ancho;
$sAlto = $Alto;
if( $d[5]=='' ) $MaxAncho = $Ancho;
if( $d[6]=='' ) $MaxAlto = $Alto;
$zoom = 1;
switch( trim($d[4]) ){
case '#':
break;
case '+':
if( $Ancho<=$MaxAncho && $Alto<=$MaxAlto ) break;
case '=':
$zw = $MaxAncho/$Ancho;
$zh = $MaxAlto/$Alto;
if( $zw<$zh ){
$zoom = $zw;
}else{
$zoom = $zh;
}
break;
default:
}
$Ancho = $Ancho * $zoom;
$Alto = $Alto * $zoom;
if( strtoupper($d[0])=="R" ) $x = $HojaAncho-$MargenHoja-$x-$Ancho;
$p->Image($PDF_Imagen, $x, $y, $Ancho, $Alto, $Extension);
if( $d[7]!=0 ){
eRect($x, $y-$Alto, $Ancho, $Alto, "D");
}
$_x1G = $x;
$_y1G = $y-$Alto;
$_x2G = $x+$Ancho;
$_y2G = $y;
}
function PintaImagen($d){
global $p, $IncrY, $_x1G, $_y1G, $_x2G, $_y2G;
$x = cX($d[1]);
$y = cY($d[2]) + $IncrY;
$PDF_Imagen = cT($d[3], false);
$PDF_Imagen = eScript($PDF_Imagen);
if( $d[5]!='' ) $MaxAncho = cW($d[5]);
if( $d[6]!='' ) $MaxAlto = cH($d[6]);
$TxtError = '';
$stmp = explode('.', $PDF_Imagen);
$Extension = $stmp[count($stmp)-1];
$Extension = str_replace('jpg', 'jpeg', $Extension);
if( $TxtError!='' ){
}else if( $imagen<1 ){
$tmp = explode('/',$PDF_Imagen);
$TxtError = $tmp[count($tmp)-1];
}else{
list($Ancho, $Alto) = getimagesize($PDF_Imagen);
$sAncho = $Ancho;
$sAlto = $Alto;
$zoom = 1;
switch( trim($d[4]) ){
case '#':
break;
case '+':
if( $Ancho<=$MaxAncho && $Alto<=$MaxAlto ) break;
case '=':
$zw = $MaxAncho/$Ancho;
$zh = $MaxAlto/$Alto;
if( $zw<$zh ){
$zoom = $zw;
}else{
$zoom = $zh;
}
break;
default:
}
$Ancho = $Ancho * $zoom;
$Alto = $Alto * $zoom;
$p->Image($PDF_Imagen, $x, getY($y-$Alto), $Ancho, $Alto, $Extension);
$_x1G = $x;
$_y1G = $y-$Alto;
$_x2G = $x+$Ancho;
$_y2G = $y;
if( $d[8]!=0 ){
eRect($x, getY($y,-$Alto), $Ancho, -$Alto, 'DF');
}
}
if( $TxtError!='' ){
$_x1G = $x;
$_y1G = $y-$MaxAlto;
$_x2G = $x+$MaxAncho;
$_y2G = $y;
eRect( $x, getY($y, -$MaxAlto), $MaxAncho, -$MaxAlto, 'DF' );
ePDF_ShowXY( $p, $TxtError, $x+2, $y-7 );
}
}
function eSetTextColor($p, $Color, $Tipo){
if( $Color=='' ) return;
if( $Color==($Color*1).'' ){
$p->SetColor($Tipo, 255*$Color);
return;
}
list($xr, $xg, $xb) = explode("\n", chunk_split(str_replace('#','',$Color), 2));
$vr = base_convert($xr,16,10);
$vg = base_convert($xg,16,10);
$vb = base_convert($xb,16,10);
$p->SetColor($Tipo, $vr, $vg, $vb);
}
function ColoresEnPDF(){
global $_Color, $PDF_Colors;
$nmFile = "pdf.css";
if( isset($_SESSION["VAR_TMP"]) ){
if( isset($_SESSION["VAR_TMP"]["pdf.css"]) ){
$nmFile = $_SESSION["VAR_TMP"]["pdf.css"];
unset($_SESSION["VAR_TMP"]["pdf.css"]);
}
}
if( !file_exists("{$_SESSION['_PathCSS']}/{$nmFile}") ) return;
$Dim = file("{$_SESSION['_PathCSS']}/{$nmFile}");
for( $n=0; $n<count($Dim); $n++ ){
if( substr_count($Dim[$n],'{')==1 ){
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
if( substr($ValColor,-1)==';' ) $ValColor =  substr($ValColor,0,-1);
if( !$PDF_Colors ) $ValColor = RGBToGray($ValColor);
$_Color[$Regla][$NomColor] = $ValColor;
}
}
}
if( $_Color['CDSCRIPT']['COLOR']=='' ) $_Color['CDSCRIPT']['COLOR'] = '#eeeeee';
if( $_Color['SHOWRECIPIENT']['COLOR']=='' ) $_Color['SHOWRECIPIENT']['COLOR'] = '#cccccc';
if( $_Color['FOOTTITLE']['COLOR']=='' ) $_Color['FOOTTITLE']['COLOR'] = '#000e4b';
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
if( $Atributo!="NORMAL" ) eTron('NO - SetFuente() - '.$Atributo);
}
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
function CalculaTitulosTH($row, &$AnchoTotal, &$THAltoLineas=NULL){
global $_Form, $Separador, $PDF_Separacion, $_PDFTH, $_PDFCOL, $_ConColSpan, $PDF_xMargen;
global $FontPuntos, $AltoLineas, $Titulos, $xTitulos, $yTitulos, $_AnchoCOL, $AnchoTotal;
global $_AnchoCol, $_AnchoPt, $ascender, $PDF_UpperCabecera, $Visible, $THCol, $THAltoLineas;
global $_ADDOPTION, $MargenDerecho, $_MaxPDFWRAP, $_PDFWRAP, $_xPDFWRAP, $_AnchoColSpan;
global $THVisible, $THTitulos, $TH_AnchoPt, $TH_AnchoCol, $THxTitulos, $THyTitulos, $TH_xPDFWRAP;
global $_DimTHText, $_HEADER_ORIGINAL;
global $_TGrupos, $NCampos, $_CHARTCOL;
for($n=$_TGrupos; $n<$NCampos; $n++){
if( !$Visible[$n] ){
$_DimTHText[1][$n] = "";
}else if( $THCol[$n][2]==3 ){
$_DimTHText[1][$n] = trim($_Form[$n][0]);
}else if( $THCol[$n][2]==2 ){
if( $n+$THCol[$n][1]==$NCampos && count($_CHARTCOL)>0 && $_CHARTCOL[2]=='' ) $THCol[$n][1]++;
for($i=$n; $i<$n+$THCol[$n][1]; $i++){
$_DimTHText[1][$i] = trim($THCol[$n][0]);
}
continue;
}
$_Form[$n][2] = trim($_Form[$n][2]);
if( $THCol[$n][2]==0 ) continue;
}
for($n=$_TGrupos; $n<$NCampos; $n++) $_DimTHText[0][$n] = trim($_Form[$n][0]);
for($i=0; $i<count($_DimTHText); $i++) for($n=0; $n<count($_DimTHText[$i]); $n++){
if( isset($_HEADER_ORIGINAL) && $_HEADER_ORIGINAL ){
$_DimTHText[$i][$n] = $_DimTHText[$i][$n];
}else{
$_DimTHText[$i][$n] = THAMayusculas($_DimTHText[$i][$n]);
}
}
$OldVisible    = $Visible;
$OldTitulos    = $Titulos;
$Old_AnchoPt   = $_AnchoPt;
$Old_AnchoCol  = $_AnchoCol;
$OldxTitulos   = $xTitulos;
$OldyTitulos   = $yTitulos;
$OldAnchoTotal = $AnchoTotal;
$Old_xPDFWRAP  = $_xPDFWRAP;
$OldAltoLineas = $AltoLineas;
$yTitulos = array();
$NewTH = array();
$EsLaPrimera = true;
$Hasta = array();
$ColAnt = 0;
for($n=0; $n<$NCampos; $n++){
$_ConColSpan[$n] = false;
$NewTH[$n] = '';
$_AnchoColSpan[$n] = $_AnchoCOL[$n];
if( $_PDFCOL[$n]==='0' || !$Visible[$n] ){
$ColAnt = $n;
$_AnchoCOL[$n] = -1;
continue;
}
if( $EsLaPrimera ){
if( $_DimTHText[1][$n]!=$_DimTHText[0][$n] ){
$_ConColSpan[$n] = true;
$NewTH[$n] = $_DimTHText[1][$n];
}
}else if( $_DimTHText[1][$n]!=$_DimTHText[1][$ColAnt] && $_DimTHText[1][$n]!=$_DimTHText[0][$n] ){
$NewTH[$n] = $_DimTHText[1][$n];
}else if( $_DimTHText[1][$n]==$_DimTHText[1][$ColAnt] && $_DimTHText[1][$n]!=$_DimTHText[0][$n] ){
$Visible[$n] = false;
$i = $ColAnt;
if( $_AnchoCOL[$i]==-1 ){
while( $i>0 && $_AnchoCOL[$i]==-1 ) $i--;
}
$_ConColSpan[$i] = true;
$_AnchoCOL[$i] += ($_AnchoCOL[$n]+$PDF_Separacion);
$_AnchoCOL[$n] = -1;
$_ConColSpan[$i] = true;
$_ConColSpan[$n] = true;
$Hasta[$i] = $n;
}else{
}
$EsLaPrimera = false;
$ColAnt = $n;
}
$sX = 0;
$MaxFilas = 0;
$OldMaxFilas = 0;
for($n=0; $n<count($_Form); $n++){
$OldMaxFilas = max($OldMaxFilas, count($OldTitulos[$n]));
$Titulos[$n] = '';
$_AnchoCol[$n] = $_AnchoCOL[$n];
$_AnchoPt[$n] = 0;
if( !$Visible[$n] ) continue;
if( $_PDFCOL[$n]=='0' ) continue;
$Titulos[$n] = explode('<BR>', $NewTH[$n]);
$Ancho = $_AnchoCOL[$n];
for($i=0; $i<count($Titulos[$n]); $i++){
$Titulos[$n][$i] = trim($Titulos[$n][$i]);
if( $Ancho<strlen($Titulos[$n][$i]) ) $Ancho = strlen($Titulos[$n][$i]);
$xTitulos[$n][$i] = $sX;
}
if( $Ancho>$_AnchoCOL[$n] ){
$Dif = $Ancho - $_AnchoCOL[$n];
$OldAnchoTotal += ( $Dif * $FontPuntos );
$sn = $n;
$p = $n;
$PorLaIz = true;
while( $Dif>0 ){
if( $OldVisible[$p] ){
$Dif--;
$_AnchoColSpan[$p]++;
$Old_AnchoPt[$p] += $FontPuntos;
$Old_AnchoCol[$p]++;
for($s=$p; $s<count($OldTitulos); $s++){
if( $s>$p || !$PorLaIz ){
for($i=0; $i<count($OldTitulos[$s]); $i++){
$OldxTitulos[$s][$i] += $FontPuntos;
}
}
}
}
$p++;
if( $p>$Hasta[$n] ){
$p = $n;
$PorLaIz = !$PorLaIz;
}
}
}
$_AnchoPt[$n] = ( $Ancho + $PDF_Separacion ) * $FontPuntos;
for($i=0; $i<count($Titulos[$n]); $i++){
$xTitulos[$n][$i] = $xTitulos[$n][$i]+((($Ancho-strlen($Titulos[$n][$i]))*$FontPuntos)/2)+(($PDF_Separacion*$FontPuntos)/2);
}
$sX += ($Ancho+$PDF_Separacion)*$FontPuntos;
if( count($Titulos[$n])>$MaxFilas ) $MaxFilas = count($Titulos[$n]);
}
for($n=0; $n<count($_Form); $n++){
$_xPDFWRAP[$n] = 0;
if( !$Visible[$n] ) continue;
$i = count($Titulos[$n]);
if( $yTitulos[$n]=='' ){
$yTitulos[$n] = -( (($MaxFilas-$i)*$AltoLineas) / 2 ) - ($ascender/2);
}
}
$MargenDerecho = $sX;
$AnchoTotal = 0;
for( $n=0; $n<count($_Form); $n++ ) $AnchoTotal += $_AnchoPt[$n];
$AnchoTotal = ( $AnchoTotal / $FontPuntos )-1;
for( $n=0; $n<count($OldTitulos); $n++ ){
if( !$_ConColSpan[$n] ){
$OldyTitulos[$n] += ($OldMaxFilas*$AltoLineas)/2 + ($ascender/2);
}
}
$THVisible	= $Visible;
$THTitulos	= $Titulos;
$TH_AnchoPt	= $_AnchoPt;
$TH_AnchoCol= $_AnchoCol;
$THxTitulos	= $xTitulos;
$THyTitulos	= $yTitulos;
$TH_xPDFWRAP= $_xPDFWRAP;
$THAltoLineas=$AltoLineas;
$Visible    = $OldVisible;
$Titulos    = $OldTitulos;
$_AnchoPt   = $Old_AnchoPt;
$_AnchoCol  = $Old_AnchoCol;
$xTitulos   = $OldxTitulos;
$yTitulos   = $OldyTitulos;
$_xPDFWRAP  = $Old_xPDFWRAP;
$AltoLineas = $OldAltoLineas;
return $AnchoTotal*$FontPuntos;
}
function THAMayusculas( $txt ){
$txt = eStrUpper( $txt );
return CambiaCHR( $txt );
}
function CambiaCHR( $txt ){
$txt = str_replace( '&EURO;', 'EUR', $txt );
$txt = str_replace( "\t"    , ' ', $txt );
$txt = str_replace( '&AMP;' , '&', $txt );
$txt = str_replace( '&QUOT;', '"', $txt );
$txt = str_replace( '&NBSP;', ' ', $txt );
$txt = str_replace( '&euro;', 'EUR', $txt );
$txt = str_replace( '&amp;' , '&', $txt );
$txt = str_replace( '&quot;', '"', $txt );
$txt = str_replace( '&nbsp;', ' ', $txt );
$txt = str_replace( '&#92;' ,'\\', $txt );
$txt = str_replace( '&#43;' , '+', $txt );
return $txt;
}
function _TransformaChr( $PDF_Titulo ){
$PDF_Titulo = str_replace(' <= ','[_MenorOIgual]',$PDF_Titulo);
$PDF_Titulo = str_replace(' >= ','[_MayorOIgual]',$PDF_Titulo);
$PDF_Titulo = str_replace(' < ' ,'[_Menor]',$PDF_Titulo);
$PDF_Titulo = str_replace(' > ' ,'[_Mayor]',$PDF_Titulo);
$PDF_Titulo = preg_replace( '/<br>/i' ,'#BR#', strip_tags($PDF_Titulo) );
$Ini = strpos($PDF_Titulo,'<');
$Fin = strpos($PDF_Titulo,'>');
if( $Ini===false ){
}else{
if( $Fin===false ){
}else{
if( $Ini < $Fin && substr($PDF_Titulo,$Ini+1,1) > ' ' ) $PDF_Titulo = substr($PDF_Titulo,0,$Ini).substr($PDF_Titulo,$Fin+1);
}
}
$PDF_Titulo = preg_replace( '/#BR#/i'  ,'<BR>', $PDF_Titulo );
$PDF_Titulo = preg_replace( '/&nbsp;/i',' '   , $PDF_Titulo );
$PDF_Titulo = preg_replace( '/&amp;/i' ,'&'   , $PDF_Titulo );
$PDF_Titulo = preg_replace( '/&quot;/i','"'   , $PDF_Titulo );
$PDF_Titulo = preg_replace( '/&#47;/i' ,'/'   , $PDF_Titulo );
$PDF_Titulo = preg_replace( '/&#92;/i' ,'\\', $PDF_Titulo );
$PDF_Titulo = preg_replace( '/&#43;/i' , '+', $PDF_Titulo );
$PDF_Titulo = str_replace('[_Menor]',' < ',$PDF_Titulo);
$PDF_Titulo = str_replace('[_Mayor]',' > ',$PDF_Titulo);
$PDF_Titulo = str_replace('[_MenorOIgual]',' <= ',$PDF_Titulo);
$PDF_Titulo = str_replace('[_MayorOIgual]',' >= ',$PDF_Titulo);
return $PDF_Titulo;
}
function NuevaPagina( $ConMembrete=true ){
global $_FinalListado, $AltoLineas, $font, $FontPuntos,$HojaAlto,$HojaAncho, $MargenHoja,$nPag, $p, $PDF_FontFamily;
global $PDF_FontSize, $PDF_Imagen, $PDF_NumPagina, $PDF_OffsetDescripcion, $PDF_OffsetDescripcionBak, $PDF_ShowFilter;
global $PDF_TxtPagina, $PDF_y2Margen, $y, $PDF_yMargen;
$y = 0;
PDFBeginPage( $p, $HojaAncho, $HojaAlto );
$p->SetLineWidth( 0.1 );
PDFFuente($PDF_FontFamily, $PDF_FontSize);
$PDF_ShowFilter = true;
$PDF_OffsetDescripcion = $PDF_OffsetDescripcionBak;
if( $ConMembrete ){
Membrete_( $PDF_Imagen, $nPag );
}else{
$y = $HojaAlto - $PDF_yMargen;
}
$_FinalListado = $y - $AltoLineas;
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
if( $x >= 0 ) ePDF_ShowXY($p, $txt, $x, $PDF_y2Margen);
}
function eRect($x, $y, $Ancho, $Alto, $df=''){
global $p;
$p->Rect($x, $y, $Ancho, $Alto, $df);
}
function ePDFRect($x, $y, $Ancho, $Alto, $df=''){
eRect($x, $y, $Ancho, $Alto, $df);
}
function eLine($x1, $y1, $x2, $y2){
global $p;
$p->Line($x1, $y1, $x2, $y2, array(256*0.75));
}
function ePDF_ShowXY($p, $text, $x, $y, $FontHeight=0){
global $PDF_FontSize, $ascender;
if( $FontHeight==0 ) $FontHeight = $PDF_FontSize;
$p->Text($x-$ascender/2, getY($y,$FontHeight), $text);
}
function ePDFText($x, $y, $text){
global $p;
$p->Text($x, $y, $text);
}
function ePDF_ContinueText($p, $text){
$p->Text($p->getX(), getY($p->getY()), $text);
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
function PDFCalcSizeFont($PDF_FontSize, &$capheight=NULL, &$ascender=NULL, &$descender=NULL, &$FontPuntos=NULL ){
global $capheight, $ascender, $descender, $FontPuntos;
$capheight = $PDF_FontSize / 1.7452006980803;
$ascender = $PDF_FontSize / 1.5948963317384;
$descender = $PDF_FontSize / -2.6809651474531;
$FontPuntos	= ($PDF_FontSize*600/1000);
}
function getY($y, $AltoFont=0){
global $HojaAlto;
return $HojaAlto-$y-$AltoFont;
}
function RGBToGray($Color){
$r = hexdec('#'.substr($Color,1,2));
$g = hexdec('#'.substr($Color,3,2));
$b = hexdec('#'.substr($Color,5,2));
$t = ($r+$g+$b)/3;
return '#'.dechex($t).dechex($t).dechex($t);
}
function eColorTone($r, $g="",$b="", $t){
if( $r=='' ) return '#000000';
if( $b=='' ){
if( substr($r,0,1)=='#' ) $r = substr($r,1,6);
if( strlen($r)==3 ) $r = substr($r,0,1)+substr($r,0,1).substr($r,1,1).substr($r,1,1).substr($r,2,1).substr($r,2,1);
else if( strlen($r)!=6 ) return '#'.$r;
$g = hexdec(substr($r,2,2));
$b = hexdec(substr($r,4,2));
$r = hexdec(substr($r,0,2));
}else{
$r = hexdec($r);
$g = hexdec($g);
$b = hexdec($b);
}
return( '#'.Op($r,$t).Op($g,$t).Op($b,$t) );
}
function Op( $c, $t ){
if( $t==0 ){
}else if( $t>=100 ){
$c = 0;
}else if( $t<=-100 ){
$c = 255;
}else if( $t > 0 ){
$c -= floor(($t*$c)/100);
}else{
$c += floor(($t*-(255-$c))/100);
}
$c = dechex($c); if( strlen($c)!=2 ) $c = '0'.$c;
return strtoupper($c);
}
if( !function_exists('pdf_open_image_file') ){
function PDF_open_image_file( $handle, $tipe, $Imagen, $Cadena, $Numero ){
global $p;
return $Imagen;
}
function PDF_get_value( $handle, $AnchoAlto, $imag ){
list($Ancho,$Alto) = getimagesize( $imag );
if( strtoupper($AnchoAlto)=='IMAGEWIDTH' ){
$GLOBALS['_TCImgWidth'] = $Ancho;
return $Ancho;
}else{
$GLOBALS['_TCImgHeight'] = $Alto;
return $Alto;
}
}
function PDF_place_image( $handle, $Imagen, $xImg, $yImg, $Zoom ){
global $p;
$sw = $GLOBALS['_TCImgWidth'];
$sh = $GLOBALS['_TCImgHeight'];
$tmp = explode('.',$Imagen);
$p->Image( $Imagen, $xImg, getY($yImg, $sh*$Zoom), $sw*$Zoom, $sh*$Zoom, strtoupper($tmp[count($tmp)-1]) );
}
function PDF_close_image(){}
function PDF_save(){}
function PDF_restore(){}
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
$x = mm($x);
$y = mm($y);
if( $cnf["font"]!="" ) $GLOBALS["__font"] = $cnf["font"];
if( $cnf["size"]!="" ) $GLOBALS["__size"] = $cnf["size"];
if( $cnf["color"]!="" ) $GLOBALS["__color_text"] = $cnf["color"];
pFont($GLOBALS["__font"], $GLOBALS["__size"]);
pColor($GLOBALS["__color_text"], 'text');
$GLOBALS["__rotate"] = "";
if( $cnf["rotate"]!="" ){
$p->StartTransform();
$p->Rotate($cnf["rotate"], $x, $y);
$GLOBALS["__rotate"] = $cnf["rotate"];
}
ePDFText($x, $y, $txt);
$GLOBALS["__x"] = $x;
$GLOBALS["__y"] = $y;
$anchoTxt = $p->GetStringWidth($txt." ", $GLOBALS["__font"], "", $GLOBALS["__size"]);
if( $cnf["rotate"]!="" ){
$p->StopTransform();
if( $cnf["rotate"]>0 ){
$GLOBALS["__y"] -= $anchoTxt;
}else{
$GLOBALS["__y"] += $anchoTxt;
}
}else{
$GLOBALS["__x"] += $anchoTxt;
}
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
$x = mm($x);
$y = mm($y);
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
