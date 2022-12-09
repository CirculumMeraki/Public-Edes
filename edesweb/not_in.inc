<?PHP
qQuery( "select count(*) from _seek where valor not in (select {$_NotInTemporary} from {$_DBTABLE})" );
$r=qRow();
eTrace( $r[0] );
qQuery( "select valor from _seek where valor not in (select {$_NotInTemporary} from {$_DBTABLE})" );
while( $r=qRow() ){
eTrace( $r[0] );
}
?>
