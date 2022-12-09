<?PHP
include_once('../_datos/config/desktop.ini');
function _GenMenu( $_OPTIONS ){
global $_LanguageTron;
$DimOpciones = array();
for( $n=0; $n<count($_OPTIONS); $n++ ){
$_OPTIONS[$n][0] = trim($_OPTIONS[$n][0]);
$_OPTIONS[$n][1] = trim($_OPTIONS[$n][1]);
if( $_LanguageTron!='' && $_OPTIONS[$n][0][0]==$_LanguageTron && substr($_OPTIONS[$n][0],-1)==$_LanguageTron ){
$ps = $_LanguageTron;
if( $_LanguageTron == '~' ) $ps = '&#126;';
else if( $_LanguageTron == '-' ) $ps = '&#45;';
$_OPTIONS[$n][0] = $ps.substr( $_OPTIONS[$n][0], 1, -1 ).$ps;
}
if( $_OPTIONS[$n][2]<>'' ){
if( !_ExeEval( $_OPTIONS[$n][2], $_OPTIONS[$n][0].' | '.$_OPTIONS[$n][1].' | '.$_OPTIONS[$n][2] ) ) continue;
}
if( $_OPTIONS[$n][0]!='' && $_OPTIONS[$n][0][0]!='-' && $_OPTIONS[$n][1]=='' ) $_OPTIONS[$n][0] = '~'.$_OPTIONS[$n][0];
if( str_replace('-','',$_OPTIONS[$n][0])=='' ) $_OPTIONS[$n][0] = '-';
if( $_OPTIONS[$n][0][0]=='{' && substr($_OPTIONS[$n][0],0,2)!='{$' && substr_count($_OPTIONS[$n][0],'}') > 0 ){
$_OPTIONS[$n][0] = str_replace('{','[',$_OPTIONS[$n][0]);
$_OPTIONS[$n][0] = str_replace('}',']',$_OPTIONS[$n][0]);
}
while( substr_count( $_OPTIONS[$n][1], '{$' ) > 0 && substr_count( $_OPTIONS[$n][1], '}' ) > 0 ){
$Ini = strpos($_OPTIONS[$n][1],'{$'); $Fin = strpos($_OPTIONS[$n][1],'}');
$var = substr( $_OPTIONS[$n][1], $Ini, $Fin-$Ini+1 );
if( $GLOBALS[substr($var,2,-1)]!='' ){
$_OPTIONS[$n][1] = str_replace($var, $GLOBALS[substr($var,2,-1)], $_OPTIONS[$n][1]);
}else{
$_OPTIONS[$n][1] = str_replace($var, $GLOBALS['_vF'][substr($var,2,-1)], $_OPTIONS[$n][1]);
}
}
$_OPTIONS[$n][0] = trim($_OPTIONS[$n][0]);
if( $_OPTIONS[$n][0][0]=='~' ){
$DimOpciones[] = array('~', substr($_OPTIONS[$n][0],1));
}else if( $_OPTIONS[$n][0][0]=='-' && strlen($_OPTIONS[$n][0])>1 ){
$DimOpciones[] = array('~'.$n, substr($_OPTIONS[$n][0],1), '');
}else if( $_OPTIONS[$n][0]!='-' ){
if( substr($_OPTIONS[$n][1],0,12)=='top.eSWOpen(' ){
if( !eUrlPermission(eGetFuncParameters($_OPTIONS[$n][1], 1)) ) continue;
}else if( substr($_OPTIONS[$n][1],0,9)=='S.window(' ){
if( !eUrlPermission(eGetFuncParameters($_OPTIONS[$n][1], 0)) ) continue;
}else if( substr($_OPTIONS[$n][1],0,9)=='eLoadDiv(' ){
$tmp = eGetFuncParameters($_OPTIONS[$n][1], 0);
if( !in_array($tmp, $GLOBALS['_SubVentana']) ) array_push($GLOBALS['_SubVentana'], $tmp);
}
$DimOpciones[] = array($n+1, trim($_OPTIONS[$n][0]));
}else{
$DimOpciones[] = array('-', '');
}
if( substr($_OPTIONS[$n][1],-1)!=';' ) $_OPTIONS[$n][1] .= ';';
}
$uOpLinea = '#';
$UserOpciones = array();
for($n=0; $n<count($DimOpciones); $n++){
if( $DimOpciones[$n][0]=='-' ){
if( $uOpLinea!='O' ) continue;
$OpLinea = 'L';
}else{
if( $uOpLinea=='L' ) $UserOpciones[] = $DimOpciones[$n-1];
$UserOpciones[] = $DimOpciones[$n];
$OpLinea = 'O';
}
$uOpLinea = $OpLinea;
}
do{
$Ok = true;
for($n=count($UserOpciones)-1; $n>0; $n--){
if(		  $UserOpciones[$n][0]=='-' && ($UserOpciones[$n-1][0]=='~' || $UserOpciones[$n-1][0]=='-') ){
$UserOpciones[$n][0] = '^';
$Ok = false;
}else if( $UserOpciones[$n][0]=='~' && ($UserOpciones[$n-1][0]=='~' || $UserOpciones[$n-1][0]=='-') ){
$UserOpciones[$n-1][0] = '^';
$Ok = false;
}
}
$tmp = array();
for($n=0; $n<count($UserOpciones); $n++){
if( $UserOpciones[$n][0]!='^' ) $tmp[] = $UserOpciones[$n];
}
$UserOpciones = $tmp;
}while( !$Ok );
while( $UserOpciones[count($UserOpciones)-1][0]=='~' ) $UserOpciones = _EiminaSubIndice($UserOpciones, count($UserOpciones)-1);
$nOpciones = 0;
if( count($UserOpciones)>0 ){
echo '<script type="text/javascript">'."\n";
echo 'function _eMenu(){'."\n";
echo 'top.eMenu(window, S.event(window), {'."\n";
if( substr_count($UserOpciones[0][1], "\\")>0 ){
$tmp = explode("\\", $UserOpciones[0][1]);
$UserOpciones[0][1] = trim($tmp[1]);
}
$nLineas = 0;
$nTitulo = 0;
for($n=0; $n<count($UserOpciones); $n++){
if( $UserOpciones[$n][0]!='-' && $UserOpciones[$n][0]!='~' ){
$txt = $UserOpciones[$n][1];
if( substr_count($txt, "}")>0 ){
list($icon, $txt) = explode("}", $txt);
if( $txt=="" ){
$txt = $icon;
$icon = "";
}
}
if( substr_count($txt, "]")>0 ){
list($icon, $txt) = explode("]", $txt);
if( $txt=="" ){
$txt = $icon;
$icon = "";
}
}
if( $icon<>"" ){
if( $icon[0]=="{" ) $icon = "[".substr($icon,1);
$icon .= "]";
}
echo '".'.$UserOpciones[$n][0].'":"'.$icon.eQuote($txt).'"';
$nOpciones++;
}else{
if( $UserOpciones[$n][0]=='-' ){
echo '".'.str_repeat('-',++$nLineas).'":""';
}else{
echo '".'.str_repeat('~',++$nTitulo).'":"'.eQuote($UserOpciones[$n][1]).'"';
}
}
if( $n==count($UserOpciones)-1 ) echo '}';
echo ",\n";
}
echo '__eMenu);'."\n".'}'."\n";
echo 'function __eMenu(Op){'."\n";
echo 'switch(Op){'."\n";
for( $n=0; $n<count($_OPTIONS); $n++ ){
if( $_OPTIONS[$n][0]!='-' ){
echo 'case "'.($n+1).'":'."\n";
echo $_OPTIONS[$n][1]."\n";
echo 'break;'."\n";
}
}
echo '}'."\n".'}'."\n";
echo '</script>'."\n";
}
if( $nOpciones==0 ){
global $_OPTIONS;
$_OPTIONS = array();
}
}
function _EiminaSubIndice($Dim, $i){
$dDim = array();
for($n=0; $n<count($Dim); $n++) if( $n<>$i ) $dDim[] = $Dim[$n];
return $dDim;
}
function eGetFuncParameters($txt, $np=-1){
$txt = trim(substr( $txt, strpos($txt,'(')+1, strrpos($txt,')')-strpos($txt,'(')-1 ));
$DimParametro = array();
$EsCadena1 = false;
$EsCadena2 = false;
$Cadena = '';
$uc = '##';
for( $n=0; $n<strlen($txt); $n++ ){
$c = substr($txt,$n,1);
switch( $c ){
case "'":
if( $uc!='\\' && !$EsCadena2 ) $EsCadena1 = !$EsCadena1;
break;
case '"':
if( $uc!='\\' && !$EsCadena1 ) $EsCadena2 = !$EsCadena2;
break;
case ',':
if( !$EsCadena1 && !$EsCadena2 ){
$DimParametro[] = $Cadena;
$Cadena = '';
continue 2;
}
break;
}
$Cadena .= $c;
$uc = $c;
}
$DimParametro[] = $Cadena;
for( $n=0; $n<count($DimParametro); $n++ ){
$DimParametro[$n] = trim($DimParametro[$n]);
if( $DimParametro[$n][0]=="'" && substr($DimParametro[$n],-1)=="'" ) $DimParametro[$n] = substr($DimParametro[$n],1,-1);
if( $DimParametro[$n][0]=='"' && substr($DimParametro[$n],-1)=='"' ) $DimParametro[$n] = substr($DimParametro[$n],1,-1);
}
if( $np==-1 ){
return $DimParametro;
}else{
return $DimParametro[$np];
}
}
function eUrlPermission($xURL){
$_DesktopTreeType = eFileGetVar("Desktop.DesktopTreeType");
if( $_DesktopTreeType=='O' ) return _UrlPermission($xURL);
global $_Tree, $_DEBUG;
$Debug = false;
$xURL = trim($xURL);
if( $xURL[0]=="'" || $xURL[0]=='"' ) $xURL = substr($xURL,1);
if( $Debug ){
$OldDebu = $_DEBUG;
$_DEBUG = 10;
eTron( $xURL );
}
$NArbol = qCount("{$_SESSION['ShareDictionary']}gs_tree", "cd_gs_tree<='{$_Tree}'")-1;
if( substr($xURL,0,9)!='edes.php?' && substr_count($xURL,':')>0 && strpos($xURL,':')<5 ) $xURL = 'edes.php?'.$xURL;
if( $Debug ) eTron( $xURL );
if( substr($xURL,0,9)=='edes.php?' ){
if( $Debug ) eTron('-> con edes.php' );
list( $uModo, $uURL ) = explode(':',substr($xURL,8));
list( $uSCRIPT ) = explode('&',$uURL);
list( $uNombreURL, $uSufijoURL ) = explode('.',$uSCRIPT);
$oldURL = $uModo.':'.$uNombreURL;
$oldURLFull = $uModo.':'.$uNombreURL.'.'.$uSufijoURL;
$DimURL = array();
$DimURL[] = $oldURL;
if( $oldURL!=$oldURLFull ) $DimURL[] = $oldURLFull;
if( substr($uModo,-1)=='R' ){
$uModo = substr($uModo,0,-1);
$oldURL = $uModo.':'.$uNombreURL;
$oldURLFull = $uModo.':'.$uNombreURL.'.'.$uSufijoURL;
$DimURL[] = $oldURL;
if( $oldURL!=$oldURLFull ) $DimURL[] = $oldURLFull;
}
$t = count($DimURL);
for( $n=0; $n<$t; $n++ ){
if( $DimURL[$n][0]=='F' ) $DimURL[] = '#'.substr($DimURL[$n],1);
if( $DimURL[$n][0]=='G' ) $DimURL[] = '@'.substr($DimURL[$n],1);
if( $DimURL[$n][0]=='L' ) $DimURL[] = '='.substr($DimURL[$n],1);
if( $DimURL[$n][0]=='E' ) $DimURL[] = '>'.substr($DimURL[$n],2);
}
if( $Debug ) for( $n=0; $n<count($DimURL); $n++ ) eTron('*** '.$DimURL[$n].' ***');
$uConPermiso = true;
$Paso = false;
if( $Debug ) eTron( "select * from {$_SESSION['ShareDictionary']}gs_op where script_url like '%{$uNombreURL}%'" );
qQuery( "select * from {$_SESSION['ShareDictionary']}gs_op where script_url like '%{$uNombreURL}%'" );
while( $r=qArray() ){
$Paso = true;
$uURL = trim($r['script_url']);
if( $Debug ) eTron( ':::'.$uURL );
if( $Debug ) eTron( substr($r['subtree_opt'],$NArbol,1).' - '.$r['subtree_opt'] );
if( $uURL[0]==':' ){
if( $Debug ) eTron('-> PADRE : '.$r['caption'] );
qQuery( "select * from {$_SESSION['ShareDictionary']}gs_op where seq_parent='{$r['seq']}'", $p );
while( $r2=qArray($p) ){
if( $Debug ) eTron( $r2['script_url'].' - '.$r2['caption'].' - '.$r2['subtree_opt'].' - '.substr($r2['subtree_opt'],$NArbol,1) );
list($newURL) = explode('&',trim($r2['script_url']).substr($uURL,1));
while( substr_count('wW?mM12345',$newURL[0],0,5) > 0 ) $newURL= substr($newURL,1);
if( in_array( $newURL, $DimURL ) ){
if( substr($r['subtree_opt'],$NArbol,1)!=1 || substr($r2['subtree_opt'],$NArbol,1)!=1 ){
$uConPermiso = false;
break;
}
if( $Debug ) eTron('-ok-');
break;
}
}
}else{
if( $Debug ) eTron('-> HIJO : '.$r['script_url'].' - '.$r['caption'].' - '.$r['subtree_opt'].' - '.substr($r['subtree_opt'],$NArbol,1) );
list($newURL) = explode('&',trim($r['script_url']));
while( substr_count('wW?mM12345',$newURL[0],0,5) > 0 ) $newURL = substr($newURL,1);
if( $Debug ) eTron( $newURL );
if( in_array( $newURL, $DimURL ) ){
if( substr($r['subtree_opt'],$NArbol,1)!=1 ){
$uConPermiso = false;
break;
}
if( $Debug ) eTron('-ok-');
break;
}
}
}
if( !$Paso ) $uConPermiso = true;
}else{
if( $Debug ) eTron('-> sin edes.php' );
$uConPermiso = true;
if( substr_count($xURL,'&') == 0 ){
if( $Debug ) eTron(':-> url/funcion directa -> '.$xURL );
qQuery( "select * from {$_SESSION['ShareDictionary']}gs_op where script_url='{$xURL}'" );
}else{
list( $xURL, ) = explode('&',$xURL);
if( $Debug ) eTron(':-> url/truncada con & -> '.$xURL );
qQuery( "select * from {$_SESSION['ShareDictionary']}gs_op where script_url like '{$xURL}'" );
}
while( $r=qArray() ){
if( substr($r['subtree_opt'],$NArbol,1)!=1 ){
$uConPermiso = false;
break;
}
}
}
if( $Debug ){
eTron( (($uConPermiso)?'- CON PERMISO -':'- SIN permiso -')."\n" );
$_DEBUG = $OldDebu;
}
return $uConPermiso;
}
function _UrlPermission($xURL){
global $_User;
$Debug = false;
$xURL = trim($xURL);
if( $xURL[0]=="'" || $xURL[0]=='"' ) $xURL = substr($xURL,1);
if( $Debug ){
$OldDebu = $_DEBUG;
$_DEBUG = 10;
eTron( 'Inicio 1: '.$xURL );
}
if( substr($xURL,0,9)!='edes.php?' && substr_count($xURL,':')>0 && strpos($xURL,':')<5 ) $xURL = 'edes.php?'.$xURL;
if( $Debug ) eTron( 'Inicio 2: '.$xURL );
if( substr($xURL,0,9)=='edes.php?' ){
if( $Debug ) eTron('-> con edes.php');
list($uModo, $uURL) = explode(':', substr($xURL,8));
list($uSCRIPT) = explode('&',$uURL);
list($uNombreURL, $uSufijoURL) = explode('.', $uSCRIPT);
$oldURL		= $uModo.':'.$uNombreURL;
$oldURLFull = $uModo.':'.$uNombreURL.'.'.$uSufijoURL;
$DimURL = array();
$DimURL[] = $oldURL;
if( $oldURL!=$oldURLFull ) $DimURL[] = $oldURLFull;
if( substr($uModo,-1)=='R' ){
$uModo = substr($uModo,0,-1);
$oldURL     = $uModo.':'.$uNombreURL;
$oldURLFull = $uModo.':'.$uNombreURL.'.'.$uSufijoURL;
$DimURL[] = $oldURL;
if( $oldURL!=$oldURLFull ) $DimURL[] = $oldURLFull;
}
$t = count($DimURL);
list( $DimURL[] ) = explode( '&', $xURL );
for( $n=0; $n<$t; $n++ ){
if( $DimURL[$n][0]=='F' ) $DimURL[] = '#'.substr($DimURL[$n],1);
if( $DimURL[$n][0]=='G' ) $DimURL[] = '@'.substr($DimURL[$n],1);
if( $DimURL[$n][0]=='L' ) $DimURL[] = '='.substr($DimURL[$n],1);
if( $DimURL[$n][0]=='E' ) $DimURL[] = '>'.substr($DimURL[$n],2);
}
if( $Debug ) for( $n=0; $n<count($DimURL); $n++ ) eTron('>>> '.$DimURL[$n]);
$uConPermiso = true;
$Paso = false;
$Menu = file('../_tmp/php/'.$_SESSION['_G_'].'menu.'.$_User);
$DimMenu = array();
for($n=0; $n<count($Menu); $n++){
list($url, $icon) = explode("|", $Menu[$n]);
$DimMenu[trim($url)] = 1;
}
for($n=0; $n<count($DimURL); $n++){
if( $DimMenu[$DimURL[$n]]==1 ){
return true;
}
}
if( $Debug ) eTron("select * from {$_SESSION['ShareDictionary']}gs_op where script_url like '%{$uNombreURL}%' and show_type<>'U'");
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op where script_url like '%{$uNombreURL}%' and show_type<>'U'");
while( $r=qArray() ){
$Paso = true;
$uURL = trim($r['script_url']);
if( $Debug ) eTron( ':::'.$uURL );
if( $uURL[0]==':' ){
if( $Debug ) eTron('-> PADRE : '.$r['caption'] );
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op where seq_parent='{$r['seq']}' and show_type<>'U'", $p);
while( $r2=qArray($p) ){
if( $Debug ) eTron($r2['script_url'].' - '.$r2['caption']);
list($newURL) = explode('&',trim($r2['script_url']).substr($uURL,1));
while( substr_count('wW?mM12345',$newURL[0],0,5)>0 ) $newURL= substr($newURL,1);
if( in_array( $newURL, $DimURL ) ){
if( $Debug ) eTron('-ok- Op existe, no se le dá acceso');
return false;
}
}
}else{
if( $Debug ) eTron('-> HIJO : '.$r['script_url'].' - '.$r['caption']);
list($newURL) = explode('&',trim($r['script_url']));
while( substr_count('wW?mM12345',$newURL[0],0,5)>0 ) $newURL = substr($newURL,1);
if( $Debug ) eTron($newURL);
if( in_array($newURL, $DimURL) ){
if( $Debug ) eTron('-ok- Op existe, no se le dá acceso');
return false;
}
}
}
if( !$Paso ) $uConPermiso = true;
}else{
if( $Debug ) eTron('-> sin edes.php');
$uConPermiso = true;
if( substr_count($xURL,'&')==0 ){
if( $Debug ) eTron(':-> url/funcion directa -> '.$xURL);
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op where script_url='{$xURL}' and show_type<>'U'");
}else{
list( $xURL, ) = explode('&',$xURL);
if( $Debug ) eTron(':-> url/truncada con & -> '.$xURL);
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op where script_url like '{$xURL}' and show_type<>'U'");
}
$uConPermiso = (trim($r['script_url'])!='');
}
if( $Debug ){
eTron((($uConPermiso)? '- CON PERMISO -' : '- SIN permiso -'). "\n");
$_DEBUG = $OldDebu;
}
return $uConPermiso;
}
?>
