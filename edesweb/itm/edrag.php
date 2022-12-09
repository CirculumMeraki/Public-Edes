<?PHP
function eDrag( $SubVentana, $File, $Titulo, $Visible=true, $ConEsc=true, $x=0, $y=0 ){
global $__Lng;
$Visible = ($Visible)?'':'display:none;';
$ConEsc = ($ConEsc)?'':'display:none;';
echo "<DIV id='_{$SubVentana}' class=SubWin style='{$Visible}position:absolute; left:0px; top:0px; z-index:10; height:1px; width:1px;' dragON onkeydown='eClearEvent()'>";
echo "<table cellspacing=0 cellpadding=0 border=0>";
echo '<col><col width=1>';
echo "<tr>";
echo "<th nowrap onmousedown='vDown()' id='_{$SubVentana}Titulo' style='cursor:pointer'>{$Titulo}</th>";
echo "<th width='1px' style='{$ConEsc}text-align:right'>";
echo "<IMG SRC='g/swclose.gif' onclick='DGI(\"_{$SubVentana}\").style.display=\"none\";' title=".'"'.$__Lng[25].'" style="margin-right:2px">';
echo '</th>';
echo "<tr>";
echo "<td colspan=2>";
if( $File[0]=='>' ){
include(eScript($File));
}else{
call_user_func( $File );
}
echo '</td>';
echo "</table>";
echo "</DIV>";
?>
<SCRIPT type="text/javascript">
DGI('_<?=$SubVentana?>').children[0].rows[0].cells[0].style.width = DGI('_<?=$SubVentana?>').offsetWidth-DGI('_<?=$SubVentana?>').children[0].rows[0].cells[1].children[0].offsetWidth;
if( typeof(_SubVentana)=='undefined' ){
_SubVentana = new Array();
_cSubVentana = new Array();
}
_SubVentana[_SubVentana.length] = '<?=$SubVentana?>';
_cSubVentana[_cSubVentana.length] = '';
ePosition('_<?=$SubVentana?>','<?=$x?>','<?=$y?>');
</SCRIPT>
<?PHP
}
