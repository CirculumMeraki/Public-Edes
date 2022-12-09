<?= eHTML('$a/poll/poll_resultado.php', '', 'ENCUESTA') ?>
<STYLE>
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
TFOOT TD {
background-color:#eae9e9;
}
.col_0r th:nth-child(1), .col_0r td:nth-child(1){text-align:right;}
.col_1r th:nth-child(2), .col_1r td:nth-child(2){text-align:right;}
.col_2r th:nth-child(3), .col_2r td:nth-child(3){text-align:right;}
.col_3r th:nth-child(4), .col_3r td:nth-child(4){text-align:right;}
.col_4r th:nth-child(5), .col_4r td:nth-child(5){text-align:right;}
.col_5r th:nth-child(6), .col_5r td:nth-child(6){text-align:right;}
.col_6r th:nth-child(7), .col_6r td:nth-child(7){text-align:right;}
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
.Circle {
position: relative;
-top: -19px;
-left:-2px;
font-size: 100%;
background-color:red;
color:#ffffff;
font-family: Arial, sans-serif;
width: 16px;
height: 16px;
margin-left: 10px;
margin-right: 10px;
margin-top: 0px;
margin-bottom: 0px;
box-sizing: initial;
display: inline-block;
cursor:pointer;
border-radius: 50%;
box-sizing: content-box;
padding:5px;
display: inline-flex;
justify-content: center;
align-items: center;
text-align: center;
-webkit-box-shadow: 2px 2px 1px 0px rgba(50, 50, 50, 0.65);
-moz-box-shadow:    2px 2px 1px 0px rgba(50, 50, 50, 0.65);
box-shadow:         2px 2px 1px 0px rgba(50, 50, 50, 0.65);
}
A {
text-decoration: none;
color:#000000;
cursor:pointer;
}
</STYLE>
</HEAD>
<BODY>
<i class="ICONMENU" onclick="this.style.display='none';window.print();this.style.display='table';" style="display:table; background:transparent; position:fixed; top: 10px; right:10px; color:#1B6B8D">8</i>
<?PHP
$_VerTrace = false;
if( !function_exists("qQuery") ){
eInclude($_Sql);
}
eInclude("graph");
$pkPoll = $_GET["cd_gs_poll"]*1;
$pkCampaign = $_GET["cd_gs_campaign"]*1;
if( qCount("gs_question", "cd_gs_poll={$pkPoll}")==0 ){
die("");
}
qQuery("select nm_gs_poll from gs_poll where cd_gs_poll={$pkPoll}");
list($nmPoll) = qArray();
eJS("try{ history.pushState({foo:'bar'}, '-*-', 'ESTADÍSTICA_DE_ENCUESTA'); }catch(e){}");
echo "<h3>ENCUESTA: {$nmPoll}</h3>";
if( qCount("gs_reply", "cd_gs_poll={$pkPoll} and cd_gs_campaign={$pkCampaign}")==0 ){
eJSAnswer('window.opener.S.info("La encuesta no tiene ningún resultado.", 3, "warning"); window.close();');
}
$NumeroTotalDePreguntas = 0;
$dim = array();
qQuery("select orden, respuesta_type from gs_question where cd_gs_poll={$pkPoll} order by orden");
while( $r=qRow() ){
$dim[$r[0]-1] = array($r[0], 0,0,0,0, $r[1]);
$NumeroTotalDePreguntas++;
}
echo '<table border="0" cellspacing="1" cellpadding="3" style="display:table; width:100%; ">';
echo "<tr><td style='padding-left:20px; padding-top:20px'>";
qQuery("select P.orden, count(*), sum(R.segundos), min(R.segundos), max(R.segundos), P.respuesta_type
from gs_reply as R left join gs_question as P on R.cd_gs_poll=P.cd_gs_poll and R.cd_gs_question=P.cd_gs_question
where R.cd_gs_poll={$pkPoll} and R.cd_gs_campaign={$pkCampaign}
group by P.orden, P.respuesta_type
order by P.orden"
);
while($r=qRow()){
$dim[$r[0]-1] = $r;
}
echo '<table border="0" cellspacing="1" cellpadding="3" style="display:table" class="col_0r col_1r col_2r col_3r col_4r col_5r col_6r">';
echo "<caption><a name='RESMENU' id='RESMENU' style='cursor:default'>Estadística de participación</a></caption>";
echo "<tr><th>Número<br>Pregunta</th><th>Número de<br>Respuestas</th><th>Mín.Sg</th><th>Máx.Sg</th><th>Media</th><th>Mediana</th>";
echo "</tr>";
$DimRespuestasPorPregunta = array();
$TotalRespuestas = 0;
$nPregunta = 1;
for($n=0; $n<$NumeroTotalDePreguntas; $n++){
$nPregunta = $n+1;
$r = $dim[$n];
$media = $r[2]/$r[1];
$regMediana = 0;
if( $r[1]>0 ){
$regMediana = ceil($r[1]/2);
}
$TotalRespuestas += $r[1];
qQuery("select cd_gs_question from gs_question where cd_gs_poll={$pkPoll} and orden={$nPregunta} order by orden");
list($pkQuestion) = qRow();
$sum2 = 0;
$varianza = 0;
$mediana = 0;
if( $pkQuestion>0 ){
$i = 0;
qQuery("select segundos from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_campaign={$pkCampaign} and cd_gs_question={$pkQuestion} order by segundos");
while($r2=qRow()){
$val = $r2[0];
$sum2 += (($val-$media)*($val-$media));
$i++;
if( $regMediana==$i ) $mediana = $val;
}
}
echo "<tr eTP='{$r[5]}' eQ='{$pkQuestion}'>";
echo "<td><a href='#RES{$nPregunta}'>".$nPregunta."</a></td>";
echo "<td>".eNumberFormat($r[1], 0)."</td>";
echo "<td>".$r[3]."</td>";
echo "<td>".$r[4]."</td>";
echo "<td>".(int)($media)."</td>";
echo "<td>".(int)($mediana)."</td>";
echo "</tr>";
$DimRespuestasPorPregunta[$nPregunta] = $r[1];
}
echo "<tfoot>";
echo "<tr'>";
echo "<td>&nbsp;</td>";
echo "<td>".eNumberFormat($TotalRespuestas, 0)."</td>";
echo "<td>&nbsp;</td>";
echo "<td>&nbsp;</td>";
echo "<td>&nbsp;</td>";
echo "<td>&nbsp;</td>";
echo "</tr>";
echo "</tfoot>";
echo "</table>";
qQuery("select sum(puntos) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_campaign={$pkCampaign}");
$r = qRow();
if( $r[0]>0 ){
qQuery("select punt,num from (select cd_gs_reply_user, sum(puntos) punt, count(*) num from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_campaign={$pkCampaign} group by 1 order by 1) as x");
echo '<table border="0" cellspacing="1" cellpadding="3" style="display:table" class="col_0r col_1r col_2r col_3r col_4r col_5r col_6r">';
echo "<caption>Estadística&nbsp;de&nbsp;Puntos</caption>";
echo "<tr><th>Puntos</th><th>Nº de veces</th></tr>";
while($r=qRow()){
echo "<tr'>";
echo "<td>".eNumberFormat($r[0], 2)."</td>";
echo "<td>".eNumberFormat($r[0], 0)."</td>";
echo "</tr>";
}
echo "</table>";
}
echo "</td></tr>";
$totalPreguntas = 0;
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
eTron('2- Caracteres UTF-8 malformados, posiblemente están mal codificados');
break;
default:
if($_VerTrace)eTrace('2- Error desconocido');
eTron('2- Error desconocido');
break;
}
$ok = true;
switch($pregunta["respuesta_type"]){
case "FE":
if( $dim["pregunta"]=="" ) $dim["pregunta"] = "Fin encuesta";
break;
case "B":
case "L":
case "T":
case "A":
case "F":
}
if( !$ok ) continue;
foreach($dim as $k=>$v) $dim[$k] = utf8_decode($v);
$_COLSOP = array();
$_COLSOP[] = "C";
$_Form = array();
$_Form[] = explode("|", "Nombre | nombre | D | T | 30 || - ||	||||nombre");
$res = array();
$res[] = array("Nombre");
$nPregunta = 0;
$totalPreguntas++;
qQuery("select count(*), sum(segundos), min(segundos), max(segundos) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign}");
list($Registros, $TotalSg, $MinSg, $MaxSg) = qRow();
if($_VerTrace)eTrace("Registros: ".$Registros." - Media Sg: ".($TotalSg/$Registros).' - '.$MinSg."/".$MaxSg);
echo "</table>";
echo "<br>"."<a name='RES{$totalPreguntas}' id='RES{$totalPreguntas}'></a>";
echo '<table border="0" cellspacing="1" cellpadding="3" style="display:table; width:100%; page-break-before:always;">';
echo "<tr><td style='background:#f3f3f3; padding-bottom:10px; padding-top:10px;' eQ='".$dim["cd_gs_question"]."'>";
$dim["pregunta"] = str_replace(
array("<br>", "{#34#}", "{#34#}", "{#61#}", "{#60#}", "{#62#}", "{#92#}", "{#43#}"),
array("\n"  , '"'     , "&quot;", '='     , "<"     , ">"     , "\\"    , "+"     ),
$dim["pregunta"]
);
echo "<a href='#RESMENU'><span class='Circle'>".$totalPreguntas."</span></a> ".$dim["pregunta"];
echo "</td></tr>";
echo "<tr><td style='padding-left:30px; margin-bottom:20px; padding-top:20px; padding-bottom:20px;'>";
if( $DimRespuestasPorPregunta[$totalPreguntas]==0 && $pregunta["respuesta_type"]!="FE" ){
echo "No hay respuestas a esta pregunta.";
continue;
}
switch($pregunta["respuesta_type"]){
case "R":
$xDimLabel = array();
$maxLen = 0;
for($n=1; $n<99; $n++){
$indice = "respuesta_".$n."_fld";
$nPregunta = $n;
if( $dim[$indice]!="" ){
$xDimLabel[$n] = $dim[$indice];
$maxLen = max(strlen($dim[$indice]), $maxLen);
}
}
echo '<table border="0" cellspacing="1" cellpadding="3">';
for($n=1; $n<99; $n++){
$indice = "respuesta_".$n."_fld";
$nPregunta = $n;
if( $dim[$indice]!="" ){
$res[0][$n] = 0;
echo "<tr>";
if( $maxLen>25 ){
echo "<td width='30px' align=center>({$nPregunta})</td>";
}
if( $dim["respuesta_".$n."_img"]!="" && $dim["respuesta_conimg"]=="S" ){
echo "<td width='50px'>";
echo '<img src="poll/'.$dim["respuesta_".$n."_img"].'" style="float:left; margin-right:10px; margin-bottom:5px;">';
echo "</td>";
}
echo "<td width='30px'><input type=radio disabled></td><td width='90px'><label>".$dim[$indice]."</label></td>";
echo "</tr>";
if( $maxLen>25 ){
$xLabel = "({$nPregunta})";
}else{
$xLabel = $xDimLabel[$n];
}
$_Form[] = explode("|", "{$xLabel} | opcion_{$nPregunta} | + | T | 9 || - ||	||||opcion_{$nPregunta}");
$_COLSOP[] = "+";
}
}
echo "</table>";
qQuery("select respuesta, count(*) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign} group by respuesta order by respuesta");
while($r=qRow()){
if($_VerTrace) eTron("Respuesta: ".$r[0].' = Votos: '.$r[1]);
$res[0][$r[0]] = $r[1];
}
VerGraph();
break;
case "C":
$xDimLabel = array();
$maxLen = 0;
$tmp = array();
for($n=1; $n<99; $n++){
$indice = "respuesta_".$n."_fld";
if( $dim[$indice]!="" ){
$tmp[$n] = 0;
$res[0][] = 0;
$xDimLabel[$n] = $dim[$indice];
$maxLen = max(strlen($dim[$indice]), $maxLen);
}
}
qQuery("select respuesta, count(*) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign} group by respuesta order by respuesta");
while($r=qRow()){
$nPregunta++;
if($_VerTrace)eTrace("Respuesta: ".$r[0].' = Votos: '.$r[1]);
$tmp2 = explode(",", $r[0]);
for($n=0; $n<count($tmp2); $n++){
if( $tmp[$tmp2[$n]]=="" ) $tmp[$tmp2[$n]] = 0;
$tmp[$tmp2[$n]] += $r[1];
}
}
foreach($tmp as $k=>$v) $res[0][$k] += $v;
echo '<table border="0" cellspacing="1" cellpadding="3">';
for($n=1; $n<99; $n++){
$nPregunta = $n;
$indice = "respuesta_".$n."_fld";
if( $dim[$indice]!="" ){
echo "<tr>";
if( $maxLen>25 ){
echo "<td width='30px' align=center>({$nPregunta})</td>";
}
if( $dim["respuesta_"+$n+"_img"]!="" && $dim["respuesta_conimg"]=="S" ){
echo "<td>";
echo '<img src="poll/'+$dim["respuesta_".$n."_img"].'" style="float:left; margin-right:10px; margin-bottom:5px;">';
echo "</td>";
}
echo "<td><input type=checkbox disabled></td><td><label>".$dim[$indice]."</label></td>";
echo "</tr>";
if( $maxLen>25 ){
$xLabel = "({$nPregunta})";
}else{
$xLabel = $xDimLabel[$n];
}
$_Form[] = explode("|", "{$xLabel} | opcion_{$nPregunta} | + | T | 9 || - ||	||||opcion_{$nPregunta}");
$_COLSOP[] = "+";
}
}
echo "</table>";
VerGraph();
break;
case "M":
$xDimLabel = array();
$maxLen = 0;
$tmp = array();
for($n=1; $n<99; $n++){
$indice = "respuesta_".$n."_fld";
if( $dim[$indice]!="" ){
$tmp[$n] = 0;
$res[0][] = 0;
$xDimLabel[$n] = $dim[$indice];
$maxLen = max(strlen($dim[$indice]), $maxLen);
}
}
qQuery("select respuesta, count(*) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign} group by respuesta order by respuesta");
while($r=qRow()){
if($_VerTrace)eTrace("Respuesta: ".$r[0].' = Votos: '.$r[1]);
$res[0][$r[0]] = $r[1];
}
echo '<table border="0" cellspacing="1" cellpadding="3">';
for($n=1; $n<99; $n++){
$nPregunta = $n;
$indice = "respuesta_".$n."_fld";
if( $dim[$indice]!="" ){
echo "<tr>";
if( $maxLen>25 ){
echo "<td width='30px' align=center>({$nPregunta})</td>";
}
echo "<td><label>".$dim[$indice]."</label></td>";
echo "</tr>";
if( $maxLen>25 ){
$xLabel = "({$nPregunta})";
}else{
$xLabel = $xDimLabel[$n];
}
$_Form[] = explode("|", "{$xLabel} | opcion_{$nPregunta} | + | T | 9 || - ||  ||||opcion_{$nPregunta}");
$_COLSOP[] = "+";
}
}
echo "</table>";
VerGraph();
break;
case "V":
for($n=1; $n<=$dim["ranking"]; $n++){
$nPregunta = $n;
$res[0][$n] = 0;
$_Form[] = explode("|", "Op {$nPregunta} | opcion_{$nPregunta} | + | T | 9 || - ||	||||opcion_{$nPregunta}");
$_COLSOP[] = "+";
}
qQuery("select respuesta, count(*) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign} group by respuesta order by respuesta");
while($r=qRow()){
if($_VerTrace) eTrace("Respuesta: ".$r[0].' = Votos: '.$r[1]);
$res[0][$r[0]+1] = $r[1];
}
$icono = "";
if( $dim["respuesta_conimg"]=="S" && $dim["ranking_img"]!="" ){
$icono = '<img id="" src="poll/'.$dim["ranking_img"].'" class="OFFIMG">';
}else{
switch($dim["ranking_forma"]){
case "E":
$icono = "<i class='ICONINPUT' style='color:#aaaaaa'>Z</i>";
break;
case "C":
$icono = "<i class='ICONINPUT' style='color:#aaaaaa'>*</i>";
break;
case "O":
$icono = '<img id="" src="poll/ok_2.png" class="OFFIMG">';
break;
case "N":
break;
case "B":
break;
}
}
echo '<table class="ESTRELLAS" border="0" cellspacing="1" cellpadding="3" style="border-collapse:collapse;">';
echo "<tr>";
for($n=1; $n<=$dim["ranking"]; $n++){
$indice = "ranking_".$n;
echo "<td align=center>".$dim[$indice]."</td>";
}
echo "</tr>";
echo "<tr id='COLSIGUALES'>";
for($n=1; $n<=$dim["ranking"]; $n++){
echo "<td align=center>".$icono."</td>";
}
echo "</tr>";
echo "</table>";
VerGraph();
break;
case "P":
for($n=0; $n<=11; $n++){
$nPregunta = $n." Punto";
if( $n!=1 ) $nPregunta.="s";
$_Form[] = explode("|", "{$nPregunta} | opcion_{$nPregunta} | + | T | 9 || - ||	||||opcion_{$nPregunta}");
$_COLSOP[] = "+";
$res[0][$n] = 0;
}
qQuery("select respuesta, count(*) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign} group by respuesta order by respuesta");
while($r=qRow()){
if($_VerTrace) eTrace("Respuesta: ".$r[0].' = Votos: '.$r[1]);
$res[0][$r[0]+1] = $r[1];
}
echo "<span width='1px' style='display:table-cell;'>";
echo "<table width='100%' style='border-collapse:collapse;'><tr><td class='cNOWRAP' style='white-space:nowrap;'>".$dim["valoracion_1"]."</td>";
echo "<td style='width:100%'></td>";
echo "<td class='cNOWRAP' style='white-space:nowrap;'>".$dim["valoracion_2"]."</td></tr></table>";
echo "<table style='background-color:#d6eaef;color:#2b5c5f;'><tr>";
for($n=0; $n<=10; $n++){
echo "<td width='70px' style='text-align:center;border:1px solid #4f9196'>".$n."</td>";
}
echo "</tr></table>";
echo "<span>";
VerGraph();
break;
case "K":
$xDimLabel = array();
$maxLen = 0;
qQuery("select respuesta, count(*) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign} group by respuesta order by respuesta");
while($r=qRow()){
$nPregunta++;
$r[0] = str_replace("|", ", ", $r[0]);
$_Form[] = explode("|", "{$r[0]} | opcion_{$nPregunta} | + | T | 9 || - ||	||||opcion_{$nPregunta}");
$_COLSOP[] = "+";
if($_VerTrace) eTrace("Respuesta: ".$r[0].' = Votos: '.$r[1]);
$res[0][] = $r[1];
}
echo '<table border="0" cellspacing="1" cellpadding="3" style="display:-webkit-inline-box">';
for($n=1; $n<99; $n++){
$indice = "respuesta_".$n."_fld";
if( $dim[$indice]!="" ){
echo "<tr><td>";
if( $dim["respuesta_".$n."_img"]!="" && $dim["respuesta_conimg"]=="S" ){
echo '<img id="respuesta_'.$n.'_img" src="poll/'.$dim["respuesta_".$n."_img"].'" style="float:left; margin-right:10px; margin-bottom:5px;"> ';
}
echo $dim[$indice];
echo "</td></tr>";
}
}
echo  "</table>";
VerGraph();
break;
case "X":
$nPregunta = 0;
$label = "0 Aciertos";
$res[0][] = 0;
$_Form[] = explode("|", "{$label} | opcion_{$nPregunta} | + | T | 9 || - ||	||||opcion_{$nPregunta}");
$_COLSOP[] = "+";
for($n=1; $n<99; $n++){
$indice = "unir_pregunta_".$n;
if( $dim[$indice]!="" ){
$nPregunta++;
$label = $nPregunta." Acierto".(($nPregunta==1)?"":"s");
$res[0][] = 0;
$_Form[] = explode("|", "{$label} | opcion_{$nPregunta} | + | T | 9 || - ||	||||opcion_{$nPregunta}");
$_COLSOP[] = "+";
}
}
$nPregunta = 0;
qQuery("select aciertos, count(*) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign} group by aciertos order by aciertos");
while($r=qRow()){
$nPregunta++;
if($_VerTrace)eTrace("Respuesta: ".$r[0].' = Votos: '.$r[1]);
$res[0][$r[0]+1] = $r[1];
}
echo '<table style="display:-webkit-inline-box;" border="0" cellspacing="1" cellpadding="3">';
for($n=1; $n<99; $n++){
$indice = "unir_pregunta_".$n;
if( $dim[$indice]!="" ){
echo "<tr>";
echo "<td>";
if( $dim["unir_".$n."_img"]!="" && $dim["respuesta_conimg"]=="S" ){
echo '<img src="poll/'.$dim["unir_".$n."_img"].'" style="float:left; margin-right:10px; margin-bottom:5px;">';
}
echo $dim[$indice]."</td>";
echo "<td>".$dim["unir_respuesta_".$n]."</td>";
echo "</tr>";
}
}
echo "</table>";
VerGraph();
break;
case "O":
$nPregunta = 0;
$label = "0 Aciertos";
$res[0][] = 0;
$_Form[] = explode("|", "{$label} | opcion_{$nPregunta} | + | T | 9 || - ||	||||opcion_{$nPregunta}");
$_COLSOP[] = "+";
for($n=1; $n<99; $n++){
$indice = "hueco_pregunta_".$n;
if( $dim[$indice]!="" ){
$nPregunta++;
$label = $nPregunta." Acierto".(($nPregunta==1)?"":"s");
$res[0][] = 0;
$_Form[] = explode("|", "{$label} | opcion_{$nPregunta} | + | T | 9 || - ||	||||opcion_{$nPregunta}");
$_COLSOP[] = "+";
}
}
qQuery("select aciertos, count(*) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign} group by aciertos order by aciertos");
while($r=qRow()){
if($_VerTrace)eTrace("Respuesta: ".$r[0].' = Votos: '.$r[1]);
$res[0][$r[0]+1] = $r[1];
}
for($n=1; $n<99; $n++){
$indice = "hueco_pregunta_".$n;
if( $dim[$indice]!="" ){
if( $n>1 ) echo "<br><br>";
if( $dim["hueco_".$n."_img"]!="" && $dim["respuesta_conimg"]=="S" ){
echo '<img src="poll/'.$dim["hueco_".$n."_img"].'" style="float:left; margin-right:10px; margin-bottom:5px;">';
}
$tmp2 = explode(";", $dim["hueco_respuesta_".$n]);
for($i=0; $i<count($tmp2); $i++){
$campo = $tmp2[$i];
$dim[$indice] = str_replace("{".$campo."}", "<input size='10' disabled>", $dim[$indice]);
}
echo $dim[$indice];
}
}
VerGraph();
break;
case "D":
case "DH":
case "H":
qQuery("select respuesta, count(*) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign} group by respuesta order by respuesta");
while($r=qRow()){
if($_VerTrace)eTrace("Respuesta: ".$r[0].' = Votos: '.$r[1]);
$nPregunta++;
$label = str_replace("|", " / ", $r[0]);
$res[0][] = $r[1];
$_Form[] = explode("|", "{$label} | opcion_{$nPregunta} | + | T | 9 || - ||	||||opcion_{$nPregunta}");
$_COLSOP[] = "+";
}
VerGraph();
break;
case "Z":
echo '<img src="poll/'.$dim["mapa_img"].'" style="cursor:crosshair"><br>';
$tmp = explode("~", $dim["mapa_json"]);
$nPregunta = 0;
$label = "0 Aciertos";
$res[0][] = $r[1];
$_Form[] = explode("|", "{$label} | opcion_{$nPregunta} | + | T | 9 || - ||	||||opcion_{$nPregunta}");
$_COLSOP[] = "+";
for($n=0; $n<=count($tmp); $n++){
if( $tmp[$n][0]=="S" ){
$nPregunta++;
$label = $nPregunta." Acierto".(($nPregunta==1)?"":"s");
$res[0][] = $r[1];
$_Form[] = explode("|", "{$label} | opcion_{$nPregunta} | + | T | 9 || - ||	||||opcion_{$nPregunta}");
$_COLSOP[] = "+";
}
}
qQuery("select aciertos, count(*) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign} group by aciertos order by aciertos");
while($r=qRow()){
$label = $r[0]. " Acierto".(($r[0]==1)?"":"s");
$res[0][$r[0]+1] = $r[1];
}
VerGraph();
break;
case "B":
break;
case "T":
$maxRespuestas = 20;
$dimResultado = array();
qQuery("select respuesta, count(*) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign} group by 1 order by 2 desc,1");
$n=0;
while($r=qRow()){
if( ++$n>$maxRespuestas ) break;
$dimResultado[] = $r;
}
if( count($dimResultado)>0 ){
echo '<table border="0" cellspacing="1" cellpadding="3">';
echo Espacios("<caption>Las ".count($dimResultado)." respuestas mas usadas</caption>");
echo "<tr><th>Orden</th><th>Respuesta</th><th>Número&nbsp;de<br>Respuestas</th>";
for($p=0; $p<count($dimResultado); $p++){
echo "<tr><td align=right>".($p+1)."</td><td>".$dimResultado[$p][0]."</td><td align=right>".eNumberFormat($dimResultado[$p][1], 0)."</td></tr>";
}
echo "</table>";
echo "<br>";
}
case "A":
$maxRespuestas = 20;
$dimResultado = array();
qQuery("select palabra,count(*) from gs_poll_dct where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign} group by 1 order by 2 desc,1");
$palabra = array();
$n=0;
while($r=qRow()){
if( ++$n>$maxRespuestas ) break;
$dimResultado[] = $r;
$palabra[] = $r[0];
}
if( count($dimResultado)>0 ){
echo '<table border="0" cellspacing="1" cellpadding="3">';
echo Espacios("<caption>Las ".count($dimResultado)." palabras mas usadas</caption>");
echo "<tr><th>Orden</th><th>Palabra</th><th>Número&nbsp;de<br>Respuestas</th>";
for($p=0; $p<count($dimResultado); $p++){
echo "<tr><td align=right>".($p+1)."</td><td>".$dimResultado[$p][0]."</td><td align=right>".eNumberFormat($dimResultado[$p][1], 0)."</td></tr>";
}
echo "</table>";
}
echo "<br>";
$dimGrupo = array();
$dimGrupoUsada = array();
for($p=0; $p<count($palabra); $p++){
qQuery("select palabra,count(*) from gs_poll_dct where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign}
and palabra<>'{$palabra[$p]}' and cd_gs_reply in (
select cd_gs_reply from gs_poll_dct where cd_gs_poll=8 and cd_gs_question={$pkQuestion} and palabra='{$palabra[$p]}'
)group by 1 order by 2 desc,1");
$n=0;
while($r=qRow()){
$grupo = min($palabra[$p], $r[0])." ".max($palabra[$p], $r[0]);
if( $dimGrupoUsada[$grupo]=="" ){
$dimGrupoUsada[$grupo] = 1;
if( ++$n>$maxRespuestas ) break;
$dimGrupo[] = str_pad($r[1], 10, " ", STR_PAD_LEFT)."|".$grupo;
}
}
}
rsort($dimGrupo);
if( count($dimGrupo)>0 ){
echo '<table border="0" cellspacing="1" cellpadding="3">';
echo Espacios("<caption>Los ".count($dimGrupo)." grupos de palabras mas usados</caption>");
echo "<tr><th>Orden</th><th>Palabras</th><th>Número&nbsp;de<br>Respuestas</th>";
for($p=0; $p<count($dimGrupo); $p++){
$r = explode("|", $dimGrupo[$p]);
echo "<tr><td align=right>".($p+1)."</td><td>".$r[1]."</td><td align=right>".eNumberFormat($r[0], 0)."</td></tr>";
}
echo "</table>";
}
break;
case "MM":
$todo = array();
qQuery("select respuesta,count(*) from gs_reply where cd_gs_poll={$pkPoll} and cd_gs_question={$pkQuestion} and cd_gs_campaign={$pkCampaign} group by 1 order by 1");
while($r=qRow()) $todo[] = $r;
$TotalSelect = count(explode("|",$todo[0][0]));
$DimSelect = array();
for($n=0; $n<$TotalSelect; $n++){
$DimSelect[$n] = array();
for($p=0; $p<count($todo); $p++){
$tmp = explode("|", $todo[$p][0]);
$caption = "";
for($i=0; $i<=$n; $i++){
if( $caption!="" ) $caption .= "|";
$caption .= trim($tmp[$i]);
}
if( $DimSelect[$n][$caption]=="" ) $DimSelect[$n][$caption] = 0;
$DimSelect[$n][$caption] += $todo[$p][1];
}
}
$dim["menu_extendido"] = str_replace(
array("<br>", "{#34#}", "{#34#}", "{#61#}", "{#60#}", "{#62#}", "{#92#}", "{#43#}"),
array("\n"  , '"'     , "&quot;", '='     , "<"     , ">"     , "\\"    , "+"     ),
$dim["menu_extendido"]
);
$dim["menu_extendido"] = str_replace(
array("  "," , ", " ,", ", "),
array( " ", "|" ,  "|", "|" ),
$dim["menu_extendido"]
);
$resultado = explode("<br>",$dim["menu_extendido"]);
$tmp = explode("|",$resultado[0]);
$TotalSelect = count($tmp);
$xTitulo = array();
echo '<table border="0" cellspacing="1" cellpadding="3">';
for($n=0; $n<$TotalSelect; $n++){
echo "<tr><td>".$tmp[$n]."</td><td><input size='60' disabled></td></tr>";
$xTitulo[] = $tmp[$n];
}
echo '</table>';
if( $TotalSelect==1 && count($resultado)>20 ){
$bak = $resultado;
$resultado = array();
foreach($DimSelect[0] as $k=>$v){
for($n=0; $n<count($bak); $n++){
if( $bak[$n]==$k ){
$resultado[] = $k;
if( count($resultado)==20 ) break;
}
}
}
$xTitulo[0] = "Solo los 20 primeros valores con resultados";
}
$select = array();
$xSelect = array();
$desde = (($TotalSelect>1)?1:0);
for($n=$desde; $n<count($resultado); $n++){
$tmp = explode("|",$resultado[$n]);
$select[$tmp[0]] = 1;
}
$xDimLabel = array();
$nPregunta = 1;
foreach($select as $k=>$v){
$k = trim($k);
$xDimLabel[] = $k;
$res[0][] = $DimSelect[0][$k];
$_Form[] = explode("|", "{$k} | op_{$nPregunta} | + | T | 9 || - ||	||||op_{$nPregunta}");
$_COLSOP[] = "+";
$nPregunta++;
}
VerGraph($xTitulo[0]);
if( $TotalSelect>1 ){
for($ns=1; $ns<$TotalSelect; $ns++){
for($n=0; $n<count($xDimLabel); $n++){
$_COLSOP = array();
$_COLSOP[] = "C";
$_Form = array();
$_Form[] = explode("|", "Nombre | nombre | D | T | 30 || - ||	||||nombre");
$res = array();
$res[] = array("Nombre");
$nPregunta = 0;
for($p=1; $p<count($resultado); $p++){
$tmp = explode("|", $resultado[$p]);
$tmp[0] = trim($tmp[0]);
if( $xDimLabel[$n]==$tmp[0] ){
$k = $resultado[$p];
$res[0][] = $DimSelect[$ns][$k]*1;
$k = $tmp[1];
$_Form[] = explode("|", "{$k} | op_{$nPregunta} | + | T | 9 || - ||	||||op_{$nPregunta}");
$_COLSOP[] = "+";
$nPregunta++;
}
}
VerGraph($xTitulo[$ns].": ".$xDimLabel[$n]);
}
}
}
break;
case "FE":
break;
default:
}
echo "</td></tr>";
}
echo '</table>';
?>
<script type='text/javascript'>
var dim = window.document.getElementsByClassName("GRAFICA"), m,n,i,imgs;
for(n=0; n<dim.length; n++){
i = dim[n].getElementsByTagName("img");
if( i.length>1 ){
if( i[0].offsetHeight>i[1].offsetHeight ){
i[1].style.marginBottom = (i[0].offsetHeight-i[1].offsetHeight)+"px";
}else{
i[0].style.marginBottom = (i[1].offsetHeight-i[0].offsetHeight)+"px";
}
}
}
dim = window.document.getElementsByClassName("ESTRELLAS");
for(n=0; n<dim.length; n++){
imgs = dim[n].getElementsByTagName("img");
m = 0;
for(i=0; i<imgs.length; i++){
m = Math.max(m, imgs[i].parentNode.offsetWidth);
}
for(i=0; i<imgs.length; i++){
imgs[i].parentNode.style.width = m+"px";
}
}
</script>
</BODY>
</HTML>
<?PHP
eEnd();
function VerGraph($titulo=""){
global $res, $_Form, $_COLSOP, $_GRAPHPERCENTAGE;
$_GRAPHPERCENTAGE["P"] = 2;
$titulo = str_replace(" ","&nbsp;",$titulo);
$otitulo = $titulo;
echo '<table class="GRAFICA" border="0" cellspacing="1" cellpadding="3" style="display:table; border-collapse:collapse; margin-top:20px; width:1px;"><tr>';
echo "<caption>{$titulo}</caption>";
$titulo = "";
echo '<td valign="top">';
$gra = eGraph("C", $res, $_Form, $_COLSOP, $titulo, '', 'RESPUESTAS', "", array("map"=>false, "NoData"=>true));
echo $gra[0];
echo '</td>';
echo '<td valign="top" style="padding-left:20px">';
$gra = eGraph("P", $res, $_Form, $_COLSOP, $titulo, '', 'RESPUESTAS', "", array("map"=>false, "NoData"=>true));
echo $gra[0];
echo '</td>';
echo  "</tr></table>";
}
function Espacios($txt){
return str_replace(" ", "&nbsp;", $txt);
}
$Contents = ob_get_contents();
$Contents = str_replace('edes.php?R:', "..", $Contents);
$Contents = str_replace('<input type=radio disabled>', "-", $Contents);
eInclude("message");
include("../../lib/tcpdf/tcpdf.inc");
$p = new TCPDF('P', 'pt', 'A4', false, 'ISO-8859-1', false );
$p->SetDisplayMode('fullpage', 'continuous');
$p->setPrintHeader(false);
$p->setPrintFooter(false);
$p->SetAutoPageBreak(false, PDF_MARGIN_BOTTOM);
$p->SetFillColor(0);
$p->setImageScale(1.5);
$tmp = explode("<hr>", $Contents);
for($n=0; $n<count($tmp); $n++){
$p->AddPage($tmp[1], $tmp[0]);
$p->SetLineWidth(0.1);
$p->writeHTML($tmp[$n], true, false, true, false, '');
$p->endPage();
}
$oNomPDF = "/_tmp/pdf/prueba_".time().".pdf";
$NomFile = "../_tmp/pdf/prueba_".time().".pdf";
$NomPDF = "../_tmp/pdf/prueba_".time().".pdf";
$p->Output($NomPDF,'F');
eMessage('~PDF','HS','','location.href = "edes.php?D:'.$oNomPDF.'&FILE='.$NomFile.'";');
eEnd();
exit;
$content = '
<?php
echo "wwwwwwwwwwwww";
?>
';
include "data://text/plain;base64,".base64_encode($content);
$thing = <<<TEST
<?php
\$thing = array();
print "Testing code in here.";
var_dump(\$thing);
TEST;
include 'data://text/plain;,'. urlencode($thing);
$content = '
<?php if($var=true): ?>
print this html
<?php endif; ?>
';
include "data://text/plain;base64,".base64_encode($content);
$txt = "<"."?PHP "."\n".'$a=5*3; echo $a;'."\n?".">";
echo "|";
$escribir = file_put_contents('php://memory', $txt);
eTrace($escribir);
echo "|";
$tmp = file_get_contents('php://memory'); // prints nothing
include('php://memory'); // prints nothing
eTrace($tmp);
eTrace(strlen($tmp));
echo "|";
function stringToTempFileName($str) {
$file = 'data://text/plain;base64,'.base64_encode($str);
return $file;
}
function eval2($c) {
$auto_clean_old_temporary_files=false;
$ignore_all_errors=true;
$tempfiledirectory=''; //temporary file directory
$tempfileheader='eval2_'; // temporary file header
$tempfiletimeseperator='__'; // temporary file seperator for time
$tempfileremovetimeout=200; // temp file cleaning time in seconds
if ($auto_clean_old_temporary_files===true) {
$sd=scandir('.'); //scaning for old temporary files
foreach ($sd as $sf) {
if (strlen($sf)>(32+strlen($tempfileheader)+strlen($tempfiletimeseperator)+3)) { // if filename long enough
$t1=substr($sf,(32+strlen($tempfileheader)),strlen($tempfiletimeseperator)); //searching time seperator
$t2=substr($sf,0,strlen($tempfileheader)); //searching file header
if ($t1==$tempfiletimeseperator && $t2==$tempfileheader) { //checking for timeseperator and file name header
$ef=explode('.',$sf);
unset($ef[count($ef)]);//removing file extension
$nsf=implode('.',$ef);//joining file name without extension
$ef=explode($tempfiletimeseperator,$nsf);
$tm=(int)end($ef); //getting time from filename
$tmf=time()-$tm;
if ($tmf>$tempfileremovetimeout && $tmf<123456 && $tmf>0) { // if time passed more then timeout and difference with real time is logical
unlink($sf); // finally removing temporary file
}
}
}
}
}
$n=$tempfiledirectory.$tempfileheader . md5(microtime().rand(0,5000)). $tempfiletimeseperator . time() .'.php'; //creating spesific temporary file name
$c='< ?php' . PHP_EOL . $c . PHP_EOL; //generating php content
file_put_contents($n,$c); //creating temporary file
if ($ignore_all_errors===true) { // including temporary file by your choise
$s=@include($n);
}else{
$s=include($n);
}
return $s;
}
exit;
eTrace( memory_get_usage(true)."/".memory_get_peak_usage(true) );
$thing = <<<'TEST'
<?php
$thing = array();
print "Testing code in here.";
var_dump($thing);
?>
TEST;
$filename = "php://memory";
$fp = fopen($filename, "r+b");
fwrite($fp, $thing);
rewind($fp);
fclose($fp);
include "php://memory";
exit;
$thing = "<"."?php\n\n echo '22222222';\n?".">";
$filename = "php://memory";
echo strlen($thing)."-".eTrace($thing);
$fp = fopen($filename, "r+b");
fwrite($fp, $thing);
rewind($fp);
include("php://memory");
die("| ".time());
?>
