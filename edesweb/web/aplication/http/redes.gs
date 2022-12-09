<?PHP
unset( $PHPSESSID );
$RegistrarVar = array();
foreach( $_GET as $k => $v ){
if( $k[0]=='_' && $k!=strtoupper($k) ){		 //&& substr($k,-1)!='_' )
$RegistrarVar[$k] = 1;
}
}
list( $rObjeto, $rScript ) = explode(':', $_SERVER['QUERY_STRING'] );
list( $rScript ) = explode('&',$rScript);
if( substr_count($rScript,'.') == 0 ) $rScript .= ( $rObjeto[0]=='G' ) ? '.gdf':'.edf';
if( strlen($rObjeto) > 1 ){
$rModo = substr($rObjeto,1);
}else{
$rModo = $rObjeto;
}
$rFile = str_replace('.','-',$_SERVER["REMOTE_ADDR"]);
$rFile = str_replace('/','_',$rFile);
$rDim = file("../_datos/config/{$rFile}.remote");
if( count($rDim)<2 ){
error_log( date('Y-m-d H:i:s').' [Remoto NO autorizado] '.$_SERVER["REMOTE_ADDR"]."\n", 3, '../_tmp/err/_remote.err' );
die('<HTML><BODY style="color:red;font-weight:bold;">Servicio NO AUTORIZADO<script>top.eLoading(false,window);</script></BODY></HTML>');
}
$rOk = false;
$rVer = false;
if( $rVer ) echo '<HTML><BODY><u>'.$rObjeto.':'.$rScript.'</u><br>';
if( $rVer ) echo 'QUERY_STRING: '.$_SERVER['QUERY_STRING'].'<br>';
$rNodoDefinido = false;
for( $n=0; $n<count($rDim ); $n++ ){
if( strpos($rDim[$n],'//') !== false ){
$p = strpos( $rDim[$n], '//' );
$rDim[$n] = chop(substr( $rDim[$n], 0, $p ));
}
$rTmp = explode('|',$rDim[$n]);
for( $c=0; $c<count($rTmp); $c++ ) $rTmp[$c] = trim($rTmp[$c]);
if( $rVer ) echo $rScript.' - '.$rDim[$n].'<br>';
if( $rTmp[0][0]=='$' ){
$rTmp[0] = substr($rTmp[0],1);
if( substr($rTmp[0],-1)==';' ) $rTmp[0] = substr($rTmp[0],0,-1);
$Cond = explode('=',$rTmp[0]);
$Cond[0] = trim($Cond[0]);
$Cond[1] = trim($Cond[1]);
$$Cond[0] = $Cond[1];
$RegistrarVar[$Cond[0]] = 1;
$_SESSION[$Cond[0]] = $$Cond[0];
if( $Cond[0]=='_Node' ) $rNodoDefinido = true;
continue;
}
if( substr_count( $rTmp[0], '{$_User}' ) > 0 ) $rTmp[0] = str_replace( '{$_User}', $_User, $rTmp[0] );
if( substr_count( $rTmp[0], '{$_Node}' ) > 0 ) $rTmp[0] = str_replace( '{$_Node}', $_Node, $rTmp[0] );
if( substr_count( $rTmp[0], '{$_Tree}' ) > 0 ) $rTmp[0] = str_replace( '{$_Tree}', $_Tree, $rTmp[0] );
$OkFile = false;
if( substr_count( $rTmp[0], '*' ) > 0 ){
$NomPatron = '/'.$rTmp[0].'$/';							"/abc*.pdf$/i";
$NomPatron = str_replace('.','\.',$NomPatron);
$NomPatron = str_replace('*','.*',$NomPatron);
$OkFile = preg_match( $NomPatron, $rScript );
}
if( $rScript == $rTmp[0] || $OkFile ){
if( $rVer ) echo 'SI Script<br>';
if( $rTmp[1]=='*' || substr_count( ",{$rTmp[1]},", ",{$rModo}," ) == 1 ){
if( $rVer ) echo 'SI Modo<br>';
$rOk = true;
if( $rTmp[2]!='' && substr_count( ",{$rTmp[2]},", ",{$rUsuario}," ) == 0 ) $rOk = false;
if( $rTmp[3]!='' && substr_count( ",{$rTmp[3]},", ",{$rNodo}," ) == 0 ) $rOk = false;
if( $rTmp[4]!='' && $rOk && substr_count( 'AMB',$rModo)==0 ){
for( $c=4; $c<count($rTmp); $c++ ){
$Cond = explode('=',$rTmp[$c]);
if( $Cond[0][0]=='_' ){
$$Cond[0] = $Cond[1];
$RegistrarVar[$Cond[0]] = 1;
$_SESSION[$Cond[0]] = $Cond[1];
}else	if( $_SERVER['REQUEST_METHOD']=='GET' ){
$_GET[$Cond[0]] = $Cond[1];
$_SERVER['QUERY_STRING'] .= '&'.$rTmp[$c];
}else{
$_POST[$Cond[0]] = $Cond[1];
$_POST[$Cond[0]] = $Cond[1];
}
}
}
}
}
}
if( !$rOk ){
error_log( date('Y-m-d H:i:s').' [Mode/Script NO autorizado] '.$rScript.':'.$rModo."\n", 3, '../_tmp/err/_remote.err' );
die('<HTML><BODY style="color:red;font-weight:bold;">Script NO AUTORIZADO '.$rScript.':'.$rModo.'<script>top.eLoading(false,window);</script></BODY></HTML>');
}else{
if( $rVer ) echo '<HTML><BODY>Script AUTORIZADO<br>'.$_SERVER['QUERY_STRING'].'</BODY></HTML>';
}
if( !$rNodoDefinido ){
error_log( date('Y-m-d H:i:s').' [Mode NO definido] '.$_SERVER["REMOTE_ADDR"]."\n", 3, '../_tmp/err/_remote.err' );
die('<HTML><BODY style="color:red;font-weight:bold;">Falta la definición del NODO<script>top.eLoading(false,window);</script></BODY></HTML>');
}
if( $rVer ) echo '</BODY></HTML>';
if( $rVer ) exit;
unset($rObjeto);unset($rScript);unset($rModo);unset($rUsuario);unset($rNodo);
unset($rFile);unset($rOk);unset($rDim);unset($rTmp);unset($rVer);unset($n);unset($c);unset($Cond);unset($PHPSESSID);
session_start();
$_Estadistica = true;
$_SERVER['HTTP_ACCEPT_LANGUAGE'] = 'es';
if( !isset($_SESSION['_User']) ){
$_pxH_ = 800;
$_pxW_ = 600;
$_sesion_ = session_id();
$_CDI_ = date('U') + 86400;
$_HndWeb = 0;
$_AvisoStatus_ = '';
$_novedades_= '';
$_WorkingHours_ = '';
$_CacheSrv = false;
$_CachePc = '';
$_notools_= '';
$_D_ = '';
$_SESSION['_HndWeb'] = $_HndWeb;
$_SESSION['_Node'] = $_Node;
$_SESSION['_User'] = $_User;
$_SESSION['_pxH_'] = $_pxH_;
$_SESSION['_pxW_'] = $_pxW_;
$_SESSION['_AvisoStatus_'] = $_AvisoStatus_;
$_SESSION['_novedades_'] = $_novedades_;
$_SESSION['_CDI_'] = $_CDI_;
$_SESSION['_WorkingHours_'] = $_WorkingHours_;
$_SESSION['_CacheSrv'] = $_CacheSrv;
$_SESSION['_CachePc'] = $_CachePc;
$_SESSION['_sesion_'] = $_sesion_;
$_SESSION['_notools_'] = $_notools_;
$_SESSION['_D_'] = $_D_;
$_SESSION['_Tree'] = $_Tree;
foreach( $RegistrarVar as $k=>$v ) session_register( $k );
}
unset($k);unset($v);unset($RegistrarVar);
include( 'edes.php' );
?>
