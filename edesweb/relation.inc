<?PHP
if( !isset($_SESSION['_User']) || $GLOBALS['_gsID']!=getmypid() ) exit;
foreach($_POST as $k=>$v){
if( strtoupper($k)!=$k ){
$_POST[strtoupper($k)] = $v;
eUnSet($k);
}
}
if( !isset($_POST['RELATIONFIELDS']) || !isset($_POST['VALUES']) ){
echo '<script type="text/javascript">top.eInfoError(window,"Error en petición \"RelationFields\" Múltiple");</script>';
eEnd();
}
$_POST['VALUES'] = str_replace(' ','',$_POST['VALUES']);
$DimCampo = explode(',',str_replace(' ','',$_POST['RELATIONFIELDS']));
$DimValor = explode(',',$_POST['VALUES']);
for( $n=0; $n<count($DimCampo); $n++ ) if( !isset($DimValor[$n]) ) $_POST['VALUES'] .= ',';
if( isset($_DEBUGSubSelect) ) $_DEBUG = $_DEBUGSubSelect;
CabeceraPrint();
if( isset($_POST['SCRIPT']) ){
SelectShowDim($DimCampo);
}else{
SelectPrint();
}
echo '</BODY></HTML>';
eEnd();
function CabeceraPrint(){
global $DimCampo, $DimValor, $_WINTITLE;
?>
<!DOCTYPE HTML>
<HTML><HEAD>
<META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<META gsScript='M:<?=(($_SESSION['_D_']=="")?"":$_POST['SCRIPT'])?>' gsOp=''>
<TITLE><?=$_WINTITLE?></TITLE>
<script type="text/javascript">
var _WOPENER = window.frameElement.WOPENER;
function CopySelects(){
var Tabla = document.getElementsByTagName('TABLE'), n, NmTabla,
DimValor = '<?=$_POST['VALUES']?>'.split(',');
_WOPENER.ePF('<?=$DimCampo[0]?>',DimValor[0],false);
for(n=0; n<Tabla.length; n++){
try{
NmTabla = Tabla[n].id.replace('_TABLE','');
_WOPENER.CopySubSelect( Array( NmTabla+'='+NmTabla), Tabla[n], "<?= $_ADDOPTIONVALUE; ?>" );
_WOPENER.ePF(NmTabla,DimValor[n+1],false);
}catch(e){}
}
<?PHP
if( $_POST['EXEFUNC']!='' ) echo "_WOPENER.".$_POST['EXEFUNC']."();";
?>
}
function _SelCursor(){}
</SCRIPT>
</HEAD>
<BODY onload='CopySelects();'>
<?PHP
}
function SelectPrint(){
global $DimCampo, $DimValor;
for( $c=1; $c<count($DimCampo); $c++ ){
if( substr($DimCampo[$c],0,3)=='cd_' ){
$Tabla = substr($DimCampo[$c],3);
$Campos = 'cd_'.$Tabla.',nm_'.$Tabla;
}
$Filtro = '';
for( $f=0; $f<$c; $f++ ){
if( $Filtro!='' ) $Filtro .= ' and ';
$Filtro .= $DimCampo[$f]."='".$DimValor[$f]."'";
}
qSelect( $Tabla, $Campos, $Filtro,  '2' );
CursorPrint( $DimCampo[$c] );
}
}
function CursorPrint( $CampoOrigen ){
echo "<TABLE INIT=0 id='{$CampoOrigen}_TABLE' onmouseover='_SelCursor(true)' onmouseout='_SelCursor(false)' cols=2>";
echo '<COL id=o><COL>';
echo '<TR><TD><TD>&nbsp;';
while( $row = qRow() ){
echo '<TR><TD>'.trim($row[0]).'<TD>'.trim($row[1]);
}
echo '</TABLE>';
}
function SelectShowDim( $DimCampo ){
$Dim = include(eScript($_POST['SCRIPT']));
for( $n=0; $n<count($Dim); $n++ ){
echo "<TABLE INIT=0 id='{$DimCampo[$n+1]}_TABLE' onmouseover='_SelCursor(true)' onmouseout='_SelCursor(false)' cols=2>";
echo '<COL id=o><COL>';
echo '<TR><TD><TD>&nbsp;';
for( $i=0; $i<count($Dim[$n]); $i++ ){
echo '<TR><TD>'.trim($Dim[$n][$i][0]).'<TD>'.trim($Dim[$n][$i][1]);
}
echo '</TABLE>';
}
}
?>
