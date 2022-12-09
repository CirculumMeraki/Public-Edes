<?PHP
$Dim = array();
qQuery( "select script_url, indent, cd_gs_op from {$_SESSION['ShareDictionary']}gs_op where type<>'L' and script_url<>'' order by seq" );
while( $r=qRow() ) $Dim[] = $r;
for( $n=0; $n<count($Dim); $n++ ){
$Buscar = $Dim[$n][0];
if( $Buscar[0]==':' ) continue;
if( substr($Buscar,-1)==':' ){
for( $i=$n-1; $i>=0; $i-- ){
if( $Dim[$n][1]==$Dim[$i][1]+1 ){
$Buscar .= substr( $Dim[$i][0], 1 );
break;
}
}
}
if( $Buscar[0]=='¿' ) list( ,$Buscar ) = explode('?',$Buscar);
if( substr_count($Buscar,'?') > 0 ) list( $Buscar ) = explode('?',$Buscar);
if( $Buscar[0]=='>' ) $Buscar = substr( $Buscar, 1 );
if( substr($Buscar,0,2)=='m>' ) $Buscar = substr( $Buscar, 2 );
list( $Buscar ) = explode('&',$Buscar);
if( substr($Buscar,-4)=='.jsp' || substr($Buscar,-3)=='.do' || trim($Buscar)=='' || substr($Buscar,-2)=='()' || $Buscar[0]=='$' ) continue;
if( substr_count( $Buscar, ':' ) > 0 ){
list( $Modo, $Buscar ) = explode(':',$Buscar);
if( substr_count( $Buscar, '.' )==0 ){
if( substr_count( $Modo[0], '#' )>0 || substr_count( $Modo[0], 'F' )>0 || substr_count( $Modo[0], 'L' )>0 || substr_count( $Modo[0], '=' )>0 ) $Buscar .= '.edf';
else $Buscar .= '.gdf';
}
}
if( $Buscar[0]=='>' ) $Buscar = substr($Buscar,1);
if( eSqlType('informix') ){
qQuery( "select first 1 cd_gs_user,cdi from {$_SESSION['ShareDictionary']}gs_activity where script='{$Buscar}' order by 2 desc" );
}else{
qQuery( "select cd_gs_user,max(cdi) from {$_SESSION['ShareDictionary']}gs_activity where script='{$Buscar}'" );
}
$r=qRow();
if( $r[0]==0 && substr_count($Buscar,'.')>0 ){
$Buscar = substr($Buscar,0,-4);
if( eSqlType('informix') ){
qQuery( "select first 1 cd_gs_user,cdi from {$_SESSION['ShareDictionary']}gs_activity where script='{$Buscar}' order by 2 desc" );
}else{
qQuery( "select cd_gs_user,max(cdi) from {$_SESSION['ShareDictionary']}gs_activity where script='{$Buscar}'" );
}
$r=qRow();
}
if( $r[0] > 0 ){
}else eTrace( $Buscar );
}
?>
