<?=eHTML();?>
</HEAD>
<?PHP
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
eInclude($_Sql);
if( isset($STATUS) ){
if( eSqlType('pdo.informix') ){
$Hoy = date('d-m-Y');
}else{
$Hoy = date('Y-m-d');
}
qQuery( "update {$_SESSION['ShareDictionary']}gs_op set status='{$STATUS}', cd_gs_user='{$_User}', dt_status='{$Hoy}' where cd_gs_op='{$ID}'" );
?>
<script type="text/javascript">
S("body").tip(top.eLng(27),1);
</script>
<?PHP
exit;
}
if( !isset($TIPO) ) $TIPO = 0;
$cd_tree = 'MASTER';
if( isset($GRABAR) ){
echo "<BODY onhelp='return false' oncontextmenu='return false' onselectstart='return false' ondragstart='return false'>";
$Dim = explode( '|', $GRABAR );
for( $n=0; $n<count($Dim)-1; $n++ ){
list( $id, $subtree_opt ) = explode( ',', $Dim[$n] );
qQuery( "update {$_SESSION['ShareDictionary']}gs_op set subtree_opt='{$subtree_opt}' where id='{$id}' and cd_tree='{$cd_tree}'" );
}
if( $CONARBOLES==1 ){
make_Txt( $cd_tree );
?><SCRIPT type="text/javascript">top.eAlertHide();top.eAlert('','<b>Arboles generados</b>','A','I');</SCRIPT><?PHP
}else{
?><SCRIPT type="text/javascript">top.eAlertHide();top.eAlert('','<b>Opciones grabadas</b>','A','I');</SCRIPT><?PHP
}
eEnd();
}
$NomArbol = array();
$VarMensa = 'var Mensa = new Array("");';
$TTree = 0;
qQuery( "select nm_gs_tree, description from {$_SESSION['ShareDictionary']}gs_tree order by cd_gs_tree" );
while( $r = qRow() ){
$TTree++;
$VarMensa .= 'Mensa['.$TTree.'] = new Array("'.str_replace('"',"'",$r[0]).'","'.str_replace('"',"'",str_replace("\r\n",' ',$r[1])).'");';
$NomArbol[] = trim($r[0]);
}
if( $TTree == 0 || qCount("{$_SESSION['ShareDictionary']}gs_op", "")==0 ){
eInclude('message');
eMessage( "No hay ninguna opción generada.", 'HSE' );
}
eLink('tree');
?>
<style>
BODY {
scroll: no;
margin: 0px;
}
#o {
display: none;
}
#i {
cursor:default;
}
#n0 { PADDING-LEFT:  5px; }
#n1 { PADDING-LEFT: 20px; }
#n2 { PADDING-LEFT: 35px; }
#n3 { PADDING-LEFT: 50px; }
#n4 { PADDING-LEFT: 65px; }
#n5 { PADDING-LEFT: 80px; }
#n6 { PADDING-LEFT: 95px; }
#n7 { PADDING-LEFT: 110px; }
#n8 { PADDING-LEFT: 125px; }
#n9 { PADDING-LEFT: 140px; }
.Option {
CURSOR: default;
WHITE-SPACE: nowrap;
}
.Status {
CURSOR: pointer;
width:20px;
border-color: #FFFFCC;
}
.TreePar, .TreeImpar, .TreeSel {
FONT-FAMILY: Wingdings 2;
CURSOR: pointer;
TEXT-ALIGN: center;
}
.THTreePar, .THTreeImpar {
cursor: pointer;
}
#Line {
FONT-SIZE: 1px;
HEIGHT: 1px;
}
.LineaTD {
PADDING-RIGHT: 0px;
PADDING-LEFT: 0px;
PADDING-BOTTOM: 0px;
PADDING-TOP: 0px;
border-spacing: 0px;
}
#MENU TD {
border-bottom: 0px;
}
TD {
font-size:14px;
}
IMG {
CURSOR: pointer;
}
<?PHP  if( $TIPO==0 ){ ?>
.TreePar, .TreeImpar {
cursor:default;
}
<?PHP  } ?>
@media print {
.Papel {
background-color: #ffffff;
}
.AlImprimir {
display: none;
}
}
</style>
<?PHP
if( $_SESSION['_D_']=='~' ) _FileNoCache('edes.js');
?>
<SCRIPT type="text/javascript">
var _FILAS;
function AjustaCeldas(){
var O = DGI("BROWSE").rows[0].cells;
var D = DGI("BROWSETH").rows[0].cells
D[0].width = parseInt(O[0].offsetWidth) - 4;
_FILAS = BROWSE.rows;
if( event!=null && event.type=='load' ) top.eSWResize( window );
}
var _OnOff = new Array();
function OnOff(){
var TD = Obj = S.event(window);
if( Obj.cellIndex==0 && Obj.all.length==1 ) Obj = Obj.parentNode.cells[0].children[0];
if( Obj.tagName=='IMG' ){
var tmp = Obj.src.split('_');
var Estado = tmp[tmp.length-1].substring(0,1);
var i = Obj.parentNode.parentNode.rowIndex + 1;
var oID = Obj.parentNode.id;
var sID = 'n'+(parseInt(oID.substring(1))+1);
var tTR = _FILAS.length;
if( Estado == 0 ){
Obj.src = Obj.src.replace('_0.','_1.');
while( i < tTR && oID < _FILAS[i].cells[0].id ) _FILAS[i++].style.display = 'none';
}else{
Obj.src = Obj.src.replace('_1.','_0.');
while( i < tTR && oID < _FILAS[i].cells[0].id  ){
if( sID == _FILAS[i].cells[0].id ){
_FILAS[i].style.display = 'block';
if( _FILAS[i].cells[0].all.length == 1 ) _FILAS[i].cells[0].firstChild.src = _FILAS[i].cells[0].firstChild.src.replace('_0.','_1.');
}
i++;
}
}
AjustaCeldas();
return;
}
if( TD.tagName!='TD' ) return;
var Columna = TD.cellIndex;
var Fila = sFila = TD.parentNode.rowIndex;
if( Fila==_FILAS.length-1 ) return;
if( Columna==0 || Columna==TD.parentNode.cells.length-1 ) return;
<?PHP  if( $TIPO==0 ) echo "if( Columna>0 ) return;"; ?>
var Nivel = sNivel = _FILAS[Fila].cells[0].id.substr(1)*1;
_FILAS[Fila].cells[Columna].textContent = ( _FILAS[Fila].cells[Columna].textContent=='P' ) ? '¬':'P';
_FILAS[Fila].cells[Columna].className = 'ChangeTree';
_FILAS[Fila].cells[0].className = 'ChangeOP';
_OnOff[_OnOff.length] = new Array(Fila,Columna);
if( Fila > 0 ){
Fila--;
Nivel--;
while( Fila>=0 && _FILAS[Fila].cells[0].id && Nivel >= 0){
if( 'n'+Nivel == _FILAS[Fila].cells[0].id ){
if( _FILAS[Fila].cells[Columna].textContent!='P' ){
_FILAS[Fila].cells[Columna].textContent = 'P';
_FILAS[Fila].cells[Columna].className = 'ChangeTree';
_FILAS[Fila].cells[0].className = 'ChangeOP';
_OnOff[_OnOff.length] = new Array(Fila,Columna);
}
Nivel--;
}
Fila--;
}
}
Fila = sFila + 1;
Nivel = sNivel + 1;
while( _FILAS[Fila].cells[0].id >= 'n'+Nivel && sNivel<Nivel && Fila<_FILAS.length-1 ){
if( _FILAS[Fila].cells[Columna].textContent=='P' ){
_FILAS[Fila].cells[Columna].textContent = '¬';
_FILAS[Fila].cells[Columna].className = 'ChangeTree';
_FILAS[Fila].cells[0].className = 'ChangeOP';
_OnOff[_OnOff.length] = new Array(Fila,Columna);
}
Fila++;
}
}
function Grabar2( v, no, ConArboles ){
if( v!=2 ) return;
top.eAlertHide();
top.eAlert( S.lng(209), 'Grabando...', '-', 'I' );
_FILAS = BROWSE.rows;
var txt='', f, c;
for( f=0; f<_FILAS.length-1; f++ ){
txt += _FILAS[f].n+',';
for( c=1; c<<?=($TTree+1)?>; c++ ) txt += (_FILAS[f].cells[c].textContent=='P')?'1':'0';
txt += '|';
}
var txt = "<?=eHTML('','','',true)?></HEAD><BODY>"+
'<FORM METHOD=POST ACTION="edes.php?E:$a/d/tree.gs" NAME="FRM1">'+
'<INPUT TYPE="HIDDEN" NAME="CONARBOLES" VALUE="'+ConArboles+'">'+
'<INPUT TYPE="HIDDEN" NAME="GRABAR" VALUE="'+txt+'">'+
'</FORM>'+
'</BODY></HTML>';
top.TLF.document.write(txt);
top.TLF.document.close();
top.TLF.document.FRM1.submit();
if( _OnOff.length > 0 ){
var _FILAS = DGI("BROWSE").rows;
for( var n=0; n<_OnOff.length; n++ ){
_FILAS[ _OnOff[n][0] ].cells[0].className = '';
_FILAS[ _OnOff[n][0] ].cells[ _OnOff[n][1] ].className = '';
}
_OnOff = new Array();
}
}
function Grabar( v ){
if( v==1 ){
top.eAlert( S.lng(209), 'Confirmar generar árboles', 'A,C', 'I', Grabar2, null, v );
}else{
top.eAlert( S.lng(209), 'Confirmar grabar opciones', 'A,C', 'I', Grabar2, null, v );
}
return top.eClearEvent(null,window);
}
<?= $VarMensa."\n"; ?>
function NomArbol(){
var TD = S.event(window);
if( TD.tagName!='TD' ) return;
var Columna = TD.cellIndex;
var Fila = sFila = TD.parentNode.rowIndex;
if( Columna<=0 || Columna==TD.parentNode.cells.length-1 ){
document.all.INFO.innerHTML = '';
return;
}
try{
document.all.INFO.innerHTML = '('+Columna+') <b>'+Mensa[Columna][0]+'</b>'+((Mensa[Columna][1]!='')?' - '+Mensa[Columna][1]:'');
}catch(e){
document.all.INFO.innerHTML = '';
}
TD.parentNode.className = 'FilaON';
}
function NomArbolTH(){
var TH = S.event(window);
if( TH.tagName!='TH' ) return;
var Columna = TH.cellIndex;
var Fila = sFila = TH.parentNode.rowIndex;
if( Columna==0 || Columna==TH.parentNode.cells.length-1 ){
document.all.INFO.innerHTML = '';
return;
}
try{
document.all.INFO.innerHTML = '('+Columna+') <b>'+Mensa[Columna][0]+'</b>'+((Mensa[Columna][1]!='')?' - '+Mensa[Columna][1]:'');
}catch(e){
document.all.INFO.innerHTML = '';
}
}
function SelCol(){
var TH = S.event(window);
if( TH.tagName!='TH' ) return;
var Columna = TH.cellIndex+1;
if( document.all.BROWSE.children[Columna].className == 'TreeSel' ){
document.all.BROWSE.children[Columna].className = document.all.BROWSE.ClassTreeSel;
}else{
for( var n=1; n<document.all.BROWSETH.rows[0].cells.length-1-3; n++ ){
if( document.all.BROWSE.children[n+1].className != (( n%2 == 0 ) ? 'TreePar' : 'TreeImpar') ){
document.all.BROWSE.children[n+1].className = ( n%2 == 0 ) ? 'TreePar' : 'TreeImpar';
}
}
document.all.BROWSE.ClassTreeSel = document.all.BROWSE.children[Columna].className;
document.all.BROWSE.children[Columna].className = 'TreeSel';
}
}
var _Body;
function _Imprimir( v ){
if( v==-1 ) return;
_Body.focus();
window.document.body.focus();
setTimeout('window.print();',100);
}
function Imprimir(){
_Body = window.document.body;
top.eAlert( S.lng(209), S.lng(218), 'A,C', 'P', _Imprimir );
return top.eClearEvent(null,window);
}
function AntesPrint(){
S("#Container").obj.style.height = '';
}
function DespuesPrint(){
S("#Container").obj.style.height = '100%';
}
window.onbeforeprint = AntesPrint;
window.onafterprint = DespuesPrint;
function eToPDF(){
top.eCallSrv( window, 'edes.php?E:$a/d/tree.gs&_PrintToPDF=1' );
}
function eClearEvent(){
try{
if( event==null ) return false;
S.eventClear(window);
}catch(e){}
return false;
}
function VerTodo(){
for( var v=_FILAS.length-2; v>=0; v-- ){
_FILAS[v].style.display = 'block';
if( _FILAS[v].cells[0].all.length == 1 ) _FILAS[v].cells[0].firstChild.src = _FILAS[v].cells[0].firstChild.src.replace('_1.','_0.');
}
AjustaCeldas();
}
function VerResumen(){
for( var v=_FILAS.length-2; v>=0; v-- ){
if( _FILAS[v].cells[0].id=='n0' ){
_FILAS[v].style.display = 'block';
if( _FILAS[v].cells[0].all.length == 1 ) _FILAS[v].cells[0].firstChild.src = _FILAS[v].cells[0].firstChild.src.replace('_0.','_1.');
}else{
_FILAS[v].style.display = 'none';
}
}
AjustaCeldas();
}
function Ver2Resumen(){
for( var v=_FILAS.length-2; v>=0; v-- ){
if( _FILAS[v].cells[0].id < 'n2' ){
_FILAS[v].style.display = 'block';
if( _FILAS[v].cells[0].all.length == 1 ) _FILAS[v].cells[0].firstChild.src = _FILAS[v].cells[0].firstChild.src.replace('_0.','_1.');
}else{
_FILAS[v].style.display = 'none';
}
}
AjustaCeldas();
}
</script>
<?PHP
if( $_Development ){
echo '<BODY onload=AjustaCeldas() onhelp="return false">';
}else{
echo '<BODY onload=AjustaCeldas() onhelp="return false" oncontextmenu="return false" onselectstart="return false">';
}
?>
<table border=0px cellspacing=0px cellpadding=0px width=100% height=100%>
<tr><td>
<?PHP
if( $TIPO==0 ){
?>
<table id=Header width=100% style='cursor:default'>
<tr>
<TH colspan=3 height=1px>ARBOL DE OPCIONES
<tr height=1px class=AlImprimir>
<td width=1px height=1px>
<table id=MENU border=0px cellspacing=0px cellpadding=0px><tr>
<td><img src='g/pdf.gif' onclick=eToPDF() style='cursor:pointer;margin-left:5px' title='Exportar a PDF'>
</table>
<td width=1px style='padding-left:10px'>Arbol:
<td width=100% style='padding-left:5px;' valign=middle>
<div id=INFO style='height:16px; overflow:hidden; float:left; scroll:no;'></div>
</table>
<?PHP
}else{
?>
<table id=Header width=100% style='cursor:default;'>
<tr>
<TH colspan=3 height=1px>ARBOL DE OPCIONES
<tr height=1px class=AlImprimir>
<td width=1px height=1px>
<table id=MENU border=0px cellspacing=0px cellpadding=0px><tr>
<td><img src='edes.php?R:$a/g/an_grabar.gif' onclick=Grabar(0) style='cursor:pointer;margin-left:5px' title='Grabar cámbios'>
<td><img src='edes.php?R:$a/g/arbol.gif' onclick=Grabar(1) style='cursor:pointer;margin-left:5px' title='Grabar cámbios y gererar árboles'>
<td><img src='g/pdf.gif' onclick=eToPDF() style='cursor:pointer;margin-left:5px' title='Exportar a PDF'>
</table>
<td width=1px style='padding-left:10px'>Arbol:
<td width=100% style='padding-left:5px;' valign=middle>
<div id=INFO style='height:16px; overflow:hidden; float:left; scroll:no;'></div>
</table>
<?PHP
}
echo '<tr><td>';
echo '<table id=BROWSETH width=100% onmouseover="NomArbolTH()">';
echo '<col class=Option>';for( $n=0; $n<$TTree; $n++ ) echo '<col class='.(($n%2!=0)?'THTreePar':'THTreeImpar').' width=25px>';
echo '<col class=Option>';
echo '<TH class=THOption>OPCION';for( $n=0; $n<$TTree; $n++ ) echo '<TH onclick="SelCol()" width=25px>'.($n+1);
echo '<TH class="THOption AlImprimir" width=1px style="padding-left:15px"><img src=g/tree_1.gif onclick=VerTodo() title="Mostrar todas las opciones">';
echo '<TH class="THOption AlImprimir" width=1px><img src=g/tree_2.gif onclick=Ver2Resumen() title="Mostrar dos niveles">';
echo '<TH class="THOption AlImprimir" width=1px><img src=g/tree_0.gif onclick=VerResumen() title="Mostrar solapas">';
echo '<TH class=THOption>&nbsp;';
echo '</table>';
echo '<tr><td height="100%" style="vertical-align:top;">';
echo '<div id=Container style="overflow:auto; height:100%; width:100%; padding:0px;">';
echo '<table id=BROWSE onclick="OnOff()" onmouseover="NomArbol()" width="100%">';
echo '<col class=Option>';for( $n=0; $n<$TTree; $n++ ) echo '<col class='.(($n%2!=0)?'TreePar':'TreeImpar').' style="width:25px">';
echo '<col class=Option width="100%">';
$OpEn = array();
qQuery( "select cd_gs_op,cd_gs_tree from {$_SESSION['ShareDictionary']}gs_tree_op" );
while( $r=qArray() ){
$OpEn[$r[0]][$r[1]] = 1;
}
$OpNo = "'U'";
if( $_Development ) $OpNo .= "";
else if( $_Test ) $OpNo .= ",'D'";
else $OpNo .= ",'D','T'";
if( $_PrintToPDF ){ $usuCursor = array(); $nr=0; }
qQuery( "select * from {$_SESSION['ShareDictionary']}gs_op where show_type not in ({$OpNo}) order by seq" );
$c = 0;
while( $r=qArray() ){
if( $r['status']=='' ) $r['status'] = '0';
echo '<tr n='.$r['cd_gs_op'];
if( $r['indent'] > 1 ) echo ' id=o';
echo '>';
if( $r['type']=='L' ){
$txt = trim($r['caption']);
if( $txt=='' ){
echo "<td id=n{$r['indent']}><img id=i src=g/linea.gif width=100% height=2>";
if( $_PrintToPDF ) $usuCursor[$nr][0] = str_repeat(chr(8),$r['indent']*3).str_repeat('-',50-$r['indent']*3);
}else{
echo "<td id=n{$r['indent']}>";
echo "<table width=100% border=0px cellspacing=0px cellpadding=0px><tr><th><img id=i src=g/linea.gif width='100%' height=2px></th><th width=1px>&nbsp;{$txt}&nbsp;</th><th><img id=i src=g/linea.gif width='100%' height=2px></th></tr></table>";
if( $_PrintToPDF ) $usuCursor[$nr][0] = str_repeat(chr(8),$r['indent']*3).str_pad(' '.$txt.' ', 50-$r['indent']*3, "-", STR_PAD_BOTH);
}
}else{
$txt = trim($r['caption']);
if( $txt[0]=='{' ){
$txt = trim(substr( $txt,strpos( $txt,'}')+1 ));
}else if( $txt[0]=='[' ){
$txt = trim(substr( $txt,strpos( $txt,']')+1 ));
}
echo "<td id=n{$r['indent']}>";
if( $r['type']=='F' ){
if( $r['indent']==0 ){
echo '<img src=g/tree_0.gif>';
}else{
echo '<img src=g/tree_1.gif>';
}
}
echo $txt;
if( $_PrintToPDF ) $usuCursor[$nr][0] = str_repeat(chr(8),$r['indent']*3).$txt;
}
for( $n=0; $n<$TTree; $n++ ){
echo '<td>'.(($OpEn[$r['cd_gs_op']][$n+1]==1) ? 'P':'¬');
$usuCursor[$nr][$n+1] = (($OpEn[$r['cd_gs_op']][$n+1]==1) ? 'S':' ');
}
echo '<td>&nbsp;';
$nr++;
}
if( $_PrintToPDF ){
$_Form[] = explode('|','Opcion|Col0|N|T|50||-|||');
$_ALIGN = array('');
for( $n=0; $n<$TTree; $n++ ){
$_ALIGN[$n+1] = 'C';
$_Form[] = explode('|',$NomArbol[$n].'|Col1|N|T|1||-||=|');
}
$PDF_Grid = true;
$_TITLE = 'ARBOL DE OPCIONES';
function PintaCondiciones(){}
function EnPlural($txt){return $txt;}
eInit();
@include( '../_datos/config/pdf.ini' );
include_once( $Dir_.'pdf_lista.gs' );
eEnd();
}
echo '<tr height=1px style="font-size:1px">';
echo '<td height=1px style="font-size:1px">';
for( $n=0; $n<$TTree; $n++ ) echo '<td><div style="width:25px;height:1px"></div>';
echo '<td>';
?>
</table>
</div>
</table>
<script type="text/javascript">
top.eLoading(0,window);
</script>
</BODY></HTML>
<?PHP
eEnd();
function make_Txt($cd_tree){
$TXT_generation_path = '../tree/';
UnloadTabla("{$_SESSION['ShareDictionary']}gs_tree", $TXT_generation_path.'_gs_tree_.txt');
UnloadTabla("{$_SESSION['ShareDictionary']}gs_op"  , $TXT_generation_path.'_gs_op_.txt');
$qry = "select * from {$_SESSION['ShareDictionary']}gs_op where cd_tree='{$cd_tree}' order by seq";
qQuery($qry);
while( $r=qArray() ){
$ama[]=array('tipo'=>$r['type'],'indent'=>$r['indent'],'texto'=>$r['caption'],'tip'=>$r['tip'],'id'=>$r['id'],'surl'=>$r['script_url'],'subtree_opt'=>$r['subtree_opt']);
}
$indice=0;
$qry="select * from {$_SESSION['ShareDictionary']}gs_tree where cd_tree='{$cd_tree}' order by cd_gs_tree";
qQuery($qry,$p1);
while( $r=qArray($p1) ){
$cod=$r['cd_gs_tree'];
$filename=trim($r['filename']);
if( $filename[0]=='_' ) continue;
$fi = $TXT_generation_path . $filename;
@unlink($fi);
if(!$handle = fopen($fi, 'a')) return '10.('.$filename.') Error converting to txt';
$quitar_indent_uno=0;
if( $r['rmvfstlvl'] == 'S' ){
$quitar_indent_uno=1;
}
$ac=count($ama);
for( $k=0; $k<$ac; $k++){
if( substr($ama[$k]['subtree_opt'],$indice,1) != '1' ) continue;
if( $ama[$k]['indent']==0 && $quitar_indent_uno==1 ){
continue;
}
$s='';
for( $j=0; $j< ($ama[$k]['indent']-$quitar_indent_uno) ;$j++){
$s.="\t";
}
$ama[$k]['surl']=stripslashes($ama[$k]['surl']);
if( trim($ama[$k]['tip'])=='' ){
$s.= $ama[$k]['texto'] . "\t|". $ama[$k]['surl'] . "\t~". trim($ama[$k]['id']) . "\n";
}else{
$s.= $ama[$k]['texto'] . "\t|". $ama[$k]['surl'] . "\t~". trim($ama[$k]['id']) .'~'.trim($ama[$k]['tip']). "\n";
}
if (!fwrite($handle, $s )) return '20.('.$filename.') Error converting to txt';
}
$indice++;
fclose($handle);
}
return 'Menus generated succesfully';
}
function UnloadTabla( $sTABLA, $File ){
qQuery( "SELECT * FROM {$sTABLA}" );
$fd = fopen( $File, 'w' );
$TReg = 0;
$Pipa = false;
while( $linea = qRow() ){
$txt = '';
if( $Pipa ) $txt .= "\n";
$Pipa = false;
foreach( $linea as $valor ){
if( $Pipa ){
$txt .= '|';
}else{
$Pipa = true;
}
$valor = str_replace(chr(13).chr(10),'#%0A#%0B#',$valor);
$txt .= trim((string)$valor);
}
fputs( $fd, $txt );
$TReg++;
}
fclose($fd);
}
?>
