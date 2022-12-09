<?PHP
function CondiSQL($Campo, $Valor){
if( strlen($Valor)==0 ) return "";
global $_Sql, $_SqlPDOType, $_Mode;
if( eSqlType('oracle') ) return CondiSQLOracle($Campo, $Valor);
if( $Valor=="<"  ) $Valor = "<=";
if( $Valor=="="  ) $Valor = "<=";
if( $Valor=="<>" ) $Valor = ">";
if( substr_count($Campo,'[]')>0 ){
$Campo = str_replace('[]', '', $Campo);
$n = substr_count($Valor, '|')+1;
if( $n==1 ){
return $Campo.'="'.$Valor.'" ';
}else{
$DimValor = explode('|' ,$Valor);
$Busca = '';
for($i=0; $i<$n; $i++){
if( $Busca!='' ) $Busca .= ' or ';
$Busca .= $Campo . '="'. $DimValor[$i] .'" ';
}
return ' ( '.$Busca.' ) ';
}
}
if( !eSqlType('pdo.informix') ){
if( strlen($Valor)==10 && substr($Valor,2,1)=='-' && substr($Valor,5,1)=='-' ){
$Valor = substr($Valor,6,4).substr($Valor,2,4).substr($Valor,0,2);
}
}
if( preg_match('/(A|B|M)/', $_Mode) ){
}else if( substr_count($Valor,'*')>0 || substr_count($Valor,'?')>0 ){
return $Campo. ' like "'.str_replace('*','%',str_replace('?','_',$Valor)).'" ';
}elseif( $Valor=='=' ){
return '('.$Campo." is null or ".$Campo."='')";
}elseif( $Valor=='>' ){
return $Campo.">' ' ";
}elseif( $Valor=='<' || strtoupper($Valor)=='NULL' || $Valor=='<=' ){
return '('.$Campo." is null or ".$Campo."='')";
}elseif( $Valor=='<>' ){
return $Campo." is not null ";
}elseif( $Valor[0]=='[' ){
return $Campo. " matches '" .$Valor."' ";
}elseif( $Valor[0]=='(' ){
$seBusca = true;
if( $seBusca ){
$Valor = str_replace('.',',',substr($Valor,1,strlen($Valor)-2));
$Valor = str_replace('&#46;','.',$Valor);
$Valor = str_replace('&#39;',"'",$Valor);
$Valor = str_replace('&quot;','"',$Valor);
$Valor = str_replace(chr(92)."'","'",$Valor);
$Valor = str_replace(chr(92).'"','"',$Valor);
if( substr_count($Valor,"'")%2<>0 || substr_count($Valor,'"')%2<>0 ){
eInit();
eEnd();
}
if( strtoupper(substr($Valor,0,5))=='NULL,' ){
$Valor = substr($Valor,5);
return '('.$Campo. ' in (' .$Valor. ') or '.$Campo.' is null)';
}else if( strtoupper(substr($Valor,-5))==',NULL' ){
$Valor = substr($Valor,0,-5);
return '('.$Campo. ' in (' .$Valor. ') or '.$Campo.' is null)';
}
}
return $Campo. ' in (' .$Valor. ') ';
}elseif( $Valor[0]==')' ){
$seBusca = true;
if( $seBusca ){
$Valor = str_replace('.',',',substr($Valor,1,strlen($Valor)-2));
$Valor = str_replace('&#46;','.',$Valor);
$Valor = str_replace('&#39;',"'",$Valor);
$Valor = str_replace('&quot;','"',$Valor);
$Valor = str_replace(chr(92)."'","'",$Valor);
$Valor = str_replace(chr(92).'"','"',$Valor);
if( substr_count($Valor,',')==0 || substr_count($Valor,"'")%2<>0 || substr_count($Valor,'"')%2<>0 ){
eInit();
eEnd();
}
if( strtoupper(substr($Valor,0,5))=='NULL,' ){
$Valor = substr($Valor,5);
return '('.$Campo. ' not in (' .$Valor. ') and '.$Campo.' is not null)';
}else if( strtoupper(substr($Valor,-5))==',NULL' ){
$Valor = substr($Valor,0,-5);
return '('.$Campo. ' not in (' .$Valor. ') and '.$Campo.' is not null)';
}
}
return $Campo. ' not in (' .$Valor. ') ';
}
if( substr_count($Valor,'||')>0 ){
return $Campo. " in ('".str_replace('||',"','",$Valor)."') ";
}
if( $Valor[0]==',' && substr($Valor,-1)==',' && $Valor!=',' ){
$Valor = substr($Valor,1,-1);
$txt = ' ( ';
$tmp = explode(',',$Valor);
for( $i=0; $i<count($tmp); $i++ ){
if( $i>0 ) $txt .= ' and ';
$txt .= $Campo." like '%,".$tmp[$i].",%'";
}
$txt .= ' ) ';
return $txt;
}
$uc = false;
$nc = 0;
$nValor = '';
for($i=0; $i<strlen($Valor); $i++){
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
$par = explode('|',$nValor);
for($i=0; $i<count($par); $i++){
$par[$i] = trim($par[$i]);
if( !eSqlType('informix') ){
if( !eSqlType('oracle') && strlen($par[$i])==10 && substr($par[$i],2,1)=='-' && substr($par[$i],5,1)=='-' ){
$par[$i] = substr($par[$i],6,4).substr($par[$i],2,4).substr($par[$i],0,2);
}
}
if( $par[$i]!='' ) $DimPar[] = $par[$i];
}
switch( count($DimPar) ){
case 1:
if( $nc > 0 ){
$Busca = $Campo . $DimPar[0] .'"" ';
}else{
$Busca = $Campo . '="'. $Valor .'" ';
}
break;
case 2:
$Busca = $Campo . $DimPar[0].'"'. $DimPar[1] .'" ';
break;
default:
if( count($DimPar) == 4 ){
if( substr_count($DimPar[1],'" and ')==1 ){
return( $Campo . $DimPar[0].'"'. $DimPar[1].$DimPar[2].$DimPar[3] .'"' );
}
if( substr_count($DimPar[1],"' and ")==1 ){
return( $Campo . $DimPar[0]."'". $DimPar[1].$DimPar[2].$DimPar[3] ."'" );
}
}
$Busca = '';
$BuscaAnd = '';
$BuscaOr = '';
$NumAnd = 0;
$NumOr = 0;
$ConMayor = false;
$ConMenor = false;
for($i=0; $i<count($DimPar); $i+=2){
if( substr_count( $DimPar[$i],'>' ) > 0 ){
$ConMayor = true;
if( $ConMenor ){
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i]."'". $DimPar[$i+1] ."' ";
$NumOr++;
}else{
if( $BuscaAnd!='' ) $BuscaAnd .= ' and ';
$BuscaAnd .= $Campo . $DimPar[$i]."'". $DimPar[$i+1] ."' ";
$NumAnd++;
}
}else if( substr_count( $DimPar[$i],'<' ) > 0 ){
$ConMenor = true;
if( $ConMayor ){
if( $BuscaAnd!='' ) $BuscaAnd .= ' and ';
$BuscaAnd .= $Campo . $DimPar[$i]."'". $DimPar[$i+1] ."' ";
$NumAnd++;
}else{
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i]."'". $DimPar[$i+1] ."' ";
$NumOr++;
}
}else{
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i]."'". $DimPar[$i+1] ."' ";
$NumOr++;
}
}
if( $BuscaAnd!='' && $BuscaOr!='' ){
$Busca = '(';
if( $NumAnd > 1 ){
$Busca .= '( '.$BuscaAnd.' )';
}else{
$Busca .= $BuscaAnd;
}
$Busca .= ' or '.$BuscaOr.')';
}else if( $BuscaOr!='' ){
$Busca = '( '.$BuscaOr.' )';
}else if( $BuscaAnd!='' ){
$Busca = $BuscaAnd;
}
break;
}
return $Busca;
}
function CondiSQLOracle($Campo, $Valor){
if( strlen($Valor)==0 ) return "";
global $_Sql, $Opcion, $_Mode;
if( $Valor=="<"  ) $Valor = "<=";
if( $Valor=="="  ) $Valor = "<=";
if( $Valor=="<>" ) $Valor = ">";
if( substr_count($Campo,'[]')>0 ){
$Campo = str_replace( '[]', '', $Campo );
$n = substr_count( $Valor, '|' )+1;
if( $n==1 ){
return $Campo . "='". str_replace("'","''",$Valor) ."' ";
}else{
$DimValor = explode('|',$Valor);
$Busca = '';
for( $i=0; $i<$n; $i++ ){
if( $Busca!='' ) $Busca .= ' or ';
$Busca .= $Campo . "='". str_replace("'","''",$DimValor[$i]) ."' ";
}
return ' ( '.$Busca.' ) ';
}
}
if( preg_match('/(A|B|M)/', $_Mode) ){
}else if( substr_count($Valor,'*')>0 || substr_count($Valor,'?')>0 ){
return $Campo. " like '" .str_replace('*','%',str_replace("'","''",str_replace('?','_',$Valor)))."' ";
}elseif( $Valor=='=' ){
return '('.$Campo." is null or ".$Campo."='')";
}elseif( $Valor=='>' ){
return $Campo.">' ' ";
}elseif( $Valor=='<' || strtoupper($Valor)=='NULL' || $Valor=='<=' ){
return '('.$Campo." is null or ".$Campo."='')";
}elseif( $Valor=='<>' ){
return $Campo." is not null ";
}elseif( $Valor[0]=='[' ){
return $Campo. " matches '" .str_replace("'","''",$Valor)."' ";
}elseif( $Valor[0]=='(' ){
$seBusca = true;
if( $seBusca ){
$Valor = str_replace('.',',',substr($Valor,1,strlen($Valor)-2));
$Valor = str_replace('&#46;','.',$Valor);
$Valor = str_replace('&#39;',"'",$Valor);
$Valor = str_replace('&quot;','"',$Valor);
$Valor = str_replace(chr(92)."'","'",$Valor);
$Valor = str_replace(chr(92).'"','"',$Valor);
if( substr_count($Valor,"'")%2<>0 || substr_count($Valor,'"')%2<>0 ){
eInit();
eEnd();
}
if( strtoupper(substr($Valor,0,5))=='NULL,' ){
$Valor = substr($Valor,5);
return '('.$Campo. ' in (' .$Valor. ') or '.$Campo.' is null)';
}else if( strtoupper(substr($Valor,-5))==',NULL' ){
$Valor = substr($Valor,0,-5);
return '('.$Campo. ' in (' .$Valor. ') or '.$Campo.' is null)';
}
}
return $Campo. ' in (' .$Valor. ') ';
}elseif( $Valor[0]==')' ){
$seBusca = true;
if( $seBusca ){
$Valor = str_replace('.',',',substr($Valor,1,strlen($Valor)-2));
$Valor = str_replace('&#46;','.',$Valor);
$Valor = str_replace('&#39;',"'",$Valor);
$Valor = str_replace('&quot;','"',$Valor);
$Valor = str_replace(chr(92)."'","'",$Valor);
$Valor = str_replace(chr(92).'"','"',$Valor);
if( substr_count($Valor,',')==0 || substr_count($Valor,"'")%2<>0 || substr_count($Valor,'"')%2<>0 ){
eInit();
eEnd();
}
if( strtoupper(substr($Valor,0,5))=='NULL,' ){
$Valor = substr($Valor,5);
return '('.$Campo. ' not in (' .$Valor. ') and '.$Campo.' is not null)';
}else if( strtoupper(substr($Valor,-5))==',NULL' ){
$Valor = substr($Valor,0,-5);
return '('.$Campo. ' not in (' .$Valor. ') and '.$Campo.' is not null)';
}
}
return $Campo. ' not in (' .$Valor. ') ';
}
if( substr_count($Valor,'||')>0 ){
return $Campo. " in ('".str_replace('||',"','",$Valor)."') ";
}
if( $Valor[0]==',' && substr($Valor,-1)==',' && $Valor!=',' ){
$Valor = substr($Valor,1,-1);
$txt = ' ( ';
$tmp = explode(',',$Valor);
for( $i=0; $i<count($tmp); $i++ ){
if( $i>0 ) $txt .= ' and ';
$txt .= $Campo." like '%,".$tmp[$i].",%'";
}
$txt .= ' ) ';
return $txt;
}
$uc = false;
$nc = 0;
$nValor = '';
for($i=0; $i<strlen($Valor); $i++){
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
$par = explode('|',$nValor);
for($i=0 ; $i<count($par); $i++){
$par[$i] = trim($par[$i]);
if( !eSqlType('oracle') && strlen($par[$i])==10 && substr($par[$i],2,1)=='-' && substr($par[$i],5,1)=='-' ){
$par[$i] = substr($par[$i],6,4).substr($par[$i],2,4).substr($par[$i],0,2);
}
if( $par[$i]!='' ) $DimPar[] = $par[$i];
}
switch( count($DimPar) ){
case 1:
if( $nc > 0 ){
$Busca = $Campo . $DimPar[0] ."'' ";
}else{
$Busca = $Campo . "='". str_replace("'","''",$Valor) ."' ";
}
break;
case 2:
$Busca = $Campo . $DimPar[0]."'". str_replace("'","''",$DimPar[1]) ."' ";
break;
default:
if( count($DimPar) == 4 ){
if( substr_count($DimPar[1],'" and ')==1 ){
return( $Campo . $DimPar[0].'"'. $DimPar[1].$DimPar[2].$DimPar[3] .'"' );
}
if( substr_count($DimPar[1],"' and ")==1 ){
return( $Campo . $DimPar[0]."'". $DimPar[1].$DimPar[2].$DimPar[3] ."'" );
}
}
$Busca = '';
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
$BuscaOr .= $Campo . $DimPar[$i]."'". str_replace("'","''",$DimPar[$i+1]) ."' ";
$NumOr++;
}else{
if( $BuscaAnd!='' ) $BuscaAnd .= ' and ';
$BuscaAnd .= $Campo . $DimPar[$i]."'". str_replace("'","''",$DimPar[$i+1]) ."' ";
$NumAnd++;
}
}else if( substr_count( $DimPar[$i],'<' ) > 0 ){
$ConMenor = true;
if( $ConMayor ){
if( $BuscaAnd!='' ) $BuscaAnd .= ' and ';
$BuscaAnd .= $Campo . $DimPar[$i]."'". str_replace("'","''",$DimPar[$i+1]) ."' ";
$NumAnd++;
}else{
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i]."'". str_replace("'","''",$DimPar[$i+1]) ."' ";
$NumOr++;
}
}else{
if( $BuscaOr!='' ) $BuscaOr .= ' or ';
$BuscaOr .= $Campo . $DimPar[$i]."'". str_replace("'","''",$DimPar[$i+1]) ."' ";
$NumOr++;
}
}
if( $BuscaAnd!='' && $BuscaOr!='' ){
$Busca = '(';
if( $NumAnd > 1 ){
$Busca .= '( '.$BuscaAnd.' )';
}else{
$Busca .= $BuscaAnd;
}
$Busca .= ' or '.$BuscaOr.')';
}else if( $BuscaOr!='' ){
$Busca = '( '.$BuscaOr.' )';
}else if( $BuscaAnd!='' ){
$Busca = $BuscaAnd;
}
break;
}
return $Busca;
}
?>
