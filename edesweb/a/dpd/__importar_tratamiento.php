<?PHP
$titulo = array(
"Descripción",
"Finalidad del Tratamiento",
"Plazo de Conservación",
"Licitudes del Tratamiento",
"Categorías de Datos Personales",
"Orígenes de Datos Personales",
"Comunicaciones de Datos",
"Transferencias Internacionales de Datos Salientes",
"Transferencias Internacionales de Datos Entrantes",
"Propietario"
);
$titulo2 = array(
"",
"",
"",
"Detalles sobre la Licitud del Tratamiento",
"",
"",
"",
"",
"",
""
);
$t = count($titulo);
$nmCampo = explode(",", "indice,epigrafe,descripcion,finalidad,plazo,licitudes,categorias,origenes,comunicaciones,trans_salientes,trans_entrantes,propietario");
$ver = !true;
$grabar = true;
die("PARADO");
if( $grabar ) qQuery("delete from dpd_tratamiento");
$epigrafes = 0;
$dim = file("../d/_check/prueba/rat.txt");
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $titulo[0]==$txt ){
$i=$n;
while(trim($dim[--$i])==""){}
$txt = trim($dim[$i]);
eExplodeOne($txt, " ", $xIndice, $epigrafe);
$xIndice = trim($xIndice);
$epigrafe = trim($epigrafe);
if( $ver ) eTrace($xIndice.' '.$epigrafe);
$xDim = array('','','','','','','','','','');
$epigrafes++;
$sindice = -1;
for($p=$n; $p<count($dim); $p++){
$txt = trim($dim[$p]);
if( $txt=="" ) continue;
$indice = -1;
$ini = !true;
$esTitulo = false;
for($j=0; $j<$t; $j++){
if( $titulo[$j]==$txt || $titulo2[$j]==$txt ){
$indice = $j;
$sindice = $j;
$esTitulo = true;
$ini = true;
break;
}
}
if( $esTitulo ){
if( $ver ) echo "<b>{$sindice}-{$txt}</b><br>";
if( $indice==9 ){
if( $ver ) echo '<br><br>';
break;
}
}else{
$xDim[$sindice] .= $txt."\n";
if( $ver ) echo "{$sindice}-{$txt}<br>";
}
}
$n = $p;
for($p=0; $p<count($xDim); $p++) $xDim[$p] = trim($xDim[$p]);
$epigrafe = eQuote($epigrafe);
$sql = "insert into dpd_tratamiento value ('{$epigrafes}', '{$xIndice}', '{$epigrafe}'";
for($p=0; $p<count($xDim); $p++){
$xDim[$p] = str_replace("'", chr(92).chr(92)."'", $xDim[$p]);
$xDim[$p] = stripslashes($xDim[$p]);
$sql .= ", '".$xDim[$p]."'";
}
$sql .= ")";
if( $grabar ) qQuery($sql);
}
}
eTrace("Total: ".$epigrafes);
?>
<script type="text/javascript">
</script>
