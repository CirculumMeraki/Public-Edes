<?PHP
$peticion = substr($_SERVER["QUERY_STRING"],8);
$todo = explode("|",chunk_split($peticion,6,"|"));
$claveTmp1 = "";
$claveTmp2 = "";
for( $n=0; $n<count($todo); $n+=2 ){
$xtxt = $todo[$n].$todo[$n+1];
if( strlen($xtxt)==12 ){
$claveTmp1 .= $todo[$n];
$claveTmp2 .= $todo[$n+1];
}else{
$tmp = explode("|",chunk_split($xtxt,strlen($xtxt)/2,"|"));
$claveTmp1 .= $tmp[0];
$claveTmp2 .= $tmp[1];
}
}
if( md5($claveTmp1)==$claveTmp2 ){
file_put_contents("../_tmp/php/{$peticion}","OK");
}else{
}
exit;
?>
