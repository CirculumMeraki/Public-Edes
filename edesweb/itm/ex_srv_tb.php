<?PHP
function eExportSrvTable_($sTABLA, $ZIP){
global $_User;
if( $GLOBALS['_Development']==false ) return;
$pnt = '';
list($db, $tab) = explode(".", $sTABLA);
if( $tab=="" ){
$file = $db;
}else{
$file = $tab;
}
qQuery("select * from {$sTABLA}", $pnt);
if( $ZIP ){
$fd = gzopen("../tree/{$file}.unl", "w9");
}else{
$fd = fopen("../tree/{$file}.unl", 'w');
}
$TReg = 0;
$Pipa = false;
while( $linea=qRow($pnt) ){
$txt = '';
if( $Pipa ) $txt .= "\n";
$Pipa = false;
foreach($linea as $valor){
if( $Pipa ){
$txt .= '|';
}else{
$Pipa = true;
}
$valor = str_replace(chr(10),'{&#10;}',$valor);
$valor = str_replace(chr(13),'{&#13;}',$valor);
$valor = str_replace('"','{&#34;}',$valor);
$valor = str_replace('|','{&#124;}',$valor);
$txt .= trim((string)$valor);
}
if( $ZIP ){
gzwrite($fd, $txt);
}else{
fputs($fd, $txt);
}
$TReg++;
}
if( $ZIP ){
gzclose($fd);
}else{
fclose($fd);
}
if( $TReg==0 ){
@unlink("../tree/{$file}.unl");
}else{
qQuery("insert into {$_SESSION['ShareDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '".date('Y-m-d H:i:s')."', '/tree/{$file}.unl', 'C', '{$_SESSION['_UserEMail']}')");
}
}
?>
