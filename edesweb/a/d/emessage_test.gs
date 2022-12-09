<?PHP
eInclude( 'message' );
$Mensaje = urldecode($Mensaje);
$Mensaje = str_replace(chr(13).chr(10),'<br>',$Mensaje);
if( $Mensaje[0]==chr(92) ) $Mensaje = substr($Mensaje,2,-2);
eMessage( $Mensaje, $Accion.'HS', $Sg );
?>
