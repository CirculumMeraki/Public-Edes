<?PHP
$_DEBUG = 30;
$_Rastrear = false;
include_once( $Dir_.$_Sql.'.inc' );
$_LogUser = trim(stripcslashes($_GET['_LogUser']));
if( $_LogUser[0]=='"' || $_LogUser[0]=="'" ) $_LogUser = substr($_LogUser,1);
if( substr($_LogUser,-1)=='"' || substr($_LogUser,-1)=="'" ) $_LogUser = substr($_LogUser,0,-1);
list( $DatosDB ) = explode( '&', $_SERVER['QUERY_STRING'] );
$Datos = explode( '|', $DatosDB );
$Tabla = $Datos[0];
$Indice = $Datos[1];
$DimIndice = explode(',',$Indice);
$Condicion = '';
if( $_Rastrear ) echo 'Tabla: '.$Tabla.'<br>Indice: '.$Indice.'<br>';
$IndiceLog = '';
for( $n=2; $n<count($Datos); $n++ ){
if( $Condicion != '' ) $Condicion .= ' and ';
$Condicion .= trim($DimIndice[$n-2]).'="'.$Datos[$n].'"';
$IndiceLog .= $Datos[$n];
if( $_Rastrear ) echo 'Buscar: '.$Datos[$n].'<br>';
}
if( $_Rastrear ) echo 'Condicion: '.$Condicion.'<br><br>';
if( $_Rastrear ) echo '_LogUser: '.$_LogUser.'<BR><BR>';
$Mostrar = array();
$Tipo = count(explode('|',$_LogUser));
if( $_Rastrear ) echo 'Tipo: '.$Tipo.'<br>';
if( $Tipo == 3 ){
list( $Prefijos, $Campos, $Label ) = explode( '|', $_LogUser );
$DimPrefijos = explode( ',', $Prefijos );
$DimCampos = explode( ',', $Campos );
$DimLabel = explode( ',', $Label );
for( $n=0; $n<count($DimCampos); $n++ ){
$Campos = trim($DimPrefijos[0]).trim($DimCampos[$n]).', '.trim($DimPrefijos[1]).trim($DimCampos[$n]);
if( $_Rastrear ) echo 'SQL: '."select {$Campos} from {$Tabla} where {$Condicion}".'<br>';
if( qQuery( "select {$Campos} from {$Tabla} where {$Condicion}" ) != -1 ){
$r=qRow();
$Fecha = trim($r[0]);
if( $_Rastrear ){
echo $DimPrefijos[0].$DimCampos[$n].' = '.eDataFormat($Fecha,"F4").'<br>';
echo $DimPrefijos[1].$DimCampos[$n].' = '.$r[1].'<br>';
}
if( $_Rastrear ) echo 'SQL: '."select user_name, user_surname from gs_user where cd_gs_user='{$r[1]}'".'<br>';
qQuery( "select user_name, user_surname from gs_user where cd_gs_user='{$r[1]}'" );
$r=qRow();
$r[0] = trim($r[0]);
if( $r[0]!='' ){
$NomUsuario = $r[0].' '.trim($r[1]);
}else $NomUsuario = '&nbsp;';
if( $_Rastrear ) echo 'Usuario = '.$NomUsuario.'<br>'.$DimLabel[$n].'<br><br>';
$Mostrar[] = array( $DimLabel[$n], $Fecha, $NomUsuario );
}
}
}else if( $Tipo == 2 ){
list( $Campos, $DimLabel ) = explode( '|', $_LogUser );
$DimCampos = explode( ',', $Campos );
$DimLabel = explode( ',', $DimLabel );
if( $_Rastrear ) echo 'SQL: '."select {$Campos} from {$Tabla} where {$Condicion}".'<br>';
if( qQuery( "select {$Campos} from {$Tabla} where {$Condicion}", $p ) != -1 ){
$r=qRow($p);
$nc = 0;
for($n=0; $n<count($DimLabel); $n++){
$Fecha = trim($r[$nc]);
if( $_Rastrear ){
echo $DimCampos[$nc].' = '.eDataFormat($Fecha, "F4").'<br>';
echo $DimCampos[$nc+1].' = '.$r[$nc+1].'<br>';
}
qQuery( "select user_name, user_surname from gs_user where cd_gs_user='".$r[$nc+1]."'" );
$r2=qRow();
$r2[0] = trim($r2[0]);
if( $r2[0]!='' ){
$NomUsuario = $r2[0].' '.trim($r2[1]);
}else $NomUsuario = '&nbsp;';
if( $_Rastrear ) echo 'Usuario = '.$NomUsuario.'<br>'.$DimLabel[$n].'<br><br>';
$Mostrar[] = array( $DimLabel[$n], $Fecha, $NomUsuario );
$nc += 2;
}
}
}else if( $Tipo == 1 ){
$DimLabel = array();
$tmp = explode(',',$_LogUser);
for( $n=0; $n<count($tmp); $n++ ){
$tmp2 = explode(':',$tmp[$n]);
switch( trim($tmp2[0]) ){
case 'I': $tmp2[0]='A'; break;
case 'U': $tmp2[0]='M'; break;
case 'D': $tmp2[0]='B'; break;
}
$DimLabel[$tmp2[0]] = trim($tmp2[1]);
if( $_Rastrear ) eTrace( $tmp2[0].' = '.trim($tmp2[1]) );
}
$PorTipo = array();
if( $_Rastrear ) echo 'SQL: '."select * from gs_log where tabla='{$Tabla}' and clave='{$IndiceLog}' order by 1".'<br>';
qQuery( "select * from gs_log where tabla='{$Tabla}' and clave='{$IndiceLog}' order by 1" );
while( $rl=qArray() ){
$Fecha = substr($rl['cdi'],0,10);
qQuery( "select user_name, user_surname from gs_user where cd_gs_user='{$rl[cd_gs_user]}'", $p );
$r=qRow($p);
$r[0] = trim($r[0]);
if( $r[0]!='' ){
$NomUsuario = $r[0].' '.trim($r[1]);
}else $NomUsuario = '&nbsp;';
if( $_Rastrear ) echo $DimLabel[$rl['operacion']].' - Usuario = '.$NomUsuario.'<br>';
$PorTipo[$rl['operacion']] = array( $DimLabel[$rl['operacion']], $Fecha, $NomUsuario );
}
foreach( $PorTipo as $k=>$v ) $Mostrar[] = $v;
}else if( $Tipo == 4 ){
list( $xTipo, $Campos, $DimLabel, $cTipo ) = explode( '|', $_LogUser );
if( strtoupper(trim($xTipo))<>'HIDDEN' ) exit;
$DimCampos = explode( ',', $Campos );
$DimLabel = explode( ',', $DimLabel );
$cTipo = explode( ',', str_replace(' ','',$cTipo) );
if( qQuery( "select {$Campos} from {$Tabla} where {$Condicion}", $p ) != -1 ){
$r=qRow($p);
for( $n=0; $n<count($DimLabel); $n++ ){
$cTipo[$n] = strtoupper($cTipo[$n]);
if( $_Rastrear ) echo 'Tipo = '.$cTipo[$n].'<br>';
if( $cTipo[$n][0]=='N' ){
$cTipo[$n] = str_replace('N','',$cTipo[$n])*1;
$Valor = eNumberFormat($r[$n],$cTipo[$n]);
}else if( $cTipo[$n]=='F' ){
$Valor = trim($r[$n]);
if( isZero($Valor) ) $Valor = '&nbsp;';
}else{
$Valor = trim($r[$n]);
}
if( $_Rastrear ) echo $DimCampos[$n].' = '.$Valor.'<br>';
$Mostrar[] = array( $DimLabel[$n], $Valor );
}
}
}
$txt = '<TABLE id=USERINFO border=1px cellspacing=0 cellpadding=3px>';
if( $Tipo <> 4 ){
$Titulo = 'LOG DE USUARIOS';
$txt .= '<TR><TH>&nbsp;</TH><TH>FECHA</TH><TH>USUARIO</TH></TR>';
for( $n=0; $n<count($Mostrar); $n++ ){
$txt .= '<TR><TD>'.$Mostrar[$n][0].'</TD><TD>'.$Mostrar[$n][1].'</TD><TD>'.$Mostrar[$n][2].'</TD></TR>';
}
}else{
$Titulo = 'OTROS DATOS';
$txt .= '<TR><TH>DATO</TH><TH>VALOR</TH></TR>';
for( $n=0; $n<count($Mostrar); $n++ ){
$txt .= '<TR><TD>'.$Mostrar[$n][0].'</TD><TD>'.$Mostrar[$n][1].'</TD></TR>';
}
}
$txt .= '</TABLE>';
if( count($Mostrar) > 0 ){
?>
<SCRIPT type="text/javascript">
top.eAlert( '<?= $Titulo ?>', '<?=$txt?>', 'A' )
</SCRIPT>
<?PHP
}else{
?>
<SCRIPT type="text/javascript">
top.eAlert( '<?= $Titulo ?>', 'Sin información', 'A', 'I' )
</SCRIPT>
<?PHP
}
