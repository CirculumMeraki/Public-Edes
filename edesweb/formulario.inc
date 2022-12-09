<?PHP //[_PROTECCION_]		www.votonline.es
$_StyleTR = '';
$_AutoCompletForm = $_SESSION["AutoCompletForm"];
$_AutoComplet = $_SESSION["AutoComplet"];
function ExplodeOne($c, $txt){
if( strpos($txt, $c)===false ){
return array($txt);
}else{
return array(substr($txt,0,strpos($txt,$c)), substr($txt,strpos($txt,$c)+1));
}
}
function _DivideOption($txt){
$txt = trim($txt);
if( $txt[0]=='(' || $txt[0]==')' || $txt[0]=='[' || $txt[0]==']' ){
if( $txt[0]=='(' || $txt[0]==')' ){
$divide = (($txt[0]==')')?'(':')');
}else{
$divide = (($txt[0]==']')?'[':']');
}
$dim = ExplodeOne($divide, $txt);
$dim[0] = $dim[0].$divide;
$dim[1] = substr(trim($dim[1]),1);
}else{
$dim = ExplodeOne(',', $txt);
}
return array(trim($dim[0]), trim($dim[1]));
}
function GenControles($nHoja, &$_Form, $_TITLE, $Opcion, $_TCol, $Mandar, $ConEsquinas, $NumForm, $SolapaON, $FrmOculto=NULL, $NomHoja=NULL){
global $_RELATIONFIELDS, $_ASSIGN, $_ASSIGNFIELD, $_DimPaste, $_SELINFO, $_SHOWFIELDS, $_StyleTR, $_LOCATION, $_Sql, $_SqlPDOType;
global $_WIDTH, $_FORMWIDTHS, $_Objeto, $_gsObjeto, $_FIELDSET, $_FIELDSETON, $_SKIPTD, $_ADDCODE, $_EnLinea, $_EnColumna, $_DEBUG, $_TDSTYLE;
global $_NOEDIT, $_NOEDITFILLED, $_NOEDITFILLEDFIELD, $php_errormsg, $__Enter, $_SubModoAlta, $_DimChildrenData, $_CalcularAnchos, $_CalColumnaUno;
global $_NewNColumnas, $_FIELDSPAN, $_DefaultAlign, $_LanguageTables, $_TIPFORM, $_vF, $_RELATIONSUBLIST, $_DefaultSize, $_FILEMULTIPLE;
global $_UPLOADFILE, $_pField, $_SetTTR, $_LINK, $_SLGREENBAR, $_HIDDENFIELDS, $_DBRANGEADD, $_Mode, $_ADDOPTION, $_CARDSHOW, $_CARDNEW;
if( isset($_LINK) ){
global $_LINKFIELD;
$_LINKFIELD = array();
for($i=0; $i<count($_LINK); $i++){
$_LINK[$i] = str_replace(" ","",trim($_LINK[$i]));
$dim = explode(",", $_LINK[$i]);
for($n=0; $n<count($dim); $n++){
if( substr_count($dim[$n], "+")>0 ){
$dim2 = explode("+", $dim[$n]);
for($p=0; $p<count($dim2); $p++){
$_LINKFIELD[$dim2[$p]] = $_LINK[$i];
}
}else{
$_LINKFIELD[$dim[$n]] = $_LINK[$i];
}
}
}
}
if( $_DefaultAlign=='' ) $_DefaultAlign = 'LD';
$xOpcion = $Opcion;
if( $_LanguageTables!='' && $_LanguageTables[0]!=',' ) $_LanguageTables = ','.$_LanguageTables.',';
TrimRelationFields();
if( !isset($ConEsquinas) ) $ConEsquinas = true;
if( $Mandar ){
global $_Fila;
$Fila = $_Fila;
}else{
$Fila = array();
}
$_ValorDefault = array();
for($n=0; $n<count($_Form); $n++){
$AsignarValor = false;
$NomCampo = $_Form[$n][1];
$NomSql = '';
if( $_Form[$n][0]=='-' || strtoupper($_Form[$n][0])=='{TAB}' ){
}else if( strtoupper(substr($_Form[$n][0],0,10))=='{ISUBLIST}' ){
$_Form[$n][10] = $nHoja;
}else if( substr_count($NomCampo, ':')>0 ){
list( $NomCampo, $NomSql ) = explode( ':', str_replace(' ','',$NomCampo) );
$NomTabla = substr($NomSql,3);
if( strpos($_LanguageTables,",{$NomTabla},")===false ){
$_Form[$n][_SQL] = $NomTabla.',cd_'.$NomTabla.',nm_'.$NomTabla;
}else{
$_Form[$n][_SQL] = $NomTabla.',cd_'.$NomTabla.',nm_'.$NomTabla.'_'.$_SESSION['_LANGUAGE_'];
}
}else if( substr_count($NomCampo, '{')==1 ){
list( $NomCampo, $NomSql ) = explode( '{', $NomCampo );
$NomCampo = trim($NomCampo);
list( $NomSql ) = explode( '}', $NomSql );
if( strpos($_LanguageTables,",{$NomTabla},")===false ){
$_Form[$n][_SQL] = trim($NomSql);
}else{
$_Form[$n][_SQL] = trim($NomSql).'_'.$_SESSION['_LANGUAGE_'];
}
}else if( substr($NomCampo,0,3)=='cd_' ){
$NomTabla = substr($NomCampo,3);
if( strpos($_LanguageTables,",{$NomTabla},")===false ){
$_Form[$n][_SQL] = $NomTabla.',cd_'.$NomTabla.',nm_'.$NomTabla;
}else{
$_Form[$n][_SQL] = $NomTabla.',cd_'.$NomTabla.',nm_'.$NomTabla.'_'.$_SESSION['_LANGUAGE_'];
}
}
$NomCampo = trim($NomCampo);
if( $_Form[$n][0]=='{TAB}' ){
}else if( $_Form[$n][0][0]!='-' && substr_count($NomCampo, ' ')>1 ){
$NomCampo = str_replace('  ',' ',trim($NomCampo));
if( substr_count($NomCampo, ' as ')>1 ){
list($_Form[$n][_OFIELD], $CampoAlias) = explode(' as ', $NomCampo);
}else{
list($_Form[$n][_OFIELD], $CampoAlias) = explode(' ', $NomCampo);
}
$_Form[$n][_ALIAS] = $CampoAlias;
$NomCampo = $_Form[$n][_OFIELD];
}else{
$_Form[$n][_OFIELD] = $NomCampo;
$CampoAlias = $NomCampo;
}
$Valor = '';
if( $Mandar ){
$Valor = trim($Fila[$CampoAlias]);
if( $Valor!='' ){
if($_Form[$n][2]=='CDI' && isZero($Valor) ) $Valor = '';
}
if( $_ASSIGN && $_Form[$n][7]!='' && isZero($Valor) ){
$Valor = $_Form[$n][7];
$AsignarValor = true;
}
if( $_ASSIGNFIELD[$_Form[$n][_OFIELD]] ){
$Valor = $_Form[$n][7];
$AsignarValor = true;
}
}else{
if( ( (substr_count('abcmsq', $Opcion)>0 || ($_gsObjeto=='F' && $Opcion=='l') ) && $_Form[$n][7]!='' ) || $_ASSIGN ){
$Valor = $_Form[$n][7];
$AsignarValor = true;
}
}
$_Form[$n][_VALUE] = (($_Form[$n][_CONSTANTE]=='') ? $Valor : $_Form[$n][_CONSTANTE]);
if( $Opcion=='mR' && $_SubModoAlta[$_Form[$n][_OFIELD]]===true ) $Opcion = 'a';
if( $Opcion=='a' ) $_vF[$_Form[$n][1]] = $_Form[$n][_VALUE];
if( substr_count('abcmsqcRmRbR',$Opcion)>0 ) $_ValorDefault[$_Form[$n][1]] = $Valor;
$_Form[$n][_STATUS] = 'E';
if( substr_count('bcmsq',$Opcion)>0 || ($_gsObjeto=='F' && $Opcion=='l') ){
if( substr_count($_Form[$n][6],'Q')>0 ){
if(      substr_count($_Form[$n][6],'*Q')>0 ) $_Form[$n][_STATUS] = 'I';
else if( substr_count($_Form[$n][6],'-Q')>0 ) $_Form[$n][_STATUS] = 'V';
else if( $_NOEDIT[$_Form[$n][_OFIELD]]!='' ) $_Form[$n][_STATUS] = 'V';
}
}else{
if(      substr_count( $_Form[$n][6], '*Q*' )>0 ) $_Form[$n][_STATUS] = 'I';
else if( substr_count( $_Form[$n][6], '-Q-' )>0 ) $_Form[$n][_STATUS] = 'V';
else if( substr_count( $_Form[$n][6],  'Q*' )>0 ) $_Form[$n][_STATUS] = 'I';
else if( substr_count( $_Form[$n][6],  'Q-' )>0 ) $_Form[$n][_STATUS] = 'V';
else if( substr_count( $_Form[$n][6], '*Q' )>0 ) $_Form[$n][_STATUS] = $_Form[$n][_STATUS];
else if( substr_count( $_Form[$n][6], '-Q' )>0 ) $_Form[$n][_STATUS] = $_Form[$n][_STATUS];
else if( substr_count( $_Form[$n][6], '*'  )>0 ) $_Form[$n][_STATUS] = 'I';
else if( substr_count( $_Form[$n][6], '-'  )>0 ) $_Form[$n][_STATUS] = 'V';
if( $_Form[$n][_STATUS]!='I' ){
if( $Opcion!='a' && substr_count( $_Form[$n][6], 'A' )>0 ) $_Form[$n][_STATUS] = 'V';
else if( $_NOEDIT[$_Form[$n][_OFIELD]]!='' ) $_Form[$n][_STATUS] = 'V';
}
}
if( $_Form[$n][_STATUS]!='I' ){
if( substr_count(',cR,bR,',",{$Opcion},")>0 ) $_Form[$n][_STATUS] = 'V';
else if( $_NOEDITFILLED && $Valor!='' ) $_Form[$n][_STATUS] = 'V';
else if( $_NOEDITFILLEDFIELD[$_Form[$n][_OFIELD]] && $Valor!='' ) $_Form[$n][_STATUS] = 'V';
}else{
if( $_Form[$n][_CONTROL][0]=='S' ){
$_Form[$n][_CONTROL] = 'T';
$_Form[$n][_FIELD] = NombreCampo($_Form[$n][_FIELD]);
}
}
if( isset($_GET['_IMPORT']) && $_Form[$n][_STATUS]=='E' ) $_Form[$n][_STATUS] = 'V';
if( !$AsignarValor && substr_count(',cR,bR,mR,', ",{$Opcion},")>0 && $_Form[$n][7]<>'' ){
$_Form[$n][7] = '';
}
}
$Opcion = $xOpcion;
if( $FrmOculto ){
for( $lin=0; $lin<count($_Form); $lin++ ){
GenControl($_Form[$lin], $_Form[$lin][_VALUE], $Opcion, $NumForm, $Fila, $_Form, $lin, -2);
echo $__Enter;
}
return '#';
}
$linea = -1;
$UltCol = 0;
$Visible = array();
for($nf=0; $nf<count($_Form); $nf++){
for($c=0; $c<$_TCol; $c++){
$Regilla[$nf][$c] = '';
$ColSpan[$nf][$c] = -1;
}
}
for($nf=0; $nf<count($_Form); $nf++){
if( $_Form[$nf][0][0]==',' && substr_count('123456789', substr($_Form[$nf][0],1,1))>0 ){
$_Form[$nf][0] = '+'.substr($_Form[$nf][0],1);
}
if( $_Form[$nf][0][0]=='+' ){
$_Form[$nf][0] = trim(substr( $_Form[$nf][0], 1 ));
$_Form[$nf][0] .= ' ';
list( $tmp ) = explode( ' ', $_Form[$nf][0] );
if( $Regilla[$linea][ $tmp-1 ]!='' ){
$Regilla[$linea][ $tmp-1 ] = $Regilla[$linea][ $tmp-1 ] .' + '. $nf;
}else{
$Regilla[$linea][ $tmp-1 ] = $nf;
}
$UltCol = $tmp-1;
$_Form[$nf][0] = trim(substr( $_Form[$nf][0], strpos( $_Form[$nf][0],' ' ) ));
}elseif( $_Form[$nf][0][0]==',' ){
$Regilla[$linea][$UltCol] = $Regilla[$linea][$UltCol] .' + '. $nf;
$_Form[$nf][0] = trim(substr( $_Form[$nf][0], 1 ));
}elseif( $_Form[$nf][0][0]=='-' || $_Form[$nf][0]=='{TAB}' || $_Form[$nf][0][0]=='>' ){
$linea++;
$Regilla[$linea][0] = $nf;
$UltCol = 0;
}elseif( $_Form[$nf][0]!='' && substr_count( '123456789', $_Form[$nf][0][0] )>0 ){
$linea++;
if( substr_count( $_Form[$nf][0], ' ' )==0 ) $_Form[$nf][0] .= ' ';
list( $tmp ) = explode( ' ', $_Form[$nf][0] );
for( $z=0; $z<$tmp; $z++ ) $Regilla[$linea][$z] = '>';
$Regilla[$linea][ $tmp-1 ] = $nf;
$UltCol = $tmp-1;
$_Form[$nf][0] = trim(substr( $_Form[$nf][0], strpos( $_Form[$nf][0],' ' ) ));
}else{
$linea++;
$Regilla[$linea][0] = $nf;
$UltCol = 0;
}
$Visible[$linea] += ( $_Form[$nf][_STATUS]!='I' ) ? 1:0;
}
for( $nf=0; $nf<count($_Form); $nf++ ){
$s = 0;
for( $c=0; $c < $_TCol; $c++ ){
if( empty( $Regilla[$nf][$c] ) ){
$cc = 0;
for( $s=$c; $s < $_TCol; $s++ ){
if( strlen($Regilla[$nf][$s])==0 ){
$cc++;
$Regilla[$nf][$s] = '#';
}else{
break;
}
}
if( $c==0 ){
if( $cc!=1 ) $ColSpan[$nf][$c] = $cc;
}else{
$ColSpan[$nf][$c-1] = $cc+1;
}
}
}
}
for($nf=0; $nf<count($_Form); $nf++){
for($c=0; $c<$_TCol; $c++){
if( $ColSpan[$nf][$c]==-1 ) $ColSpan[$nf][$c] = 0;
}
}
foreach($_SHOWFIELDS as $k=>$v){
$DimField = explode(',', $k);
for($i=0; $i<count($DimField); $i++){
$k2 = trim($DimField[$i]);
if( substr_count('0123456789',$k2[0])==0 ){
for( $p=0; $p<count($_Form); $p++ ){
if( $_Form[$p][1]==$k2 ){
$_Form[$p][_VALUE] = '';
break;
}
}
}
}
if( substr(strtoupper($v),0,7)=='SELECT ' ){
while( substr_count($v,'{$')>0 ){
$p = strpos( $v, '{$' );
$tmp = substr($v,$p,strpos($v, '}')-$p+1);
$c = substr($tmp,2,-1);
if( substr_count($c,'[') ){
list( $c1, $c2 ) = explode('[',$c);
list( $c2 ) = explode(']',$c2);
$c1 = str_replace("'",'',str_replace('"','',$c1));
$c2 = str_replace("'",'',str_replace('"','',$c2));
$valor = $GLOBALS[$c1][$c2];
}else{
$c = str_replace("'",'',str_replace('"','',$c));
$valor = $GLOBALS[$c];
}
if( $valor[0]==chr(92) ){
$valor = substr($valor,2,-2);
}else if( $valor[0]=='"' || $valor[0]=="'" ){
if( $valor[0]==substr($valor,-1) ) $valor = substr($valor,1,-1);
}
$v = str_replace($tmp,$valor,$v);
}
qQuery($v);
$row = qArray();
$dTmp = str_replace(' ','',$k);
$dTmp = explode(',',$dTmp);
$v = trim(substr($v,6));
list( $v ) = explode(' from ',$v);
$oTmp = str_replace(' ','',$v);
$oTmp = explode(',',$oTmp);
for( $p=0; $p<count($oTmp); $p++ ){
if( substr($oTmp[$p],1,1)=='.' ) $oTmp[$p] = substr($oTmp[$p],2);
$oTmp[$oTmp[$p]] = $dTmp[$p];
}
foreach( $row as $k2=>$v2 ){
$k2 = trim($k2);
if( substr_count('0123456789',$k2[0])==0 ){
$v2 = trim($v2);
for( $p=0; $p<count($_Form); $p++ ){
$sCampo = NombreCampo($_Form[$p][1]);
if( $sCampo==$k2 ){
if( isZero($v2) ) $v2 = '';
$_Form[$p][_VALUE] .= $v2;
$Fila[$sCampo] = $_Form[$p][_VALUE];
$_vF[$sCampo] = $_Form[$p][_VALUE];
break;
}else if( $sCampo==$oTmp[$k2] ){
if( isZero($v2) ) $v2 = '';
$_Form[$p][_VALUE] .= $v2;
$Fila[$sCampo] = $_Form[$p][_VALUE];
$_vF[$sCampo] = $_Form[$p][_VALUE];
break;
}
}
}
}
continue;
}
$tmp = str_replace( '{', ',', $v );
$tmp = str_replace( '}', '', $tmp );
if( substr_count($tmp,'"')+substr_count($tmp,"'")==0 ){
$tmp = explode( ',', $tmp );
}else{
$Campos = trim($tmp);
$tmp = array();
$NomTmp = '';
$Mem = false;
for( $i=0; $i<strlen($Campos); $i++ ){
$c = substr($Campos,$i,1);
if( ($c==' ' || $c=="\t") && !$Mem ) continue;
if( $c=='"' || $c=="'" ) $Mem = !$Mem;
if( $c==',' && !$Mem ){
$tmp[] = $NomTmp;
$NomTmp = '';
}else{
$NomTmp .= $c;
}
}
$tmp[] = $NomTmp;
}
$tmp[0] = trim($tmp[0]);
$tmp[2] = trim($tmp[2]);
$Tabla = trim($tmp[1]);
$sCampos = array();
$PosCampo = array();
$al = -1;
$Campos = '';
for($i=3; $i<count($tmp); $i++){
$tmp[$i] = trim($tmp[$i]);
if( $tmp[$i][0]!='"' && $tmp[$i][0]!="'" ){
if( $Campos!='' ) $Campos .= ',';
$Campos .= $tmp[$i];
if( $tmp[$i-1][0]!='"' && $tmp[$i-1][0]!="'" ) $al++;
}
$sCampos[] = $tmp[$i];
$PosCampo[] = $al;
}
$sValor = '';
$tmp[0] = trim($tmp[0]);
if( substr_count($tmp[0], '+')==0 ){
if( $Opcion=='a' ){
for($nf=0; $nf<count($_Form); $nf++){
if( $_Form[$nf][1]==$tmp[0] ){
$sValor .= trim($_Form[$nf][7]);
if( eSqlType('oracle') ){
$Condicion = $tmp[2]."='".str_replace("'","''",trim($_Form[$nf][7]))."'";
}else{
$Condicion = $tmp[2].'="'.trim($_Form[$nf][7]).'"';
}
break;
}
}
}else if( substr_count('bcmsql',$Opcion)>0 ){
$sValor .= trim($_ValorDefault[ $tmp[0] ]);
if( eSqlType('oracle') ){
$Condicion = $tmp[2]."='".str_replace("'","''",trim($_ValorDefault[ $tmp[0] ]))."'";
}else{
$Condicion = $tmp[2].'="'.trim($_ValorDefault[ $tmp[0] ]).'"';
}
}else{
$sValor .= trim($Fila[ $tmp[0] ]);
if( eSqlType('oracle') ){
$Condicion = $tmp[2]."='".str_replace("'","''",trim($Fila[ $tmp[0] ]))."'";
}else{
$Condicion = $tmp[2].'="'.trim($Fila[ $tmp[0] ]).'"';
}
}
}else{
$Condicion = '';
$tmp0 = explode('+', $tmp[0]);
$tmp2 = explode('+', $tmp[2]);
for($n=0; $n<=substr_count( $tmp[0], '+' ); $n++){
if( !empty($Condicion) ) $Condicion .= ' and ';
if( $Opcion=='a' ){
for($nf=0; $nf<count($_Form); $nf++){
if( $_Form[$nf][1]==$tmp[0] ){
$sValor .= trim($_Form[$nf][7]);
if( eSqlType('oracle') ){
$Condicion .= trim($tmp2[$n])."='".str_replace("'","''",trim($_Form[$nf][7]))."'";
}else{
$Condicion .= trim($tmp2[$n]).'="'.trim($_Form[$nf][7]).'"';
}
break;
}
}
}else if( substr_count('bcmsql',$Opcion)>0 ){
$sValor .= trim($_ValorDefault[ trim($tmp0[$n]) ]);
if( eSqlType('oracle') ){
$Condicion .= trim($tmp2[$n])."='".str_replace("'","''",trim($_ValorDefault[ trim($tmp0[$n]) ]))."'";
}else{
$Condicion .= trim($tmp2[$n]).'="'.trim($_ValorDefault[ trim($tmp0[$n]) ]).'"';
}
}else{
$sValor .= trim($Fila[ trim($tmp0[$n]) ]);
if( eSqlType('oracle') ){
$Condicion .= trim($tmp2[$n])."='".str_replace("'","''",trim($Fila[ trim($tmp0[$n]) ]))."'";
}else{
$Condicion .= trim($tmp2[$n]).'="'.trim($Fila[ trim($tmp0[$n]) ]).'"';
}
}
}
}
if( $sValor!='' ){
if( qCount($Tabla, $Condicion)>0 ){
$DimField = explode(',', $k);
for($i=0; $i<count($DimField); $i++) $DimField[$i] = trim($DimField[$i]);
qSelect($Tabla, $Campos, $Condicion);
$row = qArray();
for( $i=0; $i<count($sCampos); $i++ ){
if( $sCampos[$i][0]=='"' || $sCampos[$i][0]=="'" ){
for( $p=0; $p<count($_Form); $p++ ){
if( $_Form[$p][1]==$DimField[$PosCampo[$i]] ){
if( isZero($row[$sCampos[$i]]) ) $sCampos[$i] = '';
$_Form[$p][_VALUE] .= substr($sCampos[$i],1,-1);
$Fila[$_Form[$p][1]] = $_Form[$p][_VALUE];
$_vF[$_Form[$p][1]] = $_Form[$p][_VALUE];
break;
}
}
}else{
for( $p=0; $p<count($_Form); $p++ ){
$sCampo = NombreCampo($_Form[$p][1]);
if( $sCampo==$DimField[$PosCampo[$i]] ){
if( substr_count( $sCampos[$i], ' as ' )==1 ) list(,$sCampos[$i]) = explode(' as ',$sCampos[$i]);
if( isZero($row[$sCampos[$i]]) ) $row[$sCampos[$i]] = '';
$_Form[$p][_VALUE] .= trim($row[$sCampos[$i]]);
$Fila[$sCampo] = $_Form[$p][_VALUE];
$_vF[$sCampo] = $_Form[$p][_VALUE];
break;
}
}
}
}
}
qFree();
}
}
if( $nHoja==0 ) $nHoja = 1;
for($c=0; $c<count($_FORMWIDTHS); $c++){
if( $_FORMWIDTHS[$c]<>"" && !(substr_count($_FORMWIDTHS[$c],'%')>0 || substr_count(strtolower($_FORMWIDTHS[$c]),'px')>0) ){
$_FORMWIDTHS[$c] .= 'px';
}
if( $_FORMWIDTHS[$c]<>"" ){
$_FORMWIDTHS[$c] = 'width:'.$_FORMWIDTHS[$c];
if( substr($_FORMWIDTHS[$c],-1)<>";" ) $_FORMWIDTHS[$c] .= ";";
}
}
if( $_CARDSHOW ){
}else if( !$_SESSION["_BYPHONE"] ){
if( count($_FORMWIDTHS)>0 ){
echo '<style>';
for($n=0; $n<count($_FORMWIDTHS); $n++) if( $_FORMWIDTHS[$n]!="" ){
$i = $n+1;
echo "#{$NomHoja}>tbody>tr>td:nth-child({$i}){";
echo $_FORMWIDTHS[$n];
echo "}";
}
echo '</style>';
}
echo  $__Enter."<TR style='font-size:1px;height:1px;display:table-row;'>";
if( count($_FORMWIDTHS)>0 ){
$TotalCol = ($_TCol*3-1);
for($c=0; $c<$TotalCol; $c++){
echo '<TD style="font-size:1px;height:1px;'.$_FORMWIDTHS[$c].'">';
if( $_FORMWIDTHS[$c]<>"" ){
echo '<img pk=5 style="background:transparent;height:1px;'.$_FORMWIDTHS[$c].'zoom:1;">';
}else{
echo '<img pk=8 style="background:transparent;height:1px;width:1px;zoom:1;">';
}
echo '</TD>';
}
}else{
$TotalCol = ($_TCol*3-1);
echo '<TD style="font-size:1px;height:1px;width:1px">';
echo '<img pk=6 style="background:transparent;width:1px;height:1px;zoom:1;">';
echo '</TD>';
echo '<TD style="font-size:1px;height:1px;width:1px;" colspan='.($_TCol*3-2).'>';
echo '<img pk=7 style="background:transparent;width:1px;height:1px;zoom:1;">';
echo '</td>';
}
}
if( isset($_FILEMULTIPLE) && isset($_UPLOADFILE[$_FILEMULTIPLE[0]]) ){
$size = $_pField[$_FILEMULTIPLE[0]][4];
$file = $_UPLOADFILE[$_FILEMULTIPLE[0]];
?>
<form id="_FORMMULTIFILE"<?=$_AutoCompletForm?> name="_FORMMULTIFILE" method="POST">
<label for="_MULTIFILE" id="LD" style="margin-left:0px;"><?=$_pField[$_FILEMULTIPLE[0]][0]?></label>
<span class="FILEGROUP">
<input name="_MULTIFILE" type="text" class="READONLY" readonly="true" value="" newvalue="" oldvalue="" eupload="0" efilename="" pFile="<?=$_FILEMULTIPLE[0]?>" size="<?=$size?>" maxlength="<?=$size?>" onfocus="document.body.focus()" eext="<?=$file["EXT"]?>" ebyts="<?=$file["BYTS"]?>" eprefix="" onclick="S(':_MULTIFILE').file()" style="margin-left:3px;cursor:pointer;" title="<?=$file["TITLE"]?>"<?=$_AutoComplet?>>
<i class="ICONINPUT" oi="1" onclick="S(':_MULTIFILE').file()" title="<?=$file["TITLE"]?>" style="color:red">w</i>
<input name="_FILE__MULTIFILE" type="file" multiple="true" eStatus="E" nFile=0 pFile="<?=$_FILEMULTIPLE[0]?>" eCopy="<?=str_replace(" ","",$_FILEMULTIPLE[1])?>"<?=$_AutoComplet?>>
</span>
<span class="OneOfN" style="visibility:hidden;margin-left:2px;">
<span>1</span> de <span>00</span>
</span>
</form>
<script type="text/javascript">
setTimeout(function(){
S("LABEL[for=_MULTIFILE]").css({width: S("#TABNumber1").obj.rows[0].cells[0].offsetWidth});
eHide("<?=$_FILEMULTIPLE[0]?>","TR");
S(":<?=$_FILEMULTIPLE[0]?>").attr("eMultifile","1");
}, 1);
</script>
<?PHP
unset($_FILEMULTIPLE, $file, $size);
}
$Valor = $cadena = '';
$Saltar = false;
$Campo1 = "#";
$_StyleTR = '';
$_EnColumnaON = false;
$_EnLineaON = false;
if( preg_match('/^(c|m|b)$/', $_Mode) ){
for($n=0; $n<count($_Form); $n++){
if( $_Form[$n][11]=="I" ){
$nom = _QueNmField($_Form[$n], $n);
if( $nom[0]<>"_" && $_DBRANGEADD[$nom]=="" ) $_HIDDENFIELDS[] = $nom;
}
}
}
for($nf=0; $nf<=$linea; $nf++){
if( $_CARDSHOW && $_CARDNEW[$lin] ){
echo '</DIV>';
echo "<DIV class='card'".eCardWidth().">";
}
$TROculto = false;
$tmp = explode('+', $Regilla[$nf][0]);
$lin = $tmp[0]*1;
if( !$_CARDSHOW ){
if( $_NewNColumnas[$_Form[$lin][12]]['I'] ){
$_sTCol = $_TCol;
list($ncTCol, $ncPropiedad, $ncTitle, $ncStyle) = explode('|', $_NewNColumnas[$_Form[$lin][12]]['NC']);
if( !$_SESSION["_BYPHONE"] ){
echo '<tr NewColumns=1';
if( $Visible[$nf]>0 ) echo (($_Form[$lin][17]=='')? '' : ' STShow=1 SubTab='.$_Form[$lin][17]);
echo '><td colspan='.($_TCol*3-1);
if( substr_count(strtoupper($ncPropiedad), 'CENTER')==1 ) echo ' align=center';
$ncBorder = (substr_count(strtoupper($ncPropiedad), 'BORDER')==1 || $ncTitle!='' || $ncStyle!='');
echo '>';
}
if( $ncBorder!='' ){
echo '<FIELDSET class="CAJA" style="display:inline;';
echo (substr_count($ncPropiedad, '100%')==1) ? 'width:100%;':'width:1px;';
$mas = "";
$ncStyle = " ".trim($ncStyle);
$pos = strpos($ncStyle, " style=");
if( $pos===false ){
$ma = $ncStyle;
}else{
$fin = strpos($ncStyle, substr($ncStyle,$pos+7,1), $pos+7+1);
$newStyle = substr($ncStyle, $pos+8, $fin-$pos+1-9);
$newOtros = substr($ncStyle, 0, $pos).substr($ncStyle, $fin+1);
echo $newStyle;
$ma = $newOtros;
}
echo '"';
if( $ma!="" && $ma[0]!=" " ) $ma = " ".$ma;
echo $ma;
echo '>';
$ncPropiedad = trim($ncPropiedad);
if( $ncTitle!='' ) echo "<LEGEND align='{$ncPropiedad}'>{$ncTitle}</LEGEND>";
}
if( !$_SESSION["_BYPHONE"] ){
echo '<TABLE class="Columns" cellspacing=0px cellpadding=0px width=100% style="border-collapse:collapse;" border='.(($GLOBALS['_DEBUG']==3)? '1px>':'0px>');
}
$_TCol = $_NewNColumnas[$_Form[$lin][12]]['NC'];
}
if( $Visible[$nf]>0 ){
$SubTab = (($_Form[$lin][17]=='') ? '' : ' STShow=1 SubTab='.$_Form[$lin][17]);
if( $_Form[$lin][0]=='-' && $_Form[$lin][1]!='#' ){
if( '?-'==$_Form[$lin][3] ){
echo "<tr style='display:none' id='{$_Form[$lin][5]}' sT ttr='-' a=7>";
$_StyleTR = ' style="display:none;"';
}else if( '?+'==$_Form[$lin][3] ){
echo "<tr id='{$_Form[$lin][5]}' sT ttr='-' a=6>";
}else if( '?'==$_Form[$lin][3] ){
echo "<tr id='{$_Form[$lin][5]}' sT ttr='-' a=5>";
}else if( '*'==$_Form[$lin][3] ){
echo "<tr style='display:none' id='{$_Form[$lin][5]}' sT ttr='-' a=4>";
}else{
echo "<tr sT{$SubTab} ttr='-' a=3>";
}
}else if( $_Form[$lin][0]=='{TAB}' ){
}else{
echo "<tr id=']'{$_StyleTR}{$SubTab}";
if( $_SetTTR[$_Form[$lin][1]] ) echo " ttr='-'";
echo " a=2>";
}
}else{
echo "<tr id='o'{$SubTab} a=1>";
$TROculto = true;
}
}
for($c=0; $c<$_TCol; $c++){
if( !$_CARDSHOW && $Regilla[$nf][$c]==='>' ){
if( $c>0 && $Regilla[$nf][$c-1]=='>' ) echo '<td id=s>';
echo '<td><td>';
continue;
}
if( $Regilla[$nf][$c]==='#' ) continue;
$NumCol = $c;
$tmp = explode('+', $Regilla[$nf][$c]);
if( $Regilla[$nf][$c]=='' && $Regilla[$nf][$c]!='0' ) continue;
for($s=0; $s<count($tmp); $s++) $tmp[$s] = $tmp[$s]*1;
$lin = $tmp[0];
if( !$_CARDSHOW && $c>0 ) echo '<td id=s>';
$RowSpan = '';
$NomFile = $_Form[$lin][_OFIELD];
if( $_Form[$lin][_MODE]=='*' ) $_Form[$lin][_LABEL] = '';
$ConObjeto = false;
if( count($_Objeto[$NomFile])>0 && substr_count('m,c,b', $Opcion)==0 ){
$MasCamposEnLinea = $tmp;
if( $_Objeto[$NomFile]['SLTIPICON']!='' ){
$tmp = explode(';', $_Objeto[$NomFile]['SLTIPICON']);
for($i=0; $i<count($tmp); $i++){
$tmp2 = explode(',', $tmp[$i]);
$sTxtC = $NomFile;
$sTxtE = trim($tmp2[0]);
$_Objeto[$sTxtC]['TITLE_'.$sTxtE] = trim($tmp2[1]);
}
}
$_Objeto[$NomFile]['HOJA'] = $nHoja;
$LisColSpan = 1;
if( $_Form[$lin][0]=='' ){
$LisColSpan = 0;
}else{
echo "<td{$RowSpan}>".$_Form[$lin][0];
$_CalColumnaUno[$nHoja] = 1;
}
echo '<td eSubListBox=1';
echo ' colspan='.($_TCol*3-1-$LisColSpan);
echo ' style="text-align:center">';
if( $_ADDCODE[$NomFile]['S']!='' ) echo $_ADDCODE[$NomFile]['S'];
$RowSpan = '';
list(,,,,$addWhere) = explode('|', $_Objeto[$NomFile]['sSLSQL'] );
list($sSql) = explode('|', $_Objeto[$NomFile]['SLSQL']);
$sSql = str_replace('&#124;', '|', $sSql);
while( substr_count($sSql, '{')>0 ){
$ini = strpos($sSql,'{')+1;
$fin = strpos($sSql,'}');
$sCampo = trim(substr($sSql, $ini, $fin-$ini));
$NewCampo = $sCampo;
if( $NewCampo[0]=='$' ) $NewCampo = substr($sCampo,1);
if( $NewCampo[0]!='_' ){
$sSql = str_replace('{'.$sCampo.'}', $Fila[$NewCampo], $sSql);
}else{
$sSql = str_replace('{'.$sCampo.'}', $GLOBALS[$NewCampo], $sSql);
}
}
$CoordXY = ',';
if( $Opcion=='a' ){
list(,,,,$tmp,,$CoordXY) = explode('|', $_Objeto[$NomFile]['SLMENU']);
$xSql = strtolower($sSql);
list($lstCampos, $tmp2) = explode(' from ', $xSql);
if( strtoupper(trim($tmp))=='' ){
list($tmp) = explode(' where ', trim($tmp2));
list($tmp) = explode(' ', $tmp);
}
$tCol = substr_count($lstCampos, ',')+1;
}else{
if( eSqlType('mysql,mysqli') && substr_count($_Objeto[$NomFile]['SLTYPEDATA'], 'F4')>0 ){
$xTypeData = explode(',', $_Objeto[$NomFile]['SLTYPEDATA']);
$OldsSql = $sSql;
list($tmp, $sSql) = explode(' from ', $sSql);
list(,$tmp) = explode('select ', $tmp);
$xCampo = explode(',', $tmp);
$nSql = 'select ';
for($i=0; $i<count($xCampo); $i++){
$nSql .= $xCampo[$i].',';
}
$sSql = substr($nSql,0,-1).' from '.$sSql;
$sSql = str_replace('&#44;',',',$sSql);
qQuery($sSql);
$sSql = $OldsSql;
}else{
$sSql = str_replace('&#44;',',',$sSql);
qQuery($sSql);
}
$tCol = sql_TotalCampos();
if( $tCol==0 ){
$tCol = count(sql_DimFields($sSql));
}
}
if( $_FIELDSET[$NomFile]['I'] ){
$_FIELDSETON = true;
if( $_CARDSHOW ){
echo "<DIV class='card-inside'>";
}else{
echo '<FIELDSET class="CAJA" style="display:inline;'.$_FIELDSET[$NomFile]['S'].'">';
if( $_FIELDSET[$NomFile]['T']!='' ) echo "<LEGEND ALIGN='left'>{$_FIELDSET[$NomFile][T]}</LEGEND>";
}
}
if( $_ADDCODE[$NomFile]['B']!='' ){
if( substr($_ADDCODE[$NomFile]['B'],-1)==')' && strpos($_ADDCODE[$NomFile]['B'], '(')>0 ){
echo _ExeEval($_ADDCODE[$NomFile]['B'], '[AddCode] '.$Opcion.' | '.$NomFile.' | B |'.$_ADDCODE[$NomFile]['B']);
}else{
echo $_ADDCODE[$NomFile]['B'];
}
}
if( $_Objeto[$NomFile]['SLTITLE']!='' ){
echo '<tr sT'.(($_Form[$lin][17]=='') ? '' : ' STShow=1 SubTab='.$_Form[$lin][17]).' ttr="-">';
SubTitulo($_TCol*3-1, $_Objeto[$NomFile]['SLTITLE'], array('','','','','','','','','','','','','','',''), $NumForm);
}
if( $_Objeto[$NomFile]['SLCOLSWIDTH']!='' ){
$xColWidth = explode(',', $_Objeto[$NomFile]['SLCOLSWIDTH']);
for($n=0; $n<count($xColWidth); $n++){
$xColWidth[$n] = str_replace(chr(92), "/", $xColWidth[$n]);
if( substr_count($xColWidth[$n], "/")>0 ){
if( substr_count(',a,mR,', ",{$Opcion},")>0 ){
list($xColWidth[$n]) = explode("/", $xColWidth[$n]);
}else{
list(,$xColWidth[$n]) = explode("/", $xColWidth[$n]);
}
}
$xColWidth[$n] = trim($xColWidth[$n]);
}
}
if( $_Objeto[$NomFile]['SLALIGN']!='' ){
$xAlign = explode(',', $_Objeto[$NomFile]['SLALIGN']);
for($n=0; $n<count($xAlign); $n++) $xAlign[$n] = trim($xAlign[$n]);
}
$len = strlen($_Objeto[$NomFile]['ALIAS']);
$coef = $_DefaultSize['IC']['U'] / $_DefaultSize['TC']['U'];
$_Objeto[$NomFile]['FORM'] = array();
$xTypeControl = array();
if( $_Objeto[$NomFile]['FORMSTATIC']==1 ){
$file = explode("|", $_Objeto[$NomFile]["SLMENU"])[2];
$tmpForm = _FormStaticFields(eScript($file), $Opcion);
list($campo) = explode(" from ", substr($_Objeto[$NomFile]["SLSQL"], 6));
$campo = explode(",", $campo);
for($n=0; $n<count($campo); $n++){
$campo[$n] = trim($campo[$n]);
if( $campo[$n][0]!="'" && $campo[$n][0]!='"' && $xAlign[$n]!="H" ){
if( !($_Objeto[$NomFile]['ALIAS']=="" && substr_count($campo[$n], ".")==0) ){
$campo[$n] = substr($campo[$n], $len);
}
$cmpList = $campo[$n];
$cmpTab = $tmpForm["FORMSTATIC"][$cmpList];
if( $cmpTab=="" ) $cmpTab = $cmpList;
$_Objeto[$NomFile]['FORM'][$cmpList] = array($tmpForm[$cmpTab][2], $tmpForm[$cmpTab][4]);
$_Objeto[$NomFile]["FIELD"][$n] = $cmpTab;
$tmp = $tmpForm[$cmpTab][3];
$xTypeControl[$n] = $tmp;
if( $tmp[0]=="S" && $cmpTab[0]!="*" ){
list($i, $d) = explode(",", $tmpForm[$cmpTab][4]);
if( $d!="" ){
$tmp = eGetWidth("I", $tmpForm[$cmpTab][2], "T", $i, "");
if( $xColWidth[$n]=="" ){
if( substr_count($tmp[0], ",")==1 ) list($tmp[0]) = explode(",", $tmp[0]);
$xColWidth[$n] = $tmp[0]*$coef;
}
if( $xAlign[$n]=="" ) $xAlign[$n] = $tmp[2];
}else{
$_Objeto[$NomFile]['FORM'][$cmpTab][1] = 4;
}
$tmpTypeData[$n] = "T";
continue;
}else if( $cmpTab[0]=="*" ){
$cmpTab = substr($cmpTab,1);
$tmp = eGetWidth("I", $tmpForm[$cmpTab][2], "S", $tmpForm[$cmpTab][4], $tmpForm[$cmpTab][5]);
}else{
$tmp = eGetWidth("I", $tmpForm[$cmpTab]);
}
$tmpTypeData[$n] = $tmpForm[$cmpTab][3];
if( $xColWidth[$n]=="" ){
if( substr_count($tmp[0], ",")==1 ) list(,$tmp[0]) = explode(",", $tmp[0]);
$xColWidth[$n] = $tmp[0]*$coef;
}
if( $xAlign[$n]=="" ) $xAlign[$n] = $tmp[2];
}
}
}else{
$campo = explode(",", explode("|", $_Objeto[$NomFile]["SLMENU"])[2]);
for($n=0; $n<count($campo); $n++){
$campo[$n] = trim($campo[$n]);
if( $campo[$n][0]!="'" && $campo[$n][0]!='"' && $xAlign[$n]!="H" ){
if( !($_Objeto[$NomFile]['ALIAS']=="" && substr_count($campo[$n], ".")==0) ){
$campo[$n] = substr($campo[$n], $len);
}
list($cmpList, $cmpTab) = explode("=", $campo[$n]);
if( $cmpTab=="" ) $cmpTab = $cmpList;
$_Objeto[$NomFile]['FORM'][$cmpTab] = array($_pField[$cmpTab][2], $_pField[$cmpTab][4]);
$_Objeto[$NomFile]["FIELD"][$n] = $cmpTab;
$tmp = $_pField[$cmpTab][3];
$xTypeControl[$n] = $tmp;
if( $tmp[0]=="S" && $cmpTab[0]!="*" ){
list($i, $d) = explode(",", $_pField[$cmpTab][4]);
if( $d!="" ){
$tmp = eGetWidth("I", $_pField[$cmpTab][2], "T", $i, "");
if( $xColWidth[$n]=="" ){
if( substr_count($tmp[0], ",")==1 ) list($tmp[0]) = explode(",", $tmp[0]);
$xColWidth[$n] = $tmp[0]*$coef;
}
if( $xAlign[$n]=="" ) $xAlign[$n] = $tmp[2];
}else{
$_Objeto[$NomFile]['FORM'][$cmpTab][1] = 4;
}
$tmpTypeData[$n] = "T";
continue;
}else if( $cmpTab[0]=="*" ){
$cmpTab = substr($cmpTab,1);
$px = $_pField[$cmpTab][5];
if( !is_numeric($_pField[$cmpTab][5]) ){
$px = $_pField[$_pField[$cmpTab][5]][5] ;
}
list($a,$b) = explode(",",$px);
if($b!="") $px = round($b);
$tmp = eGetWidth("I", $_pField[$cmpTab][2], "S", $_pField[$cmpTab][4], $px);
}else{
$tmp = eGetWidth("I", $_pField[$cmpTab]);
}
$tmpTypeData[$n] = $_pField[$cmpTab][3];
if( $xColWidth[$n]=="" ){
if( substr_count($tmp[0], ",")==1 ) list(,$tmp[0]) = explode(",", $tmp[0]);
$xColWidth[$n] = $tmp[0]*$coef;
}else if( substr_count(strtoupper($xColWidth[$n]), 'C')>0 ){
$xColWidth[$n] = str_replace("C", "", strtoupper($xColWidth[$n]))*$coef*$_DefaultSize['TC']['U'];
}
if( $xAlign[$n]=="" ) $xAlign[$n] = $tmp[2];
}
}
}
$cssBrowse = 'BROWSE';
$xTH = explode(',', $_Objeto[$NomFile]['SLTH']);
$tmpTypeData = explode(',', $_Objeto[$NomFile]['SLTYPEDATA']);
$nSubList = 0;
foreach($_Objeto as $k=>$v){
$nSubList++;
if( $k==$NomFile ) break;
}
echo '<style>';
$xDimAlign = array(""=>"l", "L"=>"l", "I"=>"l", "C"=>"c", "R"=>"r", "D"=>"r", "H"=>"n", "O"=>"n");
for($n=0; $n<count($xTH); $n++){
$cssBrowse .= " col_{$n}".$xDimAlign[strtoupper($xAlign[$n])];
if( preg_match("/^(\+|\+,|\-|\-,|F4|P4|CP|T|CDI|H8|H5|H2|CLR|clr|0|DC)$/", $tmpTypeData[$n]) ){
$cssBrowse .= " col_{$n}ff";
}
if( $xColWidth[$n]=='' ){
if( $_DefaultSize['IT'][$tmpTypeData[$n]]<>"" ){
$xColWidth[$n] = $_DefaultSize['IT'][$tmpTypeData[$n]];
}
}
if( $xColWidth[$n]!='' ){
$cssBrowse .= " sl{$nSubList}_{$n}";
echo $__Enter.".sl{$nSubList}_{$n} td:nth-child(".($n+1)."){";
$xColWidth[$n] = round($xColWidth[$n]);
echo "width:{$xColWidth[$n]}px;";
if( $xTypeControl[$n]=="A" || $xTypeControl[$n]=="H" ){
echo "white-space:pre;white-space:pre-wrap;white-space:pre-line;white-space:-pre-wrap;white-space:-o-pre-wrap;white-space:-moz-pre-wrap;white-space:-hp-pre-wrap;word-wrap:break-word;";
}
echo "}";
}
}
echo '</style>';
if( $_Objeto[$NomFile]['SLGREENBAR'] || $_SLGREENBAR ){
$cssBrowse .= " GREENBAR";
}
$ExeAltoNFilas = false;
$TRSubLista = 0;
$xTipTH = explode(',', $_Objeto[$NomFile]['SLTIPTH']);
for($n=0; $n<count($xTipTH); $n++){
if( $xTipTH[$n]!="" ){
$xTipTH[$n] = str_replace(
array('\\t', '\\n'),
array("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "<br>"),
trim($xTipTH[$n])
);
echo '<span id="_TIP_'.substr($NomFile,1,-1).'_'.$n.'" style="display:none;text-align:left">'.$xTipTH[$n].'</span>';
}
}
$tmp = explode(',', $_Objeto[$NomFile]['SLWIN']);
echo "<SPAN id='c{$NomFile}' class=ISubListBODY style='overflow-y:auto;float:left;padding:0px;display:table-cell;";
if( $tmp[1]!='' ){
if( strstr($tmp[1], 'px') ){
echo "height:{$tmp[1]};";
}else{
$ExeAltoNFilas = true;
$nAltoNFilas = $tmp[1];
$_Objeto[$NomFile]['TTR'] = $tmp[1];
$CalculaAlto = $tmp[1];
}
}
if( $tmp[0]>0 ){
if( substr_count($tmp[0],'px')==0 ) $tmp[0] .= 'px';
$_AnchoSubList = $tmp[0];
}else{
$_AnchoSubList = "";
}
echo "' NF='{$tmp[1]}'";
echo " eMaxRow='".(($tmp[2]>0)?$tmp[2]:"-1")."'";
if( $_Objeto[$NomFile]['SLCSS']!='' ){
echo ' '.$_Objeto[$NomFile]['SLCSS'];
}
$v = 0;
if( count($_Objeto[$NomFile]['SLTHCOLSPAN'])>0 ) $v++;
echo " onscroll='THScroll(\"{$NomFile}\",".$v.")'>";
global $_UPLOADFILE, $_SaveList;
foreach($_UPLOADFILE as $k=>$v){
$v = trim($v);
$CampoFile = $_UPLOADFILE[$k]['oDIR'];
foreach($_SaveList as $kk=>$vv){
$tmp = explode('|', $vv);
if( substr_count($tmp[5], $k)>0 ){
$tmp5 = explode(',', $tmp[5]);
for($n=0; $n<count($tmp5); $n++){
if( trim($tmp5[$n])==$k ){
$CampoFile = $_UPLOADFILE[$k]['oDIR'];
break 3;
}
}
}
}
}
list(,,$tmp3,,$tmp5) = explode('|',$_Objeto[$NomFile]['SLMENU']);
if( strtoupper(trim($tmp5))=="FORMSTATIC" ){
eContextPut("Fa:".trim($tmp3));
}
if( $_Objeto[$NomFile]['FORMSTATIC']==1 ){
$tmp2 = explode('|', $_Objeto[$NomFile]['sSLSQL']);
$NomCampoFile = trim($tmp2[1]);
$tmp2 = trim($tmp2[2]);
if( substr($tmp2,1,1)=='.' ) $tmp2 = substr($tmp2,2);
$_Objeto[$NomFile]['SLFIELDFILE'] = $tmp2;
}else{
$tmp2 = explode('|', $_Objeto[$NomFile]['sSLSQL']);
$NomCampoFile = trim($tmp2[1]);
$tmp2 = trim($tmp2[2]);
if( substr($tmp2,1,1)=='.' ) $tmp2 = substr($tmp2,2);
$_Objeto[$NomFile]['SLFIELDFILE'] = $tmp2;
if( $tmp2!='' ){
global $_UPLOADFILE;
list(,,$tmp3) = explode('|',$_Objeto[$NomFile]['SLMENU']);
$tmp3 = substr( $tmp3, strpos( ','.$tmp3, ','.$_Objeto[$NomFile]['SLFILE'].'=' )+1 );
list(,$tmp3) = explode('=', $tmp3.',');
list($tmp3) = explode(',', $tmp3.',');
$tmp3 = trim($tmp3);
$_Objeto[$NomFile]['SUBDIR'] = $_UPLOADFILE[$tmp3]['oDIR'];
$_Objeto[$NomFile]['oDIR'] = $_UPLOADFILE[$tmp3]['oDIR'];
$_Objeto[$NomFile]['PREFIJO'] = $_UPLOADFILE[$tmp3]['PREFIJO'];;
}
if( $_Objeto[$NomFile]["SLFILE"]!="" ){
list(,,$lstCampos) = explode("|", $_Objeto[$NomFile]["SLMENU"]);
$lstCampos = explode(",", str_replace(" ","",$lstCampos));
for($n=0; $n<count($lstCampos); $n++){
list($real, $virtual) = explode("=", $lstCampos[$n]);
list($alias, $real) = explode(".", $real);
if( $real=="" ) $real = $alias;
if( $_Objeto[$NomFile]["SLFIELDFILE"]==$real ){
foreach($_UPLOADFILE as $k=>$v){
if( $k==$virtual || substr_count($k, ".{$virtual}")==1 ){
$_UPLOADFILE[str_replace($virtual,$real,$k)] = $_UPLOADFILE[$k];
}
}
}
}
}
}
list($sSql) = explode(' from ', substr($sSql,7));
if( substr_count($sSql, 'concat(')>0 ){
$ssSql = $sSql;
while( substr_count($ssSql, 'concat(')>0 ){
$i = strpos($ssSql, 'concat(');
$f = strpos($ssSql, ')', $i)+1;
$ssSql = substr($ssSql, 0, $i).substr($ssSql, $f);
}
$NomField = explode(',', $ssSql);
}else{
$NomField = explode(',', $sSql);
}
if( count($NomField)==0 ) eMessage("Objeto {$NomFile} sin campos",'HSE');
$DimSlTypeData = array();
for($i=0; $i<count($_DimChildrenData); $i++){
if( $_DimChildrenData[$i][0]==$NomFile ) $DimSlTypeData = explode(',',$_DimChildrenData[$i][1]);
}
if( str_replace(',','',$_Objeto[$NomFile]['SLCOLSOP'])=='' ) $_Objeto[$NomFile]['SLCOLSOP'] = '';
if( $_Objeto[$NomFile]['SLFILE']!='' &&  $_Objeto[$NomFile]['FORMSTATIC']==1 ) $_Objeto[$NomFile]['SLFILE'] = '>'.$_Objeto[$NomFile]['SLFILE'];
echo "<TABLE id='{$NomFile}' class='{$cssBrowse}' PADRE='{$Fila[$sCampo]}' AltoTH=0 WTITLE='".$_Objeto[$NomFile]['SLWTITLE']."' MODO='' FILA=0 FUNCTION='".$_Objeto[$NomFile]['SLFUNCTION']."'";
echo ' ENVIAR='.(($Opcion=='bR')?'1':'0');
echo ' COLSOP='.(($_Objeto[$NomFile]['SLCOLSOP']!='')?'1':'0');
echo ' TRVISIBLES='.(($ExeAltoNFilas)?$nAltoNFilas:'-1');
list($cx, $cy) = explode(',',$CoordXY);
echo ' CX="'.trim($cx).'" CY="'.trim($cy).'"';
echo ' FILE="'.$_Objeto[$NomFile]['SLFILE'].'"';
echo ' FIELDFILE="'.$_Objeto[$NomFile]['SLFIELDFILE'].'"';
echo ' FILECONTENT="'.trim($_Objeto[$NomFile]['SLFILECONTENT']).'"';
echo ' SUBDIR="'._InVar($_Objeto[$NomFile]['SUBDIR']).'"';
echo ' oDIR="'._InVar($_Objeto[$NomFile]['oDIR']).'"';
echo ' PLOCAL="'.$PosFLocal.'"';
echo ' PSERVER="'.$PosFServer.'"';
echo ' ePrefix="'.$_Objeto[$NomFile]['PREFIJO'].'"';
if( $_Objeto[$NomFile]['SLUNIQUE']!='' ) echo ' SLUNIQUE="'.str_replace('"','&quot;',$_Objeto[$NomFile]['SLUNIQUE']).'"';
echo ' FORMSTATIC="'.$_Objeto[$NomFile]['FORMSTATIC'].'"';
echo ' eSequence="'.$_Objeto[$NomFile]['SLSEQUENCE'].'"';
echo ' eAddWhere="'.str_replace('"',"&quot;",trim($addWhere)).'"';
echo ' eAlias="';
if( substr($_Objeto[$NomFile]['ALIAS'],-1)=="." ){
echo substr($_Objeto[$NomFile]['ALIAS'],0,-1);
}else{
echo $_Objeto[$NomFile]['ALIAS'];
}
echo '"';
if( isset($_RELATIONSUBLIST) ){
foreach($_RELATIONSUBLIST as $k=>$v){
if( $v[1]==substr($NomFile,1,-1) ) echo ' SUBSUBLIST=1';
if( $v[0]==substr($NomFile,1,-1) ) echo ' RELATION='.$v[1].' RELATIONFIELD='.$v[2];
}
}
$xStyle = "margin:0px;";
echo " cols={$tCol}";
list($OpActiva, $xTxt) = explode('|', $_Objeto[$_Form[$lin][1]]['SLMENU']);
$OpActiva = ','.trim($OpActiva).',';
if( trim($xTxt)!='' && (substr_count($OpActiva, ",{$Opcion},")>0 || $OpActiva==',*,') ){
$xStyle .= "cursor:pointer;";
echo " oncontextmenu='gsSubMenu(\"m{$NomFile}\")'";
$Dim2 = explode(',',$xTxt);
$opSubMenu = "";
for( $n=0; $n<count($Dim2); $n++ ){
list(,$Op2) = explode(':',$Dim2[$n]);
$opSubMenu .= strtoupper(trim($Op2));
}
echo " opSubMenu='{$opSubMenu}'";
}
echo " style='{$xStyle}'";
$ConSortCol = false;
if( $_Objeto[$NomFile]['SLSORT']!='' ){
for($z=0; $z<count($NomField); $z++){
if( $_Objeto[$NomFile]['SLSORT']==trim($NomField[$z]) ){
echo ' SortCol='.$z;
$ConSortCol = true;
break;
}
}
}
if( $_Objeto[$NomFile]['THSORT'] ) echo ' SortManual=1';
echo '>';
$xTH = explode(',', $_Objeto[$NomFile]['SLTH']);
for($n=0; $n<count($xTH); $n++){
$icd = '';
if( $xAlign[$n]!='' ){
$icd = str_replace('i','i',strtolower($xAlign[$n]));
$icd = str_replace('l','i',$icd);
$icd = str_replace('r','d',$icd);
$icd = str_replace('h','o',$icd);
if( $icd=='t' ){
$CampoTitle = $e;
$icd = 'o';
}
}
if( trim($icd)=='' ){
echo '<COL';
}else{
echo '<COL id='.trim($icd);
}
if( $xColWidth[$n]=='' ){
if( $_DefaultSize['IT'][$tmpTypeData[$n]]<>"" ){
$xColWidth[$n] = $_DefaultSize['IT'][$tmpTypeData[$n]];
}
}
if( ($n==0 && $_Objeto[$NomFile]['BeforeAfter']=='B') || ($n==count($xTH)-1 && $_Objeto[$NomFile]['BeforeAfter']=='A') ) echo " style='white-space:nowrap;'";
echo '>';
}
if( $_Objeto[$NomFile]['SLFORMAT']!='' ){
$tmpBFormat = array();
$tmpFormato = explode(",", $_Objeto[$NomFile]['SLFORMAT']);
for($i=0; $i<count($tmpFormato); $i++){
if( substr_count($tmpFormato[$i], chr(92)) ){
if( preg_match('/^(cR|bR)$/', $_Mode) ){
list(,$tmpFormato[$i]) = explode(chr(92), $tmpFormato[$i]);
}else{
list($tmpFormato[$i]) = explode(chr(92), $tmpFormato[$i]);
}
}
$tmpFormato[$i] = str_replace('&#44;', ',', trim($tmpFormato[$i]));
if( substr_count($tmpFormato[$i],'(')==0 && substr_count(str_replace('B','b',$tmpFormato[$i]),'b')==1 && strlen($tmpFormato[$i])<4 ){
$tmpBFormat[$i] = true;
$tmpFormato[$i] = str_replace('b', '', str_replace('B','',$tmpFormato[$i]));
}
}
}else{
$tmpFormato = array();
}
list($xSql,$logPk,$logNomFile) = explode("|", $_Objeto[$NomFile]["sSLSQL"]);
if( substr_count($logPk, ".")>0 ) list(,$logPk) = explode(".",$logPk);
$logPk = trim($logPk);
if( substr_count($logNomFile, ".")>0 ) list(,$logNomFile) = explode(".",$logNomFile);
$logNomFile = trim($logNomFile);
list(,$no) = explode(" from ",$xSql);
list($logTabla) = explode(" ",trim($no));
$logTabla = trim($logTabla);
if( $_Objeto[$NomFile]['SLTH']!="" ){
echo '<THEAD>';
$tmpTD = explode(',', $_Objeto[$NomFile]['SLTYPEDATA']);
$tmpColsOp = explode(',',strtoupper(str_replace(' ','',$_Objeto[$NomFile]['SLCOLSOP'])));
echo '<TR style="position:relative; top:0px"';
echo '>';
$pNmFieldFile = -1;
$pCampoFile = -1;
$pCampoLog = -1;
$tmpSV = array();
$z = 0;
while( list($e,$vTH)=each($xTH) ){
$NomField[$z] = trim($NomField[$z]);
if( substr($NomField[$z],0,3)=='as ' ) $NomField[$z] = trim(substr($NomField[$z],3));
echo '<TH NC="'.$z.'" CAMPO="'.$NomField[$z].'"';
if( $NomCampoFile==$NomField[$z] ) $pCampoFile = $z;
$no = $NomField[$z];
if( substr_count($no, ".")>0 ) list(,$no) = explode(".",$no);
if( $logPk==trim($no) ) $pCampoLog = $z;
if( $_Objeto[$NomFile]['SLFIELDFILE']==trim($no) ) $pNmFieldFile = $z;
if( strtoupper($xAlign[$z])=="H" || strtoupper($xAlign[$z])=="O" ){
echo ' style="display:none"';
}else{
$css = "";
if( $_Objeto[$NomFile]['SLSORT']==$NomField[$z] ) $css .= 'text-decoration:underline;';
echo " style='text-align:center;{$css}'";
}
$tmpTD[$e] = str_replace('&#44;', ',', trim($tmpTD[$e]));
$uTipoDato = '';
if( $tmpFormato[$e]<>"" && $tmpTD[$e]=="" ){
$x = strtoupper($tmpFormato[$e]);
if( substr_count($x, "M")>0 && str_replace("M", "", $x)*1>0 ) $tmpTD[$e] = "-,";
}
if( $tmpTD[$e]!='' ){
echo ' td="'.$tmpTD[$e].'"';
$uTipoDato = $tmpTD[$e];
if( $tmpTD[$e]=='SV' ){
$xDimF = explode('|',$_Objeto[$NomFile]['SLMENU']);
$xDim = explode(',',$xDimF[2]);
$xDim = explode('=',$xDim[$e]);
$NomSV = substr(trim($xDim[1]),1);
$tmpSV[$e]['INDICE'] = $e;
$xDim = explode(',',$xDimF[2]);
for($g=0; $g<count($xDim); $g++){
$xDimC = explode('=', $xDim[$g]);
if( trim($xDimC[1])==$NomSV ) $tmpSV[$e]['INDICE'] = $g;
}
global $_ADDOPTION;
$tmp = explode(';', $_ADDOPTION[$NomSV]);
for($i=0; $i<count($tmp); $i++){
$tmp1 = _DivideOption($tmp[$i]);
$tmpSV[$e][$tmp1[0]] = $tmp1[1];
}
}
}else{
list($dCampos, $oCampos) = explode('=', $DimSlTypeData[$z]);
if( $oCampos=="" ) $oCampos = $dCampos;
$oCampos = trim($oCampos);
for($n=0; $n<count($_Form); $n++){
if( $_Form[$n][1]==$oCampos ){
echo ' td="'.$_Form[$n][2].'"';
$uTipoDato = $_Form[$n][2];
break;
}
}
}
$sTmpFormato = $tmpFormato[$z];
if( substr_count($sTmpFormato, '\\')==1 ) list($tmpFormato[$z], $sTmpFormato) = explode('\\', $tmpFormato[$z]);
if( substr_count($sTmpFormato, '(')==0 && substr_count($sTmpFormato, 'M')==1 && strlen($sTmpFormato)<5 ){
$sTmpFormato = str_replace('M','',$sTmpFormato);
echo ' MILES=true';
}else{
if( $uTipoDato[0]=='+' || $uTipoDato[0]=='-' ) echo ' MILES=true';
}
if( substr_count($sTmpFormato, '(')==0 && $sTmpFormato!='' && strlen($sTmpFormato)<5 ) echo ' DCM="'.$sTmpFormato.'"';
if( $tmpTD[$e]=='' && substr($NomField[$z],0,3)=='dt_' ) echo ' td="F4"';
if( $xTipTH[$e]!='' ){
echo " onmouseenter=\"S(this).tip('#_TIP_".substr($NomFile,1,-1)."_".$e."',-2)\"";
}
if( $tmpColsOp[$e]!='' ) echo " ColOp='".trim($tmpColsOp[$e])."'";
echo '>'.trim($vTH);
if( trim($vTH)=="" ) echo "&nbsp;";
if( $ConSortCol && (strtoupper(substr($vTH,0,3))=='<I ' || strtoupper(substr($vTH,0,5))=='<IMG ') ){
if( $_Objeto[$NomFile]['THSORT'] ) echo '<i class="ICONINPUT" onmouseenter=\'S(this).tip("Activar la ordenación manual",-2)\' onclick="eSLSort()" class="OFF">|</i>';
}
$z++;
}
echo '</THEAD>';
}
if( $pCampoFile>-1 ){
if( substr_count($NomCampoFile,".")>0 ) list(,$NomCampoFile) = explode(".",$NomCampoFile);
eContextPut("D:".$_Objeto[$NomFile]['SUBDIR'].'/{'.$NomCampoFile);
@unlink("../_tmp/php/".$_SESSION["_User"]."_".$_SESSION["_eDes_"].".srl.{$NomCampoFile}");
$ckeckLog = false;
list(,,$sSubWin,,$sTipo) = explode("|", $_Objeto[$NomFile]["SLMENU"]);
$sTipo = trim(strtoupper($sTipo));
if( $pCampoLog>-1 ){
global $_FILELOG;
if( $_Objeto[$NomFile]['FORMSTATIC']==1 ){
$sSubWin = trim($sSubWin);
$ckeckLog = _LeeSublistWin($sSubWin, $NomFile);
}else{
$ckeckLog = $_FILELOG[$logTabla.'.'.$logNomFile];
}
}
}
$VerTR = '';
if( count($_RELATIONSUBLIST[substr($NomFile,1,-1)])>0 ) $VerTR = ' style="display:none"';
if( $_Objeto[$NomFile]["SLICON"]<>"" ) $tmpFormato[0] = $_Objeto[$NomFile]["SLICON"];
$iSubListSV = array();
for($NumCol=0; $NumCol<$tCol; $NumCol++){
if( trim($tmpFormato[$NumCol])=="" && $_Objeto[$NomFile]["FIELD"][$NumCol][0]=="*" && $_ADDOPTION[substr($_Objeto[$NomFile]["FIELD"][$NumCol],1)]!="" ){
$iSubListSV[$_Objeto[$NomFile]["FIELD"][$NumCol]][""] = "";
$tmp = explode(";", $_ADDOPTION[substr($_Objeto[$NomFile]["FIELD"][$NumCol],1)]);
for($n=0; $n<count($tmp); $n++){
$tmp2 = explode(",", $tmp[$n]);
$iSubListSV[$_Objeto[$NomFile]["FIELD"][$NumCol]][trim($tmp2[0])] = trim($tmp2[1]);
}
}
}
echo '<TBODY>';
$s_vF = $_vF;
$DimValor = array();
$nFila = -1;
while( $Opcion!='a' && $_vF=qRow() ){
$nFila++;
if( $CampoTitle>-1 ){
echo '<TR title="'.trim($_vF[$CampoTitle]).'"'.$VerTR.'>';
}else{
echo "<TR{$VerTR}>";
}
$nCol = 0;
if( $pCampoFile>-1 ){
error_log(trim($_vF[$pCampoFile])."\n", 3, "../_tmp/php/".$_SESSION["_User"]."_".$_SESSION["_eDes_"].".srl.{$NomCampoFile}");
}
for($NumCol=0; $NumCol<$tCol; $NumCol++){
$Valor = trim($_vF[$NumCol]);
$DimValor[$nFila][$nCol] = $Valor;
if( trim($tmpFormato[$nCol])!='' ){
echo '<TD>';
if( substr_count($tmpFormato[$nCol], '(')==0 && substr_count($tmpFormato[$nCol], 'M')==1 && strlen($tmpFormato[$nCol])<4 ){
if( $tmpBFormat[$nCol] && isZero($Valor) ){
echo "";
}elseif( strlen($tmpFormato[$nCol])==2 ){
echo eNumberFormat($Valor, $tmpFormato[$nCol][1]);
}else{
echo eNumberFormat($Valor, 0);
}
}else if( substr_count($tmpFormato[$nCol], 'm')==1 && strlen($tmpFormato[$nCol])<4 ){
if( strlen($tmpFormato[$nCol])==2 ){
echo eNumberFormat($Valor, $tmpFormato[$nCol][1]);
}else{
echo eNumberFormat($Valor, 0);
}
}else{
if( $nCol==0 && $tmpFormato[$nCol]<>"" ) $DimValor[$nFila][$nCol] = 1;
$Formato = str_replace("#", str_replace('"',"'",$Valor), $tmpFormato[$nCol]);
$ext = '';
if( strrpos($Valor,'.' ) ) $ext = substr($Valor,strrpos($Valor,'.' )+1);
if( substr_count($Formato,'_@_')>0 ){
$Formato = str_replace('_@_', $_Objeto[$NomFile]['TITLE_'.$ext], $Formato);
}
if( substr_count($Formato,'@')>0 ){
$Formato = str_replace('@', $ext, $Formato);
}
if( substr_count($Formato,'()')==1 ){
list($txt) = explode("(",$Formato);
$txt = call_user_func(trim($txt));
if( $txt!="" ){
$txt = _SubListGetImg($txt, true);
echo $txt;
if( $ckeckLog && $txt[0]=="<" ){
$logPk = $_vF[$pCampoLog];
$n = qCount("gs_log_doc", "dbtable='{$logTabla}' and nm_field='{$logNomFile}' and pk='{$logPk}'", $p2);
if( $n>0 ){
echo "<i class='ICONINPUT' onclick='_LogDocList(\"{$logTabla},{$logNomFile},{$logPk}\")' onmouseenter='S(this).tip(\"Histórico de modificaciones {$n}\",-1)'>&#172;</i>";
}
}
}
$nCol++;
continue;
}else if( $Formato[0]=="[" ){
echo _SubListGetImg($Formato, true, (($pNmFieldFile>-1)? $_vF[$pNmFieldFile]:""));
$nCol++;
continue;
}else if( $Formato[0]=="<" ){
echo $Formato;
$nCol++;
continue;
}else if( substr_count($Formato,'(')>0 && substr(trim($Formato),-1)==')' ){
$Formato = 'echo '.$Formato.';';
}else{
$Formato = 'echo "'.$Formato.'";';
}
if( isZero($Formato) && ($tmpTD[$nCol]=='CDI' || ( $tmpTD[$nCol]=='' && substr($NomField[$nCol],0,3)=='ds_' )) ) $Valor = '';
if( isZero($Formato) && ($tmpTD[$nCol]=='F4' || ( $tmpTD[$nCol]=='' && substr($NomField[$nCol],0,3)=='dt_' )) ) $Formato = '';
$xFunc = "";
if( $nFila==0 && (substr($Formato,-1)==')' || substr($Formato,-2)==');' ) ){
list($xFunc) = explode('(',$Formato);
if( substr($xFunc,0,5)=='echo ' ) $xFunc = substr($xFunc,5);
if( !function_exists($xFunc) ) ePrintR('ERROR: "'.$xFunc.'()" function does not exist');
}
@eval($Formato);
}
}else if( preg_match('/^(P4|F4|CDI|T)$/', $tmpTD[$nCol]) ){
echo '<TD>'.eDataFormat($Valor, $tmpTD[$nCol]);
}else if( $tmpFormato[$nCol]=="" && $_Objeto[$NomFile]["FIELD"][$NumCol][0]=="*" && isset($iSubListSV[$_Objeto[$NomFile]["FIELD"][$NumCol]][$Valor]) ){
echo '<TD>'.$iSubListSV[$_Objeto[$NomFile]["FIELD"][$NumCol]][$Valor];
}else{
$Valor = str_replace("&#60;div&#62;", "<div>", $Valor);
$Valor = str_replace("&#60;/div&#62;", "</div>", $Valor);
$Valor = str_replace("&#60;br&#62;", "<br>", $Valor);
if( $tmpTD[$nCol]=='' ){
if( strlen($Valor)==10 && substr($Valor,4,1)=='-' && substr($Valor,7,1)=='-' ){
$Valor = substr($Valor,8,2).substr($Valor,4,4).substr($Valor,0,4);
}
}elseif( $tmpTD[$nCol]=='C' ){
if( $Valor=='S' ){
$Valor = '<i class="ICONINPUT DEFAULT">j</i>';
}else{
$Valor = '<i class="ICONINPUT DEFAULT OFF">i</i>';
}
}elseif( $tmpTD[$nCol]=='R' ){
}else{
if( isZero($Valor) && ($tmpTD[$nCol]=='CDI' || ($tmpTD[$nCol]=='' && substr($NomField[$nCol],0,3)=='ds_')) ) $Valor = '';
if( isZero($Valor) && ($tmpTD[$nCol]=='F4' || ($tmpTD[$nCol]=='' && substr($NomField[$nCol],0,3)=='dt_')) ) $Valor = '';
if( $tmpTD[$nCol]=='SV' ) $Valor = $tmpSV[$nCol][trim($_vF[$tmpSV[$nCol]['INDICE']])];
}
echo '<TD>'.$Valor;
}
$nCol++;
}
}
unset($iSubListSV);
$TotalLibres = 0;
if( $ExeAltoNFilas && $nFila<$nAltoNFilas ){
if( $_Objeto[$NomFile]['SLCOLSOP']!='' ) $nFila++;
for($i=0; $i<$nAltoNFilas-$nFila-2; $i++){
$TotalLibres++;
echo '<TR LIBRE=1>';
for( $n=0; $n<count($xTH); $n++ ) echo '<TD>&nbsp;';
}
}
if( count($_RELATIONSUBLIST[substr($NomFile,1,-1)])>0 ){
for($i=$TotalLibres; $i<$nAltoNFilas-1; $i++){
echo '<TR LIBRE=1>';
for($n=0; $n<count($xTH); $n++) echo '<TD>&nbsp;';
}
}
echo '</TBODY>';
if( $_Objeto[$NomFile]['SLCOLSOP']!='' ){
echo '<TFOOT>';
$_vF = array();
echo '<TR id=PieLista>';
$tmp = explode(',',strtoupper(str_replace(' ','',$_Objeto[$NomFile]['SLCOLSOP'])) );
for($n=0; $n<count($xTH); $n++){
if( $tmp[$n]=='' ){
echo '<TD id=PieLista>';
$Total = ' ';
}else{
echo '<TD id=PieLista';
switch( $tmp[$n][0] ){
case '<':
echo ' style="text-align:left"';
$tmp[$n] = trim(substr($tmp[$n],1));
break;
case '=':
echo ' style="text-align:center"';
$tmp[$n] = trim(substr($tmp[$n],1));
break;
case '>':
echo ' style="text-align:right"';
$tmp[$n] = trim(substr($tmp[$n],1));
break;
default:
}
echo '>';
$Total = 0;
for($f=0; $f<count($DimValor); $f++){
switch( $tmp[$n] ){
case '+':
$Total += $DimValor[$f][$n];
break;
case 'C':
$Total++;
break;
case '#':
if( trim($DimValor[$f][$n])!='' ) $Total++;
break;
}
}
}
if( $tmp[$n]<>"" ){
if( substr($tmpFormato[$n],-1)==')' || substr($tmpFormato[$n],-2)==');' ){
if( $Opcion!='a' ){
echo eNumberFormat($Total,0);
}
}else if( substr_count($tmpFormato[$n], 'M')==1 && strlen($tmpFormato[$n])<4 ){
if( strlen($tmpFormato[$n])==2 ){
echo eNumberFormat($Total,$tmpFormato[$n][1]);
}else{
echo eNumberFormat($Total,0);
}
}else if( substr_count($tmpFormato[$n], 'm')==1 && strlen($tmpFormato[$n])<4 ){
if( strlen($tmpFormato[$n])==2 ){
echo eNumberFormat($Total,$tmpFormato[$n][1]);
}else{
echo eNumberFormat($Total,0);
}
}else if( $tmp[$n][0]=='"' || $tmp[$n][0]=="'" ){
echo substr($tmp[$n],1,-1);
}else if( $Total<>" " ){
echo eNumberFormat($Total,0);
}else{
if( $n==0 &&  $tmp[$n][0]=="#" && $Total==0 ) $tmpFormato[$n] = "0";
$Formato = str_replace("#", str_replace('"',"'",$Valor), $tmpFormato[$n]);
$ext = '';
if( strrpos($Valor,'.' ) ) $ext = substr($Valor, strrpos($Valor,'.' )+1);
if( substr_count($Formato,'_@_')>0 ){
$Formato = str_replace( '_@_', $_Objeto[$NomFile]['TITLE_'.$ext], $Formato );
}
if( substr_count($Formato,'@')>0 ){
$Formato = str_replace('@', $ext, $Formato);
}
if( substr_count($Formato,'(')>0 && substr(trim($Formato),-1)==')' ){
$Formato = 'echo '.$Formato.';';
}else{
$Formato = 'echo "'.$Formato.'";';
}
if( isZero($Formato) && ($tmpTD[$n]=='F4' || ( $tmpTD[$n]=='' && substr($NomField[$n],0,3)=='dt_' )) ) $Formato = '';
@eval($Formato);
}
}else{
echo '&nbsp;';
}
}
echo '</TFOOT>';
}
$_vF = $s_vF;
echo '</TABLE>';
echo '</SPAN>';
echo '<script type="text/javascript">';
echo "_SubListPrecalculo('{$NomFile}', '{$CalculaAlto}', '{$_AnchoSubList}', ".(($_Objeto[$NomFile]['SLTITLE']!="")?"true":"false").");";
echo '</script>';
if( $_ADDCODE[$NomFile]['A']!='' ){
if( substr($_ADDCODE[$NomFile]['A'],-1)==')' && strpos($_ADDCODE[$NomFile]['A'],'(')>0 ){
echo _ExeEval($_ADDCODE[$NomFile]['A'], '[AddCode] '.$NomFile.' | A | '.$_ADDCODE[$NomFile]['A']);
}else{
echo $_ADDCODE[$NomFile]['A'];
}
}
if( $_FIELDSET[$NomFile]['F'] ){
$_FIELDSETON = false;
if( $_CARDSHOW ){
echo "</div>";
}else{
echo '</fieldset>';
}
}
if( $_ADDCODE[$NomFile]['E']!='' ) echo $_ADDCODE[$NomFile]['E'];
if( $_Objeto[$NomFile]['SLONCLICK']!='' ){
echo '<SCRIPT type="text/javascript">';
echo 'DGI("'.$NomFile.'").onclick = '.$_Objeto[$NomFile]['SLONCLICK'].';';
echo 'DGI("'.$NomFile.'").style.cursor = "pointer";';
echo '</SCRIPT>';
}
if( count($MasCamposEnLinea)==1 ) continue;
$tmp = $MasCamposEnLinea;
$ConObjeto = true;
}else{
if( $_Form[$lin][0]=='-' || strtolower($_Form[$lin][0])=="-{tab}" ){
SubTitulo($_TCol*3-1, $NomFile, $_Form[$lin], $NumForm);
continue;
}
if( $_Form[$lin][0][0]=='{' ){
global $_DimInclude;
list($SubEti) = explode('}',strtoupper($_Form[$lin][0]));
$SubEti .= '}';
if( strtoupper($SubEti)=='{ISUBLIST}' ) $tmp = explode('|',$_Form[$lin][0]);
list($_Form[$lin][0], $NoTD) = explode('|',$_Form[$lin][0]);
$NomSubEti = trim(substr(trim($_Form[$lin][0]),3));
if( strtolower($NomSubEti)=="captcha" ){
$CaptchaLeng = NULL;
if( (($NoTD*1)."")==$NoTD ) $CaptchaLeng = $NoTD;
$NoTD = "NoTD";
}
if( $SubEti=='{TAB}' ){
}else if( !(($SubEti=='{H}' || $SubEti=='{P}') && strtoupper(trim($NoTD))=='NOTD') ){
echo '<td colspan='.($_TCol*3-1);
echo '>';
}
switch( $SubEti ){
case '{H}':
_IncludeJsHtml($_DimInclude['IncH'][$NomSubEti], "HTML{H}");
break;
case '{P}':
global $php_errormsg, $_vF;
if( strtolower($NomSubEti)=="captcha" ){
include_once("../../edesweb/itm/captcha.inc");
echo '<td><td>'.eCaptcha($CaptchaLeng);
break;
}
$tmpFile = GrabaTmp('fg_php_'.strtolower($NomSubEti), $_DimInclude['IncP'][$NomSubEti], $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
break;
case '{J}':
_IncludeJsHtml($_DimInclude['IncJ'][$NomSubEti], "JS{J}");
break;
case '{F}':
if( $NomSubEti[0]=='>' ){
$NomSubEti = trim(substr($NomSubEti,1));
}else{
$NomSubEti = eScript($NomSubEti);
}
include($NomSubEti);
break;
case '{I}':
echo $NomSubEti;
break;
case '{Z}':
if( $NumForm>1 ) break;
echo '</table>'.$__Enter;
$tmp = (count($_FORMWIDTHS)==0) ? '100%':'1px';
echo "<table id='TABNumber1' class='TABStyle' style='border-collapse:collapse; display:table-caption;' width='{$tmp}' cellspacing=0px cellpadding=0px border=";
if( $GLOBALS['_DEBUG']==3 ){ echo '1px'; }else{ echo '0px'; }
echo '>';
echo $__Enter."<TR style='font-size:1px;height:1px;'>";
if( count($_FORMWIDTHS)>0 ){
for($cc=0; $cc<($_TCol*3-1); $cc++){
if( $_FORMWIDTHS[$cc]!="" ){
echo '<TD style="font-size:1px;height:1px;'.$_FORMWIDTHS[$c].'"><img pk=1 style="'.$_FORMWIDTHS[$cc].'height:1px;background:transparent;">';
}else{
echo '<TD style="font-size:1px;height:1px;'.$_FORMWIDTHS[$c].'"><img pk=2 style="background:transparent;'.$_FORMWIDTHS[$c].';height:1px"></TD>';
}
}
}else{
echo '<TD style="font-size:1px;height:1px;'.$_FORMWIDTHS[$c].'"><img pk=3 style="background:transparent;'.$_FORMWIDTHS[$c].'height:1px">';
echo '<TD colspan='.($_TCol*3-2).' style="font-size:1px;height:1px;'.$_FORMWIDTHS[$c].'"><img pk=4 style="background:transparent;'.$_FORMWIDTHS[$c].'height:1px"></td>';
}
break;
case '{ISUBLIST}':
list(,$tmp[0]) = explode('}',$tmp[0]);
$tmp[3] = str_replace(' ','',strtoupper($tmp[3]));
list($Ancho, $Alto) = explode(',',str_replace('px','',$tmp[3]));
$eFijarAncho = (is_numeric($Ancho) && $Ancho>0 ? " eFixWidth={$Ancho}px":"");
$eFijarAlto = (is_numeric($Alto) && $Alto>0 ? " eFixHeight={$Alto}px":"");
$Ancho = (($Ancho>0)?$Ancho:$Ancho*-1);
if( substr_count($Alto,'R')>0 ){
$Alto = $Alto*22;
}else{
$Alto = (($Alto>0)?$Alto:$Alto*-1);
}
$src = _InVar(trim($tmp[1]));
$Campo = trim($tmp[2]);
$tmp[4] = trim($tmp[4]);
if( substr_count($tmp[4],'(')==0 ){
if( $Opcion=='cR' || $Opcion=='bR' ) $tmp[4] = str_replace(array('I','U','D'), '', $tmp[4]);
}
$SiEsAlta = (($Opcion=='a') ? '-'.$_SESSION['_User']:'');
if( $Opcion=='a' ){
for($cc=0; $cc<count($_Form); $cc++){
if( $_Form[$cc][1]==$Campo ){
if( substr_count('|+|-|+,|-,|','|'.$_Form[$cc][2].'|')==0 ) $SiEsAlta = substr($SiEsAlta,0,$_Form[$cc][4]);
break;
}
}
}
if( substr_count($src,'.')==0 ) $src .= '.edf';
if( $tmp[5]!='' ) $_OFFLABEL = '&_OFFLABEL='.str_replace(' ','',$tmp[5]);
if( $GLOBALS['_ISUBLISTSERIAL']=='' ){
echo "<INPUT TYPE='hidden' NAME='_ISUBLISTSERIAL' value=''{$_AutoComplet}>";
$GLOBALS['_ISUBLISTSERIAL'] = '-';
}
$GLOBALS['_ISubListTotal']++;
if( $Opcion=='bR' ){
echo '<INPUT TYPE="hidden" NAME="_ISUBLISTDELETE" value="'.trim($tmp[1]).'|'.trim($tmp[2]).'"'.$_AutoComplet.'>';
}
if( substr_count($Campo,'(')==0 ){
if( $Opcion=='a' ){
$pk = $Campo."='".$SiEsAlta."'";
}else{
$pk = $Campo."='".$GLOBALS['_vF'][$Campo]."'";
}
}else{
list($Campo) = explode('(',$Campo);
$pk = call_user_func( trim($Campo) );
if( strtoupper(trim($tmp[5]))=='TRUE' || strtoupper(trim($tmp[5]))=='1' ) $Opcion = 'cR';
}
eContextPut('Ll:'.$src, str_replace("'","",$pk), false);
echo '<iframe src="edes.php?Ll:'.$src.'&_FILTER='.$pk."&_CSSBIG=".$GLOBALS['_CSSFontSize']."&_CONTEXT={$_SESSION['_eDes_']}";
echo '&_ISUBLIST&_ISLOP='.$Opcion.','.$tmp[4].'&_SIZE='.$tmp[3].$_OFFLABEL;
if( trim($tmp[7])!='' ) echo '&_ISLBlankRecords='.trim($tmp[7]);
echo '" nTAB='.$nHoja;
echo $eFijarAncho.$eFijarAlto;
echo " class=ISubList style='width:{$Ancho}px;height:{$Alto}px;{$tmp[8]}' eNORESIZE=true FRAMEBORDER=0 SCROLLING='auto'></iframe>";
eJS('window.frames[window.frames.length-1].frameElement.WOPENER=window;');
break;
case '{TAB}':
if( $_Form[$lin][10]==-1 ) continue;
global $_SUBTAB, $_SUBTABFORM;
$n=0;
echo "<tr id=']'{$_StyleTR} ttr='-'>";
echo '<td colspan='.($_TCol*3-1).' class="TABMenuContainer">';
$snf = $_Form[$lin][10];
$_SUBTABFORM .= $snf;
$xCaption = array(); $xAction = array(); $xIcon = array(); $xShow = array(); $xTitle = array();
for($c=0; $c<count($_Form); $c++){
if( $_Form[$c][0]=='{TAB}' && $_Form[$c][10]==$snf ){
$xCaption[] = $_Form[$c][1];
$xAction[] = trim($_Form[$c][2]);
$xIcon[] = trim($_Form[$c][3]);
$xShow[] = trim($_Form[$c][4]);
$xTitle[] = trim($_Form[$c][5]);
$_Form[$c][10] = -1;
$_SUBTABFORM .= ','.($_SUBTAB+$n);
for($st=$c+1; $st<count($_Form); $st++){
if( $_Form[$st][10]!=$snf ) break;
if( $_Form[$st][0]=="{TAB}" || ($_Form[$st][0]=="-" && $_Form[$st+1][1][0]!="[" && strtolower($_Form[$st][0])!="-{tab}") ){
break;
}
$_Form[$st][17] = $_SUBTAB+$n;
}
$n++;
}
}
$_SUBTABFORM .= '|';
eSubTab($xCaption, $xAction, $xIcon, $xShow, $xTitle, $_SUBTAB, $lin);
$_SUBTAB += count($xCaption);
continue;
default:
echo $NomSubEti;
}
if( !$_CARDSHOW ) echo '</td>';
break;
}
$Invisible = ($_Form[$lin][_STATUS]=='I');
if( $Invisible ) $_Form[$lin][0] = '';
$LTitle = '';
if( $_TIPFORM[$_Form[$lin][1]]['L']!='' ){
$LTitle = $_TIPFORM[$_Form[$lin][1]]['L'];
if( substr_count($LTitle,'#')>0 ) $LTitle = str_replace('#', $_Form[$lin][_VALUE], $LTitle);
$LTitle = str_replace(array('&34;','&39;'), array('&#34;',"\'"), $LTitle);
if( $LTitle=='>' ){
$LTitle = " onmouseenter=\"S(this).tip('#_TIP_L_".$_Form[$lin][1]."',-1)\"";
}else{
$LTitle = " onmouseenter=\"S(this).tip('{$LTitle}',-1)\"";
}
if( $_TIPFORM[$_Form[$lin][1]]['T']!='' ) $LTitle .= ' TimeOff='.$_TIPFORM[$_Form[$lin][1]]['T'];
}
$sEtiqueta = $_Form[$lin][0];
$sNomField = NombreCampo($_Form[$lin][1]);
$Formato = '';
if( $_Form[$lin][0][0]==']' ){
$sEtiqueta = '';
$Formato = 'V';
$_Form[$lin][0] = substr($_Form[$lin][0],1);
}
if( $_Form[$lin][_STATUS]!="E" ) $ConCheckRadio = "";
$RowSpan = $_FIELDSPAN['R'][$NomFile];
if( $_SKIPTD[$NomFile] ){
if( $ColSpan[$nf][$c]==0 ){
$ColSpan[$nf][$c] = 2;
}else{
$ColSpan[$nf][$c]++;
}
}else{
if( $NomFile[0]=='[' ) $sEtiqueta = '';
if( !$Invisible && $NomFile[0]!='[' ){
if( $_FIELDSPAN['S'][$NomFile] ){
}else if( $_Form[$lin][0][0]=='=' ){
$_Form[$lin][0] = trim(substr($_Form[$lin][0], 1));
if( $sEtiqueta!='' ){
$sEtiqueta = $_Form[$lin][0];
}
if( !$_CARDSHOW && !$_SESSION["_BYPHONE"] ){
echo "<td -i style='height:1px;text-align:right'>";
}
if( $_WIDTH['e'][$NomFile]!='' ){
echo "<label for={$sNomField} id=LD style='width:{$_WIDTH['e'][$NomFile]}px;'{$LTitle}{$ConCheckRadio}>".$sEtiqueta.'</label>';
}else{
echo "<label for={$sNomField} id=LD{$LTitle}{$ConCheckRadio}>".$sEtiqueta.'</label>';
}
}else{
if( !$_CARDSHOW && !$_SESSION["_BYPHONE"] ){
echo "<td height=1px{$RowSpan}".(($c>0)?" style='text-align:right'":"").">";
}
if( $_WIDTH['e'][$NomFile]!='' ){
echo "<label for={$sNomField} id=LD style='width:{$_WIDTH['e'][$NomFile]}px;".(($c==0)?"text-align:left;":"")."'{$LTitle}{$ConCheckRadio}>".$sEtiqueta.'</label>';
}else{
echo "<label for={$sNomField} id=LD{$LTitle}{$ConCheckRadio}>".$sEtiqueta.'</label>';
}
}
$sEtiqueta = '';
$_CalColumnaUno[$nHoja] = 1;
}else if( !$_CARDSHOW && !$_SESSION["_BYPHONE"] ) echo '<td>';
}
if( !$_CARDSHOW && !$_SESSION["_BYPHONE"] ){
echo '<td q=23 style="vertical-align:top;';
if( $_TDSTYLE[$NomFile]!='' ) echo $_TDSTYLE[$NomFile];
echo '"'.$RowSpan;
if( $_FIELDSPAN['C'][$NomFile]!='' ){
echo $_FIELDSPAN['C'][$NomFile];
}else{
if( $ColSpan[$nf][$c]>0 ){
if( $_SKIPTD[$NomFile] ){
echo ' colspan='.($_TCol*3-1+1);
}else{
echo ' colspan='.(($ColSpan[$nf][$c]-1)*3+1);
}
}
}
echo '>';
}
if( $_FIELDSET[$NomFile]['I'] ){
$_FIELDSETON = true;
if( $_CARDSHOW ){
echo "<DIV class='card-inside'>";
}else{
echo '<FIELDSET class=CAJA style="display:inline;'.$_FIELDSET[$NomFile]['S'].'">';
if( $_FIELDSET[$NomFile]['T']!='' ) echo "<LEGEND ALIGN='left'>{$_FIELDSET[$NomFile][T]}</LEGEND>";
}
$_StyleTR = "";
}
if( $_EnColumna[$NomFile]['I'] ){
echo '<TABLE '.$_EnColumna[$NomFile]['S'].' cellspacing=0px cellpadding=0px style="border-collapse:collapse;"><TR><TD style="display:table-cell;">';
$_EnColumnaON = true;
$_StyleTR = "";
}
if( $_EnLinea[$NomFile]['I'] ){
echo '<TABLE '.$_EnLinea[$NomFile]['S'].' cellspacing=0px cellpadding=0px style="border-collapse:collapse;"><TR><TD>';
$_EnLineaON = true;
$_StyleTR = "";
}
if( $_SKIPTD[$NomFile] ){
if( $_WIDTH['e'][$NomFile]!='' ){
echo "<label for={$sNomField} id=LC style='width:{$_WIDTH['e'][$NomFile]}px'{$LTitle}>".$sEtiqueta.'</label>';
}else{
if( $sEtiqueta!='' ) echo "<label a=1 for={$sNomField} id=LD{$LTitle}{$ConCheckRadio}>".$sEtiqueta.'</label>';
}
}
if( $_WIDTH['c'][$NomFile]!='' ) echo "<span style='width:{$_WIDTH['c'][$NomFile]}px'>";
if( $_ADDCODE[$NomFile]['S']!='' ){
if( strip_tags($_ADDCODE[$NomFile]['S'])==$_ADDCODE[$NomFile]['S'] ){
if( $_FIELDSET[$NomFile]['I'] ){
echo "<label for={$sNomField} id=LC".(($_WIDTH['e'][$NomFile]=="")?"":" style='width:{$_WIDTH['e'][$NomFile]}px;'").">".$_ADDCODE[$NomFile]['S'].'</label>';
}else{
echo "<label for={$sNomField} id=LD".(($_WIDTH['e'][$NomFile]=="")?"":" style='width:{$_WIDTH['e'][$NomFile]}px;'").">".$_ADDCODE[$NomFile]['S'].'</label>';
}
}else{
echo $_ADDCODE[$NomFile]['S'];
}
}
if( $Formato=='V' ){
echo '<TABLE border=0px cellspacing=0px cellpadding=0px style="border-collapse:collapse; float:left;" eLabelField=V';
if( $_ADDCODE[$NomFile][']']!='' ) echo ' '.$_ADDCODE[$NomFile][']'];
echo '>';
echo "<TR LF=V><TD id=v{$LTitle}>".$_Form[$lin][0];
echo '<TR LF=V><TD id=c>';
}
if( $_ADDCODE[$NomFile]['B']!='' ){
if( substr($_ADDCODE[$NomFile]['B'],-1)==')' && strpos($_ADDCODE[$NomFile]['B'],'(')>0 ){
echo _ExeEval($_ADDCODE[$NomFile]['B'], '[AddCode] '.$Opcion.' | '.$NomFile.' | B |'.$_ADDCODE[$NomFile]['B']);
}else{
echo $_ADDCODE[$NomFile]['B'];
}
}
if( $_SESSION["_BYPHONE"] && $_Form[$lin][_STATUS]<>"I" ) echo "<br>";
$SoloSelect = false;
$Valor = $_Form[$lin][_VALUE];
if( GenControl($_Form[$lin], $Valor, $Opcion, $NumForm, $Fila, $_Form, $lin, $NumCol, $SoloSelect) ){
if( $SoloSelect ){
if( $Campo1=='#' ){
if( $GLOBALS["_SELECTMULTIPLE"][$NomFile]<>"" ){
$Campo1 = '_INPUT__'.$NomFile;
}else{
$Campo1 = '_INPUT_'.$NomFile;
}
}
}else if( $Campo1=='#' ){
$Campo1 = $NomFile;
if( $_Form[$lin][3]=='M' ) $Campo1 = $NomFile.'[]';
}
}
if( $_SESSION["_BYPHONE"] && $_Form[$lin][_STATUS]<>"I" ) echo "<br>";
echo $__Enter;
if( $_ADDCODE[$NomFile]['A']!='' ){
if( substr($_ADDCODE[$NomFile]['A'],-1)==')' && strpos($_ADDCODE[$NomFile]['A'],'(')>0 ){
$txt = _ExeEval( $_ADDCODE[$NomFile]['A'], '[AddCode] '.$Opcion.' | '.$NomFile.' | A |'.$_ADDCODE[$NomFile]['A'] );
if( strip_tags($txt)==$txt ){
echo "<label for={$sNomField} id=LE>".$txt.'</label>';
}else{
echo $txt;
}
}else{
if( strip_tags($_ADDCODE[$NomFile]['A'])==$_ADDCODE[$NomFile]['A'] ){
echo "<label for={$sNomField} id=LE>".$_ADDCODE[$NomFile]['A'].'</label>';
}else{
$txt = $_ADDCODE[$NomFile]['A'];
$pos = strpos($txt, '","#")>');
if($pos!==false && strpos($txt, '_IconSDF(')!==false ){
$_ADDCODE[$NomFile]['A'] = substr($txt,0,$pos+3). str_replace(array('"',"'"," "), array('\"','&#39;','&#32;'), $_Form[$lin][0]) .substr($txt,$pos+4);
}
echo $_ADDCODE[$NomFile]['A'];
}
}
}
if( $Formato=='V' ) echo '</table>';
if( $_ADDCODE[$NomFile]['E']!='' ){
if( substr($_ADDCODE[$NomFile]['E'],-1)==')' && strpos($_ADDCODE[$NomFile]['E'],'(')>0 ){
$txt = _ExeEval( $_ADDCODE[$NomFile]['E'], '[AddCode] '.$Opcion.' | '.$NomFile.' | E |'.$_ADDCODE[$NomFile]['E'] );
echo $txt;
}else{
echo $_ADDCODE[$NomFile]['E'];
}
}
if( $_WIDTH['c'][$NomFile]!='' ) echo '</span>';
if( $_FIELDSET[$NomFile]['F'] ){
$_FIELDSETON = false;
if( $_CARDSHOW ){
echo "</div>";
}else{
echo '</fieldset>';
}
}
}
for($s=1; $s<count($tmp); $s++){
$lin = $tmp[$s];
$NomFile = $_Form[$lin][_OFIELD];
if( $_Form[$lin][_MODE]=='*' ) $_Form[$lin][_LABEL] = '';
$sNomField = NombreCampo( $_Form[$lin][1] );
$LTitle = '';
if( $_TIPFORM[$_Form[$lin][1]]['L']!='' ){
$LTitle = $_TIPFORM[$_Form[$lin][1]]['L'];
if( substr_count($LTitle,'#')>0 ) $LTitle = str_replace('#', $_Form[$lin][_VALUE], $LTitle);
$LTitle = str_replace(array('&34;','&39;'), array('&#34;',"\'"), $LTitle);
if( $LTitle=='>' ){
$LTitle = " onmouseenter=\"S(this).tip('#_TIP_F_".$_Form[$lin][1]."',-1)\"";
}else{
$LTitle = " onmouseenter=\"S(this).tip('{$LTitle}',-1)\"";
}
if( $_TIPFORM[$_Form[$lin][1]]['T']!='' ) $LTitle .= ' TimeOff='.$_TIPFORM[$_Form[$lin][1]]['T'];
}
if( !$_CARDSHOW ){
if( $_EnColumnaON ) echo '<tr><td style="display:table-cell;">';
if( $_EnLineaON ) echo '<td>';
}
if( $Formato!='V' && !empty($_Form[$lin][0]) && $_Form[$lin][_STATUS]!='I'){
if( $_WIDTH['e'][$NomFile]!='' ){
if( strtoupper(substr($_Form[$lin][0],0,4))=='<BR>' ){
echo '<br>';
$_Form[$lin][0] = substr($_Form[$lin][0],4);
}
echo "<label for={$sNomField} id=LC style='width:{$_WIDTH['e'][$NomFile]}px'{$LTitle}{$ConCheckRadio}>{$_Form[$lin][0]}</label>";
}else{
if( $_Form[$lin][0][0]!=']' ){
if( strtoupper(substr($_Form[$lin][0],0,4))=='<BR>' ){
echo '<br>';
$_Form[$lin][0] = substr($_Form[$lin][0],4);
}
if( substr_count(strtoupper($_Form[$lin][0]),'<BR>')==0 ){
echo "<label for={$sNomField} id=LC".(($_WIDTH['e'][$sNomField]=="")?"":" style='width:".$_WIDTH['e'][$sNomField]."px;' ")."{$LTitle}{$ConCheckRadio}>".$_Form[$lin][0].'</label>';
}else{
echo "<label for={$sNomField} id=LC".(($_WIDTH['e'][$sNomField]=="")?"":" style='width:".$_WIDTH['e'][$sNomField]."px;' ")."{$LTitle}{$ConCheckRadio}>".$_Form[$lin][0].'</label>';
}
}
}
}
if( $_WIDTH['c'][$NomFile]!='' ) echo "<span style='width:{$_WIDTH['c'][$NomFile]}px'>";
if( $_FIELDSET[$NomFile]['I'] ){
$_FIELDSETON = true;
if( $_CARDSHOW ){
echo "<DIV class='card-inside'>";
}else{
echo '<FIELDSET class=CAJA style="display:inline;">';
if( $_FIELDSET[$NomFile]['T']!='' ) echo "<LEGEND ALIGN='left'>{$_FIELDSET[$NomFile]['T']}</LEGEND>";
}
}
if( $_EnColumna[$NomFile]['I'] ){
echo '<TABLE '.$_EnColumna[$NomFile]['S'].' border=0px cellspacing=0px cellpadding=0px style="border-collapse:collapse;"><TR><TD>';
$_EnColumnaON = true;
}
if( $_EnLinea[$NomFile]['I'] ){
echo '<TABLE '.$_EnLinea[$NomFile]['S'].' cellspacing=0px cellpadding=0px style="border-collapse:collapse;"><TR><TD>';
$_EnLineaON = true;
}
if( $_ADDCODE[$NomFile]['S']!='' ) echo $_ADDCODE[$NomFile]['S'];
$Formato = '';
if( $_Form[$lin][0][0]==']' ){
$Formato = 'V';
$_Form[$lin][0] = substr($_Form[$lin][0],1);
echo '<TABLE border=0px cellspacing=0px cellpadding=0px style="border-collapse:collapse; float:left;" eLabelField=V';
if( $_ADDCODE[$NomFile][']']!='' ) echo ' '.$_ADDCODE[$NomFile][']'];
echo '>';
echo "<TR LF=V><TD id=v{$LTitle}>".$_Form[$lin][0];
echo '<TR LF=V><TD id=c>';
}
if( $_ADDCODE[$NomFile]['B']!='' ){
if( substr($_ADDCODE[$NomFile]['B'],-1)==')' && strpos($_ADDCODE[$NomFile]['B'],'(')>0 ){
echo _ExeEval( $_ADDCODE[$NomFile]['B'], '[AddCode] '.$Opcion.' | '.$NomFile.' | B |'.$_ADDCODE[$NomFile]['B'] );
}else{
echo $_ADDCODE[$NomFile]['B'];
}
}
$SoloSelect = false;
$Valor = $_Form[$lin][_VALUE];
if( GenControl($_Form[$lin], $Valor, $Opcion, $NumForm, $Fila, $_Form, $lin, -1, $SoloSelect) ){
if( $SoloSelect ){
if( $Campo1=='#' ) $Campo1 = '_INPUT_'.$NomFile;
}else if( $Campo1=='#' ){
$Campo1 = $NomFile;
if( $_Form[$lin][3]=='M' ) $Campo1 = $NomFile.'[]';
}
}
echo $__Enter;
if( $_ADDCODE[$NomFile]['A']!='' ){
if( substr($_ADDCODE[$NomFile]['A'],-1)==')' && strpos($_ADDCODE[$NomFile]['A'],'(')>0 ){
echo _ExeEval( $_ADDCODE[$NomFile]['A'], '[AddCode] '.$Opcion.' | '.$NomFile.' | A |'.$_ADDCODE[$NomFile]['A'] );
}else{
if( strip_tags($_ADDCODE[$NomFile]['A'])==$_ADDCODE[$NomFile]['A'] ){
echo "<label for={$sNomField} id=LE>".$_ADDCODE[$NomFile]['A'].'</label>';
}else{
echo $_ADDCODE[$NomFile]['A'];
}
}
}
if( $Formato=='V' )					echo '</table>';
if( $_ADDCODE[$NomFile]['E']!='' )	echo $_ADDCODE[$NomFile]['E'];
if( $_WIDTH['c'][$NomFile]!='' )	echo '</span>';
if( $_EnLineaON && $_EnLinea[$NomFile]['F'] ){
echo '</table>';
$_EnLineaON = false;
$_StyleTR = "";
}
if( $_EnColumnaON && $_EnColumna[$NomFile]['F'] ){
echo '</table>';
$_EnColumnaON = false;
$_StyleTR = "";
}
if( $_FIELDSET[$NomFile]['F'] ){
$_FIELDSETON = false;
if( $_CARDSHOW ){
echo "</div>";
}else{
echo '</fieldset>';
$_StyleTR = "";
}
}
}
}
if( $_NewNColumnas[$NomFile]['F'] ){
$_TCol = $_sTCol;
$_StyleTR = "";
echo '</td></tr></table>';
if( $ncBorder!='' ) echo '</fieldset>';
echo '</td></tr>';
}
}
if( !$_CARDSHOW ) echo '</tr>';
return NombreCampo($Campo1);
}
function SubTitulo($TCol, $Titulo, $Form, $NumForm){
global $_StyleTR, $__Lng, $_OnlyVisibleGroup, $_CARDSHOW;
$Titulo = EnPlural($Titulo, '', false, '', 1);
if( $Form[7]!='' ) $Form[7] = " title='{$Form[7]}'";
if( $_SESSION["HRTypeTab"] && $Titulo!='' ){
if( substr_count('+-', $Form[3])==0 ) $Titulo = str_replace('{ICON}','',$Titulo);
if( substr_count(strtoupper($Titulo), '{ICON}')>0 ){
$_StyleTR = "";
$IconoTab = '<i class="ICONWINDOW" title="'.$__Lng[((substr_count('+',$Form[3])>0)?129:130)].'" titleOn="'.$__Lng[129].'" titleOff="'.$__Lng[130].'" style="font-size:50%;vertical-align:middle;cursor:pointer">'.((substr_count('+',$Form[3])>0)?"d":"c").'</i>';
$i = strpos($Titulo,'{');
if( $i==0 ){
$Titulo = trim(substr($Titulo,$i+6));
}else{
$Titulo = trim(substr($Titulo,0,-6));
}
}
if( $_CARDSHOW ){
echo "<div class='card-title'>$Titulo</div>";
}else{
$SePulsa = '';
echo '<td class="TABMenuOne" colspan='.($TCol).'>';
echo '<TABLE class="TABMenu" style="width:100%; border-collapse:collapse;" border=0px cellspacing=0px cellpadding=0px'.((count($Form)>1 && $Form[2]!="")? " ".$Form[2]:"").'><tr>';
echo "<TD class='TABMenuSeparator'>&nbsp;</TD>";
echo "<TD class='TABMenuOn TABOnly' nowrap title='{$xTitle[$nc]}' style='white-space:nowrap;'{$Form[7]}";
if( substr_count($Form[3], '?') ){
$Form[3] = str_replace('?','',$Form[3]);
$_OnlyVisibleGroup = true;
echo " eFRM={$NumForm}";
}
if( substr_count('+-', $Form[3])>0 ){
if( $Form[3]=='+' ){
echo ' VerTr="block"';
}else if( $Form[3]=='-' ){
echo ' VerTr="none"';
$_StyleTR = ' style="display:none;"';
}
echo ' onclick="'.(($_OnlyVisibleGroup)?'eHideGroups();':'').'eShowGroup(this)"';
$SePulsa = "cursor:pointer";
}else $SePulsa = "cursor:default;";
if( $SePulsa!='' ) echo " style='{$SePulsa}'";
echo '>';
if( $IconoTab!='' ){
echo "<table width=1px border=0px cellspacing=0px cellpadding=0px style='border-collapse:collapse;'><tr>";
echo "<td style='border-width:0px;width:1px;{$SePulsa}'>".$IconoTab.'</TD>';
echo "<td style='border-width:0px;{$SePulsa}'>".$Titulo.'</TD>';
echo '</tr></table>';
}else{
echo $Titulo;
}
echo '</TD>';
echo '<TD class="TABMenuSeparator" style="width:100%">&nbsp;</TD>';
echo '</TR></TABLE>';
}
return;
}
$_StyleTR = '';
if( $Form[1]=='#' ){
echo '<td colspan='.($TCol).' '.$Form[2].'>'.$Form[3];
return;
}
if( empty($Titulo) ){
if( $_CARDSHOW ){
echo '<div class="card-separator"></div>';
}else{
echo "<td colspan={$TCol} height='3px'{$Form[7]}><div class='Separator'";
if( count($Form)>1 && !empty($Form[2]) ) echo " {$Form[2]}";
echo $_StyleTR.'></div>';
}
return;
}
echo "<td colspan={$TCol}{$Form[7]}>";
echo '<table width="100%" cellspacing=0px cellpadding=0px style="border-collapse:collapse;">';
echo '<tr>';
if( empty($Titulo) ){
echo "<td height='3px'><hr";
if( count($Form)>1 && !empty($Form[2]) ) echo " {$Form[2]}";
echo '>';
echo '<th><div align="center"></div>';
}else{
$Proporcion = '';
if( $Form[4]!= '0' ){
if( $Form[4]!='' ) $Proporcion = ' width='.$Form[4]+"px";
if( $Proporcion!='' ){
echo "<td{$Proporcion}><hr {$Form[2]}>";
}else{
echo '<td>';
if( $Form[4]!='100%' ){
if( !empty( $Form[2] ) ){
echo "<hr {$Form[2]}>";
}else{
echo "<hr>";
}
}
}
}else{
echo '<td>';
}
echo '<th class=HR_txt width="1%" valign=middle style="padding: 0px 0px 0px 0px;white-space:nowrap">';
if( substr_count($Form[3],'?') ){
$Form[3] = str_replace('?','',$Form[3]);
$_OnlyVisibleGroup = true;
}
if( substr_count('+-',$Form[3])>0 ){
if( $Form[3]=='+' ){
echo '<div VerTr="block"';
}else if( $Form[3]=='-' ){
echo '<div VerTr="none"';
$_StyleTR = ' style="display:none;"';
}
if( $_OnlyVisibleGroup ) echo " eFRM={$NumForm}";
echo ' onclick="'.(($_OnlyVisibleGroup)?'eHideGroups();':'').'eShowGroup(this)" style="white-space:nowrap;cursor:pointer;white-space:nowrap">';
}
if( $Form[4]!='0' ) echo '&nbsp;&nbsp;';
echo str_replace('{ICON}','<img src=g/t_group_'.((substr_count('+',$Form[3])>0)?0:1).'.gif title="'.$__Lng[((substr_count('+',$Form[3])>0)?129:130)].'" titleOn="'.$__Lng[129].'" titleOff="'.$__Lng[130].'">',$Titulo);
if( $Form[4]!='100%' ) echo '&nbsp;&nbsp;';
if( substr_count('+-',trim($Form[3]))>0 ) echo '</div>';
}
echo '<td>';
if( $Form[4]!= '100%' ){
if( count($Form)>1 && !empty($Form[2]) ){
echo "<hr {$Form[2]}>";
}else{
echo "<hr>";
}
}
echo '</table>';
}


function CrearSelect($NomCampo, $Valor, $Multiple, $AnchoDIV, $ConCalco, $AddCode, $Form){
global $_WHERESELECT, $_ADDOPTION, $_FILLOPTION, $_ADDOPTIONVALUE, $_NM_ATRIBUTE, $_ADDOPTIONIMG, $_SELECTMULTIPLE, $__Enter;
global $_LanguageTables, $_SELECT_DDBB, $_ADDOPTIONSTYLE, $_ADDOPTIONCOLLABEL, $_vF, $_ADDCODE;

$textContent = '';
$ValueText = '';
$oNomCampo = $NomCampo;
if( $ConCalco ) $NomCampo = substr($NomCampo, 1);
$tCampos = 1;
if( substr_count($NomCampo,'{')>0 ){
$n = substr_count(strtoupper($NomCampo),'CONCAT(');
if( $n>0 ){
for($i=0; $i<$n; $i++){
$p = strpos(strtoupper($NomCampo),'CONCAT(')+7;
$txt = substr($NomCampo,0,$p);
for($c=$p; $c<strlen($NomCampo); $c++){
$l = substr($NomCampo,$c,1);
if( $l==',' ) $l = '&#44;';
$txt .= $l;
}
}
$NomCampo = $txt;
}
if( substr_count($NomCampo,"(")==1 && substr_count($NomCampo,")")==1 ){
$i = strpos($NomCampo,"(");
$f = strpos($NomCampo,")");
$sustituir = substr($NomCampo, $i, $f-$i+1);
$NomCampo = str_replace($sustituir, str_replace(',','&#44;',$sustituir), $NomCampo);
}
$NomCampo = str_replace('&#124;','|',$NomCampo);
$tmp = str_replace('{', ',', $NomCampo);
$tmp = str_replace('}', '', $tmp);
$tmp = explode(',', $tmp);
$Tabla = $tmp[1];
$Ordenacion = trim(str_replace('&#44;',',',$tmp[3]));
if( preg_match('/^date_format/i', $Ordenacion) ) $Ordenacion = eMid("(", ",", $Ordenacion);
if( substr_count($Ordenacion,' ')>0 ) $Ordenacion = substr($Ordenacion,strrpos($Ordenacion,' ')+1);
$NomCampo = trim($tmp[0]);
$Campos = trim(str_replace('&#44;',',',$tmp[2]));
$tCampos = count($tmp);
for($i=3; $i<$tCampos; $i++) $Campos .= ','.str_replace('&#44;',',',$tmp[$i]);
$tCampos -= 3;
}else if( substr_count($NomCampo,':')>0 ){
list($NomCampo, $nNomCampo) = explode(':', $NomCampo);
$Tabla = substr($nNomCampo, 3);
if( strpos($_LanguageTables, ",{$Tabla},")===false ){
$Campos = $nNomCampo.', nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
}else{
$Campos = $nNomCampo.', nm_'.$Tabla.'_'.$_SESSION['_LANGUAGE_'];
$Ordenacion = 'nm_'.$Tabla.'_'.$_SESSION['_LANGUAGE_'];
}
}else{
$Tabla = substr($NomCampo,3);
if( strpos($_LanguageTables, ",{$Tabla},")===false ){
$Campos = $NomCampo.', nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
}else{
$Campos = $NomCampo.', nm_'.$Tabla.'_'.$_SESSION['_LANGUAGE_'];
$Ordenacion = 'nm_'.$Tabla.'_'.$_SESSION['_LANGUAGE_'];
}
}

eMultitenancy($Tabla);

if( substr_count($Ordenacion, ' as ')==1 ) list(,$Ordenacion) = explode(' as ', $Ordenacion);
$Condicion = '';
for($i=0; $i<count($_WHERESELECT); $i++){
if( $_WHERESELECT[$i][0]==$NomCampo ){
if( substr_count( $_WHERESELECT[$i][1], 'order by ' )==1 ){
list( $tmpW, $tmpO ) = explode('order by ',$_WHERESELECT[$i][1]);
$Ordenacion = $tmpO;
$_WHERESELECT[$i][1] = $tmpW;
}else if( substr($_WHERESELECT[$i][1],-4)=='desc' ){
$Ordenacion .= ' desc';
$_WHERESELECT[$i][1] = substr($_WHERESELECT[$i][1],0,-4);
}
$_WHERESELECT[$i][1] = _InVar($_WHERESELECT[$i][1]);
if( $_WHERESELECT[$i][1]!='' ){
if( $Condicion!='' ) $Condicion .= ' and ';
$Condicion .= $_WHERESELECT[$i][1];
}
break;
}
}
$xNomCampo = $NomCampo;
if( $ConCalco ) $xNomCampo = '_'.$NomCampo;
$Prefijo = (($_SELECTMULTIPLE[$NomCampo]!='')? '_':'');
$colLabel = "";
if( $_ADDOPTIONCOLLABEL[$NomCampo]<>"" ){
$cmp = eMid($_ADDOPTIONCOLLABEL[$NomCampo], "$", "=");
$val = str_replace(array("'",'"'), array("",""), explode("==", $_ADDOPTIONCOLLABEL[$NomCampo])[1]);
if( $_vF[$cmp]==$val ){
$colLabel = " eColLabel=2 class='col_1n col_2b'";
}
}
$class="";
if( $_ADDOPTIONVALUE[$NomCampo]!='' ){
$class = "";
if( $_ADDCODE[$xNomCampo]['F']!="" ) $class = $_ADDCODE[$xNomCampo]['F'];
$tmp = explode(',',str_replace(' ','',$_ADDOPTIONVALUE[$NomCampo]));
for($i=($colLabel==""?2:3); $i<count($tmp)+2; $i++){
$class .= " col_{$i}n";
}
$class = " class='".trim($class)."'";
}else if( $_ADDCODE[$xNomCampo]['F']!="" ){
$class = " class='".$_ADDCODE[$xNomCampo]['F']."'";
}
if( substr_count($AnchoDIV, ",")>0 ) list(,$AnchoDIV) = explode(",",$AnchoDIV);

echo '<DIV class="SELECT EDITABLE SCROLLBAR"'.(($AnchoDIV!='') ? " style='width:{$AnchoDIV}px'":"").'>';
echo "<TABLE id='{$Prefijo}{$xNomCampo}_TABLE' cols=2{$colLabel}{$class}>".$__Enter;
echo '<COL><COL>'.$__Enter;

$Dim = array(); $ii = -1;
$SetUno = false;
if( !$_FILLOPTION[$NomCampo] ){
if( $_ADDOPTIONVALUE[$NomCampo]!='' ){
$tmp = explode(',',str_replace(' ','',$_ADDOPTIONVALUE[$NomCampo]));
for($i=0; $i<count($tmp); $i++) echo '<COL NM_ATRIBUTE='.$tmp[$i].'>';
$Dim[++$ii] = array('','&nbsp;');
for($i=0; $i<count($tmp); $i++) $Dim[$ii][$i+2] = '&nbsp;';
}else{
$Dim[++$ii] = array('','&nbsp;');
if( $_ADDOPTIONVALUE[$NomCampo]!='' ){
$tmp = explode(',',str_replace(' ','',$_ADDOPTIONVALUE[$NomCampo]));
for($i=0; $i<count($tmp); $i++) $Dim[$ii][$i+2] = '&nbsp;';
}
}
}else if( $Valor=='' ){
$SetUno = true;
}else{
}

if( preg_match("/^ADDOPTION=/i",str_replace(' ','',trim($AddCode))) ){
$txt = substr(str_replace(' ','',trim($AddCode)),11,-1);
$fi = explode(';',$txt);
for($f=0; $f<count($fi); $f++){
$dt = explode(',',$fi[$f]);
$Dim[++$ii] = array(trim($dt[0]), trim($dt[1]));
$TotalOptions++;
}
}

if( !empty($_ADDOPTION[$NomCampo]) ){
if( substr_count($_ADDOPTION[$NomCampo], '()')==1 ){
if( substr($_ADDOPTION[$NomCampo],-2)=="()" ){
$_ADDOPTION[$NomCampo] = substr($_ADDOPTION[$NomCampo],0,-2)."(11)";
}else if( substr($_ADDOPTION[$NomCampo],-3)=="();" ){
$_ADDOPTION[$NomCampo] = substr($_ADDOPTION[$NomCampo],0,-3)."(22);";
}
$_ADDOPTION[$NomCampo] = trim($_ADDOPTION[$NomCampo]);
if( substr($_ADDOPTION[$NomCampo],-1)!=';' ) $_ADDOPTION[$NomCampo] .= ';';
$tmp = @eval('return '.$_ADDOPTION[$NomCampo]);
for($i=0; $i<count($tmp); $i++){
if( $Valor==trim($tmp[$i][0]) ){
$textContent = trim($tmp[$i][1]);
$ValueText = trim($tmp[$i][0]);
}
$Dim[++$ii] = array(trim($tmp[$i][0]), ((trim($tmp[$i][1])=='') ? '&nbsp;':trim($tmp[$i][1])) );
}
}elseif( substr(strtoupper($_ADDOPTION[$NomCampo]),0,7)=='SELECT ' ){
global $_ADDOPTIONBLANK;
if( $_ADDOPTIONBLANK[$NomCampo] ) $Dim[++$ii] = array('','');
qQuery(_InVar($_ADDOPTION[$NomCampo]), $p1);
while( $r=qRow($p1) ) $Dim[++$ii] = array(trim($r[0]), ((trim($r[1])=='') ? trim($r[0]) : trim($r[1])));
}else{
$tmp = explode(';', $_ADDOPTION[$NomCampo]);
for($i=0; $i<count($tmp); $i++){
$tmp1 = _DivideOption($tmp[$i]);
if( $Valor==$tmp1[0] ){
$textContent = $tmp1[1];
$ValueText = $tmp1[0];
}
$Dim[++$ii] = array($tmp1[0], (($tmp1[1]=='')? '&nbsp;':$tmp1[1]));
}
}
}
$textContent2 = '';

if( $_ADDOPTIONVALUE[$NomCampo]!='' ){
qSelect($Tabla, $Campos.','.$_ADDOPTIONVALUE[$NomCampo], $Condicion, $Ordenacion);
$tmp = explode(',',str_replace(' ','',$_ADDOPTIONVALUE[$NomCampo]));
$tc = count($tmp);
while( $row = qRow() ){
if( $Valor==trim($row[0]) || $SetUno ){
PoneValorAlSelect( $oNomCampo, $row[0] );
$textContent = trim($row[1]);
$ValueText = trim($row[0]);
$textContent2= trim($row[2]);
for($i=2; $i<count($row)-$tc; $i++) $textContent .= $row[$i];
}
$SetUno = false;
if( $_ADDOPTIONVALUE[$NomCampo]=='img_sel' && trim($row[2])!='' ){
if( isset($_ADDOPTIONIMG[$NomCampo]) ){
$Ext = substr( $row[2], strrpos($row[2],'.') );
$Dim[++$ii] = array( trim($row[0]), '<img src="g/'.$_ADDOPTIONIMG[$NomCampo].trim($row[0]).$Ext.'" style="margin-right:3px">'.trim($row[1]) );
}else{
$Dim[++$ii] = array( trim($row[0]), '<img src="g/'.trim($row[2]).'" style="margin-right:3px">'.trim($row[1]) );
}
}else{
$Dim[++$ii] = array(trim($row[0]), trim($row[1]));
for($i=2; $i<count($row)-$tc; $i++) $Dim[$ii][1] .= $row[$i];
$nc = 0; for($i=count($row)-$tc; $i<count($row); $i++) $Dim[$ii][] = trim($row[$i]);
}
}
qFree();
}else{

if( isset($_SELECT_DDBB[$NomCampo]) && $GLOBALS['_Sql']<>$_SELECT_DDBB[$NomCampo][0] ){
eInclude($_SELECT_DDBB[$NomCampo][0].'.class');
switch( $_SELECT_DDBB[$NomCampo][0] ){
case 'mysql':
$db = new eMySql();
break;
case 'mysqli':
$db = new eMySqli();
break;
case 'informix':
$db = new eInformix();
break;
case 'oracle':
$db = new eOracle();
break;
case 'pdo':
$db = new ePdo();
break;
}
$db->qConnect($_SELECT_DDBB[$NomCampo][1]);
$xCondicion = (($Condicion!='') ? ' where '.$Condicion : '' );
$xOrdenacion = (($Ordenacion!='') ? ' order by '.$Ordenacion : '' );
$db->qQuery("select {$Campos} from {$Tabla} {$xCondicion} {$xOrdenacion}");
while( $row = $db->qRow() ){
if( $Valor==trim($row[0]) || $SetUno ){
PoneValorAlSelect($oNomCampo, $row[0]);
$textContent = trim($row[1]);
$ValueText = trim($row[0]);
$textContent2= trim($row[2]);
for($i=2; $i<=$tCampos; $i++) $textContent .= $row[$i];
}
$SetUno = false;
$Dim[++$ii] = array(trim($row[0]), trim($row[1]));
for($i=2; $i<=$tCampos; $i++) $Dim[$ii][1] .= $row[$i];
}
$db->qEnd();
}else{

qSelect($Tabla, $Campos, $Condicion, $Ordenacion);

while( $row=qRow() ){
if( $Valor==trim($row[0]) || $SetUno ){
PoneValorAlSelect($oNomCampo, $row[0]);
$textContent = trim($row[1]);
$ValueText = trim($row[0]);
$textContent2= trim($row[2]);
for($i=2; $i<=$tCampos; $i++) $textContent .= $row[$i];
}
$SetUno = false;
$Dim[++$ii] = array(trim($row[0]), trim($row[1]));
for($i=2; $i<=$tCampos; $i++) $Dim[$ii][1] .= $row[$i];
}
qFree();
}
}

$sDim = array();
for($f=0; $f<count($Dim); $f++) $sDim[] = implode("\t", $Dim[$f])."\t".$f;
sort($sDim);
$iDim = array();
for($f=0; $f<count($sDim); $f++){
$tmp = explode("\t", $sDim[$f]);
$iDim[$f] = array($tmp[0], $tmp[count($tmp)-1]);
}

//if($_SESSION['_User']==88) ePrintR($Dim,$sDim,$iDim);

$pr=0;
for($f=0; $f<count($Dim); $f++){

	if( $Dim[$f][0]=='~' ){
		echo '<tr v="" r="'.$pr.'" class="Line"><td><td>';
	}else{

		echo '<TR v="'.strtoupper($iDim[$f][0]).'" r='.($iDim[$f][1]+$pr).'>';

		for($c=0; $c<count($Dim[$f]); $c++){
			if( $c==1 && $_ADDOPTIONSTYLE[$NomCampo][$f]!='' ){
				echo '<td style="'.trim($_ADDOPTIONSTYLE[$NomCampo][$f]).'">'.$Dim[$f][$c];
			}else{
				echo '<td>'.$Dim[$f][$c];
			}
		}

		if( $f==0 && $Dim[$f][0]=='' && $Form[19]!='#' && $Form[19]!='=' && $GLOBALS['_ModeQuestion'] && $GLOBALS['_QuestionsEmptyData'] ){
			if( strpos('bcm',$GLOBALS['_Mode'])!==false ){
				_ShowQuestionsEmptyData( count($Dim[$f]) );
				$pr += 2;
			}
		}
	}
}

echo '</TABLE></DIV>'.$__Enter;
if( $textContent!='' ){
$textContent = str_replace('"'		,'&#34;'	,($colLabel<>"" ? $textContent2:$textContent));
$textContent = str_replace('&quot;'	,'"'		,$textContent);
$textContent = str_replace('&#92;'	,chr(92)	,$textContent);
$textContent = str_replace('&amp;'	,'&'		,$textContent);
$textContent = str_replace('&#43;'	,'+'		,$textContent);
$textContent = str_replace('&#34;'	,'"'		,$textContent);
if( $ConCalco ){
global $_CalcularAnchos;
$_CalcularAnchos[] = "DGI('_{$NomCampo}').value=".'"'.eQuote($ValueText).'";'."DGI('_INPUT__{$NomCampo}').value=".'"'.eQuote($textContent).'";';
}else{
echo "<script type='text/javascript'>DGI('{$NomCampo}').value=".'"'.eQuote($ValueText).'";'."DGI('_INPUT_{$NomCampo}').value=".'"'.eQuote($textContent).'";</script>';
}
}

return $textContent;
}


function _ShowQuestionsEmptyData($nc=2){
global $_QuestionsEmptyDataStyle, $__Lng;
if( $_QuestionsEmptyDataStyle=='' ){
echo '<TR v="<=" r=1><TD><=<TD>'.$__Lng[162];
echo '<TR v=">" r=2><TD>><TD>'.$__Lng[163];
}else{
echo '<TR v="<=" r=1><TD><=<TD style="'.$_QuestionsEmptyDataStyle.'">'.$__Lng[162];
echo '<TR v=">" r=2><TD>><TD style="'.$_QuestionsEmptyDataStyle.'">'.$__Lng[163];
}
for($c=2; $c<$nc; $c++) echo '<td>';
}
function PoneValorAlSelect($NomCampo, $Valor){
global $_Form;
for($n=0; $n<count($_Form); $n++){
if( $_Form[$n][1]==$NomCampo ){
$_Form[$n][_VALUE] = $Valor;
return;
}
}
}
function CrearSelectTAB( $NomCampo, $Valor ){
global $_WHERESELECT, $_FILLOPTION;
$condicion = '';
for($i=0; $i<count($_WHERESELECT); $i++){
if( $_WHERESELECT[$i][0]==$NomCampo ) {
$_WHERESELECT[$i][1] = _InVar($_WHERESELECT[$i][1]);
$condicion = $_WHERESELECT[$i][1];
break;
}
}
$Tabla = substr(strchr($NomCampo,'_'), 1);
$Campos = $NomCampo.', nm_'.$Tabla.', nivel';
if( $GLOBALS[_Sql]=='informix' ) $Campos = $Campos.',orden';
qSelect( $Tabla, $Campos, $condicion, 'orden' );
if( !$_FILLOPTION[$NomCampo] ) echo '<OPTION VALUE="">';
while( $row = qRow() ){
if( $Valor==trim($row[0]) )
echo '<OPTION SELECTED VALUE="'.$row[0].'">'.str_repeat( "&nbsp;", $row[2]*3 ).trim($row[1]);
else
echo '<OPTION VALUE="'.$row[0].'">'.str_repeat( "&nbsp;", $row[2]*3 ).trim($row[1]);
}
qFree();
}
function ValorDelSelect( $NomCampo, $Valor ){
if( substr_count($NomCampo,'{')>0 ){
$tmp = str_replace( '{', ',', $NomCampo );
$tmp = str_replace( '}', '', $tmp );
$tmp = explode( ',', $tmp );
$Tabla = $tmp[1];
$NomCampo = trim($tmp[2]);
$Campos = $tmp[2];
$tCampos = count($tmp);
for( $i=3; $i<$tCampos; $i++ ) $Campos .= ','.$tmp[$i];
}else if( substr_count($NomCampo,':')>0 ){
list( $NomCampo, $nNomCampo ) = explode( ':', $NomCampo );
$Tabla = substr($nNomCampo,3);
$Campos = $nNomCampo.', nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
$tCampos = 1;
$NomCampo = $nNomCampo;
}else{
$tCampos = 1;
$Tabla = substr( strchr($NomCampo,'_'), 1 );
$Campos = $NomCampo.', nm_'.$Tabla;
}
qSelect($Tabla, $Campos, "{$NomCampo}='{$Valor}'", "");
$row = qRow();
$row[1] = trim($row[1]);
$Valor = $row[1];
for( $i=2; $i<=$tCampos; $i++ ){
echo $row[$i];
$Valor .= $row[$i].'';
}
qFree();
return $Valor;
}
function SelectDeBaja($NomCampo, $Valor){
global $_vF;
$tCampos = 1;
if( substr_count($NomCampo,'{')>0 ){
if( substr_count($NomCampo,"(")==1 && substr_count($NomCampo,")")==1 ){
$i = strpos($NomCampo,"(");
$f = strpos($NomCampo,")");
$sustituir = substr($NomCampo, $i, $f-$i+1);
$NomCampo = str_replace($sustituir, str_replace(',','&#44;',$sustituir), $NomCampo);
}
$NomCampo = str_replace('&#124;','|',$NomCampo);
$tmp = str_replace('{', ',', $NomCampo);
$tmp = str_replace('}', '', $tmp);
$tmp = explode(',', $tmp);
$Tabla = $tmp[1];
$Ordenacion = trim(str_replace('&#44;',',',$tmp[3]));
if( preg_match('/^date_format/i', $Ordenacion) ) $Ordenacion = eMid("(", ",", $Ordenacion);
if( substr_count($Ordenacion,' ')>0 ) $Ordenacion = substr($Ordenacion,strrpos($Ordenacion,' ')+1);
$NomCampo = $tmp[2];
$Campos = trim(str_replace('&#44;',',',$tmp[2]));
$sNomCampo = trim($tmp[0]);
$tCampos = count($tmp);
for($i=3; $i<$tCampos; $i++) $Campos .= ','.str_replace('&#44;',',',$tmp[$i]);
}else if( substr_count($NomCampo,':')>0 ){
list( $NomCampo,$nNomCampo ) = explode(':', $NomCampo);
$Tabla = substr($nNomCampo, 3);
$Campos = $nNomCampo.', nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
$NomCampo = $nNomCampo;
$sNomCampo = $NomCampo;
}else{
$Tabla = substr($NomCampo, 3);
$Campos = $NomCampo.', nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
$sNomCampo = $NomCampo;
}
eMultitenancy($Tabla);
$Condicion = '';
for($i=0; $i<count($_WHERESELECT); $i++){
if( $_WHERESELECT[$i][0]==$NomCampo ){
if( substr_count($_WHERESELECT[$i][1], 'order by ')==1 ){
list($tmpW, $tmpO) = explode('order by ',$_WHERESELECT[$i][1]);
$Ordenacion = $tmpO;
$_WHERESELECT[$i][1] = $tmpW;
}else if( substr($_WHERESELECT[$i][1],-4)=='desc' ){
$Ordenacion .= ' desc';
$_WHERESELECT[$i][1] = substr($_WHERESELECT[$i][1],0,-4);
}
$_WHERESELECT[$i][1] = _InVar($_WHERESELECT[$i][1]);
if( $_WHERESELECT[$i][1]!='' ){
if( $Condicion!='' ) $Condicion .= ' and ';
$Condicion .= $_WHERESELECT[$i][1];
}
break;
}
}
if( $Condicion<>'' ) $Condicion = ' and '.$Condicion;
qSelect($Tabla, $Campos, "{$NomCampo}='{$Valor}'".$Condicion, $Ordenacion);
$row = qRow();
$xValor = trim($row[1]);
for($i=2; $i<=$tCampos; $i++) $xValor .= $row[$i];
qFree();
if( $xValor=='' ){
global $_ADDOPTION;
if( !empty($_ADDOPTION[$NomCampo]) ){
if( substr_count($_ADDOPTION[$NomCampo], '()')==1 ){
$_ADDOPTION[$NomCampo] = trim($_ADDOPTION[$NomCampo]);
if( substr($_ADDOPTION[$NomCampo],-1)!=';' ) $_ADDOPTION[$NomCampo] .= ';';
$tmp = @eval('return '.$_ADDOPTION[$NomCampo]);
for($i=0; $i<count($tmp); $i++){
if( $Valor==trim($tmp[$i][0]) ) return trim($tmp[$i][1]);
}
}elseif( substr(strtoupper($_ADDOPTION[$NomCampo]),0,7)=='SELECT ' ){
qQuery(_InVar($_ADDOPTION[$NomCampo]), $p1);
while( $r=qRow($p1) ) if( $Valor==trim($r[0]) ) return ( (trim($r[1])=='') ? trim($r[0]) : trim($r[1]) );
}else{
$tmp = explode(';', $_ADDOPTION[$NomCampo]);
for($i=0; $i<count($tmp); $i++){
$tmp1 = _DivideOption($tmp[$i]);
if( $Valor==$tmp1[0] ) return $tmp1[1];
}
}
}
}
$xValor = str_replace('"'		,'&#34;'	,$xValor);
$xValor = str_replace('&quot;'	,'"'		,$xValor);
$xValor = str_replace('&#92;'	,chr(92)	,$xValor);
$xValor = str_replace('&amp;'	,'&'		,$xValor);
$xValor = str_replace('&#43;'	,'+'		,$xValor);
return $xValor;
}
function _ShowCheckList( $Form, $NomCampo, $ModoCampo, $Long, $Opcion, $Valor, $NCol, $Sql, $Activo ){
global $_CHECKLIST, $_ADDCODE;
if( $Opcion!='a' ){
$Dim = explode(',', $Valor);
foreach( $Dim as $k ) $Dim[$k] = 1;
}else $Dim = array();
if( $NCol=='' ) $NCol = 1;
$Sql = trim($Sql);
if( substr_count($Sql,'()')==1 ){
$DimCheck = eval("return {$Sql};");
}else if( preg_match("/^SELECT /i",$Sql) ){
if( $NCol==-1 ){
list(,$Tabla) = explode(' from ',$Sql);
list($Tabla) = explode(' ',trim($Tabla));
$NCol = qCount( $Tabla );
}
qQuery( $Sql );
}else if( preg_match("/^CD_/i",$Sql) ){
$Tabla = substr( $Sql, 3 );
if( $NCol==-1 ) $NCol = qCount( $Tabla );
qQuery( "select cd_{$Tabla}, nm_{$Tabla} from {$Tabla} order by 2" );
}else if( substr_count($Sql,',')==substr_count($Sql,';')+1 && substr_count($Sql,',')>1 ){
$DimCheck = explode(';',$Sql);
for( $n=0; $n<count($DimCheck); $n++ ) $DimCheck[$n] = explode(',',$DimCheck[$n]);
}else{
eMessage('ERROR: Definición de [CheckList] no soportada', 'HSE');
}
if( $_ADDCODE[$Form[_OFIELD]]['S']!='' ) echo $_ADDCODE[$Form[_OFIELD]]['S'];
if( $_ADDCODE[$Form[_OFIELD]]['B']!='' ) echo $_ADDCODE[$Form[_OFIELD]]['B'];
if( $_CHECKLIST[$Form[_OFIELD]][4]>0 ) echo '<div class=CheckListContainer style="overflow:auto; height:'.$_CHECKLIST[$Form[_OFIELD]][4].'px">';
if( $_CHECKLIST[$Form[_OFIELD]][4]==='0' ) echo '<div class=CheckListContainer style="">';
echo "<table id=CheckList_{$NomCampo} class=CheckList cellspacing=1px cellpadding=1px border=0px style='border-collapse:collapse;'";
if( $Activo ){
echo " onclick=CheckList('{$NomCampo}')";
$SolLectura = '';
}else{
$SolLectura = " class='OFF' style='cursor:default;'";
}
if( $_ADDCODE[$Form[_OFIELD]]['I']!='' ) echo $_ADDCODE[$Form[_OFIELD]]['I'];
echo '>';
for( $n=0; $n<$NCol; $n++ ) echo '<col class=CheckListImg><col id=o><col class=CheckListText>';
$i = $NCol;
if( isset($DimCheck) ){
for($n=0; $n<count($DimCheck); $n++){
$r=$DimCheck[$n];
if( $i==$NCol ) echo '<tr>';
$i--;
if( $i==0 ) $i = $NCol;
$r[0] = trim($r[0]); $r[1] = trim($r[1]);
$tf = (isset($Dim[$r[0]]) && $Dim[$r[0]]==1) ? 1 : 0;
echo "<td e={$tf} id=cLista>";
if( $Activo ){
$sActivo = ' class="EDITABLE" eWE=1';
}else{
$sActivo = ' class="READONLY" readonly=true disabled onfocus="document.body.focus()"';
}
if( $OnChange=="" ){
$OnChange = " onchange='this.value=(this.checked?\"S\":\"\")'";
}else{
if( substr($OnChange,-2)=="}'" ){
$OnChange = substr($OnChange,0,-2).';this.value=(this.checked?"S":"");'.substr($OnChange,-2);
}else{
$OnChange = substr($OnChange,0,-1).';this.value=(this.checked?"S":"");'.substr($OnChange,-1);
}
}
echo "<INPUT NAME='__{$NomCampo}' id='__{$NomCampo}' e='{$tf}' TYPE='checkbox' Diferente='' CheckBox=1 CONIMAGEN=1 SIZE=1 VALUE=\"{$Valor}\"{$Activo}{$OnChange}{$_SubModo}{$sActivo}";
if( $tf ) echo " checked";
if( $Form[_STATUS]!='V' ){
}else{
if( $_ADDCODE[$Form[_OFIELD]]["I"]!='' ) echo $_ADDCODE[$Form[_OFIELD]]["I"];
echo ' onclick="return false;"';
}
echo "{$_AutoComplet}>";
echo '<td id=o>'.$r[0].'<td>'.$r[1];
}
}else{
while( $r=qRow() ){
if( $i==$NCol ) echo '<tr>';
$i--;
if( $i==0 ) $i = $NCol;
$r[0] = trim($r[0]); $r[1] = trim($r[1]);
$tf = (isset($Dim[$r[0]]) && $Dim[$r[0]]==1) ? 1 : 0;
echo "<td e={$tf} id=cLista>";
if( $Activo ){
$sActivo = ' class="EDITABLE" eWE=1';
}else{
$sActivo = ' class="READONLY" readonly=true disabled onfocus="document.body.focus()"';
}
if( $OnChange=="" ){
$OnChange = " onchange='this.value=(this.checked?\"S\":\"\")'";
}else{
if( substr($OnChange,-2)=="}'" ){
$OnChange = substr($OnChange,0,-2).';this.value=(this.checked?"S":"");'.substr($OnChange,-2);
}else{
$OnChange = substr($OnChange,0,-1).';this.value=(this.checked?"S":"");'.substr($OnChange,-1);
}
}
echo "<INPUT NAME='__{$NomCampo}' id='__{$NomCampo}' e='{$tf}' TYPE='checkbox' Diferente='' CheckBox=1 CONIMAGEN=1 SIZE=1 VALUE=\"{$Valor}\"{$Activo}{$OnChange}{$_SubModo}{$sActivo}";
if( $tf ) echo " checked";
if( $Form[_STATUS]!='V' ){
}else{
if( $_ADDCODE[$Form[_OFIELD]]["I"]!='' ) echo $_ADDCODE[$Form[_OFIELD]]["I"];
echo ' onclick="return false;"';
}
echo "{$_AutoComplet}>";
echo '<td id=o>'.$r[0].'<td>'.$r[1];
}
}
echo '</table>';
if( $_CHECKLIST[$Form[_OFIELD]][4]>0 || $_CHECKLIST[$Form[_OFIELD]][4]==='0' ) echo '</div>';
if( $_ADDCODE[$Form[_OFIELD]]['A']!='' ) echo $_ADDCODE[$Form[_OFIELD]]['A'];
if( $_ADDCODE[$Form[_OFIELD]]['E']!='' ) echo $_ADDCODE[$Form[_OFIELD]]['E'];
$aLong = strlen($Valor);
echo "<INPUT NAME='{$NomCampo}' ID='{$NomCampo}' Long='{$aLong}' TYPE='HIDDEN' VALUE=\"{$Valor}\" class='READONLY' READONLY=true SIZE={$Long} eCheckList=1{$_AutoComplet}>";
}
function _ShowRadioList( $Form, $NomCampo, $ModoCampo, $Long, $Opcion, $Valor, $NCol, $Sql, $Activo ){
global $_RADIOLIST, $_ADDCODE;
if( $NCol=='' ) $NCol = 1;
$Sql = trim($Sql);
if( substr_count($Sql,'()')==1 ){
$DimCheck = eval("return {$Sql};");
}else if( preg_match("/^SELECT /i",$Sql) ){
if( $NCol==-1 ){
list(,$Tabla) = explode(' from ',$Sql);
list($Tabla) = explode(' ',trim($Tabla));
$NCol = qCount( $Tabla );
}
qQuery( $Sql );
}else if( preg_match("/^CD_/i",$Sql) ){
$Tabla = substr( $Sql, 3 );
if( $NCol==-1 ) $NCol = qCount( $Tabla );
qQuery( "select cd_{$Tabla}, nm_{$Tabla} from {$Tabla} order by 2" );
}else if( substr_count($Sql,',')==substr_count($Sql,';')+1 && substr_count($Sql,',')>1 ){
$DimCheck = explode(';',$Sql);
for( $n=0; $n<count($DimCheck); $n++ ) $DimCheck[$n] = explode(',',$DimCheck[$n]);
}else{
eMessage('ERROR: Definición de [RadioList] no soportada', 'HSE');
}
if( $_ADDCODE[$Form[_OFIELD]]['S']!='' ) echo $_ADDCODE[$Form[_OFIELD]]['S'];
if( $_ADDCODE[$Form[_OFIELD]]['B']!='' ) echo $_ADDCODE[$Form[_OFIELD]]['B'];
if( $_RADIOLIST[$Form[_OFIELD]][3]>0 ) echo '<div class=CheckListContainer style="overflow:auto;height:'.$_RADIOLIST[$Form[_OFIELD]][3].'px">';
if( $_RADIOLIST[$Form[_OFIELD]][3]==='0' ) echo '<div class=CheckListContainer style="">';
echo "<table id=RadioList_{$NomCampo} class=CheckList cellspacing=1px cellpadding=1px border=0px style='border-collapse:collapse;'";
if( $Activo ){
echo " onclick=RadioList('{$NomCampo}')";
$SolLectura = '';
}else{
$SolLectura = " class='OFF' style='cursor:default;'";
}
if( $_ADDCODE[$Form[_OFIELD]]['I']!='' ) echo $_ADDCODE[$Form[_OFIELD]]['I'];
echo '>';
for( $n=0; $n<$NCol; $n++ ) echo '<col class=CheckListImg><col id=o><col class=CheckListText>';
$i = $NCol;
if( isset($DimCheck) ){
for( $n=0; $n<count($DimCheck); $n++ ){
$r=$DimCheck[$n];
if( $i==$NCol ) echo '<tr>';
$i--;
if( $i==0 ) $i = $NCol;
$r[0] = trim($r[0]); $r[1] = trim($r[1]);
$tf = ($Valor==$r[0]) ? 1 : 0;
echo "<td e={$tf} id=cLista>";
echo "<INPUT NAME='__{$NomCampo}' id='__{$NomCampo}' onfocus='S.key()' TYPE='radio' RadioButton=1 value='{$r[0]}' eValue='{$r[0]}'{$EsElValor}{$OnChange}{$Activo}{$_SubModo}";
if( $tf ) echo " checked";
echo "{$_AutoComplet}>";
echo "<td id=o>".$r[0]."<td e-Label='{$NomCampo}_{$r[0]}'>".$r[1];
}
}else{
while( $r=qRow() ){
if( $i==$NCol ) echo '<tr>';
$i--;
if( $i==0 ) $i = $NCol;
$r[0] = trim($r[0]); $r[1] = trim($r[1]);
$tf = ($Valor==$r[0]) ? 1 : 0;
echo "<td e={$tf} id=cLista>";
echo "<INPUT NAME='__{$NomCampo}' id='__{$NomCampo}' onfocus='S.key()' TYPE='radio' RadioButton=1 value='{$r[0]}' eValue='{$r[0]}'{$EsElValor}{$OnChange}{$Activo}{$_SubModo}";
if( $tf ) echo " checked";
echo "{$_AutoComplet}>";
echo "<td id=o>".$r[0]."<td e-Label='{$NomCampo}_{$r[0]}'>".$r[1];
}
}
echo '</table>';
if( $_RADIOLIST[$Form[_OFIELD]][3]>0 || $_RADIOLIST[$Form[_OFIELD]][3]==='0' ) echo '</div>';
if( $_ADDCODE[$Form[_OFIELD]]['A']!='' ) echo $_ADDCODE[$Form[_OFIELD]]['A'];
if( $_ADDCODE[$Form[_OFIELD]]['E']!='' ) echo $_ADDCODE[$Form[_OFIELD]]['E'];
$aLong = strlen($Valor);
echo "<INPUT NAME='{$NomCampo}' Long='{$aLong}' TYPE='HIDDEN' VALUE=\"{$Valor}\" class='READONLY' READONLY=true SIZE={$Long} eRadioList=1{$_AutoComplet}>";
}
function GenControl(&$Form, $Valor, $Opcion, $NumForm, $Fila, $_Form, $lin, $NumCol, &$SoloSelect=NULL, $ConAuxFilter=false){
global $_MIRROR, $_EDITMIRROR, $_DimPaste, $_SELINFO, $_ONCHANGE, $_NOEDITFILLED, $_ADDOPTION, $_NOEDIT, $_CheckDBIndex, $_DimCheckDBIndex, $_Mode;
global $_ADDCODE, $_TIPFORM, $_BCP, $_WidthField, $_RELATIONFIELDS, $_ValorDefault, $_Sql, $_SUBLISTDF, $_OnLineOP, $__Enter, $_SubModoAlta;
global $_DefaultPaste, $_CalcularAnchos, $_LineForm, $_NM_ATRIBUTE, $_SELECTMULTIPLE, $__Lng, $_CheckBoxSave, $_DBINDEX, $_DimRecalc, $_CARDSHOW;
global $_ADDOPTIONSTYLE, $_RELATIONJUMP, $_FIELDSETON, $_ContextFieldsMD5, $_DimColsWidth, $_SELECTTREE, $_LINKFIELD, $_AutoComplet, $_SELECTMULTIPLEBOX;
if( $Form[3][0]=="T" && substr_count($Form[5],",")>0 ) $Form[5] = explode(",", $Form[5])[1];
$xStyle = "";
$iconos = [];
$Form5 = $Form[5];
$Invisible = ($Form[_STATUS]=='I');
if( $_CARDSHOW && !$Invisible ){
echo "<DIV class='card-row'><DIV class='card-td100'>";
$Form[6] = str_replace("#", "", $Form[6]);
}
if( $Form[1][0]<>"_" ){
$NomCampo = NombreCampo($Form[1]);
$_ContextFieldsMD5[$NomCampo] = 1;
if( $Form[_STATUS]<>'E' ){
global $_ContextReadOnly;
if( $_ContextReadOnly<>"" ) $_ContextReadOnly.=";";
$_ContextReadOnly .= $NomCampo."=".$Valor;
}
}
if( $Form[2]=='o' ){
global $_CHECKLIST, $_RADIOLIST;
if( isset($_CHECKLIST[ $Form[_OFIELD] ]) ){
_ShowCheckList( $Form, $Form[_OFIELD], $Form[_MODE], $Form[4], $Opcion, $Valor, $_CHECKLIST[ $Form[_OFIELD] ][0], $_CHECKLIST[ $Form[_OFIELD] ][1], ($Form[_STATUS]=='E') );
return;
}
if( isset($_RADIOLIST[ $Form[_OFIELD] ]) ){
_ShowRadioList( $Form, $Form[_OFIELD], $Form[_MODE], $Form[4], $Opcion, $Valor, $_RADIOLIST[ $Form[_OFIELD] ][0], $_RADIOLIST[ $Form[_OFIELD] ][1], ($Form[_STATUS]=='E') );
return;
}
}
$_xAutoJump = '';
if( $Form[_STATUS]=='E' ){
global $_AutoJump;
if( is_bool($_AutoJump) && $_AutoJump ) $_xAutoJump = ' AJump';
else if( is_array($_AutoJump) && isset($_AutoJump[$Form[_OFIELD]]) ) $_xAutoJump = ' AJump';
}
$_LineForm = $lin;
$Valor = str_replace('"', '&#34;', $Valor);
$sNumCol = $NumCol;
if( $_SubModoAlta[$Form[_OFIELD]]===true ){
if( $Opcion=='mR' ) $Opcion = 'a';
if(		  substr_count($Form[_MODE],'M')>0 ){
$_SubModo = ' SubMode=M';
}else if( substr_count($Form[_MODE],'A')>0 ){
$_SubModo = ' SubMode=A';
}else if( substr_count($Form[_MODE],'-')>0 ){
$_SubModo = ' SubMode=-';
}
}else $_SubModo = '';
$OnFocusOut = $OnChange = $OnClick = $Eventos = $eAddCode = '';
$oCampo = $Form[_OFIELD];
if( $_LINKFIELD[$oCampo]!="" ){
$eAddCode = ' eLinkField="'.$_LINKFIELD[$oCampo].'" ';
}
if( $Form[2]=='#' && $Form[3]!='H' ){
$Valor = str_replace('%','&#37;',$Valor);
$Valor = urldecode($Valor);
}
if( $Opcion=='a' && count($_SUBLISTDF)>0 && $Form[1]=='conexion' ) $Valor = $_SESSION['_Connection_'];
if( $_ADDCODE[$Form[_OFIELD]]['I']!='' ){
if( substr_count($_ADDCODE[$Form[_OFIELD]]['I'], 'eFitToContent')>0 ){
echo '<script type="text/javascript">';
$tmp = explode('eFitToContent',$_ADDCODE[$Form[_OFIELD]]['I']);
$tmp = explode(')',$tmp[1]);
$tmp = 'eFitToContent'.trim($tmp[0]).');';
if( substr_count($tmp,'this')>0 ) $tmp = str_replace('this',"DGI('".$Form[_OFIELD]."')",$tmp);
echo '_DimRecalc[_DimRecalc.length] = "'.$tmp.'";';
echo '</script>';
}
if( substr_count(" ".strtoupper(trim($_ADDCODE[$Form[_OFIELD]]['I'])), " STYLE=")>0 ){
$dim = _getPropiedad("style", $_ADDCODE[$Form[_OFIELD]]['I'], "-");
$xStyle .= $dim[0];
if( substr($xStyle,-1)!=";" ) $xStyle .= ";";
$_ADDCODE[$Form[_OFIELD]]['I'] = trim($dim[2]);
}
if( $_ADDCODE[$Form[_OFIELD]]['I']!='' ){
$DimMasControl = DivideEventos($_ADDCODE[$Form[_OFIELD]]['I']);
if( $DimMasControl["onchange"]<>"" ){
if( $OnChange!='' ) $OnChange .= ';';
$OnChange .= $DimMasControl["onchange"];
}
if( $DimMasControl["onclick"]<>"" ){
if( $OnClick!='' ) $OnClick .= ';';
$OnClick .= $DimMasControl["onclick"];
}
$Eventos = $DimMasControl["eventos"];
}
}
$xTitle = '';
if( $_TIPFORM[$Form[1]]['F']!='' ){
$xTitle = $_TIPFORM[$Form[1]]['F'];
if( substr_count($xTitle,'#')>0 ) $xTitle = str_replace('#', $Valor, $xTitle);
$xTitle = str_replace(array('&34;','&39;'), array('&#34;',"\'"), $xTitle);
if( $xTitle=='>' ){
$xTitle = " onmouseenter=\"S(this).tip('#_TIP_F_".$Form[1]."',-1)\"";
}else{
$xTitle = " onmouseenter=\"S(this).tip('{$xTitle}',-1)\"";
}
if( $_TIPFORM[$Form[1]]['T']!='' ) $xTitle .= ' TimeOff="'.$_TIPFORM[$Form[1]]['T'].'"';
}
$Activo = "";
if( isset($_GET['_IMPORT']) ){
if( $Form[_STATUS]=='V' ){
$Activo = ' class="READONLY" readOnly=true onclick="_ImportField()" onmousewheel="_ImportSkip()" oncontextmenu="_ImportClear()"';
$xStyle .= "cursor:default;";
}
}else{
if( $Form[_STATUS]=='V' ){
$Activo = ' class="READONLY" readOnly=true onclick="_CpField()"';
$xStyle .= "cursor:default;";
}
}
$SelAText = false;
if( ($Opcion=='bR' || $Opcion=='cR') && $Form[_STATUS]!='I' ) $SelAText = true;
$RelationList = "";
$DimRelation = array();
for($n=0; $n<count($_RELATIONFIELDS); $n++){
$sCampo = $Form[_OFIELD];
if( substr_count($sCampo,'[')>0 ) $sCampo = substr($tmp[$p],0,strpos($tmp[$p],'['));
if( substr_count($_RELATIONFIELDS[$n], ','.$sCampo.',')==1 || substr_count($_RELATIONFIELDS[$n], ','.$sCampo.':')==1 ){
$tmp = strtolower(substr($_RELATIONFIELDS[$n],1,-1));
$RelationList = " eRelationList='".$tmp."'";
foreach(explode(",",$tmp) as $k=>$v) $DimRelation[trim($v)] = true;
$tmp = explode(',', $_RELATIONFIELDS[$n]);
for($i=1; $i<count($tmp)-1; $i++){
if( substr_count($tmp[$i], ':')==1 ){
$rCampo = substr($tmp[$i], 0, strpos($tmp[$i], ':'));
}else if( substr_count($tmp[$i],'[')==0 ){
$rCampo = $tmp[$i];
}else{
$rCampo = substr($tmp[$i], 0, strpos($tmp[$i], '['));
}
if( $sCampo==$rCampo ){
if( $i<count($tmp)-2 ){
if( $OnChange!='' ) $OnChange .= ';';
$OnChange .= 'S.selectReset("';
for($p=$i+1; $p<count($tmp)-1; $p++){
if( substr_count($tmp[$p], '[')==0 ){
$OnChange .= $tmp[$p];
}else{
$OnChange .= substr($tmp[$p], 0, strpos($tmp[$p],'['));
}
if( $p<count($tmp)-2 ) $OnChange .= ',';
}
$OnChange .= '",window,0)';
}
if( $i>1 && $Form[3]!='T' && $Form[3]!='Ss' ){
if( $OnClick!='' ) $OnClick .= ';';
$OnClick .= 'AuxFiltro("';
for($p=1; $p<$i; $p++){
$OnClick .= $tmp[$p];
if( $p<$i-1 ) $OnClick .= ',';
}
$OnClick .= '","'.$sCampo.'");';
}
break;
}
}
for($i=0; $i<count($tmp); $i++){
$oTmp[$i] = $tmp[$i];
for($p=0; $p<count($_Form); $p++){
$xxCampo = $_Form[$p][_OFIELD];
$cal = ($_Form[$p][_FIELD]!=$_Form[$p][_OFIELD]);
if( $tmp[$i]==$xxCampo && $cal ){
if( substr_count($_Form[$p][1], ':')>0 ){
list(,$oTmp[$i]) = explode(':', $_Form[$p][1]);
}else if( substr_count($_Form[$p][1], '{')>0 ){
list(,$oTmp[$i]) = explode(',', $_Form[$p][1]);
}
$oTmp[$i] = trim($oTmp[$i]);
break;
}
}
}
$sSelect='';
if( !$ConAuxFilter ){
for($i=1; $i<count($tmp); $i++){
for($p=$lin+1; $p<count($_Form); $p++){
$xxCampo = $_Form[$p][_OFIELD];
$rfCampo = $tmp[$i+1];
if( substr_count($tmp[$i+1],'[')>0 ) $rfCampo = substr($tmp[$i+1], 0, strpos($tmp[$i+1],'['));
if( $rfCampo==$xxCampo ){
if( $_Form[$p][3]=='Ss' ){
$sSelect = '","'.$tmp[$i+1].'",1);';
for($r=$i; $r>0; $r--){
if( $r<$i ) $sSelect = ','.$sSelect;
if( $tmp[$r]!=$oTmp[$r] ){
$sSelect = $tmp[$r].$sSelect;
}else{
$sSelect = $tmp[$r].$sSelect;
}
}
$sSelect = 'AuxFiltro("'.$sSelect;
if( $OnChange!='' ) $OnChange .= ';';
$OnChange .= $sSelect;
}
break 2;
}
}
}
}else{
$aCampo = "";
$dCampo = "";
for($i=1; $i<count($tmp); $i++){
if( $aCampo!="" ) $aCampo .= ",";
$aCampo .= $tmp[$i];
if( $tmp[$i]==$_Form[count($_Form)-1][_OFIELD] ){
for($p=$i+1; $p<count($tmp); $p++) if( $tmp[$p]!="" ){
if( $dCampo!="" ) $dCampo .= ",";
$dCampo .= $tmp[$p];
break;
}
break;
}
}
if( $dCampo!="" ){
if( $OnChange!='' ) $OnChange .= ';';
$OnChange .= 'AuxFiltro("'.$aCampo.'","'.$dCampo.'",1);';
}
}
if( $OnChange!='' && substr($OnChange,-1)!=';' ) $OnChange .= ';';
$OnChange = "S.relationReset(this,window,event);";
}
}
$AltoSelect = 1;
$MaxLen = 0;
$tmp = explode(",", $Form[4]);
if( $Form[3][0]=='S' && $tmp[2]!='' ) $_SelectMaxRows = $tmp[2];
switch( count($tmp) ){
case 1:
$tmp = explode(':', $Form[4]);
if( $tmp[1]!='' ){
$MaxLen = $tmp[0];
$Form[4] = $tmp[1];
$_Form[$lin][4] = $tmp[1];
}else{
$MaxLen = $Form[4];
}
if( $tmp[2]!='' ){
$Form[6] = str_replace('I','',str_replace('i','',$Form[6]));
$AltoSelect = $tmp[2];
global $_AltoSelect;
$_AltoSelect[$Form[_OFIELD]] = $AltoSelect;
$Form[4] = $tmp[0];
$MaxLen = $tmp[0];
}
break;
case 2:
$MaxLen = ($tmp[0]+$tmp[1]+1);
break;
case 3:
$MaxLen = $tmp[0];
break;
}
if( substr_count('bcmsql', $Opcion)>0 && substr_count('SP.M.s.S.X.Ss.SS.SX.SV.SL.[S]', $Form[3])==0 ){
if( $MaxLen<60 ) $MaxLen = $MaxLen*3+6;
}
if( !$_CARDSHOW && $Form[3][0]!="S" && ($Form[2][0]=='+' || $Form[2][0]=='-' || $Form[2]=='*') ) $xStyle .= "text-align:right;";
if( $Form[3]!='A' && substr_count($Form[5], ',')==2 ){
$Form[6] = str_replace('I','',$Form[6]);
$Form[6] = str_replace('i','',$Form[6]);
$Ancho = explode(',', $Form[5]);
$Form[5] = trim($Ancho[0]);
}
if( $_SELECTMULTIPLE[$oCampo]!="" ) $Form[6] = str_replace("I", "", str_replace("i", "", $Form[6]));
if( substr_count(strtoupper($Form[6]), 'I')>0 && $Form[3][0]=='S' ){
$xStyle .= "margin-left:0px;";
$_Form[$lin][16] = '#';
$como = _NomFields($Form[1]);
$sComo = $como;
if( $Valor=='' && $Form[7]!='' ) $Valor = $Form[7];
if( substr_count($Form[5], '/')==1 ){
$xAncho = explode('/', $Form[5]);
if( $xAncho[0]=='' ){
CalculaAncho($Form[2], $Form[4], $xAncho[0]);
$Ancho = explode(',', $xAncho[0]);
$Form[5] = '/'.$xAncho[1];
}
}else if( substr_count($Form[5], ',')==1 ){
$xAncho = explode(',', $Form[5]);
if( (($xAncho[0]*1)."")===$xAncho[0] ){
$Ancho[0] = $xAncho[0];
$Form[5] = $xAncho[1];
}else{
$_CalcularAnchos[] = "DGI('{$como}').style.width = S('{$xAncho[0]}').css('width')+'px';";
}
if( (($xAncho[1]*1)."")===$xAncho[1] ){
if( $Form[3][0]=="S" ) $como = "_INPUT_{$como}";
$_CalcularAnchos[] = "DGI('{$como}').style.width = '{$xAncho[1]}px';";
$Form[5] = $xAncho[1];
}
}else if( $Form[5]=='' ){
$xAncho = explode(',', $Form[4]);
if( count($xAncho)==2 ){
CalculaAncho($Form[2], $xAncho[0], $xAncho[0]);
list($xIzAncho) = explode(',', $xAncho[0]);
CalculaAncho('X', $xAncho[1], $xAncho[0]);
list(,$xDchAncho) = explode(',', $xAncho[0]);
$Form[5] = $xIzAncho.','.$xDchAncho;
$Ancho[0] = $xIzAncho;
}else{
CalculaAncho($Form[2], $Form[4], $xAncho[0]);
$Form[5] = $xAncho[0];
$Ancho[0] = $xAncho[0];
}
}else{
$bak = array_replace([], $Form);
$bak[3] = "T";
list($bak[4]) = explode(",", $Form[4]);
$bak[5] = "";
_CalcPxFields($bak);
$Ancho[0] = $bak[5];
}
$tmp = explode(',', str_replace(':', ',', $Form[4]));
$Form[4] = $tmp[1];
$MaxLen = $tmp[1];
echo "<INPUT NAME='{$oCampo}' i_SS=1 VALUE=\"{$Valor}\" SIZE={$tmp[0]}{$xTitle}{$_xAutoJump} TS='{$Form[3]}'";
$xStyle = trim(str_replace("margin-left:0px;", "", $xStyle));
if( $_SELECTTREE[$oCampo]['static']=="1" ) $xStyle .= "display:none;";
if( $_RELATIONJUMP[$oCampo]==2 ) echo ' JumpON="'.$_RELATIONJUMP[$oCampo.'Jump'].'"';
if( $_NM_ATRIBUTE[$oCampo]!='' ) echo ' NMATRIBUTE="'. $_NM_ATRIBUTE[$oCampo].'"';
if( substr_count(':+:-:', ":{$Form[2]}:")==1 ){
echo ' TD="0"';
}else{
echo ' TD="'.$Form[2].'"';
}
if( isset($_GET['_IMPORT']) ){
echo ' class="READONLY" readonly=true onclick="_ImportField()" onmousewheel="_ImportSkip()" oncontextmenu="_ImportClear()"';
$xStyle .= "cursor:default;";
if( strtoupper($Form[3])=='SS' ) echo ' SS=1';
}else if( substr_count($Form[6], 'i')>0 || $Form[3]=='ST' ){
if( $Form[3]=='ST' ){
if( $Form[_STATUS]!='V' ){
echo " class='READONLY' readonly=true onclick=eSelectTreeView('{$Form[_FIELD]}') ST=1 onfocus='document.body.focus()'";
$xStyle .= 'cursor:pointer;';
}else{
echo $Activo;
}
}else{
echo ' class="READONLY" readonly=true eAlwaysRead=1 onfocus="document.body.focus()"';
}
}else if( substr_count($Form[6], 'I')>0 ){
echo " MAXLENGTH={$tmp[0]}{$Activo}";
if( $Form[_STATUS]=='E' ) echo " onfocus=S.key('{$Form[2]}',{$tmp[0]}) class='EDITABLE' eWE=1";
}
global $_ADDOPTIONVALUE, $_NM_ATRIBUTE;
if( $_ADDOPTIONVALUE[$oCampo]!='' ) echo ' ADDOPTIONVALUE="'.$_ADDOPTIONVALUE[$oCampo].'"';
if( substr_count($Form[1], '{')>0 ){
list(,$CampoRead) = explode(',', $Form[1]);
echo ' FRF="'.trim($CampoRead).'"';
}else if( substr_count( $Form[1], ':' )>0 ){
list(,$CampoRead) = explode(':', $Form[1]);
echo ' FRF="'.trim($CampoRead).'"';
}
if( $Form[14]!=',cd_,nm_' && $Form[14]!='' ){
echo ' xSELECT="{'.str_replace('"',"'",$Form[14]).'}"';
if( $Form[3]=="Ss" ) $GLOBALS["_CONTEXTSUBSELECT"][] = '{'.str_replace('"',"'",$Form[14]).'}';
}
if( $Ancho[0]!='' ) $xStyle .= "width:".$Ancho[0]."px;";
_EchoStyle($xStyle);
$xStyle = "";
if( $GLOBALS['_pWHERESELECT'][$oCampo]!='' ){
echo " WhereSelect='". str_replace('"', '&#34;', str_replace("'", '&#39;', _InVar($GLOBALS['_pWHERESELECT'][$oCampo])))."'";
}
if( $_ENV["."]["cache"]!='' && $DimRelation[$oCampo] ) echo " eCache=1";
echo "{$_AutoComplet}>";
if( $OnChange!='' && substr($OnChange,-1)!=';' ) $OnChange .= ';';
}
$xCampo = $Form[_OFIELD];
if( substr_count($OnChange, 'Espejo(')==0 ){
if( substr_count($_MIRROR, ','.$xCampo.',')>0 ){
if( !empty($OnChange) && substr($OnChange,-1)!=';' ) $OnChange .= ';';
$OnChange .= "Espejo(".'"_"'.",this,true)";
}else if( substr_count($_EDITMIRROR, ','.$xCampo.',')>0 ){
if( !empty($OnChange) && substr($OnChange,-1)!=';' ) $OnChange .= ';';
$OnChange .= "Espejo(".'"_"'.",this,false)";
}
}
if( $Form[3]=='[*]' || $Form[3]=='[T]' || $Form[3]=='[S]' || $Form[3]=='[SV]' || $Form[3]=='[A]' || $Form[3]=='[C]' || $Form[3]=='[R]' ){
if( !empty($OnChange) && substr($OnChange,-1)!=';' ) $OnChange .= ';';
$OnChange .= 'Espejo("",this,false)';
}
if( $Form[3]=='X' ){
if( substr_count($Form[1], ':')>0 ){
$NomSelect = substr($Form[1], strpos( $Form[1], ':')+1);
$Form[1] = substr($Form[1], 0, strpos( $Form[1], ':'));
$NomAux = substr($NomSelect, 4);
}else{
$NomSelect = $Form[1];
$NomAux = substr($Form[1], 4);
}
if( $OnClick!='' ) $OnClick .= ';';
$OnClick .= "SelAuxiliar(\"{$NomAux}\",\"FRM{$NumForm}.{$Form[1]}\")";
}
$OnChangeSrv = '';
for($n=0; $n<count($_ONCHANGE); $n++){
if( $_ONCHANGE[$n][0]==$xCampo ){
$_ONCHANGE[$n][1] = trim($_ONCHANGE[$n][1]);
if( $_ONCHANGE[$n][1]!='' ){
if( $OnChange!='' && substr($OnChange,-1)!=';' ) $OnChange .= ';';
if( $_ONCHANGE[$n][1][0]=='_' || $_ONCHANGE[$n][4]==false ){
if( substr($_ONCHANGE[$n][1],-1)!=';' ) $_ONCHANGE[$n][1] .= ';';
$OnChange .= 'if(S.isNotOnLoad(window)){'.$_ONCHANGE[$n][1].'}';
}else{
$OnChange .= $_ONCHANGE[$n][1];
}
}
if( $_ONCHANGE[$n][2]!='' ){
if( substr_count($_ONCHANGE[$n][2], '{')>0 ){
$DimNomVar = array_keys($_POST);
$DimValor  = array_values($_POST);
for($ii=0; $ii<count($_POST); $ii++){
${$DimNomVar[$ii]} = $DimValor[$ii];
}
foreach($_SESSION as $key=>$value) ${$key} = $value;
$_ONCHANGE[$n][2] = @eval('return ("'.$_ONCHANGE[$n][2].'");');
}
$OnChangeSrv = ' OnChangeSrv="'.$_ONCHANGE[$n][2].'"';
$OnChangeSrvFunc = $_ONCHANGE[$n][2];
}
}
}
if( $OnFocusOut!='' ){
$OnFocusOut = " onfocusout='{$OnFocusOut}'";
}
if( $OnChange!='' ) $OnChange = " pp=1 onchange='{$OnChange}'";
if( $OnClick!='' ){
$OnClick = " pp=1 onclick='{$OnClick}'";
}else if( $Form[3]=='T' && substr_count('bcm',$Opcion)>0 ){
$OnClick = " onclick='_CheckCondition()'";
}
if( $_ADDCODE[$Form[_OFIELD]]['I']=='' && $Form[0]=='' && $NumCol==-1 && $_SESSION["NextMarginLeft"]!="" ) $xStyle .= "margin-left:".$_SESSION["NextMarginLeft"]."px;";
$Form[5] = str_replace(" ","",$Form[5]);
$iz = "";
$dc = "";
$como = _NomFields($Form[1]);
$sComo = $como;
if( substr_count('MSSsX.SL.SV.', $Form[3])>0 ){
$como = "_INPUT_{$como}";
}
if( ($Form[3]=="A" || $Form[3]=="H") && substr_count($Form[5],",")>0 ){
list($iz, $dc) = explode(",", $Form[5]);
}else if( $Form[3][0]=="S" && substr_count($Form[5],",")>0 ){
list($iz, $dc) = explode(",", $Form[5]);
if( (($iz*1)."")===$iz ){
$_CalcularAnchos[] = "DGI('{$sComo}').style.width = '{$iz}px';";
}else{
$_CalcularAnchos[] = "DGI('{$sComo}').style.width = S('{$iz}').css('width')+'px';";
}
$iz = $dc;
$Form[5] = $dc;
$dc = "";
}else{
if( substr_count($Form[5],'/')==1 ) list($iz, $dc) = explode("/", $Form[5]);
else $iz = $Form[5];
$Form[5] = "";
}
$tmp2 = explode(',',$Form[4]);
if( (($iz*1)."")===$iz ){
$Form[5] = $iz;
$iz = "";
}
if( (($dc*1)."")===$dc ){
$Form[5] = $dc;
if( ($Form[3]=="A" || $Form[3]=="H") ) $Form[5] = ",".$dc;
$dc = "";
}
if( eIn(["<",">"], $iz[0]) ){
global $_eAlign;
$_eAlign[] = array($Form[_OFIELD], $iz, $NumForm);
$iz = "";
}
if( eIn(["<",">"], $dc[0]) ){
global $_eAlign;
$_eAlign[] = array($Form[_OFIELD], $dc, $NumForm);
$dc = "";
}
if( eIn(["+","-"], $iz[0]) ){
$campo = substr($iz,1);
$_CalcularAnchos[] = "_AnchoHasta(\"{$campo}\",\"{$como}\"".(($iz[0]=="-")?",1":"").");";
$iz = "";
}
if( eIn(["+","-"], $dc[0]) ){
$campo = substr($dc,1);
$_CalcularAnchos[] = "_AnchoHasta(\"{$campo}\",\"{$como}\"".(($dc[0]=="-")?",1":"").");";
$dc = "";
}
if( eIn(["+","-"], $iz) ){
$_CalcularAnchos[] = "_AnchoGrupo(\"{$iz}\",\"{$como}\");";
$iz = "";
}
if( eIn(["+","-"], $dc) ){
$_CalcularAnchos[] = "_AnchoGrupo(\"{$dc}\",\"{$como}\");";
$dc = "";
}
if( eIn(",", $iz) ){
$tmp2 = explode(',',$iz);
if( (string)($tmp2[0]*1)<>$tmp2[0] && $tmp2[0]!="" ){
$_CalcularAnchos[] = "_AnchoField('{$tmp2[0]}',DGI('{$Form[1]}')".(($Form[3]=="H" )?".parentNode":"").");";
}
$Form[5] = $iz;
}else{
if( $iz!="" ){
if( $_SELECTMULTIPLEBOX[$Form[1]]  ){
$_CalcularAnchos[] = "_AnchoField(\"{$iz}\", DGI('_{$Form[1]}'));";
}else{
$_CalcularAnchos[] = "_AnchoField(\"{$iz}\", DGI('{$como}'));";
}
}
if( $dc!="" ) $_CalcularAnchos[] = "_AnchoField(\"{$dc}\", DGI('{$como}'));";
}
if( $_DimCheckDBIndex[$Form[_OFIELD]] ){
if( $OnChange=='' ){
$OnChange = " onchange='_OnChangeIndex(\"{$_CheckDBIndex}\");'";
}else{
$OnChange = substr($OnChange,0,-1)."_OnChangeIndex(\"{$_CheckDBIndex}\");'";
}
}
if( !$_CARDSHOW ){
if( !$_FIELDSETON && $Form[3]<>'H' && !$_SESSION["_BYPHONE"] ){
if( $Form[3]=='A' ){
echo '<nobr>';
}else{
echo '<nobr>';
}
}
}
if( $Form[3]=='[*]' ){
if( $Form[2]=='F4' || $Form[2]=='P4' ) $Form[3] = 'T';
}
switch( $Form[3] ){
case '-':
case '=':
echo '<span class="RangeLabel"'.(($_CARDSHOW)?'style="width:100%"':'').'>';
if($_CARDSHOW) echo '<div style="display:table-cell;">';
list($min,$default,$max,$step) = explode(",", eNsp($Form[4]));
if( $step=="" ) $step=1;
if( $Valor=="" ) $Valor = $default;
$Activo = (($Form[_STATUS]=='E')?"":" disabled");
if( $Form[3]=="=" && !$_CARDSHOW ){
echo '<span></span>';
}else{
$long = strlen(trim($max)."");
echo "<input name='_{$Form[1]}' type='text' min='{$min}' value='{$Valor}' max='{$max}' step='{$step}' size={$long} maxlength={$long}{$Activo}";
if( $Form[_STATUS]!='E' ) echo ' class="READONLY"';
else echo  " size='{$long}' dcm='0' onfocus='S.key(\"+\",{$long},0)' tc='+' onchange='S(this).range(this.value)'";
global $_DefaultSize;
$px = $long*$_DefaultSize['TC']['N'];
echo " style='text-align:right;width:{$px}px'{$_AutoComplet}>";
}
if($_CARDSHOW) echo '</div><div style="width:100%;display:table-cell;">';
if( $_CARDSHOW ) $Form[5] = "100%";
else $Form[5] .= "px";
echo "<input name='{$Form[1]}' type='range' TC='{$Form[2]}' min='{$min}' value='{$Valor}' max='{$max}' step='{$step}' style='width:{$Form[5]}'{$Activo}{$_AutoComplet}>";
if($_CARDSHOW) echo '</div>';
echo '</span>';
$GLOBALS["_RunToEnd"] .= "S(':{$Form[1]}').range();";
break;
case '[T]':
case 'T':
if( $Form[3][0]=='[' ) $Form[2] = substr($Form[3],1,1).'4';
if( $Form[1]=='_UNIQUE_' ){
global $_DBINDEX;
$tmp = explode(',',$_DBINDEX);
for($i=0; $i<count($tmp); $i++) $Valor .= $tmp[$i].'|'.$Fila[$tmp[$i]];
}
if( $Form[2]=="H" ) $Form[2] .= $Form[4];
if( !$Invisible ){
$tmp = explode(',', $Form[4]);
if( $Valor!="" && preg_match('/(\<|\=|\>)/', $Valor) && preg_match('/(c|m|b)/', $_Mode) ){
$token = array("<>", "<=", ">=", "<", ">", "=");
for($n=0; $n<count($token); $n++) $Valor = str_replace($token[$n], "ƒ~ƒ".$token[$n]."ƒ~ƒ", $Valor);
$tmp2 = explode("ƒ~ƒ", $Valor);
$Valor = str_replace("ƒ~ƒ", "", $Valor);
}
$textoLibre = false;
if( substr_count(':+:-:+,:-,:', ":{$Form[2]}:")==1 ){
$p = 0;
if( isset($GLOBALS['_ShowZeroFields'][$Form[1]]) ){
$p = $GLOBALS['_ShowZeroFields'][$Form[1]];
}else if( isset($GLOBALS['_ShowZero']) ){
$p = $GLOBALS['_ShowZero'];
}
$xValor = $Valor;
if( $p!=1 && isZero($Valor) ){
$Valor = "";
}else{
if( $Valor!="" ){
if( preg_match('/(\<|\=|\>)/', $Valor) && preg_match('/(c|m|b)/', $_Mode) ){
for($n=0; $n<count($token); $n++){
if( $tmp2[$n]!="" && !in_array($tmp2[$n], $token) ){
$tmp2[$n] = eNumberFormat($tmp2[$n]*1, $tmp[1]);
}
}
$Valor = implode("", $tmp2);
}else{
$Valor = eNumberFormat($Valor*1, $tmp[1]);
}
}
}
if( $Form[1][0]<>"_" ){
$NomCampo = NombreCampo($Form[1]);
$_ContextFieldsMD5[$NomCampo] = 1;
if( $Form[_STATUS]<>'E' ){
$_ContextReadOnly = str_replace($NomCampo."=".$xValor, $NomCampo."=".$Valor, $_ContextReadOnly);
}
}
}else if( $Form[2]=="T" ){
$Form[4] = strlen($_SESSION["_FormatT"]);
$tmp = array(strlen($_SESSION["_FormatT"]));
if( $Valor!="" ){
if( preg_match('/(\<|\=|\>)/', $Valor) && preg_match('/(c|m|b)/', $_Mode) ){
for($n=0; $n<count($token); $n++){
if( $tmp2[$n]!="" && !in_array($tmp2[$n], $token) ){
$tmp2[$n] = eDataFormat($tmp2[$n], $Form[2]);
}
}
$Valor = implode("", $tmp2);
}else{
$Valor = eDataFormat($Valor, $Form[2]);
}
}
}else if( preg_match('/^(P4|F4|CDI)$/',$Form[2]) ){
if( $Valor!="" ){
if( preg_match('/(\<|\=|\>)/', $Valor) && preg_match('/(c|m|b)/', $_Mode) ){
for($n=0; $n<count($token); $n++){
if( $tmp2[$n]!="" && !in_array($tmp2[$n], $token) ){
$tmp2[$n] = eDataFormat($tmp2[$n], $Form[2]);
}
}
$Valor = implode("", $tmp2);
}else{
$Valor = eDataFormat($Valor, $Form[2]);
}
}
}else $textoLibre = true;
if( $Form[_STATUS]!='V' && substr_count($Form[6],'s')>0 && ($Form[2]=='P4' || $Form[2]=='+' || $Form[2]=='-') ) $sActivo = ' readOnly=true onfocus="document.body.focus()"';
$sActivo = $Activo;
if( $Form[_STATUS]!='V' && substr_count($Form[6],'s')>0 && ($Form[2]=='P4' || $Form[2]=='+' || $Form[2]=='-') ){
$sActivo = ' class="READONLY" readonly=true onfocus="document.body.focus()"';
}else if( $Form[_STATUS]=='E' ){
$sActivo = ' class="EDITABLE" eWE=1';
if( $textoLibre && preg_match('/S/i',$Form[6]) ) $sActivo .= ' spellcheck="true"';
}
global $_FIELDBROWSER;
if( count($_FIELDBROWSER[$Form[1]])>0 ){
if( $Form[_STATUS]=='E' ){
$OnClick = " onclick='this.blur();eFireChange(this)'";
}else{
$OnClick = " onclick=_CpField()";
}
echo '<span class="SELECTINPUT">';
}
if( !preg_match('/^(m|c|b)$/', $Opcion) && (($_SESSION["3CXTab"] && $Form[2]=="T") || $GLOBALS["_3CX"][$Form[1]]) ){
if( $OnChange=="" ) $OnChange = " onchange=";
$OnChange .= "'_PhoneIcon(this);'";
}
echo "<INPUT NAME='{$Form[1]}'{$OnClick}{$OnChange}{$OnFocusOut}{$_SubModo} VALUE=\"{$Valor}\"{$sActivo}{$Eventos}{$xTitle}{$_xAutoJump}{$eAddCode}";
if( $Form[1][0]=='_' && $Form[7]!='' ) echo ' eDefault="'.$Form[7].'"';
if( substr_count($Form[4], ',')>0 && substr_count(":+,:-,:", ":{$Form[2]}:")==1 ){
if( substr_count($Form[6], '*')==0 ){
$tmp[1] = trim($tmp[1]);
echo " MAXLENGTH={$MaxLen} SIZE=".($tmp[0]+$tmp[1]+1);
echo ' DCM='.trim($tmp[1]);
echo ' Leng='.$tmp[0];
echo " onfocus=S.key('{$Form[2]}',{$tmp[0]},{$tmp[1]})";
}
}else{
if( count($tmp)==2 ){
$MaxLen = $tmp[0];
$Form[4] = $tmp[1];
}else{
$MaxLen = $Form[4];
}
echo ' Leng='.$MaxLen;
if( substr_count('bcmsql', $Opcion)>0 && substr_count('SP.M.s.S.X.Ss.SS.SX.SV.SL.[S]', $Form[3])==0 ){
if( $MaxLen<60 ) $MaxLen = $MaxLen*3+6;
}
echo " MAXLENGTH={$MaxLen} SIZE={$Form[4]}";
if( substr_count('+-', $Form[2])==1 ) echo ' DCM=0';
global $_CHR;
if( isset($_CHR[$Form[2]]) ){
switch( strtoupper($_CHR[$Form[2]][1]) ){
case 'U':
$xChr = strtoupper($_CHR[$Form[2]][2]);
break;
case 'L':
$xChr = strtolower($_CHR[$Form[2]][2]);
break;
case 'UL':
case 'LU':
$xChr = strtoupper($_CHR[$Form[2]][2]).strtolower($_CHR[$Form[2]][2]);
break;
default:
$xChr = $_CHR[$Form[2]][2];
}
if( $_CHR[$Form[2]][3]!="" ){
$xChr = str_replace(" ", chr(92)."s", $_CHR[$Form[2]][3]);
echo " onfocus=S.key(/^[{$xChr}]{0,{$MaxLen}}".'$'."/,{$MaxLen},0)";
}else if( $xChr[0]<>"/" ){
$xChr = str_replace(
array(	       ">"  ,		  chr(92),		   "*",			".",		 "-",		  "[",		   "]"),
array(chr(92)."&gt;", chr(92).chr(92), chr(92)."*", chr(92).".", chr(92)."-", chr(92)."[", chr(92)."]"),
$xChr
);
$xChr = str_replace(" ", chr(92)."s", $xChr);
echo " onfocus=S.key(/^[{$xChr}]{0,{$MaxLen}}".'$'."/,{$MaxLen},0)";
}else{
echo " onfocus=S.key({$xChr},{$MaxLen},0)";
}
}else{
echo " onfocus=S.key('{$Form[2]}',{$MaxLen},0)";
}
}
if( $Form[5]!='' ) $xStyle .= _CalcAncho($Form[1], $Form[5]);
if( preg_match("/^(\+|\+,|\-|\-,|\*|F4|P4|CP|T|CDI|H8|H5|H2|CLR|IP|DNI|NIF|CIF|NSS|0)$/", $Form[2]) ){
$xStyle .= "font-family:".$_SESSION["CSSDynamic"]["FontNumbers"];
}
echo ' TC='.$Form[2];
if( $_ADDCODE[$Form[_OFIELD]]['I']!="" ){
_AddCodeStyle($_ADDCODE[$Form[_OFIELD]]['I'], $xStyle, $xAddCode);
echo $xAddCode;
}
if( $Form[_STATUS]!='V' && substr_count(strtoupper($Form[6]),'S')>0 && eIs($Form[2], "+|-") ){
echo ' onmousewheel=S(":'.$Form[1].'").nextValue()';
}
if( $Form[_STATUS]=='E' && $Form[2]=="P4" ){
echo ' onmousewheel=S(":'.$Form[1].'").nextValue()';
}
if( $GLOBALS['_DBRANGEDUO'][$Form[1]]!='' ) echo " DBRange=".$GLOBALS['_DBRANGEDUO'][$Form[1]];
if( count($_FIELDBROWSER[$Form[1]])>0 ){
echo " ePag=0 eKeyAdd='*'";
echo " eFireChange='eFireChange'";
echo " eAssign='".str_replace(' ','',$_FIELDBROWSER[$Form[1]][1])."'";
$txt = $_FIELDBROWSER[$Form[1]][2];
$i = 0;
while( substr_count($txt, 'eSqlConcat(')>0 ){
$i = strpos($txt, "eSqlConcat(", $i);
$f = strpos($txt, ")", $i);
$sub = substr($txt,$i,$f-$i+1);
@eval('$'."res={$sub};");
$txt = substr($txt,0,$i).$res.substr($txt,$f+1);
}
$_FIELDBROWSER[$Form[1]][2] = $txt;
if( substr_count($_FIELDBROWSER[$Form[1]][2], '{$')>0 ){
$_FIELDBROWSER[$Form[1]][2] = str_replace("'", '"', _InVar($_FIELDBROWSER[$Form[1]][2]));
}
if( substr($_FIELDBROWSER[$Form[1]][2],-2)==");" || substr($_FIELDBROWSER[$Form[1]][2],-1)==")" ){
$sql = call_user_func(explode("(",$_FIELDBROWSER[$Form[1]][2])[0]);
}else{
$sql = $_FIELDBROWSER[$Form[1]][2];
}
$_SESSION["_sql_".$_ENV["_"]["accessNew"]] = $sql;
echo " eSQL=''";
if( $_FIELDBROWSER[$Form[1]][3]=='' ) $_FIELDBROWSER[$Form[1]][3] = 10;
echo ' eHeight='.$_FIELDBROWSER[$Form[1]][3];
if( $_FIELDBROWSER[$Form[1]][4]=='' ) $_FIELDBROWSER[$Form[1]][4] = 1;
echo " eViewCols='".$_FIELDBROWSER[$Form[1]][4]."'";
echo " eParameters='".str_replace(" ","",$_FIELDBROWSER[$Form[1]][5])."'";
$Form[6] = str_replace('c','',$Form[6]);
$Form[6] = str_replace('p','',$Form[6]);
}
if( eIs($Form[2], 'P4|F4') && $Form[8]!='' && $Form[8]!='#' && $Form[8]!='=' ) _CalcSetPeriodo($Form[8]);
_EchoStyle($xStyle, $_CARDSHOW);
echo "{$_AutoComplet}>";
if( strtoupper($Form[2])=="CLR" && ($Opcion=="cR" || $Opcion=="bR") ) $GLOBALS["_JSSYSTEM"] .= "_SetColor('{$Form[1]}');";
if( !preg_match('/^(m|c|b)$/', $Opcion) && (($_SESSION["3CXTab"] && $Form[2]=="T") || $GLOBALS["_3CX"][$Form[1]]) ){
$iconos[] = "<i class='ICONINPUT".(($Valor=="")? " OFF":"")."' onclick='ePhone(this)'>&#308;</i>";
}
if( count($_FIELDBROWSER[$Form[1]])>90 ){
echo '</span>';
$NomCampo = substr($Form[1],1);
if( $_SELECTMULTIPLE[$NomCampo]>0 ){
if( $_SELECTMULTIPLE[$NomCampo]!='' ){
$NomCampo = '_'.$NomCampo;
echo "<table class='LstFieldBrowser col_0n' border=0px cellspacing=0px cellpadding=0px id=LIST_{$oCampo} width=1px style='border-collapse:collapse;'>";
if( substr_count(",cR,bR,",",{$Opcion},")==0 ){
echo '<col style="display:none"><col><col>';
}else{
echo '<col style="display:none"><col style="display:none"><col>';
}
if( $oValor!='' ){
$oCampo = substr($Form[1],1);
$Valores = "'".str_replace(',',"','",$oValor)."'";
qQuery(str_replace('#', $Valores, $GLOBALS['_SELECTMULTIPLESQL'][$NomCampo]));

while( $r=qRow() ){
	echo '<tr><td>'.$r[0].'<td>'."<I class='ICONINPUT' oi=1 onclick=_SMDelOption('".$oCampo."') style='margin-right:2px' title=".'"'.$__Lng[42].'">D</I><td>'.$r[1];
	for($i=2; $i<count($r); $i++){
		echo $r[$i];
	}
}


}
echo '</table>';
echo "<INPUT NAME='{$oCampo}' VALUE=\"{$oValor}\" MAXLENGTH={$_SELECTMULTIPLE[$NomCampo]} type=hidden MultipleValues=1{$_AutoComplet}>";
}
}
}
if( $Form[_STATUS]!='V' && substr_count(strtoupper($Form[6]),'S')>0 && eIs($Form[2], "+|-") ){
$iconos[] = '<i class="ICONINPUT" style="display:inherit" onclick=S(":'.$Form[1].'").nextValue() onmousewheel=S(":'.$Form[1].'").nextValue()>s</i>';
}
if( substr_count(',a,b,c,m,mR,s,q,', ",{$Opcion},")>0 ){
if( $Form[_STATUS]=='E' ){
if( substr_count($Form[6],'F')>0 && $Form[2]=='F4' ){
$iconos[] = '<i class="ICONINPUT" onclick=S(":'.$Form[1].'").calendar() oncontextmenu=S(":'.$Form[1].'").calendar("t") id=TOOLSDate>,</i>';
}
if( substr_count($Form[6],'P')>0  && $Form[2]=='P4' ){
$iconos[] = '<i class="ICONINPUT" onclick=S(":'.$Form[1].'").calendarMonth() oncontextmenu=S(":'.$Form[1].'").calendarMonth("t")'.' onmousewheel=S(":'.$Form[1].'").nextValue() id=TOOLSDate>,</i>';
}
}
}
if( substr_count(',cR,', ",{$Opcion},")>0 && $Valor!='' ){
if( substr_count($Form[6],'E')>0 ) $iconos[] = _AddIconEMail($Valor);
if( substr_count($Form[6],'W')>0 ) $iconos[] = _AddIconWeb($Form[1], $Valor, $NumForm);
}
}else{
$tmp = explode(',', $Form[4]);
if( substr_count(':+:-:+,:-,:', ":{$Form[2]}:")==1 ){
if( $Form[1][0]<>"_" ){
$NomCampo = NombreCampo($Form[1]);
$_ContextFieldsMD5[$NomCampo] = 1;
if( $Form[_STATUS]<>'E' ){
$_ContextReadOnly = str_replace( $NomCampo."=".$Valor, $NomCampo."=".number_format($Valor, $tmp[1], ".", ""), $_ContextReadOnly );
}
}
if( $GLOBALS['_ShowZero']!=1 && isZero($Valor) ){
$Valor = '';
}else{
$Valor = eNumberFormat($Valor*1, $tmp[1]);
}
}else if( $Form[2]=="T" ){
$Form[4] = strlen($_SESSION["_FormatT"]);
$tmp = array(strlen($_SESSION["_FormatT"]));
$Valor = eDataFormat($Valor, $Form[2]);
}else if( preg_match('/^(P4|F4|CDI)$/',$Form[2]) ){
$Valor = eDataFormat($Valor, $Form[2], "u");
}
echo "<INPUT NAME='{$Form[1]}' TYPE='HIDDEN' VALUE=\"{$Valor}\"{$OnChange} class='READONLY' READONLY=true";
if( substr_count($Form[4], ',')>0 && substr_count(':+,:-,:', ":{$Form[2]}:")==1 ){
$tmp = explode(',', $Form[4]);
echo " SIZE=".($tmp[0]+$tmp[1]+1);
echo ' DCM='.trim($tmp[1]);
echo ' Leng='.$tmp[0];
}else{
echo " SIZE={$Form[4]}";
if( substr_count('+-', $Form[2])==1 ) echo ' DCM=0';
}
echo ' TC='.$Form[2];
if( $_ADDCODE[$Form[_OFIELD]]['I']!='' ) echo $_ADDCODE[$Form[_OFIELD]]['I'];
echo "{$_AutoComplet}>";
}
break;
case 'H':
global $_DefaultSize;
$tmp2 = explode(',',$Form[4]);
$tmp2[0] = $tmp2[1]*$_DefaultSize["TC"]["L"];
$ancho = "width:{$tmp2[0]}px;";
$alto = "height:{$tmp2[2]}em;";
if( $Form[5]<>"" ){
$tmp3 = explode(',',$Form[5]);
if( $tmp3[1]!="" ) $alto = "height:{$tmp3[1]}px;";
if( $tmp3[0]!="" ) $ancho = "width:{$tmp3[0]}px;";
}
if( $_CARDSHOW ) $ancho = "width:100%;";
$LongImg = $tmp2[3]*1;
if( isset($GLOBALS['_MAXIMAGELENGTH']) ) $LongImg = $GLOBALS['_MAXIMAGELENGTH']*1;
echo "<DIV id='edCONTAINER' style='bo-rder:1px solid red; overflow-y:auto;{$ancho}{$alto}display:flex;' ";
if( $Form[_STATUS]=='E' ){
echo "class='edOUT'";
if( preg_match('/S/i',$Form[6]) ) echo ' spellcheck="true"';
}else{
echo "class='edREADONLY'";
}
if( isset($GLOBALS['_MAXIMAGESIZE']) ) echo ' eImgSize="'.$GLOBALS['_MAXIMAGESIZE'][0].','.$GLOBALS['_MAXIMAGESIZE'][1].'"';
if( $xTitle!='' ) echo $xTitle;
$xTitle = '';
echo '>';
$Invisible = true;
$Form[5] = "";
case '[A]':
case 'A':
$Valor = str_replace(
array('&quot;',	'&#39;', '&#92;', '&#43;'),
array(   '"'  ,   "'"  , chr(92),   '+'  ),
$Valor
);
if( substr_count($_ADDCODE[$Form[_OFIELD]]["I"], "eCode")==1 ){
$Valor = str_replace(
array(  "<"  ,   ">"  ),
array("&#60;", "&#62;"),
$Valor
);
}
$tmp = explode(',', $Form[4]);
$MaxLen = $tmp[0];
if( $Form[_STATUS]=='E' ){
$sActivo = ' class="EDITABLE" eWE=1';
if( preg_match('/S/i',$Form[6]) ) $sActivo .= ' spellcheck="true"';
}else{
$sActivo = ' class="READONLY" readonly=true onfocus="document.body.focus()"';
}
echo "<TEXTAREA NAME='{$Form[1]}' COLS={$tmp[1]} ROWS={$tmp[2]} MAXLENGTH={$MaxLen} _MaxLength={$MaxLen}{$_SubModo}{$sActivo}{$xTitle}";
if( $Form[_STATUS]!='V' ){
echo " WRAP=VIRTUAL{$OnChange}";
}else{
echo " class='READONLY' readonly=true WRAP=VIRTUAL onfocus='document.body.focus()'";
}
global $_CHR;
if( isset($_CHR[$Form[2]]) ){
switch( strtoupper($_CHR[$Form[2]][1]) ){
case 'U':
$xChr = strtoupper($_CHR[$Form[2]][2]);
break;
case 'L':
$xChr = strtolower($_CHR[$Form[2]][2]);
break;
case 'UL':
case 'LU':
$xChr = strtoupper($_CHR[$Form[2]][2]).strtolower($_CHR[$Form[2]][2]);
break;
default:
$xChr = $_CHR[$Form[2]][2];
}
if( $xChr[0]<>"/" ){
$xChr = str_replace(
array(	       ">"  ,		  chr(92),		   "*",			".",		 "-",		  "[",		   "]"),
array(chr(92)."&gt;", chr(92).chr(92), chr(92)."*", chr(92).".", chr(92)."-", chr(92)."[", chr(92)."]"),
$xChr
);
$xChr = str_replace(" ", chr(92)."s", $xChr);
echo " onfocus=S.key(/^[{$xChr}]{0,{$MaxLen}}".'$'."/,{$MaxLen},0)";
}else{
echo " onfocus=S.key({$xChr},{$MaxLen},0)";
}
}else{
echo " onfocus=S.key('{$Form[2]}',{$MaxLen},0)";
}
if( $Form[5]!='' ){
$tmp = explode(',', $Form[5]);
if( $tmp[0]!='' ){
if( $_CARDSHOW ) $xStyle .= "width:100%;";
else $xStyle .= "width:{$tmp[0]}px;";
}
if( $tmp[1]!='' ) $xStyle .= "height:{$tmp[1]}px;";
}
if( $Invisible ) $xStyle .= 'display:none;';
$txt = "";
if( $_ADDCODE[$Form[_OFIELD]]["I"]!="" ){
if( substr_count($_ADDCODE[$Form[_OFIELD]]["I"], "eCode")==1 ){
$txt = "<script type='text/javascript'>S.replace(S(':{$Form[1]}').obj, 'value', '&#60;','<', '&#62;','>');</script>";
}
if( substr_count($_ADDCODE[$Form[_OFIELD]]["I"], "eFitHeight")==1 ){
$txt = "<script type='text/javascript'>_DimRecalc[_DimRecalc.length] = \"S.fitHeight(window,'{$Form[1]}')\";</script>";
}
if( substr_count($_ADDCODE[$Form[_OFIELD]]["I"], "eIconNone=")>0 ){
$cad = $_ADDCODE[$Form[_OFIELD]]["I"];
$p = strpos($cad, "eIconNone=");
if( $p!==false ){
$i = $p+10;
$c = substr($cad, $i, 1);
$f = strpos($cad, $c, $i+1);
if( $f!==false ){
$tmp3 = array();
$bak = substr($cad,$i+1,$f-$i-1);
$tmp2 = explode(",",$bak);
for($p=0; $p<count($tmp2); $p++){
$tmp3[] = "ed".trim($tmp2[$p]);
}
$_ADDCODE[$Form[_OFIELD]]["I"] = substr($cad,0,$i+1).implode(",", $tmp3).substr($cad,$f);
}
}
}
_AddCodeStyle($_ADDCODE[$Form[_OFIELD]]["I"], $xStyle, $xAddCode);
echo $xAddCode;
}
if( $Form[3]=='H' ) echo ' eHTML=true eIMG="'.$LongImg.'"';
_EchoStyle($xStyle, $_CARDSHOW);
if( substr($Form[1],0,4)=='dct_' ){
list(,,,$AnchoPalabra) = explode(',',$Form[4]);
if( $AnchoPalabra!='' ) echo ' dctLeng="'.$AnchoPalabra.'"';
}
echo ">{$Valor}</TEXTAREA>";
echo $txt;
if( $Form[3]=='H' ){
echo "<SPAN id='{$Form[1]}_' w=1 style='width:100%; height:100%; word-wrap:break-all;'";
if( $Form[_STATUS]!='E' ){
echo " class='READONLY' READONLY=true";
}else{
echo "CONTENTEDITABLE eWE=1 eLONG='{$MaxLen}' onclick='edSetCursor()' onkeydown='edDown()' onfocus='edShow()' onblur='edBlur()'";
}
echo '></SPAN></DIV>';
eJS("edIni('{$Form[1]}');");
if( $_CARDSHOW ) $Invisible = false;
}
break;
case '[R]':
case 'R':
case 'r':
if( substr_count(",b,c,m,", ",{$Opcion},")>0 ){
if( $GLOBALS['_HayCheckRadio']!='' ) $GLOBALS['_HayCheckRadio'] .= ',';
$GLOBALS['_HayCheckRadio'] .= $Form[1];
}
global $_RADIO, $_SKIPTD;
if( $Form[_STATUS]=='V' ){
$Activo .= ' disabled';
}
if( $Form[3]=="R" && !$_CARDSHOW ){
echo '<FIELDSET class=CAJA style="display:inline;width:auto;';
if( !$_SKIPTD[$Form[1]] ) echo 'margin-left:5px;';
if( $_RADIO[$Form[1]]['T']=="" ) echo 'padding-top:0px;';
echo '"'." oncontextmenu=RadioClear('{$Form[1]}')>";
if( $_RADIO[$Form[1]]['T']!='' ) echo "<LEGEND ALIGN='left'>{$_RADIO[$Form[1]]['T']}</LEGEND>";
}
$Etiqueta = true;
$id = 'd';
$_RADIO[$Form[1]]['C'] = strtoupper($_RADIO[$Form[1]]['C']);
$_RADIO[$Form[1]]['C'] = str_replace(' ','' ,$_RADIO[$Form[1]]['C']);
$_RADIO[$Form[1]]['C'] = str_replace('L','E',$_RADIO[$Form[1]]['C']);
$_RADIO[$Form[1]]['C'] = str_replace('F','C',$_RADIO[$Form[1]]['C']);
$_RADIO[$Form[1]]['C'] = str_replace('E','' ,$_RADIO[$Form[1]]['C']);
if( substr_count($_RADIO[$Form[1]][C], 'C')>0 ){
$_RADIO[$Form[1]]['C'] = str_replace( 'C','',$_RADIO[$Form[1]]['C'] );
$Etiqueta = false;
$id = 'i';
echo '<TABLE class="RadioF" border=0px cellspacing=0px cellpadding=0px style="border-collapse:collapse;"><TR>';
}else{
echo '<TABLE class="RadioL" border=0px cellspacing=0px cellpadding=0px style="border-collapse:collapse;"><TR>';
}
$tmpT = explode(',',str_replace(' ','',$_RADIO[$Form[1]]['A']));
$_RADIO[$Form[1]]['D'] = str_replace('&nbsp;','&nbsp#',$_RADIO[$Form[1]]['D']);
$tmp = explode(';',$_RADIO[$Form[1]]['D']);
$nDato = 0;
for($n=0; $n<count($tmp); $n++){
if( $nDato==$_RADIO[$Form[1]]['C'] ){
echo '<TR>';
$nDato = 0;
}
$nDato++;
$tmpD = explode(",", $tmp[$n]);
$tmpD[0] = trim($tmpD[0]);
$tmpD[1] = str_replace( '&nbsp#','&nbsp;',trim($tmpD[1]) );
$EsElValor = '';
if( $Valor==$tmpD[0] ) $EsElValor = ' checked';
if( !$Etiqueta ){
echo '<TD>';
echo "<INPUT NAME='{$Form[1]}' id='{$Form[1]}_{$n}' onfocus='S.key()' TYPE='radio' RadioButton=1 value='{$tmpD[0]}' eValue='{$tmpD[0]}'{$EsElValor}{$OnChange}{$Activo}{$_SubModo}{$_AutoComplet}>";
}
if( $tmpT[$n]=='' ) $tmpT[$n] = 1;
echo "<TD><span";
if( $Form[_STATUS]=='E' ) echo " onclick=\"S('#{$Form[1]}_{$n}',window).radio('{$tmpD[0]}')\"";
echo ' style="width:'.trim($tmpT[$n]).'px" e-Label="'.$Form[1].'_'.$tmpD[0].'">';
if( !$Etiqueta ) echo '&nbsp;';
list($txt,) = explode(chr(92), $tmpD[1] );
echo trim($txt);
if( !$Etiqueta ) echo '&nbsp;&nbsp;';
echo '</span>';
if( $Etiqueta ){
echo "<TD>";
echo "<INPUT NAME='{$Form[1]}' id='{$Form[1]}_{$n}' onfocus=S.key('N',1,0) TYPE='radio' RadioButton=1 value='{$tmpD[0]}' eValue='{$tmpD[0]}'{$EsElValor}{$OnChange}{$Activo}{$_SubModo}{$_AutoComplet}>";
}
}
if( $_ADDCODE[$Form[1]]['A']!='' ){
echo '<td>'.$_ADDCODE[$Form[1]]['A'];
$_ADDCODE[$Form[1]]['A'] = '';
}
echo '</TR></TABLE>';
if( $Form[3]=="R" && !$_CARDSHOW ) echo '</fieldset>';
break;
case '[C]':
case 'C':
case 'c':
if( substr_count(",b,c,m,", ",{$Opcion},")>0 ){
if( $GLOBALS['_HayCheckRadio']!='' ) $GLOBALS['_HayCheckRadio'] .= ',';
$GLOBALS['_HayCheckRadio'] .= $Form[1];
}
if( $Form[_STATUS]=='E' ){
$sActivo = ' class="EDITABLE" eWE=1';
}else if( $Form[_STATUS]=='V' ){
$sActivo = ' class="READONLY" readonly=true disabled onfocus="document.body.focus()"';
}else $sActivo = '';
if( $OnChange=="" ){
$OnChange = " onchange='this.value=(this.checked?\"S\":\"\")'";
}else{
if( substr($OnChange,-2)=="}'" ){
$OnChange = substr($OnChange,0,-2).';this.value=(this.checked?"S":"");'.substr($OnChange,-2);
}else{
$OnChange = substr($OnChange,0,-1).';this.value=(this.checked?"S":"");'.substr($OnChange,-1);
}
}
echo "<INPUT NAME='{$Form[1]}' id='{$Form[1]}' TYPE='checkbox' Diferente='' CheckBox=1 CONIMAGEN=1 SIZE=1 VALUE=\"{$Valor}\"{$Activo}{$OnChange}{$_SubModo}{$sActivo}";
if( $Valor=='S' ) echo " checked";
if( $Form[_STATUS]!='V' ){
if( $Form[_STATUS]=='I' ) echo ' style="display:none"';
echo ' onfocus=S.key("N",1,0)';
}else{
if( $_ADDCODE[$Form[_OFIELD]]["I"]!='' ) echo $_ADDCODE[$Form[_OFIELD]]["I"];
if( isset($_GET['_IMPORT']) ){
echo ' onclick="_ImportField()"';
}else{
echo ' onclick="return false;"';
}
}
echo "{$_AutoComplet}>";
break;
case 'P':
echo "<INPUT NAME='{$Form[1]}' onfocus=S.key('##') type='password' eType='password' VALUE='' eValueOld=\"{$Valor}\" SIZE={$Form[4]} MAXLENGTH={$MaxLen}{$Activo}{$OnChange}{$_SubModo}{$xTitle}";
if( $Form[5]!='' ) echo " style='"._CalcAncho($Form[1], $Form[5])."'";
echo "{$_AutoComplet}>";
if( substr_count(',a,mR,',",{$Opcion},")>0 ){
$GLOBALS["_LoadJS"]['$_e.js'] = 1;
$iconos[] = "<i class='ICONINPUT' onclick=_ViewPass('{$Form[1]}') title='Ver clave'>y</i>";
}
break;
case 'ICON':
case 'IMG':
case 'F':
global $_UPLOADFILE, $_CNTFREEDISKSPACE, $_CNTDISKSPACE, $_CNTDIR;
if( substr_count($Form[6], '#')>0 ){
$IconoOculto = " style='display:none'";
}
$editable = (substr_count(',a,mR,', ",{$Opcion},")>0 && $Form[_STATUS]=="E");
if( substr_count($Form[5], ",")>0 ){
list($an,$al) = explode(",",$Form[5]);
if( is_numeric($an) ){
$Form[5] = $an;
$an = $Form[1];
}else{
$Form[5] = "";
if($an=="") $an = $Form[1];
}
$_DimRecalc[] = "S('.IMGBOX[eFrom=\'{$Form[1]}\']').css('width', S(':{$an}').obj.offsetWidth)";
?>
<?PHP
echo "<span class='IMGBOX' eFrom='{$Form[1]}' style='height:{$al}px;width:".(($_CARDSHOW && !$Invisible)?"100%;margin-left:0px;":$Form[5]."px")."'";
if( substr_count(",a,mR,", ",{$Opcion},")>0 ){
echo "eOFF=1 onmouseenter=\"S(this).tip('{$__Lng[171]}',-3)\"";
}
echo ">";
echo "<table".(($editable)?" onclick=S(':{$Form[1]}').file()":"")." style='display:".(($Valor=="")? "":"none").";width:100%;height:100%'><tr><td valign=middle align=center><i class='ICONDESKTOP'>&#205;</i></table>";
preg_match_all('/[F|H|W]/i', $Form[6], $matches);
echo "<img class='IMGFORM' eView='".implode("",$matches[0])."'";
if( $Valor=="" ){
if( !$editable ) echo " style='cursor:default'";
echo ">";
}else{
if( $_UPLOADFILE[$Form[1]]['oDIR']<>'' ){
$tmp = explode('.',$Valor);
if( $_UPLOADFILE[$Form[1]]['NOMBRE'][0]=='=' ){
$NomFile = _NmFileConPrefijo(trim(substr($_UPLOADFILE[$Form[1]]['NOMBRE'],1)), $_UPLOADFILE[$Form[1]]['PREFIJO']);
}else{
$NomFile = $Fila[$_UPLOADFILE[$Form[1]]['NOMBRE']];
if( $_UPLOADFILE[$Form[1]]['NOMBRE']!=$Form[1] ) $NomFile .= '.'.$tmp[count($tmp)-1];
$NomFile = _NmFileConPrefijo($NomFile, $_UPLOADFILE[$Form[1]]['PREFIJO']);
}
$_UPLOADFILE[$Form[1]]['oDIR'] = eSplitPath( $NomFile, $_UPLOADFILE[$Form[1]]['oDIR'] );
$NomFile = $_UPLOADFILE[$Form[1]]['oDIR'].'/'.$NomFile;
}
echo " src='".eImg64($NomFile)."' style='display:block;".(($editable)?"":"cursor:default;")."'>";
eJS("setTimeout(function(){S.imgShow(S(':{$Form[1]}').obj, true);},1);");
}
echo "</span>";
if( $_CARDSHOW && !$Invisible ) echo "</div><div class='card-td'></div></div><DIV class='card-row'><DIV class='card-td100'>";
if( $OnChange=='' ){
$OnChange = " onchange='S.imgShow(this);'";
}else{
$OnChange = substr($OnChange,0,-1)."S.imgShow(this);'";
}
}
if( substr_count(",b,c,m,s,q,cR,bR,", ",{$Opcion},")>0 ){
echo "<INPUT NAME='{$Form[1]}' TYPE='".(($Invisible) ? 'HIDDEN':'TEXT')."' VALUE=\"{$Valor}\" SIZE={$Form[4]} MAXLENGTH={$MaxLen}{$Activo}{$_SubModo} TYPEFILE";
if( $Form[5]!='' ) echo " style='"._CalcAncho($Form[1], $Form[5])."'";
echo "{$_AutoComplet}>";
if( $Valor!='' && substr_count($Form[6],'D')>0 ){
$Valor = urlencode($Valor);
$tmp = explode('.',$Valor);
if( $_UPLOADFILE[$Form[1]]['oDIR']<>'' ){
if( $_UPLOADFILE[$Form[1]]['NOMBRE'][0]=='=' ){
$NomFile = _NmFileConPrefijo(trim(substr($_UPLOADFILE[$Form[1]]['NOMBRE'],1)), $_UPLOADFILE[$Form[1]]['PREFIJO']);
}else{
$NomFile = $Fila[$_UPLOADFILE[$Form[1]]['NOMBRE']];
if( $_UPLOADFILE[$Form[1]]['NOMBRE']!=$Form[1] ) $NomFile .= '.'.$tmp[count($tmp)-1];
$NomFile = $_UPLOADFILE[$Form[1]]['oDIR'].'/'._NmFileConPrefijo($NomFile, $_UPLOADFILE[$Form[1]]['PREFIJO']);
}
eContextFile("D:{$NomFile}");
$iconos[] = '<i class="ICONINPUT ICONVIEW" onclick=top.eCallSrv(window,"edes.php?D:'.$NomFile.'&_TOOLSIMG=1&FILE='.$Valor.'") title="'.$__Lng[36].'">V</i>';
}else{
$b64 = base64_encode($_UPLOADFILE[$Form[1]]['NOMBRE'].','.$GLOBALS['_sDBTABLE'].','.$GLOBALS['_DBINDEX'].','.$Fila[$GLOBALS['_DBINDEX']].','.$tmp[count($tmp)-1].','.$Valor);
$b64 = substr($b64,0,10).substr(md5(time()),0,10).substr($b64,10);
if( isset($GLOBALS['_DB']) ) $b64 .= '&_DB='.$GLOBALS['_DB'];
$iconos[] = '<i class="ICONINPUT ICONVIEW" onclick=top.eCallSrv(window,"edes.php?D:!'.$b64.'&FILE='.$Valor.'") title="'.$__Lng[36].'">V</i>';
}
}
}else{
$InfoSpaceImgHelp = '';
if( $_CNTFREEDISKSPACE ) include('../../edesweb/itm/diskspace.php');
$GLOBALS['_ConFicheros'] = true;
if( substr($_UPLOADFILE[$Form[1]]['DIR'],0,2)=='..' && substr($_UPLOADFILE[$Form[1]]['DIR'],0,6)!='../../' ) $_UPLOADFILE[$Form[1]]['DIR'] = substr($_UPLOADFILE[$Form[1]]['DIR'],2);
$tmp = '';
if( $Valor<>"" && $_UPLOADFILE[$Form[1]]['DIR']<>"" ) $tmp = $_UPLOADFILE[$Form[1]]['DIR'].'/'.$Valor;
$xtmp = $tmp;
if( $_UPLOADFILE[$Form[1]]['EXT']!='' ){
}
if( $_UPLOADFILE[$Form[1]]['oDIR']<>'' ){
$tmp = explode('.',$Valor);
if( $_UPLOADFILE[$Form[1]]['NOMBRE'][0]=='=' ){
$NomFile = _NmFileConPrefijo(trim(substr($_UPLOADFILE[$Form[1]]['NOMBRE'],1)), $_UPLOADFILE[$Form[1]]['PREFIJO']);
}else{
$NomFile = $Fila[$_UPLOADFILE[$Form[1]]['NOMBRE']];
if( $_UPLOADFILE[$Form[1]]['NOMBRE']!=$Form[1] ) $NomFile .= '.'.$tmp[count($tmp)-1];
$NomFile = _NmFileConPrefijo($NomFile, $_UPLOADFILE[$Form[1]]['PREFIJO']);
}
$_UPLOADFILE[$Form[1]]['oDIR'] = eSplitPath( $NomFile, $_UPLOADFILE[$Form[1]]['oDIR'] );
$NomFile = $_UPLOADFILE[$Form[1]]['oDIR'].'/'.$NomFile;
}
echo '<span class="FILEGROUP"';
if( $_CARDSHOW ) echo " style='width:100%; display:inherit'";
echo '>';
echo "<input name='{$Form[1]}' type='text' class='READONLY' readonly=true value='{$Valor}' NewValue='' OldValue=\"{$Valor}\" eUpload=0 OldValue=\"{$Valor}\" eFILENAME=\"{$xtmp}\" SIZE={$Form[4]} MAXLENGTH={$MaxLen}{$Activo}{$OnChange}{$_SubModo}{$xTitle} onfocus='document.body.focus()'";
if( $_UPLOADFILE[$Form[1]]['EXT']<>"" ) echo " eExt='".$_UPLOADFILE[$Form[1]]['EXT']."'";
if( $_UPLOADFILE[$Form[1]]['BYTS']<>"" ) echo " eByts=".($_UPLOADFILE[$Form[1]]['BYTS']*1);
echo " ePrefix='".$_UPLOADFILE[$Form[1]]['PREFIJO']."'";
echo " eSizeFile='".filesize(eScript($NomFile))."'";
if( $Form[_STATUS]=='E' ) echo " onclick=S(':{$Form[1]}').file() oncontextmenu=S.preview('{$Form[1]}',window)";
if( $GLOBALS['_gsObjeto']=='F' && isset($GLOBALS['_ChildrenData']) ) echo ' oDIR="'.$_UPLOADFILE[$Form[1]]['oDIR'].'"';
if( $_ADDCODE[$Form[1]]['I']!='' ) echo $_ADDCODE[$Form[1]]['I'];
echo ' title="'.$__Lng[177].'"';
$xStyle = "cursor:pointer;";
if( $Form[_STATUS]=='I' ) $xStyle .= "display:none;";
if( $Form[5]!='' ) $xStyle .= _CalcAncho($Form[1], $Form[5]);
if( $_CARDSHOW ) $xStyle .= 'width:100%;';
echo " style='{$xStyle};'";
echo "{$_AutoComplet}>";
if( $Form[_STATUS]=='E' ) $iconos[] = "<i class='ICONINPUT' oi=1 onclick=S(':{$Form[1]}').file()".' oncontextmenu=S.preview("'.$Form[1].'",window); title="'.$__Lng[177].'">w</i>';
echo "<input name='_FILE_{$Form[1]}' type='file' eStatus='{$Form[_STATUS]}'";
if( $_UPLOADFILE[$Form[1]]['EXT']<>"" && $_UPLOADFILE[$Form[1]]['EXT']<>"*" ) echo " accept='.".str_replace(",", ",.", eNsp($_UPLOADFILE[$Form[1]]['EXT']))."'";
echo "{$_AutoComplet}>";
echo '</span>';
$Valor = urlencode($Valor);
if( $Form[_STATUS]=='E' ){
global $_DefaultPathType, $_DefaultPathFile, $_SourceScript;
if( $_DefaultPathType!='' || $_DefaultPathFile!='' ){
if( $_DefaultPathFile!='' ){
$Source = '../_datos/usr/path_'.strtr($_DefaultPathFile, '$/', '__').'.'.$_SESSION['_User'];
}else if( strtoupper($_DefaultPathType)=='S' ){
$Source = '../_datos/usr/path_'.strtr($_SourceScript, '$/', '__').'.'.$_SESSION['_User'];
}else{
$Source = '../_datos/usr/path.'.$_SESSION['_User'];
}
include_once($Source);
}
if( $_CNTFREEDISKSPACE ) $iconos[] = $InfoSpaceImg;
else{
}
}
if( substr_count($Form[6], '#')>0 ){
$iconos[] = "<i class='ICONINPUT' onclick='_MenuIco(this)' title='Menú'>B</i>";
}
if( substr_count($Form[6], 'D')>0 ){
if( $Opcion=='a' || $Opcion=='mR' ){
$xTitle = $_UPLOADFILE[$Form[1]]['TITLE'];
if( $xTitle=='' ){
$xTitle = $__Lng[34];
}else{
$xTitle .= "\n".$__Lng[35];
}
if( $Opcion=='mR' && $Valor!='' ){
$tmp = explode('.', $Valor);
$xTitle = $__Lng[36];
if( $_UPLOADFILE[$Form[1]]['oDIR']<>'' ){
if( $_UPLOADFILE[$Form[1]]['NOMBRE'][0]=='=' ){
$NomFile = _NmFileConPrefijo( trim(substr($_UPLOADFILE[$Form[1]]['NOMBRE'],1)), $_UPLOADFILE[$Form[1]]['PREFIJO'] );
}else{
$NomFile = $Fila[$_UPLOADFILE[$Form[1]]['NOMBRE']];
if( $_UPLOADFILE[$Form[1]]['NOMBRE']!=$Form[1] ) $NomFile .= '.'.$tmp[count($tmp)-1];
$NomFile = _NmFileConPrefijo( $NomFile, $_UPLOADFILE[$Form[1]]['PREFIJO'] );
}
$_UPLOADFILE[$Form[1]]['oDIR'] = eSplitPath( $NomFile, $_UPLOADFILE[$Form[1]]['oDIR'] );
$NomFile = $_UPLOADFILE[$Form[1]]['oDIR'].'/'.$NomFile;
if( file_exists(eScript($NomFile)) ){
eContextFile("D:{$NomFile}");
$iconos[] = '<i class="ICONINPUT ICONVIEW" onclick=top.eCallSrv(window,"edes.php?D:'.$NomFile.'&FILE='.$Valor.'") title="'.$xTitle.'"'.$IconoOculto.'>V</i>';
}
}else if( $Valor<>'' ){
$b64 = base64_encode($_UPLOADFILE[$Form[1]]['NOMBRE'].','.$GLOBALS['_sDBTABLE'].','.$GLOBALS['_DBINDEX'].','.$Fila[$GLOBALS['_DBINDEX']].','.$tmp[count($tmp)-1].','.$Valor);
$b64 = substr($b64,0,10).substr(md5(time()),0,10).substr($b64,10);
if( isset($GLOBALS['_DB']) ) $b64 .= '&_DB='.$GLOBALS['_DB'];
$iconos[] = '<i class="ICONINPUT ICONVIEW" onclick=top.eCallSrv(window,"edes.php?D:!'.$b64.'&FILE='.$Valor.'") title="'.$xTitle.'"'.$IconoOculto.'>V</i>';
if( substr_count($Form[6],'U')>0 && $Form[1][0]!='_' && $Form[8]!='#' ){
$iconos[] = '<i class="ICONINPUT ICONDELETE" oi=1 eFO="'.$Form[1].',D" title="'.$__Lng[38].'" onclick=_DelFile("'.$Form[1].'")'.$IconoOculto.'>D</i>';
}
}
if( $_UPLOADFILE[$Form[1]]['oDIR']<>'' && file_exists(eScript($NomFile)) ){
if( substr_count($Form[6],'U')>0 && $Form[1][0]!='_' && $Form[8]!='#' ){
$iconos[] = '<i class="ICONINPUT ICONDELETE" oi=1 eFO="'.$Form[1].',D" title="'.$__Lng[38].'" onclick=_DelFile("'.$Form[1].'")'.$IconoOculto.'>D</i>';
}
}
}else if( $Opcion=='a' ){
if( substr_count($Form[6],'U')>0 && $Form[1][0]!='_' && $Form[8]!='#' ){
$iconos[] = '<i class="ICONINPUT ICONDELETE OFF" disabled oi=1 eFO="'.$Form[1].',D" title="'.$__Lng[38].'" onclick=_DelFile("'.$Form[1].'")'.$IconoOculto.'>D</i>';
}else if( substr_count($Form[6],'U')>0 && $Form[1][0]=='_' && $Form[8]!='#' ){
$iconos[] = '<i class="ICONINPUT ICONDELETE OFF" disabled oi=1 eFO="'.$Form[1].',D" title="'.$__Lng[38].'" onclick=_DelFile("'.$Form[1].'")'.$IconoOculto.'>D</i>';
}
}
}
$iconos[] = $InfoSpaceImgHelp;
}
}
if( substr($Opcion,1)=="R" ){
global $_FILELOG, $_DBTABLE, $_vF;
if( $_FILELOG[$_DBTABLE.".".$Form[1]] ){
$logPk = $_vF[$_UPLOADFILE[$Form[1]]['NOMBRE']];
$n = qCount("gs_log_doc", "dbtable='{$_DBTABLE}' and nm_field='{$Form[1]}' and pk='{$logPk}'");
if( $n>0 ){
$iconos[] = "<i class='ICONINPUT' onclick='_LogDocList(\"{$_DBTABLE},{$Form[1]},{$logPk}\")' onmouseenter='S(this).tip(\"Histórico de modificaciones {$n}\",-1)'{$IconoOculto}>&#172;</i>";
}
}
}
break;
case 'f':
echo "<INPUT NAME=FICHERO[] TYPE='FILE' VALUE=\"{$Valor}\" SIZE={$Form[4]} MAXLENGTH={$MaxLen}{$Activo}{$OnChange}{$_SubModo}";
if( $Form[5]!='' ) echo " style='"._CalcAncho( $Form[1], $Form[5] ).'"';
echo "{$_AutoComplet}>";
break;
case 'G':
echo "<img src='g/{$Form[1]}'";
if( $Form[4]!='' ) echo " width={$Form[4]}px";
if( $Form[5]!='' ) echo " height={$Form[5]}px";
if( $Form[9]!='' ){
list( $Form[9] ) = explode('(',$Form[9]);
echo " onclick={$Form[9]}()";
}
echo '>';
break;
case '[S]':
case 'SP':
case 'M':
case 's':
case 'S':
$NomSelect = $Form[_FIELD];
$NomCampo = $Form[_OFIELD];
$oValor = $Valor;
if( !($_SELECTMULTIPLE[$NomCampo]!='' && substr_count(',cR,bR,', ",{$Opcion},")>0) ){
$Prefijo = '';
if( $_SELECTMULTIPLE[$NomCampo]!='' ){
$Prefijo = '_';
$Valor = '';
for($n=0; $n<count($_CalcularAnchos); $n++){
$_CalcularAnchos[$n] = str_replace(',"_INPUT_'.$oCampo.'")', ',"_INPUT__'.$oCampo.'")', $_CalcularAnchos[$n]);
}
}
if( substr_count(strtoupper($Form[6]), 'I')==0 ){
$Form[16] = '_INPUT_'.$NomCampo;
$SoloSelect = true;
echo "<INPUT NAME='{$Prefijo}{$oCampo}' i_SS=1 VALUE=\"{$Valor}\" style='display:none' ALTO={$AltoSelect}{$_SubModo} TS='{$Form[3]}'";
if( substr_count($Form[4], ',')>0 ){
list($a) = explode(",",$Form[4]);
echo " size={$a}";
}
if( $_ADDCODE[$Form[_OFIELD]]["I"]!="" ) echo $_ADDCODE[$Form[_OFIELD]]["I"];
global $_ADDOPTIONVALUE, $_NM_ATRIBUTE;
if( $_ADDOPTIONVALUE[$oCampo]!='' ) echo ' ADDOPTIONVALUE="'.$_ADDOPTIONVALUE[$oCampo].'"';
if( substr_count($Form[1], '{')>0 ){
list(,$CampoRead) = explode(',',$Form[1]);
echo ' FRF="'.trim($CampoRead).'"';
}else if( substr_count($Form[1], ':')>0 ){
list(,$CampoRead) = explode(':',$Form[1]);
echo ' FRF="'.trim($CampoRead).'"';
}
if( substr_count(':+:-:', ":{$Form[2]}:")==1 ){
echo ' TD="0"';
}else{
echo ' TD="'.$Form[2].'"';
}
if( $_ENV["."]["cache"]!='' && $DimRelation[$NomCampo] ) echo " eCache=1";
echo "{$_AutoComplet}>";
}
if( $Form[_STATUS]=='I' ) break;
$OnChange = str_replace('this.value', 'eGF("'.$Prefijo.$oCampo.'")', $OnChange);
echo '<span class="SELECTINPUT"';
if( $Form[_STATUS]!='V' ){
echo ' onclick=S.key("S")>';
}else{
echo '>';
}
echo "<INPUT NAME='_INPUT_{$Prefijo}{$NomCampo}' IND=-1 TMPIND=-1{$OnChange}{$_SubModo}{$xTitle}{$RelationList}";
if( $_SELECTMULTIPLE[$NomCampo]!='' ){
echo " SMultiple=1 TS='{$Form[3]},L'";
if( $GLOBALS['_SELECTMULTIPLESORT'][$NomCampo] ) echo ' SMultipleSort=1';
}else{
echo " TS='{$Form[3]}'";
}
if( $Form[_STATUS]!='V' ){
echo " onfocus=S.key('S') class='EDITABLE' eWE=1";
}
if( $Form[5]!='' ){
$xStyle .= _CalcAncho("_INPUT_{$Prefijo}{$Form[1]}", $Form[5]);
}else{
if( substr_count($Form[4],',')>0 ) list(,$Form[4]) = explode(',',$Form[4]);
echo " SIZE='".$Form[4]."'";
}
if( $AltoSelect!=1 ) $xStyle .= 'display:none;';
if( $_SelectMaxRows!='' ) echo ' eSelectRows="'.$_SelectMaxRows.'"';
if( $_ADDCODE[$Form[_OFIELD]]["I"]!="" ){
_AddCodeStyle($_ADDCODE[$Form[_OFIELD]]["I"], $xStyle, $xAddCode);
echo $xAddCode;
}
$xValor = "";
if( substr_count(",bR,cR,", ",{$Opcion},")>0 || (substr_count($Form[_MODE],'A')>0 && $Opcion=='mR') || $Form[_STATUS]!='E' ){
$xValor = SelectDeBaja($NomSelect, $Valor);
}
_EchoStyle($xStyle.(strpos(strtoupper($Form[6]),"I")===false ? "":"margin-left:-1px;"), $_CARDSHOW);
echo ' TYPE=TEXT VALUE="'.$xValor.'"'.$Activo.$_AutoComplet.'>';
echo '</span>';
if( $Form[_STATUS]!='E' && ($GLOBALS['_NOSELECTFILL'][$NomCampo] || $GLOBALS['_NOSELECTFILL']['*']) ){
break;
}
if( substr_count(',bR,cR,', ",{$Opcion},")>0 || (substr_count($Form[_MODE],'A')>0 && $Opcion=='mR') ){
}else{
if( $Form[_STATUS]!='E' && ($GLOBALS['_NOSELECTFILL'][$NomCampo] || $GLOBALS['_NOSELECTFILL']['*']) ){
}else{
}
}

CrearSelect($NomSelect, $Valor, ($AltoSelect!=1), $Form[5], ($Form[3]=='[S]'), $_ADDCODE[$Form[_OFIELD]]["I"], $Form);

}
if( $_SELECTMULTIPLE[$NomCampo]!="" ){
echo "<table class='LstFieldBrowser col_0n";
if( substr_count(",cR,bR,", ",{$Opcion},")==0 ){
}else{
echo ' col_1n';
}
echo "' border=0px cellspacing=0px cellpadding=0px id=LIST_{$oCampo} width=1px style='border-collapse:collapse;'>";
if( $oValor!='' ){
$NomCampo = $NomSelect;
$oNomCampo = $NomCampo;
$tCampos = 1;
if( substr_count($NomCampo,'{')>0 ){
$tmp = str_replace('{', ',', $NomCampo);
$tmp = str_replace('}', '', $tmp);
$tmp = explode(',', $tmp);
$Tabla = $tmp[1];
$Ordenacion = trim($tmp[3]);
if( substr_count($Ordenacion,' ')>0 ) $Ordenacion = substr($Ordenacion,strrpos($Ordenacion,' ')+1);
$NomCampo = trim($tmp[0]);
$Campos = $tmp[2];
$tCampos = count($tmp);
for($i=3; $i<$tCampos; $i++) $Campos .= ','.$tmp[$i];
}else if( substr_count($NomCampo,':')>0 ){
list($NomCampo, $nNomCampo) = explode(':', $NomCampo);
$Tabla = substr($nNomCampo,3);
$Campos = $nNomCampo.', nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
}else{
$Tabla = substr($NomCampo,3);
$Campos = $NomCampo.', nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
}
eMultitenancy($Tabla);
if( substr_count($Ordenacion, " as ")==1 ) list(,$Ordenacion) = explode(" as ", $Ordenacion);
list($Campo1, $Campo2) = explode(',',$Campos);
$Valores = "'".str_replace(',',"','",$oValor)."'";
qQuery("select {$Campos} from {$Tabla} where {$Campo1} in ({$Valores}) order by {$Ordenacion}");

while( $r=qRow() ){
	echo "<tr><td>{$r[0]}<td><i class='ICONINPUT ICONDELETE' onclick=_SMDelOption('{$oCampo}') style='margin-right:2px' title='{$__Lng[42]}'>D</i><td>".$r[1];
	for($i=2; $i<count($r); $i++){
		echo $r[$i];
	}
}

}
echo '</table>';
echo "<INPUT NAME='{$oCampo}' VALUE=\"{$oValor}\" MAXLENGTH={$_SELECTMULTIPLE[$NomCampo]} type=hidden MultipleValues=1{$_AutoComplet} TS='{$Form[3]}'>";
}
if( $Form[3]=='S' && $Form[_STATUS]!='V' ){
global $_GESAUX;
if( $_GESAUX[$NomCampo] ){
$iconos[] = "<img src='g/op_menu.gif' onclick='_GesAux(\"{$_GESAUX[$NomCampo][0]}\",\"{$_GESAUX[$NomCampo][1]}\")'>";
}
}
break;
case 'Ss':
case 'SS':
$NomSelect = $Form[_FIELD];
$NomCampo = $Form[_OFIELD];
if( substr_count(strtoupper($Form[6]), 'I')==0 ){
$Form[16] = '_INPUT_'.$NomCampo;
$SoloSelect = true;
echo "<INPUT NAME='{$oCampo}' VALUE=\"{$Valor}\" SS=1 style='display:none' ALTO={$AltoSelect}{$_SubModo} TS='{$Form[3]}'";
if( substr_count($Form[4], ',')>0 ){
list($a) = explode(",",$Form[4]);
echo " size={$a}";
}
global $_ADDOPTIONVALUE, $_NM_ATRIBUTE;
if( $_ADDOPTIONVALUE[$oCampo]!='' ) echo ' ADDOPTIONVALUE="'.$_ADDOPTIONVALUE[$oCampo].'"';
if( $Form[14]!=',cd_,nm_' && $Form[14]!='' ){
echo ' xSELECT="{'.str_replace('"',"'",$Form[14]).'}"';
$GLOBALS["_CONTEXTSUBSELECT"][] = '{'.str_replace('"',"'",$Form[14]).'}';
}
if( substr_count($Form[1],'{')>0 ){
echo ' xSELECT="'.$Form[1].'"';
$GLOBALS["_CONTEXTSUBSELECT"][] = $Form[1];
}
if( substr_count( $Form[1], '{' )>0 ){
list(,$CampoRead) = explode(',',$Form[1]);
echo ' FRF="'.trim($CampoRead).'"';
}else if( substr_count( $Form[1], ':' )>0 ){
list(,$CampoRead) = explode(':',$Form[1]);
echo ' FRF="'.trim($CampoRead).'"';
}
if( $GLOBALS['_pWHERESELECT'][$oCampo]!='' ){
echo " WhereSelect='". str_replace('"','&#34;',str_replace("'",'&#39;',_InVar($GLOBALS['_pWHERESELECT'][$oCampo]))) ."'";
}
if( $_ENV["."]["cache"]!='' && $DimRelation[$NomCampo] ) echo " eCache=1";
echo "{$_AutoComplet}>";
}
if( $Form[_STATUS]=='I' ) break;
echo '<span class="SELECTINPUT">';
echo "<INPUT NAME='_INPUT_{$NomCampo}' SS=1 IND=-1 TMPIND=-1{$OnChange}{$_SubModo}{$xTitle}{$RelationList}";
if( $OnChangeSrv!='' ) echo $OnChangeSrv;
if( $_RELATIONJUMP[$NomCampo]==2 ) echo ' JumpON="'.$_RELATIONJUMP[$NomCampo.'Jump'].'"';
if( $Form[19]!='#' && $Form[19]!='=' && $GLOBALS['_ModeQuestion'] && $GLOBALS['_QuestionsEmptyData'] ) echo ' _QED=1';
if( $Form[_STATUS]!='V' ){
echo " onfocus=S.key('S') class='EDITABLE' eWE=1";
}
if( $Form[5]!='' ) $xStyle .= _CalcAncho("_INPUT_{$NomCampo}", $Form[5]);
if( $AltoSelect!=1 ) $xStyle .= 'display:none;';
if( $_ADDCODE[$Form[_OFIELD]]["I"]!="" ){
_AddCodeStyle($_ADDCODE[$Form[_OFIELD]]["I"], $xStyle, $xAddCode);
echo $xAddCode;
}
_EchoStyle($xStyle.(strpos(strtoupper($Form[6]),"I")===false ? "":"margin-left:-1px;"));
if( $Form[4]>0 ) echo " SIZE={$Form[4]}";
if( $MaxLen>0 ) echo " MAXLENGTH={$MaxLen}";
echo " TYPE='TEXT' VALUE=''{$Activo}{$_AutoComplet}>";
echo '</span>';
QueDependencia($Form[1], $Fila, $Opcion, $Valor, $_Form, true, ($AltoSelect!=1), $Form[5], $TotalOptions);
if( substr_count(',a,mR,b,c,m,', ",{$Opcion},")>0 && $Form[_STATUS]!='V' ){
if( $_RELATIONJUMP[$NomCampo]==1 ) echo '<i class="ICONINPUT" onclick="eSelectJump()" id="_rf_'.$NomCampo.'" title="'.$__Lng[44].'" style="font-size:50%">i</i>';
if( $_RELATIONJUMP[$NomCampo]==2 ) echo '<i class="ICONINPUT" onclick="eSelectJump()" JumpOFF="1" id="_rf_'.$NomCampo.'" title="'.$__Lng[144].'" style="font-size:50%">j</i>';
}
if( isset($OnChangeSrvFunc) && $TotalOptions>0 ) eJS($OnChangeSrvFunc);
break;
case 'SX':
case 'SV':
case '[SV]':
$sForm = $Form[1];
$NomSelect = $Form[_FIELD];
$NomCampo = $Form[_OFIELD];
$rValor = $Valor;
$oValor = $Valor;
$SinSelect = (substr_count(",cR,bR,", ",{$Opcion},")>0);
$Prefijo = '';
if( $_SELECTMULTIPLE[$NomCampo]!='' ){
$Prefijo = '_';
$Valor = '';
for($n=0; $n<count($_CalcularAnchos); $n++){
$_CalcularAnchos[$n] = str_replace(',"_INPUT_'.$oCampo.'")', ',"_'.$oCampo.'")', $_CalcularAnchos[$n]);
}
}
if( substr_count(strtoupper($Form[6]), 'I')==0 ){
$Form[16] = '_INPUT_'.$NomCampo;
$SoloSelect = true;
echo "<INPUT NAME='{$Prefijo}{$oCampo}' VALUE=\"{$Valor}\" TYPE='HIDDEN'{$_SubModo}";
if( substr_count($Form[4], ',')>0 ){
list($a) = explode(",",$Form[4]);
echo " size={$a}";
}
if( $Prefijo!='_' ){
echo " TS='{$Form[3]},B'";
}
global $_ADDOPTIONVALUE, $_NM_ATRIBUTE;
if( $_ADDOPTIONVALUE[$oCampo]!='' ) echo ' ADDOPTIONVALUE="'.$_ADDOPTIONVALUE[$oCampo].'"';
echo " TC='#'{$_AutoComplet}>";
}
if( $Form[_STATUS]=='I' ) break;
if( $MaxLen>0 ) $Form[4] = $MaxLen;
if( !$_SELECTMULTIPLEBOX[$NomCampo] ){
echo '<span class="SELECTINPUT">';
echo "<INPUT name='_INPUT_{$Prefijo}{$NomCampo}' IND=-1 TMPIND=-1{$OnChange}{$_SubModo}{$xTitle}{$RelationList}";
if( $_SELECTMULTIPLE[$NomCampo]!='' ){
echo ' SMultiple=1';
if( $GLOBALS['_SELECTMULTIPLESORT'][$NomCampo] ) echo ' SMultipleSort=1';
}
if( $Form[_STATUS]!='V' ){
echo " onfocus=S.key('S') class='EDITABLE' eWE=1";
}
if( $Form[5]!='' ) $xStyle .= _CalcAncho("_INPUT_{$Prefijo}{$NomCampo}", $Form[5]);
if( $AltoSelect!=1 ) $xStyle .= 'display:none;';
if( $_SelectMaxRows!='' ) echo ' eSelectRows="'.$_SelectMaxRows.'"';
if( $_ADDCODE[$Form[_OFIELD]]["I"]!="" ){
_AddCodeStyle($_ADDCODE[$Form[_OFIELD]]["I"], $xStyle, $xAddCode);
echo $xAddCode;
}
_EchoStyle($xStyle.(strpos(strtoupper($Form[6]),"I")===false ? "":"margin-left:-1px;"));
echo " TYPE='TEXT' SIZE={$Form[4]} MAXLENGTH={$Form[4]} VALUE=''{$Activo}{$_AutoComplet}>";
if( substr_count($Form[6], 'S')>0 && $Form[_STATUS]!='V' ){
echo '<i class="ICONINPUT" onclick=S(":'.$Form[1].'").nextValue() onmousewheel=S(":'.$Form[1].'").nextValue()>s</i>';
}
echo '</span>';
}
if( substr_count($AnchoDIV, ",")>0 ) list(,$AnchoDIV) = explode(",",$AnchoDIV);
echo '<DIV class="SELECT EDITABLE SCROLLBAR">';
echo "<TABLE id='{$Prefijo}{$NomCampo}_TABLE' cols=2";
if( $_ADDCODE[$NomCampo]['F']!="" ) echo " class='".$_ADDCODE[$NomCampo]['F']."'";
echo ">".$__Enter;
echo '<COL><COL>'.$__Enter;
$dimPkSelect = array();
if( $oValor!='' ){
$ooValor = $oValor;
if( $ooValor[0]==',' ) $ooValor = substr($ooValor,1);
if( substr($ooValor,-1)==',' ) $ooValor = substr($ooValor,0,-1);
$dimPkSelect = explode(",", $ooValor);
}
global $_xPutSelect, $_ADDOPTIONVALUE;
$_xPutSelect = '';
$OptionOn = 2;
if( $_ADDOPTIONVALUE[$sForm]!='' ){
$tmp = explode(',',str_replace(' ','',$_ADDOPTIONVALUE[$sForm]));
for($i=0; $i<count($tmp); $i++) echo '<COL id=o NM_ATRIBUTE='.$tmp[$i].'>';
$OptionOn += count($tmp);
}
$PosOption = -1;
if( $Form[3]=='SV' || $Form[3]=='[SV]' ){
$textContent = '';
$NomCampo = $sForm;
$PonePrefijo = false;
if( preg_match('/({|:)/', $Form[1]) ){
$tCampos = 1;
if( substr_count($Form[1],'{')>0 ){
$tmp = str_replace('{', ',', $Form[1]);
$tmp = str_replace('}', '', $tmp);
$tmp = explode(',', $tmp);
$Tabla = $tmp[1];
$Ordenacion = trim($tmp[3]);
if( substr_count($Ordenacion,' ')>0 ) $Ordenacion = substr($Ordenacion,strrpos($Ordenacion,' ')+1);
$NomCampo = trim($tmp[0]);
$Campos = $tmp[2];
$tCampos = count($tmp);
for($i=3; $i<$tCampos; $i++) $Campos .= ','.$tmp[$i];
}else if( substr_count($Form[1],':')>0 ){
list($NomCampo, $nNomCampo) = explode(':', $NomCampo);
$Tabla = substr($nNomCampo,3);
$Campos = $nNomCampo.', nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
}
eMultitenancy($Tabla);
if( substr_count($Ordenacion, " as ")==1 ) list(,$Ordenacion) = explode(" as ", $Ordenacion);
list($Campo1, $Campo2) = explode(',',$Campos);
$Valores = "'".str_replace(',',"','",$oValor)."'";
$_ADDOPTION[$NomCampo] = "select {$Campos} from {$Tabla} order by {$Ordenacion}";
}
if( !empty($_ADDOPTION[$NomCampo]) ){
if( $Form[3]=='[SV]' && empty($_ADDOPTION[substr($NomCampo,1)]) ){
$_ADDOPTION[substr($NomCampo,1)] = $_ADDOPTION[$NomCampo];
}
if( substr_count($_ADDOPTION[$NomCampo], '()')==1 ){
$_ADDOPTION[$NomCampo] = trim($_ADDOPTION[$NomCampo]);
if( substr($_ADDOPTION[$NomCampo],-2)=="()" ){
$_ADDOPTION[$NomCampo] = substr($_ADDOPTION[$NomCampo],0,-2)."('{$NomCampo}')";
}else if( substr($_ADDOPTION[$NomCampo],-3)=="();" ){
$_ADDOPTION[$NomCampo] = substr($_ADDOPTION[$NomCampo],0,-3)."('{$NomCampo}');";
}
if( substr($_ADDOPTION[$NomCampo],-1)!=';' ) $_ADDOPTION[$NomCampo] .= ';';
$tmp = @eval('return '.$_ADDOPTION[$NomCampo]);
if( count($tmp[0])>=2 ){
$pr=0;
for($i=0; $i<count($tmp); $i++){
$tmp[$i][0] = trim($tmp[$i][0]);
$tmp[$i][1] = trim($tmp[$i][1]);
if( $i==0 && $Valor=='' ) $Valor = $tmp[$i][0];
if( $Valor==$tmp[$i][0] || $tmp[$i][$OptionOn]==true ){
$ValueText = $tmp[$i][0];
$textContent = $tmp[$i][1];
}
if( in_array($tmp[$i][0], $dimPkSelect) ) $dimSelec[] = [$tmp[$i][0], $tmp[$i][1]];
if( $SinSelect ) continue;
echo '<TR v="'.$tmp[$i][0].'" r="'.$pr.'"><TD>'.$tmp[$i][0].'<TD>'.$tmp[$i][1];
if( $tmp[$i][1]=="" ) echo '&nbsp;';
for($p=2; $p<$OptionOn; $p++) echo '<TD>'.$tmp[$i][$p];
if( $i==0 && $tmp[$i][0]=='' && $Form[19]!='#' && $Form[19]!='=' && $GLOBALS['_ModeQuestion'] && $GLOBALS['_QuestionsEmptyData'] ){
if( strpos('bcm',$GLOBALS['_Mode'])!==false ){
_ShowQuestionsEmptyData($OptionOn);
$pr += 2;
}
}
$pr++;
}
}else{
$i = 0;
$p = true;
$pr=0;
foreach($tmp as $k=>$v){
$k = trim($k);
$v = trim($v);
if( $p && $Valor=='' ) $Valor = $k;
if( $Valor==$k ){
$ValueText = $k;
$textContent = $v;
}
if( in_array($k, $dimPkSelect) ) $dimSelec[] = [$k, $v];
if( $SinSelect ) continue;
echo '<TR v="'.$k.'" r='.$pr.'><TD>'.$k.'<TD>'.$v;
if( trim($v)=="" ) echo '&nbsp;';
$p = false;
if( $i==0 && $k=='' && $Form[19]!='#' && $Form[19]!='=' && $GLOBALS['_ModeQuestion'] && $GLOBALS['_QuestionsEmptyData'] ){
if( strpos('bcm',$GLOBALS['_Mode'])!==false ){
_ShowQuestionsEmptyData(2);
$pr += 2;
}
}
$i++;
$pr++;
}
}
}elseif( substr( strtoupper($_ADDOPTION[$NomCampo]),0,7)=='SELECT ' ){
$i = 0;
$pr = 0;
global $_ADDOPTIONBLANK;
if( $_ADDOPTIONBLANK[$NomCampo] ){
echo "<TR v='' r={$pr}><TD><TD>&nbsp;";
$pr++;
}
$tabla = _InVar($_ADDOPTION[$NomCampo]);
eMultitenancy($tabla);
qQuery($tabla, $p1);
while( $r=qRow($p1) ){
$r[0] = trim($r[0]);
$r[1] = trim($r[1]);
if( $Valor==$r[0] ){
$ValueText = $r[0];
$textContent = (($r[1]=='') ? $r[0] : $r[1]);
}
if( in_array($r[0], $dimPkSelect) ) $dimSelec[] = [$r[0], $r[1]];
if( $SinSelect ) continue;
echo '<TR v="'.$r[0].'" r='.$pr.'><TD>'.$r[0].'<TD>'.(($r[1]=='') ? $r[0] : $r[1]);
if( $i==0 && $r[0]=='' && $Form[19]!='#' && $Form[19]!='=' && $GLOBALS['_ModeQuestion'] && $GLOBALS['_QuestionsEmptyData'] ){
if( strpos('bcm',$GLOBALS['_Mode'])!==false ){
_ShowQuestionsEmptyData( 2 );
$pr += 2;
}
}
$i++;
$pr++;
}
}else if( $_ADDOPTION[$NomCampo][0]==">" ){
$dim = include(eScript(substr($_ADDOPTION[$NomCampo],1)));
for($n=0; $n<count($dim); $n++){
$r = $dim[$n];
$r[0] = trim($r[0]);
$r[1] = trim($r[1]);
if( $Valor==$r[0] ){
$ValueText = $r[0];
$textContent = (($r[1]=='') ? $r[0] : $r[1]);
}
if( in_array($r[0], $dimPkSelect) ) $dimSelec[] = [$r[0], $r[1]];
if( $SinSelect ) continue;
echo '<TR v="'.$r[0].'" r='.$pr.'><TD>'.$r[0].'<TD>'.(($r[1]=='') ? $r[0] : $r[1]);
if( $i==0 && $r[0]=='' && $Form[19]!='#' && $Form[19]!='=' && $GLOBALS['_ModeQuestion'] && $GLOBALS['_QuestionsEmptyData'] ){
if( strpos('bcm',$GLOBALS['_Mode'])!==false ){
_ShowQuestionsEmptyData( 2 );
$pr += 2;
}
}
$i++;
$pr++;
}
}else{
$pr=0;
$tmp = explode(';', $_ADDOPTION[$NomCampo]);
for($i=0; $i<count($tmp); $i++){
$tmp1 = _DivideOption($tmp[$i]);
if( $i==0 && $Valor=='' ) $Valor = $tmp1[0];
if( $Valor==$tmp1[0] ){
$ValueText = $tmp1[0];
$textContent = $tmp1[1];
$PosOption = $i;
}
if( $tmp1[0]=='~' ){
echo '<tr v="" r="'.$pr.'" class="Line"><td><td>';
}else{
if( in_array($tmp1[0], $dimPkSelect) ) $dimSelec[] = [$tmp1[0], $tmp1[1]];
if( $SinSelect ) continue;
echo '<TR v="'.$tmp1[0].'" r='.$pr.'><TD>'.$tmp1[0].'<TD'.(($_ADDOPTIONSTYLE[ $NomCampo ][$i]!='')?' style="'.trim($_ADDOPTIONSTYLE[$NomCampo][$i]).'"':'').'>'.$tmp1[1];
if( $tmp1[1]=="" ) echo '&nbsp;';
}
if( $i==0 && $tmp1[0]=='' && $Form[19]!='#' && $Form[19]!='=' && $GLOBALS['_ModeQuestion'] && $GLOBALS['_QuestionsEmptyData'] ){
if( strpos('bcm',$GLOBALS['_Mode'])!==false ){
_ShowQuestionsEmptyData( 2 );
$pr += 2;
}
}
$pr++;
}
}
}
}else if( $Form[3]=='SX' ){
$ValueText = $Valor;
$textContent = SelectEspecial($_Modo, $Form[1], $Valor);
if( $ValueText!=$Valor ) $ValueText = $Valor;
}
echo '</TABLE></DIV>';
if( $textContent!='' ){
$xNomCampo = $NomCampo;
if( $_SELECTMULTIPLE[$NomCampo]>0 ) $xNomCampo = '_'.$NomCampo;
echo '<script type="text/javascript">';
echo "DGI('{$xNomCampo}').value=".'"'.eQuote($ValueText).'";'."DGI('_INPUT_{$xNomCampo}').value=".'"'.eQuote($textContent).'";';
if( $PosOption>-1 && $_ADDOPTIONSTYLE[ $NomCampo ][$PosOption]!='' ){
echo "with( DGI('_INPUT_{$xNomCampo}').style ){";
echo "color = DGI('{$Prefijo}{$NomCampo}_TABLE').rows[{$PosOption}].cells[1].style.color;";
echo "backgroundColor = DGI('{$Prefijo}{$NomCampo}_TABLE').rows[{$PosOption}].cells[1].style.backgroundColor;";
echo "fontWeight = DGI('{$Prefijo}{$NomCampo}_TABLE').rows[{$PosOption}].cells[1].style.fontWeight;";
echo '}';
}
echo '</script>';
}
if( $_SELECTMULTIPLE[$NomCampo]!='' ){
global $_SELECTMULTIPLEMAX;
if( $oValor=='##' ){
$ooValor = $oValor;
if( $ooValor[0]!=',' ) $ooValor = ','.$ooValor;
if( substr($ooValor,-1)!=',' ) $ooValor = $ooValor.',';
$dimSelec = array();
if( preg_match('/\)\;$/', $_ADDOPTION[$NomCampo]) ){
$_ADDOPTION[$NomCampo] = trim($_ADDOPTION[$NomCampo]);
if( substr($_ADDOPTION[$NomCampo],-1)!=';' ) $_ADDOPTION[$NomCampo] .= ';';
$tmp1 = @eval('return '.$_ADDOPTION[$NomCampo]);
for($i=0; $i<count($tmp1); $i++){
$tmp1[$i][1] = trim($tmp1[$i][1]);
$tmp1[$i][0] = trim($tmp1[$i][0]);
if( substr_count($ooValor, ','.$tmp1[$i][0].',')>0 ){
$dimSelec[] = [$tmp1[$i][0], $tmp1[$i][1]];
}
}
}else if( preg_match('/^select /u', $_ADDOPTION[$NomCampo]) && $oValor!="" ){
if( $oValor[0]=="," ) $oValor = substr($oValor, 1, -1);
$tmp1 = explode(",", $oValor);
$dim = array();
for($i=0; $i<count($tmp1); $i++) $dim[$tmp1[$i]] = true;
eMultitenancy($_ADDOPTION[$NomCampo]);
qQuery($_ADDOPTION[$NomCampo]);
while( $r=qRow() ){
if( $dim[$r[0]] ){
$dimSelec[] = [$r[0], $r[1]];
}
}
}else{
$tmp = explode(';', $_ADDOPTION[$NomCampo]);
for($i=0; $i<count($tmp); $i++){
$tmp1 = _DivideOption($tmp[$i]);
if( substr_count($ooValor, ",{$tmp1[0]},")>0 ){
$dimSelec[] = [$tmp1[0], $tmp1[1]];
}
}
}
}
if( $_SELECTMULTIPLEBOX[$NomCampo] ){
$subTipo = ",B";
$tipo = 2;
if( $_CARDSHOW ){
$xStyle .= 'width:100%;margin-left:0px;';
}else{
if( $Form[5]!='' ){
$xStyle .= "width:{$Form[5]}px;";
}else{
global $_DefaultSize;
$xStyle .= "width:".($_DefaultSize['TC']['U']*$Form[4])."px;";
}
}
echo "<span class='SELECTINPUT ".(($Form[_STATUS]=="E")? "EDITABLE":"READONLY")." SELECTMULTIPLEBOX' id='_{$NomCampo}' style='{$xStyle}'".(($Form[_STATUS]=="E")? " onclick='S.selectBox(this, event);'" : '')."><span>";
if( count($dimSelec)==0 ) echo "&nbsp;";
for($n=0; $n<count($dimSelec); $n++){
echo "<span class='ITEM' eVal='".$dimSelec[$n][0]."'>".$dimSelec[$n][1];
echo ($SinSelect ? "":" <i>&#196;</i>")."</span>";
}
echo "</span></span>";
}else{
$subTipo = ",L";
$tipo = 1;
echo "<table class='LstFieldBrowser col_0n' border=0px cellspacing=0px cellpadding=0px id=LIST_{$oCampo} style='width:1px;border-collapse:collapse;'>";
if( substr_count(",cR,bR,",",{$Opcion},")==0 ){
echo '<col style="display:none"><col><col>';
}else{
echo '<col style="display:none"><col style="display:none"><col>';
}
for($n=0; $n<count($dimSelec); $n++){
echo '<tr><td>'.$dimSelec[$n][0].'<td>';
if( !$SinSelect ) echo "<I class='ICONINPUT' oi=1 onclick=_SMDelOption('".$oCampo."') style='margin-right:2px' title=".'"'.$__Lng[42].'">D</I>';
echo '<td>'.$dimSelec[$n][1];
}
echo '</table>';
}
if( $rValor!="" && $rValor[0]!="," ) $rValor = ",".$rValor.",";
echo "<INPUT NAME='{$oCampo}' VALUE=\"{$rValor}\" tc='{$Form[2]}' MAXLENGTH={$_SELECTMULTIPLE[$NomCampo]} type=hidden MultipleValues={$tipo}{$_AutoComplet} eMaxItem='{$_SELECTMULTIPLEMAX[$NomCampo]}' TS='{$Form[3]}{$subTipo}'";
if( $tipo==2 ) echo $OnChange;
echo ">";
}
break;
case 'SL':
$vacio = true;
$NomSelect = $Form[_FIELD];
$NomCampo = $Form[_OFIELD];
if( substr_count( strtoupper($Form[6]), 'I' )==0 ){
$Form[16] = '_INPUT_'.$NomCampo;
$SoloSelect = true;
echo "<INPUT NAME='{$oCampo}' VALUE=\"{$Valor}\" TYPE='HIDDEN'{$_SubModo}{$_AutoComplet}>";
}
if( $Form[_STATUS]=='I' ) break;
if( $MaxLen>0 ) $Form[4] = $MaxLen;
echo '<span class="SELECTINPUT">';
echo "<INPUT NAME='_INPUT_{$NomCampo}' IND=-1 TMPIND=-1{$OnChange}{$_SubModo}";
if( $Form[_STATUS]!='V' ){
echo " onfocus=S.key('S') class='EDITABLE' eWE=1";
}
if( $Form[5]!='' ) $xStyle .= _CalcAncho( "_INPUT_{$NomCampo}", $Form[5] );
if( $_ADDCODE[$Form[_OFIELD]]["I"]!="" ){
_AddCodeStyle($_ADDCODE[$Form[_OFIELD]]["I"], $xStyle, $xAddCode);
echo $xAddCode;
}
_EchoStyle( $xStyle );
if( $Valor!='' ){
echo " TYPE='TEXT' SIZE={$MaxLen} MAXLENGTH={$MaxLen} VALUE='".ValorDelSelect( $NomCampo, $Valor )."'{$Activo}{$_AutoComplet}>";
}else{
echo " TYPE='TEXT' SIZE={$MaxLen} MAXLENGTH={$MaxLen} VALUE=''{$Activo}{$_AutoComplet}>";
}
echo '</span>';
echo "<DIV onclick='_SelClick(this)' onselectstart='return false;' onmouseleave='_SelHide(\"{$NomCampo}_TABLE\")' id='Select'>";
echo "<TABLE INIT=0 id='{$NomCampo}_TABLE' width=1px onmouseover='_SelCursor(true)' onmouseout='_SelCursor(false)' cols=2 style='display:block;'";
if( $_ADDCODE[$NomCampo]['F']!="" ) echo " class='".$_ADDCODE[$NomCampo]['F']."'";
echo ">".$__Enter;
echo '</TABLE></DIV>';
break;
case 'ST':
$NomSelect = $Form[_FIELD];
$NomCampo = $Form[_OFIELD];
$xStatic = $_SELECTTREE[$NomSelect]['static'];
if( substr_count(strtoupper($Form[6]), 'I')==0 ){
$Form[16] = '_INPUT_'.$NomCampo;
echo "<INPUT NAME='{$oCampo}' VALUE=\"{$Valor}\" TYPE='HIDDEN'{$_SubModo}{$_AutoComplet}>";
}
if( $Form[_STATUS]=='I' ) break;
if( $MaxLen>0 ) $Form[4] = $MaxLen;
echo "<INPUT NAME='_INPUT_{$NomCampo}' ST=1 IND=-1 TMPIND=-1{$OnChange}{$_SubModo}";
if( $Form[_STATUS]!='V' ){
echo ' class="READONLY" READONLY=true';
echo " onclick=eSelectTreeView('{$NomSelect}') onfocus='document.body.focus()'";
$xStyle .= 'cursor:pointer;';
if( substr_count(strtoupper($Form[6]), 'I')==1 ) $xStyle .= 'margin-left:-1px;';
}else{
echo "{$Activo}";
}
if( $xStatic ) $xStyle .= 'display:none;';
if( $Form[5]!='' ) $xStyle .= _CalcAncho("_INPUT_{$NomCampo}", $Form[5]);
if( $_ADDCODE[$Form[_OFIELD]]["I"]!="" ){
_AddCodeStyle($_ADDCODE[$Form[_OFIELD]]["I"], $xStyle, $xAddCode);
echo $xAddCode;
}
if( $Valor!='' ){
if( $_SELECTTREE[$NomSelect]['function']=='' ){
$txt = qSelectTree('R', $_SELECTTREE[$NomSelect], $Valor, $_SELECTTREE[$NomSelect]['icon_op']);
}else{
$txt = call_user_func( $_SELECTTREE[$NomSelect]['function'], 'R', $_SELECTTREE[$NomSelect], $Valor );
}
if( substr_count($txt,"\n")>0 ){
echo " value='(varios)' title='".str_replace("'","&#39;",$txt)."'";
}else{
echo " value='".$txt."'";
}
}else{
echo " value=''";
}
echo " onmouseenter=S(this).tip('".'$$'."_TIP_F_{$NomSelect}',-1)";
_EchoStyle($xStyle);
echo " TYPE='TEXT' SIZE={$MaxLen} MAXLENGTH={$MaxLen}{$_AutoComplet}>";
if( substr_count(',a,mR,c,b,m,', ",{$Opcion},")>0 ){
if( !$xStatic && $Form[_STATUS]!='V' ){
echo "<i class='ICONINPUT ICONSEEK' onclick=eSelectTreeView('{$NomSelect}') title='{$__Lng[165]}'>S</i>";
echo "<i class='ICONINPUT ICONDELETE' onclick=eSelectTreeDelete('{$NomSelect}') title='{$__Lng[166]}'>D</i>";
}
$SelMutiple = $_SELECTTREE[$NomSelect]['multiple'];
$NivelesVisibles = $_SELECTTREE[$NomSelect]['load_view'];
if( $_SELECTTREE[$NomSelect]['load_view']>$_SELECTTREE[$NomSelect]['load_level'] ){
$_SELECTTREE[$NomSelect]['load_view'] = $_SELECTTREE[$NomSelect]['load_level'];
}
$_SELECTTREE[$NomSelect]['multiple'] = (($_SELECTTREE[$NomSelect]['multiple'])?"1":"");
$_SELECTTREE[$NomSelect]['folder'] = (($_SELECTTREE[$NomSelect]['folder'])?"1":"");
$_SELECTTREE[$NomSelect]['static'] = (($_SELECTTREE[$NomSelect]['static'])?"1":"");
if( $SelMutiple && ($Form[2][0]=="+" || $Form[2][0]=="-") ){
eMessage('ERROR:<br>El campo "'.$Form[1].'" con tipo de dato "ST" y selección múltiple, no puede tener tipo edición "'.$Form[2].'"', "HES", 10);
}
if( $xStatic ){
list($ancho,$alto) = explode(",", $Form5);
if( substr_count($Form5, '+')>0 ){
if( $ancho[0]=='+' ){
$ancho = str_replace('+','',$ancho);
$_CalcularAnchos[] = "_AnchoHasta('{$ancho}','{$NomCampo}_TABLE');";
}else{
$_CalcularAnchos[] = "_AnchoGrupo('{$ancho}','{$NomCampo}_TABLE');";
}
$ancho = 50;
}
$ancho = $ancho*1;
$alto = $alto*1;
echo "<div class='__Select' onselectstart='return false;' style='margin-left:5px;display:block;position:initial;height:{$alto}px;width:{$ancho}px;'>";
}else{
echo "<script type='text/javascript'>S.TEXT['_TIP_F_{$NomSelect}']='';</script>";
echo "<div class='__Select' onselectstart='return false;' onmouseleave=\"eSelectTreeClose('{$NomCampo}_TABLE');\">";
}
echo "<div onmousewheel=_SelectTreeWheel(this,event) style='overflow-y:auto; overflow-x:hidden;'";
if( $xStatic && $Form[_STATUS]=='E' ) echo " class='EDITABLE'";
echo ">";
echo "<TABLE id='{$NomCampo}_TABLE' SelectField='{$NomCampo}' SelectFunction='{$SelectFunction}' Option='' MaxAncho=0 onclick='_SelectTree()' onselectstart='return false' style='border-collapse:collapse; display:table'";
echo " def='{$NomSelect}|{$_SELECTTREE[$NomSelect]['table']}|{$_SELECTTREE[$NomSelect]['parent']}|{$_SELECTTREE[$NomSelect]['order']}|{$_SELECTTREE[$NomSelect]['index']}|{$_SELECTTREE[$NomSelect]['type']}|{$_SELECTTREE[$NomSelect]['level']}|{$_SELECTTREE[$NomSelect]['caption']}|{$_SELECTTREE[$NomSelect]['function']}|{$_SELECTTREE[$NomSelect]['icon_op']}|{$_SELECTTREE[$NomSelect]['server']}|{$_SELECTTREE[$NomSelect]['multiple']}|{$_SELECTTREE[$NomSelect]['folder']}|{$_SELECTTREE[$NomSelect]['static']}'";
if( $_ADDCODE[$NomCampo]['F']!="" ) echo " class='".$_ADDCODE[$NomCampo]['F']."'";
echo '>';
echo "<col style='width:16px;text-align:center;cursor:pointer;".(($SelMutiple)?'':'display:none')."'>";
echo "<col style='cursor:pointer' class='Option'>";
if( $_SELECTTREE[$NomSelect]['server']=='' ){
$Dim = qSelectTree( (($Opcion=='mR')?'U':'Q'), $_SELECTTREE[$NomSelect], $Valor, $_SELECTTREE[$NomSelect]['icon_op'] );
}else{
$Dim = call_user_func( $_SELECTTREE[$NomSelect]['server'], (($Opcion=='mR')?'U':'Q'), $_SELECTTREE[$NomSelect], $Valor );
}
echo '<tr style="font-size:0px;height:1px;visibility:hidden;"><td><img src="" style="width:12px;height:1px"><td></tr>';
for( $n=0; $n<count($Dim); $n++ ){
echo '<tr n="'.$Dim[$n][0].'" t="'.$Dim[$n][1].'" nivel="'.$Dim[$n][2].'"';
if( $NivelesVisibles < $Dim[$n][2]+1 ) echo ' id="o"';
echo '>';
echo '<td></td>';
echo '<td id="n'.$Dim[$n][2].'">';
if( $Dim[$n][1]=='F' ){
if( $NivelesVisibles-1>$Dim[$n][2] ){
echo "<i>d</i>";
}else{
echo "<i>c</i>";
}
}
echo str_replace('"','&quot;',$Dim[$n][3]).'</td>';
echo '</tr>';
}
echo '</TABLE>';
echo '</div>';
echo '<div style="text-align:center; text-align:-webkit-center; border-top:1px solid #cfcfcf;'.(($SelMutiple && !$xStatic)?"":"display:none;").'">';
eAddButton("", "Aceptar", "eSelectTreeMulti('{$NomCampo}')");
echo '</div>';
echo '</div>';
if( $xStatic && $SelMutiple ){
echo "<script type='text/javascript'>eSelectTreeStatic('{$NomSelect}');</script>";
}
}
break;
case '-X-':
if( substr_count( $Form[1], ':' )>0 ){
$NomSelect = substr( $Form[1], strpos( $Form[1], ':')+1 );
$Form[1] = substr( $Form[1], 0, strpos( $Form[1], ':') );
$NomAux = substr( $NomSelect, 4 );
}else{
$NomSelect = $Form[1];
$NomAux = substr( $Form[1], 4 );
}
echo "<SELECT ID='Aux{$Form[1]}' NAME='{$Form[1]}'{$Activo}{$OnClick}{$OnChange}";
if( $SelAText ){
if( $Form[5]!='' ){
echo " style='width:{$Form[5]}px; display:none'";
}else{
echo " style='display:none'";
}
}else{
if( $Form[5]!='' ) echo " style='width:{$Form[5]}px;'";
}
if( $_ADDCODE[$Form[_OFIELD]]['I']!='' ) echo $_ADDCODE[$Form[_OFIELD]]['I'];
echo '>';
SelectDeBaja( $NomSelect, $Valor );
echo "</SELECT>";
if( $SelAText ){
echo "<INPUT NAME='{$NomCampo}_' SIZE=".strlen($ValorActual)." ";
if( $Form[5]!='' ) echo " style='WIDTH:{$Form[5]}px'";
ValorDelSelect( $NomSelect, $Valor );
echo "{$Activo}{$_AutoComplet}>";
}
break;
case '[]':
echo "<INPUT NAME='{$Form[1]}' VALUE=\"\" SIZE={$Form[4]} MAXLENGTH={$MaxLen} class='READONLY' READONLY=true onfocus='document.body.focus()'";
$xStyle .= 'cursor:default;';
if( $Form[5]!='' ) $xStyle .= _CalcAncho( $Form[1], $Form[5] );
if( substr_count( $Form[4], ',' )>0 && substr_count( ':+,:-,:', ":{$Form[2]}:" )==1 ){
echo " MAXLENGTH={$MaxLen} SIZE=".($tmp[0]+$tmp[1]+1);
echo ' DCM='.trim($tmp[1]);
}
_EchoStyle( $xStyle );
echo "{$_AutoComplet}>";
$_CalcularAnchos[] = 'ePF("'.$Form[1].'",eGF("'.substr($Form[1],1).'"),0);';
return false;
case '-[S]-':
$NomCampo = trim(substr($Form[1],1));
if( substr_count( $NomCampo, ':' )>0 ){
$NomSelect = $NomCampo;
list($NomCampo,) = explode( ':', $NomCampo );
}else if( substr_count( $NomCampo, '{' )>0 ){
$NomSelect = $NomCampo;
list($NomCampo,) = explode( '{', $NomCampo );
$NomCampo = trim($NomCampo);
}else{
$NomSelect = $NomCampo;
}
if( $Invisible ){
echo "<INPUT NAME='_{$NomCampo}' TYPE='HIDDEN' ";
ValorDelSelect( $NomSelect, $Valor );
echo " class='READONLY' READONLY=true{$_AutoComplet}>";
}elseif( substr_count( ',bR,cR,', ",{$Opcion}," )>0 ){
echo "<SELECT NAME='_{$NomCampo}'{$Activo}{$OnClick}{$OnChange}";
if( $Form[5]!='' ){
echo " style='WIDTH:{$Form[5]}px; display:none;'";
}else{
echo " style='display:none;'";
}
echo '>';
SelectDeBaja($NomSelect, $Valor);
echo "</SELECT>";
}else{
if( $Form[3]=='M' ){
echo "<SELECT ID='_{$NomCampo}' NAME='_{$NomCampo}[]' SIZE={$Form[4]} MULTIPLE{$Activo}{$OnClick}{$OnChange}";
}else{
echo "<SELECT NAME='_{$NomCampo}'{$Activo}{$OnClick}{$OnChange}";
}
if( $Form[5]!='' ) echo " style='WIDTH:{$Form[5]}px;'";
echo '>';
if( $Form[_STATUS]!='V' ){
CrearSelect($NomSelect, $Valor, ($Form[3]=='M'), '', false, $_ADDCODE[$Form[_OFIELD]]['I'], $Form);
}else{
SelectDeBaja($NomSelect, $Valor);
}
echo "</SELECT>";
}
if( $SelAText ){
echo "<INPUT NAME='_{$NomCampo}_' ";
if( $Form[5]!='' ) echo " style='WIDTH:{$Form[5]}px;'";
ValorDelSelect( $NomSelect, $Valor );
echo "{$Activo}{$_AutoComplet}>";
}
return true;
case '[*]':
echo "<INPUT NAME='{$Form[1]}' VALUE=\"\" SIZE={$Form[4]} MAXLENGTH={$MaxLen}{$Activo}{$OnFocusOut}{$_xAutoJump}";
if( substr_count( 'bcmsql', $Opcion )==0 ) echo $OnChange;
if( $Form[5]!='' ) $xStyle .= _CalcAncho( $Form[1], $Form[5] );
$_CalcularAnchos[] = 'ePF("'.$Form[1].'",eGF("'.substr($Form[1],1).'"),0);';
$tmp = explode(',', $Form[4]);
if( substr_count(':+:-:+,:-,:', ":{$Form[2]}:")==1 ){
if( $GLOBALS['_ShowZero']!=1 && isZero($Valor) ){
$Valor = '';
}else{
$Valor = eNumberFormat($Valor,$tmp[1]);
}
}
$sActivo = $Activo;
if( $Form[_STATUS]!='V' && substr_count($Form[6],'s')>0 && ( $Form[2]=='P4' || $Form[2]=='+' || $Form[2]=='-' ) ){
$sActivo = ' class="READONLY" readonly=true onfocus="document.body.focus()"';
}else{
$sActivo = ' class="EDITABLE" eWE=1';
}
if( substr_count( $Form[4], ',' )>0 && substr_count( ':+,:-,:', ":{$Form[2]}:" )==1 ){
echo " MAXLENGTH={$MaxLen} SIZE=".($tmp[0]+$tmp[1]+1);
echo ' DCM='.trim($tmp[1]);
}else{
if( count($tmp)==2 ){
$MaxLen = $tmp[0];
$Form[4] = $tmp[1];
}else{
$MaxLen = $Form[4];
}
if( substr_count( 'bcmsql', $Opcion )>0 && substr_count( 'SP.M.s.S.X.Ss.SS.SX.SV.SL.[S]', $Form[3] )==0 ){
if( $MaxLen < 60 ) $MaxLen = $MaxLen*3+6;
}
echo " MAXLENGTH={$MaxLen} SIZE={$Form[4]}";
if( substr_count( '+-', $Form[2] )==1 ) echo ' DCM=0';
}
if( $Form[5]!='' ) $xStyle .= _CalcAncho( $Form[1], $Form[5] );
if( $Form[2]=='F4' || $Form[2]=='P4' ) echo ' TC='.$Form[2];
if( $_ADDCODE[$Form[_OFIELD]]["I"]!="" ){
_AddCodeStyle($_ADDCODE[$Form[_OFIELD]]["I"], $xStyle, $xAddCode);
echo $xAddCode;
}
if( $Form[_STATUS]!='V' && substr_count(strtoupper($Form[6]),'S')>0 ){
if( $Form[2]=='P4' ) echo ' onmousewheel=S(":'.$Form[1].'").nextValue()';
if( $Form[2]=='+' || $Form[2]=='-' ) echo ' onmousewheel=S(":'.$Form[1].'").nextValue()';
}
if( count($_FIELDBROWSER[$Form[1]])>0 ){
echo " onclick='_SelectWin()' onblur='_SelBrowseHide();'";
echo " eAssign='".str_replace(' ','',$_FIELDBROWSER[$Form[1]][1])."'";
echo " eSQL='".$_FIELDBROWSER[$Form[1]][2]."'";
if( $_FIELDBROWSER[$Form[1]][3]=='' ) $_FIELDBROWSER[$Form[1]][3] = 10;
echo ' eHeight='.$_FIELDBROWSER[$Form[1]][3];
if( $_FIELDBROWSER[$Form[1]][4]=='' ) $_FIELDBROWSER[$Form[1]][4] = 1;
echo " eViewCols='".$_FIELDBROWSER[$Form[1]][4]."'";
}
_EchoStyle( $xStyle );
echo "{$_AutoComplet}>";
if( $Form[_STATUS]!='V' && substr_count(strtoupper($Form[6]),'S')>0 ){
if( $Form[2]=='P4' ){
echo "<img src='g/sliderv.gif' onclick='OtroPeriodo()' onmousewheel=S(':".$Form[1]."').nextValue() style='vertical-align:top'{$xTitle}>";
}
if( $Form[2]=='+' || $Form[2]=='-' ){
echo "<img src='g/sliderv.gif' onclick='OtroNumero(\"$Form[2]\")' ondblclick='OtroNumero(\"$Form[2]\");eClearEvent()' onmousewheel=S(':".$Form[1]."').nextValue() style='vertical-align:top'{$xTitle}>";
}
}
if( substr_count( ',a,b,c,m,mR,s,q,', ",{$Opcion}," )>0 ){
if( substr_count($Form[6],'F')>0 && $Form[_STATUS]=='E' && $Form[2]=='F4' ){
echo '<i class="ICONINPUT" onclick=S(":'.$Form[1].'").calendar() oncontextmenu=S(":'.$Form[1].'").calendar("t") title="'.$__Lng[45].'" id=TOOLSDate>,</i>';
}
}
if( substr_count(',cR,', ",{$Opcion},")>0 && $Valor!='' ){
if( substr_count($Form[6],'E')>0 ) $iconos[] = _AddIconEMail($Valor);
if( substr_count($Form[6],'W')>0 ) $iconos[] = _AddIconWeb($Form[1], $Valor, $NumForm);
}
return false;
default:
if( $Form[0]!='-' && $_Form[$n][0]!='{TAB}' && trim($Form[0])[0]<>"{" ){
if( $Form[2]=='o' ){
if( substr_count('m,c,b', $Opcion)==0 ) eMessage(str_replace('#',$Form[1],$__Lng[54]), 'HES');
return '';
}else{
eMessage(str_replace('#3',$Form[1],str_replace('#2',$Form[3],str_replace('#1',$Form[2],$__Lng[58]))), 'HES', -1);
}
}
break;
}
if( substr_count(',a,mR,c,m,b,', ",{$Opcion},")>0 ){
if( substr_count($Form[6],'B')>0 ){
global $_SELINFONOEVENT;
list(,$url) = explode(":",$_SELINFO[$oCampo]);
eContextPut("Fc:".$url.((substr_count($url,".")>0)?"":".fdf"));
$iconos[] = "<i id='_{$oCampo}' class='ICONINPUT' onclick='FunPadre(this,\"B\",\"FRM{$NumForm};".$_SELINFO[$oCampo]."\"".$_SELINFONOEVENT[$oCampo].")' title=".'"'.$__Lng[46].'">S</i>';
if( $Form[11]<>"E" ) $GLOBALS["_JSSYSTEM"] .= "S(':{$oCampo}').on('click', function(){S('#_{$oCampo}').obj.onclick()}).css('cursor:pointer');";
}
if( substr_count($Form[6],'b')>0 ){
global $_SELINFONOEVENT;
eContextPut("Ll:".$_SELINFONOEVENT[$oCampo].((substr_count($_SELINFONOEVENT[$oCampo],".")>0)?"":".ldf"));
$iconos[] = "<i id='_{$oCampo}' class='ICONINPUT' onclick='FunPadre(this,\"b\",\"FRM{$NumForm};".$_SELINFO[$oCampo]."\"".$_SELINFONOEVENT[$oCampo].")' title=".'"'.$__Lng[46].'">S</i>';
if( $Form[11]<>"E" ) $GLOBALS["_JSSYSTEM"] .= "S(':{$oCampo}').on('click', function(){S('#_{$oCampo}').obj.onclick()}).css('cursor:pointer');";
}
if( substr_count($Form[6],'D')>0 && substr($oCampo,0,4)=='dct_' ){
eContextPut("Ll:".'Ll:$a/d/word_key.edf');
$iconos[] = "<i id='_{$oCampo}' class='ICONINPUT' onclick='FunPadre(this,\"D\")' title=".'"'.$__Lng[47].'">S</i>';
}
}
if( $Form[_STATUS]!='V' || $_NOEDIT[$oCampo]!='' || $_BCP[$oCampo] ){
if( $Form[_STATUS]!='V' && substr_count('bcmsql', $Opcion)>0 ){
if( substr_count($Form[6],'c')>0 ){
$iconos[] = "<i id='_{$oCampo}' class='ICONINPUT' onclick='FunPadre(this,\"c\")' title=".'"'.$__Lng[48].'">C</i>';
}
if( substr_count($Form[6],'p')>0 ){
$iconos[] = "<i id='_{$oCampo}' class='ICONINPUT OFF' onclick='FunPadre(this,\"p\")' title=".'"'.$__Lng[49].'"'.((substr_count('CcRr', $Form[3])==0)? " oncontextmenu='FunPadre(this,\"d\")'":"").'>P</i>';
array_push($_DimPaste, '_'.$oCampo);
}
}
if( $Form[_STATUS]!='V' && substr_count($Form[6],'d')>0 && substr_count('abcmsql', $Opcion)>0 ){
if( substr_count(',SL,SX,Ss,SS,M,R,r,F,f,',",{$Form[3]},")==0 ){
$iconos[] = "<i id='__{$oCampo}' class='ICONINPUT OFF' onclick='_SetDefault(this)' title='".$__Lng[50]."' eTitleOFF='".$__Lng[168]."'>h</i>";
array_push($_DefaultPaste, $oCampo);
}
}
if( $Form[_STATUS]!='V' && substr_count($Form[6],'q')>0 && $Form[3]=='T' && substr_count('bcmsql', $Opcion)>0 ){
$iconos[] = "<i id='_{$oCampo}' class='ICONINPUT' onclick='_FilterUser(\"{$Form[1]}\")' title=".'"'.$__Lng[167].'">f</i>';
}
}
if( $_BCP[$oCampo]!='' ){
if( substr_count($_BCP[$oCampo],'B')>0 ){
$iconos[] = "<i id='_{$oCampo}' class='ICONINPUT' onclick='FunPadre(this,\"B\",\"FRM{$NumForm};".$_SELINFO[$oCampo]."\")' title=".'"'.$__Lng[46].'">S</i>';
}
if( substr_count($_BCP[$oCampo],'b')>0 ){
$iconos[] = "<i id='_{$oCampo}' class='ICONINPUT' onclick='FunPadre(this,\"b\",\"FRM{$NumForm};".$_SELINFO[$oCampo]."\")' title=".'"'.$__Lng[46].'">S</i>';
}
if( substr_count($_BCP[$oCampo],'c')>0 ){
$iconos[] = "<i id='_{$oCampo}' class='ICONINPUT' onclick='FunPadre(this,\"c\")' title=".'"'.$__Lng[48].'">C</i>';
}
if( substr_count($_BCP[$oCampo],'p')>0 ){
$iconos[] = "<i id='_{$oCampo}' class='ICONINPUT OFF' onclick='FunPadre(this,\"p\")' title=".'"'.$__Lng[49].'"'.((substr_count('CcRr', $Form[3])==0)? " oncontextmenu='FunPadre(this,\"d\")'":"").'>P</i>';;
array_push($_DimPaste, '_'.$oCampo);
}
if( substr_count($_BCP[$oCampo],'d')>0 ){
$iconos[] = "<i id='__{$oCampo}' class='ICONINPUT OFF' onclick='_SetDefault(this)' title='".$__Lng[50]."' eTitleOFF='".$__Lng[168]."'>h</i>";
array_push($_DefaultPaste, $oCampo);
}
}
if( $_TIPFORM[$oCampo]['I']!='' ){
$bTitle = $_TIPFORM[$oCampo]['I'];
$iHelp = "";
if( $bTitle=='>' ){
$bTitle = "S(this).tip('#_TIP_I_".$oCampo."',-1)";
$iHelp = " iHelp='{$oCampo}'";
}else{
$bTitle = str_replace(array('&34;','&39;'), array('&#34;',"\'"), $bTitle);
$bTitle = "S(this).info('{$bTitle}')";
}
$iconos[] = "<i class='ICONINPUT' pp='1' onclick=\"{$bTitle}\"{$iHelp} title='Ayuda'>?</i>";
}
if( isset($_TIPFORM[$oCampo]['E']) ){
global $OriFichero;
$iMark = $_TIPFORM[$oCampo]['E'];
if( $iMark==">" ) $iMark = "";
if( $iMark!="" ) $iMark = ".".trim($iMark);
$hMode = $_TIPFORM[$oCampo]['M'];
if( $hMode==">" ) $hMode="";
global $DFichero, $_Development;
if( $DFichero[0]!="" ){
$bTitle = "top.gsHelp('".str_replace("/","_",$DFichero[0]).".{$hMode}.{$oCampo}{$iMark}', event);";
}else{
$bTitle = "top.gsHelp('".str_replace("/","_",$OriFichero).".{$hMode}.{$oCampo}{$iMark}', event);";
}
$iconos[] = "<i class='ICONINPUT' pp='1' onclick=\"{$bTitle}\" iHelp='{$oCampo}' iMode='{$hMode}' iMark='".trim($_TIPFORM[$oCampo]['E'])."' title='Ayuda'>?</i>";
}
if( $Form[_STATUS]!='V' && substr_count(',a,mR,', ",{$Opcion},")>0 && substr_count($Form[6],'k')>0 ){
$iconos[] = "<i id='_{$oCampo}' class='ICONINPUT' style='color:red'  onclick='S(window).clipboardGet(\"{$oCampo}\");' title='{$__Lng[52]}'>P</i>";
}
if( $_CARDSHOW && !$Invisible ){
if( count($iconos)>1 ){
$tIconos = 0;
for($n=0; $n<count($iconos); $n++) if( substr($iconos[$n],0,3)=="<i " || substr($iconos[$n],0,5)=="<img " ) $tIconos++;
}
echo "</div><div class='card-td'>";
if( $_ADDCODE[$Form[1]]['A']!='' ){
echo $_ADDCODE[$Form[1]]['A'];
$_ADDCODE[$Form[1]]['A'] = '';
}
if( $_ADDCODE[$Form[1]]['E']!='' ){
if( substr($_ADDCODE[$Form[1]]['E'],-1)==')' && strpos($_ADDCODE[$Form[1]]['E'],'(')>0 ){
$_ADDCODE[$Form[1]]['E'] = _ExeEval($_ADDCODE[$Form[1]]['E'], '[AddCode] '.$Opcion.' | '.$Form[1].' | E |'.$_ADDCODE[$Form[1]]['E']);
}
preg_match_all('/(<i (.*)>(.*)<\/i>|<img (.*)>|<span(.*)>(.*)<\/span>)/U', $_ADDCODE[$Form[1]]['E'], $dim);
$tIconos += count($dim);
if( $tIconos>1 ){
$_ADDCODE[$Form[1]]['E'] = preg_replace_callback(
'| style=["\'].([0-9a-zA-Z\-_\%\:\;# ])*["\']{1}|',
function($buscar){
return substr($buscar[0],0,-1).";display:none;".substr($buscar[0],-1);
},
$_ADDCODE[$Form[1]]['E']
);
}
preg_match_all('/(<i (.*)>(.*)<\/i>|<img (.*)>|<span(.*)>(.*)<\/span>)/U', $_ADDCODE[$Form[1]]['E'], $dim);
for($n=0; $n<count($dim[0]); $n++){
if( !preg_match('/ style=["\'].([0-9a-zA-Z\-_\%\:\;# ])*["\']{1}/', $dim[0][$n]) ){
$dim[0][$n] = str_replace(array("<i ","<img "), array("<i style='display:none' ","<img style='display:none' "), $dim[0][$n]);
}
}
echo implode("", $dim[0]);
$_ADDCODE[$Form[1]]['E'] = '';
}
}
if( $_CARDSHOW && !$Invisible && $tIconos>1 ){
if( $tIconos>1 ){
for($n=0; $n<count($iconos); $n++){
if( substr($iconos[$n],0,3)=="<i " ) $iconos[$n] = "<i style='display:none'".substr($iconos[$n],2);
else if( substr($iconos[$n],0,5)=="<img " ) $iconos[$n] = "<img style='display:none'".substr($iconos[$n],4);
}
}
$iconos[] = "<i class='ICONINPUT' onclick='_MenuIco(this)' title='Menú'>B</i>";
}
echo implode("", $iconos);
if( $_CARDSHOW && !$Invisible ){
echo "</div></div>";
}
if( $_OnLineOP[$Form[_OFIELD]]!='' ){
$tmp = $_OnLineOP[$Form[_OFIELD]];
if( !$GLOBALS["_Objeto"]["[".substr($tmp,4)."]"]["NOBR"] ){
echo '<tr STShow=1 SubTab='.$Form[17].'><td><td>';
}
echo "<INPUT NAME='{$tmp}' TYPE='CHECKBOX' id=o CONIMAGEN=1 class=slBUTTON{$_AutoComplet}>";
echo "<a href='javascript:' on_focusout=_CheckRadioOFF(this) on_focusin=_CheckRadioON(this) onkeydown=_slOption(this) onclick=_slClick(this)";
if( $Opcion=='bR' || $Opcion=='cR' ) echo " style='display:none'";
else echo " style='text-decoration:none;display:table;margin-top:2px;display:inline-block;'";
echo ">";
eAddButton("<i name='__{$tmp}' class='ICONINPUT'>I</i>", $__Lng[19], "", "", "", "ZOOM90");
echo "</a>";
}
return($Form[_STATUS]!='V' && !$Invisible);
}
function SelectEspecial($Modo, $Campo, &$Valor){
global $_Include, $__iSCRIPT__;
if( substr_count($Campo, ':')>0 ) list(,$Campo) = explode(':', $Campo);
$File = substr( $GLOBALS['FicheroD'], 0, strrpos($GLOBALS['FicheroD'],'/')+1 ).$Campo.'.sel';
if( $_SESSION["_SPIDER_"]["opcion"]=="E" ){
return file_get_contents($_SESSION["_SPIDER_"]["file"][md5($campo)]);
}
ini_set('track_errors', _TRACK_ERRORS);
error_reporting(_ERROR_REPORTING);
$__iSCRIPT__ .= $File.', ';
$_Include = $File;
$Dim = include($File);
if( gettype($Dim)!="array" ){
global $__Lng;
_ShowError(str_replace('#', $File, $__Lng[59]), $File, 0, '', $File);
}
_ShowError($php_errormsg, $File, 0, '', $File);
$textContent = '';
for($n=0; $n<count($Dim); $n++){
if( $Valor==trim($Dim[$n][0]) || $Dim[$n][2]==true ){
$Valor = trim($Dim[$n][0]);
$textContent = trim($Dim[$n][1]);
}
if( $n==0 && trim($Dim[$n][1])=='' ){
echo '<TR><TD>'.$Dim[$n][0].'<TD>&nbsp;';
}else{
echo '<TR><TD>'.$Dim[$n][0].'<TD>'.trim($Dim[$n][1]);
}
}
if( $_SESSION["_SPIDER_"]["opcion"]=="S" ){
__SpiderDataDef($campo, $File);
$_SESSION["_SPIDER_"]["file"][md5($campo)] = $File;
error_log($textContent, 3, $File);
file_put_contents("", $textContent);
}
return $textContent;
}
function eSubSelectToMemory($Nivel, $Campo, $sql, $ConJS=true){
global $__Enter;
qQuery( $sql, $p1 );
if( $ConJS ) echo '<script type="text/javascript">';
echo $__Enter.'var '.$Campo.' = new Array();';
$Indice = '';
$t = 0;
while( $r = qRow($p1) ){
$aIndice = '';
for( $n=0; $n<$Nivel; $n++ ) $aIndice .= $r[$n];
if( $Indice!=$aIndice ){
if( $Indice!='' ) echo '];';
else $t = count($r);
echo $__Enter.$Campo.'["'.$aIndice.'"]=[';
$Indice = $aIndice;
}else echo ',';
echo '["'.$r[$Nivel].'"';
for( $n=$Nivel+1; $n<$t; $n++ ) echo ',"'.eQuote($r[$n]).'"';
echo ']';
}
echo '];';
if( $ConJS ) echo $__Enter.'</script>';
}
function QueDependencia($NomCampo, $Fila, $Opcion, $Valor, $_Form, $ConCentenido, $Multiple, $AnchoDIV, &$TotalOptions){
global $_RELATIONFIELDS, $_NOEDITFILLED, $_WHERESELECT, $_Sql, $_ADDOPTIONVALUE, $_NM_ATRIBUTE, $_ADDCODE, $__Enter, $_LanguageTables;
global $_SUBSELECTMEMORY, $_SELECT_DDBB, $_SELECTFREE;
$TotalOptions = 0;
$Vacio2 = '';
$t = '';
$sCampo = $NomCampo;
if( substr_count($NomCampo, ':')>0 ){
list($NomCampo, $nNomCampo) = explode(':', $NomCampo);
$Tabla = substr($nNomCampo,3);
if( strpos($_LanguageTables, ",{$Tabla},")===false ){
$Campos = $nNomCampo.',nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
}else{
$Campos = $nNomCampo.',nm_'.$Tabla.'_'.$_SESSION['_LANGUAGE_'];
$Ordenacion = 'nm_'.$Tabla.'_'.$_SESSION['_LANGUAGE_'];
}
}else if( substr_count($NomCampo, '{')>0 ){
$n = substr_count(strtoupper($NomCampo),'CONCAT(');
if( $n>0 ){
for($i=0; $i<$n; $i++){
$p = strpos(strtoupper($NomCampo),'CONCAT(')+7;
$txt = substr($NomCampo,0,$p);
for($c=$p; $c<strlen($NomCampo); $c++){
$l = substr($NomCampo,$c,1);
if( $l==',' ) $l = '&#44;';
$txt .= $l;
}
}
$NomCampo = $txt;
}
$NomCampo = str_replace('&#124;','|',$NomCampo);
list($NomCampo, $NomSql) = explode('{', $NomCampo);
list($NomSql) = explode('}', $NomSql);
list($Tabla) = explode(',', $NomSql);
$Campos = substr($NomSql, strlen($Tabla)+1);
$sCampo = trim($NomCampo);
$NomCampo = trim($NomCampo);
}else if( substr($NomCampo,0,3)!="cd_" ){
if( substr_count($AnchoDIV,",")>0 ) list(,$AnchoDIV) = explode(",",$AnchoDIV);
echo '<DIV class="SELECT EDITABLE SCROLLBAR"'.(($AnchoDIV!='') ? " style='width:{$AnchoDIV}px;'":"").'">';
echo "<TABLE id='{$NomCampo}_TABLE' border='0px' cellspacing='0px' cellpadding='2px' cols=2{$class}";
echo '<COL><COL><TR v="" r=0><td><td>&nbsp;</TABLE></DIV>';
return;
}else{
$Tabla = substr($NomCampo,3);
if( strpos($_LanguageTables, ",{$Tabla},")===false ){
$Campos = $NomCampo.',nm_'.$Tabla;
$Ordenacion = 'nm_'.$Tabla;
}else{
$Campos = $NomCampo.',nm_'.$Tabla.'_'.$_SESSION['_LANGUAGE_'];
$Ordenacion = 'nm_'.$Tabla.'_'.$_SESSION['_LANGUAGE_'];
}
}
$SelWhere = '';
$Ordenacion = '';
for( $i=0; $i<count($_WHERESELECT); $i++){
if( $_WHERESELECT[$i][0]==$NomCampo ){
if( substr_count($_WHERESELECT[$i][1], 'order by ')==1 ){
list( $tmpW, $tmpO ) = explode('order by ',$_WHERESELECT[$i][1]);
$Ordenacion = $tmpO;
$_WHERESELECT[$i][1] = $tmpW;
}else if( substr($_WHERESELECT[$i][1],-4)=='desc' ){
$Ordenacion .= ' desc';
$_WHERESELECT[$i][1] = substr($_WHERESELECT[$i][1],0,-4);
}
$_WHERESELECT[$i][1] = _InVar($_WHERESELECT[$i][1]);
if( $_WHERESELECT[$i][1]!='' ) $SelWhere = $_WHERESELECT[$i][1];
break;
}
}
$SelectFree = false;
$CamposRelacion = '';
for($n=0; $n<count($_RELATIONFIELDS); $n++){
if( substr_count($_RELATIONFIELDS[$n], ",{$sCampo},")==1 ){
$tmp = explode(',', $_RELATIONFIELDS[$n]);
for($i=0; $i<count($tmp); $i++){
if( empty($tmp[$i]) ) continue;
if( $ConCentenido && $sCampo==$tmp[$i] ) break 2;
for($p=0; $p<count($_Form); $p++){
list($vField, $SeekCampo) = explode('{', $_Form[$p][1]);
list($vField) = explode(':', $vField);
if( $tmp[$i]==$vField || ($ConCentenido && '_INPUT_'.$tmp[$i]==$vField) ){
if( $SeekCampo!='' ){
list(,$SeekCampo) = explode(',', $SeekCampo);
$tmp[$i] = $SeekCampo;
}else if( $tmp[$i][0]=="_" && substr_count($_Form[$p][1], ":")>0 ){
list(,$tmp[$i]) = explode(":", $_Form[$p][1]);
}
if( !empty($SelWhere) ) $SelWhere .= ' and ';
if( eSqlType('oracle') ){
$SelWhere .= $tmp[$i]."='". str_replace("'","''",$_Form[$p][_VALUE])."'";
}else{
$SelWhere .= $tmp[$i].'="'. $_Form[$p][_VALUE].'"';
}
$CamposRelacion .= $tmp[$i].',';
if( $_Form[$p][_VALUE]=="" && $_SELECTFREE[$NomCampo]<>"" ) $SelectFree = true;
break;
}
}
if( $tmp[$i]==$sCampo ) break 2;
}
}
}
$Dim = array(); $ii = -1;
$Dim2 = array(); $ii2 = -1;
$tmp = trim($_ADDCODE[$NomCampo]['I']);
$uSql = '';
if( $tmp!='' && substr_count($tmp,'DynamicSQL')==1 ){
list(,$tmp) = explode('=',$tmp);
list($tmp) = explode('(',$tmp);
call_user_func($tmp);
$CursorSelect = array(array('',''));
while( $r=qRow() ) $CursorSelect[] = $r;
qFree();
}else if( $Campos=='' ){
if( substr($sCampo,0,3)=='cd_' ){
$Tabla = substr( $sCampo, 3 );
$Campos = "cd_{$Tabla},nm_{$Tabla}";
if( $_ADDOPTIONVALUE[$NomCampo]!='' ) $Campos .= ','.$_ADDOPTIONVALUE[$NomCampo];
eMultitenancy($Tabla);
$uSql = "select {$Campos} from {$Tabla}".((trim($SelWhere)=='')?'':" where {$SelWhere}")." order by nm_{$Tabla}{$Ordenacion}";
}
}else{
if( preg_match("/^ADDOPTION=/i",str_replace(' ','',trim($_ADDCODE[$NomCampo]['I']))) ){
$txt = substr(str_replace(' ','',trim($_ADDCODE[$NomCampo]['I'])),11,-1);
$fi = explode(';',$txt);
for( $f=0; $f<count($fi); $f++ ){
$dt = explode(',',$fi[$f]);
$Dim2[++$ii2] = array( trim($dt[0]), trim($dt[1]) );
$TotalOptions++;
}
}
if( $_ADDOPTIONVALUE[$NomCampo]!='' ) $Campos .= ','.$_ADDOPTIONVALUE[$NomCampo];
if( $Ordenacion=='' || strtoupper(trim($Ordenacion))=='DESC' ){
$tmp = explode(',',$Campos);
$Ordenacion = $tmp[1].' '.$Ordenacion;
}
$Campos = trim($Campos);
if( substr($Campos,-1)==',' ) $Campos = substr($Campos,0,-1);
eMultitenancy($Tabla);
$uSql = "select {$Campos} from {$Tabla}".((trim($SelWhere)=='')?'':" where {$SelWhere}").((trim($Ordenacion)=='')?'':" order by {$Ordenacion}");
}
if( $uSql!='' ){
$CursorSelect = array();
$pCursorSelect = 0;
if( isset($_SELECT_DDBB[$NomCampo]) && $GLOBALS['_Sql']<>$_SELECT_DDBB[$NomCampo][0] ){
eInclude($_SELECT_DDBB[$NomCampo][0].'.class');
switch( $_SELECT_DDBB[$NomCampo][0] ){
case 'mysql':
$db = new eMySql();
break;
case 'mysqli':
$db = new eMySqli();
break;
case 'informix':
$db = new eInformix();
break;
case 'oracle':
$db = new eOracle();
break;
case 'pdo':
$db = new ePdo();
break;
}
$db->qConnect($_SELECT_DDBB[$NomCampo][1]);
$db->qQuery($uSql);
while( $r=$db->qRow() ) $CursorSelect[] = $r;
$db->qEnd();
}else{
qQuery($uSql);
while( $r=qRow() ) $CursorSelect[] = $r;
qFree();
if( $SelectFree ){
$nSql = str_replace(" where ".eMid($uSql, " where ", " order by "), "", $uSql);
$nSql = str_replace(" from ", ",".$_SELECTFREE[$NomCampo]." from ", $nSql);
echo "<TABLE id='{$NomCampo}_TABLEFREE' border='0px' cellspacing='0px' cellpadding='2px' cols=3 style='display:none' eUpdate='".$_SELECTFREE[$NomCampo];
if( $_ADDCODE[$NomCampo]['F']!="" ) echo " class='".$_ADDCODE[$NomCampo]['F']."'";
echo "'>".$__Enter;
$ii3 = -1;
$Dim3[++$ii3] = array("", "&nbsp;", "");
qQuery($nSql);
while( $r=qRow() ) $Dim3[++$ii3] = array(trim($r[0]), trim($r[1]), trim($r[2]));
qFree();
$sDim = array();
for($f=0; $f<count($Dim3); $f++) $sDim[] = implode("\t",$Dim3[$f])."\t".$f;
sort($sDim);
$iDim = array();
for($f=0; $f<count($sDim); $f++){
$tmp = explode("\t",$sDim[$f]);
$iDim[$f] = array($tmp[0], $tmp[count($tmp)-1]);
}
for($f=0; $f<count($Dim3); $f++){
echo '<TR v="'.strtoupper($iDim[$f][0]).'" r='.$iDim[$f][1].'>';
for( $c=0; $c<count($Dim3[$f]); $c++ ) echo '<td>'.$Dim3[$f][$c];
}
echo '</TABLE>';
}
}
}
if( $_SUBSELECTMEMORY[$NomCampo] ) eSubSelectToMemory( substr_count($CamposRelacion,','), '__'.$NomCampo, 'select '.$CamposRelacion.$Campos." from {$Tabla} order by ".$CamposRelacion.$Ordenacion );
$class="";
if( $_ADDOPTIONVALUE[$NomCampo]!='' ){
$class = "";
$tmp = explode(',',str_replace(' ','',$_ADDOPTIONVALUE[$NomCampo]));
for($i=($colLabel==""?2:3); $i<count($tmp)+2; $i++){
$class .= " col_{$i}n";
}
$class = " class='".trim($class)."'";
}
if( substr_count($AnchoDIV,",")>0 ) list(,$AnchoDIV) = explode(",",$AnchoDIV);
echo '<DIV class="SELECT EDITABLE SCROLLBAR"'.(($AnchoDIV!='') ? " style='width:{$AnchoDIV}px;'":"").'">';
echo "<TABLE id='{$NomCampo}_TABLE' border='0px' cellspacing='0px' cellpadding='2px' cols=2{$class}";
if( $_ADDCODE[$NomCampo]['F']!="" ) echo " class='".$_ADDCODE[$NomCampo]['F']."'";
echo ">".$__Enter;
echo '<COL><COL>'.$__Enter;
$ValorExt = '';
if( $ConCentenido ){
if( $SelWhere!='' ){
$Dim[++$ii] = array('', '&nbsp;');
if( $_ADDOPTIONVALUE[$NomCampo]!='' ){
$tmp = explode(',',str_replace(' ','',$_ADDOPTIONVALUE[$NomCampo]));
for( $i=0; $i<count($tmp); $i++ ){
if( $_NM_ATRIBUTE[$NomCampo]!='' ){
echo '<COL id=o NM_ATRIBUTE='.$_NM_ATRIBUTE[$NomCampo].'>';
}else{
echo '<COL id=o NM_ATRIBUTE='.$tmp[$i].'>';
}
}
for($i=0; $i<count($tmp); $i++) $Dim[$ii][$i+2] = '';
}else{
}
$Vacio .= $Vacio2;
$MasVacio = true;
if( $_ADDOPTIONVALUE[$NomCampo]!='' ){
$tmp = explode(',',str_replace(' ','',$_ADDOPTIONVALUE[$NomCampo]));
$tc = count($tmp);
for($p=0; $p<count($CursorSelect); $p++){
$row = $CursorSelect[$pCursorSelect++];
if( $MasVacio ){
echo $Vacio;
$MasVacio = false;
}
if( $Valor==trim($row[0]) ){
PoneValorAlSelect($oNomCampo, $row[0]);
$ValorExt = trim($row[1]);
for($i=2; $i<count($row)-$tc; $i++) $ValorExt .= $row[$i];
}
$Dim[++$ii] = array(trim($row[0]), trim($row[1]));
for($i=2; $i<count($row)-$tc; $i++) $Dim[$ii][1] .= $row[$i];
$nc = 0; for($i=count($row)-$tc; $i<count($row); $i++) $Dim[$ii][$i] = trim($row[$i]);
$TotalOptions++;
}
}else{
for($p=0; $p<count($CursorSelect); $p++){
$row = $CursorSelect[$pCursorSelect++];
if( $MasVacio ){
echo $Vacio;
$MasVacio = false;
}
if( $Valor==trim($row[0]) ){
PoneValorAlSelect($oNomCampo, $row[0]);
$ValorExt = trim($row[1]);
for($i=2; $i<count($row); $i++) $ValorExt .= $row[$i];
}
$Dim[++$ii] = array(trim($row[0]), trim($row[1]));
for($i=2; $i<count($row); $i++) $Dim[$ii][1] .= $row[$i];
$TotalOptions++;
}
}
if( count($Dim2)>0 && count($Dim)>0 ){
if( count($Dim)>1 && $Dim[0][0]=='' ){
$Op1 = array();
if( $Dim[0][0]=='' ) $Op1 = array_shift($Dim);
$Dim = array_merge($Dim2, $Dim);
if( count($Op1)>0 ) array_unshift($Dim, $Op1);
}
}
$sDim = array();
for($f=0; $f<count($Dim); $f++) $sDim[] = implode("\t",$Dim[$f])."\t".$f;
sort($sDim);
$iDim = array();
for($f=0; $f<count($sDim); $f++){
$tmp = explode("\t",$sDim[$f]);
$iDim[$f] = array($tmp[0], $tmp[count($tmp)-1]);
}
for($f=0; $f<count($Dim); $f++){
echo '<TR v="'.strtoupper($iDim[$f][0]).'" r='.$iDim[$f][1].'>';
for($c=0; $c<count($Dim[$f]); $c++) echo '<td>'.$Dim[$f][$c];
}
}else{
if( $_ADDOPTIONVALUE[$NomCampo]!='' ){
$tmp = explode(',', str_replace(' ','',$_ADDOPTIONVALUE[$NomCampo]));
for($i=0; $i<count($tmp); $i++) echo '<COL id=o NM_ATRIBUTE='.$tmp[$i].'>';
}
}
echo '</TABLE></DIV>';
if( $ValorExt!='' ) echo $__Enter."<script type='text/javascript'>DGI('_INPUT_{$NomCampo}').value=".'"'.eQuote($ValorExt).'";</script>';
return $ValorExt;
}else{
if( $_ADDOPTIONVALUE[$NomCampo]!='' ){
$tmp = explode(',',str_replace(' ','',$_ADDOPTIONVALUE[$NomCampo]));
for($i=0; $i<count($tmp); $i++) echo '<COL id=o NM_ATRIBUTE='.$tmp[$i].'>';
}
}
$row = $CursorSelect[$pCursorSelect++];
echo '</TABLE></DIV>';
if( $row[1]!='' ) echo $__Enter."<script type='text/javascript'>DGI('_INPUT_{$NomCampo}').value=".'"'.eQuote($row[1]).'";</script>';
return $row[1];
}
function _IconosTitle($Dim, $ConEco=true){
if( count($Dim)==0 ) return;
$txt = '<table width=1px border=0px cellspacing=0px cellpadding=0px style="border-collapse:collapse;"><tr>';
for($n=0; $n<count($Dim); $n++) $txt .= '<td>'.$Dim[$n];
$txt .= '</tr></table>';
if( $ConEco ) echo $txt;
else return $txt;
}
function _IconosPie($Opcion){
global $_NOBUTTON, $_FORMBUTTONS, $_PSOURCE, $_LogUser, $OriFichero, $_OPTIONS, $_DBLOG, $_DBLOGINCLUDE;
global $_ADDICON, $__Lng, $_ICONSPIEOFF, $_gsObjeto, $_FileDF, $_URL_IN_MENU;
if( $_NOBUTTON || $_ICONSPIEOFF ) return;
$NewAccion = '';
switch( $Opcion ){
case "A":
case "a":
$NewAccion = 'vud';
break;
case "c":
case "m":
case "b":
$ConSubListado = true;
break;
case "bR":
$NewAccion = 'IVvUudW';
break;
case "cR":
$NewAccion = 'IvDdUuW';
break;
case "mR":
$NewAccion = 'IDdVvuW';
break;
}
$_FORMBUTTONS = "W";
$DimOp = ["a"=>"I", "b"=>"Dd", "c"=>"Vv", "m"=>"Uu"];
foreach($_URL_IN_MENU as $k=>$v){
$_FORMBUTTONS .= $DimOp[$k];
}
if( $_FORMBUTTONS[0]=='-' ){
$_FORMBUTTONS = substr($_FORMBUTTONS,1);
for($n=0; $n<strlen($_FORMBUTTONS); $n++) $NewAccion = str_replace(substr($_FORMBUTTONS,$n,1),'',$NewAccion);
}else{
for($n=strlen($NewAccion)-1; $n>=0; $n--){
$o = substr($NewAccion,$n,1);
if( substr_count($_FORMBUTTONS, $o)==0 ) $NewAccion = str_replace($o,'',$NewAccion);
}
}
$Op = array();
for($n=0; $n<strlen($NewAccion); $n++) $Op[substr($NewAccion,$n,1)] = true;
echo '<table id=OpButtons width=1px border=0px cellspacing=0px cellpadding=0px style="border-collapse:collapse; display:inline-table"><tr id=OpButtonsTR>';
if( $ConSubListado ) $Op['CL'] = true;
if( $_PSOURCE=='WDESKTOP' || $_PSOURCE=='WWORK' || $_PSOURCE=='MAIN' ){
if( $Op['W'] && $_SESSION['_LogUser_']=='S' && $_LogUser!='' && $OriFichero[0]!='$' ){
list($xTipo) = explode('|', $_LogUser);
if( strtoupper(trim($xTipo))<>'HIDDEN' ){
$Op['LU'] = true;
}else{
$Op['LD'] = true;
}
}
if( ( $Op['W'] || $_GET['_LOG']=='S' ) && count($_DBLOG)>0 && $_SESSION['_LogHistory_']=='S' && $OriFichero[0]!='$' ){
if( $_DBLOGINCLUDE!='' ) $_DBLOGINCLUDE = eScript($_DBLOGINCLUDE);
$Op['H'] = true;
}
}else{
if( ( $Op['W'] || $_GET['_LOG']=='S' ) && count($_DBLOG)>0 && $_SESSION['_LogHistory_']=='S' && $OriFichero[0]!='$' ){
if( $_DBLOGINCLUDE!='' ) $_DBLOGINCLUDE = eScript($_DBLOGINCLUDE);
$Op['H'] = true;
}
}
$OpMas = _IconoSubmitGet($Opcion);
foreach($OpMas as $k=>$v){
$Op[$k] = $v;
}
if( $_GET['_SUBINSERT']==1 ){
if( isset($Op["v"]) ) unset($Op["v"]);
if( isset($Op["u"]) ) unset($Op["u"]);
if( isset($Op["d"]) ) unset($Op["d"]);
}
if( $GLOBALS['_FORMBUTTONSDELETE']!="--" ){
switch( _MenuTabPieShow($Op) ){
case 'S':
echo '<td width=1px><i class="ICONINPUT" id="MenuTabPieICON" onclick="MenuTabPie(this)" title="Menú">=</i>';
break;
case 'C':
echo '<td width=1px><i class="ICONINPUT" id="MenuTabPieICON" onclick="_FrmPaste()" title="'.$__Lng[154].'">&#183;</i>';
break;
}
}
if( count($_OPTIONS)>0 ){
echo '<td width=1px>';
if( substr_count($_OPTIONS[0][0], "\\")>0 ){
$tmp = explode("\\", $_OPTIONS[0][0]);
echo eAddButton("=", trim($tmp[0]), "_eMenu()", $__Lng[24], "");
$_OPTIONS[0][0] = trim($tmp[1]);
}else{
echo '<i class="ICONINPUT ICONOPTION" onclick=_eMenu() title="'.$__Lng[24].'">=</i>';
}
}
if( isset($_ADDICON) ){
echo '<td width=1px>'._AddPublic("click", $_ADDICON);
}
echo '</table>';
}
function _MenuTabPieShow($Op){
if( isset($_GET['_ISUBLIST']) ) return false;
global $_DBLOGINCLUDE, $__Lng, $_Mode, $_FORMBUTTONS;
if( $_FORMBUTTONS=='' ) return;
?>
<script type='text/javascript'>
function MenuTabPie(Obj){
var Dim = new Array();
if( _oMode=='a' && _Mode=='c' && _CountType==0 ){
<?= (($Op['CO']) ? "Dim['-2'] = '".$__Lng[150]."';" : '') ?>
<?= (($Op['CO'] && $GLOBALS["_FORMACTION"]=="") ? "Dim['.CO'] = '[9]".$__Lng[161]."';" : '') ?>
}else{
<?PHP
$co = ($_Mode=='a' && $Op['CO'] && substr_count($_FORMBUTTONS,'V')>0 ) || ($_Mode!='a' && $Op['CO']);
$THMenu = ($Op['I'] || $Op['v'] || $Op['u'] || $Op['d']);
$THLinea = ($Op['CL'] || $Op['ES'] || $Op['SL'] || $co || $Op['H'] || $Op['LU'] || $Op['LD']);
if( $THLinea && !$THMenu ){
$THLinea = false;
$THMenu = true;
}
$THConver = ($Op['D'] || $Op['V'] || $Op['U']);
?>
if( _oMode.length==2 ){
<?= (($Op['D'] || $Op['V'] || $Op['U']) ? "Dim['-1'] = '".$__Lng[164]."';" : '') ?>
<?= (($Op['D']) ? "Dim['.D'] = '[D]".$__Lng[146]."';" : '') ?>
<?= (($Op['V']) ? "Dim['.V'] = '[V]".$__Lng[147]."';" : '') ?>
<?= (($Op['U']) ? "Dim['.U'] = '[U]".$__Lng[148]."';" : '') ?>
}
<?= (($THMenu) ? "Dim['-2'] = '".$__Lng[150]."';" : '') ?>
<?= (($Op['d']) ? "Dim['.d'] = '[D]".$__Lng[151]."';" : '') ?>
<?= (($Op['v']) ? "Dim['.v'] = '[V]".$__Lng[153]."';" : '') ?>
<?= (($Op['I']) ? "Dim['.I'] = '[I]".$__Lng[149]."';" : '') ?>
<?= (($Op['u']) ? "Dim['.u'] = '[U]".$__Lng[152]."';" : '') ?>
<?= (($THLinea) ? "Dim['-3'] = '';" : '') ?>
<?= (($Op['H']) ? "Dim['.H'] = '[&#172;]".$__Lng[158]."';" : '') ?>
<?= (($Op['LU']) ? "Dim['.LU'] = '[q]".$__Lng[159]."';" : '') ?>
<?= (($Op['LD']) ? "Dim['.LD'] = '[q]".$__Lng[160]."';" : '') ?>
<?= (($Op['ES']) ? "Dim['.ES'] = '[E]".$__Lng[156]."';" : '') ?>
<?= (($Op['SL']) ? "if(!_TabListON) Dim['.SL'] = '[&#227;]".$__Lng[157]."';" : '') ?>
<?= (($Op['SL']) ? "if(_TabListON) Dim['.AA'] = '[&#221;]".$__Lng[170]."';" : '') ?>
<?= (($_Mode=='a' && $Op['CO'] && substr_count($_FORMBUTTONS,'V')>0 ) ? "Dim['.CO'] = '[V]".$__Lng[155]."';" : '') ?>
<?= (($_Mode!='a' && $Op['CO'] && $GLOBALS["_FORMACTION"]=="") ? "Dim['.CO'] = '[9]".$__Lng[161]."';" : '') ?>
<?= (($Op['CL']) ? "Dim['.CL'] = '[&#183;]".$__Lng[154]."';" : '') ?>
}
<?PHP
if( substr_count('bcm',$_Mode)>0 ){
if( $Op['CL'] && !($Op['ES'] || $Op['SL'] || $Op['CO'] || $Op['H'] || $Op['LU'] || $Op['LD']) ){
$Res = 'C';
}else $Res = (($THLinea || $THMenu || $THConver) ? 'S':'N');
}else{
$Res = (($THLinea || $THMenu || $THConver) ? 'S':'N');
}
?>
top.eMenu(window, Obj, Dim, _MenuTabPie);
}
</script>
<?PHP
return $Res;
}
function _IconoSubmit($Opcion){
global $_BUTTON, $_NOBUTTON, $_ADDBUTTON, $_gsObjeto, $_FORMBUTTONS, $_PSOURCE, $_TIPFORM, $_ADDCODE, $__INSERTTOSEEK, $_ANACTION;
global $OriFichero, $_OPTIONS, $_NOSUBLIST, $_IconsSubmit, $_COUNT, $__Lng, $_FORMACTION, $_ICONSPIEOFF, $_DELFILTER;
if( $_ICONSPIEOFF ){
if( $_FORMACTION=='' ) return false;
}
if( $_PSOURCE!='WWORK' && $Opcion=='cR' && $_NOBUTTON ){
$_GET['_BUTTONCLOSE'] = 1;
$_NOBUTTON = 0;
if( $GLOBALS["_NOBUTTONCLOSE"] ) $_NOBUTTON = true;
}
if( $_NOBUTTON && count($_ADDBUTTON)==0 ) return false;
if( substr_count($_BUTTON[0],'{$')>0 ) $_BUTTON[0] = _InVar($_BUTTON[0]);
if( substr_count($_BUTTON[0],'<'.'?')>0 ) $_BUTTON[0] = _InFunction($_BUTTON[0]);
if( $_BUTTON[0][0]=="[" && substr_count($_BUTTON[0],']')==1 ){
list($izq,$dch) = explode("]",substr($_BUTTON[0],1));
$_BUTTON[0] = eIcon($izq).$dch;
}
$ConSubListado = '';
$TipoBoton = 'buscar';
$txtBoton =  $__Lng[8];
$ModoIcono = 'Q';
if( isset($__INSERTTOSEEK) ) $Opcion = "c";
switch( $Opcion ){
case "A":
case "a":
$TipoBoton = 'anadir';
$txtBoton =  $__Lng[2];
$ModoIcono = 'I';
if( $_SESSION['_WebMaster']=='S' && $_FORMACTION=='' ) $ConSubListado = ' oncontextmenu="_ChangeOp()"';
break;
case "b":
$ConSubListado = ' oncontextmenu="_ChangeOp()"';
break;
case "bR":
global $_DBBAKDELETE;
$TipoBoton = 'borrar';
$txtBoton =  $__Lng[3];
if( substr($GLOBALS['_sDBTABLE'],-4)=='_dlt' ){
$txtBoton =  $__Lng[4];
}else if( $_DBBAKDELETE ){
$txtBoton =  $__Lng[5];
}
$ModoIcono = 'D';
break;
case "c":
$TipoBoton = 'buscar';
$txtBoton =  $__Lng[8];
$ConSubListado = ' oncontextmenu="_ChangeOp()"';
if( isset($__INSERTTOSEEK) ){
if( $__INSERTTOSEEK[0]!="" ) $txtBoton = $__INSERTTOSEEK[0];
$ConSubListado = '';
}
break;
case "cR":
$TipoBoton = 'buscar';
$txtBoton =  $__Lng[6];
break;
case "m":
$ConSubListado = ' oncontextmenu="_ChangeOp()"';
break;
case "mR":
$TipoBoton = 'modificar';
$txtBoton =  $__Lng[7];
$ModoIcono = 'U';
break;
}
$_MovBoton = true;
$MovBoton = '';
if( $_BUTTON[2]!='' ) $ModoIcono = $_BUTTON[2];
if( $_NOSUBLIST || $_ANACTION ) $ConSubListado = '';
if( $ConSubListado!='' && $_COUNT=='-1' &&  $Opcion!='a' ){
if( $_BUTTON[1]!='' ) $_BUTTON[1] .= "\n";
$_BUTTON[1] .= $__Lng[10];
}else{
if( $_BUTTON[1]=="" ) $_BUTTON[1] = $__Lng[119];
}
if( $_COUNT!='-1' && substr_count(',c,m,b,', ",{$Opcion},")>0 ){
echo '<script type="text/javascript">';
include('../../edesweb/lastcount.js');
echo '</script>';
$ConSubListado = ' oncontextmenu="eClearEvent()"';
$txtBoton = $__Lng[124];
}
if( !$_SESSION["_BYPHONE"] ) echo '<table id=OpButtons width=1px border=0px cellspacing=0px cellpadding=0px style="border-collapse:collapse; display:inline-table"><tr>';
if( count($_ADDBUTTON)>0 ){
for($n=0; $n<count($_ADDBUTTON); $n++){
for($i=0; $i<3; $i++){
if( substr_count($_ADDBUTTON[$n][$i],'{$')>0 ) $_ADDBUTTON[$n][$i] = _InVar($_ADDBUTTON[$n][$i]);
if( substr_count($_ADDBUTTON[$n][$i],'<'.'?')>0 ) $_ADDBUTTON[$n][$i] = _InFunction($_ADDBUTTON[$n][$i]);
}
$xIcon = "";
$xText = $_ADDBUTTON[$n][0];
$xTitle	= $_ADDBUTTON[$n][1];
$xClick = $_ADDBUTTON[$n][2];
$xInner = "";
$xStyle = $_ADDBUTTON[$n][3];
if( $xClick!='' ) $xClick = 'eClearEvent();'.str_replace('"',"'",$xClick);
if( $_TIPFORM['AddButton'.($n+1)]['I']!='' ){
$bTitle = $_TIPFORM['AddButton'.($n+1)]['I'];
if( $bTitle=='>' ){
$xInner = " onmouseenter=\"S(this).tip('#_TIP_I_".'AddButton'.($n+1)."',-1)\"";
}else{
$bTitle = str_replace(array('&34;','&39;'), array('&#34;',"\'"), $bTitle);
$xInner = " onmouseenter=\"S(this).tip('{$bTitle}',-1)\"";
}
}
echo '<TD>';
$ver = "";
if( $_ADDBUTTON[$n][4]!='' ){
if( $_ADDBUTTON[$n][4][0]!="," ) $_ADDBUTTON[$n][4] = ",".$_ADDBUTTON[$n][4];
if( substr($_ADDBUTTON[$n][4],-1)!="," ) $_ADDBUTTON[$n][4].=",";
if( substr_count($_ADDBUTTON[$n][4], ",1,")==0 ) $ver = ";display:none";
$xInner .= " eTabView=',".$_ADDBUTTON[$n][4].",'";
}
if( $xStyle!='' ){
$xStyle = ' style="'.$xStyle.$ver.'"';
}else{
$xStyle = ' style="'.$ver.'"';
}
$xInner .=  ' pp=1 id="AddButton'.($n+1).'" '.$xStyle;
if( $xText[0]=='<' ){
if( preg_match('/^<i.{1,}<\/i>/i', $xText) ){
list($xIcon, $xIcon2, $xText) = explode('>',$xText);
$xIcon = $xIcon.">".$xIcon2.">";
}else{
list($xIcon, $xText) = explode('>',$xText);
$xIcon .= '>';
}
}else if( $xText[0]=='[' ){
list($xIcon, $xText) = explode(']',$xText);
$xIcon = substr($xIcon,1);
}else{
}
eAddButton($xIcon, $xText, $xClick, $xTitle, $xInner, $_ADDBUTTON[$n][5]);
echo '<TD>';
}
}
if( !$_NOBUTTON ){
if( !empty($_BUTTON[0]) ) $txtBoton = $_BUTTON[0];
if( !$_SESSION["_BYPHONE"] ) echo '<TD>';
if( isset($GLOBALS['_SUBLISTACTION']) && $GLOBALS['_PSOURCE']<>$GLOBALS['OriFichero'] ){
echo '<span class="AddButton" id="OpExe" onClick="_SubListado()"';
}else{
if( (isset($_GET['_CLOSE_']) && $ModoIcono=='Q') || isset($_GET['_BUTTONCLOSE']) ){
if( $Opcion=='cR' ){
$txtBoton = $__Lng[25];
$ModoIcono = 'C';
echo '<script type="text/javascript">ConF10=2;</script>';
}
echo '<span class="AddButton" id="OpExe" onClick="top.eSWClose(window)"';
}else{
if( $_SESSION['_WebMaster']=='S' && $_FORMACTION=='' && $_COUNT=='-1' && $_FORMBUTTONS!='' ){
if( (substr_count('bcm',$Opcion)>0 || ($Opcion=='a' && $_FORMACTION=='')) && !$_ANACTION ) $_BUTTON[1] .= "\n".$__Lng[133];
}
echo '<span class=AddButton id="OpExe"';
if( $GLOBALS['_OpcionBak']=='o' && $_GET['_SUBINSERT']<>1 ){
echo ' oncontextmenu="eOkTab()"'.str_replace('oncontextmenu', 'onclick', $ConSubListado);
}else{
if( $_GET['_SUBINSERT']==1 ) $ConSubListado = "";
echo ' pp=1 onClick="eOkTab()"'.$ConSubListado;
}
if( $_TIPFORM['BUTTON']['F']!='' ){
$bTitle = $_TIPFORM['BUTTON']['F'];
if( $bTitle=='>' ){
echo " onmouseenter=\"S(this).tip('#_TIP_F_BUTTON',-1)\"";
}else{
$bTitle = str_replace(array('&34;','&39;'), array('&#34;',"\'"), $bTitle);
echo " onmouseenter=\"S(this).tip('{$bTitle}',-1)\"";
}
}
}
}
echo $_ADDBUTTON[$n][2].' title="'.$_BUTTON[1].'">';
if( $txtBoton[0]=='<' || $_IconsSubmit[$ModoIcono][1]!='' || $ModoIcono=="E" ){
if( $txtBoton[0]=='<' ){
list($xIcon, $xText) = explode('>',$txtBoton);
if( strtoupper(substr($xIcon,0,3))=="<I " ){
list( $xIcon, $xIcon2, $xText ) = explode('>',$txtBoton);
$xIcon = $xIcon.">".$xIcon2;
}
$xIcon .= '>';
}else{
if( isset($_GET['_CLOSE_']) && $ModoIcono=='Q' ) $ModoIcono = 'V';
if( $ModoIcono=="Q" ) $ModoIcono = "S";
else if( $ModoIcono=="C" ) $ModoIcono = "R";
$tmp = array("I"=>" ICONINSERT","U"=>" ICONUPDATE","V"=>" ICONVIEW","D"=>" ICONDELETE","S"=>" ICONSEEK","R"=>" ICONCLOSE","E"=>"");
$NewIcon = $tmp[$ModoIcono];
if( $ModoIcono=="E" ) $ModoIcono="n";
$xIcon = "<i class='ICONINPUT{$NewIcon}'>{$ModoIcono}</I>";
if( $_BUTTON[0]=='' ){
$xText = $txtBoton;
if( $_IconsSubmit[$ModoIcono][0]!=null ) $xText = $_IconsSubmit[$ModoIcono][0];
}else{
$xText = $_BUTTON[0];
}
}
}else{
if( $_BUTTON[0]=='' ){
$xText = $txtBoton;
if( $_IconsSubmit[$ModoIcono][0]!=null ) $xText = $_IconsSubmit[$ModoIcono][0];
}else{
$xText = $_BUTTON[0];
}
}
echo "{$xIcon}{$xText}</span>";
if($ModoIcono=="R" && $Opcion=='cR') echo '<script type="text/javascript">if(!top.eIsWindow(window))S("#OpExe").none();</script>';
echo '</TD>';
if( $_ADDCODE['button']['A']!='' ) echo '<td>'.$_ADDCODE['button']['A'].'</td>';
}else{
$ConSubListado = '';
}
if( !$_SESSION["_BYPHONE"] ) echo '</table>';
return($ConSubListado!='');
}
function _IconoSubmitGet($Opcion){
global $_BUTTON, $_NOBUTTON, $_ADDBUTTON, $_gsObjeto, $_FORMBUTTONS, $_FORMBUTTONSDELETE, $_PSOURCE, $_TIPFORM, $_ADDCODE;
global $OriFichero, $_OPTIONS, $_NOSUBLIST, $_COUNT, $__Lng, $_FORMACTION;
$Op = array();
if( $_PSOURCE!='WWORK' && $Opcion=='cR' && $_NOBUTTON ){
$_GET['_BUTTONCLOSE'] = 1;
$_NOBUTTON = 0;
}
if( $_NOBUTTON && count($_ADDBUTTON)==0 ) return false;
$ConSubListado = '';
$TipoBoton = 'buscar';
$txtBoton =  $__Lng[8];
$ModoIcono = 'Q';
switch( $Opcion ){
case "A":
case "a":
$TipoBoton = 'anadir';
$txtBoton =  $__Lng[2];
$ModoIcono = 'I';
if( $_SESSION['_WebMaster']=='S' && $_FORMACTION=='' ){
$ConSubListado = ' oncontextmenu="_ChangeOp()"';
$Op['CO'] = 1;
}
break;
case "b":
$ConSubListado = ' oncontextmenu="_ChangeOp()"';
$Op['CO'] = 1;
$Op['CL'] = 1;
break;
case "bR":
global $_DBBAKDELETE;
$TipoBoton = 'borrar';
$txtBoton =  $__Lng[3];
if( substr($GLOBALS['_sDBTABLE'],-4)=='_dlt' ){
$txtBoton =  $__Lng[4];
}else if( $_DBBAKDELETE ){
$txtBoton =  $__Lng[5];
}
$ModoIcono = 'D';
break;
case "c":
$TipoBoton = 'buscar';
$txtBoton =  $__Lng[8];
$ConSubListado = ' oncontextmenu="_ChangeOp()"';
$Op['CO'] = 1;
$Op['CL'] = 1;
break;
case "cR":
$TipoBoton = 'buscar';
$txtBoton =  $__Lng[6];
break;
case "m":
$ConSubListado = ' oncontextmenu="_ChangeOp()"';
$Op['CO'] = 1;
$Op['CL'] = 1;
break;
case "mR":
$TipoBoton = 'modificar';
$txtBoton =  $__Lng[7];
$ModoIcono = 'U';
break;
}
$_MovBoton = true;
$MovBoton = '';
if( $_BUTTON[2]!='' ) $ModoIcono = $_BUTTON[2];
if( $_NOSUBLIST ) $ConSubListado = '';
if( $ConSubListado!='' && $_COUNT=='-1' &&  $Opcion!='a' ){
$Op['ES'] = 1;
$Op['SL'] = 1;
}else{
}
if( $_FORMBUTTONSDELETE!='' ){
if( $_FORMBUTTONSDELETE[0]=='-' ){
$Op['ES']='';
$Op['SL']='';
$Op['CO']='';
}else{
$_FORMBUTTONSDELETE = strtoupper($_FORMBUTTONSDELETE);
if( substr_count($_FORMBUTTONSDELETE,'S')>0 ) $Op['ES']='';
if( substr_count($_FORMBUTTONSDELETE,'L')>0 ) $Op['SL']='';
if( substr_count($_FORMBUTTONSDELETE,'C')>0 ) $Op['CO']='';
}
}
if( $_COUNT!='-1' && substr_count(",c,m,b,", ",{$Opcion},")>0 ){
return array();
}
if( !$_NOBUTTON ){
if( isset($GLOBALS['_SUBLISTACTION']) && $GLOBALS['_PSOURCE']<>$GLOBALS['OriFichero'] ){
$Op['SL'] = 1;
}else{
if( (isset($_GET['_CLOSE_']) && $ModoIcono=='Q') || isset($_GET['_BUTTONCLOSE']) ){
}else{
if( $_SESSION['_WebMaster']=='S' && $_FORMACTION=='' && $_COUNT=='-1' ){
if( substr_count('bcm',$Opcion)>0 || ($Opcion=='a' && $_FORMACTION=='') ){
}
}
if( $GLOBALS['_OpcionBak']=='o' ){
}else{
}
}
}
}else{
$ConSubListado = '';
}
return( $Op );
}
function DivideEventos($eventos){
$DimTxt = array();
$txt = $TipoEvento = $EventosVarios = '';
$d = '##';
for($n=0; $n<strlen($eventos); $n++){
$c = substr($eventos,$n,1);
if( $d==$c ){
$DimTxt[$TipoEvento] = trim($txt);
$txt = $c = '';
$d = '##';
}
$txt .= $c;
if( $c=='=' && $d=='##' ){
$d = substr($eventos,$n+1,1);
$txt = strtolower($txt);
$TipoEvento = trim(substr($txt,0,strlen($txt)-1));
if( $TipoEvento!='onchange' && $TipoEvento!='onclick' ){
$sEvento = '';
$comilla = substr($eventos,$n+1,1);
$conComilla = ($comilla=="'" || $comilla=='"');
for($i=$n+($conComilla?2:1); $i<strlen($eventos); $i++){
$c = substr($eventos,$i,1);
$sEvento .= $c;
if( $d==$c && substr($eventos,$i-1,1)!='\\' ){
$n = $i-1;
break;
}
}
if( !$conComilla ) $d = "";
$EventosVarios = trim($EventosVarios) .' '. $TipoEvento.'='.$d.$sEvento;
$txt = $c = '';
$d = '##';
}
$txt = '';
$n++;
}
}
if( $EventosVarios!='' ) $DimTxt['eventos'] = ' '.$EventosVarios;
return $DimTxt;
}
function IncluirEnForm($Objeto, $Opcion, $buffer, &$_Form, $_DEFAUX, $nHoja, $MemPDF=false){
global $_WidthField, $_TypeField, $_PDFLABELHIDDEN, $_pF, $_ISUBLIST, $_DefaultSize, $_VIEW, $_FieldsMix, $_COLSWIDTH, $_ColsTrim, $_CARDSHOW;
$p = (($_ISUBLIST==true) ? "I":"L");
if( $Objeto=="F" ) $p = "T";
$coef = $_DefaultSize['IC']['U'] / $_DefaultSize['TC']['U'];
if( $Objeto=='F' && $Opcion=='l' ) $Opcion = 'c';
$tmp = explode('|', $buffer);
for($i=0; $i<10; $i++) $tmp[$i] = trim($tmp[$i]);
if( strpos($tmp[6],'#')!==false ) _CreateVarOne($tmp[6]);
if( $_CARDSHOW ){
if( $tmp[0][0]=="," ) $tmp[0] = trim(substr($tmp[0],1));
if( is_numeric($tmp[0][0]) ) $tmp[0] = trim(substr($tmp[0],1));
}
if( $tmp[0][0]!='{' && $tmp[0][0]!='}' ){
list($Campo) = explode(':',$tmp[1]);
list($Campo) = explode('{',$Campo);
if( substr_count($tmp[6],'h')>0 ){
if( $_PDFLABELHIDDEN[$Campo]=='' && $_PDFLABELHIDDEN[$Campo]!='NOTTOSHOW' ) $_PDFLABELHIDDEN[$Campo] = 'NOTTOSHOW';
if( $MemPDF ) return false;
}else if( $MemPDF ){
if( (substr_count('bcmsq',$Opcion)>0 && substr_count($tmp[6], 'Q')>0 ) || $tmp[6]=='c' ){
$xLabel = $tmp[0];
if( $xLabel[0]=='<' && substr_count($xLabel, '<')!=substr_count($xLabel, '>') ) $xLabel = trim(substr($xLabel,1));
if( $xLabel[0]==',' ){
$xLabel = trim(substr($xLabel,1));
if( is_numeric($xLabel[0]) ) $xLabel = trim(substr($xLabel,1));
}
if( $_PDFLABELHIDDEN[$Campo]=='' && $_PDFLABELHIDDEN[$Campo]!='NOTTOSHOW' ) $_PDFLABELHIDDEN[$Campo] = $xLabel;
return false;
}
}else if( substr_count($tmp[6], 'Q')>0 || $tmp[6]=='c' ){
$xLabel = $tmp[0];
if( $xLabel[0]=='<' && substr_count($xLabel, '<')!=substr_count($xLabel, '>') ) $xLabel = trim(substr($xLabel,1));
if( $xLabel[0]==',' ){
$xLabel = trim(substr($xLabel,1));
if( is_numeric($xLabel[0]) ) $xLabel = trim(substr($xLabel,1));
}
if( $_PDFLABELHIDDEN[$Campo]=='' && $_PDFLABELHIDDEN[$Campo]!='NOTTOSHOW' ) $_PDFLABELHIDDEN[$Campo] = $xLabel;
}
}
if( strtoupper(trim($tmp[0]))!='{TAB}' ){
$tmp[6] = str_replace(' ','',$tmp[6]);
$tmp[10] = $nHoja;
$tmp[11] = 'E';
$tmp[12] = ''; $tmp[13] = ''; $tmp[14] = ''; $tmp[15] = ''; $tmp[16] = '';
}
$Ok = false;
if( $tmp[0][0]=='<' ){
if( substr_count($tmp[0], '<')!=substr_count($tmp[0], '>') ){
$tmp[0] = trim(substr($tmp[0],1));
global $_SKIPTD;
list($sCampo) = explode('{', $tmp[1]);
list($sCampo) = explode(':', $sCampo);
$_SKIPTD[trim($sCampo)] = true;
}
}
if( $tmp[1][0]=='#' ){
global $_MacroField;
if( count($_MacroField)==0 ) CargaMacroField();
$tmp[1] = $_MacroField[$tmp[1]];
}
if( substr_count($tmp[6], ';')>0 ){
global $DimOpcion;
$v1 = explode(';', $tmp[6]);
$tmp[6] = trim($v1[count($v1)-1]);
for($i=0; $i<count($v1); $i++){
$v2 = explode('=', $v1[$i]);
$v2[0] = str_replace(' ','',$v2[0]);
if( in_array($v2[0], $DimOpcion) ){
$tmp[6] = str_replace(' ', '', $v2[1]);
break;
}
}
}
$Ok = false;
if( substr_count('bcmsq', $Opcion)>0 ){
if( substr_count($tmp[6], 'Q')>0 ) $Ok = true;
}else{
if( $Objeto=='L' && $tmp[1][0]=='_' ) $Ok = false;
else if( $Opcion!='l' && ($tmp[0][0]=='-' || $tmp[0][0]=='>' || $tmp[1][0]=='[') ) $Ok = true;
else if( $Opcion=='l' && ($tmp[1][0]=='_' || $tmp[1][0]=='[') ) $Ok = false;
else if( substr_count($tmp[6], 'A')>0 ||  substr_count($tmp[6], 'M'  )>0 ) $Ok = true;
else if( substr_count($tmp[6], '*')>0 && (substr_count($tmp[6], '*Q*')==1 || substr_count($tmp[6], '*Q')==0) ) $Ok = true;
else if( substr_count($tmp[6], '-')>0 && (substr_count($tmp[6], '-Q-')==1 || substr_count($tmp[6], '-Q')==0) ) $Ok = true;
if( $Opcion=='l' && $Ok ){
if( substr_count($tmp[6], 'L')>0 ) $Ok = false;
else if( $tmp[0]=='{TAB}' ) $Ok = false;
else if( $tmp[1][0]=='_' && !in_array($tmp[1], array('_fichero','_estructura','_exe','_no_contar')) ) $Ok = false;
else if( $tmp[0][0]=='-' || $tmp[1][0]=='[' || strlen($tmp[2])==0 || $tmp[3]=='G' ) $Ok = false;
}
if( $tmp[3]=="ST" ) $Ok = false;
}
if( $tmp[3]=='I' && $Opcion!='l' ) $Ok = false;
if( $Ok ){
if( substr_count($tmp[1],'$')>0 ){
$tmp[1] = _InVar($tmp[1]);
}
if( $tmp[3]=="H" ) $tmp[2] = "#";
$tmp[1] = str_replace('  ',' ',$tmp[1]);
if( $tmp[0][0]!='-' && substr_count($tmp[1],'{')>0 ){
list($v1,$v2) = explode('}',$tmp[1]);
$tmp[1] = trim($v1).'}';
if( $v2!='' ){
list($v1,$v2) = explode(' as ',$v2);
if( $Objeto!="FC" ){
if( $v2!='' ){
$_pF[trim($v2)] = count($_Form);
$_pF['*'.trim($v2)] = count($_Form);
}else{
$_pF[trim($v1)] = count($_Form);
$_pF['*'.trim($v1)] = count($_Form);
}
}
}else{
$v = explode(',',$v1);
if( $Objeto!="FC" ) $_pF[trim($v[count($v)-1])] = count($_Form);
}
}else if( substr_count($tmp[1],':')>0 ){
list(,$v) = explode(':',$tmp[1]);
list($tmp[1]) = explode(' ',$tmp[1]);
if( substr_count($v,' ')>0 ){
list($v1,$v2) = explode(' as ',$v);
if( $Objeto!="FC" ){
if( $v2!='' ){
$_pF[trim($v2)] = count($_Form);
$_pF['*'.trim($v2)] = count($_Form);
}else{
list(,$v1) = explode(' ',$v);
$_pF[trim($v1)] = count($_Form);
$_pF['*'.trim($v1)] = count($_Form);
}
}
}else{
if( $Objeto!="FC" ) $_pF[trim($v)] = count($_Form);
}
}else if( $tmp[0][0]!='-' ){
if( substr_count($tmp[1],' ')>0 ){
$v = $tmp[1];
if( substr_count($v,' as ')>0 ){
if( $Objeto!='L' ){
list($tmp[1],$v2) = explode(' as ',$v);
}else{
list(,$v2) = explode(' as ',$v);
}
if( $Objeto!="FC" ) $_pF[trim($v2)] = count($_Form);
}else{
if( $Objeto!='L' ){
list($tmp[1],$v1) = explode(' ',$v);
}else{
list(,$v1) = explode(' ',$v);
}
if( $Objeto!="FC" ) $_pF[trim($v1)] = count($_Form);
}
}else{
if( $Objeto!="FC" ) $_pF[$tmp[1]] = count($_Form);
}
}
if( substr($tmp[9],0,2)=='L:' ){
global $_Etiqueta;
$_Etiqueta[$tmp[1]] = substr($tmp[9],2);
$tmp[9] = '';
}
list($tmp[0], $MsgList, $MsgError) = explode(chr(92), str_replace("  ", " ", $tmp[0]).chr(92).chr(92));
if( $tmp[2]=="H" && $tmp[3]=="T" ) $tmp[2] .= $tmp[4];
if( preg_match('/^(F|IMG|ICON)$/i', $tmp[3]) && substr_count($tmp[5], '/') ){
if( $Objeto=='L' ){
$tmp[5] = explode('/', $tmp[5])[1];
}else{
$tmp[5] = explode('/', $tmp[5])[0];
}
}
if( $Objeto=='L' ){
$tmp[0] = str_replace('·', '<br>', $tmp[0]);
$MsgList = str_replace('·', '<br>', $MsgList);
if( $tmp[0]!='' && substr_count('+,123456789=]', $tmp[0][0])>0 ){
if( $tmp[0][0]==',' ) $tmp[0] = trim(substr($tmp[0], 1));
if( $tmp[0][0]=='+' ) $tmp[0] = trim(substr($tmp[0], 1));
if( substr_count('123456789', $tmp[0][0])>0 ){
$tmp[0] .= ' ';
$tmp[0] = trim(substr($tmp[0], strpos($tmp[0],' ')));
$tmp[0] = trim($tmp[0]);
}
if( $tmp[0][0]=='=' ) $tmp[0] = trim(substr($tmp[0], 1));
if( $tmp[0][0]==']' ) $tmp[0] = trim(substr($tmp[0], 1));
}
if( $MsgList!='' ){
global $_TIPTH;
if( $_TIPTH[count($_Form)]=='' && strtoupper($MsgList)!=strtoupper($tmp[0]) ){
$tmp[0] = str_replace('<br>', ' ', $tmp[0]);
if( strip_tags($tmp[0])!=$tmp[0] ) $tmp[0] = _textContent($tmp[0]);
$_TIPTH[count($_Form)] = $tmp[0];
}
$tmp[0] = trim($MsgList);
}
if( substr_count($tmp[5], "=") ){
$dim = explode("/", $tmp[5]);
$tmp[5] = "";
for($n=0; $n<count($dim); $n++){
if( substr_count($dim[$n], "=") ){
$tmp[5] = trim($dim[$n]);
break;
}
}
}
}else{
$tmp[0] = str_replace('·', ' ', $tmp[0]);
if( $MsgError!="" ){
global $_Etiqueta;
$_Etiqueta[$tmp[1]] = trim($MsgError);
}
if( substr_count($tmp[5], "=") ){
$dim = explode("/", $tmp[5]);
$tmp[5] = "";
for($n=0; $n<count($dim); $n++){
if( !substr_count($dim[$n], "=") ){
if( $tmp[5]<>"" ) $tmp[5] .= "/";
$tmp[5] .= trim($dim[$n]);
}
}
}
}
$tmp[0] = preg_replace_callback(
'|\{[a-zA-Z\_\-\./]{1,20}\}|',
function($item){
$pk = substr($item[0],1,-1);
if( preg_match('/(TAB|FS|FR|FC|COLUMNS|ISUBLIST)/i', $pk) ){
return $item[0];
}else{
return eIcon(substr($item[0],1,-1));
}
},
$tmp[0]
);
if( isset($_DEFAUX[$tmp[1]]) && $_DEFAUX[$tmp[1]]!='' ) $tmp[1] .= '{'.$_DEFAUX[$tmp[1]].'}';
$tmp[9] = str_replace('"', "'", $tmp[9]);
if( substr_count($tmp[5], ",") ) $tmp[20] = $tmp[5];
$tmp[1] = eReplaceAll(array("\t","  "), array(" "," "), $tmp[1]);
$_Form[] = $tmp;
$i = count($_Form)-1;
if( $tmp[3]=='T' || $tmp[3][0]=='S' || $tmp[3]=='[]' || $tmp[3]=='[*]' ){
if( $Objeto=="L" && $tmp[3]=='T' && $tmp[4]>$_SESSION["List"]["MaxWidth"] && $tmp[5]=="" && $_SESSION["List"]["MaxWidth"]>0 ){
$_Form[$i][5] = "=".($_DefaultSize[$p.'C']['L']*$_SESSION["List"]["MaxWidth"]);
}elseif( $tmp[5][0]=='=' ){
$_Form[$i][5] = $tmp[5];
}else if( $tmp[5]=='' ){
if( $_Form[$i][3][0]=="S" ){
$flecha = (($Objeto=='T') ? 10 : 0);
$margen = $_DefaultSize[$p.'T']['pdd'];
list($ac, $al) = explode(",", $_Form[$i][4]);
if( $al<>"" ){
$z = $_DefaultSize[$p.'C']['U'];
$_Form[$i][5] = ($z*$ac+$margen).",".($_DefaultSize[$p.'C']['U']*$al+$flecha+$margen);
}else{
$_Form[$i][5] = $_DefaultSize[$p.'C']['U']*$ac+$flecha+$margen;
}
if( $_ColsTrim ) $_Form[$i][5] = "";
}else if( $_DefaultSize[$p.'T'][$_Form[$i][2]]<>"" ){
$_Form[$i][5] = $_DefaultSize[$p.'T'][$_Form[$i][2]];
}else{
switch( $_Form[$i][2] ){
case '+':
$_Form[$i][5] = $_Form[$i][4]*$_DefaultSize[$p.'C']['N'];
$l = strlen(eNumberFormat(str_repeat("9",$_Form[$i][4]),0));
if( ($l-$_Form[$i][4])>0 ){
$_Form[$i][5] += $_DefaultSize[$p.'C']['uP']*($l-$_Form[$i][4]);
}
break;
case '-':
$_Form[$i][5] = $_DefaultSize[$p.'T']['uM'];
$_Form[$i][5] += $_Form[$i][4]*$_DefaultSize[$p.'C']['N'];
$l = strlen(eNumberFormat(str_repeat("9",$_Form[$i][4]-1),0));
if( ($l-$_Form[$i][4]-1)>0 ){
$_Form[$i][5] += $_DefaultSize[$p.'C']['uP']*($l-$_Form[$i][4]-1);
}
break;
case '+,':
list($m,$d) = explode(",",$_Form[$i][4]);
$_Form[$i][5] = $_DefaultSize[$p.'C']['uC'];
$_Form[$i][5] += ($m+$d)*$_DefaultSize[$p.'C']['N'];
$l = strlen(eNumberFormat(str_repeat("9",$m),0));
if( ($l-$m)>0 ){
$_Form[$i][5] += $_DefaultSize[$p.'C']['uP']*($l-$m);
}
break;
case '-,':
list($m,$d) = explode(",",$_Form[$i][4]);
$_Form[$i][5] = $_DefaultSize[$p.'T']['uM'] + $_DefaultSize[$p.'C']['uC'];
$_Form[$i][5] += ($m-1+$d)*$_DefaultSize[$p.'C']['N'];
$l = strlen(eNumberFormat(str_repeat("9",$m-1),0));
if( ($l-$m-1)>0 ){
$_Form[$i][5] += $_DefaultSize[$p.'C']['uP']*($l-$m-1);
}
break;
default:
if( !$_ColsTrim ){
$v = eNumberFormat($_Form[$i][4]*$_DefaultSize[$p.'C']['U'], 0);
if( $_SESSION['factorZoom']>1 ){
if( $v<$_DefaultSize[$p.'T']["F4"] ){
$_Form[$i][5] = $v;
}else{
$_Form[$i][5] = '100%';
}
break;
}else{
$_Form[$i][5] = $v;
}
}
}
if( $_Form[$i][5]!="" && substr($_Form[$i][5],-1)!="%" ) $_Form[$i][5] += $_DefaultSize[$p.'T']['pdd'];
}
if( $Objeto=="L" ) $_Form[$i][5] = "=".$_Form[$i][5];
}else if( $Objeto=='L' && $_COLSWIDTH[$i]=="" && !$_FieldsMix ){
if( $_DefaultSize[$p.'T'][$_Form[$i][2]]<>"" ){
if( substr_count($tmp[5], '>')==1 || substr_count($tmp[5], '<')==1 || substr_count($tmp[5], '+')==1 ){
$_Form[$i][5] = $_DefaultSize[$p.'T'][$_Form[$i][2]];
}
}else{
if( $_Form[$i][2]==strtoupper($_Form[$i][2]) ){
$_Form[$i][5] = $_DefaultSize[$p.'C']['U']*$_Form[$i][4];
}else{
$_Form[$i][5] = $_DefaultSize[$p.'C']['L']*$_Form[$i][4];
}
}
}else if( $Objeto!='L' ){
if( $_DefaultSize[$p.'T'][$_Form[$i][2]]<>"" && substr_count($tmp[5], '/')==0 ){
if( substr_count($tmp[5], '>')==1 || substr_count($tmp[5], '<')==1 || substr_count($tmp[5], '+')==1 ){
$_Form[$i][5] = $_Form[$i][5].'/'.$_DefaultSize[$p.'T'][$_Form[$i][2]];
}
}else if( $_SESSION['factorZoom']>1 && $tmp[5]!="" ){
$txt = "";
$tmp2 = explode(",",$tmp[5]);
for($n=0; $n<count($tmp2); $n++){
if( $txt!="" ) $txt .= ",";
$v = number_format($tmp2[$n]*$_SESSION['factorZoom'], 0, "","");
if( $v<$_DefaultSize[$p.'T']["F4"] ){
$txt .= $v;
}else{
$txt .= $tmp2[$n];
}
}
$_Form[$i][5] = $txt;
}else{
}
}
}else if( $tmp[5]=="" && ($_Form[$i][3]=="A" || $_Form[$i][3]=="H") ){
list(,$m) = explode(",", $_Form[$i][4]);
if( trim($m)!="" ){
$_Form[$i][5] = $_DefaultSize[$p.'C']['L']*$m;
if( $Objeto=="L" ){
$_Form[$i][5] = "=".$_Form[$i][5];
if( $m>$_SESSION["List"]["MaxWidth"] && $_SESSION["List"]["MaxWidth"]>0 ) $_Form[$i][5] = "=".($_DefaultSize[$p.'C']['L']*$_SESSION["List"]["MaxWidth"]);
}
}
}
if( $Objeto=="L" && $tmp[5]<>"" && substr_count($tmp[5],",")>0 ){
list($m) = explode(",", $_Form[$i][5]);
$_Form[$i][5] = $m;
}
if( $Objeto=="F" && $_Form[$i][0]=="" && ($_Form[$i][3]=="A" || $_Form[$i][3]=="H") ){
if( $_Form[$i-1][0]=="-" && $_Form[$i][9]=="" ) $_Form[$i][9] = "L:".$_Form[$i-1][1];
}
if( $_PDFLABELHIDDEN[$_Form[$i][1]]=='' && $_PDFLABELHIDDEN[$_Form[$i][1]]!='NOTTOSHOW' ) $_PDFLABELHIDDEN[$_Form[$i][1]] = $_Form[$i][0];
$_TypeField[$_Form[$i][12]] = $_Form[$i][2];
if( strtoupper($_Form[$i][1])=='ACTION' ) eMessage('Nombre de campo no permitido "action"', 'HSE');
if( isset($_VIEW) ){
global $_VIEWCOL;
if( !isset($_VIEWCOL) ) $_VIEWCOL = array();
for($n=0; $n<10; $n++){
if( substr_count($tmp[6], $n)>0 ) $_VIEWCOL[$n][] = $i;
}
}
}
return $Ok;
}
function eGetWidth($obj, $edicion, $tipo=NULL, $ancho=NULL, $px=NULL){
global $_DefaultSize, $_COLSWIDTH, $_FieldsMix;
if( gettype($edicion)=="array" ){
list(,, $edicion, $tipo, $ancho, $px) = $edicion;
}
$align = "L";
$tipo = strtoupper($tipo);
if( $tipo=='R' || $tipo=='C'  || $tipo=='G' || $tipo=='I' || ($tipo[0]=='[' && strlen($tipo)>3) ){
return array($px, $px, $align);
}
if( $edicion=="H" && $tipo=="T" ) $edicion .= $ancho;
$newDato = "";
if( $px!="" ){
$dim = explode("/", $px);
for($n=0; $n<count($dim); $n++){
$dim[$n] = trim($dim[$n]);
if( $obj=="T" ){
if( is_numeric($dim[$n]) && substr_count($dim[$n], "=")==0 && substr_count($dim[$n], "<")==0 && substr_count($dim[$n], ">")==0 && substr_count($dim[$n], "+")==0 ){
$px = $dim[$n];
break;
}
}else if( substr_count($dim[$n], "=")==1 ){
$px = substr($dim[$n], 1);
break;
}else if( is_numeric($dim[$n]) ){
$px = $dim[$n];
break;
}
}
}
if( $px=="" ){
if( $tipo[0]=="S" ){
$flecha = (($obj=='T') ? 10 : 0);
$margen = $_DefaultSize[$obj.'T']['pdd'];
$z = $_DefaultSize[$obj.'C']['U'];
list($ac, $al) = explode(",", $ancho);
if( $al<>"" ){
$px = ($z*$ac + $margen).",".($z*$al + $flecha+$margen);
}else{
$px = $z*$ac + $flecha+$margen;
}
}else if( $_DefaultSize[$obj.'T'][$edicion]<>"" ){
$px = $_DefaultSize[$obj.'T'][$edicion];
$align = "C";
}else if( $tipo=="A" || $tipo=="H" ){
list(,$m) = explode(",", $ancho);
if( trim($m)!="" ){
$px = $_DefaultSize[$obj.'C']['L']*$m + $_DefaultSize[$obj.'T']['pdd'];
if( $obj=="L" ) $px = "=".$px;
}
}else if( $tipo=="T" ){
switch( $edicion ){
case '+':
$px = $ancho*$_DefaultSize[$obj.'C']['N'];
$l = strlen(eNumberFormat(str_repeat("9", $ancho),0));
if( ($l-$ancho)>0 ){
$px += $_DefaultSize[$obj.'C']['uP']*($l-$ancho);
}
$align = "R";
break;
case '-':
$px = $_DefaultSize[$obj.'T']['uM'];
$px += $ancho*$_DefaultSize[$obj.'C']['N'];
$l = strlen(eNumberFormat(str_repeat("9",$ancho-1),0));
if( ($l-$ancho-1)>0 ){
$px += $_DefaultSize[$obj.'C']['uP']*($l-$ancho-1);
}
$align = "R";
break;
case '+,':
list($m,$d) = explode(",", $ancho);
$px = $_DefaultSize[$obj.'C']['uC'];
$px += ($m+$d)*$_DefaultSize[$obj.'C']['N'];
$l = strlen(eNumberFormat(str_repeat("9",$m),0));
if( ($l-$m)>0 ){
$px += $_DefaultSize[$obj.'C']['uP']*($l-$m);
}
$align = "R";
break;
case '-,':
list($m,$d) = explode(",", $ancho);
$px = $_DefaultSize[$obj.'T']['uM'] + $_DefaultSize[$obj.'C']['uC'];
$px += ($m-1+$d)*$_DefaultSize[$obj.'C']['N'];
$l = strlen(eNumberFormat(str_repeat("9",$m-1),0));
if( ($l-$m-1)>0 ){
$px += $_DefaultSize[$obj.'C']['uP']*($l-$m-1);
}
$align = "R";
break;
default:
if( $edicion==strtoupper($edicion) ){
$px = $_DefaultSize[$obj.'C']['U']*$ancho;
}else{
$px = $_DefaultSize[$obj.'C']['L']*$ancho;
}
}
$px += $_DefaultSize[$obj.'T']['pdd'];
}
if( $obj=="L" ) $px = "=".$px;
}else if( $obj=='L' && $_COLSWIDTH[$i]=="" && !$_FieldsMix ){
if( $_DefaultSize[$obj.'T'][$edicion]<>"" ){
if( substr_count($px, '>')==1 || substr_count($px, '<')==1 || substr_count($px, '+')==1 ){
$px = $_DefaultSize[$obj.'T'][$edicion];
}
}else{
if( $edicion==strtoupper($edicion) ){
$px = $_DefaultSize[$obj.'C']['U']*$ancho;
}else{
$px = $_DefaultSize[$obj.'C']['L']*$ancho;
}
}
}else if( $obj=='T' ){
if( $_DefaultSize[$obj.'T'][$edicion]<>"" && substr_count($px, '/')==0 ){
if( substr_count($px, '>')==1 || substr_count($px, '<')==1 || substr_count($px, '+')==1 ){
$px = $px.'/'.$_DefaultSize[$obj.'T'][$edicion];
}
}
}
return array($px, $newDato, $align);
}
function _textContent($txt){
$New = ''; $Ok = true;
for($n=0; $n<strlen($txt); $n++){
$c = substr($txt,$n,1);
switch( $c ){
case '<':
$Ok = false;
break;
case '>':
$Ok = true;
break;
default:
if( $Ok ) $New .= $c;
}
}
return $New;
}
function CargaMacroField(){
global $_MacroField;
$Dim = file('../d/defaux.ini');
for( $n=0; $n<count($Dim); $n++ ){
list( $i, $v ) = explode( '|', $Dim[$n] );
if( trim($i)!='' ) $_MacroField[ trim($i) ] = trim($v);
}
}
function CalculaAncho($Tipo, $Ancho=NULL, &$Puntos=NULL){
global $_WidthField;
if( $_WidthField[0][$Tipo]>0 ){
$Puntos = $_WidthField[0][$Tipo];
}else if( $_WidthField[0][$Tipo.$Ancho]>0 ){
$Puntos = $_WidthField[0][$Tipo.$Ancho];
}else if( substr_count($Ancho, ',')>0 ){
list($i, $s, $long) = explode(',',$Ancho);
if( substr_count(':+:-:0:', ":{$Tipo}:")==1 ){
$iPuntos = $_WidthField[1][2] * $i + $_WidthField[1][3];
$sPuntos = $_WidthField[1][2] * $s + $_WidthField[1][3];
}else if( substr_count(':+,:-,:', ":{$Tipo}:" )==1 ){
$iPuntos = $_WidthField[1][2] * $i + $_WidthField[1][4];
$sPuntos = $_WidthField[1][2] * $s + $_WidthField[1][4];
}else{
if( $long>0 ){
$Puntos = $_WidthField[1][1] * $s;
}else{
$iPuntos = $_WidthField[1][1] * $i;
$sPuntos = $_WidthField[1][1] * $s;
$Puntos = $iPuntos.','.$sPuntos;
}
}
}else if( $Ancho<=$_WidthField[1][0] ){
if( substr_count($Tipo, ',')==1 ){
list($e, $d) = explode(',',$Ancho);
$p = floor(($e-1)/3)*($_WidthField[1][2]/2);
$Puntos = $_WidthField[1][4] + $_WidthField[1][2] * ($e+$d) + $p;
}else if( '0'==$Tipo || 'DC'==$Tipo ){
$Puntos = $_WidthField[1][3] + $_WidthField[1][2] * $Ancho;
}else if( substr_count('+-', $Tipo)==1 ){
$p = floor(($Ancho-1)/3)*($_WidthField[1][2]/2);
$Puntos = $_WidthField[1][3] + $_WidthField[1][2] * $Ancho + $p;
}else{
$Puntos = $_WidthField[1][3] + $_WidthField[1][1] * $Ancho;
}
}
}
function _CalcPxFields(&$Form){
global $_DefaultSize;
$Objeto = "T";
$p = "T";
if( $Form[3]=='T' || $Form[3][0]=='S' || $Form[3]=='[]' || $Form[3]=='[*]' ){
if( $Form[5]=='' ){
if( $Form[3][0]=="S" ){
$flecha = (($Objeto=='T') ? 10 : 0);
$margen = $_DefaultSize[$p.'T']['pdd'];
list($ac, $al) = explode(",", $Form[4]);
if( $al<>"" ){
$z = $_DefaultSize[$p.'C']['U'];
$Form[5] = ($z*$ac+$margen).",".($_DefaultSize[$p.'C']['U']*$al+$flecha+$margen);
}else{
$Form[5] = $_DefaultSize[$p.'C']['U']*$ac+$flecha+$margen;
}
if( $_ColsTrim ) $Form[5] = "";
}else if( $_DefaultSize[$p.'T'][$Form[2]]<>"" ){
if( $Form[2]=="H" ){
$Form[5] = $_DefaultSize[$p.'T'][$Form[2].$Form[4]];
}else{
$Form[5] = $_DefaultSize[$p.'T'][$Form[2]];
}
}else{
switch( $Form[2] ){
case '+':
$Form[5] = $Form[4]*$_DefaultSize[$p.'C']['N'];
$l = strlen(eNumberFormat(str_repeat("9",$Form[4]),0));
if( ($l-$Form[4])>0 ){
$Form[5] += $_DefaultSize[$p.'C']['uP']*($l-$Form[4]);
}
break;
case '-':
$Form[5] = $_DefaultSize[$p.'T']['uM'];
$Form[5] += $Form[4]*$_DefaultSize[$p.'C']['N'];
$l = strlen(eNumberFormat(str_repeat("9",$Form[4]-1),0));
if( ($l-$Form[4]-1)>0 ){
$Form[5] += $_DefaultSize[$p.'C']['uP']*($l-$Form[4]-1);
}
break;
case '+,':
list($m,$d) = explode(",",$Form[4]);
$Form[5] = $_DefaultSize[$p.'C']['uC'];
$Form[5] += ($m+$d)*$_DefaultSize[$p.'C']['N'];
$l = strlen(eNumberFormat(str_repeat("9",$m),0));
if( ($l-$m)>0 ){
$Form[5] += $_DefaultSize[$p.'C']['uP']*($l-$m);
}
break;
case '-,':
list($m,$d) = explode(",",$Form[4]);
$Form[5] = $_DefaultSize[$p.'T']['uM'] + $_DefaultSize[$p.'C']['uC'];
$Form[5] += ($m-1+$d)*$_DefaultSize[$p.'C']['N'];
$l = strlen(eNumberFormat(str_repeat("9",$m-1),0));
if( ($l-$m-1)>0 ){
$Form[5] += $_DefaultSize[$p.'C']['uP']*($l-$m-1);
}
break;
default:
if( !$_ColsTrim ){
$v = number_format($Form[4]*$_DefaultSize[$p.'C']['U'], 0, "","");
if( $_SESSION['factorZoom']>1 ){
if( $v<$_DefaultSize[$p.'T']["F4"] ){
$Form[5] = $v;
}else{
$Form[5] = '100%';
}
break;
}else{
$Form[5] = $v;
}
}
}
if( $Form[5]!="" && substr($Form[5],-1)!="%" ) $Form[5] += $_DefaultSize[$p.'T']['pdd'];
}
if( $Objeto=="L" ) $Form[5] = "=".$Form[5];
}else if( $Objeto!='L' ){
if( $_DefaultSize[$p.'T'][$Form[2]]<>"" && substr_count($Form[5], '/')==0 ){
if( substr_count($Form[5], '>')==1 || substr_count($Form[5], '<')==1 || substr_count($Form[5], '+')==1 ){
$Form[5] = $Form[5].'/'.$_DefaultSize[$p.'T'][$Form[2]];
}
}else if( $_SESSION['factorZoom']>1 && $Form[5]!="" ){
$txt = "";
$tmp2 = explode(",",$Form[5]);
for($n=0; $n<count($tmp2); $n++){
if( $txt!="" ) $txt .= ",";
$v = number_format($tmp2[$n]*$_SESSION['factorZoom'], 0, "","");
if( $v<$_DefaultSize[$p.'T']["F4"] ){
$txt .= $v;
}else{
$txt .= $tmp2[$n];
}
}
$Form[5] = $txt;
}else{
}
}
}else if( $Form[5]=="" && ($Form[3]=="A" || $Form[3]=="H") ){
list(,$m) = explode(",", $Form[4]);
if( trim($m)!="" ){
$Form[5] = $_DefaultSize[$p.'C']['L']*$m;
if( $Objeto=="L" ) $Form[5] = "=".$Form[5];
}
}
}
function NombreCampo($tmp){
if( substr_count($tmp, ':')>0 ){
$tmp = substr($tmp, 0, strpos($tmp,':'));
}else if( substr_count($tmp, '{')>0 ){
$tmp = substr($tmp, 0, strpos($tmp,'{'));
}else if( substr_count($tmp, ' as ')>0 ){
list(,$tmp) = explode(" as ",$tmp);
}
return trim($tmp);
}
function EnPlural($Titulo, $Delante, $EnPlural, $oTitulo='', $EsSubTit=false){
if( !$EsSubTit ){
if( $Titulo=='' && $oTitulo=='' ) return '';
if( $Titulo[0]=='#' ) $Titulo = trim(substr($Titulo,1));
if( $oTitulo[0]=='#' ) $oTitulo = trim(substr($oTitulo,1));
if( $Titulo!=$oTitulo && $Titulo[0]!='=' ) $Titulo = '='.$Titulo;
}
if( $GLOBALS["_OPTIONSINLISTALL"] ) $Delante = "GESTIÓN #";
$Delante = str_replace('&#47;','{{47}}', $Delante );
$Titulo = str_replace('&#47;','{{47}}', $Titulo );
if( $Titulo[0]=='<' && strpos($Titulo, '>')>0 && $Delante!='' ){
$p = strpos($Titulo, '>');
$Delante = substr($Titulo,0,$p+1).$Delante;
$Titulo = substr($Titulo,$p+1);
}
if( $Titulo[0]=='=' ){
$Titulo = substr($Titulo,1);
}else{
if( preg_match_all("/[\[\]]/", $Titulo, $matches)==2 ){
preg_match('~\[(.*?)\]~', $Titulo, $output);
if( $output[1]!="ICON" ){
$Titulo = str_replace($output[0], eIcon($output[1]), $Titulo);
}
}else if( substr_count($Titulo,'#')>0 ){
$Titulo = str_replace('#', $Titulo, $Delante);
}
}
if( $Titulo[0]=='$' ){
$Titulo = $GLOBALS[substr($Titulo,1)];
}
while( substr_count($Titulo,'{$')>0 ){
$p = strpos( $Titulo, '{$' );
$tmp = substr($Titulo,$p,strpos($Titulo, '}')-$p+1);
$Titulo = str_replace($tmp, $GLOBALS[substr($tmp,2,-1)], $Titulo);
}
if( preg_match_all("/[\{\}]/", $Titulo, $matches)==2 ){
preg_match('~\{(.*?)\}~', $Titulo, $output);
if( $output[1]!="ICON" ){
$Titulo = str_replace($output[0], eIcon($output[1]), $Titulo);
}
}
if( substr_count($Titulo, chr(92).'/')>0 ){
$Titulo = str_replace(chr(92).'/',"&#47;/",$Titulo);
}
if( substr_count($Titulo, '/')>0 ){
$c = strpos(strtoupper($Titulo), 'SRC=');
if( $c!==false ){
$i = strrpos(substr($Titulo,0,$c), '<');
$f = strpos($Titulo, '>', $c);
if( $i!==false && $f!==false ){
$xi = substr($Titulo,0,$i);
$xc = substr($Titulo,$i,$f-$i+1);
$xf = substr($Titulo,$f+1);
$xc = str_replace('/', '&#47;', $xc) ;
$Titulo = $xi.$xc.$xf;
}
}
$sTitulo = '';
$sc = '';
if( $EnPlural ){
for( $i=0; $i<strlen($Titulo); $i++ ){
$c = substr( $Titulo,$i, 1 );
if( !($sc!='<' && $c=='/') ) $sTitulo .= $c;
$sc = $c;
}
}else{
$Mem = true;
for( $i=0; $i<strlen($Titulo); $i++ ){
$c = substr( $Titulo,$i, 1 );
if( $sc!='<' && $c=='/' ){
$Mem = false;
}else if( substr_count(' .,:;()',$c)>0 ){
$Mem = true;
}
if( $Mem ) $sTitulo .= $c;
$sc = $c;
}
}
$Titulo = $sTitulo;
$Titulo = str_replace('&#47;', '/', $Titulo);
}
$sTitulo = $Titulo;
$Titulo = '';
$ok = true;
for($i=0; $i<strlen($sTitulo); $i++){
$c = substr($sTitulo,$i, 1);
if( $c=='<' && $ok ){
$ok = false;
}else if( $c=='>' && !$ok ){
$ok = true;
}else if( $ok ){
if( $c==' ' ) $c = '&nbsp;';
}
$Titulo .= $c;
}
$Titulo = str_replace('{{47}}','&#47;', $Titulo );
$Titulo = preg_replace('/<br>/i', "<BR>", $Titulo);
if( $Titulo[0]=="=" ) $Titulo = substr($Titulo,1);
return $Titulo;
}
function GenVentanas( $SubVentana ){
global $__Lng;
$txt  = 'var _SubVentana = new Array(';
$txt1 = 'var _cSubVentana = new Array(';
for( $n=0; $n<count($SubVentana); $n++ ){
if( $n>0 ){
$txt .= ',';
$txt1 .= ',';
}
$txt .= "'{$SubVentana[$n]}'";
$txt1.= "''";
echo "<IFRAME id='_{$SubVentana[$n]}IFRAME' FRAMEBORDER=0px style='z-index:9; height:100px; width:100px; display:none; position:absolute; left:0px; top:0px;'></iframe>";
echo "<DIV id='_{$SubVentana[$n]}' class=SubWin style='z-index:10; height:1px; width:1px; display:none; position:absolute; left:0px; top:0px;' dragON onkeydown='eClearEvent()'>";
echo "<table cellspacing=0px cellpadding=0px style='border-collapse:collapse;'>";
echo "<tr>";
echo "<th nowrap onmousedown='vDown()'>";
echo "<CENTER id='_{$SubVentana[$n]}Titulo' style='cursor:pointer'></CENTER>";
echo '<th width="1px" align="right" s_tyle="background:#FF00FF;">';
echo "<IMG SRC='g/swclose.gif' onclick='DGI(\"_{$SubVentana[$n]}IFRAME\").style.display=\"none\";DGI(\"_{$SubVentana[$n]}\").style.display=\"none\";' title=".'"'.$__Lng[25].'">';
echo "<tr>";
echo "<td colspan=2>";
echo "<DIV id='{$SubVentana[$n]}'></DIV>";
echo "</table>";
echo "</DIV>";
}
$txt .= ");";
$txt1.= ");";
eJS($txt.$txt1);
}
function TrimRelationFields(){
global $_RELATIONFIELDS;
for( $i=0; $i<count($_RELATIONFIELDS); $i++ ){
if( substr_count($_RELATIONFIELDS[$i],'{')==0 ){
$_RELATIONFIELDS[$i] = str_replace( ' ', '', $_RELATIONFIELDS[$i] );
}else{
$Constante = false;
$EsLlave = false;
$NewCadena = '';
for( $n=0; $n<strlen($_RELATIONFIELDS[$i]); $n++ ){
$c = substr($_RELATIONFIELDS[$i],$n,1 );
if( $c=='"' || $c=="'" ) $Constante = !$Constante;
if( $c=='{' ) $EsLlave = true;
if( !$Constante ){
if( $EsLlave ){
if( $c=='{' ) $c = '[';
if( $c=='}' ){
$c = ']';
$EsLlave = false;
}
if( $c==',' ) $c = ':';
}
if( $c!=' ' ) $NewCadena .= $c;
}else{
$NewCadena .= $c;
}
}
$_RELATIONFIELDS[$i] = $NewCadena;
}
}
}
function _CalcAncho($Campo, $Valor){
global $_CalcularAnchos;
if( substr_count($Valor, ',')>0 ){
list($Valor,$ValorL) = explode(',',$Valor);
if( substr($Campo,0,7)=='_INPUT_' ) $Valor = $ValorL;
}
if( substr($Valor,-1)=="%" ) return  "width:{$Valor};";
return  "width:{$Valor}px;";
}
function eAddField($Def, $Valor='', $AddOption=''){
global $Opcion, $_Form, $_LineForm, $_ReorderForm, $_gsObjeto, $__Lng, $_PHPFORMIN, $Objeto, $_vF, $_ADDCODE, $_MemorizeFields, $_DEFAUX;
$_MemorizeFields = true;
$DimCampo = explode('|', $Def);
for($n=0; $n<count($DimCampo); $n++) $DimCampo[$n] = trim($DimCampo[$n]);
if( $DimCampo[_OFIELD]=='' ) $DimCampo[_OFIELD] = $DimCampo[_FIELD];
if( $_gsObjeto=='L' ){
if( $DimCampo[0]=='-' ) return;
list($DimCampo[0], $MsgList, $MsgError) = explode(chr(92), $DimCampo[0].chr(92).chr(92));
if( substr($Opcion,-1)=='l' && $_gsObjeto=='L' ){
$DimCampo[0] = str_replace('·', '<br>', $DimCampo[0]);
$MsgList = str_replace('·', '<br>', $MsgList);
if( $MsgList!='' ){
global $_TIPTH;
if( $_TIPTH[count($_Form)]=='' ){
$DimCampo[0] = str_replace('<br>', ' ', $DimCampo[0]);
if( strip_tags($DimCampo[0])!=$DimCampo[0] ) $DimCampo[0] = _textContent($DimCampo[0]);
$_TIPTH[count($_Form)] = $DimCampo[0];
$DimCampo[0] = $MsgList;
}
}
}
$_Form[] = $DimCampo;
global $_Field, $_pField, $PDF_Formato, $_pF, $_PDFTH, $_ALIGN, $_FORMAT;
$nf = count($_Form)-1;
$_Field[$_Form[$nf][1]] = true;
$_pField[$_Form[$nf][1]] = $_Form[$nf];
if( $_Form[$nf][1]=='_gs_formato_' && $_Form[$nf][7]=='P' ) $PDF_Formato = 'L';
$_pF[$_Form[$nf][1]] = count($_Form)-1;
$_PDFTH[$nf] = $_Form[$nf][0];
if( $DimCampo[2][0]=='+' || $DimCampo[2][0]=='-' ){
$tmp = explode(',',$DimCampo[4]);
$_ALIGN[$nf] = ' id=d';
$_FORMAT[$nf] = "eNumberFormat(#,".(int)$tmp[1].")";
}
return;
}
if( $Opcion=='l' && $Objeto=='L' ){
$DimCampo[0] = str_replace('·', '<br>', $DimCampo[0]);
}else{
$DimCampo[0] = str_replace('·', ' ', $DimCampo[0]);
}
if( strtoupper($DimCampo[3])=='F' || strtoupper($DimCampo[3])=='R' ) return '[NO:'.$DimCampo[1].']';
$DimCampo[_STATUS] = 'E';
if( substr_count('bcmsq',$Opcion)>0 || ($Opcion=='l') ){
if( substr_count($DimCampo[6], 'Q')>0 ){
if(      substr_count($DimCampo[6], '*Q')>0 ) $DimCampo[_STATUS] = 'I';
else if( substr_count($DimCampo[6], '-Q')>0 ) $DimCampo[_STATUS] = 'V';
else if( $_NOEDIT[$DimCampo[_OFIELD]]!='' )  $DimCampo[_STATUS] = 'V';
}elseif( substr_count('bcmsq',$Opcion)>0 ) return;
}else{
if(      substr_count($DimCampo[6], '*Q*')>0 ) $DimCampo[_STATUS] = 'I';
else if( substr_count($DimCampo[6], '-Q-')>0 ) $DimCampo[_STATUS] = 'V';
else if( substr_count($DimCampo[6],  'Q*')>0 ) $DimCampo[_STATUS] = 'I';
else if( substr_count($DimCampo[6],  'Q-')>0 ) $DimCampo[_STATUS] = 'V';
else if( substr_count($DimCampo[6], '*Q')>0 ) $DimCampo[_STATUS] = $DimCampo[_STATUS];
else if( substr_count($DimCampo[6], '-Q')>0 ) $DimCampo[_STATUS] = $DimCampo[_STATUS];
else if( substr_count($DimCampo[6], '*' )>0 ) $DimCampo[_STATUS] = 'I';
else if( substr_count($DimCampo[6], '-' )>0 ) $DimCampo[_STATUS] = 'V';
if( $DimCampo[_STATUS]!='I' ){
if( $Opcion<>'a' && substr_count($DimCampo[6], 'A')>0 ) $DimCampo[_STATUS] = 'V';
}
}
if( $DimCampo[_STATUS]<>'I' ){
if( substr_count(',cR,bR,', ",{$Opcion},")>0 ) $DimCampo[_STATUS] = 'V';
}
if( $Valor=='' ) $Valor = $_vF[$DimCampo[1]];
$DimCampo[_TAB] = (($_gsObjeto=='F') ? 1 : $GLOBALS['TotalFRM']);
$DimCampo[_OFIELD] = $DimCampo[1];
$DimCampo[_ALIAS] = '';
$DimCampo[_SQL] = '';
$DimCampo[_VALUE] = $Valor;
$NomCampo = $DimCampo[1];
$NomSql = '';
if( $DimCampo[0]=='-' || strtoupper($DimCampo[0])=='{TAB}' ){
}else if( strtoupper(substr($DimCampo[0],0,10))=='{ISUBLIST}' ){
$DimCampo[10] = $nHoja;
}else if( substr_count( $NomCampo, ':' )>0 ){
list( $NomCampo, $NomSql ) = explode( ':', str_replace(' ','',$NomCampo) );
$NomTabla = substr($NomSql,3);
if( strpos($_LanguageTables,",{$NomTabla},")===false ){
$DimCampo[_SQL] = $NomTabla.',cd_'.$NomTabla.',nm_'.$NomTabla;
}else{
$DimCampo[_SQL] = $NomTabla.',cd_'.$NomTabla.',nm_'.$NomTabla.'_'.$_SESSION['_LANGUAGE_'];
}
}else if( substr_count( $NomCampo, '{' )==1 ){
list( $NomCampo, $NomSql ) = explode( '{', $NomCampo );
$NomCampo = trim($NomCampo);
list( $NomSql ) = explode( '}', $NomSql );
if( strpos($_LanguageTables,",{$NomTabla},")===false ){
$DimCampo[_SQL] = trim($NomSql);
}else{
$DimCampo[_SQL] = trim($NomSql).'_'.$_SESSION['_LANGUAGE_'];
}
}else if( substr($NomCampo,0,3)=='cd_' ){
$NomTabla = substr($NomCampo,3);
if( strpos($_LanguageTables,",{$NomTabla},")===false ){
$DimCampo[_SQL] = $NomTabla.',cd_'.$NomTabla.',nm_'.$NomTabla;
}else{
$DimCampo[_SQL] = $NomTabla.',cd_'.$NomTabla.',nm_'.$NomTabla.'_'.$_SESSION['_LANGUAGE_'];
}
}
$NomCampo = trim($NomCampo);
if( $DimCampo[0]=='{TAB}' ){
}else if( $DimCampo[0][0]!='-' && substr_count( $NomCampo, ' ' )>1 ){
$NomCampo = str_replace( '  ',' ',trim($NomCampo));
if( substr_count( $NomCampo, ' as ' )>1 ){
list( $DimCampo[_OFIELD], $CampoAlias ) = explode( ' as ', $NomCampo );
}else{
list( $DimCampo[_OFIELD], $CampoAlias ) = explode( ' ', $NomCampo );
}
$DimCampo[_ALIAS] = $CampoAlias;
$NomCampo = $DimCampo[_OFIELD];
}else{
$DimCampo[_OFIELD] = $NomCampo;
$CampoAlias = $NomCampo;
}
if( $DimCampo[3]=='SV' && $AddOption!='' ){
global $_ADDOPTION;
if( function_exists($AddOption) ){
$_ADDOPTION[ $DimCampo[1] ] = $AddOption.'()';
}else{
$_ADDOPTION[ $DimCampo[1] ] = $AddOption;
}
}else if( $DimCampo[3]=='F' && $AddOption!='' ){
global $_Fichero, $_UPLOADFILE;
$tmp = explode('|', $DimCampo[1].'|'.$AddOption);
for($n=0; $n<count($tmp); $n++) $tmp[$n] = trim($tmp[$n]);
array_push($_Fichero, $tmp[0]);
$uNomFile = $tmp[0];
$_UPLOADFILE[$uNomFile]['oDIR'] = $tmp[1];
$tmp[1] = eScript( $tmp[1] );
$_UPLOADFILE[$uNomFile]['DIR'] = $tmp[1];
$_UPLOADFILE[$uNomFile]['NOMBRE'] = $tmp[2];
$_UPLOADFILE[$uNomFile]['BYTS'] = $tmp[3];
$_UPLOADFILE[$uNomFile]['TITLE'] = (($tmp[4]=='') ? $__Lng[26] : $tmp[4] );
if( $tmp[5]!='' ) $_UPLOADFILE[$uNomFile]['EXT'] = str_replace(' ','',$tmp[5]);
$_UPLOADFILE[$uNomFile]['PREFIJO'] = $tmp[6];
$_UPLOADFILE[$uNomFile]['TAMAÑOS'] = $tmp[7];
$_UPLOADFILE[$uNomFile]['PREFIJOS'] = $tmp[8];
if( $tmp[9]!='' ){
if( substr($tmp[9],-1)=='/' ) $tmp[9] = substr($tmp[9],0,-1);
$_UPLOADFILE[$uNomFile]['COPY'] = eScript($tmp[9]);
}
}
global $_Field, $_pField, $PDF_Formato, $_pF, $_PDFTH, $_ALIGN, $_FORMAT;
$Fila2[$DimCampo[1]] = $Valor;
$_ReorderForm[] = array($_LineForm+1, count($_Form));
if( !$_PHPFORMIN ){
$_Form[] = $DimCampo;
$tmp = NombreCampo($DimCampo[1]);
$_Field[$tmp] = true;
$_pField[$tmp] = $DimCampo;
}else{
global $DimForm;
$DimForm[$DimCampo[1]] = $DimCampo;
}
if( strtoupper($DimCampo[1])=='ACTION' ) eMessage('Nombre de campo no permitido "action"', 'HSE');
list($sCampo) = explode('{', $DimCampo[1]);
list($sCampo, $sReal) = explode(':', $sCampo);
if( $DimCampo[3]=='H' ) $GLOBALS['_ConED'] = true;
global $_NOEDITFILLEDSESSION, $_NOEDIT, $_NOEDITFILLEDFIELD, $_DEFAULT;
$_y2s = date('Y-m-d H:i:s');
switch( $DimCampo[7] ){
case '#today#': $DimCampo[7] = eDataFormat(date('Y-m-d'), "F4"); break;
case '#y2m#': $DimCampo[7] = eDataFormat(date('Y-m'), "P4"); break;
case '#clock#':
$DimCampo[7] = substr($_y2s,11,$DimCampo[4]);
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Cache-Control: no-cache, must-revalidate");
break;
case '#sy2s#':
$DimCampo[7] = '>'.eDataFormat(date('Y-m-d 00:00:00'), "CDI"); break;
if( $Opcion!='a' && $Opcion!='A' ) break;
case '#y2s#':
$DimCampo[7] = $_y2s;
header("Expires: Mon, 18 May 1959 03:00:00 GMT");
header("Cache-Control: no-cache, must-revalidate");
break;
case '#default#': $_DEFAULT[] = 'default_'.$DimCampo[1]; $DimCampo[7] = ''; break;
default:
if( substr_count( $DimCampo[7], '\\' )==1 ){
list( $t, $c ) = explode( '\\',$DimCampo[7]);
if( substr_count( ',c,cR,', ",{$Opcion}," )==1 ){
$DimCampo[7] = trim($c);
}else{
$DimCampo[7] = trim($t);
}
}
if( substr($DimCampo[7],0,1)=='_' ){
$EsVarSesion = isset($_SESSION[$DimCampo[7]]);
$DimCampo[7] = $_SESSION[ $DimCampo[7] ];
if( $_NOEDITFILLEDSESSION && trim($DimCampo[7])!='' ){
if( $EsVarSesion ){
$DimCampo[_STATUS] = 'V';
$_NOEDIT[$sCampo] = 1;
if( $Opcion=='a' ){
if( $_SESSION['_InsertToSeek']!='' ) $_SESSION['_InsertToSeek'] .= ',';
$_SESSION['_InsertToSeek'] .= $sCampo;
}
}
}
}else if( substr($DimCampo[7],0,1)=='$' ){
$DimCampo[7] = @eval( 'return '.$DimCampo[7].';' );
}else if( substr($DimCampo[7],0,1)=='>' ){
$DimCampo[7] = @eval( 'return '.substr($DimCampo[7],1).';' );
}
}
if( $_NOEDITFILLEDFIELD[$DimCampo[_OFIELD]] ){
if( $DimCampo[7]!='' ){
$_NOEDIT[$DimCampo[_OFIELD]] = 1;
$DimCampo[_STATUS] = 'V';
if( $Opcion=='a' ){
if( $_SESSION['_InsertToSeek']!='' ) $_SESSION['_InsertToSeek'] .= ',';
$_SESSION['_InsertToSeek'] .= $DimCampo[_OFIELD];
}
}else{
unset( $_NOEDIT[$DimCampo[_OFIELD]] );
}
}
if( $DimCampo[7]<>'' && substr_count('bcmsqa', $Opcion)>0 ) $Valor = $DimCampo[7];
$Rastro = debug_backtrace();
if( strtolower($Rastro[2]['function'])=='gencontroles' ){
$sLineForm = $_LineForm;
if( $DimCampo[5]=='' ){
$xAncho = '';
_CalcPxFields($DimCampo);
}
$SoloSelect = false;
GenControl($DimCampo, $Valor, $Opcion, 1, $Fila2, $_Form, 1, -2, $SoloSelect, true);
echo $__Enter;
$_LineForm = $sLineForm;
}
if( $_ADDCODE[$NomCampo]['A']!='' ){
if( substr($_ADDCODE[$NomCampo]['A'],-1)==')' && strpos($_ADDCODE[$NomCampo]['A'],'(')>0 ){
$txt = _ExeEval($_ADDCODE[$NomCampo]['A'], '[AddCode] '.$Opcion.' | '.$NomCampo.' | A |'.$_ADDCODE[$NomCampo]['A']);
if( strip_tags($txt)==$txt ){
echo "<label for={$sNomField} id=LE>".$txt.'</label>';
}else{
echo $txt;
}
}else{
if( strip_tags($_ADDCODE[$NomCampo]['A'])==$_ADDCODE[$NomCampo]['A'] ){
echo "<label for={$sNomField} id=LE>".$_ADDCODE[$NomCampo]['A'].'</label>';
}else{
echo $_ADDCODE[$NomCampo]['A'];
}
}
}
}
function eImgClipping($oImg, $nImg, $x, $y, $Ancho, $Alto){
$origen = _eImgOpen( $oImg );
$destino = imageCreateTrueColor( $Ancho, $Alto );
imageCopy( $destino, $origen, 0, 0, $x, $y, $Ancho, $Alto );
_eImgSave( $destino, $nImg );
imageDestroy($destino);
imageDestroy($origen);
}
function eImgWatermark($Img, $Estampa){
$estampa = imageCreateFromPNG($Estampa);
$im = imageCreateFromJPEG($Img);
$margen_dcho = 10;
$margen_inf = 10;
$sx = imageSX($estampa);
$sy = imageSY($estampa);
imageCopy($im, $estampa, imagesx($im) - $sx - $margen_dcho, imagesy($im) - $sy - $margen_inf, 0, 0, imagesx($estampa), imagesy($estampa));
header('Content-type: image/png');
imagePNG($im);
imageDestroy($im);
}
function eImgResize($oImg, $nImg, $nAncho, $nAlto=0){
ini_set('memory_limit','128M');
$fuente = _eImgOpen($oImg);
if( $fuente===false ){
$Ext = explode('.',$nImg); $Ext = $Ext[count($Ext)-1];
$File = substr($GLOBALS['__DIR__'],0,-4).'_datos/config/no_img.'.$Ext;
if( file_exists($File) ){
copy($File, $nImg);
}else{
$fuente = imagecreatetruecolor(150,150);
$fondo = imagecolorallocate($fuente, 255, 255, 255);
$ct = imagecolorallocate($fuente, 0, 0, 0);
imagefilledrectangle($fuente, 0, 0, 150, 150, $fondo);
imagestring($fuente, 1, 5, 5, 'Error cargando... ', $ct);
_eImgSave($fuente, $nImg);
imageDestroy($oImg);
imageDestroy($nImg);
}
return;
}
$oAncho = imageSX($fuente);
$oAlto = imageSY($fuente);
if( substr_count(strtoupper($nAncho),'MAX')>0 ){
$nAncho = str_replace('MAX','',strtoupper($nAncho)) * 1;
$nH = ($oAlto*$nAncho)/$oAncho;
if( $nH<=$nAncho ){
$nAncho = '';
$nAlto = $nH;
}else{
$nW = ($nAncho*$oAncho)/$oAlto;
$nAncho = $nW;
$nAlto = '';
}
}else if( substr_count($nAncho,'%')>0 ){
$x = str_replace(",",".",$nAncho)*1;
$nAncho = $oAncho*$x/100;
$nAlto = $oAlto*$x/100;
}
if( $nAlto=='' ){
$nAlto = ($oAlto*$nAncho)/$oAncho;
}else if( $nAncho=='' ){
$nAncho = ($nAlto*$oAncho)/$oAlto;
}
$x = $y = 0;
if( ($oAncho/$nAncho)<($oAlto/$nAlto) ){
$y = ($oAlto-($nAlto*($oAncho/$nAncho)) )/2;
if( $y<0 ) $y *= -1;
}else{
$x = ($oAncho-($nAncho*($oAlto/$nAlto)) )/2;
if( $x<0 ) $x *= -1;
}
if( $oAncho<$nAncho && $oAlto<$nAlto ){
$imagen = imageCreateTrueColor($oAncho, $oAlto);
$fondo = imagecolorallocate($imagen, 255, 255, 255);
imagefilledrectangle($imagen, 0, 0, $oAncho, $oAlto, $fondo);
ImageCopyResized($imagen, $fuente, 0,0, 0,0, $oAncho,$oAlto, $oAncho,$oAlto);
}else{
$imagen = imageCreateTrueColor($nAncho, $nAlto);
ImageCopyResized($imagen, $fuente, 0,0, $x,$y, $nAncho,$nAlto, $oAncho-($x*2),$oAlto-($y*2));
}
if( file_exists($nImg) ) @unlink($nImg);
_eImgSave($imagen, $nImg);
imageDestroy($oImg);
imageDestroy($nImg);
}
function _FileGetContents($Opcion){
global $_IdRegistro, $_DBTABLE, $_DBSERIAL, $_UPLOADFILE, $_Development, $_FILELOG;
if( isset($_POST['_eFilePutAsync_']) ) return;
if( function_exists('eBeforeUploadFile') ) eBeforeUploadFile();
$nf = 0;
$tmp = explode('|', $_POST["_FIELDSWITHFILES"]);
for($n=0; $n<count($tmp)-1; $n++){
if( $_POST[$tmp[$n]]!='' ){
$FileTmp = '../_tmp/zip/'.$_SESSION['_User'].'_'.$nf;
$nf++;
$NewFile = '../_tmp/zip/'.$_SESSION['_User'].'_'.rand(1,9999);
@unlink($NewFile);
rename($FileTmp, $NewFile);
$FileTmp = $NewFile;
$xNomFile = strtolower($_POST[$tmp[$n]]);
$NomExt = substr($xNomFile, strrpos($xNomFile,'.'));
if( $_UPLOADFILE[$tmp[$n]]['NOMBRE']!=$tmp[$n] ){
if( substr($_UPLOADFILE[$tmp[$n]]['NOMBRE'],-1)==')' && strpos($_UPLOADFILE[$tmp[$n]]['NOMBRE'],'(')>0 ){
$xNomFile = eval('return '.$_UPLOADFILE[$tmp[$n]]['NOMBRE'].';');
}else if( $_DBSERIAL[1]==$_UPLOADFILE[$tmp[$n]]['NOMBRE'] ){
if( $Opcion=='A' ){
$xNomFile = $_IdRegistro[$_DBTABLE].$NomExt;
}else{
$xNomFile = $_POST[$_UPLOADFILE[$tmp[$n]]['NOMBRE']].$NomExt;
}
}else{
if( $tmp[$n]==$_UPLOADFILE[$tmp[$n]]['NOMBRE'] ){
$xNomFile = strtolower($_POST[$tmp[$n]]);
$NomExt = substr($xNomFile,strrpos($xNomFile,'.'));
$SoloNomFile = substr($xNomFile,0,strrpos($xNomFile,'.'));
}else{
$xNomFile = $_POST[$_UPLOADFILE[$tmp[$n]]['NOMBRE']].$NomExt;
$xNomFile = strtolower($xNomFile);
}
}
}
$xxNomFile = $xNomFile;
$xNomFile = _NmFileConPrefijo($xNomFile, $_UPLOADFILE[$tmp[$n]]['PREFIJO']);
if( $_UPLOADFILE[$tmp[$n]]['NOMBRE'][0]=='=' ) $xNomFile = trim(substr($_UPLOADFILE[$tmp[$n]]['NOMBRE'],1));
if( substr_count($_UPLOADFILE[$tmp[$n]]['DIR'], '!')>0 ) $_UPLOADFILE[$tmp[$n]]['DIR'] = eSplitPath( $xNomFile, $_UPLOADFILE[$tmp[$n]]['DIR'] );
if( substr_count($_UPLOADFILE[$tmp[$n]]['DIR'].'/', '/crypt/')>0 ){
_CheckDir($_UPLOADFILE[$tmp[$n]]['DIR']);
$oFile = '../_tmp/zip/'.$xNomFile;
@unlink($oFile);
rename($FileTmp, $oFile);
$dFile = '../_tmp/zip/'.$xNomFile.'.zip';
list($Clave, $Ext) = _UnPath($_UPLOADFILE[$tmp[$n]]['DIR'].'/'.$xNomFile);
$Clave = md5($Clave);
@unlink($dFile.'.zip');
@unlink($dFile.'.'.$Ext);
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ){
$ExeZip = "zip -9 -P {$Clave} -j ".$dFile." ".$oFile;
}else{
$ExeZip = eScript('$win/zip.exe')." -9 -P {$Clave} -j ".$dFile." ".$oFile;
}
$Dim = array();
exec($ExeZip, $Dim);
@unlink($oFile);
$FileTmp = $dFile;
$df = fopen($FileTmp, 'r+');
fwrite($df, chr(rand(48,127)).chr(rand(48,127)));
fclose($df);
}
if( $_FILELOG[$_DBTABLE.".".$tmp[$n]] ){
_CheckDir($_SESSION['LogPathFileVersion']);
_FileToLog([
tabla		=> $_DBTABLE,
campo		=> $tmp[$n],
numCopias	=> $_FILELOG[$_DBTABLE.".".$tmp[$n]][4],
prefijo		=> $_UPLOADFILE[$tmp[$n]]['PREFIJO'],
dir			=> $_UPLOADFILE[$tmp[$n]]['DIR'],
valPk		=> $_FILELOG[$_DBTABLE][ $_UPLOADFILE[$tmp[$n]]['NOMBRE'] ],
valNomFile	=> $_FILELOG[$_DBTABLE][ $_FILELOG[$_DBTABLE.".".$tmp[$n]][1] ],
valCdi		=> $_FILELOG[$_DBTABLE][ $_FILELOG[$_DBTABLE.".".$tmp[$n]][2] ],
valUser		=> $_FILELOG[$_DBTABLE][ $_FILELOG[$_DBTABLE.".".$tmp[$n]][3] ]
]);
}
$_FILES[$tmp[$n]]['name'] = $_UPLOADFILE[$tmp[$n]]['DIR'].'/'.$xNomFile;
_CheckDir($_UPLOADFILE[$tmp[$n]]['DIR']);
if( !copy($FileTmp, $_UPLOADFILE[$tmp[$n]]['DIR'].'/'.$xNomFile) ){
$tmpError = '';
if( $_Development || $_SESSION['_D_']!='' ) $tmpError = '<br>'.$FileTmp.' -> '.$_UPLOADFILE[$tmp[$n]]['DIR'].'/'.$xNomFile;
eMessage(str_replace('#',$tmpError,$__Lng[92]), 'EHS', '', '', 'FNS');
}
if( $_UPLOADFILE[$tmp[$n]]['COPY']!='' ){
_CheckDir($_UPLOADFILE[$tmp[$n]]['COPY']);
copy($FileTmp, $_UPLOADFILE[$tmp[$n]]['COPY'].'/'.$xNomFile);
}
if( $_UPLOADFILE[$tmp[$n]]['TAMAÑOS']!='' ){
$iTamayo = explode(',', $_UPLOADFILE[$tmp[$n]]['TAMAÑOS']);
$iPrefijos = explode(',', $_UPLOADFILE[$tmp[$n]]['PREFIJOS']);
for($i=0; $i<count($iTamayo); $i++){
$iTamayo[$i] = trim($iTamayo[$i]);
$iPrefijos[$i] = trim($iPrefijos[$i]);
if( $iPrefijos[$i]=='' ) $iPrefijos[$i] =  $_UPLOADFILE[$tmp[$n]]['PREFIJO'];
}
$xPre=0;
for($i=0; $i<count($iTamayo); $i+=2){
$NuevaImg = $_UPLOADFILE[$tmp[$n]]['DIR'].'/'._NmFileConPrefijo($xxNomFile, $iPrefijos[$xPre]);
eImgResize($_UPLOADFILE[$tmp[$n]]['DIR'].'/'.$xNomFile, $NuevaImg, $iTamayo[$i], $iTamayo[$i+1]);
if( $_UPLOADFILE[$tmp[$n]]['COPY']!='' ) copy($NuevaImg, $_UPLOADFILE[$tmp[$n]]['COPY'].'/'._NmFileConPrefijo($xxNomFile, $iPrefijos[$xPre]));
$xPre++;
}
}
@unlink($FileTmp);
}
}
}
function _RecuperaFileSetup($file){
global $_UPLOADFILE, $_FILELOG;
$_User = $_SESSION["_User"];
$filePField = '../_tmp/php/'.str_replace('/','_',trim($file)).".{$_User}.snt";
list($c_pField, $c_CHR, $c_EACCENT, $c_UPLOADFILE, $c_FILELOG, $c_DBRANGEINSERT) = unserialize(file_get_contents($filePField));
foreach($c_UPLOADFILE as $k=>$v){
$_UPLOADFILE[$k] = $v;
}
foreach($c_FILELOG as $k=>$v){
$_FILELOG[$k] = $v;
}
}
function _FileToLog($p){
global $_IdRegistro, $_Sql;
$test = false;
$tabla		= $p["tabla"];
$campo		= $p["campo"];
$numCopias	= $p["numCopias"];
$prefijo	= $p["prefijo"];
$dir		= eScript($p["dir"]);
$valPk		= $p["valPk"];
$valNomFile	= $p["valNomFile"];
$valCdi		= $p["valCdi"];
$valUser	= $p["valUser"];
$logTabla	= $tabla;
$logField	= $campo;
$logCopias	= $numCopias;
$logPk		= $valPk;
$logNomFile	= str_replace(array("'",'"'), array("",""), $valNomFile);
$logUser	= $valUser;
$logCdi = $valCdi;
eExplodeOne($logNomFile, ".", $no, $logExt);
$logExt = trim($logExt);
$logFileOrigen = $dir.'/'.$prefijo.$logPk.'.'.$logExt;
$logSize = filesize($logFileOrigen);
$logCdiLog = date('Y-m-d H:i:s');
$logUserLog = $_SESSION["_User"];
if( $logSize==0 ) return;
$logSql = "insert into gs_log_doc values (0,'{$logTabla}','{$logField}','{$logPk}','{$logNomFile}','{$logExt}','{$logSize}','{$logCdi}','{$logUser}','{$logCdiLog}','{$logUserLog}')";
qQuery($logSql);
if($test){
eInit();
eTrace("");
eTrace("logTabla: ".$logTabla);
eTrace("logField: ".$logField);
eTrace("logPk: ".$logPk);
eTrace("logCopias: ".$logCopias);
eTrace("-----------------------------");
eTrace("logNomFile: ".$logNomFile);
eTrace("logExt: ".$logExt);
eTrace("logCdi: ".$logCdi);
eTrace("logSize: ".$logSize);
eTrace("logFileOrigen: ".$logFileOrigen);
eTrace("logUser: ".$logUser);
eTrace("-----------------------------");
eTrace("directorio: ".$dir);
eTrace("prefijo: ".$prefijo );
eTrace("-----------------------------");
eTrace("logCdiLog: ".$logCdiLog);
eTrace("logUserLog: ".$logUserLog);
}
$logFileDestino = eScript($_SESSION["LogPathFileVersion"]).'/'.$_IdRegistro['gs_log_doc'].'.'.$logExt;
if($test){
eTrace("cd_gs_log_doc: ".$_IdRegistro['gs_log_doc']);
eTrace("logFileDestino: ".$logFileDestino);
eTrace("-----------------------------");
eTrace($logFileOrigen.' > '.$logFileDestino);
}
copy($logFileOrigen, $logFileDestino);
if( $logCopias>0 ){
$logBAK = qCount("gs_log_doc", "dbtable='{$logTabla}' and nm_field='{$logField}' and pk='{$logPk}'");
if($test)eTrace("logBAK: ".$logBAK.' > '.$logCopias);
if( $logBAK>$logCopias ){
$logKill = "";
$logSql = "select cd_gs_log_doc, type_doc from gs_log_doc where dbtable='{$logTabla}' and nm_field='{$logField}' and pk='{$logPk}' order by cd_gs_log_doc";
if($test)eTrace($logSql);
qQuery($logSql);
while($r=qRow()){
$logFileDelete = eScript($_SESSION["LogPathFileVersion"]).'/'.$r[0].'.'.$r[1];
@unlink($logFileDelete);
if($test)eTrace('logFileDelete: '.$logFileDelete);
if( $logKill!="" ) $logKill .= ",";
$logKill .= $r[0];
if($test)eTrace("BORRAR: ".$r[0]);
$logBAK--;
if( $logBAK<=$logCopias ) break;
}
$logSql = "delete from gs_log_doc where dbtable='{$logTabla}' and nm_field='{$logField}' and pk='{$logPk}' and cd_gs_log_doc in ({$logKill})";
if($test)eTrace($logSql);
qQuery($logSql);
}
if($test) eEnd();
}
}
function _UnPath($txt){
$Dim = explode('/',str_replace('\\','/',$txt));
$Ext = explode('.',$txt);
return array( $Dim[count($Dim)-2].'/'.$Dim[count($Dim)-1], $Ext[count($Ext)-1] );
}
function _CalcSetPeriodo(&$od){
$Retornar = '';
$od = str_replace(' ','',$od);
if( substr($od,0,2)=='#/' ){
$Retornar = '#';
$od = substr($od,2);
}
$d = str_replace('YEAR',date('Y'),str_replace('MONTH',date('m'),str_replace('DAY',date('d'),strtoupper($od))));
$d = str_replace('()','[]',$d);
while( substr_count($d,'(')>0 ){
$Ini = strpos($d,'('); $Fin = strpos($d,')',$Ini);
$var = substr( $d, $Ini, $Fin-$Ini+1 );
$cal = substr($var,1,-1);
if( substr_count($cal,'+')>0 ){
$tmp = explode('+',$cal);
$v = $tmp[0]+$tmp[1];
}else{
$tmp = explode('-',$cal);
$v = $tmp[0]-$tmp[1];
}
if( $v>12 && $v<25 ){
$v -= 12;
$Ini = strpos($d,$var);
$a = substr($d,$Ini-5,4)+1;
$d = substr($d,0,$Ini-5).$a.substr($d,$Ini-1);
}else if( $v<1 ){
$v += 12;
$Ini = strpos($d,$var);
$a = substr($d,$Ini-5,4)-1;
$d = substr($d,0,$Ini-5).$a.substr($d,$Ini-1);
}
if( $v<10 ) $v = '0'.$v;
$d = str_replace( $var, $v, $d );
}
$Dim = explode(',',$d);
$oDim = explode(',',$od);
$p = count($Dim);
$Desde = -1;
$Hasta = -1;
$Meses = '';
if( $p>0 ) $Desde = $Dim[0];
if( $p>1 ) $Hasta = $Dim[1];
if( $p>2 ){
$Ini = strpos($d,',');
$Ini = strpos($d,',',$Ini+1);
$Meses = substr($d,$Ini+1);
}
if( $Desde=='' ) $Desde = '-1';
if( $Hasta=='' ) $Hasta = '-1';
if( substr_count($Desde,'/')>0 ){
list($id,$fd) = explode('/',$Desde);
$Desde = max($id,$fd);
}
if( substr_count($Hasta,'/')>0 ){
list($id,$fd) = explode('/',$Hasta);
$Hasta = min($id,$fd);
}
if( substr_count($Desde,'[]')>0 ){
$Desde = eval('return '.$oDim[0].';');
if( gettype($Desde)=='array' ) list( $Desde, $Hasta, $Meses ) = $Desde;
}
if( substr_count($Hasta,'[]')>0 ) $Hasta = eval('return '.$oDim[1].';');
if( substr_count($Meses,'[]')>0 ) $Meses = eval('return '.$oDim[2].';');
echo " eFrom='{$Desde}' eTo='{$Hasta}' eWeekday='{$Meses}'";
$od = $Retornar;
}
function eHorizontalMenu($DOpcion, $DFichero, $TSolapaON, $DTitle, $DFunction){
global $_IconMenu;
if( $TSolapaON<2 ) return;
echo '<TABLE id="TABMenu" style="border-collapse:collapse; width:100%;" border=0px cellspacing=0px cellpadding=0px onclick="_TabMenu()" onmousewheel="_TabWheel()"><tr>';
echo '<TD class="TABMenuSeparator">&nbsp;</TD>';
$n0 = 'On';
$ConSolapa = false;
$nc = 0;
if( $TSolapaON==1 ) $nc = 100;
for($nc=0; $nc<count($DOpcion); $nc++){
if( empty($DOpcion[$nc]) ) continue;
$n = $nc+1;
if( !$ConSolapa ) $n0 = 'On';
$SeVe = '';
if( $DFichero[$nc][0]=='*' ) continue;
if( $DFichero[$nc][0]=='-' || $DFichero[$nc][0]=='*' ){
$SeVe = " style='display:none;'";
$n0 = 'Off';
}
if( $nc>0 ) $n0 = 'Off';
if( $n0=='On' ) $ConSolapa = true;
$IconoTab = '';
$DOpcion[$nc] = trim($DOpcion[$nc]);
if( $DOpcion[$nc][0]=='{' ){
list( $IconoTab, $DOpcion[$nc] ) = explode('}', $DOpcion[$nc]);
$DOpcion[$nc] = trim($DOpcion[$nc]);
}
echo "<TD class='TABMenu{$n0}' nowrap nOp={$n}{$DTitle[$nc]} Func='{$DFunction[$nc]}' style='white-space:nowrap;'>";
if( $_IconMenu!='' || $IconoTab!='' ){
echo "<table width=1px border=0px cellspacing=0px cellpadding=0px onclick=_TabMenu() onmousewheel=_TabWheel() style='border-collapse:collapse;'><tr>";
if( $IconoTab!='' ){
echo "<td><img src='".substr($IconoTab,1)."'>";
}else{
echo "<td><img src='{$_IconMenu}'>";
}
echo '&nbsp;<td>'.$DOpcion[$nc];
echo '</tr></table>';
}else{
echo trim($DOpcion[$nc]);
}
echo '</TD>';
echo '<TD class="TABMenuSeparator">&nbsp;</TD>';
}
echo '<TD class="TABMenuSeparator" style="width:100%">&nbsp;</TD>';
echo '</TR></TABLE>';
}
function eSubTab($xCaption, $xAction, $xIcon, $xShow, $xTitle, $SubTab, $lin){
global $_Form, $_IconTab;
echo '<TABLE class="TABMenu" style="border-collapse:collapse; width:100%;" border=0px cellspacing=0px cellpadding=0px><tr>';
$n0 = 'On';
$ConSolapa = false;
$total = count($xCaption);
for($nc=0; $nc<$total; $nc++){
$n = $nc+1;
if( !$ConSolapa ) $n0 = 'On';
$SeVe = '';
$xDisabled = '';
if( $xShow[$nc]=='*' ){
$SeVe = " style='display:none;'";
$n0 = 'Off';
}else if( $xShow[$nc]=='-' ) $xDisabled = ' disabled';
if( $nc>0 ) $n0 = 'Off';
if( $n0=='On' ) $ConSolapa = true;
$IconoTab = trim($xIcon[$nc]);
$xCaption[$nc] = trim($xCaption[$nc]);
if( $_IconTab!="" ) $xCaption[$nc] = "[".$_IconTab."] ".$xCaption[$nc];
$action = "";
$color = "";
$dim = explode(";", $xAction[$nc]);
for($i=0; $i<count($dim); $i++){
$dim[$i] = trim($dim[$i]);
if( preg_match('/[\=\:]/', $dim[$i]) ){
if( $color!="" ) $color .= ";";
$color .= str_replace("=", ":", $dim[$i]);
}else{
if( $action!="" ) $action .= ";";
$action .= $dim[$i];
}
}
echo "<TD class='TABMenuSeparator'{$SeVe}>&nbsp;</TD>";
echo "<TD class='TABMenu{$n0}' id=SubTab{$SubTab} onclick='eSubTabShow(this,{$SubTab})' nowrap nOp={$SubTab} title='{$xTitle[$nc]}' Func='{$action}' onmousewheel=_SubTabWheel(){$SeVe}{$xDisabled} style='white-space:nowrap;";
if( $IconoTab!='' ){
echo "'>";
echo "<table width=1px border=0px cellspacing=0px cellpadding=0px o-nclick=_TabMenu() on-mousewheel=_TabWheel() style='border-collapse:collapse;'><tr>";
echo "<td style='border-width:0px,width:1px'><img src='{$IconoTab}'>";
echo "<td style='border-width:0px;{$color}'>{$xCaption[$nc]}";
echo '</tr></table>';
}else{
if( preg_match_all("/[\[\]]/", $xCaption[$nc], $matches)==2 ){
preg_match('~\[(.*?)\]~', $xCaption[$nc], $output);
$xCaption[$nc] = str_replace($output[0], eIcon($output[1]), $xCaption[$nc]);
}
echo "{$color}'>".$xCaption[$nc];
}
echo '</TD>';
$SubTab++;
}
echo '<TD class="TABMenuSeparator" style="width:100%">&nbsp</TD>';
echo '</TR></TABLE>';
}
function qSelectTree($TipoCarga, $Tree, $pk, $uIcon){
$Dim = array();
$DimPadre = array();
$txt = "";
if( $TipoCarga=='Q' ){
qQuery( "select * from {$Tree['table']} where {$Tree['level']}<{$Tree['load_level']} order by {$Tree['order']}" );
}else if( $TipoCarga=='C' ){
qQuery( "select * from {$Tree['table']} where {$Tree['parent']}={$Tree['load_level']} order by {$Tree['order']}" );
}else if( $TipoCarga=='U' ){
if( $pk=="" ){
qQuery( "select * from {$Tree['table']}" );
}else if( $pk[0]=="," ){
$pk = substr($pk,1,-1);
qQuery( "select * from {$Tree['table']} where {$Tree['index']} in ({$pk})" );
}else{
qQuery( "select * from {$Tree['table']} where {$Tree['index']}={$pk}" );
}
$Reg = qArray();
while( $Reg[$Tree['level']]+1>$Tree['load_level'] ){
$DimPadre[] = $Reg[$Tree['parent']];
$pk = $Reg[$Tree['parent']];
qQuery( "select * from {$Tree['table']} where {$Tree['index']}={$pk}" );
$Reg = qArray();
}
qQuery( "select * from {$Tree['table']} where {$Tree['level']}<{$Tree['load_level']} order by {$Tree['order']}" );
}else if( $TipoCarga=='R' ){
if( $pk[0]=="," ){
$pk = substr($pk,1,-1);
qQuery( "select * from {$Tree['table']} where {$Tree['index']} in ({$pk})" );
}else{
qQuery( "select * from {$Tree['table']} where {$Tree['index']}={$pk}" );
}
while($r=qArray()){
if( $txt!="" ) $txt .= "\n";
$txt .= $r[$Tree['caption']];
}
return $txt;
}
$Icono = '';
if( $uIcon<>'' ){
$Icono = "<img src='{$uIcon}'> ";
}else{
$Icono = "<i>b</i>";
}
while( $r=qArray() ){
$r[$Tree['level']] *= 1;
$Dim[] = array(
$r[$Tree['index']],
$r[$Tree['type']],
$r[$Tree['level']],
(($r[$Tree['type']]=='O')?$Icono:'').$r[$Tree['caption']]
);
if( in_array( $r[$Tree['index']], $DimPadre ) ){
qSelectTreeParent( $r[$Tree['index']], $DimPadre, $Dim, $Tree );
}
}
return $Dim;
}
function qSelectTreeParent($pk, $DimPadre, &$Dim, $Tree){
qQuery("select * from {$Tree['table']} where {$Tree['parent']}={$pk} order by {$Tree['order']}", $p1);
while( $r=qArray($p1) ){
$Dim[] = array(
$r[$Tree['index']],
$r[$Tree['type']],
$r[$Tree['level']],
$r[$Tree['caption']]
);
if( in_array($r[$Tree['index']], $DimPadre) ){
qSelectTreeParent($r[$Tree['index']], $DimPadre, $Dim, $Tree);
}
}
}
function _EchoStyle($xStyle, $w100=false){
if( $w100 ){
$xStyle = preg_replace_callback(
'|width:[0-9.]{1,}px;|i',
function($item){
return "";
},
$xStyle
);
$xStyle .= "width:100%;";
}
if( $xStyle<>"" ) echo " style='{$xStyle}'";
}
function _getPropiedad($prop, $txt, $add=""){
$pos = stripos($txt, $prop."=");
if( $pos===false ){
return ["", $txt];
}else{
$posIni = $pos;
if( $pos>0 ){
$cDesde = substr($txt, $pos-1, 1);
$posIni--;
}else{
$cDesde = "";
}
$pComilla = $pos+strlen($prop)+1;
$comilla = substr($txt, $pComilla, 1);
$contenido = "";
if( $comilla=="'" || $comilla=='"' ){
for($i=$pComilla+1; $i<strlen($txt); $i++){
$c = substr($txt,$i,1);
if( $comilla==$c && substr($txt,$i-1,1)!='\\' ) break;
$contenido .= $c;
}
}else{
$comilla = "";
$ini = strpos($txt, "=", $pos)+1;
$nZona = 0;
$sumar = true;
$pComilla = "";
for($i=$ini; $i<strlen($txt); $i++){
$c = substr($txt,$i,1);
if( $c=="(" || $c=="[" || $c=="{" ) $nZona++;
else if( $c==")" || $c=="]" || $c=="}" ) $nZona--;
if( $c=="'" || $c=='"' ){
if( substr($txt,$i-1,1)=='\\' ){
$contenido .= $c;
continue;
}
if( $pComilla=="" ){
$pComilla = $c;
$nZona++;
}else if( $pComilla==$c ){
$pComilla = "";
$nZona--;
}else{
$contenido .= $c;
continue;
}
}
if( $c==" " && $nZona==0 ) break;
$contenido .= $c;
}
}
if( $add=="-" ){
$txt = str_replace($cDesde.$prop."=".$comilla.$contenido.$comilla, "", $txt);
}else if( $add<>"" ){
if( substr($contenido,-1)<>";" && $add[0]<>";"  ) $add = ";".$add;
$txt = str_replace($cDesde.$prop."=".$comilla.$contenido.$comilla, $cDesde.$prop."=".$comilla.$contenido.$add.$comilla, $txt);
}
return [$contenido, $cDesde.$prop."=".$comilla.$contenido.$comilla, $txt];
}
}
function _AddCodeStyle($AddCode, &$xStyle, &$xAddCode){
if( substr_count(" ".strtoupper(trim($AddCode)), " STYLE=")>0 ){
if( substr($xStyle,-1)!=";" ) $xStyle .= ";";
$dim = _getPropiedad("style", $AddCode, "-");
$xStyle .= $dim[0];
$xAddCode = $dim[2];
}else{
$xAddCode = $AddCode;
}
if( trim($xAddCode)<>"" ) $xAddCode = " ".$xAddCode;
}
function _LeeSublistWin($FicheroD, $NomSublist=""){
global $_UPLOADFILE, $_FILELOG;
$ckeckLog = false;
$FicheroD = trim($FicheroD);
if( $FicheroD=="" ) return;
$_DimEDF = @OpenDF(eScript($FicheroD));
$ElPuntoEsRem = true;
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
if( $Chr_1=='[' && substr($buffer,-1)=="|" && !preg_match('/^\[FIELDS\]/i',$buffer) ) _addBuffer($buffer, $nDimFCH, $_DimEDF);
if( $Chr_1!='[' ) continue;
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
switch( $Etiqueta ){
case 'DBTABLE':
$tmp[0] = _InVar($tmp[0]);
$_sDBTABLE = $tmp[0];
break;
case 'UPLOADFILE':
$tmp[1] = _InVar($tmp[1]);
array_push($_Fichero, $tmp[0]);
$uNomFile = $tmp[0];
if( $_UPLOADFILE[$uNomFile]['oDIR']=='' ) $_UPLOADFILE[$uNomFile]['oDIR'] = $tmp[1];
if( $_UPLOADFILE[$uNomFile]['oDIR']=='' && $_Objeto['['.$uNomFile.']']['SUBDIR']<>'' ){
$_UPLOADFILE[$uNomFile]['oDIR'] = $_Objeto['['.$uNomFile.']']['SUBDIR'];
$tmp[1] = $_Objeto['['.$uNomFile.']']['SUBDIR'];
}
$tmp[1] = eScript($tmp[1]);
if( $_UPLOADFILE[$uNomFile]['DIR']=='' ) $_UPLOADFILE[$uNomFile]['DIR'] = $tmp[1];
$_UPLOADFILE[$uNomFile]['NOMBRE'] = $tmp[2];
$_UPLOADFILE[$uNomFile]['BYTS'] = str_replace('.','',str_replace(',','',$tmp[3]));
if( $_UPLOADFILE[$uNomFile]['BYTS']<0 ) $_UPLOADFILE[$uNomFile]['BYTS'] = $_UPLOADFILE[$uNomFile]['BYTS']*-1;
$_UPLOADFILE[$uNomFile]['TITLE'] = (($tmp[4]=='') ? '' : $tmp[4] );
if( $tmp[5]=='*.*' ) $tmp[5] = '*';
if( $tmp[5]!='' ) $_UPLOADFILE[$uNomFile]['EXT'] = str_replace(' ','',$tmp[5]);
$_UPLOADFILE[$uNomFile]['PREFIJO'] = $tmp[6];
$_UPLOADFILE[$uNomFile]['TAMAÑOS'] = $tmp[7];
$_UPLOADFILE[$uNomFile]['PREFIJOS'] = $tmp[8];
if( $tmp[9]!='' ){
if( substr($tmp[9],-1)=='/' ) $tmp[9] = substr($tmp[9],0,-1);
$_UPLOADFILE[$uNomFile]['COPY'] = eScript($tmp[9]);
}
$_UPLOADFILE[$_sDBTABLE.".".$uNomFile] = $_UPLOADFILE[$uNomFile];
break;
case 'FILELOG':
$buffer = _InVar(str_replace(" ","",$_DimEDF[$nDimFCH]));
$tmp = explode(",",$buffer);
list(,$tmp[0]) = explode("]",$tmp[0]);
if( count($tmp)<5 ) $tmp[4] = -1;
$tmp[4] *= 1;
if( !$_FILELOG[$tmp[0]] ) $_FILELOG[$tmp[0]] = 1;
$_FILELOG[$tmp[0].".".$tmp[1]] = $tmp;
$ckeckLog = true;
break;
case 'NOTE':
case 'EXIT':
break 2;
}
}
return $ckeckLog;
}
function _AddIconEMail($Valor){
global $__Lng;
$Robinson = eFileGetVar("Robinson");
$EMailOFF = false;
if( $Robinson["Status"] ){
if( $Robinson["Script"] ){
include_once(eScript($Robinson["Script"]));
$EMailOFF = call_user_func($Robinson["Check"], $Valor);
}else{
$EMailOFF = qCount("gs_robinson", "email='{$Valor}'");
}
}
$icon =  '<i class="ICONINPUT"';
if( !$EMailOFF ){
if( $_SESSION["EMailType"]=='' ){
$icon .= " onclick='window.open(\"mailto:\"+S(\":{$Form[1]}\").value())'";
}else if( strtoupper($_SESSION["EMailType"])=='SERVER' ){
$MailFrom = (($_SESSION["EMailFrom"]!='') ? '&mail_from='.$_SESSION["EMailFrom"] : '');
eContextPut('edes.php?Fa:$a/d/email.edf');
$icon .= ' onclick="top.eSWOpen(window,\'edes.php?Fa:$a/d/email.edf&_ASSIGN=a&mail_to='.$Valor.$MailFrom.'\')"';
}else{
$icon .= ' onclick="top.eSWOpen(window,\''.$_SESSION["EMailType"].'\',\'\',!true,0)"';
}
}else{
$icon .= ' onclick="S.info(\'EMail en &#34;Lista Robinson&#34;\')"';
}
if( $Robinson["Status"] ){
if( $EMailOFF ){
$icon .= " style='color:red' title='EMail en \"Lista Robinson\"'";
}else{
$script = ($Robinson["Management"]<>"")? $Robinson["Management"] : '$a/d/robinson.edf';
eContextPut('edes.php?Fa:'.$script);
$icon .= ' oncontextmenu="top.eSWOpen(window,\'edes.php?Fa:'.$script.'&_CLOSE_=1&_FORMBUTTONSDELETE=--&_ASSIGN=a&email='.$Valor.$MailFrom.'\'); S.eventClear(window);"';
$icon .= ' title="'.$__Lng[169].'"';
}
}else{
$icon .= ' title="'.$__Lng[28].'"';
}
$icon .= '>n</i>';
return $icon;
}
function _AddIconWeb($Campo, $Valor, $NumForm){
global $__Lng;
if( substr_count($Campo,'facebook')>0 ){
return "<I class='ICONINPUT' onclick=S.open(\"FACEBOOK\",FRM{$NumForm}.{$Campo}.value,\"*\") title=".'"'.$__Lng[122].'">&#163;</I>';
}else if( substr_count($Campo,'twitter')>0 ){
return "<I class='ICONINPUT' onclick=S.open(\"TWITTER\",FRM{$NumForm}.{$Campo}.value,\"*\") title=".'"'.$__Lng[123].'">&#164;</I>';
}else if( substr_count($Campo,'instagram')>0 ){
return "<I class='ICONINPUT' onclick=S.open(\"INSTAGRAM\",FRM{$NumForm}.{$Campo}.value,\"*\") title=".'"'.$__Lng[123].'">&#165;</I>';
}else{
return "<I class='ICONINPUT' onclick=S.open(\"WEB\",FRM{$NumForm}.{$Campo}.value,\"*\") title=".'"'.$__Lng[29].'">&#251;</I>';
}
}
?>
