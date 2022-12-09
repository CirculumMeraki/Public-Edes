<?=eHTML('$a/d/no_option.inc','','Opciones del sistema')?>
<LINK REL='stylesheet' HREF='<?=$_SESSION['_PathCSS']?>/ficha.css' TYPE='text/css'>
<script type="text/javascript">
if( window.name=='IWORK' ){
top.eAutoMenu(0);
top.eLoading(false,window);
}else{
top.eSWIResize( window, -100, 0 );
}
</SCRIPT>
</HEAD><BODY onhelp='return false' oncontextmenu='return false' onselectstart='return false' ondragstart='return false'>
<table id="RESPUESTA" style="display:block;background-color:transparent" WIDTH="100%" HEIGHT="100%" cellspacing=0px cellpadding=0px>
<tr><td align="center">
<table id=MensaError cellspacing=0px cellpadding=0px><tr><td nowrap>
OPCION NO DISPONIBLE PARA <?= strtoupper($GLOBALS['_Sql']); ?>
</td></tr>
</table>
</td></tr>
</table>
</BODY></HTML>
<?PHP  exit; ?>
