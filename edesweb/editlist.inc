<?PHP
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() ) exit;
for($nf=0; $nf<count($_Form); $nf++){
$NomCampo = $_SelectReal[$_Form[$nf][1]];
if( substr_count('MSSsX.SL,SV,S,', $_Form[$nf][3])>0 && substr_count($_EDITLIST[0], ",{$NomCampo},")==1 ){
echo '<span id="Sel_'.$NomCampo.'" Filtro="" onkeydown="elSelKeyDown()" onmousewheel="elSelWheel(this)" class=SELECT style="position:absolute; overflow-y:auto; float:left; scroll:auto; margin:0px; display:none">';
echo '<TABLE class="col_0n col_1l" onclick="elSelUpdate()" style="cursor:pointer">';
echo '<col id=o><col>';
if( $_Form[$nf][3]=='SV' ){
foreach($_SelVirtual[$_Form[$nf][1]] as $key=>$value){
if( $key!='' ){
echo "<TR><TD>{$key}</TD><TD>{$value}</TD></TR>";
}else if( $value=="" && $_Form[$nf][8]<>'' && $_Form[$nf][8]<>'%' ){
}else if( $value=="" && ($_Form[$nf][8]=='' || $_Form[$nf][8]=='%') ){
echo '<TR><TD></TD><TD>&nbsp;</TD></TR>';
}else if( $value<>"" ){
echo "<TR><TD>{$key}</TD><TD>{$value}</TD></TR>";
}
}
}else if( $_Form[$nf][3]=='SS' || $_Form[$nf][3]=='Ss' ){
}else{
if( substr_count($NomCampo,'{')>0 ){
$tmp = str_replace('{', ',', $NomCampo);
$tmp = str_replace('}', '', $tmp);
$tmp = explode(',', $tmp);
$Tabla = $tmp[1];
$Ordenacion = $tmp[3];
$NomCampo = $tmp[0];
$Campos = $tmp[2];
$tCampos = count($tmp);
for($i=3; $i<$tCampos; $i++) $Campos .= ','.$tmp[$i];
}else if( substr_count($NomCampo,':')>0 ){
list($NomCampo, $nNomCampo) = explode(':', $NomCampo);
$tCampos = 1;
$Tabla = substr( strchr($nNomCampo, '_'), 1);
if( substr($nNomCampo,0,3)=='cd_' ){
$Campos = $nNomCampo.', nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
}
}else{
$tCampos = 1;
$Tabla = substr( strchr($NomCampo,'_'), 1 );
if( substr($NomCampo,0,3) == 'cd_' ){
$Campos = $NomCampo.', nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
}
}
eMultitenancy($Tabla);
if( substr_count($Ordenacion, ' as ')==1 ){
list(,$Ordenacion) = explode(' as ', $Ordenacion);
}
$condicion = '';
for( $i=0; $i<count($_WHERESELECT); $i++){
if( $_WHERESELECT[$i][0] == $NomCampo ){
if( substr_count( $_WHERESELECT[$i][1], 'order by ' ) == 1 ){
list( $tmpW, $tmpO ) = explode('order by ',$_WHERESELECT[$i][1]);
$Ordenacion = $tmpO;
$_WHERESELECT[$i][1] = $tmpW;
}else if( substr($_WHERESELECT[$i][1],-4) == 'desc' ){
$Ordenacion .= ' desc';
$_WHERESELECT[$i][1] = substr($_WHERESELECT[$i][1],0,-4);
}
if( substr_count( $_WHERESELECT[$i][1], '{$' ) > 0 && substr_count( $_WHERESELECT[$i][1], '}' ) > 0 ){
$Ini = strpos($_WHERESELECT[$i][1],'{$'); $Fin = strpos($_WHERESELECT[$i][1],'}');
$var = substr( $_WHERESELECT[$i][1], $Ini, $Fin-$Ini+1 );
$_WHERESELECT[$i][1] = str_replace( $var, $GLOBALS[substr($var,2,-1)], $_WHERESELECT[$i][1] );
}else if( substr_count( $_WHERESELECT[$i][1], '$' ) > 0 ){
$var = trim(strstr( $_WHERESELECT[$i][1], '$' ));
if( substr($var,-1) == '"' || substr($var,-1) == "'" ) $var = substr( $var, 0, strlen($var)-1 );
$_WHERESELECT[$i][1] = str_replace( $var, $GLOBALS[str_replace('$','',$var)], $_WHERESELECT[$i][1] );
}
$condicion = $_WHERESELECT[$i][1];
break;
}
}
$ConBlanco = false;
if( $_ADDOPTION[$NomCampo]!="" ){
$tmp = explode(';', $_ADDOPTION[$NomCampo]);
for($i=0; $i<count($tmp); $i++){
if( !$ConBlanco ){
$ConBlanco = true;
if( !$_FILLOPTION[$NomCampo] ) echo '<TR><TD></TD><TD>&nbsp;</TD></TR>';
}
$tmp1 = explode(',', $tmp[$i]);
echo '<TR><TD>'.trim($tmp1[0]).'</TD><TD>'.trim($tmp1[1]).'</TD></TR>';
}
}
qSelect($Tabla, $Campos, $condicion, $Ordenacion);
while( $row=qRow() ){
if( !$ConBlanco ){
$ConBlanco = true;
if( !$_FILLOPTION[$NomCampo] ) echo '<TR><TD></TD><TD>&nbsp;</TD></TR>';
}
echo '<TR><TD>'.trim($row[0]).'</TD><TD>'.trim($row[1]);
for($i=2; $i<=$tCampos; $i++) echo $row[$i];
echo '</TD></TR>';
}
qFree();
}
echo '</TABLE>';
echo '</span>';
if( $_Form[$nf][3]=="SV" && $_EDITLIST[3]==2 ){
$txt = "";
foreach($_SelVirtual[$_Form[$nf][1]] as $key=>$value){
if( $txt!="" ) $txt .= ",";
$txt .= "'{$value}':'{$key}'";
}
eJS("var Sel_{$NomCampo}={".$txt."};");
}
}
}
echo '<SCRIPT type="text/javascript" name=eDes>';
if( count($_CHR)>0 ){
echo 'var _TDato=[];';
$DimTmp = array(''=>'', 'U'=>'+', 'L'=>'-');
for($n=0; $n<count($_CHR); $n++){
echo '_TDato["'.$_CHR[$n][0].'"] = Array("'.$DimTmp[$_CHR[$n][1]].'", "^['.$_CHR[$n][2].']", "");';
}
}
echo 'DGI("BROWSE").oncontextmenu = elEdit;';
if( $_EDITLIST[3]==-1 || $_EDITLISTCLICK || $Objeto=="Lml" ) echo 'DGI("BROWSE").onclick = elEdit;';
echo '</SCRIPT>';
?>
<span id="Sel_TrueFalse" class="SELECT" eKeyExe="SN" style="position:absolute; height:1px; margin:0px; display:none;">
<TABLE onclick="slCheckPutValue()" style="cursor:pointer; display:block;">
<col id=o><col>
<?PHP
echo '<TR><TD>S</TD><TD style="padding:5px"><i class="ICONINPUT DEFAULT">j</i></TD></TR>';
echo '<TR><TD></TD><TD style="padding:5px"><i class="ICONINPUT DEFAULT OFF">i</i></TD></TR>';
?>
</TABLE></span>
