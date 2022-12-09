<?PHP
set_time_limit(1200);
$Exten	= "css";
$DirOrig	= "css";
$ArrFilesTmp = Ficheros( $DirOrig );
for( $var=0; $var<count($ArrFilesTmp); $var++ ){
$notocar = 0;
$ext = eFileExtension( $ArrFilesTmp[$var] );
if( $Exten == $ext ){
$ArrFiles[] = $ArrFilesTmp[$var];
}
}
if( $fic != '' ){
Cambiar( $fic, $prin, $sec );
}
$func = Colores( $ArrFiles );
sort( $func );
function Ficheros( $Dir ){
if( is_dir($Dir) ){
$File = opendir($Dir);
while( $fichero = readdir($File) ){
if( $fichero != "." && $fichero != ".." ){
if( is_dir($Dir."/".$fichero)){
$ArrDir[] = $Dir."/".$fichero;
}else{
$ArrFic[] = $Dir."/".$fichero;
}
}
}
closedir($File);
if( count($ArrDir) > 0 ){
for( $i=0;$i<count($ArrDir);$i++){
$Dir = $ArrDir[$i];
if( is_dir($Dir) ){
$File = opendir($Dir);
while( $fichero = readdir($File) ){
if( $fichero != "." && $fichero != ".." ){
if( is_dir($Dir."/".$fichero) ){
$ArrDir[] = $Dir."/".$fichero;
}else{
$ArrFic[] = $Dir."/".$fichero;
}
}
}
closedir($File);
}
}
}
sort($ArrFic);
return $ArrFic;
}else{
return false;
}
}
function Colores( $ArrFiles ){
for( $i=0; $i<count($ArrFiles); $i++ ){
$NomFile = $ArrFiles[$i];
if( !file_exists($NomFile) ){
echo "No existe el fichero";
return 0;
}
$tamanyo = filesize( $NomFile )-1;
$File = fopen( $NomFile, "r" );
$buffer = "";
$ValCar = "";
while( !feof($File) ){
$linea = fgets($File,4096);
for( $j=0; $j<strlen($linea); $j++ ){
$ValCar = substr( $linea, $j, 1 );
if( $ValCar == ":" ){
if( (trim($buffer) == "COLOR") or (trim($buffer) == "BACKGROUND") ){
$buffer = "";
while( $ValCar != "#" ){
$j++;
$ValCar = substr($linea,$j,1);
if( ($ValCar == "\n") || ($ValCar == "\r") )
break;
}
if( substr($linea,$j,1) == "#" ){
$buffer = strtoupper(substr($linea,$j,7));
$lotenemos = 0;
for( $k=0; $k<count($func); $k++ ){
if( $func[$k][0] == $buffer ){
$func[$k][1].= "\n".substr($NomFile,4,strlen($NomFile)-8)."\t\t".$title;
$lotenemos = 1;
}
}
if( $lotenemos == 0 ){
$reg = count($func);
$func[$reg][0] = trim($buffer);
$func[$reg][1] = substr($NomFile,4,strlen($NomFile)-8)."\t\t".$title;
}
}
}
$buffer = "";
}else{
if( ($ValCar == "\n") || ($ValCar == "\r") ){
$buffer = "";
}else{
$buffer.= $ValCar;
}
if( $ValCar == '{' )
$title = trim(substr($buffer,0,strlen($buffer)-1));
}
}
}
fclose($File);
}
return $func;
}
function Cambiar( $fic, $c1, $c2 ){
$fi = strtok( $fic, ';' );
while( $fi ){
$NomFile = $_SESSION['_PathCSS'].'/'.$fi.'.css';
$FicDest = '../_tmp/'.$fi.'.css';
if( !file_exists($NomFile) ){
echo "No existe el fichero";
return 0;
}
$tamanyo = filesize( $NomFile )-1;
$File = fopen( $NomFile, "r" );
$FileDes = fopen( $FicDest, "w" );
if( !$FileDes ){
echo "NO se pudo grabar el fichero".$FileDes;
}
while( !feof($File) ){
$linea = fgets( $File, 4096 );
$NewLinea = str_replace( $c2, $c1, $linea );
$NewLinea = str_replace( strtolower($c2), $c1, $NewLinea );
fputs( $FileDes, $NewLinea );
}
fclose($FileDes);
fclose($File);
if( !copy( $FicDest, $NomFile )){
echo "Error Copiando Fichero";
}
@unlink($FicDest);
$fi = strtok(';');
}
}
?>
<!DOCTYPE HTML><HTML>
<HEAD>
<style>
BODY {
BACKGROUND: #f2f2f2;
FONT-FAMILY: ARIAL;
FONT-SIZE: 12px;
}
TABLE {
BACKGROUND: #d8dcdf;
COLOR: #0a00af;
FONT-SIZE: 100%;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #dd8800;
}
TH {
BACKGROUND: #000099;
COLOR: #FFFFFF;
FONT-SIZE: 120%;
PADDING-TOP: 5px;
}
TD {
WHITE-SPACE: nowrap;
BACKGROUND: #FFFFCC;
COLOR: #000066;
}
p {
COLOR: #000099;
}
</style>
<script type="text/javascript">
var c1 = c1_col = '';
var c2 = c2_col = '';
document.oncontextmenu = Cambiar_Valor;
function NoSelect(){ return false; }
document.onselectstart = NoSelect;
function Cambiar_Valor(e){
c1 = S.event(window).parentNode.rowIndex;
c1_col = S.event(window).parentNode.textContent;
if( c1_col.charAt(0) == '#' ){
c1_col = c1_col.substr(1);
}
alert ('PULSA CON EL BOTON IZQUIERDO PARA SELECCIONAR EL COLOR A CAMBIAR');
return false;
}
function Cambiar(){
var cad = tmp = tmpcad = '', nog = 0;
var obj = S.event(window).parentNode;
var fil = obj.rowIndex;
if( c1 == '' ){
alert('HA DE SELECCIONAR CON EL BOTON DERECHO EL COLOR PRINCIPAL');
return;
}
if(c1 == fil ){
alert('NO SE PUEDE CAMBIAR CONSIGO MISMO');
return;
}
var fic = obj.cells[1].title;
var NumFic = fic.split("\n");
for( b=0; b<NumFic.length; b++ ){
tmp = NumFic[b].split("\t");
tmpcad = cad.split(';');
nog = 0;
for( c=0; c<tmpcad.length; c++ ){
if( tmpcad[c] == tmp[0]){
nog = 1;
break;
}
}
if( nog == 0 ) cad += tmp[0]+';';
}
c2 = obj.rowIndex;
c2_col = obj.textContent;
if( c2_col.charAt(0) == '#' ){
c2_col = c2_col.substr(1);
}
location.href = 'colores.gs?fic='+cad+'&prin='+c1_col+'&sec='+c2_col;
}
</script>
</HEAD>
<BODY><pre><TABLE id="Tab" align="center">
<COL align="center">
<TR>
<TH style='FONT-FAMILY:ARIAL' align=center>CODIGO</TH>
<TH style='FONT-FAMILY:ARIAL' width=100 align=center>COLOR</TH>
</TR>
<?PHP
if( count($func) > 0){
for( $i=0;$i<count($func);$i++){
echo "<TR><TD>".$func[$i][0]."<TD style='background:".$func[$i][0]."' title='".$func[$i][1]."' onclick='Cambiar();'>";
}
}
?>
</TABLE>
<CENTER><p><U>FUSION DE COLORES</U>
CON BOTON DERECHO MARCA EL COLOR PRINCIPAL
Y CON EL IZQUIERDO EL COLOR SECUNDARIO
( solo: 'color' y 'background' )
</CENTER>
<SCRIPT type="text/javascript">
top.eLoading(false,window);
</SCRIPT>
</BODY></HTML>
