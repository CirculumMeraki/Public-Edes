<?PHP
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
foreach( $_Objeto as $k=>$v ){
$_ObjetoID = $k;
break;
}
if( $_POST['_NAN_FIELDS_']!='' ){
include_once( $Dir_.$_Sql.'.inc' );
list( $Tabla, $cSource, $cTarget ) = explode(',',$_POST['_NAN_FIELDS_']);
qQuery( "delete from {$Tabla}" );
$Dim = explode(',',$_POST['_NAN_FORM_']);
for( $n=0; $n<count($Dim); $n++ ){
$tmp = explode('_',$Dim[$n]);
if( trim($tmp[0])!='' && trim($tmp[1])!='' ){
qQuery( "insert into {$Tabla} ( {$cTarget},{$cSource} ) values ( '{$tmp[0]}', '{$tmp[1]}' )" );
}
}
?>
<SCRIPT type="text/javascript">
var _WOPENER = window.frameElement.WOPENER;
_WOPENER.DGI("PROCESANDO").style.display = 'none';
S("body").tip(top.eLng(27),1);
</SCRIPT>
<?PHP
eEnd();
}
eHTML("L:{$OriFichero}", $Opcion);
eLink($_CSS);
echo "<LINK REL='stylesheet' HREF='{$_PathCSS}/nan.css' TYPE='text/css'>";
if( $_CSSADD != '' ) echo "<LINK REL='stylesheet' HREF='{$_PathCSS}/"._InVar($_CSSADD).".css' TYPE='text/css'>".$__Enter;
if( $_CSSPRINT != '' ){
echo "<LINK REL='stylesheet' HREF='{$_PathCSS}/{$_CSSPRINT}.css' TYPE='text/css'>";
}else{
if( file_exists( "{$_PathCSS}/{$_CSS}_print.css" ) ) echo "<LINK REL='stylesheet' HREF='{$_PathCSS}/{$_CSS}_print.css' TYPE='text/css' MEDIA='print'>";
}
if( $_SubModo!='ml' ) echo '<style>#NaNOrigen TD, #NaNDestino TD { cursor:default; }</style>';
if( $_NOSORT ) echo '<style>TH{cursor:default;}</style>'.$__Enter;
if( $_HTMHEAD!='' ) _IncludeJsHtml($_HTMHEAD, "HTMHead");
echo '<SCRIPT type="text/javascript" name=eDes>';
$_SourceScript = $OriFichero;
echo 'var _Source=_DESDE_=_FCH_="'.eQuote($OriFichero).'",';
echo "_Obj='L', _Mode='{$Opcion}', _NmGDF='{$_NmGDF}',";
if( !isset($_PSOURCE) ) $_PSOURCE='';
echo "_PSOURCE='{$_PSOURCE}',";
echo '_STOP='.( ( isset($_GET['_STOP']) ) ? 'true' : 'false' ).','.$__Enter;
echo "_FORMBUTTONS='{$_FORMBUTTONS}',";
echo '_pOBJ_ = _WOPENER = window.frameElement.WOPENER,';
echo '_pFCH_ = _WOPENER._Source,';
echo '_eID = new Date().getTime(),';
echo '_pID = _WOPENER._eID,';
echo '_WinCaption = '.((isset($_WINCAPTION))?'true,':'false,');
if( $_DEBUG==2 ) echo '_ShowError = 1,';
echo '_Mover = false;';
echo "if( window.name=='IWORK' && ( top._Desktop<2 || '{$_AUTOMENU}'=='2' ) ) top.eAutoMenu({$_AUTOMENU});";
echo "var _ymd = _D2S = _Hoy='".date('Ymd')."',_Connection_={$_SESSION['_Connection_']},_User={$_User},_Node={$_Node};".$__Enter;
if( $_SESSION["List"]["Cursor"] ){
echo 'var _GREENBAR = 1;';
}else if( $_SESSION["List"]["Greenbar"] ){
echo 'var _GREENBAR = 2;';
}else{
echo 'var _GREENBAR = 0;';
}
echo 'var _ConImpresora = '.(( $_NOTOOLS=='' || similar_text('*P',$_NOTOOLS)==0 ) ? 'true':'false').';';
if( !$_Development && $_SESSION['_D_']=='' ){
echo 'document.oncontextmenu = new Function("return false");';
echo 'document.onselectstart = new Function("return false");';
}
echo "var _AutoSize = new Array(0,0,'','{$_WINTITLE}');";
?>
function Cerrar(){
}
var _iAncho = _iAlto = 0;
function Recalcula( n ){
top.eLoading(false, window);
if( window.name=='FichaAux' ) return;
var el = DGI('FIN');
if( el == null ) return;
var Alto = el.offsetHeight;
while( el != null ){
Alto += el.offsetTop;
el = el.offsetParent;
}
var Ancho = Math.max( DGI('TITULO').offsetWidth, DGI('<?=$_ObjetoID?>').offsetWidth+7 ) + 80;
if( _AutoSize[0] != 0 ){
Ancho = _AutoSize[0];
Alto = _AutoSize[1];
if( Ancho == -1 ) Ancho = screen.width;
if( Alto == -1 ) Alto = screen.availHeight;
}
if( document.body.clientHeight < document.body.scrollHeight ) Alto = document.body.scrollHeight;
if( n != undefined ){
if( Ancho < _iAncho ) Ancho = _iAncho;
if( Alto < _iAlto ) Alto = _iAlto;
}
if( Ancho > screen.width ) Ancho = screen.width;
document.body.scroll = ( ( document.body.scrollHeight > document.body.clientHeight || document.body.scrollWidth > document.body.clientWidth ) ? 'yes':'no' );
if( _AutoSize[2]!='' ) document.body.scroll = _AutoSize[2];
if( S(window.frameElement).attr("eNORESIZE")!=null ) return;
if( top.eIsWindow(window) ){
if( _AutoSize[3]!='' ) top.eSWSetCaption( window, _AutoSize[3] );
if( Alto > document.body.clientHeight ) Alto += (document.body.offsetHeight-document.body.clientHeight);
if( document.body.scroll=='yes' ) Alto += top._ScrollBar;
top.eSWIResize( window, Ancho, Alto );
document.body.scroll = ( ( document.body.scrollHeight > document.body.clientHeight || document.body.scrollWidth > document.body.clientWidth ) ? 'yes':'no' );
}
}
function eXY( el ){
var xy = new Array(0,0);
while( el != null ){
xy[0] += el.offsetLeft - el.scrollLeft;
xy[1] += el.offsetTop - el.scrollTop;
el = el.offsetParent;
}
return xy;
}
<?PHP
if( $_Objeto[$_ObjetoID]['UNIQUE']=='' ){
echo 'var _NaN_Unique = true;';
}else{
echo 'var _NaN_Unique = '.$_Objeto[$_ObjetoID]['UNIQUE'].';';
}
?>
var _NaN_ON = false, _NaN_Obj, _NaN_X, _NaN_Y, _NaN_ox,_NaN_oy,_NaN_IY;
function _NaN_Mueve(){
if( event.button==1 &&_NaN_ON ){
_NaN_Obj.style.pixelLeft = _NaN_ox + event.clientX - _NaN_X;
_NaN_Obj.style.pixelTop = _NaN_oy + event.clientY - _NaN_Y - _NaN_IY;
return false
}
}
function _NaN_Captura( Obj ){
var NomId = window.frameElement.id.replace('swI_','swV_');
_NaN_IY = top.DGI(NomId).offsetTop;
_NaN_ON = true;
_NaN_Obj = Obj;
_NaN_ox = _NaN_Obj.style.pixelLeft;
_NaN_oy = _NaN_Obj.style.pixelTop;
_NaN_X = event.clientX;
_NaN_Y = event.clientY - _NaN_IY;
document.onmousemove = _NaN_Mueve;
}
function _NaN_CopiaTD( Obj, OD ){
var xy = eXY(Obj);
var YDIV = ( OD=='O' ) ? NaNOrigen.scrollTop : NaNDestino.scrollTop;
NaNObjMove.textContent = Obj.textContent;
with( NaNObjMove.style ){
display = 'block';
height = px(Obj.offsetHeight);
width = px(Obj.offsetWidth);
left = px(xy[0]);
top = px(xy[1] - YDIV);
}
_NaN_Captura( NaNObjMove );
}
function NaNCogeTD(){
<?PHP  if( $_SubModo!='ml' ) echo 'return false;'; ?>
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return;
NaNObjMove.className = '';
NaNObjMove.V = Obj.V;
_NaN_CopiaTD( Obj, 'O' );
if( _NaN_Unique ) Obj.parentNode.style.display = 'none';
}
function SortGrupo( TABLA, Desde ){
<?PHP  if( $_Objeto[$_ObjetoID]['SORT']=='false' ) echo 'return false;'; ?>
var TR = TABLA.rows, n, Hasta = TR.length - 1;
Desde++;
for( n=Desde; n<TR.length; n++){
if( TR[n].cells[0].tagName=='TH' ){
Hasta = n-1;
break;
}
}
var r,p, ori;
for( r=Desde; r<Hasta; r++ ){
mov = 0;
ori = TR[r].cells[0].textContent;
for( p=r+1; p<=Hasta; p++ ){
if( ori > TR[p].cells[0].textContent ){
mov = p;
ori = TR[p].cells[0].textContent;
}
}
if( mov > 0 ) S(TR[r]).nodeSwap( TR[mov] );
}
}
function NaNLiberaAsignaTD(){
_NaN_ON = false;
document.onmousemove = null;
NaNObjMove.style.display = 'none';
var Obj = document.elementFromPoint( event.clientX, event.clientY );
if( NaNOrigen.contains( Obj ) ){
if( _NaN_Unique ){
var TR = NaNOrigen.children[0].rows, n, Encontrado = false, p=-1;
for( n=0; n<TR.length; n++){
if( TR[n].cells[0].V==NaNObjMove.V ){
TR[n].style.display = 'block';
Encontrado = true;
break;
}else if( TR[n].cells[0].textContent < NaNObjMove.textContent ){
p = n;
}
}
if( !Encontrado ){
var TABLA = NaNOrigen.children[0];
var TR = TABLA.insertRow( p+1 );
var TD = TR.insertCell();
TD.textContent = NaNObjMove.textContent;
TD.V = NaNObjMove.V;
}
}
}else if( NaNDestino.contains( Obj ) ){
if( Obj.tagName!='TH' && Obj.className!='HJ' ){
if( Obj.tagName=='TABLE' && Obj.parentNode.id=='NaNDestino' ){
Obj = document.elementFromPoint( event.clientX, event.clientY+2 );
if( Obj.className!='HJ' ) return;
}else return;
}
var TABLA = NaNDestino.children[0];
var Padre = -1, n, PadreRowIndex;
for( n=Obj.parentNode.rowIndex; n>=0; n-- ){
if( TABLA.rows[n].cells[0].tagName=='TH' ){
Padre = TABLA.rows[n].cells[0].V;
PadreRowIndex = n;
break;
}
}
if( Padre==-1 || DGI('NaN'+Padre+'_'+NaNObjMove.V)!=null ) return;
var TR = TABLA.insertRow( Obj.parentNode.rowIndex + 1 );
var TD = TR.insertCell();
TD.textContent = NaNObjMove.textContent;
TD.className = 'HJ';
TD.id = 'NaN'+Padre+'_'+NaNObjMove.V;
SortGrupo( TABLA, PadreRowIndex );
}
}
function NaNQuitaMueveTD(){
<?PHP  if( $_SubModo!='ml' ) echo 'return false;'; ?>
var Obj = S.event(window);
if( Obj.tagName != 'TD' ) return;
if( Obj.className == 'HJ' ){
var tmp = Obj.id.split('_');
NaNObjMove.V = tmp[1];
_NaN_CopiaTD( Obj, 'D' );
var TABLA = NaNDestino.children[0];
TABLA.deleteRow( Obj.parentNode.rowIndex );
NaNObjMove.className = 'HJ';
}
}
function NaN_GetValues(){
var n, Valores = '', Obj = NaNDestino.children[0].getElementsByTagName('TD');
for( n=0; n<Obj.length; n++ ) Valores += Obj[n].id+',';
return Valores.substring(0,Valores.length-1).replace(/NaN/g,'');
}
function NaNUpdate(){
with( PROCESANDO.style ){
display = 'block';
left = px(event.x - (PROCESANDO.offsetWidth/2) + 2 + document.body.scrollLeft);
top = px(event.y - PROCESANDO.offsetHeight + document.body.scrollTop);
}
setTimeout('_NaNUpdate()',1);
}
function _NaNUpdate(){
var txt = '<HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"><TITLE></TITLE></HEAD><BODY>'+
'<FORM METHOD=POST ACTION="edes.php?E:$nan.inc" name="FRM1">'+
'<INPUT TYPE="HIDDEN" NAME="_NAN_FORM_" VALUE="'+NaN_GetValues()+'">'+
'<INPUT TYPE="HIDDEN" NAME="_NAN_FIELDS_" VALUE="<?=$_Objeto[$_ObjetoID]['DBNAN']?>,'+_NaNCampos+'">'+
'</FORM>'+
'</BODY></HTML>';
top.TLF.frameElement.WOPENER = window;
top.TLF.document.write( txt );
top.TLF.document.close();
top.TLF.document.FRM1.submit();
}
<?PHP
if( isset($_TituloSubVentana) ){
$tmp = str_replace( '"', '\"', EnPlural('',$_TITLE, false) );
if( $tmp[0]=='=' ) $tmp = substr($tmp,1);
$tmp = '';
echo 'var _SWTitle = "'.$tmp.'";';
}
echo '</script>';
$_TITLE = strtr( $_TITLE, "áéíóúÁÉÍÓÚñãõ", "AEIOUAEIOUÑAO");
$_TITLE = strtr( $_TITLE, "äëÿöüÄËÏÖ"    , "AEIOÜAEIO"  );
$_TITLE = strtr( $_TITLE, "àèìòùÀÈÌÒÙ"   , "AEIOUAEIOU" );
$_TITLE = strtr( $_TITLE, "âêîôûÂÊÎÔÛ"   , "AEIOUAEIOU" );
if( count($_JSINCLUDE) > 0 ){
for( $n=0; $n<count($_JSINCLUDE); $n++ ){
if( substr($_JSINCLUDE[$n],-3)!='.js' ) $_JSINCLUDE[$n] .= '.js';
if( $_JSINCLUDE[$n][0]=='$' ) $_JSINCLUDE[$n] = 'edes.php?R:'.$_JSINCLUDE[$n];
echo '<SCRIPT SRC="'.trim($_JSINCLUDE[$n]).'" name=JSInclude></SCRIPT>'.$__Enter;
}
}
if( $_JSHEAD!='' ) _IncludeJsHtml($_JSHEAD, "JSHead");
if( !empty($_PHPHEAD) ){
$tmpFile = GrabaTmp('l_phphead', $_PHPHEAD, $LenDoc, $_FILE_PHPHEAD);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPHEAD);
}
$_HELP = 'top.gsHelpErr(window);'.$_HELP;
$gsEdition = '';
if( $_SESSION["WaterMarking"]!='' ) $_WaterMarkingCSS = "background-image:url(".$_SESSION["WaterMarking"]."); background-repeat:no-repeat; background-attachment:fixed;";
echo "</HEAD><BODY style='margin:0px;padding:0px;{$_WaterMarkingCSS}' onhelp='{$_HELP}return false;' onbeforeunload='Cerrar()' onload='Recalcula();{$gsEdition}{$_ONLOAD}'>".$__Enter;
if( $_HTMINI!='' ) _IncludeJsHtml($_HTMINI, "HTMIni");
if( $_JSINI!='' ) _IncludeJsHtml($_JSINI, "JSIni");
if( $_PHPINI!='' ){
$tmpFile = GrabaTmp('l_phpini', $_PHPINI, $LenDoc, $_FILE_PHPINI);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPINI);
}
if( $_PHPGRID!='' ){
$tmpFile = GrabaTmp('l_phpgrid', $_PHPGRID, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_PHPGRID = '#';
}
echo $__Enter;
echo '<CENTER>';
if( $_SUBLISTADO_==1 ){
}else if( substr_count( str_replace(' ','',$_TITLE), '()' )==1 ){
$n = strlen(ob_get_contents());
call_user_func( trim(substr($_TITLE,0,strpos($_TITLE,'('))), $Opcion );
$_TITLE = substr( ob_get_contents(), $n );
}else{
if( !$VieneDeFicha || $_NOSELECTROW ){
$_TITLE = EnPlural( $_TITLE, 'LISTADO DE #', true, $_oTITLE );
}else{
$txt = array('ml'=>'MODIFICAR','cl'=>'CONSULTAR','bl'=>'BORRAR');
if( substr($_sDBTABLE,-4)!='_dlt' ){
$_TITLE = EnPlural( $_TITLE, 'SELECCIONAR # A '.$txt[$_SubModo], false, $_oTITLE );
}else{
$_TITLE = EnPlural( $_TITLE, 'SELECCIONAR # A RECUPERAR', false, $_oTITLE );
}
}
if( $_TITLE!='' ){
echo "<TABLE class=TITULO border=0px cellspacing=0px cellpadding=0px style='background:transparent'>";
$tmp = explode('<BR>',$_TITLE);
for( $l=0; $l<count($tmp); $l++ ){
$tmp[$l] = str_replace('&NBSP;','&nbsp;',$tmp[$l]);
echo "<tr><td id=TITULO align=center nowrap style='cursor:default;background:transparent;'>{$tmp[$l]}</td></tr>";
}
echo "</TABLE>";
}
}
if( isset($_SUBTITLE) ){
echo $__Enter;
echo "<table id=SubTitle cellspacing=0 cellpadding=0 border=0 style='background-color:transparent'><tr><td class=Titulo2>";
if( $_SUBTITLE=='' ){
echo "<table width=100% cellspacing=0 cellpadding=0 border=0><tr><td id='sT'>".date('d-m-Y')."</td><td align='right' id='sT'>".date('H:i:s')."</td></tr></table>";
}else{
@eval($_SUBTITLE);
}
echo '</td></tr></table>';
?>
<SCRIPT type="text/javascript" name=eDes>
var Obj = DGI("SubTitle").children;
for( var n=0; n<Obj.length; n++ ) Obj[n].style.backgroundColor = 'transparent';
</SCRIPT>
<?PHP
}
$DimAnchos = explode( ',', str_replace(' ','',$_Objeto[$_ObjetoID]['WIDTH']) );
if( $DimAnchos[0]!='' ) $DimAnchos[0] = ' width:'.$DimAnchos[0].';';
if( $DimAnchos[1]!='' ) $DimAnchos[1] = ' width:'.$DimAnchos[1].';';
if( $_Objeto[$_ObjetoID]['HEIGHT']<>'' ){
if( substr_count($_Objeto[$_ObjetoID]['HEIGHT'],'%')>0 ){
$_Objeto[$_ObjetoID]['HEIGHT'] = str_replace('%','',$_Objeto[$_ObjetoID]['HEIGHT']);
$_Objeto[$_ObjetoID]['HEIGHT'] = ' height='.( ($_Objeto[$_ObjetoID]['HEIGHT']*$_SESSION['_pxH_'])/100 );
}else{
$_Objeto[$_ObjetoID]['HEIGHT'] = ' height='.$_Objeto[$_ObjetoID]['HEIGHT'];
}
}
if( $_Objeto[$_ObjetoID]['BOTTON']=='' ) $_Objeto[$_ObjetoID]['BOTTON'] = 'Modificar';
?>
<table id='<?=$_ObjetoID?>' cellspacing=1px cellpadding=0 border=0 onselectstart='return false'<?=$_Objeto[$_ObjetoID]['HEIGHT']?>>
<tr>
<th><?=$_Objeto[$_ObjetoID]['TITLESOURCE']?>
<th><?=$_Objeto[$_ObjetoID]['TITLETARGET']?>
</tr>
<tr height=100%>
<td>
<div id='NaNOrigen' style="height:100%; overflow:auto;<?=$DimAnchos[0]?>">
<table width='100%' onMouseDown='NaNCogeTD()'>
<col class='Celda' style="white-space:nowrap">
<?PHP
$oTabla = trim($_Objeto[$_ObjetoID]['DBSOURCE']);
if( substr($oTabla,0,6)=='select' ){
while( substr_count($oTabla,'  ')>0 ) $oTabla = str_replace('  ',' ',$oTabla);
list($_CampoCOrigen,$_CampoNOrigen) = explode(',',substr($oTabla,7));
list($_CampoNOrigen,,$xTabla) = explode(' ',trim($_CampoNOrigen));
$_CampoCOrigen = trim($_CampoCOrigen);
$_CampoNOrigen = trim($_CampoNOrigen);
$xTabla = trim($xTabla);
qQuery( $oTabla );
$oTabla = $xTabla;
}else{
$_CampoCOrigen = "cd_{$oTabla}";
$_CampoNOrigen = "nm_{$oTabla}";
if( $_Objeto[$_ObjetoID]['UNIQUE']=='true' ){
qQuery( "select cd_{$oTabla},nm_{$oTabla} from {$oTabla} where cd_{$oTabla} not in ( select cd_{$oTabla} from {$_Objeto[$_ObjetoID]['DBNAN']} ) order by nm_{$oTabla}" );
}else{
qQuery( "select cd_{$oTabla},nm_{$oTabla} from {$oTabla} order by nm_{$oTabla}" );
}
}
while( $r=qRow() ) echo '<tr><td V='.trim($r[0]).'>'.trim($r[1]);
?>
</table>
</div>
</td>
<td>
<div id='NaNDestino' style="height:100%; overflow:auto;<?=$DimAnchos[1]?>">
<table width='100%' onMouseDown='NaNQuitaMueveTD()'>
<col class='Celda' style="white-space:nowrap">
<?PHP
$dTabla = $_Objeto[$_ObjetoID]['DBTARGET'];
if( substr($dTabla,0,6)=='select' ){
while( substr_count($dTabla,'  ')>0 ) $dTabla = str_replace('  ',' ',$dTabla);
list($_CampoCDestino,$_CampoNDestino) = explode(',',substr($dTabla,7));
list($_CampoNDestino,,$xTabla) = explode(' ',trim($_CampoNDestino));
$_CampoCDestino = trim($_CampoCDestino);
$_CampoNDestino = trim($_CampoNDestino);
qQuery( $dTabla );
$dTabla = $xTabla;
}else{
$_CampoCDestino = "cd_{$dTabla}";
$_CampoNDestino = "nm_{$dTabla}";
qQuery( "select cd_{$dTabla},nm_{$dTabla} from {$dTabla} order by nm_{$dTabla}" );
}
$DimNAN = array();
qQuery( "select D.{$_CampoCDestino}, O.{$_CampoCOrigen}, O.{$_CampoNOrigen} from {$_Objeto[$_ObjetoID]['DBNAN']} OD
left join {$dTabla} D on OD.{$_CampoCDestino}=D.{$_CampoCDestino}
left join {$oTabla} O on OD.{$_CampoCOrigen}=O.{$_CampoCOrigen}
order by D.{$_CampoNDestino},O.{$_CampoNOrigen}", $pt );
while( $r2=qRow($pt) ) $DimNAN[] = array( trim($r2[0]), trim($r2[1]), trim($r2[2]) );
$TDimNAN = count($DimNAN);
$p = 0;
while( $r=qRow() ){
$r[0] = trim($r[0]);
$r[1] = trim($r[1]);
echo '<tr><th V='.$r[0].'>'.$r[1];
if( $r[0]==$DimNAN[$p][0] ){
while( $r[0]==$DimNAN[$p][0] && $p<$TDimNAN ){
echo '<tr><td class=HJ id=NaN'.$r[0].'_'.$DimNAN[$p][1].'>'.$DimNAN[$p][2];
$p++;
}
if( $p==$TDimNAN ) $p=0;
}
}
?>
</table>
</div>
</td>
</tr>
</table>
<?PHP  if( $_SubModo=='ml' ){ ?>
<BR>
<INPUT TYPE="button" class="Boton" onclick='NaNUpdate()' VALUE='<?=$_Objeto[$_ObjetoID]['BOTTON']?>'>
<?PHP  } ?>
</center>
<div id="NaNObjMove" V="" onMouseUp="NaNLiberaAsignaTD()" onselectstart='return false'></div>
<SCRIPT type="text/javascript">
var _NaNCampos = '<?=$_CampoCOrigen.','.$_CampoCDestino?>';
</SCRIPT>
<DIV id="PROCESANDO" class="ICONLOADING" onclick='this.style.display="none"'>r</DIV>
<?PHP
echo '<script type="text/javascript">';
gsAvisos($_OtroDiccionario);
echo '</SCRIPT>';
if( count($_JSDIM) > 0 ){
echo '<SCRIPT name=JSDim>';
for( $i=0; $i<count($_JSDIM); $i++ ){
$n = 0;
if( substr_count( $_JSDIM[$i][1], '{' ) > 0 ){
$DimNomVar = array_keys($_POST);
$DimValor  = array_values($_POST);
for( $ii=0; $ii<count($_POST); $ii++ ){
${$DimNomVar[$ii]} = $DimValor[$ii];
}
foreach( $_SESSION as $key => $value ) ${$key} = $value;
$_JSDIM[$i][1] = @eval('return ("'.$_JSDIM[$i][1].'");');
}
qQuery( $_JSDIM[$i][1] );
echo "\nvar ".$_JSDIM[$i][0].'=new Array(';
if( sql_TotalCampos() == 1 ){
while( $row = qRow() ) {
if( $n > 0 ) echo ',';
$row[0] = trim($row[0]);
echo "'{$row[0]}'";
$n++;
}
}else{
while( $row = qRow() ) {
if( $n > 0 ) echo ',';
echo 'Array(';
for( $p=0; $p<count($row); $p++ ){
if( $p>0 ) echo ',';
$row[$p] = trim($row[$p]);
echo "'{$row[$p]}'";
}
echo ')';
$n++;
}
}
echo ');';
qFree();
}
echo "\n";
echo '</SCRIPT>';
}
if( $_JSEND!='' ) _IncludeJsHtml($_JSEND, "JSEnd");
if( $_HTMEND!='' ) _IncludeJsHtml($_HTMEND, "HTMEnd");
if( !empty($_PHPEND) ){
$tmpFile = GrabaTmp( 'l_phpend', $_PHPEND, $LenDoc, $_FILE_PHPEND );
include( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
unset( $_PHPEND );
}
echo '<br id=FIN></BODY></HTML>';
qFree();
qEnd();
eEnd();
