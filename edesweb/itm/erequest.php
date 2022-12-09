<?PHP
if( $GLOBALS['_gsID'] != getmypid() ) exit;
function eRequestSave(){
global $OriFichero;
$txt = $_SERVER["REQUEST_METHOD"]."\n".'edes.php?'.$_SERVER["QUERY_STRING"]."\n";
foreach($_POST as $k=>$v) if( trim($v)!='' ) $txt .= $k.'='.$v."\n";
file_put_contents('../_tmp/php/'.str_replace('/','_',$OriFichero).'.'.$_SESSION['_User'].'.req', $txt);
}
function eRequestRun(){
global $OriFichero;
eInit();
$Dim = file('../_tmp/php/'.str_replace('/','_',$OriFichero).'.'.$_SESSION['_User'].'.req');
echo "<!DOCTYPE HTML>";
echo '<HTML><HEAD></HEAD><BODY>';
if( trim($Dim[0])=='POST' ){
echo '<FORM method="post" action="'.trim($Dim[1]).'" style="display:none">';
for($n=2; $n<count($Dim); $n++){
if( trim($Dim[$n])!='' ){
eExplodeOne( trim($Dim[$n]), '=', $k, $v );
echo "<textarea name='{$k}' rows='1' cols='60'>".$v."</textarea>";
}
}
echo '</FORM>';
echo '<script type="text/javascript">document.forms[0].submit();</SCRIPT>';
}else{
echo '<script type="text/javascript">location.href = "'.trim($Dim[1]).'";</SCRIPT>';
}
echo '</BODY></HTML>';
eEnd();
}
?>
