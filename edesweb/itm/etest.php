<?PHP
function _eTest(){
eInit();
echo('<pre>'.date('H:i:s').'<br>');
$numargs = func_num_args();
for( $i=0; $i<$numargs; $i+=2 ){
$Func = func_get_arg($i);
$Dim = func_get_arg($i+1);
echo('<hr>TEST: <b>'.$Func.'</b><hr>');
for( $n=0; $n<count($Dim); $n++ ){
$pRes = count($Dim[$n])-1;
switch( func_num_args()-1 ){
case 0:	$Res = call_user_func( $Func );	break;
case 1: $Res = call_user_func( $Func, $Dim[$n][0] ); break;
case 2: $Res = call_user_func( $Func, $Dim[$n][0], $Dim[$n][1] ); break;
case 3: $Res = call_user_func( $Func, $Dim[$n][0], $Dim[$n][1], $Dim[$n][2] ); break;
case 4: $Res = call_user_func( $Func, $Dim[$n][0], $Dim[$n][1], $Dim[$n][2], $Dim[$n][3] ); break;
case 5: $Res = call_user_func( $Func, $Dim[$n][0], $Dim[$n][1], $Dim[$n][2], $Dim[$n][3], $Dim[$n][4] ); break;
case 6: $Res = call_user_func( $Func, $Dim[$n][0], $Dim[$n][1], $Dim[$n][2], $Dim[$n][3], $Dim[$n][4], $Dim[$n][5] ); break;
default:
echo( '<span style="color:red">...Demasiados parámetros...</span><br>' );
continue;
}
if( $Dim[$n][$pRes]!=$Res ){
echo( '<span style="color:red">'.$Dim[$n][$pRes].' != '.$Res.'</span><br>' );
}else{
echo( $Res.'<br>' );
}
}
}
eEnd();
}
?>
