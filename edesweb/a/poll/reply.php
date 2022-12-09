<?PHP
if( $_SESSION["_User"]!=$_POST["cd_gs_reply_user"] ){
eEnd();
}
if( !function_exists("qQuery") ){
eInclude($_Sql);
}
qQuery("select * from gs_question where cd_gs_poll=".($_POST["cd_gs_poll"]*1)." and cd_gs_question=".($_POST["cd_gs_question"]*1));
$r = qArray();
if( $_POST["cd_gs_question"]!=$r["cd_gs_question"] ){
eEnd();
}
if( $_POST['cd_gs_campaign']>0 ){
if( $r["orden"]==1 ){
qQuery("delete from gs_reply where cd_gs_poll='{$_POST['cd_gs_poll']}' and cd_gs_campaign='{$_POST['cd_gs_campaign']}' and cd_gs_reply_user='{$_POST['cd_gs_reply_user']}'");
qQuery("delete from gs_campaign_user where cd_gs_poll='{$_POST['cd_gs_poll']}' and cd_gs_campaign='{$_POST['cd_gs_campaign']}' and cd_gs_user='{$_POST['cd_gs_reply_user']}'");
}else if( qCount("gs_reply",		  "cd_gs_poll='{$_POST['cd_gs_poll']}' and cd_gs_campaign='{$_POST['cd_gs_campaign']}' and cd_gs_reply_user='{$_POST['cd_gs_reply_user']}' and cd_gs_question='{$_POST['cd_gs_question']}'") ){
qQuery("delete from gs_reply where cd_gs_poll='{$_POST['cd_gs_poll']}' and cd_gs_campaign='{$_POST['cd_gs_campaign']}' and cd_gs_reply_user='{$_POST['cd_gs_reply_user']}' and cd_gs_question='{$_POST['cd_gs_question']}'");
}
}
$respuesta = utf8_decode($_POST["respuesta"]);
$r["json"] = str_replace(
array("&#34;"),
array('"'    ),
$r["json"]
);
$dim = json_decode(utf8_encode($r["json"]), true);
foreach($dim as $k=>$v) $dim[$k] = utf8_decode($v);
$aciertos = 0;
$puntos = 0;
switch($r["respuesta_type"]){
case "C":
$tmp = explode(",", $respuesta);
for($n=0; $n<count($tmp); $n++){
if( $dim["respuesta_{$tmp[$n]}_pnt"]>0 ) $puntos += $dim["respuesta_{$tmp[$n]}_pnt"];
}
break;
case "M":
case "R":
case "V":
if( $dim["respuesta_{$respuesta}_pnt"]>0 ) $puntos = $dim["respuesta_{$respuesta}_pnt"];
break;
case "K":
break;
case "U":
break;
case "A":
break;
case "T":
$respuesta = eStrLower($respuesta);
break;
case "F":
break;
case "O":
$ok = true;
$binaria = array();
for($n=1; $n<99; $n++){
$indice = "hueco_pregunta_".$n;
if( $dim[$indice]!="" ){
$dato = $dim["hueco_respuesta_".$n];
if( substr_count($dato, ",")>0 ){
$ok = false;
$tmp = explode(",", $dato);
$binaria[$n] = $tmp[0];
for($i=1; $i<count($tmp); $i++){
$binaria[$tmp[$i]] = $tmp[0];
}
}else{
$binaria[$n] = $dato;
}
}
}
if( !$ok ){
$tmp = explode("|", $respuesta);
$respuesta = "";
for($n=0; $n<count($tmp); $n++){
$tmp2 = explode("~", $tmp[$n]);
$pre = ($binaria[$tmp2[0]]!="") ? $binaria[$tmp2[0]] : $tmp2[0];
$res = ($binaria[$tmp2[1]]!="") ? $binaria[$tmp2[1]] : $tmp2[1];
if( $respuesta!="" ) $respuesta .= "|";
$respuesta .= $pre."~".$res;
if( $pre==$res ) $aciertos++;
}
}
break;
case "X":
$dimRes = array();
for($n=1; $n<99; $n++){
$indice = "unir_pregunta_".$n;
if( $dim[$indice]!="" ){
$dimRes[$dim[$indice]] = $dim["unir_respuesta_".$n];
}
}
$tmp = explode("|", $respuesta);
for($n=0; $n<count($tmp); $n++){
$tmp2 = explode("~", $tmp[$n]);
if( $tmp2[0]==$dimRes[$tmp2[1]] ){
$aciertos++;
}
}
break;
case "Z":
list($pkImg) = explode(".", $dim["mapa_img"]);
qQuery("select mapa from gs_poll_img where cd_gs_poll_img={$pkImg}");
list($mapa) = qRow();
$mapa = str_replace(
array("&#34;"),
array('"'    ),
$mapa
);
$mapa = json_decode(utf8_encode($mapa), true);
$dimRes = array();
$n = 1;
$campo = "area_".str_pad($n, 2, "0", STR_PAD_LEFT);
$dimArea = array();
while($mapa[$campo]!="" ){
$dimRes[$n] = $mapa[$campo];
$poligono = "poligono_".str_pad($n, 2, "0", STR_PAD_LEFT);
$area = array();
$tmp = explode(";", $mapa[$poligono]);
for($i=0; $i<count($tmp); $i++){
$area[] = explode(",", $tmp[$i]);
}
$dimArea[] = array($n, $mapa[$campo], $area);
$n++;
$campo = "area_".str_pad($n, 2, "0", STR_PAD_LEFT);
}
$tmp = explode("|", $respuesta);
$respuesta = "";
for($n=0; $n<count($tmp); $n++){
list($pre, $x, $y) = explode("~", $tmp[$n]);
if( $respuesta!="" ) $respuesta .= "|";
$pinchoEn = "";
for($i=0; $i<count($dimArea); $i++){
if( inside($x, $y, $dimArea[$i][2]) ){
$pinchoEn = $dimArea[$i][1];
break;
}
}
if( $dimRes[$pre]==$pinchoEn ){
$aciertos++;
}
$respuesta .= $dimRes[$pre]."~{$pinchoEn}";
}
break;
case "MM":
default:
}
qQuery("insert into gs_reply (cd_gs_poll, cd_gs_campaign, cd_gs_reply_user, cd_gs_question, segundos, respuesta, aciertos, puntos) values ('{$_POST['cd_gs_poll']}', '{$_POST['cd_gs_campaign']}', '{$_POST['cd_gs_reply_user']}', '{$_POST['cd_gs_question']}', '{$_POST['segundos']}', '{$respuesta}', {$aciertos}, {$puntos})");
$pk = qId();
if( $r["respuesta_type"]=="F" ){
copy($_FILES["fichero"]["tmp_name"], eScript("/"."/poll/".qId().".".eFileExtension($_FILES["fichero"]["name"])));
}else if( $r["respuesta_type"]=="A" ||$r["respuesta_type"]=="T" ){
$NO = array();
$NOVARIAS = array();
qQuery("select palabra,varias from gs_tabu order by palabra", $p1);
while($palabra=qRow($p1)){
$palabra[0] = eClearAccent($palabra[0]);
if( $palabra[1]=="S" ){
$NOVARIAS[] = $palabra[0];
}else{
$NO[$palabra[0]] = 1;
}
}
$respuesta = str_replace($NOVARIAS, "", eClearAccent(eStrLower($respuesta)));
$respuesta = str_replace(array("&#10;", ".", ",", ";", ":"), array(" . ", " . ", " , ", " ; ", " : "), $respuesta);
$respuesta = strtr($respuesta, "+-*=_<>{}[]()!¡¿?/\ºª#$'".'"', str_repeat(" ",25));
$respuesta = trim(preg_replace("/\s\s+/", " ", $respuesta));
$tmp = explode(" ", $respuesta);
$nPalabra = 1;
for($n=0; $n<count($tmp); $n++){
$palabra = $tmp[$n];
if( $palabra<>0 && $palabra==($palabra*1) ){
continue;
}
if( strlen($palabra)==1 ) continue;
if( $NO[$palabra]!=1 ){
switch($palabra){
case ".":
$nPalabra += 30;
continue;
case ",":
$nPalabra += 10;
continue;
case ";":
$nPalabra += 10;
continue;
case ":":
$nPalabra += 10;
continue;
default:
qQuery("insert into gs_poll_dct (cd_gs_poll, cd_gs_campaign, cd_gs_question, cd_gs_reply, palabra, posicion) values ('{$_POST['cd_gs_poll']}', '{$_POST['cd_gs_campaign']}', '{$_POST['cd_gs_question']}', $pk, '{$palabra}', {$nPalabra})");
}
$nPalabra++;
}
}
}
function inside($x, $y, $vs) {
$inside=false;
for($i=0, $j=count($vs)-1; $i<count($vs); $j=$i++){
$xi = $vs[$i][0];
$yi = $vs[$i][1];
$xj = $vs[$j][0];
$yj = $vs[$j][1];
$intersect = (($yi>$y)!=($yj>$y)) && ($x<($xj-$xi)*($y-$yi)/($yj-$yi)+$xi);
if( $intersect ) $inside = !$inside;
}
return $inside;
}
?>
<script>
top.S.info("Grabado",1);
</script>
<?PHP
eEnd();
?>
