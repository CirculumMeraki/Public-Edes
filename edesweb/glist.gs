<?PHP
if( isset($_POST['_TAREAS']) ){
$_File = '../_datos/doc/'.$_GET['F'].'.gls';
if( file_exists( $_File ) ) copy( $_File, $_File.'.'.date('w') );
$fp = fopen( $_File, 'w' );
fwrite( $fp, stripslashes( $_POST['_TAREAS'] ) );
fclose( $fp );
die('GRABADO');
$txt = $_POST['_TAREAS'];
$Ini = stripos( $txt, '<TBODY>' )+7;
$Fin = stripos( $txt, '</TBODY>' );
$txt = substr( $txt, $Ini, $Fin-$Ini );
$Dim = explode( '<TR>', $txt );
for( $n=2; $n<count($Dim); $n++ ){
$txt = substr(trim($Dim[$n]),7,-5-11);
list( $tipo, $txt ) = explode( '<DIV ', $txt );
$tipo = (substr(trim($tipo),0,-1)=='EDcs')?'C':'T';
$i = strpos( $txt, '>' );
$indice = substr( $txt, 0,$i );
$datos = substr( $txt, $i+1 );
$indice = str_replace( 'id=ED', '', $indice );
$indice = str_replace( 'contentEditable=true', '', $indice );
$indice = str_replace( 'NT=', '', $indice );
$indice = str_replace( ' ', '', $indice );
$indice = str_replace( '\\', '', $indice );
$indice = str_replace( '"', '', $indice );
echo '['.$tipo.'|'.$indice.'|'.$datos."]\n<br>";
}
}else{
$_File = '../_datos/doc/'.$_GET['F'].'.gls';
}
?>
<!DOCTYPE HTML>
<HTML>
<HEAD>
<TITLE> New Document </TITLE>
<META NAME="Generator" CONTENT="gsEdit">
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">
<style>
BODY,TD,TH,DIV {
font-family:"MS Sans Serif";
font-size:16px;
}
#CONTENEDOR {
background-color:#FFFFFF;
border:0px solid #ececec;
}
#CONTENEDOR #ED {
color:#000066;
border-left:0px solid red;
}
#CONTENEDOR #EDc {
color:#000066;
border-bottom:1px solid #ececec;
}
#CONTENEDOR #EDc DIV {
background-color:#fdf6db;
background-color:#fef8e4;
background-color:#fdf5d7;
padding-left:10px;
padding-right:10px;
color:#0000FF;
}
#CONTENEDOR #EDcs {
color:#000066;
border-bottom:1px solid #ececec;
padding-left:25px;
}
#CONTENEDOR #EDcs DIV {
background-color:#Fefaed;
padding-left:10px;
padding-right:10px;
color:#0000FF;
}
#CONTENEDOR TH {
background-color:#fbeebd;
color:#0000FF;
border-top:1px solid #f9e392;
border-bottom:2px solid #f9e392;
}
#CONTENEDOR TD {
background-color:#FFFFFF;
color:#000066;
}
</style>
<SCRIPT type="text/javascript">
function eClearEvent(men){
try{
if( event==null ) return false;
S.eventClear(window);
}catch(e){}
if( null!=men ) top.eAlert( S.lng(209), S.lng(216), 'A','W' );
return false;
}
function Grabar(){
DGI("_TAREAS").value = CONTENEDOR.outerHTML;
document.forms[0].submit();
}
</SCRIPT>
</HEAD>
<BODY onload='DGI("CONTENEDOR").rows[1].cells[0].children[0].focus()'>
<FORM METHOD=POST ACTION="edes.php?E:$glist.gs&F=<?=$_GET['F']?>" style="display:none">
<TEXTAREA NAME="_TAREAS" ROWS="" COLS=""></TEXTAREA>
</FORM>
<?PHP
if( $_File!='' && file_exists($_File) ){
readfile($_File);
}else{
?>
<TABLE id='CONTENEDOR' border=0 cellspacing=0 cellpadding=0 width=100% _onfocusin=FilaON() _onfocusout=FilaOFF()>
<TR>
<TH>TAREAS
</TR>
<TR>
<TD id=EDc><DIV id=ED contentEditable=true NT=-1></DIV></TD>
</TR>
</TABLE>
<?PHP
}
?>
<SCRIPT type="text/javascript">
function eXY( el ){
var xy = new Array(0,0);
while( el != null ){
xy[0] += el.offsetLeft - el.scrollLeft;
if( el.tagName=='FIELDSET' ) xy[0]++;
xy[1] += el.offsetTop - el.scrollTop;
el = el.offsetParent;
}
return xy;
}
function Put( txt ){
S.event(window).focus();
var obj = document.selection.createRange();
obj.pasteHTML(txt);
obj = document.selection.createRange();
obj.select();
}
function ControlTeclado(){
return true;
}
var _NTarea = -1;
var _Mover = 0;
function AceptaFicha(){
if( !top.eReadyState(window) ) return eClearEvent();
var Mas = '';
if( event.altKey ) Mas += 'a';
if( event.ctrlKey ) Mas += 'c';
if( event.shiftLeft ) Mas += 's';
switch( Mas+S.eventCode(event) ){
case '13':
var Obj = S.event(window);
if( Obj.tagName!='DIV' ) return true;
Put('<br>');
return false;
case '116':
Mas = 'c';
case '117':
if(Mas=='') Mas = 'cs';
case 'cs45':
case 'cs13':
case 'cs107':
case 'c45':
case 'c13':
case 'c107':
var Obj = S.event(window);
if( Obj.tagName!='DIV' ) return true;
Obj = Obj.parentNode.parentNode
if( Mas=='cs' && CONTENEDOR.rows[Obj.rowIndex].cells[0].V ) return eClearEvent();
var NewTR = Obj.rowIndex+1;
if( NewTR < CONTENEDOR.rows.length && Obj.cells[0].id=='EDc' && Mas=='c' ){
while( CONTENEDOR.rows[NewTR].cells[0].id=='EDcs' ) if( ++NewTR==CONTENEDOR.rows.length ) break;
}
var TR = CONTENEDOR.insertRow(NewTR);
var TD = TR.insertCell(0);
TD.id = 'ED'+Mas;
TD.innerHTML = '<div id=ED NT='+(--_NTarea)+' contentEditable=true></div>';
TD.children[0].focus();
return eClearEvent();
case '120':
case 'c46':
case 'c109':
var Obj = S.event(window);
if( Obj.tagName!='DIV' ) return true;
if( !confirm('Confirmar borrar') ) return false
Obj = Obj.parentNode.parentNode
var nTR = Obj.rowIndex;
if( CONTENEDOR.rows.length==2 ) return false;
if( CONTENEDOR.rows[nTR].cells[0].id == 'EDc' ){
CONTENEDOR.deleteRow(nTR);
while( CONTENEDOR.rows.length > nTR+1 ){
if( CONTENEDOR.rows[nTR].cells[0].id == 'EDcs' ){
CONTENEDOR.deleteRow(nTR);
}else break;
}
}else{
CONTENEDOR.deleteRow(nTR);
}
if( nTR+1>CONTENEDOR.rows.length ) nTR--;
setTimeout( 'DGI("CONTENEDOR").rows['+nTR+'].cells[0].children[0].focus()',1);
break;
case '9':
var Obj = S.event(window);
if( Obj.tagName!='DIV' ) return true;
Obj = Obj.parentNode.parentNode
if( Obj.rowIndex+1==CONTENEDOR.rows.length ){
CONTENEDOR.rows[1].cells[0].children[0].focus();
return false;
}
break;
case 's9':
var Obj = S.event(window);
if( Obj.tagName!='DIV' ) return true;
Obj = Obj.parentNode.parentNode
if( Obj.rowIndex==1 ){
CONTENEDOR.rows[CONTENEDOR.rows.length-1].cells[0].children[0].focus();
return false;
}
break;
case '40':
var Obj = S.event(window);
if( Obj.tagName!='DIV' ) return true;
var e = document.selection.createRange();
if( (e.offsetTop+e.boundingHeight+document.body.scrollTop) < (eXY(Obj)[1]+Obj.offsetHeight) ) return true;
Obj = Obj.parentNode.parentNode
if( Obj.rowIndex+1==CONTENEDOR.rows.length ){
e = 1;
document.body.scrollTop = 0;
}else{
e = Obj.rowIndex+1;
}
while( CONTENEDOR.rows[e].style.display == 'none' ) if( ++e==CONTENEDOR.rows.length ) break;
if( e==CONTENEDOR.rows.length ) e = 1;
CONTENEDOR.rows[e].cells[0].children[0].focus();
return false;
case '38':
var Obj = S.event(window);
if( Obj.tagName!='DIV' ) return true;
var e = document.selection.createRange();
if( e.offsetTop - eXY(Obj)[1] - e.boundingHeight + document.body.scrollTop > 0 ) return true;
Obj = Obj.parentNode.parentNode
if( Obj.rowIndex==1 ){
e = CONTENEDOR.rows.length-1;
document.body.scrollTop = document.body.scrollHeight;
}else{
e = Obj.rowIndex-1;
}
while( CONTENEDOR.rows[e].style.display == 'none' ) e--;
CONTENEDOR.rows[e].cells[0].children[0].focus();
return false;
case '33':
var Obj = S.event(window);
if( Obj.tagName!='DIV' ) return true;
var e = document.selection.createRange();
if( e.offsetTop - eXY(Obj)[1] - e.boundingHeight + document.body.scrollTop > 0 ) return true;
var Alto = document.body.clientHeight, sAlto = 20;
var nTR = Obj.parentNode.parentNode;
var nFila = nTR.rowIndex;
for( var n=nTR.rowIndex; n>0; n-- ){
sAlto += CONTENEDOR.rows[n].cells[0].offsetHeight;
if( CONTENEDOR.rows[n].cells[0].offsetHeight > 0 ) nFila = n;
if( sAlto > Alto ) break;
}
CONTENEDOR.rows[nFila].cells[0].children[0].focus();
if( nFila==1 ) document.body.scrollTop = 0;
break;
case '34':
var Obj = S.event(window);
if( Obj.tagName!='DIV' ) return true;
var e = document.selection.createRange();
if( (e.offsetTop+e.boundingHeight+document.body.scrollTop) < (eXY(Obj)[1]+Obj.offsetHeight) ) return true;
var Alto = document.body.clientHeight, sAlto = 20;
var nTR = Obj.parentNode.parentNode;
var nFila = nTR.rowIndex;
for( var n=nTR.rowIndex; n<CONTENEDOR.rows.length; n++ ){
sAlto += CONTENEDOR.rows[n].cells[0].offsetHeight;
if( CONTENEDOR.rows[n].cells[0].offsetHeight > 0 ) nFila = n;
if( sAlto > Alto ) break;
}
CONTENEDOR.rows[nFila].cells[0].children[0].focus();
if( (nFila+1)==CONTENEDOR.rows.length ) document.body.scrollTop = document.body.scrollHeight;
break;
case '119':
case 'c111':
var Obj = S.event(window);
if( Obj.tagName!='DIV' ) return true;
if( _Mover == 0 ){
Obj.style.backgroundColor = 'red';
_Mover = Obj.parentNode.parentNode.rowIndex;
}else{
if( CONTENEDOR.rows[_Mover].cells[0].id != Obj.parentNode.id ) return true;
if( _Mover == Obj.parentNode.parentNode.rowIndex ){
_Mover = 0;
Obj.style.backgroundColor = '';
alert('no');
}else{
var TRDestino = Obj.parentNode.parentNode.rowIndex;
CONTENEDOR.rows[_Mover].cells[0].children[0].style.backgroundColor = '';
var TMover = 1, p,n,tmp,TR;
if( CONTENEDOR.rows[_Mover].cells[0].id == 'EDc' ){
p = _Mover+1;
while( CONTENEDOR.rows.length > p ){
if( CONTENEDOR.rows[p].cells[0].id == 'EDcs' ){
TMover++;
p++;
}else break;
}
}
if( (TRDestino+1) < CONTENEDOR.rows.length && CONTENEDOR.rows[_Mover].cells[0].id == 'EDc' && TRDestino > _Mover ){
while( CONTENEDOR.rows[TRDestino+1].cells[0].id == 'EDcs' ) if( ++TRDestino==(CONTENEDOR.rows.length-1) ) break;
}
for( n=0; n<TMover; n++ ){
if( TRDestino < _Mover ){
tmp = CONTENEDOR.rows[_Mover+n];
TR = CONTENEDOR.insertRow(TRDestino+n);
}else{
tmp = CONTENEDOR.rows[_Mover];
TR = CONTENEDOR.insertRow(TRDestino+1);
}
TR.replaceNode(tmp);
}
while( CONTENEDOR.rows[TRDestino].style.display=='none' ) TRDestino--;
CONTENEDOR.rows[TRDestino].cells[0].children[0].focus();
_Mover = 0;
}
}
break;
case '118':
var Obj = S.event(window);
if( Obj.tagName!='DIV' ) return true;
Obj.parentNode.id = (Obj.parentNode.id=='EDc')?'EDcs':'EDc';
return false;
case '115':
var Obj = S.event(window);
if( Obj.tagName!='DIV' ) return true;
Obj = Obj.parentNode.parentNode
var nTR = Obj.rowIndex;
if( CONTENEDOR.rows[nTR].cells[0].id == 'EDc' ){
if( !CONTENEDOR.rows[nTR].cells[0].V || CONTENEDOR.rows[nTR].cells[0].V=='false' ){
var sTR = nTR, ConHijos = false;
nTR++;
while( CONTENEDOR.rows.length > nTR ){
if( CONTENEDOR.rows[nTR].cells[0].id == 'EDcs' ){
CONTENEDOR.rows[nTR].style.display = 'none';
ConHijos = true;
}else break;
nTR++;
}
if( ConHijos ) {
CONTENEDOR.rows[sTR].cells[0].V = true;
CONTENEDOR.rows[sTR].cells[0].style.borderLeft = '1px solid #996600';
}
}else{
CONTENEDOR.rows[nTR].cells[0].V = false;
CONTENEDOR.rows[nTR].cells[0].style.borderLeft = '';
nTR++;
while( CONTENEDOR.rows.length > nTR ){
if( CONTENEDOR.rows[nTR].cells[0].id == 'EDcs' ){
CONTENEDOR.rows[nTR].style.display = 'block';
}else break;
nTR++;
}
}
}
return eClearEvent();
case 121:
Grabar();
return eClearEvent();
}
return true;
}
function DobleClick(){
var Obj = S.event(window);
if( Obj.tagName!='DIV' ) return true;
Obj = Obj.parentNode.parentNode
var nTR = Obj.rowIndex;
if( CONTENEDOR.rows[nTR].cells[0].id != 'EDc' ) return true;
sChar = String.fromCharCode(115);
event.keyCode = sChar.charCodeAt(0);
AceptaFicha();
return eClearEvent();
}
document.onkeypress = ControlTeclado;
document.onkeydown = AceptaFicha;
document.ondblclick = DobleClick;
top.eLoading(0,window);
</SCRIPT>
<INPUT TYPE="button" NAME="" value="Grabar" onclick="Grabar()">
</BODY>
</HTML>
