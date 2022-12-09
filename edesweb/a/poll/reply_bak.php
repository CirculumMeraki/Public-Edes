<?PHP
if( $_SESSION["_User"]!=$_POST["cd_gs_reply_user"] ){
eEnd();
}
if( !function_exists("qQuery") ){
eInclude($_Sql);
}
qQuery("select * from gs_question where cd_gs_poll=".($_POST["cd_gs_poll"]*1)." and cd_gs_question=".($_POST["cd_gs_question"]*1));
$r = qArray();
if( $_POST["cd_gs_question"]!=$r["cd_gs_question"] ){
eEnd();
}
if( qCount("gs_reply", "cd_gs_poll='{$_POST['cd_gs_poll']}' and cd_gs_campaign='{$_POST['cd_gs_campaign']}' and cd_gs_reply_user='{$_POST['cd_gs_reply_user']}' and cd_gs_question='{$_POST['cd_gs_question']}'") ){
qQuery("delete from gs_reply where cd_gs_poll='{$_POST['cd_gs_poll']}' and cd_gs_campaign='{$_POST['cd_gs_campaign']}' and cd_gs_reply_user='{$_POST['cd_gs_reply_user']}' and cd_gs_question='{$_POST['cd_gs_question']}'");
}
eEnd();
?>
