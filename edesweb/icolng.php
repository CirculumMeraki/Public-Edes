<?PHP
$File = eScript( $_SERVER['QUERY_STRING'] );
$NomExt = strtolower(substr($File,strrpos($File,'.')+1));
$xFile = str_replace( '_es.', '_'.$_SESSION['_LANGUAGE_'].'.', $File );
if( $xFile!=$File && file_exists( $xFile ) ){
$File = $xFile;
}else{
$xFile = substr( $File, 0, (strlen($NomExt)+1)*-1 ) .'_'.$_SESSION['_LANGUAGE_'].'.'.$NomExt;
if( file_exists( $xFile ) ){
$File = $xFile;
}
}
if( $_SESSION['_D_']=='~' || substr_count(',pdf,xls,doc,',",{$NomExt},") > 0 ){
$Cachear = false;
}else if( $_SERVER['QUERY_STRING'][0]=='$' ){
$Cachear = true;
}else{
$Cachear = $_SESSION['_CachePc'];
}
if( $Cachear ){
header("Last-Modified: ".gmdate("D, d M Y H:i:s T"));
header("Expires: ".gmdate("D, d M Y 23:59:59 T"));
header("Cache-Control: max-age");
}else{
header("Last-Modified: ".gmdate("D, d M Y H:i:s T"));
header("Expires: ".gmdate("D, d M Y H:i:s T"));
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
}
switch( $NomExt ){
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
header( "Content-Type: application/pdf" );
header( "Pragma: no-cache" );
if( eFileGetVar("Setup.ZipDownload") ){
if( file_exists($File.'.gz') ) unlink($File.'.gz');
$str = exec( "gzip {$File}", $a, $a1 );
$File .= '.gz';
header( "Content-Encoding: gzip" );
}
header( "Content-Length: ".filesize($File) );
header( "Content-Disposition: inline; filename=documento.{$NomExt}" );
break;
case 'xls':
header( "Content-Type: application/ms1" );
header( "Pragma: no-cache" );
header( "Content-Length: ".filesize($File) );
header( "Content-Disposition: inline; filename=excel.{$NomExt}" );
break;
case 'doc':
header( "Content-Type: application/msword" );
header( "Pragma: no-cache" );
header( "Content-Length: ".filesize($File) );
header( "Content-Disposition: inline; filename=word.{$NomExt}" );
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
if( substr($File,0,13) == $Dir_.'h/' ){
?>
<SCRIPT type="text/javascript">
document.title = 'HELP eDes';
if( window.name != 'AYUDA' ) window.moveTo(screen.width,0);
top.eAlert( S.lng(209), 'No existe la ayuda sobre:\n"<?= $File; ?>".', 'A', 'W' );
if( window.name != 'AYUDA' ) window.close();
</SCRIPT>
<?PHP
}else{
$sFile = explode('/',$File);
$sFile = explode('.',$sFile[count($sFile)-1]);
eTrace( '', true );
eTrace( "No existe la ayuda sobre: '{$sFile[0]}'", true );
}
if( $_gsTron ) eTron('{20"}'.$File.' ['.strtolower(substr($File,strrpos($File,'.')+1)).']');
exit;
}
}
if( $_gsTron ) eTron('{20}'.$File.' ['.strtolower(substr($File,strrpos($File,'.')+1)).']');
if( $_Tree!='' ){
if( $_Sql=='' ){
$tmpFile = '../_datos/config/sql.ini';
ini_set('track_errors', _TRACK_ERRORS);
eval(_LoadSqlIni($tmpFile));
_ShowError($php_errormsg, $tmpFile);
}
if( $_Estadistica && $NomExt<>'gif' && $NomExt<>'jpg' && $NomExt<>'jpeg' && $NomExt<>'png' ){
if( $_SESSION["LogTrace"]["D*"] || $_SESSION["LogTrace"]["D".$NomExt] ){
include_once($Dir_.$_Sql.'.inc');
$NomExt = str_replace("'",'"',strtoupper($NomExt));
$ePagina = str_replace("'",'"',$_SERVER['QUERY_STRING']);
sql_Inserta('gs_acceso',
'cd_gs_toperacion,         conexion        , objeto, modo,     edf    , tabla, parametros,    pagina  , parametro, registros, cd_gs_user, cd_gs_node,    cdi',
"     'DOC'      , '{$_SESSION['_Connection_']}',   'D' ,  '' , '{$NomExt}',  ''  , '{$File}' ,'{$ePagina}',     ''   ,     1    , '{$_User}', '{$_SESSION['_Node']}', '".date('Y-m-d H:i:s')."'", 'num_acceso' );
qFree();
qEnd();
}
if( $_SESSION["LogGsAccessFile"]!='' ) error_log( date('Y-m-d H:i:s')."|{$_User}|{$_SESSION['_Node']}|{$_SESSION['_Connection_']}|{$_SERVER['QUERY_STRING']}\n", 3, $_SESSION["LogGsAccessFile"]);
}
}
readfile($File);
eEnd();
?>
