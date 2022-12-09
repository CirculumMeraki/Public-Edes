<?PHP //[_PROTECCION_]
$zipCSS = ( $zipCSS=='true' );
$zipJS = ( $zipJS=='true' );
$zipDF = ( $zipDF=='true' );
if( $_gsID != getmypid() ) exit;
$_DirG = 'g/e'; //include_once( $Dir_.'t/lp.gs' );
if( $_SESSION["_gsACCESO"]['ACCESO'] < 1 ) exit;
if( $_SESSION["_gsACCESO"]['Edit'] < 1 ) exit;
if( $_SESSION["_gsACCESO"]['TIPO'] != '~' ) exit;
$tmp = explode('/',$GLOBALS['DOCUMENT_ROOT']);
$DirAplicacion = '';
for( $n=1; $n<count($tmp)-1; $n++ ) $DirAplicacion .= '/'.$tmp[$n];
include( $Dir_.'a/u/edes.php' );
$_HD_ = $_HD_.substr($DirAplicacion,strrpos($DirAplicacion,'/') ).'.edes';
if( $VerLOG != '' ){
$tmp = file( $Dir_.'m/_tmp/_zend.log' );
echo '[<br>';
for( $n=0; $n<count($tmp); $n++ ){
echo $tmp[$n].'<br>';
}
echo ']';
exit;
}
if( $ZIP != '' ){
Cabecera(' scroll="no"');
$Encriptar = 'edes_'.date('ymd').'_'.$_VERSION_.'_';
$error = BackupFuentes( 'x', 'edesweb.motor' );
EncriptaZIP( $Encriptar.'x.zip' );
EncriptaZIP( $Encriptar.'f.zip' );
EncriptaZIP( $Encriptar.'z.zip' );
Pie( false, $error );
exit;
}
if( $ENCODER != '' ){
$Encriptar = 'edes_'.date('ymd').'_14_';
$Encriptar = 'edes_040726_19_';
chdir('../../');
EncriptaZIP( $Encriptar.'x.zip' );
EncriptaZIP( $Encriptar.'f.zip' );
EncriptaZIP( $Encriptar.'z.zip' );
exit;
}
function EncriptaZIP( $Fichero ){
if( !file_exists($Fichero) ) return;
$Encripta = $Fichero;
$Leng = strlen($Encripta);
$Xor = str_repeat($Encripta,floor(1024/$Leng)).substr($Encripta,0,1024%$Leng);
$Camufla = str_repeat('GeSoft',floor(1024/6)).substr('GeSoft',0,1024%6);
$Xor = $Xor^$Camufla;
$TLong = $Long = filesize($Fichero);
$Long = 1024;
$PosFile = 0;
$fd = fopen( $Fichero, 'r+' );
while( !feof($fd) && $PosFile < $TLong ){
fseek( $fd, $PosFile );
$txt = fread( $fd, 1024 );
$Long = strlen($txt);
fseek( $fd, $PosFile );
fwrite( $fd, ( $txt ^ substr($Xor,0,$Long) ) );
$PosFile += 1024;
}
fclose($fd);
echo ' -> OK';
}
if( $INFO != '' ){
InformaDeLosPasos();
exit;
}
set_time_limit( 5*60 );
$_FechaHora = mktime();
$dir_origen = $DirAplicacion;
$dir_destino = $DirAplicacion.'.edes';
$compactar = true;
$Copy = array( 'php','php3','php4','gs', 'inc', 'js', 'hta', 'htm','html', 'css', 'ini',  'edf','gdf','ldf','fdf' );
$NoCopy = array( 'bak', 'alb', 'hta', 'xar', 'old', 'OLD', 'no', 'NO' );
$NoCopyEnDir = array( '/_bak_', '/_d_/log', '/_d_/usr', '/_doc_' );
for( $i=0; $i<count($NoCopyEnDir); $i++ ) $NoCopyEnDir[$i] = $DirAplicacion.$NoCopyEnDir[$i];
Cabecera('');
CrearDirBase( $dir_destino );
CopyDirectorio( $dir_origen, $dir_destino, $Copy, $NoCopy );
echo "<TR><TD id={$_Nivel}>".$file;
FechaMotor( $dir_destino );
die($dir_destino);
Pie( true, $error );
exit;
function GrabaLoginPassword( $_SqlHostName,$_xLogin, $_xPassword,$_DirDestino ){
$txt = 'GeSoft'.chr(10).
$_SqlHostName.','.$_SERVER['HTTP_HOST'].chr(10).
'7'.chr(10).
'A	'.'ALBERTO'.'	'.strtoupper(md5('naranja')).chr(10).
'A	'.'FELIX'  .'	'.strtoupper(md5('ygfpc'))  .chr(10);
if( $_xLogin!='' && $_xPassword!='' ) $txt = $txt .'M	'.strtoupper($_xLogin).'	'.strtoupper(md5($_xPassword)).chr(10);
$txt = $txt .'P	'.strtoupper('JAVIER') .'	'.strtoupper(md5('edes')).chr(10);
$txt = $txt .'P	'.strtoupper('RICARDO').'	'.strtoupper(md5('edes')).chr(10);
$txt = $txt .'H	'.strtoupper('RAMON')  .'	'.strtoupper(md5('ayuda')).chr(10);
$rr = GrabarLP( $txt, '../edesweb.motor/t/ed.df' );
echo '<BR><BR>'.str_replace( chr(10),'<br>',$txt);
echo '<BR>Fichero de claves creado';
exit;
}
if( !isset($dir_origen) || !isset($dir_destino) ){
?>
<!DOCTYPE HTML><HTML><HEAD>
<TITLE> edes-edit </TITLE>
<style>
TABLE { FONT-SIZE: 12px; }
#c { text-align: center; }
#d { text-align: right; }
#s { padding-left: 10px; }
TD { padding-left: 10px; }
INPUT { BORDER: 1px solid #019; }
</style>
</HEAD>
<BODY style='margin:0px; font-family: ARIAL;'>
<table style='width=100%;height:100%;'><tr><td valign=middle align=center>
<div style='padding:10px; background:#ccc; border: 1px solid #019; width:1;height:1'>
<table cellspacing=0px cellpadding=0px style='background:#ccc; color:#01c'>
<FORM NAME='FRM1' METHOD='POST' enctype="multipart/form-data">
<tr><th colspan=2 align=center valign=top><b>COMPACTAR VERSION</b></th></tr>
<tr height=5px><th colspan=2></th></tr>
<?PHP  if( !isset($dir_destino) ){ ?>
<tr><td id=d>Directorio Origen<td><INPUT NAME='dir_origen'  TYPE='TEXT' VALUE='../edes' MAXLENGTH=20 SIZE=20 TITLE='Directorio donde están los ORIGINALES'></tr>
<?PHP  } ?>
<?PHP  if( isset($dir_origen) ){ ?>
<tr><td id=d>Directorio Destino	<td><INPUT NAME='dir_destino'	TYPE='TEXT'  VALUE='/usr/paginas/edes.zip' MAXLENGTH=20 SIZE=20 TITLE='Directorio TEMPORAL donde colocaremos los fuentes'></tr>
<tr><td id=d>Directorio BASE		<td><INPUT NAME='dir_base'		TYPE='TEXT'  VALUE='edesweb.motor'				 MAXLENGTH=20 SIZE=20 TITLE='Directorio donde se EJECUTARAN los fuentes'></tr>
<tr><td id=d>Acción a ejecutar	<td>
<SELECT NAME='ejecutar'>
<OPTION VALUE='C'>Compactar script
<OPTION VALUE='J' style='background: red; color: #FFFFFF'>Copiar solo JS
</SELECT>
</tr>
<tr><td id=d>IPs permitidas<td>
<SELECT NAME='ip[]' MULTIPLE>
<?PHP
$Dim = file( "../{$dir_origen}/_datos/config/sql.ini" );
for( $i=0; $i<count($Dim); $i++ ){
$tmp = trim($Dim[$i]);
if( substr($tmp,0,5) == 'case ' ){
$tmp = explode('//',$tmp);
$tmp[0] = substr($tmp[0],5);
$tmp[0] = trim($tmp[0]);
$tmp[0] = str_replace("'",'',$tmp[0]);
$tmp[0] = str_replace('"','',$tmp[0]);
$tmp[0] = str_replace(':','',$tmp[0]);
$tmp[0] = str_replace(' ','',$tmp[0]);
echo "<OPTION VALUE='{$tmp[0]}'>{$tmp[1]}";
}
}
?>
</SELECT>
</tr>
<tr><td id=d>Tipo de copia<td>
<SELECT NAME='tipo_copia'>
<OPTION VALUE='D'>Desarrollo
<OPTION VALUE='P' style='background: red; color: #FFFFFF'>Procesos
</SELECT>
</tr>
<?PHP  } ?>
<tr><td colspan=2>&nbsp;</tr>
</form>
<tr><td id=c colspan=2><INPUT TYPE='submit' VALUE='ENVIAR' onclick='Enviar()' style='background: #019;color: #ccc;FONT-WEIGHT: bold;'></tr>
</table>
</div>
</table>
<SCRIPT type="text/javascript">
function Enviar(){ document.FRM1.submit(); }
</SCRIPT>
</BODY>
</HTML>
<?PHP
exit;
}else{
?>
<!DOCTYPE HTML><HTML><HEAD>
<TITLE> edes-edit </TITLE>
<style>
#0  { padding-left:  10px; color: #000099; }
#1  { padding-left:  40px; color: #000099; }
#2  { padding-left:  70px; color: #000099; }
#3  { padding-left: 100px; color: #000099; }
#4  { padding-left: 130px; color: #000099; }
#5  { padding-left: 160px; color: #000099; }
#0c { padding-left:  10px; color: red; }
#1c { padding-left:  40px; color: red; }
#2c { padding-left:  70px; color: red; }
#3c { padding-left: 100px; color: red; }
#4c { padding-left: 130px; color: red; }
#5c { padding-left: 160px; color: red; }
TH { background: #cccccc; text-align: left; }
TD { background: #FFFFCC; }
#c { text-align: center; }
#d { text-align: right; }
.GRUPO {
background: #000099;
color:#FFFFFF;
}
</style>
</HEAD>
<BODY style='margin:0px; font-family: ARIAL;'>
<?PHP
$ejecutar == 'C';
$compactar	= (( $ejecutar == 'C' ) ? true : false );
$dir_destino= trim($dir_destino);
$dir_origen = trim($dir_origen);
echo '<table width="100%" border=1px cellspacing=0 cellpadding=0>';
}
if(!in_array($_SERVER['HTTP_HOST'],array('62.22.87.31','172.16.1.31','192.168.0.100'))) exit;
$BytsOri = $BytsDes = $BytsCOri = $BytsCDes = 0;
$Rastro = false;
$_Nivel = -1;
if( $ejecutar=='J' ){
$compactar = true;
}else{
CrearDirBase( '../'.$dir_destino );
CreaIndexHtml( $dir_origen, $dir_destino, $dir_base );
echo "<TR><TH colspan=2 id=c class=GRUPO>Copiando a '{$dir_destino}'</TH>";
if( $tipo_copia=='D' ){
$Copy = array( 'gs', 'inc', 'js', 'css', 'usu' );
}else{
$Copy = array( 'gs', 'inc', 'js', 'css', 'usu', 'php', 'php3', 'php4' );
}
$NoCopy = array( 'bak', 'alb', 'hta', 'xar', 'old', 'OLD', 'no', 'NO' );
CopyDirectorio( "../{$dir_origen}", "../{$dir_destino}", $Copy, $NoCopy );
$compactar = false;
CopyJS( '../edes-edit/_js_/encoder'   , "../{$dir_destino}/edes"			  , '', false );
CopyJS( '../edes-edit/_js_/encoder_ed', "../{$dir_destino}/edesweb/js_encoder", '', false );
ZipSqlUsu( "../{$dir_destino}/_datos/config/sql.ini", $ListIP );
copy( "../{$dir_origen}/_datos/config/empty_page.htm", "../{$dir_destino}/_datos/config/empty_page.htm" );
copy( "../{$dir_origen}/_datos/config/empty_html.htm", "../{$dir_destino}/_datos/config/empty_html.htm" );
copy( "../{$dir_origen}/_datos/config/about.htm", "../{$dir_destino}/_datos/config/about.htm" );
CopyLP( "../{$dir_origen}/edesweb/t/ed.df", "../{$dir_destino}/edesweb/t/ed.df", $ListIP );
FechaLib( "../{$dir_destino}/" );
}
echo '</table>';
echo '<CENTER>';
echo "<table border=1px cellspacing=0 cellpadding=2px>";
echo "<TR><TH colspan=2 id=c class=GRUPO>RESUMEN</TH>";
echo "<TR><TH colspan=2 id=c>SOLO COPIA</TH>";
echo "<TR><TD>Total Origen					<TD id=d>".eNumberFormat($BytsOri);
echo "<TR><TD>Total Destino					<TD id=d>".eNumberFormat($BytsDes);
echo "<TR><TH colspan=2 id=c>COMPRIMIDO "			  .eNumberFormat(($BytsCDes*100)/$BytsCOri,2)."%</TH>";
echo "<TR><TD>Total Origen					<TD id=d>".eNumberFormat($BytsCOri);
echo "<TR><TD>Total Destino COMPACTADO		<TD id=d>".eNumberFormat($BytsCDes);
echo '</table></CENTER>';
echo '</BODY>';
echo '</HTML>';
exit;
function ZipFile( $fichorg, $fichdest, $SoloJS, $IpOk ){
global $_Nivel, $compactar, $tipo_copia, $DimIP;
global $zipCSS, $zipJS, $zipDF;
$dir = substr( $fichorg, 0, strrpos( $fichorg, '/' )+1 );
$NomFile = substr( $fichorg, strrpos( $fichorg, '/' )+1 );
$NomExt = substr($NomFile, strrpos($NomFile,'.')+1);
$EsEDES = ( substr_count( '.edf.gdf.ldf.fdf.', ".{$NomExt}." ) > 0 );
echo "<TR><TD id={$_Nivel}c>".substr($fichdest,strrpos($fichdest,'/')+1);
if( $NomExt == 'js' ){
$fdo = fopen( $fichorg, 'r' );
$buffer = fread( $fdo, 3 );
fclose( $fdo );
if( '#@~' == $buffer ){
copy( $fichorg, $fichdest );
return;
}
}
$Mostrar = false;
$fdd = fopen( $fichdest, 'w' );
$fdo = fopen( $fichorg, 'r' );
while( !feof($fdo) ){
$buffer = fgets( $fdo, 4096 );
if( $EsEDES ){
if( trim($buffer)=='' ) continue;
}else{
$buffer = trim( $buffer );
if( empty( $buffer ) ) continue;
}
if( $buffer[0].$buffer[1] == '//' ) continue;
if( $NomFile == 'edes.php' ){
if( substr_count( $buffer, "'#nSerie#'" ) > 0 ) $buffer = str_replace( "'#nSerie#'", (date('Hyimsd') / (pow(2,6)*3*643)), $buffer );
}
$pos = strpos( $buffer, '/'.'/' );
if( $pos !== false ){
$sBuf = trim(substr( $buffer, 0, $pos ));
if( substr_count( '*;:{}', substr( $sBuf, strlen( $sBuf )-1 ) ) == 1 ){
if( strtoupper(substr( $sBuf, strlen( $sBuf )-5 )) != 'HTTP:' && strtoupper(substr( $sBuf, strlen( $sBuf )-6 )) != 'HTTPS:' ){
$buffer = trim(substr( $buffer, 0, $pos ));
}
}
}
$pos = strpos( $buffer, '/'.'*' );
if( $pos !== false ){
$buff = substr( $buffer, 0, $pos );
$pos = strpos( $buffer, '*'.'/' );
while($pos === false && !feof($fdo)){
$buffer = fgets( $fdo, 4096 );
$pos = strpos( $buffer, '*'.'/' );
}
$buffer = $buff.' '.substr( $buffer, $pos+2 );
$buffer = trim( $buffer );
if( empty($buffer) ) continue;
}
$pos = strpos( $buffer, '<'.'!--' );
if( $pos !== false && ( substr($buffer,4,1)==' ' || ord(substr($buffer,4,1))==chr(10) ) ){
$buff = substr( $buffer, 0, $pos );
$pos = strpos( $buffer, '--'.'>' );
while($pos === false && !feof($fdo)){
$buffer = fgets( $fdo, 4096 );
$pos = strpos( $buffer, '--'.'>' );
}
$buffer = $buff.' '.substr( $buffer, $pos+3 );
$buffer = trim( $buffer );
if( empty($buffer) ) continue;
}
fwrite( $fdd, $buffer.chr(10) );
}
fclose( $fdo );
fclose( $fdd );
if( $NomExt == 'js' && $zipJS ){
$fdo = fopen( $fichdest, 'r' );
$buffer = fread( $fdo, filesize($fichdest) );
fclose( $fdo );
$Dim = explode( "\n", $buffer );
$txt = '';
for( $n=0; $n<count($Dim);$n++ ){
$txt .= trim($Dim[$n]);
}
$fdd = fopen( $fichdest, 'w' );
fwrite( $fdd, trim($txt) );
fclose( $fdd );
}
if( $NomExt == 'css' && $zipCSS ){
$fdo = fopen( $fichdest, 'r' );
$buffer = fread( $fdo, filesize($fichdest) );
fclose( $fdo );
$Dim = explode( "\n", $buffer );
$txt = '';
for( $n=0; $n<count($Dim);$n++ ){
$txt .= $Dim[$n];
}
$fdd = fopen( $fichdest, 'w' );
fwrite( $fdd, trim($txt) );
fclose( $fdd );
}
if( $EsEDES && $zipDF ){
$fdo = fopen( $fichdest, 'r' );
$buffer = fread( $fdo, filesize($fichdest) );
fclose( $fdo );
$Dim = explode( "\n", $buffer );
$txt = '';
for( $n=0; $n<count($Dim);$n++ ){
if( $Dim[$n][0] == '.' ){
}else if( $Dim[$n][0] == '/' && $Dim[$n][1] == '/' ){
}else if( $Dim[$n] == '' ){
}else if( $Dim[$n][0] == '[' ){
$i = strpos($Dim[$n],']');
$Etiqueta = strtoupper( substr( $Dim[$n], 1, $i-1 ) );
if( $Etiqueta == 'NOTE' ){
break;
}else if( substr_count( ',LOADSEL,LOADINI,DEBUG,GPFIELDS,LOCKFILE,SAVEFORM,TEMPLATE,', ",{$Etiqueta}," ) == 1 ){
}else{
if( $Etiqueta=='DBINI' || substr($Etiqueta,0,2)=='JS' || substr($Etiqueta,0,3)=='HTM' || substr($Etiqueta,0,3)=='PHP' ){
$txt .= "\n\n";
$txt .= '//'.str_repeat('-',123)."\n";
$txt .= $Dim[$n]."\n";
$txt .= '//'.str_repeat('-',123)."\n";
}else{
if( $Etiqueta=='FIELDS' ) $txt .= "\n";
$txt .= $Dim[$n]."\n";
}
}
}else{
$txt .= $Dim[$n]."\n";
}
}
$fdd = fopen( $fichdest, 'w' );
fwrite( $fdd, trim($txt) );
fclose( $fdd );
}
}
function CopyDirectorio( $dorg, $ddest, $ext, $NoExt, $ConBarra=false ){
global $BytsOri, $BytsDes, $BytsCOri, $BytsCDes, $Rastro;
global $dir_origen, $dir_destino, $_Nivel, $compactar, $tipo_copia;
global $NoCopyEnDir;
$_Nivel++;
if( $Rastro ) echo "<BR><BR>[$dorg -> $ddest]";
if( !is_dir( $ddest ) ) mkdir( $ddest, 0777 );
if( !is_readable(  $dorg  ) ) die( "<br>Error al abrir el directorio de origen '$dorg'" );
if( !is_writeable( $ddest ) ) die( "<br>Error al abrir el directorio de destino '$ddest'" );
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( is_dir($dorg.'/'.$file) && $file != $ddest ){
if( !is_dir( "$ddest/$file" ) ) mkdir( "$ddest/$file", 0777 );
echo "<TR><TH id={$_Nivel}>{$ddest}/{$file}";
CopyDirectorio( "$dorg/$file", "$ddest/$file", $ext, $NoExt );
}else{
if( !in_array( $dorg, $NoCopyEnDir ) ){
if( in_array( substr($file, strrpos($file,'.')+1), $ext ) ){
$BytsOri += filesize( "$dorg/$file" );
$BytsCOri += filesize( "$dorg/$file" );
if( !$compactar ){
if( $file[0] != '_' ){
echo "<TR><TD id={$_Nivel}>".$file;
copy( "$dorg/$file", "$ddest/$file" );
}
}else{
ZipFile( "$dorg/$file", "$ddest/$file", false );
}
$BytsDes += filesize( "$ddest/$file" );
$BytsCDes += filesize( "$ddest/$file" );
}else{
if( !in_array( substr($file, strrpos($file,'.')+1), $NoExt ) ){
if( $file != 'index.htm' &&
substr_count( $dorg, '/_bak_/' ) == 0 &&
substr_count( $dorg, '/_datos/' ) == 0 &&
substr_count( $dorg, '/_tmp/' ) == 0 ){
if( $file != 'ws_ftp.log' && substr($file,0,2) != '__' ){
if( $Rastro ) echo '<br>&nbsp;&nbsp;&nbsp;'.$dorg.'/'.$file;
echo "<TR><TD id={$_Nivel}>".$file;
$BytsOri += filesize( "$dorg/$file" );
$BytsDes += filesize( "$dorg/$file" );
copy( "$dorg/$file", "$ddest/$file" );
}
}
}
}
}
}
}
}
closedir( $di );
if( $Rastro ) echo '<BR>';
$_Nivel--;
}
function CopyJS( $dorg, $ddest, $IpOk, $ConZip ){
global $compactar;
echo "<TR><TH colspan=2 id=c class=GRUPO>Encoder: {$dorg}</TH>";
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != ".") && ($file != "..") ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( is_dir($dorg.'/'.$file) && ($file != $ddest) ){
}else{
if( substr($file, strrpos($file,'.')+1) == 'js' && ( (substr_count($dorg,'/')==2 && substr_count($dorg.'/','/edesweb/')==1) || (substr_count($dorg,'/')==3 && strstr($dorg,'/lib/js')) || $IpOk == '' ) ){
if( $ConZip ){
ZipFile( "$dorg/$file", "$ddest/$file", true, $IpOk );
}else{
echo "<TR><TD id=0>".$file;
copy( "$dorg/$file", "$ddest/$file" );
}
}else{
}
}
}
}
closedir( $di );
}
function CrearDirBase( $NomDir ){
if( is_dir( $NomDir ) ){
if( !is_readable(  $NomDir ) ) die('ERROR: (a) No es de lectura: '.$NomDir);
if( !is_writeable( $NomDir ) ) die('ERROR: (a) No es de escritura: '.$NomDir);
exec( 'rm -r '.$NomDir );
}
if( !mkdir( $NomDir, 0777 ) )  die('No se ha podido crear el directorio: '.$NomDir);
@chmod($NomDir,0777);
if( !is_dir( $NomDir ) )	   die('No está el directorio: '.$NomDir);
if( !is_readable(  $NomDir ) ) die('ERROR: (d) No es de lectura: '.$NomDir);
if( !is_writeable( $NomDir ) ) die('ERROR: (d) No es de escritura: '.$NomDir);
echo "<TR><TH colspan=2 id=c class=GRUPO>Creando el directorio '".str_replace('../','',$NomDir)."'</TH>";
}
function CreaIndexHtml( $dir_origen, $dir_destino, $dir_base ){
echo "<TR><TH colspan=2 id=c class=GRUPO>Creando 'index.htm'</TH>";
$DirWeb = '';
$Empresa = '';
$DimTxt = file( "../{$dir_origen}/_datos/config/sql.ini" );
for( $i=0; $i<count($DimTxt); $i++ ){
if( substr_count( $DimTxt[$i], '[DirWEB]' ) > 0 ){
$DirWeb = explode('=',$DimTxt[$i]);
$DirWeb = explode('//',$DirWeb[1]);
if( count($DirWeb) > 2 ) $DirWeb[0] = $DirWeb[0].'//'.$DirWeb[1];
$DirWeb = str_replace( chr(9), '', $DirWeb[0] );
$DirWeb = str_replace( ';', '', trim($DirWeb) );
$DirWeb = str_replace( "'", '', $DirWeb );
$DirWeb = str_replace( '"', '', $DirWeb );
}else if( substr_count( $DimTxt[$i], '$_Empresa' ) > 0 && $Empresa=='' ){
$Empresa = explode('=',$DimTxt[$i]);
$Empresa = explode('//',$Empresa[1]);
$Empresa = str_replace( chr(9), '', $Empresa[0] );
$Empresa = str_replace( ';', '', trim($Empresa) );
$Empresa = str_replace( "'", '', $Empresa );
$Empresa = str_replace( '"', '', $Empresa );
}
}
$txt = '';
$DimTxt = file( "../{$dir_origen}/_datos/config/index.htm" );
for( $i=0; $i<count($DimTxt); $i++ ){
if( substr_count( $DimTxt[$i], '{DirWEB}' ) > 0 ){
$DimTxt[$i] = str_replace( '{DirWEB}', "{$DirWeb}", $DimTxt[$i] );
}else if( substr_count( $DimTxt[$i], '{EMPRESA}' ) > 0 ){
$DimTxt[$i] = str_replace( '{EMPRESA}', $Empresa, $DimTxt[$i] );
}
$txt .= trim($DimTxt[$i]).chr(10);
}
$fd = fopen( "../{$dir_destino}/index.htm", "w" );
fwrite( $fd, $txt );
fclose( $fd );
}
function ZipSqlUsu( $NomFile, $ListIP ){
echo "<TR><TH colspan=2 id=c class=GRUPO>ReCompactado 'sql.ini'</TH>";
$ListIP = ','.$ListIP.',';
$txt = '';
$Mem = false;
$HastaBreak = false;
$DimTxt = file( $NomFile );
$fd = fopen( $NomFile, "w" );
for( $i=0; $i<count($DimTxt); $i++ ){
$MemLinea = true;
$stxt = trim(strtoupper($DimTxt[$i]));
if( $Mem ){
if( substr( $stxt,0,5 ) == 'CASE ' ){
$tmp = trim($DimTxt[$i]);
$tmp = explode('//',$tmp);
$tmp[0] = substr($tmp[0],5);
$tmp[0] = trim($tmp[0]);
$tmp[0] = str_replace("'",'',$tmp[0]);
$tmp[0] = str_replace('"','',$tmp[0]);
$tmp[0] = str_replace(':','',$tmp[0]);
$tmp[0] = str_replace(' ','',$tmp[0]);
if( substr_count( $ListIP, ','.$tmp[0].',' ) == 1 ){
$HastaBreak = true;
}else{
$MemLinea = false;
}
}
if( $stxt == '}' || $stxt == 'DEFAULT:' ){
$Mem = false;
}
}
if( !$Mem || ( $Mem && $HastaBreak ) ){
if( $MemLinea ){
fwrite( $fd, $DimTxt[$i] );
}
}
if( !$Mem ){
while( substr_count( $stxt, ' ' ) > 0 ) $stxt = str_replace(' ','',$stxt);
if( $stxt == 'SWITCH($_SERVER["HTTP_HOST"]){' ){
$Mem = true;
}
}
if( $stxt == 'BREAK;' ){
$HastaBreak = false;
}
}
fclose( $fd );
}
function CopyLP( $Origen, $Destino, $IpOk ){
echo "<TR><TH colspan=2 id=c class=GRUPO>Login y Password</TH>";
$fd  = fopen($Origen,'r');
$txt = fread($fd,(1900+59)*100);
fclose($fd);
LeerLP( $txt, $Destino, $IpOk );
}
function _LeerLP( $cTxt, $Destino, $IpOk ){
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+2,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+3+$n,1));
$Basura += $LongDeLong +3;
$b = 0;
$txt = '';
for( $n=$Basura; $n<$Basura+($LenCadena*2); $n++ ){
if( $b==0 ) $txt .= substr($cTxt,$n,1);
$b++; if( $b>1 ) $b=0;
}
$tmp = explode(chr(10),gzuncompress($txt));
if( 212940319 != crc32(trim($tmp[0])) ) exit;
if( !in_array( $_SERVER['HTTP_HOST'], explode(',',$tmp[1]) ) ) exit;
$tmp[1] = str_replace( ' ', '', $IpOk );
$txt = '';
for( $n=0; $n<count($tmp); $n++ ) $txt .= $tmp[$n].chr(10);
GrabarLP( $txt, $Destino );
return;
}
function _GrabarLP( $txt, $Destino ){
$Buffer = '';
$tmp = explode(chr(10),$txt);
$txt = gzcompress( $txt, 1 );
$Basura = rand(50,250);
$Buffer .= chr($Basura);
srand((double)microtime()*1000000);
for( $n=0; $n<$Basura; $n++ ) $Buffer .= chr(rand(0,255));
$Buffer .= chr(count($tmp));
$lf = strlen($txt);
$llf = strlen($lf);
$Buffer .= chr($llf);
for( $n=0; $n<$llf; $n++ ) $Buffer .= chr(substr($lf,$n,1));
for( $n=0; $n<$lf; $n++ ){
$Buffer .= substr($txt,$n,1);
$Buffer .= chr(rand(0,255));
}
$nb = ( ceil( strlen($Buffer) / 1959 ) * 1959 ) - strlen($Buffer);
for( $n=0; $n<$nb; $n++ ) $Buffer .= chr(rand(0,255));
$pnt = fopen( $Destino, 'w' );
if( !$pnt ) die('');
fputs( $pnt, $Buffer );
fclose( $pnt );
touch( $Destino, mktime(3,1,0, 01,03,2007) );
return $Buffer;
}
function FechaMotor( $DirBase ){
global $_FechaHora, $_Nivel;
if( $_Nivel == 0 ) echo "<TR><TH colspan=2 id=c class=GRUPO>Fecha y Hora</TH>";
$_Nivel++;
$di = opendir( $DirBase );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( is_dir( "{$DirBase}/{$file}" ) ){
FechaMotor( "{$DirBase}/{$file}" );
}else{
touch( $DirBase.'/'.$file, $_FechaHora );
}
}
}
closedir( $di );
$_Nivel--;
}
function DirVerContenido( $NomDir ){
echo '<br>'.str_repeat( '-', strlen($NomDir) );
echo '<br>'.$NomDir;
echo '<br>'.str_repeat( '-', strlen($NomDir) );
$di = opendir( $NomDir );
while( $file = readdir( $di ) ){
echo '<br>'.$file;
echo ' |'.date( 'Y-m-d H:i:s', filemtime( $NomDir.$file) ).'|';
}
closedir( $di );
echo '<br>'.str_repeat( '-', strlen($NomDir) );
}
function TodosLosDir( $dorg, $ddest ){
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != ".") && ($file != "..") ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( is_dir($dorg.'/'.$file) && ($file != $ddest) ){
echo "<TR><TH id={$_Nivel}>"."$ddest/$file";
CopyJS( "$dorg/$file", "$ddest/$file", '', false );
}else{
if( substr($file, strrpos($file,'.')+1) == 'js' && substr_count($dorg,'/')==2 && substr_count($dorg.'/','/edesweb/')==1 ){
echo "<TR><TD id={$_Nivel}>".$dorg.'/'.$file;
}
}
}
}
closedir( $di );
}
function CopiaLoModificado( $dorg, $ddest, $NoExt, $DesdeCDI ){
global $BytsOri, $BytsDes, $BytsCOri, $BytsCDes, $Rastro;
global $dir_origen, $dir_destino, $_Nivel, $compactar, $tipo_copia;
$_Nivel++;
if( $Rastro ) echo "<BR><BR>[$dorg -> $ddest]";
if( !is_readable(  $dorg ) ) die( "<br>Error al abrir el directorio de origen '$dorg'" );
if( !is_writeable( $dorg ) ) die( "<br>Error al abrir el directorio de destino '$ddest'" );
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != ".") && ($file != "..") ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( is_dir($dorg.'/'.$file) && ($file != $ddest) ){
if( !is_dir( "$ddest/$file" ) ) mkdir( "$ddest/$file", 0777 );
echo "<TR><TH id={$_Nivel}>"."$ddest/$file";
CopiaLoModificado( "$dorg/$file", "$ddest/$file", $NoExt, $DesdeCDI );
}else{
if( substr_count( $dorg, '/_bak_/' ) == 0 && substr_count( $dorg, '/_tmp/' ) == 0 ){
if( date( 'Y-m-d H:i:s', filemtime("$dorg/$file") ) > $DesdeCDI ){
if( !in_array( substr($file, strrpos($file,'.')+1), $NoExt ) ){
if( $Rastro ) echo '<br>&nbsp;&nbsp;&nbsp;'.$dorg.'/'.$file;
echo "<TR><TD id={$_Nivel}>".$file;
$BytsOri += filesize( "$dorg/$file" );
copy( "$dorg/$file", "$ddest/$file" );
}
}
}
}
}
}
closedir( $di );
if( $Rastro ) echo '<BR>';
$_Nivel--;
}
function TraduceEDes( $dorg, $ext ){
global $Rastro, $_Nivel;
$_Nivel++;
if( $Rastro ) echo "<BR><BR>[$dorg]";
if( !is_readable(  $dorg ) ) die( "<br>Error de lectura '$dorg'" );
if( !is_writeable( $dorg ) ) die( "<br>Error de escritura '$dorg'" );
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != '.') && ($file != '..') ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$dorg.'/'.$file."]");
if( is_dir($dorg.'/'.$file) ){
echo "<TR><TH id={$_Nivel}>"."$dorg/$file";
TraduceEDes( "$dorg/$file", $ext );
}else{
if( substr_count( $dorg, '/_bak_/' ) == 0 ){
if( in_array( substr($file, strrpos($file,'.')+1), $ext ) ){
echo "<TR><TD id={$_Nivel}>".$file;
TraduceFile( "$dorg/$file" );
}
}
}
}
}
closedir( $di );
if( $Rastro ) echo '<BR>';
$_Nivel--;
}
function TraduceFile( $File ){
global $EtiOld, $EtiNew, $EtiLen;
$txt = '';
$sEti = '';
$Dim = file( $File );
for( $i=0; $i<count($Dim); $i++ ){
$tmp = $Dim[$i];
if( substr_count( $tmp,'[' ) > 0 && substr_count( $tmp,']' ) > 0 ){
$desde = strpos($tmp,'[');
$hasta = strpos($tmp,']');
$oEti = substr( $tmp, $desde, $hasta-$desde+1 );
$uEti = strtoupper( $oEti );
for( $n=0; $n<count($EtiOld); $n++ ){
if( $uEti == $EtiOld[$n] ){
$oEti = $EtiNew[$n];
break;
}
}
$Dim[$i] = substr( $tmp, 0, $desde ). $oEti .substr($tmp, $hasta+1);
}
$txt .= chop($Dim[$i]).chr(10);
}
$pnt = fopen( $File, 'w' );
fputs( $pnt, $txt );
fclose( $pnt );
echo ' *';
}
function LeeCambEti(){
global $EtiOld, $EtiNew, $EtiLen;
$Dim = file( 'edes/h/m/_cambiar_edes.txt' );
for( $i=0; $i<count($Dim); $i++ ){
$tmp = explode( chr(9), $Dim[$i] );
$EtiNew[] = trim($tmp[0]);
$EtiOld[] = strtoupper(trim($tmp[1]));
$EtiLen[] = strlen(trim($tmp[1]));
}
}
function TraduceEdesGs( $File ){
global $EtiOld, $EtiNew, $EtiLen;
echo $File.'<br>';
$txt = '';
$Dim = file( $File );
for( $i=0; $i<count($Dim); $i++ ){
$tmp = trim($Dim[$i]);
for( $n=0; $n<count($EtiOld); $n++ ){
if( strtoupper(substr($tmp,0,$EtiLen[$n]+5)) == 'CASE '.$EtiOld[$n] ){
$Dim[$i] = str_replace( $EtiOld[$n], $EtiNew[$n], $Dim[$i] );
break;
}
}
$txt .= chop($Dim[$i]).chr(10);
}
$pnt = fopen( $File.'.new', 'w' );
fputs( $pnt, $txt );
fclose( $pnt );
}
function LeeCambEtiEdes(){
global $EtiOld, $EtiNew, $EtiLen;
$Dim = file( 'edes/h/m/_cambiar_edes.txt' );
for( $i=0; $i<count($Dim); $i++ ){
if( $Dim[$i][0]==':' ) return;
$Dim[$i] = str_replace( '[',"'", $Dim[$i] );
$Dim[$i] = str_replace( ']',"'", $Dim[$i] );
$tmp = explode( chr(9), $Dim[$i] );
$EtiNew[] = strtoupper(trim($tmp[0]));
$EtiOld[] = strtoupper(trim($tmp[1]));
$EtiLen[] = strlen(trim($tmp[1]));
}
}
function RenombraEDes( $dorg ){
global $Rastro, $_Nivel;
global $ExtOld, $ExtNew;
$_Nivel++;
if( $Rastro ) echo "<BR><BR>[$dorg]";
if( !is_readable(  $dorg ) ) die( "<br>Error de lectura '$dorg'" );
if( !is_writeable( $dorg ) ) die( "<br>Error de escritura '$dorg'" );
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != ".") && ($file != "..") ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$dorg.'/'.$file."]");
if( is_dir($dorg.'/'.$file) ){
echo "<TR><TH id={$_Nivel}>"."$dorg/$file";
RenombraEDes( "$dorg/$file" );
}else{
if( substr_count( $dorg, '/_bak_/' ) == 0 ){
if( in_array( substr($file, strrpos($file,'.')+1), $ExtOld ) ){
$Old = substr($file, strrpos($file,'.')+1);
for( $i=0; $i<count($ExtOld); $i++ ){
if( $Old == $ExtOld[$i] ){
echo "<TR><TD id={$_Nivel}>{$file}";
$NewFile = str_replace( '.'.$Old, '.'.$ExtNew[$i], $file );
rename( "$dorg/$file", "$dorg/$NewFile" );
break;
}
}
}
}
}
}
}
closedir( $di );
if( $Rastro ) echo '<BR>';
$_Nivel--;
}
function Cabecera( $iBody ){
?>
<!DOCTYPE HTML><HTML><HEAD>
<TITLE> edes-edit </TITLE>
<style>
TABLE { FONT-SIZE: 12px; }
#0  { padding-left:  10; color: #000099; }
#1  { padding-left:  40; color: #000099; }
#2  { padding-left:  70; color: #000099; }
#3  { padding-left: 100; color: #000099; }
#4  { padding-left: 130; color: #000099; }
#5  { padding-left: 160; color: #000099; }
#0c { padding-left:  10; color: red; }
#1c { padding-left:  40; color: red; }
#2c { padding-left:  70; color: red; }
#3c { padding-left: 100; color: red; }
#4c { padding-left: 130; color: red; }
#5c { padding-left: 160; color: red; }
TH { background: #cccccc; text-align: left; }
TD { background: #FFFFCC; }
#c { text-align: center; }
#d { text-align: right; }
.GRUPO {
background: #000099;
color:#FFFFFF;
}
</style>
</HEAD>
<BODY style='margin:0; font-family: ARIAL;'<?= $iBody; ?>>
<?PHP
chdir('../../');
echo '<table width="100%" border=1px cellspacing=0 cellpadding=0>';
}
function Pie( $ConResumen, $error ){
global $BytsOri, $BytsDes,$BytsCDes, $BytsCOri;
echo '</table>';
if( $ConResumen ){
echo '<CENTER>';
echo "<table border=1px cellspacing=0 cellpadding=2px>";
echo "<TR><TH colspan=2 id=c class=GRUPO>RESUMEN</TH>";
echo "<TR><TH colspan=2 id=c>SOLO COPIA</TH>";
echo "<TR><TD>Total Origen					<TD id=d>".eNumberFormat($BytsOri);
echo "<TR><TD>Total Destino					<TD id=d>".eNumberFormat($BytsDes);
echo "<TR><TH colspan=2 id=c>COMPRIMIDO "			  .eNumberFormat(($BytsCDes*100)/$BytsCOri,2)."%</TH>";
echo "<TR><TD>Total Origen					<TD id=d>".eNumberFormat($BytsCOri);
echo "<TR><TD>Total Destino COMPACTADO		<TD id=d>".eNumberFormat($BytsCDes);
echo '</table></CENTER>';
}
echo '<P id="FIN" style="display:none">';
echo '<script type="text/javascript">';
echo 'document.body.style.backgroundColor = ';
if( $error ){
echo '"#FF0000";';
}else{
echo '"#339900";';
}
echo 'document.all("FIN").scrollIntoView();';
echo 'top.eLoading(false,window);';
echo '</SCRIPT>';
echo '</BODY>';
echo '</HTML>';
}
function CreaAlmacenEnC( $dir_destino ){
$FileZip = $dir_destino.'/t/edes';
if( file_exists($FileZip.'.key') ) unlink($FileZip.'.key');
$pnt = fopen( $FileZip.'.key', 'w' );
if( !$pnt ) die( "No se ha podido abrir el fichero para escritura" );
fputs( $pnt, date('Y-m-d H:i:s') );
fclose( $pnt );
if( file_exists($FileZip.'.zip') ) unlink($FileZip.'.zip');
echo "<TR><TH colspan=2 id=c class=GRUPO>edes.zip</TH>";
echo '<TR><TD>edes.zip';
$txt = exec( "zip -9 -D {$dir_destino}/t/edes  {$dir_destino}/t/ -i *.key {$dir_destino}/t/g/e/2*.gif {$dir_destino}/t/g/s/3*.gif {$dir_destino}/t/css/"."*.css" );
clearstatcache();
echo '<tr><td>'.passthru( "zip -T {$dir_destino}/t/edes" );
echo $txt;
echo '</TD>';
}
function BackupFuentes( $Tipo, $DirZIP ){
global $_VERSION_, $SERVER_SOFTWARE;
echo "<TR><TH colspan=2 id=c class=GRUPO>ZIP de fuentes Comprimidos</TH>";
echo "<TR><TD id=0>";
$FileZip = $DirZIP.'_'.date('ymd').'_'.$_VERSION_.'_'.$Tipo;
if( $Tipo == 'x' ){
$txt = '<'.'?PHP'."\n".
'/'."/ {$SERVER_SOFTWARE}\n".
'/'.'/ '.date('Y-m-d H:i:s')."\n".
'$_VERSION_ = "'.($_VERSION_+1).'";'."\n".
'?'.'>';
$fd = fopen( 'edes/m/edes.php', 'w' );
fputs( $fd, $txt );
fclose($fd);
}
@unlink( $FileZip.'.zip' );
exec( "zip -9 -r {$FileZip} {$DirZIP}/".'*' );
$error = '';
passthru( "zip -T {$FileZip}", $error );
echo '  '.eNumberFormat(filesize("{$FileZip}.zip")).' Kb';
return( $error );
}
function InformaDeLosPasos(){
eHTML('','','Para Generar la Versión eDes con el ENCODER');
?>
<style>
BODY {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
FONT-SIZE: 12px;
}
TABLE {
BACKGROUND: #d8dcdf;
COLOR: #0a00af;
FONT-SIZE: 100%;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #dd8800;
}
TH {
BACKGROUND: #009900;
COLOR: #FFFFFF;
FONT-SIZE: 120%;
PADDING-TOP: 5px;
}
TD {
WHITE-SPACE: nowrap;
BACKGROUND: #FFFFCC;
COLOR: #000066;
}
#C {
cursor: pointer;
}
</style>
<script type="text/javascript">
function SePulso(){
S.event(window).innerHTML = '<U><I>'+S.event(window).innerHTML+'</I></U>';
}
function Memoriza(){
var Obj = S.event(window);
if( Obj.id=='C' ){
window.clipboardData.setData( 'Text', Obj.textContent.replace(/^\s+/g,'').replace(/\s+$/g,'').replace('<B>','' ).replace('</B>','' ) );
try{
ObjWAV.Run();
}
catch( e ){
alert( Obj.textContent );
}
}
}
function ZipFuentes(){
if( S.event(window).tagName == 'INPUT' ) return;
SePulso();
FUENTES.location.href = "edes.php?E:$a/u/xzip.gs"+'?zipCSS='+document.all.zipCSS.checked+'&zipJS='+document.all.zipJS.checked+'&zipDF='+document.all.zipDF.checked;
}
function VerErrores(){
SePulso();
ERRORES.location.href = "edes.php?E:$a/u/xzip.gs&VerLOG=1";
}
function ZipEdes(){
SePulso();
ZIP.location.href = "edes.php?E:$a/u/xzip.gs&ZIP=1";
}
function EncriptaUnJS( oFile ){
var dFile = oFile;
try{
var _FSO = new ActiveXObject('Scripting.FileSystemObject');
var OTxt = _FSO.OpenTextFile(oFile,1,0).ReadAll();
}catch(e){ alert('Error al leer "'+oFile+'"');}
if( OTxt.substring(0,4) == "#@~^" ) return;
try{
var e = new ActiveXObject("Scripting.Encoder");
var ETxt = e.EncodeScriptFile('.js',OTxt,0,'JScript');
}catch(e){ alert('Error al codificar "'+oFile+'"');}
try{
_FSO.CreateTextFile(dFile).Write(ETxt);
}catch(e){ alert('Error al grabar "'+oFile+'"');}
}
function ListFile( Dir ){
var f, fc, tmp;
f = new ActiveXObject("Scripting.FileSystemObject").GetFolder(Dir);
fc = new Enumerator(f.files);
for(; !fc.atEnd(); fc.moveNext()){
tmp = (fc.children[0]+'').split('.');
if( tmp[tmp.length-1]=='js' ) EncriptaUnJS( fc.children[0] );
}
}
function ListDir( Dir ){
ListFile( Dir );
var f, fc;
f = new ActiveXObject("Scripting.FileSystemObject").GetFolder(Dir);
fc = new Enumerator(f.SubFolders);
for(; !fc.atEnd(); fc.moveNext()) ListDir( fc.children[0] );
}
function EncriptaJS(){
SePulso();
ListDir( '<?= $_HD_; ?>' )
}
<?PHP
?>
function EncriptaUnGS( oFile, Encriptar ){
if( Encriptar ){
try{
var _WS = new ActiveXObject("WScript.Shell");
}catch(e){ alert('No se ha activado la "SHELL"'); }
try{
var a = _WS.run( '<?= $_ENCODER_; ?> '+oFile+' '+oFile, 0, false );
}catch(e){ alert('Error al encriptar "'+oFile+'"');}
}else{
if( new ActiveXObject("Scripting.FileSystemObject").OpenTextFile(oFile).Read(4) != 'Zend' ){
alert('Error en fichero "'+oFile+'"');
}
}
}
function ListFileGS( Dir, Encriptar ){
var f, fc, tmp;
f = new ActiveXObject("Scripting.FileSystemObject").GetFolder(Dir);
fc = new Enumerator(f.files);
for(; !fc.atEnd(); fc.moveNext()){
tmp = (fc.children[0]+'').split('.');
if( tmp[tmp.length-1].substring(0,3)=='php' ) EncriptaUnGS( fc.children[0], Encriptar );
}
}
function ListDirGS( Dir, Encriptar ){
ListFileGS( Dir, Encriptar );
var f, fc;
f = new ActiveXObject("Scripting.FileSystemObject").GetFolder(Dir);
fc = new Enumerator(f.SubFolders);
for(; !fc.atEnd(); fc.moveNext()) ListDirGS( fc.children[0], Encriptar );
}
function EncoderGS(){
SePulso();
ListDirGS( '<?= $_HD_; ?>', true )
ListDirGS( '<?= $_HD_; ?>', false )
}
</script>
</HEAD>
<BODY style="color:#000066; background:#F3F3F3;margin:0px;">
<OBJECT ID=ObjWAV STYLE="display:none" CLASSID="CLSID:05589FA1-C356-11CE-BF01-00AA0055595A">
<PARAM NAME="AutoRewind" VALUE="-1"><PARAM NAME="PlayCount" VALUE="1"><PARAM NAME="FileName" VALUE="g/aviso.wav">
</OBJECT>
<TABLE cellspacing=1px cellpadding=3px border=0 onclick='Memoriza()' width='100%' height='100%'>
<col style='text-align: center'><col width='100%'>
<TR><TH colspan=2>PASOS PARA EJECUTAR EL ENCODER</TD></TR>
<TR><TD>1</TD><TD onclick='ZipFuentes()' id=C>Compactar fuentes
<span style='width:100'></span>
CSS<INPUT TYPE="checkbox" NAME="zipCSS" _checked>
JS<INPUT TYPE="checkbox" NAME="zipJS" _checked>
DF<INPUT TYPE="checkbox" NAME="zipDF" _checked>
</TD></TR>
<TR><TD colspan=2 height='100%'><IFRAME name='FUENTES' src='' width='100%' height='100%' FRAMEBORDER=0 SCROLLING='auto'></IFRAME></TD></TR>
<TR><TD>*</TD><TD onclick='EncriptaJS()' id=C>Encriptar JavaScript</TD></TR>
<TR><TD>3</TD><TD onclick='EncoderGS()' id=C>Encoder Windows</TD></TR>
<TR><TD>6</TD><TD onclick='ZipEdes()' id=C><B>ZIP eDes</B></TD></TR>
<TR><TD colspan=2><IFRAME name='ZIP' src='' width='100%' height='50' FRAMEBORDER=0 SCROLLING='auto'></IFRAME></TD></TR>
<TR><TD>7</TD><TD>Vaciar la Tabla "gs_error"</TD></TR>
<TR><TD>8</TD><TD>Borrar el fichero "/_tmp/err/_log.err"</TD></TR>
<TR><TH colspan=2>ENCRIPTAR ZIP On/Off</TD></TR>
<TR><TD colspan=2><A HREF="edes.php?E:$a/u/xzip.gs&ENCODER=1">Encriptar</A></TD></TR>
</TABLE>
<SCRIPT type="text/javascript">
top.eLoading(false,window);
</SCRIPT>
</BODY>
</HTML>
<?PHP
}
?>
