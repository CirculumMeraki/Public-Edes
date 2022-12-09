<?PHP
eInclude("message");
$ApplicationName = eFileGetVar('Setup.ApplicationName');
$EMailSystem = eFileGetVar('Setup.EMailSystem');
if( $EMailSystem=="" ){
eMessage('ERROR: Falta definir el email del sistema en "group.var->Setup->EMailSystem"', "HSE");
}
$txt = "Empresa: ".$ApplicationName;
$email = $_SESSION['_UserEMail'];
if( $email=="faranda@gesoft.es" ) $email = "felixv.aranda@gmail.com";
if( eMail($email, 'PRUEBA ENVIO DE EMAIL', $txt, $EMailSystem) ){
eMessage("Prueba de EMail a ".$_SESSION['_UserEMail'], "HS");
}else{
eMessage("ERROR: En prueba de EMail", "HSE");
}
?>
