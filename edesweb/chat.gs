<?PHP
date_default_timezone_set('Europe/Madrid');
define( '_ERROR_REPORTING', 5 );
error_reporting( _ERROR_REPORTING );
date_default_timezone_set('Europe/Madrid');
ini_set( 'track_errors', false );
foreach($_GET  as $k=>$v) $GLOBALS[$k] = $v;
foreach($_POST as $k=>$v) $GLOBALS[$k] = $v;
$_ConRastro = false;
$DIR = '../../edesweb/';
if( $_ConRastro ){
$txt = date('H:i:s')."\n";
foreach( $_POST as $k=>$v ) $txt .= $k.' = '.$v.", ";
error_log( $txt."\n", 3, 'chat.log' );
}
eval( _LoadSqlIni( '../_datos/config/sql.ini' ) );
include_once( $DIR.$_Sql.'.inc' );
$CDI = date('Y-m-d H:i:s');
if( count($_FILES) > 0 ){
foreach($_FILES as $k=>$v){
foreach($v as $k2=>$v2){
$uploadFile = $_FILES[$k]['name'];
move_uploaded_file( $_FILES[$k]['tmp_name'], '../_tmp/exc/'.$uploadFile.'.png');
list( $datos, $screen ) = explode('.',$uploadFile);
list( $from, $to, $user_room, $room ) = explode('_',$datos);
if( $user_room.$room!='' ) $room = $user_room.'_'.$room;
qQuery( "insert into gs_chat
( action, user_from, user_to, message, room, y2s )
values
( '#', '{$from}', '{$to}', '{$uploadFile}', '{$room}', '{$CDI}' )" );
eEnd();
}
}
eEnd();
}
if( $_GET['NMFILE']!='' ){
list( $user, $room ) = explode( '_', $_GET['ID'] );
$DBNomFile = substr($_GET['NMFILE'],0,-4);
if( $room=='' ){
qQuery( "select * from gs_chat where action='@' and message='{$DBNomFile}' and user_to='{$user}'" );
}else{
qQuery( "select * from gs_chat where action='@' and message='{$DBNomFile}' and room='{$room}')" );
}
while( $r = qArray() ){
header( "Content-Type: image/jpeg" );
readFile( '../_tmp/exc/'.$_GET['NMFILE'] );
if( $r['user_to']==$user ){
qQuery( "delete from gs_chat where cd_gs_chat='{$r['cd_gs_chat']}'" );
@unlink( '../_tmp/exc/'.$_GET['NMFILE'] );
}
break;
}
eEnd();
}
$Mensaje = $_POST['MESSAGE'];
switch( $_POST['ACTION'] ){
case 'I':
case 'R';
qQuery( "select * from gs_user where cd_gs_user='{$_POST['USER_FROM']}'" );
$r = qArray();
if( $_POST['ACTION']=='R' ){
$Mensaje = 'Llamada entrante de '.trim($r['user_name']).' '.trim($r['user_surname']);
}else{
$Mensaje = 'Invitación de '.trim($r['user_name']).' '.trim($r['user_surname']);
}
$Mensaje = str_replace( "'", chr(92)."'", $Mensaje );
case 'x':
case 'X':
if( strtoupper($_POST['ACTION'])=='X' ){
$_POST['ACTION'] = 'D';
if( $_POST['ROOM']<>'' ){
qQuery( "delete from gs_chat_room where cd_gs_user='{$_POST['USER_FROM']}' and room='{$_POST['ROOM']}'" );
}
if( $_POST['ACTION']=='x' ) eEnd();
}
case 'D':
if( $Mensaje=='RING' ){
$_POST['ACTION'] = 'A';
if( $_ConRastro ) error_log( $_POST['ACTION'].'<'.$Mensaje.'>'."\n", 3, 'chat.log' );
}
if( str_replace(',','',trim($_POST['USER_TO']))!='' ){
$tmp = explode(',',$_POST['USER_TO']);
for( $n=0; $n<count($tmp); $n++ ){
if( $tmp[$n]==0 ) continue;
if( $tmp[$n] < 0 ){
$tmp[$n] = $tmp[$n] * -1;
qQuery( "select * from gs_user where cd_gs_node='{$tmp[$n]}' and permission='S'" );
while( $r = qArray() ){
qQuery( "insert into gs_chat
( action, user_from, user_to, message, room, y2s )
values
( '{$_POST['ACTION']}', '{$_POST['USER_FROM']}', '{$r['cd_gs_user']}', '{$Mensaje}', '{$_POST['ROOM']}', '{$CDI}' )", $pt );
if( $_POST['ACTION']=='I' ){
qQuery( "insert into gs_chat_room
( cd_gs_user, room, y2s )
values
( '{$r['cd_gs_user']}', '{$_POST['ROOM']}', '{$CDI}' )", $pt );
}
}
}else{
qQuery( "insert into gs_chat
( action, user_from, user_to, message, room, y2s )
values
( '{$_POST['ACTION']}', '{$_POST['USER_FROM']}', '{$tmp[$n]}', '{$Mensaje}', '{$_POST['ROOM']}', '{$CDI}' )" );
if( $_POST['ACTION']=='I' ){
qQuery( "insert into gs_chat_room
( cd_gs_user, room, y2s )
values
( '{$tmp[$n]}', '{$_POST['ROOM']}', '{$CDI}' )", $pt );
}
}
}
}else{
qQuery( "select * from gs_chat_room where room='{$_POST['ROOM']}' and cd_gs_user<>'{$_POST['USER_FROM']}'" );
while( $r = qArray() ){
qQuery( "insert into gs_chat
( action, user_from, user_to, message, room, y2s )
values
( '{$_POST['ACTION']}', '{$_POST['USER_FROM']}', '{$r['cd_gs_user']}', '{$Mensaje}', '{$_POST['ROOM']}', '{$CDI}' )", $pt );
if( $_POST['ACTION']=='I' ){
qQuery( "insert into gs_chat_room
( cd_gs_user, room, y2s )
values
( '{$r['cd_gs_user']}', '{$_POST['ROOM']}', '{$CDI}' )", $pt );
}
}
}
break;
case 'P':
break;
case 'H':
qQuery( "insert into gs_chat
( action, user_from, user_to, message, room, y2s )
values
( 'H', '{$_POST['USER_FROM']}', '{$_POST['USER_TO']}', '{$Mensaje}', '{$_POST['ROOM']}', '{$CDI}' )" );
qQuery( "insert into gs_chat_room
( cd_gs_user, room, y2s )
values
( '{$_POST['USER_FROM']}', '{$_POST['ROOM']}', '{$CDI}' )" );
qQuery( "insert into gs_chat_room
( cd_gs_user, room, y2s )
values
( '{$_POST['USER_TO']}', '{$_POST['ROOM']}', '{$CDI}' )" );
break;
case 'S':
break;
case 'T':
break;
case 'M':
break;
case 'F':
break;
case 'A':
break;
case 'B':
break;
case '2':
case '1':
case '0':
qQuery( "delete from gs_chat where user_from='{$_POST['USER_FROM']}' and action in ('0','1','2')" );
if( $_POST['ACTION']<>'0' ){
qQuery( "insert into gs_chat
( action, user_from, user_to, message, room, y2s )
values
( '{$_POST['ACTION']}', '{$_POST['USER_FROM']}', 0, '', '', '{$CDI}' )" );
}
break;
case 'LstUserON':
ListaDeUsuarios( 1 );
if( $_ConRastro ) if( $_ConRastro ) error_log( '------------------------------------------------------------------------------------------------------------------'."\n", 3, 'chat.log' );
exit;
case 'LstUserALL':
ListaDeUsuarios( 0 );
if( $_ConRastro ) if( $_ConRastro ) error_log( '------------------------------------------------------------------------------------------------------------------'."\n", 3, 'chat.log' );
exit;
case 'LstUserFavoritos':
ListaDeUsuarios( -1 );
if( $_ConRastro ) if( $_ConRastro ) error_log( '------------------------------------------------------------------------------------------------------------------'."\n", 3, 'chat.log' );
exit;
default:
if( $_ConRastro ) error_log( 'ERROR: ------------------------------------------'."\n", 3, 'chat.log' );
eEnd();
}
$MensajesABorrar = array();
$Respuesta = '';
if( $_POST['ROOM']!='' ){
if( $_POST['ROOM'][0]=='|' ) $_POST['ROOM'] = substr($_POST['ROOM'],1);
$DimRoom = explode("|",$_POST['ROOM']);
$sROOM = implode("','",$DimRoom);
if( $_ConRastro ) error_log( "select * from gs_chat where (user_to='{$_POST['USER_FROM']}' or room in ('{$sROOM}')) and user_from<>'{$_POST['USER_FROM']}' and y2s<='{$CDI}' order by cd_gs_chat"."\n", 3, 'chat.log' );
qQuery( "select * from gs_chat where (user_to='{$_POST['USER_FROM']}' or room in ('{$sROOM}')) and user_from<>'{$_POST['USER_FROM']}' and y2s<='{$CDI}' order by cd_gs_chat" );
}else{
if( $_ConRastro ) error_log("select * from gs_chat where user_to='{$_POST['USER_FROM']}' and y2s<='{$CDI}' order by cd_gs_chat"."\n", 3, 'chat.log' );
qQuery( "select * from gs_chat where user_to='{$_POST['USER_FROM']}' and y2s<='{$CDI}' order by cd_gs_chat" );
}
$NMensajes = 0;
while( $r=qArray() ){
if( $r['action']!='#' && $r['action']!='M' ) $MensajesABorrar[] = $r['cd_gs_chat'];
if( $r['action']=='M' ) $NMensajes++;
qQuery( "select user_name, user_surname from gs_user where cd_gs_user='{$r['user_from']}'", $p2 );
list( $Nom, $Ape ) = qRow($p2);
$NomUser = trim($Nom).' '.trim($Ape);
$NomUser = str_replace( "'", chr(92)."'", $NomUser );
if( $Respuesta!='' ) $Respuesta .= '|';
if( $r['action']!='M' ) $Respuesta .= $r['action'].'|'.$r['user_from'].'|'.$NomUser.'|'.$r['message'].'|'.$r['room'].'|'.$r['user_to'];
if( $r['action']=='#' ) qQuery( "update gs_chat set action='@' where cd_gs_chat='{$r['cd_gs_chat']}'" );
}
if( $NMensajes > 0 ){
$Respuesta .= 'NM|'.$NMensajes.'||||';
}
echo $Respuesta;
if( $_ConRastro ) error_log( 'RESPUESTA: '.$Respuesta."\n", 3, 'chat.log' );
if( count($MensajesABorrar) > 0 ){
if( $_ConRastro ) error_log( 'BORRAR: '.implode(',', $MensajesABorrar)."\n", 3, 'chat.log' );
qQuery( 'delete from gs_chat where cd_gs_chat in ('.implode(',', $MensajesABorrar).')' );
}
if( $_ConRastro ) error_log( '------------------------------------------------------------------------------------------------------------------'."\n", 3, 'chat.log' );
eEnd();
function ListaDeUsuarios( $nActivos ){
$Disponible = array();
qQuery( 'select user_from, action from gs_chat where action in ("1","2")' );
while( $r=qArray() ) $Disponible['E'.$r['user_from']] = $r['action'];
if( $nActivos==-1 ){
qQuery( 'select U.cd_gs_user, U.user_surname, U.user_name, N.cd_gs_node, N.nm_gs_node, (select count(*) from gs_conexion C where U.cd_gs_user=C.cd_gs_user and C.cdi>"'.date('Y-m-d').' 00:00:00" and C.cdi_fin is null ) activo
from gs_user as U left join gs_node as N on U.cd_gs_node=N.cd_gs_node
where U.cd_gs_node='.$_POST['NODE'].' and U.permission="S"
order by N.nm_gs_node,U.user_surname,U.user_name' );
}else{
qQuery( 'select U.cd_gs_user, U.user_surname, U.user_name, N.cd_gs_node, N.nm_gs_node, (select count(*) from gs_conexion C where U.cd_gs_user=C.cd_gs_user and C.cdi>"'.date('Y-m-d').' 00:00:00" and C.cdi_fin is null ) activo
from gs_user as U left join gs_node as N on U.cd_gs_node=N.cd_gs_node
where U.permission="S"
order by N.nm_gs_node,U.user_surname,U.user_name' );
}
$NomNodo = "";
$n = 1;
$Padre = 0;
while( $r=qArray() ){
if( $r['activo'] >= $nActivos ){
}else{
continue;
}
if( $Disponible['E'.$r['cd_gs_user']]=='2' ) continue;
if( $NomNodo != $r['nm_gs_node'] ){
$Padre = $r['cd_gs_node'] * -1;
if( $n > 1 ) echo "\n<br>";
echo 'C|';
echo $r['nm_gs_node'].'|';
echo $Padre .'|';
echo '0|';
echo '|';
echo '|';
$n++;
}
if( $n > 1 ) echo "\n<br>";
echo 'U|';
echo trim($r['user_surname']).' '.trim($r['user_name']).'|';
echo $r['cd_gs_user'].'|';
echo $Padre .'|';
echo '0|';
if( $Disponible['E'.$r['cd_gs_user']]!='' ){
echo $Disponible['E'.$r['cd_gs_user']].'|';
}else{
if( $r['activo'] > 0 ){
echo 'D|';
}else{
echo '3|';
}
}
$n++;
$NomNodo = $r['nm_gs_node'];
}
}
$Respuesta = ''.
''.
'D'.
'|'.
'JUAN'.
'|'.
'Texto de contextacion'.
'|'.
'D'.
'|'.
'PEPE'.
'|'.
'Otro texto'
;
echo $Respuesta;
qQuery( "select * from gs_user where cd_gs_user='{$_POST['USER']}'" );
$r = qArray();
$Respuesta = ''.
''.
'R'.
'|'.
'JUAN'.
'|'.
'Texto de contextacion'.
'|'.
'R'.
'|'.
'PEPE'.
'|'.
'Otro texto'
;
die('');
echo $Respuesta;
exit;
eEnd();
?>
