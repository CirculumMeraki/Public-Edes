<?PHP
function graba_estado(){
global $df;
fwrite( $df, "\n".date("U") );
if( connection_aborted() ) fwrite( $df, " < ERROR >" );
fclose( $df );
}
$F = urldecode(stripslashes( $F ));
$NomFile = $F;
$CdiFile = urldecode(stripslashes( $H ));
if( !isset($_DownloadPath) || $_DownloadPath=='' ) $_DownloadPath = '/_tmp/ext/';
if( substr($_DownloadPath,-1)!='/' ) $_DownloadPath .= '/';
$sFile = $_DownloadPath.$F;
$_DownloadPath = eScript('?'.$_DownloadPath);
$File = $_DownloadPath.$F;
if( strtoupper(substr(PHP_OS,0,3))=='WIN' ) $File = str_replace('\\', '/', $File);
if( file_exists($File) != 1 ){
echo '<script type="text/javascript">';
echo "top.eAlert( S.lng(212), top.eLng(120,'{$File}'), 'A','E' );";
echo '</SCRIPT>';
exit;
}
if( is_readable($File) != 1 ){
echo '<script type="text/javascript">';
echo "top.eAlert( S.lng(212), top.eLng(120,'{$File}'), 'A','E' );";
echo '</SCRIPT>';
exit;
}
$BysFile = filesize($File);
$_DEBUG = 0;
include_once( $Dir_.$_Sql.'.inc' );
$HastaCDI = date( 'Y-m-d H:i:s', mktime( date('H'), date('i'), date('s'), date('m'), date('d')-7, date('Y') ) );
if( qCount( 'gs_exp_file', "cd_gs_user={$U} and estado!='H' and cdi<'{$HastaCDI}'" ) > 0 ){
qSelect( 'gs_exp_file', '*', "cd_gs_user={$U} and estado!='H' and cdi<'{$HastaCDI}'", 'cdi' );
while( $row = qArray() ){
list($DelFile,) = explode('.', trim($row[fichero]));
@unlink( $_DownloadPath.$DelFile );
@unlink( $_DownloadPath.$DelFile.'.'.trim($row[formato]) );
@unlink( $_DownloadPath.$DelFile.'.sql' );
@unlink( $_DownloadPath.$DelFile.'.zip' );
@unlink( $_DownloadPath.$DelFile.'.htm' );
@unlink( $_DownloadPath.$DelFile.'.mdb' );
}
sql_Modifica( 'gs_exp_file', 'estado="H"', "cd_gs_user={$U} and estado!='H' and cdi<'{$HastaCDI}'" );
}
qCount( 'gs_exp_file', "fichero='{$NomFile}' and cdi='{$CdiFile}'" );
qFree();
if( $_TReg != 1 ){
echo '<script type="text/javascript">';
echo "top.eAlert( S.lng(209), top.eLng(120,'{$NomFile}/{$CdiFile}'), 'A','W' );";
echo '</SCRIPT>';
eEnd();
}
sql_Modifica( 'gs_exp_file', 'descargado = descargado + 1 ', "fichero='{$NomFile}' and cdi='{$CdiFile}'" );
qSelect( 'gs_exp_file', '*', "fichero='{$NomFile}' and cdi='{$CdiFile}'" );
$row = qArray();
if( $row['descargado'] == 1 ){
sql_Modifica( 'gs_exp_file', "download='".date('Y-m-d H:i:s')."'", "fichero='{$NomFile}' and cdi='{$CdiFile}'" );
}
qFree();
qEnd();
$Destino = explode( '/', '/'.str_replace('\\','/',$File) );
$Destino = $Destino[count($Destino)-1];
$Ext = substr( $sFile, strrpos($sFile,'.')+1 );
eHTML('$descarga.gs');
echo '</HEAD><BODY><SCRIPT type="text/javascript">';
if( substr($sFile,-3)=='mdb' ){
echo 'try{window.frameElement.WOPENER.eHideBusy(); }catch(e){}';
echo 'window.external.eExportToMDB("'.$sFile.'","'.date('H·i·s').'");';
}else{
$oFichero = eScript($sFile);
$dFichero = '../_tmp/pdf/';
if( $row['tipo']=='I' ){
if( $row['formato']==5 ){
$sFile = '/_tmp/pdf/lst_'.$_SESSION['_User'].'.pdf';
$Ext = 'pdf';
}
if( $row['formato']==4 ){
$sFile = '/_tmp/pdf/lst_'.$_SESSION['_User'].'.xls';
$Ext = 'xls';
}
if( $row['formato']==7 ){
$sFile = '/_tmp/pdf/lst_'.$_SESSION['_User'].'.xml';
$Ext = 'xml';
}
$Dir = str_replace('\\','/',getcwd());
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ){
$ExeZip = "unzip ".$oFichero." -d ".$dFichero;
}else{
$ExeZip = eScript('$win/unzip.exe')." ".$oFichero." -d ".$dFichero;
}
$Dim = array();
exec( $ExeZip, $Dim  );
$f = explode('/',str_replace('\\','/',$oFichero));
$f = substr($f[count($f)-1],0,-3).$Ext;
$File = '../_tmp/pdf/'.$f;
if( file_exists($File) ) $sFile = '/_tmp/pdf/'.$f;
}else if( $row['tipo']=='L' ){
if( $row['formato']==4 ){
$sFile = '/_tmp/pdf/lst_'.$_SESSION['_User'].'.xls';
$Ext = 'xls';
$Dir = str_replace('\\','/',getcwd());
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ){
$ExeZip = "unzip ".$oFichero." -d ".$dFichero;
}else{
$ExeZip = eScript('$win/unzip.exe')." ".$oFichero." -d ".$dFichero;
}
$Dim = array();
exec( $ExeZip, $Dim  );
$f = explode('/',str_replace('\\','/',$oFichero));
$f = substr($f[count($f)-1],0,-3).$Ext;
$File = '../_tmp/pdf/'.$f;
if( file_exists($File) ) $sFile = '/_tmp/pdf/'.$f;
}
}
echo "location.href = 'edes.php?D:".$sFile."';";
}
echo '</SCRIPT></BODY></HTML>';
eEnd();
?>
