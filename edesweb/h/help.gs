<?PHP
if( !isset($_SESSION['_User']) ) exit;
error_reporting(5);
$gestor_de_errores_anterior = set_error_handler( "" );
$_MenuIntervalo = 12;
$_MenuAcortar	 = 2;
$_MenuNivel		 = 2;
$NomFile = $_DirEDes.'h/i/'.$_GET['File'].'.ind';
$DimSolapa = array();
$Arbol = array();
MemorizaArbol( $NomFile, $DimSolapa, $Arbol );
eHTML();
?>
<STYLE>
BODY {
BACKGROUND: #ADBEC6;
FONT-FAMILY: ARIAL;
FONT-SIZE: 15px;
MARGIN: 0px;
}
#OpMenu {
SCROLLBAR-3DLIGHT-COLOR: #789aab;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #5a7380;
SCROLLBAR-DARKSHADOW-COLOR: #5a7380;
SCROLLBAR-FACE-COLOR: #5a7380;
SCROLLBAR-HIGHLIGHT-COLOR: #5a7380;
SCROLLBAR-SHADOW-COLOR: #789aab;
SCROLLBAR-TRACK-COLOR: #789aab;
}
.FormaMenu {
BORDER-BOTTOM: #4c5960 1px solid;
BORDER-LEFT: #4c5960 1px solid;
BORDER-RIGHT: #4c5960 1px solid;
PADDING-TOP: 3;
PADDING-LEFT: 3;
}
#NewSolapas {
CURSOR: hand;
FONT-SIZE: 12px;
}
.FormaSolapas {
BACKGROUND: #4c5960;
BORDER-BOTTOM: #4c5960 0px solid;
BORDER-LEFT: #4c5960 0px solid;
BORDER-RIGHT: #4c5960 0px solid;
BORDER-TOP: #4c5960 0px solid;
PADDING-LEFT: 3px;
}
#OpMenu TABLE TD {
FONT-SIZE: 12px;
color: #000000;
}
#OpOn_1 {
BACKGROUND: #ffed9f;
COLOR: #6f00ff;
}
#OpOn_0 {
BACKGROUND: #ADBEC6;
COLOR: #000000;
}
IMG {
CURSOR: hand;
VERTICAL-ALIGN: middle;
margin-right: 2;
}
.out {
COLOR: #ffff00;
}
.over {
BACKGROUND: #ffed9f;
COLOR: #6f00ff;
}
#o {
DISPLAY: none;
}
#v {
DISPLAY: block;
}
</STYLE>
<SCRIPT type="text/javascript">
var _EditaHelp = false;
function OnOff( el ){
var Obj = ( null == el ) ? event.srcElement : el;
Obj.src = ( Obj.src.indexOf('_0.') > -1 ) ? Obj.src.replace('_0.','_1.') : Obj.src = Obj.src.replace('_1.','_0.');
_EditaHelp = ( Obj.src.indexOf('_1.') > -1 );
}
</SCRIPT>
</HEAD>
<BODY oncontextmenu='return false;' onhelp='return false' scroll=no>
<?PHP
echo '<TABLE height=100% width=100% cellspacing=0 cellpadding=0 border=0>';
echo '<TR><TD>';
echo '<TABLE id=NewSolapas class="FormaSolapas" ESTADO=0 width=100% cellspacing=1 cellpadding=0>';
for( $n=1; $n<count($DimSolapa)+1; $n++ ){
if( $n > 1 ){
echo '<TR id=o>';
}else{
echo '<TR>';
}
$TipoId = 'OpOn_0';
echo "<TD valign=middle align=center nOp={$n} id={$TipoId} a={$DimSolapa[$n]['H']}>";
echo '<span style="width:100%;height:24px;vertical-align:baseline;padding-top:4;cursor:default;">'.$DimSolapa[$n]['T'];
if( substr_count('~',$_SESSION['_D_'])==1 || file_exists('../_d_/usr/edhelp.'.$_User) ){
echo '<IMG id=_CheckEdHelp SRC="edes.php?R:$t/g/e/2_check_0.gif" onclick="OnOff()" TITLE="Editar Ayuda" style="margin-left:10">';
}
echo '</span>';
}
echo '</TABLE>';
echo '</TD>';
echo '<TD rowspan=3><IFRAME name=Pag src="edes.php?R:$h/fondo_indice.htm" width="100%" height="100%" FRAMEBORDER=0 SCROLLING=no></IFRAME>';
echo '</TR>';
echo '<TR><TD width=180 height=100% class="FormaMenu">';
echo '<div id=OpMenu class="AnchoMenu" style="margin:0; width:100%; height:100%; cursor:hand; overflow:auto; float:left; scroll:auto;">';
CreaMenu( $Arbol );
echo '</div>';
echo '</TD></TR>';
echo '</TABLE>';
echo '<script type="text/javascript">';
?>
function SubMenuHide(){
for( var i=0; i < NewSolapas.rows.length; i++ ){
NewSolapas.rows[i].style.display = ( i+1 != _nSolapa ) ? 'none' : 'block';
}
document.getElementById('sm'+_nSolapa).style.display = 'block';
NewSolapas.ESTADO = 0;
NewSolapas.onmouseleave = '';
}
function MenuClick(){
var oTD = event.srcElement;
if( oTD.tagName == 'IMG' ) oTD = oTD.parentElement;
if( oTD.tagName != 'TD' ) return;
var oTR = oTD.parentElement;
var oTABLE = oTR.parentElement.parentElement;
if( NewSolapas.ESTADO == 1 ){
_nSolapa = oTD.nOp;
SubMenuHide();
return;
}
document.getElementById('sm'+_nSolapa).style.display = 'none';
for( var i=0; i < NewSolapas.rows.length; i++ ) NewSolapas.rows[i].style.display = 'block';
NewSolapas.ESTADO = 1;
NewSolapas.onmouseleave = SubMenuHide;
}
function MenuOver(){
var oTD = event.srcElement;
if( oTD.tagName == 'IMG' ) oTD = oTD.parentElement;
if( oTD.tagName != 'TD' ) return;
oTD.id = 'OpOn_1';
}
function MenuOut(){
var oTD = event.srcElement;
if( oTD.tagName == 'IMG' ) oTD = oTD.parentElement;
if( oTD.tagName != 'TD' ) return;
oTD.id = 'OpOn_0';
}
var _UltOpcion = '#';
NewSolapas.onmouseover = MenuOver;
NewSolapas.onmouseout = MenuOut;
OpMenu.onmouseover = OpOver;
OpMenu.onmouseout = OpOut;
OpMenu.onclick = OpClick;
document.focus();
document.onselectstart = new Function("return false");
</script>
</body></html>
<?PHP
function MemorizaArbol( $NomFile, &$DimSolapa, &$Arbol ){
global $_DirEDes;
$fd = fopen($NomFile,'r');
$Visible = '';
$n = count($Arbol);
while( !feof($fd) ){
$buffer = fgets($fd,512);
if( ord($buffer[0]) == 10 ) continue;
if( substr(trim($buffer),0,1)=='.' || substr($buffer,0,6)=='[help]' || substr($buffer,0,6)=='[edit]' ){
if( substr($buffer,0,6)=='[edit]' ){
list( ,$GLOBALS['_Plantilla'] ) = explode( '&PLANTILLA=', $buffer );
list( $GLOBALS['_Plantilla'] ) = explode( '&', $GLOBALS['_Plantilla'] );
}
continue;
}
$tmp = ltrim($buffer);
if( strlen($buffer) < 3 ) continue;
$nivel = strpos( $buffer, $tmp[0] );
$n++;
list( $buffer, $nAyuda ) = explode(chr(126),$buffer);
list( $Arbol[$n][0], $Arbol[$n][1] ) = explode('|',$buffer);
$Arbol[$n][0] = trim( $Arbol[$n][0] );
$Arbol[$n][1] = trim( $Arbol[$n][1] );
$Arbol[$n][2] = $nivel;
$Arbol[$n][3] = trim($nAyuda);
$buffer = trim($Arbol[$n][0]);
if( substr($Arbol[$n][1],-5) == ':this' ) $Arbol[$n][1] = substr($Arbol[$n][1],0,-4).$Arbol[$n][3];
if( substr($Arbol[$n][1],-7) == ':parent' ){
$i = $n-1;
while( $i>0 ){
if( $Arbol[$n][2] > $Arbol[$i][2] ){
$Arbol[$n][1] = substr($Arbol[$n][1],0,-6).$Arbol[$i][3];
break;
}
$i--;
}
}
if( $nivel==0 && $buffer[0]!='[' ){
$graf = '';
if( $buffer[0]=='{' ){
$sOp = $buffer;
$graf = substr( $sOp,1, strpos( $sOp,'}' )-1 );
$buffer = trim(substr( $sOp,strpos( $sOp,'}')+1 ));
}
$tOp++;
if( $tOp > 1 ) $TipoId = 'OpOff_0';
$buffer = trim($buffer);
if( $tOp==$_MaxVisibleTabs+1 ) $Visible=' style="display:none" ';
$DimSolapa[$tOp][T] = $buffer;
$DimSolapa[$tOp][G] = $graf;
$DimSolapa[$tOp][A] = $Arbol[$n][1];
$DimSolapa[$tOp][H] = $Arbol[$n][3];
}
}
fclose($fd);
}
function RecuperaArbol( $NomFile, &$Arbol, &$n ){
if( file_exists($NomFile) != 1 && is_readable($NomFile) != 1 ) return;
$fd = fopen( $NomFile, 'r' );
$Todo = fread($fd,filesize($NomFile));
fclose($fd);
$buffer = explode( chr(10), gzuncompress( $Todo ) );
if( $buffer[0] == substr( $NomFile,strrpos($NomFile,'/')+1 ) ){
for( $i=1; $i<count($buffer); $i++ ){
if( ord($buffer[$i][0]) != 10 ){
$tmp = ltrim($buffer[$i]);
if( $tmp != '' ){
$nivel = strpos( $buffer[$i], $tmp[0] );
$n++;
list( $Arbol[$n][0], $Arbol[$n][1] ) = explode('|',$buffer[$i]);
$Arbol[$n][0] = trim( $Arbol[$n][0] );
$Arbol[$n][1] = trim( $Arbol[$n][1] );
$Arbol[$n][2] = $nivel;
list( $tmp1, $tmp2 ) = explode(chr(126),$Arbol[$n][1]);
$Arbol[$n][1] = trim($tmp1);
$Arbol[$n][3] = trim($tmp2);
}
}
}
}
}
function CreaMenu( $sArbol ){
global $_MenuNivel;
$_DimGraf = array();
$aNivel = $MaxNivel = 0;
$VerNivel = -1;
$NumMenu = 0;
$sDoc = $sOp = '';
$tOp = count($sArbol);
$SaltoLinea = '';
for( $n = 1; $n <= $tOp; $n++ ){
$aNivel = $sArbol[$n][2];
$sDoc   = trim($sArbol[$n][1]);
$sOp    = trim($sArbol[$n][0]);
if( $aNivel == 0 ){
if( $NumMenu > 0 ){
echo $SaltoLinea;
echo '</table>';
}
$NumMenu++;
echo $SaltoLinea;
if( $sOp[0]=='[' ) $GLOBALS['_MenuTools'] = $NumMenu;
echo "<table id=sm{$NumMenu} cellspacing=0 cellpadding=0 cols=1 style='width:100%";
if( $NumMenu > 1 ) echo ';display:none';
echo "'>";
}else{
echo $SaltoLinea;
$Oculto = ( $aNivel > 1 ) ? ' id=o' : '';
$MaxNivel = Max( $aNivel, $MaxNivel );
if( $VerNivel == $aNivel ){
$Oculto = '';
$aNivel = $aNivel*-1;
}else{
$VerNivel = -1;
}
$graf = 'doc_0';
if( $n < $tOp ){
if( abs($aNivel) < $sArbol[$n+1][2] ){
if( $aNivel <= $_MenuNivel ){
$graf = "c{$aNivel}_0";
}else{
$graf = "c{$_MenuNivel}_0";
}
}
}
$xOp = "<IMG SRC='edes.php?R:".'$'."h/g/{$graf}.gif'>";
$_DimGraf[$graf] = "edes.php?R:".'$'."h/g/{$graf}.gif";
echo "<tr{$Oculto}><td id={$aNivel}";
if( $graf != 'doc_0' && $sArbol[$n][3]!='' ) echo " a={$sArbol[$n][3]}";
if( substr_count( $sOp, '+' ) > 0 ){
list($NmHelp,$NmSufijo) = explode('+',$sOp);
if( $NmSufijo!='' ){
echo ' F='.$NmHelp.'_'.$NmSufijo;
$sOp = $NmHelp;
}
}else if( substr_count( $sOp, '{' ) > 0 ){
list($NmLabel,$NmHelp) = explode('{',$sOp);
list($NmHelp) = explode('}',$NmHelp);
echo ' F='.$NmHelp;
$sOp = $NmLabel;
}
echo '>'.$xOp;
echo $sOp;
}
}
echo '</TABLE>';
$txt = '';
while( list($clave, $val) = each($_DimGraf) ){
if( substr_count( $val, '.' ) == 0 ) $val .= '.gif';
$txt .= "{$val}|";
}
?>
<SCRIPT type="text/javascript">
var NomGif = '<?= $txt; ?>'.split('|');
var _Gif = new Array();
for( var i=0; i<NomGif.length-1; i++ ){
var d = NomGif[i].split('/');
d = d[d.length-1];
d = d.split('.');
_Gif[d[0]] = new Image();
_Gif[d[0]].src = NomGif[i];
if( d[0].search('_0') > -1 ){
d[0] = d[0].replace('_0','_1');
_Gif[d[0]] = new Image();
_Gif[d[0]].src = NomGif[i].replace('_0','_1');
}
}
function Trim( txt ){
return txt = txt.replace(/^\s+/g, '').replace(/\s+$/g, '');
}
function SwapImg( oImg, Ori, Des ){
if( oImg != undefined ){
var t = oImg.src.split('/');
t = t[t.length-1].split('.');
t[0] = t[0].replace(Ori,Des);
oImg.src = _Gif[t[0]].src;
}
}
function TonoColor( cIni, cFin, tTonos, iTono ){
var i, v, p=1, txt='';
var Ini = new Array(), Fin = new Array();
for( i=0; i<6; i+=2 ){
Ini[p] = (eval('0x'+cIni.charAt(i))*16)+(eval('0x'+cIni.charAt(i+1)));
Fin[p] = (eval('0x'+cFin.charAt(i))*16)+(eval('0x'+cFin.charAt(i+1)));
p++;
}
for( i=1; i<4; i++ ){
v = Ini[i]+Math.floor(Math.abs(Fin[i]-Ini[i])/tTonos*iTono);
txt += ((Math.floor(v/16)).toString(16)).toUpperCase() + ((v-(Math.floor(v/16)*16)).toString(16)).toUpperCase();
}
return txt;
}
function IniArbol(){
var iPadding = 10, iColor = '#ADBEC6';
<?PHP
if( $MaxNivel==0 ) $MaxNivel = 0;
echo "var MaxNivel = {$MaxNivel};";
echo "var Intervalo = {$GLOBALS[_MenuIntervalo]}, Acortar = {$GLOBALS[_MenuAcortar]};";
?>
var punto = 0, IncrPadding = 0;
iColor = Trim(iColor).replace('#','');
for( var i=1; i<MaxNivel+1; i++ ){
NewColor = TonoColor( iColor, 'FFFFFF', 65, punto );
document.styleSheets[0].addRule( '.'+i+'out', 'background: '+NewColor );
document.styleSheets[0].addRule( '#'+i, 'padding-left: '+IncrPadding );
IncrPadding += iPadding;
punto += Intervalo;
Intervalo -= Acortar;
}
var TArboles = <?= $NumMenu; ?>;
for( var i=0; i<TArboles; i++ ){
var oTR = document.getElementById( 'sm'+(i+1) ).rows;
for( var r=0; r < oTR.length; r++ ){
if( oTR[r].cells[0].id == 1 ){
oTR[r].HV = 0;
}else if( oTR[r].cells[0].id < 0 ){
oTR[r].HV = 1;
oTR[r].cells[0].id = oTR[r].cells[0].id * -1;
}else{
oTR[r].HV = 0;
}
oTR[r].cells[0].className = oTR[r].cells[0].id+'out';
}
}
}
IniArbol();
function OpClick(){
var oTD = event.srcElement;
if( oTD.tagName == 'IMG' ) oTD = oTD.parentElement;
if( oTD.tagName != 'TD' ) return;
if( oTD.id == 'Linea' ) return;
var oTR = oTD.parentElement;
var oTABLE = oTR.parentElement.parentElement;
var oImg = oTD.firstChild;
var xHR = '';
if( oImg.src.indexOf('doc_') > -1 ){
if( _UltOpcion != '#' ) SwapImg(_UltOpcion,'_1','_0');
_UltOpcion = oImg;
SwapImg(oImg,'_0','_1');
xHR = oTD.HR + '';
if( oTD.F==undefined ){
var Etiqueta = oTD.innerText.toLowerCase();
}else{
var Etiqueta = oTD.F.toLowerCase();
}
var Ori = ' αινσϊόρη';
var Des = '_aeiouunc';
for( var n=0; n<Ori.length; n++ ) Etiqueta = Etiqueta.replace( eval('/'+Ori.substr(n,1)+'/g'), Des.substr(n,1) );
if( _EditaHelp ){
window.Pag.location.href = 'edes.php?AE:$h/'+Etiqueta+'.htm&T=D&&PLANTILLA=<?=$GLOBALS['_Plantilla']?>&TRACE=Manual eDes';
}else{
window.Pag.location.href = 'edes.php?R:$h/'+Etiqueta+'.htm';
}
return;
}
var i = oTR.rowIndex+1;
var aNivel = parseInt(oTD.id)+1;
if( oTR.HV == 0 ){
oTR.HV = 1;
SwapImg(oImg,'_0','_1');
while( i < oTABLE.rows.length && oTD.id < oTABLE.rows[i].cells[0].id && oTABLE.rows[i].cells[0].id != 'Linea' ){
oTABLE.rows[i].HV = 0;
if( aNivel == oTABLE.rows[i].cells[0].id ) oTABLE.rows[i].style.display = 'block';
i++;
}
}else{
oTR.HV = 0;
SwapImg(oImg,'_1','_0');
while( i < oTABLE.rows.length && oTD.id < oTABLE.rows[i].cells[0].id && oTABLE.rows[i].cells[0].id != 'Linea' ){
oTABLE.rows[i].HV = 0;
oTABLE.rows[i].style.display = 'none';
SwapImg(oTABLE.rows[i].cells[0].firstChild,'_1','_0');
i++;
}
}
}
function OpOver(){
var oTD = event.srcElement;
if( oTD.tagName == 'IMG' ) oTD = oTD.parentElement;
if( oTD.tagName == 'TD' && oTD.id != 'Linea' ) oTD.className = 'over';
}
function OpOut(){
var oTD = event.srcElement;
if( oTD.tagName == 'IMG' ) oTD = oTD.parentElement;
if( oTD.tagName == 'TD' && oTD.id != 'Linea' ) oTD.className = oTD.id+'out';
}
</SCRIPT>
<?PHP
}
?>
