<?PHP //[_PROTECCION_]
class CMailFile{
var $subject;
var $addr_to;
var $text_body;
var $text_encoded;
var $mime_headers;
var $mime_boundary = "--==================_846811060==_";
var $smtp_headers;
function CMailFile( $subject,$to,$from,$msg,$filename,$mimetype = "application/octet-stream", $mime_filename = false ){
$this->subject = $subject;
$this->addr_to = $to;
$this->smtp_headers = $this->write_smtpheaders($from);
$this->text_body = $this->write_body($msg);
$this->text_encoded = $this->attach_file($filename,$mimetype,$mime_filename);
$this->mime_headers = $this->write_mimeheaders($filename, $mime_filename);
}
function attach_file( $filename, $mimetype, $mime_filename ){
$encoded = $this->encode_file($filename);
if( $mime_filename ) $filename = $mime_filename;
$out = "--" . $this->mime_boundary . "\n";
$out .= "Content-type: " . $mimetype . "; name=\"$filename\";\n";
$out .= "Content-Transfer-Encoding: base64\n";
$out .= "Content-disposition: attachment; filename=\"$filename\"\n\n";
$out .= $encoded . "\n";
$out .= "--" . $this->mime_boundary . "--" . "\n";
return $out;
}
function encode_file( $sourcefile ){
if( is_readable($sourcefile) ){
$fd = fopen($sourcefile,'r');
$contents = fread($fd, filesize($sourcefile));
$encoded = my_chunk_split(base64_encode($contents));
fclose($fd);
}
return $encoded;
}
function sendfile(){
$headers = $this->smtp_headers . $this->mime_headers;
$message = $this->text_body . $this->text_encoded;
mail($this->addr_to,$this->subject,$message,$headers);
}
function write_body($msgtext){
$out = "--" . $this->mime_boundary . "\n";
$out .= "Content-Type: text/plain; charset=\"us-ascii\"\n\n";
$out .= $msgtext . "\n";
return $out;
}
function write_mimeheaders($filename, $mime_filename){
if( $mime_filename ) $filename = $mime_filename;
$out  = "MIME-version: 1.0\n";
$out .= "Content-type: multipart/mixed; ";
$out .= "boundary=\"$this->mime_boundary\"\n";
$out .= "Content-transfer-encoding: 7BIT\n";
$out .= "X-attachments: $filename;\n\n";
return $out;
}
function write_smtpheaders( $addr_from ){
$out  = "From: $addr_from\n";
$out .= "Reply-To: $addr_from\n";
$out .= "X-Mailer: PHP3\n";
$out .= "X-Sender: $addr_from\n";
return $out;
}
}
function my_chunk_split( $str ){
$stmp = $str;
$len = strlen($stmp);
$out = "";
while( $len > 0 ){
if( $len >= 76 ){
$out = $out . substr($stmp, 0, 76) . "\r\n";
$stmp = substr($stmp, 76);
$len = $len - 76;
}else{
$out = $out . $stmp . "\r\n";
$stmp = ""; $len = 0;
}
}
return $out;
}
function __ImagenesAdjuntas( $fichero ){
$TFileFuera = 0;
if( file_exists( 'tmp.tmp' ) ) unlink( 'tmp.tmp' );
$Leer	= fopen( $fichero , 'r' );
$Grabar = fopen( 'tmp.tmp', 'w' );
while( !feof($Leer) ){
$buffer = fgets( $Leer, 1024 );
$Buscar = '<IMG';
$txt = strtoupper( $buffer );
if( substr_count( $txt, $Buscar ) > 0 ){
$i = strpos( $txt, $Buscar );
if( !strpos( $txt, '>', $i )){
$buffer .= fgets( $Leer, 1024 );
$txt = strtoupper( $buffer );
}
$f = strpos( $txt, '>', $i );
$seccion = substr( $buffer, $i+strlen($Buscar), ($f-$i-strlen($Buscar)) );
$TFileFuera += FileRelativo( $seccion );
}
$Buscar = ':IMAGEDATA';
if( substr_count( $txt, $Buscar ) > 0 ){
$i = strpos( $txt, $Buscar );
if( !strpos( $txt, '>', $i )){
$buffer .= fgets( $Leer, 1024 );
$txt = strtoupper( $buffer );
}
$f = strpos( $txt, '>', $i );
$seccion = substr( $buffer, $i+strlen($Buscar), ($f-$i-strlen($Buscar)) );
$TFileFuera += FileRelativo( $seccion );
}
}
fclose($Leer);
fclose($Grabar);
return $TFileFuera;
}
function __FileRelativo( $txt ){
global $TImagen, $ImgNombre, $ImgTipo;
$Errores = 0;
$Buscar = 'SRC=';
$txt = strtoupper( $txt );
if( strpos( $txt, $Buscar )){
$i = strpos( $txt, $Buscar ) + strlen($Buscar);
$Delimitador = substr( $txt, $i, 1 );
$NomFile = '';
while( true ){
$i++;
if( substr( $txt, $i, 1 ) == $Delimitador ) break;
$NomFile .= substr( $txt, $i, 1 );
}
$NomFile = strtolower( $NomFile );
if( $TImagen == 0 || !in_array( $NomFile, $ImgNombre ) ){
$ImgNombre[$TImagen] = $NomFile;
$i = strpos( $NomFile, '.' );
$NomFile = substr( $NomFile, $i+1 );
$ImgTipo[$TImagen] = $NomFile;
$TImagen++;
}
}
return $Errores;
}
?>
