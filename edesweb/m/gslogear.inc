<?PHP
global $_L_, $_User;
if( substr_count($File,'/_tmp/__tron.')==1 ) $Modo = strtolower($Modo);
if( substr_count($File,'/edesweb/')==1 ){
list(,$File) = explode('/edesweb/',$File);
$File = '$'.$File;
}else if( substr_count($File,'/d/')==1 ){
list(,$File) = explode('/d/',$File);
}else{
if( substr($File,0,3)=='../' ) $File = substr($File,2);
}
$zp = gzopen("../_d_/log/activity.{$_User}", "a9");
gzwrite($zp, date('Y-m-d H:i:s')." {$Apli} {$Modo} {$File}\n");
gzclose($zp);
?>
