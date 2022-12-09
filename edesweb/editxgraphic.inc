<?= eHTML('$editxgraphic.inc'); ?>
<?=_FileNoCache('edes.js')?>
<?PHP
eInclude( $_Sql );
if( $OPTION=='X' ) GenerarTexto();
if( $OPTION=='G' ) GenerarGrafico();
if( substr($ZONAS,-1)==',' ) $ZONAS = substr($ZONAS,0,-1);
list( $TZonas, $NomCampo ) = explode(',',$ZONAS);
qQuery( "select * from w_grafico where cd_w_grafico={$IMG}" );
$r=qArray();
$OLDIMG = '/http/w_test/http/g/sg'.$IMG.'.'.$r['extension'];
$NEWIMG = '/http/w_test/http/g/_t'.$IMG.'.'.$r['extension'];
$IMGTMP = '/http/w_test/http/g/_x'.$IMG.'.gif';
$IMG    = '/http/w_test/http/g/sg'.$IMG.'.'.$r['extension'];
$xSIZE = 20;
$xCOLOR = 'FF9933';
if( substr($IMG,1,1)==':' ){
}else{
$IMG = "edes.php?R:{$IMG}";
}
?>
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
.Color1, .Color2, .Color3, .Color4, INPUT {
border: 1px solid #000000;
}
.sZONA {
border: 1px solid #000000;
}
</style>
<?= eLink('editxgraphic') ?>
</HEAD>
<BODY onload=eInit()>
<TABLE border=0px cellspacing=0px cellpadding=0px width=100% height=100%>
<TR>
<TD width=100% height=100% align=center valign=middle ID=ZONAMOVE>
<img id=IMAGEN src='<?=$IMG?>' s_tyle='position:absolute;top:50px;left:50px;'>
</TD>
</TR>
<TR>
<TD>
<TABLE ID=MENU border=0 style='cursor:pointer' width=100% cellspacing=1px cellpadding=0>
<TR>
<TD style='cursor:default'>&nbsp;Fuente:</TD>
<TD width=1><SELECT NAME="FUENTE">
<?PHP
qQuery( 'select * from w_truetype where favorita="S" order by orden' );
while( $r=qArray() ){
echo "<OPTION VALUE='{$r['cd_w_truetype']}'>{$r['nm_w_truetype']}";
}
?>
</SELECT></TD>
<TD style='cursor:default'>&nbsp;&nbsp;Tamaño:</TD>
<TD><INPUT name=ALTO type=TEXT size=3 value=<?=$xSIZE?> style='text-align:right;width:28'></TD>
<TD onclick='dlgColor()'>&nbsp;&nbsp;Color:</TD>
<TD onclick='Color()' class=Color1>&nbsp;&nbsp;&nbsp;</TD>
<TD onclick='Color()' class=Color2>&nbsp;&nbsp;&nbsp;</TD>
<TD onclick='Color()' class=Color3>&nbsp;&nbsp;&nbsp;</TD>
<TD onclick='Color()' class=Color4>&nbsp;&nbsp;&nbsp;</TD>
<TD><INPUT name=COLOR type=TEXT size=6 value=<?=$xCOLOR?> style='text-align:center;width:55'></TD>
<TD width=100%><TEXTAREA NAME="TEXTO" ROWS="1" COLS="60" MAXLENGTH=2000 style='width:100%' readOnly>&euro;</TEXTAREA></TD>
<TD style='cursor:pointer' class=sZONA onclick='GenerarTXT();' title='Generar Texto'>&nbsp;Generar&nbsp;Texto&nbsp;</TD>
<TD><img onclick='Grabar()' src='edes.php?R:$a/g/an_grabar.gif' title='Aceptar datos' onclick=''></TD>
</TR>
</TABLE>
</TD>
</TR>
</TABLE>
<img id=ZONA nZONA=0 src='' onselectstart='return false' onclick=eCapture2() on_mousedown=eCapture() on_mousemove=eMove() on_mouseup=eStop() on_mouseout=eStop()
style='cursor:crosshair;border:0px solid red;position:absolute;top:0px;left:0px;display:none'>
</img>
<SCRIPT type="text/javascript">
var Obj;
var IMAGEN;
var _swOnDrag = false, _swX, _swY, _swC;
var _ObjX, _ObjY;
var _Factor = 1;
var _GrabarEn;
function eInit(){
Obj = DGI('ZONA');
IMAGEN = DGI('IMAGEN');
_swC = Obj;
_ObjX = parseInt(IMAGEN.offsetLeft);
_ObjY = parseInt(IMAGEN.offsetTop );
var DimFields = '<?=$FIELDS?>'.split(',');
_GrabarEn = DimFields[1];
var txt = _WOPENER.DGI(DimFields[0]).value;
txt = txt.replace(/{precio}/g,_WOPENER.document.all.precio.value);
txt = txt.replace(/#/g,document.all.TEXTO.value);
document.all.TEXTO.value = txt;
if( _WOPENER.DGI(DimFields[1]).value!='' ){
var Dim = _WOPENER.DGI(DimFields[1]).value.split(',');
var x = Dim[0];
var y = Dim[1];
_swC.style.posLeft = px(_ObjX + x*1);
_swC.style.posTop  = px(_ObjY + y*1);
_Zonas[0][0] = x;
_Zonas[0][1] = y;
document.all.COLOR.value = Dim[2];
document.all.ALTO.value = Dim[3];
document.all.FUENTE.value = Dim[4];
GenerarTXT();
}
}
function eMove(){
if( !_swOnDrag ) return;
var x = _swX + event.clientX;
var y = _swY + event.clientY;
if( x < 0 ) x = 0;
if( y < 0 ) y = 0;
if( x + _swC.clientWidth + 0 >= document.body.clientWidth ){
x = document.body.clientWidth - _swC.clientWidth - 0;
}
if( y + _swC.clientHeight + 0 >= document.all.ZONAMOVE.clientHeight ){
y = document.all.ZONAMOVE.clientHeight - _swC.clientHeight - 0;
if( y < 0 ) y = 0;
}
_swC.style.posLeft = px(x);
_swC.style.posTop = px(y);
_Zonas[Obj.nZONA][0] = x-_ObjX;
_Zonas[Obj.nZONA][1] = y-_ObjY;
}
function eStop(){
Obj.onmousemove = null;
document.all.IMAGEN.onmousemove = null;
document.all.ZONAMOVE.onmousemove = null;
}
function eCapture(){
_swX = parseInt(Obj.style.posLeft)-event.clientX;
_swY = parseInt(Obj.style.posTop )-event.clientY;
Obj.onmousemove = eMove;
document.all.IMAGEN.onmousemove = eMove;
document.all.ZONAMOVE.onmousemove = eMove;
Obj.onmouseup = eStop;
}
function eCapture2(){
_swOnDrag = !_swOnDrag;
if( _swOnDrag ){
eCapture();
}else{
eStop();
}
}
var _Zonas = new Array(Array(0,0));
function VerZona( n ){
Obj.style.posLeft = px(parseInt(_Zonas[n][0])+_ObjX);
Obj.style.posTop = px(parseInt(_Zonas[n][1])+_ObjY);
Obj.style.width  = px(_Zonas[n][2]);
Obj.style.height = px(_Zonas[n][3]);
Obj.style.display = 'block';
Obj.nZONA = n;
}
function Color(){
DGI("COLOR").value = S(S.event(window)).css("backgroundColor").substring(1).toUpperCase();
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
function dlgColor(){
var sColor = window.external.eColorDialog("#"+document.all.COLOR.value);
if( sColor!="" ) document.all.COLOR.value = sColor.substring(1);
}
function Grabar(){
var txt = _Zonas[0][0]+','+_Zonas[0][1]+','+document.all.COLOR.value+','+document.all.ALTO.value+','+document.all.FUENTE.value
_WOPENER.DGI(_GrabarEn).value = txt;
top.eSWClose(window);
}
function ePost(url, Campos){
var txt = "<?=eHTML('','','',true)?></HEAD><BODY style='padding:0px; margin:0px;'>"+
'<FORM METHOD=POST ACTION="'+url+'" NAME="FRM1">';
var Dim = Campos.replace(/\s/g,'').split(',');
for(var n=0; n<Dim.length; n++){
txt += '<TEXTAREA NAME="'+Dim[n]+'">'+ DGI(Dim[n]).value +'</TEXTAREA>';
}
txt += '</FORM></BODY></HTML>';
top.TLF.frameElement.WOPENER = window;
top.TLF.document.write( txt );
top.TLF.document.close();
top.TLF.document.FRM1.submit();
}
function GenerarTXT(){
ePost( 'edes.php?E:$editxgraphic.inc&OPTION=X&IMG=<?=$IMGTMP?>', 'FUENTE, ALTO, COLOR, TEXTO' );
}
function GenerarGRAF(){
ePost( 'edes.php?E:$editxgraphic.inc&OPTION=G&OLDIMG=<?=$OLDIMG?>&NEWIMG=<?=$NEWIMG?>&X='+_Zonas[0][0]+'&Y='+_Zonas[0][1], 'FUENTE, ALTO, COLOR, TEXTO' );
}
</SCRIPT>
</BODY></HTML>
<?PHP
eEnd();
function GenerarTexto(){
$NomFuente = $_POST['FUENTE'].'.ttf';
$_POST['TEXTO'] = str_replace( 'â`¬','&#8364;', $_POST['TEXTO'] );
GrabaCadena( $NomFuente, $_POST['TEXTO'], $_POST['COLOR'], $_POST['ALTO'], $_GET['IMG'], '' );
?>
<SCRIPT type="text/javascript">
_WOPENER.document.all.ZONA.src = 'edes.php?R:<?=$_GET['IMG']?>?'+Date.parse(new Date());
_WOPENER.document.all.ZONA.style.display = 'block';
</SCRIPT>
</head><body>
<?PHP
exit;
}
function GenerarGrafico(){
$NomFuente = $_POST['FUENTE'].'.ttf';
$_POST['TEXTO'] = str_replace( 'â`¬','&#8364;', $_POST['TEXTO'] );
GrabaCadena( $NomFuente, $_POST['TEXTO'], $_POST['COLOR'], $_POST['ALTO'], $_GET['OLDIMG'], $_GET['NEWIMG'], $_GET['X'], $_GET['Y'] );
exit;
}
function GrabaCadena( $NomFuente, $Cadena, $Color, $AltoFont, $TmpIMG, $NewIMG, $X, $Y ){
$dir_fuentes = "../_datos/ttf/";
$NomFuente = $dir_fuentes.$NomFuente;
$Dim = ImageTTFBBox( $AltoFont, 0, $NomFuente, $Cadena );
$MargenY = $Dim[1];
$Ancho = $Dim[2]-$Dim[0];
$Alto = $Dim[1]-$Dim[7];
if( $NewIMG=='' ){
$imagen = imageCreate( $Ancho, $Alto );        //header("Content-type: image/gif");
}else{
$TmpIMG = eScript( $TmpIMG );
$NewIMG = eScript( $NewIMG );
$imagen = _eImgOpen($TmpIMG);
}
$Fondo = ImageColorAllocate($imagen,254,254,254);
$Color = imageColorAllocate($imagen, hexdec('0x'.$Color{0}.$Color{1}), hexdec('0x'.$Color{2}.$Color{3}), hexdec('0x'.$Color{4}.$Color{5}) );
imageColorTransparent( $imagen, $Fondo );
if( $Color[0]=='#' ) $Color = substr($Color,1);
imageTTFText( $imagen, $AltoFont, 0,$X, $Alto+$Y-$MargenY, $Color, $NomFuente, $Cadena );
if( $NewIMG=='' ){
imageGif( $imagen, eScript($TmpIMG) );
}else{
_eImgSave($imagen, $NewIMG);
}
imageDestroy($imagen);
clearstatcache();
}
