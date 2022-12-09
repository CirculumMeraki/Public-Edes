<?PHP
eInit();
include( 'auto_list.htm');
$Contents = ob_get_contents();
eInit();
$PosIni = strpos( $Contents, '<!'.'--{TR}-'.'->' );
if( $PosIni !== false ){
$PlanIni = substr( $Contents, 0, $PosIni );
$PosFin = strpos( $Contents, '<!'.'--{/TR}--'.'>' );
$PlanFin = substr( $Contents, $PosFin+12 );
$PlanFila = trim( substr( $Contents, $PosIni+11, $PosFin-$PosIni-11 ) );
if( empty($PlanFila) ) return;
}
echo $PlanIni;
_FileNoCache('lista.js');
while( $row = qRow() ){
$Plantilla = $PlanFila;
$ntReg++;
$_OpLin = 0;
for( $n=0; $n < $NCampos; $n++ ){
$Celda = trim( $row[$n] );
if( !empty( $_ADDOPTION[ $_Form[$n][1] ] ) ){
$Celda = $_SelVirtual[$_Form[$n][1]][$Celda];
}else{
if( $_Form[$n][2] == '#' ) $Celda = urldecode( $Celda );
$Celda = trim($Celda);
if( $_HayRadio ){
if( count($_RADIO[$_Form[$n][1]])>0 ){
$Celda = $_RADIO[$_Form[$n][1]][$Celda];
}
}
}
if( substr_count($_Form[$n][6],'*')>0 ){
$Plantilla = str_replace('{'.$_Form[$n][1].'}', $Celda, $Plantilla);
}else{
if( $_Form[$n][2]=='F4' && isZero($Celda) ){
$Plantilla = str_replace('{'.$_Form[$n][1].'}', '', $Plantilla);
}else{
if( empty($_FORMAT[$n]) ){
$Plantilla = str_replace('{'.$_Form[$n][1].'}', $Celda, $Plantilla);
}else{
if( substr_count($_FORMAT[$n],'@')>0 ){
if( strrpos($Celda, '.')!==false ){
$Celda = substr($Celda, strrpos($Celda, '.')+1);
}else $Celda = '';
$Formato = 'echo '.str_replace('@', $Celda, $_FORMAT[$n]).';';
if( $Celda == '' ) $Formato = 'echo "";';
}else{
$Formato = 'echo '.str_replace('#', $Celda, $_FORMAT[$n]).';';
}
@eval($Formato);
}
}
if( count($_COLSOP)>0 ) if( !empty($_COLSOP[$n]) ) $_OpCol[$n] += $Celda;
if( count($_ROWSOP)>0 ) if( !empty($_ROWSOP[$n]) ) $_OpLin += $Celda;
}
}
for($n=0; $n<10; $n++){
echo $Plantilla;
}
if( count($_ROWSOP) > 0 ){
echo "<td id=D class=PieLista>";
if( empty($_FORMAT[$NCampos]) ){
echo $_OpLin;
}else{
$Formato = 'echo '.str_replace( '#', $_OpLin, $_FORMAT[$NCampos] ).';';
@eval( $Formato );
}
$_OpLinCol += $_OpLin;
}
}
echo $PlanFin;
?>
<DIV id=TablaTH STYLE="z-index:2; display:none; position:absolute;"></DIV>
<DIV id=TablaTV STYLE="z-index:1; display:none; position:absolute;"></DIV>
<DIV id=TablaTE STYLE="z-index:3; display:none; position:absolute;"></DIV>
<SCRIPT type="text/javascript">
var _Zoom = 1;
if( BROWSE.rows.length > 1 && BROWSE.rows[1].cells[0] != undefined ) document.body.onscroll = MovTitulos;
</SCRIPT>
<?PHP
eEnd();
?>
