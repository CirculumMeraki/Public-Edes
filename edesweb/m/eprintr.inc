<?PHP
$debug = debug_backtrace();
if( $debug[1]['function']!="eBacktrace" ) eInit();
echo '<pre>';
$Dim = $funcGetArgs;
for($n=0; $n<count($Dim); $n++){
print_r($Dim[$n]);
echo "\n";
}
echo '</pre>';
?>
<script type="text/javascript">
try{top.eLoading(false,window);}catch(e){}
document.body.style.visibility="visible";
try{window.frameElement.WOPENER.document.body.style.visibility="visible";}catch(e){}
</script>
<?PHP
eEnd();
?>
