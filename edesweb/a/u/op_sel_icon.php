<?PHP
eHTML();
?>
<style>
BODY {
background-color:#ffffff;
}
SPAN {
width:100px;
height:100px;
border:1px solid #eeeeee;
display: block;
float:left;
margin-right:20px;
margin-top:20px;
text-align:center;
vertical-align:top;
}
IMG, SVG {
-width:30px;
-min-width:30px;
max-width:100px;
-min-height:30px;
max-height:100px;
cursor:pointer;
}
</style>
<script>
top.S.init(window, "all");
setTimeout(function(){
S(["#__gif", "#__png", "#__jpg", "#__jpeg", "#__svg", "#__img"],top).on("click", function(ev){
var o = S.event(ev),
ext = S.mid(o.id,2,0);
if( o.getAttribute("eON")=="1" ){
o.innerHTML = "&#320;";
o.setAttribute("eON", 0);
if( ext=="img" ){
S("img").each(function(k,img){
S(img.parentElement).none();
});
S(["#__gif", "#__png", "#__jpg", "#__jpeg"], top).each(function(k,i){
i.setAttribute("eON", 0);
i.innerHTML = "&#320;";
});
}else if( ext=="svg" ){
S("svg").each(function(k,img){
S(img.parentElement).none();
});
}else{
S("img[src$='"+ext+"']").each(function(k,img){
S(img.parentElement).none();
});
}
}else{
o.innerHTML = "&#321;";
o.setAttribute("eON", 1);
if( ext=="img" ){
S("img").each(function(k,img){
S(img.parentElement).block();
});
S(["#__gif", "#__png", "#__jpg", "#__jpeg"], top).each(function(k,i){
i.setAttribute("eON", 1);
i.innerHTML = "&#321;";
});
}else if( ext=="svg" ){
S("svg").each(function(k,img){
S(img.parentElement).none();
});
}else{
S("img[src$='"+ext+"']").each(function(k,img){
S(img.parentElement).block();
});
}
}
});
if( _WOPENER.Procesando ) _WOPENER.Procesando(0);
}, 1);
function selIcono(o){
o = o.children[0];
_WOPENER._IconNew.innerHTML = S(o).HTML();
if( o.tagName=="svg" ){
_WOPENER._IconNew.setAttribute("icon", "g/"+S.fileFullname(o.parentElement.getAttribute("src")));
}else{
_WOPENER._IconNew.setAttribute("icon", "g/"+S.fileFullname(o.src));
}
_WOPENER._SeModOpciones = true;
S(window).window();
}
function eliminarIcono(){
_WOPENER._IconNew.innerHTML = "";
_WOPENER._IconNew.setAttribute("icon", "");
_WOPENER._SeModOpciones = true;
S(window).window();
}
</script>
</head>
<body>
<?PHP
eAddButton("D", "Eliminar icono", 'eliminarIcono()', "", "style='height:auto;width:auto;float:none;'", "AddButton");
$DirBase = "g";
$di = opendir($DirBase);
while( $file = readdir($di) ){
if( $file!='.' && $file!='..' ){
$ext = trim(strtolower(eFileType($file)));
if( $ext=="" ){
}else if( preg_match('/^(gif|png|jpg|jpeg)$/i', $ext) ){
$NomFile = "{$DirBase}/{$file}";
echo "<span onclick='selIcono(this)'><img src='{$NomFile}'></span>";
}else if( preg_match('/^svg$/i', $ext) ){
$NomFile = "{$DirBase}/{$file}";
echo "<span onclick='selIcono(this)' src='{$NomFile}'>";
include($NomFile);
echo '</span>';
}
}
}
closedir( $di );
?>
</body>
</html>
