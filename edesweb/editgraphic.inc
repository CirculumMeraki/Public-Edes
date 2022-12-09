<?PHP
if( $_GET['_SAVEUSER']==1 ){
$ok = false;
foreach( $_GET as $k=>$v ){
if( $ok ){
if( !function_exists('sql_Query') ){
global $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOType, $_SqlInit, $_SqlPDOConnect;
$tmpFile = '../_datos/config/sql.ini';
eval( _LoadSqlIni( $tmpFile ) );
include( $Dir_.$_Sql.'.inc' );
}
qQuery( "update gs_user set clipping='{$v}' where cd_gs_user=".$_SESSION['_User'] );
echo '<script type="text/javascript">top.eInfo(window.frameElement.WOPENER,"Grabado");</script>';
eEnd();
}
if( $k=='_SAVEUSER' ) $ok = true;
}
eEnd();
}
$IMG = $_GET['IMG'];
if( substr($ZONAS,-1)==',' ) $ZONAS = substr($ZONAS,0,-1);
list( $TZonas, $NomCampo, $CampoUser ) = explode(',',$ZONAS);
if( $CampoUser<>'' && !is_numeric($CampoUser[0]) ){
$ZONAS = str_replace(','.$CampoUser,'',$ZONAS);
}
eExplodeOne( $ZONAS, ',', $TZonas, $NomCampo );
if( $TZonas=='' ){
if( !is_numeric($NomCampo[0]) ){
$TZonas = 0;
}else{
$TZonas = (substr_count($NomCampo,',')+1)/4;
}
}
if( substr($IMG,1,1)==':' ){
}else{
$IMG = "edes.php?R:{$IMG}";
}
$tmp = explode('.',$IMG);
$Ext = $tmp[count($tmp)-1];
eHTML('$editgraphic.inc', '', 'Recortar Imágen');
?>
<?=_FileNoCache('edes.js')?>
<style>
BODY {
margin:0px;
cursor:default;
}
TD {
font-size: 12px;
FONT-FAMILY: ARIAL;
background: #FFFFFF;
}
TABLE #MENU {
border-top: 1px solid #000000;
background: #FFFFFF;
}
.Color1 {
background: #000000;
border: 1px solid #000000;
}
.Color2 {
background: #0000FF;
border: 1px solid #000000;
}
.Color3 {
background: #009900;
border: 1px solid #000000;
}
.Color4 {
border: 1px solid #000000;
background: #FF0000;
}
.Color5 {
border: 1px solid #000000;
background: #FFFFFF;
}
.sZONA {
border: 1px solid #000000;
}
.SUBMENU {
BORDER-BOTTOM: #cccccc 1px outset;
POSITION: absolute;
BORDER-LEFT: #cccccc 1px outset;
BACKGROUND-COLOR: #ffffff;
BORDER-TOP: #cccccc 1px outset;
BORDER-RIGHT: #cccccc 1px outset;
}
.SUBMENU TR {
BACKGROUND-COLOR: #f7efff;
FONT-FAMILY: helvetica;
COLOR: #57007f;
FONT-SIZE: 11px;
FONT-WEIGHT: normal;
}
.SUBMENU TD {
CURSOR: pointer;
}
.SUBMENU .ON {
BACKGROUND-COLOR: #cf0c00;
COLOR: red;
FONT-WEIGHT: normal;
}
.SUBMENU .Linea {
BACKGROUND-COLOR: #808080;
FONT-SIZE: 1px;
CURSOR: default;
}
.SUBMENU .TITULO {
BORDER-BOTTOM: #c8c3c0 1px outset;
TEXT-ALIGN: center;
BACKGROUND-COLOR: #57007f;
COLOR: #ffffff;
CURSOR: default;
}
</style>
<SCRIPT type="text/javascript">
var Dim = new Array();
</SCRIPT>
</HEAD>
<BODY onload=eInit()>
<TABLE border=0px cellspacing=0px cellpadding=0px width=100% height=100%>
<TR>
<TD width=100% height=100% align=center valign=middle ID=ZONAMOVE>
<img id=IMAGEN src='<?=$IMG?>'>
</TD>
</TR>
<TR>
<TD>
<TABLE ID=MENU border=0 style='cursor:pointer' width=100% cellspacing=1px cellpadding=0>
<TR>
<TD style='cursor:default'>&nbsp;Recorte:&nbsp;</TD>
<?PHP
if( !is_numeric($NomCampo[0]) ){
?>
<script type="text/javascript">
Dim = _WOPENER.document.all.<?=$NomCampo?>.value.split(',');
var i=0;
if( _WOPENER.document.all.<?=$NomCampo?>.value=='' ) Dim = new Array();
var TDimConfig = Dim.length;
for( var n=0; n<Dim.length; n+=4 ){
if( Dim[n+0]!='' ){
if( Dim[n]==-1 ){
document.write( "<TD id=ZONA"+i+" class=sZONA onclick='VerZona("+i+")' oncontextmenu=DelRecorte("+i+")>&nbsp;"+(i+1)+"&nbsp;</TD>" );
}else{
document.write( "<TD id=ZONA"+i+" class=sZONA onclick='VerZona("+i+")' oncontextmenu=DelRecorte("+i+") style='border:1px solid red'>&nbsp;"+(i+1)+"&nbsp;</TD>" );
}
i++;
}
}
</script>
<?PHP
if( $CampoUser!='' && !is_numeric($CampoUser[0]) ){
?>
<script type="text/javascript">
if( _WOPENER.document.all.<?=$CampoUser?>.value!='' ) document.write('<td id=Divisor style="width:200px">·');
var Dim2 = _WOPENER.document.all.<?=$CampoUser?>.value.split(',');
for( var n=0; n<Dim2.length; n+=4 ){
if( Dim2[n+0]!='' ){
if( Dim2[n]==-1 ){
document.write( "<TD id=ZONA"+i+" class=sZONA onclick='VerZona("+i+")' oncontextmenu=DelRecorte("+i+")>&nbsp;"+(i+1)+"&nbsp;</TD>" );
}else{
document.write( "<TD id=ZONA"+i+" class=sZONA onclick='VerZona("+i+")' oncontextmenu=DelRecorte("+i+") style='border:1px solid red'>&nbsp;"+(i+1)+"&nbsp;</TD>" );
}
i++;
}
}
for( var n=0; n<Dim2.length; n++ ) Dim[Dim.length] = Dim2[n];
</script>
<?PHP
}
echo "<TD id='idMenu'><img src='g/t_op_menu.gif' onclick='uMenu(this)' title='Menú'></TD>";
}else{
for( $n=0; $n<$TZonas; $n++ ) echo "<TD id=ZONA{$n} class=sZONA onclick='VerZona(".($n).")'>&nbsp;".($n+1)."&nbsp;</TD>";
echo 'var TDimConfig = '.($TZonas*4).';';
}
?>
<TD><DIV style='width:20'></DIV></TD>
<?PHP
if( $ADDCODE!='' ) include( eScript($ADDCODE.'.php') );
?>
<TD style='cursor:default'>&nbsp;Color:&nbsp;</TD>
<TD onclick='Color()' class=Color1>&nbsp;&nbsp;&nbsp;</TD>
<TD onclick='Color()' class=Color2>&nbsp;&nbsp;&nbsp;</TD>
<TD onclick='Color()' class=Color3>&nbsp;&nbsp;&nbsp;</TD>
<TD onclick='Color()' class=Color4>&nbsp;&nbsp;&nbsp;</TD>
<TD onclick='Color()' class=Color5>&nbsp;&nbsp;&nbsp;</TD>
<TD><DIV style='width:20'></DIV></TD>
<TD style='cursor:default'>&nbsp;Coordenada:&nbsp;</TD>
<TD align=center class=sZONA><DIV id=TXT style='width:70'></DIV></TD>
<TD><DIV style='width:20'></DIV></TD>
<TD style='cursor:default'>&nbsp;Dimensiones:&nbsp;</TD>
<TD align=center class=sZONA><SPAN id=xDimensiones style='margin:0px 7px 0px 7px'></SPAN></TD>
<TD width=100% ID=INFO>&nbsp;</TD>
<TD><img onclick='Grabar()' src='edes.php?R:$a/g/an_grabar.gif' title='Aceptar datos'></TD>
</TR>
</TABLE>
</TD>
</TR>
</TABLE>
<div id=ZONA nZONA=0 class="Color1 OFF" onselectstart='return false' onclick=eCapture2() on_mousedown=eCapture() on_mousemove=eMove() on_mouseup=eStop() on_mouseout=eStop()
style='cursor:crosshair;width:200px;height:100px;border:0px;position:absolute;top:0px;left:0px;display:none'>
</div>
<SCRIPT type="text/javascript">
var Obj;
var IMAGEN;
var _swOnDrag = false, _swX, _swY, _swC;
var _ObjX, _ObjY, _ObjW, _ObjH;
var _Factor = 1;
function eInit(){
Obj = DGI('ZONA');
IMAGEN = DGI('IMAGEN');
_swC = Obj;
_ObjX = parseInt(IMAGEN.offsetLeft);
_ObjY = parseInt(IMAGEN.offsetTop);
_ObjW = parseInt(IMAGEN.offsetWidth);
_ObjH = parseInt(IMAGEN.offsetHeight);
S('#xDimensiones').html((IMAGEN.offsetWidth+'')+'&nbsp;x&nbsp;'+(IMAGEN.offsetHeight+''));
for( var n=0; n<_Zonas.length; n++ ){
if( _Zonas[n][2] > IMAGEN.offsetWidth || _Zonas[n][3] > IMAGEN.offsetHeight ){
DGI('ZONA'+n).disabled = true;
DGI('ZONA'+n).title +=  "\nRecorte mas grande que la imagen";
}
}
}
function eMove(){
if( !_swOnDrag ) return;
var x = _swX + event.clientX + document.body.scrollLeft;
var y = _swY + event.clientY + document.body.scrollTop;
if( x < 0 ) x = 0;
if( y < 0 ) y = 0;
if( x + _swC.clientWidth + 0 >= document.body.clientWidth + document.body.scrollLeft ){
x = document.body.clientWidth - _swC.clientWidth - 0 + document.body.scrollLeft;
}
if( y + _swC.clientHeight + 0 >= document.all.ZONAMOVE.clientHeight + document.body.scrollTop ){
y = document.all.ZONAMOVE.clientHeight - _swC.clientHeight - 0 + document.body.scrollTop;
if( y < 0 ) y = 0;
}
if( x < _ObjX ) x = _ObjX;
if( y < _ObjY ) y = _ObjY;
x = parseInt(x);
y = parseInt(y);
_Zonas[Obj.nZONA][2] = parseInt(_Zonas[Obj.nZONA][2]);
_Zonas[Obj.nZONA][3] = parseInt(_Zonas[Obj.nZONA][3]);
if( x + _Zonas[Obj.nZONA][2] > _ObjX + _ObjW ) x = _ObjX+_ObjW-_Zonas[Obj.nZONA][2];
if( y + _Zonas[Obj.nZONA][3] > _ObjY + _ObjH ) y = _ObjY+_ObjH-_Zonas[Obj.nZONA][3];
_swC.style.posLeft = px(x);
_swC.style.posTop = px(y);
_Zonas[Obj.nZONA][0] = x-_ObjX;
_Zonas[Obj.nZONA][1] = y-_ObjY;
document.all.TXT.textContent = (x-_ObjX)+','+(y-_ObjY);
}
function eStop(){
Obj.onmousemove = null;
document.all.IMAGEN.onmousemove = null;
document.all.ZONAMOVE.onmousemove = null;
}
function eCapture(){
_swX = parseInt(Obj.style.posLeft)-event.clientX-document.body.scrollLeft;
_swY = parseInt(Obj.style.posTop )-event.clientY-document.body.scrollTop;
Obj.onmousemove = eMove;
document.all.IMAGEN.onmousemove = eMove;
document.all.ZONAMOVE.onmousemove = eMove;
Obj.onmouseup = eStop;
}
document.body.onkeydown = TecladoOn;
function eCapture2(){
_swOnDrag = !_swOnDrag;
if( _swOnDrag ){
eCapture();
}else{
eStop();
}
}
function TecladoOn(){
if( _swC.offsetWidth==0 && S.eventCode(event)!=121 ) return;
var Sumar = ((event.ctrlKey)? 15: 1);
switch( S.eventCode(event) ){
case 38:
var y = _swC.style.posTop - Sumar;
if( y > _ObjY ){
_swC.style.posTop = px(y);
_Zonas[Obj.nZONA][1] = parseInt(_Zonas[Obj.nZONA][1]) - Sumar;
}
document.all.TXT.textContent = _Zonas[Obj.nZONA][0]+','+_Zonas[Obj.nZONA][1];
break;
case 40:
var y = _swC.style.posTop + Sumar;
if( y + parseInt(_Zonas[Obj.nZONA][3]) <= _ObjY + _ObjH ){
_swC.style.posTop = px(y);
_Zonas[Obj.nZONA][1] = parseInt(_Zonas[Obj.nZONA][1]) + Sumar;
}
document.all.TXT.textContent = _Zonas[Obj.nZONA][0]+','+_Zonas[Obj.nZONA][1];
break;
case 37:
var x = _swC.style.posLeft - Sumar;
if( x > _ObjX ){
_swC.style.posLeft = px(x);
_Zonas[Obj.nZONA][0] = parseInt(_Zonas[Obj.nZONA][0]) - Sumar;
}
document.all.TXT.textContent = _Zonas[Obj.nZONA][0]+','+_Zonas[Obj.nZONA][1];
break;
case 39:
var x = _swC.style.posLeft + Sumar;
if( x + parseInt(_Zonas[Obj.nZONA][2]) <= _ObjX + _ObjW ){
_swC.style.posLeft = px(x);
_Zonas[Obj.nZONA][0] = parseInt(_Zonas[Obj.nZONA][0]) + Sumar;
}
document.all.TXT.textContent = _Zonas[Obj.nZONA][0]+','+_Zonas[Obj.nZONA][1];
break;
case 13:
eStop();
break;
case 67:
var c = parseInt(S("#ZONA").obj.className.replace('Color',''));
S("#ZONA").obj.className = 'Color'+(( c<5 )?(c+1):1);
break;
case 121:
Grabar();
break;
}
}
var _Zonas = new Array(), i=0;
<?PHP
if( !is_numeric($NomCampo[0]) ){
echo "if( typeof(Dim)=='undefined' ) var Dim = _WOPENER.document.all.{$NomCampo}.value.split(',');";
}else{
echo "var Dim = '{$NomCampo}'.split(',');";
}
?>
for( var n=0; n<Dim.length; n+=4 ){
if( Dim[n+0]!='' ){
_Zonas[i] = Array( Dim[n+0], Dim[n+1], Dim[n+2], Dim[n+3] );
DGI('ZONA'+i).title = 'Tamaño: '+Dim[n+2]+' x '+Dim[n+3];
i++;
}
}
var _ZonaActiva = null;
function VerZona( n ){
eStop();
_swOnDrag = false;
_ZonaActiva = S.event(window);
if( n==undefined ) n = S.event(window).id.replace("ZONA","");
_ZonaActiva.style.border = '1px solid red';
if( _Zonas[n][0]==-1 ) _Zonas[n][0] = 0;
if( _Zonas[n][1]==-1 ) _Zonas[n][1] = 0;
with( Obj.style ){
posLeft = px(parseInt(_Zonas[n][0])+_ObjX);
posTop = px(parseInt(_Zonas[n][1])+_ObjY);
width  = px(_Zonas[n][2]);
height = px(_Zonas[n][3]);
display = 'block';
}
document.all.TXT.textContent = _Zonas[n][0]+','+_Zonas[n][1];
Obj.nZONA = n;
_ZonaActiva.nZONA = n
}
function Color(){
Obj.style.backgroundColor = S(S.event(window)).css("backgroundColor");
}
function Zoom(){
if( _Factor != 1 ){
_Factor = 1;
}else{
var Obj2 = DGI('ZONAMOVE');
if( Obj2.offsetHeight/IMAGEN.offsetHeight > Obj2.offsetWidth/IMAGEN.offsetWidth ){
_Factor = Obj2.offsetHeight/IMAGEN.offsetHeight;
}else{
_Factor = Obj2.offsetWidth/IMAGEN.offsetWidth;
}
}
IMAGEN.style.zoom = _Factor;
Obj.style.zoom = _Factor;
}
function Grabar(){
var xConfig = xUser = '',f,c;
for( f=0; f<TDimConfig/4; f++ ) for( c=0; c<4; c++ ) xConfig += _Zonas[f][c]+',';
if( xConfig!='' ) xConfig = xConfig.substring(0,xConfig.length-1);
for( f=TDimConfig/4; f<_Zonas.length; f++ ) for( c=0; c<4; c++ ) xUser += _Zonas[f][c]+',';
if( xUser!='' ) xUser = xUser.substring(0,xUser.length-1);
<?PHP
if( !is_numeric($NomCampo[0]) ) echo "_WOPENER.document.all.{$NomCampo}.value = xConfig;";
if( !is_numeric($CampoUser[0])) echo "_WOPENER.document.all.{$CampoUser}.value = xUser;";
?>
top.eSWClose(window);
}
function uDimension( Op, DimValores, DatosAdicionales, DimObj ){
if( Op==null || Op!=2 ) return;
var i = TDimConfig/4, txt='';
for( var n=0; n<DimValores.length; n+=2 ){
if( DimValores[n]!='' && DimValores[n+1]!='' ){
if( DGI('Divisor')==null ){
with( MENU.rows[0].insertCell(i+1) ){
textContent = "·";
id = 'Divisor';
style.width = 200;
}
}
if( typeof(_Zonas[i])=='undefined' ){
_Zonas[i] = new Array(0,0,0,0);
with( MENU.rows[0].insertCell(i+2) ){
textContent = " "+(i+1)+"  ";
id = "ZONA"+i;
className = 'sZONA';
onclick = function anonymous(){ VerZona(); }
oncontextmenu = function anonymous(){ DelRecorte(); }
}
}
_Zonas[i] = new Array( -1, -1, DimValores[n], DimValores[n+1] );
with( S("#ZONA"+i).obj ){
style.display = 'block';
title = 'Tamaño: '+DimValores[n]+' x '+DimValores[n+1];
disabled = false;
}
if( _Zonas[i][2] > IMAGEN.offsetWidth || _Zonas[i][3] > IMAGEN.offsetHeight ){
with( S("#ZONA"+i).obj ){
style.borderColor = '';
disabled = true;
title +=  "\nRecorte mas grande que la imagen";
}
}else if( _Zonas[i][2] <= 20 || _Zonas[i][3] <= 20 ){
with( S("#ZONA"+i).obj ){
style.borderColor = '';
disabled = true;
title +=  "\nRecorte demasiado pequeño";
}
}
if( txt!='' ) txt += ',';
txt += DimValores[n]+','+DimValores[n+1];
}else{
_Zonas[i] = new Array('','','','');
if( DGI("ZONA"+i)==null ){
with( MENU.rows[0].insertCell(i+2) ){
textContent = " "+(i+1)+"  ";
id = "ZONA"+i;
className = 'sZONA';
onclick = function anonymous(){ VerZona(); }
oncontextmenu = function anonymous(){ DelRecorte(); }
}
}
S("#ZONA"+i).obj.style.display = 'none';
}
i++;
}
top.eCallSrv( window, 'edes.php?E:$editgraphic.inc&_SAVEUSER=1&<?=$CampoUser?>="'+txt+'"' );
}
function DelRecorte( n ){
if( n==undefined ) n = S.event(window).id.replace("ZONA","");
_Zonas[n][0] = _Zonas[n][1] = -1;
S.event(window).style.borderColor = '';
if( S("#ZONA").obj.nZONA==n ) S("#ZONA").obj.style.display = 'none';
return top.eClearEvent(undefined,window);
}
function _uMenu( Op, OpTextContent, Obj, OpObj ){
if( Op==null ) return;
switch( Op ){
case "d":
if( _ZonaActiva==null ){
top.eInfo(window,'NO ha seleccionado ningún recorte');
return;
}
_Zonas[_ZonaActiva.nZONA][0] = _Zonas[_ZonaActiva.nZONA][1] = -1;
_ZonaActiva.style.borderColor = '';
S("#ZONA").obj.style.display = 'none';
break;
case "a":
top.eAlert( "DIMENSIONES", "", "accept,cancel", null, iDimension, Array(
Array('Ancho', 4, '^[0-9]*$' ),
Array('Alto' , 4, '^[0-9]*$' )
) );
break;
case "u":
var Dim = _WOPENER.document.all.<?=$CampoUser?>.value.split(',');
if( Dim.length<TDimConfig ) for( var n=Dim.length; n<TDimConfig; n++ ) Dim[Dim.length] = '';
var i = 0;
for( var n=TDimConfig/4; n<_Zonas.length; n++ ){
Dim[i+2] = _Zonas[n][2];
Dim[i+3] = _Zonas[n][3];
i+=4;
}
top.eAlert( "DIMENSIONES", "", "accept,cancel", null, uDimension, Array(
Array('Ancho', 4, '^[0-9]*$', '', Dim[2] ),
Array('Alto' , 4, '^[0-9]*$', '', Dim[3] ),
Array('-'),
Array('Ancho', 4, '^[0-9]*$', '', Dim[6] ),
Array('Alto' , 4, '^[0-9]*$', '', Dim[7] ),
Array('-'),
Array('Ancho', 4, '^[0-9]*$', '', Dim[10] ),
Array('Alto' , 4, '^[0-9]*$', '', Dim[11] )
) );
break;
}
}
function uMenu(Obj){
top.eMenu( window, Obj, {
'-':'MENU',
'd':'Eliminar Recorte Actual',
'u':'Recortes del Usuario'
}, _uMenu );
}
</SCRIPT>
</BODY></HTML>
