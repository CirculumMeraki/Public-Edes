<?PHP
global $php_errormsg, $_Include, $_TmpInclude;
error_reporting(_ERROR_REPORTING);
ini_set('track_errors', false);
if( $php_errormsg=='' && $xErrorMsg=='' ){
if( substr_count($tmpFile,'/_tmp/')==1 ) @unlink($tmpFile);
$_Include = "";
$_TmpInclude = "";
return;
}
chdir($GLOBALS['_CURRENT_PATH']);
if( $php_errormsg=='' ) $php_errormsg = $xErrorMsg;
global $Opcion, $OriFichero, $_User, $_Sql, $_Script_, $TipoEntrada, $nDimFCH;
global $__EVAL__, $__eLINE__, $__iSCRIPT__, $__iniSCRIPT__, $_CALL, $__DIR__, $Dir_;
if( $EditFile!='' ) $OriFichero = $EditFile;
$_User *= 1;
$ErrorLinea = 0;
if( substr_count($_Include,'_')==1 ) list( ,$_Include ) = explode('_',$_Include);
if( $LenDoc==0 ){
$TxtError = $php_errormsg;
}else if( trim($php_errormsg)!='' ){
$TxtError = $php_errormsg;
}else{
$TxtError = trim(substr(ob_get_contents(), $LenDoc));
if( $TxtError=='' || strlen($TxtError)>100 && substr_count( $TxtError, 'on line <b>' )==0) $TxtError = $php_errormsg;
if( strlen(trim($TxtError))==0 ) $TxtError = $php_errormsg;
}
$Cdi = date('Y-m-d H:i:s');
$CodErr = chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90));
$xTexto = ' ';
eInit();
echo '<'.'!-- ERROR EN PHP --'.'>';
if( $tmpFile=='_eval_' ){
$TxtError = $__EVAL__;
$xTexto = trim(str_replace("'",'"',$__EVAL__));
$LogTxt = $Cdi."\r\n".
"\tUSER...: ".$_User."\r\n".
"\tQUERY..: ".$_SERVER['REQUEST_URI']."\r\n".
"\tERROR..: ".$CodErr.': '.$TxtError."\r\n";
error_log($LogTxt."\r\n", 3, '../_tmp/err/_log.err');
echo '<html><head><title>SOURCE</title></head><body style="display:inline-table">';
echo '<script type="text/javascript">if(window.frameElement.MODAL!=undefined) top.ShowCallSrv();</SCRIPT>';
echo '<script type="text/javascript">if(top.eIsWindow(window)) top.eSWView(window);</SCRIPT>';
echo '<pre>';
if( $_SESSION['_D_']!='' ){
echo '<span style="color:red;">Error en Macro: </span>'.htmlspecialchars($__EVAL__).'';
}else{
echo '<span style="color:red;"> ERROR INTERNO "'.$CodErr.'"</span>';
}
echo '<br><span style="color:red;">Script........: </span>'.$_Script_.' <span style="color:red;">Nº Linea: </span>'.($nDimFCH+1);
if( $TipoEntrada!='#' ) echo '<br><span style="color:red;">Label.........: </span>['.substr($TipoEntrada,1).']';
echo '<br><B>QUERY:</B> '.$_SERVER['QUERY_STRING'];
if( $_Include!='' ){
echo '<br><B>ULTIMO INCLUDE:</B> '.$_Include;
if( $_Include!=$__iniSCRIPT__ ) echo ' - Error en la carga';
}
$n=0;
echo '<br><B>GET:</B>'; foreach($_GET as $k=>$v){
echo '<br> &nbsp; '.$k.': '.$v;
if( $n==0 ) $sGET = $k;
$n++;
}
echo '<br><B>POST:</B>'; foreach($_POST as $k=>$v) echo '<br> &nbsp; '.$k.': '.$v;
echo '</pre>';
KeyEditFile( $OriFichero );
echo '</body></html>';
}else{
if( $Macro=='' ){
if( file_exists($tmpFile) ) show_source($tmpFile);
}else{
$_Include = substr($tmpFile,1);
echo $Macro;
}
$FilePHP = ob_get_contents();
eInit();
$FilePHP = str_replace( '<br />', '<br>', $FilePHP );
$Dim = explode('<br>',$FilePHP);
$DimFuente = @file( $_TmpInclude.'.php' );
$Dim = array_merge( $Dim, $DimFuente );
if( substr_count( $TxtError, ' on line <b>' ) > 0 ){
list( ,$ErrorLinea ) = explode('on line <b>',$TxtError);
list( $ErrorLinea ) = explode('<',$ErrorLinea);
$ErrorLinea = (int)$ErrorLinea;
$tmp = explode('/',$tmpFile);
list( $Dir ) = explode($tmp[count($tmp)-1],$TxtError);
$NomFile = substr( $Dir, strrpos($Dir,'>')+1).$tmp[count($tmp)-1];
$xError = trim(str_replace($NomFile,'"['.strtoupper($_Include).'] '.$Opcion.'"',strip_tags($TxtError)));
}else{
$xError = '"['.strtoupper($_Include).'] '.$Opcion.'" '.strip_tags($TxtError);
}
$xError = str_replace('\\','/',$xError);
if( $_SESSION['_D_']!='' ){
echo '<html><head><title>SOURCE</title><style>A:visited,A:link,A:active,A:hover{color:red;}</style>';
echo '<script type="text/javascript">if(window.frameElement.MODAL!=undefined) top.ShowCallSrv();</SCRIPT>';
echo '<script type="text/javascript">if(top.eIsWindow(window)) top.eSWView(window);</SCRIPT>';
echo '</head><body scroll=auto style="display:inline-table">';
echo '<code>';
echo '<span style="color:red;">Script........: </span>'.$_Script_.' <span style="color:red;">Nº Linea: </span>'.($nDimFCH+1);
if( $TipoEntrada!='#' ) echo '<br><span style="color:red;">Label.........: </span>['.substr($TipoEntrada,1).']';
echo '<br><B>QUERY:</B> '.$_SERVER['QUERY_STRING'];
if( $_Include!='' ){
echo '<br><B>ULTIMO INCLUDE:</B> '.$_Include;
if( $_Include!=$__iniSCRIPT__ ) echo ' - Error en la carga.';
}
$n=0;
echo '<br><B>GET:</B>'; foreach( $_GET as $k=>$v ){
echo '<br> &nbsp; '.$k.': '.$v;
if( $n==0 ) $sGET = $k;
$n++;
}
echo '<br><B>POST:</B>'; foreach( $_POST as $k=>$v ) echo '<br> &nbsp; '.$k.': '.$v;
$Ini = 0;
if( $Dim[0]=='<!-- ERROR EN PHP -->' ) $Ini++;
if( substr($Dim[1],0,23)=='<'.'?PHP $__iniSCRIPT__ = ' ) $Ini++;
if( $__eLINE__!='' ) echo '[ $__eLINE__ = '.($__eLINE__-$Ini).' ]';
echo '<hr>';
list($sGET) = explode("&",$_SERVER['QUERY_STRING']);
$oTmp = '';
$eDim = explode(' ',$xError);
if( is_numeric($eDim[count($eDim)-1]) && $eDim[count($eDim)-2]=='line' && $eDim[count($eDim)-3]=='on' && substr($eDim[count($eDim)-4],-4)=='.tmp' ){
$oTmp = str_replace('\\','/',$eDim[count($eDim)-4]);
$oTmp = str_replace( substr($__DIR__,0,-5), '', $oTmp );
if( !file_exists($tmpFile) ){
list( $xMode, $xFile ) = explode(':',$sGET);
$OriFichero = $xFile;
if( substr_count($OriFichero,'.')==0 ) $OriFichero .=  (( $xMode[0]=='G' ) ? '.gdf':'.edf');
}
}
if( $__EVAL__!='' ) echo '<B>ERROR EN EVAL:</B> '.$__EVAL__.'<br>';
echo '<span style="color:red;"><A HREF="#ERROR" id=kError onclick=EditTmp("'.$_TmpInclude.'")> '.$xError.'</A></span><BR>';
$LongNLinea = strlen((string)count($Dim));
for( $n=$Ini; $n<count($Dim); $n++ ){
$Dim[$n] = rtrim($Dim[$n]);
$Dim[$n] = htmlentities( $Dim[$n] );
if( $ErrorLinea==$n+1 ){
echo '<A NAME="ERROR"><B style="border: 1px solid red; olor:#9900FF">&nbsp;'.str_pad($n+1-$Ini,$LongNLinea,'0',STR_PAD_LEFT).': ';
echo $Dim[$n].' </B><br></A>';
}else{
echo '<font color="#9900FF">&nbsp;'.str_pad($n+1-$Ini,$LongNLinea,'0',STR_PAD_LEFT).'</font>: ';
echo $Dim[$n].'<br>';
}
}
echo '</code>';
$xTexto = $xError;
if( $_TmpInclude!="" ){
KeyEditFile( $_TmpInclude );
}else{
KeyEditFile( $GLOBALS["OriFichero"] );
}
if( $_SESSION['_D_']=='~' ){
echo '<hr><pre>';
debug_print_backtrace();
echo '</pre><hr><pre>';
print_r(debug_backtrace());
echo '</pre><hr>';
}
}else{
global $_Sql, $OriFichero, $_HndDB;
$TxtError = trim(strip_tags($xError));
$LogTxt = $Cdi."\r\n".
"\tUSER...: ".$_User."\r\n".
"\tQUERY..: ".$_SERVER['REQUEST_URI']."\r\n".
"\tERROR..: ".$CodErr.': '.$TxtError."\r\n";
error_log($LogTxt."\r\n", 3, '../_tmp/err/_log.err');
echo '<script type="text/javascript">if(window.frameElement.MODAL!=undefined) top.ShowCallSrv();if(top.eIsWindow(window)) top.eSWView(window);</SCRIPT>';
echo '<span style="color:red;"> ERROR INTERNO "'.$CodErr.'"</span>';
}
}
$xTexto = eEntityEncode($xTexto);
$TxtError = eEntityEncode($TxtError);
if( !function_exists('sql_Query') ){
global $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOType, $_SqlInit, $_SqlPDOConnect;
$tmpFile = '../_datos/config/sql.ini';
eval(_LoadSqlIni($tmpFile));
include($Dir_.$_Sql.'.inc');
}else{
global $_HndDB;
if( $_HndDB===false ) qConnect();
}
$_Include = '';
if( eSqlType('informix') ){
global $DimText;
$DimText[] = ifx_create_blob(1, 0, $TxtError);
$sql = "insert into {$_SESSION['ShareDictionary']}gs_error (cdi,cd_gs_user,tipo,desde,fichero,linea,texto,trace) values ('{$Cdi}', '{$_User}', 'P', 'PHP', '{$OriFichero}', {$ErrorLinea}, $xTexto, ?)";
ifx_query($sql, $_HndDB, $DimText);
}else{
sql_Inserta("{$_SESSION['ShareDictionary']}gs_error", 'cdi,cd_gs_user,tipo,desde,fichero,linea,texto,trace',			  "'{$Cdi}', '{$_User}', 'P', 'PHP', '{$OriFichero}', {$ErrorLinea}, '{$xTexto}', '{$TxtError}'", 'codigo');
}
$Id = qId();
?>
<script type="text/javascript">
function Ini(){
top.eLoading(false,window);
var ID = new Date().getTime();
}
setTimeout('Ini()',100);
<?PHP
?>
</script>
</body></html>
<?PHP
$_Include = '';
if( $_CALL ){
file_put_contents($__DIR__.'/../_tmp/log/'.$_User.'.htm', ob_get_contents());
}
eEnd();
?>
