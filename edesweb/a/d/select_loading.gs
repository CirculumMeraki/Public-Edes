<?PHP
eCheckUser();
if( isset($_GET['SetLoading']) ){
$_FileLoading = 'g/loading_d5_1.gif';
$aFile = trim(str_replace('&nbsp;',' ',$_GET['SetLoading']));
$Dim = file_get_contents('../_datos/config/desktop.ini');
if( substr_count($Dim,'$_FileLoading') == 1 ){
$i = strpos($Dim,'$_FileLoading')+1;
$c = '';
$i1 = strpos($Dim,"'",$i);
$i2 = strpos($Dim,'"',$i);
if( $i1===false ){
$c = '"';
}else{
$c = "'";
if( $i2!==false ) $c = (($i1<$i2)?"'":'"');
}
if( $c=='' ) die('No');
$i = strpos($Dim,$c, $i+1);
$f = strpos($Dim,$c, $i+1);
$NewFile = '';
if( $_GET['SetLoading']!='' ){
if( substr($aFile,-4)!='.swf' && substr($aFile,-4)!='.gif' && substr($aFile,-4)!='.jpg' && substr($aFile,-4)!='.png' && substr($aFile,-5)!='.jpeg' ){
$NewFile = $aFile;
}else{
$NewFile = 'g/'.$aFile;
}
}
$oFile = substr( $Dim, $i+1, $f-$i-1);
eTrace( $oFile );
if( file_exists($oFile) ){
@unlink( $oFile );
error_log( date('Y-m-d H:i:s').': @unlink( "'.$oFile.'" );'."\n", 3, '../_datos/config/directory.log' );
gsActivity( '/_datos/config/directory.log' );
}
if( $NewFile!='' ){
$nFile = '../../edesweb/a/g/loading/'.substr($NewFile,2);
eTrace( $nFile );
if( file_exists($nFile) && $nFile!='' ){
@copy( $nFile, $NewFile );
error_log( date('Y-m-d H:i:s').': @copy( "'.$nFile.'", "'.$NewFile.'" );'."\n", 3, '../_datos/config/directory.log' );
gsActivity( '/_datos/config/directory.log' );
}
}
$Dim = substr($Dim,0,$i+1).$NewFile.substr($Dim,$f);
file_put_contents( '../_datos/config/desktop.ini', $Dim );
gsActivity( '/_datos/config/desktop.ini' );
?>
<script type="text/javascript">
top.eInfo( top, S.lng(223) );
</script>
<?PHP
}else{
?>
<script type="text/javascript">
top.eInfoError( top, 'ERROR: Hay mas de una entrada de la variable "$_FileLoading"' );
</script>
<?PHP
}
eEnd();
}
eHTML('','','Help-Desk');
?>
</HEAD>
<style>
BODY {
background: #f2f2f2;
FONT-FAMILY: ARIAL;
}
.TITULO {
color: #001087;
font-size: 16px;
}
.GIFS TABLE {
background: #3f474c;
}
.GIFS TD {
text-align: center;
vertical-align: middle;
background: #eeeeee;
cursor: pointer;
}
.GIFS .SET {
border: 1px solid red;
}
</style>
<?=_FileNoCache('edes.js')?>
</HEAD>
<BODY on_contextmenu='return false' help='return false'>
<SCRIPT type="text/javascript">
function opOver(){
var Obj = S.event(window);
if( Obj.tagName=='IMG' ) Obj = Obj.parentNode;
if( Obj.tagName!='TD' ) return;
Obj.style.backgroundColor = '#e2e2e2';
}
function opOut(){
var Obj = S.event(window);
if( Obj.tagName=='IMG' ) Obj = Obj.parentNode;
if( Obj.tagName!='TD' ) return;
Obj.style.backgroundColor = '';
}
function opClick(){
var Obj = S.event(window);
if( Obj.tagName=='IMG' ) Obj = Obj.parentNode;
if( Obj.tagName!='TD' ) return;
var File = '';
if( Obj.all.length == 0 ){
File = Obj.textContent;
}else if( Obj.children[0].src!=undefined ){
File = Obj.children[0].src+'';
}else if( Obj.children[0].movie!=undefined ){
File = Obj.children[0].movie+'';
}
var e = document.getElementsByTagName('TD');
for( var n=0; n<e.length; n++ ) e[n].style.border = '';
Obj.style.border = '1px solid red';
var sFile = File;
File = File.replace(/\\/g,'/').split('/');
top.eCallSrv( window, 'edes.php?E:$a/d/select_loading.gs&SetLoading='+File[File.length-1] );
var NmFile = File[File.length-1].split('.');
top._Gif[NmFile[0]] = new Image();
top._Gif[NmFile[0]].src = sFile;
}
top.eSWResize( window );
</SCRIPT>
<?PHP
include( '../_datos/config/desktop.ini' );
if( isset($_FileLoading) ){
if( $_FileLoading=='' ){
$aFile = '';
}else if( file_exists($_FileLoading) ){
$aFile = $_FileLoading;
$aFile = explode('/',str_replace( '\\','/',$aFile));
$aFile = $aFile[count($aFile)-1];
}else $aFile = $_FileLoading;
}else{
$aFile = '';
}
$Dim2 = array();
$Dim = array();
$di = opendir( '../../edesweb/a/g/loading/' );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( !is_dir( "../../edesweb/a/g/{$file}" ) ){
if( strlen($file)==17 && substr($file,0,7)=='loading' && substr($file,9,1)=='_' && substr($file,-3)=='gif' ){
$Dim[] = $file;
}else{
$Dim2[] = $file;
}
}
}
}
closedir( $di );
sort($Dim);
sort($Dim2);
$tf = 0;
list( $Prefijo ) = explode('_',$Dim[0]);
for( $n=0; $n<count($Dim); $n++ ){
list( $sPrefijo ) = explode('_',$Dim[$n]);
if( $sPrefijo<>$Prefijo ){
$tf = $n;
break;
}
}
echo '<center>';
echo '<span class=TITULO><b>SELECCION DEL GRAFICO DE CARGA</b></span>';
echo '<table class=GIFS border=0 cellspacing=1px cellpadding=10 border=0 onmouseover=opOver() onmouseout=opOut() onclick="opClick()">';
for( $n=0; $n<$tf; $n++ ){
list( ,$Color ) = explode('_',substr($Dim[$n],0,-4));
if( $Color=='fff' ){
echo '<col style="background:#ccc">';
}else{
echo '<col>';
}
}
echo '<tr>';
$i = 0;
for( $n=0; $n<count($Dim); $n++ ){
if( $i==$tf ){
echo '<tr>';
$i = 0;
}
$i++;
echo '<td';
if( $aFile==$Dim[$n] ) echo ' class=SET title="Loading actual"';
echo '><img src="edes.php?R:$a/g/loading/'.$Dim[$n].'">';
}
echo '<tr>';
$i = 0;
for( $n=0; $n<count($Dim2); $n++ ){
if( $i==$tf ){
echo '<tr>';
$i = 0;
}
$i++;
echo '<td';
if( $aFile==$Dim2[$n] ) echo ' class=SET title="Loading actual"';
echo '>';
if( substr($Dim2[$n],-4)=='.swf' ){
echo '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" _height="50">';
echo '<param name="movie" value="edes.php?R:$a/g/loading/'.$Dim2[$n].'">';
echo '<param name="quality" value="high">';
echo '<param name="WMode" value="transparent">';
echo '<embed type="application/x-shockwave-flash" src="edes.php?R:$a/g/loading/'.$Dim2[$n].'" quality="high"></embed>';
echo '</OBJECT>';
}else if( substr($Dim2[$n],-4)=='.gif' && substr($Dim2[$n],-4)!='.jpg' && substr($Dim2[$n],-4)!='.png' && substr($Dim2[$n],-5)!='.jpeg' ){
echo '<img src="edes.php?R:$a/g/loading/'.$Dim2[$n].'">';
}
}
if( $i==$tf ) echo '<tr>';
if( $aFile=='...Procesando...' ){
echo '<td class=SET title="Loading actual">...Procesando...';
}else{
echo '<td title="Loading actual">...Procesando...';
}
if( substr($aFile,-4)!='.swf' && substr($aFile,-4)!='.gif' && substr($aFile,-4)!='.jpg' && substr($aFile,-4)!='.png' && substr($aFile,-5)!='.jpeg' ){
if( $aFile=='...Procesando...' ){
echo '<td title="Loading actual">&nbsp;';
}else if( $aFile!='' ){
echo '<td class=SET title="Loading actual">&nbsp;'.$aFile;
}else{
echo '<td class=SET title="Loading actual">&nbsp;';
}
}else{
echo '<td>&nbsp;';
}
echo '</table>';
echo '</center>';
?>
<SCRIPT type="text/javascript">
if( document.body.scrollHeight > document.body.offsetHeight || document.body.scrollWidth > document.body.offsetWidth ) document.body.scroll = 'yes';
</SCRIPT>
</BODY></HTML>
