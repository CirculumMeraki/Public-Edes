<?PHP
eHTML('$desktop1_web.php', '', 'Desktop');
echo '<style title="desktop">';
include("css/desktop.css");
?>
BODY {
scroll: no;
overflow-y: hidden;
overflow-x: hidden;
}
</style>
<LINK REL='stylesheet' HREF='css/tab.css' TYPE='text/css' title="tab">
<LINK REL='stylesheet' HREF='css/list.css' TYPE='text/css' title="list">
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type='text/javascript'>
if(typeof(google)!="undefined") google.charts.load('current', {packages: ['corechart']});
</script>
<?=_FileNoCache('core.js', ' Comment="Motor Javascript" id="eDesCore"')?>
<SCRIPT type='text/javascript' SRC='edes.php?E:$lng.php' charset="ISO-8859-1"></SCRIPT>
<?PHP
?>
<script type="text/javascript" Comment="Carga Motor Javascript">
top.S.init(window);
<?PHP
echo "var _WEB_=true,".
"_Master=".(($_gsMaster=='~')?'true,':'false,').
"_WebMaster=".(($_SESSION['_WebMaster']=='S')?'true,':'false,').
"_M_='{$_gsMaster}';";
echo 'var _xMESSAGE = x_MENSAJE = "'.$__Lng[20].'",'.
'_xCONFIRM = x_CONFIRMAR = "'.$__Lng[21].'",'.
'_xWARNING = x_AVISO = "'.$__Lng[25].'",'.
'_xERROR = x_ERROR = "'.$__Lng[80].'",'.
'_xACCEPT = x_Aceptar = "'.$__Lng[75].'",'.
'_xYES = x_Si = "'.$__Lng[76].'",'.
'_xNO = x_No = "'.$__Lng[77].'",'.
'_xCANCEL = x_Cancelar = "'.$__Lng[78].'",'.
'_xPRINT = "'.$__Lng[118].'",'.
'_xCONFIRMPRINT = "'.$__Lng[79].'",'.
'_xLOADING = "'.$__Lng[6].'",'.
'_xSYSTEMBUSY = "'.$__Lng[24].'",'.
'_xCANCELLED = "'.$__Lng[1].'",'.
'_xUPLOADING = "'.$__Lng[108].'",'.
'_xSAVED = "'.$__Lng[109].'",'.
'_xCALCULATED = "'.$__Lng[117].'";'
?>
</script>
</head>
<body>
<img src="g/windows.png" class="WINDOWS OFF" onclick="S(this).windowList()" style="position:fixed;right:10px;top:10px" title="Ventanas minimizadas">
<div id="PROGRESS" style="display:none">
<table border=0 cellSpacing=0 cellPadding=0>
<tr><th></th></tr>
<tr><td>
<div class="progress-wrap">
<div class="progress-value" style='background-image:url(<?=$_PathIMG?>/progress.png)'></div>
<div class="progress-text" style='background-image:url(<?=$_PathIMG?>/progress.png)'></div>
</div>
</td></tr>
<tr class=Detail><td></td></tr>
</table>
</div>
<script type="text/javascript">
<?PHP
if( $_ViewDocSecurity ){
?>
<?PHP
}
if( $_ViewPassChange==1 ){
?>
<?PHP
}
if( $_ViewInfoNovedad ){
?>
<?PHP
}
?>
function Seguridad(){
S.window('edes.php?E:$docsecurity.gs',{
title:'DOCUMENTO DE SEGURIDAD',
minimize:false,
maximize:false,
close:!false,
fullscreen:true
});
}
function CambiarClave(){
S.window('edes.php?FmR:$a/d/usu_clave_who.edf&_SEEK&cd_gs_user=<?=$_SESSION['_User']?>&_CADUCADO=1',{title:'CAMBIE LA CLAVE PARA CONTINUAR'}).modal();
}
function Novedades(){
S.window('edes.php?E:$a/d/gs_novedades.gs&_HA=1&_FILTER='+escape("cdi>='"+_CdiNovedad+"'")+((n!=undefined) ? '&INI=1':''),{title:'ULTIMAS NOVEDADES'}).modal();
}
var DimMenu = [
["-MENU"],
["Documento de Seguridad","","Seguridad()"],
["Cambiar Clave"		 ,"","CambiarClave()"],
["Ultimas novedades"	 ,"","Novedades()"]
];
S("body").tree(DimMenu,{expanded:true,x:50,y:50});
</script>
</body>
</html>
<?PHP
eEnd();
?>
