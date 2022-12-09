<?PHP
if( $_GET['TREE'] ){
$_GET['_GEST'] = "ALL";
}
if( $_GET['_SoloConsulta']==1 ){
unset($_GET['_SoloConsulta']);
$_GET['_GEST'] = "VIEW";
}
if( !isset($_GET['_GEST']) ) $_GET['_GEST'] = "VIEW";
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() ) exit;
$_DirG = 'g/e';
if( $_SD=="" ){
eval(qSetup());
}else{
include("../_datos/config/share.ini");
}
include_once("../../edesweb/{$_Sql}.inc");
function _Log($txt, $quien=false){
}
if( isset($_GET['EXPULSAR']) ){
file_put_contents('../_datos/config/manager_op.out');
?>
<script type="text/javascript">
top.eInfo(top, 'Orden de liberar el Gestor de Árboles.<br>En un minuto estará liberado.', -1);
top.eLoading(0,top.Pag);
</script>
<?PHP
eEnd();
}
if( isset($_GET['LIBERAR']) ){
$File = '../_datos/config/manager_op.cdi';
if( file_exists($File) ) @unlink($File);
die("Gestor de opciones liberado");
}
if( isset($_GET['_SVG']) ){
if( eFileType($_GET['_SVG'])=="svg" ) echo file_get_contents($_GET['_SVG']);
eEnd();
}
if( !isset($_GET['_SoloConsulta']) ){
if( file_exists('../_datos/config/manager_op.out') ){
@unlink('../_datos/config/manager_op.out');
?>
<script type="text/javascript">
top.eSWClose(window.frameElement.WOPENER);
</script>
<?PHP
eEnd();
}
$DimUser = array();
clearstatcache();
if( file_exists('../_datos/config/manager_op.usr') ) $DimUser = file('../_datos/config/manager_op.usr');
$File = '../_datos/config/manager_op.cdi';
if( file_exists($File) ){
list($uUser, $uSg, $NomUser, $EMail) = explode(',', file_get_contents($File));
if( $uUser!=$_SESSION['_User'] ){
if( (int)eGetMicroTime()<$uSg ){
eInclude('message');
eMessage("El Gestor de Opciones está en uso por:<br>{$NomUser}<br>{$EMail}<br>Inténtelo mas tarde", 'HS', 7);
}
}
}
file_put_contents($File, $_SESSION['_User'].','.(((int)eGetMicroTime())+120).','.$_SESSION["_UserName"].','.$_SESSION["_UserEMail"]);
}
if( qCount("{$_SESSION['ShareDictionary']}gs_op", "")==0 ){
CargarArbolMaster('../tree/master.txt');
}
if( isset($_GET['SG']) ){
if( $_GET['SG']==0 ){
@unlink($File);
$File = '../_datos/config/manager_op.add';
if( file_exists($File) ){
$Dim = file($File);
for($n=0; $n<count($Dim); $n++){
if( trim($Dim[$n])!='' ){
$tmp = explode('~',substr($Dim[$n],4));
qQuery("update {$_SESSION['ShareDictionary']}gs_op set show_type='{$tmp[2]}' where cd_gs_op='{$tmp[1]}'");
}
}
@unlink($File);
}
}
eEnd();
}
$_Valor100 = null;
$_uValor100 = null;
function M( $n ){
global $_Valor100, $_uValor100;
if( $_Valor100 == null ){
$_Valor100 = $n;
echo "<script type='text/javascript'>M('0%');</script>";
}else{
$x = (int)(($n*100)/$_Valor100);
if( $x!=$_uValor100 ){
$_uValor100 = $x;
$x = 100-$x;
if( $x<0 ) $x = 0;
if( $x>100 ) $x = 100;
echo "<script type='text/javascript'>M('{$x}%');</script>";
}
}
}
if( isset($_POST['Quien']) ){
list($Buscar) = explode('&', $_POST['Quien']);
$Buscar = str_replace('edes.php?', '', $Buscar);
if( substr_count($Buscar, ':')>0 ){
list($Modo, $Buscar) = explode(':', $Buscar);
if( substr_count($Buscar, '.')==0 ){
if( substr_count($Modo, '#')>0 || substr_count($Modo, 'F')>0 || substr_count($Modo, 'L')>0 ) $Buscar .= 'edf';
else $Buscar .= 'gdf';
}
}
$Dim = array();
$nMax = 0;
qQuery("select cd_gs_user,email,count(*) from {$_SESSION['ShareDictionary']}gs_activity where script='{$Buscar}' group by 1,2 order by 3 desc");
while( $r=qRow() ){
qQuery("select max(cdi) from {$_SESSION['ShareDictionary']}gs_activity where script='{$Buscar}' and cd_gs_user={$r[0]}", $p1);
list($cdi) = qRow($p1);
$Dim[] = $cdi.'|'.$r[2].'|'.$r[1];
if( $nMax<$r[2] ) $nMax = $r[2];
}
sort($Dim);
$txt = '';
for($n=count($Dim)-1; $n>=0; $n--){
$tmp = explode('|', $Dim[$n]);
if( $txt!='' ) $txt .= '<br>';
$txt .= str_pad($tmp[1], strlen($nMax.''), '0', STR_PAD_LEFT).' · '.$tmp[0].' · '.$tmp[2];
}
$Buscar .= ' ('.$_POST['PK'].')';
?>
<script type="text/javascript">
top.eInfo(window, '<?= 'SCRIPT: '.$Buscar.'<br><br>'.$txt ?>', 99);
</script>
<?PHP
eEnd();
}
if( isset($_POST['grabar']) ){
set_time_limit(0);
ignore_user_abort(0);
ob_end_clean(); ob_start();
$Test = false;
if( strlen($_POST['IsUTF8'])==2 ) $_POST['grabar'] = utf8_decode($_POST['grabar']);
$MaxId = 1;
$nReg = qCount("{$_SESSION['ShareDictionary']}gs_op");
if( $nReg>0 ){
qQuery("select max(cd_gs_op) from {$_SESSION['ShareDictionary']}gs_op order by 1 desc");
list($MaxId) = qRow();
if( $Test ) eTrace('$MaxId = '.$MaxId);
}
if( $Test ) echo '<table border=1>';
$UpdateJS = '';
$DeleteJS = '';
$Seq = 0;
$ArbolTxt = '';
$NumDelete = 0;
$Dim = explode("\n", $_POST['grabar']);
$TReg = count($Dim);
?>
<script type="text/javascript">
var Obj = window.frameElement.WOPENER;
function M(n){
top.eAlertText('Grabando '+n,1);
}
</script>
<?PHP
M($TReg);
$Contenido = ob_get_contents();
ob_end_clean();
echo $Contenido;
ob_flush(); flush();
ob_end_clean(); ob_start();
for($n=0; $n<count($Dim)-1; $n++){
if( $Test ) echo '<tr>';
$tmp = explode('|', trim($Dim[$n]));
$txt = $Seq;
$xID = '';
for($c=0; $c<count($tmp); $c++){
$tmp[$c] = trim($tmp[$c]);
if( $c==0 ){
$xID = $tmp[$c];
if( $xID=='' ){
$NuevaOpcion = true;
$MaxId++;
$tmp[$c] = $MaxId;
$xID = $tmp[$c];
}else{
$NuevaOpcion = false;
}
}
$txt .= ",'".$tmp[$c]."'";
if( $Test ) echo '<td>'.$tmp[$c];
}
if( $NuevaOpcion || $nReg==0 ){
$Hoy = date('Y-m-d');
$txt .= ",'{$Hoy}'";
$txt .= ",'','{$Hoy}'";
$sql = "insert into {$_SESSION['ShareDictionary']}gs_op (seq,cd_gs_op,show_type,mode,icon,indent,type,caption,script_url,tip,icons,alias, dt_add, status,dt_status) values ({$txt})";
$UpdateJS .= ($n+1-$NumDelete).','.$xID.'|';
}else if( $xID=='NO' || $xID=='-NO' ){
$TReg--;
M($TReg);
$Contenido = ob_get_contents();
ob_end_clean();
echo $Contenido;
ob_flush(); flush();
ob_end_clean(); ob_start();
continue;
}else if( $xID < 0 ){
$Seq--;
$NumDelete++;
$xID = $xID * -1;
$sql = "delete from {$_SESSION['ShareDictionary']}gs_op where cd_gs_op={$xID}";
qQuery("delete from {$_SESSION['ShareDictionary']}gs_tree_op where cd_gs_op={$xID}");
}else{
$sql = "update {$_SESSION['ShareDictionary']}gs_op set seq='{$Seq}', show_type='{$tmp[1]}', mode='{$tmp[2]}', icon='{$tmp[3]}', indent='{$tmp[4]}', type='{$tmp[5]}',
caption='{$tmp[6]}',
script_url='{$tmp[7]}',
tip='{$tmp[8]}',
icons='{$tmp[9]}',
alias='{$tmp[10]}'
where cd_gs_op={$xID}";
}
if( $Test ) echo '<td>'.$sql;
qQuery($sql);
$TReg--;
M($TReg);
$Contenido = ob_get_contents();
ob_end_clean();
echo $Contenido;
ob_flush(); flush();
ob_end_clean(); ob_start();
$Seq++;
}
qQuery("update {$_SESSION['ShareDictionary']}gs_op set show_type='' where type<>'O' and show_type<>''");
if( $Test ){
echo '</table>';
echo $_POST['grabar'];
}else{
CreaDir('../_bak_');
CreaDir('../_bak_/tree');
$TCopias = 30;
$nCopia  = 0;
$dir = '../_bak_/tree/';
$DimFile = array();
$uDir = opendir($dir);
while( $uFile = readdir($uDir) ){
if( ($uFile=='.') || ($uFile=='..') || (substr($uFile,0,6)!='gs_op.') || (is_dir( $dir.'/'.$uFile )) ) continue;
$file = gmdate("YmdHis", filemtime($dir .'/'. $uFile));
$DimFile[] = $file.'|'.$uFile;
}
closedir($uDir);
$ArbolTxt = '';
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op order by seq");
while( $r=qRow() ){
for($n=0; $n<count($r); $n++) $ArbolTxt .= $r[$n].'|';
$ArbolTxt .= "\n";
}
if( count($DimFile)>0 ){
sort($DimFile);
list(,$nCopia) = explode('.', $DimFile[count($DimFile)-1]);
$nCopia = $nCopia*1;
}
$nCopia++;
if( $nCopia>$TCopias ) $nCopia = 1;
$nCopia = str_pad( $nCopia, 2, '0', STR_PAD_LEFT );
file_put_contents( $dir.'gs_op.'.$nCopia, $ArbolTxt );
file_put_contents( '../tree/gs_op.unl'	 , $ArbolTxt );
qQuery("insert into {$_SESSION['ShareDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '". date('Y-m-d H:i:s')."', '/tree/gs_op.unl', 'C', '{$_SESSION['_UserEMail']}')");
}
?>
<script type="text/javascript">
Obj.PutSerial('<?= $UpdateJS ?>', 0);
Obj.Procesando(0);
top.eAlertHide();
setTimeout("location.href = 'about:blank';", 100);
</script>';
<?PHP
eEnd();
}
if( isset($_GET['TreeCd']) ){
qQuery("update {$_SESSION['ShareDictionary']}gs_tree set permission='".(($_GET['TreeOnOff']=='S')?'S':'')."' where cd_gs_tree=".$_GET['TreeCd']);
?>
<script type="text/javascript">
setTimeout('top.eInfoHide()',3000);
</script>
<?PHP
eEnd();
}
if( isset($_POST['LoadTree']) ){
if( $_POST['LoadTree']=='' ){
$_POST['NmTree'] = str_replace( '·', '-', $_POST['NmTree'] );
$_POST['NmTree'] = str_replace( "'", '&#39;',$_POST['NmTree'] );
qQuery("insert into {$_SESSION['ShareDictionary']}gs_tree (nm_gs_tree, filename) values ('".$_POST['NmTree']."', '')");
$id = qId();
?>
<script type="text/javascript">
window.frameElement.WOPENER.AsignaTreeId('<?= $id ?>');
</script>
<?PHP
}else{
$txt = '';
qQuery("select O.seq, T.cd_gs_op from {$_SESSION['ShareDictionary']}gs_tree_op T left join {$_SESSION['ShareDictionary']}gs_op O on T.cd_gs_op=O.cd_gs_op where T.cd_gs_tree=".$_POST['LoadTree'].' order by O.seq desc');
while( $r=qRow() ){
if( trim($r[0])!='' ) $txt .= ($r[0]+1).','.$r[1].'|';
}
?>
<script type="text/javascript">
window.frameElement.WOPENER.VerTreeOp("<?= $txt ?>");
</script>
<?PHP
}
eEnd();
}
if( isset($_POST['InsertTree']) ){
$_POST['NmTree'] = str_replace('·', '-', $_POST['NmTree']);
$_POST['NmTree'] = str_replace("'", '&#39;',$_POST['NmTree']);
qQuery("insert into {$_SESSION['ShareDictionary']}gs_tree (nm_gs_tree, filename) values ('".$_POST['NmTree']."', '')");
$id = qId();
?>
<script type="text/javascript">
window.frameElement.WOPENER.AsignaTreeId('<?= $id ?>');
window.frameElement.WOPENER._TreeON = false;
</script>
<?PHP
if( $_POST['IgualQue']>0 ){
qQuery("insert into {$_SESSION['ShareDictionary']}gs_tree_op (select {$id}, cd_gs_op from {$_SESSION['ShareDictionary']}gs_tree_op where cd_gs_tree={$_POST['IgualQue']})");
}
eEnd();
}
if( isset($_POST['grabarTree']) ){
_Log('OPCION: grabarTree', true);
set_time_limit(0);
ignore_user_abort(0);
ob_end_clean(); ob_start();
$Test = false;
if( strlen($_POST['IsUTF8'])==2 ) $_POST['grabarTree'] = utf8_decode($_POST['grabarTree']);
$Dim = explode('|', $_POST['grabarTree']);
$Tree = $Dim[0];
$NomTree = $Dim[1];
if( !$Test ){
_Log('Copia de seguridad de las opciones');
CreaDir('../_bak_');
CreaDir('../_bak_/tree');
$TCopias = 30;
$nCopia  = 0;
$dir = '../_bak_/tree/';
$DimFile = array();
$uDir = opendir( $dir );
while( $uFile = readdir($uDir) ){
if( ($uFile=='.') || ($uFile=='..') || (substr($uFile,0,11)!='gs_tree_op.') || (is_dir($dir.'/'.$uFile)) ) continue;
$file = gmdate("YmdHis", filemtime($dir .'/'. $uFile));
$DimFile[] = $file.'|'.$uFile;
}
closedir($uDir);
if( count($DimFile)>0 ){
sort($DimFile);
list(,,$nCopia) = explode('.', $DimFile[count($DimFile)-1]);
$nCopia = $nCopia*1;
}
$nCopia++;
if( $nCopia>$TCopias ) $nCopia = 1;
$nCopia = str_pad($nCopia, 2, '0', STR_PAD_LEFT);
file_put_contents($dir.'gs_tree_op.'.$Tree.'.'.$nCopia, $_POST['grabarTree']);
}
?>
<script type="text/javascript">
top.S.init(window);
var Obj = window.frameElement.WOPENER;
function M(n){
top.eAlertText('Grabando '+n,1);
}
</script>
<?PHP
$NomTree = str_replace('·', '-', $NomTree);
$NomTree = str_replace("'", '&#39;', $NomTree);
if( $Test ){
eTrace('Tree: '.$Dim[0]);
eTrace("update {$_SESSION['ShareDictionary']}gs_tree set nm_gs_tree='".$NomTree."' where cd_gs_tree=".$Tree);
echo '<table border=1>';
}else{
_Log('Comprueba que el nombre no se duplique');
if( qCount("{$_SESSION['ShareDictionary']}gs_tree", "nm_gs_tree='".$NomTree."' and cd_gs_tree<>".$Tree)>0 ){
qQuery("select nm_gs_tree from {$_SESSION['ShareDictionary']}gs_tree where cd_gs_tree=".$Tree);
list($NomTree) = qRow();
?>
<script type="text/javascript">
var TR = S("#TreeGroup", Obj).obj.rows;
for(var n=1; n<TR.length; n++){
if( TR[n].getAttribute("cd")==<?=$Tree?> ){
TR[n].cells[1].textContent = "<?= $NomTree ?>";
break;
}
}
S("#IcoGrabarTree", Obj).visible();
top.eAlertHidde();
Obj.Procesando(0);
top.eInfoError(Obj,"El nombre del árbol ya existe");
</script>
<?PHP
eEnd();
}
_Log("Graba el nombre del arbol");
qQuery("update {$_SESSION['ShareDictionary']}gs_tree set nm_gs_tree='".$NomTree."', cdi='".date('Y-m-d H:i:s')."' where cd_gs_tree=".$Tree);
echo "<script type='text/javascript'>top.eAlertText('Borrando...',1);</script>";
$Contenido = ob_get_contents();
ob_end_clean();
echo $Contenido;
ob_flush(); flush();
ob_end_clean(); ob_start();
_Log("Borra todas las opciones del arbol");
qQuery("delete from {$_SESSION['ShareDictionary']}gs_tree_op where cd_gs_tree={$Tree}");
}
_Log("Inserta las nuevas opciones del arbol");
$TReg = count($Dim)-2;
for($n=2; $n<count($Dim); $n++){
if( $Test ){
echo '<tr><td>'.$Dim[$n];
}else{
if( trim($Dim[$n])!='' ) qQuery("insert into {$_SESSION['ShareDictionary']}gs_tree_op values ({$Tree}, {$Dim[$n]})");
}
$TReg--;
M($TReg);
$Contenido = ob_get_contents();
ob_end_clean();
echo $Contenido;
ob_flush(); flush();
ob_end_clean(); ob_start();
}
if( $Test ){
echo '</table>';
echo $_POST['grabarTree'];
}
_Log("Memoriza los idiomas");
$DimIdiomas = array();
qQuery("select cd_gs_language from {$_SESSION['ShareDictionary']}gs_language");
while( $r=qRow() ) $DimIdiomas[] = trim($r[0]);
if( count($DimIdiomas)==0 ) $DimIdiomas[] = 'es';
$CdTree = $Tree;
_Log("Obtiene el nombre del arbol");
qQuery("select filename from {$_SESSION['ShareDictionary']}gs_tree where cd_gs_tree={$CdTree}", $na);
list($FileName) = qRow($na);
_Log("Graba los arboles txt en idiomas 2");
for($i=0; $i<count($DimIdiomas); $i++){
echo "<script type='text/javascript'>top.eAlertText('Generando ".(count($DimIdiomas)-$i)."',1);</script>";
$Contenido = ob_get_contents();
ob_end_clean();
echo $Contenido;
ob_flush(); flush();
ob_end_clean(); ob_start();
$Lenguaje = trim($DimIdiomas[$i]);
$DimLabel = array();
qQuery("select cd_gs_op,caption,caption_tip from {$_SESSION['ShareDictionary']}gs_op_lng where cd_gs_language='{$Lenguaje}' order by cd_gs_op");
while( $r=qRow() ) $DimLabel[trim($r[2]).$r[0]] = Decode(trim($r[1]));
$txt = '';
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op where cd_gs_op in (select cd_gs_op from {$_SESSION['ShareDictionary']}gs_tree_op where cd_gs_tree={$CdTree}) order by seq");
while( $r=qArray() ){
$txt .= str_repeat("\t",$r['indent']);
if( trim($r['icon'])!='' ) $txt .= '{'.trim($r['icon']).'} ';
if( $r['type']=='L' ) $txt .= '-';
$Lab = trim($DimLabel['C'.$r['cd_gs_op']]);
if( $Lab=='' ) $Lab = trim($r['caption']);
$txt .= $Lab;
if( $r['type']=='L' ){
$Lab = trim($DimLabel['T'.$r['cd_gs_op']]);
if( $Lab=='' ) $Lab = trim($r['tip']);
if( $Lab!='' ) $txt .= ' | ~ ~ '.$Lab;
}else{
$txt .= ' | '.trim($r['script_url']).' ~ '.$r['cd_gs_op'];
$Lab = trim($DimLabel['T'.$r['cd_gs_op']]);
if( $Lab=='' ) $Lab = trim($r['tip']);
if( $Lab!='' ) $txt .= ' ~ '.$Lab;
}
$txt .= "\n";
}
_Log("../tree/{$CdTree}.{$Lenguaje}.txt");
file_put_contents("../tree/{$CdTree}.{$Lenguaje}.txt", $txt);
if( $_SESSION['_LanguageDefault']==$Lenguaje ){
file_put_contents("../tree/{$CdTree}.txt", $txt);
$FileName = trim($FileName);
if( $FileName!='' ){
file_put_contents("../tree/{$FileName}", $txt);
}
}
}
_Log("Fin del proceso");
?>
<script type="text/javascript">
S("#IcoGrabarTree", Obj).visible();
Obj.Procesando(0);
Obj._SeModTree = false;
top.eAlertHide();
setTimeout("location.href = 'about:blank';",1000);
</script>
<?PHP
eEnd();
}
if( isset( $_GET['RestoreTable']) ){
set_time_limit(0);
ignore_user_abort(0);
$t = array();
$Dir = '../_bak_/tree/';
$di = opendir($Dir);
while( $file=readdir($di) ){
if( $file!='.' && $file!='..' && !is_dir($file) ){
if( substr($file,0,6)=='gs_op.' ){
$t[] =date('Y-m-d H:i:s', filemtime($Dir.$file)) .'|'. $sDir.$file;
}
}
}
closedir($di);
rsort($t);
echo '<table class="col_0ff" id=RestoreTable onclick="RestoreDatos()"><col style="cursor:pointer"><tr><th style="cursor:default;font-size:14px">FECHA Backup';
for($n=0; $n<count($t); $n++) echo '<tr><td n='.substr($t[$n],-2).'>'.substr($t[$n],0,19);
echo '</table>';
?>
<script type="text/javascript">
top.S.init(window);
function RestoreDatos(){}
var Obj = window.frameElement.WOPENER;
S("#RestoreContainer", Obj).html(S("#RestoreTable").HTML());
Obj.ViewRestore();
Obj.Procesando(0);
</script>
<?PHP
eEnd();
}
if( isset( $_GET['RestoreDatos']) ){
set_time_limit(0);
ignore_user_abort(0);
if( !file_exists( '../_bak_/tree/gs_op.'.$_GET['RestoreDatos'] ) ){
?>
<script type="text/javascript">
top.eInfo( window, 'Backup no encontrado', 5);
</script>
<?PHP
eEnd();
}
$Test = false;
$DimAdd = array();
qQuery("select cd_gs_op, dt_add from {$_SESSION['ShareDictionary']}gs_op");
while( $r=qRow() ) $DimAdd[$r[0]] = $r[1];
$txt = file_get_contents('../_bak_/tree/gs_op.'.$_GET['RestoreDatos']);
$Dim = explode("\n", $txt);
$MaxId = 1;
for($n=0; $n<count($Dim)-1; $n++){
$tmp = explode( '|', $Dim[$n] );
if( $MaxId<$tmp[0] ) $MaxId = $tmp[0];
}
if( $Test ){
echo '<table border=1>';
}else{
qQuery("delete from {$_SESSION['ShareDictionary']}gs_op");
}
if( $_Tron ) error_log("INI:\n",3,'_upload.info');
for( $n=0; $n<count($Dim); $n++ ){
$Dim[$n] = trim($Dim[$n]);
if( $Dim[$n]!='' ){
$tmp = explode("|", $Dim[$n]);
$tmp[12] = $tmp[12]*1;
$Dim[$n] = implode("|", $tmp);
$txt = "'".str_replace('|',"','",trim(substr($Dim[$n],0,-1)))."'";
$txt = str_replace("'0000-00-00'", 'NULL', $txt);
$sql = "insert into {$_SESSION['ShareDictionary']}gs_op values ($txt)";
if( $_Tron ) error_log('SQL: '.$sql."\n",3,'_upload.info');
if( $Test ){
echo '<td>'.$sql;
}else{
qQuery($sql);
}
}
}
if( $_Tron ) error_log("END:\n",3,'_upload.info');
if( $Test ) echo '</table>';
?>
<script type="text/javascript">
window.frameElement.WOPENER.location.href = window.frameElement.WOPENER.location.href;
</script>
<?PHP
eEnd();
}
if( isset( $_GET['RestoreTableTree']) ){
$t = array();
$Dir = '../_bak_/tree/';
$NomFile = 'gs_tree_op.'.($_GET['RestoreTableTree'].'').'.';
$di = opendir($Dir);
while( $file=readdir($di) ){
if( $file!='.' && $file!='..' && !is_dir($file) ){
if( substr($file,0,strlen($NomFile))==$NomFile ){
$t[] =date('Y-m-d H:i:s', filemtime($Dir.$file)) .'|'. $sDir.$file;
}
}
}
closedir($di);
rsort($t);
echo '<table id=RestoreTable onclick="RestoreDatosTree()"><col style="cursor:pointer"><tr><th style="cursor:default;font-size:14px">FECHA Backup';
for( $n=0; $n<count($t); $n++ ) echo '<tr><td n='.substr($t[$n],-2).'>'.substr($t[$n],0,19);
echo '</table>';
?>
<script type="text/javascript">
top.S.init(window);
function RestoreDatosTree(){}
var Obj = window.frameElement.WOPENER;
S("#RestoreContainer", Obj).html(S("#RestoreTable").HTML());
Obj.ViewRestoreTree();
</script>
<?PHP
eEnd();
}
if( isset($_GET['RestoreDatosTree']) ){
set_time_limit(0);
ignore_user_abort(0);
if( !file_exists('../_bak_/tree/gs_tree_op.'.$_GET['RestoreDatosTree']) ){
?>
<script type="text/javascript">
top.eInfo( window, 'Backup no encontrado', 5);
</script>
<?PHP
eEnd();
}
$Test = false;
list($NArbol) = explode('.', $_GET['RestoreDatosTree']);
$txt = file_get_contents('../_bak_/tree/gs_tree_op.'.$_GET['RestoreDatosTree']);
$Dim = explode('|', $txt);
if( $Test ){
eTrace('../_bak_/tree/gs_tree_op.'.$_GET['RestoreDatosTree']);
eTrace("delete from {$_SESSION['ShareDictionary']}gs_tree_op where cd_gs_tree={$NArbol}");
echo '<table border=1>';
}else{
qQuery("delete from {$_SESSION['ShareDictionary']}gs_tree_op where cd_gs_tree={$NArbol}");
}
for( $n=2; $n<count($Dim); $n++ ){
if( $Test ){
echo '<tr><td>'.$Dim[0].'<td>'.$Dim[$n];
echo '<td>'."insert into {$_SESSION['ShareDictionary']}gs_tree_op values({$NArbol}, {$Dim[$n]})";
}else{
qQuery("insert into {$_SESSION['ShareDictionary']}gs_tree_op values({$NArbol}, {$Dim[$n]})");
}
}
if( $Test ){
echo '</table>';
exit;
}
?>
<script type="text/javascript">
window.frameElement.WOPENER.location.href = window.frameElement.WOPENER.location.href;
</script>
<?PHP
eEnd();
}
if( isset($_GET['InTreeLoad']) ){
eTrace('InTreeLoad: '.$_GET['InTreeLoad']);
list(,$Tree) = explode(',', $_GET['InTreeLoad']);
qQuery("select distinct(cd_gs_tree) from {$_SESSION['ShareDictionary']}gs_tree where cd_gs_tree in (select cd_gs_tree from {$_SESSION['ShareDictionary']}gs_tree_op where cd_gs_op={$Tree})");
$xTree = '';
while( $r=qRow() ) $xTree .= ','.$r[0];
$xTree .= ',';
?>
<script type="text/javascript">
window.frameElement.WOPENER._OpInTreeView('<?= $xTree ?>');
window.frameElement.WOPENER.Procesando(0);
top.eInfoHide();
</script>
<?PHP
eEnd();
}
if( isset($_GET['InTreeSave']) ){
set_time_limit(0);
ignore_user_abort(0);
eTrace( 'InTreeSave: '.$_GET['InTreeSave'] );
list($Opciones, $Arboles) = explode( '|', $_GET['InTreeSave'] );
$Opciones = substr($Opciones,1);
if( $Arboles!='' ) $Arboles = trim(substr($Arboles,1));
$Opciones = explode(',', $Opciones);
$UnaOpcion  = $Opciones[0];
$DimArbols = array();
qQuery("select cd_gs_tree from {$_SESSION['ShareDictionary']}gs_tree_op where cd_gs_op in ({$UnaOpcion})");
while( $r=qRow() ) $DimArbols[$r[0]*1] = 1;
qQuery("delete from {$_SESSION['ShareDictionary']}gs_tree_op where cd_gs_op in ({$UnaOpcion})");
if( $Arboles!='' ){
$DimIdiomas = array();
qQuery("select cd_gs_language from {$_SESSION['ShareDictionary']}gs_language");
while( $r=qRow() ) $DimIdiomas[] = trim($r[0]);
if( count($DimIdiomas)==0 ) $DimIdiomas[] = 'es';
eTrace('Arboles['.$Arboles.']');
$Arboles = explode( ',', $Arboles );
for( $a=0; $a<count($Arboles); $a++ ){
$Arbol = $Arboles[$a];
for( $o=0; $o<count($Opciones); $o++ ){
$Opcion = $Opciones[$o];
if( qCount("{$_SESSION['ShareDictionary']}gs_tree_op", "cd_gs_tree={$Arbol} and cd_gs_op={$Opcion}")==0 ){
qQuery("insert into {$_SESSION['ShareDictionary']}gs_tree_op (cd_gs_tree,cd_gs_op) values ({$Arbol},{$Opcion})");
}
}
$DimArbols[$Arbol*1] = 1;
}
}
foreach( $DimArbols as $Arbol=>$v ) GeneraTreeTxt( $Arbol, $DimIdiomas, $_SESSION['_LanguageDefault'] );
?>
<script type="text/javascript">
top.S.init(window);
var Obj = window.frameElement.WOPENER
Obj._SeModInTree = false;
S("#OpInTreeSaveIMG",Obj).visible();
Obj.Procesando(0);
top.eInfoHide();
</script>
<?PHP
eEnd();
}
if( isset($_GET['OpSinTree']) ){
qQuery("select cd_gs_op from {$_SESSION['ShareDictionary']}gs_op where cd_gs_op not in (select cd_gs_op from {$_SESSION['ShareDictionary']}gs_tree_op)");
$Op = '';
while( $r=qRow() ) $Op .= ','.$r[0];
if( $Op!='' ) $Op .= ',';
?>
<script type="text/javascript">
window.frameElement.WOPENER.OpSinTreeView('<?= $Op ?>');
</script>
<?PHP
eEnd();
}
include('../_datos/config/desktop.ini');
header("Content-Type: text/html; charset=ISO-8859-1");
eHTML();
?>
<?= eLink('status','manager_op') ?>
</HEAD>
<style>
IMG { margin:0px; }
#BROWSE SVG {
<?PHP
$_Desktop = eFileGetVar("Desktop");
if( $_Desktop["SVGWidth"] !="" ) echo "width:" .($_Desktop["SVGWidth"]*1)."px !important;";
if( $_Desktop["SVGHeight"]!="" ) echo "height:".($_Desktop["SVGHeight"]*1)."px !important;";
?>
}
#BROWSE td:nth-child(3) IMG{
<?PHP
if( $_Desktop["IMGWidth"] !="" ) echo "max-width:" .($_Desktop["IMGWidth"]*1)."px !important;";
if( $_Desktop["IMGHeight"]!="" ) echo "max-height:".($_Desktop["IMGHeight"]*1)."px !important;";
?>
}
</style>
<?PHP
eInclude($_Sql);
if( !isset($TIPO) ) $TIPO = 0;
if( qCount("{$_SESSION['ShareDictionary']}gs_op", "")==0 ){
eInclude('message');
eMessage("No hay ninguna opción generada.", 'HSE');
}
$Dim = array();
for( $n=0; $n<count($_DimUser); $n++ ) $Dim[] = $_DimUser[$n][1].'|'.$_DimUser[$n][0].'|'.$_DimUser[$n][2];
sort($Dim);
$_DimUser[0] = array( '', '&nbsp;', $nFalta);
for( $n=0; $n<count($Dim); $n++ ){
list( $NomUser, $NumUser, $TOpciones ) = explode('|',$Dim[$n]);
$_DimUser[$n+1] = array( $NumUser, $NomUser, $TOpciones);
}
include( '../_datos/config/manager_op.ini' );
if( !isset($_WithDevelopment) ) $_WithDevelopment = false;
if( $_SESSION['_D_']=='~' ) _FileNoCache('edes.js');
?>
<SCRIPT type="text/javascript">
top.S.init(window, "all");
<?PHP	include("../../edesweb/binary.js"); ?>
var _UltimaOp = null;
var _FILAS;
var _SHOW = 0;
var _MODE = 1;
var _ICON = 2;
var _SELECT = 3;
var _LABEL = 4;
var _ICONS = 5;
var _ALIAS = 9;
var _ChrON  = "j";
var _ChrOFF = "";
var _TxtModeReal = '<?PHP  foreach( $_ModeLabel as $k=>$v ) echo $k; ?>';
var _TxtModeView = '<?PHP  foreach( $_ModeLabel as $k=>$v ) if( substr_count("IDVU",$k) > 0 ) echo $v[0]; ?>';
var _UrlOp = {'I':'#a:','D':'#b:','V':'#c:','U':'#m:','S':''};
var _ChrIcon = '^[\$]?[a-z\./\-_]*$';
var _ChrText = '^[a-zA-Z0-9 áéíóúñÑüÜçÇºª_\\-/()<>{}¡!\¿\?;\.:,\%\@\'"\s]*$';
var _ChrTextArea = '^[a-zA-Z0-9 áéíóúñÑüÜçÇºª_\\-/()<>{}¡!\¿\?;\.:,\%\@\'"\s\r\n]*$';
var _ChrScript = '^.*';
var _DimMode = {<?PHP
$n = 0;
foreach( $_ModeLabel as $k=>$v ){
if( $n>0 ) echo ',';
echo "'{$k}':'{$v}'";
$n++;
}
?>};
var _DimModeReal = {<?PHP
$n = 0;
foreach( $_Mode as $k=>$v ){
if( $n>0 ) echo ',';
echo "'{$k}':'".$v."'";
$n++;
}
?>};
var _iDimModeReal = {<?PHP
$n = 0;
foreach( $_Mode as $k=>$v ){
if( $n>0 ) echo ',';
echo "'{$v}':'".$k."'";
$n++;
}
?>};
var _DimShow = {<?PHP
$n = 0;
foreach( $_ShowLabel as $k=>$v ){
if( $n>0 ) echo ',';
echo "'{$k}':'{$v}'";
$n++;
}
?>};
var _DimShowReal = {<?PHP
$n = 0;
foreach( $_ShowLabel as $k=>$v ){
if( $n>0 ) echo ',';
if( substr_count($v,'_')>0 ) $v = substr($v,strpos($v,'_')+1,1);
echo "'{$k}':'".$v[0]."'";
$n++;
}
?>};
var _iDimShowReal = {<?PHP
$n = 0;
foreach( $_ShowLabel as $k=>$v ){
if( $n>0 ) echo ',';
if( $k=='*' ) $k = '';
if( substr_count($v,'_')>0 ) $v = substr($v,strpos($v,'_')+1,1);
echo "'{$v[0]}':'".$k."'";
$n++;
}
?>};
var _SeModOpciones = false;
var _SeModTree = false;
var _SeModInTree = false;
var _EditandoArbol = false;
var _SoloArbol = false;
var _OpEnTreeON = false;
var _Op_Desarrollador = false;
var _XY = new Array();
var _Icono;
var _SoloConsulta = false;
<?PHP
if( !$_Development || $_GET['_GEST']!="ALL" ) echo '_EditandoArbol = true;';
if( $_GET['_GEST']=="OP" ) echo '_SoloArbol = true;';
if( $_GET['_GEST']=="VIEW" ){
echo '_SoloConsulta = true;';
echo '_SoloArbol = true;';
}
?>
top.eInfoHide();
function eClearEvent(){
try{
if( event==null ) return false;
S.eventClear(window);
}catch(e){}
return false;
}
function AjustaCeldas(){
S(":BUSCAR").obj.focus();
_FILAS = S("#BROWSE").obj.rows;
}
function _Imprimir( v ){
if( v==-1 ) return;
window.document.body.focus();
window.print();
}
function Imprimir(){
if( _EditandoArbol ) return;
top.eAlert(S.lng(209), S.lng(218), 'A,C', 'P', _Imprimir);
}
function AntesPrint(){
S("#BROWSE").obj.parentNode.style.height = '';
S("#Header").obj.rows[1].style.display = 'none';
}
function DespuesPrint(){
S("#Header").obj.rows[1].style.display = 'block';
S("#BROWSE").obj.parentNode.style.height = '100%';
}
window.onbeforeprint = AntesPrint;
window.onafterprint = DespuesPrint;
function ImprimirTodo(){
var aTree = -1, n;
for( n=1; n<S("#TreeGroup").obj.rows.length; n++ ) if( S("#TreeGroup").obj.rows[n].cells[0].textContent.replace(/\s/g,'') == _ChrON ){
aTree = S("#TreeGroup").obj.rows[n].getAttribute("cd");
break;
}
if( aTree==-1 ){
top.eCallSrv(window,'edes.php?E:$pdf_arbol.gs&TipoArbol=T');
}else{
top.eCallSrv(window,'edes.php?E:$pdf_arbol.gs&TipoArbol=A&nArbol='+aTree);
}
}
var _TD;
function SetMode( Op, OpTextContent ){
if( Op==null ) return;
_TD.id = 'mc'+Op;
_TD.textContent = _DimModeReal[Op];
}
function SetShow( Op, OpTextContent ){
if( Op==null ) return;
var c = _iDimShowReal[Op];
if(c=='') c=='*';
_TD.id = 'st'+c;
_TD.textContent = (Op=='*')? ' ':c;
}
var _Opcion = null;
var _SelGrupo = false;
var _SelGrupoTree = false;
var _FilaPulsada;
var _FilaAMover = null;
var _FilasAMover = 0
var _ShowEstado;
var _IconNew = null;
function ShowEstado(){
if( !top.eReadyState(window) ) return;
var Obj = S.event(window),
el = Obj;
if( el.tagName=='IMG' || el.tagName=='SVG' ){
if( el.parentNode.parentNode.parentNode.parentNode.id=='LstICON' ){
Obj = el.parentNode.parentNode.parentNode.parentNode.parentNode;
}
}
if( el.tagName=='TR' || el.tagName=='TABLE' ) return;
try{
while( el.tagName!='TD' && el.tagName!='TH' ) el = el.parentNode;
if( el.parentNode.parentNode.parentNode.id!='BROWSE' ){
el = el.parentNode;
while( el.tagName!='TD' && el.tagName!='TH' ) el = el.parentNode;
}
}catch(e){
return;
}
if( el.cellIndex==_LABEL && _OpEnTreeON && el.tp!='F' ){
OpInTreeView(Obj);
_OpEnTreeON = false;
return eClearEvent();
}
if( el.cellIndex==_ICON ){
<?PHP if( $_GET["_GEST"]=="ALL" ){ ?>
_XY = top.eXY( S.event(window) );
Procesando(1);
_IconNew = el;
S.window("edes.php?E:$a/u/op_sel_icon.php", {
title:"Seleccionar Icono",
fullscreen:true,
iconAdd:
"svg<i  id='__svg'  class='ICONWINDOW' eON=1 style='cursor:pointer;margin-right:50px;'>&#321;</i>"+
"img<i  id='__img'  class='ICONWINDOW' eON=1 style='cursor:pointer;margin-right:10px;'>&#321;</i>"+
"jpeg<i id='__jpeg' class='ICONWINDOW' eON=1 style='cursor:pointer;margin-right:10px;'>&#321;</i>"+
"jpg<i  id='__jpg'  class='ICONWINDOW' eON=1 style='cursor:pointer;margin-right:10px;'>&#321;</i>"+
"png<i  id='__png'  class='ICONWINDOW' eON=1 style='cursor:pointer;margin-right:10px;'>&#321;</i>"+
"gif<i  id='__gif'  class='ICONWINDOW' eON=1 style='cursor:pointer;margin-right:50px;'>&#321;</i>"
});
<?PHP } ?>
return eClearEvent();
}
_OpEnTreeON = false;
if( el.cellIndex==_LABEL && _Op_Desarrollador ){
if( Obj.tagName=='IMG' ) Obj = Obj.parentNode;
var Op = Obj.getAttribute("HR");
if( el.tp=='F' ){
}else{
var i = Obj.parentNode.rowIndex-1;
while( _FILAS[i].cells[_LABEL].id == Obj.id ) i--;
var Titulo = _FILAS[i].cells[_LABEL].textContent+' · '+Obj.textContent;
if( Op.substr(Op.length-1,1) == ':' ) Op = Op + _FILAS[i].cells[_LABEL].getAttribute("HR").substr(1);
Op = _NomDF( Op );
Op = ObjDF( Op );
}
OpDesarrollador( Op, Obj.parentNode.getAttribute("n") );
_Op_Desarrollador = false;
return eClearEvent();
}
_Op_Desarrollador = false;
if( _Opcion!=null && !_EditandoArbol ){
_FilaPulsada = el.parentNode;
if( _Opcion!='Ma' ) _UltimaOp = _Opcion;
switch( _Opcion ){
case 'I':
_Opcion = null;
opAlta();
break;
case 'U':
_Opcion = null;
opModifica();
break;
case 'V':
_Opcion = null;
opView();
break;
case 'D':
_Opcion = null;
opDelete()
break;
case '<':
_Opcion = null;
if( _FilaPulsada.cells[_LABEL].id > 'n0' ){
_SeModOpciones = true;
if( _SelGrupo ){
if( Obj.tagName!='TD' ) Obj = Obj.parentNode;
var i = Obj.parentNode.rowIndex+1;
var tTR = _FILAS.length;
var oID = Obj.id;
var sID = 'n'+(parseInt(oID.substring(1))+1);
while( i < tTR && oID < _FILAS[i].cells[_LABEL].id  ){
if( _FILAS[i].getAttribute("dlt")==null ) _FILAS[i].cells[_LABEL].id = 'n'+(parseInt(_FILAS[i].cells[_LABEL].id.substr(1))-1);
i++;
}
}
_FilaPulsada.cells[_LABEL].id = 'n'+(parseInt(_FilaPulsada.cells[_LABEL].id.substr(1))-1);
}
break;
case '>':
_Opcion = null;
if( _SelGrupo ){
if( Obj.tagName!='TD' ) Obj = Obj.parentNode;
var i = Obj.parentNode.rowIndex+1;
var tTR = _FILAS.length;
var oID = Obj.id;
var sID = 'n'+(parseInt(oID.substring(1))+1);
while( i < tTR && oID < _FILAS[i].cells[_LABEL].id  ){
if( _FILAS[i].getAttribute("dlt")==null ) _FILAS[i].cells[_LABEL].id = 'n'+(parseInt(_FILAS[i].cells[_LABEL].id.substr(1))+1);
i++;
}
}
_FilaPulsada.cells[_LABEL].id = 'n'+(parseInt(_FilaPulsada.cells[_LABEL].id.substr(1))+1);
_SeModOpciones = true;
break;
case 'Me':
if( _FilaAMover!=null ){
if( _FilaPulsada.rowIndex==_FilaAMover.rowIndex ){
var Origen = _FilaAMover.rowIndex;
for(var n=0; n<_FilasAMover; n++){
_FILAS[Origen+n].cells[4].style.backgroundColor = '';
}
_SeModOpciones = true;
_FilasAMover = 0;
_FilaAMover = null;
_Opcion = null;
break;
}
_FilaAMover.cells[4].style.backgroundColor = '';
}
_Opcion = 'Ma';
_FilaAMover = el.parentNode;
_FilaAMover.cells[4].style.backgroundColor = '#ffffcc';
if( _FilaAMover.cells[_LABEL].children.length == 1 ) _FilaAMover.cells[_LABEL].firstChild.src = _FilaAMover.cells[_LABEL].firstChild.src.replace('_1.','_0.');
_FilasAMover = 1;
if( _SelGrupo ){
if( Obj.tagName!='TD' ) Obj = Obj.parentNode;
var i = Obj.parentNode.rowIndex + 1;
var tTR = _FILAS.length;
var oID = Obj.id;
var sID = 'n'+(parseInt(oID.substring(1))+1);
while( i < tTR && oID < _FILAS[i].cells[_LABEL].id  ){
if( _FILAS[i].getAttribute("dlt")==null ){
_FilasAMover++;
_FILAS[i].style.display = 'table-row';
_FILAS[i].cells[4].style.backgroundColor = '#ffffcc';
if( _FILAS[i].cells[_LABEL].children.length == 1 ) _FILAS[i].cells[_LABEL].firstChild.src = _FILAS[i].cells[_LABEL].firstChild.src.replace('_1.','_0.');
}
i++;
}
}
break;
case 'Ma':
_Opcion = null;
var nf = _FilaAMover.rowIndex + _FilasAMover - 1;
if( _FilaPulsada.rowIndex != _FilaAMover.rowIndex ){
var Destino = el.parentNode.rowIndex,
Origen = _FilaAMover.rowIndex;
if( _FilaPulsada.rowIndex > _FilaAMover.rowIndex ){
for(var n=0; n<_FilasAMover; n++){
_FILAS[Origen].cells[4].style.backgroundColor = '';
S(_FILAS[Origen]).nodeBefore(_FILAS[Destino+n+1]);
}
}else{
for(var n=0; n<_FilasAMover; n++){
_FILAS[Origen+n].cells[4].style.backgroundColor = '';
S(_FILAS[Origen+n]).nodeBefore(_FILAS[Destino+n]);
}
}
}else{
for(var n=0; n<_FilasAMover; n++) _FILAS[nf-n].cells[4].style.backgroundColor = '';
}
_SeModOpciones = true;
_FilaAMover = null;
break;
default:
_Opcion = null;
}
return;
}
if( Obj.tagName=='TD' ){
if( el.cellIndex==2 ){
if( _EditandoArbol || _SoloArbol || _SoloConsulta ) return;
}
if( el.cellIndex==_ICONS ){
if( _EditandoArbol || _SoloArbol || _SoloConsulta ) return;
ShowIconoAsociado( el );
return;
}else if( el.cellIndex==_SELECT ){
if( _SoloConsulta ) return;
if( _TreeON ){
_SeModTree = true;
var NEstado = (el.textContent.replace(/\s/g,'')==_ChrON ) ? _ChrOFF : _ChrON;
if( NEstado==_ChrON ){
var oi = Obj.parentNode.rowIndex;
if( _FILAS[oi].cells[_LABEL].getAttribute("tp")=='F' ){
var sId = 'n'+(parseInt(_FILAS[oi].cells[_LABEL].id.substr(1)) );
_FILAS[oi].cells[_SELECT].textContent = NEstado;
for( var i=oi+1; i<_FILAS.length; i++ ){
if( _FILAS[i].getAttribute("dlt")==null ){
if( _FILAS[i].cells[_LABEL].id > sId ){
_FILAS[i].cells[_SELECT].textContent = NEstado;
}else break;
}
}
for( var i=oi; i>0; i-- ){
if( _FILAS[i].getAttribute("dlt")==null ){
if( _FILAS[i].cells[_LABEL].id==sId ){
_FILAS[i].cells[_SELECT].textContent = NEstado;
if( sId==0 ) break;
sId = 'n'+(parseInt(sId.substr(1)) - 1 );
}
}
}
}else{
var sId = 'n'+(parseInt(_FILAS[oi].cells[_LABEL].id.substr(1)) );
for( var i=oi; i>0; i-- ){
if( _FILAS[i].getAttribute("dlt")==null ){
if( _FILAS[i].cells[_LABEL].id==sId ){
_FILAS[i].cells[_SELECT].textContent = NEstado;
if( sId==0 ) break;
sId = 'n'+(parseInt(sId.substr(1)) - 1 );
}
}
}
}
}else{
var i = Obj.parentNode.rowIndex;
var sId = _FILAS[i].cells[_LABEL].id;
_FILAS[i].cells[_SELECT].textContent = NEstado;
if( _FILAS[i].cells[_LABEL].getAttribute("tp")=='F' ){
for( v=i+1; v<_FILAS.length-1; v++ ){
if( _FILAS[v].cells[_LABEL].id <= sId ) break;
_FILAS[v].cells[_SELECT].textContent = NEstado;
}
}
}
}
return;
}else if( el.cellIndex==_MODE ){
if( _EditandoArbol || _SoloArbol || _SoloConsulta ) return;
_TD = Obj;
if( Obj.parentNode.cells[_LABEL].children.length==1 ) return;
var cDimMode = new Array();
for( var c in _DimMode ){
if( Obj.textContent == _DimModeReal[c] ){
cDimMode[c] = '<b>'+_DimMode[c]+'</b>';
}else{
cDimMode[c] = _DimMode[c];
}
}
top.eMenu( window, Obj, cDimMode, SetMode );
return;
}else if( el.cellIndex==_SHOW ){
if( _EditandoArbol || _SoloArbol || _SoloConsulta ) return;
_TD = Obj;
var cDimShow = new Array();
for( var c in _DimShow ){
if( Obj.textContent==_DimShowReal[c] || (Obj.textContent==' ' && c=='*') ){
cDimShow[c] = '<b>'+_DimShow[c]+'</b>';
}else{
cDimShow[c] = _DimShow[c];
}
}
top.eMenu( window, Obj, cDimShow, SetShow );
return;
}else if( el.cellIndex==_ALIAS ){
if( _EditandoArbol || _SoloConsulta ) return;
if( el.parentNode.getAttribute("n")!='' ){
el.innerHTML = '<input type=text value="'+S.trim(el.textContent).replace(/\"/g,'&quot;')+'" onfocusout="AsignaAlias()" size=20 maxLength=20 style="width:120px;border:0px;background:transparent;">';
el.children[0].focus();
}else top.eInfo(window,'Primero tienen que grabar la opción');
return eClearEvent();
}
}
if( Obj.children.length==1 ) Obj = Obj.parentNode.cells[_LABEL].children[0];
if( Obj==undefined ) return;
if( Obj.tagName=='IMG' ){
var tmp = Obj.src.split('_');
var Estado = tmp[tmp.length-1].substring(0,1);
var i = Obj.parentNode.parentNode.rowIndex + 1;
var oID = Obj.parentNode.id;
var sID = 'n'+(parseInt(oID.substring(1))+1);
var tTR = _FILAS.length;
if( Estado == 0 ){
Obj.src = Obj.src.replace('_0.','_1.');
while( i < tTR && (oID < _FILAS[i].cells[_LABEL].id || _FILAS[i].getAttribute("dlt")!=null ) ){
if( _FILAS[i].getAttribute("dlt")==null ) _FILAS[i++].style.display = 'none';
else i++;
}
top.eScrollTH(Container);
}else{
Obj.src = Obj.src.replace('_1.','_0.');
if( !event.ctrlKey ){
while( i < tTR && (oID < _FILAS[i].cells[_LABEL].id || _FILAS[i].getAttribute("dlt")!=null ) ){
if( _FILAS[i].getAttribute("dlt")==null ){
if( sID == _FILAS[i].cells[_LABEL].id ){
_FILAS[i].style.display = 'table-row';
if( _FILAS[i].cells[_LABEL].children.length == 1 ) _FILAS[i].cells[_LABEL].firstChild.src = _FILAS[i].cells[_LABEL].firstChild.src.replace('_0.','_1.');
}
}
i++;
}
}else{
while( i < tTR && (oID < _FILAS[i].cells[_LABEL].id || _FILAS[i].getAttribute("dlt")!=null ) ){
if( _FILAS[i].getAttribute("dlt")==null ){
_FILAS[i].style.display = 'table-row';
if( _FILAS[i].cells[_LABEL].children.length == 1 ) _FILAS[i].cells[_LABEL].firstChild.src = _FILAS[i].cells[_LABEL].firstChild.src.replace('_1.','_0.');
}
i++;
}
}
}
return;
}
if( DGI('OpEnSubVentana')!=null ){
if( !_EditandoArbol && DGI('OpEnSubVentana').valor==1 && Obj.cellIndex==_LABEL ){
if( Obj.getAttribute("HR")!=null ){
var Op = Obj.getAttribute("HR");
var i = Obj.parentNode.rowIndex-1;
while( _FILAS[i].cells[_LABEL].id == Obj.id ) i--;
var Titulo = _FILAS[i].cells[_LABEL].textContent+' · '+Obj.textContent;
if( Op.substr(Op.length-1,1) == ':' ) Op = Op + _FILAS[i].cells[_LABEL].getAttribute("HR").substr(1);
Op = _NomDF( Op );
Op = ObjDF( Op );
top.eSWOpen( window, Op, Titulo );
}
return;
}
}
if( Obj.tagName!='TD' ) return;
if( Obj.cellIndex!=0 ) return;
if( Obj.linea!=undefined ) return;
var EnSubVentana = false;
if( DGI('OpEnSubVentana')!=null ){
if( DGI('OpEnSubVentana').valor==1 ) EnSubVentana = true;
}
}
function AsignaAlias(){
var Obj = S.event(window), id = Obj.parentNode.parentNode.getAttribute("n");
Obj.parentNode.innerHTML = Obj.value.replace(/\|/g,'').replace(/\"/g,'').replace(/\'/g,'')+'&nbsp';
}
function ObjDF( HR ){
switch( HR.substring(0,1) ){
case 'F':
case '#':
HR = 'edes.php?F'+HR.substring(1,HR.length);
break;
case 'L':
case '=':
HR = 'edes.php?L'+HR.substring(1,HR.length);
break;
case 'G':
case '@':
HR = 'edes.php?G'+HR.substring(1,HR.length);
break;
case 'E':
case '>':
if( HR.indexOf('.')==-1 && HR.indexOf('&')==-1 && HR.indexOf('?')==-1 ) HR += '.php';
sHR = HR.substring(1,HR.length);
if( sHR.indexOf(':')==-1 ) HR = 'edes.php?E:'+HR.substring(1,HR.length);
else HR = 'edes.php?'+HR.substring(1,HR.length);
break;
case 'J':
case '^':
HR = HR.substring(1,HR.length);
if( HR.indexOf('?')==-1 ) HR = HR+'?';
ConSalto = true;
break;
case 'B':
HR = 'edes.php?'+HR;
break;
case '[':
}
return HR;
}
function _NomDF( HR ){
if( HR.substr(HR.length-1,1) == ')' ) return HR;
var quitar = '.?wW23?mMF';
for( var n=0; n<quitar.length; n++ ) if( HR.substring(0,1)==quitar.substr(n,1) ) HR = HR.substring(1);
var divide = '?&';
for( var n=0; n<divide.length; n++ ){
if( HR.indexOf(divide.substr(n,1)) > -1 ){
HR = HR.substring( 0, HR.indexOf(divide.substr(n,1)) );
}
}
if( HR.indexOf('.') == -1 ){
switch( HR.substring(0,1) ){
case '=': case 'L':
case '#': case 'F':
HR += '.edf';
break;
case '@': case 'G':
HR += '.gdf';
break;
case '>':
if( HR.indexOf('.')==-1 ) HR += '.php';
HR = HR.substring(1);
break;
case '^':
if( HR.indexOf('.')==-1 ) HR += '.php';
HR = '/http/'+HR.substring(1)+'.php';
break;
}
}else if( HR.substring(0,1)=='^' ){
HR = '/http/'+HR.substring(1);
}
return HR;
}
var _Buscar = new Array(), _nBuscar = 0;
function BuscarN( Entrar ){
var n = S.eventCode(event), v;
if( n==13 || n==9 || Entrar ){
_nBuscar = 0;
_Buscar = new Array();
var Buscar = S(":BUSCAR").obj.value.toUpperCase(), no=0;
for( v=_FILAS.length-1; v>=1; v-- ){
if( _FILAS[i].getAttribute("dlt")!=null ) continue;
if( _FILAS[v].cells[_LABEL].textContent.toUpperCase().indexOf(Buscar)>-1 ){
_FILAS[v].cells[4].style.backgroundColor = 'red';
_Buscar[_nBuscar++] = v;
no++;
}else{
_FILAS[v].cells[4].style.backgroundColor = '';
}
}
S(":ENCONTRADOS").obj.value = no;
}
}
function aClearBuscar(){
for( var v=_FILAS.length-1; v>=1; v-- ){
_FILAS[v].cells[4].style.backgroundColor = "";
_FILAS[v].cells[_LABEL].style.color = "";
}
S(":BUSCAR").obj.value = S(":ENCONTRADOS").obj.value = '';
}
function VerTodo(){
_XY = top.eXY( S.event(window) );
Procesando(1);
setTimeout('_VerTodo()',1);
}
function _VerTodo(){
for( var v=_FILAS.length-1; v>=1; v-- ){
if( _FILAS[v].getAttribute("n")<0 || _FILAS[v].getAttribute("dlt")!=null ) continue;
_FILAS[v].cells[4].style.backgroundColor = '';
_FILAS[v].style.display = 'table-row';
if( _FILAS[v].cells[_LABEL].children.length==1 ) _FILAS[v].cells[_LABEL].firstChild.src = _FILAS[v].cells[_LABEL].firstChild.src.replace('_1.','_0.');
}
Procesando(0);
}
function VerResumen(){
_XY = top.eXY( S.event(window) );
Procesando(1);
setTimeout('_VerResumen()',1);
}
function _VerResumen(){
for( var v=_FILAS.length-1; v>=1; v-- ){
if( _FILAS[v].getAttribute("n")<0 || _FILAS[v].getAttribute("dlt")!=null ) continue;
_FILAS[v].cells[4].style.backgroundColor = '';
if( _FILAS[v].cells[_LABEL].id=='n0' ){
_FILAS[v].style.display = 'table-row';
if( _FILAS[v].cells[_LABEL].children.length == 1 ) _FILAS[v].cells[_LABEL].firstChild.src = _FILAS[v].cells[_LABEL].firstChild.src.replace('_0.','_1.');
}else{
_FILAS[v].style.display = 'none';
}
}
S("#Container").obj.scrollTop = 0;
setTimeout(function(){
top.eScrollTH(S("#BROWSE").obj.parentNode);
}, 1);
Procesando(0);
}
function Ver2Resumen(){
_XY = top.eXY( S.event(window) );
Procesando(1);
setTimeout('_Ver2Resumen()',1);
}
function _Ver2Resumen(){
for( var v=_FILAS.length-1; v>=1; v-- ){
if( _FILAS[v].getAttribute("n")<0 || _FILAS[v].getAttribute("dlt")!=null ) continue;
_FILAS[v].cells[4].style.backgroundColor = '';
if( _FILAS[v].cells[_LABEL].id < 'n2' ){
_FILAS[v].style.display = 'table-row';
if( _FILAS[v].cells[_LABEL].children.length == 1 ){
if( _FILAS[v].cells[_LABEL].id=='n1' ){
_FILAS[v].cells[_LABEL].firstChild.src = _FILAS[v].cells[_LABEL].firstChild.src.replace('_0.','_1.');
}else{
_FILAS[v].cells[_LABEL].firstChild.src = _FILAS[v].cells[_LABEL].firstChild.src.replace('_1.','_0.');
}
}
}else{
_FILAS[v].style.display = 'none';
}
}
S("#Container").obj.scrollTop = 0;
setTimeout(function(){
top.eScrollTH(S("#BROWSE").obj.parentNode);
}, 1);
Procesando(0);
}
var _VerTreeUOp = false;
function VerTree(){
_XY = top.eXY( S.event(window) );
Procesando(1);
setTimeout('_VerTree()',1);
}
function _VerTree(){
_VerTreeUOp = true;
var Dim = new Array(),i=0;
for( var v=_FILAS.length-1; v>=1; v-- ){
if( _FILAS[v].getAttribute("dlt")!=null ) continue;
try{
_FILAS[v].cells[4].style.backgroundColor = '';
if( _FILAS[v].cells[_SELECT].textContent.replace(/\s/g,'')==_ChrON ){
_FILAS[v].style.display = 'table-row';
if( _FILAS[v].cells[_LABEL].getAttribute("tp")=='F' ) _FILAS[v].cells[_LABEL].firstChild.src = _FILAS[v].cells[_LABEL].firstChild.src.replace('_1.','_0.');
Dim[i++] = v;
}else{
_FILAS[v].style.display = 'none';
if( _FILAS[v].cells[_LABEL].getAttribute("tp")=='F' ) _FILAS[v].cells[_LABEL].firstChild.src = _FILAS[v].cells[_LABEL].firstChild.src.replace('_0.','_1.');
}
}catch(e){
_FILAS[v].cells[4].style.backgroundColor = 'red';
}
}
for( var o=0; o<Dim.length; o++ ){
v = Dim[o];
var sId = 'n'+(parseInt(_FILAS[v].cells[_LABEL].id.substr(1))-1 );
for( var i=v-1; i>=0; i-- ){
if( _FILAS[i].getAttribute("dlt")==null ){
if( _FILAS[i].cells[_LABEL].id==sId ){
if( _FILAS[i].cells[_SELECT].textContent.replace(/\s/g,'')!=_ChrON ){
_FILAS[i].style.display = 'table-row';
if( _FILAS[i].cells[_LABEL].getAttribute("tp")=='F' ) _FILAS[i].cells[_LABEL].firstChild.src = _FILAS[i].cells[_LABEL].firstChild.src.replace('_1.','_0.');
_FILAS[i].cells[4].style.backgroundColor = '#ffffcc';
}
if( sId==0 ) break;
sId = 'n'+(parseInt(sId.substr(1)) - 1 );
}
}
}
}
S("#Container").obj.scrollTop = 0;
setTimeout(function(){
top.eScrollTH(S("#BROWSE").obj.parentNode);
}, 1);
Procesando(0);
}
function MarcarOpSinMode(){
_XY = top.eXY( S.event(window) );
Procesando(1);
setTimeout('_MarcarOpSinMode()',1);
}
function _MarcarOpSinMode(){
_VerTreeUOp = false;
for( var v=_FILAS.length-1; v>=1; v-- ){
if( _FILAS[v].getAttribute("dlt")!=null ) continue;
_FILAS[v].style.display = 'table-row';
_FILAS[v].cells[4].style.backgroundColor = (_FILAS[v].cells[_LABEL].getAttribute("tp")=='O' && _FILAS[v].cells[_MODE].textContent.replace(/\s/g,'')=='')? '#ffffcc':'';
}
S("#Container").obj.scrollTop = 0;
setTimeout(function(){
top.eScrollTH(S("#BROWSE").obj.parentNode);
}, 1);
Procesando(0);
}
function MarcarTree(){
_XY = top.eXY( S.event(window) );
Procesando(1);
setTimeout('_MarcarTree()',1);
}
function _MarcarTree(){
_VerTreeUOp = false;
for( var v=_FILAS.length-1; v>=1; v-- ){
if( _FILAS[v].getAttribute("dlt")!=null ) continue;
_FILAS[v].style.display = 'table-row';
if( _FILAS[v].cells[_LABEL].getAttribute("tp")=='F' ) _FILAS[v].cells[_LABEL].firstChild.src = _FILAS[v].cells[_LABEL].firstChild.src.replace('_1.','_0.');
_FILAS[v].cells[4].style.backgroundColor = (_FILAS[v].cells[_SELECT].textContent.replace(/\s/g,'')==_ChrON)? '#ffffcc':'';
}
S("#Container").obj.scrollTop = 0;
setTimeout(function(){
top.eScrollTH(S("#BROWSE").obj.parentNode);
}, 1);
Procesando(0);
}
function _CambiaTF(){
var Obj = S.event(window);
if( Obj.src.indexOf('_1.') > -1  ){
Obj.src = Obj.src.replace('_1.','_0.');
Obj.valor = 0;
}else{
Obj.src = Obj.src.replace('_0.','_1.');
Obj.valor = 1;
}
if( Obj.id=='VerStatus' ){
for( var n=6; n<6+3; n++ ) S("#BROWSE").obj.children[0].children[n].style.display = (Obj.valor==1)?'block':'none';
}
}
function EsTab(){
if( S.eventCode(event)==9 ){
Buscar()
return false;
}
return true;
}
var _Buscar = new Array(), _nBuscar = 0, _nSeek = 0;
var _Cursor = -1;
function Buscar( Entrar ){
_SeBusco = true;
var n = S.eventCode(event), v;
if( n==13 || n==9 || Entrar ){
if( _Cursor!=-1 ){
_FILAS[_Cursor].cells[_LABEL].style.color = "";
_Cursor = -1;
}
_nBuscar = 0;
_nSeek = 0;
_Buscar = new Array();
var Buscar = S.trim(S(":BUSCAR").obj.value.toUpperCase()), no=0;
if( Buscar=='' ) return;
if( Buscar==(Buscar*1) ){
no = S("#BROWSE TR[n='"+Buscar+"']");
if( no.length>0 ){
no.block("table-row");
no.obj.cells[4].style.backgroundColor = "#ffffcc";
S("#Container").obj.scrollTop = no.obj.offsetTop-75;
setTimeout(function(){
no.obj.cells[4].style.backgroundColor = "";
}, 1000);
}else{
S.info("Opción no encontrada", 3);
}
}else{
for( v=_FILAS.length-1; v>=1; v-- ){
if( _FILAS[v].cells[_LABEL].textContent.toUpperCase().indexOf(Buscar) > -1 ){
_FILAS[v].cells[4].style.backgroundColor = '#ffffcc';
_Buscar[_nBuscar++] = v;
no++;
}else{
_FILAS[v].cells[4].style.backgroundColor = '';
}
}
S(":ENCONTRADOS").obj.value = no;
if( no==0 ) top.eInfo(window,'No se ha encontrado ninguna opción.');
}
}
}
var _SeBusco = false;
function Siguiente( Accion ){
if( Accion==0 && !_SeBusco ){
if( S(":BUSCAR").obj.value!='' ){
try{ event.keyCode = 13; }catch(e){}
Buscar();
Siguiente( Accion );
}
return;
}
_SeBusco = false;
if( _Cursor!=-1 ) _FILAS[_Cursor].cells[_LABEL].style.color = "";
if( Accion==0 ){
_nSeek = 0;
}else{
_nSeek += Accion;
if( _nSeek<0 ) _nSeek = _Buscar.length-1;
if( _nSeek>=_Buscar.length ) _nSeek = 0;
}
var v = _Buscar.length - _nSeek - 1;
if( v==-1 || _Buscar.length==0 ) return;
v = sv = _Buscar[v];
var sId = _FILAS[v].cells[_LABEL].id;
_Cursor = _FILAS[v].rowIndex;
while( sId==_FILAS[sv].cells[_LABEL].id && sv<_FILAS.length ){
_FILAS[sv++].style.display = 'table-row';
}
sv = v-1;
var EsElPadre = -1;
while( sId!='n0' && sv>=0 ){
if( sId == _FILAS[sv].cells[_LABEL].id ){
_FILAS[sv].style.display = 'table-row';
}else if( sId > _FILAS[sv].cells[_LABEL].id ){
if( EsElPadre == -1 ) EsElPadre = sv;
sId = _FILAS[sv].cells[_LABEL].id;
_FILAS[sv].style.display = 'table-row';
if( _FILAS[sv].cells[_LABEL].children.length == 1 ) _FILAS[sv].cells[_LABEL].firstChild.src = _FILAS[sv].cells[_LABEL].firstChild.src.replace('_1.','_0.');
var h = sv+1;
while( sId<=_FILAS[h].cells[_LABEL].id && _FILAS[h].cells[_LABEL].id!='n0' && h<_FILAS.length ){
if( sId==_FILAS[h].cells[_LABEL].id ) _FILAS[h].style.display = 'table-row';
h++;
}
}
sv--;
}
if( EsElPadre == -1 ){
S("#Container").obj.scrollTop = _FILAS[v].offsetTop-75;
}else{
S("#Container").obj.scrollTop = _FILAS[EsElPadre].offsetTop-75;
}
_FILAS[_Cursor].cells[_LABEL].style.color = "chocolate";
}
var _SetIconoAsociado = null;
function ShowIconoAsociado( Obj ){
var Obj2 = S.event(window);
if( Obj2.tagName=='IMG' ) Obj2 = Obj2.parentNode;
if( Obj2.parentNode.parentNode.parentNode.id!='BROWSE' ) Obj2 = Obj2.parentNode.parentNode.parentNode.parentNode;
_SetIconoAsociado = Obj;
var el = S("#ICONS").obj.rows, n, xy = top.eXY(Obj);
for( n=1; n<el.length-1; n++ ){
el[n].cells[0].textContent = ( (','+Obj.getAttribute("ic")+',').indexOf(','+el[n].getAttribute("pk")+',') > -1 ) ? _ChrON : _ChrOFF;
el[n].cells[0].style.width = "10px";
}
S("#ICONS").obj.style.display = "block";
if( xy[0]+S("#ICONS").obj.offsetWidth  > document.body.clientWidth  ) xy[0] = xy[0] + Obj2.offsetWidth  - S("#ICONS").obj.offsetWidth;
if( xy[1]+S("#ICONS").obj.offsetHeight > document.body.clientHeight ) xy[1] = xy[1] + Obj2.offsetHeight - S("#ICONS").obj.offsetHeight;
if( xy[1]<0 ){
xy[1] = (document.body.clientHeight - S("#ICONS").obj.offsetHeight)/2;
if( xy[1]<0 ) xy[1] = 0;
}
with( S("#ICONS").obj.style ){
left = px(xy[0]);
top = px(xy[1]);
}
}
function SetIconoAsociado(){
var Obj = S.event(window);
if( Obj.tagName=='IMG' ) Obj = Obj.parentNode;
if( Obj.tagName!='TD' ) return;
if( Obj.cellIndex > 2 ) return;
while( Obj.tagName!='TR' ) Obj = Obj.parentNode;
if( Obj.rowIndex==0 ) return;
if( Obj.cells[0].colSpan > 1 ) return;
if( Obj.id=='NO' ) return;
Obj.cells[0].textContent =  ( Obj.cells[0].textContent.replace(/\s/g,'')==_ChrON ) ? _ChrOFF : _ChrON;
}
function SaveIconoAsociado(){
if( _SetIconoAsociado.children.length > 0 ) _SetIconoAsociado.textContent = '&nbsp;';
var txt = '<table id=LstICON border=0px cellspacing=0px cellpadding=1px><tr>', xIC='';
var el = S("#ICONS").obj.rows, n, i=0;
for( n=0; n<el.length-1; n++ ){
if( el[n].cells[0].textContent.replace(/\s/g,'')==_ChrON ){
if( el[n].cells[1].children.length==0 ){
txt += '<td><img src="edes.php?R:$a/g/inputext.gif"></td>';
}else{
txt += '<td><img src="'+el[n].cells[1].children[0].src+'"></td>';
}
if( i>0 ) xIC += ',';
xIC += el[n].getAttribute("pk")+'';
i++;
}
}
txt += '</tr></table>';
_SetIconoAsociado.innerHTML = txt;
_SetIconoAsociado.setAttribute("ic", xIC);
S("#ICONS").obj.style.display = "none";
}
function _opAlta(Op, DimValores, DatosAdicionales, DimObj){
if( Op==null || Op!=2 ) return;
function tdHidden(TR){
TR.cells[ 6].style.display = '<?=(($_StatusON ==true)?'':'none')?>';
TR.cells[ 7].style.display = '<?=(($_StatusON ==true)?'':'none')?>';
TR.cells[ 8].style.display = '<?=(($_StatusON ==true)?'':'none')?>';
TR.cells[ 9].style.display = '<?=(($_GET['_GEST']=="ALL")?'':'none')?>';
TR.cells[10].style.display = '<?=(($_WithDoc  ==true)?'':'none')?>';
}
for(var i in DimValores) DimValores[S.mid(i,5,0)] = DimValores[i];
var error = uCheckOp(DimValores);
if( error!="" ) return error;
if( DimValores[1]=='' && DimValores[2]=='' && DimValores[0]!='L' ) return;
document.body.style.visibility = 'hidden';
for(var n=0; n<DimValores.length; n++) DimValores[n] = DimValores[n].replace(/'/g,'"');
if( _FILAS.length==1 ){
_FilaPulsada = _FILAS[0];
var id = 'n0';
var HR = '';
var Nivel = 0;
}else{
var id = _FilaPulsada.cells[4].id;
var HR = _FilaPulsada.cells[4].getAttribute("HR");
var Nivel = parseInt(id.substr(1));
}
if( DimValores[0]=='L' ){
if( DimValores[2]=='' ) DimValores[2] = '-';
else if( DimValores[2]!='' && DimValores[2].substr(0,1)!='-' ) DimValores[2] = '-'+DimValores[2];
}
if( DimValores[0]!='F' && DimValores[5]!='' ){
if( DimValores[4]=='' ){
DimValores[5] = '';
}else if( DimValores[4].substr(0,1)!=':' ){
DimValores[5] = '';
}else{
DimValores[0] = 'F';
}
}
if(       DimValores[0]=='F' && HR.substr(0,1)==':' ){
}else if( DimValores[0]=='F' && HR.substr(0,1)!=':' ){
}else if( DimValores[0]=='O' && HR.substr(0,1)==':' ){
Nivel++;
}else if( DimValores[0]=='O' && HR.substr(0,1)!=':' ){
}
id = 'n'+Nivel;
if( DimValores[2]=='-' && DimValores[4]=='' ) DimValores[0] = 'L';
for( var o=2; o<=4; o++ ){
if( DimValores[o].indexOf('|')>-1 ) top.eInfo(window,'El caracter "|" no está permitido');
DimValores[o] = DimValores[o].replace(/\|/g,'');
}
var TR = S("#BROWSE").obj.insertRow(_FilaPulsada.rowIndex+1), TD;
TR.setAttribute("n","");
TR.insertCell(0).textContent = 'D';
TR.cells[0].id = "stD";
TR.insertCell(1).textContent = ' ';
TD = TR.insertCell(2);
TD.setAttribute("Icon", DimValores[1]);
var iconBox = TD;
if( DimValores[1]=="" ){
TD.innerHTML = '&nbsp;';
}else if( S.fileType(DimValores[1])=="svg" ){
setTimeout(function(){
S.call("edes.php?E:$a/u/op.gs&_SVG="+DimValores[1], "", {function:function(svg){
if( S.left(svg,4)=="<svg" ){
iconBox.innerHTML = svg;
}
}});
}, 1);
}else{
TD.innerHTML = '<img src="'+DimValores[1].replace('$','edes.php?R:$a/g/')+'">';
}
TR.insertCell(3).textContent = _ChrOFF;
TD = TR.insertCell(4);
if( DimValores[0]=='F' ){
TD.innerHTML = '<img src=g/tree_0.gif>'+DimValores[2];
}else{
if( DimValores[0]=='L' ){
TD.setAttribute("HR", "");
if( DimValores[2]=='' || DimValores[2]=='-' ){
TD.innerHTML = '<img src=g/linea.gif width=100% height=2px>';
}else if( DimValores[2].substr(0,1)=='-' ){
TD.innerHTML = '<img src=g/linea.gif width=30px height=2px>'+DimValores[2].substr(1)+'<img src=g/linea.gif width=30px height=2px>';
}else{
TD.textContent = DimValores[2];
}
}else{
TD.textContent = DimValores[2];
}
}
TD.setAttribute("tp", DimValores[0]);
TD.title = DimValores[3];
TD.setAttribute("HR", DimValores[4]);
TD.id = id;
TD = TR.insertCell(5);
TD.textContent = ' ';
TD.setAttribute("ic", '');
TR.insertCell( 6).textContent = ' ';
TR.insertCell( 7).textContent = ' ';
TR.insertCell( 8).textContent = ' ';
TR.insertCell( 9).textContent = ' ';
TR.insertCell(10).textContent = ' ';
tdHidden(TR);
if( DimValores[5]!='' ){
id = 'n'+(Nivel+1);
for(var o=0; o<DimValores[5].length; o++){
var xMode = _iDimModeReal[DimValores[5].substr(o,1)];
TR = S("#BROWSE").obj.insertRow(_FilaPulsada.rowIndex+2+o);
TR.setAttribute("n","");
TR.insertCell( 0).textContent = 'D';
TR.cells[0].id = "stD";
TD = TR.insertCell(1);
TD.textContent = _DimModeReal[xMode];
TD.id = 'mc'+xMode;
TD = TR.insertCell(2);
TD.setAttribute("Icon", '');
TD.textContent = ' ';
TR.insertCell( 3).textContent = _ChrOFF;
TD = TR.insertCell(4);
TD.textContent = _DimMode[xMode];
TD.setAttribute("tp", 'O');
TD.title = '';
if( DimValores[4].indexOf('.gdf')>-1 ){
TD.setAttribute("HR", _UrlOp[xMode].replace('#','@'));
}else{
TD.setAttribute("HR", _UrlOp[xMode]);
}
TD.id = id;
TD = TR.insertCell( 5);
TD.textContent = ' ';
TD.setAttribute("ic", '');
for(var i=6; i<11; i++) TR.insertCell(i).textContent = ' ';
tdHidden(TR);
}
}
document.body.style.visibility = 'visible';
_SeModOpciones = true;
}
function opAlta(){
S.alert({
title:"ALTA",
button:"A,C",
form:[
["Type       | | D | S | 10 || M |O|#|", [['F','Folder'], ['O','Option'], ['L','Separator']] ],
["Icon       | | # | T | 80 || M | | |"],
["Caption    | | # | T | 80 || M | | |"],
["Title      | | # | T | 80 || M | | |"],
["Script URL | | # | T | 80 || M | | |"],
["Option Add | | # | T |  4 || M | | |"]
],
function: _opAlta,
});
}
function eLTrim( txt ){
return txt.replace(/^\s+/g,'');
}
function _opImportar( Op, DimValores, DatosAdicionales, DimObj ){
if( Op==null || Op!=2 ) return;
if( S.trim(DimValores[1])=='' ) return;
top.eInfo(window,'Importando...');
var Tipo = '', Caption='', HRef = '', id='', DesdeNivel = 1, xMode='';
var DesdeNivel = S("#BROWSE").obj.rows[_oMenu.rowIndex].cells[4].id.substr(1,10) * 1;
if( DimValores[0]=='S' ) DesdeNivel = DesdeNivel + 1;
var txt = DimValores[1], buff, long, tmp, Nivel, i, Dato, Indice=0;
txt = txt.split(/\n/);
for( n=0; n<txt.length; n++ ){
buff = txt[n].split('~');
buff = buff[0];
if( S.trim(buff)=='' ) continue;
Indice = Indice + 1;
Nivel = 0;
for( i=0; i<buff.length; i++ ){
if( buff.substr(i,1)==String.fromCharCode(9) ){
Nivel = Nivel+1;
}else{
break;
}
}
Dato = buff.split('|');
Caption = S.trim(Dato[0]).replace(/'/g,'"');
if( Dato.length==1 ){
if( Caption=='-' ){
Caption = S.trim(Caption).substr(0,90);
Tipo = 'L';
}else{
Tipo = 'F';
}
HRef = '';
}else{
HRef = S.trim(Dato[1]).replace(/'/g,'"');
if( HRef.substr(0,1)==':' ){
Tipo = 'F';
}else{
Tipo = 'O';
}
}
id = 'n'+(Nivel+DesdeNivel);
TR = S("#BROWSE").obj.insertRow(_oMenu.rowIndex+Indice);
TR.setAttribute("n","");
TD = TR.insertCell(0);
if( Tipo=='O' ){
TD.textContent = 'D';
TD.id = 'stD';
}else{
TD.textContent = ' ';
}
TD = TR.insertCell(1);
TD.textContent = '';
TD.id = '';
if( Tipo=='O' &&  _iDimModeReal[HRef.substr(1,1).toUpperCase()]!=undefined ){
TD.textContent = _DimModeReal[ _iDimModeReal[HRef.substr(1,1).toUpperCase()] ];
TD.id = 'mc'+_iDimModeReal[HRef.substr(1,1).toUpperCase()];
}
TD = TR.insertCell(2);
TD.setAttribute("Icon", '');
TD.textContent = ' ';
TR.insertCell(3).textContent = _ChrOFF;
TD = TR.insertCell(4);
if( Tipo=='F' ){
TD.innerHTML = '<img src=g/tree_0.gif>'+Caption;
}else if( Tipo=='L' ){
TD.setAttribute("HR",'');
if( Caption=='' ){
TD.innerHTML = '<img src=g/linea.gif width=100% height=2px>';
}else{
TD.innerHTML = '<img src=g/linea.gif width=30px height=2px>'+Caption+'<img src=g/linea.gif width=30px height=2px>';
}
}else{
TD.innerHTML = Caption;
}
TD.setAttribute("tp", Tipo);
TD.title = '';
TD.setAttribute("HR", HRef);
TD.id = id;
TD = TR.insertCell(5);
TD.textContent = ' ';
TD.setAttribute("ic", '');
for( i=6; i<11; i++ ) TR.insertCell(i).textContent = ' ';
}
top.eInfoHide();
}
function opImportar(){
if( _oMenu.tagName!='TR' ) _oMenu = _oMenu.parentNode;
top.eAlert( "IMPORTAR OPCIONES", "", "accept,cancel", null, _opImportar, Array(
Array('Type', 7, {'S':'Hijo', 'B':'Hermano'}, 'S' ),
Array('Tree', '80,10', _ChrTextArea )
) );
}
function _opModifica( Op, DimValores, DatosAdicionales, DimObj ){
if( Op==null || Op!=2 ) return;
for(var i in DimValores) DimValores[S.mid(i,5,0)] = DimValores[i];
var error = uCheckOp(DimValores);
if( error!="" ) return error;
for( var n=0; n<DimValores.length; n++ ) DimValores[n] = DimValores[n].replace(/'/g,'"');
if( DimValores[0]=='L' && DimValores[2]=='' ) DimValores[2] = '-';
var id = _FilaPulsada.cells[4].id;
var HR = _FilaPulsada.cells[4].getAttribute("HR");
var Nivel = parseInt(id.substr(1));
if(       DimValores[0]=='F' && HR.substr(0,1)==':' ){
}else if( DimValores[0]=='F' && HR.substr(0,1)!=':' ){
}else if( DimValores[0]=='O' && HR.substr(0,1)==':' ){
}else if( DimValores[0]=='O' && HR.substr(0,1)!=':' ){
}
id = 'n'+Nivel;
if( DimValores[0]=='L' ){
if( DimValores[2]=='' ) DimValores[2] = '-';
else if( DimValores[2]!='' && DimValores[2].substr(0,1)!='-' ) DimValores[2] = '-'+DimValores[2];
}
for( var o=2; o<=4; o++ ){
if( DimValores[o].indexOf('|')>-1 ) top.eInfo(window,'El caracter "|" no está permitido');
DimValores[o] = DimValores[o].replace(/\|/g,'');
}
var TR = _FilaPulsada, TD;
TD = TR.cells[2];
TD.setAttribute("Icon", DimValores[1]);
var iconBox = TD;
if( DimValores[1]=="" ){
TD.innerHTML = '&nbsp;';
}else if( S.fileType(DimValores[1])=="svg" ){
setTimeout(function(){
S.call("edes.php?E:$a/u/op.gs&_SVG="+DimValores[1], "", {function:function(svg){
if( S.left(svg,4)=="<svg" ){
iconBox.innerHTML = svg;
}
}});
}, 1);
}else{
TD.innerHTML = '<img src="'+DimValores[1].replace('$','edes.php?R:$a/g/')+'">';
}
TD = TR.cells[4];
if( DimValores[4].substr(0,1)==':' ) DimValores[0] = 'F';
if( DimValores[0]=='F' ){
TD.innerHTML = '<img src=g/tree_0.gif>'+DimValores[2];
}else{
if( DimValores[0]=='L' ){
TD.setAttribute("HR", '');
if( DimValores[2]=='' || DimValores[2]=='-' ){
TD.innerHTML = '<img src=g/linea.gif width=100% height=2px>';
}else if( DimValores[2].substr(0,1)=='-' ){
TD.innerHTML = '<img src=g/linea.gif width=30px height=2px>'+DimValores[2].substr(1)+'<img src=g/linea.gif width=30px height=2px>';
}else{
TD.textContent = DimValores[2];
}
}else{
TD.textContent = DimValores[2];
}
}
TD.setAttribute("tp", DimValores[0]);
TD.title = DimValores[3];
TD.setAttribute("HR", DimValores[4]);
TD.id = id;
_SeModOpciones = true;
}
function opModifica(){
var Icon = _FilaPulsada.cells[2].getAttribute("Icon"),
Label = _FilaPulsada.cells[4].textContent,
Type = _FilaPulsada.cells[4].getAttribute("tp"),
HR = _FilaPulsada.cells[4].getAttribute("hr"),
Title = _FilaPulsada.cells[4].title;
if( Type=='L' ) Label = '-'+Label;
S.alert({
title:"MODIFICACION",
button:"A,C",
form:[
["Type       | | D | S | 10 || M |"+Type +"|#|", [['F','Folder'], ['O','Option'], ['L','Separator']] ],
["Icon       | | # | T | 80 || M |"+Icon +"| |"],
["Caption    | | # | T | 80 || M |"+Label+"| |"],
["Title      | | # | T | 80 || M |"+Title+"| |"],
["Script URL | | # | T | 80 || M |"+HR	 +"| |"]
],
function: _opModifica,
});
}
function uCheckOp(Entradas){
var error = [];
if( Entradas[0]!='L' && Entradas[2]=='' ){
error.push('Falta introducir el "<b>Caption</b>"');
}
if( Entradas[0]=='O' && Entradas[4]=='' ){
error.push('Falta introducir el "<b>Script URL</b>"');
}
if( Entradas[0]!='F' && Entradas.length==6 && Entradas[5]!='' ){
error.push('No nuede estar relleno "<b>Option Add</b>"');
}
return error.join("<br>");
}
function _opView(){}
function opView(){
var Icon = _FilaPulsada.cells[2].getAttribute("Icon"),
Label = _FilaPulsada.cells[4].textContent,
Type = _FilaPulsada.cells[4].getAttribute("tp"),
HR = _FilaPulsada.cells[4].getAttribute("hr"),
Title = _FilaPulsada.cells[4].title;
if( Type=='L' ) Label = '-'+Label;
S.alert({
title:"CONSULTA",
button:"A",
form:[
["Type       | | D | S | 10 || - |"+Type +"|#|", [['F','Folder'], ['O','Option'], ['L','Separator']] ],
["Icon       | | # | T | 80 || - |"+Icon +"| |"],
["Caption    | | # | T | 80 || - |"+Label+"|#|"],
["Title      | | # | T | 80 || - |"+Title+"| |"],
["Script URL | | # | T | 80 || - |"+HR	 +"| |"]
]
});
}
var _DimUnlink=[];
function _UnLink(){
var t = _DimUnlink.length, n, o;
if( t>0 ){
for(n=t-1; n>=0; n--){
if( _DimUnlink[n]!=null ){
o = S("#BROWSE TR[n='"+_DimUnlink[n]+"']");
o.attr("n", _DimUnlink[n]);
o.block("table-row");
_DimUnlink[n] = null;
S.info('Opción "'+o.obj.cells[4].innerHTML+'" recuperada');
S("#Container").obj.scrollTop = o.obj.offsetTop-75;
o.obj.cells[4].style.backgroundColor = "red";
setTimeout(function(){
o.obj.cells[4].style.backgroundColor = "";
}, 1000);
return;
}
}
}
S.info("No hay opciones para recuperar");
}
function _opDelete( Op){
if( Op==null || Op!=2 ) return;
if( _FilaPulsada.getAttribute("n")!='' ){
_FilaPulsada.setAttribute("n", parseInt(_FilaPulsada.getAttribute("n"))*-1);
_FilaPulsada.setAttribute("dlt", 1);
_DimUnlink.push(_FilaPulsada.getAttribute("n"));
}else{
S("#BROWSE").obj.deleteRow(_FilaPulsada.rowIndex);
return;
}
_FilaPulsada.style.display = 'none';
_FilaPulsada.cells[4].style.backgroundColor = '#993300';
_SeModOpciones = true;
}
function opDelete(){
var Icon = _FilaPulsada.cells[2].getAttribute("Icon"),
Label = _FilaPulsada.cells[4].textContent,
Type = _FilaPulsada.cells[4].getAttribute("tp"),
HR = _FilaPulsada.cells[4].getAttribute("hr"),
Title = _FilaPulsada.cells[4].title;
if( Type=='L' ) Label = '-'+Label;
S.alert({
title:"BORRAR",
button:"A,C",
form:[
["Type       | | D | S | 10 || - |"+Type +"|#|", [['F','Folder'], ['O','Option'], ['L','Separator']] ],
["Icon       | | # | T | 80 || - |"+Icon +"| |"],
["Caption    | | # | T | 80 || - |"+Label+"|#|"],
["Title      | | # | T | 80 || - |"+Title+"| |"],
["Script URL | | # | T | 80 || - |"+HR	 +"| |"]
],
function: _opDelete
});
}
function Procesando(e){
if( e ){
with( PROCESANDO.style ){
top = px(_XY[1]);
left = px(_XY[0]);
display = 'block';
}
}else{
PROCESANDO.style.display = 'none';
}
}
function opSave(){
if( _EditandoArbol ) return;
_XY = top.eXY( S.event(window) );
top.eAlert( S.lng(210), "Grabar las opciones", "accept,cancel", 'DH', _opSaveOk );
}
function _opSaveOk( Op ){
if( Op==2 ){
S("#IcoGrabar").obj.style.visibility = 'hidden';
Procesando(1);
top.eAlert( "", "Grabando 0%", "-", "g/sys_save.gif" );
setTimeout('_opSave()',500);
}
}
function _opSave(){
var txt = '', oID = aID = nErrores = TReg = 0, v, Borradas = new Array(), oCaption='', LineaErronea=-1, xError="";
for(v=1; v<_FILAS.length-1; v++){
if( _FILAS[v].getAttribute("dlt")!=null && _FILAS[v].getAttribute("dlt")==-1 ){
continue;
}else{
aID = parseInt(_FILAS[v].cells[_LABEL].id.substr(1));
if( v>1 ){
if( _FILAS[v].cells[_LABEL].getAttribute("tp")!='F' && _FILAS[v-1].cells[_LABEL].getAttribute("tp")!='F' ){
if( parseInt(_FILAS[v].cells[_LABEL].id.substr(1)) > parseInt(_FILAS[v-1].cells[_LABEL].id.substr(1)) ){
if( LineaErronea==-1 ){
LineaErronea = v;
xError = 'Error en los niveles de las opciones:<br>Nivel "'+oID+'" de la opción <b>"'+oCaption+'"<br>Nivel "</b>'+aID+'" de la opción <b><span style="color:red">"'+_FILAS[v].cells[_LABEL].textContent+'"</span></b>';
}
nErrores++;
_FILAS[v].cells[4].style.backgroundColor = 'rgba(252, 0, 0, 0.15)';
_FILAS[v].style.display = 'table-row';
}
}
if( _FILAS[v-1].cells[_LABEL].getAttribute("tp")=="O" && _FILAS[v-1].cells[_LABEL].id.substr(1)<_FILAS[v].cells[_LABEL].id.substr(1) ){
if( LineaErronea==-1 ){
LineaErronea = v;
xError = 'El padre de la opción no puede ser otra opción:<br>Nivel "'+_FILAS[v-1].cells[_LABEL].id.substr(1)+'" de la opción <b>"'+_FILAS[v-1].cells[_LABEL].textContent+'"</b><br>Nivel "'+_FILAS[v].cells[_LABEL].id.substr(1)+'" de la opción <b><span style="color:red">"'+_FILAS[v].cells[_LABEL].textContent+'"</span></b>';
}
nErrores++;
_FILAS[v].cells[4].style.backgroundColor = 'rgba(252, 0, 0, 0.15)';
_FILAS[v].style.display = 'table-row';
}
}
if( aID > (oID+1) || _FILAS[v].cells[_LABEL].id.length < 2){
if( LineaErronea==-1 ){
LineaErronea = v;
xError = 'Error en los niveles de las opciones:<br>Nivel "'+oID+'" de la opción <b>"'+oCaption+'"</b><br>Nivel "'+aID+'" de la opción <b><span style="color:red">"'+_FILAS[v].cells[_LABEL].textContent+'"</span></b>';
}
nErrores++;
_FILAS[v].cells[4].style.backgroundColor = 'rgba(252, 0, 0, 0.15)';
_FILAS[v].style.display = 'table-row';
}
oID = aID;
oCaption = _FILAS[v].cells[_LABEL].textContent;
sShow = _FILAS[v].cells[0].textContent.replace(/\s/g,'');
sMode = _FILAS[v].cells[1].textContent.replace(/\s/g,'');
sShow = _iDimShowReal[sShow]; if( sShow==undefined ) sShow = '';
sMode = _iDimModeReal[sMode]; if( sMode==undefined ) sMode = '';
if( sMode=='u' ){
}
if( _FILAS[v].getAttribute("n")<0 ) Borradas[Borradas.length] = v;
TReg++;
txt += _FILAS[v].getAttribute("n")						+'|'+
sShow											+'|'+
sMode											+'|'+
_FILAS[v].cells[_ICON].getAttribute("Icon")		+'|'+
_FILAS[v].cells[_LABEL].id.substr(1)			+'|'+
_FILAS[v].cells[_LABEL].getAttribute("tp")		+'|'+
_FILAS[v].cells[_LABEL].textContent				+'|'+
_FILAS[v].cells[_LABEL].getAttribute("HR")		+'|'+
_FILAS[v].cells[_LABEL].title					+'|'+
_FILAS[v].cells[_ICONS].getAttribute("ic")		+'|'+
S.trim(S.replace(_FILAS[v].cells[_ALIAS].textContent, "&nbsp;",""))		+'\n';
}
}
if( nErrores==0 ){
for( v=Borradas.length-1; v>=0; v-- ) S("#BROWSE").obj.deleteRow(Borradas[v]);
_FILAS = S("#BROWSE").obj.rows;
var sHtm = "<?=eHTML('','','',true)?></HEAD><BODY>";
sHtm += "<FORM METHOD='POST' ACTION='edes.php?E:$a/u/op.gs' target=TLF>";
sHtm += "<INPUT NAME='IsUTF8' value='Ñ'>";
sHtm += "<TEXTAREA NAME='grabar' COLS=48 ROWS=12 style='width:400px'>"+txt+"</TEXTAREA>";
sHtm += "</FORM>";
sHtm += "</BODY></HTML>";
top.TLF.document.write(sHtm);
top.TLF.frameElement.WOPENER = window;
top.TLF.document.forms[0].submit();
_SeModOpciones = false;
}else{
if( LineaErronea>-1 ){
_VerTodo();
S("#Container").obj.scrollTop = _FILAS[LineaErronea].offsetTop-75;
_FILAS[LineaErronea].cells[4].style.backgroundColor = 'rgba(252, 0, 0, 0.15)';
_FILAS[LineaErronea].style.display = 'table-row';
top.eAlertHide();
top.eAlert("GRABACIÓN ANULADA", xError, "A", "E");
}
S("#IcoGrabar").obj.style.visibility = 'visible';
Procesando(0);
}
}
function SelGrupo(){
if( _EditandoArbol ) return;
_SelGrupo=!_SelGrupo;
if( _SelGrupo ){
S("I[src$='tree_sel_one.gif']").each(function(k,o){
o.setAttribute("src", o.getAttribute("src").replace('_one.','_all.'));
o.innerHTML = "&#367;";
o.setAttribute("eON",1);
});
}else{
S("I[src$='tree_sel_all.gif']").each(function(k,o){
o.setAttribute("src", o.getAttribute("src").replace('_all.','_one.'));
o.innerHTML = "&#333;";
o.setAttribute("eON",0);
});
}
if( S.toTag(S.event(window),'TABLE').id=='SMenuIcons' ){
setTimeout("DGI('SMenuIcons').style.display = 'table';",100);
}
}
function eClearEvent(men){
try{
if( event==null ) return false;
S.eventClear(window);
}catch(e){}
return false;
}
function _KeyCheck(){
if( !top.eReadyState(window) ) return eClearEvent();
if( S.eventCode(event) == 8 ){
if( document.activeElement.type==undefined ) return eClearEvent();
else if( document.activeElement.type=='text' && document.activeElement.readOnly ) return eClearEvent();
}
var Mas = '';
if( event.altKey ) Mas = 'a';
if( event.ctrlKey ) Mas = 'c';
if( event.shiftLeft ) Mas = 's';
if( S.eventCode(event)==17 ) return true;
if( Mas == 'c' && S.eventCode(event) == 80 ){
if( _ConImpresora ) top.UtilPrint( window );
eClearEvent();
return;
}
if( ',114,116,122,a39,a37,a8,c65,c53,c69,c72,c79,c76,c73,c81,c85,s121,'.indexOf(','+Mas+S.eventCode(event)+',') != -1 ) return eClearEvent();
if( ',93,a36,a37,'.indexOf(','+Mas+S.eventCode(event)+',') != -1 ) return eClearEvent(1);
var Obj = S.event(window);
switch( S.eventCode(event) ){
case 8:
case 46:
if( null != document.activeElement ) return true;
break;
}
}
function PutSerial( txt, tf ){
if( txt!='' ){
var tmp = txt.split('|'), id;
for( var n=0; n<tmp.length-1; n++ ){
id = tmp[n].split(',');
if( S.trim(_FILAS[id[0]].getAttribute("n"))=='' ){
_FILAS[id[0]].setAttribute("n", id[1]);
}else{
alert('Error al asignar el alta');
}
}
}
S("#IcoGrabar").obj.style.visibility = 'visible';
if( tf==undefined || tf ) top.eInfo(window,"Grabado",1);
}
function DelSerial( txt ){
alert('Funcion DelSerial() desactivada');
if( txt!='' ){
var tmp = txt.split('|'), id;
for(var n=0; n<tmp.length-1; n++){
id = tmp[n].split(',');
if( _FILAS[id[0]].getAttribute("n")==id[0] ){
_FILAS[id[0]].setAttribute("n", 'NO');
}else{
alert('Error: '.tmp[n]);
}
}
}
}
function UltimaOpcion(){
_Opcion = _UltimaOp;
ShowEstado();
return eClearEvent();
}
function FireEvent( Mem ){
if( _oMenu!=null ){
S(_oMenu).eventClick();
eClearEvent();
}
if( Mem==undefined ) _oMenu = null;
}
var _oMenu = null;
function MenuContextual(){
if( top._M_=='~' && S.event(window).className=='THOption' ) return true;
<?PHP  if( $_GET['_GEST']=='ALL' ){ ?>
<?PHP  if( $_SESSION['_D_']=='~' ){ ?>
if( S.event(window).tagName=='TH' ){
if( S.event(window).parentNode.parentNode.parentNode.id=='BROWSETH' ) return true;
}
<?PHP  } ?>
if( S.event(window).tagName!='TD' || S.event(window).cellIndex!=4 ) return eClearEvent();
_oMenu = S.event(window);
S(_oMenu).around("#SMenuIcons", {point:true, display:"table"});
<?PHP  } ?>
return eClearEvent();
}
document.onkeydown = _KeyCheck;
var _TreeON = false;
var _NTree = null;
var _NomTree = null;
var _TDTree = null;
function TreeReajusta(){
var DIV = S("#TreeContainer").obj;
if( DIV.clientWidth < DIV.scrollWidth ){
DIV.style.width = S("#TreeGroup").obj.offsetWidth + (DIV.scrollWidth-DIV.clientWidth) + 2;
}
var xy = top.eXY( S("#iEditarTree").obj );
if( xy[0]+DIV.offsetWidth > document.body.clientWidth ){
DIV.style.left = px(xy[0] + S.event(window).offsetWidth - DIV.offsetWidth);
}else{
DIV.style.left = px(xy[0]);
}
}
function EditarTree(On){
_Icono = S.event(window);
_XY = top.eXY(_Icono);
Procesando(1);
setTimeout('_EditarTree('+((On)?'true':'false')+');', 1);
}
function _EditarTree(On){
if( On ){
if( _SeModOpciones ){
top.eInfo(window, 'Hay cambios sin grabar');
Procesando(0);
return eClearEvent();
}
_EditandoArbol = true;
_UltimaOp = null;
S("#RestoreContainer").obj.style.display = "none";
var xy = top.eXY( _Icono );
S("#TreeContainer").obj.style.display = 'block';
xy[1] += _Icono.offsetHeight
S("#TreeContainer").obj.style.top = px(xy[1]);
if( xy[1]+S("#TreeContainer").obj.offsetHeight > document.body.clientHeight ){
var Dif = xy[1] + S("#TreeContainer").obj.offsetHeight - document.body.clientHeight;
var tr = S("#TreeContainer").obj.children[0].rows[S("#TreeContainer").obj.children[0].rows.length-1].offsetHeight + 1;
var DelTR = Math.ceil(Dif/tr) ;
Dif = S("#TreeContainer").obj.children[0].rows[S("#TreeContainer").obj.children[0].rows.length-DelTR].offsetTop + 1;
S("#TreeContainer").obj.style.height = px(Dif);
setTimeout('TreeReajusta()',1);
}
if( xy[0]+S("#TreeContainer").obj.offsetWidth > document.body.clientWidth ){
S("#TreeContainer").obj.style.left = px(xy[0] + _Icono.offsetWidth - S("#TreeContainer").obj.offsetWidth);
}else{
S("#TreeContainer").obj.style.left = px(xy[0]);
}
S(window).rule("+#BROWSE th:nth-child(4), #BROWSE td:nth-child(4){display:table-cell;}", "all");
}else{
if( _SeModTree ){
top.eAlert( S.lng(211), "Se han hecho modificaciones,<br>¿desea anular los cambios?", "accept,cancel", 'DH', _ClearMod );
Procesando(0);
return eClearEvent();
}else{
<?PHP
if( $_Development ) echo '_EditandoArbol = false;';
?>
_TreeON = false;
_NTree = null;
S("#TreeContainer").obj.style.display = 'none';
_FILAS = S("#BROWSE").obj.rows;
for( var n=1; n<S("#TreeGroup").obj.rows.length; n++ ){
if( S("#TreeGroup").obj.rows[n].cells[0].textContent != _ChrOFF ) S("#TreeGroup").obj.rows[n].cells[0].textContent = _ChrOFF;
}
for( var v=1; v<_FILAS.length-1; v++ ){
if( _FILAS[v].getAttribute("dlt")!=null && _FILAS[v].getAttribute("dlt")==-1 ){
continue;
}else if( _FILAS[v].cells[3].textContent != _ChrOFF ) _FILAS[v].cells[3].textContent = _ChrOFF;
if( _VerTreeUOp ) _FILAS[v].style.display = 'table-row';
}
_VerTreeUOp = false;
}
S(window).rule("+#BROWSE th:nth-child(4), #BROWSE td:nth-child(4){display:none;}", "all");
setTimeout("S('#Container').eventFire('scroll')",100);
}
Procesando(0);
return eClearEvent();
}
var _TrTreeLoad = null;
function ShowOpTree(){
var Obj = S.event(window);
if( Obj.tagName=='TH' ) return;
if( Obj.tagName=='IMG' ) return eClearEvent();
if( Obj.tagName!='TD' ) return;
if( Obj.cellIndex==0 ){
_XY = top.eXY( S.event(window) );
Procesando(1);
_Icono = Obj;
setTimeout('_ShowOpTree()',1);
}else if( Obj.cellIndex==1 ){
}else if( Obj.cellIndex==2 ){
if( _SoloConsulta ) return;
if( Obj.textContent.replace(/\s/g,'')==_ChrON ){
top.eInfo( window, 'Desactivando árbol' );
Obj.textContent = _ChrOFF;
}else{
top.eInfo( window, 'Activando árbol' );
Obj.textContent = _ChrON;
}
top.eCallSrv( window, 'edes.php?E:$a/u/op.gs&TreeCd='+Obj.parentNode.getAttribute("cd")+'&TreeOnOff='+((Obj.textContent.replace(/\s/g,'')==_ChrON)?'S':'') );
}
}
function _ShowOpTree(){
var Obj = _Icono;
if( Obj.textContent.replace(/\s/g,'')==_ChrON ){
Obj.textContent = _ChrOFF;
_TreeON = false;
for( var v=1; v<_FILAS.length-1; v++ ){
if( _FILAS[v].getAttribute("dlt")!=null && _FILAS[v].getAttribute("dlt")==-1 ){
continue;
}else _FILAS[v].cells[3].textContent = _ChrOFF;
if( _VerTreeUOp ) _FILAS[v].style.display = 'table-row';
}
_VerTreeUOp = false;
}else{
if( _VerTreeUOp ){
for( var v=1; v<_FILAS.length-1; v++ ){
if( _FILAS[v].getAttribute("dlt")!=null && _FILAS[v].getAttribute("dlt")==-1 ) continue;
_FILAS[v].style.display = 'table-row';
}
_VerTreeUOp = false;
}
for( var n=1; n<S("#TreeGroup").obj.rows.length; n++ ) S("#TreeGroup").obj.rows[n].cells[0].textContent = _ChrOFF;
Obj.textContent = _ChrON;
_TrTreeLoad = Obj.parentNode;
top.eInfo( window, 'Cargando "'+Obj.parentNode.cells[1].textContent+'" ...', 99 );
setTimeout('TreeLoad("'+Obj.parentNode.getAttribute("cd")+'", "'+Obj.parentNode.cells[1].textContent.replace(/"/g,'&#34;')+'" );');
}
Procesando(0);
}
function TreeLoad( NTree, XTree ){
XTree = XTree.replace(/&#34;/g,'"');
_SeModTree = false;
_NTree = NTree;
top.eInfo( window, 'Cargando "'+XTree+'" ...', 99 );
var sHtm = "<?=eHTML('','','',true)?></HEAD><BODY>";
sHtm += "<FORM METHOD='POST' ACTION='edes.php?E:$a/u/op.gs"+((_SoloConsulta)? '&_SoloConsulta=1':'')+"' target=TLF>";
sHtm += "<INPUT NAME='IsUTF8' value='Ñ'>";
sHtm += "<INPUT NAME='LoadTree' value='"+NTree+"'>";
sHtm += "<INPUT NAME='NmTree' value='"+XTree+"'>";
sHtm += "</FORM>";
sHtm += "</BODY></HTML>";
top.TLF.document.write(sHtm);
top.TLF.frameElement.WOPENER = window;
top.TLF.document.forms[0].submit();
}
function InsertTree( XTree, IgualQue ){
if( IgualQue!='' ){
for( var n=0; n<_DimArboles.length; n++ ){
if( _DimArboles[n]==IgualQue ){
IgualQue = n;
break;
}
}
}
_SeModTree = false;
top.eInfo( window, 'Grabando', 99 );
var sHtm = "<?=eHTML('','','',true)?></HEAD><BODY>";
sHtm += "<FORM METHOD='POST' ACTION='edes.php?E:$a/u/op.gs' target=TLF>";
sHtm += "<INPUT NAME='IsUTF8' value='Ñ'>";
sHtm += "<INPUT NAME='InsertTree' value='*'>";
sHtm += "<INPUT NAME='NmTree' value='"+XTree+"'>";
sHtm += "<INPUT NAME='IgualQue' value='"+IgualQue+"'>";
sHtm += "</FORM>";
sHtm += "</BODY></HTML>";
top.TLF.document.write(sHtm);
top.TLF.frameElement.WOPENER = window;
top.TLF.document.forms[0].submit();
}
function _OpON( op ){
for( var n=1; n<_FILAS.length-1; n++ ){
if( _FILAS[n].getAttribute("n") == op ){
_FILAS[n].cells[3].textContent = _ChrON;
return true;
}
}
return false;
}
function _ActivarOPFunc(){
var tmp = _ActivarOP.split(','), t=tmp.length, i, n, v;
for( n=1; n<_FILAS.length-1; n++ ){
v = _FILAS[n].getAttribute("n");
for( i=1; i<t; i++ ){
if( v==tmp[i] ){
_FILAS[n].cells[3].textContent = _ChrON;
break;
}
}
}
}
function VerTreeOp(txt){
var ActivarOP = '';
for(var v=1; v<_FILAS.length-1; v++){
if( _FILAS[v].getAttribute("dlt")!=null ) continue;
else _FILAS[v].cells[3].textContent = _ChrOFF;
}
_TreeON = true;
var tmp = txt.split('|'), tmp2, tr = _FILAS.length,n,o,i,t=tmp.length-1;
for(n=0; n<t; n++){
tmp2 = tmp[n].split(',');
o = tmp2[0];
i = tmp2[1];
if( o<1 || o>=tr || _FILAS[o].getAttribute("n")!=i ){
ActivarOP += ','+i;
}else{
_FILAS[o].cells[3].textContent = _ChrON;
}
}
if( ActivarOP!='' ){
var tmp2 = ActivarOP.split(','), Dim = new Array();
for( n=1; n<tmp2.length; n++ ) Dim['u'+tmp2[n]] = true;
for( n=1; n<_FILAS.length-1; n++ ){
if( Dim['u'+_FILAS[n].getAttribute("n")]==true ) _FILAS[n].cells[3].textContent = _ChrON;
}
}
top.eInfoHide();
S.infoHide();
}
function AsignaTreeId( id ){
_TrTreeLoad.setAttribute("cd", id);
_NTree = id;
top.eInfoHide();
S("#IcoGrabarTree").obj.style.visibility = "visible";
}
function _opModTree( Op, DimValores, DatosAdicionales, DimObj ){
if( Op!=2 ) return;
for(var i in DimValores) DimValores[S.mid(i,5,0)] = DimValores[i];
DimValores[0] = DimValores[0].replace(/\-/g,'·');
_TDTree.textContent = DimValores[0];
_NomTree = DimValores[0];
}
function opModTree( Label ){
Label = Label.replace(/·/g,'-');
S.alert({
title:"MODIFICACION",
button:"A,C",
form:[
["Caption | | # | T | 40 || M |"+Label+"|#|"]
],
function: _opModTree,
});
}
function opModNmTree(){
for( var n=1; n<S("#TreeGroup").obj.rows.length; n++ ) if( S("#TreeGroup").obj.rows[n].cells[0].textContent.replace(/\s/g,'') == _ChrON ){
_TDTree = S("#TreeGroup").obj.rows[n].cells[1];
opModTree(  S("#TreeGroup").obj.rows[n].cells[1].textContent );
}
return eClearEvent();
}
function _opInsertTree( Op, DimValores, DatosAdicionales, DimObj ){
if( Op!=2 ) return;
if( DimValores[0]=='' ) return;
for(var i in DimValores) DimValores[S.mid(i,5,0)] = DimValores[i];
DimValores[0] = DimValores[0].replace(/\-/g,'·');
_SeModTree = false;
var TR = S("#TreeGroup").obj.insertRow(1), TD;
TR.setAttribute("cd", "");
TR.insertCell(0).textContent = _ChrOFF;
TR.insertCell(1).textContent = DimValores[0];
TR.insertCell(2).textContent = '';
var xy = top.eXY( S("#iEditarTree").obj );
S("#TreeContainer").obj.style.display = 'block';
xy[1] += S("#iEditarTree").obj.offsetHeight
S("#TreeContainer").obj.style.top = px(xy[1]);
if( xy[1]+S("#TreeContainer").obj.offsetHeight > document.body.clientHeight ){
var Dif = xy[1] + S("#TreeContainer").obj.offsetHeight - document.body.clientHeight;
var tr = S("#TreeContainer").obj.children[0].rows[S("#TreeContainer").obj.children[0].rows.length-1].offsetHeight + 1;
var DelTR = Math.ceil(Dif/tr) ;
Dif = S("#TreeContainer").obj.children[0].rows[S("#TreeContainer").obj.children[0].rows.length-DelTR].offsetTop + 1;
S("#TreeContainer").obj.style.height = px(Dif);
setTimeout('TreeReajusta()',1);
}
_TrTreeLoad = TR;
InsertTree( DimValores[0], S.trim(DimValores[1]) );
}
var _DimArboles = new Array();
function opInsertTree(){
_DimArboles = new Array();
for( n=1; n<S("#TreeGroup").obj.rows.length; n++ ){
_DimArboles.push([S("#TreeGroup").obj.rows[n].getAttribute("cd"), S.trim(S("#TreeGroup").obj.rows[n].cells[1].textContent)]);
}
if( _SeModTree ){
top.eInfo( window, 'Antes de crear un nuevo árbol<br>tiene que grabar el actual', 4 );
return eClearEvent();
}
for( var n=1; n<S("#TreeGroup").obj.rows.length; n++ ) S("#TreeGroup").obj.rows[n].cells[0].textContent = _ChrOFF;
VerTreeOp('');
S.alert({
title:"ALTA",
button:"A,C",
form:[
["Caption            | | # | T  | 40 || M ||#|"],
["Igual que el árbol | | # | SV | 40 || M || |", _DimArboles]
],
function: _opInsertTree,
});
}
function _ClearMod( Op ){
if( Op==2 ){
_SeModTree = false;
for( var n=1; n<S("#TreeGroup").obj.rows.length; n++ ) S("#TreeGroup").obj.rows[n].cells[0].textContent = _ChrOFF;
VerTreeOp('');
S("#IcoCloseTree").eventClick();
S("#IcoGrabarTree").eventClick();
}
}
function ClearMod(){
if( _SeModTree ) top.eAlert( S.lng(210), "Anular los cámbios", "accept,cancel", 'DH', _ClearMod );
return eClearEvent();
}
function opSaveTree(){
for( var n=1; n<S("#TreeGroup").obj.rows.length; n++ ) if( S("#TreeGroup").obj.rows[n].cells[0].textContent.replace(/\s/g,'') == _ChrON ){
_TDTree = S("#TreeGroup").obj.rows[n].getAttribute("cd");
_NomTree = S("#TreeGroup").obj.rows[n].cells[1].textContent;
}
if( _NTree==null || _NomTree==null ) return eClearEvent();
_XY = top.eXY( S.event(window) );
top.eAlert( S.lng(210), "Grabar el árbol", "accept,cancel", 'DH', _opSaveTreeOk );
}
function _opSaveTreeOk( Op ){
if( Op==2 ){
S("#IcoGrabarTree").obj.style.visibility = 'hidden';
Procesando(1);
top.eAlert( "", "Grabando 0%", "-", "g/sys_save.gif" );
setTimeout('_opSaveTree()',500);
}
}
function _opSaveTree(){
var txt = _NTree+'|'+_NomTree;
for( var v=1; v<_FILAS.length-1; v++ ){
if( _FILAS[v].getAttribute("dlt")!=null ) continue;
else if( _FILAS[v].cells[3].textContent.replace(/\s/g,'')==_ChrON && _FILAS[v].getAttribute("n")!='NO' ) txt += '|'+_FILAS[v].getAttribute("n");
}
var sHtm = "<?=eHTML('','','',true)?></HEAD><BODY>";
sHtm += "<FORM METHOD='POST' ACTION='edes.php?E:$a/u/op.gs' target=TLF>";
sHtm += "<INPUT NAME='IsUTF8' value='Ñ'>";
sHtm += "<TEXTAREA NAME='grabarTree' COLS=48 ROWS=12 style='width:400px'>"+txt+"</TEXTAREA>";
sHtm += "</FORM>";
sHtm += "</BODY></HTML>";
top.TLF.document.write(sHtm);
top.TLF.frameElement.WOPENER = window;
top.TLF.document.forms[0].submit();
}
function opRestore(){
if( _EditandoArbol ) return;
if( _NTree!=null ) return;
_XY = top.eXY( S.event(window) );
Procesando(1);
setTimeout('_opRestore()',1);
top.eInfo( window, S.lng(219) );
}
function _opRestore(){
top.eCallSrv( window, 'edes.php?E:$a/u/op.gs&RestoreTable=1' );
}
function RestoreReajusta(){
if( S("#RestoreContainer").obj.clientWidth < S("#RestoreContainer").obj.scrollWidth ){
S("#RestoreContainer").obj.style.width = px(S("#RestoreContainer").obj.children[0].offsetWidth + (S("#RestoreContainer").obj.scrollWidth-S("#RestoreContainer").obj.clientWidth) + 2);
}
}
function ViewRestore(){
S("#RestoreContainer").obj.style.height = '';
S("#RestoreContainer").obj.style.width = '';
var xy = top.eXY(S("#IcoRestore").obj);
with( S("#RestoreContainer").obj.style ){
display = "block";
left = px(xy[0]);
top = px(xy[1]);
}
if( xy[1]+S("#RestoreContainer").obj.offsetHeight > document.body.clientHeight ){
var Dif = xy[1] + S("#RestoreContainer").obj.offsetHeight - document.body.clientHeight;
var tr = S("#RestoreContainer").obj.children[0].rows[S("#RestoreContainer").obj.children[0].rows.length-1].offsetHeight + 1;
var DelTR = Math.ceil(Dif/tr) ;
Dif = S("#RestoreContainer").obj.children[0].rows[S("#RestoreContainer").obj.children[0].rows.length-DelTR].offsetTop + 1;
S("#RestoreContainer").obj.style.height = px(Dif);
setTimeout('RestoreReajusta()',1);
}
top.eInfoHide();
}
function _RestoreDatos( Op, DimValores, DatosAdicionales, DimObj ){
if( Op!=2 ) return;
top.eInfo( window, 'Restaurando datos del día '+DatosAdicionales[1] );
top.eCallSrv( window, 'edes.php?E:$a/u/op.gs&RestoreDatos='+ DatosAdicionales[0] );
}
function RestoreDatos(){
var Obj = S.event(window);
if( Obj.tagName!='TD' ) return;
top.eAlert( S.lng(209), 'Confirmar RESTAURAR los datos\ndel día '+Obj.textContent, 'A,C', 'P', _RestoreDatos, null, Array( Obj.getAttribute("n"), Obj.textContent ) );
}
function opRestoreTree(){
if( _NTree==null ){
S.info("Tiene que seleccionar un árbol para restaurar", 3);
return;
}
_XY = top.eXY( S.event(window) );
Procesando(1);
setTimeout('_opRestoreTree()',1);
}
function _opRestoreTree(){
top.eCallSrv( window, 'edes.php?E:$a/u/op.gs&RestoreTableTree='+_NTree );
}
function ViewRestoreTree(){
var RestoreContainer = S("#RestoreContainer").obj;
S("#RestoreContainer").css("height:auto;width:auto");
var xy = top.eXY(IcoRestoreTree);
with( RestoreContainer.style ){
display = "block";
left = px(xy[0]);
top = px(xy[1]);
}
if( xy[1]+RestoreContainer.offsetHeight > document.body.clientHeight ){
var Dif = xy[1] + RestoreContainer.offsetHeight - document.body.clientHeight;
var tr = RestoreContainer.children[0].rows[RestoreContainer.children[0].rows.length-1].offsetHeight + 1;
var DelTR = Math.ceil(Dif/tr) ;
Dif = RestoreContainer.children[0].rows[RestoreContainer.children[0].rows.length-DelTR].offsetTop + 1;
RestoreContainer.style.height = px(Dif);
setTimeout('RestoreReajusta()',1);
}
Procesando(0);
top.eInfoHide();
}
function _RestoreDatosTree( Op, DimValores, DatosAdicionales, DimObj ){
if( Op!=2 ) return;
top.eInfo( window, 'Restaurando datos del día '+DatosAdicionales[1] );
top.eCallSrv( window, 'edes.php?E:$a/u/op.gs&RestoreDatosTree='+ _NTree+'.'+DatosAdicionales[0] );
}
function RestoreDatosTree(){
var Obj = S.event(window);
if( Obj.tagName!='TD' ) return;
top.eAlert( S.lng(209), 'Confirmar RESTAURAR los datos\ndel día '+Obj.textContent, 'A,C', 'P', _RestoreDatosTree, null, Array( Obj.getAttribute("n"), Obj.textContent ) );
}
function SelGrupoTree(){
var o = S.event(window);
_SelGrupoTree = !_SelGrupoTree;
if( _SelGrupoTree ){
o.innerHTML = "&#367;";
}else{
o.innerHTML = "&#333;";
}
}
function CloseSession(){
if( !_SoloConsulta ){
clearInterval( _ConectON );
top.eCallSrv( window, 'edes.php?E:$a/u/op.gs&SG=0' );
}
return eClearEvent();
}
var _ConectON;
function SetIntervalON(){
if( !_SoloConsulta ) _ConectON = setInterval( "top.eCallSrv( window, 'edes.php?E:$a/u/op.gs&SG=1' )", 60000 );
}
if( !_SoloConsulta ) setTimeout( "SetIntervalON()", 60000 );
function OpInTreeON( ConInfo ){
_XY = top.eXY( S.event(window) );
if( ConInfo ) top.eInfo( window, 'Seleccione la opción a consultar' );
_OpEnTreeON = true;
}
function OpInTreeView( Obj ){
if( Obj.parentNode.getAttribute("n")=='' ){
top.eInfo( window, 'Necesita grabar los cámbios' );
return eClearEvent();
}
_Icono = Obj;
Procesando(1);
setTimeout('__OpInTreeView()',1);
}
function __OpInTreeView(){
var Obj = _Icono,
sId = 'n'+(parseInt(_FILAS[Obj.parentNode.rowIndex].cells[_LABEL].id.substr(1)) ),
Parientes = '', i;
Obj.parentNode.cells[4].style.backgroundColor = '#ffffcc';
for(i=Obj.parentNode.rowIndex; i>=0; i--){
if( _FILAS[i].getAttribute("dlt")==null ){
if( _FILAS[i].cells[_LABEL].id==sId ){
Parientes += ','+_FILAS[i].getAttribute("n");
if( sId==0 ) break;
sId = 'n'+(parseInt(sId.substr(1)) - 1 );
}
}
}
S("#opInTreeGroup").obj.setAttribute("Parientes", Parientes);
S("#opInTreeGroup").obj["Fila"] = Obj.parentNode;
top.eCallSrv( window, 'edes.php?E:$a/u/op.gs&InTreeLoad='+Parientes );
return eClearEvent();
}
function _OpInTreeView( xTree ){
for( var n=1; n<S("#opInTreeGroup").obj.rows.length; n++ ){
S("#opInTreeGroup").obj.rows[n].cells[0].textContent = ( xTree.indexOf(','+S("#opInTreeGroup").obj.rows[n].getAttribute("cd")+',') > -1 ) ? _ChrON : _ChrOFF;
}
S("#SOMBRA").obj.style.display = 'block';
S("#RestoreContainer").obj.style.display = "none";
var xy = top.eXY( S("#OpInTreeIMG").obj );
S("#opInTreeContainer").obj.style.display = 'block';
xy[1] += S("#OpInTreeIMG").obj.offsetHeight
S("#opInTreeContainer").obj.style.top = px(xy[1]);
if( xy[1]+S("#opInTreeContainer").obj.offsetHeight > document.body.clientHeight ){
var Dif = xy[1] + S("#opInTreeContainer").obj.offsetHeight - document.body.clientHeight;
var tr = S("#opInTreeContainer").obj.children[0].rows[S("#opInTreeContainer").obj.children[0].rows.length-1].offsetHeight + 1;
var DelTR = Math.ceil(Dif/tr) ;
Dif = S("#opInTreeContainer").obj.children[0].rows[S("#opInTreeContainer").obj.children[0].rows.length-DelTR].offsetTop + 1;
S("#opInTreeContainer").obj.style.height = px(Dif);
setTimeout('OpInTreeRecalc()',1);
}
if( xy[0]+S("#opInTreeContainer").obj.offsetWidth > document.body.clientWidth ){
if( S.event(window) ) S("#opInTreeContainer").obj.style.left = px(xy[0] + S.event(window).offsetWidth - S("#opInTreeContainer").obj.offsetWidth);
}else{
S("#opInTreeContainer").obj.style.left = px(xy[0]);
}
}
function OpInTreeRecalc(){
var DIV = S("#opInTreeContainer").obj;
if( DIV.clientWidth < DIV.scrollWidth ){
DIV.style.width = px(S("#opInTreeGroup").obj.offsetWidth + (DIV.scrollWidth-DIV.clientWidth) + 2);
}
var xy = top.eXY( S("#OpInTreeIMG").obj );
if( xy[0]+DIV.offsetWidth > document.body.clientWidth ){
DIV.style.left = px(xy[0] + S.event(window).offsetWidth - DIV.offsetWidth);
}else{
DIV.style.left = px(xy[0]);
}
}
function OpInTreeClose(){
if( _SeModInTree ){
top.eInfo( window, 'Antes de cerrar la SubVentana<br>tiene que grabar los cámbios.', 4 );
return eClearEvent();
}else{
S("#opInTreeContainer").obj.style.display = 'none';
S("#SOMBRA").obj.style.display = 'none';
S("#opInTreeGroup").obj["Fila"].cells[4].style.backgroundColor = '';
}
return eClearEvent();
}
function OpInTreeClick(){
var Obj = S.event(window);
if( Obj.tagName=='TH' ) return;
if( Obj.tagName=='IMG' ) return eClearEvent();
if( Obj.tagName!='TD' ) return;
if( Obj.cellIndex==0 ){
if( Obj.textContent.replace(/\s/g,'')==_ChrON ){
Obj.textContent = _ChrOFF;
}else{
Obj.textContent = _ChrON;
}
}
}
function opInTreeSave(){
_XY = top.eXY( S.event(window) );
top.eAlert( S.lng(210), "Grabar la opción en la lista de árboles", "accept,cancel", 'DH', opInTreeSaveOk );
}
function opInTreeSaveOk( Op ){
if( Op==2 ){
S("#OpInTreeSaveIMG").obj.style.visibility = 'hidden';
Procesando(1);
setTimeout('_opInTreeSave()',1);
}
}
function _opInTreeSave(){
top.eInfo(window,"Grabando...",-1);
var Datos = S("#opInTreeGroup").obj.getAttribute("Parientes")+'|';
for(var n=1; n<S("#opInTreeGroup").obj.rows.length; n++) if( S("#opInTreeGroup").obj.rows[n].cells[0].textContent.replace(/\s/g,'') == _ChrON ){
Datos += ','+S("#opInTreeGroup").obj.rows[n].getAttribute("cd");
}
top.eCallSrv(window, 'edes.php?E:$a/u/op.gs&InTreeSave='+Datos);
}
function InTreeClearMod(){
if( _SeModInTree ) top.eAlert( S.lng(210), "Anular los cámbios", "accept,cancel", 'DH', _InTreeClearMod );
return eClearEvent();
}
function _InTreeClearMod( Op ){
if( Op==2 ){
_SeModInTree = false;
for( var n=1; n<S("#opInTreeGroup").obj.rows.length; n++ ) S("#opInTreeGroup").obj.rows[n].cells[0].textContent = S("#opInTreeGroup").obj.rows[n].cells[0].Old;
}
}
function OpGetPK(){
top.eInfo(window, 'cd_gs_op = '+_oMenu.parentNode.getAttribute("n"));
return eClearEvent();
}
function OpSinTree(){
_XY = top.eXY( S.event(window) );
Procesando(1);
top.eCallSrv(window, 'edes.php?E:$a/u/op.gs&OpSinTree=1');
}
function OpSinTreeView( Ops ){
_VerTreeUOp = true;
var Dim = new Array(), i=0;
for( var v=_FILAS.length-1; v>=1; v-- ){
if( _FILAS[v].getAttribute("dlt")!=null ) continue;
try{
if( Ops.indexOf(","+_FILAS[v].getAttribute("n")+",")>=0 ){
_FILAS[v].cells[4].style.backgroundColor = '#ffffcc';
_FILAS[v].style.display = 'table-row';
if( _FILAS[v].cells[_LABEL].getAttribute("tp")=='F' ) _FILAS[v].cells[_LABEL].firstChild.src = _FILAS[v].cells[_LABEL].firstChild.src.replace('_1.','_0.');
Dim[i++] = v;
}else{
_FILAS[v].cells[4].style.backgroundColor = '';
_FILAS[v].style.display = 'none';
if( _FILAS[v].cells[_LABEL].getAttribute("tp")=='F' ) _FILAS[v].cells[_LABEL].firstChild.src = _FILAS[v].cells[_LABEL].firstChild.src.replace('_0.','_1.');
}
}catch(e){
_FILAS[v].cells[4].style.backgroundColor = 'red';
}
}
for( var o=0; o<Dim.length; o++ ){
v = Dim[o];
var sId = 'n'+(parseInt(_FILAS[v].cells[_LABEL].id.substr(1))-1 );
for( var i=v-1; i>=0; i-- ){
if( _FILAS[i].getAttribute("dlt")==null ){
if( _FILAS[i].cells[_LABEL].id==sId ){
_FILAS[i].style.display = 'table-row';
if( _FILAS[i].cells[_LABEL].getAttribute("tp")=='F' ) _FILAS[i].cells[_LABEL].firstChild.src = _FILAS[i].cells[_LABEL].firstChild.src.replace('_1.','_0.');
if( sId==0 ) break;
sId = 'n'+(parseInt(sId.substr(1)) - 1 );
}
}
}
}
S("#Container").obj.scrollTop = 0;
setTimeout(function(){
top.eScrollTH(S("#BROWSE").obj.parentNode);
}, 1);
Procesando(0);
}
function _Desarrollador(){
_XY = top.eXY( S.event(window) );
top.eInfo( window, 'Seleccione la opción a consultar' );
_Op_Desarrollador = true;
}
function OpDesarrollador( Op, pk ){
if( Op==undefined ){
top.eInfo( window, 'Opción sin URL' );
}else if( Op=='' || Op.substr(0,1)==':' ){
top.eInfo( window, 'Opción sin URL ('+pk+')' );
}else if( Op.indexOf(':')==-1 && Op.substr(0,1)=='>' ){
top.eInfo( window, 'Opción externa' );
}else{
top.eCallSrvPost( 'edes.php?E:$a/u/op.gs', {'Quien':Op, 'PK':pk}, window );
}
return eClearEvent();
}
</script>
<?PHP
?>
<BODY class="SCROLLBAR" onload='AjustaCeldas();setTimeout("document.ondblclick=null");' oncontextmenu='MenuContextual()' onhelp='return false' onselectstart='return false' ondragstart='return false' style='overflow:hidden'>
<DIV id="PROCESANDO" class="ICONLOADING" onclick='this.style.display="none"'>r</DIV>
<table id=ICONS class=vICONS style='position:absolute;display:none' onclick='SetIconoAsociado()' onmouseleave='this.style.display="none"'>
<col style='width:10px;font-family:<?= $_FontFamily; ?>;cursor:pointer;'>
<col style='width:15px;text-align:center;cursor:pointer;'>
<col style='cursor:pointer'>
<col style='width:10px;text-align:center;cursor:default;'>
<col style='width:10px;text-align:center;cursor:default;'>
<?PHP  if( $_SESSION['_D_']!='' ){ ?>
<col style='width:10px;text-align:center;cursor:default;'>
<?PHP  }else{ ?>
<col style='display:none'>
<?PHP  } ?>
<TR>
<TH style='font-size:10px;font-family:Arial;'>Sel
<TH style='font-size:10px'>Icon
<TH>Title
<TH style='font-size:10px'>Show
<TH style='font-size:10px'>Mode
<TH style='font-size:10px'>Status
<?PHP
$_DimIcon = array();
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op_ico where global<>'S' or global is null order by position");
while( $r=qArray() ){
$_DimIcon[$r['cd_gs_op_ico']] = $r['icon'];
echo '<tr pk='.$r['cd_gs_op_ico'].'><td width=1px><td width=1px id=c>';
if( trim($r['icon'])!='' ){
echo '<img src="'.str_replace('$','edes.php?R:$a/g/',$r['icon']).'">';
}
echo '<td>'.$r['title'];
if( $r['show_type']!='' ){
echo '<td id="st'.$r['show_type'].'">'.$_Show[$r['show_type']];
}else{
echo '<td>&nbsp;';
}
if( $r['mode']!='' ){
echo '<td id="mc'.$r['mode'].'">'.$_Mode[$r['mode']];
}else{
echo '<td>&nbsp;';
}
echo '<td>&nbsp;';
}
?>
<tr><td colspan=6 align=center style='cursor:default;text-align:center'>
<table border=0 cellspacing=0 cellpadding=0><tr id='NO'>
<td><input type=button value='Aceptar' onclick='SaveIconoAsociado()' class=Boton>
<td style='font-family:Arial'>&nbsp;
<td><input type=button value='Cancelar' onclick='S("#ICONS").obj.style.display="none"' class=Boton>
</tr></table>
</table>
<table class="CONTENEDOR" border=0px cellspacing=0px cellpadding=px0 width=100% height=100% style="border-collapse:collapse">
<tr><td valign=top>
<table id=BROWSETH width=100% st-yle="border-collapse:collapse"><TR>
<TH class=THOption align=left style="padding-left:10px;cursor:default;" nowrap>&nbsp;&nbsp;&nbsp;GESTOR DE <?= (($_GET['_GEST']=="ALL")?'ÁRBOLES':'OPCIONES')?>
<TH class=THOption width=1px style='cursor:default;'>&nbsp;&nbsp;
<?PHP if( $_GET['_GEST']=="ALL" ){ ?>
<TH class=THOption width=1px><i src='g/tree_sel_one.gif' eON='0' onclick='SelGrupo()' title='Seleccionar grupo de opciones'>&#333;</i>
<TH class=THOption width=1px><i src='g/l_order.gif' onclick='_Opcion="Me"' title='Mover Opción'>&#218;</i>
<TH class=THOption width=1px><i src='g/t_op_insert.gif' onclick='(_FILAS.length==1)? opAlta():_Opcion="I"' title='Alta de  Opción' style="margin-left:10px;">I</i>
<TH class=THOption width=1px><i src='g/t_op_update.gif' onclick='_Opcion="U"' title='Modificar Opción'>U</i>
<TH class=THOption width=1px><i src='g/t_op_delete.gif' onclick='_Opcion="D"' title='Borrar Opción'>D</i>
<TH class=THOption width=1px><i src='g/t_op_view.gif' onclick='_Opcion="V"' title='Ver Opción'>V</i>
<TH class=THOption width=1px><i src='g/ts_pg_pr.gif' onclick='_Opcion="<"' title='Nivel Superior'>&#300;</i>
<TH class=THOption width=1px><i src='g/ts_pg_nx.gif' onclick='_Opcion=">"' title='Nivel Inferior'>&#301;</i>
<TH class=THOption width=1px><i src='g/t_op_delete_2.gif' onclick='_UnLink()' title='Recuperar última opción borrada' style='color:#b40000;margin-left:10px;'>D</i>
<TH class=THOption width=1px><i src='g/t_grabar.gif' onclick='opSave()' title='Grabar opciones' id=IcoGrabar>&#197;</i>
<TH class=THOption width=1px><i src='g/tree_restore.gif' onclick='opRestore()' title='Restaurar copia de seguridad' id=IcoRestore>v</i>
<?PHP } ?>
<TH style="display:none" class=THOption width=1xp><i src='g/t_print.gif' onclick='ImprimirTodo()' title='Imprimir opciones' style="margin-left:10px;">8</i>
<TH class=THOption width=50px style='cursor:default;'>&nbsp;&nbsp;&nbsp;
<TH class=THOption style='font-weight:normal; width:1px;cursor:default;'>Buscar&nbsp;
<TH class=THOption width=1px><input name="BUSCAR" SIZE=20 MAXLENGTH=40 onkeypress="Buscar()" onkeydown="return true;" onblur="Buscar(1);_tSeek=-1;" title="Opción a buscar<?="\n"?>Caption/Code">
<TH class=THOption width=1px><input name="ENCONTRADOS" SIZE=3 title="Nº de ocurrencias" style="cursor:default;width:25px" disabled>
<TH class=THOption width=1px><i SRC="g/mapa_izq.gif" onclick='Siguiente(-1)' title='Anterior' style='MARGIN-LEFT:2px;MARGIN-RIGHT:0px;'><</i>
<TH class=THOption width=1px><i src='g/mapa_buscar.gif' onclick='Siguiente(0)' title='Buscar' style='MARGIN-RIGHT:2px;'>S</i>
<TH class=THOption width=1px><i SRC="g/mapa_dch.gif" onclick='Siguiente(1)' title='Siguinte'>></i>
<TH class=THOption width=1px><i src='g/clear.png' onclick=aClearBuscar() title='Desmarca las opciones encontradas'>&#183;</i>
<?PHP if( $_GET['_GEST']=="ALL" ){ ?>
<TH class=THOption width=1px><i src='g/t_op_check.gif' onclick='MarcarOpSinMode()' title='Marcar opciones sin "Mode"' style="margin-left:10px;">&#368;</i>
<?PHP } ?>
<TH class=THOption width=1px><i src='g/tree_1.gif' onclick=VerTodo() title='Mostrar todas las opciones'>&#374;</i>
<TH class=THOption width=1px><i src='g/tree_2.gif' onclick=Ver2Resumen() title='Mostrar dos niveles'>&#373;</i>
<TH class=THOption width=1px><i src='g/tree_0.gif' onclick=VerResumen() title='Mostrar solapas'>&#372;</i>
<TH class=THOption width=1px><i src='g/tree_op.gif' onclick=EditarTree(1) title='Gestionar árboles' id=iEditarTree>&#272;</i>
<TH class=THOption width=1px><i src='g/tree_op_one.gif' onclick=OpInTreeON(1) title='Opción en árboles' id=OpInTreeIMG>&#369;</i>
<?PHP if( $_GET['_GEST']=="ALL" ){ ?>
<TH class=THOption width=1px><i src='g/tree_op_none.gif' onclick=OpSinTree() title='Opciones sin árbol'>&#370;</i>
<?PHP } ?>
<?PHP if( $_WithDevelopment && substr_count('~AMPDH',$_SESSION['_D_']) == 1 && $_GET['_GEST']=="ALL" ){ ?>
<TH class=THOption style='cursor:default;'><span style='width:30px'></span>
<?PHP  if( $_Development && $_GET['_GEST']=="ALL" ){ ?>
<TH class=THOption width=1px style='cursor:default;font-weight:normal;' title='Ejecutar Opción'>&nbsp;&nbsp;&nbsp;RunOp
<TH class=THOption width=1px title='Ejecutar Opción'><img src=g/check_0.gif id=OpEnSubVentana valor=0 onclick=_CambiaTF()>
<?PHP  } ?>
<TH class=THOption width=1px style='cursor:default;font-weight:normal;' title='Desarrollador'><i src=g/mapa_user.gif onclick=_Desarrollador() style="margin-left:10px;">q</i>
<TH class=THOption width=1px style='cursor:default;'>&nbsp;
<TH class=THOption width=1px style='cursor:default;font-weight:normal;display:<?=(($_WithEdit)?'block':'none')?>'>gsEdit <TH class=THOption width=1px style='display:<?=(($_WithEdit)?'block':'none')?>'><img src=g/check_0.gif id=OpGsEdit valor=0 onclick=_CambiaTF()>
<TH class=THOption width=1px style='cursor:default;font-weight:normal;display:<?=(($_WithStatus)?'block':'none')?>'>Status <TH class=THOption width=1px style='display:<?=(($_WithStatus)?'block':'none')?>'><img src=g/check_<?= (($_StatusON)?1:0)?>.gif id=VerStatus valor=1 onclick=_CambiaTF()>
<?PHP  } ?>
<TH class=THOption width=100% style='cursor:default;'>&nbsp;
</table>
<tr><td height=100% valign=top>
<div id=Container class="SCROLLBAR" style="overflow:auto; height:100%; width:100%; padding:0px; margin:0px; vertical-align:top" onscroll='top.eScrollTH(this)'>
<table id=BROWSE width=100% onclick="ShowEstado()">
<col style='width:15px;text-align:center;cursor:pointer<?=(($_GET['_GEST']=="VIEW")?';display:none':'')?>'>						<?PHP  // Visibilidad ?>
<col style='width:15px;text-align:center;cursor:pointer'>																		<?PHP  // Mode ?>
<col style='width:15px;text-align:center'>																						<?PHP  // Icon ?>
<col style='width:15px;text-align:center;font-family:<?= $_FontFamily; ?>;cursor:pointer;display:none;'>						<?PHP  // Sel ?>
<col class=Option>
<col style='width:100px;'>																										<?PHP  // Iconos Asociados ?>
<col style='width:15px;<?= (($_StatusON ==true)?'':'display:none;')?>'>															<?PHP  // Status ?>
<col style='width:75px;<?= (($_StatusON ==true)?'':'display:none;')?>font-size:10px;'>											<?PHP  // Fecha			white-space:no-wrap ?>
<col style='width:50px;<?= (($_StatusON ==true)?'':'display:none;')?>font-size:10px;'>											<?PHP  // Usuario ?>
<col style='width:20px;<?= (($_GET['_GEST']=="ALL")?'':'display:none;')?><?=(($_GET['_GEST']!="ALL")?';display:none':'')?>'>	<?PHP  // Alias ?>
<col style='width:15px;<?= (($_WithDoc  ==true)?'':'display:none;')?>'>															<?PHP  // Documentos ?>
<thead>
<TR>
<TH style='font-size:10px;cursor:default;<?=(($_GET['_GEST']=="VIEW")?';display:none':'')?>'>Show
<TH style='font-size:10px;cursor:default;'>Mode
<TH style='font-size:10px;cursor:default;'>Icon
<TH style='font-size:10px;cursor:default;'>Sel
<TH style='cursor:default;'>Caption
<TH style='cursor:default;'>Icons
<TH style='font-size:10px;cursor:default;<?=(($_StatusON==true)?'':'display:none;')?>'>Status
<TH style='font-size:10px;cursor:default;<?=(($_StatusON==true)?'':'display:none;')?>'>Fecha
<TH style='font-size:10px;cursor:default;<?=(($_StatusON==true)?'':'display:none;')?>'>Usuario
<TH style='font-size:10px;cursor:default;width:120px;<?=(($_GET['_GEST']=="ALL")?'':'display:none;')?>'>Alias
<TH style='font-size:10px;cursor:default;<?= (($_WithDoc  ==true)?'':'display:none;')?>'>Docs
</thead>
<tbody>
<?PHP
if( $_GET['TREE']==1 && !$_Development ){
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op where show_type<>'U' and show_type<>'D' order by seq");
}else{
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op order by seq");
}
$c = 0;
$Dim = array();
while( $r=qArray() ) $Dim[] = $r;
$TOpciones = count($Dim);
for( $n=0; $n<$TOpciones; $n++ ){
$r = $Dim[$n];
if( $r['status']=='' ) $r['status'] = '0';
echo '<tr n='.$r['cd_gs_op'];
if( $r['indent']>1 ) echo ' id=o';
if( $r['indent']==0 ) echo ' id=TAB';
echo '>';
$view = (($_GET['_GEST']=="VIEW")?' class=o':'');
if( $r['show_type']!='' ){
echo "<td id='st{$r['show_type']}'{$view}>".$_Show[$r['show_type']];
}else{
echo "<td{$view}>&nbsp;";
}
if( $r['mode']!='' ){
echo '<td id="mc'.$r['mode'].'">'.$_Mode[$r['mode']];
}else{
echo '<td>&nbsp;';
}
echo '<td Icon="'.$r['icon'].'">';
if( $r['icon']!='' ){
if( eFileType($r['icon'])=="svg" ){
echo file_get_contents(str_replace('$','edes.php?R:$a/g/',$r['icon']));
}else{
echo '<img src="'.str_replace('$','edes.php?R:$a/g/',$r['icon']).'">';
}
}else{
echo '&nbsp;';
}
echo '<td>'.chr($_ChrOFF);
echo "<td tp={$r['type']} id=n{$r['indent']}";
$txt = trim($r['caption']);
if( $r['type']=='L' ){
if( $txt=='' ){
echo " HR=''><img src=g/linea.gif width=100% height=2px>";
}else{
echo " HR=''><img src=g/linea.gif width=30px height=2px>".trim(substr($txt,0))."<img src=g/linea.gif width=30px height=2px>";
}
}else{
echo ' HR="'.str_replace('"','&quot;',trim($r['script_url'])).'"';
if( trim($r['tip'])!='' ) echo ' title="'.str_replace('"','&quot;',trim($r['tip'])).'"';
echo '>';
if( $r['type']=='F' ){
if( $n < $TOpciones-1 ){
if( $r['indent']==0 )
echo '<img src=g/tree_0.gif>';
else if( $r['indent'] < $Dim[$n+1]['indent'] ) echo '<img src=g/tree_1.gif>';
else echo '<img src=g/tree_0.gif>';
}else{
echo '<img src=g/tree_0.gif>';
}
}
echo str_replace('"','&quot;',$txt);
}
if( $r['icons']!='' ){
echo '<td ic="'.$r['icons'].'">';
echo '<table id=LstICON border=0 cellspacing=0 cellpadding=1px><tr>';
$DimIcon = explode(',',$r['icons']);
for( $c=0; $c<count($DimIcon); $c++ ){
if( $_DimIcon[$DimIcon[$c]]=='' ){
echo '<td><img src="edes.php?R:$a/g/inputext.gif"></td>';
}else{
echo '<td><img src="'.str_replace('$','edes.php?R:$',$_DimIcon[$DimIcon[$c]]).'"></td>';
}
}
echo '</tr></table>';
}else{
echo '<td ic="">&nbsp;';
}
$view = (($_StatusON==true)?'':' class=o');
echo "<td{$view}>&nbsp;";
echo "<td{$view}>";
$dt = $r['dt_status'];
if( substr($dt,2,1)!='' && substr($dt,2,1)!='-' ) $dt = substr($dt,8,2).substr($dt,4,4).substr($dt,0,4);
if( isZero($dt) ) $dt = '&nbsp;';
echo $dt;
if( $r['cd_gs_user'] > 0 ){
echo "<td u='{$r['cd_gs_user']}'{$view}>";
}else{
echo "<td{$view}>&nbsp;";;
}
$view = (($_GET['_GEST']=="ALL")?'':' class=o');
echo "<td{$view}>";
$txt = str_replace('"','&quot;',trim($r['alias']));
echo (($txt=='') ? '&nbsp;' : $txt);
$view = (($_WithDoc==true)?'':' class=o');
echo "<td{$view}>&nbsp;";
echo '</td></tr>';
}
echo '<tr height=1px style="font-size:1px">';
echo '<td>';
echo '<td>';
echo '<td height=1px style="font-size:1px;background-color:#f0f1ff">';
echo '<td>';
echo '<td>';
?>
</tbody>
</table>
</div>
</table>
<table id=SMenuIcons width=1px oncontextmenu='return eClearEvent()' style='position:absolute;display:none;border-collapse:collapse;' onmouseleave='this.style.display="none"' onclick='this.style.display="none"'>
<TR>
<?PHP   	?>
<TH class=THOption width=1px style="padding-left:5px;"><i src='g/l_order.gif' onclick='_Opcion="Me";FireEvent();' title='Mover Opción'>&#218;</i>
<TH class=THOption width=1px><i src='g/t_op_insert.gif' onclick='(_FILAS.length==1)? opAlta():_Opcion="I";FireEvent();' title='Alta de Opción'>I</i>
<TH class=THOption width=1px><i src='g/t_op_update.gif' onclick='_Opcion="U";FireEvent();' title='Modificar Opción'>U</i>
<TH class=THOption width=1px><i src='g/t_op_delete.gif' onclick='_Opcion="D";FireEvent();' title='Borrar Opción'>D</i>
<TH class=THOption width=1px><i src='g/t_op_view.gif' onclick='_Opcion="V";FireEvent();' title='Ver Opción'>V</i>
</TR><TR>
<TH class=THOption width=1px style="padding-left:5px;"><i src='g/tree_sel_one.gif' eON='0' onclick='SelGrupo()' title='Seleccionar grupo de opciones'>&#333;</i>
<TH class=THOption width=1px><i src='g/ts_pg_pr.gif' onclick='_Opcion="<";FireEvent(0);' title='Nivel Superior'>&#300</i>
<TH class=THOption width=1px><i src='g/ts_pg_nx.gif' onclick='_Opcion=">";FireEvent(0);' title='Nivel Inferior'>&#301</i>
<TH class=THOption width=1px><i src='g/tree_op_one.gif' onclick='OpInTreeON(0);FireEvent();' title='Opción en árboles'>&#369;</i>
<?PHP if( $_Development ){ ?>
<TH class=THOption width=1px><i src='g/tree_op_pk.gif' onclick='OpGetPK()' title='Código de la opción'>&#230</i>
<?PHP } ?>
</tr>
</table>
<div id=TreeContainer class="DivContainer SCROLLBAR" style="overflow:auto;padding:0px;position:absolute;display:none;vertical-align:top" onscroll='top.eScrollTH(this)'>
<table id=TreeGroup height=1px onclick="ShowOpTree()" oncontextmenu='return eClearEvent()'>
<col style='width:15px;text-align:center;font-family:<?= $_FontFamily; ?>;cursor:pointer'>
<col style='width:15px;text-align:left;cursor:default'>
<col style='width:15px;text-align:center;font-family:<?= $_FontFamily; ?>;cursor:pointer'>
<tr>
<th class=THOption style='font-size:10px;cursor:default'>Sel
<th>
<table border=0px cellspacing=1px cellpadding=0px height=1px>
<TH class=THOption>ÁRBOLES
<TH><div style="width:30px"> </div>
<?PHP  if( $_GET['_GEST']=="ALL" ){ ?>
<TH class=THOption width=1px><i src='g/treeGrupo.gif' eON='0' onclick='SelGrupoTree()' title='Seleccionar grupo de opciones' style="display:none">&#333;</i>
<TH class=THOption width=1px><i src='g/t_op_insert.gif' onclick='opInsertTree()' title='Alta de árbol'>I</i>
<TH class=THOption width=1px><i src='g/t_op_update.gif' onclick='opModNmTree()' title='Modificar nombre árbol'>U</i>
<?PHP  } ?>
<TH class=THOption width=1px><i src='g/t_op_view.gif' onclick='VerTree()' title='Solo mostrar el árbol'>V</i>
<TH class=THOption width=1px><i src='g/t_op_check.gif' onclick='MarcarTree()' title='Marcar árbol'>&#368;</i>
<?PHP  if( $_GET['_GEST']=="ALL" || $_GET['_GEST']=="OP" ){ ?>
<TH class=THOption width=1px><i src='g/t_grabar.gif' onclick='opSaveTree()' title='Grabar árbol' id=IcoGrabarTree>&#197</i>
<?PHP  } ?>
<?PHP  if( $_GET['_GEST']=="ALL" ){ ?>
<TH class=THOption width=1px><i src='g/tree_restore.gif' onclick='opRestoreTree()' title='Restaurar árbol' id=IcoRestoreTree>v</i>
<?PHP  } ?>
<TH style="width:100%">
<TH class=THOption width=1px><i src='g/tree_close.gif' onclick='EditarTree(0)' title='Cerrar ventana' id=IcoCloseTree>5</i>
</table>
<th class=THOption style='font-size:10px;cursor:default'>On
<?PHP
qQuery("select * from {$_SESSION['ShareDictionary']}gs_tree order by nm_gs_tree");
while( $r=qArray() ){
echo '<tr cd='.$r['cd_gs_tree'].'><td>'.chr($_ChrOFF);
$r['nm_gs_tree'] = str_replace('-','·',$r['nm_gs_tree']);
echo '<td nowrap>'.str_replace(' ','&nbsp;',$r['nm_gs_tree']);
echo '<td>'.(($r['permission']=='S')? chr($_ChrON) : chr($_ChrOFF));
}
?>
</table>
</div>
<div id=SOMBRA style="display:none;width:100%;height:100%;position:absolute;left:0px;top:0px;background-color:rgb(0,0,0,0.2)"></div>
<div id=opInTreeContainer class=DivContainer style="overflow:auto;padding:0px;position:absolute;display:none;vertical-align:top;z-index:9" onscroll='top.eScrollTH(this)'>
<table id=opInTreeGroup height=1px <?=(($_GET['_GEST']=="ALL" || $_GET['_GEST']=="OP")? ' onclick="OpInTreeClick()"':'')?> oncontextmenu='return eClearEvent()' style="background:#cccccc">
<col style='width:15px;text-align:center;font-family:<?= $_FontFamily; ?>;cursor:pointer'>
<col style='width:15px;text-align:left;cursor:default'>
<col style='width:15px;text-align:center;font-family:<?= $_FontFamily; ?>;cursor:default'>
<tr>
<th class=THOption style='font-size:10px;cursor:default;border-bottom-width:0px'>Sel
<th>
<table border=0px cellspacing=1px cellpadding=0px height=1px>
<TH class=THOption style='border-bottom-width:0px'>ÁRBOLES
<TH width=100%><div style="width:100%"> </div>
<?PHP  if( $_GET['_GEST']=="ALL" ){ ?>
<TH class=THOption width=1px style='border-bottom-width:0px;'><i src='g/t_grabar.gif' onclick='opInTreeSave()' oncontextmenu='InTreeClearMod()' title='Grabar opción en los árboles<?= "\n" ?>Anular los cámbios' id=OpInTreeSaveIMG style='margin-left:30px'>&#197</i>
<TH><div style="width:3px"></div>
<?PHP  } ?>
<TH class=THOption width=1px style='border-bottom-width:0px'><i src='g/tree_close.gif' onclick='OpInTreeClose()' title='Cerrar ventana'>5</i>
</table>
<th class=THOption style='font-size:10px;cursor:default;border-bottom-width:0px'>On
<?PHP
qQuery("select * from {$_SESSION['ShareDictionary']}gs_tree order by nm_gs_tree");
while( $r=qArray() ){
echo '<tr cd='.$r['cd_gs_tree'].'><td style="background:#ffffff">'.chr($_ChrOFF);
$r['nm_gs_tree'] = str_replace('-','·',$r['nm_gs_tree']);
echo '<td nowrap style="background:#ffffff">'.str_replace(' ','&nbsp;',$r['nm_gs_tree']);
echo '<td style="background:#ffffff">'.(($r['permission']=='S')? chr($_ChrON) : chr($_ChrOFF));
}
?>
</table>
</div>
<div id=RestoreContainer class="DivContainer SCROLLBAR" onscroll='top.eScrollTH(this)' onmouseleave='this.style.display="none"' style='overflow:auto; padding:0px;position:absolute;left:0px;top:0px;display:none;z-index:20;'>
</div>
<script type="text/javascript">
if( _EditandoArbol && _SoloConsulta ){
var Obj = S("#BROWSETH").obj.rows[0].cells;
for( n=2; n<Obj.length; n++ ){
Obj[n].style.display = 'none';
try{
if( Obj[n].children[0].id=='IcoRestore' ) break;
}catch(e){
break;
}
}
}
top.eLoading(0,window);
</script>
</BODY></HTML>
<?PHP
eEnd();
function LeerLP2(){
global $Dir_;
if( file_exists('../_d_/cfg/e'.'d.l'.'p') ){
$fd = @fopen('../_d_/cfg/e'.'d.l'.'p','r');
}else{
$fd = @fopen($Dir_.'t/e'.'d.l'.'p','r');
}
$cTxt = fread($fd,(1900+59)*100);
fclose($fd);
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+2,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+3+$n,1));
$Basura += $LongDeLong+3;
$b = 0;
$txt = '';
for( $n=$Basura; $n<$Basura+($LenCadena*2); $n++ ){
if( $b==0 ) $txt .= substr($cTxt,$n,1);
$b++; if( $b>1 ) $b=0;
}
$tmp = explode(chr(10),gzuncompress($txt));
if( 212940319 != crc32(trim($tmp[0])) ){
if( $_gsTron ) eTron('<P>0');
exit;
}
$tmp[1] = trim($tmp[1]);
@_LoadSqlIni('_',$tmp[1]);
for( $n=0; $n<count($tmp); $n++ ){
$tmp2 = explode(chr(9),$tmp[$n]);
if( $n==3 ) $NomCampo = $tmp2;
if( $n > 3 && $tmp2[3]==1 ){
echo 'u['.$tmp2[1]."]<BR>\n";
echo '@['.$tmp2[5]."]<BR>\n";
}
}
return '';
}
function CreaDir( $dir ){
if( is_dir( $dir ) ){
if( !is_readable(  $dir ) ) die('ERROR: (a) No es de lectura: '.$dir);
if( !is_writeable( $dir ) ) die('ERROR: (a) No es de escritura: '.$dir);
return;
}
if( !mkdir( $dir, 0777 ) )  die('No se ha podido crear el directorio: '.$dir);
if( !is_dir( $dir ) )		 die('No está el directorio: '.$dir);
if( !is_readable(  $dir ) ) die('ERROR: (d-7) No es de lectura: '.$dir);
if( !is_writeable( $dir ) ) die('ERROR: (d-8) No es de escritura: '.$dir);
}
function Decode( $s ){
$s = urldecode(trim($s));
$s = str_replace("&#39;" ,"'" , $s);
$s = str_replace("&#92;" ,"\\", $s);
$s = str_replace("&#126;","~" , $s);
return $s;
}
function GeneraTreeTxt( $CdTree, $DimIdiomas, $_Language ){
qQuery("select filename from {$_SESSION['ShareDictionary']}gs_tree where cd_gs_tree={$CdTree}", $na);
list($FileName) = qRow($na);
for($i=0; $i<count($DimIdiomas); $i++){
$Lenguaje = trim($DimIdiomas[$i]);
$DimLabel = array();
qQuery("select cd_gs_op,caption,caption_tip from {$_SESSION['ShareDictionary']}gs_op_lng where cd_gs_language='{$Lenguaje}' order by cd_gs_op");
while( $r=qRow() ) $DimLabel[trim($r[2]).$r[0]] = Decode(trim($r[1]));
$txt = '';
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op where cd_gs_op in (select cd_gs_op from {$_SESSION['ShareDictionary']}gs_tree_op where cd_gs_tree={$CdTree}) order by seq");
while( $r=qArray() ){
$txt .= str_repeat("\t", $r['indent']);
if( trim($r['icon'])!='' ) $txt .= '{'.trim($r['icon']).'} ';
if( $r['type']=='L' ) $txt .= '-';
$Lab = trim($DimLabel['C'.$r['cd_gs_op']]);
if( $Lab=='' ) $Lab = trim($r['caption']);
$txt .= $Lab;
if( $r['type']=='L' ){
$Lab = trim($DimLabel['T'.$r['cd_gs_op']]);
if( $Lab=='' ) $Lab = trim($r['tip']);
if( $Lab!='' ) $txt .= ' | ~ ~ '.$Lab;
}else{
$txt .= ' | '.trim($r['script_url']).' ~ '.$r['cd_gs_op'];
$Lab = trim($DimLabel['T'.$r['cd_gs_op']]);
if( $Lab=='' ) $Lab = trim($r['tip']);
if( $Lab!='' ) $txt .= ' ~ '.$Lab;
}
$txt .= "\n";
}
file_put_contents( "../tree/{$CdTree}.{$Lenguaje}.txt", $txt );
gsActivity( "../tree/{$CdTree}.{$Lenguaje}.txt" );
if( $_Language==$Lenguaje ){
file_put_contents( "../tree/{$CdTree}.txt", $txt );
gsActivity( "../tree/{$CdTree}.txt" );
$FileName = trim($FileName);
if( $FileName!='' ){
file_put_contents( "../tree/{$FileName}", $txt );
gsActivity( "../tree/{$FileName}" );
}
}
}
}
function CargarArbolMaster( $fichero ){
global $_HndDB,$DEBUG_TREE, $_Sql;
$df = fopen( $fichero, 'r' );
if( $df == false ){
die( '<br>ERROR DE LECTURA DEL FICHERO: '.$fichero );
}
if( eSqlType('oracle') ){
$xFecha =  date('d-m-Y');
}else{
$xFecha =  date('Y-m-d');
}
$carbol=0;
$nactual=0;
$padre[0]=0;
$padre[1]=1;
while( !feof($df) ){
$buff = fgets( $df, 512 );
list($buff,) = explode('~',$buff);
if( trim($buff) == '' ) continue;
$long = strlen( $buff ) - 1;
$tmp = ltrim($buff);
$snivel = substr_count(substr( $buff, 0, strpos($buff,$tmp[0])), chr(9) );
for( $i=0; !strcmp(chr(9), substr($buff,$i,1)); $i++ );
$sType = 'O';
if( $long > $i && $long > 0 ){
if( $i > $nactual ){
$nactual = $i;
$padre[$nactual] = $carbol-1;
}else{
$nactual = $i;
$padre[$nactual+1] = $carbol;
}
$buff = trim($buff);
$xx = explode('|',$buff);
if( trim($xx[1])!='' ){
$narbol = trim($xx[0]);
$opcion = trim($xx[1]);
if( $opcion[0] == ':' ){
$sType = 'F';
$niv = 1;
}else{
$niv = 2;
}
}else{
$sType = 'F';
$narbol = trim($xx[0]);
$opcion = '';
if( $i == 0 ){
$niv = 0;
}else{
$niv = 1;
}
}
$niv = $snivel;
$prox = $carbol + 1;
$opcion = str_replace("'","\'",$opcion);
$xMode = '';
if( $narbol=='-' ){
$narbol = '';
$sType = 'L';
}
$xIcon = '';
if( $narbol[0]=='{' ){
list($xIcon,$narbol) = explode('}',$narbol);
$narbol = trim($narbol);
$xIcon = trim(substr($xIcon,1));
}else if( $narbol[0]=='[' ){
list($tmp) = explode(']',$narbol);
$tmp = strtoupper($tmp);
if( substr_count($tmp,'.GIF')==1 || substr_count($tmp,'.JPG')==1 || substr_count($tmp,'.PNG')==1 ){
list($xIcon,$narbol) = explode(']',$narbol);
$narbol = trim($narbol);
$xIcon = trim(substr($xIcon,1));
}
}
if(  $opcion[0]=='¿' ){
list( ,$Accion ) = explode('?',$opcion);
list( $Accion ) = explode(':',trim($Accion));
}else{
list( $Accion ) = explode(':',$opcion);
}
if( strlen($Accion)<4 ){
switch( strtoupper(substr($Accion,1,1)) ){
case 'C': case 'L':
$xMode = 'V';
break;
case 'B':
$xMode = 'D';
break;
case 'M':
$xMode = 'U';
break;
case 'A':
$xMode = 'I';
break;
default:
}
}else if( substr($Accion,0,2)=='>$' || substr($Accion,0,3)=='m>$' || substr($Accion,0,16)=='window.external.' ) $xMode = 'S';
$Hoy = date('Y-m-d');
$q = "insert into {$_SESSION['ShareDictionary']}gs_op (cd_gs_op, mode, seq, caption, indent, type, script_url, dt_add, icon, status, dt_status) values ({$prox}, '{$xMode}', {$carbol}, '{$narbol}', {$niv}, '{$sType}', '{$opcion}', '{$xFecha}', '{$xIcon}', '', '{$Hoy}')";
if( $DEBUG_TREE ) saveLog($q);
qQuery($q);
if( $DEBUG_TREE ) saveLog(' -- OK');
qFree();
$carbol++;
}
}
$carbol--;
qFree();
fclose( $df );
}
?>
