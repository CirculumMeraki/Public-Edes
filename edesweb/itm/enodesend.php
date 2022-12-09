<?PHP
function eNodeSend_($records){
global $urlNode, $phpNodeService, $phpNodeKey;
if( isset($records["msg"])		 ) $records["msg"]		 = utf8_encode($records["msg"]);
if( isset($records["room_name"]) ) $records["room_name"] = utf8_encode($records["room_name"]);
if( isset($records["title"])	 ) $records["title"]	 = utf8_encode($records["title"]);
if( isset($records["body"])		 ) $records["body"]		 = utf8_encode($records["body"]);
$dataJson = json_encode($records);
$ch = curl_init($urlNode.$phpNodeService);
if( $ch===false ){
return false;
}else{
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $dataJson);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
"phpNodeKey: ".$phpNodeKey,
"Content-Type: application/json",
"Content-Length: ".strlen($dataJson))
);
curl_setopt($ch, CURLOPT_TIMEOUT, 1);
$res = curl_exec($ch);
curl_close($ch);
if( $res=="" ){
}else if( $res!="ok" ){
}else if( $res=="ok" ){
return true;
}
return false;
}
}
?>
