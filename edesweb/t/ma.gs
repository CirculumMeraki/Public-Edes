<?PHP
if( $_SESSION["_eDes_"]=="" ){
$_SESSION["_eDes_"] = md5(time());
?>
<!doctype html>
<html lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="Generator" content="gsEdit">
<meta name="Author" content="eDes">
<meta name="Keywords" content="eDes">
<meta name="Description" content="gsCreate">
<META HTTP-EQUIV='imagetoolbar' CONTENT='no'>
<style>
body, html {
height:100%;
width:100%;
}
</style>
<title>gsCreate</title>
</head>
<body>
<table width="100%" height="100%" cellpadding=0px cellspacing=0px border=0px><tr><td valign="middle" align="center">
<form action='edes.php?gsmain' method="POST" autocomplete="false">
<TABLE id="RECIPIENTE" border=0px cellspacing=0px cellpadding=0px>
<TR><TD align="left" valign="top">
<TABLE id="MarginForm" border=0px cellspacing=0px cellpadding=0px>
<TR>
<TD id="LabelTitle" colspan=2>gsMain</TD>
</TR>
<TR>
<TD id="LabelLogin">Login</TD>
<TD><INPUT TYPE="text" NAME="Login" value="<?=$_COOKIE['gsmain_EMAIL']?>" id="Login" autocomplete="false" autofocus></TD>
</TR>
<TR id="InputSpacing" colspan=2><TD></TD></TR>
<TR>
<TD id="LabelPassword">Password</TD>
<TD><INPUT TYPE="password" NAME="Pass" value="<?=$_COOKIE['gsmain_PASSWORD']?>" id="Password" autocomplete="false"></TD>
</TR>
<TR><TD><TD>
<button onclick="submit()">Entrar</button>
</TD></TR>
</TABLE>
</TD></TR>
<TR><TD>
<INPUT type="text" name="_eDes_" value="<?=$_SESSION["_eDes_"]?>" style="display:none">
</TD></TR>
</TABLE>
</form>
</td></tr></table>
<script type="text/javascript">
var tmp = document.cookie.split(';'), i, dato;
for(i=0; i<tmp.length; i++){
dato = tmp[i].split("=");
if( dato[0]=="eDes_gsmain_EMAIL" ) document.forms[0].elements[0].value = dato[1];
if( dato[0]=="eDes_gsmain_PASSWORD" ) document.forms[0].elements[1].value = dato[1];
}
</script>
</body>
</html>
<?PHP
exit;
}
if( $_SESSION['_LoginUser']=="" ){
if( $_POST["_eDes_"]<>$_SESSION["_eDes_"] ){
die("error");
}
$Pass = strtoupper(md5($_POST["Pass"]));
$_SESSION['_PSDV'] = $Pass;
$_SESSION['_LoginUser'] = $_POST["Login"];
$_gsACCESO = array();
$_Web_ = $_SESSION['_Web_'];
}
$_DirG = 'g/e';
if( $_gsACCESO['TIPO']=="" ){
include_once( $Dir_.'t/lp.gs' );
$_SESSION['_PSDV'] = strtoupper(md5($_POST["Pass"]));
$_SESSION["gsACCESO"] = $_gsACCESO;
$_SESSION["_WEB_"] = true;
$_SESSION['_Node'] = 1;
$_SESSION['_D_'] = '~';
$_SESSION['_sesion_'] = session_id();
$_SESSION['_eDes_'] = 10;
$_SESSION['_gsNomUser'] = $GLOBALS['_gsNomUser'];
}else{
$_gsACCESO = $_SESSION["gsACCESO"];
$GLOBALS['_gsNomUser'] = $_SESSION['_gsNomUser'];
}
$_IniSg = microtime();
if( $_gsACCESO['TIPO']=='~' ) $_SESSION['_D_'] = '~';
if( $_gsACCESO['ACCESO'] < 1 ){
die('Error:89b');
}
if( $_gsACCESO['Create'] < 1 ){
die('Error:90b');
}
$_Web_ = $_SESSION['_Web_'];
if( basename(__FILE__)!='ma.gs' ) exit;
?>
<!doctype html>
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>gsMain - Entorno de Desarrollo</title>
<style>
body, html {
height:100%;
width:100%;
}
</style>
<SCRIPT type="text/javascript">
document.cookie = "eDes_gsmain_EMAIL=<?=$_POST["Login"]?>;";
document.cookie = "eDes_gsmain_PASSWORD=<?=$_POST["Pass"]?>;";
document.cookie = "expires=<?=gmdate("D, d M Y H:i:s T",mktime(23,59,59, date("n")+3))?>";
document.cookie = "path=/;";
</SCRIPT>
<style type="text/css">
body {
font-family: Arial;
font-size: 12px;
color: #000099;
background: #F5F5F5;
}
TABLE {
background-color: #000099;
font-size: 12px;
cursor: default;
}
TH {
color: #000099;
background-color: #D3DCE3;
font-size: 12px;
cursor: default;
height: 1px ;
border-bottom: 1px solid #b3babe;
}
TD {
background-color: #F6F8F9;
WHITE-SPACE: nowrap;
}
IMG {
cursor: pointer;
vertical-align: top;
}
INPUT, TEXTAREA {
BORDER-left: #b3babe 1px solid;
BORDER-top: #b3babe 1px solid;
BORDER-right: #767b7e px solid;
BORDER-bottom: #767b7e 1px solid;
PADDING-LEFT: 3px;
margin: 0px 2px 0px 2px;
}
SELECT {
font-size: 10px;
}
#o {
display: none;
}
#c {
TEXT-ALIGN: center;
}
#b {
BORDER: 0px;
}
#s {
color: #000099;
FONT-WEIGHT: bold;
padding-left: 12px;
cursor:default;
}
#u {
color: #009900;
FONT-WEIGHT: bold;
padding-left: 12px;
cursor:default;
}
#t {
color: #9999CC;
FONT-WEIGHT: bold;
padding-left: 12px;
cursor: default;
}
#TOOLS TD {
vertical-align: middle;
text-align: center;
background-color: #FFFFCC
}
</style>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type='text/javascript'>
if(typeof(google)!="undefined") google.charts.load('current', {packages: ['corechart']});
</script>
<SCRIPT type='text/javascript' Comment="Motor Javascript" id="eDesCore" SRC='edes.php?R:$core.js&j=6' charset="ISO-8859-1"></SCRIPT>
<?PHP
?>
<SCRIPT type="text/javascript">
var _wAyuda = null;
function gsAyuda(){
if( _wAyuda != null ) _wAyuda.close();
_wAyuda = window.open("edes.php?R:t/gsmain.htm",'','left=0; top=0; status=0; resizable=0; scrollbars=0; toolbar=0; location=0; menubar=0; directories=0; width='+(screen.width-10)+'; height='+(screen.availHeight-26), true );
}
var h = screen.availHeight;
window.moveTo(0,0);
window.resizeTo( screen.availWidth, h );
function Exe( Dir, SiNo ){
if( undefined != SiNo ) if( !confirm( 'Confirmar la opción de "'+(event.target || event.srcElement).title+'"' )) return;
MenuOFF();
_Estado = 2;
CONTROL.location.replace( 'edes.php?E:$'+Dir );
}
var _User = -1;
var _Editor;
function Editor(){
if( _Editor!= null ) _Editor.close();
_Editor = window.open( 'edes.php?E:$t/30.gs&HR=aboutblank&E=1&U='+_User, 'NomWin', 'left=0; top=0; status=1; resizable=0; scrollbars=0; toolbar=0; location=0; menubar=0; directories=0; width='+(screen.width-10)+'; height='+(screen.availHeight-45)+';', true );
}
function Traduce(){
CONTROL.location.href = 'edes.php?E:$t/tr.gs&oidioma='+Traducir.oIdioma.value+'&didioma='+Traducir.dIdioma.value+'&texto='+Traducir.texto.value+'&tipo='+Traducir.tipo.value;
}
function GenAyuda(Libro){
var txt = prompt( "Nombre de la ayuda a generar en 'edes/m/_tmp':", 'manual' );
if( txt == null ) return;
CONTROL.location.href = 'edes.php?E:$t/ut.gs&Help='+txt+'&Libro='+Libro;
}
function EdUsuarios(){
<?PHP
if( file_exists( eScript('$m/__checksys.gs') )){
echo 'if( event.ctrlKey ){';
echo 'CONTROL.location.href = "edes.php?E:$m/__checksys.gs";';
echo '}else{';
echo 'CONTROL.location.href = "edes.php?Xm:$ed.df";';
echo '}';
}else{
echo 'CONTROL.location.href = "edes.php?Xm:$ed.df";';
}
?>
}
function EdEsquemaUsuarios(){
CONTROL.location.href = 'edes.php?Xm:$ed.ed';
}
function EdFTP(){
CONTROL.location.href = 'edes.php?Xm:/_d_/cfg/ftp.ini';
}
function EdHTTP(){
CONTROL.location.href = 'edes.php?Xm:/_d_/cfg/http.ini';
}
function UnSql(){
CONTROL.location.href = 'edes.php?E:$t/ut.gs&UnSql=1';
}
function CVS(){
CONTROL.location.href = 'edes.php?E:$t/cvs.gs';
}
function Buscar(){
var txt = prompt( "Cadena a buscar:", '' );
if( txt == null ) return;
CONTROL.location.href = 'edes.php?E:$t/ut.gs&Buscar='+txt;
}
function Comparar(){
var txt = prompt( "Ficheros a comparar: Origen,Destino", '' );
if( txt == null ) return;
CONTROL.location.href = 'edes.php?E:$t/ut.gs&Diff='+txt;
}
var _Estado = 0;
function MenuOFF(){
if( _Estado != 2 ){
MenuICO.style.display = 'none';
MenuBoton.style.display = 'block';
}
}
function MenuON(){
_Estado = 3;
MenuICO.style.display = 'block';
MenuBoton.style.display = 'none';
}
<?PHP  if( $_gsACCESO['TIPO'] == '~' ){ ?>
function ExportaContenedor(){
CONTROL.location.replace( 'edes.php?E:$m/contenedor.gs' );
}
function CrearCHM(){
CONTROL.location.replace( 'edes.php?E:$m/chm_menu.gs' );
}
function EncriptarEDes(){
setTimeout(function(){
CONTROL.location.replace('edes.php?E:$m/xzip.gs&INFO=1');
}, 500);
}
function CrearLPDemo(){
if( confirm( 'Confirmar crear LP de Demo' ) ){
var txt = prompt( "Nombre del directorio base de la aplicación de DEMO", '' );
if( txt == null ) return;
CONTROL.location.replace('edes.php?E:$m/xzip.gs&CREARLPDEMO=1&DIR='+txt);
}
}
function eLoading(){}
<?PHP  } ?>
<?PHP  if( $_gsACCESO['TIPO'] == '~' || $_gsACCESO['TIPO'] == 'A' ){ ?>
function ReInstalar(){
if( confirm( 'Confirmar ReInstalar eDes mediante "edes.zip"' ) ){
CONTROL.location.replace( 'edes.php?E:$__install_zip.gs' );
}
}
<?PHP  } ?>
</script>
</head>
<body style='margin:0px' scroll='no' onload='window.focus();' _oncontextmenu='return false;' onhelp='gsAyuda();return false;'>
<DIV title='<?= $_eDesTitle; ?>'
STYLE='position:absolute;font-family: ARIAL;font-size:15px;
background: transparent; color: #000000;
right:20px;
bottom:20px;
filter:alpha(opacity=6);
cursor:default; z-index:98;' onmouseover='this.style.color="#e9a201";this.style.filter=""' onmouseout='this.style.color="";this.style.filter="alpha(opacity=6)"'>e-Des</DIV>
<table border=0px cellspacing=0px cellpadding=0px width=100% height=100%>
<tr>
<td id=MenuICO valign=top width=1px on-mouseleave='MenuOFF()'>
<table border=0px height=100% cellspacing=0px cellpadding=0px>
<tr><td align=center><IMG SRC="<?= gsIMG('cerrar'); ?>"	onclick="IE.Quit()" title="Cerrar">
<?PHP  if( $_gsACCESO['TIPO']=='~' ){ ?>
<tr><TD height=5 style='background: #C0C0C0'>
<tr><TD><IMG SRC="<?= gsIMG('contenedor'); ?>"		onclick="ExportaContenedor()"	TITLE="Exporta Contenedor">
<tr><TD><IMG SRC="<?= gsIMG('create_chm'); ?>"		onclick="CrearCHM()"			TITLE="&nbsp;* Crear CHM">
<tr><td><IMG SRC="<?= gsIMG('create_edes'); ?>"		onclick="EncriptarEDes()"		TITLE="&nbsp;* Encriptar eDes">
<tr><TD height=5 style='background:#C0C0C0'>
<?PHP  } ?>
<?PHP  if( $_gsACCESO['TIPO'] == '~' || $_gsACCESO['TIPO'] == 'A' ){ ?>
<tr><TD><IMG SRC="<?= gsIMG('parche'); ?>"			onclick="ReInstalar()"	TITLE="ReInstalar eDes (zip)">
<?PHP  } ?>
<tr><TD><IMG SRC="<?= gsIMG('backup'); ?>"		onclick="Exe('a/u/tools.gs?B',true)"	TITLE="Backup de la Aplicación">
<tr><td><IMG SRC="<?= gsIMG('edes'); ?>"		onclick="Editor()"						title="Editor">
<tr><TD height=5 style='background: #C0C0C0'>
<tr><td><IMG SRC="<?= gsIMG('zip'); ?>"			onclick="Exe('t/zip.gs')"				TITLE="Generar Zip">
<tr><TD><IMG SRC="<?= gsIMG('ejecutar2'); ?>"	onclick="Maqueta()"						TITLE="Generar Maqueta">
<tr><TD><IMG SRC="<?= gsIMG('ejecutar'); ?>"	onclick="Maqueta()"						TITLE="Generar Maqueta">
<tr><TD height=5 style='background: #C0C0C0'>
<tr><TD><IMG SRC="<?= gsIMG('portada'); ?>"		onclick="Exe('t/or.gs&Tipo=P&fichero=')"	TITLE="Edita Portada">
<tr><TD><IMG SRC="<?= gsIMG('indice'); ?>"		onclick="Exe('t/in.gs&DirFile=')"		TITLE="Edita Indice">
<tr><td><IMG SRC="<?= gsIMG('diccionario'); ?>"	onclick="Exe('t/di.gs&file=diccionario')"		TITLE="Edita Diccionario">
<tr><td><IMG SRC="<?= gsIMG('create_db'); ?>"	onclick="Exe('t/db.gs', 1)"				TITLE="Crea diccionario de datos desde un dbschema">
<tr><TD><IMG SRC="<?= gsIMG('organigrama'); ?>"	onclick="Exe('t/or.gs&Tipo=O&fichero=')"			TITLE="Edita Organigrama">
<tr><TD><IMG SRC="<?= gsIMG('xls'); ?>"			onclick="EdXls()"				TITLE="Edita Hoja Excel">
<tr><TD><IMG SRC="<?= gsIMG('esquema'); ?>"		onclick="Exe('t/ls.gs')"	TITLE="Edita Directorios">
<tr><TD><IMG SRC="<?= gsIMG('ed_iconos'); ?>"	onclick="Exe('t/ic.gs')"	TITLE="Edita Iconos">
<tr><TD><IMG SRC="<?= gsIMG('arbol_d'); ?>"		onclick="Exe('t/ar.gs')"	TITLE="Arbol de Opciones">
<tr><TD height=5 style='background: #C0C0C0'>
<tr><TD><IMG SRC="<?= gsIMG('tools'); ?>"		onclick="VerSelect(this,'opLenguaje')" TITLE="Utilidades varias">
<?PHP  if( substr_count('~AM',$_gsACCESO['TIPO']) == 1 ){ ?>
<tr><TD><IMG SRC="<?= gsIMG('usuarios'); ?>"	onclick="EdUsuarios()"		TITLE="Edita Usuarios">
<tr><TD><IMG SRC="<?= gsIMG('usuarios'); ?>"	onclick="EdEsquemaUsuarios()"		TITLE="Edita esquena Usuarios">
<tr><TD><IMG SRC="<?= gsIMG('ftp'); ?>"			onclick="EdFTP()"				TITLE="Edita parametros FTP">
<tr><TD><IMG SRC="<?= gsIMG('ftp'); ?>"			onclick="EdHTTP()"			TITLE="Edita parametros HTTP">
<?PHP  } ?>
<tr><TD><IMG SRC="<?= gsIMG('sonidos'); ?>"		onclick="EdSonidos()"		TITLE="Gestor de Sonidos">
<tr><TD><IMG SRC="<?= gsIMG('iconos'); ?>"		onclick="EdEstilo()"			TITLE="Edita de Estilos">
<tr><TD><IMG SRC="<?= gsIMG('archivo_0'); ?>"	onclick="Exe('t/al.gs')"	TITLE="Archivo de Documentación">
<tr><TD><IMG SRC="<?= gsIMG('buscar_word'); ?>"	onclick="Buscar()"			TITLE="Buscar en Fuentes">
<tr><TD><IMG SRC="<?= gsIMG('diff'); ?>"		onclick="Comparar()"			TITLE="Comparar ficheros">
<tr><TD><IMG SRC="<?= gsIMG('notas_0'); ?>"		onclick="Exe('t/al.gs')"	TITLE="Edita Documento">
<tr><TD><IMG SRC="<?= gsIMG('config'); ?>"		onclick="Exe()"				TITLE="Ficheros de Configuración">
<tr><TD><IMG SRC="<?= gsIMG('notas'); ?>"		onclick="EdNota()"			TITLE="Edita Nota">
<tr><TD><IMG SRC="<?= gsIMG('planing'); ?>"		onclick="CVS()"		on_click="Planing()"		TITLE="Planing">
<tr><TD><IMG SRC="<?= gsIMG('cache'); ?>"		onclick="Exe('t/visor.gs&CACHE')"	TITLE="gsCache">
<tr><TD><IMG SRC="<?= gsIMG('log'); ?>"			onclick="Exe('t/visor.gs&LOG')"	TITLE="gsLog">
<tr><TD><IMG SRC="<?= gsIMG('parche'); ?>"		onclick="Exe('t/visor.gs&VER')"	TITLE="gsVersión">
<tr><TD><IMG SRC="<?= gsIMG('agenda'); ?>"		onclick="EdAgenda()"			TITLE="Agenda">
<tr><TD><IMG SRC="<?= gsIMG('email'); ?>"		onclick="Email()"				TITLE="Email">
<tr><TD><IMG SRC="<?= gsIMG('pdf'); ?>"			onclick="TraduceFrases()" on_click="Pdf()"				TITLE="Generar PDF">
<tr><TD><IMG SRC="<?= gsIMG('grabar_0'); ?>"	onclick="Grabar()"			TITLE="Grabar">
<tr><TD height=100% style='background: #C0C0C0'>
</table>
</td>
<TD id=MenuBoton style='background: #C0C0C0;cursor:pointer;display:none;' onclick="MenuON()" _onmouseout='MenuOFF()'>
M E N U
</TD>
<td width=100% height=100%>
<IFRAME name="CONTROL" src="" width="100%" height="100%" SCROLLING="auto" FRAMEBORDER=0></iframe>
</td>
</tr>
</table>
<SCRIPT type="text/javascript">
function VerSelect( el, id ){
var x=y=0, Obj=document.getElementById(id).style;
while( el != null ){
x += el.offsetLeft;
y += el.offsetTop;
el = el.offsetParent;
}
Obj.position = 'absolute';
Obj.display = 'block';
Obj.top = y;
Obj.left = x;
}
function Php( NomPag ){
CONTROL.location.href = 'edes.php?E:$t/u/'+NomPag;
}
function Html( NomPag ){
CONTROL.location.href = 'edes.php?R:$t/u/'+NomPag;
}
function CreateDB(){
CONTROL.location.replace( 'edes.php?E:$t/di.gs&NewSQL' );
}
function Empezar( el ){
eval( el.value );
el.selectedIndex = 0;
document.body.focus();
}
</SCRIPT>
<div id="opLenguaje" onmouseout="this.style.display='none';" style="display:none">
<select onchange="Empezar(this)">
<option value='' style='color:#FFFFFF; background:#000099'>-- Utilidades --
<option value='GenAyuda("label")'>Genera ayuda: Etiquetas
<option value='GenAyuda("doc")'>Genera ayuda: Indice
<option value='GenAyuda("_edes")'>Genera ayuda: Sistema
<option value='GenAyuda("help2")'>Genera ayuda: Lenguaje
<option value='Php("claveclave.gs")'>Genera clave compuesta
<option value='UnSql()'>UnZip SQL
<option value='CreateDB()'>Crear diccionario SQL
</select></div>
<FORM METHOD=POST ACTION="" NAME="FRemoto">
<div id=FORMULARIO style="display:none; position:absolute; left:175px; top:350px; height:1px; padding:7px;background:#FF9900; border:2px #CC0000 solid">
Nombre fichero remoto <INPUT TYPE="text" NAME="FICHERO" SIZE=50 maxlength="300" value="http://62.22.87.31/v4informix/entrada.gs">
<BR><BR><CENTER>
<input type="Button" VALUE="LEER" onclick='VerFileRemoto()'>
&nbsp;&nbsp;&nbsp;
<input type="Button" VALUE="Cancelar" onclick="FORMULARIO.style.display='none'">
&nbsp;&nbsp;&nbsp;
<input type="Button" VALUE="Cerrar ventana" onclick="CerrarRemoto()"></CENTER>
</div>
</FORM>
<FORM METHOD=POST ACTION="" NAME="Traducir">
<div id=TRADUCTOR style="display:none; position:absolute; left:175px; top:290px; height:1px; padding:7px;background:#FF9900; border:2px #CC0000 solid">
Del <SELECT NAME="oIdioma">
<OPTION VALUE="de">Aleman
<OPTION VALUE="es">Español
<OPTION VALUE="fr">Frances
<OPTION VALUE="en" SELECTED>Ingles
<OPTION VALUE="it">Italiano
<OPTION VALUE="pt">Portuges
<OPTION VALUE="ru">Ruso
</SELECT>
al <SELECT NAME="dIdioma">
<OPTION VALUE="de">Aleman
<OPTION VALUE="es" SELECTED>Español
<OPTION VALUE="fr">Frances
<OPTION VALUE="en">Ingles
<OPTION VALUE="it">Italiano
<OPTION VALUE="pt">Portuges
<OPTION VALUE="ru">Ruso
</SELECT>
Tipo <SELECT NAME="tipo">
<OPTION VALUE="F" SELECTED>Frase
<OPTION VALUE="U">URL
</SELECT>
<BR>
Máximo: Frase 150 palabras / URL 10 Kb<br>
<TEXTAREA NAME="texto" ROWS="3" COLS="50"></TEXTAREA>
<BR><BR><CENTER>
<input type="Button" VALUE="TRADUCIR" onclick='VerTraduccion()'>&nbsp;
<input type="Button" VALUE="Ocultar" onclick="TRADUCTOR.style.display='none'">&nbsp;
<INPUT TYPE="reset" VALUE="Limpiar">&nbsp;
<input type="Button" VALUE="Cerrar ventana" onclick="TRADUCTOR.style.display = 'none';"></CENTER>
</div>
</FORM>
<SCRIPT type="text/javascript">
function FicheroRemoto(){
FORMULARIO.style.display = 'block';
}
function VerFileRemoto(){
parent.frames.TLF.location.href = 'utl_a_remoto.gs?archivo='+FRemoto.FICHERO.value;
parent.frames.TLF.window.frameElement.height = '80%';
}
function CerrarRemoto(){
FORMULARIO.style.display = 'none';
parent.frames.TLF.window.frameElement.height = '0';
}
function TraduceFrases(){
TRADUCTOR.style.display = 'block';
}
function VerTraduccion(){
CONTROL.location.href = 'edes.php?E:$t/tr.gs&oidioma='+Traducir.oIdioma.value+'&didioma='+Traducir.dIdioma.value+'&texto='+Traducir.texto.value+'&tipo='+Traducir.tipo.value;
}
</SCRIPT>
</body>
</html>
