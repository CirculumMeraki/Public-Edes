<!DOCTYPE HTML><HTML>
<HEAD>
<TITLE> CONSULTA TABLA </TITLE>
<style type="text/css">
BODY {
BACKGROUND: #f0efaa;
margin: 0,0,0,0;
}
TABLE {
font-family: "Arial";
font-size: 11px;
}
</style>
</HEAD>
<?PHP
$arbol = '../../';
session_start();
if( !isset($_SESSION['_User']) ){
include('index.htm'); exit;
}
include_once( $arbol.$_Sql.'.inc' );
include_once( $arbol.'message.inc');
global $_HndDB;
$cad_sql = 'select A.tabname,A.ncols,A.nindexes,B.colname,B.colno,B.coltype,B.collength from systables as A, outer syscolumns as B where A.tabtype = "T" and A.tabid = B.tabid and A.tabid = '.$bd_tabid;
$_Result = ifx_query( $cad_sql, $_HndDB, IFX_SCROLL );
$Dim = ifx_fetch_row( $_Result, 'NEXT' );
while (is_Array($Dim)) {
$tab[0] = $bd_tabid;
$cad_sql2 = 'select B.tabname from syssyntable as A,systables as B where A.btabid = "'.$bd_tabid.'" and A.tabid = B.tabid';
$_Result2 = ifx_query( $cad_sql2, $_HndDB, IFX_SCROLL );
$Dim2 = ifx_fetch_row( $_Result2, 'NEXT' );
$syn = 0;
while (is_Array($Dim2)) {
$syn = 1;
$tab[1] = trim($Dim2['tabname']);
$Dim2 = ifx_fetch_row( $_Result2, 'NEXT' );
$nomtab = trim($Dim['tabname'])." SINONIMO: ".$tab[1];
}
if ($syn == 0){
$tab[1] = trim($Dim['tabname']);
$nomtab = $tab[1];
}
$tab[2] = trim($Dim['ncols']);
$tab[3] = trim($Dim['nindexes']);
for ($j=0;$j<$tab[2];$j++){
$cam[$j][0] = trim($Dim['colname']);
$cam[$j][1] = trim($Dim['colno']);
$cam[$j][2] = trim($Dim['coltype']);
$cam[$j][3] = trim($Dim['collength']);
$Dim = ifx_fetch_row( $_Result, 'NEXT' );
}
$Dim = ifx_fetch_row( $_Result, 'NEXT' );
}
$npart = 17;
$cad_sql = 'select part1,part2,part3,part4,part5,part6,part7,part8,part9,part10,part11,part12,part13,part14,part15,part16,idxtype from sysindexes where tabid = '.$bd_tabid;
$_Result = ifx_query( $cad_sql, $_HndDB, IFX_SCROLL );
$Dim = ifx_fetch_row( $_Result, 'NEXT' );
$i = 0;
while (is_Array($Dim)) {
$num = 0;
for ($l=1;$l<$npart;$l++){
if (trim($Dim['part'.$l])){
$ind[$i][$num] = trim($Dim['part'.$l]);
$num++;
}
}
if (trim($Dim['idxtype']) == 'U'){
$ind[$i][16] = 'S';
} else {
$ind[$i][16] = 'N';
}
$i++;
$Dim = ifx_fetch_row( $_Result, 'NEXT' );
}
$cad_sql = 'select trigname,owner,event,old,new,mode from systriggers where tabid = '.$bd_tabid;
$_Result = ifx_query( $cad_sql, $_HndDB, IFX_SCROLL );
$Dim = ifx_fetch_row( $_Result, 'NEXT' );
$i = 0;
while (is_Array($Dim)) {
$trig[$i][0] = trim($Dim['trigname']);
$trig[$i][1] = trim($Dim['owner']);
$trig[$i][2] = trim($Dim['event']);
$trig[$i][3] = trim($Dim['old']);
$trig[$i][4] = trim($Dim['new']);
$trig[$i][5] = trim($Dim['mode']);
$i++;
$Dim = ifx_fetch_row( $_Result, 'NEXT' );
}
$tr = $i;
$tipos = array ('CHAR','SMALLINT','INTEGER','FLOAT','SMALLFLOAT','DECIMAL','SERIAL','DATE','MONEY','','DATETIME','BYTE','TEXT','VARCHAR','INTERVAL','NCHAR','NVARCHAR');
?>
<BODY onload="javascript:top.eLoading(false,window);">
<TABLE border="2" align="center">
<TR>
<TH align="center">TABLA: <?= $nomtab; ?></TH>
</TR>
<TR>
<TD align="center">
<TABLE border="1">
<?PHP
for( $i=0; $i<4; $i++ ){
echo "<COL align=center>";
}
?>
<TR>
<TH align="center" colspan="4">CAMPOS (<?= $tab[2]; ?>)</TH>
</TR>
<TR>
<TH>Nº</TH>
<TH>CAMPO</TH>
<TH>TIPO</TH>
<TH>LONGITUD</TH>
</TR>
<?PHP
for ($i=0;$i<count($cam);$i++){
echo "<TR><TD>".$cam[$i][1]."</TD>";
echo "<TD>".$cam[$i][0]."</TD>";
$tip = $cam[$i][2];
if ($tip > 255)
$tip = $tip - 256;
if ($tipos[$tip] <> ''){
$tip = $tipos[$tip];
}
echo "<TD>".$tip."</TD>";
echo "<TD>".$cam[$i][3]."</TD></TR>";
}
?>
</TABLE>
<TABLE border="1">
<?PHP
for ($i=0;$i<17;$i++){
echo "<COL align=center>";
}
?>
<TR>
<TH align="center" colspan="17">INDICES (<?= $tab[3]; ?>)</TH>
</TR>
<TR>
<?PHP
for ($i=1;$i<=16;$i++){
echo "<TH>".$i."</TH>";
}
echo "<TH>idx</TH>";
?>
</TR>
<?PHP
for ($i=0;$i<count($ind);$i++){
echo "<TR>";
for ($l=0;$l<$npart-1;$l++){
echo "<TD>".$cam[$ind[$i][$l]][0]."</TD>";
}
echo "<TD>".$ind[$i][16]."</TD>";
echo "</TR>";
}
?>
</TABLE>
<TABLE border="1">
<?PHP
for ($i=0;$i<6;$i++){
echo "<COL align=center>";
}
?>
<TR>
<TH align="center" colspan="6">TRIGGERS (<?= $tr; ?>)</TH>
</TR>
<TR>
<TH>NOMBRE</TH>
<TH>HIZO</TH>
<TH>EVENTO</TH>
<TH>VIEJO</TH>
<TH>NUEVO</TH>
<TH>MODO</TH>
</TR>
<?PHP
for ($i=0;$i<count($trig);$i++){
echo "<TR>";
for ($j=0;$j<6;$j++){
echo "<TD>".$trig[$i][$j]."</TD>";
}
echo "</TR>";
}
?>
</TABLE>
</TD>
</TR>
</TABLE>
</BODY>
</HTML>
