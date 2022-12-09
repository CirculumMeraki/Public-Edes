<?PHP
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() ) exit;
if( $_SESSION['_PDF_']<>'S' ) eEnd();
set_time_limit(60*5);
if( $_POST['_ReportAll']=='S' && !function_exists('gsActivity') ){
$_POST['_GRAPHS'] = '*';
$_GRAPH = '*';
if( !function_exists('eGraph') ) include('../../edesweb/graph.inc');
$TituloGraph = '';
$TipoGraph = strtoupper(str_replace( '*', 'P,C,R,G', (($_GRAPH[0]=='')?'*':$_GRAPH[0]) ));
if( isset($_THCOLSPAN[0]) ){
list(,,$TituloCol) = explode(',',$_THCOLSPAN[count($_THCOLSPAN)-1]);
}else{
$TituloCol = $_Form[$_TotalColIzq-1][0];
}
$DimVar = array();
if( $_GRAPH[6]!='' ){
$tmp = explode(',',$_GRAPH[6]);
for( $n=0; $n<count($tmp); $n++ ){
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
if( substr_count($TipoGraph,'P')>0 ) $xGraphP = eGraph( 'P', $usuCursor, $_Form, $_COLSOP, $TituloGraph, $TituloCol, $TituloFila, '', $DimVar );
if( substr_count($TipoGraph,'C')>0 ) $xGraphC = eGraph( 'C', $usuCursor, $_Form, $_COLSOP, $TituloGraph, $TituloCol, $TituloFila, '', $DimVar );
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
$_TITLE = str_replace('<br>','<BR>',$_TITLE);
$_TITLE = str_replace('&#183;',' ',$_TITLE);
$_TITLE = str_replace("&#47;", "/", $_TITLE);
foreach($_PDFVAR as $value){
@eval($value);
}
if( isset($PDF_GREENBAR) )  $_GREENBAR = $PDF_GREENBAR;
if( isset($PDF_DataHeight) )  $DataHeight = $PDF_DataHeight;
if( isset($PDF_SQL) && $PDF_SQL=='' ) $PDF_SQL = ' ';
if( isset($_VerUserCondiciones) ){
$tmp = call_user_func( trim($_VerUserCondiciones) );
for($n=0; $n<count($tmp); $n++){
if( count($tmp[$n])==2 ){
$_DimCondicion[] = $tmp[$n][0].' '.$tmp[$n][1];
}else{
$PDF_TxtCondicion = $tmp[$n][0];
}
}
}else{
$_DimCondicion = PintaCondiciones( $_DBADDFILTER );
if( function_exists('eChangeListCondition') ) $_DimCondicion = eChangeListCondition( $_DimCondicion );
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
$_Summary = ($_POST["_Summary"]=="S");
if( $_Summary ) $_TITLE .= " (resumen)";
$_TITLE = str_replace('#BR#','<BR>',$_TITLE);
while( substr_count( $_TITLE, '  ' ) > 0 ) $_TITLE = str_replace( '  ', ' ', $_TITLE );
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
$PDF_Titulo = EnPlural( $PDF_Titulo, 'LISTADO DE #', true );
$PDF_Titulo = str_replace('<BR>','#BR#',$PDF_Titulo);
$PDF_Titulo = _TransformaChr( $PDF_Titulo );
$PDF_Titulo = str_replace('#BR#','<BR>',$PDF_Titulo);
if( !isset($PDF_SubTitulo)		) $PDF_SubTitulo	= '';
if( !isset($PDF_SQL)				) $PDF_SQL		= '';
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
if( count($PDF_Condition)> 0 ) $_DimCondicion = $PDF_Condition;
}else if( is_string($PDF_Condition) ){
if( $PDF_Condition != '' ) $_DimCondicion = array($PDF_Condition);
}
}
$PDF_TxtCondicion = $__Lng[count($_DimCondicion)<=1 ? 78:43];
if( $_TextOverride['condition']<>'' ){
$PDF_TxtCondicion = $_TextOverride['condition'];
if( $PDF_TxtCondicion=='-' ) $PDF_TxtCondicion = '';
}
$Long = max( strlen(trim($PDF_TxtTitulo)), strlen(trim($PDF_TxtOrdenacion)), strlen(trim($PDF_TxtCondicion)) );
if( $PDF_TxtTitulo<>''		) $PDF_TxtTitulo		= str_pad($PDF_TxtTitulo	, $Long, " ", STR_PAD_LEFT).' ';
if( $PDF_TxtOrdenacion<>''	) $PDF_TxtOrdenacion	= str_pad($PDF_TxtOrdenacion, $Long, " ", STR_PAD_LEFT).' ';
if( $PDF_TxtCondicion<>''	) $PDF_TxtCondicion		= str_pad($PDF_TxtCondicion	, $Long, " ", STR_PAD_LEFT).' ';
for( $n=1; $n<=9; $n++ ){
for( $i=0; $i<count($_PDFTH); $i++ ){
$_PDFTH[$i] = str_replace( '<br>', '#BR#', $_PDFTH[$i] );
$_PDFTH[$i] = str_replace( '<BR>', '#BR#', $_PDFTH[$i] );
$_PDFTH[$i] = str_replace( '&#'.(48+$n).';', $n, strip_tags($_PDFTH[$i]) );
$_PDFTH[$i] = str_replace( '#BR#','<BR>', $_PDFTH[$i] );
}
}
if( count($_DimCondicion) > 0 ){
for( $n=0; $n<count($_DimCondicion); $n++ ) $_DimCondicion[$n] = _TransformaChr( $_DimCondicion[$n] );
}
if( $_NotInTemporary<>"" ) $_DimCondicion = array();
$PDF_TxtTitulo = trim(strip_tags($PDF_TxtTitulo));
$PDF_TxtOrdenacion = trim(strip_tags($PDF_TxtOrdenacion));
$PDF_TxtCondicion = trim(strip_tags($PDF_TxtCondicion));
$LenMax = max(strlen($PDF_TxtTitulo), strlen($PDF_TxtOrdenacion));
$LenMax = max($LenMax, strlen($PDF_TxtCondicion));
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
for($n=0; $n<count($tmp); $n++ ) $PDF_LineRows[($tmp[$n]*1)] = 1;
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
$_HeaderLine = array( -1, -1, -1 );
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
$Visible[$n] = (substr_count($_Form[$n][6],'*')==0 && substr_count($_Form[$n][6],'L')==0);
if( !$Visible[$n] && $_PDFCOL[$n]>0 ) $Visible[$n] = true;
if( strtoupper($_PDFCOL[$n])=='XLS'  ) $_PDFCOL[$n] = '0';
if( strtoupper($_FORMAT[$n])=='IMG'  ) $_PDFCOL[$n] = '0';
if( strtoupper($_FORMAT[$n])=='ICON' ) $_PDFCOL[$n] = '0';
if( $_PDFCOL[$n]=='0' ) $Visible[$n] = false;
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
$tmp = explode( ' ', $_PDFCOLBORDER[$n] );
$_PDFCOLBORDER[$n] = (($tmp[0]=='') ? 0.1 : (double)$tmp[0]);
$PDF_ColStyle[$n] = $tmp[1];
}
if( strtoupper($_Form[$n][3])=='C' ){
$_ADDOPTION[ $_Form[$n][1] ] = true;
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
if( $_PDFWRAP[0]>0 ) for( $n=0; $n<count($_Form); $n++ ) $_PDFWRAPCOL[$n] = true;
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
$_PDFCOLBORDER[$n] = str_replace( '  ',' ', $_PDFCOLBORDER[$n] );
$tmp = explode( ' ', $_PDFCOLBORDER[$n] );
$_PDFCOLBORDER[$n] = (( $tmp[0]=='' ) ? 0.1 : (double)$tmp[0] );
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
$SaltoLinea		= 1.5;
$FontSizeTH		= $PDF_FontSize;
$FontFamilyTH	= $PDF_FontFamily . '-Bold';
$UltimaLinea	= 0;
$FontPuntos		= ( $PDF_FontSize * 600 / 1000 );
$Separador		= str_repeat( ' ', $PDF_Separacion );
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
$_GrisCabecera = array( 0.8, 0.9, 0.95, 0.95 );
$_GrisSubTotal = array( 0.8, 0.9, 0.95, 0.95 );
$_PDFSHEET = array(0,0,0,0);
$_SepGrupoUno = 0.5;
if( isset($_PDFAlignCabecera) ) $_AlignCabecera = $_PDFAlignCabecera;
if( isset($_PDFGrisCabecera ) ) $_GrisCabecera  = $_PDFGrisCabecera;
if( isset($_PDFGrisSubTotal ) ) $_GrisSubTotal  = $_PDFGrisSubTotal;
if( isset($_PDFSepGrupoUno  ) ) $_SepGrupoUno   = $_PDFSepGrupoUno;
if( !isset($_PDFADDMARGENTOP) ) $_PDFADDMARGENTOP = 0;
$PDF_InfoTitulo = preg_replace( '/&nbsp;/i',' ', $PDF_InfoTitulo );
if( substr_count( $PDF_InfoTitulo, '<' ) > 0 ){
$PDF_InfoTitulo = preg_replace( '/<BR>/i',' ', $PDF_InfoTitulo );
$PDF_InfoTitulo = str_replace( '  ', ' ', $PDF_InfoTitulo );
$PDF_InfoTitulo = strip_tags($PDF_InfoTitulo);
}
for( $n=0; $n<count($_TextGrupo); $n++ )	$_TextGrupo[$n] = preg_replace( '/&nbsp;/i',' ', $_TextGrupo[$n] );
foreach( $_PDFINCLUDE as $k=>$v ){
if( $_PDFINCLUDE[$k] != '' ){
$tmpFile = GrabaTmp( 'l_pdfinclude_'.$k, 'function PDFInclude'.$k.'($handle, $dw=NULL, $dh=NULL, &$pag=NULLe, $header_line=NULL, $BreakPage=NULL, $LineHeight=NULL){'."\n".'global $lx, $ly;'."\n".$_PDFINCLUDE[$k]."}\n", $LenDoc );
include( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
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
$ConTOTALSROWS = ( $_TOTALSROWS && count($_COLSOP) == 0 );
$_PaginaAbierta = false;
$_SePintoPie = false;
function PDFBeginPage( $p, $HojaAncho, $HojaAlto ){
PDF_Begin_Page( $p, $HojaAncho, $HojaAlto );
$GLOBALS['_PaginaAbierta'] = true;
$_SePintoPie = false;
}
function PDFEndPage( $p ){
PDF_End_Page( $p );
$GLOBALS['_PaginaAbierta'] = false;
}
$p = PDF_new();
if( $PDF_License!='' ) PDF_set_parameter($p, 'license', $PDF_License);
$optlist = '';
if( $_POST['_doc_password_']<>'' ) $optlist = 'userpassword='.$_POST['_doc_password_'].' ';
if( $PDF_FullPermissions || $_GET['_PDF_FullPermissions'] ){
if( PDF_begin_document( $p, $NomFile, $optlist )==-1 ){
}
}else{
if( PDF_begin_document( $p, $NomFile, $optlist.'masterpassword=1805eDes1959 permissions={nomodify noassemble noannots noforms nocopy noaccessible plainmetadata}' )==-1 ){
}
}
if( $PDF_InfoTitulo[0]=='=' ) $PDF_InfoTitulo = trim(substr($PDF_InfoTitulo,1));
if( $PDF_InfoTitulo=='' ) $PDF_InfoTitulo = ' ';
if( $_eDesTitle=='' ) $_eDesTitle = ' ';
PDF_set_info( $p, 'Title'	 , $PDF_InfoTitulo );
PDF_set_info( $p, 'Author'	 , $_SESSION["ApplicationName"]." " );
PDF_set_info( $p, 'Keywords', 'eDes' );
PDF_set_info( $p, 'Creator' , $_eDesTitle );
$_UsuarioDelPDF = $_SESSION["_UserName"];
pdf_set_info($p, "De", $_UsuarioDelPDF);
if( $_DocSeeUser<>'' || isset($_POST['_doc_to_']) ){
if( isset($_POST['_doc_to_']) ){
if( $_POST['_doc_to_']=='' ){
pdf_set_info($p, "Para", $_UsuarioDelPDF);
}else{
pdf_set_info($p, "Para", $_POST['_doc_to_']);
}
}else{
pdf_set_info($p, "Para", $_UsuarioDelPDF);
}
}
pdf_set_info($p, "Script", _CodigoScript() );
$VersionPDF = pdf_get_value( $p, "major", 0 );
if( $VersionPDF < 5 ) $PDF_Colors = false;
$uBreakPage = null;
if( $_PDFINCLUDE['M'] != '' ){
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
while( !$_PDFGraphicsOnly && $row = NewFila() ){
$_vF = &$row;
foreach($_pCol as $k=>$v){
$_vF[$k] = &$_vF[$v];
}
if( isset($_DBREADROW) ) if( !call_user_func( $_DBREADROW, $row ) ) continue;
if( count($_BreakPage) > 0 ){
$aBreakPage = ''; for( $i=0; $i<count($_BreakPage); $i++ ) $aBreakPage .= $row[$_BreakPage[$i]].'|';
if( $uBreakPage!=null && $uBreakPage != $aBreakPage ){
if( $_NumReg == $TotalReg ){
if( $ConSubTotales ){
for( $n=$TotalCol-1; $n>=0; $n-- ){
if( $_COLSOP[$n]=='S' ) Fin( true, true, $n );
}
}
Fin( false );
FootTitle();
if( $ConTOTALSROWS ){
$ConTOTALSROWS = false;
$incr = ($AltoLineas*1)-($ascender/2);
PDF_save($p);
if( $PDF_Colors ){
SetColor( $p, $_Color['TOTALS']['COLOR'], 'stroke' );
SetColor( $p, $_Color['TOTALS']['BACKGROUND'], 'fill' );
SetFuente( 'TOTALS' );
}else{
PDF_setcolor( $p, 'fill', 'gray', 0.90, 0, 0, 0 );
}
PDF_setdash( $p, 0, 1000 );
PDF_rect( $p, $PDF_xMargen, $sy-($ascender/2), $MargenDerecho, ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
foreach( $_UltimaFila as $k=>$v ) ePDF_ShowXY( $p, $v[0], $v[1], $v[2] );
PDF_moveto( $p, $PDF_xMargen				, $sy+($incr) );
PDF_lineto( $p, $PDF_xMargen+$MargenDerecho , $sy+($incr) );
PDF_closepath_fill_stroke($p);
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
for( $n=0; $n<count($row); $n++ ) $_UltimoDato[$n] = $row[$n];
$PDF_xMargen = ( $HojaAncho - CalculaTitulos( $row, $AnchoTotal ) ) / 2;
if( $PDF_xMargen < 0 ){
if( $PDF_Horientacion == 'V' ){
$PDF_Horientacion = 'H';
$HojaAncho = 842.0;
$HojaAlto  = 595.0;
if( isset($PDF_Width)  ) $HojaAncho = $PDF_Height;
if( isset($PDF_Height) ) $HojaAlto  = $PDF_Width;
$y = $HojaAlto;
}
}
if( count($_CHARTCOL)>0 ){
$_PDFCOL[$_CHARTCOL[0]+1] = (int)($_CHARTCOL[1]/$PDF_FontSize);
}
$Calcular = false;
}
if( $y >= $HojaAlto - 10 ){
$snPag = $nPag;
if( $nPag == 1 && $_PDFINCLUDE['S'] != '' ){
PDFBeginPage( $p, $HojaAncho, $HojaAlto );
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
PDF_set_parameter( $p, 'openmode', 'none' );
PDF_set_parameter( $p, 'transition', 'dissolve' );
PDF_setlinewidth( $p, 0.1 );
PDFIncludeS( $p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas'] );
PDFEndPage( $p );
}
PDFBeginPage( $p, $HojaAncho, $HojaAlto );
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
PDF_set_parameter( $p, 'openmode', 'none' );
PDF_set_parameter( $p, 'transition', 'dissolve' );
PDF_setlinewidth( $p, 0.1 );
$y = 0;
if( $snPag == 1 ){
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
$UltimaLinea = $PDF_y2Margen + $AltoLineas + $PDF_OffsetPie;
Membrete( $PDF_Imagen, $nPag );
$PDF_xMargen = ($HojaAncho - CalculaTitulos($row, $AnchoTotal))/2;
if( count($_THCOLSPAN)>0 ){
$sPDF_xMargen = $PDF_xMargen;
$PDF_xMargen = ($HojaAncho - CalculaTitulosTH($row, $AnchoTotal))/2;
$PDF_xMargen = min($sPDF_xMargen, $PDF_xMargen);
}
if( $PDF_xMargen<0 ) $PDF_xMargen = 1;
}else{
if( $PDF_ShowHeader || $PDF_LetterHead ){
$PDF_OffsetDescripcion = 20;
if( $PDF_LetterHead ) $PDF_OffsetDescripcion = 15;
$PDF_OffsetDescripcionBak = $PDF_OffsetDescripcion;
Membrete($PDF_Imagen, $nPag);
}
}
if( $y == 0 ){
$y = ( $HojaAlto - $PDF_yMargen );
if( $_PDFADDMARGENTOP > 0 ) $y -= $_PDFADDMARGENTOP;
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
$Visible		= $THVisible;
$Titulos		= $THTitulos;
$_AnchoPt	= $TH_AnchoPt;
$_AnchoCol	= $TH_AnchoCol;
$xTitulos	= $THxTitulos;
$yTitulos	= $THyTitulos;
$_xPDFWRAP	= $TH_xPDFWRAP;
$AltoLineas	= $THAltoLineas;
Cabecera( -1 );
$Visible    = $OldVisible;
$Titulos    = $OldTitulos;
$_AnchoPt   = $Old_AnchoPt;
$_AnchoCol  = $Old_AnchoCol;
$xTitulos   = $OldxTitulos;
$yTitulos   = $OldyTitulos;
$_xPDFWRAP  = $Old_xPDFWRAP;
$AltoLineas = $OldAltoLineas;
}
Cabecera( $nPag );
if( $nPag == 1 && ( $ConSubTotales || $_InfSinTotales ) ){
for( $n=0; $n<count($row); $n++ ){
if( $_COLSOP[$n] == 'S' ){
$Celda = $row[$n];
if( $ConSubTotales || $_InfSinTotales ){
if( $n==0 ) $incr = ( ($FontPuntos * $PDF_Separacion ) / 2 );
PDF_save($p);
if( $PDF_Colors ){
SetColor( $p, $_Color['GROUPHEADER_'.($n+1)]['BACKGROUND'], 'fill' );
}else{
PDF_setcolor( $p, 'fill', 'gray', $_GrisCabecera[$n], 0, 0, 0 );
if( $n==0 ) $y -= $_SepGrupoUno;
}
PDF_rect( $p, $PDF_xMargen, $y-($ascender/2), $MargenDerecho, ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
if( $PDF_Colors ){
SetColor( $p, $_Color['GROUPHEADER_'.($n+1)]['COLOR'], 'fill' );
}
PDF_save($p);
if( $PDF_Colors ) SetFuente('GROUPHEADER_'.($n+1));
if( $_ADDOPTION[ $_Form[$n][1] ] != '' ) $Celda = $_SelVirtual[ $_Form[$n][1] ][$Celda];
$Celda = trim(strip_tags($Celda));
if( $_COLSOPPREFIX[$n]<>'' ) $Celda = $_COLSOPPREFIX[$n].' '.$Celda;
$Celda = str_repeat(' ',$n*2).$Celda;
if( !$PDF_Colors && count($_AlignCabecera) > 0 ){
switch( $_AlignCabecera[$n] ){
case 'R':
ePDF_ShowXY($p, str_pad($Celda,$AnchoTotal,' ',STR_PAD_LEFT), (double)($PDF_xMargen+$incr), (double)$y);
break;
case 'C':
ePDF_ShowXY($p, str_pad($Celda,$AnchoTotal,' ',STR_PAD_BOTH), (double)($PDF_xMargen+$incr), (double)$y);
break;
default:
ePDF_ShowXY($p, substr($Celda,0,$AnchoTotal), (double)($PDF_xMargen+$incr), (double)$y);
}
}else{
switch( $_Color['GROUPHEADER_'.($n+1)]['TEXT-ALIGN'] ){
case 'RIGHT':
ePDF_ShowXY($p, str_pad($Celda,$AnchoTotal,' ',STR_PAD_LEFT), (double)($PDF_xMargen+$incr), (double)$y);
break;
case 'CENTER':
ePDF_ShowXY($p, str_pad($Celda,$AnchoTotal,' ',STR_PAD_BOTH), (double)($PDF_xMargen+$incr), (double)$y);
break;
default:
ePDF_ShowXY($p, substr($Celda,0,$AnchoTotal), (double)($PDF_xMargen+$incr), (double)$y);
}
}
PDF_restore($p);
for( $i=0; $i<count($row); $i++ ) $_RowSpan[$i+1][] = $y;
$y -= ($AltoLineas*1);
}
}
}
}
}
$sy = $y;
Fila( $row );
for( $n=0; $n<count($row); $n++ ) $_UltimoDato[$n] = $row[$n];
$_NumReg++;
$SaltoObligado = false;
if( $y < $PDF_LastAfterMarginBottom ) if( (($TotalReg-$_NumReg)*$AltoLineas) < ($y+$UltimaLinea ) ) $SaltoObligado = true;
$SePintoPie = false;
if( $y < $UltimaLinea || $SaltoObligado || (isset($PDF_MarginBottom) && $y<$PDF_MarginBottom) ){
if( $_NumReg == $TotalReg ){
if( $ConSubTotales ){
for( $n=$TotalCol-1; $n>=0; $n-- ){
if( $_COLSOP[$n]=='S' ) Fin( true, true, $n );
}
}
Fin( false );
FootTitle();
if( $ConTOTALSROWS ){
$ConTOTALSROWS = false;
$incr = ($AltoLineas*1)-($ascender/2);
PDF_save($p);
if( $PDF_Colors ){
SetColor( $p, $_Color['TOTALS']['COLOR'], 'stroke' );
SetColor( $p, $_Color['TOTALS']['BACKGROUND'], 'fill' );
SetFuente( 'TOTALS' );
}else{
PDF_setcolor( $p, 'fill', 'gray', 0.90, 0, 0, 0 );
}
PDF_setdash( $p, 0, 1000 );
PDF_rect( $p, $PDF_xMargen, $sy-($ascender/2), $MargenDerecho, ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
foreach( $_UltimaFila as $k=>$v ) ePDF_ShowXY( $p, $v[0], $v[1], $v[2] );
PDF_moveto( $p, $PDF_xMargen					 , $sy+($incr) );
PDF_lineto( $p, $PDF_xMargen+$MargenDerecho, $sy+($incr) );
PDF_closepath_fill_stroke($p);
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
if( $_NumReg == $_PDFLIMIT ){
$PDF_TxtLimite = str_replace( '#L#', $_PDFLIMIT, $PDF_TxtLimite );
$PDF_TxtLimite = str_replace( '#R#', $TotalReg , $PDF_TxtLimite );
ePDF_ShowXY( $p, $PDF_TxtLimite, ($HojaAncho-(strlen($PDF_TxtLimite)*$FontPuntos))/2, $y-$AltoLineas );
break;
}
for( $n=0; $n<count($row); $n++ ) $_OldValGrupo[$n] = $row[$n];
}
if( $_BrowseInTemporary!="" ){
fclose($_FileDownload);
}
if( !$SePintoPie && $ConSubTotales ){
for( $n=$TotalCol-1; $n>=0; $n-- ){
if( $_COLSOP[$n] == 'S' ) Fin( true, true, $n );
}
}
if( $ConTOTALSROWS ){
$incr = ($AltoLineas*1)-($ascender/2);
PDF_save($p);
if( $PDF_Colors ){
SetColor( $p, $_Color['TOTALS']['COLOR'], 'stroke' );
SetColor( $p, $_Color['TOTALS']['BACKGROUND'], 'fill' );
SetFuente( 'TOTALS' );
}else{
PDF_setcolor( $p, 'fill', 'gray', 0.90, 0, 0, 0 );
}
PDF_setdash( $p, 0, 1000 );
PDF_rect( $p, $PDF_xMargen, $sy-($ascender/2), $MargenDerecho, ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
foreach( $_UltimaFila as $k=>$v ) ePDF_ShowXY( $p, $v[0], $v[1], $v[2] );
PDF_moveto( $p, $PDF_xMargen					 , $sy+($incr) );
PDF_lineto( $p, $PDF_xMargen+$MargenDerecho, $sy+($incr) );
PDF_closepath_fill_stroke($p);
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
$imag = PDF_open_image_file( $p, 'png', $Imagen, '', 0 );
$w = pdf_get_value( $p, "imagewidth" , $imag );
$h = pdf_get_value( $p, "imageheight", $imag );
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
PDF_save($p);
$imag = PDF_open_image_file( $p, 'png', $Imagen, '', 0 );
PDF_place_image( $p, $imag, $xImg, $yImg, $Zoom );
PDF_close_image( $p, $imag );
PDF_restore($p);
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
$imag = PDF_open_image_file( $p, 'png', $PDF_Imagen, '', 0 );
$w = pdf_get_value( $p, "imagewidth" , $imag );
$h = pdf_get_value( $p, "imageheight", $imag );
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
PDF_set_parameter( $p, 'openmode', 'none' );
PDF_set_parameter( $p, 'transition', 'dissolve' );
PDF_setlinewidth( $p, 0.1 );
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
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
PDF_save($p);
PDF_place_image( $p, $imag, $xImg, $yImg, $Zoom );
PDF_close_image( $p, $imag );
PDF_restore($p);
if( $NewPagina ){
if( $x >= 0 ) ePDF_ShowXY( $p, $txt, $x, $PDF_y2Margen );
PDFEndPage( $p );
}
}
}
if( $GLOBALS['_PaginaAbierta'] ) PDFEndPage( $p );
if( $_NumReg == 0 ){
PDFBeginPage( $p, $HojaAncho, $HojaAlto );
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
PDF_set_parameter( $p, 'openmode', 'none' );
PDF_set_parameter( $p, 'transition', 'dissolve' );
ePDF_ShowXY( $p, $PDF_TxtSinDatos, $MargenHoja, $HojaAlto - $PDF_yMargen );
PDFEndPage($p);
}
if( $_PDFINCLUDE['E'] != '' ){
PDFBeginPage( $p, $HojaAncho, $HojaAlto );
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
PDF_set_parameter( $p, 'openmode', 'none' );
PDF_set_parameter( $p, 'transition', 'dissolve' );
PDF_setlinewidth( $p, 0.1 );
PDFIncludeE( $p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas'] );
PDFEndPage( $p );
}
PDF_close($p);
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
if( ($y-$Mas) < $PDF_yMargen ){
global $SePintoPie, $PDF_FontFamily, $font, $PDF_FontSize, $PDF_TxtPagina, $PDF_NumPagina, $MargenHoja, $FontPuntos, $PDF_y2Margen;
Pie();
PDFEndPage( $p );
$FootNewPag = true;
$nPag++;
$SePintoPie = true;
PDFBeginPage( $p, $HojaAncho, $HojaAlto );
PDF_set_parameter( $p, 'openmode', 'none' );
PDF_set_parameter( $p, 'transition', 'dissolve' );
PDF_setlinewidth( $p, 0.1 );
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
Membrete( '', $nPag );
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
if( $x >= 0 ) ePDF_ShowXY( $p, $txt, $x, $PDF_y2Margen );
$y = $HojaAlto - $PDF_yMargen - $PDF_FontSize*2;
}
}
if( $_PDFINCLUDE['LB'] != '' ) PDFIncludeLB( $p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas'] );
if( $_TxtFOOTTITLE!="" ){
$y -= ($ascender/2);
if( $PDF_Colors ) eSetTextColor($p, $_Color['FOOTTITLE']['COLOR'], 'text');
else eSetTextGris(0.75);
$txt = $_TxtFOOTTITLE;
$Dim = explode('<BR>', $txt);
$sy = $y;
$Mas = 0;
for( $n=0; $n<count($Dim); $n++ ){
$txt = str_replace( '&nbsp;', ' ', strip_tags($Dim[$n]) );
ePDF_ShowXY( $p, $txt, $PDF_xMargen+$incr, $sy );
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
if( $_PDFINCLUDE['LA'] != '' ) PDFIncludeLA( $p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas'] );
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
function Membrete( $PDF_Imagen, $nPag ){
global $p, $y, $MargenHoja, $HojaAncho, $HojaAlto, $FontPuntos, $PDF_yMargen, $_HeaderLine, $AnchoTotal;
global $FontFamilyTH, $FontSizeTH, $PDF_Ordenacion, $PDF_TxtOrdenacion, $PDF_LetterHead, $PDF_xMargen;
global $PDF_xImagen, $PDF_yImagen, $PDF_Fecha, $PDF_TxtCabecera, $PDF_TxtFecha, $PDF_CdScript;
global $PDF_TxtCondicion, $_DimCondicion, $PDF_OffsetDescripcion, $AltoLineas, $_DocLabelUserTo, $_DocLabelUserFrom, $PDF_y2Margen;
global $PDF_TxtTitulo, $PDF_Titulo, $PDF_SubTitulo, $PDF_Colors, $_Color, $PDF_ShowFilter, $PDF_ImagenScale;
$Ancho = 0;
$Alto = 0;
if( $PDF_Imagen!='' ){
$Extension = str_replace('jpg','jpeg',substr($PDF_Imagen, strpos($PDF_Imagen,'.')+1));
if( PHP_OS=='WINNT' ){
$PDF_Imagen = str_replace('/http/edes.php', '', $_SERVER['SCRIPT_FILENAME']).$PDF_Imagen;
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
}
}
$Ancho = 0;
$y = $HojaAlto - $PDF_yMargen;
if( $PDF_TxtCabecera != '' ){
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['COMPANY']['COLOR'], 'fill' );
ePDF_ShowXY( $p, $PDF_TxtCabecera, $Ancho+$MargenHoja, $y );
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
ePDF_ShowXY( $p, $PDF_TxtFecha, $HojaAncho-$MargenHoja-(strlen($PDF_TxtFecha)*$FontPuntos), $y );
PDF_restore($p);
if( $PDF_CdScript ){
PDF_save($p);
SetColor( $p, $_Color['CDSCRIPT']['COLOR'], 'fill' );
$txt = _CodigoScript();
ePDF_ShowXY( $p, $txt, $HojaAncho-$MargenHoja-(strlen($txt)*$FontPuntos), $y-$AltoLineas+($AltoLineas/4) );
PDF_restore($p);
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
PDF_save($p);
SetColor( $p, $_Color['SHOWRECIPIENT']['COLOR'], 'fill' );
if( $_POST['_doc_to_']=='' ){
ePDF_ShowXY( $p, ePDF_ReplaceChr($_POST['_doc_from_']), 10, $PDF_y2Margen );
}else{
if( trim($_DocLabelUserFrom)<>'' ) ePDF_ShowXY( $p, ePDF_ReplaceChr($_DocLabelUserFrom.': '.$GLOBALS['_UsuarioDelPDF']), 10, $PDF_y2Margen+((trim($_DocLabelUserTo)<>'') ? $AltoLineas : 0 ) );
if( trim($_DocLabelUserTo)<>'' ) ePDF_ShowXY( $p, ePDF_ReplaceChr($_DocLabelUserTo.': '.$_POST['_doc_to_']), 10, $PDF_y2Margen );
}
PDF_restore($p);
}
$GLOBALS['_yUltimaLinea'] = $y;
$y -= 2;
if( $PDF_TxtCabecera != '' ){
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['HR']['COLOR'], 'fill' );
$_HeaderLine = array( $Ancho+$MargenHoja, $y, $HojaAncho-$MargenHoja );
PDF_moveto($p, $Ancho+$MargenHoja, $y); PDF_lineto( $p, $HojaAncho-$MargenHoja, $y );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
$GLOBALS['_yUltimaLinea'] = $y;
}
if( !$PDF_ShowFilter && $nPag>1 && !$PDF_LetterHead ) return;
if( trim($PDF_Titulo)!="" && trim($PDF_TxtTitulo)!="" ){
$y -= $PDF_OffsetDescripcion;
$PDF_OffsetDescripcion = 0;
$sx = $Ancho+$MargenHoja;
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['TITLE_TEXT']['COLOR'], 'fill' );
ePDF_ShowXY( $p, $PDF_TxtTitulo, $sx, $y );
PDF_restore($p);
$sx += strlen($PDF_TxtTitulo)*$FontPuntos;
$GLOBALS['_yUltimaLinea'] = $y;
$font = PDF_findfont($p, $FontFamilyTH, 'host', 0);
if( count(explode('<BR>',$PDF_Titulo))==1 ){
$tmp = explode(' ',$PDF_Titulo);
$PDF_Titulo = $tmp[0];
for($i=1; $i<count($tmp); $i++){
if( ($HojaAncho-$MargenHoja-$sx-pdf_stringwidth($p, $PDF_Titulo." ".$tmp[$i], $font, $FontSizeTH*1.2))<=0 ){
$PDF_Titulo .= "<BR>".$tmp[$i];
}else{
$PDF_Titulo .= " ".$tmp[$i];
}
}
}
$tmp = explode('<BR>',$PDF_Titulo);
for( $i=0; $i<count($tmp); $i++ ){
if( $i==0 ){
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['CIRCLE']['COLOR'], 'fill' );
PDF_circle($p, $sx, $y+$FontPuntos/2, 1.5 ); PDF_fill($p);
PDF_restore($p);
}
PDF_save($p);
$font = PDF_findfont($p, $FontFamilyTH, 'host', 0);
PDF_setfont( $p, $font, $FontSizeTH*1.2 );
if( $PDF_Colors ) SetColor( $p, $_Color['TITLE_VALUE']['COLOR'], 'fill' );
ePDF_ShowXY( $p, trim($tmp[$i]), $sx+(1*$FontPuntos), $y );
PDF_restore($p);
$GLOBALS['_yUltimaLinea'] = $y;
$y -= $AltoLineas;
}
}
if( $PDF_SubTitulo != '' ){
$y -= $PDF_OffsetDescripcion;
$PDF_OffsetDescripcion = 0;
$sx = $Ancho+$MargenHoja;
$sx += strlen($PDF_TxtTitulo)*$FontPuntos;
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['CIRCLE']['COLOR'], 'fill' );
PDF_circle($p, $sx, $y+$FontPuntos/2, 1.5 ); pdf_fill($p);
PDF_restore($p);
PDF_save($p);
$font = PDF_findfont( $p, $FontFamilyTH, 'host', 0 );
PDF_setfont( $p, $font, $FontSizeTH*1.2 );
ePDF_ShowXY( $p, $PDF_SubTitulo, $sx+(1*$FontPuntos), $y );
PDF_restore($p);
$GLOBALS['_yUltimaLinea'] = $y;
$y -= $AltoLineas;
}
if( $PDF_Ordenacion != '' ){
$y -= $PDF_OffsetDescripcion;
$PDF_OffsetDescripcion = 0;
$sx = $Ancho+$MargenHoja;
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['ORDER_TEXT']['COLOR'], 'fill' );
ePDF_ShowXY( $p, $PDF_TxtOrdenacion, $sx, $y );
PDF_restore($p);
$sx += strlen($PDF_TxtOrdenacion)*$FontPuntos;
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['CIRCLE']['COLOR'], 'fill' );
PDF_circle($p, $sx, $y+$FontPuntos/2, 1.5 ); pdf_fill($p);
PDF_restore($p);
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['ORDER_VALUE']['COLOR'], 'fill' );
$font = PDF_findfont( $p, 'Courier-Bold', 'host', 0 );
PDF_setfont( $p, $font, $FontSizeTH );
ePDF_ShowXY( $p, $PDF_Ordenacion, $sx+(1*$FontPuntos), $y );
PDF_restore($p);
$GLOBALS['_yUltimaLinea'] = $y;
$y -= $AltoLineas;
}
if( count($_DimCondicion) > 0 ){
$PDF_TxtCondicion = str_replace('&#92;' ,'\\', $PDF_TxtCondicion);
$PDF_TxtCondicion = str_replace('&#43;' , '+', $PDF_TxtCondicion);
$PDF_TxtCondicion = str_replace('&#39;' , "'", $PDF_TxtCondicion);
$y -= $PDF_OffsetDescripcion;
$sx = $Ancho+$MargenHoja;
if( $PDF_TxtCondicion != '' ){
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['CONDITION_TEXT']['COLOR'], 'fill' );
ePDF_ShowXY( $p, $PDF_TxtCondicion, $sx, $y );
PDF_restore($p);
}
$sx += strlen($PDF_TxtCondicion)*$FontPuntos;
PDF_save($p);
$font = PDF_findfont( $p, 'Courier-Bold', 'host', 0 );
PDF_setfont( $p, $font, $FontSizeTH );
for( $n=0; $n<count($_DimCondicion); $n++ ){
if( trim($_DimCondicion[$n])=="" ) continue;
$_DimCondicion[$n] = eStripTags($_DimCondicion[$n], true);
if( $PDF_Colors ) SetColor( $p, $_Color['CIRCLE']['COLOR'], 'fill' );
PDF_circle( $p, $sx, $y+$FontPuntos/2, 1.5 ); pdf_fill($p);
if( $PDF_Colors ) SetColor( $p, $_Color['CONDITION_VALUE']['COLOR'], 'fill' );
if( ($sx+(1*$FontPuntos)+strlen($_DimCondicion[$n])*$FontPuntos)>($HojaAncho-$MargenHoja) ){
$AnchoLibre = ($HojaAncho-$MargenHoja) - ($sx+(1*$FontPuntos));
$AnchoLibre = $AnchoLibre / $FontPuntos;
$Dim = explode("\n",wordwrap($_DimCondicion[$n],$AnchoLibre,"\n"));
for( $ii=0; $ii<count($Dim); $ii++ ){
if( $ii>0 ) $y -= $AltoLineas;
PDF_show_xy( $p, $Dim[$ii], $sx+(1*$FontPuntos), $y );
}
}else{
PDF_show_xy( $p, $_DimCondicion[$n], $sx+(1*$FontPuntos), $y );
}
$GLOBALS['_yUltimaLinea'] = $y;
$y -= $AltoLineas;
}
PDF_restore($p);
}
$GLOBALS['_yPrimeraLinea'] = $GLOBALS['_yUltimaLinea'];
}
function getY($y, $AltoFont=0){
return $y;
}
function Cabecera( $nPag ){
global $p, $PDF_xMargen, $PDF_OffsetCabecera, $_RowSpan, $_Color, $PDF_Colors, $_THCOLSPAN, $_PDFINCLUDE;
global $y, $HojaAlto, $PDF_yMargen, $AltoLineas, $Separador, $PDF_FontSize, $FontPuntos, $_PDFCOLBORDER;
global $Titulos, $xTitulos, $yTitulos, $InicioY, $_AnchoPt, $ascender, $FontFamilyTH, $FontSizeTH, $_AltoTH;
if( $nPag==-1 && $_PDFINCLUDE['FH']!='' ) PDFIncludeFH($p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas']);
if( $_PDFINCLUDE['EH']!='' ) PDFIncludeEH($p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas']);
$_RowSpan = array();
PDF_setcolor( $p,'stroke','rgb', 0.0, 0.0, 0.0, 0 );
PDF_setcolor( $p,'fill'  ,'rgb', 0.0, 0.0, 0.0, 0 );
$MinY = $y;
$InicioY = $y;
PDF_save($p);
$incr = 0;
for( $n=0; $n<count($Titulos); $n++ ){
$incr += $_AnchoPt[$n];
$sy = $y + $yTitulos[$n];
for( $i=0; $i<count($Titulos[$n]); $i++ ){
$sy -= $AltoLineas;
if( $MinY > $sy ) $MinY = $sy;
}
}
if( $PDF_Colors ){
SetColor( $p, $_Color['TH']['BACKGROUND'], 'fill' );
SetColor( $p, $_Color['TABLE']['BACKGROUND'], 'stroke' );
}else{
PDF_setcolor( $p, 'fill', 'gray', 0.75, 0, 0, 0 );
}
$NuevaY = $y+$AltoLineas-($ascender/2) + $MinY-$y-($ascender/2);
PDF_rect( $p, $PDF_xMargen, $y+$AltoLineas-($ascender/2), $incr, $MinY-$y-($ascender/2) );
PDF_closepath_fill_stroke($p);
if( count($_THCOLSPAN)>0 ){
if( $nPag==-1 ){
global $PDF_AnchoSombra;
if( $PDF_Colors ){
SetColor($p, $_Color['TABLE']['BACKGROUND'], 'stroke');
}else{
PDF_setcolor($p,'stroke','rgb', 0.0, 0.0, 0.0, 0);
}
$incr = 0;
$tLineas = count($_AnchoPt);
if( $_PDFCOLBORDER[0] != 0 ){
PDF_setlinewidth( $p, $_PDFCOLBORDER[0] );
PDF_moveto( $p, $PDF_xMargen+$incr, $y+$AltoLineas-($ascender/2) );
PDF_lineto( $p, $PDF_xMargen+$incr, $y+$AltoLineas-($ascender/2)+($MinY-$y-($ascender/2)) );
PDF_closepath_fill_stroke($p);
}
for( $n=0; $n<$tLineas; $n++ ){
$incr += $_AnchoPt[$n];
if( $_AnchoPt[$n] > 0 && $_PDFCOLBORDER[$n+1] != 0 ){
PDF_setlinewidth( $p, $_PDFCOLBORDER[$n+1] );
PDF_moveto( $p, $PDF_xMargen+$incr, $y+$AltoLineas-($ascender/2) );
PDF_lineto( $p, $PDF_xMargen+$incr, $y+$AltoLineas-($ascender/2)+($MinY-$y-($ascender/2)) );
PDF_closepath_fill_stroke($p);
}
PDF_setlinewidth( $p, 0.1 );
}
if( $PDF_AnchoSombra > 0 && $_PDFCOLBORDER[$n] != 0 ){
PDF_moveto( $p, $PDF_xMargen+$incr+$PDF_AnchoSombra, $InicioY+$Des-$PDF_OffsetSombra );
PDF_lineto( $p, $PDF_xMargen+$incr+$PDF_AnchoSombra,		  $y+$Des-$PDF_AnchoSombra+($MinY-$y-($ascender/2)) );
PDF_closepath_fill_stroke($p);
}
}else{
global $_ConColSpan;
if( $PDF_Colors ){
SetColor( $p, $_Color['TH']['BACKGROUND'], 'stroke' );
}else{
PDF_setcolor( $p, 'stroke', 'gray', 0.75, 0, 0, 0 );
}
$incr = 0;
$tLineas = count($_AnchoPt);
PDF_setlinewidth( $p, 0.2 );
for( $n=0; $n<$tLineas; $n++ ){
$incr += $_AnchoPt[$n];
if( $_AnchoPt[$n] > 0 && $_PDFCOLBORDER[$n+1] != 0 && !$_ConColSpan[$n] ){
PDF_moveto( $p, $PDF_xMargen+$incr					, $y+$AltoLineas-($ascender/2) );
PDF_lineto( $p, $PDF_xMargen+$incr-$_AnchoPt[$n], $y+$AltoLineas-($ascender/2) );
PDF_closepath_fill_stroke($p);
}
}
}
}
$_AltoTH = $MinY-$y-($ascender/2);
PDF_restore($p);
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['TH']['COLOR'], 'fill' );
$font = PDF_findfont( $p, $FontFamilyTH, 'host', 0 );
PDF_setfont( $p, $font, $FontSizeTH );
$incr = 0;
for( $n=0; $n<count($Titulos); $n++ ){
$incr += $_AnchoPt[$n];
$sy = $y + $yTitulos[$n];
for( $i=0; $i<count($Titulos[$n]); $i++ ){
$Celda = $Titulos[$n][$i];
ePDF_ShowXY( $p, $Celda, $PDF_xMargen+$xTitulos[$n][$i], $sy );
$sy -= $AltoLineas;
if( $MinY > $sy ) $MinY = $sy;
}
}
PDF_restore($p);
$y = $MinY - $ascender + ($ascender/2);
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
global $_PDFWRAP, $_AnchoCol, $_PDFWRAPCOL, $_SelVirtualType;
$MultiLinea = array();
$ConPDFWrap = 1;
for( $n=0; $n<count($row); $n++ ){
if( !$Visible[$n] ) continue;
$Celda = $row[$n];
if( !empty( $_ADDOPTION[ $_Form[$n][1] ] ) ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}else{
$Celda = trim($row[$n]);
if( $_Form[$n][3] == 'H' ){
$Celda = strip_tags( str_replace('<BR>',"\n",$Celda) );
$Celda = str_replace('&#39;' ,"'",$Celda);
$Celda = str_replace('&quot;','"',$Celda);
}else if( $_Form[$n][2] == '#' ){
$Celda = urldecode( $Celda );
$Celda = str_replace('&#43;','+',$Celda);
$Celda = str_replace('&#92;','\\',$Celda);
}else if( $_Form[$n][2] == 'o' ){
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
if( $_Form[$n][3] != 'H' ) $Celda = ePDF_ReplaceChr($Celda);
if( ($_Form[$n][2]=='F4' && isZero($Celda)) || ($_Form[$n][2]=='CDI' && isZero($Celda)) ){
$Celda = '';
}else{
if( $_FORMAT[$n]!='' ){
if( $_NOZERO[$n] == 'S' ){
if( isZero($Celda) ){
$Formato = '$Celda = "";';
}else{
$Formato = '$Celda = '.str_replace( '#', $Celda, $_FORMAT[$n] ).';';
}
}else{
$Formato = '$Celda = '.str_replace( '#', $Celda, $_FORMAT[$n] ).';';
}
if( substr($Formato,-3)=='();' ){
$Celda = call_user_func( substr($Formato,9,-3), $n, $Celda );
}else{
if( $Formato=='$'."Celda = eNumberFormat(#,2)" ){
$Celda = eNumberFormat($Celda,2);
}else if( $Formato=='$'."Celda = eNumberFormat(#,0)" ){
$Celda = eNumberFormat($Celda,0);
}else if( $Formato=='$Celda = "";' || $Celda=="" ){
$Celda = '';
}else{
@eval($Formato);
}
}
}else{
if( $_NOZERO[$n] == 'S' ){
if( isZero($Celda) ) $Celda = '';
}
}
}
$Celda = str_replace('&amp;' ,'&',$Celda);
$Celda = str_replace('&quot;','"',$Celda);
$Celda = str_replace('&nbsp;',' ',$Celda);
if( ($_PDFWRAP[0]>1 && strlen($Celda)>$_AnchoCol[$n] && $_PDFWRAPCOL[$n]) || $_Form[$n][3]=='H' || $_SELECTMULTIPLE[$_Form[$n][1]]>0 ){
if( !$_PDFWRAP[1] ){
$Celda = str_replace("\n",' ',$Celda);
$Celda = str_replace("\r",' ',$Celda);
}
$Celda = preg_replace('/&nbsp;/i', ' ', $Celda);
$Celda = preg_replace('/<br>/i', "\n", $Celda);
$NewTxt = explode("\n", wordwrap(chop($Celda), $_AnchoCol[$n], "\n", 1));
for( $i=0; $i<count($NewTxt); $i++ ){
$NewTxt[$i] = trim($NewTxt[$i]);
if( $NewTxt[$i]!='' ) $MultiLinea[$n][] = $NewTxt[$i];
}
$Celda = $MultiLinea[$n][0];
if( $ConPDFWrap < count($MultiLinea[$n]) ) $ConPDFWrap = count($MultiLinea[$n]);
if( $_PDFWRAP[0] < count($MultiLinea[$n]) ){
$MultiLinea[$n][$_PDFWRAP[0]-1] = substr( $MultiLinea[$n][$_PDFWRAP[0]-1], 0, $_AnchoCol[$n]-3 ).'...';
}
}
$MaxAlto = max(count($MultiLinea[$n]),$MaxAlto);
}
return array( $MaxAlto, $ConPDFWrap );;
}
function Fila( $row ){
global $p, $y, $PDF_Separacion, $Separador, $FontPuntos, $AltoLineas, $PDF_xMargen, $MargenDerecho, $_GrisCabecera, $_SepGrupoUno;
global $Visible, $_Form, $_ADDOPTION, $_SelVirtual, $_HayRadio, $_RADIO, $_FORMAT, $_ALIGN, $_PDFCOLSSHADE, $_OpRegMedia;
global $_AnchoCol, $_COLSOP, $_OpCol, $_OpSubCol, $_UltimoDato, $_AnchoPt, $_TGrupos, $AnchoTotal, $_AlignCabecera;
global $ascender, $descender, $ConSubTotales, $_InfSinTotales, $_GREENBAR, $PDF_Grid, $PDF_ShadowRows, $PDF_LineRows, $_NumReg;
global $_PDFWRAP, $_MaxPDFWRAP, $_xPDFWRAP, $_NOZERO, $_UltimaFila, $_RowSpan, $_Color, $PDF_Colors, $PDF_FontSize, $_PDFWRAPCOL;
global $_OldValGrupo, $_FORMATPHP, $_FORMATTOTALSPHP, $_RADIOLIST, $_CHECKLIST, $_SELECTMULTIPLE, $PDF_ColorRows, $_SelVirtualType;
global $_COLSNOREPEAT, $_COLSBAK, $_COLSNOREPEATFILL, $_SummaryGroupTitle, $_SummaryNoHeaders, $_COLSOPPREFIX, $UltimaLinea, $DataHeight;
global $_ROWSOP, $_OpLin, $_OpLinCol, $_exeROWSOPCALC;
global $_PDFBackgroundColor, $_PDFColor, $_PDFLineRows, $_PDFRowShadow, $_Summary, $_CHARTCOL, $_ChartMin, $_ChartMax, $_ChartLong, $_PDFCOL;
$sy = $y;
$MaxAlto = 1;
if( $_PDFWRAP[0] > 1 ){
list( $MaxAlto, $ConPDFWrap ) = CuentaLineasTextarea( $row );
if( ($y-$AltoLineas*min($MaxAlto,$ConPDFWrap)) < $UltimaLinea ){
iNuevaPagina();
}
}
$Ancho = 0;
if( !$ConSubTotales && !$_InfSinTotales ){
for( $n=0; $n<count($row); $n++ ){
if( $_COLSOP[$n] == 'L' ){
$incr = $ascender-$descender;
if( $_Form[$n][2] == '#' ){
$row[$n] = urldecode( $row[$n] );
$row[$n] = str_replace('&#43;','+',$row[$n]);
$row[$n] = str_replace('&#92;','\\',$row[$n]);
}else if( $_Form[$n][3]=='H' ){
$row[$n] = str_replace('&#39;' ,"'",$row[$n]);
$row[$n] = str_replace('&quot;','"',$row[$n]);
}
$Celda = $row[$n];
$Old = ''; $New = '';
for( $i=$n; $i>=0; $i-- ){
$Old .= $_UltimoDato[$n];
$New .= $row[$n];
}
if( $Old != $New ){
if( $ConSubTotales ){
Fin( true );
}else{
PDF_save($p);
if( $PDF_Colors ){
SetColor( $p, $_Color['TABLE']['BACKGROUND'], 'stroke' );
}else{
PDF_setcolor( $p, 'fill', 'gray', 0.97, 0, 0, 0 );
}
$y += 0.1*5;
PDF_moveto( $p, $PDF_xMargen			   , $y+$incr );
PDF_lineto( $p, $PDF_xMargen+$MargenDerecho, $y+$incr );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
$y += $descender;
$y += 0.1*5;
}
}
$_UltimoDato[$n] = $Celda;
break;
}
}
}else{
for( $n=count($row)-1; $n>=0; $n-- ){
if( $_COLSOP[$n] == 'S' ){
$incr = $ascender-$descender;
$Celda = $row[$n];
$Old = ''; $New = '';
for( $i=$n; $i>=0; $i-- ){
$Old .= $_UltimoDato[$i];
$New .= $row[$i];
}
if( $Old != $New && !$_InfSinTotales ){
if( $ConSubTotales ){
Fin( true, true, $n );
}else{
PDF_moveto( $p, $PDF_xMargen				, $y+$incr );
PDF_lineto( $p, $PDF_xMargen+$MargenDerecho	, $y+$incr );
PDF_closepath_fill_stroke($p);
$y += $descender;
}
}
}
}
for( $n=0; $n<count($row); $n++ ){
if( $_COLSOP[$n] == 'S' ){
$incr = $ascender-$descender;
$Celda = $row[$n];
$Old = ''; $New = '';
for( $i=$n; $i>=0; $i-- ){
$Old .= $_UltimoDato[$i];
$New .= $row[$i];
}
if( $Old!=$New ){
for($i=$n+1; $i<count($_UltimoDato); $i++) $_UltimoDato[$i]=null;
if( $ConSubTotales || $_InfSinTotales ){
PDF_save($p);
if( $PDF_Colors ){
SetColor( $p, $_Color['GROUPHEADER_'.($n+1)]['BACKGROUND'], 'fill' );
}else{
PDF_setcolor( $p, 'fill', 'gray', $_GrisCabecera[$n], 0, 0, 0 );
if( $n==0 ) $y -= $_SepGrupoUno;
}
PDF_rect( $p, $PDF_xMargen, $y-($ascender/2), $MargenDerecho, ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
$incr = ( ($FontPuntos * $PDF_Separacion ) / 2 );
if( $_ADDOPTION[ $_Form[$n][1] ] != '' ) $Celda = $_SelVirtual[ $_Form[$n][1] ][$Celda];
if( $_COLSOPPREFIX[$n]<>'' ) $Celda = $_COLSOPPREFIX[$n].' '.$Celda;
$Celda = trim(strip_tags($Celda));
if( !$PDF_Colors && count($_AlignCabecera) > 0 ){
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
if( $_TGrupos > 0 ) $sCelda = str_repeat(' ',$n*2).$sCelda;
$_SummaryGroupTitle[$n] = str_repeat(' ',strlen($sCelda)-strlen(trim($sCelda))).$_Form[$n][0].': '.trim($sCelda);
if( !$_SummaryNoHeaders ){
PDF_save($p);
if( $ConSubTotales && $PDF_Colors ){
SetColor( $p, $_Color['GROUPHEADER_'.($n+1)]['COLOR'], 'fill' );
SetFuente('GROUPHEADER_'.($n+1));
}
ePDF_ShowXY( $p, substr($sCelda,0,$AnchoTotal), (double)($PDF_xMargen+$incr), (double)$y );
PDF_restore($p);
for( $i=0; $i<count($row); $i++ ) $_RowSpan[$i+1][] = $y;
$y -= ($AltoLineas*1);
}
}else{
PDF_moveto( $p, $PDF_xMargen			   , $y+$incr );
PDF_lineto( $p, $PDF_xMargen+$MargenDerecho, $y+$incr );
PDF_closepath_fill_stroke($p);
$y += $descender;
}
}
$_UltimoDato[$n] = $Celda;
}else{
break;
}
}
}
if( $_GREENBAR ){
if( $_NumReg % 2 != 0 ){
PDF_save($p);
if( $PDF_Colors ){
SetColor( $p, $_Color['GREENBAR']['BACKGROUND'], 'fill' );
SetColor( $p, $_Color['GREENBAR']['COLOR'], 'stroke' );
}else{
PDF_setcolor( $p, 'fill', 'gray', 0.97, 0, 0, 0 );
}
PDF_setdash( $p, 0, 1000 );
PDF_rect( $p, $PDF_xMargen, $y-($ascender/2), $MargenDerecho, ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
}
}
if( $PDF_ShadowRows[$_NumReg]==true || $_PDFRowShadow==true ){
PDF_save($p);
PDF_setcolor( $p, 'fill', 'gray', 0.90, 0, 0, 0 );
PDF_setdash( $p, 0, 1000 );
PDF_rect( $p, $PDF_xMargen, $y-($ascender/2), $MargenDerecho, ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
}
$incr = (($FontPuntos * $PDF_Separacion)/2);
$ConPDFWrap = 1;
$MultiLinea = array();
if( $PDF_Colors ){
PDF_save($p);
if( ($_GREENBAR && ($_NumReg % 2)!=0) || ($PDF_ShadowRows[$_NumReg]==true || $_PDFRowShadow==true) ){
if( $PDF_ColorRows[$_NumReg]!='' ){
SetColor( $p, $PDF_ColorRows[$_NumReg], 'fill' );
SetColor( $p, $PDF_ColorRows[$_NumReg], 'stroke' );
}else{
SetColor( $p, $_Color['GREENBAR']['BACKGROUND'], 'fill' );
SetColor( $p, $_Color['GREENBAR']['BACKGROUND'], 'stroke' );
}
}else{
SetColor( $p, $_Color['TD']['BACKGROUND'], 'fill' );
SetColor( $p, $_Color['TD']['BACKGROUND'], 'stroke' );
}
PDF_rect( $p, $PDF_xMargen, $y-($ascender/2), $MargenDerecho, ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
}
$_OpLin = 0;
for( $n=0; $n<count($row); $n++ ){
if( $_COLSOP[$n] == 'S' ) for( $g=0; $g<$_TGrupos; $g++ ) $_OpSubCol[$g][$n]++;
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
for( $g=0; $g<$_TGrupos; $g++ ){
$_OpSubCol[$g][$n] += $Celda;
$_OpRegMedia[$g][$n]++;
}
break;
case 'C':
case 'R':
$_OpCol[$n]++;
for( $g=0; $g<$_TGrupos; $g++ ) $_OpSubCol[$g][$n]++;
break;
case '#':
if( isZero($Celda) ){
$_OpCol[$n]++;
for( $g=0; $g<$_TGrupos; $g++ ) $_OpSubCol[$g][$n]++;
}
break;
}
}
if( !empty( $_ADDOPTION[ $_Form[$n][1] ] ) ){
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
}else if( $_SELECTMULTIPLE[ $_Form[$n][1] ] > 0 && $Celda!='' ){
if( $_SelVirtualType[ $_Form[$n][1] ] != 'T' ){
$tmp = explode(',',$Celda);
$Celda = '';
for( $i=1; $i<count($tmp)-1; $i++ ){
if( $i>1 ) $Celda .= ', ';
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
if( $_Form[$n][3] != 'H' ) $Celda = ePDF_ReplaceChr($Celda);
if( preg_match('/^(P4|F4|CDI)$/', $_Form[$n][2]) ){
$Celda = eDataFormat($Celda, $_Form[$n][2]);
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
$Celda = eDataFormat($Celda,2);
}else if( $Formato=='$'."Celda = eNumberFormat(#,0)" ){
$Celda = eDataFormat($Celda,0);
}else if( $Formato=='$Celda = "";' ){
$Celda = '';
}else{
@eval($Formato);
}
}
}else{
if( $_NOZERO[$n]=='S' ){
if( isZero($Celda) ) $Celda = "";
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
PDF_save($p);
if( $PDF_Colors ){
SetColor( $p, $BackgroundColor, 'fill' );
}else{
SetColor( $p, $BackgroundColor, 'fill' );
}
PDF_setdash( $p, 0, 1000 );
PDF_rect( $p, (double)($PDF_xMargen+$incr) - (($Ancho+$PDF_Separacion)*$FontPuntos)/2, $y-($ascender/2)-0.1, $_AnchoPt[$n], ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
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
if( $PDF_Colors ) SetColor($p, $_Color['TD']['COLORFILL'], 'both');
switch( gettype($_PDFColor) ){
case 'array':
if( $_PDFColor[$n]<>"" ) SetColor($p, $_PDFColor[$n], 'both');
break;
case 'string':
if( $_PDFColor<>"" ) SetColor($p, $_PDFColor, 'both');
break;
}
}else{
if( $PDF_Colors ) SetColor($p, $_Color['TD']['COLOR'], 'both');
switch( gettype($_PDFColor) ){
case 'array':
if( $_PDFColor[$n]<>"" ) SetColor($p, $_PDFColor[$n], 'both');
break;
case 'string':
if( $_PDFColor<>"" ) SetColor($p, $_PDFColor, 'both');
break;
}
}
$_UltimaFila[$n] = Array( strip_tags($Celda), (double)($PDF_xMargen+$incr), (double)$y );
if( !$_Summary ) ePDF_ShowXY($p, $Celda, (double)($PDF_xMargen+$incr), (double)$y);
$incr += $_AnchoPt[$n];
}
if( $_CHARTCOL[0]>0 ){
$xi = (double)($PDF_xMargen+$incr);
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
PDF_fit_image($p, $imagen, $xi, $yi, "boxsize {".$long." ".$PDF_FontSize."} fitmethod meet");
}
if( $_Summary ) $y += $AltoLineas;
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
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['TABLE']['BACKGROUND'], 'stroke' );
$incr = ($AltoLineas*1)-($ascender/2);
PDF_setlinewidth( $p, 0.01 );
PDF_moveto( $p, $PDF_xMargen				, $y+($incr) );
PDF_lineto( $p, $PDF_xMargen+$MargenDerecho	, $y+($incr) );
PDF_stroke($p);
PDF_restore($p);
}
if( $PDF_LineRows[$_NumReg]==true ){
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['TABLE']['BACKGROUND'], 'fill' );
$incr = ($AltoLineas*1)-($ascender/2);
PDF_moveto( $p, $PDF_xMargen			   , $y+($incr) );
PDF_lineto( $p, $PDF_xMargen+$MargenDerecho, $y+($incr) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
}
if( $_PDFWRAP[2]>0 ) $ConPDFWrap = $_PDFWRAP[2];
if( $ConPDFWrap>1 ){
$MaxFila = min($_PDFWRAP[0],$ConPDFWrap);
if( $_PDFWRAP[2]>0 ) $MaxFila = $_PDFWRAP[2];
for( $i=1; $i<$MaxFila; $i++ ){
$y -= $AltoLineas;
if( $_GREENBAR ){
if( $_NumReg % 2 != 0 ){
PDF_save($p);
if( $PDF_Colors ){
SetColor( $p, $_Color['GREENBAR']['BACKGROUND'], 'fill' );
SetColor( $p, $_Color['GREENBAR']['BACKGROUND'], 'stroke' );
}else{
PDF_setcolor( $p, 'fill', 'gray', 0.97, 0, 0, 0 );
}
PDF_setdash( $p, 0, 1000 );
PDF_rect( $p, $PDF_xMargen, $y-($ascender/2), $MargenDerecho, ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
}
}
if( $PDF_ShadowRows[$_NumReg] == true ){
PDF_save($p);
if( $PDF_Colors ){
SetColor( $p, $_Color['GREENBAR']['BACKGROUND'], 'fill' );
SetColor( $p, $_Color['GREENBAR']['BACKGROUND'], 'stroke' );
}else{
PDF_setcolor( $p, 'fill', 'gray', 0.90, 0, 0, 0 );
}
PDF_setdash( $p, 0, 1000 );
PDF_rect( $p, $PDF_xMargen, $y-($ascender/2), $MargenDerecho, ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
}
for( $n=0; $n<count($row); $n++ ){
if( $_PDFCOLSSHADE[$n]!='' ){
PDF_save($p);
if( $PDF_Colors ){
SetColor( $p, $_PDFCOLSSHADE[$n], 'fill' );
}else{
PDF_setcolor( $p, 'fill', 'gray', $_PDFCOLSSHADE[$n], 0, 0, 0 );
}
PDF_setdash( $p, 0, 1000 );
PDF_rect( $p, (double)($_xPDFWRAP[$n] - (($Ancho+$PDF_Separacion)*$FontPuntos)/2), $y-($ascender/2)-0.1, $_AnchoPt[$n], ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
}
if( $MultiLinea[$n][$i] != '' ){
if( $PDF_Colors && !($_GREENBAR && $_NumReg % 2 != 0) ){
PDF_save($p);
if( $_PDFCOLSSHADE[$n]!='' ){
SetColor( $p, $_PDFCOLSSHADE[$n], 'fill' );
SetColor( $p, $_Color['TD']['BACKGROUND'], 'stroke' );
}else{
SetColor( $p, $_Color['TD']['BACKGROUND'], 'fill' );
SetColor( $p, $_Color['TD']['BACKGROUND'], 'stroke' );
}
PDF_rect( $p, (double)($_xPDFWRAP[$n] - (($Ancho+$PDF_Separacion)*$FontPuntos)/2), $y-($ascender/2)-0.1, $_AnchoPt[$n], ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
}
$Celda = substr($MultiLinea[$n][$i], 0, $_AnchoCol[$n]);
ePDF_ShowXY( $p, $Celda, $_xPDFWRAP[$n], (double)$y );
}else{
if( $PDF_Colors && !($_GREENBAR && $_NumReg % 2 != 0) ){
PDF_save($p);
if( $_PDFCOLSSHADE[$n]!='' ){
SetColor( $p, $_PDFCOLSSHADE[$n], 'fill' );
SetColor( $p, $_Color['TD']['BACKGROUND'], 'stroke' );
}else{
SetColor( $p, $_Color['TD']['BACKGROUND'], 'fill' );
SetColor( $p, $_Color['TD']['BACKGROUND'], 'stroke' );
}
PDF_rect( $p, (double)($_xPDFWRAP[$n] - (($Ancho+$PDF_Separacion)*$FontPuntos)/2), $y-($ascender/2)-0.1, $_AnchoPt[$n], ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
}
}
}
}
}
$y -= $AltoLineas;
if( $DataHeight>0 && ($sy-$y)<$DataHeight ) $y -= $DataHeight-($sy-$y);
}
function Pie(){
global $p, $PDF_xMargen, $MargenHoja, $ascender, $nPag, $HojaAncho, $HojaAlto, $PDF_Colors, $_Color, $_FORMATTOTALSCS;
global $_AnchoPt, $FontPuntos, $InicioY, $y, $AltoLineas, $PDF_y2Margen, $_RowSpan, $_PDFINCLUDE;
global $PDF_AnchoSombra, $PDF_OffsetSombra, $PDF_NumPagina, $PDF_TxtPagina, $_AltoTH, $_PDFCOLBORDER, $_SePintoPie, $_PDFSHEET;
$_SePintoPie = true;
if( $nPag==1 && $_PDFINCLUDE['FB'] != '' ) PDFIncludeFB( $p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas'] );
if( $_PDFINCLUDE['EB'] != '' ) PDFIncludeEB( $p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas'] );
$Des = ($AltoLineas*1)-($ascender/2);
$_PDFSHEET = array(
$PDF_xMargen+$incr,
$InicioY+$Des,
$HojaAncho-$PDF_xMargen,
$y+$Des
);
if( $PDF_Colors ) SetColor( $p, $_Color['TABLE']['BACKGROUND'], 'both' );
$incr = 0;
$tLineas = count($_AnchoPt);
if( $_PDFCOLBORDER[0] != 0 ){
PDF_setlinewidth( $p, $_PDFCOLBORDER[0] );
PDF_moveto( $p, $PDF_xMargen+$incr, $InicioY+$Des );
PDF_lineto( $p, $PDF_xMargen+$incr, $y+$Des );
PDF_closepath_fill_stroke($p);
}
for( $n=0; $n<$tLineas; $n++ ){
$incr += $_AnchoPt[$n];
if( $_AnchoPt[$n] > 0 && $_PDFCOLBORDER[$n+1] != 0 ){
PDF_setlinewidth( $p, $_PDFCOLBORDER[$n+1] );
if( count($_RowSpan[$n]) == 0 || $n+1==$tLineas ){
PDF_moveto( $p, $PDF_xMargen+$incr, $InicioY+$Des );
if( $_FORMATTOTALSCS > $n+1 ){
PDF_lineto( $p, $PDF_xMargen+$incr, $y+$Des+$AltoLineas );
}else{
PDF_lineto( $p, $PDF_xMargen+$incr, $y+$Des );
}
}else{
$sIni = $InicioY+$Des;
$sFin = $y+$Des;
for( $i=0; $i<count($_RowSpan[$n]); $i++ ){
PDF_moveto( $p, $PDF_xMargen+$incr, $sIni );
PDF_lineto( $p, $PDF_xMargen+$incr, $_RowSpan[$n][$i]-($ascender/2)+($AltoLineas*1) );
$sIni = $_RowSpan[$n][$i]-($ascender/2);
}
PDF_moveto( $p, $PDF_xMargen+$incr, $sIni );
if( $_FORMATTOTALSCS > $n+1 ){
PDF_lineto( $p, $PDF_xMargen+$incr, $y+$Des+$AltoLineas );
}else{
PDF_lineto( $p, $PDF_xMargen+$incr, $y+$Des );
}
}
PDF_closepath_fill_stroke($p);
}
PDF_setlinewidth( $p, 0.1 );
}
if( $PDF_AnchoSombra > 0 && $_PDFCOLBORDER[$n] != 0 ){
PDF_moveto( $p, $PDF_xMargen+$incr+$PDF_AnchoSombra, $InicioY+$Des-$PDF_OffsetSombra );
PDF_lineto( $p, $PDF_xMargen+$incr+$PDF_AnchoSombra,	   $y+$Des-$PDF_AnchoSombra  );
}
PDF_moveto( $p, $PDF_xMargen	  , $y+$Des );
PDF_lineto( $p, $PDF_xMargen+$incr, $y+$Des );
$GLOBALS['_yUltimaLinea'] = $y+$Des;
if( $PDF_AnchoSombra > 0 ){
PDF_moveto( $p, $PDF_xMargen+$PDF_OffsetSombra	   , $y+$Des-$PDF_AnchoSombra );
PDF_lineto( $p, $PDF_xMargen+$PDF_AnchoSombra+$incr, $y+$Des-$PDF_AnchoSombra );
$GLOBALS['_yUltimaLinea'] = $y+$Des-$PDF_AnchoSombra;
}
PDF_closepath_fill_stroke($p);
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
ePDF_ShowXY( $p, $txt, $x, $PDF_y2Margen );
}
if( $_PDFINCLUDE['EA'] != '' ) PDFIncludeEA( $p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas'] );
if( $nPag==1 && $_PDFINCLUDE['FA'] != '' ) PDFIncludeFA( $p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'], explode('|',$GLOBALS['uBreakPage']), $GLOBALS['AltoLineas'] );
$y -= $PDF_OffsetPie;
return;
}
function Fin( $SubTotal, $ConGrupos=false, $NivelGrupo=0 ){
global $p, $PDF_xMargen, $_COLSOP, $_oCOLSOP, $_OpCol, $_OpSubCol, $y, $AltoLineas, $ascender, $MargenDerecho, $_GRID, $_GrisSubTotal, $_OldValGrupo;
global $FontPuntos, $PDF_Separacion, $_AnchoPt, $Visible, $_NOZERO, $_UltimoDato, $_RowSpan, $_Color, $PDF_Colors, $_SepGrupoUno, $PDF_Grid;
global $_FORMAT, $_FORMATTOTALS, $_AnchoCol, $_PDFCOL, $_ALIGN, $_NumReg, $_TGrupos, $_OpDeGrupo, $_GrupoColSpan, $_TextGrupo, $_BreakPage;
global $_FORMATTOTALSPHP, $_OpRegMedia, $_NameField, $_SelVirtual, $_ADDOPTION, $_Form, $PDF_OffsetGroup, $_InfSinTotales, $_SummaryGroupTitle, $_SummaryNoHeaders;
global $_ROWSOP, $_OpLin, $_OpLinCol, $_exeROWSOPCALC, $_FORMATTOTALSALIGN;
if( !$SubTotal && $_InfSinTotales ) return;
if( count($_COLSOP) == 0 ) return;
if( !$SubTotal && !$ConGrupos ) $y -= $_SepGrupoUno;
PDF_save($p);
if( $PDF_Colors ){
if( $ConGrupos ){
SetColor( $p, $_Color['GROUPSUBTOTAL_'.($NivelGrupo+1)]['BACKGROUND'], 'fill' );
SetColor( $p, $_Color['GROUPSUBTOTAL_'.($NivelGrupo+1)]['BACKGROUND'], 'stroke' );
SetFuente( 'GROUPSUBTOTAL_'.($NivelGrupo+1) );
}else{
SetColor( $p, $_Color['TOTALS']['BACKGROUND'], 'fill' );
SetColor( $p, $_Color['TOTALS']['BACKGROUND'], 'stroke' );
SetFuente( 'TOTALS' );
}
}else{
PDF_setcolor( $p, 'fill', 'gray', (($SubTotal) ? $_GrisSubTotal[$NivelGrupo]: 0.75), 0, 0, 0 );
}
PDF_rect( $p, $PDF_xMargen, $y-($ascender/2), $MargenDerecho, ($AltoLineas*1) );
PDF_closepath_fill_stroke($p);
PDF_restore($p);
if( count($_GRID)>0 ){
if( !$SubTotal ){
$t = 0;
for( $n=$_TGrupos; $n<count($_AnchoPt); $n++ ) if( $_COLSOP[$n]=='<' ) $t += $_OpCol[$n-1];
for( $n=$_TGrupos; $n<count($_AnchoPt); $n++ ) if( $_COLSOP[$n]=='<' ) $_OpCol[$n] = ($_OpCol[$n-1]*100)/$t;
}else{
$t = 0;
for( $n=$_TGrupos; $n<count($_AnchoPt); $n++ ) if( $_COLSOP[$n]=='<' ) $t += $_OpSubCol[$NivelGrupo][$n-1];
for( $n=$_TGrupos; $n<count($_AnchoPt); $n++ ) if( $_COLSOP[$n]=='<' ) $_OpSubCol[$NivelGrupo][$n] = ($_OpSubCol[$NivelGrupo][$n-1]*100)/$t;
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
for( $n=0; $n<count($_AnchoPt); $n++ ) $SaltarCelda[$n] = false;
if( $ConGrupos && $_GrupoColSpan > 1 ) for( $n=1; $n<$_GrupoColSpan; $n++ ) $SaltarCelda[$n+$_TGrupos] = true;
$_vF = array();
$incr = ( ($FontPuntos * $PDF_Separacion) / 2 );
for( $n=0; $n<count($_AnchoPt); $n++ ){
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
$Formato = '$Celda = '.str_replace( '#', $Celda, $_FORMATTOTALS[$n] ).';';
if( substr($Formato,-3)=='();' ){
$Celda = call_user_func( substr($Formato,9,-3), $n, $_OpCol );
}else if( $Celda==="" ){
}else{
@eval( $Formato );
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
}else if( substr_count('<=>"'."'",$_COLSOP[$n][0] ) > 0 ){
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
for( $i=$n; $i<$n+$_GrupoColSpan-1; $i++ ) $_RowSpan[$i][] = $y;
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
if( $n==$_TGrupos ) $Celda = str_repeat(' ',($NivelGrupo)*2).$Celda;
$sLen = strlen(trim($Celda));
if( $_NOZERO[$n]=='S' || $_NOZEROFORMATTOTALS[$n]=='S' ) if( isZero($Celda) ) $Celda = '';
if( $ConGrupos && $n==$_TGrupos ){
if( $_TextGrupo[$NivelGrupo]!='' ){
}else if( $_ALIGN[$n] == 'd' ){
$Celda = substr( str_repeat( ' ', $_AnchoCol[$n] ).$Celda, -($_AnchoCol[$n]) );
}elseif( $_ALIGN[$n] == 'c' ){
$Celda = str_repeat( ' ', ($_AnchoCol[$n]-strlen($Celda))/2 ).$Celda;
}
}else if( $_ALIGN[$n] != '' ){
if( $_FORMATTOTALS[$n][0]=='"' || $_FORMATTOTALS[$n][0]=="'" ){
}else if( $_ALIGN[$n] == 'd' ){
$Celda = substr( str_repeat( ' ', $_AnchoCol[$n] ).$Celda, -($_AnchoCol[$n]) );
}elseif( $_ALIGN[$n] == 'c' ){
$Celda = str_repeat( ' ', ($_AnchoCol[$n]-strlen($Celda))/2 ).$Celda;
}
}
if( $_PDFCOL[$n] > 0 ){
if( $_ALIGN[$n] != '' ){
if( $_ALIGN[$n] == 'd' ){
$Celda = substr( $Celda, -($_PDFCOL[$n]) );
}elseif( $_ALIGN[$n] == 'c' ){
}
}else{
$Celda = substr( $Celda, 0, $_PDFCOL[$n] );
}
}
if( $sLen > strlen($Celda) ){
if( $PintaGrupo ){
$Celda = substr( $Celda, 0, $_nGrupoColSpan );
}else{
$Celda = str_repeat( '*', strlen($Celda) );
}
}
if( !$SaltarCelda[$n] ){
PDF_save($p);
if( $PDF_Colors ){
if( $ConGrupos ){
SetColor( $p, $_Color['GROUPSUBTOTAL_'.($NivelGrupo+1)]['COLOR'], 'fill' );
SetFuente( 'GROUPSUBTOTAL_'.($NivelGrupo+1) );
}else{
SetColor( $p, $_Color['TOTALS']['COLOR'], 'fill' );
SetFuente( 'TOTALS' );
}
}
if( $PintaGrupo ){
$Celda = substr( $Celda, 0, $_nGrupoColSpan );
global $PDF_FontSize,$PDF_FontFamily;
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize*.8 );
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
ePDF_ShowXY( $p, $Celda, $PDF_xMargen+$incr, $y );
PDF_restore($p);
}
$incr += $_AnchoPt[$n];
}
if( $PDF_Grid ){
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['TABLE']['BACKGROUND'], 'stroke' );
$incr = ($AltoLineas*1)-($ascender/2);
PDF_setlinewidth( $p, 0.01 );
PDF_moveto( $p, $PDF_xMargen			   , $y+($incr) );
PDF_lineto( $p, $PDF_xMargen+$MargenDerecho, $y+($incr) );
PDF_stroke($p);
PDF_restore($p);
}
for( $n=0; $n<count($_AnchoPt); $n++ ){
$_OpSubCol[$NivelGrupo][$n] = 0;
$_OpRegMedia[$NivelGrupo][$n] = 0;
}
$y -= ($AltoLineas*1);
}
function CalculaTitulos( $row, &$AnchoTotal ){
global $_Form, $Separador, $PDF_Separacion, $_PDFTH, $_PDFCOL, $_AnchoCOL, $_TGrupos;
global $FontPuntos, $AltoLineas, $Titulos, $xTitulos, $yTitulos, $_AnchoColSpan;
global $_AnchoCol, $_AnchoPt, $ascender, $PDF_UpperCabecera, $Visible, $_THCOLSPAN, $THCol;
global $_ADDOPTION, $_SelVirtual, $_HayRadio, $_RADIO, $MargenDerecho, $_MaxPDFWRAP, $_PDFWRAP, $_xPDFWRAP;
global $_HEADER_ORIGINAL, $_MasColPrimera, $_COLSOP;
$sX = 0;
$MaxFilas = 0;
$iv = -1;
for( $n=0; $n<count($_Form); $n++ ){
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
list( $Ancho, $Decimales, $Alto ) = explode(',',$_Form[$n][4]);
if( $Decimales*1>0 ) $Ancho += ($Decimales*1)+1;
if( $_COLSOP[0]=="S" && $iv==0 ) $Ancho += $_MasColPrimera;
if( $Alto!='' ) $Ancho = $Decimales;
if( !empty( $_ADDOPTION[$_Form[$n][1]] ) ){
foreach( $_SelVirtual[$_Form[$n][1]] as $valor ){
$Ancho = max( $Ancho, strlen($valor) );
}
}else{
if( $_Form[$n][2] == '#' ) $row[$n] = urldecode( $row[$n] );
$Celda = trim( $row[$n] );
if( $_HayRadio ){
if( count( $_RADIO[$_Form[$n][1]] ) > 0 ){
foreach( $_RADIO[$_Form[$n][1]] as $valor ){
$Ancho = max( $Ancho, strlen($valor) );
}
}
}
}
for( $i=0; $i<count($Titulos[$n]); $i++ ){
$Titulos[$n][$i] = str_replace('&amp;' ,'&', $Titulos[$n][$i] ); $Titulos[$n][$i] = str_replace('&AMP;' ,'&', $Titulos[$n][$i] );
$Titulos[$n][$i] = str_replace('&quot;','"', $Titulos[$n][$i] ); $Titulos[$n][$i] = str_replace('&QUOT;','"', $Titulos[$n][$i] );
$Titulos[$n][$i] = str_replace('&lt;'  ,'<', $Titulos[$n][$i] ); $Titulos[$n][$i] = str_replace('&LT;'  ,'<', $Titulos[$n][$i] );
$Titulos[$n][$i] = trim($Titulos[$n][$i]);
if( $Ancho < strlen($Titulos[$n][$i]) ) $Ancho = strlen($Titulos[$n][$i]);
$xTitulos[$n][$i] = $sX;
}
$Ancho = max( $Ancho, $_AnchoColSpan[$n] );
if( $_PDFCOL[$n]!=0 && $Ancho!=$_PDFCOL[$n] ) $Ancho = $_PDFCOL[$n];
$_AnchoCol[$n] = $Ancho; $_AnchoCOL[$n] = $Ancho;
$_AnchoPt[$n] = ( $Ancho + $PDF_Separacion ) * $FontPuntos;
for( $i=0; $i<count($Titulos[$n]); $i++ ){
$xTitulos[$n][$i] = $xTitulos[$n][$i] + ((( $Ancho - strlen($Titulos[$n][$i]) ) * $FontPuntos ) / 2 ) + ( ($PDF_Separacion * $FontPuntos) / 2 );
}
$sX += ($Ancho + $PDF_Separacion ) * $FontPuntos;
if( count($Titulos[$n]) > $MaxFilas ) $MaxFilas = count($Titulos[$n]);
}
$MaxI = 0;
for( $n=0; $n<count($_Form); $n++ ){
$_xPDFWRAP[$n] = 0;
if( !$Visible[$n] ) continue;
$i = count($Titulos[$n]);
$MaxI = max($i,$MaxI);
if( $yTitulos[$n] == '' ) $yTitulos[$n] = -(( ( $MaxFilas - $i ) * $AltoLineas ) / 2 ) - ($ascender/2);
}
$MargenDerecho = $sX;
$AnchoTotal = 0;
for( $n=0; $n<count($_Form); $n++ ) $AnchoTotal += $_AnchoPt[$n];
$AnchoTotal = ( $AnchoTotal / $FontPuntos )-1;
return $sX;
}
function PintaImagen( $d ){
global $p, $IncrY, $_x1G, $_y1G, $_x2G, $_y2G;
$x = cX($d[1]);
$y = cY($d[2]) + $IncrY;
$PDF_Imagen = cT($d[3], false);
$PDF_Imagen = eScript($PDF_Imagen);
if( $d[5] != '' ) $MaxAncho = cW($d[5]);
if( $d[6] != '' ) $MaxAlto = cH($d[6]);
$TxtError = '';
$stmp = explode('.', $PDF_Imagen);
$Extension = $stmp[count($stmp)-1];
$Extension = str_replace('jpg', 'jpeg', $Extension);
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
if( $_Color['CDSCRIPT']['COLOR']=='' ) $_Color['CDSCRIPT']['COLOR'] = '#eeeeee';
if( $_Color['SHOWRECIPIENT']['COLOR']=='' ) $_Color['SHOWRECIPIENT']['COLOR'] = '#cccccc';
if( $_Color['FOOTTITLE']['COLOR']=='' ) $_Color['FOOTTITLE']['COLOR'] = '#000e4b';
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
function CalculaTitulosTH( $row, &$AnchoTotal, &$THAltoLineas=NULL ){
global $_Form, $Separador, $PDF_Separacion, $_PDFTH, $_PDFCOL, $_ConColSpan, $PDF_xMargen;
global $FontPuntos, $AltoLineas, $Titulos, $xTitulos, $yTitulos, $_AnchoCOL, $AnchoTotal;
global $_AnchoCol, $_AnchoPt, $ascender, $PDF_UpperCabecera, $Visible, $THCol, $THAltoLineas;
global $_ADDOPTION, $MargenDerecho, $_MaxPDFWRAP, $_PDFWRAP, $_xPDFWRAP, $_AnchoColSpan;
global $THVisible, $THTitulos, $TH_AnchoPt, $TH_AnchoCol, $THxTitulos, $THyTitulos, $TH_xPDFWRAP;
global $_THCOLSPAN, $_DimTHText;
global $_HEADER_ORIGINAL;
global $_TGrupos,$NCampos,$_CHARTCOL;
for($n=$_TGrupos; $n<$NCampos; $n++){
if( !$Visible[$n] ){
$_DimTHText[1][$n] = "";
}else if( $THCol[$n][2]==3 ){
$_DimTHText[1][$n] = trim($_Form[$n][0]);
}else if( $THCol[$n][2]==2 ){
if( $n+$THCol[$n][1]==$NCampos && count($_CHARTCOL)>0 && $_CHARTCOL[2]=='' ) $THCol[$n][1]++;
for( $i=$n; $i<$n+$THCol[$n][1]; $i++ ){
$_DimTHText[1][$i] = trim($THCol[$n][0]);
}
continue;
}
$_Form[$n][2] = trim( $_Form[$n][2] );
if( $THCol[$n][2] == 0 ) continue;
}
for( $n=$_TGrupos; $n<$NCampos; $n++ ) $_DimTHText[0][$n] = trim($_Form[$n][0]);
for( $i=0; $i<count($_DimTHText); $i++ ) for( $n=0; $n<count($_DimTHText[$i]); $n++ ){
if( isset($_HEADER_ORIGINAL) && $_HEADER_ORIGINAL ){
$_DimTHText[$i][$n] = $_DimTHText[$i][$n];
}else{
$_DimTHText[$i][$n] = THAMayusculas( $_DimTHText[$i][$n] );
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
for( $n=0; $n<$NCampos; $n++ ){
$_ConColSpan[$n] = false;
$NewTH[$n] = '';
$_AnchoColSpan[$n] = $_AnchoCOL[$n];
if( $_PDFCOL[$n]=='0' || !$Visible[$n] ){
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
if( $_AnchoCOL[$i] == -1 ){
while( $i>0 && $_AnchoCOL[$i]==-1 ) $i--;
}
$_ConColSpan[$i] = true;
$_AnchoCOL[$i] += ($_AnchoCOL[$n] + $PDF_Separacion);
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
for( $n=0; $n<count($_Form); $n++ ){
$OldMaxFilas = max( $OldMaxFilas, count($OldTitulos[$n]) );
$Titulos[$n] = '';
$_AnchoCol[$n] = $_AnchoCOL[$n];
$_AnchoPt[$n] = 0;
if( !$Visible[$n] ) continue;
if( $_PDFCOL[$n]=='0' ) continue;
$Titulos[$n] = explode( '<BR>', $NewTH[$n] );
$Ancho = $_AnchoCOL[$n];
for( $i=0; $i<count($Titulos[$n]); $i++ ){
$Titulos[$n][$i] = trim($Titulos[$n][$i]);
if( $Ancho < strlen($Titulos[$n][$i]) ) $Ancho = strlen($Titulos[$n][$i]);
$xTitulos[$n][$i] = $sX;
}
if( $Ancho > $_AnchoCOL[$n] ){
$Dif = $Ancho - $_AnchoCOL[$n];
$OldAnchoTotal += ( $Dif * $FontPuntos );
$sn = $n;
$p = $n;
$PorLaIz = true;
while( $Dif > 0 ){
if( $OldVisible[$p] ){
$Dif--;
$_AnchoColSpan[$p]++;
$Old_AnchoPt[$p] += $FontPuntos;
$Old_AnchoCol[$p]++;
for( $s=$p; $s<count($OldTitulos); $s++ ){
if( $s > $p || !$PorLaIz ){
for( $i=0; $i<count($OldTitulos[$s]); $i++ ){
$OldxTitulos[$s][$i] += $FontPuntos;
}
}
}
}
$p++;
if( $p > $Hasta[$n] ){
$p = $n;
$PorLaIz = !$PorLaIz;
}
}
}
$_AnchoPt[$n] = ( $Ancho + $PDF_Separacion ) * $FontPuntos;
for( $i=0; $i < count($Titulos[$n]); $i++ ){
$xTitulos[$n][$i] = $xTitulos[$n][$i] + ((( $Ancho - strlen($Titulos[$n][$i]) ) * $FontPuntos ) / 2 ) + ( ($PDF_Separacion * $FontPuntos) / 2 );
}
$sX += ($Ancho + $PDF_Separacion ) * $FontPuntos;
if( count($Titulos[$n]) > $MaxFilas ) $MaxFilas = count($Titulos[$n]);
}
for( $n=0; $n<count($_Form); $n++ ){
$_xPDFWRAP[$n] = 0;
if( !$Visible[$n] ) continue;
$i = count($Titulos[$n]);
if( $yTitulos[$n] == '' ) $yTitulos[$n] = -( (($MaxFilas-$i)*$AltoLineas) / 2 ) - ($ascender/2);
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
$PDF_Titulo = preg_replace('/<br>/i' ,'#BR#', strip_tags($PDF_Titulo));
$Ini = strpos($PDF_Titulo,'<');
$Fin = strpos($PDF_Titulo,'>');
if( $Ini===false ){
}else{
if( $Fin===false ){
}else{
if( $Ini < $Fin && substr($PDF_Titulo,$Ini+1,1) > ' ' ) $PDF_Titulo = substr($PDF_Titulo,0,$Ini).substr($PDF_Titulo,$Fin+1);
}
}
$PDF_Titulo = preg_replace('/#BR#/i'  ,'<BR>', $PDF_Titulo );
$PDF_Titulo = preg_replace('/&nbsp;/i',' '   , $PDF_Titulo );
$PDF_Titulo = preg_replace('/&amp;/i' ,'&'   , $PDF_Titulo );
$PDF_Titulo = preg_replace('/&quot;/i','"'   , $PDF_Titulo );
$PDF_Titulo = preg_replace('/&#47;/i' ,'/'   , $PDF_Titulo );
$PDF_Titulo = preg_replace('/&#92;/i' ,'\\', $PDF_Titulo );
$PDF_Titulo = preg_replace('/&#43;/i' , '+', $PDF_Titulo );
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
PDF_set_parameter( $p, 'openmode', 'none' );
PDF_set_parameter( $p, 'transition', 'dissolve' );
PDF_setlinewidth( $p, 0.1 );
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
$PDF_ShowFilter = true;
$PDF_OffsetDescripcion = $PDF_OffsetDescripcionBak;
if( $ConMembrete ){
Membrete( $PDF_Imagen, $nPag );
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
if( $x >= 0 ) ePDF_ShowXY( $p, $txt, $x, $PDF_y2Margen );
}
function ePDF_ShowXY( $p, $text, $x, $y ){
PDF_show_xy( $p, $text, $x, $y );
}
function ePDFText($x, $y, $text){
global $p;
PDF_show_xy($p, $text, $x, $y);
}
function ePDFRect($x, $y, $Ancho, $Alto, $df=''){
global $p;
PDF_save($p);
PDF_setlinewidth( $p, 0.01 );
if( $df!="" ){
PDF_setcolor($p, 'fill', 'gray', 0.90, 0, 0, 0);
}else{
PDF_setcolor($p, 'fill', 'gray', 1, 0, 0, 0);
}
PDF_setdash( $p, 0, 1000 );
PDF_rect($p, $x, $y, $Ancho, $Alto);
PDF_closepath_fill_stroke($p);
PDF_restore($p);
}
function ePDF_ContinueText( $p, $text ){
PDF_continue_text( $p, $text );
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
function RGBToGray( $Color ){
$r = hexdec('#'.substr($Color,1,2));
$g = hexdec('#'.substr($Color,3,2));
$b = hexdec('#'.substr($Color,5,2));
$t = ($r+$g+$b)/3;
return '#'.dechex($t).dechex($t).dechex($t);
}
function eColorTone( $r,$g,$b, $t ){
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
?>
