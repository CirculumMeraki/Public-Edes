<?PHP
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() ) exit;
if( $_SESSION['_XLS_']<>'S' ) eEnd();
eInclude("xls");
$_TITLE = str_replace('<br>',' ',str_replace('<BR>',' ',$_TITLE));
$_DimCondicion = array();
if( isset($_VerUserCondiciones) ){
$tmp = call_user_func( trim($_VerUserCondiciones) );
for( $n=0; $n<count($tmp); $n++ ){
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
if( isset($PDF_Condition) ){
if( is_array($PDF_Condition) ){
if( count($PDF_Condition)> 0 ) $_DimCondicion = $PDF_Condition;
}else if( is_string($PDF_Condition) ){
if( $PDF_Condition != '' ) $_DimCondicion = array($PDF_Condition);
}
}
if( count($_DimCondicion) > 0 ){
for( $n=0; $n<count($_DimCondicion); $n++ ) $_DimCondicion[$n] = _TransformaChr( $_DimCondicion[$n] );
}
if( $_NotInTemporary<>"" ) $_DimCondicion = array();
$PDF_TxtCondicion = $__Lng[43];
if( $_TextOverride['condition']<>'' ){
$PDF_TxtCondicion = $_TextOverride['condition'];
if( $PDF_TxtCondicion=='-' ) $PDF_TxtCondicion = '';
}
IF( $PDF_TxtCondicion<>'' ) $PDF_TxtCondicion .= ':';
$Indice = -1;
for( $n=1; $n<=9; $n++ ){
for( $i=0; $i<count($_PDFTH); $i++ ){
$_PDFTH[$i] = str_replace( '<br>', ' ', $_PDFTH[$i] );
$_PDFTH[$i] = str_replace( '<BR>', ' ', $_PDFTH[$i] );
$_PDFTH[$i] = str_replace( '&#'.(48+$n).';', $n, strip_tags($_PDFTH[$i]) );
}
}
if( count($_ROWSOP)>0 ){
$_Form[] = $_ROWSOPFORM;
}
$Visible = array();
for( $n=0; $n<count($_Form); $n++ ){
if( substr($_Form[$n][0],0,6)=='&nbsp;' ) $_Form[$n][0] = substr($_Form[$n][0],6);
$_ALIGN[$n] = strtolower($_ALIGN[$n]);
$_ALIGN[$n] = trim(str_replace('id=','',$_ALIGN[$n]));
$Visible[$n] = ( substr_count($_Form[$n][6],'*') == 0 && substr_count($_Form[$n][6],'L') == 0 );
if( $_PDFCOL[$n]=='0' ) $Visible[$n] = false;
if( $_Form[$n][4]==0 ) $Visible[$n] = false;
if( strtoupper($_PDFCOL[$n])=='XLS' ) $Visible[$n] = true;
$_ALIGN[$n] = trim(str_replace('id=','',$_ALIGN[$n]));
if( strtoupper($_FORMAT[$n])=='IMG' ) $Visible[$n] = false;
if( strtoupper($_FORMAT[$n])=='ICON' ) $Visible[$n] = false;
if( $_ToExcel===true ) $Visible[$n] = true;
}
$Titulos = array();
for( $n=0; $n<count($_Form); $n++ ){
$Titulos[$n] = '';
$_AnchoCol[$n] = 0;
$_AnchoPt[$n] = 0;
if( $Visible[$n] ){
$Celda = $_Form[$n][0];
if( $_PDFTH[$n]!='' ){
$Celda = $_PDFTH[$n];
$_Form[$n][0] = $_PDFTH[$n];
}
$Celda = str_replace( '&nbsp;', ' ', $Celda );
$Celda = str_replace( '&NBSP;', ' ', $Celda );
if( substr_count( $Celda, '<' ) > 0 ){
$Celda = str_replace( '<br>', '<BR>', $Celda );
$Celda = str_replace( '<bR>', '<BR>', $Celda );
$Celda = str_replace( '<Br>', '<BR>', $Celda );
}
if( isset($_HEADER_ORIGINAL) && $_HEADER_ORIGINAL ){
$Titulos[$n] = str_replace( '<BR>'  , ' ', $Celda );
}else{
$Titulos[$n] = str_replace( '<BR>'  , ' ', eStrUpper( $Celda ) );
}
$Titulos[$n] = str_replace( '&EURO;', 'EUR', $Titulos[$n] );
$Titulos[$n] = str_replace( "\t"    , ' ', $Titulos[$n] );
$Titulos[$n] = str_replace( '&amp;' , '&', $Titulos[$n] );
$Titulos[$n] = str_replace( '&AMP;' , '&', $Titulos[$n] );
$Titulos[$n] = str_replace( '&quot;', '"', $Titulos[$n] );
$Titulos[$n] = str_replace( '&QUOT;', '"', $Titulos[$n] );
if( strtoupper($_Form[$n][3])=='C' ){
$_ADDOPTION[ $_Form[$n][1] ] = true;
if( $_LISTCHECKBOX['X']=='' ){
$_SelVirtual[$_Form[$n][1]]['S'] = $_CheckBox['X']['ON'];
$_SelVirtual[$_Form[$n][1]]['']  = $_CheckBox['X']['OFF'];
}else{
$_SelVirtual[$_Form[$n][1]]['S'] = strip_tags($_LISTCHECKBOX['X'][0]);
$_SelVirtual[$_Form[$n][1]]['']  = strip_tags($_LISTCHECKBOX['X'][1]);
}
}
}
}
$NomFile = '/_tmp/pdf/lst_'.$_User.'.xls';
$NomFile = eScript($NomFile);
if( file_exists($NomFile) ) unlink($NomFile);
if( !$_TITLENOUPPER ) $_TITLE = eStrUpper($_TITLE);
while( substr_count($_TITLE, '  ')>0 ) $_TITLE = str_replace('  ', ' ', $_TITLE);
$_TITLE = EnPlural($_TITLE, 'LISTADO DE #', true);
$_TITLE = str_replace('<BR>','#BR#', $_TITLE);
$_TITLE = strip_tags($_TITLE);
$_TITLE = str_replace('#BR#','<BR>', $_TITLE);
$_TITLE = str_replace('&NBSP;',' ', $_TITLE);
$_TITLE = str_replace('&nbsp;',' ', $_TITLE);
$_TITLE = str_replace('&amp;','&', $_TITLE);
$_TITLE = str_replace('&AMP;','&', $_TITLE);
$_TITLE = str_replace('&quot;','"', $_TITLE);
$_TITLE = str_replace('&QUOT;','"', $_TITLE);
$_TITLE = str_replace("&#47;", "/", $_TITLE);
if( $_BrowseInTemporary!="" ){
$_FileDownload = fopen($_BrowseInTemporary.'.dat', 'r');
}else{
$_FileDownload = "";
}
$_TReg = DestinoXLS($NomFile, $_Form, $_TITLE, $Visible, $Titulos);
if( $_BrowseInTemporary!="" ){
fclose($_FileDownload);
}
$NomFile = str_replace('..','',$NomFile);
if( $_BackgroundReport ){
$NomFile = '/_tmp/pdf/lst_'.$_SESSION['_User'].'.xls';
_DownloadEnd(eScript($NomFile), eScript($_DownloadPath).$_CdGsExpFile.'.zip');
eEnd();
}
if( $_ToExcel===true ){
eInit();
echo "<a href='edes.php?D:{$NomFile}' style='display:none'>Descargar XLS</a>";
echo '<script>setTimeout(function(){top.S("A",window).eventFire("click");},250);</script>';
eEnd();
}
$Extension = "XLS";
include_once($Dir_.'downloadfile.inc');
eEnd();
function DestinoXLS($NomFile, $_Form, $_TITLE, $Visible, $Titulos){
global $Etiquetas, $ListaAnchos, $_THCOLSPAN, $_DimTHText, $_XLSLIMIT, $_TReg, $_DBREADROW, $_DimCondicion;
global $_ADDOPTION, $_SelVirtual, $_HayRadio, $_RADIO, $_FORMAT, $_FORMATPHP, $_RADIOLIST, $_CHECKLIST, $_SELECTMULTIPLE, $_SelVirtualType;
global $_HEADER_ORIGINAL, $_pCol;
global $_ROWSOP, $_exeROWSOPCALC, $File;
$TReg = 0;
$File = xlsCreate($NomFile);
$nl = 0;
if( $_TITLE != '' ){
$tmp = explode('<BR>',strip_tags($_TITLE));
for($i=0; $i<count($tmp); $i++){
xlsText($File, $nl, 0, trim($tmp[$i]));
$nl++;
}
$nl++;
}
$nl = _xls_pintaCondiciones($_DimCondicion,  $nl, $File);
if( count($_THCOLSPAN)>0 ){
global $_TGrupos,$NCampos,$THCol,$_CHARTCOL;
for( $n=$_TGrupos; $n<$NCampos; $n++ ){
$_Form[$n][0] = strip_tags($_Form[$n][0]);
if( $THCol[$n][2] == 3 ){
$_DimTHText[1][$n] = trim($_Form[$n][0]);
}else if( $THCol[$n][2] == 2 ){
if( $n+$THCol[$n][1] == $NCampos && count($_CHARTCOL) > 0 && $_CHARTCOL[2] == '' ) $THCol[$n][1]++;
for( $i=$n; $i<$n+$THCol[$n][1]; $i++ ) $_DimTHText[1][$i] = strip_tags(trim($THCol[$n][0]));
continue;
}
$_Form[$n][2] = trim($_Form[$n][2]);
if( $THCol[$n][2]==0 ) continue;
}
for( $n=$_TGrupos; $n<$NCampos; $n++ ) $_DimTHText[0][$n] = trim($_Form[$n][0]);
for( $i=0; $i<count($_DimTHText); $i++ ) for( $n=0; $n<count($_DimTHText[$i]); $n++ ){
$_DimTHText[$i][$n] = strip_tags($_DimTHText[$i][$n]);
if( isset($_HEADER_ORIGINAL) && $_HEADER_ORIGINAL ){
$txt = str_replace( '<BR>'  , ' ', $_DimTHText[$i][$n] );
}else{
$txt = str_replace( '<BR>'  , ' ', eStrUpper($_DimTHText[$i][$n]) );
}
$txt = str_replace( '&EURO;', 'EUR', $txt );
$txt = str_replace( "\t"    , ' ', $txt );
$txt = str_replace( '&amp;' , '&', $txt );
$txt = str_replace( '&AMP;' , '&', $txt );
$txt = str_replace( '&quot;', '"', $txt );
$txt = str_replace( '&QUOT;', '"', $txt );
$_DimTHText[$i][$n] = $txt;
}
}
if( count($_THCOLSPAN)>0 ){
$i = 1;
$nc = 0;
for( $n=0; $n<count($Titulos); $n++ ){
if( !$Visible[$n] ) continue;
$_DimTHText[1][$n] = strip_tags($_DimTHText[1][$n]);
if( $n==0 && $_DimTHText[1][$n]!=$_DimTHText[1][$n-1] && $_DimTHText[1][$n]!=$_DimTHText[0][$n] ){
xlsText( $File, $nl, $nc, $_DimTHText[1][$n] );
}else if( $_DimTHText[1][$n]!=$_DimTHText[1][$n-1] && $_DimTHText[1][$n]!=$_DimTHText[0][$n] ){
xlsText( $File, $nl, $nc, $_DimTHText[1][$n] );
}else if( $_DimTHText[1][$n]==$_DimTHText[1][$n-1] && $_DimTHText[1][$n]!=$_DimTHText[0][$n] ){
xlsText( $File, $nl, $nc, '=' );
}
$nc++;
}
$nl++;
$nc = 0;
for( $n=0; $n<count($Titulos); $n++ ){
if( !$Visible[$n] ) continue;
if( trim($_DimTHText[0][$n])=="" ) $_DimTHText[0][$n] = $Titulos[$n];
xlsText( $File, $nl, $nc, strip_tags($_DimTHText[0][$n]) );
$nc++;
}
$nl++;
}else{
$nc = 0;
for( $n=0; $n<count($Titulos); $n++ ){
if( !$Visible[$n] ) continue;
xlsText( $File, $nl, $nc, strip_tags($Titulos[$n]) );
$nc++;
}
$nl++;
}
while( $row = NewFila() ){
$_vF = &$row;
foreach($_pCol as $k=>$v){
$_vF[$k] = &$_vF[$v];
}
if( isset($_DBREADROW) ) if( !call_user_func( $_DBREADROW, $row ) ) continue;
if( $_FORMATPHP!='' ){
_ExeFormato($row, $_CellsStyle, $_CellsClass, $RowNumber, $_RowStyle, $_RowClass, $_RowDisabled, $_RowAdd, $_CellsAdd, $_PDFColor, $_PDFBackgroundColor, $_PDFLineRows, $_PDFRowShadow, $_pCol, $_pF);
}
if( $nl>$_XLSLIMIT ){
xlsText($File, $nl, 0, 'Se ha llegado al límite de la extracción '.($nl-1).' de '.$_TReg);
break;
}
$nc = 0;
for($n=0; $n<count($row); $n++){
if( !$Visible[$n] ) continue;
$Celda = $row[$n];
if( !empty( $_ADDOPTION[ $_Form[$n][1] ] ) ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
$_Form[$n][2] = 'D';
}else{
$Celda = trim( $Celda );
if( $_Form[$n][3] == 'H' ){
$Celda = str_replace(chr(13) ," ",$Celda);
$Celda = str_replace(chr(10) ," ",$Celda);
$Celda = str_replace('&#39;' ,"'",$Celda);
$Celda = str_replace('&quot;','"',$Celda);
}else if( $_Form[$n][2] == '#' ){
$Celda = urldecode( $Celda );
$Celda = str_replace(chr(13) ," ",$Celda);
$Celda = str_replace(chr(10) ," ",$Celda);
$Celda = str_replace('&#43;','+',$Celda);
$Celda = str_replace('&#92;','\\',$Celda);
}else if( $_Form[$n][2] == 'o' ){
if( $Celda!='' ){
if( isset($_CHECKLIST[ $_Form[$n][1] ]) ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]!='' ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]=='WRAP' ) $_CHECKLIST[ $_Form[$n][1] ][2] = 'NOWRAP';
$tmp = explode(',',$Celda);
$Celda = '';
for( $i=1; $i<count($tmp)-1; $i++ ){
if( $i>1 ){
if( $_CHECKLIST[ $_Form[$n][1] ][2]=='NOWRAP' ) $Celda .= ', ';
else if( $_CHECKLIST[ $_Form[$n][1] ][2]=='WRAP' ) $Celda .= "\n";
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
if( $_SelVirtualType[ $_Form[$n][1] ] != 'T' ){
$tmp = explode(',',$Celda);
$Celda = '';
for( $i=1; $i<count($tmp)-1; $i++ ){
if( $i>1 ) $Celda .= ", ";
$Celda .= $_SelVirtual[$_Form[$n][1]][$tmp[$i]];
}
}else $Celda = substr($Celda,1,-1);
}
if( $_HayRadio ){
if( count( $_RADIO[ $_Form[$n][1] ] ) > 0 ){
$Celda = $_RADIO[ $_Form[$n][1] ][ $Celda ];
$_Form[$n][2] = 'D';
}
}
}
if( $_Form[$n][3]!='H' ){
$Celda = str_replace('&amp;' ,'&' ,$Celda);
$Celda = str_replace('&quot;','"' ,$Celda);
$Celda = str_replace('&#34;' ,'"' ,$Celda);
$Celda = str_replace('&#39;' ,"'" ,$Celda);
$Celda = str_replace('&#43;' ,'+' ,$Celda);
$Celda = str_replace('&#92;' ,'\\',$Celda);
}
if( preg_match('/^(P4|F4|CDI|T)$/',$_Form[$n][2]) ){
$Celda = eDataFormat($Celda, $_Form[$n][2]);
}else if( !empty($_FORMAT[$n]) ){
if( $_FORMAT[$n]=="eNumberFormat(#,2)" ){
$Celda = number_format($Celda, 2, '.', '');
}else if( $_FORMAT[$n]=="eNumberFormat(#,0)" ){
$Celda = number_format($Celda, 0, '.', '');
}else{
if( trim($Celda)=='' && substr($_FORMAT[$n],0,14)=='eNumberFormat(' ) $Celda = 0;
$Formato = '$Celda = '.str_replace('#', $Celda, $_FORMAT[$n]).';';
@eval($Formato);
}
}
$Celda = str_replace('&amp;' ,'&',$Celda);
$Celda = str_replace('&quot;','"',$Celda);
$Celda = str_replace('&nbsp;',' ',$Celda);
switch( $_Form[$n][2] ){
case '+': case '-':
xlsNumber($File, $nl, $nc, $Celda);
break;
case '+,': case '-,':
xlsNumber($File, $nl, $nc, $Celda);
break;
default:
xlsText($File, $nl, $nc, str_replace('&lt;','<',strip_tags($Celda)));
}
$nc++;
}
if( count($_ROWSOP)>0 ){
if( isset($_exeROWSOPCALC) ) $Celda = eval($_exeROWSOPCALC);
xlsNumber($File, $nl, $nc, $Celda);
}
$nl++;
$TReg++;
}
global $_FOOTTITLE;
if( $_FOOTTITLE!='' ){
if( substr($_FOOTTITLE,-1)!=';' ) $_FOOTTITLE .= ';';
if( substr($_FOOTTITLE,0,5)=='echo ' ){
$txt = @eval(str_replace('echo ','return ',$_FOOTTITLE));
}else{
$txt = @eval('return '.$_FOOTTITLE);
}
$txt = str_replace( '<br>', '<BR>', $txt );
$txt = str_replace( "\n", '<BR>', $txt );
$txt = CambiaCHR( $txt );
$Dim = explode('<BR>', $txt);
for($f=0; $f<count($Dim); $f++){
$nl++;
$nc = 0;
$Dato = explode("\t",$Dim[$f]);
for( $c=0; $c<count($Dato); $c++ ){
xlsText($File, $nl, $nc, strip_tags($Dato[$c]));
$nc++;
}
}
}
xlsClose($File);
return $TReg;
}
function CambiaCHR( $Celda ){
$Celda = str_replace('&amp;' ,'&' ,$Celda);
$Celda = str_replace('&quot;','"' ,$Celda);
$Celda = str_replace('&#34;' ,'"' ,$Celda);
$Celda = str_replace('&#39;' ,"'" ,$Celda);
$Celda = str_replace('&#43;' ,'+' ,$Celda);
$Celda = str_replace('&#92;' ,'\\',$Celda);
return $Celda;
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
function _xls_pintaCondiciones( $_DimCondicion, $nl, $File ){
if( count($_DimCondicion) > 0 ){
global $PDF_TxtCondicion;
$PDF_TxtCondicion = str_replace( '&#92;' ,'\\', strip_tags($PDF_TxtCondicion) );
$PDF_TxtCondicion = str_replace( '&#43;' , '+', $PDF_TxtCondicion );
$PDF_TxtCondicion = str_replace( '&#39;' , "'", $PDF_TxtCondicion );
$txt = '';
for( $n=0; $n<count($_DimCondicion); $n++ ) $txt .= $_DimCondicion[$n];
if( trim($txt)<>'' ){
if( $PDF_TxtCondicion != '' ) xlsText( $File, $nl++, 0, $PDF_TxtCondicion );
for( $n=0; $n<count($_DimCondicion); $n++ ){
$_DimCondicion[$n] = eStripTags($_DimCondicion[$n], true);
xlsText( $File, $nl++, 0, $_DimCondicion[$n] );
}
$nl++;
}
}
return $nl;
}
function _TransformaChr( $txt ){
$txt = preg_replace( '/<br>/i' ,'#BR#', $txt );
$Ini = strpos($txt,'<');
$Fin = strpos($txt,'>');
if( $Ini===false ){
}else{
if( $Fin===false ){
}else{
if( $Ini < $Fin && substr($txt,$Ini+1,1) > ' ' ) $txt = substr($txt,0,$Ini).substr($txt,$Fin+1);
}
}
$txt = preg_replace( '/#BR#/i'  ,'<BR>', $txt );
$txt = preg_replace( '/&nbsp;/i',' '   , $txt );
$txt = preg_replace( '/&amp;/i' ,'&'   , $txt );
$txt = preg_replace( '/&quot;/i','"'   , $txt );
$txt = preg_replace( '/&#47;/i' ,'/'   , $txt );
$txt = preg_replace( '/&#92;/i' ,'\\'  , $txt );
$txt = preg_replace( '/&#43;/i' , '+'  , $txt );
return $txt;
}
?>
