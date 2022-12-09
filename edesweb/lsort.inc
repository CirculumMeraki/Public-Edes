<?PHP
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
if( isset($_GET['_DB']) && $_GET['_DB']<>"NO" ){
$_OtroDiccionario = true;
$tmp2 = str_replace(' ','',$_GET['_DB']);
if( substr_count(str_replace('\\','/',$tmp2),'/')==0 ) $tmp2 = '/_datos/config/'.$tmp2;
if( substr_count($tmp2,'.')==0 ) $tmp2 .= '.ini';
include_once( eScript($tmp2) );
list( $_Sql, $_SqlPDOType ) = explode( ':', str_replace(' ','',$_Sql) );
if( $_Sql=='pdo' && $_SqlPDOConnect!='' ) $_SqlPDOConnect = eval('return ("'.$_SqlPDOConnect.'");');
}
include_once( $Dir_.$_Sql.'.inc' );
$Tabla		= $_GET['T'];
$COrdenacion= $_GET['S'];
$DimIndice	= explode(',',$_GET['I']);
$tmp = explode('|',$_GET['R']);
$Dato = explode(',',$tmp[0]);
$Posicion = count($Dato)-1;
$DimValor = array();
for( $c=0; $c<count($tmp)-1; $c++ ){
$Dato = explode(',',$tmp[$c]);
$DimValor[] = $Dato[$Posicion];
}
sort( $DimValor );
if( $DimValor[0]=='' ) $DimValor[0] = 1;
for( $c=1; $c<count($tmp)-1; $c++ ){
if( $DimValor[$c] <= $DimValor[$c-1] ) $DimValor[$c] = $DimValor[$c-1]+1;
}
for( $c=0; $c<count($tmp)-1; $c++ ){
$Dato = explode(',',$tmp[$c]);
$where = '';
for($i=0; $i<$Posicion; $i++){
if( $i > 0 ) $where .= ' and ';
$where .= $DimIndice[$i]."='".$Dato[$i]."'";
}
$Dato[$Posicion] = $DimValor[$c];
sql_Modifica( $Tabla, $COrdenacion.'='.$Dato[$Posicion], $where );
}
eHTML('$lsort.inc');
?>
</HEAD><BODY>
<SCRIPT type="text/javascript">
window.frameElement.WOPENER._SortListSave = false;
if( window.frameElement.WOPENER.name!="_ISUBLIST" ) top.S.info(top, top.eLng(27), 2);
</SCRIPT>
</BODY></HTML>
<?PHP
eEnd();
?>
