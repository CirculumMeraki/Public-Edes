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
for( $n=0; $n<count($dim); $n++ ){
$txt = trim($dim[$n]);
if( $txt<>"" ){
if( $txt=="<>" ){
$inOut = "out";
continue;
}else if( $txt=="!=" ){
$inOut = "list";
if( eSqlType('mysql,mysqli') ){
qQuery( 'CREATE TEMPORARY TABLE _seek (
valor varchar(120) NOT NULL
)' );
}else if( eSqlType('informix') ){
qQuery( 'CREATE TEMP TABLE _seek (
valor varchar(120) NOT NULL
)' );
}else if( eSqlType('oracle') ){
qQuery( 'DECLARE LOCAL TEMPORARY TABLE _seek (
valor varchar(120) NOT NULL
)' );
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
if( substr($_DBADDFILTEREXTRA,-1)==')' || substr($_DBADDFILTEREXTRA,-1)==';' ){
list( $NomFunc ) = explode('(',$_DBADDFILTEREXTRA);
if( function_exists($NomFunc) ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$_DBADDFILTEREXTRA.';');
$_DBADDFILTEREXTRA = eval('return '.$_DBADDFILTEREXTRA.';');
}
}
$_DBADDFILTER = '';
}
include_once($Dir_.'condicion.inc');
if( isset($_POST) ){
if( $_POST['_SAVEDATALIST']!='' ) $_SAVEDATALIST = $_POST['_SAVEDATALIST'];
}else if( $_POST['_SAVEDATALIST']!='' ) $_SAVEDATALIST = $_POST['_SAVEDATALIST'];
$tmpAutoMenu = ( isset($_GET['_STOP']) ) ? 'eAutoMenu(0);':'';
$Busca = '';
$aBusca = '';
$_Grabar = '';
$NTX = '';
$NTX2 = '';
$_WHERE = &$NTX;
$TotalHojas = count($DFichero);
$MenosHojas = 0;
$Tablas = '';
$_DBTABLE = '#';
$sAlias = '';
$_TipoVar = array();
$_TableUnique = array();
$DimIndice2 = explode(',', $_DBINDEX2);
$DimIndice3 = explode(',', $_DBINDEX3);
for($nc=0; $nc<$TotalHojas; $nc++){
$DimTabla[$nc] = '';
if( $DFichero[$nc][0]=='=' || $DFichero[$nc][0]=='>' ){
$MenosHojas++;
continue;
}
if( $DFichero[$nc][0]=='-' ){
$FicheroD = eScript(trim(substr($DFichero[$nc], 1)));
}else{
$FicheroD = eScript(str_replace('*','',$DFichero[$nc]));
}
$OnCampos = false;
$n = 0;
$sBuffer = '';
$ElPuntoEsRem = true;
$_DimEDF = @OpenDF($FicheroD,0);
for($nDimFCH=0; $nDimFCH<count($_DimEDF); $nDimFCH++){
$buffer = trim($_DimEDF[$nDimFCH]);
$sBuffer = $buffer;
if( !@LeeDF($buffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
if( $Chr_1=='[' ) $TipoEntrada = '#';
continue;
}
if( $Chr_1=='[' && substr($buffer,-1)=="|" && !preg_match('/^\[FIELDS\]/i',$buffer) ) _addBuffer($buffer, $nDimFCH, $_DimEDF);
$ElPuntoEsRem = true;
if( substr($buffer,0,2)=='/'.'/' ) continue;
if( strpos($buffer, '/'.'/')!==false ){
if( substr_count(strtoupper($buffer), '[UPLOADFILE]')==0 ){
$p = strpos($buffer, '/'.'/');
if( substr($buffer,$p-1,1)!='\\' ){
if( substr_count(chr(39).'":', substr($buffer, $p-1, 1))==0 ) $buffer = chop(substr($buffer, 0, $p));
}
}
}
if( ord($buffer[0])==91 ){
_AtomizaLabel($Opcion, $buffer, $Etiqueta, $bufferData, $tmp, $OkModo, $TipoEntrada, $JsHtm, $Comando);
switch( $Etiqueta ){
case 'FIELDS':
$OnCampos = true;
break;
case 'DBTABLE':
$tmpBuffer = trim($_DimEDF[$nDimFCH+1]);
if( $tmpBuffer[0]=='¿' ){
if( substr_count(strtoupper($tmpBuffer), '[DBTABLE]')>0 ){
$ElPuntoEsRem = true;
if( @LeeDF($tmpBuffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line) ){
continue;
}
}
}
list(, $DimTabla[$nc]) = explode(']', $buffer);
list($DimTabla[$nc]) = explode('|', $DimTabla[$nc]);
$DimTabla[$nc] = trim($DimTabla[$nc]);
$DimTabla[$nc] = _InVar($DimTabla[$nc]);
$_TableUnique[$DimTabla[$nc]] = 1;
if( $Tablas!='' ) $Tablas .= ',  ';
$Tablas .= $DimTabla[$nc].' '.chr(65+$nc);
if( $DFichero[$nc][0]!='-' && $nc==0 ){
$_DBTABLE = $DimTabla[$nc];
$sAlias = chr(65+$nc);
}
$n++;
if( $OnCampos ) $n++;
$OnCampos = false;
break;
case 'DBINDEX':
$tmpBuffer = trim($_DimEDF[$nDimFCH+1]);
if( $tmpBuffer[0]=='¿' ){
if( substr_count( strtoupper($tmpBuffer), '[DBINDEX]' ) > 0 ){
$ElPuntoEsRem = true;
if( @LeeDF( $tmpBuffer, $DimOpcion, $_Variable, $SaltarLinea, $_Form, $Chr_1, $_FIELDSET, $_TmpFieldSet, $_EnLinea, $_TmpEnLinea, $_EnColumna, $_TmpEnColumna, $TipoEntrada, $ElPuntoEsRem, $next_Line ) ){
continue;
}
}
}
list( , $DimIndice[$nc] ) = explode( ']', $buffer );
if( substr_count( $DimIndice[$nc], ';' ) > 0 ){
list( $DimIndice[$nc] ) = explode( ';', $DimIndice[$nc] );
}
$DimIndice[$nc] = trim( $DimIndice[$nc] );
$n++;
if( $OnCampos ) $n++;
$OnCampos = false;
break;
case 'DBRANGE':
if( count($__INSERTTOSEEK)>0 ){
$d = explode('|', $buffer);
for($i=0; $i<count($d); $i++ ) $d[$i] = trim($d[$i]);
if( $_POST[$d[2]]!="" || $_POST[$d[3]]!="" ){
$_ConDBRange[$d[1]] = true;
$condi = ((substr_count(',TRUE,!FALSE,1,,', ','.strtoupper($d[4]).',')==1)?"=":"");
$comilla = "'";
$lenDato = max(strlen($_POST[$d[2]]), strlen($_POST[$d[3]]));
if( $_POST[$d[2]]!="" && $_POST[$d[3]]!="" && $_POST[$d[2]]>$_POST[$d[3]] ){
list($_POST[$d[2]], $_POST[$d[3]]) = array($_POST[$d[3]], $_POST[$d[2]]);
}
if( $_POST[$d[2]]!="" && $_POST[$d[3]]!="" ){
$_POST[$d[1]] = ">{$condi}#2{$comilla} and {$d[1]}<{$condi}{$comilla}#3";
}else if( $_POST[$d[2]]!="" ){
$_POST[$d[1]] = ">{$condi}#2";
}else if( $_POST[$d[3]]!="" ){
$_POST[$d[1]] = "<{$condi}#3";
}
if( $lenDato==10 ){
if( eSqlType('oracle', 'pdo.informix') ){
if( $_POST[$d[2]]!="" ) $_POST[$d[2]] = eYmd2Dmy($_POST[$d[2]]);
if( $_POST[$d[3]]!="" ) $_POST[$d[3]] = eYmd2Dmy($_POST[$d[3]]);
}
}
$_POST[$d[1]] = str_replace( array("#2","#3"), array($_POST[$d[2]],$_POST[$d[3]]), $_POST[$d[1]]);
}
}
break;
case 'NOTE':
break 2;
default:
if( $OnCampos ) $n++;
$OnCampos = false;
}
}else{
if( $OnCampos && substr_count($buffer, '|')>7 ){
$tmp = explode('|', $buffer);
$_TipoVar[trim($tmp[1])] = trim($tmp[2]);
}else{
if(	$buffer[0]=="{" ){
$tmp = explode('|', $buffer);
$tmp2 = explode('}', strtoupper(str_replace(" ","",substr($tmp[0],1))));
if( $tmp2[0]=="SLMENU" && substr_count($tmp2[1],"A")==1 && strtoupper(str_replace(" ","",$tmp[4]))=="FORMSTATIC" ){
if( $Opcion=='M' || $Opcion=='A' || $Opcion=='B' ){
_RecuperaFileSetup($tmp[2]);
}
}
}
}
}
}
unset($_DimEDF);
if( $DimTabla[$nc]=='' ) $MenosHojas++;
$DimGrabar[$nc] = '';
$DimInsert[$nc] = '';
$DimLong[$nc] = 0;
}
for( $nc=count($DimTabla)-1; $nc>=0; $nc-- ){
if( $DimTabla[$nc]=='' ){
array_splice($DFichero, $nc, 1);
array_splice($DimTabla, $nc, 1);
array_splice($DimIndice, $nc, 1);
array_splice($DimIndice2, $nc, 1);
array_splice($DimGrabar, $nc, 1);
array_splice($DimInsert, $nc, 1);
array_splice($DimLong, $nc, 1);
}
}
$TotalHojas -= $MenosHojas;
if( substr_count($_DBADDFILTER, '{')>0 && substr_count($_DBADDFILTER, '}')>0 ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$_DBADDFILTER.';');
$_DBADDFILTER = eval('return "'.$_DBADDFILTER.'";');
}else if( (substr_count($_DBADDFILTER, '()')==1 || substr_count($_DBADDFILTER, '( )')==1) && substr_count($_DBADDFILTER, 'now()')==0 ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$_DBADDFILTER.';');
$_DBADDFILTER = eval('return '.$_DBADDFILTER.';');
}
if( substr_count($Opcion,'R')>0 ){
if( $_SERVER["REQUEST_METHOD"]!='POST' ){
$VarInicial = 1;
$EsCampoFiltro = false;
$n=-1;
foreach($_GET as $c=>$vv){
$n++;
$Dim[$n] = $c."='".$vv."'";
if( $c=='_NOBUTTON' || $c=='_FORMBUTTONS' || $c=='_STOP' || $c=='_CLOSE_' || $c=='_PSOURCE' || $c=='_WSList' ) continue;
if( substr($c,0,3)=='___' ) continue;
foreach($_SESSION["CHECK"] as $k3=>$v3){
if( $c==$k3 && isset($_SESSION[$v3]) && $vv<>$_SESSION[$v3] ){
$error = "Operación no permitida";
if( $_SESSION['_D_']!='' ) $error = "3: Valor de variable de sesión no permitida: {$k3}<>".$_SESSION[$v3];
eMessage( $error, 'HSE' );
}
}
if( $EsCampoFiltro ){
if( ($vv[0]=='"' || $vv[0]=="'") && $vv[0]==substr($vv,-1) ){
$vv = substr($vv,1,-1);
}
${$c} = $vv;
if( trim($Dim[$n])<>"" && $Dim[$n][0]!='_' ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $Dim[$n];
if( $aBusca!='' ) $aBusca .= ' and ';
$aBusca .= 'A.'.$Dim[$n];
}
}else if( $c=='_SEEK' ) $EsCampoFiltro = true;
}
$NTX = $Busca;
}else{
$Grabar = $Busca = $aBusca = $NTX = '';
$dBusca = '';
$DimNomVar  = array_keys($_POST);
$DimValor   = array_values($_POST);
$VarInicial = 0;
if( $_FILTER!='' ){
$tmp = urldecode( $_FILTER );
$tmp = str_replace(' like ', '=' ,$tmp );
$tmp = str_replace("\\'", "'" , $tmp );
$tmp = str_replace('%', '*' , $tmp );
$tmp = explode( ' and ', $tmp );
for( $n=0; $n<count($tmp); $n++ ){
$tmp[$n] = trim($tmp[$n]);
if( substr($tmp[$n],0,2) == 'A.' ) $tmp[$n] = substr( $tmp[$n], 2 );
$sTmp = explode( '=', $tmp[$n] );
$sTmp[0] = trim($sTmp[0]);
$sTmp[1] = trim($sTmp[1]);
if( $sTmp[1][0] == "'" || $sTmp[1][0] == '"' ) $sTmp[1] = substr( $sTmp[1], 1, -1 );
array_push( $DimNomVar, $sTmp[0] );
array_push( $DimValor, $sTmp[1] );
}
}
for($n=0; $n<count($DimNomVar); $n++){
$DimNomVar[$n] = trim($DimNomVar[$n]);
$DimValor[$n] = trim($DimValor[$n]);
if( $MemDBRange[$DimNomVar[$n]]=="" ){
$DimValor[$n] = str_replace('"','&quot;',$DimValor[$n]);
}else{
if( !(substr_count($DimValor[$n],'"')==2 && substr($DimValor[$n],-11,1)=='"' && substr_count(substr($DimValor[$n],11,2), '"')==1) ){
$DimValor[$n] = str_replace('"','&quot;',$DimValor[$n]);
}
}
foreach( $_SESSION["CHECK"] as $k=>$v ){
if( $DimNomVar[$n]==$k && isset($_SESSION[$v]) && $DimValor[$n]<>$_SESSION[$v] ){
$error = "Operación no permitida";
if( $_SESSION['_D_']!='' ) $error = "4: Valor de variable de sesión no permitida: {$k}<>".$_SESSION[$v];
eMessage( $error, 'HSE' );
}
}
if( $_ConDBRange[$DimNomVar[$n]] ) $DimValor[$n] = stripslashes( $DimValor[$n] );
if( substr($DimNomVar[$n], 0, 1)=='_' ){
if( strlen($_Grabar) > 0 ) $_Grabar .= ', ';
$_Grabar .= $DimNomVar[$n]. '="' .$DimValor[$n]. '" ';
continue;
}
if( $DimNomVar[$n]=='PHPSESSID' || $DimNomVar[$n]=='_PSOURCE' ) continue;
if( substr($DimNomVar[$n],0,3) == '___' ) continue;
if( eSqlType('pdo.informix') ){
}else{
if( !eSqlType('oracle') && strlen($DimValor[$n])==10 && substr($DimValor[$n],2,1)=='-' && substr($DimValor[$n],5,1)=='-' ){
$DimValor[$n] = substr($DimValor[$n],6,4).substr($DimValor[$n],2,4).substr($DimValor[$n],0,2);
}
}
if( ($Opcion=='A' || $Opcion=='M' ) && $DimValor[$n]=="" ) $DimValor[$n] = "NULL";
if( $DimNomVar[$n]!=$_DBSERIAL[1] ){
if( strlen($Grabar)>0 ) $Grabar .= '|';
if( $DimValor[$n]=='NULL' ){
$Grabar .= $DimNomVar[$n].'='.rtrim($DimValor[$n]).' ';
}else if( preg_match('/(\+|\-)/', $_pField[$DimNomVar[$n]][2][0]) ){
$Grabar .= $DimNomVar[$n].'='.($DimValor[$n]*1).' ';
}else if( $_pField[$DimNomVar[$n]][2]=="F4" && rtrim($DimValor[$n])=="" ){
$Grabar .= $DimNomVar[$n].'=NULL ';
}else if( !eSqlType('oracle') ){
$Grabar .= $DimNomVar[$n].'="'.rtrim($DimValor[$n]).'" ';
}else{
$Grabar .= $DimNomVar[$n]."='".str_replace("'","''",rtrim($DimValor[$n]))."' ";
}
}
if( eSqlType('pdo.informix') ){
$DimValor[$n] = trim(stripslashes( $DimValor[$n] ));
}else{
if( eSqlType('oracle') ){
$DimValor[$n] = trim(stripslashes( $DimValor[$n] ));
}else{
}
}
if( is_array($_POST[ $DimNomVar[$n] ]) ){
$iValor = '';
while( list( $clave, $val ) = each( $_POST[ $DimNomVar[$n] ] )){
if( $iValor!='' ) $iValor .= '|';
$iValor .= $val;
}
$DimValor[$n] = $iValor;
$sBusca = CondiSQL( $DimNomVar[$n].'[]', $DimValor[$n] );
}else{
if( eSqlType('oracle') ){
$sBusca = CondiSQLOracle( $DimNomVar[$n], $DimValor[$n] );
}else{
$sBusca = CondiSQL( $DimNomVar[$n], $DimValor[$n] );
}
}
if( $sBusca!= '' ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $sBusca;
if( $aBusca!='' ) $aBusca .= ' and ';
$iiConDBRange = false;
if( count($DimDBRange)>0 ){
for( $ii=0; $ii<count($DimDBRange); $ii++ ){
if( $DimDBRange[$ii][0] == $DimNomVar[$n] ){
$iiConDBRange = true;
break;
}
}
}
$aBusca .= str_replace( $DimNomVar[$n], 'A.'.$DimNomVar[$n], $sBusca );
}
if( in_array($DimNomVar[$n], $DimIndice) ){
if( $NTX!='' ) $NTX .= ' and ';
$NTX .= $DimNomVar[$n]. '="' .$DimValor[$n]. '" ';
}
if( $_DBINDEX2!='' ){
if( in_array($DimNomVar[$n], $DimIndice2) ){
if( preg_replace('/[0 .]/', '', $DimValor[$n])=='' && substr_count($_DBINDEX2,',')==0 ){
}else{
if( $NTX2!='' ) $NTX2 .= ' and ';
if( eSqlType('oracle') ){
$NTX2 .= $DimNomVar[$n]. "='" .str_replace("'","''",$DimValor[$n])."' ";
}else{
$NTX2 .= $DimNomVar[$n]. '="' .$DimValor[$n]. '" ';
}
}
}
}
if( $_DBINDEX3!='' ){
if( in_array($DimNomVar[$n], $DimIndice3) ){
if( preg_replace('/[0 .]/', '', $DimValor[$n])=='' && substr_count($_DBINDEX3,',')==0 ){
}else{
if( $NTX3!='' ) $NTX3 .= ' and ';
if( eSqlType('oracle') ){
$NTX3 .= $DimNomVar[$n]. "='" .str_replace("'","''",$DimValor[$n])."' ";
}else{
$NTX3 .= $DimNomVar[$n]. '="' .$DimValor[$n]. '" ';
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
if( $_DBMEMO[$DimNomVar[$n]] ){
if( eSqlType('pdo.informix') ){
$_MemoContenido[] = $DimValor[$n];
}else if( eSqlType('informix') ){
$_MemoContenido[] = ifx_create_blob(1, 0, $DimValor[$n]);
}
}
}
if( $_NotInTemporary<>"" ){
$NomFile = $DFichero[0];
$FicheroD = eScript($NomFile);
$_Accion = 'Ll:'.$NomFile;
unset($_AUX_,$_ORDEN_,$_DESTINO_);
include($Dir_.'_lista.gs');
eEnd();
}
if( $_DBSQL=='' ){
$where = _qBuscar($Busca,$_DBTABLE);
if( $where!="" && $_DBFILTERIN!="" ) $where .= " and ".(($HaySelect)?"A.":"").$_DBFILTERIN;
qCount($_DBTABLE, $where);
}else{
$tmpSQL = GrabaTmp('g_dbsql', $_DBSQL, $LenDoc);
include( $tmpSQL );
_ShowError($php_errormsg, $tmpSQL, $LenDoc);
unset( $_DBSQL );
}
if( $_TReg==0 && count($_DELFILTER)>0 ){
unset($_PHPSESSION);
$_ConDelFilter = true;
$_DelFilterURL = str_replace('{Op}',$Opcion[0],$_DELFILTER[5]);
$ListOriFichero = 'G'.$Opcion.':'.$OriFichero;
$Busca .= ' ';
for( $n=0; $n<count($_DELFILTER[1]); $n++ ){
$_DELFILTER[1][$n] = trim($_DELFILTER[1][$n]);
$p = strpos( $Busca, $_DELFILTER[1][$n].'=' );
$ConLike = strpos( $Busca, $_DELFILTER[1][$n].' ' );
if( strlen($ConLike) > 0 ){
$Busca = substr( $Busca, 0, $ConLike ) . substr( $Busca, strpos( $Busca.' and ', ' and ', $ConLike+1 ) );
$_POST[ $_DELFILTER[1][$n] ] = '';
if( isset($_POST) ) $_POST[ $_DELFILTER[1][$n] ] = '';
}else if( strlen($p) > 0 ){
$Busca = substr( $Busca, 0, $p ) . substr( $Busca, strpos( $Busca.' and ', ' and ', $p+1 ) );
$_POST[ $_DELFILTER[1][$n] ] = '';
if( isset($_POST) ) $_POST[ $_DELFILTER[1][$n] ] = '';
}
}
while( substr_count( $Busca, '  ' ) > 0 ) $Busca = str_replace( '  ', ' ', $Busca );
while( substr_count( $Busca, ' and and ' ) > 0 ) $Busca = str_replace( ' and and ', ' and ', $Busca );
$Busca = str_replace( ' and and ', ' and ', $Busca );
$Busca = trim($Busca);
if( substr( $Busca,-3 ) == 'and' ) $Busca = substr( $Busca, 0, strlen($Busca)-3 );
if( substr( $Busca,0,4 ) == 'and ' ) $Busca = substr( $Busca, 4 );
if( trim($Busca)!='' ){
$where = _qBuscar($Busca,$_DBTABLE);
if( $where!="" && $_DBFILTERIN!="" ) $where .= " and ".(($HaySelect)?"A.":"").$_DBFILTERIN;
qCount( $_DBTABLE, $where );
}
if( $_DELFILTER[4]!='' ) include( eScript($_DELFILTER[4]) );
if( $_TReg == 0 || ( $_TReg > 1 && strtoupper($_DELFILTER[3])=='NOLIST' ) ){
eMessage( '~NRC', 'HS', $_MSGTIME[1], 'if(window.name=="IWORK")history.go(-1);', 'NR' );
}else{
if( !empty($_DBLIMIT ) && $_LimitOn == false && $_TReg > $_DBLIMIT ){
eMessage( '~LEA|'.$_TReg, 'HS', 5000, '' ,'LE' );
}
if( !empty($_DELFILTER) && substr_count(strtoupper($_DELFILTER[0]), '{OP}') > 0 ){
$_DELFILTER[0] = substr($_DELFILTER[0],0,strpos($_DELFILTER[0],'{')). $Opcion .substr($_DELFILTER[0],strpos($_DELFILTER[0],'}')+1);
}
$tmp = explode(':', $_DELFILTER[0]);
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
eInit();
if( $_TReg == 1 ){
switch( $_Accion[0] ){
case 'F': include( $Dir_.'_ficha.gs'  ); break;
case 'G': include( $Dir_.'_gficha.gs' ); break;
case 'L': include( $Dir_.'_lista.gs'  ); break;
case 'E':
$NomFile = substr($_Accion,2);
if( substr_count( $NomFile, '(' )==1 && substr_count( $NomFile, ')' )==1 ){
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
include($Dir_.'_lista.gs');
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
}else if( $_TReg==1 ){
$where = _qBuscar($Busca,$_DBTABLE);
if( $where!="" && $_DBFILTERIN!="" ) $where .= " and ".(($HaySelect)?"A.":"").$_DBFILTERIN;
$sTReg = $_TReg;
qSelect($_DBTABLE, '*', $where, '');
$Fila = qArray();
$_vF = &$Fila;
foreach($_SESSION["CHECK"] as $k=>$v){
if( isset($_vF[$k]) && isset($_SESSION[$v]) && trim($_vF[$k])<>$_SESSION[$v] ){
eMessage( "NoValor: {$k}", 'HSE' );
}
}
foreach($_vF as $key=>$val){
if( isDate($val) ){
if( isZero($_vF[$key]) ) $_vF[$key] = '';
}
}
if( count($_OTHERDF)>0 ){
if( $GLOBALS['_DEBUG']==14 ) eTron('eval: '.'return '.$_OTHERDF[1].';');
if( @eval('return '.$_OTHERDF[1].';') ){
if( substr_count( strtoupper($_OTHERDF[0]), '{OP}' ) > 0 ){
$_OTHERDF[0] = substr($_OTHERDF[0],0,strpos($_OTHERDF[0],'{')). $Opcion .substr($_OTHERDF[0],strpos($_OTHERDF[0],'}')+1);
}
unset($NomFile);
$_Accion = $_OTHERDF[0];
if( substr_count( $_Accion, '.' ) == 0 ) $_Accion .= '.edf';
eInit();
switch( $_Accion[0] ){
case 'F':
$_Accion = substr($_Accion,1);
$__='{#}eDes{#}';
include( $Dir_.'_ficha.gs' );
break;
case 'G':
$_Accion = substr($_Accion,1);
$__='{#}eDes{#}';
include( $Dir_.'_gficha.gs' );
break;
case 'L':
$_Accion = substr($_Accion,1);
$__='{#}eDes{#}';
include($Dir_.'_lista.gs');
break;
default:
eMessage("~O|{$_Accion}",'HE');
}
eEnd();
}
}
$IndicePadre = $Fila[ $_DBINDEX ];
$_Relacion = $IndicePadre;
$_TReg = $sTReg;
}else if( !empty($_DBLIMIT) && $_LimitOn==false ){
if( $_TReg>$_DBLIMIT ){
eMessage('~LE|'.$_TReg, 'HS', 5000, '', 'LE');
}
}
if( $_TReg==-100 ){
$where2 = _qBuscar($dBusca,$DimTabla[1]);
if( $where2!="" && $_DBFILTERIN!="" ) $where2 .= " and ".(($HaySelect)?"A.":"").$_DBFILTERIN;
qCount( $DimTabla[1], $where2 );
eEnd();
}
}
$_DELFILTER = array();
$xDimIndice = explode(',', $_DBINDEX);
$xValIndice = array();
$IndiceMultiple = $aBusca;
for($n=0; $n<count($xDimIndice); $n++){
$xDimIndice[$n] = trim($xDimIndice[$n]);
if( isset($_POST[$xDimIndice[$n]]) ) $_vF[$xDimIndice[$n]] = $_POST[$xDimIndice[$n]];
if( $_vF[$xDimIndice[$n]]!='' && substr_count( $IndiceMultiple,$xDimIndice[$n])==0 ){
if( $IndiceMultiple!='' ) $IndiceMultiple .= ' and ';
if( substr_count( $xDimIndice[$n], '.' ) > 0 ){
$IndiceMultiple .= $xDimIndice[$n]."='".$_vF[$xDimIndice[$n]]."'";
}else{
$IndiceMultiple .= 'A.'.$xDimIndice[$n]."='".$_vF[$xDimIndice[$n]]."'";
}
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
eContextGet($_DBINDEX."=".$IndicePadre);
if( $_TReg==1 && $_SUBLISTADO_!=1 ){
if( $_DBRLOCK && $Opcion!='cR' ){
$xxTabla = array();
foreach($_TableUnique as $k=>$v) $xxTabla[] = $k;
$_DBRLOCK = qRecordMD5($xxTabla, $_DBINDEX."='".$IndicePadre."'");
}
Estadistica('gFi', 0, '', $_DBTABLE);
$Buscar = "{$DimTabla[0]} A";
for($nc=1; $nc<$TotalHojas; $nc++){
if( !empty($DimTabla[$nc]) ){
$Buscar .= ' left join '.$DimTabla[$nc].' '.chr(65+$nc).' on ';
for( $i=0; $i<count($xDimIndice); $i++ ){
if( $i>0 ) $Buscar .= ' and ';
$Buscar .= chr(65+$nc).'.'.$xDimIndice[$i] .'=A.'.$xDimIndice[$i].' ';
}
}
}
if( $_DBADDFILTER!='' ){
if( trim($IndiceMultiple)!='' && $_DBADDFILTER!='' ) $IndiceMultiple .= ' and ';
$IndiceMultiple .= $_DBADDFILTER;
}
$TCampos = ExtraeCampos();
$_PKSeek = _qBuscar($IndiceMultiple,$Buscar);
$where2 = _qBuscar($dBusca,$DimTabla[1]);
if( $where2!="" && $_DBFILTERIN!="" ) $_PKSeek .= " and ".(($HaySelect)?"A.":"").$_DBFILTERIN;
qSelect($Buscar, $TCampos, $_PKSeek, '');
$_Fila = qArray();
$_LOGANSWER["form"] = $_Fila;
$_vF = &$_Fila;
_gsLastInsert($NTX);
foreach($_PHPSESSION as $k=>$v){
if( $_vF[$k]<>$v ) eMessage((($_PHPSESSIONMSG=='')?"(G{$Opcion}) Error de Sessión":$_PHPSESSIONMSG),'HSE');
}
foreach($_vF as $key=>$val){
if( isDate($val) ){
if( isZero($_vF[$key]) ) $_vF[$key] = '';
}
}
}elseif( $_TReg==0 ){
eMessage('~NRC', 'HS', $_MSGTIME[1], 'if(window.name=="IWORK")history.go(-1);', 'NR');
}else{
eContextPut($_SERVER["QUERY_STRING"]);
if( $_LOGFULLSTATUS && $_SESSION["_LOGFULLTYPE"]!=$_LOGFULLTYPE ) $_LOGFULLSTATUS = false;
$_NmGDF = $OriFichero;
$Fichero = $DFichero[0];
$OriFichero = $Fichero;
$Fichero = eScript( $Fichero );
$FicheroD = $Fichero;
eInit();
$__='{#}eDes{#}';
$_Accion='L'; include($Dir_.'_lista.gs');
eEnd();
}
}
if( $Opcion=='A' || $Opcion=='B' || $Opcion=='M' ){
foreach($_PHPSESSION as $k=>$v){
if( $_POST[$k]<>$v ) eMessage((($_PHPSESSIONMSG=='')?"(G{$Opcion}) Error de Sessión":$_PHPSESSIONMSG),'HSE');
}
$DimNomVar  = array_keys(  $_POST);
$DimValor   = array_values($_POST);
$DimValorIn = array_values($_POST);
$Dim = explode('|', $_FIELDSLIST);
$_FIELDSLIST = array();
for($t=0; $t<count($Dim); $t++){
$DimCampo = explode(',', $Dim[$t]);
$sa = $t;
if( $t>9 ) $sa = chr(55+$t);
for( $c=0; $c<count($DimCampo)-1; $c++ ){
$_FIELDSLIST[$DimCampo[$c]] = $sa;
}
}
$IndicePadre = '';
$Extraer = '';
$RegABuscar = '';
$ValorDB = array();
$nDB = 0;
$xCampos = array();
$xValores = array();
$DimValorIn = array();
ExtraeCampos();
for($n=0; $n<count($DimNomVar); $n++){
$DimValor[$n] = str_replace('"','&quot;',$DimValor[$n]);
$DimValorIn[$n] = str_replace('"','&quot;',$DimValorIn[$n]);
if( $_ConDBRange[$DimNomVar[$n]] ) $DimValor[$n] = stripslashes( $DimValor[$n] );
if( substr_count($DimValor[$n], '" and ')==0 && !$_DBMEMO[$DimNomVar[$n]] ){
if( eSqlType('pdo.informix') ){
$DimValor[$n] = trim(stripslashes( $DimValor[$n] ));
}else{
if( eSqlType('oracle') ){
$DimValor[$n] = trim(stripslashes( $DimValor[$n] ));
}else{
$DimValor[$n] = addslashes(trim(stripslashes( $DimValor[$n] )));
}
}
}
$tmp[0] = trim($DimNomVar[$n]);
$tmp[1] = $DimValor[$n];
if( $_SinUrlDecode[$tmp[0]] ){
$tmp[1] = trim($tmp[1]);
}else{
$tmp[1] = trim(urldecode($tmp[1]));
}
$_vF[$tmp[0]] = $tmp[1];
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
include_once( $Dir_.'formstatic.inc' );
if( function_exists("UpdateSubList") ) UpdateSubList($Opcion);
$_SubListGetRecords = GrabaSubLista( $Opcion, true );
}
$tmpFile = GrabaTmp( 'g_dbini', $_DBINI, $LenDoc );
include( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
unset( $_DBINI ); unset( $tmpFile );
if( isset($_CHECKDELETE) && $_CHECKDELETE!='' ) include_once( $Dir_.'checkdelete.inc' );
$n=0;
foreach($_vF as $k=>$v){
$DimNomVar[$n] = $k;
$DimValor[$n] = $v;
$n++;
}
$_MSGANSWER = $sMSGANSWER;
$_MSGANSWEROK = $sMSGANSWEROK;
}
for($n=0; $n<count($DimNomVar); $n++){
if( $DimNomVar[$n][0]=='_' ) continue;
if( $DimNomVar[$n]=='PHPSESSID' ) continue;
if( eSqlType('pdo.informix') ){
if( substr_count('<>=', $DimValor[$n][0])==0 ) $DimValor[$n] = str_replace('"','""',$DimValor[$n]);
}
$tmp = array('','');
$tmp[0] = trim($_FIELDSLIST[$DimNomVar[$n]].'.'.$DimNomVar[$n]);
if( $DimValor[$n]=="" ) $DimValor[$n] = "NULL";
$tmp[1] = $DimValor[$n];
if( $_SinUrlDecode[substr($tmp[0],2)] ){
$tmp[1] = trim($tmp[1]);
}else{
$tmp[1] = trim(urldecode($tmp[1]));
}
$s_vF = $tmp[1];
if( $tmp[1]=='NULL' ){
$tmp[1] = $tmp[1];
}else if( preg_match('/(\+|\-)/', $_pField[$DimNomVar[$n]][2][0]) ){
$tmp[1] = ($tmp[1]*1);
}else if( $_pField[$DimNomVar[$n]][2]=="F4" && $tmp[1]=="" ){
$tmp[1] = 'NULL';
}else if( !eSqlType('oracle') ){
$tmp[1] = '"'.$tmp[1].'"';
}else{
$tmp[1] = "'".str_replace("'","''",$tmp[1])."'";
}
$xAlias = $tmp[0][0];
if( $xAlias>'9' ) $xAlias = ord($xAlias)-55;
if( substr($tmp[0],2,3) == '___' ) continue;
if( $tmp[0][1]=='.' ){
$ValorDB[$nDB][0] = substr( $tmp[0], 2 );
$ValorDB[$nDB][1] = $tmp[1];
$ValorDB[$nDB][2] = chr(65+$xAlias);
$DimValorIn[$nDB] = $ValorDB[$nDB][1];
$_vF[ substr($tmp[0],2) ] = $s_vF;
if( count($_DBSERIAL)>0 && $_DBSERIAL[1] == substr( $tmp[0], 2 ) ){
$_DBSERIAL[2] = $tmp[1];
}
if( $Extraer!='' ) $Extraer .= ', ';
$Extraer .= chr(65+$xAlias).substr( $tmp[0], 1 );
if( $DimGrabar[$xAlias]!='' ) $DimGrabar[$xAlias] .= ',';
if( $DimInsert[$xAlias]!='' ) $DimInsert[$xAlias] .= '|';
if( eSqlType('pdo.informix') ){
}else{
if( !eSqlType('oracle') && strlen($tmp[1])==12 && substr($tmp[1],3,1)=='-' && substr($tmp[1],6,1)=='-' ){
$tmp[1] = '"'.substr($tmp[1],7,4).substr($tmp[1],3,4).substr($tmp[1],1,2).'"';
}
}
$DimGrabar[$xAlias] .= substr($tmp[0], 2).'='.$tmp[1];
$DimInsert[$xAlias] .= substr($tmp[0], 2).'='.$tmp[1];
if( $_DBSERIAL[1]!=substr($tmp[0], 2) ){
if( $xCampos[$xAlias]!='' ){
$xCampos[$xAlias] .= ', ';
$xValores[$xAlias] .= ', ';
}
$xCampos[$xAlias] .= substr( $tmp[0], 2 );
$xValores[$xAlias] .= $tmp[1];
}
if( !empty($tmp[1]) && $tmp[1]<>"NULL" ){
if( !empty($RegABuscar) ) $RegABuscar .= ', ';
$RegABuscar .= substr($tmp[0], 2).'='.$tmp[1];
$DimLong[$xAlias] += strlen($tmp[1]) - 2;
}
if( substr($tmp[0], 2)==$_DBINDEX && empty($IndicePadre) ){
$IndicePadre = $tmp[1];
}
if( $_DBINDEX2!='' ){
if( in_array($DimNomVar[$n], $DimIndice2) ){
if( preg_replace('/[0 .]/', '', $DimValor[$n])=='' && substr_count($_DBINDEX2,',')==0 ){
}else{
if( $NTX2!='' ) $NTX2 .= ' and ';
if( eSqlType('oracle') ){
$NTX2 .= $DimNomVar[$n]. "='" .str_replace("'","''",$DimValor[$n])."' ";
}else{
$NTX2 .= $DimNomVar[$n]. '="' .$DimValor[$n]. '" ';
}
}
}
}
if( $_DBINDEX3!='' ){
if( in_array($DimNomVar[$n], $DimIndice3) ){
if( preg_replace('/[0 .]/', '', $DimValor[$n])=='' && substr_count($_DBINDEX3,',')==0 ){
}else{
if( $NTX3!='' ) $NTX3 .= ' and ';
if( eSqlType('oracle') ){
$NTX3 .= $DimNomVar[$n]. "='" .str_replace("'","''",$DimValor[$n])."' ";
}else{
$NTX3 .= $DimNomVar[$n]. '="' .$DimValor[$n]. '" ';
}
}
}
}
$nDB++;
}else{
eMessage( str_replace('#',$tmp[0],$__Lng[96]), 'HSE');
}
}
$NTX = str_replace('A.','',$IndiceMultiple);
if( $Opcion=='M' && $_ModCampoIndice ){
$tmp = explode('|',$_UNIQUE_);
$NTX = '';
$Busca = '';
for( $i=0; $i<count($tmp); $i+=2 ){
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
eContextGet($NTX);
if( substr_count('ABM',$Opcion)>0 && $_SESSION['_UpdateIntervalDB']>0 ){
if( time()<$_SESSION['_UpdateDB'] ){
error_log(date('Y-m-d H:i:s')." ROBOT ".$_SESSION["_User"]."\n", 3, '../_tmp/err/_robot.err');
eInit();
eEnd();
}
$_SESSION['_UpdateDB'] = time()+($_SESSION['_UpdateIntervalDB']*2);
}
$xTabla  = array();
$xGrabar = array();
$xInsert = array();
$xLong   = array();
$xxCampos  = array();
$xxValores = array();
$xInsertLog = array();
$xGrabarLog = array();
for( $n=0; $n<$TotalHojas; $n++ ){
if( !in_array( $DimTabla[$n], $xTabla ) ){
array_push( $xTabla		, $DimTabla[$n] );
array_push( $xGrabar	, $DimGrabar[$n] );
array_push( $xInsert	, $DimInsert[$n] );
array_push( $xLong		, $DimLong[$n] );
array_push( $xxCampos	, $xCampos[$n] );
array_push( $xxValores	, $xValores[$n] );
array_push( $xInsertLog	, $DimInsert[$n] );
array_push( $xGrabarLog	, $DimGrabar[$n] );
}else{
$v=0;
for( $i=0; $i<count($xTabla); $i++ ){
if( $DimTabla[$n] == $xTabla[$i] ){
if( trim($DimGrabar[$n])!='' || trim($DimInsert[$n])!='' ){
$xGrabar[$v]	.= ','.$DimGrabar[$n];
$xInsert[$v]	.= '|'.$DimInsert[$n];
$xLong[$v]		+= $DimLong[$n];
$xxCampos[$v]	.= ', '.$xCampos[$n];
$xxValores[$v]	.= ', '.$xValores[$n];
$xInsertLog[$v]	.= '|'.$DimInsert[$n];
$xGrabarLog[$v]	.= ','.$DimGrabar[$n];
$v++;
break;
}
}
}
}
}
if( isset($_POST["_FIELDSWITHFILES"]) ){
for( $v=0; $v<count($xxCampos); $v++ ){
$ListaCampos = ','.str_replace(' ','',$xxCampos[$v]).',';
$nf=0;
$tmp = explode('|',$_POST["_FIELDSWITHFILES"]);
for( $n=0; $n<count($tmp)-1; $n++ ){
if( substr_count( $ListaCampos, ','.$tmp[$n].',' ) > 0 ){
if( $_POST[$tmp[$n]]!='' && $_UPLOADFILE[$tmp[$n]]['oDIR']=='' ){
$FileTmp = '../_tmp/zip/'.$_SESSION['_User'].'_'.($nf++);
$data = file_get_contents($FileTmp);
$xInsert[$v]	.= '|'.$_UPLOADFILE[$tmp[$n]]['NOMBRE']."='".addslashes($data)."'";
$xGrabar[$v]	.= ", ".$_UPLOADFILE[$tmp[$n]]['NOMBRE']."='".addslashes($data)."'";
$xxCampos[$v]	.= ', '.$_UPLOADFILE[$tmp[$n]]['NOMBRE'];
$xxValores[$v]	.= ", '".addslashes($data)."'";
$_POST["_FIELDSWITHFILES"] = trim(str_replace( $tmp[$n].'|', '', $_POST["_FIELDSWITHFILES"] ));
}
}
}
}
}
for($n=0; $n<count($xTabla); $n++){
if( $n==0 ){
if( trim($NTX)=='' ){
$_TReg = 0;
}else{
qCount($xTabla[$n], $NTX);
}
$DimTReg[$n] = $_TReg;
}
if( $n>0 && ($xGrabar[$n]!='' || $xInsert[$n]!='') ){
$xGrabar[$n] .= ','.$_DBINDEX.'='.$IndicePadre;
$xInsert[$n] .= '|'.$_DBINDEX.'='.$IndicePadre;
if( $_DBINDEX<>$_DBSERIAL[1] ){
$xxCampos[$n]  .= ', '.$_DBINDEX;
$xxValores[$n] .= ', '.$IndicePadre;
}
}
}
if( $Opcion=='M' || $Opcion=='B' ){
if( isset($_POST['_MD5']) ){
if( $_POST['_MD5']<>qRecordMD5($xTabla, $NTX) ) eMessage($__Lng[93], 'HSE');
}
if( $_PHPCHECK<>'' ){
$_vF = array();
for( $n=0; $n<count($xTabla); $n++ ){
qQuery( "select * from {$xTabla[$n]} where {$NTX}" );
$_vF = array_merge( $_vF, qArray() );
}
$tmpFile = GrabaTmp('f_phpcheck', $_PHPCHECK, $LenDoc, $_FILE_PHPCHECK);
include( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
unset( $_PHPCHECK );
}
}
$DBAcceso = '';
if( substr_count('ABM',$Opcion)>0 ){
$tmp = explode(',',$_DBINDEX);
for($n=0; $n<count($tmp); $n++){
if( $DBAcceso!='' ) $DBAcceso .= ',';
$DBAcceso .= $tmp[$n].'='.${$tmp[$n]};
}
}
switch( $Opcion ){
case 'A':
if( $DimTReg[0]>0 ) eMessage('~DR', 'EHS', $_MSGTIME[1], 'if(window.name=="IWORK")history.go(-1);', 'DR');
if( $NTX2!='' ){
if( qCount($_DBTABLE, $NTX2)>0 ){
eMessage('~DR', 'EHS', $_MSGTIME[1], 'if(window.name=="IWORK")history.go(-1);', 'DR');
}
}
if( $NTX3!='' ){
if( qCount($_DBTABLE, $NTX3)>0 ){
eMessage('~DR', 'EHS', $_MSGTIME[1], 'if(window.name=="IWORK")history.go(-1);', 'DR');
}
}
if( $_DEBUG==5 || $_DEBUG==6 ) include($Dir_.'debug5.inc');
for($n=0; $n<count($xTabla); $n++){
if( $xLong[$n]>0 ){
if( trim($NTX)=='' ){
$_TReg = 0;
}else{
qCount( $xTabla[$n], $NTX );
}
if( $_TReg==0 ){
if( count($_DBSERIAL)>0 ){
if( $_DBSERIAL[0]!=$xTabla[$n] ){
$xxCampos[$n]  = $_DBSERIAL[1].','.$xxCampos[$n];
$xxValores[$n] = $_DBSERIAL[2].','.$xxValores[$n];
}
}
if( $n>0 ){
$sDBSEQUENCE = $_DBSEQUENCE;
$_DBSEQUENCE = '';
$sDBSERIAL = $_DBSERIAL;
$_DBSERIAL = array();
}
sql_Inserta( $xTabla[$n], $xxCampos[$n], $xxValores[$n], $_DBSERIAL[1] );
if( $n>0 ){
$_DBSEQUENCE = $sDBSEQUENCE;
$_DBSERIAL = $sDBSERIAL;
}
$_OkDBINSERT = true;
if( count($_DBSERIAL)>0 && $_DBSERIAL[0]==$xTabla[$n] ){
for($i=0; $i<count($_IdInsert); $i++){
if( $_IdInsert[$i][0]==$_DBSERIAL[0] ){
$_DBSERIAL[2] = $_IdInsert[$i][1];
$_nSerial = $_DBSERIAL[2];
$_IdRegistro[$xTabla[$n]] = $_nSerial;
$_vF[$_DBSERIAL[1]] = $_nSerial;
}
}
$DBAcceso .= $_nSerial;
}
}else{
sql_Modifica( $xTabla[$n], $xGrabar[$n], $NTX );
}
if( $n==0 ){
if( count($_DBLOG) > 0 ){
for( $i=0; $i<count($xTabla); $i++ ){
if( count($_DBSERIAL)>0 && $_DBSERIAL[0] == $xTabla[$i] ){
if( eSqlType('oracle') ){
$OldSerial = trim($_DBSERIAL[1])."=''";
$NewSerial = trim($_DBSERIAL[1])."='".$_nSerial."'";
}else{
$OldSerial = trim($_DBSERIAL[1]).'=""';
$NewSerial = trim($_DBSERIAL[1]).'="'.$_nSerial.'"';
}
sql_Log( $_DBLOG, 'A', $xTabla[$i], str_replace( $OldSerial, $NewSerial, $xInsertLog[$i] ) );
}else{
sql_Log( $_DBLOG, 'A', $xTabla[$i], $xInsertLog[$i] );
}
}
}
}
}
}
if( $_SAVEDATALIST!='' ){
include_once( $Dir_.'formstatic.inc' );
if( function_exists("UpdateSubList") ) UpdateSubList($Opcion);
GrabaSubLista( $Opcion );
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
for( $i=4; $i<count($eDim); $i++ ) $v .= ','.$eDim[$i];
}
if( count($_DBSERIAL) > 0 && $_DBSERIAL[0] == $_DBTABLE ) $_vF[trim($k)] = $_nSerial;
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
Estadistica( 'gFi', 0, $DBAcceso, $xTabla[0] );
if( $_POST["_FIELDSWITHFILES"]!='' ) _FileGetContents( $Opcion );
if( false && count($_ObjetoSQL)>0 && count($_SaveList)==0 && count($_SaveOnLine)==0 ){
for( $w=0; $w<count($_ObjetoSQL); $w++ ){
$xSql = strtolower( $_ObjetoSQL[$w] );
list( ,$tmp ) = explode( ' from ', $xSql );
list( $wTabla, $wWhere ) = explode( ' where ', $tmp );
$wTabla = trim($wTabla);
list( $wWhere, ) = explode( ' order by ', $wWhere );
$wWhere = trim($wWhere);
while( substr_count( $wWhere, '{' ) > 0 ){
$ini = strpos($wWhere,'{')+1;
$fin = strpos($wWhere,'}');
$sCampo = trim( substr( $wWhere, $ini, $fin-$ini ));
if( $_IdRegistro[$xTabla[0]] > 0 ){
$wWhere = str_replace( '{'.$sCampo.'}', $_IdRegistro[$xTabla[0]], $wWhere );
}else{
$wWhere = $NTX;
}
}
$wSql = "update {$wTabla} set {$wWhere}, conexion=0 where conexion=".$GLOBALS['_Connection_'];
qQuery( $wSql );
}
}
_gsLastInsert($NTX, qId());
$_LOGANSWER["answer"] = "ok";
if( $_DBEND!='' ){
$tmpFile = GrabaTmp('g_dbend', $_DBEND, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_DBEND = '';
}
if( $_GET["_SUBINSERT"]==1 ){
$xSUBINSERT .= "_WOPENER._Celda = _WOPENER._FilaLastInsert.cells[0];";
$tmp = explode(",", $_DBINDEX);
for($n=0; $n<count($tmp); $n++){
$xSUBINSERT .= "_WOPENER.ePF('{$tmp[$n]}', '".str_replace("'", chr(92)."'",$_vF[$tmp[$n]])."');";
}
$_JSSTART = $xSUBINSERT;
}
$AyadeSerial = ((isset($_GET['_ISUBLIST']) && count($_DBSERIAL)>0 ) ? "_WOPENER._PutSerial('{$_DBSERIAL[1]}',{$_nSerial});" : '');
$_MSGANSWEROK = true;
eMessage('~S', ((isset($_GET['_STOP'])) ? 'HS':''), $_MSGTIME[0], $AyadeSerial);
$Opcion = 'a'; $SubOp = 'A'; $Titulo='INSERTAR #';
break;
case 'M':
if( $DimTReg[0]!=1 ) eMessage('~DR', 'EHS', $_MSGTIME[1],'', 'DR');
if( $NTX2!='' ){
if( qCount($_DBTABLE, $NTX2.' and not ('.$NTX.')')>0 ){
eMessage('~DR', 'EHS', $_MSGTIME[1], 'if(window.name=="IWORK")history.go(-1);', 'DR');
return;
}
}
if( $NTX3!='' ){
if( qCount($_DBTABLE, $NTX3.' and not ('.$NTX.')')>0 ){
eMessage('~DR', 'EHS', $_MSGTIME[1], 'if(window.name=="IWORK")history.go(-1);', 'DR');
return;
}
}
if( $_DEBUG==5 || $_DEBUG==6 ) include( $Dir_.'debug5.inc' );
if( isset($_LastValue) ){
qQuery( "select {$_LastValue} from ".$xTabla[0].' where '.$NTX );
$_LastValue = qArray();
}
if( count($_DBLOG)>0 ){
for( $n=0; $n<count($xTabla); $n++ ){
qQuery( 'select * from '.$xTabla[$n].' where '.$NTX );
$xxGrabar = ','.$xGrabarLog[$n];
$r = qArray();
foreach( $r as $k=>$v ){
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
if( $xxGrabar<>'' ) sql_Log($_DBLOG, 'M', $xTabla[$n], $xxGrabar);
}
}
for($n=0; $n<count($xTabla); $n++){
qCount($xTabla[$n], $NTX);
if( $_TReg==0 && $xLong[$n]>0 ){
if( count($_DBSERIAL)>0 && $_DBSERIAL[0]!=$xTabla[$n] ){
$xxCampos[$n]  = $_DBSERIAL[1].','.$xxCampos[$n];
$xxValores[$n] = $_DBSERIAL[2].','.$xxValores[$n];
}
if( $n>0 ){
$sDBSEQUENCE = $_DBSEQUENCE;
$_DBSEQUENCE = '';
$sDBSERIAL = $_DBSERIAL;
$_DBSERIAL = array();
}
sql_Inserta($xTabla[$n], $xxCampos[$n], $xxValores[$n], $_DBSERIAL[1]);
if( $n>0 ){
$_DBSEQUENCE = $sDBSEQUENCE;
$_DBSERIAL = $sDBSERIAL;
}
}else if( $_TReg==1 ){
if( $xTabla[$n]==$_DBSERIAL[0] ){
if( !eSqlType('oracle') ){
$pos = strpos($xGrabar[$n], $_DBSERIAL[1].'="');
}else{
$pos = strpos($xGrabar[$n], $_DBSERIAL[1]."='");
}
if( $pos===false ){
}else{
for($pi=$pos; $pi>1; $pi--){
if( substr($xGrabar[$n], $pi, 1)==',' ) break;
}
for($pf=$pos+strlen($_DBSERIAL[1].'="'); $pf<strlen($xGrabar[$n]); $pf++){
if( substr( $xGrabar[$n], $pf, 1 ) == ',' ) break;
}
$xGrabar[$n] = trim(str_replace( substr( $xGrabar[$n], $pi, $pf-$pi ), '', $xGrabar[$n] ));
if( $xGrabar[$n][0]==',' ) $xGrabar[$n] = substr($xGrabar[$n],1);
}
}
if( $_FILELOG[$xTabla[$n]] ){
$_FILELOG[$xTabla[$n]] = array();
qQuery('select * from '.$xTabla[0].' where '.$NTX);
$cur = qArray();
foreach($cur as $k=>$v){
$_FILELOG[$xTabla[$n]][$k] = $v;
}
}
if( trim($xGrabar[$n])!='' ){
sql_Modifica($xTabla[$n], $xGrabar[$n], $NTX);
}
}
}
if( $_SAVEDATALIST!='' ){
include_once($Dir_.'formstatic.inc');
if( function_exists("UpdateSubList") ) UpdateSubList($Opcion);
GrabaSubLista($Opcion);
}
Estadistica('gFi', 0, $DBAcceso, $xTabla[0]);
if( $_POST["_FIELDSWITHFILES"]!='' ) _FileGetContents($Opcion);
_gsLastInsert($NTX);
$_LOGANSWER["answer"] = "ok";
if( $_DBEND!='' ){
$tmpFile = GrabaTmp('g_dbend', $_DBEND, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_DBEND = '';
}
$_MSGANSWEROK = true;
eMessage('~U', ((isset($_GET['_STOP'])) ? 'HS':''), $_MSGTIME[0], $tmpAutoMenu);
$Opcion = 'm'; $SubOp = 'mR';
break;
case 'B':
if( $DimTReg[0]!=1 ) eMessage( '~DR', 'EHS', $_MSGTIME[1],'', 'DR' );
if( $_DBBAKDELETE ){
for( $n=0; $n<count($xTabla); $n++ ){
if( substr($xTabla[$n],-4)!='_dlt' ){
if( qCount( $xTabla[$n].'_dlt', $NTX ) > 0 ) qQuery( "delete from {$xTabla[$n]}_dlt where {$NTX}" );
qQuery( "insert into {$xTabla[$n]}_dlt select * from {$xTabla[$n]} where {$NTX}" );
if( $_DBBakDeleteUpdate!='' ){
list( $xFieldFecha, $xFieldUser ) = explode(',',$_DBBakDeleteUpdate);
$xInstante = ( substr(trim($xFieldFecha),0,3)=='dt_' ) ? date('Y-m-d') : date('Y-m-d H:i:s');
qQuery( "update {$xTabla[$n]}_dlt set {$xFieldFecha}='{$xInstante}', {$xFieldUser}='{$_User}' where {$NTX}" );
}
}else{
if( qCount( substr($xTabla[$n],0,-4), $NTX ) == 0 ){
qQuery( "insert into ".substr($xTabla[$n],0,-4)." select * from {$xTabla[$n]} where {$NTX}" );
if( $_DBBakDeleteUpdate!='' ){
list( $xFieldFecha, $xFieldUser ) = explode(',',$_DBBakDeleteUpdate);
$xInstante = ( substr(trim($xFieldFecha),0,3)=='dt_' ) ? date('Y-m-d') : date('Y-m-d H:i:s');
qQuery( "update ".substr($xTabla[$n],0,-4)." set {$xFieldFecha}='{$xInstante}', {$xFieldUser}='{$_User}' where {$NTX}" );
}
}else{
eMessage( $__Lng[94], 'EHS', '','', 'FND' );
}
}
}
}
if( count($_DBLOG)>0 ){
for( $n=0; $n<count($xTabla); $n++ ){
sql_Log( $_DBLOG, 'B', $xTabla[$n], $NTX );
}
}
if( count($_Fichero)>0 ){
$xNomFileBak = '';
for( $nf=0; $nf<count($_Fichero); $nf++ ){
if( $_Fichero[$nf][0]=='_' ) continue;
if( $_UPLOADFILE[$_Fichero[$nf]]['NOMBRE']!=$_Fichero[$nf] ){
$ListCampos = $_DBSERIAL[1].','.$_Fichero[$nf];
}else{
$ListCampos = $_UPLOADFILE[$_Fichero[$nf]]['NOMBRE'];
}
qSelect( $_DBTABLE, $ListCampos, $NTX );
$row = qArray();
$_vF = &$row;
if( $_UPLOADFILE[$_Fichero[$nf]]['NOMBRE']!=$_Fichero[$nf] ){
$NomExt = substr( $row[$_Fichero[$nf]], strrpos($row[$_Fichero[$nf]], '.' ));
$xNomFile = $row[$_UPLOADFILE[$_Fichero[$nf]]['NOMBRE']].$NomExt;
$xNomFileBak = $row[$_UPLOADFILE[$_Fichero[$nf]]['NOMBRE']].'.bak';
}else{
$xNomFile = $row[$_Fichero[$nf]];
}
$xNomFile = trim($xNomFile);
$xNomFileBak = _NmFileConPrefijo( $xNomFileBak, $_UPLOADFILE[$_Fichero[$nf]]['PREFIJO'] );
$xNomFile = _NmFileConPrefijo( $xNomFile, $_UPLOADFILE[$_Fichero[$nf]]['PREFIJO'] );
if( trim($xNomFile)!='' && file_exists( $_UPLOADFILE[$_Fichero[$nf]]['DIR'].'/'.$xNomFile ) ){
if( unlink( $_UPLOADFILE[$_Fichero[$nf]]['DIR'].'/'.$xNomFile ) == false ){
eMessage( $__Lng[95], 'EHS', '','', 'FND' );
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
_ISubListDelete( $iFile, $iRelacion, $_POST[$iRelacion] );
}
for( $n=0; $n<count($xTabla); $n++ ){
qCount( $xTabla[$n], $NTX );
if( $_TReg == 1 ){
sql_Borra( $xTabla[$n], $NTX );
}
}
Estadistica( 'gFi', 0, $DBAcceso, $xTabla[0] );
_gsLastInsert($NTX);
$_LOGANSWER["answer"] = "ok";
if( $_DBEND!='' ){
$tmpFile = GrabaTmp( 'g_dbend', $_DBEND, $LenDoc );
include( $tmpFile );
_ShowError( $php_errormsg, $tmpFile, $LenDoc );
$_DBEND = '';
}
$_MSGANSWEROK = true;
if( substr($xTabla[0],-4)=='_dlt' ){
eMessage( '~R', ((isset($_GET['_STOP'])) ? 'HS':''), $_MSGTIME[0] );
}else{
eMessage( '~D', ((isset($_GET['_STOP'])) ? 'HS':''), $_MSGTIME[0] );
}
$Opcion = 'b'; $SubOp = 'bR';
break;
default:
if( $_DBEND!='' ){
$tmpFile = GrabaTmp('g_dbend', $_DBEND, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_DBEND = '';
}
}
$SoloQue = true;
}else{
if( $_DBEND!='' ){
$tmpFile = GrabaTmp('g_dbend', $_DBEND, $LenDoc);
include($tmpFile);
_ShowError($php_errormsg, $tmpFile, $LenDoc);
$_DBEND = '';
}
}
?>
