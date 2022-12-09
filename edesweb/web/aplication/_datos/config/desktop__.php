<!DOCTYPE HTML>
<HTML XMLNS:v="urn:schemas-microsoft-com:vml">
<HEAD>
<META HTTP-EQUIV="Window-target" CONTENT="_top">
<TITLE>[EMPRESA]</TITLE>
<META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<style>
#H {
height:6;
background-image:url(g/h.jpg);
background-repeat:repeat-x;
font-size:1;
}
#H2 {
height:6;
background-image:url(g/h.jpg);
background-repeat:repeat-x;
font-size:1;
background-color: red;
}
#V {
width:6;
background-image:url(g/v.jpg);
background-repeat:repeat-y;
}
.CENTRO {
background-color: #EBECEE;
background-image:url(g/fondo.jpg);
background-repeat:repeat-x;
background-position:bottom;
}
MARQUEE {
font-size:16;
color:#CC0001;
font-weight:bold;
margin-left:10;
margin-right:10;
}
.uBUSCAR {
FONT-SIZE: 10px;
COLOR: #000000;
FONT-FAMILY: verdana, arial, helvetica, sans-serif;
}
.uBUSCAR TH{
FONT-SIZE: 12px;
}
.uBUSCAR INPUT {
width: 108;
BORDER-RIGHT: #000000 1px solid;
PADDING-RIGHT: 2px;
BORDER-TOP: #000000 1px solid;
PADDING-LEFT: 2px;
FONT-SIZE: 100%;
PADDING-BOTTOM: 0px;
MARGIN: 0px 0px 0px 5px;
BORDER-LEFT: #000000 1px solid;
PADDING-TOP: 0px;
BORDER-BOTTOM: #000000 1px solid;
FONT-FAMILY: verdana, arial, helvetica, sans-serif;
}
IMG {
cursor:default;
}
</style>
<LINK REL="stylesheet" HREF="<?=$_SESSION['_PathCSS']?>/main_select.css">
<SCRIPT SRC='edes.php?R:$main_select.js&j=1'></SCRIPT>
</HEAD>
<BODY style='margin:0' scroll=no onhelp='return false' onselectstart='return false'>
<TABLE border=0 width=100% height=100% cellpadding=0 cellspacing=0 style='background-color:#FFFFFF'>
<TR id=H><td id=V rowspan=7></td><TD></TD><td id=V rowspan=7></td><TD></TD><td id=V rowspan=7></td></TR>
<TR height=90>
<TD>
<TABLE border=0 width=100% height=100% cellpadding=0 cellspacing=0 style='curspr:default'>
<TR>
<TD width=1><img src=g/logo.jpg onclick='Pag.location.replace("edes.php?E:/http/main.htm")'></TD>
<TD id=V></TD>
<TD style='background:#D60000' valign=middle><img src=g/larednor.jpg style='cursor:default'></TD>
<TD style='background:#D60000; padding-right:5; padding-bottom:5' valign=bottom align=right><img src=g/aenor.jpg height=50 style='cursor:default'>&nbsp;&nbsp;<img src=g/iqnet.jpg height=50 style='cursor:default'></TD>
</TR>
</TABLE>
</TD>
<TD width=200 align=center valign=middle>
<SCRIPT type="text/javascript">
function uObras(){
if( eTrim(document.all.SM0.cells[4].innerText)=='' ) return eClearEvent();
alert('Nueva Aplicación');
eRun('');
eClearEvent();
eMinimize();
}
function uEditMainHTM(){
eSWOpen( window, 'edes.php?iE:main.htm&T=H&D=P&TRACE=-1', 'Editor HTML: Página de Inicio', true, 0 );
}
function uEjecutar(){
var xNombre = eTrim(document.all.nombre.value);
var xCargo = eTrim(document.all.cargo.value);
var xObra = eTrim(document.all.obra.value);
if( xNombre!='' ) Pag.document.location.href = 'edes.php?FcR:ver_empleado.edf&_SEEK&nm_persona="*'+xNombre+'*"';
if( xCargo!='' ) Pag.document.location.href = 'edes.php?FcR:ver_empleado.edf&_SEEK&cd_cargo="'+xCargo+'"';
if( xObra!='' ) Pag.document.location.href = 'edes.php?FcR:ver_empleado.edf&_SEEK&obra="*'+xObra+'*"';
document.all.nombre.value = '';
document.all.cargo.value = ''; document.all._INPUT_cargo.value = '';
document.all.obra.value = '';
}
function uKeyPress(){
var iCode = event.keyCode;
if( (event.altKey) || (event.ctrlKey)|| (event.shiftKey) ) return eClearEvent()
if( (iCode == 8) || (iCode == 9) || (iCode == 37) || (iCode == 39) || (iCode == 46) ) return eClearEvent()
if( iCode == 13 ){
uEjecutar();
event.returnValue = true;
return true;
}
}
function AnulaKey2(men){
if( event.srcElement.className=='uINPUT' ) return true;
return AnulaKey();
}
</SCRIPT>
<TABLE class=uBUSCAR border=0 cellspacing=0 cellpadding=0 width=1 style='cursor:default'>
<TR><TH colspan=2 align=left>Búsqueda de empleados</TH></TR>
<TR><TD>Nombre</TD><TD><INPUT class=uINPUT TYPE="text" NAME="nombre" size=50 onKeyPress="uKeyPress();" onkeydown="return true" on_focusout='uEjecutar()'></TD></TR>
<TR><TD>Cargo</TD><TD>
<?PHP
sql_Query("SELECT cd_cargo, nm_cargo FROM cargo order by nm_cargo");
eAddSelect2( 'cargo', 35, 108, '', '' );
?>
</TD></TR>
<TR><TD>Obra</TD><TD><INPUT class=uINPUT TYPE="text" NAME="obra" size=50 onKeyPress="uKeyPress()" onkeydown="return true" on_focusout='uEjecutar()'><img src=g/aa_dch.jpg onclick='uEjecutar()'></TD></TR>
</TABLE>
</TD>
</TR>
<TR id=H><TD colspan=4></TD></TR>
<TR>
<TD class=CENTRO>
<?PHP
include('../../edesweb/main_free.gs');
?>
<SCRIPT type="text/javascript">
Pag.location.replace('main.htm');
</SCRIPT>
</TD>
<TD width=200>
<SCRIPT type="text/javascript">
var _NoticiaNPag = 1;
var _NoticiaIndice = new Array();
</SCRIPT>
<IFRAME name=NOTICIAS id=NOTICIAS eNORESIZE=true src='edes.php?E:noticias.php' width='100%' height='100%' FRAMEBORDER=0 SCROLLING=no style='position:absolute;'></IFRAME>
</TD>
</TR>
<TR id=H><TD colspan=4></TD></TR>
<TR height=100>
<TD>
<table border=0 style='width:100%;height:100%;' cellpadding=0 cellspacing=0>
<tr>
<td width=1><img src=g/aviso_actual.jpg style='curspr:default' height=130></td>
<td>
<table border=0 style='width:100%;height:100%;' cellpadding=0 cellspacing=0>
<tr style='height:50%'><td valign=middle>
<?PHP
qQuery('select marq_velocidad, marq_espacios from config;');
$row = qArray();
?>
<MARQUEE loop=3 CD='' id='Teletipo' scrolldelay=<?=$row['marq_velocidad']?> onfinish='NewTeletipo()' onmouseover="stop()" onmouseout="start()" direction="left" scrollamount="4" style='cursor:hand' onclick='VerTeletipo(this.CD)'></MARQUEE>
</td></tr>
<tr id=H><td></td></tr>
<tr style='height:50%'><td>
<IFRAME name=AVISOACTUAL id=AVISOACTUAL eNORESIZE=true src='edes.php?E:avisos.php' width='100%' height='100%' FRAMEBORDER=0 SCROLLING=no style=''></IFRAME>
</td></tr>
</table>
</td>
<td id=V></td>
<?PHP
qQuery('select nm_docu_foto from docu_foto;');
$row = qRow();
?>
<td width=1><img src='g/foto_dia.jpg?<?=time()?>' title='<?=$row[0]?>' width=175 height=130 style='cursor:default'></td>
</tr>
</table>
</TD>
<TD width=200>
<img src=g/rincon_del_empleado.jpg USEMAP="#mapa" st_yle='cursor:default' border=0>
<MAP NAME="mapa">
<area shape="RECT" coords="0,24,200, 61" onclick='Pag.location.replace("edes.php?Fa:portal/rincon/actividad.edf")' style='cursor:hand'>
<area shape="RECT" coords="0,62,200, 88" onclick='Pag.location.replace("edes.php?Fa:portal/rincon/sugerencia.edf")' style='cursor:hand'>
<area shape="RECT" coords="0,89,200,130" onclick='Pag.location.replace("edes.php?Fa:portal/noticias/noticias_sector.edf")' style='cursor:hand'>
</MAP>
</TD>
</TR>
<TR id=H><TD colspan=4></TD></TR>
<TR height=15>
<TD colspan=5 align=center style='font-size:9; font-weight:bold; cursor:default;'>TECNOR S.A.</TD>
</TR>
</TABLE>
<div style='width:1; height:50; position:absolute; top:9; left:expression(_Width-25)'>
<img onclick=eMinimize() title="Minimizar" src="g/mini_0.gif" style='margin-bottom:1'>
<img onclick=eClose() title="Cerrar" Mensaje="Confirmar la opción de CERRAR" src="g/cerrar_0.gif"  style='margin-bottom:1'>
<img onclick= 'eCallSrv( window, "edes.php?D:/_datos/config/key_help.pdf&WIDTH=100%&HEIGHT=100%;LEFT=-1;TOP=-1" )'src="g/help.gif" title="Ayuda general">
</div>
<SCRIPT type="text/javascript">
window.AVISOACTUAL.frameElement.WOPENER = window;
var _nTeletipo = 0;
var _DimTeletipo = new Array();
<?PHP
eInclude('mysql');
qQuery( 'select nm_noticias_sector,cd_noticias_sector from noticias_sector order by cd_noticias_sector desc limit 10' );
$n=0;
while( $row=qRow() ){
$row[0] = trim($row[0]);
$row[0] = str_replace(chr(10),' ',$row[0]);
$row[0] = str_replace(chr(13),'',$row[0]);
echo '_DimTeletipo['.$n++.']=new Array( "'.$row[1].'", "'.$row[0].'");';
}
?>
function NewTeletipo(){
if( _nTeletipo >= _DimTeletipo.length ) return;
Teletipo.innerHTML = _DimTeletipo[_nTeletipo][1];
Teletipo.CD = _DimTeletipo[_nTeletipo][0];
Teletipo.start();
_nTeletipo++;
if( _nTeletipo >= _DimTeletipo.length ) _nTeletipo = 0;
}
function VerTeletipo( Id ){
top.eSWOpen( window, 'edes.php?FcR:portal/noticias/noticias_sector.edf&_CLOSE_=2&_SEEK&cd_noticias_sector='+Id, 'ACTUALIDAD' );
}
document.all.SM0.cells[4].style.color = '#D60000';
document.all.SM0.cells[4].onclick = uObras;
</SCRIPT>
</BODY>
</HTML>
<?PHP
function eAddSelect2( $oCampo, $oCampoLen, $oCampoPx, $Valor, $OnChange ){
echo "<INPUT NAME='{$oCampo}' VALUE=\"{$Valor}\" style='display:none' ALTO=1>";
if( $OnChange!='' ){
$$OnChange = str_replace( "'", '"', $$OnChange );
$OnChange = " onchange='{$OnChange}'";
}
echo "<INPUT NAME='_INPUT_{$oCampo}' IND=-1 TMPIND=-1{$OnChange}";
echo " onmousewheel='_SelSlider()' onfocusin='_SelMemValue(this)' onfocusout='_SelPutValue(this)' onkeypress='_SelNewChar(this)' onkeydown='_SelDelChar(this)' onclick='_SelShow(this)'";
echo " style='background-image:url(g/sel.gif); background-position-x:100%; background-position-y:100%; background-repeat:no-repeat; cursor:hand;'";
if( $oCampoPx > 0 ) echo " style='width:{$oCampoPx};'";
echo " TYPE='TEXT' SIZE={$oCampoLen} MAXLENGTH={$oCampoLen} VALUE=''>";
echo "<DIV onclick='_SelClick(this)' onselectstart='return false;' onmouseleave='this.style.display=\"none\"' id=Select class=SelectOVER>";
echo "<TABLE INIT=0 id='{$oCampo}_TABLE' width=1 onmouseover='_SelCursor(true)' onmouseout='_SelCursor(false)' border=0 cellspacing=0 cellpadding=2 cols=2>";
echo '<COL style="display:none"><COL>';
echo '<TR><TD><TD>&nbsp;';
$InnerText = '';
while( $row=sql_Array() ){
echo '<TR><TD>'.trim($row[0]).'<TD>'.trim($row[1]);
if( $Valor == trim($row[0]) ) $InnerText = trim($row[1]);
}
echo '</TABLE></DIV>';
if( $InnerText!='' ) echo "\n<script>document.all.{$oCampo}.value=".'"'.$Valor.'";'."document.all._INPUT_{$oCampo}.value=".'"'.$InnerText.'";</script>';
}
?>
