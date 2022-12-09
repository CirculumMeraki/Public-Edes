<?PHP
die('NNNNNNNNNNNNNNNNNNNNNNNNOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
function _eLoadEvent(){
global $_eAddEvento;
$_eAddEvento = array();
echo '<SCRIPT type="text/javascript" gsScript="">';
if( $_AlertsTables=='' ) $_AlertsTables = 'gs_event,EVENTO,$a/d/event.edf';
$DimEvento = explode('|',$_AlertsTables);
for( $n=0; $n<count($DimEvento); $n++ ){
list( $TABLA, $TITULO, $EDF ) = explode(',',$DimEvento[$n]);
qSelect(	$TABLA,
"cd_{$TABLA}, new_hour_ev, dt_date_ev, hour_ev, nm_{$TABLA}",
'( status_ev="P" or status_ev="p" ) and cd_gs_user="'.$_User.'" and dt_new_date_ev<="'.date('Y-m-d').'"'
);
while( $row = qArray() ){
eAddEvent(
$row["cd_{$TABLA}"],
$row['new_hour_ev'],
$row['dt_date_ev'].' '.$row['hour_ev'],
$row["nm_{$TABLA}"],
'edes.php?FmR:'.$EDF.'&_SEEK&cd_'.$TABLA.'='.$row["cd_{$TABLA}"],
$TITULO, $TABLA
);
}
qSelect(	"{$TABLA}_user u, {$TABLA} e",
"u.cd_{$TABLA}_user, u.new_hour_ev, e.dt_date_ev, e.hour_ev, e.nm_{$TABLA}",
'( u.status_ev="P" or u.status_ev="p" ) and u.cd_gs_user="'.$_User.'" and u.dt_new_date_ev<="'.date('Y-m-d').'" and u.cd_'.$TABLA.'=e.cd_'.$TABLA
);
while( $row = qArray() ){
eAddEvent(
$row["cd_{$TABLA}_user"],
$row['new_hour_ev'],
$row['dt_date_ev'].' '.$row['hour_ev'],
$row['nm_gs_event'],
'edes.php?FcR:'.$EDF.'&_SEEK&cd_'.$TABLA.'_user='.$row["cd_{$TABLA}_user"],
$TITULO, $TABLA.'_user'
);
}
}
_eAddEventExe();
echo '</SCRIPT>';
}
function eAddEvent( $Id, $HoraAviso, $Momento, $Descripción, $Href, $Titulo, $Tabla ){
global $_eAddEvento;
$_eAddEvento[] = array( $Id, $HoraAviso, $Momento, $Descripción, $Href, $Titulo, $Tabla );
}
function _eAddEventExe(){
global $_eAddEvento;
echo 'top.eEventReset();';
for( $n=0; $n<count($_eAddEvento); $n++ ){
echo 'top._eAddEvent['.$n.'] = new Array( null,"'.$_eAddEvento[$n][0].'","'.$_eAddEvento[$n][1].'","'.$_eAddEvento[$n][2].'","'.$_eAddEvento[$n][3].'","'.$_eAddEvento[$n][4].'","'.$_eAddEvento[$n][5].'","'.$_eAddEvento[$n][6].'" );';
}
if( count($_eAddEvento) > 0 ) echo 'top.eEventRun();';
}
?>
