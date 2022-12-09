<style>
* {
cursor:pointer;
}
html, body {
margin:0px;
padding:0px;
}
</style>
<script>
document.title = "LST";
top.S.init(window, "list");
function selColor(){
var o = S.event(window);
if( o.tagName=="TD" && o.children.length==0 ){
o = S.toTag(o, "TR");
console.log(o.cells[1].innerText);
var obj = S(_WOPENER._FldLinkColor).obj,
c = "#"+o.cells[1].innerText;
S(obj).val(S(obj).attr("tc")=="CLR" ? S.upper(c) : c);
S(obj).css({backgroundColor:c, color:top.eColorContrastBW(c)});
S(obj).attr("eChange",1);
atr = obj.getAttribute("eLinkPaper");
if( atr!=null && cp==185 ){
S(":"+atr, _WOPENER).css("background-color", c);
}
atr = obj.getAttribute("eLinkColor");
if( atr!=null && cp==184 ){
S(":"+atr, _WOPENER).css("color", c);
}
S.window(window);
}
}
</script>
<?PHP
$old = strtoupper($_GET["color"]);
if( $old[0]=="#" ) $old = substr($old,1);
$nTabla = 0;
echo '<table border=0px style="display:table;" cellspacing=0px cellpadding=0px onclick="selColor()">';
$dim = file("../../edesweb/t/paleta.txt");
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt!="" ){
list($label, $color) = explode("#", $txt);
if( $label[0]==":" ){
if( $nTabla>0 ) echo '</table>';
$nTabla++;
if( ($nTabla%3)==1 && $nTabla>0 ) echo "<tr>";
echo "<td valign=top width='33%'><table border=0px style='display:table;width:100%;' cellspacing=0px cellpadding=5px>";
}
$oldColor = "";
$color = strtoupper($color);
if( $old==$color ){
$oldColor = "border:2px solid ".eColorContrastBW2($color).";";
}
echo "<tr style='background-color:#{$color};color:".eColorContrastBW2($color)."'><td>".substr($label,1)."<td style='{$oldColor}'>".$color;
}
}
echo '</table>';
echo '</table>';
?>
<script>
S.windowView(window);
</script>
