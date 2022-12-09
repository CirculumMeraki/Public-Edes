<!DOCTYPE HTML>
<HTML>
<HEAD>
<TITLE> </TITLE>
<META NAME="Generator" CONTENT="">
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">
<SCRIPT type="text/javascript">
</SCRIPT>
<STYLE>
BODY, HTML {
height:100%;
width:100%;
}
BODY {
margin:0px;
padding:0px;
overflow: hidden;
}
</STYLE>
</HEAD>
<BODY>
<?PHP
if( substr(strtolower($_GET["IMG"]),-4)==".pdf" ){
?>
<embed src="edes.php?R:<?=$_GET["IMG"]?>#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="100%" height="100%" />
<SCRIPT type="text/javascript">
if( window.frameElement.getAttribute("eNORESIZE")!="true" ){
var xy = top.S.screen(top);
top.S(window).windowIcon("I", "<i class='ICONWINDOW' onclick='S.imgTools(\"d\",\"<?=str_replace('"',"&#34;",$_GET["IMG"])?>\")' title='Descargar PDF'>v</i>");
top.S(window).goto(0, 0);
top.S(window)
.windowResize(xy.w-10, xy.h-10)
.windowIcon("N", "M")
.windowIcon("N", "P")
.windowIcon("N", "R");
top.S(window).windowCaption("PDF", 1);
top.S.windowView(window);
top.S.infoHide(top);
}
</SCRIPT>
<?PHP
}else if( substr(strtolower($_GET["IMG"]),-4)==".mp4" ){
?>
<video src="edes.php?R:<?=$_GET["IMG"]?>" width="auto" height="auto" controls autoplay>
Tu navegador no implementa el elemento <code>video</code>.
</video>
<SCRIPT type="text/javascript">
window.addEventListener('load', function(){
var video = document.querySelector('video');
video.addEventListener("loadedmetadata", function(){
top.S(window).windowResize(video.videoWidth, video.videoHeight, true);
top.S(window).windowCaption("Video", 1);
top.S.windowView(window);
}, false);
});
var o = top.S("VIDEO", window).obj;
top.S(window)
.windowIcon("N", "M")
.windowIcon("N", "P");
top.S.infoHide(top);
</SCRIPT>
<?PHP
}else{
$imagen = getimagesize(eScript($_GET["IMG"]));
?>
<img src="<?=eImg64($_GET["IMG"])?>" width="<?=$imagen[0]?>px" height="<?=$imagen[1]?>px">
<SCRIPT type="text/javascript">
<?PHP if( isset($_GET["_TOOLSIMG"]) ){ ?>
top.S(window).windowIcon("I", "<i class='ICONWINDOW' onclick='S.imgTools(\"d\",\"<?=str_replace('"',"&#34;",$_GET["IMG"])?>\")' title='Descargar imagen'>v</i>");
top.S(window).windowIcon("I", "<i class='ICONWINDOW' onclick='S.imgTools(\"z\",0.25)' title='Ampliar Zoom'>&#208;</i>");
top.S(window).windowIcon("I", "<i class='ICONWINDOW' onclick='S.imgTools(\"z\",-0.25)' title='Reducir Zoom'>&#207;</i>");
top.S(window).windowIcon("I", "<i class='ICONWINDOW' onclick='S.imgTools(\"r\",90)' title='Girar 90°'>&#274;</i>");
top.S(window).windowIcon("I", "<i class='ICONWINDOW' onclick='S.imgTools(\"r\",-90)' title='Girar -90°'>&#275;</i>");
<?PHP } ?>
var xy = top.S.screen(window);
top.S(window)
.windowResize(xy.sw, xy.sh, true)
.windowIcon("N", "M")
.windowCaption("Imagen", 1);
var o = top.S("IMG", window).obj, z;
xy = top.S.screen(window);
if( xy.w<o.width || xy.h<o.height ){
if( (xy.w/xy.h)>(o.width/o.height) ){
o.width = (o.width*xy.h)/o.height;
o.height = xy.h;
}else{
o.height = (o.height*xy.w)/o.width;
o.width = xy.w;
}
}
top.S(window).windowResize(o.width, o.height, true)
top.S(window).windowCaption("Imagen", 1);
top.S.windowView(window);
top.S.infoHide(top);
</SCRIPT>
<?PHP
}
?>
</BODY>
</HTML>
<?PHP
eEnd();
?>
