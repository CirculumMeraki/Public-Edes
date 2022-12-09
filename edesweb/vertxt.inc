<?= eHTML('$vertxt.inc','','Visor de TXT')?>
</head>
<body>
<pre>
<?PHP
if( substr_count( $_GET['FILE'], '/_datos/usr/' ) == 0 ) exit;
echo utf8_decode( file_get_contents(eScript($_GET['FILE']) ) );
?>
</pre>
<script type="text/javascript">
top.eSWView( window );
top.eSWLoading( window, false );
</SCRIPT>
</body>
</html>
<?PHP
eEnd();
?>
