<!DOCTYPE HTML>
<HTML><HEAD>
<META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<META HTTP-EQUIV='imagetoolbar' CONTENT='no'>
<META NAME='Generator' CONTENT='Tecnología eDes'>
<TITLE> GeSoft </TITLE>
<?php
eInclude($_Sql);
qQuery( "select filename from {$_SESSION['ShareDictionary']}gs_tree where cd_gs_tree={$_Tree}" );
list( $NomTree ) = qRow();
$DimOpciones = file('../tree/'.$NomTree);
$Opciones = array();
for( $n=0; $n<count($DimOpciones); $n++ ){
if( trim($DimOpciones[$n])!='' ) $Opciones[] = array( 'o', strlen($DimOpciones[$n])-strlen(ltrim($DimOpciones[$n])), trim($DimOpciones[$n]), 0 );
}
$nMenu = 0;
for( $n=0; $n<count($Opciones); $n++ ){
if( $n+1 < count($Opciones) ){
if( $Opciones[$n][1] < $Opciones[$n+1][1] ){
$Opciones[$n][0] = 'c';
$Opciones[$n][3] = ++$nMenu;
}
}
}
?>
<style>
BODY {
margin:0;
padding:0;
scroll:no;
}
TH {
text-align: left;
padding-left: 5;
padding-right: 5;
padding-top: 3;
padding-bottom: 3;
border:1 solid #CCCCCC;
font-family: Verdana;
font-size:14;
text-decoration:none;
font-weight:bold;
border:#efefef 1px outset;
padding-left:10px;
cursor:default;
background-color:#f5f5f5;
filter: progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr=#dde5ea, endColorstr=#789aab);
}
TD {
text-align: left;
padding-left: 20;
font-family: Arial;
font-size:12;
text-decoration:none;
font-weight:normal;
cursor:pointer;
padding-top:2px;
padding-bottom:2px;
}
TD .on {
text-align: left;
padding-left: 20;
font-family: Arial;
font-size:11;
text-decoration:none;
font-weight:normal;
cursor:pointer;
padding-top:2px;
padding-bottom:2px;
background-color:#E4F4FD;
color:#0000ff;
}
</style>
<SCRIPT type="text/javascript">
function Menu(){
var Obj = event.srcElement;
if( Obj.tagName!='TD' ) return;
Obj = Obj.parentElement.cells[0];
top.eMMShow( Obj.m, Obj.innerText.replace(/\s/g,'&nbsp;'), Obj.p, 'g/buscar.gif' );
}
</SCRIPT>
<BODY scroll=no onload='top.eMMTopShow()' onhelp='return false' onselectstart='return false' oncontextmenu='return false' ondragstart='return false'>
<?PHP
$Fichero = 'g/logo.jpg';
if( !file_exists($Fichero) ){
$Fichero = 'g/logo.png';
if( !file_exists($Fichero) ) $Fichero = 'g/logo.gif';
}
echo '<table border=0 cellspacing=0 cellpadding=0 width=100% height=100%>';
echo '<tr height=1><td>';
echo '<table border=0 cellspacing=0 cellpadding=0 width=100%>';
echo "<TD style='padding-left:0'><img src='{$Fichero}' border=0 onclick=top.eAbout() title=''>";
echo '<TD width=100%>';
echo '<TD width=1 valign=top><img onclick=top.eMMDesktop() title="Desktop" src="g/desktop_go.gif"></TD>';
echo '<TD width=1 valign=top style="padding-left:5;"><img onclick=top.eMinimize() title="Minimizar" src="g/mini_0.gif"></TD>';
echo '<TD width=1 valign=top style="padding-left:5;padding-right:5;"><img onclick=top.eClose() title="Cerrar" Mensaje="Confirmar la opción de CERRAR" src="g/cerrar_0.gif"></TD>';
echo '</table>';
echo '</td></tr>';
echo '<tr><td>';
echo '<div style="overflow:auto; float:left; width:100%; height:100%; scroll:auto;">';
echo '<table border=0 cellspacing=0 cellpadding=0 onclick="Menu();">';
$pMenu = '';
for( $n=0; $n<count($Opciones); $n++ ){
if( $n+1 < count($Opciones) ){
if( $Opciones[$n][0]=='c' && $Opciones[$n][1] < 2 ){
list( $txt,,$Descripcion ) = explode('~',$Opciones[$n][2]);
list( $txt, $url ) = explode('|',$txt);
if( $Opciones[$n][1]==0 ){
echo '<tr><th colspan=2>';
}else if( $Opciones[$n][1]==1 ){
echo '<tr><td m='.$Opciones[$n][3].' p="'.$pMenu.'">';
}
$graf = '';
if( $txt[0]=='{' ){
list( $graf, $txt ) = explode('}',substr($txt,1));
}else if( $txt[0]=='[' ){
list( $graf, $txt ) = explode(']',substr($txt,1));
}
if( $graf!='' ){
if( $graf[0]=='$' ) $graf = 'edes.php?R:$a/g/'.substr($graf,1);
echo '<img src='.$graf.'> ';
}
$txt = trim($txt);
if( $Opciones[$n][1]==0 ) $pMenu = $txt;
echo $txt;
echo '<td>'.$Descripcion;
}
}
}
echo '</table>';
echo '</div>';
echo '</td></tr>';
echo '</table>';
echo '</body></html>';
eEnd();
