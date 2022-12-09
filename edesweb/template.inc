<?PHP
eInit();
include( eScript($_TEMPLATE) );
$Contents = ob_get_contents();
eInit();
$PosIni = strpos( $Contents, '<!'.'--{TR}-'.'->' );
if( $PosIni !== false ){
$PlantillaINI = substr( $Contents, 0, $PosIni );
$PosFin = strpos( $Contents, '<!'.'--{/TR}--'.'>' );
$PlantillaEND = substr( $Contents, $PosFin+12 );
$pTR = trim( substr( $Contents, $PosIni+11, $PosFin-$PosIni-11 ) );
if( empty($pTR) ){
echo $Contents;
eEnd();
}
}
echo $PlantillaINI;
$Indice = -1;
while( $_vF = NewFila($Indice) ){
$Cuerpo = $pTR;
if( $_FORMATPHP!='' ) _ExeFormato( $_vF, $_CellsStyle, $_CellsClass, $Indice );
for( $n=0; $n<count($_vF); $n++ ){
$Celda = $_vF[$n];
if( !empty( $_ADDOPTION[ $_Form[$n][1] ] ) ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}else{
if( $_Form[$n][3]=='H' ){
$Celda = str_replace('&#39;' ,"'",$Celda);
$Celda = str_replace('&quot;','"',$Celda);
}else if( $_Form[$n][2]=='#' && $_Form[$n][3]!='H' ){
$Celda = urldecode( $Celda );
$Celda = str_replace("\n",'{#}ENTER{#}',$Celda);
$Celda = str_replace('&#43;','+',$Celda);
$Celda = str_replace('&#39;',"'",$Celda);
$Celda = str_replace('&#34;','"',$Celda);
$Celda = str_replace('&#92;','\\',$Celda);
if( !$_HTMLENTITIES[$_Form[$n][1]] ) $Celda = htmlentities($Celda);
$Celda = str_replace( '{#}ENTER{#}', '<br>', $Celda );
$Celda = str_replace('&amp;quot;','"',$Celda);
}else if( $_Form[$n][2] == 'o' ){
if( isset($_CHECKLIST[ $_Form[$n][1] ]) ) if( $Celda!='' ) $Celda = substr( $Celda, 1, -1 );
}else if( ($_Form[$n][2] == 'F4' && isZero($Celda)) || ($_Form[$n][2] == 'CDI' && isZero($Celda)) ){
$Celda = '';
}
$Celda = trim( $Celda );
if( $_HayRadio ){
if( count($_RADIO[$_Form[$n][1]])>0 ) $Celda = $_RADIO[$_Form[$n][1]][$Celda];
}
}
$Cuerpo = str_replace('{'.$n.'}', $Celda, $Cuerpo);
}
echo $Cuerpo;
}
echo $PlantillaEND;
eEnd();
function NewFila( &$Indice=NULL ){
global $usuCursor;
if( !isset($usuCursor) ){
return qRow();
}else{
$Indice++;
return $usuCursor[$Indice];
}
}
?>
