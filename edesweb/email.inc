<?PHP
function eMail_($sPara, $sAsunto, $sTexto='', $sDe, $nmPara='', $cc='', $bcc='', $ConFiles=true, $SoloUno=true){
$bHayFicheros = 0;
$sCabeceraTexto = '';
$sAdjuntos = '';
$sCabeceras = '';
$html = substr(strtoupper(trim($sTexto)),0,9);
$html = ($html=='<!DOCTYPE' || substr($html,0,5)=='<HTML');
if( $sDe!='' ) $sCabeceras .= "From:{$sDe}\n";
if( $cc!='' ) $sCabeceras .= "Cc: {$cc}\n";
if( $bcc!='' ) $sCabeceras .= "Bcc: {$bcc}\n";
$sCabeceras .= "X-Priority: 1\n";
$sCabeceras .= "X-Mailer: eDes.Mailer\n";
$sCabeceras .= "Content-type: multipart/mixed;";
$sCabeceras .= "boundary=\"--Message-Boundary--\"\n";
$sCabeceraTexto = "----Message-Boundary--\n";
if( $html ){
$sCabeceraTexto .= "Content-type: text/html; charset=ISO-8859-1\n";
}else{
$sCabeceraTexto .= "Content-type: text/plain;charset=ISO-8859-1\n";
}
$sCabeceraTexto .= "Content-transfer-encoding: 7BIT\n";
$sCabeceraTexto .= "Content-description: Mail message body\n\n";
$sTexto = $sCabeceraTexto . $sTexto;
if( is_string($ConFiles) ){
if( $ConFiles=='' ){
$ConFiles = false;
}else{
$ConFiles = array( $ConFiles );
}
}
if( is_array($ConFiles) ){
for( $n=0; $n<count($ConFiles); $n++ ){
if( $n==0 ){
$bHayFicheros = 1;
$sCabeceras .= "Content-type: multipart/mixed;";
$sCabeceras .= "boundary=\"--Message-Boundary--\"\n";
$sCabeceraTexto = "----Message-Boundary--\n";
$sCabeceraTexto .= "Content-type: text/plain;charset=ISO-8859-1\n";
$sCabeceraTexto .= "Content-transfer-encoding: 7BIT\n";
$sTexto = $sCabeceraTexto . $sTexto;
}
$ConFiles[$n] = eScript($ConFiles[$n]);
$File = str_replace( chr(92), '/', $ConFiles[$n] );
$NomFile = substr( $File, strrpos('/'.$File,'/') );
$sAdjuntos .= "\n\n----Message-Boundary--\n";
$sAdjuntos .= "Content-Transfer-Encoding: BASE64\n";
$sAdjuntos .= "Content-disposition: attachment;filename=\"".$NomFile."\"\n\n";
$oFichero = fopen($File,'r');
$sContenido = fread($oFichero,filesize($File));
$sAdjuntos .= chunk_split(base64_encode($sContenido));
fclose($oFichero);
}
$ConFiles = false;
}else if( $ConFiles ){
foreach( $_FILES as $vAdjunto ){
if( $vAdjunto['name']=='' ){
$ConFiles = false;
break;
}
if( $vAdjunto['error']>0 ){
eMessage( '~F'.$vAdjunto['error'], 'EHS' );
}else if( $vAdjunto['size'] == 0 ){
eMessage( 'ERROR al enviar el fichero '.$vAdjunto['name'], 'HSE' );
}
}
if( $ConFiles ){
foreach( $_FILES as $vAdjunto ){
if( $bHayFicheros == 0 ){
$bHayFicheros = 1;
$sCabeceras .= "Content-type: multipart/mixed;";
$sCabeceras .= "boundary=\"--Message-Boundary--\"\n";
$sCabeceraTexto = "----Message-Boundary--\n";
$sCabeceraTexto .= "Content-type: text/plain;charset=ISO-8859-1\n";
$sCabeceraTexto .= "Content-transfer-encoding: 7BIT\n";
$sTexto = $sCabeceraTexto . $sTexto;
}
$sAdjuntos .= "\n\n----Message-Boundary--\n";
$sAdjuntos .= "Content-type: ".$vAdjunto['type'].";name=\"".$vAdjunto['name']."\"\n";
$sAdjuntos .= "Content-Transfer-Encoding: BASE64\n";
$sAdjuntos .= "Content-disposition: attachment;filename=\"".$vAdjunto['name']."\"\n\n";
$oFichero = fopen($vAdjunto['tmp_name'], 'r');
$sContenido = fread($oFichero, filesize($vAdjunto['tmp_name']));
$sAdjuntos .= chunk_split(base64_encode($sContenido));
fclose($oFichero);
}
}
}
if( $bHayFicheros ) $sTexto .= $sAdjuntos."\n\n----Message-Boundary----\n";
$Ok = mail($sPara, $sAsunto, $sTexto, $sCabeceras);
return($Ok);
}
?>
