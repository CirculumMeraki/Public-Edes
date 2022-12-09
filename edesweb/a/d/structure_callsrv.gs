<?PHP
[CallSrv] MoverDir
eLngLoad('../../edesweb/lng/structure_def.edf');
if( file_exists('../_datos/config/structure.idf.lng') ) eLngLoad('../_datos/config/structure.idf');
qQuery( "update gs_structure set cd_gs_structure_parent='{$_GET['cPadre']}' where cd_gs_structure={$_GET['MoverDir']}" );
echo '<script type="text/javascript">';
echo 'top.eInfo( window.frameElement.WOPENER, "'.eLng('Directorio Movido').'" );';
echo '</script>';
eEnd();
[CallSrv] BorrarDir
eLngLoad('../../edesweb/lng/structure_def.edf');
if( file_exists('../_datos/config/structure.idf.lng') ) eLngLoad('../_datos/config/structure.idf');
$_DEBUG = 1;
function BorrarHijos( $BorrarDir ){
qQuery( "select * from gs_structure where cd_gs_structure_parent={$BorrarDir}", $p1 );
while( $r=qArray($p1) ){
if( $r['cd_gs_structure_parent'] > 0 ) BorrarHijos( $r['cd_gs_structure'] );
qQuery( "delete from gs_structure where cd_gs_structure={$r['cd_gs_structure']}", $p2 );
}
}
BorrarHijos( $BorrarDir );
qQuery( "delete from gs_structure where cd_gs_structure={$_GET['BorrarDir']}" );
echo '<script type="text/javascript">';
echo 'top.eInfo( window.frameElement.WOPENER, "'.eLng('Directorio Borrado').'" );';
echo '</script>';
eEnd();
[CallSrv] LoadDirGrupo
eHTML('E:$a/d/structure.gs', 'LoadDir');
?>
<SCRIPT type="text/javascript">
function eClearEvent(){
try{
S.eventClear(window);
}catch(e){}
return false;
}
function EditTmp( tmp ){
if( top._Desktop!=undefined ){
top.gsEdit(window, tmp,10);
}
return eClearEvent();
}
function VerIco(){
if( event.ctrlKey && top._Desktop!=undefined ){
top.gsEdit(window, '$a/d/structure.gs',10);
return eClearEvent();
}
return true;	}
document.oncontextmenu = VerIco;
document.ondblclick = function anonymous(){ top._Reload(window); }
top.eLoading(false,window);
</SCRIPT>
</head><body><script type="text/javascript">
var _WOPENER = window.frameElement.WOPENER;
var DimFolder = new Array();
DimFolder[0] = "<img src='edes.php?R:/_datos/config/2_0.gif' class='n0' cElemento=15268 cPadre=15267 SC=0 CNT='S' Tipo='2' Hijos='0'>00010000·COMISIONES OBRERAS DE ANDALUCIA";
DimFolder[1] = "<img src='edes.php?R:/_datos/config/2_0.gif' class='n0' cElemento=15335 cPadre=15267 SC=0 CNT='S' Tipo='2' Hijos='0'>00020000·COMISIONES OBRERAS DE ARAGON";
DimFolder[2] = "<img src='edes.php?R:/_datos/config/2_0.gif' class='n0' cElemento=15348 cPadre=15267 SC=0 CNT='S' Tipo='2' Hijos='0'>00030000·COMISIONES OBRERAS DE ASTURIAS"	;
DimFolder[3] = "<img src='edes.php?R:/_datos/config/2_0.gif' class='n0' cElemento=15360 cPadre=15267 SC=0 CNT='S' Tipo='2' Hijos='0'>00040000·COMISIONES OBRERAS DE CANTABRIA";
if( DimFolder.length > 0 ){
var TABLA = _WOPENER.document.children[<?=$DesdeTABLE?>];
var TR = TABLA.insertRow(<?=$DesdeTR+1?>);
var TD = TR.insertCell(0);
TD.innerHTML = '<table id="Compartir2" class="n<?=$Indent?>" style="border:1px dashed red"><tr><th>Grupo</table>';
var pTD = TD.children[0];
for( var n=DimFolder.length-1; n>=0; n-- ){
var TR = pTD.insertRow(1);
var TD = TR.insertCell(0);
TD.innerHTML = DimFolder[n];
}
TABLA.rows[8].cells[0].children[0].src = TABLA.rows[8].cells[0].children[0].src.replace('_0.gif','_1.gif');
}
_WOPENER.eLoadingObj();
</script>
<?PHP
eEnd();
[CallSrv] LoadDir
if( $cd_gs_group=='' ) $cd_gs_group = 0;
echo '<script type="text/javascript">';
echo 'var _WOPENER = window.frameElement.WOPENER;';
echo 'var DimFolder = new Array();';
qQuery( "select A.*, T.container from gs_structure A, gs_tstructure T where A.cd_gs_structure_parent={$_GET['LoadDir']} and A.cd_gs_tstructure=T.cd_gs_tstructure order by T.sort,A.nm_gs_structure" );
$n=0;
while( $r=qArray() ){
$TieneHijos = ( ( qCount( 'gs_structure', "cd_gs_structure_parent={$r['cd_gs_structure']}", $p ) > 0 ) ? '_0' : '_1' );
$Sufijo = $TieneHijos;
$r['mfilter'] = trim($r['mfilter']);
echo "DimFolder[{$n}] = ".'"';
$SeCargo = (($TieneHijos=='_0')?0:1);
echo "<img src='edes.php?R:/_datos/config/{$r['cd_gs_tstructure']}{$Sufijo}.gif' class='n{$Indent}' cElemento={$r['cd_gs_structure']} cPadre={$r['cd_gs_structure_parent']} SC={$SeCargo} CNT='{$r['container']}' Tipo='{$r['cd_gs_tstructure']}' User='{$r['cd_gs_user']}' Hijos='".substr($TieneHijos,1)."' Filter='{$r['mfilter']}'>".trim($r['nm_gs_structure']);
if( $r['cd_gs_user'] > 0 ){
qQuery( "select user_name,user_surname, email from gs_user where cd_gs_user='{$r['cd_gs_user']}'", $p1 );
$nm = qRow($p1);
if( trim($nm[0])!='' ) echo  '|'.trim($nm[0]).' '.trim($nm[1]).' ('. trim($nm[2]).')';
}
echo '";';
$n++;
}
?>
if( DimFolder.length > 0 ){
var TABLA = _WOPENER.document.children[<?=$DesdeTABLE?>];
for( var n=DimFolder.length-1; n>=0; n-- ){
var TR = TABLA.insertRow(<?=$DesdeTR+1?>);
var TD = TR.insertCell(0);
var Datos = DimFolder[n].split('|');
TD.innerHTML = Datos[0];
if( Datos.length==2 ){
TD = TR.insertCell(1);
TD.innerHTML = Datos[1];
}else{
TD.colSpan = 2;
if( TD.children[0].CNT=='S' ) TR.className = 'oC';
}
}
<?PHP  if( $DesdeTR > 0 ){ ?>
TABLA.rows[<?=$DesdeTR?>].cells[0].children[0].src = TABLA.rows[<?=$DesdeTR?>].cells[0].children[0].src.replace('_0.gif','_1.gif');
<?PHP  } ?>
}
_WOPENER.eLoadingObj();
</script>
<?PHP
eEnd();
[CallSrv] ModificarDir
eLngLoad('../../edesweb/lng/structure_def.edf');
if( file_exists('../_datos/config/structure.idf.lng') ) eLngLoad('../_datos/config/structure.idf');
if( eSqlType('oracle') ) $ModificarDir = str_replace("'","''",$ModificarDir);
$_DEBUG = 1;
qQuery( "update gs_structure set nm_gs_structure='{$_GET['ModificarDir']}', cd_gs_tstructure={$_GET['Tipo']}, cd_gs_user='{$_GET['User']}', mfilter='{$_GET['Filter']}' where cd_gs_structure={$_GET['cElemento']}" );
?>
<script type="text/javascript">
var _WOPENER = window.frameElement.WOPENER;
top.eInfo(_WOPENER,'<?=eLng('Directorio Modificado')?>');
</script>
<?PHP
eEnd();
[CallSrv] CrearDir
eLngLoad('../../edesweb/lng/structure_def.edf');
if( file_exists('../_datos/config/structure.idf.lng') ) eLngLoad('../_datos/config/structure.idf');
if( eSqlType('oracle') ) $CrearDir = str_replace("'","''",$CrearDir);
if( $cd_gs_group=='' ) $cd_gs_group = 0;
$Ahora = date('Y-m-d H:i:s');
qQuery( "insert into gs_structure (    nm_gs_structure   , cd_gs_tstructure, cd_gs_structure_parent, cdi_insert, cdi_update, mfilter )
values ( '{$_GET['CrearDir']}',  {$_GET['Tipo']},     {$_GET['cPadre']} , '{$Ahora}', '{$Ahora}', '{$_GET['Filter']}' )" );
$Id = qId();
?>
<script type="text/javascript">
var _WOPENER = window.frameElement.WOPENER;
_WOPENER.document.children[<?=$SourceIndex?>].cElemento = <?=$Id?>;
top.eInfo(_WOPENER,'<?=eLng('Directorio Creado')?>');
</script>
<?PHP
eEnd();
?>
