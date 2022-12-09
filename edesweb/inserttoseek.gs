function eInsertToSeek(){
_NewAction = "S";
_SaveList = [];
function InArray(Op,Dim){
for(var j in Dim) if(Dim[j]==Op) return true;
return false;
}
var Dim = '<?= $_SESSION['_InsertToSeek'] ?>'.split(',');
if( typeof(_InsertToSeek)!='undefined' ) Dim = _InsertToSeek.split(',');
var DimON = '<?= $_SESSION['_InsertToSeekEdit'] ?>'.split(',');
if( typeof(_InsertToSeekEdit)!='undefined' ) DimON = _InsertToSeekEdit.split(',');
var DimOFF = '<?= $_SESSION['_InsertToSeekNoEdit'] ?>'.split(',');
if( typeof(_InsertToSeekNoEdit)!='undefined' ) DimOFF = _InsertToSeekNoEdit.split(',');
<?PHP
$url1 = strtoupper($_GET['_url']);
$url1 = $url1[0]."M".substr($url1,2);
$url2 = "";
switch( $url1[0] ){
case 'G':
$url2 = "@M".substr($url1,2);
break;
case '@':
$url2 = "GM".substr($url1,2);
break;
case 'F':
$url2 = "#M".substr($url1,2);
break;
case '#':
$url2 = "FM".substr($url1,2);
break;
}
$puedeModificar = false;
$dim = file('../_tmp/php/menu.'.$_SESSION['_User']);
for($n=0; $n<count($dim); $n++){
$url = strtoupper(trim($dim[$n]));
if( $url==$url1 || $url==$url2 ){
$puedeModificar = true;
break;
}
}
if( $puedeModificar ) echo '_SeekForUpdate = true;';
?>
_ShowZero = 0;
_Filtrar = true;
_Action = _Action.replace('?'+_Obj+_Accion+':', '?'+_Obj+'cR:');
_Mode = 'c';
_Accion = 'cR';
_Question = _ConBusqueda = true;
_FormStatic = false;
var f,n,p,Obj,txt,o;
for(f=0; f<document.forms.length; f++){
Obj = document.forms[f];
if( Obj==undefined || Obj.name<'FRM1' || Obj.name>'FRM99' ) continue;
if( Obj.getAttribute("eType")!='InDirecto' ){
p = Obj.elements;
for(n=0; n<p.length; n++){
if( p[n].tagName=='FIELDSET' || p[n].type=='button' ) continue;
if( p[n].type=='file' ){
p[n].readOnly = true;
o = eIndex(S(":"+S.left(p[n].name,6,0)).obj.sourceIndex+1);
if( o.tagName=="I" ) S(o).hidden();
}
if( p[n].readOnly ){
if( InArray(p[n].name, DimOFF) ) continue;
if( p[n].TC=="F4" || p[n].TC=="P4" ){
p[n].readOnly = false;
}else if( InArray(p[n].name,DimON) ){
}else{
continue;
}
}else if( p[n].tagName=='TEXTAREA' || InArray(p[n].name,DimOFF) ){
p[n].className = 'READONLY';
p[n].readOnly = true;
p[n].onfocus = function(){ _CpField(); }
p[n].style.cursor = "default";
continue;
}
if( p[n].name.substr(0,7)=='_INPUT_' ){
if( p[n].className!='READONLY' ) ePF( p[n].name.substr(7),'',0);
continue;
}
if( p[n].tagName=='INPUT' && p[n].className!='READONLY' ) p[n].maxLength = p[n].maxLength*3+6;
if( p[n].name[0]=='_' && !InArray(p[n].name,DimON) ){
eEF(p[n].name,0);
continue;
}
if( !InArray(p[n].name,Dim) ){
if( DGI('_INPUT_'+p[n].name)!=null ){
o = DGI(p[n].name+'_TABLE');
if( o!=null ){
var TR =  o.rows;
if( TR.length==0 || TR[0].cells[0].textContent!='' ) eAddOption(p[n].name,Array(Array('','')),0);
}
o = DGI(p[n].name+'_TABLE');
if( o!=null ){
var TR =  o.rows;
if( TR.length==0 || TR[0].cells[0].textContent!='' ) eAddOption(p[n].name,Array(Array('','')),0);
}
}else{
try{
eEF(p[n].name,1);
}catch(e){}
}
ePF(p[n].name,'',0);
}
if( p[n].type=='radio' ){
p[n].checked = false;
}
}
}
}
for(f=0; f<_SaveList.length; f++){
p = 'c'+_SaveList[f].substr(0,_SaveList[f].indexOf('|'));
if( DGI(p)!=null ){
DGI(p).style.display = 'none';
p = '___op_'+p.substr(2,p.length-3);
if( DGI(p)!=null ){
S(":"+p).toTag("TABLE").style.display = 'none';
var nm = _SaveList[f].split("|")[0], i, dim, x;
for(i=0; i<_DimChildrenData.length; i++){
if( _DimChildrenData[i][0]==nm ){
dim = _DimChildrenData[i][4].split(",");
for(n=0; n<dim.length; n++){
x = dim[n];
if( x!="IMG" && S.left(x,1)!="*" ){
eHide(x, "tr");
}
}
break;
}
}
}
}
}
if( DGI('_ISUBLISTSERIAL')!=null ){
p = document.getElementsByTagName('IFRAME');
for(f=p.length-1; f>=0; f--) if( p[f].className=='ISubList' ) S(p[f]).nodeRemove();
}
f=0;
while( DGI('AddButton'+(++f))!=null ){
DGI('AddButton'+f).style.visibility = 'hidden';
}
txt = "Buscar";
if( typeof(_SubmitToSeek)!="undefined" && _SubmitToSeek!="" ) txt = _SubmitToSeek;
S("#OpExe").html('<i class="ICONINPUT ICONSEEK">S</i>'+txt).attr('NoJsCheck', 1);
OpExe.oncontextmenu = function anonymous(){
_Filtrar = false;
_CountType = 1;
_Action = _Action.replace('?GcR:', '?FcR:')+'&_COUNT';
S("#OpExe").html('<i class="ICONINPUT ICONCOUNT">J</i>Contar').attr("title","");
OpExe.oncontextmenu = function anonymous(){ _LastCounts(); }
return eClearEvent();
}
if( typeof(_InsertToSeekFunction)!='undefined' && _InsertToSeekFunction!="" ){
eval(_InsertToSeekFunction)();
}
if( S("#edMENUS").length ){
edClose();
S("#edMENUS").none();
S("DIV #edCONTAINER SPAN").html("");
S("DIV #edCONTAINER").css("pointerEvents:none");
}
S("TEXTAREA, DIV #edCONTAINER").class("READONLY").attr("readonly", "true");
S("INPUT[type=file]").each(function(k,o){
o.value = "";
S(":"+S.mid(o.name,6,0)) .val("");
});
S(".FILEGROUP INPUT").class("READONLY");
S("I[eFO]").css("pointerEvents:none");
S("TD[eSubListBox='1']").each(function(k,o){
var oTR = S.toTag(o, "TR"),
i = oTR.rowIndex,
oTR2 = S(S.toTag(oTR, "TABLE").rows[i-1]);
S(oTR).nodeRemove();
oTR2.nodeRemove();
});
S("a>.AddButton").each(function(k,o){
var oTR = S.toTag(o, "TR"),
hasta = oTR.rowIndex, n, ttr,
oTRS = S.toTag(oTR, "TABLE").rows;
for(n=hasta; n>=0; n--){
ttr = (S(oTRS[n]).attr("ttr")=="-");
S("INPUT", oTRS[n]).class("READONLY").attr("readonly", "true");
S("IMG", oTRS[n]).css("pointerEvents:none");
S("A", oTRS[n]).class("+OFF").css("pointerEvents:none");
if( ttr ) return;
}
});
<?PHP
$txt = file_get_contents("../../edesweb/form_cnd.php");
$txt = trim(str_replace(array("\n","\n","\r"),array("","",""), $txt));
echo "S('{$txt}').nodeEnd('body');";
?>
}
eInsertToSeek();
<?PHP
include('../../edesweb/lastcount.js');
?>
