<?PHP
if( !isset($_SESSION['_User']) || $GLOBALS['_gsID'] != getmypid() ) exit;
function eUpdateSubList($NomSubList, $ColImg, $NomImg, $NomTmp, $ColCondi, $ColValor){
global $_SAVEDATALIST;
$_SAVEDATALIST = str_replace( "'", chr(92)."'", $_SAVEDATALIST );
$_SAVEDATALIST = trim(str_replace( '"', chr(92).'"', $_SAVEDATALIST ));
$DimSubLista = explode("\n",$_SAVEDATALIST);
$NomSubList = "[".$NomSubList."]";
for($nSubLista=0; $nSubLista<count($DimSubLista); $nSubLista++){
if( $DimSubLista[$nSubLista]=='' || substr_count($DimSubLista[$nSubLista], '|')!=15 ) continue;
$DimSubLista[$nSubLista] = trim($DimSubLista[$nSubLista]);
$tmp = explode("|",$DimSubLista[$nSubLista]);
if( $tmp[11]==$NomSubList ){
$sTReg = $nSubLista+1+$tmp[0];
for($i=$nSubLista+1; $i<$sTReg; $i++){
$tmp = explode("|",$DimSubLista[$i]);
if( $tmp[$ColCondi]==$ColValor ){
if( $NomTmp=="" ){
$tmp[$ColImg] = $NomImg;
}else{
$tmp[$ColImg] = "{$NomImg}~{$NomTmp}";
}
$DimSubLista[$i] = implode("|",$tmp);
break;
}
}
}else{
$nSubLista += $tmp[0];
}
}
$_SAVEDATALIST = implode("\n",$DimSubLista);
}
function GrabaSubLista($Opcion, $uSubList=false){
global $_SAVEDATALIST, $_DEBUGSubList, $_Sql, $_SubSubListPK, $_RELATIONSUBLIST, $_UPLOADFILE, $_FILELOG, $_SUBLISTWIN;
$DimPK = array(); $DimPKId = array();
$SubListWinLoad = array();
$ConDebug = $_DEBUGSubList;
if( $ConDebug ){
eInit();
global $_DEBUG;
$_DEBUG = 30;
}
$_SAVEDATALIST = str_replace(
array(   "'"     ,    '"'     , '&#13;&#10;'),
array(chr(92)."'", chr(92).'"',    "\n"     ),
$_SAVEDATALIST
);
$DimSubLista = explode("\n", $_SAVEDATALIST);
foreach($_RELATIONSUBLIST as $k=>$v);
if( !isset($_RELATIONSUBLIST) ) $v = array('', '', '');
$DimRelationSubList = $v;
$RelationSubList = implode(',', $v);
if( $ConDebug ) echo 'RelationSubList['.$RelationSubList.']<br>Modo general['.$Opcion.']<br>Total Registros: '.count($DimSubLista).'<br><pre>'.$_SAVEDATALIST.'</pre>';
for($nSubLista=0; $nSubLista<count($DimSubLista); $nSubLista++) $DimSubLista[$nSubLista] = trim($DimSubLista[$nSubLista]);
if( $uSubList ){
$uDimSubList = array();
for($nSubLista=0; $nSubLista<count($DimSubLista); $nSubLista++){
if( $DimSubLista[$nSubLista]=='' ) continue;
if( substr_count($DimSubLista[$nSubLista], '|')==15 ){
list($sTReg, $TablaHijo, $IndicePadre, $sCampos) = explode('|', $DimSubLista[$nSubLista]);
$uDimSubList[] = array($sTReg, $TablaHijo, $IndicePadre, $sCampos);
for($n=$nSubLista+1; $n<=$sTReg+$nSubLista; $n++){
$uDimSubList[] = explode('|',$DimSubLista[$n]);
unset($uDimSubList[count($uDimSubList)-1][count($uDimSubList[count($uDimSubList)-1])-1]);
}
$nSubLista += $sTReg;
}
}
return $uDimSubList;
}
for($nSubLista=0; $nSubLista<count($DimSubLista); $nSubLista++){
if( $DimSubLista[$nSubLista]=='' || substr_count($DimSubLista[$nSubLista], '|')!=15 ) continue;
$DimSubLista[$nSubLista] = str_replace("&amp;" , "&", $DimSubLista[$nSubLista]);
$DimSubLista[$nSubLista] = str_replace("&nbsp;", " ", $DimSubLista[$nSubLista]);
if( $ConDebug ){
echo '<br><b>nSubLista['.$nSubLista.'/'.count($DimSubLista).']</B><hr>';
echo 'Contenido['.$DimSubLista[$nSubLista].']<br><br>';
}
$DimCampoValor = array();
list($sTReg, $TablaHijo, $IndicePadre, $sCampos, $IndiceHijo, $posIndiceHijo, $FuncUsu, $FieldNomFile, $NomDirectorio, $TablaPadre, $EsFormStatic, $NomSublist, $ePrefix, $eSequence, $eAlias, $eAddWhere) = explode('|', $DimSubLista[$nSubLista]);
$eAlias = trim($eAlias);
if( $NomSublist<>'' ) $NomSublist = substr($NomSublist, 1, -1);
list($FieldNomFile, $CampoEnUploadFile) = explode('~', $FieldNomFile);
$FieldNomFile = str_replace('&#62;', '>', $FieldNomFile);
if( $eSequence=="null" ){
$eSequence = "";
}else{
$eSequence = ".".trim($eSequence);
}
if( substr_count($CampoEnUploadFile, ".")>0 ) list(,$CampoEnUploadFile) = explode(".",$CampoEnUploadFile);
if( $ConDebug ){
echo '1:FieldNomFile: '.$FieldNomFile.'<br>';
echo '1:CampoEnUploadFile: '.$CampoEnUploadFile.'<br>';
echo '1:ePrefix: '.$ePrefix.'<br>';
echo '1:eSequence: '.$eSequence.'<br>';
echo '1:eAlias: '.$eAlias.'<br>';
echo '1:eAddWhere: '. $eAddWhere.'<br>';
}
$FuncUsu = trim($FuncUsu);
if( $FuncUsu[0]=='_' ){
call_user_func($FuncUsu, $Opcion, $DimSubLista, $sTReg);
return;
}
$NomDirectorio = trim($NomDirectorio); if( $ConDebug ) echo '1:NomDirectorio: '.$NomDirectorio.'<br>';
$TablaPadre = trim($TablaPadre);
$_FicherosACopiar = array();
$DimDelDato = array();
if( $NomDirectorio<>'' ) $NomDirectorio = eScript(trim($NomDirectorio)).'/';
if( substr_count($FieldNomFile, '.')>0 ) list(,$FieldNomFile) = explode('.', $FieldNomFile);
$FieldNomFile = trim($FieldNomFile);
if( $FieldNomFile[0]=='>' ) $FieldNomFile = trim(substr($FieldNomFile,1));
if( $ConDebug ){
echo '2:FieldNomFile: '.$FieldNomFile.'<br>';
echo '2:NomDirectorio: '.$NomDirectorio.'<br>';
echo '2:NomSublist: '.$NomSublist.'<br><br>';
}
if( substr_count($IndiceHijo, '.')>0 ) list(,$IndiceHijo) = explode('.',$IndiceHijo);
$IndiceHijo = trim($IndiceHijo);
if( $IndiceHijo=='undefined' ) $IndiceHijo = '';
list($TablaHijo) = explode(' ',trim($TablaHijo));
$TablaHijo = trim($TablaHijo);
if( substr($TablaHijo,-1)==',' ) $TablaHijo = substr($TablaHijo,0,-1);
$TablaHijo = trim($TablaHijo);
if( substr_count($TablaHijo, ' ')>0 ) list($TablaHijo, $Alias) = explode(' ',$TablaHijo);
$Alias = $eAlias;
if( CamposABorrar($sCampos, $DimDelDato, $Alias, $ConDebug) ){
ValoresABorrar($DimSubLista, $nSubLista, $sTReg, $DimDelDato, $ConDebug);
}
if( $IndiceHijo<>'' && substr_count($IndicePadre,',')==0 &&  substr_count($IndicePadre,$IndiceHijo)==1 ){
if( $IndicePadre==$IndiceHijo ) $IndiceHijo = '';
$xIndicePadre = $IndicePadre;
if( substr_count($IndicePadre,'.')==1 ) list(,$xIndicePadre) = explode('.',$IndicePadre);
if( $xIndicePadre==$IndiceHijo ) $IndiceHijo = '';
}
if( $ConDebug ) echo '3:FieldNomFile: '.$FieldNomFile.'<br>';
CalculaFileIndex($IndiceHijo, $FieldNomFile, $sCampos, $posNomFile, $posIndiceHijo);
if( $ConDebug ) echo '4:FieldNomFile: '.$FieldNomFile.'<br>';
if( $ConDebug ) echo "TotalReg[ {$sTReg} ]<br>Es FormStatic[ {$EsFormStatic} ] ".(($EsFormStatic)?'SubVentana':'SubFicha')."<br>TablaPadre[ {$TablaPadre} ]<br>IndicePadre[ {$IndicePadre} ]<br>Alias[ {$Alias} ]<br>TablaHijo[ {$TablaHijo} ]<br>IndiceHijo[ {$IndiceHijo} ]<br>Campos[ {$sCampos} ]<br>posIndiceHijo[ {$posIndiceHijo} ]<br>FuncUsu[ {$FuncUsu} ]<br>NomDirectorio[ {$NomDirectorio} ]<br>NomFile[ {$FieldNomFile} ]<br>Contenido[ ".$DimSubLista[ $nSubLista ].' ]<br>';
if( $ConDebug ) echo "Opcion[ {$Opcion} ] <br>DDBB[ {$_Sql} ] <br>posNomFile[ {$posNomFile} ]<br>Campos[ {$sCampos} ]<br>Contenido[ ".$DimSubLista[$nSubLista]." ]<br>NomDirectorio[ {$NomDirectorio} ]<br>";
$DimCampoIndicePadre = explode(',',$IndicePadre);
QuitaAliasIndicePadre($DimCampoIndicePadre);
$DimValorIndicePadre = array();
$WhereHijos = '';
if( $Opcion!='A' ){
for( $r=0; $r<count($DimCampoIndicePadre); $r++ ){
if( $WhereHijos!='' ) $WhereHijos .= ' and ';
if( eSqlType('oracle') ){
$_POST[$DimCampoIndicePadre[$r]] = str_replace( "'", "''", $_POST[$DimCampoIndicePadre[$r]] );
if( isset($_POST) ){
$WhereHijos .= $DimCampoIndicePadre[$r]."='".$_POST[$DimCampoIndicePadre[$r]]."'";
$DimValorIndicePadre[] = $_POST[$DimCampoIndicePadre[$r]];
}else{
$WhereHijos .= $DimCampoIndicePadre[$r]."='".$GLOBALS[$DimCampoIndicePadre[$r]]."'";
$DimValorIndicePadre[] = $GLOBALS[$DimCampoIndicePadre[$r]];
}
}else{
if( isset($_POST) ){
$WhereHijos .= $DimCampoIndicePadre[$r].'="'.$_POST[$DimCampoIndicePadre[$r]].'"';
$DimValorIndicePadre[] = $_POST[$DimCampoIndicePadre[$r]];
}else{
$WhereHijos .= $DimCampoIndicePadre[$r].'="'.$GLOBALS[$DimCampoIndicePadre[$r]].'"';
$DimValorIndicePadre[] = $GLOBALS[$DimCampoIndicePadre[$r]];
}
}
}
}else{
global $_DBTABLE, $_IdRegistro, $_DBSERIAL;
if( count($_DBSERIAL) > 0 && $_DBSERIAL[1]==$DimCampoIndicePadre[0] ){
$WhereHijos .= $DimCampoIndicePadre[0]."='".$_IdRegistro[$_DBTABLE]."'";
$DimValorIndicePadre[] = $_IdRegistro[$_DBTABLE];
if( $ConDebug ) echo ': Tabla Padre['.$_DBTABLE.']<br>: Serial Padre['.$DimValorIndicePadre[0].']<br>';
}else{
if( isset($_POST) ){
$WhereHijos .= $DimCampoIndicePadre[0]."='".$_POST[$DimCampoIndicePadre[0]]."'";
$DimValorIndicePadre[] = $_POST[$DimCampoIndicePadre[0]];
}else{
$WhereHijos .= $DimCampoIndicePadre[0]."='".$GLOBALS[$DimCampoIndicePadre[0]]."'";
$DimValorIndicePadre[] = $GLOBALS[$DimCampoIndicePadre[0]];
}
}
}
if( $ConDebug ){
echo "DimCampoIndicePadre[".implode(',',$DimCampoIndicePadre)."]<br>";
echo 'WhereHijos['.$WhereHijos.']<br><hr>';
}
if( $Opcion=='B' ){
if( $FuncUsu!='' ) call_user_func($FuncUsu, 'B', $TablaHijo, $WhereHijos);
BorrarTodosLosDatos($TablaHijo, $WhereHijos, $IndiceHijo, $FieldNomFile, $NomDirectorio, $NomSublist, $ConDebug);
$nSubLista += $sTReg;
continue;
}
for($r=0; $r<count($DimCampoIndicePadre); $r++){
if( substr_count(",{$sCampos},", ",{$DimCampoIndicePadre[$r]},")==0 ){
$sCampos = trim($sCampos).','.$DimCampoIndicePadre[$r];
}
}
$DimCampo = explode(',',$sCampos);
if( $ConDebug ) echo 'Con nuevos Campos<b>[ '.str_replace(',',', ',$sCampos).' ]</b><br>';
if( $IndiceHijo!='' ){
for($r=0; $r<$sTReg; $r++){
if( $ConDebug ) echo 'Registro datos[ '.$r.' ] '.$DimSubLista[$nSubLista+$r+1].'<br>';
for($i=0; $i<count($DimCampoIndicePadre); $i++) $DimSubLista[$nSubLista+$r+1] = $DimSubLista[$nSubLista+$r+1].$DimValorIndicePadre[$i].'|';
$DimSubLista[$nSubLista+$r+1] = substr($DimSubLista[$nSubLista+$r+1],0,-1);
if( $ConDebug ) echo 'Registro datos[ '.$r.' ] '.$DimSubLista[$nSubLista+$r+1].'<br>';
}
}
$NotIn = '';
$i = $nSubLista;
for($r=0; $r<$sTReg; $r++){
$i++;
$DimValor = explode('|', $DimSubLista[$i]);
$DimSubLista[$i] = '';
$DimReg = array();
$ValorPK = '';
for($w=0; $w<count($DimValor); $w++){
$DimValor[$w] = trim(str_replace("&nbsp;", " ", $DimValor[$w]));
if( $DimCampo[$w]==$DimCampoIndicePadre[0] && $DimValor[$w]=='' ){
$DimValor[$w] = $_POST[$DimCampo[$w]];
if( $DimValor[$w]=='' && $_DBSERIAL[1]==$DimCampo[$w] ) $DimValor[$w] = $_DBSERIAL[2];
}
if( $DimCampo[$w]==$FieldNomFile ){
eExplodeLast($DimValor[$w], ".", $iz, $dch);
if( $dch!="" ){
$DimValor[$w] = $iz.".".strtolower($dch);
}
}
if( eSqlType('oracle') ){
$DimValor[$w] = str_replace("'", "''", $DimValor[$w]);
if( strlen($DimValor[$w])==10 && substr($DimValor[$w],4,1)=='-' && substr($DimValor[$w],7,1)=='-' ){
$DimValor[$w] = substr($DimValor[$w],8,2).substr($DimValor[$w],4,4).substr($DimValor[$w],0,4);
}
}else if( strlen($DimValor[$w])==10 && substr($DimValor[$w],2,1)=='-' && substr($DimValor[$w],5,1)=='-' ){
$DimValor[$w] = substr($DimValor[$w],6,4).substr($DimValor[$w],2,4).substr($DimValor[$w],0,2);
}
if( $DimSubLista[$i]!='' ) $DimSubLista[$i] .= ',';
$DimSubLista[$i] .= '"'.$DimValor[$w].'"';
if( $NomSublist==$DimRelationSubList[0] && $DimRelationSubList[2]==$DimCampo[$w] && $DimValor[$w]<0 ){
$ValorPK = $DimValor[$w];
$DimValor[$w] = 0;
}
if( $NomSublist==$DimRelationSubList[1] && $DimRelationSubList[2]==$DimCampo[$w] && $DimValor[$w]<0 ){
$DimValor[$w] = $DimPKId['s'.$DimValor[$w]];
}
if( $ConDebug ){
}
$DimReg[] = array($DimCampo[$w], $DimValor[$w]);
}
if( $NomSublist==$DimRelationSubList[0] ){
$DimPK[$r] = array($ValorPK,0);
$DimPKId['s'.$ValorPK] = 0;
}
$DimCampoValor[] = $DimReg;
if( $DimValor[$posIndiceHijo]!='' ){
if( $NotIn!='' ) $NotIn .= ',';
$NotIn .= "'".$DimValor[$posIndiceHijo]."'";
}
}
if( $ConDebug ) echo "NotIn[ {$NotIn} ]<br>";
BorrarRegQueNoVienen($TablaHijo, $WhereHijos, $IndicePadre, $IndiceHijo, $NotIn, $FieldNomFile, $NomDirectorio, $NomSublist, $eAddWhere, $ConDebug);
$FileACopiar = 1;
$DimValorField = array();
$_FicheroACopiar = array();
if( $ConDebug ) echo ": SE GRABAN TODOS LOS REGISTROS QUE VIENEN<br>";
for($r=0; $r<count($DimCampoValor); $r++){
if( $ConDebug ) echo "[{$r}]<hr>";
$Insertar=''; $Modificar=''; $Where=''; $xWhere=''; $sCampos='';
$_FicheroACopiar = array(); $oFile = "";
for($c=0; $c<count($DimCampoValor[$r]); $c++){
if( $DimCampoValor[$r][$c][0]==$FieldNomFile && $DimCampoValor[$r][$c][1]!='' ){
$DimCampoValor[$r][$c][1] = substr( $DimCampoValor[$r][$c][1], strrpos($DimCampoValor[$r][$c][1], '\\' ));
if( $DimCampoValor[$r][$c][1][0]=='\\' ) $DimCampoValor[$r][$c][1] = substr($DimCampoValor[$r][$c][1], 1);
}
if( $DimCampoValor[$r][$c][0]==$FieldNomFile && $DimCampoValor[$r][$c][1]!='' && substr_count($DimCampoValor[$r][$c][1],'~')==1 ){
list($DimCampoValor[$r][$c][1], $oFile) = explode('~',$DimCampoValor[$r][$c][1]);
$Ext = substr($DimCampoValor[$r][$c][1], strrpos($DimCampoValor[$r][$c][1],'.')+1);
$_FicheroACopiar = array('../_tmp/php/'.$oFile, $NomDirectorio, $DimCampoValor[$r][$posIndiceHijo], $Ext, $ePrefix);
}
if( eSqlType('oracle') ){
if( $posIndiceHijo!=$c ){
if( $Insertar!='' ) $Insertar .= ',';
if( $DimCampoValor[$r][$c][1]=="" ){
$Insertar .= 'NULL';
if( $Modificar!='' ) $Modificar .= ',';
$Modificar .= $DimCampoValor[$r][$c][0]. '=NULL';
$DimValorField[trim($DimCampoValor[$r][$c][0])] = 'NULL';
}else{
$Insertar .= "'".$DimCampoValor[$r][$c][1]."'";
if( $Modificar!='' ) $Modificar .= ',';
$Modificar .= $DimCampoValor[$r][$c][0]. '='."'".$DimCampoValor[$r][$c][1]."'";
$DimValorField[trim($DimCampoValor[$r][$c][0])] = $DimCampoValor[$r][$c][1];
}
if( $sCampos!='' ) $sCampos .= ',';
$sCampos .= $DimCampoValor[$r][$c][0];
}else{
$Where = $DimCampoValor[$r][$c][0]. '='."'".$DimCampoValor[$r][$c][1]."'";
$xWhere .= ''.$DimCampoValor[$r][$c][1];
$IndiceSubLista = $DimCampoValor[$r][$c][1];
}
}else{
if( $posIndiceHijo!=$c ){
if( $Insertar!='' ) $Insertar .= ',';
if( $DimCampoValor[$r][$c][1]=="" ){
$Insertar .= 'NULL';
if( $Modificar!='' ) $Modificar .= ',';
$Modificar .= $DimCampoValor[$r][$c][0].'=NULL';
$DimValorField[ trim($DimCampoValor[$r][$c][0]) ] = 'NULL';
}else{
$Insertar .= '"'.$DimCampoValor[$r][$c][1].'"';
if( $Modificar!='' ) $Modificar .= ',';
$Modificar .= $DimCampoValor[$r][$c][0]. '='.'"'.$DimCampoValor[$r][$c][1].'"';
$DimValorField[ trim($DimCampoValor[$r][$c][0]) ] = $DimCampoValor[$r][$c][1];
}
if( $sCampos!='' ) $sCampos .= ',';
$sCampos .= $DimCampoValor[$r][$c][0];
}else{
$Where = $DimCampoValor[$r][$c][0]. '='.'"'.$DimCampoValor[$r][$c][1].'"';
$xWhere .= ''.$DimCampoValor[$r][$c][1];
$IndiceSubLista = $DimCampoValor[$r][$c][1];
}
}
if( $ConDebug ) echo '&nbsp;&nbsp;&nbsp;'.$DimCampoValor[$r][$c][0]. ' = '.$DimCampoValor[$r][$c][1].'<br>';
}
if( $ConDebug ){
echo "IndiceSubLista[ {$IndiceSubLista} ]<br>";
echo "Fichero enviado[ {$oFile} ]<br>";
echo "4: select count(*) from {$TablaHijo} where {$Where}".(($xWhere=='')?' (No se ejecuta por ser un alta)':'')."<br>";
}
$ConFichero = false;
if( $ConDebug ){
echo '$NomDirectorio = '.$NomDirectorio.'<br>';
echo '$CampoEnUploadFile = '.$CampoEnUploadFile.'<br>';
echo '$FieldNomFile = '.$FieldNomFile.'<br>';
echo 'file_exists = '.$_FicheroACopiar[0].' >  '.(file_exists($_FicheroACopiar[0])?"SI":"NO").'<br>';
if( $NomDirectorio=='' && $CampoEnUploadFile<>'' && $FieldNomFile!='' && file_exists($_FicheroACopiar[0]) ){
echo '>>> Con Fichero en la tabla<br>';
}else{
echo '>>> Sin Fichero en la tabla<br>';
}
}
if( $NomDirectorio=='' && $CampoEnUploadFile<>'' && $FieldNomFile!='' && file_exists($_FicheroACopiar[0]) ){
$ConFichero = true;
$data = file_get_contents($_FicheroACopiar[0]);
if( $ConDebug ) echo '_FicheroACopiar: '.$_FicheroACopiar[0].'<br>';
if( eSqlType('oracle') ){
$DimBlob = array();
$DimBlob[$CampoEnUploadFile] = $data;
$Modificar .= ", ".$CampoEnUploadFile."=EMPTY_BLOB()";
$sCampos .= ", ".$CampoEnUploadFile;
$Insertar .= ',EMPTY_BLOB()';
}else{
$Modificar .= ", ".$CampoEnUploadFile."='".addslashes($data)."'";
$sCampos .= ", ".$CampoEnUploadFile;
$Insertar .= ",'".addslashes($data)."'";
}
}
if( $xWhere=='' || qCount($TablaHijo, $Where)==0 ){
$xOp = "i";
if( $ConDebug ){
echo "5: insert into {$TablaHijo} ( {$sCampos} ) values ( {$Insertar} )".'<br>';
$xId = '#SERIAL#';
}else{
if( $ConFichero && eSqlType('oracle') ){
sql_Inserta($TablaHijo, $sCampos, $Insertar, $IndiceHijo.$eSequence, $DimBlob);
}else{
sql_Inserta($TablaHijo, $sCampos, $Insertar, $IndiceHijo.$eSequence);
}
$xId = qId();
}
if( $ConDebug ) eTrace('Reg: '.$r.'  DimPK='.$DimPK[$r][0] );
if( $DimPK[$r][0]<0 ){
$DimPK[$r][1] = $xId;
$DimPKId['s'.$DimPK[$r][0]] = $xId;
if( $ConDebug ) eTrace(' id = ['.'s'.$DimPK[$r][0].'] = '.$xId );
}
}else{
$xOp = "u";
if( $FieldNomFile!='' ){
qQuery("select * from {$TablaHijo} where {$Where}");
$_FILELOG[$TablaHijo] = qArray();
}
if( $ConDebug ){
echo "6: update {$TablaHijo} set {$Modificar} where {$Where}".'<br>';
}else{
if( $ConFichero && eSqlType('oracle') ){
sql_Modifica($TablaHijo, $Modificar, $Where, $DimBlob);
}else{
qQuery("update {$TablaHijo} set {$Modificar} where {$Where}");
}
}
$xId = $IndiceSubLista;
}
if( $ConDebug ) echo "xId[ {$xId} ]<br>";
if( $FieldNomFile!='' ){
if( $xOp=="u" && $_FicheroACopiar[0]!="" && !$ConDebug ){
if( !$SubListWinLoad[$NomSublist] ){
$ckeckLog = _LeeSublistWin($_SUBLISTWIN[$NomSublist], $NomSublist);
$SubListWinLoad[$NomSublist] = true;
}
_FileToLog([
tabla		=> $TablaHijo,
campo		=> $FieldNomFile,
numCopias	=> $_FILELOG[$TablaHijo.".".$FieldNomFile][4],
prefijo		=> $ePrefix,
dir			=> $NomDirectorio,
valPk		=> $_FILELOG[$TablaHijo][ $IndiceHijo ],
valNomFile	=> $_FILELOG[$TablaHijo][ $_FILELOG[$TablaHijo.".".$FieldNomFile][1] ],
valCdi		=> $_FILELOG[$TablaHijo][ $_FILELOG[$TablaHijo.".".$FieldNomFile][2] ],
valUser		=> $_FILELOG[$TablaHijo][ $_FILELOG[$TablaHijo.".".$FieldNomFile][3] ]
]);
}
$_FicheroACopiar[2] = $xId;
CopiarFicheroNET($_FicheroACopiar, $ConDebug);
}
}
if( $FuncUsu!='' ) call_user_func($FuncUsu, 'A', $TablaHijo, $Where);
}
if( $ConDebug ) exit;
}
function CalculaAlias( $sCampos, $IndicePadre ){
if( substr_count($IndicePadre,'.')>0 ){
$Alias = $IndicePadre[0];
}else{
if( substr_count(",{$sCampos},",",{$IndicePadre},")>0 ){
if( substr_count($sCampos,'.'.$IndicePadre.',')>0 ){
$p = strpos( $sCampos, '.'.$IndicePadre.',' );
$Alias = substr($sCampos,$p-1,1);
}else if( substr_count($sCampos,'.'.$IndicePadre.'|')>0 ){
$p = strpos( $sCampos, '.'.$IndicePadre.'|' );
$Alias = substr($sCampos,$p-1,1);
}else if( substr_count('.',$IndicePadre)>0 ) $Alias = $IndicePadre[0];
}else if( substr_count($IndicePadre,'.')>0 && substr_count($sCampos,$IndicePadre)>0 ){
if( substr_count($sCampos,$IndicePadre.',')>0 ){
$p = strpos( $sCampos, $IndicePadre.',' );
$Alias = substr($sCampos,$p,1);
}else if( substr_count($sCampos,$IndicePadre.'|')>0 ){
$p = strpos( $sCampos, $IndicePadre.'|' );
$Alias = substr($sCampos,$p,1);
}
}else if( substr_count($IndicePadre,'.')==0 && substr_count($sCampos,$IndicePadre)>0 ){
if( substr_count( "{$sCampos},", ".{$IndicePadre}," ) > 0 ){
$p = strpos( "{$sCampos},", ".{$IndicePadre}," );
$Alias = substr($sCampos,$p-1,1);
}else if( substr_count($sCampos,'.') > 0 ){
$DimAlias = array();
$tmp = explode(',',$sCampos);
for( $n=0; $n<count($tmp); $n++ ){
list( $a ) = explode('.',$tmp[$n]);
$DimAlias[trim($a)]++;
}
$MaxV = 0;
foreach( $DimAlias as $k=>$v ) if( $v>$MaxV ){
$MaxV = $v;
$Alias = $k;
}
}
}else{
$DimAlias = array();
$tmp = explode(',',$sCampos);
for( $n=0; $n<count($tmp); $n++ ){
list( $a ) = explode('.',$tmp[$n]);
$DimAlias[trim($a)]++;
}
$MaxV = 0;
foreach( $DimAlias as $k=>$v ) if( $v>$MaxV ){
$MaxV = $v;
$Alias = $k;
}
}
}
return $Alias;
}
function CamposABorrar( &$sCampos, &$DimDelDato=NULL, $Alias=NULL, $ConDebug=NULL ){
if( $ConDebug ) echo '<FONT FACE="monospace">Antes..: '.$sCampos.'</FONT><br>';
$BorrarCampos = false;
$txt = '';
$tmp = explode(',',$sCampos);
for( $n=0; $n<count($tmp); $n++ ){
$DimDelDato[$n] = false;
$tmp[$n] = trim($tmp[$n]);
if( substr_count( $tmp[$n], ' ' ) > 0 ){
if( $ConDebug ) echo '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$n.': '. $tmp[$n].' [NO]<br>';
$DimDelDato[$n] = true;
$BorrarCampos = true;
continue;
}else if( substr_count( $tmp[$n], '.' ) > 0 ){
list( $sAlias, $tmp[$n] ) = explode('.',$tmp[$n]);
if( $sAlias!=$Alias ){
if( $ConDebug ) echo '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Campo descartado por alias: ['.$sAlias.']!=['.$Alias.'] - '.$tmp[$n].'<br>';
$DimDelDato[$n] = true;
$BorrarCampos = true;
continue;
}
}else if( $tmp[$n][0]=='_' ){
if( $ConDebug ) echo '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$n.': '. $tmp[$n].' [NO]<br>';
$DimDelDato[$n] = true;
$BorrarCampos = true;
continue;
}
if( $ConDebug ) echo '&nbsp;&nbsp;&nbsp;'.$n.': '. $tmp[$n].' [SI]<br>';
if( $txt!='' ) $txt .= ',';
$txt .= $tmp[$n];
}
$sCampos = $txt;
if( $ConDebug ) echo '<FONT FACE="monospace">Despues: '.$sCampos.'</FONT><br><br>';
return $BorrarCampos;
}
function CalculaFileIndex($IndiceHijo, $FieldNomFile, $sCampos, &$posNomFile, &$posIndiceHijo){
$xCampos = explode(',',$sCampos);
for($r=0; $r<count($xCampos); $r++){
if( $IndiceHijo==trim($xCampos[$r]) ) $posIndiceHijo = $r;
if( $FieldNomFile==trim($xCampos[$r]) ) $posNomFile = $r;
}
return -1;
}
function ValoresABorrar(&$DimSubLista, $nSubLista, $sTReg, $DimDelDato=NULL, $ConDebug=NULL){
if( $ConDebug ) echo ': BORRANDO COLUMNAS ELIMINADAS<br>';
$i = $nSubLista;
for($r=0; $r<$sTReg; $r++){
$i++;
if( $DimSubLista[$i]!='' ){
$ConDatos = false;
$txt = '';
$tmp = explode('|', $DimSubLista[$i]);
for($n=0; $n<count($tmp); $n++){
if( !$DimDelDato[$n] ){
if( $ConDatos ) $txt .= '|';
$txt .= $tmp[$n];
$ConDatos = true;
}
}
$DimSubLista[$i] = $txt;
if( substr($DimSubLista[$i],-1)<>'|' ) $DimSubLista[$i] = $DimSubLista[$i].'|';
}
}
}
function BorrarTodosLosDatos($TablaHijo, $WhereHijos, $IndiceHijo, $FieldNomFile, $NomDirectorio, $NomSublist, $ConDebug){
global $_SUBLISTDELETE;
$AddWhere = "";
if( isset($_SUBLISTDELETE) ){
if( gettype($_SUBLISTDELETE)=="string" && $_SUBLISTDELETE<>"" ){
$AddWhere = " and ".$_SUBLISTDELETE;
}else if( gettype($_SUBLISTDELETE)=="array" && $_SUBLISTDELETE[$NomSublist]<>"" ){
$AddWhere = " and ".$_SUBLISTDELETE[$NomSublist];
}
}
if( $FieldNomFile!='' ){
if( $ConDebug ) echo "select {$IndiceHijo}, {$FieldNomFile} from {$TablaHijo} where {$WhereHijos} (para borrar ficheros)".'<br>';
qQuery( "select {$IndiceHijo}, {$FieldNomFile} from {$TablaHijo} where {$WhereHijos}" );
while( $row=qRow() ){
$NomExt = substr($row[1], strrpos($row[1],'.'));
if( $ConDebug ){
echo '> BORRA FILE: unlink('.$NomDirectorio.trim($row[0]).$NomExt.');<br>';
}else{
@unlink($NomDirectorio.trim($row[0]).$NomExt);
@unlink($NomDirectorio.trim($row[0]).$NomExt.'.bak');
}
}
}
if( $ConDebug ){
echo "delete from {$TablaHijo} where {$WhereHijos}{$AddWhere}".'<br>';
}else{
qQuery( "delete from {$TablaHijo} where {$WhereHijos}{$AddWhere}" );
}
}
function BorrarRegQueNoVienen($TablaHijo, $WhereHijos, $IndicePadre, $IndiceHijo, $NotIn, $FieldNomFile, $NomDirectorio, $NomSublist, $eAddWhere, $ConDebug){
global $_SUBLISTDELETE;
$AddWhere = "";
if( isset($_SUBLISTDELETE) ){
if( gettype($_SUBLISTDELETE)=="string" && $_SUBLISTDELETE<>"" ){
$AddWhere = " and ".$_SUBLISTDELETE;
}else if( gettype($_SUBLISTDELETE)=="array" && $_SUBLISTDELETE[$NomSublist]<>"" ){
$AddWhere = " and ".$_SUBLISTDELETE[$NomSublist];
}
}
if( trim($eAddWhere)!="" ) $AddWhere = " and ".$eAddWhere;
if( $ConDebug ) echo ': BORRA LOS REGISTROS Y LOS FICHEROS QUE NO VIENEN<br>';
if( $NotIn!='' ) $NotIn = " and {$IndiceHijo} not in ( {$NotIn} )";
if( $FieldNomFile!='' ){
if( $ConDebug ) echo "select {$IndiceHijo}, {$FieldNomFile} from {$TablaHijo} where {$WhereHijos} {$NotIn} (para borrar ficheros de reg borrados)".'<br>';
qQuery( "select {$IndiceHijo}, {$FieldNomFile} from {$TablaHijo} where {$WhereHijos} {$NotIn}" );
while( $row=qRow() ){
$NomExt = substr( $row[1], strrpos($row[1],'.') );
if( $ConDebug ){
echo '> BORRA FILE: unlink('.$NomDirectorio.trim($row[0]).$NomExt.');<br>';
}else{
@unlink( $NomDirectorio.trim($row[0]).$NomExt );
@unlink( $NomDirectorio.trim($row[0]).$NomExt.'.bak' );
}
}
}
if( $ConDebug ){
echo "delete from {$TablaHijo} where {$WhereHijos} {$NotIn}{$AddWhere}".'<br>';
}else{
qQuery( "delete from {$TablaHijo} where {$WhereHijos} {$NotIn}{$AddWhere}" );
}
}
function QuitaAliasIndicePadre(&$DimCampoIndicePadre){
for( $r=0; $r<count($DimCampoIndicePadre); $r++ ){
$DimCampoIndicePadre[$r] = trim($DimCampoIndicePadre[$r]);
if( substr_count( $DimCampoIndicePadre[$r], '.' ) > 0 ){
$tmp = explode('.',$DimCampoIndicePadre[$r]);
$DimCampoIndicePadre[$r] = $tmp[1];
}
}
}
function CopiarFicheroNET($_FicheroACopiar, $ConDebug){
$oFile = $_FicheroACopiar[0];
if( $oFile!='' ){
$dFile = $_FicheroACopiar[1].$_FicheroACopiar[4].$_FicheroACopiar[2].'.'.$_FicheroACopiar[3];
if( $ConDebug ){
echo '> Copiar fichero ['.$oFile.'] > ['.$dFile.']<br>';
for($n=0; $n<count($_FicheroACopiar); $n++) echo '$'."_FicheroACopiar[{$n}] = ".$_FicheroACopiar[$n].'<br>';
}else{
if( file_exists($dFile.'.bak') ) @unlink($dFile.'.bak');
if( file_exists($dFile) ) @rename($dFile, $dFile.'.bak');
if( file_exists($oFile) ){
@rename($oFile, $dFile);
}
}
}
}
function LeerFormStatic($File, $_ObjetoID){
$TParametros = 0;
$Dim = file($File);
for($i=0; $i<count($Dim); $i++){
$buffer = trim($Dim[$i]);
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
switch( $Etiqueta ){
case 'DBTABLE':
$tmp[0] = _InVar($tmp[0]);
$_DBTABLE = $tmp[0];
$TParametros++;
break;
case 'DBINDEX':
list($_DBINDEX) = explode( ';', $tmp[0] );
$_DBINDEX = str_replace(' ','',$_DBINDEX);
$TParametros++;
break;
case 'DBSERIAL':
$_DBSERIAL = array($_DBTABLE, $tmp[0], '');
if( $tmp[1]!='' ) $_DBSEQUENCE = $tmp[1];
break;
case 'FORMSTATIC':
$TParametros++;
$_ChildrenData = explode('|', substr($buffer,13));
for($n=0; $n<5; $n++) $_ChildrenData[$n] = str_replace(', ',',',str_replace(' ,',',',trim($_ChildrenData[$n])) );
$oCampos = '';
$dCampos = '';
$tmp = explode(',',$_ChildrenData[1]);
for($n=0; $n<count($tmp); $n++){
list($tmp2, $tmp3) = explode('=',trim($tmp[$n]));
if( $tmp2[0]!='"' && $tmp2[0]!="'" && $tmp2[0]!="_" ) $dCampos .= $tmp2.',';
if( $tmp3=="" ) {
$oCampos .= $tmp2.',';
}else if( $tmp3!="IMG" ){
if( $tmp3[0]=="*" ){
$oCampos .= "_INPUT_".substr($tmp3,1).',';
}else{
$oCampos .= $tmp3.',';
}
}
}
$dCampos = substr($dCampos,0,-1);
break;
case 'UPLOADFILE';
$TParametros++;
global $_Objeto;
$tmp = explode('|', substr($buffer,12));
$_Objeto[$_ObjetoID]['SUBDIR'] = trim($tmp[1]);
$_Objeto[$_ObjetoID]['oDIR'] = trim($tmp[1]);
$_Objeto[$_ObjetoID]['PREFIJO'] = trim($tmp[6]);
break;
case 'NOTE':
$i = count($Dim);
break;
}
}
if( $_DBINDEX=="" && count($_DBSERIAL)>0 ){
$_DBINDEX = $_DBSERIAL[1];
$TParametros++;
}
if( $TParametros==3 || $TParametros==4 ){
return(array($_ChildrenData[0].'|'.$_DBTABLE.'|#|'.$dCampos.'|'.$_DBINDEX, substr($oCampos,0,-1)));
}
eMessage('ERROR: La definición "[SubList] '.substr($_ObjetoID,1,-1).'" con "FormStatic" tiene<br>que tener las etiquetas [DBTable], [DBIndex] y [FormStatic]','HES');
exit;
}
function _FormStaticFields($File, $Opcion){
$Dim = file($File);
$okForm = false;
$form = array();
for($i=0; $i<count($Dim); $i++){
$buffer = trim($Dim[$i]);
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
switch( $Etiqueta ){
case 'FIELDS':
if($okForm) break;
if( $tmp[0][0]=='#' ){
if( $_Variable[$tmp[0]] ){
$TipoEntrada = $Comando;
break;
}
}else if( $tmp[0][0]=='$' ){
if( _ExeEval($tmp[0], $buffer) ){
$TipoEntrada = $Comando;
if( ord($tmp[1][0])>48 && ord($tmp[1][0])<58 ){
$_TCol = $tmp[1] * 1;
$OkModo = true;
}
break;
}
}
if( !empty($tmp[0]) ){
if( ord($tmp[0][0])>48 && ord($tmp[0][0])<58 ){
$_TCol = $tmp[0] * 1;
$OkModo = true;
}else{
$cModo = explode(',', $tmp[0]);
$OkModo = (count(array_intersect($cModo, $DimOpcion))>0 );
if( strtoupper($tmp[0])=='ELSE' && count($_Form)==0 ) $OkModo = true;
if( !$OkModo ) break;
}
}else{
$OkModo = true;
}
if( !empty($tmp[1]) ){
if( ord($tmp[1][0])>48 && ord($tmp[1][0])<58 ){
$_TCol = $tmp[1] * 1;
$OkModo = true;
}else{
$cModo = explode(',', $tmp[1]);
$OkModo = (count(array_intersect($cModo, $DimOpcion))>0 );
if( strtoupper($tmp[1])=='ELSE' && count($_Form)==0 ) $OkModo = true;
}
}
if( $OkModo ){
$TipoEntrada = $Comando;
}
break;
case 'FORMSTATIC':
$form["FORMSTATIC"] = array();
$_ChildrenData = explode('|', substr($buffer,13));
for($n=0; $n<5; $n++) $_ChildrenData[$n] = str_replace(', ',',',str_replace(' ,',',',trim($_ChildrenData[$n])) );
$dCampos = '';
$tmp = explode(',',$_ChildrenData[1]);
for($n=0; $n<count($tmp); $n++){
list($tmp2, $tmp3) = explode('=',trim(str_replace(' ', '', $tmp[$n])));
if( $tmp2[0]!='"' && $tmp2[0]!="'" && $tmp2[0]!="_" ){
$dCampos .= $tmp2.',';
if( $tmp3=="" ) $tmp3 = $tmp2;
$form["FORMSTATIC"][$tmp2] = $tmp3;
}
}
$dCampos = substr($dCampos,0,-1);
break;
case 'NOTE':
$i = count($Dim);
break 2;
}
if( $TipoEntrada=="_FIELDS" && $OkModo ){
$okForm = true;
for($n=$i+1; $n<count($Dim); $n++){
$buffer = trim($Dim[$n]);
if( $buffer[0]=="[" ){
$i = $n;
break;
}
if( $buffer!="" && $buffer[0]!="." && $buffer[0]!="-" ){
$tmp = explode("|", str_replace(' ', '', $buffer));
$form[eFieldName($tmp[1])] = $tmp;
}
}
$i = $n-1;
$TipoEntrada = "#";
}
}
return $form;
}
?>
