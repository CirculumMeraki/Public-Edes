<?PHP
$txt = '';
foreach($_POST as $k=>$v) if( $k[0]!='_' ) $txt .= $k.'='.$v."\n";
$Md5 = md5($txt);
if( $txt=='' ) $Md5='';
if( !function_exists('qQuery') ){
if( $_Tron ) error_log('> gs_op.unl: '.$_Sql."\n",3,'_upload.info');
eval(qSetup());
if( $_Tron ) error_log('SQL: '.$_Sql."\n",3,'_upload.info');
include_once( "../../edesweb/{$_Sql}.inc" );
}
qQuery( "select seconds from gs_progress where script='{$_POST['_SOURCE_']}' and md5='{$Md5}'" );
list( $ns ) = qRow();
$ns = $ns*1;
if( $ns==0 ){
qQuery( "select sum(seconds),count(*) from gs_progress where script='{$_POST['_SOURCE_']}'" );
list( $ns, $c ) = qRow();
$ns = $ns*1;
if( $c > 0 ) $ns = round($ns/$c);
}
$ns += 1;
echo '<script type="text/javascript">';
echo 'var Obj = window.frameElement.WOPENER;';
if( $ns>0 ) echo "Obj._Progress = {$ns};";
if( $_POST['_FunctionSubmit']<>'' ){
echo 'Obj.'.$_POST['_FunctionSubmit'].'();';
}else{
echo 'Obj._Submit();';
}
echo '</script>';
eEnd();
?>
