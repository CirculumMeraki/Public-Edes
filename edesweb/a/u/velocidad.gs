<?PHP
eLngLoad();
if( strtoupper(substr(PHP_OS,0,3)) != 'LIN' ){
include_once('../../edesweb/message.inc');
eMessage($_Lng['SOLO SISTEMA Linux/Unix'],'HSE');
}
session_start(); if( !isset($_SESSION['_User']) ) exit;
eHTML();
?>
<style>
BODY {
FONT-FAMILY: ARIAL;
FONT-SIZE: 12px;
}
TABLE {
BACKGROUND: #d8dcdf;
COLOR: #0a00af;
FONT-SIZE: 100%;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #dd8800;
}
TH {
BACKGROUND: #000099;
COLOR: #FFFFFF;
FONT-SIZE: 120%;
PADDING-TOP: 5px;
}
TD {
WHITE-SPACE: nowrap;
BACKGROUND: #FFFFCC;
COLOR: #000066;
}
p {
COLOR: #000099;
}
</style>
</HEAD><BODY style="margin:0px" onload='top.eBodyBackground(window)' oncontextmenu='return false' onhelp='return false'>
<?PHP
include( '../_datos/config/sql.inc' );
$Dim = file($Dir_.'a/u/test_db.php');
$txt = '';
for( $n=0; $n<count($Dim); $n++ ){
$Dim[$n] = trim($Dim[$n]);
if( substr($Dim[$n],0,5) == '$_Sql' ){
$tmp = explode( '=', $Dim[$n] );
$tmp[0] = trim($tmp[0]);
$Dim[$n] = $tmp[0];
$tmp[0] = substr($tmp[0],1);
$Dim[$n] .= "='".${$tmp[0]}."';";
}
if( $Dim[$n]!='' ) $txt .= $Dim[$n]."\n";
}
copy( $Dir_.'a/u/test.htm', '__tmp_edes_test.htm' );
copy( $Dir_.'a/u/test.php', '__tmp_edes_test.php' );
$df = fopen('__tmp_edes_test_db.php','w');
fwrite($df,$txt);
fclose($df);
if( true ){
?>
<BR><center>
<TABLE style='margin:15px'>
<col style="text-align:center">
<col style='text-align:right'>
<col style='text-align:right'>
<tr><TD colspan=3 style="text-align:center"><B><?=$_Lng['MAXIMO RENDIMIENTO']?></B>
<TR>
<TH><?=$_Lng['TIPO']?></TH>
<TH><?=$_Lng['Requests/Sg']?></TH>
<TH><?=$_Lng['Kb/Sg']?></TH>
<?PHP
echo '<tr><td>HTM';
$vHTML = RetornaValor( '__tmp_edes_test.htm' );
echo '<tr><TD>PHP';
$vPHP = RetornaValor( '__tmp_edes_test.php' );
echo '<tr><TD>DB';
$vDB = RetornaValor( '__tmp_edes_test_db.php' );
$vHTML = trim($vHTML)*1;
$vPHP = trim($vPHP)*1;
$vDB = trim($vDB)*1;
$total  = (($vPHP*100)/$vHTML);
$total2 = (($vDB*100)/$vHTML);
echo '<TR><TD colspan=3 style="text-align:center"><B>';
echo eNumberFormat($total,2).'%';
echo ' / ';
echo eNumberFormat($total2,2).'%';
echo '</B></TR></TABLE></center>';
}else if( true ){
$ORDEN = trim($ORDEN);
if( $ORDEN[0] == '/' ) $ORDEN = substr($ORDEN,2);
if( trim($REPETICIONES)=='' ) $REPETICIONES=20;
exec( "ab -n {$REPETICIONES} http://".$_SERVER['HTTP_HOST']."/{$ORDEN}", $Dim, $Error );
if( $ORIGINAL=='S' ) for($i=0;$i<count($Dim);$i++) echo $Dim[$i].'<br>';
?>
<TABLE width=100%>
<col style='text-align:left;width:100%'>
<col style='text-align:right'>
<col style='text-align:right'>
<col style='text-align:right'>
<col style='text-align:right'>
<col style='text-align:center'>
<col style='text-align:left; white-space:nowrap;'>
<TR>
<TH><?=$_Lng['FICHERO']?></TH>
<TH><?=$_Lng['LONGITUD']?></TH>
<TH><?=$_Lng['NºVECES']?></TH>
<TH><?=$_Lng['REQUESTS/Sg']?></TH>
<TH><?=$_Lng['Kb/Sg']?></TH>
<TH><?=$_Lng['OK']?></TH>
<TH style='text-align:center'><?=$_Lng['INSTANTE']?></TH>
<TR>
<?PHP
echo "<TD>{$ORDEN}";
for($i=0;$i<count($Dim);$i++){
$tmp = explode(':',trim($Dim[$i]) );
$tmp[1] = trim($tmp[1]);
while( substr_count($tmp[1],'  ') > 1 ) $tmp[1] = str_replace('  ',' ',$tmp[1]);
switch( $tmp[0] ){
case 'Total':
if( '1 1 1' == $tmp[1] ){
echo '<TD style="color:#000099"><B>'.$_Lng['OK'].'</B>';
}else{
echo '<TD style="color:#FF0000"><B>'.$_Lng['ERROR'].'</B>';
}
break;
case 'Complete requests':
case 'Document Length':
case 'Requests per second':
case 'Transfer rate':
$tmp2 = explode( ' ', $tmp[1] );
echo '<TD>'.$tmp2[0];
break;
}
}
echo '<TD>'.date('Y-m-d H:i:s' );
echo '</TR></TABLE>';
}
?>
<script type="text/javascript">
if( top.eIsWindow(window) ){
top.eSWIResize(window,-1);
}else{
top.eLoading(false,window);
}
</SCRIPT>
<?PHP
echo "</BODY></HTML>";
@unlink( '__tmp_edes_test.htm'	);
@unlink( '__tmp_edes_test.php'	);
@unlink( '__tmp_edes_test_db.php'	);
function RetornaValor( $ORDEN ){
exec( "ab -n 1000 http://".$_SERVER['HTTP_HOST']."/{$ORDEN}", $Dim, $Error );
for($i=0;$i<count($Dim);$i++){
$tmp = explode(':',trim($Dim[$i]) );
$tmp[1] = trim($tmp[1]);
while( substr_count($tmp[1],'  ') > 1 ) $tmp[1] = str_replace('  ',' ',$tmp[1]);
switch( $tmp[0] ){
case 'Total':
break;
if( '1 1 1' == $tmp[1] ){
echo '<TD style="color:#000099"><B>'.$_Lng['OK'].'</B>';
}else{
echo '<TD style="color:#FF0000"><B>'.$_Lng['ERROR'].'</B>';
}
break;
case 'Complete requests':
case 'Document Length':
break;
case 'Requests per second':
$tmp2 = explode( ' ', $tmp[1] );
echo '<TD>'.$tmp2[0];
$v = $tmp2[0];
break;
case 'Transfer rate':
$tmp2 = explode( ' ', $tmp[1] );
echo '<TD>'.$tmp2[0];
break;
}
}
return $v;
}
eEnd();
