<?PHP
function _ISubListDelete($iFile, $iRelacion, $iValor){
global $_DEBUGSubList;
if( substr_count($iFile, '.')==0 ) $iFile .= '.edf';
$ConDebug = $_DEBUGSubList;
if( $ConDebug ){
global $_Mode;
eTron('_Mode: '	.$_Mode);
eTron('iFile: '	.$iFile);
eTron('iRelacion: '.$iRelacion);
eTron('iValor: '.$iValor);
}
list($iFile) = explode('&', $iFile);
$Dim = file(eScript($iFile));
$Tabla = '';
$CampoFile = '';
$DirFile = '';
$Serial = '';
for($i=0; $i<count($Dim); $i++){
$buffer = trim($Dim[$i]);
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
switch( $Etiqueta ){
case 'DBTABLE':
$tmp[0] = _InVar($tmp[0]);
$Tabla = $tmp[0];
break;
case 'UPLOADFILE';
$CampoFile = $tmp[0];
$DirFile = $tmp[1];
$Serial = $tmp[2];
$Prefijo = $tmp[6];
global $_UPLOADFILE;
if( $_UPLOADFILE[$CampoFile]['oDIR']!='' ){
$DirFile = $_UPLOADFILE[$CampoFile]['oDIR'];
}
break;
case 'DBINDEX':
$Serial = $tmp[0];
break;
case 'NOTE':
break;
}
}
if( $ConDebug ){
eTron( '1.Serial: '		.trim($Serial) );
eTron( '2.Tabla: '		.trim($Tabla) );
eTron( '3.iRelacion: '	.trim($iRelacion) );
eTron( '4.iValor: '		.trim($iValor) );
eTron( '5.DirFile: '	.trim($DirFile) );
eTron( '6.CampoFile: '	.trim($CampoFile) );
}
if( trim($Serial)=='' || trim($Tabla)=='' || trim($iRelacion)=='' || trim($iValor)=='' ){
$datoError = '';
if( trim($Serial)=='' ) $datoError .= ' S';
if( trim($Tabla)=='' ) $datoError .= ' T';
if( trim($iRelacion)=='' ) $datoError .= ' R';
if( trim($iValor)=='' ) $datoError .= ' V';
eMessage( 'Faltan datos en "{iSubList}"'.$datoError, 'HSE', -1 );
}
if( $CampoFile!='' ){
if( trim($DirFile)=='' ){
eMessage( 'Faltan datos en "{iSubList}.File"', 'HSE', -1 );
}
$DirFile = eScript($DirFile);
if( substr($DirFile,-1)!='/' ) $DirFile .= '/';
if( $ConDebug ) echo "select {$Serial}, {$CampoFile} from {$Tabla} where {$iRelacion}='{$iValor}'".'<br>';
qQuery( "select {$Serial}, {$CampoFile} from {$Tabla} where {$iRelacion}='{$iValor}'" );
while( $row=qRow() ){
$NomExt = substr( $row[1], strrpos($row[1],'.') );
if( $ConDebug ){
eTron( '> BORRA FILE: unlink('.$DirFile.$Prefijo.trim($row[0]).$NomExt.');' );
}else{
@unlink( $DirFile.$Prefijo.trim($row[0]).$NomExt );
@unlink( $DirFile.$Prefijo.trim($row[0]).$NomExt.'.bak' );
}
}
}
if( $ConDebug ){
eTron( "delete from {$Tabla} where {$iRelacion}='{$iValor}'" );
}else{
qQuery( "delete from {$Tabla} where {$iRelacion}='{$iValor}'" );
}
}
?>
