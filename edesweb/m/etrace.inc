<?PHP
if( !isset($GLOBALS['_gsTRACE']) ) global $_gsTRACE;
$Contenido = strtoupper(ob_get_contents());
$t = substr_count($Contenido, '<SCRIPT');
$pIni = -1;
for($n=0; $n<$t; $n++) $pIni = strpos($Contenido, '<SCRIPT', $pIni+1);
$t = substr_count($Contenido, '</SCRIPT>');
$pFin = -1;
for($n=0; $n<$t; $n++) $pFin = strpos($Contenido, '</SCRIPT>', $pFin+1);
$ConJS = ($pIni>$pFin);
if( gettype($para)!="array" ) $para = array($para);
for($n=0; $n<count($para); $n++){
$txt = $para[$n];
if( $Caja!='' ) $txt = '['.$txt.']';
$_gsTRACE[] = $txt;
echo "\n";
if( $ConJS ){
$txt = str_replace(array('"',"\n", chr(10), chr(13)), array("'",'<br>','<br>','<br>'), $txt);
if( $Alert ){
echo 'alert("'.$txt.'");';
}else{
echo 'document.write("<span style=\"font-family:monospace; font-size:12px; color:#00009C;background:#D6DFE7;\"><B>&nbsp;'.$txt.'&nbsp;</B></span><br>");';
}
}else{
if( !$Alert ){
$txt = str_ireplace('&lt;br&gt;', '<br>', htmlspecialchars($txt));
$txt = str_ireplace('<br><br>', '<br>', $txt);
echo '<span style="font-family:monospace; font-size:12px; color:#00009C; background:#D6DFE7;"><B>&nbsp;'.$txt.'&nbsp;</B></span><br>';
}else{
echo htmlspecialchars($txt).'<br>';
}
}
}
?>
