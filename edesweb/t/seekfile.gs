<?PHP
set_time_limit(0);
eHTML('','','SeekFile');
echo '<SCRIPT type="text/javascript">';
echo '</SCRIPT></HEAD><BODY style="margin: 0px 0px 0px 5px" onload="document.body.scrollTop=\''.($TOP*1).'px\';';
echo '">';
?>
<div id="CONTENIDO" style="overflow:scroll">
<table eSeek="SEEK<?=$_GET["tab"]?>" i_d="SCRIPT<?=$_GET["tab"]?>" border="0px" cellspacing="0px" cellpadding="0px" style="border-spacing:0px; width:100%; height:100%; display:table;">
<tbody>
<tr class="SCRIPT" style="height:1px">
<td style="margin:0px;padding:0px;">
<table id="SCRIPT<?=$_GET["tab"]?>" border="0px" cellspacing="0px" cellpadding="0px" style="border-spacing:0px; width:100%; height:1px; display:table;">
<tr>
<td style="width:1px; padding:5px 10px 5px 10px;width:1px;border-right:1px solid #ffffff"><?=$_GET["tab"]+1?></td>
<td style="width:100%; padding-left:10px;">Result seek file: <?=$_GET["SeekFile"]?></td>
<td style="width:1px" align="center" valign="middle" onclick="cerrarScript()"><i class="ICONWINDOW" style="color:#ffffff">5</i></td>
</tr>
</table>
</td>
</tr><tr style="height:100%">
<td colspan=3 style="width:100%;margin:0px;padding:0px; o-verflow:auto; f-loat:left; padding:0px; display:table-cell;">
<form name="FRM<?=$_GET["tab"]?>" target="TLF" method="post" action="" style="overflow:auto; float:left; width:100%;height:100%;d-isplay:flex;">
<input type="hidden" name="script" value="">
<input type="hidden" name="md5" value="">
<input type="hidden" name="update" value="">
<input type="hidden" name="status" value="0,0,8,12|">
<div id=fuente onclick=editarFuente(this) style="width:100%">
<?PHP
$buscar = $_GET["SeekFile"];
if( $buscar[0]=="=" ){
$buscar = substr($buscar,1);
$sensible = "";
}else{
$sensible = "i";
}
$_xBuscar = '/('.str_replace(
array( "[", "]", "(", ")", "<", ">", "{", "}", ".", ",", ":", "-", "!", "+", "*", "^",   " ", '$'),
array("\[","\]","\(","\)","\<","\>","\{","\}","\.","\,","\:","\-","\!","\+","\*","\^", "\\s",'\$'),
$buscar
).')/';
$_xBuscar .= $sensible;
$_ToatlFicheros = 0;
$_TotalDeOcurrecias = 0;
SeekFile($buscar);
?>
</div>
</form>
</td>
</tr>
</table>
</div>
<?PHP
?>
<script type="text/javascript">
var WOPENER = window.frameElement.WOPENER;
WOPENER.S.init(window, "list");
S("TR[eTAB]", WOPENER).none();
var tr = S(".TABS", WOPENER).tr("I", null, [{css:"padding:0px;vertical-align:top;", text:document.getElementById("CONTENIDO").innerHTML}], {eTab:<?=$_GET["tab"]?>});
S('#SCRIPT<?=$_GET["tab"]?>').HTML("");
tr.cells[0].style.borderTop = "1px solid blue";
WOPENER.DimScript[<?=$_GET["tab"]?>] = ["RESULT:Seek File","",""];
var obj = S("#TABCONTENEDOR", WOPENER).obj.children[0];
S("<div class='TABSCRIPT'>Seek File</div>").nodeEnd(obj);
var box = S("#SCRIPT<?=$_GET["tab"]?>", WOPENER);
var ancho = box.obj.clientWidth-20;
var o = box.obj.rows[0].cells[1];
S(o).text(S(o).text()+" (<?=$_ToatlFicheros?>)");
S("TR[etab='<?=$_GET["tab"]?>'] #fuente", WOPENER).css("height:500");
S("#FILE", S(":FRM<?=$_GET["tab"]?>",WOPENER)).css("margin-top:2;background-color:")
setTimeout(function(){
WOPENER.document.body.focus();
WOPENER.MarcarScript(<?=$_GET["tab"]?>);
S("TABLE[eseek='<?=$_GET["tab"]?>']",WOPENER).css({width:ancho});
WOPENER.ajustaAlto(<?=$_GET["tab"]?>);
WOPENER.S.info();
WOPENER.S.info("Fin de la búsqueda",3);
},200);
</script>
<?PHP
echo '</BODY></HTML>';
function SeekFile($buscar){
global $_xBuscar, $_ToatlFicheros;
if( strtoupper(substr(PHP_OS,0,3))=='WIN' ){
eExplodeLast(eGetCWD(), "/", $dirbase, $dch);
chdir('..');
$res = exec('dir '.$buscar.' /s', $DimSalida);
$dir = "";
$dim = array();
for($n=0; $n<count($DimSalida); $n++){
$txt = trim($DimSalida[$n]);
if( substr($txt,0,10)=="Directorio" ){
$dir = substr($txt,14);
}else{
if( substr($txt,2,1)=="/" ){
eExplodeLast($txt, " ", $iz, $dch);
$file = str_replace($dirbase, "..", str_replace(chr(92), "/", $dir)."/".$dch);
if( substr_count($file, ".NO/")==0 && substr_count($file, "/_bak_/")==0 ){
$dim[] = $file;
}
}
}
}
}else{
$res = exec('find ../ -name "'.$buscar.'" -print', $DimSalida);
$dim = array();
for($n=0; $n<count($DimSalida); $n++){
$txt = trim($DimSalida[$n]);
$file = substr($txt,2);
if( substr_count($file, ".NO/")==0 && substr_count($file, "/_bak_/")==0 ){
$dim[] = $file;
}
}
}
$_ToatlFicheros = count($dim);
for($n=0; $n<$_ToatlFicheros; $n++){
echo "<div id=FILE>".$dim[$n]."</div>";
}
}
?>
