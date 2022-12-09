<?PHP
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
if( $_SERVER['REQUEST_METHOD']=='GET' ){
$File = stripcslashes($_GET['DELETE']);
$File = str_replace( '\\', '/', $File );
$tmp = explode( '/', $File );
$File = '../_datos/usr/'.$tmp[count($tmp)-1];
eTrace( 'Delete: '.$File );
@unlink( $File );
eEnd();
}
if( strlen($_POST['UTF'])==2 ){
$txt = utf8_decode(stripcslashes($_POST['HTML']));
$Tabla = utf8_decode(stripcslashes($_POST['TABLA']));
$Action = utf8_decode(stripcslashes($_POST['ACTION']));
$Sufijo = utf8_decode(stripcslashes($_POST['SUFIJO']));
$DelDir = utf8_decode(stripcslashes($_POST['DELDIR']));
}else{
$txt = stripcslashes($_POST['HTML']);
$Tabla = stripcslashes($_POST['TABLA']);
$Action = '';
$Sufijo = stripcslashes($_POST['SUFIJO']);
$DelDir = stripcslashes($_POST['DELDIR']);
}
$Tabla = str_replace( $DelDir, '', $Tabla );
if( $Action!='' ){
$n = strrpos($txt,'</BODY></HTML>');
$txt = substr($txt,0,$n).'<script type="text/javascript">var _Action="'.$Action.'"</SCRIPT></BODY></HTML>';
}
file_put_contents( '../_datos/usr/'.$_User.$Sufijo.'.lf', $Tabla );
if( $txt!='' ){
$txt = str_replace('{&#92#&}','\\',$txt);
if( $_POST['SubListENVIAR']!='' ){
$p = strripos( $txt, '</BODY>' );
if( $p===false ){
}else{
$txt = substr($txt,0,$p).'<script type="text/javascript">'.$_POST['SubListENVIAR'].'</script>'.substr($txt,$p);
}
}
file_put_contents( '../_datos/usr/'.$_POST['ID'].'.htm', $txt );
}
eTrace('Ok');
?>
<SCRIPT type="text/javascript">
setTimeout('top.eInfoHide();',500);
</SCRIPT>
<?PHP
eEnd();
?>
