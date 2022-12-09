<?PHP
$_MSG_YOU = '<table class="MSG_YOU MSG_CHAT{star}" pk={pk} user={user} cdi="{cdi}"><tr><td colspan=2 onclick="eChatWithYou(this)"><span class="MSG_USER">{name}</span>@{email}<tr><td><div>{text}</div><td class="MSG_TIME" style="width:1px;">{date}</table>';
$_MSG_YOU_NEXT = '<table class="MSG_YOU_NEXT MSG_CHAT{star}" pk={pk} user={user} cdi="{cdi}"><tr><td><div>{text}</div><td class="MSG_TIME" style="width:1px;">{date}</table>';
$_MSG_MY = '<table class="MSG_MY MSG_CHAT{star}" pk={pk} user={user} cdi="{cdi}"><tr><td colspan=2><span class="MSG_USER">{name}</span>@{email}<tr><td><div>{text}</div><td class="MSG_TIME" style="width:1px;">{date}</table>';
$_MSG_MY_NEXT = '<table class="MSG_MY_NEXT MSG_CHAT{star}" pk={pk} user={user} cdi="{cdi}"><tr><td><div>{text}</div><td class="MSG_TIME" style="width:1px;">{date}</table>';
$_MSG_NO_LEIDO = '<div class="CHAR_UNREAD CHAR_UNREAD_{room}">Mensajes no leídos</div>';
$_ROOM_ = '<div class="ROOM_OFF" id="_ROOM_{room}" type="{type}" cdiRead="{cdi}"{you}>'.
"<TABLE><tr>".
'<td width="1px"><i class="ICONWINDOW">{iconType}</i> '.
'<td width="100%">{name}'.
'<td width="1px" onclick="roomGestion(this)" onmouseover="roomVerMenu(this,1)" onmouseout="roomVerMenu(this,0)" title="Menú"><i class="ICONINPUT" style="visibility:hidden;zoom:35%;">=</i>'.
'<td width="1px"><span class="Circle"{css}>{sinLeer}</span>'.
'</table>'.
'</div>';
$DimExt = array(
"D"=>234,
"L"=>251,
"T"=>164,
"F"=>163,
"Y"=>166,
"M"=>167,
"doc"=>204,
"docx"=>204,
"xls"=>203,
"xlsx"=>203,
"png"=>206,
"gif"=>206,
"jpg"=>206,
"jpeg"=>206,
"bmp"=>206,
"pdf"=>202,
"avi"=>229,
"mp4"=>229,
"mkv"=>229,
"zip"=>345,
"rar"=>345,
"mp3"=>228
);
?>
<SCRIPT type="text/javascript">
var roomIco = {D:234, L:251, T:164, F:163, Y:166, M:167, doc:204, docx:204, xls:203, xlsx:203, png:206, gif:206, jpg:206, jpeg:206, bmp:206, pdf:202, avi:229, mp4:229, mkv:229, zip:345, rar:345, mp3:228};
function eChatExit(){
if( S("#TREEMAIN").length ) S("#TREEMAIN").block();
if( S(".ROOM_ON").length>0 ){
var roomExit = S(".ROOM_SET").attr("idRoom");
S("#_ROOM_"+roomExit+" .Circle").text("").visibility(false);
S(".ROOM_SET .Circle").text("").visibility(false);
roomRecalcNumMsg();
var dim = S("#_ROOM_MSG_"+roomExit+" .MSG_CHAT").dim,
cdi = dim[dim.length-1].getAttribute("cdi");
if( S(".ROOM_ON").attr("cdiRead")!=cdi ){
S(".ROOM_ON").attr("cdiRead", cdi);
eChatChannel("read", {user:_User, room:roomExit, cdi:cdi});
}
if( S(".CHAR_UNREAD_"+roomExit).length>0 ){
S(".CHAR_UNREAD_"+roomExit).nodeRemove();
}
}
S('.CHAT_SYSTEM').hidden();
roomTools(-1);
}
function eChatView(){
roomMaximize();
if( S(".CHAT_SYSTEM").css("visibility")=="hidden" && S("#ICON_CHATROOM").length>0 ){
S("#ICON_CHATROOM").class("-ANIMATION");
}
S('.CHAT_SYSTEM').visible();
var o = S(".ROOM_ON").obj,
id = S.mid(o.id,6,0);
if( S(o).attr("_top")==null && S("#_ROOM_MSG_"+id).length ){
S("#_ROOM_MSG_"+id).obj.scrollTop = S("#_ROOM_MSG_"+id).obj.scrollHeight+100;
S(o).attr("_top",1);
}
if( S(".CHAR_UNREAD_"+id).length==1 ){
S("#_ROOM_MSG_"+id).obj.scrollTop = S(".CHAR_UNREAD_"+id).obj.offsetTop;
}
if( S("#ICON_ROOMNOREAD").text()*1>0 ){
S("#ICON_ROOMNOREAD").visible();
}else{
S("#ICON_ROOMNOREAD").hidden();
}
}
function roomMinimize(){
if( S("#TREEMAIN").length ) S("#TREEMAIN").block();
S("#ICON_CHATSUBMIT").css("padding-right:0px");
S('.CHAT_SYSTEM').css("width:20%; height:50%; left:40%; top:25%;");
S('.CHAT_SYSTEM').obj.rows[0].cells[0].style.display = "none";
S('.CHAT_SYSTEM').obj.rows[0].cells[1].style.width = "25%";
S('#EMOTICONOS_LIST').none();
S(S('#ICON_CHATEMOTI').obj.parentElement).none();
S(".ROOM_SET I").none();
S(".CHAT_SYSTEM").move(false,".ROOM_SET");
S("#ICON_ROOMMAXI").block();
S("#ICON_ROOMMINI").none();
}
function roomMaximize(){
if( S("#TREEMAIN").length ) S("#TREEMAIN").none();
<?=(($_Development)? 'S("#ICON_CHATSUBMIT").css("padding-right:30px;");' : "")?>;
S('.CHAT_SYSTEM').css("left:0px; top:0px; width:100%; height:100%;");
S('.CHAT_SYSTEM').obj.rows[0].cells[0].style.display = "";
S('.CHAT_SYSTEM').obj.rows[0].cells[1].style.width = "75%";
S(S('#ICON_CHATEMOTI').obj.parentElement).table("table-cell");
S(".ROOM_SET I").block();
S("#ICON_ROOMMAXI").none();
S("#ICON_ROOMMINI").block();
}
function roomRecalcNumMsg(){
var t = 0;
S(".ROOM_LIST .Circle").each(function(k,o){
t += S(o).text()*1;
});
S("#ICON_ROOMNOREAD").text(t);
if( t>0 ){
S("#ICON_ROOMNOREAD").visible();
NotificationWarning(1);
}else{
S("#ICON_ROOMNOREAD").hidden();
NotificationWarning();
}
}
function roomSet(sala){
var o=((sala==undefined) ? S.toTag(S.event(window), "DIV"):sala), id, roomExit, dim=[], cdi, t;
if( o.className=="ROOM_OFF" ){
if( S(".ROOM_ON").length>0 ){
roomExit = S(".ROOM_SET").attr("idRoom");
t = S("#_ROOM_"+roomExit+" .Circle").text()*1;
S("#_ROOM_"+roomExit+" .Circle").text("").visibility(false);
S(".ROOM_SET .Circle").text("").visibility(false);
if( t>0 ) roomRecalcNumMsg();
var dimMensa = S("#_ROOM_MSG_"+roomExit+" .MSG_CHAT");
if( dimMensa.length ){
dim = dimMensa.dim;
cdi = dim[dim.length-1].getAttribute("cdi");
}
if( S(".ROOM_ON").attr("cdiRead")!=cdi ){
eChatChannel("read", {user:_User, room:roomExit, cdi:cdi});
S(".ROOM_ON").attr("cdiRead", cdi);
}
}
id = S.mid(o.id,6,0);
if( S(".CHAR_UNREAD_"+S(".ROOM_SET").attr("idroom")).length>0 ){
S(".CHAR_UNREAD_"+S(".ROOM_SET").attr("idroom")).nodeRemove();
}
S(".ROOM_ON").class("ROOM_OFF");
o.className = "ROOM_ON";
S(".ROOM_SET").html(S(o).html());
S(".ROOM_SET").attr("idRoom", id);
S("DIV[id^=_ROOM_MSG_]").none();
S("DIV[id=_ROOM_MSG_"+id+"]").block();
if( S(o).attr("_top")==null && S("#_ROOM_MSG_"+id).length ){
S("#_ROOM_MSG_"+id).obj.scrollTop = S("#_ROOM_MSG_"+id).obj.scrollHeight;
S(o).attr("_top",1);
}
if( S(".CHAR_UNREAD_"+id).length==1 ){
S("#_ROOM_MSG_"+id).obj.scrollTop = S(".CHAR_UNREAD_"+id).obj.offsetTop;
}
S(":room_msg").obj.focus();
}
}
function roomMessage(){
var o = S.event(window), room, you, tmp,
msg = S(":room_msg").val()
file = S(":_FILE_room__file").val()
ancla = S(":room__enlace").val(),
tools = (S(":CHAT_NOTI").val()?"N":"")+(S(":CHAT_ALERT").val()?"A":"")+(S(":CHAT_STAR").val()?"S":"")+S(":CHAT_TYPE").val()+S(":CHAT_DATE").val()+S(":CHAT_TIME").val();
S("#EMOTICONOS TD").each(function(k,o){
msg = S.replace(msg, o.innerText, "&#"+o.getAttribute("pk")+";");
});
S("#CHAT_TOOLS INPUT").each(function(k,o){
if( o.value!="" ){
}
if(o.type=="checkbox") o.checked = false;
o.value = "";
});
if( S(o).attr("disabled")!="true" && (msg+file+ancla)!="" ){
room = S(".ROOM_SET").attr("idRoom");
you = S(".ROOM_ON").attr("you");
if( you!=null ) room = you;
if( file!="" ){
tmp = _User+"_"+S.date("u")+"."+S.lower(S.fileType(S(":_FILE_room__file").val()));
S.file(S(":_FILE_room__file").obj, "/_tmp/zip/"+tmp, function(){
S.call("E:$a/chat/file", {tmp:tmp, file:S.fileFullname(S(":_FILE_room__file").val()), room:S(".ROOM_SET").attr("idRoom")}, {return:function(pk){
var tmp = pk.split(".");
if( tmp.length!=2 || tmp[1].length!=32 ){
S.error("Error al enviar el fichero");
return;
}
msg = "~f~"+S.fileType(file)+"~"+pk+"~"+S.fileFullname(file)+"~"+msg;
top.eChat(room, msg, tools);
S(":_FILE_room__file").val(""); S(":room__file").val("");
S("#FIELDS_CHATFILE").none();
S(":room__enlace").val("");
S(":room_msg").val("");
S(":room_msg").obj.focus();
}});
}, 100);
}else{
if( ancla!="" ){
msg = "~a~"+ancla+"~"+msg;
S(":room__enlace").val("");
S("#FIELD_CHATANCLA").none();
}
top.eChat(room, msg, tools);
S("#FIELDS_CHATFILE").none();
S(":room_msg").val("");
S(":room_msg").obj.focus();
}
}
}
function roomFile(){
if( S("#FIELDS_CHATFILE").width() ){
S("#FIELDS_CHATFILE").none();
}else{
S("#FIELDS_CHATFILE").table("table-row");
S("#FIELD_CHATANCLA").none();
}
}
function roomEnlace(){
if( S("#FIELD_CHATANCLA").width() ){
S("#FIELD_CHATANCLA").none();
}else{
S("#FIELD_CHATANCLA").table("table-row");
S("#FIELDS_CHATFILE").none();
}
}
function roomEmoti(){
if( S("#EMOTICONOS_LIST").width() ){
S("#EMOTICONOS_LIST").none();
}else{
S("#EMOTICONOS_LIST").table("table-row");
}
}
function roomTools(ok){
if( ok==1 ){
S('#CHAT_TOOLS').none();
}else if( ok==0 ){
S("#ICON_CHATTOOLS").around("#CHAT_TOOLS",{display:"inline-table"});
}else if( ok==-1 ){
S('#CHAT_TOOLS').none();
S("#CHAT_TOOLS INPUT").each(function(k,o){
if(o.type=="checkbox") o.checked = false;
o.value = "";
});
}
}
function roomVerFile(pk){
var o = S.event(window);
if( o.tagName=="I" ) o = o.parentNode;
var ext = S.fileType(o.innerText);
S.callSrv("edes.php?D://chat/"+pk.split(".")[0]+"."+ext);
}
function roomVerMenu(o, ver){
if( ver ){
S(o.children[0]).visible();
}else{
S(o.children[0]).hidden();
}
}
function roomGestion(o){
var id = S.mid(S.toTag(o,"div").id,6,0);
S(o).menu([["-Menú"],["Consultar","V","V"],["Modificar","U","U"],["Borrar","D","D"],["Salir de la sala","R","X"],["Usuarios conectados","&#241;","S"]], {function:function(op){
if(		  op=="V" ){
S.window("FcR:$a/chat/room.edf&_SEEK=1&cd_gs_chat_room="+id+"&_NOBUTTON");
}else if( op=="U" ){
S.window("FmR:$a/chat/room.edf&_SEEK=1&cd_gs_chat_room="+id+"&_CLOSE");
}else if( op=="D" ){
S.window("FbR:$a/chat/room.edf&_SEEK=1&cd_gs_chat_room="+id+"&_CLOSE");
}else if( op=="X" ){
S.alert({title:"¿Confirmar salir de la Sala?", icon:"DH", button:"AC", text:'Sala: "<b>'+S(S.toTag(o,"div")).col(1).obj.innerHTML+'</b>"', function:function(op){
if( op==2 ){
S.call("E:$a/chat/room_exit.php&room="+id);
}
}});
}
}});
}
function roomAlta(o){
S(o).menu([
["-Menú"],
["Alta","I","I"],
["Buscar Sala","S","S"],
["Avísame cuando se conecte...","S","S"],
["Está activo el usuario...","S","S"],
["Está conectado...","S","S"],
["Quién está conectado","S","S"]
], {function:function(op){
if( op=="I" ){
S.window("Fa:$a/chat/room");
}
}});
}
function Emoticono(){
var o = S.event(window);
if( o.tagName=="TD" ){
S(":room_msg").val(S(":room_msg").val()+o.innerText);
S(":room_msg").obj.focus();
}
}
function uChatCreateRoom(data){
var salir = false;
S(".ROOM_LIST div table td:nth-child(2)").each(function(k,o){
if( data.name==o.innerText ){
salir = true;
roomSet(S.toTag(o, "DIV"));
return null
}
});
if( salir ) return;
var iconType = '&#'+((data.type=="P")?"113":"241")+';',
sinLeer = 0,
css = ((sinLeer==0)? " style='visibility:hidden'":"");
var room = S.replace('<?=$_ROOM_?>', [
["{room}", data.room],
["{type}", data.type],
["{name}", data.name],
["{iconType}", iconType],
["{cdi}", ""],
["{css}", css],
["{sinLeer}", sinLeer],
["{you}", ""],
]);
S(room).nodeStart(S(".ROOM_LIST").obj);
S('<div id="_ROOM_MSG_'+data.room+'" style="width:100%; height:100%; overflow-x:hidden; overflow-y:auto; border-style:hidden; display:none;"></div>').nodeStart(S(".ROOM_TALK").obj);
}
function eChatWithYou(o){
var userDes = S.toTag(o,"TABLE").getAttribute("user");
uChatCreateRoom({type:"P", room:-_User, name:S(o).text()});
S("#_ROOM_-"+_User).attr("you", "-"+userDes);
roomSet(S("#_ROOM_-"+_User).obj);
}
eChat("<?=$ChatChannel["url"]?>", function(type, data){
switch(type){
case "connect":
S("#ICON_CHATROOM").color("").title("Chat ONLINE");
S("#ICON_CHATSUBMIT").color("").attr("disabled","false");
roomRecalcNumMsg();
break;
case "expired":
break;
case "connecting":
case "disconnect":
S("#ICON_CHATROOM").color("red").title("Chat OFFLINE");
S("#ICON_CHATSUBMIT").color("red").attr("disabled","true");
break;
case "tools":
if( /^(user_insert|user_delete)$/i.test(data.type) ){
data.type = data.type.replace("user","room");
}
if( /^(room_rename|room_insert)$/i.test(data.type) ){
data.room = data.room_pk;
data.name = data.room_name;
}else{
if( S("#_ROOM_"+data.room_pk).length ){
S("#_ROOM_"+data.room_pk).nodeRemove();
S("#_ROOM_MSG_"+data.room_pk).nodeRemove();
}
break;
}
case "room":
if( S("#_ROOM_-"+_User).length ){
S("#_ROOM_-"+_User).obj.removeAttribute("you");
S("#_ROOM_-"+_User).obj.id = "_ROOM_"+data.room;
S("#_ROOM_MSG_-"+_User).obj.id = "_ROOM_MSG_"+data.room;
if( S(".ROOM_SET[idroom='-"+_User+"']").length ){
S(".ROOM_SET").attr("idroom", data.room);
}
}
if( S("#_ROOM_"+data.room).length ){
S("#_ROOM_"+data.room+" TD").dim[1].innerText = data.name;
if( S(".ROOM_SET").attr("idroom")==data.room ){
S(".ROOM_SET TD").dim[1].innerText = data.name;
}
return;
}
uChatCreateRoom(data);
break;
case "get":
if( S("#_ROOM_MSG_"+data.room).length==0 ){
return;
}
var chat = S(".MSG_CHAT", "#_ROOM_MSG_"+data.room),
type = S("#_ROOM_"+data.room).attr("type"),
tmp = data.msg.split("~"),
t = tmp.length,
div,fecha,n,tmp;
if( _User!=data.user && S(".CHAR_UNREAD_"+data.room).length==0 && (S(".CHAT_SYSTEM").css("visibility")=="hidden" || S(".ROOM_SET").attr("idroom")!=data.room) ){
S(S.replace('<?=$_MSG_NO_LEIDO?>', "{room}", data.room)).nodeEnd(S("#_ROOM_MSG_"+data.room).obj);
chat.length = 0;
}
if( chat.length==0 || (chat.length>0 && S.left(S(chat.dim[chat.length-1]).attr("cdi"),10)!=S.left(data.time,10)) ){
fecha = S.left(data.time, 10);
if( fecha==S.date("d-m-Y") ){
fecha = "Hoy";
}else if( S.d2s(top.eAddDaysToDate(new Date(), -7))<fecha ){
fecha = S.date("l", S.s2d(fecha));
}
S('<div class="ROOM_DATE" cdi="'+fecha+'">'+fecha+'</div>').nodeEnd(S("#_ROOM_MSG_"+data.room).obj);
}
if( data.user==_User ){
div = '<?=$_MSG_MY?>';
if( type=="P" || (chat.length>0 && S(chat.dim[chat.length-1]).attr("user")==data.user) ){
div = '<?=$_MSG_MY_NEXT?>';
}
}else{
div = '<?=$_MSG_YOU?>';
if( type=="P" || (chat.length>0 && S(chat.dim[chat.length-1]).attr("user")==data.user) ){
div = '<?=$_MSG_YOU_NEXT?>';
}
}
if( t==0 ){
}else if( t==3 ){
data.msg = "<a href='"+tmp[1]+"' target=top><i class='ICONWINDOW'>&#"+roomIco[data.msg[0]]+";</i> "+tmp[1]+"</a><br>"+tmp[2];
}else if( t==4 ){
var ext = (roomIco[tmp[0]]==undefined)? roomIco["D"]:roomIco[tmp[0]];
data.msg = "<a onclick='roomVerFile(\""+tmp[1]+"\")'><i class='ICONWINDOW'>&#"+ext+";</i> "+tmp[2]+"</a><br>"+tmp[3];
}else{
}
data.email += "@";
div = S.replace(div, [
["{pk}", data.pk],
["{user}", data.user],
["{cdi}", data.time],
["{name}", data.email.split("@")[0]],
["{email}", data.email.split("@")[1]],
["{text}", data.msg],
["{date}", S.mid(data.time,11,5)]
]);
var o = S(div).nodeEnd(S("#_ROOM_MSG_"+data.room).obj);
S("#_ROOM_MSG_"+data.room).obj.scrollTop = S("#_ROOM_MSG_"+data.room).obj.scrollHeight;
if( S.mid(S("div[class^=ROOM_O", ".ROOM_LIST").obj.id,6,0)!=data.room ){
S(S("#_ROOM_"+data.room)).nodeMoveFirst(S(".ROOM_LIST"));
}
if( S(".ROOM_SET").attr("idRoom")!=data.room || S(".CHAT_SYSTEM").css("visibility")=="hidden" ){
n = S(".Circle", S("#_ROOM_"+data.room)).text()*1+1;
S(".Circle", S("#_ROOM_"+data.room)).css("visibility:").text(n);
if( S(".ROOM_SET").attr("idRoom")==data.room && S(".CHAT_SYSTEM").css("visibility")=="hidden" ){
S(".ROOM_SET .Circle").css("visibility:").text(n);
}else{
roomRecalcNumMsg();
}
}
if( S(".CHAT_SYSTEM").css("visibility")=="hidden" && S("#ICON_CHATROOM").length>0 ){
S("#ICON_CHATROOM").class("+ANIMATION");
roomRecalcNumMsg();
}
if( data.tools.indexOf("N")>-1 ){
S.notification(S.stripTags(data.msg));
}
if( data.tools.indexOf("A")>-1 ){
S.sound();
}
if( data.tools.indexOf("S")>-1 ){
S(o).class("+MSG_STAR");
}
break;
case "put":
break;
case "exe":
if( data.type=="I" ){
if(data.title!=undefined || data.body!=undefined ){
S.sound();
if(data.title==undefined) data.title = "";
if(data.body==undefined) data.body = "";
S.notification(data.title, data.body);
}
S.session.zMessage -= 2;
NotificationWarning(true);
var txt = '<span id="TIPEXIT" style="display:inline-table; visibility:visible; z-index:'+S.session.zMessage+'; position:absolute; cursor:pointer;" class="TIP TIPCENTER TIPARROWMIDDLE">'+data.msg+'</span>',
o = S(txt).nodeEnd("body");
o.obj.onclick = function(ev){
NotificationWarning();
S(S.event(ev)).nodeRemove();
};
S(o).center().modal({close:true, function:function(){
NotificationWarning();
}});
}else if( data.type=="Q" ){
S.session.index = S("#ALERT").length+1;
S.alert({
title:top._Lng[151],
icon:'<img src="g/sys_exit.gif">',
button:"",
click:false,
text:data.msg
});
S("#ALERT").background("#9a9a9a");
if( S.intervalNews ) clearInterval(S.intervalNews);
<?PHP if( $_Development ){?>
S.intervalNews = setInterval(function(){
if( S("#ALERT").length!=S.session.index ){
clearInterval(S.intervalNews);
S._exit();
}
}, 100);
<?PHP } ?>
}else if( data.type=="R" ){
top.document.write(data.msg);
}
break;
default:
}
});
function NotificationWarning(on){
var o = S("link[id='FAVICON']");
if( on ){
if( _NotificationWarning!=null ) return;
o.attr("hrefBak", o.attr("href")).attr("titleBak", document.title).attr("nframe", 0);
_NotificationWarning = setInterval(function(){
var o = S("link[id='FAVICON']"),
n = !(o.attr("nframe")*1)*1;
o.attr("nframe", n).attr("href", "g/notification_"+n+".png");
document.title = n ? S.upper(o.attr("titleBak")) : S.lower(o.attr("titleBak"));
}, 750);
}else if( _NotificationWarning!=null ){
clearInterval(_NotificationWarning);
o.attr("href", o.attr("hrefBak"));
document.title = o.attr("titleBak");
_NotificationWarning = null;
}
}
</SCRIPT>
<STYLE>
.Circle {
font-size: 100%;
background-color:#1B6B8D;
color:#ffffff;
width: 12px;
height: 12px;
box-sizing: initial;
display: inline-block;
cursor:pointer;
border-radius: 50%;
box-sizing: content-box;
padding:5px;
margin:0px auto;
display: inline-flex;
justify-content: center;
align-items: center;
text-align: center;
-webkit-box-shadow: 2px 2px 1px 0px rgba(50, 50, 50, 0.65);
-moz-box-shadow:    2px 2px 1px 0px rgba(50, 50, 50, 0.65);
box-shadow:         2px 2px 1px 0px rgba(50, 50, 50, 0.65);
}
.CHAT_SYSTEM {
visibility:hidden;
width:100%;
height:100%;
display:table;
position:absolute;
left:0px;
top:0px;
z-index:1000;
border: 1px solid #1B6B8D;
background-color:#ffffff;
}
.CHAT_SYSTEM>TABLE>TR>TD {
background-color:#ffffff;
}
.CHAT_SYSTEM I {
color:#1B6B8D;
}
.CHAT_SYSTEM TABLE {
border:0px;
border--spacing:0px;
}
.CHAT_SYSTEM TD {
padding:0px;
}
.ROOM_LIST table {
background-color: transparent;
}
.ROOM_LIST table td {
background-color: transparent;
}
.ROOM_LINE {
border-color:#1B6B8D;
border-style:solid;
}
.ROOM_ON {
width:99%;
height:1px;
display:table;
cursor:pointer;
vertical-align:middle;
--border: 1px solid #ad80ad;
--background-color: #f7d8f7;
background-color: #e5e5e5;
border: 1px solid #c3b6b6;
}
.ROOM_OFF {
width:99%;
height:1px;
display:table;
cursor:pointer;
vertical-align:middle;
border-bottom: 1px solid #c3b6b6;
--background-color: #f8f8f8;
background-color: #ffffff;
}
.ROOM_OFF I {
color: #1B6B8D;
}
.ROOM_TALK {
background-color: #e5e5e5;
}
.ROOM_TALK A {
cursor:pointer;
text-decoration: none;
}
.ROOM_TALK A I {
color:#ed143d;
}
.ROOM_DATE {
width:100%;
display:table;
float: left;
margin-top:10px;
text-align:center;
box-sizing:border-box;
border-radius:10px;
--border: 1px solid #cccccc;
background-color: transparent;;
color:#000000;
font-weight:bold;
}
.CHAR_UNREAD {
width:100%;
display:table;
float: left;
margin-top:10px;
text-align:center;
box-sizing:border-box;
border-radius:10px;
border: 1px solid #235629;
background-color: #58955f;
color:#ffffff;
font-weight:bold;
padding-bottom: 20px;
padding-top: 20px;
}
.ROOM_SET {
padding-right:10px !important;
}
.ROOM_ON I, .ROOM_OFF I, .ROOM_SET I {
color:#1B6B8D;
font-size:30px;
}
.MSG_MY, .MSG_MY_NEXT {
border-collapse:collapse;
width:85%;
height:1px;
display:table;
margin-top:3px;
float:right;
}
.MSG_MY {
margin-top:5px;
margin-right:10px;
}
.MSG_MY_NEXT {
margin-top:3px;
margin-right:10px;
}
.MSG_MY TD, .MSG_MY_NEXT TD {
padding:0px;
}
.MSG_MY DIV, .MSG_MY_NEXT DIV {
width:100%;
display:block;
word-wrap:break-word;
word-break:break-all;
white-space:pre-wrap;
padding:7px;
box-sizing:border-box;
border-radius:10px;
color:#000000;
border: 1px solid #9bb1bd;
background-color: #d8ecf7;
}
.MSG_YOU, .MSG_YOU_NEXT {
border-collapse:collapse;
width:85%;
height:1px;
display:table;
float: left;
}
.MSG_YOU {
margin-top:5px;
margin-left:10px;
}
.MSG_YOU_NEXT {
margin-top:3px;
margin-left:10px;
}
.MSG_YOU TR TD {
cursor:pointer;
}
.MSG_YOU TD, .MSG_YOU_NEXT TD {
padding:0px;
}
.MSG_YOU DIV, .MSG_YOU_NEXT DIV {
width:100%;
display:block;
word-wrap:break-word;
word-break:break-all;
white-space:pre-wrap;
padding:7px;
box-sizing:border-box;
border-radius:10px;
color:#000000;
--border: 1px solid #ad80ad;
--background-color: #f7d8f7;
--background-color: antiquewhite;
--background-color: papayawhip;
background-color: whitesmoke;
border: 1px solid #c3b6b6;
}
.MSG_USER, .MSG_TIME {
color: #000000;
font-weight: bold;
}
.MSG_TIME {
width:1px;
padding-left:5px !important;
vertical-align:bottom;
}
.MSG_STAR DIV {
border-width: 3px;
border-color: #c30505;
color: #c30505;
}
</STYLE>
<TABLE class="CHAT_SYSTEM SHADOW">
<tbody>
<TR><TD class="ROOM_LINE" style="width:25%; vertical-align:top; border-right-width:1px;">
<TABLE style="width:100%; height:100%; display:table">
<thead>
<TR><TH class="ROOM_LINE" style="border-bottom-width:1px;">
<table cellspacing=0px cellpadding=0px style="width:100%"><tr>
<th style="width:100%">Salas
<th><i class="ICONINPUT" id="MenuTabPieICON" onclick="roomAlta(this)" title="Menú">=</i>
</table>
</TH></TR>
</thead>
<tbody><TR><TD style="height:100%; vertical-align:top;">
<div class="ROOM_LIST" onclick="roomSet()" style="width:100%; height:100%; display:block; overflow-x:hidden; overflow-y:auto; border-style:hidden;">
<?PHP
qQuery("select max(last_msg) from gs_chat_room where cdi_close is null");
list($LastMsg) = qRow();
if( $LastMsg=="" ) $LastMsg = "2000-01-01 00:00:00";
qQuery("select cdi_insert, cd_gs_chat_room from gs_chat_msg where cd_gs_chat_msg in (select max(cd_gs_chat_msg) from gs_chat_msg where cdi_insert>'{$LastMsg}' group by cd_gs_chat_room) order by cdi_insert desc");
while($r=qRow()){
qQuery("update gs_chat_room set last_msg='{$r[0]}' where cd_gs_chat_room={$r[1]}");
}
$totalMsgSinLeer = 0;
$_DimRoom = array();
$_DimRoomON = array();
qQuery("select
cd_gs_chat_room, nm_gs_chat_room, image, description, type_room, last_msg,
(select count(*) from gs_chat_msg_user where cd_gs_user=".$_SESSION["_User"]." and cd_gs_chat_room=gs_chat_room.cd_gs_chat_room and cdi_read is null) msg_sin_leer,
(select max(cdi_read) from gs_chat_msg_user where cd_gs_user=".$_SESSION["_User"]." and cd_gs_chat_room=gs_chat_room.cd_gs_chat_room) cdi_read
from gs_chat_room
where cdi_close is null and (type_room='S' or EXISTS (select cd_gs_user from gs_chat_user where cd_gs_user=".$_SESSION["_User"]." and cd_gs_chat_room=gs_chat_room.cd_gs_chat_room and cdi_ini<now() and cdi_end is null))
order by last_msg desc, nm_gs_chat_room"
);
while($r=qArray()){
if( $r["type_room"]=="P" ){
qQuery("select email from gs_user where cd_gs_user in (select cd_gs_user from gs_chat_user where cd_gs_chat_room=".$r["cd_gs_chat_room"]." and cd_gs_user<>".$_SESSION["_User"].")", $p1);
$r["nm_gs_chat_room"] = qRow($p1)[0];
}
$_DimRoom[] = $r["cd_gs_chat_room"];
$_DimRoomON[] = $r["cd_gs_chat_room"];
$iconType = '&#'.(($r["type_room"]=="P")?"113":"241").';';
$sinLeer = $r["msg_sin_leer"];
$css = (($sinLeer==0)? " style='visibility:hidden'":"");
echo str_replace(
array(		  "{room}"	   ,   "{type}"		, "{iconType}",			"{name}"	 , "{css}", "{sinLeer}",   "{cdi}"     , "{you}"),
array($r["cd_gs_chat_room"], $r["type_room"],  $iconType  , $r["nm_gs_chat_room"],  $css  ,  $sinLeer  , $r["cdi_read"],    ""  ),
$_ROOM_
);
$totalMsgSinLeer += $sinLeer;
}
?>
</div>
</TD></TR></tbody>
</TABLE>
</TD><TD style="width:75%">
<TABLE style="width:100%; height:100%; display:table">
<thead>
<TR><TH class="ROOM_LINE" style="text-align:left; border-bottom-width:1px">
<TABLE style="width:100%; height:100%; display:table"><tr>
<td class="ROOM_SET" style="width:100%">
<TABLE><tr>
<td><i class="ICONWINDOW">q</i>
<td>
</TABLE>
<td style="vertical-align:middle; word-wrap:normal; word-break:normal; white-space:nowrap;">
<TABLE><tr>
<td><i class="ICONWINDOW" id="ICON_ROOMMAXI" onclick="roomMaximize()" title="Maximizar Chat" style="display:none">3</i>
<td><i class="ICONWINDOW" id="ICON_ROOMMINI" onclick="roomMinimize()" title="Minimizar Chat">2</i>
<td><i class="ICONWINDOW" onclick="eChatExit()" title="Ocultar Chat">5</i>
</table>
</table>
</TH></TR>
</thead>
<tbody>
<TR><TD class="ROOM_TALK" style="vertical-align:top;">
<?PHP
$semanaPasada = date("Y-m-d H:i:s", mktime(0,0,0, date("m"), date("d")-7, date("Y")));
$diasSemana = explode(",", "Domingo,Lunes,Martes,Miércoles,Jueves,Viernes,Sábado");
$ultimaRoom = null;
$numMsg = 0;
$userMsg = null;
$lastDay = null;
$msgNoLeido = null;
$hoy = date("d-m-Y");
qQuery("select
D.cd_gs_user user_my, D.cdi_read, U.email, M.cd_gs_user user_you, M.msg_type, M.message, M.cdi_insert, M.cd_gs_chat_msg, M.cd_gs_chat_room, M.tools, R.type_room, D.cdi_read
from gs_chat_msg_user D, gs_chat_msg M, gs_user U, gs_chat_room R
where M.cd_gs_chat_msg=D.cd_gs_chat_msg and	U.cd_gs_user=M.cd_gs_user and R.cd_gs_chat_room=M.cd_gs_chat_room and
D.cd_gs_user=".$_SESSION["_User"]."
order by cd_gs_chat_room,cdi_send"
);
while($r=qArray()){
if( !in_array($r["cd_gs_chat_room"], $_DimRoomON) ) continue;
$numMsg++;
if( $ultimaRoom!=$r["cd_gs_chat_room"] ){
$userMsg = null;
$msgNoLeido = null;
if( $ultimaRoom!=null ) echo '</div>';
$ultimaRoom = $r["cd_gs_chat_room"];
echo '<div id="_ROOM_MSG_'.$ultimaRoom.'" style="width:100%; height:100%; overflow-x:hidden; overflow-y:auto; border-style:hidden;">';
$ind = array_search($ultimaRoom, $_DimRoom);
if( $ind!==false ){
unset($_DimRoom[$ind]);
}
}
if( $lastDay!=substr($r["cdi_insert"],0,10) ){
$dia = eYmd2Dmy(substr($r["cdi_insert"],0,10));
if( $semanaPasada<$r["cdi_insert"] ){
$d = explode("-", substr($r["cdi_insert"],0,10));
$dia = $diasSemana[date("w", mktime(0,0,0, $d[1],$d[2],$d[0]))];
if( $hoy==$dia ) $dia = "Hoy";
}
echo '<div class="ROOM_DATE" cdi="'.substr($r["cdi_insert"],0,10).'">'.$dia.'</div>';
$userMsg = null;
}
if( $msgNoLeido==null && $r["cdi_read"]=="" ){
$msgNoLeido = true;
echo str_replace("{room}", $r["cd_gs_chat_room"], $_MSG_NO_LEIDO);
}
list($user, $email) = explode("@", $r["email"]."@");
$hora = substr($r["cdi_insert"],11,5);
if( $r["msg_type"]=="A" ){
list($ext, $ancla, $men) = explode("~", $r["message"]);
$ext = ($DimExt[$ext]=="") ? $DimExt["D"] : $DimExt[$ext];
$r["message"] = "<a href='{$ancla}' target=top><i class='ICONWINDOW'>&#{$ext};</i> {$ancla}</a><br>{$men}";
}
if( $r["msg_type"]=="F" ){
list($ext, $pk, $file, $men) = explode("~", $r["message"]);
$ext = ($DimExt[$ext]!="") ? $DimExt[$ext] : $DimExt["D"];
$r["message"] = "<a onclick='roomVerFile(\"{$pk}\")'><i class='ICONWINDOW'>&#{$ext};</i> {$file}</a><br>{$men}";
}
$star = (preg_match("/S/", $r["tools"]))? " MSG_STAR":"";
echo str_replace(
array(		"{pk}"		  ,   "{user}"    ,   "{cdi}"       , "{name}", "{email}",    "{text}"  ,"{date}", "{star}"),
array($r["cd_gs_chat_msg"], $r["user_you"], $r["cdi_insert"],  $user  ,  $email  , $r["message"], $hora  ,  $star  ),
($r["user_my"]==$r["user_you"]) ? (($userMsg!=$r["user_you"] && $r["type_room"]!="P")? $_MSG_MY:$_MSG_MY_NEXT) : (($userMsg!=$r["user_you"] && $r["type_room"]!="P")? $_MSG_YOU:$_MSG_YOU_NEXT)
);
$userMsg = $r["user_you"];
$lastDay = substr($r["cdi_insert"],0,10);
}
if( $numMsg>0 ) echo '</div>';
for($n=0; $n<count($_DimRoom); $n++){
echo '<div id="_ROOM_MSG_'.$_DimRoom[$n].'" style="width:100%; height:100%; display:none; overflow-x:hidden; overflow-y:auto; border-style:hidden;"></div>';
}
?>
</TD></TR>
</tbody>
<tfoot>
<TR><TD class="ROOM_LINE" style="text-align:top; border-top-width:1px;">
<table cellspacing=0px cellpadding=0px style="width:100%">
<tr id="FIELDS_CHATFILE" style="display:none"><td>
<table cellspacing=0px cellpadding=0px style="width:100%"><tr>
<td style="width:100%">
<input placeholder="Selecciona fichero" name="room__file" type="text" class="READONLY" readonly="true" value="" newvalue="" oldvalue="" eupload="0" efilename="" size="60" maxlength="60" onfocus="document.body.focus()" eext="*" ebyts="50000000" eprefix="" esizefile="" onclick="S(':room__file').file()" pp="1" ecopy="" title="Examinar..." style="cursor:pointer;width:100%;">
<td style="width:1px"><i class="ICONINPUT" oi="1" onclick="S(':room__file').file()" oncontextmenu="S.preview('room__file',window)" title="Examinar..." style="padding-left:15px;">w</i>
<input placeholder="Fichero a enviar" name="_FILE_room__file" type="file" estatus="E" accept="*" eonchange style="display:none">
</table>
</td></tr>
<tr id="FIELD_CHATANCLA" style="display:none"><td>
<input placeholder="Pega enlace" name="room__enlace" type="text" class="EDITABLE" value="" size="1024" maxlength="1024" title="Enlace" style="width:90%">
<tr id="EMOTICONOS_LIST" style="display:none">
<td id="EMOTICONOS">
<table cellspacing=0px cellpadding=0px onclick='Emoticono()' style='cursor:pointer'><tr>
<td pk=128578>&#128578;
<td pk=128577>&#128577;
<td pk=128512>&#128512;
<td pk=128557>&#128557;
<td pk=128561>&#128561;
<td pk=128562>&#128562;
<td pk=128564>&#128564;
<td pk=128565>&#128565;
<td pk=128545>&#128545;
<td pk=128531>&#128531;
<td pk=129319>&#129319;
<td pk=128520>&#128520;
<td pk=128128>&#128128;
<td pk=128077>&#128077;
<td pk=128078>&#128078;
<td pk=128076>&#128076;
<td pk=129309>&#129309;
<td pk=129310>&#129310;
<td pk=9997>&#9997;
<td pk=11088>&#11088;
<td pk=128161>&#128161;
<td pk=128066>&#128066;
<td pk=127891>&#127891;
<td pk=9940>&#9940;
<td pk=128198>&#128198;
<td pk=8986>&#8986;
<td pk=9749>&#9749;
<td pk=127866>&#127866;
<td pk=129379>&#129379;
</tr></table>
<td>
<tr><td>
<table cellspacing=0px cellpadding=0px style="width:100%"><tr>
<td style="width:1px; vertical-align:middle; padding-left:5px; padding-right:5px; cursor:pointer;" onclick="roomFile()"><i id="ICON_CHATFILE" class="ICONWINDOW" title="Enviar archivo">&#240;</i>
<td style="width:1px; vertical-align:middle; padding-left:5px; padding-right:5px; cursor:pointer;" onclick="roomEnlace()"><i id="ICON_CHATANCLA" class="ICONWINDOW" title="Enviar enlace">&#347;</i>
<td style="width:1px; vertical-align:middle; padding-left:5px; padding-right:5px; cursor:pointer;" onclick="roomEmoti()"><i id="ICON_CHATEMOTI" class="ICONWINDOW" title="Emoticonos">&#343;</i>
<td style="width:1px; vertical-align:middle; padding-left:5px; padding-right:5px; cursor:pointer;" onclick='roomTools(0)'><i id="ICON_CHATTOOLS" class="ICONWINDOW" title="Configurar mensaje">&#260;</i>
<td style="width:100%"><textarea placeholder="Escribir mensaje" name="room_msg" style="width:100%; height:30px"></textarea>
<td style="width:1px; vertical-align:middle; cursor:pointer;" onclick="roomMessage()"><i id="ICON_CHATSUBMIT" class="ICONWINDOW" disabled=true title="Enviar mensaje" style="padding-left:18px;">&#62;</i>
</table>
</td></tr>
</table>
</TD></TR>
</tfoot>
</TABLE>
</TD></TR></tbody>
</TABLE>
<TABLE id="CHAT_TOOLS" class="col_0c col_2l TOOLBAR SHADOW" cellspacing=0px cellpadding=0px style="width:1px;display:none;position:absolute;">
<tr><th colspan=3 c-lass="TITULO">
<TABLE class="col_0c" cellspacing=0px cellpadding=0px style="width:100%"><tr class="TITULO">
<th style="width:100%">Configurar mensaje
<th><i class="ICONWINDOW" onclick="roomTools(-1)" title="Cerrar">5</i>
</table>
</th>
<tr><td><i class="ICONWINDOW" style="cursor:pointer;">&#360;</i><td>Notificación<td>
<input name="CHAT_NOTI" id="checkbox" type="checkbox" diferente="" checkbox="1" conimagen="1" size="1" value="" onchange="this.value=(this.checked?&quot;S&quot;:&quot;&quot;)" class="EDITABLE" ewe="1" onfocus="S.key(&quot;N&quot;,1,0)">
<tr><td><i class="ICONWINDOW" style="cursor:pointer;">&#214;</i><td>Alerta<td>
<input name="CHAT_ALERT" id="checkbox" type="checkbox" diferente="" checkbox="1" conimagen="1" size="1" value="" onchange="this.value=(this.checked?&quot;S&quot;:&quot;&quot;)" class="EDITABLE" ewe="1" onfocus="S.key(&quot;N&quot;,1,0)">
<tr><td><i class="ICONWINDOW" style="cursor:pointer;">Z</i><td>Mensaje&nbsp;destacado<td>
<input name="CHAT_STAR" id="checkbox" type="checkbox" diferente="" checkbox="1" conimagen="1" size="1" value="" onchange="this.value=(this.checked?&quot;S&quot;:&quot;&quot;)" class="EDITABLE" ewe="1" onfocus="S.key(&quot;N&quot;,1,0)">
<tr><td><i class="ICONWINDOW" style="cursor:pointer;">&#199;</i><td>Tipo mensaje<td>&nbsp;
<input name="CHAT_TYPE" i_ss="1" value="" style="display:none" alto="1" size="2" td="0" ebak="02">
<span class="SELECTINPUT" onclick="S.key(&quot;S&quot;)"><input name="_INPUT_CHAT_TYPE" class="READONLY" readonly="true" ind="-1" tmpind="-1" pp="1" onfocus="S.key('S')" class="EDITABLE" ewe="1" style="width:90px;" type="TEXT" value="" ebak="" ehelpno="1"></span>
<div class="SELECT EDITABLE SCROLLBAR" style="width:90px; display: none;">
<table id="CHAT_TYPE_TABLE" cols="2">
<tbody>
<tr v="L" r="3"><td>L</td><td>Lúdico</td></tr>
<tr v="R" r="3"><td>R</td><td>Reunión</td></tr>
<tr v="T" r="2"><td>T</td><td>Trabajo</td></tr>
</tbody>
</table>
</div>
<tr><td><i class="ICONWINDOW" style="cursor:pointer;">,</i><td>Fecha<td>
<input name="CHAT_DATE" value="" class="EDITABLE FondoSelect" ewe="1" leng="10" maxlength="10" size="10" onfocus="S.key('F4',10,0)" tc="F4" style="width:71px;"><i class="ICONINPUT" onclick="S(&quot;:CHAT_DATE&quot;).calendar()" oncontextmenu="S(&quot;:CHAT_DATE&quot;).calendar(&quot;t&quot;)" id="TOOLSDate">,</i>
<tr><td><i class="ICONWINDOW" style="cursor:pointer;">&#242;</i><td>Hora<td>
<input name="CHAT_TIME" value="" class="EDITABLE FondoSelect" ewe="1" leng="5" maxlength="5" size="5" onfocus="S.key('H5',5,0)" tc="H5" style="width:35px;" ehelpno="1">
<tr><td colspan=3 style="zoom:90%">
<center>
<?=eAddButton("U", "Aceptar", "roomTools(1)");?>
</center>
</td>
</TABLE>
<SCRIPT type="text/javascript">
roomSet(S(".ROOM_OFF").obj);
<?=(($_Development)? 'S("#ICON_CHATSUBMIT").css("padding-right:30px;");' : "")?>
<?PHP if( $totalMsgSinLeer>0 ){ ?>
if( S(".CHAT_SYSTEM").css("visibility")=="hidden" && S("#ICON_CHATROOM").length>0 ){
S("#ICON_CHATROOM").class("+ANIMATION");
}
S("#ICON_ROOMNOREAD").text(<?=$totalMsgSinLeer?>);
<?PHP } ?>
</script>
<?PHP
?>
