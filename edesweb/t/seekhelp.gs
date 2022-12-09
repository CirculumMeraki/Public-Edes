<?PHP
set_time_limit(0);
eHTML('','','SeekStringHelp');
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
<td style="width:100%; padding-left:10px;">Result seek help: <?=$_GET["SeekStringHelp"]?></td>
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
<div id=fuente onclick=AyudaPorScript(this) style="width:100%">
<?PHP
$buscar = $_GET["SeekStringHelp"];
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
$dim = str_split($_xBuscar);
$dimBuscar = [
"aáâàäã",
"eéêèë",
"iíîìï",
"oóôòöõ",
"uúûùü"
];
for($n=0; $n<count($dim); $n++){
for($i=0; $i<count($dimBuscar); $i++){
if( preg_match('/^['.$dimBuscar[$i].']$/', $dim[$n]) ){
$dim[$n] = "[".$dimBuscar[$i]."]";
}
}
}
$_xBuscar = implode("", $dim);
$_xBuscar .= $sensible;
$_ToatlFicheros = 0;
$_TotalDeOcurrecias = 0;
SeekString("../../edesweb/h", $buscar);
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
WOPENER.DimScript[<?=$_GET["tab"]?>] = ["RESULT:Seek String Help","",""];
var obj = S("#TABCONTENEDOR", WOPENER).obj.children[0];
S("<div class='TABSCRIPT'>Seek String Help</div>").nodeEnd(obj);
var ancho = S("#SCRIPT<?=$_GET["tab"]?>", WOPENER).obj.clientWidth-20;
var o = S("#SCRIPT<?=$_GET["tab"]?>", WOPENER).obj.rows[0].cells[1];
S(o).text(S(o).text()+" (<?=$_ToatlFicheros."/".$_TotalDeOcurrecias?>)");
setTimeout(function(){
WOPENER.document.body.focus();
WOPENER.MarcarScript(<?=$_GET["tab"]?>);
S("#SCRIPT<?=$_GET["tab"]?> #fuente",WOPENER).css({width:ancho});
WOPENER.ajustaAlto(<?=$_GET["tab"]?>);
WOPENER.S.info();
WOPENER.S.info("Fin de la búsqueda",3);
},200);
</script>
<?PHP
echo '</BODY></HTML>';
function SeekString($DirBase, $buscar){
global $_xBuscar, $_ToatlFicheros, $_TotalDeOcurrecias;
if( $DirBase[0]=="_" && $DirBase!="_datos" ) return;
if( substr_count($DirBase, "/http/")>0 ) return;
if( substr_count($DirBase, "/_")>0 ) return;
if( substr($DirBase, -3)==".NO" ) return;
if( $DirBase=="../lib" ) return;
$di = opendir($DirBase);
while( $file=readdir($di) ){
if( $file!='.' && $file!='..' ){
if( is_dir("{$DirBase}/{$file}") ){
}else{
$NomFile = substr($DirBase.'/'.$file, 2);
if( preg_match('/^(htm)$/i', eFileType($file)) ){
$verFile = true;
$dim = file("{$DirBase}/{$file}");
if( !preg_match($_xBuscar, implode("",$dim)) ) continue;
$_ToatlFicheros++;
$rem = "";
for($n=0; $n<count($dim); $n++ ){
$tmp = trim($dim[$n]);
if( substr_count($tmp, "/"."/")>0 ) list($tmp) = explode("/"."/", $tmp);
if( substr($file,-2)=="df" ){
if( $tmp[0]=="." || $tmp[0]=="/" ) continue;
if( $tmp[0]=="[" && (strtoupper(substr($tmp,0,6))=="[NOTE]" || strtoupper(substr($tmp,0,6))=="[EXIT]")  ) break;
}
if( preg_match($_xBuscar, $tmp) ){
if( $verFile ){
$verFile = false;
echo "<div id=FILE>".substr($file,0,-4)."</div>";
}
$tmp = trim(str_replace("\t","",$dim[$n]));
while( substr_count($tmp, "  ")>0 ) $tmp = str_replace("  "," ",$tmp);
$tmp = str_replace(
array(  '<'  ,   '>'  ),
array('&#60;', '&#62;'),
$tmp
);
if( strlen($tmp)>200 ) $tmp = substr($tmp,0,200)."...";
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
closedir($di);
}
function SeekString_LINUS( $Buscar ){
global $_ExternalApps, $_gsACCESO;
$WDirBase = str_replace('\\','/',getCWD());
$WDirBase = explode('/',$WDirBase);
$WDirBase = $WDirBase[count($WDirBase)-2];
$EditExe = $_ExternalApps[0][1];
$EditExe = str_replace( '\\', '/', $EditExe );
$EditExe = str_replace( '//', '/', $EditExe );
chdir('..');
if( substr($Buscar,0,2) == '{/' && substr_count($Buscar,'/}') == 1 ){
$tmp = explode('/}',$Buscar);
$nDir = substr($tmp[0],2);
if( $nDir=='' ){
$Buscar = $tmp[1];
if( strtoupper(substr(PHP_OS,0,3)) != 'WIN' ) $DirBase = '/';
else $NomDir = $WDirBase;
}else if( is_dir($nDir) ){
$Buscar = $tmp[1];
if( strtoupper(substr(PHP_OS,0,3)) != 'WIN' ){
chdir( $nDir );
$nDir .= '/';
$DirBase = '/'.$nDir;
}else{
$NomDir = $WDirBase.'/'.$nDir;
$nDir = '/'.$nDir.'/';
}
}else{
if( strtoupper(substr(PHP_OS,0,3)) != 'WIN' ){
$nDir = 'd/';
chdir('d');
$DirBase = '';
}else{
$NomDir = $WDirBase.'/d';
}
}
}else{
if( strtoupper(substr(PHP_OS,0,3)) != 'WIN' ){
$nDir = 'd/';
chdir('d');
$DirBase = '';
}else{
$NomDir = $WDirBase.'/d';
$DirBase = '';
$nDir = 'd/';
}
}
if( $Buscar[0]=='|' ){
$Buscar = substr( $Buscar, 1 );
$EsUnCampo = true;
}else{
$EsUnCampo = false;
}
$Buscar = str_replace('?','\?',$Buscar);
$Buscar = str_replace('+','\+',$Buscar);
$Buscar = str_replace('{','\{',$Buscar);
$Buscar = str_replace('|','\|',$Buscar);
$Buscar = str_replace('[','\[',$Buscar);
$Buscar = str_replace(']','\]',$Buscar);
$Buscar = str_replace('/','\\/',$Buscar);
if( strtoupper(substr(PHP_OS,0,3))=='WIN' ){
echo 'No soportado en WINDOWS';
return;
chdir('../edesweb/win/');
exec("grep -r -i -n '{$Buscar}' ../../{$NomDir}/", $Dim, $error);
}else{
exec("grep -r -i -n '{$Buscar}' *", $Dim, $error);
}
sort($Dim);
$TDim = count($Dim);
$Long = strlen($TDim.'');
$Long = 5;
$Ceros = str_repeat('0',$Long);
$Mem = array();
for( $n=0; $n<$TDim; $n++ ){
$tmp = explode(':',$Dim[$n]);
$tmp[0] = trim($tmp[0]);
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ) $tmp[0] = str_replace("../../{$NomDir}/",'',$tmp[0]);
if( $tmp[0]!='donde' ){
$SubDir = explode('/',$tmp[0]);
if( $SubDir[0] != '_bak_' && $SubDir[0] != '_tmp' ){
if( $EsUnCampo && substr_count( $tmp[2], '|' ) != 9 ){
$Dim[$n] = '';
continue;
}
$Dim[$n] = $tmp[0].':'.substr(($Ceros.$tmp[1]),-$Long).':'.$tmp[2];
for( $i=3; $i<count($tmp); $i++ ) $Dim[$n] .= ':'.$tmp[$i];
$Ext = substr( $tmp[0], strrpos($tmp[0],'.')+1);
if( $Ext != 'bak' && $Ext != 'old' && $Ext != 'zip' && $Ext != 'log' ){
if( $Mem[$tmp[0]] == '' ){
$Mem[$tmp[0]] = 1;
}else{
$Mem[$tmp[0]]++;
}
}
}
}
}
sort($Dim);
$nVeces = 0;
for($n=0; $n<count($Dim); $n++){
if( $Dim[$n]=='' ) continue;
$tmp = explode(':', $Dim[$n]);
$tmp[0] = trim($tmp[0]);
if( $tmp[0]!='donde' ){
$SubDir = explode('/', $tmp[0]);
if( $SubDir[0]!='_bak_' && $SubDir[0] != '_tmp' ){
$Ext = substr($tmp[0], strrpos($tmp[0],'.')+1);
if( $Ext!='bak' && $Ext!='old' ){
$nVeces++;
$Ori = str_replace('<','&lt;',$tmp[2]);
$Ori = str_replace('>','&gt;',$Ori);
$tmp[1] = ($tmp[1]*1)+1;
if( $Mem[$tmp[0]] == '' ){
echo '<div id=LINEA i=1>'.$tmp[1].': '.$Ori.'</div>';
}else if( $Mem[$tmp[0]] == 1 ){
if( substr($tmp[0],0,12)=="Binary file " ) continue;
echo "<div id=FILE>{$tmp[0]}</div>";
echo '<div id=LINEA i=2>'.$tmp[1].': '.$Ori.'</div>';
}else{
echo "<div id=FILE>{$tmp[0]}</div>";
echo '<div id=LINEA i=3>'.$tmp[1].': '.$Ori.'</div>';
$Mem[$tmp[0]] = '';
}
}
}
}
}
if( $nVeces == 0 ) echo '<div align=center style="color:#CC0000;width:expression(screen.width)">Cadena no encontrada</div>';
}
?>
