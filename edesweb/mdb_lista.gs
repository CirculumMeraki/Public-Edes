<?PHP
if( !isset($_SESSION['_User']) || $_gsID != getmypid() ) exit;
if( $_SESSION['_MDB_']<>'S' ) eEnd();
$Indice = -1;
$Visible = array();
for( $n=0; $n<count($_Form); $n++ ){
if( substr($_Form[$n][0],0,6)=='&nbsp;' ) $_Form[$n][0] = substr($_Form[$n][0],6);
$_ALIGN[$n] = strtolower($_ALIGN[$n]);
$_ALIGN[$n] = trim(str_replace('id=','',$_ALIGN[$n]));
$Visible[$n] = ( substr_count($_Form[$n][6],'*') == 0 && substr_count($_Form[$n][6],'L') == 0 );
if( $_Form[$n][6]=='*' ) $_PDFCOL[$n] = '0';
if( $_Form[$n][4]==0 ) $Visible[$n] = false;
if( strtoupper($_PDFCOL[$n])=='XLS'  ) $Visible[$n] = false;
if( strtoupper($_FORMAT[$n])=='IMG'  ) $Visible[$n] = false;
if( strtoupper($_FORMAT[$n])=='ICON' ) $Visible[$n] = false;
if( $_PDFCOL[$n]=='0' ) $Visible[$n] = false;
if( $_Form[$n][3]=='A' || $_Form[$n][3]=='H' ) $Visible[$n] = false;
}
$Titulos = array();
for( $n=0; $n<count($_Form); $n++ ){
$Titulos[$n] = '';
$_AnchoCol[$n] = 0;
$_AnchoPt[$n] = 0;
if( $Visible[$n] ){
$Celda = $_Form[$n][0];
if( $_PDFTH[$n]!='' ){
$Celda = $_PDFTH[$n];
$_Form[$n][0] = $_PDFTH[$n];
}
$Celda = str_replace( '&nbsp;', ' ', $Celda );
$Celda = str_replace( '&NBSP;', ' ', $Celda );
if( substr_count( $Celda, '<' ) > 0 ){
$Celda = str_replace( '<br>', '<BR>', $Celda );
$Celda = str_replace( '<bR>', '<BR>', $Celda );
$Celda = str_replace( '<Br>', '<BR>', $Celda );
}
$Titulos[$n] = str_replace( '<BR>'  , ' ', eStrUpper( $Celda ) );
$Titulos[$n] = str_replace( '&EURO;', 'EUR', $Titulos[$n] );
$Titulos[$n] = str_replace( "\t"    , ' ', $Titulos[$n] );
$Titulos[$n] = str_replace( '&amp;' , '&', $Titulos[$n] );
$Titulos[$n] = str_replace( '&AMP;' , '&', $Titulos[$n] );
$Titulos[$n] = str_replace( '&quot;', '"', $Titulos[$n] );
$Titulos[$n] = str_replace( '&QUOT;', '"', $Titulos[$n] );
if( strtoupper($_Form[$n][3])=='C' ){
$_ADDOPTION[ $_Form[$n][1] ] = true;
if( $_LISTCHECKBOX['X']=='' ){
$_SelVirtual[$_Form[$n][1]]['S'] = $_CheckBox['X']['ON'];
$_SelVirtual[$_Form[$n][1]]['']  = $_CheckBox['X']['OFF'];
}else{
$_SelVirtual[$_Form[$n][1]]['S'] = strip_tags($_LISTCHECKBOX['X'][0]);
$_SelVirtual[$_Form[$n][1]]['']  = strip_tags($_LISTCHECKBOX['X'][1]);
}
}
}
}
$NomFile = ((int)eGetMicroTime()).'';
$Dim = file('../../edesweb/t/lng/access.rw');
$PalabraReservada = array();
for( $n=0; $n<count($Dim); $n++ ) if( trim($Dim[$n])!='' ) $PalabraReservada[trim($Dim[$n])] = true;
$oFile = '/_tmp/pdf/'.$NomFile.'.tmp';
$oFile = eScript($oFile);
if( file_exists($oFile) ) unlink($oFile);
$dFile = substr($oFile,0,-3).'unl';
$eFile = '/_tmp/pdf/'.$NomFile.'.unl';
while( substr_count('  ',$_SQL_)>0 ) $_SQL_ = str_replace( '  ', ' ', $_SQL_ );
list( ,$NomTabla ) = explode( ' from ', $_SQL_ );
list( $NomTabla ) = explode( ' ', $NomTabla );
if( trim($NomTabla)=='' ) $NomTabla = 'tabla';
if( $PalabraReservada[strtoupper($NomTabla)] ) $NomTabla = '_'.$NomTabla;
if( isset($_ACCESSFIELDS) ){
if( count($_ACCESSFIELDS)==2 ) $NomTabla = $_ACCESSFIELDS[1];
$tmp = explode(',',$_ACCESSFIELDS[0]);
$cv = 0;
for( $n=0; $n<count($tmp); $n++ ){
$tmp[$n] = trim($tmp[$n]);
if( substr_count($tmp[$n],'=') > 0 ){
list( $Old, $New ) = explode('=',$tmp[$n]);
$Old = trim($Old);
$New = trim($New);
$scv = 0;
for( $i=0; $i<count($_Form); $i++ ){
if( !$Visible[$i] ) continue;
if( $Ok ) $Create .= ', ';
list( $NomCampo ) = explode(':',$_Form[$i][1]);
list( $NomCampo ) = explode('{',$NomCampo);
$NomCampo = trim($NomCampo);
if( $NomCampo==$Old ){
$cv = $scv;
$tmp[$n] = $New;
break;
}
list( $NomCampo ) = explode(' ',$NomCampo);
$NomCampo = trim($NomCampo);
$scv++;
}
}
$_ACCESSFIELDS[$cv] = $tmp[$n];
$cv++;
}
}
$Enter	 = "\n";
$NewCampo = '|';
$NewRow	 = '~';
$fp = fopen( $oFile, "w" );
fwrite( $fp, utf8_encode('colDelimiter='.$NewCampo.$Enter) );
fwrite( $fp, utf8_encode('rowDelimiter='.$NewRow.$Enter) );
fwrite( $fp, utf8_encode('replace=|::{&#124;}'.$Enter) );
fwrite( $fp, utf8_encode('replace=~::{&#126;}'.$Enter) );
if( $_DEBUGAccess ) fwrite( $fp, utf8_encode('debug=1'.$Enter) );
fwrite( $fp, utf8_encode('cmd=open'.$Enter) );
fwrite( $fp, utf8_encode('tableName='.$NomTabla.$Enter) );
$Create = "createTable=CREATE TABLE {$NomTabla} (";
$DimNomField = array();
$Ok = false;
$cv = 0;
for( $n=0; $n<count($_Form); $n++ ){
if( !$Visible[$n] ) continue;
if( $Ok ) $Create .= ', ';
list( $NomCampo ) = explode(':',$_Form[$n][1]);
list( $NomCampo ) = explode('{',$NomCampo);
$NomCampo = trim($NomCampo);
list( $NomCampo ) = explode(' ',$NomCampo);
$NomCampo = trim($NomCampo);
if( isset($_ACCESSFIELDS) ){
$NomCampo = $_ACCESSFIELDS[$cv];
$cv++;
}
if( substr_count( $NomCampo, ')' ) > 0 ) list( $NomCampo ) = explode(')',$NomCampo);
$Dim = explode('(',$NomCampo);
$NomCampo = $Dim[count($Dim)-1];
$NomCampo = str_replace('.','_',$NomCampo);
$NomCampo = str_replace(',','_',$NomCampo);
$NomCampo = str_replace(' ','_',$NomCampo);
$NomCampo = trim($NomCampo);
if( $PalabraReservada[strtoupper($NomCampo)] ) $NomCampo = '_'.$NomCampo;
if( $DimNomField[$NomCampo]!='' ) $NomCampo .= '_'.$n;
$DimNomField[$NomCampo] = 1;
$Create .= $NomCampo.' ';
$Ok = true;
if( strtoupper($_Form[$n][3])=='C' ){
$Create .= 'char(1)';
}else if( strtoupper($_Form[$n][3][0])=='S' ){
list( $iz, $dr ) = explode(',',$_Form[$n][4]);
$Create .= 'char('.( ($dr=='') ? $iz : $dr ).')';
}else{
switch( $_Form[$n][2] ){
case '*':
case '+':
case '-':
$Create .= 'decimal('.$_Form[$n][4].')';
break;
case '+,':
case '-,':
list( $iz, $dr ) = explode( ',', $_Form[$n][4] );
$iz += $dr + 1;
if( $dr==0 ) $dr = 0;
$Create .= "decimal({$iz},{$dr})";
break;
case 'F4':
$Create .= 'char(10)';
break;
case 'CDI':
$Create .= 'datetime';
break;
case '#':
$Create .= 'memo';
break;
default:
if( $_Form[$n][3]=='T' ){
$Create .= 'char('.$_Form[$n][4].')';
}else{
$Create .= 'memo';
}
}
}
}
$Create .= ');';
fwrite($fp, utf8_encode($Create).$Enter);
fwrite($fp, utf8_encode('[EOP]').$Enter);
$xTReg = 0;
$Pipa = false;
while( $linea = NewFila() ){
if( $_FORMATPHP!='' ) _ExeFormato( $linea );
$xTReg++;
$txt = '';
if( $Pipa ) $txt .= $NewRow;
$Pipa = false;
$n = -1;
foreach( $linea as $valor ){
$n++;
if( !$Visible[$n] ) continue;
if( $Pipa ){
$txt .= $NewCampo;
}else{
$Pipa = true;
}
if( !empty($_ADDOPTION[$_Form[$n][1]]) ){
$valor = $_SelVirtual[$_Form[$n][1]][$valor];
}else{
$valor = trim($valor);
if( $_Form[$n][3]=='H' ){
}else if( $_Form[$n][2]=='#' ){
$valor = urldecode($valor);
}
if( $_HayRadio ){
if( count($_RADIO[$_Form[$n][1]])>0 ){
$valor = $_RADIO[$_Form[$n][1]][$valor];
}
}
}
$valor = str_replace('|'     ,'{&#124;}',$valor);
$valor = str_replace('~'     ,'{&#126;}',$valor);
$valor = str_replace('&quot;',"''"      ,$valor);
$valor = str_replace('"'     ,"''"      ,$valor);
$valor = str_replace('&amp;' ,'&' ,$valor);
$valor = str_replace('&#34;' ,'"' ,$valor);
$valor = str_replace('&#39;' ,"'" ,$valor);
$valor = str_replace('&#43;' ,'+' ,$valor);
$valor = str_replace('&#92;' ,'\\',$valor);
$valor = str_replace('&nbsp;',' ' ,$valor);
if( (strlen($valor)==10 || strlen($valor)==19) && isZero($valor) ) $valor = "";
if( $_Form[$n][2][0]=='+' || $_Form[$n][2][0]=='-' || $_Form[$n][2][0]=='*' ){
if( $valor=='' ){
$valor = 0;
}else{
$valor = str_replace('.', ',', $valor);
}
}else{
$valor = substr(strip_tags($valor), 0, $_Form[$n][4]);
}
$txt .= trim((string)$valor);
}
fputs($fp, utf8_encode($txt));
}
fclose($fp);
clearstatcache();
rename($oFile, $dFile);
$NomFile = $dFile;
$_TReg = $xTReg;
$Extension = "MDB";
include_once($Dir_.'downloadfile.inc');
eEnd();
function NewFila(){
global $usuCursor, $Indice;
if( !isset($usuCursor) ){
return qRow();
}else{
$Indice++;
return $usuCursor[$Indice];
}
}
?>
<SCRIPT type="text/javascript">
top.eInfo(window,'Ok');
</SCRIPT>
<?PHP
eEnd();
?>
