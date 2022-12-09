<?PHP
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require_once '../../lib/phpmailer6/src/PHPMailer.php';
require_once '../../lib/phpmailer6/src/SMTP.php';
require_once '../../lib/phpmailer6/src/Exception.php';
function eMailSmtp($_to, $_asunto, $_texto_html="", $_from, $_nm_from="", $cc="", $bcc="", $adjuntos=false){
global $_Development, $_SystemUser;
qQuery("select * from gesco_cnfg_emisor where server='smtp4.gesoft.es'", $resultado);
$row = qArray($resultado);
$_HOST = $row['server'];
$_USERNAME = $row['user'];
$_PASSWORD = $row['pass'];
$_PORT = trim($row['port']);
$err_general=0;
$mail = new PHPMailer(true);
include('../d/gescomu/phpmailer_cnfg_server.php');
if($_to!='')$mail->AddAddress(trim($_to));
if($cc!='')$mail->AddCC(trim($cc));
if($bcc!='')$mail->AddBCC(trim($bcc));
$mail->SetFrom($_from, $_nm_from);
$mail->Subject = trim($_asunto);
$mail->MsgHTML(limpiaCadena($_texto_html));
if($_SystemUser=='S'){
}
if( !is_bool($ConFiles) ){
foreach($adjuntos as $clave=>$fichero){
if(file_exists($fichero)) $mail->AddAttachment($fichero,substr(strrchr($fichero, "/"), 1));
}
}
if( !$mail->Send() ){
$error = 'Mail error: '.$mail->ErrorInfo;
error_log( date("Y:m:d H:i:s").':::'."ERROR -2:{$error}\n",3, '../_tmp/mail.inc.log');
return -2;
}else{
return 1;
}
}
function limpiaCadena($cad){
$cad= str_replace("&nbsp;"," ", $cad);
$cad= str_replace("&#160;"," ", $cad);
$cad= str_replace("&#xA0;"," ", $cad);
$cad= str_replace("&sup2;","²", $cad);
$cad= str_replace("&#178;","²", $cad);
$cad= str_replace("&#xB2;","²", $cad);
$cad= str_replace("&sup3;","³", $cad);
$cad= str_replace("&#179;","³", $cad);
$cad= str_replace("&#xB3;","³", $cad);
$cad= str_replace("&raquo;","»", $cad);
$cad= str_replace("&#187;","»", $cad);
$cad= str_replace("&#xBB;","»", $cad);
$cad= str_replace("&Aacute;","Á", $cad);
$cad= str_replace("&#193;","Á", $cad);
$cad= str_replace("&#xC1;","Á", $cad);
$cad= str_replace("&Eacute;","É", $cad);
$cad= str_replace("&#201;","É", $cad);
$cad= str_replace("&#xC9;","É", $cad);
$cad= str_replace("&Iacute;","Í", $cad);
$cad= str_replace("&#205;","Í", $cad);
$cad= str_replace("&#xCD;","Í", $cad);
$cad= str_replace("&Ntilde;","Ñ", $cad);
$cad= str_replace("&#209;","Ñ", $cad);
$cad= str_replace("&#xD1;","Ñ", $cad);
$cad= str_replace("&Oacute;","Ó", $cad);
$cad= str_replace("&#211;","Ó", $cad);
$cad= str_replace("&#xD3;","Ó", $cad);
$cad= str_replace("&Uacute;","Ú", $cad);
$cad= str_replace("&#218;","Ú", $cad);
$cad= str_replace("&#xDA;","Ú", $cad);
$cad= str_replace("&Uuml;","Ü", $cad);
$cad= str_replace("&#220;","Ü", $cad);
$cad= str_replace("&#xDC;","Ü", $cad);
$cad= str_replace("&aacute;","á", $cad);
$cad= str_replace("&#225;","á", $cad);
$cad= str_replace("&#xE1;","á", $cad);
$cad= str_replace("&ccedil;","ç", $cad);
$cad= str_replace("&#231;","ç", $cad);
$cad= str_replace("&#xE7;","ç", $cad);
$cad= str_replace("&eacute;","é", $cad);
$cad= str_replace("&#233;","é", $cad);
$cad= str_replace("&#xE9;","é", $cad);
$cad= str_replace("&iacute;","í", $cad);
$cad= str_replace("&#237;","í", $cad);
$cad= str_replace("&#xED;","í", $cad);
$cad= str_replace("&ntilde;","ñ", $cad);
$cad= str_replace("&#241;","ñ", $cad);
$cad= str_replace("&#xF1;","ñ", $cad);
$cad= str_replace("&oacute;","ó", $cad);
$cad= str_replace("&#243;","ó", $cad);
$cad= str_replace("&#xF3;","ó", $cad);
$cad= str_replace("&uacute;","ú", $cad);
$cad= str_replace("&#250;","ú", $cad);
$cad= str_replace("&#xFA;","ú", $cad);
$cad= str_replace("&uuml;","ü", $cad);
$cad= str_replace("&#252;","ü", $cad);
$cad= str_replace("&#xFC;","ü", $cad);
$cad= str_replace("%u2010","-", $cad);
$cad= str_replace("%u2019","´", $cad);
$cad= str_replace("%u20AC","&euro;", $cad);
$cad= str_replace("&#39;",'"', 	$cad);
return $cad;
}
?>
