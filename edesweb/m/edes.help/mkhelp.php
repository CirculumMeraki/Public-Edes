<?PHP
$titulo='e-Des Help';
$compiler='Z:\\__EDES\\help\\HTML_Help_Workshop\hhc.exe ';
$compiler='C:/edes_mkhelp/compilador/hhc.exe ';
$H='Z:\\__EDES\\help\\edes\\h\\';
$H='M:/edes.help/edes/h/';
include( '../../edesweb/m/chm.ini' );
$H=dirname(__FILE__).'/h/';
$H='../edesweb/h/';
$indices = array($H.'i/label.ind',$H.'i/help2.ind');
$tmp=dirname(__FILE__).'/tmp/';
mkdir($tmp);
mkdir($tmp.'h');
$csss['edes.php?R:$h/i/label.css']=$H.'i/label.css';
$csss['edes.php?R:$h/i/help2.css']=$H.'i/help2.css';
foreach($csss as $k=>$v){
copy( $v , $tmp.'h/'.basename($v) );
}
$hhp=$tmp.'edes.hhp';
unlink($hhp);
$hhc=$tmp.'edes_toc.hhc';
unlink($hhc);
$hhk=$tmp.'edes_index.hhk';
unlink($hhk);
$chm=$tmp.'edes.chm';
unlink($chm);
$archivo_portada=$tmp.'h/__portada__.htm';
unlink($archivo_portada);
$portada = grabaPortada( $archivo_portada );
$default_topic='h/'.basename($portada);
$labelFile=$tmp.'indice.ind';
unlink($labelFile);
$f=fopen($labelFile,'w');
foreach($indices as $k=>$v){
fwrite($f,file_get_contents($v));
}
fclose($f);
$lFa=file($labelFile);
$filesa=array();
$indent=0;
$buscar="á,é,í,ó,ú,Á,É,Í,Ó,Ú";
$buscar=explode(',',$buscar);
$reemplazar="a,e,i,o,u,A,E,I,O,U";
$reemplazar=explode(',',$reemplazar);
foreach($lFa as $k=>$v){
if($v[0]=='[')continue;
if(trim($v)=='')continue;
$t=trim($v);
if($t[0]=='.')continue;
$indent=strlen(rtrim($v))-strlen(trim($v));
if(strpos($v,'{')){
$t=explode('{',$v);
$v=$t[0];
$f=substr($t[1],0,strpos($t[1],'}') );
}
$f=$H.strtolower(trim($v)).'.htm';
$f=str_replace(' ','_',$f);
$f=str_replace($buscar,$reemplazar,$f);
if(strpos($v,'+')){
$t=explode('+',$v);
$f=str_replace('+','_',$v);
$f=$H.strtolower(trim($f)).'.htm';
$v=$t[0];
}
$i=count($filesa);
$filesa[$i]['name']=trim($v);
$filesa[$i]['filename']=$f;
$filesa[$i]['indent']=$indent;
}
foreach ($filesa as $k=>$v){
$i=$filesa[$k]['indent'];
$ii=$filesa[$k+1]['indent'];
if( !($i==$ii || $i>$ii) ){
$filesa[$k]['filename']='';
}else{
$s=file_get_contents( $filesa[$k]['filename'] );
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
$_chm =				'M:\\edes.help\\tmp\\edes.chm';
$_hhc =				'M:\\edes.help\\tmp\\edes_toc.hhc';
$_hhk =				'M:\\edes.help\\tmp\\edes_index.hhk';
$_default_topic =	'h\\__portada__.htm';
$fh = fopen($hhp,'w');
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
$fh=fopen($hhk,'w');
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
die('FIN paso 1º');
$ret = exec( $compiler.' '.$hhp );
if( substr($ret,0,7)=='HHC5010'){
echo 'El archivo CHM está abierto, cerrarlo para poder compilarlo.<br>';
}
die($ret);
function grabaPortada($archivo){
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
<center><img src="../../edes_help.jpg"></center>
<br><div style="font-size:10">'. '&nbsp; &copy; '.date('d-m-Y').'</div>
</BODY>
</HTML>
';
fwrite($fh,$s);
fclose($fh);
return 'h/__portada__.htm';
}
?>
