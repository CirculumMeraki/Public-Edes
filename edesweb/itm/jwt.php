<?PHP
class JWT {
public static $leeway = 0;                      // allows for nbf, iat or exp clock skew
public static $timestamp = null;                // allow timestamp to be specified for testing. Defaults to php (time) if null.
public static $supported_algs = array(
'HS256' => array('hash_hmac', 'SHA256'),
'HS512' => array('hash_hmac', 'SHA512'),
'HS384' => array('hash_hmac', 'SHA384'),
'RS256' => array('openssl', 'SHA256'),
'RS384' => array('openssl', 'SHA384'),
'RS512' => array('openssl', 'SHA512'),
);
public static function decode($token, $key, array $allowed_algs=array()){
if ((!isset($timestamp)) || (is_null($timestamp))) {
$timestamp = time();
}
if (empty($key)) {
throw new Exception('Invalid or missing key.');
}
$tokenSegments = explode('.', $token);
if (count($tokenSegments) != 3) {
throw new Exception('Wrong number of segments');
}
list($headb64, $bodyb64, $cryptob64) = $tokenSegments;
if (null === ($header = static::jsonDecode(static::urlsafeB64Decode($headb64)))) {
throw new Exception('Invalid header encoding');
}
if (null === $payload = static::jsonDecode(static::urlsafeB64Decode($bodyb64))) {
throw new Exception('Invalid claims encoding');
}
if (false === ($sig = static::urlsafeB64Decode($cryptob64))) {
throw new Exception('Invalid signature encoding');
}
if (empty($header->alg)) {
throw new Exception('Empty algorithm');
}
if (empty(static::$supported_algs[$header->alg])) {
throw new Exception('Algorithm not supported');
}
if (!in_array($header->alg, $allowed_algs)) {
throw new Exception('Algorithm not allowed');
}
if (is_array($key) || $key instanceof ArrayAccess) {
if (isset($header->kid)) {
if (!isset($key[$header->kid])) {
throw new UnexpectedValueException('"kid" invalid, unable to lookup correct key');
}
$key = $key[$header->kid];
} else {
throw new UnexpectedValueException('"kid" empty, unable to lookup correct key');
}
}
if (!static::verify("$headb64.$bodyb64", $sig, $key, $header->alg)) {
throw new Exception('Signature verification failed');
}
if (isset($payload->nbf) && $payload->nbf > ($timestamp + static::$leeway)) {
throw new Exception(
'Cannot handle token prior to ' . date(DateTime::ISO8601, $payload->nbf)
);
}
if (isset($payload->iat) && $payload->iat > ($timestamp + static::$leeway)) {
throw new Exception(
'Cannot handle token prior to ' . date(DateTime::ISO8601, $payload->iat)
);
}
if (isset($payload->exp) && ($timestamp - static::$leeway) >= $payload->exp) {
throw new Exception('Expired token');
}
return $payload;
}
public static function encode($payload, $key, $alg='HS256', $keyId=null, $head=null){
$header = array('typ' => 'JWT', 'alg' => $alg);
if ($keyId !== null) {
$header['kid'] = $keyId;
}
if ( isset($head) && is_array($head) ) {
$header = array_merge($head, $header);
}
$segments = array();
$segments[] = static::urlsafeB64Encode(static::jsonEncode($header));
$segments[] = static::urlsafeB64Encode(static::jsonEncode($payload));
$signing_input = implode('.', $segments);
$signature = static::sign($signing_input, $key, $alg);
$segments[] = static::urlsafeB64Encode($signature);
return implode('.', $segments);
}
public static function sign($msg, $key, $alg='HS256'){
if (empty(static::$supported_algs[$alg])) {
throw new Exception('Algorithm not supported');
}
list($function, $algorithm) = static::$supported_algs[$alg];
switch($function) {
case 'hash_hmac':
return hash_hmac($algorithm, $msg, $key, true);
case 'openssl':
$signature = '';
$success = openssl_sign($msg, $signature, $key, $algorithm);
if (!$success) {
throw new Exception("OpenSSL unable to sign data");
} else {
return $signature;
}
}
}
private static function verify($msg, $signature, $key, $alg){
if (empty(static::$supported_algs[$alg])) {
throw new Exception('Algorithm not supported');
}
list($function, $algorithm) = static::$supported_algs[$alg];
switch($function) {
case 'openssl':
$success = openssl_verify($msg, $signature, $key, $algorithm);
if ($success === 1) {
return true;
} elseif ($success === 0) {
return false;
}
throw new Exception(
'OpenSSL error: ' . openssl_error_string()
);
case 'hash_hmac':
default:
$hash = hash_hmac($algorithm, $msg, $key, true);
if (function_exists('hash_equals')) {
return hash_equals($signature, $hash);
}
$len = min(static::safeStrlen($signature), static::safeStrlen($hash));
$status = 0;
for ($i = 0; $i < $len; $i++) {
$status |= (ord($signature[$i]) ^ ord($hash[$i]));
}
$status |= (static::safeStrlen($signature) ^ static::safeStrlen($hash));
return ($status === 0);
}
}
public static function jsonDecode($input){
if (version_compare(PHP_VERSION, '5.4.0', '>=') && !(defined('JSON_C_VERSION') && PHP_INT_SIZE > 4)) {
$obj = json_decode($input, false, 512, JSON_BIGINT_AS_STRING);
} else {
$max_int_length = strlen((string) PHP_INT_MAX) - 1;
$json_without_bigints = preg_replace('/:\s*(-?\d{'.$max_int_length.',})/', ': "$1"', $input);
$obj = json_decode($json_without_bigints);
}
if (function_exists('json_last_error') && $errno = json_last_error()) {
static::handleJsonError($errno);
} elseif ($obj === null && $input !== 'null') {
throw new Exception('Null result with non-null input');
}
return $obj;
}
public static function jsonEncode($input){
$json = json_encode($input);
if (function_exists('json_last_error') && $errno = json_last_error()) {
static::handleJsonError($errno);
} elseif ($json === 'null' && $input !== null) {
throw new Exception('Null result with non-null input');
}
return $json;
}
public static function urlsafeB64Decode($input){
$remainder = strlen($input) % 4;
if ($remainder) {
$padlen = 4 - $remainder;
$input .= str_repeat('=', $padlen);
}
return base64_decode(strtr($input, '-_', '+/'));
}
public static function urlsafeB64Encode($input){
return str_replace('=', '', strtr(base64_encode($input), '+/', '-_'));
}
private static function handleJsonError($errno){
$messages = array(
JSON_ERROR_DEPTH => 'Maximum stack depth exceeded',
JSON_ERROR_STATE_MISMATCH => 'Invalid or malformed JSON',
JSON_ERROR_CTRL_CHAR => 'Unexpected control character found',
JSON_ERROR_SYNTAX => 'Syntax error, malformed JSON',
JSON_ERROR_UTF8 => 'Malformed UTF-8 characters' //PHP >= 5.3.3
);
throw new Exception(
isset($messages[$errno])
? $messages[$errno]
: 'Unknown JSON error: ' . $errno
);
}
private static function safeStrlen($str){
if (function_exists('mb_strlen')) {
return mb_strlen($str, '8bit');
}
return strlen($str);
}
}
?>
