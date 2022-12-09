<html>
<head>
<style>
BODY {
text-align:center;
font-size:12px;
font-style: Arial;
}
CAPTION {
font-size:18px;
}
TABLE {
background-color: #cccccc;
}
TD {
background-color: #ffffff;
font-style: Arial;
}
</style>
<?=_FileNoCache('edes.js')?>
<script type="text/javascript">
function eRound( num, dec ){
var p = Math.pow(10,dec);
var r = (Math.round(num*p)/p)+'';
var t = r.split('.');
if( dec > 0 ){
if( t[1]==undefined ) t[1]='';
for( var n=t[1].length; n<dec; n++ ) t[1] += '0';
return t[0]+'.'+t[1];
}else{
return t[0]+'';
}
}
function MejorColor(Papel){
var cOk='' , vMax=0 , n;
var cOk1='', vMax1=0, n1;
var r,v,a,c='';
Papel = S.upper(S.rgb2hex(Papel));
for( r=0; r<16; r++ ){
for( v=0; v<16; v++ ){
for( a=0; a<16; a++ ){
c = '#'+r.toString(16)+r.toString(16)+
v.toString(16)+v.toString(16)+
a.toString(16)+a.toString(16);
n = top.eColorDiff( Papel, c );
if( n > vMax ){
vMax = n;
cOk = c;
}
n1 = top.eColorBrightness( Papel, c );
if( n1 > vMax1 ){
vMax1 = n1;
cOk1 = c;
}
}
}
}
var TR = DGI("ColoresAuto").insertRow(0);
var TD = TR.insertCell(0);
TD.textContent = S.upper(cOk);
TD.style.color = cOk;
TD.style.backgroundColor = Papel;
TD.style.fontFamily = "monospace";
TD = TR.insertCell(1); TD.style.textAlign = 'right';
TD.textContent = eRound(vMax,3);
TD = TR.insertCell(1);
TD.textContent = 'Por diferencia de color';
TD = TR.insertCell(3); TD.style.textAlign = 'right';
TD.textContent = eRound((vMax*100)/765,2)+'%';
TR = DGI("ColoresAuto").insertRow(1);
TD = TR.insertCell(0);
TD.textContent = S.upper(cOk1);
TD.style.color = cOk1;
TD.style.backgroundColor = Papel;
TD.style.fontFamily = "monospace";
TD = TR.insertCell(1); TD.style.textAlign = 'right';
TD.textContent = eRound(vMax1,3);
TD = TR.insertCell(1);
TD.textContent = 'Por contraste';
TD = TR.insertCell(3); TD.style.textAlign = 'right';
TD.textContent = eRound((vMax1*100)/255,2)+'%';
}
function PonColor(){
var el = S.event(window);
if( el.tagName!='TD' ) return;
if( el.cellIndex % 2 != 0 ) return;
if( S.trim(el.textContent)=='' ) return;
var Color = el.style.backgroundColor;
var Obj = DGI("TablaColores").rows, r, c;
for( r=0; r<Obj.length; r++ ){
for( c=1; c<Obj[r].cells.length; c+=2 ){
Obj[r].cells[c].style.backgroundColor = Color;
}
}
Obj = DGI("ColoresAuto");
while( Obj.rows.length>0 ) Obj.deleteRow(0);
MejorColor( Color );
}
function MemorizaColor(){
var Obj = S.event(window);
if( Obj.tagName=='TD' && Obj.cellIndex==0 && Obj.textContent.length>6 ){
top.S.clipboardPut(Obj.textContent+' / '+S(Obj).css("backgroundColor"));
S.info('Colores memorizados<br>(lapiz / papel)');
}
}
</script>
</head>
<body onhelp='return false' oncontextmenu='return false'>
<table id=TablaColores _style='cursor:pointer' onclick=PonColor()>
<caption>Combinación de colores</caption>
<?PHP
for( $n=0; $n<5; $n++ ) echo '<col align=center style="cursor:pointer;font-family:monospace"><col style="cursor:default">';
if( !function_exists('sql_Query') ){
global $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOType, $_SqlInit, $_SqlPDOConnect;
$tmpFile = '../_datos/config/sql.ini';
eval( _LoadSqlIni( $tmpFile ) );
include( $Dir_.$_Sql.'.inc' );
}
qQuery("select * from {$_SESSION['ShareDictionary']}gs_color order by orden");
$Dim = array();
while( $r=qArray() ) $Dim[] = $r;
$paso = ceil(count($Dim)/5);
for( $i=0; $i<$paso; $i++ ){
echo '<tr>';
$salto = 0;
for( $n=0; $n<5; $n++ ){
$r = $Dim[$i+$salto];
echo '<td style="font-family:monospace;background:#'.$r['cd_gs_color'].'">'.$r['cd_gs_color'].'</td><td style="color:#'.$r['cd_gs_color'].'">'.$r['nm_gs_color'].'</td>';
$salto += $paso;
}
}
?>
</table>
<table border=0px cellspacing=1px cellpadding=5px id=ColoresAuto style='cursor:pointer' onclick=MemorizaColor()>
<col style='font-family:monospace'>
<caption>Mejor&nbsp;combinación</caption>
<tr><td style="font-family:monospace">&nbsp;<td>Por diferencia de color<td>&nbsp;<td>&nbsp;
<tr><td style="font-family:monospace">&nbsp;<td>Por contraste<td>&nbsp;<td>&nbsp;
</table>
</body>
<html>
