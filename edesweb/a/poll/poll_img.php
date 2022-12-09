<?PHP
eInclude($_Sql);
$IMG = $_GET["IMG"]*1;
qQuery("select * from gs_poll_img where cd_gs_poll_img=".$IMG);
$r=qArray();
?>
<script>
top.eCallSrv(window,"edes.php?D:/http/poll/<?=$IMG?>.<?=$r['extension']?>");
</script>
