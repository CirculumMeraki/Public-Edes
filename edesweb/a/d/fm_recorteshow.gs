<?PHP
eInit(1,1);
$ConPrefijo = '';
$CopyOf = $_GET['CopyOf'];
if( $CopyOf[0]=='o' ){
$CopyOf = substr($CopyOf,1);
$ConPrefijo = 'o';
}
?>
</head><body>
<script type="text/javascript">
var TR,TD;
<?PHP
qQuery( "select cd_gs_img, extension, bytes,ppi,width_px,height_px,extension, nm_gs_img from gs_img where copy_of=".$CopyOf.' order by bytes' );
while($r=qArray()){
$Byts = ceil($r['bytes']/1024);
$PPI = ( ($r['ppi']>0) ? ' / '.$r['ppi'].'ppi' : '' );
$Detalles = '<div class=InfoDIV>'.$r['width_px'].'x'.$r['height_px'].' / '.$Byts.'KB'.$PPI.' / '.$r['extension'].'</div>';
echo 'TR = _WOPENER.DGI("Contenedor").insertRow();';
echo 'TR.style.display = "none";';
echo 'TD = TR.insertCell();';
echo "TD.innerHTML = '<img src=".'"edes.php?R://img/'.$ConPrefijo.$r['cd_gs_img'].'.'.$r['extension'].'" oncontextmenu="uGetImg()" Nombre="'.eQuote($r['nm_gs_img']).'">'."'";
echo '+"'.$Detalles.'"';
echo ";";
}
echo '</script>';
echo '</body></html>';
eEnd();
?>
