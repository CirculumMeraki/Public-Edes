if( typeof document.documentElement.sourceIndex=="undefined" )
HTMLElement.prototype.__defineGetter__("sourceIndex", (function(indexOf){
return function sourceIndex(){
return indexOf.call(this.ownerDocument.getElementsByTagName("*"), this);
};
})(Array.prototype.indexOf));
;
Element.prototype.getElementById = function(seek){
var elem=this, children=elem.childNodes, len=children.length, i, id;
for(i=0; i<len; i++){
elem = children[i];
if( elem.nodeType!==1 ) continue;
id = elem.id || elem.getAttribute('id');
if( id===seek ) return elem;
id = elem.getElementById(seek);
if( id ) return id;
}
return null;
}
function eClearEvent(win){
return S.eventClear(win);
}
function DGI(a){
var el;
if( document.getElementById ){
el = document.getElementById(a);
}else if( document.all ){
el = document.document.all[a];
}else if( document.layers ){
el = document.document.layers[a];
}
return el || document.getElementsByName(a)[0] || null;
}
function eLng(i, c1, c2, c3){
return top.eLng(i, c1, c2, c3);
}
function eGF(n){
return S(":"+n).val();
}
function ePF(n, v, c){
S(":"+n).val(v);
if(c) S.eventFire(window, S(":"+n).obj, "onchange");
}
function eGO(campo){
return S(":"+campo).obj;
}
function px(v){
return v+((v==v*1)?"px":"");
}
function eXY(el, Obj){
return top.eXY(el, Obj);
}
function eUrl(url){
location.href = url+"&_CONTEXT="+_CONTEXT;
}
function eMid(txt, Ini, Long){
return S.mid(txt, Ini, Long);
}
