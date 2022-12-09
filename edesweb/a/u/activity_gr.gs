<?PHP
if( !function_exists('qQuery') ) eInclude( $_Sql );
qQuery( "select user_name, user_surname from gs_user where cd_gs_user=".$_GET['cd_gs_user'] );
$r=qRow();
$NomUser = trim($r[0]).' '.trim($r[1]);
$Dim = array();
for( $n=0; $n<288; $n++ ) $Dim[$n] = 0;
$Dia = $_GET['dia'];
if($_GET['cd_gs_user']==0 || $_GET['cd_gs_user']==-1 ){
qQuery( "select cdi from {$_SESSION['ShareDictionary']}gs_activity where cdi>='".$Dia." 00:00:00' and cdi<='".$Dia." 23:59:59' order by cdi" );
}else{
qQuery( "select cdi from {$_SESSION['ShareDictionary']}gs_activity where cd_gs_user=".$_GET['cd_gs_user']." and cdi>='".$Dia." 00:00:00' and cdi<='".$Dia." 23:59:59' order by cdi" );
}
while( $r=qRow() ){
list($h,$m,$s) = explode(':',substr($r[0],-8));
$t = $h*3600 + $m*60 + $s;
$t = round($t/300);
$Dim[$t]++;
}
$Total = 0;
$MaxValor = 0;
for( $n=0; $n<288; $n++ ){
$Total += $Dim[$n];
$MaxValor = max( $MaxValor, $Dim[$n] );
}
$Alto = round(150/$MaxValor);
?>
<!DOCTYPE HTML>
<html>
<head>
<title> Gráfica actividad </title>
<meta name="Generator" content="gsEdit">
<meta name="Author" content="eDes">
<?=_FileNoCache('edes.js')?>
<style>
#NVECES TD {
font-size:12px;
text-align:right;
height: <?=$Alto?>;
}
#GRAFICA {
border:1px solid blue;
width:<?= 288*2 ?>;
}
#GRAFICA TH {
font-size:12px;
border-top-color: blue;
border-top-style: solid;
border-top-width: 1px;
}
#GRAFICA #Hora {
border-top-color: #009900;
border-top-style: solid;
border-top-width: 1px;
}
#GRAFICA TD {
font-size:1px;
vertical-align:bottom;
width:2px;
}
SPAN {
width:2px;
background: red;
}
#GRAFICA #NORMAL {
vertical-align:bottom;
width:2px;
}
#GRAFICA #MARCA {
border-right: #cccccc solid 1px;
vertical-align:bottom;
width:3px;
}
#GRAFICA #THMARCA {
text-align: center;
border-right: #cccccc solid 1px;
}
#GRAFICA #VERTICAL {
font-size:12px;
border-right: blue solid 1px;
}
</style>
</head>
<body style='text-align:center'>
GRAFICA DE ACTIVIDAD <?= $_GET['dia'] ?><br><?= $NomUser ?>
<table id=GRAFICA border=0 cellspacing=0 cellpadding=0>
<tr><td id=VERTICAL style='text-align:right;padding-left:9px'>
<table id=NVECES border=0 cellspacing=0 cellpadding=0 style="height:100%;width:100%;text-align:right">
<?PHP
for( $n=$MaxValor; $n>0; $n-- ) echo '<tr><td style="font-size:12px;text-align:center;vertical-align:top">'.(($n<10)?'0':'').$n;
echo '</tr></table></td>';
for( $n=1; $n<=288; $n++ ){
echo '<td id='.((($n%12)==0 && $n>0)?'MARCA>&nbsp;':'NORMAL>');
if( $Dim[$n]>0 ) echo '<span style="height:'.($Dim[$n]*$Alto).'"></span>';
}
echo '<tr><th id=VERTICAL>&nbsp;Nº/H&nbsp;';
for( $n=0; $n<24; $n++ ){
echo '<th id=THMARCA colspan=12 style="text-align:center;'.(($n>=9&&$n<=18)?'background-color:#ccffff':'').'">'.(($n<10)?'0':'').$n;
}
?>
</tr>
</table>
</body>
</html>
