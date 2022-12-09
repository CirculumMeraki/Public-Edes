<?PHP
eInclude("xls");
$file = '/_tmp/pdf/'.$_SESSION["_User"].'_sublist';
$pnt = xlsCreate("..".$file);
$file .= ".xls";
$tipo = array();
$dim = explode("~", $_POST["DATOS"]);
for($f=0; $f<count($dim); $f++){
if( $f==2 ){
$tipo = explode("|", $dim[$f]);
continue;
}
$dato = explode("|", $dim[$f]);
if( count($dato)>1 ){
for($c=1; $c<count($dato); $c++){
if( $f==3 ){
xlsText($pnt, $f, $c-1, $dato[$c]);
}else{
switch( $tipo[$c] ){
case '+':
case '-':
case '+,':
case '-,':
xlsNumber($pnt, $f, $c-1, $dato[$c]);
break;
default:
xlsText($pnt, $f, $c-1, $dato[$c]);
}
}
}
}else{
$dato[0] = str_replace(chr(160), " ", $dato[0]);
xlsText($pnt, $f, 0, trim($dato[0]));
}
}
xlsClose($pnt);
eUpload($file, 'Doc·'.date('H·i·s').'.xls');
eEnd();
?>
