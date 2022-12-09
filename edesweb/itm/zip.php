<?PHP
if( !function_exists("eZipFile") ){
function eZipFile($FileZip, $Files){
return _eZipFile($FileZip, $Files);
}
function eZipDirectory($Dir, $FileZip, $Ext=NULL, $NoExt=NULL){
return _eZipDirectory($Dir, $FileZip, $Ext, $NoExt);
}
function eZipDir($file){
return _eZipDir($file);
}
function eUnZip($FileZip, $Directorio, $Files){
return _eUnZip($FileZip, $Directorio, $Files);
}
}
function _eZipFile($FileZip, $Files){
if( gettype($Files)=="string" ){
$Files = array($Files);
$numArgs = func_num_args();
$dimArgs = func_get_args();
for($i=2; $i<$numArgs; $i++){
$Files[] = $dimArgs[$i];
}
}
@unlink($FileZip);
$zip = new ZipArchive();
if( $zip->open($FileZip, ZipArchive::CREATE)===true ){
for($n=0; $n<count($Files); $n++){
$file = str_replace(chr(92), "/", $Files[$n]);
$file = explode("/", $file);
$zip->addFile($Files[$n], $file[count($file)-1]);
}
$zip->close();
}else{
$res = $zip->getStatusString();
zipstatus($zip->getStatusString());
}
return true;
}
function _eZipDirectory($Directorio, $FileZip, $Ext=NULL, $NoExt=NULL, $_Nivel=0, $zip=NULL){
$Rastro = false;
if( $_Nivel==0 ){
if( $Rastro ) echo "[CREA ZIP] ".$Directorio;
if( $Ext==null ) $Ext = "*";
if( $NoExt==null ) $NoExt = array();
@unlink($FileZip);
$zip = new ZipArchive();
$zip->open($FileZip, ZipArchive::CREATE);
}
$_Nivel++;
if( $Rastro ) echo "<BR>[DIRECTORIO] {$Directorio}";
if( !is_readable($Directorio) ) die("<br>Error al abrir el directorio '{$Directorio}'");
$zip->addEmptyDir($Directorio);				 // Añadimos un directorio
$di = opendir($Directorio);
while( $file=readdir($di) ){
if( $file=='.' || $file=='..' ) continue;
if( strtoupper($file)=='THUMBS.DB' ){
continue;
}else if( substr($file,0,3)=='zct' && substr($file,-4)=='.tmp' && strlen($file)==9 ){
continue;
}else if( substr($file,-4)=='.___' || substr($file,-5)=='.old2' ){
continue;
}else if( substr_count($file," - copia.")==1 ){
continue;
}
if( is_dir($Directorio.'/'.$file) ){
if( $Rastro ) echo "<br>>>> {$Directorio}/{$file}";
_eZipDirectory("$Directorio/$file", null, $Ext, $NoExt, $_Nivel, $zip);
}else{
$Extension = substr($file, strrpos($file,'.')+1);
if( $Ext=="*" || in_array($Extension, $Ext) ){
if( $Rastro ) echo "<br>{$_Nivel} > {$Directorio}/{$file}";
$zip->addFile("$Directorio/$file");
}
}
}
closedir($di);
if( $Rastro ) echo '<BR>';
$_Nivel--;
if( $_Nivel==0 ){
if( $Rastro ) echo "<BR>[CERRAR ZIP] {$Directorio}";
$zip->close();
}
return true;
}
function _eZipDir($file){
$dim = array();
$zip = new ZipArchive;
if( $zip->open($file)==true ){
for($i=0; $i<$zip->numFiles; $i++){
$dim[] = $zip->getNameIndex($i);
}
}
return $dim;
}
function _eUnZip($fileZip, $Directorio, $Files=""){
if( gettype($Files)=="string" ){
$Files = array($Files);
}
$n = 0;
$zip = new ZipArchive;
$zip->open($fileZip);
if( $Files[0]=="" ){
$zip->extractTo($Directorio);
$n = $zip->numFiles;
}else{
for($i=0; $i<$zip->numFiles; $i++){
$nom = $zip->getNameIndex($i);
if( in_array($nom, $Files) ){
$zip->extractTo($Directorio, $nom);
$n++;
}
}
}
$zip->close();
return $n;
}
?>
