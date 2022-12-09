<?PHP
eCheckUser();
eInclude( $_Sql );
if( $_GET['O']=='S' ){
qQuery( 'insert into gs_permission (cd_gs_user,cd_gs_tpermission) values ('.$_GET['U'].','.$_GET['P'].')' );
}else{
qQuery( 'delete from gs_permission where cd_gs_user='.$_GET['U'].' and cd_gs_tpermission='.$_GET['P'] );
}
?>
