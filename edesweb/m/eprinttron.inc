<?PHP
eTron(date('Y-m-d H:i:s: ').$_SERVER["QUERY_STRING"]);
$Dim = $funcGetArgs;
for($n=0; $n<count($Dim); $n++){
eTron(var_export($Dim[$n], true));
}
eTron("\n");
?>
