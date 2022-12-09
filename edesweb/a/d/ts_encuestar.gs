<?PHP
eInclude($_Sql);
if( $_SERVER["REQUEST_METHOD"]=='POST' ){
$DimRespuestas = array();
$kPregunta = '';
foreach( $_POST as $k=>$v ){
if( $k=='cd_ts_encuesta' || $k=='cd_ts_test' || $k=='PROBAR' ){
}else if( substr($k,0,4)=='Pre_' ){
$DimRespuestas['Pre_'.$v] = array();
$kPregunta = 'Pre_'.$v;
}else{
$DimRespuestas[$kPregunta][$k] = $v;
}
}
$DimTipoRespuesta = array();
$CdTest = $_POST['cd_ts_test'];
qQuery( "select cd_ts_trespuesta from ts_pregunta where cd_ts_test={$CdTest} order by orden" );
while( $r=qRow() ) $DimTipoRespuesta[] = $r[0];
if( !$Probar && $_POST['PROBAR']==1 ){
eInclude('message');
eMessage( 'FIN ENCUESTA DE PRUEBA<br>NO SE HA GRABADO', 'HSE', 7 );
eEnd();
}
if( !eSqlType('oracle') ){
$Fecha = date('Y-m-d');
}else{
$Fecha = date('d-m-Y');
}
$uUser = $_User;
if( $_GET['Usuario']!='' ) $uUser = $_GET['Usuario'];
if( $Probar ){
eTrace( "insert into ts_encuestado (cd_gs_user,cd_ts_encuesta,dt_encuesta) values ( {$uUser}, {$_POST['cd_ts_encuesta']}, '{$Fecha}' )" );
$ID = 1;
}else{
qQuery( "insert into ts_encuestado (cd_gs_user,cd_ts_encuesta,dt_encuesta) values ( {$uUser}, {$_POST['cd_ts_encuesta']}, '{$Fecha}' )" );
$ID = qId();
}
$nr = 0;
foreach( $DimRespuestas as $kP=>$vP ){
$Pregunta = substr($kP,4);
foreach( $vP as $kR=>$vR ){
$Respuesta = substr($kR,4);
$Valor = $vR;
if( $Probar ){
if( $DimTipoRespuesta[$nr]<>'T' ){
eTrace( "insert into ts_opinion (cd_ts_encuestado,cd_ts_encuesta,cd_ts_test,cd_ts_pregunta,cd_ts_respuesta,valor) values ( {$ID}, {$_POST['cd_ts_encuesta']}, {$_POST['cd_ts_test']}, {$Pregunta}, {$Respuesta}, '{$Valor}' )" );
}else{
if( !eSqlType('oracle') ){
$Valor = str_replace( "'", "\\'", $Valor );
$Valor = str_replace( '"', '\\"', $Valor );
}else{
$Valor = str_replace( "'", "''", $Valor );
}
eTrace( "insert into ts_opinion_txt (cd_ts_encuestado,cd_ts_encuesta,cd_ts_test,cd_ts_pregunta,respuesta) values ( {$ID}, {$_POST['cd_ts_encuesta']}, {$_POST['cd_ts_test']}, {$Pregunta}, '{$Valor}' )" );
}
}else{
if( $DimTipoRespuesta[$nr]<>'T' ){
qQuery( "insert into ts_opinion (cd_ts_encuestado,cd_ts_encuesta,cd_ts_test,cd_ts_pregunta,cd_ts_respuesta,valor) values ( {$ID}, {$_POST['cd_ts_encuesta']}, {$_POST['cd_ts_test']}, {$Pregunta}, {$Respuesta}, '{$Valor}' )" );
}else{
if( !eSqlType('oracle') ){
$Valor = str_replace( "'", "\\'", $Valor );
$Valor = str_replace( '"', '\\"', $Valor );
}else{
$Valor = str_replace( "'", "''", $Valor );
}
qQuery( "insert into ts_opinion_txt (cd_ts_encuestado,cd_ts_encuesta,cd_ts_test,cd_ts_pregunta,respuesta) values ( {$ID}, {$_POST['cd_ts_encuesta']}, {$_POST['cd_ts_test']}, {$Pregunta}, '{$Valor}' )" );
}
}
$nr++;
}
}
if( $Probar ) exit;
eInclude('message');
eMessage( 'FIN DE LA ENCUESTA', 'HS', 7 );
eEnd();
}
?>
<!DOCTYPE HTML>
<html>
<head>
<title> Encuesta </title>
<?=_FileNoCache('edes.js')?>
<?=eLink('ts_encuesta')?>
</head>
<body>
<script type="text/javascript">
top.eSWTools(window,'H',3);
top.eSWTools(window,'H',4);
function FuncSort( Obj, ox, oy, nx, ny, dx, dy ){
var f, xy, Dentro = -1, TR = DGI('Ord_'+_aPregunta).rows;
if( Obj.OriX == undefined ){
Obj.OriX = ox+2;
Obj.OriY = oy;
}
for( f=0; f<TR.length; f++ ){
xy = top.eXY( TR[f].cells[1] );
if( xy[0]<dx && xy[0]+xy[2]>dx && xy[1]<dy && xy[1]+xy[3]>dy ){
if( TR[f].cells[0].Puntero!=undefined ){
var sObj = TR[f].cells[0].Puntero;
sObj.style.position = 'absolute';
sObj.style.left = px(TR[f].cells[0].Puntero.OriX);
sObj.style.top = px(TR[f].cells[0].Puntero.OriY);
DGI( sObj.Respuesta ).value = '';
TR[f].cells[0].Puntero = undefined;
}
if( Obj.Puntero != undefined ) Obj.Puntero.Puntero = undefined;
Obj.style.left = xy[0]+7;
Obj.style.top = xy[1]+4;
DGI( Obj.Respuesta ).value = TR[f].cells[0].textContent*1;
TR[f].cells[0].Puntero = Obj;
Obj.Puntero = TR[f].cells[0];
Dentro = f;
break;
}
}
if( Dentro == -1 ){
if( Obj.Puntero!=undefined ){
Obj.Puntero.Puntero = undefined;
DGI( Obj.Respuesta ).value = '';
}
Obj.Puntero = undefined;
Obj.style.left = px(Obj.OriX);
Obj.style.top = px(Obj.OriY);
}
}
</script>
<?PHP
$CdEncuesta = $_GET['cd_ts_encuesta'];
qQuery( "select * from ts_encuesta where cd_ts_encuesta={$CdEncuesta}" );
$e=qArray();
$CdTest = $e['cd_ts_test'];
qQuery( "select * from ts_test where cd_ts_test={$CdTest}" );
$t=qArray();
$Total = qCount( 'ts_pregunta', "cd_ts_test={$CdTest}" );
echo "<script type='text/javascript'>var _Total={$Total},_aPregunta = 1;</script>";
echo '<FORM AUTOCOMPLETE="off" NAME="FRM1" METHOD="POST">';
echo "<input type='hidden' name='PROBAR' value='{$_GET['Probar']}'>";
echo "<input type='hidden' name='cd_ts_encuesta' value='{$CdEncuesta}'>";
echo "<input type='hidden' name='cd_ts_test' value='{$CdTest}'>";
echo "<table border=0 id='Encuesta' cellspacing=0 cellpadding=0>";
echo '<tr><th class=TITULO>'.trim($t['nm_ts_test']).'</th></tr>';
echo '<tr><td class=PREGUNTAS id=Preguntas>';
$n = 1;
qQuery( "select * from ts_pregunta where cd_ts_test={$CdTest} order by orden", $p1 );
while( $p=qArray($p1) ){
$DimRes = array();
echo "<input type='hidden' name='Pre_{$n}' value='{$p['cd_ts_pregunta']}'>";
echo "<table border=0 id='Pregunta{$n}' Respuestas='{$p['n_respuestas']}' TRespuesta='{$p['cd_ts_trespuesta']}' cellspacing=0 cellpadding=0>";
echo '<tr><td class=nPREGUNTA width=1 valign=top>'.$n.'/'.$Total.'</td><td width=100% class=PREGUNTA>'.trim($p['pregunta']).'</td></tr>';
echo '<tr><td class=RESPUESTAS colspan=2 valign=top>';
qQuery( "select * from ts_respuesta where cd_ts_pregunta={$p['cd_ts_pregunta']} order by cd_ts_pregunta,orden" );
while( $r = qArray() ){
$CdRespuesta = $r['cd_ts_respuesta'];
if( $p['n_respuestas']<2 ){
switch( $p['cd_ts_trespuesta'] ){
case 'S':
case 'N':
case 'R':
echo "<input type='radio' name='Res_{$CdRespuesta}' value='' onclick='ClickRadio(this)'>";
break;
case 'P':
break;
case 'O':
break;
case 'T':
$DimRes[] = array( $CdRespuesta, trim($r['respuesta']) );
break;
case 'X':
$DimRes[] = array( $CdRespuesta, trim($r['respuesta']) );
break;
}
}else if( $p['cd_ts_trespuesta']=='O' ){
$DimRes[] = array( $CdRespuesta, trim($r['respuesta']) );
continue;
}else{
echo "<input type='checkbox' name='Res_{$CdRespuesta}' value='' TRespuestas={$p['n_respuestas']} onclick='ClickCheck(this)'>";
}
if( $p['cd_ts_trespuesta']!='T' && $p['cd_ts_trespuesta']!='X' ){
echo '<span class=RESPUESTA onclick="ClickLabel()"> '.trim($r['respuesta']).'</span><br>';
}
}
if( $p['cd_ts_trespuesta']=='O' ){
echo '<table border=0 cellspacing=0 cellpadding=0>';
echo '<tr><td>';
echo "<table class=ResOrdenar border=0 cellspacing=1px cellpadding=0 id='Ord_{$n}'>";
for( $i=0; $i<count($DimRes); $i++ ){
echo '<tr><td>'.($i+1).'</td><td>&nbsp;</td></tr>';
}
echo '</table>';
echo "<td valign=top id='Lista_{$n}'>";
for( $i=0; $i<count($DimRes); $i++ ){
$CdRespuesta = $DimRes[$i][0];
echo "<span class=RESPUESTA Respuesta='Res_{$CdRespuesta}' style='cursor:crosshair' onmousedown='top.eCapture(window,FuncSort)'>".$DimRes[$i][1].'</span><br>';
}
echo '</table>';
for( $i=0; $i<count($DimRes); $i++ ){
$CdRespuesta = $DimRes[$i][0];
echo "<input type='hidden' name='Res_{$CdRespuesta}' value='' TRespuestas={$p['n_respuestas']} size=1>";
}
}else if( $p['cd_ts_trespuesta']=='T' ){
echo "<input name='Res_{$CdRespuesta}' TRespuestas={$p['n_respuestas']} MAXLENGTH=60 SIZE=60 style='width:500px'>";
}else if( $p['cd_ts_trespuesta']=='X' ){
echo "<textarea name='Res_{$CdRespuesta}' TRespuestas={$p['n_respuestas']} cols=60 rows=10 style='width:500px'></textarea>";
}
echo '</td></tr>';
echo '</table>';
$n++;
}
?>
</td></tr>
<tr><td colspan=2 class=BOTONES>
<table width=100%><tr>
<td><input type="button" class="BOTON" value="Anterior" id="BotonAnterior" onclick="Anterior()" style="display:none"><td width=100%>
<td><input type="button" class="BOTON" value="Siguiente" id="BotonSiguiente" onclick="Siguiente()">
<td><input type="button" class="BOTON" value="Fin del Test" id="BotonFin" onclick="Fin()" style="display:none">
</table>
</td></tr>
</td></tr>
</table>
</FORM>
<script type="text/javascript">
var _aTotal = 0;
var _Ancho = document.all.Encuesta.offsetWidth, _Alto=0, n, i;
for( n=1; n<=_Total; n++ ){
if( _Alto < DGI('Pregunta'+n).offsetHeight ) _Alto = DGI('Pregunta'+n).offsetHeight;
if( DGI('Pregunta'+n).TRespuesta=='O' ){
var ele = DGI('Lista_'+n).all, MaxAncho = 0;
for( i=0; i<ele.length; i++ ){
if( ele[i].tagName=='SPAN' ) if( MaxAncho < ele[i].offsetWidth ) MaxAncho = ele[i].offsetWidth;
}
DGI('Lista_'+n).style.width = MaxAncho+10;
DGI('Ord_'+n).children[0].children[2].style.width = MaxAncho+10;
}
}
_Alto += 5;
DGI('Encuesta').style.width = _Ancho;
DGI('Preguntas').style.height = _Alto;
for( n=1; n<=_Total; n++ ){
DGI('Pregunta'+n).style.display = 'none';
DGI('Pregunta'+n).style.height = '100%';
}
var _ObjRes = null;
function VerPregunta( n ){
DGI('Pregunta'+n).style.display = 'block';
DGI('Pregunta'+n).rows[0].style.height = 1;
document.all.BotonAnterior.style.display = ( n==1 ) ? 'none' : 'block';
document.all.BotonSiguiente.style.display = ( n==_Total ) ? 'none' : 'block';
document.all.BotonFin.style.display = ( n==_Total ) ? 'block' : 'none';
_aPregunta = n;
DGI('Pregunta'+n).Elementos = DGI('Pregunta'+n).getElementsByTagName('input').length;
if( _aTotal < n ) _aTotal = n;
top.eInfoHide();
if( DGI('Pregunta'+_aPregunta).TRespuesta=='X' ){
Ele = DGI('Pregunta'+_aPregunta).getElementsByTagName('textarea');
_ObjRes = Ele[0];
setTimeout(" _ObjRes.focus()",1000);
}else if( DGI('Pregunta'+_aPregunta).TRespuesta=='T' ){
Ele = DGI('Pregunta'+_aPregunta).getElementsByTagName('input');
_ObjRes = Ele[0];
setTimeout(" _ObjRes.focus()",1000);
}
}
VerPregunta( 1 );
function ClickRadio( Obj ){
var Old = Obj.value;
var Ele = DGI('Pregunta'+_aPregunta).getElementsByTagName('input'), n, Marcados = 0;
for( n=0; n<Ele.length; n++ ){
Ele[n].checked = false;
Ele[n].value = '';
}
if( Old != 'S' ){
Obj.checked = true;
Obj.value = 'S';
}
}
function ClickCheck( Obj ){
var Ele = DGI('Pregunta'+_aPregunta).getElementsByTagName('input'), n, Marcados = 0;
for( n=0; n<Ele.length; n++ ) if( Ele[n].checked ) Marcados++;
if( _ClickLabel ){
Obj.checked = !Obj.checked;
if( Obj.checked ) Marcados++;
}
if( DGI('Pregunta'+_aPregunta).Respuestas < Marcados ){
if( Obj.checked ){
top.eSound('A');
top.eInfoError( window, "Solo puede marcar "+DGI('Pregunta'+_aPregunta).Respuestas+" respuestas" );
Obj.checked = false;
}else{
Obj.checked = true;
Obj.value = 'S';
}
}else{
if( !Obj.checked ){
Obj.checked = false;
Obj.value = '';
}else{
Obj.checked = true;
Obj.value = 'S';
}
}
_ClickLabel = false;
}
var _ClickLabel = false;
function ClickLabel(){
_ClickLabel = true;
var Obj = S.event(window);
S(document.children[Obj.sourceIndex-1]).eventClick();
}
function RespuestaCorrecta(){
var Ele = DGI('Pregunta'+_aPregunta).getElementsByTagName('input'), n, Marcados = 0;
if( DGI('Pregunta'+_aPregunta).TRespuesta=='X' ){
Ele = DGI('Pregunta'+_aPregunta).getElementsByTagName('textarea');
return (top.eTrim(Ele[0].value)!='')?0:1;
}else if( DGI('Pregunta'+_aPregunta).TRespuesta=='T' ){
Ele = DGI('Pregunta'+_aPregunta).getElementsByTagName('input');
return (top.eTrim(Ele[0].value)!='')?0:1;
}
if( Ele[0].type=='hidden' ){
for( n=0; n<Ele.length; n++ ) if( Ele[n].value*1 > 0 ) Marcados++;
return( parseInt(DGI('Pregunta'+_aPregunta).Respuestas)-Marcados );
}
for( n=0; n<Ele.length; n++ ){
if( Ele[n].checked ) Marcados++;
}
return( parseInt(DGI('Pregunta'+_aPregunta).Respuestas)-Marcados );
}
function Anterior(){
DGI('Pregunta'+_aPregunta).style.display = 'none';
VerPregunta( _aPregunta-1 );
}
function FaltanRes(){
var n = RespuestaCorrecta();
top.eSound('A');
if( DGI('Pregunta'+_aPregunta).TRespuesta=='T' ){
top.eInfoError( window, "Falta rellenar el dato" );
return;
}
var Ele = DGI('Pregunta'+_aPregunta).getElementsByTagName('input');
if( Ele[0].type=='hidden' ){
if( n==1 ){
top.eInfoError( window, "Falta 1 respuesta por ordenar" );
}else{
top.eInfoError( window, "Faltan "+n+" respuestas por ordenar" );
}
}else{
if( n==1 ){
top.eInfoError( window, "Falta 1 respuesta por marcar" );
}else{
top.eInfoError( window, "Faltan "+n+" respuestas por marcar" );
}
}
}
function Siguiente(){
if( RespuestaCorrecta()!=0 ){
FaltanRes();
return;
}
DGI('Pregunta'+_aPregunta).style.display = 'none';
VerPregunta( _aPregunta+1 );
}
function _Fin( Op ){
if( Op==1 ) document.forms(0).submit();
}
function Fin(){
if( RespuestaCorrecta()!=0 ){
FaltanRes();
return;
}
top.eAlert( "CONFIRMAR", "¿Terminar Encuesta?", "Y,N", "DH", _Fin );
}
function Paginar(){
switch( S.eventCode(event) ){
case 34:
if( _aPregunta < _Total ) Siguiente();
return top.eClearEvent(window);
case 33:
if( _aPregunta > 1 ) Anterior();
return top.eClearEvent(window);
case 36:
DGI('Pregunta'+_aPregunta).style.display = 'none';
VerPregunta( 1 );
return top.eClearEvent(window);
case 35:
DGI('Pregunta'+_aPregunta).style.display = 'none';
VerPregunta( _aTotal );
return top.eClearEvent(window);
}
}
document.onkeydown = Paginar;
document.onselectstart = function anonymous(){ return false; }
</script>
</body>
</html>
