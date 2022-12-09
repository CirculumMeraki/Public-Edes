<?PHP
eHTML().'</HEAD>';
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
eInclude($_Sql);
qQuery( "select cd_gs_tree from gs_user where cd_gs_user={$_User}" );
list( $TreePersonal ) = qRow();
if( !isset($TIPO) ) $TIPO = 0;
$TIPO = 1;
$cd_tree = 'MASTER';
if( isset($OPSAVE) ){
list( $op, $Estado ) = explode( ',', $OPSAVE );
switch( $Estado ){
case 'A':
qQuery( "insert into gs_permission_op values ( {$_User}, {$op}, '' )" );
break;
case 'P':
qQuery( "insert into gs_permission_op values ( {$_User}, {$op}, 'S' )" );
break;
case 'B':
qQuery( "delete from gs_permission_op where cd_gs_user={$_User} and option_id={$op}" );
break;
default:
exit;
}
?>
<SCRIPT type="text/javascript">
top.eInfo(window,top.eLng(27),0.3);
</SCRIPT>
<?PHP
eEnd();
}
$TTree = 0;
qQuery( "select nm_gs_tree, description from {$_SESSION['ShareDictionary']}gs_tree where cd_tree='{$cd_tree}' order by cd_gs_tree" );
while( $r = qRow() ){
$TTree++;
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
BACKGROUND: #fff6cf;
}
#o {
DISPLAY: none;
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
.TreePar {
CURSOR: pointer;
TEXT-ALIGN: center;
}
.THTreePar {
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
.TreePar {
cursor:default;
}
<?PHP  } ?>
</style>
<?PHP
if( $_SESSION['_D_']=='~' ) _FileNoCache('edes.js');
?>
<SCRIPT type="text/javascript">
var _FILAS;
function ColorDeFondo(){
var cssFiltro = top.eGetCss(window.frameElement.WOPENER,'BODY','FILTER');
if( cssFiltro!='' ){
var n = cssFiltro.indexOf('=',cssFiltro.indexOf('endcolor'))+1;
document.body.style.backgroundColor = cssFiltro.substr(n,7);
}else{
document.body.style.backgroundColor = top.eGetCss(window.frameElement.WOPENER,'BODY','BACKGROUND');
}
}
function MarcaOp( TD, EsPadre ){
if( EsPadre ){
if( TD.to==0 ){
}
}else{
var op = '';
if( TD.to==1 ){
if( TD.M==undefined ){
TD.innerHTML = '<img src="g/tf_0.gif">';
TD.M = 0;
op = 'A';
}else if( TD.M==0 ){
TD.innerHTML = '&nbsp;';
TD.M = undefined;
op = 'B';
}else{
}
}else{
if( TD.M==undefined ){
TD.innerHTML = '<img src="g/tf_1.gif">';
TD.M = 1;
op = 'P';
}else if( TD.M==1 ){
TD.innerHTML = '&nbsp;';
TD.M = undefined;
op = 'B';
}else{
}
}
top.eCallSrv( window, "edes.php?E:$a/d/permission_op.gs&OPSAVE="+TD.parentNode.n+','+op );
}
}
function AjustaCeldas(){
ColorDeFondo();
var O = document.all.BROWSE.rows[0].cells;
var D = document.all.BROWSETH.rows[0].cells
D[0].width = parseInt(O[0].offsetWidth)+parseInt(O[1].offsetWidth) - 4;
_FILAS = BROWSE.rows;
}
var _OnOff = new Array();
function OnOff(){
var TD = Obj = S.event(window);
if( Obj.cellIndex==0 && Obj.all.length==1 ) Obj = Obj.parentNode.cells[0].children[0];
if( Obj.tagName=='IMG' ){
if( Obj.parentNode.cellIndex == 0 ){
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
}else{
TD = TD.parentNode;
}
}
if( TD.tagName!='TD' ) return;
var Columna = TD.cellIndex;
var Fila = sFila = TD.parentNode.rowIndex;
if( Fila==_FILAS.length-1 ) return;
if( Columna==0 ) return;
var Nivel = sNivel = _FILAS[Fila].cells[0].id.substr(1)*1;
MarcaOp( _FILAS[Fila].cells[Columna], false );
_OnOff[_OnOff.length] = new Array(Fila,Columna);
if( Fila > 0 ){
Fila--;
Nivel--;
while( Fila>=0 && _FILAS[Fila].cells[0].id && Nivel >= 0){
if( 'n'+Nivel == _FILAS[Fila].cells[0].id ){
MarcaOp( _FILAS[Fila].cells[Columna], true );
Nivel--;
}
Fila--;
}
}
Fila = sFila + 1;
Nivel = sNivel + 1;
while( _FILAS[Fila].cells[0].id >= 'n'+Nivel && sNivel<Nivel && Fila<_FILAS.length-1 ){
MarcaOp( _FILAS[Fila].cells[Columna], true );
Fila++;
}
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
echo '<center>';
echo '<table border=0px cellspacing=0px cellpadding=0px w_idth=100% height=100%>';
echo '<tr><td>';
echo '<table id=BROWSETH>';
echo '<TH class=THOption>OPCIONES ';
echo '<img src=g/tree_1.gif onclick=VerTodo() title="Mostrar todas las opciones">';
echo '<img src=g/tree_2.gif onclick=Ver2Resumen() title="Mostrar dos niveles">';
echo '<img src=g/tree_0.gif onclick=VerResumen() title="Mostrar solapas">';
echo '</table>';
echo '<tr><td height=100%>';
echo '<div id=Container style="overflow:auto; height:100%; width:100% padding:0px;">';
if( $TIPO==0 ){
echo '<table id=BROWSE>';
}else{
echo '<table id=BROWSE onclick="OnOff()">';
}
echo '<col class=Option>';
echo '<col class=TreePar style="width:25px">';
$uTree = array();
if( eSqlType('mysql,mysqli') ){
qQuery( "select * from {$_SESSION['ShareDictionary']}gs_op where cd_tree='{$cd_tree}' and substr(subtree_opt,{$TreePersonal},1)='1' order by seq" );
}else{
qQuery( "select * from {$_SESSION['ShareDictionary']}gs_op where cd_tree='{$cd_tree}' and subtree_opt[{$TreePersonal},{$TreePersonal}]='1' order by seq" );
}
while( $r=qArray() ) $uTree[$r['id']] = 1;
$uOpcion = array();
qQuery( "select * from gs_permission_op where cd_gs_user={$_User} order by option_id" );
while( $r=qArray() ){
$uOpcion[$r['option_id']] = ( (trim($r['visible'])=='') ? 'N' : trim($r['visible']) );
}
if( eSqlType('mysql,mysqli') ){
qQuery( "select * from {$_SESSION['ShareDictionary']}gs_op where cd_tree='{$cd_tree}' and substr(subtree_opt,1,1)='1' order by seq" );
}else{
qQuery( "select * from {$_SESSION['ShareDictionary']}gs_op where cd_tree='{$cd_tree}' and subtree_opt[1,1]='1' order by seq" );
}
$c = 0;
while( $r=qArray() ){
if( $r['status']=='' ) $r['status'] = '0';
echo '<tr n='.$r['id'];
if( $r['indent'] > 1 ) echo ' id=o';
echo '>';
if( $r['caption']=='-' ){
echo "<td id=n{$r['indent']}><img src=g/linea.gif width=100% height=2>";
}else{
$txt = trim($r['caption']);
if( $txt[0]=='{' ){
$txt = trim(substr( $txt,strpos( $txt,'}')+1 ));
}else if( $txt[0]=='[' ){
$txt = trim(substr( $txt,strpos( $txt,']')+1 ));
}
$TO = '';
if( $uTree[$r['id']] == 1 ){
echo "<td id=n{$r['indent']}>";
$TO = ' to=1';
}else{
echo "<td id=n{$r['indent']} style='color:red'>";
$TO = ' to=0';
}
if( $r['type']==0 ){
if( $r['indent']==0 ){
echo '<img src=g/tree_0.gif>';
}else{
echo '<img src=g/tree_1.gif>';
}
}
echo $txt;
}
if( $uOpcion[$r['id']]!='' ){
if( $uOpcion[$r['id']]=='S' ){
echo "<td{$TO} M=1><img src='g/tf_1.gif'>";
}else{
echo "<td{$TO} M=0><img src='g/tf_0.gif'>";
}
}else{
echo "<td{$TO}>&nbsp;";
}
}
echo '<tr height=1px style="font-size:1px">';
echo '<td height=1px style="font-size:1px">';
echo '<td><div style="width:25px;height:1px"></div>';
?>
</table>
</div>
</table>
</center>
<script type="text/javascript">
top.eBodyBackground(window);
top.eLoading(0,window);
</script>
</BODY></HTML>
<?PHP
eEnd();
function make_Txt($cd_tree){
$TXT_generation_path = '../tree/';
UnloadTabla( "{$_SESSION['ShareDictionary']}gs_tree", $TXT_generation_path.'_gs_tree_.txt' );
UnloadTabla( "{$_SESSION['ShareDictionary']}gs_op"  , $TXT_generation_path.'_gs_op_.txt' );
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
