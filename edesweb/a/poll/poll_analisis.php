<?= eHTML('$a/poll/poll_analisis.php', '', 'ENCUESTAS') ?>
<STYLE>
body{
padding-left:10px;
}
@font-face {
font-family:'Roboto_regular';
font-style:normal;
font-weight:400;
src:url('fonts/roboto-v15-latin-regular.eot');
src:local('Roboto'), local('Roboto-Regular'),
url('fonts/roboto-v15-latin-regular.eot?#iefix') format('embedded-opentype'),
url('fonts/roboto-v15-latin-regular.woff2') format('woff2'),
url('fonts/roboto-v15-latin-regular.woff') format('woff'),
url('fonts/roboto-v15-latin-regular.ttf') format('truetype'),
url('fonts/roboto-v15-latin-regular.svg#Roboto') format('svg');
}
*{
font-family:'Roboto_regular';
cursor:default;
}
@font-face {
font-family:eDes;
font-weight:normal;
font-style:normal;
text-transform:none;
src:url('fonts/edes.eot?#iefix&v=4.7.0') format('embedded-opentype'),
url('fonts/edes.woff2?v=4.7.0') format('woff2'),
url('fonts/edes.woff?v=4.7.0') format('woff'),
url('fonts/edes.ttf?v=4.7.0') format('truetype'),
url('fonts/edes.svg?v=4.7.0#fontawesomeregular') format('svg');
}
I {
font-family:eDes;
font-weight:normal;
font-style:normal;
text-transform:none;
vertical-align:top;
font-size:13px;
color: #acacac;
margin-left:3px;
}
H3 {
color:#000099;
}
TABLE {
background-color:#dddddd;
}
TH {
background-color:#c3c3c3;
}
TD {
background-color:#ffffff;
}
.PREGUNTA{
color:blue;
border-left:1px solid #acacac;
}
.RESPUESTA{
color:green;
border-left:1px solid #acacac;
}
.FINENCUESTA{
color:red;
border-left:1px solid #acacac;
border-bottom:1px solid #acacac;
}
.EXPLICACION{
color:#868686;
}
.MAXIMOSPUNTOS {
color:#9900cc;
border:1px solid #9900cc;
padding:5px;
}
.PUNTOS{
color:#868686;
}
TFOOT TR TD{
background-color:#f7f7f7;
}
@media print {
@page {
size:auto;
margin:7mm;
}
body {
margin:12mm;
}
footer {page-break-after: always;}
.SOLOHTML{
display:none;
}
}
@media screen {
.SOLOPRINT{
display:none;
}
}
.col_0r th:nth-child(1), .col_0r td:nth-child(1){text-align:right;}
.col_1r th:nth-child(2), .col_1r td:nth-child(2){text-align:right;}
.col_2r th:nth-child(3), .col_2r td:nth-child(3){text-align:right;}
.col_3r th:nth-child(4), .col_3r td:nth-child(4){text-align:right;}
.col_4r th:nth-child(5), .col_4r td:nth-child(5){text-align:right;}
.col_5r th:nth-child(6), .col_5r td:nth-child(6){text-align:right;}
</STYLE>
</HEAD>
<BODY>
<i class="ICONMENU" onclick="this.style.display='none';window.print();this.style.display='table';" style="display:table; background:transparent; position:fixed; top: 10px; right:10px; color:#1B6B8D">8</i>
<?PHP
$_VerTrace = false;
if( !function_exists("qQuery") ){
eInclude($_Sql);
}
$pkPoll = $_GET["cd_gs_poll"]*1;
$pkCampaign = $_GET["cd_gs_campaign"]*1;
if( qCount("gs_question", "cd_gs_poll={$pkPoll}")==0 ){
die("·");
}
qQuery("select nm_gs_poll from gs_poll where cd_gs_poll={$pkPoll}");
list($nmPoll) = qArray();
eJS("try{ history.pushState({foo:'bar'}, '-*-', 'ANALISIS_DE_ENCUESTA'); }catch(e){}");
echo "<h3>ENCUESTA: {$nmPoll}</h3>";
echo '<table border="0" cellspacing="1" cellpadding="3" style="display:table">';
$pre = array();
$totalPreguntas = 0;
$PreUtilizada = array();
qQuery("select * from gs_question where cd_gs_poll={$pkPoll} order by orden", $pPregunta);
while( $pregunta=qArray($pPregunta) ){
$pkQuestion = $pregunta["cd_gs_question"];
$pregunta["json"] = str_replace(
array("&#34;"),
array('"'    ),
$pregunta["json"]
);
$dim = json_decode(utf8_encode($pregunta["json"]), true);
switch(json_last_error()){
case JSON_ERROR_NONE:
break;
case JSON_ERROR_DEPTH:
if($_VerTrace)eTrace('2- Excedido tamaño máximo de la pila');
eTron('2- Excedido tamaño máximo de la pila');
break;
case JSON_ERROR_STATE_MISMATCH:
if($_VerTrace)eTrace('2- Desbordamiento de buffer o los modos no coinciden');
eTron('2- Desbordamiento de buffer o los modos no coinciden');
break;
case JSON_ERROR_CTRL_CHAR:
if($_VerTrace)eTrace('2- Encontrado carácter de control no esperado');
eTron('2- Encontrado carácter de control no esperado');
break;
case JSON_ERROR_SYNTAX:
if($_VerTrace)eTrace('2- Error de sintaxis, JSON mal formado');
eTron('2- Error de sintaxis, JSON mal formado');
break;
case JSON_ERROR_UTF8:
if($_VerTrace)eTrace('2- Caracteres UTF-8 malformados, posiblemente están mal codificados');
eTron('2- Caracteres UTF-8 malformados, posiblemente están mal codificados');
break;
default:
if($_VerTrace)eTrace('2- Error desconocido');
eTron('2- Error desconocido');
break;
}
foreach($dim as $k=>$v) $dim[$k] = utf8_decode($v);
$pre[$totalPreguntas++] = [$pregunta["cd_gs_question"], $pregunta["orden"], $dim];
$PreUtilizada[$totalPreguntas] = 0;
}
echo "</table>";
define('PREGUNTA',  0);
define('ORDEN'	 ,  1);
define('DATOS'	 ,  2);
$nivel = 0;
$finDeEncuesta = -1;
$PreRepetida = array();
$ultimaPregunta = -1;
$Puntos = 0;
$MaxPuntos = 0;
$PreguntasPorRuta = array();
$PuntosPorRuta = array();
$TotalPuntos = 0;
for($n=0; $n<count($pre); $n++){
if( $pre[$n][DATOS]["respuesta_type"]=="FE" ){
$finDeEncuesta = $pre[$n][PREGUNTA];
break;
}
}
if( $finDeEncuesta==-1 ){
$n = count($pre);
$pre[$n] = array();
$pre[$n][0] = -2;
$pre[$n][1] = $n+1;
$pre[$n][2] = array(
"orden"=>$n,
"pregunta"=>"Fin Encuesta",
"respuesta_type"=>"FE",
"pagina_texto"=>"Gracias por participar"
);
}
for($n=0; $n<count($pre); $n++){
$PreguntasPorRuta[$n+1] = 0;
$PreRepetida[$pre[$n][ORDEN]] = 1;
foreach($pre[$n][DATOS] as $k=>$v){
$pre[$n][DATOS][$k] = str_replace(array("{#60#}", "{#62#}", "{#34#}"), array("<",">",'"'), $v);
}
}
for($n=0; $n<count($pre); $n++){
if( $pre[$n][DATOS]["respuesta_type"]=="FE" ){
$finDeEncuesta = $pre[$n][PREGUNTA];
break;
}
}
PintarPregunta($pre[0][PREGUNTA], $nivel, 0);
if( $pre[count($pre)-1][DATOS]["respuesta_type"]!="FE" ){
$xPuntos = PintaPuntos($Puntos);
echo "<div class='FINENCUESTA' style='padding-left:20px;'> Fin de encuesta{$xPuntos}</div>";
}
echo "<br class='SOLOHTML'>";
echo "<h3 class='SOLOPRINT' style='page-break-before:always;'>ENCUESTA: {$nmPoll}</h3>";
echo '<table border="0" cellspacing="1" cellpadding="3" class="col_0r col_1r col_2r" style="display:table">';
echo "<caption>Nº de preguntas por rama</caption>";
echo "<tr><th>Nº de Preguntas</th><th>Nº de Ramas</th><th>%</th></tr>";
sort($PreguntasPorRuta);
$total = 0;
for($n=0; $n<count($PreguntasPorRuta); $n++){
$total += $PreguntasPorRuta[$n];
}
if( $total==0 )
$ii=0;
for($n=0; $n<count($PreguntasPorRuta); $n++){
if( $PreguntasPorRuta[$n]>0 ){
$ii++;
$tpc = eNumberFormat(($PreguntasPorRuta[$n]*100)/$total, 2);
echo "<tr><td>{$n}</td><td>{$PreguntasPorRuta[$n]}</td><td>{$tpc}%</td></tr>";
}
}
echo "<tfoot>";
if( $ii==0 && $total==0 ){
$ii = $totalPreguntas;
$total = 1;
}
echo "<tr><td>{$ii}</td><td>{$total}</td><td>100,00%</td></tr>";
echo "</tfoot>";
echo "</table>";
echo "<div>Nº de preguntas: <b>".$totalPreguntas."</b></div>";
if( $MaxPuntos>0 ){
echo "<br>";
echo '<table border="0" cellspacing="1" cellpadding="3" class="col_0r col_1r col_2r" style="display:table">';
echo "<caption>Nº de puntos por rama</caption>";
echo "<tr><th>Nº de Puntos</th><th>Nº de Ramas</th><th>%</th></tr>";
$decimales = 0;
$total = 0;
foreach($PuntosPorRuta as $k=>$v){
list($iz, $dch) = explode(".", substr($k,1));
$decimales = max($decimales, strlen($dch));
if( $k[0]=="_" ) $total += $v;
}
$n=0; $tRamas=0; $dim = array();
foreach($PuntosPorRuta as $k=>$v){
if( $k[0]=="_" ){
$tRamas += $v;
$k = substr($k,1);
$tpc = eNumberFormat(($v*100)/$total, 2);
$k = eNumberFormat($k, $decimales);
$dim[] = [$k, $v, $tpc];
}
}
$MaxPuntos = 0;
sort($dim);
for($n=0; $n<count($dim); $n++){
$MaxPuntos = max($dim[$n][0]*1, $MaxPuntos);
echo "<tr><td>{$dim[$n][0]}</td><td>{$dim[$n][1]}</td><td>{$dim[$n][2]}%</td></tr>";
}
echo "<tfoot>";
echo "<tr><td></td><td>{$tRamas}</td><td>100,00%</td></tr>";
echo "</tfoot>";
echo "</table>";
list(,$dec) = explode(".", $MaxPuntos+"");
echo "<span>Puntuación máxima: <b>".eNumberFormat($MaxPuntos, strlen($dec))."</b></span>";
}
foreach($PreUtilizada as $k=>$v){
if( $v==0 ){
eInit();
echo "<span style='color:red'>ERROR: La pregunta nº".$k." no se utiliza.</span>";
eEnd();
}
}
?>
<script type='text/javascript'>
var ancho, i, w=window.opener;
for(i=1; i<99; i++){
if( w.S(".IGUALAR_"+i, window).length ){
ancho = 0;
w.S(".IGUALAR_"+i, window).each(function(k,o){
ancho = Math.max(ancho, o.offsetWidth);
});
w.S(".IGUALAR_"+i, window).each(function(k,o){
w.S(o, window).css("width", ancho);
});
}
}
</script>
<?PHP
echo "</body></thml>";
eEnd();
function PintarPregunta($pk, $nivel, $aPuntos=0){
global $pre, $finDeEncuesta, $PreRepetida, $ultimaPregunta, $PreguntasPorRuta, $PuntosPorRuta, $TotalPuntos, $PreUtilizada;
global $Puntos, $MaxPuntos;
if( $nivel==1 ){
$marginPre = 40;
$marginRes = 20;
}else{
$marginPre = 0;
$marginRes = 20;
}
for($n=0; $n<count($pre); $n++){
if( $pre[$n][PREGUNTA]==$pk ){
$PreRepetida[$pre[$n][ORDEN]]++;
if( $PreRepetida[$pre[$n][ORDEN]]>2 ){
eInit();
echo "<span style='color:red'>ERROR: Se repite la pregunta nº".$pre[$n][ORDEN].", se llama desde la nº".$ultimaPregunta.".</span>";
eEnd();
}
$ultimaPregunta = $pre[$n][ORDEN];
if( $PreUtilizada[$ultimaPregunta]=="" ) $PreUtilizada[$ultimaPregunta] = 0;
$PreUtilizada[$ultimaPregunta]++;
$maxPuntos = 0;
if( $pre[$n][DATOS]["respuesta_type"]=="FE" ){
$MaxPuntos = max($MaxPuntos, $Puntos);
$xPuntos = PintaPuntos($Puntos);
echo "<div style='padding-left:20px;' class='FINENCUESTA' eMaxPuntos='".eNumberFormat($MaxPuntos, 2)."'>&nbsp;".$pre[$n][ORDEN].": Fin de encuesta{$xPuntos}";
$i=0;
for($p=0; $p<count($PreRepetida); $p++) if( $PreRepetida[$p]==2 ) $i++;
$PreguntasPorRuta[$i]++;
if( !isset($PuntosPorRuta["_".$Puntos]) ) $PuntosPorRuta["_".$Puntos] = 0;
$PuntosPorRuta["_".$Puntos]++;
}else{
echo "<div style='padding-left:{$marginPre}px;' class='PREGUNTA'>&nbsp;".$pre[$n][ORDEN].": ".$pre[$n][DATOS]["pregunta"];
}
$cPuntos = "";
switch($pre[$n][DATOS]["respuesta_type"]){
case "R":
case "C":
case "M":
$conSalto = false;
for($i=1; $i<99; $i++){
$cPregunta = "respuesta_{$i}_fld";
$cJump = "respuesta_{$i}_jump";
if( $pre[$n][DATOS][$cPregunta]!="" ){
if( $pre[$n][DATOS][$cJump]!="" && $pre[$n][DATOS][$cJump]!="0" ){
$conSalto = true;
break;
}
}
}
for($i=1; $i<99; $i++){
$cPregunta = "respuesta_{$i}_fld";
$cJump = "respuesta_{$i}_jump";
$cPuntos = "respuesta_{$i}_pnt";
if( $pre[$n][DATOS][$cPregunta]!="" ){
$xPuntos = PintaPuntos($pre[$n][DATOS][$cPuntos]);
$maxPuntos = max($maxPuntos, $pre[$n][DATOS][$cPuntos]);
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>".$pre[$n][DATOS][$cPregunta]."{$xPuntos}</div>";
if( $conSalto ){
$Puntos += $pre[$n][DATOS][$cPuntos];
$PuntosPorRuta[$Puntos] = 1;
Salto($pre[$n][DATOS][$cJump], $marginRes, $n, $pre[$n][DATOS][$cPuntos]);
$Puntos -= $pre[$n][DATOS][$cPuntos];
$PuntosPorRuta[$Puntos] = 1;
}
}
}
$Puntos += $maxPuntos;
$PuntosPorRuta[$Puntos] = 1;
if( !$conSalto && $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 0, $maxPuntos);
$Puntos -= $maxPuntos;
}
break;
case "MM":
$tmp = explode("<br>", $pre[$n][DATOS]["menu_extendido"]);
$menu = array();
for($i=0; $i<count($tmp); $i++){
$tmp[$i] = trim($tmp[$i]);
if( $tmp[$i]!="" ){
$menu[] = $tmp[$i];
}
}
if( substr_count($menu[0],",")>0 ){
$label = explode(",", $menu[0]);
array_walk($label, function(&$txt){ $txt=trim($txt); });
$tmp = array();
for($i=1; $i<count($menu); $i++){
if( $menu[$i]!="" ){
$tmp2 =  explode(",", $menu[$i]);
array_walk($tmp2, function(&$txt){ $txt=trim($txt); });
$tmp[] = $tmp2;
}
}
$menu = $tmp;
$last = $label;
array_walk($last, function(&$txt){ $txt="-"; });
for($f=0; $f<count($menu); $f++){
for($c=0; $c<count($menu[$f]); $c++){
$indice2 = "";
for($i=0; $i<=$c; $i++) $indice2 .= "".$menu[$f][$i];
if( $last[$c]!=$indice2 ){
echo "<div class='RESPUESTA' style='padding-left:".($marginRes+30*($c))."px;'>".$menu[$f][$c]."</div>";
}
$indice = "";
for($i=0; $i<=$c; $i++) $indice .= "".$menu[$f][$i];
$last[$c] = $indice;
}
}
}else{
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>".implode("<br>", $menu)."</div>";
}
if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 0);
}
break;
case "T":
case "A":
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'><input disabled></div>";
if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 0);
}
break;
case "S":
$conSalto = ($pre[$n][DATOS]["slide_1_jump"]>0 || $pre[$n][DATOS]["slide_2_jump"]>0 || $pre[$n][DATOS]["slide_3_jump"]>0);
if( $conSalto ){
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>Valor es ".$pre[$n][DATOS]["slide_min"]."</div>";
if( $pre[$n][DATOS]["slide_1_jump"]>0 ){
Salto($pre[$n][DATOS]["slide_1_jump"], $marginRes, $n);
}else if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 1);
}
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>Valor > ".$pre[$n][DATOS]["slide_min"]." y < ".$pre[$n][DATOS]["slide_max"]."</div>";
if( $pre[$n][DATOS]["slide_2_jump"]>0 ){
Salto($pre[$n][DATOS]["slide_2_jump"], $marginRes, $n);
}else if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 1);
}
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>Valor es ".$pre[$n][DATOS]["slide_max"]."</div>";
if( $pre[$n][DATOS]["slide_3_jump"]>0 ){
Salto($pre[$n][DATOS]["slide_3_jump"], $marginRes, $n);
}else if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 1);
}
}else if( $n<(count($pre)-1) ){
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>Valor de 0 a 10</div>";
PintarPregunta($pre[$n+1][PREGUNTA], 0);
}
break;
case "P":
$conSalto = ($pre[$n][DATOS]["valoracion_1_jump"]>0 || $pre[$n][DATOS]["valoracion_2_jump"]>0);
if( $conSalto ){
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>Valor es 0</div>";
if( $pre[$n][DATOS]["valoracion_1_jump"]>0 ){
Salto($pre[$n][DATOS]["slide_1_jump"], $marginRes, $n);
}else if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 1);
}
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>Valor > 0 y < 10</div>";
if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 1);
}
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>Valor es 10</div>";
if( $pre[$n][DATOS]["valoracion_2_jump"]>0 ){
Salto($pre[$n][DATOS]["valoracion_2_jump"], $marginRes, $n);
}else if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 1);
}
}else if( $n<(count($pre)-1) ){
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>Valor de 0 a 10</div>";
PintarPregunta($pre[$n+1][PREGUNTA], 0);
}
break;
case "V":
$conSalto = false;
$nSalto = 0;
for($i=1; $i<=$pre[$n][DATOS]["ranking"]; $i++){
if( $pre[$n][DATOS]["ranking_{$i}_jump"]>0 ){
$conSalto = true;
$nSalto++;
}
}
$icono = "";
if( $pre[$n][DATOS]["respuesta_conimg"]=="S" && $pre[$n][DATOS]["ranking_img"]!="" ){
$icono = '<img id="" src="poll/'.$pre[$n][DATOS]["ranking_img"].'" style="height:18px; vertical-align:top;">';
}else{
switch($pre[$n][DATOS]["ranking_forma"]){
case "E":
$icono = "<i class='ICONINPUT' style='color:#aaaaaa' style='height:18px; vertical-align:top;'>Z</i>";
break;
case "C":
$icono = "<i class='ICONINPUT' style='color:#aaaaaa' style='height:18px; vertical-align:top;'>*</i>";
break;
case "O":
$icono = '<img id="" src="poll/ok_2.png" style="height:18px; vertical-align:top;">';
break;
case "N":
break;
case "B":
break;
}
}
if( $conSalto ){
if( $nSalto<$pre[$n][DATOS]["ranking"] ){
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>";
echo $icono.": ";
$pinto = false;
for($i=1; $i<=$pre[$n][DATOS]["ranking"]; $i++){
if( $pre[$n][DATOS]["ranking_{$i}_jump"]<=0 ){
if( $pinto ) echo ", ";
echo $i;
$pinto = true;
}
}
echo "</div>";
if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 1);
}
}
for($i=1; $i<=$pre[$n][DATOS]["ranking"]; $i++){
if( $pre[$n][DATOS]["ranking_{$i}_jump"]>0 ){
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>{$icono}: {$i}</div>";
Salto($pre[$n][DATOS]["ranking_{$i}_jump"], $marginRes, $n);
}
}
}else{
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>{$icono} De 1 a ".$pre[$n][DATOS]["ranking"]."</div>";
if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 0);
}
}
break;
case "K":
$conSalto = false;
$nSalto = 0;
$nPre = 0;
for($i=1; $i<99; $i++){
$cPregunta = "respuesta_{$i}_fld";
$cJump = "respuesta_{$i}_jump";
if( $pre[$n][DATOS][$cPregunta]!="" ){
$nPre++;
if( $pre[$n][DATOS][$cJump]!="" && $pre[$n][DATOS][$cJump]!="0" ){
$conSalto = true;
$nSalto++;
}
}
}
if( $conSalto ){
if( $nSalto<$nPre ){
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'><span class='EXPLICACION'>Valores sin salto: </span>";
$nSalto = 0;
for($i=1; $i<99; $i++){
$cPregunta = "respuesta_{$i}_fld";
$cJump = "respuesta_{$i}_jump";
$cPuntos = "respuesta_{$i}_pnt";
if( $pre[$n][DATOS][$cPregunta]!="" && ($pre[$n][DATOS][$cJump]=="" || $pre[$n][DATOS][$cJump]=="0") ){
if( $nSalto>0 ) echo ", ";
echo $pre[$n][DATOS][$cPregunta];
$nSalto++;
}
}
echo "</div>";
if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 1);
}
}
for($i=1; $i<99; $i++){
$cPregunta = "respuesta_{$i}_fld";
$cJump = "respuesta_{$i}_jump";
$cPuntos = "respuesta_{$i}_pnt";
if( $pre[$n][DATOS][$cPregunta]!="" && $pre[$n][DATOS][$cJump]!="" && $pre[$n][DATOS][$cJump]!="0" ){
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>".$pre[$n][DATOS][$cPregunta]."</div>";
Salto($pre[$n][DATOS][$cJump], $marginRes, $n);
}
}
}else{
for($i=1; $i<99; $i++){
$cPregunta = "respuesta_{$i}_fld";
$cJump = "respuesta_{$i}_jump";
$cPuntos = "respuesta_{$i}_pnt";
if( $pre[$n][DATOS][$cPregunta]!="" ){
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>".$pre[$n][DATOS][$cPregunta]."</div>";
}
}
if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 0);
}
}
break;
case "X":
for($i=1; $i<99; $i++){
$cPregunta = "unir_pregunta_".$i;
$cRespuesta = "unir_respuesta_".$i;
$cPuntos = "unir_{$i}_pnt";
if( $pre[$n][DATOS][$cPregunta]!="" ){
$xPuntos = PintaPuntos($pre[$n][DATOS][$cPuntos]);
$maxPuntos = max($maxPuntos, $pre[$n][DATOS][$cPuntos]);
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>".$pre[$n][DATOS][$cPregunta]." = ".$pre[$n][DATOS][$cRespuesta]."{$xPuntos}</div>";
}
}
$Puntos += $maxPuntos;
$PuntosPorRuta[$Puntos] = 1;
if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 0, $maxPuntos);
$Puntos -= $maxPuntos;
}
break;
case "O":
for($i=1; $i<99; $i++){
$cPregunta = "hueco_pregunta_".$i;
$cPuntos = "hueco_{$i}_pnt";
if( $pre[$n][DATOS][$cPregunta]!="" ){
$xPuntos = PintaPuntos($pre[$n][DATOS][$cPuntos]);
$maxPuntos = max($maxPuntos, $pre[$n][DATOS][$cPuntos]);
$tmp2 = explode(";", $pre[$n][DATOS]["hueco_respuesta_".$i]);
for($p=0; $p<count($tmp2); $p++){
$pre[$n][DATOS][$cPregunta] = str_replace("{".$tmp2[$p]."}", "<input disabled style='width:75px;'>", $pre[$n][DATOS][$cPregunta]);
}
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>".$pre[$n][DATOS][$cPregunta]."{$xPuntos}</div>";
}
}
$Puntos += $maxPuntos;
$PuntosPorRuta[$Puntos] = 1;
if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 0, $maxPuntos);
$Puntos -= $maxPuntos;
}
break;
case "B":
for($i=1; $i<99; $i++){
$cPregunta = "pregunta_".$i;
if( $pre[$n][DATOS][$cPregunta]!="" ){
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'>";
echo "<span class='IGUALAR_".$pre[$n][ORDEN]."' style='display:inline-block;'>".$pre[$n][DATOS][$cPregunta]."</span>&nbsp;<input disabled>";
echo "</div>";
}
}
if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 0);
}
break;
case "U":
case "L":
case "Z":
case "J":
$tipoRespuesta = array("L"=>"Página Libre", "Z"=>"Mapa de calor", "J"=>"Rejilla", "U"=>"Datos de Contacto")[$pre[$n][DATOS]["respuesta_type"]];
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'><span class='EXPLICACION'>[{$tipoRespuesta}]</span></div>";
if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 0);
}
break;
case "H":
case "D":
case "DH":
case "F":
$ancho = array("H"=>25, "D"=>80, "DH"=>80, "F"=>250)[$pre[$n][DATOS]["respuesta_type"]];
echo "<div class='RESPUESTA' style='padding-left:{$marginRes}px;'><input disabled style='width:{$ancho}px'>";
if( $pre[$n][DATOS]["respuesta_type"][0]=="D" ){
echo '<i class="ICONINPUT">,</i>';
}
if( $pre[$n][DATOS]["respuesta_type"]=="DH" ){
echo " <input disabled style='width:25px;'>";
}else if( $pre[$n][DATOS]["respuesta_type"]=="F" ){
echo '<i class="ICONINPUT">w</i>';
}
echo "</div>";
if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 0);
}
break;
}
echo "</div>";
$PreRepetida[$pre[$n][ORDEN]]--;
return;
}
}
}
function Salto($Jump, $marginRes, $n, $aPuntos=0){
global $pre, $finDeEncuesta, $Puntos;
if( $Jump!="" && $Jump!="0" ){
if( $Jump=="-1" ){
if( $finDeEncuesta!=-1 ){
PintarPregunta($finDeEncuesta, 1, $aPuntos);
}else{
global $Puntos, $MaxPuntos, $PreRepetida, $PreguntasPorRuta, $PuntosPorRuta;
$MaxPuntos = max($MaxPuntos, $Puntos);
$xPuntos = "";
if( $MaxPuntos>0 ){
$xPuntos = eNumberFormat($Puntos, 2);
while(strlen($xPuntos)>0 && substr($xPuntos,-1)=="0"){
$xPuntos = substr($xPuntos,0,-1);
}
if( substr($xPuntos,-1)==","){
$xPuntos = substr($xPuntos,0,-1);
}
$xPuntos = " ({$xPuntos}pts)";
}
echo "<div class='FINENCUESTA' style='padding-left:".($marginRes*2)."px;' eMaxPuntos='".eNumberFormat($MaxPuntos, 2)."'>Fin de encuesta{$xPuntos}</div>";
$i=0;
for($p=0; $p<count($PreRepetida); $p++) if( $PreRepetida[$p]==2 ) $i++;
$PreguntasPorRuta[$i]++;
if( !isset($PuntosPorRuta["_".$Puntos]) ) $PuntosPorRuta["_".$Puntos] = 0;
$PuntosPorRuta["_".$Puntos]++;
}
}else{
PintarPregunta($Jump, 1, $aPuntos);
}
}else if( $n<(count($pre)-1) ){
PintarPregunta($pre[$n+1][PREGUNTA], 1, $aPuntos);
}
}
function PintaPuntos($Puntos){
$xPuntos = "";
if( $Puntos>0 ){
$xPuntos = eNumberFormat($Puntos, 2);
while(strlen($xPuntos)>0 && substr($xPuntos,-1)=="0"){
$xPuntos = substr($xPuntos,0,-1);
}
if( substr($xPuntos,-1)==","){
$xPuntos = substr($xPuntos,0,-1);
}
if( $xPuntos=="1" ){
$xPuntos = "<span class='PUNTOS'> ({$xPuntos}pt)</span>";
}else{
$xPuntos = "<span class='PUNTOS'> ({$xPuntos}pts)</span>";
}
}
return $xPuntos;
}
?>
