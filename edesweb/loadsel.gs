<?PHP
if( !isset($_SESSION['_User']) ) exit;
if( $_gsID != getmypid() ) exit;
eInclude($_Sql);
$_SERVER['QUERY_STRING'] = urldecode($_SERVER['QUERY_STRING']);
$_SERVER['QUERY_STRING'] = str_replace( '&_CALL=1','',$_SERVER['QUERY_STRING']);
list( $_SERVER['QUERY_STRING'] ) = explode('&_SOURCE=',$_SERVER['QUERY_STRING']);
list( $valor, $ConFiltro ) = explode('~',$_SERVER['QUERY_STRING']);
$valor = explode('|',$valor);
$CampoACargar = $valor[0];
if( substr($CampoACargar,0,3)=='cd_' ){
$Tabla = substr($CampoACargar,3);
$Orden = 'nm_'.$Tabla;
}
$Campos = $CampoACargar.','.$Orden;
$Where = '';
$Filtro = '';
for( $n=1; $n<count($valor); $n+=2 ){
if( $Where!='' ) $Where .= ' and ';
$Where .= ' '.$valor[$n].'="'.$valor[$n+1].'"';
if( $Filtro!='' ) $Filtro .= '|';
$Filtro .= $valor[$n+1];
}
if( $ConFiltro!='' ) $Where .= ' and '.$ConFiltro;
eHTML('$loadsel.gs', 'E', 'eDes');
echo '</HEAD><BODY>';
echo '<TABLE border=0px class="col_0n col_1l" style="cursor:pointer" onclick="elSelUpdate()" cellspacing=1px cellpadding=1px>';
echo '<col id=o><col>';
$ConBlanco = false;
qSelect($Tabla, $Campos, $Where, $Orden);
while( $row=qRow() ){
if( !$ConBlanco ){
$ConBlanco = true;
echo '<TR><TD></TD><TD>&nbsp;</TD></TR>';
}
echo '<TR><TD>'.$row[0].'</TD><TD>'.$row[1].'</TD></TR>';
}
echo '</TABLE>';
?>
<SCRIPT type="text/javascript">
var _WOPENER = window.frameElement.WOPENER,
Obj = _WOPENER.DGI('Sel_<?= $CampoACargar ?>');
Obj.innerHTML = document.getElementsByTagName('TABLE')[0].outerHTML;
Obj.Filtro = "<?=$Filtro?>";
_WOPENER.elSelEdit('<?=$CampoACargar?>', _WOPENER._CellEdit);
</SCRIPT>
<?PHP
echo '</BODY></HTML>';
?>
