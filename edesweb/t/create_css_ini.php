<?PHP
?>
<?= eHTML('$t/create_css_ini.php') ?>
<style>
BODY {
visibility:hidden;
}
.BROWSE {
margin:0px;
padding:0px;
}
</style>
<?PHP
$dim = file("../_datos/config/core.css");
for($n=0; $n<count($dim); $n++){
$dim[$n] = trim($dim[$n]);
if( substr($dim[$n],0,7)=='$fBase:' ){
list(,$fBase) = explode(":",$dim[$n]);
list($fBase) = explode("px",$fBase);
}else if( substr($dim[$n],0,10)=='$fBaseBIG:' ){
list(,$fBaseBIG) = explode(":",$dim[$n]);
list($fBaseBIG) = explode("px",$fBaseBIG);
}else if( substr($dim[$n],0,10)=='$fIconTab:' ){
list(,$fIconTab) = explode(":",$dim[$n]);
list($fIconTab) = explode("px",$fIconTab);
}else if( substr($dim[$n],0,13)=='$fIconTabBIG:' ){
list(,$fIconTabBIG) = explode(":",$dim[$n]);
list($fIconTabBIG) = explode("px",$fIconTabBIG);
}else if( substr($dim[$n],0,15)=='$fIconTabSmall:' ){
list(,$fIconTabSmall) = explode(":",$dim[$n]);
list($fIconTabSmall) = explode("px",$fIconTabSmall);
}else if( substr($dim[$n],0,10)=='$fBaseTLF:' ){
list(,$fBaseTLF) = explode(":",$dim[$n]);
list($fBaseTLF) = explode("px",$fBaseTLF);
}else if( substr($dim[$n],0,12)=='$fBaseSmall:' ){
list(,$fBaseSmall) = explode(":",$dim[$n]);
list($fBaseSmall) = explode("px",$fBaseSmall);
}else if( substr($dim[$n],0,15)=='$inputPaddingV:' ){
list(,$inputPaddingV) = explode(":",$dim[$n]);
$inputPaddingV = trim($inputPaddingV);
}
}
$fBase = trim($fBase);
$fBaseBIG = trim($fBaseBIG);
$fBaseTLF = trim($fBaseTLF);
$fBaseSmall = trim($fBaseSmall);
$fIconTab = trim($fIconTab);
$fIconTabBIG = trim($fIconTabBIG);
$fIconTabSmall = trim($fIconTabSmall);
$NEXT = $_GET['_NEXT'];
switch($_GET['_NEXT']){
case "":
$sufijo = "";
break;
case "_big";
$sufijo = "_big";
$fIconTab = $fIconTabBIG;
$fBase = $fBaseBIG;
break;
case "_small";
$sufijo = "_small";
$fIconTab = $fIconTabSmall;
$fBase = $fBaseSmall;
break;
case "_tlf";
$sufijo = "_tlf";
$fBase = $fBaseTLF;
break;
default:
$sufijo = "END";
}
if( $_POST["css"]<>"" ){
$txt = "\n/"."/ ".date('Y-m-d H:i:s');
$txt = "\n".'$'."_DefaultSize = array();\n\n";
list(,$tabs,$list,$iList) = explode("~", $_POST["css"]);
$tmp = explode("|",$tabs);
for($n=1; $n<count($tmp); $n++){
list($k,$v) = explode("=",$tmp[$n]);
switch( $k ){
case 'U':
case 'L':
case 'N':
case '0':
$txt .= '$'."_DefaultSize['TC']['{$k}'] = {$v};\n";
break;
case 'uN':
case 'uP':
case 'uC':
$txt .= '$'."_DefaultSize['TC']['{$k}'] = {$v};\n";
break;
default:
$txt .= '$'."_DefaultSize['TT']['{$k}'] = {$v};\n";
}
}
$txt .= '$'."_DefaultSize['CSS']['inputPaddingV'] = {$inputPaddingV};\n";
$txt .= "\n";
$tmp = explode("|",$list);
for($n=1; $n<count($tmp); $n++){
list($k,$v) = explode("=",$tmp[$n]);
switch( $k ){
case 'U':
case 'L':
case 'N':
case '0':
$txt .= '$'."_DefaultSize['LC']['{$k}'] = {$v};\n";
break;
case 'uN':
case 'uP':
case 'uC':
$txt .= '$'."_DefaultSize['LC']['{$k}'] = {$v};\n";
break;
default:
$txt .= '$'."_DefaultSize['LT']['{$k}'] = {$v};\n";
}
}
$txt .= "\n";
$tmp = explode("|",$iList);
for($n=1; $n<count($tmp); $n++){
list($k,$v) = explode("=",$tmp[$n]);
switch( $k ){
case 'U':
case 'L':
case 'N':
case '0':
$txt .= '$'."_DefaultSize['IC']['{$k}'] = {$v};\n";
break;
case 'uN':
case 'uP':
case 'uC':
case 'uM':
$txt .= '$'."_DefaultSize['IC']['{$k}'] = {$v};\n";
break;
default:
$txt .= '$'."_DefaultSize['IT']['{$k}'] = {$v};\n";
}
}
$txt .= "\n";
$txtAdd = file_get_contents("../../edesweb/width_add.txt");
file_put_contents("../_datos/config/width_css{$sufijo}.php", '<?PHP '."\n".$txt."\n".$txtAdd."\n".'?>');
switch($sufijo){
case "":
$NEXT = "_big";
break;
case "_big";
$NEXT = "_small";
break;
case "_small";
$NEXT = "_tlf";
break;
case "_tlf";
$NEXT = "END";
break;
default:
$NEXT = "END";
}
include("../_datos/config/sql.ini");
echo "<script type='text/javascript'>";
if( $NEXT=="END" ){
echo "top.S.info('Cálculo de anchos generados.');";
}else{
?>
location.replace("edes.php?E:$t/create_css_ini.php&_NEXT='<?=$NEXT?>'");
<?PHP
}
echo "</script>";
exit;
}
eContextPut('E:$t/create_css_ini.php');
?>
<?PHP
echo '<SCRIPT type="text/javascript" name=eDes>';
echo "top.S.init(window,'all,tab,list,all{$_GET['_NEXT']}');";
include("../../edesweb/binary.js");
echo '</SCRIPT>';
echo "<style>";
echo "* {font-size:{$fBase}px}";
?>
INPUT[TD='N'],
INPUT[TD='F4'],
INPUT[TD='P4'],
INPUT[TD='CP'],
INPUT[TD='T'],
INPUT[TD='CDI'],
INPUT[TD='H8'],
INPUT[TD='H5'],
INPUT[TD='H2'],
INPUT[TD='CLR'],
INPUT[TD='clr'],
INPUT[TD='0'],
INPUT[TD='DC']
{
font-family:numeric;
}
<?PHP
echo "</style>";
$FontFamilyNumber = $_SESSION["CSSDynamic"]["FontNumbers"];
if( $FontFamilyNumber!="" ){
$StyleNumber = " style='font-family:{$FontFamilyNumber}'";
}else{
$StyleNumber = "";
}
?>
</head>
<body>
<?PHP
$randUpper = "";
$randLower = "";
$randNum = "";
$randCero = "";
for($n=0; $n<2000; $n++){
$randUpper .= chr(rand(65,90));
$randLower .= chr(rand(97,122));
$randNum .= chr(rand(48,57));
$randCero .= "0";
}
?>
<table id='PAGINA' style='width:100%; height:100%; background:transparent; display:table' valign='bottom' border=0px cellspacing=0px cellpadding=0px><tr><td align=center id="Papel">	<DIV id="TABContainer" onmousewheel="return false;" style="display:table;text-align:left;vertical-align:top;">
<TABLE id='TABBorder' border=0px cellspacing=0px cellpadding=0px class='TABStyle' style="">
<TR>
<TD id='TABHeader' valign=top>
<TABLE border=0px cellspacing=0px cellpadding=0px width=100%>
<TR>
<TD class='TABHeaderIcons' id='TABHeaderIcons' width=1px>
<i class="ICONDESKTOP" style="color:#257086;margin:0px;">°</i><i class="ICONDESKTOP" style="color:#63a1b3;margin:0px;">±</i>
</TD>
<TD class='TABHeaderTitle' id='TABHeaderTitle' onclick='_SetCaption("TD")'>TAMAÑOS</TD>
<TD class='TABHeaderIcons' id='TABHeaderIcons' width=1px></TD>
</TR>
</TABLE>
</TD>
</TR>
<TR><TD id='TABBody'>
<TABLE border=0px cellspacing=0px cellpadding=0px class='TABMiddle' id='TABBodyForm' style='border-collapse:collapse;'>
<TR><TD style='text-align:left;vertical-align:top;'><!-- margin-bottom:0;padding-bottom:0 -->
<?PHP
echo '<div id=FieldsList>FIELDS';
echo '<br>';
echo "<input type=text class=EDITABLE TD=U value='{$randUpper}'>";
echo '<br>';
echo "<input type=text class=EDITABLE TD=L value='{$randLower}'>";
echo '<br>';
echo "<input type=text class=EDITABLE TD=N value='{$randNum}' {$StyleNumber}>";
echo '<br>';
echo "<input type=text class=EDITABLE TD=0 value='{$randCero}' {$StyleNumber}>";
echo '<br>';
echo "<input type=text class=EDITABLE TD=F4 value='".eDataFormat("2000-08-08", "F4")."' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=P4 value='".eDataFormat("2000-08", "P4")."' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=CDI value='".eDataFormat("2000-08-08 00-00-00", "CDI")."' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=CP value='99999' {$StyleNumber}>";
echo '<br>';
echo "<input type=text class=EDITABLE TD=H8 value='00:00:00' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=H5 value='00:00' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=H2 value='00' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=DC value='99' {$StyleNumber}>";
echo '<br>';
echo "<input type=text class=EDITABLE TD=T value='".$_SESSION["_FormatT"]."' {$StyleNumber}>";
echo '<br>';
echo "<input type=text class=EDITABLE TD=CLR value='#AAAAAA' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=clr value='#AAAAAA' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=IP  value='999.999.999.999' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=DNI value='99999999' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=NIF value='99999999M' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=nif value='99999999M' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=CIF value='M99999999' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=cif value='M99999999' {$StyleNumber}>";
echo "<input type=text class=EDITABLE TD=NSS value='99999999999' {$StyleNumber}>";
echo '<br>';
echo "<input type=text class=EDITABLE TD=uN value='".str_repeat("9",2000)."' {$StyleNumber}><br>";
echo "<input type=text class=EDITABLE TD=uP value='".str_repeat(".",2000)."' {$StyleNumber}><br>";
echo "<input type=text class=EDITABLE TD=uC value='".str_repeat(",",2000)."' {$StyleNumber}><br>";
echo "<input type=text class=EDITABLE TD=uM value='".str_repeat("-",2000)."' {$StyleNumber}>";
echo '</div>';
echo '<span class=ISubListBODY id=ConfigISubList>SUBLIST';
echo '<table class=BROWSE>'."<tr><td TD=U>{$randUpper}</td></tr>".'</table>';
echo '<br>';
echo '<table class=BROWSE>'."<tr><td TD=L>{$randLower}</td></tr>".'</table>';
echo '<br>';
echo '<table class=BROWSE>'."<tr><td TD=N {$StyleNumber}>{$randNum}</td></tr>".'</table>';
echo '<br>';
echo '<table class=BROWSE>'."<tr><td TD=0 {$StyleNumber}>{$randCero}</td></tr>".'</table>';
echo '<br>';
echo '<table class=BROWSE>'."<tr><td TD=F4 {$StyleNumber}>".eDataFormat("2000-08-08", "F4")."</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=P4 {$StyleNumber}>".eDataFormat("2000-08", "P4")."</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=CDI {$StyleNumber}>".eDataFormat("2000-08-08 00-00-00", "CDI")."</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=CP {$StyleNumber}>99999</td></tr>".'</table>';
echo '<br>';
echo '<table class=BROWSE>'."<tr><td TD=H8 {$StyleNumber}>00:00:00</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=H5 {$StyleNumber}>00:00</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=H2 {$StyleNumber}>00</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=DC {$StyleNumber}>99</td></tr>".'</table>';
echo '<br>';
echo '<table class=BROWSE>'."<tr><td TD=T {$StyleNumber}>999999999</td></tr>".'</table>';
echo '<br>';
echo '<table class=BROWSE>'."<tr><td TD=CLR {$StyleNumber}>#AAAAAA</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=clr {$StyleNumber}>#AAAAAA</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=IP  {$StyleNumber}>999.999.999.999</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=DNI {$StyleNumber}>99999999</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=NIF {$StyleNumber}>99999999M</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=nif {$StyleNumber}>99999999M</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=CIF {$StyleNumber}>M99999999</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=cif {$StyleNumber}>M99999999</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=NSS {$StyleNumber}>99999999999</td></tr>".'</table>';
echo '<br>';
echo '<table class=BROWSE>'."<tr><td TD=uN {$StyleNumber}>".str_repeat("9",2000)."</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=uP {$StyleNumber}>".str_repeat(".",2000)."</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=uC {$StyleNumber}>".str_repeat(",",2000)."</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=uM {$StyleNumber}>".str_repeat("-",2000)."</td></tr>".'</table>';
echo '</span>';
?>
</td></tr></table>
</td></tr></table>
</td></tr></table>
<?PHP
echo '<br>';
echo '<div class=BODYLIST id=ConfigList>LIST';
echo '<table class=BROWSE>'."<tr><td TD=U>{$randUpper}</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=L>{$randLower}</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=N {$StyleNumber}>{$randNum}</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=0 {$StyleNumber}>{$randCero}</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=F4 {$StyleNumber}>".eDataFormat("2000-08-08", "F4")."</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=P4 {$StyleNumber}>".eDataFormat("2000-08", "P4")."</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=CDI {$StyleNumber}>".eDataFormat("2000-08-08 00-00-00", "CDI")."</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=CP {$StyleNumber}>99999</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=H8 {$StyleNumber}>00:00:00</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=H5 {$StyleNumber}>00:00</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=H2 {$StyleNumber}>00</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=DC {$StyleNumber}>99</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=T {$StyleNumber}>999999999</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=CLR {$StyleNumber}>#AAAAAA</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=clr {$StyleNumber}>#AAAAAA</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=IP  {$StyleNumber}>999.999.999.999</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=DNI {$StyleNumber}>99999999</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=NIF {$StyleNumber}>99999999M</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=nif {$StyleNumber}>99999999M</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=CIF {$StyleNumber}>M99999999</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=cif {$StyleNumber}>M99999999</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=NSS {$StyleNumber}>99999999999</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=uN {$StyleNumber}>".str_repeat("9",2000)."</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=uP {$StyleNumber}>".str_repeat(".",2000)."</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=uC {$StyleNumber}>".str_repeat(",",2000)."</td></tr>".'</table>';
echo '<table class=BROWSE>'."<tr><td TD=uM {$StyleNumber}>".str_repeat("-",2000)."</td></tr>".'</table>';
echo '</div>';
echo '<br>';
?>
<FORM METHOD=POST action="edes.php?E:$t/create_css_ini.php&_NEXT=<?=$NEXT?>&_CONTEXT=<?= $_SESSION['_eDes_'] ?>" style="display:none">
<TEXTAREA TYPE="text" NAME="css"></TEXTAREA>
</FORM>
<script type="text/javascript">
setTimeout(function(){
var _DimColsWidth = new Array();
_DimColsWidth["T"] = new Array(), ok=false;
S("INPUT",DGI("FieldsList")).each(function($pk, $obj){
if( !ok ){
_DimColsWidth["T"]["pdd"] = S($obj).css("padding-left")+S($obj).css("padding-right");
ok = true;
}
var td = S($obj).attr("TD"),
o = S($obj).obj, n;
o.style.width = "1px";
n = (o.scrollWidth-S(o).css("paddingLeft")-S(o).css("paddingRight"));
o.style.width = n+"px";
_DimColsWidth["T"][td] = n;
});
_DimColsWidth["T"]["H"] = S('input').css("height");
_DimColsWidth["T"]["U"] /= 2000;
_DimColsWidth["T"]["L"] /= 2000;
_DimColsWidth["T"]["N"] /= 2000;
_DimColsWidth["T"]["0"] /= 2000;
_DimColsWidth["T"]["uN"] /= 2000;
_DimColsWidth["T"]["uP"] /= 2000;
_DimColsWidth["T"]["uC"] /= 2000;
_DimColsWidth["T"]["uM"] /= 2000;
_DimColsWidth["L"] = new Array(), ok=false;
S("TD",DGI("ConfigList")).each(function($pk, $obj){
if( !ok ){
_DimColsWidth["L"]["pdd"] = S($obj).css("padding-left")+S($obj).css("padding-right");
ok = true;
}
var td = S($obj).attr("TD");
_DimColsWidth["L"][td] = S($obj).obj.offsetWidth;
});
_DimColsWidth["L"]["U"] /= 2000;
_DimColsWidth["L"]["L"] /= 2000;
_DimColsWidth["L"]["N"] /= 2000;
_DimColsWidth["L"]["0"] /= 2000;
_DimColsWidth["L"]["uN"] /= 2000;
_DimColsWidth["L"]["uP"] /= 2000;
_DimColsWidth["L"]["uC"] /= 2000;
_DimColsWidth["L"]["uM"] /= 2000;
_DimColsWidth["I"] = new Array(), ok=false;
S("TD",DGI("ConfigISubList")).each(function($pk, $obj){
if( !ok ){
_DimColsWidth["I"]["pdd"] = S($obj).css("padding-left")+S($obj).css("padding-right");
ok = true;
}
var td = S($obj).attr("TD");
_DimColsWidth["I"][td] = S($obj).obj.offsetWidth;
});
_DimColsWidth["I"]["U"] /= 2000;
_DimColsWidth["I"]["L"] /= 2000;
_DimColsWidth["I"]["N"] /= 2000;
_DimColsWidth["I"]["0"] /= 2000;
_DimColsWidth["I"]["uN"] /= 2000;
_DimColsWidth["I"]["uP"] /= 2000;
_DimColsWidth["I"]["uC"] /= 2000;
_DimColsWidth["I"]["uM"] /= 2000;
var txt="", p;
txt += "~T";
for(p in _DimColsWidth["T"] ){
txt += "|"+p+'='+_DimColsWidth["T"][p];
}
txt += "~L";
for(p in _DimColsWidth["L"] ){
txt += "|"+p+'='+_DimColsWidth["L"][p];
}
txt += "~I";
for(p in _DimColsWidth["I"] ){
txt += "|"+p+'='+_DimColsWidth["I"][p];
}
console.log("CSS: [<?=$NEXT.' - '.$fBase?>]");
document.forms[0].elements[0].value = txt;
document.forms[0].submit();
}, 5000);
S("INPUT",DGI("FieldsList")).each(function($pk, $obj){
var td = S($obj).attr("TD"),
o = S($obj).obj, n;
o.style.width = "1px";
n = (o.scrollWidth-S(o).css("paddingLeft")-S(o).css("paddingRight"));
o.style.width = n+"px";
});
</script>
</body>
</html>
