<?PHP
session_start();
if( !isset($_SESSION['_User']) ) exit;
gsInclude($_Sql);
gsInclude('message');
$notas = stripcslashes( $notas );
$notas = urldecode( $notas );
qSelect( 'gs_user', 'email,cd_gs_node', "cd_gs_user ='{$cd_gs_user}'", '' );
$row = qRow();
$nodo = $row[1];
$to = $row[0] ;
qSelect( 'gs_user', 'email,cd_gs_node', "cd_gs_user ='{$_User}'", '' );
$row = qRow();
$nodo_or = $row[1];
$from = $row[0];
$replyto = "";
$subject = $asunto;
$body = $notas;
$fd = popen( "/usr/sbin/sendmail -t", "w" );
if( $fd == false ){
$mensaje = "Error en el envío";
}else{
fputs( $fd, "To: $to\n" );
fputs( $fd, "From: $from\n" );
fputs( $fd, "Reply-to: $replyto\n" );
fputs( $fd, "Subject: $subject\n" );
fputs( $fd, "$body\n" );
pclose( $fd );
}
$DimText[] = ifx_create_blob( 1, 0, $notas );
$sql =	"insert into email ".
"(".
"origen,nodo_or,cd_gs_user,cd_gs_node,asunto,fecha,notas".
")".
" values ".
"(".
"'{$_User}','{$nodo_or}','{$cd_gs_user}','{$nodo}','{$asunto}','{$fecha}', ? ".
")";
ifx_query( $sql, $GLOBALS['_Conexion'], $DimText );
eMessage( 'Email Enviado', 'HS' );
?>
