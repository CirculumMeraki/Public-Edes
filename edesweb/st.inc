<?PHP
$_Lng['Sel'] = 'Sel';
define('_ERROR_REPORTING', 5);
error_reporting(_ERROR_REPORTING);
ini_set("display_errors",1);
date_default_timezone_set('Europe/Madrid');
define('_TRACK_ERRORS', false);
ini_set('track_errors', false);
ini_set('default_charset', 'ISO-8859-1');
header("Content-Type: text/html; charset=ISO-8859-1");
list($field, $table, $parent, $order, $index, $type, $level, $caption, $xfunction, $xIconOp, $xServer, $xMultiple, $xFolder, $xStatic, $pk) = explode('|',$_GET['ST:C']);
$xServer = trim($xServer);
$Tree = [
'table'=>$table,
'parent'=>$parent,
'order'=>$order,
'index'=>$index,
'type'=>$type,
'level'=>$level,
'caption'=>$caption,
'function'=>$xfunction,
'server'=>$xServer,
'multiple'=>$xMultiple,
'folder'=>$xFolder,
'static'=>$xStatic,
'icon_op'=>$xIconOp
];
if( $xServer=="" ){
$Dim = qSelectTree($Tree, $pk);
}else{
$Dim = call_user_func($xServer, "R", $Tree, $pk);
}
eHTML('$st.inc');
echo '</head<body>';
echo '<table id="'.$field.'_TABLE">';
for( $n=0; $n<count($Dim); $n++ ){
echo '<tr n="'.$Dim[$n][0].'" t="'.$Dim[$n][1].'" nivel="'.$Dim[$n][2].'"';
echo '>';
echo '<td>&nbsp;</td>';
echo '<td id="n'.$Dim[$n][2].'">';
if( $Dim[$n][1]=='F' ){
if( $NivelesVisibles-1 > $Dim[$n][2] ){
echo "<i>d</i>";
}else{
echo "<i>c</i>";
}
}
echo str_replace('"','&quot;',$Dim[$n][3]).'</td>';
echo '</tr>';
}
echo '</table>';
?>
<script type="text/javascript">
var DGI	= function(a){
var el;
if( document.getElementById ){
el = document.getElementById(a);
}else if( document.all ){
el = document.document.all[a];
}else if( document.layers ){
el = document.document.layers[a];
}
return el || document.getElementsByName(a)[0] || null;
}
var win = window.frameElement.WOPENER,
Desde = win._SelectTreeParent+1,
Origen = DGI('<?=$field?>_TABLE'),
Destino = win.DGI('<?=$field?>_TABLE'),
oRows = Origen.rows,
oTotal = oRows.length,
Sel = Destino.getAttribute("Option"), n;
if( Sel!='' ){
Sel *= 1;
if( Sel>=Desde ){
Destino.setAttribute("Option", Sel+oTotal);
}
}
var TR, TD;
for(n=0; n<oTotal; n++){
TR = Destino.insertRow(Desde++);
TR.setAttribute('n',oRows[n].getAttribute('n'));
TR.setAttribute('t',oRows[n].getAttribute('t'));
TR.setAttribute('nivel',oRows[n].getAttribute('nivel'));
TD = TR.insertCell(0);
TD.innerText = " ";
TD = TR.insertCell(1);
TD.innerHTML = oRows[n].cells[1].innerHTML;
TD.id = oRows[n].cells[1].id;
}
var img = Destino.rows[win._SelectTreeParent].cells[1].firstChild;
img.innerText = "d";
win.eSelectTreeResize(Destino);
win._SelectTreeParent = -1;
</script>
<?PHP
echo '</body></html>';
eEnd();
function qSelectTree($Tree, $pk){
$Icono = '';
if( $Tree['icon_op']<>'' ){
$Icono = "<img src='{$Tree['icon_op']}'> ";
}else{
$Icono = "<i>b</i>";
}
$Dim = array();
qQuery( "select * from {$Tree['table']} where {$Tree['parent']}={$pk} order by {$Tree['order']}" );
while( $r=qArray() ){
$r[$Tree['level']] *= 1;
if( $r[$Tree['type']]=="F" ){
$Dim[] = array(
$r[$Tree['index']],
$r[$Tree['type']],
$r[$Tree['level']],
$r[$Tree['caption']]
);
}else{
$Dim[] = array(
$r[$Tree['index']],
$r[$Tree['type']],
$r[$Tree['level']],
$Icono.$r[$Tree['caption']]
);
}
}
return $Dim;
}
?>
