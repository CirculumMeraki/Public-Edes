<?PHP
_HeaderAdd();
if( $_SESSION["_eDes_"]=="" ){
$_SESSION["_eDes_"] = md5(time());
eHTML('','','gsCreate');
?>
</head>
<body>
<table width="100%" height="100%" cellpadding=0px cellspacing=0px border=0px><tr><td valign="middle" align="center">
<form action='edes.php?gscreate' method="POST" autocomplete="false">
<TABLE id="RECIPIENTE" border=0px cellspacing=0px cellpadding=0px>
<TR><TD align="left" valign="top">
<TABLE id="MarginForm" border=0px cellspacing=0px cellpadding=0px>
<TR>
<TD id="LabelTitle" colspan=2>gsCreate</TD>
</TR>
<TR>
<TD id="LabelLogin">Login</TD>
<TD><INPUT TYPE="text" NAME="Login" value="" id="Login" autocomplete="false" autofocus></TD>
</TR>
<TR id="InputSpacing" colspan=2><TD></TD></TR>
<TR>
<TD id="LabelPassword">Password</TD>
<TD><INPUT TYPE="password" NAME="Pass" value="" id="Password" autocomplete="false"></TD>
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
$_SESSION["gsACCESO"] = $_gsACCESO;
$_SESSION['_User'] = 1;
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
if( $_gsACCESO['ACCESO']<1 ){
}
if( $_gsACCESO['Create']<1 ){
}
$_Web_ = $_SESSION['_Web_'];
$_ModoEDES = array('C'=>'c','M'=>'m','I'=>'a','B'=>'b','L'=>'l');
$_DimCol = explode(',','TIPO,LOGIN,CLAVE,ACCESO,EMAIL,iTools,Edit,Help,Shell,Tools,Tree,Icon,Create');
$__DirDestino__ = '';
$_IMG_OPTION = '{g/tab.gif} ';
$_Importar = array();
if( $_POST['CloseCreate'] == 'close' ){
session_unset();
session_destroy();
unset($_SESSION);
?>
<script type="text/javascript">
top.document.body.style.padding = "20px";
top.document.body.innerHTML = "Aplicación cerrada<br><br><a c=9 href='"+top.location.href+"'>login</a>";
</script>
<?PHP
exit;
}
if( $_POST['Orden'] == 'AI' ) VerFichero( '../../edesweb/web/edesweb/_doc_/readme.txt' );
if( $_POST['Orden'] == 'AS' ) VerFichero( '../../edesweb/web/edesweb/_doc_/sql.txt' );
if( $_POST['Orden'] == 'ED' ) EditarFichero( $_POST['Fichero'] );
if( isset($_POST['GRABAR']) ) GrabarFichero( $_POST['GRABAR'], $_POST['txt'] );
if( $_POST['Orden'] == 'TP' ) TestPHP();
if( $_POST['Orden'] == 'PI' ) TestPhpInfo();
if( $_POST['Orden'] == 'TE' ) TestExplorador();
if( $_POST['Orden'] == 'SP' ) EditaPhpIni();
if( $_POST['Orden'] == 'SA' ) EditaHttpdCnf();
if( $_POST['Orden'] == 'SW' ) SeleccionarINTRANET();
if( $_POST['Orden'] == 'BW' ) BorrarINTRANET();
if( $_POST['Orden'] == 'NewDir' ) SetDir( $_POST['Dir'] );
if( $_POST['Orden'] == 'IDB') ImportarDiccionario();
if( $_POST['Orden'] == 'MD' ) EditaSQL();
if( isset($_POST['txt'])	) GrabaSQL( $_POST['txt'] );
if( $_POST['Orden'] == 'ME' ) VerEDesSQL();
if( $_POST['Orden'] == 'MC' ) CrearMaqueta();
if( $_POST['Orden'] == 'RD' ) RenameDir();
if( $_POST['Orden'] == 'CW' ) CreateWeb();
if( $_POST['Orden'] == 'UD' ) UsuariosDeDesarrollo($_gsNomUser);
if( isset($_POST['Desarrollo']) ) UsuariosSave( $_POST['Desarrollo'] );
if( $_POST['Orden'] == 'BD' ) BloquearWeb();
if( strlen($_POST['Orden']) > 2 ) EditaINI($_POST['Orden']);
if( $_POST['Orden'] != '' ) exit;
$OpInicial = 0;
chdir('../../');
if( TotalWeb() > 0 ) $OpInicial = 1;
function TotalWeb(){
$nw = 0;
$dir_handle = opendir('.');
while( $dir = readdir($dir_handle) ){
if( $dir != '.' && $dir != '..' && $dir != 'edes' ){
if( is_dir($dir) ){
if( file_exists($dir.'/http/edes.php') ) $nw++;
}
}
}
closedir($dir_handle);
return( $nw );
}
$Agente = $_SERVER['HTTP_USER_AGENT'];
if( $Agente=='' ){
echo 'Error de instalación de PHP<br>';
echo 'Ponga la variable "register_globals = On" en el fichero de configuración "php.ini"';
exit;
}
$VersionMinima = 6.0;
$i = strpos($Agente,'(')+1;
$f = strpos($Agente,')');
list(,$Explorer,) = explode( ';', substr( $Agente, $i, $f-$i ) );
$Explorer = trim($Explorer);
list($Explorer,$Version) = explode( ' ', $Explorer );
$_VerIE = $Version;
eHTML('','','gsCreate');
?>
<style>
body {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
FONT-SIZE: 13px;
MARGIN: 0px;
PADDING: 0px;
border: 0px;
cursor: default;
}
body, html {
height: 100%;
width: 100%;
}
table {
FONT-FAMILY: ARIAL;
FONT-SIZE: 13px;
background: #cccccc;
}
td {
PADDING-LEFT: 5px;
background-color: #d5dce0;
color: #000099;
}
input,select,option {
background-color: #d5dce0;
color: #000099;
border: 1 solid #b9c6cc;
font-size: 10px;
padding-left: 5px;
}
input {
FONT-FAMILY: monospace;
FONT-SIZE: 15px;
}
textarea {
background-color: #F3F3F3;
BORDER: #6c7b82 1px solid;
FONT-SIZE: 100%;
PADDING-LEFT: 5px;
SCROLLBAR-ARROW-COLOR: #d5dce0;
SCROLLBAR-3DLIGHT-COLOR: #d5dce0;
SCROLLBAR-DARKSHADOW-COLOR: #485257;
SCROLLBAR-BASE-COLOR: #8caab5;
SCROLLBAR-FACE-COLOR: #8caab5;
SCROLLBAR-HIGHLIGHT-COLOR: #8caab5;
SCROLLBAR-SHADOW-COLOR: #8caab5;
SCROLLBAR-TRACK-COLOR: #d5dce0;
}
#ShellOK {
}
#ShellKO {
color: #FF0000;
font-weight: bold;
}
img {
cursor:pointer;
vertical-align: middle;
}
.gsFondoTITLE {
height: 1px;
background-color: #90a4ae;
border-top: 1px solid #d5dce0;
border-bottom: 1px solid #485257;
color: #ffffff;
padding-left: 5px;
padding-bottom: 2px;
FONT-SIZE: 120%;
font-weight: bold;
text-align: left;
cursor:default;
--f-ilter: progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr=#f2f2f2, endColorstr=#789aab);
}
.gsTITLE {
FONT-FAMILY: ARIAL;
FONT-SIZE: 16px;
font-weight: bold;
--f-ilter:Blur(add=1, direction=135, strength=4);
color:#3f474c;
vertical-align:bottom;
margin-top: 2px;
}
#TITULO {
text-align: center;
FONT-WEIGHT: bold;
}
#MENU {
border: 0px solid #3f474c;
}
#MENU TH {
text-align: left;
background: #789aab;
color: #000099;
padding-left: 2px;
cursor:default;
--f-ilter: progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr=#789aab, endColorstr=#f2f2f2);
}
#MENU TD {
color: #48646F;
background: #f2f2f2;
padding-left: 10px;
padding-right: 5px;
cursor:pointer;
WHITE-SPACE: nowrap;
}
#CONTENEDOR {
border:1px solid #000099;
padding:0px;
}
#DivMENU {
float:left;
scroll:auto;
margin:0px;
height:100%;
overflow:auto;
SCROLLBAR-3DLIGHT-COLOR: #687074;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #a2b0b7;
SCROLLBAR-DARKSHADOW-COLOR: #687074;
SCROLLBAR-FACE-COLOR: #a2b0b7;
SCROLLBAR-HIGHLIGHT-COLOR: #a2b0b7;
SCROLLBAR-SHADOW-COLOR: #a2b0b7;
SCROLLBAR-TRACK-COLOR: #d4dfe4;
}
</style>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type='text/javascript'>
if(typeof(google)!="undefined") google.charts.load('current', {packages: ['corechart']});
</script>
<SCRIPT type='text/javascript' Comment="Motor Javascript" id="eDesCore" SRC='edes.php?R:$core.js&j=6' charset="ISO-8859-1"></SCRIPT>
<SCRIPT type='text/javascript' SRC='edes.php?E:$lng.php' charset="ISO-8859-1"></SCRIPT>
<?PHP
?>
<SCRIPT type="text/javascript">
top.S.init(window);
window.name = 'Main';
function eLoadCore(){}
function eGetUrlParameter(){}
if(top!=self) top.location.href = location.href;
window.focus();
var _MenVersion = false;
var IE = window,
_Width = screen.width,
_Height = screen.availHeight;
document.oncontextmenu = new Function("return false");
function AnulaKey(){
var Mas = '', Ok = 0;
if( event.altKey ) Mas = 'a';
if( event.ctrlKey ) Mas = 'c';
if( event.shiftLeft ) Mas = 's';
if( ',114,122,a39,a37,a8,c72,c79,c76,c73,c81,c85,s121,'.indexOf(','+Mas+S.eventCode(event)+',') != -1 ){
Ok = 1;
}else if( ',93,a36,'.indexOf(','+Mas+S.eventCode(event)+',') != -1 ){
Ok = 2;
}
if( Ok > 0 ){
try{ event.keyCode = 0; }catch(e){}
event.cancelBubble = true;
event.returnValue = false;
if( Ok==2 ) alert('Acción no permitida');
return false;
}
return true;
}
document.onkeydown = AnulaKey;
<?PHP
if( $_ModArbol != '' ){
CargarMenu( $_ModArbol );
}
?>
function CloseCreate(){
var sHTM = "<?=eHTML('','','',true)?></HEAD><BODY>"+
'<FORM METHOD=POST ACTION="edes.php?gscreate">';
sHTM += '<INPUT TYPE="HIDDEN" NAME="CloseCreate" VALUE="close">';
sHTM += '</FORM></BODY></HTML>';
TLF.document.write( sHTM );
TLF.document.close();
TLF.document.forms[0].submit();
}
function End(){
var Ancho = Alto = 19;
with( document.getElementById("Procesando").style ){
display = 'block';
pixelLeft = ((_Width-Ancho)/2)+"px";
pixelTop = ((_Height-Alto)/2)+"px";
}
}
var _ZoomTab = 1,
_xReadyState = '';
function eReadyState( win ){
_xReadyState = '';
try{
_xReadyState = win.document.readyState;
return( win.document.readyState=='complete' );
}catch(e){
for( var i in e ) _xReadyState += i+'= '+e[i]+' | ';
return false;
}
}
function eReadyStateLocal( win ){
try{
if( win.document.getElementById('_ICALL')==null ) return true;
return eReadyState( win.document.getElementById('_ICALL').eWindow );
}catch(e){
for( var i in e ) _xReadyState += i+'= '+e[i]+' | ';
return false;
}
}
function eInfo( win, Texto ){
alert( Texto );
}
function eInfoHide( win ){
}
function eIsWindow(win){
return false;
}
function eSWLoading(win,es){
}
function eVarToString( n ){
switch( typeof(n) ){
case 'number':
break;
case 'string':
if( n.indexOf('"')>-1 ){
n = "'"+n+"'";
}else{
n = '"'+n+'"';
}
break;
case 'undefined':
n = '';
break;
}
return n;
}
function eITools(win){}
function CopiaSCR(){
document.execCommand('Copy');
var txt = window.clipboardData.getData('Text');
if( null == txt ) return;
txt = txt.replace(/\n$/g, '');
if( txt.indexOf('\n') != -1 ) return;
txt = txt.replace(/^\s+/g, '').replace(/\s+$/g, '').replace(/\s+\s+/g,' ');
document.execCommand('Unselect');
window.event.returnValue = false;
window.clipboardData.clearData("Text");
var tmp = txt.split(' ');
txt = tmp[0];
var Linea = document.getElementById("ShellOK").value.split('\n');
for( var n=0; n<Linea.length; n++ ){
if( Linea[n].indexOf(' '+txt)!=-1 && Linea[n].substring(0,1)=='d' ){
document.getElementById("Comando").value = 'cd '+txt+'; ls -lv';
shell.submit();
return;
}
}
shell.Comando.value += ' '+txt;
}
function eLoading(){}
function eAutoMenu(){}
document.write("<DIV id=CONTENEDOR style='display:none'><DIV id=CONTENIDO CONTENTEDITABLE></DIV></DIV>");
function eShowHelp( data ){
}
var _Help = '';
function HelpIFRAME(){
return S.eventClear(IWORK.window);
}
function gsHelp(txt){
return HelpIFRAME();
}
function Help(){
TLF.location.replace('edes.php?V:/web/help/gscreate.htm&TITLE=AYUDA GS-CREATE&WIDTH=85%&HEIGHT=90%&LEFT=5%&TOP=0');
try{ event.keyCode = 0; }catch(e){}
event.cancelBubble = true;
event.returnValue = false;
return false;
}
function CopyAll(){
document.getElementById("shellOut").select();
document.execCommand('Copy');
document.execCommand('Unselect');
}
function SetMenus( nOp ){
var Obj = document.getElementById("MENU").getElementsByTagName("TD");
for( var i=0; i<Obj.length; i++ ) Obj[i].disabled = !( Obj[i].getAttribute("E")=='' || Obj[i].getAttribute("E").indexOf(nOp) > -1 );
if( nOp < 2 ){
document.getElementById('TITULO').innerText = ' ';
document.getElementById('BBDD').innerText = "Bloquear INTRANET";
}
}
var _NomDir = '';
function Menu(){
var Obj = S.event(window);
if( Obj.tagName == 'I' ) Obj = Obj.parentElement;
if( Obj.tagName == 'B' ) Obj = Obj.parentElement;
if( Obj.tagName != 'TD' ) return;
if( Obj.disabled ) return;
if( Obj.innerText=='' ) return;
if( ( Obj.getAttribute('SN') != null ) ){
if( !confirm('  Esta opción tardará\n\nConfirmar su ejecución') ) return;
}
if( ( Obj.getAttribute('SiNo') != null ) ){
if( !confirm('Confirmar opción\n\n"'+Obj.innerText.replace(/^\s+/g,'').replace(/\s+$/g,'')+'"') ) return;
}
if( ( Obj.getAttribute('SiNo2') != null ) ){
if( !confirm('Se borrará la DB y todos sus ficheros.\n\nVuelva a confirmar BORRAR INTRANET') ) return;
}
if( Obj.getAttribute('EXE') != null ) _Help = Obj.getAttribute('EXE');
if( Obj.getAttribute('ED')  != null ) _Help = Obj.getAttribute('ED');
if( Obj.getAttribute('o')   != null ) _Help = Obj.getAttribute('o');
if( Obj.getAttribute("o")=='RD' || Obj.getAttribute("o")=='CW' ){
var NomDir = prompt('Nombre del directorio principal:', _NomDir );
if( NomDir == null ) return;
NomDir = NomDir.replace(/^[\r\n\t\s]*/,'').replace(/^[\r\n\t\s]*$/,'');
if( NomDir.indexOf(' ') > -1 ){
alert('Caracter no permitido');
return;
}
if( NomDir.length == 0 ) return;
_NomDir = NomDir;
}
document.getElementById("GRABAR").style.display = 'none';
var c = Obj.parentElement.rowIndex;
while( MENU.rows[c].cells[0].tagName!='TH' ) c--;
document.getElementById("TITULO2").innerText = MENU.rows[c].cells[0].innerText+': '+Obj.innerText;
var txt = "<?=eHTML('','','',true)?></HEAD><BODY style='padding:0px; margin:0px;' scroll='no'>"+
'<FORM METHOD=POST ACTION="edes.php?gscreate">';
if( Obj.getAttribute('ED') == null ){
txt += '<INPUT TYPE="HIDDEN" NAME="Orden" VALUE="'+Obj.getAttribute("o")+'">';
}else{
txt += '<INPUT TYPE="HIDDEN" NAME="Orden" VALUE="ED">';
txt += '<INPUT TYPE="HIDDEN" NAME="Fichero" VALUE="'+Obj.getAttribute("ED")+'">';
}
if( Obj.getAttribute("o")=='RD' || Obj.getAttribute("o")=='CW' ) txt += '<INPUT TYPE="HIDDEN" NAME="NomDir" VALUE="'+NomDir+'">';
if( Obj.getAttribute("o")=='MC' ){
var NumSerie = "(sin numero)";
txt += '<INPUT TYPE="HIDDEN" NAME="NumSerie" VALUE="'+NumSerie+'">';
}
txt += '</FORM></BODY></HTML>';
IWORK.document.write( txt );
IWORK.document.close();
if( Obj.getAttribute('EXE')!=null ) IWORK.document.forms[0].action = 'edes.php?FmR:'+Obj.getAttribute("EXE");
if( Obj.getAttribute("o")=='MS' ) IWORK.document.forms[0].action = 'edes.php?FmR:/_doc_/config.ini';
IWORK.document.forms[0].submit();
}
var _Source=_DESDE_ = 'MAIN';
window.name = 'Main';
function IniDOC(){
S.eventFire(document.getElementById("MENU").rows[1].cells[0], "click");
DivMENU.style.width = DivMENU.offsetWidth+"px";
S("#DESKTOP").css({height:document.body.offsetHeight});
}
<?PHP
?>
</SCRIPT>
</head>
<body scroll=no _onbeforeunload='End()' onhelp='Help()' onload="SetMenus(<?= $OpInicial; ?>);IniDOC();" onselectstart='return false;' onresize='S("#DESKTOP").css({height:document.body.offsetHeight})'>
<IMG SRC="<?=gsIMG('2_sh_closed')?>" style="position:absolute; top:5px; right:17px" onclick='CloseCreate()' title='Cerrar'>
<IMG SRC="<?=gsIMG('h2_edes')?>" style="position:absolute; top:4px; right:80px" onclick='eShowHelp("ms-its:C:\\edes\\t\\manual\\edes.chm::h/__portada__.htm")' title='Ayuda eDes'>
<form name="shell" method="post" ACTION="edes.php?E:$t/sh.gs&_FROM=gsCreate">
<table id=DESKTOP WIDTH="100%" HEIGHT="100%" cellspacing=0px cellpadding=0px border=0px>
<tr><th class=gsFondoTITLE><IMG SRC="<?=gsIMG('2_edes')?>" style="float:left;cursor:default;" title="<?= $_eDesTitle; ?>"><div class=gsTITLE>gsCreate&nbsp;·&nbsp;eDes</div></th></tr>
<tr><td style='padding-top:1' onselectstart='return false'>
<TABLE width=100% cellspacing=0px cellpadding=0px border=0px height=1px><TR>
<TD>PROYECTO: </TD>
<TD id=TITULO title='Directorio principal de la INTRANET' nowrap style="width:200px;text-align:left"><?PHP
echo $_Web_;
?></TD>
<TD width=100% id=TITULO2>&nbsp;</TD>
<TD><IMG SRC="<?= gsIMG('2_grabar_htm'); ?>" onclick='IWORK.Grabar()' title='Grabar' id=GRABAR style='display:none'></TD>
<TD onclick='Help()' style='cursor:pointer'>&nbsp;&nbsp;F1·Ayuda&nbsp;</TD>
</TR></TABLE>
<tr><td width=100% height=100% style="PADDING-LEFT:0px">
<TABLE width=100% cellspacing=0 cellpadding=0 border=0 height=100%><TR>
<TD style="display:none" id=ArbolON onclick="VerMenu(1)" class=AnchoCol title="Ocultar Menú"><IMG SRC="g/tree_left.gif" title="Mostrar Menú"></TD>
<TD valign=top style='padding-right:5'>
<DIV id=DivMENU>
<TABLE id=MENU border=0 cellspacing=0 cellpadding=0 onclick='Menu()'>
<TR><TH>AYUDA
<TR><TD E='' o=AI>Instalación Programas
<TR><TD E='' o=AS>Definición SQL
<TR><TH>ESTADO
<TR><TD E='' o=TP>PHP
<TR><TH>CONFIGURACION
<TR><TD E='' o=SP>php.ini
<?PHP  if( $_TipoUsu=='~~~' ){ ?>
<TR><TD E='' onclick='gsIcons()'>gsIcons
<?PHP  } ?>
<TR><TH>PROYECTO
<?PHP  if( $_gsACCESO['Create'] > 1 ) echo "<TR><TD E='01234' o=CW>Crear"; ?>
<?PHP  echo "<TR><TD E='01234' o=CW>Crear"; ?>
<TR><TD E='1234' o=SW id=SelWeb disabled>Seleccionar
<TR><TD E='23' o=RD id=RRDD disabled>Renombrar
<?PHP  if( $_gsACCESO['Create'] > 2 ) echo "<TR><TD E='23' o=BW SiNo SiNo2 disabled>Borrar"; ?>
<TR><TD E='' style="font-size:1; vertical-align:middle; background:#9fa3a5"></TR>
<TR><TD E='23' disabled ED="/_doc_/install.ini"><B>Configurar</B>
<TR><TD E='23' disabled o=IDB><B>Importar diccionario</B>
<TR><TD E='23' disabled o=MD><B>Definir Base de datos</B>
<TR><TD E='23' disabled o=ME><I>Ver BD. E-DES</I>
<?PHP
if( $_gsACCESO['Create'] > 1 ){
?>
<TR><TD E='' style="font-size:1; vertical-align:middle; background:#9fa3a5"></TR>
<TR><TD E='-' disabled>Cargar tabla auxiliar
<TR><TD E='-' disabled>Importar tabla auxiliar
<TR><TD E='-' disabled>Borrar tabla a importar
<?PHP
}
?>
<TR><TD E='' style="font-size:1; vertical-align:middle; background:#9fa3a5"></TR>
<?PHP  if( $_gsACCESO['Create'] > 1 ) echo "<TR><TD E='23' disabled o=MC id=CCMM><B>Crear INTRANET</B>"; ?>
<TR><TD E='34' disabled id=BBDD o=BD>Bloquear INTRANET
<?PHP
if( strtoupper(substr(PHP_OS,0,3)) == 'LIN' || strtoupper(substr(PHP_OS,0,3)) == 'UNI' ){
echo "<TR><TD E='34' disabled o=UD>Usuarios de desarrollo";
}else if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
echo "<TR><TD E='34' disabled o=UD>Usuarios de desarrollo";
}
?>
<TR><TH>CONFIGURAR</TH></TR>
<TR><TD E='34' disabled EXE='/_datos/config/desktop.ini'>	 Desktop
<TR><TD E='34' disabled EXE='/_datos/config/sql.ini'>		 SQL
<TR><TD E='' style="font-size:1px; vertical-align:middle; background:#9fa3a5"></TR>
<TR><TD E='34' disabled ED='/_datos/config/about.htm'>		 Acerca de ...
<TR><TD E='34' disabled ED='/tree/master.txt'>				 Arbol de opciones
<TR><TD E='34' disabled ED='/_datos/config/alerts.ini'>		 Alertas
<TR><TD E='34' disabled ED='/_datos/config/desktop_user.ini'>Desktop user
<TR><TD E='34' disabled ED='/_d_/cfg/edes.ini'>				 eDes
<TR><TD E='34' disabled ED='/_datos/config/index.htm'>		 Index
<TR><TD E='34' disabled ED='/_datos/config/aux_page.ini'>	 Página 'auxiliar'
<TR><TD E='34' disabled ED='/_datos/config/empty_page.htm'>	 Página central 'vacía'
<TR><TD E='34' disabled ED='/_datos/config/empty_frame.htm'> Página IFrame 'vacía'
<TR><TD E='34' disabled ED='/_datos/config/empty_html.htm'>	 Página HTML 'vacía'
<TR><TD E='34' disabled ED='/_datos/config/shadow.htm'>		 Página HTML 'sombra'
<TR><TD E='34' disabled ED='/_datos/config/stop.php'>		 Página 'Web parada'
<TR><TD E='34' disabled EXE='/_datos/config/pdf.ini'>		 PDF
<TR><TD E='34' disabled ED='/_datos/config/session.ini'>	 Variables de sesión
</TABLE>
</div>
<TD width=100% id=CONTENEDOR><IFRAME name='IWORK' src='' eNORESIZE=true width='100%' height='100%' FRAMEBORDER=0 SCROLLING='auto'></IFRAME>
</table>
</table>
</form>
<SCRIPT type="text/javascript">IWORK.frameElement.WOPENER = window;</SCRIPT>
<?PHP
if( $EditFile != '' ){
echo '<SCRIPT type="text/javascript">';
$url = str_replace( $DirAplicacion, '', $url );
$url = str_replace( $DirMotor, '$', $url );
if( $EditExe=='edit' ){
echo "window.opener.gsEditor( '{$url}{$EditFile}', 1 );";
}else{
echo "window.opener.FSOLeer( '{$EditExe}', '{$url}{$EditFile}' );";
}
echo '</SCRIPT>';
}
if( $AvisoNewVersion ) echo '<SCRIPT type="text/javascript">if( _MenVersion ) alert( "Para usar parte del motor en local\ntiene que descargar la versión actual" );</SCRIPT>';
echo "<IFRAME name='TLF' src='{$TLFComando}' width='0px' height='0px' style='display:none'></iframe>";
echo '<IMG id=Procesando SRC="'.gsIMG('2_procesando').'" BORDER=0px style="position:absolute;z-index:10;display:none">';
echo '<script type="text/javascript">';
echo "SetMenus({$OpInicial});IniDOC();";
echo '</script>';
echo '</body></html>';
exit;
function TestPHP(){
global $_SERVER;
eHTML();
?>
<STYLE TYPE="text/css">
BODY {
BACKGROUND: #f2f2f2;
BACKGROUND: #f0f5ff;
FONT-FAMILY: ARIAL;
FONT-SIZE: 16px;
margin: 0px;
}
CENTER {
BACKGROUND: #f2f2f2;
}
TABLE {
FONT-SIZE: 16px;
BACKGROUND: #330066;
}
TR { BGCOLOR: #FF3300; COLOR: #000000}
TD { BGCOLOR: #3366FF; COLOR: #000000 }
#CONFIG TABLE {
BACKGROUND: #000000;
COLOR: #0a00af;
FONT-SIZE: 100%;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #dd8800;
border: 0px;
}
#CONFIG TH {
BACKGROUND: #0000CC;
COLOR: #FFFFFF;
FONT-SIZE: 100%;
PADDING-TOP: 5px;
border: 0px;
}
#CONFIG TD {
WHITE-SPACE: nowrap;
BACKGROUND: #FFFFCC;
COLOR: #000066;
border: 0px;
}
</STYLE>
</HEAD><BODY onhelp='top.HelpIFRAME();return false;' oncontextmenu='return false;' onselectstart='return false' ondragstart='return false'>
<CENTER>
<?PHP
echo '<br>';
$Agente = $_SERVER['HTTP_USER_AGENT'];
echo "<table id=CONFIG cellSpacing=1px cellPadding=2px border=0>";
echo "<tr><th> Agente </th><td>{$Agente}</td></tr>";
echo "<tr><th> Versión PHP </th><td>".PHP_VERSION."</td></tr>";
echo "<tr><th> Sistema Operativo </th><td>".PHP_OS."</td></tr>";
echo '</table><br>';
echo "<table id=CONFIG cellSpacing=1px cellPadding=2px border=0>";
echo "<tr><th>PROPIEDAD</th><th>ESTADO</th><th>CONTROL</th></tr>";
?>
<SCRIPT type="text/javascript">
document.write( "<tr><td>Charset				</td><td>"+ document.charset			+"</td><td>windows-1252	</td></tr>" );
document.write( "<tr><td>Default Charset	</td><td>"+ document.defaultCharset	+"</td><td>windows-1252	</td></tr>" );
</SCRIPT>
<?PHP
echo '<tr><td> "magic_quotes_gpc"					</td><td>'. get_cfg_var(magic_quotes_gpc)			.'</td><td>1				</td></tr>';
echo '<tr><td> "php_errormsg"							</td><td>'. get_cfg_var(track_errors)				.'</td><td>1				</td></tr>';
echo '<tr><td> "register_argc_argv"					</td><td>'. get_cfg_var(register_argc_argv)		.'</td><td>1				</td></tr>';
echo '<tr><td> "register_globals"					</td><td>'. get_cfg_var(register_globals)			.'</td><td>1				</td></tr>';
echo '<tr><td> "short_open_tag"						</td><td>'. get_cfg_var(short_open_tag)			.'</td><td>1				</td></tr>';
echo '<tr><td> Tipo de Compresión					</td><td>'. $_SERVER['HTTP_ACCEPT_ENCODING']		.'</td><td>gzip, deflate</td></tr>';
echo '<tr><td> Vida del script/sesión				</td><td>'. get_cfg_var(max_execution_time)	.' sg</td><td>30 sg			</td></tr>';
echo '<tr><td> Byts para el script					</td><td>'. get_cfg_var(memory_limit)				.'</td><td>16M				</td></tr>';
echo '<tr><td> "variables_order"						</td><td>'. get_cfg_var(variables_order)			.'</td><td>GPCS			</td></tr>';
echo '<tr><td> Nivel de informacion de errores	</td><td>'. get_cfg_var(error_reporting)			.'</td><td>5				</td></tr>';
echo '<tr><td> Magic quotes							</td><td>'. get_magic_quotes_gpc()					.'</td><td>1				</td></tr>';
echo '<tr><td> Magic quotes runtime					</td><td>'. get_magic_quotes_runtime()				.'</td><td>0				</td></tr>';
echo '<tr><td> PHP versión								</td><td>'. phpversion()								.'</td><td>4.3.4			</td></tr>';
echo '</table>';
echo '<br>';
$DimModulo = explode(',','apache,session,ftp,pdf,zlib,mysql,mysqli,informix,Zend Optimizer');
echo '<table id=CONFIG cellSpacing=1px cellPadding=2px border=0 width=1>';
echo '<col><col align=center>';
echo '<tr><th nowrap>MODULOS CARGADOS</th><th>ESTADO</th></tr>';
for( $n=0; $n<count($DimModulo); $n++ ){
echo '<tr><td>'.$DimModulo[$n].'</td><td>'.( (extension_loaded($DimModulo[$n])) ? 'Si' : 'NO' ).'</td></tr>';
}
echo '<tr><td colspan=2>';
foreach( get_loaded_extensions() as $key => $value ){
if( !in_array( $value, $DimModulo ) ) echo $value.', ';
}
echo '</td></tr>';
echo '</table>';
echo '<br>';
phpInfo();
echo '</CENTER>';
echo '</BODY></HTML>';
}
function TestPhpInfo(){
phpInfo();
}
function TestExplorador(){
global $_SERVER;
eHTML();
?>
<STYLE TYPE="text/css">
BUTTON{cursor:pointer}
BODY{BACKGROUND:#f2f2f2;FONT-FAMILY:ARIAL;FONT-SIZE:12px}
TABLE{FONT-SIZE:14px;BGCOLOR:#66CC00}
TR{BGCOLOR:#FF3300;COLOR:#000000}
TD{BGCOLOR:#3366FF;COLOR:#000000}
#DR TABLE,#PR TABLE,#CF TABLE{BACKGROUND:#d8dcdf;COLOR:#0a00af;FONT-SIZE:100%;SCROLLBAR-ARROW-COLOR:#ffffff;SCROLLBAR-BASE-COLOR:#dd8800}
#DR TH,#PR TH,#CF TH{BACKGROUND:#000099;COLOR:#FFFFFF;FONT-SIZE:100%;PADDING-TOP:5px}
#DR TD,#PR TD,#CF TD{WHITE-SPACE:nowrap;BACKGROUND:#FFFFCC;COLOR:#000066}
#DR TD BUTTON{border:0;background-color:#FFFFCC}
</STYLE>
<script type="text/javascript">
var estado = ['Not Installed','Loading','Loaded','Interactive','INSTALLED'];
var ctl = [
['U','Music Control (Optional)'			,'CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6',''],
['U','Microsoft Excel'						,'Excel.Application'],
['U','Microsoft Shell'						,'Shell.Application'],
['U','Adobe Acrobat Control'				,'CLSID:CA8A9780-280D-11CF-A24D-444553540000',''],
['U','Excel'									,'CLSID:0002E510-0000-0000-C000-000000000046',''],
['U','Gráficas'								,'CLSID:0002E500-0000-0000-C000-000000000046',''],
['U','WScripting'								,'WScript.Shell'],
['D','Source Code Editor'					,'CLSID:BCA00001-18B1-43E0-BB89-FECDDBF0472E','t/ax/editor.cab'],
['D','Microsoft XML4'						,'CLSID:88d969c0-f192-11d4-a65f-0040963251e5','t/ax/msxml4.cab'],
['D','Simple Tabular Data (TVINCULO)'	,'CLSID:333C7BC4-460F-11D0-BC04-0080C7055A83',''],
['D','Tree View Control'					,'CLSID:C74190B6-8589-11D1-B16A-00C0F0283628',''],
['D','Scroll Bar (SLIDER)'					,'CLSID:DFD181E0-5E2F-11CE-A449-00AA004A803D',''],
['D','Sprite Control'						,'CLSID:FD179533-D86E-11d0-89D6-00A0C90833E6',''],
['D','File System Object'					,'Scripting.FileSystemObject'],
['D','Internet Explorer'					,'InternetExplorer.Application'],
['D','Javascript Encoder'					,'Scripting.Encoder'],
['D','Microsoft Shell'						,'Shell.Application']
];
function init(){
doc=document;
bdy=doc.body;
var est;
for(var x=0;x<ctl.length;x++){
var c=ctl[x][2];
var tr=DR.insertRow();
var td=tr.insertCell();
if(ctl[x][0]=='U'){
td.innerText='USER';
}else{
td.innerText='DEVELOPER';
}
td=tr.insertCell();
td.innerText=ctl[x][1];
if(c.substr(0,6)!='CLSID:'){
try{
var ok = new ActiveXObject(ctl[x][2]);
var t='INSTALLED';
ok=null;
}catch(e){
var t='Not Installed';
}
td=tr.insertCell();
td.colSpan=3;
td.innerText=t;
}else{
est=newObj(x);
var tde=tr.insertCell();
tde.innerText=estado[est];
td=tr.insertCell();
if(ctl[x][3]){
var bu=doc.createElement('BUTTON');
bu.id='IN';
bu.title='Download and install';
bu.indice=x;
var im=doc.createElement('IMG');
im.src='edes.php?D:$t/g/s/download.gif';
bu.appendChild(im);
td.appendChild(bu);
}else{
td.innerHTML='&nbsp;';
}
tde.colSpan=2;
}
}
}
var ac=''.split('');
function newObj( x, inst ){
var a=doc.getElementById('dv'+x);
if(a!=null)bdy.removeChild(a);
var s='<div id=dv'+x+' style=display:none>';
s+='<object id=obj'+x+' classid="'+ ctl[x][2] +'"';
if(inst){
s+=' codebase="edes.php?D:$'+ ctl[x][3] +'"';
}
s+='></object>';
s+='</div>';
bdy.insertAdjacentHTML('BeforeEnd',s);
var z=doc.getElementById('obj'+x).readyState;
return z;
}
function chk(){
var o=S.event(window);
switch(o.id){
case 'IN':
var tr=o.parentElement.parentElement;
var td=tr.childNodes[2];
est=newObj( o.indice, 1 );
ac[ac.length]=o;
td.innerText=estado[est];
var iv=setInterval('chkst()',1000);
break;
}
}
function chkst(){
for(var x=0;x<ac.length;x++){
var z=doc.getElementById('obj'+ac[x].indice).readyState;
var tr=ac[x].parentElement.parentElement;
var td=tr.childNodes[2];
td.innerText=estado[z];
}
}
document.onclick=chk;
</script>
</HEAD>
<BODY onhelp='top.HelpIFRAME();return false;' oncontextmenu='return false;' onselectstart='return false' ondragstart='return false'>
<center>
<button onclick='init();this.style.display="none"'>Start Check</button>&nbsp;
<button onclick='location.href = location.href'>Refresh Page</button>
<br><br>
</center>
<SCRIPT type="text/javascript">
document.write("<table id=CF cellspacing=1 cellpadding=3 border=1 align=center>");
document.write("<tr><th>User Agent</th><td>"+navigator.userAgent+"</td></tr></table><br>");
document.write("<table id=PR cellspacing=1 cellpadding=3 border=1 align=center>" );
document.write( "<tr><th>PROPERTY</th><th>STATUS</th><th>CONTROL</th></tr>" );
document.write( "<tr><td>Charset</td><td>"+ document.charset+"</td><td>windows-1252</td></tr>" );
document.write( "<tr><td>Default Charset</td><td>"+document.defaultCharset+"</td><td>windows-1252</td></tr>" );
document.write( "<tr><td>Compression</td><td>Yes</td><td>Yes</td></tr>" );
document.write( "</table><br>" );
</script>
<table id=DR cellspacing=1 cellpadding=3 border=1 align=center>
<tr><th colspan=5>RESOURCES</th></tr>
</table>
</BODY>
</HTML>
<?PHP
return;
eHTML();
?>
<STYLE TYPE="text/css">
BODY {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
FONT-SIZE: 12px;
}
TABLE {
FONT-SIZE: 14px;
BGCOLOR: #66CC00;
}
TR { BGCOLOR: #FF3300; COLOR: #000000}
TD { BGCOLOR: #3366FF; COLOR: #000000 }
#CONFIG TABLE, #PROPIEDADES TABLE {
BACKGROUND: #d8dcdf;
COLOR: #0a00af;
FONT-SIZE: 100%;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #dd8800;
}
#CONFIG TH, #PROPIEDADES TH {
BACKGROUND: #000099;
COLOR: #FFFFFF;
FONT-SIZE: 100%;
PADDING-TOP: 5px;
}
#CONFIG TD, #PROPIEDADES TD{
WHITE-SPACE: nowrap;
BACKGROUND: #FFFFCC;
COLOR: #000066;
}
</STYLE>
</HEAD><BODY onhelp='top.HelpIFRAME();return false;' oncontextmenu='return false;'>
<SCRIPT type="text/javascript">
function sn( Obj ){
return((document.getElementById(Obj)==null)? '<B>No</B>':'Si');
}
function EsNull( Obj ){
return((Obj==null)? '<B>No</B>':'Si');
}
</SCRIPT>
<DIV style='display:none'>
<OBJECT id=XLS				CLASSID=CLSID:0002E510-0000-0000-C000-000000000046></OBJECT>
<OBJECT id=GRAFICAS		CLASSID=CLSID:0002E500-0000-0000-C000-000000000046></OBJECT>
<OBJECT id=TVINCULO		CLASSID=CLSID:333C7BC4-460F-11D0-BC04-0080C7055A83></OBJECT>
<OBJECT id=MENUTREE		CLASSID=CLSID:C74190B6-8589-11D1-B16A-00C0F0283628></OBJECT>
<OBJECT id=CONTROLGIF	CLASSID=CLSID:FD179533-D86E-11d0-89D6-00A0C90833E6></OBJECT>
<OBJECT id=CM				CLASSID=CLSID:BCA00001-18B1-43E0-BB89-FECDDBF0472E></OBJECT>
<OBJECT id=XML				CLASSID=CLSID:88d969c0-f192-11d4-a65f-0040963251e5></OBJECT>
</DIV>
<SCRIPT type="text/javascript">
var oIE = new ActiveXObject('InternetExplorer.Application');
var oEA = new ActiveXObject('Excel.Application');
var oSA = new ActiveXObject('Shell.Application');
var oWS = new ActiveXObject('WScript.Shell');
var oSF = new ActiveXObject('Scripting.FileSystemObject');
var oSE = new ActiveXObject('Scripting.Encoder');
</SCRIPT>
<center>
<?PHP
$Agente = $_SERVER['HTTP_USER_AGENT'];
echo '<table id=CONFIG cellspacing=1 cellpadding=3 border=1>';
echo "<tr><th> Agente </th><td>{$Agente}</td></tr>";
echo '</table><br>';
?>
<SCRIPT type="text/javascript"><?PHP
function _TieneGZip(){
if( strpos($_SERVER['HTTP_ACCEPT_ENCODING'],'x-gzip') !== false) return true;
if( strpos($_SERVER['HTTP_ACCEPT_ENCODING'],'gzip'  ) !== false) return true;
return false;
}?>
document.write( "<table id=PROPIEDADES cellspacing=1 cellpadding=3 border=1>" );
document.write( "<tr><th>	PROPIEDAD			</th><th>ESTADO							  </th><th>CONTROL		</th></tr>" );
document.write( "<tr><td>	Charset				</td><td>"+ document.charset			+"</td><td>windows-1252	</td></tr>" );
document.write( "<tr><td>	Default Charset	</td><td>"+ document.defaultCharset	+"</td><td>windows-1252	</td></tr>" );
document.write( "<tr><td>	Compresión			</td><td><?= ((_TieneGZip())? 'Si':'No'); ?></td><td>Si				</td></tr>" );
document.write( "</table><br>" );
document.write( "<table id=CONFIG cellspacing=1 cellpadding=3 border=1>" );
document.write( "<tr><th colspan=2>	RECURSOS USUARIO	</th></tr>" );
document.write( "<tr><td>	Excel						</td><td>"+ sn('XLS')			+"</td></tr>" );
document.write( "<tr><td>	Excel-2					</td><td>"+ EsNull(oEA)			+"</td></tr>" );
document.write( "<tr><td>	Gráficas					</td><td>"+ sn('GRAFICAS')		+"</td></tr>" );
document.write( "<tr><td>	Tablas Vinculadas		</td><td>"+ sn('TVINCULO')		+"</td></tr>" );
document.write( "<tr><td>	Control del GIF		</td><td>"+ sn('CONTROLGIF')	+"</td></tr>" );
document.write( "<tr><td>	Control de Impresora	</td><td>"+ sn('IMPRESORA')	+"</td></tr>" );
document.write( "<tr><td>	Explorer					</td><td>"+ EsNull(oIE)			+"</td></tr>" );
document.write( "<tr><td>	Shell						</td><td>"+ EsNull(oSA)			+"</td></tr>" );
document.write( "<tr><td>	Shell-2					</td><td>"+ EsNull(oWS)			+"</td></tr>" );
document.write( "<tr><td>	Sistema de Ficheros	</td><td>"+ EsNull(oSF)			+"</td></tr>" );
document.write( "<tr><th colspan=2>	RECURSOS DESARROLLADOR	</th></tr>" );
document.write( "<tr><td>	Arbol de etiquetas	</td><td>"+ sn('MENUTREE')		+"</td></tr>" );
document.write( "<tr><td>	Tabla de Colores		</td><td>"+ sn('COLORES')		+"</td></tr>" );
document.write( "<tr><td>	* Editor					</td><td>"+ sn('CM')				+"</td></tr>" );
document.write( "<tr><td>	* EditorXML				</td><td>"+ sn('XML')			+"</td></tr>" );
document.write( "<tr><td>	Encoder JS				</td><td>"+ EsNull(oSE)			+"</td></tr>" );
</SCRIPT>
</TABLE>
</CENTER>
</BODY></HTML>
<?PHP
}
function EditaPhpIni(){
eHTML();
?>
<style>
TEXTAREA {
SCROLLBAR-3DLIGHT-COLOR: #687074;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #a2b0b7;
SCROLLBAR-DARKSHADOW-COLOR: #687074;
SCROLLBAR-FACE-COLOR: #a2b0b7;
SCROLLBAR-HIGHLIGHT-COLOR: #a2b0b7;
SCROLLBAR-SHADOW-COLOR: #a2b0b7;
SCROLLBAR-TRACK-COLOR: #d4dfe4;
}
</style>
</head>
<body scroll=no style="margin:0" onhelp="top.HelpIFRAME();return false;" oncontextmenu="return false;">
<?PHP
ob_start();
phpinfo(INFO_GENERAL);
$string = ob_get_contents();
ob_end_clean();
$tmp = explode('(php.ini)', $string);
$tmp = explode('</td>', $tmp[1]);
$tmp = explode('>', $tmp[1]);
$Dir = trim($tmp[1]);
$Dir= str_replace('\\','/',$Dir);
$NomFile = $Dir . ((strstr($Dir,'/php.ini')) ? '':'/php.ini');
$Dim = file( $NomFile );
echo '<TEXTAREA NAME="txt" style="border:0px;margin-left:3px;width:100%;height:100%" READONLY WRAP=off>';
for( $n=0; $n<count($Dim); $n++ ) echo htmlspecialchars( $Dim[$n] );
echo '</TEXTAREA>';
echo '</body></html>';
}
function EditaHttpdCnf(){
global $_Web_;
eHTML();
?>
<style>
TEXTAREA {
SCROLLBAR-3DLIGHT-COLOR: #687074;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #a2b0b7;
SCROLLBAR-DARKSHADOW-COLOR: #687074;
SCROLLBAR-FACE-COLOR: #a2b0b7;
SCROLLBAR-HIGHLIGHT-COLOR: #a2b0b7;
SCROLLBAR-SHADOW-COLOR: #a2b0b7;
SCROLLBAR-TRACK-COLOR: #d4dfe4;
}
</style>
</head>
<body scroll=no style="margin:0px" onhelp="top.HelpIFRAME();return false;" oncontextmenu="return false;">
<?PHP
$DirHttpdconf = '';
if( $_Web_!='' ){
chdir('../../');
include($_Web_.'/_doc_/install.ini');
}
echo '<table border=0 cellspacing=0 cellpadding=0 width=100% height=100%><tr><td>';
if( $DirHttpdconf == '' ){
$matriz = get_defined_vars();
if( strpos( $matriz["_"], 'apache'  ) === false ){
$Dir = '/';
}else{
$Dir = substr( $matriz["_"],0, strpos( $matriz["_"], '/', strpos( $matriz["_"], 'apache' ) ) );
}
$DirHttpdconf = '';
if( strtoupper(substr(PHP_OS,0,3)) == 'LIN' || strtoupper(substr(PHP_OS,0,3)) == 'UNI' ){
$resultado = exec('find '.$Dir.' -name httpd.conf -print', $DimSalida );
for( $n=0; $n<count($DimSalida); $n++ ){
if( substr_count($DimSalida[$n],':') == 0 ){
if( substr_count($DimSalida[$n],'apache') == 1 ){
$DirHttpdconf = $DimSalida[$n];
echo $DirHttpdconf.'<br>';
}
}
}
}else if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
$Unidad = substr( eGetCWD(),0,2);
$resultado = exec('dir \httpd.conf /s', $DimSalida );
for( $n=0; $n<count($DimSalida); $n++ ){
if( substr_count($DimSalida[$n],'httpd.conf') == 1 ){
$DirHttpdconf = str_replace('\\','/',strstr($DimSalida[$n-2],$Unidad)).'/httpd.conf';
echo $DirHttpdconf.'<br>';
}
}
}else{
exit;
}
}
echo '<tr><td width=100% height=100%>';
if( $DirHttpdconf != '' ){
$Dim = file( $DirHttpdconf );
echo '<TEXTAREA NAME="txt" style="border:0px;margin-left:3px;width:100%;height:100%" WRAP=off>';
for( $n=0; $n<count($Dim); $n++ ) echo htmlspecialchars( $Dim[$n] );
echo '</TEXTAREA>';
}else{
echo 'No se ha encontrado el fichero para visualizar';
}
echo '</table>';
echo '</body></html>';
}
function EditarFichero( $File ){
global $_Web_;
chdir("../../{$_Web_}/http/");
eHTML();
?>
<style>
TEXTAREA {
SCROLLBAR-3DLIGHT-COLOR: #687074;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #a2b0b7;
SCROLLBAR-DARKSHADOW-COLOR: #687074;
SCROLLBAR-FACE-COLOR: #a2b0b7;
SCROLLBAR-HIGHLIGHT-COLOR: #a2b0b7;
SCROLLBAR-SHADOW-COLOR: #a2b0b7;
SCROLLBAR-TRACK-COLOR: #d4dfe4;
}
</style>
<SCRIPT type="text/javascript">
top.S.init(window);
function UnZip(){
var txt = unescape( document.forms[0].txt.value );
txt = txt.replace(/&nbsp;/g,'&nbsp;');
txt = txt.replace(/&#46;/g, '&#46;');
txt = txt.replace(/&#44;/g, '&#44;');
txt = txt.replace(/&#35;/g, '&#35;');
txt = txt.replace(/##32;/g, ' ');
txt = txt.replace(/&#13;/g, '&#13;');
txt = txt.replace(/&#10;/g, '&#10;');
document.forms[0].txt.value = txt;
top.document.getElementById("GRABAR").style.display = 'block';
}
function Grabar(){
document.forms[0].txt.style.display = 'none';
var txt = document.forms[0].txt.value;
txt = txt.replace('&nbsp;','&nbsp;');
txt = txt.replace('&#46;','&#46;');
txt = txt.replace('&#44;','&#44;');
txt = txt.replace('&#35;','&#35;');
txt = txt.replace('&#13;','&#13;');
txt = txt.replace('&#10;','&#10;');
txt = escape(txt);
document.forms[0].txt.value = txt;
document.forms[0].submit();
}
function AnulaKey( Obj ){
var Mas = '', Ok = 0;
if( Obj.altKey ) Mas = 'a';
if( Obj.ctrlKey ) Mas = 'c';
if( Obj.shiftLeft ) Mas = 's';
if( ',114,122,a39,a37,a8,c72,c79,c76,c73,c81,c85,s121,'.indexOf(','+Mas+Obj.keyCode+',') != -1 ){
Ok = 1;
}else if( ',93,a36,'.indexOf(','+Mas+Obj.keyCode+',') != -1 ){
Ok = 2;
}
if( Ok > 0 ){
Obj.keyCode = 0;
Obj.cancelBubble = true;
Obj.returnValue = false;
if( Ok==2 ) alert('Acción no permitida');
return true;
}
return false;
}
function PonTab(){
if( AnulaKey( event ) ) return false;
if( S.eventCode(event) == 9 ){
if( !event.shiftKey ){
try{ event.keyCode = 0; }catch(e){}
var obj = document.selection.createRange();
obj.text = String.fromCharCode(9);
}
event.returnValue = false;
return false;
}
AnulaKey(event);
}
</SCRIPT>
</head>
<body scroll=no style="margin:0px" onload="UnZip()" onhelp="top.HelpIFRAME();return false;" oncontextmenu="return false;">
<FORM METHOD=POST ACTION="edes.php?E:$t/cr.gs" style="width:100%;height:100%">
<INPUT TYPE="HIDDEN" NAME="GRABAR" VALUE="<?= $File; ?>">
<TEXTAREA NAME="txt" style="border:0px;margin-left:3px;width:100%;height:100%" WRAP=off onkeydown='PonTab()'><?PHP
$File = eScript($File);
$Todo = '';
if( file_exists( $File ) ){
$fd = fopen( $File, 'r' );
$Todo = fread( $fd, filesize($File) );
fclose($fd);
}
$Todo = str_replace( '&nbsp;','&nbsp;', $Todo );
$Todo = str_replace( '&#46;','&#46;', $Todo );
$Todo = str_replace( '&#44;','&#44;', $Todo );
$Todo = str_replace( '&#35;','&#35;', $Todo );
$Todo = str_replace( '&#13;','&#13;', $Todo );
$Todo = str_replace( '&#10;','&#10;', $Todo );
$Todo = str_replace( ' ','##32;', $Todo );
$Todo = urlencode( $Todo );
echo $Todo;
echo '</TEXTAREA></FORM></BODY></HTML>';
}
function GrabarFichero( $File, $Doc ){
global $_Web_;
chdir("../../{$_Web_}/http/");
$Doc = str_replace( '+','%2B', $Doc );
$Doc = urldecode($Doc);
$Doc = str_replace( '&nbsp;','&nbsp;', $Doc );
$Doc = str_replace( '&#46;' ,'&#46;' , $Doc );
$Doc = str_replace( '&#44;' ,'&#44;' , $Doc );
$Doc = str_replace( '&#35;' ,'&#35;' , $Doc );
$Doc = str_replace( '&#13;' ,'&#13;' , $Doc );
$Doc = str_replace( '&#10;' ,'&#10;' , $Doc );
$Doc = str_replace( chr(13) ,''      , $Doc );
$File = eScript($File);
$fd = fopen( $File, 'w' );
fputs( $fd, $Doc );
fclose($fd);
eInclude('message');
eMessage('','HS','','alert("Grabado");');
exit;
}
function EditaSQL( $File ){
global $_Web_;
$dir = getCWD();
chdir("../../{$_Web_}/http/");
eHTML();
?>
<style>
TEXTAREA {
SCROLLBAR-3DLIGHT-COLOR: #687074;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #a2b0b7;
SCROLLBAR-DARKSHADOW-COLOR: #687074;
SCROLLBAR-FACE-COLOR: #a2b0b7;
SCROLLBAR-HIGHLIGHT-COLOR: #a2b0b7;
SCROLLBAR-SHADOW-COLOR: #a2b0b7;
SCROLLBAR-TRACK-COLOR: #d4dfe4;
}
</style>
<SCRIPT type="text/javascript">
top.S.init(window);
function UnZip(){
var txt = unescape( document.forms[0].txt.value );
txt = txt.replace(/&nbsp;/g,'&nbsp;');
txt = txt.replace(/&#46;/g, '&#46;');
txt = txt.replace(/&#44;/g, '&#44;');
txt = txt.replace(/&#35;/g, '&#35;');
txt = txt.replace(/##32;/g, ' ');
txt = txt.replace(/&#13;/g, '&#13;');
txt = txt.replace(/&#10;/g, '&#10;');
document.forms[0].txt.value = txt;
top.document.getElementById("GRABAR").style.display = 'block';
}
function Grabar(){
document.forms[0].txt.style.display = 'none';
var txt = document.forms[0].txt.value;
txt = txt.replace('&nbsp;','&nbsp;');
txt = txt.replace('&#46;','&#46;');
txt = txt.replace('&#44;','&#44;');
txt = txt.replace('&#35;','&#35;');
txt = txt.replace('&#13;','&#13;');
txt = txt.replace('&#10;','&#10;');
txt = escape(txt);
document.forms[0].txt.value = txt;
document.forms[0].submit();
}
function AnulaKey( Obj ){
var Mas = '', Ok = 0;
if( Obj.altKey ) Mas = 'a';
if( Obj.ctrlKey ) Mas = 'c';
if( Obj.shiftLeft ) Mas = 's';
if( ',114,122,a39,a37,a8,c72,c79,c76,c73,c81,c85,s121,'.indexOf(','+Mas+Obj.keyCode+',') != -1 ){
Ok = 1;
}else if( ',93,a36,'.indexOf(','+Mas+Obj.keyCode+',') != -1 ){
Ok = 2;
}
if( Ok > 0 ){
S.eventClear(window);
return true;
}
return false;
}
function PonTab(){
if( AnulaKey( event ) ) return false;
if( S.eventCode(event) == 9 ){
if( !event.shiftKey ){
try{ event.keyCode = 0; }catch(e){}
var obj = document.selection.createRange();
obj.text = String.fromCharCode(9);
}
event.returnValue = false;
return false;
}
AnulaKey(event);
}
</SCRIPT>
</head>
<body scroll=no style="margin:0px" onload="UnZip()" onhelp="top.HelpIFRAME();return false;" oncontextmenu="return false;">
<FORM METHOD=POST ACTION="edes.php?E:$t/cr.gs" style="width:100%;height:100%">
<TEXTAREA NAME="txt" style="border:0px;margin-left:3px;width:100%;height:100%" WRAP=off onkeydown='PonTab()'><?PHP
$Todo = '';
$File = eScript('/_doc_/tbl/_install_es.sql');
if( file_exists( $File ) ){
$fd = fopen( $File, 'r' );
$Todo = fread( $fd, filesize($File) );
fclose($fd);
}
$Todo = str_replace( '&nbsp;','&nbsp;', $Todo );
$Todo = str_replace( '&#46;','&#46;', $Todo );
$Todo = str_replace( '&#44;','&#44;', $Todo );
$Todo = str_replace( '&#35;','&#35;', $Todo );
$Todo = str_replace( '&#13;','&#13;', $Todo );
$Todo = str_replace( '&#10;','&#10;', $Todo );
$Todo = str_replace( ' ','##32;', $Todo );
$Todo = urlencode( $Todo );
echo $Todo;
echo '</TEXTAREA></FORM></BODY></HTML>';
}
function GrabaSQL( $Doc ){
global $_Web_;
chdir("../../{$_Web_}/http/");
$Doc = str_replace( '+','%2B', $Doc );
$Doc = urldecode($Doc);
$Doc = str_replace( '&nbsp;','&nbsp;', $Doc );
$Doc = str_replace( '&#46;' ,'&#46;' , $Doc );
$Doc = str_replace( '&#44;' ,'&#44;' , $Doc );
$Doc = str_replace( '&#35;' ,'&#35;' , $Doc );
$Doc = str_replace( '&#13;' ,'&#13;' , $Doc );
$Doc = str_replace( '&#10;' ,'&#10;' , $Doc );
$Doc = str_replace( chr(13) ,''      , $Doc );
$File = eScript('/_doc_/tbl/_install_es.sql');
$fd = fopen( $File, 'w' );
fputs( $fd, $Doc );
fclose($fd);
echo '<script type="text/javascript">alert("Grabado");</script>';
exit;
}
function VerEDesSQL(){
global $_Web_;
eHTML();
?>
<style>
TEXTAREA {
SCROLLBAR-3DLIGHT-COLOR: #687074;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #a2b0b7;
SCROLLBAR-DARKSHADOW-COLOR: #687074;
SCROLLBAR-FACE-COLOR: #a2b0b7;
SCROLLBAR-HIGHLIGHT-COLOR: #a2b0b7;
SCROLLBAR-SHADOW-COLOR: #a2b0b7;
SCROLLBAR-TRACK-COLOR: #d4dfe4;
}
</style>
</head>
<body scroll=no style="margin:0px" onhelp="top.HelpIFRAME();return false;" oncontextmenu="return false;">
<?PHP
include( "../../{$_Web_}/_doc_/install.ini" );
if( $DataBase=='' ) txtError('No se ha definido el tipo de base de datos.');
$Dim = file( "../../{$_Web_}/_doc_/tbl/_edes_{$DataBase}.sql" );
echo '<TEXTAREA NAME="txt" style="border:0px;margin-left:3px;width:100%;height:100%" READONLY WRAP=off>';
for( $n=0; $n<count($Dim); $n++ ) echo htmlspecialchars( $Dim[$n] );
echo '</TEXTAREA>';
echo '</body></html>';
}
function VerFichero( $file ){
eHTML();
?>
<style>
TEXTAREA {
SCROLLBAR-3DLIGHT-COLOR: #687074;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #a2b0b7;
SCROLLBAR-DARKSHADOW-COLOR: #687074;
SCROLLBAR-FACE-COLOR: #a2b0b7;
SCROLLBAR-HIGHLIGHT-COLOR: #a2b0b7;
SCROLLBAR-SHADOW-COLOR: #a2b0b7;
SCROLLBAR-TRACK-COLOR: #d4dfe4;
}
</style>
</head>
<body scroll=no style="margin:0px" onhelp="top.HelpIFRAME();return false;" oncontextmenu="return false;">
<?PHP
$Dim = file( $file );
echo '<TEXTAREA NAME="txt" style="border:0px;margin-left:3px;width:100%;height:100%" READONLY WRAP=VIRTUAL>';
for( $n=0; $n<count($Dim); $n++ ) echo htmlspecialchars( $Dim[$n] );
echo '</TEXTAREA>';
echo '</body></html>';
}
function EditaINI( $File ){
$File = str_replace('/','',str_replace('\\','',$File));
eHTML();
?>
<style>
TEXTAREA {
SCROLLBAR-3DLIGHT-COLOR: #687074;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #a2b0b7;
SCROLLBAR-DARKSHADOW-COLOR: #687074;
SCROLLBAR-FACE-COLOR: #a2b0b7;
SCROLLBAR-HIGHLIGHT-COLOR: #a2b0b7;
SCROLLBAR-SHADOW-COLOR: #a2b0b7;
SCROLLBAR-TRACK-COLOR: #d4dfe4;
}
</style>
</head>
<body scroll=no style="margin:0px" onhelp="top.HelpIFRAME();return false;" oncontextmenu="return false;">
<?PHP
if( $File == 'master.txt' ){
$File = '../tree/'.$File;
}else if( $File == 'edes.ini' ){
$File = '../_d_/cnf/'.$File;
}else{
$File = '../_datos/config/'.$File;
}
$Dim = file( $File );
echo '<TEXTAREA NAME="txt" style="border:0px;margin-left:3px;width:100%;height:100%" WRAP=off>';
for( $n=0; $n<count($Dim); $n++ ) echo htmlspecialchars( $Dim[$n] );
echo $File;
echo '</TEXTAREA>';
echo '</body></html>';
}
function CrearMaqueta(){
global $_Web_;
chdir("../../{$_Web_}/http/");
global $_NErrores;
set_time_limit( 60*5 );
$_NErrores = 0;
eHTML();
echo '<style> TABLE { FONT-FAMILY: ARIAL; FONT-SIZE: 16px; } </STYLE>';
echo '</head>';
echo '<body scroll=auto style="margin:0" onhelp="return false;" oncontextmenu="return false;">';
if( !file_exists( '../_doc_/install.on' ) ){
txtError('ERROR para Crear MAQUETA, la Web tiene que estar "BLOQUEADA"' );
die('</body></html>');
}
$PathDir = array(
'_bak_',
'_bak_/_bp',
'_bak_/update',
'_version_',
'_d_',
'_d_/cfg',
'_d_/cvs',
'_d_/log',
'_d_/usr',
'_datos',
'_datos/chat',
'_datos/config',
'_datos/exp',
'_datos/poll',
'_datos/portfolio',
'_datos/tsk',
'_datos/usr',
'_doc_',
'_doc_/edf',
'_doc_/gif',
'_doc_/htm',
'_doc_/ind',
'_doc_/org',
'_doc_/str',
'_doc_/tbl',
'_doc_/txt',
'_doc_/xls',
'_tmp',
'_tmp/cch',
'_tmp/err',
'_tmp/exc',
'_tmp/exp',
'_tmp/ext',
'_tmp/imp',
'_tmp/lcl',
'_tmp/log',
'_tmp/pdf',
'_tmp/php',
'_tmp/sess',
'_tmp/zip',
'd',
'd/_hito',
'help',
'help/doc',
'help/tip',
'http',
'http/charts',
'http/charts/charts_library',
'http/css',
'http/fonts',
'http/g',
'http/g/logos',
'http/i',
'http/img',
'lib',
'tree'
);
$_DirDestino = $_Web_;
chdir('../../');
global $DefTextArea, $WrapInputext, $AddDefTable;
if( !file_exists( $_DirDestino.'/_doc_/install.ini' ) ) txtError('Fichero no encontrado "'.$_DirDestino.'/_doc_/install.ini'.'" entando en "'.getCWD().'"');
if( !is_readable( $_DirDestino.'/_doc_/install.ini' ) ) txtError('Fichero no de lectura "'.$_DirDestino.'/_doc_/install.ini'.'" entando en "'.getCWD().'"');
$php_errormsg = '';
include($_DirDestino.'/_doc_/install.ini');
if( $php_errormsg != '' ){
txtError('Directorio actual: '.getCWD());
txtError($_DirDestino.'/_doc_/install.ini: '.$php_errormsg);
exit;
}
global $_Opciones, $_NomOpcion, $_ModOpcion;
if( $Empresa		=='' ) txtError('Falta introducir "Empresa"');
if( $TituloApli		=='' ) txtError('Falta introducir "Título aplicación"');
if( $SubTituloApli	=='' ) txtError('Falta introducir "SubTítulo aplicación"');
if( $DirWeb			=='' ) txtError('Falta introducir "Dirección web"');
if( $DataBase		=='' ) txtError('Falta introducir "Base de datos"');
if( $HostName		=='' ) txtError('Falta introducir "Host"');
if( $Diccionario	=='' ) txtError('Falta introducir "Diccionario de datos"');
if( $Usuario		=='' ) txtError('Falta introducir "Usuario"');
if( $Password		=='' ) txtError('Falta introducir "Password"');
if( $MasterUserName	=='' ) txtError('Falta introducir "MasterUserName"');
if( $MasterEMail	=='' ) txtError('Falta introducir "MasterEMail"');
if( $Opciones		=='' ) txtError('Falta introducir "Orden de las opciones"');
if( $DataBase		== 'oracle' && $CreateDatabase ) txtError('Cuando la "Base de datos" es Oracle tiene que estar creada y la opción desactivada');
if( !file_exists( $_DirDestino.'/_doc_/tbl/_install_es.sql' ) ){
txtError('Falta definir la estructura SQL de la aplicación');
die('</body></html>');
}else{
$ConSolapa = false;
$ConTabla = false;
$Dim = file($_DirDestino.'/_doc_/tbl/_install_es.sql');
for( $n=0; $n<count($Dim); $n++ ){
if( strtoupper(substr($Dim[$n],0,13)) == 'CREATE TABLE ' ){
if( !$ConSolapa ) txtError('La definición de la solapa "#Tab:" tiene que estar antes del "CREATE TABLE"');
$ConTabla = true;
}
if( strtoupper(substr($Dim[$n],0,8)) == '#SOLAPA:' || strtoupper(substr($Dim[$n],0,5)) == '#TAB:' ) $ConSolapa = true;
}
if( !$ConTabla  ) txtError('Falta definir las tablas de la aplicación');
if( !$ConSolapa ) txtError('Falta definir como mínimo una solapa "#Tab:"');
}
if( substr_count($Opciones,':') != 1 ) txtError('ERROR en "Orden de las opciones" falta el delimitador ":"');
list( $_Opciones, $Dim ) = explode(':',$Opciones);
$test['I'] = 'X';
$test['B'] = 'X';
$test['C'] = 'X';
$test['M'] = 'X';
$test['L'] = 'X';
for( $n=0; $n<count($_Opciones); $n++ ){
if( $test[substr($_Opciones,$n,1)] == 'Y' ){
txtError('ERROR en "Orden de las opciones" el modo ".substr($_Opciones,$n,1)." está repetido');
}else if( $test[substr($_Opciones,$n,1)] != 'X' ){
txtError('ERROR en "Orden de las opciones" el modo ".substr($_Opciones,$n,1)." no existe');
}else{
$test[substr($_Opciones,$n,1)] = 'Y';
}
}
$_Opciones = strtoupper(trim($_Opciones));
if( substr_count($Dim,',')+1 != strlen($_Opciones) ) txtError('ERROR en "Orden de las opciones" no concuerdan las Opciones con los literales');
$tmp = explode(',',$Dim);
for( $n=0; $n<count($tmp); $n++ ){
$_NomOpcion[substr($_Opciones,$n,1)] = trim($tmp[$n]);
$_ModOpcion[substr($_Opciones,$n,1)] = ( (substr($_Opciones,$n,1)=='L') ? '=' : '#' );
}
$Idioma		= 'es';
$ColorBase	= 'A';
if( $Desktop > 1 ){
$GLOBALS['_IMG_OPTION'] = '{g/tab.gif} ';
}else{
$GLOBALS['_IMG_OPTION'] = '{g/menu_0.gif} ';
}
if( $WrapInputext < 50 ) txtError('La longitud de "Wrap en INPUTEXT" no puede ser menor de 50');
if( strlen($DefPassword) < 5 ) txtError('ERROR La longitud de "Password por defecto de la aplicación" tiene que ser mayor de 5' );
$_NErrores += StoreCheck( $_DirDestino.'/_doc_/tbl/_install_es.sql' );
if( $_NErrores > 0 ) die('</body></html>');
global $_Sql, $_DirFCH, $_DimTabla, $_DimTablaUnique, $SeCreoSolapa;
$_Sql = $DataBase;
$_DirFCH = $_DirDestino.'/d/';
$_DimTabla = array();
$_DimTablaUnique = array();
$_DimCampo = array();
$_Limit = 400;
$_Trace['G'] = ''; $_Trace['F'] = ''; $_Trace['L'] = '';
$_Estadistica = $_Development = false;
$_Depurar = 0;
$SeCreoSolapa = false;
global $_SL, $_ST, $Rastro;
$_SL = '<br>';
$_SL = "\n";
$_ST = " ";
$Rastro = false;
global $_opCreaDicccionario, $_opCreaTablas, $_opCargaAux, $_opCreaDirBase, $_opCreaDirectorios, $_opCreaArbol, $_opCreaFCH;
$_opCreaDicccionario = $CreateDatabase;
$_opCreaTablas			= $CreateTablas;
$_opCargaAux			= 0;
$_opCreaDirBase		= 1;
$_opCreaDirectorios	= 1;
$_opCreaArbol			= $CreateTree;
$_opCreaFCH				= $CreateDF;
global $_Tipos;
$_Tipos = array();
ControladorSQL( $DataBase );
InitHTML();
global $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario;
$_SqlHostName = $HostName;
$_SqlUsuario = $Usuario;
$_SqlPassword = $Password;
$_SqlDiccionario = $Diccionario;
global $_DEBUG, $_HndDB, $_Development;
$_Development = true;
echo '<table width="100%" border=1px cellspacing=0px cellpadding=0px>';
TestDB( $DataBase, $HostName, $Usuario, $Password, $Diccionario );
if( $_opCreaDirBase ){
MemDir( $_DirDestino.'/_doc_/tbl/_install_es.sql', $PathDir );
CrearDirBase( $_DirDestino, $PathDir );
}
CopiaContenidos( $_DirDestino.'/' );
if( $CreateDatabase ){
CrearBD( $DataBase, $HostName, $Usuario, $Password, $Diccionario );
}else{
$_HndDB = ConectarBD( $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword );
}
if( $CreateTablas ){
include( 'edesweb/'.$DataBase.'.inc' );
$_DimESTRUCTURA = array();
global $_DimESTRUCTURA;
global $__DirDestino__;
global $_Importar;
$__DirDestino__ = $_DirDestino;
unlink( $_DirDestino.'/_doc_/tbl/_tmp.ent' );
unlink( $_DirDestino.'/_doc_/tbl/_tmp.sql' );
unlink( $_DirDestino.'/tree/master.txt' );
clearstatcache();
MemTABLAS( $_DirDestino."/_doc_/tbl/_edes_{$_Sql}.sql" );
MemTABLAS( $_DirDestino.'/_doc_/tbl/_install_es.sql'	);
MemFIELDS( $_DirDestino.'/_doc_/tbl/_install_es.sql'	);
MemFIELDS( $_DirDestino.'/_doc_/tbl/_tmp.ent'		);
MemTABLAS( $_DirDestino.'/_doc_/tbl/_tmp.sql'		);
CreaTablasEDES( $_DirDestino.'/' );
GeneraRegistros( $DefPassword, $LoginType, $MasterUserName, $MasterEMail );
CreaTablasWEB( $_DirDestino.'/' );
CargaTablasAUX( $_DirDestino.'/', $Diccionario );
}
FicherosINI( $_DirDestino.'/', $DataBase, $HostName, $Usuario, $Password, $Diccionario, $Empresa, $TituloApli, $SubTituloApli, $DefPassword, $DirWeb, $LoginType, $Desktop, $PCDirApp, $TitleLauncher, $Shortcut, $ShortcutGroup );
IndexHTML( $_DirDestino.'/', $Empresa, $DirWeb );
TraceVersion( $_DirDestino.'/' );
$txt =	"TIPO	LOGIN	CLAVE	ACCESO	LOGEAR	EMAIL	iTools	Edit	Help	Shell	Icon	Create	Tools	Tree	FTP	".
chr(10).
"Analista	[USERNAME]	No	Si	No	[EMAIL]	3	3	3	6	3	3	3	Si	3	";
$txt = str_replace(
array(   "[USERNAME]" ,  "[EMAIL]"   ),
array( $MasterUserName, $MasterEMail ),
$txt
);
UsuariosSave($txt);
echo "<TR><TH colspan=3 id=FIN class=GRUPO style='text-align:center'>- INTRANET CREADA -</TH>";
echo '</TABLE>';
echo '<script type="text/javascript">';
echo 'top.SetMenus(3);';
echo 'document.body.scrollTop = document.body.scrollHeight+"px";';
echo '</SCRIPT>';
die('</body></html>');
}
function txtError( $txt ){
global $_NErrores;
$_NErrores++;
if( $_NErrores==1 ) echo '<BR><FONT COLOR="red"><B><U>ERRORES</U></B></FONT><br><BR>';
echo $txt.'<br>';
}
function InitHTML(){
eHTML('','','GenWeb');
?>
<style>
#0  { padding-left:  10px; color: #000099; }
#1  { padding-left:  40px; color: #000099; }
#2  { padding-left:  70px; color: #000099; }
#3  { padding-left: 100px; color: #000099; }
#4  { padding-left: 130px; color: #000099; }
#5  { padding-left: 160px; color: #000099; }
#0c { padding-left:  10px; color: red; }
#1c { padding-left:  40px; color: red; }
#2c { padding-left:  70px; color: red; }
#3c { padding-left: 100px; color: red; }
#4c { padding-left: 130px; color: red; }
#5c { padding-left: 160px; color: red; }
TH { background: #cccccc; text-align: left; }
TD { background: #FFFFCC; }
#c { text-align: center; }
#d { text-align: right; }
#E { background: #FF0000; color: #9900CC; padding-left: 10px; }
.GRUPO {
background: #000099;
color:#FFFFFF;
}
</style>
<SCRIPT type="text/javascript">
top.S.init(window);
</SCRIPT>
</HEAD>
<BODY style='margin:0px; font-family: ARIAL;' onhelp='return false;' oncontextmenu='return false;'>
<?PHP
}
function TestDB( $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario ){
global $_DEBUG;
$Pass = $_SqlPassword;
if( strlen($Pass)>8 && substr($Pass,0,8)==dechex(crc32(substr($Pass,8))) ) $Pass = gzuncompress(base64_decode(substr($Pass,8)));
if( eSqlType('mysql') ){
$_HndDB = mysql_connect( $_SqlHostName, $_SqlUsuario, $Pass );
if( !$_HndDB ){
echo "<TR><TD id=E>ERROR al conectar con DB";
if( mysql_error()!='' ) echo "<TR><TD id=E>".mysql_error();
echo "<TR><TD id=E>Host: <B>{$_SqlHostName}</B>, Usuario: <B>{$_SqlUsuario}</B>, Password: <B>{$_SqlPassword}</B>";
echo '</TABLE></BODY></HTML>';
exit;
}
mysql_close( $_HndDB );
}else if( eSqlType('mysqli') ){
$_HndDB = mysqli_connect( $_SqlHostName, $_SqlUsuario, $Pass, $_SqlDiccionario );
if( !$_HndDB ){
echo "<TR><TD id=E>ERROR al conectar con DB";
if( mysqli_error()!='' ) echo "<TR><TD id=E>".mysqli_error();
echo "<TR><TD id=E>Host: <B>{$_SqlHostName}</B>, Usuario: <B>{$_SqlUsuario}</B>, Password: <B>{$_SqlPassword}</B>";
echo '</TABLE></BODY></HTML>';
exit;
}
mysqli_close( $_HndDB );
}else if( eSqlType('informix')){
putenv( 'INFORMIXDIR=/opt/informix' );
$Dir = getenv('INFORMIXDIR');
putenv( "PATH=".getenv("PATH").":{$Dir}/bin" );
putenv( "LD_LIBRARY_PATH={$Dir}/lib:{$Dir}/lib/esql" );
putenv( "INFORMIXSERVER={$_SqlHostName}" );
putenv( "GL_DATE=%d-%m-%Y" );
putenv( "DBDATE=DMY4-" );
$aux = $_SqlDiccionario."@".getenv( "INFORMIXSERVER" );
$_HndDB = ifx_connect( $aux, $_SqlUsuario, $Pass );
if( !$_HndDB ){
echo "<TR><TD id=E>ERROR al conectar con DB";
echo "<TR><TD id=E>".trim(ifx_error()).' : '.trim(ifx_errormsg($_HndDB));
echo "<TR><TD id=E>Host: <B>{$aux}</B>, Usuario: <B>{$_SqlUsuario}</B>, Password: <B>{$_SqlPassword}</B>";
echo '</TABLE></BODY></HTML>';
exit;
}
ifx_close( $_HndDB );
}else if( eSqlType('oracle')){
$sDEBUG = $_DEBUG;
$_DEBUG = 30;
$_HndDB = ocilogon( $_SqlUsuario, $Pass, $_SqlHostName, OCI_SYSDBA );
if( !$_HndDB ){
echo "<TR><TD id=E>ERROR al conectar con DB";
echo "<TR><TD id=E>".trim(ocierror());
echo "<TR><TD id=E>Host: <B>{$_SqlHostName}</B>, Usuario: <B>{$_SqlUsuario}</B>, Password: <B>{$_SqlPassword}</B>";
echo '</TABLE></BODY></HTML>';
exit;
}
OCILogOff( $_HndDB );
$_DEBUG = $sDEBUG;
}
}
function CrearBD( $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario ){
echo "<TR><TH colspan=3 id=c class=GRUPO>CREANDO BASE DE DATOS '".$_SqlDiccionario."'</TH>";
if( eSqlType('mysql,mysqli') ){
$Pass = $_SqlPassword;
if( strlen($Pass)>8 && substr($Pass,0,8)==dechex(crc32(substr($Pass,8))) ) $Pass = gzuncompress(base64_decode(substr($Pass,8)));
echo "<TR><TD id=0 colspan=3>Conectando como: ".$_SqlHostName.'-'.$_SqlUsuario.'-'.$Pass;
$_HndDB = mysql_connect( $_SqlHostName, $_SqlUsuario, $Pass );
if( !$_HndDB ){
echo "<TR><TD id=E colspan=3>ERROR al conectar con DB - ".mysql_error();
exit;
}
mysql_query( "SET SESSION sql_mode='ALLOW_INVALID_DATES,IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'");
echo "<TR><TD id=0 colspan=3>Creando diccionario: ".$_SqlDiccionario;
if( mysql_query( 'CREATE DATABASE '.$_SqlDiccionario )==0 ){
}else{
echo "<TR><TD id=0 colspan=3>Borrando diccionario: ".$_SqlDiccionario;
mysql_query( 'DROP DATABASE '.$_SqlDiccionario );
echo "<TR><TD id=0 colspan=3>Creando diccionario: ".$_SqlDiccionario;
mysql_query( 'CREATE DATABASE '.$_SqlDiccionario );
}
}else if( eSqlType('informix')){
putenv( 'INFORMIXDIR=/opt/informix' );
$Dim = array();
exec( 'create database '.$_SqlDiccionario, $Dim );
for( $i=0; count($Dim); $i++) echo '<br>.'.$Dim[$i];
die('Error: Sin mecanizar');
}else if( eSqlType('oracle') ){
echo '<TR><TD id=E colspan=3>ERROR Cuando la "Base de datos" es Oracle tiene que estar creada y la opción desactivada';
exit;
}
}
function ConectarBD( $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword ){
if( eSqlType('mysql,mysqli') ){
$_HndDB = mysql_connect( $_SqlHostName, $_SqlUsuario, $_SqlPassword );
}else if( eSqlType('informix')){
$Dir = getenv('INFORMIXDIR');
putenv( "PATH=".getenv("PATH").":{$Dir}/bin" );
putenv( "LD_LIBRARY_PATH={$Dir}/lib:{$Dir}/lib/esql" );
putenv( "INFORMIXSERVER={$_SqlHostName}" );
putenv( "GL_DATE=%d-%m-%Y" );
putenv( "DBDATE=DMY4-" );
$aux = $_SqlDiccionario."@".getenv( "INFORMIXSERVER" );
$_HndDB = ifx_connect( $aux, $_SqlUsuario, $_SqlPassword );
if( !$_HndDB ) return $_HndDB;
ifx_textasvarchar(1);
ifx_byteasvarchar(1);
ifx_nullformat(0);
}else if( eSqlType('oracle')){
$_HndDB = ocilogon( $_SqlUsuario, $_SqlPassword, $_SqlHostName, OCI_SYSDBA );
}
return $_HndDB;
}
function BorraBD( $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario ){
if( eSqlType('mysql,mysqli') ){
$_HndDB = mysql_connect( $_SqlHostName, $_SqlUsuario, $_SqlPassword );
mysql_query( "DROP DATABASE {$_SqlDiccionario}" );
}else if( eSqlType('informix')){
}
}
function ControladorSQL( $_Sql ){
global $_Tipos;
$vt = false;
$Tipo['mysql'] = '
TINYINT		2				-		T
SMALLINT		4				-		T
MEDIUMINT	6				-		T
INT			9				-		T
INTEGER		9				-		T
BIGINT		18				-		T
FLOAT			9,5			-,		T
DOUBLE		18,7			-,		T
DECIMAL		#				-,		T
DATE			10				F4		T
DATETIME		19				CDI	T
TIMESTAMP	14				0		T
TIME			8				H		T
YEAR			#				0		T
CHAR			#				D		T
VARCHAR		#				D		T
TINYBLOB		255,80,4		D		A
TINYTEXT		255,80,4		D		A
TEXT			2000,80,4	#		A
BLOB			2000,80,4	#		A
MEDIUMBLOB	2000,80,4	#		A
MEDIUMTEXT	2000,80,4	#		A
LONGBLOB		2000,80,4	#		A
LONGTEXT		2000,80,4	#		A
ENUM			2				0		S
SET			10				D		M
';
$Tipo['mysqli'] = '
TINYINT		2				-		T
SMALLINT		4				-		T
MEDIUMINT	6				-		T
INT			9				-		T
INTEGER		9				-		T
BIGINT		18				-		T
FLOAT			9,5			-,		T
DOUBLE		18,7			-,		T
DECIMAL		#				-,		T
DATE			10				F4		T
DATETIME		19				CDI	T
TIMESTAMP	14				0		T
TIME			8				H		T
YEAR			#				0		T
CHAR			#				D		T
VARCHAR		#				D		T
TINYBLOB		255,80,4		D		A
TINYTEXT		255,80,4		D		A
TEXT			2000,80,4	#		A
BLOB			2000,80,4	#		A
MEDIUMBLOB	2000,80,4	#		A
MEDIUMTEXT	2000,80,4	#		A
LONGBLOB		2000,80,4	#		A
LONGTEXT		2000,80,4	#		A
ENUM			2				0		S
SET			10				D		M
';
$Tipo['informix'] = '
datetime year to year	4				0		T
datetime year to month	7				P4		T
datetime year to day		10				F4		T
datetime year to hour	13				CDI	T
datetime year to minute	16				CDI	T
datetime year to second	19				CDI	T
date							10				F4		T
char							#				D		T
nchar							#				D		T
varchar						#				D		T
nvarchar						#				D		T
money							#				-		T
decimal						#				-		T
smallint						4				-		T
int							2				-		T
integer						9				-		T
serial						9				-		T
int8							18				-		T
serial8						18				-		T
float							14,2			-,		T
smallfloat					6,2			-,		T
byte							1				D		T
text							2000,80,4	#		A
';
$Tipo['oracle'] = '
date							10				F4		T
day to second				8				T		T
year to month				7				P4		T
timestamp					14				0		T
char							#				D		T
nchar							#				D		T
varchar2						#				D		T
nvarchar2					#				D		T
number						#				-		T
int							2				-		T
integer						9				-		T
smallint						4				-		T
dec							#				-		T
decimal						#				-		T
numeric						#				-		T
doble precision			#				-		T
float							14,2			-,		T
real							#				-		T
';
$TIPO = array();
$Tipo = explode( chr(10), $Tipo[$_Sql] );
for( $i=0;$i<count($Tipo);$i++ ){
if( trim($Tipo[$i])!='' ){
$Tipo[$i] = str_replace( ' ', '', trim($Tipo[$i]) );
while( substr_count( $Tipo[$i], chr(9).chr(9) ) > 0 ){
$Tipo[$i] = str_replace( chr(9).chr(9), chr(9), $Tipo[$i] );
}
if( substr_count( $Tipo[$i], chr(9) ) == 3 ) $TIPO[] = explode( chr(9), $Tipo[$i]);
}
}
if( $vt ) echo '<table border=1 cellspacing=0 cellpadding=2>';
if( $vt ) echo '<caption>Definición '.$_Sql.'</caption>';
for($i=0;$i<count($TIPO);$i++){
if( $vt ) echo '<tr>';
$TIPO[$i][0] = strtolower( $TIPO[$i][0] );
for($n=0;$n<count($TIPO[$i]);$n++){
$TIPO[$i][$n] = trim( $TIPO[$i][$n] );
if( $vt ) echo '<td>'.$TIPO[$i][$n];
}
$_Tipos[strtoupper($TIPO[$i][0])] = array( $TIPO[$i][1], $TIPO[$i][2], $TIPO[$i][3]);
}
if( $vt ) echo '</table><br>';
}
function CrearDirBase( $NomDir, $PathDir ){
echo "<TR><TH colspan=3 id=c class=GRUPO>CREANDO DIRECTORIOS</TH>";
$dir = $NomDir.'/';
CreaDir( $dir );
echo "<TR><TD colspan=3 id=0>".$dir."</TD>";
for( $i=0; $i<count($PathDir); $i++ ){
$NomDir = $dir.$PathDir[$i];
CreaDir( $NomDir );
}
return $dir;
}
function CreaDir( $dir ){
echo "<TR><TD colspan=3 id=0>".$dir."</TD>";
if( is_dir( $dir ) ){
if( !is_readable(  $dir ) ) die('ERROR: (a) No es de lectura: '.$dir);
if( !is_writeable( $dir ) ) die('ERROR: (a) No es de escritura: '.$dir);
return;
}
if( substr_count($dir,'/') > 0 ){
CreaDir2( substr( $dir, 0, strrpos($dir,'/')) );
}
if( !mkdir( $dir, 0777 ) )  die('No se ha podido crear el directorio: '.$dir);
if( !is_dir( $dir ) )		die('No está el directorio: '.$dir);
if( !is_readable(  $dir ) ) die('ERROR: (d-7) No es de lectura: '.$dir);
if( !is_writeable( $dir ) ) die('ERROR: (d-8) No es de escritura: '.$dir);
}
function CreaDir2( $dir ){
echo "<TR><TD colspan=3 id=0>".$dir."</TD>";
if( is_dir( $dir ) ){
if( !is_readable(  $dir ) ) die('ERROR: (a) No es de lectura: '.$dir);
if( !is_writeable( $dir ) ) die('ERROR: (a) No es de escritura: '.$dir);
return;
}
if( !mkdir( $dir, 0777 ) )  die('No se ha podido crear el directorio: '.$dir);
if( !is_dir( $dir ) )		die('No está el directorio: '.$dir);
if( !is_readable(  $dir ) ) die('ERROR: (d-9) No es de lectura: '.$dir);
if( !is_writeable( $dir ) ) die('ERROR: (d-10) No es de escritura: '.$dir);
}
function CopiaContenidos( $_DirDestino ){
echo "<TR><TH colspan=3 id=c class=GRUPO>COPIANDO FICHEROS</TH>";
CopyFicheros( 'edesweb/web/aplication/_datos/config/', $_DirDestino.'_datos/config/' );
CopyFicheros( 'edesweb/web/aplication/tree/', $_DirDestino.'tree/' );
CopyFicheros( 'edesweb/web/aplication/help/tip/'	 , $_DirDestino.'help/tip/' );
CopyFicheros( 'edesweb/web/aplication/http/'		 , $_DirDestino.'http/' );
CopyFicheros( 'edesweb/web/aplication/http/g/'		 , $_DirDestino.'http/g/' );
CopyFicheros( 'edesweb/web/aplication/http/css/'	 , $_DirDestino.'http/css/' );
CopyFicheros( 'edesweb/web/aplication/http/fonts/'	 , $_DirDestino.'http/fonts/' );
CopyFicheros( 'edesweb/web/aplication/http/charts/' , $_DirDestino.'http/charts/' );
CopyFicheros( 'edesweb/web/aplication/http/charts/charts_library/', $_DirDestino.'http/charts/charts_library/' );
copy( 'edesweb/web/aplication/_d_/cfg/edes.ini'	, $_DirDestino.'_d_/cfg/edes.ini' );
copy( 'edesweb/web/aplication/_d_/cfg/ftp.ini'		, $_DirDestino.'_d_/cfg/ftp.ini' );
copy( 'edesweb/web/aplication/_d_/cfg/http.ini'	, $_DirDestino.'_d_/cfg/http.ini' );
copy( 'edesweb/web/aplication/_d_/cfg/alerts.ini'	, $_DirDestino.'_d_/cfg/alerts.ini' );
copy( 'edesweb/web/edesweb/_doc_/gif/iconos.ls'	, $_DirDestino.'_doc_/gif/iconos.ls' );
}
function CopyFicheros( $dorg, $ddest ){
global $BytsOri, $BytsDes, $BytsCOri, $BytsCDes, $Rastro;
global $dir_origen, $_DirDestino, $_Nivel, $compactar, $tipo_copia;
$_Nivel++;
if( $Rastro ) echo "<BR><BR>[$dorg -> $ddest]";
if( !is_readable(  $dorg ) ) die( "<br>Error al abrir el directorio de origen '$dorg'" );
if( !is_writeable( $dorg ) ) die( "<br>Error al abrir el directorio de origen '$dorg'" );
if( !is_readable(  $ddest ) ) die( "<br>Error al abrir el directorio de destino '$ddest'" );
if( !is_writeable( $ddest ) ) die( "<br>Error al abrir el directorio de destino '$ddest'" );
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != '.') && ($file != '..') ){
if( file_exists($dorg.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( !is_dir($dorg.'/'.$file) and !substr_count( $file, '.bak' ) ){
$BytsOri += filesize( "{$dorg}{$file}" );
$BytsCOri += filesize( "{$dorg}{$file}" );
echo "<TR><TD id=0 colspan=3>".$ddest.$file;
if( !copy( "{$dorg}{$file}", "{$ddest}{$file}" ) ) echo ' -> ERROR: '."{$dorg}{$file} -> {$ddest}{$file}";
$BytsDes += filesize( "{$ddest}{$file}" );
$BytsCDes += filesize( "{$ddest}{$file}" );
}
}
}
closedir( $di );
if( $Rastro ) echo '<BR>';
$_Nivel--;
}
function CopyDirectorio( $dorg, $ddest ){
$Rastro = false;
if( $Rastro ) echo "<BR><BR>[$dorg -> $ddest]<br>\n";
if( !is_dir( $ddest ) ) mkdir( $ddest, 0777 );
if( !is_readable(  $dorg  ) ) die( "<br>Error al abrir el directorio de origen '$dorg'" );
if( !is_writeable( $ddest ) ) die( "<br>Error al abrir el directorio de destino '$ddest'" );
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( is_dir($dorg.'/'.$file) && $file != $ddest ){
if( !is_dir( "$ddest/$file" ) ) mkdir( "$ddest/$file", 0777 );
if( $Rastro ) echo "D: {$ddest}/{$file}<BR>\n";
CopyDirectorio( "$dorg/$file", "$ddest/$file" );
}else{
if( $Rastro ) echo 'F:'.$file."<br>\n";
copy( "$dorg/$file", "$ddest/$file" );
}
}
}
closedir( $di );
if( $Rastro ) echo '<BR>';
}
function FicherosINI( $Destino, $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_Empresa, $TituloApli, $SubTituloApli, $DefPassword, $DirWeb, $LoginType, $Desktop, $PCDirApp, $TitleLauncher, $Shortcut, $ShortcutGroup ){
if( trim($DefPassword)!='' ) $DefPassword = strtoupper(md5($DefPassword));
if( trim($InitWeb)    !='' ) $InitWeb     = strtoupper(md5($InitWeb));
$_Empresa = $_SESSION["ApplicationName"];
$nL = chr(13).chr(10);
$tab = chr(9).chr(9);
$Fichero = '_datos/config/desktop.ini';
copy( 'edesweb/web/aplication/'.$Fichero, $Destino.$Fichero );
$Fichero = $Destino.$Fichero;
$txt = LeeFile( $Fichero );
$txt = QuitaREM( $txt );
$txt = str_replace('[COMPANY]'			, $_Empresa		 , $txt );
$txt = str_replace('[TITULO]'			, $TituloApli	 , $txt );
$txt = str_replace('[SUBTITULO]'		, $SubTituloApli , $txt );
$txt = str_replace('[DESKTOPTYPE]'		, $Desktop		 , $txt );
$txt = str_replace('[IP]'				, $_SERVER['HTTP_HOST']	 , $txt );
$txt = str_replace('[PASSWORDRESET]'	, $DefPassword	 , $txt );
$txt = str_replace('[PASSWORDINITWEB]'  , $InitWeb		 , $txt );
SaveFile( $Fichero, $txt );
$Fichero = '_datos/config/sql.ini';
copy( 'edesweb/web/aplication/'.$Fichero, $Destino.$Fichero );
$Fichero = $Destino.$Fichero;
$txt = LeeFile( $Fichero );
$txt = QuitaREM( $txt );
$txt = str_replace( '[COMPANY]', $_Empresa	, $txt );
$txt = str_replace( '[IP]'		 , $_SERVER['HTTP_HOST'], $txt );
$sSql = $_Sql;
if( eSqlType('informix') ) $txt = str_replace( '[PUTENV]', "putenv('INFORMIXDIR=/opt/informix');", $txt );
if( eSqlType('mysql,mysqli') ) $txt = str_replace( '[PUTENV]', ''												, $txt );
if( eSqlType('oracle') ) $txt = str_replace( '[PUTENV]', ''												, $txt );
$txt = str_replace( '[SQL]'			, $sSql				, $txt );
$txt = str_replace( '[HOSTDB]'		, $_SqlHostName	, $txt );
$txt = str_replace( '[USUARIO]'		, $_SqlUsuario		, $txt );
$txt = str_replace( '[PASSWORD]'		, $_SqlPassword	, $txt );
$txt = str_replace( '[DICCIONARIO]'	, $_SqlDiccionario, $txt );
SaveFile( $Fichero, $txt );
$Fichero = '_datos/config/pdf.ini';
copy( 'edesweb/web/aplication/'.$Fichero, $Destino.$Fichero );
$Fichero = $Destino.$Fichero;
$txt = LeeFile( $Fichero );
$txt = str_replace( '[TITULO]'	, $TituloApli	 , $txt );
$txt = str_replace( '[SUBTITULO]', $SubTituloApli, $txt );
SaveFile( $Fichero, $txt );
$Fichero = '_datos/config/about.htm';
copy( 'edesweb/web/aplication/'.$Fichero, $Destino.$Fichero );
$Fichero = $Destino.$Fichero;
$txt = LeeFile( $Fichero );
$txt = str_replace( '[COMPANY]'	, $_Empresa			, $txt );
$txt = str_replace( '[TITULO]'	, $TituloApli		, $txt );
$txt = str_replace( '[SUBTITULO]', $SubTituloApli	, $txt );
$txt = str_replace( '[VERSION]'	, '1.0'				, $txt );
SaveFile( $Fichero, $txt );
$Fichero = '_datos/config/mainmenu.php';
copy( 'edesweb/web/aplication/'.$Fichero, $Destino.$Fichero );
$Fichero = $Destino.$Fichero;
$txt = LeeFile( $Fichero );
$txt = str_replace( '[COMPANY]'	, $_Empresa			, $txt );
SaveFile( $Fichero, $txt );
$Fichero = '_d_/cfg/edes.ini';
copy( 'edesweb/web/aplication/'.$Fichero, $Destino.$Fichero );
$Fichero = $Destino.$Fichero;
$txt = LeeFile( $Fichero );
$txt = str_replace( '[IP]'			, $_SERVER['HTTP_HOST']				, $txt );
$txt = str_replace( '[DIRBASE]'	, substr($Destino,0,-1)	, $txt );
SaveFile( $Fichero, $txt );
$Fichero = '_datos/config/stop.php';
copy( 'edesweb/web/aplication/'.$Fichero, $Destino.$Fichero );
$Fichero = $Destino.$Fichero;
$txt = LeeFile( $Fichero );
$txt = str_replace( '[COMPANY]', $_Empresa, $txt );
SaveFile( $Fichero, $txt );
$Fichero = '_datos/config/install.ini';
copy( 'edesweb/web/aplication/'.$Fichero, $Destino.$Fichero );
$Fichero = $Destino.$Fichero;
$txt = LeeFile( $Fichero );
$txt = str_replace( '[DIRPC]'				, $PCDirApp		 , $txt );
$txt = str_replace( '[TITLELAUNCHER]'	, $TitleLauncher , $txt );
$txt = str_replace( '[SHORTCUTGROUP]'	, $ShortcutGroup , $txt );
$txt = str_replace( '[SHORTCUT]'			, $Shortcut , $txt );
$txt = str_replace( '[TITULO]'			, $TituloApli , $txt );
$txt = str_replace( '[IP]'					, $_SERVER['HTTP_HOST'], $txt );
SaveFile( $Fichero, $txt );
$di = opendir( '../_datos/config/' );
$uDimDir[$dorg] = 0;
while( $file = readdir( $di ) ){
if( ($file != ".") && ($file != "..") ){
if( !is_dir("{$dorg}/{$file}") ){
if( substr($file,0,11)=='msg_export.' ){
$Fichero = '_datos/config/'.$file;
copy( 'edesweb/web/aplication/'.$Fichero, $Destino.$Fichero );
$Fichero = $Destino.$Fichero;
$txt = LeeFile( $Fichero );
$txt = str_replace( '[COMPANY]', $_Empresa, $txt );
SaveFile( $Fichero, $txt );
}
}
}
}
closedir( $di );
}
function QuitaREM( $txt ){
while( substr_count( $txt, '/'.'*' ) > 0 && substr_count( $txt, '*'.'/' ) > 0 ){
$pI = strpos( $txt, '/'.'*' );
$pF = strpos( $txt, '*'.'/' );
$txt = trim(substr( $txt, 0, $pI )) ."\n". substr( $txt, $pF+3 );
}
return $txt;
}
function LeeFile( $Fichero ){
if( !file_exists( $Fichero ) ) return '';
$fd = fopen( $Fichero, 'r' );
$txt = fread($fd,filesize($Fichero));
fclose($fd);
return $txt;
}
function SaveFile( $Fichero, $txt ){
$fd = fopen( $Fichero, 'w' );
fputs( $fd, $txt );
fclose( $fd );
}
function IndexHTML( $_DirDestino, $Empresa, $DirWeb ){
echo '<TR><TH colspan=3 id=c class=GRUPO>CREANDO "empty_page.htm"</TH>';
$Fichero = $_DirDestino.'_datos/config/empty_page.htm';
if( file_exists( $Fichero ) ){
$fd = fopen( $Fichero, 'r' );
$txt = fread($fd,filesize($Fichero));
fclose($fd);
while( substr_count( $txt, '[EMPRESA]' ) > 0 ) $txt = str_replace( '[EMPRESA]', $Empresa, $txt );
$fd = fopen( $Fichero, 'w' );
fputs( $fd, $txt );
fclose( $fd );
}
echo '<TR><TH colspan=3 id=c class=GRUPO>CREANDO "empty_frame.htm"</TH>';
$Fichero = $_DirDestino.'_datos/config/empty_frame.htm';
if( file_exists( $Fichero ) ){
$fd = fopen( $Fichero, 'r' );
$txt = fread($fd,filesize($Fichero));
fclose($fd);
while( substr_count( $txt, '[EMPRESA]' ) > 0 ) $txt = str_replace( '[EMPRESA]', $Empresa, $txt );
$fd = fopen( $Fichero, 'w' );
fputs( $fd, $txt );
fclose( $fd );
}
echo '<TR><TH colspan=3 id=c class=GRUPO>CREANDO "empty_html.htm"</TH>';
$Fichero = $_DirDestino.'_datos/config/empty_html.htm';
if( file_exists( $Fichero ) ){
$fd = fopen( $Fichero, 'r' );
$txt = fread($fd,filesize($Fichero));
fclose($fd);
while( substr_count( $txt, '[EMPRESA]' ) > 0 ) $txt = str_replace( '[EMPRESA]', $Empresa, $txt );
$fd = fopen( $Fichero, 'w' );
fputs( $fd, $txt );
fclose( $fd );
}
echo '<TR><TH colspan=3 id=c class=GRUPO>CREANDO "shadown.htm"</TH>';
$Fichero = $_DirDestino.'_datos/config/shadown.htm';
if( file_exists( $Fichero ) ){
$fd = fopen( $Fichero, 'r' );
$txt = fread($fd,filesize($Fichero));
fclose($fd);
while( substr_count( $txt, '[EMPRESA]' ) > 0 ) $txt = str_replace( '[EMPRESA]', $Empresa, $txt );
$fd = fopen( $Fichero, 'w' );
fputs( $fd, $txt );
fclose( $fd );
}
echo '<TR><TH colspan=3 id=c class=GRUPO>CREANDO "index.htm"</TH>';
$Fichero = $_DirDestino.'_datos/config/index.htm';
if( file_exists( $Fichero ) ){
$fd = fopen( $Fichero, 'r' );
$txt = fread($fd,filesize($Fichero));
fclose($fd);
while( substr_count( $txt, '[EMPRESA]' ) > 0 ) $txt = str_replace( '[EMPRESA]', $Empresa, $txt );
while( substr_count( $txt, '[DIRWEB]' ) > 0 ) $txt = str_replace( '[DIRWEB]', $DirWeb, $txt );
$fd = fopen( $Fichero, 'w' );
fputs( $fd, $txt );
fclose( $fd );
}
copy( $_DirDestino.'_datos/config/index.htm', $_DirDestino.'http/index.htm' );
copy( $_DirDestino.'_datos/config/index.htm', $_DirDestino.'http/css/index.htm' );
copy( $_DirDestino.'_datos/config/index.htm', $_DirDestino.'http/g/index.htm' );
copy( $_DirDestino.'_datos/config/index.htm', $_DirDestino.'http/i/index.htm' );
}
function GeneraRegistros( $DefPassword, $LoginType, $MasterUserName, $MasterEMail ){
global $_Sql, $_SqlUsuario, $_DEBUG, $NumSerie;
$sDefPassword = strtoupper(md5($DefPassword));
$Dim = array(
array( 'Fic', 'Ficha' ),
array( 'gFi', 'Grupo de Fichas' ),
array( 'Lis', 'Listado' ),
array( 'OK' , 'Entrar' ),
array( 'OKR', 'ReEntrar' ),
array( 'EXE', 'Ejecutar' ),
array( 'EXT', 'Salir' )
);
echo '<TR><TH colspan=3 id=c class=GRUPO>INSERTANDO REGISTROS</TH>';
if( eSqlType('mysql,mysqli') ){
$Hoy = date('Y-m-d');
}else{
$Hoy = date('d-m-Y');
}
if( qCount("{$_SESSION['ShareDictionary']}gs_tree",'')==0 ){
echo "<TR><TD colspan=3>ARBOL: Master</TD>";
sql_Inserta( "{$_SESSION['ShareDictionary']}gs_tree",
'nm_gs_tree, cd_tree , filename   , permission, extract, excel,pdf,warnings,print,email,news',
"'MASTER'  , 'MASTER','master.txt',    'S'    ,   'S'  ,  'S' ,'S',    0   , 'S' , 'S' , 'S'" );
}
if( qCount('gs_node','')==0 ){
echo "<TR><TD colspan=3>NODO: Master</TD>";
sql_Inserta( 'gs_node',
'permission, nm_gs_node,  dt_add',
"   'S'    ,  'MASTER' , '{$Hoy}'" );
}
if( qCount('gs_user','') == 0 ){
if( $LoginType==1 ){
$uLogin = 'user@mail.com';
$uLogin = $MasterEMail;
}else{
$uLogin = '99999901';
}
echo "<TR><TD>USUARIO:<TD align=center>Login:<BR><B>{$uLogin}</B> <TD align=center> Password:<BR><B>".strtoupper($DefPassword)."</B></TD>";
sql_Inserta( 'gs_user',
"dni, login, email, pass, permission,cd_gs_node, cd_gs_tree,  user_name, user_surname, webmaster,export_level,  dt_add , desktop_type,           ys_news        , system_user",
"'-',  '-' ,  ''  ,  '-',     ''    ,     0    ,      0    ,'(INTERNAL',   'SYSTEM)' ,    ''    ,      3     , '{$Hoy}',      -1     , '".date('Y-m-d H:i:s')."',     'S'    " );
sql_Inserta( 'gs_user',
"dni       ,    login  ,     email      ,      pass       , permission,cd_gs_node, cd_gs_tree,      user_name     , user_surname,webmaster,export_level,  dt_add , desktop_type,           ys_news        , system_user",
"'99999901','{$uLogin}','{$MasterEMail}','{$sDefPassword}',     'S'   ,     1    ,      1    , '{$MasterUserName}',     ''      ,   'S'   ,      0     , '{$Hoy}',      -1     , '".date('Y-m-d H:i:s')."',     'S'    " );
}
if( qCount('gs_pc','')==0 ){
echo "<TR><TD colspan=3>PC: Con activación de web parada (gs_pc).</TD>";
sql_Inserta( 'gs_pc',
'permission, cd_gs_node, cd_gs_user, alta_usu, activar_web,    num_serie ,         dt_alta',
"   'S'    ,     1    ,       1    ,     1   ,    'S'     , '{$NumSerie}', '".date('Y-m-d')."'", 'cd_gs_pc' );
}
if( qCount("{$_SESSION['ShareDictionary']}gs_toperacion",'')==0 ){
echo "<TR><TD colspan=3>GS_TOPERACION:</TD>";
for( $n=0; $n<count($Dim); $n++ ){
sql_Inserta("{$_SESSION['ShareDictionary']}gs_toperacion",
'cd_gs_toperacion, nm_gs_toperacion, orden, grupo, activa',
"'".$Dim[$n][0]."', '".$Dim[$n][1]."', ".($n+1).", '', 'S'" );
}
}
}
function TraceVersion( $_DirDestino ){
$txt = 'FECHA...: '.date('Y-m-d H:i')."\n".
'SERVIDOR: '.$_SERVER['HTTP_HOST'];
$fd = fopen( "{$_DirDestino}_version_/".date('Ymd.Hi').'.vrs', 'w' );
fputs( $fd, $txt );
fclose( $fd, $txt );
}
function MemorizaTABLAS( $DirDestino ){
global $_Sql;
MemTABLAS( $DirDestino."_doc_/tbl/_edes_{$_Sql}.sql" );
MemTABLAS( $DirDestino.'_doc_/tbl/_install_es.sql' );
}
function MemTABLAS( $DirFile ){
if( !file_exists( $DirFile ) ) return;
global $_DimTabla, $_DimCampo, $_DimLenCampo, $_DimTablaUnique;
$InicioTabla = 0;
$NomTabla = '';
$fd = fopen( $DirFile, 'r' );
while( !feof($fd) ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
while( substr_count( $buffer, '  ' ) > 0 ) $buffer = str_replace( '  ',' ',$buffer);
if( $buffer==');' ) $InicioTabla = 0;
if( $InicioTabla == 1 ){
$EsIndice = false;
$item = explode(' ',strtoupper($buffer));
if( $item[0] == 'KEY' ){
$EsIndice = true;
}else if( $item[0] == 'PRIMARY' || $item[0] == 'PRIMARY KEY' ){
$EsIndice = true;
}else if( $item[0] == 'UNIQUE' ){
$EsIndice = true;
}else if( substr_count(strtoupper($buffer),'PRIMARY KEY') == 1 ){
}
if( $EsIndice ){
$InicioTabla = 0;
}else{
list( $NomCampo, ) = explode(' ',trim($buffer));
if( $NomCampo[0] != '#' ){
$_DimCampo[$NomTabla][$NomCampo] = true;
if( substr_count( $buffer, ')' )==1 ){
list( $xLen ) = explode(')',$buffer);
list( ,$xLen ) = explode('(',$xLen);
$_DimLenCampo[$NomTabla][$NomCampo] = trim($xLen);
}
}
}
}
if( strtoupper(substr($buffer,0,13)) == 'CREATE TABLE ' ){
$tmp = explode(' ',$buffer);
if( substr_count($tmp[2],'(') > 0 ){
$sTmp = str_replace( '(', ' (', $tmp[2] );
$buffer = str_replace( $tmp[2], $sTmp, $buffer );
$tmp = explode(' ',$buffer);
}
if( $_DimTablaUnique[trim($tmp[2])] ){
txtError('Tabla repetida "'.trim($tmp[2]).'"');
exit;
}
$NomTabla = trim($tmp[2]);
$_DimTabla[] = $NomTabla;
$_DimTablaUnique[$NomTabla] = true;
$InicioTabla = 1;
}else if( strtoupper(substr($buffer,0,13)) == 'CREATE INDEX ' || strtoupper(substr($buffer,0,20)) == 'CREATE UNIQUE INDEX ' ){
}
}
fclose($fd);
}
function CreaTablasEDES( $DirDestino ){
echo "<TR><TH colspan=3 id=c class=GRUPO>CREANDO TABLAS DEL SISTEMA</TH>";
global $_opCreaTablas, $_opCreaArbol, $_Sql;
$_opCreaTablas = $_opCreaArbol = true;
CrearFCH( $DirDestino, $DirDestino."_doc_/tbl/_edes_{$_Sql}.sql", '', true, false, false );
}
function CreaTablasWEB( $DirDestino ){
global $_opCreaArbol;
clearstatcache();
$_opCreaArbol = true;
echo "<TR><TH colspan=3 id=c class=GRUPO>CREANDO TABLAS DE LA APLICACION</TH>";
CrearFCH( $DirDestino, $DirDestino.'_doc_/tbl/_install_es.sql', '', true, true, false );
echo "<TR><TH colspan=3 id=c class=GRUPO>CREANDO TABLAS DEL ALMACEN</TH>";
CrearFCH( $DirDestino, $DirDestino.'_doc_/tbl/_tmp.sql'    , '', true, true, true );
$File = 'edesweb/web/aplication/master.tree';
$Dim = file( $File );
$ar = fopen( $DirDestino.'tree/master.txt', 'a' );
for( $n=0; $n<count($Dim); $n++ ) fputs( $ar, chr(10).chop($Dim[$n]) );
fclose( $ar );
}
function CargaTablasAUX( $DirDestino, $Diccionario ){
global $_Importar;
echo "<TR><TH colspan=3 id=c class=GRUPO>CARGANDO TABLAS AUXILIARES</TH>";
for( $i=0; $i<count($_Importar); $i++ ){
if( $_Importar[$i][3]*1 > 0 ){
$fd = fopen( "edesweb/t/store/{$_Importar[$i][0]}.ent", 'r' );
while( !feof($fd) ){
$x = trim(fgets( $fd, 2048 ));
$x = str_replace("\t"," ",$x);
if( strtoupper(substr($x,0,7)) == '~[DATA]' ){
list(,$tmp) = explode(']',$x);
list($tmp,) = explode('/',$tmp);
$tmp = trim($tmp);
if( $tmp == $_Importar[$i][1]){
list( ,$NomTabla ) = explode( ']', $x );
list( $NomTabla, $Treg ) = explode( '/', $NomTabla );
echo '<tr><td>'.$_Importar[$i][0].'.ent<td align=right style="padding-right:10">'.eNumberFormat($Treg).'<td>&nbsp;'.trim($NomTabla);
$aReg = 0;
while( !feof($fd) ){
$x = trim(fgets( $fd, 2048 ));
$x = str_replace("\t"," ",$x);
if( strtoupper(substr($x,0,7)) == '~[DATA]' ){
break 2;
}
if( $x!='' ){
$txt = '';
$tmp = explode('|',$x);
for( $n=0; $n<count($tmp); $n++ ){
if( $n>0 ) $txt .= ',';
$txt .= '"'.$tmp[$n].'"';
}
$aReg++;
qQuery( "insert into {$_Importar[$i][1]} values ( ".$txt." )" );
}
}
}
}
}
fclose($fd);
}
}
$result = mysql_list_tables($Diccionario);
$DimTabla = array();
$num_rows = mysql_num_rows($result);
for( $i=0; $i<$num_rows; $i++ ) $DimTabla[ mysql_tablename($result,$i) ] = true;
$dir_handle = opendir($DirDestino.'_tmp/imp/');
while( $dir = readdir($dir_handle) ){
if( $dir != '.' && $dir != '..' ){
list($NomTabla,) = explode('.txt',$dir);
if( substr_count( $dir, '.txt' ) == 1 && $DimTabla[$NomTabla] == true ){
if( qCount( $NomTabla ) == 0 ){
echo "<TR><TD colspan=2>".$NomTabla;
$TReg = 0;
$fd = fopen( $DirDestino.'_tmp/imp/'.$dir, 'r' );
while( ($txt = fgets($fd,50000)) ){
$txt = str_replace("\t"," ",$txt);
$Valores = "'".str_replace('|',"','", $txt )."'";
qQuery("insert into {$NomTabla} values ( {$Valores} )");
$TReg++;
}
fclose($fd);
echo '<TD>'.$TReg;
}
}
}
}
}
function CrearFCH( $DirDestino, $File, $tabla, $Todo, $ConFCH, $FileStore ){
global $_Sql;
if( eSqlType('mysql,mysqli') ) FCH_MySql($DirDestino, $File, $tabla, $Todo, $ConFCH, $FileStore );
if( eSqlType('informix') ) FCH_Informix($DirDestino, $File, $tabla, $Todo, $ConFCH, $FileStore );
if( eSqlType('oracle') ) FCH_Oracle($DirDestino, $File, $tabla, $Todo, $ConFCH, $FileStore );
}
function FCH_MySql( $DirDestino, $File, $tabla, $Todo, $ConFCH, $FileStore ){
global $_SL, $_ST, $_DirFCH, $_DimTabla, $_DimCampo, $_Opciones, $_NomOpcion, $_ModOpcion, $_Sql;
global $_opCreaTablas, $_opCreaArbol, $_Tipos, $SeCreoSolapa, $_ModoEDES;
global $_DimESTRUCTURA, $DefTextArea, $WrapInputext, $AddDefTable, $_DimLenCampo;
if( !file_exists( $File ) ) return;
$ar = fopen( $DirDestino.'tree/master.txt', 'a' );
$xDir = '';
$NomEntidad = '';
$NotaDeTabla = '';
$NotaDeCampo = array();
$Rem = false;
$sBuffer = '';
$fd = fopen( $File, 'r' );
while(($buffer = fgets($fd, 4096)) !== false){
$buffer = str_replace("\t"," ",$buffer);
while( substr_count( $buffer, '  ' ) > 0 ) $buffer = str_replace( '  ',' ',$buffer);
$sBuffer = '';
if( $buffer[0] == '{' ){
$Rem = true;
continue;
}else if( $Rem ){
if( substr_count( $buffer, '}' ) != 0 ) $Rem = false;
continue;
}
if( strtoupper(substr($buffer,0,5)) == '#DIR:' || strtoupper(substr($buffer,0,8)) == '#FOLDER:' ){
list(, $xDir ) = explode(':',$buffer);
$xDir = trim($xDir);
if( $xDir[0]=='/' ) $xDir = substr( $xDir, 1 );
}
if( $_opCreaArbol && strtoupper(substr($buffer,0,6)) == '#MENU:' ){
list(, $NomMenu, $NomScript ) = explode(':',$buffer);
$NomMenu = trim($NomMenu);
$NomScript = trim($NomScript);
$Ubicado = '';
if( $Todo ) $Ubicado = $xDir.'/';
if( $Ubicado=='/' ) $Ubicado = '';
echo '<TR><TD colspan=3 style="background: #FFCC99">'.$NomMenu;
fputs( $ar, chr(9).$NomMenu.' | :'.$Ubicado.$NomScript.chr(10) );
for( $i=0; $i<strlen($_Opciones); $i++ ){
fputs( $ar, chr(9).chr(9).$_NomOpcion[substr($_Opciones,$i,1)].'	| '.$_ModOpcion[substr($_Opciones,$i,1)].$_ModoEDES[substr($_Opciones,$i,1)].':'.chr(10) );
}
}
if( preg_match("/^#STORE:/i", strtoupper($buffer)) ){
$aFile = str_replace(' ','',trim($buffer));
$aFile = explode(',',substr($aFile,7));
for( $n=0; $n<count($aFile); $n++ ){
$iFichero = $DirDestino."_doc_/tbl/_{$aFile[$n]}.mnu";
if( file_exists($iFichero) ){
$fdi = fopen( $iFichero, 'r' );
$txt = fread( $fdi, filesize($iFichero) );
fclose($fdi);
fputs( $ar, $txt.chr(10) );
}
}
continue;
}
if( strtoupper(substr($buffer,0,8)) == '#SOLAPA:' || strtoupper(substr($buffer,0,5)) == '#TAB:' ){
list(, $txt ) = explode(':',$buffer);
$txt = trim($txt);
if( $txt != '' ){
if( !$SeCreoSolapa ) $SeCreoSolapa = true;
fputs( $ar, $GLOBALS['_IMG_OPTION'].$txt.chr(10) );
}
}
if( strtoupper(substr($buffer,0,13)) == 'CREATE TABLE ' ){
$NotaDeTabla = '';
$NotaDeCampo = array();
$tmpCampos = array();
$tmpIndice = array();
$Indices = array();
$TipoIndice = array();
$tmp = explode(' ',$buffer);
if( substr_count($tmp[2],'(') > 0 ){
$sTmp = str_replace( '(', ' (', $tmp[2] );
$buffer = str_replace( $tmp[2], $sTmp, $buffer );
$tmp = explode(' ',$buffer);
}
if( $Todo || $tmp[2] == $tabla ){
$DimSelect = array();
list($CreateTable,) = explode('#',$buffer);
$Autoincremental = '';
$Memo = '';
$DimCampos = array();
$NomTabla = trim($tmp[2]);
$sTmp = explode('#',$buffer);
if( count($sTmp) > 1 ){
list( $NomEntidad, $NotaDeTabla, $EsAux ) = explode(':',$sTmp[1]);
$NomEntidad = trim($NomEntidad);
$NotaDeTabla = trim($NotaDeTabla);
$EsAux = strtoupper(trim($EsAux));
$DFTitle = $NomEntidad;
$NomEntidad = EnPlural( $NomEntidad, '', $false );
}
if( $NomEntidad == '' ){
$NomEntidad = strtoupper($NomTabla[0]).substr($NomTabla,1);
$DFTitle = $NomEntidad;
$NomEntidad = EnPlural( $NomEntidad, '', $false );
}
echo '<TR><TD style="background: #FFCC99">'.$NomEntidad;
if( substr_count( $buffer, '(' ) == 0 ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
$tmp = explode('#',$buffer);
$CreateTable .= $_ST.$tmp[0];
}
$Indice = '';
$Orden = '';
$PrimerCampo = '';
$FormStatic = 0;
while( $buffer!=');' && $buffer!=')' && !($buffer[0]==")" && substr($buffer,-1)==";") && !feof($fd) ){
$buffer = trim( fgets($fd,2048) );
$buffer = str_replace("\t"," ",$buffer);
while( substr_count( $buffer, '  ' ) > 0 ) $buffer = str_replace( '  ',' ',$buffer);
$sBuffer = $buffer;
if( $buffer[0] != '#' ){
if( substr_count( $buffer, '#' ) > 0 ){
$CreateTable .= $_ST.substr( $buffer, 0, strpos($buffer,'#') );
}else{
$CreateTable .= $_ST.$buffer;
}
}
$EsIndice = false;
$item = explode(' ',strtoupper($buffer));
if( $item[0] == 'KEY' ){
$EsIndice = true;
}else if( $item[0] == 'PRIMARY' || $item[0] == 'PRIMARY KEY' ){
$EsIndice = true;
}else if( $item[0] == 'UNIQUE' ){
$EsIndice = true;
}
if( $EsIndice ){
$tmp = explode('(',$buffer);
$tmp = explode(')',$tmp[1]);
if( $Orden=='' ) $Orden = $tmp[0];
$Indices[] = $tmp[0];
$TipoIndice[] = $item[0];
$op = explode(',',str_replace(' ','',$tmp[0]));
for( $i=0; $i<count($op); $i++ ){
$tmpIndice[$op[$i]] = 'Q';
}
}
if( !$EsIndice && $buffer[0] != '#' && $buffer!=');' && $buffer!=')' ){
$cModo = 'M';
$cCondicion = '';
$tmp = explode(' ',$buffer);
$Campo = $Etiqueta = trim($tmp[0]);
$sTmp = explode('#',$buffer);
$sNotaDeCampo = '';
if( count($sTmp) > 1 ){
list( $Etiqueta, $sNotaDeCampo, $no ) = explode(':',$sTmp[1]);
if( $no!='' ){
$Etiqueta .= ':'.$sNotaDeCampo;
$sNotaDeCampo = $no;
}
$Etiqueta = trim($Etiqueta);
$sNotaDeCampo = trim($sNotaDeCampo);
if( $Etiqueta=='' ) $Etiqueta = strtoupper($Campo[0]).substr($Campo,1);
}else{
$Etiqueta = strtoupper($Etiqueta[0]).substr($Etiqueta,1);
}
if( substr_count( $tmp[1], '#' ) > 0 ){
$tmp[1] = substr( $tmp[1], 0, strpos($tmp[1],'#') );
}
if( substr_count( strtoupper($buffer), 'AUTO_INCREMENT' ) > 0 ){
$Indice = $Campo;
$cEdicion = '*';
$cModo = '*';
$cCondicion = '';
$Autoincremental = $Campo;
}else if( substr_count( strtoupper($buffer), 'NOT NULL' ) > 0 ){
$cCondicion = '#';
}
list( $Tipo, $Long ) = explode('(',$tmp[1]);
$Tipo = trim($Tipo);
list( $Long ) = explode(')',$Long);
$Long = trim($Long);
if( substr($Tipo,-1)==',' ) $Tipo = substr($Tipo,0,-1);
$cEdicion = $_Tipos[strtoupper($Tipo)][1];
$cControl = $_Tipos[strtoupper($Tipo)][2];
$cLong = $Long;
if( $_Tipos[strtoupper($Tipo)][0] != '#' ){
$cLong = $_Tipos[strtoupper($Tipo)][0];
}
if( strtoupper($Tipo)=='SET' || strtoupper($Tipo)=='ENUM' ){
$cLong = str_replace( $Long[0],'', $Long );
$xSelect = $cLong ;
$cLong = strlen($cLong);
$cEdicion = '0';
$cControl = 'SV';
$sSelect = '';
$op = explode(',',$xSelect);
for( $i=0; $i<count($op); $i++ ){
if( $i>0 ) $sSelect .= '; ';
$sSelect .= $op[$i].','.$op[$i];
}
$DimSelect[] = '[AddOption] * | '.$Campo.' | '.$sSelect;
}
if( $cEdicion!='#' && $cLong > $WrapInputext ){
$cLong = $cLong.','.$WrapInputext.','.ceil($cLong/$WrapInputext);
$cControl = 'A';
$cEdicion = '#';
}
if( $cEdicion=='#' && $cLong == '' ){
$cLong = $_Tipos[strtoupper($Tipo)][0];
$cControl = 'A';
$cEdicion = '#';
}
if( strtoupper(substr($Campo,0,3))=='CD_' ){
$pTabla = substr($Campo,3);
if( substr_count( ',GS_NODE,GS_USER,'.strtoupper($NomTabla).',', ','.strtoupper($pTabla).',' ) == 0 ){
if( $_DimESTRUCTURA[ $pTabla.'.'.'cd_'.$pTabla] == true && $_DimESTRUCTURA[ $pTabla.'.'.'nm_'.$pTabla] == true ){
$cControl = 'S';
$cLong = $_DimLenCampo[$pTabla]['nm_'.$pTabla];
}
}
}
if( $Campo == 'cd_'.$pTabla || $Campo == 'nm_'.$pTabla ) $FormStatic++;
if( $cControl == 'A' ) $cModo .= 'L';
if( substr_count(',TEXT,MEDIUMTEXT,BLOB,MEDIUMBLOB,', ','.strtoupper($Tipo).',' ) > 0 ){
$cLong = $DefTextArea;
}
if( $sNotaDeCampo!='' ) $NotaDeCampo[] = array( $Campo, $sNotaDeCampo );
if( $cEdicion=='F4' ) $cModo .= 'F';
if( $Campo==")" ) continue;
$tmpCampos[] = array( $Etiqueta, $Campo, $cEdicion, $cControl, $cLong, $cModo, $cCondicion );
}
if( substr_count(',TEXT,TINYTEXT,MEDIUMTEXT,BLOB,TINYBLOB,MEDIUMBLOB,', ','.strtoupper($Tipo).',' ) > 0 ){
$Memo = $Campo;
}
}
for( $i=0; $i<count($tmpCampos); $i++ ){
if( $tmpCampos[$i][5]!='*' ){
$tmpCampos[$i][5] .= $tmpIndice[$tmpCampos[$i][1]];
}
}
$Indice = '';
if( $Indice == '' ) $Indice = $PrimerCampo;
$NuevoIndice = false;
if( $Indice == '' ){
for( $i=0; $i<count($TipoIndice); $i++ ){
if( substr_count( $TipoIndice[$i], 'UNIQUE' ) == 1 ){
$Indice = $Indices[$i];
$NuevoIndice = true;
break;
}
}
if( $Indice == '' ){
for( $i=0; $i<count($TipoIndice); $i++ ){
if( substr_count( $TipoIndice[$i], 'PRIMARY' ) == 1 ){
$Indice = $Indices[$i];
$NuevoIndice = true;
break;
}
}
}
if( $NuevoIndice ){
$tmp = explode(',',$Indice);
for( $i=0; $i<count($tmp); $i++ ){
for( $n=0; $n<count($tmpCampos); $n++ ){
if( $tmpCampos[$n][1] == trim($tmp[$i]) ){
$tmpCampos[$n][5] = str_replace('M','A',$tmpCampos[$n][5] );
if( $tmpCampos[$n][5] != '*' ){
$tmpCampos[$n][6] = '#';
if( substr_count( $tmpCampos[$i][5], 'Q' ) == 0 ) $tmpCampos[$i][5] .= 'Q*';
}
}
}
}
}
}
$RelationFields = '';
for( $n=0; $n<count($tmpCampos); $n++ ){
if( $tmpCampos[$n][3] == 'S' ){
if( $n+1 < count($tmpCampos) ){
if( $tmpCampos[$n+1][3] == 'S' ){
$SegundaTabla = trim(substr($tmpCampos[$n+1][1],4));
if( $_DimCampo[$SegundaTabla][$tmpCampos[$n][1]] == true && $_DimCampo[$SegundaTabla][$tmpCampos[$n+1][1]] == true ){
$tmpCampos[$n+1][3] .= 's';
$RelationFields = $_SL.$_SL.'[RelationFields] '.$tmpCampos[$n][1].','.$tmpCampos[$n+1][1];
}
}
}
}
}
$UnSP = ( $Autoincremental != '' ) ? ' ':'';
$DimCHR = array(array('á','Á'),array('é','É'),array('í','Í'),array('ó','Ó'),array('ú','Ú'),array('ü','Ü') );
for( $i=0; $i<count($DimCHR); $i++ ){
$DFTitle = str_replace( $DimCHR[$i][0], $DimCHR[$i][1], $DFTitle );
}
$txt  =      '[TITLE] '.strtoupper($DFTitle).$_SL;
$txt .= $_SL.'[DBTable] '.$UnSP.$NomTabla;
if( $Autoincremental == '' ){
$txt .= $_SL.'[DBIndex] '.$UnSP.$Indice;
}else{
$txt .= $_SL.'[DBIndex] '.$UnSP.$Autoincremental;
}
$txt .= $_SL.'[DBOrder] '.$UnSP.$Orden;
if( $Autoincremental != '' ) $txt .= $_SL.'[DBSerial] '.$Autoincremental;
if( $Memo != ''				) $txt .= $_SL.'[DBMemo]  '.$UnSP.$Memo;
if( $FormStatic==2			) $txt .= $_SL.$_SL.'[FormStatic]';
$txt .= $RelationFields;
for( $i=0; $i<count($tmpCampos); $i++ ){
if( $tmpCampos[$i][3] == 'S' ){
for( $n=$i+1; $n<count($tmpCampos); $n++ ){
}
}
}
if( count($DimSelect) > 0 ) $txt .= $_SL;
for( $i=0; $i<count($DimSelect); $i++ ){
$txt .= $_SL.$DimSelect[$i];
}
$txt .= $_SL.$_SL.'[FIELDS]'.PintaCampos( $tmpCampos );
$txt .= $_SL.$_SL.$_SL.'[NOTE]';
if( $NotaDeTabla!='' ){
$txt .= $_SL.$_SL.'TABLA '.$NomTabla.': '.$NotaDeTabla;
}
if( count($NotaDeCampo)>0 ){
$txt .= $_SL.$_SL.'FIELDS:';
$LenCampo = 0;
for( $i=0; $i<count($NotaDeCampo); $i++ ){
if( strlen($NotaDeCampo[$i][0]) > $LenCampo ) $LenCampo = strlen($NotaDeCampo[$i][0]);
}
for( $i=0; $i<count($NotaDeCampo); $i++ ){
$txt .= $_SL.'  '.str_pad($NotaDeCampo[$i][0],$LenCampo,'.').': '.$NotaDeCampo[$i][1];
}
}
echo '<TD style="background: #FFFFCC">&nbsp;';
if( $ConFCH && !$FileStore ){
$NomDir = $_DirFCH.$xDir;
if( !is_dir( $NomDir ) ){
if( !mkdir( $NomDir, 0777 ) )  die('No se ha podido crear el directorio "'.$NomDir.'"');
if( !is_dir( $NomDir ) )	   die('No está el directorio "'.$NomDir.'"');
if( !is_readable(  $NomDir ) ) die('ERROR: (d-1) No es de lectura "'.$NomDir.'"');
if( !is_writeable( $NomDir ) ) die('ERROR: (d-2) No es de escritura "'.$NomDir.'"');
}
$fch = fopen( $_DirFCH.$xDir.'/'.$NomTabla.'.edf', 'w' );
fputs( $fch, $txt );
fclose($fch);
echo $xDir.'/'.$NomTabla.'.edf';
}
if( $_opCreaArbol && !$FileStore && $ConFCH ){
if( !$SeCreoSolapa ){
$SeCreoSolapa = true;
fputs( $ar, $GLOBALS['_IMG_OPTION'].'Maestras'.chr(10) );
}
$Ubicado = '';
if( $Todo ) $Ubicado = $xDir.'/';
if( $Ubicado=='/' ) $Ubicado = '';
if( substr( $NomTabla,0,3 ) != 'gs_' ){
fputs( $ar, chr(9).$NomEntidad.' | :'.$Ubicado.$NomTabla.chr(10) );
for( $i=0; $i<strlen($_Opciones); $i++ ){
fputs( $ar, chr(9).chr(9).$_NomOpcion[substr($_Opciones,$i,1)].'	| '.$_ModOpcion[substr($_Opciones,$i,1)].$_ModoEDES[substr($_Opciones,$i,1)].':'.chr(10) );
}
}
}
echo '<TD style="background:#CCFFFF">&nbsp;';
if( $_opCreaTablas ){
if( ExisteTabla( $NomTabla ) ) qQuery( 'drop table '.$NomTabla );
echo $NomTabla;
$CreateTable = trim($CreateTable);
if( substr($CreateTable,-1)==';' ) $CreateTable = substr($CreateTable,0,-1);
if( $AddDefTable!='' ) $CreateTable =  $CreateTable.' '.$AddDefTable;
qQuery( $CreateTable );
}
if( !$Todo ) return;
}
$NomEntidad = '';
}
if( strtoupper(substr($buffer,0,12)) == 'ALTER TABLE ' ){
$txt = trim($buffer);
while( substr_count($buffer,';')==0 && !feof($fd) ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
$txt .= ' '.$buffer;
}
echo '<TR><TD colspan=3 style="background:#CCFFFF">'.$txt;
qQuery( $txt );
}
}
fclose($ar);
}
function FCH_Informix( $DirDestino, $File, $tabla, $Todo, $ConFCH, $FileStore ){
global $_SL, $_ST, $_DirFCH, $_DimTabla, $_Opciones, $_NomOpcion, $_ModOpcion, $_Sql, $_ModoEDES;
global $_opCreaTablas, $_opCreaArbol, $_Tipos, $SeCreoSolapa, $AddDefTable, $_DimLenCampo;
if( !file_exists( $File ) ) return;
$ar = fopen( $DirDestino.'tree/master.txt', 'w' );
$xDir = 'edes';
$NotaDeTabla = '';
$NotaDeCampo = array();
$NomEntidad = '';
$Rem = false;
$sBuffer = '';
$fd = fopen( $File, 'r' );
while( !feof($fd) ){
if( $sBuffer == '' ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
while( substr_count( $buffer, '  ' ) > 0 ) $buffer = str_replace( '  ',' ',$buffer);
}
$sBuffer = '';
if( $buffer[0] == '{' ){
$Rem = true;
continue;
}else if( $Rem ){
if( substr_count( $buffer, '}' ) != 0 ) $Rem = false;
continue;
}
if( strtoupper(substr($buffer,0,5)) == '#DIR:' || strtoupper(substr($buffer,0,8)) == '#FOLDER:' ){
list(, $xDir ) = explode(':',$buffer);
$xDir = trim($xDir);
if( $xDir=='' ) $xDir = 'edes';
}
if( $_opCreaArbol && strtoupper(substr($buffer,0,6)) == '#MENU:' ){
list(, $NomMenu, $NomScript ) = explode(':',$buffer);
$NomMenu = trim($NomMenu);
$NomScript = trim($NomScript);
$Ubicado = '';
if( $Todo ) $Ubicado = $xDir.'/';
if( $Ubicado=='/' ) $Ubicado = '';
echo '<TR><TD colspan=3 style="background: #FFCC99">'.$NomMenu;
fputs( $ar, chr(9).$NomMenu.' | :'.$Ubicado.$NomScript.chr(10) );
for( $i=0; $i<strlen($_Opciones); $i++ ){
fputs( $ar, chr(9).chr(9).$_NomOpcion[substr($_Opciones,$i,1)].'	| '.$_ModOpcion[substr($_Opciones,$i,1)].$_ModoEDES[substr($_Opciones,$i,1)].':'.chr(10) );
}
}
if( strtoupper(substr($buffer,0,8)) == '#SOLAPA:' || strtoupper(substr($buffer,0,5)) == '#TAB:' ){
list(, $txt ) = explode(':',$buffer);
$txt = trim($txt);
if( $txt != '' ){
if( !$SeCreoSolapa ) $SeCreoSolapa = true;
fputs( $ar, $GLOBALS['_IMG_OPTION'].$txt.chr(10) );
}
}
if( strtoupper(substr($buffer,0,13)) == 'CREATE TABLE ' ){
$tmp = explode(' ',$buffer);
if( substr_count($tmp[2],'(') > 0 ){
$sTmp = str_replace( '(', ' (', $tmp[2] );
$buffer = str_replace( $tmp[2], $sTmp, $buffer );
$tmp = explode(' ',$buffer);
}
if( $Todo || $tmp[2] == $tabla ){
$DimSelect = array();
$CreateTable = $buffer;
$Autoincremental = '';
$Memo = '';
$DimCampos = array();
$NomTabla = trim($tmp[2]);
$sTmp = explode('#',$buffer);
if( count($sTmp) > 1 ){
list( $NomEntidad, $NotaDeTabla, $EsAux ) = explode(':',$sTmp[1]);
$NomEntidad = trim($NomEntidad);
$NotaDeTabla = trim($NotaDeTabla);
$EsAux = strtoupper(trim($EsAux));
}
if( $NomEntidad == '' ) $NomEntidad = strtoupper($NomTabla[0]).substr($NomTabla,1);
echo '<TR><TD style="background: #FFCC99">'.$NomEntidad;
if( substr_count( $buffer, '(' ) == 0 ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
$CreateTable .= $_ST.$buffer;
}
$Indice = '';
$PrimerCampo = '';
$FormStatic = 0;
while( substr_count( $buffer, ');' ) == 0 && !feof($fd) ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
while( substr_count( $buffer, '  ' ) > 0 ) $buffer = str_replace( '  ',' ',$buffer);
$sBuffer = $buffer;
if( substr($buffer,0,2) != '--' ){
if( substr_count( $buffer, '--' ) > 0 ){
$CreateTable .= $_ST.substr( $buffer, 0, strpos($buffer,'--') );
}else{
$CreateTable .= $_ST.$buffer;
}
}
if( substr($buffer,0,2) != '--' && substr_count( $buffer, ');' ) == 0 ){
$cModo = 'M';
$cCondicion = '';
$tmp = explode(' ',$buffer);
$Campo = $Etiqueta = trim($tmp[0]);
$sTmp = explode('--',$buffer);
$sNotaDeCampo = '';
if( count($sTmp) > 1 ){
list( $Etiqueta, $sNotaDeCampo ) = explode(':',$sTmp[1]);
$Etiqueta = trim($Etiqueta);
$sNotaDeCampo = trim($sNotaDeCampo);
if( $Etiqueta=='' ) $Etiqueta = strtoupper($Campo[0]).substr($Campo,1);
}else{
$Etiqueta = strtoupper($Etiqueta[0]).substr($Etiqueta,1);
}
if( substr_count( $tmp[1], '--' ) > 0 ){
$tmp[1] = substr( $tmp[1], 0, strpos($tmp[1],'--') );
}
list( $Tipo, $sTipo ) = explode('(',$tmp[1]);
$Tipo = trim($Tipo);
$sTipo = trim($sTipo);
if( substr($Tipo,-1)==',' ) $Tipo = substr($Tipo,0,-1);
if( $PrimerCampo != '' ) $PrimerCampo = $Campo;
$Control = 'T';
$Chr = 'D';
switch( $Tipo ){
case 'datetime':
$SubTipo = $tmp[1].' '.$tmp[2].' '.$tmp[3].' '.$tmp[4];
if( substr($SubTipo,-1)==',' ) $SubTipo = substr($SubTipo,0,-1);
switch( $SubTipo ){
case 'datetime year to year':
$Chr = '0';
$Long = 4;
break;
case 'datetime year to month':
$Chr = 'P4';
$Long = 7;
break;
case 'datetime year to day':
$Chr = 'F4';
$Long = 10;
break;
case 'datetime year to minute':
$Chr = 'CDI';
$Long = 16;
break;
case 'datetime year to second':
$Chr = 'CDI';
$Long = 19;
break;
default:
echo $NomTabla.'<br>'.$Campos.'<br>'.$buffer;
die('<br>----> ERROR: '.$SubTipo);
}
break;
case 'date':
$Long = 10;
$Chr = 'F4';
break;
case 'char':
case 'nchar':
case 'varchar':
case 'nvarchar':
list( $Long, ) = explode(')',$sTipo);
if( $Long > 80 ){
$Long = $Long.',80,'.floor($Long/80);
$Control = 'A';
$Chr = '#';
}
break;
case 'money':
case 'decimal':
list( $Long, ) = explode(')',$sTipo);
$Chr = '-';
if( substr_count( $sTipo, ',' ) > 0 ) $Char .= ',';
break;
case 'smallint':
$Long = 4;
$Chr = '-';
break;
case 'int':
case 'integer':
$Long = 9;
$Chr = '-';
break;
case 'serial':
$Long = 9;
$Chr = '*';
$Indice = $Campo;
$Autoincremental = $Campo;
$cModo = '*Q*';
$cCondicion = '';
break;
case 'int8':
case 'serial8':
$Long = 18;
$Chr = '-';
break;
case 'float':
$Long = '14,2';
$Chr = '-,';
break;
case 'smallfloat':
$Long = '6,2';
$Chr = '-,';
break;
case 'byte':
case 'text':
$Long = '2000,80,4';
$Control = 'A';
$Chr = '#';
if( $Memo != '' ) $Memo .= ',';
$Memo .= $Campo;
break;
default:
echo $NomTabla.'<br>'.$Campos.'<br>'.$buffer;
die('<br>----> ERROR: '.$Tipo);
}
if( strtoupper(substr($Campo,0,3))=='CD_' ){
if( in_array( strtoupper(substr($Campo,3)), $_DimTabla ) ){
if( substr_count( ",gs_node,gs_user,{$NomTabla},", ','.substr($Campo,3).',' ) == 0 ){
$Control = 'S';
}
}
}
if( $Campo == 'cd_'.$NomTabla || $Campo == 'nm_'.$NomTabla ) $FormStatic++;
if( $Control == 'A' ) $cModo .= 'L';
if( $sNotaDeCampo!='' ) $NotaDeCampo[] = array( $Campo, $sNotaDeCampo );
$DimCampos[] = array( $Etiqueta, $Campo, $Chr, $Control, $Long, $cModo, $cCondicion  );
}
}
if( $Indice == '' ) $Indice = $PrimerCampo;
$UnSP = ( $Autoincremental != '' ) ? ' ':'';
$txt  =      '[TITLE] '.strtoupper($NomTabla).$_SL;
$txt .= $_SL.'[DBTable] '.$UnSP.$NomTabla;
if( $Autoincremental == '' ){
$txt .= $_SL.'[DBIndex] '.$UnSP.$Indice;
}else{
$txt .= $_SL.'[DBIndex] '.$UnSP.$Autoincremental;
}
$txt .= $_SL.'[DBOrder] '.$UnSP.$Orden;
if( $Autoincremental != '' ) $txt .= $_SL.'[DBSerial] '.$Autoincremental;
if( $Memo != ''				) $txt .= $_SL.'[DBMemo]  '.$Memo;
if( $FormStatic==2			) $txt .= $_SL.$_SL.'[FormStatic]';
$txt .= $_SL.$_SL.'[FIELDS]'.PintaCampos( $DimCampos );
$txt .= $_SL.$_SL.$_SL.'[NOTE]';
if( $NotaDeTabla!='' ){
$txt .= $_SL.$_SL.'TABLA '.$NomTabla.': '.$NotaDeTabla;
}
if( count($NotaDeCampo)>0 ){
$txt .= $_SL.$_SL.'CAMPOS:';
$LenCampo = 0;
for( $i=0; $i<count($NotaDeCampo); $i++ ){
if( strlen($NotaDeCampo[$i][0]) > $LenCampo ) $LenCampo = strlen($NotaDeCampo[$i][0]);
}
for( $i=0; $i<count($NotaDeCampo); $i++ ){
$txt .= $_SL.'  '.str_pad($NotaDeCampo[$i][0],$LenCampo,'.').': '.$NotaDeCampo[$i][1];
}
}
$Rem = false;
$paso = false;
$Salir = false;
while( !feof($fd) && !$Salir ){
if( $buffer[0] == '#' ) break;
if( $buffer[0] == '{' ){
$Rem = true;
}else if( $Rem ){
if( substr_count( $buffer, '}' ) != 0 ) $Rem = false;
}
if( !$Rem ){
switch( strtoupper(substr($buffer,0,11)) ){
case 'CREATE TRIG':
case 'CREATE VIEW':
case 'REVOKE ALL ':
case 'CREATE TABL':
case 'DROP TABLE ':
$Salir = true;
break;
default:
if( $paso ){
if( substr($buffer,0,2) != '--' && substr_count( $buffer, '}' ) == 0 ){
if( substr_count( $buffer, '--' ) > 0 ){
$CreateTable .= $_ST.substr( $buffer, 0, strpos($buffer,'--') );
}else{
$CreateTable .= $_ST.$buffer;
}
}
}
break;
}
}
if( !$Salir ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
while( substr_count( $buffer, '  ' ) > 0 ) $buffer = str_replace( '  ',' ',$buffer);
$sBuffer = $buffer;
}
$paso = true;
}
if( $ConFCH && !$FileStore ){
$NomDir = $_DirFCH.$xDir;
if( !is_dir( $NomDir ) ){
if( !mkdir( $NomDir, 0777 ) )  die('No se ha podido crear el directorio "'.$NomDir.'"');
if( !is_dir( $NomDir ) )		 die('No está el directorio "'.$NomDir.'"');
if( !is_readable(  $NomDir ) ) die('ERROR: (d-3) No es de lectura "'.$NomDir.'"');
if( !is_writeable( $NomDir ) ) die('ERROR: (d-4) No es de escritura "'.$NomDir.'"');
echo "<TR><TH colspan=2 id=c class=GRUPO>Creando el directorio '".str_replace('../','',$NomDir)."'</TH>";
}
$fch = fopen( $_DirFCH.$xDir.'/'.$NomTabla.'.edf', 'w' );
fputs( $fch, $txt );
fclose($fch);
}
if( $_opCreaArbol && !$FileStore ){
if( !$SeCreoSolapa ){
$SeCreoSolapa = true;
fputs( $ar, $GLOBALS['_IMG_OPTION'].'Maestras'.chr(10) );
}
$Ubicado='';
if( $Todo ) $Ubicado = $xDir.'/';
if( $Ubicado=='/' ) $Ubicado = '';
if( substr( $NomTabla,0,3 ) != 'gs_' ){
fputs( $ar, chr(9).$NomEntidad.' | :'.$Ubicado.$NomTabla.chr(10) );
for( $i=0; $i<strlen($_Opciones); $i++ ){
fputs( $ar, chr(9).chr(9).$_NomOpcion[substr($_Opciones,$i,1)].'	| '.$_ModOpcion[substr($_Opciones,$i,1)].$_ModoEDES[substr($_Opciones,$i,1)].':'.chr(10) );
}
}
}
if( $_opCreaTablas ){
if( ExisteTabla( $NomTabla ) ) qQuery( 'drop table '.$NomTabla );
$tmp = explode( ';', $CreateTable );
$ne = 0;
for( $i=0; $i<count($tmp); $i++ ){
if( trim($tmp[$i]) != '' ){
if( $ne==0 ){
qQuery( $tmp[$i].$AddDefTable );
}else{
qQuery( $tmp[$i] );
}
$ne++;
}
}
}
if( !$Todo ) return;
}
$NomEntidad = '';
}
if( strtoupper(substr($buffer,0,12)) == 'ALTER TABLE ' ){
$txt = trim($buffer);
while( substr_count($buffer,';')==0 && !feof($fd) ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
$txt .= ' '.$buffer;
}
echo '<TR><TD colspan=3 style="background:#CCFFFF">'.$txt;
qQuery( $txt );
}
}
fclose($fd);
fclose($ar);
}
function FCH_Oracle( $DirDestino, $File, $tabla, $Todo, $ConFCH, $FileStore ){
global $_SL, $_ST, $_DirFCH, $_DimTabla, $_DimCampo, $_Opciones, $_NomOpcion, $_ModOpcion, $_Sql;
global $_opCreaTablas, $_opCreaArbol, $_Tipos, $SeCreoSolapa, $_DimLenCampo, $_ModoEDES;
global $_DimESTRUCTURA, $DefTextArea, $WrapInputext, $_SqlUsuario, $_DEBUG, $AddDefTable;
$uSqlUsuario = strtoupper($_SqlUsuario);
if( !file_exists( $File ) ) return;
$ar = fopen( $DirDestino.'tree/master.txt', 'a' );
$xDir = 'edes';
$NomEntidad = '';
$NotaDeTabla = '';
$NotaDeCampo = array();
$Rem = false;
$sBuffer = '';
$DimBuffer = file( $File );
for( $ndb=0; $ndb<count($DimBuffer); $ndb++ ){
$buffer = trim( $DimBuffer[$ndb] );
while( substr_count( $buffer, '  ' ) > 0 ) $buffer = str_replace( '  ',' ',$buffer);
$sBuffer = '';
if( $buffer[0] == '{' ){
$Rem = true;
continue;
}else if( $Rem ){
if( substr_count( $buffer, '}' ) != 0 ) $Rem = false;
continue;
}
if( strtoupper(substr($buffer,0,5)) == '#DIR:' || strtoupper(substr($buffer,0,8)) == '#FOLDER:' ){
list(, $xDir ) = explode(':',$buffer);
$xDir = trim($xDir);
}
if( $_opCreaArbol && strtoupper(substr($buffer,0,6)) == '#MENU:' ){
list(, $NomMenu, $NomScript ) = explode(':',$buffer);
$NomMenu = trim($NomMenu);
$NomScript = trim($NomScript);
$Ubicado = '';
if( $Todo ) $Ubicado = $xDir.'/';
if( $Ubicado=='/' ) $Ubicado = '';
echo '<TR><TD colspan=3 style="background: #FFCC99">'.$NomMenu;
fputs( $ar, chr(9).$NomMenu.' | :'.$Ubicado.$NomScript.chr(10) );
for( $i=0; $i<strlen($_Opciones); $i++ ){
fputs( $ar, chr(9).chr(9).$_NomOpcion[substr($_Opciones,$i,1)].'	| '.$_ModOpcion[substr($_Opciones,$i,1)].$_ModoEDES[substr($_Opciones,$i,1)].':'.chr(10) );
}
}
if( preg_match("/^#STORE:/i", strtoupper($buffer)) ){
$aFile = str_replace(' ','',trim($buffer));
$aFile = explode(',',substr($aFile,7));
for( $n=0; $n<count($aFile); $n++ ){
$iFichero = $DirDestino."_doc_/tbl/_{$aFile[$n]}.mnu";
if( file_exists($iFichero) ){
$fdi = fopen( $iFichero, 'r' );
$txt = fread( $fdi, filesize($iFichero) );
fclose($fdi);
fputs( $ar, $txt.chr(10) );
}
}
continue;
}
if( strtoupper(substr($buffer,0,8)) == '#SOLAPA:' || strtoupper(substr($buffer,0,5)) == '#TAB:' ){
list(, $txt ) = explode(':',$buffer);
$txt = trim($txt);
if( $txt != '' ){
if( !$SeCreoSolapa ) $SeCreoSolapa = true;
fputs( $ar, $GLOBALS['_IMG_OPTION'].$txt.chr(10) );
}
}
if( strtoupper(substr($buffer,0,13)) == 'CREATE TABLE ' ){
$NotaDeTabla = '';
$NotaDeCampo = array();
$tmpCampos = array();
$tmpIndice = array();
$Indices = array();
$TipoIndice = array();
$tmp = explode(' ',$buffer);
if( substr_count($tmp[2],'(') > 0 ){
$sTmp = str_replace( '(', ' (', $tmp[2] );
$buffer = str_replace( $tmp[2], $sTmp, $buffer );
$tmp = explode(' ',$buffer);
}
if( $Todo || $tmp[2] == $tabla ){
$DimSelect = array();
list($CreateTable,) = explode('#',$buffer);
$Autoincremental = '';
$Memo = '';
$DimCampos = array();
$NomTabla = trim($tmp[2]);
$sTmp = explode('#',$buffer);
if( count($sTmp) > 1 ){
list( $NomEntidad, $NotaDeTabla, $EsAux ) = explode(':',$sTmp[1]);
$NomEntidad = trim($NomEntidad);
$NotaDeTabla = trim($NotaDeTabla);
$EsAux = strtoupper(trim($EsAux));
$DFTitle = $NomEntidad;
$NomEntidad = EnPlural( $NomEntidad, '', $false );
}
if( $NomEntidad == '' ){
$NomEntidad = strtoupper($NomTabla[0]).substr($NomTabla,1);
$DFTitle = $NomEntidad;
$NomEntidad = EnPlural( $NomEntidad, '', $false );
}
echo '<TR><TD style="background: #FFCC99">'.$NomEntidad;
if( substr_count( $buffer, '(' ) == 0 ){
$ndb++;
$buffer = trim( $DimBuffer[$ndb] );
$tmp = explode('#',$buffer);
$CreateTable .= $_ST.$tmp[0];
}
$Indice = '';
$Orden = '';
$PrimerCampo = '';
$FormStatic = 0;
$SeTermino = false;
while( substr($buffer,-1)!=';' && $ndb<count($DimBuffer) ){
$ndb++;
$buffer = trim( $DimBuffer[$ndb] );
while( substr_count( $buffer, '  ' ) > 0 ) $buffer = str_replace( '  ',' ',$buffer);
$sBuffer = $buffer;
if( $buffer[0] != '#' ){
if( substr_count( $buffer, '#' ) > 0 ){
$CreateTable .= $_ST.substr( $buffer, 0, strpos($buffer,'#') );
}else{
$CreateTable .= $_ST.$buffer;
}
}
if( $buffer==')' ) $SeTermino = true;
if( $SeTermino ) continue;
$EsIndice = false;
$item = explode(' ',strtoupper($buffer));
if( $item[0] == 'KEY' ){
$EsIndice = true;
}else if( $item[0] == 'PRIMARY' || $item[0] == 'PRIMARY KEY' ){
$EsIndice = true;
}else if( $item[0] == 'UNIQUE' ){
$EsIndice = true;
}else if( substr_count(strtoupper($buffer),'PRIMARY KEY') == 1 ){
$tmp = explode(' ',$buffer);
if( $Orden=='' ) $Orden = $tmp[0];
$Indices[] = $tmp[0];
$TipoIndice[] = 'PRIMARY';
$tmpIndice[$tmp[0]] = 'Q';
$Indice = $tmp[0];
$cEdicion = '*';
$cModo = '*';
$cCondicion = '';
}
if( $EsIndice ){
$tmp = explode('(',$buffer);
$tmp = explode(')',$tmp[1]);
if( $Orden=='' ) $Orden = $tmp[0];
$Indices[] = $tmp[0];
$TipoIndice[] = $item[0];
$op = explode(',',str_replace(' ','',$tmp[0]));
for( $i=0; $i<count($op); $i++ ){
$tmpIndice[$op[$i]] = 'Q';
}
}
if( !$EsIndice && $buffer[0] != '#' && $buffer!=');' && $buffer!=')' ){
$cModo = 'M';
$cCondicion = '';
$tmp = explode(' ',$buffer);
$Campo = $Etiqueta = trim($tmp[0]);
$sTmp = explode('#',$buffer);
$sNotaDeCampo = '';
if( count($sTmp) > 1 ){
list( $Etiqueta, $sNotaDeCampo, $no ) = explode(':',$sTmp[1]);
if( $no!='' ){
$Etiqueta .= ':'.$sNotaDeCampo;
$sNotaDeCampo = $no;
}
$Etiqueta = trim($Etiqueta);
$sNotaDeCampo = trim($sNotaDeCampo);
if( $Etiqueta=='' ) $Etiqueta = strtoupper($Campo[0]).substr($Campo,1);
}else{
$Etiqueta = strtoupper($Etiqueta[0]).substr($Etiqueta,1);
}
if( substr_count( $tmp[1], '#' ) > 0 ){
$tmp[1] = substr( $tmp[1], 0, strpos($tmp[1],'#') );
}
if( substr_count( strtoupper($buffer), ' SERIAL' ) > 0 ){
$buffer = str_replace(' SERIAL','',$buffer);
$buffer = str_replace(' serial','',$buffer);
$Indice = $Campo;
$cEdicion = '*';
$cModo = '*Q*';
$cCondicion = '';
$Autoincremental = $Campo;
$CreateTable = str_replace(' SERIAL','',$CreateTable);
$CreateTable = str_replace(' serial','',$CreateTable);
}else if( substr_count( strtoupper($buffer), 'NOT NULL' ) > 0 ){
$cCondicion = '#';
}
if( $PrimerCampo == '' ) $PrimerCampo = $Campo;
list( $Tipo, $Long ) = explode('(',$tmp[1]);
$Tipo = trim($Tipo);
list( $Long ) = explode(')',$Long);
$Long = trim($Long);
if( substr($Tipo,-1)==',' ) $Tipo = substr($Tipo,0,-1);
$cEdicion = $_Tipos[strtoupper($Tipo)][1];
$cControl = $_Tipos[strtoupper($Tipo)][2];
$cLong = $Long;
if( $_Tipos[strtoupper($Tipo)][0] != '#' ){
$cLong = $_Tipos[strtoupper($Tipo)][0];
}
if( $cEdicion!='#' && $cLong > $WrapInputext ){
$cLong = $cLong.','.$WrapInputext.','.ceil($cLong/$WrapInputext);
$cControl = 'A';
$cEdicion = '#';
}
if( $cEdicion=='#' && $cLong == '' ){
$cLong = $_Tipos[strtoupper($Tipo)][0];
$cControl = 'A';
$cEdicion = '#';
}
if( strtoupper(substr($Campo,0,3))=='CD_' ){
$pTabla = substr($Campo,3);
if( substr_count( ',GS_NODE,GS_USER,'.strtoupper($NomTabla).',', ','.strtoupper($pTabla).',' ) == 0 ){
if( $_DimESTRUCTURA[ $pTabla.'.'.'cd_'.$pTabla] == true && $_DimESTRUCTURA[ $pTabla.'.'.'nm_'.$pTabla] == true ){
$cControl = 'S';
}
}
}
if( $Campo == 'cd_'.$pTabla || $Campo == 'nm_'.$pTabla ) $FormStatic++;
if( $cControl == 'A' ) $cModo .= 'L';
if( $cLong > $WrapInputext ) $cLong = $DefTextArea;
if( $sNotaDeCampo!='' ) $NotaDeCampo[] = array( $Campo, $sNotaDeCampo );
if( $cEdicion=='F4' ) $cModo .= 'F';
$tmpCampos[] = array( $Etiqueta, $Campo, $cEdicion, $cControl, $cLong, $cModo, $cCondicion );
}
}
$DimNewIndices = array();
$xndb = $ndb;
for( $sndb=$ndb+1; $sndb<count($DimBuffer); $sndb++ ){
$buffer = trim($DimBuffer[$sndb]);
if( strtoupper(substr($buffer,0,13)) == 'CREATE INDEX ' || strtoupper(substr($buffer,0,20)) == 'CREATE UNIQUE INDEX ' ){
if( substr($buffer,-1)==';' ) $buffer = substr($buffer,0,-1);
$DimNewIndices[] = $buffer;
$item = explode(' ',$buffer);
$tmp = explode('(',$buffer);
$tmp = explode(')',$tmp[1]);
if( $Orden=='' ) $Orden = $tmp[0];
$Indices[] = $tmp[0];
$TipoIndice[] = strtoupper($item[1]);
$op = explode(',',str_replace(' ','',$tmp[0]));
for( $i=0; $i<count($op); $i++ ){
$tmpIndice[$op[$i]] = 'Q';
}
}else if( $buffer[0]=='#' || strtoupper(substr($buffer,0,13)) == 'CREATE TABLE ' ) break;
}
$ndb = $xndb;
$Indice = '';
$Order = '';
for( $i=0; $i<count($TipoIndice); $i++ ){
if( substr_count( $TipoIndice[$i], 'PRIMARY' ) == 1 ){
$Indice = $Indices[$i];
break;
}
}
for( $i=0; $i<count($TipoIndice); $i++ ){
if( substr_count( $TipoIndice[$i], 'PRIMARY' ) == 1 || substr_count( $TipoIndice[$i], 'UNIQUE' ) == 1 ){
if( substr_count( $TipoIndice[$i], 'UNIQUE' ) == 1 ){
if( $Orden!='' ) $Orden = $Indices[$i];
}
$tmp = explode(',',$Indice);
for( $p=0; $p<count($tmp); $p++ ){
for( $n=0; $n<count($tmpCampos); $n++ ){
if( $tmpCampos[$n][1] == trim($tmp[$p]) ){
$tmpCampos[$n][5] = str_replace('M','A',$tmpCampos[$n][5] );
if( $tmpCampos[$n][5] != '*' ){
$tmpCampos[$n][6] = '#';
if( substr_count( $tmpCampos[$p][5], 'Q' ) == 0 ) $tmpCampos[$p][5] .= 'Q*';
}
}
}
}
}
}
for( $i=0; $i<count($TipoIndice); $i++ ){
if( substr_count( $TipoIndice[$i], 'INDEX' ) == 1 ){
if( $Orden!='' ) $Orden = $Indices[$i];
break;
}
}
for( $i=0; $i<count($tmpCampos); $i++ ){
if( $tmpCampos[$i][5]!='*' ){
$tmpCampos[$i][5] .= $tmpIndice[$tmpCampos[$i][1]];
$tmpCampos[$i][5] = str_replace('QQ','Q',$tmpCampos[$i][5]);
}
}
$RelationFields = '';
for( $n=0; $n<count($tmpCampos); $n++ ){
if( $tmpCampos[$n][3] == 'S' ){
if( $n+1 < count($tmpCampos) ){
if( $tmpCampos[$n+1][3] == 'S' ){
$SegundaTabla = trim(substr($tmpCampos[$n+1][1],4));
if( $_DimCampo[$SegundaTabla][$tmpCampos[$n][1]] == true && $_DimCampo[$SegundaTabla][$tmpCampos[$n+1][1]] == true ){
$tmpCampos[$n+1][3] .= 's';
$RelationFields = $_SL.$_SL.'[RelationFields] '.$tmpCampos[$n][1].','.$tmpCampos[$n+1][1];
}
}
}
}
}
$UnSP = ( $Autoincremental != '' ) ? ' ':'';
$DimCHR = array(array('á','Á'),array('é','É'),array('í','Í'),array('ó','Ó'),array('ú','Ú'),array('ü','Ü') );
for( $i=0; $i<count($DimCHR); $i++ ){
$DFTitle = str_replace( $DimCHR[$i][0], $DimCHR[$i][1], $DFTitle );
}
$txt  =      '[TITLE] '.strtoupper($DFTitle).$_SL;
$txt .= $_SL.'[DBTable] '.$UnSP.$NomTabla;
if( $Autoincremental == '' ){
$txt .= $_SL.'[DBIndex] '.$UnSP.$Indice;
}else{
$txt .= $_SL.'[DBIndex] '.$UnSP.$Autoincremental;
}
$txt .= $_SL.'[DBOrder] '.$UnSP.$Orden;
if( $Autoincremental != '' ) $txt .= $_SL.'[DBSerial] '.$Autoincremental;
if( $Memo != ''				) $txt .= $_SL.'[DBMemo]  '.$UnSP.$Memo;
if( $FormStatic==2			) $txt .= $_SL.$_SL.'[FormStatic]';
$txt .= $RelationFields;
for( $i=0; $i<count($tmpCampos); $i++ ){
if( $tmpCampos[$i][3] == 'S' ){
for( $n=$i+1; $n<count($tmpCampos); $n++ ){
}
}
}
if( count($DimSelect) > 0 ) $txt .= $_SL;
for( $i=0; $i<count($DimSelect); $i++ ){
$txt .= $_SL.$DimSelect[$i];
}
$txt .= $_SL.$_SL.'[FIELDS]'.PintaCampos( $tmpCampos );
$txt .= $_SL.$_SL.$_SL.'[NOTE]';
if( $NotaDeTabla!='' ){
$txt .= $_SL.$_SL.'TABLA '.$NomTabla.': '.$NotaDeTabla;
}
if( count($NotaDeCampo)>0 ){
$txt .= $_SL.$_SL.'FIELDS:';
$LenCampo = 0;
for( $i=0; $i<count($NotaDeCampo); $i++ ){
if( strlen($NotaDeCampo[$i][0]) > $LenCampo ) $LenCampo = strlen($NotaDeCampo[$i][0]);
}
for( $i=0; $i<count($NotaDeCampo); $i++ ){
$txt .= $_SL.'  '.str_pad($NotaDeCampo[$i][0],$LenCampo,'.').': '.$NotaDeCampo[$i][1];
}
}
echo '<TD style="background: #FFFFCC">&nbsp;';
if( $ConFCH && !$FileStore ){
$NomDir = $_DirFCH.$xDir;
if( !is_dir( $NomDir ) ){
if( !mkdir( $NomDir, 0777 ) )  die('No se ha podido crear el directorio "'.$NomDir.'"');
if( !is_dir( $NomDir ) )		 die('No está el directorio "'.$NomDir.'"');
if( !is_readable(  $NomDir ) ) die('ERROR: (d-5) No es de lectura "'.$NomDir.'"');
if( !is_writeable( $NomDir ) ) die('ERROR: (d-6) No es de escritura "'.$NomDir.'"');
}
$fch = fopen( $_DirFCH.$xDir.'/'.$NomTabla.'.edf', 'w' );
fputs( $fch, $txt );
fclose($fch);
echo $xDir.'/'.$NomTabla.'.edf';
}
if( $_opCreaArbol && !$FileStore && $ConFCH ){
if( !$SeCreoSolapa ){
$SeCreoSolapa = true;
fputs( $ar, $GLOBALS['_IMG_OPTION'].' Maestras'.chr(10) );
}
$Ubicado = '';
if( $Todo ) $Ubicado = $xDir.'/';
if( $Ubicado=='/' ) $Ubicado = '';
if( strtoupper(substr( $NomTabla,0,3 )) != 'GS_' ){
fputs( $ar, chr(9).$NomEntidad.' | :'.$Ubicado.$NomTabla.chr(10) );
for( $i=0; $i<strlen($_Opciones); $i++ ){
fputs( $ar, chr(9).chr(9).$_NomOpcion[substr($_Opciones,$i,1)].'	| '.$_ModOpcion[substr($_Opciones,$i,1)].$_ModoEDES[substr($_Opciones,$i,1)].':'.chr(10) );
}
}
}
echo '<TD style="background:#CCFFFF">&nbsp;';
if( $_opCreaTablas ){
if( $Autoincremental!='' ){
$uNomTabla = strtoupper($NomTabla);
if( qCount('all_sequences', "SEQUENCE_NAME='SQ{$uNomTabla}' and SEQUENCE_OWNER='{$uSqlUsuario}'" ) == 1 ){
qQuery( "drop sequence {$_SqlUsuario}.SQ".$uNomTabla );
}
}
if( ExisteTabla( $NomTabla ) ){
qQuery( "drop table {$_SqlUsuario}.".$NomTabla );
}
echo $NomTabla;
$CreateTable = trim($CreateTable);
$CreateTable = str_replace('create table ','create table '.$_SqlUsuario.'.',$CreateTable);
if( $AddDefTable!='' ) $CreateTable = str_replace( ');', ')'.$AddDefTable.';', $CreateTable );
if( substr($CreateTable,-1)==';' ) $CreateTable = substr($CreateTable,0,-1);
qQuery( $CreateTable );
if( $Autoincremental!='' ){
$Secuencia = "CREATE SEQUENCE {$_SqlUsuario}.sq{$NomTabla} START WITH 1 INCREMENT BY 1 MINVALUE 0 CACHE 4 NOCYCLE ORDER";
qQuery( $Secuencia );
}
}
for( $n=0; $n<count($DimNewIndices); $n++ ){
echo '<TR><TD colspan=2>&nbsp;<TD style="background:#CCFFFF"><FONT SIZE="-1">&nbsp;'.$DimNewIndices[$n].'</FONT>';
qQuery( $DimNewIndices[$n] );
}
if( !$Todo ) return;
}
$NomEntidad = '';
}
if( strtoupper(substr($buffer,0,12)) == 'ALTER TABLE ' ){
$txt = trim($buffer);
while( substr_count($buffer,';')==0 && !feof($fd) ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
$txt .= ' '.$buffer;
}
echo '<TR><TD colspan=3 style="background:#CCFFFF">'.$txt;
qQuery( $txt );
}
}
fclose($ar);
}
function PintaCampos( $Dim ){
global $_SL;
$Long = array( 0,0,0,0,0,0,0 );
$txt = '';
for( $i=0; $i<count($Dim); $i++ ){
for( $e=0; $e<7; $e++ ){
$Long[$e] = max( strlen($Dim[$i][$e]), $Long[$e] );
}
}
for( $i=0; $i<count($Dim); $i++ ){
$txt .= $_SL.'   ';
for( $e=0; $e<7; $e++ ){
if( $e == 5 ) $txt .= '| ';
if( $e == 6 ) $txt .= '| ';
if( $Long[$e] == 0 ){
$txt .= '| ';
}else{
$txt .= str_pad( $Dim[$i][$e], $Long[$e] ). ' | ';
}
}
}
return rtrim($txt);
}
function MemTablas2222( $File, $EsSql ){
global $_DimTabla;
if( !$EsSql ){
$DimTablas = file( $File );
for( $i=0; $i<count($DimTablas); $i++ ){
$DimTablas[$i] = trim( $DimTablas[$i] );
if( $DimTablas[$i][0] != '' && $DimTablas[$i][0] != '.'&& substr( $DimTablas[$i],0,2 ) != '--' ){
$_DimTabla[] = strtoupper($DimTablas[$i]);
}
}
}else{
if( !file_exists( $File ) ) return;
$Rem = false;
$fd = fopen( $File, 'r' );
while( !feof($fd) ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
while( substr_count( $buffer, '  ' ) > 0 ) $buffer = str_replace( '  ',' ',$buffer);
if( $buffer[0] == '{' ){
$Rem = true;
continue;
}else if( $Rem ){
if( substr_count( $buffer, '}' ) != 0 ) $Rem = false;
continue;
}
if( strtoupper(substr($buffer,0,13)) == 'CREATE TABLE ' ){
$tmp = explode(' ',$buffer);
if( substr_count($tmp[2],'(') > 0 ){
$sTmp = str_replace( '(', ' (', $tmp[2] );
$buffer = str_replace( $tmp[2], $sTmp, $buffer );
$tmp = explode(' ',$buffer);
}
$_DimTabla[] = strtoupper(trim($tmp[2]));
}
}
fclose($fd);
}
}
function ExisteTabla( $tabla ){
global $_Sql;
if( eSqlType('informix') ){
return( qCount('systables', "tabid >= 100 and tabname='{$tabla}'" ) );
}else if( eSqlType('mysql,mysqli') ){
return( mysql_query("SHOW FIELDS FROM {$tabla}") );
}else if( eSqlType('oracle') ){
global $_SqlUsuario;
$tabla = strtoupper($tabla);
$uSqlUsuario = strtoupper($_SqlUsuario);
return( qCount('all_tables', "table_name='{$tabla}' and owner='{$uSqlUsuario}'") );
}
}
function MemFIELDS( $File ){
global $_DimESTRUCTURA;
if( !file_exists( $File ) ) return;
$xDir = 'edes';
$NomEntidad = '';
$NotaDeTabla = '';
$NotaDeCampo = array();
$Rem = false;
$sBuffer = '';
$fd = fopen( $File, 'r' );
while( !feof($fd) ){
if( $sBuffer == '' ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
while( substr_count( $buffer, '  ' ) > 0 ) $buffer = str_replace( '  ',' ',$buffer);
}
$sBuffer = '';
if( $buffer[0] == '{' ){
$Rem = true;
continue;
}else if( $Rem ){
if( substr_count( $buffer, '}' ) != 0 ) $Rem = false;
continue;
}
if( preg_match("/^#STORE:/i", strtoupper($buffer) ) ){
StoreEstructura( $_DimESTRUCTURA, $buffer, 'ent' );
continue;
}
if( strtoupper(substr($buffer,0,13)) == 'CREATE INDEX ' || strtoupper(substr($buffer,0,20)) == 'CREATE UNIQUE INDEX ' ){
$tmp = explode('(',$buffer);
$tmp = explode(')',$tmp[1]);
if( $Orden=='' ) $Orden = $tmp[0];
$op = explode(',',str_replace(' ','',$tmp[0]));
for( $i=0; $i<count($op); $i++ ){
$tmpIndice[$op[$i]] = 'Q';
}
}
if( strtoupper(substr($buffer,0,13)) == 'CREATE TABLE ' ){
$NotaDeTabla = '';
$NotaDeCampo = array();
$tmpCampos = array();
$tmpIndice = array();
$Indices = array();
$TipoIndice = array();
$tmp = explode(' ',$buffer);
if( substr_count($tmp[2],'(') > 0 ){
$sTmp = str_replace( '(', ' (', $tmp[2] );
$buffer = str_replace( $tmp[2], $sTmp, $buffer );
$tmp = explode(' ',$buffer);
}
$DimSelect = array();
list($CreateTable,) = explode('#',$buffer);
$Autoincremental = '';
$Memo = '';
$DimCampos = array();
$NomTabla = trim($tmp[2]);
$sTmp = explode('#',$buffer);
if( count($sTmp) > 1 ){
list( $NomEntidad, $NotaDeTabla ) = explode(':',$sTmp[1]);
$NomEntidad = trim($NomEntidad);
$NotaDeTabla = trim($NotaDeTabla);
}
if( $NomEntidad == '' ) $NomEntidad = strtoupper($NomTabla[0]).substr($NomTabla,1);
if( substr_count( $buffer, '(' ) == 0 ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
$tmp = explode('#',$buffer);
$CreateTable .= $_ST.$tmp[0];
}
$Indice = '';
$Orden = '';
$PrimerCampo = '';
while( $buffer!=');' && $buffer!=')' && !feof($fd) ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
if( preg_match("/^#STORE:/i", strtoupper($buffer)) ){
StoreEstructura( $_DimESTRUCTURA, $buffer, 'fld', $NomTabla );
continue;
}
while( substr_count( $buffer, '  ' ) > 0 ) $buffer = str_replace( '  ',' ',$buffer);
$sBuffer = $buffer;
if( $buffer[0] != '#' ){
if( substr_count( $buffer, '#' ) > 0 ){
$CreateTable .= $_ST.substr( $buffer, 0, strpos($buffer,'#') );
}else{
$CreateTable .= $_ST.$buffer;
}
}
$EsIndice = false;
$item = explode(' ',strtoupper($buffer));
if( $item[0] == 'KEY' ){
$EsIndice = true;
}else if( $item[0] == 'PRIMARY' || $item[0] == 'PRIMARY KEY' ){
$EsIndice = true;
}else if( $item[0] == 'UNIQUE' ){
$EsIndice = true;
}
if( $EsIndice ){
$tmp = explode('(',$buffer);
$tmp = explode(')',$tmp[1]);
if( $Orden=='' ) $Orden = $tmp[0];
$Indices[] = $tmp[0];
$TipoIndice[] = $item[0];
$op = explode(',',str_replace(' ','',$tmp[0]));
for( $i=0; $i<count($op); $i++ ){
$tmpIndice[$op[$i]] = 'Q';
}
}
if( !$EsIndice && $buffer[0] != '#' && $buffer!=');' && $buffer!=')' ){
$cModo = 'M';
$cCondicion = '';
$tmp = explode(' ',$buffer);
$Campo = $Etiqueta = trim($tmp[0]);
$sTmp = explode('#',$buffer);
$sNotaDeCampo = '';
if( count($sTmp) > 1 ){
list( $Etiqueta, $sNotaDeCampo ) = explode(':',$sTmp[1]);
$Etiqueta = trim($Etiqueta);
$sNotaDeCampo = trim($sNotaDeCampo);
if( $Etiqueta=='' ) $Etiqueta = strtoupper($Campo[0]).substr($Campo,1);
}else{
$Etiqueta = strtoupper($Etiqueta[0]).substr($Etiqueta,1);
}
$_DimESTRUCTURA[$NomTabla.'.'.$Campo] = true;
}
}
for( $i=0; $i<count($tmpCampos); $i++ ){
$tmpCampos[$i][5] .= $tmpIndice[$tmpCampos[$i][1]];
}
$NomEntidad = '';
}
}
}
function EnPlural( $Titulo, $Delante, $EnPlural ){
$Titulo = str_replace('"',"'",$Titulo);
$Titulo = str_replace('&nbsp;',' ',$Titulo);
$sTitulo = '';
$sc = '';
if( $EnPlural ){
for( $i=0; $i<strlen($Titulo); $i++ ){
$c = substr( $Titulo,$i, 1 );
if( !($sc != '<' && $c=='/') ) $sTitulo .= $c;
$sc = $c;
}
}else{
$Mem = true;
for( $i=0; $i<strlen($Titulo); $i++ ){
$c = substr( $Titulo,$i, 1 );
if( $sc != '<' && $c=='/' ){
$Mem = false;
}else if( substr_count(' .,:;()',$c) > 0 ){
$Mem = true;
}
if( $Mem ) $sTitulo .= $c;
$sc = $c;
}
}
$Titulo = $sTitulo;
return $Titulo;
}
function RenameDir(){
global $_Web_;
chdir( '../../' );
if( !file_exists( $_Web_.'/_doc_/install.on' ) ){
eHTML();
echo '<style> TABLE { FONT-FAMILY: ARIAL; FONT-SIZE: 16; } </STYLE>';
echo '</head>';
echo '<body scroll=auto style="margin:0" onhelp="return false;" oncontextmenu="return false;">';
txtError('ERROR: No se puede renombrar al estar la INTRANET "BLOQUEADA"' );
die( '</body></html>' );
}
$DirNuevo = $_POST['NomDir'];
$DirActual = $_Web_;
$Error = '';
$RefrescarEn = '';
$ConReload = ( substr_count( $_SERVER['PHP_SELF'] , $DirActual ) > 0 );
if( is_dir( $DirActual ) ){
if( !is_readable( $DirActual ) ) $Error = 'ERROR: El directorio actual no es de lectura';
if( $Error=='' ){
if( !is_writeable( $DirActual ) ) $Error = 'ERROR: El directorio actual no es de escritura';
if( $Error=='' ){
if( is_dir( $DirNuevo ) ) $Error = 'ERROR: El nuevo directorio ya existe';
if( $Error=='' ){
if( strtoupper(substr(PHP_OS,0,3)) == 'LIN' || strtoupper(substr(PHP_OS,0,3)) == 'UNI' ){
passthru( "mv {$DirActual} {$DirNuevo}" );
}else if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
passthru( "rename {$DirActual} {$DirNuevo}" );
}else{
exit;
}
}
}
}
}
eHTML('','','gsCreate');
?>
<style>
body {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
FONT-SIZE: 13px;
MARGIN: 10px;
BORDER: 0;
CURSOR: default;
}
</style>
</HEAD><BODY onhelp='return false;' oncontextmenu='return false;'>
<?PHP
if( $Error!='' ) die('<br> '.$Error);
?>
<SCRIPT type="text/javascript">
<?PHP
$_Web_ = $DirNuevo;
$_SESSION['_Web_'] = $DirNuevo;
?>
top.document.getElementById('TITULO').innerText = '<?= $DirNuevo; ?>';
alert('Intranet renombrada');
</SCRIPT>
</BODY></HTML>
<?PHP
exit;
}
function deleteDirectory($dir) {
if(!$dh = @opendir($dir)) return;
while(false !== ($current = readdir($dh))){
if($current != '.' && $current != '..'){
echo 'Se ha borrado el archivo '.$dir.'/'.$current.'<br/>';
if(!@unlink($dir.'/'.$current)) deleteDirectory($dir.'/'.$current);
}
}
closedir($dh);
echo 'Se ha borrado el directorio '.$dir.'<br/>';
@rmdir($dir);
}
function BorrarINTRANET(){
global $_Web_, $_Tree;
chdir('../../');
if( $_Web_=='' )  $Error = 'ERROR: Indeterminado';
if( !is_dir( $_Web_ ) ) $Error = 'ERROR: El directorio "'.$_Web_.'" no existe';
if( $Error=='' && file_exists( $_Web_.'/tree/master.txt' ) ){
include( $_Web_.'/_doc_/install.ini' );
$_Sql = $DataBase;
$_SqlHostName = $HostName;
$_SqlUsuario = $Usuario;
$_SqlPassword = $Password;
$_SqlDiccionario = $Diccionario;
if( $_Sql!='' && $_SqlHostName!='' && $_SqlUsuario!='' && $_SqlPassword!='' && $_SqlDiccionario!='' ){
BorraBD( $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario );
}
}
eHTML('','','gsCreate');
?>
<style>
body {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
FONT-SIZE: 13px;
MARGIN: 10px;
BORDER: 0;
CURSOR: default;
}
</style>
</HEAD><BODY onhelp='return false;' oncontextmenu='return false;'>
<?PHP
if( $Error!='' ) die('<br> '.$Error);
deleteDirectory( "{$_Web_}" );
sleep(5);
clearstatcache();
deleteDirectory( "{$_Web_}" );
?>
<SCRIPT type="text/javascript">
<?PHP
if( TotalWeb() > 0 ){
echo 'top.SetMenus(1);';
}else{
echo 'top.SetMenus(0);';
}
?>
alert('INTRANET "<?= $_Web_; ?>" BORRADA');
</SCRIPT>
</BODY></HTML>
<?PHP
exit;
}
function CreateWeb(){
set_time_limit(60*3);
$DirNuevo = $_POST['NomDir'];
$tmp = explode('/', eGetCWD());
$DirActual = $tmp[count($tmp)-2];
$Error = '';
$RefrescarEn = '';
chdir('../../');
if( is_dir( $DirNuevo ) ){
$dir_handle = opendir($DirNuevo);
while( $dir=readdir($dir_handle) ){
if( $dir!='.' && $dir!='..' ) $Error = 'ERROR: El nuevo directorio ya existe y no está vacío';
}
}
eHTML('','','gsCreate');
?>
<style>
body {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
FONT-SIZE: 13px;
MARGIN: 10px;
BORDER: 0;
CURSOR: default;
}
</style>
</HEAD><BODY onhelp='return false;' oncontextmenu='return false;'>
<?PHP
if( $Error!='' ) die('<br> '.$Error);
if( strtoupper(substr(PHP_OS,0,3)) == 'LIN' || strtoupper(substr(PHP_OS,0,3)) == 'UNI' ){
exec( "cp -R edesweb/web/edesweb {$DirNuevo}" );
}else if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
CopyDirectorio( 'edesweb/web/edesweb', $DirNuevo );
}else{
exit;
}
unlink( $DirNuevo.'/_tmp/__tron.-1' );
unlink( $DirNuevo.'/_tmp/__tron.-1.bak' );
?>
<SCRIPT type="text/javascript">
alert('Nueva web creada en "<?= $DirNuevo ?>"');
top.document.getElementById('SelWeb').disabled = false;
</SCRIPT>
</BODY></HTML>
<?PHP
exit;
}
function Seg( $Desde ){
$tmpI = explode(' ',$GLOBALS['_IniSg']);
$tmpF = explode(' ',microtime());
$tmpI = $tmpI[0]+$tmpI[1];
$tmpF = $tmpF[0]+$tmpF[1];
$sg = substr(($tmpF-$tmpI),0,7);
eTron( $Desde.': '.$sg );
}
function BloquearWeb(){
global $_Web_;
chdir('../../'.$_Web_);
eHTML('','','gsCreate');
?>
<style>
body {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
FONT-SIZE: 13px;
MARGIN: 10px;
BORDER: 0;
CURSOR: default;
}
</style>
</HEAD><BODY onhelp='top.HelpIFRAME();return false;' oncontextmenu='return false;'>
<SCRIPT type="text/javascript">
var Obj = top.document.getElementById('BBDD');
<?PHP
if( file_exists( '_doc_/install.on' ) ){
unlink( '_doc_/install.on' );
echo 'Obj.innerText = "Desbloquear INTRANET";';
echo 'top.SetMenus(4);';
echo 'alert("INTRANET BLOQUEADA");';
}else{
echo 'Obj.innerText = "Bloquear INTRANET";';
echo 'top.SetMenus(3);';
echo 'alert("INTRANET DESBLOQUEADA");';
}
echo '</'.'SCRIPT></BODY></HTML>';
exit;
}
function SeleccionarINTRANET(){
eHTML('','','gsCreate');
?>
<style>
body {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
FONT-SIZE: 13px;
MARGIN: 10px;
BORDER: 0px;
CURSOR: default;
}
TABLE {
border: 1px solid #3f474c;
FONT-SIZE: 13px;
}
TABLE TH {
text-align: left;
background: #789aab;
padding-left: 2px;
cursor:default;
}
TABLE TD {
background: #f2f2f2;
padding-left: 10px;
padding-right: 5px;
cursor:pointer;
WHITE-SPACE: nowrap;
}
</style>
</HEAD><BODY onhelp='top.HelpIFRAME();return false;' oncontextmenu='return false;'>
<SCRIPT type="text/javascript">
top.S.init(window);
function SelIntra(){
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return;
var txt = "<?=eHTML('','','',true)?></HEAD><BODY style='padding:0px; margin:0px;' scroll='no'>"+
'<FORM METHOD=POST ACTION="edes.php?gscreate">';
txt += '<INPUT TYPE="HIDDEN" NAME="Orden" VALUE="NewDir">';
txt += '<INPUT TYPE="HIDDEN" NAME="Dir" VALUE="'+Obj.innerText+'">';
txt += '</FORM></BODY></HTML>';
document.write( txt );
document.close();
document.forms[0].submit();
}
</SCRIPT><CENTER><BR><BR><BR>
<?PHP
$DimWeb = array();
chdir('../../');
$dir_handle = opendir('.');
while( $dir = readdir($dir_handle) ){
if( $dir != '.' && $dir != '..' && $dir != 'edes' ){
if( is_dir($dir) ){
if( !file_exists($dir.'/edes.php') && file_exists($dir.'/http/edes.php') ){
$DimWeb[] = $dir;
}
}
}
}
closedir($dir_handle);
if( count($DimWeb) > 0 ){
echo '<table onclick="SelIntra()"><tr><th>INTRANET A SELECCIONAR';
sort($DimWeb);
for( $n=0; $n<count($DimWeb); $n++ ) echo '<tr><td>'.$DimWeb[$n];
echo '</table>';
}else{
}
echo '</CENTER></BODY></HTML>';
exit;
}
function SetDir( $NewDir ){
global $_Web_;
$_Web_ = trim($NewDir);
$_SESSION['_Web_'] = $_Web_;
clearstatcache();
chdir('../../'.$_Web_);
$nOp = 2;
if( file_exists( 'tree/master.txt' ) ){
if( file_exists( '_doc_/install.on' ) ){
$nOp = 3;
}else{
$nOp = 4;
}
}
eHTML('','','gsCreate');
?>
</HEAD><BODY style="background: #f2f2f2;" oncontextmenu="return false;">
<SCRIPT type="text/javascript">
top.S.init(window);
top.SetMenus( <?= $nOp; ?> );
top.document.getElementById("TITULO").innerText = '<?= $_Web_; ?>';
var Obj = top.document.getElementById('BBDD');
<?PHP
if( $nOp == 3 ) echo 'Obj.innerText = "Bloquear INTRANET";';
if( $nOp == 4 ) echo 'Obj.innerText = "Desbloquear INTRANET";';
?>
alert( 'INTRANET "<?= $_Web_ ?>" SELECCIONADA' );
</SCRIPT></BODY></HTML>
<?PHP
exit;
}
function Leer_LP( &$Login, &$Pass, &$_TipoUsu, &$NumBak, &$_gsNomUser, &$_gsACCESO=NULL ){
global $Dir_;
if( file_exists('../_d_/cfg/e'.'d.l'.'p') ){
$fd = @fopen('../_d_/cfg/e'.'d.l'.'p','r');
}else{
exit;
}
$cTxt = @fread($fd,(1900+59)*100);
@fclose($fd);
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+2,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+3+$n,1));
$Basura += $LongDeLong + 3;
$b = 0;
$txt = '';
for( $n=$Basura; $n<$Basura+($LenCadena*2); $n++ ){
if( $b==0 ) $txt .= substr($cTxt,$n,1);
$b++; if( $b>1 ) $b=0;
}
$tmp = explode(chr(10),gzuncompress($txt));
if( 212940319 != crc32(trim($tmp[0])) ) exit;
@_LoadSqlIni('_',trim($tmp[1]));
return gzuncompress($txt);
}
function UsuariosDeDesarrollo( $NomUser ){
global $_Web_, $_DimCol;
chdir("../../{$_Web_}/http/");
$Autor = false;
if( file_exists('../_d_/cfg/e'.'d.l'.'p') ){
$DimFila = explode("\n",trim(Leer_LP()));
list( $Id, ) = explode( "\t", $DimFila[1] );
for( $f=4; $f<count($DimFila); $f++ ){
$tmp = explode("\t",$DimFila[$f]);
if( $tmp[0]=='~' ) $Autor = true;
}
}else{
$DimFila = array('','','','');
$DimFila[3] = "TIPO	LOGIN	CLAVE	ACCESO	EMAIL	iTools	Edit	Help	Shell	Tools	Tree	Icon	Create";
}
$gsEdition = ( ( $_SESSION['_D_']=='~' ) ? ' onload="top.eITools(window);"':'');
eHTML('','','e-Des · Usuarios');
?>
<style>
#I { TEXT-ALIGN: left; }
#C { TEXT-ALIGN: center; }
#D { TEXT-ALIGN: right; }
BODY {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
FONT-SIZE: 13px;
MARGIN: 10px;
BORDER: 0px;
CURSOR: default;
}
TABLE {
BACKGROUND: #3f474c;
FONT-SIZE: 13px;
}
TABLE TH {
BACKGROUND: #0066cc;
COLOR: #ffffff;
cursor: default;
TEXT-TRANSFORM: uppercase;
}
TABLE TD {
background: #fffbf0;
cursor: pointer;
white-space: nowrap;
}
.Boton {
BORDER: #789aab 1px outset;
FONT-WEIGHT: bold;
F-ILTER: progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr=#f2f2f2, endColorstr=#789aab);
COLOR: #ffffff;
}
.Boton TABLE, .Boton TD {
background: transparent;
color: #ffffff;
FONT-WEIGHT: bold;
}
.SinAcceso {
background-color: #dcdcdc;
}
.SUBMENU {
position: absolute;
display: none;
background: #3f474c;
}
.SUBMENU TD {
background: #FFFFCC;
padding: 0px 5px 0px 5px;
}
.BROWSE THEAD TH{
cursor:default;
}
.BROWSE TBODY{
cursor:pointer;
}
</style>
<SCRIPT type="text/javascript" name=eDes>
document.title = "LIST";
top.S.init(window,"all,list");
<?= include("../../edesweb/binary.js"); ?>
</SCRIPT>
</HEAD><BODY<?= $gsEdition; ?> on-scroll=S(document.body).scrollSet("#DATOS"); onhelp='return top.gsHelp("$dv_usuarios",event);'<?=( ($_SESSION['_D_']!='~') ? ' oncontextmenu="return false;"' : '' )?> onselectstart='return false;'>
<TABLE id=SMU class="SUBMENU col_0l" cellspacing=1px cellpadding=1px border=0px onclick='PutValor(this)' onmouseleave=this.style.display="none">
<?PHP
if( $Autor ) echo '<TR><TD>e-Des</TD></TR>';
?>
<TR><TD>Analista</TD></TR>
<TR><TD>Master</TD></TR>
<TR><TD>Programador</TD></TR>
<TR><TD>Help</TD></TR>
<?PHP
if( $Autor ) echo '<TR><TD>Demo</TD></TR>';
?>
</TABLE>
<TABLE id=SMSN class=SUBMENU cellspacing=1px cellpadding=1px border=0 onclick='PutValor(this)' onmouseleave=this.style.display="none">
<TR><TD>Si
<TR><TD>No
</TABLE>
<TABLE id=SMNum class=SUBMENU cellspacing=1px cellpadding=1px border=0 onclick='PutValor(this)' onmouseleave=this.style.display="none">
<TR><TD>0
<TR><TD>1
<TR><TD>2
<TR><TD>3
<TR><TD>4
<TR><TD>5
<TR><TD>6
</TABLE>
<SCRIPT type="text/javascript">
var _FCH_ = '$a/u/_usuarios.gs';
if( window.name == 'IWORK' ){
document.write('<CENTER><B>USUARIOS DE DESARROLLO</B></CENTER>');
top.eLoading(false,window);
}
function Grabar(){
_Baja = false;
var Obj = document.getElementById('DATOS').rows,
txt = '',
DimUsu = new Array(), f, c;
for(f=0; f<Obj.length; f++){
if( f > 0 ) txt += '\n';
var UnUsu = '';
for(c=0; c<Obj[0].cells.length; c++){
if( Obj[f].cells[c].textContent.replace(/\s+$/g,'')=='STYLE' ){
txt += 'Tools\t';
}else{
txt += Obj[f].cells[c].textContent + '\t';
}
if( c < 2 ){
UnUsu += Obj[f].cells[c].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'').toUpperCase()+'|';
if( Obj[f].cells[c].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'') == '' ){
top.eAlert( S.lng(212), 'Las columnas "TIPO" y "LOGIN" son obligatorias', 'A', 'E' );
return;
}
}
}
if( DimUsu[UnUsu] == 1 ){
var tmp = UnUsu.split('|');
top.eAlert( S.lng(212), 'Usuario "'+tmp[1]+'" repetido', 'A', 'E' );
return;
}
DimUsu[UnUsu] = 1;
}
var sHTM = "<?=eHTML('','','',true)?></HEAD><BODY>"+
'<FORM METHOD=POST ACTION="edes.php?gscreate">';
sHTM += '<INPUT TYPE="HIDDEN" NAME="Desarrollo" VALUE="'+txt+'">';
sHTM += '</FORM></BODY></HTML>';
top.TLF.document.write( sHTM );
top.TLF.document.close();
top.TLF.document.forms[0].submit();
}
function Alta(){
_Baja = false;
var Obj = document.getElementById('DATOS'),
TR = Obj.insertRow(Obj.rows.length), c;
for(c=0; c<Obj.rows[0].cells.length; c++){
TR.insertCell(c).textContent=' ';
}
TR.cells[1].innerHTML='&nbsp;';
document.body.scrollTop = 1000;
}
var _Baja = false;
function Baja(){
_Baja = true;
}
function PutValor( el ){
if( S.event(window).tagName!='TD' ) return;
var Valor = S.trim(S.event(window).textContent);
if( DATOS.rows[0].cells[_Obj.cellIndex].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'').toUpperCase() == 'CREATE' ){
if(Valor!=3 && _Obj.parentNode.cells[1].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'')=='<?= $NomUser; ?>' ){
top.eAlert( S.lng(212), 'No se puede quitar uno mismo el acceso a gsCreate', 'A', 'E' );
return;
}
}
_Obj.textContent = Valor;
if( _Obj.textContent=='0' ) _Obj.textContent = '';
el.style.display = 'none';
}
function xy( el ){
var xy = new Array(0,0);
while( el != null ){
xy[0] += el.offsetLeft;
xy[1] += el.offsetTop;
el = el.offsetParent;
}
return xy;
}
var _Obj = null;
function SubMenu(){
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return;
if( _Baja ){
var TR = Obj.parentNode;
document.getElementById('DATOS').deleteRow(TR.rowIndex);
_Baja = false;
setTimeout(function(){
S(document.body).scrollSet("#DATOS");
},100);
return;
}
_Baja = false;
var TH = Obj.parentNode.parentNode.parentNode.rows[0].cells[Obj.cellIndex];
_Obj = Obj
var NomSMenu = 'SM'+TH.getAttribute("T");
switch( TH.getAttribute("T") ){
case 'U':
break;
case 'TL':
EditTd();
return false;
case 'TE':
EditTd();
return false;
case 'SN':
break;
default:
for(var i=0; i<7; i++) document.getElementById("SMNum").rows[i].style.display = (TH.getAttribute("T")<i) ? 'none':'block';
NomSMenu = 'SMNum';
}
var cxy = xy( Obj );
with( DGI(NomSMenu).style ){
left = px(cxy[0]-1);
top = px(cxy[1]+Obj.offsetHeight);
display = 'block';
}
}
</SCRIPT>
<SCRIPT type="text/javascript">
function eClearEvent(men){
try{
S.eventClear(window);
}catch(e){}
return false;
}
function EditTdExit(){
var Obj = S.event(window),
txt = Obj.value.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+\s+/g,' ');
Obj = Obj.parentNode;
document.body.focus();
setTimeout(function(){
Obj.innerHTML = txt;
},1);
return eClearEvent();
}
function EditTdKey(){
var iCode = S.eventCode(event);
event.returnValue = true;
if( iCode == 13 ){
EditTdExit();
return eClearEvent();
}else if( iCode == 27 ){
var Obj = S.event(window);
Obj = Obj.parentNode;
Obj.textContent = Obj.vOld;
return eClearEvent();
}
return true;
}
function EditTd(){
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return false;
Obj.vOld = Obj.textContent;
var oInput = document.createElement('INPUT');
oInput.onkeydown = EditTdKey;
oInput.value = Obj.textContent;
oInput.onblur = EditTdExit;
Obj.textContent = '';
Obj.appendChild(oInput);
oInput.focus();
return false;
}
</SCRIPT>
<CENTER><BR>
<?PHP
$DimTipo = array( '~'=>'e-Des', 'A'=>'Analista', 'M'=>'Master', 'P'=>'Programador', 'H'=>'Help', 'D'=>'Demo');
$DimTE = array();
$DimAlign = array();
for( $c=0; $c<count($_DimCol); $c++ ){
$DimTE[$_DimCol[$c]] = $TEdicion[$c];
$DimAlign[$_DimCol[$c]] = $TAlign[$c];
}
$ColEdit = array();
echo '<TABLE id=DATOS class="BROWSE col_2c col_3c col_4c col_6r col_7r col_8r col_9r col_10r col_11r col_12r col_13c col_14r" cellspacing=1px cellpadding=2px border=0px onclick="SubMenu()" style="margin-bottom:10px">';
$tmp = explode("\t",$DimFila[3]);
$TotalCol = count($tmp);
for( $c=0; $c<$TotalCol; $c++ ){
if( in_array( $tmp[$c], $_DimCol )){
echo '<COL id='.$DimAlign[$tmp[$c]];
if( $tmp[$c]=='LOGIN' ){
echo ' style="text-transform:uppercase;"';
}else if( $tmp[$c]=='EMAIL' ){
echo ' style="text-transform:lowercase;"';
}
echo '>';
}
}
echo '<THEAD><TR>';
for( $c=0; $c<$TotalCol; $c++ ){
if( in_array( $tmp[$c], $_DimCol )){
echo '<TH T='.$DimTE[$tmp[$c]].' id=C>'.((strtoupper($tmp[$c])=='TOOLS')?'STYLE':$tmp[$c]);
$ColEdit[$c] = 1;
}else{
$ColEdit[$c] = 0;
}
}
echo '</THEAD><TBODY>';
for( $f=4; $f<count($DimFila); $f++ ){
$tmp = explode("\t",$DimFila[$f]);
if( count($tmp)<$TotalCol ) for( $i=count($tmp); $i<$TotalCol; $i++ ) $tmp[$i] = ' ';
echo '<TR>';
if( $tmp[3] == 1 ){
$Clase = '';
}else{
$Clase = ' class=SinAcceso';
}
for( $c=0; $c<$TotalCol; $c++ ){
if( $ColEdit[$c] ){
if( $c==2 ){
if( strlen(trim($tmp[$c]))==32 ){
echo "<TD{$Clase}>Si";
}else{
echo "<TD{$Clase}>No";
}
}else if( $c==3 || $c==4 || $c==27 ){
if( $tmp[$c] == 1 ){
echo "<TD{$Clase}>Si";
}else{
echo "<TD{$Clase}>No";
}
}else{
if( $c==0 ){
echo "<TD{$Clase}>".$DimTipo[$tmp[$c]];
}else{
echo "<TD{$Clase}>".$tmp[$c];
}
}
}
}
}
echo '</TBODY></TABLE><BR>';
?>
<table onclick=Alta()	class=OpButton border=0px cellspacing=0px cellpadding=0px style="display:inline-table;"><tr><td><img src=g/op_insert.gif><td>&nbsp;Alta</table>&nbsp;
<table onclick=Baja()	class=OpButton border=0px cellspacing=0px cellpadding=0px style="display:inline-table;"><tr><td><img src=g/op_delete.gif><td>&nbsp;Borrar</table>&nbsp;&nbsp;&nbsp;
<table onclick=Grabar()	class=OpButton border=0px cellspacing=0px cellpadding=0px style="display:inline-table;"><tr><td><img src=g/op_update.gif><td>&nbsp;Grabar</table>
<?PHP
echo '</CENTER>';
?>
<SCRIPT type="text/javascript">
if( window.frameElement.MODAL!=undefined ) top.eSWIResize( window, -1 );
top.eLoading(0,window);
</SCRIPT>
<?PHP
echo '</BODY></HTML>';
eEnd();
}
function UsuariosDeDesarrollo22( $NomUser ){
global $_Web_, $_DimCol;
chdir("../../{$_Web_}/http/");
$Autor = false;
if( file_exists('../_d_/cfg/e'.'d.l'.'p') ){
$DimFila = explode("\n",trim(Leer_LP()));
list( $Id, ) = explode( "\t", $DimFila[1] );
for( $f=4; $f<count($DimFila); $f++ ){
$tmp = explode("\t",$DimFila[$f]);
if( $tmp[0]=='~' ) $Autor = true;
}
}else{
$DimFila = array('','','','');
$DimFila[3] = "TIPO	LOGIN	CLAVE	ACCESO	EMAIL	iTools	Edit	Help	Shell	Tools	Tree	Icon	Create";
}
eHTML('','','gsCreate');
?>
<style>
#I { TEXT-ALIGN: left; }
#C { TEXT-ALIGN: center; }
#D { TEXT-ALIGN: right; }
body {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
FONT-SIZE: 13px;
MARGIN: 10px;
BORDER: 0px;
CURSOR: default;
}
TABLE {
BACKGROUND: #3f474c;
FONT-SIZE: 13px;
}
TABLE TH {
background: #789aab;
cursor:default;
}
TABLE TD {
background: #fffbf0;
padding-left: 10px;
padding-right: 5px;
cursor: pointer;
WHITE-SPACE: nowrap;
}
.SubMenu {
position: absolute;
display: none;
background: #3f474c;
}
.SubMenu TD {
background: #FFFFCC;
}
</style>
<SCRIPT type="text/javascript" name=eDes>
top.S.init(window);
</SCRIPT>
</HEAD><BODY onhelp='top.HelpIFRAME();return false;' oncontextmenu='return false;'>
<TABLE id=SMU class=SubMenu cellspacing=1 cellpadding=1 border=0 onclick='PutValor(this)' onmouseleave=this.style.display="none">
<?PHP
if( $Autor ) echo '<TR><TD>e-Des</TD></TR>';
?>
<TR><TD>Analista</TD></TR>
<TR><TD>Master</TD></TR>
<TR><TD>Programador</TD></TR>
<TR><TD>Help</TD></TR>
<?PHP
if( $Autor ) echo '<TR><TD>Demo</TD></TR>';
?>
</TABLE>
<TABLE id=SMSN class=SubMenu cellspacing=1 cellpadding=1 border=0 onclick='PutValor(this)' onmouseleave=this.style.display="none">
<TR><TD>Si
<TR><TD>No
</TABLE>
<TABLE id=SMNum class=SubMenu cellspacing=1 cellpadding=1 border=0 onclick='PutValor(this)' onmouseleave=this.style.display="none">
<TR><TD>0
<TR><TD>1
<TR><TD>2
<TR><TD>3
<TR><TD>4
<TR><TD>5
<TR><TD>6
</TABLE>
<SCRIPT type="text/javascript">
function Grabar(){
_Baja = false;
var Obj = document.getElementById("DATOS").rows;
var txt = '';
var DimUsu = new Array();
for( var f=0; f<Obj.length; f++ ){
if( f > 0 ) txt += '\n';
var UnUsu = '';
for( var c=0; c<Obj[0].cells.length; c++ ){
txt += Obj[f].cells[c].innerText + '\t';
if( c < 2 ){
UnUsu += Obj[f].cells[c].innerText.replace(/^\s+/g,'').replace(/\s+$/g,'').toUpperCase()+'|';
if( Obj[f].cells[c].innerText.replace(/^\s+/g,'').replace(/\s+$/g,'') == '' ){
alert( 'ERROR:\n\nLas columnas "TIPO" y "LOGIN" son obligatorias' );
return;
}
}
}
if( DimUsu[UnUsu] == 1 ){
var tmp = UnUsu.split('|');
alert( 'ERROR:\n\nUsuario "'+tmp[1]+'" repetido' );
return;
}
DimUsu[UnUsu] = 1;
}
var sHTM = "<?=eHTML('','','',true)?></HEAD><BODY>"+
'<FORM METHOD=POST ACTION="edes.php?gscreate">';
sHTM += '<INPUT TYPE="HIDDEN" NAME="Desarrollo" VALUE="'+txt+'">';
sHTM += '</FORM></BODY></HTML>';
TLF.document.write( sHTM );
TLF.document.close();
TLF.document.forms[0].submit();
}
function Alta(){
_Baja = false;
var Obj = document.getElementById("DATOS");
var TR = Obj.insertRow(Obj.rows.length);
for( var c=0; c<Obj.rows[0].cells.length; c++ ){
TR.insertCell(c).innerText = ( c==2 ) ? 'No':' ';
}
}
var _Baja = false;
function Baja(){
_Baja = true;
}
function PutValor( el ){
if( S.event(window).tagName!='TD' ) return;
if( DATOS.rows[0].cells[_Obj.cellIndex].innerText.replace(/^\s+/g,'').replace(/\s+$/g,'').toUpperCase() == 'CREATE' ){
if(_Obj.parentElement.cells[1].innerText.replace(/^\s+/g,'').replace(/\s+$/g,'')=='<?= $NomUser; ?>' && parseInt(S.event(window).innerText)!=3 ){
alert('No se puede quitar uno mismo el acceso a gsCreate');
return;
}
}
if( _Obj.cellIndex==2 && _Obj.getAttribute('_pw')!='Si' ){
_Obj.innerText = 'No'
}else{
_Obj.innerText = S.event(window).innerText;
}
el.style.display = 'none';
}
function xy( el ){
var xy = new Array(0,0);
while( el != null ){
xy[0] += el.offsetLeft;
xy[1] += el.offsetTop;
el = el.offsetParent;
}
return xy;
}
var _Obj = null;
function SubMenu(){
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return;
if( _Baja ){
var TR = Obj.parentElement;
document.getElementById("DATOS").deleteRow(TR.rowIndex);
_Baja = false;
return;
}
_Baja = false;
var TH = Obj.parentElement.parentElement.parentElement.rows[0].cells[Obj.cellIndex];
_Obj = Obj
var NomSMenu = 'SM'+TH.T;
switch( TH.T ){
case 'U':
break;
case 'TL':
EditTd();
return false;
case 'TE':
EditTd();
return false;
case 'SN':
break;
default:
for( var i=0; i<7; i++ ) document.getElementById("SMNum").rows[i].style.display = (TH.T<i) ? 'none':'block';
NomSMenu = 'SMNum';
}
var cxy = xy( Obj );
with( document.getElementById(NomSMenu).style ){
left = cxy[0]-1;
top = cxy[1]+Obj.offsetHeight;
display = 'block';
}
}
</SCRIPT>
<SCRIPT type="text/javascript">
function EditTdExit(){
var Obj = S.event(window);
Obj = Obj.parentElement;
var txt = Obj.innerText.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+\s+/g,' ');
document.body.focus();
setTimeout(function(){
Obj.innerHTML = txt;
},1);
return eClearEvent();
}
function EditTdKey(){
var iCode = S.eventCode(event);
event.returnValue = true;
if( iCode == 13 ){
EditTdExit();
return AnulaKey();
}else if( iCode == 27 ){
var Obj = S.event(window);
Obj = Obj.parentElement;
Obj.innerHTML = Obj.vOld;
return AnulaKey();
}
return true;
}
function EditTd(){
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return false;
Obj.vOld = Obj.innerText;
var oInput = document.createElement('DIV');
oInput.onkeydown = EditTdKey;
oInput.innerText = Obj.innerText;
oInput.onblur = EditTdExit;
Obj.innerText = '';
Obj.appendChild(oInput);
oInput.contentEditable = true;
oInput.focus();
return false;
}
</SCRIPT>
<CENTER><BR>
<?PHP
$TEdicion = explode(',','U   ,TL   ,SN   ,SN    ,TE   ,3    ,3    ,3   ,6    ,3    ,3   ,3   ,3');
$TAlign   = explode(',','I   ,I    ,C    ,C     ,I    ,C    ,C    ,C   ,C    ,C    ,C   ,C   ,C');
$DimTipo = array( '~'=>'e-Des', 'A'=>'Analista', 'M'=>'Master', 'P'=>'Programador', 'H'=>'Help', 'D'=>'Demo');
$DimTE = array();
$DimAlign = array();
for( $c=0; $c<count($_DimCol); $c++ ){
$DimTE[$_DimCol[$c]] = $TEdicion[$c];
$DimAlign[$_DimCol[$c]] = $TAlign[$c];
}
$ColEdit = array();
echo '<TABLE id=DATOS cellSpacing=1px cellPadding=2px border=0 onclick="SubMenu()">';
$tmp = explode("\t",$DimFila[3]);
$TotalCol = count($tmp);
for( $c=0; $c<count($tmp); $c++ ){
if( in_array( $tmp[$c], $_DimCol )){
echo '<COL id='.$DimAlign[$tmp[$c]];
if( $tmp[$c]=='LOGIN' ){
echo ' style="TEXT-TRANSFORM:uppercase;"';
}else if( $tmp[$c]=='EMAIL' ){
echo ' style="TEXT-TRANSFORM:lowercase;"';
}
echo '>';
}
}
echo '<TR>';
for( $c=0; $c<count($tmp); $c++ ){
if( in_array( $tmp[$c], $_DimCol )){
echo '<TH T='.$DimTE[$tmp[$c]].' id=C>'.$tmp[$c];
$ColEdit[$c] = 1;
}else{
$ColEdit[$c] = 0;
}
}
for( $f=4; $f<count($DimFila); $f++ ){
$tmp = explode("\t",$DimFila[$f]);
echo '<TR>';
if( count($tmp)<$TotalCol ) for( $i=count($tmp); $i<$TotalCol; $i++ ) $tmp[$i] = '0';
for( $c=0; $c<count($tmp); $c++ ){
if( $ColEdit[$c] ){
if( $c==2 ){
if( strlen(trim($tmp[$c]))==32 ){
echo '<TD _pw="Si">Si';
}else{
echo '<TD _pw="No">No';
}
}else if( $c==3 ){
if( $tmp[$c] == 1 ){
echo '<TD>Si';
}else{
echo '<TD>No';
}
}else{
if( $c==0 ){
echo '<TD>'.$DimTipo[$tmp[$c]];
}else{
echo '<TD>'.$tmp[$c];
}
}
}
}
}
echo '</TABLE><BR>';
?>
<input type=button value='Insertar usuario' onclick=Alta()>
<input type=button value='Borrar usuario' onclick=Baja()>
&nbsp;&nbsp;&nbsp;<input type=button value='Grabar' onclick=Grabar()>
<?PHP
echo '</CENTER>';
echo "<IFRAME name='TLF' src='' width='0px' height='0px' FRAMEBORDER='1' SCROLLING='auto'></IFRAME>";
echo '</BODY></HTML>';
exit;
}
function UsuariosSave( $NewUSU ){
global $_Web_;
chdir("../../{$_Web_}/http/");
if( !file_exists('../_d_/cfg/e'.'d.l'.'p') ){
$txt = LeerEDesLP();
$txt = trim(substr( $txt, 0, strpos($txt,"\n", strpos($txt,'TIPO	LOGIN')) ));
$pnt = @fopen('../_d_/cfg/e'.'d.l'.'p','w');
if( !$pnt ) die('--');
fputs($pnt,'');fclose($pnt);
clearstatcache();
}else{
$txt = trim(Leer_LP());
}
$DimFila = explode("\n",$txt);
$DimTH = explode("\t",$DimFila[3]);
$TotalCol = count($DimTH);
$txt = '';
for( $f=0; $f<4; $f++ ) $txt .= trim($DimFila[$f]).chr(10);
$txt = chop($txt);
$DimPassword = array();
for( $f=4; $f<count($DimFila); $f++ ){
$tmp = explode("\t",$DimFila[$f]);
$DimPassword[ $tmp[0].$tmp[1] ] = $tmp[2];
}
$DimTipo = array( 'e-Des'=>'~', 'Analista'=>'A', 'Master'=>'M', 'Programador'=>'P', 'Help'=>'H', 'Demo'=>'D' );
$NivelUsu = array(			'~'=>1,			  'A'=>2,		  'M'=>3,				 'P'=>4,		  'H'=>5,		'D'=>6 );
$DimFila = explode("\n",trim($NewUSU));
$TH = explode("\t",$DimFila[0]);
$nTotalCol = count($TH);
for( $f=1; $f<count($DimFila); $f++ ){
$txt .= "\n";
$tmp = explode("\t",$DimFila[$f]);
$NewDato = array();
for( $c=0; $c<$nTotalCol; $c++ ) $NewDato[$TH[$c]] = $tmp[$c];
for( $c=0; $c<$TotalCol; $c++ ){
$Dato = trim($NewDato[$DimTH[$c]]);
switch( $DimTH[$c] ){
case 'TIPO':
$Dato = $DimTipo[$Dato];
break;
case 'LOGIN':
$Dato = strtoupper($Dato);
break;
case 'EMAIL':
$Dato = str_replace(' ','',strtolower($Dato));
break;
case 'CLAVE':
if( strtoupper($Dato)=='NO' ){
$Dato = '';
}else{
$Dato = trim( $DimPassword[ $DimTipo[$tmp[0]].$tmp[1] ] );
}
break;
case 'ACCESO':
if( strtoupper($Dato)=='SI' ){
$Dato = '1';
}else{
$Dato = '0';
}
break;
case 'DesEDes':
break;
default:
if( $Dato == '' ) $Dato = 0;
}
$txt .= $Dato."\t";
}
$txt = chop($txt);
}
GrabarLP($txt);
eHTML('','','gsCreate');
?>
</HEAD><BODY onhelp='top.HelpIFRAME();return false;' oncontextmenu='return false;'><SCRIPT type="text/javascript">
alert('Grabado');
</SCRIPT></BODY></HTML>
<?PHP
exit;
}
function StoreCheck( $File ){
$NErrores = 0;
$fd = fopen( $File, 'r' );
while( !feof($fd) ){
if( $sBuffer == '' ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
while( substr_count( $buffer, '  ' ) > 0 ) $buffer = str_replace( '  ',' ',$buffer);
}
$sBuffer = '';
if( $buffer[0] == '{' ){
$Rem = true;
continue;
}else if( $Rem ){
if( substr_count( $buffer, '}' ) != 0 ) $Rem = false;
continue;
}
if( preg_match("/^#STORE:/i", strtoupper($buffer))){
$buffer = str_replace(' ','',trim($buffer));
$File = explode(',',substr($buffer,7));
for( $n=0; $n<count($File); $n++ ){
if( !file_exists( "edesweb/t/store/{$File[$n]}.ent" ) ){
$NErrores++;
txtError('ERROR El recurso "'.$File[$n].'.ent" no existe.' );
}else if( is_readable( "edesweb/t/store/{$File[$n]}.ent" ) != 1 ){
$NErrores++;
txtError('ERROR El recurso "'.$File[$n].'.ent" no es de lectura.' );
}
}
}
if( strtoupper(substr($buffer,0,13)) == 'CREATE TABLE ' ){
$tmp = explode(' ',$buffer);
if( substr_count($tmp[2],'(') > 0 ){
$sTmp = str_replace( '(', ' (', $tmp[2] );
$buffer = str_replace( $tmp[2], $sTmp, $buffer );
$tmp = explode(' ',$buffer);
}
if( substr_count( $buffer, '(' ) == 0 ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
}
while( $buffer!=');' && $buffer!=')' && !feof($fd) ){
$buffer = trim( fgets($fd,1024) );
$buffer = str_replace("\t"," ",$buffer);
if( preg_match("/^#STORE:/i", strtoupper($buffer))){
$buffer = str_replace(' ','',trim($buffer));
$File = explode(',',substr($buffer,7));
for( $n=0; $n<count($File); $n++ ){
if( !file_exists( "edesweb/t/store/{$File[$n]}.fld" ) ){
$NErrores++;
txtError('ERROR El recurso "'.$File[$n].'.fld" no existe.' );
}else if( is_readable( "edesweb/t/store/{$File[$n]}.fld" ) != 1 ){
$NErrores++;
txtError('ERROR El recurso "'.$File[$n].'.fld" no es de lectura.' );
}
}
}
}
}
}
fclose($fd);
return $NErrores;
}
function StoreEstructura( &$_DimESTRUCTURA, $File, $Tipo, $oNomTabla ){
global $__DirDestino__, $_Importar;
$Enter = chr(13).chr(10);
$File = str_replace(' ','',trim($File));
$File = explode(',',substr($File,7));
for( $n=0; $n<count($File); $n++ ){
if( $Tipo=='ent' ){
$FileTmp = fopen( $__DirDestino__.'/_doc_/tbl/_tmp.sql', 'a' );
$FileMenu = fopen( $__DirDestino__."/_doc_/tbl/_{$File[$n]}.mnu", 'w' );
}
$fd = fopen( "edesweb/t/store/{$File[$n]}.{$Tipo}", 'r' );
list(,$Nombre)		= explode(']',fgets( $fd, 1024 )); $Nombre = trim($Nombre);
list(,$Lenguaje)	= explode(']',fgets( $fd, 1024 )); $Lenguaje = trim($Lenguaje);
list(,$DB)			= explode(']',fgets( $fd, 1024 )); $DB = trim($DB);
$Tablas = fgets( $fd, 1024 );
$tmp = explode(',',$Tablas);
$tmp[0] = substr($tmp[0],9);
$DimTabla = array();
for( $i=0; $i<count($tmp); $i++ ){
list( $NomTabla ,$nCampos, $Reg ) = explode('/',$tmp[$i]);
$NomTabla = trim($NomTabla);
$DimTabla[] = array( $NomTabla ,$nCampos, $Reg );
if( $Reg*1 > 0 ) $_Importar[] = array( $File[$n], $NomTabla ,$nCampos, $Reg );
}
fgets( $fd, 1024 );
$Nota = '';
while( !feof($fd) ){
$x = trim(fgets( $fd, 1024 ));
if( strtoupper(substr($x,0,2)) == '~[' ){
break;
}else{
$Nota .= $x.'\n';
}
}
$Tabla = trim(substr($x,12));
if( $Tabla == '' ) $Tabla = $oNomTabla;
$x = trim(fgets( $fd, 1024 ));
if( $Tipo=='ent' ) fputs( $FileTmp, $x.$Enter );
while( !feof($fd) ){
$x = trim(fgets( $fd, 1024 ));
if( strtoupper(substr($x,0,12))=='~[STRUCTURE]' ){
$Tabla = trim(substr($x,12));
if( $Tabla == '' ) $Tabla = $oNomTabla;
continue;
}
if( strtoupper(substr($x,0,10))=='~[OPTIONS]' || strtoupper(substr($x,0,9))=='~[FIELDS]' ) break;
if( $x==')' ){
if( $Tipo=='ent' ) fputs( $FileTmp, ');'.$Enter );
continue;
}
if( $x!='' ){
list($Campo,) = explode(' ',$x);
$_DimESTRUCTURA[$Tabla.'.'.trim($Campo)] = true;
}
if( $Tipo=='ent' ) fputs( $FileTmp, $x.$Enter );
}
if( $x==')' ) $x = chop(fgets( $fd, 1024 ));
if( strtoupper($x)=='~[OPTIONS]' ){
while( !feof($fd) ){
$x = chop(fgets( $fd, 1024 ));
if( $x=='' ) continue;
if( strtoupper(substr($x,0,9)) == '~[SCRIPT]' ) break;
if( $Tipo=='ent' ) fputs( $FileMenu, $x.$Enter );
}
}
if( strtoupper(substr($x,0,9)) == '~[SCRIPT]' ){
$NomScript = trim(substr($x,9));
$txt = '';
while( !feof($fd) ){
$x = chop(fgets( $fd, 1024 ));
if( strtoupper(substr(trim($x),0,7)) == '~[DATA]' ) break;
if( strtoupper(substr(trim($x),0,9)) == '~[SCRIPT]' ){
$NomFile = $__DirDestino__.str_replace('..','',$NomScript);
CrearDirectorios( $NomFile );
$FileSC = fopen( $NomFile, 'w' );
fwrite( $FileSC, $txt );
fclose( $FileSC );
$NomScript = trim(substr(trim($x),9));
$txt = '';
}else{
$txt .= $x.$Enter;
}
}
if( $txt!='' ){
$NomFile = $__DirDestino__.str_replace('..','',$NomScript);
CrearDirectorios( $NomFile );
$FileSC = fopen( $NomFile, 'w' );
fwrite( $FileSC, $txt );
fclose( $FileSC );
}
}
fclose( $fd );
if( $Tipo=='ent' ){
fclose( $FileTmp );
fclose( $FileMenu );
if( filesize( $__DirDestino__."/_doc_/tbl/_{$File[$n]}.mnu" ) == 0 ) unlink( $__DirDestino__."/_doc_/tbl/_{$File[$n]}.mnu" );
}
}
}
function CrearDirectorios( $BakFile ){
$tmp = explode( '/', $BakFile );
$sDir = '';
for( $n=0; $n<count($tmp)-1; $n++ ){
$sDir .= $tmp[$n].'/';
if( !is_dir( $sDir ) ) mkdir( $sDir, 0777 );
if( !is_writeable( $sDir ) ){
if( !chmod( $sDir, 0777 ) ){
global $_T;
die( "<br>{$_T[84]}: {$sDir}" );
}
}
}
}
function VerTabla( $Tabla ){
global $_Result;
$Tabla = strtoupper($Tabla);
$sql = "select * from all_tab_cols where table_name='{$Tabla}' order by COLUMN_ID";
qQuery($sql);
while( OCIFetch($_Result) ){
echo OCIResult($_Result,'COLUMN_NAME').'-';
echo OCIResult($_Result,'DATA_TYPE').' (';
if( OCIResult($_Result,'DATA_PRECISION')== 0 ){
echo OCIResult($_Result,'DATA_LENGTH');
}else{
echo OCIResult($_Result,'DATA_PRECISION');
if( OCIResult($_Result,'DATA_SCALE')!=0 ) echo ','.OCIResult($_Result,'DATA_SCALE');
}
echo ') ';
if( OCIResult($_Result,'NULLABLE')=='N' ) echo ' not null';
echo '<br>';
}
}
function ImportarDiccionario(){
global $_Web_;
if( $_Web_ == '' ) exit;
$File = "../../{$_Web_}/_doc_/tbl/_install_es.sql";
if( file_exists( $File ) && filesize($File)>0 ){
eHTML('','','gsCreate');
?>
</HEAD><BODY style="background: #f2f2f2;" oncontextmenu="return false;">
<SCRIPT type="text/javascript">
alert('Solo se puede importar el diccionario de datos cuando\nla opción "Definir Base de datos" está vacía.');
</SCRIPT></BODY></HTML>
<?PHP
exit;
}else{
$txt = ListaTablas();
die( str_replace("\n",'<br>',$txt) );
EditaSQL();
}
exit;
}
function ListaTablas(){
global $_Web_;
include('../../'.$_Web_.'/_doc_/install.ini');
$_NErrores = 0;
if( $DataBase		=='' ) txtError('Falta introducir "Base de datos"');
if( $HostName		=='' ) txtError('Falta introducir "Host"');
if( $Diccionario	=='' ) txtError('Falta introducir "Diccionario de datos"');
if( $Usuario		=='' ) txtError('Falta introducir "Usuario"');
if( $Password		=='' ) txtError('Falta introducir "Password"');
global $_Sql,$_SqlHostName,$_SqlUsuario,$_SqlPassword,$_SqlDiccionario;
$_Sql = $DataBase;
$_SqlHostName = $HostName;
$_SqlUsuario = $Usuario;
$_SqlPassword = $Password;
$_SqlDiccionario = $Diccionario;
if( eSqlType('oracle') ) $_SqlUsuario = strtoupper($_SqlUsuario);
if( $_NErrores > 0 ) die('</body></html>');
include( '../'.$_Sql.'.inc' );
if( eSqlType('informix') ){
qSelect( 'systables', 'tabname,tabtype', 'tabid>100' );
}else if( eSqlType('oracle') ){
global $_SqlUsuario; $SqlUsuario = strtoupper($_SqlUsuario);
$sql = "SELECT TABLE_NAME FROM all_tables where OWNER='{$SqlUsuario}'";
qQuery( $sql );
}else if( eSqlType('mysql,mysqli') ){
qQuery( 'show tables' );
}
$Dim = array();
while( $row = qRow() ){
if( eSqlType('informix') ){
if( $row[1]=='S' ){
$Dim[] = trim($row[0]).'*';
}else{
$Dim[] = trim($row[0]);
}
}else if( eSqlType('oracle') ){
$Dim[] = strtolower(trim($row[0]));
}else if( eSqlType('mysql,mysqli') ){
$Dim[] = trim($row[0]);
}
}
$txt = '';
sort($Dim);
global $_DimTablaUnique;
MemTABLAS( '../../'.$_Web_."/_doc_/tbl/_edes_{$_Sql}.sql" );
for( $i=0; $i<count($Dim); $i++ ){
if( substr($Dim[$i],-1)=='*' ){
$Dim[$i] = substr($Dim[$i],0,-1);
}else{
}
if( $_DimTablaUnique[$Dim[$i]] ) continue;
if( eSqlType('informix') ) $txt .= GetTablaInformix( $Dim[$i] )."\n";
if( eSqlType('oracle') ) $txt .= GetTablaOracle( $Dim[$i] )."\n";
if( eSqlType('mysql,mysqli') ) $txt .= GetTablaMySql( $Dim[$i] )."\n";
}
return $txt;
}
function GetTablaMySql( $table ){
$txt = "CREATE TABLE {$table} (\n";
qQuery("SHOW FIELDS FROM {$table}");
while( $row=qArray() ){
$txt .= "\t{$row[Field]} {$row[Type]}";
if(isset($row["Default"]) && (!empty($row["Default"]) || $row["Default"]=="0"))
$txt .= " DEFAULT '$row[Default]'";
if($row["Null"]!="YES")
$txt .= " NOT NULL";
if($row["Extra"]!="")
$txt .= " {$row[Extra]}";
$txt .= ",\n";
}
$txt = preg_replace('/,$/', "", $txt);
qQuery("SHOW KEYS FROM {$table}");
while( $row=qArray() ){
$kname = $row['Key_name'];
if(($kname!="PRIMARY") && ($row['Non_unique']==0))
$kname="UNIQUE|{$kname}";
if(!isset($index[$kname]))
$index[$kname] = array();
$index[$kname][] = $row['Column_name'];
}
while( list($x, $columns)=@each($index) ){
if($x == "PRIMARY")
$txt .= "\tPRIMARY KEY (".implode($columns, ", ").")";
elseif (substr($x,0,6)=="UNIQUE")
$txt .= "\tUNIQUE ".substr($x,7)." (".implode($columns, ", ").")";
else
$txt .= "\tKEY $x (".implode($columns, ", ") .")";
$txt .= ",\n";
}
$txt = preg_replace("/,\n$/", "\n", $txt);
$txt .= ");\n";
return $txt;
}
function GetTablaOracle( $table ){
$txt = "CREATE TABLE {$table} (\n";
global $_T, $_SqlUsuario;
$SqlUsuario = strtoupper($_SqlUsuario);
global $_Result;
$Tabla = strtoupper($table);
$sql = "select * from all_tab_cols where table_name='{$Tabla}' order by COLUMN_ID";
qQuery($sql);
while( OCIFetch($_Result) ){
$txt .= "\t".strtolower(OCIResult($_Result,'COLUMN_NAME')).' '.strtolower(OCIResult($_Result,'DATA_TYPE'));
if( OCIResult($_Result,'DATA_TYPE')!='DATE' && substr(OCIResult($_Result,'DATA_TYPE'),0,9)!='TIMESTAMP' ){
$txt .= '(';
if( OCIResult($_Result,'DATA_PRECISION')== 0 ){
$txt .=  OCIResult($_Result,'DATA_LENGTH');
}else{
$txt .=  OCIResult($_Result,'DATA_PRECISION');
if( OCIResult($_Result,'DATA_SCALE')!=0 ) $txt .= ','.OCIResult($_Result,'DATA_SCALE');
}
$txt .= ') ';
}
if( OCIResult($_Result,'NULLABLE')=='N' ) $txt .= ' not null';
$txt .= ",\n";
}
$txt = preg_replace("/,\n$/", "\n", $txt);
$txt .= ");\n";
$sql = "SELECT INDEX_NAME,UNIQUENESS FROM all_indexes where TABLE_OWNER='{$SqlUsuario}' and TABLE_NAME='{$Tabla}'";
qQuery($sql);
while( OCIFetch($_Result) ){
$n = 0;
$sql = "SELECT COLUMN_NAME,DESCEND FROM all_ind_columns where INDEX_OWNER='{$SqlUsuario}' and TABLE_NAME='{$Tabla}' and INDEX_NAME='".OCIResult($_Result,'INDEX_NAME')."' order by COLUMN_POSITION";
$txt .= "\t create index ";
if( OCIResult($_Result,'UNIQUENESS')=='UNIQUE' ) $txt .= 'unique ';
qQuery($sql, $pt);
while( OCIFetch($pt) ){
if( $n>0 ) $txt .= ',';
$txt .= strtolower(OCIResult($pt,'COLUMN_NAME'));
if( OCIResult($pt,'DESCEND') == 'DESC' ) $txt .= ' DESC';
$n++;
}
$txt .= ";\n";
}
return $txt;
}
function GetTablaInformix( $table, $Multi ){
$txt = "CREATE TABLE {$table} (\n";
$OriTabla = $NomTabla = $table;
$NomAlias = '';
if( qCount('systables',"tabname='{$NomTabla}'" ) == 0 ){
die( 'ERROR: Tabla no encontrada');
}
qSelect('systables','*',"tabname='{$NomTabla}'" );
$row = qArray();
$TablaSinonimo = $row['tabtype'];
if( $row['tabtype']=='S' ){
qSelect('syssyntable','*',"tabid='".$row['tabid']."'" );
$row = qArray();
qSelect('systables','*',"tabid='".$row['btabid']."'" );
$row = qArray();
}else if( $row['tabtype']=='T' ){
qSelect('syssyntable','*',"btabid='".$row['tabid']."'",'',$p );
$row2 = qArray($p);
qSelect('systables','*',"tabid='".$row2['tabid']."'",'',$p );
$row2 = qArray($p);
$NomAlias = trim($row2['tabname']);
}
$bd_tabid = $row['tabid'];
$DimTipos = array('CHAR','SMALLINT','INTEGER','FLOAT','SMALLFLOAT','DECIMAL','SERIAL','DATE','MONEY','',
'DATETIME','BYTE','TEXT','VARCHAR','INTERVAL','NCHAR','NVARCHAR','INT8','SERIAL8','SET','MULTISET','LIST','');
$DimTipos[40] = '';
$DimPrecision = array(
'0000'=>'year',
'0010'=>'month',
'0100'=>'day',
'0110'=>'hour',
'1000'=>'minute',
'1010'=>'second' );
$cad_sql = 'select A.tabname,A.ncols,A.nindexes,B.colname,B.colno,B.coltype,B.collength from systables as A, outer syscolumns as B where A.tabtype = "T" and A.tabid = B.tabid and A.tabid = '.$bd_tabid;
qQuery( $cad_sql, $pTabla );
$DimCampo = array();
while( ($Dim = qArray($pTabla)) ){
$Nulos = '';
if( $Dim['coltype'] > 255 ){
$Nulos = ' not null ';
$Restar = 32768;
for( $n=0; $n<8; $n++ ){
if( $Dim['coltype'] >= $Restar ) $Dim['coltype'] -= $Restar;
$Restar = $Restar/2;
}
}
$txt .= "\t".$Dim['colname'];
$txt .= ' '.strtolower($DimTipos[$Dim['coltype']]);
switch( $DimTipos[$Dim['coltype']] ){
case 'DATETIME':
case 'INTERVAL':
for( $n=11; $n<16; $n++ ){
if( $Dim['collength'] >= (256*$n) ) $Dim['collength'] -= (256*$n);
}
$bin = decbin( $Dim['collength'] );
$bin = substr($bin,-8);
$desde = substr($bin,0,4);
$hasta = substr($bin,-4);
$txt .= ' '.$DimPrecision[$desde].' to '.$DimPrecision[$hasta];
$Dim['collength'] = '';
break;
case 'DATE':
case 'TEXT':
case 'SMALLINT';
case 'INTEGER':
case 'FLOAT':
case 'SMALLFLOAT':
$Dim['collength'] = '';
break;
case 'DECIMAL':
$Dim['collength'] =  '('.floor($Dim['collength'] / 256).','.($Dim['collength'] % 256).')';
break;
case 'VARCHAR':
$Dim['collength'] =  '('.($Dim['collength'] % 256).','.floor($Dim['collength'] / 256).')';
break;
default:
$txt .= '(';
$Dim['collength'] .= ')';
}
$txt .= $Dim['collength'].' '.$Nulos;
$DimCampo[$Dim['colno']] = trim($Dim['colname']);
$txt .= ",\n";
}
$txt = preg_replace("/,\n$/", "\n", $txt );
$txt .= ");\n";
$npart = 17;
$cad_sql = 'select part1,part2,part3,part4,part5,part6,part7,part8,part9,part10,part11,part12,part13,part14,part15,part16,idxtype from sysindexes where tabid = '.$bd_tabid;
qQuery( $cad_sql );
$i = 0;
while( $Dim = qArray() ){
$txt .= 'create index ';
$num = 0;
for( $l=1;$l<$npart;$l++ ){
if( trim($Dim['part'.$l]) ){
$ind[$i][$num] = trim($Dim['part'.$l]);
if( $num > 0 && trim($DimCampo[$ind[$i][$num]])!='' ) $txt .= ', ';
$txt .= $DimCampo[$ind[$i][$num]];
$num++;
}
}
if( trim($Dim['idxtype']) == 'U' ){
$ind[$i][16] = 'S';
$txt .= ' unique';
}else{
$ind[$i][16] = 'N';
}
$i++;
$txt .= ";\n";
}
return $txt;
}
function MemDir( $NomFile, &$PathDir ){
$Dim = file( getCWD().'/'.$NomFile );
for( $n=0; $n<count($Dim); $n++ ){
$buffer = trim($Dim[$n]);
if( strtoupper(substr($buffer,0,5)) == '#DIR:' || strtoupper(substr($buffer,0,8)) == '#FOLDER:' ){
list(, $xDir ) = explode(':',$buffer);
$xDir = 'd/'.trim($xDir);
$Esta = false;
for( $i=0; $i<count($PathDir); $i++ ){
if( $PathDir[$i] == $xDir ){
$Esta = true;
break;
}
}
if( !$Esta ) $PathDir[] = $xDir;
}
}
sort($PathDir);
}
function LeerEDesLP(){
global $Dir_;
if( file_exists('../../edesweb/web/edesweb/_d_/cfg/e'.'d.l'.'p') ){
$fd = @fopen('../../edesweb/web/edesweb/_d_/cfg/e'.'d.l'.'p','r');
}else{
exit;
}
$cTxt = @fread($fd,(1900+59)*100);
@fclose($fd);
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+2,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+3+$n,1));
$Basura += $LongDeLong + 3;
$b = 0;
$txt = '';
for( $n=$Basura; $n<$Basura+($LenCadena*2); $n++ ){
if( $b==0 ) $txt .= substr($cTxt,$n,1);
$b++; if( $b>1 ) $b=0;
}
$tmp = explode(chr(10),gzuncompress($txt));
if( 212940319 != crc32(trim($tmp[0])) ) exit;
@_LoadSqlIni('_',trim($tmp[1]));
return gzuncompress($txt);
}
function UsuariosSave2222( $NewUSU ){
$DimFila = explode("\n",trim(Leer_LP()));
$DimTH = explode("\t",$DimFila[3]);
$TotalCol = count($DimTH);
$txt = '';
for( $f=0; $f<4; $f++ ){
$txt .= trim($DimFila[$f]).chr(10);
}
$txt = chop($txt);
$DimPassword = array();
for( $f=4; $f<count($DimFila); $f++ ){
$tmp = explode("\t",$DimFila[$f]);
$DimPassword[ $tmp[0].$tmp[1] ] = $tmp[2];
}
$DimTipo = array( 'e-Des'=>'~', 'Analista'=>'A', 'Master'=>'M', 'Programador'=>'P', 'Help'=>'H', 'Demo'=>'D' );
$NivelUsu = array(	  '~'=>1  ,		   'A'=>2  ,	  'M'=>3  ,			  'P'=>4  ,	   'H'=>5  ,	'D'=>6   );
$DimFila = explode("\n",trim($NewUSU));
$TH = explode("\t",$DimFila[0]);
$nTotalCol = count($TH);
$VerClave = file_exists( '../_tmp/'.md5(date('Y-m-d')) );
for( $f=1; $f<count($DimFila); $f++ ){
$txt .= "\n";
$tmp = explode("\t",$DimFila[$f]);
$NewDato = array();
for( $c=0; $c<$nTotalCol; $c++ ) $NewDato[$TH[$c]] = $tmp[$c];
for( $c=0; $c<$TotalCol; $c++ ){
$Dato = trim($NewDato[$DimTH[$c]]);
switch( $DimTH[$c] ){
case 'TIPO':
$Dato = $DimTipo[$Dato];
break;
case 'LOGIN':
$Dato = strtoupper($Dato);
break;
case 'EMAIL':
$Dato = str_replace(' ','',strtolower($Dato));
break;
case 'CLAVE':
if( strtoupper($Dato)=='NO' ){
$Dato = '';
}else{
$Dato = trim( $DimPassword[ $DimTipo[$tmp[0]].$tmp[1] ] );
if( $VerClave ) eTrace( trim($NewDato[$DimTH[1]]).' - '. $DimPassword[ $DimTipo[$tmp[0]].$tmp[1] ] );
}
break;
case 'LOGEAR':
case 'ACCESO':
case 'Tree':
if( strtoupper($Dato)=='SI' ){
$Dato = '1';
}else{
$Dato = '0';
}
break;
case 'DesEDes':
break;
default:
if( $Dato == '' ) $Dato = 0;
}
$txt .= $Dato."\t";
}
$txt = chop($txt);
}
GrabarLP( $txt );
eHTML('','','e-Des · Usuarios');
?>
</HEAD><BODY onhelp='return false;' oncontextmenu='return false;'>
<SCRIPT type="text/javascript">
top.eAlert( '', 'GRABADO&nbsp;&nbsp;', '-', 'I' );
setTimeout( "top.eAlertHide()", 2000 );
</SCRIPT></BODY></HTML>
<?PHP
eEnd();
}
?>
