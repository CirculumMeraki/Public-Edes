<?PHP
if( $GLOBALS['_gsID'] != getmypid() ) exit;
if( !function_exists('_TamayoFicheros') ){
function _TamayoFicheros( $DirBase, &$TByts=0 ){
$di = opendir( $DirBase );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( is_dir( "{$DirBase}/{$file}" ) ){
_TamayoFicheros( "{$DirBase}/{$file}", $TByts );
}else{
$TByts += filesize( $DirBase.'/'.$file );
}
}
}
closedir( $di );
return $TByts;
}
}
if( !function_exists('dirSize') ){
function dirSize( $directory ){
$size = 0;
foreach( new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory)) as $file ){
$size += $file->getSize();
}
return $size;
}
}
global $_CNT_DISK_FREE_SPACE, $_CNT_DISK_TOTAL_SPACE;
$UnGiga = 1073741824;
$CNTCheck = false;
if( $CNTCheck ) eInit();
if( $_CNT_DISK_TOTAL_SPACE > 0 ){
$sf = $_CNT_DISK_FREE_SPACE;
$st = $_CNT_DISK_TOTAL_SPACE;
}else if( $_CNTDISKSPACE > 0 ){
if( $CNTCheck ){
eTrace( 'Sistema Manual');
eTrace( 'pth: '.eGetCWD() );
eTrace("_CNTDIR: ".$_CNTDIR. ' - '.gettype($_CNTDIR));
}
if( gettype($_CNTDIR)=="string" ){
$checkDir = array($_CNTDIR);
}else{
$checkDir = $_CNTDIR;
}
$TotalByts = 0;
for( $i=0; $i<count($checkDir); $i++ ){
$dir = eScript($checkDir[$i]);
if( $CNTCheck ){
eTrace("oPath: ".$checkDir[$i]);
eTrace("nPath: ".$dir);
}
$UltimaLinea = "";
if( strtoupper(substr(PHP_OS,0,3))=='LIN' || strtoupper(substr(PHP_OS,0,3))=='UNI' ){
$comando = 'du -h -c -L '.$dir;
exec($comando, $dim, $Error);
}else{
$comando = '..\\..\\edesweb\\win\\du.exe -v '.$dir;
exec($comando, $dim, $error);
}
if( $CNTCheck ) eTrace("count: ".count($dim));
for($n=count($dim)-1; $n>=0; $n--){
$dim[$n] = trim($dim[$n]);
if( $CNTCheck ) eTrace( $n.': '.$dim[$n]);
if( $dim[$n]<>"" ){
$UltimaLinea = $dim[$n];
break;
}
}
$UltimaLinea = trim(str_replace("Size on disk:", "", $UltimaLinea));
if( $CNTCheck ){
eTrace( gettype($UltimaLinea) );
eTrace( 'comando: '.$comando );
eTrace( 'uLinea: '.$UltimaLinea. ' - '.strlen($UltimaLinea) );
}
$KValor = '';
$Tipo = '';
for( $n=0; $n<strlen($UltimaLinea); $n++ ){
if( is_numeric(substr($UltimaLinea,$n,1)) || substr($UltimaLinea,$n,1)=='.' ){
$KValor .= substr($UltimaLinea,$n,1);
}else{
$Tipo = strtoupper(substr($UltimaLinea,$n,1));
break;
}
}
if( strtoupper(substr(PHP_OS,0,3))=='LIN' || strtoupper(substr(PHP_OS,0,3))=='UNI' ){
}else{
$KValor = trim(str_replace(".", "", $KValor));
eExplodeLast($UltimaLinea, " ", $no, $Tipo);
$Tipo = strtoupper($Tipo);
}
if( $CNTCheck ){
eTrace( 'Tipo: '.$Tipo );
eTrace( 'KValor: '.$KValor );
}
if( $Error ){
$TByts = _TamayoFicheros( $dir );
}else{
$TByts = $KValor*1;
switch( $Tipo ){
case 'K':
$TByts *= 1024;
break;
case 'M':
$TByts *= 1024*1024;
break;
case 'G':
$TByts *= 1024*1024*1024;
break;
case 'BYTES':
break;
default:
}
}
$TotalByts += $TByts;
if( $CNTCheck ) eTrace( $TByts.' ocupación del directorio [TByts]');
}
$sf = $_CNTDISKSPACE*$UnGiga - $TotalByts;
$st = $_CNTDISKSPACE*$UnGiga;
if( $CNTCheck ){
eTrace( '_CNTDISKSPACE: '.$_CNTDISKSPACE);eTrace( 'Tipo: '.$Tipo);
eTrace( $TotalByts. ' Total ocupado [TotalByts]');
}
$_CNT_DISK_FREE_SPACE = $sf;
$_CNT_DISK_TOTAL_SPACE = $st;
}else{
if( $CNTCheck ) eTrace( 'Sistema Auto');
if( gettype($_CNTDIR)=="string" ){
$checkDir = array($_CNTDIR);
}else{
$checkDir = $_CNTDIR;
}
$dir = $checkDir[0];
if( strtoupper(substr(PHP_OS,0,3))=='LIN' || strtoupper(substr(PHP_OS,0,3))=='UNI' ){
$sf = disk_free_space($dir);
$st = disk_total_space($dir);
}else{
$sf = disk_free_space("/");
$st = disk_total_space("/");
}
$_CNT_DISK_FREE_SPACE = $sf;
$_CNT_DISK_TOTAL_SPACE = $st;
}
if( $CNTCheck ){
eTrace( $st. ' Total permitido [st]' );
eTrace( $sf. ' Spacio libre [sf]' );
}
if( $Opcion=='mR' && $Valor!='' ){
$tmp = explode('.',$Valor);
if( $_UPLOADFILE[$Form[1]]['NOMBRE'][0]=='=' ){
$sNomFile = $_UPLOADFILE[$Form[1]][oDIR].'/'._NmFileConPrefijo( trim(substr($_UPLOADFILE[$Form[1]]['NOMBRE'],1)), $_UPLOADFILE[$Form[1]]['PREFIJO'] );
}else{
$sNomFile = $Fila[$_UPLOADFILE[$Form[1]]['NOMBRE']];
if( $_UPLOADFILE[$Form[1]]['NOMBRE'] != $Form[1] ) $sNomFile .= '.'.$tmp[count($tmp)-1];
$sNomFile = $_UPLOADFILE[$Form[1]][oDIR].'/'._NmFileConPrefijo( $sNomFile, $_UPLOADFILE[$Form[1]]['PREFIJO'] );
}
$sNomFile = eScript($sNomFile);
if( file_exists($sNomFile) ) $sf += filesize( $sNomFile );
}
if( $sf < $_UPLOADFILE[$Form[1]]['BYTS'] ){
if( $CNTCheck ){
eTrace($sf);
exit;
}
$_UPLOADFILE[$Form[1]]['BYTS'] = $sf;
if( $sf < 1024 ) eMessage($__Lng[141],'HSE');
}
if( $CNTCheck ) exit;
unset($CNTCheck);
$sp = ($sf*100)/$st;
$InfoSpace = file_get_contents('../../edesweb/itm/diskspace.html');
$InfoSpace = str_replace(' title="">#ST Byts', ' title="'.eNumberFormat($st/$UnGiga, 2).' GByts">#ST Byts', $InfoSpace);
$InfoSpace = str_replace(' title="">#SF Byts', ' title="'.eNumberFormat($sf/$UnGiga, 2).' GByts">#SF Byts', $InfoSpace);
$InfoSpace = str_replace('#%' ,eNumberFormat($sp, 2),$InfoSpace);
$InfoSpace = str_replace('#ST',eNumberFormat($st, 0),$InfoSpace);
$InfoSpace = str_replace('#SF',eNumberFormat($sf, 0),$InfoSpace);
$InfoSpace = str_replace('@135@',$__Lng[135],$InfoSpace);
$InfoSpace = str_replace('@136@',$__Lng[136],$InfoSpace);
$InfoSpace = str_replace('@137@',$__Lng[137],$InfoSpace);
$InfoSpaceImg .= '<span id="_TIP_I_'.$Form[1].'" style="display:none" eType="DiscSpace">'.$InfoSpace.'</span>';
$InfoSpaceImgHelp = '<i class="ICONINPUT" eTitle="'.$__Lng[135].'" onmouseenter=\'S.tip();S(this).tip(S("#_TIP_I_'.$Form[1].'").obj.innerHTML)\' onmouseout="S.tip()">&#162;</i>';
?>
