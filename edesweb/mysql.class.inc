<?PHP
class eMySql {
private $NumSqlError_ = false;
private $_ErrReportBCc='';
private $_ErrReportCc='';
private $_ErrReportFrom='';
private $_ErrReportMessage='';
private $_ErrReportTo='';
private $_ErrReportUserNode='';
private $_Sql='';
private $_SqlDiccionario='';
private $_SqlHostName='';
private $_SqlInit=array();
private $_SqlPassword='';
private $_SqlTransaction='';
private $_SqlUsuario='';
private $_HndDB='';
private $_Result='';
private $_TReg='';
private $_IdInsert=array();
private $_IdRegistro=array();
function qConnect( $NomDef ){
$_PathAdd = '';
$_PathCurrent = str_replace('\\','/',getCWD());
$_PathCurrent = substr($_PathCurrent,strrpos($_PathCurrent,'/')+1);
if( $_PathCurrent=='cron' ) $_PathAdd = '../';
$NomDef = str_replace(chr(92),'/',$NomDef);
if( substr_count($NomDef,'.')==0 ) $NomDef .= '.ini';
if( substr_count($NomDef,'/')==0 ) $NomDef = "{$_PathAdd}../_datos/config/{$NomDef}";
$txt = trim(file_get_contents($NomDef));
if( substr($txt,0,2)!='<'.'?' ){
eval(gzuncompress($txt));
}else{
eval(substr($txt, ((strtoupper(substr($txt,0,5))=='<'.'?PHP')? 5:2), -2));
}
if( $_SqlHostName=="" || $_SqlUsuario=="" || $_SqlPassword=="" || $_SqlDiccionario=="" ) eEnd("Falta la definición de la DDBB.");
$this->_Sql = $_Sql;
$this->_SqlHostName = $_SqlHostName;
$this->_SqlUsuario = $_SqlUsuario;
$this->_SqlPassword = $_SqlPassword;
$this->_SqlDiccionario = $_SqlDiccionario;
$this->_SqlInit = $_SqlInit;
global $_DEBUG;
if( $this->_HndDB!='' ) return;
if( $_DEBUG==4 ) eLogDebug("[ClassSQL:{$this->_SqlDiccionario}]");
if( $_DEBUG==1 ) eTrace("[ClassSQL: {$this->_Sql} | HostName: {$this->_SqlHostName} | Usuario: {$this->_SqlUsuario} | Password: {$this->_SqlPassword} | Diccionario: {$this->_SqlDiccionario}]");
$Pass = $this->_SqlPassword;
if( strlen($Pass)>8 && substr($Pass,0,8)==dechex(crc32(substr($Pass,8))) ) $Pass = gzuncompress(base64_decode(substr($Pass,8)));
$this->_HndDB = mysql_connect( $this->_SqlHostName, $this->_SqlUsuario, $Pass, true );
if( !$this->_HndDB ){
eTrace('ERROR al conectar con DB');
eEnd();
}
$GLOBALS["_SqlStartSystem"] = true;
if( $_DEBUG==4 ) eLogDebug('[ClassSQL: '.$this->_HndDB.']');
if( $_DEBUG==1 ) eTrace( '[ClassSQL: '.$this->_HndDB.']' );
mysql_select_db( $this->_SqlDiccionario, $this->_HndDB );
if( mysql_errno( $this->_HndDB ) ){
if( $_DEBUG==30 ) return -1;
$this->qError();
}
for( $n=0; $n<count($this->_SqlInit); $n++ ){
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
if( func_num_args() == 0 ){
mysql_free_result( $this->_Result );
}else{
mysql_free_result( $puntero );
$puntero = null;
}
}
function qEnd(){
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("[ClassDesconectado]");
if( $_DEBUG==1 ) eTrace("[ClassDesconectado]");
if( $this->_SqlTransaction ) $this->qTranOff();
mysql_close( $this->_HndDB );
$this->_HndDB = false;
}
function qError( $sql='' ){
global $_User,$_Node,$NumSqlError_,$REQUEST_METHOD,$_DEBUG,$_Development;
if( $_DEBUG==-1 ) eTrace('ERROR:[ '.mysql_errno($this->_HndDB).' : '.mysql_error($this->_HndDB).' ]');
if( $_DEBUG==4 ) eLogDebug('ERROR:[ '.mysql_errno($this->_HndDB).' : '.mysql_error($this->_HndDB)." ]");
if( $GLOBALS['php_errormsg'] == 'Parse error' ) die($GLOBALS['php_errormsg']);
$_User *= 1;
$Cdi = date('Y-m-d H:i:s');
qErrorFile(trim(mysql_errno($this->_HndDB)).' : '.trim(mysql_error($this->_HndDB)), $sql, $pkError);
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
eTrace('[SCRIPT]'); eTrace( $GLOBALS['OriFichero'] );
echo '<hr>'; eTrace('[SQL]'); eTrace($sql); eTrace('[ERROR]'); eTrace( $TxtError );
echo '<hr>'; eTrace('[_GET]' ); foreach( $_GET  as $k=>$v ) eTrace( $k.' = '.$v );
echo '<hr>'; eTrace('[_POST]'); foreach( $_POST as $k=>$v ) eTrace( $k.' = '.$v );
echo '<hr>';
if( $_SESSION['_D_']=='~' ){
echo '<pre>'; debug_print_backtrace(); echo '</pre><hr><pre>'; print_r(debug_backtrace()); echo '</pre><hr>';
}
if( function_exists('KeyEditFile') ) KeyEditFile( $GLOBALS['OriFichero'] );
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
if( substr_count( $_SERVER['REQUEST_URI'],'edes.php?' ) == 1 ){
$tmp = explode('edes.php?',$_SERVER['REQUEST_URI']);
$_SERVER['REQUEST_URI'] = 'edes.php?'.trim($tmp[1]);
}
$_SERVER['REQUEST_URI'] = eEntityEncode($_SERVER['REQUEST_URI']);
$sql = trim(eEntityEncode($sql));
$TxtError = trim(eEntityEncode($TxtError));
$sqlError = "insert into {$_SESSION['ShareDictionary']}gs_error (    cdi  ,cd_gs_user, tipo, desde,             fichero       , linea, texto, trace ) values ".
"( '{$Cdi}','{$_User}', 'S', 'PHP','{$_SERVER['REQUEST_URI']}',   0  ,   '' , '{$TxtError}\n\n{$sql}' )";
mysql_query( $sqlError, $this->_HndDB );
if( mysql_errno() ) eTrace('ERROR: gs_error');
eEnd();
}
function qQuery( $sql, &$Puntero=NULL, $Continuar=false ){
global $_DEBUG,$_SQL_;
$sql = trim($sql);
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("[{$sql}]");
$this->_TReg = -1;
if( func_num_args() == 1 ){
$this->_Result = mysql_query( $sql, $this->_HndDB );
if( mysql_errno() ){
if( !$Continuar ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
}else{
$this->_TReg = mysql_affected_rows( $this->_Result );
}
}else{
$Puntero = mysql_query( $sql, $this->_HndDB );
if( mysql_errno() ){
if( !$Continuar ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
}else{
$this->_TReg = mysql_affected_rows( $Puntero );
}
}
if( strtoupper(substr($sql,0,6))=='INSERT' ){
$tmp = str_replace('  ',' ',str_replace("\t",' ',str_replace("\n",' ',str_replace("\r",' ',str_replace('(',' ',$sql)))));
$tmp = explode(' ',$tmp );
$Tabla = $tmp[2];
array_push( $this->_IdInsert, array( trim($Tabla), mysql_insert_id( $this->_HndDB ) ) );
$this->_IdRegistro[trim($Tabla)] = mysql_insert_id( $this->_HndDB );
}else if( substr($sql,0,6)=='select' ) $_SQL_ = $sql;
if( $_DEBUG==1 ) eTrace( "[Reg.Query: {$this->_TReg}]" );
return $this->_TReg;
}
function qCount( $Tabla, $Condicion=NULL, &$Puntero=NULL ){
global $_DEBUG;
if( trim($Condicion)!='' ){
$Condicion = 'where '.$Condicion.'';
}else{
}
$sql = "select count(*) from {$Tabla} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("[{$sql}]");
if( func_num_args() < 3 ){
$this->_Result = mysql_query( $sql, $this->_HndDB );
if( mysql_errno() ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
$this->_TReg = mysql_result( $this->_Result, 0 );
}else{
$Puntero = mysql_query( $sql, $this->_HndDB );
if( mysql_errno() ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
$this->_TReg = mysql_result( $Puntero, 0 );
}
if( $_DEBUG==1 ) eTrace( "[Total Reg: {$this->_TReg}]" );
return $this->_TReg;
}
function qRow( $Puntero=NULL ){
if( func_num_args() == 0 ){
return mysql_fetch_row( $this->_Result );
}else{
return mysql_fetch_row( $Puntero );
}
}
function qArray( $Puntero=NULL ){
if( func_num_args() == 0 ){
return mysql_fetch_array( $this->_Result );
}else{
return mysql_fetch_array( $Puntero );
}
}
function qId($Tabla=''){
if( $Tabla!='' ) return $GLOBALS['_IdRegistro'][$Tabla];
return mysql_insert_id( $this->_HndDB );
}
function qTranOn(){
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("START TRANSACTION");
if( $_DEBUG==1 ) eTrace('[START TRANSACTION]');
$this->_Result = mysql_query( 'START TRANSACTION', $this->_HndDB );
if( mysql_errno( $this->_Result ) ){
if( $_DEBUG==30 ) return -1;
$this->qError('START TRANSACTION');
}
}
function qTranOff(){
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("COMMIT");
if( $_DEBUG==1 ) eTrace('[COMMIT]');
$this->_Result = mysql_query( 'COMMIT', $this->_HndDB );
if( mysql_errno( $this->_Result ) ){
if( $_DEBUG==30 ) return -1;
$this->qError('COMMIT');
}
}
function qTranBack(){
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("ROLLBACK");
if( $_DEBUG==1 ) eTrace('[ROLLBACK]');
$this->_Result = mysql_query( 'ROLLBACK', $this->_HndDB );
if( mysql_errno( $this->_Result ) ){
if( $_DEBUG==30 ) return -1;
$this->qError('ROLLBACK');
}
}
function qLog( $Log, $sOpe, $sTabla, $sSql ){
global $_DEBUG,$_User,$_DBSERIAL;
$sClave = '';
for( $n=0; $n<count($Log); $n++ ){
$Log[$n] = trim($Log[$n]);
if( $sOpe=='A' && $_DBSERIAL[0]==$sTabla && $_DBSERIAL[1]==$Log[$n] ){
$sClave .= $GLOBALS['_nSerial'];
}else{
$sClave .= $GLOBALS[ $Log[$n] ];
}
}
$sql = 'insert into gs_log ( cdi, operacion, cd_gs_user, tabla, clave, sqlexe ) values ( "'.date('Y-m-d H:i:s').'", "'.$sOpe.'", "'.$_User.'", "'.$sTabla.'", "'.$sClave.'", "'.str_replace('"','\"',trim(stripslashes( $sSql ))).'" )';
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Log:[{$sql}]");
$this->_Result = mysql_query( $sql, $this->_HndDB );
if(!$this->_Result ) $this->qError( $sql );
}
function sql_Seek( $i ){
return mysql_data_seek( $this->_Result, $i);
}
function sql_NombreCampo( $i ){
return mysql_field_name( $this->_Result, $i );
}
function sql_TipoCampo( $i ){
return mysql_field_type( $this->_Result, $i );
}
function sql_LongitudCampo( $i ){
return mysql_field_len( $this->_Result, $i );
}
function sql_FlagsCampo( $i ){
return mysql_field_flags( $this->_Result, $i );
}
function sql_TotalCampos(){
return mysql_num_fields( $this->_Result );
}
function sql_Bloquea(){
}
function sql_Desbloquea(){
}
}
?>
