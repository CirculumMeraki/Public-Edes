<?PHP
$file = "../_tmp/php/".$_SESSION["_User"]."_".$_GET["_CONTEXT"].".srl.".$_GET["sufijo"];
if( !file_exists($file) ){
include_once($Dir_.'message.inc');
eMessage("Operación no permitida 1","HSE");
}
$cDim = file($file);
$cTotal = count($cDim);
for($c=1; $c<$cTotal; $c++){
$cDim[$c] = trim($cDim[$c]);
}
$oDim = explode(",", $_POST["_PK_MULTISELECT_"]);
$oTotal = count($oDim);
$Dim = array();
for($o=0; $o<$oTotal; $o++){
for($c=1; $c<$cTotal; $c++){
if( $oDim[$o]==$cDim[$c] ){
$Dim[] = $oDim[$o];
break;
}
}
}
if( $oTotal<>count($Dim) ){
include_once($Dir_.'message.inc');
eMessage("Operación no permitida 2","HSE");
}
$_POST["_PK_MULTISELECT_"] = $Dim;
unset($cDim, $cTotal, $c);
unset($oDim, $oTotal, $o);
unset($Dim, $file);
?>
