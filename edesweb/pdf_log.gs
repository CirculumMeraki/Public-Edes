<?PHP
$_Form = array();
$_PDFWRAP = array(10,true);
$_PDFVAR[] = '$PDF_Grid = true;';
$_COLSOP = explode(',', 'S,S');
for($n=0; $n<count($_COLSOP); $n++){
$_OpCol[$n] = 0;
$_COLSOP[$n] = strtoupper(trim($_COLSOP[$n]));
if( $_COLSOP[$n]=='S' ){
$_NOSELECTROW = true;
$_TGrupos++;
}
if( $_COLSOP[$n]=='%' ) $_TantoPorCiento = true;
$_oCOLSOP[$n] = $_COLSOP[$n];
if( substr_count('+C#', $_COLSOP[$n])>0 ) $_InfSinTotales = false;
}
include('../../edesweb/formulario.inc');
$txt = <<<EOD
GRUPO        | grupo   | #D | T | 30 | | - | | |
DATO         | dato    | #D | T | 30 | | - | | |
VALOR        | valor   | #D | T | 60 | | - | | |
OP           | op      | #D | T | 1  | | - | | |
FECHA Y HORA | cdi     | #D | T | 19 | | - | | |
USUARIO      | usuario | #D | T | 30 | | - | | |
EOD;
$Dim = explode("\n",$txt);
for( $n=0; $n<count($Dim); $n++ ){
if( IncluirEnForm('L', 'l', $Dim[$n], $_Form, $_DEFAUX, 1) ){
$nf = count($_Form)-1;
if( $_Form[$nf][2]!="" && $_Form[$nf][1][0]!="[" ){
$tmp = NombreCampo($_Form[$nf][1]);
$_Field[$tmp] = true;
$_pField[$tmp] = $_Form[$nf];
}
}
}
function PintaCondiciones(){
return array();
}
$_TITLE = 'HISTORICO DE MODIFICACIONES';
$FicheroPDF = '../_datos/config/pdf.ini';
@include($FicheroPDF);
if( !isset($PDF_Lib) ) $PDF_Lib = 'pdf_lista.gs';
if( $_SESSION["List"]["TCPDF"] )  $PDF_Lib = 'pdf_lista_tc.gs';
include_once($Dir_.$PDF_Lib);
?>
