<?PHP
$room = $_GET["room"]*1;
$user = $_SESSION["_User"];
$cdi = date('Y-m-d H:i:s');
qQuery("select * from gs_chat_room where cd_gs_chat_room={$room} and cdi_close is null");
$r = qArray();
if( $r["cd_gs_chat_room"]!=$room || $r["type_room"]=="S" ) exit;
if( $r["type_room"]=="P" ){
$ok = false;
$dim = array();
qQuery("select * from gs_chat_user where cd_gs_room={$room} and cdi_end is null");
while($r=qArray()){
if( $r["cd_gs_user"]==$user ) $ok = true;
$dim[] = $r["cd_gs_user"];
}
if( $ok ){
qQuery("update gs_chat_user set cdi_end='{$cdi}'   where cd_gs_room={$room} and cdi_end   is null");
qQuery("update gs_chat_room set cdi_close='{$cdi}' where cd_gs_room={$room} and cdi_close is null");
for($n=0; $n<count($dim); $n++){
eNodeSend(array("room"=>$room, "type"=>"user_delete", "room_pk":$room, "user_pk":$dim[$n]));
}
}
}else if( $r["type_room"]=="G" ){
qQuery("update gs_chat_user set cdi_end='{$cdi}' where cd_gs_room={$room} and cd_gs_user={$user} and cdi_end is null");
eNodeSend(array("room"=>$room, "type"=>"user_delete", "room_pk":$room, "user_pk":$user));
if( qCount("gs_chat_user", "cd_gs_room={$room} and cd_gs_user={$user} and cdi_end is null")==0 ){
qQuery("update gs_chat_room set cdi_close='{$cdi}' where cd_gs_room={$room} and cdi_close is null");
}
}else{
exit;
}
?>
