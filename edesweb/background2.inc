<?PHP
function _ExitPHP(){
global $_BKG, $_HndDB;
if( $_BKG!=-1 ) eBkgEnd( 'E' );
if( $_HndDB ) qEnd();
exit;
}
function eTrace( $txt ){
global $_BKG, $_User, $_File;
$NomFile = '../_tmp/err/_log.err';
$txt = date('Y-m-d H:i:s')." -> BACKGROUND\n".
'	Usuario: '.$_User."\n".
'	Script.: '.$_File."\n".
'	Error..: '.$txt."\n";
error_log( $txt."\n", 3, $NomFile );
}
function eTron( $txt, $caja=false, $borrar=false ){
global $_User;
if( $_User=='' ) $_User = $_SESSION['_User'];
if( $_User=='' ) $_User = '-1';
$NomFile = '../_tmp/__tron.'.$_User;
$txt = 'BACKGROUND: '.$txt;
if( $borrar ){
@unlink( $NomFile );
}else if( $caja ){
error_log( '['.$txt.']'."\n", 3, $NomFile );
}else{
error_log( $txt."\n", 3, $NomFile );
}
}
function eScript( $File ){
if( $File[0]=='.' ) return $File;
$Dir = eGetCWD();
$Dir = substr($Dir,0,strrpos($Dir,'/'));
if( substr($File,0,2)=='//' ){
$File = $Dir .'.file'. substr($File,1);
}else if( $File[0]=='/' ){
$File = $Dir . $File;
}else if( $File[0]=='$' ){
$Dir = substr($Dir,0,strrpos($Dir,'/'));
$File = $Dir .'/edesweb/'. substr($File,1);
}else{
$File = '../d/'.$File;
}
return trim($File);
}
function eGetCWD(){
return str_replace('\\','/',getcwd());
}
function eInclude(){
global $Dir_;
error_reporting( _ERROR_REPORTING );
for( $i=0; $i<func_num_args(); $i++ ){
$File = strtolower(func_get_arg($i));
if( !strstr($File,'.') || ( substr($File,-6)=='.class' && substr_count($File,'.')==1 ) ){
$File .= '.inc';
include_once( $Dir_.$File );
}else{
include_once( eScript($File) );
}
}
}
function TieneGZip(){
if( headers_sent() ) return 0;
if( strpos($_SERVER['HTTP_ACCEPT_ENCODING'],'x-gzip')!==false) return "x-gzip";
if( strpos($_SERVER['HTTP_ACCEPT_ENCODING'],'gzip'  )!==false) return "gzip";
return 0;
}
function EnviaGZip( $level=1, $debug=false ){
global $_LogUsuario, $_User, $_DEBUG, $php_errormsg, $_CompressedPages;
if( !isset($_CompressedPages) ) $_CompressedPages = true;
if( $_CompressedPages ){
$ENCODING = TieneGZip();
$Contents = ob_get_contents();
}
if( $php_errormsg!='' ) exit;
if( $_SESSION['_D_']!='' ) include( $GLOBALS['Dir_'].'t/source.inc' );
if( $_CompressedPages && $ENCODING && !$debug ){
ob_end_clean();
header("Content-Encoding: {$ENCODING}");
print "\x1f\x8b\x08\x00\x00\x00\x00\x00";
$Size = strlen($Contents);
$Crc = crc32($Contents);
$Contents = gzcompress( $Contents, $level );
$Contents = substr( $Contents, 0, strlen($Contents) - 4 );
print $Contents;
print pack('V',$Crc);
print pack('V',$Size);
if( isset($_LogUsuario) && in_array($_User, $_LogUsuario) ){
$fd = fopen('../_tmp/log/'.date('dHis').'.'.$_User, 'w');
fwrite($fd, "\x1f\x8b\x08\x00\x00\x00\x00\x00".$Contents.pack('V',$Crc).pack('V',$Size));
fclose($fd);
}
}else{
if( isset($_LogUsuario) && in_array($_User, $_LogUsuario) ){
$fd = fopen('../_tmp/log/'.date('dHis').'.'.$_User, 'w');
fwrite($fd, $Contents);
fclose($fd);
}
}
if( $_CompressedPages ) while(ob_get_level()>0) ob_end_flush();
if( $_DEBUG==4 ) eLogDebug("HTML End");
if( isset($_GET['_DEBUG']) && $_GET['_DEBUG']==99 ) file_put_contents('_debug_end.txt','PHP End '.date('H:i:s').substr(microtime(),1,7));
exit;
}
function eInit($ConEdes=false, $ConCabecera=false){
ob_end_clean(); ob_start();
if( $ConEdes || $ConCabecera ) eHTML();
if( $ConEdes ) _FileNoCache('edes.js');
if( isset( $GLOBALS['_gsTRACE'] ) ){
global $_gsTRACE;
for( $i=0; $i<count($_gsTRACE); $i++ ) echo '<span style="font-family:monospace; font-size:12px; color:#00009C;background:#D6DFE7;"><B>:'.htmlspecialchars($_gsTRACE[$i]).'</B></span><br>';
}
}
function eEnd( $MsgError='' ){
global $_DEBUG, $_Development, $_HndDB;
if( $_HndDB ){
qFree();
qEnd();
}
if( $_DEBUG==31 ) file_put_contents( '../_tmp/log/'.$_SESSION['_User'].'_'.date('dHis').'.htm', ob_get_contents() );
if( $_SESSION['_D_']!='' ) file_put_contents( '../_tmp/log/'.$_SESSION['_User'].'_'.str_replace('/','_',$GLOBALS['_SourceScript']), ob_get_contents() );
if( $_DEBUG == 9 ){
global $_DimDebug;
echo "\n<div>";
for( $i=0; $i<count($_DimDebug); $i++ ){
if( substr($_DimDebug[$i],0,3) == '[#]' ){
echo '</div><BR>'.'<div style="background:#D6DFE7;border:1px solid #00009C; text-align:left;font-size:12px"><A HREF="javascript:{}">'; //echo '</div><BR>'.'<div><A HREF="javascript:{}">';
eTrace( $_DimDebug[$i] );
echo '</A>';
}else{
eTrace( $_DimDebug[$i], 1 );
}
}
echo '</div>';
echo '<SCRIPT type="text/javascript">setTimeout("document.body.scrollTop=document.body.scrollHeight;",500);</SCRIPT>';
}else if( $_DEBUG == 11 ){
global $_DimDebug;
for( $i=0; $i<count($_DimDebug); $i++ ) eTron( $_DimDebug[$i] );
}
if( isset($_SESSION['_SP_']) ) echo '<SCRIPT type="text/javascript">top.eInfo(window,"~ AVISO: Ejecutando DDBB de Procesos ~",-1);</SCRIPT>';
if( $_POST["_FIELDSWITHFILES"]!='' ) _FileDeleteTemp();
if( $_DEBUG==7 || $_Development ){
EnviaGZip(0,true);
}else if( $GLOBALS['_CachearPag'] ){
EnviaGZip(1,false);
}else{
EnviaGZip(9,false);
}
exit;
}
function eOkMode( $Opcion, $cModo, $_SubModo='' ){
if( $cModo=='' ) return false;
if( $cModo=='l' && $cModo==substr($Opcion,-1) ) return true;
$cModo = trim(str_replace(',?R,',',cR,bR,mR,',str_replace(' ','',','.$cModo.',')));
$cModo = str_replace(',*l,',',cl,bl,ml,',$cModo);
$cModo = str_replace(',?l,',',cl,bl,ml,',$cModo);
$cModo = str_replace(',?,',',c,b,m,',$cModo);
$cModo = substr($cModo,1,-1);
return (
$cModo==$Opcion ||
substr_count(",{$cModo},",",{$Opcion},")>0 ||
$cModo=='*' ||
( strlen($Opcion)==2 && substr($Opcion,1,2)=='R' && substr_count(",{$cModo},",',*R,')>0 ) ||
( $cModo=='?' && substr_count(',c,b,m,',",{$Opcion},")>0 ) ||
($_SubModo!='' && substr_count(",{$cModo},",",{$_SubModo},")>0) );
}
function ePrintR(){
eInit();echo '<pre>';
$Dim = func_get_args();
for( $n=0; $n<count($Dim); $n++ ){
print_r($Dim[$n]);
echo "\n";
}
echo '</pre><script type="text/javascript">top.eLoading(false,window);</script>';exit;
}
function OpenDF( $File, $Check=1 ){
global $_CryptDF, $_Script_;
$_Script_ = $File;
if( $_CryptDF ){
return gzfile( $File );
}else{
if( $Check ){
if( file_exists($File)!=1 ){
$tmp = explode('.',$File);
echo "5.No existe el fichero [$File]";
if( substr_count($File,'/edesweb/')==1 ){
list(,$fch) = explode('/edesweb/',$File);
$fch = '$'.$fch;
}else{
list(,$fch) = explode('/d/',$File);
}
KeyEditFile( $fch );
exit;
}
if( is_readable($File)!=1 ) die('5.No se puede leer'.(( $GLOBALS['_Tree']==1 ) ? " [$File]" : '') );
}
if( substr($File,-4)=='.zdf' ){
$txt = file_get_contents($File);
if( substr($txt,0,5)=='eDes ' ){
return explode( "\n", gzuncompress(substr($txt,5)) );
}else{
return explode( "\n", $txt );
}
}else{
return file( $File );
}
}
}
$_LeeDFEsRem = false;
function LeeDF( &$buffer, $DimOpcion, &$_Variable, &$SaltarLinea, &$_Form, &$Chr_1, &$_FIELDSET, &$_TmpFieldSet, &$_EnLinea, &$_TmpEnLinea, &$_EnColumna, &$_TmpEnColumna, &$TipoEntrada, $ElPuntoEsRem=true, &$nextLine="", $nHoja=1 ){
global $_LeeDFEsRem, $_User, $_Node, $_Tree, $_WebMaster, $_DEBUG, $_Development;
$buffer = trim($buffer);
if( $nextLine!="" ){
$buffer = $nextLine." ".$buffer;
$nextLine = "";
}
if( $buffer=='' ){
$Chr_1 = substr($TipoEntrada,0,3);
if( $_DEBUG==2 && !$_LeeDFEsRem && ($Chr_1=='_PH' || $Chr_1=='_JS' || $Chr_1=='_DB') ){
$buffer = '';
return true;
}
return false;
}
$Chr_3 = substr($buffer,0,3);
$Chr_2 = substr($Chr_3,0,2);
$Chr_1 = $Chr_2[0];
$OldBuffer = $buffer;
if( strpos($buffer,'/'.'/')!==false ){
if( substr_count( strtoupper($buffer), '[UPLOADFILE]' )==1 ){
$p = strpos( $buffer, '//', strrpos( $buffer, '|' ) );
if( $p !== false ) if( substr_count( chr(39).'":', substr( $buffer, $p-1, 1 ) ) == 0 ) $buffer = chop(substr( $buffer, 0, $p ));
}else{
$p = strpos( $buffer, '/'.'/' );
if( substr($buffer,$p-1,1)!='\\' ){
if( substr_count( chr(39).'":', substr( $buffer, $p-1, 1 ) ) == 0 ) $buffer = chop(substr( $buffer, 0, $p ));
}
}
}
if( substr($buffer,-1)=="_" ){
$nextLine = trim(substr($buffer,0,-1));
return false;
}
if( $Chr_2=='/'.'*' && substr_count( $buffer, '*'.'/' ) == 0 ){
$_LeeDFEsRem = true;
}else if( $_LeeDFEsRem && substr_count( $buffer, '*'.'/' ) > 0 ){
$_LeeDFEsRem = false;
$buffer = trim(substr($buffer,strpos($buffer, '*'.'/')+2 ));
if( $buffer=='' ) return false;
}
if( $_LeeDFEsRem ) return false;
if( ($Chr_1=='.' && $ElPuntoEsRem) || $Chr_2=='//' ) return false;
if( $Chr_1 == '¿' ){
list( $tmp ) = explode('?',$buffer);
$tmp = trim(substr( $tmp, 1 ));
$buffer = trim( substr( $buffer, strpos( $buffer, '?' )+1 ) );
if( substr($tmp,0,2) == '#(' ){
list( $tmp ) = explode(')',substr($tmp,2));
$tmp = trim($tmp);
$cModo = explode(',',$tmp );
$acc = ( count( array_intersect( $cModo, $DimOpcion ) ) > 0 );
}else if( substr($tmp,0,3) == '#!(' ){
list( $tmp ) = explode(')',substr($tmp,3));
$tmp = trim($tmp);
$cModo = explode(',',$tmp );
$acc = !( count( array_intersect( $cModo, $DimOpcion ) ) > 0 );
}else if( substr($tmp,0,2) == '#!' ){
$acc = !( $_Variable[str_replace('!','',$tmp)] );
}else if( $tmp[0] == '#' ){
$acc = ( $_Variable[$tmp] );
}else{
if( $TipoEntrada=='_PHPSTART' && $buffer[0]=='[' ){
$TipoEntrada = '-1';
return true;
}
$acc = _ExeEval( $tmp, $buffer );
}
if( $buffer=='' ){
if( !$acc ) $SaltarLinea = true;
return false;
}else{
if( $buffer[0]=='[' ) $TipoEntrada = '';
if( !$acc ){
$Chr_1 = $buffer[0];
return false;
}
}
$Chr_3 = substr($buffer,0,3);
$Chr_2 = substr($Chr_3,0,2);
$Chr_1 = $buffer[0];
}else if( $Chr_1 == '?' ){
if( $Chr_2 == '?¿' ){
$SaltarLinea = !$SaltarLinea;
return false;
}else if( $Chr_2!='?'.'>' ){
$SaltarLinea = false;
return false;
}
}
if( $SaltarLinea ) return false;
if( $Chr_1 == '#' ){
if( substr_count( $buffer, '¿' ) > 0 ){
$ConSalto = true;
}
if( $Chr_2 == '#P' || $Chr_3 == '#!P' ){
if( substr($buffer,0,3)=='#P(' || substr($buffer,0,4)=='#!P(' || strtoupper(substr($buffer,0,12))=='#PERMISSION(' || strtoupper(substr($buffer,0,13))=='#!PERMISSION(' ){
$i = strpos($buffer,'(')+1;
$Label = trim(substr($buffer,$i,strpos($buffer,')')-$i));
$Label_2 = '';
if( substr_count($Label,'"')+substr_count($Label,"'") > 2 ){
$i = strpos($Label,$Label[0],1)+1;
$Label_1 = substr($Label,0,$i);
$i = strpos($Label,substr($Label,-1),$i);
$Label_2 = substr($Label,$i+1,-1);
}
$buffer = ltrim(substr($buffer,strpos($buffer,')')+1));
if( $Label_2<>'' ){
$res = ePermission( $Label_1, $Label_2 );
}else{
$res = ePermission( $Label );
}
if( substr($Chr_2,1)=='!' ) $res = !$res;
if( $buffer[0]=='¿' ) $SaltarLinea = !$res;
if( $buffer[0]=='[' ) $TipoEntrada = '';
return $res;
}
}
if( $Chr_2!='#(' && $Chr_2!='#!' && $ConSalto ){
list( $tmp ) = explode('¿',$buffer);
$SaltarLinea = !$_Variable[trim($tmp)];
return false;
}else if( $Chr_2 == '#(' || $Chr_2 == '#!' ){
$i = strpos( $buffer, '(' )+1;
if( $i>1 ){
$cModo = trim(substr( $buffer, $i, strpos($buffer,')')-$i ));
$buffer = trim( substr( $buffer, strpos( $buffer, (($ConSalto)?'¿':')') )+1 ) );
if( $buffer[0]=='[' ) $TipoEntrada = '';
$cModo = str_replace('"',"'",$cModo);
if( strpos($cModo,"'") == 0 ){
$cModo = explode(',',$cModo );
$acc = ( count( array_intersect( $cModo, $DimOpcion ) ) > 0 );
}else{
}
if( $Chr_2!='#(' ) $acc = !$acc;
}else if( $Chr_2 == '#!' ){
list( $acc ) = explode('¿',$buffer);
$acc = '#'.trim(substr($acc,2));
$acc = !$_Variable[$acc];
$buffer = '';
}
if( $acc ){
if( $ConSalto && $buffer=='' ) return false;
}else{
if( $ConSalto ) $SaltarLinea = true;
return false;
}
$Chr_1 = $buffer[0];
}else{
list( $tmp ) = explode('¿',$buffer);
$tmp = trim($tmp);
if( $tmp[0] == '#' ){
foreach( $_Variable as $k=>$v ){
if( $k == $tmp ){
$acc = ( $_Variable[$tmp] );
if( $acc ){
$SaltarLinea = false;
return false;
}else{
$SaltarLinea = true;
return false;
}
break;
}
}
}
}
}
if( $Chr_1 == '{' && $TipoEntrada=='_FIELDS' && $DimOpcion[0]!='l' ){
if( $GLOBALS['_LNGCOL'] > -1 && !(strpos( $buffer, '@' )===false) ){
global $_LANGUAGE, $_LngPublic;
for( $n=0; $n<count($_LANGUAGE); $n++ ) $buffer = str_replace( $_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $buffer );
foreach( $_LngPublic as $k=>$v ) $buffer = str_replace( $k, $v, $buffer );
}
if( substr($buffer,0,5) == '{FS}{' ){
list( ,, $_TmpFieldSet[0] ) = explode('{',$buffer);
list( $_TmpFieldSet[0], $_TmpFieldSet[3] ) = explode('|',$_TmpFieldSet[0]);
$_TmpFieldSet[0] = trim($_TmpFieldSet[0]);
$_TmpFieldSet[1] = true;
$_TmpFieldSet[4] = count($_Form);
return false;
}else if( substr($buffer,0,5) == '{FR}{' ){
list( ,, $_TmpEnLinea[0] ) = explode('{',$buffer);
$_TmpEnLinea[0] = trim($_TmpEnLinea[0]);
$_TmpEnLinea[1] = '+';
$_TmpEnLinea[3] = count($_Form);
return false;
}else if( substr($buffer,0,5) == '{FC}{' ){
list( ,, $_TmpEnColumna[0] ) = explode('{',$buffer);
$_TmpEnColumna[0] = trim($_TmpEnColumna[0]);
$_TmpEnColumna[1] = '+';
$_TmpEnColumna[3] = count($_Form);
return false;
}else if( strtoupper(substr($buffer,0,10)) == '{COLUMNS}{' ){
global $_TmpNColumnas;
list( ,,$_TmpNColumnas[0] ) = explode('{',$buffer);
$_TmpNColumnas[0] = trim($_TmpNColumnas[0]);
$_TmpNColumnas[1] = '+';
$_TmpNColumnas[3] = count($_Form);
return false;
}else if( strtoupper(substr($buffer,0,5)) == '{TAB}' ){
global $_SUBTAB;
list(,$tmp) = explode('|',substr($buffer,5));
for( $n=0; $n<count($tmp); $n++ ) $tmp[$n] = trim($tmp[$n]);
$_SUBTAB[$nHoja] = $tmp;
return true;
}else if( strtoupper(substr($buffer,0,9)) == '{ISUBLIST}' ){
return true;
}
}else if( $buffer == '}' ){
global $_NewNColumnas, $_TmpNColumnas;
if( $_TmpEnLinea[1] ){
$_TmpEnLinea[2] = $_Form[count($_Form)-1][1];
if( substr_count( $_TmpEnLinea[2], '{' ) == 1 ) list( $_TmpEnLinea[2] ) = explode( '{', $_TmpEnLinea[2] );
if( substr_count( $_TmpEnLinea[2], ':' ) == 1 ) list( $_TmpEnLinea[2] ) = explode( ':', $_TmpEnLinea[2] );
$_EnLinea[$_TmpEnLinea[1]]['I'] = $_EnLinea[$_TmpEnLinea[2]][F] = true;
$_EnLinea[$_TmpEnLinea[1]]['S'] = $_TmpEnLinea[0];
for( $i=count($_Form)-1; $i>$_TmpEnLinea[3]; $i-- ){
list( $sCampo ) = explode('{',$_Form[$i][1]);
list( $sCampo ) = explode(':',$sCampo);
if( $sCampo == $_TmpEnLinea[1] ) break;
if( ($_Form[$i][0][0]!='<' && $_Form[$i][0][0]!=',') || strtoupper(substr($_Form[$i][0],0,4))=='<BR>' ) $_Form[$i][0] = ','.$_Form[$i][0];
}
$_TmpEnLinea = array('','','');
return false;
}else if( $_TmpEnColumna[1] ){
$_TmpEnColumna[2] = $_Form[count($_Form)-1][1];
if( substr_count( $_TmpEnColumna[2], '{' ) == 1 ) list( $_TmpEnColumna[2] ) = explode( '{', $_TmpEnColumna[2] );
if( substr_count( $_TmpEnColumna[2], ':' ) == 1 ) list( $_TmpEnColumna[2] ) = explode( ':', $_TmpEnColumna[2] );
$_EnColumna[$_TmpEnColumna[1]]['I'] = $_EnColumna[$_TmpEnColumna[2]]['F'] = true;
$_EnColumna[$_TmpEnColumna[1]]['S'] = $_TmpEnColumna[0];
for( $i=count($_Form)-1; $i>$_TmpEnColumna[3]; $i-- ){
list( $sCampo ) = explode('{',$_Form[$i][1]);
list( $sCampo ) = explode(':',$sCampo);
if( $sCampo == $_TmpEnColumna[1] ) break;
if( ($_Form[$i][0][0]!='<' && $_Form[$i][0][0]!=',') || strtoupper(substr($_Form[$i][0],0,4))=='<BR>' ) $_Form[$i][0] = ','.$_Form[$i][0];
}
$_TmpEnColumna = array('','','');
return false;
}else if( $_TmpNColumnas[1] ){
$_TmpNColumnas[2] = $_Form[count($_Form)-1][1];
list( $_TmpNColumnas[2] ) = explode( '{', $_TmpNColumnas[2] );
list( $_TmpNColumnas[2] ) = explode( ':', $_TmpNColumnas[2] );
$_NewNColumnas[$_TmpNColumnas[1]]['I'] = $_NewNColumnas[$_TmpNColumnas[2]]['F'] = true;
$_NewNColumnas[$_TmpNColumnas[1]]['NC'] = $_TmpNColumnas[0];
$_TmpNColumnas = array('','','');
return false;
}else if( $_TmpFieldSet[1] ){
$_TmpFieldSet[2] = $_Form[count($_Form)-1][1];
if( substr_count( $_TmpFieldSet[2], '{' ) == 1 ) list( $_TmpFieldSet[2] ) = explode( '{', $_TmpFieldSet[2] );
if( substr_count( $_TmpFieldSet[2], ':' ) == 1 ) list( $_TmpFieldSet[2] ) = explode( ':', $_TmpFieldSet[2] );
$_FIELDSET[$_TmpFieldSet[1]]['I'] = $_FIELDSET[$_TmpFieldSet[2]]['F'] = ($_TmpFieldSet[1]!='+');
$_FIELDSET[$_TmpFieldSet[1]]['T'] = $_TmpFieldSet[0];
$_FIELDSET[$_TmpFieldSet[1]]['S'] = $_TmpFieldSet[3];
for( $i=count($_Form)-1; $i>$_TmpFieldSet[4]; $i-- ){
list( $sCampo ) = explode('{',$_Form[$i][1]);
list( $sCampo ) = explode(':',$sCampo);
if( $sCampo == $_TmpFieldSet[1] ) break;
if( ($_Form[$i][0][0]!='<' && $_Form[$i][0][0]!=',') || strtoupper(substr($_Form[$i][0],0,4))=='<BR>' ) $_Form[$i][0] = ','.$_Form[$i][0];
}
$_TmpFieldSet = array('','','','');
return false;
}
}
if( $buffer!='' ){
if( $_DEBUG == 9 || $_DEBUG == 11 ){
global $_DimDebug;
$_DimDebug[] = $buffer;
}
$c = substr($TipoEntrada,0,3);
if( $_DEBUG==2 && ($c=='_PH' || $c=='_JS' || $c=='_DB') ) $buffer = $OldBuffer;
if( $GLOBALS['_LNGCOL'] > -1 && !(strpos( $buffer, '@' )===false) ){
global $_LANGUAGE, $_LngPublic;
for( $n=0; $n<count($_LANGUAGE); $n++ ) $buffer = str_replace( $_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $buffer );
foreach( $_LngPublic as $k=>$v ) $buffer = str_replace( $k, $v, $buffer );
}
return true;
}else{
return false;
}
}
function ___Lng( $buffer ){
if( $GLOBALS['_LNGCOL'] > -1 && !(strpos( $buffer, '@' )===false) ){
global $_LANGUAGE, $_LngPublic;
for( $n=0; $n<count($_LANGUAGE); $n++ ) $buffer = str_replace( $_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $buffer );
foreach( $_LngPublic as $k=>$v ) $buffer = str_replace( $k, $v, $buffer );
}
return $buffer;
}
function eLng( $i, $v1='', $v2='', $v3='' ){
$txt = $GLOBALS['_Lng'][$i];
if( $txt=='' ){
global $_LANGUAGE, $_LngPublic;
$buffer = '@'.$i.'@';
for( $n=0; $n<count($_LANGUAGE); $n++ ){
if( !(strpos( $buffer, $_LANGUAGE[$n][0] ) === false) ){
$txt = str_replace( $_LANGUAGE[$n][0], $_LANGUAGE[$n][1], $buffer );
break;
}
}
if( $txt=='' ){
foreach( $_LngPublic as $k=>$v ){
if( !(strpos( $buffer, $k ) === false) ){
$txt = str_replace( $k, $v, $buffer );
break;
}
}
}
if( $txt=='' ) return '';
}
$txt = str_replace('&#39;','&39;',str_replace('&#34;','&34;',$txt));
if( $v3!='' ) $txt = str_replace( '#3', $v3, $txt );
if( $v2!='' ) $txt = str_replace( '#2', $v2, $txt );
if( $v1!='' ){
$txt = str_replace( '#1', $v1, $txt );
$txt = str_replace( '#', $v1, $txt );
}
$txt = str_replace('&39;','&#39;',str_replace('&34;','&#34;',$txt));
return $txt;
}
function eLngLoad( $File='', $Ext='', $Tipo=0 ){
global $_Lng, $__Lng, $_LngPublic, $_LANGUAGE, $JsTxtm, $_LanguageTables;
if( $_LanguageTables!='' && $_LanguageTables[0]!=',' ) $_LanguageTables = ','.$_LanguageTables.',';
$Dim = debug_backtrace();
if( $Tipo==2 ){
if( $GLOBALS['_LanguageAdd'] ) return;
$GLOBALS['_LanguageAdd'] = true;
}
if( $Ext=='' ) $Ext = $_SESSION['_LANGUAGE_'];
else if( $Ext=='*' ) $Lng = array();
if( $File=='' ){
if( $Dim[0]['args'][1]=='' && (substr($Dim[0]['file'],-4)<>'.tmp' || $GLOBALS['E:CallSrv']<>'' ) ){
$File = $Dim[0]['file'];
$xFile = str_replace(chr(92),'/',$File);
if( substr_count($xFile,'/edesweb/') > 0 ){
$tmp = explode('/',$xFile);
$File = '../../edesweb/lng/'.$tmp[count($tmp)-1];
}
}else{
eInit();
die( 'ERROR: La función "eLngLoad()" no es necesaria en ficheros "DF"' );
}
}else if( $File[0]=='*' ){
$File = '../../'.substr($File,1);
}else if( $File[0]=='/' ) $File = eScript($File);
if( substr($File,-4)<>'.lng' ) $File .= '.lng';
$uCol = 1; $dCol = 1;
if( !file_exists($File) ){
if( $Tipo==2 ) return '';
eTrace( 'ERROR: Fichero "'.$File.'" no encontrado' );
}
$tmp2 = file($File);
for( $n=0; $n<count($tmp2); $n++ ){
list( $txt ) = explode('~',$tmp2[$n]);
$tmp = explode('|',$txt);
$Cod = trim($tmp[0]);
if( $Cod=='' || $Cod[0]=='.' ) continue;
if( $Cod[0]=='[' ){
list(,$Lngs) = explode(']',$tmp[0]);
$tmp4 = explode( ',', trim(str_replace(' ','',$Lngs)) );
if( $Ext=='*' ) continue;
for( $i=0; $i<count($tmp4); $i++ ){
if( $tmp4[$i]==$Ext ){
$uCol = $i+1;
}else if( $tmp4[$i]==$_SESSION['_LanguageDefault'] ){
$dCol = $i+1;
}
}
$Cod = 'LNG';
$_Lng[$Cod] = '_'.$_SESSION['_LANGUAGE_'];
$__Lng[$Cod] = '_'.$_SESSION['_LANGUAGE_'];
$_LngPublic['@'.$Cod.'@'] = '_'.$_SESSION['_LANGUAGE_'];
continue;
}
if( $Ext=='*' ){
for( $i=0; $i<count($tmp4); $i++ ){
$txt = trim($tmp[$i+1]);
if( $txt=='' ) $txt = trim($tmp[0]);
$txt = $GLOBALS['_LanguageTron'].str_replace('\n',"\n",$txt).$GLOBALS['_LanguageTron'];
$txt = str_replace("'",'&amp;',str_replace('"','&quot;',$txt));
$Lng[$tmp4[$i]][$Cod] = $txt;
}
}else{
$txt = trim($tmp[$uCol]);
if( $txt=='' ) $txt = trim($tmp[$dCol]);
$txt = $GLOBALS['_LanguageTron'].str_replace('\n',"\n",$txt).$GLOBALS['_LanguageTron'];
$txt = str_replace("'",'&amp;',str_replace('"','&quot;',$txt));
switch( $Tipo ){
case 0: $_Lng[$Cod] = $txt; break;
case 1: $__Lng[$Cod] = $txt; break;
case 2: $_LngPublic['@'.$Cod.'@'] = $txt; break;
case 3:
if( $JsTxt!='' ) $JsTxt .= ',';
if( !is_numeric($Cod) ) $Cod = "'{$Cod}'";
$txt = str_replace("'",chr(92)."'",$txt);
$JsTxt .= "{$Cod}:'{$txt}'"; break;
}
}
}
if( $Tipo==3 ) return $JsTxt;
if( $Ext=='*' ) return $Lng;
}
function eUnSet( $txt ){
$tmp = explode(',',$txt );
for( $n=0; $n<count($tmp); $n++ ){
$NmVar = trim($tmp[$n]);
unset($GLOBALS[$NmVar]);
unset($_POST[$NmVar]);
unset($_REQUEST[$NmVar]);
unset($_GET[$NmVar]);
unset($_SERVER[$NmVar]);
}
}
function eGetMicroTime(){
list($milisegundos,$segundos) = explode(' ',microtime());
return number_format(((float)$milisegundos + (float)$segundos ),6,'.','');
}
function eGetInterval(){
return number_format( eGetMicrotime() - $GLOBALS['_IniSg'], 2, '.', '' );
}
$_eLogIniFile = '';
$_eLogIniWidth = 0;
$_eLogMicroTime = 0;
$_eLogIMicroTime = 0;
function eLogIni( $File, $AnchoIz=2 ){
$File = '../_tmp/'.$File;
@unlink( $File );
$GLOBALS['_eLogIniFile'] = $File;
$GLOBALS['_eLogIniWidth'] = $AnchoIz+3;
$GLOBALS['_eLogMicroTime'] = eGetMicrotime();
$GLOBALS['_eLogIMicroTime'] = $GLOBALS['_eLogMicroTime'];
eLogTxt( 'START '.date('Y-m-d H:i:s') );
}
function eLogTxt( $txt ){
if( $GLOBALS['_eLogIniFile']!='' ){
error_log(
str_pad( number_format(eGetMicrotime()-$GLOBALS['_eLogMicroTime'] ,2,',',''), $GLOBALS['_eLogIniWidth'], ' ', STR_PAD_LEFT ).
str_pad( number_format(eGetMicrotime()-$GLOBALS['_eLogIMicroTime'],2,',',''), 3, ' ', STR_PAD_LEFT ).
" {$txt}\n", 3, $GLOBALS['_eLogIniFile'] );
$GLOBALS['_eLogIMicroTime'] = eGetMicrotime();
}
}
function eLogEnd(){
eLogTxt( 'FINISH '.date('Y-m-d H:i:s') );
}
$_eLogEMicroTime = 0;
function eLogDebugIni( $txt ){
error_log( date('Y-m-d H:i:s')." {$txt}\n", 3, '../_tmp/log/sql.'.$_SESSION['_User'] );
$GLOBALS['_eLogMicroTime'] = eGetMicroTime();
$GLOBALS['_eLogEMicroTime'] = $GLOBALS['_eLogMicroTime'];
}
function eLogDebug( $txt ){
error_log(
str_pad( number_format(eGetMicroTime()-$GLOBALS['_eLogMicroTime'] ,2,',',''), 6, ' ', STR_PAD_LEFT ).
str_pad( number_format(eGetMicroTime()-$GLOBALS['_eLogEMicroTime'],4,',',''), 8, ' ', STR_PAD_LEFT ).
" {$txt}\n", 3, '../_tmp/log/sql.'.$_SESSION['_User'] );
$GLOBALS['_eLogEMicroTime'] = eGetMicroTime();
}
function eTronSql( $txt ){ eLogDebug( $txt ); }
function eYmd2Dmy($f){
if( strlen($f)==8 ){
return substr($f,6,2).'-'.substr($f,4,2).'-'.substr($f,0,4);
}else{
return substr($f,8,2).'-'.substr($f,5,2).'-'.substr($f,0,4);
}
}
function eDmy2Ymd( $f ){
if( strlen($f)==8 ){
return substr($f,4,4).'-'.substr($f,2,2).'-'.substr($f,0,2);
}else{
return substr($f,6,4).'-'.substr($f,3,2).'-'.substr($f,0,2);
}
}
function eDateDiff( $d1, $d2 ){
$dias = (strtotime($d1)-strtotime($d2))/86400;
return floor($dias);
}
function _ShowError( $xErrorMsg, $tmpFile, $LenDoc=0, $Macro='', $EditFile='' ){
global $php_errormsg, $_Include, $_TmpInclude;
error_reporting( _ERROR_REPORTING );
ini_set( 'track_errors', false );
if( $php_errormsg=='' && $xErrorMsg=='' ){
if( substr_count($tmpFile,'/_tmp/')==1 ) @unlink( $tmpFile );
$_Include = '';
return;
}
chdir( $GLOBALS['_CURRENT_PATH'] );
if( $php_errormsg == '' ) $php_errormsg = $xErrorMsg;
global $Opcion, $OriFichero, $_User, $_Sql, $_Script_, $TipoEntrada, $nDimFCH;
global $__EVAL__, $__eLINE__, $__iSCRIPT__, $__iniSCRIPT__, $_CALL, $__DIR__, $Dir_;
if( $EditFile!='' ) $OriFichero = $EditFile;
$_User *= 1;
$ErrorLinea = 0;
if( substr_count($_Include,'_')==1 ) list( ,$_Include ) = explode('_',$_Include);
if( $LenDoc==0 ){
$TxtError = $php_errormsg;
}else if( trim($php_errormsg)!='' ){
$TxtError = $php_errormsg;
}else{
$TxtError = trim( substr( ob_get_contents(), $LenDoc ) );
if( $TxtError=='' || strlen($TxtError)>100 && substr_count( $TxtError, 'on line <b>' ) == 0) $TxtError = $php_errormsg;
if( strlen(trim($TxtError))==0 ) $TxtError = $php_errormsg;
}
$Cdi = date('Y-m-d H:i:s');
$CodErr = chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90));
$xTexto = ' ';
eInit();
echo '<'.'!-- ERROR EN PHP --'.'>';
if( $tmpFile=='_eval_' ){
$TxtError = $__EVAL__;
$xTexto = trim(str_replace("'",'"',$__EVAL__));
$LogTxt = $Cdi."\r\n".
'	Usuario: '.$_User."\r\n".
'	Query..: '.$_SERVER['REQUEST_URI']."\r\n".
'	Error..: '.$CodErr.': '.$TxtError."\r\n";
error_log( $LogTxt."\r\n", 3, '../_tmp/err/_log.err' );
echo '<html><head><title>SOURCE</title></head><body style="display:inline-table">';
echo '<script type="text/javascript">if(window.frameElement.MODAL!=undefined) top.ShowCallSrv();</SCRIPT>';
echo '<pre>';
if( $_SESSION['_D_']!='' ){
echo '<span style="color:red;">Error en Macro: </span>'.htmlspecialchars($__EVAL__).'';
}else{
echo '<span style="color:red;"> ERROR INTERNO "'.$CodErr.'"</span>';
}
echo '<br><span style="color:red;">Script........: </span>'.$_Script_.' <span style="color:red;">Nº Linea: </span>'.($nDimFCH+1);
if( $TipoEntrada!='#' ) echo '<br><span style="color:red;">Label.........: </span>['.substr($TipoEntrada,1).']';
echo '<br><B>QUERY:</B> '.$_SERVER['QUERY_STRING'];
if( $_Include!='' ){
echo '<br><B>ULTIMO INCLUDE:</B> '.$_Include;
if( $_Include!=$__iniSCRIPT__ ) echo ' - Error en la carga';
}
$n=0;
echo '<br><B>GET:</B>'; foreach( $_GET as $k=>$v ){
echo '<br> &nbsp; '.$k.': '.$v;
if( $n==0 ) $sGET = $k;
$n++;
}
echo '<br><B>POST:</B>'; foreach( $_POST as $k=>$v ) echo '<br> &nbsp; '.$k.': '.$v;
echo '</pre>';
KeyEditFile( $OriFichero );
echo '</body></html>';
}else{
if( $Macro=='' ){
if( file_exists($tmpFile) ) show_source($tmpFile);
}else{
$_Include = substr($tmpFile,1);
echo $Macro;
}
$FilePHP = ob_get_contents();
eInit();
$FilePHP = str_replace( '<br />', '<br>', $FilePHP );
$Dim = explode('<br>',$FilePHP);
$DimFuente = @file( $_TmpInclude.'.php' );
$Dim = array_merge( $Dim, $DimFuente );
if( substr_count( $TxtError, ' on line <b>' ) > 0 ){
list( ,$ErrorLinea ) = explode('on line <b>',$TxtError);
list( $ErrorLinea ) = explode('<',$ErrorLinea);
$ErrorLinea = (int)$ErrorLinea;
$tmp = explode('/',$tmpFile);
list( $Dir ) = explode($tmp[count($tmp)-1],$TxtError);
$NomFile = substr( $Dir, strrpos($Dir,'>')+1).$tmp[count($tmp)-1];
$xError = trim(str_replace($NomFile,'"['.strtoupper($_Include).'] '.$Opcion.'"',strip_tags($TxtError)));
}else{
$xError = '"['.strtoupper($_Include).'] '.$Opcion.'" '.strip_tags($TxtError);
}
$xError = str_replace('\\','/',$xError);
if( $_SESSION['_D_']!='' ){
echo '<html><head><title>SOURCE</title><style>A:visited,A:link,A:active,A:hover{color:red;}</style></head>';
echo '<script type="text/javascript">if(window.frameElement.MODAL!=undefined) top.ShowCallSrv();</SCRIPT>';
echo '<body scroll=auto style="display:inline-table">';
echo '<code>';
echo '<span style="color:red;">Script........: </span>'.$_Script_.' <span style="color:red;">Nº Linea: </span>'.($nDimFCH+1);
if( $TipoEntrada!='#' ) echo '<br><span style="color:red;">Label.........: </span>['.substr($TipoEntrada,1).']';
echo '<br><B>QUERY:</B> '.$_SERVER['QUERY_STRING'];
if( $_Include!='' ){
echo '<br><B>ULTIMO INCLUDE:</B> '.$_Include;
if( $_Include!=$__iniSCRIPT__ ) echo ' - Error en la carga.';
}
$n=0;
echo '<br><B>GET:</B>'; foreach( $_GET as $k=>$v ){
echo '<br> &nbsp; '.$k.': '.$v;
if( $n==0 ) $sGET = $k;
$n++;
}
echo '<br><B>POST:</B>'; foreach( $_POST as $k=>$v ) echo '<br> &nbsp; '.$k.': '.$v;
$Ini = 0;
if( $Dim[0]=='<!-- ERROR EN PHP -->' ) $Ini++;
if( substr($Dim[1],0,23)=='<'.'?PHP $__iniSCRIPT__ = ' ) $Ini++;
if( $__eLINE__!='' ) echo '[ $__eLINE__ = '.($__eLINE__-$Ini).' ]';
echo '<hr>';
$oTmp = '';
$eDim = explode(' ',$xError);
if( is_numeric($eDim[count($eDim)-1]) && $eDim[count($eDim)-2]=='line' && $eDim[count($eDim)-3]=='on' && substr($eDim[count($eDim)-4],-4)=='.tmp' ){
$oTmp = str_replace('\\','/',$eDim[count($eDim)-4]);
$oTmp = str_replace( substr($__DIR__,0,-5), '', $oTmp );
if( !file_exists($tmpFile) ){
list( $xMode, $xFile ) = explode(':',$sGET);
$OriFichero = $xFile;
if( substr_count($OriFichero,'.')==0 ) $OriFichero .=  (( $xMode[0]=='G' ) ? '.gdf':'.edf');
}
}
if( $__EVAL__!='' ) echo '<B>ERROR EN EVAL:</B> '.$__EVAL__.'<br>';
echo '<span style="color:red;"><A HREF="#ERROR" id=kError onclick=EditTmp("'.$oTmp.'")> '.$xError.'</A></span><BR>';
$LongNLinea = strlen((string)count($Dim));
for( $n=$Ini; $n<count($Dim); $n++ ){
$Dim[$n] = rtrim($Dim[$n]);
$Dim[$n] = htmlentities( $Dim[$n] );
if( $ErrorLinea == $n+1 ){
echo '<A NAME="ERROR"><B style="border:1px solid red; olor:#9900FF">&nbsp;'.str_pad($n+1-$Ini,$LongNLinea,'0',STR_PAD_LEFT).': ';
echo $Dim[$n].' </B><br></A>';
}else{
echo '<font color="#9900FF">&nbsp;'.str_pad($n+1-$Ini,$LongNLinea,'0',STR_PAD_LEFT).'</font>: ';
echo $Dim[$n].'<br>';
}
}
echo '</code>';
$xTexto = $xError;
if( $OriFichero!='' ){
KeyEditFile( $OriFichero );
}else{
KeyEditFile( $tmpFile );
}
if( $_SESSION['_D_']=='~' ){
echo '<hr><pre>';
debug_print_backtrace();
echo '</pre><hr><pre>';
print_r(debug_backtrace());
echo '</pre><hr>';
}
}else{
global $_Sql, $OriFichero, $_HndDB;
$TxtError = trim(strip_tags($xError));
$LogTxt = $Cdi."\r\n".
'	Usuario: '.$_User."\r\n".
'	Query..: '.$_SERVER['REQUEST_URI']."\r\n".
'	Error..: '.$CodErr.': '.$TxtError."\r\n";
error_log( $LogTxt."\r\n", 3, '../_tmp/err/_log.err' );
echo '<script type="text/javascript">if(window.frameElement.MODAL!=undefined) top.ShowCallSrv();</SCRIPT>';
echo '<span style="color:red;"> ERROR INTERNO "'.$CodErr.'"</span>';
}
}
$xTexto = str_replace( "'", '&#39;', $xTexto );
$xTexto = str_replace( '"', '&#34;', $xTexto );
$TxtError = str_replace( "'", '&#39;', $TxtError );
$TxtError = str_replace( '"', '&#34;', $TxtError );
if( !function_exists('sql_Query') ){
global $_Sql, $_SqlHostName, $_SqlUsuario, $_SqlPassword, $_SqlDiccionario, $_SqlPDOType, $_SqlInit, $_SqlPDOConnect;
$tmpFile = '../_datos/config/sql.ini';
eval( _LoadSqlIni( $tmpFile ) );
include( $Dir_.$_Sql.'.inc' );
}else{
global $_HndDB;
if( $_HndDB === false ) qConnect();
}
$_Include = '';
if( eSqlType('informix') ){
global $DimText;
$DimText[] = ifx_create_blob( 1, 0, $TxtError );
$sql = "insert into {$_SESSION['ShareDictionary']}gs_error (cdi,cd_gs_user,tipo,desde,fichero,linea,texto,trace) values ( '{$Cdi}', '{$_User}', 'P', 'PHP', '{$OriFichero}', {$ErrorLinea}, $xTexto, ? )";
ifx_query( $sql, $_HndDB, $DimText );
}else{
sql_Inserta("{$_SESSION['ShareDictionary']}gs_error", 'cdi,cd_gs_user,tipo,desde,fichero,linea,texto,trace',				 "'{$Cdi}', '{$_User}', 'P', 'PHP', '{$OriFichero}', {$ErrorLinea}, '{$xTexto}', '{$TxtError}'", 'codigo' );
}
$Id = qId();
?>
<script type="text/javascript">
function Ini(){
top.eLoading(false,window);
var ID = new Date().getTime();
top._SaveSCRError( ID );
top.eCallSrv( window, '$error.gs&ERROR='+ID+',<?= $Id ?>' );
if(window.name=='TLF' || <?= (($_CALL) ?'true':'false') ?> ){
try{
if( top._Development ){
top.eSWOpen(window,'edes.php?E:$t/source.gs&ERROR=<?=$xTexto?>','SOURCE HTML',true,0,-1,0,0,1,1,'df');
}else{
top.eAlert( S.lng(212), 'DESCRIPTION: <?=$xTexto?><br>Nº LINE: <?=$ErrorLinea?>', 'A', 'E' );
}
}catch(e){}
}
}
setTimeout('Ini()',100);
<?PHP
?>
</script>
</body></html>
<?PHP
$_Include = '';
qEnd();
if( $_CALL ){
file_put_contents( $__DIR__.'/../_tmp/log/'.$_User.'.htm', ob_get_contents() );
}
eEnd();
}
function gsInclude(){
global $Dir_;
for( $i=0; $i<func_num_args(); $i++ ){
$File = strtolower(func_get_arg($i));
if( !strstr($File,'.')) $File .= '.inc';
include_once( $Dir_.$File );
}
}
function _InVar( $txt ){
while( substr_count( $txt, '{$' ) > 0 && substr_count( $txt, '}' ) > 0 ){
$Ini = strpos($txt,'{$'); $Fin = strpos($txt,'}');
$var = substr( $txt, $Ini, $Fin-$Ini+1 );
$var2 = substr($var,2,-1);
if( isset( $GLOBALS[$var2] ) ){
$Valor = trim($GLOBALS[$var2]);
if( $Valor=='' && isset( $GLOBALS['_vF'][$var2] ) ) $Valor = $GLOBALS['_vF'][$var2];
}else{
if( substr($var2,0,4)=='_vF[' ){
$var2 = substr($var2,4,-1);
if( $var2[0]=='"' || $var2[0]=="'" ) $var2 = substr($var2,1,-1);
$Valor = $GLOBALS['_vF'][$var2];
}else{
$Valor = $GLOBALS['_vF'][$var2];
}
}
$txt = str_replace( $var, trim($Valor), $txt );
}
if( $txt[0]=='$' ) $txt = $GLOBALS[substr($txt,1)];
return $txt;
}
function _CreateVar( &$_Form ){
global $_CREATEVAR;
if( !isset($_CREATEVAR) ) return;
foreach( $_CREATEVAR as $k=>$v ){
for( $nf=0; $nf<count($_Form); $nf++ ){
for( $c=0; $c<count($_Form[$nf]); $c++ ){
while( ($p = strpos( $Dato, $k, $p ))!==false ){
$sc = substr( $_Form[$nf][$c], $p+strlen($k), 1 );
if( $sc=='' || $sc==' ' || $sc=='|' || $sc=='#' ){
$_Form[$nf][$c] = substr($_Form[$nf][$c],0,$p). $v .substr($_Form[$nf][$c],$p+strlen($k));
}
$p++;
}
}
}
}
}
function _CreateVarOne( &$Dato ){
global $_CREATEVAR;
if( !isset($_CREATEVAR) ) return;
foreach( $_CREATEVAR as $k=>$v ){
while( ($p = strpos( $Dato, $k, $p ))!==false ){
$sc = substr( $Dato, $p+strlen($k), 1 );
if( $sc=='' || $sc==' ' || $sc=='|' || $sc=='#' ){
$Dato = substr($Dato,0,$p). $v .substr($Dato,$p+strlen($k));
}
$p++;
}
}
}
function eLink( $File ){
echo "<LINK REL='stylesheet' HREF='{$_SESSION['_PathCSS']}/{$File}.css' TYPE='text/css'>";
if( file_exists("{$_SESSION['_PathCSS']}/{$File}_off.css") ){
echo "<LINK REL='off' id=CssOffWindow HREF='{$_SESSION['_PathCSS']}/{$File}_off.css' TYPE='text/css'>";
}
for( $i=1; $i<func_num_args(); $i++ ){
echo "<LINK REL='stylesheet' HREF='{$_SESSION['_PathCSS']}/".func_get_arg($i).".css' TYPE='text/css'".((substr_count(func_get_arg($i),'_print.')==0) ? '':" MEDIA='print'").">";
}
}
function eLinkPrint( $File ){
for( $i=1; $i<func_num_args(); $i++ ) echo "<LINK REL='stylesheet' HREF='{$_SESSION['_PathCSS']}/".func_get_arg($i).".css' TYPE='text/css' MEDIA='print'>";
}
function qGetWhere( $Prefijo, $Transforma=true ){
if( $Prefijo!='' && substr($Prefijo,-1)!='.' ) $Prefijo .= '.';
$Busca = $GLOBALS['_DBADDFILTER'];
if( $GLOBALS['_DBADDFILTEREXTRA']!='' ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $GLOBALS['_DBADDFILTEREXTRA'];
}
GetCondicion( $Prefijo, $Busca, $Transforma );
return $Busca;
}
function GetCondicion( $Prefijo, &$Busca, $Transforma=true ){
global $_Sql, $_ConDBRange, $_SqlPDOType, $_FILTER, $MemDBRange, $_DeleteWhereFields;
if( $_FILTER!='' ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $_FILTER;
}
$DimNomVar = array_keys($_POST);
$DimValor  = array_values($_POST);
for( $n=0; $n<count($_POST); $n++ ){
$DimNomVar[$n] = trim($DimNomVar[$n]);
if( in_array( $DimNomVar[$n], $_DeleteWhereFields ) ) continue;
if( substr( $DimNomVar[$n], 0, 1 ) == '_' ) continue;
$DimValor[$n] = trim(stripslashes( $DimValor[$n] ));
if( $DimValor[$n]=='*' ) continue;
$DimValor[$n] = str_replace( '&gt;', '>', $DimValor[$n] );
$DimValor[$n] = str_replace( '&lt;', '<', $DimValor[$n] );
if( substr($DimNomVar[$n],0,4)=='dct_' && $DimValor[$n]!='' ){
global $_DCT, $_DCT_SUFFIX;
$_DCT = $DimNomVar[$n];
$xBusca = '';
$tmp = explode(',',str_replace('  ',' ',trim($DimValor[$n])));
for( $p=0; $p<count($tmp); $p++ ){
if( $xBusca!='' ) $xBusca .= ' or ';
if( substr_count( $tmp[$p], '*' ) > 0 ){
$xBusca .= "zz.dct_work like '".str_replace( '*','%',trim($tmp[$p]))."'";
}else{
$xBusca .= "zz.dct_work='".trim($tmp[$p])."'";
}
}
$xBusca = "zz.dct_field='{$DimNomVar[$n]}{$_DCT_SUFFIX}' and (".$xBusca.')';
if( substr_count( $Busca, $xBusca ) == 0 ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $xBusca;
}
$DimValor[$n] = '';
continue;
}
if( strlen($DimValor[$n]) > 0 ){
$ConRange = false;
if( $_ConDBRange[$DimNomVar[$n]] ){
if( substr_count( $DimValor[$n], ' and ' ) > 0 ){
$ConRange = true;
$DimValor[$n] = str_replace( ' and '.$DimNomVar[$n],' and '.$Prefijo.$DimNomVar[$n], $DimValor[$n] );
}
}
if( !eSqlType('oracle') && strlen($DimValor[$n])==10 && substr($DimValor[$n],2,1)=='-' && substr($DimValor[$n],5,1)=='-' ){
if( !eSqlType('pdo.informix') ){
$DimValor[$n] = substr($DimValor[$n],6,4).substr($DimValor[$n],2,4).substr($DimValor[$n],0,2);
}
}
if( $ConRange ){
if( substr_count($DimValor[$n], '>=')>0 ){
$xBusca = $Prefijo.$DimNomVar[$n]. ">='" .str_replace('"',"'",substr($DimValor[$n],2))."' ";
}else{
$xBusca = $Prefijo.$DimNomVar[$n]. ">'" .str_replace('"',"'",substr($DimValor[$n],1))."' ";
}
}else if( substr_count($DimValor[$n],'*')>0 ){
$xBusca = $Prefijo.$DimNomVar[$n]. " like '" .str_replace ( "*", "%", $DimValor[$n] ). "'";
}elseif( $DimValor[$n]=='=' ){
$xBusca = $Prefijo.$DimNomVar[$n]. " is null ";
}elseif( $DimValor[$n]=='<' ){
$xBusca = $Prefijo.$DimNomVar[$n]. " is null ";
}elseif( $DimValor[$n]=='>' ){
if( !eSqlType('oracle') ){
$xBusca = $Prefijo.$DimNomVar[$n]. " is not null and ".$Prefijo.$DimNomVar[$n]."<>'' ";
}else{
$xBusca = $Prefijo.$DimNomVar[$n]. " is not null ";
}
}elseif( $DimValor[$n] == '<=' ){
if( !eSqlType('oracle') ){
$xBusca = '('.$Prefijo.$DimNomVar[$n]. " is null or ".$Prefijo.$DimNomVar[$n]."<>'') ";
}else{
$xBusca = $Prefijo.$DimNomVar[$n]. " is null ";
}
}elseif( $DimValor[$n] == '<>' ){
$xBusca = $Prefijo.$DimNomVar[$n]. " is not null ";
}elseif( $DimValor[$n][0] == '[' ){
$xBusca = $Prefijo.$DimNomVar[$n]. " matches '" .$DimValor[$n]."' ";
}elseif( $DimValor[$n][0] == '(' ){
$xBusca = $Prefijo.$DimNomVar[$n]. ' in ' .str_replace('.',',',$DimValor[$n]). ' ';
}elseif( $DimValor[$n][0] == ')' ){
$xBusca = $Prefijo.$DimNomVar[$n]. ' not in (' .str_replace('.',',',substr($DimValor[$n],1,strlen($DimValor[$n])-2)). ') ';
}else{
if( substr_count($DimValor[$n],'||') > 0 ){
$xBusca = $Prefijo.$DimNomVar[$n]. " in ('" .str_replace('||',"','",$DimValor[$n]). "') ";
if( substr_count( $Busca, $xBusca ) == 0 ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $xBusca;
}
continue;
}
$xBusca = '';
$Campo = $Prefijo.$DimNomVar[$n];
$Valor = trim($DimValor[$n]);
$uc = false;
$nc = 0;
$nValor = '';
for( $i=0; $i<strlen($Valor); $i++ ){
$c = substr($Valor,$i,1);
if( substr_count('<>=*',$c) == 0 ){
if( $uc ) $nValor .= '|';
$uc = false;
}else{
if( !$uc ) $nValor .= '|';
$uc = true;
$nc++;
}
$nValor .= $c;
}
$DimPar = array();
$nValor = trim($nValor);
if( $nValor[0]=='|' ) $nValor = substr($nValor,1);
$par = explode('|',$nValor);
for( $i=0 ; $i<count($par); $i++ ){
$par[$i] = trim($par[$i]);
if( !eSqlType('informix') ){
if( !eSqlType('oracle') && strlen($par[$i])==10 && substr($par[$i],2,1)=='-' && substr($par[$i],5,1)=='-' ){
$par[$i] = substr($par[$i],6,4).substr($par[$i],2,4).substr($par[$i],0,2);
}
}
if( $par[$i]!='' ) $DimPar[] = $par[$i];
}
$Comilla = "'";
switch( count($DimPar) ){
case 1:
if( $nc > 0 ){
$xBusca = $Campo . $DimPar[0] .$Comilla.$Comilla.' ';
}else{
$xBusca = $Campo . '='.$Comilla.$Valor.$Comilla.' ';
}
break;
case 2:
$xBusca = $Campo . $DimPar[0].$Comilla. $DimPar[1] .$Comilla.' ';
break;
case 4:
if( !eSqlType('oracle', 'pdo.informix') ){
$xFecha = substr($DimPar[1],0,10);
if( strlen($xFecha)==10 && substr($xFecha,2,1)=='-' && substr($xFecha,5,1)=='-' ){
$xFecha = substr($xFecha,6,4).substr($xFecha,2,4).substr($xFecha,0,2);
$DimPar[1] = $xFecha . substr($DimPar[1],10);
}
$xFecha = substr($DimPar[3],1,10);
if( strlen($xFecha)==10 && substr($xFecha,2,1)=='-' && substr($xFecha,5,1)=='-' ){
$xFecha = substr($xFecha,6,4).substr($xFecha,2,4).substr($xFecha,0,2);
$DimPar[3] = $DimPar[3][0].$xFecha;
}
}
$xBusca = $Campo . $DimPar[0].$Comilla. $DimPar[1].$Comilla.' and '. $Campo.$DimPar[2].$Comilla.$DimPar[3].$Comilla.' ';
break;
default:
$xBusca = '';
$BuscaAnd = '';
$BuscaOr = '';
$NumAnd = 0;
$NumOr = 0;
$ConMayor = false;
$ConMenor = false;
for( $i=0; $i<count($DimPar); $i+=2 ){
if( substr_count( $DimPar[$i],'>' ) > 0 ){
$ConMayor = true;
if( $ConMenor ){
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumOr++;
}else{
if( $BuscaAnd!='' ) $BuscaAnd .= ' and ';
$BuscaAnd .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumAnd++;
}
}else if( substr_count( $DimPar[$i],'<' ) > 0 ){
$ConMenor = true;
if( $ConMayor ){
if( $BuscaAnd!='' ) $BuscaAnd .= ' and ';
$BuscaAnd .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumAnd++;
}else{
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumOr++;
}
}else{
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i].$Comilla. $DimPar[$i+1] .$Comilla.' ';
$NumOr++;
}
}
if( $BuscaAnd!='' && $BuscaOr!='' ){
$xBusca = '(';
if( $NumAnd > 1 ){
$xBusca .= '( '.$BuscaAnd.' )';
}else{
$xBusca .= $BuscaAnd;
}
$xBusca .= ' or '.$BuscaOr.')';
}else if( $BuscaOr!='' ){
$xBusca = '( '.$BuscaOr.' )';
}else if( $BuscaAnd!='' ){
$xBusca = $BuscaAnd;
}
break;
}
}
if( substr_count( $Busca, $xBusca ) == 0 ){
if( $Busca!='' ) $Busca .= ' and ';
$Busca .= $xBusca;
}
}
}
}
function _qBuscar( $txt, $Tabla ){
global $_DBADDFILTEREXTRA;
$Alias = '';
$Dim = explode(' ',trim(str_replace('  ',' ',$Tabla)));
for( $n=0; $n<count($Dim); $n++ ) if( strlen($Dim[$n])==1 ) $Alias = 'A.';
if( $Alias=='' ){
$txt = str_replace('#.','',$txt);
$_DBADDFILTEREXTRA = str_replace('#.','',$_DBADDFILTEREXTRA);
}
if( trim($_DBADDFILTEREXTRA)!='' ){
$txt = (( trim($txt)!='' ) ? $txt.' and ':'' ).str_replace('#.',$Alias,$_DBADDFILTEREXTRA);
}
if( $Alias=='' ){
$txt = str_replace('#.','',$txt);
}else{
$txt = str_replace('#.','A.',$txt);
}
return $txt;
}
function _NmFileConPrefijo( $xNomFile, $pre='' ){
if( $pre=='' || $pre[0]!='_' ){
$xNomFile = $pre.$xNomFile;
}else{
$pp = strrpos($xNomFile,'.');
$xNomFile = substr($xNomFile,0,$pp).$pre.substr($xNomFile,$pp);
}
return strtolower($xNomFile);
}
function eUnEscape( $txt, $AlReves=false ){
$Dim = array(
array('&','&amp;'),
array('+','&#43;'),
array('<','&lt;'),
array('>','&gt;'),
array(chr(92),'&#92;'),
array('"','&quot;'),
array("'",'&#39;')
);
$p=0; $s=1;
if( $AlReves ){
$p=1; $s=0;
}
for( $n=0; $n<count($Dim); $n++ ) $txt = str_replace( $Dim[$n][$p], $Dim[$n][$s], $txt );
return $txt;
}
function eStrUpper( $txt ){
$txt = str_replace('&EURO;','EUR',$txt);
return strtr(strtoupper($txt), 'ñçáéíóúàèìòùâêîôûüãõ', 'ÑÇÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙÜÃÕ');
}
function eMessage( $eTexto, $eAccion, $sgMensage=2000, $eEXE='', $_MessageType='OK' ){
echo 'eMessage: '.$eTexto;
exit;
}
function _DownloadEnd( $oFichero, $dFichero ){
global $_CdGsExpFile, $usuCursor;
$Dir = str_replace('\\','/',getcwd());
if( substr($oFichero,-3)!='zip'){
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ){
$ExeZip = "zip -9 -j -b {$Dir} ".$dFichero." ".$oFichero;
}else{
$ExeZip = eScript('$win/zip.exe')." -9 -j -b {$Dir} ".$dFichero." ".$oFichero;
}
$Dim = array();
exec( $ExeZip, $Dim  );
}else{
copy( $oFichero, $dFichero );
}
$tSegundos = 0;
if( strtoupper(substr(PHP_OS,0,3))!='WIN' ){
$dat = getrusage();
$tSegundos = $dat["ru_utime.tv_sec"]+1;
}else{
$sg = gettimeofday();
$tSegundos = (int)$sg["sec"] - $_SecondINI;
}
$Fichero = $_CdGsExpFile.'.zip';
$TReg = count($usuCursor);
switch( $_SESSION['_iSql'] ){
case 'mysql':
eInclude('mysql.class');
$db = new eMySql();
break;
case 'mysqli':
eInclude('mysqli.class');
$db = new eMySqli();
break;
case 'informix':
eInclude('informix.class');
$db = new eInformix();
break;
case 'oracle':
eInclude('oracle.class');
$db = new eOracle();
break;
case 'pdo':
eInclude('pdo.class');
$db = new ePdo();
break;
}
$db->qConnect('sql');
$db->qQuery("update gs_exp_file set fichero='{$Fichero}', t_reg='{$TReg}', sg='{$tSegundos}', estado='T' where cd_gs_exp_file={$_CdGsExpFile}" );
$db->qEnd();
ob_end_clean();
}
?>
