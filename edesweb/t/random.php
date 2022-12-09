<?PHP
$tmp = null;
$dim = file(eScript($_POST["SOURCE"]));
for($n=0; $n<count($dim); $n++){
if( preg_match('/^\[RANDOM\]/i', $dim[$n]) ){
$txt = $dim[$n];
eExplodeOne($txt, "]", $no, $txt);
$tmp = explode(",", $txt);
for($i=0; $i<count($tmp); $i++){
$tmp[$i] = trim($tmp[$i]);
}
if( $tmp[0]==$_POST["FIELDNAME"] ){
$where = "";
if( $_POST["FIELDWHERE"]!="undefined" && $_POST["FIELDWHERE"]!="" ){
$where = trim($_POST["FIELDWHERE"]);
$tmp2 = preg_split('/(<>|<=|>=|!=|<|>|===|==|=)/', $tmp[3], null, PREG_SPLIT_DELIM_CAPTURE);
if( !is_numeric($where) ) $where = "'{$where}'";
$where = " and ".$tmp2[0].$tmp2[1].$where;
}else if( $tmp[3]!="" ){
if( substr_count($tmp[3], '$')>0 ){
$where = trim(_InVar($tmp[3]));
}else{
$where = $tmp[3];
}
if( $where!="" ) $where = " and ".str_replace('"', "'", $where);
}
qQuery("select {$tmp[1]} from {$tmp[2]} where {$tmp[1]} is not null and {$tmp[1]}>'' {$where} order by rand() limit 1");
die( qRow()[0] );
}
}
}
die("ERROR");
?>
