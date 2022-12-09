<?PHP //[_PROTECCION_]
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() ) exit;
if( $op=='G' ){
if( !$df = fopen( "../_tmp/php/{$_User}.png", 'wb') ) die('ERROR:1');
if( !fwrite( $df, file_get_contents('php://input') ) ) die('ERROR:2');
fclose($df);
die('Grabado');
}else if( $op=='g' ){
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ) $_GET['img'] = str_replace('\\','\\\\',$_GET['img']);
?>
<HTML><HEAD></HEAD><BODY>
<script type="text/javascript">
try{
var bs = new ActiveXObject('ADODB.Stream');
bs.Type = 1;
bs.Open();
bs.LoadFromFile("<?=$_GET['img']?>");
var img = bs.Read;
}catch(e){
alert('Error:BS');
for( i in e ) alert(i+': '+e[i]);
}
try{
var xh = new ActiveXObject('Microsoft.XMLHTTP');
xh.open('POST','edes.php?E:$pdf_gc.gs&op=G&img='+escape('<?= $_GET['ori']; ?>'),false);
xh.send(img);
window.frameElement.WOPENER.S(DGI("ExePDF")).eventClick();
}catch(e){
alert('Error:XH');
for( i in e ) alert(i+': '+e[i]);
}
bs = xh = null;
</script>
</BODY></HTML>
<?PHP
@unlink("../_tmp/{$_User}.png");
}
exit;
?>
