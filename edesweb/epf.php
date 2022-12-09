<?PHP
$GLOBALS["window"] = "";
function _PF(){
$p1 = func_get_arg(1);
if( gettype($p1)=="string" && ($p1=="" || substr_count($p1, "WOPENER")>0) && gettype(func_get_arg(0))=="array" ){
if( $p1<>"" && substr($p1,-1)<>"." ) $p1.=".";
echo $p1."ePF({";
$n=0;
foreach(func_get_arg(0) as $k=>$v){
if( $n>0 ) echo ",";
echo $k.":'".AddSlashes($v)."'";
$n++;
}
echo "});";
return;
}
$GLOBALS["window"] = "";
call_user_func_array("_ePF", func_get_args());
}
function _PPF(){
$p1 = func_get_arg(1);
if( gettype($p1)=="string" && ($p1=="" || substr_count($p1, "WOPENER")>0) && gettype(func_get_arg(0))=="array" ){
if( $p1<>"" && substr($p1,-1)<>"." ) $p1.=".";
echo $p1."ePPF({";
$n=0;
foreach(func_get_arg(0) as $k=>$v){
if( $n>0 ) echo ",";
echo $k.":'".AddSlashes($v)."'";
$n++;
}
echo "});";
return;
}
$GLOBALS["window"] = "window.frameElement.WOPENER.";
call_user_func_array("_ePF", func_get_args());
}
function _ePF($odim){
global $window;
if( gettype($odim)=="string" ){
$dim = array();
for($n=0; $n<func_num_args(); $n++){
$dim[0][$n] = func_get_arg($n);
}
}else $dim = $odim;
for($n=0; $n<count($dim); $n++){
$event = false;
$sql = "";
$atributos = array();
$cursor = array();
for($i=2; $i<count($dim[$n]); $i++){
if( gettype($dim[$n][$i])=="boolean" || gettype($dim[$n][$i])=="integer" ) $event = $dim[$n][$i];
else if( gettype($dim[$n][$i])=="string" ){
$dim[$n][$i] = trim($dim[$n][$i]);
if( preg_match("/^SELECT /i", $dim[$n][$i]) ){
$sql = $dim[$n][$i];
}else{
$atributos = explode(",", str_replace(" ","",$dim[$n][$i]));
}
}else if( gettype($dim[$n][$i])=="array" ) $cursor = $dim[$n][$i];
else if( gettype($dim[$n][$i])=="NULL" ){
$tabla = substr($dim[$n][0],3);
$sql = "select cd_{$tabla}, nm_{$tabla} from {$tabla} order by nm_{$tabla}";
}
}
$event = ($event)? "true":"false";
if( count($dim[$n])==2 || (count($dim[$n])==3 && gettype($dim[$n][2])=="boolean") ){
echo "<script type='text/javascript'>";
echo "{$window}ePF('{$dim[$n][0]}', '{$dim[$n][1]}', {$event});";
echo "</script>";
}else{
if( count($cursor)==0 ){
$p=0;
$cursor[] = array('','&nbsp;');
qQuery($sql);
while($or=qArray()){
if( $p++==0 && count($atributos)>0 ){
for($f=0; $f<count($atributos); $f++) $cursor[0][] = "";
}
$r = array();
foreach($or as $k=>$v) if( is_numeric($k) ) $r[$k] = trim($v);
$cursor[] = $r;
}
}else{
if( $cursor[0][1]=="" ) $cursor[0][1] = '&nbsp;';
}
$sDim = array();
for($f=0; $f<count($cursor); $f++) $sDim[] = implode("\t", $cursor[$f])."\t".$f;
sort($sDim);
$iDim = array();
for($f=0; $f<count($sDim); $f++){
$tmp = explode("\t", $sDim[$f]);
$iDim[$f] = array($tmp[0], $tmp[count($tmp)-1]);
}
echo "<TABLE id='{$dim[$n][0]}_TABLE_BAK' cols=".(count($atributos)+2)." style='display:none'>";
echo '<COL id=o><COL>';
if( count($atributos)>0 ){
for($f=0; $f<count($atributos); $f++) echo '<COL id=o NM_ATRIBUTE='.$atributos[$f].'>';
}
$pr=0;
for($f=0; $f<count($cursor); $f++){
if( $cursor[$f][0]=='~' ){
echo '<tr v="" r="'.$pr.'" class="Line"><td><td>';
}else{
echo '<tr v="'.strtoupper($iDim[$f][0]).'" r='.($iDim[$f][1]+$pr).'>';
for($c=0; $c<count($cursor[$f]); $c++) echo '<td>'.$cursor[$f][$c];
}
}
echo "</TABLE>";
echo "<script type='text/javascript'>";
echo "{$window}CopySubSelect(Array('{$dim[$n][0]}={$dim[$n][0]}'), document.getElementById('{$dim[$n][0]}_TABLE_BAK'), '');";
echo "{$window}ePF('{$dim[$n][0]}', '{$dim[$n][1]}', {$event});";
echo "</script>";
}
}
}
?>
