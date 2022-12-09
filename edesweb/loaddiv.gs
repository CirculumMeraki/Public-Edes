<?PHP
function GenVentanas( $SubVentana ){
global $__Lng;
echo "<IFRAME id='_{$SubVentana}IFRAME' FRAMEBORDER=0 style='z-index:9; height:100px; width:100px; display:none; position:absolute; left:0px; top:0px;'></iframe>";
echo "<DIV id='_{$SubVentana}' class=SubWin style='z-index:10; height:1px; width:1px; display:none; position:absolute; left:0px; top:0px;' dragON onkeydown='eClearEvent()'>";
echo "<table cellspacing=0 cellpadding=0>";
echo "<tr>";
echo "<th nowrap onmousedown='vDown()'>";
echo "<CENTER id='_{$SubVentana}Titulo' style='cursor:pointer'></CENTER>";
echo '<th width="1px" align="right" s_tyle="background:#FF00FF;">';
echo "<IMG SRC='g/swclose.gif' title=".'"'.$__Lng[25].'">';
echo "<tr>";
echo "<td colspan=2>";
echo "<DIV id='{$SubVentana}'></DIV>";
echo "</table>";
echo "</DIV>";
?>
<SCRIPT type="text/javascript">
var _WOPENER = window.frameElement.WOPENER;
if( typeof(_WOPENER._SubVentana)=='undefined' ){
_WOPENER._SubVentana = new Array();
_WOPENER._cSubVentana = new Array();
}
_WOPENER._SubVentana[_WOPENER._SubVentana.length] = '<?=$SubVentana?>';
_WOPENER._cSubVentana[_WOPENER._cSubVentana.length] = '';
_WOPENER.document.body.appendChild(DGI("_<?=$SubVentana?>IFRAME"));
_WOPENER.document.body.appendChild(DGI("_<?=$SubVentana?>"));
_WOPENER.eLoadDiv_();
</SCRIPT>
<?PHP
}
GenVentanas( $_GET['NmWin'] );
eEnd();
?>
