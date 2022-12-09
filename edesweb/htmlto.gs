<?PHP
$FILE = $_POST['file'];
$tmp = explode('.',$FILE);
$Extension = $tmp[count($tmp)-1];
$sFile = '/_tmp/php/'.$FILE;
file_put_contents(eScript($sFile), eHTML('$htmlto.gs','','',true).'</HEAD>'.$_POST['html'].'</HTML>');
eHTML('$htmlto.gs');
echo '</HEAD><BODY>';
echo '<SCRIPT type="text/javascript">';
$FILE = str_replace( '"', '', $FILE );
$FILE = str_replace( "'", '', $FILE );
if( ".{$Extension}"==substr( $FILE, -strlen(".{$Extension}")) ) $FILE = substr( $FILE, 0, -strlen(".{$Extension}") );
if( $FILE=='archivo' ) $FILE = 'Doc·'.date('H·i·s');
echo "top.eFileGetAsync('{$sFile}','{dir}tmp/{$FILE}.{$Extension}');";
echo 'var _Obj="DOWNLOAD";';
echo "if( top.DGI('LastFiles')!=null ) top.LastFilesAdd('{dir}tmp/{$FILE}.{$Extension}','{$FILE}.{$Extension}');";
echo '</SCRIPT></BODY></HTML>';
eEnd();
?>
