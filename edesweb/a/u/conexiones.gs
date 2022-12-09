<?PHP
include_once( $Dir_.$_Sql.'.inc' );
include_once( $Dir_.'message.inc' );
eLngLoad('../../edesweb/lng/varios.lng');
$NumConet = qCount('gs_conexion',"( cdi_fin is null or cdi_fin='' ) and cdi >= '".date('Y-m-d 00:00:00')."' and cdi < '".date( 'Y-m-d H:i:s', mktime( '00','00','00', date('m'), date('d')+1, date('Y') ))."'" );
eMessage( "<center style='margin-top:5px'>".eLng('Usuarios conectados')."<br><b style='font-size:220%'>{$NumConet}</b></center>", 'HS', 10000 );
eEnd();
