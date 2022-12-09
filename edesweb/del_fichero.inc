<?PHP
function BorraFicheros( $dir, $nDias, $Ext='', $VerDatos=0, $LosMenores=true ){
if( $nDias===$nDias*1 ){
$ayer = date( 'YmdHis', mktime( date('H'),date('i'),date('s'), date('m'), date('d')-$nDias, date('Y') ));
}else{
$ayer = str_replace('-','',$nDias);
$ayer = str_replace('/','',$ayer);
$ayer = str_replace(':','',$ayer);
$ayer = str_replace(' ','',$ayer);
}
if( $VerDatos ) eTron( 'Dir:'.$dir.' - Borrar menores de: '.$ayer );
$uDir = opendir( $dir );
while( $uFile = readdir( $uDir ) ){
if( ($uFile=='.') || ($uFile=='..') || (is_dir( $dir.'/'.$uFile )) ) continue;
if( $Ext!='' ){
if( substr($uFile, strrpos($uFile,'.')+1) != $Ext ) continue;
}
$file = gmdate( "YmdHis", filemtime( $dir .'/'. $uFile ) );
if( $VerDatos ) eTron( $uFile.' '.$file );
if( $LosMenores ){
if( $file < $ayer ){
if( $VerDatos ) eTron( ' *** Delete' );
@unlink( $dir .'/'. $uFile );
}
}else{
if( $file > $ayer ){
if( $VerDatos ) eTron( ' *** Delete' );
@unlink( $dir .'/'. $uFile );
}
}
}
closedir( $uDir );
}
?>
