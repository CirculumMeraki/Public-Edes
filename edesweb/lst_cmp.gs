<?PHP
eHTML('$lst_cmp.gs');
eLink('list');
?>
<LINK REL='stylesheet' HREF='<?=$_SESSION['_PathCSS']?>/list_print.css' TYPE='text/css' MEDIA='print'>
<LINK REL="stylesheet" HREF="edes.php?R:$t/css/00.css" TYPE="text/css">
<SCRIPT type="text/javascript" name=eDes>
var _PAGTITLE = "";var _PAGFOOT = "&b&bPág. &p/&P";
var _PAGROTATE = false;var _PAG = [0.3,0.2,0.2,0.4];
var _USERFUNCTION = "";
var _SUBLISTADO_ = false;
var _Source=_DESDE_=_FCH_="...";
var _Obj='L', _Mode='l', _SubMode='l', _NmGDF='';
var _PSOURCE='WWORK';var _STOP=false;
var _FORMBUTTONS='';var _pOBJ_ = _WOPENER = window.frameElement.WOPENER;var _pFCH_ = _WOPENER._Source;var _eID = new Date().getTime();var _pID = _WOPENER._eID;var _Mover = false;
var _MaxVisibleRows=0, _VisibleRows=0;
if( window.name=='IWORK' && (top._Desktop<2 || '0'=='2') ) top.eAutoMenu(0);
<?PHP
list(,$iEDes) = explode('.',$_IniSg);
echo "var _ymd=_D2S=_Hoy='".date('Ymd')."',_Time='".date('H:i:s')."',_iEDes={$iEDes},_Connection_={$_SESSION['_Connection_']},_User={$_User},_Node={$_Node};".$__Enter;
?>
var _GREENBAR = 1, _GetCampo = '#', _NOTITLE = 0, _ConImpresora = true, _SelectON = false, _AutoSize = new Array(0,0,'',''), _CmpAEditar = '', _FuncChkEd = '', _FuncIniEd = '', _ScriptEd = '|||', _DBExt = '', _EditMode = 0, _CHARTGRID=false;
var _Remote = false, _ShowZero = 1, _SortList = -1, _RD = true;
</SCRIPT>
<SCRIPT type="text/javascript" name=eDes>
var _Aux = '';
var _Destino = '';
var _NOSORT = true;
var _CambiaURL_ = false;
var _Filtrado = "";
var _Sel ="", _SelFunc="", _NoEvent=0;
var DimObj = new Array();
function Rellena(DimObj,Obj){
}
var _dEnVentana = new Array('','','');
var _sJS = false;
var _TH_td = new Array();var _ChartCol = false;
var _PagIncremental = false;
</SCRIPT>
<SCRIPT type="text/javascript" SRC='edes.php?R:$lista.js&j=6'></SCRIPT>
<script type="text/javascript">
function _RDCursorOver(){}
function _RDCursorOut(){}
function _RDDown(){}
function ColDeComparacion(){
var TD = S.event(window);
if( TD.tagName!='TH' || TD.colSpan!=2 ) return top.eClearEvent(null,window);
if( TD.Desdoblada!=undefined ) return top.eClearEvent(null,window);
if( '/+/+,/-/-,/'.indexOf('/'+TD.td+'/')==-1 ) return top.eClearEvent(null,window);
top.eInfo(window,'Calculando...');
var TDDif = TD.cellIndex+1;
TD.Desdoblada = 1;
var oColGroup = document.all.BROWSE.getElementsByTagName('COLGROUP')[0].all;
TD.nd = parseInt(TD.nd);
var nf = TD.parentNode.rowIndex, f,c, nc=0, i, sTH, oTD, Valor, t=0;
var TRs = BROWSE.rows;
var TDs = TRs[nf].cells;
for( c=0; c<TD.cellIndex; c++ ) nc += TDs[c].colSpan;
var xy = eXY(S.event(window)), dxy;
var Celda = document.all.BROWSE.rows[parseInt(S("#BROWSE.AltoTH"))+1].cells;
for( c=0; c<Celda.length; c++ ){
dxy = eXY(Celda[c]);
if( xy[0]==dxy[0] ){
nc = c;
break;
}
}
for( f=0; f<TRs.length; f++ ){
if( TRs[f].cells[0].tagName=='TH' ){
i=0;
for( c=0; c<TRs[f].cells.length; c++ ){
if( i+TRs[f].cells[c].colSpan > nc ){
if( TRs[f].cells[c].colSpan > 2 ){
TRs[f].cells[c].colSpan = parseInt(TRs[f].cells[c].colSpan)+1;
TRs[f].cells[c].Desdoblada = 1;
}else{
oTD = TRs[f].insertCell(TDDif);
sTH = document.createElement('TH');
sTH.textContent = 'DIF';
sTH.style.color = 'red';
sTH.rowSpan = TRs[f].cells[c].rowSpan;
S(sTH).nodeSwap(oTD);
if( f==0 && TRs[f].cells[c].rowSpan > 1 ) f = 1;
}
break;
}
i += TRs[f].cells[c].colSpan;
}
}else{
Valor = eClearThousands(TRs[f].cells[nc+1].textContent)-eClearThousands(TRs[f].cells[nc].textContent);
oTD = TRs[f].insertCell(nc+2);
oTD.textContent = eShowThousands(Valor,TD.nd);
if( Valor < 0 ) oTD.style.color = 'red';
else if( Valor == 0 ) oTD.style.color = 'green';
t += Valor
}
}
var Col = document.createElement('COL');
document.all.BROWSE.getElementsByTagName('COLGROUP')[0].appendChild( Col );
var oColGroup = document.all.BROWSE.getElementsByTagName('COLGROUP')[0].all;
for( c=oColGroup.length-1; c>nc+2; c-- ) S(oColGroup[c]).nodeSwap(oColGroup[c-1]);
var oCol = S(oColGroup[nc+1]).nodeCopy();
S(oColGroup[nc+2]).nodeSwap(oCol);
Recalcula();
top.eSWIResize( window, document.body.scrollWidth, document.body.scrollHeight );
top.eInfoHide();
return top.eClearEvent(null,window);
}
function ComparaTablas( o, d, _ToolsCMP ){
if( o.eCols!=d.eCols ){
top.eInfoError(top,'El nº de columnas no coincide');
setTimeout('top.eSWClose(window)',100);
return;
}
var oTF = o.rows.length;
var dTF = d.rows.length;
var TB = document.all.BROWSE, TR, oTD, dTD, f, c, fd, ok, i;
TB.AltoTH = o.AltoTH;
TB.border = o.border;
TB.cellSpacing = o.cellSpacing;
TB.cellPadding = o.cellPadding;
TB.onclick = function anonymous(){ ColDeComparacion(); }
TB.oncontextmenu = function anonymous(){ return top.eClearEvent(null,window); }
var ColGroup = document.createElement('COLGROUP');
TB.appendChild( ColGroup );
_ToolsCMP--;
for( c=0; c<o.children[0].all.length; c++ ){
var Col = document.createElement('COL');
var oCol = S(o.children[0].children[c]).nodeCopy();
S(oCol).nodeSwap(Col);
ColGroup.appendChild( oCol );
if( c > _ToolsCMP ){
var Col = document.createElement('COL');
var dCol = S(o.children[0].children[c]).nodeCopy();
S(dCol).nodeSwap(Col);
ColGroup.appendChild( dCol );
}
}
var SumColSpan = new Array();
for( c=0; c<o.children[0].all.length; c++ ) SumColSpan[c] = new Array(c,c);
if( o.AltoTH > 0 ){
var nc = 0;
for( c=0; c<o.rows[0].cells.length; c++ ){
if( o.rows[0].cells[c].rowSpan > 1 ){
for( s=0; s<o.rows[1].cells.length; s++ ){
SumColSpan[s][1]++;
}
}else break;
nc += parseInt(o.rows[0].cells[c].colSpan);
}
}
var ncs,a;
for( f=0; f<oTF; f++ ){
if( o.rows[f].cells[0].tagName!='TH' ) break;
fd = f+1;
TR = TB.insertRow(f);
ncs=0;
for( c=0; c<o.rows[f].cells.length; c++ ){
TD = document.createElement('TH');
TR.appendChild(TD);
a = parseInt(o.rows[f].cells[c].colSpan);
if( f==0 ){
if( ncs > _ToolsCMP ){
TD.colSpan = a * 2;
}else{
TD.colSpan = a;
}
}else{
if( SumColSpan[c][f] > _ToolsCMP ){
TD.colSpan = a * 2;
}else{
TD.colSpan = a;
}
}
ncs += a;
TD.rowSpan = o.rows[f].cells[c].rowSpan;
TD.td = o.rows[f].cells[c].td;
TD.nd = o.rows[f].cells[c].nd;
TD.NC = o.rows[f].cells[c].NC;
TD.te = o.rows[f].cells[c].te;
TD.DCM = o.rows[f].cells[c].DCM;
TD.innerHTML = o.rows[f].cells[c].innerHTML;
TD.style.textAlign = 'center';
}
}
var EsPieLista,Color=null,Fila,df,nok;
for( f=fd; f<oTF; f++ ){
TR = TB.insertRow(f);
if( f+1==oTF ) TR.className = o.rows[f].className;
ok = false;
Fila = f;
EsPieLista = (o.rows[f].className=='PieLista');
if( !EsPieLista ){
for( df=fd; df<dTF; df++ ){
nok = _ToolsCMP+1;
for( i=0; i<=_ToolsCMP; i++ ){
if( o.rows[f].cells[i].innerHTML==d.rows[df].cells[i].innerHTML ) nok--;
}
if( nok==0 ){
ok = true;
Fila = df;
d.rows[df].Cmp = 1;
break;
}
}
}else{
ok = true;
Fila = d.rows.length-1;
}
for( c=0; c<o.rows[f].cells.length; c++ ){
oTD = TR.insertCell();
oTD.innerHTML = o.rows[f].cells[c].innerHTML;
if( Color==null ){
if( o.rows[f].cells[c].offsetWidth > 0 ) Color = top.eColorTone( S(o.rows[f].cells[c]).css("backgroundColor"), 3 );
}
if( c > _ToolsCMP ){
dTD = TR.insertCell();
if( ok ){
dTD.innerHTML = d.rows[Fila].cells[c].innerHTML;
}else{
dTD.textContent = ' ';
}
if( !EsPieLista ) dTD.style.backgroundColor = Color;
}
}
}
for( f=fd; f<dTF; f++ ){
EsPieLista = (d.rows[f].className=='PieLista');
if( EsPieLista ) break;
if( d.rows[f].Cmp==undefined ){
TR = TB.insertRow(TB.rows.length-1);
for( c=0; c<d.rows[f].cells.length; c++ ){
if( c > _ToolsCMP ){
oTD = TR.insertCell();
oTD.textContent = ' ';
dTD = TR.insertCell();
dTD.innerHTML = d.rows[f].cells[c].innerHTML;
dTD.style.backgroundColor = Color;
}else{
oTD = TR.insertCell();
oTD.innerHTML = d.rows[f].cells[c].innerHTML;
}
}
}
}
top.eInfoHide();
}
function SePulso(){
var x,y;
PROCESANDO.style.display = 'block';
if( event==null || ( event.type!='click' && event.type!='contextmenu' ) ){
x = px((PROCESANDO.offsetWidth/2) + (document.body.clientWidth/2));
y = px((PROCESANDO.offsetHeight/2) + (document.body.clientHeight/2));
}else{
x = px(event.clientX - (PROCESANDO.offsetWidth/2));
y = px(event.clientY - (PROCESANDO.offsetHeight/2));
}
with( PROCESANDO.style ){
left = px(x + document.body.scrollLeft);
top = px(y + document.body.scrollTop);
}
}
function eHideBusy(){
PROCESANDO.style.display = 'none';
}
</script>
</HEAD>
<BODY style='text-align:center;margin:0px;padding:0px;' onresize='MovTitulos();' onhelp='top.gsHelpErr(window);return false;' onbeforeunload='Cerrar()' onload='Recalcula();' _no='WidthSubTitle();CondicionesLeft();'>
<DIV id="PROCESANDO" class="ICONLOADING" onclick='this.style.display="none"'>r</DIV>
<?PHP
?>
<div id=PAGINA style="text-align:center;height:1px;width:10000px;background:transparent">
<TABLE class=TITULO id=GROUPTITLE border=0px cellspacing=0px cellpadding=0px style="background:transparent" onclick="_SetCaption('TD')">
<tr><td id=TITULO align=center nowrap style='cursor:default;background:transparent;'>...</td></tr>
</TABLE>
<div id=CONTENEDOR style="height:1px;">
<span style="width:100%;text-align:left;">
<table style='background:transparent' id=Condiciones>
<tr>
<td id=Condicion1>...</td>
<td width=25></td>
<td id=Condicion2>...</td>
</tr>
</table>
</span>
<table id='BROWSE' SeekCampos="" FiltroTabla="" _eCols=9 _AltoTH=1>
</table>
</div>
<DIV id=TablaTH STYLE="z-index:2; display:none; position:absolute;"></DIV>
<DIV id=TablaTV STYLE="z-index:1; display:none; position:absolute;"></DIV>
<DIV id=TablaTE STYLE="z-index:3; display:none; position:absolute;"></DIV>
</div>
<SCRIPT type="text/javascript" name=eDes>
var _TotalRec = 6;
_cDeslizante = 0;
_ColorOrigen = BROWSE.style.background;
var _Grafica = new Array();
var _TituloGraf = "...";
var _FilaConTotales = true;
try{ document.body.focus(); }catch(e){}
for( var i in top.DimDivValor ){
if( i.substr(0,4)=='cmp:' ){
document.all.TITULO.innerHTML = top.DimDivValor[i][1].document.all.TITULO.innerHTML;
try{
document.all.Condicion1.innerHTML = top.DimDivValor[i][1].document.all.CONDICIONES.outerHTML;
document.all.Condicion2.innerHTML = top.DimDivValor[i][2].document.all.CONDICIONES.outerHTML;
var Obj = document.all.Condiciones.all.tags('IMG'), n;
for( n=0; n<Obj.length; n++ ) Obj[n].style.display='none';
Obj = document.all.Condiciones.all.tags('LI');
for( n=0; n<Obj.length; n++ ) Obj[n].onclick = null;
}catch(e){}
try{
ComparaTablas( top.DimDivValor[i][1].document.all.BROWSE, top.DimDivValor[i][2].document.all.BROWSE, top.DimDivValor[i][1]._ToolsCMP );
delete top.DimDivValor[i];
break;
}catch(e){
delete top.DimDivValor[i];
}
}
}
top.eSWView(window);
top.eLoading(0,window);
</SCRIPT>
</BODY></HTML>
