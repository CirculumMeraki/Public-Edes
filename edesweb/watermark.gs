<?PHP
if( $_NoEjecutar==false ){
$FILE = stripslashes($FILE);
if( $FILE[0]=='"' || $FILE[0]=="'" ) $FILE = substr($FILE,1,-1);
$Img = eScript($FILE);
eFileGetVar('ImgEdit', true);
if( $ImgWatermark!='' ){
$ImgWatermark = eScript($ImgWatermark);
eImgWatermark($Img, $ImgWatermark, $ImgMarginRight, $ImgMarginBottom);
}else{
readFile($Img);
}
}
function eImgWatermark($Img, $Estampa, $margen_dcho=10, $margen_inf=10){
$estampa = _eImgOpen($Estampa);
$im = _eImgOpen($Img);
$sx = imageSX($estampa);
$sy = imageSY($estampa);
imageCopy($im, $estampa, imageSX($im) - $sx - $margen_dcho, imageSY($im) - $sy - $margen_inf, 0, 0, imageSX($estampa), imageSY($estampa));
_eImgHeader($Img);
_eImgSave($im,$Img);
imageDestroy($im);
}
eEnd();
?>
