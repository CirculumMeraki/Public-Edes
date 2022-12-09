<?PHP
function _JP_Check(){
global $_JPCHECK;
$funcJs = array(
".indexOf",
".substring",
".substr",
".length"
);
define("_Hoy", date('Ymd'));
define("_D2S", _Hoy);
define("_ymd", _Hoy);
define("_Time", date('H:i:s'));
define("_User", $_SESSION["_User"]);
define("_Node", $_SESSION["_Node"]);
define("_Mode", $GLOBALS["_Mode"]);
function eGF($campo){
return $_POST[$campo];
}
function ePE($campo, $txt){
eMessage($txt, "HSE");
}
function ePF($campo, $val){
$_POST[$campo] = $val;
}
function eAddDaysToDate($fecha, $dias){eMessage('La función "'.__FUNCTION__.'" está en desarrollo', "HSE");}
function eAddMonth($txt, $n){eMessage('La fución "'.__FUNCTION__.'" está en desarrollo', "HSE");}
function eAddMonthToDate($s, $m){eMessage('La función "'.__FUNCTION__.'" está en desarrollo', "HSE");}
function eAddYearsToDate($campo){eMessage('La función "'.__FUNCTION__.'" está en desarrollo', "HSE");}
function eCheckDate($Fecha){eMessage('La función "'.__FUNCTION__.'" está en desarrollo', "HSE");}
function eD2S($d, $s){eMessage('La función "'.__FUNCTION__.'" está en desarrollo', "HSE");}
function eDate($Formato, $Fecha){eMessage('La función "'.__FUNCTION__.'" está en desarrollo', "HSE");}
function eDaysInDates($fechaEnd, $fechaIni){eMessage('La función "'.__FUNCTION__.'" está en desarrollo', "HSE");}
function eDaysInMonth($ano, $mes){eMessage('La función "'.__FUNCTION__.'" está en desarrollo', "HSE");}
function eDTS($d, $s){
eMessage('La función "'.__FUNCTION__.'" está en desarrollo', "HSE");
}
function ePeriodDiff($pi, $pf){eMessage('La función "'.__FUNCTION__.'" está en desarrollo', "HSE");}
function eSTD($campo){eMessage('La función "'.__FUNCTION__.'" está en desarrollo', "HSE");}
function eOkDNI($campo){eMessage('La función "'.__FUNCTION__.'" está en desarrollo', "HSE");}
function eOkCompany($campo){eMessage('La función "'.__FUNCTION__.'" está en desarrollo', "HSE");}
function parseInt($valor){
return (int)$valor;
}
function parseFloat($valor){
return (float)$valor;
}
function eGO($campo){ eMessage("La función eGO('{$campo}') no se puede usar", "HSE"); }
function DGI($campo){ eMessage("La función DGI('{$campo}') no se puede usar", "HSE"); }
function eIndexOf($valor){
return $valor;
}
function eSubstring($valor){
return $valor;
}
function eSubstr($valor){
return $valor;
}
function eLength($valor){
return strlen($valor);
}
function eConcat(){
$txt = "";
for($n=0; $n<func_num_args(); $n++){
$txt .= func_get_arg($n);
}
return $txt;
}
if( substr_count($_JPCHECK, ".value")>0 ){
$i = strpos($_JPCHECK, ".value");
$chr = substr($_JPCHECK, $i+6, 1);
if( substr_count("! =)+-*/%<>,;&|\t".chr(92), $chr)>0 ){
eMessage($txt.'La propiedad ".value" no está permitida', "HSE");
}
}
$_JPCHECK = str_replace(
array("top.eSTD(", "top.eDTS(", "top.eAddYearsToDate("),
array(    "eSTD(",     "eDTS(",     "eAddYearsToDate("),
$_JPCHECK
);
$dim = explode("\n",$_JPCHECK);
$_JPCHECK = "";
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt=="" ) continue;
if( substr($txt,0,2)=="?¿" ){
$txt = "}else{";
}else if( $txt=="?" ){
$txt = "}";
}else if( $txt[0]=="¿" ){
$txt = "if( ".substr($txt,1,-1)." ){";
}else if( substr_count($txt, "¿")>0 ){
$txt = "if( ".substr($txt,0,-1)." ){";
}else{
if( substr($txt,-1)=="," ){
$txt = "";
for($i=$n; $i<count($dim); $i++){
$x = trim($dim[$i]);
if( substr($x,-1)=="," ){
$txt .= $x;
}else{
$n=$i;
break;
}
}
}
}
for($i=0; $i<count($funcJs); $i++){
if( substr_count($txt, $funcJs[$i])>0 ){
if( substr_count($txt, $funcJs[$i]." (")>0 || substr_count($txt, $funcJs[$i]."(")>0 || $funcJs[$i]==".length" ){
$txt = _ArgAnterior($funcJs[$i], $txt);
}
}
}
$txt = _GetVarJS($txt);
$txt = _SustituyeVar($txt);
$_JPCHECK .= $txt."\n";
}
$__ = array();
foreach($_POST as $k=>$v){
${$k} = $v;
$__[$k] = $v;
}
$tmpFile = GrabaTmp('f_jpcheck', $_JPCHECK, $LenDoc, $_FILE_JPCHECK);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_JPCHECK);
foreach($__ as $k=>$v){
if( ${$k}!=$v ){
eMessage($v, "HSE");
}
}
}
_JP_Check();
function _ArgAnterior($func, $txt){
$hasta = strpos($txt, $func)-1;
$cf = substr($txt, $hasta, 1);
$ci = (($cf==")") ? "(" : $cf);
$nDiv=1;
for($n=$hasta-1; $n>=0; $n--){
$c = substr($txt, $n, 1);
if( $c==$ci || $c==$cf ){
if( $ci==$cf ){
if( $n>0 ){
if( substr($txt, $n-1, 1)!=chr(92) ){
$nDiv--;
}
}else{
$nDiv--;
}
}else{
if( $c==$cf ) $nDiv++;
else if( $c==$ci ) $nDiv--;
}
}
if( $c==$ci && $nDiv==0 ){
$desde = $n;
if( $ci!=$cf ){
$c = substr($txt, $desde-1, 1);
if( $c==" " || $c=="\t" ) $desde--;
for($i=$desde-1; $i>=0; $i--){
$c = substr($txt, $i, 1);
if( substr_count("! =(+-*/%<>,;:&|\t".chr(92), $c)>0 ){
$i++;
break;
}
}
if( $i==-1 ) $i = 0;
$desde = $i;
}
$oFunc = substr($txt, $desde, $hasta-$desde+1);
if( substr($func,-1)=="(" ){
$nuevo = "e".ucfirst(substr($func,1))."{$oFunc},";
}else{
$nuevo = "e".ucfirst(substr($func,1))."({$oFunc})";
}
$txt = substr($txt, 0, $desde).''.$nuevo.''.substr($txt, $hasta+1+strlen($func));
return $txt;
}
}
}
$_DimVARJS = array();
$_DimVARSET = array();
function _GetVarJS($txt){
$trace = !true;
if($trace)eTrace("i..._GetVarJS[".$txt."]");
if( substr_count($txt, "var ")==0 && substr_count($txt, "var".chr(9))==0 ){
if($trace)eTrace("f..._GetVarJS[".$txt."]");
return $txt;
}
global $_DimVARJS, $_DimVARSET;
$linea = "";
$txt = trim(substr($txt, strpos($txt,"var")+3));
$desde = 0;
$t = strlen($txt);
for($n=$desde; $n<$t; $n++){
$c = substr($txt, $n, 1);
if($trace)eTrace("1[".$c."]");
if( substr_count("! =(+-*/%<>,;:&|".chr(9).chr(92), $c)==0 ){
$var = "";
for($i=$n; $i<$t; $i++){
$c = substr($txt, $i, 1);
if($trace)eTrace("2[".$c."]".$i.'-'.$n.' - '.(($esElValor)?"txt":"var"));
if( substr_count("! =(+-*/%<>,;:&|".chr(9).chr(92), $c)>0 ){
if( substr_count("('".'"', $c)>0 ){
$cf = (($c=="(") ? ")" : $c);
$linea .= $c;
for($p=$i+1; $p<$t; $p++){
$c = substr($txt, $p, 1);
$linea .= $c;
if( substr($txt, $p, 1)==$cf ){
$i = $p+1;
break;
}
}
}
$n = $i-1;
break;
}
if( !$esElValor ){
if( $var=="" ) $linea .= "$";
$var .= $c;
}
$linea .= $c;
}
if( !$esElValor ){
if($trace)eTrace("   var|{$var}|");
$_DimVARJS[$var] = 1;
if( isset($_POST[$var]) ){
$_DimVARSET[$var] = $var."_";
$linea.="_";
}else{
$_DimVARSET[$var] = $var;
}
}
}else{
if( $c=="," ){
$c = ";";
}
$linea .= $c;
$esElValor = ($c=="=");
if( $c=="=" ){
$cc = substr($txt, $n+1, 1);
while( $cc==" " || $cc==chr(9) ){
$linea .= $cc;
$n++;
$cc = substr($txt, $n+1, 1);
}
}
}
}
if($trace)eTrace("f..._GetVarJS[".$linea."]");
return $linea;
}
function _SustituyeVar( $txt ){
global $_DimVARJS, $_DimVARSET;
$trace = !true;
if($trace)eTrace("i..._SustituyeVar[".$txt."]");
$linea = "";
$var = "";
$t = strlen($txt);
for($n=0; $n<$t; $n++){
$c = substr($txt, $n, 1);
if($trace)eTrace("1[".$c."]");
if( substr_count("'".'"', $c)>0 ){
$cf = $c;
$linea .= $c;
for($p=$n+1; $p<$t; $p++){
$c = substr($txt, $p, 1);
$linea .= $c;
if( substr($txt, $p, 1)==$cf ){
$n = $p;
$c = "";
break;
}
}
}
if( substr_count("! =()+-*/%<>,;:&|".chr(9).chr(92), $c)>0 ){
if( $_DimVARJS[$var] ){
if($trace)eTrace("[] $".$var);
$linea = substr($linea,0,-strlen($var)).'$'.$_DimVARSET[$var];
$var = $_DimVARSET[$var];
}else{
if($trace)eTrace("[".$c."] ".$var);
}
$linea .= $c;
$var = "";
}else{
$var .= $c;
$linea .= $c;
if($trace)eTrace(" [".$c."]");
}
}
if($trace)eTrace("f..._SustituyeVar[".$linea."]");
return $linea;
}
?>
