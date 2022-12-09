<?PHP
if( $_gsID != getmypid() ) exit;
if( !isset($_SESSION['_User']) ){
include('index.htm');
exit;
}
$DimDelete = array();
$Patron = $_User.'_id_';
$PatronLeng = strlen($Patron);
$Doc = '';
$Dim = array();
$NomDir = '../_tmp/imp/';
$di = opendir( $NomDir );
while( $file = readdir( $di ) ){
if( $file!='.' && $file!='..' && substr($file,0,$PatronLeng)==$Patron ){
if( substr($file,-5)=='.html' ){
$Doc = file_get_contents( $NomDir.$file );
$DimDelete[] = $NomDir.$file;
}else{
array_push( $Dim, substr($file,$PatronLeng) );
}
}
}
closedir($di);
$ImgInterna = $_GET['ImgInterna'];
$sq = (int)eGetMicrotime();
if( $Doc!='' ){
$_GET['EXT'] = strtoupper($_GET['EXT']);
if( $_GET['EXT']=='DOC' || $_GET['EXT']=='DOCX' || $_GET['EXT']=='RTF' ){
for( $n=0; $n<count($Dim); $n++ ){
$Ext = substr( $Dim[$n], strpos($Dim[$n],'.')+1 );
if( $ImgInterna ){
$Imagen = 'data:image/'.$Ext.';base64,'.base64_encode( file_get_contents( $NomDir.$Patron.$Dim[$n] ) );
$DimDelete[] = $NomDir.$Patron.$Dim[$n];
$Doc = str_replace( 'src="'.$_GET['DIR'].'/'.$Dim[$n], ' src="'.$Imagen, $Doc );
}else{
$NewFile = 'img/'.$_User.'_'.$sq.'.'.$Ext;
rename( $NomDir.$Patron.$Dim[$n], $NewFile );
$Doc = str_replace( 'src="'.$_GET['DIR'].'/'.$Dim[$n], ' src="'.$NewFile, $Doc );
$sq++;
}
}
}else{
for( $n=0; $n<count($Dim); $n++ ){
$Ext = substr( $Dim[$n], strpos($Dim[$n],'.')+1 );
if( $ImgInterna ){
$Imagen = 'data:image/'.$Ext.';base64,'.base64_encode( file_get_contents( $NomDir.$Patron.$Dim[$n] ) );
$DimDelete[] = $NomDir.$Patron.$Dim[$n];
}
$tv = substr_count( $Doc, $_GET['DIR'].'/'.$Dim[$n] );
if( $ImgInterna ){
$Doc = str_replace( 'src="'.$_GET['DIR'].'/'.$Dim[$n], ' src="'.$Imagen, $Doc );
}else{
$NewFile = 'img/'.$_User.'_'.$sq.'.'.$Ext;
rename( $NomDir.$Patron.$Dim[$n], $NewFile );
$Doc = str_replace( 'src="'.$_GET['DIR'].'/'.$Dim[$n], ' src="'.$NewFile, $Doc );
$sq++;
}
for( $nv=0; $nv<$tv; $nv++ ){
$i = strpos( $Doc, $_GET['DIR'].'/'.$Dim[$n], $i+1 );
for( $p=$i; $p>0; $p-- ){
if( substr( $Doc, $p, 1 ) == '<' ){
if( substr( $Doc, $p, 5 ) == '<img ' ){
$ParteIzq = substr( $Doc, 0, $i );
$ParteDch = substr( $Doc, $i+strlen($_GET['DIR'].'/'.$Dim[$n]) );
$e = strrpos( $ParteIzq, '<![if !vml]>' );
if( $e===false ){
}else{
$ParteIzq = substr( $ParteIzq, 0, $e ) . substr( $ParteIzq, $e+12 );
$e = strpos( $ParteDch, '<![endif]>' );
if( $e===false ){
}else{
$ParteDch = substr( $ParteDch, 0, $e ) . substr( $ParteDch, $e+10 );
}
}
break;
}else if( substr( $Doc, $p, 13 ) == '<v:imagedata ' ){
$ParteIzq = substr( $Doc, 0, $i );
$ParteDch = substr( $Doc, $i+strlen($_GET['DIR'].'/'.$Dim[$n]) );
$Ini = strrpos( $ParteIzq, '<!'.'--' );
if( $Ini===false ){
}else{
$ParteIzq = substr( $ParteIzq, 0, $Ini );
$Fin = strpos( $Doc, '--'.'>', $Ini );
if( $Fin===false ){
}else{
$Doc = substr( $Doc, 0, $Ini ) . substr( $Doc, $Fin+3 );
}
}
break;
}
}
}
}
}
}
if( $_GET['CopyTo']!='' ) file_put_contents( eScript($_GET['CopyTo']), $Doc );
$Doc = str_replace( '"', '&quot;', $Doc );
$Doc = str_replace( chr(10), '\\n', $Doc );
$Doc = str_replace( chr(13), '\\r', $Doc );
?>
<script type="text/javascript">
if( window.frameElement.WOPENER.eWordToHtmlPut ) window.frameElement.WOPENER.eWordToHtmlPut( "<?= $Doc ?>".replace(/&quot;/g,'"') );
</script>
<?PHP
if( $_GET['CopyImgTo']!='' ){
if( substr($_GET['CopyImgTo'],-1)!='/' ) $_GET['CopyImgTo'] .= '/';
for( $n=0; $n<count($DimDelete); $n++ ){
$tmp = explode('/',$DimDelete[$n]);
copy( $DimDelete[$n], $_GET['CopyImgTo'].$tmp[count($tmp)-1] );
}
}
if( $_GET['DelSource'] ) for( $n=0; $n<count($DimDelete); $n++ ) @unlink($DimDelete[$n]);
}
eEnd();
?>
