<?PHP
SIN USO
eInit();
echo '<pre>'; debug_print_backtrace(); echo '</pre><hr><pre>'; print_r(debug_backtrace()); echo '</pre>';
call_user_func_array("ePrintR", $funcGetArgs);
?>
