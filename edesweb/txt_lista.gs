<?PHP
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
if( $_SESSION['_TXT_']<>'S' ) eEnd();
$_TITLE = str_replace('<br>',' ',str_replace('<BR>',' ',$_TITLE));
$_TITLE = str_replace("&#47;", "/", $_TITLE);
$Indice = -1;
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
if( strtoupper($_PDFCOL[$n])=='TXT' ) $Visible[$n] = true;
if( substr($_Form[$n][4],0,2)=="-1" ) $_Form[$n][4] = 2000;
$_ALIGN[$n] = trim(str_replace('id=','',$_ALIGN[$n]));
if( strtoupper($_FORMAT[$n])=='IMG' ) $Visible[$n] = false;
if( strtoupper($_FORMAT[$n])=='ICON' ) $Visible[$n] = false;
if( $_ToExcel===true ) $Visible[$n] = true;
}
for( $n=0; $n<count($_Form); $n++ ){
$_AnchoCol[$n] = 0;
$_AnchoPt[$n] = 0;
if( $Visible[$n] ){
$Celda = $_Form[$n][0];
if( $_PDFTH[$n]!='' ){
$Celda = $_PDFTH[$n];
$_Form[$n][0] = $_PDFTH[$n];
}
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
$Dir = eScript('/_tmp/zip/');
$NomFile = '/_tmp/zip/lst_'.$_User.'.txt';
$_fichero = 'lst_'.$_User;
$NomFile = eScript($NomFile);
if( file_exists($NomFile) ) unlink($NomFile);
$oNomFile = substr($NomFile,0,-3);
if( file_exists($oNomFile.'csv') ) @unlink($oNomFile.'csv');
if( file_exists($oNomFile.'def') ) @unlink($oNomFile.'def');
if( file_exists($oNomFile.'csv') ) @unlink($oNomFile.'csv');
if( file_exists($oNomFile.'zip') ) @unlink($oNomFile.'zip');
if( $_BrowseInTemporary!="" ){
$_FileDownload = fopen($_BrowseInTemporary.'.dat', 'r');
}else{
$_FileDownload = "";
}
$_TReg = DestinoTXT( $NomFile, $_Form, $Visible );
if( $_BrowseInTemporary!="" ){
fclose($_FileDownload);
}
$NomFile = str_replace('..','',$NomFile);
eZipFile("{$Dir}{$_fichero}.zip", ["{$Dir}{$_fichero}.txt", "{$Dir}{$_fichero}.def"]);
@unlink($Dir.$_fichero.'.txt');
@unlink($Dir.$_fichero.'.def');
$NomFile = str_replace('.txt','.zip',$NomFile);
if( $_BackgroundReport ){
$NomFile = '/_tmp/zip/lst_'.$_SESSION['_User'].'.zip';
_DownloadEnd(eScript($NomFile), eScript($_DownloadPath).$_CdGsExpFile.'.zip');
eEnd();
}
if( $_ToTXT===true ){
eInit();
echo "<a href='edes.php?D:{$NomFile}' style='display:none'>Descargar TXT</a>";
echo '<script>setTimeout(function(){top.S("A",window).eventFire("click");},250);</script>';
eEnd();
}
$Extension = "TXT";
include_once($Dir_.'downloadfile.inc');
eEnd();
function DestinoTXT( $NomFile, $_Form, $Visible ){
global $Etiquetas, $ListaAnchos, $_THCOLSPAN, $_DimTHText, $_XLSLIMIT, $_TReg;
global $_ADDOPTION, $_SelVirtual, $_HayRadio, $_RADIO, $_FORMAT, $_FORMATPHP, $_RADIOLIST, $_CHECKLIST, $_SELECTMULTIPLE;
global $_ROWSOP, $_exeROWSOPCALC, $_pCol;
$TReg = 0;
$FileTH = fopen(str_replace('.txt','.def',$NomFile), 'w');
$File = fopen($NomFile, 'w');
$nl = 0;
while( $row=NewFila() ){
$_vF = &$row;
foreach($_pCol as $k=>$v){
$_vF[$k] = &$_vF[$v];
}
if( $nl>0 ) fwrite($File, "\n");
$nl++;
if( $_FORMATPHP!='' ){
_ExeFormato($row, $_CellsStyle, $_CellsClass, $RowNumber, $_RowStyle, $_RowClass, $_RowDisabled, $_RowAdd, $_CellsAdd, $_PDFColor, $_PDFBackgroundColor, $_PDFLineRows, $_PDFRowShadow, $_pCol, $_pF);
}
$nc = 0;
for($n=0; $n<count($row); $n++){
if( !$Visible[$n] ) continue;
$Celda = $row[$n];
if( !empty($_ADDOPTION[$_Form[$n][1]]) ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
$_Form[$n][2] = 'D';
}else{
$Celda = trim($Celda);
if( $_Form[$n][3]=='H' ){
$Celda = str_replace(chr(13) ," ",$Celda);
$Celda = str_replace(chr(10) ," ",$Celda);
$Celda = str_replace('&#39;' ,"'",$Celda);
$Celda = str_replace('&quot;','"',$Celda);
}else if( $_Form[$n][2]=='#' ){
$Celda = urldecode( $Celda );
$Celda = str_replace(chr(13) ," ",$Celda);
$Celda = str_replace(chr(10) ," ",$Celda);
$Celda = str_replace('&#43;','+',$Celda);
$Celda = str_replace('&#92;','\\',$Celda);
}else if( $_Form[$n][2]=='o' ){
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
}else if( $_SELECTMULTIPLE[$_Form[$n][1]]> 0 && $Celda!='' ){
$tmp = explode(',',$Celda);
$Celda = '';
for( $i=1; $i<count($tmp)-1; $i++ ){
if( $i>1 ) $Celda .= ", ";
$Celda .= $_SelVirtual[$_Form[$n][1]][$tmp[$i]];
}
}
if( $_HayRadio ){
if( count($_RADIO[ $_Form[$n][1]])>0 ){
$Celda = $_RADIO[$_Form[$n][1]][$Celda];
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
$Long = $_Form[$n][4];
switch( $_Form[$n][2] ){
case '+': case '-':
$Celda = eDataFormat($Celda, 0);
$Celda = str_pad($Celda, $Long, ' ', STR_PAD_LEFT);
break;
case '+,': case '-,':
list($iz, $dch) = explode(',',$_Form[$n][4]);
$Celda = eDataFormat($Celda, $dch);
$Long = $iz+$dch;
$Celda = str_pad($Celda, $Long, ' ', STR_PAD_LEFT);
break;
default:
$Celda = str_pad(str_replace('&lt;','<',strip_tags($Celda)), $Long);
}
$Celda = substr($Celda, 0, $Long);
$nc++;
if( $nl==1 ){
$_Form[$n][0] = str_replace('&lt;'  ,'<',$_Form[$n][0]);
$_Form[$n][0] = str_replace('&nbsp;',' ',$_Form[$n][0]);
$_Form[$n][0] = str_replace('<br>',' ',$_Form[$n][0]);
$_Form[$n][0] = str_replace('<BR>',' ',$_Form[$n][0]);
fwrite($FileTH, str_pad($Long,4,' ',STR_PAD_LEFT).': '.$_Form[$n][0].' ('.$_Form[$n][1].')'."\n");
}
fwrite($File, $Celda);
}
if( count($_ROWSOP)>0 ){
for($n=$nc; $n<count($_Form); $n++){
if( !$Visible[$n] ) continue;
if( isset($_exeROWSOPCALC) ) $Celda = eval($_exeROWSOPCALC);
fwrite($File, $Celda);
if( $nl==1 ){
$_Form[$n][0] = str_replace('&lt;'  ,'<',$_Form[$n][0]);
$_Form[$n][0] = str_replace('&nbsp;',' ',$_Form[$n][0]);
$_Form[$n][0] = str_replace('<br>',' ',$_Form[$n][0]);
$_Form[$n][0] = str_replace('<BR>',' ',$_Form[$n][0]);
list($iz, $dch) = explode(',',$_Form[$n][4]);
$Long = $iz+$dch;
fwrite($FileTH, str_pad($Long,4,' ',STR_PAD_LEFT).': '.$_Form[$n][0].' ('.$_Form[$n][1].')'."\n");
}
}
}
$TReg++;
}
fclose($FileTH);
fclose($File);
return $TReg;
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
?>
