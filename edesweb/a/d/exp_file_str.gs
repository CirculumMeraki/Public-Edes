<?PHP
_FileNoCache('edes.js');
list( $cdi, $user, $NomFile2 ) = explode('|',$_GET['_SEEK'] );
eInclude($_Sql);
qQuery( "select * from gs_exp_file where cdi='{$cdi}' and cd_gs_user='{$user}'" );
$e = qArray();
list( $Tablas, $Condi ) = explode( '->', urldecode($e['sql_1']).urldecode($e['sql_2']).urldecode($e['sql_3']) );
echo '<u>TABLAS:</u><br>'.$Tablas;
echo '<br><br>';
echo '<u>CONDICION:</u><br>'.$Condi;
echo '<br><br>';
qQuery( "select * from gs_formato where cd_gs_formato='{$e['cd_gs_formato']}'" );
$f = qArray();
$f['formato'] = substr(str_replace('#',',',$f['formato']),0,-1);
$DimOrdCampos = explode(',',$f['formato']);
echo '<u>FORMATO:</u><br>'.$f['formato'];
echo '<br><br>';
$DimCampo = array();
echo '<u>CAMPOS:</u><br>';
if( trim($f['formato'])!='' ){
qQuery( "select * from {$_SESSION['ShareDictionary']}gs_campo where cd_gs_campo in ( {$f['formato']} )" );
while( $c = qArray() ){
$DimCampos[$c['cd_gs_campo']] = $c['tabla'].'.'.$c['campo'].' = '.$c['etiqueta'];
}
for( $n=0; $n<count($DimOrdCampos); $n++ ){
echo (($n<9)?'0':'').($n+1).': '.$DimCampos[$DimOrdCampos[$n]].'<br>';
}
}
echo '<br><u>SQL:</u><br>';
$NomFile = eScript($_DownloadPath.substr($e['fichero'],0,-3).'sql');
if( file_exists( $NomFile ) ) readFile( $NomFile );
echo '<br>';
echo '<br><u>FICHERO:</u><br>';
echo eScript($_DownloadPath.$e['fichero']);
?>
<script type="text/javascript">
top.eSWResize(window);
</script>
