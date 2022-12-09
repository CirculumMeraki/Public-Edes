<?PHP
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() ) exit;
if( isset($_POST["_index_"]) && isset($_POST["_script_"]) ){
$_POST["_index_"] = str_replace("&#39;", "'", $_POST["_index_"]);
if( $_POST["_script_"]!="" ) include(eScript($_POST["_script_"]));
list($pkField, $pkValue) = explode("=", $_POST["_index_"]);
if( $pkValue=="''" || $pkValue=="'0'" ){
$campos = "";
$valores = "";
foreach($_POST as $k=>$v){
if( $k[0]!="_" ){
if( $campos!="" ){
$campos .= ", ";
$valores .= ", ";
}
$campos .= $k;
if( $v=="" ){
$valores .= "NULL";
}else{
$valores .= "'".eEntityEncode($v)."'";
}
}
}
$sql = "insert into {$_POST['_dbtable_']} ($campos) values ($valores)";
qQuery($sql);
$pk = qId();
die($pk."");
}else{
$set = "";
foreach($_POST as $k=>$v){
if( $k[0]!="_" ){
if( $set!="" ) $set .= ", ";
$set .= $k."=";
if( $v=="" ){
$set .= "NULL";
}else{
$set .= "'".eEntityEncode($v)."'";
}
}
}
$sql = "update {$_POST['_dbtable_']} set {$set} where {$_POST['_index_']}";
qQuery($sql);
die("ok");
}
}
list($Tabla, $Modificar, $Buscar, $MasModificar, $GrabarLog, $NomInclude, $NewDDBB) = explode('|', urldecode($_SERVER['QUERY_STRING']));
list($GrabarLog ) = explode('&_CALL', $GrabarLog);
list($NomInclude) = explode('&_CALL', $NomInclude);
list($NewDDBB	) = explode('&', $NewDDBB);
$NewDDBB = trim($NewDDBB);
if( $_DEBUG ){
eTrace( urldecode($_SERVER['QUERY_STRING']) );
eTrace( 'Tabla.......: '.$Tabla );
eTrace( 'Modificar...: '.$Modificar );
eTrace( 'Buscar......: '.$Buscar );
eTrace( 'MasModificar: '.$MasModificar );
eTrace( 'GrabarLog...: '.$GrabarLog );
eTrace( 'NomInclude..: '.$NomInclude );
eTrace( 'DDBB........: '.$NewDDBB );
}
if( $NewDDBB!='' ){
if( substr_count(str_replace('\\','/',$NewDDBB),'/')==0 ) $NewDDBB = '/_datos/config/'.$NewDDBB;
if( substr_count($NewDDBB,'.')==0 ) $NewDDBB .= '.ini';
if( $NewDDBB[0]=='~' ){
include( str_replace('~','../..',$NewDDBB) );
}else{
include( eScript($NewDDBB) );
}
if( substr_count(',mysql,mysqli,informix,oracle,pdo,',"{$_Sql}," ) == 0 ) die("ERROR: Controlador '{$_Sql}' no implantado");
include_once( $_DirEDes.$_Sql.'.inc' );
list( $_SqlPDOType ) = explode( ':', $_SqlPDOConnect );
}else{
eInclude($_Sql);
}
list(,$Valor) = explode("'",$Modificar);
$_DBTABLE = $Tabla;
$_DBSET = $Modificar;
if( trim($MasModificar)!='' ) $_DBSET .= ', '.$MasModificar;
$_DBWHERE = $Buscar;
if( $NomInclude!='' ) include( eScript($NomInclude) );
if( qCount( $_DBTABLE, $_DBWHERE ) == 1 ){
if( $MasModificar!='' ) $MasModificar = ','.$MasModificar;
if( $GrabarLog=='L' ){
$Dim = explode( ' and ', $_DBWHERE );
$nValor = '';
for( $n=0; $n<count($Dim); $n++ ){
list( $Log, $Valor ) = explode('=',$Dim[$n]);
$Valor = trim($Valor);
if( $Valor[0]=='"' || $Valor[0]=="'" ) $Valor = substr( $Valor, 1, -1 );
$nValor .= $Valor;
}
${$Log} = $nValor;
sql_Log( array($Log), 'M', $_DBTABLE, $_DBSET.$MasModificar );
}
if( eSqlType('oracle') ) $_DBSET = str_replace( chr(92)."'", "''", $_DBSET );
if( sql_Modifica( $_DBTABLE, $_DBSET.$MasModificar, $_DBWHERE ) == -1 ){
?>
<SCRIPT type="text/javascript">
top.eAlert( top.S.lng(212), top.eLng(29), 'A', 'E', window.frameElement.WOPENER.eEditListResetCell );
</SCRIPT>
<?PHP
eEnd();
}
}else{
?>
<SCRIPT type="text/javascript">
top.eAlert( top.S.lng(212), top.eLng(31), 'A', 'E', window.frameElement.WOPENER.eEditListResetCell );
</SCRIPT>
<?PHP
eEnd();
}
eHTML('$mod_td.gs');
$Color = '#001296';
?>
<SCRIPT type="text/javascript">
top.S("body").tip(top.eLng(27), 1);
</SCRIPT>
</HEAD><BODY>Ok</BODY></HTML>
<?PHP
eEnd();
?>
