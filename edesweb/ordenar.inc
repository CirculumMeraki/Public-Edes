<?PHP
$NomTabla = $_DBTABLE;
global $indice, $vector, $vectorniveles;
function desplazamiento( &$vector, $inicio, $fin, $init ){
$i = $fin-$inicio;
for($j=$fin; $j>=$inicio; $j--){
$vector[$init+$i] = $vector[$j];
$i--;
}
}
function ordenar(){
global $vector, $vectorniveles, $indice, $NomTabla;
$n = count($vector);
if( $n==0 ){
$idpadre=0;
$nivelpadre=-1;
}else{
$idpadre=$vector[$indice];
$nivelpadre=$vectorniveles[$indice];
}
$q="select cd_{$NomTabla} from {$NomTabla} where padre={$idpadre} order by nm_{$NomTabla}";
$result=mysql_query( $q );
$desplz=mysql_num_rows($result);
if( $desplz>0 ){
if( !isset($indice) ){
$i=0;
}else{
desplazamiento($vector, $indice+1, $n-1, $desplz+$indice+1);
desplazamiento($vectorniveles, $indice+1, $n-1, $desplz+$indice+1);
$i=$indice+1;
}
while( $row=mysql_fetch_array($result) ){
$vector[$i]=$row[0];
$vectorniveles[$i]=$nivelpadre+1;
$i++;
}
}
if( !isset($indice) ){
$indice=0;
ordenar();
}else{
$indice++;
$n=count($vector);
if( $indice<$n ){
ordenar();
}else{
for($i=0; $i<$n; $i++){
$q="update {$NomTabla} set orden={$i}, nivel={$vectorniveles[$i]} where cd_{$NomTabla}={$vector[$i]}";
$result=mysql_query( $q );
}
}
}
}
ordenar();
?>
