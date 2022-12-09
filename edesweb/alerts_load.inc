<?PHP
global $_eAddEvento, $_AlertsTables, $_Sql;
$_eAddEvento = array();
$NomDia = explode(',','Domingo,Lunes,Martes,Miércoles,Jueves,Viernes,Sábado');
$Hoy = date('Y-m-d');
if( trim($_AlertsTables)=='' ) $_AlertsTables = 'gs_event,EVENTO,$a/d/event.edf';
$DimEvento = explode('|',$_AlertsTables);
for( $n=0; $n<count($DimEvento); $n++ ){
list( $TABLA, $TITULO, $EDF ) = explode(',',$DimEvento[$n]);
if( eSqlType('mysql,mysqli') ){
$dt_date_ev			= "dt_date_ev";
$dt_new_date_ev		= "dt_new_date_ev";
$edt_date_ev		= "e.dt_date_ev";
$udt_new_date_ev	= "u.dt_new_date_ev";
}else if( eSqlType('informix') ){
$dt_date_ev			= "dt_date_ev";
$dt_new_date_ev		= "dt_new_date_ev";
$edt_date_ev		= "e.dt_date_ev";
$udt_new_date_ev	= "u.dt_new_date_ev";
}else if( eSqlType('oracle') ){
$dt_date_ev			= "to_char(dt_date_ev, 'yyyy-mm-dd')";
$dt_new_date_ev		= "to_char(dt_new_date_ev, 'yyyy-mm-dd')";
$edt_date_ev		= "to_char(e.dt_date_ev, 'yyyy-mm-dd')";
$udt_new_date_ev	= "to_char(u.dt_new_date_ev, 'yyyy-mm-dd')";
}
qSelect($TABLA,
"cd_{$TABLA}, new_hour_ev, {$dt_date_ev}, hour_ev, nm_{$TABLA}, {$dt_new_date_ev}",
'status_ev="S" and cd_gs_user="'.$_User.'" and dt_new_date_ev<="'.$Hoy.'"'
);
while( $row = qArray() ){
list($a, $m, $d) = explode('-',$row['dt_date_ev']);
$Fecha = $NomDia[date('w', mktime(0,0,0,$m,$d,$a))].' '.$d.'-'.$m.'-'.$a;
eAddEvent(
$row["cd_{$TABLA}"],
(( $row['dt_new_date_ev']<date('Y-m-d') ) ? '00:00' : $row['new_hour_ev'] ),
$Fecha.' '.$row['hour_ev'],
$row["nm_{$TABLA}"],
'edes.php?FmR:'.$EDF.'&_SEEK&cd_'.$TABLA.'='.$row["cd_{$TABLA}"].'&_STOP',
$TITULO, $TABLA
);
}
qSelect(	"{$TABLA}_user u, {$TABLA} e",
"u.cd_{$TABLA}_user, u.cd_{$TABLA}, u.new_hour_ev, {$edt_date_ev}, e.hour_ev, e.nm_{$TABLA}, {$udt_new_date_ev}",
'u.status_ev="S" and u.cd_gs_user="'.$_User.'" and u.dt_new_date_ev<="'.$Hoy.'" and u.cd_'.$TABLA.'=e.cd_'.$TABLA
);
while( $row = qArray() ){
list( $a, $m, $d ) = explode('-',$row['dt_date_ev']);
$Fecha = $NomDia[date( 'w', mktime(0,0,0,$m,$d,$a) )].' '.$d.'-'.$m.'-'.$a;
eAddEvent(
$row["cd_{$TABLA}_user"],
( ( $row['dt_new_date_ev'] < date('Y-m-d') ) ? '00:00' : $row['new_hour_ev'] ),
$Fecha.' '.$row['hour_ev'],
$row["nm_{$TABLA}"],
'edes.php?FcR:'.$EDF.'&_SEEK&cd_'.$TABLA.'='.$row["cd_{$TABLA}"].'&_STOP',
$TITULO, $TABLA.'_user'
);
}
}
echo 'top.eEventReset();';
for( $n=0; $n<count($_eAddEvento); $n++ ){
echo 'top._eAddEvent['.$n.'] = new Array( null,"'.$_eAddEvento[$n][0].'","'.$_eAddEvento[$n][1].'","'.$_eAddEvento[$n][2].'","'.$_eAddEvento[$n][3].'","'.$_eAddEvento[$n][4].'","'.$_eAddEvento[$n][5].'","'.$_eAddEvento[$n][6].'" );';
}
if( count($_eAddEvento) > 0 ) echo 'top.eEventRun();';
?>
