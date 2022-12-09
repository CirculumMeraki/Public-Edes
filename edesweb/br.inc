<?PHP
?>
<style>
.CLASSBR { background:yellow; }
.CLASSBR TABLE { background:#3f474c; }
.CLASSBR TH { background:#dde5ea; color: #001087; }
.CLASSBR TD { background:#fffbf0; vertical-align:top; }
.CLASSBR INPUT { border:0px; background:transparent; padding-left:0px; }
.CLASSBR TEXTAREA { border:0px; background:transparent; }
.CLASSBR INPUT:checkbox { border:0px; background:transparent; }
.CLASSBR IMG { margin:0px;padding:0px; }
</style>
<script type="text/javascript" id="JSCheckSubmit">
function eJSCheckSubmit(){
alert('Prueba:1');
return false;
}
</script>
<script type="text/javascript">
function CntRDNVer(){
DGI('CntRDN').style.display = 'block';
if( DGI('CntRDN').scrollHeight > document.body.clientHeight ) DGI('CntRDN').style.height = '100%';
if( DGI('CntRDN').scrollWidth > DGI('CntRDN').clientWidth ) DGI('CntRDN').style.width = DGI('CntRDN').scrollWidth;
}
function RdnOk(){
var o = S.event(window);
var TD = S.toTag(o,'TD');
if( TD.cellIndex==2 ){
var TR = S.toTag(o,'TR');
if( TR.rowIndex+1==DGI('_RDN').rows.length ){
var bakTR = S(DGI('_RDNCOPY').rows[0]).nodeCopy();
bakTR.id = '';
DGI('_RDN').children[0].appendChild(bakTR);
if( DGI('CntRDN').scrollHeight > document.body.clientHeight ){
DGI('CntRDN').style.height = document.body.clientHeight;
DGI('CntRDN').style.scroll = 'yes';
DGI('CntRDN').style.width = DGI('CntRDN').scrollWidth;
DGI('CntRDN').scrollTop = 9999;
}
}
o.value = o.value.toLowerCase();
var Patron = new RegExp( "^[a]{0,1}[b]{0,1}$" );
if( Patron!='' && !Patron.test(o.value) && o.value.length!=0 ){
o.focus();
}else{
TR.cells[TD.cellIndex+1].children[0].focus();
}
}
}
function RDN_Left(o){
var TR = S.toTag(o,'TR');
var Input = TR.cells[3].children[0];
var aLeft = parseInt(S(Input).css("paddingLeft"));
aLeft = aLeft-20;
if( aLeft>=0 ) Input.style.paddingLeft = aLeft;
}
function RDN_Right(o){
var TR = S.toTag(o,'TR');
var Input = TR.cells[3].children[0];
var aLeft = parseInt(S(Input).css("paddingLeft"));
aLeft = aLeft+20;
Input.style.paddingLeft = aLeft;
}
function RDN_Down(o){
var TR = S.toTag(o,'TR');
if( TR.rowIndex+1<DGI('_RDN').rows.length-1 ) S(TR).nodeSwap(DGI('_RDN').rows[TR.rowIndex+1]);
}
function RDN_Up(o){
var TR = S.toTag(o,'TR');
if( TR.rowIndex>1 ) S(TR).nodeSwap(DGI('_RDN').rows[TR.rowIndex-1]);
}
function BRGetCondiciones(){
var TR = DGI('_RDN').rows, l,c, txt='', Linea='', sLinea='', nLinea='';
for( l=1; l<TR.length; l++ ){
sLinea = '';
nLinea = '';
for( c=2; c<TR[l].cells.length; c++ ){
sLinea = sLinea+eTrim(TR[l].cells[c].children[0].value);
Linea = eAllTrim(TR[l].cells[c].children[0].value).replace(/\r\n/g,'&#10;');
nLinea = nLinea+Linea+'~';
}
if( sLinea!='' ) txt += ((TR[l].cells[1].children[0].checked)?'true':'false')+'~'+ S(TR[l].cells[3].children[0]).css("paddingLeft").replace('px','')+'~'+nLinea+"\n";
}
return txt;
}
function BRSubmit(){
BRFORM._SOURCE_.value = _Source;
BRFORM._ROULES_.value = BRGetCondiciones();
document.BRFORM.submit();
}
function CntNewCheck(){
BRFORM._SOURCE_.value = '<check>';
BRFORM._ROULES_.value = BRGetCondiciones();
top.TLF.frameElement.WOPENER = window;
document.BRFORM.target = 'TLF';
document.BRFORM.submit();
document.BRFORM.target = '';
}
function eFitToContent(o, maxH, minH){
if ( !o ) return;
if( event==null || (event!=null && (event.keyCode==8 || event.keyCode==46)) ) o.style.height = minH+"px";
var aHeight = o.clientHeight;
if( !maxH || maxH>aHeight ){
aHeight = Math.max(o.scrollHeight, aHeight)+2;
if( maxH ) aHeight = Math.min(maxH, aHeight);
if( aHeight>o.clientHeight ) o.style.height = aHeight+"px";
}
}
</script>
<?PHP
$Linea = <<<EOF
<tr>
<td>
<img src='edes.php?R:t/g/e/2_izq.gif' onclick='RDN_Left(this)'>
<img src='edes.php?R:t/g/e/2_dch.gif' onclick='RDN_Right(this)'>
<img src='edes.php?R:t/g/e/2_bajar.gif' onclick='RDN_Down(this)'>
<img src='edes.php?R:t/g/e/2_subir.gif' onclick='RDN_Up(this)'>
</td>
<td><INPUT name_no1 type=checkbox [ESTADO]></td>
<td><INPUT name_no2 VALUE="[AM]" class='EDITABLE' onfocusout='RdnOk()' MAXLENGTH=2 SIZE=2 style='width:25'></td>
<td><INPUT name_no3 VALUE="[CONDICION]" class='EDITABLE' MAXLENGTH=255 SIZE=60 style='padding-left:[PADDINGLEFT]'></td>
<td><INPUT name_no4 VALUE="[SET]" class='EDITABLE' MAXLENGTH=255 SIZE=20></td>
<td><INPUT name_no5 VALUE="[FOCUS]" class='EDITABLE' MAXLENGTH=255 SIZE=15></td>
<td><TEXTAREA name_no6 class='EDITABLE' onkeyup=eFitToContent(this,100,19) COLS=40 ROWS=1 wrap=VIRTUAL>[MENSAJE]</TEXTAREA></td>
<td><TEXTAREA name_no7 class='EDITABLE' onkeyup=eFitToContent(this,100,19) COLS=30 ROWS=1 wrap=VIRTUAL>[AYUDA]</TEXTAREA></td>
<td style="display:none"><TEXTAREA name_no8 class='EDITABLE' onkeyup=eFitToContent(this,100,19) COLS=3 ROWS=1 wrap=VIRTUAL>[NOTA]</TEXTAREA></td>
</tr>
EOF;
$Linea = str_replace('R:t/g/e/','R:$t/g/e/',$Linea);
$Linea = str_replace('<td>','<td style="vertical-align:top">',$Linea);
$Claves = array( '[ESTADO]','[PADDINGLEFT]','[AM]','[CONDICION]','[SET]','[FOCUS]','[MENSAJE]','[AYUDA]','[NOTA]' );
$bLinea = $Linea;
$bLinea = str_replace( $Claves[0], 'checked', $bLinea );
for( $c=1; $c<count($Claves); $c++ ) $bLinea = str_replace( $Claves[$c], '', $bLinea );
?>
<table id=_RDNCOPY style='display:none'>
<?= $bLinea ?>
</table>
<FORM AUTOCOMPLETE="off" NAME="BRFORM" action="edes.php?E:$br.php" METHOD="POST" style='display:none'>
<INPUT name='_SOURCE_' VALUE='<?= $_Source ?>'>
<TEXTAREA name='_ROULES_'></TEXTAREA>
</FORM>
<span id=CntRDN class=CLASSBR style='border:1px solid red;position:absolute;left:0px;top:0px; overflow-y:auto; float:left; display:none'>
REGLAS DE NEGOCIO
<button onclick='BRSubmit()'>Grabar</button> &nbsp;
<button onclick='CntNewCheck()'>Probar Reglas</button> &nbsp; &nbsp; &nbsp;
<button>Ver Activos</button> &nbsp;
<button>Ver Todo</button> &nbsp; &nbsp; &nbsp;
<button onclick='CntFIELDVer()'>Campos</button> &nbsp;
<button onclick='CntVARIABLESVer()'>Variables</button> &nbsp;
<button>Funciones</button> &nbsp;
<button onclick='CntCONSTANTESVer()'>Constantes</button> &nbsp;
<button>Ayuda</button> &nbsp; &nbsp; &nbsp;
<button>Imprimir</button> &nbsp;
<button onclick="CntRDN.style.display='none'">Ocultar</button>
<table id=_RDN border=0 cellspacing=1px cellpadding=2px>
<tr>
<th>Op</th>
<th>E</th>
<th>Md</th>
<th>Condición</th>
<th>Set</th>
<th>Focus/Acción</th>
<th>MENSAJE ePE/eAlert</th>
<th>AYUDA</th>
<th style="display:none">NOTA Interna</th>
</tr>
<?PHP
$File = file( eScript($OriFichero.'.br') );
$DimCampos = array();
$DimConstantes = array();
$HayReg = false;
for( $n=0; $n<count($File); $n++ ){
$File[$n] = trim($File[$n]);
if( strtoupper($File[$n])=='[SUBMIT]' ){
for( $i=$n+1; $i<count($File); $i++ ){
$File[$i] = trim($File[$i]);
if( $File[$i][0]=='[' ){
$n = $i-1;
break;
}
$File[$i] = str_replace('<','&lt;',$File[$i]);
$File[$i] = str_replace('>','&gt;',$File[$i]);
$File[$i] = str_replace('"','&quot;',$File[$i]);
if( $File[$i][0]=='[' ){
break 2;
}
$Valores = explode('~',$File[$i]);
$sLinea = $Linea;
if( $Valores[0]=='true' ){
$sLinea = str_replace( $Claves[0], 'checked', $sLinea );
}else{
$sLinea = str_replace( $Claves[0], '', $sLinea );
}
for( $c=1; $c<count($Claves); $c++ ){
if( $c>=6 ) $Valores[$c] = str_replace( '&#10;', "\n", $Valores[$c] );
$sLinea = str_replace( $Claves[$c], $Valores[$c], $sLinea );
}
echo $sLinea;
$HayReg = true;
}
}else if( strtoupper($File[$n])=='[FIELDS]' ){
for( $i=$n+1; $i<count($File); $i++ ){
$File[$i] = trim($File[$i]);
if( $File[$i][0]=='[' ){
$n = $i-1;
break;
}
list($OnOff,$Label,$Campo,$oLabel) = explode('~',$File[$i]);
$DimCampos[$Campo] = explode('~',$File[$i]);
}
}else if( strtoupper($File[$n])=='[CONSTANTES]' ){
for( $i=$n+1; $i<count($File); $i++ ){
$File[$i] = trim($File[$i]);
if( $File[$i][0]=='[' ){
$n = $i-1;
break;
}
list($Label,$Campo,$Valor,$oLabel) = explode('~',$File[$i]);
$DimConstantes[$Campo] = explode('~',$File[$i]);
}
}
}
if( !$HayReg ) echo $bLinea;
echo '</table>';
echo '</span>';
?>
<script type="text/javascript">
DGI('CntRDN').style.display = 'block';
var TR = DGI('_RDN').rows, l,c;
for( l=1; l<TR.length; l++ ) for( c=6; c<TR[l].cells.length; c++ ) S(TR[l].cells[c].children[0]).eventFire("keyup");
CntRDNVer();
</script>
<?PHP
?>
<script type="text/javascript">
function CntFIELDVer(){
DGI('CntFIELD').style.display = 'block';
if( DGI('CntFIELD').scrollHeight > document.body.clientHeight ) DGI('CntFIELD').style.height = '100%';
}
function CntVARIABLESVer(){
DGI('CntVARIABLES').style.display = 'block';
if( DGI('CntVARIABLES').scrollHeight > document.body.clientHeight ) DGI('CntVARIABLES').style.height = '100%';
}
function CntCONSTANTESVer(){
DGI('CntCONSTANTES').style.display = 'block';
if( DGI('CntCONSTANTES').scrollHeight > document.body.clientHeight ) DGI('CntCONSTANTES').style.height = '100%';
}
function BRFieldsSubmit(){
var TR = DGI('BRFields').rows, l,c, txt='', Linea='';
for( l=1; l<TR.length; l++ ){
if( TR[l].cells.length==1 ) continue;
txt += ((TR[l].cells[0].children[0].checked)?'true':'false')+'~';
for( c=1; c<TR[l].cells.length; c++ ){
Linea = eAllTrim(TR[l].cells[c].children[0].value);
if( c>=6 ) Linea = Linea.replace(/\r\n/g,'&#10;');
txt += Linea+'~';
}
txt += "\n";
}
BRFORMFIELDS._SOURCE_.value = _Source;
BRFORMFIELDS._FIELDS_.value = txt;
document.BRFORMFIELDS.submit()
}
</script>
<FORM AUTOCOMPLETE="off" NAME="BRFORMFIELDS" action="edes.php?E:$br.php" METHOD="POST" style='display:none'>
<INPUT name='_SOURCE_' VALUE='<?= $_Source ?>'>
<TEXTAREA name='_FIELDS_'></TEXTAREA>
</FORM>
<?PHP
$DimChrCambiar = array('.','·',':',',','_','-','/','(',')',chr(10),chr(13),chr(9),'&nbsp;');
$DimControl = array();
$DimLabel = array();
$DimLabelNum = array();
?>
<span id=CntFIELD class=CLASSBR style='border:1px solid red; position:absolute;left:0px;top:0px;display:none; overflow-y:auto; float:left;'>
<table cellspacing=1px cellpadding=2px border=0>
<tr>
<TH>Lista de Campos</TH>
<TD><button>Ver Activos</button></TD>
<TD><button>Ver Todo</button> &nbsp; &nbsp; &nbsp;</TD>
<TD><button onclick='BRFieldsSubmit()'>Grabar</button></TD>
<TD><button onclick="CntFIELD.style.display='none'">Ocultar</button></TD>
</tr>
</table>
<?PHP
echo '<table id=BRFields cellspacing=1px cellpadding=2px border=0>';
global $_Form,$_TabTITLE;
$nTab=0;
for( $n=0; $n<count($_Form); $n++ ){
if( $nTab<>$_Form[$n][10] ){
$nTab = $_Form[$n][10];
echo '<tr><th colspan=4>'.$_TabTITLE[$nTab].'</th>';
}
$Label = trim($_Form[$n][0]);
$Control = trim($_Form[$n][1]);
$Oculto = (trim($_Form[$n][6])=='*');
if( $Label=='-' ){
echo '<tr><th colspan=4>'.$Control.'</th>';
}else if( $Label[0]=='{iSubList}' ){
echo '<tr><th colspan=4>'.$Label.'</th>';
}else if( $Label[0]=='{' ){
if( $Label=='{Z}' && trim($_Form[$n+1][0])=='-' ) continue;
list($iz,$d) = explode('}',$Label);
$d = strtoupper(trim($d));
if( $d=='<BR/>' || $d=='<BR>' ) continue;
echo '<tr><th colspan=4>'.$Label.' -| '.$Control.'</th>';
}else{
echo '<tr>';
$Label = strip_tags($Label);
$Label = trim($Label);
$LabelHeredada = false;
if( $Label=='' && $Label2<>'' ){
$Label = $Label2;
$LabelHeredada = true;
}
list($Label,$Label2) = explode('/',$Label);
$Label2 = trim($Label2);
list($Label) = explode('(',$Label);
for( $i=0; $i<count($DimChrCambiar); $i++ ) $Label = str_replace($DimChrCambiar[$i],' ',$Label);
$Label = trim($Label);
$Label = ucwords(eStrLower($Label));
$Label = strtr($Label, 'ÑÇÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙÜÃÕ', 'ÑÇAEIOUAEIOUAEIOUÜAO');
$Label = strtr($Label, 'ñçáéíóúàèìòùâêîôûüãõ', 'ñçaeiouaeiouaeiouüao');
$Label = str_replace(' ','',$Label);
list($Control) = explode(':',$Control);
list($Control) = explode('{',$Control);
$Control = trim($Control);
$ConCheck = (($Label=='')?'false':'true');
if( $DimCampos[$Control][1]!='' && $DimCampos[$Control][1]!=$Label ) $Label = $DimCampos[$Control][1];
if( $DimCampos[$Control][0]!='' && $DimCampos[$Control][0]!=$ConCheck ) $ConCheck = $DimCampos[$Control][0];
$DimCampos[$Control][1] = $Label;
$ConCheck = (($ConCheck=='true')?'checked':'');
$DimControl[] = array( $Label, $Control );
$DimControl[$Control] = $Label;
if( $Label!='' ){
$DimLabel[$Label] = $Control;
$DimLabelNum[$Label]++;
}
echo "<td><INPUT NAME='_CampoV_{$n}' type=checkbox ".$ConCheck."></td>";
if( $Label[0]=='@' ){
echo '<td style="background:red">';
}else if( $DimLabelNum[$Label]>1 ){
echo '<td style="background:yellow">';
}else if( $LabelHeredada ){
echo '<td style="background:#33cc00">';
}else{
echo '<td>';
}
echo "<INPUT NAME='_CampoL_{$n}' VALUE='{$Label}' class='EDITABLE' MAXLENGTH=30 SIZE=30></td>";
$CampoVirtual = (($Control[0]=='_') ? ' style="background:#ffff99"':'');
if( $Oculto ) $CampoVirtual = ' style="background:#cccc99"';
echo "<td {$CampoVirtual}><INPUT NAME='_CampoC_{$n}' VALUE='{$Control}' class='READONLY' readOnly onfocus=this.blur() MAXLENGTH=30 SIZE=30 style='cursor:default'></td>";
echo "<td><INPUT NAME='_CampoS_{$n}' VALUE='{$Label}' type=hidden></td>";
}
}
echo '</table>';
echo '</span>';
?>
<span id=CntVARIABLES class=CLASSBR style='border:1px solid red; position:absolute;left:0px;top:0px;display:none; overflow-y:auto; float:left;'>
<table cellspacing=1px cellpadding=2px border=0px>
<tr>
<TH>Lista de Variables</TH>
<TD><button onclick='BRVariablesSubmit()'>Grabar</button></TD>
<TD><button onclick="CntVARIABLES.style.display='none'">Ocultar</button></TD>
</tr>
</table>
<?PHP
echo '<table id=BRVariables cellspacing=1px cellpadding=2px border=0px>';
foreach( $_ADDOPTION as $k=>$v ){
if( $DimCampos[$k][1]=='' ) $DimCampos[$k][1] = $k;
$tmp = explode(';',$v);
echo '<tr><th colspan=2>'.$DimCampos[$k][1].'</th></tr>';
for( $n=0; $n<count($tmp); $n++ ){
list( $Clave,$Label ) = explode(',',$tmp[$n]);
$Clave = trim($Clave);
for( $i=0; $i<count($DimChrCambiar); $i++ ) $Label = str_replace($DimChrCambiar[$i],' ',$Label);
$Label = trim($Label);
if( $Label=='' ) continue;
$Label = ucwords(eStrLower($Label));
$Label = strtr($Label, 'ÑÇÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙÜÃÕ', 'ÑÇAEIOUAEIOUAEIOUÜAO');
$Label = strtr($Label, 'ñçáéíóúàèìòùâêîôûüãõ', 'ñçaeiouaeiouaeiouüao');
$Label = strtoupper(str_replace(' ','',$Label));
echo '<tr><td>'.$Clave.'</td><td>'.$Label.'</td></tr>';
}
}
echo '</table>';
echo '</span>';
?>
<span id=CntCONSTANTES class=CLASSBR style='border:1px solid red; position:absolute;left:0px;top:0px;display:none; overflow-y:auto; float:left;'>
<table cellspacing=1px cellpadding=2px border=0px>
<tr>
<TH>Lista de Constantes</TH>
<TD><button onclick="CntCONSTANTES.style.display='none'">Ocultar</button></TD>
</tr>
</table>
<?PHP
echo '<table id=BRConstantes cellspacing=1px cellpadding=2px border=0px>';
$File = file('../../edesweb/t/br.info');
for( $n=0; $n<count($File); $n++ ){
$File[$n] = trim($File[$n]);
if( $File[$n]=='' ) continue;
list($Label,$Clave) = explode('~',$File[$n]);
if( $Label=='' ){
echo '<tr><th colspan=2>'.$Clave.'</th></tr>';
continue;
}
echo '<tr><td>'.$Label.'</td><td>'.$Clave.'</td></tr>';
}
echo '</table>';
echo '</span>';
?>
