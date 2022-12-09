<?PHP
class qPDO {
private $HndDB='';
private $Result='';
private $NumSqlError_ = false;
private $_ErrReportBCc='';
private $_ErrReportCc='';
private $_ErrReportFrom='';
private $_ErrReportMessage='';
private $_ErrReportTo='';
private $_ErrReportUserNode='';
private $Sql='';
private $SqlHost='';
private $SqlDatabase='';
private $SqlUser='';
private $SqlPassword='';
private $SqlPort='';
public  $SqlFile='';
private $SqlSet='';
private $SqlTransaction='';
private $SqlPDOConnect='';
private $_TReg='';
private $_IdInsert=array();
private $_IdRegistro=array();
function __construct( $Sql='', $SqlHostName='', $SqlUsuario='', $SqlPassword='', $SqlDiccionario='', $SqlInit=array(), $SqlPort='' ){
if( $SqlHostName!='' ){
$this->Sql = $Sql;
$this->SqlHost = $SqlHostName;
$this->SqlUser = $SqlUsuario;
$this->SqlPassword = $SqlPassword;
$this->SqlDatabase = $SqlDiccionario;
$this->SqlSet = $SqlInit;
$this->SqlPort = $SqlPort;
}else $this->SqlFile = $Sql;
}
function qConnect( $NomDef='' ){
global $_DEBUG;
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
if( $this->Sql=='' ){
$NomDef = ( ($this->SqlFile=='') ? 'sql.ini': $this->SqlFile );
if( substr_count($NomDef,'/')+substr_count($NomDef,chr(92))==0  ) $NomDef = "../_datos/config/{$NomDef}";
include( $NomDef );
if( $_Sql=='pdo' && $_SqlPDOType=='informix' ) $_Sql = 'informix';
if( $_SqlHostName=="" || $_SqlUsuario=="" || $_SqlPassword=="" || $_SqlDiccionario=="" ) eEnd("Falta la definición de la DDBB.");
$this->Sql = $_Sql;
$this->SqlHost = $_SqlHostName;
$this->SqlUser = $_SqlUsuario;
$this->SqlPassword = $_SqlPassword;
$this->SqlDatabase = $_SqlDiccionario;
$this->SqlSet = $_SqlInit;
if( isset($_SqlPort) ) $this->SqlPort = $_SqlPort;
if( isset($_SqlPDOConnect) && $_SqlPDOConnect!='' ) $this->SqlPDOConnect = $_SqlPDOConnect;
}
if( isset($_SqlPort) ) $this->SqlPort = $_SqlPort;
$Puerto = ( (isset($_SqlPort)) ? ';port='.$this->SqlPort : '' );
if( $this->SqlPDOConnect=='' ){
switch( strtolower($this->Sql) ){
case 'mysql': case 'mysqli':
$SqlPDOConnect = $this->Sql.":host=".$this->SqlHost .$Puerto. ";dbname=".$this->SqlDatabase;
break;
case 'informix':
$SqlPDOConnect = "informix:DSN=InformixDB";
break;
case 'oracle':
$SqlPDOConnect = "OCI:dbname=".$this->SqlDatabase.";charset=ISO-8859-1";
break;
case 'sqlsrv':
$SqlPDOConnect = "sqlsrv:server=".$this->SqlHost.";database=".$this->SqlDatabase;
break;
case 'mssql':
$SqlPDOConnect = "mssql:host=".$this->SqlHost.";dbname=".$this->SqlDatabase;
break;
case 'ibm':
$SqlPDOConnect = "ibm:DRIVER={IBM DB2 ODBC DRIVER};DATABASE=".$this->SqlDatabase."; HOSTNAME=".$this->SqlHost.";PORT=".$this->SqlPort.";PROTOCOL=TCPIP;";
break;
case 'dblib':
$SqlPDOConnect = "dblib:host=".$this->SqlHost.":".$this->SqlPort.";dbname=".$this->SqlDatabase;
break;
case 'odbc':
$SqlPDOConnect = "odbc:Driver={Microsoft Access Driver (*.mdb)};Dbq=C:\accounts.mdb;Uid=".$this->SqlUser;
break;
case 'fbd':
$SqlPDOConnect = "firebird:dbname=".$this->SqlHost.":".$this->SqlDatabase;
break;
case 'sqlite2':
$SqlPDOConnect = "sqlite:".$this->SqlHost;
break;
case 'sqlite3':
$SqlPDOConnect = "sqlite::memory";
break;
case 'pg':
$SqlPDOConnect = "pgsql:dbname=".$this->SqlDatabase .$Puerto. ";host=".$this->SqlHost;
break;
default:
eInit();
eTrace('ERROR DATABASE NO SOPORTADA "'.$this->Sql.'"');
eEnd();
}
$this->SqlPDOConnect = $SqlPDOConnect;
}
if( $this->HndDB!='' ) return;
$GLOBALS["_SqlStartSystem"] = true;
if( $_DEBUG==4 ) eLogDebug("[ SQL:{$this->SqlDatabase} ]");
if( $_DEBUG==1 ) eTrace("Conecta[Sql: {$this->Sql} | HostName: {$this->SqlHost} | Usuario: {$this->SqlUser} | Password: {$this->SqlPassword} | Diccionario: {$this->SqlDatabase}]");
$Pass = $this->SqlPassword;
if( strlen($Pass)>8 && substr($Pass,0,8)==dechex(crc32(substr($Pass,8))) ) $Pass = gzuncompress(base64_decode(substr($Pass,8)));
try{
if( $_DEBUG==1 ) eTrace( $this->SqlPDOConnect.' | '.$this->SqlUser.' | '.$this->SqlPassword );
$this->HndDB = new PDO( $this->SqlPDOConnect, $this->SqlUser, $Pass );
$this->HndDB->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
$this->HndDB->setAttribute( PDO::ATTR_CASE, PDO::CASE_LOWER );
$this->HndDB->setAttribute( PDO::ATTR_ORACLE_NULLS, PDO::NULL_TO_STRING );
$this->HndDB->setAttribute( PDO::ATTR_STRINGIFY_FETCHES, true );
}catch( PDOException $e ){
eInit();
eTrace('ERROR al conectar con DB ('.$e->getMessage().')');
eEnd();
}
$this->HndDB->cursorType			= PDO::CURSOR_SCROLL;
$this->HndDB->cursorOrientation	= PDO::FETCH_ORI_NEXT;
for( $n=0; $n<count($this->SqlSet); $n++ ){
if( $this->SqlSet[$n]=="<" ){
$this->qRow($p);
}else{
$this->qQuery( $this->SqlSet[$n], $p, true );
}
}
if( $this->SqlTransaction=='' ) $this->SqlTransaction = false;
if( $this->SqlTransaction ) qTranOn();
}
function qEnd(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
$this->qClose();
}
function qRecord($sql, $arrayNum=false, $all=false){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
qQuery($sql, $_Puntero_);
if( $all ){
$dim = array();
while( $r=(($arrayNum)? qRow($_Puntero_) : qArray($_Puntero_)) ) $dim[] = $r;
return $dim;
}
return (($arrayNum)? qRow($_Puntero_) : qArray($_Puntero_));
}
function qFree( &$puntero=NULL ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG,$_MemoContenido;
$_MemoContenido = array();
if( $_DEBUG==1 ) eTrace( "Libera[]" );
if( func_num_args() == 0 ){
$GLOBALS['Result'] = null;
}else{
$puntero = null;
}
}
function qClose(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("[Desconectado]");
if( $this->SqlTransaction ) qTranOff();
if( $_DEBUG==1 ) eTrace("Desconecta[Desconectado]");
$this->HndDB = null;
}
function qQuery( $sql, &$Puntero=NULL, $Continuar=false ){
$sql = trim($sql);
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG,$_SQL_,$_DBMemoTable,$_MemoContenido;
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Query[{$sql}]");
$this->_TReg = -1;
if( func_num_args() == 1 ){
try{
$this->Result = $this->HndDB->query( $sql );
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $e );
}
}else{
try{
$Puntero = $this->HndDB->query( $sql );
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $e );
}
}
if( strtoupper(substr($sql,0,6))=='INSERT' ){
$tmp = str_replace('  ',' ',str_replace("\t",' ',str_replace("\n",' ',str_replace("\r",' ',str_replace('(',' ',$sql)))));
$tmp = explode(' ',$tmp );
$Tabla = $tmp[2];
array_push( $this->_IdInsert, array( trim($Tabla), qId() ) );
$this->_IdRegistro[trim($Tabla)] = qId();
}else if( substr($sql,0,6)=='select' ) $_SQL_ = $sql;
}
function qCount( $Tabla, $Condicion=NULL, &$Puntero=NULL ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( trim($Condicion)!='' ){
$Condicion = 'where '.$Condicion;
}else{
}
$sql = "select count(*) from {$Tabla} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Cuenta[{$sql}]");
if( func_num_args() < 3 ){
try{
$this->HndDB->cursorType = PDO::CURSOR_FWDONLY;
$this->Result = $this->HndDB->query( $sql );
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $e );
}
list( $this->_TReg ) = $this->Result->fetch(PDO::FETCH_NUM);
}else{
try{
$Puntero = $this->HndDB->query( $sql );
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $e );
}
list( $this->_TReg ) = $Puntero->fetch(PDO::FETCH_NUM);
}
if( $_DEBUG==1 ) eTrace( "[Total Reg: {$this->_TReg}]" );
return $this->_TReg;
}
function qRow( &$Puntero=NULL ){
global $_DEBUG;
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
if( $_DEBUG==1 ) eTrace( "Fila[]" );
try{
if( func_num_args() == 0 ){
$r = $this->Result->fetch(PDO::FETCH_NUM);
}else{
$r = $Puntero->fetch(PDO::FETCH_NUM);
}
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( 'qRow->'.$_SQL_, $e );
}
if( !is_array($r) ) return null;
foreach( $r as $k=>$v ){
if( strlen($v)==10 && substr($v,4,1)=='-' && substr($v,7,1)=='-' ){
$r[$k] = substr($v,8,2).'-'.substr($v,5,2).'-'.substr($v,0,4);
}
}
return $r;
}
function qArray( &$Puntero=NULL ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==1 ) eTrace( "Array[]" );
try{
if( func_num_args() == 0 ){
$r = $this->Result->fetch( PDO::FETCH_ASSOC, $this->HndDB->cursorOrientation );
}else{
$r = $Puntero->fetch( PDO::FETCH_ASSOC );
}
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( 'qArray->'.$_SQL_, $e );
}
if( !is_array($r) ) return null;
$Dim = array();
foreach( $r as $k=>$v ){
if( strlen($v)==10 && substr($v,4,1)=='-' && substr($v,7,1)=='-' ){
$r[$k] = substr($v,8,2).'-'.substr($v,5,2).'-'.substr($v,0,4);
}
if( !is_numeric($k) ) $Dim[$k] = $v;
}
return $Dim;
}
function qId($Tabla=''){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==1 ) eTrace( "Id[]" );
if( $Tabla!='' ) return $GLOBALS['_IdRegistro'][$Tabla];
return $this->HndDB->lastInsertId();
}
function qLock(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
}
function qUnLock(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
}
function qTranOn(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("START TRANSACTION");
if( $_DEBUG==1 ) eTrace('[START TRANSACTION]');
try{
$this->HndDB->beginTransaction();
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( 'START TRANSACTION', $e );
}
}
function qTranOff(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("ROLLBACK");
if( $_DEBUG==1 ) eTrace('[ROLLBACK]');
try{
$this->HndDB->rollback();
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( 'ROLLBACK', $e );
}
}
function qTranBack(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("COMMIT");
if( $_DEBUG==1 ) eTrace('[ROLLBACK]');
try{
$this->HndDB->rollback();
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( 'ROLLBACK', $e );
}
}
function qQueryLog( $sql, $xTabla, $xWhere, $xClave='', $xUser='' ){
global $_DEBUG, $_IdRegistro;
if( $xUser=='' ) $xUser = $_SESSION['_User'];
if( preg_match("/^UPDATE/i",trim($sql)) ){
qQuery( "select * from {$xTabla} where {$xWhere}", $P1 ); $Old = qArray( $P1 );
$Alta = false;
$xOp = 'M';
}else{
$Alta = true;
$xOp = 'A';
$xIdRegistro = $_IdRegistro[$xTabla];
}
qQuery( $sql );
if( $Alta && $xClave=='' ){
$xClave = $_IdRegistro[$xTabla];
$xWhere .= $xClave;
}
qQuery( "select * from {$xTabla} where {$xWhere}", $P2 ); $New = qArray( $P2 );
$Log = '';
foreach( $New as $key=>$val ) if( !is_numeric($key) ){
if( ($Alta && $val!='') || (!$Alta && $val!=$Old[$key]) ){
if( $Log!='' ) $Log .= ',';
$Log .= $key.'="'.str_replace( '"', '&#34;', str_replace( "'", '&#39;', $val )).'"';
}
}
if( $Log!='' ){
qQuery( "insert into gs_log ( cdi, operacion, cd_gs_user, tabla, clave, sqlexe ) values ( '".date('Y-m-d H:i:s')."', '".$xOp."', '".$xUser."', '".$xTabla."', '".$xClave."', '".$Log."' )" );
}
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Log:[{$sql}]");
}
function qGetArray( $sql ){
$Dim = array();
qQuery( $sql, $_p1 );
while( $r=qRow($_p1) ) $Dim[$r[0]] = $r;
return $Dim;
}
function qError( $sql='', $e=null ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_User,$_Node,$NumSqlError_,$_DEBUG,$_Development,$_MemoContenido;
if( $_DEBUG==1 ) eTrace( "Error[]" );
if( $_DEBUG==-1 ){
if( $e!=null ){
eTrace( 'ERROR:[ '.$e->getCode().' : '.$e->getMessage().' ]' );
}else{
eTrace( 'ERROR:[ '.$sql.' ]' );
}
}
if( $_DEBUG==4 ) eLogDebug('ERROR:[ '.$e->getCode().' : '.$e->getMessage()." ]");
if( $GLOBALS['php_errormsg'] == 'parse error' ) die($GLOBALS['php_errormsg']);
$_User *= 1;
$Cdi = date('Y-m-d H:i:s');
if( $e!=null ){
qErrorFile(trim($e->getCode()).' : '.trim($e->getMessage()), $sql, $pkError);
}else{
qErrorFile("Error", $sql, $pkError);
}
if( $this->_ErrReportTo!='' ){
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=ISO-8859-1\r\n";
$Cabeceras .= "From: ".$this->_ErrReportFrom."\r\n";
if( $this->_ErrReportFrom!='' ) $Cabeceras .= "Reply-To: ".$this->_ErrReportFrom."\r\n";
if( $this->_ErrReportCc  !='' ) $Cabeceras .= "Cc: ".$this->_ErrReportCc."\r\n";
if( $this->_ErrReportBCc !='' ) $Cabeceras .= "Bcc: ".$this->_ErrReportBCc."\r\n";
$Cabeceras .= "X-Mailer: PHP/" . phpversion();
mail( $this->_ErrReportTo, $this->_ErrReportMessage.' '.zend_get_id(), stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras );
}
if( in_array( 'u'.$_User, $this->_ErrReportUserNode ) || in_array( 'n'.$_Node, $this->_ErrReportUserNode ) ){
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=ISO-8859-1\r\n";
$Cabeceras .= "From: ".$this->_ErrReportFrom."\r\n";
mail( $this->_ErrReportTo, "Seguimiento de error: Node:{$_Node}, User:{$_User} ".zend_get_id(), stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras );
}
eInit();
_ShowCallSrv();
if( $_Development || $_SESSION['_D_']!='' ){
$Dim = debug_backtrace();
for( $n=0; $n<count($Dim); $n++ ) $Dim[$n]['file'] = str_replace( '\\', '/', $Dim[$n]['file'] );
$EsBarra = 0;
$EsIgual = true;
$nPrefijo = 0;
while( $EsIgual ){
for( $n=1; $n<count($Dim); $n++ ){
if( substr($Dim[$n]['file'],$nPrefijo,1) != substr($Dim[0]['file'],$nPrefijo,1) ){
$EsIgual = false;
$nPrefijo--;
break;
}else{
if( substr($Dim[0]['file'],$nPrefijo,1)=='/' ) $EsBarra = $nPrefijo;
}
}
$nPrefijo++;
}
$nPrefijo = $EsBarra;
$SQLError = 'Objeto[ '.$GLOBALS['_gsObjeto'].' ]';
eTrace('[SCRIPT]'); eTrace( $GLOBALS['OriFichero'] );
echo '<hr>'; eTrace('[SQL]'); eTrace($sql); eTrace('[ERROR]'); eTrace( $TxtError );
if( $e!=null ){
eTrace( 'ErrorCode[ '.$e->getCode().' ]' );
eTrace( 'ErrorMessage[ '.$e->getMessage().' ]' );
}
echo '<hr>'; eTrace('[_GET]' ); foreach( $_GET  as $k=>$v ) eTrace( $k.' = '.$v );
echo '<hr>'; eTrace('[_POST]'); foreach( $_POST as $k=>$v ) eTrace( $k.' = '.$v );
echo '<hr>';
if( $_SESSION['_D_']=='~' ){
echo '<pre>'; debug_print_backtrace(); echo '</pre><hr><pre>'; print_r(debug_backtrace()); echo '</pre><hr>';
}
if( function_exists('KeyEditFile') ) KeyEditFile( $GLOBALS['OriFichero'] );
echo '<pre>';
for( $n=0; $n<count($Dim); $n++ ){
if( (substr_count($Dim[$n]['file'],'/edesweb/')==0 && substr_count($Dim[$n]['file'],'/http/edes.php')==0 ) || $_SESSION['_D_']=='~' ){
echo substr($Dim[$n]['file'],$nPrefijo).':'.$Dim[$n]['line'];
echo '<br>';
echo '   '.$Dim[$n]['function'].'(';
if( is_array( $Dim[$n]['args'] ) ){
echo '<br>';
for( $i=0; $i<count($Dim[$n]['args']); $i++ ){
echo '      '.$i.': '.str_replace("\n","\n         ",$Dim[$n]['args'][$i]).'<br>';
}
}
echo '   )';
echo '<br>';
}
}
echo '</pre>';
if( $_SESSION['_D_']=='~' ){
global $_DimDebug;
echo "\n<div>";
for( $i=0; $i<count($_DimDebug); $i++ ){
if( substr($_DimDebug[$i],0,3) == '[#]' ){
echo '</div><BR>'.'<div style="background:#D6DFE7;border:1px solid #00009C;"><A HREF="javascript:{}">';
eTrace( $_DimDebug[$i] );
echo '</A>';
}else{
eTrace( $_DimDebug[$i], 1 );
}
}
echo '</div>';
}
}else{
if($ScriptSys){
eTrace('[SQL]');eTrace($sql.'<br>');eTrace('[ERROR]');eTrace($TxtError);
}else eTrace('[ ERROR SQL ]');
echo '<script type="text/javascript">top.eLoading(false,window);if(top.eIsWindow(window))top.eSWView(window);</SCRIPT>';
}
if( $NumSqlError_ ){
if( $_SESSION["_D_"]=="" ){
eInit();
echo '<script type="text/javascript">top.S.errorHidden(window, "ERROR: '.$pkError.'");</SCRIPT>';
}
eEnd();
}
$NumSqlError_ = true;
if( substr_count($_SERVER['REQUEST_URI'],'edes.php?')==1 ){
$tmp = explode('edes.php?',$_SERVER['REQUEST_URI']);
$_SERVER['REQUEST_URI'] = 'edes.php?'.trim($tmp[1]);
}
$_SERVER['REQUEST_URI'] = eEntityEncode($_SERVER['REQUEST_URI']);
$sqlError = "insert into {$_SESSION['ShareDictionary']}gs_error (   cdi  ,cd_gs_user,tipo, desde,       fichero             , linea,texto, trace) values ".
"('{$Cdi}','{$_User}', 'S', 'PHP','{$_SERVER['REQUEST_URI']}',   0  , ''  ,   ?  )";
try{
$_MemoContenido = array();
$_MemoContenido[] = $TxtError."\n\n".$sql;
$pnt = $this->HndDB->prepare($sqlError);
foreach($_MemoContenido as $k=>$v) $pnt->bindParam(($k*1+1), $_MemoContenido[$k], PDO::PARAM_STR);
$this->Result = $pnt->execute();
}catch( PDOException $e ){
eTrace('ERROR AL GRABAR EL ERROR');
if( $_SESSION['_D_']=='~' ) eTrace('ERROR:[ '.$e->getCode().' : '.$e->getMessage().' ]');
}
eEnd();
}
function qDrivers(){
return PDO::getAvailableDrivers();
}
}
?>
