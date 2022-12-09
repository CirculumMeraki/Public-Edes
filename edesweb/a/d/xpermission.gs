<?PHP
if( !function_exists('qQuery') ){
global $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOType, $_SqlInit, $_SqlPDOConnect;
$tmpFile = '../_datos/config/sql.ini';
eval( _LoadSqlIni( $tmpFile ) );
include( $Dir_.$_Sql.'.inc' );
}
if( isset($_POST['cd_gs_tpermission']) ){
if( qCount("{$_SESSION['ShareDictionary']}gs_tpermission", 'cd_gs_tpermission='.$_POST['cd_gs_tpermission'])>0 ){
qQuery("update {$_SESSION['ShareDictionary']}gs_tpermission set note='".trim(str_replace('<BR>',"\n",$_POST['note']))."' where cd_gs_tpermission=".$_POST['cd_gs_tpermission']);
$ZIP = false;
$file = "gs_tpermission";
$sTABLA = "{$_SESSION['ShareDictionary']}gs_tpermission";
$pnt = '';
qQuery("select * from {$sTABLA}", $pnt);
if( $ZIP ){
$fd = gzopen("../tree/{$file}.unl", "w9");
}else{
$fd = fopen("../tree/{$file}.unl", 'w');
}
$TReg = 0;
$Pipa = false;
while( $linea=qRow($pnt) ){
$txt = '';
if( $Pipa ) $txt .= "\n";
$Pipa = false;
foreach( $linea as $valor ){
if( $Pipa ){
$txt .= '|';
}else{
$Pipa = true;
}
$valor = str_replace(chr(10),'{&#10;}',$valor);
$valor = str_replace(chr(13),'{&#13;}',$valor);
$valor = str_replace('"','{&#34;}',$valor);
$valor = str_replace('|','{&#124;}',$valor);
$txt .= trim((string)$valor);
}
if( $ZIP ){
gzwrite($fd, $txt);
}else{
fputs($fd, $txt);
}
$TReg++;
}
if( $ZIP ){
gzclose($fd);
}else{
fclose($fd);
}
if( $TReg==0 ){
@unlink("../tree/{$file}.unl");
}else{
qQuery("insert into {$_SESSION['ShareDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '".date('Y-m-d H:i:s')."', '/tree/{$file}.unl', 'C', '{$_SESSION['_UserEMail']}')");
}
}
echo '<script type="text/javascript">top.eInfo(window.frameElement,"Grabado");</script>';
eEnd();
}
?>
<html><head>
<?= eLink('list','list_print') ?>
<style>
#o { display: none; }
#n0 { padding-left: 5px; }
#n1 { padding-left: 22px; }
#n2 { padding-left: 39px; }
#n3 { padding-left: 56px; }
#n4 { padding-left: 73px; }
#n5 { padding-left: 90px; }
#n6 { padding-left: 107px; }
#n7 { padding-left: 124px; }
#n8 { padding-left: 141px; }
#n9 { padding-left: 158px; }
TH {
text-transform: none;
cursor: default;
}
</style>
<?=_FileNoCache('edes.js')?>
<SCRIPT type="text/javascript">
var _MaxLeng = 250;
var _oOld = _Old = '', _Id = 0, _Obj;
function THScroll( NomId, Padre, Ajuste ){
var Obj = DGI( NomId );
if( Obj.yTop == undefined ) Obj.yTop = top.eXY(Obj)[1];
if( Obj.yTop > Padre.scrollTop ){
Obj.rows[0].style.position = '';
}else{
with( Obj.rows[0].style ){
position = 'relative';
top = Padre.scrollTop - Obj.yTop - Ajuste;
left = -Obj.clientLeft;
}
}
}
function eClearEvent(men){
try{
if( event==null ) return false;
S.eventClear(window);
}catch(e){}
if( null!=men ) top.eAlert( S.lng(209), S.lng(216), 'A','W' );
return false;
}
function uClick(){
var Obj = S.event(window);
if( Obj.tagName=='IMG' ){
Obj = Obj.parentNode;
if( Obj.cellIndex!=3 ) return;
Obj = Obj.parentNode.cells[2];
}
if( Obj.tagName!='TD' ) return;
if( Obj.cellIndex==1 ){
if( Obj.parentNode.cells[Obj.cellIndex-1].SR==undefined ) return;
}else if( Obj.cellIndex!=2 ) return;
if( '<?=$_GET['_cm']?>'=='c' ){
top.eSWOpen(window, 'edes.php?L<?=$_GET['_cm']?>l:$a/d/tpermission_user.edf&_cd_gs_tpermission='+Obj.parentNode.cells[Obj.cellIndex-1].id );
}else{
top.eSWOpen( window, 'edes.php?FcR:$a/d/tpermission.edf&_SEEK&_NOBUTTON&cd_gs_tpermission='+Obj.parentNode.cells[Obj.cellIndex-1].id+'&_cm=<?=$_GET['_cm']?>' );
}
}
function eCallSrvPost( Url, Dim ){
var txt = "<?=eHTML('','','',true)?></HEAD>"+'<BODY><FORM METHOD=POST NAME="FRM1">',i;
for( i in Dim ) txt += '<INPUT TYPE="text" NAME="'+i+'" VALUE="'+Dim[i]+'">';
txt += '</FORM></BODY></HTML>';
top.TLF.document.open();
top.TLF.document.write( txt );
top.TLF.document.FRM1.action = Url;
top.TLF.document.FRM1.submit();
}
function uSave(){
if( _Obj.innerHTML==_oOld ) return;
eCallSrvPost('edes.php?E:$a/d/xpermission.gs?SAVE=1', {'cd_gs_tpermission':_Id, 'note':_Old});
var c = DGI("BROWSE").cells, n;
for( n=0; n<c.length; n++ ) if( c[n].id==_Id ) c[n].parentNode.cells[c[n].cellIndex+1].innerHTML = _Old;
}
function uKeyDown(){
if( S.eventCode(event)==121 ){
var Obj = S.event(window).parentNode;
Obj.innerHTML = S.event(window).innerHTML;
_Old = top.eTrim(Obj.innerHTML);
Obj.onfocusout = '';
uSave();
}else if( S.eventCode(event)==27 ){
var Obj = S.event(window).parentNode;
Obj.innerHTML = _Old;
Obj.onfocusout = '';
}
}
function uKeyPress(){
if( S.event(window).innerHTML.length+1 > _MaxLeng ){
top.eInfo(window,'No caben más caracteres');
return eClearEvent();
}
if( S.eventCode(event)==13 ){
if( S.event(window).innerHTML.length+4 > _MaxLeng ){
top.eInfo(window,'No caben más caracteres');
return eClearEvent();
}
with( document.selection ){
createRange().pasteHTML('<br>');
createRange().select();
}
return eClearEvent();
}
}
function uModLabel(){
var Obj = S.event(window);
if( Obj.tagName!='TD' ) return;
if( Obj.cellIndex==1 ){
if( Obj.parentNode.cells[Obj.cellIndex-1].SR==undefined ) return;
}else if( Obj.cellIndex!=2 ) return;
Obj.focus();
_Obj = Obj;
_oOld = Obj.innerHTML;
_Old = Obj.innerHTML;
_Id = Obj.parentNode.cells[Obj.cellIndex-1].id;
Obj.innerHTML = '<span eKey=1 contentEditable=true onkeyPress="uKeyPress()" onKeyDown="uKeyDown()">'+Obj.innerHTML+'</span>';
Obj.children[0].focus();
Obj.onfocusout = function anonymous(){
var Obj = S.event(window).parentNode;
_Old = top.eTrim(S.event(window).innerHTML);
Obj.innerHTML = _Old;
Obj.onfocusout = '';
uSave();
}
}
</SCRIPT>
</head><body onscroll='THScroll("BROWSE",document.body,4)' onload='THScroll("BROWSE",document.body,4)'>
<?PHP
$_PLUGIN['usertree.form'] = array(10,10,'R',300,600);
$DimType = array('V'=>'_view', 'U'=>'_update', 'E'=>'_exe', 'O'=>'' );
if( !isset($_PLUGIN['usertree.form'][3]) ) $_PLUGIN['usertree.form'][3] = 300;
$Ancho = ''; if( isset($_PLUGIN['usertree.form'][4]) ) $Ancho = ' width='.$_PLUGIN['usertree.form'][4]+"px";
?>
<center>
<TABLE class=TITULO id=GROUPTITLE border=0 cellspacing=0 cellpadding=0 style='background:transparent'>
<tr><td id=TITULO align=center nowrap style='cursor:default;background:transparent;'>MODIFICACION TEXTOS PERMISOS ESPECIALES</td></tr>
</TABLE>
<table id=BROWSE onclick='uClick()'<?=$Ancho?> oncontextmenu='uModLabel();return eClearEvent();'>
<col class='Celda' style='cursor:pointer;vertical-align:top;'>
<col class='Celda' style='cursor:pointer;width:15px;text-align:center;font-family:<?= $_FontFamily ?>px;display:none'>
<col class='Celda' style='cursor:pointer;width:<?= $_PLUGIN['usertree.form'][3] ?>px;white-space:nowrap;'>
<col class='Celda' style='cursor:pointer;text-align:center;'>
<tr><th>Opción<th style="font-family:verdana;">Sel<th>Descripción<th title="Acción">A
<?PHP
if( $_OpTreeTYPE=='rol' ){
if( isset($_vF['cd_gs_rol']) ) $uUser = $_vF['cd_gs_rol'];
}else{
if( isset($_vF['cd_gs_user']) ) $uUser = $_vF['cd_gs_user'];
}
$RolPermission = '';
$DimTPermission = array();
$UserPermission = ',';
if( $_Modo=='mR' || $_Modo=='cR' || $_Modo=='bR' ){
qQuery( "select * from gs_{$RolPermission}permission order by cd_gs_tpermission", $p1 );
while( $r2=qArray($p1) ){
$DimTPermission[ $r2['cd_gs_tpermission'] ] = 1;
$UserPermission .= $r2['cd_gs_tpermission'].',';
}
}
$Opciones = '';
$TP = array();
$TPSinOp = array();
qQuery("select * from {$_SESSION['ShareDictionary']}gs_tpermission where active='S' order by type,note");
while( $r=qArray() ){
if( !$EmptySpecial && ($_Modo=='cR' || $_Modo=='bR') && !isset($DimTPermission[$r['cd_gs_tpermission']]) ) continue;
if( trim($r['options'])!='' ){
$Opciones .= ','.$r['options'];
$TP[] = $r;
}else{
$TPSinOp[] = $r;
}
}
$TodasLasOpciones = $Opciones.',';
if( $Opciones!='' ) $Opciones = substr($Opciones, 1);
if( $Opciones=='' ) $Opciones = 0;
$Folder = ',';
qQuery("select cd_gs_op,indent,type,caption,seq from {$_SESSION['ShareDictionary']}gs_op where cd_gs_op in ({$Opciones}) order by seq");
while( $r=qArray() ){
if( $r['type']=='O' ){
$i = $r['indent'];
$s = $r['seq'];
$Dim = array();
for($i=$r['indent']-1; $i>=0; $i--){
qQuery("select cd_gs_op,indent,caption,type from {$_SESSION['ShareDictionary']}gs_op where seq<{$s} and indent={$i} and type='F' order by seq desc", $p1);
$f = qArray($p1);
if( substr_count($Folder, ','.$f['cd_gs_op'].',')==0 ){
$Folder .= $f['cd_gs_op'].',';
$Dim[] = "<tr><td tp=F id=n{$f['indent']} colspan=4>".'<img src=g/tree_0.gif>'.str_replace('"', '&quot;', trim($f['caption']));
}
}
for($i=count($Dim)-1; $i>=0; $i--) echo $Dim[$i];
}
$rs = 0;
$xPermission = '';
for($n=0; $n<count($TP); $n++){
if( substr_count(','.$TP[$n]['options'].',', ','.$r['cd_gs_op'].',')>0 ){
$SeRepite = 2;
$rs++;
if( $rs>1 ) $xPermission .= '<tr>';
$xPermission .= '<td id='.$TP[$n]['cd_gs_tpermission'].' SR='.$SeRepite.'>';
$xPermission .= ( (  substr_count( $UserPermission, ','.$TP[$n]['cd_gs_tpermission'].',' ) > 0  ) ? chr($_ChrON) : chr($_ChrOFF) );
$xPermission .= '<td>'.str_replace(chr(10),'<br>',$TP[$n]['note']);
$xPermission .= '<td><img src="g/l_op'.$DimType[$TP[$n]['type']].'.gif"';
if( $_Development ) $xPermission .= ' title="'.str_replace('"','\"',$TP[$n]['nm_gs_tpermission']).'"';
$xPermission .= '>';
}
}
echo "<tr><td tp={$r['type']} id=n{$r['indent']} style='font-weight:bold' rowspan={$rs}>";
$txt = trim($r['caption']);
if( $r['type']=='L' ){
if( $txt=='' ){
echo "<img src=g/linea.gif width=100% height=2px style='cursor:default;margin-top:3px'>";
}else{
echo "<img src=g/linea.gif width=30px height=2px style='cursor:default'>".trim(substr($txt,1))."<img src=g/linea.gif width=30px height=2px style='cursor:default'>";
}
}else{
if( $r['type']=='F' ) echo '<img src=g/tree_0.gif>';
echo str_replace('"','&quot;',$txt);
echo $xPermission;
}
}
for( $n=0; $n<count($TPSinOp); $n++ ){
echo '<tr><td style="cursor:default;background:#cccccc;font-size:85%">(sin opción de menú)<td id='.$TPSinOp[$n]['cd_gs_tpermission'].' SR=1>';
echo ((substr_count($UserPermission, ','.$TPSinOp[$n]['cd_gs_tpermission'].',')>0) ? chr($_ChrON) : chr($_ChrOFF));
echo '<td>'.$TPSinOp[$n]['note'];
echo '<td><img src="g/l_op'.$DimType[$TPSinOp[$n]['type']].'.gif"';
if( $_Development ) echo ' title="'.str_replace('"','\"',$TPSinOp[$n]['nm_gs_tpermission']).'"';
echo '>';
}
echo '</tr></table>';
echo '</center>';
?>
<script type="text/javascript">
function eResize( Repetir ){
var TABLA = DGI("BROWSE");
var DIV = TABLA.parentNode;
var xy = top.eXY(DIV);
if( DIV.clientWidth < DIV.scrollWidth ){
DIV.style.width = TABLA.offsetWidth + (DIV.scrollWidth-DIV.clientWidth) + 2;
}
if( DIV.clientWidth > TABLA.offsetWidth ) DIV.style.width = TABLA.offsetWidth + 2;
if( xy[1]+2+TABLA.offsetHeight > document.body.clientHeight ){
DIV.style.height = document.body.clientHeight - xy[1];
}else{
if( DIV.clientHeight < TABLA.offsetHeight ) DIV.style.height = TABLA.offsetHeight + 2;
}
if( DIV.clientHeight > TABLA.offsetHeight ) DIV.style.height = TABLA.offsetHeight + 2;
if( TABLA.offsetWidth > TABLA.MaxAncho ) TABLA.MaxAncho = TABLA.offsetWidth;
else TABLA.style.width = TABLA.MaxAncho;
if( Repetir==undefined ) setTimeout( 'eResize(1)', 1 );
}
if( top.eIsWindow(window) ){
top.eSWIResize( window, BROWSE.offsetWidth+50, BROWSE.offsetHeight+50 );
top.eSWView(window);
}else top.eLoading(0,window);
</script>
<?PHP
