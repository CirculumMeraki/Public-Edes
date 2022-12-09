function _LastCounts(sg){
if( typeof(DimCount)!='undefined' ) CrearResultados(sg);
return eClearEvent();
}
function uVerFiltro2(nTR){
S("#DimRecuentos TR").each(function(k,o){
if( k>0 ){
o.className = "";
if( nTR+1==k ) o.className = "LINEA";
}
});
try{
var dim = sessionStorage.getItem(DimCountPK[nTR]).split("|"), n;
for(n=0; n<dim.length; n+=2){
if( dim[n][0]=="#" ){
S(dim[n]).HTML(dim[n+1]);
}else{
S(":"+dim[n]).val(dim[n+1], false);
}
}
}catch(e){}
S.info();
eDisableButton(0);
OpExe.oncontextmenu = function anonymous(){ _LastCounts(); }
}
function uVerFiltro(){
var Obj = S.event(window);
if( Obj.tagName!='TD' || Obj.parentNode.rowIndex==0 ) return;
top.eInfo(window, S.lng(224),-1);
eDisableButton(1);
setTimeout('uVerFiltro2('+(Obj.parentNode.rowIndex-1)+')',250);
}
function CrearResultados(sg){
if( DGI('DimRecuentos')!=null ) S(DGI('DimRecuentos')).nodeRemove();
var nd = document.createElement('TABLE'),
s = S.screen(window);
nd.id = 'DimRecuentos';
nd.className = 'SUBMENU';
nd.onselectstart = function anonymous(){return false};
nd.onclick = function anonymous(){ uVerFiltro(); };
with( nd.style ){
position = 'absolute';
left = "0px";
top = s.y+"px";
}
nd.border = "0px";
nd.cellPadding = "3px";
nd.cellSpacing = "1px";
var tr,td,n;
tr = nd.insertRow();
td = document.createElement("TH");
tr.appendChild(td);
td.textContent = 'RECUENTOS';
td.className = 'TITULO';
for(n=0; n<DimCount.length; n++){
tr = nd.insertRow();
td = tr.insertCell();
td.onmouseover = function anonymous(){ this.className='ON'; };
td.onmouseout = function anonymous(){ this.className=''; };
td.style.whiteSpace = 'nowrap';
td.style.textAlign = 'right';
td.onDragEnd = function anonymous(){ return false; };
td.innerHTML = DimCount[n];
td.title = S.dataFormat(sg, "+,")+" sg";
}
document.body.appendChild(nd);
nd.style.left = px(s.x+s.ow-nd.offsetWidth);
}
function _AddCountLast(sg){
var nd = DGI('DimRecuentos'),
tr = nd.insertRow(),
td = tr.insertCell(),
s = S.screen(window);
td.onmouseover = function anonymous(){ this.className='ON'; };
td.onmouseout = function anonymous(){ this.className=''; };
td.style.whiteSpace = 'nowrap';
td.style.textAlign = 'right';
td.onDragEnd = function anonymous(){ return false; };
td.innerHTML = DimCount[DimCount.length-1];
td.title = S.dataFormat(sg, "+,")+" sg";
with( nd.style ){
left = px(s.x+s.ow-nd.offsetWidth);
top = px(s.y);
}
}
