<?PHP
function eCaptcha($LonClave=5){
if( $LonClave==NULL ) $LonClave=5;
$str = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789".
"abcdefghijkmnpqrstuvwxyz".
"+*=;<>(){}<>[]$%&@#";
$Pass = "";
for($i=0; $i<$LonClave; $i++){
$c = substr($str,rand(0,strlen($str)-1),1);
$Pass .= $c;
}
$_SESSION["CAPTCHA"] = $Pass;
$size = 20;
$anchoTmp = ($size+10)*$LonClave;
$im = imagecreatetruecolor($anchoTmp, $size+15);
$blanco = _GraphColor($im, "#FFFFFF");
$gris = _GraphColor($im, "#DDDDDD");
$negro = _GraphColor($im, "#000000");
imagefilledrectangle($im, 0, 0, $anchoTmp, $size+15, $blanco);
$FontType = eScript('$a/ttf/tahoma.ttf');
$font = imageloadfont($FontType);
$fAncho = imagefontwidth($font);
$fAlto = imagefontheight($font);
$x = 5;
$y = 25;
$offset = 3;
for($n=0; $n<$LonClave; $n++){
$letra = substr($Pass,$n,1);
$angulo = rand(-12,12);
imagettftext($im, $size, $angulo, $x+$offset, $y+$offset, $gris, $FontType, $letra);
imagettftext($im, $size, $angulo, $x, $y, $negro, $FontType, $letra);
$lengX = _GraphTextSize($letra, $size, $FontType);
$x = $x+$lengX[0]+4;
}
$file2 = "/_tmp/php/captcha_".$_SESSION["_User"].".jpg";
$im2 = imagecreatetruecolor($x+5, $size+15);
imagecopy($im2, $im, 0, 0, 0, 0, $x+5, $size+15);
imagejpeg($im2, "..".$file2);
imagedestroy($im2);
imagedestroy($im);
return '<img src="edes.php?R:'.$file2.'?'.time().'">';
}
function _hex2rgb($hex){
$hex = str_replace("#","",$hex);
if( strlen($hex)==3 )
return array( hexdec(substr($hex,0,1).substr($hex,0,1)), hexdec(substr($hex,1,1).substr($hex,1,1)), hexdec(substr($hex,2,1).substr($hex,2,1)) );
else
return array( hexdec(substr($hex,0,2)), hexdec(substr($hex,2,2)), hexdec(substr($hex,4,2)) );
}
function _GraphColor($im, $hex){
$rgb = _hex2rgb($hex);
return imageColorAllocate($im, $rgb[0], $rgb[1], $rgb[2]);
}
function _GraphTextSize($txt,$Size,$FontType){
$b = imageTTFBBox($Size,0,$FontType,$txt);
return array($b[2], abs($b[7])+2);
}
function _GraphGradient($im, $x, $y, $x2, $y2, $Color, $ColorGradient, $BarLightPosition=2){
$Color = str_pad(dechex($Color),6,'0',STR_PAD_LEFT);
$ColorGradient = str_pad(dechex($ColorGradient),6,'0',STR_PAD_LEFT);
if( $BarLightPosition==0 ) $BarLightPosition = 2;
$ci = _hex2rgb($Color);
$cf = _hex2rgb($ColorGradient);
$Ancho = $x2-$x;
$c = abs(ceil($Ancho/$BarLightPosition));
$sc = $c;
$DimColor = array();
for( $l=0; $l<=$c; $l++ ){
$r = $ci[0]+ceil(($l*($cf[0]-$ci[0]))/$c);
$g = $ci[1]+ceil(($l*($cf[1]-$ci[1]))/$c);
$b = $ci[2]+ceil(($l*($cf[2]-$ci[2]))/$c);
$ColorA = imageColorAllocate($im, $r, $g, $b);
$DimColor[] = $ColorA;
imageLine($im, $x+$l, $y, $x+$l, $y2, $ColorA);
}
if( $BarLightPosition!=2 ){
$c = $Ancho-$c;
$DimColor = array();
for( $l=0; $l<=$c; $l++ ){
$r = $ci[0]+ceil(($l*($cf[0]-$ci[0]))/$c);
$g = $ci[1]+ceil(($l*($cf[1]-$ci[1]))/$c);
$b = $ci[2]+ceil(($l*($cf[2]-$ci[2]))/$c);
$ColorA = imageColorAllocate($im, $r, $g, $b);
$DimColor[] = $ColorA;
}
}
$DimColor = array_reverse($DimColor);
for($l=$sc+1; $l<$Ancho; $l++){
imageLine( $im, $x+$l, $y, $x+$l, $y2, $DimColor[$l-$sc] );
}
}
?>
