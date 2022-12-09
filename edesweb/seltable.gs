<?PHP
$Test = false;
if( $_GET['ALTO']=='' ) $_GET['ALTO'] = 10;
if( $_GET['COLS']=='' ) $_GET['COLS'] = 1;
$NCols = $_GET['COLS'];
$sAlto = $_GET['ALTO'];
$VALOR = stripslashes(urldecode($_GET['VALUE']));
$VALOR = str_replace('*', '%', $VALOR);
$VALOR = str_replace('?', '_', $VALOR);
$SQL = $_SESSION["_sql_".$_ENV["_"]["accessNew"]];
$SQL = str_replace('&#124;', '|', eEntityDecode($SQL, false));
$PARAMETERS = stripslashes(urldecode($_GET['PARAMETERS']));
$tmp = explode("|",$PARAMETERS);
for($n=0; $n<count($tmp); $n++){
$SQL = str_replace("#".($n+1), $tmp[$n], $SQL);
}
if( !isset($_GET['PAGINA']) ) $_GET['PAGINA'] = 0;
if( !isset($_GET['PAGINA']) ){
$Saltar = 0;
}else{
if( $_GET['PAGINA']<0 ) $_GET['PAGINA'] = 0;
$Saltar = $PAGINA * $_GET['ALTO'];
$_GET['ALTO'] = $Saltar + $_GET['ALTO'];
}
$ATras = ((isset($_GET['ATRAS'])) ? true : false);
if( isset($_GET['_DB']) ){
$_OtroDiccionario = true;
$tmp2 = str_replace( ' ','',$_GET['_DB']);
if( substr_count(str_replace('\\','/',$tmp2),'/')==0 ) $tmp2 = '/_datos/config/'.$tmp2;
if( substr_count($tmp2,'.')==0 ) $tmp2 .= '.ini';
include( eScript($tmp2) );
list($_Sql, $_SqlPDOType) = explode(':', str_replace(' ','',$_Sql));
if( $_Sql=='pdo' && $_SqlPDOConnect!='' ) $_SqlPDOConnect = eval('return ("'.$_SqlPDOConnect.'");');
}
if( eSqlType('mysql,mysqli') ){
$SQL .= ' limit '.($_GET['ALTO']+1);
}elseif( eSqlType('informix') ){
}elseif( eSqlType('oracle') ){
}
if( isset($_GET['Include']) ) include( eScript($_GET['Include']) );
$_DEBUG = 0;
include_once( $Dir_.$_Sql.'.inc' );
eHTML("F:{$Fichero}", $Opcion);
$AnularChr = false;
$sSQL = $SQL;
$SQL = str_replace('*', '%', $SQL);
if($Test) eTron( $SQL );
?>
</HEAD>
<BODY onload='CopySelect();'>
<SPAN id="SelBROWSER" class="SELECT EDITABLE SCROLLBAR" onmouseleave='this.style.display="none"; this.style.height:"1px";'>
<TABLE INIT=0 width=100% Pnt=<?=(($ATras)?$sAlto-1:0)?> onclick='_SelBrowserClick();' onmousewheel='_SelBrowserSlider()' cols=2 uField='<?=$_GET['DESTINO']?>'>
<COL>
<tbody>
<?PHP
if($Test){
eTron("---------------");
eTron($_SERVER["QUERY_STRING"]);
}
$Buscar = $VALOR;
$Long = strlen($VALOR);
if($Test){
eTron("[".$SQL."]");
eTron('Buscar['.$Buscar.'] Long['.strlen($Buscar).']['.$Buscar.']');
}
if( $Long==0 ){
$TReg = 0;
$Dim = array();
$aSQL = str_replace('#', "'".$Buscar."%'", $SQL);
if($Test) eTron($aSQL);
qQuery($aSQL);
while( $r=qRow() ){
if( trim($r[0])=="" ) $r[0] = "&nbsp;";
$Dim[$TReg] = $r;
++$TReg;
if( $TReg>=$_GET['ALTO'] ) break;
}
}else{
while( $Long>0 ){
$TReg = 0;
$Dim = array();
$aSQL = str_replace('#', "'".$Buscar."%'", $SQL);
if($Test) eTron( $aSQL );
qQuery($aSQL);
while( $r=qRow() ){
if( trim($r[0])=="" ) $r[0] = "&nbsp;";
$Dim[$TReg] = $r;
++$TReg;
if( $TReg>=$_GET['ALTO'] ) break;
}
if($Test) eTron("TReg: ".$TReg);
if( $Long>0 ){
if( $TReg>0 ) break;
$AnularChr = true;
$Buscar = substr($Buscar, 0, --$Long);
}else{
$TReg = 0;
$Dim = array();
break;
}
}
}
$EsElPrimero = true;
for($i=0; $i<$TReg; $i++){
$r = $Dim[$i];
if( $Saltar > 0 ){
$Saltar--;
continue;
}
echo '<TR><TD';
if( $EsElPrimero ){
echo '>';
}else{
echo '>';
}
echo $r[0].'</td>';
for($n=1; $n<count($r); $n++) echo '<td'.(($NCols>$n)?'>':' style="display:none">').$r[$n].'</TD>';
echo '</TR>';
$EsElPrimero = false;
}
$HayMas = false;
if( $TReg>=$_GET['ALTO'] && $r[0]!='' ){
$HayMas = true;
echo '<TR id="NO"><TD colspan='.count($r).'>...</TD></TR>';
}
?>
</tbody>
</TABLE></SPAN>
<script type="text/javascript">
var DGI	= function(a){
var el;
if( document.getElementById ){
el = document.getElementById(a);
}else if( document.all ){
el = document.document.all[a];
}else if( document.layers ){
el = document.document.layers[a];
}
return el || document.getElementsByName(a)[0] || null;
}
var _WOPENER = window.frameElement.WOPENER,
Obj = _WOPENER.DGI('<?= $_GET['DESTINO'] ?>');
Obj.setAttribute("ePag", <?= $_GET['PAGINA'] ?>);
DGI("SelBROWSER").children[0].setAttribute("HayMas", <?=(($HayMas)? 1 : 0)?>);
<?PHP if( $AnularChr ){ ?>
Obj.value = '<?=$Buscar?>';
function CopySelect(){
Obj.focus();
}
<?PHP }else if( $TReg>0 ){ ?>
function CopySelect(){
_WOPENER._SelBrowserCopy('<?=$_GET['DESTINO']?>', DGI("SelBROWSER").children[0].outerHTML);
Obj.focus();
_WOPENER.S.posCursor(Obj, Obj.value.length);
}
_WOPENER._WinBrowser['<?= $_GET['DESTINO'] ?>'+'_'+Obj.value.length] = DGI("SelBROWSER").children[0].outerHTML;
<?PHP }else{ ?>
function CopySelect(){
Obj.focus();
_WOPENER.DGI('SelBROWSER').style.display = 'none';
}
Obj.value = '<?=$Buscar?>';
_WOPENER._WinBrowser['<?= $_GET['DESTINO'] ?>'+'_'+Obj.value.length] = DGI("SelBROWSER").children[0].outerHTML;
<?PHP } ?>
_WOPENER.DGI('<?=$_GET['DESTINO']?>').style.backgroundColor = '';
</SCRIPT>
<?PHP
if($Test) eTron('TReg: '.$TReg);
eEnd();
?>
