<?PHP
eHTML("L:{$OriFichero}", $Opcion, $_TITLE);
echo '<SCRIPT type="text/javascript" name=eDes>'.$__Enter;
echo 'document.title = "LIST";';
if( $_CSSNO ){
echo 'top.S.init(window);';
}else if( $_CSSFontSize=="" ){
echo 'top.S.init(window,"all,list");';
}else{
echo 'top.S.init(window,"all_big,list_big");';
}
include("../../edesweb/binary.js");
?>
function _viewBody(){
S("body").visible();
}
<?PHP
echo '</SCRIPT>';
?>
<style>
.columna0 {
width:33%;
height:100%;
float:left;
border:1px solid red;
box-sizing: border-box;
padding:5px;
-margin-right:20px;
}
.columna1 {
width:100%;
height:100%;
-float:left;
border:1px solid green;
box-sizing: border-box;
padding:5px;
-margin-right:20px;
}
.columna2 {
width:100%;
margin-top:10px;
padding:10px;
box-sizing: border-box;
border:1px solid blue;
-margin-right:20px;
-padding-right:20px;
-padding-top:20px;
}
</style>
<?PHP
$_HELP = 'top.gsHelpErr(window);'.$_HELP;
$gsEdition = '';
if( isset($_JSONLOAD) ) $_ONLOAD .= '_JsOnLoad();';
echo "</HEAD><BODY class='".(($_ISUBLIST==true)?'ISubListBODY':'BODYLIST')." SCROLLBAR'";
echo " style='display:inline-table;text-align:".(($_ISUBLIST==true)?"left;":"center;visibility:hidden;")."margin:0px;padding:0px;{$_WaterMarkingCSS}".(($_NOTITLE==true)?';border:0px':'')."'";
echo " onload='{$gsEdition}{$_ONLOAD}_viewBody();'";
echo " ondragstart='return false'";
if( $_SESSION['_D_']!='' && !($OriFichero[0]=="$" && $_SESSION['_D_']<>"~") ) echo " oncontextmenu=top.gsEdit(window)";
if( $_TIPFORM['BODY']['F']!='' ){
$bTitle = $_TIPFORM['BUTTON']['F'];
if( $bTitle=='>' ){
echo " eHelp='#_TIP_F_BODY'";
}else{
echo " eHelp='{$bTitle}'";
}
}
echo ">".$__Enter;
if( $_TITLE!='' ){
echo '<TABLE class="TITULO" id="GROUPTITLE" border=0px cellspacing=0px cellpadding=0px style="text-align:'.$_dimAling[$_SESSION["List"]["AlignTitle"]].'background:transparent;display:'.(($_NOTITLE)?'none':'block').';" onclick="_SetCaption(\'TD\')">';
echo '<TBODY style="display:inline">';
$tmp = explode('<BR>', $_TITLE);
for($l=0; $l<count($tmp); $l++){
$tmp[$l] = str_replace('&NBSP;','&nbsp;',$tmp[$l]);
echo "<tr>";
$icono = $_URL_IN_MENU[$_SubMode[0]];
if( $icono!="" ){
echo "<td id='ICONTITLE'>";
if( substr($icono,-4)==".svg" ){
echo @file_get_contents($icono);
}else{
echo "<img src='{$icono}'>";
}
}
echo "<td id=TITULO nowrap style='cursor:default;background:transparent;'>{$tmp[$l]}</td></tr>";
}
echo '</TBODY>';
echo "</TABLE>";
}
?>
<div class="ToolsBar ROUNDED2 SHADOW">
<table width="100%" cellspacing="0px" cellpadding="0px" border="0px"><tbody><tr>
<td class="ToolsTDIZQ" style="visibility: hidden;">
<i class="ICONINPUT" style="margin-left:0px;" title="Insertar" onclick="_ModeChange('a')">a</i>
<i class="ICONINPUT" style="margin-left:15px;" title="Buscar" onclick="_ModeFilter()">S</i>
</td><td class="ToolsTDDCH">
<span class="Button ROUNDED2 SHADOW" onclick="_LToolsMenuUser(this)" id="_ToolsOpsUser" style="display: none;">
<span class="ButtonIn ROUNDED2"><i class="ICONWINDOW">a</i> Opciones</span>
</span>
<span class="Button ROUNDED2 SHADOW" onclick="_LToolsTree(this)">
<span class="ButtonIn ROUNDED2"><i class="ICONWINDOW">a</i> Utilidades</span>
</span>
<span class="Button ROUNDED2 SHADOW" id="_ToolsVerCondition" onmouseenter="S(this).tip(&quot;#CONDICIONES&quot;,-2)" style="display:none">
<span class="ButtonIn ROUNDED2"><i class="ICONINPUT">a</i> Ver condiciones</span>
</span>
</td></tr></tbody></table>
</div>
<div class="columna0">
<div class="columna1">Columna1
<div class="columna2">Columna12</div>
</div>
</div>
<div class="columna0"><div class="columna1">Columna2</div></div>
<div class="columna0"><div class="columna1">Columna3</div></div>
<?PHP
echo '</body></html>';
eEnd();
?>
