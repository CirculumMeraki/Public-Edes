<?PHP
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
$Rastrear = !false;
$_DEBUG = 1;
if( $Rastrear ) eTrace( urldecode($_SERVER['QUERY_STRING']) );
list( $Tabla, $Modificar, $Buscar, $MasModificar, $GrabarLog, $NomInclude, $NewDDBB ) = explode( '|', urldecode($_SERVER['QUERY_STRING']) );
list( $GrabarLog  ) = explode( '&_CALL', $GrabarLog );
list( $NomInclude ) = explode( '&_CALL', $NomInclude );
list( $NewDDBB	  ) = explode( '&', $NewDDBB );
$NewDDBB = trim($NewDDBB);
list(,$Idioma) = explode("cd_gs_language='",$Buscar);
list($Idioma) = explode("'",$Idioma);
$IdiomaDefault = eFileGetVar('/_datos/config/desktop.ini->$_Language');
if( $IdiomaDefault=='' ) $IdiomaDefault = 'es';
$Modificar = str_replace(chr(92)."'","'",$Modificar);
$NewValor = eUnEscape( substr($Modificar,9,-1) );
$NewMD5 = md5( $NewValor );
$Modificar = "caption='".$NewValor."'";
list(,$OldMD5) = explode(" and md5='",$Buscar);
$OldMD5 = substr($OldMD5,0,-1);
list(,$CaptionTip) = explode("'",$MasModificar);
$Buscar .= ' and '.$MasModificar;
if( qCount( $Tabla, $Buscar )==0 ){
list( $lng ) = explode(' and ',$Buscar);
list( ,$lng ) = explode("'",$lng);
qQuery( "select * from {$Tabla} where ".str_replace("'{$lng}'","'es'",$Buscar), $p );
while( $r=qArray($p) ){
$txt = $NewValor;
$Sql = "insert into {$_SESSION['ShareDictionary']}gs_op_lng values ( ".$r['cd_gs_op'].", '{$lng}', '".$r['caption_tip']."', '".$txt."', '{$OldMD5}', '' )";
eTrace( $Sql );
qQuery( $Sql );
}
}else{
$xPK = '';
if( $IdiomaDefault == $Idioma ){
$Sql = "select * from {$Tabla} where {$Buscar}";
qQuery( $Sql );
while( $r=qArray() ){
if( $xPK!='' ) $xPK .= ',';
$xPK .= $r['cd_gs_op'];
}
}
$Sql = "update {$Tabla} set {$Modificar}, md5='{$OldMD5}', tf_changed='' where {$Buscar}";
eTrace( $Sql );
qQuery( $Sql );
if( $IdiomaDefault == $Idioma ){
$Sql = "update {$Tabla} set md5='{$NewMD5}', tf_changed='S' where md5='{$OldMD5}' and cd_gs_language<>'{$IdiomaDefault}'";
eTrace( $Sql );
qQuery( $Sql );
$Sql = "update {$Tabla} set md5='{$NewMD5}', tf_changed='' where md5='{$OldMD5}' and cd_gs_language='{$IdiomaDefault}'";
eTrace( $Sql );
qQuery( $Sql );
$OldMD5 = $NewMD5;
}
if( $xPK!='' ){
eTrace('Idioma Default:');
if( $CaptionTip=='C' ){
$Sql = "update {$_SESSION['ShareDictionary']}gs_op set caption=(select caption from {$_SESSION['ShareDictionary']}gs_op_lng where cd_gs_op={$_SESSION['ShareDictionary']}gs_op.cd_gs_op and cd_gs_language='{$Idioma}' and {$MasModificar} ) where cd_gs_op in ( {$xPK} )";
}else{
$Sql = "update {$_SESSION['ShareDictionary']}gs_op set tip=(select caption from {$_SESSION['ShareDictionary']}gs_op_lng where cd_gs_op={$_SESSION['ShareDictionary']}gs_op.cd_gs_op and cd_gs_language='{$Idioma}' and {$MasModificar} ) where cd_gs_op in ( {$xPK} )";
}
eTrace( $Sql );
qQuery( $Sql);
}
}
if( $Rastrear ){
eTrace( 'Tabla.......: '.$Tabla );
eTrace( 'Modificar...: '.$Modificar );
eTrace( 'Buscar......: '.$Buscar );
eTrace( 'MasModificar: '.$MasModificar );
eTrace( 'CaptionTip..: '.$CaptionTip );
eTrace( 'NomInclude..: '.$NomInclude );
eTrace( 'GrabarLog...: '.$GrabarLog );
eTrace( 'NomInclude..: '.$NomInclude );
eTrace( 'DDBB........: '.$NewDDBB );
eTrace( 'MD5 Old.....: '.$OldMD5 );
eTrace( 'MD5 New.....: '.$NewMD5 );
}
eHTML();
?>
<SCRIPT type="text/javascript">
S("body").tip(top.eLng(27),2);
var Obj = window.frameElement.WOPENER;
Obj._RowEdit.cells[1].textContent = '<?=$OldMD5?>';
Obj._ActualizarDB = true;
</SCRIPT>
</HEAD><BODY>Ok</BODY></HTML>
<?PHP
eEnd();
?>
