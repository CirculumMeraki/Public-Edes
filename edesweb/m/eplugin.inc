<?PHP
global $Dir_;
$na = func_num_args();
if($na==0) return false;
$plugin_name = strtolower(trim(func_get_arg(0))).'.inc';
if(!file_exists($Dir_.$plugin_name)) return false;
$al = $funcGetArgs;
if( count($al)>1 ){
$s='<script type="text/javascript">';
for($x=1;$x<count($al);$x++){
$al[$x] = trim($al[$x]);
$s.="var pluginArg_{$x}='{$al[$x]}';";
}
$s.='</script>';
echo $s;
}
include($Dir_.$plugin_name);
return true;
?>
