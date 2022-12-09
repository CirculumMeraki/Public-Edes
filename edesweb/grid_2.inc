<?PHP
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
$usuCursor = array();
$i = -1;
$OldFila = '';
while( $row = qRow() ){
$NewFila = '';
for( $n=0; $n<count($_LKGrid); $n++ ) $NewFila .= $row[$_LKGrid[$n]].'|';
if( $OldFila != $NewFila ){
if( $OldFila!='' && substr_count($_GRID[0][1],'%')==1 ){
foreach( $_Distribucion[$_GRID[0][0]] as $key => $value ){
$n = ( $usuCursor[$i][$_Distribucion[$_GRID[0][0]][$key]] * 100 ) / $usuCursor[$i][$_GFGrid[0]];
$usuCursor[$i][$_Distribucion[$_GRID[0][0]][$key]+1] = $n;
}
}
if( $i > $_DBLIMIT && !$_LimitOn ){
eMessage( '~LE|', 'HS', $ExeSg, $ExeJS, 'LE' );
}
$i++;
for( $n=0; $n<count($_Form); $n++ ) $usuCursor[$i][$n] = '0';
for( $n=0; $n<count($_LKGrid); $n++ ){
$usuCursor[$i][$_GKGrid[$n]] = $row[$_LKGrid[$n]];
}
for( $n=0; $n<count($_LFGrid); $n++ ){
$usuCursor[$i][$_GFGrid[$n]] = $row[$_LFGrid[$n]];
}
}else{
for( $n=0; $n<count($_LFGrid); $n++ ){
$usuCursor[$i][$_GFGrid[$n]] += $row[$_LFGrid[$n]];
}
}
for( $n=0; $n<count($_LRGrid); $n++ ){
if( $_PHPGRID == '' ){
$usuCursor[$i][ $_Distribucion[ $_GRID[0][0] ][ trim($row[$_LRGrid[$n]]) ] ] = $row[$_LFGrid[$n]];
}else{
$usuCursor[$i][ ExeGRID( trim($row[$_LRGrid[$n]]) ) ] += $row[$_LFGrid[$n]];
}
}
$OldFila = $NewFila;
}
if( $OldFila!='' && substr_count($_GRID[0][1],'%')==1 ){
foreach( $_Distribucion[$_GRID[0][0]] as $key => $value ){
$n = ( $usuCursor[$i][$_Distribucion[$_GRID[0][0]][$key]] * 100 ) / $usuCursor[$i][$_GFGrid[0]];
$usuCursor[$i][$_Distribucion[$_GRID[0][0]][$key]+1] = $n;
}
}
$TotalReg = $_TReg = $i+1;
if( $_TantoPorCiento ){
for( $n=0; $n<count($_COLSOP); $n++ ){
if( $_COLSOP[$n]=='%' ){
$_COLSOP[$n] = '+';
$total = 0;
for( $l=0; $l<count($usuCursor); $l++ ) $total += $usuCursor[$l][$n];
for( $l=0; $l<count($usuCursor); $l++ ) $usuCursor[$l][$n] = ($usuCursor[$l][$n]*100)/$total;
}
}
}
?>
