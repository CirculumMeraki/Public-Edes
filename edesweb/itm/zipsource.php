<?PHP
function _zipSource($file, $ElPuntoEsRem=false){
$buffer = file_get_contents($file);
$EnFields = false;
$Dim = explode(chr(10), $buffer);
$txt = '';
for($n=0; $n<count($Dim); $n++){
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n][0]=='.' && $ElPuntoEsRem ){
}else if( $Dim[$n][0]=='/' && $Dim[$n][1]=='/' ){
}else if( $Dim[$n][0]=='/' && $Dim[$n][1]=='*' ){
for($i=$n+1; $i<count($Dim);$i++){
$Dim[$i] = trim($Dim[$i]);
if( $Dim[$i][0]=='*' && $Dim[$i][1]=='/' ){
$n=$i;
break;
}
}
}else if( $Dim[$n]=='' ){
}else if( substr_count($Dim[$n], '<<<eof')>0 ){
$txt .= $Dim[$n].chr(13).chr(10);
for($i=$n+1; $i<count($Dim); $i++){
$txt .= $Dim[$i];
if( substr($Dim[$i],0,4)=='eof;' ) break;
}
$n = $i;
}else if( $Dim[$n][0]=='[' ){
$EnFields = false;
$i = strpos($Dim[$n],']');
$Etiqueta = strtoupper(substr($Dim[$n], 1, $i-1));
$ElPuntoEsRem = ($Etiqueta<>'CSSADD');
$Iz = substr($Dim[$n],0,$i+1);
$De = substr($Dim[$n],$i+1);
$tmp = explode('|',$De);
$nDe = '';
for($i=0; $i<count($tmp); $i++){
if( $i>0 ) $nDe .= '|';
$nDe .= trim($tmp[$i]);
}
$Dim[$n] = $Iz.$nDe;
if( $Etiqueta=='NOTE' ){
break;
}else if( $Etiqueta=='EXIT' ){
$txt .= $Dim[$n];
break;
}else if( substr_count(',LOADSEL,LOADINI,DEBUG,GPFIELDS,LOCKFILE,SAVEFORM,TEMPLATE,', ",{$Etiqueta},")==1 ){
}else{
$txt .= $Dim[$n].chr(13).chr(10);
if( $Etiqueta == 'FIELDS' ) $EnFields = true;
}
}else{
if( $EnFields ){
$tmp = explode('|',$Dim[$n]);
$nDe = '';
for( $i=0; $i<count($tmp); $i++ ){
if( $i>0 ) $nDe .= '|';
$nDe .= trim($tmp[$i]);
}
$Dim[$n] = $nDe;
}
if( substr_count($Dim[$n],'/'.'/')>0 ){
list($Dim[$n]) = explode('/'.'/', $Dim[$n]);
}
if( substr_count($Dim[$n],'/'.'*')>0 && substr_count($Dim[$n],'*'.'/')>0 ){
$ini = strpos($Dim[$n],'/'.'*')+1;
$fin = strpos($Dim[$n],'*'.'/',$ini);
$Dim[$n] = substr($Dim[$n], $ini, $fin-$ini);
}
$txt .= $Dim[$n].chr(13).chr(10);
}
}
return $txt;
}
?>
