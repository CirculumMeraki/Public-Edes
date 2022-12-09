<?PHP
set_time_limit(0);
eHTML('','','SeekField');
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
<td style="width:100%; padding-left:10px;">Result seek field: <?=$_GET["SeekField"]?></td>
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
<div id=fuente onclick=editarFuente(this) oncontextmenu=marcaBusqueda(this) style="width:100%">
<?PHP
$buscar = $_GET["SeekString"];
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
).')/'.$sensible;
$_ToatlFicheros = 0;
$_TotalDeOcurrecias = 0;
SeekField("..", "|".strtoupper($_GET["SeekField"])."|");
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
WOPENER.DimScript[<?=$_GET["tab"]?>] = ["RESULT:Seek Field","",""];
var obj = S("#TABCONTENEDOR", WOPENER).obj.children[0];
S("<div class='TABSCRIPT'>Seek Field</div>").nodeEnd(obj);
var ancho = S(".MENU",top).css("width");
var o = S("#SCRIPT<?=$_GET["tab"]?>", WOPENER).obj.rows[0].cells[1];
S(o).text(S(o).text()+" (<?=$_ToatlFicheros."/".$_TotalDeOcurrecias?>)");
setTimeout(function(){
WOPENER.document.body.focus();
WOPENER.MarcarScript(<?=$_GET["tab"]?>);
S("TR[etab='<?=$_GET["tab"]?>']", WOPENER).css({width:ancho, display:"table"});
WOPENER.ajustaAlto(<?=$_GET["tab"]?>);
WOPENER.S.info();
WOPENER.S.info("Fin de la búsqueda",3);
},200);
</script>
<?PHP
echo '</BODY></HTML>';
function SeekField($DirBase, $buscar){
global $_xBuscar, $_ToatlFicheros, $_TotalDeOcurrecias;
$buscar2 = substr($buscar,0,-1).":";
$buscar3 = substr($buscar,0,-1)."{";
if( $DirBase[0]=="_" && $DirBase!="_datos" ) return;
if( substr_count($DirBase, "/http/")>0 ) return;
if( substr_count($DirBase, "/_")>0 ) return;
$di = opendir( $DirBase );
while( $file = readdir( $di ) ){
if( $file != '.' && $file != '..' ){
if( is_dir( "{$DirBase}/{$file}" ) ){
SeekField( "{$DirBase}/{$file}", $buscar );
}else{
$NomFile = substr( $DirBase.'/'.$file, 2 );
if( substr($file,-2)=="df" ){
$verFile = true;
$dim = file("{$DirBase}/{$file}");
if( !preg_match($_xBuscar, implode("",$dim)) ) continue;
$conto = false;
for($n=0; $n<count($dim); $n++ ){
$tmp = trim($dim[$n]);
if( substr_count($tmp, "/"."/")>0 ) list($tmp) = explode("/"."/", $tmp);
$tmp = strtoupper(str_replace(" ","",$dim[$n]));
if( $tmp[0]=="." || $tmp[0]=="/" ) continue;
if( $tmp[0]=="[" && (substr($tmp,0,6)=="[NOTE]" || substr($tmp,0,6)=="[EXIT]")  ) break;
if( substr_count($tmp, "|")>=9 and (substr_count($tmp, $buscar)>0 || substr_count($tmp, $buscar2)>0 || substr_count($tmp, $buscar3)>0) ){
if( !$conto ){
$conto = true;
$_ToatlFicheros++;
}
if( $verFile ){
$verFile = false;
echo "<div id=FILE>{$DirBase}/{$file}</div>";
}
$tmp = trim(str_replace("\t","",$dim[$n]));
while( substr_count($tmp, "  ")>0 ) $tmp = str_replace("  "," ",$tmp);
$tmp = str_replace(
array(  '<'  ,   '>'  ),
array('&#60;', '&#62;'),
$tmp
);
preg_match($_xBuscar, $tmp, $matches, PREG_OFFSET_CAPTURE);
if( count($matches)>0 ){
$tmp = str_replace($matches[0][0], "<span id=MARCA>{$matches[0][0]}</span>", $tmp);
}
echo "<div id=LINEA{$rem} mas=".(strlen($dim[$n])-strlen(ltrim($dim[$n]))).">".($n+1).": ".$tmp.'</div>';
$_TotalDeOcurrecias++;
}
}
}
}
}
}
closedir( $di );
}
?>
