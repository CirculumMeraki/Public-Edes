<?PHP
error_log(date('Y-m-d H:i:s:').substr(explode(" ",microtime())[0],2,8).': '.$_SERVER["QUERY_STRING"]."\n", 3, '../_tmp/__trace.'.$_SESSION["_User"]);
?>
