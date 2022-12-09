<?PHP
global $php_errormsg, $_Include, $Opcion, $_eParseError;
$_eParseError++;
if( $php_errormsg!='' ){
eInit();
list(,$Eti) = explode('_',strtoupper($_Include));
$xError = '"['.$Eti.'] '.$Opcion.'" '.$php_errormsg;
if( $_SESSION['_D_']!='' ){
if( $ConTron ) eTron(date('Y-m-d H:i:s').' '.$xError.' ('.$_eParseError.')');
eTrace($xError.' ('.$_eParseError.')');
}else{
$CodError = chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90));
eTron(date('Y-m-d H:i:s').' '.$CodError.': '.$xError.' ('.$_eParseError.')');
eTrace('ERROR INTERNO "'.$CodError.'"');
}
eEnd();
}
?>
