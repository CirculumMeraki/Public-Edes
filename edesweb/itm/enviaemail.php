<?PHP
function enviaEmail( $email, $asunto, $email_text ){
require_once('../../lib/gesco/phpmailer_v51/class.phpmailer.php');
$Config = -1;
$Config = eFileGetVar('EMail');
$arr_error = '';
$mail = new PHPMailer(true);
$mail->IsSMTP();
$mail->SMTPAuth   = true;
$mail->Host       = $Config['host'];
$mail->Username   = $Config['user'];
$mail->Password   = $Config['password'];
$mail->SMTPKeepAlive = true;
$mail->SMTPDebug  = 0;          //2 enables SMTP debug information (for testing)
try {
$mail->isHTML(true);
if( $Config['reply']=='' ) $Config['reply'] = $Config['from'];
if( $Config['nm_reply']=='' ) $Config['nm_reply'] = $Config['nm_from'];
$mail->SetFrom( $Config['from'], $Config['nm_from'] );
$mail->AddReplyTo( $Config['reply'], $Config['nm_reply'] );
$mail->Subject = $asunto;
$mail->AltBody = 'Para ver el mensaje, por favor, utilice un visor de HTML de correo electrónico compatible'; // optional - MsgHTML will create an alternate automatically
$TEXTO_HTML = urldecode($email_text);
$mail->MsgHTML($TEXTO_HTML);
} catch (phpmailerException $e){
$arr_error.= "ERROR 1 : {$e->errorMessage()}<br>";
} catch (Exception $e){
$arr_error.= "ERROR 2 : {$e->errorMessage()}<br>";
}
if($err_general>0){
$arr_error.= "ERROR 3 : {$e->errorMessage()}<br>";
}else{
try{
$mail->AddAddress( trim($email) );
$mail->Send();
$mail->ClearAllRecipients();
} catch (phpmailerException $e) {
$arr_error.= $email." : {$e->errorMessage()}<br>";
} catch (Exception $e) {
$arr_error.= $email." : {$e->errorMessage()}<br>";
}
}
return(trim($arr_error)=='');
}
?>
