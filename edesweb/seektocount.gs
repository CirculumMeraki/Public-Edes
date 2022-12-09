function eSeekToCount(){
_NewAction = "C";
function InArray(Op,Dim){
for(var j in Dim) if(Dim[j]==Op) return true;
return false;
}
var Dim = '<?= $_SESSION['_InsertToSeek'] ?>'.split(',');
if( typeof(_InsertToSeek)!='undefined' ) Dim = _InsertToSeek.split(',');
var sObj = _Obj;
if( _Obj=='G' ) sObj = 'F';
_Action = _Action.replace('?'+_Obj+_Accion+':', '?'+sObj+'cR:')+'&_COUNT=3&_OBJ='+_Obj;
_Mode = 'c';
_Accion = 'cR';
_Question = _ConBusqueda = true;
_Filtrar = false;
_CountType = 1;
var f,n,p,Obj,txt,o;
if( DGI('OpButtons')!=null ) DGI('OpButtons').style.display = 'none';
o = S("#OpExe").obj;
S("#OpExe").html('<i class="ICONINPUT ICONSEEK">J</i>Contar').attr({NoJsCheck: 1, title:""});
o.oncontextmenu = function anonymous(){ _LastCounts(); }
if( S("#edMENUS").length ){
edClose();
S("#edMENUS").none();
S("DIV #edCONTAINER SPAN").html("");
S("DIV #edCONTAINER").css("pointerEvents:none");
}
S("TEXTAREA, DIV #edCONTAINER").class("READONLY").attr("readonly", "true");
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
}
eSeekToCount();
<?PHP
include('../../edesweb/lastcount.js');
?>
