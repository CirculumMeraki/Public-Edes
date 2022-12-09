<?PHP
if( !isset($_SESSION['_User']) ) exit;
if( $_gsID != getmypid() ) exit;
list( $NomFile,$Ext ) = explode( '.', $FILE );
$oNomFile = '../_tmp/php/'.$NomFile.'.'.$_User;
$NomFile = $oNomFile.'.'.$Ext;
rename( $oNomFile, $NomFile );
if( $_GET['eImgSize']!='undefined' ){
list( $mAncho, $mAlto ) = explode( ',', $_GET['eImgSize'] );
list( $oAncho, $oAlto, $tipo, $atributos ) = getimagesize($NomFile);
if( ( $mAncho>0 && $oAncho > $mAncho ) || ( $mAlto > 0 && $oAlto > $mAlto ) ){
eImgResize( $NomFile, $NomFile, $mAncho, $mAlto );
}
}
echo '<img src="data:image/'.$Ext.';base64,'.base64_encode( file_get_contents( $NomFile ) ).'" style="float:left">';
@unlink( $NomFile );
?>
<SCRIPT type="text/javascript">
if( window.frameElement.WOPENER.edPut( document.images[0].outerHTML )==-1 ){
top.eInfo(window,'No caben más caracteres');
}else{
top.eInfoHide();
}
</SCRIPT>
<?PHP
function eImgResize( $oImg, $nImg, $nAncho, $nAlto ){
$fuente = _eImgOpen($oImg);
$oAncho = imagesx($fuente);
$oAlto = imagesy($fuente);
if( ($oAncho/$nAncho) < ($oAlto/$nAlto) && $nAlto > 0){
$f = $nAlto/$oAlto;
}else if( $nAncho > 0 ){
$f = $nAncho/$oAncho;
}else return false;
$imagen = imageCreateTrueColor( $oAncho*$f, $oAlto*$f );
ImageCopyResized( $imagen, $fuente, 0,0, 0,0, $oAncho*$f,$oAlto*$f, $oAncho, $oAlto );
_eImgSave($imagen, $nImg);
return true;
}
?>
