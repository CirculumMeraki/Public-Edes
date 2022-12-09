<?PHP
function __SubList( $buffer, $Opcion, $_ObjetoID ){
$SubEtiqueta = trim(substr( $buffer, 1, strpos($buffer,'}')-1 ));
$buffer = trim(str_replace( '{'.$SubEtiqueta.'}', '', $buffer ));
$oBuffer = $buffer;
$tmp = strtoupper($SubEtiqueta);
if( $tmp=='SLSUBMENU' ){
$sTmp = explode('|',$buffer);
if( !eOkMode( $Opcion, $sTmp[0] ) ) return;
$sObjetoID = substr($_ObjetoID,1,-1);
$DimNomOp = array( 'i'=>'Insertar', 'u'=>'Modificar', 'd'=>'Borrar', 'v'=>'Consultar', 'F'=>'Ver documento', 'E'=>'Editar documento', 'FE'=>"Ver documento\\nEditar documento" );
$DimImgOp = array( 'i'=>'insert', 'u'=>'update', 'd'=>'delete', 'v'=>'view', 'F'=>'doc', 'E'=>'doc', 'FE'=>'doc' );
for( $i=0; $i<count($sTmp); $i++ ) $sTmp[$i] = trim($sTmp[$i]);
$buffer = '{slMenu}'.$sTmp[0].'|';
$sTmp[1] = str_replace(' ','',$sTmp[1]);
$Tmp2 = explode(',',$sTmp[1]);
for( $i=0; $i<count($Tmp2); $i++ ){
if( $i>0 ) $buffer .= ',';
$buffer .= $DimNomOp[$Tmp2[$i]].':'.$Tmp2[$i];
}
if( $sTmp[5]=='' ) $sTmp[5] = 'FormOnLine';
$buffer .= "|#||{$sTmp[5]}|";
if( $sTmp[2]!='' ){
if( substr_count($sTmp[1],'F')>0 && substr_count($sTmp[1],'E')>0 ){
$sTmp[1] = str_replace('E,','',str_replace(',E','',$sTmp[1]));
$sTmp[1] = str_replace('F','FE',$sTmp[1]);
$Tmp2 = explode(',',$sTmp[1]);
}
$sTmp[2] = strtoupper($sTmp[2][0]);
$_Objeto[$_ObjetoID]['BeforeAfter'] = $sTmp[2];
$BeforeAfter = $sTmp[2];
$ImgCol = ''; $ConOpDeAlta = false;
for( $i=0; $i<count($Tmp2); $i++ ){
if( $DimImgOp[$Tmp2[$i]]=='' ) continue;
if( $Tmp2[$i]=='FE' ){
$ImgCol .= "<IMG SRC='g/l_op_{$DimImgOp[$Tmp2[$i]]}.gif' title='{$DimNomOp[$Tmp2[$i]]}' onclick=eSLAction('{$sObjetoID}','F') oncontextmenu=eSLAction('{$sObjetoID}','E') style='cursor:url(g/right.cur)'>";
}else if( $Tmp2[$i]!='i' ){
$ImgCol .= "<IMG SRC='g/l_op_{$DimImgOp[$Tmp2[$i]]}.gif' title='{$DimNomOp[$Tmp2[$i]]}' onclick=eSLAction('{$sObjetoID}','{$Tmp2[$i]}')>";
}else if( $Tmp2[$i]=='i' ){
$ConOpDeAlta = true;
}
}
if( $sTmp[3]!='' ) $ImgCol .= $sTmp[3];
$buffer .= $ImgCol;
$_PHPINI .= 'function _ImgSubList'.$sObjetoID.'(){ echo "'.$ImgCol.'";}';
}
if( $sTmp[6]!='' ) $buffer .= '|'. $sTmp[6];
if( !$ConOpDeAlta ){
$i = strpos($_Objeto[ $_ObjetoID ]['SLTH'],'l_op_insert.gif');
$f = strpos($_Objeto[ $_ObjetoID ]['SLTH'],'>',$i)+1;
$i = strrpos(substr($_Objeto[ $_ObjetoID ]['SLTH'],0,$i),'<');
$_Objeto[ $_ObjetoID ]['SLTH'] = substr($_Objeto[ $_ObjetoID ]['SLTH'],0,$i).substr($_Objeto[ $_ObjetoID ]['SLTH'],$f);
}
$SubEtiqueta = trim(substr( $buffer, 1, strpos($buffer,'}')-1 ));
$buffer = trim(str_replace( '{'.$SubEtiqueta.'}', '', $buffer ));
$tmp = strtoupper($SubEtiqueta);
return;
}else	if( $tmp == 'SLJSCHECK' ){
$LeeDFEsRem = false;
$SubEti = $tmp;
for( $i=$nDimFCH+1; $i<count($_DimEDF); $i++ ){
$buffer = ___Lng(trim($_DimEDF[$i]));
if( substr($buffer,0,2)=='/'.'*' && substr_count( $buffer, '*'.'/' ) == 0 ){
$LeeDFEsRem = true;
}else if( $LeeDFEsRem && substr_count( $buffer, '*'.'/' ) > 0 ){
$LeeDFEsRem = false;
$buffer = trim(substr($buffer,strpos($buffer, '*'.'/')+2 ));
if( $buffer=='' ) continue;
}
if( $LeeDFEsRem ) continue;
if( $buffer[0]=="#" || _IsLabel($buffer) ) break;
if( $buffer=='' || substr_count('./',$buffer[0]) > 0 ) continue;
if( substr_count( $buffer, '<'.'?') > 0 && substr_count( $buffer, '?'.'>' ) > 0 ){
while ( substr_count( $buffer, '<'.'?') > 0 && substr_count( $buffer, '?'.'>' ) > 0 ){
$desde = strpos($buffer,'<'.'?');
$hasta = strpos($buffer,'?'.'>');
$Macro = trim(substr( $buffer, $desde+2, $hasta-$desde-2 ));
$oEti = _ExeEval( $Macro, $buffer );
if( substr($Macro,0,11)=='ePermission' || substr($Macro,0,12)=='!ePermission' ) $oEti = (($oEti)?'true':'false');
$buffer = substr( $buffer, 0, $desde ). $oEti .substr( $buffer, $hasta+2 );
}
$_Objeto[ $_ObjetoID ][$SubEti] .= $buffer.$__Enter;
}else{
if( strtoupper(substr($buffer,0,8)) == 'INCLUDE(' ){
$tmp = explode( '(', $buffer );
list( $tmp, ) = explode( ')', $tmp[1] );
$tmp = str_replace("'",'', trim($tmp) );
$tmp = str_replace('"','', $tmp );
$_Objeto[ $_ObjetoID ][$SubEti] .= file_get_contents( trim($tmp) );
}else{
$_Objeto[ $_ObjetoID ][$SubEti] .= $buffer.$__Enter;
}
}
}
return;
}else if( $tmp == 'SLGROUPLABELS' || $tmp == 'SLGL' ){
$DimLabel = explode('|',strtoupper($buffer));
for( $i=0; $i<count($DimLabel); $i++ ){
$DimLabel[$i] = trim($DimLabel[$i]);
if( substr($DimLabel[$i],0,2)!='SL' ) $DimLabel[$i] = 'SL'.$DimLabel[$i];
if( $DimLabel[$i]=='SLFIELDS' ) $DimLabel[$i] = 'SLMENU';
if( $DimLabel[$i]=='SLSQL' ) $iSql = $i;
if( $DimLabel[$i]=='SLALIGN' ) $iAlign = $i;
}
$BeforeAfter = '';
for( $i=$nDimFCH+1; $i<count($_DimEDF); $i++ ){
$buffer = ___Lng(trim($_DimEDF[$i]));
if( $buffer[0]=='[' ) break;
if( strtoupper(substr($buffer,0,11))=='{SLSUBMENU}' ){
list(,$sTmp) = explode('}',$buffer);
$sTmp = explode('|',$sTmp);
if( eOkMode( $Opcion, $sTmp[0] ) ){
$BeforeAfter = strtoupper(trim($sTmp[2]));
$BeforeAfter = $BeforeAfter[0];
$THAddIcon = trim($sTmp[4]);
break;
}
}
}
$LineaGroup = $nDimFCH;
$buffer = ___Lng(trim($_DimEDF[$LineaGroup]));
$tmp = explode('|',$buffer);
$ConComa = false;
if( $BeforeAfter=='B' ){
for( $p=0; $p<count($tmp); $p++ ){
if( $DimLabel[$p]=='SLALIGN' ){
$tmp[$p] = 'C';
}else if( $DimLabel[$p]=='SLSQL' ){
$tmp[$p] = "''";
}else if( $DimLabel[$p]=='SLMENU' ){
$tmp[$p] = "''=IMG";
}else if( $DimLabel[$p]=='SLFORMAT' ){
$tmp[$p] = '_ImgSubList'.substr($_ObjetoID,1,-1).'()';
}else if( $DimLabel[$p]=='SLTYPEDATA' ){
$tmp[$p] = '';
}else if( $DimLabel[$p]=='SLTH' ){
$tmp[$p] = str_replace( ',', '&#44;', "<IMG SRC='g/l_op_insert.gif' title=".'"'.$__Lng[19].'"'." onclick=eSLAction('".substr($_ObjetoID,1,-1)."'&#44;'i')>".str_replace(',','&#44;',$THAddIcon) );
if( substr_count($tmp[$p],chr(92))>0 ){
if( $Opcion=='cR' || $Opcion=='bR' ){
list(,$tmp[$p]) = explode( chr(92), $tmp[$p] );
}else{
list($tmp[$p]) = explode( chr(92), $tmp[$p] );
}
}
}else{
$tmp[$p] = '';
}
if( $ConComa ) $_Objeto[ $_ObjetoID ][$DimLabel[$p]] .= ',';
$_Objeto[ $_ObjetoID ][$DimLabel[$p]] .= trim($tmp[$p]);
}
$ConComa = true;
}
$ConSelect = false;
$LetraAlias = 66;
$MasFrom = '';
for( $i=$nDimFCH+1; $i<count($_DimEDF); $i++ ){
$buffer = ___Lng(trim($_DimEDF[$i]));
$Chr_1 = $buffer[0];
if( $Chr_1 == '¿' ){
list( $tmp9 ) = explode('?',$buffer);
$tmp9 = trim(substr( $tmp9, 1 ));
$buffer = trim( substr( $buffer, strpos( $buffer, '?' )+1 ) );
if( substr($tmp9,0,2) == '#(' ){
list( $tmp9 ) = explode(')',substr($tmp9,2));
$tmp9 = trim($tmp9);
$cModo = explode(',',$tmp9 );
$acc = ( count( array_intersect( $cModo, $DimOpcion ) ) > 0 );
}else if( substr($tmp9,0,3) == '#!(' ){
list( $tmp9 ) = explode(')',substr($tmp9,3));
$tmp9 = trim($tmp9);
$cModo = explode(',',$tmp9 );
$acc = !( count( array_intersect( $cModo, $DimOpcion ) ) > 0 );
}else if( substr($tmp9,0,2) == '#!' ){
$acc = !( $_Variable[str_replace('!','',$tmp9)] );
}else if( $tmp9[0] == '#' ){
$acc = ( $_Variable[$tmp9] );
}else{
$acc = _ExeEval( $tmp9, $buffer );
if( !$acc ) continue;
}
}
if( substr_count('{[',$buffer[0]) > 0 ) break;
if( $buffer=='' || $buffer[0]=='.' || substr($buffer,0,2)=='/'.'/' ) continue;
$ConSelect = false;
$tmp = explode('|',$buffer);
for( $p=0; $p<count($tmp); $p++ ){
$tmp[$p] = trim($tmp[$p]);
if( $DimLabel[$p]=='SLALIGN' && substr_count( $tmp[$p], chr(92) ) > 0 ){
if( substr_count( ',a,mR,', ",{$Opcion}," ) > 0 ){
list( $tmp[$p] ) = explode( chr(92), $tmp[$p] );
}else{
list( ,$tmp[$p] ) = explode( chr(92), $tmp[$p] );
}
}else if( $DimLabel[$p]=='SLMENU' ){
if( $tmp[$p]=='' ) continue;
$tmp[$p] = trim($tmp[$iSql]).'='.$tmp[$p];
}else if( $DimLabel[$p]=='SLTH' ){
$tmp[$p] = str_replace( ',', '&#44;', str_replace('·','<BR>',$tmp[$p]) );
if( substr_count($tmp[$p],chr(92))>0 ){
if( $Opcion=='cR' || $Opcion=='bR' ){
list(,$tmp[$p]) = explode( chr(92), $tmp[$p] );
}else{
list($tmp[$p]) = explode( chr(92), $tmp[$p] );
}
}
}else if( $DimLabel[$p]=='SLTYPEDATA' ){
$tmp[$p] = str_replace( ',', '&#44;', $tmp[$p] );
if( $tmp[$p]=='S' ){
if( substr_count($_Objeto[ $_ObjetoID ][$DimLabel[$iAlign]],',')==0 ){
$_Objeto[ $_ObjetoID ][$DimLabel[$iAlign]] = 'H';
}else{
$_Objeto[ $_ObjetoID ][$DimLabel[$iAlign]] = substr( $_Objeto[ $_ObjetoID ][$DimLabel[$iAlign]], 0, strrpos($_Objeto[ $_ObjetoID ][$DimLabel[$iAlign]], ',' )+1 ).'H';
}
$ConSelect = true;
}
}
if( $ConComa ) $_Objeto[ $_ObjetoID ][$DimLabel[$p]] .= ',';
$tmp[$p] = trim($tmp[$p]);
$_Objeto[ $_ObjetoID ][$DimLabel[$p]] .= $tmp[$p];
}
if( $ConSelect ){
for( $p=0; $p<count($tmp); $p++ ){
$_Objeto[ $_ObjetoID ][$DimLabel[$p]] .= ',';
if( $DimLabel[$p]=='SLSQL' ){
if( $LetraAlias == 66 ) $MasFrom .= ' as A';
$MasFrom .= ' left join '.substr($tmp[$p],3).' as '.chr($LetraAlias).' on A.'.$tmp[$p].'='.chr($LetraAlias).'.'.$tmp[$p];
$tmp[$p] = chr($LetraAlias).'.nm_'.substr($tmp[$p],3);
}else if( $DimLabel[$p]=='SLMENU' ){
list(,$tmp2) = explode('=',$tmp[$p]);
$tmp[$p] = trim($tmp[$iSql]).'=*'.$tmp2;
}
$_Objeto[ $_ObjetoID ][$DimLabel[$p]] .= $tmp[$p];
}
$LetraAlias++;
$ConSelect = false;
}
$ConComa = true;
}
if( $LetraAlias > 66 ){
$txt = '';
$tmp = explode( ',', $_Objeto[ $_ObjetoID ]['SLMENU'] );
for( $p=0; $p<count($tmp); $p++ ){
if( $p>0 ) $txt .= ',';
$tmp[$p] = trim($tmp[$p]);
if( substr_count( $tmp[$p], '.' )==0 ){
if( $tmp[$p][0]!='"' && $tmp[$p][0]!="'" ) $tmp[$p] = 'A.'.$tmp[$p];
}
$txt .= $tmp[$p];
}
$_Objeto[ $_ObjetoID ]['SLMENU'] = $txt;
$txt = '';
$tmp = explode( ',', $_Objeto[ $_ObjetoID ]['SLSQL'] );
for( $p=0; $p<count($tmp); $p++ ){
if( $p>0 ) $txt .= ',';
$tmp[$p] = trim($tmp[$p]);
if( substr_count( $tmp[$p], '.' )==0 ){
if( $tmp[$p][0]!='"' && $tmp[$p][0]!="'" ) $tmp[$p] = 'A.'.$tmp[$p];
}
$txt .= $tmp[$p];
}
$_Objeto[ $_ObjetoID ]['SLSQL'] = $txt;
}
$nDimFCH = $i-2;
if( $BeforeAfter=='A' ){
$buffer = ___Lng(trim($_DimEDF[$LineaGroup]));
$tmp = explode('|',$buffer);
for( $p=0; $p<count($tmp); $p++ ){
if( $DimLabel[$p]=='SLALIGN' ){
$tmp[$p] = 'C';
}else if( $DimLabel[$p]=='SLSQL' ){
$tmp[$p] = "''";
}else if( $DimLabel[$p]=='SLMENU' ){
$tmp[$p] = "''=IMG";
}else if( $DimLabel[$p]=='SLFORMAT' ){
$tmp[$p] = '_ImgSubList'.substr($_ObjetoID,1,-1).'()';
}else if( $DimLabel[$p]=='SLTYPEDATA' ){
$tmp[$p] = '';
}else if( $DimLabel[$p]=='SLTH' ){
$tmp[$p] = str_replace( ',', '&#44;', "<IMG SRC='g/l_op_insert.gif' title=".'"'.$__Lng[19].'"'." onclick=eSLAction('".substr($_ObjetoID,1,-1)."'&#44;'i')>".str_replace(',','&#44;',$THAddIcon) );
if( substr_count($tmp[$p],chr(92))>0 ){
if( $Opcion=='cR' || $Opcion=='bR' ){
list(,$tmp[$p]) = explode( chr(92), $tmp[$p] );
}else{
list($tmp[$p]) = explode( chr(92), $tmp[$p] );
}
}
}else{
$tmp[$p] = '';
}
if( $ConComa ) $_Objeto[ $_ObjetoID ][$DimLabel[$p]] .= ',';
$_Objeto[ $_ObjetoID ][$DimLabel[$p]] .= trim($tmp[$p]);
}
}
return;
}else if( $tmp=='SLSQL' ){
for($i=$nDimFCH+1; $i<count($_DimEDF); $i++){
$tmp2 = trim($_DimEDF[$i]);
if( $tmp2[0]=="{" || $tmp2[0]=="[" ){
$nDimFCH = $i-1;
break;
}else{
$buffer .= ' '.$tmp2;
}
}
list($buffer) = explode('|',$buffer);
if( $LetraAlias > 66 ){
list( $iz, $dch ) = explode( ' where ', $buffer );
$buffer = $iz.$MasFrom.' where A.'.$dch;
list( $iz, $dch ) = explode( ' order by ', $buffer );
$buffer = $iz.' order by A.'.$dch;
}
$buffer = str_replace('  ',' ',$buffer);
if( strtoupper(substr($buffer,0,9))=='SELECT # ' || strtoupper(substr($buffer,0,9))=='SELECT * ' ){
$buffer = 'select '.$_Objeto[ $_ObjetoID ][$tmp].' '.substr($buffer,9);
}else{
list(,,$Cambiar) = explode('|',$buffer);
if( trim($Cambiar)=='#' ) $buffer = str_replace( '|'.$Cambiar.'|', '|'.$_Objeto[ $_ObjetoID ][$tmp].'|', $buffer );
}
if( $Opcion == 'A' ) $_ObjetoSQL[] = $buffer;
$_Objeto[ $_ObjetoID ][$tmp] = $buffer;
}else if( $tmp=='SLMENU' ){
$sMenu = $_Objeto[ $_ObjetoID ]['SLMENU'];
$buffer = str_replace('  ',' ',$buffer);
list($SubOpciones,,$FSFile,,$tmp,$slIMG) = explode('|',$buffer);
if( !eOkMode( $Opcion, $SubOpciones, '' ) ) return;
if( strtoupper(trim($tmp))=='FORMONLINE' ){
$DimCampos = $_Objeto[ $_ObjetoID ]['SLSQL'];
if( strtoupper(substr($DimCampos,0,6))=='SELECT' ) $DimCampos = substr($DimCampos,7);
list( $DimCampos ) = explode( ' from ', $DimCampos );
$DimCampos = str_replace('  ',' ',$DimCampos);
$FSFile = $DimCampos;
}
list(,,$Cambiar) = explode('|',$buffer);
if( trim($Cambiar)=='#' ) $buffer = str_replace( '|'.$Cambiar.'|', '|'.$sMenu.'|', $buffer );
$_Objeto[ $_ObjetoID ]['SLMENU'] = $buffer;
if( $Opcion=='cR' || $Opcion=='bR' ){
$_Objeto[ $_ObjetoID ]['SLVIEWFILE'] = $FSFile;
}
if( eOkMode( $Opcion, $SubOpciones, '' ) ){
global $_SaveList;
if( $slIMG!='' ){
$slIMG = _SubListGetImg($slIMG);
$_OnLineIMG[$_ObjetoID] = $slIMG;
}
if( strtoupper(trim($tmp))=='FORMSTATIC' ){
$_Objeto[ $_ObjetoID ]['FORMSTATIC'] = 1;
$FSFile = trim($FSFile);
if( substr_count($FSFile,'.')==0 ) $FSFile .= '.edf';
include_once($GLOBALS['Dir_'].'formstatic.inc');
$tmp = LeerFormStatic( eScript($FSFile) );
$tmp = str_replace('|#|',"|{$_DBINDEX}|",$tmp);
$_SaveList[] = $tmp;
}else if( strtoupper(trim($tmp))=='FORMONLINE' ){
$_Objeto[ $_ObjetoID ]['FORMSTATIC'] = 0;
global $_OnLineOP, $_DimChildrenData;
$_SaveOnLine[] = substr($_ObjetoID,1,-1).'|'.$FSFile;
$tmp = explode(',',$sMenu);
$uCampo = '';
for( $i=0; $i<count($tmp)-(($BeforeAfter=='A')?1:0); $i++ ){
list( $tmp1, $tmp2 ) = explode('=',$tmp[$i]);
$tmp2 = trim($tmp2);
if( $tmp2=='' ) $tmp2 = trim($tmp1);
if( $tmp2[0]!="'" || $tmp2[0]!='"' ){
$uCampo = '_op_'.substr($_ObjetoID,1,-1);
}
}
if( $tmp2[0]=='*' ){
$_OnLineOP[substr($tmp2,1)] = $uCampo;
}else{
$_OnLineOP[$tmp2] = $uCampo;
}
$dCampos = ''; $oCampos = '';
$tmp = explode(',',$FSFile);
for( $n=0; $n<count($tmp); $n++ ){
list($tmp2) = explode('=',$tmp[$n]);
if( $tmp2[0] != '"' && $tmp2[0] != "'" && $tmp2[0] != '_' ){
if( $LetraAlias > 66 ){
}
$oCampos .= trim($tmp3).',';
$dCampos .= trim($tmp2).',';
}
}
$dCampos = substr($dCampos,0,-1);
list( $_Objeto[ $_ObjetoID ]['SLSQL'], $slIndex, $slFile ) = explode( '|', $_Objeto[ $_ObjetoID ]['SLSQL'] );
$tmp = str_replace( '  ', ' ', $_Objeto[ $_ObjetoID ]['SLSQL'] );
$tmp = explode(' ',$tmp);
for( $n=0; $n<count($tmp); $n++ ){
if( strtoupper($tmp[$n])=='FROM' ){
$slTable = $tmp[$n+1];
if( $tmp[$n+2] == 'as' ) $slTable .= ' '.$tmp[$n+3];
else if( strlen($tmp[$n+2])==1 ) $slTable .= ' '.$tmp[$n+2];
}
if( strtoupper($tmp[$n])=='WHERE' ){
$slIndice = $tmp[$n+1];
if( substr_count($slIndice,'=') > 0 ) list($slIndice) = explode('=',$slIndice);
}
}
$_SaveList[] = $_ObjetoID.'|'.$slTable.'|'.$slIndice.'|'.trim($dCampos).'|'.trim($slIndex).'|'.$oCampos;
$_DimChildrenData[] = array( $_ObjetoID, $sMenu, '','','', $slIMG );
}
}
}else{
$_Objeto[ $_ObjetoID ][$tmp] = $buffer;
}
}
?>
