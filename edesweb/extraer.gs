<?PHP
$_DEBUG = 0;
if( isset($_BackgroundShow) ) eTrace('$extraer.gs');
if( $GLOBALS['_TronDownLoad'] ) error_log("1\n", 3, '___download__.info');
eUnset("cd_gs_entidad");
if( isset($_BKG) ){
$NomFile = '../_tmp/ext/bkg_post.'.$_User;
$Dim = file( $NomFile );
for( $n=0; $n<count($Dim); $n++ ){
if( trim($Dim[$n])!='' ){
list( $k, $v ) = explode('|',$Dim[$n]);
$k = trim($k);
$v = trim($v);
if( substr($k,0,5)=='def__' ) ${$k} = $v;
$_POST[$k] = $v;
}
}
if( $GLOBALS['_TronDownLoad'] ) error_log( "2.Post grabado\n", 3, '___download__.info' );
}
if( isset($_GET['DB']) ){
if( substr_count(str_replace('\\','/',$_GET['DB']),'/')==0 ) $_GET['DB'] = '/_datos/config/'.$_GET['DB'];
if( substr_count($_GET['DB'],'.')==0 ) $_GET['DB'] .= '.ini';
include_once( eScript($_GET['DB']) );
}
if( $GLOBALS['_TronDownLoad'] ) error_log( '1.File: '.$_DownloadPath."\n", 3, '___download__.info' );
if( $_DownloadPath=='' ) $_DownloadPath = '/_tmp/ext/';
if( substr($_DownloadPath,-1)!='/' && substr($_DownloadPath,-1)!='\\' ) $_DownloadPath .= '/';
$_sDownloadPath = $_DownloadPath;
if( $GLOBALS['_TronDownLoad'] ) error_log( '2.File: '.$_DownloadPath."\n", 3, '___download__.info' );
$_DownloadPath = eScript($_DownloadPath);
if( $GLOBALS['_TronDownLoad'] ) error_log( '3.File: '.$_DownloadPath."\n", 3, '___download__.info' );
$_En2Plano = ($_DownloadUrl!='');
$_DirRoot = eGetCWD();
if( substr($_DirRoot,-1) != '/' ) $_DirRoot .= '/';
$sg = gettimeofday();
$_SecondINI = (int)$sg["sec"];
$def__online = str_replace(' ','',trim(strtoupper($def__online)));
$_VirtualVALUE = array();
$_VirtualFIELD = array();
$_EjecutaIF_EVAL = array();
$_EjecutarIF_FIELD = array();
$_cd_gs_formato = $_POST['def__cd_gs_formato'];
if( substr_count($def__online, '2')>0 ) $def__online = '2';
if(       $def__online=='' && !isset($_En2Plano) ){
$def__online = 'D';
$_En2Plano = false;
}else if( $def__online=='' &&  isset($_En2Plano) ){
$def__online = ($_En2Plano) ? '2':'D';
}else if( $def__online!='' ){
$_En2Plano = ($def__online=='2');
}
if( isset($_BKG) ){
$def__online = '2';
$_En2Plano = true;
$_DEBUG = 0;
}
DondeEstoy('_dir_1');
if( $GLOBALS['_TronDownLoad'] ) error_log("_DownloadPath: {$_DownloadPath}\n", 3, '___download__.info');
$TempFile = tempnam($_DownloadPath, '');
$TempFile = str_replace('\\','/',$TempFile);
$tmp = explode('/',$TempFile);
$TempFile = $tmp[count($tmp)-1];
if( $GLOBALS['_TronDownLoad'] ) error_log('File: '.$TempFile."\n", 3, '___download__.info');
$_UnloadWrapWidth = eFileGetVar("Setup.UnloadWrapWidth");
if( !isset($_UnloadWrapWidth) ) $_UnloadWrapWidth = 400;
$_UnloadWrapWidth = $_UnloadWrapWidth * 1;
if( !isset($_BKG) ) include_once($Dir_.'message.inc');
include_once($Dir_.$_Sql.'.inc');
include_once($Dir_.'condicion.inc');
if( isset($_BKG) ) $def__online = '2';
if( $_En2Plano ){
if( $GLOBALS['_TronDownLoad'] ) error_log( "3a\n", 3, '___download__.info' );
$_DEBUG = 0;
$_Debug2Plano = false;
}else{
if( $GLOBALS['_TronDownLoad'] ) error_log( "3b\n", 3, '___download__.info' );
$_DEBUG = ( $_Debug2Plano ) ? 1:0;
}
if( $GLOBALS['_TronDownLoad'] ){
error_log( 'HTTP_HOST: '.$_SERVER['HTTP_HOST']."\n", 3, '___download__.info' );
error_log( 'php_uname("n"): '.php_uname('n')."\n", 3, '___download__.info' );
}
if( isset($_BackgroundShow) ) $_DEBUG = 1;
if( $_POST['def__include']!='' ){
if( isset($_BackgroundShow) ) eTrace( 'Include: '.$_POST['def__include']);
include( eScript($_POST['def__include']) );
}
$Pijama = true;
$Etiquetas = array();
$Formato = array();
$ListaAlineacion = array();
$ListaRelacion = array();
$ListaRelacionTabla = array();
$ListaAnchos = array();
$ListaAlineacion = array();
$Estructura = array();
$EtiCount = array();
$ValCount = array();
$_RegActual = '';
$_IdReg = 0;
$_InformarCada = 1000;
switch( $_SESSION['_iSql'] ){
case 'mysql':
eInclude('mysql.class');
$_db_ = new eMySql();
break;
case 'mysqli':
eInclude('mysqli.class');
$_db_ = new eMySqli();
break;
case 'informix':
eInclude('informix.class');
$_db_ = new eInformix();
break;
case 'oracle':
eInclude('oracle.class');
$_db_ = new eOracle();
break;
case 'pdo':
eInclude('pdo.class');
$_db_ = new ePdo();
break;
}
$_db_->qConnect('sql');
if( !isset($_BKG) ){
$_RastroSQL = '../_tmp/ext/bkg_sqli.'.date('His');
if( $GLOBALS['_TronDownLoad'] ) error_log( "4a\n", 3, '___download__.info' );
if( isset($_BackgroundShow) ) eTrace('!$_BKG');
eHTML('$extraer.gs');
?>
<LINK REL='stylesheet' HREF='<?=$_SESSION['_PathCSS']?>/ficha.css' TYPE='text/css'>
</HEAD>
<BODY scroll=auto>
<?PHP
$_User = $_POST["def__gs_usuario"];
set_time_limit( 30*60 );
Procesar();
echo '</BODY></HTML>';
$_db_->qEnd();
eEnd();
}else{
$_RastroSQL = '../_tmp/ext/bkg_sql.'.$_BKG;
if( $GLOBALS['_TronDownLoad'] ) error_log( "4b\n", 3, '___download__.info' );
if( isset($_BackgroundShow) ) eTrace('$_BKG');
Procesar();
if( $GLOBALS['_TronDownLoad'] ) error_log( "FIN\n", 3, '___download__.info' );
$_db_->qEnd();
eBkgEnd();
}
function Procesar(){
global $Formato, $Etiquetas, $ListaAlineacion, $Pijama, $ListaRelacion, $ListaRelacionTabla, $ListaAnchos, $ListaAlineacion;
global $_DEBUG, $cd_gs_destino, $_User, $cd_gs_formato, $cd_gs_entidad, $_BackgroundShow;
global $EtiCount, $ValCount, $_Debug2Plano, $_Sql, $_SqlPDOType, $_BKG, $Estructura, $_db_;
global $_DirFuentes, $_DownloadPath, $_sDownloadPath, $def__online, $_VirtualVALUE, $_VirtualFIELD, $_EjecutaIF_EVAL, $_EjecutarIF_FIELD;
$DimFuncUser = get_defined_functions();
DondeEstoy( '_dir_2' );
$Tabla = array();
$Alias = array();
$NumAlias = 65;
$ListaCampos = '';
$ListaTablas = '';
$CamposDeCondi = '';
$TablaConCondi = array();
$DimAliasCampo = array();
CalculaDBRange();
$DimNomVar = array_keys($_POST);
$DimValor  = array_values($_POST);
for( $n=0; $n<count($_POST); $n++ ){
if( substr( $DimNomVar[$n],0,5 ) == 'def__' ){
$NomVar = substr( $DimNomVar[$n], 5 );
${$NomVar} = $DimValor[$n];
continue;
}
if( substr( $DimNomVar[$n], 0, 1 ) == '_' ) continue;
$DimValor[$n] = trim($DimValor[$n]);
if( strlen($DimValor[$n]) > 0 ){
if( strlen($CamposDeCondi) > 0 ) $CamposDeCondi .= ',';
$CamposDeCondi .= "'{$DimNomVar[$n]}'";
$ValCount[ $DimNomVar[$n] ] = $DimValor[$n];
}
}
$_db_->qQuery("select * from {$_SESSION['ShareDictionary']}gs_formato where cd_gs_formato='{$cd_gs_formato}' and cd_gs_user='{$_User}'");
$Formato = $_db_->qArray();
$cd_gs_entidad = $Formato['cd_gs_entidad'];
if( $cd_gs_entidad=='' ){
if( !isset($_BKG) ){
eMessage('ERROR: Formato no encontrado','HSE');
}else{
eBkgEnd( 'E', 'Formato no encontrado' );
}
}
$_db_->qQuery( "select * from {$_SESSION['ShareDictionary']}gs_entidad where cd_gs_entidad='{$cd_gs_entidad}'" );
$Entidad = $_db_->qArray();
$gs_tabla = trim($Entidad['tabla']);
if( $gs_tabla=='' ){
if( !isset($_BKG) ){
eMessage('ERROR: Formato no encontrado','HSE');
}else{
eBkgEnd( 'E', 'Formato no encontrado (tabla)' );
}
}
$Tabla[] = $gs_tabla;
$Alias[$gs_tabla] = chr($NumAlias++);
$ListaTablas .= $gs_tabla.' as '.$Alias[$gs_tabla];
$TablaConCondi[$gs_tabla] = 'X';
if( $_Debug2Plano ){
eTrace('');
eTrace( 'CamposDeCondi.: '.$CamposDeCondi );
eTrace( 'Tabla.........: '.$gs_tabla );
eTrace( 'Entidad.......: '.$cd_gs_entidad );
eTrace( "SQL...........: select tabla,campo,relacion,etiqueta from {$_SESSION['ShareDictionary']}gs_campo where cd_gs_entidad='{$cd_gs_entidad}' and campo in ( $CamposDeCondi )" );
eTrace('');
}
$Busca = '';
if( $CamposDeCondi != '' ){
$TCamposExist = $_db_->qCount("{$_SESSION['ShareDictionary']}gs_campo", "cd_gs_entidad='{$cd_gs_entidad}' and campo in ( $CamposDeCondi )" );
$_db_->qQuery( "select tabla,campo,relacion,etiqueta from {$_SESSION['ShareDictionary']}gs_campo where cd_gs_entidad='{$cd_gs_entidad}' and campo in ( $CamposDeCondi )" );
if( $_Debug2Plano ) eTrace('[ CAMPOS DE LA CONDICION ]');
while( $DefCampo = $_db_->qArray() ){
$DefCampo['tabla'] = trim($DefCampo['tabla']);
$DefCampo['tabla'] = str_replace( '&quot;','"', $DefCampo['tabla'] );
$DefCampo['tabla'] = str_replace( '&#39;' ,"'", $DefCampo['tabla'] );
$DefCampo['campo'] = trim($DefCampo['campo']);
$DefCampo['campo'] = str_replace( '&quot;','"', $DefCampo['campo'] );
$DefCampo['campo'] = str_replace( '&#39;' ,"'", $DefCampo['campo'] );
$DefCampo['etiqueta'] = trim($DefCampo['etiqueta']);
$DefCampo['etiqueta'] = str_replace( '&quot;','"', $DefCampo['etiqueta'] );
$DefCampo['etiqueta'] = str_replace( '&#39;' ,"'", $DefCampo['etiqueta'] );
if( $_Debug2Plano ) eTrace( 'CAMPO: '.$DefCampo['campo'] );
$sRelacion = trim($DefCampo['relacion']);
$sRelacion = str_replace( '&quot;','"', $sRelacion );
$sRelacion = str_replace( '&#39;' ,"'", $sRelacion );
$sRelacion = str_replace( ' and ','#and#', $sRelacion );
$sRelacion = str_replace( ' or ','#or#', $sRelacion );
$sRelacion = str_replace( ' ','', $sRelacion );
$sRelacion = str_replace( '#and#',' and ', $sRelacion );
$sRelacion = str_replace( '#or#',' or ', $sRelacion );
if( !in_array( $sRelacion, $ListaRelacion ) && !empty($sRelacion) ){
$ListaRelacionTabla[] = $DefCampo['tabla'];
$ListaRelacion[] = $sRelacion;
}
if( !in_array( $DefCampo['tabla'], $Tabla ) ){
$Tabla[] = $DefCampo['tabla'];
$Alias[$DefCampo['tabla']] = chr($NumAlias++);
$TablaConCondi[$DefCampo['tabla']] = 'X';
if( !empty($ListaTablas) ) $ListaTablas .= ', ';
$ListaTablas .= $DefCampo['tabla'].' as '.$Alias[$DefCampo['tabla']];
}
$DimAliasCampo[ $DefCampo['campo'] ] = $Alias[$DefCampo['tabla']];
$EtiCount[ $DefCampo['campo'] ] = $DefCampo['etiqueta'];
if( $_Debug2Plano ){
eTrace( 'Alias....: '.$DimAliasCampo[ $DefCampo['campo'] ] );
eTrace( 'Tabla....: '.$DefCampo['tabla'] );
eTrace( 'Campo....: '.$DefCampo['campo'] );
eTrace( 'Relacion.: '.$sRelacion );
eTrace( '' );
}
}
if( count(explode(',',$CamposDeCondi)) != $TCamposExist ){
$Dim = explode(',',str_replace("'",'',$CamposDeCondi));
if( $_POST['_SqlToTron_']=='S' ) eTron('>>> Faltan campos de condición en "gs_campo" -> '."cd_gs_entidad='{$cd_gs_entidad}' and campo in ( $CamposDeCondi )" );
for( $n=0; $n<count($Dim); $n++ ){
if( $DimAliasCampo[ trim($Dim[$n]) ] == '' ) {
$DimAliasCampo[ trim($Dim[$n]) ] = 'A';
if( $_POST['_SqlToTron_']=='S' ) eTron('  > Faltan campos de condición: Se asigna "A" al campo '.trim($Dim[$n]) );
}
}
}
if( $_Debug2Plano ) eTrace('[ CONDICIONES ]');
for( $n=0; $n < count($_POST); $n++ ){
$xCampo = trim($DimNomVar[$n]);
if( $xCampo[0] == '_' ) continue;
if( substr( $xCampo, 0, 5 ) == 'def__' ) continue;
$DimValor[$n] = trim(stripslashes( $DimValor[$n] ));
$DimNomVar[$n] = trim($DimNomVar[$n]);
if( $_DBMEMO[ $DimNomVar[$n] ] ){
$DimValor[$n] = urldecode( $DimValor[$n] );
}
if( substr( $DimNomVar[$n], 0, 1 ) == '_' ) continue;
if( substr( $DimNomVar[$n], 0, 5 ) == 'def__' ) continue;
if( eSqlType('pdo.informix') ){
}else{
if( !eSqlType('oracle') && strlen($DimValor[$n])==10 && substr($DimValor[$n],2,1)=='-' && substr($DimValor[$n],5,1)=='-' ){
$DimValor[$n] = substr($DimValor[$n],6,4).substr($DimValor[$n],2,4).substr($DimValor[$n],0,2);
}
}
$DimValor[$n] = trim($DimValor[$n]);
if( strlen($DimValor[$n]) > 0 ){
if( $_Debug2Plano ) eTrace( '-> CONDICION: '.$DimNomVar[$n].' = '.$DimValor[$n]);
if( $DimAliasCampo[ $DimNomVar[$n] ]!='' ){
$sBusca = CondiSQL( $DimAliasCampo[ $DimNomVar[$n] ].'.'.$DimNomVar[$n], $DimValor[$n] );
}else{
$sBusca = CondiSQL( $DimNomVar[$n], $DimValor[$n] );
}
if( $sBusca!= '' ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $sBusca;
}
}
if( $_Debug2Plano ) eTrace(': '.$Busca .' | '. $DimAliasCampo[ $DimNomVar[$n] ]. ' | '. $DimNomVar[$n] );
}
}
if( $_Debug2Plano ){
eTrace('Busca: '.$Busca);
eTrace('');
}
$Condicion = $Busca;
if( empty($Condicion) ) $Condicion = '1=1';
if( $GLOBALS['_TronDownLoad'] ) error_log( 'Tipo: '.$cd_gs_destino."\n", 3, '___download__.info' );
if( $cd_gs_destino!='REC' ){
if( $_db_->qCount( 'gs_formato', "cd_gs_formato='{$cd_gs_formato}' and cd_gs_user='{$_User}'" ) == 0 ){
if( $GLOBALS['_TronDownLoad'] ) error_log( "Error:1\n", 3, '___download__.info' );
if( !isset($_BKG) ){
eMessage('ERROR: Definición de listado no encontrada','HSE');
}else{
eBkgEnd( 'E', 'Definición de listado no encontrada' );
}
}
$_db_->qQuery( "select * from gs_formato where cd_gs_formato='{$cd_gs_formato}' and cd_gs_user='{$_User}'" );
$Formato = $_db_->qArray();
$ListaNumCampos = str_replace('#',',',$Formato['formato']).",";
$ListaNumCampos = str_replace(' ','',$ListaNumCampos);
$ListaNumCampos = str_replace(',,','',$ListaNumCampos);
if( $GLOBALS['_DEBUG']==4 ) error_log( ":Al entrar\n", 3, '../_tmp/log/sql.'.$_SESSION['_User'] );
if( $_Debug2Plano ) eTrace('ListaNumCampos: '.$ListaNumCampos);
if( $GLOBALS['_DEBUG']==4 ) error_log( ":{$ListaNumCampos}\n", 3, '../_tmp/log/sql.'.$_SESSION['_User'] );
$DimCampos = explode(',', $ListaNumCampos );
$ListaCampos = '';
if( $GLOBALS['_DEBUG']==4 ) error_log( ":".count($DimCampos)."\n", 3, '../_tmp/log/sql.'.$_SESSION['_User'] );
for( $n=0; $n<count($DimCampos); $n++ ){
if( $GLOBALS['_DEBUG']==4 ) error_log( ":{$n}={$DimCampos[$n]}\n", 3, '../_tmp/log/sql.'.$_SESSION['_User'] );
$_db_->qQuery( "select * from {$_SESSION['ShareDictionary']}gs_campo where cd_gs_campo={$DimCampos[$n]}" );
$DimCampo = $_db_->qArray();
$DimCampo['tipo'] = str_replace( '&quot;', '"', $DimCampo['tipo'] );
$DimCampo['tipo'] = str_replace( '&#39;', "'", $DimCampo['tipo'] );
if( trim($DimCampo['tabla'])=='' ) continue;
$sRelacion = trim($DimCampo['relacion']);
$sRelacion = str_replace( ' and ','#and#', $sRelacion );
$sRelacion = str_replace( ' or ','#or#', $sRelacion );
$sRelacion = str_replace( ' ','', $sRelacion );
$sRelacion = str_replace( '#and#',' and ', $sRelacion );
$sRelacion = str_replace( '#or#',' or ', $sRelacion );
if( !in_array( $sRelacion, $ListaRelacion ) && !empty($sRelacion) ){
$ListaRelacion[] = $sRelacion;
$ListaRelacionTabla[] = $DimCampo['tabla'];
if( $_Debug2Plano ) eTrace(' > Relacion: '.$sRelacion);
}
$DimCampo['tabla'] = trim($DimCampo['tabla']);
if( !in_array( $DimCampo['tabla'], $Tabla ) ){
$Tabla[] = $DimCampo['tabla'];
$Alias[$DimCampo['tabla']] = chr($NumAlias++);
if( !empty($ListaTablas) ){
if( empty($TablaConCondi[$DimCampo['tabla']]) ){
if( !eSqlType('mysql,mysqli') ){
$ListaTablas .= ', outer ';
}else{
$ListaTablas .= ' left join ';
}
}else{
$ListaTablas .= ', ';
}
}
$ListaTablas .= $DimCampo['tabla'].' as '.$Alias[$DimCampo['tabla']];
if( eSqlType('mysql,mysqli') ) $ListaTablas .= ' on {#'.$DimCampo['tabla'].'#} ';
}
$DimCampo['campo'] = trim($DimCampo['campo']);
if( $_Debug2Plano ) eTrace( 'CAMPO(i): '.$DimCampo['campo'].' -> '.$DimCampo['tipo'] );
$YaAlias = false;
if( substr_count($DimCampo['campo'],',') > 0 ){
$DimCampo['campo'] = VariosCampos( $Alias, $DimCampo, $_Sql );
$YaAlias = true;
}
if( $_Debug2Plano ) eTrace( 'CAMPO(f): '.$DimCampo['campo'].' -> '.$DimCampo['tipo'] );
$sListaCampos = $ListaCampos;
if( !empty($ListaCampos) ) $ListaCampos .= ',';
$RastroCampo = false;
if( $DimCampo['tipo']!='' && substr_count( $DimCampo['tipo'], '#') > 0 ){
if( $RastroCampo ) error_log( '1: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
if( $DimCampo['tipo'][0]=='(' ){
if( $RastroCampo ) error_log( '2: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
$_EjecutaIF_EVAL[$n] = 'return ('.$DimCampo['tipo'].');';
$_EjecutarIF_FIELD[$n] = true;
if( $YaAlias ){
$ListaCampos .= trim($DimCampo['campo']);
}else{
$ListaCampos .= $Alias[$DimCampo['tabla']].'.'.trim($DimCampo['campo']);
}
if( $_Debug2Plano ) eTrace( $DimCampo['tabla'].'.'.trim($DimCampo['campo']).' -> '.$Alias[$DimCampo['tabla']].'.'.trim($DimCampo['campo']) );
}else{
if( $RastroCampo ) error_log( '3: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
if( substr_count( $DimCampo['tipo'], '(') == 1 && substr_count( $DimCampo['tipo'], ')') == 1 ){
if( $RastroCampo ) error_log( '4: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
list( $FuncDePHP ) = explode( '(', $DimCampo['tipo'] );
if( in_array( strtolower(trim($FuncDePHP)), $DimFuncUser['user'] ) ){
if( $RastroCampo ) error_log( '5: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
$_EjecutaIF_EVAL[$n] = 'return ('.$DimCampo['tipo'].');';
$_EjecutarIF_FIELD[$n] = true;
$DimCampo['tipo'] = $DimCampo['campo'];
}else{
if( $RastroCampo ) error_log( '6: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
}
}
if( $YaAlias ){
if( $RastroCampo ) error_log( '7: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
$ListaCampos .= str_replace('#',trim($DimCampo['campo']), $DimCampo['tipo'] );
}else{
if( $RastroCampo ) error_log( '8: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
if( substr_count( $DimCampo['tipo'], '#') > 0 ){
if( $RastroCampo ) error_log( '8a: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
$ListaCampos .= str_replace( '#', $Alias[$DimCampo['tabla']].'.'.trim($DimCampo['campo']), $DimCampo['tipo'] );
}else{
if( $RastroCampo ) error_log( '8b: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
if( substr( trim($DimCampo['campo']), 0, 1 ) != '(' ){
if( $RastroCampo ) error_log( '8c: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
$ListaCampos .= $Alias[$DimCampo['tabla']].'.'.trim($DimCampo['campo']);
}else{
if( $RastroCampo ) error_log( '8d: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
$ListaCampos .= trim($DimCampo['campo']);
}
}
}
if( $_Debug2Plano ) eTrace( $DimCampo['tabla'].'.'.trim($DimCampo['campo']).' -> '.str_replace('#',$Alias[$DimCampo['tabla']].'.'.trim($DimCampo['campo']), $DimCampo['tipo'] ) );
}
}else{
if( $RastroCampo ) error_log( '9: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
if( $DimCampo['tipo']!='' ){
if( $RastroCampo ) error_log( '10: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
if( substr_count( $DimCampo['tipo'], '(') == 1 && substr_count( $DimCampo['tipo'], ')') == 1 ){
if( $RastroCampo ) error_log( '11: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
$DimCampo['campo'] = str_replace( $DimCampo['campo'],$Alias[$DimCampo['tabla']].'.'.$DimCampo['campo'], $DimCampo['tipo'] );
$YaAlias = true;
}else{
if( $RastroCampo ) error_log( '12: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
$Dim = explode(';',trim($DimCampo['tipo']));
for( $i=0; $i<count($Dim); $i++ ){
list( $k, $v ) = explode( ',', $Dim[$i] );
$_VirtualVALUE[$n.':'.trim($k)] = trim($v);
$_VirtualFIELD[$n] = true;
}
}
}
if( $YaAlias ){
if( $RastroCampo ) error_log( '13: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
if( $_Debug2Plano ) eTrace( '13: '.$DimCampo['campo'].' -> '.$DimCampo['tipo'] );
$ListaCampos .= trim($DimCampo['campo']);
}else{
if( $RastroCampo ) error_log( '14: '.$DimCampo['campo'].' -> '.$DimCampo['tipo']."\n", 3, '__extraer__.txt' );
if( $_Debug2Plano ) eTrace( '14: '.$DimCampo['campo'].' -> '.$DimCampo['tipo'] );
$ListaCampos .= $Alias[$DimCampo['tabla']].'.'.trim($DimCampo['campo']);
}
if( $_Debug2Plano ) eTrace( $DimCampo['tabla'].'.'.trim($DimCampo['campo']).' -> '.$Alias[$DimCampo['tabla']].'.'.trim($DimCampo['campo']) );
}
$Etiquetas[] = $DimCampo['etiqueta'];
$ListaAnchos[] = $DimCampo['ancho'];
$ListaAlineacion[] = $DimCampo['alineacion'];
$Estructura[] = array( trim(substr( $ListaCampos, strlen($sListaCampos) )), $DimCampo['ancho'], $DimCampo['decimales'], $DimCampo['alineacion'], $DimCampo['campo'] );
if( $_Debug2Plano ){
eTrace( '>>> '.$DimCampo['campo'].' - '.$DimCampo['ancho'].' - '.$DimCampo['decimales'].' - '.$DimCampo['alineacion'] );
}
switch( strtoupper($DimCampo['alineacion']) ){
case 'I':
$ListaAlineacion[$n] = 'i';
break;
case 'C':
$ListaAlineacion[$n] = 'c';
break;
case 'D':
$ListaAlineacion[$n] = 'd';
break;
case 'L':
$ListaAlineacion[$n] = 'L';
break;
default:
$ListaAlineacion[$n] = 'i';
}
}
}
if( $_Debug2Plano ) eTrace('-----------------------------------------------------------------------');
if( $GLOBALS['_DEBUG']==4 ) error_log( ":Al final\n", 3, '../_tmp/log/sql.'.$_SESSION['_User'] );
for( $n=0; $n<count($ListaRelacion); $n++ ){
$inicio = -1;
$final = -1;
$OnOff = false;
$NumTabla = -1;
$DimPosTabla = array();
if( $_Debug2Plano ) eTrace('ListaRelacion: ['.$ListaRelacion[$n].'] Tabla: ['.$ListaRelacionTabla[$n].']');
for( $i=strlen($ListaRelacion[$n])-1; $i>=0; $i-- ){
$c = substr($ListaRelacion[$n],$i,1 );
if( $c == '.' ){
$final = $i;
$inicio = -1;
$OnOff = true;
$DimPosTabla[++$NumTabla] = array( $inicio, $final );
}else if( substr_count( " ('=", $c ) > 0 && $OnOff ){
$inicio = $i;
$OnOff = false;
$DimPosTabla[$NumTabla][0] = $inicio+1;
}
}
if( $OnOff ) $DimPosTabla[$NumTabla][0] = 0;
for( $i=0; $i<count($DimPosTabla); $i++ ){
if( $_Debug2Plano ) eTrace( 'I: '.$ListaRelacion[$n] );
$inicio = $DimPosTabla[$i][0];
$final = $DimPosTabla[$i][1] - $inicio;
$sTabla = substr( $ListaRelacion[$n], $inicio, $final );
if( $_Debug2Plano ) eTrace( '['.$sTabla.'] - '.strlen(substr( $ListaRelacion[$n], $inicio, $final )) );
if( $_Debug2Plano ) eTrace( 'ListaRelacion.i['.$ListaRelacion[$n].']' );
$ListaRelacion[$n] = substr( $ListaRelacion[$n],0,$inicio ).
$Alias[$sTabla].'.'.
substr( $ListaRelacion[$n], $DimPosTabla[$i][1]+1 );
if( $_Debug2Plano ) eTrace( 'ListaRelacion.f['.$ListaRelacion[$n].']' );
}
if( !eSqlType('mysql,mysqli') ){
if( !empty($Condicion) ) $Condicion .= ' and ';
$Condicion .= $ListaRelacion[$n];
if( $_Debug2Plano ) eTrace( 'Condicion['.$Condicion.']' );
}else{
if( $_Debug2Plano ) eTrace( 'ListaTablas.1['.$sTabla.']' );
if( $_Debug2Plano ) eTrace( 'ListaTablas.2['.$ListaRelacion[$n].']' );
if( $_Debug2Plano ) eTrace( 'ListaTablas.3['.$ListaTablas.']' );
$ListaTablas = str_replace( '{#'.$ListaRelacionTabla[$n].'#}', $ListaRelacion[$n], $ListaTablas );
if( $_Debug2Plano ) eTrace( 'ListaTablas['.$ListaTablas.']' );
}
}
if( $_Debug2Plano ) eTrace('-----------------------------------------------------------------------');
if( $_Debug2Plano ) eTrace('Condicion: '.$Condicion);
if( $GLOBALS['_TronDownLoad'] ) error_log( "Paso-1\n", 3, '___download__.info' );
if( $cd_gs_destino!='REC' ){
$ListaNumCampos = str_replace('#' ,',',$Formato['ordenacion']).",";
$ListaNumCampos = str_replace(' ' ,'' ,$ListaNumCampos);
$ListaNumCampos = str_replace(',,','' ,$ListaNumCampos);
if( trim($_POST['_ORDEN_'])=='' ){
$ListaOrdenacion = '';
$DimCampos = explode(',', $ListaNumCampos );
for( $n=0; $n<count($DimCampos); $n++ ){
$_db_->qQuery( "select * from {$_SESSION['ShareDictionary']}gs_campo where cd_gs_campo={$DimCampos[$n]}" );
$DimCampo = $_db_->qArray();
if( !empty($ListaOrdenacion) ) $ListaOrdenacion .= ',';
$tmp = trim($DimCampo['campo']);
if( substr_count( $tmp, ' as ' ) == 1 ){
list( ,$tmp ) = explode( ' as ',trim($DimCampo['campo']));
$ListaOrdenacion .= trim($tmp);
}else{
$ListaOrdenacion .= $Alias[trim($DimCampo['tabla'])].'.'.$tmp;
}
}
}else{
$ListaOrdenacion = $_POST['_ORDEN_'];
}
if( $_Debug2Plano ) eTrace( "SQL: select {$ListaCampos} from {$ListaTablas} where {$Condicion} order by {$ListaOrdenacion}" );
}
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ){
if( $GLOBALS['_TronDownLoad'] ) error_log( "NO WIN\n", 3, '___download__.info' );
$nombre = substr( $GLOBALS['TempFile'], strrpos($GLOBALS['TempFile'],'/') + 1 );
$NomFile = $_DownloadPath.$nombre;
$TempFile = $_DownloadPath.$nombre.'.sql';
}else{
if( $GLOBALS['_TronDownLoad'] ) error_log( "SI WIN\n", 3, '___download__.info' );
$nombre = $GLOBALS['TempFile'];
$NomFile = $_DownloadPath.$nombre;
$TempFile = $_DownloadPath.$nombre.'.sql';
}
if( $GLOBALS['_TronDownLoad'] ){
error_log( "Path 1: {$nombre}\n", 3, '___download__.info' );
error_log( "Path 2: {$NomFile}\n", 3, '___download__.info' );
error_log( "Path 3: {$TempFile}\n", 3, '___download__.info' );
}
$DelFile = $NomFile;
$NomFile .= '.'.strtolower($cd_gs_destino);
$tReg = 0;
$gsTipo = 'L';
if( $cd_gs_destino=='REC' ) $gsTipo = 'R';
if( $GLOBALS['_TronDownLoad'] ) error_log( "Antes de SI Graba exportación 1\n", 3, '___download__.info' );
if( substr_count($def__online,'H')>0 || substr_count($def__online,'2')>0 ){
if( $GLOBALS['_TronDownLoad'] ){
error_log( "Sí. Graba exportación 1\n", 3, '___download__.info' );
error_log( "Grabar en Path: {$NomFile}\n", 3, '___download__.info' );
}
$Cdi = GrabaExportacion($descripcion, $NomFile, $tReg, $ListaTablas.' -> '.$Condicion, $gsTipo, $cd_gs_destino, 0, $_User, 'P');
}
if( $_Debug2Plano ){
eTrace('');
eTrace('Fichero a borrar.: '.$DelFile);
eTrace('Fichero temporal.: '.$TempFile);
eTrace('Fichero A GENERAR: '.$NomFile);
eTrace('');
}
if( function_exists('eAlterSql') ){
eAlterSql($ListaCampos, $ListaTablas, $Condicion, $ListaOrdenacion);
}
if( $_Debug2Plano ) die('FIN');
if( $cd_gs_destino!='REC' ){
if( $_POST['_SqlToTron_']=='S' ) eTron("select {$ListaCampos} from {$ListaTablas} where {$Condicion} order by {$ListaOrdenacion}");
error_log("select {$ListaCampos} from {$ListaTablas} where {$Condicion} order by {$ListaOrdenacion}"."\n", 3, $GLOBALS['_RastroSQL']);
$fp = fopen($TempFile, 'w');
fwrite($fp, "select {$ListaCampos} from {$ListaTablas} where {$Condicion} order by {$ListaOrdenacion}");
fclose($fp);
if( $GLOBALS['_Exit2Plano']==1 ){
eTrace("select {$ListaCampos} from {$ListaTablas} where {$Condicion} order by {$ListaOrdenacion}");
}else{
$tReg = qCount($ListaTablas, $Condicion);
if( $tReg>0 ) $GLOBALS['_InformarCada'] = $tReg/100;
qQuery("select {$ListaCampos} from {$ListaTablas} where {$Condicion} order by {$ListaOrdenacion}");
}
}else{
if( $_POST['_SqlToTron_']=='S' ) eTron("select count(*) from {$ListaTablas} where {$Condicion}");
error_log("select count(*) from {$ListaTablas} where {$Condicion}"."\n", 3, $GLOBALS['_RastroSQL']);
$fp = fopen($TempFile, 'w');
fwrite($fp, "select count(*) from {$ListaTablas} where {$Condicion}");
fclose($fp);
if( $GLOBALS['_Exit2Plano'] == 1 ){
eTrace( $ListaTablas .' - '. $Condicion );
}else{
$tReg = qCount($ListaTablas, $Condicion);
}
}
@unlink($DelFile);
if( $GLOBALS['_Exit2Plano']==1 ){
eTrace('FIN');
if( !isset($_BKG) ) eEnd();
return;
}
list( $TablaPrincipal ) = explode(" ",trim($ListaTablas));
$TablaPrincipal = trim($TablaPrincipal);
if( $_Debug2Plano ){
eTrace('Tabla principal: '.$TablaPrincipal);
echo '<table border=1px cellspacing=0>';
}
for( $n=0; $n<count($Estructura); $n++ ){
if( $_Debug2Plano ) echo '<tr>';
if( $Estructura[$n][0][0]==',' ) $Estructura[$n][0] = trim(substr($Estructura[$n][0],1));
if( substr($Estructura[$n][0],-1)==')' ){
$Estructura[$n][0] = trim(substr($Estructura[$n][0],strpos($Estructura[$n][0],'(')+1,-1));
if( substr_count($Estructura[$n][0],',') ){
list( $i, $d ) = explode(',',$Estructura[$n][0]);
$i=trim($i);
if( $i[0]=='"' || $i[0]=="'" ){
$Estructura[$n][0] = trim($d);
}else{
$Estructura[$n][0] = trim($i);
}
}
}
if( substr_count($Estructura[$n][0],' as ') ){
list( $i, $d ) = explode(' as ',$Estructura[$n][0]);
$Estructura[$n][0] = trim($d);
}
$Estructura[$n][0] = str_replace('.','_',$Estructura[$n][0]);
for( $i=0; $i<$n; $i++ ) if( $Estructura[$n][0]==$Estructura[$i][0] ) $Estructura[$n][0] .= '_'.$i;
if( $_Debug2Plano ) echo '<td>'.$Estructura[$n][0].'<td>'.$Estructura[$n][1].'<td>'.$Estructura[$n][2].'<td>'.$Estructura[$n][3].'<td>'.$Estructura[$n][4].'</tr>';
}
if( $_Debug2Plano ) echo '</table>';
if( $_Debug2Plano ) eTrace('cd_gs_destino: '.$cd_gs_destino);
switch( $cd_gs_destino ){
case 'REC':
$NomFile = str_replace('.rec', '.htm', $NomFile);
$tReg = DestinoCOUNT($NomFile, $tReg);
$gsTipo = 'R';
break;
case 'HTM':
if( $def__online=='V' ){
$NomFile = substr($NomFile,0,-4);
if( substr_count($NomFile,'.')==0 ) $NomFile .= ".tmp";
eExplodeLast(str_replace('\\','/',$NomFile), "/", $iz, $dch);
$NomFile = "../_tmp/pdf/{$dch}";
$tReg = DestinoScreen($NomFile, "LISTADO");
}else{
$tReg = DestinoHTML($NomFile, "LISTADO");
}
break;
case 'TXT':
$tReg = DestinoTXT( $NomFile );
break;
case 'DBF':
$tReg = DestinoDBF( $NomFile );
break;
case 'PDF':
$tReg = DestinoPDF($NomFile);
break;
case 'XLS';
$tReg = DestinoXLS( $NomFile );
break;
case 'MDB';
$tReg = DestinoMDB( $NomFile, $TablaPrincipal );
break;
default:
$tReg = -1;
}
$tReg *= 1;
if( !function_exists("eZipFile") ){
function eZipFile($FileZip, $Files){
if( !function_exists("_eZipFile") ) include("../../edesweb/itm/zip.php");
return _eZipFile($FileZip, $Files);
}
}
if( $cd_gs_destino<>'REC' ){
global $_User, $_Node;
$cdi = date('Y-m-d H:i:s');
$_db_->qQuery("insert into gs_acceso
(cd_gs_toperacion,				 conexion       , objeto, modo,	   edf	   ,      tabla        ,  parametros ,          pagina             , parametro, registros, cd_gs_user, cd_gs_node,    cdi   ) values
(     'DOC'      , '{$_SESSION['_Connection_']}',   'D' , 'E' , '{$NomFile}', '{$cd_gs_destino}', 'extraer,gs','{$Entidad['nm_gs_entidad']}',    ''    , {$tReg} ,  {$_User},  {$_Node} , '{$cdi}' )");
if( $_SESSION["LogFileDownload"]!='' ){
$SerialDOC = $_db_->qId();
$Dir = eGetCWD();
eZipFile($_SESSION["LogFileDownload"].$SerialDOC, $NomFile);
}
}
if( substr_count($def__online,'D')>0 && substr_count(',REC,HTM,TXT,',",{$cd_gs_destino},")>0 ){
$NmFileOri = $NomFile;
if( strtoupper(substr(PHP_OS,0,3))=='WIN' ) $NmFileOri = str_replace('\\','/',$NmFileOri);
if( $_DEBUG=='' ) eInit();
if( $cd_gs_destino=='TXT' ) eHTML('$extraer.gs').'</HEAD><BODY style="background-color:#f0f0f0"><PRE style="background-color:#FFFFFF">';
readFile($NmFileOri);
if( $cd_gs_destino=='TXT' ) echo '</PRE></BODY></HTML>';
echo '<script type="text/javascript">top.eLoading(false,window);</script>';
}
if( substr_count($def__online,'V')>0 && substr_count(',REC,HTM,',",{$cd_gs_destino},")>0 ){
$NmFileOri = $NomFile;
if( strtoupper(substr(PHP_OS,0,3))=='WIN' ) $NmFileOri = str_replace('\\','/',$NmFileOri);
if( $_DEBUG=='' ) eInit();
eExplodeLast(str_replace('\\','/',$NomFile), "/", $iz, $dch);
if( $cd_gs_destino=="HTM" ){
echo '<script type="text/javascript">location.replace("edes.php?Lv:'.$dch.'");</script>';
}else if( $cd_gs_destino=="REC" ){
echo '<script type="text/javascript">location.replace("edes.php?R:/_tmp/ext/'.$dch.'");</script>';
}else{
die("Error:w21");
}
eEnd();
}
if( $GLOBALS['_TronDownLoad'] ) error_log("Antes de SI Graba exportacion 2\n", 3, '___download__.info');
if( substr_count($def__online,'H')>0 || substr_count($def__online,'2')>0 ){
if( $GLOBALS['_TronDownLoad'] ) error_log("SI Graba exportacion 2\n", 3, '___download__.info');
GrabaExportacion($descripcion, $NomFile, $tReg, $Condicion, $gsTipo, $cd_gs_destino, 1, $_User, 'T', $Cdi, $DatoDownload);
$gsFileOri = $NomFile;
if( strtoupper(substr(PHP_OS,0,3))=='WIN' ) $gsFileOri = str_replace('\\','/',$gsFileOri);
$xNomFile = substr($gsFileOri, strrpos($gsFileOri,'/')+1);
$NomExt = substr($xNomFile,-3);
if( $NomExt=='mdb' ){
}else if( $gsTipo!='R' ){
$xNomFile = substr($xNomFile, 0, strrpos($xNomFile,'.')+1).'zip';
}else{
$xNomFile = substr($xNomFile, 0, strrpos($xNomFile,'.')+1).'htm';
}
$FicheroAModificar = "fichero='{$xNomFile}' and cd_gs_user={$_User} and estado='T' and cdi='{$Cdi}'";
}
DondeEstoy('_dir_8');
if( $_Debug2Plano ) eTrace('['.$def__online.']');
if( $_BackgroundShow ) exit;
if( isset($_BKG) ) eBkgEnd();
if( $def__online!='2' ){
if( substr_count(',TXT,DBF,PDF,XLS,HTM,REC,', ",{$cd_gs_destino},")>0 ){
if( substr_count($def__online, 'H')>0 && $cd_gs_destino<>"REC" ){
$_db_->qQuery("update gs_exp_file set download='".date('Y-m-d H:i:s')."' where {$FicheroAModificar}");
$_db_->qEnd();
eMessage('Descargando '.$cd_gs_destino,'HS','','top.eCallSrv(window,"'.$DatoDownload.'");');
}else if( substr_count($def__online,'V')>0 && $cd_gs_destino<>"REC" ){
$NomFile = str_replace('\\','/',$NomFile);
$Dim = explode( '/',$NomFile);
$NomFile = $Dim[count($Dim)-1];
$NomFile = $GLOBALS['_sDownloadPath'].'/'.$NomFile;
$OriFichero = ''; $_SubModo = '';
eMessage('Descargando '.$cd_gs_destino,'HS','','top.eCallSrv(window,"edes.php?D:'.$NomFile.'&_Source='.$OriFichero.'&_SubMode='.$_SubModo.'");');
}else if( substr_count($def__online,'D')>0 ){
$NomFile = str_replace('\\','/',$NomFile);
$Dim = explode( '/',$NomFile);
$NomFile = $Dim[count($Dim)-1];
$NomFile = $GLOBALS['_sDownloadPath'].'/'.$NomFile;
$OriFichero = ''; $_SubModo = '';
eMessage('Descargando '.$cd_gs_destino,'HS','','top.eCallSrv(window,"edes.php?D:'.$NomFile.'&_Source='.$OriFichero.'&_SubMode='.$_SubModo.'");');
}
}
if( $cd_gs_destino=='MDB' ){
if( substr_count($def__online, 'H')>0 ){
list($iz,$d) = explode('&F=', $DatoDownload);
list($eFile,$d) = explode('&H=', $d);
if( !isset($_DownloadPath) || $_DownloadPath=='' ) $_DownloadPath = '/_tmp/ext/';
if( substr($_DownloadPath,-1)!='/' ) $_DownloadPath .= '/';
$sFile = $_DownloadPath.$eFile;
$File = $_sDownloadPath.$eFile;
if( strtoupper(substr(PHP_OS,0,3))=='WIN' ) $File = str_replace('\\','/',$File);
if( substr($File,0,2)=='..' ) $File = substr($File,2);
$_db_->qQuery("update gs_exp_file set download='".date('Y-m-d H:i:s')."' where {$FicheroAModificar}");
$_db_->qEnd();
eMessage('~MDB','HS','','try{_WOPENER.eHideBusy();}catch(e){}window.external.eExportToMDB("'.$File.'","'.date('H·i·s').'");');
}else if( substr_count($def__online, 'V')>0 ){
$NomFile = str_replace('\\','/',$NomFile);
$Dim = explode( '/',$NomFile);
$NomFile = $Dim[count($Dim)-1];
$NomFile = $GLOBALS['_sDownloadPath'].'/'.$NomFile;
$OriFichero = ''; $_SubModo = '';
eMessage('Descargando '.$cd_gs_destino,'HS','','top.eCallSrv(window,"edes.php?D:'.$NomFile.'&_Source='.$OriFichero.'&_SubMode='.$_SubModo.'");');
}
}
}
if( $GLOBALS['_sDownloadPath'][0]=='/' ){
}
@unlink($GLOBALS['_RastroSQL']);
$_db_->qEnd();
if( !isset($_BKG) ){
eMessage('Extracción generada', 'HS');
eEnd();
}else{
eBkgEnd();
}
}
function DondeEstoy($NomFile){
if( $GLOBALS['_TronDownLoad'] ) error_log($NomFile."\n", 3, '___download__.info');
return;
}
function GrabaExportacion($gsDescripcion, $gsFileOri, $gsTReg, $gsSql, $gsTipo, $gsTxtFormato, $gsZip, $gsUsuario, $gsEstado, $gsCdi="", &$DatoDownload=NULL){
global $_Debug2Plano, $_SecondINI, $def__online, $_RegActual, $_IdReg, $_cd_gs_formato, $_db_;
if( $_Debug2Plano ) eTrace('<br><br>GrabaExportacion()<br><br>');
if( $GLOBALS['_TronDownLoad'] ) error_log("Dentro de Graba exportacion\n", 3, '___download__.info');
$DimFormato = array('REC'=>0,'HTM'=>1,'TXT'=>2,'DBF'=>3,'XLS'=>4,'PDF'=>5,'MDB'=>6,  'XML'=>7, 'CSV'=>8 );
$gsFormato = $DimFormato[$gsTxtFormato];
$q = urlencode($gsSql);
$sql = array('','','','');
if( strlen($q)>255 ){
$n = 1;
while( strlen($q)>255 ){
$sql[$n] = substr( $q, 0, 255 );
$q = substr( $q, 255 );
$n++;
}
$sql[$n] = substr( $q, 0, 255 );
}else{
$sql[1] = $q;
}
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ) $gsFileOri = str_replace('\\','/',$gsFileOri);
$NomFile = substr( $gsFileOri, strrpos($gsFileOri,'/') + 1 );
$NomExt = substr($NomFile,-3);
if( $NomExt=='mdb' ){
}else if( $gsTipo!='R' ){
$NomFile = substr( $NomFile, 0, strrpos($NomFile,'.')+1 ) . 'zip';
}else{
$NomFile = substr( $NomFile, 0, strrpos($NomFile,'.')+1 ) . 'htm';
}
$Dir = substr( $gsFileOri, 0, strrpos($gsFileOri,'/') + 1 );
if( strtoupper($gsFormato) == 'REC' ) $gsFormato = 'HTM';
$cdi = date('Y-m-d H:i:s');
if( $GLOBALS['_TronDownLoad'] ) error_log( "Estado: {$gsEstado}\n", 3, '___download__.info' );
if( $gsEstado=='P' ){
if( $GLOBALS['_TronDownLoad'] ){
error_log( "Pendiente....\n", 3, '___download__.info' );
error_log( "insert into gs_exp_file
(     descripcion  ,   fichero  ,  t_reg  ,    tipo   ,    formato   ,    cd_gs_formato  ,    estado    , comprimido, cd_gs_user ,  sql_1  ,  sql_2  ,  sql_3  ,   cdi  , descargado, sg ) values
('{$gsDescripcion}','{$NomFile}',{$gsTReg},'{$gsTipo}','{$gsFormato}','{$_cd_gs_formato}', '{$gsEstado}',  {$gsZip} ,{$gsUsuario},'$sql[1]','$sql[2]','$sql[3]','{$cdi}',     0     , 0  )".
"\n", 3, '___download__.info' );
}
$_db_->qQuery("insert into gs_exp_file
(     descripcion  ,   fichero  ,  t_reg  ,    tipo   ,    formato   ,    cd_gs_formato  ,    estado    , comprimido, cd_gs_user ,  sql_1  ,  sql_2  ,  sql_3  ,   cdi  , descargado, sg ) values
('{$gsDescripcion}','{$NomFile}',{$gsTReg},'{$gsTipo}','{$gsFormato}','{$_cd_gs_formato}', '{$gsEstado}',  {$gsZip} ,{$gsUsuario},'$sql[1]','$sql[2]','$sql[3]','{$cdi}',     0     , 0  )");
$_RegActual = " where cdi='{$cdi}' and cd_gs_user={$gsUsuario}";
$_IdReg = $_db_->qId();
if( !($_IdReg > 0) ){
if( $GLOBALS['_TronDownLoad'] ) error_log( "No se encontro el reg old-> cd_gs_exp_file={$_IdReg}\n", 3, '___download__.info' );
$_db_->qQuery( "select cd_gs_exp_file from gs_exp_file {$_RegActual}" );
list( $_IdReg ) = $_db_->qRow();
if( $GLOBALS['_TronDownLoad'] ) error_log( "No se encontro el reg new-> cd_gs_exp_file={$_IdReg}\n", 3, '___download__.info' );
}
if( $GLOBALS['_TronDownLoad'] ){
error_log( "{$_RegActual} -> cd_gs_exp_file={$_IdReg}\n", 3, '___download__.info' );
}
}else{
$tSegundos = 0;
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ){
$dat = getrusage();
$tSegundos = $dat["ru_utime.tv_sec"]+1;
}else{
$sg = gettimeofday();
$tSegundos = (int)$sg["sec"] - $_SecondINI;
}
$UnaDescarga = ($def__online!='2') ? ', descargado=1' : '';
if( $GLOBALS['_TronDownLoad'] ) error_log("Modifica gs_exp_file\n", 3, '___download__.info');
$_db_->qQuery( "update gs_exp_file set estado='{$gsEstado}', t_reg={$gsTReg}, sg={$tSegundos}{$UnaDescarga} where fichero='{$NomFile}' and tipo='{$gsTipo}' and cd_gs_user={$gsUsuario} and cdi='{$gsCdi}'" );
$DatoDownload = $GLOBALS[$_DownloadUrl].'edes.php?E:$descarga.gs'.
'&F=' .$NomFile.
'&H="+escape("'.$gsCdi.'")+"'.
'&U="+escape("'.$gsUsuario.'")+"'.
'&DOWNLOAD=1';
}
if( $gsZip == 1 && $gsTipo!='R' && $NomExt!='mdb' ){
if( $GLOBALS['_TronDownLoad'] ) error_log( "Hacer ZIP\n", 3, '___download__.info' );
eZipFile("{$Dir}{$NomFile}", $gsFileOri);
if( $GLOBALS['_TronDownLoad'] ) error_log( "Borra fichero original {$gsFileOri}\n", 3, '___download__.info' );
@unlink( $gsFileOri );
}
if( $gsTipo=='R' ){
$gsFileOri = substr( $gsFileOri, 0, strrpos($gsFileOri,'.')+1 ) . 'sql';
@unlink( $gsFileOri );
}
return $cdi;
}
function DestinoCOUNT($NomFile, $tReg){
global $Formato, $Etiquetas, $ListaAlineacion, $Pijama, $_db_;
global $EtiCount, $ValCount, $_DirRoot, $cd_gs_entidad;
$File = fopen($NomFile, 'w');
fputs($File, '<!DOCTYPE HTML><HTML><HEAD>');
fputs($File, '<META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">');
fputs($File, '<TITLE>'.$_SESSION["ApplicationName"].'</TITLE><STYLE>');
$FileCSS = $_DirRoot.$_SESSION['_PathCSS'].'/extraer.css';
$fd = fopen($FileCSS, 'r');
$txt = fread($fd, filesize($FileCSS));
fclose($fd);
while( substr_count( $txt, '/'.'* ' ) > 0 && substr_count( $txt, ' *'.'/' ) > 0 ){
$pI = strpos( $txt, '/'.'* ' );
$pF = strpos( $txt, ' *'.'/' );
$txt = trim(substr( $txt, 0, $pI )) . substr( $txt, $pF+3 );
}
$Dim = explode("\n",$txt);
$txt = '';
for( $i=0; $i<count($Dim); $i++ ) $txt .= trim($Dim[$i]);
fputs( $File, $txt );
fputs( $File, '</STYLE></HEAD><BODY>' );
fputs( $File, '<center><H2>'.str_replace("\n",'<br>',urldecode($Formato['titulo_list'])).'</H2></center>' );
fputs( $File, '<center><table cellspacing=1px cellpadding=4>' );
$txt = '<tr id=T><th colspan=2>RECUENTO</tr>';
fputs( $File, $txt );
$txtT = '<tr id=T><th>DATO<th>VALOR</tr>';
$nCondi = 0;
$txtC = '';
while( list($clave,$val) = each( $ValCount ) ){
if( substr($clave,0,3)=='cd_' ){
$_db_->qQuery( "select * from {$_SESSION['ShareDictionary']}gs_campo where cd_gs_entidad='{$cd_gs_entidad}' and campo='nm_".substr($clave,3)."'" );
$r = $_db_->qArray();
if( $r['campo']!='' ){
$EtiCount[$clave] = $r['etiqueta'];
qQuery( "select {$r['campo']} from {$r['tabla']} where {$clave}='{$val}'" );
$r = qRow();
$val = $r[0];
}
}
if( (strlen($val)==10 || strlen($val)==19) && isZero($val) ) $val = '';
if( $val!='' ){
if( $val=='=' ) $val = '';
$txtC .= '<tr>';
$txtC .= '<td>'.$EtiCount[$clave].'</td>';
if( substr($clave,0,3)=='tf_' ){
if( $val=='S' ) $val = 'Si';
if( $val=='<>S' ) $val = 'No';
}
$txtC .= '<td>'.$val.'</td>';
$txtC .= '</tr>';
$nCondi++;
}
}
if( $nCondi > 0 ){
fputs( $File, $txtT );
fputs( $File, $txtC );
}else{
$txt = '<tr><td class=TOTAL colspan=2>Sin condiciones</tr>';
fputs( $File, $txt );
}
$txt = '<tr><td class=TOTAL colspan=2>'.eNumberFormat($tReg).' Registro';
if( $tReg != 1 ) $txt .= 's';
$txt .= '</table></center></BODY></HTML>';
fputs( $File, $txt );
fclose( $File );
return $tReg;
}
function DestinoHTML( $NomFile, $gsDescripcion ){
global $Formato, $Etiquetas, $ListaAlineacion, $Pijama, $_DirRoot, $_VirtualVALUE, $_VirtualFIELD, $_db_;
global $_EjecutaIF_EVAL, $_EjecutarIF_FIELD, $_Debug2Plano, $_UnloadWrapWidth, $_InformarCada, $_RegActual, $_IdReg;
if( $_Debug2Plano ) eTrace( 'Ficheo a exportar: '.$NomFile );
$File = fopen( $NomFile, 'w' );
fputs( $File, '<!DOCTYPE HTML><HTML><HEAD>' );
fputs( $File, '<META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">' );
fputs( $File, '<TITLE>'.$_SESSION["ApplicationName"].'</TITLE><STYLE>' );
$FileCSS = $_DirRoot.$_SESSION['_PathCSS'].'/extraer.css';
$fd = fopen( $FileCSS, 'r' );
$txt = fread( $fd, filesize( $FileCSS ) );
fclose( $fd );
while( substr_count( $txt, '/'.'* ' ) > 0 && substr_count( $txt, ' *'.'/' ) > 0 ){
$pI = strpos( $txt, '/'.'* ' );
$pF = strpos( $txt, ' *'.'/' );
$txt = trim(substr( $txt, 0, $pI )) . substr( $txt, $pF+3 );
}
$Dim = explode("\n",$txt);
$txt = '';
for( $i=0; $i<count($Dim); $i++ ) $txt .= trim($Dim[$i]);
fputs( $File, $txt );
fputs( $File, '</STYLE></HEAD><BODY>' );
fputs( $File, '<center><H2>'.urldecode($gsDescripcion).'</H2></center>' );
fputs( $File, '<center><table cellspacing=1px cellpadding=2px>' );
$txt = '';
for( $c=0; $c<count($ListaAlineacion); $c++ ){
if( $ListaAlineacion[$c] == 'c' ){
$txt .= '<col id=c style="white-space:nowrap">';
}else if( $ListaAlineacion[$c] == 'd' ){
$txt .= '<col id=d style="white-space:nowrap">';
}else if( $ListaAlineacion[$c] == 'L' ){
$txt .= '<col id=i width='.$_UnloadWrapWidth.'px>';
}else{
$txt .= '<col id=i style="white-space:nowrap">';
}
}
fputs( $File, $txt );
$TColumnas = 0;
$txt = '<tr id=T>';
while( list($clave,$val) = each($Etiquetas) ){
if( $ListaAlineacion[$TColumnas]=='L' ){
$txt .= '<th><div style="width:'.$_UnloadWrapWidth.'px">'.str_replace('·','<br>',trim($val)).'</div>';
}else{
$txt .= '<th>'.str_replace('·','<br>',trim($val));
}
$TColumnas++;
}
fputs( $File, $txt );
$LineaPar = true;
$tReg = 0;
$Informar = 0;
while( $_vF = qRow() ){
if( $Pijama ) $LineaPar = !$LineaPar;
if( $LineaPar ){
$txt = '<tr id=LP>';
for( $i=0; $i<$TColumnas; $i++ ){
$_vF[$i] = trim($_vF[$i]);
if( $_VirtualFIELD[$i] ){
$_vF[$i] = $_VirtualVALUE[ $i.':'.$_vF[$i] ];
}else{
if( $_EjecutarIF_FIELD[$i] ){
$tmp = str_replace('#',$_vF[$i], $_EjecutaIF_EVAL[$i]);
if( $_Debug2Plano ) eTrace('['.$tmp.']');
$_vF[$i] = eval($tmp);
}
if( (strlen($_vF[$i])==10 || strlen($_vF[$i])==19) && isZero($_vF[$i]) ) $_vF[$i] = '';
}
$txt .= '<td>'.$_vF[$i];
}
}else{
$txt = '<tr id=LI>';
for( $i=0; $i<$TColumnas; $i++ ){
$_vF[$i] = trim($_vF[$i]);
if( $_VirtualFIELD[$i] ){
$_vF[$i] = $_VirtualVALUE[ $i.':'.$_vF[$i] ];
}else{
if( $_EjecutarIF_FIELD[$i] ){
$tmp = str_replace('#',$_vF[$i], $_EjecutaIF_EVAL[$i]);
if( $_Debug2Plano ) eTrace('['.$tmp.']');
$_vF[$i] = eval($tmp);
}
if( (strlen($_vF[$i])==10 || strlen($_vF[$i])==19) && isZero($_vF[$i]) ) $_vF[$i] = '';
}
$txt .= '<td>'.$_vF[$i];
}
}
fputs($File, $txt);
$tReg++;
if( $Informar<=$tReg && (substr_count($def__online,'H')>0 || substr_count($def__online,'2')>0) ){
$_db_->qQuery("update gs_exp_file set t_reg={$Informar} where cd_gs_exp_file={$_IdReg}", $p1);
if( $GLOBALS['_SqlTransaction'] ){
$_db_->qTranOff();
$_db_->qTranOn();
}
$Informar += $_InformarCada;
}
}
fputs($File, '</table></center>');
$txt = '
<SCRIPT type="text/javascript">
function MueveTH(){
DGI("T").style.top = ((document.body.scrollTop < document.getElementsByTagName("TABLE")[0].offsetTop) ? "0px" : document.body.scrollTop-document.getElementsByTagName("TABLE")[0].offsetTop-1)+"px";
}
DGI("T").style.position = "relative";
document.body.onscroll = MueveTH;
document.body.onresize = function anonymous(){ DGI("T").style.top = "0px"; DGI("T").style.top = "1px"; MueveTH(); }
</SCRIPT>';
fputs( $File, $txt );
fputs( $File, '</BODY></HTML>' );
fclose( $File );
return $tReg;
}
function DestinoTXT($NomFile){
global $Etiquetas, $ListaAnchos, $_VirtualVALUE, $_VirtualFIELD, $_EjecutaIF_EVAL, $_EjecutarIF_FIELD, $_InformarCada;
global $def__online, $_RegActual, $_IdReg, $_db_;
$Informar = 0;
$tReg = 0;
$File = fopen($NomFile, 'w');
while( $_vF=qRow() ){
$txt = '';
$nc = 0;
foreach($_vF as $value){
$value = trim($value);
if( $_VirtualFIELD[$nc] ) $value = $_VirtualVALUE[ $nc.':'.$value ];
if( $_EjecutarIF_FIELD[$nc] ){
$tmp = str_replace('#',$value, $_EjecutaIF_EVAL[$nc]);
$value = eval($tmp);
}
if( (strlen($value)==10 || strlen($value)==19) && isZero($value) ) $value = '';
$txt .= substr(str_pad($value, $ListaAnchos[$nc], ' '), 0, $ListaAnchos[$nc]);
$nc++;
}
fputs( $File, $txt.chr(13).chr(10) );
$tReg++;
if( $Informar<=$tReg && (substr_count($def__online,'H')>0 || substr_count($def__online,'2')>0) ){
$_db_->qQuery("update gs_exp_file set t_reg={$Informar} where cd_gs_exp_file={$_IdReg}", $p1);
if( $GLOBALS['_SqlTransaction'] ){
$_db_->qTranOff();
$_db_->qTranOn();
}
$Informar += $_InformarCada;
}
}
fclose($File);
return $tReg;
}
function DestinoMDB( $NomFile, $NomTabla ){
global $Etiquetas, $ListaAnchos, $_VirtualVALUE, $_VirtualFIELD, $_EjecutaIF_EVAL, $_EjecutarIF_FIELD, $DefCampo, $Estructura;
global $def__online, $_InformarCada, $_RegActual, $_IdReg, $_db_;
$Enter	 = "\n";
$NewCampo = '|';
$NewRow	 = '~';
$fp = fopen( $NomFile, 'w' );
fwrite( $fp, utf8_encode('colDelimiter='.$NewCampo.$Enter) );
fwrite( $fp, utf8_encode('rowDelimiter='.$NewRow.$Enter) );
fwrite( $fp, utf8_encode('replace=|::{&#124;}'.$Enter) );
fwrite( $fp, utf8_encode('replace=~::{&#126;}'.$Enter) );
fwrite( $fp, utf8_encode('cmd=open'.$Enter) );
fwrite( $fp, utf8_encode('tableName='.$NomTabla.$Enter) );
$Create = "createTable=CREATE TABLE {$NomTabla} (";
$Ok = false;
for( $n=0; $n<count($Estructura); $n++ ){
if( $Ok ) $Create .= ', ';
$Ok = true;
$NomCampo = $Estructura[$n][0];
list( $NomCampo ) = explode(':',$NomCampo);
if( substr_count($NomCampo,'(')>0 ){
$Create .= 'campo_'.$n.' char('.$Estructura[$n][1].')';
}else{
$Create .= $NomCampo.' ';
switch(  $Estructura[$n][3] ){
case 'I':
$Create .= 'char('.$Estructura[$n][1].')';
break;
case 'C':
$Create .= 'char('.$Estructura[$n][1].')';
break;
case 'D':
if( $Estructura[$n][2] > 0 ){
$Create .= 'decimal('.$Estructura[$n][1].','.$Estructura[$n][2].')';
}else{
$Create .= 'decimal('.$Estructura[$n][1].')';
}
break;
case 'L':
$Create .= 'memo';
break;
default:
$Create .= 'char('.$Estructura[$n][1].')';
}
}
}
$Create .= ');';
fwrite( $fp, utf8_encode($Create).$Enter );
fwrite( $fp, utf8_encode('[EOP]').$Enter );
$Pipa = false;
$tReg = 0;
$Informar = 0;
while( $_vF=qRow() ){
$txt = '';
if( $Pipa ) $txt .= $NewRow;
$Pipa = false;
$nc = 0;
foreach($_vF as $value){
if( $Pipa ){
$txt .= $NewCampo;
}else{
$Pipa = true;
}
$value = trim($value);
if( $_VirtualFIELD[$nc] ) $value = $_VirtualVALUE[ $nc.':'.$value ];
if( $_EjecutarIF_FIELD[$nc] ){
$tmp = str_replace('#',$value, $_EjecutaIF_EVAL[$nc]);
$value = eval($tmp);
}
if( (strlen($value)==10 || strlen($value)==19) && isZero($value) ) $value = '';
$value = str_replace('|', '{&#124;}', $value);
$value = str_replace('~', '{&#126;}', $value);
$txt .= trim((string)$value);
$nc++;
}
fputs($fp, utf8_encode($txt));
$tReg++;
if( $Informar<=$tReg && (substr_count($def__online,'H')>0 || substr_count($def__online,'2')>0) ){
$_db_->qQuery("update gs_exp_file set t_reg={$Informar} where cd_gs_exp_file={$_IdReg}", $p1);
if( $GLOBALS['_SqlTransaction'] ){
$_db_->qTranOff();
$_db_->qTranOn();
}
$Informar += $_InformarCada;
}
}
fclose($fp);
return $tReg;
}
function DestinoDBF( $NomFile ){
global $Etiquetas, $ListaAnchos, $_VirtualVALUE, $_VirtualFIELD, $_EjecutaIF_EVAL, $_EjecutarIF_FIELD, $_InformarCada;
global $def__online, $_RegActual, $_IdReg, $_db_;
$DimCampo = array();
for( $nc=0; $nc<count( $Etiquetas ); $nc++ ){
$clave = strtoupper(trim( str_replace('·',' ',trim($Etiquetas[$nc])) ));
while( substr_count( $clave, '  ' ) ) $clave = str_replace( '  ', ' ', $clave );
$sClave = $clave;
$clave = '';
for( $i=0; $i<strlen( $sClave ); $i++ ){
$n = ord( substr( $sClave, $i, 1 ) );
if( ( $n>=48 && $n<=57 ) || ( $n>=65 && $n<=90 ) || ( $n>=97 && $n<=122 ) || ( $n==95 ) ){
$clave .= substr( $sClave, $i, 1 );
}else{
$clave .= '_';
}
}
if( substr_count( '0123456789', $clave[0] ) > 0 ) $clave = '_'.$clave;
$clave = str_replace( '__', '_', $clave );
if( strlen( $clave ) > 10 ) $clave = substr( $clave, 0, 10 );
$tc = strlen($clave);
while( in_array( $clave, $DimCampo ) ){
$sClave = $clave = substr($clave,0,$tc );
for( $i=1; $i<pow(10,10-$tc); $i++ ){
$clave = $sClave.$i;
if( !in_array( $clave, $DimCampo ) ) break;
}
$tc--;
}
$DimCampo[] = $clave;
$Dim[] = Array( $clave, 'C', $ListaAnchos[$nc], 0 );
}
$File = dbf_Create( $NomFile, $Dim );
$nl = 0;
$Informar = 0;
while( $_vF = qRow() ){
$txt = '';
$nc = 0;
foreach( $_vF as $value ){
$value = trim($value);
if( $_VirtualFIELD[$nc] ) $value = $_VirtualVALUE[ $nc.':'.$value ];
if( $_EjecutarIF_FIELD[$nc] ){
$tmp = str_replace('#',$value, $_EjecutaIF_EVAL[$nc]);
$value = eval($tmp);
}
if( (strlen($value)==10 || strlen($value)==19) && isZero($value) ) $value = '';
$txt .= substr( str_pad( $value, $ListaAnchos[$nc], ' ' ), 0, $ListaAnchos[$nc] );
$nc++;
}
$nl++;
dbf_Write( $File, $txt );
if( $Informar <= $nl && (substr_count($def__online,'H')>0 || substr_count($def__online,'2')>0) ){
$_db_->qQuery("update gs_exp_file set t_reg={$Informar} where cd_gs_exp_file={$_IdReg}", $p1);
if( $GLOBALS['_SqlTransaction'] ){
$_db_->qTranOff();
$_db_->qTranOn();
}
$Informar += $_InformarCada;
}
}
dbf_Close( $File );
return $nl;
}
function DestinoPDF( $NomFile ){
$tReg = 0;
return $tReg;
}
function DestinoXLS( $NomFile ){
global $Etiquetas, $ListaAnchos, $_VirtualFIELD, $_VirtualVALUE, $ListaAlineacion, $_EjecutaIF_EVAL, $_EjecutarIF_FIELD;
global $def__online, $_InformarCada, $_RegActual, $_IdReg, $_db_;
$File = xls_Create( $NomFile );
$nl = 0;
$nc = 0;
while( list( $clave, $val ) = each( $Etiquetas ) ){
xls_Texto( $File, $nl, $nc, trim(str_replace('·',' ',$val)) );
$nc++;
}
$nl++;
$Informar = 0;
while( $_vF = qRow() ){
$nc = 0;
foreach( $_vF as $value ) {
$value = trim($value);
if( $_VirtualFIELD[$nc] ) $value = $_VirtualVALUE[ $nc.':'.$value ];
if( $_EjecutarIF_FIELD[$nc] ){
$tmp = str_replace('#',$value, $_EjecutaIF_EVAL[$nc]);
$value = eval($tmp);
}
if( (strlen($value)==10 || strlen($value)==19) && isZero($value) ) $value = '';
if( $ListaAlineacion[$nc]!='d' ){
xls_Texto($File, $nl, $nc, $value);
}else{
xls_Numero($File, $nl, $nc, $value);
}
$nc++;
}
$nl++;
if( $Informar<=$nl && (substr_count($def__online,'H')>0 || substr_count($def__online,'2')>0) ){
$_db_->qQuery("update gs_exp_file set t_reg={$Informar} where cd_gs_exp_file={$_IdReg}", $p1);
if( $GLOBALS['_SqlTransaction'] ){
$_db_->qTranOff();
$_db_->qTranOn();
}
$Informar += $_InformarCada;
}
}
xls_Close( $File );
return ($nl-1);
}
function xls_Create( $NomFile ){
$File = fopen( $NomFile, 'w' );
fputs( $File, pack( 'ssssss', 0x809, 0x8, 0x0, 0x10, 0x0, 0x0 ) );
return $File;
}
function xls_Close( $File ){
fputs( $File, pack( "ss", 0x0A, 0x00 ) );
fclose( $File );
}
function xls_Ancho( $File, $Col, $Ancho ){
fputs( $File, pack( "sccs", 0x24, $Col, $Col, $Ancho ) );
}
function xls_Numero( $File, $Row, $Col, $Valor ){
fputs( $File, pack( "sssss", 0x203, 14, $Row, $Col, 0x0 ) . pack( "d", $Valor) );
}
function xls_Texto( $File, $Row, $Col, $Valor ){
$L = strlen($Valor);
fputs( $File, pack( "ssssss", 0x204, (8+$L), $Row, $Col, 0x0, $L ) . $Valor );
}
function Dec4Bin( $num, $long ){
$dest = '';
for( $n=$long-1; $n >= 0; $n-- ){
if( $num >= pow( 256, $n ) ){
$aux = floor($num / pow(256,$n));
$dest = chr($aux).$dest;
$num -= ($aux * pow(256, $n));
}else{
$dest = chr(0).$dest;
}
}
return $dest;
}
function str2dec( $cadena ){
$aux = strlen( $cadena );
$dest = 0;
for( $i=0; $i < $aux; $i++ ){
$dest += Ord( substr($cadena, $aux-1-$i, 1) ) * pow(256, $aux-1-$i);
}
return $dest;
}
function dbf_Create( $NomFile, $DimCampo ){
$anchoReg = 0;
$anchoCab = 33;
$version = 3;
$fecha = date('ymd');
$fecha = chr(substr ($fecha, 0, 2)).chr(substr ($fecha, 2, 2)).chr (substr($fecha, 4, 2));
$File = fopen( $NomFile, "w+" );
fwrite( $File, chr($version) );
fwrite( $File, $fecha );
fwrite( $File, str_repeat( chr(0), 4 ) );
$anchoCab += (32 * count($DimCampo) );
$anchoCab = Dec4Bin( $anchoCab, 2 );
$longitud = strlen( $anchoCab );
$anchoCab .= str_repeat( chr(0), 2-$longitud );
fwrite( $File, $anchoCab );
$anchoReg = 1;
for( $i=0; $i<count($DimCampo); $i++ ){
$anchoReg += $DimCampo[$i][2];
}
$anchoReg = Dec4Bin( $anchoReg, 2 );
$longitud = strlen( $anchoReg );
$anchoReg .= str_repeat( chr(0), 2-$longitud );
fwrite( $File, $anchoReg );
fwrite( $File, str_repeat( chr(0), 20 ) );
for( $i=0; $i<count($DimCampo); $i++ ){
$nombre = str_pad( trim($DimCampo[$i][0]), 10, chr(0) ).chr(0);
fwrite( $File, $nombre );
fwrite( $File, trim($DimCampo[$i][1]) );
fwrite( $File, str_repeat( chr(0), 4 ) );
fwrite( $File, chr( $DimCampo[$i][2]) );
fwrite( $File, chr( $DimCampo[$i][3]) );
fwrite( $File, str_repeat( chr(0), 14 ) );
}
fwrite( $File, chr( HexDec( '0D' ) ) );
return $File;
}
function dbf_Write( $File, $cadena ){
fwrite( $File, ' '.$cadena );
}
function dbf_Close( $File ){
$tamanyo = ftell( $File );
fseek( $File, 8 );
$anchoCab = str2dec( fread( $File, 2 ));
$anchoReg = str2dec( fread($File, 2 ));
$numReg = ($tamanyo - $anchoCab) / $anchoReg;
if( $GLOBALS[$_Debug2Plano] == 1 ){
eTrace( 'Tamaño: '.$tamanyo );
eTrace( 'Ancho Cabecera: '.$anchoCab );
eTrace( 'Ancho Reg: '.$anchoReg );
eTrace( 'Total Reg: '.$numReg );
}
fseek( $File, 4 );
$numReg = Dec4Bin( $numReg, 4 );
$numReg .= str_repeat( chr(0), 4-strlen( $numReg ) );
fwrite( $File, $numReg );
fclose( $File );
}
function DestinoScreen($NomFile, $gsDescripcion){
global $Formato, $Etiquetas, $ListaAlineacion, $Pijama, $_DirRoot, $_VirtualVALUE, $_VirtualFIELD, $_db_;
global $_EjecutaIF_EVAL, $_EjecutarIF_FIELD, $_Debug2Plano, $_UnloadWrapWidth, $_InformarCada, $_RegActual, $_IdReg;
global $ListaAnchos;
$File2 = fopen($NomFile.'.def', 'w');
fputs($File2, ".".date('Y-m-d H:i:s')."\n");
fputs($File2, "[TITLE]={$gsDescripcion}\n");
fputs($File2, "[SubTitle]\n");
fputs($File2, "[AutoMenu]*|1\n");
fputs($File2, "[FIELDS]\n");
$txt = '';
$TColumnas = 0;
while( list($clave,$val) = each($Etiquetas) ){
$anchoPx = "";
$condi = "";
if( $ListaAlineacion[$c]=='c' ){
$type = 'X';
$condi = "=";
}else if( $ListaAlineacion[$c]=='d' ){
$type = '+';
}else if( $ListaAlineacion[$c]=='L' ){
$type = 'X';
$anchoPx = $_UnloadWrapWidth;
}else{
$type = 'X';
}
$long = $ListaAnchos[$TColumnas];
$txt = trim($val)."|field_".$TColumnas."|{$type}|T|{$long}|{$anchoPx}|-|{$condi}||";
fputs($File2, $txt."\n");
$TColumnas++;
}
fputs($File2, "[PHPStart] l\n");
$File = fopen($NomFile.'.dat', 'w');
$tReg = 0;
while( $_vF = qRow() ){
$txt = '';
for( $i=0; $i<$TColumnas; $i++ ){
$_vF[$i] = trim($_vF[$i]);
if( $_VirtualFIELD[$i] ){
$_vF[$i] = $_VirtualVALUE[ $i.':'.$_vF[$i] ];
}else{
if( $_EjecutarIF_FIELD[$i] ){
$tmp = str_replace('#',$_vF[$i], $_EjecutaIF_EVAL[$i]);
if( $_Debug2Plano ) eTrace('['.$tmp.']');
$_vF[$i] = eval($tmp);
}
if( (strlen($_vF[$i])==10 || strlen($_vF[$i])==19) && isZero($_vF[$i]) ) $_vF[$i] = '';
}
if( $i>0 ) $txt .= "|";
$txt .= $_vF[$i];
}
fputs($File, $txt."\n");
$tReg++;
}
fclose($File);
fputs($File2, '$_BrowseInTemporary = "'.$NomFile.'";'."\n");
fputs($File2, '$tmpTotalReg = "'.$tReg.'";'."\n");
fputs($File2, '$TotalReg = "'.$tReg.'";'."\n");
fputs($File2, '$_LToolsType = "S";'."\n");
fclose($File2);
return $tReg;
}
function VariosCampos($Alias, $DimCampo, $_Sql){
$txt = '';
$campo = '';
for($i=0; $i<strlen($DimCampo['campo']); $i++){
$c = substr($DimCampo['campo'],$i,1);
switch( $c ){
case ",":
if( substr_count($DimCampo['campo'],'(')==0 ){
$txt .= 'trim('.$Alias[$DimCampo['tabla']].'.'.trim($campo).')';
}else{
$txt .= $Alias[$DimCampo['tabla']].'.'.trim($campo);
}
if( eSqlType('mysql,mysqli') ){
$txt .= $c;
}else{
$txt .= '||';
}
$campo = '';
break;
case '"':
case "'":
$campo .= $c;
for( $p=$i+1; $p<strlen($DimCampo['campo']); $p++ ){
$c2 = substr($DimCampo['campo'],$p,1);
$campo .= $c2;
if( $c==$c2 ) break;
}
for( $p=$p+1; $p<strlen($DimCampo['campo']); $p++ ){
$c2 = substr($DimCampo['campo'],$p,1);
if( $c2==',' ){
if( eSqlType('mysql,mysqli') ){
$campo .= $c2;
}else{
$campo .= '||';
}
break;
}else{
$campo .= $c2;
}
}
$txt .= trim($campo);
$i = $p;
$campo = '';
break;
default:
$campo .= $c;
}
}
if( $campo!='' ){
if( substr_count($DimCampo['campo'],'(')==0 ){
$txt .= 'trim('.$Alias[$DimCampo['tabla']].'.'.trim($campo).')';
}else{
$txt .= $Alias[$DimCampo['tabla']].'.'.trim($campo);
}
}
if( eSqlType('mysql,mysqli') ) $txt = 'concat('.$txt.')';
return $txt;
}
function CalculaDBRange(){
if( $_POST['def__dbrange']=="" ) return;
$VieneDeFicha = false;
global $_Sql, $_SqlPDOType;
$DimDBRange = array();
$Dim = explode( ';', $_POST['def__dbrange'] );
for( $n=0; $n<count($Dim); $n++ ){
$tmp = explode( ',', ','.$Dim[$n] );
for( $c=0; $c<count($tmp); $c++ ){
$tmp[$c] = trim($tmp[$c]);
}
if( $tmp[1]!='' ){
$DimDBRange[] = array( $tmp[1], $_POST[$tmp[2]], $_POST[$tmp[3]], $tmp[4], $tmp[2], $tmp[3] );
}
}
$MemDBRange = array();
for( $i=0; $i<count($DimDBRange); $i++ ){
$Campo = $DimDBRange[$i][0];
$ValorINI = $VarIni = stripcslashes($DimDBRange[$i][1]);
$ValorFIN = $VarFin = stripcslashes($DimDBRange[$i][2]);
$Inclusive = ( substr_count( ',TRUE,!FALSE,1,,', ','.strtoupper($DimDBRange[$i][3]).',' ) == 1 );
$_ConDBRange[$Campo] = true;
$Si = false;
$sTipo = 'T';
for( $c=0; $c<count($_Form); $c++ ){
if( $_Form[$c][1] == $Campo ){
$sTipo = $_Form[$c][2];
$Si = true;
break;
}
}
if( !$Si && (substr($Campo,0,3)=='fe_' || substr($Campo,0,4)=='_fe_') ) $sTipo = 'F4';
if( !$Si && (substr($Campo,0,3)=='dt_' || substr($Campo,0,4)=='_dt_') ) $sTipo = 'F4';
if( !$Si ){
if( isDate($ValorINI) ) $sTipo = 'F4';
if( isDate($ValorFIN) ) $sTipo = 'F4';
}
if( isset($_POST[$DimDBRange[$i][4].'_hours']) ) $sTipo = 'CDI';
if( $sTipo == 'F4' || $sTipo == 'F2' ){
if( isDate($VarIni) == 2 ){
$VarIni = str_replace( '\\', '', $VarIni );
$ValorINI = $VarIni;
}
if( isDate($VarFin) ){
$VarFin = str_replace( '\\', '', $VarFin );
$ValorFIN = $VarFin;
}
}else if( substr_count('|+|-|+,|-,|',"|{$sTipo}|" ) ){
if( $ValorINI!='' ) $ValorINI *= 1;
if( $ValorFIN!='' ) $ValorFIN *= 1;
}else if( $sTipo == 'CDI' ){
if( strlen($VarIni)==10 ){
$VarIni = str_replace( '\\', '', $VarIni );
if( $_POST[$DimDBRange[$i][4].'_hours']!='' ){
$VarIni = $ValorINI = $VarIni.' '.$_POST[$DimDBRange[$i][4].'_hours'];
}else{
$VarIni = $ValorINI = $VarIni.' 00:00:00';
}
}
if( strlen($VarFin)==10 ){
$VarFin = str_replace( '\\', '', $VarFin );
if( $_POST[$DimDBRange[$i][5].'_hours']!='' ){
$VarFin = $ValorFIN = $VarFin.' '.$_POST[$DimDBRange[$i][5].'_hours'];
}else{
$VarFin = $ValorFIN = $VarFin.' 23:59:59';
}
}
}
if(		 $ValorINI=='' && $ValorFIN=='' ){
}else if( $ValorINI=='' && $ValorFIN!='' ){
${$Campo} = '<'.(($Inclusive)?'=':'').$VarFin;
}else if( $ValorINI!='' && $ValorFIN=='' ){
${$Campo} = '>'.(($Inclusive)?'=':'').$VarIni;
}else if( $ValorINI!='' && $ValorFIN!='' ){
if( $ValorINI != $ValorFIN ){
if( $Inclusive ){
if( $ValorINI < $ValorFIN ){
${$Campo} = '>='.$VarIni."' and A.".$Campo." <='".$VarFin;
}else{
${$Campo} = '>='.$VarFin."' and A.".$Campo." <='".$VarIni;
}
}else{
if( $ValorINI < $ValorFIN ){
${$Campo} = '>'.$VarIni."' and A.".$Campo." <'".$VarFin;
}else{
${$Campo} = '>'.$VarFin."' and A.".$Campo." <'".$VarIni;
}
}
}else{
${$Campo} = $VarFin;
if( count($_LISTCOMPARE) > 0 ) ${$Campo} = ' '.${$Campo};
}
}
$_POST[$Campo] = ${$Campo};
$MemDBRange[$Campo] = $Campo.''.${$Campo};
}
}
?>
