<?PHP //[_PROTECCION_]
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
_HeaderAdd();
$_DirG = 'g/e'; //include_once( $Dir_.'t/lp.gs' );
if( $_SESSION["_gsACCESO"]['ACCESO'] < 1 ) die('Error:78');
if( $_SESSION["_gsACCESO"]['Edit'] < 1 ) die('Error:79');
include( '../_d_/cfg/edes.ini' );
if( !isset($_FontSize) ) $_FontSize = 10;
include( "{$Dir_}t/{$_Language}.lng");
$_DimFields = array();
if( isset($Tmp) ){
VerTemporal( substr($Tmp,1,-1) );
}
if( isset($TRON) ){
if( $TRON=='/_tmp/__tron.'.$_User ){
unlink('../_tmp/__tron.'.$_User);
ShowMensaje('TRON Borrado');
}else{
exit;
}
}
if( isset($SQLTMP) ){
if( $SQLTMP=='/_tmp/log/sql.'.$_User ){
unlink('/_tmp/log/sql.'.$_User);
ShowMensaje('SQL Borrado');
}else{
exit;
}
}
if( isset($VerSQL) ){
include_once( $Dir_.$_Sql.'.inc' );
VerSQL( $VerSQL, isset($IT), isset($Multi) );
}
if( isset($SUBLIST) ){
list($TABLA, $scriptSubWin, $scriptPadre, $nInsert) = explode(',', str_replace(" ","",$SUBLIST));
include_once($Dir_.$_Sql.'.inc');
list($_SqlPDOType) = explode(':', $_SqlPDOConnect);
include("{$Dir_}t/credf.inc");
if( eSqlType('mysql') ){
$Todo = CreaFCHMySql( $TABLA );
}else if( eSqlType('mysqli') ){
$Todo = CreaFCHMySqli( $TABLA );
}else if( eSqlType('pdo.informix') ){
$Todo = CreaFCHInformix( $TABLA );
}else if( eSqlType('informix') ){
$Todo = CreaFCHInformix( $TABLA );
}else if( eSqlType('oracle') ){
$Todo = CreaFCHOracle( $TABLA );
}else{
eEnd();
}
ob_end_clean(); ob_start();
$dim = file(eScript($scriptPadre));
for($n=0; $n<count($dim); $n++){
$txt = trim($dim[$n]);
if( preg_match('/^(\[NOTE\]|\[EXIT\])/i', $txt) ) break;
if( preg_match('/^(\[DBTABLE\])/i', $txt) ){
$padreDBTable = trim(explode("|",str_replace("]","|",$txt))[1]);
}
if( preg_match('/^(\[DBINDEX\])/i', $txt) ){
$padreDBIndex = trim(explode("|",str_replace("]","|",$txt))[1]);
}
if( preg_match('/^(\[DBSERIAL\])/i', $txt) ){
$padreDBSerial = trim(explode("|",str_replace("]","|",$txt))[1]);
}
}
if( $scriptSubWin=="" ){
$scriptSubWin = "FormOnLine";
}else{
$scriptPadre = str_replace("\\", "/", $scriptPadre);
$pos = strrpos($scriptPadre, "/");
eTrace($pos);
if( $pos===false ){
$pre = "";
}else{
$pre = substr($scriptPadre, 0, $pos+1);
}
$scriptSubWin = str_replace("\\", "/", $scriptSubWin);
$pos = strrpos($scriptSubWin, "/");
eTrace($pos);
if( $pos===false ){
}else{
$scriptSubWin = substr($scriptSubWin, $pos+1);
}
list($scriptSubWin) = explode(".", $scriptSubWin);
$scriptSubWin = $pre.$scriptSubWin.".edf";
}
$sTodo = $Todo;
list(,$DBIndex) = explode('[DBIndex]',$Todo); list($DBIndex) = explode("\n",$DBIndex); $DBIndex = trim($DBIndex);
list(,$DBOrder) = explode('[DBOrder]',$Todo); list($DBOrder) = explode("\n",$DBOrder); $DBOrder = trim($DBOrder);
list($Todo) = explode('[Note]',$Todo);
list(,$Todo) = explode('[Fields]',$Todo);
$Todo = trim($Todo);
$Dim = explode("\n",$Todo);
$LonObj = strlen("[__{$TABLA}]");
echo '<TEXTAREA NAME="CONTENIDO" id="CONTENIDO" ROWS="100%" COLS="100%">';
if( $scriptSubWin=="FormOnLine" ){
echo "#(a,?R)¿\n";
echo "- | SUBFICHA \"__{$TABLA}\"\n";
}
$Dim[0] = '   '.$Dim[0];
$Field = array();
for($n=0; $n<count($Dim); $n++){
$Fila = explode('|',rtrim($Dim[$n]));
if( trim($Fila[1])==$padreDBIndex ) continue;
if( trim($Dim[$n])[0]=="." ) continue;
if( trim($Fila[3])=="S" ) $Fila[1] = trim($Fila[1]).":".substr($Fila[1],1);
$Field[] = $Fila;
if( $scriptSubWin=="FormOnLine" ){
for($c=0; $c<count($Fila); $c++){
if( $Field[1]==$padreDBIndex ) continue;
if( $c==1 ){
$l = strlen($Fila[$c])+1;
if( $LonObj>$l ) $l = $LonObj;
echo ' '.str_pad('_'.trim($Fila[$c]), $l);
}else{
if( $c==6 ) $Fila[$c] = str_replace(array("A","Q"), array("M",""), $Fila[$c]);
echo $Fila[$c];
}
if( $c<9 ) echo '|';
}
echo "\n";
}
}
echo "- | LISTADO \"__{$TABLA}\"\n";
$l = strlen($Fila[0]);
$Fila = explode('|',rtrim($Dim[0]));
for( $c=0; $c<count($Fila); $c++ ){
$l = strlen($Fila[$c]);
if( $c==1 ){
$l++;
echo ' '.str_pad( "[__{$TABLA}]", $l );
}else if( $c==2 ){
echo str_pad( ' o', $l );
}else if( $c==2 ){
echo str_pad( ' M', $l );
}else{
echo str_pad( ' ', $l );
}
if( $c<9 ) echo '|';
}
echo "\n?\n";
echo "\n\n";
echo "[SubList] a,?R | __{$TABLA}\n";
echo "{slGL}  Sql | TypeData | Align | ColsWidth | Format    | ColsOp | Menu | TH\n";
echo "   ''       |          |   I   |           | [v][d][u] |        | IMG  | [i]\\"."\n";
$dimListCampos = array("''=IMG");
for($c=0; $c<count($Field); $c++){
list($Field[$c][1]) = explode(":", $Field[$c][1]);
$Field[$c][1] = trim($Field[$c][1]);
if( trim($Field[$c][1])==$padreDBIndex ) continue;
if( trim($Field[$c][1])==$DBIndex ){
echo str_pad('.'.trim($Field[$c][1]),18-9,' ',STR_PAD_LEFT).'   | ';
}else{
echo str_pad($Field[$c][1],20-9,' ',STR_PAD_LEFT).' | ';
}
echo str_pad($Field[$c][3],10,' ',STR_PAD_BOTH).' | ';
if( substr_count($Field[$c][4],',')==1 ){
echo str_pad('D',6,' ',STR_PAD_BOTH);
}else{
echo str_pad('I',6,' ',STR_PAD_BOTH);
}
echo '|           |';
echo '        |';
echo '        | ';
if( $Field[$c][1]==$padreDBIndex ) echo ".";
echo str_pad('_'.trim($Field[$c][1]),strlen($Field[$c][1]));
echo '| '; if( trim($Field[$c][1])!=$DBIndex ) echo strtoupper(trim($Field[$c][0]));
echo "\n";
$dimListCampos[] = trim($Field[$c][1]);
}
$SerialSubFicha = "CampoSerial";
if( $scriptSubWin!="FormOnLine" ){
$Dim = explode("\n", $sTodo);
$txt = "";
for($n=0; $n<count($Dim); $n++){
if( preg_match('/^(\[FormStatic\])/i', trim($Dim[$n])) ){
continue;
}
if( preg_match('/^(\[DBSerial\])/i', trim($Dim[$n])) ){
continue;
}
if( preg_match('/^(\[Fields\])/i', trim($Dim[$n])) ){
$txt .= "[FormStatic] [__{$TABLA}] | ".implode(",", $dimListCampos)." | | | | [u][d][v]\n\n";
}
$tmp = explode("|", $Dim[$n]);
if( trim($tmp[1])==$padreDBIndex ) $Dim[$n] = ".".substr($Dim[$n],1)."\t\t/"."/ puntero al padre";
$txt .= $Dim[$n]."\n";
}
file_put_contents(eScript($scriptSubWin), $txt);
}
echo "{slSql} select # from {$TABLA} where {$padreDBIndex}='{{$padreDBIndex}}' order by {$DBOrder}\n";
if( $SerialSubFicha=="CampoSerial" ){
echo ".       [[| {$SerialSubFicha} [| CampoFile [| CampoDondeSeGuardaElFichero ]]]\n\n";
}else{
echo "        | {$SerialSubFicha}\t\t/"."/ [| CampoFile [| CampoDondeSeGuardaElFichero ]]]\n\n";
}
if( $scriptSubWin=="FormOnLine" ){
echo '{slMenu}  a,mR | Insertar:i, Borrar:d, Modificar:u, Consultar:v | # || FormOnLine | [u][d]'."\n";
echo '{slMenu} cR,bR |                                    Consultar:v | # || FormOnLine | '."\n";
}else{
echo '{slMenu}  a,mR | Insertar:i, Borrar:d, Modificar:u, Consultar:v | '.$scriptSubWin.' || FormStatic ||'."\n";
echo '{slMenu} cR,bR |                                    Consultar:v | '.$scriptSubWin.' || FormStatic ||'."\n";
}
echo "{slWin} ,5\n";
echo '</TEXTAREA>';
?>
<SCRIPT type="text/javascript">
var _WOPENER = window.frameElement.WOPENER;
_WOPENER._Editor.replaceSelection(document.getElementById("CONTENIDO").value);
<?PHP if( $nInsert>0 && $scriptSubWin!="FormOnLine" ){ ?>
_WOPENER._Editor.setCursor(<?=$nInsert?>+1, 0);
_WOPENER._Editor.replaceSelection("\n[LoadIni] <?=$scriptSubWin?>\n");
<?PHP } ?>
_WOPENER.AlinearFields(_WOPENER._Editor);
_WOPENER.colorear();
var op = _WOPENER._Editor.getTextArea().parentNode.name.replace("FRM","")*1;
_WOPENER.Grabar(op);
</SCRIPT>
<?PHP
eEnd();
}
$_Restaurar = false;
$MasInfo = '';
if( isset($Restore) ){
$sRestore = $Restore;
$Restore = eScript( $Restore, $BakFile );
if( file( $BakFile ) ){
$_Restaurar = true;
$HR = str_replace('..','',$BakFile);
}else{
$HR = substr($Restore,0,strrpos($Restore,'.'));
$MasInfo = 'alert("'.$_T[63].'");';
}
}
if( isset($HELP) ){
list( $HELP, ) = explode('.',$HELP);
$Fichero = $Dir_.'h/'.strtolower(trim($HELP)).'.htm';
$fd = fopen( $Fichero, 'r' );
$txt = fread( $fd, filesize($Fichero) );
fclose($fd);
ob_start();
ob_implicit_flush(0);
$txt = str_replace( 'language="JavaScript"', 'language="gs"', $txt );
$txt = str_replace( 'javaScript:parent.reDisplay(', 'javaScript:/'.'/parent.reDisplay(', $txt );
$txt = str_replace( '</body>', '<script type="text/javascript">document.all.tags("TABLE")[0].rows[0].cells[1]. style.display="none";</SCRIPT></body>', $txt );
$txt = str_replace( '<body ', "<body style='margin:5' ", $txt );
echo $txt;
EnviaGZip(1,0);
exit;
}
if( isset($OP) && isset($FUENTE) && isset($Fichero) ){
if( $OP=='LHTM' || $OP=='LSQL' || $OP=='LPHP' ){
$Fichero = '../_tmp/edes_'.strtolower(substr($OP,1)).'.'.$_User;
if( $NOMSQLHTM!='' ) $Fichero = '../_tmp/'.$NOMSQLHTM.'.'.$_User;
$fd = fopen( $Fichero, 'r' );
$Todo = fread( $fd, filesize($Fichero) );
fclose($fd);
$Todo = str_replace( '&nbsp;','&nbsp;', $Todo );
$Todo = str_replace( '&#46;' ,'&#46;' , $Todo );
$Todo = str_replace( '&#44;' ,'&#44;' , $Todo );
$Todo = str_replace( '&#35;' ,'&#35;' , $Todo );
$Todo = str_replace( '&#13;' ,'&#13;' , $Todo );
$Todo = str_replace( '&#10;' ,'&#10;' , $Todo );
$Todo = str_replace( ' '     ,'##32;' , $Todo );
$Todo = urlencode( $Todo );
eHTML();
echo '<SCRIPT type="text/javascript">';
echo 'function UnZip(){';
echo 'var txt = unescape(document.FRM1.FUENTE.value);';
echo "txt = txt.replace(/&nbsp;/g,'&nbsp;');";
echo "txt = txt.replace(/&#46;/g, '&#46;');";
echo "txt = txt.replace(/&#44;/g, '&#44;');";
echo "txt = txt.replace(/&#35;/g, '&#35;');";
echo "txt = txt.replace(/##32;/g, ' ');";
echo "txt = txt.replace(/&#13;/g, '&#13;');";
echo "txt = txt.replace(/&#10;/g, '&#10;');";
echo "top.i".substr($OP,1).".document.all.DocX.Text = txt;";
echo "top.Ver('i".substr($OP,1)."');";
echo '}';
echo '</SCRIPT>';
echo '</HEAD><BODY onload="UnZip();" style="display:none">';
echo '<FORM METHOD=POST ACTION="" NAME="FRM1">';
echo '<TEXTAREA NAME="FUENTE">'.$Todo.'</TEXTAREA>';
echo '</FORM></BODY></HTML>';
exit;
}
if( $OP=='HTM' || $OP=='SQL' ){
$Fichero = '../_tmp/edes_'.strtolower($OP).'.'.$_User;
if( $NOMSQLHTM!='' ) $Fichero = '../_tmp/'.$NOMSQLHTM.'.'.$_User;
$pnt = fopen( $Fichero, 'w' );
if( !$pnt ) die( "{$_T[64]} ({$Fichero})" );
$Doc = str_replace( '+','%2B', $FUENTE );
$Doc = urldecode($Doc);
$Doc = str_replace( '&nbsp;','&nbsp;', $Doc );
$Doc = str_replace( '&#46;' ,'&#46;' , $Doc );
$Doc = str_replace( '&#44;' ,'&#44;' , $Doc );
$Doc = str_replace( '&#35;' ,'&#35;' , $Doc );
$Doc = str_replace( '&#13;' ,'&#13;' , $Doc );
$Doc = str_replace( '&#10;' ,'&#10;' , $Doc );
$Doc = str_replace( chr(13) ,'' , $Doc );
fputs( $pnt, $Doc );
fclose( $pnt );
die( '<SCRIPT type="text/javascript">alert("'.$_T[65].'");</SCRIPT>' );
}
if( substr($FUENTE,0,5)=='//C:'.chr(13) ){
$Fichero = '../_tmp/edes_c.'.$_User.'.c';
$fd = fopen( $Fichero, 'w' );
fputs( $fd, stripslashes($FUENTE) );
$Todo = fread( $fd, filesize($Fichero) );
fclose($fd);
passthru( "gcc {$Fichero} -o ../_tmp/edes_c.{$_User}" );
passthru( "../_tmp/edes_c.{$_User}" );
exit;
}
if( substr($FUENTE,0,5)=='#SQL'.chr(13) ){
include_once( $Dir_.$_Sql.'.inc' );
$FUENTE = trim(substr($FUENTE,5));
}
$Fichero = '../_tmp/edes_php.'.$_User;
if( trim($FUENTE)=='' ){
if( $NOMPHP!='' ) $Fichero = '../_tmp/'.$NOMPHP.'.'.$_User;
$fd = fopen( $Fichero, 'r' );
$Todo = fread( $fd, filesize($Fichero) );
fclose($fd);
if( $_SESSION["_gsACCESO"]['LOGEAR'] > 0 ) gsLogear( 'PHP','L', $Fichero.' '.strlen($Todo) );
$Todo = str_replace( '&nbsp;','&nbsp;', $Todo );
$Todo = str_replace( '&#46;','&#46;', $Todo );
$Todo = str_replace( '&#44;','&#44;', $Todo );
$Todo = str_replace( '&#35;','&#35;', $Todo );
$Todo = str_replace( '&#13;','&#13;', $Todo );
$Todo = str_replace( '&#10;','&#10;', $Todo );
$Todo = str_replace( ' ','##32;', $Todo );
$Todo = urlencode( $Todo );
eHTML();
echo '<SCRIPT type="text/javascript">';
echo 'function UnZip(){';
echo 'var txt = unescape(document.forms[0].DOC.value);';
echo "txt = txt.replace(/&nbsp;/g,'&nbsp;');";
echo "txt = txt.replace(/&#46;/g, '&#46;');";
echo "txt = txt.replace(/&#44;/g, '&#44;');";
echo "txt = txt.replace(/&#35;/g, '&#35;');";
echo "txt = txt.replace(/##32;/g, ' ');";
echo "txt = txt.replace(/&#13;/g, '&#13;');";
echo "txt = txt.replace(/&#10;/g, '&#10;');";
echo "top.iPHP.document.all.DocX.Text = txt;";
echo 'top.gsPHP();';
echo '}';
echo '</SCRIPT>';
echo '</HEAD><BODY onload="UnZip();" style="display:none">';
echo '<FORM METHOD=POST ACTION="">';
echo '<TEXTAREA NAME="DOC">'.$Todo.'</TEXTAREA>';
echo '</FORM></BODY></HTML>';
exit;
}
$Todo = str_replace( '+','%2B', $FUENTE );
$Todo = urldecode($Todo);
$Todo = str_replace( '&nbsp;','&nbsp;', $Todo );
$Todo = str_replace( '&#46;' ,'&#46;' , $Todo );
$Todo = str_replace( '&#44;' ,'&#44;' , $Todo );
$Todo = str_replace( '&#35;' ,'&#35;' , $Todo );
$Todo = str_replace( '&#13;' ,'&#13;' , $Todo );
$Todo = str_replace( '&#10;' ,'&#10;' , $Todo );
$nFUENTE = str_replace( chr(13) ,'' , $Todo );
if( strlen($nFUENTE) < 50 ){
$EstaRelleno = str_replace(' ','',str_replace( chr(10),'' ,$nFUENTE ));
if( strlen($EstaRelleno)==4 ) exit;
}
if( $NOMPHP=='' ){
if( file_exists($Fichero) ) copy( $Fichero, '../_bak_/edes_php.'.$_User.'.'.date('w') );
}else{
$Fichero = '../_tmp/'.$NOMPHP.'.'.$_User;
if( file_exists($Fichero) ) copy( $Fichero, '../_bak_/'.$NOMPHP.'.'.$_User.'.'.date('w') );
}
$pnt = fopen( $Fichero, 'w' );
if( !$pnt ) die( $_T[66] );
fputs( $pnt, trim($nFUENTE) );
fclose( $pnt );
function ErrInterprete( $num_err, $mens_err, $nombre_archivo, $num_linea, $vars ){
if( $num_err == 2 || $num_err == 8 ) return;
$eTipo = array (
E_WARNING			=> "Advertencia",
E_NOTICE			=> "Anotación",
E_USER_ERROR		=> "Error de Usuario",
E_USER_WARNING		=> "Advertencia de Usuario",
E_USER_NOTICE		=> "Anotación de Usuario",
E_ERROR				=> "Error",
E_PARSE				=> "Error de Intérprete",
E_CORE_ERROR		=> "Error de Núcleo",
E_CORE_WARNING		=> "Advertencia de Núcleo",
E_COMPILE_ERROR	=> "Error de Compilación",
E_COMPILE_WARNING	=> "Advertencia de Compilación"
);
$errores_de_usuario = array( E_USER_ERROR, E_USER_WARNING, E_USER_NOTICE );
$err = '';
if( 1==2 ){
$err  = "<errorentry>\n";
$err .= "\t<datetime>"			. date("Y-m-d H:i:s"). "</datetime>\n";
$err .= "\t<errornum>"			. $num_err				. "</errornum>\n";
$err .= "\t<errortype>"			. $eTipo[$num_err]	. "</errortype>\n";
$err .= "\t<errormsg>"			. trim($mens_err)		. "</errormsg>\n";
$err .= "\t<scriptname>"		. $nombre_archivo		. "</scriptname>\n";
$err .= "\t<scriptlinenum>"	. $num_linea			. "</scriptlinenum>\n";
if( in_array( $num_err, $errores_de_usuario ) ){
$err .= "\t<vartrace>" . wddx_serialize_value($vars, "Variables") . "</vartrace>\n";
}
$err .= "</errorentry>\n\n";
}else{
$err .= '<pre style="color:red">';
$err .= "Nº ERROR: ". $num_err			. "\n";
$err .= "TYPE....: ". $eTipo[$num_err]	. "\n";
$err .= "MESSAGE.: ". trim($mens_err)	. "\n";
$err .= "Nº LINE.: ". $num_linea			. "\n";
if( in_array( $num_err, $errores_de_usuario ) ){
$err .= "TRACE...: " . wddx_serialize_value($vars, "Variables") . "\n";
}
echo $err."</pre>\n";
}
}
$_SetErrorHandler = set_error_handler('ErrInterprete');
if( $_SESSION["_gsACCESO"]['LOGEAR'] > 0 ) gsLogear('PHP','I', $Fichero.' '.filesize($Fichero));
eHTML();
echo '<SCRIPT type="text/javascript">';
echo 'document.onkeydown = function anonymous(){ if(event.keyCode==121)top.Ver("iPHP"); }';
echo '</SCRIPT></HEAD><BODY style="margin: 0px 0px 0px 5px" onload="document.body.scrollTop=\''.$TOP.'px\';';
if( $CONFOCO==0 ) echo "top.document.getElementById('iPHP').style.display='none';document.body.focus();";
echo '">';
include( $Fichero );
echo '</BODY></HTML>';
eEnd();
}
if( isset($DFPrivado) ){
DFPrivado( $DFPrivado, $FilePrivado );
exit;
}
if( substr($HR,0,4) == '>Xm:' ){
include( $Dir_.'_tabla.gs' );
exit;
}
if( $RECARGAR==1 ){
$HR = $Fichero;
unset($Fichero);
}
$_SeGrabo = false;
if( isset($Fichero) && substr($Fichero,0,10)=='PROCEDURE-' ){
include_once( $Dir_.$_Sql.'.inc' );
$Doc = str_replace( '+','%2B', $Doc );
$Doc = urldecode($Doc);
$Doc = str_replace( '&nbsp;','&nbsp;', $Doc );
$Doc = str_replace( '&#46;' ,'&#46;' , $Doc );
$Doc = str_replace( '&#44;' ,'&#44;' , $Doc );
$Doc = str_replace( '&#35;' ,'&#35;' , $Doc );
$Doc = str_replace( '&#13;' ,'&#13;' , $Doc );
$Doc = str_replace( '&#10;' ,'&#10;' , $Doc );
$Doc = str_replace( chr(13) ,'' , $Doc );
$Fichero = str_replace('PROCEDURE-','',$Fichero);
$xFichero = eScript( 'procedure.sys/'.$Fichero, $xBakFile, $xFicheroEdes );
$oDoc = '';
if( $_SESSION["_gsACCESO"]['LOGEAR'] > 0 ) gsLogear( 'ED','W', $xFichero.' '.strlen($Doc).'/'.(strlen($Doc)-filesize($xFichero) ) );
gsActivity( $xFichero );
$df = fopen($xFichero,'r');
$oDoc = fread($df,filesize($xFichero));
fclose($df);
if( qCount( 'sysprocedures', "procname='".$Fichero."'" ) > 0 ) {
qQuery( 'drop procedure '.$Fichero );
}
$_DEBUG = 30;
if( qQuery( $Doc ) == -1 ){
if( $oDoc != '' ) qQuery( $oDoc );
ShowMensaje( 'ERROR: '.$Fichero, true, date('Y-m-d H:i:s') );
}
if( $NumBak > 0 ){
CrearDirectorios( $xBakFile );
switch( $NumBak ){
case 1:
$zp = gzopen( $xBakFile					, "w9" );
break;
case 7:
$zp = gzopen( $xBakFile.'.'.date('w'), "w9" );
break;
case 30:
$zp = gzopen( $xBakFile.'.'.date('d'), "w9" );
break;
case -1:
$zp = gzopen( $xBakFile					, "a9" );
gzwrite($zp, chr(13).chr(10).str_repeat('·',75).' '.date('Y-m-d H:i:s').chr(13).chr(10) );
}
$df = fopen($xFichero,'r');
$oDoc = fread($df,filesize($xFichero));
gzwrite( $zp, $oDoc );
fclose($df);
gzclose($zp);
}
CrearDirectorios( $xFichero );
$pnt = fopen( $xFichero, 'w' );
if( !$pnt ) die( "No se ha podido abrir el fichero para escritura ({$xFichero})" );
fputs( $pnt, $Doc );
fclose( $pnt );
ShowMensaje( 'GRABADO: '.$Fichero, true, date('Y-m-d H:i:s') );
}else if( isset($Fichero) && substr($Fichero,0,8)=='TRIGGER-' ){
include_once( $Dir_.$_Sql.'.inc' );
$Doc = str_replace( '+','%2B', $Doc );
$Doc = urldecode($Doc);
$Doc = str_replace( '&nbsp;','&nbsp;', $Doc );
$Doc = str_replace( '&#46;' ,'&#46;' , $Doc );
$Doc = str_replace( '&#44;' ,'&#44;' , $Doc );
$Doc = str_replace( '&#35;' ,'&#35;' , $Doc );
$Doc = str_replace( '&#13;' ,'&#13;' , $Doc );
$Doc = str_replace( '&#10;' ,'&#10;' , $Doc );
$Doc = str_replace( chr(13) ,'' , $Doc );
$Fichero = str_replace('TRIGGER-','',$Fichero);
$xFichero = eScript( 'trigger.sys/'.$Fichero, $xBakFile, $xFicheroEdes );
$oDoc = '';
$df = fopen($xFichero,'r');
$oDoc = fread($df,filesize($xFichero));
fclose($df);
if( qCount( 'systriggers', "trigname='".$Fichero."'" ) > 0 ) {
qQuery( 'drop trigger '.$Fichero );
}
$_DEBUG = 30;
if( qQuery( $Doc ) == -1 ){
if( $oDoc != '' ) qQuery( $oDoc );
ShowMensaje( 'ERROR: '.$Fichero, true, date('Y-m-d H:i:s') );
}
if( $NumBak > 0 ){
CrearDirectorios( $xBakFile );
switch( $NumBak ){
case 1:
$zp = gzopen( $xBakFile					, "w9" );
break;
case 7:
$zp = gzopen( $xBakFile.'.'.date('w'), "w9" );
break;
case 30:
$zp = gzopen( $xBakFile.'.'.date('d'), "w9" );
break;
case -1:
$zp = gzopen( $xBakFile					, "a9" );
gzwrite($zp, chr(13).chr(10).str_repeat('·',75).' '.date('Y-m-d H:i:s').chr(13).chr(10) );
}
$df = fopen($xFichero,'r');
$oDoc = fread($df,filesize($xFichero));
gzwrite( $zp, $oDoc );
fclose($df);
gzclose($zp);
}
CrearDirectorios( $xFichero );
$pnt = fopen( $xFichero, 'w' );
if( !$pnt ) die( "No se ha podido abrir el fichero para escritura ({$xFichero})" );
fputs( $pnt, $Doc );
fclose( $pnt );
ShowMensaje( 'GRABADO: '.$Fichero, true, date('Y-m-d H:i:s') );
}else if( isset($Fichero) ){
if( $_SESSION["_gsACCESO"]['TIPO'] != '~' && $Fichero[0] == '$' ) die('<SCRIPT type="text/javascript">top.IE.Quit();</SCRIPT>');
if( $Fichero[0]=='>' ) $Fichero = substr($Fichero,1);
$OriFile = $Fichero;
$_Directorio = $D;
$Fichero = eScript( $Fichero, $BakFile, $FicheroEdes );
$File = $Fichero;
if( substr($Fichero,0,13) == '../_doc_/edf/' ) CrearDirectorios( $Fichero );
$_SeGrabo = true;
$Editar = 1;
$Arbol = 1;
$SeHaGrabado = true;
if( !$FicheroEdes ) CrearDirectorios( $BakFile );
ignore_user_abort( 0 );
$Recientes = '../_d_/usr/recientes.'.$_User;
$Dim = file( $Recientes );
$txt = $OriFile."\n";
for( $i=0; $i<count($Dim); $i++ ){
$Dim[$i] = trim($Dim[$i]);
if( $OriFile != $Dim[$i] && $Dim[$i] != '' ) $txt .= $Dim[$i]."\n";
if( $i > 20 ) break;
}
$fd = fopen( $Recientes, 'w' );
$txt = fputs( $fd, $txt );
fclose( $fd );
if( $Fichero!='../_tmp/__tron.'.$_User && substr_count($File,'../_doc_/')==0 ){
if( date('Y-m-d H:i:s',filemtime($Fichero)) != $CDI ) ShowMensaje( $_T[67], false );
}
$Long = filesize($Fichero);
$fd = fopen( $Fichero, 'r' );
$txt = fread( $fd, $Long );
fclose($fd);
if( substr($txt,0,4)=='Zend' ){
die('<SCRIPT type="text/javascript">alert("'.$_T[68].'");top.IE.Quit();</SCRIPT>');
}
$Bloque = substr( $txt, 0, strpos($txt,"\n") );
if( $NumBak > 0 ){
switch( $NumBak ){
case 1:
$zp = gzopen( $BakFile				, "w9" );
break;
case 7:
$zp = gzopen( $BakFile.'.'.date('w'), "w9" );
break;
case 30:
$zp = gzopen( $BakFile.'.'.date('d'), "w9" );
break;
case -1:
$zp = gzopen( $BakFile				, "a9" );
if( '[LockFile]' != substr($Bloque,0,10) ){
gzwrite($zp, chr(13).chr(10).str_repeat('·',75).' '.date('Y-m-d H:i:s').chr(13).chr(10) );
}else{
gzwrite($zp, chr(13).chr(10).str_repeat(chr(47).chr(92),29).' No actualizado = '.date('Y-m-d H:i:s').chr(13).chr(10) );
}
}
gzwrite($zp, $txt );
gzclose($zp);
}
if( substr_count('~AM',$_TipoUsu)==0 && '[LockFile]' == substr($Bloque,0,10) ){
if( substr_count( $Bloque, '('.$_User.')' ) == 0 ){
ShowMensaje( "ERROR: Fichero bloqueado por el usuario \"{$_User}\".", false );
}
}
if( substr_count( $Fichero, '../_doc_/' ) > 0 || ( substr_count( $Fichero.'#', '../_datos/config/sql.ini#' ) > 0 && !$EsPhp ) ){
$Long = strlen(gzuncompress($txt));
}else if( ( substr_count( $Fichero, '/edesweb/t/__' ) > 0 && substr_count( $Fichero, '.arb' ) > 0 ) || substr_count( $Fichero, '/tree/__' ) > 0 ){
$Long = strlen(gzuncompress($txt));
}
$txt = '';
clearstatcache();
$cdiUltima = filemtime($Fichero);
$pnt = fopen( $Fichero, 'w' );
if( !$pnt ) die( "No se ha podido abrir el fichero para escritura ({$Fichero})" );
$Doc = str_replace( '+','%2B', $Doc );
$Doc = urldecode($Doc);
$Doc = str_replace( '&nbsp;','&nbsp;', $Doc );
$Doc = str_replace( '&#46;' ,'&#46;' , $Doc );
$Doc = str_replace( '&#44;' ,'&#44;' , $Doc );
$Doc = str_replace( '&#35;' ,'&#35;' , $Doc );
$Doc = str_replace( '&#13;' ,'&#13;' , $Doc );
$Doc = str_replace( '&#10;' ,'&#10;' , $Doc );
$Doc = str_replace( chr(13) ,'' , $Doc );
$EsPhp = ( substr(trim($Doc),0,2)=='<'.'?' );
if( !$EsPhp && $FORMATEAR==1 ) $Doc = FormateaTexto( $Doc );
if( substr_count( $Fichero, '../_doc_/' ) > 0 || ( substr_count( $Fichero.'#', '../_datos/config/sql.ini#' ) > 0 && !$EsPhp ) ){
fputs( $pnt, gzcompress($Doc,1) );
}else if( ( substr_count( $Fichero, '/edesweb/t/__' ) > 0 && substr_count( $Fichero, '.arb' ) > 0 ) || substr_count( $Fichero, '/tree/__' ) > 0 ){
$Doc = trim(substr( $Fichero, strrpos($Fichero,'/')+1))."\n".$Doc;
fputs( $pnt, gzcompress($Doc,1) );
}else{
fputs( $pnt, $Doc );
}
fclose( $pnt );
clearstatcache();
if( $_SESSION["_gsACCESO"]['LOGEAR'] > 0 ) gsLogear( 'ED','W', $Fichero.' '.strlen($Doc).'/'.(strlen($Doc)-$Long) );
gsActivity( $Fichero );
if( $_SESSION["_gsACCESO"]['FTP'] >= 2 ){
if( isset($FTP) ){
if( $FTP=='G' ) FTPCopy( $Fichero, 'G' );
}
}
if( trim($Doc)=='' ){
unlink( $Fichero );
$Doc = '';
}
$_SERVER['QUERY_STRING'] = $Fichero;
$HR = $Fichero;
$_Directorio = '';
if( $FORMATEAR != 1 ){
$tmp = explode('/',$Fichero);
if( substr($Fichero,0,19)=='../_d_/usr/apuntes.' ){
ShowMensaje( 'GRABADO: Notas personales', false, date('Y-m-d H:i:s',filemtime($Fichero)), $Fichero );
}else{
ShowMensaje( 'GRABADO: '.$tmp[count($tmp)-1], true, date('Y-m-d H:i:s',filemtime($Fichero)), $Fichero );
}
}
}else{
$Editar = 1;
$SeHaGrabado = false;
$_Directorio = $D;
$OriFile = $File = urldecode( $HR );
if( $File[0]=='>' ) $File = substr($File,1);
if( $File == '/tree/master.txt' && substr_count('~AM',$_TipoUsu)==0 ) $Editar = 0;
if( substr($File,0,7+strlen("{$_SESSION['_PathCSS']}")) == "/http/{$_SESSION['_PathCSS']}/" && substr_count('~AM',$_TipoUsu)==0 ) $Editar = 0;
if( substr($File,0,15) == '/_datos/config/' && substr_count('~AM',$_TipoUsu)==0 ) $Editar = 0;
$File = eScript( $File );
if( substr($OriFile,0,15) == '/_datos/config/' && substr_count('~AM',$_TipoUsu)==0 ) $Editar = 0;
if( $OriFile == '/_tmp/__tron.'.$_User && filesize($File)>200000 ){
$fd = fopen( $File, 'r' );
fseek( $fd, 100000 );
$Todo = fread( $fd, 100000 );
fclose($fd);
$df = fopen( $File, 'w' );
fputs( $df, "Inicio de fichero truncado...\n".$Todo );
fclose( $df );
}
if( $_SESSION["_gsACCESO"]['LOGEAR'] > 0 ) gsLogear( 'ED','L', $File );
if( $OriFile[0] == '$' && $_SESSION["_gsACCESO"]['TIPO'] != '~' ){
$Editar = 0;
}
}
$Debug = 0;
if( $Debug ) echo '<br>0|'.$_SERVER['QUERY_STRING'].'|';
if( $Debug ) echo '<br>1|'.urldecode($_SERVER['QUERY_STRING']).'|';
if( $Debug ) echo '<br>D['.$_Directorio.']';
if( $Debug ) echo '<br>F['.$File.']';
if( $Arbol == 1 ){
if( $Debug ) echo '<br>2|'.$File.'|';
$Ext = '.';
if( substr_count( $File, '#' ) > 0 ) $Ext = '.edf';
if( substr_count( $File, '@' ) > 0 ) $Ext = '.gdf';
if( substr_count( $File, '=' ) > 0 ) $Ext = '.edf';
if( $Ext == '.' ) $Ext = substr( $File, strrpos( $File,'.' )+1 );
if( substr_count( $File, ':' ) > 0 ) $File = substr( $File, strpos( $File, ':' )+1 );
if( substr_count( $File, '&' ) > 0 ) $File = substr( $File, 0, strpos( $File, '&' ) );
if( substr_count( $File, '?' ) > 0 ) $File = substr( $File, 0, strpos( $File, '?' ) );
$File = trim($File);
if( $Debug ) echo '<br>3|'.$File.'|';
if( substr_count( $File, '.' ) == 0 ) $File .= $Ext;
if( $Debug ) echo '<br>4|'.$File.'|'.substr_count( $File, '>' );
if( $Debug ) echo '<br>5|'.$File.'|';
}else{
if( $Debug ) echo '<br>a|'.$File.'|';
if( substr_count( $File, '?' ) > 0 ) $File = substr( $File, 0, strpos( $File, '?' ) );
if( $Debug ) echo '<br>b|'.$File.'|';
if( substr_count( $File, '&' ) > 0 ) $File = substr( $File, 0, strpos( $File, '&' ) );
if( $Debug ) echo '<br>c|'.$File.'|';
$File = trim($File);
if( $Debug ) echo '<br>d|'.$File.'|';
if( $Debug ) echo '<br>e|'.$File.'|';
}
$Comprimido = ( substr_count( $File, '../_doc_/edf/' ) == 1 );
$Titulo = $File.' [' .urldecode( $_SERVER['QUERY_STRING'] ).']';
if( $Debug ) echo '<br>>|'.$File.'|';
clearstatcache();
if( !$_Restaurar ){
if( $_SESSION["_gsACCESO"]['FTP'] >= 1 ){
if( isset($FTP) ){
if( $FTP=='L' ) FTPCopy( $File, 'L' );
}
}
if( $OriFile == '/_tmp/__tron.'.$_User && filesize($File) > 1024000 ){
$fd = 'ERROR: Fichero TRON mayor de '.filesize($File).' byts';
$Todo = "\n  ".str_repeat( '-', strlen($fd))."\n  {$fd}\n  ".str_repeat( '-', strlen($fd));
}else{
if( substr($OriFile,0,10)=='PROCEDURE-' ){
include_once( $Dir_.$_Sql.'.inc' );
$Todo = LeerInformixProcedure(substr($OriFile,10));
}else if( substr($OriFile,0,8)=='TRIGGER-' ){
include_once( $Dir_.$_Sql.'.inc' );
$Todo = LeerInformixTrigger(substr($OriFile,8));
}else{
$fd = fopen( $File, 'r' );
$Todo = fread( $fd, filesize($File) );
fclose($fd);
}
}
if( substr($Todo,0,4)=='Zend' ){
die('<SCRIPT type="text/javascript">alert("Fichero encriptado");top.IE.Quit();</SCRIPT>');
}
}else{
$zp = gzopen( $File, 'r' );
$Todo = gzread( $zp, 1000000 );
gzclose($zp);
$File = str_replace('../_bak_','',substr($File,0,strrpos($File,'.')));
$OriFile = $File;
}
$_CDI = date('Y-m-d H:i:s',filemtime($File));
if( ( substr_count( $File, '/edesweb/t/__' ) > 0 && substr_count( $File, '.arb' ) > 0 ) || substr_count( $File, '/tree/__' ) > 0 ){
$Todo = gzuncompress( $Todo );
$Todo = substr( $Todo, strpos($Todo,"\n") + 1 );
}
if( substr_count( $File.'#', '../_datos/config/sql.ini#' ) > 0 ){
if( substr($Todo,0,2) != '<'.'?' ) $Comprimido = true;
}
if( $Debug ) exit;
if( $Comprimido ) $Todo = gzuncompress( $Todo );
if( isset($FCH) && isset($TABLA) ){
include_once($Dir_.$_Sql.'.inc');
list($_SqlPDOType) = explode(':', $_SqlPDOConnect);
include("{$Dir_}t/credf.inc");
if( eSqlType('mysql') ){
$Todo = CreaFCHMySql( $TABLA );
}else if( eSqlType('mysqli') ){
$Todo = CreaFCHMySqli( $TABLA );
}else if( eSqlType('pdo.informix') ){
$Todo = CreaFCHInformix( $TABLA );
}else if( eSqlType('informix') ){
$Todo = CreaFCHInformix( $TABLA );
}else if( eSqlType('oracle') ){
$Todo = CreaFCHOracle( $TABLA );
}else{
exit;
}
if( $_SESSION["_gsACCESO"]['LOGEAR'] > 0 ) gsLogear( 'ED','W', $File.':'.$TABLA.' '.strlen($Todo).'/-'.strlen($Todo) );
}
if( isset($TDF) && isset($TABLA) ){
$Todo = CreaTDF( $TABLA );
if( $_SESSION["_gsACCESO"]['LOGEAR'] > 0 ) gsLogear( 'ED','W', $File.':'.$TABLA.' '.strlen($Todo).'/-'.strlen($Todo) );
}
$_LoadIni = '';
if( substr_count( strtoupper($Todo), '[LOADINI]' ) > 0 && !$_SeGrabo && substr_count( $File, '.lng' ) == 0 ){
$n = strpos( strtoupper($Todo), '[LOADINI]' );
if( substr($Todo,$n-1,1)!="'" && substr($Todo,$n-1,1)!='"' ){
$tmp = explode( chr(10), substr($Todo,$n,200) );
$tmp[0] = str_replace(' ','',$tmp[0]);
$tmp[0] = str_replace(chr(9),'',$tmp[0]);
$tmp = explode( ']', $tmp[0] );
$tmp = explode( ',', $tmp[1] );
for( $i=0; $i<count($tmp); $i++ ){
$_LoadIni .= 'top.LoadFile("'.trim($tmp[$i]).'");';
}
}
}
$Todo = str_replace( '&nbsp;','&nbsp;', $Todo );
$Todo = str_replace( '&#46;','&#46;', $Todo );
$Todo = str_replace( '&#44;','&#44;', $Todo );
$Todo = str_replace( '&#35;','&#35;', $Todo );
$Todo = str_replace( '&#13;','&#13;', $Todo );
$Todo = str_replace( '&#10;','&#10;', $Todo );
$Todo = str_replace( ' ','##32;', $Todo );
$Todo = urlencode( $Todo );
unset( $Dim );
ob_start();
ob_implicit_flush(0);
eHTML('$t/31.gs');
echo '<SCRIPT type="text/javascript">document.oncontextmenu = top.document.oncontextmenu;</SCRIPT>';
?>
<SCRIPT type="text/javascript">
function HayError( Descripcion, NomFile, NumLinea ){
var Desde = '';
try{
if( window.opener != null ){
if( window.opener.name == 'TLF' ){
if( window.opener.parent.frames.Pag != null ) Desde = window.opener.parent.frames.Pag._DESDE_;
}else Desde = window.opener._DESDE_;
}
}catch(e){}
var txt = 'FILE:\t\t'+NomFile.substr(NomFile.indexOf(window.location.pathname+'')+1)+'\n'+
'NAME:\t\t'+window.name+'\n'+
'FROM:\t\t'+Desde+'\n'+
'Nº LINE:\t\t'+NumLinea+'\nDESCRIPTION:\t'+Descripcion+'\nTRACE:';
var tmp,para,i,f,arg,nom='HayError';
try{
while( (f = eval(nom).caller+'') != 'null' ){
tmp = f.split('(');
tmp = tmp[0].split(' ');
nom = tmp[1];
tmp = f.split(')');
para = tmp[0].replace('function ','')+')';
txt += '\t\t'+para + '\n';
if( para != 'anonymous()' ){
arg = eval(nom).arguments;
for(i=0; i<arg.length; i++){
if( arg[i]=='[object]' ){
txt += '\t\t\t'+ i + ' = ' + arg[i] + '\n';
txt += '\t\t\t'+ i + ' = ' + arg[i].name + '\n';
txt += '\t\t\t'+ i + ' = ' + arg[i].value + '\n';
}else{
txt += '\t\t\t'+ i + ' = ' + arg[i] + '\n';
}
}
}else break;
}
}catch( e ){ }
if( window.ERROR == undefined ) document.body.insertAdjacentHTML("beforeEnd","<IFRAME name='ERROR' src='' width='100' height='100' FRAMEBORDER=0 SCROLLING='no' STYLE='display:none; position:absolute; left:0; top:0; z-index:-10;'></IFRAME>" );
ERROR.location.href = 'edes.php?E:$error.gs&ERROR='+escape(txt);
alert( 'ERROR:\t'+Descripcion+'\nNº LINE: '+NumLinea );
_ErrForm = -10;
return true;
}
window.onerror = HayError;
<?PHP
if( $FORMATEAR==1 ){
}
?>
</SCRIPT>
<?PHP
if( $_Development || $_SESSION['_D_']!='' ) echo "<SCRIPT type='text/javascript' SRC='".gsJS('desgrana')."'></SCRIPT>";
echo '</HEAD><BODY scroll=no style="border:0;margin:0;" onload="UnZip();';
if( $SeHaGrabado ) echo 'top.eLoading(false,window);';
echo '" onhelp="top.gsAyuda(window);return false;">';
echo '<FORM NAME="FRM1" METHOD="POST" ACTION="edes.php?E:$t/31.gs">';
$ClaseReadOnly = ( $Editar == 0 ) ? "class='NoEdit' " : "";
if( $Editar == 2 ){
echo "<TEXTAREA NAME='Doc' {$ClaseReadOnly}COLS=95 ROWS=35 style='width:100%;height:100%' WRAP=VIRTUAL>{$Todo}</TEXTAREA>";
}else{
if( substr_count( $File, '.doc' ) == 0 ){
$READONLY = ( $Editar == 0 ) ? ' READONLY' : '';
echo "<TEXTAREA NAME='Doc' COLS=95 ROWS=35 style='width:{$ANCHO};height:{$ALTO};' WRAP=off{$READONLY}>{$Todo}</TEXTAREA>";
}else{
echo "<TEXTAREA NAME='Doc' {$ClaseReadOnly}COLS=95 ROWS=35 style='width:100%;height:100%' WRAP=on>{$Todo}</TEXTAREA>";
}
}
echo '<OBJECT id=DocX classid="CLSID:BCA00001-18B1-43E0-BB89-FECDDBF0472E" MODIFICADO=0 style="position:absolute;left:0;top:0;width:100%;height:100%" '.$ClaseReadOnly.'></OBJECT>';
echo "<INPUT TYPE='HIDDEN' VALUE='{$OriFile}' NAME='Fichero'>";
echo "<INPUT TYPE='HIDDEN' VALUE='' NAME='usuario'>";
echo "<INPUT TYPE='HIDDEN' VALUE='' NAME='NumBak'>";
echo "<INPUT TYPE='HIDDEN' VALUE='".$_CDI."' NAME='CDI'>";
echo '</FORM>';
?>
<script type="text/javascript">
function TextoABuscar(){
var eTxt = document.all.DocX.SelText;
if( eTxt == '' ) return;
eTxt = eTxt.replace(/\s+/g,'').replace(/\s+$/g,'').toUpperCase();
if( eTxt.length==0 ) return;
if( eTxt.substring(0,2) == '//' ) eTxt = eTxt.substring(2).replace(/\s+/g,'').replace(/\s+$/g,'');
if( eTxt == '[LOADSEL]' || eTxt == '[DBGATEWAY]' || eTxt == '[DBGATEWAYONE]' || eTxt == '[FORMACTION]' || eTxt == '[LOADPROCEDURE]' || eTxt == '[LOADTRIGGER]' || eTxt == '[JUMP]' || eTxt == '[ONCHANGE]' ){
var o=document.all.DocX;
var y=o.GetSel(false).EndLineNo + o.LineNumberStart - 1;
var sTxt = o.GetLine(y).replace(/\s+/g,'').replace(/\s+$/g,'');
if( sTxt.substring(0,2) == '//' ) sTxt = sTxt.substring(2).replace(/\s+/g,'').replace(/\s+$/g,'');
if( sTxt.indexOf('//')>-1 ) sTxt = sTxt.substring(0,sTxt.indexOf('//')).replace(/\s+$/g,'');
var tmp = sTxt.split(']'); sTxt = tmp[1];
if( eTxt == '[LOADSEL]' ){
var tmp = sTxt.split(',');
var Dim = new Array(), i=0;
for( var n=0; n<tmp.length; n++ ){
eTxt = tmp[n].replace(/\s+/g,'').replace(/\t+/g,'');
if( eTxt!='' ) if( confirm('Confirmar cargar el fuente "'+eTxt) ) Dim[i++] = eTxt;
}
for( var n=0; n<Dim.length; n++ ) setTimeout( 'top.LoadFile("'+Dim[n]+'")', 250*(n+1) );
}else if( eTxt == '[FORMACTION]' ){
var tmp = sTxt.split('|');
tmp = tmp[1].split(':');
tmp = tmp[1].split('&');
if( tmp[0].replace(/\s+/g,'')=='' ) return;
top.LoadFile(tmp[0].replace(/\s+/g,''));
}else if( eTxt == '[JUMP]' ){
var tmp = sTxt.split(']');
top.LoadFile(tmp[tmp.length-1].replace(/\s+/g,''));
}else if( eTxt == '[ONCHANGE]' ){
if( sTxt.indexOf('.sdf') > 0 ){
var tmp = sTxt.split('.sdf');
tmp = tmp[0].split('|');
tmp = tmp[tmp.length-1].replace(/\s+/g,'').replace(/\t+/g,'')+'.sdf';
if( tmp.substring(0,1)=='"' || tmp.substring(0,1)=="'" ) tmp = tmp.substr(1);
top.LoadFile(tmp);
}
}else if( eTxt == '[LOADPROCEDURE]' ){
var tmp = sTxt.split(',');
for( var n=0; n<tmp.length; n++ ){
eTxt = tmp[n].replace(/\s+/g,'').replace(/\t+/g,'');
if( confirm('Confirmar cargar el procedure "'+eTxt)) top.LoadFile( 'PROCEDURE-'+eTxt );
}
}else if( eTxt == '[LOADTRIGGER]' ){
var tmp = sTxt.split(',');
for( var n=0; n<tmp.length; n++ ){
eTxt = tmp[n].replace(/\s+/g,'').replace(/\t+/g,'');
if( confirm('Confirmar cargar el trigger "'+eTxt)) top.LoadFile( 'TRIGGER-'+eTxt );
}
}else{
var tmp = sTxt.split('|');
var tmp = tmp[1].split('?');
var tmp = tmp[0].split('&');
top.LoadFile(tmp[0].replace(/\s+/g,''));
}
}
}
function AnulaKey( Obj ){
var Mas = '', Ok = 0;
if( Obj.altKey ) Mas = 'a';
if( Obj.ctrlKey ) Mas = 'c';
if( Obj.shiftLeft ) Mas = 's';
if( Mas=='c' && Obj.keyCode==9 ){
top.NextSolapa(1);
event.keyCode = 0;
event.cancelBubble = true;
event.returnValue = false;
return false;
}
if( Mas=='s' && Obj.ctrlKey && Obj.keyCode==9 ){
top.NextSolapa(-1);
event.keyCode = 0;
event.cancelBubble = true;
event.returnValue = false;
return false;
}
if( ',1.14,122,a39,a37,a8,c72,c79,c_76,c73,c81,c_85,s121,'.indexOf(','+Mas+Obj.keyCode+',') != -1 ){
Ok = 1;
}else if( ',93,a36,'.indexOf(','+Mas+Obj.keyCode+',') != -1 ){
Ok = 2;
}
if( Ok > 0 ){
Obj.keyCode = 0;
Obj.cancelBubble = true;
Obj.returnValue = false;
if( Ok==2 ) alert('Acción no permitida');
return true;
}
return false;
}
var _TeclasControl = '.85.39.37.38.40.34.33.35.36.45.20.16.17.18.27.91.92.93.144.145.';
var _Modificado = false;
var _BookMark = 0;
var _yxSalto = new Array(), _xySaltoUlt = 0;
function PonTab(){
if( AnulaKey( event ) ) return false;
try{
var c=event.ctrlKey,
s=event.shiftKey,
k=event.keyCode;
switch(k){
case 112:
case 113:
case 114:
case 115:
case 116:
case 117:
if(!c) break;
top.HelpEDes(k-112);
return S.eventClear(window);
case 45:
case 67:
if(!c) break;
break;
case 70:
if(!c) break;
break;
case 86:
if(!c) break;
top.EditorCmd(140);
event.keyCode = 0;
event.cancelBubble = true;
event.returnValue = false;
return false;
case 114:
top.EditorCmd( (!s) ? 176:174 );
event.keyCode = 0;
event.cancelBubble = true;
event.returnValue = false;
break;
case 82:
if(!c) break;
top.EditorCmd(169);
break;
case 119:
if( c ){
var o = document.all.DocX;
_yxSalto[_xySaltoUlt++] = Array( o.GetSel(false).EndLineNo+o.LineNumberStart-1, o.GetSel(false).StartColNo );
var txt = document.all.DocX.CurrentWord;
if( txt!='' ){
top.EditorCmd(179, 'function '+document.all.DocX.CurrentWord);
top.EditorCmd(176);
top.EditorCmd(229);
}
break;
}else if( event.altKey ){
_xySaltoUlt--;
top.EditorCmd(168,_yxSalto[_xySaltoUlt][0]);
for( var n=0; n<_yxSalto[_xySaltoUlt][1]; n++ ) top.EditorCmd(201);
break;
}
top.EditorCmd( (!s) ? 206:205 );
break;
case 120:
var o = document.all.DocX;
var y = o.GetSel(false).EndLineNo+o.LineNumberStart;
if( o.GetBookmark(y) ){
_BookMark--;
}else{
_BookMark++;
}
top.EditorCmd(204);
o.DisplayLeftMargin = (_BookMark>0);
break;
case 121:
top.gsGrabar(0,c);
event.returnValue = false;
return false;
break;
case 76:
if(!c) break;
top.EditorCmd(147);
return AnulaKey(event);
case 85:
if(!c) break;
top.EditorCmd(125);
return AnulaKey(event);
}
}catch(e){}
}
var _CopiaOnOff = false
var _CopiaText = ""
var _CopiaTmp = ""
function InitCopiaSCR(){ _CopiaOnOff = true; }
function CopiaSCR(){
if( _CopiaOnOff && event.altLeft ){
_CopiaTmp = _CopiaText;
document.execCommand('Copy');
_CopiaText = window.clipboardData.getData('Text');
_CopiaText = _CopiaText.replace(' ','');
if( _CopiaTmp != _CopiaText && _CopiaText != '' ){
_CopiaText = _CopiaText.toLowerCase();
if( _CopiaText.indexOf('/') != -1 || _CopiaText.indexOf('.') != -1){
top.LoadFile( _CopiaText );
}else{
var Dir = '<?= str_replace( '../','/',substr($File,0,strrpos($File,'/')+1) ); ?>';
if( confirm("¿ ABRIR FICHERO '.FDF' ?") ) top.LoadFile(Dir+_CopiaText+'.fdf');
if( confirm("¿ ABRIR FICHERO '.LDF' ?") ) top.LoadFile(Dir+_CopiaText+'.ldf');
if( confirm("¿ ABRIR FICHERO '.SEL' ?") ) top.LoadFile(Dir+_CopiaText+'.sel');
if( confirm("¿ ABRIR FICHERO '.PHP' ?") ) top.LoadFile(Dir+_CopiaText+'.php');
}
}
_CopiaOnOff = false;
}
}
document.onmouseup = CopiaSCR;
document.onselectionchange = InitCopiaSCR;
function GrabarAC(){
var tmp = new Array();
document.FRM1.Doc.value = document.all.DocX.Text;
tmp = FRM1.Fichero.value.split('/');
tmp = tmp[tmp.length-1].split('.');
document.execCommand('SaveAs',null,tmp[0]+'.txt');
}
function UnZip(){
<?PHP
if( substr_count( $File, '../_doc_/edf/' ) > 0 ){
if( strlen(trim($Todo))==0 ){
echo 'top.document.all("ConNota").src = top.document.all("ConNota").src.replace("_1","_0");';
}else{
echo 'top.document.all("ConNota").src = top.document.all("ConNota").src.replace("_0","_1");';
}
}
echo 'var txt = unescape( document.FRM1.Doc.value );';
echo "txt = txt.replace(/&nbsp;/g,'&nbsp;');";
echo "txt = txt.replace(/&#46;/g, '&#46;');";
echo "txt = txt.replace(/&#44;/g, '&#44;');";
echo "txt = txt.replace(/&#35;/g, '&#35;');";
echo "txt = txt.replace(/##32;/g, ' ');";
echo "txt = txt.replace(/&#13;/g, '&#13;');";
echo "txt = txt.replace(/&#10;/g, '&#10;');";
$tmp = explode('.',strtoupper($OriFile));
$l = '';
switch( $tmp[count($tmp)-1] ){
case 'HTM': case 'HTML':
$l='HTML';
break;
case 'PHP': case 'PHP4': case 'GS': case 'SEL': case 'INI': case 'JS': case 'CSS':
$l='PHP';
break;
case 'EDF': case 'GDF': case 'LDF': case 'FDF': case 'LST': case 'IDF':
$l='EDES';
break;
}
echo 'var tDoc="'.strtolower($l).'";';
if( $l != '' ){ ?>
var fso = new ActiveXObject("Scripting.FileSystemObject");
if( tDoc == 'edes' || tDoc == 'html' ){
var f = 'c:/edes/t/lng/'+tDoc+'.mbr';
var ts = fso.OpenTextFile(f,1);
var s = ts.ReadAll();
ts.Close();
var ml = new ActiveXObject('CodeMax.Members.4');
ml.Xml = s;
s = null;
try{
ml.Register();
}catch(e){}
}
var l = '<?= $l; ?>';
var f= 'c:/edes/t/lng/'+tDoc+'.lng';
var ts = fso.OpenTextFile(f,1);
var s = ts.ReadAll();
ts.Close();
var o = new ActiveXObject('CodeMax.Language.4');
o.Name = l;
o.Xml = s;
try{
o.Register();
if( tDoc == 'edes' || tDoc == 'html' ){
o.MemberList = ml;
ml = null;
}
}catch(e){}
DocX = document.all.DocX;
DocX.Language = o;
<?PHP  }else{ ?>
DocX = document.all.DocX;
<?PHP  } ?>
DocX.Text = txt;
DocX.LineNumberStart = 1;
DocX.DisplayLeftMargin = false;
DocX.HSplitter = true;
DocX.VSplitter = true;
DocX.Font.Size = <?= $_FontSize; ?>;;
DocX.SetColor(0,15987699);
DocX.Font.Name = 'Courier new';
DocX.TabSize = 3;
DocX.onkeydown = PonTab;
<?PHP
if( $Editar==0 ){
echo 'DocX.ReadOnly = true;';
echo 'DocX.SetColor(0,15988735);';
}
echo "document.FRM1.usuario.value = {$_User};";
if( isset($FCH) && isset($TABLA) ) echo 'top.cIcono( top.document.images["Grabar"], 0, 1 );';
if( $nFrame == 0 && $nFrame!='' ) echo 'top.VerFuente(1);';
if( $MasInfo!='' ) echo $MasInfo;
?>
top.LineasDeColor( DocX );
<?PHP
if( $_LoadIni!='' ) echo $_LoadIni;
if( !$EsPhp && $FORMATEAR==1 ) echo 'top.RestoreLinea()';
?>
}
</SCRIPT>
<script for='DocX' event='MouseUp(Button,Modifiers,X,Y)'>
TextoABuscar();
</script>
<script for='DocX' event='ModifiedChange()'>
document.all.DocX.MODIFICADO=1;
top.SeModifico( FRM1.Fichero.value );
</script>
<script for='DocX' event='ContextMenu(x,y)'>
document.all.DocX.CancelEvent();
top.MenuON( 'opHelpOnLine', top.MENUS.document.all.opHelpOnLine, x, y );
</script>
<script for='DocX' event='Change()'>
var o = document.all.DocX;
var y = GetSel(false).EndLineNo+o.LineNumberStart-1;
var txt = o.GetLine(y);
if( txt.indexOf(']')!=-1 ){
var tmp = txt.split(']');
switch( tmp[0].toUpperCase()+']' ){
case '[FIELDS]':
case '[FORMCHECK]':
case '[GROUPLABELS]':
case '[SUBLIST]':
case '[DBEND]':
case '[DBINI]':
case '[DBINSERT]':
case '[DBREAD]':
case '[DBSELREC]':
case '[DBSQL]':
case '[J]':
case '[JSCHECK]':
case '[JSEND]':
case '[JSHEAD]':
case '[JSINI]':
case '[JSONCLICKROW]':
case '[JSSELROW]':
case '[P]':
case '[PHPSTART]':
case '[PHPEND]':
case '[PHPFORM]':
case '[PHPHEAD]':
case '[PHPINI]':
case '[H]':
case '[HTMEND]':
case '[HTMHEAD]':
case '[HTMINI]':
o.SetLineColor(y,16183009);
break;
case '[NOTE]':
o.SetLineColor(y,12057529);
break;
default:
o.SetLineColor(y,-1);
}
}else{
try{
o.SetLineColor(y,-1);
}catch(e){}
}
try{
var n = window.frameElement.id.replace('DivIframe','');
if( !top.document.frames[n]._Modificado ){
top.document.frames[n]._Modificado = true;
var Obj = top.document.images['Grabar']	 ; Obj.src = Obj.src.replace('_0','_1');
var Obj = top.document.images['GrabarTodo']; Obj.src = Obj.src.replace('_0','_1');
}
}catch(e){}
</script>
</BODY></HTML>
<?PHP
EnviaGZip(1,0);
exit;
function LeePrivado( $FilePrivado, &$Leer ){
if( substr($FilePrivado,0,11) == $GLOBALS['Dir_'] ) return;
if( $Leer[$FilePrivado] != '' ) return;
$DimEti = array( '[NOTE]', '[TAB]', '[LOADINI]', '[LOADSEL]', '[DBGATEWAY]', '[DBGATEWAYONE]', '[FORMACTION]', '[OTHERDF]' );
$Leer[$FilePrivado] = $FilePrivado;
$Dim = file($FilePrivado);
for( $n=0; $n<count($Dim); $n++ ){
if( substr_count( $Dim[$n], ']' ) > 0 ){
$txt = strtoupper($Dim[$n]);
list( $txt, $buffer ) = explode( ']', $txt );
$txt = trim($txt).']';
if( in_array( $txt, $DimEti ) ){
list( ,$buffer ) = explode( ']', $Dim[$n] );
switch( $txt ){
case '[NOTE]':
$n = count($Dim);
break;
case '[TAB]':
$tmp = explode('|',$buffer);
$NomFile = trim($tmp[2]);
if( $NomFile[0]=='-' ) $NomFile = substr($NomFile,1);
if( substr_count( $NomFile, '.' ) == 0 ){
if( $NomFile[0]=='>' ){
$NomFile .= '.php';
$NomFile = substr($NomFile,1);
}else{
$NomFile .= '.edf';
}
}
if( $NomFile[0]=='>' ) $NomFile = substr($NomFile,1);
LeePrivado( '../d/'.$NomFile, $Leer );
break;
case '[LOADINI]':
case '[LOADSEL]':
$tmp = explode(',',$buffer);
for( $i=0; $i<count($tmp); $i++ ) LeePrivado( '../d/'.trim($tmp[$i]), $Leer );
break;
case '[DBGATEWAY]':
case '[DBGATEWAYONE]':
$tmp = explode('|',$buffer);
$NomFile = trim($tmp[1]);
LeePrivado( '../d/'.$NomFile, $Leer );
break;
case '[OTHERDF]':
case '[FORMACTION]':
$tmp = explode('|',$buffer);
$sNomFile = $NomFile = trim($tmp[1]);
if( substr_count( $NomFile, 'edes.php?' ) == 1 ){
$NomFile = str_replace( 'edes.php?','',$NomFile );
$tmp = explode(':',$NomFile);
$NomFile = trim($tmp[1]);
if( substr_count( $NomFile, '&' ) > 0 ){
$tmp = explode('&',$NomFile);
$NomFile = trim($tmp[0]);
}
}
if( $NomFile=='' ) break;
if( substr_count( $NomFile, '.' ) == 0 ){
if( substr($sNomFile,0,9)=='edes.php?G' ){
$NomFile .= '.gdf';
}else if( substr($sNomFile,0,9)=='edes.php?F' || substr($sNomFile,0,9)=='edes.php?L' ){
$NomFile .= '.edf';
}else{
$NomFile .= '.php';
}
}
LeePrivado( '../d/'.$NomFile, $Leer );
break;
}
}
}
}
}
function ModPrivado( $FilePrivado, $Ori, $Des ){
global $_T;
$DimEti = array( '[NOTE]', '[TAB]', '[LOADINI]', '[LOADSEL]', '[DBGATEWAY]', '[DBGATEWAYONE]', '[FORMACTION]' );
$NewTxt = '';
$Dim = file($FilePrivado);
for( $n=0; $n<count($Dim); $n++ ){
if( substr_count( $Dim[$n], ']' ) > 0 ){
$txt = strtoupper($Dim[$n]);
list( $txt, $buffer ) = explode( ']', $txt );
$txt = trim($txt).']';
if( in_array( $txt, $DimEti ) ){
$NomFile = '';
list( ,$buffer ) = explode( ']', $Dim[$n] );
switch( $txt ){
case '[NOTE]':
$n = count($Dim);
break;
case '[TAB]':
$tmp = explode('|',$buffer);
$NomFile = trim($tmp[2]);
if( $NomFile != '' ){
if( $NomFile[0]=='-' ) $NomFile = substr($NomFile,1);
$Dim[$n] = ModNomFile( $NomFile, $Ori, $Des, $Dim[$n] );
}
break;
case '[LOADINI]':
case '[LOADSEL]':
$tmp = explode(',',$buffer);
for( $i=0; $i<count($tmp); $i++ ){
$NomFile = trim($tmp[$i]);
$Dim[$n] = ModNomFile( $NomFile, $Ori, $Des, $Dim[$n] );
}
break;
case '[DBGATEWAY]':
case '[DBGATEWAYONE]':
$tmp = explode('|',$buffer);
$NomFile = trim($tmp[1]);
$Dim[$n] = ModNomFile( $NomFile, $Ori, $Des, $Dim[$n] );
break;
case '[FORMACTION]':
$tmp = explode('|',$buffer);
$NomFile = trim($tmp[1]);
if( substr_count( $NomFile, 'edes.php?' ) == 1 ){
$NomFile = str_replace( 'edes.php?','',$NomFile );
$tmp = explode(':',$NomFile);
$NomFile = trim($tmp[1]);
if( substr_count( $NomFile, '&' ) > 0 ){
$tmp = explode('&',$NomFile);
$NomFile = trim($tmp[0]);
}
}
$Dim[$n] = ModNomFile( $NomFile, $Ori, $Des, $Dim[$n] );
}
}
}
$NewTxt .= $Dim[$n];
}
$NewTxt = chop( $NewTxt );
$df = fopen( $FilePrivado, 'w' );	if( !$df ) die( "No se ha podido grabar en ({$FilePrivado})" );
fputs( $df, $NewTxt );
fclose( $df );
}
function ModNomFile( $NomFile, $Ori, $Des, $Dim ){
if( $Ori == '' ){
if( substr_count( $NomFile, '.' ) == 0 ){
$txt = str_replace( $NomFile, $NomFile.$Des, $Dim );
}else{
list( $NomFile ) = explode('.',$NomFile);
$txt = str_replace( $NomFile.'.', $NomFile.$Des.'.', $Dim );
}
}else{
if( substr_count( $NomFile, '.' ) == 0 ){
$txt = str_replace( $Ori, '', $Dim );
}else{
$txt = str_replace( $Ori.'.', '.', $Dim );
}
}
return $txt;
}
function NomDFPrivado( $FilePrivado ){
global $_User;
return substr( $FilePrivado,0,strrpos( $FilePrivado,'.'))."_u{$_User}".substr( $FilePrivado,strrpos( $FilePrivado,'.'));
}
function DFPrivado( $DFPrivado, $FilePrivado ){
global $_T;
global $_User;
$FilePrivado = eScript( $FilePrivado );
if( $DFPrivado=='b' ){
$dorg = '../_bak_/_bp';
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != '.') && ($file != '..') ){
if( !is_dir($dorg.'/'.$file) && substr($file,strrpos($file,'.')+1) == $_User ){
unlink( $dorg.'/'.$file );
}
}
}
die( '<SCRIPT type="text/javascript">alert("'.$_T[72].'");</SCRIPT>' );
}
if( $DFPrivado=='r' ){
if( !file_exists( "../_bak_/_bp/_bp_.{$_User}" ) ) die( '<SCRIPT type="text/javascript">alert("'.$_T[73].'");</SCRIPT>' );
$Dim = file( "../_bak_/_bp/_bp_.{$_User}" );
if( trim($Dim[0]) != trim($FilePrivado) ) die( '<SCRIPT type="text/javascript">alert("'.$_T[74].'");</SCRIPT>' );
for( $i=0; $i<count($Dim); $i++ ){
$Dim[$i] = trim($Dim[$i]);
if( $Dim[$i] != '' ){
$tmp = explode('/',$Dim[$i]);
$NomFile = $tmp[count($tmp)-1];
copy( '../_bak_/_bp/'.$NomFile.".{$_User}", $Dim[$i] );
}
}
die( '<SCRIPT type="text/javascript">alert("'.$_T[75].'\n\n\" Pulse F5 \" para refrescar los datos");</SCRIPT>' );
}
$Leer = array();
$Grabar = array();
$FilePrivado =  trim($FilePrivado);
LeePrivado( $FilePrivado, $Leer );
reset( $Leer );
if( $DFPrivado=='m' ){
$Rastro = '';
foreach( $Leer as $valor ){
$tmp = explode('/',$valor);
copy( $valor, '../_bak_/_bp/'.$tmp[count($tmp)-1].".{$_User}" );
$Rastro .= $valor."\n";
}
$df = fopen( "../_bak_/_bp/_bp_.{$_User}", 'w' ); fwrite( $df, $Rastro ); fclose( $df );
die( '<SCRIPT type="text/javascript">alert("'.$_T[76].'");</SCRIPT>' );
}
$FilePrivado = NomDFPrivado( $FilePrivado );
foreach( $Leer as $valor ){
if( substr_count( $valor, "_u{$_User}." ) > 0 ){
$Grabar[] = array( str_replace( "_u{$_User}.", '.', $valor ), $valor );
}else{
$Grabar[] = array( $valor, NomDFPrivado( $valor ) );
}
}
if( $DFPrivado=='C' ){
$txt = $_T[77].':';
for( $i=0; $i<count($Grabar); $i++ ){
$txt .= '\n'.$Grabar[$i][0].' -> '.$Grabar[$i][1];
copy( $Grabar[$i][0], $Grabar[$i][1] );
ModPrivado( $Grabar[$i][1], '' ,"_u{$_User}" );
}
}else if( $DFPrivado=='B' ){
$txt = $_T[78].':';
for( $i=0; $i<count($Grabar); $i++ ){
$txt .= '\n'.$Grabar[$i][1];
unlink( $Grabar[$i][1] );
unlink( $Grabar[$i][1].'.bak' );
}
}else if( $DFPrivado=='O' ){
$txt = $_T[79].':';
for( $i=0; $i<count($Grabar); $i++ ){
$txt .= '\n'.$Grabar[$i][1].' -> '.$Grabar[$i][0];
unlink( $Grabar[$i][0] );
unlink( $Grabar[$i][0].'.bak' );
rename( $Grabar[$i][1], $Grabar[$i][0] );
rename( $Grabar[$i][1].'.bak', $Grabar[$i][0].'.bak' );
ModPrivado( $Grabar[$i][0], "_u{$_User}", '' );
}
}
die( "<SCRIPT type='text/javascript'>alert('{$txt}');</SCRIPT>" );
}
function FTPCopy( $Fichero, $Modo ){
global $_T;
if( substr_count( $Dim[$n], '$' ) > 0 || substr_count( $Fichero, '/edesweb/' ) > 0 ) die('<script type="text/javascript">alert("'.$_T[80].'");</SCRIPT>');
$_Fichero = '../_d_/cfg/ftp.ini';
if( !file_exists( $_Fichero ) ) return;
$FTPServidor= '';
$FTPUsuario	= '';
$FTPPassord	= '';
$FileLocal	= $Fichero;
$FileServidor	= '';
$df = fopen( $_Fichero, 'r' );
if( !$df ) die('Error');
$cTxt = fread( $df, filesize($_Fichero) );
fclose( $df );
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+1,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+2+$n,1));
$Basura += $LongDeLong + 2;
$txt = substr( $cTxt, $Basura, $LenCadena );
$txt = gzuncompress($txt);
$Dim = explode( "\n", $txt );
for( $n=0; $n<count($Dim); $n++ ){
$tmp = explode("\t",$Dim[$n]);
if( $_SERVER['HTTP_HOST'] == trim($tmp[1]) ){
$FTPServidor = trim($tmp[3]);
$FTPUsuario	 = trim($tmp[4]);
$FTPPassord	 = trim($tmp[5]);
$FTPDir		 = trim($tmp[6]);
}
}
if( $FTPServidor == '' ) return;
if( substr_count( $Fichero, '../' ) > 0 ){
$tmp = explode('../',$Fichero);
$FileServidor = $FTPDir.'/'.$tmp[count($tmp)-1];
}else{
$FileServidor = $FTPDir.'/d/'.$Fichero;
}
$FileServidor = str_replace( '//','/',$FileServidor);
$IdConnect = ftp_connect($FTPServidor);
if( !$IdConnect ){
die('<SCRIPT type="text/javascript">alert("'.$_T[81].'");</SCRIPT>');
}
$LoginOK = ftp_login( $IdConnect, $FTPUsuario, $FTPPassord );
if( !$LoginOK ){
die('<SCRIPT type="text/javascript">alert("'.$_T[82].'");</SCRIPT>');
}else{
}
if( $Modo == 'G' ){
$TxtChmod = '';
$carga = ftp_put( $IdConnect, $FileServidor, $FileLocal, FTP_BINARY );
if( !$carga ){
die('<SCRIPT type="text/javascript">alert("'.$_T[83].'");</SCRIPT>');
}else{
ftp_site( $IdConnect, 'chmod 0777 '.$FileServidor );
}
ftp_quit( $IdConnect );
global $_User, $_PathVersion;
$_PathVersion = str_replace('\\','/',trim($_PathVersion));
if( substr($_PathVersion,-1)!='/' ) $_PathVersion .= '/';
$FileVersion = str_replace('../','../'.$_PathVersion,$FileLocal);
CrearDirectorios( $FileVersion );
copy( $FileLocal, $FileVersion.'.'.date('ymdHi').'.u'.$_User );
$sCDI = date('Y-m-d H:i:s',filemtime($FileLocal));
echo '<SCRIPT type="text/javascript">';
echo "top.PutCDI('{$sCDI}','{$FileLocal}');";
echo 'alert("'.$_T[69].': '.$FileServidor.$TxtChmod.'");';
echo '</SCRIPT>';
exit;
}else{
$carga = ftp_get( $IdConnect, $FileLocal, $FileServidor, FTP_BINARY );
if( !$carga ){
die('<SCRIPT type="text/javascript">alert("'.$_T[70].'");</SCRIPT>');
}else{
}
ftp_quit( $IdConnect );
}
}
function VerTemporal( $Tmp ){
global $_User, $_T;
if( $Tmp == 'DEBUG' ){
$titulo = 'SQL';
}else{
if( $Tmp == '' ){
$titulo = $_T[71];
}else{
$titulo = $Tmp;
}
}
eHTML('','',$titulo);
?>
<STYLE>
BODY {
margin: 3px 0px 0px 3px;
color: #000099;
background: #F5F5F5;
FONT-FAMILY: Monospace;
FONT-SIZE: 12px;
}
#F {
background: #FFCC99;
color: #993300;
FONT-WEIGHT: bold;
}
#L {
color: #006600;
}
#f {
background:#000066;
color: #FFFFCC;
width: 100%;
text-align: center;
}
span {
color: #000099;
background: #F5F5F5;
}
#i {
background:#FFFFCC;
color: #006600;
}
#e {
background:#FFFFCC;
color: #CC0000;
}
</STYLE>
</HEAD>
<BODY scroll=yes onload='document.focus()' onhelp='return false' oncontextmenu='return false'><?PHP
$nTemporales = 0;
echo '<pre>';
$Tmp = strtolower($Tmp);
if( $Tmp == 'debug' ){
if( file_exists( '../_tmp/log/sql.'.$_SESSION['_User'] ) ){
$Dim = file( '../_tmp/log/sql.'.$_SESSION['_User'] );
for( $n=0; $n<count($Dim); $n++ ){
$txt = htmlentities(chop($Dim[$n]));
$txt = str_replace(' ','0',substr($txt,0,8)).substr($txt,8);
echo '<span id=L>'.sprintf('%03d',$n+1).' </span><span>'.$txt.'</span>'."\n";
$nTemporales++;
}
}else{
echo '<span>No hay temporal de SQL</span>'."\n";
echo '<SCRIPT type="text/javascript">setTimeout("window.external._Close();",3000)</SCRIPT>';
}
echo "\n".'</body></html>';
if( $nTemporales == 0 ){
}
exit;
}
$usu = $_SESSION['_User'].'_';
$dorg = '../_tmp/log/';
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( ($file != '.') && ($file != '..') ){
if( !is_dir($dorg.'/'.$file) ){
$uExt = explode('.',$file);
$uExt = $uExt[count($uExt)-1];
if( $uExt!='htm' && $usu == substr($file,0,strlen($usu)) && ( $Tmp=='' || strstr($file,$Tmp) ) && date('Y-m-d')==date('Y-m-d',filemtime($dorg.'/'.$file)) ){
$Dim = file( $dorg.$file );
$FileTmp = str_replace('../_tmp/php/','',trim($Dim[0]));
echo '<span id=F>'.str_replace($_User.'_','',$file).' ( '.$FileTmp.' - '.date( 'H:i:s', filemtime($dorg.$file)) .' )</span><br>';
for( $n=1; $n<count($Dim); $n++ ){
$txt = highlight_string('<'.'?PHP '.rtrim($Dim[$n]).' ?'.'>', true );
$txt = str_replace( "\n", '', $txt );
$txt = str_replace( '&lt;?', '', $txt );
$txt = str_replace( '?&gt;', '', $txt );
echo '<span id=L>'.sprintf('%03d',$n+1).' </span><span>'.$txt.'</span><br>';
}
echo "\n<br>";
$nTemporales++;
}
}
}
}
if( $nTemporales == 0 ){
echo '<span>No hay temporales</span>'."\n";
echo '<SCRIPT type="text/javascript">setTimeout("window.external._Close();",3000)</SCRIPT>';
}
echo '</body></html>';
if( $nTemporales == 0 ){
}
exit;
}
function CreaTDF( $TABLA ){
$txt = "[Title] ".strtoupper($TABLA)."\n\n";
$txt .= "[DBTable] {$TABLA}\n";
$stxt = '';
$Indice = array();
$BD = file( "../_doc_/tbl/{$TABLA}" );
if( count($BD)==1 ) $BD = file( "../_doc_/tbl/{$BD[0]}" );
for( $i=0; $i<count($BD); $i++ ){
$tmp = explode('|',$BD[$i]);
if( $tmp[0][0] == '[' ) break;
if( $tmp[0] == 'Field' ){
$stxt .= "{$tmp[8]}|{$tmp[1]}|{$tmp[14]}|{$tmp[15]}|{$tmp[16]}|{$tmp[17]}|{$tmp[18]}|{$tmp[19]}|{$tmp[20]}|{$tmp[21]}\n";
if( $tmp[6]=='S' ) $txt .= "[DbSerial] {$tmp[1]}\n";
}else if( $tmp[0] == 'Index' ){
if( count($Indice)==0 ){
$Indice = $tmp;
$txt .= "[DBOrder] {$Indice[3]}\n";
}else{
if( trim($Indice[1])!='' && trim($tmp[1])=='' ) $Indice = $tmp;
}
}
}
$txt .= "[DBIndex] {$Indice[3]}\n\n";
$txt .= "[Fields]".PintaCamposEDF( $stxt, "\n" );
return $txt;
}
function PintaCamposEDF( $sDim, $_SL ){
$Dim = array();
$tmp = explode("\n",$sDim);
for( $i=0; $i<count($tmp); $i++ ){
$Dim[] = explode('|',$tmp[$i]);
}
$Long = array( 0,0,0,0,0,0,0,0,0,0,0,0 );
$txt = '';
for( $i=0; $i<count($Dim); $i++ ){
for( $e=0; $e<9; $e++ ){
$Long[$e] = max( strlen($Dim[$i][$e]), $Long[$e] );
}
}
for( $i=0; $i<count($Dim); $i++ ){
if( trim($Dim[$i][1]) != '' ){
$txt .= $_SL.'   ';
for( $e=0; $e<9; $e++ ){
$txt .= str_pad( $Dim[$i][$e], $Long[$e] ). ' | ';
}
}
}
return $txt;
}
eEnd();
function ShowMensaje( $txt, $SeRecarga, $sCDI='', $File='' ){
eHTML('$t/31.gs');
$Color = '#001296';
$Sg = '1000';
if( substr( $txt,0,6)=='ERROR:' ){
$Color = '#CC0000';
$Sg = '5000';
}
if( substr( $txt,0,8)=='GRABADO:' ){
}
$txt = str_replace('-','&#8722;',$txt);
?>
<SCRIPT type="text/javascript">
var _oPopup = window.createPopup();
var oPopBody = _oPopup.document.body;
oPopBody.innerHTML = '<div style="background:#FFFFCC; border:2 outset <?= $Color; ?>;padding:5 20 5 20; _width:1;height:1;text-align:center; vertical-align: middle;">'+
'<div style="width:1;height:1;text-align: center; vertical-align: middle;color:<?= $Color; ?>;font-family:ARIAL;font-size:20"><?= str_replace(' ','&nbsp;',$txt); ?></DIV>'+
'</DIV>';
_oPopup.show(0,0,10,10);
var aHeight = oPopBody.scrollHeight;
var aWidth = oPopBody.scrollWidth;
_oPopup.hide();
_oPopup.show( (screen.width-aWidth)/2, (screen.availHeight-aHeight)/2, aWidth, aHeight );
setTimeout('_oPopup.hide();',<?= $Sg; ?>);
<?PHP
$DirRoot = eGetCWD();
if( substr($DirRoot,-1) != '/' ) $DirRoot .= '/';
$DirRoot = str_replace( '/http/', '.file/', $DirRoot );
$File = str_replace( $DirRoot, '//', $File );
if( $sCDI!='' && substr_count($File,'../_doc_/')==0 ) echo "top.PutCDI('{$sCDI}','{$File}');";
if( $SeRecarga ) echo 'if( null!=top.Recargar ) top.Recargar();';
?>
</SCRIPT>
<?PHP
echo '</HEAD><BODY>';
echo '</BODY></HTML>';
exit;
}
function FormateaTexto( $txt ){
$EsFields = false;
$Formato = array();
$NumLinea = array();
$Dim = explode("\n",$txt);
for( $n=0; $n<count($Dim); $n++ ){
if( $Dim[$n][0] == '[' ){
if( strtoupper(substr($Dim[$n],0,8)) == '[FIELDS]' ){
if( $EsFields ){
ReajustaFields( $Dim, $Formato, $NumLinea );
$Formato = array();
$NumLinea = array();
}
$EsFields = true;
}else{
if( $EsFields ){
ReajustaFields( $Dim, $Formato, $NumLinea );
$Formato = array();
$NumLinea = array();
}
$EsFields = false;
}
}else if( $EsFields ){
if( substr_count( $Dim[$n], '|' ) == 9 ){
$Formato[] = explode('|',$Dim[$n]);
$NumLinea[] = $n;
}else{
$Formato[] = $Dim[$n];
$NumLinea[] = $n;
}
}
}
if( $EsFields ) ReajustaFields( $Dim, $Formato, $NumLinea );
$txt = '';
for( $n=count($Dim)-1; $n>0; $n-- ){
if( trim($Dim[$n]) != '' ){
break;
}else{
unset($Dim[$n]);
}
}
for( $n=0; $n<count($Dim); $n++ ){
$txt .= rtrim($Dim[$n])."\n";
}
return $txt;
}
function ReajustaFields( &$Dim, $Formato, $NumLinea ){
$Ancho = array_pad( $Ancho, count($Formato), 0 );
for( $n=0; $n<count($Formato); $n++ ){
if( count($Formato[$n]) == 10 ){
for( $i=0; $i<count($Formato[$n]); $i++ ){
$Formato[$n][$i] = trim($Formato[$n][$i]);
if( $i==0 ){
switch( $Formato[$n][0][0] ){
case ',':
case '<':
if( substr($Formato[$n][0],1,1)==' ' ) $Formato[$n][0] = $Formato[$n][0][0].trim(substr($Formato[$n][0],1));
if( substr($Formato[$n][0],1,1)==']' ){
if( substr($Formato[$n][0],2,1) == ' ' ) $Formato[$n][0] = substr($Formato[$n][0],0,2).' '.trim(substr($Formato[$n][0],2));
$Formato[$n][0] = '  '.$Formato[$n][0][0].trim(substr($Formato[$n][0],1));
}else{
$Formato[$n][0] = '   '.$Formato[$n][0][0].trim(substr($Formato[$n][0],1));
}
break;
case ']':
case '-':
case '=':
$Formato[$n][0] = '   '.$Formato[$n][0][0].trim(substr($Formato[$n][0],1));
break;
case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
$Formato[$n][0] = '  '.$Formato[$n][0][0].' '.trim(substr($Formato[$n][0],1));
break;
case '#':
case '¿': case '?':
case '{': case '}':
break;
case '+':
$Formato[$n][0] = $Formato[$n][0][0].trim(substr($Formato[$n][0],1));
if( substr($Formato[$n][0],2,1) == ' ' ) $Formato[$n][0] = substr($Formato[$n][0],0,2).' '.trim(substr($Formato[$n][0],2));
$Formato[$n][0] = ' '.$Formato[$n][0];
break;
case '.':
break;
default:
$Formato[$n][0] = '    '.$Formato[$n][0];
}
}
if( $i == 5 ){
if( $Formato[$n][$i][0]==',' ){
$Ancho[$i] = max( $Ancho[$i], strlen($Formato[$n][$i])-1 );
}else{
$Ancho[$i] = max( $Ancho[$i], strlen($Formato[$n][$i]) );
}
}else{
$Ancho[$i] = max( $Ancho[$i], strlen($Formato[$n][$i]) );
}
}
}else{
$Formato[$n] = trim($Formato[$n]);
if( $Formato[$n]=='-' ) $Formato[$n] = '   -';
}
}
$MaxComas = 0;
for( $n=0; $n<count($Formato); $n++ ){
if( substr_count( $Formato[$n][4], ',' ) > $MaxComas ) $MaxComas = substr_count( $Formato[$n][4], ',' );
}
if( $MaxComas > 0 ){
$sFormato = array();
$sAncho = array();
for( $c=0; $c<$MaxComas; $c++ ) $sAncho[$c] = 0;
for( $n=0; $n<count($Formato); $n++ ){
for( $c=0; $c<$MaxComas; $c++ ) $sFormato[$n][$c] = 0;
if( substr_count( $Formato[$n][4], ',' ) > 0 ){
$Formato[$n][4] = str_replace(' ','',$Formato[$n][4]);
$tmp = explode(',',$Formato[$n][4]);
for( $c=0; $c<count($tmp); $c++ ) if( strlen(trim($tmp[$c])) > $sAncho[$c] ) $sAncho[$c] = strlen(trim($tmp[$c]));
}else{
if( strlen(trim($Formato[$n][4])) > $sAncho[0] ) $sAncho[0] = strlen(trim($Formato[$n][4]));
}
}
}
for( $n=0; $n<count($Formato); $n++ ){
if( count($Formato[$n]) == 10 ){
$txt = '';
for( $i=0; $i<count($Formato[$n]); $i++ ){
if( $Ancho[$i] > 0 ){
if( $i == 5 ){
if( $Formato[$n][$i][0]==',' ){
$txt .= str_pad( $Formato[$n][$i].' ',$Ancho[$i]+2,' ');
}else{
$txt .= str_pad( ' '.$Formato[$n][$i].' ',$Ancho[$i]+2,' ');
}
}else if( $i == 44 ){
$txt .= str_pad( $Formato[$n][$i],$Ancho[$i]+2,' ',STR_PAD_BOTH);
}else if( $i == 4 ){
switch( $MaxComas ){
case 0:
$stxt = str_pad( ' '.$Formato[$n][$i].' ',$Ancho[$i]+2,' ', STR_PAD_LEFT );
break;
case 1:
$tmp = explode(',',$Formato[$n][$i]);
$stxt = ' '.str_pad( $tmp[0],$sAncho[0],' ', STR_PAD_LEFT ).','.
str_pad( $tmp[1],$sAncho[1],'#', STR_PAD_LEFT ).
' ';
$stxt = str_replace( ','.str_repeat('#',$sAncho[1]), str_repeat(' ',$sAncho[1]+1), $stxt );
$stxt = str_replace('#',' ',$stxt);
break;
case 2:
$tmp = explode(',',$Formato[$n][$i]);
$stxt = ' '.str_pad( $tmp[0],$sAncho[0],' ', STR_PAD_LEFT).','.
str_pad( $tmp[1],$sAncho[1],'#', STR_PAD_LEFT).','.
str_pad( $tmp[2],$sAncho[2],'@', STR_PAD_LEFT).
' ';
$stxt = str_replace( ','.str_repeat('@',$sAncho[2]),' '.str_repeat(' ',$sAncho[2]), $stxt );
$stxt = str_replace( ','.str_repeat('#',$sAncho[1]),' '.str_repeat(' ',$sAncho[1]), $stxt );
$stxt = str_replace('#',' ',$stxt);
$stxt = str_replace('@',' ',$stxt);
break;
default:
$stxt = str_pad( ' '.$Formato[$n][$i].' ',$Ancho[$i]+2,' ');
}
$txt .= $stxt;
}else if( $i > 0 ){
$txt .= str_pad( ' '.$Formato[$n][$i].' ',$Ancho[$i]+2,' ');
}else{
$txt .= str_pad( $Formato[$n][$i].' ',$Ancho[$i]+1,' ');
}
}
$txt .= ($i<9) ? '|':'';
}
$Dim[$NumLinea[$n]] = $txt;
}else{
$Dim[$NumLinea[$n]] = $Formato[$n];
}
}
}
function VerSQL( $VerSQL, $it, $Multi ){
global $_SqlDiccionario, $_DimFields, $_SqlPDOConnect;
list( $_SqlPDOType ) = explode( ':', $_SqlPDOConnect );
$tabla = explode('//',trim($VerSQL));
$tabla = explode(',',str_replace('|',',',$tabla[0]));
$GeneraSentencia = false;
if( count($tabla)==1 ){
$GenSQL = explode(' ',str_replace('  ',' ',$tabla[0]));
if( count($GenSQL)>1 ){
$tabla = array( trim($GenSQL[1]) );
$GeneraSentencia = true;
}
}
eHTML();
?>
<style type="text/css">
BODY {
color: #000099;
background: #F5F5F5;
margin: 0px;
}
TABLE {
font-family: Arial;
font-size: 12px;
background-color: #000099;
}
TH {
color: #000099;
background-color: #D3DCE3;
}
TD {
background-color: #F6F8F9;
WHITE-SPACE: nowrap;
}
</style>
<?PHP
if( $it ){
?>
<BODY scroll=auto onhelp='return false' oncontextmenu='return false'>
<table id=BROWSE cellspacing=1px cellpadding=3px border=0px>
<?PHP
}else{
echo '</HEAD><BODY>';
echo "<TABLE onclick='top.MemField(this)' cellspacing=1px cellpadding=0px nowrap>";
}
global $_Sql;
for( $n=0; $n<count($tabla); $n++ ){
$tabla[$n] = trim($tabla[$n]);
$tabla[$n] = str_replace('  ',' ',$tabla[$n]);
if( substr($tabla[$n],0,6)=='outer ' ) $tabla[$n] = substr($tabla[$n],6);
$tabla[$n] = str_replace(',outer ',',',$tabla[$n]);
$tabla[$n] = str_replace(', outer ',',',$tabla[$n]);
$tabla[$n] = str_replace(' as ',' ',$tabla[$n]);
$tabla[$n] = str_replace(' AS ',' ',$tabla[$n]);
$tmp = explode(' ',$tabla[$n]);
$tabla[$n] = $tmp[0];
if( eSqlType('informix') ){
echo GetTablaInformix( $tabla[$n], $Multi );
}else if( eSqlType('mysql,mysqli') ){
echo GetTablaMySql( $_SqlDiccionario, $tabla[$n], $Multi );
}else if( eSqlType('oracle') ){
echo GetTablaOracle( $tabla[$n], $Multi );
}
}
echo '</TABLE>';
if( $Multi ){
?>
<SCRIPT type="text/javascript">
parent.document.getElementById("def<?= $tabla[0]; ?>").innerHTML = document.getElementsByTagName("TABLE")[0].outerHTML;
</SCRIPT>
<?PHP
}
if( !$it ){
?>
<SCRIPT type="text/javascript">
top.gsEtiquetas('ListSQL');
</SCRIPT>
<?PHP
}
echo '</BODY></HTML>';
if( $GeneraSentencia ){
$GenSQL[0] = trim(strtolower($GenSQL[0]));
$GenSQL[2] = trim($GenSQL[2]);
$txt = '$Sql = '."\'".$GenSQL[0].'';
if( $GenSQL[0]=='select' ){
for( $n=0; $n<count($_DimFields); $n++ ){
if( $n>0 ) $txt .= ',';
$txt .= '\n\t'.$_DimFields[$n];
}
$txt .= '\nfrom '.$GenSQL[0].' \nwhere ... \norder by ...';
}else if( $GenSQL[0]=='update' ){
$txt .= ' '.$GenSQL[1].' set';
for( $n=0; $n<count($_DimFields); $n++ ){
if( $n>0 ) $txt .= ',';
$txt .= '\n\t'.$_DimFields[$n].'="'."\'.". str_replace('*',$_DimFields[$n],$GenSQL[2]) .".\'".'"';
}
$txt .= '\nwhere ...';
}else if( $GenSQL[0]=='insert' ){
$txt .= ' into '.$GenSQL[1].' set';
for( $n=0; $n<count($_DimFields); $n++ ){
if( $n>0 ) $txt .= ',';
$txt .= '\n\t'.$_DimFields[$n].'="'."\'.". str_replace('*',$_DimFields[$n],$GenSQL[2]) .".\'".'"';
}
}
$txt .= "\';".'\n';
$txt .= '\nqQuery( $Sql );';
eInit();
?>
<SCRIPT type="text/javascript">
try{
window.clipboardData.setData( 'Text', '<?=$txt?>' );
}catch(e){}
</SCRIPT>
<?PHP
}
exit;
}
function GetTablaMySql( $db, $table, $Multi ){
global $_T, $_DimFields;
if( $Multi ){
$txt = "<TR><TH colspan=2 Max=1 ondblclick='MaxDef(this)' onmousedown='Mover(this)' oncontextmenu='Ocultar(this)'>{$_T[85]} <B>{$table}</B>";
}else{
$txt = "<TR><TH colspan=2>{$_T[85]} <B>{$table}</B>";
}
$result = mysql_db_query($db, "SHOW FIELDS FROM {$table}") or mysql_die();
while($row=mysql_fetch_array($result)){
$_DimFields[] = $row['Field'];
$txt .= "<TR><TD>{$row[Field]}<TD nowrap> {$row[Type]}";
if(isset($row["Default"]) && (!empty($row["Default"]) || $row["Default"]=="0"))
$txt .= " DEFAULT '$row[Default]'";
if($row["Null"]!="YES")
$txt .= " NOT NULL";
if($row["Extra"]!="")
$txt .= " $row[Extra]";
}
$txt = preg_replace('/,$/', "", $txt);
$result = mysql_db_query($db, "SHOW KEYS FROM {$table}") or mysql_die();
while( $row = mysql_fetch_array($result) ){
$kname = $row['Key_name'];
if(($kname != "PRIMARY") && ($row['Non_unique'] == 0))
$kname="UNIQUE|{$kname}";
if(!isset($index[$kname]))
$index[$kname] = array();
$index[$kname][] = $row['Column_name'];
}
while( list($x, $columns) = @each($index) ){
$txt .= "<TR><TD colspan=2 nowrap>";
if($x == "PRIMARY")
$txt .= "   PRIMARY KEY (" . implode($columns, ", ") . ")";
elseif (substr($x,0,6) == "UNIQUE")
$txt .= "   UNIQUE ".substr($x,7)." (" . implode($columns, ", ") . ")";
else
$txt .= "   KEY $x (" . implode($columns, ", ") . ")";
}
return(stripslashes($txt));
}
function GetTablaInformix( $table, $Multi ){
global $_T, $_DimFields;
$OriTabla = $NomTabla = $table;
$NomAlias = '';
if( qCount('systables',"tabname='{$NomTabla}'" ) == 0 ){
die( $_T[86] );
}
qSelect('systables','*',"tabname='{$NomTabla}'" );
$row = qArray();
$TablaSinonimo = $row['tabtype'];
if( $row['tabtype']=='S' ){
qSelect('syssyntable','*',"tabid='".$row['tabid']."'" );
$row = qArray();
qSelect('systables','*',"tabid='".$row['btabid']."'" );
$row = qArray();
}else if( $row['tabtype']=='T' ){
qSelect('syssyntable','*',"btabid='".$row['tabid']."'",'',$p );
$row2 = qArray($p);
qSelect('systables','*',"tabid='".$row2['tabid']."'",'',$p );
$row2 = qArray($p);
$NomAlias = trim($row2['tabname']);
}
$bd_tabid = $row['tabid'];
if( $TablaSinonimo == 'T' ){
if( $NomAlias!='' ){
$OriTabla = '<B title="Table">'.$OriTabla.'</B> (<U title="Alias">'.$NomAlias.'</U>)';
}else{
}
}else{
$OriTabla = '<U title="Alias">'.$OriTabla.'</U> <B title="Table">('.trim($row['tabname']).'</B>)';
}
if( $Multi ){
$txt = "<TR><TH colspan=2 Max=1 ondblclick='MaxDef(this)' onmousedown='Mover(this)' oncontextmenu='Ocultar(this)'>{$_T[85]} {$OriTabla}";
}else{
$txt = "<TR><TH colspan=2>{$_T[85]} {$OriTabla}";
}
$DimTipos = array('CHAR','SMALLINT','INTEGER','FLOAT','SMALLFLOAT','DECIMAL','SERIAL','DATE','MONEY','',
'DATETIME','BYTE','TEXT','VARCHAR','INTERVAL','NCHAR','NVARCHAR','INT8','SERIAL8','SET','MULTISET','LIST','');
$DimTipos[40] = '';
$DimPrecision = array(
'0000'=>'year',
'0010'=>'month',
'0100'=>'day',
'0110'=>'hour',
'1000'=>'minute',
'1010'=>'second' );
$cad_sql = 'select A.tabname,A.ncols,A.nindexes,B.colname,B.colno,B.coltype,B.collength from systables as A, outer syscolumns as B where A.tabtype = "T" and A.tabid = B.tabid and A.tabid = '.$bd_tabid;
qQuery( $cad_sql, $pTabla );
$DimCampo = array();
while( ($Dim = qArray($pTabla)) ){
$Nulos = '';
if( $Dim['coltype'] > 255 ){
$Nulos = ' not null ';
$Restar = 32768;
for( $n=0; $n<8; $n++ ){
if( $Dim[coltype] >= $Restar ) $Dim['coltype'] -= $Restar;
$Restar = $Restar/2;
}
}
$_DimFields[] = $Dim['colname'];
$txt .= '<TR><TD>'.$Dim['colname'];
$txt .= '<TD nowrap>'.strtolower($DimTipos[$Dim['coltype']]);
switch( $DimTipos[$Dim['coltype']] ){
case 'DATETIME':
case 'INTERVAL':
for( $n=11; $n<16; $n++ ){
if( $Dim[collength] >= (256*$n) ) $Dim[collength] -= (256*$n);
}
$bin = decbin( $Dim['collength'] );
$bin = substr($bin,-8);
$desde = substr($bin,0,4);
$hasta = substr($bin,-4);
$txt .= ' '.$DimPrecision[$desde].' to '.$DimPrecision[$hasta];
$Dim[collength] = '';
break;
case 'DATE':
case 'TEXT':
case 'SMALLINT';
case 'INTEGER':
case 'FLOAT':
case 'SMALLFLOAT':
$Dim[collength] = '';
break;
case 'DECIMAL':
$Dim[collength] =  '('.floor($Dim['collength'] / 256).','.($Dim['collength'] % 256).')';
break;
case 'VARCHAR':
$Dim[collength] =  '('.($Dim['collength'] % 256).','.floor($Dim['collength'] / 256).')';
break;
default:
$txt .= '(';
$Dim['collength'] .= ')';
}
$txt .= $Dim['collength'].' '.$Nulos;
$DimCampo[$Dim['colno']] = trim($Dim['colname']);
}
$npart = 17;
$cad_sql = 'select part1,part2,part3,part4,part5,part6,part7,part8,part9,part10,part11,part12,part13,part14,part15,part16,idxtype from sysindexes where tabid = '.$bd_tabid;
qQuery( $cad_sql );
$i = 0;
while( $Dim = qArray() ){
$txt .= '<TR><TD colspan=2 nowrap>';
$num = 0;
for( $l=1;$l<$npart;$l++ ){
if( trim($Dim['part'.$l]) ){
$ind[$i][$num] = trim($Dim['part'.$l]);
if( $num > 0 && trim($DimCampo[$ind[$i][$num]])!='' ) $txt .= ', ';
$txt .= $DimCampo[$ind[$i][$num]];
$num++;
}
}
if( trim($Dim['idxtype']) == 'U' ){
$ind[$i][16] = 'S';
$txt .= ' <B>(unique)</B>';
}else{
$ind[$i][16] = 'N';
}
$i++;
}
return(stripslashes($txt));
}
function LeerInformixProcedure( $NomProce ){
qQuery("select b.procname, a.data, a.seqno from sysprocbody a, sysprocedures b where a.procid=b.procid and a.datakey='T' and b.procname='{$NomProce}' order by 1,3" );
$txt = '';
while( $row=qRow() ) $txt .= $row[1];
return $txt;
}
function LeerInformixTrigger( $NomTrig ){
qQuery( "SELECT c.tabname,b.trigname, a.seqno, a.data FROM systrigbody a, systriggers b,systables c WHERE b.trigname='{$NomTrig}' and a.datakey = 'D' AND a.trigid = b.trigid and b.tabid = c.tabid ORDER by 1,2,3" );
$txt = '';
while( $row=qRow() ) $txt .= $row[3];
$txt .= "\n";
qQuery( "SELECT c.tabname,b.trigname, a.seqno, a.data FROM systrigbody a, systriggers b,systables c WHERE b.trigname='{$NomTrig}' and a.datakey = 'A' AND a.trigid = b.trigid and b.tabid = c.tabid ORDER by 1,2,3" );
while( $row=qRow() ) $txt .= $row[3];
return $txt;
}
function GetTablaOracle( $table, $Multi ){
global $_T, $_SqlUsuario, $_DimFields;
$SqlUsuario = strtoupper($_SqlUsuario);
if( $Multi ){
$txt = "<TR><TH colspan=2 Max=1 ondblclick='MaxDef(this)' onmousedown='Mover(this)' oncontextmenu='Ocultar(this)'>{$_T[85]} <B>{$table}</B>";
}else{
$txt = "<TR><TH colspan=2>{$_T[85]} <B>{$table}</B>";
}
global $_Result;
$Tabla = strtoupper($table);
$sql = "select * from all_tab_cols where table_name='{$Tabla}' order by COLUMN_ID";
qQuery($sql);
while( OCIFetch($_Result) ){
$_DimFields[] = strtolower(OCIResult($_Result,'COLUMN_NAME'));
$txt .= '<TR><TD>'.strtolower(OCIResult($_Result,'COLUMN_NAME')).'<TD nowrap> '.strtolower(OCIResult($_Result,'DATA_TYPE'));
if( OCIResult($_Result,'DATA_TYPE')!='DATE' && substr(OCIResult($_Result,'DATA_TYPE'),0,9)!='TIMESTAMP' ){
$txt .= '(';
if( OCIResult($_Result,'DATA_PRECISION')== 0 ){
$txt .=  OCIResult($_Result,'DATA_LENGTH');
}else{
$txt .=  OCIResult($_Result,'DATA_PRECISION');
if( OCIResult($_Result,'DATA_SCALE')!=0 ) $txt .= ','.OCIResult($_Result,'DATA_SCALE');
}
$txt .= ') ';
}
if( OCIResult($_Result,'NULLABLE')=='N' ) $txt .= ' not null';
}
$sql = "SELECT INDEX_NAME,UNIQUENESS FROM all_indexes where TABLE_OWNER='{$SqlUsuario}' and TABLE_NAME='{$Tabla}'";
qQuery($sql);
while( OCIFetch($_Result) ){
$n=0;
$sql = "SELECT COLUMN_NAME,DESCEND FROM all_ind_columns where INDEX_OWNER='{$SqlUsuario}' and TABLE_NAME='{$Tabla}' and INDEX_NAME='".OCIResult($_Result,'INDEX_NAME')."' order by COLUMN_POSITION";
$txt .= '<TR><TD colspan=2 nowrap>';
qQuery($sql, $pt);
while( OCIFetch($pt) ){
if( $n>0 ) $txt .= ',';
$txt .= strtolower(OCIResult($pt,'COLUMN_NAME'));
if( OCIResult($pt,'DESCEND') == 'DESC' ) $txt .= ' DESC';
$n++;
}
if( OCIResult($_Result,'UNIQUENESS')=='UNIQUE' ) $txt .= ' <B>(unique)</B>';
}
return(stripslashes($txt));
}
?>
