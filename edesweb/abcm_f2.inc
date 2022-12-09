<?PHP
if( $_SESSION["SearchWithLike"] && preg_match('/^(cR|bR|mR)$/', $_Mode) ){
for($n=0; $n<count($_Form); $n++){
if( $_Form[$n][3]=="T" && !preg_match('/^(F4|P4|CDI|\+|\-|\+,|\-,|C|\*)$/', $_Form[$n][2]) ){
if( $_POST[$_Form[$n][1]]!="" && strlen($_POST[$_Form[$n][1]])<$_Form[$n][4] && !preg_match('/^(<|>|=)/', $_POST[$_Form[$n][1]][0]) ){
if( $_POST[$_Form[$n][1]][0]!="*" ) $_POST[$_Form[$n][1]] = "*".$_POST[$_Form[$n][1]];
if( substr($_POST[$_Form[$n][1]],-1)!="*" ) $_POST[$_Form[$n][1]] = $_POST[$_Form[$n][1]]."*";
}
}
}
}
$_NotInTemporary = "";
foreach($_POST as $k=>$v){
if( substr($k,0,8)=="_FILTER_" && isset($_POST[substr($k,8)]) ){
$inOut = "in";
$newValor = "";
$v = str_replace(
array(".", "&#13;", "&#10;"),
array("&#46;", chr(13), chr(10)),
$v
);
$dim = explode(chr(13), str_replace(",", chr(13), $v));
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( $txt<>"" ){
if( $txt=="<>" ){
$inOut = "out";
continue;
}else if( $txt=="!=" ){
$inOut = "list";
if( eSqlType('mysql,mysqli') ){
qQuery('CREATE TEMPORARY TABLE _seek (
valor varchar(120) NOT NULL
)');
}else if( eSqlType('informix') ){
qQuery('CREATE TEMP TABLE _seek (
valor varchar(120) NOT NULL
)');
}else if( eSqlType('oracle') ){
qQuery('DECLARE LOCAL TEMPORARY TABLE _seek (
valor varchar(120) NOT NULL
)');
}
$_POST[substr($k,8)] = "";
$_NotInTemporary = substr($k,8);
continue;
}
if( $inOut=="list" ){
qQuery("insert into _seek (valor) values ('{$txt}')");
}else{
$tipo = $_pField[substr($k,8)][2];
if( preg_match('/^(\-|\+)$/', $tipo) ){
$txt = str_replace(".", "", $txt);
}else if( preg_match('/^(\-\,|\+\,)$/', $tipo) ){
$txt = str_replace(array(".",","), array("","."), $txt);
}else if( preg_match('/^(F4|P4|CDI)$/', $tipo) ){
$txt = eDataFormat($txt, $tipo, "d");
}
if( $newValor<>"" ) $newValor .= ",";
$newValor .= "'{$txt}'";
}
}
}
if( trim($newValor)<>"" ){
if( $inOut=="in" ){
$_POST[substr($k,8)] = "({$newValor})";
$_POST[$k] = "S";
}else if( $inOut=="out" ){
$_POST[substr($k,8)] = "){$newValor}(";
$_POST[$k] = "S";
}
}
}
}
if( $Opcion=='M' || $Opcion=='A' || $Opcion=='B' ){
include("../../edesweb/sanitizar.inc");
}
if( $_DBADDFILTER[0]=='=' ){
$_DBADDFILTEREXTRA = substr($_DBADDFILTER,1);
if( substr($_DBADDFILTEREXTRA,-1)==')' || substr($_DBADDFILTEREXTRA, -1)==';' ){
list($NomFunc) = explode('(', $_DBADDFILTEREXTRA);
if( function_exists($NomFunc) ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$_DBADDFILTEREXTRA.';');
$_DBADDFILTEREXTRA = eval('return '.$_DBADDFILTEREXTRA.';');
}
}
$_DBADDFILTER = '';
}
$_DBADDFILTER = str_replace('#.','',$_DBADDFILTER);
include_once($Dir_.'condicion.inc');
if( isset($_POST) ){
if( $_POST['_SAVEDATALIST']!='' ) $_SAVEDATALIST = $_POST['_SAVEDATALIST'];
}else if( $_POST['_SAVEDATALIST']!='' ) $_SAVEDATALIST = $_POST['_SAVEDATALIST'];
$tmpAutoMenu = ($_STOP) ? 'eAutoMenu(0);':'';
if( $_VarSesion ){
switch( $Opcion ){
case 'mR':
case 'cR':
for($n=0; $n<count($_Form); $n++){
if( $_Form[$n][1]=='_CacheSrv' ){
$_Fila[$_Form[$n][1]] = (($_SESSION[$_Form[$n][1]]==true) ? 'S':'');
}else{
$_Fila[$_Form[$n][1]] = $_SESSION[$_Form[$n][1]];
}
}
return;
case 'M':
$SoloFile = false;
if( $_UPLOADFILE[$_Form[0][1]]['NOMBRE']!='' ){
if( $_UPLOADFILE[$_Form[0][1]]['NOMBRE'][0]=='=' ){
$SoloFile = true;
if( $_POST['_FIELDSWITHFILES']!='' ) _FileGetContents($Opcion);
eMessage($__Lng[131], 'HS');
return;
}
}
$DimNomVar = array_keys($_POST);
$DimValor  = array_values($_POST);
for($n=0; $n<count($DimNomVar); $n++){
if( $DimNomVar[$n]=='_CacheSrv' ){
$_SESSION['_CacheSrv'] = (($DimValor[$n]=='S') ? true:false);
}else{
$_SESSION[$DimNomVar[$n]] = $DimValor[$n];
}
}
eMessage($__Lng[86], 'HS');
return;
default:
eMessage($__Lng[87], 'HSE');
}
}
if( $_VarFile!='' ){
include_once($Dir_.'fplano.inc');
return;
}
$Grabar = '';
$Busca = '';
$NTX = '';
$NTX2 = '';
$_WHERE = &$NTX;
$DimIndice = explode(',', $_DBINDEX);
$ValIndice = array();
for($n=0; $n<count($DimIndice); $n++){
$DimIndice[$n] = trim( $DimIndice[$n] );
if( substr_count($DimIndice[$n], '.')>0 ) $DimIndice[$n] = substr($DimIndice[$n], strpos($DimIndice[$n],'.'));
$ValIndice[$n] = '';
}
if( $_DBINDEX2!='' ){
$DimIndice2 = explode(',', str_replace(' ','',$_DBINDEX2));
$ValIndice2 = array();
for($n=0; $n<count($DimIndice2); $n++){
$DimIndice2[$n] = trim( $DimIndice2[$n] );
if( substr_count( $DimIndice2[$n], '.' ) > 0 ) $DimIndice2[$n] = substr( $DimIndice2[$n], strpos($DimIndice2[$n],'.') );
$ValIndice2[$n] = '';
}
}
if( $_DBINDEX3!='' ){
$DimIndice3 = explode(',', str_replace(' ','',$_DBINDEX3));
$ValIndice3 = array();
for($n=0; $n<count($DimIndice3); $n++){
$DimIndice3[$n] = trim($DimIndice3[$n]);
if( substr_count($DimIndice3[$n], '.')>0 ) $DimIndice3[$n] = substr($DimIndice3[$n], strpos($DimIndice3[$n],'.'));
$ValIndice3[$n] = '';
}
}
$DimOtrosCampos = array();
if( count($_DBTABLERELATION)>0 && ($Opcion=='M' || $Opcion=='B' || $Opcion=='mR') ){
for($e=0; $e<count($_DBTABLERELATION); $e++){
$tmp = explode(',',$_DBTABLERELATION[$e][1]);
for($n=0; $n<count($tmp); $n++){
$tmp[$n] = trim($tmp[$n]);
if( $Opcion!='mR' ) $DimOtrosCampos[$tmp[$n]] = true;
for($i=0; $i<count($_Form); $i++) if( $_Form[$i][1]==$tmp[$n] ) $_Form[$i][6] = '-';
}
}
}
if( substr_count($_DBADDFILTER, '{')>0 && substr_count($_DBADDFILTER, '}')>0 ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$_DBADDFILTER.';');
$_DBADDFILTER = eval('return "'.$_DBADDFILTER.'";');
}else if( (substr_count($_DBADDFILTER, '()')==1 || substr_count($_DBADDFILTER, '( )')==1) && substr_count($_DBADDFILTER, 'now()')==0 ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$_DBADDFILTER.';');
$_DBADDFILTER = eval('return '.$_DBADDFILTER.';');
}
if( !isset($_SEEK) ){
$DimNomVar  = array_keys($_POST);
$DimValor   = array_values($_POST);
$DimValorIn = array_values($_POST);
$VarInicial = 0;
for($n=$VarInicial; $n<count($DimNomVar); $n++){
if( trim($DimNomVar)=="" ) continue;
$DimValor[$n] = trim( $DimValor[$n] );
if( $_TypeField[$DimNomVar[$n]]!='F4' && $_TypeField[$DimNomVar[$n]]!='P4' ){
if( substr_count($DimValor[$n], '" and ')==0 && !$_DBMEMO[$DimNomVar[$n]] ){
}
}
$_vF[$DimNomVar[$n]] = $DimValor[$n];
if( $_DBMEMO[$DimNomVar[$n]] ){
if( eSqlType('pdo.informix') ){
$_MemoContenido[] = $DimValor[$n];
}else if( eSqlType('informix') ){
$_MemoContenido[] = ifx_create_blob(1, 0, $DimValor[$n]);
}
}
if( substr($DimNomVar[$n],0,6)=="_FILE_" && $DimValor[$n]!="" ){
for($i=0; $i<count($DimNomVar); $i++){
if( $DimNomVar[$i]==substr($DimNomVar[$n],6) ){
eExplodeLast($DimValor[$i], ".", $iz, $dch);
if( $dch!="" ){
$DimValor[$i] = $iz.".".strtolower($dch);
$_POST[$DimNomVar[$i]] = $DimValor[$i];
$_vF[$DimNomVar[$i]] = $DimValor[$i];
}
break;
}
}
}
}
if( $_DBINI!='' ){
$sMSGANSWER = $_MSGANSWER;
$sMSGANSWEROK = $_MSGANSWEROK;
$_MSGANSWER = '';
$_MSGANSWEROK = '';
if( $_SAVEDATALIST!='' && isset($_SubListGetRecords) ){
include_once($Dir_.'formstatic.inc');
if( function_exists("UpdateSubList") ) UpdateSubList($Opcion);
$_SubListGetRecords = GrabaSubLista($Opcion, true);
}
$tmpFile = GrabaTmp('f_dbini', $_DBINI, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_DBINI);
$DimNomVar = array();
$DimValor = array();
$n = 0;
foreach($_vF as $k=>$v){
$DimNomVar[$n] = $k;
$DimValor[$n] = $v;
$n++;
}
if( isset($_CHECKDELETE) && $_CHECKDELETE!='' ) include_once($Dir_.'checkdelete.inc');
$_MSGANSWER = $sMSGANSWER;
$_MSGANSWEROK = $sMSGANSWEROK;
}
$xCampos = '';
$xValores = '';
for($n=$VarInicial; $n<count($DimNomVar); $n++){
$DimNomVar[$n] = trim($DimNomVar[$n]);
$DimValor[$n] = trim($DimValor[$n]);
if( $MemDBRange[$DimNomVar[$n]]=="" ){
$DimValor[$n] = str_replace('"','&quot;',$DimValor[$n]);
}else{
if( !(substr_count($DimValor[$n],'"')==2 && substr($DimValor[$n],-11,1)=='"' && substr_count(substr($DimValor[$n],11,2), '"')==1) ){
$DimValor[$n] = str_replace('"','&quot;',$DimValor[$n]);
}
}
foreach($_SESSION["CHECK"] as $k=>$v){
if( $DimNomVar[$n]==$k && isset($_SESSION[$v]) && $DimValor[$n]<>$_SESSION[$v] ){
$error = "Operación no permitida";
if( $_SESSION['_D_']!='' ) $error = "1: Valor de variable de sesión no permitida: {$k}<>".$_SESSION[$v];
eMessage($error, 'HSE');
}
}
if( $_ConDBRange[$DimNomVar[$n]] ) $DimValor[$n] = stripslashes( $DimValor[$n] );
if( $DimNomVar[$n][0]=='_' || $DimNomVar[$n]=='PHPSESSID' ) continue;
if( substr($DimNomVar[$n],0,4)=='dct_' && $DimValor[$n]!='' ){
if( substr_count(',B,M,', ",{$Opcion},")==1 ){
$Esta = false;
for($i=0; $i<count($_DCT); $i++) if( $_DCT[$i]==$DimNomVar[$n] ) $Esta = true;
if( !$Esta ) $_DCT[] = $DimNomVar[$n];
}else if( substr_count($Opcion,'R')==1 ){
if( $Busca!='' ) $Busca .= ' and ';
if( substr_count($_DBTABLE, 'gs_dct zz ')==0 ){
$_DBTABLE .= ', gs_dct zz ';
$Busca .= $_DBSERIAL[1].'=zz.dct_serial and ';
}
$Busca .= "zz.dct_field='{$DimNomVar[$n]}{$_DCT_SUFFIX}' and (";
$xBusca = '';
$tmp = explode(',', str_replace('  ',' ',trim($DimValor[$n])));
for($p=0; $p<count($tmp); $p++){
if( $xBusca!='' ) $xBusca .= ' or ';
if( substr_count($tmp[$p], '*')>0 ){
$xBusca .= 'zz.dct_work like "'.str_replace( '*','%',trim($tmp[$p])).'"';
}else{
$xBusca .= 'zz.dct_work="'.trim($tmp[$p]).'"';
}
}
$Busca .= $xBusca.')';
$DimValor[$n] = '';
}
}
if( count($_DBSERIAL)==0 || (count($_DBSERIAL)>0 && $_DBSERIAL[1]!=$DimNomVar[$n]) ){
if( strlen($Grabar)>0 ) $Grabar .= ',';
if( $xCampos!='' ) $xCampos .= ',';
if( $xValores!='' ) $xValores .= ',';
$xCampos .= $DimNomVar[$n];
if( $_DBMEMO[$DimNomVar[$n]] && eSqlType('informix') && $Opcion=='A' ){
$Grabar .= $DimNomVar[$n].'=?';
$xValores .= '?';
}else{
if( ($Opcion=='A' || $Opcion=='M' ) && $DimValor[$n]=="" ) $DimValor[$n] = "NULL";
if( !$DimOtrosCampos[$DimNomVar[$n]] ){
if( $DimValor[$n]=='NULL' ){
$Grabar .= $DimNomVar[$n]."=".str_replace("'","''",$DimValor[$n]);
$xValores .= $DimValor[$n];
}else if( preg_match('/(\+|\-)/', $_pField[$DimNomVar[$n]][2][0]) ){
$Grabar .= $DimNomVar[$n]."=".($DimValor[$n]*1);
$xValores .= ($DimValor[$n]*1);
}else if( $_pField[$DimNomVar[$n]][2]=="F4" && rtrim($DimValor[$n])=="" ){
$Grabar .= $DimNomVar[$n]."=NULL";
$xValores .= 'NULL';
}else if( eSqlType('oracle') ){
$Grabar .= $DimNomVar[$n]."='".str_replace("'","''",$DimValor[$n])."'";
$xValores .= "'".str_replace("'","''",$DimValor[$n])."'";
}else{
$Grabar .= $DimNomVar[$n].'="'.$DimValor[$n].'"';
$xValores .= '"'.$DimValor[$n].'"';
}
}
}
}
if( is_array($_POST[$DimNomVar[$n]]) ){
$iValor = '';
while( list($clave, $val) = each($_POST[$DimNomVar[$n]]) ){
if( $iValor!='' ) $iValor .= '|';
$iValor .= $val;
}
$DimValor[$n] = $iValor;
$sBusca = CondiSQL($DimNomVar[$n].'[]', $DimValor[$n]);
}else{
if( eSqlType('oracle') ){
$sBusca = CondiSQLOracle($DimNomVar[$n], $DimValor[$n]);
}else{
$sBusca = CondiSQL($DimNomVar[$n], $DimValor[$n]);
}
}
if( $sBusca!='' ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $sBusca;
}
if( in_array($DimNomVar[$n], $DimIndice) ){
if( !empty($NTX) ) $NTX .= ' and ';
if( eSqlType('oracle') ){
$NTX .= $DimNomVar[$n]."='".str_replace("'","''",$DimValor[$n])."' ";
}else{
$NTX .= $DimNomVar[$n].'="'.$DimValor[$n]. '" ';
}
$ValIndice[$n] = $DimValor[$n];
}
if( $_DBINDEX2!='' ){
if( in_array($DimNomVar[$n], $DimIndice2) ){
if( preg_replace('/[0 .]/', '', $DimValor[$n])=='' && substr_count($_DBINDEX2,',')==0 ){
}else{
if( $NTX2!='' ) $NTX2 .= ' and ';
if( eSqlType('oracle') ){
$NTX2 .= $DimNomVar[$n]."='".str_replace("'","''",$DimValor[$n])."' ";
}else{
$NTX2 .= $DimNomVar[$n].'="'.$DimValor[$n]. '" ';
}
$ValIndice2[$n] = $DimValor[$n];
}
}
}
if( $_DBINDEX3!='' ){
if( in_array($DimNomVar[$n], $DimIndice3) ){
if( preg_replace('/[0 .]/', '', $DimValor[$n])=='' && substr_count($_DBINDEX3,',')==0 ){
}else{
if( $NTX3!='' ) $NTX3 .= ' and ';
if( eSqlType('oracle') ){
$NTX3 .= $DimNomVar[$n]."='".str_replace("'","''",$DimValor[$n])."' ";
}else{
$NTX3 .= $DimNomVar[$n].'="'.$DimValor[$n]. '" ';
}
$ValIndice3[$n] = $DimValor[$n];
}
}
}
}
if( substr_count($_Accion, '.file')==1 && $Opcion=='A' ){
if( strlen($NTX)>0 ) $NTX .= ' and ';
if( eSqlType('oracle') ){
if( is_array($FICHERO_name) ){
$NTX .= "FICHERO='".str_replace("'","''",$FICHERO_name[0])."'";
}else{
$NTX .= "FICHERO='".str_replace("'","''",$FICHERO_name)."'";
}
}else{
if( is_array($FICHERO_name) ){
$NTX .= 'FICHERO="'.$FICHERO_name[0].'"';
}else{
$NTX .= 'FICHERO="'.$FICHERO_name.'"';
}
}
}
}else{
$Busca = '';
$NTX = '';
$Dim = array();
$n=-1;
$ok = false;
foreach($_GET as $k=>$v){
if( $v=='' ) continue;
if( substr($k,-1)==":" ) continue;
$c = $k;
$vv = $v;
if( $k[0]=='_' || $v=='' ) continue;
$n++;
$Dim[$n] = $k."='".$v."'";
if( substr_count($Dim[$n],'=')>0 ){
$c = substr($Dim[$n],0,strpos($Dim[$n],'='));
$vv = substr($Dim[$n],strpos($Dim[$n],'=')+1);
}else{
$vv = '';
$c = $Dim[$n];
}
if( $c=='_NOBUTTON' || $c=='_FORMBUTTONS' || $c=='_STOP' ) continue;
if( ($vv[0]=='"' || $vv[0]=="'") && $vv[0]==substr($vv,-1) ){
$vv = substr($vv,1,-1);
}
${$c} = $vv;
foreach($_SESSION["CHECK"] as $k3=>$v3){
if( $c==$k3 && isset($_SESSION[$v3]) && $vv<>$_SESSION[$v3] ){
$error = "Operación no permitida";
if( $_SESSION['_D_']!='' ) $error = "2: Valor de variable de sesión no permitida: {$k3}<>".$_SESSION[$v3];
eMessage( $error, 'HSE' );
}
}
if( trim($c)<>"" && $c[0]!='_' && ($_SEEK || in_array($c, $DimIndice)) && trim($c)!='_PSOURCE' ){
if( !empty($NTX) ) $NTX .= ' and ';
if( ($vv[0]=='"' || $vv[0]=="'") && $vv[0]==substr($vv,-1) ) $vv = substr($vv,1,-1);
if( substr_count($vv, '*')>0 ){
if( eSqlType('oracle') ){
$NTX .= CondiSQLOracle($c, $vv);
}else{
$NTX .= CondiSQL($c, $vv);
}
}else{
if( eSqlType('oracle') ){
$tNTX = CondiSQLOracle($c, $vv);
}else{
$tNTX = CondiSQL($c, $vv);
}
if( $tNTX=='' )	$tNTX = $c."=''";
$NTX .= $tNTX;
}
}
$_vF[$c] = $vv;
$Busca = $NTX;
if( $_DBINDEX2!='' ){
if( in_array($c, $DimIndice2) ){
if( preg_replace('/[0 .]/', '', $DimValor[$n])=='' && substr_count($_DBINDEX2,',')==0 ){
}else{
if( $NTX2!='' ) $NTX2 .= ' and ';
$NTX2 .= $Dim[$n];
}
}
}
if( $_DBINDEX3!='' ){
if( in_array($c, $DimIndice3) ){
if( preg_replace('/[0 .]/', '', $DimValor[$n])=='' && substr_count($_DBINDEX3,',')==0 ){
}else{
if( $NTX3!='' ) $NTX3 .= ' and ';
$NTX3 .= $Dim[$n];
}
}
}
}
}
if( (substr_count($Opcion,'R')>0 || substr_count('ABM',$Opcion)>0) && $_DBADDFILTER!='' ){
if( strlen($Busca)>0 ) $Busca .= ' and ';
$Busca .= $_DBADDFILTER;
if( strlen($NTX)>0 ) $NTX .= ' and ';
$NTX .= $_DBADDFILTER;
}
if( $_DEBUG==5 || $_DEBUG==6 ) include($Dir_.'debug5.inc');
if( $_NotInTemporary<>"" ){
$_Accion = 'L';
unset($_AUX_, $_ORDEN_, $_DESTINO_);
include($Dir_.'_lista.gs');
eEnd();
}
if( $Opcion=='L' ){
include($Dir_.'exportar.inc');
}
if( $_REG_!='' ){
$Busca = '';
eInit();
$__='{#}eDes{#}';
$_Accion='L'; include($Dir_.'_lista.gs');
eEnd();
}
if( $Opcion!='A' && $Opcion!='S' && $Opcion!='Q' && $Busca=='' && $_DBINDEX!='' && !$_PDFLABEL ){
if( $_LOGFULLSTATUS && $_SESSION["_LOGFULLTYPE"]!=$_LOGFULLTYPE ) $_LOGFULLSTATUS = false;
$Busca = '';
eInit();
$__='{#}eDes{#}';
$_Accion='L'; include($Dir_.'_lista.gs');
eEnd();
}
$ListCampos = '*';
if( count($_DBTABLERELATION)>0 && $Opcion!='M' && $Opcion!='B' ){
$Busca = ' '.$Busca;
for($e=0; $e<count($_DBTABLERELATION); $e++){
$tmp = explode(',',$_DBTABLERELATION[$e][1]);
for($n=0; $n<count($tmp); $n++){
$tmp[$n] = trim($tmp[$n]);
if( eSqlType('oracle') ){
$Busca = str_replace(' '.$tmp[$n]."='" , ' '.$_DBTABLERELATION[$e][0].'.'.$tmp[$n]."='"	  , $Busca);
}else{
$Busca = str_replace(' '.$tmp[$n].'="' , ' '.$_DBTABLERELATION[$e][0].'.'.$tmp[$n].'="'	  , $Busca);
}
$Busca = str_replace(' '.$tmp[$n].' like ', ' '.$_DBTABLERELATION[$e][0].'.'.$tmp[$n].' like ', $Busca);
}
}
$ListCampos = ',';
for($n=0; $n<count($_Form); $n++){
if( eSqlType('oracle') ){
$Busca = str_replace(' '.$_Form[$n][1]."='"	, ' '.$_DBTABLE.'.'.$_Form[$n][1]."='"	 , $Busca);
}else{
$Busca = str_replace(' '.$_Form[$n][1].'="'	, ' '.$_DBTABLE.'.'.$_Form[$n][1].'="'	 , $Busca);
}
$Busca = str_replace(' '.$_Form[$n][1].' like ', ' '.$_DBTABLE.'.'.$_Form[$n][1].' like ', $Busca);
if( $_Form[$n][0][0]!='-' ) $ListCampos .= $_DBTABLE.'.'.$_Form[$n][1].',';
}
for($e=0; $e<count($_DBTABLERELATION); $e++ ){
$tmp = explode(',',$_DBTABLERELATION[$e][1]);
for($n=0; $n<count($tmp); $n++){
$tmp[$n] = trim($tmp[$n]);
$ListCampos = str_replace(','.$_DBTABLE.'.'.$tmp[$n].',' , ','.$_DBTABLERELATION[$e][0].'.'.$tmp[$n].',', $ListCampos);
}
}
$ListCampos = substr($ListCampos,1,-1);
$_DBORDER = ','.$_DBORDER.',';
for($n=0; $n<count($_Form); $n++){
$_DBORDER = str_replace(','.$_Form[$n][1].',', ",{$_DBTABLE}.".$_Form[$n][1].',', $_DBORDER);
}
$tmp = explode(',',$_DBORDER);
for($n=0; $n<count($tmp); $n++){
$tmp[$n] = trim($tmp[$n]);
$_DBORDER = str_replace(','.$tmp[$n].',', ",{$_DBTABLE}.".$tmp[$n].',', $_DBORDER);
}
$_DBORDER = substr($_DBORDER,1,-1);
for($e=0; $e<count($_DBTABLERELATION); $e++){
if( !eSqlType('mysql,mysqli') ){
if( trim($Busca)!='' ) $Busca .= ' and '.$_DBTABLERELATION[$e][2];
$_DBTABLE .= ', '.$_DBTABLERELATION[$e][0];
}else{
$_DBTABLE .= ' left join '.$_DBTABLERELATION[$e][0].' on '.$_DBTABLERELATION[$e][2];
}
}
$Ficha_DBTABLE = $_DBTABLE;
}
if( $Opcion!='S' ){
if( $Opcion=='M' && $_ModCampoIndice ){
$tmp = explode('|', $_UNIQUE_);
$NTX = '';
$Busca = '';
for($i=0; $i<count($tmp); $i+=2){
if( $NTX!='' ) $NTX .= ' and ';
if( $Busca!='' ) $Busca .= ' and ';
if( eSqlType('oracle') ){
$NTX   .= $tmp[$i]."='".str_replace("'","''",$tmp[$i+1])."' ";
$Busca .= $tmp[$i]."='".str_replace("'","''",$tmp[$i+1])."' ";
}else{
$NTX .= $tmp[$i].'="'.$tmp[$i+1].'"';
$Busca .= $tmp[$i].'="'.$tmp[$i+1].'"';
}
}
}
if( substr_count($Opcion,'R')==0 && $Opcion!='L' && $Opcion!='Q' ){
if( $Opcion=='A' && ($_DBINDEX=='' || $_DBINDEX==$_DBSERIAL[1]) ){
$_TReg = 0;
}else{
if( $_DBSQL=="" ){
qCount($_DBTABLE, _qBuscar($NTX,$_DBTABLE));
}else{
$tmpSQL = GrabaTmp('f_dbsql', $_DBSQL, $LenDoc);
include($tmpSQL);
_ShowError($php_errormsg, $tmpSQL, $LenDoc);
unset( $_DBSQL );
}
}
}else{
if( $_DBSQL=="" ){
$where = _qBuscar($Busca, $_DBTABLE);
if( $where!="" && $_DBFILTERIN!="" ) $where .= " and ".(($HaySelect)?"A.":"").$_DBFILTERIN;
qCount($_DBTABLE, $where);
}else{
$tmpSQL = GrabaTmp('f_dbsql', $_DBSQL, $LenDoc);
include($tmpSQL);
_ShowError($php_errormsg, $tmpSQL, $LenDoc);
unset($_DBSQL);
}
}
}
if( $_TReg==0 && count($_DELFILTER)>0 ){
unset($_PHPSESSION);
$_ConDelFilter = true;
$_DelFilterURL = str_replace('{Op}',$Opcion[0],$_DELFILTER[5]);
$ListOriFichero = 'F'.$Opcion.':'.$OriFichero;
$Busca .= ' ';
for( $n=0; $n<count($_DELFILTER[1]); $n++ ){
$_DELFILTER[1][$n] = trim($_DELFILTER[1][$n]);
$p = strpos( $Busca, $_DELFILTER[1][$n].'=' );
$ConLike = strpos( $Busca, $_DELFILTER[1][$n].' ' );
if( strlen($ConLike) > 0 ){
$Busca = substr( $Busca, 0, $ConLike ) . substr( $Busca, strpos( $Busca.' and ', ' and ', $ConLike+1 ) );
$_POST[ $_DELFILTER[1][$n] ] = '';
}else if( strlen($p) > 0 ){
$Busca = substr( $Busca, 0, $p ) . substr( $Busca, strpos( $Busca.' and ', ' and ', $p+1 ) );
$_POST[ $_DELFILTER[1][$n] ] = '';
}
}
if( !empty($_DBADDFILTER) ){
$Busca = str_replace( $_DBADDFILTER, '', $Busca );
}
while( substr_count( $Busca, '  ' ) > 0 ) $Busca = str_replace( '  ', ' ', $Busca );
while( substr_count( $Busca, ' and and ' ) > 0 ) $Busca = str_replace( ' and and ', ' and ', $Busca );
$Busca = str_replace( ' and and ', ' and ', $Busca );
$Busca = trim($Busca);
if( substr( $Busca,-3 ) == 'and' ) $Busca = substr( $Busca, 0, strlen($Busca)-3 );
if( trim($Busca)!='' ) qCount( $_DBTABLE, $Busca );
if( $_DELFILTER[4]!='' ) include( eScript($_DELFILTER[4]) );
if( $_TReg==0 || ($_TReg>1 && strtoupper($_DELFILTER[3])=='NOLIST') ){
eMessage('~NRC', 'HS', $_MSGTIME[1], 'if(window.name=="IWORK")history.go(-1);', 'NR');
}else{
if( !empty($_DBLIMIT ) && $_LimitOn==false && $_TReg>$_DBLIMIT ){
eMessage('~LEA|'.$_TReg, 'HS', 5000, '' ,'LE');
}
if( !empty($_DELFILTER) && substr_count(strtoupper($_DELFILTER[0]), '{OP}')>0 ){
$_DELFILTER[0] = substr($_DELFILTER[0],0,strpos($_DELFILTER[0],'{')). $Opcion .substr($_DELFILTER[0],strpos($_DELFILTER[0],'}')+1);
}
$tmp = explode( ':', $_DELFILTER[0] );
$NomFile = $Fichero = trim($tmp[1]);
$_Accion = $_DELFILTER[0];
$OriFichero = $Fichero;
$Fichero = eScript( $Fichero );
$FicheroD = $Fichero;
$NomFile = 'edes.php';
$_Accion = $_DELFILTER[0];
list( $Opcion, $Fichero ) = explode( ':', substr($_Accion,1) );
$_CambiaURL_ = substr($_Accion,0,strpos($_Accion,':')).':'.$Fichero;
$__='{#}eDes{#}';
if( $_DELFILTER[2]!='' ) $_TITLE_DELFILTER = $_DELFILTER[2];
eInit();
if( $_TReg == 1 ){
switch( $_Accion[0] ){
case 'F': include($Dir_.'_ficha.gs' ); break;
case 'G': include($Dir_.'_gficha.gs'); break;
case 'L': include($Dir_.'_lista.gs' ); break;
case 'E':
$NomFile = substr($_Accion,2);
if( substr_count($NomFile, '(')==1 && substr_count($NomFile, ')')==1 ){
if( substr($NomFile,-1)!=';' ) $NomFile .= ';';
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$NomFile.';');
eval($NomFile.';');
}else{
include(eScript($NomFile));
}
break;
default:
eMessage("~O|{$_Accion}",'HE');
}
}else{
switch( $_Accion[0] ){
case 'F':
case 'G':
case 'L':
include( $Dir_.'_lista.gs' );
break;
case 'E':
$NomFile = substr($_Accion,2);
if( substr_count( $NomFile, '(' )==1 && substr_count( $NomFile, ')' )==1 ){
if( substr($NomFile,-1)!=';' ) $NomFile .= ';';
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$NomFile.';');
eval($NomFile.';');
}else{
include( eScript($NomFile) );
}
break;
default:
eMessage("~O|{$_Accion}",'HE');
}
}
eEnd();
}
}
$_DELFILTER = array();
if( $Opcion=='Q' ){
$sTReg = $_TReg;
qSelect( $_DBTABLE, $ListCampos, _qBuscar($Busca, $_DBTABLE), $_DBORDER );
$_TReg = $sTReg;
eInit();
include(eScript($_DBGATEWAY));
eEnd();
}
if( $Opcion=='S' ){
$_SQL = "select {$ListCampos} from {$_DBTABLE} where {$Busca} order by {$_DBORDER}";
eInit();
include(eScript($_DBGATEWAY));
eEnd();
}
if( $PDF_Formato=='F' || $PDF_Formato=='L' ){
eInit();
$__='{#}eDes{#}';
include( $Dir_.'_lista.gs' );
eEnd();
}
if( $_PDFLABEL && $_TReg>0 ){
eInit();
$_gs_formato_ = 'L';
$__='{#}eDes{#}';
include( $Dir_.'_lista.gs' );
eEnd();
}
$DBAcceso = '';
if( substr_count('ABM', $Opcion)>0 ){
$tmp = explode(',',$_DBINDEX);
for($n=0; $n<count($tmp); $n++){
if( $DBAcceso!='' ) $DBAcceso .= ',';
$DBAcceso .= $tmp[$n].'='.${$tmp[$n]};
}
}
if( $Opcion=='A' || $Opcion=='B' || $Opcion=='M' ){
foreach($_PHPSESSION as $k=>$v){
if( $_POST[$k]<>$v ) eMessage((($_PHPSESSIONMSG=='')?"(F{$Opcion}) Error de Sessión":$_PHPSESSIONMSG),'HSE');
}
}
if( substr_count('ABM',$Opcion)>0 && $_SESSION['_UpdateIntervalDB']>0 ){
if( time()<($_SESSION['_UpdateDB']-(($_FORMSTATIC)? ($_SESSION['_UpdateIntervalDB']/1.5):0)) ){
error_log(date('Y-m-d H:i:s')." ROBOT ".$_SESSION["_User"]."\n", 3, '../_tmp/err/_robot.err');
eInit();
eEnd();
}
$_SESSION['_UpdateDB'] = time()+$_SESSION['_UpdateIntervalDB'];
}
$FilaMod = "";
if( $_DBINSERTONLY ){
if( $Opcion=='M' && $_TReg==1 ){
$tmp = $_DBSERIAL[1].'='.$_POST[$_DBSERIAL[1]];
qQuery("update {$_DBTABLE} set status='H' where {$tmp}");
$_TReg = 0;
$Opcion = 'A';
$_GET["_SUBINSERT"] = 1;
$FilaMod = ", 1";
}
$xCampos .= ",cd_gs_user,cdi";
$xValores .= ",".$_SESSION["_User"].",'".date('Y-m-d H:i:s')."'";
}
if( $_TReg==0 ){
if( $Opcion=='A' ){
eContextGet($NTX);
if( $NTX2!='' ){
if( qCount($_DBTABLE, _qBuscar($NTX2, $_DBTABLE))>0 ){
if( $_FORMSTATIC ) FormStaticError();
eMessage('~DR', 'EH', $_MSGTIME[1], '-1', 'DR');
}
}
if( $NTX3!='' ){
if( qCount($_DBTABLE, _qBuscar($NTX3, $_DBTABLE))>0 ){
if( $_FORMSTATIC ) FormStaticError();
eMessage('~DR', 'EH', $_MSGTIME[1], '-1', 'DR');
}
}
if( $_PHPCHECK<>'' ){
$_vF = $_POST;
$tmpFile = GrabaTmp('f_phpcheck', $_PHPCHECK, $LenDoc, $_FILE_PHPCHECK);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPCHECK);
}
if( $_DEBUG==5 || $_DEBUG==6 ) include($Dir_.'debug5.inc');
if( isset($_POST['_FIELDSWITHFILES']) ){
$nf=0;
$tmp = explode('|',$_POST['_FIELDSWITHFILES']);
for($n=0; $n<count($tmp)-1; $n++){
if( $_POST[$tmp[$n]]!='' && $_UPLOADFILE[$tmp[$n]]['oDIR']=='' ){
$FileTmp = '../_tmp/zip/'.$_SESSION['_User'].'_'.($nf++);
$data = file_get_contents($FileTmp);
if( eSqlType('oracle') ){
$DimBlob[$_UPLOADFILE[$tmp[$n]]['NOMBRE']] = $data;
$xCampos .= ', '.$_UPLOADFILE[$tmp[$n]]['NOMBRE'];
$xValores .= ', EMPTY_BLOB()';
}else{
$xCampos .= ', '.$_UPLOADFILE[$tmp[$n]]['NOMBRE'];
$xValores .= ", '".addslashes($data)."'";
}
$_POST['_FIELDSWITHFILES'] = trim(str_replace( $tmp[$n].'|', '', $_POST['_FIELDSWITHFILES'] ));
}
}
if( eSqlType('oracle') ){
sql_Inserta( $_DBTABLE, $xCampos, $xValores, $_DBSERIAL[1], $DimBlob );
}else{
sql_Inserta( $_DBTABLE, $xCampos, $xValores, $_DBSERIAL[1] );
}
}else{
sql_Inserta($_DBTABLE, $xCampos, $xValores, $_DBSERIAL[1]);
}
$_OkDBINSERT = true;
if( count($_DBSERIAL)>0 && $_DBSERIAL[0]==$_DBTABLE ){
for($i=0; $i<count($_IdInsert); $i++){
if( $_IdInsert[$i][0] == $_DBSERIAL[0] ){
$_DBSERIAL[2] = $_IdInsert[$i][1];
$_nSerial = $_DBSERIAL[2];
$_IdRegistro[$_DBTABLE] = $_nSerial;
$_vF[$_DBSERIAL[1]] = $_nSerial;
}
}
$DBAcceso .= $_nSerial;
}
if( count($_DBLOG)>0 ){
if( count($_DBSERIAL)>0 && $_DBSERIAL[0]==$_DBTABLE ){
if( eSqlType('oracle') ){
$OldSerial = trim($_DBSERIAL[1])."=''";
$NewSerial = trim($_DBSERIAL[1])."='".$_nSerial."'";
}else{
$OldSerial = trim($_DBSERIAL[1]).'=""';
$NewSerial = trim($_DBSERIAL[1]).'="'.$_nSerial.'"';
}
sql_Log($_DBLOG, 'A', $_DBTABLE, str_replace( $OldSerial, $NewSerial, $Grabar));
}else{
sql_Log($_DBLOG, 'A', $_DBTABLE, $Grabar);
}
}
if( $_SAVEDATALIST!='' ){
include_once($Dir_.'formstatic.inc');
if( function_exists("UpdateSubList") ) UpdateSubList($Opcion);
GrabaSubLista($Opcion);
}
if( $_POST['_ISUBLISTSERIAL']!='' ){
$Dim = explode('|',$_POST['_ISUBLISTSERIAL']);
for($n=0; $n<count($Dim)-1; $n++){
$Dim[$n] = trim($Dim[$n]);
if( substr($Dim[$n],-1)!=')' ){
list(,$t,$k,$v,$iSubListSufijo) = explode(',',$Dim[$n]);
}else{
$eDim = explode(',',$Dim[$n]);
$t = $eDim[1];
$k = $eDim[2];
$v = $eDim[3];
for($i=4; $i<count($eDim); $i++) $v .= ','.$eDim[$i];
}
if( count($_DBSERIAL)>0 && $_DBSERIAL[0]==$_DBTABLE ) $_vF[trim($k)] = $_nSerial;
$v = str_replace("&#39;","'",$v);
if( $iSubListSufijo<>"" ){
qQuery("update {$t}{$iSubListSufijo} set {$k}='".$_vF[trim($k)]."' where {$k}={$v}");
$v = $_vF[trim($k)];
qQuery("insert into {$t} (select * from {$t}{$iSubListSufijo} where {$k}={$v})");
qQuery("delete from {$t}{$iSubListSufijo} where {$k}={$v}");
}else{
qQuery("update {$t} set {$k}='".$_vF[trim($k)]."' where {$k}={$v}");
}
}
}
Estadistica('Fic', 0, $DBAcceso, $_DBTABLE);
if( $_POST['_FIELDSWITHFILES']!='' ) _FileGetContents($Opcion);
if( false && count($_ObjetoSQL)>0 && count($_SaveList)==0 && count($_SaveOnLine)==0 ){
for($w=0; $w<count($_ObjetoSQL); $w++){
$xSql = strtolower( $_ObjetoSQL[$w] );
list(,$tmp) = explode(' from ', $xSql);
list($wTabla, $wWhere) = explode(' where ', $tmp);
$wTabla = trim($wTabla);
list($wWhere,) = explode(' order by ', $wWhere);
$wWhere = trim($wWhere);
while( substr_count($wWhere, '{')>0 ){
$ini = strpos($wWhere, '{')+1;
$fin = strpos($wWhere, '}');
$sCampo = trim(substr($wWhere, $ini, $fin-$ini));
if( $_IdRegistro[$_DBTABLE]>0 ){
$wWhere = str_replace('{'.$sCampo.'}', $_IdRegistro[$_DBTABLE], $wWhere);
}else{
$wWhere = $NTX;
}
}
$wSql = "update {$wTabla} set {$wWhere}, conexion=0 where conexion=".$GLOBALS['_Connection_'];
qQuery( $wSql );
}
}
if( count($_DCT)>0 && count($_DBSERIAL)>0 ){
for($n=0; $n<count($_DCT); $n++){
$tmp = explode(',', str_replace('  ',' ',str_replace("\n",',',trim($_POST[$_DCT[$n]]))));
for($p=0; $p<count($tmp); $p++) $tmp[$p] = trim($tmp[$p]);
$tmp = array_unique($tmp, SORT_STRING);
for($p=0; $p<count($tmp); $p++) if( $tmp[$p]<>'' ) sql_Inserta('gs_dct', 'dct_serial, dct_field, dct_work', $_IdRegistro[$_DBTABLE].", '{$_DCT[$n]}{$_DCT_SUFFIX}', '".trim($tmp[$p])."'");
}
}
_gsLastInsert($NTX, qId());
$_LOGANSWER["answer"] = "ok";
if( $_GET["_SUBINSERT"]==1 ){
$tmp = explode(",", $_DBINDEX);
for($n=0; $n<count($tmp); $n++){
if( $_FORMSTATIC ) $xSUBINSERT .= "_WOPENER.";
$xSUBINSERT .= "_WOPENER._insertDinamyc('{$tmp[$n]}', '".str_replace("'", chr(92)."'",$_vF[$tmp[$n]])."'{$FilaMod});";
}
$_JSSTART = $xSUBINSERT;
}
if( $_DBEND!='' ){
$tmpFile = GrabaTmp('f_dbend', $_DBEND, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_DBEND = '';
}
if( isset($_GET['_INSERTAUX']) ){
eInit();
$IndAux = $_POST['cd_'.$_GET['_INSERTAUX']];
if( count($_DBSERIAL)>0 ) $IndAux = $_DBSERIAL[2];
?>
<!DOCTYPE HTML><HTML><HEAD></HEAD><BODY>
<SCRIPT type='text/javascript'>
var _WOPENER = window.frameElement.WOPENER;
_WOPENER._InsertSelectAdd('<?= $_GET['_INSERTAUX'] ?>', '<?= $IndAux ?>', '<?= $_POST['nm_'.$_GET['_INSERTAUX']] ?>');
top.eInfo(_WOPENER, '<?= $__Lng[143] ?>', 1);
if( top.S.url(_WOPENER, '_SUBINSERT')==1 ){
<?=$xSUBINSERT."\n"?>
}
top.eSWClose(window);
</SCRIPT>
</BODY></HTML>
<?PHP
eEnd();
}
if( $_FORMSTATIC ){
eInit();
?>
<!DOCTYPE HTML><HTML><HEAD></HEAD><BODY>
<SCRIPT type='text/javascript'>
var _WOPENER = window.frameElement.WOPENER;
top.S(_WOPENER.document.body).tip(top.eLng(27),1);
if( top.S.url(_WOPENER, '_SUBINSERT')==1 ){
<?=$xSUBINSERT."\n"?>
}
_WOPENER._FormStaticIni();
<?PHP
for($nf=0; $nf<count($_Form); $nf++){
if( $_Form[$nf][7]!='' ){
echo "_WOPENER.ePF('{$_Form[$nf][1]}', '{$_Form[$nf][7]}');\n";
}
}
?>
_WOPENER._eDefaultAll();
var n,tmp,tr,i,c;
for(n=0; n<_WOPENER._SaveList.length; n++){
tmp = _WOPENER._SaveList[n].split('|');
tr = _WOPENER.DGI(tmp[0]).rows;
for(i=1; i<tr.length; i++){
if( tr[i].getAttribute("LIBRE")!=1 ){
if( tr[i].id!='PieLista' ) tr[i].putAttribute("LIBRE",1);
for(c=0; c<tr[i].cells.length; c++){
tr[i].cells[c].textContent = ' ';
}
}
}
}
try{
_WOPENER.eval('FUNCTION_user();');
}catch(e){}
_WOPENER.eLoading();
_WOPENER.S("body").visibility();
if( _WOPENER._CampoFoco!=null ){
_WOPENER.SeCargo('', _WOPENER._CampoFoco.name);
}else{
_WOPENER.SeCargo('');
}
try{
if( _WOPENER._CampoFoco!=null ){
_WOPENER._CampoFoco.focus();
}
}catch(e){}
</SCRIPT>
</BODY></HTML>
<?PHP
eEnd();
}
$AyadeSerial = ((isset($_GET['_ISUBLIST']) && count($_DBSERIAL)>0) ? "_WOPENER._PutSerial('{$_DBSERIAL[1]}',{$_nSerial});" : '');
$_MSGANSWEROK = true;
if( count($_SUBLISTDF)==0 ){
eMessage('~S', (($_STOP) ? 'HS':''), $_MSGTIME[0], $AyadeSerial.$tmpAutoMenu);
}else{
include_once($Dir_.'sublista.inc');
echo CreaSubLista($_SUBLISTDF[0], $_SUBLISTDF[1], ${$_SUBLISTDF[2]});
eMessage('~S', (($_STOP) ? 'HS':'').'C', $_MSGTIME[0], "{$AyadeSerial}window.frameElement.WOPENER.gsResetLista('{$_SUBLISTDF[0]}');");
}
$Opcion = 'a'; $SubOp = 'A'; $Titulo = 'INSERTAR #';
eContextGet($NTX);
}else{
if( $_SEEK ){
eMessage('~NRC', 'HS', $_MSGTIME[1], '', 'NR');
}else{
eMessage('~NRC', 'HS', $_MSGTIME[1], '-1', 'NR');
}
}
}else if( $_TReg==1 && !isset($_gs_formato_) && $_SUBLISTADO_!=1 ){
$where = _qBuscar($Busca, $_DBTABLE);
if( $where!="" && $_DBFILTERIN!="" ) $where .= " and ".(($HaySelect)?"A.":"").$_DBFILTERIN;
if( $NTX=="" ){
if( $where!="" ){
$r = qQuery("select * from {$_DBTABLE} where ".$where);
}else{
$r = qQuery("select * from {$_DBTABLE}");
}
}else{
if( $_DBFILTERIN!="" ) $NTX .= " and ".(($HaySelect)?"A.":"").$_DBFILTERIN;
$r = qQuery("select * from {$_DBTABLE} where {$NTX}");
}
foreach($_SESSION["CHECK"] as $k=>$v){
if( isset($r[$k]) && isset($_SESSION[$v]) && trim($r[$k])<>$_SESSION[$v] ){
eMessage("NoValor: {$k}", 'HSE');
}
}
eContextGet($NTX);
if( $Opcion=='M' || $Opcion=='B' ){
if( isset($_POST['_MD5']) ){
if( $_POST['_MD5']<>qRecordMD5($_DBTABLE, $NTX) ) eMessage($__Lng[93], 'HSE');
}
if( $_PHPCHECK<>'' ){
qQuery("select * from {$_DBTABLE} where {$NTX}");
$_vF = qArray();
$tmpFile = GrabaTmp('f_phpcheck', $_PHPCHECK, $LenDoc, $_FILE_PHPCHECK);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_PHPCHECK);
}
}
if( $Opcion=='bR' || $Opcion=='cR' || $Opcion=='mR' ){
if( isset($__INSERTTOSEEK) ){
$_SAVEDATALIST = "";
$_FIELDSLIST = str_replace(
array(",_SAVEDATALIST", "||", "|", ",,"),
array(""			  ,  "" , "" , "," ),
$_FIELDSLIST
);
}
}
if( $Opcion=='M' ){
if( $NTX2!='' ){
if( qCount($_DBTABLE, $NTX2.' and not ('.$NTX.')')>0 ){
eMessage('~DR', 'EH', $_MSGTIME[1], '-1', 'DR');
return;
}
}
if( $NTX3!='' ){
if( qCount($_DBTABLE, $NTX3.' and not ('.$NTX.')')>0 ){
eMessage('~DR', 'EH', $_MSGTIME[1], '-1', 'DR');
return;
}
}
if( $_DEBUG==5 || $_DEBUG==6 ) include($Dir_.'debug5.inc');
if( isset($_LastValue) ){
qQuery("select {$_LastValue} from ".$_DBTABLE.' where '.$NTX);
$_LastValue = qArray();
}
if( count($_DBLOG)>0 ){
qQuery('select * from '.$_DBTABLE.' where '.$NTX);
$xxGrabar = ','.$Grabar;
$r = qArray();
foreach($r as $k=>$v){
$v = trim($v);
if( preg_match('/([0]{4})-([0]{2})-([0]{2})/', $v) ) $v = "";
if( !eSqlType('oracle') ){
$v = str_replace("'", "\\'", $v);
$v = str_replace('"', '\\"', $v);
$xxGrabar = str_replace(','.$k.'="'.$v.'",', ',', $xxGrabar);
$xxGrabar = str_replace(','.$k.'="'.$v.'"' , ',', $xxGrabar);
}else{
$v = str_replace("'", "''", $v);
$xxGrabar = str_replace(','.$k."='".$v."',", ',', $xxGrabar);
$xxGrabar = str_replace(','.$k."='".$v."'" , ',', $xxGrabar);
}
}
if( $xxGrabar[0]==',' ) $xxGrabar = substr($xxGrabar,1);
if( substr($xxGrabar,-1)==',' ) $xxGrabar = substr($xxGrabar,0,-1);
if( $xxGrabar<>'' ) sql_Log( $_DBLOG, 'M', $_DBTABLE, $xxGrabar );
}
if( isset($_POST['_FIELDSWITHFILES']) ){
if( $_POST['_FIELDSWITHFILES']!='' && $_FILELOG[$_DBTABLE] ){
qQuery('select * from '.$_DBTABLE.' where '.$NTX);
$_FILELOG[$_DBTABLE] = qArray();
}
$nf=0;
$tmp = explode('|',$_POST['_FIELDSWITHFILES']);
for($n=0; $n<count($tmp)-1; $n++){
if( $_POST[$tmp[$n]]!='' && $_UPLOADFILE[$tmp[$n]]['oDIR']=='' ){
$FileTmp = '../_tmp/zip/'.$_SESSION['_User'].'_'.($nf++);
$data = file_get_contents($FileTmp);
if( eSqlType('oracle') ){
$DimBlob[$_UPLOADFILE[$tmp[$n]]['NOMBRE']] = $data;
$Grabar .= ', '.$_UPLOADFILE[$tmp[$n]]['NOMBRE'].'=EMPTY_BLOB()';
}else{
$Grabar .= ", ".$_UPLOADFILE[$tmp[$n]]['NOMBRE']."='".addslashes($data)."'";
}
$_POST['_FIELDSWITHFILES'] = trim(str_replace($tmp[$n].'|', '', $_POST['_FIELDSWITHFILES']));
}
}
if( eSqlType('oracle') ){
sql_Modifica($_DBTABLE, $Grabar, $NTX, $DimBlob);
}else{
sql_Modifica($_DBTABLE, $Grabar, $NTX);
}
}else{
foreach($_POST as $k=>$v){
$nmFile = substr($k,6);
if( substr($k,0,6)=="_FILE_" && $v=="" && $_POST[$nmFile]=="" ){
if( $_UPLOADFILE[$nmFile]['oDIR']<>"" ){
if( $_UPLOADFILE[$nmFile]['NOMBRE'][0]=='=' ){
$xNomFile = _NmFileConPrefijo(trim(substr($_UPLOADFILE[$nmFile]['NOMBRE'],1)), $_UPLOADFILE[$nmFile]['PREFIJO']);
}else{
$xNomFile = $_POST[$_UPLOADFILE[$nmFile]['NOMBRE']];
$xNomFile = $_UPLOADFILE[$nmFile]['oDIR'].'/'._NmFileConPrefijo($xNomFile, $_UPLOADFILE[$nmFile]['PREFIJO']);
}
array_map("unlink", glob(eScript($xNomFile).".*"));
}else if( $_UPLOADFILE[$nmFile]['NOMBRE']<>"" ){
$data = "";
if( eSqlType('oracle') ){
$DimBlob[$_UPLOADFILE[$nmFile]['NOMBRE']] = $data;
$Grabar .= ', '.$_UPLOADFILE[$nmFile]['NOMBRE'].'=EMPTY_BLOB()';
}else{
$Grabar .= ", ".$_UPLOADFILE[$nmFile]['NOMBRE']."='".addslashes($data)."'";
}
}
}
}
sql_Modifica($_DBTABLE, $Grabar, $NTX);
}
if( $_SAVEDATALIST!='' ){
include_once($Dir_.'formstatic.inc');
if( function_exists("UpdateSubList") ) UpdateSubList($Opcion);
GrabaSubLista($Opcion);
}
Estadistica('Fic', 0, $DBAcceso, $_DBTABLE);
if( $_POST['_FIELDSWITHFILES']!='' ) _FileGetContents($Opcion);
if( count($_DCT)>0 && count($_DBSERIAL)>0 ){
for($n=0; $n<count($_DCT); $n++){
sql_Borra('gs_dct', 'dct_serial='.$_POST[$_DBSERIAL[1]]." and dct_field='{$_DCT[$n]}{$_DCT_SUFFIX}'");
$tmp = explode(',', str_replace('  ',' ',str_replace("\n",',',trim($_POST[$_DCT[$n]]))));
for($p=0; $p<count($tmp); $p++) $tmp[$p] = trim($tmp[$p]);
$tmp = array_unique($tmp, SORT_STRING);
for($p=0; $p<count($tmp); $p++) if( $tmp[$p]<>'' ) sql_Inserta('gs_dct', 'dct_serial, dct_field, dct_work', $_POST[$_DBSERIAL[1]].", '{$_DCT[$n]}{$_DCT_SUFFIX}', '".trim($tmp[$p])."'");
}
}
_gsLastInsert($NTX);
$_LOGANSWER["answer"] = "ok";
if( $_DBEND!='' ){
$tmpFile = GrabaTmp('f_dbend', $_DBEND, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_DBEND = '';
}
$_MSGANSWEROK = true;
if( count($_SUBLISTDF)==0 ){
if( !isset($_FchXPg_) ){
eMessage('~U', (($_STOP) ? 'HS':'').((strlen($_DBINDEX)==0) ? 'HS':''), $_MSGTIME[0], $tmpAutoMenu);
}else{
eMessage('~U', 'HS', $_MSGTIME[0], 'top.window.Pag.SiguienteFila(1);');
}
}else{
include_once($Dir_.'sublista.inc');
echo CreaSubLista($_SUBLISTDF[0], $_SUBLISTDF[1], ${$_SUBLISTDF[2]});
eMessage('~U', (($_STOP) ? 'HS':'').((strlen($_DBINDEX)==0) ? 'HS':'').'C', $_MSGTIME[0], "window.frameElement.WOPENER.gsResetLista('{$_SUBLISTDF[0]}');");
}
$Opcion = 'm'; $SubOp = 'mR';
}elseif( $Opcion=='B' ){
if( $_DBBAKDELETE ){
if( substr($_sDBTABLE,-4)!='_dlt' ){
if( qCount( $_sDBTABLE.'_dlt', $NTX ) > 0 ) qQuery( "delete from {$_sDBTABLE}_dlt where {$NTX}" );
qQuery( "insert into {$_sDBTABLE}_dlt select * from {$_sDBTABLE} where {$NTX}" );
if( $_DBBakDeleteUpdate!='' ){
list( $xFieldFecha, $xFieldUser ) = explode(',',$_DBBakDeleteUpdate);
$xInstante = ( substr(trim($xFieldFecha),0,3)=='dt_' ) ? date('Y-m-d') : date('Y-m-d H:i:s');
qQuery( "update {$_sDBTABLE}_dlt set {$xFieldFecha}='{$xInstante}', {$xFieldUser}='{$_User}' where {$NTX}" );
}
}else{
if( qCount( substr($_sDBTABLE,0,-4), $NTX ) == 0 ){
qQuery( "insert into ".substr($_sDBTABLE,0,-4)." select * from {$_sDBTABLE} where {$NTX}" );
if( $_DBBakDeleteUpdate!='' ){
list( $xFieldFecha, $xFieldUser ) = explode(',',$_DBBakDeleteUpdate);
$xInstante = ( substr(trim($xFieldFecha),0,3)=='dt_' ) ? date('Y-m-d') : date('Y-m-d H:i:s');
qQuery( "update ".substr($_sDBTABLE,0,-4)." set {$xFieldFecha}='{$xInstante}', {$xFieldUser}='{$_User}' where {$NTX}" );
}
}else{
eMessage( $__Lng[94], 'EHS', '','', 'FND' );
}
}
}
if( count($_DBLOG)>0 ) sql_Log($_DBLOG, 'B', $_DBTABLE, $NTX);
if( count($_Fichero)>0 ){
qSelect($_DBTABLE, $ListCampos, $NTX);
$row = qArray();
$_vF = &$row;
$xNomFileBak = '';
for( $nf=0; $nf<count($_Fichero); $nf++ ){
if( $_Fichero[$nf][0]=='_' ) continue;
if( $_UPLOADFILE[$_Fichero[$nf]]['NOMBRE']!=$_Fichero[$nf] ){
$NomExt = substr( $row[$_Fichero[$nf]], strrpos($row[$_Fichero[$nf]],'.') );
$xNomFile = strtolower($row[$_UPLOADFILE[$_Fichero[$nf]]['NOMBRE']].$NomExt);
$xNomFileBak = $row[$_UPLOADFILE[$_Fichero[$nf]]['NOMBRE']].'.bak';
}else{
$xNomFile = $row[$_Fichero[$nf]];
}
$xNomFile = trim($xNomFile);
$xNomFileBak = _NmFileConPrefijo( $xNomFileBak, $_UPLOADFILE[$_Fichero[$nf]]['PREFIJO'] );
$xxNomFile= $xNomFile;
$xNomFile = _NmFileConPrefijo( $xNomFile, $_UPLOADFILE[$_Fichero[$nf]]['PREFIJO'] );
if( trim($xNomFile)!='' && file_exists( $_UPLOADFILE[$_Fichero[$nf]]['DIR'].'/'.$xNomFile ) ){
if( unlink( $_UPLOADFILE[$_Fichero[$nf]]['DIR'].'/'.$xNomFile ) == false ){
eMessage( $__Lng[95], 'EHS', '','', 'FND' );
}
if( $_UPLOADFILE[$_Fichero[$nf]]['COPY']!='' ) @unlink( $_UPLOADFILE[$_Fichero[$nf]]['COPY'].'/'.$xNomFile );
if( $_UPLOADFILE[$_Fichero[$nf]]['TAMAÑOS']!='' ){
$iTamayo   = explode(',', $_UPLOADFILE[$_Fichero[$nf]]['TAMAÑOS']);
$iPrefijos = explode(',', $_UPLOADFILE[$_Fichero[$nf]]['PREFIJOS']);
for($i=0; $i<count($iTamayo); $i++){
$iTamayo[$i] = trim($iTamayo[$i]);
$iPrefijos[$i] = trim($iPrefijos[$i]);
if( $iPrefijos[$i]=='' ) $iPrefijos[$i] =  $_UPLOADFILE[$_Fichero[$nf]]['PREFIJO'];
}
$xPre=0;
for($i=0; $i<count($iTamayo); $i+=2){
$NuevaImg = $_UPLOADFILE[$_Fichero[$nf]]['DIR'].'/'._NmFileConPrefijo( $xxNomFile, $iPrefijos[$xPre] );
@unlink( $NuevaImg );
if( $_UPLOADFILE[$_Fichero[$nf]]['COPY']!='' ) @unlink( $_UPLOADFILE[$_Fichero[$nf]]['COPY'].'/'._NmFileConPrefijo( $xxNomFile, $iPrefijos[$xPre] ) );
$xPre++;
}
}
}
@unlink( $_UPLOADFILE[$_Fichero[$nf]]['DIR'].'/'.$xNomFileBak );
}
}
if( $_SAVEDATALIST!='' ){
include_once( $Dir_.'formstatic.inc' );
if( function_exists("UpdateSubList") ) UpdateSubList($Opcion);
GrabaSubLista( $Opcion );
}
if( isset($_ISUBLISTDELETE) ){
include_once('../../edesweb/isublist.inc');
list( $iFile, $iRelacion ) = explode('|',$_ISUBLISTDELETE);
_ISubListDelete($iFile, $iRelacion, $_POST[$iRelacion]);
}
sql_Borra($_DBTABLE, $NTX);
Estadistica('Fic', 0, $DBAcceso, $_DBTABLE);
if( count($_DCT)>0 && count($_DBSERIAL)>0 ){
for( $n=0; $n<count($_DCT); $n++ ){
sql_Borra( 'gs_dct', 'dct_serial='.$_POST[$_DBSERIAL[1]]." and dct_field='{$_DCT[$n]}{$_DCT_SUFFIX}'" );
}
}
_gsLastInsert($NTX);
$_LOGANSWER["answer"] = "ok";
if( $_DBEND!='' ){
$tmpFile = GrabaTmp( 'f_dbend', $_DBEND, $LenDoc );
include( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
$_DBEND = '';
}
$_MSGANSWEROK = true;
if( count($_SUBLISTDF) == 0 ){
if( !isset($_FchXPg_) ){
if( substr($_sDBTABLE,-4)=='_dlt' ){
eMessage( '~R', (($_STOP) ? 'HS':''), $_MSGTIME[0] );
}else{
eMessage( '~D', (($_STOP) ? 'HS':''), $_MSGTIME[0], $tmpAutoMenu );
}
}else{
eMessage( '~D', 'HS', $_MSGTIME[0], 'top.window.Pag.SiguienteFila(1,1);' );
}
}else{
include_once( $Dir_.'sublista.inc' );
echo CreaSubLista($_SUBLISTDF[0], $_SUBLISTDF[1], ${$_SUBLISTDF[2]});
eMessage( '~D', (($_STOP) ? 'HS':'').'C', $_MSGTIME[0], "window.frameElement.WOPENER.gsResetLista('{$_SUBLISTDF[0]}');" );
}
$Opcion = 'b'; $SubOp = 'bR';
}elseif( $Opcion=='A' ){
if( $_FORMSTATIC ) FormStaticError();
if( isset($_GET['_ISUBLIST']) ) eMessage('~DR', 'HSE', $_MSGTIME[1]+2000, 'top.S(_WOPENER._FilaLastInsert).nodeRemove();_WOPENER._RecalcColsOp();_WOPENER.Recalcula(1);');
eMessage('~DR', 'EH', $_MSGTIME[1], '-1', 'DR');
}else{
$_PKSeek = _qBuscar($Busca, $_DBTABLE);
Estadistica('Fic', 0, '', $_DBTABLE);
qSelect($_DBTABLE, $ListCampos, $_PKSeek, '');
$_Fila = qArray();
$_LOGANSWER["form"] = $_Fila;
$_vF = &$_Fila;
if( $_DBRLOCK ){
if( $_DBVIEWTABLE<>"" ){
$tmp2 = "";
$tmp = explode(',', $_DBINDEX);
for($n=0; $n<count($tmp); $n++){
if( $n>0 ) $tmp2 .= " and ";
$tmp2 .= $tmp[$n].'='.$_vF[$tmp[$n]];
}
$_DBRLOCK = qRecordMD5($_DBVIEWTABLE, $tmp2);
}else{
$_DBRLOCK = qRecordMD5($_DBTABLE, $_PKSeek);
}
}
foreach($_PHPSESSION as $k=>$v){
if( $_vF[$k]<>$v ) eMessage((($_PHPSESSIONMSG=='')?"(F{$Opcion}) Error de Sessión":$_PHPSESSIONMSG), 'HSE');
}
foreach($_vF as $key=>$val){
if( $_pField[$key][2]=="F4" ){
if( isDate($val) ){
if( isZero($_vF[$key]) ) $_vF[$key] = "";
}
}
}
if( count($_DBADDFIELDS)>0 ){
for($i=0; $i<count($_DBADDFIELDS); $i++){
if( substr_count($_DBADDFIELDS[$i][1], "()")>0 ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'$sFila="'.$_DBADDFIELDS[$i][1].'";');
@eval('$sFila='.$_DBADDFIELDS[$i][1].';');
}else{
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'$xSql="'.$_DBADDFIELDS[$i][1].'";');
@eval('$xSql="'.$_DBADDFIELDS[$i][1].'";');
qQuery($xSql);
$sFila = qArray();
}
while( list($key, $val)=each($sFila) ){
if( isDate($val) ){
if( isZero($val) ) $val = '';
}
$_Fila[$_DBADDFIELDS[$i][0].$key] = $val;
$_vF[$_DBADDFIELDS[$i][0].$key] = $val;
}
}
}
if( count($_DBADDSQL)>0 ){
for($i=0; $i<count($_DBADDSQL); $i++){
$pIni = strpos( $_DBADDSQL[$i], '{' );
while( $pIni !== false){
$pFin = strpos( $_DBADDSQL[$i], '}' );
if($pFin !== false){
$Old = substr($_DBADDSQL[$i], $pIni, $pFin-$pIni+1 );
$New = substr($Old,1,-1);
if( substr_count($New,'(')+substr_count($New,')')==2 ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$New.';');
$New = @eval('return '.$New.';');
}else{
if( $New[0]!='$' ){
$New = $_vF[$New];
}else{
if( ${$New}=='' ){
$New = ( isset($_GET) ) ? $_GET[substr($New,1)] : $_GET[substr($New,1)];
}else{
$New = ${$New};
}
}
}
$_DBADDSQL[$i] = str_replace($Old, $New, $_DBADDSQL[$i]);
}
$pIni = strpos($_DBADDSQL[$i], '{');
}
qQuery($_DBADDSQL[$i]);
$sRow = qArray();
foreach($sRow as $key=>$val){
if( isDate($val) ){
if( isZero($val) ) $val = '';
}
$_Fila[$key] = $val;
${$key} = $val;
}
}
}
if( !empty($_DBREAD) ){
$tmpFile = GrabaTmp('f_dbread', $_DBREAD, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_DBREAD); unset($tmpFile);
}
_gsLastInsert($NTX);
if( $_DBEND!='' ){
$tmpFile = GrabaTmp('f_dbend', $_DBEND, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_DBEND = '';
}
if( !empty($_DBGATEWAYONE) || !empty($_JSGATEWAYONE) ){
eInit();
eHTML("F:{$OriFichero}", $Opcion);
?>
<?=_FileNoCache('edes.js')?>
<script type="text/javascript">
top.S.ppublic(window,1);
<?PHP
foreach($_vF as $k=>$v){
if( is_string($k) ){
if( substr_count($_JSGATEWAYONE.$_DBGATEWAYONE, $k)>0 ){
$v = str_replace(array("\n",chr(10),chr(13)), array("<br>","<br>","<br>"), $v);
echo 'var $'.$k.'="'.AddSlashes($v).'";';
}
}
}
?>
</script>
</HEAD><BODY>
<?PHP
foreach($_vF as $k=>$v) $_vF[$k] = addslashes($v);
if( gettype($_JSGATEWAYONE)=="array" ){
echo '<script type="text/javascript">';
echo _InVar(implode("\n",$_JSGATEWAYONE));
echo '</script>';
}else if( gettype($_DBGATEWAYONE)=="array" ){
$txt =_InVar(implode("\n",$_DBGATEWAYONE));
$tmpFile = GrabaTmp('dbgatewayone', $txt, $LenDoc, $_FILE_PHPINI);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($txt, $_DBGATEWAYONE);
}else if( substr_count($_DBGATEWAYONE, '(')>0 ){
if( substr($_DBGATEWAYONE,-1)!=';' ) $_DBGATEWAYONE .= ';';
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$_DBGATEWAYONE);
eval($_DBGATEWAYONE);
}else{
if( substr_count($_DBGATEWAYONE, '?')>0 ){
$tmp = explode('?', $_DBGATEWAYONE);
$_sPasarela = eScript($tmp[0]);
}else if( substr_count($_DBGATEWAYONE, '&')>0 ){
$tmp = explode('&', $_DBGATEWAYONE);
$_sPasarela = eScript($tmp[0]);
}else{
$_sPasarela = eScript($_DBGATEWAYONE);
}
$_DBGATEWAYONE = str_replace('= $', '=$', $_DBGATEWAYONE);
if( substr_count($_DBGATEWAYONE, '=$')>0 ){
$tmp = explode('=', $_DBGATEWAYONE);
$tmp[1] = 'return('.$tmp[1].');';
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$tmp[1]);
$_DBGATEWAYONE = $tmp[0].'='.eval($tmp[1]);
$NomVar = explode('?', $tmp[0]);
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$tmp[1]);
${$NomVar[1]} = @eval($tmp[1]);
}
include($_sPasarela);
}
?>
<script type="text/javascript">
top.S.ppublic(window);
top.eSWClose(window);
</script>
</body></html>
<?PHP
eEnd();
}
if( substr_count($_SERVER['HTTP_REFERER'], '&_SEL_=')>0 ){
$_NOEVENT = 0;
if( substr_count($_SERVER['HTTP_REFERER'], '&_NOEVENT=1')>0 ) $_NOEVENT = 1;
eInit();
eHTML("F:{$OriFichero}", $Opcion);
?>
<LINK REL="stylesheet" HREF="<?=$_SESSION['_PathCSS']?>/ficha.css" TYPE="text/css">
<?=_FileNoCache('edes.js')?>
</HEAD><BODY>
<SCRIPT type="text/javascript">
function eLeft(txt,n){
return top.S.left(txt,n);
}
function eRight(txt,n){
return top.S.right(txt,n);
}
function eMid(txt,i,f){
return top.S.mid(txt,i,f);
}
top.S.ppublic(window,1);
<?PHP
$pk = eMid($_SERVER['HTTP_REFERER'], "&_CAMPO_=", "&");
if( $_SESSION["_SELINO"][$pk]<>"" ){
foreach($_vF as $k=>$v){
if( is_string($k) ){
if( substr_count($_SESSION["_SELINO"][$pk], $k)>0 ){
$v = str_replace(array("\n",chr(10),chr(13)), array("<br>","<br>","<br>"), $v);
echo 'var $'.$k.'="'.AddSlashes($v).'";';
}
}
}
echo $_SESSION["_SELINO"][$pk];
}else{
$_SEL_ = str_replace('+', '&#43;', substr($_SERVER['HTTP_REFERER'], strpos($_SERVER['HTTP_REFERER'],'&_SEL_=')+7));
$_SEL_ = urldecode($_SEL_);
$_SEL_ = str_replace("\\'", "'", $_SEL_);
$_SEL_ = str_replace(".' '.", '." ".', $_SEL_);
list($_SEL_) = explode('&_PSOURCE=', $_SEL_);
$_SEL_ = str_replace('&#43;', '+', $_SEL_);
list($Form, $ExeList, $ExeFicha) = explode(';', $_SEL_);
$Form = trim($Form).'.';
$sForm = $Form;
$ExeList = trim($ExeList);
if( $_DEBUG==20 ) echo "debugger;".$__Enter;
if( (strpos($_SEL_,',')>0 && strpos($_SEL_,'(')>strpos($_SEL_,',')) || substr_count($_SEL_, '(')==0 ){
if( $ExeFicha!='' ){
$tmpC = explode(',', gsCambiaComa2($ExeFicha));
}else{
$tmpC = explode(',', gsCambiaComa2($ExeList));
}
for($n=0; $n<count($tmpC); $n++){
$tmpD = explode('=', str_replace('|', ',', $tmpC[$n]));
$tmpD[0] = trim($tmpD[0]);
$tmpD[1] = trim($tmpD[1]);
if( $tmpD[1]=='onchange' ){
echo '_WOPENER.S(":'.$tmpD[0].'").eventChange();';
continue;
}
if( $tmpD[1]=='' && substr_count( $tmpD[0], '()' ) > 0 ){
echo '_WOPENER.'.$tmpD[0].';';
continue;
}
if( substr($tmpD[1],-9)=='&_PSOURCE' ) $tmpD[1] = substr($tmpD[1],0,strpos($tmpD[1],'&_PSOURCE'));
$Form = $sForm;
if( substr_count( $tmpD[0], '.' ) > 0 ) $Form = '';
if( substr_count( $tmpD[0], '#' ) > 0 ){
echo str_replace( '#', trim($_Fila[$tmpD[1]]), $tmpD[0] ).';';
}else{
if( substr($tmpD[1],0,2)!='__' ){
$NomCampo = trim($tmpD[1]);
if( substr_count($NomCampo,'{') > 0 ){
$tmp = str_replace( '{', ',', $NomCampo );
$tmp = str_replace( '}', '', $tmp );
$tmp = explode( ',', $tmp );
$tmp[0] = trim($tmp[0]);
$tmp[2] = trim($tmp[2]);
$Tabla = trim($tmp[1]);
$Campos = trim($tmp[3]);
if( substr_count( $tmp[0], '+' ) == 0 ){
if( eSqlType('oracle') ){
$Condicion = $tmp[2]."='".str_replace("'","''",$Fila[ $tmp[0] ])."'";
}else{
$Condicion = $tmp[2].'="'.$Fila[ $tmp[0] ].'"';
}
}else{
$Condicion = '';
$tmp0 = explode( '+', $tmp[0] );
$tmp2 = explode( '+', $tmp[2] );
for( $i=0; $i<=substr_count($tmp[0],'+'); $i++ ){
if( !empty($Condicion) ) $Condicion .= ' and ';
if( eSqlType('oracle') ){
$Condicion .= trim($tmp2[$i])."='".str_replace("'","''",$_Fila[ trim($tmp0[$i]) ])."'";
}else{
$Condicion .= trim($tmp2[$i]).'="'.$_Fila[ trim($tmp0[$i]) ].'"';
}
}
}
qSelect( $Tabla, $Campos, $Condicion, '' );
$row = qRow();
$Valor = trim($row[0]);
qFree();
}else{
if( substr_count( $tmpD[1], '.' ) > 0 ){
$Valor = '';
$tmpI = explode('.',$tmpD[1]);
for( $iv=0; $iv<count($tmpI); $iv++ ){
if( $tmpI[$iv][0]=='"' ){
$Valor .= substr($tmpI[$iv],1,-1);
}else{
$Valor .= trim($_Fila[$tmpI[$iv]]).'';
}
}
}else{
$Valor = trim($_Fila[$tmpD[1]]);
}
}
echo '_WOPENER.ePFS("'.$tmpD[0].'","'.eQuote($Valor).'");'.$__Enter;
}else{
$NomCampo = substr($tmpD[1],2);
$Valor = trim($_Fila[ $NomCampo ]);
if( substr_count($NomCampo,'{') > 0 ){
$tmp = str_replace( '{', ',', $NomCampo );
$tmp = str_replace( '}', '', $tmp );
$tmp = explode( ',', $tmp );
$Tabla = $tmp[1];
$Campos = $tmp[2].','.$tmp[3];
$NomCampo = $tmp[2];
}else{
$Tabla = substr( strchr($NomCampo,'_'), 1 );
$Campos = $NomCampo.', nm_'.$Tabla;
}
qSelect( $Tabla, $Campos, "{$NomCampo}='{$Valor}'", '' );
$row = qRow();
qFree();
echo '_WOPENER.ePFS("'.$tmpD[0].'","'.eQuote(trim($row[1])).'");'.$__Enter;
}
}
}
}else{
if( $_DBSELREC!='' ){
$tmpFile = GrabaTmp('f_dbselrec', $_DBSELREC, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
unset($_DBSELREC); unset($tmpFile);
}
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.$ExeList.';');
@eval($ExeList.';');
}
}
echo 'top.S.ppublic(window);';
echo 'window.frameElement.WOPENER.document.body.focus();';
echo 'top.eSWClose(window);';
echo '<'.'/SCRIPT></BODY></HTML>';
eEnd();
}
}
}else{
if( $Opcion=='A' ){
if( isset($_GET['_ISUBLIST']) ) eMessage('~DR', 'HSE', $_MSGTIME[1]+2000, 'top.S(_WOPENER._FilaLastInsert).nodeRemove();_WOPENER._RecalcColsOp();_WOPENER.Recalcula(1);');
}
list($_Action) = explode("&",$_SERVER["QUERY_STRING"]);
eContextPut($_Action);
if( $_LOGFULLSTATUS && $_SESSION["_LOGFULLTYPE"]!=$_LOGFULLTYPE ) $_LOGFULLSTATUS = false;
eInit();
$__='{#}eDes{#}';
$_Accion='L';
include($Dir_.'_lista.gs');
eEnd();
}
?>
