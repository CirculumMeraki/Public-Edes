<?PHP
eLngLoad('../../edesweb/lng/structure_def.edf');
if( file_exists('../_datos/config/structure.idf.lng') ) eLngLoad('../_datos/config/structure.idf');
if( !function_exists('qQuery') ) eInclude($_Sql);
?>
<!DOCTYPE HTML>
<HTML><HEAD>
<TITLE> Estructura Empresarial </TITLE>
<META HTTP-EQUIV='imagetoolbar' CONTENT='no'>
<?= eLink('ficha') ?>
<style>
#cDirectorios {
border: 2px solid #6c7b82;
padding: 0px;
background: #6c7b82;
width: 100%;
height: 100%;
cursor:default;
position:absolute;
}
#cDirectorios span {
border: 0px solid #6c7b82;
margin: 0px;
padding:0px;
filter: progid:dximagetransform.microsoft.gradient(gradienttype=0,startcolorstr=#FFFFFF,endcolorstr=#FFFFCC);
width:100%;
height:100%;
}
#cDirectorios #tdDirectorios {
height:200px;
}
#cDirectorios TABLE {
background: transparent;
}
#cDirectorios .dTitulo TH {
background: #a0b5cf;
color: #ffffff;
}
#cDirectorios .dTitulo{
border-bottom: 1px solid #6c7b82;
height:1px;
}
#cDirectorios TD {
text-align: left;
}
#cDirectorios TD IMG {
padding:0px;
width:16px;
height:16px;
margin-right:5px;
margin-top:1px;
margin-bottom:3px;
}
TH, TD {
white-space: nowrap;
vertical-align: top;
}
.Persona {
color:red;
padding-left:10px;
}
#oDirectorios {
border-bottom: 1px solid #bccbdd;
}
.oC TD {
border-top: 1px solid #bccbdd;
}
.n0 { margin-left:5px; }
.n1 { margin-left:20px; }
.n2 { margin-left:35px; }
.n3 { margin-left:50px; }
.n4 { margin-left:65px; }
.n5 { margin-left:80px; }
.n6 { margin-left:95px; }
.n7 { margin-left:110px; }
.n8 { margin-left:125px; }
.n9 { margin-left:140px; }
</style>
<?=_FileNoCache('edes.js')?>
<script type="text/javascript">
var _Source = '$a/d/structure.gs',
_SourceFolder;
function uViewDir(){
if( eGF('visibility')=='' || ( eGF('visibility')=='G' && eGF('cd_gs_group')=='' ) ) return;
_SourceFolder = S.event(window).sourceIndex
var Obj = document.children[_SourceFolder-1];
var xy = top.eXY(Obj);
with( DGI('cDirectorios').style ){
zIndex = 1;
top = px(xy[1]+2);
left = px(xy[0]+2);
display = 'block';
}
S.modal(DGI("cDirectorios"));
if(  DGI('oDirectorios').rows.length==0 ){
top.eCallSrv( window, 'LoadDir=0&DesdeTR=-1&DesdeTABLE='+DGI('oDirectorios').sourceIndex+'&type_folder='+eGF('visibility')+'&cd_gs_group='+eGF('cd_gs_group')+'&Indent=0', window );
}
}
function uCrearDirPadre(){
_oMenu=null;
_SubFormDim = new Array('','','','I','');
OpenElemento();
}
function uCrearDir( cd_gs_tstructure, nm_structure, cd_gs_user, nm_user, Filter ){
var TR = ( _oMenu==null ) ? oDirectorios.insertRow() : oDirectorios.insertRow(_oMenu.rowIndex+1);
var TD = TR.insertCell(0);
if( _oMenu==null ){
var Nivel = 0;
var Padre = 0;
}else{
var Nivel = parseInt(_oMenu.cells[0].children[0].className.substr(1))+1;
var Padre = _oMenu.cells[0].children[0].cElemento;
_oMenu.cells[0].children[0].src = (_oMenu.cells[0].children[0].src+'').replace('_0.','_1.');
}
if( nm_user!='' ){
TR.insertCell(1);
TR.cells[1].innerHTML = nm_user;
}
TD.innerHTML = '<img src="edes.php?R:/_datos/config/'+cd_gs_tstructure+'_0.gif" class="n'+Nivel+'" cElemento=-1 cPadre='+Padre+' Tipo='+cd_gs_tstructure+' Filter="'+Filter+'">'+nm_structure;
TD.children[0].Tipo = cd_gs_tstructure;
TD.children[0].User = cd_gs_user;
TD.children[0].Filter = Filter;
top.eCallSrv( window, 'CrearDir="'+nm_structure+'"&Nivel='+Nivel+'&cPadre='+Padre+'&SourceIndex='+TD.children[0].sourceIndex+'&Tipo='+cd_gs_tstructure+'&User='+cd_gs_user+'&Filter='+Filter, window );
}
function uModDir( cd_gs_tstructure, nm_structure, cd_gs_user, nm_user, Filter ){
_oMenu.cells[0].children[0].src = "edes.php?R:/_datos/config/"+cd_gs_tstructure+((_oMenu.cells[0].children[0].SC==0)?'_0':'_1')+".gif";
_oMenu.cells[0].innerHTML = _oMenu.cells[0].children[0].outerHTML + nm_structure;
_oMenu.cells[0].children[0].Tipo = cd_gs_tstructure;
_oMenu.cells[0].children[0].User = cd_gs_user;
_oMenu.cells[0].children[0].Filter = Filter;
if( nm_user=='' ){
if( _oMenu.cells.length==2 ) _oMenu.cells[1].innerHTML = '';
}else{
if( _oMenu.cells.length==1 ){
if( _oMenu.cells[0].colSpan==2 ) _oMenu.cells[0].colSpan = 1;
_oMenu.insertCell(1);
}
_oMenu.cells[1].innerHTML = nm_user;
}
top.eCallSrv( window, 'ModificarDir="'+nm_structure+'"&cElemento='+_oMenu.cells[0].children[0].cElemento+'&Tipo='+cd_gs_tstructure+'&User='+cd_gs_user+'&Filter='+Filter, window );
}
function uDelDir(){
var oClass = _oMenu.cells[0].children[0].className;
var DesdeRow = _oMenu.rowIndex;
while( DesdeRow+1<DGI('oDirectorios').rows.length && oDirectorios.rows[DesdeRow+1].cells[0].children[0].className > oClass ){
oDirectorios.deleteRow( DesdeRow+1 );
}
top.eCallSrv( window, 'BorrarDir='+_oMenu.cells[0].children[0].cElemento+'&cPadre='+_oMenu.cells[0].children[0].cPadre, window );
S.toTag(_oMenu,'TABLE').deleteRow(_oMenu.rowIndex);
}
function uSelDir(){
var Obj = S.event(window);
if( Obj.tagName=='IMG' ) Obj = Obj.parentNode;
if( Obj.tagName=='TR' ) return;
if( Obj.tagName=='TH' ){
var cPadre = 0;
var Indent = 0;
}else{
if( Obj.cellIndex==1 ) Obj = Obj.parentNode.cells[0];
var cPadre = Obj.children[0].cElemento;
var Indent = parseInt(Obj.children[0].className.substr(1))+1;
}
if( _MoverFolder!=null ){
if( _MoverFolder.sourceIndex == Obj.parentNode.sourceIndex ){
top.eInfoError( window, '<?=eLng('MovCancelado')?>' );
_MoverFolder = null;
return;
}
var sIndent = Indent;
var oClass = _MoverFolder.cells[0].children[0].className;
var DifClass = sIndent-parseInt(oClass.substr(1));
var DesdeRow = _MoverFolder.rowIndex;
var dRow = parseInt((cPadre==0)?0:Obj.parentNode.rowIndex);
var oRow = parseInt(_MoverFolder.rowIndex);
_MoverFolder.cells[0].children[0].cPadre = cPadre;
_MoverFolder.cells[0].children[0].className = 'n'+Indent;
top.eCallSrv( window, 'MoverDir='+_MoverFolder.cells[0].children[0].cElemento+'&cPadre='+cPadre, window );
if( _MoverFolder.rowIndex < Obj.parentNode.rowIndex ){
oDirectorios.moveRow( oRow, dRow );
for( var n=DesdeRow+1; n<DGI('oDirectorios').rows.length; n++ ){
if( oDirectorios.rows[oRow].cells[0].children[0].className <= oClass ) break;
oDirectorios.rows[oRow].cells[0].children[0].className = 'n'+(parseInt(oDirectorios.rows[oRow].cells[0].children[0].className.substr(1))+DifClass);
oDirectorios.moveRow( oRow, dRow );
}
}else{
dRow++;
oDirectorios.moveRow( oRow, dRow );
for( var n=DesdeRow+1; n<DGI('oDirectorios').rows.length; n++ ){
dRow++;
oRow++;
if( oDirectorios.rows[oRow].cells[0].children[0].className <= oClass ) break;
oDirectorios.rows[oRow].cells[0].children[0].className = 'n'+(parseInt(oDirectorios.rows[oRow].cells[0].children[0].className.substr(1))+DifClass);
oDirectorios.moveRow( oRow, dRow );
}
}
_MoverFolder = null;
}else{
if( Obj.tagName!='TD' ) return;
if(Obj.parentNode.cells[0].children[0].SC == 0 ){
eLoadingObj(Obj.parentNode.cells[0].children[0]);
Obj.parentNode.cells[0].children[0].SC = 1;
Obj.parentNode.cells[0].children[0].src = (Obj.parentNode.cells[0].children[0].src+'').replace('_0.','_1.');
top.eCallSrv( window, 'LoadDir='+Obj.parentNode.cells[0].children[0].cElemento+'&DesdeTR='+Obj.parentNode.rowIndex+'&DesdeTABLE='+S.toTag(Obj,'TABLE').sourceIndex+'&Indent='+Indent, window );
}else{
var DesdeRow = Obj.parentNode.rowIndex;
var oClass = Obj.children[0].className;
var mClass = 'n'+(parseInt(Obj.children[0].className.substr(1))+1);
var Visibilidad = '';
for( var n=DesdeRow+1; n<DGI('oDirectorios').rows.length; n++ ){
if( oDirectorios.rows[n].cells[0].children[0].className <= oClass ) break;
if( Visibilidad=='' ){
Visibilidad = (oDirectorios.rows[n].offsetHeight>0)?'none':'block';
if( Visibilidad=='none' ){
Obj.children[0].src = (Obj.children[0].src+'').replace('_1.','_0.');
}else{
Obj.children[0].src = (Obj.children[0].src+'').replace('_0.','_1.');
}
}
if( Visibilidad=='none' ){
oDirectorios.rows[n].style.display = Visibilidad;
if( oDirectorios.rows[n].cells[0].children[0].Hijos=='0' ){
oDirectorios.rows[n].cells[0].children[0].src = (oDirectorios.rows[n].cells[0].children[0].src+'').replace('_1.','_0.');
}
}else{
if( oDirectorios.rows[n].cells[0].children[0].className==mClass ) oDirectorios.rows[n].style.display = Visibilidad;
}
}
}
}
}
var _FilterParent = '';
var _SubFormDim = new Array('','','','','');
var _MoverFolder = null;
function uToolsDir2( Op, OpTextContent, Obj, OpObj ){
_FilterParent = '';
switch(Op){
case "A":
if( _oMenu.rowIndex > 0 ){
for( var n=_oMenu.rowIndex-1; n>=0; n-- ){
if( oDirectorios.rows[n].cells[0].children[0].Filter!='' ){
FiltroParent = oDirectorios.rows[n].cells[0].children[0].Filter;
break;
}
}
}
_SubFormDim = new Array('','','','I','','');
OpenElemento();
break;
case "B":
var NmUser = '';
if( _oMenu.cells.length==2 ) NmUser = top.eTrim(_oMenu.cells[1].textContent);
_SubFormDim = new Array( _oMenu.cells[0].children[0].Tipo, top.eTrim(_oMenu.cells[0].textContent), _oMenu.cells[0].children[0].User, 'D', NmUser, _oMenu.cells[0].children[0].Filter );
OpenElemento();
break;
case "M":
if( _oMenu.rowIndex > 0 ){
for( var n=_oMenu.rowIndex-1; n>=0; n-- ){
if( oDirectorios.rows[n].cells[0].children[0].Filter!='' ){
_FilterParent = oDirectorios.rows[n].cells[0].children[0].Filter;
break;
}
}
}
var NmUser = '';
if( _oMenu.cells.length==2 ) NmUser = top.eTrim(_oMenu.cells[1].textContent);
_SubFormDim = new Array( _oMenu.cells[0].children[0].Tipo, top.eTrim(_oMenu.cells[0].textContent), _oMenu.cells[0].children[0].User, 'U', NmUser, _oMenu.cells[0].children[0].Filter );
OpenElemento();
break;
case "V":
_MoverFolder = _oMenu;
top.eInfo(window,'<?=eLng('SelecPadre')?>');
break;
case "F":
var NmUser = '';
if( _oMenu.cells[0].children[0].CNT=='S' ){
top.eInfo(window,'<?=eLng('NoEsPuesto')?>');
}else{
var NmDepar = '';
for( var i=_oMenu.rowIndex-1; i>0; i-- ){
if( oDirectorios.rows[i].cells[0].children[0].CNT=='S' ){
NmDepar = top.eTrim(oDirectorios.rows[i].cells[0].textContent);
break;
}
}
_SubFormDim = new Array( _oMenu.cells[0].children[0].cElemento, top.eTrim(_oMenu.cells[0].textContent), NmDepar );
top.eSWOpen( window, 'edes.php?FmR:$a/d/structure_func.edf&_SEEK&cd_gs_str='+_oMenu.cells[0].children[0].cElemento, '', true, 0,0,null,null, false );
}
break;
}
}
var _oMenu;
function uToolsDir(){
_MoverFolder = null;
_oMenu = S.toTag(S.event(window),'TR');
if( _oMenu.cells[0].children[0].CNT=='S' ){
top.eMenu( window, _oMenu, {
'-':'<?=eLng('TitleOpOpciones')?>',
'A':'[g/op_insert.gif]<?=eLng('OpCrear')?>',
'M':'[g/op_update.gif]<?=eLng('OpModificar')?>',
'B':'[g/op_delete.gif]<?=eLng('OpBorrar')?>',
'V':'[g/t_op_sel.gif]<?=eLng('OpMover')?>'
}, uToolsDir2, true );
}else{
top.eMenu( window, _oMenu, {
'-':'<?=eLng('TitleOpOpciones')?>',
'A':'[g/op_insert.gif]<?=eLng('OpCrear')?>',
'M':'[g/op_update.gif]<?=eLng('OpModificar')?>',
'B':'[g/op_delete.gif]<?=eLng('OpBorrar')?>',
'V':'[g/t_op_sel.gif]<?=eLng('OpMover')?>',
'-2':'',
'F':'[g/l_op_exe.gif]<?=eLng('OpFunciones')?>'
}, uToolsDir2, true );
}
return top.eClearEvent(null,window);
}
function eLoadingObj( Obj ){
if( typeof(Obj)=='undefined' ){
PROCESANDO.style.display = 'none';
}else{
var xy = top.eXY( Obj );
with( PROCESANDO.style ){
display = 'block';
left = xy[0];
top = xy[1];
}
}
}
var _SubForm = null;
function OpenElemento(){
if( _SubForm==null ){
_SubForm = top.eSWOpen( window, 'edes.php?Fa:$a/d/structure_def', '', false );
}else{
top.eSWShow( _SubForm );
_SubForm.LoadDatos();
}
}
if( top.eIsWindow(window) ) top.eSWResize( window );
function Ini(){
DGI('tableDirectorios').style.height = document.body.clientHeight-2<?=(($_SESSION['_D_']=='~')?-30:'')?>;
}
</script>
</head>
<body onload=Ini()>
<span id='cDirectorios'><span>
<table id='tableDirectorios' border=0 cellspacing=0 cellpadding=0 width='100%' onclick='uSelDir()' oncontextmenu='uToolsDir()'>
<col style='width:15px;text-align:center'><col style='width:155px'>
<tr height=1px><th colspan=2 class='dTitulo'>
<table border=0 cellspacing=0 cellpadding=0 width='100%' height=1><tr oncontextmenu='return top.eClearEvent(null,window)'>
<th style='padding:5px'> <?=eLng('TitleList')?> </th>
<th width=1><img src='g/op_insert.gif' onclick='uCrearDirPadre()' title='Crear Entidad' style='margin-right:5px;margin-top:4px'></th>
</tr></table>
</th></tr>
<tr><td id='tdDirectorios' style='height:100%;'>
<div style='overflow-y:auto;height:100%;'>
<table id='oDirectorios' border=0px cellspacing=0px cellpadding=1px width='100%' cols=2>
<col><col width=100% class='Persona'>
<?PHP
qQuery( "select A.*,T.container from gs_structure A, gs_tstructure T where A.cd_gs_structure_parent=0 and A.cd_gs_tstructure=T.cd_gs_tstructure order by T.sort,A.nm_gs_structure" );
while( $r=qArray() ){
$TieneHijos = ( (qCount( 'gs_structure', "cd_gs_structure_parent={$r['cd_gs_structure']}", $p ) > 0 ) ? '_0' : '_1' );
$Sufijo = $TieneHijos;
$r['mfilter'] = trim($r['mfilter']);
if( $r['container']!='S' ) $Sufijo = '_1';
$SeCargo = (($TieneHijos=='_0')?0:1);
echo "<tr class='oC'><td colspan=2><img src='edes.php?R:/_datos/config/{$r['cd_gs_tstructure']}{$Sufijo}.gif' class='n0' cElemento={$r['cd_gs_structure']} cPadre={$r['cd_gs_structure_parent']} SC={$SeCargo} CNT='{$r['container']}' Tipo='{$r['cd_gs_tstructure']}' User='{$r['cd_gs_user']}' Hijos='".substr($TieneHijos,1)."' Filter='{$r['mfilter']}'>".trim($r['nm_gs_structure']).'</td></tr>';
}
?>
</table>
</div>
</td></tr>
</table>
</span></span>
<img id=PROCESANDO src="g/procesando.gif" style="position:absolute;display:none">
</body>
</html>
<?PHP
eEnd();
?>
