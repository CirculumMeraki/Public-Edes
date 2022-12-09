<?PHP
function _PregMatch($exp, $val){
return preg_match($exp, $val);
}
function _NomLabel($k){
global $_pField;
$txt = $k;
if( $_pField[$k][0]!="" ){
$txt = str_replace(array("'",'"'), array("&#39;","&#34;"), $_pField[$k][0]);
if( $txt[0]=="," ) $txt = trim(substr($txt,1));
if( $txt[0]=="+" ) $txt = trim(substr($txt,1));
if( $txt[0]>0 ) $txt = trim(substr($txt,1));
if( $txt[0]=="]" ) $txt = trim(substr($txt,1));
if( $txt[0]=="=" ) $txt = trim(substr($txt,1));
if( trim($txt)=="" ) $txt = $k;
}
return $txt;
}
if( count($_CHECKSESSION)>0 ){
for($n=0; $n<count($_CHECKSESSION); $n++){
$k = $_CHECKSESSION[$n];
if( $_SESSION[$k]!="" ){
if( (isset($_POST[$k]) && $_POST[$k]!=$k) || (isset($_GET[$k]) && $_POST[$k]!=$k) ){
$ConError = _NomLabel($k);
eMessage(eLng(172, $ConError), "HSE", 5);
}
}
}
}
foreach($_POST as $k=>$v){
eCheckValue($k);
}
function eCheckValue($k){
global $_pField, $_CHR, $_EACCENT;
if( $_POST["_PFIELD"]!="" ){
$_pField = unserialize(file_get_contents('../_tmp/php/'.$_SESSION["_User"]."_".$_POST["_PFIELD"].".pf"));
}
$xDesa = "";
$ConError = "";
$chequear = true;
if( $k[0]=="_" ) return;
$v = $_POST[$k]."";
if( $v=="" ){
if( $_pField[$k][8]=="#" ){
$ConError = _NomLabel($k);
eMessage(eLng(173, $ConError), "HSE", 5);
}
return;
}
$len = $_pField[$k][4];
if( substr_count($_pField[$k][2],",")>0 ){
list($iz,$dch) = explode(",", $len);
$len = $iz+$dch+1;
}
$len *= 1;
if( substr_count($len,",")>0 ){
list($iz,$dch) = explode(",", $len);
}
if( $_pField[$k][3]=="A" || $_pField[$k][3]=="H" ){
list($maxlen) = explode(",", $len);
if( $maxlen>0 && $maxlen<strlen($v) ) $ConError = $k;
}else if( $_pField[$k][3][0]=="S" && $iz>0 && $iz<strlen($v) ){
$ConError = $k;
}else if( preg_match('/^(\-|\=)$/', $_pField[$k][3]) ){
list($minValor,,$maxValor) = explode(",", $_pField[$k][4]);
$len = strlen($maxValor."");
}else if( $_pField[$k][3]=="P" ){
}else if( preg_match('/^(\-|\-\,|\+|\+\,)$/', $_pField[$k][2]) ){
}else if( $len<strlen($v) ){
$ConError = $k;
}else if( $_pField[$k][8]=="%" && ($len!=strlen($v) || $v=="") ){
$ConError = $k;
}
$errorHead = ($ConError!="")? eLng(174) : eLng(175);
if( $_pField[$k][3]=="P" ){
$ConError = "";
$chequear = false;
if( strlen($v)!=32 ){
$ConError = $k;
$errorHead = eLng(174);
}else if( !preg_match('/^[A-Fa-f0-9]{32}$/', $v) ){
$ConError = $k;
$errorHead = eLng(175);
}
}
if( $_pField[$k][2]=="H" ) $_pField[$k][2] .= $_pField[$k][4];
$lower = "áéíóúâêîôûàèìòùäëïöüãõ";
$upper = "ÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙÄËÏÖÜÃÕ";
$deli = preg_replace('([$0-9\s])', "", $_SESSION["_FormatCDITKNdb"]);
$cDate = $deli[0];
$cTime = substr($deli,-1);
if( $chequear ){
switch( $_pField[$k][2] ){
case '+':
case '0':
case '*':
if( ($v*1)<0 ){
$ConError = $k;
break;
}
case '-':
if( (string)(int)($v*1)!=$v ){
$ConError = $k;
break;
}
if( $ConError=="" ){
if( $v[0]=="-" ) $len++;
if( strlen($v)>$len || preg_match('/^(\-|\=)$/', $_pField[$k][3]) && $v>$maxValor ){
$errorHead = eLng(174);
$ConError = $k;
break;
}
}
break;
case '+,':
if( $v<0 ){
$ConError = $k;
break;
}
case '-,':
if( (string)(float)($v*1)!=$v ){
$ConError = $k;
break;
}
if( $ConError=="" ){
list($ve, $vd) = explode(".",$v);
if( $v[0]=="-" ) $iz++;
if( strlen($ve)>$iz || strlen($vd)>$dch ){
$ConError = $k;
break;
}
}
break;
case 'F4':
if( $v=="NULL" ) break;
if( !preg_match('/^([1-2]{1}[0-9]{3})'.$cDate.'([0-1]{1}[0-9]{1})'.$cDate.'([0-3]{1}[0-9]{1})$/', $v) ){
$ConError = $k;
}else{
list($a,$m,$d) = explode($cDate, $v);
if( !eDateOk($a, $m, $d) ) $ConError = $k;
}
break;
case 'P4':
if( !preg_match('/^([1-2]{1}[0-9]{3})'.$cDate.'([0-1]{1}[0-9]{1})$/', $v) ){
$ConError = $k;
}else{
list($a,$m) = explode($cDate, $v);
if( !eDateOk($a, $m, '01') ) $ConError = $k;
}
break;
case 'CDI':
if( $v=="NULL" ) break;
list($fecha, $hora) = explode(" ", $v);
list($a,$m,$d) = explode($cDate, $fecha);
if( !eDateOk($a, $m, $d) ){
$ConError = $k;
}else{
if( !preg_match('/^([0-2]{1}[0-9]{1})'.$cTime.'([0-5]{1}[0-9]{1})'.$cTime.'([0-5]{1}[0-9]{1})$/', $hora) ){
$ConError = $k;
}else{
list($h,$m,$s) = explode($cTime,$hora);
if( $h>23 || $m>59 || $s>59 || strlen($hora)!=8 ) $ConError = $k;
}
}
break;
case 'CP':
if( !preg_match('/^[0-9]{5}$/', $v) ) $ConError = $k;
break;
case 'T':
if( !preg_match('/^[0-9]{9}$/', $v) ) $ConError = $k;
break;
case 'DC':
if( !preg_match('/^[0-9]{2}$/', $v) ) $ConError = $k;
break;
case 'H8':
if( !preg_match('/^([0-2]{1}[0-9]{1})'.$cTime.'([0-5]{1}[0-9]{1})'.$cTime.'([0-5]{1}[0-9]{1})$/', $v) ){
$ConError = $k;
}else{
list($h,$m,$s) = explode(":",$v);
if( $h>23 || $m>59 || $s>59 || strlen($v)!=8 ) $ConError = $k;
}
break;
case 'H5':
if( !preg_match('/^([0-2]{1}[0-9]{1})'.$cTime.'([0-5]{1}[0-9]{1})$/', $v) ){
$ConError = $k;
}else{
list($h,$m) = explode(":",$v);
if( $h>23 || $m>59 || strlen($v)!=5 ) $ConError = $k;
}
break;
case 'H2':
if( !preg_match('/^[0-2]{1}[0-9]{1}$/', $v) ) $ConError = $k;
if( $v>23 || strlen($v)!=2 ) $ConError = $k;
break;
case 'N':
if( !_PregMatch('/^[A-ZÑÇÜºª'.(($_EACCENT[$k])? $upper:"").'"\' _\.\-]{1,}$/', $v) ) $ConError = $k;
break;
case 'n':
if( !_PregMatch('/^[a-zñçüºª'.(($_EACCENT[$k])? $lower:"").'"\' _\.\-]{1,}$/', $v) ) $ConError = $k;
break;
case '#N':
if( !_PregMatch('/^[A-ZÑÇÜa-zñçüºª'.(($_EACCENT[$k])? $upper.$lower:"").'"\' _\.\-]{1,}$/', $v) ) $ConError = $k;
break;
case 'D':
if( !_PregMatch('/^[A-ZÑÇÜ0-9ºª,()\\/'.(($_EACCENT[$k])? $upper:"").'"\' _\.\-]{1,}$/', $v) ) $ConError = $k;
break;
case 'd':
if( !_PregMatch('/^[a-zñçü0-9ºª,()\\/'.(($_EACCENT[$k])? $upper:"").'"\' _\.\-]{1,}$/', $v) ) $ConError = $k;
break;
case '#D':
if( !_PregMatch('/^[A-ZÑÇÜa-zñçü0-9ºª,()\\/'.(($_EACCENT[$k])? $upper:"").'"\' _\.\-]{1,}$/', $v) ) $ConError = $k;
break;
case 'X':
if( !_PregMatch('/^[A-ZÑÇÜ0-9ºª€:;+=&,()\[\]\\/'.(($_EACCENT[$k])? $upper:"").'"\' _\.\-]{1,}$/', $v) ) $ConError = $k;
break;
case 'x':
if( !_PregMatch('/^[a-zñçü0-9ºª€:;+=&,()\[\]\\/'.(($_EACCENT[$k])? $upper:"").'"\' _\.\-]{1,}$/', $v) ) $ConError = $k;
break;
case '#X':
if( !_PregMatch('/^[A-ZÑÇÜa-zñçü0-9ºª€:;+=&,()\[\]\\/'.(($_EACCENT[$k])? $upper:"").'"\' _\.\-]{1,}$/', $v) ) $ConError = $k;
break;
case '#U':
$v = str_replace(
["&amp;","&lt;","&gt;","&quot;"],
["&AMP;","&LT;","&GT;","&QUOT;"],
$v
);
if( $v!=eStrUpper($v) ) $ConError = $k;
break;
case '#L':
$v = str_replace(
["&AMP;","&LT;","&GT;","&QUOT;"],
["&amp;","&lt;","&gt;","&quot;"],
$v
);
if( $v!=eStrLower($v) ) $ConError = $k;
break;
case '#':
break;
case '@':
if( !_PregMatch('/^[a-zA-Z0-9\._\%\+\-@ñÑçÇ'.$lower.$upper.']{4,}$/', $v) ) $ConError = $k;
break;
case 'W':
if( !_PregMatch('/^[a-zA-Z0-9ñÑçÇ'.$lower.$upper.'\.\-_\/\|:\?=&]{4,}$/', $v) ) $ConError = $k;
break;
case 'CLR':
if( !preg_match('/^#{1}[0-9A-F]{'.($len-1).'}$/', $v) ) $ConError = $k;
break;
case 'clr':
if( !preg_match('/^#{1}[0-9a-f]{'.($len-1).'}$/', $v) ) $ConError = $k;
break;
case 'F':
case 'f':
if( !_PregMatch('/^[0-9a-zA-ZñÑüÜçÇ.\(\)\'\ \_\-\#\&\,;'.$lower.$upper.']{1,}$/', $v) ){
$ConError = $k;
}
break;
case 'DNI':
if( !preg_match('/^[XY]?[0-9]{7,8}$/', $v) ) $ConError = $k;
break;
case 'NIF':
if( !preg_match('/^[XY0-9TRWAGMYFPDXBNJZSQVHLCKE]?[0-9]{8}$/', $v) ) $ConError = $k;
break;
case 'nif':
if( !preg_match('/^[XY0-9TRWAGMYFPDXBNJZSQVHLCKE]{0,9}$/', $v) ) $ConError = $k;
break;
case 'CIF':
case 'cif':
if( !preg_match('/^[0-9A-Z]{0,9}$/', $v) ) $ConError = $k;
break;
break;
case "IP":
if( !preg_match('/^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/', $v) ) $ConError = $k;
break;
case "o":
$Plugin = $_pField[$k][19];
if( $Plugin!="" ){
if( $Plugin[0]=='$' ){
@include_once("../../edesweb/itm/{$Plugin}.plugin");
}else{
@include_once("../_datos/config/{$Plugin}.plugin");
}
$ConError = call_user_func($Plugin, $GLOBALS["_Mode"], $_pField[$k], $v);
}
break;
default:
if( !isset($_CHR[$_pField[$k][2]]) ){
$ConError = $k;
}else{
switch( $_CHR[$_pField[$k][2]][1] ){
case 'U':
break;
case 'L':
break;
case '':
if( $_CHR[$_pField[$k][2]][2]!="" ){
$txt = $_CHR[$_pField[$k][2]][2];
if( $txt[0]!="/" ) $txt = "/".$txt."/";
if( !preg_match($txt, $v) ) $ConError = $k;
}
break;
case 'NoCheck':
break;
default:
$ConError = $k;
}
}
}
}
if( $ConError!="" ){
$v = str_replace(array("'",'"'), array("&#39;","&#34;"), $v);
$ConError = _NomLabel($k);
if( isset($_GET['_ISUBLIST']) ){
eMessage($errorHead.'<hr>'.$k.' = '.$_pField[$k][2].'<br>'.$ConError.' = '.$v.$xDesa, "HSE", 10, 'top.S(_WOPENER._FilaLastInsert).nodeRemove();_WOPENER._RecalcColsOp();_WOPENER.Recalcula(1);');
}else{
eMessage($errorHead.'<hr>'.$k.' = '.$_pField[$k][2].'<br>'.$ConError.' = '.$v.$xDesa, "HSE", 10);
}
}
}
?>
