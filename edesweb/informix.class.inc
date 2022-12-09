<?PHP
class eInformix {
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
eval(substr( $txt, ( ( strtoupper(substr($txt,0,5))=='<'.'?PHP' ) ? 5 : 2 ), -2 ));
}
if( $_SqlHostName=="" || $_SqlUsuario=="" || $_SqlPassword=="" || $_SqlDiccionario=="" ) eEnd("Falta la definición de la DDBB.");
$this->_Sql = $_Sql;
$this->_SqlHostName = $_SqlHostName;
$this->_SqlUsuario = $_SqlUsuario;
$this->_SqlPassword = $_SqlPassword;
$this->_SqlDiccionario = $_SqlDiccionario;
$this->_SqlInit = $_SqlInit;
global $_DEBUG;
if( $_DEBUG==1 ) eTrace("[ClassSQL: {$this->_Sql} | HostName: {$this->_SqlHostName} | Usuario: {$this->_SqlUsuario} | Password: {$this->_SqlPassword} | Diccionario: {$this->_SqlDiccionario}]");
$Dir = getenv('INFORMIXDIR');
putenv( "PATH=".getenv("PATH").":{$Dir}/bin" );
putenv( "LD_LIBRARY_PATH={$Dir}/lib:{$Dir}/lib/esql" );
putenv( "INFORMIXSERVER={$this->_SqlHostName}" );
putenv( "GL_DATE=%Y-%m-%d" );
putenv( "DBDATE=YMD4-" );
$aux = $this->_SqlDiccionario."@".getenv( "INFORMIXSERVER" );
if( $_DEBUG==4 ) eLogDebug("[ClassSQL:{$this->_SqlDiccionario}]");
if( $_DEBUG==1 ){
eTrace("[Diccionario: '{$this->_SqlDiccionario}' Diccionario: '{$aux}']");
eTrace("[$aux, $this->_SqlUsuario, $this->_SqlPassword]");
}
$Pass = $this->_SqlPassword;
if( strlen($Pass)>8 && substr($Pass,0,8)==dechex(crc32(substr($Pass,8))) ) $Pass = gzuncompress(base64_decode(substr($Pass,8)));
$this->_HndDB = false;
$HastaSg = time()+10;
while( $HastaSg > time() && !$this->_HndDB ){
$this->_HndDB = ifx_connect( $aux, $this->_SqlUsuario, $Pass );
}
if( !$this->_HndDB ){
if( $_DEBUG==30 ) return -1;
eTrace('ERROR al conectar con DB');
eEnd();
}
ifx_textasvarchar(1);
ifx_byteasvarchar(1);
ifx_nullformat(0);
$GLOBALS["_SqlStartSystem"] = true;
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
global $_MemoContenido;
$_MemoContenido = array();
if( func_num_args() == 0 ){
ifx_free_result( $this->_Result );
}else{
ifx_free_result( $Puntero );
$Puntero = null;
}
}
function qEnd(){
global $_DEBUG;
if( $_DEBUG==4 ) eLogDebug("[ClassDesconectado]");
if( $_DEBUG==1 ) eTrace("[ClassDesconectado]");
if( $this->_SqlTransaction ) $this->qTranOff();
ifx_close( $this->_HndDB );
$this->_HndDB = false;
}
function qError($sql=''){
global $_User,$_Node,$NumSqlError_,$REQUEST_METHOD,$_DEBUG;
global $_Development;
$xError = ifx_error();
list(,$nError) = explode('SQLCODE=',$xError);
$nError = str_replace(']','',trim($nError));
$SQLError = '';
exec('finderr '.$nError,$cad);
for( $i=0;$i<count($cad);$i++ ){
if( $SQLError!='' ) $SQLError .= '<br>';
$SQLError .= trim($cad[$i]);
}
while( strtoupper(substr($SQLError,-4))=='<BR>' ) $SQLError = substr($SQLError,0,-4);
if( $_DEBUG==-1 ) eTrace('ERROR:[ '.$xError.' : '.$SQLError.' ]');
if( $_DEBUG==4 ) eLogDebug('ERROR:[ '.$xError.' : '.$SQLError."]");
if( $GLOBALS['php_errormsg']=='parse error' ) die($GLOBALS['php_errormsg']);
$_User *= 1;
$Cdi = date('Y-m-d H:i:s');
qErrorFile(trim($xError).' : '.$SQLError, $sql, $pkError);
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
$DimText[] = ifx_create_blob( 1, 0, "{$TxtError}\n\n{$sql}" );
if( substr_count( $_SERVER['REQUEST_URI'],'edes.php?' ) == 1 ){
$tmp = explode('edes.php?',$_SERVER['REQUEST_URI']);
$_SERVER['REQUEST_URI'] = 'edes.php?'.trim($tmp[1]);
}
$_SERVER['REQUEST_URI'] = eEntityEncode($_SERVER['REQUEST_URI']);
$sql = trim(eEntityEncode($sql));
$TxtError = trim(eEntityEncode($TxtError));
$sqlError = "insert into {$_SESSION['ShareDictionary']}gs_error (    cdi  ,cd_gs_user,tipo, desde,            fichero        , linea, texto, trace) values ".
"( '{$Cdi}','{$_User}', 'S', 'PHP','{$_SERVER['REQUEST_URI']}',    0  ,   '' ,   ?  )";
if( !ifx_query($sqlError, $this->_HndDB, $DimText) ) eTrace('ERROR: gs_error');
eEnd();
}
function qQueryMemo( $sql, $Memo ){
$DimText[] = ifx_create_blob( 1, 0, "{$Memo}" );
if( !ifx_query( $sql, $this->_HndDB, $DimText ) ) eTrace('ERROR: gs_error');
}
function qQuery( $sql, &$Puntero=NULL, $Continuar=false ){
global $_DEBUG,$_SQL_;
$sql = trim($sql);
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Query[{$sql}]");
$this->_TReg = -1;
if( func_num_args() == 1 ){
$this->_Result = ifx_query( $sql, $this->_HndDB );
if( !$this->_Result ){
if( !$Continuar ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
}else{
$this->_TReg = (int)ifx_affected_rows( $this->_Result );
}
}else{
$Puntero = ifx_query( $sql, $this->_HndDB );
if( !$Puntero ){
if( !$Continuar ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
}else{
$this->_TReg = (int)ifx_affected_rows( $Puntero );
}
}
if( strtoupper(substr($sql,0,6))=='INSERT' ){
$tmp = str_replace('  ',' ',str_replace("\t",' ',str_replace("\n",' ',str_replace("\r",' ',str_replace('(',' ',$sql)))));
$tmp = explode(' ',$tmp );
$Tabla = $tmp[2];
array_push( $this->_IdInsert, array( trim($Tabla), $this->qId() ) );
$this->_IdRegistro[trim($Tabla)] = $this->qId();
}else if( substr($sql,0,6)=='select' ) $_SQL_ = $sql;
if( $_DEBUG==1 ) eTrace( "[Reg.Query: {$this->_TReg}]" );
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
$Tabla .= ', outer '.$tmp2[0];
if( $WhereJoin!='' ) $WhereJoin .= ' and ';
$WhereJoin .= $tmp2[1];
}
if( trim($Condicion)=='' )
$Condicion = $WhereJoin;
else{
if( $WhereJoin!='' ) $Condicion = $Condicion .' and '.$WhereJoin;
}
if( $DBTR!='' ) $Tabla .= ','.$DBTR;
}
if( trim($Condicion)!='' ) $Condicion = 'where '.$Condicion.'';
$sql = "select count(*) as n from {$Tabla} {$Condicion}";
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Cuenta:[{$sql}]");
if( func_num_args() < 3 ){
$this->_Result = ifx_query( $sql, $this->_HndDB );
if(!$this->_Result ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
$row = ifx_fetch_row( $this->_Result, IFX_SCROLL );
}else{
$Puntero = ifx_query( $sql, $this->_HndDB );
if(!$Puntero ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
$row = ifx_fetch_row( $Puntero, IFX_SCROLL );
}
$this->_TReg = (int)$row[n];
if( $_DEBUG==1 ) eTrace( "[Total Reg: {$this->_TReg}]" );
return $this->_TReg;
}
function qRow( $Puntero=NULL ){
if( func_num_args() == 0 ){
$row = ifx_fetch_row( $this->_Result, 'NEXT' );
}else{
$row = ifx_fetch_row( $Puntero, 'NEXT' );
}
$i = 0;
while( list( $v, $w ) = each($row) ){
$aux[$i]=$w;
$i++;
}
return $aux;
}
function qArray( $Puntero=NULL ){
if( func_num_args() == 0 ){
return ifx_fetch_row( $this->_Result, 'NEXT' );
}else{
return ifx_fetch_row( $Puntero, 'NEXT' );
}
}
function qId(){
$sqlca = ifx_getsqlca( $this->_Result );
return $sqlca['sqlerrd1'];
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
$txt = ifx_create_blob( 1, 0, $sSql );
$DimText[] = $txt;
$sql = 'insert into gs_log ( cdi, operacion, cd_gs_user, tabla, clave, sqlexe ) values ( "'.date('Y-m-d H:i:s').'", "'.$sOpe.'", "'.$_User.'", "'.$sTabla.'", "'.$sClave.'", ? )';
if( $_DEBUG==4 ) eLogDebug($sql);
if( $_DEBUG==1 ) eTrace("Log:[{$sql}]");
$this->_Result = ifx_query( $sql, $this->_HndDB, $DimText );
if(!$this->_Result ){
if( $_DEBUG==30 ) return -1;
$this->qError( $sql );
}
}
function sql_Seek( $i ){
for( $n=0; $n<$i; $n++ ) $this->qRow();
}
function sql_NombreCampo( $i ){
$nombres = ifx_fieldproperties( $this->_Result );
$j = 0;
while( list( $v, $w ) = each($nombres) ){
if($j == $i){
break;
break;
}
$j++;
}
return $v;
}
function sql_TipoCampo( $i ){
$tipos = ifx_fieldtypes($this->_Result);
$j=0;
while( list($v, $w) = each($tipos) ){
if($j == $i){
break;
break;
}
$j++;
}
return $w;
}
function sql_LongitudCampo( $i ){
$nombres = ifx_fieldproperties( $this->_Result );
$j=0;
while( list($v, $w) = each( $nombres ) ){
if($j == $i){
break;
break;
}
$j++;
}
$j=strpos($w,';');
$k=strpos ($w,';',$j+1);
return substr( $w, $j+1, $k-$j-1 );
}
function sql_FlagsCampo( $i ){
$nombres=ifx_fieldproperties($this->_Result);
$j=0;
while( list($v, $w) = each($nombres) ){
if($j == $i){
break;
break;
}
$j++;
}
return str_replace(';', ' ', $w);
}
function sql_TotalCampos(){
return ifx_num_fields( $this->_Result );
}
function sql_Bloquea(){
}
function sql_Desbloquea(){
}
}
?>
