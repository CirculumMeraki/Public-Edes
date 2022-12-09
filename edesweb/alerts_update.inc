<?PHP
include( $Dir_.$_Sql.'.inc' );
$_SERVER['QUERY_STRING'] = substr($_SERVER['QUERY_STRING'],2);
list( $IdTabla, $TABLA, $Accion ) = explode(',',$_SERVER['QUERY_STRING']);
list( $Dias, $Horas, $Minutos ) = explode(':',$Accion);
if( strlen($Horas  )==1 ) $Horas   = '0'.$Horas;
if( strlen($Minutos)==1 ) $Minutos = '0'.$Minutos;
if( eSqlType('mysql,mysqli') ){
$xHoy = date('Y-m-d');
$xMascara = 'Y-m-d';
}else{
$xHoy = date('d-m-Y');
$xMascara = 'd-m-Y';
}
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
$dt_date_ev			= "to_char( dt_date_ev, 'yyyy-mm-dd' )";
$dt_new_date_ev		= "to_char( dt_new_date_ev, 'yyyy-mm-dd' )";
$edt_date_ev		= "to_char( e.dt_date_ev, 'yyyy-mm-dd' )";
$udt_new_date_ev	= "to_char( u.dt_new_date_ev, 'yyyy-mm-dd' )";
}
$CalcNuevoAviso = false;
if( substr($TABLA,-5) == '_user' ){
if( $Dias == -1 ){
$pTABLA = substr($TABLA,0,-5);
qSelect( $TABLA, '*', "cd_{$TABLA}={$IdTabla}" );
$row = qArray();
if( qCount( $pTABLA, "cd_{$pTABLA}=".$row['cd_'.$pTABLA] ) == 0 ){
sql_Borra( $TABLA, "cd_{$TABLA}={$IdTabla}" );
}else{
qSelect( $pTABLA, '*', "cd_{$pTABLA}=".$row['cd_'.$pTABLA] );
$pRow = qArray();
if( $pRow['status_ev'] == 'D' ){
sql_Borra( $TABLA , "cd_{$TABLA}={$IdTabla}" );
if( qCount( $TABLA , "cd_{$TABLA}={$IdTabla}" )==0 ){
sql_Borra( $pTABLA, "cd_{$pTABLA}=".$row['cd_'.$pTABLA] );
}
}else{
if( $pRow['old_delete_ev']=='S' ){
sql_Borra( $TABLA , "cd_{$TABLA}={$IdTabla}" );
}else{
sql_Modifica( $TABLA, 'status_ev="H"', "cd_{$TABLA}={$IdTabla}" );
}
}
}
eEnd();
}else if( $Dias == -2 ){
$CalcNuevoAviso = true;
}else if( $Dias == 2 ){
$CalcNuevoAviso = true;
}else if( $Dias == 0 ){
sql_Modifica( $TABLA, 'new_hour_ev="'.$Horas.':'.$Minutos.'", dt_new_date_ev="'.$xHoy.'"', "cd_{$TABLA}={$IdTabla}" );
}else{
$NuevoDia = date( $xMascara, mktime( 0,0,0, date('m'), date('d')+1, date('Y') ));
sql_Modifica( $TABLA, 'dt_new_date_ev="'.$NuevoDia.'"', "cd_{$TABLA}={$IdTabla}" );
}
if( $CalcNuevoAviso ){
qSelect( $TABLA, '*', "cd_{$TABLA}={$IdTabla}" );
$row = qArray();
$pTABLA = substr($TABLA,0,-5);
$TienePadre = qCount( $pTABLA, "cd_{$pTABLA}=".$row['cd_'.$pTABLA] );
if( $TienePadre == 0 ){
sql_Borra( $TABLA, "cd_{$TABLA}={$IdTabla}" );
eEnd();
}else{
qSelect( $pTABLA, '*', "cd_{$pTABLA}=".$row['cd_'.$pTABLA] );
$pRow = qArray();
if( $pRow['status_ev'] == 'D' ){
sql_Borra( $TABLA , "cd_{$TABLA}={$IdTabla}" );
if( qCount( $TABLA , "cd_{$TABLA}={$IdTabla}" )==0 ){
sql_Borra( $pTABLA, "cd_{$pTABLA}=".$row['cd_'.$pTABLA] );
}
eEnd();
}else{
sql_Modifica( $TABLA, 'status_ev="H"', "cd_{$TABLA}={$IdTabla}" );
}
}
if( $Dias == -1 ) eEnd();
qSelect( $pTABLA, '*', "cd_{$pTABLA}={$row['cd_{$pTABLA}']}" );
$pRow = qArray();
if( $pRow['frequency_ev']=='1' ){
if( $pRow['old_delete_ev']=='S' ){
sql_Borra( $TABLA, "cd_{$TABLA}={$IdTabla}" );
}else{
sql_Modifica( $TABLA, 'status_ev=""', "cd_{$TABLA}={$IdTabla}" );
}
}else if(
( isZero($pRow['dt_start_ev']) || $pRow['dt_start_ev']>=date('Y-m-d') ) and
( isZero($pRow['dt_end_ev'])   || $pRow['dt_end_ev']<=date('Y-m-d') )		){
list($y, $m, $d) = explode('-', $pRow['dt_alert_date_ev']);
$Hoy = date('Y-m-d');
switch( $pRow['frequency_ev'] ){
case 'Y':
$n = 0;
do{
$n++;
$NuevoDia = date( 'Y-m-d', mktime( 0,0,0, $m, $d, $y+$n ) );
} while( $NuevoDia <= $Hoy );
break;
case 'M':
$n = 0;
do{
$n++;
$NuevoDia = date( 'Y-m-d', mktime( 0,0,0, $m+$n, $d, $y ) );
} while( $NuevoDia <= $Hoy );
break;
case 'W':
$n = 0;
do{
$n += 7;
$NuevoDia = date( 'Y-m-d', mktime( 0,0,0, $m, $d+$n, $y ) );
} while( $NuevoDia <= $Hoy );
break;
case 'L':
$n = 0;
do{
$n++;
$NuevoDia = date( 'Y-m-d', mktime( 0,0,0, date('m'), date('d')+$n, date('Y') ));
} while( date('w')==0 || date('w')==6 || $NuevoDia <= $Hoy );
break;
case 'D':
$NuevoDia = date( 'Y-m-d', mktime( 0,0,0, date('m'), date('d')+1, date('Y') ));
break;
case '1':
break;
default:
eEnd();
}
sql_Modifica( $TABLA, 'dt_alert_date_ev="'.$NuevoDia.'", dt_new_date_ev="'.$NuevoDia.'", new_hour_ev="'.$pRow['alert_hour_ev'].'"', "cd_{$TABLA}={$IdTabla}" );
}else{
if( !isZero($pRow['dt_end_ev']) && $pRow['dt_end_ev']<=date('Y-m-d') ){
if( $pRow['old_delete_ev']=='S' ){
sql_Borra( $TABLA, "cd_{$TABLA}={$IdTabla}" );
}else{
sql_Modifica( $TABLA, 'status_ev=""', "cd_{$TABLA}={$IdTabla}" );
}
}
}
}
}else{
if( $Dias == -1 ){
qSelect( $TABLA, '*', "cd_{$TABLA}={$IdTabla}" );
$row = qArray();
if( $row['old_delete_ev']=='S' ){
if( qCount( $TABLA.'_user', "cd_{$TABLA}={$IdTabla}" ) == 0 ){
sql_Borra( $TABLA, "cd_{$TABLA}={$IdTabla}" );
}else{
sql_Modifica( $TABLA, 'status_ev="D"', "cd_{$TABLA}={$IdTabla}" );
}
}else{
sql_Modifica( $TABLA, 'status_ev="H"', "cd_{$TABLA}={$IdTabla}" );
}
eEnd();
}else if( $Dias == -2 ){
$CalcNuevoAviso = true;
}else if( $Dias == 2 ){
$CalcNuevoAviso = true;
}else if( $Dias == 0 ){
sql_Modifica( $TABLA, 'new_hour_ev="'.$Horas.':'.$Minutos.'", dt_new_date_ev="'.date('Y-m-d').'"', "cd_{$TABLA}={$IdTabla}" );
}else{
$NuevoDia = date( 'Y-m-d', mktime( 0,0,0, date('m'), date('d')+1, date('Y') ));
sql_Modifica( $TABLA, 'dt_new_date_ev="'.$NuevoDia.'"', "cd_{$TABLA}={$IdTabla}" );
}
if( $CalcNuevoAviso ){
qSelect( $TABLA, '*', "cd_{$TABLA}={$IdTabla}" );
$row = qArray();
if( $row['frequency_ev']=='1' ){
if( $row['old_delete_ev']=='S' ){
if( qCount( $TABLA.'_user', "cd_{$TABLA}={$IdTabla}" ) == 0 ){
sql_Borra( $TABLA, "cd_{$TABLA}={$IdTabla}" );
}else{
sql_Modifica( $TABLA, 'status_ev="D"', "cd_{$TABLA}={$IdTabla}" );
}
}else{
sql_Modifica( $TABLA, 'status_ev=""', "cd_{$TABLA}={$IdTabla}" );
}
}else if(
( isZero($row['dt_start_ev']) || $row['dt_start_ev']>=date('Y-m-d') ) and
( isZero($row['dt_end_ev'])   || $row['dt_end_ev']  <=date('Y-m-d') )		){
list( $y, $m, $d ) = explode( '-', $row['dt_alert_date_ev'] );
$Hoy = date('Y-m-d');
switch( $row['frequency_ev'] ){
case 'Y':
$n = 0;
do{
$n++;
$NuevoDia = date( 'Y-m-d', mktime( 0,0,0, $m, $d, $y+$n ) );
} while( $NuevoDia <= $Hoy );
break;
case 'M':
$n = 0;
do{
$n++;
$NuevoDia = date( 'Y-m-d', mktime( 0,0,0, $m+$n, $d, $y ) );
} while( $NuevoDia <= $Hoy );
break;
case 'W':
$n = 0;
do{
$n += 7;
$NuevoDia = date( 'Y-m-d', mktime( 0,0,0, $m, $d+$n, $y ) );
} while( $NuevoDia <= $Hoy );
break;
case 'L':
$n = 0;
do{
$n++;
$NuevoDia = date( 'Y-m-d', mktime( 0,0,0, date('m'), date('d')+$n, date('Y') ));
} while( date('w')==0 || date('w')==6 || $NuevoDia <= $Hoy );
break;
case 'D':
$NuevoDia = date( 'Y-m-d', mktime( 0,0,0, date('m'), date('d')+1, date('Y') ));
break;
case '1':
break;
default:
eEnd();
}
sql_Modifica( $TABLA, 'dt_alert_date_ev="'.$NuevoDia.'", dt_new_date_ev="'.$NuevoDia.'", new_hour_ev="'.$row['alert_hour_ev'].'"', "cd_{$TABLA}={$IdTabla}" );
}else{
if( !isZero($row['dt_end_ev']) && $row['dt_end_ev']<=date('Y-m-d') ){
if( $row['old_delete_ev']=='S' ){
sql_Borra( $TABLA, "cd_{$TABLA}={$IdTabla}" );
}else{
sql_Modifica( $TABLA, 'status_ev=""', "cd_{$TABLA}={$IdTabla}" );
}
}
}
}
}
eEnd();
?>
