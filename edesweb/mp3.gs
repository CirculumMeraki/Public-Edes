<?PHP
function eMP3Info( $file ){
$Dim = array();
$fp=fopen($file,"r");
fseek($fp,filesize($file)-128);
$Texto = fread($fp,128);
if( substr($Texto,0,3)!='TAG' ){
fseek($fp,filesize($file)-127);
$Texto = fread($fp,128);
}
fclose($fp);
$Texto = str_replace(chr(0),' ',$Texto);
if( substr($Texto,0,3)!='TAG' ) return $Dim;
$i = 3;
$Dato = array( 'title'=>30, 'artist'=>30, 'album'=>30, 'year'=>4, 'comment'=>28, 'reserve'=>1, 'track'=>1, 'genre'=>1 );
foreach( $Dato as $k=>$v ){
if( $k=='reserve' ){
}else if( $k=='track' ){
$Dim[$k] = ord(substr($Texto,$i,$v));
}else if( $k=='genre' ){
$Dim[$k] = ord(substr($Texto,$i,$v));
}else{
$Dim[$k] = trim(substr($Texto,$i,$v));
}
$i += $v;
}
return $Dim;
}
?>
