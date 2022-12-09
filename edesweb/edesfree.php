<?PHP
switch($Objeto[0]){
case 'R':
list($NomScript) = explode('&',$NomScript);
list($NomScript) = explode('?',$NomScript);
if( substr_count($NomScript, '&_PSOURCE=')>0 ) $NomScript = substr($NomScript,0,strpos($NomScript,'&_PSOURCE='));
$File = eScript($NomScript);
$NomExt = strtolower(substr($File,strrpos($File,'.')+1));
if( $_SESSION['_D_']=='~' || substr_count(',pdf,xls,doc,',",{$NomExt},")>0 ){
$Cachear = false;
}else if( $NomScript[0]=='$' ){
$Cachear = true;
}else{
$Cachear = $_CachePc;
}
if( !$_SESSION["_DevelopmentSrv"] && ($Cachear || $NomExt=='js') ){
$sgCache = 3600;
header('Expires: '.gmdate('D, d M Y H:i:s', time()+$sgCache).' GMT');
header('Pragma: cache');
header("Cache-Control: max-age={$sgCache}");
}else{
header('Last-Modified: '.gmdate('D, d M Y H:i:s T'));
header('Expires: '.gmdate('D, d M Y H:i:s T'));
header('Cache-Control: no-cache, must-revalidate');
header('Pragma: no-cache');
}
switch( $NomExt ){
case 'ico':
header("Content-Type: image/x-icon");
break;
case 'gif':
header("Content-Type: image/gif");
break;
case 'jpg': case 'jpeg':
header("Content-Type: image/jpeg");
break;
case 'png':
header("Content-Type: image/png");
break;
case 'js':
case 'css':
case 'txt':
header("Content-Type: text/plain");
break;
case 'pdf':
if( $_gsTron ) eTron('{I} [desktop.ini]');
include_once('../_datos/config/desktop.ini');
header("Content-Type: application/pdf");
header("Pragma: no-cache");
if( eFileGetVar("Setup.ZipDownload") ){
if( file_exists($File.'.gz') ) unlink($File.'.gz');
$str = exec("gzip {$File}", $a, $a1);
$File .= '.gz';
header("Content-Encoding: gzip");
}
header("Content-Length: ".filesize($File));
header("Content-Disposition: inline; filename=documento.{$NomExt}");
break;
case 'xls':
header("Content-Type: application/ms1");
header("Pragma: no-cache");
header("Content-Length: ".filesize($File));
header("Content-Disposition: inline; filename=excel.{$NomExt}");
break;
case 'doc':
header("Content-Type: application/msword");
header("Pragma: no-cache");
header("Content-Length: ".filesize($File));
header("Content-Disposition: inline; filename=word.{$NomExt}");
break;
case 'pps':
case 'ppt':
header( "Content-Type: application/vnd.ms-powerpoint" );
header( "Pragma: no-cache" );
header( "Content-Length: ".filesize($File) );
header( "Content-Disposition: inline; filename=powerpoint.{$NomExt}" );
break;
case 'wav':
header("Content-type: audio/x-wav");
break;
case 'swf':
header("Content-Type: application/x-oleobject");
break;
case 'gs': case 'inc': case 'php': case 'php4': case 'lp':
die('Error:3');
break;
default:
header("Content-Type: text/html; charset=ISO-8859-1");
if( !file_exists($File) ){
if( substr($File,0,13)==$Dir_.'h/' ){
?>
<SCRIPT type="text/javascript">
document.title = 'HELP eDes';
if( window.name!='AYUDA' ) window.moveTo(screen.width,0);
top.eAlert(S.lng(209), 'No existe la ayuda sobre:\n"<?= $File; ?>".', 'A', 'W');
if( window.name!='AYUDA' ) window.close();
</SCRIPT>
<?PHP
}else{
$sFile = explode('/',$File);
$sFile = explode('.',$sFile[count($sFile)-1]);
eTrace('', true);
eTrace("No existe la ayuda sobre: '{$sFile[0]}-{$File}'", true);
}
if( $_gsTron ) eTron('{20"}'.$File.' ['.strtolower(substr($File,strrpos($File,'.')+1)).']');
eEnd();
}
}
if( $_gsTron ) eTron('{20}'.$File.' ['.strtolower(substr($File,strrpos($File,'.')+1)).']');
if( $_Tree!='' ){
if( $_Estadistica ){
$NomExt = strtoupper($NomExt);
if( $_SESSION["LogTrace"]["D*"] || $_SESSION["LogTrace"]["D".$NomExt] ){
$NomExt = str_replace("'",'"',$NomExt);
list($NomExt) = explode('?',$NomExt);
list($NomExt) = explode('&',$NomExt);
$ePagina = str_replace("'",'"',$_SERVER['QUERY_STRING']);
sql_Inserta( 'gs_acceso',
'cd_gs_toperacion, conexion, objeto, modo,				 edf		   , tabla, parametros,    pagina  , parametro, registros, cd_gs_user, cd_gs_node,    cdi',
"     'DOC'      ,		''	 ,   'D' , '' , '".substr($NomExt,0,250)."',  ''  , '{$File}' ,'{$ePagina}',     ''   ,     1    , '{$_User}', '{$_Node}', '".date('Y-m-d H:i:s')."'"
);
qFree();
qEnd();
}
if( $_SESSION["LogGsAccessFile"]!='' ) error_log(date('Y-m-d H:i:s')."|{$_User}|{$_Node}|{$_Connection_}|{$_SERVER['QUERY_STRING']}\n", 3, $_SESSION["LogGsAccessFile"]);
}
}
readfile($File);
if( $_SESSION['_D_']<>"" && substr($_SERVER["QUERY_STRING"],0,17)=='R:$t/developer.js' ){
if( $_SESSION['_D_']=="~" ){
echo "top._gsAddMenu=[['-'],['Show Trace', '', [[top.S.session.logCallAnswer?'<b>Answer</b>':'Answer','','6'],[top.S.session.logCallSrv?'<b>Requests</b>':'Requests','','5']]],['CSS Create Var','','2a'],['-'],['To update', '', [['Packages','','edes.php?Ll:&#36;a/u/activity_pack'],['Scripts','','edes.php?Fc:&#36;a/u/activity'],['-'],['Setup HTTP','','edes.php?E:&#36;a/u/_http.gs']]]];";
}else if( $_SESSION['_D_']=='A' ){
if( file_exists("../_d_/".$_SESSION["_User"].".dvl") ){
@include("../_d_/".$_SESSION["_User"].".dvl");
}
if( $_SESSION['_D_']=='A' ){
echo "top._gsAddMenu=[['CSS Create Var','','2a'],['-'],['To update', '', [['Packages','','edes.php?Ll:&#36;a/u/activity_pack'],['Scripts','','edes.php?Fc:&#36;a/u/activity'],]]];";
}else if( file_exists("../_d_/usr/opdv.".$_SESSION["_User"]) ){
$txt = "";
$dim = file("../_d_/usr/opdv.".$_SESSION["_User"]);
for($n=0; $n<count($dim); $n++){
if( trim($dim[$n])!="" ){
$i = (($dim[$n]*1)-123)/$_SESSION["_User"];
switch( $i ){
case 12:
if( $txt!="" ) $txt .= ",";
$txt .= "['Packages','','edes.php?Ll:&#36;a/u/activity_pack']";
break;
case 23:
if( $txt!="" ) $txt .= ",";
$txt .= "['Scripts','','edes.php?Fc:&#36;a/u/activity']";
break;
}
}
}
if( $txt!="" ){
echo "top._gsAddMenu=[['To update', '', [".$txt.",]]];";
}
}
}
if( !isset($_Development) ) {
$tmpFile = '../_datos/config/sql.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval(_LoadSqlIni($tmpFile));
_ShowError($php_errormsg, $tmpFile);
}
$icono = '<span onclick="top.gsTools()" oncontextmenu="_AccesosDirectos()" style="position:absolute; bottom:2px; right:2px; z-index:9999" title="eDes">';
if( $_Development ){
$icono .= '<i class="ICONDESKTOP" style="color:#257086;margin:0px;">&#176;</i><i class="ICONDESKTOP" style="color:#63a1b3;margin:0px;">&#177;</i>';
}else{
$icono .= '<i class="ICONDESKTOP" style="color:#bd454b;margin:0px;">&#176;</i><i class="ICONDESKTOP" style="color:#ec8084;margin:0px;">&#177;</i>';
}
$icono .= '</span>';
echo "top._Master=".(($_SESSION['_D_']=='~')?'true':'false')."; top._M_='{$_SESSION['_D_']}'; top.S(top.S.createHTML('{$icono}')).nodeEnd(top.document.body);";
?>
if( S.is("eDesTree", document.cookie) ) top.S.info("Loading Tree...");
if( S.is("eDesTreePersonal=", document.cookie) )top.S.toDo('top.S.info("Loading PersonalTree...",3);top.eIWorkLocation("edes.php?E:$t/ed.gs&Development=Personal");');
if( S.is("eDesTreeSystem=", document.cookie) ) top.S.toDo('top.S.info("Loading SystemTree...",3);top.eIWorkLocation("edes.php?E:$t/ed.gs&Development=Tree");');
if( S.is("eDesTree", document.cookie) ) top.S.toDo('top.S.info();');
setTimeout(function(){top.S.toDo()});
<?PHP
}
break;
case 'H':
header("Content-Type: text/html; charset=ISO-8859-1");
list($NomScript) = explode('&', strtolower($NomScript));
$NomScript = str_replace(array("[","]","."), array("","","_"), $NomScript);
$File = $Dir_."h/".$NomScript.".htm";
if( !file_exists($File) ){
eTrace("No existe la ayuda sobre: '{$NomScript}'", true);
}else{
$txt = file_get_contents($File);
$txt = str_replace('<LINK REL="stylesheet" HREF="edes.php?R:$h/i/label.css" TYPE="text/css">', '<style>'.file_get_contents($Dir_."h/i/label.css").'</style>', $txt);
$txt = str_replace('<LINK REL="stylesheet" HREF="edes.php?R:$h/i/edesweb.css" TYPE="text/css">', '<style>'.file_get_contents($Dir_."h/i/edesweb.css").'</style>', $txt);
echo $txt;
}
break;
case 'V':
$tmp = explode('&',$_SERVER['QUERY_STRING']);
$_SERVER['QUERY_STRING'] = substr( $_SERVER['QUERY_STRING'], strpos($_SERVER['QUERY_STRING'],'&')+1 );
array_shift($argv);
array_shift($_GET);
list($NomScript) = explode('&', $NomScript );
$File = eScript( $NomScript );
$NomExt = strtolower(substr($File,strrpos($File,'.')+1));
if( $_CachePc=='' || substr_count(',pdf,xls,doc,',",{$NomExt},") > 0 ){
header("Last-Modified: ".gmdate("D, d M Y H:i:s T"));
header("Expires: ".gmdate("D, d M Y H:i:s T"));
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
}else{
header("Last-Modified: ".gmdate("D, d M Y 00:00:01 T"));
header("Expires: ".gmdate("D, d M Y {$_CachePc} T"));
header("Cache-Control: max-age");
}
include($Dir_.'visor.inc');
break;
case 'B':
_TraceDevelopment();
include( $Dir_.'background.inc' );
break;
case 'X':
include( $Dir_.'_tabla.gs' );
case 'A':
list($file) = explode('&', urldecode($_SERVER['QUERY_STRING']).'&');
$file = substr($file,2);
if( $file[0]=="$" ){
$file = substr($file,1);
$file = __DIR__.'/lng/help/'.$file;
}else{
$file = '../help/tip/'.$file;
}
$txt = file_get_contents($file);
if( substr($file,-5)=='.mark' ){
include_once(__DIR__.'/markdown.inc');
$txt = eMarkdown($txt);
}
die($txt);
case 'i':
include($Dir_.'t/ei.gs');
break;
case 'u':
$__='{#}eDes{#}';
$_SERVER["QUERY_STRING"] = $_SESSION["QueryString"];
unset($_SESSION["QueryString"]);
include($Dir_.'login.gs');
break;
case 'w':
include( $Dir_.'alerts_update.inc' );
break;
case '-':
include( $Dir_.'file_delete.inc' );
break;
case 'r':
list($NomScript) = explode('&', $NomScript);
if( substr_count($NomScript, '&_PSOURCE=')>0 ) $NomScript = substr($NomScript,0,strpos($NomScript,'&_PSOURCE='));
$File = eScript($NomScript);
header("Content-Type: text/html; charset=ISO-8859-1");
list($File) = explode('?', $File);
readfile($File);
break;
case 'D':
eContextGet();
_TraceDevelopment();
$tmp = explode(':',$_Accion);
$conDown = (($_GET["_DOWN"]==0)?"":" && false");
if( $tmp[1][0]=='*' ){
$b64 = str_replace('%20',' ',substr($tmp[1],1));
$tmp = explode('|',$b64);
if( substr_count($tmp[0],'.')>0 ) list(,$tmp[0]) = explode('.',$tmp[0]);
if( substr_count($tmp[1],' ')>0 ) list($tmp[1]) = explode(' ',$tmp[1]);
if( substr_count($tmp[2],'.')>0 ) list(,$tmp[2]) = explode('.',$tmp[2]);
qQuery("select {$tmp[0]} from {$tmp[1]} where {$tmp[2]}='{$tmp[3]}'");
$_DBMEMO[$tmp[0]] = true;
$r = qArray();
if( $r[$tmp[0]]<>'' ){
$Ext = explode('.',$tmp[4]);
$filename = $tmp[4];
$FileReal = $_SESSION['_User'].'.'.$Ext[count($Ext)-1];
@unlink("../_tmp/php/{$FileReal}");
file_put_contents("../_tmp/php/{$FileReal}",$r[$tmp[0]]);
?>
<script type="text/javascript">
if( /(\.gif|\.png|\.jpg|\.jpeg|\.pdf|\.mp4)$/i.test("<?=$FileReal?>") <?=$conDown?> ){
top.S.window("edes.php?E:$img.php<?=(isset($_GET["_TOOLSIMG"])? "&_TOOLSIMG=1":"")?>&IMG=/_tmp/php/<?=$FileReal?>");
}else{
top.eCallSrv(window, "edes.php?D:/_tmp/php/<?=$FileReal?><?=(isset($_GET["_TOOLSIMG"])? "&_TOOLSIMG=1":"")?>&FILE=<?=$filename?>");
}
</script>
<?PHP
eEnd();
}
}else if( $tmp[1][0]=='!' ){
$b64 = substr($tmp[1],1);
$b64 = base64_decode(substr($b64,0,10).substr($b64,20));
$tmp = explode(',',$b64);
if( isset($_DB) ){
include("../_datos/config/{$_DB}.inc");
if( $_DB=='oracle' ) $_DBMEMO[$tmp[0]] = true;
}
qQuery("select {$tmp[0]} from {$tmp[1]} where {$tmp[2]}='{$tmp[3]}'");
$r = qArray();
if( $r[$tmp[0]]<>'' ){
$filename = $tmp[5];
$FileReal = $_SESSION['_User'].'.'.$tmp[4];
@unlink("../_tmp/php/{$FileReal}");
file_put_contents("../_tmp/php/{$FileReal}",$r[$tmp[0]]);
?>
<script type="text/javascript">
if( /(\.gif|\.png|\.jpg|\.jpeg|\.pdf|\.mp4)$/i.test("<?=$FileReal?>") <?=$conDown?> ){
top.S.window("edes.php?E:$img.php&IMG=/_tmp/php/<?=$FileReal?>");
}else{
top.eCallSrv(window, "edes.php?D:/_tmp/php/<?=$FileReal?>&FILE=<?=$filename?>");
}
</script>
<?PHP
eEnd();
}
}
$sFile = str_replace('%20',' ',$tmp[1]);
if( $File=='../d/undefined' ) $File = '/_tmp/pdf/lst_'.$_User.'.pdf';
if( $tmp[1]!='' ) $tmp[1] = eScript( $tmp[1] );
$File = $tmp[1];
if( substr_count($File,'.')>0 ){
$Extension = substr($File,strrpos($File,'.')+1);
}else if( isset($_FILEPDF) ){
$Extension = 'pdf';
}
include_once('../_datos/config/desktop.ini');
if( eFileGetVar("Setup.ZipDownload") ){
if( $Extension!='zip' && $Extension!='gz' && $Extension!='cab' ){
if( file_exists($File.'.gz') ) unlink($File.'.gz');
$str = exec("gzip {$File}", $a, $a1);
$File .= '.gz';
$Extension = 'gz';
}
}
if( isset($WHO) ){
$_Estadistica = true;
$_SAVETRACE = true;
$_Development = false;
Estadistica('DWN', 1);
}
if( $Extension=='cab' ){
$DimFile = str_replace('\\','/',$File);
$DimFile = explode('/',$DimFile);
$DimFile = $DimFile[count($DimFile)-1];
list($DimFile) = explode('.',$DimFile);
$FILE = trim($DimFile);
}
if( isset($FILE) ){
$FILE = urlencode($FILE);
}else{
$FILE = 'archivo.'.$Extension;
}
if( substr_count($FILE,'.')==0 ) $FILE .= '.'.$Extension;
$SerialDOC = "";
if( $_Estadistica && !isset($_GET['_NoLog_']) ){
$sExtension = strtoupper($Extension);
if( $_SESSION["LogTrace"]["D*"] || $_SESSION["LogTrace"]["D".$sExtension] ){
$_Source = str_replace("'",'"',$_Source);
$_TReg = ((isset($_GET['_TReg'])) ? $_GET['_TReg'] : 1);
$_Type = ((isset($_GET['_Type'])) ? $_GET['_Type'] : $sExtension);
if( isset($_GET['_Mode']) ) $_SubMode = $_GET['_Mode'];
$ePagina = ((isset($_GET['_Doc'])) ? $_GET['_Doc'] : '');
$ePagina = eEntityEncode($_SERVER['QUERY_STRING']);
if( !$_HndDBSystem ) qConnectSystem();
$_HndDBSystem->qQuery("insert into gs_acceso
(cd_gs_toperacion,     conexion     , objeto,         modo  ,				edf			  ,    tabla  , parametros,    pagina  , parametro, registros , cd_gs_user, cd_gs_node,             cdi          ) values
(     'DOC'      , '{$_Connection_}',   'D' ,  '{$_SubMode}', '".substr($_Source,0,250)."', '{$_Type}', '{$FILE}' ,'{$ePagina}',     ''   , '{$_TReg}', '{$_User}', '{$_Node}', '".date('Y-m-d H:i:s')."')"
);
$SerialDOC = $_HndDBSystem->qId();
$_HndDBSystem->qFree();
}
if( $_SESSION["LogGsAccessFile"]!='' ) error_log(date('Y-m-d H:i:s')."|{$_User}|{$_Node}|{$_Connection_}|{$_SERVER['QUERY_STRING']}\n", 3, $_SESSION["LogGsAccessFile"]);
}
ob_end_clean();
ob_implicit_flush(1);
if( isset($_CACHEFILESRV) && file_exists(eScript($_CACHEFILESRV)) ){
$sFile = $_CACHEFILESRV;
}else if( isset($_FILEPDF) ){
list($Ini, $Fin) = explode(',',$_FILEPDF);
$oNomFile = '/_tmp/pdf/lst_'.$_User.'.pdf';
$txt = '..'.$oNomFile;
for($n=1; $n<=$Fin; $n++){
if( file_exists('../_tmp/pdf/lst_'.$_User.'_file_'.$n.','.$Fin.'.pdf') ) $txt .= ' ../_tmp/pdf/lst_'.$_User.'_file_'.$n.','.$Fin.'.pdf';
}
if( substr_count($txt,' ')>0 ) exec("gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile={$txt}");
for($n=1; $n<=$Fin; $n++){
if( file_exists('../_tmp/pdf/lst_'.$_User.'_file_'.$n.','.$Fin.'.pdf') ) @unlink( '../_tmp/pdf/lst_'.$_User.'_file_'.$n.','.$Fin.'.pdf' );
}
if( $_CACHEFILESRV!='' ){
copy(eScript($oNomFile), eScript($_CACHEFILESRV));
$oNomFile = $_CACHEFILESRV;
}
$File = $oNomFile;
if( !file_exists(eScript($sFile)) ) copy(eScript($oNomFile), eScript($sFile));
if( $sFile=='' ){
$sFile = '..'.$oNomFile;
$Extension = 'pdf';
}else if( $sFile=='undefined' ){
$sFile = '..'.$oNomFile;
$FILE = 'archivo';
$Extension = 'pdf';
}
}
if( $_Estadistica && $_SESSION["LogFileDownload"]!='' && !isset($_GET['_NoLog_']) && $SerialDOC<>"" ){
if( $Extension<>'zip' ){
$Dim = array();
$Dir = eGetCWD();
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ){
$ExeZip = "zip -9 -j -b {$Dir} ".$_SESSION["LogFileDownload"].$SerialDOC." ".eScript($sFile);
exec($ExeZip, $Dim);
}else{
$ExeZip = eScript('$win/zip.exe')." -9 -j -b {$Dir} ".$_SESSION["LogFileDownload"].$SerialDOC." ".eScript($sFile);
eZipFile($_SESSION["LogFileDownload"].$SerialDOC.".zip", eScript($sFile));
}
}else{
copy(eScript($sFile), $_SESSION["LogFileDownload"].$SerialDOC.'.'.$Extension);
}
}
$txt = file_get_contents('../_datos/config/empty_page.htm');
$txt = substr($txt, 0, strripos($txt, "</body>"));
if( $_Development ) $txt = str_replace(' oncontextmenu="return false;"','',$txt);
$FILE = str_replace("'", '', str_replace('"', '',$FILE));
if( ".{$Extension}"==substr( $FILE, -strlen(".{$Extension}")) ) $FILE = substr($FILE, 0, -strlen(".{$Extension}"));
if( $FILE=='archivo' ) $FILE = 'Doc·'.date('H·i·s');
if( $_TemporaryCopyTo=='' && file_exists('../_datos/usr/'.$_SESSION['_User'].'.pth') ) $_TemporaryCopyTo = trim(file_get_contents('../_datos/usr/'.$_SESSION['_User'].'.pth'));
$NameFile = "{$FILE}.{$Extension}";
$NameFile = urldecode($NameFile);
if( $_GET['_FILENAME']!='' ) $NameFile = $_GET['_FILENAME'];
if( $_GET['_TARGETPATH']!='' ){
$_GET['_TARGETPATH'] = str_replace( '/','\\',$_GET['_TARGETPATH']);
if( substr($_GET['_TARGETPATH'],-1)!='\\' ) $_GET['_TARGETPATH'] .= '\\';
$_GET['_TARGETPATH'] = str_replace( '\\','\\\\',$_GET['_TARGETPATH']);
}
$NameFile = str_replace('+',' ',$NameFile);
$NameFile = urldecode($NameFile);
$esUTF8 = false;
for($n=0; $n<strlen($NameFile); $n++) if( ord(substr($NameFile,$n,1))>255 ) $esUTF8 = true;
if( $esUTF8 ) $NameFile = utf8_decode($NameFile);
if( substr_count($sFile, '!')>0 ) $sFile = eSplitPath($sFile);
$ok = true;
if(	$_SESSION["LogFileDownload"]!='' && substr_count($sFile, $_SESSION["LogFileDownload"])>0 && $_GET['_Type']=='MDB' ){
$Dir = '../_tmp/zip/';
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ){
$ExeZip = "unzip -d {$Dir} ".eScript($sFile);
}else{
$ExeZip = eScript('$win/unzip.exe')." -d {$Dir} ".eScript($sFile);
}
$Dim = array();
$zip = zip_open(eScript($sFile));
if( !is_resource($zip) ){
exit;
}else{
$entry = zip_read($zip);
$entries = zip_entry_name($entry);
$sFile = '/_tmp/zip/'.$entries;
}
zip_close($zip);
exec($ExeZip, $Dim);
eUpload($sFile, date('H·i·s'));
}elseif( !isset($_GET['_ASYNC']) ){
if( file_exists(eScript($sFile)) ){
eUpload($sFile, $NameFile);
?>
<?PHP
}else $ok = false;
}else{
if( file_exists(eScript($sFile)) ){
eUpload($sFile, $NameFile);
}else $ok = false;
}
if( $ok ){
}else{
}
eEnd();
case 'o':
$_DF = __DIR__.'/itm/'.str_replace(array('.','&','/',chr(92)), array('','','',''), $_DF).'.inc';
if( file_exists($_DF) ) include($_DF);
eEnd();
default:
_PedirLogin();
die('Error:4w');
}
eEnd();
?>
