<?PHP
eHTML('$winmenu.gs');
?>
<style>
body {
margin:0px;
padding:0px;
}
TD {
FONT-FAMILY: helvetica;
WHITE-SPACE: nowrap;
FONT-size: 12px;
}
.SUBMENU {
BACKGROUND-COLOR: #cccccc;
BORDER-BOTTOM: #cccccc 0px outset;
BORDER-LEFT: #cccccc 0px outset;
BORDER-RIGHT: #cccccc 0px outset;
BORDER-TOP: #cccccc 0px outset;
}
.SUBMENU TR {
BACKGROUND-COLOR: #f7efff;
COLOR: #57007f;
FONT-FAMILY: helvetica;
FONT-SIZE: 11px;
FONT-WEIGHT: normal;
}
.SUBMENU TD {
CURSOR: pointer;
BORDER-RIGHT: #aaaaaa 1px solid;
}
.SUBMENU .ON {
BACKGROUND-COLOR: #cf0c00;
COLOR: #f7efff;
FONT-WEIGHT: normal;
}
</style>
<script type="text/javascript">
function eClearEvent(){
try{
if( event==null ) return false;
S.eventClear(window);
}catch(e){}
return false;
}
var Yo = window.frameElement.id.replace('I','V');
var _UltimoMenu = null;
var _Ordenar = false;
function uReordenar( nObj ){
var TD = document.body.children[0].rows[0].cells;
var oObj = TD[nObj];
var dObj = TD[_UltimoMenu], n, td, t;
var i = oObj.cellIndex;
S(oObj).nodeSwap(dObj);
_Ordenar = false;
top.eInfoHide();
for( n=0; n<TD.length; n++ ){
td = TD[n];
t = top._swDim[ td.pk ].rows[0].cells[0].textContent;
if( t=='' ){
td.innerHTML = '(<b>'+(n+1)+'</b>)';
}else{
td.innerHTML = top._swDim[ td.pk ].rows[0].cells[0].innerHTML.replace('>','>(<b>'+(n+1)+'</b>) ');
}
}
TD[i].className='ON';
_UltimoMenu = i;
return true;
}
function uOnWindow(){
var Obj = S.event(window);
if( Obj.tagName!='TD' ) Obj = Obj.parentNode;
if( top._swDim[Obj.pk]!=null ){
if( _Ordenar ) return uReordenar(Obj.cellIndex);
_UltimoMenu = Obj.cellIndex;
var nv = top._swDim[Obj.pk].id.substr(4);
top._eSWShow(nv);
for( var n=top.swVHIDDEN.rows.length-1; n>0; n-- ){
if( top.swVHIDDEN.rows[n].cells[0].NV==nv ) top.swVHIDDEN.deleteRow(n);
}
top._eSWShow(Yo.substr(4));
try{
for( var n=0; n<top._eSWMinimizeSrc.length; n++ ) top._eSWMinimizeSrc[n] = null;
}catch(e){}
top.DGI('eIVList').className = "OFF";
}else{
document.body.children[0].rows[0].deleteCell(Obj.cellIndex);
}
}
function uKeyWindow(){
var Op = '';
if( event.shiftKey && S.eventCode(event)==9 ){
Op = 'I';
}else{
switch( S.eventCode(event) ){
case 39:
case 13:
case 34:
case 9:
Op = 'D';
break;
case 37:
case 33:
Op = 'I';
break;
case 67:
if( _UltimoMenu!=null ){
_Ordenar = true;
var Titulo = 'Pulse la opción a intercambiar';
var p = top._eInfo( window, 2, Titulo );
p[2] -= 55;
S.info( Titulo, -1, p[1], p[2], p[3], p[4], p[5] );
}
break;
default:
var n = S.eventCode(event)-49;
var TD = document.body.children[0].rows[0].cells;
if( n>=0 && n<TD.length ){
if( _Ordenar ) return uReordenar(n);
S(TD[n]).eventClick();
for( var i=0; i<TD.length; i++ ) TD[i].className = '';
TD[n].className = 'ON';
_UltimoMenu = n;
}
}
}
switch( Op ){
case 'I':
_UltimoMenu--;
if( _UltimoMenu<0 ) _UltimoMenu = document.body.children[0].rows[0].cells.length-1;
break;
case 'D':
_UltimoMenu++;
if( _UltimoMenu>=document.body.children[0].rows[0].cells.length ) _UltimoMenu = 0;
break;
}
if( Op!='' ){
var TD = document.body.children[0].rows[0].cells;
S(TD[_UltimoMenu]).eventClick();
for( var i=0; i<TD.length; i++ ) TD[i].className = '';
TD[_UltimoMenu].className = 'ON';
eClearEvent();
}
}
function Ini(){
var z = top._swZIndex+5;
var nd = document.createElement('TABLE');
nd.className = 'SUBMENU';
nd.onselectstart = function anonymous(){return false};
nd.onclick = function anonymous(){ uOnWindow(); };
nd.border = 0;
nd.cellPadding = 3;
nd.cellSpacing = 1;
var tr = nd.insertRow(0), ts=1, t;
for( var n in top._swDim ){
try{
if( top._swDim[n]!=null ){
if( Yo==top._swDim[n].id ) continue;
var td = tr.insertCell();
td.onmouseover =  function anonymous(){ this.className='ON'; };
td.onmouseout =  function anonymous(){ this.className=''; };
td.style.whiteSpace = 'nowrap';
t = top._swDim[ top._swDim[n].id ].rows[0].cells[0].textContent;
if( t=='' ){
td.innerHTML = '(<b>'+ts+'</b>)';
}else{
td.innerHTML = '(<b>'+ts+'</b>) '+top._swDim[ top._swDim[n].id ].rows[0].cells[0].textContent;
}
td.pk = top._swDim[n].id;
ts++;
}
}catch(e){}
}
document.body.appendChild(nd);
top.eSWTools(window,'H',1);
top.eSWTools(window,'H',2);
top.eSWTools(window,'H',3);
top.eSWSetCaption( window, 'Menú de SubVentanas' );
top.eSWIResize( window, 5000,50 );
setTimeout('Recalcula()',100);
}
function Recalcula(){
var nd = document.body.children[0];
top.eSWIResize( window, nd.offsetWidth, nd.offsetHeight );
var y = top.document.body.clientHeight-nd.offsetHeight-top._ScreenTop;
top.eSWMove( window, 0, y );
}
function uAjusta(){
var TD = document.body.children[0].rows[0].cells;
var n, td, t;
for( n=0; n<TD.length; n++ ){
td = TD[n];
t = top._swDim[ td.pk ].rows[0].cells[0].textContent;
if( t=='' ){
td.innerHTML = '(<b>'+(n+1)+'</b>)';
}else{
td.innerHTML = top._swDim[ td.pk ].rows[0].cells[0].innerHTML.replace('>','>(<b>'+(n+1)+'</b>) ');
}
}
S(TD[0]).eventClick();
TD[0].className='ON';
}
</script>
<?PHP
$gsEdition = '';
?>
<body onload="<?=$gsEdition;?>Ini();top.eLoading(false,window);top.eSWView(window);uAjusta();" onkeydown="uKeyWindow()" onhelp="return false;" onselectstart="return false;" on_mousedown="return false;" on_DragStart="return false;" on_drop="return false;" on_BeginDrag="return false;" on_DragEnd="return false;">
</body>
</html>
<?PHP
eEnd();
?>
