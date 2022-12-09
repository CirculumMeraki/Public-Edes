<?PHP
global $_DEBUG, $VieneDeFicha, $Opcion, $_Modo, $OriFichero;
$_User = $_SESSION["_User"];
if( $tmp[2]=="" ){
$_DEBUG = $tmp[1];
}else{
if( $tmp[2]==$_User ) $_DEBUG = $tmp[1];
else return;
}
if( $_DEBUG*1==0 ){
$_DEBUG = strtoupper(trim($_DEBUG));
if( $_DEBUG=="DATA" ){ eInit(); ePrintR('<u><b>$ SERVER["QUERY STRING"]:</b></u>', $_SERVER["QUERY_STRING"],'', '<u><b>$ SERVER["REQUEST METHOD"]:</b></u>', $_SERVER["REQUEST_METHOD"],'', '<u><b>$ GET:</b></u>', $_GET,'', '<u><b>$ POST:</b></u>',$_POST,'', '<u><b>$ FILE:</b></u>',$_FILE); }
if( $_DEBUG=='PHPINFO' ){ eInit(); phpInfo();echo '<pre>GET:<br>'.print_r($_GET,1).'<br>POST:<br>'.print_r($_POST,1).'<br>SESSION:<br>'.print_r($_SESSION,1).'</pre>'; die('<script type="text/javascript">top.eLoading(0,window)</script>'); }
$DimDebug = array('OFF'=>0,'SQL'=>1,'TMP'=>2,'BORDER'=>3,'SAVESQL'=>4,'INOUT'=>5,'WINOUT'=>6,'NOZIP'=>7,'FLAG'=>8,'DF'=>9,'SAVESQLH'=>10,'SAVEDF'=>11,'PHPINFO'=>12,'VIEWFIELDS'=>13,'EVAL'=>14,'SELINFO'=>20,'ERRSQL'=>30,'HTM'=>31);
$_DEBUG	 = $DimDebug[$_DEBUG];
}
if( $_DEBUG==4 || $_DEBUG==10 ){
if( $_DEBUG==10 ) if( date('Y-m-d', filemtime("../_tmp/log/sql.{$_User}"))!=date('Y-m-d') ) $_DEBUG = 4;
if( $_DEBUG==4 && !$VieneDeFicha ) @unlink('../_tmp/log/sql.'.$_User);
eLogDebugIni('['.$Opcion.']');
$_DEBUG = 4;
}
if( $_DEBUG==9 || $_DEBUG==11 ) $_DimDebug[] = '[#] '.$_Modo.' : '.$OriFichero.' [#]';
if( $tmp[3]!='' ){
global $_TRACECONSOLE, $_TRACELABEL;
$tmp = explode(",", strtoupper(eNsp($tmp[3])));
for($i=0; $i<count($tmp); $i++){
if( $tmp[$i]=="CONSOLE" ) $_TRACECONSOLE = true;
else $_TRACELABEL = $tmp[$i];
}
}
?>
