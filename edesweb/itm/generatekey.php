<?PHP
function eGenerateKey($LonClave=6, $MinNum=2, $MinChr=2, $key_case='UL'){
$str = "ABCDEFGHJKLMNPQRSTUVWXYZ1234567890";
$nMinNum = 0;
$nMinChr = 0;
switch( $key_case ){
case 'U':
break;
case 'L':
$str = strtolower($str);
break;
case 'UL':
$str .= "abcdefghijklmnpqrstuvwxyz";
break;
}
while( $nMinNum<$MinNum || $nMinChr<$MinChr ){
$nMinNum = 0;
$nMinChr = 0;
$Pass = "";
for($i=0; $i<$LonClave; $i++){
$c = substr($str,rand(0,strlen($str)-1),1);
$Pass .= $c;
if( is_numeric($c) ){
$nMinNum++;
}else{
$nMinChr++;
}
}
}
return $Pass;
}
?>
