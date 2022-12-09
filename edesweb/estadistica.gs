<?PHP
if( !isset($_SESSION['_User']) ) exit;
if( isset($_GET["F"]) && $_GET["F"]=="Login" ){
echo "top.location.href='{$_SESSION['_DIRWEB']}';";
eEnd();
}
if( isset($_GET["CacheIMG"]) && ($_GET["CacheIMG"]*1)>0 ){
$TamayoImg = $_GET["CacheIMG"];
$OkFile = array('GIF','PNG','JPG','JPEG');
$DirBase = 'g';
$di = opendir( $DirBase );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( !is_dir( "{$DirBase}/{$file}" ) ){
$NomFile = $DirBase.'/'.$file;
$Ext = explode('.',$file);
$Ext = strtoupper($Ext[count($Ext)-1]);
if( in_array($Ext,$OkFile) && filesize($NomFile)<$TamayoImg ){
echo "<img src='{$NomFile}'>";
}
}
}
}
closedir( $di );
eEnd();
}
if( isset($_POST["PathLoad"]) ){
eTrace( 'Source..: '.$_POST["Source"] );
eTrace( 'PathLoad: '.$_POST["PathLoad"] );
eTrace( 'DefaultPathFile: '.$_POST["DefaultPathFile"] );
$_DefaultPathType = eFileGetVar('/_datos/config/sql.ini->$_DefaultPathType');
if( trim($_POST["DefaultPathFile"])!='' ){
$Source = '../_datos/usr/path_'.strtr(trim($_POST["DefaultPathFile"]), '$/', '__').'.'.$_SESSION['_User'];
}else if( strtoupper($_DefaultPathType)=='S' ){
$Source = '../_datos/usr/path_'.strtr($_POST["Source"], '$/', '__').'.'.$_SESSION['_User'];
}else{
$Source = '../_datos/usr/path.'.$_SESSION['_User'];
}
include_once($Source);
$txt = '<'.'?PHP'."\n".'$PathLoad="'.$_POST["PathLoad"].'";'."\n".'$PathSave="'.$PathSave.'";'."\n?>";
file_put_contents($Source,$txt);
echo '<SCRIPT type="text/javascript">top.eInfo(window, S.lng(223));</SCRIPT>';
eEnd();
}
if( $_GET["CargaHTM"]=='1' ){
CargaHtmlSeguridad();
eEnd();
}
if( empty($_SERVER['QUERY_STRING']) ) exit;
if( isset($_GET["YES"]) ){
$_SESSION['_SP_'] = 'production';
echo '<SCRIPT type="text/javascript">top.eInfo(window,"ACTIVADA Ejecución en DDBB de Procesos",-1);</SCRIPT>';
eEnd();
}
if( isset($_GET["NO"]) ){
if( isset($_SESSION['_SP_']) ){
unset($_SESSION['_SP_']);
echo '<SCRIPT type="text/javascript">top.eInfo(window,"DESACTIVADA Ejecución en DDBB de Procesos");</SCRIPT>';
}
eEnd();
}
if( isset($_GET["TIENEMDB"]) ){
if( $_GET["TIENEMDB"]==0 && $_SESSION['_MDB_']=='S' ){
$_SESSION['_MDB_'] = '';
$_SESSION['_notools_'] .= 'a';
}
eTrace('MDB On/Off');
eEnd();
}
if( isset($_GET["SESION"]) ){
$tmp = explode(',',$_POST['NOEXTENSION']);
for( $n=0; $n<count($tmp); $n++ ){
if( $tmp[$n]!='' ){
if( $tmp[$n][0]=='_' ){
$_SESSION[$tmp[$n]] = '';
}else{
$_SESSION['_'.$tmp[$n].'_'] = '';
}
if( $tmp[$n]=='PDF' || $tmp[$n]=='_PDF_' ) $_SESSION['_notools_'] .= 'p';
}
}
clearstatcache();
eEnd();
}
if( isset($_GET["Loading"]) ){
eHTML('$estadistica.gs');
?>
<LINK REL='stylesheet' HREF='<?=$_PathCSS?>/ficha.css' TYPE='text/css'>
</HEAD>
<BODY onhelp="return false" oncontextmenu="return false" onclick="window.external.eWebToBack(<?=$_GET['IdWeb']?>)">
<table style='width:100%;height:100%;background-color:transparent'><tr><td valign=middle align=center style='background-color:transparent'>
<?PHP
$_FileLoading = 'g/loading_d5_1.gif';
if( $_FileLoading!='' ){
if( substr($_FileLoading,0,2)=='g/' ){
$_FileLoading = $_PathIMG.substr($_FileLoading,1);
}
}
echo "<img src='{$_FileLoading}'>";
echo '</td></tr></table>';
echo '</BODY>';
echo '</HTML>';
eEnd();
}
if( isset($_GET["SWOPENCSS"]) ){
_FileNoCache('edes.js');
include('../_datos/config/empty_page.htm');
?>
<script type="text/javascript">
var _Source = 'SWOPENCSS<?=$_GET['TIPO']?>';
window.frameElement.onactivate = function anonymous(){ return false; }
top.eSWSetStatus( window, 'TEXT' );
var Obj = window.frameElement.id.replace('swI_','swV_');
try{
top.DGI(Obj).setAttribute( 'NoChangeClass', true );
}catch(e){}
setTimeout('top.eSWResize(window,250,200);top.eSWFocus(window.frameElement.WOPENER);',500);
function LoadingView(){
var Obj = window.frameElement.id.replace('swI_','swV_');
var el = S("IMG",Obj).dim;
for( var n=0; n<el.length; n++ ) if( el[n].src.indexOf('swloading.gif')>-1 ){
el[n].parentNode.style.display = 'block';
break;
}
}
function PonColor(){
var Obj = window.frameElement.id.replace('swI_','swV_');
top.DGI(Obj).className = top.DGI(Obj).className.replace('SWOpenON','SWOpenOFF');
}
<?PHP
if( $_GET['TIPO']=='WOFF' ) echo 'setTimeout("PonColor()",1000);';
echo 'setTimeout("LoadingView()",1100);';
echo '</SCRIPT>';
eEnd();
}
if( isset($_GET["Cookies"]) ){
?>
<script type="text/javascript">
var txt = document.cookie.replace(/=/g,' = ').replace(/; /g,"\n");
top.eAlert('LISTADO DE COOKIES', txt.replace(/\|/g,"\n"), 'A', 'I');
</script>
<?PHP
eEnd();
}
include_once($Dir_.$_Sql.'.inc');
if( isset($_GET["LOPD"]) ){
$Campo = 'dt_confidential';
qQuery("select {$Campo} from gs_user where cd_gs_user='{$_SESSION['_User']}'");
list($Fecha) = qRow();
$File = '';
if( file_exists( '../_datos/config/docsecurity_'.$_SESSION['_LANGUAGE_'].'.pdf' ) ){
$File = '../_datos/config/docsecurity_'.$_SESSION['_LANGUAGE_'].'.pdf';
}else if( file_exists( '../_datos/config/docsecurity.pdf' ) ){
$File = '../_datos/config/docsecurity.pdf';
}
if( $File<>'' ){
?>
<style>
BODY {
margin:0px;
padding:0px;
scroll:no;
overflow:hidden;
}
</style>
<TABLE border=0px width=100% height=100% cellspacing=0px cellpadding=0px>
<TR height=100%>
<TD align=center>
<embed src='edes.php?R:<?=$File?>#toolbar=0&navpanes=0&scrollbar=1' width='100%' height='100%' style='border-bottom:1 solid #000000'>
<TR height=1>
<TD rowspan=2 align=center style='padding-top:5px'>
Leido y aceptado el día: <?=eDataFormat($Fecha,"F4")?>
</TABLE>
<?PHP
}else{
$File = '../_datos/config/docsecurity_'.$_SESSION['_LANGUAGE_'].'.htm';
readFile($File);
echo '<br><center>Leido y aceptado el día: '.eDataFormat($Fecha,"F4").'</center>';
}
echo '<script type="text/javascript">top.eLoading(0,window); if( top.eIsWindow(window) ){ top.eSWResize(window); top.eSWView(window); }</script>';
eEnd();
}
if( qCount('gs_conexion', "conexion='{$_SESSION['_Connection_']}'")>0 ){
if( isset($_GET['C']) ){
sql_Modifica( 'gs_conexion', "sg_carga='{$C}'", "conexion='{$_SESSION['_Connection_']}'" );
if( $TronFile_ ) error_log( '<sg>'.$C, 3, '___prueba.err' );
}
if( isset($_GET['F']) ){
if( isset($_POST['UOP']) ){
$_LastSuffixOptions = $_SESSION['_LastSuffixOptions'];
$UOP = trim(urldecode(stripcslashes($_POST['UOP'])));
if( substr( $UOP,0,7 )=='<TBODY>' && substr( $UOP,-8 )=='</TBODY>' && substr_count( $UOP, '<TBODY>' ) == 1 && substr_count( $UOP, '</TBODY>' ) == 1 ){
$pnt = fopen( eScript("/_datos/usr/{$_User}{$_LastSuffixOptions}.uop"), 'w' );
if( !$pnt ){
@unlink( eScript("/_datos/usr/{$_User}{$_LastSuffixOptions}.uop") );
eEnd();
}
fputs( $pnt, $UOP );
fclose( $pnt );
}
}
if( isset($_POST['LM']) ){
$FrecuntyOptions = '';
$xMenu = trim($_POST['FO']);
if( $xMenu!='' ){
$tmp = explode(';', $xMenu);
$_RecentOptions = eFileGetVar("Desktop.RecentOptions");
$MaxOp = $_RecentOptions;
$DimOp = array();
for($n=1; $n<count($tmp); $n++) $DimOp[] = explode(',',$tmp[$n]);
_QSortMultiArray( $DimOp );
$txt = '';
for( $n=0; $n<count($DimOp) && $n<$MaxOp; $n++ ) if( $DimOp[$n][0]>0 ) $txt .= $DimOp[$n][0].','.$DimOp[$n][1]."\n";
$FrecuntyOptions = ">FO:\n".$txt;
}
$LastMenu = '>LM:'.trim($_POST['LM']);
$TabFixed = '>TF:'.trim($_POST['TF']);
$txt = $LastMenu."\n".$TabFixed."\n".$FrecuntyOptions;
file_put_contents( "../_datos/usr/fo.{$_User}", $txt );
}
if( $_SESSION['_D_'] != '' ){
if( $_SESSION["_gsACCESO"]['LOGEAR']==1 ) gsLogear( 'FW', 'E', '' );
}
if( $_Estadistica ){
$_SAVETRACE = true;
Estadistica( 'EXT', 0 );
}
sql_Modifica('gs_conexion', "cdi_fin='".date('Y-m-d H:i:s')."'", "conexion={$_SESSION['_Connection_']}");
if( $_SESSION['CONTEXTON'] ){
if( !$_HndDBSystem ) qConnectSystem();
$_HndDBSystem->qQuery("delete from gs_context where cd_gs_conexion={$_SESSION['_Connection_']}");
}
if( $TronFile_ ) error_log('<FIN>'.$__Enter, 3, '___prueba.err');
@unlink(session_save_path().'/'.'sess_'.session_id());
if( ini_get("session.use_cookies") ){
$params = session_get_cookie_params();
setcookie(session_name(), '', time() - 42000,
$params["path"], $params["domain"],
$params["secure"], $params["httponly"]
);
}
$_SESSION = array();
session_destroy();
$_SESSION = array();
clearstatcache();
qFree();
qEnd();
if( isset($_GET['JS']) && $_GET['JS']==1 ){
?>
try{
history.pushState({foo:'bar'}, '-*-', location.origin+location.pathname);
}catch(e){}
document.write("Aplicación cerrada.");
<?PHP
}else{
echo "Aplicación cerrada.";
?>
<SCRIPT type="text/javascript">
try{
history.pushState({foo:'bar'}, '-*-', location.origin+location.pathname);
}catch(e){}
</SCRIPT>
<?PHP
}
eEnd();
}
}else if( $_GET["F"]=="1" && ($_SERVER["QUERY_STRING"]=="F=1" || substr($_SERVER["QUERY_STRING"],0,4)=="F=1&") ){
unset($_SESSION);
session_unset();
session_destroy();
echo 'top.document.body.style.padding = "20px";';
echo 'top.document.body.innerHTML = "Aplicación cerrada<br><br><a c=8 href=\'"+top.location.href+"\'>login</a>";';
eEnd();
}
if( ( $_Development || $_SESSION['_D_']!='' ) && isset($C) ){
?>
<!DOCTYPE HTML><HTML><HEAD>
<script type="text/javascript">
<?PHP
gsAvisos();
?>
if( null != top.DGI('SgCarga') ){
top.DGI('SgCarga').title = top.DGI('SgCarga').title +' / <?= $_SESSION['_Connection_']; ?>';
}
<?PHP
?>
setTimeout('location.href="about:blank"',100);
</SCRIPT></HEAD><BODY></BODY></HTML>
<?PHP
}
eEnd();
function _SortNormal($a,$b){
$_SortNumCol = 0;
$_SortOrderUp = true;
if( $_SortOrderUp ){
return( $a[$_SortNumCol] <= $b[$_SortNumCol] );
}else{
return( $a[$_SortNumCol] > $b[$_SortNumCol] );
}
}
function _QSortMultiArray( &$array ){
usort( $array, '_SortNormal');
}
function CargaHtmlSeguridad(){
$txt = file_get_contents('../_datos/config/docsecurity_es.htm');
$txt = substr( $txt, strpos(strtoupper($txt),'<BODY') );
$txt = substr( $txt, strpos($txt,'>')+1 );
$txt = substr( $txt, 0, strpos(strtoupper($txt),'</BODY>') );
$txt = str_replace('"','&#34;',$txt);
$txt = str_replace(chr(10),'',$txt);
$txt = str_replace(chr(13),'',$txt);
?>
<script type="text/javascript">
var Obj = window.frameElement.WOPENER;
Obj.DGI('DOCHTML').innerHTML = "<?=$txt?>";
</script>
<?PHP
}
?>
