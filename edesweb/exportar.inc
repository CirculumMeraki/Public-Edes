<?PHP //[_PROTECCION_]
$ExeJS = 'if(window.name=="IWORK")history.go(-1);';
$nAlias = 64;
function NomAlias( &$nAlias ){
$nAlias++;
if( $nAlias > 90 ){
return 'A'.chr($nAlias-26);
}
return chr($nAlias);
}
$cAlias = NomAlias( $nAlias );
$DimTabla = array();
$DimBusca = array();
$DimTabla[$_DBTABLE] = $cAlias;
$sTabla = $_DBTABLE;
$_DBTABLE = $_DBTABLE.' '.$cAlias;
if( trim($Busca) != '' ) $DimBusca = explode( ' and ', $Busca );
$Busca = '';
for( $n=0; $n < count($DimBusca); $n++ ){
if( !empty($Busca) ) $Busca .= ' and ';
$saltar = false;
for( $i=0; $i < count($_DBJOINTABLE); $i++ ){
$cmp = explode( '=', $DimBusca[$n] );
if( $_DBJOINTABLE[$i][0] == trim($cmp[0]) ){
$saltar = true;
$pTabla = trim(substr( $_DBJOINTABLE[$i][1],0,strpos( $_DBJOINTABLE[$i][1],'.')));
if( substr_count( $_DBTABLE, $pTabla ) == 0 ){
$cAlias = NomAlias( $nAlias );
$_DBTABLE .= ', ' . $pTabla.' '.$cAlias;
$DimTabla[$pTabla] = $cAlias;
}
$tmp1 = str_replace( $sTabla.'.', 'A.', $_DBJOINTABLE[$i][1] );
$tmp2 = substr( $_DBJOINTABLE[$i][1],0,strpos( $_DBJOINTABLE[$i][1],'.') ).'.' . trim($DimBusca[$n]);
$tmp1 = str_replace( $pTabla.'.', $cAlias.'.', $tmp1 );
$tmp2 = str_replace( $pTabla.'.', $cAlias.'.', $tmp2 );
$Busca .= $tmp1 . ' and ' . $tmp2;
$Extraer .= ', '.substr( $_DBJOINTABLE[$i][1],0,strpos( $_DBJOINTABLE[$i][1],'.') ).$_DBJOINTABLE[$i][0];
break;
}
}
if( !$saltar ) $Busca .= $cAlias.'.'.trim($DimBusca[$n]);
}
if( !empty($_estructura) ){
$DimDef = file( '../_datos/exp/'.$_estructura );
for( $n=0; $n < count($DimDef); $n++ ){
$DimDef[$n] = trim($DimDef[$n]);
if( $DimDef[$n][0] != '.' && $DimDef[$n][0] != '-' && !empty($DimDef[$n]) && $DimDef[$n][0] != '|' ){
if( $DimDef[$n][0] == '[' ){
list( $tmpEti, $tmp ) = explode( "]", $DimDef[$n] );
$tmpEti = str_replace( '[', '', $tmpEti );
if( $tmpEti == 'Orden' ) $_Orden = trim( $tmp );
}else{
array_push( $_EXPORT, explode( '|', $DimDef[$n] ) );
}
}
}
}
$DimOrden = explode( ',', $_DBORDER );
$_Orden = '';
for( $n=0; $n < count($DimOrden); $n++ ){
if( !empty($_Orden) ) $_Orden .= ',';
$_Orden .= 'A.'.trim($DimOrden[$n]);
}
if( isset($_no_contar) && $_no_contar==1 ){
}else{
$_TReg = qCount( $_DBTABLE, $Busca );
if( $_TReg == 0 ){
eMessage( '~NRC', 'HS', $_MSGTIME[1], $ExeJS, 'NR' );
}
if( !empty($_DBLIMIT) && $_LimitOn == false && $_TReg > $_DBLIMIT ){
eMessage( '~LE|'.$_TReg, 'EHS', 5000, $ExeJS );
}
$TotalReg = $_TReg;
}
$NoExportar = '';
if( isset($_EXPORT) ){
$Extraer = '';
for( $n=0; $n<count($_EXPORT); $n++ ){
$_EXPORT[$n][1] = trim($_EXPORT[$n][1]);
if( $_EXPORT[$n][1][0] == '*' ){
if( !empty($NoExportar) ) $NoExportar .= ', ';
$NoExportar .= 'A.'.trim($_EXPORT[$n][0]);
continue;
}elseif( substr_count($_EXPORT[$n][0],'{') > 0 ){
$tmp = str_replace( '{', ',', $_EXPORT[$n][0] );
$tmp = str_replace( '}', '', $tmp );
$tmp = str_replace( ' ', '', $tmp );
$tmp = explode( ',', $tmp );
$tmp[1] = trim($tmp[1]);
if( !empty($Extraer) ) $Extraer .= ', ';
if( empty( $DimTabla[ $tmp[1] ] ) ){
$cAlias = NomAlias( $nAlias );
$DimTabla[ $tmp[1] ] = $cAlias;
$uAlias = $cAlias;
$_DBTABLE .= ', outer '.$tmp[1].' '.$cAlias;
}else{
$uAlias = $DimTabla[ $tmp[1] ];
}
$Extraer .= $uAlias.'.'.trim($tmp[3]);
if( substr_count( $tmp[0], '+' ) == 0 ){
if( !empty($Busca) ) $Busca .= ' and ';
$Busca .= $uAlias.'.'.$tmp[2].'=A.'.$tmp[0];
}else{
$tmp0 = explode( '+', $tmp[0] );
$tmp2 = explode( '+', $tmp[2] );
for( $i=0; $i<count($tmp0); $i++ ){
if( !empty($Busca) ) $Busca .= ' and ';
$Busca .= $uAlias.'.'.$tmp2[$i].'=A.'.$tmp0[$i];
}
}
}else{
if( !empty($Extraer) ) $Extraer .= ', ';
$Extraer .= 'A.'.trim($_EXPORT[$n][0]);
}
}
if( !empty($NoExportar) ) $NoExportar = ', '.$NoExportar;
$tmp = explode( ' and ', $Busca );
$xCondi = array();
for( $i=0; $i<count($tmp); $i++ ) $xCondi[trim($tmp[$i])] = 1;
$Busca = '';
foreach( $xCondi as $k=>$v ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $k;
}
if( isset($_exe) ){
$_Tablas = $_DBTABLE;
$_Campos = $Extraer.$NoExportar;
$_Condiciones = $Busca;
include( eScript($_exe) );
exit;
}
$Dir = eGetCWD();
$DirOut = substr($Dir,0,strrpos($Dir,'/')).'/_tmp/exp/';
eMessage( "Total de registros a exportar: {$TotalReg}", 'V' );
set_time_limit( 0 );
register_shutdown_function('ExpDatos');
}
exit;
function ExpDatos(){
global $_fichero, $NCampos, $_LongExp, $_Orden, $TotalReg;
global $_DBTABLE, $Extraer, $NoExportar, $Busca, $_EXPORT, $DimDef;
$Dir = $GLOBALS['DirOut'];
if( empty($_fichero) ) $_fichero = 'exportacion';
$_fichero = strtolower($_fichero);
$DimDef[0] = trim($DimDef[0]);
$DimDef[0] = trim(substr( $DimDef[0], 1 ));
$fd = fopen( $Dir.$_fichero.'.sql', 'w' );
$txt  = 'NOMBRE....: '. $DimDef[0]				.chr(13).chr(10).chr(13).chr(10);
$txt .= 'TABLA.....: '. $_DBTABLE				.chr(13).chr(10);
$txt .= 'CAMPOS....: '. $Extraer.$NoExportar	.chr(13).chr(10);
$txt .= 'BUSCAR....: '. $Busca					.chr(13).chr(10);
$txt .= 'ORDEN.....: '. $_Orden					.chr(13).chr(10).chr(13).chr(10);
$txt .= 'Registros.: '. $TotalReg				.chr(13).chr(10).chr(13).chr(10);
$txt .= 'B.Inicio..: '. date('Y-m-d H:i:s')	.chr(13).chr(10);
fputs( $fd, $txt );
fclose($fd);
qSelect( $_DBTABLE, $Extraer.$NoExportar, $Busca, $_Orden );
$fd = fopen( $Dir.$_fichero.'.sql', "a" );
$txt = 'E.Inicio..: '. date('Y-m-d H:i:s')	.chr(13).chr(10);
fputs( $fd, $txt );
fclose($fd);
$_LongExp = array();
global $_Result;
$nombres = ifx_fieldproperties( $_Result );
for( $n=0; $n < count($nombres); $n++ ){
$fname = key ($nombres);
$tmp = explode( ';',$nombres[$fname] );
switch( $tmp[0] ){
case 'SQLCHAR';
array_push( $_LongExp, trim($tmp[1]) );
break;
case 'SQLSERIAL';
array_push( $_LongExp, $tmp[1]*2 );
break;
case 'SQLDATE';
array_push( $_LongExp, 10 );
break;
case 'SQLDTIME';
if( $tmp[1] == '1538' ){
array_push( $_LongExp, 7 );
}else{
array_push( $_LongExp, 7 );
}
break;
default:
array_push( $_LongExp, trim($tmp[1]) );
}
next( $nombres );
}
$NCampos = substr_count( $Extraer, ',' )+1;
$fd = fopen( $Dir.$_fichero.'.txt', 'w' );
$txt = '';
while( $row = qRow() ){
for( $n=0; $n < $NCampos; $n++ ){
$txt .= str_pad( $row[$n], $_LongExp[$n] );
}
fputs( $fd, $txt );
$txt = chr(13).chr(10);
}
fclose($fd);
$total = 0;
$txt  = '      ESTRUCTURA' .chr(13).chr(10);
$txt .= '     ------------'.chr(13).chr(10);
for( $n=0; $n < count($_EXPORT); $n++ ){
$txt .= sprintf( "%4d",$_LongExp[$n] ).': '.$_EXPORT[$n][1]. chr(13).chr(10);
$total += $_LongExp[$n];
}
$txt .= '-----'.chr(13).chr(10);
$txt .= sprintf( "%4d", $total ).': Caracteres por registro (+2)'.chr(13).chr(10);
$txt .= chr(13).chr(10);
$txt .= 'Fecha de extraccion: '. date('Y-m-d H:i:s')  .chr(13).chr(10).chr(13).chr(10);
$txt .= 'Total de registros.: '. $TotalReg;
$fd = fopen( $Dir.$_fichero.'.est', "w" );
fputs( $fd, $txt );
fclose($fd);
$fd = fopen( $Dir.$_fichero.'.sql', "a" );
$txt = 'E.Final...: '. date('Y-m-d H:i:s') .chr(13).chr(10);
fputs( $fd, $txt );
fclose($fd);
qEnd();
$Dim = array();
exec( "zip -9 -j -b {$Dir} {$Dir}{$_fichero} {$Dir}{$_fichero}.est {$Dir}{$_fichero}.txt", $Dim );
$fd = fopen( $Dir.$_fichero.'.sql', "a" );
$txt  = 'ZIP Final.: '. date('Y-m-d H:i:s').chr(13).chr(10).chr(13).chr(10);
$txt .= 'Tamaño....: '. (($TotalReg*($total+2))-2) .' / '. filesize( "{$Dir}{$_fichero}.txt" ) .' / '. filesize( "{$Dir}{$_fichero}.zip" );
fputs( $fd, $txt );
fclose($fd);
@unlink( $Dir.$_fichero.'.txt' );
}
?>
