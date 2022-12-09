<?PHP //[_PROTECCION_]
function CreaSubLista( $NomFile, $Fichero, $ValorIndice ){
global $_PARENT_SUBLIST;
$Fichero = trim($Fichero);
$NomFile = '['.trim($NomFile).']';
$txt = '';
$_Objeto = array();
$_ObjetoID = '';
$Leer = false;
$tmp = file( $Fichero );
for( $i=0; $i<count($tmp); $i++ ){
$tmp[$i] = trim($tmp[$i]);
switch( ord($tmp[$i][0]) ){
case   0:
case  46:
case  10:
break;
case  91:
$Leer = false;
if( strtoupper(substr($tmp[$i],0,9)) == '[SUBLIST]' ){
$dim = explode( ']', $tmp[$i] );
$dim = explode( '|', $dim[1] );
$dim[0] = ','.trim($dim[0]).',';
$dim[1] = trim($dim[1]);
if( '['.$dim[1].']' == $NomFile ){
$_ObjetoID = '['.trim($dim[1]).']';
$_Objeto[$_ObjetoID]['TIPO'] = 'SubLista';
$_Objeto[$_ObjetoID]['SLTITLE'] = trim($dim[2]);
$_Objeto[$_ObjetoID]['SLWTITLE'] = str_replace("'",'"',trim($dim[3]));
$_Objeto[$_ObjetoID]['TTR'] = -1;
$Leer = true;
}
}else{
if( strtoupper(substr($tmp[$i],0,6)) == '[NOTE]' ) $i = count($tmp);
}
break;
case 123:
if( $Leer ){
$buffer = $tmp[$i];
$SubEtiqueta = trim(substr( $buffer, 1, strpos($buffer,'}')-1 ));
$buffer = trim(str_replace('{'.$SubEtiqueta.'}', '', $buffer ));
$_Objeto[ $_ObjetoID ][ strtoupper($SubEtiqueta) ] = $buffer;
}
break;
default:
}
}
$RowSpan = '';
list($sSql) = explode('|', $_Objeto[$NomFile]['SLSQL']);
if( $_PARENT_SUBLIST!='a' ){
while( substr_count($sSql, '{')>0 ){
$ini = strpos($sSql,'{')+1;
$fin = strpos($sSql,'}');
$sCampo = trim( substr( $sSql, $ini, $fin-$ini ));
$NewCampo = $sCampo;
if( $NewCampo[0]=='$' ) $NewCampo = substr($sCampo,1);
if( $NewCampo[0]!='_' ){
$sSql = str_replace('{'.$sCampo.'}', $Fila[$NewCampo], $sSql);
}else{
$sSql = str_replace('{'.$sCampo.'}', $GLOBALS[$NewCampo], $sSql);
}
}
}else{
$xSql = strtolower($sSql);
list($tmp1, $tmp) = explode(' where ', $xSql);
list(,$tmp2) = explode(' order by ', $tmp);
$sSql = $tmp1.' where conexion='.$_SESSION['_Connection_'];
if( $tmp2!='' ) $sSql .= ' order by '.$tmp2;
}
qQuery($sSql);
$tCol = sql_TotalCampos();
if( $tCol == 0 ){
$tCol = count(sql_DimFields($sSql));
}
$ExeAltoNFilas = false;
$TRSubLista = 0;
$tmp = explode(',', $_Objeto[$NomFile]['SLWIN']);
if( $tmp[1]!='' ){
if( strstr( $tmp[1],'px' ) ){
}else{
$ExeAltoNFilas = true;
$nAltoNFilas = $tmp[1];
$_Objeto[$NomFile]['TTR'] = $tmp[1];
}
}
if( $_Objeto[$NomFile]['SLTIPICON']!='' ){
$tmp = explode(';', $_Objeto[$NomFile]['SLTIPICON']);
for($i=0; $i<count($tmp); $i++){
$tmp2 = explode(',', $tmp[$i]);
$sTxtC = $NomFile;
$sTxtE = trim($tmp2[0]);
$_Objeto[$sTxtC]['TITLE_'.$sTxtE] = trim($tmp2[1]);
}
}
if( $_Objeto[$NomFile]['SLFORMAT']!='' ){
$tmpFormato = explode(',', $_Objeto[$NomFile]['SLFORMAT'] );
for($i=0; $i<count($tmpFormato); $i++) $tmpFormato[$i] = str_replace( '&#44;',',',trim($tmpFormato[$i]) );
}else{
$tmpFormato = array();
}
$TRV = ' TRVISIBLES='.(($ExeAltoNFilas)?$nAltoNFilas:'-1');
$txt .= '<div id=_Copia style="display:none">';
$txt .= "<TABLE id='{$NomFile}' PADRE='{$ValorIndice}' AltoTH=0 WTITLE='".$_Objeto[$NomFile]['SLWTITLE']."'{$TRV} class=SubLista cols={$tCol} oncontextmenu='gsSubMenu(\"m{$NomFile}\")' style='cursor:pointer'>";
if( $_Objeto[$NomFile]['SLCOLSWIDTH']!='' ){
$xColWidth = explode( ',', $_Objeto[$NomFile]['SLCOLSWIDTH'] );
for( $n=0; $n<count($xColWidth); $n++ ) $xColWidth[$n] = trim($xColWidth[$n]);
}
if( $_Objeto[$NomFile]['SLALIGN']!='' ){
$xAlign = explode( ',', $_Objeto[$NomFile]['SLALIGN'] );
for( $n=0; $n<count($xAlign); $n++ ) $xAlign[$n] = trim($xAlign[$n]);
}
$xTH = explode(',', $_Objeto[$NomFile]['SLTH']);
for( $n=0; $n<count($xTH); $n++ ){
if( $xAlign[$n]!='' ){
$c = str_replace( 'i','i',strtolower($xAlign[$n]) );
$c = str_replace( 'l','i',$c );
$c = str_replace( 'r','d',$c );
$c = str_replace( 'h','o',$c );
if( $c=='t' ){
$CampoTitle = $e;
$c = 'o';
}
}
if( trim($c)=='' ){
$txt .= '<COL';
}else{
$txt .= '<COL id='.trim($c);
}
if( $xColWidth[$n]!='' ) $txt .= " width='{$xColWidth[$n]}'";
$txt .= '>';
}
if( $_Objeto[$NomFile]['SLTITLE'] != '' ){
$txt .= "<TR SaltaTR><TH colspan={$tCol}>".trim($_Objeto[$NomFile]['SLTITLE']);
}
if( $_Objeto[$NomFile]['SLTH'] != '' ){
$tmpTD = explode( ',', $_Objeto[$NomFile]['SLTYPEDATA'] );
$txt .= '<TR style="position:relative; top:0px">';
list( $sSql ) = explode( ' from ', substr($sSql,7) );
$NomField = explode( ',', $sSql );
$z = 0;
while( list($e, $c) = each( $xTH ) ){
$NomField[$z] = trim($NomField[$z]);
$txt .= '<TH CAMPO="'.$NomField[$z].'"';
if( $tmpTD[$e]!='' ) $txt .= ' td="'.$tmpTD[$e].'"';
$sTmpFormato = $tmpFormato[$z];
if( substr_count( $sTmpFormato, '(' ) == 0 && substr_count( $sTmpFormato, 'M' ) == 1 && strlen($sTmpFormato) < 5 ){
$sTmpFormato = str_replace( 'M','',$sTmpFormato);
$txt .= ' MILES=true';
}
if( substr_count( $sTmpFormato, '(' ) == 0 && $sTmpFormato!='' && strlen($sTmpFormato) < 5 ) $txt .= ' DCM="'.$sTmpFormato.'"';
if( $tmpTD[$e]=='' && substr($NomField[$z],0,3)=='dt_' ) $txt .= ' td="F4"';
$txt .= '>'.trim($c);
$z++;
}
}
$DimValor = array();
$nFila = -1;
while( $row=qRow() ){
$nFila++;
if( $CampoTitle > -1 ){
$txt .= '<TR title="'.trim($row[$CampoTitle]).'">';
}else{
$txt .= '<TR>';
}
$nCol = 0;
for($NumCol=0; $NumCol<$tCol; $NumCol++){
$c = trim($_vF[$NumCol]);
$DimValor[$nFila][$nCol] = $c;
if( trim($tmpFormato[$nCol])!='' ){
$txt .= '<TD>';
if( substr_count( $sTmpFormato, '(' ) == 0 && substr_count( $tmpFormato[$nCol], 'M' ) == 1 && strlen($tmpFormato[$nCol])<4 ){
if( strlen($tmpFormato[$nCol])==2 ){
$txt .= eNumberFormat($c,$tmpFormato[$nCol][1]);
}else{
$txt .= eNumberFormat($c);
}
}else if( substr_count( $tmpFormato[$nCol], 'm' ) == 1 && strlen($tmpFormato[$nCol])<4 ){
if( strlen($tmpFormato[$nCol])==2 ){
$txt .= eNumberFormat($c,$tmpFormato[$nCol][1]);
}else{
$txt .= eNumberFormat($c);
}
}else{
$Formato = str_replace( "#", str_replace('"',"'",$c), $tmpFormato[$nCol] );
$ext = '';
if( strrpos($c,'.' ) ) $ext = substr($c,strrpos($c,'.' )+1);
if( substr_count($Formato,'_@_') > 0 ){
$Formato = str_replace( '_@_', $_Objeto[$NomFile]['TITLE_'.$ext], $Formato );
}
if( substr_count($Formato,'@') > 0 ){
$Formato = str_replace( '@', $ext, $Formato );
}
if( substr_count($Formato,'(')>0 && substr(trim($Formato),-1)==')' ){
$Formato = '$txt .= '.$Formato.';';
}else{
$Formato = '$txt .= "'.$Formato.'";';
}
@eval( $Formato );
}
}else{
$txt .= '<TD>'.$c;
}
$nCol++;
}
}
if( $ExeAltoNFilas && $nFila<$nAltoNFilas ){
for( $i=0; $i<$nAltoNFilas-$nFila-2; $i++ ){
$txt .= '<TR LIBRE=1>';
for( $n=0; $n<count($xTH); $n++ ) $txt .= '<TD>&nbsp;';
}
}
if( $_Objeto[$NomFile]['SLCOLSOP'] != '' ){
$txt .= '<TR id=PieLista>';
$tmp = explode(',',strtoupper(str_replace(' ','',$_Objeto[$NomFile]['SLCOLSOP'])) );
for( $n=0; $n<count($xTH); $n++ ){
$txt .= '<TD id=PieLista>';
if( $tmp[$n]=='' ){
$Total = ' ';
}else{
$Total = 0;
for( $f=0; $f<count($DimValor); $f++ ){
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
if( substr_count( $tmpFormato[$n], 'M' ) == 1 && strlen($tmpFormato[$n])<4 ){
if( strlen($tmpFormato[$n])==2 ){
$txt .= eNumberFormat($Total,$tmpFormato[$n][1]);
}else{
$txt .= eNumberFormat($Total);
}
}else if( substr_count( $tmpFormato[$n], 'm' ) == 1 && strlen($tmpFormato[$n])<4 ){
if( strlen($tmpFormato[$n])==2 ){
$txt .= eNumberFormat($Total,$tmpFormato[$n][1]);
}else{
$txt .= eNumberFormat($Total);
}
}else if( $Total != ' ' ){
$txt .= eNumberFormat($Total);
}
}
}
$txt .= '</TABLE>';
$txt .= '</DIV>';
return $txt;
}
?>
