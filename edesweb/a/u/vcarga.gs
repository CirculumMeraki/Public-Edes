<?PHP
$_Coeficiente = 4;
if( isset($FILE) ){
set_time_limit(0);
$t = time();
echo $t.str_repeat("#",1024-strlen($t));
for( $n=1; $n<$FILE; $n++ ) echo str_repeat("#",1024);
exit;
}else if( isset($UPLOAD) ){
set_time_limit(0);
echo '<script type="text/javascript">window.frameElement.WOPENER.UploadEnd('.strlen($_POST['TEXTO']).')</script>';
exit;
}
?>
<HTML XMLNS:v="urn:schemas-microsoft-com:vml"><HEAD>
<style>
BODY {
FONT-FAMILY: ARIAL;
font-size:15px;
}
DIV {
background-color: #F0F0F0;
width:512px;
float:left;
}
IMG {
height: 14px;
background-color: #000099;
border: 0px;
}
SPAN {
color: blue;
font-weight: bold;
}
</style>
</HEAD>
<BODY onload='Ini()' onhelp='return false;' oncontextmenu='return false;' onselectstart='return false;'>
<IE:Download id=ObjDescarga style="behavior:url(#default#download)" />
<script type="text/javascript">
var _SgI = 0;
function FinTest( txt ){
var SgF = Date.parse(new Date());
var Dif = ( SgF - _SgI );
if( txt.indexOf('Allowed memory size')>-1 ){
alert(S.lng(212));
return;
}
if( Dif==0 ) Dif = 1;
KB.textContent = txt.length/1024;
Dif = Dif * 1.000001;
var xSg = (Dif/1000.0)+'';
xSg = xSg.replace('.',',');
if( xSg.indexOf(',')!=-1 ) xSg = xSg.substring(0,xSg.indexOf(',')+3);
SG.textContent = xSg;
Dif = Dif/1000;
var Ancho = (txt.length/1024)/Dif;
var v = (txt.length*8) / (SgF - _SgI);
var xAncho = ((2048/<?= $_Coeficiente; ?>)*v)/2048;
MENSAJE.textContent = ' ';
var Obj = document.images, n=1;
VELOCIDAD.style.top = px(Obj[n].offsetParent.offsetTop+3);
VELOCIDAD.style.left = px(Obj[n].offsetParent.offsetLeft);
if( Obj[n].width < xAncho ) xAncho = Obj[n].width+3;
for( n=Obj.length-1; n>0; n-- ){
document.children[Obj[n].sourceIndex+1].style.color = '#000000';
if( Obj[n].width > xAncho ){
VELOCIDAD.style.top = px(Obj[n].offsetParent.offsetTop+3);
VELOCIDAD.style.left = px(Obj[n].offsetParent.offsetLeft);
document.children[Obj[n].sourceIndex+1].style.color = 'blue';
break;
}
}
EstadoSelect();
VELOCIDAD.style.width = xAncho;
VELOCIDAD.style.display ='block';
v = v * 1.000001;
v = v+'';
v = v.replace('.',',');
if( v.indexOf(',')!=-1 ) v = v.substring(0,v.indexOf(',')+3);
if( v=='Infinity' ) v = 'LAND';
Ancho = Ancho * 1.000001;
Ancho = Ancho+'';
Ancho = Ancho.replace('.',',');
if( Ancho.indexOf(',')!=-1 ) Ancho = Ancho.substring(0,Ancho.indexOf(',')+3);
KBSG.textContent = Ancho;
}
function IniTest(){
var Obj = document.images, n;
for( n=Obj.length-1; n>0; n-- ) document.children[Obj[n].sourceIndex+1].style.color = '#000000';
KB.textContent = '*';
SG.textContent = '*';
KBSG.textContent = '*';
VELOCIDAD.style.width = 0;
MENSAJE.textContent = 'Ejecutando test de carga ...';
VELOCIDAD.style.display = 'none';
_SgI = Date.parse( new Date() );
n = document.all.VUsuario.value;
if( n>30 ){
alert( 'El valor máximo para el test es de 30Mg' );
document.all.VUsuario.value = 30;
}else{
ObjDescarga.startDownload( 'edes.php?E:$a/u/vcarga.gs&FILE='+(n*1024), FinTest );
}
}
function EstadoSelect(){
var v = document.all.VUsuario.value * 1024;
TasaOpBytes.textContent = (v*0.75)/8;
}
function Ini(){
EstadoSelect();
if( window.name=='IWORK' ){
top.eLoading(false,window);
}else{
top.eSWResize( window );
}
}
</script>
<b><u>VELOCIDAD DE CARGA</b> (desde el servidor al pc)</u><br>
Velocidad de conexión: <span id="KBSG">*</span> KBytes/sec <br>
Se recibierón: <span id="KB">*</span> KBytes<br>
Tiempo utilizado: <span id="SG">*</span> Segundos (10sg)
<hr>
<img id="VELOCIDAD" width="0" style="height:7; background-color: #FF0000; display:none; position:absolute">
<?PHP
$val_Kb = 4096;
for( $i=6; $i>=1; $i-- ){
echo '<div><img width="'.($val_Kb/$_Coeficiente).'"></div>';
echo '<span style="width:75; text-align:right; color:#000000">'.$val_Kb.' Kbps</span>';
echo '<br>';
$val_Kb = $val_Kb/2;
}
echo '<hr>';
@unlink('test_velocidad.php');
?>
<INPUT TYPE="text" value="3" NAME=VUsuario id=VUsuario onchange='EstadoSelect()' SIZE=2 MAXLENGTH=2>Mg
<INPUT TYPE="button" VALUE="Iniciar test" onclick="IniTest('1')"> <span id=MENSAJE></span>
<br>
La velocidad de transferencia puede considerarse óptima cuando está por encima del 75% de la velocidad máxima teórica.
<br>
Tasa de Velocidad Optima <span id=TasaOpBytes></span>&nbsp;KBytes/seg<br>
<br>
<?PHP  if( $_SESSION['_D_']=='~' ){ ?>
<p>Tests de velocidad externos:</p>
<ul style="color: #65659A; font-weight:bold">
<li><a href="http://www.velocimetro.org"						target="_blank">Test de velocidad de Escuela Superior de Ingenieros de Bilbao</a></li>
<li><a href="http://testacceso.es.tdatacenter.com/"				target="_blank">Test de velocidad de Telefónica Data</a></li>
<li><a href="http://www.gibroadband.com/pages/speedtest.asp"	target="_blank">Test de velocidad de Groupware International</a></li>
<li><a href="http://www.beelinesoftware.nl/bandwidth/"			target="_blank">Test de velocidad de Beeline Software</a></li>
<li><a href="http://www.dslreports.com/stest?loc=1"				target="_blank">Test de velocidad de Dslreports.com</a></li>
</ul>
<?PHP  } ?>
</BODY></HTML>
