<?PHP
if( !function_exists('qQuery') ) eInclude($_Sql);
$_Mode = array(
'I'=>'I',
'D'=>'B',
'V'=>'C',
'U'=>'M',
'S'=>'E'
);
$_ModeLabel = array(
'I'=>'Insertar',
'D'=>'Borrar',
'V'=>'Consultar',
'U'=>'Modificar',
'S'=>'Especial'
);
$FicheroPDF = '../_datos/config/pdf.ini';
@include($FicheroPDF);
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
$PDF_OffsetPie = 0;
if( !isset($PDF_TxtTitulo)			) $PDF_TxtTitulo		 = '      TITULO ';
if( !isset($PDF_Titulo)				) $PDF_Titulo			 = trim($_TITLE);
$PDF_Titulo = _TransformaChr( $PDF_Titulo );
if( !isset($PDF_SQL)				) $PDF_SQL				 = '';
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
if( !isset($PDF_Colors) ) $PDF_Colors = false;
if( isset($BW) && $BW==1 ) $PDF_Colors = false;
$_Color = array();
ColoresEnPDF();
global $_User, $p, $row, $nPag, $y;
$_InfSinTotales = true;
$_BreakPage = array();
$Visible = array();
$_yUltimaLinea = $y;
$_yPrimeraLinea = $y;
$_HeaderLine = array( -1, -1, -1 );
$HojaAncho	= 595.0;
$HojaAlto	= 842.0;
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
$_GrisCabecera = array( 0.8, 0.9, 0.95, 0.95 );
$_GrisSubTotal = array( 0.8, 0.9, 0.95, 0.95 );
$_SepGrupoUno = 0.5;
if( isset($_PDFAlignCabecera) ) $_AlignCabecera = $_PDFAlignCabecera;
if( isset($_PDFGrisCabecera ) ) $_GrisCabecera  = $_PDFGrisCabecera;
if( isset($_PDFGrisSubTotal ) ) $_GrisSubTotal  = $_PDFGrisSubTotal;
if( isset($_PDFSepGrupoUno  ) ) $_SepGrupoUno   = $_PDFSepGrupoUno;
if( !isset($_PDFADDMARGENTOP) ) $_PDFADDMARGENTOP = 0;
$PDF_InfoTitulo = preg_replace('/&nbsp;/',' ', $PDF_InfoTitulo );
if( substr_count( $PDF_InfoTitulo, '<' ) > 0 ){
$PDF_InfoTitulo = preg_replace('/<BR>/',' ', $PDF_InfoTitulo );
$PDF_InfoTitulo = str_replace( '  ', ' ', $PDF_InfoTitulo );
$PDF_InfoTitulo = strip_tags($PDF_InfoTitulo);
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
include_once('../_datos/config/desktop.ini');
if( $_GET['TipoArbol']=='U' ){
if( $_GET['USER'] > 0 ){;
qQuery( "select * from gs_user where cd_gs_user='{$_GET['USER']}'" );
$row = qArray();
$_TITLE = 'ARBOL DE OPCIONES DE "'.trim($row['user_name']).' '.trim($row['user_surname']).'"';
}else{
qQuery( "select * from gs_user where cd_gs_user='{$_User}'" );
$row = qArray();
$_TITLE = 'ARBOL PERSONAL DE OPCIONES';
}
$_TypeTree = ((!isset($row['cd_type_tree'])) ? '' : $row['cd_type_tree']);
if( $_TypeTree!='' ) $row['cd_gs_tree'] = -1;
$_DesktopTreeType = eFileGetVar("Desktop.DesktopTreeType");
if( $_DesktopTreeType=='O' ){
if( $_TypeTree=='P' ){
$_UserTree = $row['cd_gs_user'];
}else if( $_TypeTree=='R' ){
$_UserTree = $row['cd_gs_rol'];
}else if( $_TypeTree=='U' ){
$DimUser = array();
$DimUser[] = $row['cd_gs_user'];
$LikeUser = $row['like_user'];
do {
if( !in_array( $LikeUser, $DimUser ) ){
qQuery( "select cd_type_tree,cd_gs_rol,like_user, cd_gs_user from gs_user where cd_gs_user='{$LikeUser}'", $p1 );
$oUsu = qArray( $p1 );
$DimUser[] = $LikeUser;
$LikeUser = $oUsu['like_user'];
}else{
eMessage( $__Lng[50], 'HELS', 10 );
}
} while( $oUsu['cd_type_tree']=='U' );
$_TypeTree = $oUsu['cd_type_tree'];
if( $_TypeTree=='P' ){
$_UserTree = $oUsu['cd_gs_user'];
}else if( $_TypeTree=='R' ){
$_UserTree = $oUsu['cd_gs_rol'];
}
}
}
include('../../edesweb/arbol.inc');
}else if( $_GET['TipoArbol']=='T' ){
$_TITLE = 'ARBOL DE TODAS LAS OPCIONES';
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op order by seq");
while( $_DimTree[]=qArray() ){}
}else if( $_GET['TipoArbol']=='A' && $_GET['nArbol'] > 0 ){
$nArbol = $_GET['nArbol'];
qQuery("select nm_gs_tree from {$_SESSION['ShareDictionary']}gs_tree where cd_gs_tree={$nArbol}");
list( $NomArbol ) = qRow();
$_TITLE = 'ARBOL: '.$NomArbol;
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op where cd_gs_op in (select cd_gs_op from {$_SESSION['ShareDictionary']}gs_tree_op where cd_gs_tree={$nArbol}) order by seq");
while( $_DimTree[]=qArray() ){}
}else{
exit;
}
$PDF_Titulo		= trim($_TITLE);
$PDF_Titulo		= _TransformaChr( $PDF_Titulo );
$PDF_InfoTitulo	= $_TITLE;
$p = PDF_new();
if( $PDF_License!='' ) PDF_set_parameter( $p, 'license', $PDF_License );
PDF_open_file( $p, $NomFile );
PDF_set_info( $p, 'Title'	 , $PDF_InfoTitulo );
PDF_set_info( $p, 'Author'	 , $_SESSION["ApplicationName"] );
PDF_set_info( $p, 'Keywords', 'eDes' );
PDF_set_info( $p, 'Creator' , $_eDesTitle );
$PorSolapa = true;
$VersionPDF = pdf_get_value( $p, "major", 0 );
if( $VersionPDF < 5 ) $PDF_Colors = false;
$uBreakPage = null;
for( $op=0; $op<count($_DimTree); $op++ ){
$row = $_DimTree[$op];
if( $row['type']=='' ) continue;
$NuevaPagina = false;
if( $y < 10 || $PorSolapa ){
if( !$PorSolapa ){
Pie( $_SinTerminar );
PDFEndPage( $p );
$nPag++;
$uBreakPage = null;
$SePintoPie = true;
$y = $HojaAlto-20;
}
$NuevaPagina = true;
$snPag = $nPag;
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
$UltimaLinea = $PDF_y2Margen + $PDF_OffsetPie;
Membrete( $PDF_Imagen, $nPag );
if( $PDF_xMargen < 0 ) $PDF_xMargen = 0;
}else{
if( $PDF_ShowHeader || $PDF_LetterHead ){
$PDF_OffsetDescripcion = 20;
if( $PDF_LetterHead ) $PDF_OffsetDescripcion = 15;
$PDF_OffsetDescripcionBak = $PDF_OffsetDescripcion;
Membrete( $PDF_Imagen, $nPag );
}
}
if( $y == 0 ){
$y = ( $HojaAlto - $PDF_yMargen );
if( $_PDFADDMARGENTOP > 0 ) $y -= $_PDFADDMARGENTOP;
}else{
$y -= $PDF_OffsetCabecera;
}
Cabecera( $nPag );
$PorSolapa = false;
}
if( $row['indent']==0 && !$NuevaPagina ){
Pie( $_SinTerminar );
PDFEndPage( $p );
$nPag++;
$uBreakPage = null;
$SePintoPie = false;
$y = $HojaAlto-20;
PDFBeginPage( $p, $HojaAncho, $HojaAlto );
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
PDF_set_parameter( $p, 'openmode', 'none' );
PDF_set_parameter( $p, 'transition', 'dissolve' );
PDF_setlinewidth( $p, 0.1 );
if( $PDF_ShowHeader || $PDF_LetterHead ){
$PDF_OffsetDescripcion = 20;
if( $PDF_LetterHead ) $PDF_OffsetDescripcion = 15;
$PDF_OffsetDescripcionBak = $PDF_OffsetDescripcion;
Membrete( $PDF_Imagen, $nPag );
}
}
PDF_show_xy( $p, $_Mode[$row['mode']], (double)($PDF_xMargen), (double)$y );
$incr = $row['indent']*15+15;
if( $row['type']=='L' ){
if( $row['caption'][0]=='-' ) $row['caption'] = trim(substr($row['caption'],1));
if( trim($row['caption'])!='' ){
$row['caption'] = '--- '.$row['caption'].' ---';
}else{
$row['caption'] = '---';
}
PDF_show_xy( $p, $row['caption'], (double)($PDF_xMargen+$incr), (double)$y );
}else{
if( $row['indent']==0 ){
PDF_save($p);
$font = PDF_findfont( $p, $FontFamilyTH, 'host', 0 );
PDF_setfont( $p, $font, $FontSizeTH*1.2 );
if( $PDF_Colors ) SetColor( $p, $_Color['TITLE_VALUE']['COLOR'], 'fill' );
PDF_show_xy( $p, $row['caption'], (double)($PDF_xMargen+$incr), (double)$y );
PDF_restore($p);
}else{
PDF_show_xy( $p, $row['caption'], (double)($PDF_xMargen+$incr), (double)$y );
}
}
$y -= ($AltoLineas*1);
$_NumReg++;
$SePintoPie = false;
$NuevaPagina = false;
}
$_FinalListado = $y - $AltoLineas;
$_FootTextHeight = 0;
if( !$SePintoPie ){
Fin( false );
FootTitle();
Pie();
}
if( $GLOBALS['_PaginaAbierta'] ) PDFEndPage( $p );
if( $_NumReg == 0 ){
PDFBeginPage( $p, $HojaAncho, $HojaAlto );
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
PDF_set_parameter( $p, 'openmode', 'none' );
PDF_set_parameter( $p, 'transition', 'dissolve' );
PDF_show_xy( $p, $PDF_TxtSinDatos, $MargenHoja, $HojaAlto - $PDF_yMargen );
PDFEndPage($p);
}
PDF_close($p);
if( $_ToPDF===true ){
eInit();
echo '<SCRIPT type="text/javascript">';
echo 'var Obj = window.external.eCallJS("top");';
echo 'Obj.eCallSrv( window, "edes.php?D:'.$oNomFile.'&_Source=gsEdit&_SubMode=gsEdit" );';
echo '</SCRIPT>';
eEnd();
}
include_once( $Dir_.'message.inc' );
if( isset( $_PDFPrint ) ){
?>
<HTML><HEAD><LINK REL='stylesheet' HREF='<?=$_SESSION['_PathCSS']?>/lista.css' TYPE='text/css'></HEAD>
<BODY onload='PDF.printAll();PDF.style.display="block";'>
<BR><OBJECT ID="PDF" width=100% height=100% CLASSID="CLSID:CA8A9780-280D-11CF-A24D-444553540000" style='display:none'>
<PARAM NAME="SRC" VALUE="edes.php?D:<?= $oNomFile ?>#nocache">
</OBJECT>
</BODY></HTML>
<?PHP
}else{
$ConRemoto = (isset($_REMOTE_)) ? "R":"";
global $_TITLETOEXTRACT;
if( $_TITLETOEXTRACT[0]=='=' ) $_TITLETOEXTRACT = substr($_TITLETOEXTRACT,1);
$_TITLETOEXTRACT = str_replace('<br>',' ',$_TITLETOEXTRACT);
$_TITLETOEXTRACT = str_replace('<BR>',' ',$_TITLETOEXTRACT);
$_TITLETOEXTRACT = str_replace(' ','%20',$_TITLETOEXTRACT);
$_TITLETOEXTRACT = str_replace('&nbsp;','%20',$_TITLETOEXTRACT);
if( $_FILEPDF!='' ){
list( $Ini, $Fin ) = explode(',',$_FILEPDF);
if( $Ini==$Fin ){
$oNomFile = '/_tmp/pdf/lst_'.$_User.'.pdf';
$txt = '..'.$oNomFile;
for( $n=1; $n<=$Fin; $n++ ){
if( file_exists('../_tmp/pdf/lst_'.$_User.'_file_'.$n.','.$Fin.'.pdf') ) $txt .= ' ../_tmp/pdf/lst_'.$_User.'_file_'.$n.','.$Fin.'.pdf';
}
if( substr_count($txt,' ') > 0 ){
exec( "gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile={$txt}" );
}
for( $n=1; $n<=$Fin; $n++ ){
if( file_exists('../_tmp/pdf/lst_'.$_User.'_file_'.$n.','.$Fin.'.pdf') ) @unlink( '../_tmp/pdf/lst_'.$_User.'_file_'.$n.','.$Fin.'.pdf' );
}
if( $_CACHEFILESRV!='' ){
copy(eScript($oNomFile), eScript($_CACHEFILESRV));
$oNomFile = $_CACHEFILESRV;
}
if( function_exists( 'uFileSupport' ) ) uFileSupport($oNomFile);
eContextFile("edes.php?{$ConRemoto}D:{$oNomFile}");
eMessage( '~PDF','HS','','try{_WOPENER.eHideBusy();}catch(e){};location.href = "edes.php?'.$ConRemoto.'D:'.$oNomFile.'&_Source='.$OriFichero.'&_SubMode='.$_SubModo.'";' );
}else{
eInit();
echo '<script type="text/javascript">var Func=window.frameElement.eEXE; window.frameElement.eEXE=null; Func();</script>';
}
}else{
if( $_CACHEFILESRV!='' ) copy( eScript($oNomFile), eScript($_CACHEFILESRV) );
if( function_exists( 'uFileSupport' ) ) uFileSupport($oNomFile);
eContextFile("edes.php?{$ConRemoto}D:{$oNomFile}");
eMessage( '~PDF','HS','','try{_WOPENER.eHideBusy();}catch(e){};location.href = "edes.php?'.$ConRemoto.'D:'.$oNomFile.'&_Source='.$OriFichero.'&_TReg='.$_NumReg.'&_SubMode='.$_SubModo."&_Doc='".$_TITLETOEXTRACT."'".'";' );
}
}
eEnd();
function FootTitle(){
global $y, $ascender, $_FOOTTITLE, $p, $PDF_xMargen, $incr, $TotalReg;
global $nPag, $_PDFINCLUDE, $HojaAncho, $HojaAlto, $AltoLineas, $PDF_yMargen;
$FootNewPag = false;
if( $_FOOTTITLE!='' ){
if( substr($_FOOTTITLE,0,5)=='echo ' ){
$txt = @eval(str_replace('echo ','return ',$_FOOTTITLE));
}else{
$txt = @eval('return '.$_FOOTTITLE);
}
$txt = str_replace( '<br>', '<BR>', $txt );
$txt = CambiaCHR( $txt );
$Dim = explode( '<BR>', $txt );
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
if( $x >= 0 ) PDF_show_xy( $p, $txt, $x, $PDF_y2Margen );
$y = $HojaAlto - $PDF_yMargen - $PDF_FontSize*2;
}
}
if( $_PDFINCLUDE['LB'] != '' ) PDFIncludeLB( $p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'] );
if( $_FOOTTITLE!='' ){
$y -= ($ascender/2);
if( substr($_FOOTTITLE,0,5)=='echo ' ){
$txt = @eval(str_replace('echo ','return ',$_FOOTTITLE));
}else{
$txt = @eval('return '.$_FOOTTITLE);
}
$txt = str_replace( '<br>', '<BR>', $txt );
$txt = CambiaCHR( $txt );
$Dim = explode( '<BR>', $txt );
$sy = $y;
$Mas = 0;
for( $n=0; $n<count($Dim); $n++ ){
$txt = str_replace( '&nbsp;', ' ', strip_tags($Dim[$n]) );
PDF_show_xy( $p, $txt, $PDF_xMargen+$incr, $sy );
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
if( $_PDFINCLUDE['LA'] != '' ) PDFIncludeLA( $p, $HojaAncho, $HojaAlto, $nPag, $GLOBALS['_HeaderLine'] );
return $FootNewPag;
}
function NewFila(){
global $usuCursor, $Indice;
if( !isset($usuCursor) ){
return qRow();
}else{
$Indice++;
return $usuCursor[$Indice];
}
}
function Membrete( $PDF_Imagen, $nPag ){
global $p, $y, $MargenHoja, $HojaAncho, $HojaAlto, $FontPuntos, $PDF_yMargen, $_HeaderLine;
global $FontFamilyTH, $FontSizeTH, $PDF_Ordenacion, $PDF_TxtOrdenacion, $PDF_LetterHead;
global $PDF_xImagen, $PDF_yImagen, $PDF_Fecha, $PDF_TxtCabecera, $PDF_TxtFecha;
global $PDF_TxtCondicion, $_DimCondicion, $PDF_OffsetDescripcion, $AltoLineas;
global $PDF_TxtTitulo, $PDF_Titulo, $PDF_SubTitulo, $PDF_Colors, $_Color, $PDF_ShowFilter, $PDF_ImagenScale;
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
if( !$PDF_ShowFilter && $nPag > 1 && !$PDF_LetterHead ) return;
if( $PDF_Titulo != '' ){
$y -= $PDF_OffsetDescripcion;
$PDF_OffsetDescripcion = 0;
$sx = $Ancho+$MargenHoja;
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['TITLE_TEXT']['COLOR'], 'fill' );
PDF_show_xy( $p, $PDF_TxtTitulo, $sx, $y );
PDF_restore($p);
$sx += strlen($PDF_TxtTitulo)*$FontPuntos+5;
$GLOBALS['_yUltimaLinea'] = $y;
$tmp = explode('<BR>',$PDF_Titulo);
for( $i=0; $i<count($tmp); $i++ ){
PDF_save($p);
if( $PDF_Colors ) SetColor( $p, $_Color['CIRCLE']['COLOR'], 'fill' );
PDF_circle($p, $sx, $y+$FontPuntos/2, 1.5 ); PDF_fill($p);
PDF_restore($p);
PDF_save($p);
$font = PDF_findfont( $p, $FontFamilyTH, 'host', 0 );
PDF_setfont( $p, $font, $FontSizeTH*1.2 );
if( $PDF_Colors ) SetColor( $p, $_Color['TITLE_VALUE']['COLOR'], 'fill' );
PDF_show_xy( $p, trim($tmp[$i]), $sx+(1*$FontPuntos), $y );
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
PDF_show_xy( $p, $PDF_SubTitulo, $sx+(1*$FontPuntos), $y );
PDF_restore($p);
$GLOBALS['_yUltimaLinea'] = $y;
$y -= $AltoLineas;
}
$GLOBALS['_yPrimeraLinea'] = $GLOBALS['_yUltimaLinea'];
}
function Cabecera( $nPag ){
return;
}
function Fila( $row ){
}
function Pie(){
global $p, $PDF_xMargen, $MargenHoja, $ascender, $nPag, $HojaAncho, $HojaAlto, $PDF_Colors, $_Color, $_FORMATTOTALSCS;
global $_AnchoPt, $FontPuntos, $InicioY, $y, $AltoLineas, $PDF_y2Margen, $_RowSpan, $_PDFINCLUDE;
global $PDF_AnchoSombra, $PDF_OffsetSombra, $PDF_NumPagina, $PDF_TxtPagina, $_AltoTH, $_PDFCOLBORDER, $_SePintoPie;
$_SePintoPie = true;
$Des = ($AltoLineas*1)-($ascender/2);
if( $PDF_Colors ) SetColor( $p, $_Color['TABLE']['BACKGROUND'], 'both' );
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
$y -= $PDF_OffsetPie;
return;
}
function Fin( $SubTotal, $ConGrupos=false, $NivelGrupo=0 ){
}
function CalculaTitulos( $row, &$AnchoTotal ){
global $_Form, $Separador, $PDF_Separacion, $_PDFTH, $_PDFCOL, $_AnchoCOL, $_TGrupos;
global $FontPuntos, $AltoLineas, $Titulos, $xTitulos, $yTitulos, $_AnchoColSpan;
global $_AnchoCol, $_AnchoPt, $ascender, $PDF_UpperCabecera, $Visible, $_THCOLSPAN, $THCol;
global $_ADDOPTION, $_SelVirtual, $_HayRadio, $_RADIO, $MargenDerecho, $_MaxPDFWRAP, $_PDFWRAP, $_xPDFWRAP;
$sX = 0;
$MaxFilas = 0;
$MargenDerecho = $sX;
$AnchoTotal = 1000;
return $sX;
}
function PintaImagen( $d ){
global $p, $IncrY, $_x1G, $_y1G, $_x2G, $_y2G;
$x = cX($d[1]);
$y = cY($d[2]) + $IncrY;
$PDF_Imagen = cT( $d[3], false );
$PDF_Imagen = eScript($PDF_Imagen);
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
PDF_show_xy( $p, $TxtError, $x+2, $y-7 );
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
$PDF_Titulo = preg_replace( '/<br>/' ,'#BR#', $PDF_Titulo );
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
return $PDF_Titulo;
}
function NuevaPagina(){
global $_FinalListado, $AltoLineas, $font, $FontPuntos,$HojaAlto,$HojaAncho, $MargenHoja,$nPag, $p, $PDF_FontFamily;
global $PDF_FontSize, $PDF_Imagen, $PDF_NumPagina, $PDF_OffsetDescripcion, $PDF_OffsetDescripcionBak, $PDF_ShowFilter;
global $PDF_TxtPagina, $PDF_y2Margen, $y;
$y = 0;
PDFBeginPage( $p, $HojaAncho, $HojaAlto );
PDF_set_parameter( $p, 'openmode', 'none' );
PDF_set_parameter( $p, 'transition', 'dissolve' );
PDF_setlinewidth( $p, 0.1 );
$font = PDF_findfont( $p, $PDF_FontFamily, 'host', 0 );
PDF_setfont( $p, $font, $PDF_FontSize );
$PDF_ShowFilter = true;
$PDF_OffsetDescripcion = $PDF_OffsetDescripcionBak;
Membrete( $PDF_Imagen, $nPag );
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
if( $x >= 0 ) PDF_show_xy( $p, $txt, $x, $PDF_y2Margen );
}
?>
