<?PHP
$compiler='Z:\\__EDES\\help\\HTML_Help_Workshop\hhc.exe ';
$H='Z:\\__EDES\\help\\edes\\h\\';
$labelFile=$H.'i\\label.ind';
$tmp=dirname(__FILE__).'\\tmp\\';
mkdir($tmp.'h');
$cssFile=$H.'i\\label.css';
copy( $cssFile , $tmp.'h\\'.basename($cssFile) );
$hhp=$tmp.'edes.hhp';
unlink($hhp);
$hhc=$tmp.'edes_toc.hhc';
unlink($hhc);
$hhk=$tmp.'edes_index.hhk';
unlink($hhk);
$chm=$tmp.'edes.chm';
unlink($chm);
$archivo_portada=$tmp.'h\\__portada__.htm';
unlink($archivo_portada);
$portada=grabaPortada( $archivo_portada );
$default_topic='h\\'.basename($portada);
$titulo='e-Des Help';
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
if($indent==0)continue;
$f=$H.strtolower(trim($v)).'.htm';
$f=str_replace(' ','_',$f);
$f=str_replace($buscar,$reemplazar,$f);
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
$s = file_get_contents( $filesa[$k]['filename'] );
$s=str_replace('<TITLE> HELP EDES-LABELS</TITLE>', '<TITLE>'.$filesa[$k]['name'].'</TITLE>' ,$s);
$s=str_replace('edes.php?R:$h/i/label.css', basename($cssFile),$s);
$filesa[$k]['filename']='h\\'.basename($filesa[$k]['filename']);
$fh=fopen( $tmp.$filesa[$k]['filename'] ,'w');
fwrite($fh,$s);
fclose($fh);
}
}
$fh=fopen($hhp,'w');
$s="[OPTIONS]
Compatibility=1.1 or later
Compiled file={$chm}
Contents file={$hhc}
Index file={$hhk}
Default topic={$default_topic}
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
$ret=exec($compiler.' '.$hhp);
unlink($hhp);
unlink($hhc);
unlink($hhk);
unlink($archivo_portada);
unlink( $tmp.'h\\'.basename($cssFile) );
foreach ($filesa as $k=>$v){
unlink( $tmp.$filesa[$k]['filename'] );
}
rmdir($tmp.'h');
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
<BODY>
<h1>eDes Etiquetas</h1>
</BODY>
</HTML>
';
fwrite($fh,$s);
fclose($fh);
return $tmp.'h\\__portada__.htm';
}
?>
