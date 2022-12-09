window.onerror = function(msg, url, lin, col, errObj, win){
if(!win) win = window;
if( !win.errorDATE ){
win.errorDATE = S.date("u")*1;
}else if( win.errorDATE*1+3000>S.date("u")*1 ){
return S.eventClear(win);
}
var trace = S.replace(errObj.stack, [[location.href.split("edes.php")[0]+"edes.php?", ""],["    ", "\t\t "]]),
txt = 'ERROR: '+errObj.message+'<br><br>SCRIPT: '+url.split("edes.php")[1]+'<br>LINE: '+lin+', COLUMN: '+col+'<br><br>'+S.replace(trace,[["\t\t","<br>"]]),
pk = S.date("is"),
datos = S.values(win), post="", i;
for(i in datos) post += "\t\t"+i+' = '+datos[i]+"\n";
if( S.setup.errorReporting ){
console.log("ERROR: "+msg+"\n\t"+url+"\n\t"+lin+","+col+"\n\t"+trace);
setTimeout(function(){
S.call("E:$error.gs", {
pk:pk,
error:msg,
trace:trace,
url:S.mid(url,"?",0),
line:lin,
col:col,
post:post,
html:(top!=win ? win.document.documentElement.outerHTML:"")
});
}, 500);
}
if( top._M_=="" ) txt = S.lng(245, pk);
S.info(window, txt, 0, "ERROR");
return S.eventClear(win);
}
if( typeof document.documentElement.sourceIndex=="undefined" )
HTMLElement.prototype.__defineGetter__("sourceIndex", (function(indexOf){
return function sourceIndex(){
return indexOf.call(this.ownerDocument.getElementsByTagName("*"), this);
};
})(Array.prototype.indexOf));
;
var eIndex = function(n, win){
if(!win) win = window;
if( n==undefined ) return win.document.getElementsByTagName("*").length;
return win.document.getElementsByTagName("*").item(n);
}
!function(){
var _Icon = {
I:"I", D:"D", U:"U", V:"V", X:"R",
A:"I", B:"D", M:"U", C:"V",
S:"S", DOC:"F", M:"}", "=":"=", C:",", FILTER:"f",
INSERT:"I", DELETE:"D", UPDATE:"U", VIEW:"V", SEEK:"S",
PRINT:"8", SETUP:"Y",
HELP:"?", INFO:"&#162;",
USER:"q", USERS:"&#241;",
DOWNLOAD:"v", UPLOAD:"w",
W:"&#251;", WEB:"&#251;", "@":"n", EMAIL:"n",
FACEBOOK:"&#163;", TWITTER:"&#164;",
OFF:"i", ON:"j",
TOOLS:"T", COPY:"C", PASTE:"P",
OPEN:"&#169;", CLOSE:"&#170;", HOME:"&#209;",
PDF:"&#202;", EXCEL:"&#203;", WORD:"&#204;",
EXP:"&#178;", EXPORT:"&#178;", IMP:"&#179;", IMPORT:"&#179;",
STAR:"Z", PIN:"/", GPS:"&#167;", EXE:"&#124;" },
_toDo = [],
_Delimiter = "-:",
_FormatMonth = "Y-m",
_FormatDate = "d-m-Y",
_FormatDateTime = "Y-m-d H:i:s",
_gsEditStack = [];
Funciones_INTERNAS: {
var array = function(obj){
var arr=[], i=obj.length;
while(i--) arr[i] = obj[i];
return arr;
}
var cssCapitalize = function(x){
if( /\-/.test(x) ){
return x.toLowerCase().replace(/-[A-Za-z]/g, function(a){ return a.substr(1).toUpperCase(); });
}
return x;
}
var cssUnCapitalize = function(x){
return x.replace(/[A-Z]/g, function(c){
return "-"+c.toLowerCase();
} );
}
var objWindow = function(obj){
if( S.type(obj)=="window" ) return obj;
if( obj.length ) obj = obj[0];
return(obj.ownerDocument.defaultView || obj.ownerDocument.parentWindow);
}
var getStyle = function(el, prop){
var val, win = objWindow(el);
prop = cssUnCapitalize(trim(prop));
if( !win ) win = objWindow(el);
if( el.currentStyle ){
val = el.currentStyle[prop];
}else{
val = win.document.defaultView.getComputedStyle(el,"").getPropertyValue(prop);
}
if( prop=="z-index" && val=="auto" && el.tagName!="BODY" ){
val = getStyle(el.parentNode, prop);
return val;
}
if( mid(val,-2)=="px" ) val = mid(val,0,-2)*1;
return(prop=="z-index" && val=="auto")? 1: val;
}
var createDOM = function(win, html){
var obj = win.document.createElement("div");
obj.innerHTML = html;
return obj.children[0];
}
var selectElements = function(selector, context){
if( context.window ) context = context.document;
if( /^[\#.:]?[\w-]+$/.test(selector) ){
var firstChar = selector[0];
if( firstChar=="." ){
return array(context.getElementsByClassName(selector.slice(1)));
}
if( firstChar=="#" ){
var el;
selector = selector.slice(1);
if( context.getElementById ){
el = context.getElementById(selector);
}else if( context.document && context.document.all ){
el = context.document.all[selector];
}else if( context.document && context.document.layers ){
el = context.document.layers[selector];
}else{
return context.querySelectorAll("#"+selector);
}
return el ? [el] : [];
}
if( firstChar==":" ){
return array(context.querySelectorAll("[name='"+selector.slice(1)+"']"));
}
if( selector=="body" ){
return [context.body];
}
return array(context.querySelectorAll(selector));
}
if( type(selector)=="html") return [selector];
return array(context.querySelectorAll(selector));
}
var px = function(v){
return v+((v==v*1)?"px":"");
}
var px2num = function(x){
return (x+"").replace("px","")*1;
}
var iff = function(v1, cnd, v2){
switch(cnd){
case ">" : return v1 >  v2;
case ">=": return v1 >= v2;
case "<" : return v1 <  v2;
case "<=": return v1 <= v2;
case "!=": return v1 != v2;
case "<>": return v1 != v2;
case "==": return v1 == v2;
case "!==":return v1!== v2;
case "===":return v1=== v2;
}
return false;
}
var splitArg = function(txt){
return S.replace(trim(txt), "  "," ", ","," ").split(" ");
}
var _viewLog = function(masTxt){
S("#_ViewLogCall", top).html(S.date("H:i:s")+": "+S.session.activeCalls);
}
}
var Init = function(selector, context){
if( type(selector)=="window" ){
context = selector;
}else if( type(selector)=="html" ){
context = objWindow(selector);
}else if( typeof(context)!="undefined" && type(context)=="eDes" ){
context = context.obj;
}
this.win = context;
if( typeof selector=="string" ){
if( selector[0]=="<" ){
this.dim = [createDOM(context, selector)];
}else{
this.dim = context && context instanceof Init ? context.find(selector).get() : selectElements(selector, context);
}
}else if( Array.isArray(selector) ){
if( context===null ){
this.dim=selector;
this.length=selector.length;
S.obj = selector;
return this;
}
if( context && context.obj!=undefined ){
context = context.obj;
}
this.dim=[];
var t=selector.length, i, tmp;
for(i=0; i<t; i++){
if( typeof selector[i]=="string" ){
tmp = S(selector[i], context).dim;
if( tmp.length==0 ){
}else if( tmp.length>1 ){
this.dim = this.dim.concat(tmp);
}else{
this.dim.push(S(selector[i], context).obj);
}
}else if( selector[i].win ){
this.dim = selector[i].dim.concat(tmp);
}else{
this.dim.push(selector[i]);
}
}
}else if( selector instanceof NodeList || selector instanceof HTMLCollection ){
this.dim = array(selector);
}else if( selector instanceof Init ){
S.obj = selector;
return selector;
}else if( typeof selector=="function" ){
return this.ready(selector);
}else if( typeof selector=="undefined" ){
return S;
}else if( type(selector)=="window" ){
this.dim = [selector];
}else if( typeof selector=="object" && selector.length && selector.tagName!="FORM" ){
this.dim = selector;
}else{
this.dim = selector ? [selector] : [];
}
this.length = this.dim.length;
this.obj = (this.length>0) ? this.dim[0] : null;
this.selector = selector;
this.type = "eDes";
this.context = context;
}
Init.prototype = {
add: function(selector){
var dim = this.dim,
objToAdd = S(selector, this.win),
domToAdd = objToAdd.get(),
i, e, t=dim.length, dupli;
for(i=0; i<objToAdd.length; i++){
dupli = false;
for(e=0; e<t; e++){
if( dim[e]==domToAdd[i] ){
dupli = true;
break;
}
}
if(!dupli) dim.push(domToAdd[i]);
}
return S(dim);
},
del: function(selector){
var dim = this.dim,
objToDel = S(selector, this.context),
domToDel = objToDel.get(),
i, e, t=dim.length;
if( objToDel.length ){
for(i=0; i<objToDel.length; i++){
for(e=0; e<t; e++){
if( dim[e]==domToDel[i] ){
dim.splice(e,1);
t--;
break;
}
}
}
}
return S(dim);
},
after: function(){
insertHTML.call(this, "afterend", arguments);
return this;
},
append: function(){
insertHTML.call(this, "beforeend", arguments);
return this;
},
appendTo: function(target){
return S(insertHTML.call(S(target), "beforeend", [this]));
},
get: function(index){
if( index==null ) return this.dim;
if( index<0 ) index += this.length;
return this.dim[index];
},
obj: function(){
return this.dim[0];
},
each: function(callback, arg){
var dim = this.dim,
len = this.length, i, num=0;
if( arg==undefined ) arg={};
if( arg["arg"]==undefined ) arg["arg"] = null;
if( arg["bak"] ){
for(i=len-1; i>=0; i--){
num = callback.call(dim[i], i, dim[i], num, arg["arg"]);
if( num===null ) break;
else if( type(num)=="number" ) i = num;
}
}else{
for(i=0; i<len; i++){
num = callback.call(dim[i], i, dim[i], num, arg["arg"]);
if( num===null ) break;
else if( type(num)=="number" ) i = num;
}
}
return this;
}
}
window.S = function(selector, context, win2){
if( type(context)=="string" ){
context = S(context, win2 || window);
}
if( typeof selector=="string" && /^[\#.:]{1}([\w]*)\.([\w]*)/.test(selector) ){
var firstChar = selector[0],
id = selector.slice(1).split("."), el;
if( !context ) context = window.document;
else if( context.window ) context = context.document;
if( firstChar=="." ){
el = context.getElementsByClassName(id[0]);
}else if( firstChar=="#" ){
if( document.getElementById ){
el = context.getElementById(id[0]);
}else if( document.all ){
el = context.document.all[id[0]];
}else if( document.layers ){
el = context.document.layers[id[0]];
}
}else if( firstChar==":" ){
el = context.getElementsByName(id[0])[0];
}
return el ? el.getAttribute(id[1]) : "";
}else if( !context && type(selector)=="html" ){
context = objWindow(selector);
}
return new Init(selector, context || ((context===null)?null:window));
}
S.version = "1.5.0";
S.alertInterval = null;
S.clone = function(obj) {
var copy, i;
if( null==obj || "object"!=typeof obj ) return obj;
if( obj instanceof Date ){
copy = new Date();
copy.setTime(obj.getTime());
return copy;
}
if( S.type(obj)=="array" ){
function copyArray(obj){
if( obj===null || typeof obj!=='object' ) return obj;
var copy = obj.constructor(), key;
for(key in obj) copy[key] = copyArray(obj[key]);
return copy;
}
return copyArray(obj);
}
if( obj instanceof Array ){
copy = [];
for(i=0, len=obj.length; i<len; i++){
copy[i] = S.clone(obj[i]);
}
return copy;
}
if( obj instanceof Object ){
copy = {};
for(i in obj){
if( obj.hasOwnProperty(i) ) copy[i] = S.clone(obj[i]);
}
return copy;
}
throw new Error('Tipo de dato no permitido en S.clone()');
};
S.Extend = function(){
var i=0, length=arguments.length, options, name;
for(; i<length; i++){
if( (options = arguments[i])!=null ){
for(name in options){
S[name] = options[name];
}
}
}
}
S.fnExtend = function(){
var i=0,length = arguments.length,options;
for(; i<length; i++){
if( (options = arguments[i])!=null ){
for(name in options){
S.fn[name] = options[name];
}
}
}
context = context || window;
return new Init(selector, context);
}
S.each = function(dim, callback, bak){
if( dim==null ) return null;
var len=dim.length, num=0, i=0, n;
if( len==0 ){
for(n in dim) i++;
if( i>0 ){
for(i in dim){
num = callback.call(dim[i], i, dim[i], num);
if( num===null ) break;
}
return dim;
}
}
if( bak ){
for(i=len-1; i>=0; i--){
num = callback.call(dim[i], i, dim[i], num);
if( num===null ) break;
else if( type(num)=="number" ) i = num;
}
}else{
for(i=0; i<len; i++){
num = callback.call(dim[i], i, dim[i], num);
if( num===null ) break;
else if( type(num)=="number" ) i = num;
}
}
return dim;
}
S.json = function(dim, txt){
if( txt==undefined ) txt = false;
if( S.type(dim)=="array" ){
var n, ret={};
if(txt){
for(n in dim) ret[n] = S.replace(dim[n]+"", "\n", "<br>", '"', "{#34#}", "&quot;", "{#34#}", '=', "{#61#}", "<", "{#60#}", ">", "{#62#}", "\\", "{#92#}", "+", "{#43#}");
return JSON.stringify(ret);
}else{
for(n in dim) ret[n] = dim[n];
}
return ret;
}else{
var js = JSON.parse(dim), n, ret=[];
for(n in js) ret[n] = S.replace(js[n]+"", "{#60#}", "<", "{#62#}", ">", "<br>", "\n", "{#34#}", '"', "{#34#}", "&quot;", "{#61#}", '=', "{#92#}", "\\", "{#43#}", "+");
if(txt) return ret;
for(n in js) js[n] = ret[n];
return js;
}
}
S.cssToJson = function(txt){
var n,pk,valor,ret=[],dim=txt.split(";");
for(n=0; n<dim.length; n++) if( S.trim(dim[n])!="" ){
[pk,valor] = dim[n].split(":");
ret[pk] = S.trim(S.replace(valor,"!important",""));
}
return ret;
}
S.scrollGet = function(obj){
if( S.type(obj)=="window" ) obj = obj.document.body;
if(obj.tagName=="BODY"){
var win = S.windowObject(obj),
x = (win.document.documentElement || win.document.body.parentNode || win.document.body).scrollLeft,
y = (win.document.documentElement || win.document.body.parentNode || win.document.body).scrollTop;
}else{
var x = obj.scrollLeft,
y = obj.scrollTop;
}
return {scrollLeft:x, scrollTop:y};
}
S.scrollSet = function(obj, c){
if( S.type(obj)=="window" ) obj = obj.document.body;
if(obj.tagName=="BODY"){
var win = S.windowObject(obj);
if( c.left!=undefined ) (win.document.documentElement || win.document.body.parentNode || win.document.body).scrollLeft = c.left;
if( c.top!=undefined ) (win.document.documentElement || win.document.body.parentNode || win.document.body).scrollTop = c.top;
}else{
if( c.left!=undefined ) obj.scrollLeft = c.left;
if( c.top!=undefined ) obj.scrollTop = c.top;
}
}
FuncionesParaEl_SELECTOR: {
S.fn = Init.prototype;
S.arrayObject = function(o, win){
var dim=[], tmp, tmp2, n,i;
if( S.type(o)=="string" ){
if( S.is(",", o) ){
tmp = o.split(",");
dim = S(S.trim(tmp[0]), win).dim;
for(n=1; n<tmp.length; n++){
tmp2 = S(S.trim(tmp[n]), win).dim;
for(i=0; i<tmp2.length; i++) dim.push(tmp2[i]);
}
}else{
dim = S(o, win).dim;
}
}else if( S.type(o)=="eDes" ){
dim = o.dim;
}else if( S.type(o)=="array" ){
dim = S.arrayObject(o[0], win);
for(n=1; n<o.length; n++){
tmp2 = S.arrayObject(o[n], win);
for(i=0; i<tmp2.length; i++) dim.push(tmp2[i]);
}
}else if( S.type(o)=="html" ){
dim.push(o);
}else if( S.type(o)=="object" ){
for(n in o){
dim.push(o[n]);
}
}else{
dim.push(o);
}
return dim;
}
S.toArray = function(txt){
var tipo = S.type(txt), dim;
if( tipo=="string" ){
if( txt.indexOf(",")>-1 ){
dim = txt.split(",");
}else if( txt.indexOf(" ")>-1 ){
dim = txt.split(" ");
}else{
dim = [txt];
}
}else{
dim = txt;
}
return dim;
}
S.toObject = function(obj, win){
switch(S.type(obj)){
case "string":
return S(obj, win||window).obj;
case "eDes":
return obj.obj;
default:
return obj;
}
}
S.fn.exists = function(){
return this.dim.length;
}
S.fn.find = function(selector, context){
var old = this.dim,
t = old.length, i, parcial, total=[], att;
for(i in old){
parcial = new Init(selector, old[i]);
for(att in parcial.dim){
total.push(parcial.dim[att]);
}
}
this.length = total.length;
this.dim = total;
this.obj = (this.length>0) ? total[0] : null;
return this;
}
S.fn.isParent = function(oHijo){
var oPadre = this.dim[0];
while( oHijo!=null ){
if( oHijo==oPadre ) return true;
oHijo = oHijo.parentNode;
}
return false;
}
S.dataFormat = function(val, tc, dir){
if( dir==undefined ) dir = "u";
val += "";
if( /^(\+|\+\,|\-|\-\,)$/.test(tc) ){
if( dir=="u" ){
var dcm = (val+".").split(".")[1].length;
return S.thousands(val, dcm);
}else{
return S.thousandsClear(val);
}
}else if( /^(P4|F4|CDI|T)$/.test(tc) ){
if( dir=="u" ){
return (val.replace(/[^0-9]/g,"")).replace(new RegExp(S.setup["format"+tc][2]), S.setup["format"+tc][3]);
}else{
return (val.replace(/[^0-9]/g,"")).replace(new RegExp(S.setup["format"+tc][0]), S.setup["format"+tc][1]);
}
}
}
S.fn.set = function(val){
var obj = this.obj,
change = obj.value!=val;
obj.value = val;
if( obj.onchange && change ){
S.eventFire(obj, "change");
}
}
S.valueQuestion = function(o){
var token = ["<>", "<=", ">=", "<", ">", "="],
tc = S(o).attr("tc");
if( /^(\<|\=|\>)$/.test(o.value[0]) && /^(P4|F4|CDI|T|\+,|\-,|\+|\-)$/i.test(tc) ){
var txt = o.value, n, tmp;
for(n=0; n<token.length; n++) txt = S.replace(txt, token[n], "|"+token[n]+"|");
tmp = txt.split("|");
for(n=0; n<tmp.length; n++){
if( tmp[n]!="" ){
if( token.indexOf(tmp[n])==-1 ){
if( /^(P4|F4|CDI|T)$/i.test(tc) ){
tmp[n] = (tmp[n].replace(/[^0-9]/g,"")).replace(new RegExp(S.setup["format"+tc][0]), S.setup["format"+tc][1]);
}else if( /^(\+|\-)/.test(tc) ){
tmp[n] = S.thousandsClear(tmp[n]);
}
}
}
}
return tmp.join("");
}else{
if( /^(P4|F4|CDI|T)$/i.test(tc) ){
return(o.value.replace(/[^0-9]/g,"")).replace(new RegExp(S.setup["format"+tc][0]), S.setup["format"+tc][1]);
}else if( S(o).attr("DCM") && S(o).attr("eSelMultiple")==null ){
tc = S.thousandsClear(o.value);
if( (tc+"").replace(/[0\.\-]/g, "")=="" ) tc = "";
return tc;
}else{
return o.value;
}
}
}
S.fn.value = function(val, change){
if( this.obj==null ){
S.error('Objeto "'+this.selector+'" no encontrado');
return null;
}
var n, i, cambio=true, cambLabel=false,
obj = this.obj,
win = this.win,
tc = obj.getAttribute("tc"),
mv = obj.getAttribute("MultipleValues"), oValue;
if( typeof val=="undefined" ){
if( /^(?:CHECKBOX|RADIO)$/i.test(obj.type) ){
if( obj.type=="checkbox" ){
return(obj.checked ? "S":"");
}else{
for(n=0; n<this.dim.length; n++){
if( this.dim[n].checked ){
if( this.dim[n].getAttribute("eValue")==null ) this.dim[n].setAttribute("eValue", this.dim[n].value);
this.dim[n].value = this.dim[n].getAttribute("eValue");
return this.dim[n].getAttribute("eValue");
}
}
return "";
}
}else if( /^(P4|F4|CDI|T)$/i.test(tc) ){
if( win._Question ){
return S.valueQuestion(obj);
}else{
return(obj.value.replace(/[^0-9]/g,"")).replace(new RegExp(S.setup["format"+tc][0]), S.setup["format"+tc][1]);
}
}
if( S(obj).attr("DCM") && S(obj).attr("eSelMultiple")==null ){
if( win._Question ){
return S.valueQuestion(obj);
}else{
return S.thousandsClear(obj.value);
}
}else{
return obj.value;
}
}else{
for(i=0; i<this.dim.length; i++){
obj = this.dim[i];
tc = obj.getAttribute("tc");
mv = obj.getAttribute("MultipleValues");
if( /^(?:CHECKBOX|RADIO)$/i.test(obj.type) ){
if( obj.type=="checkbox" ){
cambio = !obj.checked;
obj.checked = (val=="S" || val=="true");
}else{
if( obj.getAttribute("eValue")==val ){
cambio = !obj.checked;
obj.checked = true;
}else{
continue;
}
}
}else if( mv!=null ){
var txt="", dim;
if( /^(\-|\+)/.test(val) ){
var nVar = obj.value;
S.each(val.split(","), function(k,v){
if( v[0]=="-" ){
nVar = S.replace(nVar, ","+S.mid(v,1,0)+",", ",", ",,", ",");
if( nVar=="," ) nVar = "";
}else if( v[0]=="+" ){
nVar = S.replace(nVar+","+S.mid(v,1,0)+",", ",,", ",");
}
});
val = nVar;
}
if( val=="" ){
txt = mv==1 ? "" : "&nbsp;";
}else{
if( val[0]!="," ) val = ","+val+",";
dim = S.mid(val,1,-1).split(",");
S(S("#_"+obj.name+"_TABLE", win).col(0)).each(function(k,o){
if( dim.indexOf(o.textContent)>-1 ){
if( mv==1 ){
txt += '<tr><td>'+o.textContent+'</td><td><i class="ICONINPUT" oi="1" onclick="_SMDelOption(\''+obj.name+'\')" style="margin-right:2px" title="Borrar entrada">D</i></td><td>'+o.parentNode.cells[1].textContent+'</td></tr>';
}else if( mv==2 ){
txt += "<span eVal='"+o.textContent+"' class='ITEM'>"+o.parentNode.cells[1].textContent+" <i>&#196;</i></span>";
}
}
});
}
cambio = (obj.value!=val);
obj.value = val;
if( mv==1 ){
S("#LIST_"+obj.name, win).html(txt);
}else if( mv==2 ){
var hd,hc, ha=S("#_"+obj.name, win).css("height"), oCard,y;
S("span", "#_"+obj.name, win).html(txt);
hd = S("#_"+obj.name, win).css("height");
if( ha!=hd && win._CARD ){
oCard = S.toTag(obj, "div", "className=card");
y = S(oCard).xy().y;
hc = S(oCard).css("height")+(hd-ha);
S(".card", win).each(function(k,o){
if( S(o).xy().y==y ) S(o).css("height", hc);
});
}
}
}else{
var oLabel = S(":_INPUT_"+obj.name, win),
op = oLabel.exists() ? oLabel.attr("eSetParentValue") : null;
if( obj.type!="textarea" && typeof(val)=="string" ) val = trim(val);
cambio = (obj.value!=val);
if( /^(P4|F4|CDI|T)$/i.test(tc) ){
val = (val.replace(/[^0-9]/g,"")).replace(new RegExp(S.setup["format"+tc][2]), S.setup["format"+tc][3]);
}else if( S(obj).attr("DCM") && S(obj).attr("eSelMultiple")==null ){
var dec = S(obj).attr("DCM")*1,
showZero = win._ShowZero;
if( win._ShowZeroFields && win._ShowZeroFields[obj.name]!=undefined ) showZero = win._ShowZeroFields[obj.name];
if( isNaN(val) ){
val = S.thousandsClear(val);
}else{
val = S.round(val, dec)*1;
}
val = S.thousands(val, dec, showZero);
if( win.document.activeElement==obj ){
val = S.replace(val+"", S.setup.thousands, "");
}
}else if( obj.type=="range" ){
S(obj).range(val);
}else if( oLabel.exists() && cambio ){
oLabel.obj.value = "";
oLabel.class(">ERROR,EDITABLE");
cambLabel = true;
if( op!=null && oLabel.obj["eRowNumber"] ){
S(":"+op, win).val(oLabel.obj["eRowNumber"].cells[2].innerText, 0);
}
}
obj.value = val;
S(this).class(">ERROR,EDITABLE");
if( obj.type=="textarea" && S("#"+obj.name+"_", win).obj ){
S("#"+obj.name+"_", win).html(val);
}
if( obj.getAttribute("copyvalue")!=null && obj.getAttribute("dbrange")!=null ){
objWindow(obj).document.getElementsByName(obj.getAttribute("dbrange"))[0].value = val;
}
if( obj.type=="textarea" && obj.getAttribute("eFitHeight")!=null ){
setTimeout(function(){
S.fitHeight(win,obj.name);
},1);
}
}
change = (change || change==undefined);
if( (obj.onchange || cambLabel) && change && cambio ){
var exeChange = (cambLabel)? oLabel.obj:obj;
if( !(obj.name[0]=="_" && S(":_INPUT_"+obj.name, win).attr("SMultiple")==1) ){
if(S.session.logCallSrv)console.log("  <onchange>  "+exeChange.name);
S.eventFire(exeChange, "change");
}
}
selectLabel(obj, val, change);
}
}
return this;
}
S.fn.val = S.fn.value;
S.fn.label = function(){
var o = this.obj,
win = this.win, lab;
if( o==null ) return "";
lab = S("LABEL[for="+o.name+"]", win);
return (lab.length)? lab.text() : "";
}
S.fn.search = function(txt, sensible){
var t = this.length, n,
dim = this.dim;
sensible = sensible || false;
if( sensible ) txt = txt.toUpperCase();
for(n=0; n<t; n++){
if( sensible ){
if( dim[n].textContent.toUpperCase()==txt ) return dim[n];
}else{
if( dim[n].textContent==txt ) return dim[n];
}
}
return null;
}
S.fn.option = function(){
var o = this.obj,
win = this.win, obj="",n;
if( o==null ){
return "";
}else if( o.type=="radio" ){
for(n=0; n<this.dim.length; n++) if( this.dim[n].checked ){
obj = S("[e-label='"+o.name+"_"+this.dim[n].getAttribute("eValue")+"']", win);
break;
}
}else if( o.getAttribute("eRadioList")!=null ){
obj = S("[e-label='"+o.name+"_"+o.value+"']", win);
}else{
obj = S(":_INPUT_"+o.name, win);
}
return (obj.length)? obj.text()||obj.val() : "";
}
var valuesForm = function(frm, val, change){
var el = frm.elements, t=el.length, res=[], i,nom="";
if( val!=undefined ){
for(i in val){
el[i].value = val[i];
if(change || change==undefined) S.eventFire(el[i], "change");
}
}else{
for(i=0; i<t; i++){
if( /^(?:input|select|textarea)$/i.test(el[i].tagName) ){
if( !S.setup.systemFields.test(el[i].name) ){
if( el[i].type=="radio" ){
if( nom!=el[i].name ){
res[el[i].name] = "";
nom = el[i].name;
}
if( el[i].checked ) res[el[i].name] = el[i].getAttribute("eValue");
}else{
res[el[i].name] = S(el[i]).val();
}
}
}
}
return res;
}
}
S.fn.values = function(val, change){
return valuesForm(this.obj, val, change);
}
S.values = function(win, val, change){
var i,c,t,nom="";
if( val ){
if( S.type(val)=="object" ){
for(i in val){
return valuesForm(S(":"+i, win||window).obj.form, val, change);
}
}else if( S.type(val)=="array" ){
t = val.length;
for(c=0; c<t; c++){
if( S.type(val[c][0])=="html" ){
S(val[c][0]).val(val[c][1], change);
}else{
S(":"+val[c][0], win).val(val[c][1], change);
}
}
}
}else{
var frm = (win||window).document.forms, f, el, res=[];
for(f=0; f<frm.length; f++) if( frm[f].getAttribute("eType")=="Directo" ){
el = frm[f].elements;
t = el.length;
for(c=0; c<t; c++){
if( /^(?:input|select|textarea)$/i.test(el[c].tagName) ){
if( !S.setup.systemFields.test(el[c].name) ){
if( el[c].type=="radio" ){
if( nom!=el[c].name ){
res[el[c].name] = "";
nom = el[c].name;
}
if( el[c].checked ) res[el[c].name] = el[c].getAttribute("eValue");
}else{
res[el[c].name] = S(el[c]).val();
}
}
}
}
}
return res;
}
}
S.fn.fields = function(dim){
var el = this.obj.elements,
win = this.win,
t=el.length, res=[], i, e;
if( typeof dim=="string" ){
dim = S.nsp(dim).split(",");
for(i in dim){
e = S(":"+dim[i], win).obj;
if( !S.setup.systemFields.test(e.name) ){
if( e.type=="radio" ){
res[e.name] = S("INPUT[name='"+e.name+"']", e.form).dim;
}else{
res[e.name] = e;
}
}
}
}else{
for(i=0; i<t; i++){
if( /^(?:input|select|textarea)$/i.test(el[i].tagName) ){
if( !S.setup.systemFields.test(el[i].name) ){
if( el[i].type=="radio" ){
res[el[i].name] = S("INPUT[name='"+el[i].name+"']", el[i].form).dim;
}else{
res[el[i].name] = el[i];
}
}
}
}
}
return res;
}
S.fn.submitCheck = function(){
var el = this.obj.elements,
win = this.win,
t=el.length, res=[], ok=true, i,cnd,lbl;
for(i=0; i<t; i++){
if( /^(?:input|select|textarea)$/i.test(el[i].tagName) ){
cnd = el[i].getAttribute("eCND");
if( cnd!=null ){
lbl = S("LABEL[for="+el[i].name+"]", win).text();
switch(cnd){
case "#":
if( el[i].value=="" ){
ok = false;
el[i].className = "ERROR";
res.push('Falta rellenar el campo "<b>'+lbl+'</b>"');
}
break;
case "%":
if( el[i].value!="" && el[i].value.length!=el[i].maxlength ){
ok = false;
el[i].className = "ERROR";
res.push('Falta rellenar el campo "<b>'+lbl+'</b>"');
}
break;
default:
}
}
}
}
if( !ok ) S.error(res.join("<br>"));
return ok;
}
S.fn.nextValue = function(){
var o = this.obj,
win = this.win,
icon = S.event(win), incr, ev, os, ot;
if( icon.disabled ) return S.eventClear(win);
if( icon.tagName=="INPUT" ){
ev = win.event;
incr = ((ev.detail<0) ? 1 : (ev.wheelDelta>0) ? 1 : -1);
}else{
incr = ((icon.offsetHeight/2)>win.event.offsetY) ? 1:-1;
}
S.eventClear(win);
if( S(":_INPUT_"+o.name,win).length ){
os = S(":_INPUT_"+o.name,win).obj;
ot = S("#"+o.name+"_TABLE",win).obj;
S("TR",ot).each(function(k,otr){
if( o.value==otr.cells[0].innerText ){
if( incr<0 && ot.rows.length>otr.rowIndex+1 ){
k++;
}else if( incr>0 && otr.rowIndex>0 ){
k--;
}
S(o).val(ot.rows[k].cells[0].innerText);
return null;
}
});
return;
}
if(o.value=="" && S(o).attr("eFrom")!=null) o.value = S(o).attr("eFrom");
if( S(o).attr("tc")=="P4" ){
incr = S.month(o.value, incr);
}else{
incr = (o.value*1) + incr;
}
if( !o.readOnly ) o.focus();
if( (S(o).attr("eTo")!=null && incr>S(o).attr("eTo")*1) || (S(o).attr("eFrom")!=null && incr<S(o).attr("eFrom")*1) ) return;
if( S(o).attr("tc")=="P4" ){
S(o).val(incr);
return;
}
if( (incr+"").length<=S(o).attr("leng") ){
if( !(S(o).attr("tc")[0]=="+" && incr<0) ){
S(o).val(incr);
}
}
}
S.fn.css = function(dim, valor){
function cssAtt(obj, e, val){
a = trim(cssCapitalize(e));
if( dom[t].style[a]!=undefined ){
if( /^(?:left|right|top|width|height|fontSize|marginLeft|marginRight|marginTop|marginBottom|paddingLeft|paddingRight|paddingTop|paddingBottom)$/i.test(a) && val==val*1 ){
val = val+"px";
}
if( "width"==a && val=="=" ) val = dom[t].offsetWidth+"px";
dom[t].style[a] = val;
}else{
if( dom[t].setAttribute(trim(e),val)==undefined ){
dom[t][trim(e)] = val;
}
}
}
var dom=this.dim, t=dom.length, e, a, dim2;
if( typeof dim=="object" ){
while( t-- ){
for(e in dim){
cssAtt(dom[t], e, dim[e]);
}
}
}else{
if( valor!=undefined ){
while( t-- ){
cssAtt(dom[t], dim, valor);
}
}else{
if( dim.indexOf(":")>-1 ){
dim = dim.split(";");
while( t-- ){
for(e=0; e<dim.length; e++){
if( trim(dim[e])!="" ){
dim2 = dim[e].split(":");
cssAtt(dom[t], trim(dim2[0]), dim2[1]);
}
}
}
}else{
if( /\s/.test(dim) ) dim = dim.replace(/\s/g,",");
if( /\,/.test(dim) ){
var Res=[];
dim = dim.split(",");
for(e in dim){
dim[e] = trim(dim[e]);
Res[dim[e]] = getStyle(dom[0], cssCapitalize(dim[e]));
}
return Res;
}else{
if( /\:/.test(dim) ){
var prop = dim.split(";"),att;
while( t-- ){
for(e=0; e<prop.length; e++){
if( trim(prop[e])!="" ){
att = prop[e].split(":");
cssAtt(dom[t], att[0], att[1]);
}
}
}
}else{
return getStyle(dom[0], cssCapitalize(dim));
}
}
}
}
}
return this;
}
S.fn.cssBak = function(dim, valor){
var o = this;
if( dim==undefined ){
S(o).css(o.obj.getAttribute("bakCSS"));
}else{
var pdim = S(o).css(dim), p, txt="";
if( S.type(pdim)=="array" ){
for(p in pdim) txt += p+":"+pdim[p]+";";
}else{
txt += dim+":"+pdim+";";
}
o.obj.setAttribute("bakCSS", txt);
}
}
S.fn.widthText = function(txt){
var win = this.win,
td = this.obj,
css = S(td).css("fontFamily,fontSize"),
text = (txt)? txt : S(td).text(),
obj = S("<span style='fontFamily:"+css["fontFamily"]+";font-style:"+css["fontSize"]+";position:absolute;top:0px;left:0px'>"+text+"</span>", win).nodeEnd(),
a = obj.obj.offsetWidth;
S(obj).nodeRemove();
return a;
}
var showtoggle = function(op, set, attr){
var dim = this.dim, n,
t = this.length,
tipo = {
D:["none","block","display","table"],
V:["hidden","visible","visibility"]
};
op = upper(op);
for(n=0; n<t; n++){
if( attr ) dim[n].style[tipo[op][2]] = attr;
else if( op=="*" ){
if( getStyle( dim[n], tipo["D"][2] )!=tipo["D"][set] ) dim[n].style[tipo["D"][2]] = tipo["D"][set];
else if( getStyle( dim[n], tipo["V"][2] )!=tipo["V"][set] ) dim[n].style[tipo["V"][2]] = tipo["V"][set];
}else{
dim[n].style[tipo[op][2]] = tipo[op][set];
}
}
return this;
}
S.fn.block = function(tipo){
return showtoggle.call(this, "D", 1, tipo);
}
S.fn.table = function(tipo){
return showtoggle.call(this, "D", 3, tipo);
}
S.fn.none = function(tipo){
return showtoggle.call(this, "D", 0, tipo);
}
S.display = function(obj, on, ver){
if( on==undefined ){
S(obj)[obj.offsetWidth>0?"none":"block"]();
}else if( on && ver ){
S(obj).css({display:ver});
}else{
S(obj)[on?"block":"none"]();
}
}
S.fn.visible = function(tipo){
return showtoggle.call(this, "V", 1, tipo);
}
S.fn.hidden = function(tipo){
return showtoggle.call(this, "V", 0, tipo);
}
S.visibility = function(obj, on){
S(obj)[on?"visible":"hidden"]();
}
S.fn.width = function(){
return (getStyle(this.obj, "display")=="none") ? 0 : this.obj.offsetWidth;
}
S.fn.incr = function(prop){
var obj = this.obj,
val = S(obj).attr(prop)*1;
S(obj).attr(prop, val+1);
}
S.fn.attr = function(dim, valor, asign){
var dom = this.dim,
t = this.length,
i, e, x;
if( typeof dim=="object" ){
for(i=0; i<t; i++){
for(e in dim){
if( dim[e]==="" || dim[e]==null ){
dom[i][e] = null;
dom[i].removeAttribute(e);
}else{
dom[i][e] = dim[e];
dom[i].setAttribute(e,dim[e]);
}
}
}
}else{
if( arguments.length==2 ){
for(i=0; i<t; i++){
if( valor==="" || valor==null ){
dom[i][dim] = null;
dom[i].removeAttribute(dim);
}else{
dom[i][dim] = valor;
dom[i].setAttribute(dim,valor);
}
}
}else{
if( /\,/.test(dim) ){
dim = dim.split(",");
var DimRes=[];
for(e in dim){
x = dom[0].getAttribute(trim(dim[e]));
if(x==undefined) x = dom[0][trim(dim[e])];
DimRes[trim(dim[e])] = x;
if( asign && DimRes[trim(dim[e])]==undefined ) DimRes[trim(dim[e])] = asign[e];
}
return DimRes;
}else{
if( t>0 ){
e = dom[0][dim];
if(x==undefined) x = dom[0].getAttribute(dim);
return x;
}else{
return null;
}
}
}
}
return this;
}
S.fn.center = function(att, hv){
var obj = this.obj,
win = this.win,
cor = S.screen(win),
pst = S(obj).css("position"), x,y, dim=[];
pst = /^(absolute||fixed)$/.test(pst) ? pst:"absolute";
if( obj.offsetWidth==0 && att ) S(obj).css(att);
if( pst=="absolute" ){
x = cor.x+(cor.w-obj.offsetWidth)/2;
y = cor.y+(cor.h-obj.offsetHeight)/2;
}else{
x = (cor.w-obj.offsetWidth)/2;
y = (cor.h-obj.offsetHeight)/2;
}
if(x<0) x=0;
if(y<0) y=0;
dim["position"] = pst;
if( hv==undefined ){
dim["left"] = x;
dim["top"] = y;
}else{
if( hv=="h" ) dim["left"] = x;
if( hv=="v" ) dim["top"] = y;
}
S(obj).css(dim);
if(att) S(obj).css(att);
return this;
}
S.fn.scroll = function(tag){
var hijo = this.obj,
padre = hijo.parentNode,
th = hijo.getElementsByTagName(tag||"TH"),
col = padre.clientWidth<hijo.offsetWidth && th[0].offsetWidth>0 && hijo.tagName=="TABLE";
S(th).css("position:relative");
if( col ){
S(th[0]).css("z-index:1");
var co=[], n=-1,
rows = hijo.rows,
nRow = rows.length;
while(++n<nRow) co[n] = rows[n].cells[0];
var colorTH = S.ruleGet(window, ".SubLista TABLE TH", "backgroundColor"),
colorTD = S.ruleGet(window, ".SubLista TABLE TD", "backgroundColor"),
colorPie = S.ruleGet(window, ".SubLista #PieLista", "backgroundColor"),
colorBorder = S.ruleGet(window, ".SubLista TABLE", "backgroundColor")+" 1px solid";
S(co).each(function(pk, o){
S(o).css({
position:"relative",
display:"table-cell",
backgroundColor:(o.tagName=="TD" ? (o.id!="PieLista" ? colorTD : colorPie) : colorTH),
borderRight:colorBorder,
left: padre.scrollLeft - hijo.clientLeft
});
});
}
S(padre.tagName=="BODY" ? document : padre).on("scroll",function(){
S(th).css("top", padre.scrollTop - hijo.clientTop);
if( col ) S(co).css("left", padre.scrollLeft - hijo.clientLeft);
});
}
S.fn.toScroll = function(x, y){
var win = this.win,
obj = this.obj,
xy = S.xy(obj),
x = x || xy["x"]-Math.max(win.document.body.scrollLeft,win.document.documentElement.scrollLeft),
y = y || xy["y"]-Math.max(win.document.body.scrollTop,win.document.documentElement.scrollTop);
S(obj).css({left:x, top:y, position:"fixed"});
return this;
}
S.fn.scrollSet = function(hijo){
var ele = this;
if( hijo==undefined ) hijo = ele.win.document.body;
var xPadre = S.xy(ele.obj),
oHijo = (typeof hijo=="string") ? S(hijo, ele.win).obj : hijo;
xHijo = S.xy(oHijo);
xHijo["w"] = oHijo.scrollWidth;
xHijo["h"] = oHijo.scrollHeight;
if( ele.obj==ele.win || ele.obj.tagName=="BODY" ){
var b = S.screen(ele.win);
xPadre = {w:b.w, h:b.h};
}
ele.win.document.body.style.overflow = 'hidden';
ele.win.document.body.style.overflowX = (xHijo["w"]>xPadre["w"]) ? "auto" : "hidden";
ele.win.document.body.style.overflowY = (xHijo["h"]>xPadre["h"]) ? "auto" : "hidden";
return{sw:xHijo["w"]>xPadre["w"], sh:xHijo["h"]>xPadre["h"]};
}
S.fn.fixed = function(x,y){
S(this).css("position:fixed;"+(x>0?"left:"+x:"right:"+(x*-1))+"px;"+(y>0?"top:"+y:"bottom:"+(y*-1))+"px;");
return this;
}
var property = function(prop, val){
var dom = this.dim,
len = dom.length, i;
if( val==undefined ) return dom[0][prop];
for(i=0; i<len; i++) dom[i][prop] = val;
return this;
}
S.fn.text = function(x){
return property.call(this,"textContent",x);
}
S.fn.html = function(x){
return property.call(this,"innerHTML",x);
}
S.fn.TEXT = function(x){
return property.call(this,"outerText",x);
}
S.fn.HTML = function(x){
return property.call(this,"outerHTML",x);
}
S.fn.title = function(x){
var o = this;
if( type(x)[0]=="b" ){
if(x){
if( o.attr("eTitleOFF")==null ) o.attr("eTitleOFF", o.obj.title);
if( o.attr("eTitleON")!=null ) o.obj.title = o.attr("eTitleON");
}else{
if( o.attr("eTitleON")==null ) o.attr("eTitleON", o.obj.title);
if( o.attr("eTitleOFF")!=null ) o.obj.title = o.attr("eTitleOFF");
}
}else if( type(x)[0]=="u" ){
o.obj.title = (o.attr("eTitleON")==o.obj.title) ? o.attr("eTitleOFF") : o.attr("eTitleON");
}else o.obj.title = x;
return o;
}
var atributo = function(prop, val){
var dom=this.dim, t=dom.length;
while( t-- ){
dom[t].style[prop] = val;
}
return this;
}
S.fn.zIndex = function(valor){
return atributo.call(this,"zIndex",valor);
}
S.fn.background = function(valor){
return atributo.call(this,"backgroundColor",valor);
}
S.fn.display = function(x){
if( /^(number|boolean)$/i.test(S.type(x)) ){
x = x ? "block":"none";
}else{
x = (x!=undefined) ? x : getStyle(this.obj, "display")=="none" ? "block":"none";
}
return atributo.call(this, "display", x);
}
S.fn.visibility = function(x){
if( /^(number|boolean)$/i.test(S.type(x)) ){
x = x ? "visible":"hidden";
}else{
x = (x!=undefined) ? x : getStyle(this.obj,"visibility")=="visible" ? "hidden":"visible";
}
return atributo.call(this, "visibility", x);
}
S.fn.color = function(lapiz, papel){
var dom=this.dim, t=dom.length;
while( t-- ){
dom[t].style.color = lapiz;
if( papel!=undefined ) dom[t].style.backgroundColor = papel;
}
return this;
}
S.fn.class = function(txt){
var nt = this.length,
dim = this.dim,
ct,	clase, oClass, op, n, c, res;
if( txt==undefined ) return dim[0].className;
clase = txt.split(",");
ct = clase.length;
for(n=0; n<nt; n++){
for(c=0; c<ct; c++){
oClass = dim[n].className;
txt = clase[c];
op = split(1,txt);
if( op[0]=="+" ){
txt = txt.slice(1);
if( !(new RegExp(txt)).test(oClass) || oClass=="" ){
dim[n].className = trim(oClass+" "+txt);
}
}else if( op[0]=="-" ){
dim[n].className = trim(oClass.replace(txt.slice(1),""));
}else if( op[0]==">" ){
if( dim[n].className=="ERROR" ) dim[n].className = trim(clase[1+c++]);
else c++;
}else if( op[0]=="/" ){
txt = txt.slice(1);
if( (new RegExp(txt)).test(oClass) && oClass!="" ){
dim[n].className = trim(oClass.replace(txt,""));
}else{
dim[n].className = trim(oClass+" "+txt);
}
}else if( op[0]=="?" ){
op[1] = S.replace(op[1]," ","|");
res = oClass.match( new RegExp("\\b("+op[1]+")\\b", "g") );
return (res==null)? false : res.length==op[1].split("|").length;
}else{
dim[n].className = (op[0]!="=") ? txt : txt.slice(1);
}
}
}
return this;
}
S.fn.sum = function(grupo){
var attr = S.mid(this.selector, "[", "]"),
txt = S.replace(S.trim(grupo), "  ", " ", " ", "|"),
t = S.count("|", txt)+1,
exp = new RegExp("\\b("+txt+")\\b", "g"),
total=0, res;
this.each(function(k,o){
if( o.type=="text" ){
res = o.getAttribute(attr).match(exp);
if( res!=null && res.length==t ){
total += S(o).val();
}
}
});
return total;
}
S.fn.button = function(p){
var o = this.obj;
if( p["title"] ) o.title = p["title"];
if( p["icon"] ){
if( o.tagName=="SPAN" ){
if( p["icon"].indexOf(".")==-1 ){
o.children[0].innerText = p["icon"];
}else if( p["icon"][0]=="<" ){
o.children[0].outerHTML = p["icon"];
}else{
o.children[0].src = p["icon"];
}
}else if( o.tagName=="TABLE" ){
if( p["icon"].indexOf(".")==-1 ){
o.rows[0].cells[0].children[0].innerText = p["icon"];
}else if( p["icon"][0]=="<" ){
o.rows[0].cells[0].innerHTML = p["icon"];
}else{
o.rows[0].cells[0].children[0].src = p["icon"];
}
}
}
if( p["text"] ){
if( o.tagName=="SPAN" ){
S(o).html(S(o.children[0]).HTML()+p["text"]);
}else if( o.tagName=="TABLE" ){
o.rows[0].cells[1].innerHTML = p["text"];
}
}
if( S.type(p["onclick"])!="undefined" ){
if( S.type(p["onclick"])=="boolean" ){
obj.style.pointerEvents = p["onclick"]? "auto":"none";
}else{
o.onclick = p["onclick"];
}
}
if( p["display"] ) o.style.display = p["display"];
if( p["visibility"] ) o.style.visibility = p["visibility"];
return this;
}
}
Funciones_TABLAS: {
S.fn.col = function(n, ver){
if(!this.obj) return null;
if( type(n)=="string" ){
var o = S("TH[campo='"+n+"']", this.obj);
if( o.length ) n = o.attr("nc")*1;
}
if(ver!=undefined){
var tabla = this.obj,
vClass = S(tabla).class().split(" "),
TH, bak, dim=(type(n)=="array") ? n : [n];
for(i=0; i<dim.length; i++){
n = dim[i];
TH = S("TH[nc='"+n+"']",tabla)
if( ver ){
bak = S(TH).attr("eBakClass");
if(!bak) bak = "col_"+n+"l";
S(tabla).class("-col_"+n+"n,+"+bak);
S(TH).css("display:table-cell");
}else{
S.each(["l","c","r"], function(pk, o){
if( S.is("col_"+n+o, vClass) ){
S(TH).attr("eBakClass", "col_"+n+o);
S(tabla).class("-col_"+n+o);
return null;
}
});
S(tabla).class("+col_"+n+"n");
S(TH).none();
}
}
return this;
}else{
return S("TD:nth-child("+(n*1+1)+")",this).dim;
}
}
S.td = function(o, col){
return o.cells[col].innerText;
}
S.fn.td = function(col, txt){
if( txt==undefined ) return this.cells[col].innerText;
var res = null;
S("TR", this).each(function(k,o){
if( S.trim(o.cells[col].innerText)==txt ){
res = o.cells[col];
return null;
}
});
return res;
}
S.fn.tr = function(op, rec, dim, dimTr){
var obj = this.obj, tr, e,n;
if( rec==null ) rec = -1;
else if( rec<0 ) rec = obj.rows.length+rec;
switch(upper(op)){
case 'I':
tr = obj.insertRow(rec);
update(tr, dim);
break;
case 'U':
tr = obj.rows[rec];
update(tr, dim);
break;
case 'D':
if( type(rec)!="array" ) rec = [rec];
rec.sort();
for(n=rec.length-1; n>=0; n--) obj.deleteRow(rec[n]);
tr = null;
break;
case 'O':
tr = obj.insertRow(rec);
tr.outerHTML = dim;
break;
case 'R':
tr = obj.rows[rec];
break;
}
if( type(dimTr)=="object" ){
for(e in dimTr){
switch( lower(e) ){
case 'css':
S(tr).css(dimTr[e]);
break;
case 'class':
tr.className = dimTr[e];
break;
default:
tr.setAttribute(e, dimTr[e]);
}
}
}
return tr;
function update(tr, dim){
var n,e, td, t=dim.length, tc=tr.cells.length;
for(n=0; n<t; n++){
td = (n+1>tc) ? tr.insertCell() : td = tr.cells[n];
if( type(dim[n])=="object" ){
for(e in dim[n]){
switch( lower(e) ){
case 'inner':
case 'text':
td.innerHTML = dim[n][e];
break;
case 'css':
S(td).css(dim[n][e]);
break;
case 'class':
td.className = dim[n][e];
break;
default:
td.setAttribute(e, dim[n][e]);
}
}
}else{
td.innerHTML = dim[n];
}
}
}
}
S.fn.trFilter = function(filter, col){
var win = this.win,
o = this.obj, cnd;
if( win.event ){
S(".AddButton4", win).class("-Activated");
S(S.event(win)).class("+Activated");
}
if( filter==null ){
S("TR", o).block("table-row");
}else{
if( /\,/.test(filter) ) filter = "("+S.replace(filter,",","|")+")";
cnd = new RegExp(filter, 'i');
S("TR td:nth-child("+(col+1)+")", o).each(function(k,o){
if( !cnd.test(S(o).text()) ) S(o.parentNode).none();
else S(o.parentNode).block("table-row");
});
}
}
S.cellIndex = function(o){
var tr=o.parentNode, td=tr.cells, p=-1, n;
for(n=o.cellIndex; n>=0; n--){
p += td[n].colSpan;
}
return p;
}
S.tableFit = function(oTB){
S("TH", oTB).each(function(k,o){
if( o.colSpan==1 ) o.style.width = o.offsetWidth+"px";
});
oTB.style.width = oTB.offsetWidth+"px";
}
S.colNumber = function(win, cmp){
var o = S(".BROWSE TH[campo='"+cmp+"']", win);
if( o.length==0 ) return -1;
return o.attr("nc")*1;
}
}
Funciones_AYUDA: {
S.fn.tip = function(txt, sg, error, soloRecuadro){
var win = this.win,
obj = this.obj;
if( obj.tagName!=undefined && S(obj).attr("eOFF")==1 ) return;
if( /^[0-9]+$/.test(txt+"") ) txt = S.lng(txt);
if( top._M_!="" && win.event && win.event.ctrlKey ){
var iHelp = S(this.obj).attr("iHelp");
if( iHelp!=null ){
return _EditHelpIcon(win, this.obj, iHelp);
}
}
if( S.type(txt)=="window" ) txt = null;
if( !txt ){
if( win._TipLast!=null ) clearTimeout(win._TipLast);
S("SPAN[id='TIP']", win).nodeRemove();
return;
}
if( sg==-1 ) sg = S.setup.tipSeconds;
else if( sg==-2 ) sg = S.setup.tipSecondsTH;
if( win.event && win.event.type=="mouseenter" && !this.obj.mouseleave ){
S(this.obj).on("mouseleave", function(ev){
if( win._TipLast!=null ) clearTimeout(win._TipLast);
if( S("SPAN[id='TIP']",win).exists() ) S("SPAN[id='TIP']",win).nodeRemove();
});
}
if( S("#TIP",win).exists() ) S("#TIP",win).nodeRemove();
if( S.type(txt)=="number" ) txt = S.lng(txt);
if( S.mid(txt,3)==">>>" ){
txt = S.mid(txt,3,0);
}else{
if( S.mid(txt,2)=="$$" ) txt = S.TEXT[txt.slice(2)];
else if( txt[0]=="$" ) txt = win.TEXT[txt.slice(1)];
else if( txt[0]=="#" ) txt = S(txt, win).HTML();
}
if( !txt || txt=="" ) return;
txt = S.replace(txt,"&34;",'"',"&39;","'");
var obj=this.obj, tipoArrow, arrow, posFlecha="", oTip, n, clase;
S.session.zMessage -= 2;
oTip = S("<span id='TIP' style='display:inline-table; visibility:visible; max-width:90%; z-index:"+S.session.zMessage+"'>"+txt+"</span>", win).nodeEnd("body");
if( oTip.obj.children[0] && getStyle(oTip.obj.children[0], "display")=="none" ){
oTip.obj.children[0].style.display = "block";
}
if( error!=undefined && S.is(":",error) ){
oTip.css(error);
error = "";
}
for(n=0; n<2; n++){
tipoArrow = S(obj,win).around(oTip, {margin:(error!="ERROR")?S.setup.tipArrow:0, moveLeft:true});
if( tipoArrow["type"]=="notfit" ) tipoArrow["type"] = "C";
arrow = tipoArrow["type"].split("");
if( soloRecuadro ) arrow[0] = "C";
clase = "TIP TIP"+{R:"LEFT",L:"RIGHT",B:"UP",T:"DOWN",C:"CENTER"}[arrow[0]];
if(error) clase += " "+clase.replace(/TIP/g,"TIP"+error.toUpperCase());
if( arrow.length>1 ){
clase += " TIPARROW"+{L:"LEFT",R:"RIGHT",C:"CENTER",T:"TOP",M:"MIDDLE",B:"BOTTOM"}[arrow[1]];
}
S(oTip,win).class(clase);
oTip.css("left:0;top:0");
S(obj,win).around(oTip, {margin:(error!="ERROR")?S.setup.tipArrow:0, moveLeft:true});
if( n==0 && win.document.body.offsetHeight<oTip.obj.offsetHeight ){
S(oTip).css("height:"+(win.document.body.offsetHeight-25)+"px;overflow-y:scroll;");
}
}
oTip.css("z-index:"+S.session.zMessage);
if( !error ){
S(oTip).css("cursor:pointer").on("click",function(){
if( win._TipLast!=null ) clearTimeout(win._TipLast);
S("#TIP",win).nodeRemove();
removeEvent(oTip, "click");
removeEvent(win.document.body, "mouseup");
return S.eventClear(win);
});
}
if(sg && sg>0){
win._TipLast = setTimeout(function(){
S("#TIP",win).nodeRemove();
}, sg*1000 );
}else win._TipLast = null;
S.eventClear(win);
return oTip;
}
S.fn.tooltip = function(txt){
var win = this.win,
o = this.obj, obj;
S(o,win).over(function(){
obj = S(o,win).tip(txt);
if( o.tagName=="INPUT" ) S(o,win).class("+TIPFOCUS");
},function(){
S(obj,win).hidden();
if( o.tagName=="INPUT" ) S(o,win).class("-TIPFOCUS");
});
}
S.fn.info = function(txt, sg, error){
var win = this.win;
S(this.obj,win).tip(txt, sg, error).on("click",function(){
S("#TIP",win).hidden();
});
}
S.fn.infoRun = function(txt, sg, func){
var o = this.obj,
dim = [], n;
for(n=3; n<arguments.length; n++) dim.push(arguments[n]);
S(o).info(txt, sg);
setTimeout(function(){
func.apply(this, dim);
}, 1);
}
S.infoRun = function(txt, sg, func){
var dim = [], n;
for(n=3; n<arguments.length; n++) dim.push(arguments[n]);
S.info(txt, sg);
setTimeout(function(){
func.apply(this,dim);
}, 1);
}
S.fn.error = function(txt, uPosition){
var win = this.win,
bak = S.setup.positionPriority;
if( uPosition ) S.setup.positionPriority = uPosition;
var tip = S(this.obj,win).tip(txt,null,"ERROR")
.on("click",function(){
var o = this.eFocus;
S("#TIP",win).nodeRemove();
if( o ){
o["eBakCopy"] = 1;
o.focus();
}
}),
r = S(tip).modal().on("click",function(){
if( this.Parent ){
var o = this.Parent.dim[0]["eFocus"];
S(this.Parent).nodeRemove();
if( o ){
o.focus();
o["eBakCopy"] = 1;
}
}
});
r.dim[0]["Parent"] = tip;
if( uPosition ) S.setup.positionPriority = bak;
return tip;
}
var tipShow = function(obj, body, sg){
if( body && obj["eHelp"] ){
obj["eHelp"]();
return true;
}
var inf=S(obj).attr("eHelp"), o;
if( inf ){
}else if( is(nsp(obj.onmouseenter), "S(this).tip(") ){
inf = mid(mid(obj.onmouseenter, ".tip(", ")"),1,-1);
}else if( body ){
obj = S.toTag(obj, "BODY", "*");
inf = S(obj).attr("eHelp");
}
if(inf) S(obj).tip(inf, sg);
if(sg) S(obj).attr("eHelpNo=1");
return((inf)?true:false);
}
S.fn.sequence = function(evento){
var win = this.win,
o = this.obj, n;
S(o,win).attr({
eDesFT: arguments.length-1,
eDesFA: 1
});
for(n=1; n<arguments.length; n++){
o.setAttribute("eDesF"+n, arguments[n]);
}
S(o,win).on("click",function(){
var a = this.getAttribute("eDesFA"),
t = this.getAttribute("eDesFT"),
f = this.getAttribute("eDesF"+a);
if( ++a>t ) a=1;
this.setAttribute("eDesFA",a);
S.eventClear(win);
if( S.mid(f,-1)=="}" ){
win.eval(S.mid(f,"{","}"));
}else{
win[f]();
}
return false;
});
}
}
S.screenshot = function(nom){
S.session.screenshot = nom||top._User||"";
S.captureImage();
}
S.captureImage = function(op){
if( op!=undefined ){
borrar();
return;
}
S("<button id='eCapture' onclick='S.captureImage(1)' style='padding:10px'>Pulse:<br><br><b>Control + ImprPant</b><br>y<br><b>Control + V</b></button>").nodeEnd().center();
S("<a id='eCaptureIMG' href=''></a>").nodeEnd().center("z-index", S.session.zMessage+2);
top.document.body.focus();
S.session.capture = true;
S(window).on("paste", function(e){
borrar();
if( e && e.clipboardData && e.clipboardData.items ){
var clipboardItem = e.clipboardData.items[0];
if( clipboardItem && clipboardItem.type && clipboardItem.type.indexOf("image")>-1 ){
var blob = clipboardItem.getAsFile(),
blobUrl = URL.createObjectURL(blob);
S("#eCaptureIMG").attr("href", blobUrl);
var reader = new FileReader();
reader.readAsDataURL(clipboardItem.getAsFile());
reader.onload = function(r){
S.call("edes.php?E:$capturascr.php"+((S.session.screenshot=="")?"":"&name="+S.session.screenshot), {
scr: r.srcElement.result.toString()
});
S("body").tip("Pantalla capturada");
}
}
}
});
S("#eCaptureIMG").on("keydown",function(e){
var k = S.eventCode(e);
if( k==17 && S.session.capture ){
S("#eCapture").nodeRemove();
S("#eCaptureIMG").obj.focus();
}
if( k==17 || k==86 ) return;
borrar();
});
S("#eCaptureIMG").obj.focus();
function borrar(){
S.session.capture = false;
S(window).on("paste");
S("#eFONDO").on("click");
S(["#eFONDO","#eCapture","#eCaptureIMG"],null).each(function(i,obj){
if( S(obj).exists() ) S(obj).nodeRemove();
});
}
}
S.errorHidden = function(win, txt){
if(win.frameElement!=null && (win.frameElement.name=="TLF" || win.frameElement.id=="ICALL")){
setTimeout(function(){
S.error(txt);
win.location.href="about:blank";
win.document.write(txt);
},0);
}
}
Funciones_NODE: {
S.fn.nodeEnd = function(padre){
padre = S.toObject(padre, this.win);
var hijo = this.obj,
padre = selectElements((padre)?padre:"body", this.win)[0];
this.dim = [padre.appendChild(hijo)];
this.length = 1;
this.obj = (this.length>0) ? this.obj : null;
return this;
}
S.fn.nodeBegin = function(padre){
padre = S.toObject(padre);
var hijo = this.obj,
padre = selectElements((padre)?padre:"body", this.win)[0];
this.dim = [padre.appendChild(hijo)];
alPrincipio();
this.length = 1;
this.obj = (this.length>0) ? this.obj : null;
return this;
function alPrincipio(){
var dim = padre.children, n;
if( dim.length>1 ){
for(n=0; n<dim.length-1; n++){
padre.appendChild(dim[0]);
}
}
}
}
S.fn.nodeRemove = function(){
var node = this.dim,
t = node.length, n;
for(n=0; n<t; n++){
if( node[n].Parent && node[n].Parent.obj && node[n].Parent.obj.parentNode ){
if( node[n].Parent.obj.Tapa ) S(node[n].Parent.obj.Tapa).nodeRemove();
node[n].Parent.obj.parentNode.removeChild(node[n].Parent.obj);
}else if( node[n].Parent && node[n].Parent.parentNode ){
if( node[n].Parent.Tapa ) S(node[n].Parent.Tapa).nodeRemove();
node[n].Parent.parentNode.removeChild(node[n].Parent);
}
if( node[n].parentNode ){
if( node[n].Tapa ) S(node[n].Tapa).nodeRemove();
node[n].parentNode.removeChild(node[n]);
}
}
}
S.fn.nodeEmpty = function(){
var node = this.dim,
t = node.length, n;
for( n=0; n<t; n++ ){
node[n].innerHTML = "";
}
return this;
}
S.fn.nodeSwap = function(item3){
var item1 = this.obj,
item2 = S(item3,this.win).obj;
tmp = item1.cloneNode(1),
parent = item1.parentNode;
item2 = parent.replaceChild(tmp,item2);
parent.replaceChild(item2,item1);
parent.replaceChild(item1,tmp);
tmp = null;
}
S.fn.nodeMove = function(item3){
var item1 = this.obj,
item2 = S(item3, objWindow(item1)).obj;
item2.appendChild(item1);
}
S.fn.nodeMoveFirst = function(item3){
var item1 = this.obj,
item2 = S(item3, objWindow(item1)).obj;
item2.insertBefore(item1, item2.childNodes[0]);
}
S.fn.nodeCopy = function(){
var o = this.obj;
this.obj = o.cloneNode(true);
this.dim = [this.obj];
this.length = 1;
return this;
}
S.fn.nodeReplace = function(oNew){
var oOld = this.obj,
oNew = S(oNew,this.win).obj;
oNew.parentNode.replaceChild(oOld, oNew);
this.dim = [oNew];
this.length = 1;
this.obj = oNew;
return this;
}
var insert = function(oThis,oAqui,op){
var oEste = oThis.obj,
oAqui = S(oAqui,oThis.win).obj;
if( op=="F" && oAqui.children[0] ) oAqui = oAqui.children[0];
oAqui.parentNode.insertBefore(oEste, oAqui);
if( op=="A" ) S(oAqui, oThis.win).nodeSwap(oEste);
oThis.dim = [oEste];
oThis.length = 1;
oThis.obj = oThis.dim[0];
return oThis;
}
S.fn.nodeBefore = function(oAqui){
return insert(this,oAqui,"B");
}
S.fn.nodeAfter = function(oAqui){
return insert(this,oAqui,"A");
}
S.fn.nodeStart = function(oAqui){
return insert(this,oAqui,"F");
}
}
FuncionesDe_EVENTOS: {
var addEvent, removeEvent;
if( window.addEventListener ){
addEvent = function(obj, type, fn, win){
obj.addEventListener(type, fn, false);
if( obj.tagName ){
obj["eDes"+type] = fn;
}else if( S.type(obj)=="window" ){
obj.document["eDes"+type] = fn;
}
}
removeEvent = function(obj, type, fn){
if( obj.tagName ){
obj.removeEventListener(type, obj["eDes"+type], false);
}else if( S.type(obj)=="window" ){
obj.removeEventListener(type, obj.document["eDes"+type], false);
}
}
}else if( document.attachEvent ){
addEvent = function(obj, type, fn, win){
var eProp = type+fn;
obj["e"+eProp] = fn;
obj[eProp] = function(){obj["e"+eProp](win.event);}
obj.attachEvent("on"+type, obj[eProp]);
}
removeEvent = function(obj, type, fn){
var eProp = type + fn;
obj.detachEvent("on"+type, obj[eProp]);
obj[eProp] = null;
obj["e"+eProp] = null;
}
}
S.toTag = function(o, tag, saltar, os){
var res = "o";
if( tag ){
if( os=="eDes"){
res = "e";
}else if( saltar=="eDes"){
saltar = 1;
res = "e";
}
if( S.type(o)=="eDes" ) o = o.obj;
tag = upper(S.nsp(tag));
var dim = tag.split(","),n,xTag;
saltar = saltar || "*";
if( type(saltar)=="number" ){
if( saltar>0 ) {
while(o!=null && o.tagName!="BODY" && saltar>0){
o = o.parentNode;
if( o && o.tagName==tag ) saltar--;
}
}else if( saltar==0 ) {
while(o!=null && o.tagName!="BODY" && o.tagName!=tag ){
o = o.parentNode;
}
}else{
for(n=0; n<saltar*-1; n++) o = o.parentNode;
}
}else{
xTag = (tag) ? new RegExp("^("+nsp(tag).replace(/,/g,"|")+")$", "i") : "";
if( saltar[0]=="<" ){
var attr = S.mid(nsp(saltar),1,0).split("="), hijo=null, a;
if( upper(attr[0])=="CLASSNAME" ) attr[0] = "class";
while( o!=null && o.tagName!="BODY" ){
a = o.getAttribute(attr[0]);
if( xTag.test(o.tagName) ) hijo = o;
if( a!=null && (a==attr[1] || (attr[0]=="class" && S.is(attr[1], a.split(" ")))) ) break;
o = o.parentNode;
}
if(hijo) o = hijo;
}else if( saltar[0]=="=" ){
var attr = S.mid(nsp(saltar),1,0).split("="), hijo=null, a;
if( upper(attr[0])=="CLASSNAME" ) attr[0] = "class";
while( o!=null && o.tagName!="BODY" ){
a = o.getAttribute(attr[0]);
if( a!=null && S.is(attr[1], a.split(" ")) ) return o;
o = o.parentNode;
}
return null;
}else if( saltar.indexOf("=")>-1 ){
var attr = saltar.split("="), a;
if( upper(attr[0])=="CLASSNAME" ) attr[0] = "class";
if( upper(attr[0])=="ID" ) attr[0] = "id";
while( o!=null && o.tagName!="BODY" ){
a = o.getAttribute(attr[0]);
if( a!=null && (xTag.test(o.tagName) && (a==attr[1] || (attr[0]=="class" && S.is(attr[1], a.split(" "))))) ) break;
o = o.parentNode;
}
}else if( saltar!="*" ){
dim = nsp(upper(saltar)).split(",");
for(n=0; n<dim.length; n++){
while(o!=null && o.tagName!="BODY" && o.tagName!=dim[n]) o = o.parentNode;
}
if( xTag.test(o.tagName) ) o = o.parentNode;
while(o!=null && o.tagName!="BODY" && !xTag.test(o.tagName)){
o = o.parentNode;
}
}else{
while(o!=null && o.tagName!="BODY" && !xTag.test(o.tagName)){
o = o.parentNode;
}
}
if( !o || !xTag.test(o.tagName) ) o = null;
}
}
if( o!=null && o.tagName=="BODY" ) o = null;
return (res=="o" || o==null)? o :S(o);
}
var toTag = S.toTag;
S.fn.toTag = function(tag, saltar, os){
return S.toTag(this.obj, tag, saltar, os);
}
S.toClass = function(o, clas){
var patron = new RegExp(upper(clas),"i");
while( o!=null && !patron.test(o.className) ) o = o.parentNode;
if( !patron.test(o.className) ) o = null;
return o;
}
S.event = function(win, tag, saltar){
var ev = (S.type(win)=="window") ? win.event:win;
if(!ev) return null;
var o = S.eventObj(ev);
return !tag ? o : toTag(o, tag, saltar);
}
var event = S.event;
S.offset = function(win){
var e = win.event,
rect = S.eventObj(e).getBoundingClientRect();
return[e.clientX-rect.left, e.clientY-rect.top];
}
S.eventObj = function(evt){
if(!evt) return null;
return evt.target || evt.srcElement;
}
S.click = function(func, tag, saltar){
var win = window;
if( S.type(func)=="window" ){
win = arguments[0];
func = arguments[1];
tag = arguments[2];
saltar = arguments[3];
}
obj = toTag(S.eventObj(win.event), tag, saltar);
if( obj ){
func( obj );
return true;
}
return S.eventClear(win);
}
S.fn.over = function(over, out){
if( over!=undefined ) S(this.obj, this.win).on("mouseover", over);
if( out!=undefined ) S(this.obj, this.win).on("mouseout", out);
}
S.fn.ready = function(func){
S(this.obj, this.win).on("load",func);
}
S.isReady = function(win){
var error=0, ok=false;
if(S.session.logCallSrv || S.session.logCallAnswer) _viewLog();
if( win!=undefined ){
try{
ok = (win.document.readyState=="complete");
}catch(e){}
if( !ok ){
return false;
}
}
function verIFrame(win){
var f=win.frames, t=f.length, n, url="";
for(n=0; n<t; n++){
try{
f[n].location.href
url = f[n].location.href+"";
if( url=="about:blank" ) continue;
if( f[n].eStatus>0 ) error++;
}catch(e){
if( e.name!="SecurityError" ) error++;
}
try{
if( f[n].document.readyState!="complete" ){
if( f[n].document.body==null && f[n].document.head==null ){
error++;
}
}
}catch(e){
if( e.name!="SecurityError" ) error++;
}
if( error==0 ) verIFrame(f[n]);
}
}
if( ok ){
verIFrame(top);
}
if(S.session.logCallSrv || S.session.logCallAnswer) _viewLog(", "+error);
return(error==0);
}
S.isNotOnLoad = function(win){
return !(win.event && win.event.type=="load");
}
S.eventClear = function(win, ev){
if( win!=undefined ){
var evt = win.event || ev;
if( evt!=undefined && evt.type!="mousewheel" ){
try{
evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
}catch(e){}
try{
evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble = true);
}catch(e){}
}
}
return false;
}
S.fn.on = function(eventos, func){
var win = this.win,
oDim = this.dim,
ot = this.length,
eDim = splitArg(eventos),
et = eDim.length,
n, i;
for(i=0; i<et; i++){
for(n=0; n<ot; n++){
if( func ){
addEvent(oDim[n], eDim[i], func, win);
}else{
removeEvent(oDim[n], eDim[i], func, win);
}
}
}
return this;
}
S.eventCode = function(ev){
return typeof ev.which=="number" ? ev.which : ev.keyCode;
}
S.eventFire = function(obj, eventName){
var w = objWindow(obj);
if( w.document.createEvent ){
if( S.left(eventName,2)=="on" ) eventName = S.mid(eventName,2,0);
var evt = w.document.createEvent("MouseEvents");
evt.initEvent(eventName, true, true);
if( eventName=="change" ){
var oD = obj.disabled,
oR = obj.readOnly, r;
obj.disabled = false;
obj.readOnly = false;
r = obj.dispatchEvent(evt);
obj.disabled = oD;
obj.readOnly = oR;
return r;
}else{
return obj.dispatchEvent(evt);
}
}else{
if( S.left(eventName,2)!="on" ) eventName = "on"+eventName;
obj.fireEvent(eventName);
}
}
S.fn.eventFire = function(eventName){
S.eventFire(this.obj, eventName);
}
S.fn.eventClick = function(){
S.eventFire(this.obj, "click");
}
S.fn.eventChange = function(){
S.eventFire(this.obj, "change");
}
S.focusOff = function(win){
setTimeout(function(){
var o = S("<input style='position:absolute;top:0px;left:0px'>", win).nodeEnd("BODY");
o.obj.focus();
S(o).nodeRemove();
}, 200);
}
S.focus = function(o){
setTimeout(function(){
if( o.name.indexOf("_INPUT_")==-1 ){
var s = S(":_INPUT_"+o.name, objWindow(o));
if( s.length ) o = s.obj;
}
o.focus();
}, 100);
}
S.fn.drag = function(aqui, max, func){
var dim = this.dim,
win = this.win, n;
dim[0].parentNode.ondragover = function(ev){S.dragMove(ev)};
dim[0].parentNode.ondrop = function(ev){S.dragUp(ev)};
dim[0].parentNode.setAttribute("eCapacity", -1);
for(n=0; n<dim.length; n++){
dim[n].eDrag = '1';
dim[n].draggable = 'true';
dim[n].ondragstart = function(ev){S.dragDown(ev)};
}
if( max==undefined ) max = -1;
aqui = S.arrayObject(aqui, win);
for(n=0; n<aqui.length; n++){
aqui[n].setAttribute("eCapacity", (arguments[n+1]==undefined)? max:arguments[n+1]);
aqui[n].ondragover = function(ev){S.dragMove(ev)};
aqui[n].ondrop = function(ev){S.dragUp(ev)};
if( func!=undefined ){
aqui[n]["eFunction"] = func;
}
}
}
S.dragDown = function(ev) {
var o = S.event(ev), u = S.date("u");
if( o.eDrag!='1' ) o = o.parentNode;
S(o).attr("eMover", u);
ev.dataTransfer.setData("text", u+"");
}
S.dragMove = function(ev) {
ev.preventDefault();
return false;
}
S.dragUp = function(ev) {
var oDestino = ev.target, ok,
oContenedor = oDestino,
win = S.windowObject(oDestino),
oMover = S("*[eMover='"+ev.dataTransfer.getData("text")+"']", win).obj;
ev.preventDefault();
if( oDestino.draggable ){
oContenedor = oDestino.parentNode;
if( estaCompleto(oContenedor, oMover) ) return;
var oHijo = oContenedor.children,
t = oHijo.length, n,i,
oTMP = S("<span></span>", win).obj,
dim=[], pAqui, pDesde, tDim;
for(i=0; i<t; i++){
if( oDestino==oHijo[i] ){
dim[i] = oMover;
pAqui = i;
break;
}
}
if( oMover.parentNode==oContenedor ){
for(i=0; i<t; i++){
if( oMover==oHijo[i] ){
pDesde = i;
break;
}
}
if( pDesde==pAqui ) return;
for(i=0; i<t; i++){
if( pDesde==i ) continue;
if( pDesde<pAqui ){
dim[(i<=pAqui && i>=pDesde)? i-1:i] = oHijo[i];
}else{
dim[(i>=pAqui && i<pDesde)? i+1:i] = oHijo[i];
}
}
}else{
for(i=0; i<t; i++){
dim[(i>=pAqui)? i+1: i] = oHijo[i];
}
}
tDim = dim.length;
for(i=0; i<tDim; i++){
oTMP.appendChild(dim[i]);
oContenedor.appendChild(dim[i]);
}
}else{
if( !estaCompleto(oContenedor, oMover) ){
ok = true;
if( oContenedor["eFunction"]!=undefined ){
ok = oContenedor["eFunction"](oContenedor, oMover);
}
if( ok ) oContenedor.appendChild(oMover);
}
}
return false;
function estaCompleto(o, oMover){
var max = o.getAttribute("eCapacity")*1;
if( max>-1 && o!=oMover.parentNode ){
if( o.children.length>=max ){
S.info(246, 1);
return true;
}
}
return false;
}
}
}
Funciones_LOGICAS: {
S.is = function(c, txt, pos){
if( type(pos)=="string" ){
if( S.type(txt)=="string" ) txt = [txt];
var t=txt.length, n, exp;
pos = S.upper(pos);
if(pos=="L" ) c = "^"+c;
if(pos=="R" ) c += "$";
exp = new RegExp(S.regExp(c), "i");
for(n=0; n<t; n++){
if( exp.test(txt[n]) ) return true;
}
return false;
}
if( pos==undefined ) pos = false;
if( type(txt)=="string" ){
return(pos ? txt.indexOf(c) : txt.indexOf(c)>-1);
}else{
var n, t=txt.length;
for(n=0; n<t; n++){
if( txt[n]==c ) return pos ? n : true;
}
}
return pos ? -1 : false;
}
var is = S.is;
}
FuncionesDe_FECHA: {
S.date = function(Formato, Fecha, mes, ano){
if( Formato==undefined ) Formato = "Ymd".split("").join(S.setup.delimiter[0]);
if( Fecha==undefined ) Fecha = new Date();
else if( ano!=undefined )
Fecha = new Date(ano, (mes*1)-1, Fecha);
else if( typeof(Fecha)=="string" ){
Fecha = new Date(getDate("dy", Fecha), (getDate("dm", Fecha)*1)-1, getDate("dd", Fecha));
}
var F = Fecha,
Y = F.getFullYear(),
y = (Y+"").substr(2),
C = (Y+"").substr(0,2),
j = F.getDate(),
m = S.padL(F.getMonth()+1,2),
H = S.padL(F.getHours(),2),
i = S.padL(F.getMinutes(),2),
s = S.padL(F.getSeconds(),2),
u = parseInt(F.getTime(),10),
w = F.getUTCDay()*1,
l = S.lng(w+184),
D = ((new Date(Y,m,0)).getDate());
return S.replace(Formato, [["Y",Y],["C",C],["m",m],["d",S.padL(j,2)],["D",D],["H",H],["i",i],["s",s],["j",j],["y",y],["u",u],["l",l],["w",w]]);
}
S.d2s = function(fecha){
if(fecha=="") return "";
return S.padL(getDate("dy", fecha),4)+_Delimiter[0]+S.padL(getDate("dm", fecha),2)+_Delimiter[0]+S.padL(getDate("dd", fecha),2);
}
S.s2d = function(fecha){
if(fecha=="") return "";
var d = fecha.split(new RegExp("-|/|"+_Delimiter[0]));
return putDate("d", d[2], d[1], d[0]);
}
S.dateType = function(s){
s = s.split(new RegExp("-|/|"+_Delimiter[0]));
return new Date(s[0],(s[1]*1)-1,s[2]);
}
S.dateAddDays = function(fecha, dias){
if( typeof(fecha)!='object' ) fecha = S.dateType(fecha);
fecha.setDate(fecha.getDate()+parseInt(dias));
var d = fecha.getDate(),
m = (fecha.getMonth()+1);
if(d<10) d = '0'+d;
if(m<10) m = '0'+m;
return S.date("Y-m-d", fecha);
}
S.dateAddMonth = function(s, m){
s = s.split(new RegExp("-|/|"+_Delimiter[0]));
var n = S.monthAdd(s[0]+"-"+s[1], m).split("-"),
fecha = n[0]+"-"+n[1]+"-"+s[2],
error = 0;
while( !S.check("D", S.dataFormat(fecha, "F4")) ){
fecha = S.dateAddDays(fecha, -1);
error++;
if( error>33 ) return "";
}
return fecha;
}
S.dateAddYear = function(Fecha, Ayos){
var a = S.midn(Fecha,0,4)+Ayos;
return a+S.mid(Fecha,4,0);
}
S.dateDiff = function(fechaEnd, fechaIni){
fechaIni = S.dateType(fechaIni);
fechaEnd = S.dateType(fechaEnd);
var nDias = (fechaEnd.getTime()-fechaIni.getTime())/86400000;
if( nDias!=parseInt(nDias) ){
var resto = (fechaEnd.getTime()-fechaIni.getTime())%86400000;
if( resto>60000000 ) nDias++;
}
return parseInt(nDias);
}
S.monthDays = function(ayo, mes){
if( mes==undefined ){
mes = S.mid(ayo,5,2);
ayo = S.mid(ayo,0,4);
}
return S.date("D", 1, mes, ayo);
}
S.monthAdd = function(txt, n){
if( typeof(txt)!='string' ){
var Obj = txt;
txt = Obj.value;
}
if( txt=='' ){
txt = S.date("Y-m");
n = 0;
}
if( n==0 ) return txt;
var ano = txt.substring(0,4)*1,
mes = txt.substring(5,7)*1;
if( n>0 ){
mes += n;
if( mes>12 ){
ano += Math.floor(mes/12);
mes = mes - (Math.floor(mes/12)*12);
if( mes==0 ){
mes = 12;
ano--;
}
}
}else if( n<0 ){
ano += Math.ceil(n/12);
n = n-(Math.ceil(n/12)*12);
mes += n;
if( mes<=0 ){
ano--;
mes += 12;
}
}
txt = ano+'-'+((mes<10)? '0':'')+mes;
if( Obj!=undefined ) Obj.value = txt;
return txt;
}
S.monthDiff = function(pi, pf){
var sig = '-';
if( pf>pi ){
sig = '';
var c=pf; pf=pi; pi=c;
}
var pf = pf.split("-"), pi = pi.split("-");
if( pf[1]>pi[1] ){
pi[1] = parseInt(pi[1])+12;
pi[0] = parseInt(pi[0])-1;
}
return sig+((parseInt(pi[0])-parseInt(pf[0]))*12+parseInt(pi[1])-parseInt(pf[1]));
}
S.month = function(txt, n){
if( typeof(txt)!="string" ){
var Obj = txt;
txt = txt.value;
}
if( txt=="" ) return S.date(_FormatMonth);
var meses = getDate("my", txt)*12 + getDate("mm", txt)*1 + n,
ano = Math.floor(meses/12);
mes = meses-12*ano;
if( mes==0 ){
mes = 12;
ano--;
}
txt = putDate("m", null, mes, ano);
if( Obj!=undefined ) Obj.value = txt;
return txt;
}
S.fn.calendar = function(o){
var win = this.win;
if( this.obj.tagName=="I" ){
this.obj = this.obj.previousSibling;
}
if( o!==undefined ){
var oDiv = S("#DivCALEN",this.win);
}else{
if( win.event && win.event.ctrlKey ){
S(this.obj).calendarMonth("R");
return;
}
}
if( o=="s" ){
var ev = objWindow(oDiv.obj).event;
if( S.event(ev).tagName!="INPUT" || ev.offsetX>=(S("INPUT",oDiv.obj).obj.offsetWidth/7)*4.5 ){
o = -1;
}else{
o = (ev.ctrlKey)? -120:-12;
}
o *= ((ev.detail<0)? 1 : (ev.wheelDelta>0)? 1 : -1);
}
if( o===null ){
S.eventClear(objWindow(oDiv.obj));
S(oDiv).nodeRemove();
return;
}else if( o=="t" ){
if( this.obj.readOnly ) return S.eventClear(this.win);
if( !S.check("F4", this.obj, S.date(_FormatDate)) ){
return S.eventClear(objWindow(this.obj));
}
S(this.obj).val(S.date("Y-m-d"));
S.eventClear( objWindow(this.obj) );
this.obj.focus();
return;
}else if( o=="d" ){
var obj = S("INPUT",oDiv.obj).obj;
d = S.event(objWindow(obj));
S.eventClear(objWindow(obj));
if( d.tagName!="TD" || isNaN(d.textContent) || trim(d.textContent)=="" || /OFF/.test(d.className) ) return;
S(S(oDiv).obj["eInput"]).val(S.dataFormat(putDate("d", d.textContent, getDate("mm", obj.value), getDate("my", obj.value)), "F4", "d"));
return S(oDiv).nodeRemove();
}else if( o!=undefined ){
var obj = S("INPUT",oDiv.obj).obj, per, ayo,mes;
if( o=="p" ){
ayo = getDate("my", obj.value);
mes = getDate("mm", obj.value);
if( ayo<1900 || ayo>2050 || mes>12 || mes<1 ){
return S.eventClear(objWindow(obj));
}
}else{
per = (o!=0 ? S.month(obj, o) : S.date(_FormatMonth));
ayo = getDate("my", per);
mes = getDate("mm", per);
}
obj.value = putDate("m", null, mes, ayo);
rellena(oDiv.obj, ayo, mes);
return S.eventClear(objWindow(obj));
}
var l,c,padre=this.obj, per=[],
win = this.win,
icon = S.event(win),
zIndex = getStyle(padre, "zIndex")*1+3,
txt = "<DIV class='CALENDAR' id='DivCALEN' style='z-index:"+(zIndex-1)+"'>"+
"<TABLE onclick=S(this).calendar('d') width='100%' onmousewheel=S(this).calendar('s') class='col_0ff col_1ff col_2ff col_3ff col_4ff col_5ff col_6ff'>"+
"<TR>";
if( icon.disabled ) return S.eventClear(win);
var ayo,mes;
if( padre.value!="" ){
per = S(padre).val();
ayo = S.mid(per,0,4);
mes = S.mid(per,5,2);
}else{
if( padre.getAttribute("DBRange")!=null && S(":"+padre.getAttribute("DBRange"), win).val()!="" ){
per = S(":"+padre.getAttribute("DBRange"), win).val();
ayo = S.mid(per,0,4);
mes = S.mid(per,5,2);
}else{
ayo = S.date("Y");
mes = S.date("m");
}
}
if( S.setup.weekday==0 ){
for(l=1; l<8; l++) txt += "<TH title='"+lng(l==7 ? 184:184+l)+"'>"+lng(200+l)+"</TH>";
}else{
txt += "<TH title='"+lng(184)+"'>"+lng(200+7)+"</TH>";
for(l=1; l<7; l++) txt += "<TH title='"+lng(l==7 ? 184:184+l)+"'>"+lng(200+l)+"</TH>";
}
txt += "</TR>";
for(l=1; l<7; l++){
txt += "<tr>";
for(c=1; c<8; c++) txt += "<td>&nbsp;</td>";
txt += "</tr>";
}
txt += '<tfoot><tr><td colspan=7 align=center style="padding:0px">'+
'<table cellspacing=0px cellpadding=0px border=0px style="border-spacing:0px;"><tr>'+
'<td onclick="S(this).calendar(0)" title="'+lng(123)+'"><i class="ICONINPUT">,</i></td>'+
'<td onclick="S(this).calendarMonth()" title="'+lng(236)+'"><i class="ICONINPUT">&#174;</i></td>'+
'<td onclick="S(this).calendar(-12)" title="'+lng(124)+'"><i class="ICONINPUT">#</i></td>'+
'<td onclick="S(this).calendar(-1)" title="'+lng(125)+'"><i class="ICONINPUT"><</i></td>'+
'<td><INPUT TYPE="text" size=7 value="'+putDate("m", null, mes, ayo)+'" onfocus=S.key("P4") onchange=S(this).calendar("p") eOnChangeAlways=1 style="width:45px;'+_FontNumber+'"></td>'+
'<td onclick="S(this).calendar(1)" title="'+lng(126)+'"><i class="ICONINPUT">></i></td>'+
'<td onclick="S(this).calendar(12)" title="'+lng(127)+'"><i class="ICONINPUT">$</i></td>'+
'<td onclick="S(this).calendar(null)" title="'+lng(128)+'"><i class="ICONINPUT">.</i></td>'+
'</tfoot></table></td></tr>';
txt += "</TABLE></DIV>";
var o = S(txt,win).nodeEnd(), tapa;
S(win).windowInside(o);
tapa = S(o).modal();
S(tapa).on("click",function(){
S(o).calendar(null);
});
S(icon||padre).around(o.obj, {hide:1});
S(o.obj).attr("eInput",padre);
o.obj.focus();
rellena(o.obj, ayo, mes);
S.fitWidth(S("INPUT",o.obj).obj);
per = S("#DivCALEN TH", win);
l = 0;
per.each(function(k,o){ l = Math.max(l, S(o).css("width")); });
l -= per.css("paddingLeft")*2;
per.each(function(k,o){ o.style.width = l+"px"});
function rellena(obj, ano, mes){
var padre = obj.eInput,
cnd = S(padre).attr("eFrom,eTo,eWeekday",null,["0000-00","9999-99","0,1,2,3,4,5,6"]),
hoy = S.date("Y-m-d"),
inputDay = S.dataFormat(padre.value,"F4","d"), p,
week = (S.setup.weekday==0 ? /(5|6)/ : /(0|6)/);
cnd.eWeekday = cnd.eWeekday.split(",");
if( ano+"-"+mes<cnd.eFrom ){
ano = mid(cnd.eFrom,4);
mes = mid(cnd.eFrom,5,2);
obj.getElementsByTagName("INPUT")[0].value = ano+"-"+mes;
}else if( ano+"-"+mes>cnd.eTo ){
ano = mid(cnd.eTo,4);
mes = mid(cnd.eTo,5,2);
obj.getElementsByTagName("INPUT")[0].value = ano+"-"+mes;
}
if( cnd.eFrom.length==7 ) cnd.eFrom += "-"+32;
if( cnd.eTo.length==7 ) cnd.eTo += "-"+32;
obj.getElementsByTagName("INPUT")[0].title = lng(171+mes*1);
var dia = new Date(ano,mes-1,1), o, cDia,
dp = dia.getDay()-1,
n,du=((new Date(ano,mes,0)).getDate());
if( dp<0 ) dp=6;
dp--;
dp += S.setup.weekday;
if( dp==6 ) dp=-1;
obj = obj.getElementsByTagName("TD");
for(n=0; n<42; n++){
obj[n].innerHTML = "&nbsp;";
if( week.test(obj[n].cellIndex) ) S(obj[n]).class("+WEEKEND");
}
for(n=1; n<=du; n++){
p = dp+n;
o = obj[p];
o.textContent = n;
o.className = "";
o.title = "";
cDia = padL(ano,4)+"-"+padL(mes,2)+"-"+padL(n,2);
if( hoy==cDia ){
S(o).class("+TODAY");
o.title = lng(123);
}
if( inputDay==cDia ){
S(o).class("+INPUTDAY");
o.title = lng(129);
}
if( week.test(o.cellIndex) ) S(o).class("+WEEKEND");
if( (!S.is(o.cellIndex,cnd.eWeekday)) ||
(cDia<cnd.eFrom) ||
(cDia>cnd.eTo) ){
S(o).class("+OFF");
}
}
}
}
function getDate(type, val){
var formato;
if( type[0]=="m" ){
formato = S.setup.pMonth;
}else if( type[0]=="d" ){
formato = S.setup.pDate;
}else{
formato = S.setup.pDateTime;
}
if( type[1]=="y" ) return midn(val, formato.py, 4);
if( type[1]=="m" ) return midn(val, formato.pm, 2);
if( type[1]=="d" ) return midn(val, formato.pd, 2);
S.error("Error al obtener un dato de una fecha");
}
function putDate(type, d, m, y){
var formato;
if( type=="m" ){
formato = S.setup.month;
}else if( type=="d" ){
formato = S.setup.date;
}else{
formato = S.setup.datetime;
}
if( d!=undefined ) formato = S.replace(formato, "dd", padL(trim(d+""),2));
if( m!=undefined ) formato = S.replace(formato, "mm", padL(trim(m+""),2));
if( y!=undefined ) formato = S.replace(formato, "yyyy", y);
return formato;
}
S.fn.calendarMonth = function(o){
if( this.obj.tagName=="I" ){
this.obj = this.obj.previousSibling;
}
if( o!==undefined ) var oDiv = S("#DivCALENMONTH", this.win);
if( o=="s" ){
var ev = objWindow(oDiv.obj).event;
o = -12 * ((ev.detail<0)? 1 : (ev.wheelDelta>0)? 1 : -1);
}
if( o===null ){
S.eventClear(objWindow(oDiv.obj));
S(oDiv).nodeRemove();
return;
}else if( o=="t" ){
if( this.obj.readOnly ) return S.eventClear(this.win);
if( !S.check("P4", this.obj, S.date(_FormatMonth)) ){
return S.eventClear(objWindow(this.obj));
}
S(this.obj).val(S.date("Y-m"));
S.eventClear(objWindow(this.obj));
this.obj.focus();
return;
}else if( o=="ok" ){
var obj = oDiv.obj,
o = S.event(objWindow(obj)),
padre = oDiv.obj.Padre,
nAno=-1, nMes=-1;
S("TD",obj).each(function(pk,td,n){
if( pk>23 ) return;
if( td.className!="" && td.className!="OFF" && trim(td.textContent)!="" ){
if( td.cellIndex<2 ) nAno = td.textContent;
else nMes = S(td).attr("i");
}
});
S.eventClear(objWindow(obj));
if( nAno==-1 || nMes==-1 ){
S(o).error("Faltan definir datos", "13,14");
}else{
S(obj).nodeRemove();
if( obj.Padre.id=="TOOLSDate" && obj.eFrom!=undefined ){
var win = this.win,
oFrom = S(":"+obj.eFrom, win).obj,
oTo = S(":"+obj.eTo, win).obj,
dd = "dDd".split(""),
nd = (oTo && oFrom.sourceIndex>oTo.sourceIndex ? 1:0);
if( !oTo || (win.event && win.event.ctrlKey) ){
S(obj.eParent).val(S.date(S.replace(_FormatDate, "d", dd[nd]), 1, nMes, nAno));
}else{
S.values(win, [
[oFrom, S.date(S.replace(_FormatDate, "d", dd[nd]  ), 1, nMes, nAno)],
[oTo  , S.date(S.replace(_FormatDate, "d", dd[nd]+1), 1, nMes, nAno)]
]);
}
return;
}
var v = putDate("m", null, nMes, nAno);
if( padre.className=="CALENDAR" && trim(padre.textContent)!="" ){
var obj = S("INPUT",padre);
S(obj.obj).val(v);
}else padre.eInput.value = v;
}
return;
}else if( o=="d" ){
var obj = oDiv.obj,
o = S.event(objWindow(obj));
d = o.cellIndex;
S("TD",obj).each(function(pk,td,n){
if( pk>23 ) return;
if( (d<2 && td.cellIndex<2) || (d>1 && td.cellIndex>1 && td.className!="OFF") ) td.className = "";
});
if( o.className!="OFF" ) o.className = "TODAY";
if( d<2 && S(oDiv).attr("eType")=="MESES" ){
desactivaMeses(obj, o.textContent);
}
return S.eventClear(objWindow(obj));
}else if( o=="R" ){
}else if( o!=undefined ){
var obj = S("TD",oDiv.obj).obj,
ano = obj.textContent*1+o;
pintaAnos(oDiv.obj.Padre, S("TD",S(oDiv)).dim, ano);
return S.eventClear(objWindow(obj));
}
var win = this.win,
icon = S.event(win),
tipo = this.obj.tagName=="INPUT" ? "periodo" : "fecha",
l,c,padre=(tipo=="periodo") ? icon : toTag(this.obj,"DIV","*"),
zIndex = getStyle(padre, "zIndex")*1+3,
txt = "<DIV class='CALENDAR' id='DivCALENMONTH' style='z-index:"+(zIndex-1)+"'>"+
"<TABLE onclick=S(this).calendarMonth('d') width='100%' onmousewheel=S(this).calendarMonth('s') class='col_0ff col_1ff'>"+
"<TR>";
if( icon.disabled ) return S.eventClear(win);
if( this.obj.tagName=="INPUT" ) padre.eInput = this.obj;
var input = tipo=="periodo" ? this.obj : S("INPUT",padre).obj,
cnd = S(padre.eInput).attr("eFrom,eTo,eMonth",null,["0000-00","9999-99","1,2,3,4,5,6,7,8,9,10,11,12"]),
inputValue = input.value!="" ? input.value : S.date(_FormatMonth);
if( input.value=="" && input.getAttribute("DBRange")!=null && S(":"+input.getAttribute("DBRange"), win).val()!="" ) inputValue = S(":"+input.getAttribute("DBRange"), win).val();
if( inputValue.length==10 ) inputValue = S.date(_FormatMonth, inputValue);
var desde = getDate("my", cnd.eFrom),
hasta = getDate("my", cnd.eTo),
desdeMes = getDate("mm", cnd.eFrom),
hastaMes = getDate("mm", cnd.eTo),
aAno = getDate("my", inputValue),
aMes = getDate("mm", inputValue),
ano = aAno-5,
so = o;
if( ano<desde ) ano = desde;
else if( ano+11>hasta ) ano = hasta-11;
if( ano<desde ) ano = desde;
cnd.eMonth = ","+cnd.eMonth+",";
txt += "<TH colspan=2 style='padding-top:4px;'>AÑO</TH>";
txt += "<TH colspan=2 style='padding-top:4px;'>MES</TH>";
txt += "</TR>";
for(l=0; l<6; l++){
txt += "<TR>";
if( hasta>-1 && ano+l>hasta ) txt += "<TD>&nbsp;</TD>";
else txt += "<TD"+(ano+l==aAno?" class='TODAY'":"")+">"+(ano+l)+"</TD>";
if( hasta>-1 &&  ano+l+6>hasta ) txt += "<TD>&nbsp;</TD>";
else txt += "<TD"+((ano+l+6)==aAno?" class='TODAY'":"")+">"+(ano+l+6)+"</TD>";
if( is(l+1,cnd.eMonth) ) txt += "<TD i="+(l+1)+" title='"+padL(l+1,2)+"' style='text-align:left'"+(l+1==aMes?" class='TODAY'":"")+">"+lng(172+l)+"</TD>";
else txt += "<TD style='text-align:left'>&nbsp;</TD>";
if( is(l+7,cnd.eMonth) ) txt += "<TD i="+(l+7)+" title='"+padL(l+7,2)+"' style='text-align:left'"+((l+7)==aMes?" class='TODAY'":"")+">"+lng(178+l)+"</TD>";
else txt += "<TD style='text-align:left'>&nbsp;</TD>";
txt += "</TR>";
}
txt += '<tfoot><tr><td colspan=2 align=center style="padding:0px">'+
'<table cellspacing=0px cellpadding=0px border=1px style="border-spacing:0px;width:100%"><tr>'+
'<td onclick="S(this).calendarMonth(-12)"><i class="ICONINPUT" t_itle="'+lng(125)+'"><</i></td>'+
'<td onclick="S(this).calendarMonth(12)"><i class="ICONINPUT" t_itle="'+lng(126)+'">></i></td>'+
'</table>'+
'</td>'+
'<td colspan=2 align=center style="padding:0px">'+
'<table cellspacing=0px cellpadding=0px border=1px style="border-spacing:0px;width:100%"><tr>'+
'<td onclick="S(this).calendarMonth(null)"><i class="ICONINPUT" title="'+lng(128)+'">.</i></td>'+
'<td onclick="S(this).calendarMonth(\'ok\')"><i class="ICONINPUT" title="'+lng(208)+'">l</i></td>'+
'</table>'+
'</td></tr>';
txt += "</tfoot></TABLE></DIV>";
var o = S(txt,win).nodeEnd(), tapa;
S(win).windowInside(o);
tapa = S(o).modal();
S(o).attr({Padre:padre, eType:this.obj.tagName=="INPUT"? "MESES":"DIAS"});
o.Padre = padre;
if( so=="R" ){
o.obj.eFrom = this.obj.name;
o.obj.eTo = this.obj.getAttribute("DBRange");
o.obj.eParent = this.obj;
}
o.obj.focus();
S(tapa).on("click",function(){
S(o).calendarMonth(null);
});
S(padre).around(o.obj, {hide:1});
S.eventClear(objWindow(padre));
var obj = o.obj,
td = S("TD",o).dim;
ancho1 = Math.max(td[0].offsetWidth, td[1].offsetWidth)-2,
ancho2 = Math.max(td[2].offsetWidth, td[3].offsetWidth)-2;
for(l=0; l<td.length-2; l+=4){
td[l+0].style.width = td[l+1].style.width = px(ancho1);
td[l+2].style.width = td[l+3].style.width = px(ancho2);
}
desactivaMeses(obj, ano);
function desactivaMeses(obj, ano){
var input = obj.Padre.eInput,
cnd = S(input).attr("eFrom,eTo",null,["0000-00","9999-99"]),
desde = getDate("my", cnd.eFrom),
hasta = getDate("my", cnd.eTo),
desdeMes = getDate("mm", cnd.eFrom),
hastaMes = getDate("mm", cnd.eTo),
tds = S("TD", obj);
S(tds).each(function(pk,td,n){
if( pk<24 && td.cellIndex>1 ){
if( (desde==ano && td.title<desdeMes) || (hasta==ano && td.title>hastaMes) ){
td.className = "OFF";
}else if( td.className!="TODAY" ){
td.className = "";
}
}
});
}
function pintaAnos(padre, tds, ano){
if( padre.className=="CALENDAR" ){
var input = S("INPUT",padre).obj,
padreInput = padre.eInput;
}else{
var input = padreInput = padre.eInput;
}
var cnd = S(padreInput).attr("eFrom,eTo,eMonth",null,["0000-00","9999-99","1,2,3,4,5,6,7,8,9,10,11,12"]),
desde = getDate("my", cnd.eFrom),
hasta = getDate("my", cnd.eTo),
aAno = getDate("my", input.value), n;
cnd.eMonth = ","+cnd.eMonth+",";
if( ano<desde ) ano = desde;
else if( ano+11>hasta ) ano = hasta-11;
if( ano<desde ) ano = tds[0].textContent*1;
for( n=0;n<tds.length && n<24; n+=4 ){
if( hasta>-1 && ano>hasta ) tds[n].textContent = " ";
else tds[n].textContent = ano;
if( hasta>-1 && ano+6>hasta ) tds[n+1].textContent = " ";
else tds[n+1].textContent = ano+6;
tds[n].className = tds[n+1].className = "";
ano++;
}
}
}
}
var getUrl = function(HR, ConCtrlKey){
var i=mid(HR,1), scr, win = ConCtrlKey, dimUrl;
if( i=="W" ){
HR = mid(HR,1,0);
win = true;
i = mid(HR,1);
}else if( i=="w" ){
if( ConCtrlKey ){
S.tip(lng(232),5);
return{ok:false};
}
win = false;
HR = mid(HR,1,0);
i = mid(HR,1);
}
dimUrl = S.split("&",HR);
HR = dimUrl[0];
scr = mid(HR,1,0);
switch(i){
case "F":
case "#":
HR = "edes.php?F"+scr+((/\./.test(scr))?"":".edf");
break;
case "L":
case "=":
HR = "edes.php?L"+scr+((/\./.test(scr))?"":".edf");
break;
case "G":
case "@":
HR = "edes.php?G"+scr+((/\./.test(scr))?"":".gdf");
break;
case "E":
scr = mid(scr,1,0);
case ">":
if( scr.indexOf(".")==-1 && scr.indexOf("&")==-1 && scr.indexOf("?")==-1 ) scr += ".php";
HR = "edes.php?"+((scr.indexOf(":")==-1)?"E:":"")+scr;
break;
case "J":
case "^":
if( scr.indexOf(".")==-1 ) scr += ".php";
HR = scr;
win = true;
break;
case "B":
HR = "edes.php?"+HR;
break;
case "R":
if( mid(HR,1,1)==":" ) HR = "edes.php?"+HR;
break;
}
if(dimUrl[1]!="") HR += "&"+dimUrl[1];
return{ok:true, url:HR, win:win};
}
var ejecuteUrl = function(win, op, tr){
op = getUrl(op, (win.event)? win.event.ctrlKey : false);
if( !op["ok"] ) return;
var url = op["url"];
if( op["win"] || S.session.runInWindow>(S.date("u")-1000) ){
S.window(url);
}else if( frames["IWORK"] ){
if( frames["IWORK"].frameElement.offsetWidth==0 ){
frames["IWORK2"].location.replace('about:blank');
frames["IWORK2"].frameElement.style.display = "none";
frames["IWORK"].frameElement.style.display = "block";
}
try{
if(frames["IWORK"].name){}
}catch(e){
S(":IWORK").nodeRemove();
var q = S(top._oIWORK.obj).nodeCopy();
S(q).nodeBegin(top._pIWORK);
S(q).attr("WOPENER", window);
}
S.loading(frames["IWORK"], 1);
url = S.urlAdd(url, win, "WWORK", frames["IWORK"]);
frames["IWORK"].location.href = url;
if( tr && S("#STATELINE").exists() ){
S("#STATELINE").visible();
S("#STATELINE").obj["eTR"] = tr;
var txt = "<span class='endBreadcrumb'>"+tr.cells[1].innerHTML+"</span>", ri, tabla=null;
do{
tr = S.toTag(tr,"tr",1);
if(tr==null) return;
ri = tr.rowIndex-1;
if( ri>=0 ){
tabla = S.toTag(tr,"TABLE");
txt = "<span>"+tabla.rows[ri].cells[1].innerHTML+"</span> > "+txt;
}
}while(ri>=0);
if( tabla!=null ){
S("#STATELINE").html(txt);
}
}
}
}
S.ejecute = function(win, op, tr, migas){
ejecuteUrl(win, op);
if( tr && S("#STATELINE").exists() ){
S("#STATELINE").visible();
S("#STATELINE").obj["eTR"] = tr;
S("#STATELINE").html(migas.join(" > "));
}
}
S._option = function(win, e){
var o = event(win),
tr = event(win, "tr");
if( tr.tagName!="TR" ) return;
if( tr.parentNode.parentNode.className!='SUBMENU' ) tr = S.toTag(tr, "tr", 1);
if( o.className=="OFF" ){
return;
}else if( o.className=="AddButton" ){
var table = toTag(tr,"TABLE","tr,tbody");
if( table["function"] ){
var n, dim=[];
for(n=0; n<table.rows.length; n++ ) if( table.rows[n].cells.length==3 ){
dim.push([
table.rows[n].cells[0].children[0].checked,
table.rows[n].getAttribute("op"),
table.rows[n].cells[1].innerText
]);
}
table["function"](dim, table["trigger"]);
hideParent(table, win);
hideChild(table, win);
return;
}
}
if( tr==null || tr.cells[0].tagName=="TH" ) return;
if( S(tr).class("?OFF") ) return;
var op = tr.getAttribute("op"),
pObj = tr.getAttribute("pObj"),
table = toTag(tr,"TABLE","tr,tbody"),
i = table.getAttribute("nivel"),
oDim = table["oDim"],
td = S("input", tr.cells[0]);
if( td.length ){
if( o!=td.obj && !td.obj.readOnly ) td.obj.checked = !td.obj.checked;
return;
}
if( pObj ){
table["function"](oDim[pObj], tr, table);
return;
}
if( op=="undefined" || (tr.cells[1].textContent=="..." && table.className!="SUBMENU") ) return;
if( op==null ){
var indice = tr.cells[2].getAttribute("indice").split(","),
ops = table["DimMenu"][indice[indice.length-1]],
s,p,sm;
for(s=2; s<=4; s++) if( type(ops[s])=="array" ){
p = s;
break;
}
if( table["nop"] ) S(table["nop"],win).class("-ON");
if( table["Child"] ) hideChild(table["Child"], win);
S(tr,win).class("+ON");
sm = S(tr).menu(ops[p], {index:indice[0]*1+1, window:win, function:table["function"], oncontextmenu:table["oncontextmenu"]});
sm.obj["Parent"] = table;
table["Child"] = sm.obj;
table["nop"] = tr;
return;
}else if( op[0]=="^" ) window.open(S.left(op,1,0));
else if( mid(op,-1)==")" || mid(op,-2)==");" ) S.run(win,op);
else if( /^(http|www)/i.test(op) ){
win.location.href = op;
}else if( op[0]==">" && table["function"] )				table["function"](op, tr.cells[1].textContent, table["trigger"], tr, table, table["arg"]);
else if( !/(\(|\.|\:)/.test(op) && table["function"] )	table["function"](op, tr.cells[1].textContent, table["trigger"], tr, table, table["arg"]);
else if( op[0]=="." && table["function"] )				table["function"](S.mid(op,1,0), tr.cells[1].textContent, table["trigger"], tr, table, table["arg"]);
else if( S.left(op,2)=="[]" ){
S.window(getUrl(S.left(op,2,0)).url);
}else{
if( mid(op,-1)==":" ){
var tabla = S(tr).toTag("table","*");
if( tabla["url"] ) op += mid(tabla["url"],1,0);
}
ejecuteUrl(win, op, tr);
}
if( S(tr).attr("eNoHide")==null && !table["nohide"] && !/^(http|www)/i.test(op) && table["drop"] ){
hideParent(table, win);
hideChild(table, win);
}
function hideParent(table, win){
if( table["Tapa"] ) S(table["Tapa"],win).nodeRemove();
if( table["Parent"] ) hideParent(table["Parent"], win);
if( table.parentNode ) S(table,win).nodeRemove();
}
function hideChild(table, win){
if( table["Child"] ) hideChild(table["Child"], win);
if( table.parentNode ) S(table,win).nodeRemove();
}
}
S.toDo = function(add){
if( add==undefined ){
if( _toDo.length>0 ){
var bak=[],n;
eval(_toDo[0]);
for(n=1; n<_toDo.length; n++) bak.push(_toDo[n]);
_toDo = bak;
}
}else{
_toDo.push(add);
}
}
S.fn.menu = function(op, para, arg){
if(!para) para = {};
var nivel = para["index"],
winop = para["window"],
obj = this.obj,
win = winop || this.win,
zIndex = para["zIndex"] || getStyle(obj, "zIndex")*1+10,
nivel = nivel || 0,
tabla, n,o,url,t2,t3,t4,t5,tapa, oDim=[],p=0,pn;
tabla = "<table i="+(new Date()*1)+" class='SUBMENU' onclick='S._option(window,event)' nivel="+nivel+" style='position:absolute;left:0px;top:0px;visibility:hidden;z-index:"+zIndex+"' onselectstart='return false'>";
if( para["trigger"]==undefined ) para["trigger"] = true;
if( op.length==undefined ){
var newDim=[], ico;
for(n in op){
pk = n;
if(n[0]==".") n = S.mid(n,1,0);
if(n[0]=="-" || n[0]=="~") n = "-";
if( n[0]=="-" ){
newDim.push(["-"+op[pk]]);
}else{
ico = "";
if( op[pk][0]=="[" ){
tmp = S.split("]",S.mid(op[pk],1,0))
ico = "["+tmp[0]+"]";
op[pk] = tmp[1];
}
if( S.right(op[pk],1)!="-" ){
newDim.push([op[pk], ico, n]);
}else{
}
}
}
op = newDim;
}
for(n=0; n<op.length; n++){
if(op[n]==undefined) continue;
t2 = type(op[n][2]);
t3 = type(op[n][3]);
t4 = type(op[n][4]);
t5 = type(op[n][5]);
url = (t2=="array" || t3=="array" || t4=="array");
tabla += "<tr";
if( t2=="html" || t2=="window" ){
tabla += " pObj='"+(p++)+"', op=''";
oDim.push(op[n][2]);
}else if( op[n][2]!=undefined && !url ){
if( S.mid(op[n][2],-1)==")" ){
tabla += " op='"+S.replace(op[n][2], "'","&#39;")+"'";
}else{
tabla += " op='"+op[n][2]+"'";
}
}
if( para["off"]!=undefined ) para["off"] = S.trim(para["off"]);
if(op[n][5]) tabla += " style='"+op[n][5]+"'";
if(op[n][6]){
if(S.is("eNoHide",op[n][6])) tabla += " eNoHide=1";
if(S.is("-",op[n][6])) tabla += " class='OFF'";
}
if( t3=="array" && op[n][2]!="" ) tabla += " title='"+op[n][2]+"'";
else if( t3=="string" ) tabla += " title='"+op[n][3]+"'";
tabla += ">";
op[n][0] = trim(op[n][0]);
if( op[n][0].indexOf("<")==0 && (mid(op[n][0],2)=="<i" || mid(op[n][0],4)=="<img") && op[n][1]=="" ){
op[n][1] = mid(op[n][0],0,">")+">";
op[n][0] = trim(mid(op[n][0],">",0));
}
if( !para["noMark"] && S.left(op[n][0],5)!="<img " && S.left(op[n][0],3)!="<i " && (pn = op[n][0].indexOf("_"))>-1 && para["trigger"] ){
op[n][0] = op[n][0].substr(0,pn)+'<b><u>'+op[n][0].substr(pn+1,1)+'</u></b>'+op[n][0].substr(pn+2);
}
if( op[n][0]=="-" ){
tabla += "<th colspan='3' class='LINEA'></th>";
}else if( op[n][0][0]=="-" ){
tabla += "<th colspan='3' class='TITULO'>"+mid(op[n][0],1,0)+"</th>";
}else if( op[n][0][0]=="=" ){
tabla += "<th colspan='3' style='text-align:-webkit-center'>"+
'<div class="AddButton" border="0px" cellspacing="0px" cellpadding="1px" style="display:table;margin-left:0px;">'+
mid(op[n][0],1,0)+
'</div>'+
"</th>";
}else{
if( op[n][1]!=null && op[n][1]!="" && op[n][1][0]!="<" ){
if( S.left(op[n][1],2)=="[]" ){
op[n][1] = "<input type='checkbox' class='READONLY'"+(/[Cc]/.test(op[n][1]) ? " checked":"")+(/[-]/.test(op[n][1]) ? " readonly=true disabled":"")+">";
}else if( op[n][1][0]=="[" ){
var sIn="",sOut="";
if( t5=="string" ){
if( S.mid(S.trim(op[n][5]),6)=="class=" ){
sIn = " "+S.mid(S.trim(op[n][5]),6,0);
}else{
sOut = op[n][5];
}
}
op[n][1] = S.mid(op[n][1], "[", "]");
if( S.is(".",op[n][1]) ){
op[n][1] = "<img src='"+op[n][1]+"'>";
}else{
tapa = true;
if( S.left(op[n][1],2)=="==" ){
op[n][1] = S.mid(op[n][1],2,0);
tapa = false;
}
op[n][1] = "<i class='ICONMENU"+sIn+"'"+sOut+">"+((tapa && _Icon[op[n][1].toUpperCase()]) || op[n][1])+"</i>";
}
}else if( S.is(".",op[n][1]) ){
op[n][1] = "<img src='"+op[n][1]+"'>";
}else if( op[n][1].length==1 || S.left(op[n][1],2)=="&#" ){
var sIn="",sOut="";
if( t5=="string" ){
if( S.mid(S.trim(op[n][5]),6)=="class=" ){
sIn = " "+S.mid(S.trim(op[n][5]),6,0);
}else{
sOut = op[n][5];
}
sIn = "ICONMENU"+sIn;
}else{
sIn = ({"I":"INSERT", "D":"DELETE", "V":"VIEW", "U":"UPDATE"})[op[n][1]];
if( sIn==undefined ) sIn = "OPTION";
sIn = "ICON"+sIn;
}
op[n][1] = "<i class='"+sIn+"'"+sOut+">"+op[n][1]+"</i>";
}else{
op[n][1] = "<img src='"+op[n][1]+"'>";
}
}
if( op[n][0].indexOf("|")>-1 ){
var la = op[n][0].split("|");
op[n][0] = "<span><span>"+trim(la[0])+"</span>"+trim(la[1])+"</span>";
}
tabla += "<td>"+op[n][1]+"</td>"+"<td"+((para["off"]!=undefined && para["off"]==op[n][0] && op[n][0]!="")?" class='OFF'":"")+">"+op[n][0]+"</td>";
if( url ){
tabla += "<td indice='"+nivel+","+n+"'><i class=ICONWINDOW>M</i></td>";
}else{
tabla += "<td></td>";
}
}
tabla += "</tr>";
}
tabla += "</table>";
o = S(tabla, win).nodeEnd();
o.obj["DimMenu"] = op;
if( arg ) o.obj["arg"] = arg;
if( typeof(para["drop"])=='undefined' ) para["drop"] = true;
S(o).attr({function:para["function"], oncontextmenu:para["oncontextmenu"], oDim:oDim, url:para["url"], trigger:para["trigger"]||null, drop:para["drop"], nohide:para["nohide"]});
if( para["oncontextmenu"] ){
S(o).obj.oncontextmenu = function(ev){
para["oncontextmenu"](ev);
var table = S(ev.target).toTag("TABLE");
if(table){
if( table["Tapa"] ) S(table["Tapa"], win).nodeRemove();
if( table["Parent"] ) S(table["Parent"], win).nodeRemove();
S(table, win).nodeRemove();
}
return S.eventClear(win);
};
}
if( nivel>0){
n = false;
if( obj.offsetWidth==0 ){
S(o).css("z-index", 1002);
tapa = S(o).modal();
o.obj["Tapa"] = tapa.obj;
tapa.obj["Menu"] = o.obj;
S(tapa).on("click", function(){
hideChild(this["Menu"], win);
function hideChild(table, win){
if( table["Tapa"] ) S(table["Tapa"],win).nodeRemove();
if( table["Child"] ) hideChild( table["Child"], win );
if( table.parentNode ) S(table,win).nodeRemove();
}
});
n = true;
}
S(obj,win).around(o, {type:"2,4,10,8,13,14", point:n});
}else{
if( arg==undefined ) arg = {};
arg["hide"] = para["hide"];
if( para["point"] ) arg["point"] = 1;
t2 = S(obj,win).around(o, para);
if( t2.type=="BL" ){
if( para["+x"]!=undefined ) S(o).css("left", t2.x+para["+x"]);
if( para["+y"]!=undefined ) S(o).css("top", t2.y+para["+y"]);
}
if( para["drop"] ){
if( (para["out"]+"")=="true" ){
o.on("mouseleave",function(){
S(o).nodeRemove();
});
}else{
if( para["scroll"] && t2.type=="notfit" ){
var d = S("<div class='SCROLLBAR' style='border-width:0px;position:absolute;top:0px;overflow-y:auto;display:table-cell;z-index:"+(S(o).css("zIndex"))+";'></div>", win).nodeEnd(win.document.body),
s = S.screen(win),
e = S(o).xy();
S(d).css("width:"+(e.w+10)+"px;height:"+(s.h-12)+"px");
S(o).css("left:0;top:0;position:");
d.obj.appendChild(o.obj);
S(obj, win).around(d, para);
tapa = S(d).modal();
d.obj["Tapa"] = tapa.obj;
o.obj["Tapa"] = tapa.obj;
tapa.obj["Menu"] = d.obj;
}else{
tapa = S(o).modal();
o.obj["Tapa"] = tapa.obj;
tapa.obj["Menu"] = o.obj;
}
if(para["zIndex"]) para["zIndex"] = tapa.css("zIndex")*1+1;
S(tapa).on("click", function(){
hideChild(this["Menu"], win);
function hideChild(table, win){
if( table["Tapa"] ) S(table["Tapa"], win).nodeRemove();
if( table["Child"] ) hideChild( table["Child"], win );
if( table.parentNode ) S(table,win).nodeRemove();
}
});
}
}
}
if(para["zIndex"]) S(o).css("z-index", para["zIndex"]);
return o;
}
S.fn.menuRow = function(oTabla, oMenu=null, oFunc=null){
var win = this.win,
func = oFunc, oTRS, i, o,
_OcultarSubMenu = null,
txt = '<span id="MENUTRFLOAT" class="MENUTROPACITY NOBREAK">';
if( type(oTabla)=="html" && oTabla.tagName=="TR" ) oTabla = S.toTag(oTabla, "TABLE");
oTabla = S(oTabla, win);
oTRS = S("TBODY TR", oTabla);
if( func!=null ) oTabla.obj["func"] = func;
if( oMenu==null ){
oMenu = oTabla.obj["eMenu"];
if( oMenu==undefined ) return;
oMenu = S(oMenu);
oMenu.on("mouseleave");
oMenu.on("mouseenter");
oTRS.on("mouseleave");
oTRS.on("mouseenter");
}else if( type(oMenu)=="array" ){
if( oMenu.length==0 ) return;
if( type(oMenu[0])=="string" ){
txt += oMenu.join("")+"</div>";
oMenu = S(txt, win).nodeEnd();
}else{
o = S(txt+'</div>', win).nodeEnd();
for(i=0; i<oMenu.length; i++) S(oMenu[i]).nodeEnd(o.obj);
oMenu = o;
}
}else{
oMenu = S(oMenu, win);
}
S("*[onclick]", oMenu).each(function(k,o){
o.onclick = win._Public(o.onclick);
});
oTabla.obj["eMenu"] = oMenu.obj;
var cc = oTabla.class().match(/col_[0-9]{1,2}(l|c|r)/g);
if( cc!=null ){
cc = cc[cc.length-1].match(/[0-9]/g).join("")*1+1;
S(".BROWSE TD:nth-child("+cc+")", win).each(function(k,o){
if( o.children.length>0 ){
S(win).rule("+.BROWSE TH:nth-child("+cc+"){padding-right:"+(oMenu.obj.offsetWidth+5)+"px}");
S(win).rule("+.BROWSE TD:nth-child("+cc+"){padding-right:"+(oMenu.obj.offsetWidth+5)+"px}");
return null;
}
});
}
oMenu.attr({eWidth:oMenu.obj.offsetWidth*1, eHeight:oMenu.obj.offsetHeight*1, eScrollWidth:null});
oMenu.on("mouseleave", function(ev){
var o = S.event(ev);
S(o).class("+MENUTROPACITY");
S("TD", o["eTR"]).css("backgroundColor:");
_OcultarSubMenu = setTimeout(function(){
oMenu.hidden();
}, 1);
});
oMenu.on("mouseenter", function(ev){
clearTimeout(_OcultarSubMenu);
var o = S.event(ev);
S(o).class("-MENUTROPACITY");
S("TD", o["eTR"]).css({backgroundColor:o["eColor"]});
});
oTRS.on("mouseleave", function(ev){
_OcultarSubMenu = setTimeout(function(){
oMenu.hidden();
}, 1);
});
oTRS.on("mouseenter", function(ev){
var o = S.event(ev);
if( o.tagName=="TD" ) o = o.parentElement;
var c = S.xy(o),
menu = oMenu,
color = S(o.cells[0]).css("backgroundColor"),
del = S(o).css("textDecorationLine"), ops;
if( _OcultarSubMenu!=null ) clearTimeout(_OcultarSubMenu);
S("*[op]", menu.obj).css({visibility:""});
S.publicRow(win, o.cells, 1);
if( del=="line-through" ){
S.each(["b","c","m","o"], function(k,i){
S("*[op='"+i+"']", menu).hidden();
});
}else{
if( func!=null ){
ops = func(o);
if( type(ops)=="boolean" ){
if(!ops) return;
}else{
if( type(ops)=="string" ) ops = S.nsp(ops).split(",");
S.each(ops, function(k,i){
S("*[op='"+i+"']", menu).hidden();
});
}
}
}
if( color=="rgba(0, 0, 0, 0)" ) color = "";
menu.obj["eColor"] = color;
menu.obj["eTR"] = o;
if( menu.obj.eWidth==0 ){
menu.obj.eWidth = menu.obj.offsetWidth;
menu.obj.eHeight = menu.obj.offsetHeight;
}
win._RowEdit = o.rowIndex;
if( menu.obj.eScrollWidth==null ){
menu.obj.eScrollWidth = S.screen(win).w*1;
}
var x = c.x+c.w-menu.obj.eWidth,
y = c.y+(c.h-menu.obj.eHeight)/2,
res = (x+menu.obj.eWidth-S.scrollGet(win).scrollLeft)-menu.obj.eScrollWidth;
if( res>0 ) x -= res;
if( S(win.document.body).css("overflow-y")=="visible" ) x-=10;
menu.css({left:x+5, top:y, visibility:"visible", backgroundColor:color});
});
}
S.tree = function(win, context, ev){
var li = event(ev||win, "tr"), op, oTree;
if( li==null || (S(li).attr("op")==null && S(li).attr("open")==null) ) return;
var open = li.getAttribute("open"),
ico = li.cells[0].children[0],
oHijo = S(li).toTag("table", "*").rows[li.rowIndex+1],
oSpan = S.toTag(li, "SPAN", "className=TREE"),
nivel = S(li).attr("nivel")*1, i,p, cTree, cScreen,
calcLevel = (oSpan==null)? false: S(oSpan).attr("oneLevel")!=null;
if( calcLevel ){
if( !S(oSpan).obj["niveles"] ){
S(oSpan).obj["niveles"] = [];
if( nivel==1 ) S(oSpan).obj["niveles"].push(S(li).toTag("table", "*").rows[li.rowIndex-1]);
}
}
if( open=="-" ){
if( calcLevel ){
for(i=S(oSpan).obj["niveles"].length-1; i>=nivel; i--){
var trMenu = S.toTag(S(oSpan).obj["niveles"][i], "TR"),
trPadre = S(trMenu).toTag("table", "*").rows[trMenu.rowIndex-1],
tIco = trPadre.cells[0].children[0];
trPadre.setAttribute("open", "+");
S(oSpan).obj["niveles"][i].style.display = "none";
S(oSpan).obj["niveles"].pop();
if( tIco && S(tIco).attr("eIcon")!=null ){
S(tIco).text(S.right(S(tIco).attr("eIcon"),1));
}
}
}
li.setAttribute("open", "+");
oHijo.style.display = "none";
if( li.cells[2].children.length ) S(li.cells[2].children[0]).html(oSpan.getAttribute("eFClose"));
if( ico && S(ico).attr("eIcon")!=null ){
S(ico).text(S.left(S(ico).attr("eIcon"),1));
}
}else if( open=="+" ){
if( calcLevel ){
for(i=S(oSpan).obj["niveles"].length-1; i>=nivel; i--){
var trMenu = S.toTag(S(oSpan).obj["niveles"][i], "TR"),
trPadre = S(trMenu).toTag("table", "*").rows[trMenu.rowIndex-1],
tIco = trPadre.cells[0].children[0];
trPadre.setAttribute("open", "+");
S(oSpan).obj["niveles"][i].style.display = "none";
S(oSpan).obj["niveles"].pop();
if( tIco && S(tIco).attr("eIcon")!=null ){
S(tIco).text(S.left(S(tIco).attr("eIcon"),1));
}
}
S(oSpan).obj["niveles"].push(oHijo);
}
li.setAttribute("open","-");
oHijo.style.display = "";
if( li.cells[2].children.length ) S(li.cells[2].children[0]).html(oSpan.getAttribute("eFOpen"));
if( ico && S(ico).attr("eIcon")!=null ){
S(ico).text(S.right(S(ico).attr("eIcon"),1));
}
}else{
op = li.getAttribute("op");
if( op=="undefined" || op==null ) return;
if( op.search('#user#')!=-1 ) op = op.replace('#user#', _User);
if( op.search('#node#')!=-1 ) op = op.replace('#node#', _Node);
if( /.*?\{.*?\}.*?/.test(op) ){
if( type(top["LastURL_"])=="undefined" ) top["LastURL_"] = "";
var res = window.prompt(S.mid(op,"{","}"), top["LastURL_"]);
if( res==null ) return;
top["LastURL_"] = res;
op = S.replace(op, S.mid(op,"{","}",""), res);
}
oTree = S.toClass(li,"TREE");
if( op[0]=="^" ) window.open(S.left(op,1,0));
else if( mid(op,-1)==")" || mid(op,-2)==");" ) S.run(win, op);
else if( /^(http|www)/i.test(op) ){
win.location.href = op;
}else if( !/(\(|\.|\:)/.test(op) && oTree["function"] ){
oTree["function"](op, li, oTree["parameter"], S.trim(li.cells[1].innerText));
}else{
if( mid(op,-1)==":" ){
var oRow = S(S(li).toTag("table","*").parentNode).obj.parentNode,
rows = S(S(oRow).toTag("table","*")).obj.rows,
trPadre = rows[oRow.rowIndex-1];
op += mid(S(trPadre).attr("op"),1,0);
}else if( mid(op,1)==">" ){
op = mid(op,1,0);
if( op.indexOf("edes.php")==-1 ) op = "edes.php?E:"+op;
}
if(context) op+="&_CONTEXT="+context;
if( S.isReady() ){
ejecuteUrl(win, op, li);
}else{
top.eInfo(window, S.lng(220));
}
}
if(win) S.eventClear(win);
}
if( /^(-|\+)$/.test(open) && oSpan.id!="TREEMAIN" ){
p = oSpan.scrollTop;
S(oSpan).css("height:auto");
if( oSpan["eTreeParent"]!=undefined ){
cScreen = S.xy(oSpan["eTreeParent"]);
}else{
cScreen = S.screen(win);
}
cTree = S.xy(oSpan);
if( (cTree.h+cTree.y)>cScreen.h ){
i = cScreen.h-cTree.h;
if( i<cScreen.y ){
i = cScreen.y;
if( cTree.h>cScreen.h ){
S(oSpan).css("height:"+cScreen.h);
}
}
S(oSpan).css("top:"+i);
}
oSpan.scrollTop = p;
}
}
S.fn.tree = function(op, p){
if( !S.isReady() ) return;
if( op==undefined ){
var obj=this.obj, win=this.win, tr;
S("TR TD TABLE", obj).each(function(pk, o){
S(o.parentElement.parentElement).none();
});
S(S("TABLE", obj).obj.rows).each(function(pk, o){
if( o.cells[0].colSpan==1 ){
S(o).attr("open", "+");
if( o.cells[2].children.length ){
o.cells[2].children[0].innerText = "M";
}
}
});
S("tr td i", obj).each(function(k,o){
if( o.innerText=="ª" ){
o.innerText = "©";
tr = o.parentNode.parentNode;
tr.setAttribute("open","+");
}
});
return S.eventClear(win);
}
if( !p ) p = {};
p["id"] = ((p["id"]==undefined)? "": " id='"+p["id"]+"' ");
if( p["zIndex"]==undefined ) p["zIndex"] = (S.session.index += 2);
if( p["icon"]==undefined ) p["icon"] = "";
if( p["icon"]=="system" ) p["icon"] = "©,ª";
if( p["open"]==undefined ) p["open"] = "";
if( p["close"]==undefined ) p["close"] = "";
var obj = this.obj,
win = this.win,
txt = "<span class='TREE'"+p["id"]+"style='z-index:"+p["zIndex"]+";visibility:hidden' onselectstart='return false' oncontextmenu='S(this).tree()' eFOpen='"+p["open"]+"' eFClose='"+p["close"]+"'>",
tapa,o,wh,i,conIcon="", nNivel=1;
for(i=0; i<op.length; i++) if( op[i][1] ){
conIcon="_ICON";
break;
}
if( p.container ) txt = "";
txt += "<table id='tab"+nNivel+"'>"+"<col style='width:1px'><col><col style='width:1px'>"+
menu(op, p.expanded||false, conIcon, p["icon"])+
"</table>";
if( !p.container ) txt += "</span>";
o = S(txt, win).nodeEnd(p.container||p.parent||"body");
if( !p.parent && !p.container ){
if( p.x && p.y ){
S(o).css({position:"absolute", left:p.x, top:p.y});
}else{
S(obj,win).around(o);
S(".TREE").css("zIndex", p["zIndex"]);
}
}
S(o).visible()
.attr({function:p["function"], parameter:p["parameter"]});
wh = S(o).css("width,height,top");
S(o).css("width:"+(px2num(wh["width"])+14));
if( px2num(wh["height"])>win.document.body.clientHeight ){
S(o).css("overflow-x:hidden; float:left; overflow-y:auto;height:"+(win.document.body.clientHeight-1)+";top:"+win.document.body.scrollTop);
S(o).css("width:"+(px2num(wh["width"])+14+o.obj.offsetWidth-o.obj.scrollWidth));
}else S(o).css("height:"+(px2num(wh["height"])));
S(o).on("click",function(ev){
S.tree(win, undefined, ev);
});
if( p["modal"] ){
S(o).modal().on("click", function(){
S(o).nodeRemove();
S(this).nodeRemove();
});
}
if( !p.expanded ){
S(o.obj).find("TR[open]").each(function(pk, tr, n){
tr.setAttribute("open","+");
S(tr).toTag("table","*").rows[tr.rowIndex+1].style.display = "none";
if( tr.cells[2].children.length ) S(tr.cells[2].children[0]).text("M");
});
}
function menu(op, expanded, conIcon, picon){
var n,url,t2,t3,t4,nIndice,txt="", xop, title, i, conIconSub, dicon=[], xicon=picon.replace(",",""), icon;
nNivel++;
if( picon!="" ) dicon = picon.split(",");
for(n=0; n<op.length; n++){
if(op[n]==undefined) continue;
nIndice = 0;
t2 = type(op[n][2]); if( t2=="array" ) nIndice = 2;
t3 = type(op[n][3]); if( t3=="array" ) nIndice = 3;
t4 = type(op[n][4]); if( t4=="array" ) nIndice = 4;
url = (t2=="array" || t3=="array" || t4=="array");
if( t3=="array" && op[n][2]!="" && mid(op[n][2],1)!=":" ) title = " title='"+op[n][2]+"'";
else if( t3=="string" && mid(op[n][3],1)!=":" ) title = " title='"+op[n][3]+"'";
else title = "";
txt += "<tr"+" nivel='"+nNivel+"'"+title;
if( op[n][0]=="-" ){
txt += "><td colspan='3' class='LINEA'></td></tr>";
}else if( nIndice==0 ){
if( op[n][0][0]=="-" ){
txt += "><td colspan='3' class='TITULO'>"+mid(op[n][0],1,0)+"</td></tr>";
}else{
if( op[n][1]=="" && xicon!="" ){
op[n][1] = '<i class="ICONWINDOW">b</i>';
}else if( op[n][1]!="" ){
if( S.is(".",op[n][1]) ){
op[n][1] = "<img src='"+op[n][1]+"'>";
}else if( op[n][1].length==1 || S.left(op[n][1],2)=="&#" ){
var sIn="",sOut="";
if( op[n][5]!=undefined && type(op[n][5])=="string" ){
if( S.mid(S.trim(op[n][5]),6)=="class=" ){
sIn = " "+S.mid(S.trim(op[n][5]),6,0);
}else{
sOut = op[n][5];
}
}
op[n][1] = "<i class='ICONMENU"+sIn+"'"+sOut+">"+op[n][1]+"</i>";
}else{
op[n][1] = "<img src='"+op[n][1]+"'>";
}
}
if( op[n][2]==null ) txt += " class='OFF'";
xop = (op[n][2]!=undefined && !url) ? " op='"+op[n][2]+"'" : "";
txt += xop+"><td class='UnPX'>"+op[n][1]+"</td><td>"+op[n][0]+"</td><td class='UnPX'></td></tr>";
}
}else if( nIndice>0 ){
conIconSub="";
for(i=0; i<op[n][nIndice].length; i++) if( op[n][nIndice][i][1] ){
conIconSub="_ICON";
break;
}
if( mid(op[n][2],1)==":" ){
txt += " op='"+op[n][2]+"'";
}else if( t2=="array" ){
txt += " op=''";
}
icon = "";
if( dicon.length==2 ) icon = "<i class='ICONWINDOW' eicon='"+xicon+"'>"+((expanded)?dicon[1]:dicon[0])+"</i>";
txt += " open='"+((expanded)?"-":"+")+"'><td class='UnPX'>"+icon+"</td><td>"+op[n][0]+"</td><td class='UnPX'>"+
(p["open"]=="" ? "" : "<i class='ICONWINDOW'>"+((expanded)?p["open"]:p["close"])+"</i>")+
"</td></tr>"+
"<tr><td colspan='3' class='TAB"+conIcon+"'>"+
"<table id='tab"+(nNivel+1)+"' style='width:100%'>"+
"<col style='width:1px'><col><col style='width:1px'>"+
menu(op[n][nIndice], expanded, conIconSub, picon)+
"</table>"+
"</td></tr>";
}
}
nNivel--;
return txt;
}
return o;
}
S.fn.resize = function(minw, minh){
var obj = this.obj,
win = this.win,
xy = S.xy(obj,win),
cor = S.screen(win);
img = obj.children[1];
img["eDesParent"] = obj;
img["eDesX"] = xy.x;
img["eDesY"] = xy.y;
obj["eDesResize"] = img;
return S(img,win).move({x:xy.x+(minw||50), y:xy.y+(minh||50), w:cor.sw, h:cor.sh, cursor:"nw-resize"});
}
S.fn.move = function(zona, captura, p){
var obj	= this.obj,
win = this.win,
cobj = obj,
conzona = type(zona)=="object",
sombra = conzona ? 0:7,
pRelative = S(obj).css("position")=="relative";
if(!p) p = {};
if( p.zIndex ) obj.style.zIndex = p.zIndex;
if( p.addLeft==undefined ) p.addLeft = 0;
if( p.addTop==undefined ) p.addTop = 0;
var uniDir = p.dir;
if(captura){
if( !(cobj = S(obj).find(captura).obj) ) cobj = obj;
}
cobj.style.cursor = (zona && zona.cursor)? zona.cursor : "move";
if(uniDir){
uniDir = upper(uniDir);
cobj.style.cursor = (uniDir=="V")? "n-resize" : "w-resize";
}
if(pRelative){
S(obj).attr({
dir: p.dir||"",
offsetX: p.offsetX||0,
offsetY: p.offsetY||0,
min: p.min||0,
max: p.max||100,
step: p.step||1,
input: p.input||null,
datatype: p.datatype||"",
decimals: p.decimals||0
});
if(p.set){
obj["set"] = p.set;
S(obj).attr({
min: 0,
max: p.set.length-1,
step: 1
});
p.min = 0;
p.max = p.set.length-1;
p.step = 1;
var o = obj.parentNode,
color = S(o).css("border-color"),
boton = obj,
rango = boton["max"],
id = o.id,
ancho, ox, oy, gra;
if(id=="") o.id = id = S.date("u");
if(S(boton).attr("dir")=="H"){
ancho = (o.offsetWidth-boton.offsetWidth)/rango,
gra = 90;
ox = boton.offsetWidth/2;
oy = 0;
}else{
ancho = (o.offsetHeight-boton.offsetHeight)/rango,
gra = 0;
ox = 0;
oy = boton.offsetHeight/2;
}
S(win).rule("+#"+id+"{background:repeating-linear-gradient("+gra+"deg, rgba(0,0,0,0) 1px, rgba(0,0,0,0) "+ancho+"px, "+color+" "+ancho+"px, "+color+" "+(ancho+1)+"px); background-position:"+ox+"px "+oy+"px;}");
}
if(p.move) obj["move"] = p.move;
if(p.input) S(p.input,win).obj["eSlider"] = obj;
if(p.value!=undefined && p.input!=undefined){
S.sliderPut(win, p.input, p.value);
}
}
S(cobj, win).on("mousedown", function(eve){
var s = S.scrollGet(win.document.body),
scrollLeft = s["scrollLeft"]+p.addLeft,
scrollTop = s["scrollTop"]+p.addTop;
if( S.toTag(S.eventObj(eve), "SPAN", "class=WINDOW")!=null && eve.ctrlKey ){
S(S.toTag(S.eventObj(eve), "SPAN", "class=WINDOW")).hidden();
setTimeout(function(){
S(S.toTag(S.eventObj(eve), "SPAN", "class=WINDOW")).visible();
}, 3000);
return;
}
if( p.functionClick ) p.functionClick("D");
if( obj["eDesParent"] ){
cor = S.xy(obj["eDesParent"], win);
cor.x = S(obj["eDesParent"], win).css("left");
cor.y = S(obj["eDesParent"], win).css("top");
obj["eDesX"] = cor.x-scrollLeft;
obj["eDesY"] = cor.y-scrollTop;
}
var menos = (S(obj).css("position")!="fixed") ? [0, 0] : [scrollLeft, scrollTop];
if( obj.getAttribute("masX")!=null ){
menos = [obj.getAttribute("masX")*1, obj.getAttribute("masY")*1];
}
cor = S.screen(win);
S(obj).attr({
x1: cor.x-menos[0],
y1: cor.y-menos[1],
x2: cor.sw,
y2: cor.sh,
w: obj.offsetWidth+sombra,
h: obj.offsetHeight+sombra
});
var index = getStyle(obj, "zIndex")*1, xDesc, yDesc;
if( p.zIndex ){
}else if( obj.tagName=="SPAN" ){
S.windowFocus(obj);
}else if( index!=S.session.index+1 ){
S.session.index += 2;
obj.style.zIndex = S.session.index+1;
if( obj["eDesParent"] ) obj["eDesParent"].style.zIndex = S.session.index;
}
if( (conzona && zona && zona.x!=undefined) || type(zona)=="string"){
cor = conzona ? zona : S.xy(zona,win);
if(pRelative){
var dx = eve.offsetX || eve.pageX,
dy = eve.offsetY || eve.pagey;
S(obj).attr({
x1: 0,
y1: 0,
x2: cor.w-2,
y2: cor.h-2,
w: obj.offsetWidth,
h: obj.offsetHeight
});
if(uniDir=="H"){
xDesc = cor.x;
yDesc = -(obj.offsetHeight/2)-(cor.h/2)+1;
S(obj).attr({y1:-obj.offsetHeight/2+1});
}else if(uniDir=="V"){
xDesc = -(obj.offsetWidth/2)-(cor.w/2)+1;
yDesc = cor.y;
S(obj).attr({x1:-obj.offsetWidth/2+1});
}else{
xDesc = cor.x-obj.offsetWidth/2;
yDesc = cor.y;
}
xDesc = xDesc*1+dx-scrollLeft;
yDesc = yDesc*1+dy-scrollTop;
}else{
S(obj).attr({
x1: cor.x-menos[0],
y1: cor.y-menos[1],
x2: cor.x+cor.w,
y2: cor.y+cor.h
});
}
}
S(obj,win).on("selectstart",function(){
return S.eventClear(win);
});
var zIndex = getStyle(obj, "zIndex")*1+10,
xy = S.xy(obj,win),
cor = S.screen(win),
o = S.eventObj(eve);
if( /^(IMG|SVG)$/i.test(o.tagName) ) o = o.parentElement;
if(pRelative){
obj["vX"] = dx;
obj["vY"] = dy;
}else{
obj["vX"] = eve.offsetX || eve.pageX;
obj["vY"] = eve.offsetY || eve.pageY;
}
while( o!=obj ){
obj["vX"] += o.offsetLeft;
obj["vY"] += o.offsetTop;
o = o.offsetParent;
}
if(pRelative){
obj["vX"] = xDesc;
obj["vY"] = yDesc;
}
if(p.down) p.down();
S("<span id='eDesTAPAMOVE' onselectstart='return S.eventClear(window)' style='background-color:transparent;position:absolute;left:0px;top:0px;z-index:"+zIndex+";width:"+cor.sw+"px;height:"+cor.sh+"px;'></span>", win)
.nodeEnd()
.on("mousemove", function(eve){
var	x1 = obj["x1"],
y1 = obj["y1"],
x2 = obj["x2"],
y2 = obj["y2"],
vX = obj["vX"],
vY = obj["vY"],
w = obj["w"],
h = obj["h"];
x = eve.clientX-vX-1+x1,
y = eve.clientY-vY-1+y1;
if( (x+w)>x2 ) x = x2-w;
if( (y+h)>y2 ) y = y2-h;
if( p.linkMin ){
var xLinkMin = S(p.linkMin, win).css("left");
if( x<xLinkMin ) x=xLinkMin;
}
if( p.linkMax ){
var xlinkMax = S(p.linkMax, win).css("left");
if( x>xlinkMax ) x=xlinkMax;
}
if( x<x1 ) x = x1;
if( y<y1 ) y = y1;
if( obj.parentNode.className!="WINDOW" ){
S(obj).css({left:x+(p.offsetX||0), top:y+(p.offsetY||0)});
if(p.function) p.function(x+(p.offsetX||0), y+(p.offsetY||0));
}
if( obj["eDesParent"] ){
S(obj["eDesParent"]).windowResize(x-obj["eDesX"]-x1, y-obj["eDesY"]-y1, 0, 0);
}
if(p.move){
var vx = x+menos[0],
vy = y+menos[0];
if(p.max!=undefined && p.min!=undefined){
if(p.step==undefined) p.step = 1;
vx = Math.round(((p.max-p.min)*x)/(x2-w)/p.step)*p.step;
vy = Math.round(((p.max-p.min)*y)/(y2-h)/p.step)*p.step;
if(uniDir=="H") vy=0;
else if(uniDir=="V") vx=0;
}
obj["vx"] = vx;
obj["vy"] = vy;
p.move(vx, vy);
if(p.input) getValor(win, obj, p);
}
return false;
})
.on("mouseup", function(){
if( p.functionClick ) p.functionClick("U");
if(obj["set"]){
var ancho = obj.parentNode.offsetWidth-obj.offsetWidth-2,
rango = obj["max"],
desfase=0, x;
if( obj.parentNode.children.length==2 && obj.parentNode.children[1]==obj ){
desfase = obj.offsetWidth;
}
x = ((ancho*(obj["vx"]*1))/rango)-desfase;
obj["vx"] = obj["set"][obj["vx"]];
}
obj.style.left = (x+(p.offsetX||0))+"px";
if(p.input){
getValor(win, obj, p);
}
S("#eDesTAPAMOVE",win).nodeRemove();
if(p.up) p.up();
});
function getValor(win, obj, p){
var input = S(p.input,win).obj, d;
if( /^(?:\+|\-|\+\,|\-\,)$/i.test(p.datatype) ){
d = S.thousands(obj["vx"]+p.min, p.decimals);
}else if(obj["set"]){
if( type(obj["vx"])=="number" ){
d = obj["set"][obj["vx"]];
}else{
d = obj["vx"];
}
}
if(input.tagName=="INPUT"){
S(input).val(d);
}else{
S(input).text(d);
}
return d;
}
});
if(pRelative && p.linkMin==undefined && p.linkMax==undefined){
S(cobj.parentNode,win).on("click", function(){
S.sliderPut(win);
});
}
return this;
}
S.sliderPut = function(win, campo, valor){
var obj, x=y=0;
if(campo && type(campo)=="string" ){
if( /^(?:\.|\:|\#)$/i.test(campo[0]) ){
obj = S(campo,win).obj["eSlider"];
}else{
obj = S(":"+campo,win).obj["eSlider"];
}
}else{
campo = null;
obj = S.event(win).children[0];
var xy = S.offset(win);
x = xy[0]-obj.offsetWidth/2;
y = xy[1]-obj.offsetHeight/2;
}
var p = S(obj).attr("dir,offsetX,offsetY,min,max,step,move,input,datatype,decimals"),
ancho = obj.parentNode.offsetWidth-obj.offsetWidth-2,
alto = obj.parentNode.offsetHeight-obj.offsetHeight-2,
vx,vy, sx,sy, d, rango;
p.min*=1;
p.max*=1;
rango = p.max-p.min;
if(campo){
if(valor<p.min) valor = p.min;
if(valor>p.max) valor = p.max;
if(p.dir=="H") vx = valor;
if(p.dir=="V") vy = valor;
}else{
p.step*=1;
vx = sx = (rango*x)/ancho;
vx = Math.round(vx/p.step)*p.step;
vy = sy = (rango*y)/alto;
vy = Math.round(vy/p.step)*p.step;
}
if(obj["set"]){
x = (ancho*vx)/rango;
y = (alto*vy)/rango;
}else{
x = ((valor-p.min)*ancho)/rango;
y = ((valor-p.min)*alto)/rango;
}
if(p.dir=="" || p.dir=="H") obj.style.left = (x+p["offsetX"]*1)+"px";
if(p.dir=="" || p.dir=="V") obj.style.top = (y+p["offsetY"]*1)+"px";
if(p.input){
var input = S(p.input, win).obj;
if( /^(?:\+|\-|\+\,|\-\,)$/i.test(p.datatype) ){
d = S.thousands(vx, p.decimals);
}else if(obj["set"]){
d = obj["set"][vx];
}
if(input.tagName=="INPUT"){
S(input).val(d);
}else{
S(input).text(d);
}
}
if(obj["move"]) obj["move"]((p.dir=="H")?0:vx, (p.dir=="V")?0:vy);
}
S.fn.sort = function(col, type, ad, add, salir){
var win = this.win,
tabla = this.obj,
esBrowse = (tabla.id=="BROWSE"), tablaTH, tablaTV, tablaTE, cDes,
r = tabla.getElementsByTagName("tbody").item(0).rows,
t = r.length,
oTHEAD = tabla.children[1].tagName=="THEAD" ? tabla.children[1] : tabla,
campo = S("TH[nc='"+col+"']",oTHEAD).attr("campo"),
ocampo = S("TH[nc='"+col+"']",oTHEAD).attr("ocampo"), xocampo="",
asc = (!ad || ad[0].toUpperCase()=="A"),
n, dim=[], v,y,m,d,hh,ii,ss,miles,decimal,alias="";
if( t==0 ) return;
col *= 1;
if( tabla.onclick && S.is("on opISubList(", tabla.onclick.toString()) ){
for(n=t-1; n>=0; n--){
if( r[n].getAttribute("libre")==null ){
t = n+1;
break;
}
}
}
if( esBrowse && S("#TablaTH", win).length ){
tablaTV = S("#TablaTV", win).obj.children[0];
tablaTH = S("#TablaTH", win).obj.children[0];
tablaTE = S("#TablaTE", win).obj.children[0];
cDes = win._cDeslizante;
if( S(tabla).attr("eMark")!=null ){
S("TR[eMark]", tabla).each(function(k,o){
o.removeAttribute("eMark");
});
S("TR[eMark]", tablaTV).each(function(k,o){
o.removeAttribute("eMark");
});
}
}
type = type.toUpperCase();
if( type=="D" ){
y = S.setup.date.indexOf("y");
m = S.setup.date.indexOf("m");
d = S.setup.date.indexOf("d");
}else if( type=="P" ){
y = S.setup.month.indexOf("y");
m = S.setup.month.indexOf("m");
}else if( type=="CDI" ){
y = S.setup.datetime.indexOf("y");
m = S.setup.datetime.indexOf("m");
d = S.setup.datetime.indexOf("d");
hh = S.setup.datetime.indexOf("h");
ii = S.setup.datetime.indexOf("i");
ss = S.setup.datetime.indexOf("s");
}else if( type=="N" ){
miles = new RegExp("\\"+S.setup.thousands,"g");
decimal = new RegExp("\\"+S.setup.decimal,"g");
}
if( add ){
var th=S("TH",this.obj).dim,
ya=[], deco, old="#",last,i,tya, desde=0;
for(n=0; n<th.length; n++){
if( S(th[n]).attr("nc")==col ) continue;
deco = S(th[n]).css("text-decoration");
if( !/none/.test(deco) ){
ya.push(S(th[n]).attr("nc"));
}
}
if( !salir ){
tya = ya.length;
for(n=0; n<t; n++){
old = "";
for(i=0; i<tya; i++){
old += r[n].cells[ya[i]].textContent;
}
if( n==0 ){
last = old;
}else if( last!=old ){
if( desde+1!=n ) ordenar(desde, n);
last = old;
desde = n;
}
}
if( desde+1!=n ){
ordenar(desde, t);
}
}
S("TH[nc='"+col+"']",tabla.children[1]).css("textDecoration", asc ? "underline":"overline");
if( campo!=null ){
old = S(tabla).attr("eOrder");
if( campo[0]=="*" ){
i = (old+",").indexOf(S.mid(campo,1,0)+",");
if( i>-1 ){
alias = S.mid(old,i-2,2)+S.mid(campo,1,0);
}
}else{
i = (old+",").indexOf("."+campo+",");
if( i>-1 ){
alias = S.mid(old,i-1,2)+campo;
}
}
if( old=="" ){
old = (col+1)+(asc ? "":" desc");
}else if( ((","+old+",").indexOf(","+campo+",")>-1 || (","+old+",").indexOf(","+campo+" desc,")>-1)
||
((","+old+",").indexOf(","+alias+",")>-1 || (","+old+",").indexOf(","+alias+" desc,")>-1)
||
((","+old+",").indexOf(","+(col+1)+",")>-1 || (","+old+",").indexOf(","+(col+1)+" desc,")>-1)
){
old = ","+old+",";
if( asc ){
old = S.replace(old,
","+campo+" desc,", ","+campo+",",
","+alias+" desc,", ","+alias+",",
","+(col+1)+" desc,", ","+(col+1)+","
);
}else{
old = S.replace(old,
","+campo+",", ","+campo+" desc,",
","+alias+",", ","+alias+" desc,",
","+(col+1)+",", ","+(col+1)+" desc,"
);
}
old = S.mid(old,1,-1);
}else{
old += ","+(col+1)+(asc ? "":" desc");
}
S(tabla).attr("eOrder", old);
}
}else{
S("TH",tabla.children[1]).css("textDecoration","");
S("TH[nc='"+col+"']",tabla.children[1]).css("textDecoration", asc ? "underline":"overline");
if( campo!=null ){
S(tabla).attr("eOrder", (col+1)+(asc ? "":" desc"));
}
if( !salir ) ordenar(0, t);
}
if( esBrowse ){
S("TH[nc]", tabla.children[1]).each(function(k,o){
n = S(o).css("textDecoration");
if( tablaTH ) tablaTH.rows[o.parentNode.rowIndex].cells[o.cellIndex].style.textDecoration = n;
if( tablaTE ) tablaTE.rows[o.parentNode.rowIndex].cells[o.cellIndex].style.textDecoration = n;
});
if( tablaTV ){
r = tabla.getElementsByTagName("tbody").item(0).rows;
for(n=0; n<t; n++){
for(i=0; i<cDes; i++){
tablaTV.rows[n].cells[i].innerHTML = r[n].cells[i].innerHTML;
}
}
}
S(win).menuRow("#BROWSE", S("#BROWSE",win).obj["eMenu"], S("#BROWSE",win).obj["func"]);
}
if( typeof win._ChartDynamic!='undefined' && win._ChartDynamic ){
S.chartRedraw(win);
}
function ordenar(desde, hasta){
var dim=[], padre, n,t,i;
for(n=desde; n<hasta; n++){
if( type=="s" ) v = r[n].cells[col].innerHTML;
else if( type=="S" ) v = r[n].cells[col].innerHTML.toUpperCase();
else if( type=="N" ) v = r[n].cells[col].textContent.replace(miles,"").replace(decimal,".")*1;
else if( type=="D" ){
v = S.dataFormat(r[n].cells[col].textContent, "F4", "d");
}else if( type=="P" ){
v = S.dataFormat(r[n].cells[col].textContent, "P4", "d");
}else if( type=="CDI" ){
v = S.dataFormat(r[n].cells[col].textContent, "CDI", "d");
}else if( type=="I" ) v = r[n].cells[col].innerHTML;
else v = r[n].cells[col].textContent;
dim.push([v, r[n].cloneNode(true)]);
}
if( asc ){
dim.sort(function(a,b){ return(a[0]>b[0]) ? 1 : -1; });
}else{
dim.sort(function(a,b){ return(a[0]>b[0]) ? -1 : 1; });
}
t = dim.length;
padre = r[0].parentNode;
for(n=0; n<t; n++){
padre.replaceChild(dim[n][1], r[n+desde]);
}
}
}
S.sort = function(table, col, order){
if( arguments.length==1 ){
var doc = table.ownerDocument,
win = (doc.defaultView || doc.parentWindow),
th = S.event(win,"TH"),
tr, c, ord, col=-1;
if( th ){
tr = th.parentNode;
for(c=0; c<=th.cellIndex; c++){
col += (tr.cells[c].getAttribute("colspan")||1)*1;
}
if( col>-1 ){
ord = S(th).css("textDecoration").split(" ")[0];
S(table.getElementsByTagName("thead").item(0).getElementsByTagName("TH"),win).css("textDecoration:");
ord = {none:"A", overline:"A", underline:"D"}[ord];
S(th).css("textDecoration",{A:"underline",D:"overline"}[ord]);
S(table).sort(col, th.getAttribute("ts")||"", ord);
}
}
}else{
var tb = table.tBodies[0],
tr = Array.prototype.slice.call(tb.rows, 0),
t = tr.length, i;
order = (typeof(order)=="undefined" || !order)?1:-1;
tr = tr.sort(function(a, b){
if( b.cells[col].tagName=="TH" ) return 0;
return order * (
((a.cells[col].colSpan==1)? a.cells[col].textContent.trim().localeCompare(b.cells[col].textContent.trim()) : 0)
);
});
for(i=0; i<t; ++i) tb.appendChild(tr[i]);
}
}
Funciones_VARIAS: {
S.sound = function(){
try{
S("#SOUNDNOTIFICATION").obj.play();
}catch(e){}
}
S.notification = function(title, body, ev){
if( !S.session.notification ) return;
var notificar = new Notification(
title, {
body: body,
dir: 'auto',
lang: 'ES',
tag: S.date("u"),
icon: 'g/logo.png',
});
if(!ev) ev={};
if( ev.onclick ) notificar.onclick = ev.onclick;
if( ev.onerror ) notificar.onerror = ev.onerror;
if( ev.onshow ) notificar.onshow = ev.onshow;
if( ev.onclose ) notificar.onclose = ev.onclose;
}
S.screen = function(win){
var o,x,y,cw,ch,sh,sw;
if( type(win)=="window" ){
o = win.document.body;
x = Math.max(o.scrollLeft, win.document.documentElement.scrollLeft);
y = Math.max(o.scrollTop, win.document.documentElement.scrollTop);
sw = Math.max(o.scrollWidth, win.document.documentElement.scrollWidth);
sh = Math.max(o.scrollHeight, win.document.documentElement.scrollHeight);
if( typeof window.innerWidth!='undefined' ){
cw = win.innerWidth;
ch = win.innerHeight;
}else if( typeof document.documentElement!='undefined' && typeof document.documentElement.clientWidth!='undefined' && document.documentElement.clientWidth!=0 ){
cw = win.document.documentElement.clientWidth;
ch = win.document.documentElement.clientHeight;
}else{
cw = win.document.getElementsByTagName('body')[0].clientWidth;
ch = win.document.getElementsByTagName('body')[0].clientHeight;
}
}else{
o = win;
win = S.windowObject(o);
x = o.scrollLeft;
y = o.scrollTop;
cw = o.clientWidth;
ch = o.clientHeight;
}
return {
x:x,
y:y,
w:cw,
cw:cw,
ow:o.offsetWidth,
sw:sw,
h:ch,
ch:ch,
oh:Math.min(o.offsetHeight,win.document.children[0].getBoundingClientRect().height),
sh:sh,
sb:S.setup.scrollWidth
};
}
S.xyTop = function(obj){
var dim = S.xy(obj),
dim2 = S.xy(objWindow(obj).frameElement);
dim[0] += dim2[0];
dim[1] += dim2[1];
dim["x"] += dim2["x"];
dim["y"] += dim2["y"];
return dim;
}
S.xy = function(obj, xObj){
var win = this.win;
if( xObj ){
win = obj;
obj = xObj;
}
if( arguments.length==2 ) win = arguments[1];
if( obj!=undefined && type(obj)!="html" ){
obj = S(obj,win).obj;
}
try{
var box = obj.getBoundingClientRect(),
doc = obj.ownerDocument,
sx = Math.max(doc.body.scrollLeft, doc.documentElement.scrollLeft),
sy = Math.max(doc.body.scrollTop, doc.documentElement.scrollTop);
return {
x:box.left+sx, y:box.top+sy, w:box.width, h:box.height, r:box.right, t:box.top, ot:obj.offsetTop, ol:obj.offsetLeft,
0:box.left+sx, 1:box.top+sy, 2:box.width, 3:box.height, 4:box.right, 5:box.top
};
}catch(e){
return {
x:0, y:0, w:0, h:0, r:0, t:0, ot:obj.offsetTop, ol:obj.offsetLeft,
0:0, 1:0, 2:0, 3:0, 4:0, 5:0
};
}
}
var screen = S.screen,
xy = S.xy;
S.fn.xy = function(obj){
return xy(this.obj);
}
S.fn.around = function(tip, p){
function estaDentro(s, b, t, tipo){
if( b.x>=s.x && (b.x+b.w)<=(s.x+s.cw) && b.y>=s.y && (b.y+b.h)<=s.sh ){
return[true,b.x,b.y,t];
}
return[false,0,0,""];
}
if(!p) p={};
var el = this.obj,
win = this.win,
index = getStyle(el, "zIndex")*1,
masW = masH = 0,
x, y, cp, ch, cs;
tip = S(tip,win).obj;
if( index<(tip.style.zIndex*1) ) index = tip.style.zIndex;
p["display"] = (p["display"]==undefined) ? "block" : p["display"];
p["show"] = (p["show"]==undefined) ? true : p["show"];
p["margin"] = p["margin"] || 0;
S(tip, win).css({
left: 0,
top: 0,
position: "absolute",
zIndex: (index=="auto")? 2 : index+2
});
var display = getStyle(tip, "display"),
visibility = getStyle(tip, "visibility");
if( display=="none" ) tip.style.display = p["display"];
else if( visibility=="hidden" ) tip.style.visibility = "visible";
cp = S.xy(el);
ch = S.xy(tip);
cs = S.screen(win);
if( el.style.display=="none" ){
p["type"] = "13";
cp = S.xy("BODY");
cs = S.screen(top);
}else if( S.objWindow(el)!=S.objWindow(tip) ){
var winp = S.xy(S.objWindow(el).frameElement);
cp.x += winp.x;
cp.y += winp.y;
cs = S.screen(top);
}
if( p["margin-right"] ) ch.w += p["margin-right"];
if( p["point"] ){
cp.x = win.event.clientX+cs.x;
cp.y = win.event.clientY+cs.y;
cp.w = 1;
cp.h = 1;
}
if( !(cs.w>=ch.w && cs.h>=ch.h) ){
return {x:cs.x, y:cs.y, type:"notfit", fit:false, cs:cs, cp:cp, ch:ch};
}
if( p["hide"] ){
masW = cp.w;
masH = cp.h;
}
var OL = cp.x-ch.w-p["margin"],
L  = cp.x,
C  = cp.x+(cp.w/2)-(ch.w/2),
R  = cp.x+cp.w-ch.w,
OR = cp.x+cp.w+p["margin"],
OT = cp.y-ch.h-p["margin"],
T  = cp.y,
M  = cp.y+(cp.h/2)-(ch.h/2),
B  = cp.y+cp.h-ch.h,
OB = cp.y+cp.h+p["margin"],
SC = (cs.ow/2)-(ch.w/2)+cs.x,
SM = (cs.oh/2)-(ch.h/2)+cs.y,
SCP = (cs.w/2)-(ch.w/2)+cs.x,
SMP = (cs.h/2)-(ch.h/2)+cs.y;
var dim = (((p["type"]||S.setup.positionPriority+""))+"").split(","), ok, n;
if( el.tagName=="BODY" ) dim = ["14"];
for(n=0; n<dim.length; n++){
switch( dim[n] ){
case "7" : ok = estaDentro(cs, {x:L , y:OB-masH, w:ch.w, h:ch.h}, "BL"); break;
case "6" : ok = estaDentro(cs, {x:C , y:OB-masH, w:ch.w, h:ch.h}, "BC", "H"); break;
case "5" : ok = estaDentro(cs, {x:R , y:OB-masH, w:ch.w, h:ch.h}, "BR"); break;
case "11": ok = estaDentro(cs, {x:L , y:OT+masH, w:ch.w, h:ch.h}, "TL"); break;
case "12": ok = estaDentro(cs, {x:C , y:OT+masH, w:ch.w, h:ch.h}, "TC", "H"); break;
case "1" : ok = estaDentro(cs, {x:R , y:OT+masH, w:ch.w, h:ch.h}, "TR"); break;
case "10": ok = estaDentro(cs, {x:OL+masW, y:T , w:ch.w, h:ch.h}, "LT"); break;
case "2" : ok = estaDentro(cs, {x:OR-masW, y:T , w:ch.w, h:ch.h}, "RT"); break;
case "9" : ok = estaDentro(cs, {x:OL+masW, y:M , w:ch.w, h:ch.h}, "LM", "V"); break;
case "13": ok =	estaDentro(cs, {x:C		 , y:M , w:ch.w, h:ch.h}, "C", "HV"); break;
case "3" : ok = estaDentro(cs, {x:OR-masW, y:M , w:ch.w, h:ch.h}, "RM", "V"); break;
case "8" : ok = estaDentro(cs, {x:OL+masW, y:B , w:ch.w, h:ch.h}, "LB"); break;
case "4" : ok = estaDentro(cs, {x:OR-masW, y:B , w:ch.w, h:ch.h}, "RB"); break;
case "14": ok = estaDentro(cs, {x:SCP, y:SMP, w:ch.w, h:ch.h}, "CM"); break;
case "15": ok = estaDentro(cs, {x:OL+masW, y:SM , w:ch.w, h:ch.h}, "LM", "V"); break;
case "16": ok = estaDentro(cs, {x:OR-masW, y:SM , w:ch.w, h:ch.h}, "RM", "V"); break;
case "17": ok = estaDentro(cs, {x:L+cp.w, y:0 , w:ch.w, h:ch.h}, "LM", "V"); break;
case "18" : ok = estaDentro(cs, {x:R , y:SM, w:ch.w, h:ch.h}, "OR-"); break;
case "-1": ok = [true, win.event.layerX-(ch.w/2), win.event.layerY-(ch.h/2), "RC"]; break;
}
if( ok[0] ){
if( ok[3]=="BR" && p.moveLeft ){
if( (ok[1]+ch.w)>(cs.x+cs.w) ){
ok[1] -= (ok[1]+ch.w)-(cs.x+cs.w)+cs.sb;
}
}
break;
}
}
if( !ok[0] ) return {x:cs.x, y:cs.y, type:"C", fit:true, cs:cs, cp:cp, ch:ch, w:cp.w, h:cp.h};
x = ok[1];
y = ok[2];
S(tip,win).css({
left: x,
top: y,
xOffset: x-cs.x,
yOffset: y-cs.y
});
if( !p["show"] ){
if( display=="block" ) tip.style.display = "none";
else if( visibility=="visible" ) tip.style.visibility = "hidden";
}
return {x:x, y:y, type:ok[3], fit:true, cs:cs, cp:cp, ch:ch};
}
S.windowObject = function(obj){
return objWindow(obj);
}
S.iframe = function(w, id){
var o = w.document.getElementById(id);
if( o==undefined ) o = w.document.getElementsByName(id)[0];
return S.iframeToWindow(o);
}
S.iframeToWindow = function(o){
return o.contentWindow || o.contentDocument.parentWindow;
}
S.windowSize = function(win){
var w=0, h=0;
if(typeof( window.innerWidth )=='number'){
w = win.innerWidth;
h = win.innerHeight;
}else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)){
w = win.document.documentElement.clientWidth;
h = win.document.documentElement.clientHeight;
}else if(document.body && (document.body.clientWidth || document.body.clientHeight)){
w = win.document.body.clientWidth;
h = win.document.body.clientHeight;
}
return{width:w, height:h};
}
S.script = function(win, dim, func){
if( type(dim)=="string" ) dim = [dim];
var i, n, o, aScript, url,
t = dim.length;
for(i=0; i<t; i++){
url = dim[i];
if( S.left(url,1)=="$" ) url = "edes.php?R:"+url;
aScript = win.document.getElementsByTagName("script");
for(n=0; n<aScript.length; n++){
if( aScript[n].src!="" && (aScript[n].src==url || aScript[n].src==S.setup.srv+url) ){
return;
}
}
o = win.document.createElement("script");
o.type = "text\/javascript";
o.charset = "ISO-8859-1";
o.async = false;
o.src = url;
o.onerror = loadError;
if( func!=undefined && i==(t-1) ) o.onload = win[func];
win.document.getElementsByTagName("head")[0].appendChild(o);
}
function loadError( oError ){
var error = 'Error al cargar el script '+oError.target.src;
throw new error;
}
}
S.scriptCopy = function(win, id){
var o = win.document.createElement("script");
o.charset = "ISO-8859-1";
o.text = document.getElementById(id || "eDesCore").text;
win.document.getElementsByTagName("head")[0].appendChild(o);
}
S.wOpener = function(){
return S.session.wOpener;
}
S.progressUpload = function(pct, txt){
if( !pct ){
if( S("#PROGRESSCIRCLE",top).exists() ){
S("#PROGRESSCIRCLE",top).none();
}
if( S(".PROGRESSUPLOAD",top).exists() ){
S(".PROGRESSUPLOAD",top).none();
}
}else if( pct && S(".PROGRESSUPLOAD").exists() ){
var a = S("#PROGRESSNUMBER").css("width");
S("#PROGRESSNUMBER").css("width:");
S("#PROGRESSVALUE").css("width:1");
S("#PROGRESSVALUE").css("width:"+((pct*a)/100));
S("#PROGRESSNUMBER").text(Math.ceil(pct)+"%");
S("#PROGRESFILE").text(txt||"");
S(".PROGRESSUPLOAD").block("grid")
}
}
S.progressText = function(txt){
S.display(S(".PROGRESSUPLOAD"), txt);
S("#PROGRESSVALUE").css("width:0");
S("#PROGRESSNUMBER").text(txt);
}
S.access = function(win, desde){
++S.session.access;
if( win!=null && win.frameElement ){
var actAccess = win.frameElement.getAttribute("eAccess")||"",
newAccess = S.session.access,
oldAccess = (actAccess=="")? "0" : actAccess.split("/")[0];
if( desde && desde=="WDESKTOP" ) oldAccess = "0";
win.frameElement.setAttribute("eAccess", newAccess+"/"+oldAccess);
}
}
S.accessAction = function(win, frm){
S.access(win);
var access = win.frameElement.getAttribute("eAccess");
if( !/_ACCESS=/.test(frm.action) ){
frm.action += "&_ACCESS="+access;
}else{
dim = S.url(winDestino);
frm.action = S.replace(frm.action, "_ACCESS="+dim["_ACCESS"], "_ACCESS="+access);
}
}
S.accessHref = function(win, href){
S.access(win);
var access = win.frameElement.getAttribute("eAccess");
if( !/_ACCESS=/.test(href) ){
href += "&_ACCESS="+access;
}else{
var x = S.mid(href+"&", "&_ACCESS=", "&");
href = S.replace(href, "&_ACCESS="+x, "&_ACCESS="+access);
}
return href
}
S.urlAdd = function(url, win, origen, winDestino){
if( url.indexOf('edes.php')>-1 ){
var pre = (url.indexOf('?')==-1) ? '?':'&';
if( !/_CONTEXT=/.test(url) ) url += pre+"_CONTEXT="+((win==undefined)? top._CONTEXT:win._CONTEXT);
if( !/_PSOURCE=/.test(url) ) url += "&_PSOURCE="+((win==undefined || win==top)? origen:win._Source);
if( winDestino!=null && winDestino.frameElement ){
if( winDestino.name=="TLF" && win.frameElement ){
if( !/_ACCESS=/.test(url) ){
url += "&_ACCESS="+win.frameElement.getAttribute("eAccess");
}else{
dim = S.url(win);
url = S.replace(url, "_ACCESS="+dim["_ACCESS"], "_ACCESS="+win.frameElement.getAttribute("eAccess"));
}
}else{
S.access(winDestino, origen);
var access = winDestino.frameElement.getAttribute("eAccess");
if( !/_ACCESS=/.test(url) ){
url += "&_ACCESS="+access;
}else{
dim = S.url(winDestino);
url = S.replace(url, "_ACCESS="+dim["_ACCESS"], "_ACCESS="+access);
}
}
}
if( !/_CACHE_=/.test(url) ) url += "&_CACHE_="+(new Date()*1);
}
return url;
}
S.theSessionHasExpired = function(){
S.alert({
title:151,
icon:'<img src="g/sys_exit.gif">',
button:"A",
text:S.lng(266),
function: function(){
top.document.write(S.lng(267));
}
});
return;
}
S.call = function(url, datos, p){
var xhr = new XMLHttpRequest(),n;
if(!p) p = {};
if( url.indexOf(".")==-1 ) url += ".php";
if( mid(url,2)=="E:" ) url = "edes.php?"+url;
if( !(url=="edes.php?cluster" && p["pct"]) ){
url = S.urlAdd(url, p["window"], "MAIN", null);
}
if( p["asynchronous"]==undefined ) p["asynchronous"]=false;
if( datos ){
if( p["asynchronous"] ){
xhr.open("POST", url, true);
}else{
xhr.open("POST", url);
}
if( p["ansi"] ) xhr.setRequestHeader("Content-type", "text/html; charset=ISO-8859-1");
if( p["json"] ) xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
var data = new FormData(), v;
if( p["json"] ){
data = JSON.stringify(datos);
}else{
for(v in datos) data.append(v, datos[v]);
}
}else{
if( p["asynchronous"] ){
xhr.open("GET", url, true);
}else{
xhr.open("GET", url);
}
if( p["header"] ){
for(n=0; n<p["header"].length; n++){
xhr.setRequestHeader(p["header"][n][0], p["header"][n][1]);
}
}
}
xhr.timeout = 15000;
S.session.call++;
S.session.activeCalls++;
S.session.lastCall = url;
if(S.session.logCallSrv || S.session.logCallAnswer) _viewLog();
if(S.session.logCallSrv) console.log("  +< "+S.session.activeCalls+" > "+unescape(url));
if( url=="edes.php?cluster" && p["pct"] ){
S.progressUpload(p["pct"]);
}
if( p["window"] ) S.session.wOpener = p["window"];
xhr.onload = function(){
S.session.activeCalls--;
if(S.session.logCallSrv || S.session.logCallAnswer) _viewLog();
if(S.session.logCallSrv)console.log( "  -< "+S.session.activeCalls+" > "+unescape(url));
if(S.session.logCallAnswer)console.log("onload");
if( xhr.status===200 ){
if(S.session.logCallAnswer)console.log(xhr.responseText);
else if(S.session.logCallSrv)console.log( "  <<<<  "+xhr.responseText.length);
var res = S.trim(xhr.responseText);
if( S.is("top.S.theSessionHasExpired()", res) ){
top.S.theSessionHasExpired();
return;
}
if( p["eval"] ){
eval(res);
return;
}
if( p["return"] ){
p["return"](res, p["parameter"]);
return;
}
if( p["info"] ){
S.info(res, 3);
return;
}
if( p["function"] ){
if( p["json"] ){
p["function"](JSON.parse(res), p["parameter"]);
}else{
p["function"](res, p["parameter"]);
}
return;
}
if(res!="ok"){
if(p["window"]){
S.runHTML(p["window"], res);
}else if(p["run"]){
S.run(p["run"], res);
}else{
S.run(window, res);
}
}
if(p["function"]){
p["function"]();
}
if(p["info"]){
S.info(window, p["info"], p["seconds"]||3);
}
}else{
S.error(window, "<b>ERROR</b><br>"+xhr.status+"/"+xhr.statusText);
}
}
xhr.onerror = function(){
console.log("onerror");
if(S.session.logCallAnswer)console.log("onerror");
}
xhr.onabort = function(){
console.log("onabort");
if(S.session.logCallAnswer)console.log("onabort");
}
xhr.onprogress = function(event){
if(S.session.logCallAnswer)console.log(`onprogress ${event.loaded} of ${event.total}`);
}
xhr.ontimeout = function(){
console.error("timed out in "+url);
}
xhr.send(data);
}
S.callCreate = function(win){
var obj, iwin;
if( !win.document.body ) S(document.createElement("body"), win).nodeEnd(win.document.firstChild);
if( !S("#_ICALL",win).exists() ){
if(S.session.logCallSrv)console.log("Crea IFrame");
obj = S(S.createHTML('<SPAN id="_ICALL" style="'+(S.setup.debug?"":"display:none;")+'position:absolute;left:0px;top:0px;zIndex:1000;border:1px dotted #cc00cc;width:100%;height:33%;padding-bottom:4px;">'+'<IFRAME id="ICALL" name="TLF" eStatus=0 eAccess='+S.session.access+' eNORESIZE=true WOPENER=w frameBorder=1px style="width:100%;height:100%;background-color:#f2f2f2;"></IFRAME>'+'</SPAN>'))
.nodeEnd(win.document.body).obj.children[0];
iwin = S.iframeToWindow(obj);
iwin.frameElement.onload = function(){
if(S.session.logCallSrv){console.log("  load  "+this.contentWindow.location.search);console.log("");}
this.eStatus = this.eStatus-1;
if(S.session.logCallSrv || S.session.logCallAnswer) _viewLog();
}
}else{
obj = S("#_ICALL", win).obj.children[0];
iwin = S.iframeToWindow(obj);
}
S(obj).attr("WOPENER", win);
S("#_ICALL", win).attr("eWindow", obj);
return iwin;
}
S.objWindow = function(obj){
return objWindow(obj);
}
S.callSrvUrl = function(nmVar, val, win){
return "edes.php?E:CallSrv="+win._Source+"&"+nmVar+"="+val;
}
S.callSrv = function(url, win){
win = win || window;
try{
var saltar=false, frame=S.callCreate(win);
}catch(e){
try{
S("#_ICALL", win).nodeRemove();
frame = S.callCreate(win);
}catch(e){
return;
}
}
if( frame.frameElement["eStatus"]>0 ){
if( frame.frameElement.pURL && S.left(frame.frameElement.pURL,11)=="edes.php?D:" && (frame.frameElement.pDATE+5000)<S.date("u") ){
if(S.session.logCallSrv)console.log("  ^^^^  "+frame.frameElement.pURL);
saltar = true;
}
if( !saltar ){
if(S.session.logCallSrv)console.log("  ....  "+url);
setTimeout(function(){
S.callSrv(url, win);
}, 300);
return;
}
}
if( frame.frameElement.eStatus==undefined ){
frame.frameElement.eStatus = 1;
}else{
frame.frameElement.eStatus = frame.frameElement.eStatus+1;
}
var n = url.indexOf('=');
if( n>-1 && url.substr(0,n).indexOf('.')==-1 && url.substr(0,n).indexOf(':')==-1 ) url = 'edes.php?E:CallSrv='+win._Source+'&'+url;
if( url.indexOf('http:')==-1 && url.indexOf('https:')==-1 ){
if( url.indexOf('.')==-1 && url.indexOf(':')==-1 ){
if( url.indexOf('|')==-1 ) url = 'edes.php?E:CallSrv='+win._Source+'|'+url;
}else{
if( url.indexOf('.')==-1 ) url += '.php';
url = ((url.indexOf('edes.php?')!=-1)?'':'edes.php?E:')+url;
}
if( url.indexOf('E:CallSrv=')==-1 ){
if( url.indexOf('&_CALL=1')==-1 ) url += '&_CALL=1';
if( url.indexOf('&_SOURCE=')==-1 ) url += '&_SOURCE='+win._Source;
}
var tmp = url.split('?');
url = '';
for(n=0; n<tmp.length; n++){
url += (n==1)?'?':(n>1)?'&':'';
url += tmp[n];
}
}
if( /^edes.php\?D:/.test(url) ) top.eInfo(window, eLng(225), 5);
url = S.urlAdd(url, win, "MAIN", frame);
if( S.left(url,11)=="edes.php?D:" ){
}else{
if(S.session.logCallSrv || S.session.logCallAnswer) _viewLog();
}
if(S.session.logCallSrv)console.log("Ejecuta: "+url);
frame.frameElement.WOPENER = win;
frame.frameElement.pURL = url;
frame.frameElement.pDATE = S.date("u")*1;
frame.location.replace(url);
return frame;
}
S.fn.callSrvPost = function(url, Dim, winTo){
var win = this.win;
if( winTo==undefined ){
try{
var saltar=false, frame = S.callCreate(win);
}catch(e){
try{
S("#_ICALL", win).nodeRemove();
frame = S.callCreate(win);
}catch(e){
return;
}
}
}else{
var frame = winTo;
}
frame.frameElement.WOPENER = win;
var n = url.indexOf('=');
if( n>-1 && url.substr(0,n).indexOf('.')==-1 && url.substr(0,n).indexOf(':')==-1 ) url = 'edes.php?E:CallSrv='+win._Source+'&'+url;
url = S.urlAdd(url, win, "MAIN", frame);
var txt = '<!DOCTYPE HTML><HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></HEAD><BODY style="display:none">'+
'<FORM METHOD=POST action="'+url+'">', i;
for(i in Dim) txt += '<TEXTAREA TYPE="text" NAME="'+i+'">'+((typeof(Dim[i])=='number')? Dim[i] : Dim[i].replace(/"/g,'&quot;'))+'</TEXTAREA>';
txt += '</FORM></BODY></HTML>';
frame.document.write(txt);
frame.document.forms[0].submit();
}
S.submit = function(win, real){
win.document.forms[0].target = "TLF";
win._CountType = 1;
if( real==undefined ){
win.eOkTab();
}else{
win.document.FRM1.submit();
}
setTimeout(function(){
win.document.forms[0].target = "";
win._CountType = 0;
}, 1000);
}
S.sheet = function(win){
var style = win.document.createElement("style");
style.type = 'text/css';
style.appendChild(win.document.createTextNode(""));
win.document.head.appendChild(style);
return style.sheet;
}
S.sheetCopy = function(win, nm, add){
var nom = (nm)?(nm=="*")?"":nm : "",
copiar = new RegExp("^("+(nom ? nsp(nom).replace(/,/g,"|") : "" )+")$"),
sheet = S.sheet(win),
Estilo = document.styleSheets,r,t,i,reglas;
for(r=0; r<Estilo.length; r++) if( copiar.test(Estilo[r].href+"") || copiar.test(Estilo[r].title) ){
S(sheet.ownerNode).attr("name", S(Estilo[r].ownerNode).attr("name"));
sheet.name = S(Estilo[r].ownerNode).attr("name");
sheet.title = Estilo[r].title;
sheet.media = Estilo[r].media;
reglas = Estilo[r].rules;
if(!reglas) continue;
t = reglas.length;
for(i=0; i<t; i++){
sheet.insertRule(reglas[i].cssText, i);
}
}
if(add) sheet.insertRule(add, t);
}
S.sheetCopyOne = function(win, css, esto, por){
var head = win.document.getElementsByTagName("head")[0],
style = win.document.createElement('style'),
txt = localStorage.getItem("e-ccss/"+css+".css");
if( txt==null ) return;
txt = S.replace(txt, "{#}","{#1}", '&quot;','"', '&#39;',"'", '&#92;',"\\", '&#43;','+', "&#60;","<", "&#62;",">", "&#0A;",S.char(10), "&#0D;",S.char(13));
if( esto ) txt = S.replace(txt, esto, por);
style.type = 'text/css';
if( style.styleSheet ){
style.styleSheet.cssText = txt;
}else{
style.appendChild(win.document.createTextNode(txt));
}
style.setAttribute("name", css);
head.appendChild(style);
}
S.fn.rule = function(txt, nmStyle){
var win = this.win,
oStyle = win.document.getElementsByTagName("style"),
reglas = (type(txt)=="object" || type(txt)=="array") ? txt : [txt],
ct, regla, op, c, i, sheet=null;
for(c=0; c<oStyle.length; c++){
if( nmStyle==undefined || S(oStyle[c]).attr("name")==nmStyle ){
sheet = oStyle[c].sheet;
break;
}
}
if( sheet==null ) return;
ct = reglas.length;
for(c=0; c<ct; c++){
txt = reglas[c];
op = split(1,txt);
regla = op[1];
if( op[0]=="+" ){
sheet.insertRule(regla, sheet.cssRules.length);
}else if( op[0]=="-" ){
i = index(regla);
if( i>-1 ) delete_rule(i);
}else if( op[0]=="~" ){
i = index(regla, 1);
while( i>-1 ){
delete_rule(i);
i = index(regla, 1);
}
}else if( op[0]=="?" ){
i = index(regla);
if( i>-1 ) delete_rule(i);
else sheet.insertRule(regla, sheet.cssRules.length);
}else if( op[0]=="=" ){
i = index(regla);
if( i>-1 ) delete_rule(i);
sheet.insertRule(regla, sheet.cssRules.length);
}else{
sheet.insertRule(txt, sheet.cssRules.length);
}
}
function index(txt, igual){
var ti = sheet.cssRules.length, i, cText,
regla = trim(mid(txt,"{")),
lon = regla.length;
if( igual==undefined ){
regla = upper(nsp(regla));
for(i=0; i<ti; i++){
cText = upper(nsp(sheet.cssRules[i].selectorText));
if( cText==regla || (cText=="" && S.left(upper(nsp(sheet.cssRules[i].cssText)), lon)==regla) ){
return i;
}
}
}else{
regla = upper(nsp(txt));
for(i=0; i<ti; i++){
if( S.left(upper(nsp(sheet.cssRules[i].cssText)), lon)==regla ){
return i;
}
}
}
return -1;
}
function delete_rule(i){
sheet.removeRule ? sheet.removeRule(i) : sheet.deleteRule(i);
}
}
S.ruleGet = function(win, Clase, Regla, nmFile){
var oStyle = win.document.styleSheets, r, i, c, m, p, t, Dim=new Array(), xClase;
Clase = S.upper(Clase);
for(r=0; r<oStyle.length; r++){
if( oStyle[r].href==null || (oStyle[r].href!=null && nmFile!=undefined && S.is(nmFile, oStyle[r].href+"") )){
for(i=oStyle[r].rules.length-1; i>=0; i--){
if( oStyle[r].rules[i].type==5 ){
xClase = S.upper(S.trim(oStyle[r].rules[i].cssText.split("{")[0]));
}else{
xClase = S.upper(oStyle[r].rules[i].selectorText);
}
if( xClase==Clase ){
t = oStyle[r].rules[i].style.cssText;
if( t=="" || Regla==null || Regla=="*" ) return t;
t = t.split(";");
for(c=0; c<t.length; c++){
m = t[c].split(":");
m[0] = trim(m[0]);
if( typeof(Regla)=="string" ){
if( m[0].toUpperCase()==cssUnCapitalize(Regla).toUpperCase() ){
if( m.length > 2 ) return trim(m[1])+":"+trim(m[2]);
return trim(m[1]);
}
}else if( typeof(Regla)=="object" ){
for(p=0; p<Regla.length; p++){
if( m[0].toUpperCase()==cssUnCapitalize(Regla[p]).toUpperCase() ){
Dim[Regla[p]] = trim(m[1]);
break;
}
}
}
}
}
}
}
}
return( (typeof(Regla)=="object") ? Dim : "" );
}
S.fn.cssVal = function(prop){
return getStyle(this.obj, prop);
}
S.run = function(win, code, name){
if( code=="" ) return;
if( name!=undefined ){
S("script[name='"+name+"']", win).nodeRemove();
}
var script = win.document.createElement("script");
if( upper(mid(code,8))=="<SCRIPT " && upper(mid(code,-9))=="<"+"/SCRIPT>" ){
code = mid(code,">",-9);
}
script.type = 'text/javascript';
script.charset = "ISO-8859-1";
script.text = code;
script.name = name || "";
win.document.head.appendChild(script).parentNode.removeChild(script);
}
S.runHTML = function(win, html){
var obj = win.document.createElement("span");
obj.style.display = 'none';
obj.innerHTML = html;
win.document.head.appendChild(obj);
try{
var scripts = obj.getElementsByTagName("script"), tag, i;   //var scripts = Array.prototype.slice.call(obj.getElementsByTagName("script"));
for(i=0; i<scripts.length; i++){
if(scripts[i].src!=""){
tag = win.document.createElement("script");
tag.charset = "ISO-8859-1";
tag.src = scripts[i].src;
win.document.getElementsByTagName("head")[0].appendChild(tag);
}else{
win.eval(scripts[i].text);
}
}
}catch(e){
alert("error");
}
obj.parentNode.removeChild(obj);
}
S.loadJS = function(win, txt){
if( txt.indexOf('.php')==-1 && txt.indexOf('.gs')==-1 && txt.indexOf('.js')==-1 ) txt += '.js';
txt = txt.toLowerCase();
if( txt.substr(0,1)=='$' ) txt = 'edes.php?'+((txt.indexOf('.php')==-1 && txt.indexOf('.gs')==-1)?'R:':'E:')+txt;
var Dim = win.document.getElementsByTagName('script'), n, o;
for(n=0; n<Dim.length; n++) if( Dim[n].src!='' && Dim[n].src==txt ) return;
o = win.document.createElement('script');
o.charset = "ISO-8859-1";
o.async = false;
o.src = txt;
win.document.body.appendChild(o);
}
S.createHTML = function(html, win){
return createDOM(win||window, html);
}
S.selectOff = function(win){
if( document.selection ){
win.document.selection.empty();
}else if( window.getSelection ){
win.getSelection().removeAllRanges();
}
}
S.selectRange = function(obj, ini, end, copy){
var kill = null
if( type(obj)=="string" ){
kill = S("<textarea style='position:absolute;left:0px;top:0px;'>").nodeEnd("body").val(obj).obj;
obj = kill;
}
if( ini==undefined ){
ini = 0;
end = obj.value.length;
copy = true;
}
var win = objWindow(obj);
obj.focus();
obj.setSelectionRange(ini, end);
if(copy){
try{
if(window.netscape && netscape.security){
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
}
win.document.execCommand("copy", false, null);
}catch(e){}
}
if( kill!=null ) S(kill).nodeRemove();
}
S.getSelection = function(win){
if( win.document.selection ){
var xSelect = win.document.selection.createRange().text;
}else if( win.getSelection) {
var xSelect = win.getSelection().toString();
}
return (xSelect.length==0) ? "" : xSelect;
}
S.clipboardPut = function(txt){
var o = S("<textarea style='position:absolute;top:0px;left:0px'></textarea>").val(txt).nodeEnd("BODY");
S.selectRange(o.obj, 0, o.obj.value.length, true);
S(o).nodeRemove();
}
S.fn.clipboardPut = function(){
var o = this.obj;
S.selectRange(o, 0, o.value.length, true);
}
S.fn.clipboardGet = function(cmp){
navigator.clipboard.readText()
.then(text=>{
S(":"+cmp, this.win).val(text);
var obj = S(":"+cmp, this.win).obj,
win = this.win,
type = S(obj).attr("tc"),
long = S(obj).attr("leng"),
dec = S(obj).attr("dcm"),
sType = S.type(type), otype,
typeBak = type,
tipos = {F4:10, P4:7, P:7, CP:5, CDI:19, H8:8, H5:5, H2:2, T:S.keyCheck["T"].length-1};
if( sType=="string" ){
if( type.charAt(0)=="@" && type.length>1 ){
sType = "format";
long = sType.length-1;
}else if( tipos[type] ){
sType = "format";
type = S.keyCheck[type];
long = type.length-1;
}
}
otype = sType;
if( !long && sType=="string" && tipos[otype] ){
otype = upper(type);
long = tipos[otype];
dec = 0;
type = S.keyCheck[otype];
sType = "f";
}
S.keyPaste(obj, type, long, dec, sType[0], otype, typeBak );
})
.catch(err=>{
S.error("Error al leer del clipboard");
});
}
S.wrapFunction = function(win, fun, uFun, antes){
if( win["__wf_"+fun.name]==undefined ){
win["__wf_"+fun.name] = true;
win[fun.name] = S.wrapFunction(win, fun, uFun, antes);
}
return function(){
if( antes==undefined || antes ){
if( uFun.apply(this, arguments)===false ){
return;
}
}
var v = fun.apply(this, arguments);
if( antes!=undefined && !antes ) uFun.apply(this, arguments);
return v;
}
}
S.toExcel = function(obj, file=""){
if( S.type(obj)=="window" ){
if( S("#BROWSE", obj).length ) obj = S("#BROWSE", obj).obj;
else return;
}
top.S.info(34);
setTimeout(function(){
var type = 'application/vnd.ms-excel',
txt = S(obj).HTML(),
link, i, f=0, head="", body="", foot="";
if( S('THEAD', obj).length ){
head = S('THEAD', obj).html();
while(head.indexOf("><th ",i)>-1){
i = head.indexOf("><th ",i)+5;
f = head.indexOf(">",i);
head = S.left(head,i-1)+S.mid(head,f,0);
}
}
if( S('TBODY', obj).length ) body = S('TBODY', obj).html();
if( S('TFOOT', obj).length ) foot = S('TFOOT', obj).html();
txt = ("<table>"+head+body+foot+"</table>").replace(/ /g, '%20'),
file = file?file:'Doc'+S.date("·H·i·s");
if( S.right(file,4)!=".xls" ) file+=".xls";
link = document.createElement("a");
document.body.appendChild(link);
if(navigator.msSaveOrOpenBlob){
var blob = new Blob(['ufeff', txt], {type: type});
navigator.msSaveOrOpenBlob(blob, file);
}else{
link.href = 'data:'+type+', '+txt;
link.download = file;
link.click();
document.body.removeChild(link);
}
S.infoHide(top, 1);
}, 1);
}
S.screenToPdf = function(win){
top.S.info(2);
setTimeout(function(){
function Heredado(o, k, v){
if( S.left(v,4)=="rgb(" || S.left(v,5)=="rgba(" ){
if( S.count("g", v)>2 ){
v = "";
}else if( S.nsp(v)=="rgba(0,0,0,0)" ){
if( o.tagName!="BODY" ){
var nc = S(o).css("backgroundImage");
if( nc!="" && nc!="none" ){
var dim=[0,0,0],t=0,i=0,p=0,tmp;
while((p=nc.indexOf("rgb(",i)) && p>-1){
tmp = S.mid(nc.substring(p), "rgb(",")").split(",");
i = p+1;
for(p=0; p<3; p++) dim[p]+=(tmp[p]*1);
t++;
}
v = "rgb(";
for(p=0; p<3; p++){
if( p>0 ) v += ",";
v += dim[p]/t;
}
return S.rgb2hex(v+")");
}
var vv = S(o.parentNode).css(k);
if( vv==1 ){
v = "";
}else{
if( S.nsp(vv)=="rgba(0,0,0,0)" ){
v = "";
}else{
v = S.rgb2hex(vv);
}
}
}else{
v = "";
}
}else{
v = S.rgb2hex(v);
}
}else{
v = "";
}
return v;
}
var tagSinUsar=[], txt="", dimImg=[], codeImg=[], img="", i;
if( S("META[name=eDes]",win).length ){
txt += "eDes||||||"+S("META[name=eDes]",win).attr("gsScript")+"~";
}
S("*",win.document.body).each(function(k,o){
if( !/^(A|DIV|FIELDSET|I|IMG|INPUT|LABEL|LEGEND|SPAN|TABLE|TD|TEXTAREA|TH)$/.test(o.tagName) ) return;
if( o.style.visibility=="hidden" || o.style.display=="none" ) return;
if( /^(TablaTH|TablaTV|TablaTE|MenuFootLeft|MenuFootRight)$/.test(o.id) ) return o.nextSibling.sourceIndex-2;
if( /^(MENUFOOTLIST)$/.test(o.className) ){
if( o.nextSibling.nodeType==3 ) o = o.nextSibling;
return o.nextSibling.sourceIndex;
}
c = S.xy(o);
if( c.w==0 && c.h==0 ) return;
txt += o.tagName+"|"+c.x.toFixed(2)+"|"+c.y.toFixed(2)+"|"+c.w.toFixed(2)+"|"+c.h.toFixed(2)+"|";
S.each(S(o).css("zIndex,color,backgroundColor,fontSize,fontWeight,borderLeftColor,borderRightColor,borderBottomColor,borderTopColor,borderLeftWidth,borderRightWidth,borderBottomWidth,borderTopWidth,borderTopLeftRadius,borderTopRightRadius,borderBottomLeftRadius,borderBottomRightRadius,textAlign,verticalAlign"), function(k,v){
if( k=="" ) return;
if( k=="backgroundColor" ){
v = Heredado(o,k,v);
txt += v+"|";
}else{
if( S.left(v,4)=="rgb(" || S.left(v,5)=="rgba(" ){
if( S.count("g", v)>2 ){
v = "";
txt += "|";
}else if( S.nsp(v)=="rgba(0,0,0,0)" ){
var pBackgroundColor = S(o.parentNode).css("backgroundColor");
v = S.rgb2hex(pBackgroundColor);
txt += v+"|";
}else{
v = S.rgb2hex(v);
txt += v+"|";
}
}else{
if( S.left(k,11)=="borderWidth" && isNaN(v) ) v = 1;
txt += v+"|";
}
}
c[k] = v;
});
txt += ((o.paddingLeft==undefined)? "":o.paddingLeft)+"|"+((o.paddingBottom==undefined)? "":o.paddingBottom)+"|";
if( o.tagName!="I" ){
txt += ((o.src)? o.src:"")+"|";
}else{
if( !dimImg[S.trim(o.innerText)] ){
var canvas = S('<canvas width="'+(c.w*1.7)+'" height="'+(c.h*1.7)+'"></canvas>').nodeEnd("BODY").obj,
context = canvas.getContext('2d');
context.font = (c.fontSize*1.3)+"px eDes";
context.fillStyle = c.color;
context.textAlign = "left";
context.fillText(S.trim(o.innerText),0,c.h*1.3);
txt += "="+S.code(S.trim(o.innerText))+"|";
dimImg[S.trim(o.innerText)] = true;
codeImg["="+S.code(S.trim(o.innerText))] = canvas.toDataURL('image/png');
S(canvas).nodeRemove();
}else{
txt += "="+S.code(S.trim(o.innerText))+"|";
}
}
if( /^(radio|checkbox)$/.test(o.type) ){
txt += ((o.checked)? "X":"")+"|";
}else{
txt += ((o.value)? S.trim(o.value):"")+"|";
}
if( o.children.length==0 && o.innerText ){
txt += S.trim(o.innerText);
}else if( o.children.length==1 && o.innerText && o.children[0].tagName=="BR" ){
txt += S.replace(S.trim(o.innerHTML), "<br>","{[br]}");
}else if( o.children.length==1 && o.innerText && o.children[0].tagName=="SCRIPT" ){
txt += S.trim(o.innerText);
}
txt += "|"+o.sourceIndex+"~";
});
for(i in codeImg){
img += "=|"+i+"||"+codeImg[i]+"~";
}
if( txt=="" ){
var t = S("*", win.document.body).length;
if( t==3 || t==4 ){
txt = "DIV|0|0.00|500|50|1|#FFFFFF|#FF0000|14|400|||||0|0|0|0|0|0|0|0|center|middle||||"+win.document.body.innerText+"||0|~";
}
}
S(window).callSrvPost("edes.php?E:$screen_pdf.php", {screen:img+txt});
}, 1);
}
S.print = function(o, cnf){
if( top._FIELDS["_A4Width"]==undefined || cnf!=undefined){
S.window("edes.php?E:$a/u/print_setup.php", {title:S.lng(268), width:400, height:650, print:false, minimize:false, maximize:false, resize:false});
return;
}
var win = window, iWin = S.windowObject(o), subWin = false;
_A4Width = top._FIELDS["_A4Width"]*1,
_A4Height = top._FIELDS["_A4Height"]*1;
if( type(o)=="window" ){
win = o;
subWin = true;
}else if( iWin.name=="Main" ){
win = (S(":IWORK",top).css("display")=="none")? frames["IWORK2"] : frames["IWORK"];
}
if( /^(G|F)$/.test(win._Obj) ){
if( !win._CARD ){
var cnt = S("#TABContainer", win),
c = cnt.css("left,top,position,width"), o;
if( subWin ){
S("#TABHeader", win).obj.parentNode.style.display = "";
S("#TABBorder", win).css(S.replace(S("#TABHeader", win).attr("bakCSS"), "-bottom", ""));
}
cnt.css("position:absolute;left:10;top:10");
if( subWin ){
cnt.css("width:"+c.width);
}
if( (c.width+20)>_A4Width ) cnt.css("zoom", _A4Width/(c.width+20));
o = S("<span style='position:absolute;left:0px;top:0px;display:block;height:"+_A4Height+"px;width:"+_A4Width+"px;border:1px solid transparent;'></span>", win).nodeStart("body");
win.print();
cnt.css({left:c.left, top:c.top, position:c.position});
S(o).nodeRemove();
cnt.css("zoom", 1);
if( subWin ){
S("#TABHeader", win).obj.parentNode.style.display = "none";
S("#TABBorder", win).css("border-width:0px;");
}
}else{
var c = S.screen(win),
body = S("body", win),
cBody = body.css("background-color"),
cardBox = S("#CARDBOX", win),
cBox = cardBox.css("background-color"), pDim=[], n, mt,
card = S(".card", win),
hA4 = _A4Height;
if( (c.sw+20)>_A4Width ) body.css("width", _A4Width);
body.css("background-color:#ffffff");
cardBox.css("background-color:#ffffff");
if( card.length>1 ) mt = S(card.dim[1]).css("margin-top");
for(n=0; n<card.length; n++){
pDim[n] = S.xy(card.dim[n]);
if( (pDim[n].y+pDim[n].h)>hA4 ){
S(card.dim[n]).css("margin-top", hA4-pDim[n].y+mt+10);
hA4 += _A4Height;
pDim[n] = S.xy(card.dim[n]);
}
}
win.print();
for(n=1; n<card.length; n++) S(card.dim[n]).css("margin-top", mt);
cardBox.css("background-color", cBox);
body.css("width:100%; background-color:"+cBody);
}
}else if( win._Obj=="L" ){
if( win.Imprimir ) win.Imprimir();
}
}
}
FuncionesDe_UI: {
S.fn.loading = function(on){
var win = this.win, o;
if( on==undefined || on ){
if( this.obj.tagName ){
var el = toTag(this.obj,"SPAN","*"),
tapa = el.children[el.children.length-1];
S(tapa).visible();
return;
}
if( !S("#LOADING",win).exists() ){
S("<div id='LOADING' class='loader' style='position:fixed;visibility:hidden'></div>",win).nodeStart("body");
}
S("#LOADING",win).center("z-index:1000;visibility:visible;").on("click", function(){
S([this["Parent"],this], null).nodeRemove();
}).modal({css:"background:"+S.setup.loadingBackground});
}else if( S("#LOADING",win).exists() ){
o = S("#LOADING",win);
if( o["Parent"] ) S(o["Parent"]).nodeRemove();
S(o).nodeRemove();
}
}
S.loading = function(win, on){
if(win.name=="_ISUBLIST" ) return;
try{
if( on ){
S("body",win).hidden();
}else{
S("body",win).visible();
}
}catch(e){}
if( !S(".WINDOWLOADING", win).exists() ) return;
if(win.name=="IWORK"){
var obj = win.frameElement.parentNode.children[1],
a = S.xy(obj.parentNode);
S(".WINDOWLOADING").css({
width:a["w"],
height:a["h"],
left:a["x"],
top:a["y"]
});
S.display(obj, on);
}else if(win.name=="Main"){
}else if( S(win.frameElement).attr("eSubWin")!=null ){
var obj = S(".WINDOWLOADING",S.toTag(win.frameElement,"SPAN","*")),
a = S(S.toTag(win.frameElement,"SPAN","*")).css("width,height");
S(obj).css({
width:a["width"],
height:a["height"]
});
S.display(obj, on);
}
}
S.fn.help = function(file, ev){
var o = this.obj,
w = this.win;
file += S.setup.language;
try{
if( _M_!="" && null!=ev && ev.ctrlKey ){
try{
S.window("edes.php?E:$t/help.php&HELP="+escape(file), {title:"Edita ayuda: "+S.replace(file,",","."), fullscreen:true});
this.attr("eHelp", null);
}catch(e){}
return S.eventClear(ev);
}
}catch(e){}
if( this.attr("eHelp")==null ){
S.call("E:$helpread", {file:file}, {function:function(txt){
S("<span id='help_"+o.sourceIndex+"' style='display:none'></span>", w).nodeEnd().html(txt);
S(o).attr("eHelp", o.sourceIndex).tip(txt);
}});
}else{
S(o).tip(S("#help_"+this.attr("eHelp"), w).html(), w);
}
}
S.tip = function(win, txt, sg){
if( type(win)!="window" ){
sg = txt;
txt = win;
win = window;
}
if( txt==undefined ){
if( win._TipLast!=null ) clearTimeout(win._TipLast);
S("#TIP",win).nodeRemove();
}else if( txt=="" ){
}else{
if(sg) S("body",win).tip(txt,sg);
else S("body",win).tip(txt);
}
}
S.info = function(win, txt, sg, error){
if( type(win)!="window" ){
error = sg;
sg = txt;
txt = win;
win = window;
}
if( txt==undefined ){
S("SPAN[id='TIP']", win).nodeRemove();
}else{
return S("body",win).tip(txt, sg, error).on("click", function(){
S("SPAN[id='TIP']", win).nodeRemove();
});
}
}
S.infoHide = function(win, sg){
setTimeout(function(){
S.info(win);
}, sg*1000);
}
S.ok = function(win, txt, sg){
S.info(win, txt, sg, "ok");
}
S.warning = function(win, txt, sg){
S.info(win, txt, sg, "warning");
}
S.error = function(win, txt, p){
if( type(win)!="window" ){
txt = win;
win = window;
}
if( txt==undefined ){
if( S("#TIP",win).exists() ){
var o = S("#TIP",win).obj;
if( o.Parent ){
if( o.Parent.Parent.obj["eFocus"] ){
o.Parent.Parent.obj["eFocus"].focus();
o.Parent.Parent.obj["eFocus"]["eBakCopy"] = 1;
}
S(o.Parent).nodeRemove();
}
S("#TIP",win).nodeRemove();
}
}else{
var o = S("body",win)
.tip(txt,null,"error")
.on("click", function(){
if( this.Parent ) S(this.Parent).nodeRemove();
S("#TIP",win).nodeRemove();
if( p ){
if( p.focus ) p.focus.focus();
if( p.function ) p.function();
}
}).modal();
}
}
S.fn.windowList = function(o){
var o = this.obj,
w = this.win,
op = [["-"+S.lng(275)]];
S("SPAN.WINDOW").each(function(pk,nodo,n){
if( getStyle(nodo, "visibility")=="hidden" ){
S(nodo).attr("idWin",pk);
op[op.length] = [nodo.children[0].rows[0].cells[0].children[0].innerHTML, "", "S.windowShow("+pk+")"];
}
});
if( op.length>1 ){
var i = S(o).attr("i"), n,
obj = S(".SUBMENU");
for(n=0; n<obj.length; n++ ){
if( S(obj.dim[n]).attr("i")==i ){
return;
}
}
var menu = S(o).menu(op, {index:1, noMark:1}).modal({close:true});
S(o).attr("i", S(menu.obj).attr("i"));
}
}
S.windowShow = function(index){
S("SPAN.WINDOW").each(function(pk,nodo){
if( nodo.idWin==index ){
S.windowFocus(nodo);
S(nodo).css("visibility:visible");
S.windowStatus(objWindow(nodo));
}
});
}
S.windowFocus = function(nodo){
if( type(nodo)=="window" ){
nodo = S.toTag(nodo.frameElement, "SPAN", "=className=WINDOW");
if(!nodo) return;
}
if( type(nodo)=="undefined" ){
var win = (top.IWORK2.document.body.offsetWidth>0)? top.IWORK2 : top.IWORK, ind=-1, c,w;
top.S("SPAN.WINDOW").each(function(pk, o){
c = S(o).css("zIndex,visibility");
if( c["visibility"]=="visible" && c["zIndex"]>ind ){
ind = c["zIndex"];
w = S(o).find("iframe").obj;
win = w.contentWindow || w.contentDocument.parentWindow;
}
});
return win;
}else if( getStyle(nodo, "zIndex")*1!=S.session.index ){
S.session.index += 2;
nodo.style.zIndex = S.session.index;
if( nodo["eDesParent"] ) nodo["eDesResize"].style.zIndex = S.session.index+1;
}
}
S.windowStatus = function(win){
S("#_MINIMIZEDWINDOWS",win).class("+OFF");
S("SPAN.WINDOW",win).each(function(pk,nodo){
if( getStyle(nodo, "visibility")=="hidden" ){
S("#_MINIMIZEDWINDOWS",win).class("-OFF");
}
});
}
S.fn.window = function(){
var o = this.obj;
if( o.className!="WINDOW") o = S.toTag(o.frameElement,"SPAN","*");
if( o["eDesOnClose"] && !o["eDesOnClose"](o) ) return;
if( S("IFRAME",o).obj && S("IFRAME",o).obj.eExit ) S("IFRAME",o).obj.eExit();
if( o["Parent"] ) setTimeout(function(){
S(o["Parent"]).nodeRemove();
}, 100);
setTimeout(function(){
var iframe = S("iframe",o).obj;
if( iframe!=null ){
//S.call("edes.php?o:unsetsql&_ACCESS="+iframe.contentWindow.frameElement.getAttribute("eAccess"));
}
S(o).nodeRemove();
}, 100);
}
S.windowClose = function(win){
S(win).window();
}
S.window = function(url, p, wOPENER){
var _w="", _h="", _xx="", _yy="", ourl=url;
if( /^(?:html|window)$/i.test(S.type(url)) ){
S(url).window();
return;
}
if( url=="" ) url = "about:blank";
try{
if( S.is("&_IWORK=2", url) && p.wopener.name=="IWORK" ){
frames["IWORK2"].location.replace('about:blank');
S(":IWORK").none();
S(":IWORK2").block();
frames["IWORK2"].frameElement["WOPENER"] = p.wopener;
url = S.urlAdd(url, (p.wopener||wOPENER), "WDESKTOP", frames["IWORK2"]);
frames["IWORK2"].location.replace(url);
return;
}
}catch(e){}
top.document.body.style.overflow = "hidden";
if( !p ) p = {};
if( p.unique && S("IFRAME[src*='"+url+"'").length ){
if( p.uniqueInfo ) S.info(top, p.uniqueInfo);
if( p.uniqueWarning ) S.warning(top, p.uniqueError);
if( p.uniqueError ) S.error(top, p.uniqueError);
if( p.uniqueOk ) S.ok(top, p.uniqueOk);
return S.eventClear(top);
}
if( p.fullscreen ){
p.w = "100%";
p.h = "100%";
p.x	= 0;
p.y = 0;
}else if( p.w==-1 ){
var xy = S.xy(S(":IWORK").obj);
_xx = p.x = xy[0];
_yy = p.y = xy[1];
_w = p.w = frames["IWORK"].document.body.clientWidth;
_h = p.h = frames["IWORK"].document.body.clientHeight;
}else{
_w = p.w||p.width||"";
_h = p.h||p.height||"";
p.w	= px(p.w||p.width||300);
p.h	= px(p.h||p.height||200);
}
S.session.index += 2;
var txt = "<span class='WINDOW' PK="+S.date("u")+" style='visibility:hidden;z-index:"+S.session.index+";width:"+p.w+";height:"+p.h+";display:inline-table;"+
(p.x?"left:"+px(p.x)+";":"")+
(p.y?"top:"+px(p.y)+";":"")+
"'"+(p.hidden?" eHidden=1":"")+">"+
"<table border='0px' style='width:100%;height:100%;display:contents;'>"+
"<tr style='height:1px;width:100%;display:table' class='CAPTION'>"+
"<td title='"+(p.title||"")+"' style='width:100%;margin:0px;display:table-cell'><div style='overflow-x:hidden;float:left;'>"+(p.title||"...")+"</div></td>";
txt += "<td align='right' style='width:1px;vertical-align:middle;padding:0px 0px 2px 0px'>";
if( p.iconAdd!=undefined ) txt += p.iconAdd;
if( p.print==undefined || p.print ) txt += "<i class='ICONWINDOW' op='P'>1</i>";
if( S("#_MINIMIZEDWINDOWS", top).length ){
if( S.setup.minimize && (p.minimize==undefined || p.minimize) && !p.modal ) txt += "<i class='ICONWINDOW' op='m'>2</i>";
}
if( !p.fullscreen && p.maximize==undefined || p.maximize ) txt += "<i class='ICONWINDOW' op='M'>3</i>";
if( p.close==undefined || p.close ) txt += "<i class='ICONWINDOW' op='C'>5</i>";
txt += "</td></tr>"+
"<tr><td colspan=2 class='CONTAINER' style='padding:0px;height:100%;width:100%;vertical-align:top;display:table-cell;'>";
if( ourl ) txt += "<iframe src='' eSubWin=1"+(p.fullscreen?" eNORESIZE='true'":"")+" frameborder='0px' style='height:100%;width:100%;' eAccess='"+S.session.access+"/0'></iframe>";
if( p.content ) txt += p.content;
txt +="</td></tr>";
if( p.status ) txt += "<tr><td colspan=2 class='STATUS' align='center'>"+p.status+"</td></tr>";
txt += "</table>";
if( !p.fullscreen ) txt += "<i class=ICONRESIZE style='position:absolute;right:0px;bottom:0px;"+((p.noresize || !p.resize)?"display:none;":"")+"' op='R'>6</i>";
if( url ) txt += "<table class='WINDOWLOADING' onclick='S(this).none();S.eventClear(window);' style='width:100%;height:100%'><tr><td align='center' valign='middle'>"+
"<div class='loader'></div>"+
"</td></tr></table>";
txt += "</span>";
var o1 = S(txt).nodeEnd(),
iframe = S(o1.obj).find("iframe"),
iframeWin = null,
nLoad = (p.fullscreen)?1:2;
if( p.frameElement && iframe.length ){
iframe.obj.setAttribute(p.frameElement[0], "");
iframe.obj[p.frameElement[0]] = p.frameElement[1];
}
if( !p.x && !p.y && !p.fullscreen ) S(o1).center();
o1.obj["WOPENER"] = p.wopener||wOPENER||o1.win;
if( o1.obj["WOPENER"] ) S.eventClear(o1.obj["WOPENER"]);
if( url!=null && url!="about:blank" ){
if( url!="-" ){
if( url.indexOf("edes.php")==-1 ){
url = getUrl(url)["url"];
}
iframeWin = S.iframeToWindow(iframe.obj);
S.loading(iframeWin, 1);
url = S.urlAdd(url, (p.wopener||wOPENER||o1.win), "WDESKTOP", S.iframeToWindow(iframe.obj));
iframe.obj.src = url;
}else{
iframeWin = S.iframeToWindow(iframe.obj);
}
o1.obj.children[nLoad].style.width = px(o1.obj.offsetWidth-1);
o1.obj.children[nLoad].style.height = px(o1.obj.offsetHeight-1);
o1.obj["WINDOW"] = iframeWin;
if( _xx!="" ){
_h -= o1.obj.offsetHeight-o1.obj.children[0].rows[1].offsetHeight;
_w -= o1.obj.offsetWidth-o1.obj.children[0].rows[1].offsetWidth;
iframe.obj.setAttribute("_x",_xx);
iframe.obj.setAttribute("_y",_yy);
}
iframe.obj.setAttribute("_WIDTH",_w);
iframe.obj.setAttribute("_HEIGHT",_h);
}else{
S(o1).visible();
}
if( p.onclose ) o1.obj["eDesOnClose"] = p.onclose;
if(p.fullscreen){
setTimeout(function(){
S(o1).windowResize("100%", "100%", 0, 0);
S(o1).windowResize("100%", "100%", 0, 0);
},100);
}
if( url!=null && url!="about:blank" ){
iframe.obj.onload = function(){
var el = toTag(iframe.obj, "SPAN", "*"),
tapa = el.children[el.children.length-1];
S(tapa).none();
};
}
if( p.modal ){
var tapa = S(o1).modal(p.hidden ? {css:"visibility:hidden"}:null);
if( p.noDestroy ) S(tapa).on('DOMNodeRemoved', function(){
location.href = top.location.href
});
}
S(o1).on("click", function(ev){
var o = img = event(window,"I"), op;
if(o){
op = o.getAttribute("op");
o = toTag(o.parentNode,"SPAN","*");
if( op=="C" ){
if( iframeWin && iframeWin.OkChange && !iframeWin.OkChange() ){
S.alert({
icon:'<i class="ICONDESKTOP">?</i>',
button:"Y,N",
title:210,
text:199,
function: function(yn){
if(yn==1) S(o).window();
}
});
return;
}
S(o).window();
}else if( op=="m" ){
S(o).hidden();
S(".ICONDESKTOP").class("-OFF");
}else if( op=="M" ){
var estado = S(o).css("left,top,width,height"),
win = objWindow(o);
S(o).attr("eRestore", S.serialize(estado));
S(img).text(4);
S.replace(img, "op", "M", "R");
if( S("#TABBorder",win).exists() ){
S(win.document.body).scrollSet("#TABBorder");
}else if( S("#PAGINA",win).exists() ){
S(win.document.body).scrollSet("#PAGINA");
}
S(o).find(".ICONRESIZE").none();
S(o).windowResize("100%", "100%", 0, 0);
S(o).goto(0,0);
}else if( op=="R" ){
var dim = S.unserialize(S(o).attr("eRestore"));
S(img).text(3);
S.replace(img, "op", "R", "M");
if( S("#TABBorder",win).exists() ){
S(win.document.body).scrollSet("#TABBorder");
}else if( S("#PAGINA",win).exists() ){
S(win.document.body).scrollSet("#PAGINA");
}
S(o).find(".ICONRESIZE").block();
S(o).windowResize(dim["width"], dim["height"], 0, 0);
S(o).goto(dim["left"], dim["top"]);
}else if( op=="P" ){
if( url ){
S.print(iframeWin);
}else{
var win=window.open("","_blank");
win.document.write(S(o).find(".CONTAINER").obj.innerHTML);
S.sheetCopy(win,"*");
win.document.close();
win.print();
win.close();
}
return false;
}
}
});
var o2 = S(o1).move(null,"div");
if( url!=null && url!="about:blank" ){
if( !p.fullscreen ) S(o2).resize(_w,_h);
iframe.obj["WOPENER"] = p.wopener||wOPENER||o1.win;
return iframeWin;
}else{
if( !p.fullscreen ) S(o2).resize();
return o1.obj;
}
}
S.windowView = function(o){
if( type(o)=="window" ) o = o.frameElement;
var span = S.toTag(o, "SPAN");
S(span).visible();
if( S(span).attr("eHidden") ){
span.removeAttribute("eHidden");
if( span["Parent"] ){
span["Parent"].style.visibility = "visible";
}
}
}
S.fn.goto = function(x, y){
var o = this.obj,
win = o.contentWindow,
r = (type(o)=="window") ? S.toTag(o.frameElement,"SPAN","*") : o, xy;
if( !S(r).class("?WINDOW") ) return false;
xy = S(r).css("left,top");
if( x==undefined || x==null ) x = xy.x;
if( y==undefined || y==null ) y = xy.y;
if( S("iframe",o).obj!=null ){
win = S("iframe",o).obj.contentWindow;
if( !S(win).windowIs() ) return null;
if( S.isReady(win) ){
S(r).css({left:x, top:y});
}else{
setTimeout(function(){
S(win).goto(x,y);
}, 100);
}
}else{
S(r).css({left:x, top:y});
}
return win;
}
S.fn.padding = function(padre){
return{width:padre.scrollWidth-this.obj.scrollWidth, height:padre.scrollHeight-this.obj.scrollHeight};
}
S.fn.windowFit = function(centrar){
var obj = this.obj,
win = this.win;
if( !S(win).windowIs() ) return false;
if( type(obj)=="window" ) obj = win;
if( obj.className!="WINDOW") obj = S.toTag(obj.frameElement,"SPAN","*");
if(centrar==undefined) centrar = true;
var alto = win.document.body.scrollHeight,
ancho = win.document.body.scrollWidth;
win.document.body.style.width = "1px";
win.document.body.style.height = "1px";
S(obj).css({width:ancho, height:alto});
if(centrar) S(obj).center();
return S(obj);
}
S.fn.windowResize = function(minw, minh, interna, centrar){
var obj = this.obj,
win = this.win, a,d;
if( !S(win).windowIs() ){
if( obj.className!="WINDOW" ) return null;
}
if( type(obj)=="window" ) obj = win;
if( obj.className!="WINDOW") obj = S.toTag(obj.frameElement,"SPAN","*");
if( minw==-1 ){
var xy = S.xy(S(":IWORK").obj);
S(obj).css({left:xy[0], top:xy[1], width:frames["IWORK"].document.body.clientWidth, height:frames["IWORK"].document.body.clientHeight, visibility:"visible"});
if( S("IFRAME", obj).exists() ) S("IFRAME", obj).obj.style.height = px(S("TABLE",obj).obj.rows[1].cells[0].offsetHeight);
}else if( minw ){
var boxIframe = obj.children[0].rows[1].cells[0],
iw = obj.offsetWidth-boxIframe.offsetWidth,
ih = obj.offsetHeight-boxIframe.offsetHeight, n,
s = S.screen(window), iHeight;
if( interna ){
if( minw=="100%" ){
minw = s.ow-10;
win.document.body.style.width = "100%";
}
if( minh=="100%" ){
minh = s.oh-10;
win.document.body.style.height = "100%";
}
minw = minw*1+iw;
minh = minh*1+ih;
}
if( minw=="100%" || minw>s.ow-10 ) minw = s.ow-10;
if( minh=="100%" || minh>s.oh-7 ){
minh = s.oh-7;
iHeight = "100%";
}else{
iHeight = (minh-ih)+"px";
}
for(n=0; n<2; n++){
S(obj.children[0].rows[0].cells[0].children[0]).css({
overflow: "hidden",
width: minw-obj.children[0].rows[0].cells[1].offsetWidth-7
});
}
if(boxIframe.children[0]){
boxIframe.children[0].style.height = iHeight;
}else{
obj.style.height = minh;
obj.children[0].rows[1].style.height = minh;
boxIframe.style.height = minh;
}
if( S(obj).attr("eHidden")==null ){
S(obj).css({width:minw, height:minh, visibility:"visible"});
}else{
S(obj).css({width:minw, height:minh});
}
if( centrar==undefined || centrar ){
S(obj).center();
}
if( obj.offsetHeight>minh ) minh -= obj.offsetHeight-minh;
if( obj.offsetWidth>minw ) minw -= obj.offsetWidth-minw;
S(obj).css({width:minw, height:minh});
}else{
interna = true;
win.document.body.style.width = "1px";
win.document.body.style.height = "1px";
S(obj).css({left:0,top:0,width:"100%",height:"100%",visibility:"visible"});
if( S("IFRAME", obj).exists() ) S("IFRAME", obj).obj.style.height = px(S("TABLE",obj).obj.rows[1].cells[0].offsetHeight);
}
return S(obj);
}
S.fn.windowInside = function(o){
var win = this.win, d;
if( S.windowIs(win) ){
if( S.type(o)=="eDes" ) o = o.obj;
if( o.offsetWidth==0 ) S(o).block();
d = S.screen(win);
if( o.offsetHeight>d["oh"] ){
S(win).windowResize(d["ow"], o.offsetHeight, true);
}
if( o.offsetWidth>d["ow"] ){
S(win).windowResize(o.offsetWidth, d["ow"], true);
}
}
}
S.fn.windowColor = function(papel, lapiz, borde, icon){
var obj = this.obj;
if( !S(this.win).windowIs() ) return null;
if( obj.className!="WINDOW") obj = S.toTag(obj.frameElement,"SPAN","*");
S(obj).css({backgroundColor:papel, color:lapiz, borderColor:borde});
S(obj.children[0].rows[0]).css({backgroundColor:papel, color:lapiz, borderBottom:"1px solid "+borde});
S(obj.children[0].rows[1].cells[0]).css({borderColor:borde});
if(icon!=undefined) S("I",obj).css("color",icon);
return S(obj);
}
S.fn.windowCaption = function(txt, ok){
var obj = this.obj,
win = this.win;
if( !S(win).windowIs() ) return null;
if( obj.className!="WINDOW") obj = S.toTag(obj.frameElement,"SPAN","*");
var td = S("TD",obj).obj,
aTitle = S(td.children[0]).text();
if( ok==undefined ) ok=false;
if( aTitle=="..." || aTitle=="" ) ok = true;
if( ok ){
if( S(".WINDOWTITLETEXT", td).length ){
S(".WINDOWTITLETEXT", td).html(txt);
}else{
S(td.children[0]).html(txt);
}
td.title = S.stripTags(S.replace(S(td.children[0]).text(), "&nbsp;"," ", "<br>","\n", "<BR>","\n"));
}
return S(obj);
}
S.fn.windowGetCaption = function(conTag){
var obj = this.obj,
win = this.win, td;
if( !S(win).windowIs() ) return null;
if( obj.className!="WINDOW") obj = S.toTag(obj.frameElement,"SPAN","*");
td = S("TD", obj).obj;
return (conTag==undefined || !conTag) ? td.title : td.children[0].innerHTML;
}
S.fn.windowWrite = function(txt){
var obj = this.obj;
if( obj.className!="WINDOW") obj = S.toTag(obj.frameElement,"SPAN","*");
S(obj).find(".CONTAINER").obj.innerHTML = txt;
return S(obj);
}
S.fn.windowIs = function(){
return S.windowIs(this.obj);
}
S.windowIs = function(win){
return((win.frameElement && win.frameElement.getAttribute("eSubWin"))!=null);
}
S.fn.windowIcon = function(op, xObj, func){
var win = this.obj, p, n,
table = type(win)=="window" ? toTag(win.frameElement, "TABLE", "*") : win.children[0],
td = table.rows[0].cells[1],
icons = S("I, IMG, INPUT[type='checkbox']", table.parentNode).dim;
if( win.className!="WINDOW" && !S(win).windowIs() ) return null;
switch( op.toUpperCase() ){
case "F":
p = nIcon(xObj);
if( p!=null ) icons[p].onclick = func;
break;
case "CLOSE":
table.parentNode["eDesOnClose"] = (xObj!=null)? xObj:func;
break;
case 'E':
td.children[xObj].onclick = func;
break;
case "I":
td.innerHTML = xObj+td.innerHTML;
break;
case "C":
S(win).windowCaption(xObj);
break;
case "M":
S.windowHidden(win);
S(".ICONDESKTOP").class("-OFF");
break;
case 'O':
return td.children[xObj];
case "S":
case "H":
case "B":
case "N":
case "R":
case "":
if( (xObj+"").length==1 ) show(xObj);
else for(n=0; n<xObj.length; n++) show(xObj[n]);
break;
}
return this;
function nIcon(xObj){
var n, p=null;
if( typeof xObj=="number" ){
p = (xObj>=0) ? xObj : icons.length+parseInt(xObj);
}else{
for(n=0; n<icons.length; n++) if( (icons[n].tagName=="I" && S(icons[n]).attr("op")==xObj) || (icons[n].tagName=="IMG" && icons[n].src.indexOf(xObj)>-1) ){
p = n;
break;
}
}
return p;
}
function show(xObj){
try{
var p = nIcon(xObj);
if( p!=null ){
if( op=="" ){
icons[p].style.display = "";
}else if( /^(B|N)$/i.test(op) ){
icons[p].style.display = (op=="B")?"block":"none";
}else{
icons[p].style.visibility = (op=="H")?"hidden":"visible";
}
}
}catch(e){}
}
}
S.windowHidden = function(win){
if( !S(win).windowIs() ) return null;
S(S.toTag(win.frameElement,"SPAN","*")).hidden();
S(".MODAL").nodeRemove();
}
S.imgTools = function(op, v, img){
var o,s,r,w,i,z,xy;
if( !img ){
o = S.event(window);
if( o.tagName=="I" ){
s = S.toTag(o, "span", "*");
if( s ){
i = S("iframe", s).obj;
if( i ){
w = i.contentWindow;
img = S("img",w).obj;
}
}
}
}else{
w = S.windowObject(img);
}
if( op!="d" ){
z = S(img).css("zoom")*1;
r = S(img).attr("eRotate")*1;
if( r==null ) r = 0;
}
switch(op){
case "z":
S(img).css("zoom:"+(z+v));
break;
case "r":
r += v;
if( Math.abs(r)==360 ) r = 0;
S(img).attr("eRotate", r);
S(img).css("transform:rotate("+r+"deg)");
img.style.setProperty("-ms-transform", "rotate("+r+"deg)");
img.style.setProperty("-webkit-transform", "rotate("+r+"deg)");
img.style.setProperty("-moz-transform", "rotate("+r+"deg)");
img.style.setProperty("-o-transform", "rotate("+r+"deg)");
break;
case "d":
S.callSrv("edes.php?D:"+v+"&_DOWN=1");
return;
default:
}
if( S.windowIs(w) ){
xy = top.S.screen(img);
if( Math.abs(r)==90 || Math.abs(r)==270 ){
S(img).css("margin:"+((xy.w-xy.h)/2)+"px "+((xy.h-xy.w)/2)+"px");
S(w).windowResize(xy.h*z, xy.w*z, true);
}else{
S(img).css("margin:0px 0px");
S(w).windowResize(xy.w*z, xy.h*z, true);
}
}
}
S.open = function(idVen, iUrl, iTipo, Ancho, Alto, ix, iy, Cerrar){
if( arguments.length==0 ){
for(var i in _Ventana){
S.session._Ventana[i].close();
}
return;
}
if( !iUrl ) return;
var cor = S.screen(top),
tipo = 'left='+(ix||0)+'; top='+(iy||0)+'; status=1; resizable=1; scrollbars=1; toolbar=1; location=1; menubar=1; directories=1; width='+(Ancho||cor.sw)+'; height='+(Alto||cor.sh)+';';
if( Cerrar==undefined ) Cerrar = true;
try{
if( Cerrar && S.session._Ventana[idVen]!=undefined && !S.session._Ventana[idVen].closed ) S.session._Ventana[idVen].close();
}catch(e){}
if( iUrl[0]==">" ) iUrl = S.mid(iUrl,1,0);
else if( iUrl.indexOf('/'+'/')==-1 ) iUrl = 'http:/'+'/'+iUrl;
S.session._Ventana[idVen] = window.open(iUrl, idVen, tipo, true);
}
S.phone = function(num){
if( S.trim(num)!="" && S.setup.phoneURL!="" ){
if( !(S.setup.phoneWindow==null || S.setup.phoneWindow.closed) ){
S.setup.phoneWindow.focus();
}
S.setup.phoneWindow = window.open(S.setup.phoneURL+S.setup.phonePrefix+S.trim(num), "3CX", S.setup.phoneFeatures);
}
}
S.fn.modal = function(para){
var obj = this.obj,
win = this.win,
cor = S.screen(win),
zIndex = obj.tagName=="BODY"? 10000 : getStyle(obj, "zIndex")*1-1,
tapa = S("<span class='MODAL' onselectstart='return S.eventClear(window)' style='z-index:"+zIndex+";width:"+(cor.sw-1)+"px;height:"+(cor.sh-1)+"px;'></span>",win).nodeEnd();
if( para==undefined ) para={};
if( para["css"] ) S(tapa).css(para["css"]);
obj["Parent"] = tapa.obj;
tapa.obj["eCover"] = obj;
if( zIndex==0 ){
S(obj).css("zIndex:1");
}
if( para["close"] ) S(tapa).on("click", function(){
S(this.eCover).nodeRemove();
S(this).nodeRemove();
});
if( para["hidden"] ) S(tapa).on("click", function(){
S(this.eCover).hidden();
S(this).nodeRemove();
});
if( para["none"] ) S(tapa).on("click", function(){
S(this.eCover).none();
S(this).nodeRemove();
});
if( para["function"] ) S(tapa).on("click", function(){
if( para["function"](this.eCover, this) ){
S(this.eCover).nodeRemove();
S(this).nodeRemove();
}
});
return tapa;
}
S.modal = function(para){
var win = window;
return S(win.document.body, win).modal(para);
}
S.modalDelete = function(win){
S(".MODAL", win).nodeRemove();
}
S.alert = function(x){
if(!x){
var dim = S("#ALERT .CAJA").dim;
if( dim.length>0 ){
S(dim[dim.length-1].parentNode).nodeRemove();
S(dim[dim.length-1]).nodeRemove();
}
return;
}
if( type(x)=="string" ){
var dim = S("#ALERT .CAJA").dim;
dim[dim.length-1].children[0].rows[1].cells[1].children[0].innerHTML = x;
return;
}
if( x.icon ){
if( S.left(x.icon,1)=="[" ){
x.icon = "<i class='ICONDESKTOP'>"+S.mid(x.icon,"[","]")+"</i>";
}else if( x.icon.length<=2 ){
x.icon = {
DH:"g/sys_dialog_asks.gif",
DI:"g/sys_dialog_info.gif",
E:"g/sys_error.gif",
H:"g/sys_help.gif",
I:"g/sys_info.gif",
N:"g/sys_note.gif",
P:"g/sys_printer.gif",
S:"g/sys_seek.gif",
W:"g/sys_warning.gif"}[S.upper(x.icon)];
}
}
if(!x.icon) x.icon = "";
x.width = x.width ? "width:"+px(x.width)+";":"";
if( x.title && /^[0-9]+$/.test(x.title+"") ) x.title = S.lng(x.title);
if(x.title) x.title = S.replace(x.title,"\n","<BR>");
if(x.text){
if( /^[0-9]+$/.test(x.text+"") ) x.text = S.lng(x.text);
if( S.type(x.text)=="string" ){
x.text = S.replace(x.text,"\n","<BR>");
}else{
var txt = "",f,c,mc=0,css=[],
d = x.text.style;
if( S.type(x.text.text)=="string" ) txt += S.replace(x.text.text,"\n","<BR>");
txt += "<table class='"+(x.text.class?x.text.class:"INFO")+"' border=0px cellspacing=1px cellpadding=2px>"
for(c=0;c<d.length; c++){
css[c] = "";
if(d){
d[c]=upper(d[c]);
if(d[c].length>2) css[c]+=d[c];
else{
if(d[c].indexOf("L")>-1) css[c]+="text-align:left;";
if(d[c].indexOf("C")>-1) css[c]+="text-align:center;";
if(d[c].indexOf("R")>-1) css[c]+="text-align:right;";
if(d[c].indexOf("B")>-1) css[c]+="font-weight:bold;";
}
if(css[c]!="") css[c]=" style='"+css[c]+"'";
}
}
d = x.text.head;
if(d){
txt+="<thead><tr>"; for(c=0; c<d.length; c++) txt+="<th>"+d[c]+"</th>"; txt+="</tr></thead>";
}
d = x.text.body;
if(d){
txt+="<tbody>";
for(f=0;f<d.length; f++){
txt+="<tr>"; for(c=0;c<d[f].length; c++) txt+="<td"+css[c]+">"+d[f][c]+"</td>"; txt+="</tr>";
}
txt+="</tbody>";
}
d = x.text.foot;
if(d){
txt+="<tfoot><tr>"; for(c=0;c<d.length; c++) txt+="<td>"+d[c]+"</td>"; txt+="</tr></tfoot>";
}
txt+="</table>";
x.text = txt;
}
}else x.text = "";
if(x.form){
x.return = "qqq";
var txt = '<form eType="Directo" autocomplete="off" name="FRMALERT" method="POST" spellcheck="false">'+
"<table class='INFO'><tbody>",f,c,im, xClass, newDim, mc=0, xpx="", css=[], lon={lon:"",dec:"", rows:""}, def="";
x.labelStyle = (x.labelStyle)? ' style="'+x.labelStyle+'"':"";
for(f=0;f<x.form.length; f++){
im = x.form[f][0].split("|");
for(c=0; c<im.length; c++) im[c] = S.trim(im[c]);
if( im[0][0]=="-" ){
txt+="<tr><td colspan=2><div class='SEPARATOR'></div>";
}else{
txt+="<tr><td"+x.labelStyle+">"+im[0]+"</td><td style='display:flex'>";
xpx="";
im[5]*=1;
if( im[5]>0 ) xpx="width:"+im[5]+"px;";
if( im[1]=="" ) im[1]="field"+f;
S.splitHash(lon, ",", S.nsp(im[4]));
for(c in lon) lon[c]*=1;
xClass = (/^(V|\-)$/i.test(im[6]))? ' class="READONLY" readonly="true"':' class="EDITABLE"';
switch(im[3]){
case 'T':
txt+="<input name='"+im[1]+"'";
if( /^(V|\-)$/i.test(im[6]) ){
txt+=' onfocus=document.body.focus() onclick="S.focusOff()"';
}else{
txt+=" onfocus=S.key('"+im[2]+"',"+lon["lon"]+","+lon["dec"]+")";
}
txt+=" value='";
c = lon["lon"];
switch(im[2]){
case '+,': case '-,':
c+=lon["dec"]+1;
case '+': case '-':
txt+=S.thousands(im[7], lon["dec"])+"' style='text-align:right;"+xpx;
break;
default:
txt+=im[7]+"' style='"+xpx;
}
txt+="'"+xClass+" eCND='"+im[8]+"' size="+c;
if( /s/i.test(im[6]) ) txt+=' spellcheck="true"';
txt+=">";
break;
case 'C':
txt+="<input name='"+im[1]+"' type='checkbox' diferente='' checkbox='1' conimagen='1' size='1' value='"+im[7]+"'"+(im[7]!=""?" checked":"")+" onchange={this.value=(this.checked?'S':'')}"+xClass+" ewe='1' onkeypress='S.fieldNext(this)'>";
break;
case 'R':
txt+="<table class='RadioL' border='0px' cellspacing='0px' cellpadding='0px' style='border-collapse:collapse;'><tbody><tr>";
for(c=0; c<x.form[f][1].length; c++){
txt+="<td><span onclick=S('#"+im[1]+"_"+c+"',window).radio('"+x.form[f][1][c][0]+"') style='width:1px' noSel=1>"+x.form[f][1][c][1]+"</span></td><td><input name='"+im[1]+"' id='"+im[1]+"_"+c+"' onfocus=S.key() type='radio' radiobutton='1' value='"+im[7]+"' eValue='"+x.form[f][1][c][0]+"'></td>";
}
txt+="</tr></tbody></table>";
break;
case 'A':
txt+="<textarea name='"+im[1]+"' onfocus=S.key('"+im[2]+"',"+lon["lon"]+",0) cols='"+lon["dec"]+"' rows='"+lon["rows"]+"'"+xClass+" eCND='"+im[8]+"' style='"+xpx+"'>"+im[1]+"</textarea>";
break;
case 'SV': case 'S':
def = "";
newDim=[];
for(c=0; c<x.form[f][1].length; c++){
if( c==0 && x.form[f][1][c][1]=="" ) x.form[f][1][c][1] = "&nbsp;";
newDim[c] = [x.form[f][1][c][1], "", x.form[f][1][c][0]];
if( x.form[f][1][c][0]==im[7] ) def = x.form[f][1][c][1];
}
x.form[f][1] = newDim;
txt+="<input name='"+im[1]+"' size="+lon["lon"]+" value='"+im[7]+"' eCND='"+im[8]+"' eInd="+f+" style='display:none'>";
txt+="<span class='SELECTINPUT'>";
txt+="<input name='_INPUT_"+im[1]+"' style='"+((im[6]=="-")?"":"cursor:pointer;")+xpx+"' size="+lon["lon"]+" value='"+def+"'"+xClass+" eCND='"+im[8]+"' style='"+xpx+"'>";
txt+="</span>";
break;
}
}
txt+="</td></tr>";
}
txt+="</tbody></table></form>";
x.text += txt;
}
S.session.zMessage -= 2;
if( x.button==undefined ) x.button = "";
var xButton = x.button.split("|"),
color = {a:"", y:"", n:"", c:""};
xButton[0] = S.lower(xButton[0]);
var ver = S.replace((xButton[0] || ""), "accept","a", "cancel","c", "yes","y", "no","n"),
oculto = " style='display:none'",
cor = S.screen(top), n,
txt = "<DIV id='ALERT' onselectstart='return S.eventClear(window)' style='display:table; position:absolute; left:0px; top:0px; z-index:"+S.session.zMessage+";'>"+
"<TABLE class='CAJA'>"+
"<TR><TH colspan=2>"+(x.title||"")+"</TH></TR>"+
"<TR><TD "+
((x.icon=="")? "style='display:none'>":"align='center' valign='middle' width='1px' height='1px'>")+
((x.icon=="" || mid(x.icon,1)=="<")? x.icon : "<IMG src='"+(x.icon||"")+"'>")+
"</TD>"+
"<TD align='center' valign='middle'><span style='"+x.width+"display:block;text-align:left;"+(x.style||"")+"'>"+(x.text||"")+"</span></TD>"+
"</TR>"+
"<TR><TD colspan=2 align='center' class='BOTON'>"+
"<TABLE><TR>";
ver = ver.replace(/,/g,"");
if( xButton.length==3 ){
xButton[2] = S.nsp(xButton[2]).split(",");
for(n=0; n<ver.length; n++){
if( xButton[2][n]!="" ) color[ver[n]] = ";color:"+xButton[2][n];
}
}
if( xButton.length==1 ) xButton[1] = "";
var xButton = (xButton[1]+",,,").split(","),
uButton = {},
nmButton = {a:S.lng(273), y:S.lng(270), n:S.lng(271), c:S.lng(272)};
for(n=0; n<ver.length; n++){
uButton[ver[n]] = xButton[n];
if( uButton[ver[n]]!="" ) nmButton[ver[n]] = uButton[ver[n]];
}
if( is("c",ver) ) txt += "<td><span v=-1 id='OP_CANCEL' class='Secundario' style='display:block"+color["c"]+"'>"+nmButton["c"]+"</span></td>";
if( is("n",ver) ) txt += "<td><span v=0 id='OP_NO' class='Secundario' style='display:block"+color["n"]+"'>"+nmButton["n"]+"</span></td>";
if( is("y",ver) ) txt += "<td><span v=1 id='OP_YES' style='display:block"+color["y"]+"'>"+nmButton["y"]+"</span></td>";
if( is("a",ver) ) txt += "<td><span v=2 id='OP_ACCEPT' style='display:block"+color["a"]+"'>"+nmButton["a"]+"</span></td>";
txt += 	"</tr></TABLE></TD></TR></TABLE></DIV>";
var ven = S(txt,top).nodeEnd().css("width:"+cor.sw+"px;height:"+cor.sh+"px;z-index:"+S.session.zMessage);
if( x.form ){
S("FORM .SELECTINPUT",top).each(function(k,o){
o.children[0].onfocus = function(){
S(o.children[0]).eventFire('click');
S.focusOff();
}
o.onclick = function(){
if( o.children[0].className=="READONLY" ) return;
S(o).menu(x.form[o.previousSibling.getAttribute("eInd")][1], {trigger:o.previousSibling, function:function(cod, lab, padre){
var p = padre.nextElementSibling.children[0];
padre.value = cod;
p.value = lab;
setTimeout(function(){S.fieldNext(p);}, 100);
}});
}
});
ven.obj["form"] = S("FORM[name=FRMALERT]",top).obj;
setTimeout(function(){
ven.obj["form"].elements[0].focus();
S.session.focus = ven.obj["form"].elements[0];
}, 500);
}
if( x.function ) ven.obj["function"] = x.function;
if( x.parameter ) ven.obj["parameter"] = x.parameter;
if( x.arg ) ven.obj["arg"] = x.arg;
if( x.click==undefined || x.click ){
S(ven).on("click", function(ev){
var win = window, n, error=[], e, eti,
op = S.eventObj(win.event),
obj = toTag(op, "span"), respuesta, arg=null;
if( ev.target.tagName!="SPAN" || obj.getAttribute("noSel")!=null ) return;
if( obj ){
var cmpTmp;
if( this.function ){
if( type(this.function)=="html" ){
cmpTmp = this.function;
}else{
if( this.form && /^(1|2)$/.test(obj.getAttribute("v")) ){
for(n=0; n<this.form.elements.length; n++){
e = this.form.elements[n];
eti =  S(e).toTag("TR").cells[0].innerText;
switch(e.getAttribute("eCND")){
case '#':
if( S(e).val()=="" ) error.push(S.lng(41, eti));
break;
case '=':
if( e.value.length==0 ) error.push(S.lng(39, eti));
else if( e.size!=e.value.length ) error.push(S.lng(40, eti));
break;
case '%':
if( S(e).val()!="" && e.size!=e.value.length ) error.push(S.lng(40, eti));
break;
}
}
if( error.length ){
e = S.session.zMessage;
S.session.zMessage += 100;
S.alert({
title:43,
icon:'<img src="g/sys_warning.gif">',
button:"A",
text:error.join("<br>")
});
S.session.zMessage = e;
return false;
}
}
if( this.parameter!=undefined ) arg = this.parameter;
if( this.arg!=undefined ) arg = this.arg;
respuesta = this.function(obj.getAttribute("v"), this.form?S(this.form).values():null, arg);
if( respuesta!=undefined ){
e = S.session.zMessage;
S.session.zMessage += 100;
S.alert({
title:43,
icon:'<img src="g/sys_warning.gif">',
button:"A",
text:respuesta
});
S.session.zMessage = e;
return false;
}
}
}
S(this).nodeRemove();
if( cmpTmp ) setTimeout(function(){
S.focus(cmpTmp);
}, 100);
}
return S.eventClear(win);
});
}
S(ven.obj.children[0]).center();
S.focusOff();
}
S.alertCheck = function(sg){
}
S.fn.fieldError = function(txt){
var obj = this.obj,
win = objWindow(obj);
S.session.focus = obj;
obj.focus();
S(obj, win).error(txt).obj["eFocus"] = obj;
if( win.document.body.eScrollTop!=null){
var p = win.document.body.eScrollTop;
setTimeout(function(){win.document.body.scrollTop=p;},0);
}
return S.eventClear(objWindow(obj));
}
S.linkField = function(o){
var txt = S(o).attr("eLinkField"),
win = objWindow(o), dim,n, dim2,i, v;
if(txt!=null){
dim = nsp(txt).split(",");
for(n=1; n<dim.length; n++){
if( dim[n-1].indexOf("+")>-1 ){
v = false;
dim2 = dim[n-1].split("+");
for(i=0; i<dim2.length; i++){
if( S(":"+dim2[i],win).val()!='' ) v=true;
}
}else{
v = (S(":"+dim[n-1],win).val()!='');
}
if( dim[n].indexOf("+")>-1 ){
dim2 = dim[n].split("+");
for(i=0; i<dim2.length; i++){
win.eEF(dim2[i], v);
}
}else{
if( !v ) S(":"+dim[n],win).val("");
win.eEF(dim[n], v);
}
}
}
}
S.fieldNext = function(el, cmpAnt){
if( !el || !el.form ) return false;
var dim = S(":"+el.form.name, objWindow(el)).obj.elements,
t = dim.length,
win = objWindow(el),
jump = "eNextField",
n, v, p=0, oJump, ok=false,
showZero = win._ShowZero,
WrapForm = (typeof(win._WrapForm)=="undefined" || win._WrapForm)? 2:1;
if( showZero==undefined ) showZero = S.setup.showZero;
if( win._ShowZeroFields && win._ShowZeroFields[this.obj.name]!=undefined ) showZero = win._ShowZeroFields[this.obj.name];
if( cmpAnt==undefined && win.event && win.event.shiftKey ) cmpAnt = true;
if( cmpAnt ){
var sDim=[];
for(n=t-1; n>=0; n--) sDim[p++] = dim[n];
dim = sDim;
jump = "ePreviousField";
}
for(p=0; p<WrapForm; p++) for(n=0; n<t; n++){
if( ok && S(dim[n]).attr(jump) ){
oJump = S(":"+S(dim[n], win).attr(jump)).obj;
oJump.focus();
if( !S(oJump).attr("readonly") && win.document.activeElement==oJump ){
if( dim[n].getAttribute("dcm")!=null ){
v = (S._thousandsClear(dim[n].value, dim[n].getAttribute("dcm")||0, showZero)+"");
if( showZero!=1 && S.replace(v,[["0",""],[",",""],[".",""]])=="" ) v = "";
dim[n].value = v;
}
return true;
}
}
if( el==dim[n] && p==0 ) ok = true;
if( dim[n].type=="fieldset" || dim[n].disabled || dim[n].readOnly || S(dim[n]).attr("readonly") || (dim[n].offsetWidth==0 && dim[n].eHTML!=1 && dim[n].type!="checkbox") ) continue;
if( ok && el!=dim[n] ){
dim[n].focus();
if( win.document.activeElement==dim[n] ){
if( dim[n].getAttribute("dcm")!=null ){
v = (S._thousandsClear(dim[n].value, dim[n].getAttribute("dcm")||0, showZero)+"");
if( showZero!=1 && S.replace(v, [["0",""],[",",""],[".",""]])=="" ) v = "";
dim[n].value = v;
}
}else if( dim[n].eHTML==1 ){
el = S("#"+dim[n].name+"_", win).obj;
win.edShow(el);
el.focus();
}
return true;
}
}
return false;
}
S.fieldLabel = function(obj){
var w = objWindow(obj), o, txt="";
if( obj.name=="" && w.document.title=="LIST" ){
S("TH",w).each(function(pk, o){
if( o.getAttribute("nc")==w._CellEdit.cellIndex ){
txt = "<b>"+o.innerHTML+"</b>";
return null;
}
});
return txt;
}
if( obj.name!="" ){
o = S("LABEL[for="+obj.name+"]", w).obj;
if( !o && w._DefCampo && w._DefCampo[obj.name] ){
o = w._DefCampo[obj.name].Label;
return (o!="") ? o : obj.name;
}
txt = o ? S(o).html().replace(/<BR>/gi, ' ') : obj.name;
}else{
return "";
}
return "<b>"+txt+"</b>";
}
S.labelFix = function(win, cmp){
var o = S("label[for='"+cmp+"']", win).obj,
n = o.offsetTop;
o.style.top = n+"px";
o.parentElement.style.verticalAlign = "top";
}
S.fitHeight = function(win, txt){
var o, pad, p;
if( type(txt)=="string" ) o = S(":"+txt, win).obj;
else o = S(txt).obj;
if( o!=null ){
pad = S(o).css("padding-top, padding-bottom");
p = pad["padding-top"]+pad["padding-bottom"];
S(o).attr({eFitHeight:o.offsetHeight-2, ePadding:p});
o.style.height = null;
if( o.scrollHeight>o.offsetHeight ){
o.style.height = o.scrollHeight+"px";
}
var mr = S(o).attr("eMaxRows");
if( mr!=null && (S(o).val().split("\n").length+1)>mr*1 ){
var d = S(o).css("lineHeight,fontSize");
if( d["lineHeight"]=="normal" ) d["lineHeight"] = 1.5;
o.style.height = ((d["fontSize"]*d["lineHeight"]*mr)-p)+"px";
}
}
}
S.fitWidth = function(o){
if( S.type(o)=="eDes" ) o = o.obj;
var c = S(o).css("width");
if( c=="auto" ){
if( S(":_INPUT_"+o.name, S.windowObject(o)).length ){
o = S(":_INPUT_"+o.name, S.windowObject(o));
}
var i = S(o).attr("eIntentos");
if( i==null ){
S(o).attr("eIntentos",0);
i = 0;
}
S(o).attr("eIntentos", i+1);
if( i<3 ) setTimeout(function(){ S.fitWidth(o); }, 100);
return;
}
if( o.scrollWidth==o.clientWidth ){
while( o.scrollWidth==o.clientWidth ){
o.style.width = (--c)+"px";
}
o.style.width = (++c)+"px";
}else{
while( o.scrollWidth>o.clientWidth ){
o.style.width = (++c)+"px";
}
}
}
S.chartDraw = function(oChart, p){
if( !p ) p=[];
if( !p["data"] ) p["data"] = S(oChart).attr("Definition");
if( !p["id"] ) p["id"] = "#BROWSE";
if( p["check"]==undefined ) p["check"] = true;
if( p["hidden"]==undefined ) p["hidden"] = false;
p["data"] = S.replace(p["data"], "&#39;","'", "&#34;",'"');
var tmp = p["data"].split("|"),n,dt=[], pt=[], lab=[], colNum=0, v, vMax=null, vMin, xCol="",
win = objWindow(oChart),
hidden = p["hidden"],
region = (win._ChartRegion ? win._ChartRegion:""),
resolution = (win._ChartResolution ? win._ChartResolution:""),
EsUnInforme = (typeof(win._InformeTH)!="undefined");
if(typeof(google)=="undefined"){
S(".CHART_STORE",win).none();
return;
}
for(n=0; n<tmp.length; n+=2){
tmp[n+1] = S.replace(tmp[n+1], "#124#", "|");
dt[tmp[n]] = tmp[n+1];
}
if( typeof(dt["texto"])!="undefined" ){
lab = dt["texto"].split("#44#");
}
var fields = S.nsp(dt["fields"]), cmp=[];
if( S.is("{", fields) ){
var divide=true, parte="";
for(n=0; n<fields.length; n++){
if( fields[n]=="{" ){
divide = false;
}else if( fields[n]=="}" ){
divide = true;
}else if( fields[n]=="," ){
if( divide ){
cmp.push(parte);
parte = "";
continue;
}
}
parte += fields[n];
}
if( divide ){
cmp.push(parte);
}
}else{
cmp = fields.split(",");
}
var dim=[], tipo=[], tmp=[], col=[], repe=[], n, maxLabel=0,
display = S(p["id"],win).css("display");
if( EsUnInforme ){
for(n=0; n<win._InformeTH.length; n++){
tipo[win._InformeTH[n][2]] = win._InformeTH[n];
}
}
S(p["id"],win).block();
S(p["id"]+" THEAD TH", win).each(function(pk, obj){
var o = S(obj);
if( o.css("display")!="none" ){
tipo[S.nsp(o.attr("oCampo"))] = [o.attr("nc"), o.attr("td"), S.trim(o.text()), o.attr("nd"), o.css("width"), o.obj];
}
});
S(p["id"],win).css("display",display);
for(n=0; n<cmp.length; n++){
col[n] = [ tipo[cmp[n]][1], tipo[cmp[n]][0] ];
if( tmp.length==0 ){
if( tipo[cmp[n]][1][0]=="+" || tipo[cmp[n]][1][0]=="-" ){
if(p["check"]) S.info(247, 3);
return false;
}
}
if( tipo[cmp[n]][1][0]=="+" || tipo[cmp[n]][1][0]=="-" ) colNum++;
if( typeof(lab[n])!="undefined" && lab[n]!="" ){
tmp.push(lab[n]);
}else{
tmp.push(tipo[cmp[n]][2]);
}
pt.push( tipo[cmp[n]][0] );
if( repe[cmp[n]] ){
if(p["check"]) S.info(S.lng(248, tipo[cmp[n]][2]), 3);
return false;
}
repe[cmp[n]] = 1;
}
dim.push(tmp);
if( colNum==0 ){
if(p["check"]) S.info(249, 3);
return false;
}
if( dim[0].length<2 ){
if(p["check"]) S.info(250, 3);
return false;
}
var maxRec = 40;
if( dt["chart"]=="BarChart" ){
maxRec = 60;
}else if( dt["chart"]=="PieChart" ){
maxRec = 10;
}else if( dt["chart"]=="GeoChart" ){
maxRec = 500;
}
S(p["id"]+" TBODY TR", win).each(function(pk, tr){
if( (pk>=maxRec && !EsUnInforme) || tr.className=="PieLista" ) return;
if( EsUnInforme && S.mid(tr.cells[0].id, 0, 4)!="GRTD" ) return;
var tmp=[];
for(n=0; n<col.length; n++){
if( !hidden && tr.offsetHeight==0 ) continue;
if( EsUnInforme && col[n][1]<0 ){
if( tr.cells[0].id!="GRTD"+(col[n][1]*-1) ){
return;
}
var txt = tr.cells[0].innerText;
if( txt=="" ) txt = S.mid(tr.cells[0].title, ": ","");
tmp.push(txt);
maxLabel = Math.max(maxLabel, S(tr.cells[0]).widthText(txt));
continue;
}
switch( col[n][0][0] ){
case '+': case '-':
v = S.thousandsClear( S(tr.cells[col[n][1]]).text() )*1;
tmp.push(v);
if( vMax==null ){
vMin = v;
vMax = v;
}
vMin = Math.min(vMin, v);
vMax = Math.max(vMax, v);
break;
default:
if(n==0) xCol+=S(tr.cells[col[n][1]]).text()+"<br>";
tmp.push( S(tr.cells[col[n][1]]).text() );
if( pk<2 ){
maxLabel = Math.max(maxLabel, S(tr.cells[col[n][1]]).widthText());
}
}
}
if( tmp.length>0 ) dim.push(tmp);
});
tipo[cmp[0]][4] = Math.min(maxLabel, tipo[cmp[0]][4])+15;
if( dim.length<2 ){
S(oChart).none();
return;
}else{
S(oChart).block();
}
if( !dt["width"] ) dt["width"] = 400;
if( !dt["height"] ) dt["height"] = 300;
var xc,yc,wc,hc,al, o=tipo[cmp[0]][5], minVer="", minHor="", ayadir=0;
if( dt["chart"]=="PieChart" ){
if( vMin<0 ){
if(p["check"]) S.info(251, 3);
return false;
}
xc = 15;
yc = 15+(dt["title"] ? 15:0);
hc = dt["height"]-(15*2);
wc = hc+30+tipo[cmp[0]][4];
dt["width"] = Math.max(wc+30, dt["width"]);
}else{
if( dt["chart"]=="BarChart" ){
al = tipo[cmp[0]][4];
if( o==null ) o = tipo[cmp[1]][5];
if( S(":informe").exists() && S("#"+dt["informe"],_WOPENER).attr("widthFixed")==1 ){
al = S(o).widthText(xCol);
}else{
for(n=1; n<dim.length; n++){
al = Math.max(al, S(o).widthText(dim[n][0]));
}
}
xc = al+10+(dt["vAxis"] ? 20:5);
al = S(o).widthText(vMax+"");
aCol = 15;
}else{
al = tipo[cmp[0]][4]*0.7071;
for(n=1; n<cmp.length; n++){
if( tipo[cmp[n]][4]>al ) al = tipo[cmp[n]][4];
}
xc = al+10;
aCol = 25;
}
yc = (dt["title"] ? 40:20);
wc = dt["width"]-xc-15-15-AnchoLeyenda(col, tipo, cmp, tmp)-15;
hc = dt["height"]-yc-al-(dt["hAxis"] ? 20:0);
if( dt["chart"]=="BarChart" ){
if( (dim.length-1)*aCol > hc ){
var inc = ((dim.length-1)*aCol)-hc;
dt["height"] = dt["height"]*1+inc;
hc += inc;
}
if( wc<150 ){
dt["width"] = dt["width"]*1+(150-wc);
wc = 150;
}
minHor = vMin>=0 ? 0:vMin;
}else{
if( (dim.length-1)*aCol > wc ){
var inc = ((dim.length-1)*aCol)-wc;
dt["width"] = dt["width"]*1+inc;
wc += inc;
}
if( hc<150 ){
dt["height"] = dt["height"]*1+(150-hc);
hc = 150;
}
minVer = vMin>=0 ? 0:vMin;
}
}
if( dt["list_width"]=="true" ){
n = S(p["id"],win).css("width");
ayadir = n-dt["width"];
if( ayadir>0 ){
dt["width"] = n;
wc += ayadir;
}
}
if( !S.setup.listFontSize ) S.setup.listFontSize = parseInt(S.ruleGet(top, ".BODYLIST", "font-size"));
var data = google.visualization.arrayToDataTable(dim),
options = {
fontSize: 10,
width: dt["width"],
height: dt["height"],
pieSliceText: dt["pieSliceText"] || "",
chartArea:{
left: xc,
top: yc,
width: wc,
height: hc
},
title: dt["title"],
hAxis: {
minValue: minHor,
title: dt["hAxis"]
},
vAxis: {
minValue: minVer,
title: dt["vAxis"]
},
legend: {
labeledValueText: 'both',
textStyle: {
fontSize: 10,
}
},
bar: { groupWidth: '75%' },
is3D: dt["is3D"],
pieHole: (dt["pieHole"]=="true" ? 0.4:0),
isStacked: dt["isStacked"],
curveType: (dt["curveType"]=="true" ? "function":""),
tooltip: {isHtml: false},
region: region,
resolution: resolution
};
if( dt["_colores"] ){
var tmp = dt["_colores"].split(","),
attr = (dt["chart"]=="PieChart") ? "slices":"series";
options[attr]={};
for(n=0; n<15; n++){
options[attr][n]={};
options[attr][n]["color"] = tmp[n];
}
}
if(p["check"]){
var pChart = new google.visualization[dt["chart"]](oChart);
if( p["function"] ){
if( !win.eChart ) win.eChart = [];
if( !win.eData ) win.eData = [];
win.eChart[S.mid(p["id"],1,0)] = pChart;
win.eData[S.mid(p["id"],1,0)] = data;
google.visualization.events.addListener(pChart, 'select', function(){
var k, pk, selectedItem, topping, valor="", label="";
for(k in win.eData){
selectedItem = win.eChart[k].getSelection()[0];
if(selectedItem) break;
}
if(selectedItem && selectedItem.row!=null){
topping = win.eData[k].getValue(selectedItem.row, 0);
if( selectedItem.column!=undefined ){
valor = win.eData[k].getValue(selectedItem.row,selectedItem.column);
label = win.eData[k]["Mf"][selectedItem.column]["label"];
}
p["function"](k, topping, valor, label);
win.eChart[k].setSelection();
}
});
}
pChart.draw(data, options);
return true;
}else{
return[dt["chart"], data, options];
}
function AnchoLeyenda(col, tipo, cmp, tmp){
var n,a=0;
for(n=1; n<col.length; n++){
a = Math.max(a, S(tipo[cmp[n]][5]).widthText(tmp[n]));
}
return a;
}
}
S.chartRedraw = function(win){
S(".CHART_SYSTEM", win).each(function(p, o){
S.chartDraw(o);
});
S(".CHART_USER", win).each(function(p, o){
S.chartDraw(o);
});
}
S.selectionClear = function(){
if(document.selection) document.selection.empty();
else if(window.getSelection) window.getSelection().removeAllRanges();
}
S.posCursor = function(obj, p){
var start, end, NAV="", win=objWindow(obj);
if( typeof obj.selectionStart=="number" && typeof obj.selectionEnd=="number" ) NAV = "COM";
else if( win.document.selection && win.document.selection.createRange ) NAV = "IE8";
if( p!=undefined ){
if( NAV=="COM" ){
obj.selectionStart = obj.selectionEnd = p;
}else if( NAV=="IE8" ){
text = obj.createTextRange();
text.collapse(true);
text.move("character", p);
text.select();
}
return;
}
if( NAV=="COM" ){
start = obj.selectionStart;
end = obj.selectionEnd;
if( !S.setup.modeInsert ) end++;
}else if( NAV=="IE8" ){
var select = win.document.selection.createRange(),
otext = obj.createTextRange(),
text = obj.createTextRange();
text.moveToBookmark(select.getBookmark());
otext.setEndPoint("EndToStart", text);
start = otext.text.length;
end = start + select.text.length;
if( !S.setup.modeInsert ) end++;
}
return[start, end];
}
S.posCursorHtml = function(obj, start, end){
var win=objWindow(obj);
if (window.getSelection && document.createRange) {
var charIndex = 0, range = win.document.createRange(),
nodeStack = [obj], node, foundStart = false, stop = false,
nextCharIndex, sel, i;
range.setStart(obj, 0);
range.collapse(true);
while( !stop && (node=nodeStack.pop()) ){
if( node.nodeType==3 ){
nextCharIndex = charIndex+node.length;
if( !foundStart && start>=charIndex && start<=nextCharIndex ){
range.setStart(node, start-charIndex);
foundStart = true;
}
if (foundStart && end>=charIndex && end<=nextCharIndex) {
range.setEnd(node, end-charIndex);
stop = true;
}
charIndex = nextCharIndex;
}else{
i = node.childNodes.length;
while(i--){
nodeStack.push(node.childNodes[i]);
}
}
}
sel = win.getSelection();
sel.removeAllRanges();
sel.addRange(range);
}else if( document.selection ){
var textRange = win.document.body.createTextRange();
textRange.moveToElementText(obj);
textRange.collapse(true);
textRange.moveEnd("character", end);
textRange.moveStart("character", start);
textRange.select();
}
}
S.selectText = function sel(input, inicio, fin){
input = S(input).obj;
if( typeof document.selection!='undefined' && document.selection ){
var text=input.value;
input.value='';
input.focus();
var str = document.selection.createRange();
input.value=text;
str.move('character', inicio);
str.moveEnd("character", fin-inicio);
str.select();
}else if( typeof input.selectionStart!='undefined' ){
input.setSelectionRange(inicio,fin);
input.focus();
}
}
S.keyPaste = function(obj, type, lon, dec, sType, otype, typeBak){
var win = objWindow(obj),
txt = obj.value,
long = txt.length,
xAccent = obj.getAttribute("eAccent"),
n, t, newTxt="", newChar;
obj.value = "";
for(n=0; n<long; n++){
t = newTxt.length;
newChar = S.key_Char(type, t, newTxt.substring(0,t), txt[n], "", lon, dec, xAccent, sType, "", typeBak, win, obj);
newTxt += newChar;
}
obj.value = newTxt;
}
S.key_Char = function(otype, pos, izq, char, dch, long, dec, accent, sType, noChar, typeBak, win, obj){
var nEnter = 0, keyAdd="";
function tieneEspacio(txt, lon){
return(S.replace(txt, [
['"',"&#34;"],
["'","&#39;"],
["<","&#60;"],
[">","&#62;"],
["\\","&#92;"]
]).length<=lon || lon==-1);
}
if( pos==0 && win._Question && '<=>'.indexOf(char)>-1 && obj.getAttribute("noConditions")==null && obj.form.name!="GETCONDITION" ){
win._EditCondition(obj,char);
S.eventClear(win);
return noChar;
}
if( sType=="s" ){
if( otype=="#" ){
nEnter = ((izq+char+dch).split("\n").length-1);
if( !tieneEspacio(izq+char+dch, long) ) return noChar;
return (((izq+char+dch).length+nEnter)<=long || long==-1) ? char : "";
// }else if( !tieneEspacio(izq+char+dch, long) ) return noChar;
}else if( !(/^(\+\,|\-\,)$/.test(otype) && dec>0) && !tieneEspacio(izq+char+dch, long) ) return noChar;					// {nuevo}
var n, txt,
type = keyCheck[otype] ? otype : keyCheckBin[otype],
check2 = S.type(keyCheck[type])=="array" ? keyCheck[type] : [keyCheck[type]],
check = new Array();
if( type==undefined || S.type(keyCheck[type])=="undefined" ) return noChar;
for(n=0; n<check2.length; n++) check[n] = check2[n];
if( obj.getAttribute("eAddChar")!=null ){
for(n=0; n<check.length; n++) if( (check[n]+"").indexOf("{SEEK}")>-1 ){
check[n] = (check[n]+"").replace("{SEEK}", obj.getAttribute("eAddChar")+"{SEEK}");
}
}
if( obj.getAttribute("eDeleteChar")!=null && obj.getAttribute("eDeleteChar").indexOf(char)>-1 ){
return noChar;
}
for(n=0; n<check.length; n++){
if( S.type(check[n])=="string" ) check[n] = [check[n]];
if( S.type(check[n][0])=="function" ){
continue;
}else if( check[n][0]=="c" ){
if( check[n][1]==char ) char = check[n][2];
}else if( check[n][0]=="U" ){
char = upper(char);
}else if( check[n][0]=="L" ){
char = lower(char);
}else if( check[n][0]=="v" ){
if( check[n][1]==izq+char+dch ){
char = check[n][2];
}
}else{
txt = check[n][0].replace("{LONG-1}","{0,"+(long-1)+"}").replace("{LONG}","{0,"+long+"}").replace("{DEC}","{0,"+dec+"}");
if( otype=="@" || accent==1 || S.setup.accent.status ){
txt = S.replace(txt,
"{ACCENTUPR}",S.setup.accent.upperOn,
"{ACCENTLWR}",S.setup.accent.lowerOn,
"{ACCENTALL}",S.setup.accent.upperOn+S.setup.accent.lowerOn
);
}else{
txt = S.replace(txt,
"{ACCENTUPR}","",
"{ACCENTLWR}","",
"{ACCENTALL}",""
);
}
if( obj.getAttribute("eKeyAdd")!=null ){
keyAdd = "\\"+obj.getAttribute("eKeyAdd");
}
txt = txt.replace("{SEEK}", (win._Question) ? "*\\?"+keyAdd : ""+keyAdd);
if( !(new RegExp(txt)).test(izq+char+dch) ){
return noChar;
}
}
if( !/^(\+|\+\,|\-|\-\,)$/.test("+,") && /^(c|U|L|v)$/.test(check[n][0]) && !tieneEspacio(izq+char+dch, long) ) return noChar;
}
return char;
}
if( sType=="r" ){
nEnter = ((izq+char+dch).split("\n").length-1);
if( ((izq+char+dch).length+nEnter)>long && long!=-1 ) return noChar;
if( !otype.test(izq+char+dch) ){
char = upper(char);
if( !otype.test(izq+char+dch) ){
char = lower(char);
if( !otype.test(izq+char+dch) ) return noChar;
}
}
return char;
}
if( sType!="f" ) return noChar;
if( /(h|t)/i.test(char) && /(F4|P4)/i.test(typeBak) ){
obj.value = (typeBak=="F4")? S.date(_FormatDate) : S.date(_FormatMonth);
S.fieldNext(obj);
return "";
}
var type = S.mid(otype,1,0),
p = izq.length,
lc, mas="", formato=[], nextSymb=-1;
if( type.indexOf("{")>-1 ){
var n,j,txt,i=0;
lc = type.length;
for(n=0; n<lc; n++){
if( type[n]=="{" ){
txt = "";
for(j=n+1; j<lc; j++){
if( type[j]=="}" ){
if( i>p && nextSymb==-1 ) nextSymb = i;
formato[i++] = txt;
n = j;
break;
}
txt += type[j];
}
}else{
formato[i++] = type[n];
}
}
}else{
formato = type.split("");
}
lc = formato.length;
s = formato[p];
if( p>=lc ) return noChar;
if( p>0 && nextSymb>-1 && (p+1)==nextSymb && formato[nextSymb].indexOf(char)>-1 && formato[nextSymb].indexOf(S.right(izq,1))==-1 && obj.value[p-1]!="0" ){
if( !((typeBak=="F4" && S.setup.date[0]=="y" || typeBak=="P4" && S.setup.month[0]=="y") && p<5) ){
obj.value = S.left(obj.value,obj.value.length-1)+"0"+S.right(obj.value,1);
return formato[nextSymb][0];
}
}
if( formato[p].indexOf(char)>-1 && "0123456789#AaSHh".indexOf(char)==-1 ){
return formato[p][0];
}else if( s.length==1 ){
while( "0123456789#AaSHh".indexOf(s)==-1 && p<lc ){
mas += s;
s = formato[++p];
}
if( (typeBak+"-"+pos)=="P4-2" && p==2 && (char=="-" || char=="/" || char=="." || char==" ") ){
return ["-", "20"];
}
if( /^(F4|P4)$/.test(typeBak) && upper(char)!=lower(char) ) return noChar;
if( S.keyCheckVal[typeBak+"-"+pos] ){
var i = typeBak+"-"+pos,
x = mid(izq+char,-S.keyCheckVal[i][0]);
try{
if( S.keyCheckVal[i].length==3 ){
if( eval(S.replace(S.keyCheckVal[i][1],"#",x)) ){
return S.keyCheckVal[i][2]+char;
}
}else if( !eval(S.replace(S.keyCheckVal[i][1],"#",x)) ){
return noChar;
}
}catch(e){
return noChar;
}
}
}else{
mas = formato[p][0];
s = formato[++p];
pos = p;
if( S.keyCheckVal[typeBak+"-"+pos] ){
var i = typeBak+"-"+pos,
x = mid(izq+char, -S.keyCheckVal[i][0]);
try{
if( S.keyCheckVal[i].length==3 && upper(x)==lower(x) && eval(S.replace(S.keyCheckVal[i][1], "#", x)) ){
mas += S.keyCheckVal[i][2];
}
}catch(e){}
}
}
if( upper(s)!=lower(s) ){
if( s=="S" ){
if( eCONFIG["char_dow"]["symbol"].is(char) ) return noChar;
}else if( /^h/i.test(s) ){
if( !/^[0-9a-fA-F]{1}$/.test(char) ) return noChar;
char = (s=="H") ? upper(char) : lower(char);
}else{
if( !/^[a-zA-Z]{1}$/.test(char) ) return noChar;
if( s!="#" ) char = (s=="A") ? upper(char) : lower(char);
}
}else if( (s*1)+""==s ){
if( !(new RegExp('^[0-'+s+']{1}$')).test(char) ) return noChar;
}else{
if( eCONFIG["char_dow"]["symbol"].is(char) ) return noChar;
}
return mas+char;
}
S.key_ = function(obj, type, lon, dec, sType, otype, typeBak, oEv){
var win = objWindow(obj),
evt = win.event || oEv,
tmp, sz, o;
if( obj.readOnly ) return S.eventClear(win, evt);
if( type=="##" && (evt.type=="keypress" || evt.type=="keydown") ){
if( evt.type=="keydown" ){
if( evt.keyCode==121 ){
var Mas = "";
if( evt.altKey ) Mas = "a";
if( evt.ctrlKey ) Mas = "c";
if( evt.shiftLeft ) Mas = "s";
win._ConCtrlKey = (Mas=="c")?2:0;
win._F10(Mas, evt);
}else if( evt.keyCode==13 || evt.keyCode==9 ){
S.fieldNext(obj);
return S.eventClear(win, evt);
}
}
return true;
}
if( evt.type=="keydown" ){
var pk = S.eventCode(evt), sal=0;
if( obj.type=="checkbox" ){
if( S.is(pk, [187,89,89,83]) ){
S(obj).val(S.setup.checkOn);
sal = 1;
}else if( S.is(pk, [189,78,46,8]) ){
S(obj).val("");
sal = 1;
}
}else if( obj.type=="radio" ){
if( S.is(pk, [187,89,89,83]) ){
obj.checked = true;
sal = 1;
}else if( S.is(pk, [189,78,46,8]) ){
obj.checked = false;
sal = 1;
}else if( pk==32 ){
obj.checked = !obj.checked;
sal = 1;
}
}
if(sal) return S.eventClear(win, evt);
switch( pk ){
case 13:
if( !S.setup.enter ) break;
if( !evt.ctrlKey && obj.tagName=="TEXTAREA" ){
var attr = S(obj).attr("eNoScroll,eFitHeight");
if( attr["eNoScroll"]!=null ){
var old = obj.value;
setTimeout(function(){
if( obj.clientHeight!=obj.scrollHeight ){
obj.value = old;
}
},1);
}else if( attr["eFitHeight"]!=null ){
setTimeout(function(){
var mas = S(obj).attr("ePadding")*1,
mr = S(obj).attr("eMaxRows"),
func = S(obj).attr("eFunction");
if( mr!=null && (S(obj).val().split("\n").length+1)>mr*1 ){
}else if( (obj.scrollHeight-mas)<attr["eFitHeight"] ){
obj.style.height = attr["eFitHeight"]+"px";
}else{
obj.style.height = (obj.scrollHeight-mas)+"px";
}
if( func!=null ) win[func](pk, obj);
}, 1);
}
return true;
}
case 9:
S.session.lastKey = pk;
if( /^(F4|P4|H8|H5|H2)$/i.test(typeBak) ) obj.value = S.format(typeBak, obj.value);
win.document.body.eScrollTop = win.document.body.scrollTop;
if( S(obj).attr("eLinkField")!=null ){
S.linkField(obj);
}
if( S.fieldNext(obj, evt.shiftKey) ){
if( obj==win.document.activeElement && obj["eChange"] && obj.onchange ){
obj["eChange"] = 0;
S(obj).eventFire("change");
}
}
setTimeout(function(){win.document.body.eScrollTop=null;},0);
if(obj.getAttribute("eFireChange")!=null ){
win[obj.getAttribute("eFireChange")](obj, null, pk);
}
if( obj["eJumpFunc"] ){
obj.blur(obj, S.session.lastKey, evt);
}
return S.eventClear(win, evt);
case 121:
S.session.lastKey = pk;
if( obj.form.name=="NoSubmit" ){
win[obj.form.getAttribute("eFunction")](obj.form);
return S.eventClear(win, evt);
}
var Mas = "";
if( evt.altKey ) Mas = "a";
if( evt.ctrlKey ) Mas = "c";
if( evt.shiftLeft ) Mas = "s";
if( obj.form.name=="GETCONDITION" ){
win._EditConditionOk();
return S.eventClear(win, evt);
}
if( obj.form.name=="FRMALERT" ){
if( S("#ALERT #OP_ACCEPT").length ) S("#ALERT #OP_ACCEPT").eventFire("click");
else if( S("#ALERT #OP_YES").length ) S("#ALERT #OP_YES").eventFire("click");
return S.eventClear(win, evt);
}
if( win._Obj=="F" || win._Obj=="G" ){
if( win._Question && obj.CopyOf!=undefined ){
win._EditConditionOk();
return S.eventClear(win, evt);
}
if( !win.ConF10 ) return false;
if( S(obj).attr("eLinkField")!=null ){
S.linkField(obj);
}
win.document.body.focus();
if( win._Mode=="cR" && S("#OpExe").obj.outerHTML.indexOf("g/op_close")>-1 ){
setTimeout(function(){
S(win).window();
}, 200);
return S.eventClear(win, evt);
}
if( !S.isReady(win) ) return false;
win._ConCtrlKey = (Mas=="c")?2:0;
win._F10(Mas, evt);
return false;
}
break;
case 119:
if( typeof(win._FilterUser)=="function" && typeof(win._Mode)!="undefined" && /^(b|c|m)$/.test(win._Mode) ) win._FilterUser(obj.name);
break;
case 120:
if( evt.ctrlKey ){
if( typeof(win._SetDefault)=="function" ) win._SetDefault(obj);
break;
}
o = win.eIndex(obj.sourceIndex+1);
if( o.id=='_'+obj.name && o.innerText=="C" ){
if( obj.value!='' ){
top.Memoriza(o, win);
}else{
top.Restaura(win.eIndex(obj.sourceIndex+2), win);
}
}else{
if( obj.value!='' ){
S(obj).info(37, 1);
_F9Mem[obj.name] = obj.value;
}else{
if( _F9Mem[obj.name]!=undefined )  win.ePF(obj.name, _F9Mem[obj.name]);
}
}
break;
case 45:
S.setup.modeInsert = !S.setup.modeInsert;
break;
case 27:
S.session.lastKey = pk;
if( (win.frameElement && win.frameElement.getAttribute("eCloseEsc"))!=null ){
alert("cierra subventana");
}
if( S("#TIP",win).exists() && S("#TIP",win).obj["eType"]=="ERROR" ){
S.error();
return S.eventClear(win, evt);
}
obj["eChange"] = 0;
obj.value = obj["eBak"];
if(obj.getAttribute("eFireChange")!=null ){
win[obj.getAttribute("eFireChange")](obj, null, pk);
}
break;
case 38:
break;
case 40:
break;
case 8:
case 46:
obj["eChange"] = 1;
var oValue = obj.value;
if(oValue=="") break;
var p = S.posCursor(obj),
newChar = (sType!="f") ? "" : S.char(S.setup.charDelete),
oChar = newChar;
long = obj.value.length,
start = p[0],
end = start+1,
newPos = p[0];
if( (p[0]==0 && p[1]==long) || obj.value==S.repeat(newChar,long) ){
obj.value = "";
if( obj["eSelectPK"] ){
S(":_INPUT_"+obj.name, win).val("");
}
}else{
if( pk==8 ){
if( p[0]==p[1] ){
if(p[0]==0 ) break;
start--;
if( p[1]==long ){
newChar="";
}else{
newPos--;
end--;
}
}else if( p[1]-p[0]==1 ){
start--;
newPos--;
end--;
}else if( p[1]-p[0]!=1 ){
end += (p[1]-p[0])-1;
newChar = S.repeat(newChar,p[1]-p[0]);
}
}else{
if( p[0]==p[1] ){
if( p[1]+1==long ){
newChar="";
}
}else if( p[1]-p[0]!=1 ){
end += (p[1]-p[0])-1;
newChar = S.repeat(newChar,p[1]-p[0]);
if( start+(p[1]-p[0])==long ) newChar = "";
}
}
obj.value = obj.value.slice(0,start) + newChar + obj.value.slice(end);
while(oChar!="" && S.mid(obj.value,-1)==oChar) obj.value = S.mid(obj.value,0,-1);
if( obj["eSelectPK"] ){
pintaSelect(obj, obj.value, false);
}
S.posCursor(obj,newPos);
}
if( obj.tagName=="TEXTAREA" ){
var attr = S(obj).attr("eNoScroll,eFitHeight");
if( attr["eFitHeight"]!=null ){
setTimeout(function(){
var mas = S(obj).attr("ePadding")*1,
mr = S(obj).attr("eMaxRows"),
func = S(obj).attr("eFunction");
if( mr!=null && (S(obj).val().split("\n").length+1)>mr*1 ){
}else{
obj.style.height = attr["eFitHeight"]-mas+"px";
if( (obj.scrollHeight-mas)>attr["eFitHeight"] ){
obj.style.height = (obj.scrollHeight-mas)+"px";
}
}
if( func!=null ) win[func](pk, obj);
}, 1);
}
}
if(obj.getAttribute("eFireChange")!=null ){
win[obj.getAttribute("eFireChange")](obj, oValue, pk);
}
return S.eventClear(win, evt);
case 115:
if( /^(?:I|IMG)$/i.test(win.eIndex(obj.sourceIndex+1).tagName) ){
S.eventFire(win.eIndex(obj.sourceIndex+1), "click");
return S.eventClear(win, evt);
}
break;
case 112:
if( !tipShow(obj, true, null) ){
var o = S("I.ICONINPUT[iHelp='"+obj.name+"']", win);
if( o && o.exists() ){
o.eventFire("click");
}else{
S.help(win);
}
}
return S.eventClear(win, evt);
}
return true;
}else if( evt.type=="focusout" ){
if( S.session.focus!=null && obj.name!=S.session.focus.name ){
return S.eventClear(win, evt);
}
if( S.session.focus!=null && obj.name==S.session.focus.name ){
if( S("#TIP",win).exists() && S("#TIP",win).obj["eType"]=="ERROR" ){
return S.eventClear(win, evt);
}
}
if( obj.type=="radio" ){
return S.eventClear(win, evt);
}
if( S(obj).attr("NotFilter")!=null ){
}else if( obj.tagName=="TEXTAREA" ){
obj.value = S.trimTextArea(obj.value);
}else{
obj.value = trim(obj.value);
}
S(obj).class(">ERROR,EDITABLE");
if( obj.type=="checkbox" ){
S.session.focus = null;
obj.removeAttribute("eBak");
obj["eChange"] = 0;
return;
}
if( S(obj).attr("eLinkField")!=null ){
S.linkField(obj);
}
if(obj.getAttribute("eFireChange")=="eFireChange" && S("#SelBROWSER",win).attr("field")==obj.name && obj["eChange"] ){
win[obj.getAttribute("eFireChange")](obj, null, (S("#SelBROWSER",win).css("display")!="block") ? 9:-2);
}
if( win._Question && obj.getAttribute("eSeekTitle")!=null && !/^(\<|\=|\>)$/.test(obj.value[0]) ){
obj.title = obj.getAttribute("eSeekTitle");
obj.removeAttribute("eSeekTitle");
}
if( obj.value=="" ){
S.session.focus = null;
if( obj["eChange"]==1 && (obj.onchange || obj["eSelectPK"]==1) ){
var oTABLE = S("#"+obj.name.replace("_INPUT_","")+"_TABLE", win).obj;
if( !oTABLE ){
if( obj["eChange"] ) S.eventFire(obj, "change");
}else{
setTimeout(function(){
obj["eChange"] = 0;
S.eventFire(obj, "change");
}, 200);
}
}
obj["eChange"] = 0;
if( obj["eJumpFunc"] ){
obj["eJumpFunc"](obj, S.session.lastKey, evt);
}
sz = win._ShowZero;
if( win._ShowZeroFields && win._ShowZeroFields[obj.name]!=undefined ) sz = win._ShowZeroFields[obj.name];
if( sz==1 ){
switch( typeBak ){
case "-":
case "-,":
if( obj.value=="-" ) obj.value = "";
if( obj.value=="-0"+S.setup.decimal ) obj.value = "0";
case "+":
case "+,":
if( obj.value=="0"+S.setup.decimal ) obj.value = "0";
obj.value = S.thousands(S.thousandsClear(obj.value), dec||0, sz);
break;
}
}
return true;
}else if( /^(F4|P4|H8|H5|H2)$/i.test(typeBak) ){
if( /^(\<|\=|\>)$/.test(obj.value[0]) ){
var dim = obj.value.split(/\<|\=|\>/), n;
for(n=0; n<dim.length; n++){
if( dim[n]!="" && /^(F4|P4)$/i.test(typeBak) && !S.check(({P4:"P", F4:"D"})[typeBak], dim[n]) ){
if( S("#GetCondition", win).obj.offsetWidth>0 ) S("#GetCondition", win).none();
return S(obj).fieldError('Fecha erronea en "'+S.fieldLabel(obj)+'"' );
}
}
}else{
obj.value = S.format(typeBak, obj.value);
}
}
if( type!="@" && type[0]=="@" ){
var xtype = S.colapse(mid(type,1,0),"{","}","#");
if( obj.value.indexOf(S.char(S.setup.charDelete))>-1 || (obj.value.length!=xtype.length && win._Mode && !/^(c|m|b)$/.test(win._Mode)) ){
return S(obj).fieldError('Al campo "'+S.fieldLabel(obj)+'" le faltan caracteres' );
}
type = otype;
}
if( obj.value!="" ){
var val = obj.value,
cnd = S(obj).attr("eFrom,eTo");
if( /^(\-|\-,|\+|\+,)$/i.test(typeBak) ){
val = S.thousandsClear(val);
if( cnd.eFrom && val<cnd.eFrom*1 ){
obj.value = cnd.eFrom;
return S(obj).fieldError('El valor de "'+S.fieldLabel(obj)+'" no puede ser inferior a "'+S.thousands(cnd.eFrom.replace(S.setup.decimal,"."), dec||0)+'"');
}
if( cnd.eTo && val>cnd.eTo*1 ){
obj.value = cnd.eTo;
return S(obj).fieldError('El valor de "'+S.fieldLabel(obj)+'" no puede ser superior a "'+S.thousands(cnd.eTo.replace(S.setup.decimal,"."), dec||0)+'"');
}
}else if( typeBak=="F4" ){
if( val.length==10 ){
if( !S.check("D", val) ){
return S(obj).fieldError('Fecha erronea en "'+S.fieldLabel(obj)+'"' );
}
val = S.d2s(val);
if( cnd.eFrom && val<cnd.eFrom ){
return S(obj).fieldError('El valor de "'+S.fieldLabel(obj)+'" no puede ser inferior a "'+S.d2s(cnd.eFrom)+'"');
}
if( cnd.eTo && val>cnd.eTo ){
return S(obj).fieldError('El valor de "'+S.fieldLabel(obj)+'" no puede ser superior a "'+S.d2s(cnd.eTo)+'"');
}
}
}else if( typeBak=="P4" ){
if( cnd.eFrom && val<cnd.eFrom ){
return S(obj).fieldError('El valor de "'+S.fieldLabel(obj)+'" no puede ser inferior a "'+cnd.eFrom+'"');
}
if( cnd.eTo && val>cnd.eTo ){
return S(obj).fieldError('El valor de "'+S.fieldLabel(obj)+'" no puede ser superior a "'+cnd.eTo+'"');
}
}
switch( typeBak ){
case "-":
case "-,":
if( obj.value=="-" ) obj.value = "";
if( obj.value=="-0"+S.setup.decimal ) obj.value = "0";
case "+":
case "+,":
if( obj.value=="0"+S.setup.decimal ) obj.value = "0";
sz = win._ShowZero;
if( win._ShowZeroFields && win._ShowZeroFields[obj.name]!=undefined ) sz = win._ShowZeroFields[obj.name];
obj.value = S.thousands(val, dec||0, sz);
break;
case "F4":
case "P4":
case "CP":
if( win._Mode && !/^(c|m|b)$/.test(win._Mode) && !S.check(typeBak, obj, obj.value) ) return S.eventClear(win, evt);
break;
case "P":
break;
case '@':
case 'W':
if( win._Mode && !/^(c|m|b)$/.test(win._Mode) ){
if( obj.value.length<4 ) return S(obj).fieldError('Error en la longitud del campo "'+S.fieldLabel(obj)+'"');
}
break;
case 'NIF':
if( win._Mode && !/^(c|m|b)$/.test(win._Mode) ){
if( obj.value.length!=9 ) return S(obj).fieldError('Error en la longitud del campo "'+S.fieldLabel(obj)+'"');
}
break;
case "IP":
if( obj.value!="" && !(/^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/).test(obj.value) ) return S(obj).fieldError('Error en el campo "'+S.fieldLabel(obj)+'"');
break;
}
}
if( sType=="s" ){
type = keyCheck[type] ? type : keyCheckBin[type];
if( funcCheck[type] && !funcCheck[type](obj.value) ){
S(obj).error("Error en el campo...").attr("eFocus",obj);
return;
}
}
if( S(obj).attr("eHelp") ) S.info();
if( obj["eChange"]==1 && (obj.onchange || obj["eSelectPK"]==1) ){
var oTABLE = selectTable(obj);
if( !oTABLE ){
S.eventFire(obj, "change");
}else{
var recargar = obj["eBak"]!=obj.value;
if( obj["eChange"]==1 ){
setTimeout(function(){
if( obj.name.indexOf("_INPUT_")==-1 ){
if( obj["eValueTmp"] ) obj.value = obj["eValueTmp"];
obj["eChange"] = 0;
obj = S(":_INPUT_"+obj.name,win).obj;
}
obj["eChange"] = 0;
if( recargar ){
S.eventFire(obj, "change");
}
}, 200);
}
}
}
S.session.focus = null;
obj.removeAttribute("eBak");
S(obj).class(">ERROR,EDITABLE");
obj["eChange"] = 0;
if( obj["eJumpFunc"] ){
obj["eJumpFunc"](obj, S.session.lastKey, evt);
}
return true;
}else if( obj.type=="radio" && evt.type=="focus" ){
return S.eventClear(win, evt);
}
var nChar = S.eventCode(evt),
xChar = S.char(nChar);
if( nChar && nChar<32 ) return true;
var val = obj.value,
newChar = "",
start, end, dim;
dim = S.posCursor(obj);
start = dim[0];
end = dim[1];
if( S.setup.modeInsert && sType=="f" ) end++;
if( obj.getAttribute("NoFilter") ){
newChar = xChar;
}else{
newChar = S.key_Char(type, start, val.slice(0,start), xChar, val.slice(end), lon, dec, obj.getAttribute("eAccent"), sType, val.slice(start,end), typeBak, win, obj);
if( val!=obj.value ){
val = obj.value;
start++;
end++;
}
if( S.type(newChar)=="array" ){
start += newChar[1].length;
end += newChar[1].length;
val = newChar[1]+val;
newChar = newChar[0];
}
}
if( obj["eSelectPK"] ){
if( !pintaSelect(obj, val.slice(0,start) + newChar + val.slice(end+newChar.length-1), false) ){
return;
}
}
if( newChar!="" ){
obj["eChange"] = 1;
var oValue = obj.value,
shi = obj.scrollHeight, she,
swi = obj.scrollWidth, swf;
obj.value = val.slice(0,start)+newChar+val.slice(end+newChar.length-1);
she = obj.scrollHeight;
swe = obj.scrollWidth;
if( obj.tagName=="TEXTAREA" ){
var attr = S(obj).attr("eNoScroll,eFitHeight");
if( attr["eNoScroll"]!=null ){
if( obj.clientHeight!=obj.scrollHeight ){
newChar = "";
obj.value = oValue;
obj.style.overflowY = "hidden";
}
}else if( attr["eFitHeight"]!=null ){
var mas = S(obj).attr("ePadding")*1,
mr = S(obj).attr("eMaxRows");
if( mr!=null && (S(obj).val().split("\n").length+1)>mr*1 ){
}else{
if( (obj.scrollHeight+mas)<attr["eFitHeight"] ){
obj.style.height = attr["eFitHeight"]+"px";
}else{
obj.style.height = (obj.scrollHeight-mas)+"px";
}
}
}
if( obj.value.length==end+1 ) obj.scrollTop = obj.scrollHeight;
else obj.scrollTop = obj.scrollTop+she-shi;
}else{
if( obj.value.length==end+1 ) obj.scrollLeft = obj.scrollWidth;
else obj.scrollLeft = obj.scrollLeft+swe-swi;
}
if(obj.getAttribute("eFireChange")!=null ){
win[obj.getAttribute("eFireChange")](obj, oValue);
}
}
if( S(obj).attr("eOnChangeAlways") ){
S.eventFire(obj, "change");
}
S.posCursor(obj, start+newChar.length);
return S.eventClear(win, evt);
function pintaSelect(obj, Buscar, salir){
try{
var oValor = S.regExp(Buscar),
Patron = new RegExp(oValor,"i"),
win = objWindow(obj),
tr = selectTable(obj).rows,
t = tr.length,
enAttr = (t>0 && tr[0].getAttribute("v")!=null),
nVisible=0,
iObj = selectLabel(obj),
sValor = iObj.value,
ok=false, valor, p, n;
}catch(e){
return S.eventClear(win);
}
iObj.value = "";
iObj.placeholder = '';
for(n=0; n<t; n++){
if( enAttr ){
valor = tr[n].getAttribute("v");
p = tr[n].getAttribute("r");
}else{
valor = tr[n].cells[1].textContent;
p = n;
}
if( Patron.test(valor) ){
valor = tr[p].cells[1].textContent;
if( nVisible++==0 ){
if( salir ){
iObj.placeholder = valor;
}else{
iObj.value = valor;
ok = true;
obj["eValueTmp"] = tr[p].cells[0].textContent;
}
break;
}
}
}
if( !ok ){
setTimeout(function(){
obj.value = "";
iObj.value = "";
});
return S.eventClear(win);
}
if( nVisible==0 ){
if( sValor!="" ) iObj.value = sValor;
return S.eventClear(win);
}
return true;
}
}
S.help = function(win, ev){
if( S.eventCode(ev)==112 ){
var o = S("I.ICONHEADER[iHelp='TITLEICON']", win);
if( o && o.exists() ){
o.eventFire("click");
}
S.eventClear(win);
}
}
var selectCode = function(o){
if( o.getAttribute("eSelectSpan")==null ){
return S(":"+S.replace(o.name,"_INPUT_",""), objWindow(o)).obj;
}else{
return S(":"+o.getAttribute("eSelectSpan"), objWindow(o)).obj;
}
}
var selectLabel = function(o, val, change){
if( o.name.indexOf("_INPUT_")==0 ){
return o;
}else if( val!=undefined ){
var win = objWindow(o),
txt = S.replace(o.name,"_INPUT_",""),
tabla = S("#"+txt+"_TABLE", win).obj;
if( tabla!=null ){
var tr = tabla.rows,
cl = (tabla.getAttribute("eColLabel")==null ? 1:tabla.getAttribute("eColLabel")),
t = tr.length, n;
for(n=0; n<t; n++) if( val==tr[n].cells[0].textContent ){
if( trim(S(":_INPUT_"+txt, win).val())==S.trim(tr[n].cells[cl].textContent) ) break;
S(":_INPUT_"+txt, win).val(S.trim(tr[n].cells[cl].textContent), 0);
break;
}
return o;
}
}
return S(":_INPUT_"+S.replace(o.name,"_INPUT_",""), objWindow(o)).obj;
}
S.selectValue = function(o, val){
var tabla = S("#"+o.name+"_TABLE", objWindow(o)).obj, dim=[];
if( tabla!=null ){
var tr = tabla.rows,
t = tr.length, n,i;
for(n=0; n<t; n++) if( val==tr[n].cells[0].textContent ){
for(i=0; i<tr[n].cells.length; i++) dim[i] = S.trim(tr[n].cells[i].textContent);
return dim;
}
}
return dim;
}
S.fn.selectColLabel = function(n){
var o = S("#"+this.obj.name+"_TABLE", this.win);
if( S.type(n)=="boolean" ) n = n?2:1;
if( n==2 ){
o.class("=col_1n col_2b");
}else{
o.class("=col_1b col_2n");
}
o.attr("eColLabel", n);
selectLabel(this.obj, this.obj.value);
}
var selectTable = function(o){
if( o.getAttribute("eSelectSpan")==null  ){
return S("#"+S.replace(o.name,"_INPUT_","")+"_TABLE", objWindow(o)).obj;
}else{
return S("#"+o.getAttribute("eSelectSpan")+"_TABLE", objWindow(o)).obj;
}
}
var selectDiv = function(o){
return selectTable(o).parentNode;
}
S.selectNone = function(win){
S('.SELECT',win).each(function(k,o){
if( o.offsetWidth>0 ){
if( o.id=="SelBROWSER" ){
var obj = S(":"+S(o).attr("field"),win);
}else{
var obj = S(":"+S.mid(o.children[0].id, 0, -6), win);
}
obj.val(obj.val());
S(o).none();
}
});
if( S("body",win).attr("e-SelectTable",)!=null ){
S("body",win).obj.onkeypress = null;
S("body",win).attr("e-SelectTable", null);
}
}
var selectBoxKey = function(win, oTABLE){
S("body",win).attr("e-SelectTable", oTABLE);
S("body",win).obj.onkeypress = function(e){
var c = S.char(S.eventCode(e)),
er = new RegExp("^"+c, "i");
S("TD:nth-child(2)", win.document.body["e-SelectTable"]).each(function(k,o){
if( er.test(o.innerHTML) ){
console.log(k+': '+o.innerHTML+' : '+o.parentNode.offsetTop);
S.scrollSet(S.toTag(o,"div"), {left:0, top:o.parentNode.offsetTop});
S.eventClear(e);
return null;
}
});
};
}
S.selectBox = function(obj, ev){
var win =  objWindow(obj),
el = S.event(ev), oVal,
campo = S.mid(obj.id,1,0);
if( el.tagName=="I" ){
S(":"+campo, win).val("-"+S(el.parentNode).attr("eVal"));
return;
}
var oTABLE = S("#_"+campo+"_TABLE", win).obj,
rowVisible = -1,
selectRows = 11;
S(".SELECTED", oTABLE).class("");
S("#_"+campo, win).class("-ERROR");
S("SPAN[eVal]",obj).each(function(k,o){
S("TR[v='"+S(o).attr("eVal")+"']", oTABLE).class("SELECTED");
});
S.selectNone(win);
selectShow(obj, oTABLE.parentNode, oTABLE, oTABLE.rows, rowVisible, selectRows);
selectBoxKey(win, oTABLE);
S.eventClear(win);
if( S(obj).attr("eClick")==null ){
S(obj).attr("eClick", 1);
S(oTABLE.parentNode).on("click", function(ev){
S.selectClick(oTABLE.parentNode, ev, obj);
});
}
}
var selectShow = function(obj, div, oTABLE, tr, rowVisible, selectRows){
if( tr.length==0 ){
S(div).none();
return;
}
var c = S(obj).xy(), y;
if( rowVisible==-1 ) rowVisible = 0;
if( div.parentNode.tagName!="BODY" ){
S.session.index += 2;
S(div).nodeMove("body");
S(div).css("left:0;top:0;display:block;z-index:"+S.session.index);
}else{
S(div).block();
}
S(div).css((tr.length>selectRows) ?
{overflowX:"hidden", overflowY:"visible", height:((tr[rowVisible].offsetHeight+1)*selectRows)+1}
:
{overflowX:"hidden", overflowY:"hidden", height:null}
);
if( div.clientHeight>objWindow(obj).document.body.clientHeight ){
S(div).css({overflowY:"visible", height:objWindow(obj).document.body.clientHeight-3});
}
if( c.w-2>div.offsetWidth ){
div.style.width = px(c.w-2);
}
if( S(obj).class("?SELECTMULTIPLEBOX") ){
var tipo = S(obj).around(div, {type:"7,6,5,11,12,1,13,14"});
}else{
var tipo = S(obj).around(div, {type:"7,6,5,11,12,1,13,14"});
}
if( !tipo.fit ){
S(div).css({height:tipo.cs.h-2});
tipo = S(obj).around(div, {type:"7,6,5,11,12,1,13,14"});
}
S(obj).attr({eSelectRows:selectRows, ePosType:tipo});
y = rowVisible-parseInt(selectRows/2);
if( y<0 ) y = 0;
div.scrollTop = ((tr[rowVisible].offsetHeight+1) * y)+1;
obj.focus();
return S.eventClear(objWindow(div));
}
S.selectClick = function(obj, ev, box){
var id="";
if( obj.readOnly ) return S.eventClear(objWindow(obj));
if( obj.tagName!="INPUT" && obj.getAttribute("eSelectSpan")==null ){
var oTABLE = obj.children[0],
cl = (oTABLE.getAttribute("eColLabel")==null ? 1:oTABLE.getAttribute("eColLabel")),
nom = mid(oTABLE.id,0,-6),
win = objWindow(obj),
evt = win.event || ev,
o = S.eventObj(evt), tr,
multiple = (evt.ctrlKey && ((win._SelectMultipleField && win._SelectMultipleField[nom]) || win._SelectMultiple));
if( o.tagName=="TD" ){
tr = o.parentNode;
if( tr.className=='NoSelected' || tr.className=='Line' ){
setTimeout(function(){
S(oTABLE.parentNode).block();
}, 200);
return S.eventClear(win);
}
var SeModi = (tr.cells[0].textContent==S(":"+nom,win).val()) ? 0:1,
xVal = S.trim(tr.cells[0].textContent),
xInput = S.trim(tr.cells[cl].textContent),
oVal = S(":"+nom, win).obj.value,
oSelect = S(":_INPUT_"+nom, win),
oInput = (typeof(box)!="undefined" || oSelect.length==0) ? null : oSelect.val(),
oClass = tr.className,
selMult = false;
if( typeof(box)!="undefined" ){
oVal = S(":"+S.mid(nom,1,0), win).val();
if( tr.className=="SELECTED" ){
tr.className = "";
S(":"+S.mid(nom,1,0), win).val("-"+xVal);
}else{
var ni = S(":"+S.mid(nom,1,0), win).attr("eMaxItem")*1;
if( S(":"+S.mid(nom,1,0), win).obj.maxLength<(oVal+","+xVal).length || (ni>0 && (S(":"+S.mid(nom,1,0), win).val().split(",").length-1)>ni) ){
S.info(win, 94);
return;
}
tr.className = "SELECTED";
S(":"+S.mid(nom,1,0), win).val("+"+xVal);
}
if( ev ){
setTimeout(function(){
S(box).around(obj, {type:"7,6,5,11,12,1,13,14"});
if( S(box).class("?SELECTMULTIPLEBOX") ){
selectBoxKey(win, oTABLE);
}
}, 1);
}
return;
}
if( oSelect.length==0 ){
oVal = S(":"+nom, win);
oVal.attr("eLabel", xInput);
oVal.obj.value = xVal;
oSelect = S("*[eSelectSpan='"+nom+"']", win);
if( oSelect.attr("eEjecute")!=null ) win[oSelect.attr("eEjecute")](xVal, oVal.obj, S("*[eValue]",oSelect), oSelect.obj, xInput);
S(S("#"+nom+"_TABLE", win).obj.parentElement).none();
return;
}
if( multiple ){
if( (oVal+"").indexOf(xVal)>-1 ){
tr.className = "";
xVal = oVal.replace(xVal+'||','').replace('||'+xVal,'').replace(xVal,'');
xInput = oInput.replace(xInput+' + ','').replace(' + '+xInput,'').replace(xInput,'');
}else{
tr.className = "SELECTED";
if( oVal!="" ) xVal = oVal+"||"+trim(xVal);
if( oInput!="" ) xInput = oInput+" + "+xInput;
}
S(":"+nom, win).attr({title:xVal.replace(/\|\|/g,'\n'), eSelMultiple:1});
oSelect.attr({title:xInput.replace(/\s\+\s/g,'\n')});
}else if( S(oTABLE).attr("eUpdate")!=null ){
S(":"+nom, win).attr("SetValue", xVal);
S(":"+S(oTABLE).attr("eUpdate"), win).val(S.trim(tr.cells[2].textContent));
}
if( !multiple ) S(":"+nom, win).obj.removeAttribute("eSelMultiple");
oSelect.obj["eRowNumber"] = tr;
oSelect.attr("IND", tr.rowIndex);
S(":"+nom, win).class(">ERROR,EDITABLE").val(xVal);
oSelect.class(">ERROR,EDITABLE");
if( oSelect.attr("SMultiple") ) oSelect.class("-ERROR,+EDITABLE");
oSelect.obj.value = xInput;
if( oSelect.attr("SMultiple")!=null ){
if( ev && ev.ctrlKey ){
selMult = true;
if( oClass=="SELECTED" ){
S("#LIST"+nom+" TD:first-child", win).each(function(k,o){
if( o.innerText==tr.cells[0].innerText ){
win._SMDelOption(S.mid(nom,1,0), o.parentNode.cells[1].children[0]);
tr.className = "";
oSelect.obj.value = "";
S(":"+nom, win).obj.value = "";
return null;
}
});
}else{
if( !win._SMAddOption(S.mid(nom,1,0)) ) return;
}
}else{
if( !win._SMAddOption(S.mid(nom,1,0)) ) return;
}
}
if( multiple ){
S.eventFire(oSelect.obj, "change");
setTimeout(function(){
S(oSelect).around(obj, {type:"2,7,6,5,11,12,1,13,14"});
},1);
return S.eventClear(win);
}else{
if(!selMult) S(obj).none();
setTimeout(function(){
oSelect.attr("eChange", 0);
S.fieldNext(oSelect.obj, false);
if(selMult){
setTimeout(function(){
S(oSelect).around(obj, {type:"2,7,6,5,11,12,1,13,14"});
},1);
}
}, 200);
}
}else{
return S.eventClear(win);
}
}else{
var win = objWindow(obj),
oTABLE = selectTable(obj),
div = oTABLE.parentNode,
tr = oTABLE.rows,
t = tr.length,
valor = "||"+selectCode(obj).value+"||",
selectRows = (S(obj).attr("eSelectRows") || S.setup.selectRows)*1,
marcaSeleted = obj.getAttribute("eSetParentValue")==null,
rowVisible = -1, n
nameField = ((obj.tagName=="INPUT")? obj.name : obj.getAttribute("eSelectSpan"));
if( obj.getAttribute("eSelectSpan")!=null ) obj.setAttribute("eEjecute", ev);
id = "#"+nameField.substr(7)+"_TABLE";
if( (t==0 || (t==1 && tr[0].cells[0].innerText=="")) && S(id+"FREE", win).exists() ){
S(id, win).HTML(S(id+"FREE", win).HTML().replace(nameField.substr(7)+"_TABLEFREE", nameField.substr(7)+"_TABLE"));
S(id, win).block();
oTABLE = S(id, win).obj;
tr = oTABLE.rows;
t = tr.length;
}
if( S(obj).attr("SMultiple")!=null ){
valor = S.replace(S(":"+S.mid(nameField,8,0), win).val(), ",", "||");
}
for(n=0; n<t; n++){
if( tr[n].className!='NoSelected' && tr[n].className!='Line' ) tr[n].className = "";
tr[n].style.display = "";
if( marcaSeleted && valor!="||||" && (valor+"").indexOf("||"+tr[n].cells[0].textContent+"||")>-1 ){
if( rowVisible==-1 ) rowVisible = n;
tr[n].className = "SELECTED";
}
}
S.selectNone(win);
selectShow(obj, div, oTABLE, tr, rowVisible, selectRows);
obj.focus();
}
}
S.selectKey = function(obj, ev){
var win = objWindow(obj),
evt = win.event || ev,
nChar = S.eventCode(evt),
xChar = S.char(nChar),
oValor = obj.value,
valor = obj.value+xChar,
nom = S.replace(obj.name,"_INPUT_",""),
xTABLE = nom+"_TABLE",
selectRows = S(obj).attr("eSelectRows")*1 || S.setup.selectRows,
rowVisible = -1,
oTABLE, tr, t, n, pk=null, nVisible=0, asignar=true, newValor=null, oNext;
if( event && evt.type=="keydown" ){
if( is(nChar, [46,8]) ){
var dim = S.posCursor(obj),
start = dim[0],
end = dim[1];
if( nChar==46 ){
start++;
end++;
}
obj.value = valor = oValor.substring(0,start-1)+oValor.substring(end);
S.posCursor(obj,start-1);
asignar = false;
S.eventClear(win,evt);
newValor = obj.value;
}else if( is(nChar, [37,39]) ){
return true;
}else if( is(nChar, [38,40]) ){
return true;
}else if( nChar==27 ){
S(obj).attr({eChange:0, value:obj["eBak"]});
S(":"+nom,win).attr("eChange",0).val(S.obj["eBak"]);
S.selectNone(win);
return S.eventClear(win,evt);
}else if( nChar==112 ){
if( !tipShow(obj, true, null) ){
var o = S("I.ICONINPUT[iHelp='"+obj.name+"']", win);
if( o && o.exists() ){
o.eventFire("click");
}else{
S.help(win);
}
}
return S.eventClear(win, evt);
}else if( nChar==114 ){
if( (win._SelectMultipleField && win._SelectMultipleField[obj.name.substr(7)]) || win._SelectMultiple ){
S(selectDiv(obj)).none();
var oTable = S("#"+obj.name.substr(7)+"_TABLE", win),
title = S("LABEL[for="+obj.name.substr(7)+"]", win),
trSel=[], n;
if( !S(title).exists() ) title = S("LABEL[for="+obj.name.substr(7+1)+"]", win);
oTable.class('+col_0n col_2n col_3n col_4n col_5n');
S(".SELECTED", oTable).each(function(k,o){
trSel[k] = o.rowIndex;
});
var win2 = S.window(null, {
title:(S(title).exists()) ?  S(title).TEXT():"",
content:'<div class="SELECT EDITABLE SCROLLBAR" style="white-space:nowrap; display:block; overflow:auto; height:100%;padding:1px">'+S("#"+obj.name.substr(7)+"_TABLE", win).HTML()+"</div>",
status:'<span class="AddButton" onclick="" title="" style="display:table">Aceptar</span>',
modal:true,
print:false,
minimize:false,
maximize:false,
resize:false
}),
div = win2.children[0].rows[1].cells[0].children[0],
table = div.children[0],
scr = S.screen(window);
xyObj = S.xyTop(obj);
table.style.width = "1px";
div.style.width = "";
div.style.height = "";
if( div.offsetHeight>scr.h-100 ) div.style.height = px(scr.h-100);
for(n in trSel) table.rows[trSel[n]].className = "SELECTED";
S(table).on("click",function(k){
var o = S.eventObj(k);
if( o.tagName=="TD" ) o = o.parentNode;
if( o.tagName=="TR" ) S(o).class("/SELECTED");
});
S(".AddButton",win2).on("click",function(k){
var o = S.toTag(S.eventObj(k), "SPAN", 1),
oField = S.eventObj(k).obj,
val="", txt="";
S(".SELECTED", o).each(function(k, o){
if( val!="" ){
val += "||";
txt += " + ";
}
val += S.td(o, 0);
txt += S.td(o, 1);
S(o).class("-SELECTED");
});
S(":"+oField.name.substr(7), objWindow(oField)).val(val);
S(":"+oField.name.substr(7), objWindow(oField)).attr("title", val);
S(oField).val(txt, 1);
S(oField).attr("title", S.replace(txt, [[" + ","\n"]]));
S(o).window();
});
S(".AddButton", win2).attr({obj:obj});
for(n=0; n<2; n++) S(win2).windowResize(div.offsetWidth, div.offsetHeight, 1);
S(win2).css("left:"+xyObj[0]);
return S.eventClear(win,evt);
}else{
if( S(selectDiv(obj)).css("display")=="block" ){
S(obj).attr("eSelectRows",1000);
}
S.selectClick(obj);
}
return S.eventClear(win,evt);
}else if( nChar==115 ){
oNext = win.eIndex(obj.sourceIndex+1);
if( oNext.tagName=="DIV" && oNext.children[0].tagName=="TABLE" && oNext.children && S.right(obj.name,0,-7)==S.left(oNext.children[0].id,0,-6) ){
S.session.index += 2;
S(oNext).nodeMove("body");
S(oNext).css("left:0;top:0;display:block;z-index:"+S.session.index);
oNext = win.eIndex(obj.sourceIndex+1);
}
if( /^(?:I|IMG)$/i.test(oNext.tagName) ){
S.eventFire(oNext, "click");
}
return S.eventClear(win, evt);
}else if( nChar==9 || nChar==13 ){
newValor = oValor;
}else return true;
}
if( newValor==null ){
var dim = S.posCursor(obj),
start = dim[0],
end = dim[1];
if( nChar==46 ){
start++;
end++;
}
newValor = oValor.slice(0,start) + xChar + oValor.slice(end+xChar.length-1);
}
if( verOptions(newValor, xTABLE, selectRows, asignar)==0 ){
return S.eventClear(win,evt);
}
if(nChar==9 || nChar==13){
if( oValor!="" && S(obj).attr("SMultiple")!=null ) win._SMAddOption(S.mid(nom,1,0));
if( pk!=null && S(":"+nom, win).val()!=pk ){
S(":"+nom, win).val(pk);
}
S.fieldNext(obj, evt.shiftKey);
}
function verOptions(valor, xTABLE, selectRows, asignar){
try{
var Patron = new RegExp(S.regExp(valor), "i");
}catch(e){
return S.eventClear(win,evt);
}
var oTABLE = S("#"+xTABLE, win).obj,
tr = oTABLE.rows,
t = tr.length,
rowVisible = -1,
n, nVisible=0;
if( t==0 ) return 1;
for(n=0; n<t; n++){
if( Patron.test(tr[n].cells[1].textContent) ){
tr[n].style.display = "";
if( nVisible<0 ) pk = tr[n].getAttribute("v");
if( nVisible++==0 ) rowVisible = n;
}else tr[n].style.display = "none";
}
var div = oTABLE.parentNode;
if( (nVisible==1 && asignar) || nChar==9 || nChar==13 ){
S(":"+nom, win).class(">ERROR,EDITABLE").val((rowVisible==-1)?"":tr[rowVisible].cells[0].textContent, 1);
S(":_INPUT_"+nom, win).class(">ERROR,EDITABLE").val((rowVisible==-1)?"":tr[rowVisible].cells[1].textContent, 0);
S(div).none();
S.eventClear(win,evt)
return nVisible;
}
selectShow(S(":_INPUT_"+nom, win).obj, div,oTABLE,tr, rowVisible, selectRows);
return nVisible;
}
}
S.selectReset = function(txt, win, ConChange){
var campo = txt.split(','), n,
win = win||window,
ConChange = ConChange||false;
for(n in campo){
S(":"+campo[n],win).class(">ERROR,EDITABLE").val("",false);
S(":"+campo[n],win).attr({
"eBak":"",
"SetValue":"",
"e-ParentVal":""
});
if( S(":_INPUT_"+campo[n],win).obj!=null ){
S(":_INPUT_"+campo[n],win).class(">ERROR,EDITABLE").val("",false);
S("#"+campo[n]+'_TABLE',win).HTML("<table id='"+campo[n]+"_TABLE'></table>");
}
}
}
S.selectClear = function(txt, ConChange, win){
S.selectReset(txt, win, ConChange);
}
S.relationReset = function(o){
var win = objWindow(o),
field = S(o).attr("eRelationList").split(","),
t = field.length,
name = S.mid(o.name,7,0).toLowerCase(),
izq=[], dch=[], txt,n,i;
for(n=0; n<t; n++){
if( field[n]==field[n].toLowerCase() ) izq.push(field[n]);
if( field[n]==name ){
for(i=n+1; i<t; i++) if( field[i]==field[i].toLowerCase() ) dch.push(field[i].toLowerCase());
if(dch.length>0){
S.selectReset(dch.join(","), win, 0);
}
if((n+1)<t){
if( n+1<t && field[n+1]==field[n+1].toUpperCase() ){
S.selectReset(field[n+1].toLowerCase(), win, 0);
win.AuxFiltro(name, field[n+1].toLowerCase(), 1);
}
name = field[n+1];
if( name!=name.toLowerCase() ){
if((n+2)<t){
name = field[n+2];
}
}
if(name!="" && name==name.toLowerCase()){
win.AuxFiltro(izq.join(","), name, 1);
}
}
break;
}
}
win.Espejo("__", o, true);
}
S.selectAttr = function(txt, attr, win){
win = win || window;
txt = S.replace(txt,"_INPUT_","");
var valor = S(":"+txt, win).obj.value,
tabla = S("#"+txt+"_TABLE", win).obj,
tr = tabla.rows,
t = tr.length, n, i;
for(n=0; n<t; n++) if( valor==tr[n].cells[0].textContent ){
for(i=0; i<tr[n].cells.length; i++){
if( S(tabla.children[0].children[i]).attr("NM_ATRIBUTE")==attr ){
return S.trim(tr[n].cells[i].textContent);
}
}
}
return "";
}
S.fn.file = function(){
var obj = this.obj,
win = this.win,
file = S(":_FILE_"+obj.name, win).obj;
if( (win.event && /OFF/.test(S.event(win).className)) || file.readOnly ) return S.eventClear(win);
S(obj).class("READONLY");
if( !S(file).attr("eOnChange") ){
S(file)
.attr("eOnChange",1)
.on("change", function(ev){
var win = objWindow(this),
nom = S.mid(S.replace(this.value,"\\","/"),"/", null, true),
txtError = "", xFiles = "", n, e,o,
checkFile = function(obj, file, nFile){
if( file.files.length==0 ) return "<";
var nom = S.mid(S.replace(file.files[nFile]["name"],"\\","/"),"/", null, true),
ext = S.lower(S.right(file.files[nFile]["name"],".")),
eExt = S.lower(S(obj).attr("eExt")),
eByts = S(obj).attr("eByts"),
ok="", n=0, i;
if( S.setup.maxFileUploads==0 ){
ok = S.lng(257);
}
if( ok=="" && S.isUtf8(nom) ){
										nom = S.utf8Translate(nom);
// nom = S.fileClearName(nom, true);
}
if( ok=="" && nom.length>S(obj).attr("maxlength") ){
ok = S.lng(258);
}
if( ok=="" && eExt && !S.is(ext, eExt.split(",")) && eExt!="*" ){
ok = S.lng(259, ext, nom);
}
if( ok=="" && eByts && file.files[nFile].size>eByts ){
ok = S.lng(260, nom, S.thousands(file.files[nFile].size), S.thousands(eByts));
}
if( ok=="" && !(new RegExp(S.replace(S.keyCheck["F"], [["{SEEK}",""],["{LONG}","{1,"+obj.maxLength+"}"]])).test(nom)) ){
ok = S.lng(261);
}
nom = S.filterAccent(nom);
if( ok=="" ){
S("INPUT[type=FILE]", win).each(function(pk,o){
if( o.value!="" && file.value==o.value && file.files[0]["size"]==o.files[0]["size"] && file!=o ){
ok = S.lng(261, o.files[0]["name"]);
}
});
}
if( ok=="" && win._OnLineIMG ){
for(i in win._OnLineIMG) n++;
if( n==0 && win._ChildrenData.length>0 ){
S("INPUT[type=FILE]", win._WOPENER).each(function(pk,o){
if( o.value!="" && file.value==o.value && file.files[0]["size"]==o.files[0]["size"] && file!=o ){
ok = S.lng(261, o.files[0]["name"]);
}
});
}
}
if( ok=="" ){
o = S("I[eFO='"+S.mid(file.name,6,0)+",D']", win);
if( o.exists() ) o.class("-OFF");
}
return ok;
};


						if( S.isUtf8(nom) ){											//ok = 'El nombre del fichero está en UTF8';
							nom = S.utf8Translate(nom);
							// nom = S.fileClearName(nom, true);
						}


if( (txtError=checkFile(obj, file, 0))!="" ){
if( txtError!="<" ){
S.alert({title:209, icon:"E", button:"a", text:txtError});
S(":_FILE_"+obj.name, win).val("", false);
}
return S.eventClear(win);
}
file.setAttribute("eDivide", 0);
if( (file.files[0].size*1)>(S.setup.maxFileUploads*1) ){
file.setAttribute("eDivide", 1);
}
if( obj.name=="_MULTIFILE" ){
for(n=0; n<file.files.length; n++){
if( (txtError=checkFile(obj, file, n))!="" ){
S.alert({title:209, icon:"E", button:"a", text:txtError});
S(":_FILE_"+obj.name, win).val("", false);
return S.eventClear(win);
}
if(xFiles!="") xFiles += "\n";
xFiles += file.files[n]["name"];
}
S(".OneOfN",win).obj.children[0].innerText = 1;
S(".OneOfN",win).obj.children[1].innerText = file.files.length;
S(".OneOfN",win).visible();
S(".OneOfN",win).attr({title:xFiles});
S(":"+obj.getAttribute("pFile"), win).attr({
NewValue: file.value,
eUpload: 1
});
S(":"+obj.getAttribute("pFile"), win).val(nom);
S(":_FILE_"+obj.name).attr({nFile:0});
S(":_MULTIFILE",win).attr({nFile:0});
S(":_FILE__MULTIFILE",win).attr({nFile:0});
S.fileAttrCopy(win, file.files[0], S(":_FILE__MULTIFILE", win).attr("eCopy"), S(file).attr("TC"));
}else if( S(obj).attr("eCopy") ){
S.fileAttrCopy(win, file.files[0], S(obj).attr("eCopy"), S(file).attr("TC"));
}
obj.setAttribute("NewValue", file.value);
obj.value = nom;
obj.setAttribute("eUpload", 1);
obj.setAttribute("eFileUpdate", S.date("H,i,s,m,d,Y", file.files[0].lastModifiedDate));
S._fileRecalSpace(obj, file.files[0]["size"]);
obj.className = "READONLY";
if(obj.onchange!=null) S(obj).eventFire("change");
});
}
S(file).eventFire("click");
return S.eventClear(win);
}
S._fileRecalSpace = function(obj, sz){
var old = obj.getAttribute("eSizeFile")*1,
disk = S("._DISKSPACE", objWindow(obj)), txt, n;
if( S(disk).exists() ){
txt = S.replace(S(disk).text(), [[" Byts",""],[".",""]])*1;
txt = S.thousands(txt+old-sz)+" Byts";
S(disk).text(txt);
}
obj.setAttribute("eSizeFile", sz);
}
S.fileAttrCopy = function(win, file, tmp, tc){
var od, xNom, n;
if( tmp=="" ) return;
tmp = S.nsp(tmp).split(",");
for(n=0; n<tmp.length; n++){
od = tmp[n].split("=");
if( S(":"+od[0], win).length ){
switch( od[1] ){
case 'caption':
xNom = S.replace(S.fileName(file.name), [["_"," "], ["  "," "]]);

xNom = S.utf8Translate(xNom);
// xNom = S.fileClearName(xNom, true);

if( tec="#" && tc==upper(tc) ) xNom = upper(xNom);
break;
case 'size':
xNom = file.size;
break;
case 'format':
xNom = S.right(file.name, ".");
break;
case 'date':
xNom = S.date("Y-m-d", file.lastModifiedDate);
break;
case 'hour':
xNom = S.date("H:i:s", file.lastModifiedDate);
break;
case 'datetime':
xNom = S.date("Y-m-d H:i:s", file.lastModifiedDate);
break;
default:
xNom = "";
}
S(":"+od[0], win).val(xNom);
}
}
}
S.isUtf8 = function(txt){
var n,t=txt.length;
for(n=0; n<t; n++) if( S.code(S.mid(txt,n,1))>255 ){
return true;
}
return false;
}

		S.utf8Translate = function(txt){
			var i,n,group, pk=[], line=">,65,771;A,128,129,130,131,132;a,160,161,162,163,164;E,136,137,138,139;e,168,169,170,171;I,140,141,142,143;i,172,173,174,175;O,146,147,148,149,150;o,178,179,180,181,182;U,153,154,155,156;u,185,186,187,188;N,145;n,177;C,135;c,167;>,65,770;i,161,191;',180;o,186;a,170".split(";");
			for(i=0; i<line.length; i++){
				pk = line[i].split(",");
				if( pk[0]==">" ){
					group = S.char(pk[1])+S.char(pk[2]);
					continue;
				}
				for(n=1; n<pk.length; n++){
					txt = S.replace(txt, group+S.char(pk[n]), pk[0]);
				}
			}
			return txt;
		}

S.fileClearName = function(nom, acent){
if( S.isUtf8(nom) ){
var n,c,txt=nom;
nom = "";
for(n=0; n<txt.length; n++){
c = S.mid(txt,n,1);
if( new RegExp(S.replace(S.keyCheck["F"], [["{SEEK}",""], ["{LONG}","{1}"]])).test(c) ){
nom += c;
}
}
}
if( acent ) nom = S.filterAccent(S.trim(nom));
return nom;
}
S.file = function(obj, destino, funcEnd, pct){
var file = obj.files[S(obj).attr("nFile")*1],
win = objWindow(obj),
fd = new FormData(),
xmlHTTP = new XMLHttpRequest();
fd.append("file", file);
S(xmlHTTP.upload).on("loadstart", function(evt){
S.progressUpload(pct);
}, false);
S(xmlHTTP).on("load", function(evt){
var res = S.trim(evt.target.responseText);
if( res=="ok" ){
if( funcEnd ) funcEnd();
}else{
S.error(res!="" ? res : "Respuesta del servidor vacía");
}
}, false);
S(xmlHTTP).on("error", function(evt){
S.error("Error al subir el fichero");
}, false);
var url = "edes.php?UPLOAD&FILE="+destino;
xmlHTTP.open("POST", url, true);        //xmlHTTP.setRequestHeader('book_id','10');
xmlHTTP.send(fd);
S.progressUpload();
if( xmlHTTP.status!=0 ){
if(S.session.logCallSrv)console.log("  ERROR: "+url);
S.error(S.trim(xmlHTTP.statusText));
}else{
if(S.session.logCallSrv)console.log("  load: "+url);
}
}
S.preview = function(campo, win, tit){
if( S.type(win)=="window" ){
var e = S(":_FILE_"+campo, win).obj, ret=false;
}else if( /^(function|html|eDes)$/.test(S.type(win)) ){
var e = S.toObject(campo), ret=true;
}else return;
if( e.value!="" && e.files && e.files[0] ){
if( e.files[0].size<1500000 ){
var reader=new FileReader(),
tipo=e.files[0].type,
nom=e.files[0].name;
if( ret ){
reader.onload=function(e){
if( S.type(win)=="function" ){
win(e.target.result);
}else{
S.toObject(win).src = e.target.result;
}
}
}else if( tipo.match('image.*') ){
reader.onload=function(e){
var w = S.window(null, {content:"<img src='"+e.target.result+"'>", title:(tit==undefined ? nom:tit), w:1, h:1, noresize:true, minimize:false});
setTimeout(function(){
var img = S("IMG", w).obj;
S(img).attr({eWidth:img.width, eHeight:img.height});
var xy = top.S.screen(window), z=1;
while( w.offsetWidth>xy.w || w.offsetHeight>xy.h ){
z -= 0.1;
S(img).css("zoom:"+z);
}
S(w).center();
}, 1);
}
}else if( /^(pdf|mp4)$/i.test(S.fileType(e.value)) ){
reader.onload=function(e){
S.window(null, {content:"<embed src='"+e.target.result+"' type='"+tipo+"' width='100%' height='100%' />", title:(tit==undefined ? nom:tit), fullscreen:true});
}
}else if( /^(csv|txt)$/i.test(S.fileType(e.value)) ){
reader.onload=function(o){
var w = S.window(null, {title:S.fileFullname(e.value), width:"100%", height:"100%"});
S(w).windowWrite(atob(o.target.result.substring(o.target.result.indexOf(";base64,")+8, o.target.result.length)).replace(/\n/g,"<br>"));
}
}else{
S.info(252, 2);
reader = null;
}
if( reader ) reader.readAsDataURL(e.files[0]);
}else{
S.info(253, 5);
}
}
return S.eventClear(win);
}
S.download = function(dim){
if( S.type(dim)=="string" ) dim = [dim];
var o = document.createElement('a');
o.setAttribute('download', null);
o.style.display = 'none';
S.each(dim, function(k,i){
o.setAttribute('href', i);
o.click();
});
}
S.imgShow = function(obj, edit){
function init(box, img, edit){
var win = S.objWindow(img),
setup = S(":"+obj.name+"_setup", win), dim,
view = S(img).attr("eView"), iwh, bwh;
if( view!="" && setup.length==0 ){
S(img).css("cursor:pointer;width:auto;height:auto");
iwh = S(img).css("width,height");
bwh = S(box).css("width,height");
switch( S(img).attr("eView") ){
case "F":
if( ((bwh.height/bwh.width)<(iwh.height/iwh.width)) ){
img.style.height = px(bwh.height);
img.style.marginLeft = px((bwh.width-S(img).css("width"))/2);
}else{
img.style.width = px(bwh.width);
img.style.marginTop = px((bwh.height-S(img).css("height"))/2);
}
return;
case "H":
img.style.height = px(bwh.height);
img.style.marginLeft = px((bwh.width-S(img).css("width"))/2);
return;
case "W":
img.style.width = px(bwh.width);
img.style.marginTop = px((bwh.height-S(img).css("height"))/2);
return;
}
}
if( setup.length==0 ) return;
if( edit ){
dim = setup.val().split(",");
dim[2] *= 1;
img.style.marginLeft = dim[3]+"px";
img.style.marginTop = dim[4]+"px";
img.style.width = px(dim[0]*dim[2]);
img.style.height = px(dim[1]*dim[2]);
img["oZoom"] = dim[2];
img["oWidth"] = dim[0];
img["oHeight"] = dim[1];
}else{
setup.val(S(img).css("width")+","+S(img).css("height")+",1,0,0");
img["oZoom"] = 1;
img["oWidth"] = S(img).css("width");
img["oHeight"] = S(img).css("height");
}
box.attr("eOFF",0);
box["cBox"] = S.xy(box);
img["cImg"] = S.xy(img);
}
function saveSetup(eImg){
var img = eImg.obj,
setup = img.eToSetup,
dim = S(setup).val().split(",");
dim[2] = S.round(img.oZoom, 3)*1;
dim[3] = parseInt(img.style.marginLeft);
dim[4] = parseInt(img.style.marginTop);
S(setup).val(dim.join(","));
}
edit = edit || false;
var win = S.objWindow(obj),
box = S(".IMGBOX[eFrom='"+obj.name+"']", win),
xyBox = S.xy(box),
img = S('.IMGFORM', box),
oSetup = S(":"+obj.name+"_setup", win),
setup = oSetup.length,
edita = S("I", obj.parentElement);
S("TABLE", box).none();
img.block().css({marginLeft:0, marginTop:0, width:"auto", height:"auto"});
img.obj["eToBox"] = box.obj;
img.obj["eToSetup"] = oSetup.obj;
box.obj["eToImg"] = img.obj;
if(!edit){
S.preview(S(":_FILE_"+obj.name, win), function(data){
var img = S('.IMGFORM', box).obj;
img.src = data;
setTimeout(function(){ init(box, img, edit); }, 1);
});
}else{
init(box, img.obj, edit);
}
if(!setup) return;
if( edita.length==0 || edita.text()!="w" ) return;
img.on("mousedown",function(ev){
var img = S.event(ev);
img.eMove = 1;
img.eOX = ev.clientX;
img.eOY = ev.clientY;
img.eMX = parseInt(img.style.marginLeft);
img.eMY = parseInt(img.style.marginTop);
});
box.on("mousemove",function(ev){
var img = S.event(ev);
if( img.eMove==1 ){
img.style.marginLeft = (img.eMX+ev.clientX-img.eOX)+"px";
img.style.marginTop = (img.eMY+ev.clientY-img.eOY)+"px";
}
});
box.on("wheel",function(ev){
if( ev.ctrlKey ){
var img = box.obj.eToImg,
incr = ((ev.detail<0) ? 0.01 : (ev.wheelDelta>0) ? 0.01 : -0.01);
if( ev.shiftKey ) incr*=10;
if( (img.oZoom+incr)>0 ){
img.oZoom += incr;
incr = img.oZoom;
img.style.width = px(img.oWidth*incr);
img.style.height = px(img.oHeight*incr);
saveSetup(S(img));
}
S.eventClear(ev);
S.eventClear(top);
return false;
}
});
img.on("dblclick",function(ev){
img.css({marginLeft:0, marginTop:0, width:"auto", height:"auto"});
var iwh = S(img).css("width,height"),
bwh = S(box).css("width,height");
if( ((bwh.height/bwh.width)<(iwh.height/iwh.width)) ){
img.obj.oZoom = bwh.height/iwh.height;
img.obj.style.height = px(bwh.height);
img.obj.style.marginLeft = px((bwh.width-S(img).css("width"))/2);
}else{
img.obj.oZoom = bwh.width/iwh.width;
img.obj.style.width = px(bwh.width);
img.obj.style.marginTop = px((bwh.height-S(img).css("height"))/2);
}
saveSetup(img);
});
box.on("contextmenu",function(ev){
var img = S("IMG", box);
img.block().css({marginLeft:0, marginTop:0, width:"auto", height:"auto"});
img.obj["oZoom"] = 1;
saveSetup(img);
S.eventClear(img.win);
});
img.on("mouseup",function(ev){
img.obj.eMove = 0;
if(setup) saveSetup(img);
});
img.on("mouseout",function(ev){
img.obj.eMove = 0;
if(setup) saveSetup(img);
});
}
S.imgResize = function(o, w, h){
o.removeAttribute("width");
o.removeAttribute("height");
setTimeout(function(){
if( w<o.width || h<o.height ){
if( (w/h)>(o.width/o.height) ){
o.height = h;
}else{
o.width = w;
}
}
}, 1);
}
S.imgToBase64 = function(img){
img = S.arrayObject(img)[0];
var c = document.createElement('canvas'), ctx;
c.height = img.naturalHeight;
c.width = img.naturalWidth;
ctx = c.getContext('2d');
ctx.drawImage(img, 0, 0, c.width, c.height);
return c.toDataURL();
}
S.fileDrag = function(evt){
var win = objWindow(S.eventObj(evt)),
obj = S("#DRAGANDDROP",win), dim, n,t, txt,v=0, label=[], xForm=[], oFile=[];
if( !obj.exists() ){
dim = S("INPUT[type=file]",win).dim;
t = dim.length;
for(n=0; n<t; n++){
if( S(":"+dim[n].name.substr(6),win).css("width")>0 && S(dim[n],win).attr("eStatus")=="E" ){
if( win._DefCampo[dim[n].name.substr(6)] ){
label[v] = win._DefCampo[dim[n].name.substr(6)].Label;
}else{
label[v] = "MULTIFICHERO";
}
xForm[v] = dim[n].form.name;
oFile[v] = dim[n].name.substr(6);
v++;
}
}
txt = "<table id='DRAGANDDROP' ciclo=0 Interval=null oInterval=-1>";
for(n=0; n<v; n++){
txt += "<tr><td xForm='"+xForm[n]+"' oFile='"+oFile[n]+"'>"+((v==1)?"Suelta el archivo aquí":label[n])+"</td></tr>";
}
txt += "</table>";
obj = S(txt,win).nodeEnd("body");
obj.on('dragover', S.fileDrag);
obj.on('drop', S.fileDrop);
obj.attr("Interval",
win.setInterval(function(){
var n = obj.attr("ciclo");
if( obj.attr("oInterval")==n ){
win.clearInterval(obj.attr("Interval"));
obj.nodeRemove();
}else{
obj.attr("oInterval",n);
}
},250)
);
}
evt.stopPropagation();
evt.preventDefault();
evt.dataTransfer.dropEffect = 'copy';
obj.incr("ciclo");
}
S.fileDrop = function(evt){
var td = S.eventObj(evt),
win = objWindow(td), p, i=-1, files;
evt.stopPropagation();
evt.preventDefault();
if( td.tagName!="TD" ) return;
p = td.parentNode.rowIndex;
files = evt.dataTransfer.files;
var oText = S(":"+S(td).attr("oFile"), win).obj, obj,
oFile = S(":_FILE_"+oText.name, win).obj;
if( files.length!=1 && !oFile.multiple ) return;
oFile.files = files;
x = files[0].name;
S(oText).attr({
value: x,
NewValue: x,
title: x,
eUpload: 1
});
oText = S("#DRAGANDDROP", win);
win.clearInterval(oText.attr("Interval"));
oText.nodeRemove();
}
S.fn.check = function(val){
var obj = this.obj;
obj.checked = val || !obj.checked;
S(obj).eventFire("change");
}
S.fn.radio = function(val){
var obj = this.obj;
if( !obj.disabled ){
S(obj).val(obj.getAttribute("eValue"));
}
}
S.fn.range = function(oVal){
var oInput = this.obj,
win = this.win,
oEti = S.toTag(oInput, "SPAN").children[0],
aEti = S(oEti).css("width,position"),
w = S(oInput).css("width")-aEti["width"]/2-2,
min = oInput.getAttribute("min")*1,
max = oInput.getAttribute("max")*1,
pxs = (Math.abs(min)+Math.abs(max))/oEti.offsetWidth,
step = oInput.getAttribute("step")*1,
x,n,res;
if( oVal==undefined ){
if( S(oInput).attr("eEmpty") ){
S(oInput).attr("eEmpty", null);
S(win).rule("input[type=range]::-webkit-slider-thumb {visibility:hidden}");
S(win).rule(".RangeLabel span {visibility:hidden}");
}
if( oEti.tagName=="SPAN" ){
if(aEti["position"]=="relative" ){
oEti.innerHTML = oInput.value;
x = (w*(oInput.value*1-min))/(max-min+4);
oEti.style.left = x+'px';
oInput.addEventListener('input', function(){
S(win).rule("input[type=range]::-webkit-slider-thumb {visibility:visible}");
S(win).rule(".RangeLabel span {visibility:visible}");
oEti.innerHTML = oInput.value;
oInput.setAttribute("eUpdate", 1);
x = (w*(oInput.value*1-min))/(max-min+4);
oEti.style.left = x+'px';
}, false);
}
}else{
oInput.addEventListener('input', function(){
S(win).rule("input[type=range]::-webkit-slider-thumb {visibility:visible}");
oEti.value = oInput.value;
if(aEti["position"]!="relative" ){
S(":_"+oInput.name, win).val(oInput.value, false);
}
}, false);
}
}else{
v = oVal*1,
S(win).rule("input[type=range]::-webkit-slider-thumb {visibility:visible}");
S(win).rule(".RangeLabel span {visibility:visible}");
if( v>=min && v<=max ){
if( step!=null ){
res = oInput.value % step;
if(res!=0) v -= res;
}
}else{
v = (v<min)? min:max;
}
oInput.value = v;
S(oInput).attr("eUpdate", 1);
if( oInput.name[0]=="_" ) S(":"+S.mid(oInput.name,1,0), win).val(v, false);
if(aEti["position"]=="relative" ){
oEti.innerHTML = v;
x = (w*(v*1-min))/(max-min);
oEti.style.left = x+'px';
}else{
if( S(":_"+oInput.name, win).length ) S(":_"+oInput.name, win).val(v, false);
}
}
}
S.key = function(win, type, long, dec, uFunc){
if( S.type(win)!="window" ){
dec = long;
long = type;
type = win;
win = window;
}
uFunc = typeof(uFunc)==undefined ? null:win[uFunc];
var obj = S.event(win),
evt = win.event, d;
if( obj.readOnly || obj.disabled ) return S.eventClear(win);
if( evt.type=="focus" && !obj.keydown ){
if( obj.readOnly ) return S.eventClear(win);
if( obj.type=="radio" ){
return S.eventClear(win);
}
if( type==undefined ){
S(obj).on("keydown", function(){
top.S.key_(obj, "", 0, 0, "", "", "", evt);
});
obj.onfocus = null;
return;
}
if( type=="H" ) type = "H"+long;
var sType = S.type(type), otype,
typeBak = type,
tipos = {F4:10, P4:7, P:7, CP:5, CDI:19, H8:8, H5:5, H2:2, T:S.keyCheck["T"].length-1};
if( sType=="string" ){
if( type.charAt(0)=="@" && type.length>1 ){
sType = "format";
long = sType.length-1;
}else if( tipos[type] ){
sType = "format";
type = S.keyCheck[type];
long = type.length-1;
}
}
otype = sType;
if( !long && sType=="string" && tipos[otype] ){
otype = upper(type);
long = tipos[otype];
dec = 0;
type = S.keyCheck[otype];
sType = "f";
}
if( !long ){
long = S(obj).attr("maxlength");
if( !long ) long = -1;
}
obj["eType"] = type;
if( typeBak=="S" ){
S(obj).on("click", function(){
if( !S(obj).class("?READONLY") ){
S.selectClick(obj);
}else{
S.focusOff(win);
}
S.eventClear(win, arguments[0]);
}).on("keypress,keydown", function(){
if( !S(obj).class("?READONLY") ){
S.selectKey(obj, arguments[0]);
}else{
S.focusOff(win);
return S.eventClear(win);
}
}).on("focusin", function(){
S.session.focus = obj;
obj["eBak"] = obj.value;
S(obj).attr("eBak",obj.value);
S(":"+mid(obj.name,7,0),win).attr("eBak",S.obj.value);
if( !S(obj).attr("eHelpNo") ){
tipShow(obj, false, S.setup.tipSeconds);
S(obj).attr("eHelpNo",1);
}
obj.select();
}).on("focusout", function(){
S.key_(obj, type, long, dec, sType[0], otype, typeBak, evt);
});
S(S("#"+obj.name.replace("_INPUT_","")+"_TABLE", win).obj.parentNode).on("click", function(ev){
S.selectClick(this, ev);
});
obj.onfocus = null;
if( obj.parentNode.className=="SELECTINPUT" ){
S(obj.parentNode).on("click", function(ev){
S.selectClick(obj, ev);
});
}
return;
}
if( obj.tagName=="TEXTAREA" && S(obj).attr("eFitHeight")=="" ){
S(obj).attr("eFitHeight", obj.offsetHeight-2);
}
S(obj).on("keypress,keydown,focusout", function(ev){
if( ev.type=="focusout" && S(obj).attr("copyValue")!=null ){
if( obj["eBak"]!=obj.value ){
S(":"+S(obj).attr("DBRange"), S.objWindow(obj)).val(obj.value);
}
}
var vBak = obj.value;
S.key_(obj, type, long, dec, sType[0], otype, typeBak, ev);
if( uFunc!=null && vBak!=obj.value ) uFunc(obj);
}).on("focusin", function(){
if( obj.readOnly || obj.disabled ) return S.eventClear(win);
if(obj.getAttribute("eFireChange")!=null ){
win[obj.getAttribute("eFireChange")](obj, obj.value, -1);
}
var oFocus = S.session.focus;
S.session.focus = obj;
obj["eBak"] = obj.value;
if( /^(\+|\-|\+,|\-,)/.test(type) ){
var showZero = win._ShowZero;
if( showZero==undefined ) showZero = S.setup.showZero;
if( win._ShowZeroFields && win._ShowZeroFields[obj.name]!=undefined ) showZero = win._ShowZeroFields[obj.name];
obj.value = (S._thousandsClear(obj.value, dec||0, showZero)+"");
if( showZero!=1 && S.replace(obj.value,[["0",""],[",",""],[".",""]])=="" ){
obj.value = "";
}
}
if( S.session.focus!=null && obj.name!=S.session.focus.name ){
return S.eventClear(win);
}
if( !obj["eBakCopy"] ){
if( S.session.focus==null || obj.name!=S.session.focus.name ){
}
}
if( obj.tagName!="BODY" && !S(obj).attr("eHelpNo") ){
tipShow(obj, false, S.setup.tipSeconds);
S(obj).attr("eHelpNo",1);
}
if( S.setup.focusWithSelect ){
if( oFocus!=S.session.focus && document.activeElement!=obj ){
obj.select();
}else{
d = S.posCursor(obj);
if(d[0]!=d[1] ) S.selectionClear();
}
}
}).on("paste", function(){
setTimeout(function(){
S.keyPaste(obj, type, long, dec, sType[0], otype, typeBak );
});
});
obj.onfocus = null;
if( S(":_INPUT_"+obj.name,win).exists() ){
obj["eSelectPK"] = 1;
}
}
}
}
FuncionesDe_SALIR: {
S._exit = function(){
var i;
if( _Socket!=undefined ){
for(i=0; i<2; i++){
if( _Socket[i]!=null ) _Socket[i].disconnect();
}
}
if( _NotificationWarning!=undefined && _NotificationWarning!=null ) NotificationWarning();
if(S.alertInterval) clearInterval(S.alertInterval);
if( typeof(top._gsEditStack)!="undefined" ){
for(i in top._gsEditStack) if( top._gsEditStack[i]!=null ){
try{
top._gsEditStack[i].close();
top._gsEditStack[i] = null;
}catch(e){}
}
for(i=0; i<top._gsEditStack.length; i++) if( top._gsEditStack[i]!=null ){
top._gsEditStack[i].close();
top._gsEditStack[i] = null;
}
}
location.href = 'edes.php?E:$estadistica.gs&F=1';
}
S.exit = function(obj){
var txt = S.lng(263)+((S(".PROGRESSUPLOAD",top).css("display")=="none")?"":".<br><br><span style='color:red;'>"+S.lng(264)+"<br>"+S.lng(265)+"</span><br><br>"),
editor = "",i;
if( typeof(top._gsEditStack)!="undefined" ){
for(i in top._gsEditStack) if( top._gsEditStack[i]!=null ){
editor += "<div style='margin-left:20px'>"+top._gsEditStack[i].name;
if( top._gsEditStack[i].name=="" ) editor += "gsEdit";
editor += "</div>";
}
if( editor!="" ) txt = txt+"<br><br><span style='color:red'>Y se cerrarán los editores</span>"+editor;
}
S.alert({
icon:'<i class="ICONDESKTOP">x</i>',
button:"Y,N",
text:txt,
function: function(op){
if(op==1){
if( obj=="login" ) S.call("E:$estadistica.gs&F=Login");
else S._exit();
}
},
parent:obj
});
}
S.exitNow = function(txt){
S.alert({
title:151,
icon:'<img src="g/sys_exit.gif">',
button:"A",
text:S.lng(254)+"<br>"+S.lng(255,txt),
function: function(){
top.document.write(S.lng(254));
}
});
}
S.exitToTime = function(txt){
if( S("#EXISTSG").exists() ) return;
S.alert({
title:151,
icon:'<img src="g/sys_exit.gif">',
button:"A",
text:txt||S.lng(231, S.session.existMaxSg/60),
});
S('<span class="TOOLBAR ROUNDED ANIMATION" style="z-index:9999999"><table><tbody><tr><td>'+S.lng(256)+'</td><td id="EXISTSG">0:00</td></tr></tbody></table></span>').nodeEnd().center("display:block;top:0px;z-index:9999");
if( S.session.existSg==0 ){
S.session.existSg = S.date("u")/1000;
setInterval(function(){
var sg = S.session.existMaxSg-parseInt((S.date("u")/1000)-S.session.existSg),
mi = parseInt(sg/60);
if( S.session.existSg==0 ){
}else if( sg<1 ){
S.call('edes.php?E:$estadistica.gs&F=1&JS=1');
S.session.existSg = 0;
}else{
sg = sg-mi*60;
if( S("#EXISTSG").exists() ) S("#EXISTSG").text(mi+":"+S.right("0"+sg,2));
}
}, 1000);
}
}
S.exitMaxLife = function(horas, txt){
setTimeout(function(){
S.exitToTime(txt);
}, ((horas*3600)-S.session.existMaxSg-600)*1000);
}
}
FuncionesDe_CADENA: {
S.trim = function(txt){
return (txt+"").replace(/^\s+|\s+$/g,"");
}
S.ltrim = function(txt){
return (txt+"").replace(/^\s+/,"").replace(/^\n+/,"").replace(/^\r+/,"");
}
S.rtrim = function(txt){
return (txt+"").replace(/\s+$/,"").replace(/\n+$/,"").replace(/\r+$/,"");
}
S.trimTextArea = function(txt){
return (txt+"").replace(/ {2,90}/g," ").replace(/^ /g,"").replace(/ $/g,"");
}
S.nsp = function(txt){
return (txt+"").replace(/\s/g,"");
}
S.char = function(n){
return String.fromCharCode(n);
}
S.code = function(txt, n){
return (txt+"").charCodeAt(n==undefined?0:n);
}
S.upper = function(x){
return(typeof(x)=="string" ? x.toUpperCase() : x);
}
S.lower = function(x){
return(typeof(x)=="string" ? x.toLowerCase() : x);
}
S.midn = function(txt, ini, len){
return mid(txt, ini, len)*1;
}
S.mid = function(txt, ini, len, inverso){
var tini=type(ini), tlen=type(len), m, add=false;
txt += "";
if( type(inverso)!="string" && inverso ) txt = S.reverse(txt);
if( tini=="string" && tlen=="string" ){
add = (type(inverso)=="string" && inverso=="");
if( add ) inverso=false;
m = ini.length;
ini = txt.indexOf(ini);
if( ini==-1 ) ini = 0;
else ini+=m;
len = txt.indexOf(len,ini)-ini;
if( len==-1 ) len = txt.length;
if( len==0 ) return "";
}else{
if( tini=="string" ){
if( txt.indexOf(ini)>-1 ){
if( tlen=="number" ){
ini = txt.indexOf(ini)+1;
if( len<0 ) len = txt.length+len-ini;
}else{
len = txt.indexOf(ini);
ini = 0;
}
}
}else if( tini=="number" && tlen=="number" ){
}else if( tlen=="string" ){
len = txt.indexOf(len,ini)-ini;
}else if( tlen=="undefined" ){
if( ini>=0 ){
len = ini;
ini = 0;
}else{
len = ini*-1;
ini = txt.length-len;
}
}
}
if( ini<0 ) ini = txt.length+ini;
len = len || txt.length;
if( len<0 ) len = txt.length+len-ini;
if( inverso ) return S.reverse(txt.substr(ini,len));
if( add ){ini--;len+=2}
return txt.substr(ini,len);
}
S.left = function(txt, ini, len){
if( ini==0 && len==undefined ) return "";
return S.mid(txt, ini, len, false);
}
S.right = function(txt, ini, len){
if( ini==0 && len==undefined ) return "";
return S.mid(txt, ini, len, true);
}
S.fileType = function(txt){
return S.lower(S.right(txt,"."));
}
S.fileFullname = function(txt){
return S.mid(S.replace(txt,"\\","/"),"/", null, true);
}
S.fileName = function(txt){
txt = S.fileFullname(txt);
return S.mid(txt,0,-S.right(txt,".").length-1);
}
S.repeat = function(c,n){
return Array(n+1).join(c);
}
S.reverse = function(x){
return x.split("").reverse().join("");
}
S.count = function(c, str){
return str.replace(new RegExp("[^"+c+"]", "g"), "").length;
}
S.padL = function(x,l,c){
x = (repeat((c || "0"),l)+x);
return x.substr(x.length-l);
}
S.padR = function(x,l,c){
return(x+repeat((c || "0"),l)).substr(0,l);
}
S.stripTags = function(x){
return x.replace(/<\/?[^>]+>/gi,"");
}
S.type = function(obj){
if( obj && obj.type && obj.type=="eDes" ) return "eDes";
var tipo = ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
return( tipo.substr(0,4)=="html" ? "html":tipo);
}
S.splitHash = function(dim, deli, txt){
var d=txt.split(deli), n=0;
for(i in dim){
dim[i] = d[n] ? d[n]:"";
n++;
}
}
S.join = function(dim, deli, key){
var txt="", n=0, i;
if( deli==undefined ) deli = ",";
if( key ){
for(i in dim){
if( i=="eUrl" ){
txt += dim[i]+"?";
}else if( i=="eScript" ){
txt += dim[i];
}else{
txt += deli+i+(dim[i]==undefined ? "" : "="+dim[i]);
}
}
}else{
for(i in dim){
txt += ((n++>0)? deli:"")+dim[i];
}
}
return txt;
}
S.regExp = function(txt){
var mas = (txt.substring(0,1)!='*')?"^":"", i,
dim=[["\\*\\*","*"],
["\\.","\\."],
["\\*",".*"],
["\\+","\\+"],
["\\?","\\?"]];
for(i=0; i<dim.length; i++){
txt = txt.replace(new RegExp(dim[i][0], 'g'), dim[i][1]);
}
return mas+txt;
}
S.replace = function(obj, att){
var arg = arguments, n;
if( type(obj)=="html" ){
if( type(arg[2])=="array" ){
for(n=0; n<arg[2].length; n++){
if( arg[2][n][1]!=undefined ) obj[att] = obj[att].replace(new RegExp(seek(arg[2][n][0]),"g"), arg[2][n][1]);
}
}else{
for(n=2; n<arg.length; n+=2){
if( obj[att] ){
if( arg[n+1]!=undefined ) obj[att] = obj[att].replace(new RegExp(seek(arg[n]),"g"), arg[n+1]);
}else{
if( arg[n+1]!=undefined ) obj.setAttribute(att, obj.getAttribute(att).replace(new RegExp(seek(arg[n]),"g"), arg[n+1]));
}
}
}
return obj;
}else{
if( type(arg[1])=="array" ){
for(n=0; n<arg[1].length; n++){
if( arg[1][n][1]!=undefined ){
if( arg[1][n].length==3 ){
obj = S.replace(obj, arg[1][n][0]+S.mid(obj, arg[1][n][0], arg[1][n][1])+arg[1][n][1], arg[1][n][2]);
}else{
obj = obj.replace(new RegExp(seek(arg[1][n][0]),"g"), arg[1][n][1]);
}
}
}
}else{
if( arg.length==4 ){
obj = S.replace(obj, arg[1]+S.mid(obj, arg[1], arg[2])+arg[2], arg[3]);
}else{
for(n=1; n<arg.length; n+=2){
if( arg[n+1]!=undefined ) obj = obj.replace(new RegExp(seek(arg[n]),"g"), arg[n+1]);
}
}
}
return obj;
}
function seek(x){
return x.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
}
}
S.colapse = function(txt, ini, end, x){
while( is(ini,txt) && is(end,txt) ){
txt = txt.replace(ini+mid(txt,ini,end)+end, x);
}
return txt;
}
S.filterAccent = function(txt){
return txt.replace(S.setup.tick, function($1){
return S.setup.tickClear[$1];
})
}
S.filterChar = function(txt, filter, ignorar){
return txt.replace(new RegExp("["+filter+"]", 'g'+((ignorar==undefined || ignorar)?"i":"")), "");
}
S.resouce = function(pk){
var txt = localStorage.getItem("e-r"+pk)||"", n, arg=arguments;
txt = S.replace(txt, "{#}","{#1}", '&quot;','"', '&#39;',"'", '&#92;',"\\", '&#43;','+', "&#60;","<", "&#62;",">", "&#0A;",S.char(10), "&#0D;",S.char(13));
for(n=1; n<arg.length; n++){
txt = S.replace(txt, "{#"+n+"}", arg[n]);
}
return txt;
}
S.url = function(win, name){
if( win.tagName=="IFRAME" ) win = S.windowObject(win);
if( name==undefined ){
var dim={}, n=0;
(win.location.href+"").replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function($0,$1,$2,$3){
if( n==0 ){
$3 = $1;
$1 = "eUrl";
}else if( n==1 ){
$3 = $1;
$1 = "eScript";
}
dim[$1] = $3;
n++;
} );
return dim;
}else{
var txt = (RegExp("[\\?&]"+name+"=([^&#]*)")).exec(win.location.href);
return (txt==null)?	null:txt[1];
}
}
S.getCookie = function(i){
var dim = document.cookie.split(";"), res=[], tmp, n;
for(n=0; n<dim.length; n++){
tmp = S.trim(dim[n]).split("=");
res[tmp[0]] = tmp[1];
}
return (i==undefined)? res:res[i];
}
S.round = function(num, dec, miles){
var val = (num*1).toFixed(dec);
if( miles ) return S.thousands(val, dec);
return val;
}
S.thousands = function(num, dec, showZero){
if( num!="" && ("<=>").indexOf((num+"").charAt(0))>-1){
return num;
}
if(num=="") num = 0;
if( dec==undefined ){
var x = (num+"").split(".");
dec = x.length>1 ? x[1].length : 0;
}
num = S.round(num, dec, 0);
var x = (num+"").split(S.setup.thousands),
x1 = x[0],
x2 = x.length > 1 ? x[1] : "",
regla = /(\d+)(\d{3})/;
while( regla.test(x1) ){
x1 = x1.replace(regla, "$1"+S.setup.thousands+"$2");
}
x = x1+((x2!="")? S.setup.decimal+padR(x2,dec||x2.length):"");
if( showZero==undefined ) showZero = S.setup.showZero;
if( showZero ) return x;
if( S.replace(x, [["0",""], [S.setup.decimal,""], [S.setup.thousands,""]])=="" ){
if( showZero==undefined ) showZero = S.setup.showZero;
switch( showZero ){
case undefined:
case 0:
x = "";
break;
default:
}
}
return x;
}
S.thousandsClear = function(obj, dec, showZero){
var control = (type(obj)=="html"),
v = ((control) ? obj.value : obj)+"";
if( v!="" && ("<=>").indexOf((v+"").charAt(0))>-1){
return v;
}
if( v=="" ) v = 0;
v = ((v+"").replace(new RegExp("\\"+S.setup.thousands,"g"),"").replace(new RegExp("\\"+S.setup.decimal,"g"), "."))+"";
if( showZero==undefined ) showZero = S.setup.showZero;
if( showZero!=1 && S.replace(v+"", [["0",""], [S.setup.decimal,""], [S.setup.thousands,""]])=="" ){
v = "";
}
if(control) obj.value = v*1;
else return v*1;
}
S._thousandsClear = function(val, dec, showZero){
if( val!="" && ("<=>").indexOf((val+"").charAt(0))>-1){
return val;
}
if( val=="" ) val = 0;
if( showZero==undefined ) showZero = S.setup.showZero;
if( showZero!=1 && S.replace(val+"", [["0",""], [S.setup.decimal,""], [S.setup.thousands,""]])=="" ){
return "";
}
val = (val+"").replace(new RegExp("\\"+S.setup.thousands, "g"), "");
return val;
}
S.serialize = function(dim){
var i, res="";
for(i in dim) res += ((res!="")?"|":"")+i+"|"+dim[i];
return res;
}
S.unserialize = function(txt){
var dim=[], tmp=txt.split("|"), n;
for(n=0; n<tmp.length; n+=2) dim[tmp[n]] = tmp[n+1];
return dim;
}
S.crc32 = function(str){
var i, crc=0^(-1),
tableCRC=(function(){
var c,n,k, table=[];
for(n=0; n<256; n++){
c = n;
for(k=0; k<8; k++) c = ((c&1) ? (0xEDB88320 ^ (c>>>1)) : (c>>>1));
table[n] = c;
}
return table;
})();
for(i=0; i<str.length; i++) crc = (crc>>>8)^tableCRC[(crc^str.charCodeAt(i)) & 0xFF];
return (crc^(-1))>>>0;
}
S.write = function(w, obj, txt){
if( typeof(obj)=="string" ) obj = S.iframe(w, obj);
obj.document.write(txt);
obj.document.close();
}
S.colorTone = function(r, t){
var g,b;
if( S.type(r)=="array" ){
return( [ Op(r[0],t), Op(r[1],t), Op(r[2],t) ] );
}else if( S.mid(r,0,4)=="rgb(" ){
r = r.replace(/(\(|\))/g,",").split(",")
return( [ Op(r[1],t), Op(r[2],t), Op(r[3],t) ] );
}
t = (t+"").replace("%","")*1;
r = r.replace("#","");
if( r.length==3 ) r = r[0]+r[0]+r[1]+r[1]+r[2]+r[2];
g = parseInt(r[2]+r[3],16);
b = parseInt(r[4]+r[5],16);
r = parseInt(r[0]+r[1],16);
return( "#"+Op(r,t)+Op(g,t)+Op(b,t) );
function Op( c, t ){
var inc = t>0 ? Math.floor(((256-c)*t)/100) : -Math.floor((c*(t*-1))/100);
c = (c+inc).toString(16);
return ( c.length<2 ? "0":"")+c;
}
}
S.hex2rgb = function(c){
var rgb=[],n;
c = c.replace("#","");
if( c.length==3 ) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
for( n=0; n<3; n++ ) rgb[n] = parseInt(c.substr(n*2,2),16);
return rgb;
}
S.rgb2hex = function(c){
if( S.type(c)=="string" ) c = S.mid(c,"(",")").split(",");
return "#"+
S.padL((c[0]*1).toString(16),2)+
S.padL((c[1]*1).toString(16),2)+
S.padL((c[2]*1).toString(16),2);
}
S.rgb = function(r, g, b){
return "#"+
S.padL((r*1).toString(16),2)+
S.padL((g*1).toString(16),2)+
S.padL((b*1).toString(16),2);
}
S.fullscreen = function(on){
if( on ){
var e = document.documentElement;
S.each(["r","mozR","webkitR","msR"], function(o,i){
if( e[i+"equestFullscreen"] ) e[i+"equestFullscreen"]();
});
}else{
S.each(["exit","mozCancel","webkitExit","msExit"], function(o,i){
if( document[i+"Fullscreen"] ) document[i+"Fullscreen"]();
});
}
}
S.fn.fullscreen = function(){
var on = (this.obj.textContent==":");
S.fullscreen(on);
S(this.obj).text(on?";":":");
this.obj.title = on?"Restaurar pantalla":"Maximizar pantalla";
}
var divide = function(txt, p, mas){
return (p==-1) ? [txt,""] : [txt.substr(0,p), txt.substr(p+mas)];
}
S.split = function(c, txt){
var p = (type(c)=="number") ? [c,0] : [txt.indexOf(c),1];
return divide.call(this,txt,p[0],p[1]);
}
S.splitLast = function(c, txt){
var p = (type(c)=="number") ? [txt.length-c,0] : [txt.lastIndexOf(c),1];
return divide.call(this,txt,p[0],p[1]);
}
S.lng = function(i, c1, c2, c3){
var txt = localStorage.getItem("e-x"+i);
if( txt==null ){
console.log("ERROR: Clave e-x"+i+" no encontrada");
return "ERROR LNG: "+i;
}
txt = S.replace(txt, '&quot;','"', '&#39;',"'", '&#92;',"\\", '&#43;','+', "&#60;","<", "&#62;",">", "&#0A;",S.char(10), "&#0D;",S.char(13));
txt = txt.replace(/&quot;/g,'"').replace(/&amp;/g,"'").replace(/<br>/gi,"\n").replace(/&#/g,"{~}");
if( typeof(c1)=='object' ){
var win = objWindow(c1);
c1 = win.eGL(c1.name).innerText;
}
txt = S.replace(txt, [["#3",c3], ["#2",c2], ["#1",c1], ["#",c1], ['""',""], ["''",""], ["{~}","&#"]]);
return txt;
}
S.ppublic = function(wdes, k){
var wori = wdes._WOPENER;
if( !S.isNotOnLoad(wori) ) return;
var d=top.S.values(wori), n;
if(k){
wdes["_$$_"] = [];
for(n in d) if( n!="" ){
wdes["$$"+n] = d[n];
wdes["_$$_"][n] = d[n];
}
}else{
for(n in wdes["_$$_"]) if(wdes["_$$_"][n]!=wdes["$$"+n]){
S(":"+n, wori).val(wdes["$$"+n]);
}
}
}
S.publicRow = function(win, row, n){
var cu,c,v;
if( n==1 ){
if( row[0].colSpan>1 ) return;
S("#BROWSE TH[nc]", win).each(function(k,o){
c = S(o).attr("campo,te,td,dcm,nc");
cu = c["campo"];
if( c["campo"][0]=="*" ) cu = S.left(c["campo"],1,0);
v = S.trim(row[c["nc"]].textContent);
if( c["dcm"]==null || c["dcm"]==undefined ) c["dcm"] = 0;
switch(c["te"]){
case "+":case "-": case "+,":case "-,":
v = S.thousands(v, c["dcm"]);
break;
}
win["$"+cu] = v;
});
}else{
}
};
var upper = S.upper,
lower = S.lower,
trim = S.trim,
code = S.code,
padL = S.padL,
padR = S.padR,
nsp = S.nsp,
mid = S.mid,
midn = S.midn,
type = S.type,
repeat = S.repeat,
split = S.split;
splitLast = S.splitLast,
thousandsClear = S.thousandsClear,
lng = S.lng;
}
FuncionesDe_Chequeo: {
S.checkType = {
D: function(fecha){
try{
if( fecha.replace(/\s/g,"")=="" ) return true;
var F = new Date(S.mid(fecha,S.setup.pDate.py,4), (S.mid(fecha,S.setup.pDate.pm,2)*1)-1, S.mid(fecha,S.setup.pDate.pd,2)),
D = padL(F.getDate()+"",2),
M = padL((F.getMonth()+1)+"",2),
A = F.getFullYear()+"";
return((D+"-"+M+"-"+A)==S.mid(fecha,S.setup.pDate.pd,2)+"-"+S.mid(fecha,S.setup.pDate.pm,2)+"-"+S.mid(fecha,S.setup.pDate.py,4));
}catch(e){
return false;
}
},
P: function(p){
if(p=="") return true;
if(p.length!=7) return false;
return S.check("D", S.replace(S.setup.date, [["yyyy",S.mid(p, S.setup.pMonth.py,4)], ["mm",S.mid(p, S.setup.pMonth.pm,2)],["dd","01"]]));
},
CP: function(obj, val){
var nval = val*1,
ok = (val=="" || nval==90000 || (nval>=1001 && nval<=64700));
if(!ok) S(obj).fieldError('Código postal erroneo' );
return ok;
},
NIF: function(val, oLetra){
var oDNI = val.substring(0,8),
Letra = oLetra || val.charAt(8);
if( (oDNI+Letra).match("^[T]{1}[A-Z0-9]{8}$")!=null ) return true;
var DNI = oDNI.replace("X","0").replace("Y","1");
if( DNI.length!=8 ) return false;
if( DNI.length==8 && Letra=="" ) return true;
if( S.setup.dni.indexOf(DNI.substr(0,1))>-1 && Letra=="" ) return true;
if( !isNaN(oDNI+Letra) && Letra=="" ) return true;
if( isNaN(DNI) || !isNaN(Letra) ) return false;
return( Letra.toUpperCase()==S.setup.nif.charAt(DNI%23) );
},
CIF: function(CIF, Letra){
var pares=0, impares=0, suma, dc, resultado, cont,
uLetra = new Array("J","A","B","C","D","E","F","G","H","I");
CIF = CIF.toUpperCase();
if( CIF.length==9 ){
Letra = CIF.charAt(8);
CIF = CIF.substring(0,8);
}
var regular = /^[ABCDEFGHKLMNPQS]\d\d\d\d\d\d\d$/g;
if( !regular.exec(CIF) ) return false;
for( cont=1; cont<7; cont++ ){
resultado = (2 * parseInt(CIF.substr(cont++,1))).toString() + "0";
impares += parseInt(resultado.substr(0,1)) + parseInt(resultado.substr(1,1));
pares += parseInt(CIF.substr(cont,1));
}
resultado = (2 * parseInt(CIF.substr(cont,1))).toString() + "0";
impares += parseInt(resultado.substr(0,1)) + parseInt(resultado.substr(1,1));
suma = (pares + impares).toString();
dc = parseInt(suma.substr(suma.length - 1, 1));
dc = (10 - dc).toString();
if( dc==10 ) dc = 0;
if( (Letra==dc) || (Letra==uLetra[dc]) ) return true;
return false;
},
COMPANY: function(val){
if( val=="" ) return true;
if( isNaN( (val.substring(0,1)).replace("X","0").replace("Y","0").replace("T","0") ) ){
return S.checkType["CIF"](val);
}else{
return S.checkType["NIF"](val);
}
},
NSS: function(nss){
if( nss=="" ) return true;
if( nss.length!=12 ) return false;
var dc = nss.substr(10,2), cad = "";
if( nss.charAt(2)=="0" ){
cad = nss.substr(0,2) + nss.substr(3,7);
}else{
cad = nss.substr(0,10);
}
return(((cad*1) % 97)==dc);
},
PATRONAL: function(nss){
if( nss=="" ) return true;
if( nss.length!=11 ) return false;
var dc = nss.substr(9,2), cad = "";
if( nss.charAt(2)=="0" ){
cad = nss.substr(0,2) + nss.substr(3,6);
}else{
cad = nss.substr(0,9);
}
return(((cad*1) % 97)==dc);
},
IBAN: function(PAIS, BANCO, OFICINA, DC, CUENTA){
PAIS = PAIS.toUpperCase();
var nPAIS = eIBANCountry(PAIS),
iban = "" + (("" + BANCO + OFICINA) % 97) + DC + CUENTA.substring(0,2);
iban = "" + (iban % 97) + CUENTA.substring(2,CUENTA.length) + nPAIS + "00";
var Cod = 98 - (iban % 97);
return PAIS+padL(Cod,2);
function eIBANCountry(PAIS){
return (code(PAIS[0])-55)+""+(code(PAIS[1])-55);
}
},
DC: function(banco, sucur, dc, ccc){
var peso = new Array(1,2,4,8,5,10,9,7,3,6),
suma = ndc = xdc = n = 0, txt = "0";
if( dc=="" ) return true;
if( ccc=="0000000000" ) return false;
if( dc.substring(0,1)!=" " && dc.substring(0,1)!="*" ){
xdc = dc.substring(0,1);
txt = "00" + banco + sucur;
suma = 0;
for( n=1; n<=10; ++n ){
suma += (parseInt(txt.substring(n-1,n)) * peso[n-1]);
}
ndc = (11 - (suma % 11));
if(Math.abs(ndc==10)) ndc = 1;
if(Math.abs(ndc==11)) ndc = 0;
if(xdc!=ndc) return false;
}
if( dc.substring(1,2)!=" " && dc.substring(1,2)!="*" ){
xdc = dc.substring(1,2);
txt = ccc;
suma = 0;
for( n=1; n<=10; ++n ){
suma += (parseInt(txt.substring(n-1,n)) * peso[n-1]);
}
ndc = (11 - (suma % 11));
if(ndc==10) ndc = 1;
if(ndc==11) ndc = 0;
if(xdc!=ndc) return false;
}
return true;
},
P4: function(obj, val){
var v = val || obj.value,
p = S(obj).attr("eFrom,eTo,eMonth");
if( v=="" ) return true;
if( !S.check("P", v) ){
return S(obj).fieldError('Periodo erroneo en "'+S.fieldLabel(obj)+'"');
}
if( p["eFrom"] && v<p["eFrom"] ){
return S(obj).fieldError('El periodo no puede ser inferior a "'+p["eFrom"]+'"');
}
if( p["eTo"] && v>S(obj).attr("eTo") ){
return S(obj).fieldError('El periodo no puede ser superior a "'+p["eTo"]+'"');
}
if( p["eMonth"] && !S.is(mid(v,-2)*1, p["eMonth"]) ){
return S(obj).fieldError("Mes no permitido");
}
return true;
},
F4: function(obj, val){
var v = val || obj.value,
p = S(obj).attr("eFrom,eTo,eMonth");
if( v=="" ) return true;
if( !S.check("D", v) ){
return S(obj).fieldError('Fecha erronea en "'+S.fieldLabel(obj)+'"');
}
if( p["eFrom"] && S.d2s(v)<p["eFrom"] ){
return S(obj).fieldError('La fecha no puede ser inferior a "'+p["eFrom"]+'"');
}
if( p["eTo"] && S.d2s(v)>p["eTo"] ){
return S(obj).fieldError('La fecha no puede ser superior a "'+p["eTo"]+'"');
}
if( p["eWeekday"] ){
var d = v.split("-"),
dp = (new Date(d[2],d[1]-1,d[0])).getDay()-1;
if( dp<0 ) dp=6;
if( !S.is(dp, p["eWeekday"]) ){
return S(obj).fieldError("Día de la semana no permitido");
}
}
return true;
},
CDI: function(v){
if( S.type(v)!="string" ) v = S(v).val();
try{
var d = S.replace(v, " ","-", ":","-", "/","-").split("-"),
cdi = new Date(d[0], (d[1]*1)-1, d[2], d[3], d[4], d[5]);
return (S.date("Y-m-d H:i:s", cdi)==v);
}catch(e){
return false;
}
}
}
S.checkType["M"] = S.checkType["P"];
S.check = function(){
var a = arguments;
return S.checkType[upper(a[0])](a[1], a[2], a[3], a[4], a[5], a[6]);
}
S.format = function(tipo, txt){
if( txt=="" ) return "";
var l = txt.length;
if(tipo=="F4" ){ // al pulsar en el mes un nº>1 pondrá un cero delante y en el día un nº>3
var d = S.mid(txt,S.setup.pDate.pd,2),
m = S.mid(txt,S.setup.pDate.pm,2),
y = S.mid(txt,S.setup.pDate.py,4);
if( l<3 ){
if( txt==0 ) txt = "d";
else if( l==1 ) txt = "0"+txt;
txt = S.date(_FormatDate.replace("d", txt));
}else{
if( d.length==1 ) d = "0"+d;
else if( d=="" ) d = "d";
if( m.length==1 ) m = "0"+m;
else if( m=="" ) m = "m";
if( y.length<4 ) y = S.left(S.date("Y"),4-y.length)+y;
txt = S.date(S.replace(_FormatDate, [["Y",y], ["m",m], ["d",d]]));
}
}else if(tipo=="P4"){
var m = S.mid(txt,S.setup.pMonth.pm,2),
y = S.mid(txt,S.setup.pMonth.py,4);
if( l<3 ){
if( txt==0 ) txt = "m";
else if( l==1 ) txt = "0"+txt;
txt = S.date(_FormatMonth.replace("m", txt));
}else{
if( m.length==1 ) m = "0"+m;
else if( m=="" ) m = "m";
if( y.length<4 ) y = S.left(S.date("Y"),4-y.length)+y;
txt = S.date(S.replace(_FormatMonth, [["Y",y], ["m",m]]));
}
}else if( tipo[0]=="H"){
if( /^(1|4|7)$/i.test(l) ) txt = S.left(txt,l-1)+"0"+S.right(txt,1);
txt += S.left(":00:00", tipo[1]*1-txt.length);
}
return txt;
}
}
S.setup = {
NET: window.external.S||false,
SVG: typeof SVGRect!="undefined",
cssVar: window.CSS && window.CSS.supports && window.CSS.supports("--fake-var", 0),
win: window,
srv: splitLast("/",window.location+"")[0]+"/",
modeInsert: true,
date: "dd-mm-yyyy",
month: "yyyy-mm",
datetime: "yyyy-mm-dd H:i:s",
delimiter: "-:",
filterPhone: "",
calendarDay: 0,
pDate: [],
pMonth: [],
pDateTime: [],
decimal: ",",
thousands: ".",
negative: "-",
showZero: 0,
phone: "999.999.999",
language: "",
enter: true,
focusWithSelect: true,
minimize: true,
selectRows: 11,
tipSeconds: 5,
tipSecondsTH: 10,
tipHandle: null,
systemFields: /^(_HIDDENFIELDS|_MD5|_PARENT_SUBLIST|_SAVEDATALIST|)$/i,
accent: {	status: false,
lowerOn:  "áéíóúâêîôûàèìòùäëïöüãõ",
upperOn:  "ÁÉÍÓÚÂÊÎÔÛÀÈÌÒÙÄËÏÖÜÃÕ",
lowerOff: "aeiouaeiouaeiouaeiouao",
upperOff: "AEIOUAEIOUAEIOUAEIOUAO"
},
charDelete: 160,
tipArrow: null,
positionPriority: "7,6,5,10,9,8,2,3,4,11,12,1,13,15,16,14",
maxFileUploads: 1048576,
errorReporting: true,
loadingBackground: "#ffffff",
listFontSize: null,
checkOn: "S",
dni: "XY",
nif: "TRWAGMYFPDXBNJZSQVHLCKE",
tick: "",
tickClear: {},
phoneWindow: null,
phoneURL: "",
phonePrefix: "",
phoneFeatures: "width=320,height=400,resizable,scrollbars,status=0,menubar=0,toolbar=0,location=0,titlebar=0",
scrollWidth:null,
debug: false
};
S.session = {
isIFrame: false,
wOpener: null,
event: 0,
index: 1000,
zMessage: 999999999,
call: 0,
activeCalls: 0,
activeIFrame: 0,
lastCall: "",
lastIFrame: "",
IFrame: [],
focus: null,
capture: false,
eTime: 0,
unique: 0,
lastKey: 0,
existMaxSg: 60*5,
existSg: 0,
logCallSrv: false,
logCallAnswer: false,
screenshot: "",
helpEdit: null,
notification: window.Notification || window.mozNotification || window.webkitNotification,
_Ventana: [],
access: 5,
runInWindow: 0
};
S.scrollSetWidth = function(){
var div = document.createElement("div");
div.style.cssText = 'width:50px; height:50px; overflow:scroll; position:absolute; top:0px; visibility:hidden;';
document.body.appendChild(div);
S.setup.scrollWidth = div.offsetWidth - div.clientWidth;
document.body.removeChild(div);
return S.setup.scrollWidth;
}
S.TEXT = {};
var keyCheckBin = {
NSS:"0",
TC: "0",
T:  "0",
"*":"0",
CCC:"0",
NAF:"0",
DC: "0"
}
var funcCheck = {
NIF: S.okNIF,
CP: S.okCP
}
var cssVar = {},
cssVarFile = [];
var cssParse = function(){
var dimStyle = S("STYLE").dim,
s,i,pk,txt,titulo, core, grupo, txtgrupo, css, rem;
for(s=0; s<dimStyle.length; s++){
if( dimStyle[s].title=="" ) continue;
dim = dimStyle[s].innerHTML.split("\n");
t = dim.length;
core = false;
grupo = false;
rem = false;
txtgrupo = "";
css = "";
for(i=0; i<t; i++){
txt = dim[i].replace(/^\s+|\s+$/g,"");
if( txt=="" ) continue;
if( txt=="/"+"*coreCSS" ){
core = true;
continue;
}else if( txt=="coreCSS*"+"/" ){
core = false;
continue;
}
if( txt[0]=="/" ) continue;
if( txt=="/"+"*" ){
rem = true;
continue;
}
if( txt=="*"+"/" ){
rem = false;
continue;
}
if( rem ) continue;
if( core && /\/\//.test(txt) ){
txt = S.trim(S.mid(txt,"/"));
}
if( txt[0]=="$" ){
if( S.mid(txt,-1)=="{" ){
grupo = true;
nmgroup = S.trim(S.mid(txt,"$","{"));
txtgrupo = "";
continue;
}else{
tmp = S.split(":",txt);
nmvar = S.trim(S.mid(tmp[0],1,0));
valor = S.trim(tmp[1]);
if( valor.indexOf("{$")>-1 ) valor = cambiaVar( valor );
cssVar[nmvar] = valor;
}
}else if( txt=="}" && grupo ){
grupo = false;
cssVar[nmgroup] = txtgrupo;
}else if( txt.indexOf("{$")>-1 ){
txt = cambiaVar( txt );
}
if( grupo ){
txtgrupo += (txtgrupo!="" ? "\n":"")+txt;
}
if( !core ) css += txt+"\n";
}
dimStyle[s].textContent = css;
}
var op = ["n","display:none", "l","text-align:left", "c","text-align:center", "r","text-align:right"],
s,i,dim=[];
for(s=0; s<40; s++){
for(i=0; i<8; i+=2){
if( i==0 ){
dim.push(
"+.col_"+s+op[i]+" td:nth-child("+(s+1)+"){"+op[i+1]+";}"
);
}else{
dim.push(
"+.col_"+s+op[i]+" th:nth-child("+(s+1)+"), .col_"+s+op[i]+" td:nth-child("+(s+1)+"){"+op[i+1]+";}"
);
}
}
}
S(window).rule(dim);
function cambiaVar( txt ){
var pk = S.mid(txt,"{$","}"), opk=pk, tmp;
if( pk.indexOf("+")>-1 ){
tmp = S.split("+",pk);
if( cssVar[tmp[0]] ){
tmp[0] = cssVar[tmp[0]];
}
if( tmp[0][0]=="#" ){
pk = S.colorTone( tmp[0], tmp[1] );
}else{
pk = S.colorTone( S.mid(pk,"(",")").split(","), tmp[1] );
}
}else if( pk.indexOf("-")>-1 ){
tmp = S.split("-",pk);
if( cssVar[tmp[0]] ){
tmp[0] = cssVar[tmp[0]];
}
if( tmp[0][0]=="#" ){
pk = S.colorTone( tmp[0], "-"+tmp[1] );
}else{
pk = S.colorTone( S.mid(pk,"(",")").split(","), "-"+tmp[1] );
}
}else if( pk.indexOf(":")>-1 ){
tmp = S.split(":",pk);
if( tmp[1]=="hex" ){
tmp = S.rgb2hex( S.mid(cssVar[tmp[0]],"(",")").split(",") );
txt = S.trim(txt.replace("{$"+pk+"}",tmp));
if( txt.indexOf("{$")>-1 ){
txt = cambiaVar( txt );
}
return txt;
}
}
if( pk[0]=="#" ){
txt = S.trim(txt.replace("{$"+opk+"}",pk));
}else{
txt = S.trim(txt.replace("{$"+opk+"}",cssVar[pk]));
}
if( txt.indexOf("{$")>-1 ){
txt = cambiaVar( txt );
}
return txt;
}
}
S.marksSetup = function(op){
var barra = S.char(92), i;
S.setup.decimal = op.decimal;
S.setup.thousands = op.thousands;
S.keyCheck["-,"][0] = ["c", op.thousands, op.decimal];
S.keyCheck["-,"][1] = ["v", op.decimal, "0"+op.decimal];
S.keyCheck["-,"][2] = ["v", "-"+op.decimal, "0"+op.decimal];
S.keyCheck["-,"][3][0] = S.replace(S.keyCheck["-,"][3][0], [[barra+",", ","], [",", barra+op.decimal]]);
S.keyCheck["+,"][0] = ["c", op.thousands, op.decimal];
S.keyCheck["+,"][1] = ["v", op.decimal, "0"+op.decimal];
S.keyCheck["+,"][2][0] = S.replace(S.keyCheck["+,"][2][0], [[barra+",", ","], [",", barra+op.decimal]]);
S.setup.month = op.month;
S.setup.date = op.date;
S.setup.datetime = op.datetime;
S.setup.delimiter = op.delimiter;
S.setup.formatP4 = [new RegExp(op.formatP4[0]), op.formatP4[1], new RegExp(op.formatP4[2]), op.formatP4[3]];
S.setup.formatF4 = [new RegExp(op.formatF4[0]), op.formatF4[1], new RegExp(op.formatF4[2]), op.formatF4[3]];
S.setup.formatCDI = [new RegExp(op.formatCDI[0]), op.formatCDI[1], new RegExp(op.formatCDI[2]), op.formatCDI[3]];
S.setup.formatT = [new RegExp(op.formatT[0]), op.formatT[1], new RegExp(op.formatT[2]), op.formatT[3]];
_Delimiter = op.delimiter;
_FormatMonth = S.replace(op.month, [["yyyy","Y"],["mm","m"]]),
_FormatDate = S.replace(op.date, [["yyyy","Y"],["mm","m"],["dd","d"]]);
_FormatDateTime = S.replace(op.date, [["yyyy","Y"],["mm","m"],["dd","d"],["hh","H"],["ii","i"],["ss","s"]]);
for(i in S.keyCheckVal) if( /^(P4|F4|CDI)/.test(i) ) delete S.keyCheckVal[i];
S.setup.pMonth = _ordenToken(op.month);
S.keyCheckVal["P4-"+(S.setup.pMonth.py+3)] = [4,"#>0"];
S.keyCheckVal["P4-"+(S.setup.pMonth.pm+1)] = [2,"#>0 && #<13"];
S.keyCheckVal["P4-"+(S.setup.pMonth.pm)] = [1,"#>1","0"];
S.setup.pDate = _ordenToken(op.date);
S.keyCheckVal["F4-"+(S.setup.pDate.py+3)] = [4,"#>0"];
S.keyCheckVal["F4-"+(S.setup.pDate.pm+1)] = [2,"#>0 && #<13"];
S.keyCheckVal["F4-"+(S.setup.pDate.pd+1)] = [2,"#>0 && #<32"];
S.keyCheckVal["F4-"+(S.setup.pDate.pm)] = [1,"#>1", "0"];
S.keyCheckVal["F4-"+(S.setup.pDate.pd)] = [1,"#>3", "0"];
S.setup.pDateTime = _ordenToken(op.datetime);
S.keyCheckVal["CDI-"+(S.setup.pDateTime.py+3)] = [4,"#>0"];
S.keyCheckVal["CDI-"+(S.setup.pDateTime.pm+1)] = [2,"#>0 && #<13"];
S.keyCheckVal["CDI-"+(S.setup.pDateTime.pd+1)] = [2,"#>0 && #<32"];
S.keyCheckVal["CDI-"+(S.setup.pDateTime.pm)] = [1,"#>1", "0"];
S.keyCheckVal["CDI-"+(S.setup.pDateTime.pd)] = [1,"#>3", "0"];
S.keyCheck["P4"] = "@"+S.replace(S.setup.month, [[_Delimiter[0],"{"+_Delimiter[0]+"-/. }"], ["yyyy","2999"],["mm","99"]]);
S.keyCheck["F4"] = "@"+S.replace(S.setup.date , [[_Delimiter[0],"{"+_Delimiter[0]+"-/. }"], ["yyyy","2999"],["mm","99"],["dd","99"]]);
var txt = "@"+S.replace(S.setup.datetime, [
["yyyy","2999"],["mm","19"],["dd","39"], ["hh","29"],["ii","59"],["ss","59"],
]), dim = txt.split("");
for(i=0; i<dim.length; i++){
if( dim[i]==_Delimiter[0] ) dim[i] = "{"+_Delimiter[0]+"-/. }";
else if( dim[i]==_Delimiter[1] ) dim[i] = "{"+_Delimiter[1]+":./ }";
}
S.keyCheck["CDI"] = dim.join("");
if( op.phone!=undefined ){
S.keyCheck["T"] = "@"+op.phone;
S.setup.filterPhone = S.filterChar(op.phone, "0-9");
}
if( op.weekday!=undefined && /^(0|1)$/.test(op.weekday) ) S.setup.weekday = op.weekday*1;
function _ordenToken(dato){
var todo = {
y: dato.indexOf("y"),
m: dato.indexOf("m"),
d: dato.indexOf("d"),
h: dato.indexOf("h"),
i: dato.indexOf("i"),
s: dato.indexOf("s")
}, dim={}, bak=[], i,n;
for(i in todo) if( todo[i]>-1 ) dim["p"+i] = todo[i];
for(i in dim) bak.push(dim[i]);
bak.sort();
for(n=0; n<bak.length; n++) for(i in dim){
if( dim[i]==bak[n] ){
dim["o"+i[1]] = n;
break;
}
}
return dim;
}
}
S.keyCheck = {
ACCENT: "",
"-,": [
[ "c", ".", ","	],
[ "v", ",", "0," ],
[ "v", "-,", "0," ],
[ "^[-]?(0?|[1-9]{1}[0-9]{LONG-1})?(,{1}[0-9]{DEC})?$" ]
],
"-": [
[ "^[-]?(0?|[1-9]{1}[0-9]{LONG-1})?$" ]
],
"+,": [
[ "c", ".", ","	],
[ "v", ",", "0," ],
[ "^(0?|[1-9]{1}[0-9]{LONG-1})?(,{1}[0-9]{DEC})?$" ]
],
"+": [
[ "^(0?|[1-9]{1}[0-9]{LONG-1})?$" ]
],
"0": "^[\\d{SEEK}]{LONG}$",
"DC": "^[\\d{SEEK}]{LONG}$",
"N": [ ["U"], ["^[A-ZÑÇÜ\\s\\-.ªº\"'{ACCENTUPR}{SEEK}]{LONG}$"] ],
"n": [ ["L"], ["^[a-zñçü\\s\\-.ªº\"'{ACCENTLWR}{SEEK}]{LONG}$"] ],
"#N":    "^[a-zñçüA-ZÑÇÜ\\s\\-.ªº\"'{ACCENTALL}{SEEK}]{LONG}$",
"D": [ ["U"], ["^[A-ZÑÇÜ0-9\\s\\-.ªº\"',/(){ACCENTUPR}{SEEK}]{LONG}$"] ],
"d": [ ["L"], ["^[a-zñçü0-9\\s\\-.ªº\"',/(){ACCENTLWR}{SEEK}]{LONG}$"] ],
"#D":	 "^[a-zñçüA-ZÑÇÜ0-9\\s\\-.ªº\"',/(){ACCENTALL}{SEEK}]{LONG}$",
"X": [ ["U"], ["^[A-ZÑÇÜ0-9\\s\\-.ªº\"',/()€_\\[\\]:;+=&{ACCENTUPR}{SEEK}]{LONG}$"] ],
"x": [ ["L"], ["^[a-zñçü0-9\\s\\-.ªº\"',/()€_\\[\\]:;+=&{ACCENTLWR}{SEEK}]{LONG}$"] ],
"#X":	 "^[a-zñçüA-ZÑÇÜ0-9\\s\\-.ªº\"',/()€_\\[\\]:;+=&{ACCENTALL}{SEEK}]{LONG}$",
"#U": "U",
"#L": "L",
"#" : "",
"@" : "^[a-zA-Z0-9._%+-@ñÑçÇ{ACCENTALL}{SEEK}]{LONG}$",
"W" : "^[a-zA-Z0-9ñÑçÇ{ACCENTALL}.\\-_/\|:?=&{SEEK}]{LONG}$",
"CLR": [ ["U"],	["^\#[0-9A-F\\#{SEEK}]{LONG-1}$"] ],
"clr": [ ["L"], ["^\#[0-9a-f\\#{SEEK}]{LONG-1}$"] ],
"IP": "^[0-9\.]{0,15}$",
"F":	"^[0-9a-zA-ZñÑüÜçÇ. '\(\)\\-_\#\&\,;"+S.setup.accent.lowerOn+S.setup.accent.upperOn+"{SEEK}]{LONG}$",
"DNI": [ ["U"], ["^[XY0-9{SEEK}]{0,8}$"] ],
"NIF": [ ["U"], ["^[XY0-9TRWAGMYFPDXBNJZSQVHLCKE{SEEK}]{0,9}$"] ],
"nif": [ ["U"], ["^[XY0-9TRWAGMYFPDXBNJZSQVHLCKE{SEEK}]{0,9}$"] ],
"CIF": [ ["U"], ["^[0-9A-Z{SEEK}]{0,9}$"] ],
"cif": [ ["U"], ["^[0-9A-Z{SEEK}]{0,9}$"] ],
"H8": "@29{:. }59{:. }59",
"H5": "@29{:. }59",
"H2": "@29",
"-D": "@39{-./ }19{-./ }2999",
"F4": "@39{-./ }19{-./ }2999",
"P4": "@2999{-./ }99",
"CDI": "@2999{-./ }19{-./ }39 29{:./ }59{:./ }59",
"CP": "@69999",
"T": "@999999999",
"CN": "<>="
};
S.keyCheck.ACCENT["f"] = S.keyCheck.ACCENT["F"];
var keyCheck = S.keyCheck;
S.keyCheckVal = {
"CP-1": [2,"#>0"],
"P4-0": [1,"#>1","0"],
"P4-3": [4,"#>0"],
"P4-6": [2,"#>0 && #<13"],
"F4-0": [1,"#>1","0"],
"F4-1": [2,"#>0 && #<32"],
"F4-3": [1,"#>3","0"],
"F4-4": [2,"#>0 && #<13"],
"F4-9": [4,"#>0"],
"CDI-3": [4,"#>0"],
"CDI-6": [2,"#>0 && #<13"],
"CDI-9": [2,"#>0 && #<32"],
"H8-1": [2,"#<24"],
"H8-4": [2,"#<60"],
"H8-7": [2,"#<60"],
"H5-1": [2,"#<24"],
"H5-4": [2,"#<60"],
"H2-1": [2,"#<24"]
};
S.editScript = function(win){
if( top._M_=="" || !win.location || win.location.href.indexOf("edes.php?E:")==-1 ) return;
var sc = win.location.href;
sc = top.S.mid(sc, "edes.php?E:", (sc.indexOf("&")>-1)? "&":"");
if( win.document.body.oncontextmenu==null ){
win.document.body.oncontextmenu = function anonymous(){
top.gsEdit(win, sc);
return false;
}
}
};
(function(){
var t,i,dimOn,dimOff;
S.setup.tick = S.setup.accent.lowerOn+S.setup.accent.upperOn;
t = S.setup.tick.length;
dimOn = S.setup.tick.split("");
dimOff = (S.setup.accent.lowerOff+S.setup.accent.upperOff).split("");
S.setup.tick = new RegExp("["+S.setup.tick+"]","g");
for(i=0; i<t; i++) S.setup.tickClear[dimOn[i]] = dimOff[i];
})();
(function(a){
document.onkeyup = function(e){
/17-2114-20-19313249323942433245151-21$/.test(a+=""+((e || self.event).keyCode-37)) && S.callSrv('$t/developer_on.php');
a = S.right(a,40);
}
})();
FuncionDe_INICIALIZACION: {
S.init = function(win, css, dim){
if( dim!=undefined ){
for(var i in dim){
S.setup[i] = dim[i];
}
}
S(win).ready( function(){
if( !win.WOPENER ){
S.callCreate(window);
if( win.name=="Main" ) win.onbeforeunload = S._exit;
}
if( top._M_!=undefined && top._M_!="" ){
S.editScript(win);
}
});
if( win.S ){
if( S.setup.maxFileUploads%4!=0 ){
S.setup.maxFileUploads = parseInt(S.setup.maxFileUploads/4)*4;
}
if(css) S.sheetCopyOne(win, css);
return;
}
try{
win.WOPENER = win._WOPENER = win.frameElement.WOPENER;
}catch(e){
win.WOPENER = win._WOPENER = top;
}
win.S = function(p, w, w2){
return top.S(p, w || win, w2 || win);
}
S.setup.win = win;
(function(){
var n, ok=0;
for(n in S){
if( n=="init" ) continue;
if( ok==1 && n!="tip" ){
win.S[n] = top.S[n];
}
if( n=="version" ) ok++;
}
})();
win.S["key"] = function(type,long,dec,uFunc){
return top.S.key(win, type, long, dec, uFunc);
}
win.S["eventClear"] = function(){
return top.S.eventClear(win);
}
win.S["click"] = function(){
return top.S.click(win, arguments[0], arguments[1], arguments[2]);
}
win.S["tip"] = function(){
return top.S.tip(win, arguments[0], arguments[1], arguments[2]);
}
win.S["info"] = function(){
return top.S.info(win, arguments[0], arguments[1], arguments[2]);
}
win.S["infoHide"] = function(){
return top.S.info(win, arguments[0]);
}
win.S["ok"] = function(){
return top.S.ok(win, arguments[0], arguments[1]);
}
win.S["warning"] = function(){
return top.S.warning(win, arguments[0], arguments[1]);
}
win.S["error"] = function(){
return top.S.error(win, arguments[0], arguments[1], arguments[2]);
}
win.S["xy"] = function(){
return top.S.xy(win, arguments[0]);
}
win.S["colNumber"] = function(cmp){
return top.S.colNumber(win, cmp);
}
win.S["modal"] = function(css){
return top.S(win.document.body,win).modal(css);
}
win.S["event"] = function(win, tag, saltar){
return top.S.event(win, tag, saltar);
}
win["eIndex"] = function(n){
return top.eIndex(n, win);
}
win.S["call"] = function(url, datos, p){
if( p ){
p["window"] = win;
}else{
p = {window: win};
}
top.S.call(url, datos, p);
}
win.S["selectReset"] = function(txt, ConChange){
S.selectReset(txt, win, ConChange);
}
win.S["selectClear"] = function(txt, ConChange){
S.selectClear(txt, ConChange, win);
}
win.S["selectAttr"] = function(txt, attr){
return top.S.selectAttr(txt, attr, win);
}
win.S["createHTML"] = function(html){
return top.S.createHTML(html, win);
}
win.S["values"] = function(val, change){
return top.S.values(win, val, change);
}
win.S["public"] = function(k){
if( !S.isNotOnLoad(win) ) return;
var d=top.S.values(win), n, v;
if(k){
win["_disableOnChange"] = false;
win["_$_"] = [];
for(n in d) if( n!="" ){
v = S(":"+n, win).val();
win["$"+n] = v;
win["_$_"][n] = v;
}
}else{
for(n in win["_$_"]) if(win["_$_"][n]!=win["$"+n]){
if( win["_disableOnChange"] ){
S(":"+n, win).val(win["$"+n], false);
}else{
S(":"+n, win).val(win["$"+n]);
}
}
}
}
win.S["disableOnChange"] = function(){
win["_disableOnChange"] = true;
}
win.S["slPublic"] = function(dim, k, oWin, pWin){
var d=dim.split(","), n, v, t=d.length;
if(k){
for(n in pWin["_$_"]) if(pWin["_$_"][n]!=pWin["$"+n]){
oWin.ePF(n, pWin["$"+n]);
}
}else{
pWin["_$_"] = [];
for(n=0; n<t; n++){
v = S(":"+d[n], oWin).val();
pWin["$"+d[n]] = v;
pWin["_$_"][d[n]] = v;
}
}
}
win.S["callSrv"] = function(html){
return top.S.callSrv(html, win);
}
win.S["sliderPut"] = function(campo, valor){
return top.S.sliderPut(win, campo, valor);
}
win.S["labelFix"] = function(cmp){
top.S.labelFix(win, cmp);
}
win.S["window"] = function(url, p){
return top.S.window(url, p, win);
}
win["onerror"] = function(msg, url, lin, col, errObj, window){
top.window.onerror(msg, url, lin, col, errObj, win);
}
win.S["body"] = function(){
win.document.body.style.visibility = "visible";
}
win.S["toTag"] = function(o, tag, saltar){
if( S.type(o)=="string" ) o = S(o, win).obj;
return top.S.toTag(o, tag, saltar);
}
win["_TError"] = 0;
win["__eLINE__"] = 0;
win.S.session.isIFrame = true;
if( css ){
S((css+",print").split(","),null).each(function(pk,css){
S.sheetCopyOne(win, css);
});
}
if( top.eTest ){
win["eTest"] = function(){
var dim=[win], arg=win["eTest"].arguments, n;
for(n=0; n<arg.length; n++) dim[n+1] = arg[n];
return top.eTest(dim);
}
}
}
}
}();
var _Socket=[null, null];
function eChat(url, func, tools, development){
var ns = (development) ? 1:0;
if( S.type(func)!="function" ){
if( tools==undefined ) tools = "";
_Socket[ns].emit('put', {user:_User, room:url, msg:func, tools:tools});
return;
}
func("connecting", null);
_Socket[ns] = io.connect(url);
_Socket[ns].on('connect', function(){
func("connect", null);
});
_Socket[ns].on('expired', function(){
func("expired", null);
});
_Socket[ns].on('disconnect', function(){
func("disconnect", null);
});
_Socket[ns].on('get', function(data){
func("get", data);
});
_Socket[ns].on('room', function(data){
func("room", data);
});
_Socket[ns].on('exe', function(data){
func("exe", data);
});
_Socket[ns].on('tools', function(data){
func("tools", data);
});
window.onbeforeunload = function(e){
for(var ns=0; ns<2; ns++){
if( _Socket[ns]!=null ) _Socket[ns].disconnect();
}
};
}
function eChatChannel(channel, json, development){
var ns = (development) ? 1:0;
_Socket[ns].emit(channel, json);
}
var _DimEvent=[],
_UltimaURL='';
function eSWOpen(wPadre, src, Titulo, Modal, w,h,x,y, ConMinimizar, ConMaximizar, PrefijoClass, ConFormStatic, ObjIcono){
var dim = {
title:(Titulo||""),
modal:(Modal==undefined ? true:Modal),
minimize:(ConMinimizar||true),
maximize:(ConMaximizar||true),
close:(ConFormStatic||true),
fullscreen:(w==0),
wopener:wPadre
};
if( w && w>0 ) dim["w"] = w;
if( h && h>0 ) dim["h"] = h;
if( x && x>0 ) dim["x"] = x;
if( y && y>0 ) dim["y"] = y;
S.eventClear(wPadre);
return S.window(src, dim);
}
function eSWSetCaption(win, txt, ok){
S(win).windowCaption(txt, ok);
}
function eSWGetCaption(win, conTag){
return S(win).windowGetCaption(conTag);
}
function eSWTools(win, op, obj, func){ return S(win).windowIcon(op, obj, func); }
function eSWClose(win){
if( S(win).windowIs() ) S(win).window();
}
function eSWOnClose(win, ObjFunc, ConCierre){
S(win).windowIcon("CLOSE", ObjFunc);
}
function eSWResize(win, w, h){
if( !S(win).windowIs() ) return null;
if( S(win.frameElement).attr("eNORESIZE")!=null ) return;
if( !S(win.frameElement).attr("eSubWin")==null ) return;
if(w==undefined ){
setTimeout(function(){
S(win).goto(0,0);
S(win).windowResize("100%", "100%", 0, 0, false, true);
}, 0);
}else{
var iframe=win.frameElement, margen=10;
w = (w!=undefined) ? w+margen : document.body.scrollWidth;
h = (h!=undefined) ? h+margen : document.body.scrollHeight;
iframe.style.width = w+"px";
iframe.style.height = h+"px";
S(S.toTag(iframe,"SPAN","*")).center();
}
}
function eSWIResize(win, ancho, alto){
if( !S(win).windowIs() ) return null;
if( S(win.frameElement).attr("eNORESIZE")!=null ) return;
if( S(win.frameElement).attr("eSubWin")!=null ){
if( (ancho==0 && alto==0) || (ancho==undefined && alto==undefined) ){
setTimeout(function(){
S(win).goto(0,0);
S(win).windowResize("100%", "100%", 0, 0, false, true);
}, 0);
}else{
S(win).windowResize(ancho, alto, true).center();
}
}
}
function eSWMove(win, x, y, Aqui, x2,y2){
if( !S(win).windowIs() ) return null;
S(win).move({x:x, y:y});
}
function eSWView(win){
if( S(win).windowIs() ){
top.S.windowView(win.frameElement);
}
}
function eSWLoading(win, on){
S.loading(win, on);
}
function eSWSetStatus(){}
function eSWLoadingHidden(win, onOff){}
function eSWFocus(){}
function eSWSetIcon( ObjIcono, wPadre, src, Titulo, Modal, w,h,x,y, Min, Max, PrefijoClass ){
if( ObjIcono.SW!=undefined ){
try{
_swDim['swV_'+ObjIcono.SW].HWINDOW._FormularioModifica();
}catch(e){}
_eSWShow( ObjIcono.SW );
return _swDim['swV_'+ObjIcono.SW].HWINDOW;
}else{
return eSWOpen( wPadre, src, Titulo, Modal, w,h,x,y, Min, Max, PrefijoClass, 1, ObjIcono );
}
}
function _eSWShowVHIDDEN( Obj ){
if( Obj==undefined ) Obj = S.eventObj(win.event);
if( swVHIDDEN.rows.length==1 ){
top.eInfo(window,'No hay ventanas minimizadas');
return;
}
var xy = eXY( Obj );
swVHIDDEN.style.display = 'block';
try{
var x = xy[0]-swVHIDDEN.clientWidth+Obj.clientWidth;
if( x<0 ) x = 0;
with( swVHIDDEN.style ){
left = x;
top = xy[1];
}
}catch(e){}
}
function eSWMenuAdd(win){
var span = S.toTag(win.frameElement,"SPAN","*"),
obj = S("i",span), n, td, NewIcon = '<I class="ICONWINDOW" onclick="_swCapturaMenu(window)" title="Menú">0</I>';
for(n=0; n<obj.length; n++){
if( obj.dim[n].textContent=="0" ){
return;
}
}
td = span.children[0].rows[0].cells[1];
if( td.getAttribute("eBakIcon")==null ){
td.setAttribute("eBakIcon", td.innerHTML);
td.innerHTML = NewIcon+td.innerHTML;
}else{
td.innerHTML = NewIcon+td.getAttribute("eBakIcon");
}
}
function eSWMenuDel(win){
var span = S.toTag(win.frameElement,"SPAN","*"),
obj = S("i",span), n;
for(n=0; n<obj.length; n++ ){
if( obj.dim[n].textContent=="0" ){
S(obj.dim[n]).nodeRemove();
break;
}
}
}
function _swCapturaMenu(win){
var obj = S.event(win),
span = S.toTag(obj,"SPAN"),
iframe = S("IFRAME",S.toTag(obj,"SPAN")).obj.contentWindow;
try{
obj.onclick = function anonymous(){ iframe.uMenuLTools(obj); }
S.eventFire(obj, 'click');
}catch(e){
}
}
function eShowHelp(txt, sg){
S.tip();
S("body").tip(txt,sg);
}
function eDelHelp(){
S.tip();
}
var oFileHelp_= null;
function eFileHelp_(txt){
if( txt!="" ){
S.info(txt);
S(oFileHelp_!=null ? oFileHelp_:"BODY").around(top.S(".TIP").class("+HELP"));
}
}
function eFileHelp(txt, ev){
S.call('edes.php?A:'+escape(txt), null, {return:eFileHelp_});
}
function gsHelp(txt, ev, eCtrlKey){
txt = S.replace(txt, ",", ".", ".TITLEICON", "", "/", "_");
while( S.right(txt,1)=="," ){
txt = S.left(txt,0,-1);
}
try{
if( ev && ev.target.getAttribute("eCtrlKey")!=null ){
eCtrlKey = true;
ev.target.removeAttribute("eCtrlKey");
}
if( _M_!="" && ((null!=ev && ev.ctrlKey) || eCtrlKey) ){
try{
S.window("edes.php?E:$t/help.php&HELP="+escape(txt), {title:"Edita ayuda: "+S.replace(txt,",","."), fullscreen:true});
}catch(e){}
return S.eventClear(ev);
}
}catch(e){}
oFileHelp_ = (ev)? ev.target : null;
S.call('edes.php?A:'+escape(txt), null, {return:eFileHelp_});
return S.eventClear(ev);
}
function Terminar(txt){
document.body.style.padding = "20px";
if( txt!=undefined && S.type(txt)!="html"){
document.write(txt);
}else{
document.write("Aplicación cerrada<br><br><a c=1 href='"+top.location.href+"'>login</a>");
}
}
function eLoading(on, win){
if( win!=undefined ){
S.loading(win, on);
}
}
function eLoadingHidden(on, win){
S.loading(win, on);
}
function Avisar(){}
function eToDoRun(){}
function eLoadCore(win){
top.S.init(win);
}
function eGetCss(win, regla, att){
return S.ruleGet(win, regla, att);
}
function eSubStr(txt, i, f){
f = f || txt.length;
if( f<0 ) f = txt.length+f;
return txt.substring(i,f);
}
function eColorTone(r, t){
return S.colorTone( r, t );
}
function eHexToRGB(c){
var rgb=[],n;
if( c.substr(0,1)=="#" ) c = c.substr(1);
for( n=0; n<=2; n++ ) rgb[n] = parseInt(c.substr(n*2,2),16);
return rgb;
}
function eColorDiff(l, p){
l = eHexToRGB(l);
p = eHexToRGB(p);
return (Math.max(l[0],p[0])-Math.min(l[0],p[0])) + (Math.max(l[1],p[1])-Math.min(l[1],p[1])) + (Math.max(l[2],p[2])-Math.min(l[2],p[2]));
}
function eColorLuminosity( c ){
var c = eHexToRGB(c);
return ((c[0]*299) + (c[1]*587) + (c[1]*114))/1000;
}
function eColorLuma(c){
var c = eHexToRGB(c);
return (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
}
function eColorBrightness(c1, c2){
return Math.abs(eColorLuminosity(c1)- eColorLuminosity(c2));
}
function eColorContrastBW2(c){
return( eColorLuma(c)>=165 )?"#000000":"#FFFFFF";
}
function eColorContrastBW(c){
c = eHexToRGB(c);
return( (c[0]+c[1]+c[2])<382.5 )?"#ffffff":"#000000";
}
function eColorRange(cIni, cFin, tTonos, iTono){
var i, v, p=1, txt='#', Ini = new Array(), Fin = new Array();
cIni = cIni.replace('#','');
cFin = cFin.replace('#','');
for(i=0; i<6; i+=2){
Ini[p] = (eval('0x'+cIni.charAt(i))*16)+(eval('0x'+cIni.charAt(i+1)));
Fin[p] = (eval('0x'+cFin.charAt(i))*16)+(eval('0x'+cFin.charAt(i+1)));
p++;
}
for(i=1; i<4; i++){
v = Ini[i]+Math.floor(Math.abs(Fin[i]-Ini[i])/tTonos*iTono);
c = ((Math.floor(v/16)).toString(16)) + ((v-(Math.floor(v/16)*16)).toString(16));
txt += (c.length>2) ? ((Ini[i]>Fin[i]) ? 'FF':'00') :c.toUpperCase();
}
return txt;
}
function eClearEvent(win){
return S.eventClear(win);
}
function gsHelpErr(win){}
function eITools(){}
var DGI	= function(a){
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
return S.lng(i, c1, c2, c3);
}
function eLngPut(){
}
function SwapImg(oImg, Ori, Des){
S.replace(S(oImg).obj, "src", Ori, Des);
}
function eAlert(Titulo, Nota, Botones, Img, MyFunc, DimForm, DimParametros, uEnterF10){
if( Nota==undefined ){
S.alert(Titulo);
}else{
var n=0, dimF=null, dimB=null;
if( DimForm!=undefined ){
Nota = {
class:"INFO",
style:["","b"],
text:Nota
}
if( S.type(DimForm)=="array" && S.type(DimForm[0])!="array" && DimForm[0].split("|").length>8 ){
dimF = DimForm;
}else{
dimB = [];
for(n=0; n<DimForm.length; n++) dimB[n] = [DimForm[n][0], DimForm[n][4]];
Nota.body = dimB;
}
}
S.alert({
title:Titulo,
icon:Img,
button:Botones||"A",
text:Nota,
form:dimF,
function: MyFunc,
parameter: DimParametros ? DimParametros:null
});
}
}
function eAlertText(x){ S.alert(x); }
function eAlertHide(){ S.alert(); }
function eXY(el, obj){
var c = (obj) ? S(el).around(obj) : S(el).xy();
return Array(c["x"],c["y"],c["w"],c["h"]);
}
function eXYWindow(win, xy){
if( typeof(xy)=="undefined" ) xy = [0,0];
var box;
if( win.name!="Main" ){
box = win.frameElement.getBoundingClientRect();
}else{
return xy;
}
xy[0] += box.left;
xy[1] += box.top;
if( win.name!="Main" ) xy = eXYWindow( win._WOPENER, xy );
return xy;
}
function eInfo(win, men, sg, tit){
if( win.tagName ){
S(win).tip(men, sg||3);
}else{
S(win.document.body||top.document.body).tip(men, sg||3);
}
}
function eInfoHide(win){
if( S("#TIP",win).exists() ) S(win).tip();
}
function eInfoError(win, txt, sg, sTitle){
S.error(win, txt, "14");
}
function eMenu(win, Obj, Dim, nomFunc, EnXY, SubMenus, uValue, Fijo, funcContext){
var newDim=[], n, ico, tmp, pk,
oParent = S.event(win);
if( Dim.length==undefined ){
for(n in Dim){
pk = n;
if(n[0]==".") n = S.mid(n,1,0);
if(n[0]=="-" || n[0]=="~") n = "-";
if( n[0]=="-" ){
newDim.push(["-"+Dim[pk]]);
}else{
ico = "";
if( Dim[pk][0]=="[" ){
tmp = S.split("]",S.mid(Dim[pk],1,0))
ico = "["+tmp[0]+"]";
Dim[pk] = tmp[1];
}
if( S.right(Dim[pk],1)!="-" ){
newDim.push([Dim[pk], ico, n]);
}else{
newDim.push([S.left(Dim[pk],0,-1), ico, n, "",, "", "-"]);
}
}
}
}else{
for(n in Dim){
pk = n;
if(n[0]==".") pk = S.mid(n,1,0);
if( pk[0]=="-" || pk[0]=="~" ){
newDim.push(["-"+Dim[n]]);
}else{
ico = "";
if( Dim[n][0]=="[" ){
tmp = S.split("]",S.mid(Dim[n],1,0))
ico = "["+tmp[0]+"]";
Dim[n] = tmp[1];
}
newDim.push([Dim[n], ico, pk]);
}
}
}
Fijo = (typeof(Fijo)=='undefined') ? true :!Fijo;
return S(Obj,win).menu(newDim, {function:nomFunc, trigger:oParent, drop:Fijo, arg:{show:true}, oncontextmenu:funcContext}, {arg:uValue});
}
function eToTag( obj, tag, cond ){
return S.toTag(obj, tag, cond||"*");
}
function eStyleWidth(e){
return(e=='auto' ? 0 : parseInt(e));
}
function eAutoMenu(on){
if( typeof(top.wpConsMenu)!="undefined" ){
top.wpConsMenu(2, on?"H":"S");
}else if( S(".TREEMIN").length && S(".TREEMIN").obj.offsetWidth>0 ){
}else if( S(".TREEMAIN").length && (S(".TREEMAIN").attr("eAutoHidden")==1 || S(".TREEMAIN").attr("eAutoHiddenOptional")==1)){
if(on){
S(".TREEMAIN").none();
S("#_TREEBUTTON").visible();
}else{
S(".TREEMAIN").block();
S("#_TREEBUTTON").hidden();
}
}
}
function eBodyBackground(win){
}
function eIWorkLocation(url, ConLoading){
if( ConLoading==undefined || ConLoading ) eLoading(1, frames["IWORK"]);
try{
if( !eReadyState(frames["IWORK"]) ){
setTimeout(function(){
eIWorkLocation(url, ConLoading);
}, 500);
}else{
if( url.indexOf('edes.php?')==-1 && url.indexOf(':')>-1 && url.indexOf(':')<4 ) url = 'edes.php?'+url;
url = S.urlAdd(url, top, "WWORK", frames["IWORK"]);
frames["IWORK"].document.location.href = url;
}
}catch(e){
setTimeout(function(){
eIWorkLocation(url, ConLoading);
}, 500);
}
}
function eGetIFrameById(win, NomIFrame){
for(var i=0; i<win.frames.length; i++){
if( win.frames[i].window.frameElement.id==NomIFrame ) return win.frames[i];
}
return null;
}
function eGetIFrameByName(win, NomIFrame){
for(var i=0; i<win.frames.length; i++){
if( win.frames[i].window.frameElement.name==NomIFrame ) return win.frames[i];
}
return null;
}
function eGetIFrameByUrl(win, url){
for(var i=0; i<win.frames.length; i++){
if( win.frames[i].window.frameElement.src.indexOf(url)>-1 ) return win.frames[i];
}
return null;
}
function eRun(url, para){
if( para!=undefined ) url = para;
var w = window.open(url,"_blank");
if(w==null || typeof(w)=='undefined'){
setTimeout(function(){
S.error(window,"Por favor deshabilita el bloqueador de ventanas<br>emergentes y vuelve a ejecutar la opción","14");
},1000);
}
}
function eNewIFrame(win, IdPadre, IdIFrame, url, Ancho, Alto){
var nw = win.document.createElement('IFRAME');
nw.id = nw.name = IdIFrame;
nw.frameBorder = "0px";
nw.WOPENER = win;
nw.eNORESIZE = true;
nw.style.width = (Ancho==undefined || Ancho==null)?'100%':Ancho;
nw.style.height = (Alto==undefined || Alto==null)?'100%':Alto;
if( url!=undefined && url!=null ){
url = S.urlAdd(url, win, "WWORK", nw);
nw.src = url+"&_NEWIFRAME=1";
}else{
nw.src = 'about:blank';
}
if( typeof IdPadre=="string" ){
win.document.getElementById(IdPadre).appendChild(nw);
}else{
IdPadre.appendChild(nw);
}
return nw;
}
function eNewIframe(win, IdPadre, IdIFrame, url, Ancho, Alto){
return eNewIFrame(win, IdPadre, IdIFrame, url, Ancho, Alto);
}
function eHelp(Ayuda){
S.call('edes.php?AL:'+escape(Ayuda)+'&T=P&D=A', null, {return:function(txt){
S.info(txt).modal();
S.focusOff();
}});
}
function eUrl(url, name, win){
if( !/^edes.php/.test(url) ) url = 'edes.php?'+url;
if( win ){
win = win.frames[name];
}else win = frames["IWORK"];
url = S.urlAdd(url, win, "MAIN", win);
win.location.href = url;
}
function eRepairIFrame(wPadre, wTLF){
}
function eCallSrv(win, url, Cond){
if( Cond!=undefined && !Cond ) return null;
if( win.event ) S.eventClear(win);
return S.callSrv(url, win);
}
function _eCallSrv(w, file, Cond){
eCallSrv(w, file, Cond);
}
function _eCallSrvPost(win){
if( TLF.frameElement.eHTML=='' ) return;
TLF.document.open("text/html","replace");
TLF.document.write(TLF.frameElement.eHTML);
TLF.frameElement.eHTML = "";
TLF.frameElement.style.backgroundColor = "#f2f2f2";
TLF.document.forms[0].submit();
}
function eCallSrvPost(url, Dim, win){
if( win!=undefined ){
TLF.frameElement.WOPENER = win;
}
if( S.right(url,2)=="?M" ){
for(i in Dim) if( i=="DB" ) url += "&_DB="+Dim[i];
}
url = S.urlAdd(url, win, "MAIN", TLF);
var txt = '<FORM METHOD=POST action="'+url+'" style="display:none">',i;
for(i in Dim){
if( i!="DB" ) txt += '<TEXTAREA TYPE="text" NAME="'+i+'">'+((typeof(Dim[i])=='number') ? Dim[i] : Dim[i].replace(/"/g,'&quot;'))+'</TEXTAREA>';
}
txt += '</FORM>';
if( win!=undefined ) TLF.frameElement.WOPENER = win;
TLF.frameElement.eHTML = txt;
TLF.location.href = 'edes.php?E:$aboutblank.gs&FUNCTION=_eCallSrvPost';
}
function eClearPag(win){
try{
win.location.href = 'about:blank';
return true;
}catch(e){}
return false;
}
function eReadyState(win){
return S.isReady(win);
}
function eReadyStateLocal(win){
return S.isReady(win);
}
function eIsWindow(win){
return S(win).windowIs();
}
var _eAddEvent = new Array();
function _eEventHREF( v, d, p ){
var HOY = new Date();
var d = 0;
var h = HOY.getHours()*1;
var m = HOY.getMinutes()*1;
if( typeof(v)=='string' ){
v = v.replace('aviso_','').replace('.gif','');
if( v.indexOf('m')>-1 ){
m = m+(v.replace('m','')*1);
if( m > 60 ){
m -= 60;
h++;
if( h==24 ){
h = 0;
d++;
}
}
_eEventToRun( p, h+':'+m, d );
}else if( v.indexOf('d')>-1 ){
d = 1;
}else{
h = h+(v.replace('h','')*1);
if( h==24 ){
h = 0;
d++;
}
_eEventToRun( p, h+':'+m, d );
}
eCallSrv( window, 'edes.php?w:'+_eAddEvent[p][1]+','+_eAddEvent[p][7]+','+d+':'+h+':'+m );
return;
}else{
if(v==0) v=-2;
eCallSrv( window, 'edes.php?w:'+_eAddEvent[p][1]+','+_eAddEvent[p][7]+','+v+'::' );
}
if( v==2 && _eAddEvent[p][5]!=undefined ){
if( _eAddEvent[p][6]==undefined ) _eAddEvent[p][6] = '';
eSWOpen( window, _eAddEvent[p][5], _eAddEvent[p][6] );
}
}
function eEventReset(){
try{
for(var n=0; n<_eAddEvent.length; n++) clearTimeout(_eAddEvent[n][0]);
_eAddEvent = new Array();
}catch(e){}
}
function _eEventView( n ){
if( __eAlert ){
setTimeout( '_eEventView('+n+')', 2500 );
return;
}
document.body.focus();
eAlert( S.lng(211), _eAddEvent[n][3]+'\n'+_eAddEvent[n][4], 'A,N,C|'+(WE.eLng(15)+','+WE.eLng(16)+','+WE.eLng(17)).replace(/\s/g,'&nbsp;'), 'g/sys_alert_date.gif', window._eEventHREF, Array( Array('g/aviso_05m.gif',0,WE.eLng(18,'5'),'',n), Array('g/aviso_15m.gif',0,WE.eLng(18,'15'),'',n), Array('g/aviso_1h.gif',0,WE.eLng(19),'',n), Array('g/aviso_1d.gif',0,WE.eLng(20),'',n)	), n );
}
function _eEventToRun(n, oHM, d){
var HOY = new Date(), AVISAR,
HM = oHM.split(':');
AVISAR = new Date( HOY.getFullYear(), HOY.getMonth(), HOY.getDate()+d, HM[0], HM[1], 0 );
var t = AVISAR.getTime()-HOY.getTime();
if( t<1 ) t = 1;
_eAddEvent[n][0] = setTimeout('_eEventView('+n+')', t);
}
function eEventRun(){
for(var n=0; n<_eAddEvent.length; n++) _eEventToRun( n, _eAddEvent[n][2], 0 );
}
function eDate(Formato, Fecha){
return S.date(Formato, Fecha);
}
function eAddMonth(txt, n){
return S.monthAdd(txt, n);
}
function eD2S(d,s){
return S.d2s(d);
}
function eDTS(d,s){
return S.d2s(d);
}
function eS2D(d){
return S.s2d(d);
}
function eSTD(d){
return S.s2d(d);
}
function eStringToDate(s){
return S.dateType(S.d2s(s));
}
function eAddDaysToDate(fecha, dias){
return S.dateAddDays(fecha, dias);
}
function eAddMonthToDate(s, m){
return S.dateAddMonth(s, m);
}
function eAddYearsToDate(Fecha, Ayos){
return S.dateAddYear(Fecha, Ayos);
}
function eDaysInDates(fechaEnd, fechaIni){
return S.dateDiff(fechaEnd, fechaIni);
}
function eDaysInMonth(ayo, mes){
return S.monthDays(ayo, mes);
}
function eCheckDate(Fecha){
return S.check("D", Fecha);
}
function ePeriodDiff(pi, pf){
return S.monthDiff(pi, pf);
}
var _F9Mem = new Array();
function _MemorizaOnOff(campo, op, title, win){
var obj = win.eIndex(win.DGI(campo).sourceIndex+1);
while( /^(IMG|I)$/.test(obj.tagName) ){
if( (obj.onclick+"").indexOf('FunPadre(this,"p")')>-1 ){
S(obj).title(title).class(op+"OFF");
break;
}else obj = win.eIndex(obj.sourceIndex+1);
}
}
function Memoriza(el, win){
var campo = el.id.substring(1),
valor = win.eGF(campo),
title = (S(":_INPUT_"+campo,  win).length) ? win.eSelectValue(campo) : valor;
if( valor=="" ){
delete _FIELDS["_fld_"+campo];
_MemorizaOnOff(campo, "+", "Pegar", win);
}else{
win.eIndex(el.sourceIndex+1).title = title;
win.eFocus(campo);
if( _FIELDS["_fld_"+campo]==undefined ){
_FIELDS["_fld_"+campo] = "|";
_FIELDS["_lbl_"+campo] = "";
}
_FIELDS["_fld_"+campo] = S.replace(_FIELDS["_fld_"+campo], "|"+valor+"|", "|");
_FIELDS["_fld_"+campo] += valor+"|";
_FIELDS["_lbl_"+campo] = title;
_MemorizaOnOff(campo, "-", title, win);
if( S.count("|", _FIELDS["_fld_"+campo])>6 ){
_FIELDS["_fld_"+campo] = "|"+_FIELDS["_fld_"+campo].split("|").splice(2,6).join("|");
}
}
_SaveDefaults();
}
function SetMemoriza(campo, win){
var title;
if( _FIELDS["_fld_"+campo]!=undefined ){
title = (win.DGI('_INPUT_'+campo)!=null) ? S.left(S.right(top._FIELDS["_fld_"+campo], "|", 2), 1, 0) : _FIELDS["_lbl_"+campo];
_MemorizaOnOff(campo, "-", title, win);
}
}
function Restaura(el, win){
var campo = el.id.substring(1), n, dim;
if( _FIELDS["_fld_"+campo]!=undefined ){
dim = _FIELDS["_fld_"+campo].split("|");
win.ePF(campo, dim[dim.length-2]);
win.eFocus(campo);
}
}
function VerRestaura(el, win){
var campo = el.id.substring(1), obj;
if( _FIELDS["_fld_"+campo]!=undefined ){
obj = S(":"+campo,win).obj;
var XY = eXY(obj),
cTABLE = win.document.createElement('TABLE'),
tmp = _FIELDS["_fld_"+campo].split('|'), n;
if( null!=win.document.getElementById('LstPASTE') ) S(win.document.getElementById('LstPASTE')).nodeRemove();
with(cTABLE){
id = 'LstPASTE';
onclick = function anonymous(){
var obj = S.event(window);
if( obj.tagName!='TD' ) return;
win.ePF(campo, S(obj).text());
S(S.toTag(obj,"TABLE")).none();
};
onmouseleave = function anonymous(){ this.style.display = 'none'; };
title = eLng(1);
}
S(cTABLE).css({
left: XY[0],
top: XY[1]+obj.clientHeight,
width: obj.offsetWidth+1
});
for(n=tmp.length-2; n>0; n--){
cTABLE.insertRow().insertCell().innerText = tmp[n];
}
S(cTABLE,win).nodeEnd();
}
S.eventClear(win);
}
function _SaveDefaults(){
var i, txt="";
for(i in _FIELDS) if( i!=undefined && i!="undefined" && _FIELDS[i]!=undefined && (_FIELDS[i]+"").length<255 ){
txt += "~"+i+"="+_FIELDS[i];
}
S.call("edes.php?E:$default.php", {DATOS:txt});
}
function eProgress(win, px, Titulo, xBarra, Detalle){
eLoading(1, win);
if(Titulo==undefined)Titulo='';
if(xBarra==undefined)xBarra='';
if(Detalle==undefined)Detalle='';
_oProgress = document.getElementById("PROGRESS");
S(".progress-title", _oProgress).html(Titulo);
S(".Detail", _oProgress).text(Detalle);
if( typeof(px)=='string' && px.indexOf('/')>-1 ){
px = px.split('/');
px = (parseInt(px[0])/parseInt(px[1]))*100;
}else{
px = parseInt(px);
}
if(px>100)px=100; if(px<0)px=0;
S(".progress-value", _oProgress).css({width:px+'%'});
if(xBarra=='%') xBarra=px+'%';
S(".progress-text", _oProgress).text(xBarra);
if( Detalle!='' ){
if( S(_oProgress).css("display")!="table" ){
_oProgress.style.display = 'table';
S(_oProgress).center();
}
}
if( px==100 ) _oProgress.style.display = 'none';
}
var _Progress, _oProgress;
function eProgressShow(Obj, i, win){
if( win!=undefined ) Obj = document.getElementById('swT_'+win.frameElement.id.substring(4));
if( Obj!=undefined ) _oProgress = Obj;
var oBar   = _oProgress.children[0].rows[1].cells[0].children[0].children[0],
oValue = _oProgress.children[0].rows[1].cells[0].children[0].children[1];
if( i!=undefined ){
oBar.Indice = -1;
_Progress = (i*1000)/100;
if(i<3) _Progress = 1;
oBar.Value = 0;
_oProgress.style.display = 'block';
}
var n = parseInt(oBar.Value) + 1;
if( n==0 ) return;
else if( n>100 ) n = 100;
oBar.style.width = oValue.innerText = n+'%';
oBar.Value = n;
if( oBar.getAttribute("Indice")>-1 && n>=parseFloat(oBar.getAttribute("NewDetail")) ){
oBar.setAttribute("NewDetail", oBar.getAttribute("NewDetail") + oBar.Margen);
oBar.setAttribute("Indice", oBar.getAttribute("Indice")+1);
_oProgress.rows[2].cells[0].innerHTML = _oProgress.rows[2].Detail[ oBar.getAttribute("Indice") ];
}
if( n<100 ) setTimeout('eProgressShow()', _Progress);
}
function eAddEvent(obj, eve, func, captura){
if( obj.attachEvent ){
obj.attachEvent('on'+eve, func);
}else if( obj.addEventListener ){
obj.addEventListener(eve, func, captura);
}else return false;
return true;
}
var _eScrollSet = new Array();
function eScrollSet(win, Label, Filas, Repetir, Ayadir){
if( win==null ) win = _eScrollSet[Label];
_eScrollSet[Label] = win;
var Div = win.document.getElementById(Label);
Div.scrollTop = 0;
if( Filas==0 ){
}else if( Filas<0 ){
Div.style.height = (Filas * -1)+"px";
}else if( Div.children[0].rows.length>Filas ){
var h = ((Ayadir==undefined) ? 3 : Ayadir ), f;
for(f=0; f<Filas; f++) h += Div.children[0].rows[f].clientHeight + parseInt(Div.children[0].cellSpacing);
Div.style.height = h+"px";
}else{
Div.style.height = '';
Div.style.overflow = 'visible';
}
if( Div.clientWidth<Div.scrollWidth ) Div.style.width = (Div.children[0].offsetWidth + (Div.scrollWidth-Div.clientWidth) + 2)+"px";
if( Div.clientWidth>Div.children[0].offsetWidth ) Div.style.width = (Div.children[0].offsetWidth + (Div.scrollWidth-Div.clientWidth) + 2)+"px";
}
function eScrollHide(op, hv, oh){
if( hv==undefined ) hv = 'HV';
if( oh==undefined ) oh = op.firstChild;
op.style.removeAttribute("overflow");
if( /(hv|vh)/i.test(hv) ){
op.style.width = oh.offsetWidth+"px";
op.style.height = oh.offsetHeight+"px";
}else{
if( /h/i.test(hv) ){
op.style.width = oh.offsetWidth+"px";
op.style.overflowX = 'hidden';
op.style.overflowY = 'auto';
if( op.offsetHeight!=op.clientHeight ) op.style.width = (oh.offsetWidth + (op.offsetWidth - op.clientWidth))+"px";
}else if( /v/i.test(hv) ){
op.style.height = oh.offsetHeight+"px";
op.style.overflowY = 'hidden';
op.style.overflowX = 'auto';
if( op.offsetWidth!=op.clientWidth ) op.style.height = (oh.offsetHeight + (op.offsetHeight - op.clientHeight))+"px";
}
}
}
function eScrollTH(div, Obj){
if( div.tagName=='BODY' ){
if( div.scrollTop>Obj.offsetTop ){
with( Obj.rows[0].style ){
position = 'relative';
top = (div.scrollTop - Obj.offsetTop)+"px";
left = (-Obj.clientLeft)+"px";
zIndex = 1;
}
if( div.offsetWidth>10 && div.style.width=='' ) div.style.width = (Obj.offsetWidth + div.offsetWidth - div.clientWidth + div.clientLeft)+"px";
}else{
with( Obj.rows[0].style ){
position = 'static';
top = "0px";
left = "0px";
}
}
}else{
var Obj = div.children[0];
S("TH", Obj.rows[0]).each(function(k,o){
if( o.parentNode==Obj.rows[0] ){
S(o).css({
position: 'relative',
top: (div.scrollTop - Obj.clientTop)+"px",
left: (-Obj.clientLeft)+"px",
zIndex: 1
});
}
});
if( div.offsetWidth>10 && div.style.width=='' ) div.style.width = (Obj.offsetWidth + div.offsetWidth - div.clientWidth + div.clientLeft)+"px";
}
}
function eScrollText(oDiv, TotalTD, MasTH, SeOculta){
var DimTR = oDiv.children[0].rows,
oTd, TDTop, TDAlto, oSpan, yMax, y, i;
if( SeOculta==undefined ) SeOculta = false;
if( MasTH==undefined ) MasTH = 0;
if( oDiv.eInitialize==undefined ){
var THAlto = 0;
for(i=0; i<DimTR.length; i++){
if( DimTR[i].cells.length!=TotalTD ) continue;
if( DimTR[i].cells[0].tagName!='TD' ){
THAlto += DimTR[i].cells[0].offsetHeight;
continue;
}
DimTR[i].cells[0].innerHTML = '<span style="position:relative;top:0px;'+((SeOculta && DimTR[i].cells[0].offsetWidth==0)?'display:none;':'')+'">'+DimTR[i].cells[0].innerHTML+'</span>';
DimTR[i].SL = 1;
}
oDiv.eInitialize = 1;
oDiv.THAlto = THAlto;
}
var DivTop = oDiv.scrollTop + oDiv.THAlto,
DivBottom = DivTop + oDiv.offsetHeight;
for(i=0; i<DimTR.length; i++){
if( DimTR[i].SL==undefined ) continue;
oTd = DimTR[i].cells[0];
TDTop = oTd.offsetTop;
oSpan = oTd.firstChild;
if( DivTop > TDTop ){
TDAlto = oTd.offsetHeight;
yMax = TDAlto - oSpan.offsetHeight - 2;
if( DivTop > TDTop + TDAlto ) y = yMax;
else{
y = DivTop - TDTop;
if( y > yMax ) y = yMax;
}
oSpan.style.top = y+"px";
}else{
if( DivBottom > TDTop ){
y = 0;
oSpan.style.top = y+"px";
}else break;
}
}
}
function eScrollIntoView(Padre,el){
var y = 0;
while( Padre.sourceIndex!=el.sourceIndex && el.sourceIndex>1 ){
y += el.offsetTop - el.scrollTop;
el = el.offsetParent;
}
Padre.scrollTop = y;
}
function _gsScript(Win, ConModo){
var o = S("META[gsScript]", Win), Indice="", a;
if( o.length ){
a = S(o).attr("gsScript,gsOp");
if( ConModo!=undefined && ConModo ) Indice = a["gsOp"];
Indice += a["gsScript"]+"|";
return Indice;
}
return 'i|';
}
var _FIELDS = new Array();
function Fields(Tipo, Win, ConModo, campos){
var Indice, i,
ico = S('#_eDefaults_', Win);
if( Tipo=='S' ){
if( !confirm('Confirmar la opción de GRABAR CAMPOS')) return;
var txt = '';
for(i in _FIELDS) txt += i + '|'+_FIELDS[i]+'\n';
var sHtm = "<FORM METHOD='POST' ACTION='edes.php?E:$t/12.gs'>";
sHtm += "<TEXTAREA NAME='test' COLS=48 ROWS=12 style='width:410px'>"+escape(txt)+"</TEXTAREA></FORM>";
TLF.document.body.innerHTML = sHtm;
TLF.document.forms[0].submit();
return;
}else if( Tipo=='L' ){
if( !confirm('Confirmar la opción de LEER CAMPOS')) return;
var sHtm = "<FORM METHOD='POST' ACTION='edes.php?E:$t/12.gs'>";
sHtm += "<TEXTAREA NAME='load' COLS=48 ROWS=12 style='width:410px'></TEXTAREA></FORM>";
TLF.document.body.innerHTML = sHtm;
TLF.document.forms[0].submit();
return;
}else if( Tipo=='U' ){
Indice = _gsScript(Win,ConModo);
if( campos!=undefined ) Indice = campos;
delete top._FIELDS[Indice];
for(i in top._FIELDS) if( i.indexOf(Indice)==0 ) delete top._FIELDS[i];
delete top._FIELDS[Indice+'__default_'];
return;
}else if( Tipo=='G' || Tipo=='D' ){
if( Win.document.getElementById('_ICALL')!=null && !eReadyStateLocal(Win) ){
setTimeout(function(){Fields(Tipo, Win);},500);
return;
}
var oWin = (Win.event==null) ? top : Win;
try{
if( S.event(oWin).tagName!='I' ) return;
}catch(e){}
}
try{
if( Tipo=='d' || Tipo=='p' ){
}else if( Win._Mode.length==2 ) return;
}catch(e){}
Indice = _gsScript(Win,ConModo);
if( campos!=undefined ){
Indice = campos;
campos = ","+campos+",";
}
_FIELDS[Indice] = 'OK';
var HayGP = (Win._GPFIELDS!=undefined);
Tipo = S.upper(Tipo);
if( Tipo=='D' ){
Tipo = 'G';
_FIELDS[Indice+'__default_'] = 'S';
}else if( Tipo=='P' ){
if( Win.document.getElementById('_eDefaults_')!=undefined && _FIELDS[Indice+'__default_']=='S' ){
if(ico.exists()) S(ico).text("g").class("-OFF");
}
}
var Obj = Win.document.forms, nom,p,n, conDatos=false;
for(i=0; i<Obj.length; i++){
p = Obj[i].elements;
for(n=0; n<p.length; n++){
if( p[n].tagName=='FIELDSET' || p[n].type=='button' ) continue;
if( campos!=undefined ){
if( campos.indexOf(","+p[n].name.replace("_INPUT_","")+",")==-1 ) continue;
}
nom = Indice + p[n].name;
if( Tipo=='G' ){
if( p[n].type!="radio" ){
_FIELDS[nom] = p[n].value;
if( p[n].name.substr(0,7)=='_INPUT_' && Win.document.getElementById(p[n].name.substr(7)+'_TABLE')!=null ){
_FIELDS[nom+'_MemSS'] = Win.document.getElementById(p[n].name.substr(7)+'_TABLE').outerHTML;
}
if( p[n].getAttribute('eFILENAME')!=null ){
_FIELDS[nom+'.NewValue'] = p[n].getAttribute('NewValue');
_FIELDS[nom+'.eFILENAME'] = p[n].getAttribute('eFILENAME');
_FIELDS[nom+'.OldValue'] = p[n].getAttribute('OldValue');
_FIELDS[nom+'.eUpload'] = p[n].getAttribute('eUpload');
}
}else{
_FIELDS[nom] = S(":"+p[n].name, Win).val();
}
}else{
if( _FIELDS[nom]!=undefined ){
if( !conDatos && _FIELDS[nom]!="" ) conDatos = true;
try{
if( HayGP && Win._GPFIELDS[p[n].name]=='+' ){
if( _FIELDS[nom ]=='' ) _FIELDS[nom] = 0;
p[n].value = parseInt(_FIELDS[nom]) + 1;
_FIELDS[nom] = p[n].value;
}else if( HayGP && Win._GPFIELDS[p[n].name]!=undefined ){
var txt = '', i;
for(i=0; i<p[n].maxLength; i++) txt += Win._GPFIELDS[p[n].name].substr(Win.Azar(0,Win._GPFIELDS[p[n].name].length-1),1);
p[n].value = txt;
}else{
if( p[n].type!="radio" ) p[n].value = _FIELDS[nom];
if( p[n].getAttribute('eFILENAME')!=null ){
p[n].setAttribute('NewValue',_FIELDS[nom+'.NewValue']);
p[n].setAttribute('eFILENAME',_FIELDS[nom+'.eFILENAME']);
p[n].setAttribute('OldValue',_FIELDS[nom+'.OldValue']);
p[n].setAttribute('eUpload',_FIELDS[nom+'.eUpload']);
}else if( p[n].type=="checkbox" ){
p[n].checked = (_FIELDS[nom]=="S");
}else if( p[n].type=="radio" ){
S(":"+p[n].name, Win).val(_FIELDS[nom]);
}else if( p[n].name.substr(0,7)=='_INPUT_' && Win.document.getElementById(p[n].name.substr(7)+'_TABLE')!=null ){
Win.document.getElementById(p[n].name.substr(7)+'_TABLE').outerHTML = _FIELDS[nom+'_MemSS'];
}else if( p[n].eHTML ){
Win.DGI(p[n].name+"_").innerHTML = _FIELDS[nom];
}
}
}catch(e){
p[n].value = _FIELDS[nom];
}
}
}
}
}
if( Tipo=='P' && conDatos ){
if( Win.document.getElementById('_eDefaults_')!=undefined ){
if(ico.exists()) S(ico).text("g").class("-OFF");
}
}
}
function eSound(){}
