<?PHP
function _CheckDelete( $_DBINDEX, $_CHECKDELETE ){
global ${$_DBINDEX}, $_Sql, $OriFichero;
$TotalReg = 0;
$NumCursor = 0;
$Titulo = '';
$DimSQL = array();
$DimOtroSQL = array();
$DimTitulo = array();
$DimTReg = array();
$DimFormato = array();
$tmp = explode( "\n", $_CHECKDELETE );
for( $n=0; $n<count($tmp); $n++ ){
$txt = trim($tmp[$n]);
if( $txt=='' || $txt[0]=='.' ) continue;
if( $Titulo=='' ){
$Titulo = $txt;
continue;
}
switch( substr_count($txt,'|') ){
case 0:
$DimTitulo[] = $txt;
break;
case 1:
list( $tabla, $campos ) = explode( '|', $txt );
$campos = str_replace(' ','',$campos);
$Dim = explode( ',', $campos );
$OtroSQL = '';
$campos = '';
for( $i=0; $i<count($Dim); $i++ ){
if( substr_count( $Dim[$i], '->' ) > 0 ){
$OtroSQL = trim($Dim[$i]);
continue;
}
if( $campos!='' ) $campos .= ' or ';
$campos .= 'A.'.$Dim[$i].'="'.${$_DBINDEX}.'" ';
}
$p = 'p'.$NumCursor;
$DimOtroSQL[] = $OtroSQL;
$DimTReg[] = qCount( $tabla.' A', "{$campos}", ${$p} );
$DimSQL[] = "select * from {$tabla} A where ({$campos})";
$TotalReg += $DimTReg[$NumCursor];
$NumCursor++;
break;
case 2:
$DimFormato[$NumCursor-1][] = explode( '|', $txt );
break;
default:
continue;
}
}
$nt = 0;
if( $TotalReg > 0 ){
$gsEdition = '';
eInit();
if( substr_count($_DBINDEX,',')>0 ) die('Error indice multiple');
eHTML("L:{$OriFichero}", 'l')
?>
<?= eLink('list','list_print') ?>
<style> TH, TD, SPAN { cursor:default; } </style>
<SCRIPT type="text/javascript">
function CheckScroll(){
if( top.eIsWindow(window) ) top.eSWResize( window );
document.body.scroll = ( ( document.body.scrollHeight > document.body.clientHeight || document.body.scrollWidth > document.body.clientWidth ) ? 'yes':'no' );
}
</SCRIPT>
</HEAD>
<BODY onhelp='top.gsHelpErr(window);return false;' onload='<?=$gsEdition?>CheckScroll();top.eLoading(0,window);'>
<center>
<?PHP
echo '<span id=TITULO>'.EnPlural( '', $Titulo, ($TotalReg>1) ).'</span><br><br>';
for( $n=0; $n<$NumCursor; $n++ ){
if( $DimTReg[$n] > 0 ){
if( $nt>0 ) echo '<br>';
$nt++;
echo '<span id=TITULO>'.EnPlural( '', $DimTitulo[$n], ($DimTReg[$n]>1) ).'</span><br>';
echo '<TABLE>';
for( $i=0; $i<count($DimFormato[$n]); $i++ ){
$DimFormato[$n][$i][2] = trim($DimFormato[$n][$i][2]);
if( $DimFormato[$n][$i][2]=='D' ){
echo '<COL class="Celda" style="white-space:nowrap;text-align:center;">';
}else if( $DimFormato[$n][$i][2][0]=='N' ){
echo '<COL class="Celda" style="white-space:nowrap;text-align:right;">';
}else{
echo '<COL class="Celda" style="white-space:nowrap;text-align:left;">';
}
}
echo '<tr>';
for( $i=0; $i<count($DimFormato[$n]); $i++ ) echo '<th>'.str_replace('·','<br>',$DimFormato[$n][$i][0]);
if( $DimOtroSQL[$n]!='' ){
$i = strpos($DimSQL[$n],' from ')+5;
$f = strpos($DimSQL[$n],' where ')+1;
$to = substr( $DimSQL[$n], $i, $f-$i );
list( $o, $d ) = explode('->',$DimOtroSQL[$n]);
list( $t, $d ) = explode('.',$d);
if( !isset($_POST) ){
$txt = '';
qQuery( str_replace( '*', $o, $DimSQL[$n] ) );
while( $row=qRow() ){
if( $txt!='' ) $txt .= ',';
$txt .= '"'.$row[0].'"';
}
$DimSQL[$n] = 'select * from '.$t.' A where '.$o.' in ( '.$txt.' )';
}else{
$DimSQL[$n] = 'select * from '.$t.' A where '.$o.' in ( select '.$d.' from '.$to.' where '.substr( $DimSQL[$n], strpos($DimSQL[$n],' where ')+7 ).' )';
}
}
$txt = ''; $stxt = '';
$nc = 65;
for( $i=0; $i<count($DimFormato[$n]); $i++ ){
$campo = trim($DimFormato[$n][$i][1]);
$tipo = trim($DimFormato[$n][$i][2]);
if( $txt!='' ) $txt .= ',';
if( $stxt!='' ) $stxt .= ',';
if( $tipo=='S' ){
$nc++;
$Alias = chr($nc);
if( substr_count( $campo, '{' ) == 0 ){
$txt .= $Alias.'.nm_'.substr($campo,3);
$stxt .= $Alias.'.nm_'.substr($campo,3);
$DimSQL[$n] = str_replace(
' where ',
' left join '.substr($campo,3). " {$Alias} on {$Alias}.".$campo.'=A.'.$campo." where ",
$DimSQL[$n] );
}else{
$campo = str_replace('{',',', substr($campo,0,-1) );
list( $oCampo, $sTabla, $sCdCampo, $sNmCampo, $Constante, $SgCampo ) = explode( ',', $campo );
if( $Constante!='' ){
if( $SgCampo !='' ) $SgCampo = ','.$Alias.'.'.$SgCampo;
if( eSqlType('mysql,mysqli') ){
$Constante = ','.$Constante.'';
$txt .= 'concat('.$Alias.'.'.$sNmCampo. $Constante . $SgCampo.')';
$stxt .= 'concat('.$Alias.'.'.$sNmCampo. $Constante . $SgCampo.')';
}else if( eSqlType('informix,oracle') ){
$Constante = ',||'.$Constante.'||';
$txt .= $Alias.'.'.$sNmCampo. $Constante . $SgCampo;
$stxt .= $Alias.'.'.$sNmCampo. $Constante . $SgCampo;
}
}else{
$txt .= $Alias.'.'.$sNmCampo;
$stxt .= $Alias.'.'.$sNmCampo;
}
$DimSQL[$n] = str_replace(
' where ',
' left join '.$sTabla. " {$Alias} on {$Alias}.".$sCdCampo.'=A.'.$oCampo." where ",
$DimSQL[$n] );
}
}else{
$txt .= 'A.'.$campo;
$stxt .= 'A.'.$campo;
}
}
qQuery( str_replace('*', $txt, $DimSQL[$n]). ' order by '.$stxt);
$l = 0;
while( $row = qRow() ){
echo '<tr>';
for( $i=0; $i<count($DimFormato[$n]); $i++ ){
if( $DimFormato[$n][$i][2]=='D' ){
if( isZero($row[$i]) ) $row[$i] = '';
else eDataFormat($row[$i], "F4");
}else if( $DimFormato[$n][$i][2][0]=='N' ){
$Deci = str_replace( 'N','',$DimFormato[$n][$i][2] );
$Deci = str_replace( ',','',$Deci )*1;
$row[$i] = eNumberFormat($row[$i],$Deci);
}
echo '<td>'.$row[$i];
}
$l++;
if( $l > 24 ){
qQuery( str_replace( '*', 'count(*)', $DimSQL[$n] ), $p );
$row2 = qRow($p);
echo '<tr><td class=PieLista align=center colspan='.count($DimFormato[$n]).'>-- '.$l.' de '.eNumberFormat($row2[0],0).' Registros --';
echo '</TABLE>';
break;
}
}
echo '</TABLE>';
}
}
echo '</center><br id=FIN></BODY></HTML>';
eEnd();
}
}
_CheckDelete( $_DBINDEX, $_CHECKDELETE );
?>
