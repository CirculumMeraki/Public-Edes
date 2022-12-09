<?PHP //[_PROTECCION_]
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
$_DirG = 'g/e'; //include_once( $Dir_.'t/lp.gs' );
if( $_SESSION["_gsACCESO"]['ACCESO'] < 1 ) die('Error:64');
if( $_SESSION["_gsACCESO"]['Tools'] < 1 )  die('Error:65');
if( !function_exists('qQuery') ){
eval(qSetup());
include_once( '../../edesweb/'.$GLOBALS['_Sql'].'.inc' );
}
$xLenguajes = $_SESSION['_LANGUAGE_'];
$DimLeng = array();
$DimImgLeng = array();
$DimTxtLeng = array();
qQuery("select * from {$_SESSION['ShareDictionary']}gs_language where tf_translation='S' order by cd_gs_language");
while( $r=qArray() ){
$DimLeng[] = array( $r['cd_gs_language'], $r['nm_gs_language'], $r['img_sel'] );
$DimImgLeng[$r['cd_gs_language']] = $r['img_sel'];
$DimTxtLeng[$r['cd_gs_language']] = $r['nm_gs_language'];
if( $r['cd_gs_language']!=$_SESSION['_LANGUAGE_'] ) $xLenguajes .= ','.$r['cd_gs_language'];
}
if( $_SERVER['REQUEST_METHOD']=='POST' ){
list( $File, $LngDefault, $LngActual, $Lenguajes, $NLLenguajes, $TipoGrabacion, $FE_TotalFilasIni, $FE_TotalFilasDesde, $FE_TotalFilasFin ) = explode('|',$_POST['DEFINICION']);
$AyadirIndice = ( $FE_TotalFilasIni<>$FE_TotalFilasFin );
$Dim = file($File);
for( $n=0; $n<count($Dim); $n++ ){
list( $txt ) = explode('/'.'/', trim(strtoupper($Dim[$n])));
if( substr($txt,0,8)=='#INCLUDE' ){
list(,$NomSubFile) = explode(')',$txt);
if( strtoupper(trim($NomSubFile))=='LNG' ){
$iFile = $File.'.lng';
if( file_exists($iFile) ){
$iDim = file($iFile);
for( $p=0; $p<count($iDim); $p++ ){
$tmp2 = ltrim($iDim[$p]);
if( $tmp2[0]=='[' && substr(strtoupper($tmp2),0,6)=='[NOTE]' ){
for( $i=$p; $i<count($iDim); $i++ ) $iDim[$i] = '';
break;
}
}
$tDim = array_slice($Dim,0,$n);
$tDim = array_merge($tDim,array($iDim[0]));
$tDim = array_merge($tDim,$iDim);
$tDim = array_merge($tDim,array_slice($Dim,$n+1));
$tDim = array_merge($tDim,array("\n","\n"));
$Dim = $tDim;
unset($tDim);
$Dim[$n] = '';
}
}else{
}
}
}
$txt = ''; for( $n=0; $n<count($Dim); $n++ ) $txt .= $Dim[$n];
$MD5Origen = md5($txt); $txt = '';
if( substr_count($Lenguajes,$LngActual)==0 ){
if( $Lenguajes!='' ) $Lenguajes .= ',';
$Lenguajes .= $LngActual;
list(,$tmp) = explode(']',$Dim[$NLLenguajes]);
$tmp = explode('|',$tmp);
$Dim[$NLLenguajes] = '[Language] '.$Lenguajes.' ';
for( $n=1; $n<count($tmp); $n++ ) $Dim[$NLLenguajes] .= ' | '.trim($tmp[$n]);
}
$LenguajePos = array();
$tmp = explode(',',$Lenguajes);
for( $n=0; $n<count($tmp); $n++ ) $LenguajePos[trim($tmp[$n])] = $n;
$pLngActual = $LenguajePos[$LngActual] + 1;
copy($File, $File.'.bak');
$DimAddLanguage = array();
foreach( $_POST as $k=>$v ){
list( $Tipo, $NLinea, $TipoPregunta ) = explode( '__', $k );
if( $Tipo[0]=='r' ){
list( $NewValor ) = explode( '|', $v );
if( substr_count( $Dim[$NLinea], "'".$OldValor."'" ) == 1 ){
$Dim[$NLinea] = str_replace( "'".$OldValor."'", "'@".$OldValor."@'", $Dim[$NLinea] );
}else if( substr_count( $Dim[$NLinea], '"'.$OldValor.'"' ) == 1 ){
$Dim[$NLinea] = str_replace( '"'.$OldValor.'"', '"@'.$OldValor.'@"', $Dim[$NLinea] );
}else if( substr_count( $Dim[$NLinea], '@'.$OldValor.'@' ) == 1 ){
}else if( substr_count( $Dim[$NLinea], $OldValor ) == 1 ){
$Dim[$NLinea] = str_replace( $OldValor, '@'.$OldValor.'@', $Dim[$NLinea] );
}
$DimAddLanguage[] = array( $OldValor, $NewValor );
}
$OldValor = $v;
}
$uNumLinea = -1;
$DimLanguage = array();
foreach( $_POST as $k=>$v ){
list( $Tipo, $NLinea, $TipoPregunta ) = explode( '__', $k );
if( substr($Tipo,0,2)=='lr' ){
list( $NewValor, $OldValor ) = explode( '|', $v );
$tmp = explode('|',$Dim[$NLinea]);
$tmp[0] = trim($tmp[0]);
$DimLanguage[$tmp[0]] = true;
while( count($tmp)<$pLngActual ) $tmp[count($tmp)] = '';
$tmp[$pLngActual] = trim($NewValor);
$Dim[$NLinea] = '   ';
for( $n=0; $n<count($tmp); $n++ ) $Dim[$NLinea] .= trim($tmp[$n]).'|';
$Dim[$NLinea] = substr($Dim[$NLinea],0,-1)."\n";
$uNumLinea = max( $NLinea, $uNumLinea );
}
}
$txt = '';
if( $uNumLinea==-1 ){
$Cabecera = '[Language] '.$Lenguajes;
$txt = '';
for( $i=0; $i<count($DimAddLanguage); $i++ ){
if( !$DimLanguage[$DimAddLanguage[$i][0]] ){
$DimLanguage[$DimAddLanguage[$i][0]] = true;
if( $TipoGrabacion!='E' ) $txt .= '   ';
$txt .= $DimAddLanguage[$i][0].'|'.$DimAddLanguage[$i][1]."\n";
}
}
$MD5Destino = md5($Cabecera.$txt);
$txt = $Cabecera."\t/".'/'.$MD5Destino."\n".$txt."\n\n";
}
if( $TipoGrabacion=='E' ){
if( file_exists($File.'.lng') ) copy( $File.'.lng', $File.'.lng.new' );
if( $txt!='' ) file_put_contents( $File.'.lng', rtrim($txt) );
for( $n=0; $n<count($Dim); $n++ ){
$Linea = strtoupper(trim($Dim[$n]));
if( str_replace(' ','',$Linea)=='#INCLUDE(*)LNG' ) $Dim[$n] = '';
if( substr($Linea,0,10)=='[LANGUAGE]' ){
$Cabecera = '[Language]'.rtrim(substr(trim($Dim[$n]),10));
$itxt = '';
$Dim[$n] = '';
for( $i=$n+1; $i<count($Dim); $i++ ){
$Linea = strtoupper(trim($Dim[$i]));
if( substr($Linea,0,10)=='[LANGUAGE]' ){
$Dim[$i] = '';
continue;
}
if( $Linea=='' ){
continue;
}else if( $Linea[0]=='.' ){
while( $Linea!='' && $Linea[0]=='.' ) $Linea = substr($Linea,1);
$Linea = trim($Linea);
}else if( $Linea[0]=='/' ){
while( $Linea!='' && $Linea[0]=='/' ) $Linea = substr($Linea,1);
$Linea = trim($Linea);
}
if( $Linea[0]=='[' ) break;
$itxt .= trim($Dim[$i])."\n";
$Dim[$i] = '';
}
for( $i=0; $i<count($DimAddLanguage); $i++ ){
if( !$DimLanguage[$DimAddLanguage[$i][0]] ){
$DimLanguage[$DimAddLanguage[$i][0]] = true;
$itxt .= $DimAddLanguage[$i][0].'|'.$DimAddLanguage[$i][1]."\n";
}
}
if( $txt=='' && $itxt!='' ){
$itxt = rtrim($itxt);
$MD5Destino = md5($Cabecera.$itxt);
$itxt = $Cabecera."\t/".'/'.$MD5Destino."\n".$itxt;
file_put_contents( $File.'.lng', $itxt);
}
break;
}
}
$txt = '#include(*) lng'."\n";
}else{
for( $n=0; $n<count($Dim); $n++ ){
$Linea = strtoupper(trim($Dim[$n]));
if( str_replace(' ','',$Linea)=='#INCLUDE(*)LNG' ){
$Dim[$n] = '';
break;
}
}
}
$p=0;
for( $n=0; $n<count($Dim); $n++ ){
$p = $n;
if( trim($Dim[$n])!='' ) break;
}
$nlv = 0;
for( $n=$p; $n<count($Dim); $n++ ){
if( trim($Dim[$n])=='' ){
if( (++$nlv) > 2 ) continue;
}else{
$nlv = 0;
}
$txt .= rtrim($Dim[$n]);
if( $n==$uNumLinea ){
for( $i=0; $i<count($DimAddLanguage); $i++ ){
if( !$DimLanguage[$DimAddLanguage[$i][0]] ){
$DimLanguage[$DimAddLanguage[$i][0]] = true;
$txt .= "\n   ".$DimAddLanguage[$i][0].'|'.$DimAddLanguage[$i][1];
}
}
$txt .= "\n";
}
$txt .= "\n";
}
$txt = rtrim($txt);
$MD5Destino = md5($txt);
eInclude( 'message' );
if( $MD5Origen!=$MD5Destino ){
file_put_contents( $File, $txt );
if( substr($File,0,5)=='../d/' ) $File = substr($File,5);
if( substr($File,0,3)=='../' ) $File = substr($File,2);
sql_Query("insert into {$_SESSION['ShareDictionary']}gs_activity (cd_gs_user, cdi, script, edes, email) values ({$_User}, '".date('Y-m-d H:i:s')."', '{$File}', NULL, '{$_SESSION['_UserEMail']}')");
eMessage('Textos grados', 'HS');
}else{
eMessage('No hay cámbios que grabar', 'HS');
}
eEnd();
}
$File = eScript( $_GET['_EDF'] );
eHTML('$t/40.gs', "", "gsTranslate");
?>
<style>
body, html {
height: 100%;
width: 100%;
}
BODY {
BACKGROUND: #fffff8;
FONT-FAMILY: verdana;
cursor:default;
overflow-y:auto;
overflow-x:hidden;
}
center {
font-size: 18px;
color: #555555;
FONT-WEIGHT: bold;
}
span {
font-size: 14px;
color: #555555;
margin-left: 5px;
FONT-WEIGHT: bold;
FONT-FAMILY: verdana;
}
.LngBase {
background:transparent;
border:0px;
margin-left:2px;
}
.LngTraslate {
margin-bottom: 0px;
background:#ffffff;
}
.LngTraslateON {
margin-bottom: 0px;
background:#ccffff;
}
.LngTraslateBuscar {
margin-bottom: 0px;
background:#eeeeee;
}
.CONTENEDOR {
margin: 0px;
}
TABLE {
FONT-FAMILY: verdana;
background:#cecece;
}
TH {
background:#ffcc99;
}
TD {
background:#fcfcfc;
FONT-FAMILY: verdana;
}
INPUT {
font-family: monospace;
background:#ffffff;
}
.TEXTOS INPUT {
width:99%;
}
.SinClave {
color: red;
}
button {
border: 1px solid blue;
margin-left: 20px;
padding-left: 0px;
}
#_Buscar {
background:#ffffff;
}
.SubMenu {
BACKGROUND-COLOR: #ffffff;
BORDER-BOTTOM: #cccccc 1px outset;
BORDER-LEFT: #cccccc 1px outset;
BORDER-RIGHT: #cccccc 1px outset;
BORDER-TOP: #cccccc 1px outset;
POSITION: absolute;
}
.SubMenu TR {
BACKGROUND-COLOR: #f7efff;
COLOR: #57007f;
FONT-FAMILY: helvetica;
FONT-SIZE: 11px;
FONT-WEIGHT: normal;
}
.SubMenu TD {
CURSOR: pointer;
}
.SubMenu .ON {
BACKGROUND: #6600ff;
COLOR: #ff0000;
FONT-WEIGHT: normal;
}
.SubMenu .Linea {
BACKGROUND-COLOR: #808080;
CURSOR: default;
FONT-SIZE: 1px;
}
.SubMenu .TITULO {
BACKGROUND-COLOR: #57007f;
BORDER-BOTTOM: #c8c3c0 1px outset;
COLOR: #ffffff;
CURSOR: default;
TEXT-ALIGN: center;
}
</style>
<SCRIPT LANGUAGE='JavaScript' SRC='edes.php?R:$edes.js'></SCRIPT>
<?PHP
?>
<SCRIPT LANGUAGE="JavaScript">
document.title = "gsTranslate";
top.S.init(window,"all,tab");
<?PHP
if( $_TipoUsu != '~' ) echo 'document.oncontextmenu = new Function("return false");';
?>
var _FROM = window.frameElement.WOPENER;
var _Source = 'gsTranslate:'+_FROM._Source;
function eClearEvent(men){
return S.eventClear(window);
}
function AnulaKey(){
var Mas = '', Ok = 0;
if( event.altKey ) Mas = 'a';
if( event.ctrlKey ) Mas = 'c';
if( event.shiftLeft ) Mas = 's';
if( ',114,122,a39,a37,a8,c72,c79,c76,c73,c81,c85,s121,'.indexOf(','+Mas+event.keyCode+',') != -1 ){
Ok = 1;
}else if( ',93,a36,'.indexOf(','+Mas+event.keyCode+',') != -1 ){
Ok = 2;
}
if( Ok > 0 ){
eClearEvent();
if( Ok==2 ) alert("<?= $__Lng[1] ?>");
return false;
}
return true;
}
document.onkeydown = AnulaKey;
function SiguienteCampo(){
var Obj = S.event(window);
if( Obj.tagName!='INPUT' ) return;
var si = Obj.sourceIndex, n;
var im = document.all;
for( n=si+1; n<im.length; n++ ){
if( document.all[n].tagName=='INPUT' ){
if( !document.all[n].readOnly && document.all[n].offsetWidth > 0 && document.all[n].type!='submit' ){
document.all[n].focus();
return;
}
}
}
PrimerCampo();
}
function PrimerCampo(){
document.body.scrollTop = 0;
var im = document.all, n;
for( n=0; n<im.length; n++ ){
if( document.all[n].tagName=='INPUT' && document.all[n].type!='button' ){
if( !document.all[n].readOnly ){
document.all[n].focus();
return;
}
}
}
}
function ControlTeclado(){
if( event.keyCode==13 ){
if( S.event(window).id=='_Buscar' ){
BuscarCadena();
}else{
SiguienteCampo();
}
return eClearEvent();
}else if( event.keyCode==121 ){
Grabar();
return eClearEvent();
}
return true;
}
function CheckChr( p, r ){
var Dim = new Array('\\','<','>','#','·','&'), n,i, nP,nR;
for( n=0; n<Dim.length; n++ ){
if( p.value.indexOf(Dim[n])>-1 || r.value.indexOf(Dim[n])>-1 ){
nP = 0; for( i=0; i<p.value.length; i++ ) if( p.value.substr(i,1)==Dim[n] ) nP++;
nR = 0; for( i=0; i<r.value.length; i++ ) if( r.value.substr(i,1)==Dim[n] ) nR++;
if( nP!=nR ) return false;
}
}
return true;
}
function Grabar(){
var p = document.forms[0].elements, n,i, len, NomBorrar, DimBorrar = new Array(), DimError = new Array();
for( n=0; n<p.length; n++ ){
if( p[n].tagName=='FIELDSET' ) continue;
if( p[n].type=='text' ){
if( p[n].ovalue!=undefined || p[n].id.substr(0,2)=='lr' ){
if( !CheckChr( p[n-1], p[n] ) ) DimError[DimError.length] = n;
}
if( p[n].readOnly && p[n].name.substr(0,1)=='r' ){
len = p[n].name.length;
NomBorrar = 'p'+p[n].name.substr(1);
for( i=0; i<p.length; i++ ){
if( p[i].tagName=='FIELDSET' ) continue;
if( p[i].type=='text' && p[i].name.substr(0,len)==NomBorrar ){
DimBorrar[DimBorrar.length] = i;
DimBorrar[DimBorrar.length] = n;
break;
}
}
}
}
}
for( n=0; n<p.length; n++ ) p[n].style.backgroundColor = '';
for( n=1; n<p.length; n++ ){
if( p[n].value.indexOf('|')>-1 ){
p[n].style.backgroundColor = 'red';
p[n].focus();
setTimeout("top.eInfoError(window, 'Carácter \"|\" no permitido');",100);
return eClearEvent();
}
}
if( DimError.length > 0 ){
for( n=0; n<DimError.length; n++ ) p[DimError[n]].style.backgroundColor = 'red';
p[DimError[0]].focus();
setTimeout("top.eInfoError(window, 'No cuadran los carácteres especiales');",100);
return eClearEvent();
}
for( n=0; n<p.length; n++ ){
if( p[n].tagName=='FIELDSET' ) continue;
if( p[n].type=='text' ){
if( p[n].ovalue!=undefined ) p[n].value = p[n].value+'|'+p[n].ovalue+'|'+p[n].title;
}
}
for( n=DimBorrar.length-1; n>=0; n-- ) p[DimBorrar[n]].removeNode(1);
S(":DEFINICION").val(S(":DEFINICION").val()+'|'+_TipoGrabacion+'|'+_FE_TotalFilasIni+'|'+_FE_TotalFilasDesde+'|'+_FE_TotalFilasFin);
document.forms[0].submit();
}
function EditorHTML( File ){
top.eSWOpen( window, 'edes.php?iE:/d/'+File+'&T=H&D=P&AddDIV=1&TRACE=-1', File, true, 0 );
}
function Ini(){
var Obj = document.getElementById('TablaScript');
Obj.style.width = document.body.clientWidth-10;
var Obj = document.getElementById('TablaLeguaje');
if( Obj!=null ) Obj.style.width = document.body.clientWidth-10;
}
function Repercusion(){
var Obj = S.event(window);
var pk = document.getElementById( 'lp'+Obj.id.substr(2) ).value;
var Dim = TablaScript.getElementsByTagName('INPUT');
for( var n=0; n<Dim.length; n++ ){
if( Dim[n].id.substr(0,1)=='p' && Dim[n].value==pk ){
Dim[n+1].value = Obj.value;
}
}
}
function CntON(){
S.event(window).className = 'LngTraslateON';
}
function CntOFF(){
S.event(window).className = 'LngTraslate';
}
function BuscarCadena(){
var Dim = document.body.getElementsByTagName('INPUT');
var txt = S.trim(S("#_Buscar").val());
if( txt!='' ){
var uTxt = txt.toUpperCase();
for( var n=0; n<Dim.length; n++ ){
if( Dim[n].id.substr(0,1)=='r' || Dim[n].id.substr(0,2)=='lr' ){
Dim[n].className = 'LngTraslate';
if( (Dim[n].value.indexOf(txt)>-1 || (Dim[n].value.toUpperCase()).indexOf(uTxt)>-1) && !Dim[n].readOnly ){
Dim[n].className = 'LngTraslateBuscar';
}
}
}
}else{
for( var n=0; n<Dim.length; n++ ) if( Dim[n].id.substr(0,1)=='r' || Dim[n].id.substr(0,2)=='lr' ) Dim[n].className = 'LngTraslate';
}
}
var _TipoGrabacion='I';
function _SelTipoGrabacion( Op, OpInnerText, Obj, OpObj, VarUser ){
switch( Op ){
case null:
break;
case "E":
S("#TipoGrabacionValor").text('Exterior');
_TipoGrabacion = 'E';
break;
case "I":
S("#TipoGrabacionValor").text('Interior');
_TipoGrabacion = 'I';
break;
}
}
function SelTipoGrabacion(){
top.eMenu( window, S.event(window), {
'-':'Graber en',
'E':'Exterior',
'I':'Interior'
}, _SelTipoGrabacion );
}
</SCRIPT>
<?PHP
?>
</HEAD>
<BODY scroll=yes style="border:2px outset #d5dce0; margin:0px;" onload="top.eInfoHide();Ini();setTimeout('PrimerCampo()',1000);document.onkeydown=ControlTeclado;" onhelp='gsAyuda();return false;' onselectstart='return false'>
<?PHP
$DimFunc = array(
array( 'top.eAlert'		, 0, '&nbsp;Título' ),
array( 'top.eAlert'		, 1, '&nbsp;Descripción' ),
array( 'top.eSWOpen'	, 2, '' ),
array( 'top.eInfoError'	, 1, '' ),
array( 'top.eInfo'		, 1, '' ),
array( 'eMessage'		, 0, '' ),
array( 'eTabShow'		, 0, '' ),
array( 'ePE'			, 1, '' )
);
global $_Lng, $__Lng, $_LngPublic, $_LANGUAGE, $JsTxtm, $_LanguageTables;
$LngBase = ( $_SESSION['_LANGUAGE_']==$_SESSION['_LanguageDefault'] );
echo '<center><br>';
if( $LngBase ){
echo ('Poner textos en lenguaje base "'.trim($DimTxtLeng[$_SESSION['_LanguageDefault']]).'('.$_SESSION['_LanguageDefault'].')"');
}else{
echo ('Traducir del "'.trim($DimTxtLeng[$_SESSION['_LanguageDefault']]).'('.$_SESSION['_LanguageDefault'].')" al "'.trim($DimTxtLeng[$_SESSION['_LANGUAGE_']]).'('.$_SESSION['_LANGUAGE_'].')"');
}
echo '</center>';
$Dim = file($File);
if( substr($File,-4)=='.zdf' ){
if( substr($Dim[0],0,5)=='eDes '){
die('Formato no soportado');
}
}
$no = '';
$PosLANGUAGE = '';
$TieneLANGUAGE = false;
$DimTranslate = array();
$TipoLNG = 'I';
$_FE_TotalFilasIni = count($Dim);
$_FE_TotalFilasDesde = 0;
$_FE_TotalFilasFin = count($Dim);
$NumCorchetes = 0;
for( $n=0; $n<count($Dim); $n++ ){
$x = trim($Dim[$n]);
if( $x[0]=="[" ) $NumCorchetes++;
$Dim[$n] = str_replace('@LNG@', '_'.$_SESSION['_LANGUAGE_'], $Dim[$n]);
list( $txt ) = explode('/'.'/', trim(strtoupper($Dim[$n])));
if( substr($txt,0,8)=='#INCLUDE' ){
list(,$NomSubFile) = explode(')',$txt);
if( strtoupper(trim($NomSubFile))=='LNG' ){
$iFile = $File.'.lng';
if( file_exists($iFile) ){
$TipoLNG = 'E';
$iDim = file($iFile);
for( $p=0; $p<count($iDim); $p++ ){
$tmp2 = ltrim($iDim[$p]);
if( $tmp2[0]=='[' && substr(strtoupper($tmp2),0,6)=='[NOTE]' ){
for( $i=$p; $i<count($iDim); $i++ ) $iDim[$i] = '';
break;
}
}
$tDim = array_slice($Dim,0,$n);
$tDim = array_merge($tDim,array($iDim[0]));
$tDim = array_merge($tDim,$iDim);
$tDim = array_merge($tDim,array_slice($Dim,$n+1));
$Dim = $tDim;
unset($tDim);
$_FE_TotalFilasDesde = $n;
$_FE_TotalFilasFin = count($Dim);
$TipoLNG = 'E';
}
}else{
}
}
if( $txt[0]=='¿' ){
eExplodeOne( $txt, '?', $no, $txt );
eExplodeOne( $Dim[$n], '?', $no, $Dim[$n] );
}
#(mR) ...
#!(mR) ...
if( $txt[0]=='#' ){
eExplodeOne( $txt, ')', $no, $txt );
eExplodeOne( $Dim[$n], ')', $no, $Dim[$n] );
}
list( $oTXT ) = explode('/'.'/', trim($Dim[$n]));
if( $txt=='' || $txt=='¿' || $txt=='?' ){
continue;
}else if( $txt[0]=='.' || substr($txt,0,2)=='/'.'/' ){
}else if( $txt[0]=='[' ){
if( substr($txt,0,10)=='[LANGUAGE]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
list( $PosLANGUAGE ) =  explode('|',$txt);
$PosLANGUAGE = str_replace(' ','',$PosLANGUAGE).'|'.$n;
$tmp = explode('|',$txt);
global $_LANGUAGE, $_LNGCOLDEFAULT, $_LanguageTron;
$_LANGUAGE = array();
$tmp2 = explode( ',', trim(str_replace(' ','',$tmp[0])) );
for( $i=0; $i<count($tmp2); $i++ ){
if( $tmp2[$i]==$_SESSION['_LANGUAGE_'] ) $_LNGCOL = $i+1;
if( $tmp2[$i]==$_SESSION['_LanguageDefault'] ) $_LNGCOLDEFAULT = $i+1;
}
$TipoEntrada = '_LANGUAGE';
if( (strtoupper($tmp[2])=='TRUE' || $tmp[2]=='1') && $_Development ) $_LanguageTron = '~';
if( strtoupper($tmp[1])=='TRUE' || $tmp[1]=='1' ) eLngLoad( '../_datos/config/language.lng', '', 2 );
$TieneLANGUAGE = true;
for( $i=$n+1; $i<count($Dim); $i++ ){
$txt = trim($Dim[$i]);
eExplodeOne( $txt, '~', $no, $Ayuda );
$Ayuda = trim($Ayuda);
if( $txt=='' ){
}else if( $txt[0]=='.' || substr($txt,0,2)=='/'.'/' ){
}else if( $txt[0]=='¿' || $txt[0]=='#' ){
$n = $i-1;
break;
}else if( $txt[0]=='[' ){
$n = $i - 1;
$DimTraduccion = array();
for( $i=0; $i<count($_LANGUAGE); $i++ ){
$DimTraduccion[$_LANGUAGE[$i][0]] = $_LANGUAGE[$i][1];
}
break;
}else{
$buffer = $txt;
list($buffer) = explode( '~', $buffer );
$tmp = explode( '|', $buffer );
$Clave = trim($tmp[0]);
$txt = trim($tmp[$_LNGCOL]);
if( $LngBase ){
$DimTranslate[] = array( 'LANGUAGE', trim($tmp[0]), $txt, $i, 0, $Ayuda );
}else{
$DimTranslate[] = array( 'LANGUAGE', trim($tmp[$_LNGCOLDEFAULT]), $txt, $i, 0, $Ayuda );
}
if( $txt=='' ) $txt = trim($tmp[$_LNGCOLDEFAULT]);
$txt = str_replace("'",'&amp;',str_replace('"','&quot;',$txt));
$_LANGUAGE[] = array( '@'.$Clave.'@', $_LanguageTron.$txt.$_LanguageTron );
}
}
}else if( substr($txt,0,7)=='[TITLE]' ){
list(,$Promp) = explode(']',$oTXT);
list($Promp) = explode('|',$Promp);
$DimTranslate[] = array( '   [Title]', trim($Promp), $Traduccion, $n, 0 );
}else if( substr($txt,0,8)=='[FIELDS]' ){
$n = CadenaEnFields( $Dim, $n+1 );
}else if( substr($txt,0,9)=='[OPTIONS]' ){
for( $i=$n+1; $i<count($Dim); $i++ ){
$txt = trim($Dim[$i]);
if( $txt[0]=='¿' ) eExplodeOne( $txt, '?', $no, $txt );
if( $txt[0]=='#' ) eExplodeOne( $txt, ')', $no, $txt );
if( $txt=='' || $txt=='¿' || $txt=='?' ){
}else if( $txt[0]=='.' || substr($txt,0,2)=='/'.'/' ){
}else if( $txt[0]=='[' ){
$n = $i - 1;
break;
}else{
list($txt) = explode( '|', $txt );
$Clave = trim($txt);
if( $Clave[0]=='<' ){
eExplodeOne( $Clave, '>', $no, $Clave );
$Clave = trim($Clave);
}
$Promp = $DimTraduccion[$Clave];
if( $Promp=='' ){
$Promp = $Clave;
if( $Promp[0]=='@' ) $Promp = substr($Promp,1,-1);
}
if( $Clave[0]=='@' ) $Clave = substr($Clave,1,-1);
$DimTranslate[] = array( ' [Options]', $Clave, $Promp, $i, 0 );
for( $p=0; $p<count($DimFunc); $p++ ){
if( substr_count( $Dim[$i], $DimFunc[$p][0].'(' )>0 || substr_count( $Dim[$i], $DimFunc[$p][0].' (' )>0 ){
list($Promp,$col) = CadenaEnFuncion( $Dim[$i], $DimFunc[$p][0], $DimFunc[$p][1] );
if( $Promp!='' ) $DimTranslate[] = array( str_replace('top.','',$DimFunc[$p][0]), $Promp, $Traduccion, $i, $col );
}
}
}
}
}else if( substr($txt,0,11)=='[ADDOPTION]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
list(,$Campo,$txt) = explode('|',$txt);
if( substr_count(strtoupper($txt),'SELECT')>0 && substr_count(strtoupper($txt),'FROM')>0 ) continue;
$tmp = explode(';',$txt);
if( count($tmp)>0 ){
for( $i=0; $i<count($tmp); $i++ ){
list(,$Promp) = explode(',',$tmp[$i]);
$Promp = trim($Promp);
if( $Promp!='' ) $DimTranslate[] = array( ' [AddOption]&nbsp;'.trim($Campo), $Promp, $Traduccion, $n, -1 );
}
}
}else if( substr($txt,0,11)=='[MSGSUBMIT]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
list(,$txt) = explode('|',$txt);
$txt = trim($txt);
if( $txt[0]!='>' &&	substr_count($txt,'(')==0 && substr_count($txt,')')==0 ){
$DimTranslate[] = array( ' [MsgSubmit]', $txt, $Traduccion, $n, -1 );
}else{
$DimTranslate[] = array( ' [MsgSubmit]', '"-1"', $Traduccion, $n, -1 );
}
}else if( substr($txt,0,11)=='[MSGANSWER]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
list(,$MensaOk,$MensaErr) = explode('|',$txt);
$MensaOk = trim($MensaOk);
if( $MensaOk!='' ){
if( $MensaOk[0]!='>' && substr_count($MensaOk,'(')==0 && substr_count($MensaOk,')')==0 ){
$DimTranslate[] = array( ' [MsgAnswer]&nbsp;Ok', $MensaOk, $Traduccion, $n, -1 );
}else if( $MensaOk[0]=='>' ){
$DimTranslate[] = array( ' [MsgAnswer]&nbsp;Ok', '"-2"', $Traduccion, $n, 1, $oTXT );
}else{
$DimTranslate[] = array( ' [MsgAnswer]&nbsp;Ok', '"-1"', $Traduccion, $n, -1 );
}
}
$MensaErr = trim($MensaErr);
if( $MensaErr!='' ){
if( $MensaErr[0]!='>' && substr_count($MensaErr,'(')==0 && substr_count($MensaErr,')')==0 ){
$DimTranslate[] = array( ' [MsgAnswer]&nbsp;Error', $MensaErr, $Traduccion, $n, -1 );
}else if( $MensaOk[0]=='>' ){
$DimTranslate[] = array( ' [MsgAnswer]&nbsp;Error', '"-2"', $Traduccion, $n, 1, $oTXT );
}else{
$DimTranslate[] = array( ' [MsgAnswer]&nbsp;Error', '"-1"', $Traduccion, $n, -1 );
}
}
}else if( substr($txt,0,10)=='[FIELDSET]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
list(,,$txt) = explode(',',$txt);
$txt = trim($txt);
$DimTranslate[] = array( ' [FieldSet]', $txt, $Traduccion, $n, -1 );
}else if( substr($txt,0,7)=='[RADIO]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
list($Campo,,$txt) = explode('|',$txt);
$tmp = explode(';',$txt);
for( $i=0; $i<count($tmp); $i++ ){
list(,$Promp) = explode(',',$tmp[$i]);
$Promp = trim($Promp);
$DimTranslate[] = array( ' [Radio]&nbsp;'.trim($Campo), $Promp, $Traduccion, $n, -1 );
}
}else if( substr($txt,0,11)=='[CHECKLIST]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
list($Campo,,$txt) = explode('|',$txt);
$tmp = explode(';',$txt);
for( $i=0; $i<count($tmp); $i++ ){
list(,$Promp) = explode(',',$tmp[$i]);
$Promp = trim($Promp);
$DimTranslate[] = array( ' [CheckList]&nbsp;'.trim($Campo), $Promp, $Traduccion, $n, -1 );
}
}else if( substr($txt,0,7)=='[COUNT]' ){
list(,$txt) = explode(']',$oTXT);
$txt = trim($txt);
if( substr_count( $txt, '(' )>0 && substr_count( $txt, '(' )>0 ) continue;
if( $txt!='' ) $DimTranslate[] = array( ' [Count]', $txt, $Traduccion, $n, -1 );
}else if( substr($txt,0,7)=='[LABEL]' ){
}else if( substr($txt,0,12)=='[ERRORLABEL]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
$tmp = explode('|',$txt);
for( $i=0; $i<count($tmp); $i++ ){
list($Promp,$Campo) = explode('=',$tmp[$i]);
$Promp = trim($Promp);
$DimTranslate[] = array( ' [ErrorLabel]&nbsp;'.trim($Campo), $Promp, $Traduccion, $n, -1 );
}
}else if( substr($txt,0,11)=='[ADDBUTTON]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
$tmp = explode('|',$txt);
$tmp[1] = trim($tmp[1]);
if( $tmp[1]!='' ){
if( TraduceTitle( $tmp[1], '[AddButton]', $n )!='' ) $DimTranslate[] = array( ' [AddButton]&nbsp;Label', $tmp[1], $Traduccion, $n, -1 );
}
$tmp[2] = trim($tmp[2]);
if( $tmp[2]!='' ) $DimTranslate[] = array( ' [AddButton]&nbsp;Title', $tmp[2], $Traduccion, $n, -1 );
}else if( substr($txt,0,7)=='[TIPTH]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
$tmp = explode('|',$txt);
if( substr_count( $txt, '=' )>0 && substr_count( $txt, '|' )==0 ){
$tmp = explode(',',$txt);
for( $i=0; $i<count($tmp); $i++ ){
list($Campo,$Promp) = explode('=',$tmp[$i]);
$DimTranslate[] = array( ' [TipTH]&nbsp;'.trim($Campo), trim($Promp), $Traduccion, $n, -1 );
}
}else{
for( $i=0; $i<count($tmp); $i++ ){
$DimTranslate[] = array( ' [TipTH]', trim($tmp[$i]), $Traduccion, $n, -1 );
}
}
}else if( substr($txt,0,10)=='[TIPTHTOP]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
$tmp = explode('|',$txt);
for( $i=0; $i<count($tmp); $i++ ){
$DimTranslate[] = array( ' [TipTHTop]', trim($tmp[$i]), $Traduccion, $n, -1 );
}
}else if( substr($txt,0,9)=='[ADDICON]' ){
eExplodeOne( $oTXT, '|', $no, $txt );
$txt = trim($txt);
TraduceTitle( $txt, '[AddIcon]', $n );
}else if( substr($txt,0,5)=='[TAB]' ){
list(,$Promp) = explode(']',$oTXT);
list(,$Promp) = explode('|',$Promp);
$Promp = trim($Promp);
$DimTranslate[] = array( '  [Tab]', $Promp, $Traduccion, $n, 0 );
}else if( substr($txt,0,11)=='[THCOLSPAN]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
$tmp = explode('|',$txt);
for( $i=0; $i<count($tmp); $i++ ){
list(,,$Promp) = explode(',',$tmp[$i]);
$DimTranslate[] = array( ' [THColSpan]', trim($Promp), $Traduccion, $n, -1 );
}
}else if( substr($txt,0,7)=='[TIPTD]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
$tmp = explode('|',$txt);
if( trim($tmp[2])!='' ) $DimTranslate[] = array( ' [TipTD]', trim($tmp[2]), $Traduccion, $n, -1 );
}else if( substr($txt,0,9)=='[SUBLIST]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
$tmp = explode('|',$txt);
if( trim($tmp[2])!='' ) $DimTranslate[] = array( ' [SubList]&nbsp;Titulo', trim($tmp[2]), $Traduccion, $n, -1 );
if( trim($tmp[3])!='' ) $DimTranslate[] = array( ' [SubList]&nbsp;Titulo&nbsp;Ventana', trim($tmp[3]), $Traduccion, $n, -1 );
}else if( substr($txt,0,14)=='[LISTCHECKBOX]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
$tmp = explode('|',$txt);
$tmp[0] = strtoupper(trim($tmp[0]));
for( $i=1; $i<count($tmp); $i++ ){
$tmp[$i] = trim($tmp[$i]);
if( $tmp[$i]!='' ){
if( TraduceTitle( $tmp[$i], '[ListCheckBox]', $n )!='' ) $DimTranslate[] = array( ' [ListCheckBox]&nbsp;'.(($tmp[0]=='H')?'HTML':'PDF'), trim($tmp[$i]), $Traduccion, $n, -1 );
}
}
}else if( substr($txt,0,9)=='[ADDCODE]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
list(,$Campo,$Tipo,$txt) = explode('|',$txt);
if( strtoupper(trim($Tipo))!='I' ){
$txt = trim($txt);
if( TraduceTitle( $txt, ' [AddCode]', $n )!='' ){
$DimTranslate[] = array( ' [AddCode]', $txt, $Traduccion, $n, -1 );
}
}
}else if( substr($txt,0,9)=='[TIPFORM]' ){
eExplodeOne( $oTXT, ']', $no, $txt );
list(,,$Campo,$txt) = explode('|',$txt);
$txt = trim($txt);
if( $txt!='' ){
if( $txt[0]=='>' ){
$DimTranslate[] = array( '     [TipForm]&nbsp;'.trim($Campo), '"-2"', $txt, $n, 3 );
}else{
$DimTranslate[] = array( ' [TipForm]', $txt, $Traduccion, $n, -1 );
}
}else{
$Ayuda = '';
for( $i=$n+1; $i<count($Dim); $i++ ){
$txt = $Dim[$i];
if( $txt[0]=='.' || substr($txt,0,2)=='/'.'/' ){
}else if( $txt[0]=='¿' || $txt[0]=='#' ){
$n = $i-1;
break;
}else if( $txt[0]=='[' ){
$n = $i - 1;
$DimTranslate[] = array( ' [TipForm]', $Ayuda, $Traduccion, $n, -1 );
break;
}else{
$Ayuda .= $txt;
}
}
}
}else if( substr($txt,0,10)=='[PDFLABEL]' ){
}else if( substr($txt,0,6)=='[NOTE]' ){
break;
}
}else if( $txt[0]=='{' ){
if( substr($txt,0,8)=='{SLMENU}' ){
eExplodeOne( $oTXT, '}', $no, $txt );
$tmp = explode('|',$txt);
$tmp = explode(',',$tmp[1]);
for( $i=0; $i<count($tmp); $i++ ){
list($Promp) = explode(':',$tmp[$i]);
$DimTranslate[] = array( '{slMenu}', trim($Promp), $Traduccion, $n, -1 );
}
}else if( substr($txt,0,6)=='{SLTH}' ){
eExplodeOne( $oTXT, '}', $no, $txt );
$tmp = explode(',',$txt);
for( $i=0; $i<count($tmp); $i++ ){
$tmp[$i] = trim($tmp[$i]);
if( $tmp[$i]!='' ){
if( TraduceTitle( $tmp[$i], '{slTH}', $n )!='' ) $DimTranslate[] = array( '{slTH}', $tmp[$i], $Traduccion, $n, -1 );
}
}
}else if( substr($txt,0,9)=='{SLTIPTH}' ){
eExplodeOne( $oTXT, '}', $no, $txt );
$tmp = explode(',',$txt);
for( $i=0; $i<count($tmp); $i++ ){
$tmp[$i] = trim($tmp[$i]);
if( $tmp[$i]!='' ) $DimTranslate[] = array( '{slTipTH}', $tmp[$i], $Traduccion, $n, -1 );
}
}
}else{
if( substr_count($oTXT,'_PROMP2')>0 ){
list($Promp,$col,$Cadena) = CadenaEnVariable( $oTXT, '_PROMP2' );
if( $Promp!='"-1"' ){
$DimTranslate[] = array('_PROMP2', $Promp, $DimFunc[$i][0].$Cadena, $n, $col );
}
}
if( substr_count($oTXT,'_PROMP')>0 ){
list($Promp,$col,$Cadena) = CadenaEnVariable( $oTXT, '_PROMP' );
if( $Promp!='"-1"' ){
$DimTranslate[] = array('_PROMP', $Promp, $DimFunc[$i][0].$Cadena, $n, $col );
continue;
}
}
for( $i=0; $i<count($DimFunc); $i++ ){
if( substr_count( $oTXT, $DimFunc[$i][0].'(' )>0 || substr_count( $oTXT, $DimFunc[$i][0].' (' )>0 ){
list($Promp,$col,$Cadena) = CadenaEnFuncion( $oTXT, $DimFunc[$i][0], $DimFunc[$i][1] );
if( $Promp!='' ) $DimTranslate[] = array( str_replace('top.','',$DimFunc[$i][0]).$DimFunc[$i][2], $Promp, $DimFunc[$i][0].$Cadena, $n, $col );
}
}
}
}
if( $NumCorchetes==1 ) $TipoLNG = 'I';
if( !$TieneLANGUAGE && !$LngBase ){
eInclude('message');
eMessage('Primero hay que traducir al lenguaje base<br>antes de a otros lenguajes', 'HS');
}
function cmp($a, $b){ return(strtoupper($a[0]).strtoupper($a[1]).strtoupper($a[2]) > strtoupper($b[0]).strtoupper($b[1]).strtoupper($b[2])); }
if( !$_GET["_NOSORT"] ) usort($DimTranslate, "cmp");
if( $PosLANGUAGE=='' ) $PosLANGUAGE = '|';
echo '<form name="FRM1" method="post" action="">';
echo '<input type="hidden" OT=D name="DEFINICION" value="'.$File.'|'.$_SESSION['_LanguageDefault'].'|'.$_SESSION['_LANGUAGE_'].'|'.$PosLANGUAGE.'"" readonly>';
$np = 0;
echo '<table border=0px cellspacing=0px cellpadding=0px width=100% style="background:transparent">';
echo '<tr>';
echo '<td style="background:transparent"><span style="font-size:100%">TEXTOS</span></td>';
echo '<td style="background:transparent;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
echo '<td nowrap style="background:transparent"><span style="p-adding-left:50;font-size:70%;font-weight:normal;">Carácteres especiales: &#92; < > # · &#38;</span></td>';
echo '<td width=100% align=right  style="background:transparent">Grabar&nbsp;en:</td>';
echo '<td style="background:transparent;font-weight:bold;cursor:hand;" onclick="SelTipoGrabacion()" id="TipoGrabacionValor">Interior</td>';
echo '<td style="background:transparent;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
echo '<td wid-th=100% align=right style="background:transparent">Buscar&nbsp;cadena:</td>';
echo '<td style="background:transparent"><input type="text" value="" id="_Buscar" size=25 maxLength255 class=LngTraslate onfocus=S.key("#",255,0) tc="#" -onkeydown=ControlTeclado() title="" -onfocus="CntON()" -onblur="CntOFF()"></td>';
echo '<td style="background:transparent"><i class="ICONWINDOW" onclick="BuscarCadena()">S</td>';
echo '</tr></table>';
echo '<script>';
if( $TipoLNG=='E' ) echo '_TipoGrabacion="E"; S("#TipoGrabacionValor").text("Exterior");';
echo "var _FE_TotalFilasIni = {$_FE_TotalFilasIni};";
echo "var _FE_TotalFilasDesde = {$_FE_TotalFilasDesde};";
echo "var _FE_TotalFilasFin = {$_FE_TotalFilasFin};";
echo '</script>';
echo '<table border=0px cellspacing=0px cellpadding=0px class=CONTENEDOR style="width:100%;-border-collapse:collapse;" id=TablaScript>';
for( $n=0; $n<count($DimTranslate); $n++ ){
if( $DimTranslate[$n][0]=='LANGUAGE' ) continue;
$Ver = true;
if( $n>0 ){
if( $DimTranslate[$n][1]=='"-1"' || $DimTranslate[$n][1]=='"-2"' ){
if( $DimTranslate[$n][0]==$DimTranslate[$n-1][0] && $Dim[$DimTranslate[$n][3]]==$Dim[$DimTranslate[$n-1][3]] ) $Ver = false;
}else{
if( $DimTranslate[$n][0]==$DimTranslate[$n-1][0] && ($DimTranslate[$n][1]==$DimTranslate[$n-1][1] || '@'.$DimTranslate[$n][1].'@'==$DimTranslate[$n-1][1]) && ($DimTranslate[$n][2]==$DimTranslate[$n-1][2] || '@'.$DimTranslate[$n][2].'@'==$DimTranslate[$n-1][2]) ) $Ver = false;
}
}
if( $Ver ){
echo '<tr>';
}else{
echo '<tr style="display:none">';
}
$Promp = $DimTranslate[$n][1];
$Ayuda = str_replace('"','&quot;',trim($DimTranslate[$n][5]));
if( $Promp=='"-1"' ){
echo '<td>&nbsp;'.trim($DimTranslate[$n][0]).'&nbsp;';
echo '<td>';
echo '<table border=0px cellspacing=0px cellpadding=2px class=TEXTOS style="border-collapse:collapse;">';
echo '<tr>';
echo '<td>Linea:'.($DimTranslate[$n][3]+1).':&nbsp;';
$Promp = str_replace('<','&lt;',$Dim[$DimTranslate[$n][3]]);
$Promp = str_replace('>','&gt;',$Promp);
echo '<td style="color:red">'.trim($Promp);
echo '</table>';
}else if( $Promp=='"-2"' ){
echo '<td>&nbsp;'.trim($DimTranslate[$n][0]).'&nbsp;';
echo '<td>';
echo '<table border=0px cellspacing=0px cellpadding=2px class=TEXTOS style="border-collapse:collapse;">';
echo '<tr><td>';
$tmp = explode('|',$Dim[$DimTranslate[$n][3]]);
$File = trim($tmp[$DimTranslate[$n][4]]);
$File = trim(substr($File,1));
echo '<button type="button" onclick="EditorHTML(\''.$File.'\')">Editar: '.$File.'</button>';
echo '</table>';
}else{
if( $Promp[0]=='"' || $Promp[0]=="'" ) $Promp = substr($Promp,1,-1);
$Promp1 = $Promp2 = $Promp;
$TieneClave = false;
$Tipo = 'N';
if( $Promp[0]=='@' ){
$Promp2 = $DimTraduccion[$Promp];
if( $Promp2=='' ){
$Tipo = 'C';
$Promp2 = $Promp;
$TieneClave = false;
}else{
$Tipo = 'T';
$Promp1 = substr($Promp,1,-1);
$TieneClave = true;
}
}
$Promp1 = str_replace('&','&amp;',$Promp1);
$Promp2 = str_replace('&','&amp;',$Promp2);
$Promp1 = str_replace('"','&quot;',$Promp1);
$Promp2 = str_replace('"','&quot;',$Promp2);
if( $Promp1[0]=='@' ) $Promp1 = substr($Promp1,1,-1);
if( $Promp2[0]=='@' ) $Promp2 = substr($Promp2,1,-1);
echo '<td>&nbsp;'.trim($DimTranslate[$n][0]).'&nbsp;';
echo '<td'.(($Ayuda=='')?'':' style="border-right:3px solid red"').' title="'.$Ayuda.'">';
echo '<table border=0px cellspacing=0px cellpadding=2px class=TEXTOS style="width:100%;border-collapse:collapse;">';
echo '<col style="width:20px"><col style="width:100%">';
if( $_GET["_KEYOFF"] ) echo '<tr style="display:none">';
else echo '<tr>';
$SinClave = '';
if( $LngBase ){
if( $TieneClave ){
echo '<td><img src="edes.php?R:$a/g/clave.gif">';
}else{
echo '<td>';
$SinClave = ' SinClave';
}
}else{
echo '<td><img src="g/'.$DimImgLeng[$_SESSION['_LanguageDefault']].'">';
}
echo '<td><input type="text" value="'.$Promp1.'" id="p'.$np.'" name="p'.$np.'__'.$DimTranslate[$n][3].'__'.$Tipo.'" size=90 maxLength255 class="LngBase'.$SinClave.'" readonly onfocus=S.key("#",255,0) tc="#" -onfocus="SiguienteCampo()" -style="width:100%">';
echo '<tr>';
echo '<td><img src="g/'.$DimImgLeng[$_SESSION['_LANGUAGE_']].'">';
echo '<td><input type="text" value="'.$Promp2.'" ovalue="'.$Promp2.'" id="r'.$np.'" name="r'.$np.'__'.$DimTranslate[$n][3].'" size=90 maxLength255 class=LngTraslate NLinea='.($DimTranslate[$n][3]+1).(($Tipo=='T')?' readonly style="color:#AAAAAA"':'').' onfocus=S.key("#",255,0) tc="#" -onkeydown=ControlTeclado() title="'.$Ayuda.'" -onfocus="CntON()" -onblur="CntOFF()">';
echo '</table>';
}
$np++;
}
echo '</table>';
if( count($_LANGUAGE) > 0 ){
echo '<br><span style="font-size:100%">TRADUCCIONES: '.str_replace($_SESSION['_LANGUAGE_'],strtoupper($_SESSION['_LANGUAGE_']),$xLenguajes).'</span>';
echo '<span style="margin-left:50px;font-size:70%;font-weight:normal;">Caracteres especiales: &#92; < > # · &#38;</span>';
echo '<table border=0px cellspacing=0px cellpadding=0px class=CONTENEDOR style="width:100%;-border-collapse:collapse;" id=TablaLeguaje>';
for( $n=0; $n<count($DimTranslate); $n++ ){
if( $DimTranslate[$n][0]!='LANGUAGE' ) continue;
$Promp1 = $DimTranslate[$n][1];
$Promp2 = $DimTranslate[$n][2];
$Ayuda = str_replace('"','&quot;',trim($DimTranslate[$n][5]));
echo '<tr title="'.$Ayuda.'">';
echo '<td'.(($Ayuda=='')?'':' style="border-right:3 solid red"').'>';
echo '<table border=0px cellspacing=0px cellpadding=2px class=TEXTOS style="width:100%;border-collapse:collapse;">';
echo '<col style="width:20px"><col style="width:100%">';
if( $_GET["_KEYOFF"] ) echo '<tr style="display:none">';
else echo '<tr>';
$SinClave = '';
if( $LngBase ){
echo '<td><img src="edes.php?R:$a/g/clave.gif">';
$Tipo = 'C';
}else{
echo '<td><img src="g/'.$DimImgLeng[$_SESSION['_LanguageDefault']].'">';
$Tipo = 'T';
}
echo '<td><input type="text" value="'.$Promp1.'" id="lp'.$np.'" name="lp'.$np.'__'.$DimTranslate[$n][3].'__'.$Tipo.'" size=90 maxLength255 class="LngBase'.$SinClave.'" readonly onfocus=S.key("#",255,0) tc="#" -onfocus="SiguienteCampo()" -style="width:100%">';
echo '<tr>';
echo '<td><img src="g/'.$DimImgLeng[$_SESSION['_LANGUAGE_']].'">';
echo '<td><input type="text" value="'.$Promp2.'" id="lr'.$np.'" name="lr'.$np.'__'.$DimTranslate[$n][3].'" size=90 maxLength255 class=LngTraslate title="'.$Ayuda.'" onchange="Repercusion()" onfocus=S.key("#",255,0) tc="#" -onfocus="CntON()" -onblur="CntOFF()">';
echo '</table>';
$np++;
}
echo '</table>';
}
echo '<center style="margin: 5px 0px 50px 0px">';
echo eAddButton(["icon"=>"U", "label"=>"Grabar textos", "click"=>"Grabar()", "class"=>"AddButton"]);
echo '</center>';
echo '</form>';
function CadenaEnFuncion( $txt, $NomFunc, $NParametro ){
$pi = strpos( $txt, $NomFunc ) + strlen($NomFunc);
for( $n=$pi; $n<strlen($txt); $n++ ){
if( substr($txt,$n,1)=='(' ){
$pi = $n+1;
break;
}
}
$aParametro = 0;
$xParametro = '';
$Cadena = '';
$Todo = '';
for( $n=$pi; $n<strlen($txt); $n++ ){
$c = substr($txt,$n,1);
$Todo .= $c;
$xParametro .= $c;
switch( $c ){
case "\t":
case ' ':
break;
case "'":
case '"':
$Cadena .= $c;
for( $p=$n+1; $p<strlen($txt); $p++ ){
$c2 = substr($txt,$p,1);
$Cadena .= $c2;
if( $c2==$c && substr($txt,$p-1,1)==chr(92) ){
}else if( $c==$c2 ) break;
}
if( $aParametro==$NParametro ){
if( substr_count($Cadena,'<'.'?')>0 ){
return array('"-1"',0,$Todo);
}else{
if( substr_count($txt,'_PROMP')>0 ){
return array('',0,'');
}else{
return array($Cadena,$n,$Todo);
}
}
}
$n = $p+0;
$Cadena = '';
$xParametro = '';
break;
case ',':
$aParametro++;
if( $aParametro > $NParametro ){
if( substr_count($txt,'_PROMP')>0 ){
return array('',0,'');
}else{
return array('"-1"',0,$Todo);
}
}
$xParametro = '';
break;
case ')':
if( $aParametro >= $NParametro ){
if( substr_count($txt,'_PROMP')>0 ){
return array('',0,'');
}else{
return array('"-1"',0,$Todo);
}
}
$xParametro = '';
break;
default:
}
}
return array('"-1"',0,$Todo);
}
function CadenaEnVariable( $txt, $NomVar ){
$NParametro = 0;
$pi = strpos( $txt, $NomVar );
if( $pi>0 ){
$c = substr($txt,$pi-1,1);
if( $c=='$' || $c==' ' || $c==',' || $c=="\t" ){
}else{
return array('"-1"',0,'');
}
}
$pi += strlen($NomVar);
for( $n=$pi; $n<strlen($txt); $n++ ){
$c = substr($txt,$n,1);
if( $c=='=' ){
$pi = $n+1;
break;
}else if( $c==' ' || $c=="\t" ){
}else{
return array('"-1"',0,'');
}
}
$aParametro = 0;
$Cadena = '';
$Todo = '';
for( $n=$pi; $n<strlen($txt); $n++ ){
$c = substr($txt,$n,1);
$Todo .= $c;
switch( $c ){
case "\t":
case ' ':
break;
case "'":
case '"':
$Cadena .= $c;
for( $p=$n+1; $p<strlen($txt); $p++ ){
$c2 = substr($txt,$p,1);
$Cadena .= $c2;
if( $c2==$c && substr($txt,$p-1,1)==chr(92) ){
}else if( $c==$c2 ) break;
}
if( $aParametro==$NParametro ){
if( substr_count($Cadena,'<'.'?')>0 ){
return array('"-1"',0,$Todo);
}else{
return array($Cadena,$n,$Todo);
}
}
$n = $p+0;
$Cadena = '';
break;
case ',':
$aParametro++;
if( $aParametro > $NParametro ) return array('"-1"',0,$Todo);
break;
case ')':
if( $aParametro >= $NParametro ) return array('"-1"',0,$Todo);
break;
default:
return array('"-1"',0,$Todo);
}
}
return array('"-1"',0,$Todo);
}
function CadenaEnFields( $Dim, $n ){
global $DimTranslate;
$no='';
for( $i=$n; $i<count($Dim); $i++ ){
$txt = trim($Dim[$i]);
if( substr($txt,0,8)!='#INCLUDE' ){}
if( $txt[0]=='¿' ){
eExplodeOne( $txt, '?', $no, $txt );
$txt = trim($txt);
}
if( $txt[0]=='#' ){
eExplodeOne( $txt, ')', $no, $txt );
$txt = trim($txt);
}
if( $txt=='' || $txt=='¿' || $txt=='?' ){
}else if( $txt[0]=='.' || substr($txt,0,2)=='/'.'/' ){
}else if( $txt[0]=='[' ){
return $i-1;
}else{
if( $txt[0]==',' ) $txt = trim(substr($txt,1));
if( $txt[0]=='+' ) $txt = trim(substr($txt,1));
if( $txt[0]*1==$txt[0] && $txt[0]>0 ) $txt = trim(substr($txt,1));
if( $txt[0]=='<' ) $txt = trim(substr($txt,1));
if( strtoupper(substr($txt,0,4))=='{FS}' ){
list(,,$txt) = explode('{',$txt);
list($txt) = explode('|',$txt);
$txt = trim($txt);
$DimTranslate[] = array( '  [Fields] &nbsp;FS', $txt, $txt, $i, -1 );
}else if( strtoupper(substr($txt,0,9))=='{COLUMNS}' ){
list(,,$txt) = explode('{',$txt);
$tmp = explode('|',$txt);
if( trim($tmp[2])!='' ) $DimTranslate[] = array( '  [Fields] &nbsp;Columns', trim($tmp[2]), trim($tmp[2]), $i, -1 );
}else if( $txt[0]=='-' ){
$tmp = explode('|',$txt);
if( trim($tmp[1])!='' ) $DimTranslate[] = array( '  [Fields] &nbsp;Linea', trim($tmp[1]), trim($tmp[1]), $i, -1 );
}else{
$tmp = explode('|',$txt);
if( count($tmp)>9 ){
$tmp[6] = trim($tmp[6]);
if( $tmp[6]=='*' || $tmp[6]=='*Q' || $tmp[6]=='*Q*' ) continue;
if( trim($tmp[0])!='' ){
$DimTranslate[] = array( '  [Fields]', trim($tmp[0]), trim($tmp[0]), $i, -1 );
}
if( trim($tmp[9])!='' ){
$tmp[9] = trim($tmp[9]);
if( substr($tmp[9],0,2)=='L:' ) $tmp[9] = trim(substr($tmp[9],2));
$DimTranslate[] = array( '  [Fields] &nbsp;MsgErr', $tmp[9], $tmp[9], $i, -1 );
}
}
}
}
}
return $i-1;
}
function TraduceTitle( &$txt, $Label, $NumLinea ){
$uTxt = strtoupper($txt);
if( $uTxt[0]=='<' || substr($uTxt,-1)=='>' ){
if( substr_count($uTxt,'TITLE')>0 ){
$i = strpos( $uTxt, 'TITLE' );
if( substr($uTxt,$i+5,1)=='=' || substr($uTxt,$i+5,1)=='=' ){
if( substr($uTxt,$i-1,1)==' ' || substr($uTxt,$i-1,1)==chr(10) || substr($uTxt,$i-1,1)==chr(13) || substr($uTxt,$i-1,1)==chr(9) ){
for( $n=$i+5; $n<strlen($uTxt); $n++ ){
if( substr($uTxt,$n,1)=='"' || substr($uTxt,$n,1)=="'" ){
$c = substr($uTxt,$n,1);
for( $p=$n+1; $p<strlen($uTxt); $p++ ){
if( substr($uTxt,$p,1)==$c && substr($uTxt,$p-1,1)!='\\' ){
$Promp = substr($txt,$n+1,$p-$n-1);			 // eTrace( $Promp );
global $DimTranslate;
$DimTranslate[] = array( ' '.$Label.'&nbsp;title', $Promp, $Traduccion, $NumLinea, -1 );
if( $txt[0]=='<' ){
$i = strpos($txt,'>');
$txt = trim( substr($txt,$i+1) );
return $txt;
}else{
$i = strpos($txt,'<');
$txt = trim( substr($txt,0,$i) );
return $txt;
}
}
}
}
}
}
}
}else{
$txt = '';
return '';
}
}
$txt = trim($txt);
return $txt;
}
?>
</BODY>
</HTML>
