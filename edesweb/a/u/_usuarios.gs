<?PHP
if( !isset($_SESSION['_User']) || $_SESSION['_D_']=="" ) exit;
if( $_gsID!=getmypid() ) exit;
$_DirG = 'g/e'; include_once( $Dir_.'t/lp.gs' );
$_IniSg = microtime();
$_DimCol  = explode(',','TIPO,LOGIN,CLAVE,ACCESO,LOGEAR,EMAIL,iTools,Edit,Help,Shell,Tools,Icon,Create,FTP,Tree');
$TEdicion = explode(',','U   ,TL   ,SN   ,SN    ,SN    ,TE   ,3     ,3   ,3   ,6    ,3    ,3   ,3     ,3  ,SN  ');
$TAlign   = explode(',','I   ,I    ,C    ,C     ,C     ,I    ,C     ,C   ,C   ,C    ,C    ,C   ,C     ,C  ,C   ');
if( $_POST['Operacion']==date("Ymd") ){
GenerarPermisos();
}else if( isset($_POST['Desarrollo']) ){
UsuariosSave($_POST['Desarrollo']);
}else{
UsuariosDeDesarrollo($_gsNomUser);
}
function GenerarPermisos(){
global $_Sql;
include('../_datos/config/sql.ini');
eInclude($_Sql);
$DimUser = array();
$DimFila = explode("\n", trim(Leer_LP()));
for($f=4; $f<count($DimFila); $f++){
$tmp = explode("\t",$DimFila[$f]);
if( $tmp[3]==1 ){
$tmp[5] = trim($tmp[5]);
$txt = "<"."?PHP"."\n".
'$_gsMaster = "'.$tmp[0].'";'."\n".
'$_gsACCESO = array('."\n".
"\t".'"EMAIL"=>"'.$tmp[5].'",'."\n".
"\t".'"ACCESO"=>1,'."\n".
"\t".'"Edit"=>'.($tmp[7]*1).','."\n".
"\t".'"Shell"=>'.($tmp[9]*1).','."\n".
"\t".'"Help"=>'.($tmp[8]*1).','."\n".
"\t".'"Icon"=>'.($tmp[10]*1).','."\n".
"\t".'"Create"=>'.($tmp[11]*1).','."\n".
"\t".'"Tools"=>'.($tmp[6]*1)."\n".
');'."\n".
'$_gsNomUser = $_gsACCESO["EMAIL"];'."\n".
"?".">";
qQuery("select cd_gs_user from gs_user where email='{$tmp[5]}'");
list($pk) = qRow();
if( $pk>0 ){
$DimUser[] = $pk;
$file = "../_d_/".$pk.'.dvl';
if( file_exists($file) ){
@unlink($file.'.bak');
copy($file, $file.'.bak');
}
file_put_contents($file, $txt);
}
}else{
}
}
$DirBase = "../_d_";
$di = opendir($DirBase);
while( $file=readdir($di) ){
if( $file!='.' && $file!='..' ){
if( !is_dir("{$DirBase}/{$file}") && (substr($file,-4)==".dvl" || substr($file,-8)==".dvl.bak") ){
$NomFile = $DirBase.'/'.$file;
$pk = explode(".", $file)[0];
if( !in_array($pk, $DimUser) ){
@unlink($NomFile);
}
}
}
}
closedir($di);
eHTML();
?>
</HEAD><BODY onhelp='return false;' oncontextmenu='return false;'>
<SCRIPT type="text/javascript">
top.eAlert( '', 'Permisos Generados&nbsp;&nbsp;', '-', 'I' );
setTimeout( "top.eAlertHide()", 2000 );
</SCRIPT></BODY></HTML>
<?PHP
eEnd();
}
function Leer_LP(){
global $Dir_;
if( file_exists('../_d_/cfg/e'.'d.l'.'p') ){
$fd = @fopen('../_d_/cfg/e'.'d.l'.'p','r');
}else{
exit;
}
$cTxt = @fread($fd,(1900+59)*100);
@fclose($fd);
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+2,1));
$LenCadena = '';
for($n=0; $n<$LongDeLong; $n++) $LenCadena .= ord(substr($cTxt,$Basura+3+$n,1));
$Basura += $LongDeLong + 3;
$b = 0;
$txt = '';
for( $n=$Basura; $n<$Basura+($LenCadena*2); $n++ ){
if( $b==0 ) $txt .= substr($cTxt,$n,1);
$b++; if( $b>1 ) $b=0;
}
$tmp = explode(chr(10), gzuncompress($txt));
if( 212940319 != crc32(trim($tmp[0])) ) exit;
@_LoadSqlIni('_', trim($tmp[1]));
$txt = gzuncompress($txt);
if( substr_count($txt, chr(9).$_SESSION['_UserEMail'].chr(9))==0 ) ePrintR("");
return $txt;
}
function UsuariosDeDesarrollo( $NomUser ){
global $_DimCol, $TEdicion, $TAlign;
$DimFila = explode("\n", trim(Leer_LP()));
$Autor = false;
for($f=4; $f<count($DimFila); $f++){
$tmp = explode("\t", $DimFila[$f]);
if( $tmp[0]=='~' ) $Autor = true;
}
$gsEdition = (($_SESSION['_D_']=='~')? ' onload="top.eITools(window);"':'');
?>
<html><head><title>e-Des · Usuarios</title>
<style>
.SinAcceso {
background-color: #dcdcdc;
}
.SUBMENU {
position: absolute;
display: none;
background: #3f474c;
}
.SUBMENU TD {
background: #FFFFCC;
padding: 0px 5px 0px 5px;
}
.BROWSE THEAD TH{
cursor:default;
}
.BROWSE TBODY{
cursor:pointer;
}
</style>
<SCRIPT type="text/javascript" name=eDes>
document.title = "LIST";
top.S.init(window,"all,list");
<?= include("../../edesweb/binary.js"); ?>
</SCRIPT>
</HEAD><BODY<?= $gsEdition; ?> on-scroll=S(document.body).scrollSet("#DATOS"); onhelp='return top.gsHelp("$dv_usuarios",event);'<?=( ($_SESSION['_D_']!='~') ? ' oncontextmenu="return false;"' : '' )?> onselectstart='return false;'>
<TABLE id=SMU class="SUBMENU col_0l" cellspacing=1px cellpadding=1px border=0px onclick='PutValor(this)' onmouseleave=this.style.display="none">
<?PHP
if( $Autor ) echo '<TR><TD>e-Des</TD></TR>';
?>
<TR><TD>Analista</TD></TR>
<TR><TD>Master</TD></TR>
<TR><TD>Programador</TD></TR>
<TR><TD>Help</TD></TR>
<?PHP
if( $Autor ) echo '<TR><TD>Demo</TD></TR>';
?>
</TABLE>
<TABLE id=SMSN class=SUBMENU cellspacing=1px cellpadding=1px border=0 onclick='PutValor(this)' onmouseleave=this.style.display="none">
<TR><TD>Si
<TR><TD>No
</TABLE>
<TABLE id=SMNum class=SUBMENU cellspacing=1px cellpadding=1px border=0 onclick='PutValor(this)' onmouseleave=this.style.display="none">
<TR><TD>0
<TR><TD>1
<TR><TD>2
<TR><TD>3
<TR><TD>4
<TR><TD>5
<TR><TD>6
</TABLE>
<SCRIPT type="text/javascript">
var _FCH_ = '$a/u/_usuarios.gs';
if( window.name == 'IWORK' ){
document.write('<CENTER><B>USUARIOS DE DESARROLLO</B></CENTER>');
top.eLoading(false,window);
}
function Grabar(){
_Baja = false;
var Obj = document.getElementById('DATOS').rows,
txt = '',
DimUsu = new Array(), f, c;
for(f=0; f<Obj.length; f++){
if( f > 0 ) txt += '\n';
var UnUsu = '';
for(c=0; c<Obj[0].cells.length; c++){
if( Obj[f].cells[c].textContent.replace(/\s+$/g,'')=='STYLE' ){
txt += 'Tools\t';
}else{
txt += Obj[f].cells[c].textContent + '\t';
}
if( c<2 ){
UnUsu += Obj[f].cells[c].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'').toUpperCase()+'|';
if( Obj[f].cells[c].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'')=='' ){
top.eAlert(S.lng(212), 'Las columnas "TIPO" y "LOGIN" son obligatorias', 'A', 'E');
return;
}
}
}
UnUsu = Obj[f].cells[5].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'').toUpperCase();
if( DimUsu[UnUsu]==1 ){
var tmp = UnUsu.split('|');
top.eAlert(S.lng(212), 'Usuario <b>"'+UnUsu.toLowerCase()+'"</b> repetido', 'A', 'E');
return;
}
DimUsu[UnUsu] = 1;
}
var sHTM = "<?=eHTML('','','',true)?><BODY>"+
'<FORM METHOD=POST ACTION="edes.php?E:$a/u/_usuarios.gs">';
sHTM += '<INPUT TYPE="HIDDEN" NAME="Desarrollo" VALUE="'+txt+'">';
sHTM += '</FORM></BODY></HTML>';
top.TLF.document.write( sHTM );
top.TLF.document.close();
top.TLF.document.forms[0].submit();
}
<?PHP if( $_SESSION["_D_"]=="~" ){ ?>
function GenerarPermisos(){
var sHTM = "<?=eHTML('','','',true)?></HEAD><BODY>"+
'<FORM METHOD=POST ACTION="edes.php?E:$a/u/_usuarios.gs">';
sHTM += '<INPUT TYPE="HIDDEN" NAME="Operacion" VALUE="<?=date("Ymd")?>">';
sHTM += '</FORM></BODY></HTML>';
top.TLF.document.write( sHTM );
top.TLF.document.close();
top.TLF.document.forms[0].submit();
}
<?PHP } ?>
function Alta(){
_Baja = false;
var Obj = document.getElementById('DATOS'),
TR = Obj.insertRow(Obj.rows.length), c
for(c=0; c<Obj.rows[0].cells.length; c++){
TR.insertCell(c).textContent=' ';
}
TR.cells[1].innerHTML='&nbsp;';
document.body.scrollTop = 1000;
}
var _Baja = false;
function Baja(){
_Baja = true;
}
function PutValor( el ){
if( S.event(window).tagName!='TD' ) return;
var Valor = S.trim(S.event(window).textContent);
if( DATOS.rows[0].cells[_Obj.cellIndex].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'').toUpperCase() == 'CREATE' ){
if(Valor!=3 && _Obj.parentNode.cells[1].textContent.replace(/^\s+/g,'').replace(/\s+$/g,'')=='<?= $NomUser; ?>' ){
top.eAlert( S.lng(212), 'No se puede quitar uno mismo el acceso a gsCreate', 'A', 'E' );
return;
}
}
_Obj.textContent = Valor;
if( _Obj.textContent=='0' ) _Obj.textContent = '';
el.style.display = 'none';
}
function xy( el ){
var xy = new Array(0,0);
while( el != null ){
xy[0] += el.offsetLeft;
xy[1] += el.offsetTop;
el = el.offsetParent;
}
return xy;
}
var _Obj = null;
function SubMenu(){
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return;
if( _Baja ){
var TR = Obj.parentNode;
document.getElementById('DATOS').deleteRow(TR.rowIndex);
_Baja = false;
setTimeout(function(){
S(document.body).scrollSet("#DATOS");
},100);
return;
}
_Baja = false;
var TH = Obj.parentNode.parentNode.parentNode.rows[0].cells[Obj.cellIndex];
_Obj = Obj
var NomSMenu = 'SM'+TH.getAttribute("T");
switch( TH.getAttribute("T") ){
case 'U':
break;
case 'TL':
EditTd();
return false;
case 'TE':
EditTd();
return false;
case 'SN':
break;
default:
for(var i=0; i<7; i++) document.getElementById("SMNum").rows[i].style.display = (TH.getAttribute("T")<i) ? 'none':'block';
NomSMenu = 'SMNum';
}
var cxy = xy( Obj );
with( DGI(NomSMenu).style ){
left = px(cxy[0]-1);
top = px(cxy[1]+Obj.offsetHeight);
display = 'block';
}
}
</SCRIPT>
<SCRIPT type="text/javascript">
function eClearEvent(men){
try{
S.eventClear(window);
}catch(e){}
return false;
}
function EditTdExit(){
var Obj = S.event(window),
txt = Obj.value.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+\s+/g,' ');
Obj = Obj.parentNode;
document.body.focus();
setTimeout(function(){
Obj.innerHTML = txt;
},1);
return eClearEvent();
}
function EditTdKey(){
var iCode = S.eventCode(event);
event.returnValue = true;
if( iCode == 13 ){
EditTdExit();
return eClearEvent();
}else if( iCode == 27 ){
var Obj = S.event(window);
Obj = Obj.parentNode;
Obj.textContent = Obj.vOld;
return eClearEvent();
}
return true;
}
function EditTd(){
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return false;
Obj.vOld = Obj.textContent;
var oInput = document.createElement('INPUT');
oInput.onkeydown = EditTdKey;
oInput.value = Obj.textContent;
oInput.onblur = EditTdExit;
Obj.textContent = '';
Obj.appendChild(oInput);
oInput.focus();
return false;
}
</SCRIPT>
<CENTER><BR>
<?PHP
$DimTipo = array( '~'=>'e-Des', 'A'=>'Analista', 'M'=>'Master', 'P'=>'Programador', 'H'=>'Help', 'D'=>'Demo');
$DimTE = array();
$DimAlign = array();
for( $c=0; $c<count($_DimCol); $c++ ){
$DimTE[$_DimCol[$c]] = $TEdicion[$c];
$DimAlign[$_DimCol[$c]] = $TAlign[$c];
}
$ColEdit = array();
echo '<TABLE id=DATOS class="BROWSE col_2c col_3c col_4c col_6r col_7r col_8r col_9r col_10r col_11r col_12r col_13c col_14r" onclick="SubMenu()" style="margin-bottom:10px">';
$tmp = explode("\t",$DimFila[3]);
$TotalCol = max(count($_DimCol), count($tmp));
for( $c=0; $c<$TotalCol; $c++ ){
if( in_array( $tmp[$c], $_DimCol )){
echo '<COL id='.$DimAlign[$tmp[$c]];
if( $tmp[$c]=='LOGIN' ){
echo ' style="text-transform:uppercase;"';
}else if( $tmp[$c]=='EMAIL' ){
echo ' style="text-transform:lowercase;"';
}
echo '>';
}
}
echo '<THEAD><TR>';
for( $c=0; $c<$TotalCol; $c++ ){
if( in_array( $tmp[$c], $_DimCol )){
echo '<TH T='.$DimTE[$tmp[$c]].' id=C>'.((strtoupper($tmp[$c])=='TOOLS')?'STYLE':$tmp[$c]);
$ColEdit[$c] = 1;
}else{
$ColEdit[$c] = 0;
}
}
echo '</THEAD><TBODY>';
for( $f=4; $f<count($DimFila); $f++ ){
$tmp = explode("\t",$DimFila[$f]);
if( count($tmp)<$TotalCol ) for( $i=count($tmp); $i<$TotalCol; $i++ ) $tmp[$i] = ' ';
echo '<TR>';
if( $tmp[3] == 1 ){
$Clase = '';
}else{
$Clase = ' class=SinAcceso';
}
for( $c=0; $c<$TotalCol; $c++ ){
if( $ColEdit[$c] ){
if( $c==2 ){
if( strlen(trim($tmp[$c]))==32 ){
echo "<TD{$Clase}>Si";
}else{
echo "<TD{$Clase}>No";
}
}else if( $c==3 || $c==4 || $c==27 ){
if( $tmp[$c] == 1 ){
echo "<TD{$Clase}>Si";
}else{
echo "<TD{$Clase}>No";
}
}else{
if( $c==0 ){
echo "<TD{$Clase}>".$DimTipo[$tmp[$c]];
}else{
echo "<TD{$Clase}>".$tmp[$c];
}
}
}
}
}
echo '</TBODY></TABLE><BR>';
?>
<table onclick=Alta()	class=OpButton border=0px cellspacing=0px cellpadding=0px style="display:inline-table;"><tr><td><i class="ICONINPUT ICONINSERT">I</i><td>&nbsp;Alta</table>&nbsp;
<table onclick=Baja()	class=OpButton border=0px cellspacing=0px cellpadding=0px style="display:inline-table;"><tr><td><i class="ICONINPUT ICONDELETE">D</i><td>&nbsp;Borrar</table>&nbsp;&nbsp;&nbsp;
<table onclick=Grabar()	class=OpButton border=0px cellspacing=0px cellpadding=0px style="display:inline-table;"><tr><td><i class="ICONINPUT ICONUPDATE">U</i><td>&nbsp;Grabar</table>
<?PHP
if( $_SESSION["_D_"]=="~" ){
?>
<table onclick=GenerarPermisos() class=OpButton border=0px cellspacing=0px cellpadding=0px style="display:inline-table;"><tr><td><i class="ICONINPUT ICONSEEK">&#241;</i><td>&nbsp;Generar Permisos</table>
<?PHP
}
echo '</CENTER>';
?>
<SCRIPT type="text/javascript">
if( window.frameElement.MODAL!=undefined ) top.eSWIResize( window, -1 );
top.eLoading(0,window);
</SCRIPT>
<?PHP
echo '</BODY></HTML>';
eEnd();
}
function UsuariosSave( $NewUSU ){
$DimFila = explode("\n", trim(Leer_LP()));
$DimTH = explode("\t", $DimFila[3]);
$TotalCol = count($DimTH);
$txt = '';
for( $f=0; $f<4; $f++ ){
$txt .= trim($DimFila[$f]).chr(10);
}
$txt = chop($txt);
$DimPassword = array();
for( $f=4; $f<count($DimFila); $f++ ){
$tmp = explode("\t",$DimFila[$f]);
$DimPassword[ $tmp[0].$tmp[1] ] = $tmp[2];
}
$DimTipo = array( 'e-Des'=>'~', 'Analista'=>'A', 'Master'=>'M', 'Programador'=>'P', 'Help'=>'H', 'Demo'=>'D' );
$NivelUsu = array(	  '~'=>1  ,		   'A'=>2  ,	  'M'=>3  ,			  'P'=>4  ,	   'H'=>5  ,	'D'=>6   );
$DimFila = explode("\n",trim($NewUSU));
$TH = explode("\t",$DimFila[0]);
$nTotalCol = count($TH);
$VerClave = file_exists( '../_tmp/'.md5(date('Y-m-d')) );
for( $f=1; $f<count($DimFila); $f++ ){
$txt .= "\n";
$tmp = explode("\t",$DimFila[$f]);
$NewDato = array();
for( $c=0; $c<$nTotalCol; $c++ ) $NewDato[$TH[$c]] = $tmp[$c];
for( $c=0; $c<$TotalCol; $c++ ){
$Dato = trim($NewDato[$DimTH[$c]]);
switch( $DimTH[$c] ){
case 'TIPO':
$Dato = $DimTipo[$Dato];
break;
case 'LOGIN':
$Dato = strtoupper($Dato);
break;
case 'EMAIL':
$Dato = str_replace(' ','',strtolower($Dato));
break;
case 'CLAVE':
if( strtoupper($Dato)=='NO' ){
$Dato = '';
}else{
$Dato = trim( $DimPassword[ $DimTipo[$tmp[0]].$tmp[1] ] );
if( $VerClave ) eTrace( trim($NewDato[$DimTH[1]]).' - '. $DimPassword[ $DimTipo[$tmp[0]].$tmp[1] ] );
}
break;
case 'LOGEAR':
case 'ACCESO':
case 'Tree':
if( strtoupper($Dato)=='SI' ){
$Dato = '1';
}else{
$Dato = '0';
}
break;
case 'DesEDes':
break;
default:
if( $Dato == '' ) $Dato = 0;
}
$txt .= $Dato."\t";
}
$txt = chop($txt);
}
GrabarLP( $txt );
eHTML();
?>
</HEAD><BODY onhelp='return false;' oncontextmenu='return false;'>
<SCRIPT type="text/javascript">
top.eAlert( '', 'GRABADO&nbsp;&nbsp;', '-', 'I' );
setTimeout( "top.eAlertHide()", 2000 );
</SCRIPT></BODY></HTML>
<?PHP
eEnd();
}
?>
