<?PHP
eInit(1,1);
?>
<style>
BODY {
margin:3px;
FONT-FAMILY: arial;
}
IMG {
margin: 3px;
}
#Contenedor {
border:1px solid #000000;
padding:2px;
background:#aaaaaa;
}
.uMenu {
FONT-FAMILY: arial;
}
.uMenu IMG {
cursor:pointer;
}
#Contenedor IMG {
margin-left: 3px;
}
#ImgOriginal {
border:1px solid #000000;
}
.InfoDIV {
margin-left: 3px;
margin-right: 3px;
}
<?PHP
if( $_Type=='V' ){
}
eFileGetVar('FileManager', true);
if( $PathFileManager=='' ) $PathFileManager = '/'.'/img';
switch( $_Type ){
case 'V':
if( $PathVideos!='' ) $PathFileManager = $PathVideos;
break;
case 'A':
if( $PathNoisiness!='' ) $PathFileManager = $PathNoisiness;
break;
case 'S':
if( $PathSounds!='' ) $PathFileManager = $PathSounds;
break;
case 'P':
if( $PathPicture!='' ) $PathFileManager = $PathPicture;
break;
case 'I':
if( $PathIcons!='' ) $PathFileManager = $PathIcons;
break;
case 'D':
if( $PathDocuments!='' ) $PathFileManager = $PathDocuments;
break;
default:
eMessage('Tipo de documento no definido','HES');
}
$Path = $PathFileManager;
if( substr($Path,0,2)=='/'.'/' ) $Path = substr($Path,1);
if( substr($Path,-1)!='/' ) $Path .= '/';
if( substr($PathFileManager,-1)!='/' ) $PathFileManager .= '/';
?>
</style>
<script type="text/javascript">
top.eLoading(0,window);
function ConZoom(n){
DGI('BtnZoom1').style.display = DGI('BtnZoom100').style.display = 'none';
if( document.body.offsetWidth < DGI("Contenedor").offsetWidth || document.body.offsetHeight < DGI("Contenedor").offsetHeight ){
DGI('BtnZoom1').style.display = 'block';
if( n!=undefined ) uZoom(1);
}
document.body.scroll = ( document.body.offsetWidth < document.body.scrollWidth || document.body.offsetHeight < document.body.scrollHeight ) ? 'yes':'no';
}
var _ImgSeleccionada=null;
function uSeleccionar(){
var Obj = S.event(window);
if( Obj.tagName!='IMG' ) return top.eClearEvent(null,window);
if( S.toTag(Obj,'TABLE').SinSeleccion==1 ) return top.eClearEvent(null,window);
_ImgSeleccionada = Obj;
var Ancho = document.body.offsetWidth;
var Alto = document.body.offsetHeight;
DGI('ImgOriginal').Nombre = Obj.Nombre;
DGI('ImgOriginal').Extension = Obj.getAttribute('Extension');
DGI('ImgOriginal').src = '';
if( Obj.getAttribute('CR')=='S' ){
var txt = Obj.src.replace('<?=$Path?>t','<?=$Path?>o').split('<?=$Path?>');
DGI('ImgOriginal').src = 'edes.php?E:$watermark.gs&FILE="/'+'<?=$Path?>'+txt[1]+'"';
}else{
DGI('ImgOriginal').src = Obj.src.replace('<?=$Path?>t','<?=$Path?>o');
}
DGI('TotRecortes').textContent = Obj.getAttribute('Recortes');
DGI('TxtRecortes').style.display = DGI('TotRecortes').style.display = DGI('BtnRecortarAn').style.display = DGI('BtnRecortarOr').style.display = DGI('BtnRecortarSi').style.display = ( Obj.getAttribute('Recortes') > 0 ) ? 'block':'none';
var Byts = Obj.getAttribute('bytes');
var PPI = ( (Obj.getAttribute('PPI')>0) ? ' / '+Obj.getAttribute('PPI')+'ppi' : '' );
var Detalles = Obj.getAttribute('Ancho')+'x'+Obj.getAttribute('Alto')+' / '+Byts+'KB'+PPI+' / '+Obj.getAttribute('Extension');
DGI('InfoDIV').textContent = Detalles;
DGI("Contenedor").setAttribute('CR',Obj.getAttribute('CR'));
DGI("Contenedor").setAttribute('Recortes',Obj.getAttribute('Recortes'));
DGI("Contenedor").setAttribute('NRecorte',0);
DGI("Contenedor").rows[1].style.display = 'block';
DGI("Contenedor").rows[1].cells[0].children[0].CR = Obj.getAttribute('CR');
DGI("Contenedor").rows[1].cells[0].children[0].style.width = '';
DGI("Contenedor").rows[1].cells[0].children[0].style.height = '';
var TABLA = DGI("Contenedor");
while( TABLA.rows.length>2 ) TABLA.deleteRow(2);
if( parseInt(Obj.getAttribute('Recortes')) > 0 ){
var Cod = DGI('ImgOriginal').src.replace('//','/').split('<?=$Path?>');
Cod = Cod[1].split('.');
top.eCallSrv( window, 'edes.php?E:$a/d/fm_recorteshow.gs&CopyOf='+Cod[0] );
}
var xy = top.eXY(Obj);
DGI("Contenedor").style.display = 'block';
if( xy[0] + DGI("Contenedor").offsetWidth > Ancho ){
xy[0] = Ancho - DGI("Contenedor").offsetWidth;
if( xy[0]<0 ) xy[0] = 0;
}
if( xy[1] + DGI("Contenedor").offsetHeight > Alto ){
xy[1] = Alto - DGI("Contenedor").offsetHeight;
if( xy[1]<0 ) xy[1] = 0;
}
if( xy[0]<0 ) xy[0] = 0;
if( xy[1]<0 ) xy[1] = 0;
DGI("Contenedor").style.left = xy[0];
DGI("Contenedor").style.top = xy[1]+document.body.scrollTop;
setTimeout('ConZoom(1)',250);
}
function uInformacion(){
var Obj = S.event(window);
if( Obj.tagName!='IMG' ) return top.eClearEvent(null,window);
return top.eClearEvent(null,window);
}
function uOcultar(){
if( DGI('BtnZoom1').style.display=='block' && event.type=='mouseleave' ) return;
DGI("Contenedor").style.display = 'none';
document.body.scroll = ( document.body.offsetWidth < document.body.scrollWidth || document.body.offsetHeight < document.body.scrollHeight ) ? 'yes':'no';
return top.eClearEvent(null,window);
}
var _Type = '<?= $_Type; ?>';
function uGetImg(){
<?PHP if( $_GET['_SelectionFunction']!='' ){ ?>
var Obj = S.event(window);
if( Obj.getAttribute('CR')=='S' ){
var tmp = (Obj.src+'').replace(/"/g,'').split('FILE=');
}else{
var tmp = (Obj.src+'').split('?R:');
}
Cod = tmp[1].split('.');
Cod = Cod[0].replace('//','/').replace('<?=$Path?>','');
if( _Type=='V' ){
var Caratula = tmp[1];
tmp = tmp[1].split('.');
_WOPENER.<?=$_GET['_SelectionFunction']?>( tmp[0]+'.'+Obj.Extension, Cod.replace(/o/g,''), Obj.Nombre, Caratula );
}else{
_WOPENER.<?=$_GET['_SelectionFunction']?>( tmp[1], Cod.replace(/o/g,''), Obj.Nombre );
}
setTimeout('top.eSWClose(window);',1);
<?PHP }	?>
return top.eClearEvent(null,window);
}
function uCarpetaDestino(){
var Dir = top.eDirectorySelect( 'Seleccionar directorio', 'MyComputer', true );
if( Dir!='' ){
DGI('CarpetaDestino').Carpeta = Dir;
DGI('CarpetaDestino').src = (DGI('CarpetaDestino').src+'').replace('_0.','_1.');
DGI('CarpetaDestino').title = 'Carpeta de destino:\n'+Dir;
WE.eFileWriteAll(WE._DirEDes+'imgpath.put',Dir );
setTimeout("DGI('Contenedor').style.display = 'block';",100);
}
}
function uDescargar(){
if( DGI('CarpetaDestino').Carpeta=='' ){
top.eInfo(window,'Falta definir la carpeta de destino');
}else{
top.eInfo(window,'Descargando Fichero...',-1);
var p = DGI("Contenedor").NRecorte;
var Obj = DGI("Contenedor").rows[p+1].cells[0].children[0];
if( Obj.getAttribute('CR')=='S' ){
var tmp = (Obj.src+'').replace(/"/g,'').split('FILE=');
top.eFileGet( tmp[1]+'&WATERMARK=1', DGI('CarpetaDestino').Carpeta+'\\'+tmp[1].substring(6) );
}else{
if( _Type=='V' ){
top.eInfo(window,'Descargando Fichero en segundo plano...',5);
var tmp = (Obj.src+'').split('?R:');
Cod = tmp[1].split('.');
Cod = Cod[0].replace('//','/').replace('<?=$Path?>','');
tmp = tmp[1].split('.');
top.eFileGetAsync( tmp[0]+'.'+Obj.Extension, DGI('CarpetaDestino').Carpeta+'\\'+Cod+'.'+Obj.Extension );
}else{
var tmp = (Obj.src+'').split('?R:');
top.eFileGet( tmp[1], DGI('CarpetaDestino').Carpeta+'\\'+tmp[1].substring(6) );
}
}
if( _Type!='V' ) top.eInfo(window,'Fichero descargado',1);
}
}
function uZoom(n){
DGI('BtnZoom1').style.display = 'none';
DGI('BtnZoom100').style.display = 'none';
DGI("Contenedor").rows[1].cells[0].children[0].style.width = '';
DGI("Contenedor").rows[1].cells[0].children[0].style.height = '';
DGI("Contenedor").style.left = 0;
DGI("Contenedor").style.top = 0;
if( n==1 ){
DGI('BtnZoom100').style.display = 'block';
var pImg = document.body.offsetWidth / document.body.offsetHeight;
var pSrc = DGI("Contenedor").offsetWidth / DGI("Contenedor").offsetHeight;
if( pImg > pSrc ){
var Menos = DGI("Contenedor").offsetHeight - DGI("Contenedor").rows[1].cells[0].children[0].offsetHeight + 2;
DGI("Contenedor").rows[1].cells[0].children[0].style.height = parseInt(document.body.offsetHeight)-Menos;
}else{
var Menos = DGI("Contenedor").offsetWidth - DGI("Contenedor").rows[1].cells[0].children[0].offsetWidth + 2;
DGI("Contenedor").rows[1].cells[0].children[0].style.width = parseInt(document.body.offsetWidth)-Menos;
}
}else{
DGI('BtnZoom1').style.display = 'block';
}
DGI("Contenedor").style.width = DGI("Contenedor").style.height = "1px";
document.body.scroll = ( document.body.offsetWidth < DGI("Contenedor").offsetWidth || document.body.offsetHeight < DGI("Contenedor").offsetHeight ) ? 'yes':'no';
if( n==1 ){
var Ancho = document.body.offsetWidth;
var Alto = document.body.offsetHeight;
var xy = top.eXY(_ImgSeleccionada);
DGI("Contenedor").style.display = 'block';
DGI("Contenedor").style.width = '';
DGI("Contenedor").style.height = '';
if( xy[0] + DGI("Contenedor").offsetWidth > Ancho ) xy[0] = Ancho - DGI("Contenedor").offsetWidth;
if( xy[0]<0 ) xy[0] = 0;
if( xy[1] + DGI("Contenedor").offsetHeight > Alto ) xy[1] = Alto - DGI("Contenedor").offsetHeight;
if( xy[1]<0 ) xy[1] = 0;
DGI("Contenedor").style.left = xy[0];
DGI("Contenedor").style.top = xy[1];
}
return top.eClearEvent(null,window);
}
function IrA( i ){
if( i==-2 ){
for( var n=1; n<DGI("Contenedor").rows.length; n++ ) DGI("Contenedor").rows[n].style.display = 'block';
return top.eClearEvent(null,window);
}
for( var n=1; n<DGI("Contenedor").rows.length; n++ ) DGI("Contenedor").rows[n].style.display = 'none';
if( i==0 ){
DGI("Contenedor").rows[1].style.display = 'block';
}else{
var p = DGI("Contenedor").NRecorte + i;
if( p > DGI("Contenedor").Recortes ) p = 0;
if( p < 0 ) p = parseInt(DGI("Contenedor").Recortes);
DGI("Contenedor").NRecorte = p;
DGI("Contenedor").rows[p+1].style.display = 'block';
}
}
</script>
</head>
<body onclick='uSeleccionar()' on-contextmenu='uInformacion()' onselectstart='return false;' onhelp='return false;'>
<table id='Contenedor' border=0 cellspacing=0 cellpadding=0 style='position:absolute;left:0px;top:0px;display:none' onmouseleave='uOcultar()' Contenedor=0>
<tr><td>
<table class='uMenu' border=0 cellspacing=0 cellpadding=0 SinSeleccion=1>
<tr>
<td><img src='g/swclose.gif' onclick='uOcultar()' title='Cerrar ventana'></td>
<td><img src='edes.php?R:$a/g/an_backup.gif' title='Descargar' onclick='uDescargar()'></td>
<td><img src='edes.php?R:$a/g/c2_0.gif' title='Carpeta de destino' id=CarpetaDestino Carpeta='' onclick='uCarpetaDestino()'></td>
<td id=BtnZoom1><img src='edes.php?R:$a/g/zoom_1.png' onclick='uZoom(1)' title='Ajustar la imagen al espacio'></td>
<td id=BtnZoom100 style='display:none'><img src='edes.php?R:$a/g/zoom_100.png' onclick='uZoom(100)' title='Imagen real' id=BtnZoom></td>
<td><img src='g/ts_pg_pr.gif' title='Recorte Anterior' id=BtnRecortarAn onclick="IrA(-1)"></td>
<td><img src='g/img_recorte.png' title='Imagen Original' id=BtnRecortarOr onclick="IrA(0)" oncontextmenu="IrA(-2)"></td>
<td><img src='g/ts_pg_nx.gif' title='Recorte Siguiente' id=BtnRecortarSi onclick="IrA(1)"></td>
<td style='cursor:default' id=TxtRecortes>&nbsp;Recortes:&nbsp;</td>
<td style='cursor:default' id=TotRecortes style='padding-right:3'>0</td>
</tr>
</table>
</td></tr>
<tr><td><img id='ImgOriginal' src='' onclick='uOcultar()' oncontextmenu='uGetImg()'><div id=InfoDIV class='InfoDIV'></div></td></tr>
</table>
<?PHP
$nr = 0;
if( $_Type=='V' ){
while( $r=qRow() ){
$nr++;
$Ext = explode('.',$r[1]);
$Ext = $Ext[count($Ext)-1];
echo '<img src="edes.php?R:'.$PathFileManager.$r[0].'.'.$Ext.'" style="height:100"';
echo ' Nombre="'.eQuote($r[2]).'"';
echo ' Bytes="'.eNumberFormat($r[8]/1024).'"';
echo ' Ancho="'.$r[9].'"';
echo ' Alto="'.$r[10].'"';
echo ' Extension="'.$r[12].'"';
echo '>';
}
}else if( $_Type=='P' ){
$Prefijo = 't';
while( $r=qRow() ){
echo '<img '.(($r[1]=='S')?'CR=S ':'').'src="edes.php?R:'.$PathFileManager.$Prefijo.$r[0].'.'.$r[12].'" Nombre="'.eQuote($r[2]).'" Recortes="'.$r[13].'"';
echo ' Quality="'.$r[7].'"';
echo ' PPI="'.$r[8].'"';
echo ' Bytes="'.eNumberFormat($r[9]/1024).'"';
echo ' Ancho="'.$r[10].'"';
echo ' Alto="'.$r[11].'"';
echo ' Extension="'.$r[12].'"';
echo '>';
$nr++;
}
}else{
while( $r=qRow() ){
echo '<img '.(($r[1]=='S')?'CR=S ':'').'src="edes.php?R:'.$PathFileManager.$Prefijo.$r[0].'.'.$r[11].'" Nombre="'.eQuote($r[1]).'" Recortes="0"';
echo ' Quality="'.$r[6].'"';
echo ' PPI="'.$r[7].'"';
echo ' Bytes="'.eNumberFormat($r[8]/1024).'"';
echo ' Ancho="'.$r[9].'"';
echo ' Alto="'.$r[10].'"';
echo ' Extension="'.$r[11].'"';
echo '>';
$nr++;
}
}
?>
<script type="text/javascript">
if( top.eFileExists(WE._DirEDes+'imgpath.put') ){
DGI('CarpetaDestino').Carpeta = WE.eFileReadAll(WE._DirEDes+'imgpath.put');
DGI('CarpetaDestino').src = (DGI('CarpetaDestino').src+'').replace('_0.','_1.');
DGI('CarpetaDestino').title = 'Carpeta de destino:\n'+DGI('CarpetaDestino').Carpeta;
}
</script>
</body></html>
<?PHP
eEnd();
