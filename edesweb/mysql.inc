<?PHP //[_PROTECCION_]
$_PathAdd = '';
$_PathCurrent = str_replace('\\','/',getCWD());
$_PathCurrent = substr($_PathCurrent,strrpos($_PathCurrent,'/')+1);
if( $_PathCurrent=='cron' ) $_PathAdd = '../';
function qSelect( $Tabla, $Campos, $Condicion='', $Ordenacion='', &$Puntero=NULL ){
if( func_num_args() < 5 ){
sql_Busca( $Tabla, $Campos, $Condicion, $Ordenacion );
}else{
sql_Busca( $Tabla, $Campos, $Condicion, $Ordenacion, $Puntero );
}
}
function qQuery( $sql, &$Puntero=NULL, $Continuar=false ){
if( func_num_args() == 1 ){
return sql_Query( $sql );
}else if( func_num_args() == 2 ){
return sql_Query( $sql, $Puntero );
}else{
return sql_Query( $sql, $Puntero, $Continuar );
}
}
function qCount( $Tabla, $Condicion=NULL, &$Puntero=NULL ){
if( func_num_args() == 2 ){
return sql_Cuenta( $Tabla, $Condicion );
}else{
return sql_Cuenta( $Tabla, $Condicion, $Puntero );
}
}
function qRow( $Puntero=NULL ){
if( func_num_args() == 0 ){
return sql_Fila();
}else{
return sql_Fila( $Puntero );
}
}
function qArray( $Puntero=NULL ){
if( func_num_args() == 0 ){
return sql_Array();
}else{
return sql_Array( $Puntero );
}
}
function qFree( $Puntero=NULL ){
if( func_num_args() == 0 ){
return sql_Libera();
}else{
return sql_Libera( $Puntero );
}
}
function qEnd(){
sql_Desconecta();
}
function qConnect(){
sql_Conecta();
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
function qId($Tabla=''){
if( $Tabla!='' ) return $GLOBALS['_IdRegistro'][$Tabla];
return sql_Id();
}
function qQueryLog( $sql, $xTabla, $xWhere, $xClave='', $xUser='', $NewMode='', $NewAlta=true ){
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
if( $NewMode!='' ){
$xOp = $NewMode;
$Alta = $NewAlta;
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
function sql_Conecta(){
global $_DEBUG, $_HndDB, $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlInit, $_SqlTransaction;
if( $_HndDB!='' ) return;
if( $_SqlHostName=="" || $_SqlUsuario=="" || $_SqlPassword=="" || $_SqlDiccionario=="" ) eEnd("Falta la definición de la DDBB.");
if( $_DEBUG==4 ) eLogDebug("[ SQL:{$_SqlDiccionario} ]");
if( $_DEBUG==1 ) eTrace( "[Sql: {$_Sql} | HostName: {$_SqlHostName} | Usuario: {$_SqlUsuario} | Password: {$_SqlPassword} | Diccionario: {$_SqlDiccionario}]" );
$Pass = $_SqlPassword;
if( strlen($Pass)>8 && substr($Pass,0,8)==dechex(crc32(substr($Pass,8))) ) $Pass = gzuncompress(base64_decode(substr($Pass,8)));
$_HndDB = mysql_connect( $_SqlHostName, $_SqlUsuario, $Pass, true );
if( !$_HndDB ){
eTrace('ERROR al conectar con DB');
eEnd();
}
$GLOBALS["_SqlStart"] = true;
if( $_DEBUG==4 ) eLogDebug('[ SQL: '.$_HndDB.' ]');
if( $_DEBUG==1 ) eTrace( '[Sql: '.$_HndDB.' ]' );
mysql_select_db($_SqlDiccionario, $_HndDB);
if( mysql_errno() ){
if( $_DEBUG==30 ) return -1;
sql_Error();
}
if( $_SqlTransaction=='' ) $_SqlTransaction = false;
if( $_SqlTransaction ) sql_TranOn();
for( $n=0; $n<count($_SqlInit); $n++ ){
if( $_SqlInit[$n]=="<" ){
sql_Row($p);
}else{
sql_Query($_SqlInit[$n], $p, true);
}
}
if( isset($GLOBALS['_CheckFieldInWhere']) ){
list($Tabla,$GLOBALS['_CheckFieldInWhere']) = explode('.',$GLOBALS['_CheckFieldInWhere']);
$GLOBALS['_CheckFieldInWhere'] = $GLOBALS['_CheckFieldInWhere'].'=';
global $_DimCheckFieldInWhere;
$_DimCheckFieldInWhere[] = array();
qQuery('select * from '.$Tabla);
while($r=qRow()) $_DimCheckFieldInWhere[] = $r[0];
}
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ) __SpiderDDBB();
}
function sql_Busca( $Tabla, $Campos, $Condicion='', $Ordenacion='', &$Puntero=NULL ){
global $_Result, $_HndDB, $_DEBUG, $_DBLIMIT, $_SQL_, $_DBADDFILTER;
if( isset($GLOBALS['_CheckFieldInWhere']) ){
if( in_array($Tabla,$GLOBALS['_DimCheckFieldInWhere']) ){
if( !preg_match("/".$GLOBALS['_CheckFieldInWhere']."/i", $Condicion) ){
eInit();die('ERROR: select "'.$GLOBALS['_CheckFieldInWhere'].'"');
}
}
}
$Condicion = trim($Condicion);
$Limit = '';
if( !empty($Ordenacion) ){
if( substr_count ( $Ordenacion, ' group by ' ) > 0 ){
$tmp = explode(' group by ', $Ordenacion );
$Ordenacion = ' group by '.$tmp[1]. ' order by '.$tmp[0];
}else{
$Ordenacion = 'order by '.$Ordenacion;
}
}
if( !empty($_DBLIMIT) ) $Limit = 'limit '.$_DBLIMIT;
if( !empty($Condicion) ){
$sql = "select {$Campos} from {$Tabla} where {$Condicion} {$Ordenacion}";
$_SQL_ = "select {$Campos} from {$Tabla} where {$Condicion} {$Ordenacion}";
}else{
$sql = "select {$Campos} from {$Tabla} {$Ordenacion}";
$_SQL_ = $sql;
}
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("[{$sql}]");
if( func_num_args() < 5 ){
$_Result = mysql_query( $sql, $_HndDB );
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ) __SpiderDataDef($_Result, $sql);
if( mysql_errno( $_Result ) ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql );
}
}else{
$Puntero = mysql_query( $sql, $_HndDB );
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ) __SpiderDataDef($Puntero, $sql);
if( mysql_errno( $Puntero ) ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql );
}
}
}
function sql_Inserta($Tabla, $Campos, $Valores){
global $_Result, $_TReg, $_IdInsert, $_DEBUG, $_HndDB, $_IdRegistro;
if( isset($GLOBALS['_CheckFieldInWhere']) ){
if( in_array($Tabla,$GLOBALS['_DimCheckFieldInWhere']) ){
if( !preg_match("/".substr($GLOBALS['_CheckFieldInWhere'],0,-1)."/i", $Campos) ){
eInit();die('ERROR: Insert "'.$GLOBALS['_CheckFieldInWhere'].'"');
}
}
}
$sql = "insert into {$Tabla} ({$Campos}) values ({$Valores})";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("[{$sql}]");
$_Result = mysql_query( $sql, $_HndDB );
if( mysql_errno() ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql );
}
$_TReg = mysql_affected_rows( $_HndDB );
if( $_DEBUG==1 ) eTrace( "[Reg.Insertados: {$_TReg}]" );
array_push( $_IdInsert, array( trim($Tabla), mysql_insert_id( $GLOBALS['_HndDB'] ) ) );
$_IdRegistro[trim($Tabla)] = mysql_insert_id( $GLOBALS['_HndDB'] );
return $_TReg;
}
function sql_Modifica( $Tabla, $Grabar, $Condicion ){
global $_Result, $_TReg, $_DEBUG, $_HndDB;
if( !empty($Condicion) ) $Condicion = 'where '.$Condicion.'';
$sql = "update {$Tabla} set {$Grabar} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("[$sql]");
$_Result = mysql_query( $sql, $_HndDB );
if( mysql_errno() ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql );
}
$_TReg = mysql_affected_rows( $_HndDB );
if( $_DEBUG==1 ) eTrace( "[Reg.Modificados: {$_TReg}]" );
return $_TReg;
}
function sql_Borra( $Tabla, $Condicion ){
global $_Result, $_TReg, $_DEBUG, $_HndDB;
if( !empty($Condicion)  ) $Condicion = 'where '.$Condicion.'';
$sql = "delete from {$Tabla} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("[$sql]");
$_Result = mysql_query( $sql, $_HndDB );
if( mysql_errno() ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql );
}
$_TReg = mysql_affected_rows( $_HndDB );
if( $_DEBUG==1 ) eTrace( "[Reg.Borrados: {$_TReg}]" );
return $_TReg;
}
function sql_Libera( &$puntero=NULL ){
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug('[SQL:Libera]');
if( $_DEBUG==1 ) eTrace("[SQL:Libera]");
if( func_num_args() == 0 ){
mysql_free_result( $GLOBALS['_Result'] );
}else{
mysql_free_result( $puntero );
$puntero = null;
}
}
function sql_Desconecta(){
global $_HndDB, $_DEBUG, $_SqlTransaction;
if( $_DEBUG==4 ) eLogDebug("[Desconectado] ".$_HndDB);
if( $_SqlTransaction ) sql_TranOff();
if( $_DEBUG==1 ) eTrace("[Desconectado] ".$_HndDB);
mysql_close( $_HndDB );
$_HndDB = false;
}
$NumSqlError_ = false;
function sql_Error( $sql='' ){
global $_User, $_Node, $NumSqlError_, $_DEBUG, $_Development, $_ErrReportTo, $_ErrReportToDev, $_ErrReportUserNode;
global $_ErrReportMessage, $_ErrReportFrom, $_ErrReportCc, $_ErrReportBCc, $_HndDB, $_PathAdd;
if( $_DEBUG==-1 ) eTrace('ERROR:[ '.mysql_errno().' : '.mysql_error().' ]');
if( $_DEBUG==4 ) eLogDebug('ERROR:[ '.mysql_errno().' : '.mysql_error()." ]");
if( $GLOBALS['php_errormsg']=='Parse error' ) die($GLOBALS['php_errormsg']);
$_User *= 1;
$Cdi = date('Y-m-d H:i:s');
qErrorFile(trim(mysql_errno()).' : '.trim(mysql_error()), $sql, $pkError);
if( $_ErrReportToDev!='' && (in_array('u'.$_User, $_ErrReportUserNode) || in_array('n'.$_Node, $_ErrReportUserNode)) ){
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=ISO-8859-1\r\n";
$Cabeceras .= "From: ".$_ErrReportFrom."\r\n";
$cd = zend_get_id();
if( is_array($cd) ) list($cd) = $cd;
mail($_ErrReportToDev, "Seguimiento de error: Node:{$_Node}, User:{$_User} ".$cd, stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras);
}else if( $_ErrReportTo!='' ){
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=ISO-8859-1\r\n";
$Cabeceras .= "From: ".$_ErrReportFrom."\r\n";
if( $_ErrReportFrom!='' ) $Cabeceras .= "Reply-To: ".$_ErrReportFrom."\r\n";
if( $_ErrReportCc  !='' ) $Cabeceras .= "Cc: ".$_ErrReportCc."\r\n";
if( $_ErrReportBCc !='' ) $Cabeceras .= "Bcc: ".$_ErrReportBCc."\r\n";
$Cabeceras .= "X-Mailer: PHP/" . phpversion();
$cd = zend_get_id();
if( is_array($cd) ) list($cd) = $cd;
mail($_ErrReportTo, $_ErrReportMessage.' '.$cd, stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras);
}
eInit();
$ScriptSys = ($GLOBALS['OriFichero']=='$a/d/list_gen.edf');
_ShowCallSrv();
if( $_Development || $_SESSION['_D_']!='' ){
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
if( $NumSqlError_ ) eEnd();
$NumSqlError_ = true;
if( substr_count( $_SERVER['REQUEST_URI'],'edes.php?' ) == 1 ){
$tmp = explode('edes.php?',$_SERVER['REQUEST_URI']);
$_SERVER['REQUEST_URI'] = 'edes.php?'.trim($tmp[1]);
}
$_SERVER['REQUEST_URI'] = eEntityEncode($_SERVER['REQUEST_URI']);
$sql = trim(eEntityEncode($sql));
$TxtError = trim(eEntityEncode($TxtError));
$sqlError = "insert into {$_SESSION['ShareDictionary']}gs_error (    cdi  ,cd_gs_user, tipo, desde,             fichero       , linea, texto, trace ) values ".
"( '{$Cdi}','{$_User}', 'S', 'PHP','{$_SERVER['REQUEST_URI']}',   0  ,   '' , 'mysql: {$TxtError}\n\n{$sql}' )";
switch( $_SESSION['_iSql'] ){
case 'mysql':
include_once($_PathAdd.'../../edesweb/mysql.class.inc');
$db = new eMySql();
break;
case 'mysqli':
include_once($_PathAdd.'../../edesweb/mysqli.class.inc');
$db = new eMySqli();
break;
case 'informix':
include_once($_PathAdd.'../../edesweb/informix.class.inc');
$db = new eInformix();
break;
case 'oracle':
include_once($_PathAdd.'../../edesweb/oracle.class.inc');
$db = new eOracle();
break;
case 'pdo':
include_once($_PathAdd.'../../edesweb/pdo.class.inc');
$db = new ePdo();
break;
}
$db->qConnect('sql');
$db->qQuery($sqlError);
$db->qEnd();
if( mysql_errno() ) eTrace('ERROR: gs_error');
eEnd();
}
function sql_Result( $i ){
return mysql_result( $GLOBALS['_Result'], $i );
}
function sql_Query($sql, &$Puntero=NULL, $Continuar=false){
global $_Result, $_TReg, $_DEBUG, $_HndDB, $_SQL_;
$sql = trim($sql);
if( isset($GLOBALS['_CheckFieldInWhere']) ){
$xSql = strtr(strtolower($sql),chr(10).chr(13).chr(9),'   ');
list(,$Tabla) = explode(' from ',$xSql);
list($Tabla) = explode(' ',trim($Tabla));
if( preg_match("/^select /i", $sql) ){
if( in_array($Tabla,$GLOBALS['_DimCheckFieldInWhere']) ){
if( !preg_match("/".$GLOBALS['_CheckFieldInWhere']."/i", $xSql) ){
eEnd('select "'.$GLOBALS['_CheckFieldInWhere'].'"');
}
}
}else if( preg_match("/^insert /i", $sql) ){
if( in_array($Tabla,$GLOBALS['_DimCheckFieldInWhere']) ){
if( !preg_match("/".substr($GLOBALS['_CheckFieldInWhere'],0,-1)."/i", $xSql) ){
eEnd('Insert "'.$GLOBALS['_CheckFieldInWhere'].'"');
}
}
}
}
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("[{$sql}]");
$_TReg = -1;
if( func_num_args() == 1 ){
$_Result = mysql_query( $sql, $_HndDB );
if( $_SESSION["_SPIDER_"]["opcion"]=="S" && !preg_match("/set/i", $sql) ) __SpiderDataDef($_Result, $sql);
if( mysql_errno() ){
if( !$Continuar ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql );
}
}else{
$_TReg = mysql_affected_rows( $_Result );
}
}else{
$Puntero = mysql_query( $sql, $_HndDB );
if( $_SESSION["_SPIDER_"]["opcion"]=="S" && !preg_match("/set/i", $sql) ) __SpiderDataDef($Puntero, $sql);
if( mysql_errno() ){
if( !$Continuar ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql );
}
}else{
$_TReg = mysql_affected_rows( $Puntero );
}
}
if( strtoupper(substr($sql,0,6))=='INSERT' ){
$tmp = str_replace('  ',' ',str_replace("\t",' ',str_replace("\n",' ',str_replace("\r",' ',str_replace('(',' ',$sql)))));
$tmp = explode(' ',$tmp);
$Tabla = trim($tmp[2]);
global $_IdInsert, $_IdRegistro;
array_push($_IdInsert, array($Tabla, sql_Id()));
$_IdRegistro[$Tabla] = sql_Id();
}else if( substr($sql,0,6)=='select' ) $_SQL_ = $sql;
if( $_DEBUG==1 ) eTrace("[Reg.Query: {$_TReg}]");
return $_TReg;
}
function sql_Cuenta( $Tabla, $Condicion=NULL, &$Puntero=NULL ){
global $_Result, $_TReg, $_DEBUG, $_HndDB;
if( isset($GLOBALS['_CheckFieldInWhere']) ){
if( in_array($Tabla,$GLOBALS['_DimCheckFieldInWhere']) ){
if( !preg_match("/".$GLOBALS['_CheckFieldInWhere']."/i", $Condicion) ){
eEnd('Count "'.$GLOBALS['_CheckFieldInWhere'].'"');
}
}
}
if( trim($Condicion)!='' ){
$Condicion = 'where '.$Condicion.'';
}else{
}
$sql = "select count(*) from {$Tabla} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("[{$sql}]");
if( func_num_args() < 3 ){
$_Result = mysql_query( $sql, $_HndDB );
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ) __SpiderDataDef($_Result, $sql);
if( mysql_errno() ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql );
}
$_TReg = mysql_result( $_Result, 0 );
}else{
$Puntero = mysql_query( $sql, $_HndDB );
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ) __SpiderDataDef($Puntero, $sql);
if( mysql_errno() ){
if( $_DEBUG==30 ) return -1;
sql_Error( $sql );
}
$_TReg = mysql_result( $Puntero, 0 );
}
if( $_DEBUG==1 ) eTrace( "[Total Reg: {$_TReg}]" );
return $_TReg;
}
function sql_Fila($Puntero=NULL){
if( func_num_args() == 0 ){
$r = mysql_fetch_row( $GLOBALS['_Result'] );
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ) __SpiderDataPut($GLOBALS['_Result'], $r);
}else{
$r = mysql_fetch_row( $Puntero );
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ) __SpiderDataPut($Puntero, $r);
}
return $r;
}
function sql_Array( $Puntero=NULL ){
if( func_num_args() == 0 ){
$r = mysql_fetch_assoc( $GLOBALS['_Result'] );
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ) __SpiderDataPut($GLOBALS['_Result'], $r);
}else{
$r = mysql_fetch_assoc( $Puntero );
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ) __SpiderDataPut($Puntero, $r);
}
return $r;
}
function sql_Id($Tabla=""){
if( $Tabla!="" ) return $GLOBALS['_IdRegistro'][$Tabla];
return mysql_insert_id( $GLOBALS['_HndDB'] );
}
function sql_Seek( $i ){
return mysql_data_seek( $GLOBALS['_Result'], $i);
}
function sql_NombreCampo( $i ){
return mysql_field_name( $GLOBALS['_Result'], $i );
}
function sql_TipoCampo( $i ){
return mysql_field_type( $GLOBALS['_Result'], $i );
}
function sql_LongitudCampo( $i ){
return mysql_field_len( $GLOBALS['_Result'], $i );
}
function sql_FlagsCampo( $i ){
return mysql_field_flags( $GLOBALS['_Result'], $i );
}
function sql_TotalCampos(){
return mysql_num_fields( $GLOBALS['_Result'] );
}
function sql_Bloquea(){
}
function sql_Desbloquea(){
}
function sql_TranOn(){
global $_DEBUG, $_SqlTransaction, $_HndDB;
if( !$_SqlTransaction ) return;
if( $_DEBUG==4 ) eLogDebug("START TRANSACTION");
if( $_DEBUG==1 ) eTrace('[START TRANSACTION]');
$_Result = mysql_query('START TRANSACTION', $_HndDB);
if( mysql_errno( $_Result ) ){
if( $_DEBUG==30 ) return -1;
sql_Error('START TRANSACTION');
}
}
function sql_TranOff(){
global $_DEBUG, $_SqlTransaction, $_HndDB;
if( !$_SqlTransaction ) return;
if( $_DEBUG==4 ) eLogDebug("COMMIT");
if( $_DEBUG==1 ) eTrace('[COMMIT]');
$_Result = mysql_query('COMMIT', $_HndDB);
if( mysql_errno( $_Result ) ){
if( $_DEBUG==30 ) return -1;
sql_Error('COMMIT');
}
}
function sql_TranBack(){
global $_DEBUG, $_HndDB;
if( $_DEBUG==4 ) eLogDebug("ROLLBACK");
if( $_DEBUG==1 ) eTrace('[ROLLBACK]');
$_Result = mysql_query('ROLLBACK', $_HndDB);
if( mysql_errno( $_Result ) ){
if( $_DEBUG==30 ) return -1;
sql_Error('ROLLBACK');
}
}
function sql_Log($Log, $sOpe, $sTabla, $sSql, $xClave=''){
global $_DEBUG, $_HndDB, $_Result, $_TReg, $_User, $_DBSERIAL;
if( $xClave!='' ){
$sClave = $xClave;
}else{
$sClave = '';
for( $n=0; $n<count($Log); $n++ ){
$Log[$n] = trim($Log[$n]);
if( $sOpe=='A' && $_DBSERIAL[0]==$sTabla && $_DBSERIAL[1]==$Log[$n] ){
$sClave .= $GLOBALS['_nSerial'];
}else{
$sClave .= $GLOBALS[$Log[$n]];
}
}
}
$sql = 'insert into gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "'.$sOpe.'", "'.$_User.'", "'.$sTabla.'", "'.$sClave.'", "'.str_replace('"','\"',trim(stripslashes( $sSql ))).'" )';
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Log:[{$sql}]");
$_Result = mysql_query( $sql, $_HndDB );
if(!$_Result ) sql_Error( $sql );
}
function sql_Informa( $sql, &$DimCondicion, &$TxtOrdenacion, $_PDFTH, $_Form, $_TIPTH=NULL, $_sGRID=NULL ){
global $_PDFLABELHIDDEN, $_RELATIONFIELDS, $_gs_formato_, $PDF_TxtOrderBy, $_PDFVALUELHIDDEN, $_PDFCONDITIONHIDDEN, $_TReg, $_DEBUG, $_DBTABLE, $OriFichero, $_User;
global $_ClearShowFilter;
$sTReg = $_TReg;
$CondicionOriginal = array();
$sql = str_replace( "\n", ' ', $sql );
$Depurar = false;
if( $Depurar ) eTrace( '|'.$sql.'|' );
if( trim($sql)=='' ){
global $OriFichero, $_User, $_SQL_;
$tmpCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.sql";
if( file_exists( $tmpCursor ) ){
$_SERIALIZE = unserialize( file_get_contents( $tmpCursor ) );
foreach( $_SERIALIZE as $k=>$v ) ${$k} = $v;
unset($_SERIALIZE);
$sql = $_SQL_;
}
}
if( trim($sql)=='' ){
global $_SQL_;
$sql = $_SQL_;
}
if( $Depurar ) eTrace( '|'.$sql.'|' );
$DimCampoCondi = array();
$DimCondicion = array();
$TxtOrdenacion = '';
$sql = trim($sql);
if( strtoupper(substr($sql,0,6)) == 'WHERE ' ){
$sql = ' '.$sql;
}
$Cambio = array( ' from ', ' where ',' order by ', ' group by ',' like ', ' and ', ' or ', ' extend(', ' matches' );
for( $i=0; $i<count($Cambio); $i++ ){
$sql = str_replace( $Cambio[$i], strtoupper($Cambio[$i]), $sql );
}
if( $Depurar ) eTrace( '|'.$sql.'|' );
$Cambio = array( array('%','*'), array('_','?'), array(' LIKE ','='), array(' MATCHES ','=') );
for($i=0; $i<count($Cambio); $i++){
$sql = str_replace( $Cambio[$i][0], $Cambio[$i][1], $sql );
}
if( $Depurar ) eTrace( 'REPLACE|'.$sql.'|' );
$DimCampos = sql_DimFields( $sql );
if( substr_count( $sql, ' FROM ' ) > 0 ){
$sql = explode( ' FROM ', $sql );
$sql = $sql[1];
}
if( $Depurar ) eTrace( 'FROM|'.$sql.'|' );
if( substr_count( $sql, ' WHERE ' ) > 0 ){
$sql = explode( ' WHERE ', $sql );
$sql = $sql[1];
}
if( $Depurar ) eTrace( 'WHERE|'.$sql.'|' );
if( isset($PDF_TxtOrderBy) ){
$TxtOrdenacion = $PDF_TxtOrderBy;
}else if( substr_count( $sql, ' ORDER BY ') > 0 ){
$sql = explode( ' ORDER BY ', $sql );
$TxtOrdenacion = $sql[1];
$sql = $sql[0];
if( substr_count( $TxtOrdenacion, ' GROUP BY ' ) > 0 ){
$TxtOrdenacion = explode( ' GROUP BY ', $TxtOrdenacion );
$TxtOrdenacion = $TxtOrdenacion[0];
}
$tmp = explode( ',',$TxtOrdenacion );
$TxtOrdenacion = '';
for( $i=0; $i<count($tmp); $i++ ){
$campo = $atributo = '';
list( $campo, $atributo ) = explode( ' ',trim($tmp[$i]) );
$campo = trim($campo);
if( is_int($campo*1) && $campo*1 > 0 ){
$campo = $DimCampos[$campo*1-1];
list( $campo, $atributo ) = explode( ' ',$campo );
$campo = trim($campo);
}
if( substr_count( $campo, '.' ) > 0 ) list(,$campo) = explode('.',$campo);
$campo = trim($campo);
if( $TxtOrdenacion!='' ) $TxtOrdenacion .= ', ';
$puntero = null;
if( sql_Cuenta("{$_SESSION['ShareDictionary']}gs_campo", "tabla='{$_DBTABLE}' and campo='{$campo}'", $puntero)>0 ){
sql_Query("select etiqueta, label_tab from {$_SESSION['ShareDictionary']}gs_campo where tabla='{$_DBTABLE}' and campo='{$campo}'", $puntero);
$row = sql_Fila( $puntero );
if( trim($row[1])!='' ){
$TxtOrdenacion .= trim($row[1]);
}else{
$TxtOrdenacion .= trim($row[0]);
}
}else{
$sEti='';
if( $_PDFLABELHIDDEN[$campo]!='' ) $sEti = $_PDFLABELHIDDEN[$campo];
if( $sEti == '' ){
for($c=0;$c<count($_Form);$c++){
if( $_Form[$c][1]==$campo ){
if( $sEti=='' && $_PDFTH[$c]!=''		) $sEti = $_PDFTH[$c];
if( $sEti=='' && $_Form[$c][0]!=''	) $sEti = $_Form[$c][0];
if( $sEti=='' && $_TIPTH[$c]!=''		) $sEti = $_TIPTH[$c];
break;
}
}
}
if( $_sGRID!=null ){
for( $n=0; $n<count($_sGRID); $n++ ){
if( $campo == $_sGRID[$n][0] ){
$sEti = '';
break;
}
}
}
if( $sEti=='' ){
}else{
$sEti = str_replace('&nbsp;',' ',$sEti);
$sEti = str_replace('&NBSP;',' ',$sEti);
$sEti = str_replace('<BR>',' ',$sEti);
$sEti = str_replace('<br>',' ',$sEti);
$sEti = str_replace('<Br>',' ',$sEti);
$sEti = str_replace('<bR>',' ',$sEti);
$TxtOrdenacion .= $sEti;
}
}
}
$TxtOrdenacion = trim($TxtOrdenacion);
if( substr($TxtOrdenacion,-1)==',') $TxtOrdenacion = substr($TxtOrdenacion,0,-1);
}
if( $Depurar ) eTrace( 'WHERE (sin order by)|'.$sql.'|' );
if( substr_count( $sql, ' GROUP BY ' ) > 0 ){
$sql = explode( ' GROUP BY ', $sql );
$sql = $sql[0];
}
if( $Depurar ) eTrace( 'GROUP BY|'.$sql.'|' );
while( substr_count( $sql, ' EXTEND(' ) > 0 ){
$ei = strpos( $sql, ' EXTEND(' );
$ci = $ei+8;
$cf = strpos( $sql, ',', $ei+1 );
$ef = strpos( $sql, ')', $ei+1 );
$sql = substr( $sql, 0, $ei+1 ).
substr( $sql, $ei+8, $cf-$ei-8 ).
substr( $sql, $ef+1 );
}
if( $Depurar ) eTrace( 'CALCULA CONDICIONES|'.$sql.'|' );
$tmp = explode( ' AND ', trim($sql) );
for($i=0; $i<count($tmp); $i++){
$dato = trim($tmp[$i]);			if( $Depurar ) eTrace( $i.'.CONDICION |'.$dato.'|' );
if( trim($dato) == '' ) continue;
$etiqueta = $campo = $valor = $condi = $sCondi = '';
$FuncSql = '';
$sp = 0;
for( $p=$sp; $p<strlen($dato); $p++ ){
$c = substr( $dato, $p, 1 );
if( $c=='(' ){
$FuncSql = strtoupper(trim(substr($dato,0,$p)));
if( substr( $dato, $p+1, 1 )==' ' ) $p++;
continue;
}
if( substr_count( '<>=! '.chr(9), $c ) > 0 ){
$sp = $p;
break;
}else{
$campo .= $c;
}
}
$campo = trim($campo);
if( substr_count( $campo, '.' ) > 0 ){
list(,$campo ) = explode('.',$campo);
$campo = trim($campo);
}
if( substr_count($campo,' ')>0 ) list($campo) = explode(' ',$campo);
if( $FuncSql!='' ){
list($campo) = explode(',',$campo);
$campo = trim($campo);
for( $p=$sp; $p<strlen($dato); $p++ ){
if( substr($dato,$p,1)==')' ){
$sp = $p+1;
break;
}
}
}
if( substr($campo,-1)==']' && substr_count($campo,']')>0 ) $campo = trim(substr($campo,0,strpos($campo,'[')));
if( $Depurar ) eTrace( $i.'.CAMPO |'.$campo.'| '.$FuncSql );
$tmp2 = strtoupper(trim(substr($dato,$sp)));
if( substr($tmp2,0,7)=='NOT IN ' ){
$condi = '<>'; $sCondi = 'NOT IN';
$sp += 7;
}else if( substr($tmp2,0,3)=='IN ' ){
$condi = '='; $sCondi = 'IN';
$sp += 3;
}else if( substr($tmp2,0,5)=='LIKE ' ){
$condi = '='; $sCondi = 'LIKE';
$sp += 5;
}else if( substr($tmp2,0,8)=='IS NULL ' ){
$condi = '='; $sCondi = 'IS NULL';
$sp += 8;
}else if( substr($tmp2,0,12)=='IS NOT NULL ' ){
$condi = '='; $sCondi = 'IS NOT NULL';
$sp += 12;
}else{
$Ini = false;
for( $p=$sp; $p<strlen($dato); $p++ ){
$c = substr( $dato, $p, 1 );
if( $c==' ' && !$Ini ) continue;
$Ini = true;
if( substr_count( '<>=!', $c ) > 0 ){
$condi .= $c;
}else{
$sp = $p;
break;
}
}
if( $c == ' ' ) {
for( $p=$sp; $p<strlen($dato); $p++ ){
$c = substr( $dato, $p, 1 );
if( $c!=' ' ) break;
}
}
}
if( $Depurar ) eTrace($i.'.RELACION |'.$condi.'|'.$sCondi);
$valor = trim(substr( $dato, $sp ));
$c = $valor[0];
if( $c=='(' && substr($valor,-1)==')' && ($sCondi == 'NOT IN' || $sCondi == 'IN') ){
$valor = substr($valor,1,-1);
$tmp2 = ''; $pc = '';
$Cadena = false;
for( $p=0; $p<strlen($valor); $p++ ){
$l = substr( $valor, $p, 1 );
if( $l=='"' || $l== "'" ){
if( !$Cadena ){
$pc = $l;
$Cadena = true;
}else if( $pc == $l ) $Cadena = false;
}else if( $l==',' && !$Cadena ){
if( $sCondi!='NOT IN' ){
$l = ' o ';
}else{
$l = ' y ';
}
}
$tmp2 .= $l;
}
$valor = $tmp2;
}else if( $c == '"' || $c== "'" ){
for( $p=1; $p<strlen($valor); $p++ ){
$l = substr( $valor, $p, 1 );
if( $l==$c ){
if( ($p+1)!=strlen($valor) ){
$tmp2 = trim(substr( $valor, $p+1 ));
if( substr($tmp2,0,3)=='OR ' ) $tmp2 = trim(substr($tmp2,3));
$valor = substr( $valor, 0, $p+1 );
if( $tmp2!=')' ){
$tmp[] = $tmp2; if( $Depurar ) eTrace($i.' ---> NewCampo |'.$tmp2);
}
}
break;
}
}
}
if( $Depurar ){
eTrace($i.'.VALOR |'.$valor.'|');
eTrace($i.' ['.$campo.']['.$condi.']['.$valor.']<br>' );
}
if( $valor!='' && $valor[0]!='"' && $valor[0]!="'" && !is_numeric($valor) ){
if( $Depurar ) eTrace($i.' ---> Condicion anulada<br>');
continue;
}
$puntero = null;
$etiqueta = '';
if( $_PDFLABELHIDDEN[$campo]!='' ) $etiqueta = $_PDFLABELHIDDEN[$campo];
if( $etiqueta == '' ){
for($p=0;$p<count($_Form);$p++){
if( $_Form[$p][1]==$campo ){
if( $etiqueta=='' && $_PDFTH[$p]!=''		) $etiqueta = $_PDFTH[$p];
if( $etiqueta=='' && $_Form[$p][0]!=''	) $etiqueta = $_Form[$p][0];
if( $etiqueta=='' && $_TIPTH[$p]!=''		) $etiqueta = $_TIPTH[$p];
break;
}
}
}
if( $etiqueta == '' ){
if( sql_Cuenta("{$_SESSION['ShareDictionary']}gs_campo", "tabla='{$_DBTABLE}' and campo='{$campo}'", $puntero)>0 ){
sql_Query("select etiqueta, label_tab from {$_SESSION['ShareDictionary']}gs_campo where tabla='{$_DBTABLE}' and campo='{$campo}'", $puntero);
$row = sql_Fila( $puntero );
if( trim($row[1])!='' ){
$etiqueta .= trim($row[1]);
}else{
$etiqueta .= trim($row[0]);
}
}
}
if( $etiqueta == '' && substr($campo,0,3)=='cd_' ){
for($p=0;$p<count($_Form);$p++){
if( substr($campo,0,3)=='cd_' && $_Form[$p][1]=='nm_' .substr($campo,3) ){
if( $etiqueta=='' && $_PDFTH[$p]!=''		) $etiqueta = $_PDFTH[$p];
if( $etiqueta=='' && $_Form[$p][0]!=''	) $etiqueta = $_Form[$p][0];
if( $etiqueta=='' && $_TIPTH[$p]!=''		) $etiqueta = $_TIPTH[$p];
break;
}
}
}
$etiqueta = eStrUpper($etiqueta);
if( strtoupper($_PDFLABELHIDDEN[$campo])=='NOTTOSHOW' ) continue;
if( $Depurar ) eTrace( $i.' |'.trim($etiqueta).'|'.$condi.'|'.$valor.'| > |'.$campo.'|'.$dato.'|' );
$etiqueta = str_replace('&nbsp;',' ',$etiqueta);
$etiqueta = str_replace('&NBSP;',' ',$etiqueta);
$etiqueta = str_replace('<BR>',' ',$etiqueta);
$etiqueta = str_replace('<br>',' ',$etiqueta);
$etiqueta = str_replace('<Br>',' ',$etiqueta);
$etiqueta = str_replace('<bR>',' ',$etiqueta);
$etiqueta = trim($etiqueta);
if( $etiqueta!='' ){
$valor = trim($valor);
$ExisteTabla = false;
if( substr($campo,0,3)=='cd_' ){
$sDEBUG = $_DEBUG;
$_DEBUG = 30;
if( substr($campo,0,3)=='cd_' ) $SeekTabla = substr($campo,3);
if( sql_Query( 'show columns from '.$SeekTabla, $p )!=-1 ){
$row = sql_Fila($p);
$ExisteTabla = ($row[0]!='');
}
$_DEBUG = $sDEBUG;
}
if( substr($campo,0,3)=='cd_' && $ExisteTabla ){
$MasWhere = '';
for( $p=0; $p<count($_RELATIONFIELDS); $p++ ){
if( substr_count( $_RELATIONFIELDS[$p], ','.$campo.',' ) == 1 ){
$pi = strpos($_RELATIONFIELDS[$p],','.$campo.',');
if( $i>0 ){
$tmpCondi = explode(',',substr($_RELATIONFIELDS[$p],1,$pi-1));
for( $p2=0; $p2<count($tmpCondi); $p2++ ){
if( $MasWhere!='' ) $MasWhere .= ' and ';
$MasWhere .= $CondicionOriginal[$tmpCondi[$p2]];
}
}
}
}
if( $MasWhere!='' ) $MasWhere = ' and '.$MasWhere;
if( substr($campo,0,3)=='cd_' ){
$xTabla = substr($campo,3);
$xCampos = "cd_{$xTabla},nm_{$xTabla}";
sql_Busca( $xTabla, $xCampos, $campo.$condi.$valor.$MasWhere, "nm_{$xTabla}", $p );
}
$row = sql_Fila( $p );
if( trim($row[1])!='' ){
$CondicionOriginal[$campo] = $campo.$condi.$valor;
$valor = trim($row[1]);
}else{
if( $_PDFVALUELHIDDEN[$campo]!='' ) $valor = ( @eval( 'return ('.str_replace('()',"({$valor})",$_PDFVALUELHIDDEN[$campo]).');' ) );
$CondicionOriginal[$campo] = $campo.$condi.$valor;
if( $valor[0]=='"' || $valor[0]=="'" ) $valor = substr($valor,1,-1);
}
}else{
if( $_PDFVALUELHIDDEN[$campo]!='' ) $valor = ( @eval( 'return ('.str_replace('()',"({$valor})",$_PDFVALUELHIDDEN[$campo]).');' ) );
$CondicionOriginal[$campo] = $campo.$condi.$valor;
if( $valor[0]=='"' || $valor[0]=="'" ) $valor = substr($valor,1,-1);
}
if( strlen($valor)==10 && substr($valor,4,1)=='-' && substr($valor,7,1)=='-' && substr_count($valor,'-')==2 ) $valor = substr($valor,8,2).'-'.substr($valor,5,2).'-'.substr($valor,0,4);
if( ( substr($campo,0,3)=='dt_' || substr($campo,0,4)=='_dt_' ) && strlen($valor)==8 ) $valor = substr($valor,6,2).'-'.substr($valor,4,2).'-'.substr($valor,0,4);
$Saltar = false;
for( $h=0; $h<count($_PDFCONDITIONHIDDEN); $h++ ) if( $_PDFCONDITIONHIDDEN[$h]==$campo.$condi.$valor ) $Saltar = true;
if( $Saltar ) continue;
$Sumar = true;
if( count($DimCondicion) > 0 ){
if( $DimCampoCondi[count($DimCampoCondi)-1][0] == $etiqueta ){
if( $condi=='=' ){
$DimCondicion[count($DimCondicion)-1] .= ' o '.$valor;
}else{
$DimCondicion[count($DimCondicion)-1] .= ' y '.$condi.' '.$valor;
}
$Sumar = false;
}
}
if( $Sumar ){
array_push( $DimCondicion, $etiqueta.' '.$condi.' '.$valor );
array_push( $DimCampoCondi, array($etiqueta,$campo) );
}
}
}
global $_LISTCOMPARE;
if( $_LISTCOMPARE[1]!='' ){
list( $oCmp, $dCmp ) = explode(',',$_LISTCOMPARE[1]);
$oCmp = trim($oCmp);
global ${$oCmp}, ${$dCmp};
if( $_gs_formato_!='P' ){
for( $p=0; $p<count($DimCampoCondi); $p++ ){
if( $DimCampoCondi[$p][1] == $oCmp ){
$tmp = str_replace('"','',${$oCmp});
$tmp = TransformaFecha( $tmp );
$tmp = str_replace($oCmp,'',$tmp);
$FechasIguales = ( substr_count( $tmp,' and ') == 0 );
$tmp = str_replace(' and ',' y ',$tmp);
$tmp = str_replace('=','= ',$tmp);
$ss = str_replace( $etiqueta, strtoupper($_PDFLABELHIDDEN[$dCmp]), $DimCondicion[$p] );
if( $FechasIguales ){
$xoCmp = TransformaFecha( ${$oCmp} );
$xdCmp = TransformaFecha( ${$dCmp} );
$ss = str_replace( $xoCmp, $xdCmp, $ss );
if( substr_count( $tmp,'=') == 0 && substr_count( $tmp,'<') == 0 && substr_count( $tmp,'>') == 0 ) $tmp = '='.$tmp;
}
$DimCondicion[$p] = $etiqueta.' '.$tmp;
array_push( $DimCondicion, $ss );
}
}
}else{
for( $p=0; $p<count($DimCampoCondi); $p++ ){
if( $DimCampoCondi[$p][1] == $oCmp ){
$tmp = str_replace('"','',${$dCmp});
$tmp = TransformaFecha( $tmp );
$tmp = str_replace($dCmp,'',$tmp);
$FechasIguales = ( substr_count( $tmp,' and ') == 0 );
$tmp = str_replace(' and ',' y ',$tmp);
$tmp = str_replace('=','= ',$tmp);
if( $FechasIguales ){
if( substr_count( $tmp,'=') == 0 && substr_count( $tmp,'<') == 0 && substr_count( $tmp,'>') == 0 ) $tmp = '='.$tmp;
}
$etiqueta = strtoupper($_PDFLABELHIDDEN[$dCmp]);
array_push( $DimCondicion, $etiqueta.' '.$tmp );
}
}
}
}
mysql_data_seek( $GLOBALS['_Result'], 0 );
$_TReg = $sTReg;
if( $_ClearShowFilter ) $DimCondicion = array();
if( function_exists('eChangeListCondition') ) $DimCondicion = eChangeListCondition( $DimCondicion );
}
function TransformaFecha( $tmp ){
for( $c=0; $c<strlen($tmp); $c++ ){
if( substr_count('0123456789',substr($tmp,$c,1)) == 1 ){
if( substr($tmp,7+$c,1) == '-' && substr($tmp,4+$c,1)=='-' ){
$tmp = substr($tmp,0,$c).substr($tmp,8+$c,2).'-'.substr($tmp,5+$c,2).'-'.substr($tmp,0+$c,4) . substr($tmp,10+$c);
$c += 10;
}
}
}
return $tmp;
}
function sql_DimFields( $sql ){
$DimCampo = array();
$sql = trim($sql);
if( strtoupper(substr($sql,0,7)) == 'SELECT ' ) $sql = substr($sql,7);
if( substr_count( strtoupper($sql), ' FROM ' ) > 0 ){
$sql = substr($sql,0,strpos(strtoupper($sql), ' FROM ') );
}
$Expresion = false;
$NomCampo = '';
for( $c=0; $c<strlen($sql); $c++ ){
$ca = substr($sql,$c,1);
switch( $ca ){
case '[':
case '(':
$Expresion = true;
$NomCampo .= $ca;
break;
case ']':
case ')':
$Expresion = false;
$NomCampo .= $ca;
break;
case ',':
if( $Expresion ){
$NomCampo .= $ca;
}else{
$DimCampo[] = $NomCampo;
$NomCampo = '';
}
break;
default:
$NomCampo .= $ca;
}
}
$DimCampo[] = $NomCampo;
for( $c=0; $c<count($DimCampo); $c++ ){
if( substr_count($DimCampo[$c],' as ') > 0 ){
list( , $txt ) = explode(' as ',$DimCampo[$c]);
$DimCampo[$c] = trim($txt);
}else if( substr_count($DimCampo[$c],'(') > 0 ){
list( $comando, $txt ) = explode('(',$DimCampo[$c]);
if( $comando!='COUNT' ){
list( $txt ) = explode(',',$txt);
$DimCampo[$c] = trim($txt);
}
}
}
return $DimCampo;
}
function qExists( $Tabla ){
if( $_DEBUG==4 ) eLogDebug('[qExists]');
if( $_DEBUG==1 ) eTrace("[qExists]");
qQuery("show tables like '{$Tabla}'", $p1);
$r=qRow($p1);
return($Tabla==$r[0]);
}
sql_Conecta();
?>
