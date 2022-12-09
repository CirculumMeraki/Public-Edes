<?PHP
class ePdo {
private $NumSqlError_ = false;
private $_ErrReportBCc='';
private $_ErrReportCc='';
private $_ErrReportFrom='';
private $_ErrReportMessage='';
private $_ErrReportTo='';
private $_ErrReportUserNode='';
private $_Sql='';
private $_SqlPDOConnect='';
private $_SqlDiccionario='';
private $_SqlHostName='';
private $_SqlInit = array();
private $_SqlPassword='';
private $_SqlTransaction='';
private $_SqlUsuario='';
private $_HndDB='';
private $_Result='';
private $_TReg='';
private $_IdInsert=array();
private $_IdRegistro=array();
function qConnect($NomDef, $fileIni=""){
$_PathAdd = '';
$_PathCurrent = str_replace('\\','/',getCWD());
$_PathCurrent = substr($_PathCurrent,strrpos($_PathCurrent,'/')+1);
if( $_PathCurrent=='cron' ) $_PathAdd = '../';
if( $fileIni=="" ){
$NomDef = str_replace(chr(92),'/',$NomDef);
if( substr_count($NomDef,'.')==0 ) $NomDef .= '.ini';
if( substr_count($NomDef,'/')==0 ) $NomDef = "{$_PathAdd}../_datos/config/{$NomDef}";
$txt = trim(file_get_contents($NomDef));
if( substr($txt,0,2)!='<'.'?' ){
eval(gzuncompress($txt));
}else{
eval(substr($txt, ((strtoupper(substr($txt,0,5))=='<'.'?PHP' ) ? 5 : 2 ), -2 ));
}
}else{
@include($fileIni);
}
if( $_SqlHostName=="" || $_SqlUsuario=="" || $_SqlPassword=="" || $_SqlDiccionario=="" ) eEnd("Falta la definición de la DDBB.");
$this->_Sql = $_Sql;
$this->_SqlHostName = $_SqlHostName;
$this->_SqlUsuario = $_SqlUsuario;
$this->_SqlPassword = $_SqlPassword;
$this->_SqlDiccionario = $_SqlDiccionario;
$this->_SqlPDOConnect = $_SqlPDOConnect;
$this->_SqlInit = $_SqlInit;
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $this->_HndDB != '' ) return;
if( $_DEBUG==4 ) eLogDebug("[ClassSQL:{$this->_SqlDiccionario} ]");
if( $_DEBUG==1 ) eTrace("[ClassSQL: {$this->_Sql} | HostName: {$this->_SqlHostName} | Usuario: {$this->_SqlUsuario} | Password: {$this->_SqlPassword} | Diccionario: {$this->_SqlDiccionario}]");
putenv("INFORMIXDIR=/opt/informix");
putenv("PATH=".getenv("PATH").":$INFORMIXDIR/bin");
putenv("LD_LIBRARY_PATH=$INFORMIXDIR/lib:$INFORMIXDIR/lib/esql:$INFORMIXDIR/lib/cli");
putenv("INFORMIXSERVER={$this->_SqlHostName}");
putenv("GL_DATE=%Y-%m-%d");
putenv("DBDATE=YMD4-");
$Pass = $this->_SqlPassword;
if( strlen($Pass)>8 && substr($Pass,0,8)==dechex(crc32(substr($Pass,8))) ) $Pass = gzuncompress(base64_decode(substr($Pass,8)));
try{
if( $_DEBUG==1 ) eTrace($this->_SqlPDOConnect.' | '.$this->_SqlUsuario.' | '.$this->_SqlPassword);
$this->_HndDB = new PDO($this->_SqlPDOConnect, $this->_SqlUsuario, $Pass);
$this->_HndDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$this->_HndDB->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
$this->_HndDB->setAttribute(PDO::ATTR_ORACLE_NULLS, PDO::NULL_TO_STRING);
$this->_HndDB->setAttribute(PDO::ATTR_STRINGIFY_FETCHES, true);
$GLOBALS["_SqlStartSystem"] = true;
}catch(PDOException $e){
eTrace('ERROR al conectar con DB ('.$e->getMessage().')');
eEnd();
}
$this->_HndDB->cursorType			= PDO::CURSOR_SCROLL;
$this->_HndDB->cursorOrientation	= PDO::FETCH_ORI_NEXT;
for($n=0; $n<count($this->_SqlInit); $n++){
if( $this->_SqlInit[$n]=="<" ){
$this->qRow($p);
}else{
$this->qQuery($this->_SqlInit[$n], $p, true);
}
}
if( $this->_SqlTransaction=='' ) $this->_SqlTransaction = false;
if( $this->_SqlTransaction ) $this->qTranOn();
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
global $_DEBUG, $_MemoContenido;
$_MemoContenido = array();
if( $_DEBUG==1 ) eTrace( "Libera[]" );
if( func_num_args() == 0 ){
$this->_Result = null;
}else{
$puntero = null;
}
}
function qEnd(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("[ClassDesconectado]");
if( $_DEBUG==1 ) eTrace("[ClassDesconectado]");
if( $this->_SqlTransaction ) $this->qTranOff();
$this->_HndDB = null;
}
function qError( $sql='', $e=null ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_User,$_Node,$NumSqlError_,$REQUEST_METHOD,$_DEBUG,$_Development,$_D_,$_MemoContenido;
if( $_DEBUG==1 ) eTrace( "Error[]" );
if( $_DEBUG==-1 ){
if( $e!=null ){
eTrace( 'ERROR:[ '.$e->getCode().' : '.$e->getMessage().' ]' );
}else{
eTrace( 'ERROR:[ '.$sql.' ]' );
}
}
if( $_DEBUG==4 ) eLogDebug('ERROR:[ '.$e->getCode().' : '.$e->getMessage()." ]");
if( $GLOBALS['php_errormsg']=='parse error' ) die($GLOBALS['php_errormsg']);
$_User *= 1;
$Cdi = date('Y-m-d H:i:s');
if( $e!=null ){
qErrorFile(trim($e->getCode()).' : '.trim($e->getMessage()), $sql, $pkError);
}else{
qErrorFile("Error", $sql, $pkError);
}
if( $this->_ErrReportTo!='' ){
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=iso-8859-1\r\n";
$Cabeceras .= "From: ".$this->_ErrReportFrom."\r\n";
if( $this->_ErrReportFrom!='' ) $Cabeceras .= "Reply-To: ".$this->_ErrReportFrom."\r\n";
if( $this->_ErrReportCc  !='' ) $Cabeceras .= "Cc: ".$this->_ErrReportCc."\r\n";
if( $this->_ErrReportBCc !='' ) $Cabeceras .= "Bcc: ".$this->_ErrReportBCc."\r\n";
$Cabeceras .= "X-Mailer: PHP/" . phpversion();
mail( $this->_ErrReportTo, $this->_ErrReportMessage.' '.zend_get_id(), stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras );
}
if( in_array( 'u'.$_User, $this->_ErrReportUserNode ) || in_array( 'n'.$_Node, $this->_ErrReportUserNode ) ){
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=iso-8859-1\r\n";
$Cabeceras .= "From: ".$this->_ErrReportFrom."\r\n";
mail( $this->_ErrReportTo, "Seguimiento de error: Node:{$_Node}, User:{$_User} ".zend_get_id(), stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras );
}
eInit();
_ShowCallSrv();
if( $_Development ){
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
if( (substr_count($Dim[$n]['file'],'/edesweb/')==0 && substr_count($Dim[$n]['file'],'/http/edes.gs')==0 ) || $_D_=='~' ){
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
if( $_D_=='~' ){
global $_DimDebug;
echo "\n<div>";
for( $i=0; $i<count($_DimDebug); $i++ ){
if( substr($_DimDebug[$i],0,3) == '[#]' ){
echo '</div><BR>'.'<div style="background:#D6DFE7;border:1 solid #00009C;"><A HREF="javascript:{}">';
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
if( $NumSqlError_ ) eEnd();
$NumSqlError_ = true;
if( substr_count( $_SERVER['REQUEST_URI'],'edes.php?' ) == 1 ){
$tmp = explode('edes.php?',$_SERVER['REQUEST_URI']);
$_SERVER['REQUEST_URI'] = 'edes.php?'.trim($tmp[1]);
}
$_SERVER['REQUEST_URI'] = eEntityEncode($_SERVER['REQUEST_URI']);
$sqlError = "insert into {$_SESSION['ShareDictionary']}gs_error ( cdi  ,cd_gs_user,tipo, desde,       fichero             , linea,texto, trace ) values ".
"( '{$Cdi}','{$_User}', 'S', 'PHP','{$_SERVER['REQUEST_URI']}',   0  , ''  ,   ?   )";
try{
$_MemoContenido = array();
$_MemoContenido[] = $TxtError."\n\n".$sql;
$pnt = $this->_HndDB->prepare( $sqlError );
foreach( $_MemoContenido as $k=>$v ) $pnt->bindParam(($k*1+1), $_MemoContenido[$k], PDO::PARAM_STR);
$this->_Result = $pnt->execute();
}catch( PDOException $e ){
eTrace('1.ERROR AL GRABAR EL ERROR');
if( $_D_=='~' ) eTrace('ERROR:[ '.$e->getCode().' : '.$e->getMessage().' ]');
}
eEnd();
}
function qQueryMemo($sql, $Memo=NULL){
try{
$_MemoContenido = array();
$_MemoContenido[] = $Memo;
$pnt = $this->_HndDB->prepare( $sql );
foreach($_MemoContenido as $k=>$v) $pnt->bindParam( ($k*1+1), $_MemoContenido[$k], PDO::PARAM_STR );
$this->_Result = $pnt->execute();
}catch( PDOException $e ){
eTrace( '2.ERROR AL GRABAR EL ERROR' );
if( $_D_=='~' ) eTrace( 'ERROR:[ '.$e->getCode().' : '.$e->getMessage().' ]' );
}
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
$this->_Result = $this->_HndDB->query( $sql );
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $e );
}
}else{
try{
$Puntero = $this->_HndDB->query( $sql );
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $e );
}
}
if( strtoupper(substr($sql,0,6))=='INSERT' ){
$tmp = str_replace('  ',' ',str_replace("\t",' ',str_replace("\n",' ',str_replace("\r",' ',str_replace('(',' ',$sql)))));
$tmp = explode(' ',$tmp );
$Tabla = $tmp[2];
array_push( $this->_IdInsert, array( trim($Tabla), $this->qId() ) );
$this->_IdRegistro[trim($Tabla)] = $this->qId();
}else if( substr($sql,0,6)=='select' ) $_SQL_ = $sql;
}
function qCount( $Tabla, $Condicion=NULL, &$Puntero=NULL ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( trim($Condicion)!='' ){
$Condicion = 'where '.$Condicion.'';
}else{
}
$sql = "select count(*) from {$Tabla} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Cuenta[{$sql}]");
if( func_num_args() < 3 ){
try{
$this->_HndDB->cursorType = PDO::CURSOR_FWDONLY;
$this->_Result = $this->_HndDB->query( $sql );
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $e );
}
list( $this->_TReg ) = $this->_Result->fetch(PDO::FETCH_NUM);
}else{
try{
$Puntero = $this->_HndDB->query( $sql );
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $e );
}
list( $this->_TReg ) = $Puntero->fetch(PDO::FETCH_NUM);
}
if( $_DEBUG==1 ) eTrace( "[Total Reg: {$this->_TReg}]" );
return $this->_TReg;
}
function qRow( $Puntero=NULL ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==1 ) eTrace( "Fila[]" );
if( func_num_args() == 0 ){
$r = $this->_Result->fetch(PDO::FETCH_NUM);
}else{
$r = $Puntero->fetch(PDO::FETCH_NUM);
}
foreach( $r as $k=>$v ){
if( strlen($v)==10 && substr($v,4,1)=='-' && substr($v,7,1)=='-' ){
$r[$k] = substr($v,8,2).'-'.substr($v,5,2).'-'.substr($v,0,4);
}
}
return $r;
}
function qArray( $Puntero=NULL ){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==1 ) eTrace( "Array[]" );
if( func_num_args() == 0 ){
$r = $this->_Result->fetch( PDO::FETCH_ASSOC, $this->_HndDB->cursorOrientation );
}else{
$r = $Puntero->fetch(PDO::FETCH_ASSOC);
}
foreach( $r as $k=>$v ){
if( strlen($v)==10 && substr($v,4,1)=='-' && substr($v,7,1)=='-' ){
$r[$k] = substr($v,8,2).'-'.substr($v,5,2).'-'.substr($v,0,4);
}
}
return $r;
}
function qId(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==1 ) eTrace( "Id[]" );
return $this->_HndDB->lastInsertId();
}
function qTranOn(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("START TRANSACTION");
if( $_DEBUG==1 ) eTrace('[START TRANSACTION]');
try{
$this->_HndDB->beginTransaction();
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
$this->_HndDB->rollback();
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
$this->_HndDB->rollback();
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( 'ROLLBACK', $e );
}
}
function qLog($Log, $sOpe, $sTabla, $sSql){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_SqlPDOType, $_DEBUG,$_User,$_DBSERIAL;
$sClave = '';
for( $n=0; $n<count($Log); $n++ ){
$Log[$n] = trim($Log[$n]);
if( $sOpe=='A' && $_DBSERIAL[0]==$sTabla && $_DBSERIAL[1]==$Log[$n] ){
$sClave .= $GLOBALS['_nSerial'];
}else{
$sClave .= $GLOBALS[ $Log[$n] ];
}
}
if( $_SqlPDOType=="informix" ){
$sql = 'insert into gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "'.$sOpe.'", "'.$_User.'", "'.$sTabla.'", "'.$sClave.'", ?)';
}else{
$sql = 'insert into gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "'.$sOpe.'", "'.$_User.'", "'.$sTabla.'", "'.$sClave.'", "'.str_replace('"',"'",trim(stripslashes( $sSql ))).'")';
}
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Log[{$sql}]");
try{
if( $_SqlPDOType=="informix" ){
$_MemoContenido = array();
$_MemoContenido[] = str_replace('"',"'",trim(stripslashes( $sSql )));
$p = $this->_HndDB->prepare($sql);
foreach($_MemoContenido as $k=>$v) $p->bindParam(($k*1+1), $_MemoContenido[$k], PDO::PARAM_STR);
$p->execute();
}else{
$p = $this->_HndDB->query($sql);
}
}catch( PDOException $e ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $e );
}
if(!$p ) $this->qError( $sql );
}
function sql_getColumnMeta(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==1 ) eTrace( "getColumnMeta[]" );
foreach( range( 0, $this->_Result->columnCount() - 1 ) as $column_index ){
$meta[] = $this->_Result->getColumnMeta($column_index);
}
return $meta;
}
function sql_getColumnMetaEx(){
$r = sql_getColumnMeta();
$meta = array();
foreach( $r as $index=>$arrai ){
$meta[ $arrai['name'] ]= array();
foreach( $arrai as $k1=>$v1 ){
$meta[ $arrai['name'] ][$k1] = $v1;
}
}
return $meta;
}
function sql_TotalCampos(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
global $_DEBUG;
if( $_DEBUG==1 ) eTrace( "TotalCampos[]" );
return mysql_num_fields( $this->_Result );
}
function sql_Bloquea(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
}
function sql_Desbloquea(){
if( $GLOBALS['_DEBUGSQL'] ) eLogDebug(__FUNCTION__);
}
}
?>
