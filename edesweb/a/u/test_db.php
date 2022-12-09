<?PHP
$_Sql				= '';
$_SqlHostName		= '';
$_SqlUsuario		= '';
$_SqlPassword		= '';
$_SqlDiccionario	= '';
$Pass = $_SqlPassword;
if( strlen($Pass)>8 && substr($Pass,0,8)==dechex(crc32(substr($Pass,8))) ) $Pass = gzuncompress(base64_decode(substr($Pass,8)));
if( eSqlType('mysql') ){
$_HndDB = mysql_connect( $_SqlHostName, $_SqlUsuario, $Pass );
mysql_select_db( $_SqlDiccionario );
mysql_close( $_HndDB );
}else if( eSqlType('mysqli') ){
$_HndDB = mysqli_connect( $_SqlHostName, $_SqlUsuario, $Pass, $_SqlDiccionario  );
mysqli_select_db( $_SqlDiccionario );
mysqli_close( $_HndDB );
}else if( eSqlType('informix') ){
$Dir = getenv('INFORMIXDIR');
putenv( "PATH=".getenv("PATH").":{$Dir}/bin" );
putenv( "LD_LIBRARY_PATH={$Dir}/lib:{$Dir}/lib/esql" );
putenv( "INFORMIXSERVER={$_SqlHostName}" );
$aux = $_SqlDiccionario."@".getenv( "INFORMIXSERVER" );
$_HndDB = ifx_connect( $aux, $_SqlUsuario, $Pass );
ifx_close( $_HndDB );
}
?>
