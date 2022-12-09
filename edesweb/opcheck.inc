<?PHP
function _eOpCkeck( $OpAChequear ){
include("../_datos/config/desktop.ini");
global $_Sql;
$_DesktopTreeType = eFileGetVar("Desktop.DesktopTreeType");
$_UserTree = $_SESSION["_User"];
if( $_DesktopTreeType=='O' ){
$OpNo = "'U'";
if( $_Development ) $OpNo .= "";
else if( $_Test ) $OpNo .= ",'D'";
else $OpNo .= ",'D','T'";
$TypeUR = (($_TypeTree=='P') ? 'user' : 'rol');
$OpcionesAEliminar = '';
if( eSqlType('mysql,mysqli') ){
qQuery( "select distinct seq, indent, type, caption, script_url, o.cd_gs_op, tip, icon, show_type, alias, icons, mode
from {$_SESSION['ShareDictionary']}gs_op o left join {$_SESSION['ShareDictionary']}gs_tree_op t on o.cd_gs_op = t.cd_gs_op
where
o.cd_gs_op={$OpAChequear}
and
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
)
order by seq" );
}else{
qQuery( "select distinct seq, indent, type, caption, script_url, o.cd_gs_op, tip, icon, show_type, alias, icons, mode
from {$_SESSION['ShareDictionary']}gs_op o left join {$_SESSION['ShareDictionary']}gs_tree_op t on o.cd_gs_op = t.cd_gs_op
where
o.cd_gs_op={$OpAChequear}
and
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
)
order by seq" );
}
}
$r = qArray();
return ($r["script_url"]!="");
}
?>
