<?PHP
$NomFile = '../_tmp/ext/bkg_var.'.$_User;
$Dim = file($NomFile);
for( $n=0; $n<count($Dim); $n++ ){
list($k,$v) = explode('|',$Dim[$n]);
$v = trim($v);
${$k} = $v;
if( $k=='SCRIPT_FILENAME' ){
$_SERVER['SCRIPT_FILENAME'] = $v;
}else{
if( $k=='_DB' ){
$_GET[$k] = $v;
}else if( $k=='_iSql' ){
$_SESSION['_iSql'] = $v;
}else{
$_POST[$k] = $v;
}
}
}
@unlink( $NomFile );
$__='{#}eDes{#}';
$_ObjetoIni = 'L';
$OriFichero = '../../edesweb/a/d/report_gen.zdf';
$FicheroD = $_DF = '../../edesweb/a/d/report_gen.zdf';
$_Accion = 'l:../../edesweb/a/d/report_gen.zdf';
$_SubModo = 'l';
$Opcion = $_Modo = $_SubModo;
$_SESSION['_pxW_'] = 1024;
$_SESSION['_PathCSS'] = 'css';
$_SESSION['_User'] = $_User;
$_gsID = getmypid();
$Dir_ = '../../edesweb/';
$_BackgroundReport = true;
include('../../edesweb/_lista_bkg.gs');
eEnd();
?>
