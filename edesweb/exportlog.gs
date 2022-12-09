<?PHP
if( !function_exists('zip_open') ){
?>
<script type="text/javascript">
top.eInfoError( window.frameElement.WOPENER, 'Falta instalar la librería ZIP', 5 );
</script>
<?PHP
eEnd();
}
if( !function_exists('qQuery') ){
eval(qSetup());
include_once('../../edesweb/'.$_Sql.'.inc');
}
qQuery( "select * from gs_acceso where num_acceso={$_GET['FILE']}" );
$r=qArray();
if( $r['cdi']=='' || $_SESSION["LogFileDownload"]=='' ){
eTrace('ERROR');
exit;
}
$CodFile = $r['num_acceso'];
$sFile = $_SESSION["LogFileDownload"].$CodFile.'.zip';
if( !file_exists($sFile) ){
?>
<script type="text/javascript">
top.eInfoError(window.frameElement.WOPENER, 'Fichero no encontrado', 5 );
</script>
<?PHP
eEnd();
}
$Dir = '../_tmp/zip/';
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ){
$ExeZip = "unzip -d {$Dir} ".$sFile;
}else{
$ExeZip = eScript('$win/unzip.exe')." -d {$Dir} ".$sFile;
}
$Dim = array();
$zip = zip_open($sFile);
if( !is_resource($zip) ){
exit;
}else{
$NomFile = '';
while( $entry = zip_read($zip) ){
$entries = zip_entry_name($entry);
if( substr($entries,-4)!='.def' && substr_count( $entries,'_info.')==0 ){
$NomFile = $entries;
break;
}
}
$sFile = '/_tmp/zip/'.$entries;
}
zip_close($zip);
exec( $ExeZip.' -l '.$NomFile, $Dim  );
$NewFile = $CodFile.substr($NomFile,-4);
if( file_exists($Dir.$NewFile) ) @unlink($Dir.$NewFile);
rename( $Dir.$NomFile, $Dir.$NewFile );
if( substr($NomFile,-4)=='.mdb' || substr($NomFile,-4)=='.unl' ){
?>
<script type="text/javascript">
window.external.eExportToMDB( '/_tmp/zip/<?=$NewFile?>', '<?=$CodFile?>' );
top.eInfoHide();
</script>
<?PHP
}else{
?>
<script type="text/javascript">
top.eFileGet( '/_tmp/zip/<?=$NewFile?>', '{dir}tmp/<?=$NewFile?>' );
top.eRun( '{dir}tmp/<?=$NewFile?>' );
top.eInfoHide();
</script>
<?PHP
}
?>
eEnd();
