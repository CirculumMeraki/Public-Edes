<?PHP
echo 'var _Lng="'._LngLoad2(',81,es', '../../edesweb/lng/desktop.js').'".split("|");';
?>
<?PHP
function _LngLoad2($tipo, $File){
list(, $LngUser, $_Language) = explode(',',$tipo);
$tmp = file($File.'.lng');
list(,$Lngs) = explode(']', $tmp[0]);
list($Lngs) = explode('|', $Lngs);
$tmp4 = explode(',', str_replace(' ','',$Lngs));
for( $i=0; $i<count($tmp4); $i++ ){
$tmp4[$i] = trim($tmp4[$i]);
if( $tmp4[$i]==$LngUser ){
$uCol = $i+1;
}
if( $tmp4[$i]==$_Language ){
$dCol = $i+1;
}
}
$Dim = array();
$mk = 0;
for($n=1; $n<count($tmp); $n++){
list( $tmp[$n] ) = explode('~', $tmp[$n]);
$tmp[$n] = trim($tmp[$n]);
$tmp2 = explode('|', $tmp[$n]);
$k = $tmp2[0];
$txt = trim($tmp2[$uCol]);
if( $txt=='' ) $txt = trim($tmp2[$dCol]);
$v = str_replace('"', '&quot;', trim($txt));
$k = $k*1;
$mk = max($mk, $k);
$Dim[$k] = $v;
}
$txt = '';
for($n=0; $n<$mk+1; $n++){
if( $Dim[$n]=="" ) $txt .= '|';
else $txt .= eAsciiToCode($Dim[$n]).'|';
}
return $txt;
}
?>
