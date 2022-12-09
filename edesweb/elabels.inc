<?php
require_once(dirname(__FILE__).'/tcpdf.inc');
class eLabels{
var $debugPDF = 0;
var $outputMethod   = 'D';
var $targetFilename = '';
var $orientaton		='P';
var $unit			='mm';
var $pageWidth 		= 210;
var $pageHeight 	= 297;
var $marginTop 		= 5;
var $marginBottom 	= 5;
var $marginLeft 	= 0;
var $marginRight 	= 0;
var $columnsNumber  = 3;
var $rowsNumber		= 8;
var $labelWidth		= 70;
var $labelHeight	= 36;
var $labelInnerMarginTop  = 5;
var $labelInnerMarginLeft = 5;
var $fontSize		= 8;
var $fontFamily		= 'helvetica';
var $totalPages = 0;
public function eMakeLabels($data){
$pdf = new TCPDF($this->orientaton, $this->unit, array($this->pageWidth,$this->pageHeight), false, 'ISO-8859-1', false);
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('EDES');
$pdf->SetTitle('LABELS');
$pdf->SetSubject("*********");
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->SetMargins($this->marginLeft, $this->marginTop, $this->marginRight);
$pdf->SetAutoPageBreak(FALSE);
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
$pdf->SetFont($this->fontFamily, '', $this->fontSize);
$curCol  = 0;
$curRow  = 0;
$curPage = 0;
$lstPage = -1;
$s='';
foreach($data as $k=>$texto){
if( $curPage!=$lstPage ){
$pdf->AddPage();
$lstPage=$curPage;
}
$c = $c.$this->getCol($texto);
$curCol++;
if( $curCol==$this->columnsNumber ){
$r = $r.$this->getRow($c);
$curCol=0;
$curRow++;
$c='';
}
if( $curRow == $this->rowsNumber ){
$s = $this->getHoja($r);
$newline = true;
$fill = false;
$resetLastCellHeight = false;
$cMargin = false;
$pdf->writeHTML( specialChars($s), $newline, $fill, $resetLastCellHeight, $cMargin, "");
$curRow=0;
$curCol=0;
$s=$r=$c='';
$curPage++;
}
}
if( $c!='' ){
for( ; $curCol!=$this->columnsNumber ; $curCol++ ){
$c = $c.$this->getCol('');
}
$r = $r.$this->getRow($c);
}
if( $r!='' ){
$s = $this->getHoja($r);
$newline = true;
$fill = false;
$resetLastCellHeight = false;
$cMargin = false;
$pdf->writeHTML( specialChars($s), $newline, $fill, $resetLastCellHeight, $cMargin, "");
}
$pdf->lastPage();
$pdf->Output( $this->targetFilename , $this->outputMethod);
$curPage++;
$this->totalPages = $curPage;
}
function getCol($t){
$h = $this->labelHeight - $this->labelInnerMarginTop;
$w = $this->labelWidth - $this->labelInnerMarginLeft;
return <<<EOD
<TD height="{$this->labelHeight}mm" width="{$this->labelWidth}mm">
<table cellspacing="0" cellpadding="0" border="0">
<tr>
<td height="{$this->labelInnerMarginTop}mm" width="{$this->labelWidth}mm" colspan="2"></td>
</tr>
<tr>
<td height="{$h}mm" width="{$this->labelInnerMarginLeft}mm"></td>
<td height="{$h}mm" width="{$w}mm">{$t}</td>
</tr>
</table>
</TD>
EOD;
}
function getRow($t){
return <<<EOD
<TR>{$t}</TR>
EOD;
}
function getHoja($t){
$t=str_ireplace('<br>','<BR/>',$t);
return <<<EOD
<TABLE cellspacing="0" cellpadding="0" border="{$this->debugPDF}">
{$t}
</TABLE>
EOD;
}
} // class ended
?>
