<?=eHTML();?>
</HEAD>
<BODY>
<SCRIPT type="text/javascript">
var _Source = 'WDESKTOP';
<?PHP
if( !isset($_SESSION['_User']) ) exit;
include_once($Dir_.$_Sql.'.inc');
if( isset($_FILTER) ){
$n = qCount('gs_novedad', stripslashes($_FILTER)." and cdi<'".date('Y-m-d H:i:s')."'");
if( $n>0 ){
eInit();
$_Accion = 'Ll:$a/d/gs_novedad.edf';
$_SERVER["QUERY_STRING"] = str_replace('edes.php?E:$a/d/gs_novedades.gs', $_Accion, $_SERVER["QUERY_STRING"]);
_TraceDevelopment();
$__='{#}eDes{#}';
$_ObjetoIni = 'L';
if( substr_count($_Accion,'.') == 0 ){
$_Accion .= '.edf';
$_DF .= '.edf';
}
$NomScript = '_lista.gs';
$_Accion = substr($_Accion,1);
include( $Dir_.$NomScript );
eEnd();
?>
<?PHP
}else{
if( !isset($INI) ){
?>
top.S("body",top).tip('No hay novedades este mes',3);
setTimeout(function(){
top.S(window).window();
},3000);
<?PHP
}
}
echo '</SCRIPT></BODY></HTML>';
eEnd();
}
$cdi = date('Y-m-d H:i:s');
sql_Modifica( 'gs_user', "ys_news='{$cdi}'", "cd_gs_user={$_User}" );
$HaceUnMes = date( 'Y-m-d H:i:s', mktime( date('H'),date('i'),date('s'), date('m')-1, date('d'), date('Y') ));
?>
top._CdiNovedad = '<?= $HaceUnMes ?>';
top._SinNovedad = true;
if( top.Avisar!=undefined ) top.Avisar('AvNov,0,Novedades;');
top.S(window.frameElement.WOPENER).window();
</SCRIPT>
</BODY>
</HTML>
