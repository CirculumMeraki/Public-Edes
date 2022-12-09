<?PHP
$appCode = "";
if( $_SESSION["_APPCODE"]!="" ) $appCode = "_".$_SESSION["_APPCODE"];
$file = '../_datos/usr/'.$_SESSION["_User"].$appCode.'.dft';
if( file_exists($file) && $_POST["DATOS"]=="LOAD" ){
$txt = str_replace(array("'",chr(10),chr(13)), array("#~39~#","#~10~#","#~13~#"), file_get_contents($file));
?>
<script type="text/javascript">
var comilla = String.fromCharCode(39),
nl = String.fromCharCode(10),
enter = String.fromCharCode(13),
dim = '<?=$txt?>'.split("~"),
t = dim.length, n, x;
for(n=0; n<t; n++) if(dim[n]!="" ){
x = top.S.split("=", dim[n]);
top._FIELDS[x[0]] = x[1].replace(/#~39~#/g,comilla).replace(/#~10~#/g,nl).replace(/#~13~#/g,enter);
}
</script>
<?PHP
}else if( isset($_POST["DATOS"]) ){
if( $_POST["DATOS"]=="~" || $_POST["DATOS"]=="" || $_POST["DATOS"]=="~="){
@unlink($file);
}else{
file_put_contents($file, $_POST["DATOS"]);
}
}
?>
