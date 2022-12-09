<?PHP
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
$_HOST = $tmp[1];
$_REMOTESRV = $tmp[2];
$_REMOTESRV = str_replace( '{_Mode}', $Opcion, $_REMOTESRV  );
$_SERVER['QUERY_STRING'] = $_REMOTESRV;
if( substr_count( $_SERVER['QUERY_STRING'], 'redes.php' ) == 0 ){
$_SERVER['QUERY_STRING'] = str_replace( 'edes.php', 'redes.php', $_SERVER['QUERY_STRING'] );
}
$_REMOTEPORT = ( substr_count(strtoupper($tmp[0]),'HTTP')>0 ) ? 80:443;
if( $_SERVER['REQUEST_METHOD']=='GET' ){
$Datos = stripcslashes( $_SERVER['QUERY_STRING'] );
if( $Datos!='' ) $Datos .= '&';
$Datos .= "_REMOTE_={$_User},{$_Node}";
$txt = eDesConnect( $_HOST, 'GET', $Datos, '', $_REMOTEPORT );
$txt = str_replace( 'redes.php?', 'edes.php?R', $txt );
echo $txt;
}else{
$Datos = stripcslashes( $_SERVER['QUERY_STRING'] );
if( $Datos!='' ) $Datos .= '&';
$Datos .= "_REMOTE_={$_User},{$_Node}";
$DimNomVar = array_keys($_POST);
$DimValor  = array_values($_POST);
$MasUrl = '';
$p = 0;
for( $n=0; $n<count($_POST); $n++ ){
if( $DimNomVar[$n]!='PHPSESSID' ){
if( trim($DimValor[$n])!='' ){
if( $p>0 ) $MasUrl .= '&';
$MasUrl .= $DimNomVar[$n].'='.$DimValor[$n];
$p++;
}
}
}
$txt = eDesConnect( $_HOST, 'POST', $Datos, $MasUrl, $_REMOTEPORT );
$txt = str_replace('redes.php?','edes.php?R',$txt);
echo $txt;
}
eEnd();
function eDesConnect( $host, $method, $path, $data='', $Port ){
$method = strtoupper($method);
eTrace( 'HOST: '.$host );
eTrace( 'METODO: '.$method );
eTrace( 'PATH:'. $path );
eTrace( 'DATOS: '.$data );
eTrace( 'PUERTO: '.$Port );
$Datos = "{$method} {$path} HTTP/1.1\r\n".
"Host: {$host}\r\n".
"Content-type: application/x-www-form-urlencoded\r\n".
"Content-length: ".strlen($data)."\r\n".
"User-Agent: MSIE\r\n".
"Connection: close\r\n\r\n";
if( $method == 'POST' ) $Datos .= $data."\r\n";
$fp = fsockopen( $host, $Port, $errno, $errstr, 10 );
if( !$fp ){
eTrace('Error1: '.$errno); eTrace('Error2: '.$errstr);
exit;
}
fputs($fp, $Datos);
$Formato = 'H';
while( !feof($fp) ){
$buf = fgets($fp,128);
if( 'Content-Type: application/pdf' == trim($buf) ) $Formato = 'P';
if( 'Content-Type: application/xls' == trim($buf) ) $Formato = 'X';
if( $Formato=='H' && $buf[0]=='<' ) break;
if( $Formato=='P' && substr($buf,0,4)=='%PDF' ) break;
if( $Formato=='X' ){
$buf = fread($fp,128);
$buf = substr($buf,strpos($buf,pack( "ssssss", 0x809, 0x8, 0x0, 0x10, 0x0, 0x0 )));
break;
}
}
if( $Formato=='H' ){
if( substr_count( $buf, '</HTML>' )==0 ){
while( !feof($fp) ){
$tmp = fgets($fp,1024);
$buf .= $tmp;
if( preg_match('/<\/HTML>/i', $tmp) ) break;
}
}
}else if( $Formato=='P' ){
$File = 'archivo.pdf';
$Extension = 'pdf';
$FILE = 'archivo';
if( trim($buf) != '%%EOF' ){
while( !feof($fp) ){
$tmp = fread($fp,1024);
if( trim($tmp) == '%%EOF' ){
$buf .= chop($tmp);
break;
}else{
$buf .= $tmp;
}
}
}
fclose($fd);
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Content-Type: application/force-download");
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");
Header("Content-Type: application/{$Extension}");
header("Content-Disposition: attachment; filename={$FILE}.{$Extension};");
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".strlen($buf));
}else if( $Formato=='X' ){
$File = 'archivo.xls';
$Extension = 'xls';
$FILE = 'archivo';
while( !feof($fp) ){
$tmp = fread($fp,1024);
$buf .= $tmp;
}
fclose($fd);
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Content-Type: application/force-download");
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");
Header("Content-Type: application/{$Extension}");
header("Content-Disposition: attachment; filename={$FILE}.{$Extension};");
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".strlen($buf));
}
fclose($fp);
return $buf;
}
?>
