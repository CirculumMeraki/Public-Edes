function _GesAux2(Op, OpTextContent, Obj, OpObj, VarUser){
switch(Op){
case null:
break;
case "I":
top.eSWOpen(window, 'edes.php?Fa:'+VarUser[0]+'&_REFRESH='+VarUser[1]+'&_CLOSE_=1');
break;
case "D":
case "U":
top.eSWOpen(window, 'edes.php?F'+((Op=='U')?'m':'b')+'R:'+VarUser[0]+'&_SEEK&'+VarUser[1]+'='+VarUser[2]+'&_REFRESH='+VarUser[1]+'&_CLOSE_=1');
break;
}
}
function _GesAux(HREF, Modo){
var Obj = S.event(window), el;
for( var n=Obj.sourceIndex-1; n>0; n-- ){
el = document.children[n];
if( el.tagName=='INPUT' && el.name.substr(0,7)=='_INPUT_' ){
if( el.readOnly ){
top.eInfo(window,'El campo no es editable');
return;
}
Obj = eGO(el.name.substr(7));
var Dim = new Array();
if( Modo.toUpperCase().indexOf('I')>-1 ) Dim['I'] = '[g/t_op_insert.gif] Alta';
if( Obj.value!='' ){
if( Modo.toUpperCase().indexOf('D')>-1 ) Dim['D'] = '[g/t_op_delete.gif] Borrar';
if( Modo.toUpperCase().indexOf('U')>-1 ) Dim['U'] = '[g/t_op_update.gif] Modificar';
}
top.eMenu(window, S.event(window), Dim, _GesAux2, true, false, Array(HREF,Obj.name,Obj.value));
break;
}
}
}
