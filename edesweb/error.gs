<?PHP //[_PROTECCION_]
if( !isset($_SESSION['_User']) ) exit;
$cdi = date('Y-m-d H:i:s');
if( isset($_POST["pk"]) && isset($_POST["post"]) ){
foreach($_POST as $k=>$v){
$v = eEntityDecode(utf8_decode($v), false);
$_POST[$k] = $v;
}
$dim = explode("\n",$_POST["html"]);
$txtError = $dim[0]."\n";
for($n=1; $n<count($dim); $n++) $txtError .= "\t\t ".$dim[$n]."\n";
$_POST["post"] = str_replace(
array("\t\t"),
array("\t\t "),
trim($_POST["post"])
);
$_POST["error"] = str_replace(
array(chr(10)),
array(chr(13).chr(10)),
trim($_POST["error"])
);
$_POST["trace"] = str_replace(
array(chr(10)),
array(chr(13).chr(10)),
trim($_POST["trace"])
);
$linea = $_POST["line"];
$columna = $_POST["col"];
$LogTxt = $cdi."\r\n".
"\tUSER.: ".$_SESSION["_User"]."\r\n".
"\tURL..: ".$_POST["url"]." ({$linea},{$columna})\r\n".
"\tERROR: ".$_POST["error"]."\r\n".
"\tTRACE: ".$_POST["trace"]."\r\n";
error_log($LogTxt, 3, '../_tmp/err/_log_short.err');
$LogTxt = $cdi."\r\n".
"\tUSER...: ".$_SESSION["_User"]."\r\n".
"\tPK.....: ".$_POST["pk"]."\r\n".
"\tERROR..: ".$_POST["error"]."\r\n".
"\tTRACE..: ".$_POST["trace"]."\r\n".
"\tURL....: ".$_POST["url"]." ({$linea},{$columna})\r\n".
"\tPOST...: ".$_POST["post"]."\r\n".
"\tHTML...: ".$txtError."\r\n";
error_log($LogTxt, 3, '../_tmp/err/_log.err');
}
include_once($Dir_.$_Sql.'.inc');
if( isset($_GET['ERROR']) ){
list($Old, $New) = explode(',', $_GET['ERROR']);
@rename("../_tmp/err/{$Old}.png", "../_tmp/err/{$New}.png");
qQuery("update {$_SESSION['ShareDictionary']}gs_error set img='S' where codigo='{$New}'");
if( file_exists("../_tmp/err/{$Old}_before.png") ){
@rename("../_tmp/err/{$Old}_before.png", "../_tmp/err/{$New}_before.png");
}
eEnd();
}
if( $LogTxt!='' ){
if( $_ErrReportToDev!='' && (in_array('u'.$_User, $_ErrReportUserNode) || in_array('n'.$_Node, $_ErrReportUserNode)) ){
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=ISO-8859-1\r\n";
$Cabeceras .= "From: ".$_ErrReportFrom."\r\n";
$cd = zend_get_id();
if( is_array($cd) ) list($cd) = $cd;
mail($_ErrReportToDev, "Seguimiento de error: Node:{$_Node}, User:{$_User} ".$cd, stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras);
}else if( $_ErrReportTo!='' ){
global $_ErrReportMessage, $_ErrReportFrom, $_ErrReportCc, $_ErrReportBCc;
$Cabeceras  = "MIME-Version: 1.0\r\n";
$Cabeceras .= "Content-type: text/html; charset=ISO-8859-1\r\n";
$Cabeceras .= "From: ".$_ErrReportFrom."\r\n";
if( $_ErrReportFrom!='' ) $Cabeceras .= "Reply-To: ".$_ErrReportFrom."\r\n";
if( $_ErrReportCc  !='' ) $Cabeceras .= "Cc: ".$_ErrReportCc."\r\n";
if( $_ErrReportBCc !='' ) $Cabeceras .= "Bcc: ".$_ErrReportBCc."\r\n";
$Cabeceras .= "X-Mailer: PHP/" . phpversion();
$cd = zend_get_id();
if( is_array($cd) ) list($cd) = $cd;
mail($_ErrReportTo, $_ErrReportMessage.' '.$cd, stripslashes(str_replace("\n",'<br>',$LogTxt)), $Cabeceras);
}
}
if( isset($DELETE) ){
qSelect("{$_SESSION['ShareDictionary']}gs_error", '*', "codigo={$DELETE} and is_solved is null");
$row = qArray();
$xtipo = trim($row['tipo']);
$xfichero = trim($row['fichero']);
$xlinea = trim($row['linea']);
$xtexto = trim($row['texto']);
if( $xfichero=='' && $xlinea=='' ){
$sql = "tipo='{$xtipo}' and texto='{$xtexto}'";
}else{
$sql = "tipo='{$xtipo}' and fichero='{$xfichero}' and linea='{$xlinea}' and texto='{$xtexto}'";
if( substr_count($sql," and linea='' and ")==1 ) $sql = str_replace(" and linea='' and "," and (linea='' or linea is null) and ",$sql);
if( substr_count($sql,"' and texto=''"    )==1 ) $sql = str_replace("' and texto=''"    ,"' and (texto='' or texto is null)"    ,$sql);
}
qSelect("{$_SESSION['ShareDictionary']}gs_error", 'codigo', $sql);
$TotalReg = 0;
$Borrar = '';
while($ABorrar=qRow()){
@unlink('../_tmp/err/'.$ABorrar[0].'.png');
$Borrar .= ','.$ABorrar[0];
$TotalReg++;
}
qQuery("update {$_SESSION['ShareDictionary']}gs_error set is_solved='S' where {$sql}");
echo '<HTML><HEAD></HEAD><BODY><SCRIPT type="text/javascript">';
if( $TotalReg==0 ){
sql_Borra("{$_SESSION['ShareDictionary']}gs_error", "codigo={$DELETE}");
$Borrar .= ','.$DELETE;
$TotalReg++;
}
$Borrar = str_replace(' ','',$Borrar);
?>
var Obj = window.frameElement.WOPENER;
if( Obj.DGI("BROWSE") != null ){
var Col = Obj.eGCol('codigo'),
tmp = '<?= $Borrar; ?>'.split(',');
for(var n=1; n<tmp.length; n++){
for(var i=1; i<Obj.DGI("BROWSE").rows.length; i++){
if( Obj.DGI("BROWSE").rows[i].cells[Col].textContent.replace(/\s/g,'') == tmp[n] ){
Obj.DGI("BROWSE").rows[i].style.display = 'none';
}
}
}
Obj.Recalcula();
Obj.MovTitulos();
}
<?PHP
if( $TotalReg==1 ){
echo "top.eAlert(S.lng(209), '1 Registro borrado', 'A', 'I');";
}else{
echo "top.eAlert(S.lng(209), '{$TotalReg} Registros borrados', 'A', 'I');";
}
echo '</SCRIPT></BODY></HTML>';
eEnd();
}
$orden = str_replace(
array(  "'"  ,  '"'  ,"\\'",'\\"','º','á'),
array('&#39;','&#34;',  "'",  '"','º','á'),
$_POST['error']
);
$Trace = str_replace(
array("\t\t\t", "\t\t"),
array("\t"    , ""    ),
$_POST["trace"]
);
$Texto = $_POST["error"];
$NomFile = $_POST["url"];
$Linea = $linea;
$Col = $columna;
$dim = explode(chr(10), trim($Trace));
$Desde = trim($dim[count($dim)-1]);
if( substr($Desde,0,3)=="at " ) $Desde = substr($Desde,3);
list($Desde) = explode("&", $Desde);
list($xNomFile) = explode("&", $NomFile);
if( trim($xNomFile)==trim($Desde) ) $Desde = "";
if( substr_count($NomFile,'&')>0 ){
$Para = '&'.substr($NomFile,strpos($NomFile,'&')+1).'&';
while( substr_count($Para, '&_FORMBUTTONS')>0 ){
$i = strpos( $Para,'&_FORMBUTTONS' );
$f = strpos( $Para,'&',$i+1 );
$f2 = strpos( $Para, chr(10), $i+1 );
if( $f2>1 && $f2<$f ) $f = $f2;
$Para = substr( $Para, 0, $i ) . substr( $Para, $f );
}
while( substr_count($Para, '&_PSOURCE')>0 ){
$i = strpos( $Para,'&_PSOURCE' );
$f = strpos( $Para,'&',$i+1 );
$f2 = strpos( $Para, chr(10), $i+1 );
if( $f2>1 && $f2<$f ) $f = $f2;
$Para = substr( $Para, 0, $i ) . substr( $Para, $f );
}
if( substr($Para,-1)=='&' ) $Para = substr( $Para, 0, -1 );
if( $Para[0]=='&' ) $Para = substr( $Para, 1 );
$Para = '';
$NomFile = substr($NomFile,0,strpos($NomFile,'&'));
}else{
$Para = '';
}
if( substr_count($NomFile, 'edes.php?')>0 ) list(,$NomFile) = explode('edes.php?', $NomFile);
$Trace = trim($Trace).'&';
while( substr_count( $Trace, '&_FORMBUTTONS' ) > 0 ){
$i = strpos( $Trace,'&_FORMBUTTONS' );
$f = strpos( $Trace,'&',$i+1 );
$f2 = strpos( $Trace, chr(10), $i+1 );
if( $f2>1 && $f2<$f ) $f = $f2;
$Trace = substr( $Trace, 0, $i ) . substr( $Trace, $f );
}
while( substr_count( $Trace, '&_PSOURCE' ) > 0 ){
$i = strpos( $Trace,'&_PSOURCE' );
$f = strpos( $Trace,'&',$i+1 );
$f2 = strpos( $Trace, chr(10), $i+1 );
if( $f2>1 && $f2<$f ) $f = $f2;
$Trace = substr( $Trace, 0, $i ) . substr( $Trace, $f );
}
$Trace = substr($Trace,0,-1);
$Dim = explode("\n",$Trace);
$Trace = '';
for( $n=0; $n<count($Dim); $n++ ){
if( $n>0 ) $Trace .= "\n";
list( $iz, $dch ) = explode('edes.php?',$Dim[$n]);
if( $dch=='' ){
$Trace .= str_replace("\t",'· ',$iz);
}else{
if( trim($dch)=='U' ){
$Trace = substr($Trace,0,-1);
}else{
$Trace .= $dch;
}
}
}
$Trace = str_replace(chr(13).chr(10).chr(13).chr(10).chr(13).chr(10), "\n\n", $Trace);
$Desde = trim($Desde);
$NomFile = trim($NomFile);
$Linea = trim($Linea)*1;
$Texto = trim($Texto);
$Img = (($ID!='') ? 'S':'');
$_User *= 1;
$Texto = str_replace(array('"',"'"), array("&#34;","&#39;"), $Texto);
$Trace = str_replace(array('"',"'"), array("&#34;","&#39;"), $Trace);
if( eSqlType('pdo.informix') ){
sql_Memo("{$_SESSION['ShareDictionary']}gs_error", $Trace);
sql_Inserta("{$_SESSION['ShareDictionary']}gs_error", 'cdi,cd_gs_user,tipo,desde,fichero,img,linea,texto,trace',			"'{$cdi}', '{$_User}', 'J', '{$Desde}', '{$NomFile}', '{$Img}', {$Linea}, '{$Texto}', ?");
}else if( eSqlType('informix') ){
$DimText[] = ifx_create_blob(1, 0, $Trace);
$sql = "insert into {$_SESSION['ShareDictionary']}gs_error (cdi,cd_gs_user,tipo,desde,fichero,img,linea,texto,trace) values ('{$cdi}', '{$_User}', 'J', '{$Desde}', '{$NomFile}', '{$Img}', {$Linea}, '{$Texto}', ?)";
ifx_query($sql, $GLOBALS['_HndDB'], $DimText);
}else{
sql_Inserta("{$_SESSION['ShareDictionary']}gs_error", 'cdi,cd_gs_user,tipo,desde,fichero,img,linea,texto,trace',			"'{$cdi}', '{$_User}', 'J', '{$Desde}', '{$NomFile}', '{$Img}', {$Linea}, '{$Texto}', '{$Trace}'");
}
if( $ID!='' ){
$pk = qId();
@rename("../_tmp/err/{$ID}.png", "../_tmp/err/{$pk}.png");
if( file_exists("../_tmp/err/{$ID}_before.png") ){
@rename("../_tmp/err/{$ID}_before.png", "../_tmp/err/{$pk}_before.png");
}
}
qEnd();
eEnd();
echo "<script type='text/javascript'>alert('{$ID}');</SCRIPT>";
?>
<!DOCTYPE HTML>
<HTML><HEAD></HEAD><BODY>
<SCRIPT type="text/javascript">
top.eCaptureWin(12345678);
</SCRIPT>
</BODY></HTML>
