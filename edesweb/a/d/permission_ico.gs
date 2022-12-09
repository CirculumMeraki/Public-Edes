<?PHP
if( !isset($_SESSION['_User']) ) exit;
if( $_gsID != getmypid() ) exit;
eInclude($_Sql);
if( isset($OPSAVE) ){
list( $op, $Estado, $Origen ) = explode( ',', $OPSAVE );
$_DEBUG = 1;
if( $Origen=='S' ){
qQuery( "delete from gs_permission_ico where cd_gs_user={$_User} and cd_gs_tpermission={$op}" );
if( $Estado=='0' ) qQuery( "insert into gs_permission_ico values ( {$_User}, {$op}, '' )" );
}else{
qQuery( "delete from gs_permission_ico where cd_gs_user={$_User} and cd_gs_tpermission={$op}" );
if( $Estado=='1' ) qQuery( "insert into gs_permission_ico values ( {$_User}, {$op}, 'S' )" );
}
eTrace( 'User: '.$_User );
eTrace( 'Op: '.$op );
eTrace( 'Estado: '.$Estado );
eTrace( 'Origen: '.$Origen );
?>
<SCRIPT type="text/javascript">
top.eInfo(window,top.eLng(27),0.3);
</SCRIPT>
<?PHP
eEnd();
}
eHTML();
eLink('list','list_print');
?>
<style>
TD, TH, IMG {
cursor:default;
}
</style>
<?PHP
if( $_SESSION['_D_']=='~' ) _FileNoCache('edes.js');
qQuery( "select cd_gs_tree from gs_user where cd_gs_user={$_User}" );
list( $TreePersonal ) = qRow();
?>
<script type="text/javascript">
function uIcon(){
var TD = S.event(window);
if( TD.tagName=='IMG' ) TD = TD.parentNode;
if( TD.tagName!='TD' ) return;
if( TD.cellIndex!=0 ) return;
if( TD.OR=='N' ){
if( TD.E==1 ){
TD.innerHTML = '<img src="g/tf_s.gif">';
TD.E = 'S';
}else{
TD.innerHTML = '<img src="g/tf_1.gif">';
TD.E = 1;
}
}else{
if( TD.E==0 ){
TD.innerHTML = '<img src="g/tf_s.gif">';
TD.E = 'S';
}else{
TD.innerHTML = '<img src="g/tf_0.gif">';
TD.E = '0';
}
}
top.eCallSrv( window, "edes.php?E:$a/d/permission_ico.gs&OPSAVE="+TD.Op+','+TD.E+','+TD.OR );
}
</script>
</HEAD>
<?PHP
$DimNomTree = array();
$TArboles = 0;
qQuery("select cd_gs_tree, nm_gs_tree from {$_SESSION['ShareDictionary']}gs_tree where cd_tree='MASTER' order by cd_gs_tree");
while( $r=qRow() ){
$DimNomTree[$r[0]] = trim($r[1]);
$TArboles++;
}
$DimPermiso = array();
if( eSqlType('mysql,mysqli') ){
qQuery( "select P.cd_gs_tpermission, P.visible
from gs_permission_ico P left join {$_SESSION['ShareDictionary']}gs_tpermission T on P.cd_gs_tpermission=T.cd_gs_tpermission
where P.cd_gs_user={$_User} and T.license_type='I'
order by P.cd_gs_tpermission" );
}else{
qQuery( "select P.cd_gs_tpermission, P.visible
from gs_permission_ico, outer {$_SESSION['ShareDictionary']}gs_tpermission T
where P.cd_gs_tpermission=T.cd_gs_tpermission and P.cd_gs_user={$_User} and T.license_type='I'
order by P.cd_gs_tpermission" );
}
while( $r=qRow() ) $DimPermiso[$r[0]] = 1;
qQuery( "select *
from {$_SESSION['ShareDictionary']}gs_tpermission
where license_type='I'
order by cd_gs_tpermission" );
echo '<center>';
echo '<table id=LstTree onclick=uIcon()>';
echo '<col class=JSOnClickRow id=c><col class=Celda id=c><col class=Celda id=c><col class=Celda>';
foreach( $DimNomTree as $k=>$v ){
if( $TreePersonal==$k ){
echo '<col class=PieLista id=c st_yle="background-color:red;">';
}else{
echo '<col class=Celda id=c>';
}
}
echo '<tr>';
echo '<th rowspan=2>USER';
echo '<th rowspan=2>ICO';
echo '<th rowspan=2 title="Icono Activo">A';
echo '<th rowspan=2>TNOTA';
echo '<th colspan='.$TArboles.'>ARBOLES';
echo '<tr>';
foreach( $DimNomTree as $k=>$v ){
if( $TreePersonal==$k ){
echo '<th title="'.$v."\n".'Arbol del usuario">'.$k;
}else{
echo '<th title="'.$v.'">'.$k;
}
}
while( $r=qArray() ){
echo '<tr>';
echo "<td Op=".$r['cd_gs_tpermission'];
if( substr_count( ','.$r['lst_tree'].',', ",{$TreePersonal}," ) == 0 ){
echo ' OR=N';
if( $DimPermiso[$r['cd_gs_tpermission']]==1 ){
$Estado = '1';
}else{
$Estado = 'S';
}
}else{
echo ' OR=S';
if( $DimPermiso[$r['cd_gs_tpermission']]==1 ){
$Estado = '0';
}else{
$Estado = 'S';
}
}
echo " E={$Estado} style='cursor:pointer;'>";
echo "<img src='g/tf_{$Estado}.gif' style='cursor:pointer;'>";
echo '<td>';
echo '<img src='.str_replace('_0.','_1.',$r['source']).'>';
echo '<td>';
if( $r['active']=='S' ){
echo '<img src="g/tf_1.gif">';
}else{
echo '<img src="g/tf_0.gif">';
}
if( substr_count(','.$r['lst_tree'].',', ','.$_Tree.',' ) == 0 ){
echo '<td style="color:red">'.$r['note'];
}else{
echo '<td>'.$r['note'];
}
foreach( $DimNomTree as $k=>$v ){
if( substr_count(','.$r['lst_tree'].',', ','.$k.',' ) == 0 ){
echo '<td><img src="g/tf_s.gif">';
}else{
echo '<td><img src="g/tf_1.gif">';
}
}
}
echo '</table>';
echo '</center>';
echo '</body>';
?>
