<?PHP //[_PROTECCION_]
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() || basename(__FILE__)!='vsh.gs' ) exit;
$_gsACCESO = $_SESSION["_gsACCESO"];
$_gsDirAccess = $_SESSION["_gsDirAccess"];
$newOrdenes = array();
$totalNewOrdenes = 0;
$dim = explode(";", $_POST["Comando"]);
for($n=count($dim)-1; $n>=0; $n--){
if( trim($dim[$n])<>"" ){
$newOrdenes[$totalNewOrdenes++] = trim($dim[$n]);
}
}
$DimOrdenes = file("../_d_/usr/cmd.".$_SESSION["_User"]);
for($n=0; $n<count($DimOrdenes); $n++){
if( trim($DimOrdenes[$n])<>"" ){
$newOrdenes[$totalNewOrdenes++] = trim($DimOrdenes[$n]);
if( $totalNewOrdenes>=5 ) break;
}
}
file_put_contents("../_d_/usr/cmd.".$_SESSION["_User"], implode("\n",$newOrdenes));
if( $_gsACCESO['ACCESO']<1 ) die('Error:106');
if( $_gsACCESO['Shell']<1 ) die('Error:107');
$_DirEDes = $_PathHTTP;
$tmp = explode('/',$_PathHTTP);
$_DirApli = ''; for( $n=0; $n<count($tmp)-2; $n++ ) $_DirApli .= $tmp[$n].'/';
$_DirEDes = ''; for( $n=0; $n<count($tmp)-3; $n++ ) $_DirEDes .= $tmp[$n].'/';
$_DirBase = $_DirEDes;
$_DirApliFile = substr($_DirApli,0,-1).'.file/';
include_once('../_datos/config/desktop.ini');
include_once('../_d_/cfg/edes.ini');
$adminEmail = "faranda@gesoft.es";
$fromEmail  = $_SERVER['SERVER_ADMIN'];
$_MaxSize   = 250*1024;
$dirLimit = '';
$sDOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
$tmp = explode('/', $_PathHTTP);
$DirAplicacion = '';
for($n=1; $n<count($tmp)-1; $n++) if( trim($tmp[$n])!='' ) $DirAplicacion .= '/'.$tmp[$n];
$DirAplicacionBase = substr($DirAplicacion,0,strrpos($DirAplicacion,'/'));
$DirAplicacionFile = $DirAplicacionBase.'.file';
$DirAplicacionDatos = $DirAplicacionBase.'.datos';
$DirMotor = '';
for($n=1; $n<count($tmp)-2; $n++) if( trim($tmp[$n])!='' ) $DirMotor .= '/'.$tmp[$n];
$DirMotor .= '/edesweb/';
$DirMotor = $Dir_.'edesweb/';
$_DirEDes = $Dir_;
$DirMotor = $_DirEDes;
$DirLIB = str_replace('/edesweb/','/lib/',$_DirEDes);
$_EsWindow = (strtoupper(substr(PHP_OS,0,3))=='WIN');
$shellOutput = "";
if( $_GET["MEMDIR"]<>"" ){
$file = "../_d_/usr/path.".$_SESSION["_User"];
$dim = file($file);
if( $_GET["MEMDIR"][0]<>"-" ) $dim[] = $_GET["MEMDIR"];
$dimScript = array();
for($n=0; $n<count($dim); $n++){
$dimScript[trim($dim[$n])] = 1;
}
$dimScript[substr($_GET["MEMDIR"],1)] = 0;
$dim = array();
foreach($dimScript as $k=>$v){
$k = trim($k);
if( $k<>"" && $v==1 ) $dim[] = $k;
}
sort($dim);
file_put_contents($file, implode("\n",$dim));
$path = trim(implode(",",$dim));
?>
<script>
var menu = [["-Path"]],
txt2 = "<?=$path?>",
txt = txt2.split(","),
dim = top.frames, n;
if( txt2!="" ){
for(n=0; n<txt.length; n++){
menu.push([txt[n],"",""]);
}
}
for(n=0; n<dim.length; n++){
if( dim[n].document.title=="gsShell" ){
dim[n]._DirMem = menu;
if( txt2!="" ){
top.S("#_DIRMEM",dim[n]).class("-OFF");
}else{
top.S("#_DIRMEM",dim[n]).class("+OFF");
}
}
}
top.S.info("<?=(($_GET["MEMDIR"][0]<>"-")?"Directorio Memorizado":"Directorio Borrado")?>",2);
</script>
<?PHP
eEnd();
}else{
$dim = file("../_d_/usr/path.".$_SESSION["_User"]);
for($n=0; $n<count($dim); $n++){
$dim[$n] = trim($dim[$n]);
}
$_DimPATH = implode(",",$dim);
}
if( $_gsACCESO['Shell']==2 ){
for( $n=1; $n<count($tmp)-1; $n++ ) $dirLimit .= '/'.$tmp[$n];
$_DirOK = array('http', 'd', '_tmp', 'lib');
}else if( $_gsACCESO['Shell']>=3 && $_gsACCESO['Shell'] <= 5 ){
for( $n=1; $n<count($tmp)-2; $n++ ) $dirLimit .= '/'.$tmp[$n];
}else if( $_gsACCESO['Shell']>=6 ){
$dirLimit = '';
}else{
$dirLimit = str_replace('\\','/',$sDOCUMENT_ROOT);
}
if( $_EsWindow ) $dirLimit = $tmp[0].$dirLimit;
if( !$whoami ) $whoami = exec('whoami');
if( $_EsWindow ) $whoami = '';
if( $Comando && get_magic_quotes_gpc() ) $Comando = stripslashes($Comando);
$ComandosOcultos = 0;
if( strtoupper(substr(PHP_OS,0,3))=='LIN' || strtoupper(substr(PHP_OS,0,3))=='UNI' ){
$_Comandos = array('cat','cd','date','find','finderr','grep','hex','ls' ,'man','more','pwd','recursive', 'wc', 'unserialize', 'update', 'field', 'diff');
}else if( $_EsWindow ){
$_Comandos = array('cat','cd','date','find','finderr','grep','hex','dir','man','more','pwd','recursive', 'wc', 'unserialize', 'update', 'field', 'diff');
}else{
eEnd();
}
$ConEditores = false;
for($n=0; $n<count($_ExternalApps); $n++){
$_ExternalApps[$n][2] = strtoupper($_ExternalApps[$n][2]);
if( $_ExternalApps[$n][2]=='S' || $_ExternalApps[$n][2]=='P' ){
$ConEditores = true;
}
}
if( $ConEditores>0 ){
if( $_gsACCESO['Shell']>=3 ) $_Comandos = array_merge($_Comandos, array('edit','wedit','h','download'));
$ComandosOcultos = 2;
}else{
if( $_gsACCESO['Shell']>=3 ) $_Comandos = array_merge($_Comandos, array('edit','h','download'));
$ComandosOcultos = 1;
}
if( $_gsACCESO['Shell']>=5 ){
$_Comandos = array_merge($_Comandos, array('chgrp','chmod','chown','cp','df','du','mkdir','mv','rm','rmdir','top', 'copy', 'unzip', 'gzip'));
if( $_DesktopType<2 ){
}
$_Comandos = array_merge($_Comandos, array('arbol','tree'));
}
if( TieneFTP() ){
if( $_gsACCESO['FTP']>=3 ){
$_Comandos = array_merge($_Comandos, array('ftpget', 'ftpput', 'ftpls', 'ftpcat', 'ftprm', 'ftprename', 'ftpmkdir', 'ftprmdir'));
}else if( $_gsACCESO['FTP']>=2 ){
$_Comandos = array_merge($_Comandos, array('ftpget', 'ftpput', 'ftpls', 'ftpcat', 'ftprm', 'ftprename', 'ftpmkdir', 'ftprmdir'));
}else if( $_gsACCESO['FTP']>=1 ){
$_Comandos = array_merge($_Comandos, array('ftpget', 'ftpls', 'ftpcat'));
}
}
if( $ConEditores > 0 ){
if( $_gsACCESO['Shell']>=3 ) $_Comandos = array_merge( $_Comandos, array('e','w') );
}else{
if( $_gsACCESO['Shell']>=3 ) $_Comandos = array_merge( $_Comandos, array('e') );
}
if( $_SESSION["_D_"]=="~" )  $_Comandos = array_merge( $_Comandos, array('?') );
sort($_Comandos);
function validate_dir($dir){
global $dirLimit, $_gsACCESO, $_DirApliFile, $_gsDirAccess;
if( count($_gsDirAccess)>0 ){
$ConAcceso = false;
for($n=0; $n<count($_gsDirAccess); $n++){
if( substr_count($dir.'/', '/'.$_gsDirAccess[$n].'/')==1 ){
$ConAcceso = true;
break;
}
}
if( !$ConAcceso ){
$GLOBALS['shellOutput'] = "ERROR:\n   Acceso no permitido.\n";
}
}
if( $dirLimit ){
if( substr_count($dir, $dirLimit)==0 ){
$dir = $dirLimit;
$GLOBALS['shellOutput'] = "ERROR:\n   Acceso no permitido.\n   Directorio límite '{$dirLimit}'.\n";
}else if( $_gsACCESO['Shell']==2 ){
$error = true;
$txt = '';
global $_DirOK;
for($n=0; $n<count($_DirOK); $n++){
$txt .= ','.$_DirOK[$n];
if( $dirLimit.'/'.$_DirOK[$n]==$dir ) $error = false;
}
if( $error ){
$txt = substr($txt,1);
$dir = $dirLimit;
$GLOBALS['shellOutput'] = "ERROR:\n   Acceso no permitido.\n   Directorio límite '{$dirLimit}' ($txt).\n";
}
}
}
return $dir;
}
$SeEjecutaCD = false;
$input = explode(' ',$Comando);
if( strtoupper($input[0])=="CD" ){
$SeEjecutaCD = true;
}
if( $SeEjecutaCD ){
}else if( isset($work_dir) ){
$work_dir = validate_dir($work_dir);
@chdir($work_dir) or ($shellOutput = $work_dir."ERROR:\n   No se puede cambiar de directorio.\n   Permiso denegado.\n   Nivel de acceso hasta directorio '".str_replace('\\','/',$sDOCUMENT_ROOT)."'.");
$work_dir = eGetCWD();
}else{
$work_dir = eGetCWD();
if( count($_DirApliFile)>0 ){
$ConAcceso = false;
for($n=0; $n<count($_gsDirAccess); $n++){
if( substr_count($work_dir, '/'.$_gsDirAccess[$n].'/')==1 ){
$ConAcceso = true;
break;
}
}
if( !$ConAcceso ){
chdir($DirAplicacionBase);
chdir($_gsDirAccess[0]);
$work_dir = eGetCWD();
}
}
}
$work_dir = validate_dir($work_dir);
if( $shellOutput=="" && $_FILES['fichero']['name'][0]<>"" ){
$aDir = eGetCWD();
chdir($_PathHTTP);
eval(qSetup());
include_once("{$DirMotor}{$_Sql}.inc");
if( !$_HndDBSystem ) qConnectSystem();
chdir($aDir);
$Cambio = DirRelativo($work_dir);
$FileConError = false;
for($n=0; $n<count($_FILES['fichero']['name']); $n++){
$tmp = str_replace('\\','/',$_FILES['fichero']['name'][$n]);
$tmp = explode('/',$tmp);
$File = $tmp[count($tmp)-1];
$Cdi = date('Y-m-d H:i:s');
$FicheroEnviado = true;
if( !copy($_FILES['fichero']['tmp_name'][$n], $work_dir.'/'.$File) ){
$FileConError = true;
break;
}
chmod($work_dir.'/'.$File, 0666);
$Grabar = $Cambio.$File;
$_HndDBSystem->qQuery("insert into {$_SESSION['ShareDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '{$Cdi}', '{$Grabar}', 'F', '{$_SESSION['_UserEMail']}')");
}
chdir($work_dir);
$lst_comandos = $Comando = 'ls -lv';
if( $_EsWindow ) $lst_comandos = $Comando = 'dir';
}
$Comando = trim($Comando);
if( $Comando=='cd..' || $Comando=='cd' ) $Comando = 'cd ..';
if( substr($Comando,0,6)=='update' ) $Comando = 'update '.str_replace(' ','',substr($Comando,7));
$Comando = str_replace('>',' ',$Comando);
$Comando = str_replace('<',' ',$Comando);
$Comando = str_replace('|',' ',$Comando);
while( substr_count($Comando,'  ')>0 ) $Comando = str_replace('  ',' ',$Comando);
$input = explode(' ', $Comando);
if( $input[0]=='ls' ){
}else if( !in_array( $input[0], $_Comandos ) ){
if( file_exists( $input[0] ) ){
if( is_dir( $input[0] ) ){
$Comando = 'cd '.$input[0];
}else{
$Comando = 'e '.$input[0];
}
}else{
if( $input[0]!='' ){
$shellOutput = "ERROR:\n   Comando no permitido.\n   Permiso denegado.[".$input[0].']';
$Comando = '';
}
}
$input = explode(' ',$Comando);
}
if( $input[0]=='date' && $_gsACCESO['Shell']<4 ) $Comando = $input[0];
$TLFComando = '';
$_ModArbol = '';
$ComandoBakBak = $Comando;
$EditFile = '';
$modoFTP = '';
$_OtroServidor = '';
for($n=0; $n<count($input); $n++) $input[$n] = trim($input[$n]);
$_download = "";
if( $shellOutput<>"" ) $input = array("_ERROR_");
switch( $input[0] ){
case 'arbol':
case 'tree':
$_ModArbol = $input[1];
$Comando = '';
break;
case 'w':
case 'wedit':
$input[0] = 'wedit';
$EditExe = $_ExternalApps[0][1];
$EditExe = str_replace( '\\', '/', $EditExe );
$EditExe = str_replace( '//', '/', $EditExe );
$EditFile = $input[1];
$Comando = '';
break;
case 'e':
case 'edit':
$input[0] = 'edit';
$EditExe = $input[0];
$EditFile = $input[1];
$Comando = '';
break;
case 'h':
case 'htm':
$input[0] = 'htm';
$EditExe = $input[0];
$EditFile = $input[1];
$Comando = '';
break;
case 'hex':
$_MaxSize = 50*1024;
if( $input[2]!='' ) $_MaxSize = $input[2];
if( filesize($input[1]) < $_MaxSize ) $_MaxSize = filesize($input[1]);
$fd = fopen( $input[1], 'r' );
if( $_MaxSize < 0 ){
$_MaxSize = abs($_MaxSize);
fseek( $fd, filesize($input[1])-$_MaxSize);
}
$Todo = fread($fd,$_MaxSize);
fclose($fd);
$Comando = '';
$shellOutput = str_repeat(':',strlen($input[1])+2)."\n ".$input[1]." \n".str_repeat(':',strlen($input[1])+2)."\n".hexdump( $Todo );
break;
case 'field':
$input[0] = 'field';
$EditExe = $input[0];
$EditFile = $input[1];
$Comando = '';
set_time_limit(60*3);
break;
case 'ftprmdir':	if( $modoFTP=='' ) $modoFTP = 'B';
case 'ftpmkdir':	if( $modoFTP=='' ) $modoFTP = 'K';
case 'ftprename':	if( $modoFTP=='' ) $modoFTP = 'N';
case 'ftprm':		if( $modoFTP=='' ) $modoFTP = 'R';
case 'ftpls':		if( $modoFTP=='' ) $modoFTP = 'D';
case 'ftpget':		if( $modoFTP=='' ) $modoFTP = 'L';
case 'ftpcat':		if( $modoFTP=='' ) $modoFTP = 'C';
case 'ftpput':		if( $modoFTP=='' ) $modoFTP = 'G';
$Comando = '';
for( $n=1; $n<count($input); $n++ ) $Comando .= $input[$n].' ';
$input[1] = $Comando;
$workDir = explode( '/', substr($work_dir,1) );
if( $workDir[0] == '' ){
$work_dir = '/';
}else{
for( $i=0; $i<count($workDir); $i++ ) $url .= '/'.$workDir[$i];
$url .= '/';
}
$shellOutput = FTPCopy( $input[1], $modoFTP, $url, $CatFile, $input[2] );
$_OtroServidor = 'background:#FFF0EF;';
if( $input[0]=='ftpcat' ){
$Comando = 'cat '.$CatFile;
exec($Comando,$cat);
if($cat){
$text = implode("\n",$cat);
$shellOutput = htmlspecialchars($text);
$ComandoBak = $Comando;
$Comando = '';
}
passthru('rm '.$CatFile);
}
break;
case 'cd':
$path = $input[1];
$ConLs = false;
if( substr($path,-1)==';' && $input[2]=='ls' && ($input[3]=='-lv' || $input[3]=='-lvt')){
$path = substr($path,0,-1);
$ConLs = true;
}
if( $path=='..' ){
$work_dir = strrev(substr(strstr(strrev($work_dir), '/'), 1));
if($work_dir == '') $work_dir = '/';
}elseif( $path[0]=='/' || strtoupper(substr($path,0,2))=='C:' ){
$work_dir = $path;
}else{
$work_dir = $work_dir.'/'.$path;
}
$work_dir = validate_dir($work_dir);
@chdir($work_dir) or ($shellOutput = "ERROR:\n   No se puede cambiar de directorio.\n   '{$work_dir}' no existe o permiso denegado.");
$work_dir = eGetCWD();
$ComandoBak = $Comando;
$Comando = '';
if( $ConLs && substr($shellOutput,0,6)!="ERROR:" ){
if( $_EsWindow ){
$Comando =  "dir";
}else if( $input[3]=='-lvt' ){
$Comando = 'ls -lvt';
}else{
$Comando = 'ls -lv';
}
}
break;
case 'man':
if( $Comando=='man wedit' || $Comando=='man w' ){
$shellOutput = 'Se edita mediante el editor predeterminado por el usuario para windows.';
$Comando = '';
}elseif( $Comando=='man edit' || $Comando=='man e'){
$shellOutput = 'Se edita mediante el editor "gsEdit" del motor eDes.';
$Comando = '';
}elseif( $Comando=='man' && $input[0]=='recursive' ){
$shellOutput = 'Borrado (rm) o listad (ls) recursivo.';
$Comando = '';
}elseif( strtolower($Comando)=='man gsshell' || strtolower($Comando)=='man itools' || strtolower($Comando)=='man utools' || substr(strtolower($Comando),0,6)=='man gs' ){
$shellOutput = implode( "\n",file( $_DirEDes.'h/'.$input[1].'.htm'));
$tmp = explode('<TD id=Descripcion>', $shellOutput);
$tmp = explode('</TR></TBODY></TABLE></DIV><!'.'-- [HelpEnd] --'.'>', $tmp[1]);
$tmp = explode('</TBODY></TABLE>'.chr(13).chr(10).chr(10).'<SCRIPT>', $tmp[0]);
$shellOutput = str_replace('<BR>',"\n",$tmp[0]);
$shellOutput = strip_tags($shellOutput);
$Comando = '';
}else{
exec($Comando,$man);
if($man){
$codes = '.'.chr(8);
$manual = implode("\n",$man);
$shellOutput = preg_replace("/".$codes."/",'',$manual);
$ComandoBak = $Comando;
$Comando = '';
}
}
break;
case '?':
$shellOutput = 'El fichero "'.$input[1].'" no tiene log';
if( !file_exists($input[1]) ){
$shellOutput = 'El fichero "'.$input[1].'" no existe';
break;
}
$long = filesize($input[1])-1;
if( $long>1000 ) $long = 1000;
$shellOutput = 'El fichero "'.$input[1].'" no tiene log';
$fp = fopen($input[1], "r");
fseek($fp, -$long, SEEK_END);
$txt = fread($fp, $long);
fclose($fp);
for($n=$long-3; $n>0; $n--){
$c = substr($txt, $n, 1);
if( preg_match('/^[0-9]{1}$/', $c) ){
$c = substr($txt, $n-2, 3);
if( preg_match('/^[0-9]{3}$/', $c) ){
$c += 7;
$txt = substr($txt, $n+1, $c);
if( strlen($txt)==$c ){
$dim = explode("|", gzuncompress($txt));
$NomDato = array("","User","Node","Date","Script","Total Records", "IP");
$shellOutput = "";
for($n=1; $n<7; $n++){
if( $n==3 ){
$dim[$n] = substr($dim[$n],0,4).'-'.substr($dim[$n],4,2).'-'.substr($dim[$n],6,2).' '.		substr($dim[$n],8,2).':'.substr($dim[$n],10,2).':'.substr($dim[$n],12,2);
}
$shellOutput .= $NomDato[$n].' = '.$dim[$n]."\n";
}
for($n=7; $n<count($dim)-1; $n+=2){
if( $dim[$n]==$dim[$n+1] && ($dim[$n]=="POST" || $dim[$n]=="GET") ){
$shellOutput .= "\n".$dim[$n].":\n";
}else{
$shellOutput .= '    '.$dim[$n].' = '.$dim[$n+1]."\n";
}
}
break;
}
}
}
}
break;
case 'cat':
$Desde = 0;
if( $input[3]!='' ){
$Desde = (int)$input[3];
$_MaxSize = (int)$input[2];
$Comando = $input[0].' '.$input[1];
}else if( $input[2]!='' ){
$_MaxSize = (int)$input[2];
$Comando = $input[0].' '.$input[1];
}
exec($Comando,$cat);
if($cat){
$text = implode("\n",$cat);
$shellOutput = htmlspecialchars($text);
if( strlen($shellOutput)>abs($_MaxSize) || $Desde>0 ){
if( $_MaxSize>0 ){
if( $Desde>0 ){
$shellOutput = substr($shellOutput,$_MaxSize,$Desde);
}else{
$shellOutput = substr($shellOutput,0,$_MaxSize);
}
}else{
$shellOutput = substr($shellOutput,$_MaxSize);
}
if( $Desde>0 ){
$shellOutput .= "\n... Longitud truncada a ".strlen($text).'/'.$_MaxSize.'/'.$Desde.' ...';
}else{
$shellOutput .= "\n... Longitud truncada a ".strlen($text).'/'.$_MaxSize.' ...';
}
}
$ComandoBak = $Comando;
$Comando = '';
}
break;
case 'more':
exec($Comando,$cat);
if($cat){
$text = implode("\n",$cat);
$shellOutput = htmlspecialchars($text);
$ComandoBak = $Comando;
$Comando = '';
}
break;
case 'top':
$Comando = 'top n 1 b i';
break;
case 'copy':
if( is_dir($work_dir.'/'.$input[1]) ){
$shellOutput = "ERROR:\n   No se puede leer un directorio.";
}else if( !file_exists($work_dir.'/'.$input[1]) ){
$shellOutput = "ERROR:\n   El fichero no existe.";
}else if( !is_readable($work_dir.'/'.$input[1]) ){
$shellOutput = "ERROR:\n   No se puede leer el fichero.";
}else{
list($nom) = explode('.', $input[1]);
$TLFComando = 'edes.php?D:>'.$work_dir.'/'.$input[1].'&FILE='.$nom;
$Comando = 'ls -lv '.$input[1];
if( $_EsWindow ) $Comando = "dir ".$input[1];;
}
break;
case 'recursive':
$shellOutput = eRecursive($input[1], $input[2]);
break;
case '_ERROR_':
$shellOutput = "ERROR:\n   {$voidCmd}: comando no soportado.";
$ComandoBak = $Comando;
$Comando = '';
break;
case '':
if( $_EsWindow ) $Comando = "dir";
break;
case 'dir':
if( $_EsWindow ) $Comando = "dir ".substr($input[0],3);
break;
case 'ls':
if( $_EsWindow ){
if( $Comando=="ls -lv /o-d" ){
$Comando = "dir /o-d";
}else{
$Comando = "dir ".substr($input[0],3);
}
}
break;
case 'update':
if( substr($DirMotor,1,1)==':' ) list( ,$DirMotor ) = explode(':',$DirMotor);
$Aqui = str_replace(chr(92),'/',getCWD());
if( substr_count($Aqui,':')==1 ) list(,$Aqui) = explode(':',$Aqui);
if( $DirAplicacion == $Aqui ){
$Cambio = '';
}else if( substr_count($DirAplicacion,$Aqui)==1 ){
$Cambio = substr($DirAplicacion,strlen($Aqui)+1);
$tmp = explode('/',$Cambio);
$Cambio = ''.str_repeat('../',count($tmp));
}else if( substr_count($Aqui,$DirAplicacion)==1 ){
$Cambio = ''.substr($Aqui,strlen($DirAplicacion)+1).'/';
}else if( substr_count($DirAplicacionFile,$Aqui)==1 ){
$tmp = explode('/',$DirAplicacionFile);
$Cambio = '../../'.$tmp[count($tmp)-1].'/'.substr($DirAplicacionFile,strlen($Aqui)+1);
}else if( substr_count($Aqui,$DirAplicacionFile)==1 ){
$tmp = explode('/',$DirAplicacionFile);
$Cambio = '../../'.$tmp[count($tmp)-1].'/'.substr($Aqui,strlen($DirAplicacionFile)+1).'/';
}else if( substr_count($Aqui,$DirAplicacionBase)==1 ){
$Cambio = '../'.substr($Aqui,strlen($DirAplicacionBase)+1).'/';
}else if( substr_count($Aqui,$DirMotor)==1 || $Aqui.'/'==$DirMotor ){
if( $Aqui.'/'==$DirMotor ){
$Cambio = '$'.substr($DirMotor,strlen($Aqui)+1);
}else{
$tmp = str_replace( $DirMotor, '', $Aqui );
$Cambio = '$'.$tmp.'/'.substr($DirMotor,strlen($Aqui)+1);
}
}else{
$Cambio = '';
$Comando = '';
}
$input[1] = str_replace(' ','',$input[1]);
$_Update = $Cambio.$input[1];
$shellOutput = 'update '.$_Update;
break;
case 'date':
$shellOutput = 'Date: '.date('Y-m-d H:i:s');
$Comando = '';
break;
case 'download':
$Cambio = DirRelativo($work_dir);
if( substr($Cambio,0,2)==".." ) $Cambio = substr($Cambio,2);
$Comando = "ls -lv";
if( $_EsWindow ) $Comando = "dir";
$ComandoBakBak = $Comando;
$_download = "<a id='_DescargarFile1' href='edes.php?D:{$Cambio}{$input[1]}&FILE={$input[1]}' style='display:none'>Download {$input[1]}</a>";
break;
case 'unserialize':
$tmp = trim(file_get_contents(trim($input[1])));
if( substr($tmp,-2)==";}" ){
$tmp = unserialize($tmp);
$shellOutput = print_r($tmp, true);
}else{
$shellOutput = "ERROR:\n   El fichero \"{$input[1]}\" no está serializado.";
}
$Comando = '';
break;
default:
}
$Comando = trim($Comando);
if( substr_count($work_dir, $_DirApli)==0 && count($_gsDirAccess)>0 ){
$work_dir = substr($_DirApli,0,-1);
}
?>
<!DOCTYPE HTML>
<html>
<head><title>gsShell</title>
<style>
body, html{
height:100%;
width:100%;
}
BODY {
margin:0px;
padding:0px;
overflow:hidden;
}
body {
BACKGROUND: #f6f6f6;
FONT-SIZE: 13px;
MARGIN: 0px;
PADDING: 0px;
border: 0px;
cursor: default;
}
table {
FONT-SIZE: 13px;
background: #cccccc;
border-collapse:collapse
}
td {
PADDING-LEFT: 5px;
background-color: #f6f6f6;
color: #000099;
}
input {
background-color: #FFFFFF;
color: #000099;
border: 1px solid #CCCCCC;
font-size: 10px;
padding-left: 5px;
}
select,option {
background-color: #FDFDFD;
color: #000099;
border: 1px solid #CCCCCC;
font-size: 10px;
padding-left: 5px;
}
input {
FONT-SIZE: 15px;
}
textarea {
font-family: monospace !important;
FONT-SIZE: 15px;
background-color: #FFFFFF;
BORDER: #6c7b82 0px solid;
FONT-SIZE: 100%;
PADDING-LEFT: 5px;
border-style: none;
SCROLLBAR-ARROW-COLOR: #d5dce0;
SCROLLBAR-3DLIGHT-COLOR: #d5dce0;
SCROLLBAR-DARKSHADOW-COLOR: #485257;
SCROLLBAR-BASE-COLOR: #8caab5;
SCROLLBAR-FACE-COLOR: #8caab5;
SCROLLBAR-HIGHLIGHT-COLOR: #8caab5;
SCROLLBAR-SHADOW-COLOR: #8caab5;
SCROLLBAR-TRACK-COLOR: #d5dce0;
}
.IWORK {
border: 1px solid #898c95;
}
#ShellOK {
}
#ShellKO {
color: #FF0000;
font-weight: bold;
}
img {
cursor:pointer;
vertical-align: middle;
}
<?PHP
$txt = file_get_contents("http/{$_PathCSS}/all.css");
echo $txt;
?>
</style>
<SCRIPT type="text/javascript">
<?PHP
if( !$_SESSION["_BYPHONE"] ){
echo 'top.S.init(window,"all");';
}else{
?>
top.window.opener.S.init(window);
var oStyle = top.window.opener.document.styleSheets, r,i,t,reglas, sheet=S.sheet(window);
for(r=0; r<oStyle.length; r++){
if( oStyle[r].title=="all" ){
reglas = oStyle[r].rules
t = reglas.length;
for(i=0; i<t; i++){
if( /^@font-face /.test(reglas[i].cssText) ){
sheet.insertRule(reglas[i].cssText, sheet.cssRules.length);
}
}
}
}
<?PHP
}
if( $FicheroEnviado ) echo 'setTimeout(function(){S.info("Fichero grabado", 3);}, 500);';
?>
Element.prototype.getElementById = function( seek ){
var elem=this, children=elem.childNodes, len=children.length, i, id;
for(i=0; i<len; i++){
elem = children[i];
if( elem.nodeType !== 1 ) continue;
id = elem.id || elem.getAttribute('id');
if( id === seek ) return elem;
id = elem.getElementById(seek);
if( id ) return id;
}
return null;
}
if( typeof document.documentElement.sourceIndex=="undefined" )
HTMLElement.prototype.__defineGetter__("sourceIndex", (function(indexOf){
return function sourceIndex(){
return indexOf.call(this.ownerDocument.getElementsByTagName("*"), this);
};
})(Array.prototype.indexOf));
;
<?PHP
echo "var _DimComando=[";
for($n=0; $n<count($newOrdenes); $n++){
if( $n>0 ) echo ",";
echo '"'.str_replace('"', chr(92).'"', trim($newOrdenes[$n])).'"';
}
echo "], _posDimComando=-1;";
if( $_gsACCESO['TIPO']<>'~' ) echo 'document.oncontextmenu = new Function("return false");';
?>
function AnulaKey(){
var k = S.eventCode(event);
if( S.event(window).name=="Comando" ){
if( k==40 ){
if( _posDimComando<=0 ){
document.getElementsByName("Comando")[0].value = "";
_posDimComando = -1;
}else if( _posDimComando>0 ){
_posDimComando--;
document.getElementsByName("Comando")[0].value = _DimComando[_posDimComando];
}
return S.eventClear(window);
}else if( k==38 ){
if( _posDimComando<0 ){
_posDimComando = 0;
}else if( _posDimComando<_DimComando.length-1 ) _posDimComando++;
document.getElementsByName("Comando")[0].value = _DimComando[_posDimComando];
return S.eventClear(window);
}
}
if( k==112 ){
gsHelp();
return S.eventClear(window);
}else if( k==17 ) return true;
if( k==77 && event.ctrlKey ){
var dim = [
["-Tools"],
["SQL","",""],
["PHP","",""],
["HTML","",""],
["-"],
["Shell","",""],
["-"],
["Ayuda","",""]
];
S("TEXTAREA").menu(dim, {function:function(op, script, trigger, tr){
switch(tr.rowIndex){
case 1:
top.S.callSrv("edes.php?E:$t/ed.gs&tab="+top.DimScript.length+"&LoadSel=SQL&_DB=NO", window);
break;
case 2:
top.S.callSrv("edes.php?E:$t/ed.gs&tab="+top.DimScript.length+"&LoadSel=PHP", window);
break;
case 3:
top.S.callSrv("edes.php?E:$t/ed.gs&tab="+top.DimScript.length+"&LoadSel=HTM", window);
break;
case 5:
top.S.callSrv("edes.php?E:$t/ed.gs&tab="+top.DimScript.length+"&Shell=1", window);
break;
}
}});
return S.eventClear(window);
}
return true;
}
document.onkeydown = AnulaKey;
function eClearEvent(){
try{
try{ event.keyCode = 0; }catch(e){}
event.cancelBubble = true;
event.returnValue = false;
}catch(e){}
return false;
}
<?PHP
if( $_ModArbol != '' ){
CargarMenu( $_ModArbol );
}
?>
function End(){
var Ancho = Alto = 19;
with( document.all.Procesando.style ){
display = 'block';
pixelLeft = (screen.width/2)+"px";
pixelTop = (screen.availHeight/2)+"px";
}
}
function CopiaSCR(){
var txt = S.getSelection(window);
if( null==txt || txt=="" ) return;
txt = txt.replace(/\n$/g, '');
if( txt.indexOf('\n') != -1 ) return;
txt = txt.replace(/^\s+/g, '').replace(/\s+$/g, '').replace(/\s+\s+/g,' ');
document.execCommand('Unselect');
var tmp = txt.split(' ');
txt = tmp[0];
var Linea = S("#ShellOK").val().split('\n'), n;
for(n=0; n<Linea.length; n++){
if( Linea[n].indexOf(' '+txt)!=-1 && Linea[n].substring(0,1)=='d' ){
S(":Comando").val('cd '+txt+'; ls -lv');
shell.submit();
return;
}
}
S(":Comando").val(S(":Comando").val()+' '+txt);
return S.eventClear(window);
}
function CopyAll(){
S(":shellOut").obj.select();
document.execCommand('Copy');
document.execCommand('Unselect');
}
function NewDir(e, sufi){
var Dir = '', p = e.sourceIndex;
while( eIndex(p).tagName!='B' ) Dir = eIndex(p--).innerText+'/'+Dir;
<?PHP
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ) echo 'Dir = "/"+Dir;';
if( strtoupper(substr(PHP_OS,0,3))=='WIN' ) echo 'if( sufi=="t" ) sufi = " /o-d";';
?>
if( Dir!=S.nsp(eIndex(p).innerText) ){
S(":Comando").val("cd "+Dir+"; ls -lv"+sufi);
}else{
S(":Comando").val("ls -lv"+sufi);
}
S(":shellOut").val("");
shell.submit();
return eClearEvent();
}
function SelectDir(){
S(":Comando").val("ls -lv");
S(":shellOut").val("");
S(":work_dir").obj.form.submit();
}
function gsHelp(){
return false;
}
function selOrden(o){
S(":Comando").val(o.options[o.selectedIndex].innerText);
o.selectedIndex = 0;
S(":Comando").obj.focus();
}
var _DirMem=[], _DirMemOp;
function DirMem(){
var dir = S.nsp(S("#PATHACTUAL").text());
top.S.callSrv("edes.php?E:$t/vsh.gs&MEMDIR="+dir, window);
}
function DirSel(op){
_DirMemOp = op;
if( _DirMem.length<2 ) return;
for(var i=0; i<_DirMem.length; i++){
if( /\/edesweb\//.test(_DirMem[i][0]) ){
_DirMem[i][5] = "font-weight:bold";
}
}
S("#_DIRMEM").menu(_DirMem, {trigger:false, function:function(cod, dir){
if( _DirMemOp==0 ){
top.S.callSrv("edes.php?E:$t/vsh.gs&MEMDIR=-"+dir, window);
}else{
S(":Comando").val('cd '+dir+'; ls -lv');
}
shell.submit();
}}, op);
S.eventClear(window);
}
function Inicio(){
document.shell.Comando.select();
var menu = [["-Path"]],
dir = "<?=$_DimPATH?>",
txt = dir.split(","), n;
for(n=0; n<txt.length; n++){
menu.push([txt[n],"",""]);
}
if( dir=="" ){
_DirMem = [];
}else{
_DirMem = menu;
}
if( _DirMem.length>1 ) S("#_DIRMEM").class("-OFF");
}
</SCRIPT>
<style>
.ICONINPUT, I {
font-size:10px !important;
color:#1B6B8D;
}
</style>
</head>
<body scroll=no onload='Inicio()' onbeforeunload='End()' onhelp='return gsHelp()'>
<?PHP
if( $_download<>"" ){
echo $_download;
echo '<script>setTimeout(function(){top.S("#_DescargarFile1",window).eventFire("click");},250);</script>';
}
?>
<form name="shell" method="post" ACTION="edes.php?E:$t/vsh.gs" multipart="" enctype='multipart/form-data' style="width:100%;height:100%;display:flex;">
<INPUT NAME='MAX_FILE_SIZE' TYPE='HIDDEN' VALUE='10000000' disabled>
<table WIDTH="100%" HEIGHT="100%" cellspacing=0px cellpadding=0px border=0px>
<tr><td id="STATUS" style='padding-top:1px' onselectstart='return false'>
Usuario: <B><?=$_gsNomUser;?></B> <?=(($whoami=='')?'':'('.$whoami.')')?><input type="hidden" name="whoami" value="<?=$whoami?>">&nbsp;&nbsp;&nbsp;&nbsp;
<?PHP
$colorEDES = preg_match('/\/edesweb\//',$work_dir."/")? "color:red;":"";
echo "Directorio: <b style='cursor:pointer;{$colorEDES}' id='PATHACTUAL'>\n";
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ){
$work_dir_splitted = explode('/', substr($work_dir,1));
}else{
$work_dir_splitted = explode('/', $work_dir);
}
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ) echo '/';
if( $work_dir_splitted[0]=='' ){
$work_dir = '/';
}else{
for( $i=0; $i<count($work_dir_splitted); $i++ ){
$url .= '/'.$work_dir_splitted[$i];
echo '<span onclick="NewDir(this,\'\')" oncontextmenu="NewDir(this,\'t\')" title="Click IZQ: Listar ficheros ascendente'."\n".'Click DCH: Listar ficheros descendente">'.$work_dir_splitted[$i].'</span> / ';
}
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ) $url .= '/';
}
echo '</b>';
echo '<i class="ICONINPUT" onclick="DirMem()" title="Memorizar directorio actual" style="padding-left:10px">C</i>';
echo "<i id='_DIRMEM' class='ICONINPUT OFF' onclick='DirSel(1)' oncontextmenu='DirSel(0)' title='Click IZQ: Seleccionar directorio\nClick DCH: Borrar directorio'>P</i>";
echo "<select name='work_dir' onChange='SelectDir()' style='margin-left:15px'>";
echo "<option value='{$work_dir}' selected>Directorio Actual</option>\n";
$TmpDir = array();
$_DirEDeshandle = opendir($work_dir);
while( $dir = readdir($_DirEDeshandle) ){
if( is_dir($dir) ){
if( $dir == '.' ){
}else if( $dir == '..' ){
if( strlen($work_dir) == 1 ){
}elseif( strrpos($work_dir,'/') == 0 ){
echo "<option value=\"/\">Directorio Padre</option>\n";
}else{
echo "<option value=\"". strrev(substr(strstr(strrev($work_dir),'/'), 1)) ."\">Directorio Padre</option>\n";
}
}else{
if( $work_dir == '/' ){
$TmpDir[] = "<option value='{$work_dir}{$dir}' style='margin-left:0px'>{$dir}</option>\n";
}else{
$TmpDir[] = "<option value='{$work_dir}/{$dir}' style='margin-left:0px'>{$dir}</option>\n";
}
}
}
}
closedir($_DirEDeshandle);
sort($TmpDir);
for( $n=0; $n<count($TmpDir); $n++ ) echo $TmpDir[$n];
echo '</select>';
echo "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ordenes: <select name='lst_comandos' onChange='selOrden(this)'>";
echo '<option>';
for( $n=0; $n<count($_Comandos)-$ComandosOcultos; $n++ ) echo '<option>'.$_Comandos[$n];
echo '</select>';
if( $_gsACCESO['Shell']>=4 ){
echo '<i class="ICONINPUT" onclick=S("#FicheroMultiple").eventFire("click") style="margin-left:10px" title="Subir ficheros al servidor">w</i>';
echo '<i class="ICONINPUT" onclick="CopyAll()" style="margin-left:10px" title="Copia el contenido al clipboard">C</i>';
echo "<INPUT NAME='fichero[]' id='FicheroMultiple' TYPE='file' multiple VALUE='' style='visibility:hidden;cursor:pointer;font-size:1px;margin-bottom:2px;width:1px' onchange='shell.submit()' title='Subir fichero al servidor'>";
}
echo '<tr><td class=IWORK width=100% height=100% style="PADDING-LEFT:0px;">';
if( substr($shellOutput,0,6)!='ERROR:' ){
echo '<textarea id=ShellOK name="shellOut" style="width:100%;height:100%;'.$_OtroServidor.'" cols="95" rows="35" readonly onmouseup="CopiaSCR()" onkeydown="return AnulaKey();">';
}else{
echo '<textarea id=ShellKO name="shellOut" style="width:100%;height:100%;" cols="95" rows="35" readonly onkeydown="return AnulaKey();">';
$Comando = '';
}
echo $shellOutput;
if( $EditExe=='edit' && substr($shellOutput,0,6)!="ERROR:"  ){
if( $_EsWindow ){
$Comando = "dir";
}else{
$Comando = 'ls -lv';
}
}
if( $input[0]=='field' ){
$dir = $work_dir;
$dir = str_replace($DirAplicacionBase, "", $dir);
if( substr($dir,0,2)=="C:" ) $dir = substr($dir,2);
if( $dir[0]=="/" ) $dir = "..".$dir;
SeekField( ".", strtoupper("|{$input[1]}|") );
}else if( $input[0]=='update' ){
$aDir = eGetCWD();
chdir($_PathHTTP);
eval(qSetup());
include_once( "{$DirMotor}{$_Sql}.inc" );
$Cdi = date('Y-m-d H:i:s');
if( !$_HndDBSystem ) qConnectSystem();
chdir($aDir);
if( substr_count( $_Update, ',' ) > 0 ){
$tmp = explode(',',$_Update);
for( $n=0; $n<count($tmp); $n++ ){
if( $n==0 ){
$Prefijo = '';
if( substr_count($tmp[$n],'/') > 0 ){
$Prefijo = substr($tmp[0],0,strrpos($tmp[0],'/')).'/';
}
}else{
$tmp[$n] = $Prefijo . $tmp[$n];
}
$_HndDBSystem->qQuery( "insert into {$_SESSION['ShareDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '{$Cdi}', '{$tmp[$n]}', 'F', '{$_SESSION['_UserEMail']}')");
}
}else{
$_HndDBSystem->qQuery( "insert into {$_SESSION['ShareDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '{$Cdi}', '{$_Update}', 'F', '{$_SESSION['_UserEMail']}')");
}
}else if( $Comando ){
if( $ComandoBakBak=='ls' || substr($ComandoBakBak,0,3)=='ls ' || ($ComandoBakBak=='' && substr($Comando,-6)=='ls -lv' ) ){
$Comando = trim($Comando);
$LineasPorPag = 1000;
$Pagina = 1;
if( substr_count($ComandoBakBak,' -P ')==1 && is_numeric(substr($ComandoBakBak,-1)) ){
list(,$Pagina) = explode(' -P ',$ComandoBakBak);
}
$RecMin = ($Pagina-1)*$LineasPorPag;
if( $RecMin==0 ) $RecMin = 1;
else $RecMin++;
$RecMax = $Pagina*$LineasPorPag;
$FileLs = "{$DirAplicacionBase}/_tmp/php/ls.{$_User}";
@unlink($FileLs);
passthru($Comando." > {$FileLs}");
$nl = -1;
$file = fopen($FileLs,'r');
while(!feof($file)){
$nl++;
$txt = fgets($file);
if( $nl==0 ){
echo $txt;
if( $Pagina>1 ) echo "...\n";
}else if( $nl>=$RecMin && $nl<=$RecMax ) echo $txt;
}
fclose($file);
if( $nl>$RecMax ){
$TPagina = ceil($nl/$LineasPorPag);
echo "...\nPágina {$Pagina} de {$TPagina}";
}
}else{
if( $_EsWindow && substr($Comando,0,3)=="cp " ){
passthru("copy ".substr($Comando,3));
}else if( $_EsWindow && substr($Comando,0,3)=="rm " ){
passthru("del ".substr($Comando,3));
}else if( $_EsWindow && substr($Comando,0,4)=="cat " ){
passthru("type ".substr($Comando,4));
}else{
if( substr($Comando,5)=="grep " ) set_time_limit(60*3);
passthru($Comando);
}
}
list( $OrdExe ) = explode(' ',trim($Comando));
if( substr_count( ',mkdir,mv,rm,rmdir,', ",{$OrdExe}," ) > 0 ){
$aDir = eGetCWD();
chdir($_PathHTTP);
eval(qSetup());
chdir($aDir);
$File = substr($DirAplicacion,0,-4).'_datos/config/directory.log';
$Cdi = date('Y-m-d H:i:s');
$Aqui = str_replace(chr(92),'/',getCWD());
if( substr_count($Aqui,':')==1 ) list(,$Aqui) = explode(':',$Aqui);
if( $DirAplicacion == $Aqui ){
$Cambio = '';
}else if( substr_count($DirAplicacion,$Aqui)==1 ){
$Cambio = substr($DirAplicacion,strlen($Aqui)+1);
$tmp = explode('/',$Cambio);
$Cambio = ''.str_repeat('../',count($tmp));
}else if( substr_count($Aqui,$DirAplicacion)==1 ){
$Cambio = ''.substr($Aqui,strlen($DirAplicacion)+1).'/';
}else if( substr_count($DirAplicacionFile,$Aqui)==1 ){
$tmp = explode('/',$DirAplicacionFile);
$Cambio = '../../'.$tmp[count($tmp)-1].'/'.substr($DirAplicacionFile,strlen($Aqui)+1);
}else if( substr_count($Aqui,$DirAplicacionFile)==1 ){
$tmp = explode('/',$DirAplicacionFile);
$Cambio = '../../'.$tmp[count($tmp)-1].'/'.substr($Aqui,strlen($DirAplicacionFile)+1).'/';
}else if( substr_count($Aqui,$DirAplicacionBase)==1 ){
$Cambio = '../'.substr($Aqui,strlen($DirAplicacionBase)+1).'/';
}else{
$Cambio = '';
$Comando = '';
}
if( $Comando!='' ){
$Comando = str_replace('  ',' ',trim($Comando));
$tmp = explode(' ',$Comando);
$aComando = $tmp[0];
for($n=1; $n<count($tmp); $n++) $aComando .= ' '.$Cambio.$tmp[$n];
error_log( $Cdi.': '.$aComando."\n", 3, $File );
$aDir = eGetCWD();
chdir($_PathHTTP);
if( !$_HndDBSystem ) qConnectSystem();
$_HndDBSystem->qQuery( "insert into {$_SESSION['ShareDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '{$Cdi}', '/_datos/config/directory.log', 'F', '{$_SESSION['_UserEMail']}')");
chdir($aDir);
}
}
}
if( $ComandoBak ) $Comando = $ComandoBak;
if( $_gsACCESO['LOGEAR'] > 0 ){
if( substr($shellOutput,0,6) == 'ERROR:' ) $Comando = trim($Comando.' - '.str_replace("\n",' - ',$shellOutput));
while( substr_count( $Comando,'  ') > 0 ) $Comando = str_replace('  ',' ',$Comando);
gsLogear( 'SH','?', $Comando );
}
?>
</textarea>
<tr><td height=1px>
<TABLE border=0px cellspacing=0px cellpadding=0px width=100%>
<TR>
<TD onselectstart='return false'>Comando</TD>
<TD width=100%><input type="text" name="Comando" style="width:100%" size="200" value='<?=$ComandoBakBak?>'></TD>
<TD valign=bottom onselectstart='return false' style='padding-left:7px;'>
<i class="ICONINPUT" onclick="top._ShellCommand=this.value; shell.submit()" oncontextmenu="if(top._ShellCommand)this.value=top._ShellCommand;" title="Enviar petición" style="font-size:10px">&#211;</i>
</TD>
</TR>
</TABLE>
</td></tr></table>
</form>
<?PHP
if( $EditFile != '' ){
echo '<SCRIPT type="text/javascript">';
if( substr($work_dir,-1)<>'/' ) $work_dir .= '/';
$work_dir = str_replace( $_DirEDes, '$', $work_dir );
$work_dir = str_replace( $_DirApliFile, '/'.'/', $work_dir );
$work_dir = str_replace( $_DirApli, '/', $work_dir );
$TipoFile = explode('.', $EditFile);
$TipoFile = strtoupper( $TipoFile[count($TipoFile)-1] );
if( $EditExe=='edit' ){
if( $work_dir[0]<>'$' || ($work_dir[0]=='$' && $_SESSION['_D_']=='~') ){
if( substr($work_dir,0,strlen($DirLIB))==$DirLIB ) $work_dir = '/ l i b /'.substr($work_dir,strlen($DirLIB));
$NomFile = str_replace($DirAplicacionBase, "", $work_dir.$EditFile);
if( substr($NomFile,0,2)=="C:" ) $NomFile = substr($NomFile,2);
if( substr($NomFile,0,3)=="/d/" ) $NomFile = substr($NomFile,3);
?>
top.S.callSrv("edes.php?E:$t/ed.gs&tab="+top.DimScript.length+"&LoadSel=<?=$NomFile?>", top);
<?PHP
}
}else if( $EditExe=='htm' ){
if( substr_count(',HTM,HTML,',$TipoFile ) ){
$url = str_replace( '/http/', '', $url );
}
}else{
if( substr_count(',BMP,WAV,ICO,',$TipoFile ) ){
}else if( substr_count(',GIF,JPG,PNG,',$TipoFile ) ){
}else{
}
}
echo '</SCRIPT>';
}
if( $TLFComando!='' ){
echo "<IFRAME name='TLF' src='{$TLFComando}' width='0px' height='0px'></iframe>";
}
echo '<IMG id=Procesando SRC="edes.php?IC=$t/g/e/2_procesando.gif" BORDER=0px style="position:absolute;z-index:10;display:none">';
echo '</body></html>';
eEnd();
function CargarMenu( $NomUser ){
global $shellOutput;
$NomFile = '../tree/__personal.'.trim($NomUser);
$Arbol = array();
$n = 0;
if( file_exists($NomFile) != 1 && is_readable($NomFile) != 1 ) return;
$fd = fopen( $NomFile, 'r' );
$Todo = fread($fd,filesize($NomFile));
fclose($fd);
$shellOutput = gzuncompress($Todo);
return;
}
function hexdump( $data, $htmloutput=false, $uppercase=false, $return=true ){
$hexi = $ascii = '';
$dump = $htmloutput === true ? '<pre>' : '';
if( $uppercase === false ){
$x = 'x';
}else{
$x = 'X';
}
$lines = array();
$i = 0;
while( $i * 16 < strlen($data) ) $lines[] = substr($data, 16 * $i++, 16);
$offset = 0;
foreach( $lines as $line ){
for( $i = 0; $i < strlen($line); $i++ ){
$hexi .= sprintf("%02$x ", ord($line{$i}));
if( ord($line{$i}) >= 32 ){
$ascii .= $htmloutput === true ? htmlentities($line{$i}) : $line{$i};
}else{
$ascii .= '.';
}
if ($i == 7) {
$hexi .= ' ';
$ascii .= ' ';
}
}
$dump .= sprintf("%04$x  %-49s  %s\n", $offset, $hexi, $ascii);
$offset += 16;
$hexi = $ascii = '';
}
$dump = substr($dump, 0, -1);
$dump .= $htmloutput === true ? '</pre>' : '';
$dump .= "\n";
if( $return === false ){
echo $dump;
}else{
return $dump;
}
}
function FTPCopy( $Fichero, $Modo, $url, &$CatFile=NULL, $NuevoNombre='' ){
global $_T, $sDOCUMENT_ROOT;
if( substr_count( $Dim[$n], '$' ) > 0 || substr_count( $Fichero, '/edesweb/' ) > 0 ) return 'ERROR: No se pueden copiar ficheros del motor';
if( substr_count( $sDOCUMENT_ROOT, '/' ) > 0 ) $sDOCUMENT_ROOT = substr( $sDOCUMENT_ROOT, 0, strrpos($sDOCUMENT_ROOT,'/'));
$_Fichero = $sDOCUMENT_ROOT.'/_d_/cfg/ftp.ini';
if( !file_exists( $_Fichero ) ) return 'ERROR: FTP no disponible';
$FTPServidor= '';
$FTPUsuario	= '';
$FTPPassord	= '';
$FileLocal	= $Fichero;
$FileServidor	= '';
$df = fopen( $_Fichero, 'r' );
if( !$df ) die('Error');
$cTxt = fread( $df, filesize($_Fichero) );
fclose( $df );
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+1,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+2+$n,1));
$Basura += $LongDeLong + 2;
$txt = substr( $cTxt, $Basura, $LenCadena );
$txt = gzuncompress($txt);
$Dim = explode( "\n", $txt );
for( $n=0; $n<count($Dim); $n++ ){
$tmp = explode("\t",$Dim[$n]);
if( $_SERVER['HTTP_HOST'] == trim($tmp[1]) ){
$FTPServidor = trim($tmp[3]);
$FTPUsuario	 = trim($tmp[4]);
$FTPPassord	 = trim($tmp[5]);
$FTPDir		 = trim($tmp[6]);
}
}
if( $FTPServidor == '' ) return 'ERROR: No hay FTP';
$IdConnect = ftp_connect($FTPServidor);
if( !$IdConnect ) return 'ERROR: La conexión FTP ha fallado';
$LoginOK = ftp_login( $IdConnect, $FTPUsuario, $FTPPassord );
if( !$LoginOK ) return 'ERROR: El Login FTP ha fallado';
$TxtReturn = '';
$DimFichero = explode(',',str_replace(' ','',$Fichero));
if( $Modo == 'N' ){
$DimFichero = explode(' ',str_replace('  ',' ',$Fichero));
$DimFichero = array($DimFichero[0]);
}
if( $Modo == 'G' || $Modo == 'L' ){
if( substr_count($Fichero,'*')+substr_count($Fichero,'?') > 0 && substr_count($Fichero,',') == 0 ){
$DimFichero = array();
foreach( glob(trim($Fichero)) as $file ) $DimFichero[] = $file;
}
}
for( $nf=0; $nf<count($DimFichero); $nf++ ){
if( $TxtReturn!='' ) $TxtReturn .= "\n";
$Fichero = trim($DimFichero[$nf]);
if( $Modo == 'C' ){
$FileLocal = $url.'__cat__';
$ext = explode('.',$Fichero);
if( count($ext)>1 ) $FileLocal .= '.'.$ext[count($ext)-1];
$CatFile = $FileLocal;
$nf = count($DimFichero);
}else{
$FileLocal = $url.$Fichero;
}
if( substr_count( eGetCWD().'/', '.file/' ) == 1 ){
$FileServidor = str_replace( $sDOCUMENT_ROOT.'.file/', $FTPDir.'.file/', $url.$Fichero );
}else{
$FileServidor = str_replace( $sDOCUMENT_ROOT.'/', $FTPDir.'/', $url.$Fichero );
}
if( $Modo == 'D' ){
if( $Fichero=='' ){
if( substr_count( eGetCWD().'/', '.file/' ) == 1 ){
$FileServidor = str_replace( $sDOCUMENT_ROOT.'.file/',$FTPDir.'.file/', $url );
}else{
$FileServidor = str_replace( $sDOCUMENT_ROOT.'/',$FTPDir.'/', $url );
}
}else{
$FileServidor = $Fichero;
}
$Dir = ftp_rawlist( $IdConnect, $FileServidor );
$txt = '';
for( $n=0; $n<count($Dir); $n++ ) $txt .= $Dir[$n]."\n";
$TxtReturn .= 'DIRECTORIO: '.$FileServidor."\n".$txt;
}else if( $Modo == 'K' ){
$carga = ftp_mkdir( $IdConnect, $FileServidor );
if( !$carga ){
$TxtReturn .= 'ERROR: No se ha podido crear el directorio "'.$Fichero.'"';
}else{
$TxtReturn .= 'OK FTPMkdir '.$Fichero;
}
ftp_site( $IdConnect, 'chmod 0777 '.$FileServidor );
}else if( $Modo == 'B' ){
$carga = ftp_rmdir( $IdConnect, $FileServidor );
if( !$carga ){
$TxtReturn .= 'ERROR: No se ha podido borrar el directorio "'.$Fichero.'"';
}else{
$TxtReturn .= 'OK FTPRmdir '.$Fichero;
}
}else if( $Modo == 'R' ){
$carga = ftp_delete( $IdConnect, $FileServidor );
if( !$carga ){
$TxtReturn .= 'ERROR: No se ha podido borrar el fichero "'.$Fichero.'"';
}else{
$TxtReturn .= 'OK FTPRm '.$Fichero;
}
}else if( $Modo == 'N' ){
$carga = ftp_rename( $IdConnect, $FileServidor, str_replace( $Fichero, $NuevoNombre, $FileServidor) );
if( !$carga ){
$TxtReturn .= 'ERROR: No se ha podido renombrar el fichero "'.$FileServidor.'"';
}else{
$TxtReturn .= 'OK FTPRename '.$Fichero;
}
}else if( $Modo == 'G' ){
$carga = ftp_put( $IdConnect, $FileServidor, $FileLocal, FTP_BINARY );
if( !$carga ){
$TxtReturn .= 'ERROR: El envío FTP ha fallado al enviar "'.$Fichero.'"';
}else{
$TxtReturn .= 'OK FTPPut '.$Fichero;
}
if( !ftp_site( $IdConnect, 'chmod 0777 '.$FileServidor ) ) $TxtReturn.= "\nERROR: no se pudo cambiar los permisos.";
}else{
$carga = ftp_get( $IdConnect, $FileLocal, $FileServidor, FTP_BINARY );
if( !$carga ){
$TxtReturn .= 'ERROR: La recepción FTP ha fallado al recibir "'.$Fichero.'"';
}else{
$TxtReturn .= 'OK FTPGet '.$Fichero."\n";
}
}
}
ftp_quit( $IdConnect );
return $TxtReturn;
}
function vCrearDirectorios( $BakFile ){
$tmp = explode( '/', $BakFile );
$sDir = '';
for( $n=0; $n<count($tmp)-1; $n++ ){
$sDir .= $tmp[$n].'/';
if( !is_dir( $sDir ) ) mkdir( $sDir, 0777 );
if( !is_writeable( $sDir ) ){
if( !chmod( $sDir, 0777 ) ){
global $_T;
die( "<br>{$_T[84]}: {$sDir}" );
}
}
}
}
function TieneFTP(){
$FTPFile = '../_d_/cfg/ftp.ini';
if( !file_exists($FTPFile) || filesize($FTPFile)==0 ) return '';
$df = fopen( $FTPFile, 'r' );
if( !$df ) die('Error');
$cTxt = fread( $df, filesize($FTPFile) );
fclose( $df );
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+1,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+2+$n,1));
$Basura += $LongDeLong + 2;
if( $Basura+$LenCadena > strlen($cTxt) ){
echo '<'.'SCRIPT>alert("Fichero FTP corrupto");<'.'/SCRIPT>';
return '';
}
$txt = substr( $cTxt, $Basura, $LenCadena );
$txt = gzuncompress($txt);
$Dim = explode( "\n", $txt );
$Leer = false;
for( $n=0; $n<count($Dim); $n++ ){
$tmp = explode("\t",$Dim[$n]);
if( trim($tmp[0]) == '[Data]' ) $Leer = true;
if( $Leer ){
if( $_SERVER['HTTP_HOST'] == trim($tmp[1]) ){
return $tmp[2];
}
}
}
return '';
}
function eRecursive( $Op, $Patron ){
$c = new _eRecursive;
return $c->Exe( '.', $Op, $Patron );
}
class _eRecursive {
var $Iteracion = 0;
var $TF = 0;
var $TByts = 0;
var $NomPatron = '';
var $txt = '';
function Exe( $NomDir, $Op, $Patron ){
$this->Iteracion++;
if( $this->NomPatron=='' ){
$this->NomPatron = '/';
if( $Patron[0]!='*' ) $this->NomPatron .= '^';
$this->NomPatron .= $Patron;
if( substr($Patron,-1)!='*' ) $this->NomPatron .= '$';
$this->NomPatron .= '/i';
$this->NomPatron = str_replace('.','\.',$this->NomPatron);
$this->NomPatron = str_replace('*','.*',$this->NomPatron);
}
$di = opendir( $NomDir );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( is_dir( $NomDir.'/'.$file ) ){
$this->Exe( $NomDir.'/'.$file, $Op, $Patron );
}else if( preg_match( $this->NomPatron, $file ) ){
$this->TF++;
$this->TByts += filesize( $NomDir.'/'.$file);
switch( $Op ){
case 'ls':
$this->txt .= $NomDir.'/'.$file."\n";
break;
case 'rm':
unlink( $NomDir.'/'.$file );
break;
case 'ftpput':
break;
case 'ftpget':
break;
case 'ftprm':
break;
case 'ftpls':
break;
}
}
}
}
$this->Iteracion--;
if( $this->Iteracion==0 ){
$this->txt .= "\n".eNumberFormat($this->TF).' Files / '.eNumberFormat(round($this->TByts/1024)).' Kb';
return $this->txt;
}
}
}
function SeekField( $DirBase, $buscar ){
$buscar2 = substr($buscar,0,-1).":";
$buscar3 = substr($buscar,0,-1)."{";
$di = opendir( $DirBase );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( is_dir( "{$DirBase}/{$file}" ) ){
SeekField( "{$DirBase}/{$file}", $buscar );
}else{
$NomFile = substr( $DirBase.'/'.$file, 2 );
if( substr($file,-2)=="df" ){
$verFile = true;
$dim = file("{$DirBase}/{$file}");
for($n=0; $n<count($dim); $n++ ){
$tmp = strtoupper(str_replace(" ","",$dim[$n]));
if( substr_count($tmp, "/"."/")>0 ) list($tmp) = explode("/"."/", $tmp);
if( $tmp[0]=="." || $tmp[0]=="/" ) continue;
if( $tmp[0]=="[" && (substr($tmp,0,6)=="[NOTE]" || substr($tmp,0,6)=="[EXIT]")  ) continue;
if( substr_count($tmp, $buscar)>0 || substr_count($tmp, $buscar2)>0 || substr_count($tmp, $buscar3)>0 ){
if( $verFile ){
$verFile = false;
echo "\n{$file}";
}
$tmp = trim(str_replace("\t","",$dim[$n]));
while( substr_count($tmp, "  ")>0 ) $tmp = str_replace("  "," ",$tmp);
echo "\n   {$n}: ".$tmp;
}
}
}
}
}
}
closedir( $di );
}
function DirRelativo($Aqui){
global $DirMotor, $DirAplicacionBase, $DirAplicacion, $DirAplicacionFile, $DirAplicacionDatos;
if( substr($DirMotor,1,1)==':' ) list(,$DirMotor) = explode(':',$DirMotor);
$Aqui = str_replace(chr(92), '/', $Aqui);
if( substr_count($Aqui,':')==1 ) list(,$Aqui) = explode(':',$Aqui);
if( $DirAplicacion==$Aqui ){
$Cambio = '/http/';
}else if( $DirAplicacionBase==$Aqui ){
$Cambio = '../';
}else if( substr_count($DirAplicacion,$Aqui)==1 ){
$Cambio = substr($DirAplicacion,strlen($Aqui)+1);
$tmp = explode('/',$Cambio);
$Cambio = ''.str_repeat('../',count($tmp));
}else if( substr_count($Aqui,$DirAplicacion)==1 ){
$Cambio = '/http/'.substr($Aqui,strlen($DirAplicacion)+1).'/';
}else if( substr_count($DirAplicacionFile,$Aqui)==1 ){
$tmp = explode('/',$DirAplicacionFile);
$Cambio = '../../'.$tmp[count($tmp)-1].'/'.substr($DirAplicacionFile,strlen($Aqui)+1);
}else if( substr_count($Aqui,$DirAplicacionFile)==1 ){
$tmp = explode('/',$DirAplicacionFile);
$Cambio = '../../'.$tmp[count($tmp)-1].'/'.substr($Aqui,strlen($DirAplicacionFile)+1).'/';
}else if( substr_count($DirAplicacionDatos,$Aqui)==1 ){
$tmp = explode('/',$DirAplicacionDatos);
$Cambio = '../../'.$tmp[count($tmp)-1].'/'.substr($DirAplicacionDatos,strlen($Aqui)+1);
}else if( substr_count($Aqui,$DirAplicacionDatos)==1 ){
$tmp = explode('/',$DirAplicacionDatos);
$Cambio = '../../'.$tmp[count($tmp)-1].'/'.substr($Aqui,strlen($DirAplicacionDatos)+1).'/';
}else if( substr_count($Aqui,$DirAplicacionBase)==1 ){
$Cambio = '../'.substr($Aqui,strlen($DirAplicacionBase)+1).'/';
}else if( substr_count($Aqui,$DirMotor)==1 || $Aqui.'/'==$DirMotor ){
if( $Aqui.'/'==$DirMotor ){
$Cambio = '$'.substr($DirMotor,strlen($Aqui)+1);
}else{
$tmp = str_replace( $DirMotor, '', $Aqui );
$Cambio = '$'.$tmp.'/'.substr($DirMotor,strlen($Aqui)+1);
}
}else{
$Cambio = '';
$Comando = '';
}
return $Cambio;
}
?>
