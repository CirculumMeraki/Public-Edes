<?PHP
list( $script ) = explode("&",substr($_SERVER["QUERY_STRING"],2));
if( isset($_POST['_gs_formato_']) ){
$_PDFGraphicsOnly = true;
function PintaCondiciones(){}
function EnPlural(){}
if( $_POST['_gs_formato_'][0]=='P' ){
eInit();
if( $_SESSION['_PDF_']<>'S' ) eEnd();
$FicheroPDF = '../_datos/config/pdf.ini';
@include( $FicheroPDF );
if( $_SESSION["List"]["TCPDF"] ){
include($Dir_.'pdf_lista_tc.gs');
}else{
if( !isset($PDF_Lib) ) $PDF_Lib = 'pdf_lista.gs';
include_once( $Dir_.$PDF_Lib );
}
}
eEnd();
}
if( !function_exists('sql_Query') ){
global $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOType, $_SqlInit, $_SqlPDOConnect;
$tmpFile = '../_datos/config/sql.ini';
eval( _LoadSqlIni( $tmpFile ) );
include( $Dir_.$_Sql.'.inc' );
}
if( substr_count($script,".php")==0 ){
$fileDef = $script.".chart";
$script .= ".php";
}else{
list($p1, $p2) = explode(".",$script);
$fileDef = $p1.".chart";
}
$_DimFunction = array();
$_DimChart = array();
$_DIM = array();
$_DIMRange = array();
$_IDRange = 1;
$_DimCSS = array();
$file = eScript($fileDef);
if( file_exists($file) ){
$_DimChart = file($file);
}
$cssWepe = "";
if( isset($_GET["_id"]) ){
$_GET["_NOICONS"] = 1;
if( count($_DimChart)==0 ) exit;
$cssWepe = " style='position:relative;left:50%;transform:translateX(-50%);'";
}
if( !isset($_GET["_NOICONS"]) ){
eHTML("F:{$script}", 'C', 'GRÁFICAS');
?>
<style>
BODY {
background-color:#ffffff;
display: inline-table;
margin:0px;
}
.CHART_STORE{
display:none;
text-align:center;
margin:5px 5px 0px 5px;
}
.CHART_SYSTEM, .CHART_USER{
margin:5px;
float:left;
}
.SLIDERBUTTON{
border:1px solid #CFCFCF;
background-color:#ffffff;
cursor:pointer;
}
.SLIDERBUTTON I{
color:#1B6B8D;
font-size:8px;
top:-8px;
position:relative;
}
</style>
</head>
<script type="text/javascript">
document.title = "CHART";
top.S.init(window,"all,list");
var _Source = "<?=$script?>",
_User = <?=$_SESSION["_User"]?>,
_USERFUNCTION = "",
_CONTEXT = <?=$_SESSION['_eDes_']?>;
function Recalcula(){
PAGINA.style.width = "";
if( S(window).windowIs() ){
var wh = S("#PAGINA").css("width,height");
S(window).windowResize(wh["width"], wh["height"]);
var s = S(document.body), ancho=0, alto=0, a;
if(s.sw){
a = document.body.clientHeight;
document.body.style.overflowX = "hidden";
a = document.body.clientHeight-a;
document.body.style.overflowX = "auto";
alto = a;
}
if(s.sh){
a = document.body.clientWidth;
document.body.style.overflowY = "hidden";
a = document.body.clientWidth-a;
document.body.style.overflowY = "auto";
ancho = a;
}
ancho += 3;
S(window).windowResize(wh["width"]+ancho, wh["height"]+alto);
try{ if( _WinCaption ) document.body.style.backgroundImage=""; }catch(e){}
}
}
</SCRIPT>
<style>
TEXT {
font-size:12px;
}
</style>
<?PHP
if( $_SESSION['_PDF_']=='S' ){
?>
<SCRIPT SRC='edes.php?R:$lista_sel.js&j=6'></SCRIPT>
<script type="text/javascript">
document.onkeydown = null;
document.onmousewheel = null;
</SCRIPT>
<?PHP
}
?>
<body onload="Recalcula()" style="background-color:#ffffff;"
<?PHP
if( $_SESSION['_D_']!='' && !($script[0]=="$" && $_SESSION['_D_']<>"~") ) echo " oncontextmenu=top.gsEdit(window)";
if( $_SESSION['_D_']!='' ) echo " oncontextmenu=top.gsEdit(window)";
?>
>
<?PHP }else{ ?>
<SCRIPT type="text/javascript" name=eDes>
top.S.init(window,"all");
var _CONTEXT = <?=$_SESSION['_eDes_']?>;
</script>
<?PHP } ?>
<div id="PAGINA" class="CHART_STORE" style="display:inline-block;text-align:center;background:transparent;padding:0px;margin:5px">
<script type="text/javascript">
function recalcularChart(IDRange, id, col, tipoDato, min, max){
var min = S("#Minimo"+IDRange).text(),
max = S("#Maximo"+IDRange).text();
if( tipoDato=="P4" ){
}else if( tipoDato=="F4" ){
min = S.d2s(min);
max = S.d2s(max);
}else{
min*=1;
max*=1;
}
for(n=0; n<20; n++){
if( S("#CONTENEDOR_"+id+n,window).exists() ){
var tabla = S("#"+id).obj, valor,
tr = tabla.rows,
total = tr.length;
tabla.style.display = "block";
for(i=1; i<total; i++){
if( tipoDato=="P4" ){
valor = tr[i].cells[col].innerText;
}else if( tipoDato=="F4" ){
valor = S.d2s(tr[i].cells[col].innerText);
}else{
valor = tr[i].cells[col].innerText*1;
}
tr[i].style.display = (valor<min || valor>max)? "none" : "block";
}
top.S.chartDraw(top.S("#CONTENEDOR_"+id+n,window).obj, {id:"#"+id, hidden:false});
tabla.style.display = "none";
break;
}
}
}
</script>
<?PHP
if( !isset($_GET["_NOICONS"]) ){
$top = 5;
if( $_SESSION['_PDF_']=='S' ){
eContextPut('Fa:$a/d/export_doc.edf');
$nomUser = str_replace(["'",'"'], ["&#39;","&#34;"], $_SESSION['_UserName']);
echo "<img src='g/l_pdf.png' title='Descargar PDF' onclick='__gsExpor(\"P\",\"I\",\"{$nomUser}\")' style='position:absolute;top:{$top}px;right:5px;z-index:10'>";
$top+=20;
echo '<DIV id="PROCESANDO" class="ICONLOADING" onclick=\'this.style.display="none"\'>r</DIV>';
echo '<form name=FieldCondi METHOD=POST target=TLF style="display:none">';
echo '<input type=hidden name=_PSCRIPT value="'.$script.'">';
echo '<input type=hidden name=_gs_formato_ value="">';
echo '<input type=hidden name=_CACHEFILESRV value="">';
echo '<input type=hidden name=_FILEPDF value="">';
echo '<input type=hidden name=_GRAPHS value="">';
echo '</form>';
}
if( $_SESSION["_D_"]<>"" ){
eContextPut('Fa:$a/d/chart_group.edf');
echo "<i class='ICONMENU ICONDEVELOPMENT' onclick='S.window(\"edes.php?Fa:".'$'."a/d/chart_group.edf&_SYSTEM=1&_CONTEXT=".$_SESSION['_eDes_']."\",{wopener:window, modal:true});' title='Gráficas del Sistema' style='position:absolute;top:{$top}px;right:5px;z-index:10'>[</I>";
}
}
include( eScript($script) );
if( count($_DimChart)>0 ){
for($n=count($_DimChart)-1; $n>=0; $n--){
$def = trim($_DimChart[$n]);
if( $def<>"" ){
if( isset($_GET["_id"]) ){
$dim = explode(",",$_GET["_id"]);
$ok = false;
$tmp = explode("|", $def);
for($i=1; $i<count($tmp); $i+=2){
if( $tmp[$i]=="_id" && in_array($tmp[$i+1], $dim) ){
$ok = true;
break;
}
}
if( !$ok ) continue;
}
eExplodeOne( $def, "|", $id, $defChart );
$unique = substr($defChart,strpos($defChart,"|_id|")+5);
if( $_DIMRange[$id][$unique] ){
echo $_DIMRange[$id][$unique];
}
$defChart = str_replace(["'",'"'], ["&#39;","&#34;"], $defChart);
$css = $cssWepe;
if( $css=="" ){
$css = " style='".$_DimCSS[$id]."'";
}else{
$css = substr($css,0,-1).$_DimCSS[$id]."'";
}
echo '<div class="CHART_SYSTEM" id="CONTENEDOR_'.$id.$n.'" Definition="'.$defChart.'"'.$css.'></div>';
echo '<script type="text/javascript">'."\n";
echo 'if( top.S("#CONTENEDOR_'.$id.$n.'",window).exists() ){';
$func = ( $_DimFunction[$id]<>"" ) ? ', function:'.$_DimFunction[$id]: "";
echo 'top.S.chartDraw(top.S("#CONTENEDOR_'.$id.$n.'",window).obj, {id:"#'.$id.'", hidden:true'.$func.'});'."\n";
echo '}';
echo '</SCRIPT>';
}
}
$_ChartView = true;
}else{
$_ChartView = false;
if( !isset($_GET["_NOICONS"]) ){
?>
<script type="text/javascript">
S.window("edes.php?Fa:$a/d/chart_group.edf&_SYSTEM=1", {wopener:window, modal:true});
</script>
<?PHP
}
}
echo '</div>';
if( !isset($_GET["_NOICONS"]) ) echo '</body></html>';
eEnd();
function eDataOrigin($id, $titulo, $def, $cursor, $func="", $css=""){
global $_ChartView, $_ChartRegion, $_ChartResolution, $_DimFunction, $_DimChart, $_DIM, $_DimCSS;
$_DimFunction[$id] = $func;
$_DIM[$id] = [$def, $cursor];
$pk = "";
if( isset($_GET["_id"]) ){
$dim = explode(",",$_GET["_id"]);
$ok = false;
for($n=count($_DimChart)-1; $n>=0; $n--){
$def2 = trim($_DimChart[$n]);
if( $def2<>"" ){
$tmp = explode("|", $def2);
for($i=1; $i<count($tmp); $i+=2){
if( $tmp[$i]=="_id" && in_array($tmp[$i+1], $dim) ){
$pk = $tmp[$i+1];
$ok = true;
break 2;
}
}
}
}
if( !$ok ) return;
}
$_DimCSS[$id] = $css;
$campos = count($def)/4;
$c = 0;
$titulo = str_replace(["'",'"'], ["&#39;","&#34;"], $titulo);
echo "<table id='{$id}' style='display:none' title='{$titulo}' region='{$_ChartRegion}' resolution='{$_ChartResolution}' function='{$func}'>";
echo '<thead>';
echo '<tr>';
for( $i=0; $i<$campos; $i++ ){
echo '<th oCampo="'.$def[$c+1].'" td="'.$def[$c+2].'" nd="'.$def[$c+3].'" nc="'.$i.'">';
echo $def[$c];
echo '</th>';
$c+=4;
}
echo '</tr>';
echo '</thead>';
echo '<tbody>';
$newCursor = array();
if( $cursor==null ){
global $_HndDB;
while( $r=qRow() ){
$newCursor[] = $r;
eDataOriginRow($campos, $r, $def);
}
}else if( gettype($cursor)=="resource" ){
while( $r=qRow($cursor) ){
$newCursor[] = $r;
eDataOriginRow($campos, $r, $def);
}
}else if( gettype($cursor)=="array" ){
$trs = count($cursor);
for( $r=0; $r<$trs; $r++ ){
$newCursor[] = $cursor[$r];
eDataOriginRow($campos, $cursor[$r], $def);
}
}else{
ePrintR("Error en el paso de parámetros");
}
$_DIM[$id][1] = $newCursor;
echo '</tbody>';
echo "</table>";
if( $func<>"" ) $func = ', function:'.$func;
}
function eDataOriginRow($campos, $r,$def){
$i=0;
echo '<tr>';
for( $c=0; $c<$campos; $c++ ){
echo '<td>';
switch( $def[$i+2] ){
case '+,': case '-,':
echo eNumberFormat($r[$c],$def[$i+3]);
break;
case '+': case '-':
echo eNumberFormat($r[$c],0);
break;
default:
echo $r[$c];
}
echo '</td>';
$i+=4;
}
echo '</tr>';
}
function eChartMap($region, $resolution){
global $_ChartRegion, $_ChartResolution;
$_ChartRegion = $region;
$_ChartResolution = $resolution;
echo '<script type="text/javascript">';
echo "var _ChartRegion = '{$region}', _ChartResolution = '{$resolution}';";
echo '</script>';
}
function eRange($id, $idUnique, $campo, $title, $long=200){
global $_IDRange, $_DIM, $_DimChart, $_DIMRange;
if( isset($_GET["_id"]) ){
$dim = explode(",",$_GET["_id"]);
$ok = false;
for($n=count($_DimChart)-1; $n>=0; $n--){
$def2 = trim($_DimChart[$n]);
if( $def2<>"" ){
$tmp = explode("|", $def2);
for($i=1; $i<count($tmp); $i+=2){
if( $tmp[$i]=="_id" && in_array($tmp[$i+1], $dim) && $tmp[$i+1]==$idUnique ){
$ok = true;
break 2;
}
}
}
}
if( !$ok ) return;
}
$def = $_DIM[$id][0];
$campos = count($def)/4;
$col = 0;
$c = 0;
$tipoDato = "+";
for($i=0; $i<$campos; $i++){
if( $campo==$def[$c+1] ){
$tipoDato = $def[$c+2];
break;
}
$c+=4;
$col++;
}
$tReg = count($_DIM[$id][1]);
$min = $_DIM[$id][1][0][$col];
$max = $_DIM[$id][1][0][$col];
for($i=0; $i<$tReg; $i++){
$min = min( $min, $_DIM[$id][1][$i][$col] );
$max = max( $max, $_DIM[$id][1][$i][$col] );
}
$range = "";
if( $tipoDato=="P4" ){
$range = "set: [";
$range .= "],";
}
$txt = <<<END
<table border=0px style="display:block;margin-left:10px;margin-bottom:5px">
<tr><th colspan=2>{$title}</th>
<tr><td id="Minimo{$_IDRange}"></td><td align=right id="Maximo{$_IDRange}"></td></tr>
<tr><td colspan=2>
<div id="CNTMOVER{$_IDRange}" class="SLIDERBUTTON" style="width:{$long}px; height:2px; text-align:left;">
<i id="OBJMOVERMin{$_IDRange}">*</i>
<i id="OBJMOVERMax{$_IDRange}">*</i>
</div>
</td></tr>
</table>
<script type="text/javascript">
function minMove{$_IDRange}(x, y){}
function minUp{$_IDRange}(x, y){
recalcularChart({$_IDRange}, "{$id}", {$col}, "{$tipoDato}");
}
function maxMove{$_IDRange}(x, y){}
function maxUp{$_IDRange}(x, y){
recalcularChart({$_IDRange}, "{$id}", {$col}, "{$tipoDato}");
}
S("#OBJMOVERMin{$_IDRange}").move("#CNTMOVER{$_IDRange}",null,{
dir:"H",
move:minMove{$_IDRange},
up:minUp{$_IDRange},
offsetY:-2,
min:{$min},
max:{$max},
value:{$min},
{$range}
step:1,
input: "#Minimo{$_IDRange}",
datatype: "{$tipoDato}",
decimals: 0,
linkMax: "#OBJMOVERMax{$_IDRange}"
});
S("#OBJMOVERMax{$_IDRange}").move("#CNTMOVER{$_IDRange}",null,{
dir:"H",
move:maxMove{$_IDRange},
up:maxUp{$_IDRange},
offsetY:-2,
min:{$min},
max:{$max},
value:{$max},
{$range}
step:1,
input: "#Maximo{$_IDRange}",
datatype: "{$tipoDato}",
decimals: 0,
linkMin: "#OBJMOVERMin{$_IDRange}"
});
</script>
END;
$_DIMRange[$id][$idUnique] = $txt;
$_IDRange++;
}
?>
