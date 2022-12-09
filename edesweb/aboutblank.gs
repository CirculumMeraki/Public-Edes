<?PHP
header("Content-Type: text/html; charset=ISO-8859-1");
eHTML();
?>
</HEAD>
<BODY>
<?PHP  if( isset($_GET['FUNCTION']) ){ ?>
<SCRIPT type="text/javascript">
top.<?=$_GET['FUNCTION']?>(window);
</SCRIPT>
<?PHP  } ?>
</BODY>
</HTML>
