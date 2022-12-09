<?PHP
global $_SELECTLOAD, $_ADDOPTION;
list( ,$Fichero ) = explode(':',$_SERVER["QUERY_STRING"]);
list( $Fichero ) = explode('?',$Fichero);
$_DESTINO_ = $_SELECTLOAD;
eHTML("P:{$Fichero}", "S");
?>
<script type="text/javascript">
function CopySelect(){
try{
window.frameElement.WOPENER.CopySubSelect( Array('<?= $_DESTINO_.'='.$_DESTINO_; ?>'), document.getElementsByTagName('TABLE')[0], "<?= $_ADDOPTIONVALUE; ?>" );
<?PHP
?>
window.frameElement.WOPENER._ExeDimRelationFields();
}catch(e){}
}
</SCRIPT>
</HEAD>
<BODY onload='CopySelect();'>
<?PHP
echo "<TABLE INIT=0 id='{$_DESTINO_}_TABLE' onmouseover='_SelCursor(true)' onmouseout='_SelCursor(false)' cols=2>";
echo '<COL id=o><COL>';
echo '<TR><TD><TD>';
for( $n=0; $n<count($_ADDOPTION); $n++ ){
$row = $_ADDOPTION[$n];
if( $MasVacio ){
echo $Vacio;
$MasVacio = false;
}
echo '<TR><TD>'.trim($row[0]).'<TD>'.trim($row[1]);
}
?>
</TABLE>
<SCRIPT type="text/javascript">function _SelCursor(){}</SCRIPT>
</BODY></HTML>
<?PHP
eEnd();
?>
