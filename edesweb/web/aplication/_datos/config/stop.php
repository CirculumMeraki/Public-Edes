<!DOCTYPE HTML>
<HTML><HEAD>
<META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<META gsScript='/_datos/config/stop.php' gsOp=''>
<TITLE>[COMPANY]</TITLE>
<LINK REL='stylesheet' HREF='<?=$_SESSION['_PathCSS']?>/ficha.css' TYPE='text/css'>
</HEAD>
<BODY scroll=no style="margin:0px" onload="gsShow()" onhelp="return false;" oncontextmenu="return false;" onselectstart="return false;">
<IMG id=CERRAR SRC="g/cerrar_1.gif" TITLE="Cerrar" onclick="gsClose()" style="position:absolute;display:none;top:7;left:expression(document.body.clientWidth-23);">
<SCRIPT type="text/javascript">
if( window.name=='Pag' ) top.eLoading(false);
function gsShow(){
var el = document.all.CngRESPUESTA;
window.external._ErrorEnClave( parseInt(el.offsetWidth)+50, parseInt(el.offsetHeight)+50 );
}
function gsClose(){
top.Terminar();
}
if( window.name=='LOGIN' ) document.all.CERRAR.style.display = 'block';
</SCRIPT>
<table id="RESPUESTA" style="display:block;background-color:transparent;border:1 solid red;" WIDTH="100%" HEIGHT="100%" cellspacing=0 cellpadding=0><tr><td align="center">
<table id=CngRESPUESTA cellspacing=0 cellpadding=0 onclick='gsClose()' style='cursor:hand; PADDING: 0;'>
<tr><td nowrap style='padding: 15 30 0 30;'>INTRANET PARADA PARA CONSULTA</td></tr>
<?PHP
$Dim = file(eScript('/_tmp/err/stop.access'));
if( trim($Dim[0])!='' ) echo "<tr><td nowrap style='padding: 10 30  0 30'>{$Dim[0]}</td></tr>";
if( trim($Dim[1])!='' ) echo "<tr><td nowrap style='padding: 10 30 15 30'>SE REANUDARA A LAS {$Dim[1]} HORAS</td></tr>";
?>
</table></td></tr></table>
</BODY></HTML>
