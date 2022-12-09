<?PHP
if( !function_exists('qQuery') ){
eval(qSetup());
include_once('../../edesweb/'.$_Sql.'.inc');
}
$_TITULO = str_replace( ' onclick="_SetCaption(\'TD\')"', '', $_POST['_TITULO'] );
$_TITULO = eEntityDecode(utf8_decode($_TITULO), false);
$_IMPRIMIR = eEntityDecode(utf8_decode($_POST['_IMPRIMIR']), false);
$_TREG = $_POST['_TREG'];
$ePagina = str_replace( "\n", ' ', $_POST['_TITULOTXT'] );
$ePagina = str_replace( "\r", ' ', $ePagina );
$Quitar = array(
array( 'onresize='		,'on_resize='),
array( 'onmouseleave='	,'on_mouseleave='),
array( 'onmousemove='	,'on_mousemove'),
array( 'onmousedown='	,'on_mousedown'),
array( 'oncontextmenu='	,'on_contextmenu'),
array( 'onclick='		,'on_click')
);
for($n=0; $n<count($Quitar); $n++) $_IMPRIMIR = str_replace( $Quitar[$n][0], $Quitar[$n][1], $_IMPRIMIR );
$txt = eHTML('$logprint.php', "", "", true);
$txt .= <<<EOT
<LINK REL='stylesheet' HREF='{$_SESSION['_PathCSS']}/list.css' TYPE='text/css'>
<LINK REL='stylesheet' HREF='{$_SESSION['_PathCSS']}/list_print.css' TYPE='text/css' MEDIA='print'>
</HEAD>
<BODY>
{$_TITULO}
{$_IMPRIMIR}
</BODY>
</HTML>
EOT;
$sFile = '../_tmp/log/lst_'.$_SESSION['_User'].'.htm';
file_put_contents($sFile, $txt);
if( $_Estadistica ){
if( $_SESSION["LogTrace"]["D*"] || $_SESSION["LogTrace"]["DPRN"] ){
sql_Inserta('gs_acceso',
'cd_gs_toperacion,				  conexion      , objeto, modo, edf, tabla, parametros,   pagina   , parametro, registros, cd_gs_user, cd_gs_node,    cdi',
"     'DOC'      ,'{$_SESSION['_Connection_']}',   'D' , 'l' , '' , 'PRN',     ''    ,'{$ePagina}',     ''   , {$_TREG} , '{$_User}', '{$_SESSION['_Node']}', '".date('Y-m-d H:i:s')."'", 'num_acceso' );
$SerialDOC = qId();
$Dir = eGetCWD();
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ){
$ExeZip = "zip -9 -j -b {$Dir} ".$_SESSION["LogFileDownload"].$SerialDOC." ".eScript($sFile);
}else{
$ExeZip = eScript('$win/zip.exe')." -9 -j -b {$Dir} ".$_SESSION["LogFileDownload"].$SerialDOC." ".eScript($sFile);
}
$Dim = array();
exec($ExeZip, $Dim);
}
if( $_SESSION["LogGsAccessFile"]!='' ) error_log(date('Y-m-d H:i:s')."|{$_User}|{$_SESSION['_Node']}|{$_SESSION['_Connection_']}|Imprimir listado\n", 3, $_SESSION["LogGsAccessFile"]);
}
echo "ok";
eEnd();
?>
