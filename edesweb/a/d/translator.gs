<?php
set_time_limit( 0 );
$_NumScript = 0;
$_NumClaves = 0;
eTrace( 'INI: '.date('H:i:s') );
GetTranslate( '..' );
eTrace( 'Nº de _NumScript: '.$_NumScript );
eTrace( 'Nº de _NumClaves: '.$_NumClaves );
eTrace( 'FIN: '.date('H:i:s') );
exit;
function GetTranslate( $dorg ){
$DimExt = array( 'edf','gdf','sdf','fdf','ldf','idf','zdf','lng' );
if( !is_readable($dorg) ) die( "<br>Error al abrir el directorio de origen '$dorg'" );
if( substr_count($dorg,'/edesweb/tcpdf/')>0 || substr_count($dorg,'/edesweb/_vb/')>0 || substr_count($dorg,'/_bak_/')>0 || substr_count($dorg,'/_vb/')>0 ) return;
global $_NumScript, $_NumClaves;
$di = opendir( $dorg );
while( $file = readdir( $di ) ){
if( $file!='.' && $file!='..' ){
if( file_exists($dorg.'/'.$file) != 1 ) die("<BR> >>>>>>>>>>>> No existe el fichero [".$file."]");
if( is_dir($dorg.'/'.$file) ){
if( $file!='tcpdf' ) GetTranslate( "$dorg/$file" );
}else{
$ext = explode('.',$file);
$ext = $ext[count($ext)-1];
if( in_array( $ext, $DimExt ) ){
$SeCambio = false;
$ConCompresion = false;
if( substr($file,-4)=='.zdf' ){
$txt = file_get_contents("{$dorg}/{$file}");
if( substr($txt,0,5)=='eDes ' ){
$Dim = explode( "\n", gzuncompress(substr($txt,5)) );
$ConCompresion = true;
}else{
$Dim = explode( "\n", $txt );
}
}else{
$Dim = file( "{$dorg}/{$file}" );
}
$pLanguage = -1;
for( $n=0; $n<count($Dim); $n++ ){
$txt = trim(strtoupper($Dim[$n]));
if( $txt=='' ){
}else if( $txt[0]=='[' ){
if( substr($txt,0,10)=='[LANGUAGE]' ){
eTrace("{$dorg}/{$file}");
$pLanguage = $n;
$_NumScript++;
list($DimLng,$oMd5) = explode('/'.'/',substr(trim($Dim[$n]),10));
$DimLng = str_replace(' ','',$DimLng);
for( $i=$n+1; $i<count($Dim); $i++ ){
$txt = trim($Dim[$i]);
if( $txt=='' ){
}else if( $txt[0]=='.' || substr($txt,0,2)=='/'.'/' ){
}else if( $txt[0]=='[' || $txt[0]=='#' || $txt[0]=='¿' ){
$xMd5 = '';
for( $p=$pLanguage+1; $p<$i; $p++ ){
$txt = trim($Dim[$p]);
if( $txt!='' && $txt[0]!='.' && $txt[0]!='¿' && substr($txt,0,2)!='/'.'/' ){
$xMd5 .= $txt;
}
}
$nMd5 = md5($xMd5);
$n = count($Dim)+1;
if( $nMd5!=trim($oMd5) ){
$Dim[$pLanguage] = '[Language] '.$DimLng."\t\t".'/'.'/ '.$nMd5;
$txt = '';
for( $p=0; $p<count($Dim); $p++ ) $txt .= rtrim($Dim[$p])."\n";
if( $ConCompresion ) $txt = 'eDes '.gzcompress($txt);
file_put_contents( "{$dorg}/{$file}", $txt );
}
break;
}else{
$xMd5 .= $txt;
$_NumClaves++;
}
}
}else{
break;
}
}
}
}
}
}
}
closedir( $di );
}
eHTML();
?>
<?=_FileNoCache('edes.js')?>
<style>
</style>
<script type="text/javascript">
</script>
</HEAD>
<BODY scroll='yes' on_load='init()'>
<div id='cabecera'>
<?=$titulo;?>
<br><br>
</div>
<div class='tabs'>
<div id='tabs0' class='tab' style='display:none' onclick='showTab(0)'>DATA</div>
<div id='tabs1' class='tab' onclick='showTab(1)'>TRANSLATIONS</div>
<div id='tabs2' class='tab' onclick='showTab(2)'>MENU TRANSLATIONS</div>
<div style='width:100%'></div>
</div>
<div id='tab0' class='tabMain' style='display:none;overflow:auto'>
<button onclick='getDatos()'>Renew script data</button>
&nbsp;&nbsp;
<button onclick='saveScripts()' title='Will save all translations to application and engine scripts.'>Commit translations to all scripts</button>
<br>
<table width='100%' style='border:1px solid #DDDDDD'>
<tr>
<td>
<span id='porcen' class='porcen'></span>
</td>
</tr>
<tr>
<td>
<span id='porcenmsg'></span>
</td>
</tr>
</table>
<div id='mensaDatos' style='overflow:auto'> </div>
</div>
<div id='tab1' class='tabMain' style='display:none;overflow:auto'>
<div id='tab1_menu' class='tab_menu'>
Show: <select id='selLangToEdit' onchange='montarMnto_App(this.value,"A")'><?=$selLangToEdit;?></select>
&nbsp;&nbsp;&nbsp;
<button onclick='montarMnto_App(eGO("selLangToEdit").value,order_ln_ad)' title='Refresh translation list.'>Refresh</button>
&nbsp;&nbsp;
<!--			<button onclick='saveScripts()' title='Will save all translations to application scripts.'>Save</button>  -->
</div>
<div id='tab1_table' style='overflow:auto'>
<!--			<table id='tblMnto' class='tblMnto'></table>  -->
</div>
</div>
<div id='tab2' class='tabMain' style='display:none;overflow:auto'>
<div id='tab2_menu' class='tab_menu'>
Show: <select id='selLangToEdit_Menu' onchange='montarMnto_Menu(this.value,"A")'><?=$selLangToEdit;?></select>
&nbsp;&nbsp;&nbsp;
<button onclick='montarMnto_Menu(eGO("selLangToEdit_Menu").value,order_ln_ad_menu)' title='Refresh translation list.'>Refresh</button>
</div>
<div id='tab2_table' style='overflow:auto'>
<!--			<table id='tblMnto_Menu' class='tblMnto'></table>  -->
</div>
</div>
</BODY>
</HTML>
