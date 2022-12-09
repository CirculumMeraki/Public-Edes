<?PHP
require_once('../../lib/gesco/phpmailer_v51/class.phpmailer.php');
function eMailSmtp($_to, $_asunto, $_texto_html, $_from, $_nm_from, $cc, $bcc, $adjuntos){
global $_Development;
$resultado = qQuery("select * from gesco_cnfg_emisor where cnfg_default='S'");
$row = qArray($resultado);
$_HOST = $row['server'];
$_USERNAME = $row['user'];
$_PASSWORD = $row['pass'];
$_PORT = $row['port'];
if($_from=='' || $_HOST=='' || $_USERNAME=='' || $_PASSWORD=='' ){
$error= "ERROR -1: ERROR EN LA CONFIGURACION DEL ENV�O ($_from |$_HOST|$_USERNAME| $_PASSWORD)";
error_log(date("Y:m:d H:i:s").'    '.$error."\n",3, '../_tmp/mail.inc.log');
return -1;
}
$err_general=0;
$mail = new PHPMailer(true);
include('../d/gesco_v1/phpmailer_cnfg_server.php');
$mail->SetFrom($_from, $_nm_from);
if($_to!='')$mail->AddAddress( trim($_to) );
if($cc!='')$mail->AddCC(trim($cc));
if($bcc!='')$mail->AddBCC(trim($bcc));
$mail->Subject = trim($_asunto);
$mail->MsgHTML(limpiaCadena($_texto_html));
foreach($adjuntos as $clave=>$fichero){
if(file_exists($fichero)) $mail->AddAttachment($fichero,substr(strrchr($fichero, "/"), 1));
}
if(!$mail->Send()) {
$error = 'Mail error: '.$mail->ErrorInfo;
error_log( date("Y:m:d H:i:s").':::'."ERROR -2:{$error}\n",3, '../_tmp/mail.inc.log');
return -2;
} else {
return 1;
}
}
function limpiaCadena($cad){//Funci�n que limpia caracteres
$cad= str_replace("&nbsp;"," ", $cad);
$cad= str_replace("&#160;"," ", $cad);
$cad= str_replace("&#xA0;"," ", $cad);
$cad= str_replace("&sup2;","�", $cad);
$cad= str_replace("&#178;","�", $cad);
$cad= str_replace("&#xB2;","�", $cad);
$cad= str_replace("&sup3;","�", $cad);
$cad= str_replace("&#179;","�", $cad);
$cad= str_replace("&#xB3;","�", $cad);
$cad= str_replace("&raquo;","�", $cad);
$cad= str_replace("&#187;","�", $cad);
$cad= str_replace("&#xBB;","�", $cad);
$cad= str_replace("&Aacute;","�", $cad);
$cad= str_replace("&#193;","�", $cad);
$cad= str_replace("&#xC1;","�", $cad);
$cad= str_replace("&Eacute;","�", $cad);
$cad= str_replace("&#201;","�", $cad);
$cad= str_replace("&#xC9;","�", $cad);
$cad= str_replace("&Iacute;","�", $cad);
$cad= str_replace("&#205;","�", $cad);
$cad= str_replace("&#xCD;","�", $cad);
$cad= str_replace("&Ntilde;","�", $cad);
$cad= str_replace("&#209;","�", $cad);
$cad= str_replace("&#xD1;","�", $cad);
$cad= str_replace("&Oacute;","�", $cad);
$cad= str_replace("&#211;","�", $cad);
$cad= str_replace("&#xD3;","�", $cad);
$cad= str_replace("&Uacute;","�", $cad);
$cad= str_replace("&#218;","�", $cad);
$cad= str_replace("&#xDA;","�", $cad);
$cad= str_replace("&Uuml;","�", $cad);
$cad= str_replace("&#220;","�", $cad);
$cad= str_replace("&#xDC;","�", $cad);
$cad= str_replace("&aacute;","�", $cad);
$cad= str_replace("&#225;","�", $cad);
$cad= str_replace("&#xE1;","�", $cad);
$cad= str_replace("&ccedil;","�", $cad);
$cad= str_replace("&#231;","�", $cad);
$cad= str_replace("&#xE7;","�", $cad);
$cad= str_replace("&eacute;","�", $cad);
$cad= str_replace("&#233;","�", $cad);
$cad= str_replace("&#xE9;","�", $cad);
$cad= str_replace("&iacute;","�", $cad);
$cad= str_replace("&#237;","�", $cad);
$cad= str_replace("&#xED;","�", $cad);
$cad= str_replace("&ntilde;","�", $cad);
$cad= str_replace("&#241;","�", $cad);
$cad= str_replace("&#xF1;","�", $cad);
$cad= str_replace("&oacute;","�", $cad);
$cad= str_replace("&#243;","�", $cad);
$cad= str_replace("&#xF3;","�", $cad);
$cad= str_replace("&uacute;","�", $cad);
$cad= str_replace("&#250;","�", $cad);
$cad= str_replace("&#xFA;","�", $cad);
$cad= str_replace("&uuml;","�", $cad);
$cad= str_replace("&#252;","�", $cad);
$cad= str_replace("&#xFC;","�", $cad);
$cad= str_replace("%u2010","-", $cad);
$cad= str_replace("%u2019","�", $cad);
$cad= str_replace("%u20AC","&euro;", $cad);
$cad= str_replace("&#39;",'"', 	$cad);
return $cad;
}
?>
