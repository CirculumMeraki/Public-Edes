<?PHP
if( !file_exists("g/logo.png") ){
eInit();
die('Falta el fichero "g/logo.png"');
}
if( !is_dir('../_tmp/sess') ){
eInit();
die('Falta el directorio "/_tmp/sess"');
}
if( !is_dir('../_tmp/lcl') ){
eInit();
die('Falta el directorio "/_tmp/lcl"');
}
if( $_DesktopWepe ){
setcookie('PHPSESSID', $_COOKIE['PHPSESSID'], 0, '/', '', false, true);
}else{
$_Desktop = $_SETUP["Desktop"];
$_Desktop["MenuAutoHidden"] = (($_Desktop["MenuAutoHidden"])?1:0);
$IconFolder = "©ª";
$IconDoc = "b";
if( $_Desktop["DefaultTreeIcon"] && $_Desktop["DefaultTreeIconChar"]<>"" ){
$dim = explode(",", $_Desktop["DefaultTreeIconChar"]);
$IconFolder = $dim[0].$dim[1];
$IconDoc = $dim[2];
}
$_Desktop["DefaultTreeFolder"] = explode(",", $_Desktop["DefaultTreeFolder"].",");
}
if( !function_exists("_FileNoCache") ){
function _FileNoCache($file, $inner=""){
$para = filemtime("../../edesweb/{$file}");
echo '<SCRIPT type="text/javascript"'.$inner.' SRC="edes.php?R:$'.$file.'&j='.$para.'" charset="ISO-8859-1"></SCRIPT>'.$GLOBALS['__Enter'];
}
}
$_SESSION['_eDes_'] += rand(0,99);
?>
<?PHP if( !$_DesktopWepe ){ ?>
<?PHP
eHTML('$desktop2_web.php', '', $_SETUP["Setup"]["TabTitle"]);
$logo = "";
if( file_exists("g/logo.ico") ) $logo = "logo";
if( $_Development && file_exists("g/logo_development.ico") ) $logo = "logo_development";
if( $logo!="" ) echo "<link id='FAVICON' rel='icon' href='g/{$logo}.ico' type='image/x-icon'/>";
?>
<?PHP }else{ ?>
<?PHP
if( file_exists("../tree/usr_{$_User}.txt") ){
eInit();
die("Acceso no autorizado");
}
?>
<?PHP } ?>
<?PHP
$factorZoom = 1;
$_SESSION['cssSufijo'] = "";
$dim = file("../_datos/config/core.css");
for($n=0; $n<count($dim); $n++){
$dim[$n] = trim($dim[$n]);
if( substr($dim[$n],0,7)=='$fBase:' ){
list(,$fBase) = explode(":",$dim[$n]);
list($fBase) = explode("px",$fBase);
}else if( substr($dim[$n],0,10)=='$fBaseBIG:' ){
list(,$fBaseBIG) = explode(":",$dim[$n]);
list($fBaseBIG) = explode("px",$fBaseBIG);
}else if( substr($dim[$n],0,10)=='$fBaseTLF:' ){
list(,$fBaseTLF) = explode(":",$dim[$n]);
list($fBaseTLF) = explode("px",$fBaseTLF);
}else if( substr($dim[$n],0,12)=='$fBaseSmall:' ){
list(,$fBaseSmall) = explode(":",$dim[$n]);
list($fBaseSmall) = explode("px",$fBaseSmall);
}
}
if( $_SESSION["_BYPHONE"] ){
$factorZoom = number_format($fBaseTLF/$fBase, 4);
$_SESSION['cssSufijo'] = "_tlf";
}
$_SESSION['zoomBIG'] = (int)$fBaseBIG / (int)$fBase;
$_SESSION['zoomTLF'] = (int)$fBaseTLF / (int)$fBase;
$_SESSION['zoomSmall'] = (int)$fBaseSmall / (int)$fBase;
$_SESSION['factorZoom'] = $factorZoom;
?>
<style title="styleCARD" name="styleCARD" type="NO" type="text/css">
<?PHP include($_SESSION['_PathCSS']."/list_card.css"); ?>
</style>
<?PHP if( !$_DesktopWepe ){ ?>
<style type="text/css">
<?PHP
echo ".TREEMAIN SVG, .TREEMIN SVG, .SUBTREE SVG {";
if( $_Desktop["SVGWidth"] !="" ) echo "width:" .($_Desktop["SVGWidth"]*1)."px !important;";
if( $_Desktop["SVGHeight"]!="" ) echo "height:".($_Desktop["SVGHeight"]*1)."px !important;";
echo "}";
echo ".TREEMAIN IMG, .TREEMIN IMG, .SUBTREE IMG {";
if( $_Desktop["IMGWidth"] !="" ) echo "max-width:" .($_Desktop["IMGWidth"]*1)."px !important;";
if( $_Desktop["IMGHeight"]!="" ) echo "max-height:".($_Desktop["IMGHeight"]*1)."px !important;";
echo "}";
echo ".TREEMAIN .UnPX SPAN:nth-child(1), .TREEMIN SPAN, .SUBTREE .UnPX SPAN:nth-child(1), .TREEMAIN .ICONHIDDEN, .SUBTREE .ICONHIDDEN {";
if( $_Desktop["BOXWidth"] !="" ) echo "width:" .($_Desktop["BOXWidth"]*1)."px !important;";
if( $_Desktop["BOXHeight"]!="" ) echo "height:".($_Desktop["BOXHeight"]*1)."px !important;";
echo "}";
$mh = max($_Desktop["SVGHeight"]*1, $_Desktop["IMGHeight"]*1);
if( $mh==0 ) $mh = 25;
$ma = max($_Desktop["SVGWidth"]*1, $_Desktop["IMGWidth"]*1);
if( $ma==0 ) $ma = 25;
?>
.TREEMAIN TR, .TREEMAIN SPAN, .TREEMAIN .ICONHIDDEN { height:<?=$mh?>px; }
.TREEMIN TR { height:<?=$mh?>px; }
.SUBTREE TR, .SUBTREE SPAN, .SUBTREE .ICONHIDDEN { height:<?=$mh?>px; }
</style>
<?PHP } ?>
<?PHP
if($_Desktop["JsdWidget"]) echo "<script data-jsd-embedded data-key='982bf560-5228-487a-8996-6c70a7b4d58f' data-base-url='https://jsd-widget.atlassian.com' src='https://jsd-widget.atlassian.com/assets/embed.js'></script>";
?>
<script type="text/javascript" src="<?=$_SERVER['REQUEST_SCHEME']?>://www.gstatic.com/charts/loader.js" charset="ISO-8859-1"></script>
<script type='text/javascript' charset="ISO-8859-1">
if(typeof(google)!="undefined") google.charts.load('current', {packages: ['corechart']});
</script>
<?=_FileNoCache('core.js',' Comment="Motor Javascript" id="eDesCore"')?>
<?PHP if( $_ChannelApplication || $_ChannelDevelopment ){ ?>
<script src="js/socket.io.js"></script>
<?PHP } ?>
<?PHP
?>
<script type="text/javascript" charset="ISO-8859-1" Comment="Carga Motor Javascript">
if( !/(Chrome|Google Inc|Opera|Vivaldi|Safari)/i.test(navigator.userAgent) ){
location.href = "edes.php?r:$nocompatible.htm&'"+escape(document.title)+"'";
}
if( window.frameElement!=null || top.location!=self.location ){
top.location.href = self.location.href;
}
S.sheetCopyOne(window, "desktop");
<?PHP if( $_SETUP["Setup"]["Notification"] ){ ?>
if( S.session.notification && S.session.notification.permission!=="granted" ){
S.session.notification.requestPermission();
location.href = "edes.php?r:$nonotification.htm&'"+escape(document.title)+"'";
}
<?PHP }else{ ?>
S.session.notification = false;
<?PHP } ?>
<?PHP
if( $_UrlStatus!="" ){
echo "try{ history.pushState({foo:'bar'}, '-*-', '{$_UrlStatus}'); }catch(e){}";
}else{
echo 'try{ history.pushState({foo:"bar"}, "-*-", (location.href+"").replace("edes.php?login2","edes.php")); }catch(e){}';
}
echo "top.S.init(window, 'all');";
?>
window.name = 'Main';
<?PHP
if( $_AlertCheck>0 ){
echo "S.alertCheck({$_AlertCheck});";
}
$SinNovedad = "true";
if( $_SETUP["Setup"]["ReportsNews"] ){
if( qCount('gs_novedad', "cdi>='{$_novedades_}'")>0 ){
$SinNovedad = "false";
}else{
$SinNovedad = "true";
}
}
echo "var _WEB_=true,".
"_Master=".(($_gsMaster=='~')?'true,':'false,').
"_WebMaster=".(($_SESSION['_WebMaster']=='S')?'true,':'false,').
"_M_='{$_gsMaster}',".
"_FontNumber='font-family:".$_SESSION["CSSDynamic"]["FontNumbers"]."',";
?>
_BYPHONE = <?= (($_SESSION["_BYPHONE"]) ? 'true' : 'false') ?>,
_factorZoom = <?= $factorZoom ?>,
_CdiNovedad = '<?= $_novedades_ ?>', _SinNovedad = <?= $SinNovedad ?>,
_User = <?= $_User ?>,
_Node = <?= $_Node ?>,
_Tree = <?= $_Tree ?>,
_Avisos = <?= ($_Avisos*60000); ?>,
_pAvisos = null,
_ymd = _D2S = '<?= date('Ymd'); ?>',
_ToDay = '<?= date('Y-m-d'); ?>',
_dmy = '<?= date('d-m-Y'); ?>',
_cdi = _Y2S = '<?= date('Y-m-d H:i:s'); ?>',
_CONTEXT = '<?=$_SESSION['_eDes_']?>'*1,
_Source="",
_WebOFF="", _WebUser="",
_NotificationWarning = null,
_ENTER = String.fromCharCode(10);
S.setup.language = "_<?=$_SESSION['_LANGUAGE_']?>"
S.exitMaxLife(<?=(($_SESSION['SessionMaxLife']-date("U"))/3600)?>, "La sesión caducará en 5 minutos.<br><b>La aplicación se cerrará.</b>");
S.marksSetup({
thousands:"<?=$_SESSION["_FormatNumber"][0]?>",
decimal:"<?=$_SESSION["_FormatNumber"][1]?>",
month:"<?=$_SESSION["_FormatP4"]?>",
date:"<?=$_SESSION["_FormatF4"]?>",
datetime:"<?=$_SESSION["_FormatCDI"]?>",
delimiter:"<?=$_SESSION["_FormatDelimiter"]?>",
phone:"<?=$_SESSION["_FormatT"]?>",
formatP4: ["<?=substr($_SESSION["_FormatP4EXP"],1,-1)?>", "<?=$_SESSION["_FormatP4TKNdb"]?>", "<?=substr($_SESSION["_FormatP4EXPdb"],1,-1)?>", "<?=$_SESSION["_FormatP4TKNuser"]?>"],
formatF4: ["<?=substr($_SESSION["_FormatF4EXP"],1,-1)?>", "<?=$_SESSION["_FormatF4TKNdb"]?>", "<?=substr($_SESSION["_FormatF4EXPdb"],1,-1)?>", "<?=$_SESSION["_FormatF4TKNuser"]?>"],
formatCDI: ["<?=substr($_SESSION["_FormatCDIEXP"],1,-1)?>", "<?=$_SESSION["_FormatCDITKNdb"]?>", "<?=substr($_SESSION["_FormatCDIEXPdb"],1,-1)?>", "<?=$_SESSION["_FormatCDITKNuser"]?>"],
formatT: ["<?=substr($_SESSION["_FormatTEXP"],1,-1)?>", "<?=$_SESSION["_FormatTTKNdb"]?>", "<?=substr($_SESSION["_FormatTEXPdb"],1,-1)?>", "<?=$_SESSION["_FormatTTKNuser"]?>"],
weekday: <?=$_SESSION["_FirstWeekDay"]?>
});
<?PHP
if( $_SESSION["3CX"]!="" ){
echo "S.setup.phonePrefix = '{$_SETUP['Setup']['Call3CXPrefix']}';";
echo "S.setup.phoneFeatures = '{$_SETUP['Setup']['Call3CXFeatures']}';";
}
?>
function _PaginarKey(){
var o = S.event(event);
if( o.type=="search" ) return true;
var win = S.windowFocus(),
k = S.eventCode(event);
if( typeof(win._Obj)=="undefined" || win._Obj!="L" ) return true;
if( win.DGI('BUSCAR')!=null && S.event(window).name=='BUSCAR' ) return true;
if( k==8 && !win._EdEditList ) return eClearEvent();
var Mas = '';
if( event.altKey ) Mas = 'a';
if( event.ctrlKey ) Mas = 'c';
if( event.shiftLeft ) Mas = 's';
if( k==17 ) return true;
if( ',114,116,122,a39,a37,a8,c53,c65,c69,c72,c79,c76,c73,c85,s121,'.indexOf(','+Mas+k+',')!=-1 ) return eClearEvent();
if( ',93,a36,a37,c81,'.indexOf(','+Mas+k+',')!=-1 ) return eClearEvent(1);
switch( k ){
case 36:
if( !win._PagIncremental ) win.Paginar('I');
break;
case 33:
if( !win._PagIncremental ) win.Paginar('<');
break;
case 34:
if( !win._PagIncremental ) win.Paginar('>');
break;
case 35:
if( !win._PagIncremental ) win.Paginar('F');
break;
case 38:
case 37:
if( DGI("BUSCAR")!=null && DGI("BUSCAR").value.length>0 ) Buscar(win.DGI("BUSCAR").value,-1);
break;
case 40:
case 39:
if( win.DGI("BUSCAR")!=null && win.DGI("BUSCAR").value.length>0 ) win.Buscar(win.DGI("BUSCAR").value, 1);
break;
case 80:
if( !win._ConImpresora && Mas=='c' ) eClearEvent();
break;
case 27:
if( win.window.frameElement && win.window.frameElement.CloseEsc ) top.eSWClose(win);
break;
case 112:
S.help(window, event);
break;
default:
if(k>=97 && k<=105 && win.document.activeElement.tagName!="INPUT"){
k-=96;
if( (win.DGI("HASTA").value*1)>=k ){
win.DGI("DESDE").value = (k==1)? 0:k;
win.Paginar("?");
}
}
}
}
</script>
<?PHP if( !$_DesktopWepe ){ ?>
<script type="text/javascript" charset="ISO-8859-1">
var _treeOpen, _treeClose;
function treeMain(oSPAN){
var oTR = S.event(window), y;
if( oTR.tagName!="TR" ) oTR = S.toTag(oTR, "TR");
if( /^(SECTIONLINE|LINEATR)$/.test(oTR.className) || S(oTR).attr("nivel")==null ) return S.eventClear(window);
var i = oTR.rowIndex+1,
oImg = oTR.cells[0].children[0],
oID = oTR.cells[0].id,
sID = "tab_"+((S.mid(oID,4,0)*1)+1),
carpeta = oTR.getAttribute("open"),
_FILAS = oSPAN.children[0].rows,
_tFILAS = _FILAS.length,
nivel = S(oTR).attr("nivel")*1, n,p,
y = S.xy(oTR)["ot"], y2,
calcLevel = (oSPAN==null)? false: S(oSPAN).attr("oneLevel")!=null;
if( calcLevel ){
if( !S(oSPAN).obj["niveles"] ){
S(oSPAN).obj["niveles"] = [];
if( nivel==1 ) S(oSPAN).obj["niveles"][0] = null;
}
}
if( carpeta==null ){
var migas=["<span class='endBreadcrumb'>"+oTR.cells[0].children[1].innerHTML+"</span>"],
url = oTR.getAttribute("op");
sID = ((S.mid(oID,4,0)*1)-1);
i-=2;
while( i>=0 ){
if( _FILAS[i].getAttribute("open")!=null && _FILAS[i].getAttribute("nivel")==sID ){
if( S.right(url,1)==":" && _FILAS[i].getAttribute("op") && _FILAS[i].getAttribute("op")[0]==":" ){
url = url+S.mid(_FILAS[i].getAttribute("op"),1,0);
}
migas.push(_FILAS[i].cells[0].children[1].innerHTML);
sID--;
}
if( sID<0 ) break;
i--;
}
if( S.isReady() ){
S.ejecute(window, url+="&_CONTEXT=<?=$_SESSION['_eDes_']?>", oTR, migas.reverse());
if( S(oSPAN).attr("eAutoHidden")==1 ) eAutoMenu(1);
}else{
top.eInfo(window, S.lng(220));
}
if( S(oSPAN).attr("eWithFilter")!=null ){
_TreeDefault();
var bakTR = oTR,
dimPadre = _OptionViewParent(oTR);
for(n=dimPadre.length-1; n>0; n--){
oTR = dimPadre[n];
if( oTR!=null ){
oTR.setAttribute("open", "+");
i = oTR.rowIndex+1;
oID = oTR.cells[0].id;
sID = "tab_"+((S.mid(oID,4,0)*1)+1);
S(oTR.cells[1].children[0]).html(_treeClose);
if( oImg.tagName=="IMG" ) oImg.src = oImg.src.replace('_0.','_1.');
while( i<_tFILAS && oID<_FILAS[i].cells[0].id ){
if( sID==_FILAS[i].cells[0].id ){
if( _FILAS[i].getAttribute("eNoShow")==null ) _FILAS[i].style.display = '';
if( !/^(SECTIONLINE|LINEATR)$/.test(_FILAS[i].className) && _FILAS[i].cells[0].children[0].tagName=="IMG" ) _FILAS[i].cells[0].children[0].src = _FILAS[i].cells[0].children[0].src.replace('_1.','_0.');
}
i++;
}
}
}
if( S("#search").length ) S("#search").val("");
S(".TREEMAIN").attr("eWithFilter",null);
S(oSPAN).block();
y2 = S.xy(bakTR)["ot"];
S.scrollSet(oSPAN, {left:0, top:Math.abs(y2-y)});
S(oSPAN).none();
}
}else if( carpeta=="+" ){
oTR.setAttribute("open", "-");
S(oTR.cells[1].children[0]).html(_treeOpen);
if( oImg.tagName=="IMG" ) oImg.src = oImg.src.replace('_1.','_0.');
while( i<_tFILAS && oID<_FILAS[i].cells[0].id ){
if( _FILAS[i].getAttribute("eNoShow")==null ) _FILAS[i].style.display = 'none';
if( _FILAS[i].getAttribute("open")!=null ){
_FILAS[i].setAttribute("open", "-");
S(_FILAS[i].cells[1].children[0]).html(_treeOpen);
if( !/^(SECTIONLINE|LINEATR)$/.test(_FILAS[i].className) && _FILAS[i].cells[0].children[0].tagName=="IMG" ) _FILAS[i].cells[0].children[0].src = _FILAS[i].cells[0].children[0].src.replace('_0.','_1.');
}
i++;
}
}else if( carpeta=="-" ){
if( calcLevel ){
if( S(oSPAN).obj["niveles"][nivel]!=null ){
var xTR = S(oSPAN).obj["niveles"][nivel],
xImg = xTR.cells[0].children[0],
xI = xTR.rowIndex+1;
xID = xTR.cells[0].id;
xTR.setAttribute("open", "-");
S(xTR.cells[1].children[0]).html(_treeOpen);
if( xImg.tagName=="IMG" ) xImg.src = xImg.src.replace('_1.','_0.');
while( xI<_tFILAS && xID<_FILAS[xI].cells[0].id ){
if( _FILAS[xI].getAttribute("eNoShow")==null ) _FILAS[xI].style.display = 'none';
if( _FILAS[xI].getAttribute("open")!=null ){
_FILAS[xI].setAttribute("open", "-");
S(_FILAS[xI].cells[1].children[0]).html(_treeOpen);
if( !/^(SECTIONLINE|LINEATR)$/.test(_FILAS[xI].className) && _FILAS[xI].cells[0].children[0].tagName=="IMG" ) _FILAS[xI].cells[0].children[0].src = _FILAS[xI].cells[0].children[0].src.replace('_0.','_1.');
}
xI++;
}
}
S(oSPAN).obj["niveles"][nivel] = oTR;
}
oTR.setAttribute("open", "+");
S(oTR.cells[1].children[0]).html(_treeClose);
if( oImg.tagName=="IMG" ) oImg.src = oImg.src.replace('_0.','_1.');
while( i<_tFILAS && oID<_FILAS[i].cells[0].id ){
if( sID==_FILAS[i].cells[0].id ){
if( _FILAS[i].getAttribute("eNoShow")==null ) _FILAS[i].style.display = '';
if( !/^(SECTIONLINE|LINEATR)$/.test(_FILAS[i].className) && _FILAS[i].cells[0].children[0].tagName=="IMG" ) _FILAS[i].cells[0].children[0].src = _FILAS[i].cells[0].children[0].src.replace('_1.','_0.');
}
i++;
}
if( S(oSPAN).class("?SUBTREE") ){
var sc = S.screen(window),
xy = S.xy(oSPAN);
if( (xy.y+xy.h)>sc.h ){
S(oSPAN).css({height:sc.h-xy.y});
}
}
}
S.eventClear(window);
}
function viewSubTree(o, on){
var oPadre = S(".TREEMIN"), tree;
if( on==2 ){
S(oPadre).obj["eView"] = "1";
S(".TREEMIN TD[eTree='"+S.mid(o.id,7,0)+"']").css(S.ruleGet(top,".TREEMIN .HEADERSTATIC"));
S(".TREEMIN TD[eTree='"+S.mid(o.id,7,0)+"'] SVG").css(S.ruleGet(top,".TREEMIN .HEADERSTATIC SVG"));
}else if( on==3 ){
S(o).none();
S(oPadre).obj["eView"] = "";
S(".TREEMIN TD[eTree='"+S.mid(o.id,7,0)+"']").css("background-color:;color:");
S(".TREEMIN TD[eTree='"+S.mid(o.id,7,0)+"'] SVG").css("fill:");
}else{
tree = o.getAttribute("eTree");
if( on ){
var type = S(o).around("#SUBTREE"+tree, {type:"2,3,4,17"});
if( type.x==0 ){
S("#SUBTREE"+tree).css({height:S.screen(window).h});
S(o).around("#SUBTREE"+tree, {type:"2,3,4,17"});
}
oPadre.obj["eView"] = "";
}else{
setTimeout(function(){
if( oPadre.obj["eView"]=="" ){
S("#SUBTREE"+tree).none();
}
}, 10);
}
}
}
function treeIcons(){
var ah  = S(".TREEMAIN").attr("eAutoHidden"),
aho = S(".TREEMAIN").attr("eAutoHiddenOptional"),
wMain = S(".TREEMAIN").obj.offsetWidth,
wMin  = S(".TREEMIN").obj.offsetWidth,
icon = S.event(window), tit;
if( ah==1 || aho==1 ) S("#_TREEBUTTON").hidden();
if( aho==1 && wMain==0 && wMin==0 ){
S(".TREEMIN").none();
S(".TREEMAIN").block();
tit = S(icon).attr("eTitleOn");
}else if( wMin==0 || (wMain>0 && wMin>0) ){
S(".TREEMAIN").none();
S(".TREEMIN").block();
tit = S(icon).attr("eTitleOff");
}else{
S(".TREEMIN").none();
S(".TREEMAIN").block();
tit = S(icon).attr("eTitleOn");
}
if( tit ) S(icon).attr("title", tit);
}
function treeStateLine(o){
if( event && event.ctrlKey ) S.session.runInWindow = S.date('u');
if( o['eTR'] ){
S(o['eTR']).eventFire('click');
}
}
function _ReajustaDesktop(){
<?PHP if( $_Desktop["MenuAutoHidden"]==1 ){ ?>
var oTree = S(".TREEMAIN").obj,
ocultar = (oTree.offsetWidth==0);
if( ocultar ) S(oTree).block();
var xy = S.xy(".TREEMAIN"),
h = (S(".HEADER").obj.offsetHeight/2) - (S("#_TREEBUTTON").obj.offsetHeight/2);
S(".TREEMAIN").css({
position:"absolute",
left: xy.x,
top:xy.y,
width:xy.w,
height:S.xy("#DESKTOPHEIGHT").h
});
if( ocultar ) S(oTree).none();
<?PHP } ?>
var xy = S.xy(".TREEMAIN"),
h = (S(".HEADER").obj.offsetHeight/2) - (S("#_TREEBUTTON").obj.offsetHeight/2);
S(window).rule("+#_TREEBUTTON {	top:calc(50% + "+h+"px) !important; }");
}
function _OptionViewParent(tr){
var nivel = tr.getAttribute("nivel")*1,
itr = tr.rowIndex, pNivel = nivel-1, padre = [];
while( nivel>=0 && itr>=0 ){
if( tr.getAttribute("nivel")==nivel ){
padre.push(tr);
if( tr.getAttribute("eNoShow")==null ) tr.style.display = "";
nivel = (tr.getAttribute("nivel")*1)-1;
}
itr--;
tr = tr.previousSibling;
}
return padre;
}
function _OptionSeek(obj){
var k = S.eventCode(event);
if( k==undefined || k==27 ) S(obj).val("");
else if( !(event.type=="focusout" || k==13 || k==9) ) return true;
var val = S.lower(S.trim(obj.value)), n;
if( val=="" ){
if( S(".TREEMAIN").attr("eWithFilter")!=null ){
_TreeDefault();
S(".TREEMAIN").attr("eWithFilter",null);
}
return S.eventClear(window);
}
if( /^(\+|\*|\-)$/.test(val) ){
if( S(".TREEMAIN").obj.offsetWidth==0 ){
S("#_TREEBUTTON").hidden();
S(".TREEMAIN").block();
}
if( val=="-" ){
var efopen = S(".TREEMAIN").attr("efopen");
S(".TREEMAIN TR").none();
S(".TREEMAIN TR[nivel='0']").css("display","");
S(".TREEMAIN TR[open]").each(function(k,o){
o.setAttribute("open", "-");
o.cells[1].children[0].innerText = efopen;
});
}else{
var fClose = S(".TREEMAIN").attr("efclose");
S(".TREEMAIN TR").css("display","");
S(".TREEMAIN TR[open]").each(function(k,o){
o.setAttribute("open", "+");
o.cells[1].children[0].innerText = fClose;
});
}
return S.eventClear(window);
}
var lowerOn = S.setup.accent.lowerOn,
lowerOff = S.setup.accent.lowerOff,
com = "+.*()|=";
for(n=0; n<com.length; n++) val = S.replace(val, com[n], "\\"+com[n]);
val = S.replace(val, "?", ".");
for(n=0; n<lowerOn.length; n++) val = S.replace(val, lowerOn[n], lowerOff[n]);
for(n=0; n<5; n++){
val = S.replace(val, lowerOff[n], "("+lowerOff[n]+"|"+lowerOn[n]+"|"+lowerOn[n+5]+"|"+lowerOn[n+10]+"|"+lowerOn[n+15]+")");
}
var exp = new RegExp(val, "i");
if( !exp.test(S(".TREEMAIN").text()) ){
S(obj).info("Opción no encontrada",2);
return;
}
if( S(".TREEMAIN").obj.offsetWidth==0 ){
S("#_TREEBUTTON").hidden();
S(".TREEMAIN").block();
}
S(".TREEMAIN").attr("eWithFilter",1);
var oTD = S(".TREEMAIN TABLE TBODY TR td:nth-child(1)").dim,
t = oTD.length, i,nivel,tr,itr;
for(n=0; n<t; n++){
tr = oTD[n].parentElement;
if( val=="*" || exp.test(oTD[n].textContent) ){
_OptionViewParent(tr);
}else{
if( tr.getAttribute("eNoShow")==null ) tr.style.display = "none";
}
}
S.eventClear(window);
}
function _TreeDefault(){
var showNivel = "<?=($_Desktop["NumberLevels"]-1)?>",
_FILAS = S(".TREEMAIN TR").dim,
_tFILAS = _FILAS.length, i=0;
while( i<_tFILAS ){
if( _FILAS[i].getAttribute("eNoShow")==null ){
if( _FILAS[i].getAttribute("nivel")>=showNivel ){
if( _FILAS[i].getAttribute("nivel")>showNivel ){
_FILAS[i].style.display = 'none';
}else{
_FILAS[i].style.display = '';
}
if( _FILAS[i].getAttribute("open")!=null ){
_FILAS[i].setAttribute("open", "-");
S(_FILAS[i].cells[1].children[0]).html(_treeOpen);
if( !/^(SECTIONLINE|LINEATR)$/.test(_FILAS[i].className) && _FILAS[i].cells[0].children[0].tagName=="IMG" ) _FILAS[i].cells[0].children[0].src = _FILAS[i].cells[0].children[0].src.replace('_1.','_0.');
}
}else{
if( _FILAS[i].getAttribute("open")!=null ){
_FILAS[i].setAttribute("open", "+");
S(_FILAS[i].cells[1].children[0]).html(_treeClose);
if( !/^(SECTIONLINE|LINEATR)$/.test(_FILAS[i].className) && _FILAS[i].cells[0].children[0].tagName=="IMG" ) _FILAS[i].cells[0].children[0].src = _FILAS[i].cells[0].children[0].src.replace('_1.','_0.');
}
}
}
i++;
}
}
function eAutoMenuLeft(op){
if( op==undefined ){
var o = S.event(window);
if( o.tagName!="BODY" && o.id!="_TREEBUTTON" ){
return S.eventClear(window);
}
}
if( S(".TREEMIN").length && S(".TREEMIN").obj.offsetWidth>0 ){
}else if( event.type=="mouseover" || event.clientX==0 ){
if( S(".TREEMAIN").css("display")=="none" ){
S(".TREEMAIN").block();
S("#_TREEBUTTON").hidden();
}else{
S(".TREEMAIN").none();
S("#_TREEBUTTON").visible();
}
}
return S.eventClear(window);
}
S.Extend({
opEnable: function(a, tf){
var dim = S.nsp(a).split(","), n,o;
if( tf ){
for(n=0; n<dim.length; n++){
S("TR[eAlias='"+dim[n]+"']").attr({"eAliasBAK": dim[n], "eAlias": null, "eNoShow": null});
}
var ef = S(".TREEMAIN").attr("efOpen,efClose");
S([".TREEMAIN TR[nivel]", ".TREEMIN TR[nivel]", ".SUBTREE TR[nivel]"]).each(function(k,o){
n = o.getAttribute("nivel");
if( o.getAttribute("open")!=null ){
o.setAttribute("open","-");
S(o.cells[1].children[0]).html(ef["efClose"]);
}
if( n>0 ) S(o).none();
});
}else{
for(n=0; n<dim.length; n++){
S("TR[eAliasBAK='"+dim[n]+"']").attr({"eAlias": dim[n], "eAliasBAK": null, "eNoShow": 1}).none();
}
}
}
});
</script>
</head>
<body style="margin:0px;padding:0px;vertical-align:top;visibility:hidden;padding-left:1px;" onresize="_ReajustaDesktop()" onmouseover='eAutoMenuLeft()'>
<span class='MODAL' id='TAPAINIT' onselectstart='return S.eventClear(window)' style='position:absolute;z-index:9999999;width:100%;height:100%;'><!-- b-ackground-color:rgba(0,0,0,0.75); -->
<div class='loader' style='position:relative; top:50%; left:50%;'></div>
</span>
<?PHP if( $_Desktop["MenuAutoHidden"]==1 || $_Desktop["MenuAutoHiddenOptional"]==1 ){ ?>		<!-- Icono para mostrar el menú después de ocultarlo -->
<i class="ICONDESKTOP" id="_TREEBUTTON" onmouseover='eAutoMenuLeft()' title="Mostrar menú" style="position:fixed;z-index:9000;top:50%;left:0px;visibility:hidden">></i>	<!--  onclick="eAutoMenu(false)" -->
<?PHP } ?>
<table class="DESKTOP" border="0px" style="width:100%;height:100%;border:0px;border-collapse:collapse;padding:0px;margin:0px;" cellspacing="0px" cellpadding="0px">
<tr><td style="height1px;width:100%;padding:0px;">
<table class="HEADER SHADOW" style="width:100%;border:0px;border-collapse:collapse;" cellspacing=0px cellpadding=0px>
<tr>
<td style="white-space:nowrap;">
<?PHP
if( file_exists("../_datos/config/desktop_user_web.ini") ){
$sPHPIni = $_PHPINI;
$_PHPINI = file_get_contents("../_datos/config/desktop_user_web.ini");
_genContext();
file_put_contents("../_datos/config/desktop_user_web.tmp", $_PHPINI);
$_PHPINI = $sPHPIni;
unset($sPHPIni);
}
if( file_exists("../_datos/config/desktop_user_web.tmp") ){
$sPHPIni = $_PHPINI;
$_PHPINI = file_get_contents("../_datos/config/desktop_user_web.tmp");
_genContext();
$_PHPINI = $sPHPIni;
unset($sPHPIni);
include("../_datos/config/desktop_user_web.tmp");
}
?>
</td>
</tr>
</table>
</td></tr>
<tr><td id="DESKTOPHEIGHT" style="height:100%;padding:0px;">
<table style="width:100%;height:100%;border:0px;border-collapse:collapse;" cellspacing=0px cellpadding=0px>
<tr>
<td width=1px style="padding:0px;vertical-align:top">
<?PHP
include('../../edesweb/arbol.inc');
PintaMenu($_DimTree, true);
?>
</td>
<td width=100% style="padding:0px">	<!-- border-width:1px 1px 1px 0px;border-color:#96cfda;border-style:solid; -->
<table style="width:100%;height:100%;border:0px;border-collapse:collapse;" cellspacing=0px cellpadding=0px>
<tr><td style="padding-left:3px;height:1px;font-size:100%;cursor:default;" class="STATELINE-BOX">
<span id="STATELINE" onclick="treeStateLine(this);" style="visibility:hidden">&nbsp;</span>
</td></tr>
<tr><td height=100%>
<iframe frameborder=0px name="IWORK2" eNORESIZE=true src="" eAccess="1" style="width:100%;height:100%;display:none;"></iframe>
<iframe frameborder=0px name="IWORK" eNORESIZE=true src="<?=(($_StartURL<>"")? $_StartURL:"")?>" eAccess="2" style="width:100%;height:100%;"></iframe>
<table class='WINDOWLOADING' onclick='S(this).hidden();S.eventClear(window);' style='position:absolute'>
<tr><td align='center' valign='middle'>
<div class='loader'></div>
</td></tr>
</table>
</td></tr>
</table>
</td>
</tr>
</table>
</td></tr>
</table>
<?PHP }else if( isset($_WindowListStyle) ){ ?>
<i class="ICONDESKTOP OFF" id="_MINIMIZEDWINDOWS" onclick="S(this).windowList()" style='<?=$_WindowListStyle?>' title='Ventanas minimizadas'>W</i>
<?PHP } ?>
<div id="PROGRESS" style="display:none">
<table border=0px cellSpacing=0px cellPadding=0px style="width:100%;">
<tr><th class="progress-title"></th></tr>
<tr><td>
<div class="progress-wrap">
<div class="progress-value" style='background-image:url(<?=$_PathIMG?>/progress.png)'></div>
<div class="progress-text" style='background-image:url(<?=$_PathIMG?>/progress.png)'></div>
</div>
</td></tr>
<tr><td class="Detail"></td></tr>
</table>
</div>
<TABLE id=ContenedorHelp class='MODAL' style='background-color:transparent;z-index:99999999;position:absolute;left:0;top:0;width:100%;height:100%;cursor:default;display:none;'>
<TR><TD align=center valign=middle></TD></TR>
</TABLE>
<div class="PROGRESSUPLOAD" title="Enviando ficheros...">
<div id="PROGRESSVALUE">&nbsp;</div>
<div id="PROGRESSNUMBER">&nbsp;</div>
<div id="PROGRESFILE"></div>
</div>
<span id="PROGRESSCIRCLE">
<div id="PROGRESSCIRCLEVALUE"></div>
</span>
<audio id="SOUNDNOTIFICATION" src="g/aviso.wav"></audio>
<?PHP
if( $_ChannelApplication || $_ChannelDevelopment ){
include("../../edesweb/a/chat/rooms.php");
}
PintaMenu($_DimTree, false);
unset($_DimTree);
?>
<iframe frameborder="0px" src="" id="ICALL" name="TLF" eNORESIZE=true eAccess="3" style="z-index:10000; display:none;position:absolute;left:0px;top:0px;width:100%;height:200px;border-width:1px 1px 1px 0px;border-color:#9900cc;border-style:solid;"></iframe>
<?PHP
if( $_SESSION["3CX"]!="" ) echo '<a href="tel:" id="_Call3CX" style="display:none"></a>';
?>
<script type="text/javascript" charset="ISO-8859-1">
<?PHP if( !$_DesktopWepe ){ ?>
S(frames["IWORK"].frameElement).attr("WOPENER", window);
<?PHP } ?>
function gsWidget(tipo, start){
if( tipo=="jsd" ){
if( start!=undefined ){
if( S("iframe[id='jsd\-widget']").length==0 ){
setTimeout(function(){
gsWidget(tipo, true);
}, 10);
}else{
S("iframe[id='jsd\-widget']").hidden();
}
}else{
S("iframe[id='jsd\-widget']").css("visibility:visible;top:0");
S.modal({function:function(body, fondo){
S("iframe[id='jsd\-widget']").hidden();
S(fondo).nodeRemove();
}});
}
}
}
var _oIWORK, _pIWORK;
function eInitIWork(){
if( document && document.body && S(":IWORK").obj!=null ){
_oIWORK = S(":IWORK").nodeCopy();
_pIWORK = S(":IWORK").obj.parentNode;
S.scrollSetWidth();
<?PHP if( $_SESSION["3CX"]!="" ){ ?>
setTimeout(function(){
S.setup.phoneURL = (S("#_Call3CX").attr("tcxhref") || "<?=$_SESSION["3CXUrl"]?>");
}, 3000);
<?PHP } ?>
<?PHP if( $_ChannelApplication || $_ChannelDevelopment ){ ?>
setTimeout(function(){
S.session.index += 2;
S(".CHAT_SYSTEM").css("z-index:"+S.session.index);
S("#ICON_CHATROOM").visible();
if( S("#ICON_ROOMNOREAD").text()*1>0 ) S("#ICON_ROOMNOREAD").visible();
}, 3000);
<?PHP } ?>
<?PHP if( $_Desktop["JsdWidget"] ){ ?>
gsWidget('jsd', true);
<?PHP } ?>
document.body.onkeydown = _PaginarKey;
document.body.style.visibility = "visible";
}else{
setTimeout(function(){
eInitIWork();
}, 500);
}
}
function eSeguridad(){
S.window('edes.php?E:$docsecurity.gs',{
title:'DOCUMENTO DE SEGURIDAD',
minimize:false,
maximize:false,
close:false,
noDestroy:true,
fullscreen:true
});
}
function eCambiarClave(){
S.window('edes.php?FmR:$a/d/usu_clave_who.edf&_SEEK&cd_gs_user=<?=$_SESSION['_User']?>&_CADUCADO=1', {
title:'CAMBIE LA CLAVE PARA CONTINUAR',
minimize:false,
maximize:false,
close:false,
noDestroy:true,
modal:true
});
}
function eNovedades(){
S.window('edes.php?E:$a/d/gs_novedades.gs&_HA=1&_FILTER='+escape("cdi>='"+_CdiNovedad+"'"), {
title:'ULTIMAS NOVEDADES',
modal:true
});
}
<?PHP if( $_Util['system_user']=="S" ){ ?>
function eDevelopment(){
S.window('edes.php?Fa:$a/d/development', {
title:'LOGIN DEVELOPMENT',
minimize:false,
maximize:false,
print:false,
modal:true
});
}
<?PHP } ?>
function eUltimoAcceso(){
<?PHP
list($Y, $m, $d, $H, $i, $s) = explode(" ",date('Y m d H i s'));
$cdi = date('Y-m-d H:i:s', mktime($H, $i, $s, $m-6, $d, $Y));
if( qCount("gs_conexion", "cd_gs_user={$_User} and cdi>'".$cdi."'")>1 ){
qQuery("select cdi, cdi_fin from gs_conexion where cd_gs_user={$_User} and cdi>'".$cdi."' order by cdi desc");
qRow();
$r=qRow();
list($a,$m,$d) = explode("-",str_replace(" ","-",$r[0]));
$diaIni = $__Lng[date("w", mktime(0,0,0,$m,$d,$a))+7];
if( $r[1]<>"" ){
list($a,$m,$d) = explode("-",str_replace(" ","-",$r[1]));
$diaFin = $__Lng[date("w", mktime(0,0,0,$m,$d,$a))+7];
}
$titulo = eAsciiToCode("Último acceso");
$diaIni = eAsciiToCode($diaIni);
$diaFin = eAsciiToCode($diaFin);
?>
S.info("<table><caption><b><?=$titulo?></b></caption><tr><td align=right>Entrada: <td><?=$r[0].' '.$diaIni?></td></tr><tr><td align=right>Salida: <td><?=$r[1].' '.$diaFin?></td></tr></table>");
<?PHP
}
?>
}
<?PHP
$dimFunciones = array();
if( $_ViewInfoNovedad && $SinNovedad=="false" ) $dimFunciones[] = 'eNovedades();';
if( $_ViewPassChange==1 ) $dimFunciones[] = 'eCambiarClave();';
if( $_ViewDocSecurity ) $dimFunciones[] = 'eSeguridad();';
if( $_Desktop["SeeLastAccess"] ) $dimFunciones[] = 'eUltimoAcceso();';
if( $_Util['system_user']=="S" ) $dimFunciones[] = 'if( S.is("eDesPassword=", document.cookie) ){ S.call("edes.php?E:CallSrv=$a/d/development.edf&LoginPC=34"); }else{ eDevelopment(); }';
eContextPut('E:$docsecurity.gs');
eContextPut('FmR:$a/d/usu_clave_who.edf&_SEEK&cd_gs_user='.$_SESSION['_User']);
eContextPut('E:$a/d/gs_novedades.gs');
eContextPut('Ll:$a/d/gs_novedad.edf');
eContextPut('E:$default.php');
eContextPut('E:$a/u/tools.gs&X');
if( $_StartURL<>"" ) eContextPut($_StartURL);
function _LngLoad2($tipo, $File){
list(, $LngUser, $_Language) = explode(',',$tipo);
$tmp = file($File.'.lng');
list(,$Lngs) = explode(']', $tmp[0]);
list($Lngs) = explode('|', $Lngs);
$tmp4 = explode(',', str_replace(' ','',$Lngs));
for( $i=0; $i<count($tmp4); $i++ ){
$tmp4[$i] = trim($tmp4[$i]);
if( $tmp4[$i]==$LngUser ){
$uCol = $i+1;
}
if( $tmp4[$i]==$_Language ){
$dCol = $i+1;
}
}
$Dim = array();
$mk = 0;
for($n=1; $n<count($tmp); $n++){
list( $tmp[$n] ) = explode('~', $tmp[$n]);
$tmp[$n] = trim($tmp[$n]);
$tmp2 = explode('|', $tmp[$n]);
$k = $tmp2[0];
$txt = trim($tmp2[$uCol]);
if( $txt=='' ) $txt = trim($tmp2[$dCol]);
$v = str_replace('"', '&quot;', trim($txt));
$k = $k*1;
$mk = max($mk, $k);
$Dim[$k] = $v;
}
$txt = '';
for($n=0; $n<$mk+1; $n++){
if( $Dim[$n]=="" ) $txt .= '|';
else $txt .= str_replace(chr(92).'n','<br>',$Dim[$n]).'|';
}
return $txt;
}
?>
</script>
<?PHP
function PintaMenu($op, $principal){
global $_Desktop;
$MenuIcons = array();
if( $principal ){
?>
<span class="TREEMAIN SCROLLBAR" <?=(($_Desktop["DefaultTreeOneLevel"])?" oneLevel":"")?> eAutoHiddenOptional="<?=$_Desktop["MenuAutoHiddenOptional"]?>" eAutoHidden="<?=$_Desktop["MenuAutoHidden"]?>"<?=(($_Desktop["MenuAutoHidden"])?' onmouseleave=\'S(".TREEMAIN").none();S("#_TREEBUTTON").visible();\'':"")?> eFClose="<?=$_Desktop["DefaultTreeFolder"][0]?>" eFOpen="<?=$_Desktop["DefaultTreeFolder"][1]?>" onclick="treeMain(this)" on-contextmenu="eTreeCollaps(this)" style="z-index:2;visibility:hidden;position:relative;top:0px;display:block;height:100%;overflow-x:hidden;overflow-y:auto;" onselectstart="return false" edesclick="1">		<!--  s-tyle="z-index:1; visibility: visible; position: absolute; left: 0px; top: 0px; width:300px; height:100%;" -->
<table border='0px' cellspacing='0px' cellpadding='0px'><tbody>
<?PHP
}
eContextPut('E:$estadistica.gs&F=1');
$left = 0;
$newTree = false;
$DimUrl = array();
$indent = 0;
for($n=0; $n<count($op); $n++){
$r = $op[$n];
if( !$principal ){
if( $r["indent"]==0 ){
if( $newTree ){
echo "</table></span>";
}
echo '<span class="SUBTREE SCROLLBAR" id="SUBTREE'.$n.'"'.(($_Desktop["DefaultTreeOneLevel"])?" oneLevel":"").' eFClose="'.$_Desktop["DefaultTreeFolder"][0].'" eFOpen="'.$_Desktop["DefaultTreeFolder"][1].'" onclick="treeMain(this)" onmouseenter="viewSubTree(this,2)" onmouseleave="viewSubTree(this,3)" style="visibility:hidden;position:absolute;top:0px;left:'.$left.'px;display:block;overflow-x:hidden;overflow-y:auto;" onselectstart="return false" edesclick="1">';
echo "<table id='tab0' border='0px' cellspacing='0px' cellpadding='0px'><tbody>";
$newTree = true;
$r['icon'] = "";
$indent = $r["indent"];
}
}
if( $r["type"]=="D" ) continue;
$url = $r["script_url"];
$sType = $r["type"];
$opOcultas = false;
if( $sType=="F" && preg_match('/^(L|=){1}(g|c|m|b){1}l:$/', substr($url,0,4)) ){
$sType = "O";
$opOcultas = true;
}
$script = $url;
if($script[0]=="¿"){
list($macro, $script) = explode("?", substr($script,1));
$script = trim($script);
if( $GLOBALS['_DEBUG']==14 ) eTron("eval: return {$macro};");
if( !eval("return {$macro};") ) continue;
}
if( substr_count($url,'ShowBrowserUI')>0 || substr_count($url,'>/_datos/config/install.php')>0 ) continue;
$_NivelesVisibles = 1;
if( $r["indent"]>($_NivelesVisibles-2) ){
$xop = "+";
$cls = " class=MINI";
$rotate = $_Desktop["DefaultTreeFolder"][0];
}else{
$xop = "-";
$cls = "";
$rotate = $_Desktop["DefaultTreeFolder"][1];
}
if( !$principal ){
$cls = "";
if( $r["indent"]>0 ) $cls = " class=MINI";
}
$url = str_replace(array("#user#", "#node#"), array($_SESSION["_User"], $_SESSION["_Node"]), $url);
if( substr_count($url,'{$')>0 ) $url = _InVar( $url );
if( $r['icon']!="" ){
if( eFileType($r['icon'])=="svg" ){
$r['icon'] = file_get_contents(str_replace('$','edes.php?R:$a/g/',$r['icon']));
}else if( $r['icon'][0]=="$" ){
$r['icon'] = '$a/g/'.substr($r['icon'],1);
$r['icon'] = "<img src='edes.php?R:{$r['icon']}'>";
}else if( substr_count($r['icon'],".")==0 ){
$r['icon'] = eIcon($r['icon'], "", "ICONMENU");
}else{
$r['icon'] = "<img src='{$r['icon']}'>";
}
}else{
$r['icon'] = "<span class='ICONHIDDEN'></span>";
}
$tIndex = $r["indent"];
$eNoShow = ($r["show_type"]!="H") ? "" : " eNoShow=1";
if( $r["alias"]!="" ) $eNoShow .= " eAlias='{$r['alias']}'";
if( $sType=="F" ){
if( $_Desktop["DefaultTreeIcon"] && (!$_Desktop["DefaultTreeNoIcon"] || $r['icon']=="") ) $r['icon'] = eIcon("==".$IconFolder[0], "eIcon='{$IconFolder}'", "ICONWINDOW");
$DimUrl[$r["indent"]] = $url;
echo "<tr op='{$url}' open='{$xop}' nivel='{$r['indent']}'{$eNoShow}>";
echo "<td class='UnPX' id='tab_{$tIndex}' nowrap><span>{$r['icon']}</span><span>".$r["caption"]."</span></td>";
echo "<td class='UnPX'><i class='ICONWINDOW'>{$rotate}</i></td></tr>";
if( $r["indent"]==0 ) $MenuIcons[] = array($r['icon'], $n);
}else if( $sType=="L" ){
if( $r["caption"]=="" ){
echo "<tr class='LINEATR' nivel='{$r['indent']}'{$eNoShow}><td colspan='2' class='LINEA'></td></tr>";
}else if( $r["indent"]==0 ){
echo "<tr class='SECTIONLINE' nivel='{$r['indent']}'{$eNoShow}><td colspan='2' id='tab_{$tIndex}' nowrap><span>".substr($r["caption"],1)."</span></td></tr>";
}else if( trim(substr($r["caption"],1))=="" ){
echo "<tr class='LINEATR' nivel='{$r['indent']}'{$eNoShow}><td colspan='2' class='LINEA' id='tab_{$tIndex}' nowrap>".substr($r["caption"],1)."</td></tr>";
}else{
echo "<tr nivel='{$r['indent']}'{$eNoShow}><td colspan='2' class='LINEA' id='tab_{$tIndex}' nowrap><span>".substr($r["caption"],1)."</span></td></tr>";
}
}else{
if( $_Desktop["DefaultTreeIcon"] ) $r['icon'] = eIcon("==".$IconDoc, "", "ICONWINDOW");
if( substr($url,-1)<>")" ){
$script = $url;
if(substr($url,-1)==":") $script = $script.substr($DimUrl[$r["indent"]-1],1);
if($script[0]=="#")  $script = "F".substr($script,1);
else if($script[0]=="@")  $script = "G".substr($script,1);
if( substr_count(substr($script,0,4),":")==1 ){
if( substr_count($script,".")==0 ){
eExplodeOne( $script, "&", $script, $masParametros );
if($script[0]=="G")  $script .= ".gdf";
else $script .= ".edf";
if($masParametros<>"") $masParametros = "&".$masParametros;
$script .= $masParametros;
}
}
if(strtoupper($script[0])=="W") $script = trim(substr($script,1));
if($script[0]=="2" || $script[0]=="3") $script = trim(substr($script,1));
if($script[0]=="?"){
$script = trim(substr($script,1));
if($script[0]=="2" || $script[0]=="3") $script = trim(substr($script,1));
}
if(strtoupper($script[0])=="M") $script = trim(substr($script,1));
if(strtoupper($script[0])==">") $script = "E:".substr($script,1);
if(substr($script,0,9)=="edes.php?") $script = trim(substr($script,9));
else if(substr($script,0,8)=="edes.gs?") $script = trim(substr($script,8));
eContextPut($script);
}
if( $r["show_type"]=="H" ){
echo "<tr op='{$url}' nivel='{$r['indent']}' style='display:none'{$eNoShow}>";
}else{
echo "<tr op='{$url}' nivel='{$r['indent']}'>";
}
echo "<td class='UnPX' id='tab_{$tIndex}' nowrap><span>{$r['icon']}</span><span>".$r["caption"].'</span></td><td class="UnPX"></td></tr>';
if( $opOcultas ){
for($i=$n+1; $i<count($op); $i++){
if( $op[$i]["show_type"]!="H" ){
$n = $i-1;
break;
}
}
}
}
$indent = $r["indent"];
}
echo '</tbody></table>';
echo '</span>';
if( $principal ){
$actionMenu = (($_Desktop["MenuIconOverClick"]=="C")? 'onclick="viewSubTree(this,1)"' : 'onmouseenter="viewSubTree(this,1)"');
echo '<span class="TREEMIN" style="position:relative;top:0px;display:none;height:100%;overflow:hidden">';
echo "<table height=100% style='padding:0px;margin:0px;' cellspacing='0px' cellpadding='0px'><tbody>";
for($n=0; $n<count($MenuIcons); $n++){
echo "<tr><td eTree='".$MenuIcons[$n][1]."' {$actionMenu} onmouseleave='viewSubTree(this,0)' nivel=0><span>".$MenuIcons[$n][0]."</span></td></tr>";
}
echo "<tr class='SECTIONLINE'><td height=100%></td></tr>";
echo '</tbody></table>';
echo '</span>';
}
}
if( !$_DesktopWepe ){
$Hoy = date('Y-m-d');
$txt = '';
if( eFileGetVar('Login.HostGet') ) $txt = ", host='".$REMOTE_ADDR."'";
qQuery("update gs_user set dt_access_last='{$Hoy}'{$txt} where cd_gs_user={$_User}");
?>
<script type="text/javascript" charset="ISO-8859-1">
document.body.onload = function(){
document.body.onkeydown = function(e){
if( e.ctrlKey && e.keyCode==80 ){
return S.eventClear(window, event);
}
}
eInitIWork();
S(".TREEMAIN").css({
width: S(".TREEMAIN").css("width")+10
});
S(".TREEMAIN").obj.children[0].style.width = "100%";
S(".SUBTREE>TABLE:first-child>TBODY>TR:first-child>TD:last-child>I").none();
S(".SUBTREE>TABLE:first-child>TBODY>TR:first-child>TD:first-child>SVB").none();
S(".SUBTREE>TABLE:first-child>TBODY>TR:first-child>TD:first-child>I").none();
S(".SUBTREE>TABLE:first-child>TBODY>TR:first-child>TD:first-child>IMG").none();
_treeOpen = S(".TREEMAIN").attr("eFOpen");
_treeClose = S(".TREEMAIN").attr("eFClose");
var showNivel = "tab_<?=($_Desktop["NumberLevels"])?>", i=0;
var _FILAS = S(".SUBTREE TR").dim,
_tFILAS = _FILAS.length;
while( i<_tFILAS ){
if( _FILAS[i].cells[0].id>=showNivel ){
if( _FILAS[i].cells[0].id>showNivel ) _FILAS[i].style.display = 'none';
if( _FILAS[i].getAttribute("open")!=null ){
_FILAS[i].setAttribute("open", "-");
S(_FILAS[i].cells[1].children[0]).html(_treeOpen);
if( !/^(SECTIONLINE|LINEATR)$/.test(_FILAS[i].className) && _FILAS[i].cells[0].children[0].tagName=="IMG" ) _FILAS[i].cells[0].children[0].src = _FILAS[i].cells[0].children[0].src.replace('_1.','_0.');
}
}else{
if( _FILAS[i].getAttribute("open")!=null ){
_FILAS[i].setAttribute("open", "+");
S(_FILAS[i].cells[1].children[0]).html(_treeClose);
if( !/^(SECTIONLINE|LINEATR)$/.test(_FILAS[i].className) && _FILAS[i].cells[0].children[0].tagName=="IMG" ) _FILAS[i].cells[0].children[0].src = _FILAS[i].cells[0].children[0].src.replace('_1.','_0.');
}
}
i++;
}
S(".SUBTREE").visible();
S(".SUBTREE .MINI").none();
S(".SUBTREE").none();
<?PHP if( $_Desktop["DefaultTreeIcon"] ){ ?>
<?PHP } ?>
_TreeDefault();
S(".TREEMAIN").visibility();
<?PHP if( $_Desktop["MenuAutoHidden"]==1 || $_Desktop["MenuAutoHiddenOptional"]==1 ){ ?>
_ReajustaDesktop();
<?PHP } ?>
<?PHP
for($n=0; $n<count($dimFunciones); $n++){
echo $dimFunciones[$n];
}
?>
S.info(window);
<?PHP
?>
<?PHP
if( file_exists('../_d_/cfg/url.'.$_SESSION["_User"]) ){
echo 'frames["IWORK"].location.href="'.trim(file_get_contents('../_d_/cfg/url.'.$_SESSION["_User"])).'";';
}
RestauraValoresPorDefecto();
?>
<?PHP
if( $_SETUP["Desktop"]["OnLoad"]!="" ) echo $_SETUP["Desktop"]["OnLoad"];
?>
setTimeout(function(){ S("#TAPAINIT").nodeRemove(); }, 2000);
}
</script>
<?PHP
if( $_SETUP["Desktop"]["JSEnd"]!="" ){
echo "<SCRIPT name='JSEND'>";
echo file_get_contents(eScript($_SETUP["Desktop"]["JSEnd"]));
echo "</SCRIPT>";
}
if( $_SETUP["Desktop"]["PHPEnd"]!="" ){
include(eScript($_SETUP["Desktop"]["PHPEnd"]));
}
echo '</body></html>';
eEnd();
}else{
?>
<script type="text/javascript" charset="ISO-8859-1">
setTimeout(function(){
try{
eInitIWork();
<?PHP
for($n=0; $n<count($dimFunciones); $n++){
echo $dimFunciones[$n];
}
?>
}catch(e){}
}, 5000);
<?= RestauraValoresPorDefecto(); ?>
</script>
<?PHP
}
function RestauraValoresPorDefecto(){
$appCode = "";
if( $_SESSION["_APPCODE"]!="" ) $appCode = "_".$_SESSION["_APPCODE"];
$file = '../_datos/usr/'.$_SESSION["_User"].$appCode.'.dft';
if( file_exists($file) ){
echo 'top.eCallSrvPost("edes.php?E:$default.php", {DATOS:"LOAD"}, window);';
}
}
?>
