<?PHP
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
if( $_GET['Desktop']=='' ) exit;
session_start();
$_TreeFromOp = $_GET['Desktop'];
eLngLoad( '../../edesweb/lng/desktop', '', 1 );
$php_errormsg = '';
include( $Dir_.'message.inc' );
if( $php_errormsg != '' ){
if( $_gsTron ) eTron('message.ini: '.$php_errormsg);
die( eTrace('message.ini: '.$php_errormsg) );
}
include( $Dir_.$_Sql.'.inc' );
if( $php_errormsg != '' ){
if( $_gsTron ) eTron($_Sql.'.ini: '.$php_errormsg);
die( eTrace($_Sql.'.ini: '.$php_errormsg) );
}
include( '../_datos/config/desktop.ini' );
if( $php_errormsg != '' ){
if( $_gsTron ) eTron('desktop.ini: '.$php_errormsg);
die( eTrace('desktop.ini: '.$php_errormsg) );
}
if( file_exists("../_datos/usr/{$xUsuario}") ){
}
if( file_exists( '../_tmp/err/stop.access' ) ){
}
qQuery( "select * from gs_user where cd_gs_user={$_SESSION['_User']}" );
$row = qArray();
$_aUser = $row;
$_Node = $row['cd_gs_node'];
$_User = $row['cd_gs_user'];
if( !isset($row['user_surname']) ) $row['user_surname']='';
$_usuNombre = strtoupper(trim($row['user_name']).' '.trim($row['user_surname']));
$_userLP = trim($row['email']);
$_LoginUser = $_userLP;
$_userName = str_replace(' ','',strtoupper(trim($row['user_name'])));
$_DesktopType = ( ($row['desktop_type']!=-1) ? $row['desktop_type'] : $_DesktopType );
$row['cd_gs_tree'] = 0;
$_Util = array();
$_Util['extract'] = (($row['export_level']>0)? 'S' : '');
$_Util['warnings'] = '';
$_Util['news'] = 'S';
$_Util['dt_access_last'] = $row['dt_access_last'];
$_Util['system_user'] = $row['system_user'];
$_Util['task_status'] = $row['task_status'];
$_Util['view_desktop'] = $row['view_desktop'];
$_Util['view_desktop_with'] = ((qCount('gs_user',"view_desktop='S'") > 0)?'S':'');
$_Util['email'] = trim($row['email']);
$_Util['username'] = trim($row['user_name']).' '.trim($row['user_surname']);
if( trim($row['cd_gs_language'])=='' ){
$_LANGUAGE_ = $_Language;
}else{
$_LANGUAGE_ = trim($row['cd_gs_language']);
}
$_AllLanguages = qCount("{$_SESSION['ShareDictionary']}gs_language", "tf_translation='S'");
eLngLoad( '../../edesweb/lng/desktop', $_LANGUAGE_, 1 );
if( !isset($row['pc_with_id']) ) $row['pc_with_id']='';
if( !isset($row['ip_from']) ) $row['ip_from']='';
if( !isset($row['ip_to']) ) $row['ip_to']='';
if( !isset($row['ip2']) ) $row['ip2']='';
if( !isset($row['ip']) ) $row['ip']='';
if( !isset($row['log_user']) ) $row['log_user']='';
if( !isset($row['log_history']) ) $row['log_history']='';
$_novedades_ = trim($row['ys_news']);
if( $_SETUP["Setup"]["ReportsNews"] ){
if( $_novedades_=='' ) $_novedades_ = '2005-05-18 00:00:00';
}else{
$_novedades_ = '';
}
$_HaceUnMes = date('Y-m-d H:i:s', mktime( date('H'),date('i'),date('s'), date('m')-1, date('d'), date('Y')));
$_TypeTree = ((!isset($row['cd_type_tree'])) ? '' : $row['cd_type_tree']);
if( $_TypeTree!='' ) $row['cd_gs_tree'] = -1;
$_DesktopTreeType = eFileGetVar("Desktop.DesktopTreeType");
if( $_DesktopTreeType=='O' ){
if( $_TypeTree=='P' ){
$_UserTree = $row['cd_gs_user'];
}else if( $_TypeTree=='R' ){
$_UserTree = $row['cd_gs_rol'];
}else if( $_TypeTree=='U' ){
$DimUser = array();
$DimUser[] = $row['cd_gs_user'];
$LikeUser = $row['like_user'];
do {
if( !in_array( $LikeUser, $DimUser ) ){
qQuery( "select cd_type_tree,cd_gs_rol,like_user, cd_gs_user from gs_user where cd_gs_user='{$LikeUser}'", $p1 );
$oUsu = qArray( $p1 );
$DimUser[] = $LikeUser;
$LikeUser = $oUsu['like_user'];
}else{
eMessage( $__Lng[50], 'HELS', 10 );
}
} while( $oUsu['cd_type_tree']=='U' );
$_TypeTree = $oUsu['cd_type_tree'];
if( $_TypeTree=='P' ){
$_UserTree = $oUsu['cd_gs_user'];
}else if( $_TypeTree=='R' ){
$_UserTree = $oUsu['cd_gs_rol'];
}
}
if( $_TypeTree=='P' ){
}else if( $_TypeTree=='R' ){
qQuery( "select * from gs_rol where cd_gs_rol='{$_UserTree}' and permission='S'" );
$row = qArray();
if( $row['cd_gs_rol']=='' ) eMessage( $__Lng[51], 'HELS', 10 );
$_Util['extract'] = ( ( $row['export_level'] > 0 ) ? 'S' : '' );
}else{
eMessage( $__Lng[52], 'HELS', 10 );
}
if( trim($_UserTree)=='' ) eMessage( ' ['.$_UserTree.']['.$_TypeTree.']', 'HELS', 10 );
$_Tree = 0;
$_TreeList = '';
qQuery( "select cd_gs_tree from gs_user_tree where cd_gs_user=".$row['cd_gs_user'] );
while( $r=qRow() ){
if( $_TreeList!='' ) $_TreeList .= ',';
$_TreeList .= $r[0];
}
}else{
$_TypeTree = '';
qSelect( "gs_user U, {$_SESSION['ShareDictionary']}gs_tree A",
'U.user_name, U.user_surname, U.cd_gs_user, U.permission u_permission, U.cd_gs_node, U.new_pass,
U.pc_with_id, U.pc_total,U.desktop_type, U.ip, U.ip2, U.ip_from, U.ip_to, U.export_level, U.ys_news,
U.dt_del, U.webmaster, U.log_user, U.log_history, U.dt_access_last, U.zoom_tab, U.zoom_list, U.email,
A.cd_gs_tree, A.permission a_permission, A.filename, A.warnings, A.print, A.excel, A.pdf, A.mdb, A.xml, A.txt',
"U.login='{$xUsuario}' and (U.pass='{$xClave}' or U.pass='{$uClave}') and A.cd_gs_tree=U.cd_gs_tree" );
$row = qArray();
qFree();
if( $row['a_permission'] != 'S' ) eMessage( $__Lng[53], 'HELS', 10 );
if( empty($row['cd_gs_tree'])	  ) eMessage( $__Lng[54], 'HELS', 10 );
$_Tree = $row['cd_gs_tree'];
$_TreeNom = trim($row['filename']);
}
$Hoy = date('Y-m-d');
$_gsMaster = $_SESSION['_D_'];
$_D_ = $_gsMaster;
$_L_ = '';
if( $_gsMaster!='' ){
$_PSDV = $_gsMaster;
$_gsMaster = LeerLP( ((!isset($_userLPDesa)) ? $_userLP : $_userLPDesa ), $_gsMaster, $_gsNomUser, $_gsACCESO, trim($row['email']) );
if( $_gsMaster != '' ){
$sExt = str_replace(' ','',strtoupper(trim($row['user_name'])));
if( file_exists( '../tree/__personal.'.$sExt ) ){
@rename( '../tree/__personal.'.$sExt, '../tree/__personal.'.str_replace(' ','',strtolower($_gsNomUser)) );
}
unset($sExt);
if( $_gsACCESO['LOGEAR'] ){
$_L_ = $_gsACCESO['LOGIN'];
gsLogear( 'FW', 'S', '' );
}
}
if( isset($_GsEdit) && !$_GsEdit ) $_gsACCESO['Edit'] = 0;
if( isset($_eDesDevelopment) && !$_eDesDevelopment ){
unset( $_gsACCESO);
$_gsMaster = '';
}
}else{
$_PSDV = '';
$_gsMaster = '';
}
if( isset($xClaveDesa) ) unset($xClaveDesa);
if( isset($_userLPDesa) ) unset($_userLPDesa);
if( $_Development && $_gsMaster=='' && file_exists('../_d_/cfg/permission.ini') ){
if( !in_array( $row['cd_gs_user'], explode(',',str_replace(' ','',file_get_contents('../_d_/cfg/permission.ini'))) ) ) eMessage( $__Lng[53], 'HELS', 10 );
}
$_Util['excel'] = $_SESSION['_XLS_'];
$_Util['xls'] = $_SESSION['_XLS_'];
$_Util['pdf'] = $_SESSION['_PDF_'];
$_Util['mdb'] = $_SESSION['_MDB_'];
$_Util['xml'] = $_SESSION['_XML_'];
$_Util['txt'] = $_SESSION['_TXT_'];
$_Util['print'] = $_SESSION['_PRINT_'];
if( filesize('../_datos/config/session.ini') > 25 ){
include( '../_datos/config/session.ini' );
if( $php_errormsg != '' ){
if( $_gsTron ) eTron('session.ini: '.$php_errormsg);
die( eTrace('session.ini: '.$php_errormsg) );
}
}
function eAddSelect( $oCampo, $oCampoLen, $oCampoPx, $Valor, $OnChange ){
echo "<INPUT NAME='{$oCampo}' VALUE=\"{$Valor}\" style='display:none' ALTO=1>";
if( $OnChange!='' ){
${$OnChange} = str_replace( "'", '"', ${$OnChange} );
$OnChange = " onchange='{$OnChange}'";
}
echo "<INPUT NAME='_INPUT_{$oCampo}' IND=-1 TMPIND=-1{$OnChange}";
echo " onmousewheel='_SelSlider()' onfocusin='_SelMemValue(this)' onfocusout='_SelPutValue(this)' onkeypress='_SelNewChar(this)' onkeydown='_SelDelChar(this)' onclick='_SelShow(this)'";
echo " style='background-image:url(g/sel.gif); background-position-x:100%; background-position-y:100%; background-repeat:no-repeat; cursor:pointer;'";
if( $oCampoPx > 0 ) echo " style='width:{$oCampoPx};'";
echo " TYPE='TEXT' SIZE={$oCampoLen} MAXLENGTH={$oCampoLen} VALUE=''>";
echo "<DIV onclick='_SelClick(this)' onselectstart='return false;' onmouseleave='this.style.display=\"none\"' id=Select class='SELECT EDITABLE'>";
echo "<TABLE INIT=0 id='{$oCampo}_TABLE' width=1 onmouseover='_SelCursor(true)' onmouseout='_SelCursor(false)' cols=2>";
echo '<COL style="display:none"><COL>';
echo '<TR><TD><TD>&nbsp;';
$textContent = '';
while( $row=qArray() ){
echo '<TR><TD>'.trim($row[0]).'<TD>'.trim($row[1]);
if( $Valor == trim($row[0]) ) $textContent = trim($row[1]);
}
echo '</TABLE></DIV>';
if( $textContent!='' ) echo "\n<script type='text/javascript'>DGI('{$oCampo}').value=".'"'.$Valor.'";'."DGI('_INPUT_{$oCampo}').value=".'"'.$textContent.'";</script>';
}
function _HayAddSelect(){
$Fichero = '../_datos/config/desktop_user.ini';
$fd = fopen( $Fichero, 'r' );
$txt = fread( $fd, filesize($Fichero) );
fclose($fd);
return( substr_count( $txt, 'eAddSelect(' ) > 0 || substr_count( $txt, 'eAddSelect (' ) > 0 );
}
$_HayAddSelect = _HayAddSelect();
if( !isset($_Development) ) $_Development = false;
if( !isset($_Test) ) $_Test = false;
if( !isset($_ErrImg) ) $_ErrImg = false;
if( !isset($_DocSecurity) ) $_DocSecurity = false;
if( $_DesktopType==4 ){
include( '../_datos/config/desktop.php' );
}else if( $_DesktopType==2 || $_DesktopType==3 ){
include( $Dir_.'main2.gs' );
}else if( $_DesktopType==0 || $_DesktopType==1 ){
include( $Dir_.'main.gs' );
}else if( $_DesktopType==5 ){
include( $Dir_."desktop{$_DesktopType}.php" );
}else{
include( "../_datos/config/desktop{$_DesktopType}.php" );
}
if( $php_errormsg != '' ){
if( $_gsTron ) eTron('message.ini: '.$php_errormsg);
die( eTrace('message.ini: '.$php_errormsg) );
}
eEnd();
function _LngLoad( $File ){
$tmp = file( $File.'.lng' );
list(,$Lngs) = explode(']',$tmp[0]);
list($Lngs) = explode('|',$Lngs);
$tmp4 = explode( ',', trim(str_replace(' ','',$Lngs)) );
for( $i=0; $i<count($tmp4); $i++ ){
$tmp4[$i] = trim($tmp4[$i]);
if( $tmp4[$i]==$_SESSION['_LANGUAGE_'] ){
$uCol = $i+1;
}
if( $tmp4[$i]==$_SESSION['_LanguageDefault'] ){
$dCol = $i+1;
}
}
$Dim = array();
$mk = 0;
for( $n=1; $n<count($tmp); $n++ ){
$tmp2 = explode('|',$tmp[$n]);
$k = $tmp2[0];
$txt = trim($tmp2[$uCol]);
if( $txt=='' ) $txt = trim($tmp2[$dCol]);
$v = str_replace('"','&quot;',trim($txt));
$k = $k*1;
$mk = max( $mk, $k );
$Dim[$k] = $v;
}
$txt = ''; for( $n=0; $n<$mk+1; $n++ ) $txt .= $Dim[$n].'|';
return $txt;
}
function _GetEmptyPage(){
$Leer = true;
$Dim = file('../_datos/config/empty_page.htm');
$PagVacia = '';
for( $i=0; $i<count($Dim); $i++ ){
$Dim[$i] = trim($Dim[$i]);
if( substr_count(strtoupper($Dim[$i]),'<'.'/SCRIPT>')>0 && substr_count(strtoupper($Dim[$i]),'<SCRIPT')>0 ){
continue;
}else if( strtoupper($Dim[$i])=='<'.'/SCRIPT>' || strtoupper(substr($Dim[$i],0,7))=='<SCRIPT' ){
$Leer = !$Leer;
continue;
}
if( $Leer ) $PagVacia .= $Dim[$i];
}
return $PagVacia;
}
function eAddMenuOption( $Label, $HR='', $Icon='', $Title='', $Activo=true ){
global $_DesktopType;
if( $_DesktopType == 2 || $_DesktopType == 3 ){
if( $Label=='-' ){
echo '<TR><TD class=Linea colspan=3>';
}else{
if( $HR!='' ) $HR = " HR='".str_replace("'",'"',$HR)."'";
if( $Icon!='' ) $Icon = "<img src='{$Icon}'>";
if( $Title!='' ) $Title = " title='{$Title}'";
$Activo = (( !$Activo ) ? ' disabled':'');
echo "<TR{$HR}{$Title}{$Activo}><TD>{$Icon}<TD>{$Label}<TD>";
}
}else if( $_DesktopType < 2 ){
if( $Label=='-' ){
echo "<tr id=o><td id=2 LIN=1 style='font-size:1px;vertical-align:middle;' HR=''><IMG SRC='g/linea.gif' width=100% height=1>";
}else{
if( $HR!='' ) $HR = " HR='".str_replace("'",'"',$HR)."'";
if( $Icon!='' ){
$Icon = "<img src='{$Icon}'>";
}else{
$Icon = "<IMG SRC='g/doc_0.gif'>";
}
if( $Title!='' ){
$Title = str_replace( '&#92;n', chr(10), $Title );
$Title = " title='{$Title}'";
}
$Activo = (( !$Activo ) ? ' disabled':'');
echo "<tr id=o{$Title}><td id=2 {$HR}>{$Icon}{$Label}";
}
}
}
function LeerLP( $Login, $Pass, &$_gsNomUser, &$_gsACCESO, $EMail ){
global $Dir_;
if( file_exists('../_d_/cfg/e'.'d.l'.'p') ){
$fd = @fopen('../_d_/cfg/e'.'d.l'.'p','r');
}else{
$fd = @fopen($Dir_.'t/e'.'d.l'.'p','r');
}
$cTxt = fread($fd,(1900+59)*100);
fclose($fd);
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+2,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+3+$n,1));
$Basura += $LongDeLong+3;
$b = 0;
$txt = '';
for( $n=$Basura; $n<$Basura+($LenCadena*2); $n++ ){
if( $b==0 ) $txt .= substr($cTxt,$n,1);
$b++; if( $b>1 ) $b=0;
}
$tmp = explode(chr(10),gzuncompress($txt));
if( 212940319 != crc32(trim($tmp[0])) ){
if( $_gsTron ) eTron('<P>0');
exit;
}
$tmp[1] = trim($tmp[1]);
@_LoadSqlIni('_',$tmp[1]);
for( $n=0; $n<count($tmp); $n++ ){
$tmp2 = explode(chr(9),$tmp[$n]);
if( $n==3 ) $NomCampo = $tmp2;
if( $n > 3 && substr_count( $tmp[$n], chr(9).$Login.chr(9) ) == 1 ){
if( $tmp2[3]==1 && chr(9).$tmp2[5].chr(9) == chr(9).$Login.chr(9) || ( $tmp2[3]==1 && trim($tmp2[2])=='' && chr(9).$tmp2[5].chr(9) == chr(9).$Login.chr(9) ) ){
$GLOBALS['_eDesUSU'] = $n-3;
$_gsNomUser = trim($EMail);
$ValCampo = $tmp2;
$_gsACCESO = array();
for( $y=0; $y<count($NomCampo); $y++ ){
$_gsACCESO[trim($NomCampo[$y])] = trim($ValCampo[$y]);
}
if( trim($tmp2[2])=='' ){
$txt = gzuncompress($txt);
$txt = str_replace( $tmp2[0].chr(9).$Login.chr(9).$tmp2[2].chr(9), $tmp2[0].chr(9).$Login.chr(9).$Pass.chr(9), $txt );
GrabarLP( $txt );
}
return $tmp2[0];
}
}
}
return '';
}
?>
