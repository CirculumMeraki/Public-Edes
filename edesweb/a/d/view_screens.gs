<!DOCTYPE HTML>
<HTML><HEAD>
<TITLE>VISOR ESCRITORIO REMOTO</TITLE>
<META HTTP-EQUIV='imagetoolbar' CONTENT='no'>
<?PHP
$Dim = array();
$Buscar = "^".$_GET['USER'].'_';
$DirBase = '../_tmp/log/';
$di = opendir( $DirBase );
while( $file = readdir( $di ) ){
if( preg_match("/".$Buscar."/i", $file) && preg_match('/\.png*/i', $file ) ){
if( $_GET['DELLOG']=='S' ){
@unlink( $DirBase.$file );
}else{
$Dim[] = $file;
}
}
}
closedir( $di );
sort($Dim);
if( isset($_GET['CHECK']) ){
echo '<script type="text/javascript">';
if( $_GET['LONG'] == count($Dim) ){
}else{
$NewDim = array();
for( $n=$_GET['LONG']; $n<count($Dim); $n++ ) $NewDim[] = $Dim[$n];
}
echo "window.frameElement.WOPENER.Refrescar('".implode( ",", $NewDim )."');";
echo '</script></body></html>';
exit;
}
if( !function_exists('qQuery') ) include_once( $GLOBALS['Dir_'].$_Sql.'.inc' );
qQuery( "select user_name,user_surname from gs_user where cd_gs_user={$_GET['USER']}" );
$row = qRow();
$NmUser = str_replace('  ',' ',trim($row[0]).' '.trim($row[1]));
$xDim = "'".implode("','", $Dim )."'";
if( $xDim=="''" ) $xDim = '';
?>
<SCRIPT type="text/javascript">
var _Source = '$a/d/view_screen.gs';
<?PHP
?>
var Dim = new Array( <?= $xDim ?> );
var Posicion = 0;
var _SG = 2000;
var NmUser = "<?= $NmUser ?>";
function RemoteViewer(){
top._RemoteViewer = undefined;
}
top._RemoteViewer = window;
top.eSWOnClose( window, RemoteViewer ) ;
function Status(){
var txt = ( Dim.length==0 ) ? '0/0' : (Posicion+1)+'/'+Dim.length;
top.eSWSetCaption( window, 'VISOR ESCRITORIO REMOTO - Pantalla: '+txt+' ( '+NmUser+' )' );
}
function ClearKey(){
S.eventClear(window);
return false;
}
function Pulsacion(){
var Ok = false;
if( S.eventCode(event)>=49 && S.eventCode(event)<=57 ){
var n = S.eventCode(event)-49;
if( n < Dim.length ){
Ok = true;
Posicion = n;
}
}else{
switch( S.eventCode(event) ){
case 36:
Posicion = 0;
Ok = true;
break;
case 35:
Posicion = Dim.length-1;
Ok = true;
break;
case 40:
case 37:
case 34:
if( Posicion > 0 ) Posicion--;
else Posicion = Dim.length-1;
Ok = true;
break;
case 38:
case 39:
case 32:
case 33:
case 9:
if( Posicion < Dim.length-1 ) Posicion++;
else Posicion = 0;
Ok = true;
break;
case 27:
top.eSWTools( window, 'M' );
return;
case 187:
DGI("IMAGEN").style.width = '100%';
DGI("IMAGEN").style.height = '100%';
break;
case 189:
DGI("IMAGEN").style.width = '';
DGI("IMAGEN").style.height = '';
break;
}
}
if( Ok ){
DGI("IMAGEN").src = "edes.php?R:/_tmp/log/" +Dim[Posicion];
Status();
}
setTimeout('document.body.focus();',100);
}
function CheckImg(){
if( document.body.offsetWidth==0 ){
setTimeout('try{CheckImg();}catch(e){}',_SG);
return;
}
top.eCallSrv( window, 'edes.php?E:$a/d/view_screens.gs&USER=<?=$_GET['USER']?>&CHECK=1&LONG='+Dim.length );
}
function Refrescar( txt ){
if( txt!='' ){
var uTRec = Dim.length;
var tmp = txt.split(','), n;
for( n=0; n<tmp.length; n++ ) Dim[Dim.length] = tmp[n];
if( uTRec==0 ) DGI("IMAGEN").src = "edes.php?R:/_tmp/log/" +Dim[0];
Status();
}
setTimeout('try{CheckImg();}catch(e){}',_SG);
}
top.eSWResize(window);
Status();
Refrescar('');
</SCRIPT>
<body onkeydown='Pulsacion()' onload='top.eSWLoading(window,0);document.body.focus();' style='margin:0px' onhelp='return false' oncontextmenu='return false'>
<img id=IMAGEN src="<?= (($xDim!='') ? "edes.php?R:/_tmp/log/{$Dim[0]}" : "g/sys_nada.gif") ?>" style='width:100%;height:100%;'>
</body>
</html>
