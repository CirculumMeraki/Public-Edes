<?PHP
class eOracle {
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
$_PathCurrent = str_replace(chr(92),'/',getCWD());
$_PathCurrent = substr($_PathCurrent,strrpos($_PathCurrent,'/')+1);
if( $_PathCurrent=='cron' ) $_PathAdd = '../';
$NomDef = str_replace(chr(92),'/',$NomDef);
if( substr_count($NomDef,'.')==0 ) $NomDef .= '.ini';
if( substr_count($NomDef,'/')==0 ) $NomDef = "{$_PathAdd}../_datos/config/{$NomDef}";
$txt = trim(file_get_contents($NomDef));
if( substr($txt,0,2)!='<'.'?' ){
eval(gzuncompress($txt));
}else{
eval(substr( $txt, ( ( strtoupper(substr($txt,0,5))=='<'.'?PHP' ) ? 5 : 2 ), -2 ));
}
if( $_SqlHostName=="" || $_SqlUsuario=="" || $_SqlPassword=="" || $_SqlDiccionario=="" ) eEnd("Falta la definición de la DDBB.");
$this->_Sql = $_Sql;
$this->_SqlHostName = $_SqlHostName;
$this->_SqlUsuario = $_SqlUsuario;
$this->_SqlPassword = $_SqlPassword;
$this->_SqlDiccionario = $_SqlDiccionario;
$this->_SqlInit = $_SqlInit;
global $_DEBUG, $_Development, $_DBSEQUENCE;
if( $_DBSEQUENCE!='' && strtoupper($_DBSEQUENCE)=='NO' ) $_DBSEQUENCE = 'NO';
if( $_DEBUG==4 ) eLogDebug("[ClassSQL:{$this->_SqlDiccionario}]");
if( $_DEBUG==1 ) eTrace("[ClassSQL: {$this->_Sql} | HostName: {$this->_SqlHostName} | Usuario: {$this->_SqlUsuario} | Password: {$this->_SqlPassword} | Diccionario: {$this->_SqlDiccionario}]");
if( $this->_SqlCharacterSet=='' ) $this->_SqlCharacterSet = 'WE8ISO8859P15';
$Pass = $this->_SqlPassword;
if( strlen($Pass)>8 && substr($Pass,0,8)==dechex(crc32(substr($Pass,8))) ) $Pass = gzuncompress(base64_decode(substr($Pass,8)));
$this->_HndDB = OCILogOn( $this->_SqlUsuario, $Pass, $this->_SqlHostName, $this->_SqlCharacterSet );
if( !$this->_HndDB ){
if( $_DEBUG==30 ) return -1;
eTrace('ERROR al conectar con DB');
eEnd();
}
$GLOBALS["_SqlStartSystem"] = true;
$stmt = OCIParse($this->_HndDB, "ALTER SESSION SET NLS_DATE_FORMAT = 'YYYY-MM-DD'" );
OCIExecute($stmt);
$stmt = OCIParse($this->_HndDB, "ALTER SESSION SET NLS_TIMESTAMP_FORMAT = 'YYYY-MM-DD HH24:MI:SS'" );
OCIExecute($stmt);
$stmt = OCIParse($this->_HndDB, "ALTER SESSION SET NLS_NUMERIC_CHARACTERS = '.,'" );
OCIExecute($stmt);
for( $n=0; $n<count($this->_SqlInit); $n++ ){
if( $this->_SqlInit[$n]=="<" ){
$this->qRow();
}else{
$this->qQuery($this->_SqlInit[$n]);
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
function qFree( &$Puntero=NULL ){
if( func_num_args() == 0 ){
OCIFreeStatement($this->_Result);
}else{
OCIFreeStatement($Puntero);
$Puntero = null;
}
}
function qEnd(){
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("[ClassDesconectado]");
if( $_DEBUG==1 ) eTrace( "[ClassDesconectado]" );
if( $this->_SqlTransaction ) $this->qTranOff();
OCILogOff( $this->_HndDB );
$this->_HndDB = false;
}
function qError( $sql='', $Hnd=NULL ){
global $_User,$_Node,$NumSqlError_,$REQUEST_METHOD,$_DEBUG;
global $_Development,$_DBSEQUENCE;
$error = OCIError($Hnd);
$xError = $error['message'];
if( $_DEBUG==-1 ) eTrace( 'ERROR:[ '.$xError.' ]' );
if( $_DEBUG==4 ) eLogDebug('ERROR:[ '.$xError." ]");
if( $GLOBALS['php_errormsg'] == 'parse error' ) die($GLOBALS['php_errormsg']);
$Cdi = date('Y-m-d H:i:s');
qErrorFile(trim($xError), $sql, $pkError);
if( $this->_ErrReportTo!='' ){
$Cabeceras  = "MIME-Version: 1.0rn";
$Cabeceras .= "Content-type: text/html; charset=iso-8859-1rn";
$Cabeceras .= "From: ".$this->_ErrReportFrom."rn";
if( $this->_ErrReportFrom!='' ) $Cabeceras .= "Reply-To: ".$this->_ErrReportFrom."rn";
if( $this->_ErrReportCc  !='' ) $Cabeceras .= "Cc: ".$this->_ErrReportCc."rn";
if( $this->_ErrReportBCc !='' ) $Cabeceras .= "Bcc: ".$this->_ErrReportBCc."rn";
$Cabeceras .= "X-Mailer: PHP/" . phpversion();
mail( $this->_ErrReportTo, $this->_ErrReportMessage.' '.zend_get_id(), stripslashes(str_replace("n",'<br>',$LogTxt)), $Cabeceras );
}
if( in_array( 'u'.$_User, $this->_ErrReportUserNode ) || in_array( 'n'.$_Node, $this->_ErrReportUserNode ) ){
$Cabeceras  = "MIME-Version: 1.0rn";
$Cabeceras .= "Content-type: text/html; charset=iso-8859-1rn";
$Cabeceras .= "From: ".$this->_ErrReportFrom."rn";
mail( $this->_ErrReportTo, "Seguimiento de error: Node:{$_Node}, User:{$_User} ".zend_get_id(), stripslashes(str_replace("n",'<br>',$LogTxt)), $Cabeceras );
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
echo '<script type="text/javascript">top.eLoading(false,window);</SCRIPT>';
echo '<script type="text/javascript">if(top.eIsWindow(window))top.eSWView(window);</SCRIPT>';
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
$_SERVER['REQUEST_URI'] = str_replace( "'", '"' , $_SERVER['REQUEST_URI'] );
$_SERVER['REQUEST_URI'] = str_replace( chr(92), '' , $_SERVER['REQUEST_URI'] );
$sql = trim(str_replace("'",'"',$sql));
$TxtError = trim(str_replace("'",'"',$TxtError));
OCIRollback($this->_HndDB);
if( $_DBSEQUENCE!='NO' ){
$sqlError = "insert into {$_SESSION['ShareDictionary']}".$this->_SqlUsuario.".gs_error (  codigo ,    cdi  ,cd_gs_user,tipo, desde,            fichero        , linea, texto,        trace            ) values ( ".
"sqgs_error.NEXTVAL, '{$Cdi}', {$_User} , 'S', 'PHP','{$_SERVER['REQUEST_URI']}',  ''  ,   '' , '{$TxtError}nn{$sql}' )";
}else{
$sqlError = "insert into {$_SESSION['ShareDictionary']}".$this->_SqlUsuario.".gs_error (  codigo ,    cdi  ,cd_gs_user,tipo, desde,            fichero        , linea, texto,        trace            ) values ( ".
"0   , '{$Cdi}', {$_User} , 'S', 'PHP','{$_SERVER['REQUEST_URI']}',  ''  ,   '' , '{$TxtError}nn{$sql}' )";
}
$Error = 0;
if( !$this->_Result = OCIParse($this->_HndDB,$sqlError) ){
$Error = 1;
}else{
if( !OCIExecute($this->_Result) ) $Error = 1;
}
OCICommit($this->_HndDB);
if( $Error == 1 ) eTrace('ERROR: gs_error');
eEnd();
}
function qQueryMemo( $sql, $Memo ){
$Error = 0;
if( !$this->_Result = OCIParse($this->_HndDB,$sql) ){
$Error = 1;
}else{
if( !OCIExecute($this->_Result) ) $Error = 1;
}
OCICommit($this->_HndDB);
if( $Error == 1 ) eTrace('ERROR: gs_error');
eEnd();
}
function qQuery( $sql, &$Puntero=NULL, $Continuar=false ){
global $_DEBUG,$_SQL_;
$sql = trim($sql);
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace( "Query[{$sql}]" );
$this->_TReg = -1;
if( func_num_args() == 1 ){
$this->_Result = OCIParse($this->_HndDB,$sql);
if( !$this->_Result ){
$Error = 1;
}else{
if( !OCIExecute($this->_Result) ){
$this->qError( $sql, $this->_Result );
$Error = 1;
}
}
if( $Error == 1 ){
if( !$Continuar ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $this->_Result );
}
}
$this->_TReg = (int)OCIRowCount($this->_Result);
}else{
$Puntero = OCIParse($this->_HndDB,$sql);
if( !$Puntero ){
$Error = 1;
}else{
if( !OCIExecute($Puntero) ){
$this->qError( $sql, $Puntero );
$Error = 1;
}
}
if( $Error == 1 ){
if( !$Continuar ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $Puntero );
}
}
$this->_TReg = (int)OCIRowCount($Puntero);
}
if( strtoupper(substr($sql,0,6))=='INSERT' ){
$tmp = str_replace('  ',' ',str_replace("t",' ',str_replace("n",' ',str_replace("r",' ',str_replace('(',' ',$sql)))));
$tmp = explode(' ',$tmp );
$Tabla = $tmp[2];
array_push( $this->_IdInsert, array( trim($Tabla), $this->qId() ) );
$this->_IdRegistro[trim($Tabla)] = $this->qId();
}else if( substr($sql,0,6)=='select' ) $_SQL_ = $sql;
if( $_DEBUG==1 ) eTrace( "[Reg.Query: {$this->_TReg}]" );
return $this->_TReg;
}
function sql_Inserta( $Tabla, $Campos, $Valores, $CampoSerial='' ){
global $_DEBUG;
global $_SerialORACLE,$_DBSEQUENCE;
if( $CampoSerial!='' ){
$Campos = $CampoSerial.','.$Campos;
if( $_DBSEQUENCE=='NO' ){
$Valores = '0,'.$Valores;
}else if( $_DBSEQUENCE!='' ){
$Valores = "{$_DBSEQUENCE}.NEXTVAL,".$Valores;
}else{
$Valores = "sq{$Tabla}.NEXTVAL,".$Valores;
}
}
$IdSerial = '';
$sql = "insert into {$this->_SqlUsuario}.{$Tabla} ({$Campos}) values ({$Valores})";
if( $CampoSerial!='' ) $sql .= ' returning '.$CampoSerial.' into :IdSerial';
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("[{$sql}]");
$Error = false;
$this->_Result = OCIParse($this->_HndDB,$sql);
if( !$this->_Result ){
$Error = true;
}else{
if( $CampoSerial!='' ) oci_bind_by_name( $this->_Result, ':IdSerial', $IdSerial, 32 );
if( !OCIExecute($this->_Result) ) $Error = true;
if( $CampoSerial!='' ) $_SerialORACLE = $IdSerial;
}
if( $Error ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $this->_Result );
}
OCICommit($this->_HndDB);
$this->_TReg = (int)OCIRowCount($this->_Result);
if( substr_count( $sql, "sq{$Tabla}.NEXTVAL" )==1 || $_DBSEQUENCE!='' ){
if( $_DBSEQUENCE!='NO'){
if( $_DBSEQUENCE!='' ){
$qsql = "select {$this->_SqlUsuario}.{$_DBSEQUENCE}.CURRVAL from dual";
}else{
$qsql = "select {$this->_SqlUsuario}.sq{$Tabla}.CURRVAL from dual";
}
if( $_DEBUG==1 ) eTrace("[{$qsql}]");
$this->_Result = OCIParse($this->_HndDB,$qsql);
if( !$this->_Result ) $this->qError( $qsql, $this->_Result );
if( !OCIExecute($this->_Result) ) $this->qError( $qsql, $this->_Result );
OCIFetch($this->_Result);
$_SerialORACLE = OCIResult($this->_Result,1);
}
if( $_DEBUG==1 ) eTrace("Serial[{$_SerialORACLE}]");
array_push( $this->_IdInsert, array( trim($Tabla), $_SerialORACLE ) );
$this->_IdRegistro[trim($Tabla)] = $_SerialORACLE;
}
return $this->_TReg;
}
function qCount( $Tabla, $Condicion=NULL, &$Puntero=NULL ){
global $_DEBUG;
if( substr_count( $Tabla, ' left join ' ) > 0 ){
$DBTR = '';
if( substr_count( $Tabla, ',' ) > 0 ){
$p = strpos( $Tabla, ',' );
$DBTR = substr($Tabla,$p+1);
if( substr_count( $DBTR, ' left join ' ) > 0 ){
$DBTR = '';
}else{
$Tabla = str_replace(','.$DBTR,'',$Tabla);
}
}
$Tabla = trim($Tabla).' ';
while( substr_count( $Tabla, '  ' ) > 0 ) $Tabla = str_replace( '  ', ' ', $Tabla );
while( substr_count( $Tabla, ' left join ' ) > 0 ) $Tabla = str_replace( ' left join ', ', outer ', $Tabla );
$WhereJoin = '';
$tmp = explode(', outer ',$Tabla);
$Tabla = $tmp[0];
for( $n=1; $n<count($tmp); $n++ ){
$tmp2 = explode(' on ',$tmp[$n]);
$Tabla .= ', '.$tmp2[0];
if( $WhereJoin!='' ) $WhereJoin .= ' and ';
$WhereJoin .= str_replace( '=','(+)=', trim($tmp2[1]) );
}
if( trim($Condicion)=='' )
$Condicion = $WhereJoin;
else{
if( $WhereJoin!='' ) $Condicion = $Condicion .' and '.$WhereJoin;
}
if( $DBTR!='' ) $Tabla .= ','.$DBTR;
$Tabla = str_replace( ' as ', ' ', $Tabla );
}
if( trim($Condicion)!='' ) $Condicion = 'where '.$Condicion.'';
$sql = "select count(*) n from {$Tabla} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace( "Cuenta:[{$sql}]" );
$Error = 0;
if( func_num_args() < 3 ){
$this->_Result = OCIParse($this->_HndDB,$sql);
if( !$this->_Result ){
$Error = 1;
}else{
if( !OCIExecute($this->_Result) ) $Error = 1;
}
if( $Error == 1 ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $this->_Result );
}
OCIFetch($this->_Result);
$this->_TReg = (int)OCIResult($this->_Result,1);
}else{
$Puntero = OCIParse($this->_HndDB,$sql);
if( !$Puntero ){
$Error = 1;
}else{
OCIExecute($Puntero);
}
if( $Error == 1 ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql, $Puntero );
}
OCIFetch($Puntero);
$this->_TReg = (int)OCIResult($Puntero,1);
}
if( $_DEBUG==1 ) eTrace( "[Total Reg: {$this->_TReg}]" );
return $this->_TReg;
}
function qRow( $Puntero=NULL ){
if( func_num_args() == 0 ){
OCIFetchInto($this->_Result, $srow, OCI_NUM+OCI_RETURN_NULLS);
}else{
OCIFetchInto($Puntero, $srow, OCI_NUM+OCI_RETURN_NULLS);
}
$row = array();
foreach($srow as $k=>$v ) $row[(int)$k]=$v;
return $row;
}
function qArray( $Puntero=NULL ){
if( func_num_args() == 0 ){
OCIFetchInto($this->_Result, $srow, OCI_ASSOC+OCI_RETURN_NULLS );
}else{
OCIFetchInto($Puntero, $srow, OCI_ASSOC+OCI_RETURN_NULLS );
}
$row = array();
foreach($srow as $k=>$v ) $row[strtolower($k)]=$v;
return $row;
}
function qId(){
return $GLOBALS['_SerialORACLE'];
}
function qTranOn(){
}
function qTranOff(){
}
function qTranBack(){
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
eTron( $sSql );
$sSql = trim(stripslashes( $sSql ));
$sSql = str_replace("='",'="',$sSql);
$sSql = substr(str_replace("',",'",',$sSql.','),0,-1);
eTron( $sSql );
$sql = 'insert into '.$this->_SqlUsuario." gs_log ( cdi, operacion, cd_gs_user, tabla, clave, sqlexe ) values ('".date('Y-m-d H:i:s')."', '".$sOpe."', '".$_User."', '".$sTabla."', '".$sClave."', '".$sSql."' )";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace( "Log:[{$sql}]" );
$this->qQuery( $sql );
}
function sql_Seek( $i ){
for( $n=0; $n<$i; $n++ ) $this->qRow();
}
function sql_NombreCampo( $i ){
return OCIColumnName($this->_Result,$j);
}
function sql_TipoCampo( $i ){
return OCIColumnType($this->_Result,$j);
}
function sql_LongitudCampo( $i ){
return OCIColumnSize($this->_Result,$j);
}
function sql_FlagsCampo( $i ){
return OCIColumnIsNULL($this->_Result,$j);
}
function sql_TotalCampos(){
return OCINumCols($this->_Result);
}
function sql_Bloquea(){
}
function sql_Desbloquea(){
}
}
?>
