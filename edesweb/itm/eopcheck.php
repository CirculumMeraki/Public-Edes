<?PHP
function eOpCheck_( $NOp ){
$_DesktopTreeType = eFileGetVar("Desktop.DesktopTreeType");
if( $_DesktopTreeType!='O' ) return false;
if( !function_exists('qQuery') ) include_once( $GLOBALS['Dir_'].$GLOBALS['_Sql'].'.inc' );
qQuery( 'select cd_type_tree,cd_gs_rol,like_user from gs_user where cd_gs_user='.$_SESSION['_User'], $p );
list( $_TypeTree, $Rol, $LikeUser ) = qRow($p);
if( $_TypeTree=='P' ){
$_UserTree = $_SESSION['_User'];
}else if( $_TypeTree=='R' ){
$_UserTree = $Rol;
}else if( $_TypeTree=='U' ){
$DimUser = array();
$DimUser[] = $_SESSION['_User'];
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
$OpNo = "'U'";
if( $GLOBALS['_Development'] ) $OpNo .= "";
else if( $GLOBALS['_Test'] ) $OpNo .= ",'D'";
else $OpNo .= ",'D','T'";
$TypeUR = ( ($_TypeTree=='P') ? 'user' : 'rol' );
$OpcionesAEliminar = '';
if( eSqlType('mysql,mysqli') ){
qQuery( "select count(*)
from {$_SESSION['ShareDictionary']}gs_op o left join {$_SESSION['ShareDictionary']}gs_tree_op t on o.cd_gs_op = t.cd_gs_op
where
o.cd_gs_op={$NOp} and
(
( type<>'O' or type is null )
or
(
show_type not in ({$OpNo})
and
(
(
instr(         (select mode     from gs_{$TypeUR}_tree where cd_gs_{$TypeUR}={$_UserTree} and cd_gs_tree=t.cd_gs_tree), o.mode ) > 0
or
o.cd_gs_op  in (select cd_gs_op from gs_{$TypeUR}_op   where cd_gs_{$TypeUR}={$_UserTree} and cd_gs_tree=t.cd_gs_tree and action='I')
)
and
o.cd_gs_op not in (select cd_gs_op from gs_{$TypeUR}_op   where cd_gs_{$TypeUR}={$_UserTree} and cd_gs_op=o.cd_gs_op and action='D')
{$OpcionesAEliminar}
and
t.cd_gs_tree in (select cd_gs_tree from {$_SESSION['ShareDictionary']}gs_tree where cd_gs_tree=t.cd_gs_tree and permission='S')
)
)
)" );
}else{
qQuery( "select count(*)
from {$_SESSION['ShareDictionary']}gs_op o left join {$_SESSION['ShareDictionary']}gs_tree_op t on o.cd_gs_op = t.cd_gs_op
where
o.cd_gs_op={$NOp} and
(
( type<>'O' or type is null )
or
(
show_type not in ({$OpNo})
and
(
(
instr(         (select mode     from gs_{$TypeUR}_tree where cd_gs_{$TypeUR}={$_UserTree} and cd_gs_tree=t.cd_gs_tree), o.mode ) > 0
or
o.cd_gs_op  in (select cd_gs_op from gs_{$TypeUR}_op   where cd_gs_{$TypeUR}={$_UserTree} and cd_gs_tree=t.cd_gs_tree and action='I')
)
and
o.cd_gs_op not in (select cd_gs_op from gs_{$TypeUR}_op   where cd_gs_{$TypeUR}={$_UserTree} and cd_gs_op=o.cd_gs_op and action='D')
{$OpcionesAEliminar}
and
t.cd_gs_tree in (select cd_gs_tree from {$_SESSION['ShareDictionary']}gs_tree where cd_gs_tree=t.cd_gs_tree and permission='S')
)
)
)" );
}
list( $TReg ) = qRow();
return( $TReg>0 );
}
?>
