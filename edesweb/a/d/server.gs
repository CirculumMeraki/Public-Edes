<?PHP
session_start();
if( !isset($_SESSION['_User']) ){
include('index.htm');
exit;
}
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
eInclude('message');
eMessage('SOLO SISTEMA Linux/Unix','HS');
}
if( strstr( $argv[0], '?') ) list( , $argv[0] ) = explode('?', $argv[0] );
if( $argv[0] == 'T' ){
?>
<!DOCTYPE HTML><HTML><HEAD>
<style>BODY { font-size:16px }</style>
</HEAD><BODY>
<script type="text/javascript">
if( window.name=='IWORK' ){
top.eAutoMenu(0);
top.eLoading(false,window);
}else{
top.eSWResize( window );
}
</SCRIPT>
<?PHP
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
eInclude('message');
eMessage('SOLO SISTEMA Linux/Unix','HS');
}else{
echo '<pre>';
echo "TOP:\n";
echo "====\n";
exec('top n 1 b i', $top, $error );
for( $i=0; $i<count($top); $i++ ) echo $top[$i]."\n";
if( $error[0]!='' ) echo "Error: ". $error[0]."\n";
if( $error[0]!='' ){
exec('/usr/bin/top n 1 b 2>&1', $error );
echo "Error: ".$error[0]."\n";
}
echo"\n\n";
echo "VMSTAT:\n";
echo "=======\n";
$top = array();
exec('vmstat', $top, $error );
for( $i=0; $i<count($top); $i++ ) echo $top[$i]."\n";
if( $error[0]!='' ) echo "Error: ". $error[0]."\n";
echo"\n\n";
echo "PROCESOS:\n";
echo "=========\n";
$salida = shell_exec("ps -fea");
$Dim = explode("\n",$salida);
echo $Dim[0]."\n";
for( $n=0;$n<count($Dim); $n++ ){
$txt = trim($Dim[$n]);
if( substr( $txt,0,6)=='nobody' ) echo $Dim[$n]."\n";
}
echo "=========\n";
echo $salida;
echo '</pre>';
}
echo '</BODY></HTML>';
exit;
}
$Dim = array();
exec( 'lynx -dump http:/'.'/'.$SERVER_ADDR.'/server-status', $Dim );
$_ConPermiso = true;
for( $n=0; $n<max(count($Dim),7); $n++ ){
if( substr_count( $Dim[$n], "You don't have permission to access" ) == 1 ){
$_ConPermiso = false;
}
}
if( $argv[0] == 'O' ){
eHTML();
?>
<script type="text/javascript">
if( window.name=='IWORK' ){
top.eAutoMenu(1);
top.eLoading(false,window);
}else{
top.eSWResize( window );
}
</SCRIPT>
</HEAD><BODY><pre>
<?PHP
if( $_ConPermiso ){
for( $n=0; $n<count($Dim); $n++ ) echo $Dim[$n].'<br>';
}else{
echo 'Permiso denegado a <b>"server-status"</b>';
}
echo '</BODY></HTML>';
return;
}
if( $argv[0] == 'R' ){
$nL = 0;
$nM = 0;
$nE = 0;
$Activado = 0;
for( $n=0; $n<count($Dim); $n++){
$txt = trim($Dim[$n]);
if( $Activado == 1 ) $Activado = 2;
if( 'Srv PID Acc ' == substr( $txt,0,12 ) ){
$Activado = 1;
continue;
}
if( '_____' == substr( $txt,0,5 ) && $Activado == 2 ) break;
if( 'Current Time: ' == substr( $txt,0,14 ) ){
$tmp = explode( ' ',$txt);
$Hora = $tmp[4];
continue;
}
if( $Activado == 2 ){
$n++;
$txt .= ' '.trim($Dim[$n]);
if( substr_count( $txt,' ' ) != 14 ){
$n++;
$txt .= ' '.trim($Dim[$n]);
}
$tmp = explode( ' ',$txt);
switch ( $tmp[3] ){
case 'W':
$nM++;
break;
case 'S':
case 'R':
case 'K':
$nL++;
break;
case '_':
case 'D':
case 'L':
case 'G':
$nE++;
break;
case '.':
}
}
}
echo '<script type="text/javascript">';
echo 'var Escala = 2;';
$Total = ( $nL + $nM + $nE );
echo "var Valor = Array( '{$Hora}','{$nL}','{$nM}','{$nE}', '{$Total}' );";
?>
Escala = parent.frames.Pag.window.FRM.ANCHO.value / (parent.frames.Pag.window.FRM.USUARIOS.value/5);
var obj = parent.frames.Pag.window.DGI("ESTADISTICA");
var tl = obj.rows.length-1;
var MaxLineas = parent.frames.Pag.window.FRM.HISTORIA.value;
while( MaxLineas >= 1 && MaxLineas <= tl ){
obj.deleteRow(0);
tl--;
}
obj.insertRow(tl);
for( var c=0; c<5; c++ ){
obj.rows[tl].insertCell(c);
obj.rows[tl].cells[c].textContent = Valor[c];
obj.rows[tl].cells[c].id = 'd';
}
obj.rows[tl].insertCell(5);
obj.rows[tl].cells[5].innerHTML =
'<div id=gL style="width:'+Valor[1]*Escala+';"></div>'+
'<div id=gM style="width:'+Valor[2]*Escala+';"></div>'+
'<div id=gE style="width:'+Valor[3]*Escala+';"></div>'
parent.frames.Pag.window.scroll( 0, parent.frames.Pag.document.body.scrollHeight );
var obj = parent.frames.Pag.window.DGI( 'Max' );
var mL = obj.children['gL'].textContent;
var mM = obj.children['gM'].textContent;
var mE = obj.children['gE'].textContent;
var mX = obj.children['gT'].textContent;
if( parseInt(mL) < Valor[1] ) obj.children['gL'].textContent = ' '+Valor[1]+' ';
if( parseInt(mM) < Valor[2] ) obj.children['gM'].textContent = ' '+Valor[2]+' ';
if( parseInt(mE) < Valor[3] ) obj.children['gE'].textContent = ' '+Valor[3]+' ';
if( parseInt(mX) < (parseInt(Valor[1])+parseInt(Valor[2])+parseInt(Valor[3])) ) obj.children['gT'].textContent = ' '+(parseInt(Valor[1])+parseInt(Valor[2])+parseInt(Valor[3]))+' ';
</SCRIPT>
<?PHP
exit;
}
?>
<!DOCTYPE HTML>
<HTML><HEAD>
<style>
BODY {
margin-bottom: 1px;
font-family: "Verdana";
font-size: 12px;
color: #336600;
background: #FFFFCC;
scrollbar-arrow-color: #9A6236;
scrollbar-base-color: #c4ce9a;
}
TH {
white-space: nowrap;
font-family: "Verdana";
font-size: 10px;
font-weight: normal;
color: #FFFF00;
background: #339900;
}
TD {
white-space: nowrap;
font-family: "Verdana";
font-size: 10px;
color: #336600;
background: #c4ce9a;
}
#o { display: none; }
#c { text-align: center; }
#d { text-align: right; }
#gL {
float: left;
color: #FFFFCC;
background: red;
}
#gM {
float: left;
color: #FFFFCC;
background: #6699FF;
}
#gE {
float: left;
color: #FFFFCC;
background: #66CC00;
}
#gT {
float: left;
color: #336600;
background: #c4ce9a;
}
</style>
</HEAD>
<BODY>
<?PHP
if( !$_ConPermiso ){
echo 'Permiso denegado a <b>"server-status"</b>';
echo '</body></html>';
exit;
}
$Mostrar = array( 0,0,0,1,1,1,0,1,0,0,1,0,1,1 );
$Sumar   = array( 0,0,0,0,1,1,0,1,0,0,0,0,0,0 );
$Total   = array( 0,0,0,0,0,0,0,0,0,0,0,0,0,0 );
$tReg = 0;
$Activado = 0;
if( $argv[0] == 'S' ){
?>
<script type="text/javascript">
if( window.name=='IWORK' ){
top.eAutoMenu(1);
top.eLoading(false,window);
}else{
top.eSWResize( window );
}
</SCRIPT>
<?PHP
if( $_ConPermiso ){
EstadoActual( $Dim );
}else{
echo 'Permiso denegado a <b>"server-status"</b>';
}
exit;
}
include_once( $Dir_.$_Sql.'.inc' );
qCount( 'gs_user' );
?>
<table id=ESTADISTICA cellspacing=1px cellpadding=0 border=0 width=100%>
<TR>
<th id=c>Hora</th>
<th id=c>Leer</th>
<th id=c>Enviar</th>
<th id=c>Esperar</th>
<th id=c>Total</th>
<th id=Grafica width=100%>Gráfica</th>
</TR>
</table>
<FORM METHOD=POST ACTION="" NAME="FRM">
Intervalo: <INPUT TYPE="text" NAME="SG" SIZE=4 VALUE='15'> sg   
<INPUT TYPE="submit" value="Iniciar Estadistica" onclick="Iniciar();return false;" NAME='INICIAR'>  
<INPUT TYPE="submit" value="STOP" onclick="Parar();return false;" NAME='PARAR'>  
Histórico: <INPUT TYPE="text" NAME="HISTORIA" SIZE=5 VALUE='3600'>
<DIV id=Max style='position: absolute;'>
<DIV id=gL>0</DIV>
<DIV id=gM>0</DIV>
<DIV id=gE>0</DIV>
<DIV id=gT>0</DIV>
</DIV>
<INPUT TYPE="hidden" NAME="ANCHO">
<INPUT TYPE="hidden" NAME="USUARIOS">
</FORM>
<script type="text/javascript">
var _Sg;
function Iniciar(){
if( FRM.SG.value > 0 ){
clearInterval( _Sg );
NuevaLinea();
_Sg = setInterval( 'NuevaLinea()', FRM.SG.value * 1000 );
FRM.PARAR.style.color		 = '#FFFFFF';
FRM.PARAR.style.background	 = '#339900';
FRM.INICIAR.style.color		 = '#336600';
FRM.INICIAR.style.background = '#CCCCCC';
}
return false;
}
function Parar(){
clearInterval( _Sg );
FRM.INICIAR.style.color		 = '#FFFFFF';
FRM.INICIAR.style.background = '#339900';
FRM.PARAR.style.color		 = '#336600';
FRM.PARAR.style.background	 = '#CCCCCC';
}
Parar();
var _nl = 0;
function NuevaLinea(){
try{
if( window.parent.TLF.document.readyState == 'complete' ) window.parent.TLF.location.href = 'edes.php?E:$a/d/server.gs&R';
}
catch( e ){
clearInterval( _Sg );
window.parent.TLF.location.href = 'edes.php?E:$a/d/server.gs&R';
_Sg = setInterval( 'NuevaLinea()', FRM.SG.value * 1000 );
}
}
FRM.ANCHO.value = DGI("Grafica").clientWidth;
FRM.USUARIOS.value = <?= $_TReg; ?>;
if( window.name=='IWORK' ){
top.eLoading(false,window);
}else{
top.eSWResize( window );
}
</SCRIPT>
</BODY></HTML>
<?PHP
exit;
function EstadoActual( $Dim ){
for( $n=1; $n<count($Dim); $n++){
$txt = trim($Dim[$n]);
if( $Activado == 1 ){
echo "<table id=TABLA>";
echo '<TR>';
echo '<th id=c>M</th>';
echo '<th id=c>CPU</th>';
echo '<th id=c>SS</th>';
echo '<th id=c>Kb</th>';
echo '<th id=c>Client</th>';
echo '<th id=c>Metodo</th>';
echo '<th id=c>Request</th>';
echo '</TR>';
$Activado = 2;
}
if( 'Srv PID Acc ' == substr( $txt,0,12 ) ){
$Activado = 1;
continue;
}
if( '_____' == substr( $txt,0,5 ) && $Activado == 2 ){
echo '<TR>';
echo '<th id=d>'.eNumberFormat($tReg     ,0).'</th>';
echo '<th id=d>'.eNumberFormat($Total[ 4],2).'</th>';
echo '<th id=d>'.eNumberFormat($Total[ 5],2).'</th>';
echo '<th id=d>'.eNumberFormat($Total[ 7],2).'</th>';
echo '<th> </th>';
echo '<th> </th>';
echo '<th> </th>';
echo '</TR>';
echo '</table>';
$Activado = 3;
}
if( 'Current Time: ' == substr( $txt,0,14 ) ){
$tmp = explode( ' ',$txt);
$Hora = $tmp[4];
echo '<br>Hora: '.$Hora;
continue;
}
if( $Activado == 2 ){
$n++;
$txt .= ' '.trim($Dim[$n]);
if( substr_count( $txt,' ' ) != 14 ){
$n++;
$txt .= ' '.trim($Dim[$n]);
}
$tmp = explode( ' ',$txt);
$tReg++;
echo '<TR>';
echo '<td>'.$tmp[ 3].'</td>';
echo '<td id=d>'.eNumberFormat($tmp[ 4],2).'</td>'; $Total[4] += $tmp[4];
echo '<td id=d>'.eNumberFormat($tmp[ 5],2).'</td>'; $Total[5] += $tmp[5];
echo '<td id=d>'.eNumberFormat($tmp[ 7],2).'</td>'; $Total[7] += $tmp[7];
echo '<td>'.$tmp[10].'</td>';
echo '<td>'.$tmp[12].'</td>';
echo '<td>'.$tmp[13].'</td>';
echo '</TR>';
}
}
?>
<pre>
"_" Waiting for Connection
"S" Starting up
"R" Reading Request
"W" Sending Reply
"K" Keepalive (read)
"D" DNS Lookup
"L" Logging
"G" Gracefully finishing
"." Open slot with no current process
"?" (7)
</pre>
<?PHP
}
?>
