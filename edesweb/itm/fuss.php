<?PHP
function eFuss( $oClave, $On=true ){
$Dim = array( 33,62, 65,93, 97,125 );
$cBasura = ''; for( $i=0; $i<count($Dim); $i+=2 ) for( $n=$Dim[$i]; $n<=$Dim[$i+1]; $n++ ) $cBasura .= chr($n);
$cLongBasura = strlen($cBasura);
$cBasura = str_repeat($cBasura,3);
$BasuraFin = ''; for( $n=0; $n<5; $n++ ) $BasuraFin .= $cBasura[rand(0,strlen($cBasura)-1)];
$BasuraIni = ''; for( $n=0; $n<rand(10,30); $n++ ) $BasuraIni .= $cBasura[rand(0,strlen($cBasura)-1)];
if( $On ){
$nClave = base64_encode(gzcompress($oClave));
$ClaveOfuscada = '';
$i=0;
for( $n=0; $n<strlen($nClave); $n++ ){
$pb = 0;
$pc = 0;
if( substr_count($cBasura,$BasuraFin[$i])>0 ){
$pb = strpos($cBasura,$BasuraFin[$i]);
if( substr_count($cBasura,$nClave[$n])>0 ){
$pc = strpos($cBasura,$nClave[$n]);
}
}
$ClaveOfuscada .= substr( str_repeat($cBasura,3), $pb+$pc, 1 );
if( ++$i>4 ) $i = 0;
}
$Long = str_pad( dechex(strlen($ClaveOfuscada)), 2, "0", STR_PAD_LEFT );
$LongOfuscada = '';
$i=0;
for( $n=0; $n<strlen($Long); $n++ ){
$pb = 0;
$pc = 0;
if( substr_count($cBasura,$BasuraFin[$i])>0 ){
$pb = strpos($cBasura,$BasuraFin[$i]);
if( substr_count($cBasura,$Long[$n])>0 ){
$pc = strpos($cBasura,$Long[$n]);
}
}
if( $pb>0 && $pc>0 ){
$LongOfuscada .= substr( str_repeat($cBasura,3), $pb+$pc, 1 );
}else{
$LongOfuscada .= $Long[$n];
}
if( ++$i>4 ) $i = 0;
}
$Resultado = $BasuraIni.$ClaveOfuscada.$LongOfuscada.$BasuraFin;
return $Resultado;
}else{
$Resultado = $oClave;
$BasuraFin = substr($Resultado,-5);
$LongOfuscada = substr($Resultado,-7,2);
$LongLibre = '';
$i=0;
for( $n=0; $n<strlen($LongOfuscada); $n++ ){
$pb = 0;
$pc = 0;
if( substr_count($cBasura,$BasuraFin[$i])>0 ){
$pb = strpos($cBasura,$BasuraFin[$i]);
if( substr_count($cBasura,$LongOfuscada[$n])>0 ){
$pc = strpos($cBasura,$LongOfuscada[$n]);
}
}
$p = $cLongBasura+($pc-$pb);
$LongLibre .= $cBasura[$p];
if( ++$i>4 ) $i = 0;
}
$LongLibre = hexdec($LongLibre);
$oClave = substr($Resultado,-$LongLibre-7,-5-2);
$nClave = '';
$i=0;
for( $n=0; $n<strlen($oClave); $n++ ){
$pb = 0;
$pc = 0;
if( substr_count($cBasura,$BasuraFin[$i])>0 ){
$pb = strpos($cBasura,$BasuraFin[$i]);
if( substr_count($cBasura,$oClave[$n])>0 ){
$pc = strpos($cBasura,$oClave[$n]);
}
}
$p = $cLongBasura+($pc-$pb);
$nClave .= $cBasura[$p];
if( ++$i>4 ) $i = 0;
}
$oClave = gzuncompress(base64_decode($nClave));
return $oClave;
}
}
?>
