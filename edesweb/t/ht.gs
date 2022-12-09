<?PHP //[_PROTECCION_]
session_start(); if( !isset($_SESSION['_User']) ) exit;
if( $_gsTron ) eTron('{12}'.$Dir_.'t/ht.gs');
$_VerTLF = false;
if( $_SERVER['QUERY_STRING'] == 'BROWSE' || $_SERVER['QUERY_STRING'] == 'BROWSE-NEW' || substr_count($_SERVER['QUERY_STRING'],'A:BROWSE') == 1 ){
$_DirG = 'g/i'; //include_once( $Dir_.'t/lp.gs' );
VerBrowse();
}
if( $_SERVER['QUERY_STRING'] == 'GENWORD' ){
$_DirG = 'g/i'; //include_once( $Dir_.'t/lp.gs' );
GenWord();
}
if( isset($ViewHelp) ){
$_DirG = 'g/i'; //include_once( $Dir_.'t/lp.gs' );
VerUnaAyuda($ViewHelp);
}
if( isset($DeleteHelp) ){
$_DirG = 'g/i'; //include_once( $Dir_.'t/lp.gs' );
unlink('../help/tip/'.$DeleteHelp);
exit;
}
if( isset($EditHelp) ){
$_Accion = 'AE:@c%3A'.$EditHelp;
$_SERVER['QUERY_STRING'] = 'AE:@c%3A'.$EditHelp.'&T=P&D=A&TRACE=Fichero: '.$EditHelp;
}
include_once( '../_datos/config/desktop.ini' );
$_Accion = str_replace('+','%2B', $_Accion);
$_Accion = urldecode($_Accion);
$_Rastro = false;
if( $_Rastro ) eTron($_SERVER['QUERY_STRING'],1);
$Dim = explode('&', $_SERVER['QUERY_STRING']);
for( $n=1; $n < count($Dim); $n++ ){
$Dim[$n] = urldecode( $Dim[$n] );
parse_str( $Dim[$n] );
if( $_Rastro ) eTron($Dim[$n],1);
}
$Valor = substr( $_Accion, 3 );
if( substr($_SERVER['QUERY_STRING'],0,3)=='AE:' && $Valor[0] == '$' ) $Valor = $Dir_.substr($Valor,1);
$Op = strtoupper( substr( $_Accion, 1, 1 ) );
$_Tipo = $T;
if( (($Valor*1).'')==$Valor ) $EditHelp = $Valor;
$_Desde = $D;
if( $_Rastro ) eTron( 'T: ' .$T,1);
if( $_Rastro ) eTron( 'Op: '.$Op,1);
if( $Op=='B' ){
}else if( $T=='P' && ( $Op == 'L' || $Op == 'E' ) ){
$_File = str_replace( '#','f_', $Valor );
$_File = str_replace( '@','g_', $_File );
$_File = str_replace( '=','l_', $_File );
$_File = str_replace( '/','_' , $_File );
$_File = str_replace( ':','_' , $_File );
$_File = str_replace( '&','_' , $_File );
$_File = str_replace( '$','_' , $_File );
$_File = '../help/tip/'.$_File;
if( $_SERVER['PHP_SELF'] == '/edesweb/http/edes.php' ){
if( $_Rastro ) eTron('0');
$_File = str_replace( '../help/tip/','../web/help/', $_File );
}else{
if( $_Rastro ) eTron( 'DESDE: '.$_Desde,1);
if( $_Rastro ) eTron( 'VALOR: '.$Valor, 1 );
if( isset($EditHelp) ){
if( $_Rastro ) eTron('1');
$NomHelp = $EditHelp;
}else if( $_Desde=='P' || $_Desde=='' ){
if( $_Rastro ) eTron('2');
if( $_Rastro ) eTron('A: '.$Valor);
if( substr($Valor,0,strlen($Dir_)) == $Dir_ ) $Valor = '$'.substr($Valor,strlen($Dir_));
if( $_Rastro ) eTron('B: '.$Valor);
$Valor = strtr( $Valor, array('/'=>'_', '\\'=>'_', ' '=>'_') );
if( $_Rastro ) eTron('C: '.$Valor);
$NomHelp = $Valor;
}else if( $_Desde=='I' ){
if( $_Rastro ) eTron('3');
$NomHelp = $Valor;
}else if( $_Desde=='A' ){
if( $_Rastro ) eTron('4');
$quitar = '.?23?mMF>';
for( $n=0; $n<strlen($quitar); $n++ ) if( substr($Valor,0,1) == substr($quitar,$n,1) ) $Valor = substr($Valor,1);
$divide = '?&';
for( $n=0; $n<strlen($divide); $n++ ){
list($Valor) = explode(substr($divide,$n,1),$Valor);
}
$TObjeto = '';
if( substr_count($Valor,':')==1 ){
list($TObjeto,$NomFile) = explode(':',$Valor);
$Modo = substr($TObjeto,1);
}else{
$NomFile = $Valor;
$Modo = '';
}
if( $_Rastro ) eTron( 'TObjeto: '.$TObjeto, 1 );
if( $_Rastro ) eTron( 'VALOR: '.$NomFile, 1 );
if( substr_count($NomFile,'.')==0 && $NomFile!='' ){
switch( $TObjeto[0] ){
case '=':
case '#':
$NomFile .= '.edf';
break;
case '@':
$NomFile .= '.gdf';
break;
case '>':
case '^':
break;
case '[':
break;
default:
if(		 file_exists('../d/'.$NomFile.'.edf' ) ){
$NomFile .= '.edf';
}else if( file_exists('../d/'.$NomFile.'.gdf' ) ){
$NomFile .= '.gdf';
}else if( file_exists('../d/'.$NomFile.'.fdf' ) ){
$NomFile .= '.fdf';
}else if( file_exists('../d/'.$NomFile.'.ldf' ) ){
$NomFile .= '.ldf';
}
break;
}
}
if( $_Rastro ) eTron( 'VALOR: '.$NomFile, 1 );
$_File = '../d/'.$NomFile;
$NomHelp = '';
$Dim = file($_File);
for( $n=0; $n<count($Dim); $n++ ){
if( strtoupper(substr( $Dim[$n],0,6))=='[HELP]' ){
list($sModo,$xNomHelp) = explode('|',substr( $Dim[$n],6));
$sModo = trim($sModo);
if( $sModo == '*' || substr_count( ",{$sModo},", ",{$Modo}," )==1 ){
$NomHelp = trim($xNomHelp);
if( $NomHelp == '=' ){
$NomHelp = strtr( $NomFile, array('/'=>'_', '\\'=>'_', ' '=>'_') );
}
if( $_Rastro ) eTron($n.': '.$NomHelp);
break;
}
}
}
}else{
if( $_Rastro ) eTron('5');
}
if( $NomHelp=='' ){
if( substr($NomHelp,0,strlen($Dir_)) == $Dir_ ) $NomHelp = '$'.substr($NomHelp,strlen($Dir_));
$NomHelp = str_replace('/','_',$NomFile);
switch( $_HelpType ){
case 1:
break;
case 2:
$NomHelp .= '_'.$Modo[0];
break;
case 3:
$NomHelp .= '_'.$Modo;
break;
default:
}
}
}
if( $_Rastro ) eTron('6');
if( $_Rastro ) eTron( 'NOMHELP: '.$NomHelp, 1 );
if( $NomHelp=='0' ) $NomHelp = '00';
if( $NomHelp[0]=='$' ){
$_File = '../../edesweb/lng/help/'.substr($NomHelp,1);
}else{
$_File = '../help/tip/'.$NomHelp;
}
$_File = strtolower($_File);
if( $Op == 'L' ){
if( $_Rastro ) eTron("File a leer: ".$_File);
$fd = fopen( $_File, 'r' );
$txt = fread( $fd, filesize($_File) );
fclose($fd);
if( $_Rastro ) eTron("CONTENIDO 1: ".$txt);
if( strlen($txt) < 200 ){
$sTxt = trim(strip_tags($txt));
$sLeng = strlen($sTxt);
$sTxt = str_replace('&nbsp;','',$sTxt);
$sTxt = str_replace(' ','',$sTxt);
if( substr($sTxt,0,4)=='&gt;' && $sLeng==strlen($sTxt) ){
$_File = '../help/tip/'.substr($sTxt,4);
$fd = fopen( $_File, 'r' );
$txt = fread( $fd, filesize($_File) );
fclose($fd);
}
if( $_Rastro ) eTron("CONTENIDO 2: ".$txt);
}
if( substr($_File,-5)==".mark" ){
include_once("../../edesweb/markdown.inc");
$txt = eMarkdown($txt);
}
echo $txt;
eEnd();
}
}else if( $T=='H' ){
}else if( $T=='N' ){
}
$_DirG = 'g/i'; //include_once( $Dir_.'t/lp.gs' );
include( $Dir_.'t/store.inc' );
if( $TRACE[0]=='|' ) $TRACE = '<i>ESC</i>'.$TRACE;
if( $Op == 'G' ){
$_File = $FICHERO;
$_Tipo = $TIPO;
}else{
if( $_Tipo == 'P' || $Op=='B' ){
$_Limpio = '<SPAN id=CONTENIDO CONTENTEDITABLE class="AYUDA" style="WIDTH:200; HEIGHT:100"></SPAN>';
}else if( $_Tipo == 'H' ){
$_Limpio = '<DIV id=CONTENIDO CONTENTEDITABLE class="HTM" style="background-color:transparent;padding:0"></DIV>';
$_File = $Valor;
}else{
$_Limpio = '<SPAN id=CONTENIDO CONTENTEDITABLE class="AYUDA" style="BACKGROUND:#ffffcc; COLOR:#000099; BORDER:#000099 1px solid; CURSOR:default; FONT-FAMILY:ARIAL; FONT-SIZE:12px; MARGIN:0;"></SPAN>';
$_File = $Valor;
}
}
if( $_SERVER['PHP_SELF'] == '/edesweb/http/edes.php' ){
$_File = str_replace( '../help/tip/','../web/help/', $_File );
}
$_File = strtolower($_File);
$Base = substr($_File,0,strrpos($_File,'/')+1).'i/'.$PLANTILLA;
$EsAyuda = ($_Tipo=='A');
if( $Op == 'L' || $Op == 'E' ){
$_NomFile = explode('/',$_File);
$_NomFile = $_NomFile[count($_NomFile)-1];
$fd = fopen( $_File, 'r' );
$txt = fread( $fd, filesize($_File) );
fclose($fd);
if( $Op == 'L' ){
echo $txt;
exit;
}
if( trim($txt)=='' ){
if( file_exists( $Base.'.body' ) ){
$fd = fopen( $Base.'.body', 'r' );
$_Limpio = fread( $fd, filesize($Base.'.body') );
$_Limpio = str_replace( chr(13),'', $_Limpio );
$_Limpio = str_replace( chr(10),'', $_Limpio );
fclose($fd);
}
$txt = $_Limpio;
}else{
if( $EsAyuda ){
$fd = fopen( $Base.'.body', 'r' );
$_Limpio = fread( $fd, filesize($Base.'.body') );
$_Limpio = str_replace( chr(13),'', $_Limpio );
$_Limpio = str_replace( chr(10),'', $_Limpio );
fclose($fd);
$i = strpos($txt,'<'.'!-- [HelpIni] --'.'>');
$f = strpos($txt,'<'.'!-- [HelpEnd] --'.'>');
$txt = substr( $txt, $i+18, $f-$i-18 );
}
}
}else if( $Op == 'G' ){
if( $EsAyuda ){
$fd = fopen( $Base.'.body', 'r' );
$_Limpio = fread( $fd, filesize($Base.'.body') );
fclose($fd);
$fd = fopen( $Base.'.htm', 'r' );
$txt = fread( $fd, filesize($Base.'.htm') );
fclose($fd);
$i = strpos($txt,'<'.'!-- [HelpIni] --'.'>');
$f = strpos($txt,'<'.'!-- [HelpEnd] --'.'>');
$FUENTE = substr( $txt, 0,$i+18 ) .$FUENTE. substr( $txt, $i+18 );
}else{
$fd = fopen( $Base.'.body', 'r' );
$_Limpio = fread( $fd, filesize($Base.'.body') );
fclose($fd);
$fd = fopen( $Base.'.htm', 'r' );
$txt = fread( $fd, filesize($Base.'.htm') );
fclose($fd);
$i = strpos($txt,'<'.'!-- [HelpIni] --'.'>');
$f = strpos($txt,'<'.'!-- [HelpEnd] --'.'>');
if( substr_count( $FUENTE, '<'.'!-- [HelpIni] --'.'>' ) > 0 && substr_count( $FUENTE, '<'.'!-- [HelpEnd] --'.'>' ) > 0 ){
$i2 = strpos($FUENTE,'<'.'!-- [HelpIni] --'.'>');
$f2 = strpos($FUENTE,'<'.'!-- [HelpEnd] --'.'>');
$FUENTE = substr( $FUENTE, $i2+18, $f2-$i2-18 );
}
$FUENTE = substr( $txt, 0,$i+18 ) .$FUENTE. substr( $txt, $i+18 );
}
include_once( "../../edesweb/{$_Sql}.inc" );
$Cdi = date('Y-m-d H:i:s');
list( ,$HFile ) = explode( '/edesweb/', str_replace(chr(92).chr(92),'/',$_File) );
$HFile = '$'.$HFile;
qQuery( "insert into {$_SESSION['ShareDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '{$Cdi}', '{$HFile}', 'S', '{$_SESSION['_UserEMail']}')");
if( strlen(trim($FUENTE))==72 ){
unlink( $_File );
ShowMensaje( 'Borrado', 'window.parent.Grabado();' );
}else{
$sDir = '../_bak_'			; if( !is_dir($sDir) ){ mkdir( $sDir, 0777 ); if( !is_writeable($sDir) ) chmod( $sDir, 0777 ); }
$sDir = '../_bak_/help'		; if( !is_dir($sDir) ){ mkdir( $sDir, 0777 ); if( !is_writeable($sDir) ) chmod( $sDir, 0777 ); }
$sDir = '../_bak_/help/tip' ; if( !is_dir($sDir) ){ mkdir( $sDir, 0777 ); if( !is_writeable($sDir) ) chmod( $sDir, 0777 ); }
copy( $_File, $sDir.str_replace('../help/tip','',$_File) );
$fd = fopen( $_File, 'w' );
if( $fd===false ){
die( '<HTML><HEAD></HEAD><BODY><script type="text/javascript">alert("Error de escritura ('.$_File.'->)");</SCRIPT></BODY></HTML>' );
}
fputs( $fd, utf8_decode($FUENTE) );
fclose( $fd );
ShowMensaje( 'Grabado', 'window.parent.Grabado();' );
}
?>
<!DOCTYPE HTML>
<HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"><TITLE></TITLE></HEAD><BODY>
<SCRIPT type="text/javascript">
window.parent.Grabado();
top.eInfo(top,S.lng(223));
</SCRIPT>
</BODY></HTML>
<?PHP
eEnd();
}
$_AlmacenIMG = 'M';
?>
<!DOCTYPE HTML>
<HTML XMLNS:IE>
<HEAD><META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"><TITLE>gsHTML</TITLE>
<?PHP
if( $_Tipo=='P' ){
include_once( '../_datos/config/desktop.ini' );
$NumCSS = ($_DesktopType==2)?'2':'';
if( file_exists("{$_SESSION['_PathCSS']}/principal{$NumCSS}.css") ){
eLink("principal{$NumCSS}");
}else{
?>
<style>
.AYUDA {
BORDER-RIGHT: #cfeffc 5px ridge;
BORDER-TOP: #cfeffc 5px ridge;
FONT-SIZE: 12px;
BACKGROUND: #ffffcc;
PADDING:10 20 10 20;
BORDER-LEFT: #cfeffc 5px ridge;
COLOR: #000099;
BORDER-BOTTOM: #cfeffc 5px ridge;
FONT-FAMILY: ARIAL;
}
.AYUDA TABLE {
BACKGROUND: #7b8083;
FONT-FAMILY: ARIAL;
}
.AYUDA TH {
FONT-SIZE: 12px;
BACKGROUND: #d5dce0;
}.AYUDA TD {
FONT-SIZE: 12px;
BACKGROUND: #fffff3;
}
</style>
<?PHP
}
}else if( $_Tipo == 'H' ){
if( file_exists( "{$_SESSION['_PathCSS']}/htm.css" ) ){
echo '<LINK REL="stylesheet" HREF="htm.css" TYPE="text/css">';
}
}else{
if( file_exists( $Base.'.css' ) ){
list( ,$Base ) = explode('/edesweb/',$Base);
$Base = '$'.$Base;
echo '<LINK REL="stylesheet" HREF="edes.php?R:'.$Base.'.css" TYPE="text/css">';
}
}
?>
<style>
.tdClass {
font-size: 12;
color: #001296;
}
INPUT, .COMANDOS, select {
FONT-FAMILY: ARIAL;
font-size: 12;
color: #001296;
}
</style>
<SCRIPT type="text/javascript">
function gColor( LP ){
var sColor = window.external.eColorDialog();
if( sColor!="" && CONTENIDO.isContentEditable ) document.execCommand( ((LP =='L') ? "ForeColor":"BackColor"), true, sColor);
}
function icoOn(){
var e = event.target || event.srcElement;
if( e.tagName != 'IMG' ) return;
if( e.id=='TRACE' ) return;
e.style.borderColor = '#000000';
e.style.backgroundColor = '#bbbbbb';
e.style.cursor = 'hand';
}
function icoOff(){
var e = event.target || event.srcElement;
if( e.tagName != 'IMG' ) return;
if( e.id=='TRACE' ) return;
e.style.borderColor = '#D6D3CE';
e.style.backgroundColor = '#D6D3CE';
}
function icoDown(){
var e = event.target || event.srcElement;
if( e.tagName != 'IMG' ) return;
if( e.id=='TRACE' ) return;
e.style.backgroundColor = '#8492B5';
}
function icoUp(){
var e = event.target || event.srcElement;
if( e.tagName != 'IMG' ) return;
if( e.id=='TRACE' ) return;
e.style.backgroundColor = '#B5BED6';
}
var _Paste = '';
function ed( opcion, orden ){
if( opcion=='' ) return;
if( opcion=='paste' && _Paste!='' ){
if(CONTENIDO.isContentEditable){
document.all.CONTENIDO.innerHTML = _Paste;
}else{
document.all.CONTENIDO.textContent = _Paste;
}
_Paste = '';
return;
}
if(CONTENIDO.isContentEditable){
CONTENIDO.focus();
if( ed.arguments.length == 1 ){
CONTENIDO.document.execCommand(opcion);
}else{
if( (event.target || event.srcElement).tagName == 'SELECT' ){
CONTENIDO.document.body.document.execCommand(orden,false,opcion);
(event.target || event.srcElement).selectedIndex = 0;
}else{
CONTENIDO.document.body.document.execCommand(opcion,false,orden);
}
}
}
CONTENIDO.contentEditable = true;
CONTENIDO.focus();
}
var _Modo = true;
function Modo(el){
if( _Modo ){
var iHTML = CONTENIDO.innerHTML;
CONTENIDO.textContent = iHTML;
el.src = el.src.replace('_0','_1');
document.all.ToolBar.style.display = 'none';
document.all.Limpiar.disabled = document.all.Recargar.disabled = true;
}else{
var iText = CONTENIDO.textContent;
CONTENIDO.innerHTML = iText;
for( var n=0; n < document.all.tags('A').length; n++ ){
if( document.all.tags('A')[n].href != '' ){
if( document.all.tags('A')[n].href.indexOf('#') > -1 ){
var tmp = document.all.tags('A')[n].href.split('#');
document.all.tags('A')[0].href = '#'+tmp[1];
}
}
}
el.src = el.src.replace('_1','_0');
document.all.ToolBar.style.display = 'block';
document.all.Limpiar.disabled = document.all.Recargar.disabled = false;
}
_Modo = !_Modo;
}
var _oPopup = window.createPopup();
var _HelpTABLE = _HelpTH = _HelpTD = '';
var Estilo = document.styleSheets;
for( var r=0; r<Estilo.length; r++ ){
if( Estilo[r].href.indexOf('desktop') > -1 ){
for( var i=0; i<Estilo[r].rules.length; i++ ){
if( Estilo[r].rules[i].selectorText == '.AYUDA TABLE' ) _HelpTABLE = Estilo[r].rules[i].style.cssText;
if( Estilo[r].rules[i].selectorText == '.AYUDA TH' ) _HelpTH = Estilo[r].rules[i].style.cssText;
if( Estilo[r].rules[i].selectorText == '.AYUDA TD' ) _HelpTD = Estilo[r].rules[i].style.cssText;
}
}
}
function Ayuda(){
if( !_Modo ) return;
CONTENIDO.contentEditable = false;
var data = CONTENIDO.innerHTML;
var oPopBody = _oPopup.document.body;
var Estilo = document.styleSheets, Hay=false;
for( var r=0; r<Estilo.length; r++ ){
if( Estilo[r].href.indexOf('desktop') > -1 ){
for( var i=0; i<Estilo[r].rules.length; i++ ){
if( Estilo[r].rules[i].selectorText == '.AYUDA TABLE' ) _HelpTABLE = Estilo[r].rules[i].style.cssText;
if( Estilo[r].rules[i].selectorText == '.AYUDA TH' ) _HelpTH = Estilo[r].rules[i].style.cssText;
if( Estilo[r].rules[i].selectorText == '.AYUDA TD' ) _HelpTD = Estilo[r].rules[i].style.cssText;
if( Estilo[r].rules[i].selectorText == '.AYUDA' ){
oPopBody.style.cssText = Estilo[r].rules[i].style.cssText+';padding-top:0;padding-left:10;padding-right:10;';
Hay = true;
}
}
}
}
data = data.replace(/ class=AYUDA/gi,'');
data = data.replace(/ id=CONTENIDO/gi,'');
data = data.replace(/<TABLE/gi,'<TABLE style="'+_HelpTABLE+'"');
data = data.replace(/<TH/gi,'<TH style="'+_HelpTH+'"');
data = data.replace(/<TD/gi,'<TD style="'+_HelpTD+'"');
if( !Hay ) oPopBody.style.cssText = 'BACKGROUND:#FFFFCC; COLOR:#000099; BORDER:#000099 1px solid; CURSOR:default; FONT-FAMILY:ARIAL; FONT-SIZE:12px; MARGIN:0;';
oPopBody.style.overflow = 'hidden';
oPopBody.innerHTML = data;
var e = document.createElement('SPAN');
e.innerHTML = data;
e.id = 'TestHelp';
with( e.style ){
cssText = oPopBody.style.cssText;
position = 'absolute';
posLeft = 8;
posTop = 300;
height = CONTENIDO.style.height;
width = CONTENIDO.style.width;
}
document.body.appendChild(e);
oPopBody.style.paddingTop = 0;
oPopBody.style.marginTop = 10;
var aHeight = parseInt(CONTENIDO.style.height);
var aWidth = parseInt(CONTENIDO.style.width);
x = (screen.width-aWidth)/2;
y = (screen.availHeight-aHeight)/2;
_oPopup.document.onselectstart = new Function('return false');
_oPopup.show( x, y, aWidth, aHeight );
TestHelp.removeNode(true);
return false;
}
function Limpiar( tipo ){
if( (event.target || event.srcElement).disabled == true ) return;
if( tipo == 0 ){
if( !confirm( 'Confirmar "limpiar datos"' )) return;
CONTENEDOR.innerHTML = '<?= $_Limpio; ?>';
CONTENIDO.contentEditable = !CONTENIDO.isContentEditable;
CONTENIDO.contentEditable = !CONTENIDO.isContentEditable;
}else{
if( !confirm( 'Confirmar "recargar página"' )) return;
location.href = location.href;
}
}
var _Editable = true;
function OnOff( el ){
if( !_Modo ){
alert('No se puede cambiar el modo On/Off viendo el código HTML');
return;
}
CONTENIDO.contentEditable = (( CONTENIDO.isContentEditable ) ? false : true );
if( el.src.indexOf('_0') > -1 ){
el.src = el.src.replace('_0','_1');
_Editable = true;
}else{
el.src = el.src.replace('_1','_0');
_Editable = false;
}
}
var _AutoEnter = true;
function AutoEnter( el ){
if( _AutoEnter ){
el.src = el.src.replace('_1','_0');
}else{
el.src = el.src.replace('_0','_1');
}
_AutoEnter = !_AutoEnter;
}
var _SePulso = false;
function GrabarF10(){
if( S.eventCode(event) == 121 && _Modo ){
Grabar(document.all.GRABAR);
S.eventClear(window);
return false;
}
}
function PonTab(){
if( _Editable && !_SePulso ){
document.all.GRABAR.src = document.all.GRABAR.src.replace('_0','_1');
_SePulso = true;
}
if( !_AutoEnter ) return true;
if( S.eventCode(event) != 9 && S.eventCode(event) != 13 ) return;
if( S.eventCode(event) == 9 ) Put('<SPAN style="WIDTH:25"></SPAN>');
if( S.eventCode(event) == 13 ) Put('<BR>');
S.eventClear(window);
return false;
}
function Salir(){
if( _SePulso ){
S.eventClear(window);
return false;
}
}
function Put( txt ){
document.getElementById('CONTENIDO').focus();
var obj = document.selection.createRange();
obj.pasteHTML(txt);
obj = document.selection.createRange();
obj.select();
}
_Gif = new Array();
_Gif['maxi'] = new Image();
_Gif['maxi'].src = '<?= gsIMG('maxi'); ?>';
_Gif['mini'] = new Image();
_Gif['mini'].src = '<?= gsIMG('mini'); ?>';
function Zoom( el ){
if( el.Modo == 0 ){
el.title = 'Ampliar';
el.src = _Gif['mini'].src;
top.eAutoMenu(2);
el.Modo = 1;
}else{
el.title = 'Reducir';
el.src = _Gif['maxi'].src;
top.eAutoMenu(0);
el.Modo = 0;
}
}
function Reajusta(){
CONTENIDO.style.height = 5;
var h = CONTENIDO.offsetHeight;
var a = CONTENIDO.offsetWidth;
for( var n=a; n>5; n-- ){
CONTENIDO.style.width = n;
if( h < CONTENIDO.offsetHeight ){
CONTENIDO.style.width = n+1;
CONTENIDO.style.height = h;
break;
}
}
}
function CreateTabla(){
if( CONTENIDO.contentEditable == 'false' || !CONTENIDO.contentEditable ) return;
var strFil = prompt("Alto,Ancho","2,2");
if( strFil==null ) return;
var tmp = strFil.split(',');
strFil = tmp[0];
strCol = tmp[1];
if( strFil!=null && strCol!=null && strFil>0 && strCol>0 ){
var str = "<table style='"+_HelpTABLE+"' id=Opciones border=0 cellspacing=1 cellpadding=2>";
str += "<col style='font-weight:bold'>";
for(var i=0;i<strFil;i++ ){
str += "<tr>";
for( j=0; j<strCol; j++ ) str += "<td style='"+_HelpTD+"'>&nbsp;</td>";
str += "</tr>";
}
str += "</table>";
document.getElementById('CONTENIDO').focus();
var Obj = document.selection.createRange();
Obj.pasteHTML(str);
}
}
function AddEjemplo(){
var Obj = document.all.Esquema;
var TR = Obj.insertRow(); TR.unselectable = "off";
var TD = TR.insertCell(0); TD.id = 'tEjemplo'; TD.unselectable = "off"; TD.textContent = 'EJEMPLO';
var TR = Obj.insertRow(); TR.unselectable = "off";
var TD = TR.insertCell(0); TD.id = 'Ejemplo'; TD.unselectable = "off";
var TR = Obj.insertRow(); TR.unselectable = "off";
var TD = TR.insertCell(0); TD.id = 'txt'; TD.unselectable = "off";
}
function OkNewLink(){
var sel = document.selection;
if( 'Text' == sel.type ){
range = sel.createRange();
if( range.htmlText.length > 0 ) ed('createlink');
}else{
alert('Selecciona primero un texto como título del LINK');
S.eventClear(window);
}
}
function eTrim( txt ){
return txt.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/ +/g,' ');
}
function Spell(){
if( !_Editable ){
alert('No se puede ejecutar viendo el código HTML');
return;
}
try{
var x = eTrim(CONTENEDOR.textContent).replace(/\n/g,' ').replace(/\r/g,' '), n;
while( x.indexOf('  ')>-1 ) x = x.replace(/\s\s/g,' ');
var w = new ActiveXObject('Word.Application');
w.WindowState = 2;
w.Visible = false;
var d = w.Documents.Add();
d.Content = x;
d.CheckSpelling();
if( event.ctrlKey ) d.CheckGrammar();
var nx = d.Content+'';
d.Close(false);
w.Application.Quit(true);
w = d = null;
var o = x;
var d = eTrim(nx);
if( o != d ){
o = o.split(' '); d = d.split(' ');
if( o.length==d.length ) for( n=0; n<o.length; n++ ) if( o[n]!=d[n] )CONTENEDOR.innerHTML = CONTENEDOR.innerHTML.replace( o[n], d[n] );
}
}catch(e){}
}
var _HForma;
function HForma( n ){
var h = parseInt(CONTENIDO.style.height)+n;
if( h > 800 || h < 15 ) return;
vCambiaAlto.textContent = h;
CONTENIDO.style.height = h;
vCambiaAlto.textContent = h = CONTENIDO.offsetHeight;
vCambiaAncho.textContent = CONTENIDO.offsetWidth;
}
var _WForma;
function WForma( n ){
var w = parseInt(CONTENIDO.style.width)+n;
if( w > 1024 || w < 15 ) return;
vCambiaAncho.textContent = w;
CONTENIDO.style.width = w;
vCambiaAncho.textContent = w = CONTENIDO.offsetWidth;
vCambiaAlto.textContent = CONTENIDO.offsetHeight;
}
function HelpExplorer(){
document.all.Editor.style.display = 'none';
document.all.HELPBROWSE.style.display = 'block';
document.frames['HELPBROWSE'].location.replace('edes.php?E:$t/ht.gs&BROWSE'+(( document.all.tblCtrls.rows[0].cells[0].textContent.replace(/^\s+/g,'')=='')?'-NEW':''));
}
var _uSelectFile = '';
var _uSelectFileExt = '';
function uSelectFile( ext ){
var xFile = window.external.eFileSelect('Seleccionar fichero de ayuda','|*.'+ext);
if( xFile=='' ) return;
<?PHP
$tmp = explode('/',$_File);
$FileHelp = $tmp[count($tmp)-1];
?>
top.eInfo(window,S.lng(222));
_uSelectFile = xFile;
_uSelectFileExt = ext;
setTimeout('uSelectFile2()',1000);
}
function uSelectFile2(){
top.eFilePut( _uSelectFile, '/help/doc/<?=$FileHelp?>.'+_uSelectFileExt);
top.eInfoHide();
}
</SCRIPT>
</HEAD>
<?PHP
?>
<BODY onload="Inicio();" onbeforeunload='Salir()' scroll=<?= (($_VerTLF)?'yes':'no') ?> onkeydown='GrabarF10()' onhelp='return false;'<?=(($_SESSION['_D_']=='~')?'':" oncontextmenu='return false;'")?> style='border:0; margin:0; background:#f5f5f5'>
<IE:Download id=ObjDescarga style="behavior:url(#default#download)" />
<TABLE id=Editor class=COMANDOS width=100% height=100% cellspacing=0 cellpadding=0 border=0>
<TR height=1><TD>
<table id=tblCtrls width="100%" height="1" border=1 cellspacing=0 cellpadding=0 bgcolor="#D6D3CE" onMouseOver="icoOn()" onMouseOut="icoOff()" onMouseDown="icoDown()" onMouseUp="icoUp()">
<tr><td class=tdClass valign=middle style='cursor:default' title='<?= 'Fichero: '.str_replace('../help/tip/','',$_File); ?>'><?= '<img id=TRACE src="'.gsIMG('trace').'" style="cursor:default" title="'.$_NomFile.'"> '.str_replace('|',' <img id=TRACE src="'.gsIMG('trace').'" style="cursor:default"> ',$TRACE); ?>
<tr style="display:none"><td class="tdClass">
<BUTTON onclick='if(CONTENIDO.isContentEditable==true) document.execCommand("OverWrite");'>OverWrite</BUTTON>
<BUTTON onclick='if(CONTENIDO.isContentEditable==true) document.execCommand("InsertSelectDropdown",true,"<option value=12>PEPE");'>SelectDropdown</BUTTON>
<BUTTON onclick='if(CONTENIDO.isContentEditable==true) document.execCommand("InsertSelectListbox",true,"");'>SelectListbox</BUTTON>
<?PHP
echo '<tr><td class="tdClass">';
echo '<TABLE width=1 height=1 cellspacing=0 cellpadding=0 border=0>';
echo '<TR><TD>';
echo '<select id=SelFuentes onChange="ed(this.options[this.selectedIndex].textContent,\'fontname\')">';
echo '<option>Font';
echo '<option>Arial';
echo '<option>Courier';
echo '<option>Courier New';
echo '<option>Georgia';
echo '<option>Helvetica';
echo '<option>Impact';
echo '<option>Sans Serif';
echo '<option>Tahoma';
echo '<option>Times New Roman';
echo '<option>Verdana';
echo '<option>Wingdings';
echo '</select>';
echo '<TD>';
echo '<select onChange="ed(this.selectedIndex,\'fontsize\')">';
echo '<option>Size<option>Very Small<option>Small<option>Medium<option>Large<option>Larger<option>Very Large</select>';
echo '<TD>';
echo '<select onChange="ed(\'<\'+this.options[this.selectedIndex].textContent+\'>\',\'formatblock\')">';
echo '<option>Heading<option>H1<option>H2<option>H3<option>H4<option>H5<option>H6</select>';
echo '<TD>';
echo '<img src="'.gsIMG('space').'">';
echo '<img title="" src="'.gsIMG('cut').'" onClick="ed(\'cut\')">';
echo '<img title="" src="'.gsIMG('copy').'" onClick="ed(\'copy\')">';
echo '<img title="" src="'.gsIMG('paste').'" onClick="ed(\'paste\')">';
echo '<img src="'.gsIMG('toolbar').'">';
echo '<img title="Deshacer"	src="'.gsIMG('undo').'" onClick="ed(\'Undo\')">';
echo '<img title="Rehacer"	src="'.gsIMG('redo').'" onClick="ed(\'Redo\')">';
echo '<img src="'.gsIMG('toolbar').'">';
echo '<img title="Limpiar ayuda" src="'.gsIMG('limpiar').'" id=Limpiar onClick="Limpiar(0)">';
echo '<img src="'.gsIMG('space').'">';
echo '<img title="Recargar página" src="'.gsIMG('recargar').'" id=Recargar onClick="Limpiar(1)">';
if( !$EsAyuda && $_Tipo!='D' ){
echo '<img src="'.gsIMG('toolbar').'">';
echo '<img id=Ampliar title="Ampliar" src="'.gsIMG('maxi').'" onClick="Zoom(this)" Modo=0>';
}
if( $_Tipo == 'P' ){
?>
<TD><INPUT TYPE="bottom" id='vCambiaAlto' style='width:28' title='Ancho'></TD>
<TD>
<table style='margin:0;padding:0;font-size:1' border=0 cellspacing=0 cellpadding=0 height=1>
<tr><td><img title="- Ancho" src="<?= gsIMG('alto_mas'  ); ?>" onclick="HForma(-1)" onmousedown="_HForma=setInterval('HForma(-1)',100)" onmouseup="clearInterval(_HForma)"></td></tr>
<tr><td><img title="+ Ancho" src="<?= gsIMG('alto_menos'); ?>" onclick="HForma( 1)" onmousedown="_HForma=setInterval('HForma( 1)',100)" onmouseup="clearInterval(_HForma)"></td></tr>
</table>
</TD>
<TD><INPUT TYPE="bottom" id='vCambiaAncho' style='width:28' title='Alto'></TD>
<TD>
<table style='margin:0;padding:0;font-size:1' border=0 cellspacing=0 cellpadding=0 height=1><tr>
<td><img title="- Alto" src="<?= gsIMG('ancho_menos'); ?>" onclick="WForma(-1)" onmousedown="_WForma=setInterval('WForma(-1)',100)" onmouseup="clearInterval(_WForma)"></td>
<td><img title="+ Alto" src="<?= gsIMG('ancho_mas'  ); ?>" onclick="WForma( 1)" onmousedown="_WForma=setInterval('WForma( 1)',100)" onmouseup="clearInterval(_WForma)"></td>
</tr></table>
</TD>
<?PHP
echo '<TD><img title="Reajuste automático" src="'.gsIMG('reajusta').'" onClick="Reajusta()"></TD>';
}
echo '<TD><img src="'.gsIMG('toolbar').'">';
echo '<img title="Modo" src="'.gsIMG('modo_0').'" onClick="Modo(this)">';
if( $_Tipo == 'P' ){
echo '<img src="'.gsIMG('space').'">';
echo '<img title="Explorador de ayudas" src="'.gsIMG('tree').'" onClick="HelpExplorer()">';
}
echo '<TD><img src="'.gsIMG('toolbar').'">';
if( $_Tipo == 'P' ){
echo '<img title="Subir fichero de ayuda en PDF" src="'.gsIMG('help_pdf').'" onClick="uSelectFile(\'pdf\')">';
echo '<img title="Subir fichero de ayuda en CHM" src="'.gsIMG('help_chm').'" onClick="uSelectFile(\'chm\')">';
echo '<img title="Subir fichero de ayuda en MP3" src="'.gsIMG('help_avi').'" onClick="uSelectFile(\'mp4\')">';
echo '<TD><img src="'.gsIMG('toolbar').'">';
}
echo '</TABLE>';
echo '<tr id=ToolBar><td class="tdClass">';
echo '<img title="Negrita"		src="'.gsIMG('bold').'" onClick="ed(\'Bold\')">';
echo '<img title="Itálica"		src="'.gsIMG('italic').'" onClick="ed(\'Italic\')">';
echo '<img title="Subrayado"	src="'.gsIMG('under').'" onClick="ed(\'Underline\')">';
echo '<img title="Tachado"		src="'.gsIMG('tachado').'" onClick="ed(\'strikethrough\')">';
echo '<img title="SubIndice"	src="'.gsIMG('sub_txt').'" onClick="ed(\'Subscript\')">';
echo '<img title="SupIndice"	src="'.gsIMG('sup_txt').'" onClick="ed(\'Superscript\')">';
echo '<img title="Caracter"	src="'.gsIMG('char').'" onClick="ed(\'\')">';
echo '<img title="Texto vertical"	src="'.gsIMG('txt_vertical').'" onClick="ed(\'\')">';
echo '<img src="'.gsIMG('space').'">';
echo '<img title="Color del texto"			src="'.gsIMG('colorlapiz').'" onClick="gColor(\'L\')">';
echo '<img title="Color de fondo"	src="'.gsIMG('colpapel').'" onClick="gColor(\'P\')">';
echo '<img src="'.gsIMG('space').'">';
echo '<img title="Justificación izquierda"				src="'.gsIMG('left').'" onClick="ed(\'JustifyLeft\')">';
echo '<img title="Centrado"			src="'.gsIMG('center').'" onClick="ed(\'JustifyCenter\')">';
echo '<img title="Justificación derecha"			src="'.gsIMG('right').'" onClick="ed(\'JustifyRight\')">';
echo '<img title="Justificación completa"				src="'.gsIMG('j_izq_dch').'" onClick="ed(\'JustifyFull\')">';
echo '<img title="Indentar <-"	src="'.gsIMG('deindent').'" onClick="ed(\'Outdent\')">';
echo '<img title="Indentar ->"	src="'.gsIMG('inindent').'" onClick="ed(\'Indent\')">';
echo '<img title="Lista ordenada"	src="'.gsIMG('ordlist').'"onClick="ed(\'InsertOrderedList\')">';
echo '<img title="Lista con marcas"	src="'.gsIMG('underlist').'"onClick="ed(\'InsertUnorderedList\')">';
echo '<img title="Nuevo Párrafo"	src="'.gsIMG('enter').'" onClick="ed(\'InsertParagraph\')">';
echo '<img title="Enter y Tabulador"	src="'.gsIMG('auto_key_1').'" onClick="AutoEnter(this)">';
echo '<img title="Crear tabla"	src="'.gsIMG('tabla').'" onClick="CreateTabla()">';
echo '<img title="Crear ejemplo"	src="'.gsIMG('example').'" onClick="AddEjemplo()">';
echo '<img title="Linea"			src="'.gsIMG('rule').'" onClick="ed(\'InsertHorizontalRule\')">';
echo '<img title="Corrector ortográfico"	src="'.gsIMG('spell').'" onClick="Spell()">';
echo '<img src="'.gsIMG('space').'">';
echo '<img title="Elimina formato" src="'.gsIMG('formato').'" onClick="ed(\'RemoveFormat\')">';
if( $_Tipo == 'P' ){
echo '<img title="Previsualización" src="'.gsIMG('ver').'" onClick="Ayuda()">';
}
if( $EsAyuda ) echo '<img title="Crea Link"		src="'.gsIMG('link').'" onClick="OkNewLink()">';
echo '<img src="'.gsIMG('toolbar').'">';
echo '<img title="Grabar" src="'.gsIMG('save_0').'" onClick="Grabar(this)" id=GRABAR>';
echo '<img src="'.gsIMG('toolbar').'">';
echo '<tr style="display:none"><td class="tdClass">';
echo '<img title="Zoom -"		src="'.gsIMG('zoomout').'" onClick="ed(\'\')">';
echo '<img title="Zoom +"		src="'.gsIMG('zoomin').'" onClick="ed(\'\')">';
echo '<img title="Buscar"		src="'.gsIMG('buscar').'" onClick="ed(\'\')">';
echo '<img title="Corrector"	src="'.gsIMG('spell').'" onClick="ed(\'\')">';
echo '<img title="Ayuda"		src="'.gsIMG('help').'" onClick="ed(\'\')">';
echo '<img src="'.gsIMG('space').'">';
echo '<img title="Configuración del contenedor" src="'.gsIMG('setup').'" onClick="Setup()">';
echo '<img title="Modificar tamaño" src="'.gsIMG('forma').'" onClick="">';
echo '<img title="Nota sobre la Ayuda" src="'.gsIMG('nota').'" onClick="">';
echo '<img title="Email" src="'.gsIMG('email').'" onClick="">';
echo '<img title="Word" src="'.gsIMG('word').'" onClick="">';
echo '<img src="'.gsIMG('toolbar').'">';
echo '<tr style="display:none"><td class="tdClass">';
echo '<img src="'.gsIMG('toolbar').'">';
echo '<img title="InputText"		src="'.gsIMG('inputext').'" onClick="ed(\'InsertInputText\')">';
echo '<img title="Password"		src="'.gsIMG('password').'" onClick="ed(\'\')">';
echo '<img title="Hidden"			src="'.gsIMG('hidden').'" onClick="ed(\'\')">';
echo '<img title="TextArea"		src="'.gsIMG('textarea').'" onClick="ed(\'InsertTextArea\')">';
echo '<img title="Select"			src="'.gsIMG('select').'" onClick="">';
echo '<img title="ListBox"			src="'.gsIMG('listbox').'" onClick="ed(\'\')">';
echo '<img title="Option"			src="'.gsIMG('option').'" onClick="ed(\'\')">';
echo '<img title="Checkbox"		src="'.gsIMG('checkbox').'" onClick="">';
echo '<img title="Radio"			src="'.gsIMG('radio').'" onClick="">';
echo '<img title="File"				src="'.gsIMG('file').'" onClick="ed(\'InsertFile\')">';
echo '<img title="Crea tabla"		src="'.gsIMG('tabla').'" onClick="ed(\'\')">';
echo '<img title="Crea Link"		src="'.gsIMG('link').'" onClick="ed(\'createlink\')">';
echo '<img title="Image"			src="'.gsIMG('img').'" onClick="ed(\'\')">';
echo '<img title="Posición absoluta"	src="'.gsIMG('xy').'" onClick="ed(\'AbsolutePosition\',true)">';
echo '<img title="Posición 2D"	src="'.gsIMG('pos2d').'" onClick="ed(\'2D-Position\',true)">';
echo '<img title="FieldSet"		src="'.gsIMG('fs').'" onClick="ed(\'InsertFieldSet\')">';
echo '<img title="Marquesina"		src="'.gsIMG('marquesina').'" onClick="ed(\'InsertMarquee\')">';
echo '<img title="Button"			src="'.gsIMG('button').'" onClick="ed(\'InsertInputButton\')">';
echo '<img title="Reset"			src="'.gsIMG('reset').'" onClick="ed(\'\')">';
echo '<img title="Submit"			src="'.gsIMG('submit').'" onClick="ed(\'\')">';
echo '<img title="Formulario"		src="'.gsIMG('form').'" onClick="ed(\'\')">';
echo '<img title="Frame"			src="'.gsIMG('frame').'" onClick="ed(\'\')">';
echo '<img title="JavaScript"		src="'.gsIMG('js').'" onClick="ed(\'\')">';
echo '<img title="PHP"				src="'.gsIMG('php').'" onClick="ed(\'\')">';
echo '<img title="Imprimir"		src="'.gsIMG('print').'" onClick="ed(\'\')">';
echo '<img src="'.gsIMG('toolbar').'">';
?>
</td>
</tr>
</table>
<TR><TD valign=top align=left style="width:100%;height:100%;">
<?PHP
$Margen = 0;
if( $_Tipo=='A' ) $Margen = 0;
if( $_Tipo=='P' || $_Tipo=='N' ) $Margen = 8;
if( $Op=='B' ) $txt = $_Limpio;
?>
<div id=CONTENEDOR CONTENTEDITABLE=<?= (( $_Tipo=='P' ) ? 'true' : 'false') ?> style="padding:<?=$Margen?>;width:100%;height:100%;" onkeydown='PonTab()'><?=$txt?></div>
</TD></TR>
</TABLE>
<SCRIPT type="text/javascript">
if( document.getElementById('Esquema')!=null ) Esquema.cellSpacing = 1;
<?PHP  if( $_Tipo == 'P' ){ ?>
<?PHP  } ?>
function Inicio(){
var i;
for( i=0; i<document.all.length; i++ ) document.all(i).unselectable = "on";
CONTENIDO.unselectable = "off";
for( i=0; i<CONTENIDO.all.length; i++ ) CONTENIDO.all(i).unselectable = "off";
CONTENIDO.contentEditable = !CONTENIDO.isContentEditable;
<?PHP
?>
if( window.opener!=undefined ) document.all.Ampliar.style.display = 'none';
CONTENIDO.contentEditable = true;
document.all.Limpiar.disabled = false;
document.all.Recargar.disabled = false;
<?PHP
if( $Op=='B' ) echo 'HelpExplorer();';
?>
try{
top.eSWView(window);
}catch(e){}
}
function AnchoAlto(){
<?PHP  if( $_Tipo == 'P' ){ ?>
document.all.vCambiaAncho.value = CONTENIDO.offsetWidth;
document.all.vCambiaAlto.value = CONTENIDO.offsetHeight;
<?PHP  } ?>
}
AnchoAlto();
document.all.CONTENIDO.onresize  = AnchoAlto;
function Cargado( data ){
CONTENIDO.outerHTML = data;
CONTENIDO.unselectable = "off"
CONTENIDO.contentEditable = (!CONTENIDO.isContentEditable);
CONTENIDO.contentEditable = (!CONTENIDO.isContentEditable);
document.all.CONTENIDO.onresize  = AnchoAlto;
AnchoAlto();
}
function Empezar( uri ){
ObjDescarga.startDownload( uri, Cargado );
}
function Grabado(){
document.all.GRABAR.src = document.all.GRABAR.src.replace('_1','_0');
}
function Grabar( Obj ){
if( !_Editable ){
alert('No se puede grabar viendo el código HTML');
return;
}
_SePulso = false;
document.all.GRABAR.src = document.all.GRABAR.src.replace('_1','_0');
for( var i=0; i<CONTENEDOR.all.length; i++ ) CONTENEDOR.all(i).removeAttribute('unselectable');
CONTENIDO.removeAttribute('contentEditable');
var conte = CONTENEDOR.innerHTML;
for( var i=0; i<CONTENEDOR.all.length; i++ ) CONTENEDOR.all(i).unselectable = 'off';
CONTENIDO.contentEditable = true;
var tmp = window.document.URL.split('/edes.php');
tmp[0] = tmp[0]+'/';
var myRegExp = new RegExp(tmp[0],"gi");
conte = conte.replace(myRegExp,'');
var txt = '<!DOCTYPE HTML><HTML><HEAD><META http-equiv="Content-Type" content="text/html"><TITLE>e-Des</TITLE></HEAD><BODY style="padding:0px; margin:0px;">'+
'<FORM METHOD=POST ACTION="edes.php?AG" NAME="FRM1" accept-charset="ISO-8859-1">'+
'<INPUT TYPE="text" NAME="FICHERO" VALUE="<?= $_File; ?>">'+
'<INPUT TYPE="text" NAME="TIPO" VALUE="<?= $_Tipo; ?>">'+
'<INPUT TYPE="text" NAME="PLANTILLA" VALUE="<?= $PLANTILLA; ?>">'+
'<TEXTAREA NAME="FUENTE" COLS=96 ROWS=30 WRAP=off style="border:0;width:100%;height:100%;"></TEXTAREA>'+
'</FORM>'+
'</BODY></HTML>';
document.frames['TLF'].document.body.innerHTML = txt;
document.frames['TLF'].document.all.FUENTE.value = conte;
document.frames['TLF'].FRM1.submit();
}
CONTENIDO.focus();
if( top.name == 'Main' ) top.eLoading(false,window);
</SCRIPT>
<IFRAME name=HELPBROWSE eNORESIZE=true src='' width='100%' height='100%' style='display:none' FRAMEBORDER=0 SCROLLING='auto'></iframe>
<IFRAME name=TLF eNORESIZE=true src='' width='100%' height='100%'<?= (($_VerTLF)?'':' style="display:none"') ?> FRAMEBORDER=0 SCROLLING='auto'></iframe>
</BODY>
</HTML>
<?PHP
eEnd();
function ShowMensaje( $txt, $JS='' ){
eHTML('$t/ht.gs');
echo '<SCRIPT type="text/javascript">';
echo $JS;
?>
var _oPopup = window.createPopup();
var oPopBody = _oPopup.document.body;
oPopBody.innerHTML = '<div style="background:#FFFFCC; border:2 outset #001296;padding:5 20 5 20; width:1;height:1;text-align:center; vertical-align: middle;">'+
'<div style="width:1;height:1;text-align: center; vertical-align: middle;color:#001296;font-family: ARIAL;font-size:20"><?= $txt; ?></DIV>'+
'</DIV>';
_oPopup.show(0,0,10,10);
var aHeight = oPopBody.scrollHeight;
var aWidth = oPopBody.scrollWidth;
_oPopup.hide();
_oPopup.show( (screen.width-aWidth)/2, (screen.availHeight-aHeight)/2, aWidth, aHeight );
setTimeout('_oPopup.hide();', 2000);
</SCRIPT>
<?PHP
echo '</HEAD><BODY>';
echo '</BODY></HTML>';
eEnd();
}
function VerBrowse(){
global $_SERVER;
echo '<!DOCTYPE HTML>';
echo '<HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"><TITLE></TITLE>';
echo "<META HTTP-EQUIV='imagetoolbar' CONTENT='no'>";
echo "<META NAME='Generator' CONTENT='gsEdit'>";
echo "<META NAME='Copyright' CONTENT='".$_SESSION["CopyRight"]."'>";
?>
<style>
BODY {
font-family: ARIAL;
font-size: 12px;
color: #000099;
scroll: no;
}
TD {
background:#D6D3CE;
font-size: 12px;
}
IMG {
cursor:pointer;
margin-left:3px;
}
#INDICE {
cursor:pointer;
}
</style>
<?=_FileNoCache('edes.js')?>
<SCRIPT type="text/javascript">
function vEditar(){
if( _Doc==null ) return;
parent.document.all.Editor.style.display = 'block';
parent.document.all.HELPBROWSE.style.display = 'none';
if( _Doc.textContent.indexOf('.htm') > -1 ){
parent.location.replace('edes.php?iE:/help/tip/'+_Doc.textContent.replace(/\s/g,'')+'&T=H&D=P&TRACE=-1&ConRetorno=1');
}else{
parent.location.replace('edes.php?E:$t/ht.gs&EditHelp='+_Doc.textContent.replace(/\s/g,''));
}
}
function vEditor(){
if( _Doc==null && parent.document.all.tblCtrls.rows[0].cells[0].textContent.replace(/^\s+/g,'')=='' ) return;
parent.document.all.Editor.style.display = 'block';
parent.document.all.HELPBROWSE.style.display = 'none';
}
function vCopy(){
if( _Doc==null ) return;
parent._Paste = ViewHELP.document.all.CONTENIDO.innerHTML;
}
function vBorrar(){
if( _Doc==null ) return;
if( !confirm('Confirmar borrar la Ayuda') ) return;
parent.TLF.location.replace('edes.php?E:$t/ht.gs&DeleteHelp='+_Doc.textContent.replace(/\s/g,''));
_Doc.parentElement.removeNode(true);
if( ViewHELP.document.all.CONTENIDO!=undefined ) ViewHELP.document.all.CONTENIDO.style.display = 'none';
_Doc = null;
}
function vInsert(){
var txt = prompt("Nombre",'');
if( txt!='' ){
var TR = S("#INDICE").obj.insertRow(),
TD = TR.insertCell(0); TD.id = 'h'; TD.textContent = txt;
}
}
function GenWord(){
if( !confirm('Confirmar generar Ayuda en Word') ) return;
parent.TLF.location.replace('edes.php?E:$t/ht.gs&GENWORD');
}
var _Doc = null;
function VerDoc(){
var Obj = event.target || event.srcElement;
if( Obj.tagName!='TD' ) return;
if( _Doc!=null ){
_Doc.style.backgroundColor = '';
}
_Doc = Obj;
_Doc.style.backgroundColor = '#c3beb7';
document.frames['ViewHELP'].location.replace('edes.php?E:$t/ht.gs&ViewHelp='+Obj.textContent.replace(/\s/g,''));
document.all.VolverAlEditor.style.display = 'block';
}
function KeyDown(){
if( _Doc==null ) return;
if( S.eventCode(event) == 40 ){
if( _Doc.parentElement.rowIndex < INDICE.rows.length-1 ) INDICE.rows[_Doc.parentElement.rowIndex+1].cells[0].fireEvent('onclick');
}else if( S.eventCode(event) == 38 ){
if( _Doc.parentElement.rowIndex > 0 ) INDICE.rows[_Doc.parentElement.rowIndex-1].cells[0].fireEvent('onclick');
}
}
document.onkeydown = KeyDown;
</SCRIPT>
<?PHP
if( $_SESSION['_D_']=='~' ){
echo '</HEAD><BODY style="margin:0px;padding:0px" help="return false;">';
}else{
echo '</HEAD><BODY style="margin:0px;padding:0px" help="return false;" oncontextmenu="return false;">';
}
echo '<TABLE border=1 width=100% height=100% cellspacing=0px cellpadding=0px style="border-top:10px">';
echo '<TR><TD colspan=2>';
echo '<TABLE width=100% cellspacing=0px cellpadding=0px border=0px><TR>';
echo '<TH><img title="Editar" src="'.gsIMG('op_update').'"	onClick="vEditar()"></TH>';
echo '<TH><img title="Copiar" src="'.gsIMG('op_copy').'"		onClick="vCopy()"></TH>';
echo '<TH><img title="Borrar" src="'.gsIMG('op_delete').'"	onClick="vBorrar()"></TH>';
echo '<TH><img title="Insertar" src="'.gsIMG('op_insert').'"	onClick="vInsert()"></TH>';
echo '<TH style="padding-left:10px"><img title="Genera las ayudas en Word" src="'.gsIMG('help_doc').'" onClick="GenWord()"></TH>';
echo '<TH width=100% style="cursor:default">VISOR DE AYUDAS</TH>';
echo '<TH style="padding-right:5px"><img title="" src="'.gsIMG('w_mini').'" onClick="vEditor()" id="VolverAlEditor"></TH>';
echo '</TR></TABLE>';
echo '<TR><TD width=200 height=100%>';
echo '<div style="overflow:auto; float:left; scroll:auto; margin:0px 2px 0px 2px; width:100%; height:100%;">';
echo '<TABLE id=INDICE border=0px cellspacing=0px cellpadding=0px onclick="VerDoc()" width=100%>';
$Dim = array();
$di = opendir( '../help/tip' );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( !is_dir("$dorg/$file") && substr_count($file,'.bak')==0 ) $Dim[] = $file;
}
}
sort($Dim);
for( $n=0; $n<count($Dim); $n++ ) echo "<TR><TD id=h>{$Dim[$n]}</TD></TR>";
closedir( $di );
echo '</TABLE>';
echo '</div>';
echo '</TD><TD style="background:#F7F7F7">';
echo '<IFRAME name=ViewHELP src="edes.php?E:$t/ht.gs&ViewHelp=xXxXx" width="100%" height="100%" FRAMEBORDER=0></iframe>';
echo '</TD></TR></TABLE>';
if( $_SERVER['QUERY_STRING']=='BROWSE-NEW' ) echo '<script type="text/javascript">document.getElementById("VolverAlEditor").style.display="none";</script>';
echo '</BODY></HTML>';
eEnd();
}
function VerUnaAyuda( $File ){
echo '<!DOCTYPE HTML>';
echo '<HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"><TITLE></TITLE>';
echo "<META HTTP-EQUIV='imagetoolbar' CONTENT='no'>";
echo "<META NAME='Generator' CONTENT='gsEdit'>";
echo "<META NAME='Copyright' CONTENT='".$_SESSION["CopyRight"]."'>";
eLink('desktop2');
echo '</HEAD><BODY style="margin:0;background:#F7F7F7" help="return false;" oncontextmenu="return false;">';
if( file_exists("../help/tip/{$File}") ){
$df = fopen("../help/tip/{$File}",'r');
$txt = fread($df,filesize("../help/tip/{$File}"));
fclose($df);
echo str_replace(' contentEditable=true','',$txt);
}
echo '</BODY></HTML>';
eEnd();
}
function GenWord(){
$Dim = array();
$di = opendir( '../help/tip' );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( !is_dir("$dorg/$file") && substr_count($file,'.bak')==0 ) $Dim[] = $file;
}
}
sort($Dim);
for( $n=0; $n<count($Dim); $n++ ) echo "<TR><TD id=h>{$Dim[$n]}</TD></TR>";
closedir( $di );
$Arbol = file('../tree/master.txt');
$ArbolURL = array();
$FileDes = '../_tmp/php/help.doc';
unlink( $FileDes );
$pd = fopen( $FileDes, 'w' );
fputs( $pd, '<HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"><TITLE> eDes - Manual aplicación </TITLE>' );
fputs( $pd, '<style>.AYUDA {BACKGROUND: #ffffcc;BORDER-BOTTOM: #000099 1px solid;BORDER-LEFT: #000099 1px solid;BORDER-RIGHT: #000099 1px solid;BORDER-TOP: #000099 1px solid;COLOR: #000099;CURSOR: default;FONT-FAMILY: ARIAL;FONT-SIZE: 12px;MARGIN: 7 10 10 10;}</style>' );
fputs( $pd, '</HEAD><BODY>'."\n" );
fputs( $pd, '<TABLE cellspacing=0 cellpadding=0 width=100%><TR>' );
fputs( $pd, 	'<TD>'.$_SESSION["CopyRight"].'</TD>' );
fputs( $pd, 	'<TD align=right>'.date('Y-m-d H:i:s').'</TD>' );
fputs( $pd, '</TR></TABLE><BR>');
fputs( $pd, '<CENTER><U><B>&nbsp;AYUDAS&nbsp;</B></U></CENTER>'."<BR>\n"  );
for( $n=0; $n<count($Dim); $n++ ){
$Trayectoria = array();
fputs( $pd, $Dim[$n] );
if( ($Dim[$n]*1).'' == $Dim[$n] ){
for( $p=0; $p<count($Arbol); $p++ ){
if( substr_count( trim($Arbol[$p]).'#', '~'.$Dim[$n] ) == 1 ){
fputs( $pd, ': ' );
$s = $p;
$D = strlen($Arbol[$s]) - strlen(ltrim($Arbol[$s]));
do{
if( $D == strlen($Arbol[$s]) - strlen(ltrim($Arbol[$s])) ){
list( $Op ) = explode('|',$Arbol[$s]);
$Trayectoria[] = $Op;
$D--;
if( $D < 0 ) break;
}
$s--;
}while( $s >= 0 );
break;
}
}
}else{
for( $p=0; $p<count($ArbolURL); $p++ ){
if( $ArbolURL[$p] == $Dim[$n] ){
fputs( $pd, ': ' );
$s = $p;
$D = strlen($Arbol[$s]) - strlen(ltrim($Arbol[$s]));
do{
if( $D == strlen($Arbol[$s]) - strlen(ltrim($Arbol[$s])) ){
list( $Op ) = explode('|',$Arbol[$s]);
$Trayectoria[] = $Op;
$D--;
if( $D < 0 ) break;
}
$s--;
}while( $s >= 0 );
break;
}
}
}
$Trayectoria = array_reverse( $Trayectoria );
for( $p=0; $p<count($Trayectoria); $p++ ){
if( $p > 0 ) fputs( $pd, ' / ' );
fputs( $pd, $Trayectoria[$p] );
}
fputs( $pd, "\n" );
$File = '../help/tip/'.$Dim[$n];
$fd = fopen( $File, 'r' );
$txt = trim(fread( $fd, filesize($File) ));
fclose($fd);
$txt = '<TABLE'.substr($txt,4,strlen($txt)-10).'</TD></TR></TABLE>';
$p = strpos($txt,'>')+1;
$txt = substr($txt,0,$p).'<TR><TD>'.substr($txt,$p);
fputs( $pd, $txt );
fputs( $pd, "<br>\n" );
}
fputs( $pd, '</BODY></HTML>' );
fclose( $pd );
clearstatcache();
eInit();
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Content-Type: application/force-download");
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");
Header("Content-Type: application/doc");
header("Content-Disposition: attachment; filename=ayuda.doc;");
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".filesize($FileDes));
readfile($FileDes);
exit;
}
function NomFileHelp( $Arbol, $ArbolURL ){
for( $p=0; $p<count($Arbol); $p++ ){
$ArbolURL[$p] = '';
list(,$Op ) = explode('|',$Arbol[$p]);
list( $Op ) = explode('~',$Op);
$Valor = trim($Op);
if( $Valor == '' ) continue;
if( substr($Valor,-1) == ':' ){
$t = ( strlen($Arbol[$p]) - strlen(ltrim($Arbol[$p])) ) - 1;
for( $i=$p-1; $i>=0; $i-- ){
if( $t == strlen($Arbol[$i]) - strlen(ltrim($Arbol[$i])) ){
list(,$Op ) = explode('|',$Arbol[$i]);
list( $Op ) = explode('~',$Op);
$Op = trim($Op);
$Valor .= substr($Op,1);
break;
}
}
}
$Valor = strtr( $Valor, array('/'=>'_', '\\'=>'_', ' '=>'_') );
$quitar = '.?23?mMF>';
for( $n=0; $n<strlen($quitar); $n++ ) if( substr($Valor,0,1) == substr($quitar,$n,1) ) $Valor = substr($Valor,1);
$divide = '?&';
for( $n=0; $n<strlen($divide); $n++ ){
list($Valor) = explode(substr($divide,$n,1),$Valor);
}
$TObjeto = '';
if( substr_count($Valor,':')==1 ){
list($TObjeto,$NomFile) = explode(':',$Valor);
$Modo = substr($TObjeto,1);
}else{
$NomFile = $Valor;
$Modo = '';
}
if( substr_count($NomFile,'.')==0 && $NomFile!='' ){
switch( $TObjeto[0] ){
case '=':
case '#':
$NomFile .= '.edf';
break;
case '@':
$NomFile .= '.gdf';
break;
case '>':
case '^':
break;
case '[':
break;
default:
if(		 file_exists('../d/'.$NomFile.'.edf' ) ){
$NomFile .= '.edf';
}else if( file_exists('../d/'.$NomFile.'.gdf' ) ){
$NomFile .= '.gdf';
}else if( file_exists('../d/'.$NomFile.'.fdf' ) ){
$NomFile .= '.fdf';
}else if( file_exists('../d/'.$NomFile.'.ldf' ) ){
$NomFile .= '.ldf';
}
}
}
}
}
?>
