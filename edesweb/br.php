<?PHP
if( isset($_POST["_SOURCE_"]) && $_POST["_SOURCE_"]=='<check>' ){
?>
<script type="text/javascript">
var o = window.frameElement.WOPENER.DGI('JSCheckSubmit');
o['text'] = 'function eJSCheckSubmit(){'+
"alert('Prueba:3');"+
"return false;"+
"}";
</script>
<?PHP
eEnd();
}
$DirFile = eScript($_POST["_SOURCE_"].'.br');
$File = file($DirFile);
$HayReg = false;
$Clave='';
for( $n=0; $n<count($File); $n++ ){
$File[$n] = trim($File[$n]);
if( $File[$n]=='' ) continue;
if( $File[$n][0]=='[' ){
list( $Clave ) = explode(']',$File[$n]);
$Clave = trim(ucfirst(substr($Clave,1)));
if( $Clave=='' ) die('Error:1');
${$Clave} = '['.$Clave."]\n";
continue;
}
${$Clave} .= $File[$n]."\n";
}
if( isset($_POST["_ROULES_"]) ) $Submit = "[Submit]\n".$_POST["_ROULES_"];
if( isset($_POST["_FIELDS_"]) ) $Fields = "[Fields]\n".$_POST["_FIELDS_"];
$txt =	$Submit."\n".
$Fields;
file_put_contents( $DirFile, $txt );
die('Grabado');
define('T_NEW_LINE', -1);
function token_get_all_nl($source){
$new_tokens = array();
$tokens = token_get_all($source);
foreach ($tokens as $token){
$token_name = is_array($token) ? $token[0] : null;
$token_data = is_array($token) ? $token[1] : $token;
if ($token_name == T_CONSTANT_ENCAPSED_STRING || substr($token_data, 0, 2) == '
?>
