<?PHP
$ConRastro = false;
if( $ConRastro ){
eTron('nm_include -> dentro');
eTron('::-::'.$_NMFILE);
eTron('::-::'.$_MD5);
}
if( $_Sql=='' && file_exists('../_datos/config/file_manager.ini') ){
$Dim = file('../_datos/config/file_manager.ini');
for( $n=0; $n<count($Dim); $n++ ){
$Dim[$n] = trim($Dim[$n]);
if( substr($Dim[$n],0,4)=='[DB]' ){
list(,$NomFile) = explode(']',$Dim[$n]);
$tmp2 = trim($NomFile);
if( substr_count(str_replace('\\','/',$tmp2),'/')==0 ) $tmp2 = '/_datos/config/'.$tmp2;
if( substr_count($tmp2,'.')==0 ) $tmp2 .= '.ini';
$FileIniSql = $tmp2;
$SqlOri = ( substr($FileIniSql,-7)=='sql.ini' );
$FileIniSql = eScript($FileIniSql);
if( substr($FileIniSql,-7)!='sql.ini' && $SqlOri ) $FileIniSql .= 'sql.ini';
if( substr_count($FileIniSql,'/_datos/config/sql.ini')>0 ){
eval(qSetup());
}else{
include_once( $FileIniSql );
}
list( $_Sql, $_SqlPDOType ) = explode( ':', str_replace(' ','',$_Sql) );
if( $_Sql=='pdo' && $_SqlPDOConnect!='' ) $_SqlPDOConnect = eval('return ("'.$_SqlPDOConnect.'");');
include_once( $Dir_.$_Sql.'.inc' );
break;
}
}
}
if( $_Sql=='' ){
eval(qSetup());
include_once( $Dir_.$_Sql.'.inc' );
}
qQuery( "select * from gs_img where md5='{$_MD5}'" );
$r=qArray();
$FileOri = $_NMFILE;
$FileDes = eScript('//img/'.$r['cd_gs_img'].'.'.$r['extension']);
if( $ConRastro ) eTron( 'unlink: '.$FileDes );
if( file_exists( $FileDes ) ) @unlink( $FileDes );
if( $ConRastro ) eTron( 'copy: '.$FileOri .' -> '.$FileDes );
copy( $FileOri, $FileDes );
if( $ConRastro ) eTron( 'unlink: '.$FileOri );
if( file_exists( $FileOri ) ) @unlink( $FileOri );
if( $ConRastro ){
eTron( "argv" );foreach( $argv as $k=>$v ) eTron( '   '.$k.': '.$v );
eTron( "_SERVER" );foreach( $_SERVER as $k=>$v ) eTron( '   '.$k.': '.$v );
eTron( "_ENV" );foreach( $_ENV as $k=>$v ) eTron( '   '.$k.': '.$v );
eTron( "_GLOBALS" );foreach( $_GLOBALS as $k=>$v ) eTron( '   '.$k.': '.$v );
eTron( "_GET" );foreach( $_GET as $k=>$v ) eTron( '   '.$k.': '.$v );
eTron( "_POST" );foreach( $_POST as $k=>$v ) eTron( '   '.$k.': '.$v );
eTron( "_FILE" );foreach( $_FILE as $k=>$v ) eTron( '   '.$k.': '.$v );
eTron( "_FILES" );foreach( $_FILES as $k=>$v ) eTron( '   '.$k.': '.$v );
eTron( "_REQUEST" );foreach( $_REQUEST as $k=>$v ) eTron( '   '.$k.': '.$v );
eTron( "_SESSION (sin session_start)" );foreach( $_SESSION as $k=>$v ) eTron( '   '.$k.': '.$v );
eTron( "_SESSION (con session_start)" );session_start();foreach( $_SESSION as $k=>$v ) eTron( '   '.$k.': '.$v );
eTron( "GetCWD(): ".GetCWD() );
}
?>
