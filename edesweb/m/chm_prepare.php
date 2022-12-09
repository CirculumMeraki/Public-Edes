<?PHP
error_reporting(5);
$titulo = 'e-Des Help';
chdir('../../');
include( 'edesweb/m/chm.ini' );
$H = getCWD().'/edesweb/h/';
$indices = array($H.'i/label.ind',$H.'i/help2.ind');
$tmp = dirname(__FILE__).'/tmp/';
$tmp = getCWD().'/edesweb.help/tmp/';
CreaDir('edesweb.help');
chdir('edesweb.help');	CreaDir('tmp');
chdir('tmp');			CreaDir('h');
chdir('../..');
copy('edesweb/m/chm.jpg', 'edesweb.help/tmp/h/chm.jpg');
$csss['edes.php?R:$h/i/label.css'] = $H.'i/label.css';
$csss['edes.php?R:$h/i/help2.css'] = $H.'i/help2.css';
foreach( $csss as $k=>$v ){
$FileDestino = $tmp.'h/'.basename($v);
if( strtoupper(substr(PHP_OS,0,3)) == 'WIN' ){
$FileDestino = PathWindow($FileDestino);
$v = PathWindow($v);
}
copy($v , $FileDestino);
echo $v .' -> '. $FileDestino.'<br>';
}
$hhp = $tmp.'edes.hhp';
unlink($hhp);
$hhc = $tmp.'edes_toc.hhc';
unlink($hhc);
$hhk = $tmp.'edes_index.hhk';
unlink($hhk);
$chm = $tmp.'edes.chm';
unlink($chm);
$archivo_portada = $tmp.'h/__portada__.htm';
unlink($archivo_portada);
$portada = grabaPortada($archivo_portada);
$default_topic = 'h/'.basename($portada);
$labelFile = $tmp.'indice.ind';
unlink($labelFile);
$f = fopen($labelFile,'w');
foreach($indices as $k=>$v){
$fd = fopen($v, 'r');
$txt = fread($fd, filesize($v));
fclose($fd);
fwrite($f,$txt);
}
fclose($f);
$lFa = file($labelFile);
$filesa = array();
$indent = 0;
$buscar = "á,é,í,ó,ú,ü,Á,É,Í,Ó,Ú,Ü,ñ,Ñ";
$buscar = explode(',',$buscar);
$reemplazar = "a,e,i,o,u,u,a,e,i,o,u,u,n,n";
$reemplazar = explode(',',$reemplazar);
foreach($lFa as $k=>$v){
if($v[0]=='[')continue;
if(trim($v)=='')continue;
$t=trim($v);
if($t[0]=='.')continue;
$indent = strlen(rtrim($v)) - strlen(trim($v));
if(strpos($v,'{')){
$t = explode('{',$v);
$v = $t[0];
$f = substr($t[1],0,strpos($t[1],'}') );
}
$f = $H.strtolower(trim($v)).'.htm';
$f = str_replace(' ','_',$f);
for( $i=0; $i<count($buscar); $i++ ){
$f = str_replace($buscar[$i],$reemplazar[$i],$f);
}
if(strpos($v,'+')){
$t=explode('+',$v);
$f=str_replace('+','_',$v);
$f=$H.strtolower(trim($f)).'.htm';
$v=$t[0];
}
$i = count($filesa);
$filesa[$i]['name']		= trim($v);
$filesa[$i]['filename']	= $f;
$filesa[$i]['indent']	= $indent;
}
foreach ($filesa as $k=>$v){
$i=$filesa[$k]['indent'];
$ii=$filesa[$k+1]['indent'];
if( !($i==$ii || $i>$ii) ){
$filesa[$k]['filename']='';
}else{
$fd = fopen($filesa[$k]['filename'], 'r');
$s = fread($fd, filesize($filesa[$k]['filename']));
fclose($fd);
$s=str_replace('<TITLE> HELP EDES-LABELS</TITLE>', '<TITLE>'.$filesa[$k]['name'].'</TITLE>' ,$s);
foreach($csss as $kc=>$vc){
$s=str_replace($kc, basename($vc),$s);
}
$filesa[$k]['filename']='h/'.basename($filesa[$k]['filename']);
$fh=fopen( $tmp.$filesa[$k]['filename'] ,'w');
fwrite($fh,$s);
fclose($fh);
}
}
$_chm =				'C:\\wamp64\\www\\edesweb.help\\tmp\\edes.chm';
$_hhc =				'C:\\wamp64\\www\\edesweb.help\\tmp\\edes_toc.hhc';
$_hhk =				'C:\\wamp64\\www\\edesweb.help\\tmp\\edes_index.hhk';
$_default_topic =	'h\\__portada__.htm';
$fh = fopen($hhp, 'w');
$s = "[OPTIONS]
Compatibility=1.1 or later
Compiled file={$_chm}
Contents file={$_hhc}
Index file={$_hhk}
Default topic={$_default_topic}
Display compile progress=No
Full-text search=Yes
Language=0xc0a Español (alfabetización internacional)
Title={$titulo}
";
$s.="[INFOTYPES]";
fwrite($fh,$s);
fclose($fh);
$fh=fopen($hhc,'w');
$s='<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<HTML>
<HEAD>
<meta name="GENERATOR" content="E-DES Engine">
</HEAD><BODY>
<OBJECT type="text/site properties">
<param name="ImageType" value="Folder">
</OBJECT>
<UL>
';
$s.="<LI> <OBJECT type=\"text/sitemap\">
<param name=\"Name\" value=\"eDes Etiquetas\">
<param name=\"Local\" value=\"{$portada}\"></OBJECT>";
foreach( $filesa as $k=>$v ){
$n=$filesa[$k]['name'];
$s.="<LI> <OBJECT type=\"text/sitemap\">
<param name=\"Name\" value=\"{$n}\">";
if( $filesa[$k]['filename']!='' ){
$f  = $filesa[$k]['filename'];
$s .= "<param name=\"Local\" value=\"{$f}\">";
}
$s .= "</OBJECT>
";
$i=$filesa[$k]['indent'];
$ii=$filesa[$k+1]['indent'];
if( $i>$ii ){
for($z=$ii;$z<$i;$z++){
$s.="</UL>
";
}
}
if( $i<$ii ){
$s.="<UL>
";
}
}
$s.='</BODY></HTML>';
fwrite($fh,$s);
fclose($fh);
$fh = fopen($hhk,'w');
$s='<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<HTML>
<HEAD>
<meta name="GENERATOR" content="E-DES Engine">
</HEAD><BODY>
<UL>
';
foreach ($filesa as $k=>$v){
$n=$filesa[$k]['name'];
$s.="<LI> <OBJECT type=\"text/sitemap\">
<param name=\"Name\" value=\"{$n}\">";
if( $filesa[$k]['filename']!='' ){
$f=$filesa[$k]['filename'];
$s.="<param name=\"Local\" value=\"{$f}\">";
}
$s.="</OBJECT>
";
}
$s.='</UL></BODY></HTML>';
fwrite($fh,$s);
fclose($fh);
die('FIN');
if( substr($ret,0,7)=='HHC5010'){
echo 'El archivo CHM está abierto, cerrarlo para poder compilarlo.<br>';
}
die($ret);
function grabaPortada( $archivo ){
global $tmp;
$fh=fopen( $archivo ,'w');
$s='<!DOCTYPE HTML>
<HTML>
<HEAD>
<TITLE>eDes-Etiquetas</TITLE>
<LINK REL="stylesheet" HREF="label.css" TYPE="text/css">
</HEAD>
<BODY style="background-color:#ADBEC6" scroll=no>
<center><h3>eDes help</h3></center>
<br><br><br><br><br><br><br>
<center><img src="h/chm.jpg"></center>
<br><div style="font-size:10">'. '&nbsp; &copy; '.date('d-m-Y').'</div>
</BODY>
</HTML>
';
fwrite($fh,$s);
fclose($fh);
return 'h/__portada__.htm';
}
function CreaDir($dir){
echo 'Crea directorio: '.$dir.'<br>';
if( is_dir($dir) ){
if( !is_readable($dir) )  die('ERROR: (a) No es de lectura: '.$dir);
if( !is_writeable($dir) ) die('ERROR: (a) No es de escritura: '.$dir);
return;
}
if( !mkdir($dir, 0777) )  die('No se ha podido crear el directorio: '.$dir);
if( !is_dir($dir) )		  die('No está el directorio: '.$dir);
if( !is_readable($dir) )  die('ERROR: (d) No es de lectura: '.$dir);
if( !is_writeable($dir) ) die('ERROR: (d) No es de escritura: '.$dir);
}
function PathWindow($File){
$File = str_replace('/','\\',$File);
$File = str_replace('\\\\','\\',$File);
return $File;
}
?>
