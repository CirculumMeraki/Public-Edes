<?PHP //[_PROTECCION_]
$_ManualIni =  62706;
$_ManualLen =  12361;
if( !isset($_SESSION['_User']) || $_gsID!=getmypid() ) exit;
_HeaderAdd();
$_DirG = 'g/e'; //include_once( $Dir_.'t/lp.gs' );
if( $_SESSION["_gsACCESO"]['ACCESO'] < 1 ) die('Error:73');
if( $_SESSION["_gsACCESO"]['Edit'] < 1 ) die('Error:74');
if( basename(__FILE__)!='30.gs' ) exit;
include( '../_d_/cfg/edes.ini' );
include( "{$Dir_}t/{$_Language}.lng");
$AvisoNewVersion = false;
if( isset($CLAVE) && strlen($CLAVE)==32 ) NewLP( $CLAVE );
$Debug = 0;
$HR = urldecode($HR);
if( $E==2 ){
$_Editar = 2;
}else{
$_Editar = $E;
}
if( $HR=='aboutblank' ) $HR='';
if( $HR=='MENU' ){
CreaMenu();
exit;
}
$_User = $U;
$File = $HR;
$_EtiGFC = $_EtiFCH = '';
$_Directorio = '';
if( $Debug ){
echo '<br>F['.$File.']';
echo '<br>E['.$_Editar.']';
echo '<br>U['.$_User.']';
echo '<br>D['.$_Directorio.']';
}
if( $Debug ) echo '<br>2|'.$File.'|';
$Ext = '.';
if( substr_count( $File, '#' ) > 0 ) $Ext = '.edf';
if( substr_count( $File, '@' ) > 0 ) $Ext = '.gdf';
if( substr_count( $File, '=' ) > 0 || substr_count( $File, '*' ) > 0 ) $Ext = '.edf';
if( substr_count( $File, ':' ) > 0 ) $File = substr( $File, strpos( $File, ':' )+1 );
if( substr_count( $File, '&' ) > 0 ) $File = substr( $File, 0, strpos( $File, '&' ) );
if( substr_count( $File, '?' ) > 0 ) $File = substr( $File, 0, strpos( $File, '?' ) );
if( $File[0] == '^' ) $File = substr( $File, 1 );
$File = trim($File);
if( $Debug ) echo '<br>3|'.$File.'|';
if( $File != '' && substr_count( $File, '.' ) == 0 && $Ext != '.' ) $File .= $Ext;
if( $Debug ) echo '<br>4|'.$File.'|'.substr_count( $File, '>' );
$sFile = $File;
if( $Debug ) echo '<br>5|'.$File.'|';
$_Pagina = array();
$_Nombre = array();
$Titulo = $File.' [' .$HR.']';
ob_start();
ob_implicit_flush(0);
eHTML('$t/30.gs', '', 'gsEdit');
if( $_TipoUsu!='~' ) echo '<script type="text/javascript">document.oncontextmenu = new Function("return false");</SCRIPT>'.$__Enter;
echo '<LINK REL=stylesheet HREF="'.gsCSS('30').'" TYPE="text/css">'.$__Enter;
?>
<SCRIPT type="text/javascript">
function HayError( Descripcion, NomFile, NumLinea ){
var Desde = '';
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
txt += '\t\t\t'+i+' = '+ arg[i] + '\n';
txt += '\t\t\t'+i+' = '+ arg[i].name + '\n';
txt += '\t\t\t'+i+' = '+ arg[i].value + '\n';
}else{
txt += '\t\t\t'+i+' = '+ arg[i] + '\n';
}
}
}else break;
}
}catch(e){}
if( window.ERROR == undefined ) document.body.insertAdjacentHTML("beforeEnd","<IFRAME name='ERROR' src='' width='100' height='100' FRAMEBORDER=0 SCROLLING=no STYLE='display:none; position:absolute; left:0; top:0; z-index:-10;'></IFRAME>" );
ERROR.location.href = 'edes.php?E:$error.gs&ERROR='+escape(txt);
alert( 'ERROR:\t'+Descripcion+'\nNº LINE: '+NumLinea );
_ErrForm = -10;
return true;
}
window.onerror = HayError;
var _SQL = '<?= $_Sql; ?>';
var _Logear = <?= (( $_SESSION["_gsACCESO"]['LOGEAR'] > 0 ) ? 'true':'false'); ?>;
var _gsINSTANCIA = null;
var IE = window;
var _Width = screen.availWidth;
var _Height = screen.availHeight;
function eIsWindow(win){
return( win.frameElement.MODAL!=undefined );
}
</SCRIPT>
<?PHP
echo "<SCRIPT type='text/javascript' id=EncodeClave SRC=''></SCRIPT>{$__Enter}";
if( file_exists('../_d_/cfg/edes.ini') ) include('../_d_/cfg/edes.ini');
?>
<SCRIPT type="text/javascript">
document.title = 'gsEdit<?= (($sFile=='') ? '' : ' · '.$sFile); ?> ';
function AnulaKey( Obj ){
var Mas = '', Ok = 0;
if( Obj.altKey ) Mas = 'a';
if( Obj.ctrlKey ) Mas = 'c';
if( Obj.shiftLeft ) Mas = 's';
if( ',112,114,122,a39,a8,c68,c72,c79,c76,c73,c81,c85,s121,'.indexOf(','+Mas+Obj.keyCode+',') != -1 ){
Ok = 1;
}else if( ',93,a36,a37,'.indexOf(','+Mas+Obj.keyCode+',') != -1 ){
Ok = 2;
}
if( Ok > 0 ){
Obj.keyCode = 0;
Obj.cancelBubble = true;
Obj.returnValue = false;
if( Ok==2 ) alert('<?= $_T[62]; ?>');
return true;
}
return false;
}
function FDiez(){
if( S.eventCode(event) == 121 ){
gsGrabar(0);
event.returnValue = false;
return false;
}
}
document.onkeydown = FDiez;
function PonTab(){
var Obj = ( null != iPHP.event ) ? iPHP.event : iHTM.event;
if( AnulaKey( Obj ) ) return false;
if( Obj.keyCode == 9 ){
if( !Obj.shiftKey ){
Obj.keyCode = 0;
var el = document.selection.createRange();
el.text = String.fromCharCode(9);
}
Obj.returnValue = false;
return false;
}
if( Obj.keyCode==121 ){
if( null != iPHP.event ) eiPHP.fireEvent('onclick');
if( null != iHTM.event ) eiHTM.fireEvent('onclick');
Obj.keyCode = 0;
Obj.returnValue = false;
return false;
}
}
var _TipoUsu = '<?= $_TipoUsu; ?>';
var _Editar = '<?= $_Editar; ?>';
var _NumBak = '<?= $NumBak; ?>';
var _Desbloquea = <?= (substr_count('~AM',$_TipoUsu)==1 ) ? 'true':'false'; ?>;
function Minimizar(){
}
<?PHP
if( $_TipoUsu=='~' ){
?>
function LoadFile7(){ LoadFile( '$t'+'/__edes.arb' ); }
<?PHP
}
?>
</SCRIPT>
<?PHP
echo "<SCRIPT id='CodigoJS' type='text/javascript' SRC='".gsJS('30')."'></SCRIPT>{$__Enter}";
if( $File=='' ) echo '<SCRIPT type="text/javascript">_FaltaPorCargar = false;</SCRIPT>';
?>
<SCRIPT FOR=TreeMenu EVENT=NodeClick(el)>
if( el.Key=='' ){
var clave = el+'';
var Indice = el.index;
var MasFile = ( _MasFile[Indice-1]==undefined ) ? '' : '_'+_MasFile[Indice-1];
var Prefijo = '';
for( var i=0; i<_NumFile; i++ ) if( el.index > _NumPrefijo[i] ) Prefijo = _NomPrefijo[i];
while( null != el.Parent ) el = el.Parent;
clave = clave.split('.');
eval( 'var _key_="";' );
_key_ = clave[0];
var Ori = ' áéíóúüñç';
var Des = '_aeiouunc';
for( var n=0; n<Ori.length; n++ ) _key_ = _key_.replace( eval('/'+Ori.substr(n,1)+'/g'), Des.substr(n,1) );
if( _DimLenguaje[el+''][1].indexOf('edes.php?') > -1 ){
if( _key_.length==1 || _key_.substring(0,2) == 'sl' ){
window.clipboardData.setData( 'Text', '{'+_key_+'}' );
}else{
window.clipboardData.setData( 'Text', '['+_key_+']' );
}
}else{
window.clipboardData.setData( 'Text', _key_ );
}
_key_ += MasFile;
_key_ = _key_.toLowerCase();
if( _DimLenguaje[el][0] != '' ){
var txt = _DimLenguaje[el][0];
txt = txt.replace(/{key}/g,'_key_');
eval( txt );
}
if( _HtmFile[Indice-1]!=undefined ) _key_ = _HtmFile[Indice-1];
if( null == document.getElementById('_CheckEdHelp') ){
var cnf_EdAyuda = false;
}else{
var cnf_EdAyuda = ( document.getElementById('_CheckEdHelp').src.indexOf('_1.') > -1 );
}
if( _DimLenguaje[el][2] != '' && cnf_EdAyuda ){
var dir = _DimLenguaje[el][2].replace(/{key}/, Prefijo+''+_key_ );
}else if( _DimLenguaje[el][1] != '' ){
HelpTitle.innerText = el;
if( _DimLenguaje[el][1].indexOf('edes.php?') > -1 && cnf_EdAyuda ){
var dir = 'edes.php?AE:$h/'+(Prefijo+''+_key_).toLowerCase()+'.htm&T=D&TRACE=Manual eDes';
}else{
var dir = _DimLenguaje[el][1].replace(/{key}/, (Prefijo+''+_key_).toLowerCase() );
}
}
AYUDA.location.replace( dir );
}
return false;
</SCRIPT>
<?PHP
if( $Debug ) echo "<br>Antes[{$File}]";
AbreGFC( $File, $_Directorio );
$_File = $sFile;
if( $Debug ) die( "<br>Despues[{$File}]" );
?>
</HEAD>
<BODY style='margin:0px' onload='CargarFuente();IniMenus();' onkeydown='AnulaKey(event);' onbeforeunload='HayCambios()' scroll='no' onhelp='gsAyuda(window);return false;'>
<table id=LoadTODO style="position:absolute; left:0px; top:0px; z-index=9999" onclick='this.style.display="none"' WIDTH=100% HEIGHT=100% cellspacing=0 cellpadding=0>
<tr><td id=CargaINI valign=middle align=center><?= $_T[35]; ?></td></tr><!-- CARGANDO -->
</table>
<?PHP
if( $_eDesLogo!='' ){
$IconoEdes = $_eDesLogo;
}else if( $_Development ){
$IconoEdes = '2_edes';
}else{
$IconoEdes = '2_edes_p';
}
?>
<IMG SRC="<?= gsIMG('2_mini'); ?>" TITLE="Minimizar" style="position:absolute; top:7; left:expression(_Width-36)" onclick='window.external._Minimize()'>
<IMG SRC="<?= gsIMG('2_closed'); ?>" style="position:absolute; top:7; left:expression(_Width-20)" onclick='window.external._Close()' title='<?= $_T[0]; ?>'>
<table border=0 WIDTH=100% HEIGHT=100% cellspacing=0 cellpadding=0>
<tr><th id=gsFondoTITLE><IMG SRC="<?= gsIMG($IconoEdes); ?>" style="float:left;cursor:pointer;" onclick='window.external._DesktopFocus()' title="Ir al Desktop"><div class=gsTITLE>gsEdit&nbsp;·&nbsp;eDes</div></th></tr>
<?PHP
?>
<tr id=zEDITOR width=100% height=100%><td>
<table border=0 WIDTH=100% HEIGHT=100% cellspacing=0 cellpadding=0>
<?PHP
?>
<tr HEIGHT="1px"><td>
<table id=Solapas WIDTH=100% HEIGHT=100% cellspacing=1 cellpadding=0 border=0 oncontextmenu='DescargaSolapa()'>
<tr WIDTH=100% HEIGHT=1px>
<?PHP
$ssFile = strtoupper($sFile);
if( substr_count( $ssFile, '/' ) > 0 ) $ssFile = substr( $ssFile, strrpos( $ssFile, '/' )+1 );
if( $sFile != '' ){
echo "<TH nF='>' class='DocOFF' onclick='VerFuente();'>".'<IMG SRC="'.gsIMG('2_dch').'" TITLE="'.$SERVER_NAME."\n".$SERVER_ADDR."\n".$_SESSION["ApplicationName"].'">'.'</TH>';
$FchPadre = $sFile;
echo "<TH nF='0' class='DocON' title='".$FchPadre."' TIPO=0 MOD=0 onclick='VerFuente();'>&nbsp; ".$ssFile." &nbsp;</TH>";
for( $n=0; $n<count($_Nombre); $n++ ){
$FchHijo = substr($_Pagina[$n],strpos($_Pagina[$n],'HR=')+3);
echo "<TH nF='".($n+1)."' class='DocOFF' title='". $FchHijo ."' TIPO=0 MOD=0 onclick='VerFuente();'>&nbsp; {$_Nombre[$n]} &nbsp;</TH>\n";
}
}else{
echo "<TH nF='>' class='DocOFF' onclick='VerFuente();' TIPO=0>".'<IMG SRC="'.gsIMG('2_dch').'" TITLE="'.$SERVER_NAME."\n".$SERVER_ADDR."\n".$_SESSION["ApplicationName"].'">'.'</TH>';
}
?>
<TH WIDTH=100% class='DocOFF'>&nbsp;</TH>
</tr>
</table>
</td></tr>
<?PHP
echo '<tr id=MenuEdit WIDTH=100% HEIGHT=1 style="display:none"><td>';
echo '<TABLE id=MenuEdit1 cellspacing=0 cellpadding=0><TR>';
if( $_Editar == 2 ){
echo '<TD><IMG id="Grabar" SRC="'.gsIMG('2_grabar_0').'" onclick="gsGrabar(0);" TITLE="'.$_T[1].'">';
}else{
if( $_Editar > 0 ){
echo '<TD><IMG SRC="'.gsIMG('2_ejecutar').'" onclick="gsPHP();" ESTADO="" TITLE="'.$_T[2].'">';
echo '<TD id=GRUPO>&nbsp;';
}
if( $HR!='' ){
if( substr_count('~',$_TipoUsu)==1 ) echo '<TD><IMG SRC="'.gsIMG('2_definition').'" onclick="alert(\':Sin implantar\');" TITLE="'.$_T[17].'">';
$_File = eScript( $_File );
echo '<TD><IMG id=ConNota SRC="';
if( file_exists( '../_doc_/edf/'.str_replace( '../d/','',$_File) )){
echo gsIMG('2_notas_1');
}else{
echo gsIMG('2_notas_0');
}
echo '" onclick="LoadFile( \'/_doc_/edf/'.$FchPadre.'\' );" TITLE="'.$_T[3].'">';
if( substr_count('~',$_TipoUsu)==1 && $sFile!= '' ) echo '<TD><IMG SRC="'.gsIMG('2_tip').'"		onclick="EdTip()"		TITLE="'.$_T[4].'">';
if( substr_count('~',$_TipoUsu)==1 && $sFile!= '' ) echo '<TD><IMG SRC="'.gsIMG('2_tabla').'"	onclick="EdTabla()"	TITLE="'.$_T[5].'">';
if( substr_count('~',$_TipoUsu)==1 && $sFile!= '' ) echo '<TD><IMG SRC="'.gsIMG('2_excel').'"	onclick="EdExcel()"	TITLE="'.$_T[6].'">';
echo '<TD id=GRUPO>&nbsp;';
}
echo '<TD><IMG SRC="'.gsIMG('2_tabla').'"			onclick="TLFListSQL()" id=ListSQL	TITLE="'.$_T[7].'">';
echo '<TD><IMG SRC="'.gsIMG('2_etiquetas').'"	onclick="gsEtiquetas(\'ListETI\')"	TITLE="'.$_T[8].'">';
echo '<TD><IMG SRC="'.gsIMG('2_funciones').'"	onclick="gsEtiquetas(\'ListFUNC\')"	TITLE="'.$_T[9].'">';
echo '<TD><IMG SRC="'.gsIMG('2_buscar').'"		onclick="EditorCmd(178)"		TITLE="'.$_T[10].'">';
echo '<TD><IMG SRC="'.gsIMG('2_buscar_next').'"	onclick="EditorCmd(176)"		TITLE="'.$_T[11].'">';
echo '<TD><IMG SRC="'.gsIMG('2_replace').'"		onclick="EditorCmd(169)"		TITLE="'.$_T[12].'">';
echo '<TD><IMG SRC="'.gsIMG('2_goto').'"			onclick="EditorCmd(168,-1)"	TITLE="'.$_T[13].'">';
echo '<TD><IMG SRC="'.gsIMG('2_undo').'"			onclick="EditorCmd(129)"		TITLE="'.$_T[14].'">';
echo '<TD><IMG SRC="'.gsIMG('2_redo').'"			onclick="EditorCmd(139)"		TITLE="'.$_T[15].'">';
echo '<TD id=GRUPO>&nbsp;<TD><div id=GRDCH></div>';
if( $_Editar > 0 ){
echo '<TD><IMG SRC="'.gsIMG('2_grabar_0').'"			onclick="gsGrabar(0);" id="Grabar"		TITLE="'.$_T[1].'">';
echo '<TD><IMG SRC="'.gsIMG('2_grabar_todo_0').'"	onclick="gsGrabar(1);" id="GrabarTodo"	TITLE="'.$_T[16].'">';
echo '<TD><IMG SRC="'.gsIMG('2_edit_0').'"			onclick="gsBloquear()" id="Bloquear"	TITLE="'.$_T[18].'">';
echo '<TD id=GRUPO>&nbsp;';
}
echo '<TD><IMG SM SRC="'.gsIMG('2_config').'"		onclick="MenuON(\'OnOff\')"				TITLE="'.$_T[19].'">';
echo '<TD><IMG SM SRC="'.gsIMG('2_recientes').'"	onclick="MenuON(\'SelectReciente\')"	TITLE="'.$_T[20].'">';
echo '<TD id=GRUPO>&nbsp;';
echo '<TD><IMG SM SRC="'.gsIMG('2_h_edes').'"		onclick="MenuON(\'opHEdes\')"				TITLE="'.$_T[21].'">';
if( substr_count('~',$_TipoUsu)==1 ) echo '<TD><IMG SM SRC="'.gsIMG('2_almacen').'" onclick="MenuON(\'opAlmacen\')" TITLE="'.$_T[22].'">';
if( substr_count('~AM',$_TipoUsu)==1 ){
echo '<TD><IMG SM SRC="'.gsIMG('2_h_lenguajes').'"	onclick="MenuON(\'opLenguaje\')"		TITLE="'.$_T[23].'">';
echo '<TD><IMG SRC="'.gsIMG('2_tools').'" v="tools"	onclick="Empezar(\'tools\',\'i\')"	TITLE="'.$_T[24].'">';
}
echo '<TD><IMG SM SRC="'.gsIMG('2_web').'"				onclick="MenuON(\'OpWEB\')"			TITLE="'.$_T[25].'">';
echo '<TD><IMG SM SRC="'.gsIMG('2_macro').'"				onclick="MenuON(\'opMacros\')"		TITLE="'.$_T[26].'">';
echo '<TD id=GRUPO>&nbsp;';
echo '<TD><IMG SM SRC="'.gsIMG('2_opedit').'" onclick="MenuON(\'sMenuEdit\')"	TITLE="'.$_T[27].'">';
echo '<TD><IMG SM SRC="'.gsIMG('2_setup').'"	 onclick="MenuON(\'OpCONFIG\')"	TITLE="'.$_T[28].'">';
echo '<TD><IMG SM SRC="'.gsIMG('2_css').'"	 onclick="MenuON(\'OpCSS\')"		TITLE="'.$_T[29].'">';
echo '<TD><IMG SM SRC="'.gsIMG('2_arbol').'"	 onclick="MenuON(\'OpARBOL\')"	TITLE="'.$_T[30].'">';
echo '<TD><IMG id=SPELL SRC="'.gsIMG('2_spell').'"	onclick="Spell()"				TITLE="'.$_T[88].'">';
if( substr_count('~~~',$_TipoUsu)==1 ){
echo '<TD><IMG SM SRC="'.gsIMG('2_edes').'"	onclick="MenuON(\'OpEdesDoc\')"		TITLE=":Ficheros eDes">';
echo '<TD id=GRUPO>&nbsp;';
echo '<TD><IMG SRC="'.gsIMG('2_parametros').'"	onclick="VerEDes(\'eDesVar\')"	TITLE=":Parámetros de ejecución">';
echo '<TD><IMG SRC="'.gsIMG('2_exe_df').'"		onclick="EDesExe()"					TITLE=":Ejecutar Opción">';
echo '<TD><IMG SRC="'.gsIMG('2_monitor').'"		onclick="VerEDes(\'eDesRes\')"	TITLE=":Salida del Motor">';
}
echo '<TD id=GRUPO>&nbsp;';
?>
<?PHP  } ?>
<TD width=100%>
</TABLE>
</td></tr>
<?PHP
echo '<tr id=Doc1 WIDTH=100% HEIGHT=100%><td>';
echo "<script type='text/javascript'>_DimPaginas[0] = 'edes.php?E:".'$'."t/31.gs&HR={$sFile}&Editar={$_Editar}&Arbol=1&D={$_Directorio}&nFrame=0';</script>";
if( $File != '' ){
if( count($_Pagina) == 0 ){
echo "<IFRAME id='DivIframe0' onload='eLoading(false,window)' style='display:block;' name='0' FRAMEBORDER=0 src='' width=100% height=100% SCROLLING=no></iframe>\n";
}else{
echo "<IFRAME id='DivIframe0' style='display:block;' name='0' FRAMEBORDER=0 src='' width=100% height=100% SCROLLING=no></iframe>\n";
}
for( $n=0; $n<count($_Pagina); $n++ ){
echo "<script type='text/javascript'>_DimPaginas[$n+1] = '{$_Pagina[$n]}&Editar={$_Editar}&Arbol=1&D={$_Directorio}&nFrame=".($n+1)."';</script>";
if( $n == count($_Pagina)-1 ){
echo "<IFRAME id='DivIframe".($n+1)."' onload='eLoading(false,window)' style='display:none' name='".($n+1)."' FRAMEBORDER=0 src='' width=100% height=100% SCROLLING=no></iframe>\n";
}else{
echo "<IFRAME id='DivIframe".($n+1)."' style='display:none' name='".($n+1)."' FRAMEBORDER=0 src='' width=100% height=100% SCROLLING=no></iframe>\n";
}
}
}else echo '<SCRIPT type="text/javascript">eLoading(false);</SCRIPT>';
echo '<div id=NewFrames></div>';
echo '</td></tr>';
echo '</table>';
echo '</td></tr>';
?>
<tr id=Interprete WIDTH=100% HEIGHT=100% style="display:none"><td>
<table WIDTH=100% HEIGHT=100% cellspacing=0 cellpadding=0 border=0>
<tr HEIGHT=1><td>
<table WIDTH=100% HEIGHT=1 cellspacing=1 cellpadding=0 border=0>
<tr><td class=InfInterprete id=PHPEspecial>&nbsp;
</table>
</td></tr>
<tr HEIGHT=1><td>
<table id=MenuEdit2 WIDTH=100% HEIGHT=1 cellspacing=1 cellpadding=0 border=0><tr height=22><?PHP
echo '<TD><IMG SRC="'.gsIMG('2_b_back').'" onclick="gsEditar(\'I\')" TITLE="'.$_T[36].'"></td>';
echo '<TD id=GRUPO>&nbsp;';
echo '<TD><IMG id=viPHP onclick="Ver(\'iPHP\')" SRC="'.gsIMG('2_c_php_1').'"		TITLE="'.$_T[37].'"></td>';
echo '<TD><IMG id=eiPHP onclick="ExePhp()"		SRC="'.gsIMG('2_ejecutar').'"		TITLE="'.$_T[38].'"></td>';
echo '<TD><IMG id=riPHP onclick="Ver(\'iEXE\')" SRC="'.gsIMG('2_monitor').'"		TITLE="'.$_T[39].'"></td>';
echo '<TD><IMG id=tvPHP onclick="CambiaIMG()"	t=0 SRC="'.gsIMG('2_win_0').'"	TITLE="'.$_T[40].'"></td>';
echo '<TD><IMG SRC="'.gsIMG('2_leer').'" onclick="LoadPHP();" TITLE="'.$_T[41].'">';
echo '<TD id=SoloPHP><IMG id=_CheckSQL SRC="'.gsIMG('2_check_0').'" onclick="OnOff()" TITLE="'.$_T[42].'"></td>';
echo '<TD onclick="_CheckSQL.fireEvent(\'onclick\')" style="cursor:pointer" TITLE="'.$_T[42].'">Sql&nbsp;</td>';
echo '<TD><IMG id=_CheckC SRC="'.gsIMG('2_check_0').'" onclick="OnOff()" TITLE="'.$_T[43].'"></td>';
echo '<TD onclick="_CheckC.fireEvent(\'onclick\')" style="cursor:pointer">'.str_replace(' ','&nbsp;',$_T[43]).'</td>';
echo '<TD id=GRUPO>&nbsp;';
echo '<TD><IMG id=viHTM onclick="Ver(\'iHTM\')" SRC="'.gsIMG('2_c_htm_0').'"		TITLE="'.$_T[44].'"></td>';
echo '<TD><IMG id=eiHTM onclick="ExeHtm()"		SRC="'.gsIMG('2_ejecutar').'"		TITLE="'.$_T[45].'"></td>';
echo '<TD><IMG id=tvHTM onclick="CambiaIMG()"	t=0 SRC="'.gsIMG('2_win_0').'"	TITLE="'.$_T[40].'"></td>';
echo '<TD><IMG SRC="'.gsIMG('2_leer').'" onclick="LeerHTM(\'HTM\');" TITLE="'.$_T[46].'">';
echo '<TD><IMG id="GrabarHTM" SRC="'.gsIMG('2_grabar_htm').'" onclick="GrabarHTM(\'HTM\');" TITLE="'.$_T[47].'">';
echo '<TD id=GRUPO>&nbsp;';
echo '<TD><IMG id=viSQL onclick="Ver(\'iSQL\',0)" SRC="'.gsIMG('2_c_sql_0').'"	TITLE="'.$_T[48].'"></td>';
echo '<TD><IMG id=eiSQL onclick="ExeSql()"		SRC="'.gsIMG('2_ejecutar').'"		TITLE="'.$_T[49].'"></td>';
echo '<TD><IMG id=riSQL onclick="Ver(\'vSQL\')" SRC="'.gsIMG('2_monitor').'"		TITLE="'.$_T[50].'"></td>';
echo '<TD><IMG id=tvSQL onclick="CambiaIMG()"	t=0 SRC="'.gsIMG('2_win_0').'"	TITLE="'.$_T[40].'"></td>';
echo '<TD><IMG SRC="'.gsIMG('2_leer').'" onclick="LeerHTM(\'SQL\');" TITLE="'.$_T[51].'">';
echo '<TD><IMG id="GrabarSQL" SRC="'.gsIMG('2_grabar_htm').'" onclick="GrabarHTM(\'SQL\');" TITLE="'.$_T[52].'">';
echo '<TD id=GRUPO>&nbsp;';
echo '<TD><IMG SRC="'.gsIMG('2_buscar').'"		onclick="EditorCmd(178)"		TITLE="'.$_T[53].'">';
echo '<TD><IMG SRC="'.gsIMG('2_buscar_next').'"	onclick="EditorCmd(176)"		TITLE="'.$_T[54].'">';
echo '<TD><IMG SRC="'.gsIMG('2_replace').'"		onclick="EditorCmd(169)"		TITLE="'.$_T[55].'">';
echo '<TD><IMG SRC="'.gsIMG('2_goto').'"			onclick="EditorCmd(168,-1)"	TITLE="'.$_T[56].'">';
echo '<TD><IMG SRC="'.gsIMG('2_undo').'"			onclick="EditorCmd(129)"		TITLE="'.$_T[57].'">';
echo '<TD><IMG SRC="'.gsIMG('2_redo').'"			onclick="EditorCmd(139)"		TITLE="'.$_T[58].'">';
echo '<TD id=GRUPO>&nbsp;';
if( strtoupper(substr(PHP_OS,0,3)) != 'WIN' ){
echo '<TD><IMG SRC="'.gsIMG('2_tree').'"			onclick="ExeShell()"		TITLE="'.$_T[87].'">';
echo '<TD id=GRUPO>&nbsp;';
}
$NomExt = '.'.$_User;
$LongExt = strlen($NomExt)*-1;
$ScriptLocal = false;
$di = opendir( '../_tmp' );
while( $file = readdir( $di ) ){
if( ($file != ".") && ($file != "..") ){
if( substr($file,$LongExt)==$NomExt ){
if( $file!='edes_php'.$NomExt && $file!='edes_sql'.$NomExt && $file!='_tron'.$NomExt ){
$ScriptLocal = true;
break;
}
}
}
}
if( $ScriptLocal ){
echo '<TD><IMG SRC="'.gsIMG('2_privado').'" onclick="MenuON(\'SelectPrivado\')" TITLE="'.$_T[90].'">';
echo '<TD id=GRUPO>&nbsp;';
}
?><TD width=100%>&nbsp;</td></tr>
</table>
</td></tr>
<tr width=100% HEIGHT=100%><td>
<IFRAME name=TLF src="" width=100% height=0 SCROLLING=auto></IFRAME>
<IFRAME id=iPHP name=iPHP src='edes.php?E:$t/33.gs&P'	style='display:none;z-indez=1;' width=100% height=100% SCROLLING=no   FRAMEBORDER=0></IFRAME>
<IFRAME id=iEXE name=iEXE src=''								style='display:none;z-indez=2;' width=100% height=100% SCROLLING=auto FRAMEBORDER=0></IFRAME>
<IFRAME id=iHTM name=iHTM src='edes.php?E:$t/33.gs&H'	style='display:none;z-indez=3;' width=100% height=100% SCROLLING=no   FRAMEBORDER=0></IFRAME>
<IFRAME id=vHTM name=vHTM src=''								style='display:none;z-indez=4;' width=100% height=50%  SCROLLING=auto FRAMEBORDER=0></IFRAME>
<IFRAME id=iSQL name=iSQL src='edes.php?E:$t/33.gs&S'	style='display:none;z-indez=5;' width=100% height=100% SCROLLING=no   FRAMEBORDER=0></IFRAME>
<IFRAME id=vSQL name=vSQL src=''								style='display:none;z-indez=6;' width=100% height=100% SCROLLING=auto FRAMEBORDER=0></IFRAME>
</td></tr>
</table>
</td></tr>
<?PHP
?>
<tr id=zHELP style='display:none' WIDTH=100% HEIGHT=100%><td>
<TABLE border=0 cellspacing=0 cellpadding=0 width=100% height=100%>
<tr HEIGHT=1><td colspan=2>
<table WIDTH=100% HEIGHT=1 cellspacing=1 cellpadding=0 border=0>
<tr><td class=InfInterprete id=HelpTitle align=center><?= $_T[59]; ?></td><!-- AYUDA -->
</table>
</td></tr>
<TR>
<TD id=UtilMaxiArbol height=1 width=180>
<TABLE border=0 width=100% cellspacing=0 cellpadding=0><TR>
<TD><IMG SRC="<?= gsIMG('2_b_back'); ?>" onclick="gsEditar('H');" title='<?= $_T[36]; ?>'></TD><!-- Editor -->
<?PHP  if( substr_count('~AM',$_TipoUsu)==1 ){ ?>
<TD><IMG SRC="<?= gsIMG('2_h_edes'); ?>" onclick="MenuON('opHEdes2')" title='<?= $_T[21]; ?>'></TD><!-- Ayuda eDes -->
<TD><IMG SRC="<?= gsIMG('2_h_lenguajes'); ?>" onclick="MenuON('opLenguaje2')" title='<?= $_T[23]; ?>'></TD><!-- Ayuda Lenguajes -->
<?PHP  } ?>
<?PHP  if( substr_count('~',$_TipoUsu)==1 ) echo '<TD><IMG id=_CheckEdHelp SRC="'.gsIMG('2_check_0').'" onclick="OnOff()" TITLE=":Editar Ayuda"></td><TD onclick="_CheckEdHelp.fireEvent(\'onclick\')" style="cursor:pointer">:Editar</td>'; ?>
<TD width=100% align=center></TD>
</TABLE>
</TD>
<TD rowspan=2 width=100% onmouseenter='MENUS.opLenguaje.style.display=MENUS.opHEdes.style.display="none";'><IFRAME name='AYUDA' src='' width=100% height=100% FRAMEBORDER=0 SCROLLING=no></IFRAME></TD>
</TR>
<TR>
<TD width=180 class=zINDICE onmouseenter='MENUS.opLenguaje.style.display=MENUS.opHEdes.style.display="none"'>
<object id=TreeMenu classid="clsid:C74190B6-8589-11D1-B16A-00C0F0283628" width=180 height=100% style='z-index:0'>
<param name="Style" value="6">
<param name="CheckBoxes" value="0">
<param name="Indentation" value="0">
<param name="LineStyle" value="1">
<param name="_ExtentX" value="4498">
<param name="_ExtentY" value="9260">
<param name="_Version" value="393217">
<param name="HideSelection" value="0">
<param name="LabelEdit" value="1">
<param name="PathSeparator" value="\">
<param name="Sorted" value="1">
<param name="FullRowSelect" value="0">
<param name="HotTracking" value="0">
<param name="Scroll" value="1">
<param name="SingleSel" value="0">
<param name="ImageList" value="">
<param name="BorderStyle" value="0">
<param name="Appearance" value="0">
<param name="MousePointer" value="0">
<param name="Enabled" value="1">
<param name="OLEDragMode" value="0">
<param name="OLEDropMode" value="0">
</object>
</TD>
</TR>
</TABLE>
</TD></TR>
<?PHP
echo '</table>';
?>
<IFRAME id=MENUS src="edes.php?E:$t/32.gs" width=100% onmouseleave="this.style.display='none'" SCROLLING=no FRAMEBORDER=0 style="position:absolute"></IFRAME>
<IFRAME id=AyudaEDES src="" SCROLLING=no FRAMEBORDER=0 style="position:absolute;display:none"></IFRAME>
<IFRAME id=gsSHELL src="" SCROLLING=no FRAMEBORDER=0 width=100% height=100% style="left:0;top:0;position:absolute;display:none"></IFRAME>
<IMG id=AyudaImg SRC="<?= gsIMG('2_b_back'); ?>" onclick="this.style.display=AyudaEDES.frameElement.style.display='none'" TITLE="<?= $_T[36]; ?>" style="position:absolute;display:none;">
<IE:Download id=ObjDescarga style="behavior:url(#default#download)" />
<div id=div_edTabla style='display:none; width:100%;height:100%;'>
<IFRAME name=edTabla src='' width=100% height=100% SCROLLING=auto FRAMEBORDER=0></iframe>
</div>
<?PHP
if( $AvisoNewVersion ) echo "<SCRIPT type='text/javascript'>alert('{$_T[60]}');</SCRIPT>";
echo '<IMG id=Procesando SRC="'.gsIMG('2_procesando').'" BORDER=0 style="display:none;position:absolute;z-index:10;left:expression(document.body.clientWidth-this.width-7);top:expression(document.body.clientHeight-this.height-5)">';
echo '</BODY></HTML>';
EnviaGZip(1,0);
exit;
function AbreGFC( $File, $Camino ){
global $_Pagina, $_Nombre;
global $_EtiGFC, $_EtiFCH;
if( trim($File)=='' ) return;
$File = eScript( $File );
$Tabla = "<TH id=0 onclick='' style='cursor:pointer'>&nbsp; GFC &nbsp;</TH>";
$ok = true;
$n = 0;
if( file_exists($File) ){
$fd = fopen( $File, "r" );
while( !feof($fd) ){
$buffer = ltrim( fgets($fd,1024) );
if( substr_count( $buffer, '?' ) == 1 ){
$buffer = trim( substr( $buffer, strpos( $buffer, '?' )+1 ) );
}
if( $buffer[0] == '[' ){
$eti = explode( ']', $buffer );
$eti = strtoupper(substr($eti[0],1));
$_EtiGFC .= $buffer.'<br>';
if( $eti == 'NOTE' ) $ok = false;
if( $eti == 'TAB' && $ok && substr_count( $buffer, '|' ) > 0 ){
$tmp = substr($buffer,strpos($buffer,']')+1);
if( substr_count( $tmp, '|' ) == 2 ){
list( $Modo, $tmp1, $tmp2 ) = explode( '|', $tmp );
$tmp3 = $tmp4 = '';
}else{
list( $Modo, $tmp1, $tmp2, $tmp3, $tmp4 ) = explode( '|', $tmp );
}
$tmp2 = trim($tmp2);
if( $tmp2[0] == '-' ) $tmp2 = substr( $tmp2, 1 );
$tmp2 = trim($tmp2);
if( substr_count( $tmp2, '.' ) == 0 ) $tmp2 .= '.edf';
if( $tmp2[0] != '$' ){
$gFile = "edes.php?E:".'$'."t/31.gs&HR={$tmp2}";
}else{
$gFile = "edes.php?E:".'$'."t/31.gs&HR={$tmp2}";
}
if( substr_count( $tmp2, '/' ) > 0 ){
$stmp2 = strtoupper( str_replace('.edf','',substr( $tmp2, strrpos( $tmp2,'/' )+1 ) ) );
}else{
$stmp2 = strtoupper( str_replace('.edf','', $tmp2 ) );
}
$_Pagina[$n] = $gFile;
$_Nombre[$n] = $stmp2;
$n++;
}else{
}
}
}
}
}
function NewLP( $NewClave ){
global $Dir_, $_gsACCESO;
if( file_exists('../_d_/cfg/e'.'d.l'.'p') ){
$fd = @fopen('../_d_/cfg/e'.'d.l'.'p','r');
}else{
$fd = @fopen($Dir_.'t/'.'e'.'d.l'.'p','r');
}
$cTxt = @fread($fd,(1900+59)*100);
@fclose($fd);
$Basura = ord(substr($cTxt,0,1));
$LongDeLong = ord(substr($cTxt,$Basura+2,1));
$LenCadena = '';
for( $n=0; $n<$LongDeLong; $n++ ) $LenCadena .= ord(substr($cTxt,$Basura+3+$n,1));
$Basura += $LongDeLong + 3;
$b = 0;
$txt = '';
for( $n=$Basura; $n<$Basura+($LenCadena*2); $n++ ){
if( $b==0 ) $txt .= substr($cTxt,$n,1);
$b++; if( $b>1 ) $b=0;
}
$tmp = explode(chr(10),gzuncompress($txt));
if( 212940319 != crc32(trim($tmp[0])) ) exit;
@_LoadSqlIni('_',trim($tmp[1]));
$NewUser = trim($GLOBALS['PHP_AUTH_USER']);
$OldPass = strtoupper(md5($GLOBALS['PHP_AUTH_PW']));
if( substr($NewUser,0,2)=='C#' ) $NewUser = substr($NewUser,2);
if( substr_count($NewUser,'#')==1 ) list($NewUser,) = explode('#', $NewUser);
for($n=0; $n<count($tmp); $n++){
$tmp2 = explode(chr(9),$tmp[$n]);
if( $n==3 ) $NomCampo =$tmp2;
if( $n>3 && $tmp2[0].chr(9).$tmp2[5].chr(9).$tmp2[2].chr(9) == $_SESSION["_gsACCESO"]['TIPO'].chr(9).$NewUser.chr(9).$OldPass.chr(9) ){
$txt = gzuncompress($txt);
$stxt = $txt;
$txt = str_replace( $tmp2[0].chr(9).$tmp2[5].chr(9).$tmp2[2].chr(9), $tmp2[0].chr(9).$tmp2[1].chr(9).$NewClave.chr(9), $txt );
GrabarLP( $txt );
die( "<SCRIPT type='text/javascript'>alert('{$_T[61]}');</SCRIPT>" );
}
}
return;
}
?>
