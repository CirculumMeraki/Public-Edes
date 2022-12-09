<?PHP
$q=$_SERVER['QUERY_STRING'];
$a=explode('&',$q);
$reg_file_path='./';
$reg_file='config_edes.reg';
$p=$a[1];
if($p==''){
$protocolo='http';
}else{
$p=explode(':',$p);
$protocolo=$p[0];
}
$dom=$_SERVER['HTTP_HOST'];
$z=str_replace('.','',$dom);
$z2=$z*1;
if( strlen($z) == strlen($z2) ){
$tipo='ip';
}else{
$tipo='dominio';
}
creaReg($dom,$protocolo,$tipo,$reg_file_path.$reg_file);
$File = $reg_file;
list( $FILE, $Extension ) = explode('.',$File);
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Content-Type: application/force-download");
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");
Header("Content-Type: application/{$Extension}");
header("Content-Disposition: attachment; filename={$FILE}.{$Extension};");
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".filesize($File));
if( !@readfile($reg_file_path.$reg_file) ) echo "Ha sido imposible descargar el fichero";
exit;
function creaReg($dom,$protocolo,$tipo,$reg_file){
include('../../edesweb/registro.inc');
$s="REGEDIT4\n";
foreach($datos_reg as $k=>$v){
$c=$datos_reg[$k]['php'];
$s.= $c."\n";
foreach($datos_reg2[$k] as $j=>$m){
$s.= '"'.$j.'"='. $datos_reg2[$k][$j]['php'] ."\n";
}
$s.="\n";
}
$s.="\n";
switch($tipo){
case 'dominio':
$q='[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings\ZoneMap\Domains\\';
$k=explode('.',$dom);
$ck=count($k);
if( $ck<=2 ){
$s.= $q.$dom.']';
}else{
$s.= $q.$k[$ck-2].'.'.$k[$ck-1];
$s.= '\*.'.$k[$ck-3];
$s.=']';
}
$s.='
"'.$protocolo.'"=dword:00000002';
break;
case 'ip':
$s.='[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings\ZoneMap\Ranges\\'.$dom.']
';
$s.='":Range"="'.$dom.'"
';
$s.='"'.$protocolo.'"=dword:00000002';
break;
}
@unlink($reg_file);
error_log($s,3,$reg_file);
}
?>
