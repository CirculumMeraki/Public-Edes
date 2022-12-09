<?PHP
eInclude("message");
if( !function_exists("curl_init") ){
eMessage('La función "curl_init" no existe', "HSE");
}
function loginSSO($user, $pass, $ssohost){
include_once('../../lib/sso/new.openam.class.php');
$sso = new OpenSSO($ssohost);
try{
$token = $sso->authenticate($user, $pass);
}catch( Exception $msg ){
eMessage("Error de autenticación en SSO", "HSE");
}
return $token;
}
eFileGetVar("SSOUpdate", true);
if( $sso_url<>"" ){
$token = loginSSO($sso_user, $sso_password, $sso_url);
$headers = [
"Cookie: {$sso_dir}={$token}"
];
}
$_HttpConfigLoad = true;
$Dim = include( eScript('$a/u/_http.gs') );
$IdSrv = _IDSRV();
for($n=0; $n<count($Dim); $n++){
if( $Dim[$n][1]!=$IdSrv ){
$TO = $Dim[$n][0];
$NomServer = $Dim[$n][2];
break;
}
}
if( substr($TO,-1)=="/" ){
$target_url = $TO.'edes.php?UPLOAD&FILE=';
}else{
$target_url = $TO.'/edes.php?UPLOAD&FILE=';
}
if( class_exists('cURLFile') ){
$post = array(
'TO_UPDATE' => 'test',
'IDSRV' => $_SESSION["_ServerTarget"][$TO],
'SS' => $_SESSION["_sesion_"]
);
}else{
$post = array(
'TO_UPDATE' => 'test',
'IDSRV' => $_SESSION["_ServerTarget"][$TO],
'SS' => $_SESSION["_sesion_"]
);
}
$ch = curl_init();
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_URL, $target_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
if( $result!="ok" ){
eMessage("Error de conexión<br><br>Servidor: {$NomServer}<br>URL: {$target_url}<br>Error: ".$result, "HSE");
}else{
eMessage('Ha conectado con el servidor "'.$NomServer.'"', "HS");
}
eEnd();
?>
