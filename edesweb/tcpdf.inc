<?php
require_once('../../lib/tcpdf/config/lang/eng.php');
require_once('../../lib/tcpdf/tcpdf.php');
function specialChars($tbl){
$b=array('º','ª',
'À','Á','Â','Ã','Ä','Å','Æ','Ç','È','É','Ê','Ë','Ì','Í','Î','Ï','Ð','Ñ','Ò','Ó','Ô','Õ','Ö','Ø','Ù','Ú','Û','Ü','Ý','Þ','ß','à','á','â','ã','ä','å','æ','ç','è','é','ê','ë','ì','í','î','ï','ð','ñ','ò','ó','ô','õ','ö','ø','ù','ú','û','ü','ý','þ','ÿ',"'",'´','€','…','“','”','„','†','‰','™','‘','’','¿','«','»','¡','·','¨','¥','£','¬','§');
$r=array('&ordm;','&ordf;','&Agrave;','&Aacute;','&Acirc;','&Atilde;','&Auml;','&Aring;','&AElig;','&Ccedil;','&Egrave;','&Eacute;','&Ecirc;','&Euml;','&Igrave;','&Iacute;','&Icirc;','&Iuml;','&ETH;','&Ntilde;','&Ograve;','&Oacute;','&Ocirc;','&Otilde;','&Ouml;','&Oslash;','&Ugrave;','&Uacute;','&Ucirc;','&Uuml;','&Yacute;','&THORN;','&szlig;','&agrave;','&aacute;','&acirc;','&atilde;','&auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&ouml;','&oslash;','&ugrave;','&uacute;','&ucirc;','&uuml;','&yacute;','&thorn;','&yuml;','&apos;','&acute;','&euro;','&#8230;','&#8220;','&#8221;','&#8222;','&#8224;','&#8240;','&#8482;','&#8216;','&#8217;','&iquest;','&laquo;' ,'&raquo;','&iexcl;' ,'&middot;','&uml;','&yen;','&pound;','&not;','&sect;');
return str_replace($b,$r,$tbl);
}
?>
