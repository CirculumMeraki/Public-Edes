<?PHP
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
$_pLKGrid = 0;
$_LKGrid = array();
$_LRGrid = array();
$_LFGrid = array();
for($n=0; $n<count($_Form); $n++){
if( substr_count($_Form[$n][1],'(')>0 ){
$_LFGrid[] = $n;
}else{
$tmp = false;
for($i=0; $i<count($_Form); $i++){
if( $_Form[$n][1]==$_GRID[$i][0] ){
$_LRGrid[] = $n;
$_pLKGrid = $n;
$TitleTH = $_Form[$n][0];
$tmp = true;
break 2;
}
}
if( !$tmp ){
$_LKGrid[] = $n;
}
}
}
$_Distribucion = array();
$_LDistribucion = array();
for($i=0; $i<count($_GRID); $i++){
$p = count($_LKGrid);
$p = $_pLKGrid;
if( $_GRID[$i][2]=='' ){
if( substr($_GRID[$i][0],0,3)=='cd_' ){
$NomTabla = substr($_GRID[$i][0],3);
qSelect($NomTabla, $_GRID[$i][0].', nm_'.$NomTabla,'', $_GRID[$i][0]);
}
while( $row=qRow() ){
$_LDistribucion[$_GRID[$i][0]][$p] = trim($row[1]);
$_Distribucion[$_GRID[$i][0]][trim($row[0])] = $p++;
}
}else if( preg_match("/^SELECT /i",$_GRID[$i][2]) ){
while( substr_count( $_GRID[$i][2], '{' ) > 0 ){
$tmp = trim( substr( $_GRID[$i][2], strpos( $_GRID[$i][2], '{' )+1 ) );
$tmp = trim( substr( $tmp, 0, strpos( $tmp, '}' ) ) );
$_GRID[$i][2] = str_replace( '{'.$tmp.'}', $GLOBALS[$tmp], $_GRID[$i][2] );
}
qQuery($_GRID[$i][2]);
while( $row=qRow() ){
$_LDistribucion[$_GRID[$i][0]][$p] = trim($row[1]);
$_Distribucion[$_GRID[$i][0]][trim($row[0])] = $p++;
}
}else{
$tmp = explode(';', $_GRID[$i][2]);
for($n=0; $n<count($tmp); $n++){
$tmp1 = explode(',', $tmp[$n]);
$_LDistribucion[$_GRID[$i][0]][$p] = trim($tmp1[1]);
$_Distribucion[$_GRID[$i][0]][trim($tmp1[0])] = $p++;
}
}
}
$_GRTotal = $p;
$_BakForm = $_Form[count($_Form)-1];
for($n=0; $n<count($_Form); $n++){
if( $_Form[$n][1]==$_GRID[0][0] ){
$CampoDis = $_Form[$n][1];
$MasCol = count($_Distribucion[$CampoDis]);
if( substr_count($_GRID[0][1],'%')==1 ) $MasCol = ($MasCol*2);
$MasCol--;
for($i=count($_Form)-1; $i>$n; $i--){
$d = $i+$MasCol;
$_Form[$d] = $_Form[$i];
$_ColVirtual[$d] = $_ColVirtual[$i];
$_ALIGN[$d] = $_ALIGN[$i];
if( count($_COLSOP)>0 ) $_COLSOP[$d] = $_COLSOP[$i];
$_PDFCOL[$d] = $_PDFCOL[$i];
$_PDFCOLBORDER[$d] = $_PDFCOLBORDER[$i];
$_ROWCOLOR[$d] = $_ROWCOLOR[$i];
$_COLSCOLOR[$d] = $_COLSCOLOR[$i];
$_COLSWIDTH[$d] = $_COLSWIDTH[$i];
$_FORMAT[$d] = $_FORMAT[$i];
$_FORMATTOTALS[$d] = $_FORMATTOTALS[$i];
$_NOZERO[$d] = $_NOZERO[$i] ;
$_NOZEROFORMATTOTALS[$d] = $_NOZEROFORMATTOTALS[$i];
$_oCOLSOP[$d] = $_oCOLSOP[$i];
$_OpCol[$d] = $_OpCol[$i];
$_OpSubCol[$d] = $_OpSubCol[$i];
$_PDFCOLSSHADE[$d] = $_PDFCOLSSHADE[$i];
$_PDFTH[$d] = $_PDFTH[$i];
$_TIPTH[$d] = $_TIPTH[$i];
}
$nc = 1;
$p = count($_LKGrid);
$p = $_pLKGrid;
$_Form[$n][2] = $_BakForm[2];
$_Form[$n][3] = $_BakForm[3];
if( substr_count($_GRID[0][1],'%')==0 ){
for($i=$n+0; $i<$n+$MasCol+1; $i++){
$_Form[$i] = $_Form[$n];
if( $i<>$n ){
$_Form[$i][1] = $_Form[$i][1].'_'.$nc++;
$_Form[$i-1][0] = $_LDistribucion[$CampoDis][$p++];
}
$UltCampo = $_Form[$i][1];
$_ColVirtual[$i] = true;
$_ALIGN[$i] = $_ALIGN[$d];
$_COLSCOLOR[$i] = $_COLSCOLOR[$d];
if( count($_COLSOP)>0 ){
$_COLSOP[$i] = $_COLSOP[$d];
}
$_oCOLSOP[$i] = $_oCOLSOP[$d];
$_COLSWIDTH[$i] = $_COLSWIDTH[$d];
$_FORMAT[$i] = $_FORMAT[$d];
$_FORMATTOTALS[$i] = $_FORMATTOTALS[$d];
$_NOZERO[$i] = $_NOZERO[$d] ;
$_NOZEROFORMATTOTALS[$i] = $_NOZEROFORMATTOTALS[$d];
$_OpCol[$i] = $_OpCol[$d];
$_OpSubCol[$i] = $_OpSubCol[$d];
$_PDFCOL[$i] = $_PDFCOL[$d];
$_PDFCOLBORDER[$i] = $_PDFCOLBORDER[$d];
$_PDFCOLSSHADE[$i] = $_PDFCOLSSHADE[$d];
$_PDFTH[$i-1] = $_Form[$i-1][0];
$_ROWCOLOR[$i] = $_ROWCOLOR[$d];
$_TIPTH[$i-1] = $_TIPTH[$i-1];
}
if( count($_Distribucion[$CampoDis])>1 ){
$_Form[$i-1][0] = $_LDistribucion[$CampoDis][$p++];
$_PDFTH[$i-1] = $_Form[$i-1][0];
}
}else{
$ConCero = '';
$ConDecimales = '';
$ConFormato = '';
$_GRID[0][1] = str_replace('%','',$_GRID[0][1]);
if( substr_count($_GRID[0][1], 'b')==1 ){
$ConZERO = 'S';
$_GRID[0][1] = str_replace('b','',$_GRID[0][1]);
}
if( substr_count($_GRID[0][1], 'M')==1 ){
$_GRID[0][1] = str_replace('M','',$_GRID[0][1]);
if( strlen($_GRID[0][1])==1 ){
$ConFormato = "eNumberFormat(#,".$_GRID[0][1].")";
}else{
$ConFormato = "eNumberFormat(#,0)";
}
}else if( substr_count($_GRID[0][1], 'm')==1 ){
$_GRID[0][1] = str_replace('m','',$_GRID[0][1]);
if( strlen($_GRID[0][1])==1 ){
$ConFormato = "eNumberFormat(#,".$_GRID[0][1].")";
}else{
$ConFormato = "eNumberFormat(#,0)";
}
}
if( substr_count('0123456789', $_GRID[0][1])==1 ){
$ConDecimales = $_GRID[0][1];
$ConFormato = "eNumberFormat(#,".$_GRID[0][1].")";
}else{
$ConDecimales = 2;
$ConFormato = "eNumberFormat(#,2)";
}
$_GRID[0][1] = '%';
for($i=$n+1; $i<$n+$MasCol; $i+=2){
$_GRTotal++;
$_Form[$i] = $_Form[$d];
if( $i>=$n ){
$_Form[$i][1] = $_Form[$n+1][1].'_'.$nc++;
$_Form[$i][0] = $_LDistribucion[$CampoDis][$p++];
}
$_Form[$i+1] = $_Form[$n];
$_Form[$i+1][0] = '%';
$_Form[$i+1][1] = $_Form[$n][1].'_'.$nc++;
$_Form[$i+1][2] = '+,';
$_Form[$i+1][4] = '3,'.$ConDecimales;
$UltCampo = $_Form[$i+1][1];
$_ColVirtual[$i+1] = true;
$_ALIGN[$i] = $_ALIGN[$d];
$_ALIGN[$i+1] = $_ALIGN[$d];
if( count($_COLSOP)>0 ){
$_COLSOP[$i] = $_COLSOP[$d];
$_COLSOP[$i+1] = '<';
}
$_oCOLSOP[$i] = $_oCOLSOP[$d];
$_oCOLSOP[$i+1] = $_oCOLSOP[$d];
$_COLSCOLOR[$i] = $_COLSCOLOR[$d];
$_COLSCOLOR[$i+1] = '';
$_COLSWIDTH[$i] = $_COLSWIDTH[$d];
$_FORMAT[$i] = $_FORMAT[$d];
$_FORMAT[$i+1] = $ConFormato;
$_FORMATTOTALS[$i] = $_FORMATTOTALS[$d];
$_FORMATTOTALS[$i+1] = $ConFormato;
$_NOZERO[$i] = $_NOZERO[$d];
$_NOZERO[$i+1] = $ConZERO;
$_NOZEROFORMATTOTALS[$i] = $_NOZEROFORMATTOTALS[$d];
$_NOZEROFORMATTOTALS[$i+1] = $ConZERO;
$_OpCol[$i] = $_OpCol[$d];
$_OpCol[$i+1] = $_OpCol[$d];
$_OpSubCol[$i] = $_OpSubCol[$d];
$_OpSubCol[$i+1] = $_OpSubCol[$d];
$_ROWCOLOR[$i] = $_ROWCOLOR[$d];
$_ROWCOLOR[$i+1] = $_ROWCOLOR[$d];
$_PDFCOL[$i] = $_PDFCOL[$d];
$_PDFCOL[$i+1] = $_PDFCOL[$d];
$_PDFCOLBORDER[$i] = $_PDFCOLBORDER[$d];
$_PDFCOLBORDER[$i+1] = $_PDFCOLBORDER[$d];
$_PDFCOLSSHADE[$i] = $_PDFCOLSSHADE[$d];
$_PDFCOLSSHADE[$i+1] = '';
$_PDFTH[$i] = $_Form[$i][0];
$_PDFTH[$i+1] = '%';
$_TIPTH[$i] = $_TIPTH[$d];
$_TIPTH[$i+1] = $_TIPTH[$d];
}
}
}
}
$_GKGrid = array();
$_GRGrid = array();
$_GFGrid = array();
for($n=0; $n<count($_Form); $n++){
if( substr_count($_Form[$n][1],'(')>0 ){
$_GFGrid[] = $n;
}else{
$tmp = false;
for($i=0; $i<count($_Form); $i++){
if( $_Form[$n][1]==$_GRID[$i][0] ){
$_GRGrid[] = $n+1;
$tmp = true;
break 2;
}
}
if( !$tmp && !$_ColVirtual[$n] ){
$_GKGrid[] = $n;
}else{
}
}
}
if( substr_count($_GRID[0][1],'%')==1 ){
$n = 0;
foreach($_Distribucion[$_GRID[0][0]] as $key=>$value){
$_Distribucion[$_GRID[0][0]][$key] += $n++;
}
}
$_THCOLSPAN[] = "{$_GRID[0][0]}, {$UltCampo}, {$TitleTH}";
?>
