<?PHP
if( !isset($_SESSION['_User']) ) exit;
if( $_gsID != getmypid() ) exit;
?>
<SCRIPT type="text/javascript" SRC="edes.php?R:$edes.js&j=6"></SCRIPT>
<?PHP
$DimOk = array();
$DimAyuda = array( '../../edesweb/h/i/label.ind' );
$pnt = fopen( '../../edesweb/t/dll/sintaxis.edes.xml', "w" );
$txt = file_get_contents('../../edesweb/t/dll/_h_sintaxis.edes.xml');
fputs( $pnt, $txt."\n" );
for( $nFile=0; $nFile<count($DimAyuda); $nFile++ ){
$Dim = file($DimAyuda[$nFile]);
$Dim[] = '';
for( $n=0; $n<count($Dim)-1; $n++ ){
$nTab = strlen($Dim[$n])-strlen(ltrim($Dim[$n]));
if( $nTab >= strlen($Dim[$n+1])-strlen(ltrim($Dim[$n+1])) ){
$txt = trim($Dim[$n]);
if( $txt<>'' && $txt[0]<>"." && substr_count($txt,' ')==0 ){
if( substr_count($txt,'+') > 0 ){
list( $iz, $dch ) = explode('+',$txt);
$txt = $dch.$iz;
}else if( substr_count($txt,'{') > 0 ){
list( $iz, $dch ) = explode('{',$txt);
$txt = substr($dch,0,-1);
}else{
}
$txt = strtolower($txt).'.htm';
if( !file_exists( '../../edesweb/h/'.$txt ) ){
eTrace( '--- NO FILE ---> '.$txt );
}else{
$txt = trim($txt);
if( substr_count( $txt, ' ' )==0 ){
Desmenuza( '../../edesweb/h/'.$txt, $pnt );
}else{
eTrace( '--- NO ---> '.$txt );
}
}
}
}
}
}
fputs( $pnt, "</manual>\n" );
fputs( $pnt, "</edesSyntax>\n" );
fclose($pnt);
echo '<script type="text/javascript">top.eLoading(0);</script>';
echo '<br>';
eTrace( '=== XML GENERADO ===' );
eEnd();
function Desmenuza( $File, $pnt ){
global $DimOk;
$txt = file_get_contents($File);
$Comando = Trozo( $txt, ' id=Etiqueta>' );
if( $Comando=='' ){
eTrace( '--- NO ---> '.$File );
return '';
}
if( $Comando=='fields' ) continue;
if( isset($DimOk[$Comando]) ){
eTrace( '------> DOBLE ------> '.$Comando );
return;
}else{
$DimOk[$Comando] = 1;
}
$Sintaxis = Trozo( $txt, ' id=Sintaxis>' );
$Descripcion = Trozo( $txt, ' id=Descripcion>' );
$sParametros = Trozo( $txt, ' id=Parametro>', '<TD id=tEjemplo>', '<TR>' );
$Parametros = '';
$Dim = Opciones( $sParametros, ' id=Opciones' );
for( $n=0; $n<count($Dim); $n+=2 ){
$Dim[$n] = trim(str_replace('&nbsp;',' ',$Dim[$n]));
$Parametros .= '<'.$Dim[$n].'><![CDATA['.$Dim[$n+1].']]></'.$Dim[$n].'>';
}
$Grabar = '<tag name="'.strtolower($Comando).'">'."\n".
"\t".'<tpl>general</tpl>'."\n".
"\t".'<tpl_body>general_body</tpl_body>'."\n".
"\t".'<tagName>'.$Comando.'</tagName>'."\n".
"\t".'<istag>1</istag>'."\n".
"\t".'<syntax>'.$Sintaxis.'</syntax>'."\n".
"\t".'<desc><![CDATA['.$Descripcion.']]></desc>'."\n".
"\t".'<paramSeparator>|</paramSeparator>'."\n".
"\t".'<multiline>0</multiline>'."\n".
"\t".'<lang></lang>'."\n".
"\t".'<params>'."\n".$Parametros."\n".
"\t".'</params>'."\n".
'</tag>'."\n\n";
fputs( $pnt, $Grabar );
}
function Trozo( $txt, $Buscar, $Hasta='<', $Hasta2='' ){
$i = strpos( $txt, $Buscar );
if( getType($i)<>'integer' ) return '';
$i += strlen($Buscar);
$f = strpos( $txt, $Hasta, $i );
$Encontrado = trim(substr( $txt, $i, $f-$i ));
$Encontrado = str_replace( '&nbsp;',' ',$Encontrado);
if( $Hasta2!='' ){
$f = strrpos( $Encontrado, $Hasta2 );
$Encontrado = trim(substr( $Encontrado, 0, $f ));
}
return trim( $Encontrado );
}
function Opciones( $txt, $Buscar, $Hasta='</TABLE', $Hasta2='' ){
$i = strpos( $txt, $Buscar );
if( getType($i)<>'integer' ) return array();
$i += strlen($Buscar);
$f = strpos( $txt, $Hasta, $i );
$Encontrado = trim(substr( $txt, $i, $f-$i ));
$Encontrado = str_replace( '&nbsp;',' ',$Encontrado);
$Dim = array();
$i = 0;
while( true ){
$i = strpos( strtoupper($Encontrado), '<TD', $i );
if( getType($i)<>'integer' ) break;
$i = strpos( strtoupper($Encontrado), '>', $i ) + 1;
$f = strpos( $Encontrado, '</', $i );
$sEncontrado = trim(substr( $Encontrado, $i, $f-$i ));
$Dim[] = strip_tags( $sEncontrado );
}
return $Dim;
}
?>
