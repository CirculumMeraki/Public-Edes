<?PHP
if( $Opcion == 'mR' || $Opcion == 'cR' ){
if( file_exists(eScript($_VarFile.'.lng')) ) eLngLoad($_VarFile);
$Offset = 0;
$AddOffset = 0;
$EsRem = false;
$Ultimo = '';
$Comando = array();
$_VarFile = eScript($_VarFile);
$Dim = file( $_VarFile );
for( $n=0; $n<count($Dim); $n++ ){
$Linea = trim($Dim[$n]);
if( $GLOBALS['_LNGCOL'] > -1 && !(strpos( $Linea, '@' )===false) ){
foreach( $_Lng as $k=>$v ) $Linea = str_replace( "@{$k}@", $v, $Linea );
}
switch( substr($Linea,0,2) ){
case '':
case '<'.'?':
case '?'.'>':
break;
case '/'.'*':
$EsRem = true;
break;
case '*'.'/':
$EsRem = false;
break;
case '/'.'/':
if( !$EsRem ){
if( substr($Linea,2,1)=='[' ){
$tmp = explode(']',substr($Linea,3));
$svar = '_'.strtoupper(trim($tmp[0]));
${$svar} = trim($tmp[1]);
if( $svar == '_HELP' ){
?>
<SCRIPT type="text/javascript">
document.body.onhelp = function anonymous(){ top.gsHelp("<?= strtr( trim($tmp[1]), array('/'=>'_', '\\'=>'_', ' '=>'_') ); ?>",event); };
</SCRIPT>
<?PHP
}
}else{
$_Form[] = array( '-', trim(substr($Linea,2)),'style="color:#000000"','','0' );
}
}
break;
default:
if( !$EsRem ){
if( substr($Linea,0,3) == 'if(' ){
array_push( $Comando, 'if' );
if( $Ultimo == '-' ) $_Form = array_splice($_Form,0,count($_Form)-1);
$tmp = explode('/'.'/',$Linea);
$Label = trim($tmp[1]);
$Offset += 40;
if( $Label!='' ){
$Label = "<span class=if_HR_txt>{$Label}</span>";
}else{
}
$_Form[] = array( '-', $Label, "class=if_HR",'',$Offset ,'','','if','','' );
continue;
}elseif( substr($Linea,0,6) == '}else{' || substr($Linea,0,8) == '}elseif(' || substr($Linea,0,9) == '}else if(' ){
$_Form[] = array( '-', '', "class=if_HR style='width:33%'",'','','','','else','','' );
$Ultimo = 'else';
continue;
}elseif( $Linea[0] == '}' ){
$uComando = array_pop($Comando);
$_Form[] = array( '-', '', "class=if_HR",'',$Offset,'','','end '.$uComando,'','' );
$Ultimo = '-';
$Offset -= 40;
if( $uComando=='switch' ) $Offset -= 40;
continue;
}
if( substr($Linea,0,7) == 'switch(' ){
array_push( $Comando, 'switch' );
$Offset += 40;
$AddOffset = 40;
$tmp = explode('/'.'/',$Linea);
$Label = trim($tmp[1]);
if( $Label!='' ){
$Label = "<span class=if_HR_txt>{$Label}</span>";
}else{
}
$_Form[] = array( '-', $Label, "class=if_HR",'',$Offset ,'','','switch','','' );
continue;
}elseif( substr($Linea,0,5) == 'case ' || substr($Linea,0,8) == 'default:' ){
$Offset += $AddOffset;
$AddOffset = 0;
$tmp = explode('/'.'/',$Linea);
$Label = trim($tmp[1]);
if( $Label!='' ){
$Label = "<span class=if_HR_txt>{$Label}</span>";
if( substr($Linea,0,5) == 'case ' ){
$_Form[] = array( '-', $Label, "class=if_HR",'','80','','','case'   ,'','' );
}else{
$_Form[] = array( '-', $Label, "class=if_HR",'','80','','','default','','' );
}
}else{
$_Form[] = array( '-', $Label, "class=if_HR",'','80','','','default','','' );
}
continue;
}
$Ultimo = '';
$p = strpos($Linea,'=');
if( ($p.'')=='' ) continue;
$tmp = array( substr($Linea,0,$p), substr($Linea,$p+1) );
$NomVar = trim($tmp[0]);
$NomVar = substr($NomVar,1);
$p = strpos($tmp[1],';');
$tmp = array( substr($tmp[1],0,$p), substr($tmp[1],$p+1) );
$Valor = trim($tmp[0]);
if( $Valor[0] == "'" || $Valor[0] == '"' || substr($Valor,0,6)=='array(' ){
if( substr($Valor,0,6) != 'array(' ) $Valor = substr($Valor,1,-1);
$Edicion = '#X';
$Control = 'T';
$Ancho = '150:50';
if( $Valor[0]=='#' && strlen($Valor)==7 ){
$Ancho = '7';
$Edicion = 'c'.$n;
$GLOBALS['_CHR'][] = array( 'c'.$n, 'U', '#0123456789ABCDEF' );
$_ADDCODE['c'.$n]['A'] = '<img src="g/t_color.png" onclick="eColorSelect()">';
$_JSEND .= "eGO('c{$n}').style.backgroundColor = eGF('c{$n}');";
$_JSEND .= "eGO('c{$n}').style.color = top.eColorContrastBW(eGF('c{$n}'));";
$_JSEND .= "eGO('c{$n}').onchange = function anonynous(){ eGO('c{$n}').style.color = top.eColorContrastBW(eGF('c{$n}')); };";
}
}elseif( $Valor == 'true' || $Valor == 'false' ){
$Edicion = '#X';
$Control = 'c';
$Ancho = 1;
$Valor = ( $Valor == 'true' ) ? 'S':'';
}elseif( substr_count( '-0123456789', $Valor[0] ) == 1 ){
$Edicion = ($Valor[0]=='-') ? '-':'+';
$Control = 'T';
$Ancho = 10;
if( substr_count( $Valor, '.' ) == 1 ){
$Ancho .= ','.(strlen($Valor)-strpos($Valor,'.')-1);
$Edicion .= ',';
}
}else{
$Edicion = '#X';
$Control = 'T';
$Ancho = '150:50';
}
$p = strpos($tmp[1],'/'.'/');
$tmp = array( substr($tmp[1],0,$p), substr($tmp[1],$p+2) );
$NomVar = trim($tmp[0]);
$NomVar = 'c'.$n;
$Label = trim($tmp[1]);
if( $Label[0]=='?' ){
$Label = trim(substr($Label,1));
}
$Modo = 'M';
if( $Label[0]=='-' ){
$Label = trim(substr($Label,1));
$Modo = '-';
}if( $Label[0]=='*' ) continue;
if( $Label[0]=='[' ){
list($Select,$Label) = explode( ']',$Label);
list(,$Select) = explode( '[',$Select);
if( trim($Select)=='*' ){
$Control = 'T';
$Edicion = '#X';
}else{
$_ADDOPTION[$NomVar] = $Select;
$Control = 'SV';
$tmp = explode(';',$Select);
$Ancho = 0;
for( $t=0; $t<count($tmp); $t++ ){
list( ,$tmp2 ) = explode(',',$tmp[$t]);
$Ancho = max( $Ancho, strlen($tmp2) );
}
}
$Label = trim($Label);
}
list( $Label, $AddCode ) = explode(chr(92).chr(92),$Label);
if( $AddCode!='' ) $_ADDCODE[$NomVar]['A'] .= $AddCode;
if( trim($Label) == '' ) $Modo = '*';
$_Form[] = array( $Label, $NomVar, $Edicion, $Control, $Ancho, '', $Modo, '', '', '', 1 );
$_Fila[$NomVar] = $Valor;
}
}
}
$FileJS = str_replace('.ini','.js',$_VarFile);
if( file_exists( $FileJS ) ){
$fd = fopen( $FileJS, 'r' );
$_JSEND .= fread( $fd, filesize($FileJS) );
fclose($fd);
}
return;
}else if( $Opcion == 'M' ){
$DimNomVar = array_keys($_POST);
$DimValor  = array_values($_POST);
$DimVarFile = array();
for( $n=0; $n < count($DimNomVar); $n++ ){
$DimVarFile[$DimNomVar[$n]] = trim(urldecode(stripslashes( str_replace('&gt;','>',$DimValor[$n]) )));
}
$txt = '';
$EsRem = false;
$_VarFile = eScript($_VarFile);
$Dim = file( $_VarFile );
for( $n=0; $n<count($Dim); $n++ ){
$Linea = trim($Dim[$n]);
$Dim[$n] = chop($Dim[$n]);
switch( substr($Linea,0,2) ){
case '':
case '<'.'?':
case '?'.'>':
case '/'.'/':
$txt .= $Dim[$n]."\n";
break;
case '/'.'*':
$txt .= $Dim[$n]."\n";
$EsRem = true;
break;
case '*'.'/':
$txt .= $Dim[$n]."\n";
$EsRem = false;
break;
default:
if( !$EsRem ){
if( substr($Linea,0,3) == 'if(' || substr($Linea,0,6) == '}else{' || $Linea[0] == '}' || substr($Linea,0,7) == 'switch(' || substr($Linea,0,5) == 'case ' || substr($Linea,0,8) == 'default:' ){
$txt .= $Dim[$n]."\n";
continue;
}
$p = strpos($Linea,'=');
if( $p.''==''){
$txt .= $Dim[$n]."\n";
continue;
}
$tmp = array( substr($Linea,0,$p), substr($Linea,$p+1) );
$NomVar = trim($tmp[0]);
$NomVar = substr($NomVar,1);
$Margen = substr($Dim[$n],0,strpos($Dim[$n],'$'.$NomVar));
$p = strpos($tmp[1],';');
$tmp = array( substr($tmp[1],0,$p), substr($tmp[1],$p+1) );
$Valor = trim($tmp[0]);
$xNomVar = 'c'.$n;
$xNomVar = $NomVar;
if( $Valor[0] == "'" || $Valor[0] == '"' ){
$Valor = $Valor[0].$DimVarFile[$xNomVar].$Valor[0];
}elseif( $Valor == 'true' || $Valor == 'false' ){
$Valor = ( $DimVarFile[$xNomVar] == 'S' ) ? 'true':'false';
}elseif( substr_count( '-0123456789', $Valor[0] ) == 1 ){
$Valor = $DimVarFile[$xNomVar]*1;
}else{
$Valor = $DimVarFile[$xNomVar];
}
$tmp = explode('/'.'/',$tmp[1]);
$Label = trim($tmp[1]);
if( $Label != '' ) $Label = "\t\t".'/'.'/'.$Label;
$txt .= $Margen.'$'.$NomVar.' = '.$Valor.';'.$Label."\n";
}else{
$txt .= $Dim[$n]."\n";
}
}
}
if( file_exists($_VarFile.'.bak') != 1 ) unlink( $_VarFile.'.bak' );
rename( $_VarFile, $_VarFile.'.bak' );
file_put_contents( $_VarFile, $txt );
eMessage( 'FICHERO MODIFICADO', 'HS' );
}else{
eMessage( 'Acción no soportada', 'HSE' );
}
?>
