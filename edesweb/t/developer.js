S.Extend({
elapsed: function(i, txt, fuc){
var ini = Date.now(), n;
for(n=0; n<i; n++) fuc();
ini = (Date.now()-ini);
console.log(txt+": "+ini+"sg");
}
});
var gsTest = function(txt, nm, func){
if( S.type(func)=="function" ){
gsTest();
for(var n=0; n<txt; n++) func();
gsTest(nm);
return;
}
if( txt==undefined ){
S.session.eTime = new Date().getTime();
}else{
var r = ((new Date().getTime()-S.session.eTime)/1000);
if( !window.console ){
S.info(txt+": "+r+" Sg");
}else{
console.info(txt+": "+r+" Sg");
}
}
}
var gsIFrames = function(op, tr, table){
var icon;
if(op && op!=-1){
if( S("TH",table).text()=="IFrames" ){
if( op.offsetWidth>0 ){
S(op).none();
try{
if( S.toTag(op, "SPAN").className=="WINDOW" ){
S(S.toTag(op, "SPAN")).hidden();
}
}catch(e){}
icon = 'z';
}else{
S(op).block();
try{
if( S.toTag(op, "SPAN").className=="WINDOW" ){
S(S.toTag(op, "SPAN")).visible();
}
}catch(e){}
icon = 'y';
}
tr.cells[0].children[0].textContent = icon;
}else{
var tmp = S.nsp(S(tr.cells[1]).text()).split(":"), win,
scr = tmp[4].split("&")[0];
if( /^(IWORK|IWORK2)$/.test(tmp[2]) ){
win = frames[tmp[2]];
}else{
win = S("IFRAME",S.toTag(op, "SPAN")).obj;
win = win.contentWindow || win.contentDocument.parentWindow;
}
S.call("E:"+scr+".test", null, {run:win});
}
return;
}
var dim=[], dMeta, meta, ultimo, uTxt;
if( op==-1 ){
dim.push(["-Unit-Test"]);
}else{
dim.push(["-IFrames"]);
}
function verIFrame(win, nivel){
var f=win.frames, t=f.length, n, padre, dir, ok;
for(n=0; n<t; n++){
ok = true;
try{
i = f[n].location.href+"";
}catch(e){
ok = false;
}
if(ok){
padre = f[n].frameElement.parentNode;
if(padre.tagName=="BODY") padre = f[n].frameElement;
dir = f[n].location.search.slice(1);
if( dir=="" && f[n].pURL ) dir = S.replace(f[n].pURL, "edes.php?", "");
ultimo = padre;
uTxt = " Nivel: "+nivel+" : "+f[n].name+" : "+unescape(dir);
if( uTxt.length>250 ) uTxt = S.left(uTxt,250)+"...";
if( (op!=-1 && f[n].name!="IWORK") || (op==-1 && f[n].document.body.offsetHeight>0) ){
dim.push([uTxt, '<i class="ICONINPUT">'+((f[n].document.body && f[n].document.body.offsetHeight>0)?"y":"z")+'</i>', padre]);
}
}
verIFrame(f[n], ++nivel);
}
}
verIFrame(top, 1);
if( op!=-1 && dim.length==2 ){
gsIFrames(ultimo, S("<table><tr><td><td>"+uTxt+"</table>").obj.rows[0]);
}else if( dim.length>1 ){
var o = S("body").menu(dim, {function:gsIFrames, trigger:false, noMark:true}).css("z-index", 999999);
S(o.obj["Tapa"]).css("z-index", 999998);
}else S("body").tip('No hay "callSrv"');
}
var gsColsHidden = function(win, tr, table){
if(win){
if( S(win).exists() ){
if( colVisibles(win) ){
ocultarColumnas(win);
if(tr) tr.cells[0].children[0].textContent = 'y';
}else{
verColumnas(win);
if(tr) tr.cells[0].children[0].textContent = 'z';
}
S.windowObject(win).Recalcula();
}
return;
}
var dim=[], dMeta, meta;
dim.push(["-Show Hidden Cols"]);
function verIFrame(win, nivel){
var f=win.frames, t=f.length, n,i, obj, ok;
for(n=0; n<t; n++){
ok = true;
try{
i = f[n].location.href+"";
}catch(e){
ok = false;
}
if( ok && f[n].document.body.offsetHeight>0 ){
obj = S("#BROWSE",f[n]);
if( S(obj).exists() ){
if( f[n].frameElement.name=="IWORK" || f[n].frameElement.className=="ISubList" || (S.toTag(f[n].frameElement,"SPAN")!=null && S(S.toTag(f[n].frameElement,"SPAN")).css("visibility")=="visible") ){
if( obj.obj.offsetWidth>0 ){
dim.push(["Nivel: "+nivel+" : "+f[n].location.search.slice(1), '<i class="ICONINPUT">'+((colVisibles(obj.obj))?"z":"y")+'</i>', obj.obj]);
}
}
}
obj = S(".BROWSE",f[n]);
if( S(obj).exists() ){
S(obj).each(function(k,o){
if( S.left(o.id,1)=="[" && o.offsetWidth>0 ){
dim.push(["Nivel: "+nivel+" : "+o.id+' : '+f[n].location.search.slice(1), '<i class="ICONINPUT">'+((colVisibles(o))?"z":"y")+'</i>', o]);
}
});
}
}
verIFrame(f[n], ++nivel);
}
}
verIFrame(top, 1);
if( dim.length>2 ){
var o = S("body").menu(dim,{function:gsColsHidden}).css("z-index",999999);
S(o.obj["Tapa"]).css("z-index",999998);
}else if( dim.length==2 ){
gsColsHidden(dim[1][2]);
}
function colVisibles(obj){
var cOld = S(obj).class(), ok=true;
S.each(cOld.split(" "), function(k,o){
if( /^col_[0-9]{1,2}n$/.test(o) ) ok = false;
});
return ok;
}
function verColumnas(obj){
var cOld = S(obj).class(), cNew=[];
S.each(cOld.split(" "), function(k,o){
if( /^col_[0-9]{1,2}n$/.test(o) ) o = o+"__";
cNew[k] = o;
});
S(obj).class(cNew.join(" "));
S("TH",obj).each(function(k,o){
if( o.style.display=="none" ){
o.setAttribute("displayBak", o.style.display);
o.style.display = "table-cell";
o.style.backgroundColor = S.colorTone(S.rgb2hex(S(o).css("backgroundColor")), 25);
if(S.trim(o.innerHTML)=="") o.innerText = o.getAttribute("oCampo");
}
});
}
function ocultarColumnas(obj){
var cOld = S(obj).class(), cNew=[];
S.each(cOld.split(" "), function(k,o){
if( /^col_[0-9]{1,2}n__$/.test(o) ) o = S.left(o,0,-2);
cNew[k] = o;
});
S(obj).class(cNew.join(" "));
S("TH",obj).each(function(k,o){
if( o.getAttribute("displayBak")!=null ){
o.style.display = "none";
o.removeAttribute("displayBak");
o.style.backgroundColor = "";
}
});
}
}
var gsFormsRefresh = function(){
var dim=S(_gsFormsFrm).values(), n;
for(n in dim){
S(".CONTAINER TD[eField='"+n+"'",_gsFormWin).text(dim[n]);
}
}
var _gsFormsFrm, _gsFormWin,
gsForms = function(op, tr, table){
if(op){
_gsFormsFrm = op;
var dim=S(op).values(), win=S.windowObject(op), n,o,i=0, nCampo=0,
txt = "<div style='width:100%;height:100%;overflow:auto;cursor:pointer'><div onclick='gsFormsRefresh()' style='width:700px; word-break:break-all; color:red'>"+unescape(tr.cells[1].innerText)+"</div>";
txt += "<table>";
for(n in dim){
o = S(":"+n, win).obj;
if( o.tagName=="TEXTAREA" ) dim[n] = dim[n].replace(/\n/g, "<br>");
if( !S.setup.systemFields.test(n) || top._M_=="~" ){
txt += "<tr title='"+(nCampo++)+"' onclick='S(this).none()'";
if(++i%2) txt += " style='background-color:#e6e6e6'";
txt += "><td style='text-align:right' valign=top>"+((o.offsetWidth>0 || o.eHTML)? "<b>"+n+"</b>":n)+"</td><td valign=top>=</td><td eField='"+n+"' style='width:700px; word-break:break-all;'>"+dim[n]+"</td></tr>";
}
}
txt += "</table></div>";
_gsFormWin = S.window(null, {title:"form="+op.name, content:txt, maximize:false, height:"100%"});
S(_gsFormWin).center();
return;
}
var dim=[], dMeta, meta, ultimo, uTxt;
dim.push(["-Forms"]);
function verIFrame(win, nivel){
var f=win.frames, t=f.length, n,i, ok;
for(n=0; n<t; n++){
ok = true;
try{
i = f[n].location.href+"";
}catch(e){
ok = false;
}
if( ok && f[n].document.forms.length>0 ){
for(i=0; i<f[n].document.forms.length; i++){
if( /^(GETCONDITION)$/i.test(f[n].document.forms[i].name) ) continue;
if( !/^(FieldCondi)$/i.test(f[n].document.forms[i].name) || top._M_=="~" ){
ultimo = f[n].document.forms[i];
uTxt = "Nivel: "+nivel+" : "+f[n].document.forms[i].name+' - '+unescape(f[n].location.search.slice(1));
dim.push([uTxt, '<i class="ICONINPUT">'+((f[n].document.forms[i].parentElement.offsetHeight>0)?"y":"z")+'</i>', ultimo]);
}
}
}
verIFrame(f[n], ++nivel);
}
}
verIFrame(top, 1);
if( dim.length==2 ){
gsForms(ultimo, S("<table><tr><td><td>"+uTxt+"</table>").obj.rows[0]);
}else if( dim.length>1 ){
var o = S("body").menu(dim,{function:gsForms, noMark:true}).css("z-index",999999);
S(o.obj["Tapa"]).css("z-index",999998);
}else S("body").tip('No hay "Forms"');
}
var _cssReload="css";
var gsCssReload = function(genVar, css){
_cssReload = css;
S.call("E:$t/create_css.php&e_cdi="+localStorage.getItem("e-cdi"), null, {return:_gsCssReload, eval:true});
if(genVar!=null && genVar){
setTimeout(function(){
frames["IWORK"].location = "edes.php?E:$t/create_css_ini.php&e_cdi="+localStorage.getItem("e-cdi")+"&_CONTEXT="+window._CONTEXT;
}, 1000);
}
return "ok";
}
var _gsCssReload = function(res){
function verIFrame(win){
var f=win.frames, n;
for(n=0; n<f.length; n++){
reload(f[n]);
verIFrame(f[n]);
}
}
if( res=="top" ){
reload(top);
}else{
reload(top);
verIFrame(top);
}
return "ok";
function reload(win){
if( win!=top && (!win.document || !win.document.body || !/(BODY)/i.test(win.document.body.className)) ) return;
var dim = S("link,style",win).dim, newStyle=[], n, obj;
for(n=dim.length-1; n>=0; n--){
if( /^(?:all|tab|list|all_big|tab_big|list_big|all_small|tab_small|list_small|desktop)$/i.test(dim[n].getAttribute("name")) ){
newStyle.push([dim[n].getAttribute("name"), dim[n].getAttribute("disabled"), dim[n].title, dim[n].tagName[0]]);
S(dim[n]).nodeRemove();
}
}
for(n=newStyle.length-1; n>=0; n--){
obj = win.document.createElement('link');
obj.rel = 'stylesheet';
obj.type = 'text/css';
obj.title = newStyle[n][2];
obj.href = _cssReload+'/'+newStyle[n][0]+'.css?_cache_='+(new Date()*1);
obj.setAttribute("name", newStyle[n][0]);
if( win==top && S.type(newStyle[n][1])=="boolean" ) obj.setAttribute("disabled", newStyle[n][1]);
win.document.getElementsByTagName("head")[0].appendChild(obj);
if( newStyle[n][2]=="all" ){
setTimeout(function(){
for(n=0; n<win.document.styleSheets.length; n++){
if( /^(all|all_big|all_small)$/.test(win.document.styleSheets[n].title) ){
var oLink=win.document.styleSheets[n],
t=oLink.rules.length, i,txt;
for(i=t-1; i>=0; i--) if( /^(@font)/.test(oLink.rules[i].cssText) ){
txt = S.replace(oLink.rules[i].cssText, "../fonts/", top.location.href.split("edes.php")[0]+"fonts/");
oLink.removeRule ? oLink.removeRule(i) : oLink.deleteRule(i);
oLink.insertRule(txt, oLink.cssRules.length);
}
}
}
}, 1000);
}
}
}
}
var gsEditor = function(script){
alert("Editar script: "+script);
}
var _gsEditStack=[], _gsAddMenu=[];
var gsEdit = function(win, df, line){
if(df){
var script=df, ok=true, n;
line = (line)? "&_LINE="+line : "";
}else if(!win.event.ctrlKey){
return true;
}else{
var o = win.document.getElementsByTagName("META"), script="", ok=true, line="";
if( o["eDes"] && o["eDes"].nodeName=="META" ){
if( S(o["eDes"]).attr("gsscript")!=null ){
script = S(o["eDes"]).attr("gsscript");
if( S.is(":",script) ) script = S.mid(script,":",0);
if( S.is("&",script) ) script = S.mid(script,0,"&");
}
}
if( script=="" ){
n = S.mid(win.location.search, "?", ":").length;
if( n>0 && n<3 ){
script = S.mid(win.location.search, ":", "&");
}else{
S.error(top, 'Falta definir el tag:<br>&lt;META NAME=eDes gsScript="[Script]"&gt;');
}
}
}
S(".WINDOW").each(function(pk, o){
if( o.children[0].rows[0].cells[0].title=="gsEdit: "+script ){
ok = false;
S(o).visible();
}
});
if(ok){
if(script!="undefined"){
if( _gsEditStack[script]==undefined ){
var w = window.open("edes.php?E:$t/ed.gs&RF='"+script+"'"+line, script);
_gsEditStack[script] = w;
}else{
try{
window.open("", script);
}catch(e){
line = "El fuente est&#225; abierto";
try{
line += " ("+_gsEditStack[script].document.title+")";
}catch(e){}
S.error(window, line, 5);
}
}
}else{
S.error("Script no definido");
}
}
return S.eventClear(win);
}
var _EditOptionWorking = function(){
var win = S.windowFocus(),
url = S.getCookie("eDesURL"),
opa = (/edes.php/.test(win.location.href))? "edes.php?"+S.mid(win.location.href, "edes.php?", "&"):"";
if( url==undefined ) url = "";
if( opa=="edes.php?E:$t/ed.gs" ) opa = "";
else if( S.right(win._Mode, 1)=="R" ) opa += "&_SEEK&"+win._DBINDEX+"="+S(":"+win._DBINDEX,win).val();
var dim = [
["Option-Working|opg|#|T|50||M|"+unescape(url)+"||"],
["Current option|opa|#|T|50||-|"+opa+"||"],
["Activate option|opc|#|C|1||M|||"]
];
S.alert({
title:"Editar Option-Working",
icon:'DH',
button:"Y,N|Grabar,Cancelar",
form:dim,
function:function(op,val){
if(op==1){
if( val["opg"]=="" ){
document.cookie = "eDesURL=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}else{
if( val["opc"]=="S" && val["opa"]!="" ) val["opg"] = val["opa"];
document.cookie = "eDesURL="+escape(val["opg"]);
}
if( S("#arSTOOLS").length ) S("#arSTOOLS").nodeRemove();
_CrearAccesosDirectos();
S.call("E:$a/d/opworking", {op:val["opg"]});
}
}
});
return S.eventClear(window);
}
var _ExeAccesosDirectos = function(){
var url = unescape(S.getCookie("eDesURL"));
if( url==undefined ){
_EditOptionWorking();
}else if( event.ctrlKey ){
S.window(url);
}else{
eIWorkLocation(url);
}
return S.eventClear(window);
}
var _DimLanguage = [];
var _MenuLanguage = function(o){
S(o).menu(_DimLanguage, {zIndex:9999999,
function:function(pk,p,a,s,d,z,x,c){
if( S(o).text()!=pk ){
S.info("Calculando...");
S.call('E:$language_set.php&_LANG='+pk);
S(o).text(pk);
for(i=1; i<_DimLanguage.length; i++){
if( _DimLanguage[i][2]==pk ){
_DimLanguage[i][5] = "font-weight:bold";
}else{
_DimLanguage[i][5] = null;
}
}
}
}
});
}
var _CrearAccesosDirectos = function(){
var tree = S("#_TreeUserIcon"), seve="";
if( tree.length ) seve = tree.css("display");
var url = S.getCookie("eDesURL"),
ver = (S('#TREEMAIN2_wepe',top).length)? "":"display:none",
txt = "<span id='arSTOOLS' style='position:absolute;top:0px;background-color:#ffffff;border:1px solid #ec8084;padding:2px 4px 4px 4px; cursor:pointer;'>"+
"<table><tr>"+
"<td><i class='ICONBUTTON ICONMOVE' style='color:#bd454b'>~</i></td>"+
"<td style='display:none;padding-right:5px;"+ver+"' id='_TreeUserIcon'><i onclick=S('#TREEMAIN2_wepe',top).display() eFunc='' eArg='' class='ICONINPUT' style='color:#bd454b;'>&#272;</i></td>"+
"<td id='eIDIOMA' title='Idioma' class='ICONHEADER' onclick='_MenuLanguage(this)' style='display:none'></td>"+
"<td style='border-left:1px solid #e6e6e6;'></td>"+
"<td><i onclick='_CreaAyuda()' title='Crea/Elimina Ayuda' class='ICONINPUT' style='color:#bd454b;'>@</i></td>"+
"<td><i onclick='_ExeInActiveWindow()' eFunc='gsExpor' eArg='P&BW=&VIEW=0' class='ICONINPUT' style='color:#bd454b;padding-right:5px;' title='Exportar a PDF'>&#202;</i></td>"+
"<td style='border-left:1px solid #e6e6e6;'></td>"+
"<td><i onclick='_ExeInActiveWindow()' eFunc='eDefaults' eArg='false' title='Memorizar valores por defecto' class='ICONINPUT' style='color:#bd454b'>g</i></td>"+
"<td><i onclick='_GPFields(\"d\")' title='Copiar' class='ICONINPUT' style='color:#bd454b'>C</i></td>"+
"<td><i onclick='_GPFields(\"p\")' title='Pegar' class='ICONINPUT' style='color:#bd454b'>P</i></td>"+
"<td><i onclick='_GPFields(\"s\")' title='Submit' class='ICONINPUT' style='color:#bd454b;padding-right:5px;'>Ó</i></td>"+
"<td style='border-left:1px solid #e6e6e6;'></td>"+
"<td><i onclick='_FillForm()' oncontextmenu='_FillForm(1)' title='Click IZQ: Rellenar formulario\nClick DCH: Rellenar datos obligatorios' class='ICONINPUT' style='color:#bd454b'>&#28;</i></td>"+
"<td><i onclick='_UnitTest()' title='Unit-test' class='ICONINPUT' style='color:#bd454b;padding-right:5px;'>&#414;</i></td>"+
"<td style='border-left:1px solid #e6e6e6;'></td>"+
"<td><i id='_RunScript' onclick='eCallSrv(window,\"$t/runscript.gs\")' oncontextmenu='S.window(\"edes.php?Fa:$a/d/runscript.edf&SMode=U\",{unique:true})' title='Click IZQ: Ejecutar Script\nClick DCH: Editar SQL' class='ICONINPUT ICONOFF' style='color:#bd454b;'>&#230;</i></td>"+
"<td><i onclick='_ExeAccesosDirectos()' oncontextmenu='_EditOptionWorking()' title='Click IZQ: Ejecuta Option-Working\nClick DCH: Edita Option-Working\nCtrl Click: Ejecuta opción en ventana' class='ICONINPUT"+((url==undefined)?" OFF":"")+"' style='color:#bd454b;'>|</i></td>"+
"<td><i onclick='S.windowFocus().location.reload()' title='Volver a cargar marco' class='ICONINPUT' style='color:#bd454b;'>r</i></td>"+
"</tr></table>"+
"</span>";
S(txt).nodeEnd("body").move(false, S("#arSTOOLS").obj.children[0].rows[0].cells[0], {zIndex:999999});
S("#_TreeUserIcon").css("display", seve);
S("#arSTOOLS").center(null, "h");
}
var _AccesosDirectos = function(ver){
var o = S("#arSTOOLS");
if( o.exists() ){
if( ver ){
o.block();
}else{
S.display(o.obj);
}
}else{
_CrearAccesosDirectos();
}
return S.eventClear(window);
}
var gsTools = function(win){
if( S.type(top["gsTools_"])=="eDes" ) S(top["gsTools_"]).nodeRemove();
if( win ){
S("body",win).visible();
return;
}
var menu = [
["-Tools"],
["Forms","",3],
["IFrames","",1],
["Show Hidden Cols","",11],
["-"],
["Accesos Directos","", 10],
["Crear Opci&#243;n","",12],
["Crear Paquete","","edes.php?Fc:$a/d/pack_update"],
["Development Tree","", [
["Personal","", 9,null,null,null,null],
["System","", 7,null,null,null,null]
],null,null,null,null],
["gsEdit","", 8],
["-"],
["CSS Reload","",2],
["CSS(tmp) Reload","","2c"]
], n,i,p,m=null, label="";
if(_M_!=""){
menu.push(["Gestor de Opciones","","GO"]);
menu.push(["Gestor de Colores","","GC"]);
menu.push(["Colores en PDF","","CP"]);
if(_M_=="~"){
menu.push(["Editar Textos","","ET"]);
menu.push(["Fields NULL","","NULL"]);
}
}
for(m=0; m<menu.length; m++) if( S.type(menu[m][2])=="array" ){
for(p=0; p<menu[m][2].length; p++){
label = menu[m][2][p][0];
if( S("#addTree_"+label,top).exists() ){
for(n=0; n<menu.length; n++){
if( menu[n].length>2 && typeof(menu[n][2])=="object" ){
for(i=0; i<menu[n][2].length; i++){
if( menu[n][2][i][0]==label ){
menu[n][2][i][6] = "-";
}
}
}
}
}
}
break;
}
if( typeof(_Spider)!="undefined" ){
menu[menu.length] = ["<b>Ejecutar SPIDER</b>","",_Spider];
menu[menu.length] = ["<b>Finalizar SPIDER</b>","","S.call('edes.php?E:$itm/spider.php&STOP=SPIDER', null, {info:'Spider Finalizado'})","color:red"];
}
if(_gsAddMenu.length>0) for(n=0; n<_gsAddMenu.length; n++) menu.push(_gsAddMenu[n]);
top["gsTools_"] = S(window.document.body).menu(menu, {zIndex:9999999,
function:function(o,p,a,s,d,z,x,c){
switch(o){
case "1": gsIFrames(); break;
case "13": gsIFrames(-1); break;
case "2": gsCssReload(null,"css"); break;
case "2c":gsCssReload(null,"css_tmp"); break;
case "2a":
S.alert({
icon:'DH',
button:"Y,N",
title:"CSS Create var",
text:"¿Confirmar REGENERAR CSS?",
function: function(yn, field){
if(yn==1) gsCssReload(1,_cssReload);
}
});
break;
case "2t":_gsCssReload("top"); break;
case "3": gsForms(); break;
case "4": S.window("ErrorDocument.404",{title:"ErrorDocument 404 - página no encontrada", width:500, height:350}); break;
case "5": S.session.logCallSrv=!S.session.logCallSrv; break;
case "6": S.session.logCallAnswer=!S.session.logCallAnswer; break;
case "7": eIWorkLocation("edes.php?E:$t/ed.gs&Development=Tree"); break;
case "9": eIWorkLocation("edes.php?E:$t/ed.gs&Development=Personal"); break;
case "8": _gsEditStack[_gsEditStack.length] = window.open("edes.php?E:$t/ed.gs"); break;
case "10":
_AccesosDirectos();
break;
case "11":
gsColsHidden();
break;
case "12":
S.alert({
icon:'DH',
button:"Y,N",
title:"CREAR OPCIÓN TEMPORAL",
form:[
["Title | title | # | T | 25 |  | M |       | # |"],
["Opción| op    | # | T | 50 |  | M |       | # |"]
],
function: function(yn, field){
if(yn!=1) return;
if( !S("#arSTOOLS").exists() ) _CrearAccesosDirectos();
var tabla = top.S("TABLE", "#arSTOOLS").obj,
Icon = {
I:"I", D:"D", U:"U", V:"V", X:"R",
A:"I", B:"D", M:"U", C:"V", L:"&#xfB13"
}, i = "<i class='ICONINPUT ICONINSERT' oncontextmenu=_delOpUser(this) onclick={frames['IWORK'].location.href='"+field["op"]+"'} title='"+field["title"]+"'>"+Icon[S.upper(S.mid(field["op"], "?", ":")[1])]+"</i>";
tabla.rows[0].insertCell().innerHTML = i;
if( window.sessionStorage ){
sessionStorage.setItem("userIcon"+(tabla.rows[0].cells.length-8), i);
}
}
});
break;
case "GO":
var win = S.window("edes.php?E:$a/u/op.gs&_GEST=ALL", {title:"Gestor de Opciones", fullscreen:true, onclose:function(){
S.call("E:$a/u/op.gs&LIBERAR=1", null, {info:1});
return true;
}});
break;
case "GC":
S.window("edes.php?Fa:$a/d/color_core.edf", {title:"Gestor de Colores", fullscreen:true});
break;
case "CP":
S.window("edes.php?Fa:$a/d/color_pdf.edf", {title:"Colores en PDF", fullscreen:true});
break;
case "ET":
var win = S.windowFocus();
if( win._Source ) S.window("edes.php?E:$t/40.gs&_EDF="+win._Source, {title:"Editor de textos", fullscreen:true});
break;
case "NULL":
var win = S.windowFocus();
if( /^(F|G)$/.test(win._Obj) && /^(a|mR)$/.test(win._Mode) ){
S.window("Ll:$a/u/null_manager.edf&_DBTABLE="+win._DBTABLE, {title:'Edita estructura tabla "<b>'+win._DBTABLE+'</b>"', frameElement:["e-Parent",win], modal:false});
}else S.info("Solo está activo en Fichas en modo Alta y Modificación");
break;
default:
}
if( S.session.logCallSrv || S.session.logCallAnswer ){
if( S("#_ViewLogCall").length==0 ){
S("<span id='_ViewLogCall' style='position:absolute;left:0px;top:0px;border:1px solid red;padding:5px;background-color:#cccccc;z-index:999999'></span>", top).nodeEnd(top.document.body);
}
}else if( S("#_ViewLogCall").length==1 ){
S("#_ViewLogCall", top).nodeRemove();
}
top["gsTools_"] = null;
}
});
return "";
}
function _delOpUser(obj){
S("I", S.toTag(obj, "TABLE")).each(function(k,o){
if( o==obj ){
S(obj.parentNode).none();
sessionStorage.removeItem("userIcon"+(k-7));
}
});
S.eventClear(window);
}
if( window.sessionStorage ){
!function(){
var tabla, n=1;
while( sessionStorage.getItem("userIcon"+n) ){
if(n==1){
_CrearAccesosDirectos();
tabla = top.S("TABLE", "#arSTOOLS").obj;
}
tabla.rows[0].insertCell().innerHTML = sessionStorage.getItem("userIcon"+n++);
}
}();
}
function _ExeInActiveWindow(){
var icono = S.event(window),
fun = icono.getAttribute("eFunc"),
win = S.windowFocus(), p;
if( win && win[fun] ){
p = icono.getAttribute("eArg");
if( p=="false" ) p = false;
else if( p=="true" ) p = true;
win[fun](p);
S.info(win, fun+"()", 1);
}
}
function _GPFields(op){
var win = S.windowFocus(), b;
if( S("FORM", win).exists() ){
if( op=="s" ){
S(".AddButton", win).each(function(k,o){
if(o.offsetWidth>0){
S(o).eventFire("click");
return null;
}
}, {bak:true});
}else{
Fields(op, win, true);
}
S.info(win, "Ejecutado", 1);
}
}
function eTron(x){console.log("TRON: "+x)}
function eTrace(x){console.log("TRACE: "+x)}
function gsViewFields(win, title){
var txt="",f,t,n,ng=0,i;
if( title!=undefined ) txt += `<u><b>${title}</b></u><br>\n`;
for(f=0; f<win.document.forms.length; f++){
txt += "forms[<b>"+win.document.forms[f].name+"</b>]<br>\n";
t = win.document.forms[f].elements;
i = 0;
for(n=0; n<t.length; n++) if( t[n].tagName!="FIELDSET" ){
txt += (++ng)+":"+(++i)+": "+t[n].name+" = "+t[n].value;
if( t[n].type=="radio" ) txt += " > "+S(":"+t[n].name,win).val();
txt += "<br>\n";
}
}
var t = window.open('');
t.document.write(txt);
}
function _EditHelpIcon(win, obj, iHelp){
S.session.helpEdit = obj;
iHelp = ((win._SourceOne!=undefined)? win._SourceOne:win._Source)+","+iHelp;
S.window("edes.php?E:$t/help.php&HELP="+escape(iHelp), {title:"Edita ayuda: "+iHelp, fullscreen:true});
return false;
}
function _CrearIcono(win, padre, o, iName, iMode, iType, mark){
var url = (win._SourceOne!=undefined)? win._SourceOne:win._Source,
enList = (win._Obj=="L")?" id=ListHelpIcons":"",
seVe = (win._Obj=="L")?";display:none":"";
url = url+","+iMode+iName+mark;
if( iName!="" ) iName = S.mid(iName,1,0);
if( iName=="TITLEICON" ){
if( iType.length==1 ){
if( iType=="H" ){
S('<i class="ICONHEADER" iHelp="'+iName+'" iMode="'+iMode+'" iMark="'+mark+'" iType="'+iType+'"'+enList+' onclick="top.gsHelp(&quot;'+url+'&quot;, event)" oncontextmenu="_SetDownload()" title="Ayuda" style="cursor:pointer'+seVe+'">@</i>', win).nodeEnd(padre);
}else{
S('<i class="ICONHEADER" iHelp="'+iName+'" iMode="'+iMode+'" iMark="'+mark+'" iType="'+iType+'"'+enList+' onclick="_HelpMenu(&quot;'+iType+'&quot;, null, this, null, null, &quot;'+url+'&quot;)" oncontextmenu="_SetDownload()" title="Ayuda" style="cursor:pointer'+seVe+'">@</i>', win).nodeEnd(padre);
}
}else{
S('<i class="ICONHEADER" ihelp="'+iName+'" iMode="'+iMode+'" iMark="'+mark+'" iType="'+iType+'"'+enList+' onclick="gsHelp(&quot;'+url+'&quot;, &quot;'+iType+'&quot;, event)" title="Ayuda" style="cursor:pointer'+seVe+'">@</i>', win).nodeEnd(padre);
}
}else{
if( o.tagName=="INPUT" && S(":_INPUT_"+o.name,win).exists() ){
o = S(":_INPUT_"+o.name,win).obj;
}
S('<i class="ICONINPUT" iHelp="'+iName+'"  iMode="'+iMode+'" iMark="'+mark+'" pp="1" onclick="top.gsHelp(\''+url+'\', event)" title="Ayuda">?</i>', win).nodeAfter(o);
}
}
function _DefineAyuda(o, win){
var cTab=cList=cQuery=cMark=cHtm=cPdf=cMp4=cChm="",
iMode = S(o).attr("iMode")||"",
iType = S(o).attr("iType")||"",
dim = [];
if( S.is("t", iMode) ) cTab = "S";
if( S.is("l", iMode) ) cList = "S";
if( S.is("q", iMode) ) cQuery = "S";
cMark = (S(o).attr("iMark") && S(o).attr("iMark")!="")?"S":"";
if( /^(TABHeaderTitle|TABHeaderIcons|UtilListICO)$/.test(o.id) || o.getAttribute("iHelp")=="TITLEICON" ) dim.push(["Modo LIST |list|#|C|1||M|"+cList+"||"]);
dim.push(
["Modo Query|query|#|C|1||M|"+cQuery+"||"],
["Modo TAB	|tab  |#|C|1||M|"+cTab+"||"],
["-"],
["Markdown  |mark |#|C|1||M|"+cMark +"||"]
);
if( (o.tagName=="TD" && /^(TABHeaderTitle|TABHeaderIcons)$/.test(o.className)) || (o.tagName=="I" && o.getAttribute("iHelp")=="TITLEICON") || o.id=="UtilListICO" ){
if( S.is("H", iType) ) cHtm = "S";
if( S.is("P", iType) ) cPdf = "S";
if( S.is("V", iType) ) cMp4 = "S";
if( S.is("C", iType) ) cChm = "S";
dim.push(["-"]);
dim.push(["Formato HTM|htm|#|C|1||M|"+cHtm+"||"]);
dim.push(["Formato PDF|pdf|#|C|1||M|"+cPdf+"||"]);
dim.push(["Formato MP4|mp4|#|C|1||M|"+cMp4+"||"]);
dim.push(["Formato CHM|chm|#|C|1||M|"+cChm+"||"]);
}
S.alert({
title:"CONFIGURAR AYUDA",
icon:'<img src="g/sys_warning.gif">',
button:"A,C,Y|Aceptar,Borrar,Cancelar|#068205,#ff0000,",
form:dim,
function:function(op, field, para){
var obj=para[0], oMode=para[1], oType=para[2], oMark=para[3],
lqt="", iType="", padre, iName,
campo=obj.name || obj.getAttribute("iHelp"),
pkHelp = ((win._SourceOne!=undefined)? win._SourceOne:S.mid(win.location.search,":","&"))+"."+oMode+"."+campo+"."+oType+"."+oMark;
pkHelp = S.replace(pkHelp,"..",".");
if( campo!=null && S.is("_INPUT_",campo) ){
campo = S.mid(campo,7,0);
obj = S(":"+campo, win).obj;
}
if( op==1 ){
return;
}else if( op==-1 ){
if( S("I[iHelp='"+campo+"']", win).exists() ){
S.call("edes.php?E:$t/help.php&FILEDELETE="+escape(pkHelp));
S("I[iHelp='"+campo+"']", win).nodeRemove();
}
}else if( op==2 ){
if(field["list"]=="S") lqt+="l";
if(field["query"]=="S") lqt+="q";
if(field["tab"]=="S") lqt+="t";
if( lqt=="" ){
return 'Falta seleccionar algún "Modo".';
}
if( (/^(c|m|b)$/.test(win._Mode) && !/q/.test(lqt)) || (win._Mode=="l" && !/l/.test(lqt)) ){
return 'Falta seleccionar el "Modo" actual.';
}
if(field["htm"]=="S") iType+="H";
if(field["pdf"]=="S") iType+="P";
if(field["mp4"]=="S") iType+="V";
if(field["chm"]=="S") iType+="C";
if( campo==null ) campo = "TITLEICON";
if( S("I[iHelp='"+campo+"']", win).exists() ){
S("I[iHelp='"+campo+"']", win).nodeRemove();
}
if( campo=="TITLEICON" ){
padre = S("#TABHeaderIcons", win).obj;
iName = ",TITLEICON";
if( iType=="" ) iType = "H";
}else{
if( !obj.name )	obj = S(":"+campo, win).obj;
padre = S.toTag(obj, "nobr");
iName = ","+obj.name;
}
pkHelp = ((win._SourceOne!=undefined)? win._SourceOne:S.mid(win.location.search,":","&"))+"."+lqt+"."+campo+"."+iType+"."+(field["mark"]=="S"?"mark":"");
S.call("edes.php?E:$t/help.php&ADDHELP="+escape(pkHelp));
_CrearIcono(win, padre, obj, iName, lqt, iType, field["mark"]=="S"?".mark":"");
}
},
parameter:[o, iMode, iType, cMark=="S" ? "mark":""]
});
S.eventClear(win);
}
function _CreaAyuda(){
var z=-1, win;
S("SPAN.WINDOW").each(function(pk,o){
if( o.style.zIndex>z ){
z = o.style.zIndex;
win = o;
}
});
win = (z==-1)? frames["IWORK"] : win.children[0].rows[1].cells[0].children[0].contentWindow;
if( S(".MODAL[CreaHelp]", win).exists() || /^(cR|bR)$/.test(win._Mode) ) return;
var xModal = S("body", win).modal().css("cursor:crosshair").on("click", function(ev){
var x = ev.clientX, y = ev.clientY;
S("INPUT,I", win).add("#TABHeaderTitle,#TABHeaderIcons").each(function(pk, o){
var c = S.xy(o);
if( c.x<x && c.x+c.w>x && c.y<y && c.y+c.h>y ){
if( o.tagName=="I" ){
if( S(o).attr("iHelp")!=null ){
_DefineAyuda(o, win);
}else if( o.id=="UtilListICO" ){
if( S("I[id='ListHelpIcons']", win).exists() ){
o = S("I[id='ListHelpIcons']", win).obj;
}
_DefineAyuda(o, win);
}
}else if( o.tagName=="INPUT" ){
if( S.is("_INPUT_",o.name) ){
o = S(":"+S.mid(o.name,7,0), win).obj;
}
if( S("I[iHelp='"+o.name+"']", win).exists() ){
o = S("I[iHelp='"+o.name+"']", win).obj;
}
_DefineAyuda(o, win);
}else if( o.tagName=="TD" && /^(TABHeaderTitle|TABHeaderIcons)$/.test(o.className) ){
if( S("I[iHelp='TITLEICON']", win).exists() ){
o = S("I[iHelp='TITLEICON']", win).obj;
}
_DefineAyuda(o, win);
}
return null;
}
});
S(this).nodeRemove();
});
xModal.attr("CreaHelp",1);
}
var _IframeTrace = _IframeTraceSg = null;
function eTronWin( txt, Enter, Sg, win, Ancho ){
if( txt==undefined ){
var Nom='eTronWin',txt='';
if( win==undefined ) win = window;
while( (Nom = (win.eval(Nom).caller+''))!='null' ){
Nom = Nom.split('(')[0];
Nom = Nom.split(' ')[1];
if( Nom=='anonymous' ){
txt += '('+Nom+')';
break;
}
txt += Nom+' - ';
}
}
if( Enter==undefined ) Enter = true;
if( Sg==undefined ) Sg = true;
if( Ancho==undefined ) Ancho = 400;
try{
_IframeTrace = window.open('', 'eTron', 'width='+Ancho+',height='+document.body.clientHeight+',left=0,top=0,status=0,resizable=1,scrollbars=1');
_IframeTrace.document.write("<html><style>#T {background-color:#cccc;padding:4px;}#T SPAN {font-weight:bold;}#E {color:red;}</style><body scroll=yes><script>document.title='eTron JavaScript'; function Linea(){ document.write('<hr>'); } document.ondblclick = Linea; </script></body></html>");
if( Enter && Sg ){
if( _IframeTraceSg==null ) _IframeTraceSg = Date.parse(new Date());
var n = '00000'+((Date.parse(new Date())-_IframeTraceSg)/1000);
_IframeTrace.document.write('<span>'+n.substring(n.length-5)+': </span>');
}
_IframeTrace.document.write(unescape(txt));
if( Enter ) _IframeTrace.document.write('<br>');
}catch(e){}
}
function eTest( para ){
var arg,Func,Dim,e,win;
if( S.type(para)=="array" ){
win = para[0];
arg = para;
}else{
arg = eTest.arguments;
win = para;
}
if( win._eTest==undefined ){
try{
_IframeTrace.document.close();
}catch(e){}
eTronWin('<pre>'+S.date('H:i:s'), 1, 0);
win._eTest = true;
}
for(e=1; e<arg.length-1; e+=2){
Func = (arg[e]=='[object]') ? arg[e].value : arg[e];
Dim = (arg[e+1]=='[object]') ? arg[e+1].value : arg[e+1];
eTronWin('<div id=T>Test: <span>'+Func+'</span></div>', 0, 0);
var n,i,p,pRes,tmp,Res,ok;
for(n=0; n<Dim.length; n++){
pRes = Dim[n].length-1;
p = 0;
for(i=0; i<pRes; i++){
if( typeof(Dim[n][i])=='string' ){
if( Dim[n][i].indexOf('=')>-1 ){
tmp = Dim[n][i].split('=');
S(":"+tmp[0], win).val(tmp[1], false);
p++;
}
}
}
if( (/\./.test(Func) && typeof(win.eval(Func))=="function") || typeof(win[Func])=="function" ){
try{
Res = win.eval(Func)(Dim[n][p], Dim[n][p+1], Dim[n][p+2], Dim[n][p+3], Dim[n][p+4], Dim[n][p+5]);
if( /^(<|>|!=)/.test(Dim[n][pRes]+"") ){
ok = eval(Res+Dim[n][pRes]);
Res = ((Res+" ")+(Dim[n][pRes].split(/(<>|<=|>=|!=|<|>|===|==|=)/).join(" "))).replace(/\s\s/g," ");
if(!ok) Res = '<span id=E>'+Res+'</span>';
}else{
ok = (S.type(Dim[n][pRes])=="regexp")? (Dim[n][pRes].test(Res)==true) : (Dim[n][pRes]==Res);
if(!ok) Res = '<span id=E>'+Dim[n][pRes]+' != '+Res+'</span>';
}
if( S.type(Res)=="null" ) Res = "null";
else if( S.type(Res)=="undefined" ) Res = "undefined";
}catch(e){
var txt="", i;
Res = '<span id=E>Error in "'+Func+'"';
for(i in e) Res +="<br>"+i+': '+e[i];
Res += "</span>";
}
}else{
Res = '<span id=E>Undefined function.</span>';
eTronWin(Res, 1, 0);
break;
}
eTronWin(Res, 1, 0);
}
}
}
function _UnitTest(){
var win = S.windowFocus(), url;
if( S("FORM", win).exists() ){
if( /edes\.php\?(F|G|L).{1,2}\:\$/.test(win.location.href) && top._M_!="~" ) return;
url = S.mid(win.location.href,"?","&");
url = S.right(url,":")+".test";
S.call("edes.php?E:"+url, null, {run:win});
}
}
function _FillFormSS(name, crc, win){
function Azar(i,f){
return parseInt(i) + Math.round(Math.random()*(f-i));
}
obj = S("#"+name+"_TABLE", win);
var crc2 = S.crc32(obj.text()), i;
if( crc==null || crc2==crc ){
setTimeout(function(){
_FillFormSS(name, crc2, win);
}, 200);
}else{
obj = obj.obj;
if( obj.rows.length>0 ){
i = 0;
if( obj.rows.length>1 && S.trim(obj.rows[0].cells[0].innerText)=="" ) i = 1;
i = Azar(i, obj.rows.length-1);
S(":"+name, win).value(obj.rows[i].cells[0].innerText);
}
}
}
function _FillForm(obli){
var win = S.windowFocus();
if( !S("FORM", win).exists() ) return;
if( /edes\.php\?(F|G|L).{1,2}\:\$/.test(win.location.href) && top._M_!="~" ) return;
if( obli==undefined ) obli = false;
function toExp(txt, len){
return (new RegExp(S.replace(txt, "{ACCENTUPR}","", "{ACCENTALL}","", "{SEEK}","", "{LONG}","{"+len+"}")));
}
function Azar(i,f){
return parseInt(i) + Math.round(Math.random()*(f-i));
}
var skipName="";
S("INPUT, TEXTAREA", win).each(function(k,o){
var d = S(o).attr("TC,DCM,LENG,maxlength,min,max,step,eRandom,eRandomWhere,i_ss,TS,eParameters"), v="",vr="",dec="", n, exp,c, obj,obj2;
if( skipName==o.name ) return;
if( S(o).class("?READONLY") || S.left(o.name,7)=="_INPUT_" ){
if( !o.onmousewheel ){
return;
}
}
if( obli && (!win._DefCampo[o.name] || !/^(\=|\#)$/.test(win._DefCampo[o.name].Condicion)) ) return;
if( d["TS"]!=null ){
obj = S("#"+o.name+"_TABLE", win);
obj2 = S("#_"+o.name+"_TABLE", win);
if( (d["TS"]=="S" ||  d["TS"]=="SV" || d["TS"]=="SV,B" || d["TS"]=="SV,L") && (obj.length || obj2.length) ){
if( obj.length==0 ){
obj = obj2;
}
obj = obj.obj;
if( obj.rows.length>0 ){
i = 0;
if( S.trim(obj.rows[0].cells[0].innerText)=="" ) i = 1;
i = Azar(i, obj.rows.length-1);
S(o).value(obj.rows[i].cells[0].innerText);
}
}else if( d["TS"]=="Ss" ){
var crc = S.crc32(obj.text());
_FillFormSS(o.name, null, win);
}
return;
}
if( d["TC"]=="#U" ) d["TC"] = "D";
if( d["TC"]=="#L" ) d["TC"] = "d";
if( d["TC"]=="#" ) d["TC"] = "#X";
switch( o.type ){
case "text":
if( (d["step"]!=null && d["step"]!="") || d["eParameters"]!=null ) return;
if( d["eRandom"]!=null && win._Source ){
vr = (d["eRandomWhere"]!=null)? S(":"+d["eRandomWhere"], win).val() : "";
S.call("E:$t/random.php", {TD:d["TC"], FIELDNAME:o.name, FIELDWHERE:vr, SOURCE:win._Source}, {function:function(dato){
if( dato=="ERROR" ){
S.error('ERROR: La etiqueta [Random] no está bien definida<br>para el campo "'+o.name+'"');
}else{
S(o).val(dato);
}
}});
return;
}
if( /[\+\-]/.test(S.left(d["TC"],1)) ){
v = Azar(0, Math.pow(10, d["LENG"]));
}
if( S.left(d["TC"],1)=="-" ){
if( Azar(0,1)==0 ) v*=-1;
}
if( S.right(d["TC"],1)=="," ){
dec = "."+Azar(0, Math.pow(10, d["DCM"]));
}
if( /^(F4|CDI)$/.test(d["TC"]) ){
v = Azar(1950, S.date("Y")*1+20)+"-"+S.padL(Azar(1,12),2)+"-"+S.padL(Azar(1,31),2);
if( d["TC"]=="CDI" ){
v += " "+S.padL(Azar(0,23),2)+":"+S.padL(Azar(0,59),2)+":"+S.padL(Azar(0,59),2);
}
}else if( d["TC"]=="P4" ){
v = Azar(1950, S.date("Y")*1+20)+"-"+S.padL(Azar(1,12),2);
}else if( d["TC"]=="T" ){
v += ""+S.mid("986", Azar(0,2), 1);
for(n=0; n<8; n++) v += ""+Azar(0,9);
}else if( d["TC"]=="0" ){
for(n=0; n<d["LENG"]; n++) v += ""+Azar(0,9);
}else if( d["TC"]=="CP" ){
v = S.padL(Azar(1,64), 2);
for(n=0; n<3; n++) v += ""+Azar(0,9);
}else if( d["TC"]=="CIF" ){
v = "ABCDEFGHKLMNPQS".substr(Azar(0,14),1);
for(n=0; n<7; n++) v += ""+Azar(0,9);
var uLetra = new Array("J","A","B","C","D","E","F","G","H","I");
for(n=0; n<uLetra.length; n++){
if( win.eOkCIF(v, uLetra[n]) ){
v += uLetra[n];
break;
}
}
}else if( d["TC"]=="DNI" ){
for(n=0; n<8; n++) v += ""+Azar(0,9);
var uLetra = S.setup.nif.split("");
}else if( d["TC"]=="NIF" ){
for(n=0; n<8; n++) v += ""+Azar(0,9);
var uLetra = S.setup.nif.split("");
for(n=0; n<uLetra.length; n++){
if( win.eOkDNI(v, uLetra[n]) ){
v += uLetra[n];
break;
}
}
}else if( d["TC"]=="NSS" ){
v = S.padL(Azar(1,52),2);
for(n=0; n<8; n++) v += ""+Azar(0,9);
v += ""+S.padL((v*1)%97,2);
}else if( d["TC"]=="exp" ){
exp = o["eType"];
if( exp==null ){
exp = S.mid(S.mid(o.onfocus+"","{",-1), "/", "/");
}else{
exp = S.mid(exp+"", "/", "/");
}
xLong = S.mid(exp, "{", "}");
exp = S.replace(exp, "{"+xLong+"}", "{1}");
xLong = xLong.split(",");
if(xLong[1]==undefined) xLong[1] = xLong[0];
exp = new RegExp(exp);
i = Azar(xLong[0], xLong[1]);
while(v.length<i){
c = S.char(Azar(32,122));
if( exp.test(c) ){
v += ""+c;
}
}
v = S.trim(v);
S(o).val(v);
}else if( d["TC"]=="N" || d["TC"]=="n" || d["TC"]=="D" || d["TC"]=="d" || d["TC"]=="X" || d["TC"]=="x" ){
exp = toExp(S.keyCheck[d["TC"]][1][0], 1);
i = Azar(0,d["LENG"]);
while(v.length<i){
c = S.char(Azar(32,122));
if( exp.test(c) ){
v += ""+c;
}
}
v = S.trim(v);
S(o).val(v);
}else if( d["TC"]=="#N" || d["TC"]=="#D" || d["TC"]=="#X" || d["TC"]=="W" ){
exp = S.keyCheck[d["TC"]];
if( d["TC"]=="W" ) exp = S.replace(S.keyCheck["W"], ".\\-_/\|:?=&","", "A-Z","", "0-9","");
exp = toExp(exp, 1);
i = Azar(20, d["LENG"]-(d["TC"]=="W"? -10:9));
if( d["TC"]=="W" ) v = "http://";
while(v.length<i){
c = S.char(Azar(32,122));
if( exp.test(c) ){
v += ""+c;
}
}
if( d["TC"]=="W" ) v += ".es";
v = S.trim(v);
S(o).val(v);
}else if( d["TC"]=="@" ){
exp = toExp(S.replace(S.keyCheck[d["TC"]], "._%+-@","", "A-Z","a-z"), 1);
i = Azar(4,15);
while(v.length<i){
c = S.char(Azar(32,122));
if( exp.test(c) ) v += ""+c;
}
v += "@";
i = Azar(4,15)+i;
while(v.length<i){
c = S.char(Azar(32,122));
if( exp.test(c) ) v += ""+c;
}
v += ".es";
S(o).val(v);
}else if( d["TC"]=="H8" ){
v = S.padL(Azar(0,23),2)+":"+S.padL(Azar(0,59),2)+":"+S.padL(Azar(0,59),2);
}else if( d["TC"]=="H5" ){
v = S.padL(Azar(0,23),2)+":"+S.padL(Azar(0,59),2);
}else if( d["TC"]=="H2" ){
v = S.padL(Azar(0,23),2);
}else if( d["TC"]=="IP" ){
v = Azar(0,999)+"."+Azar(0,999)+"."+Azar(0,999)+"."+Azar(0,999);
}else if(/^(CLR|clr)$/.test(d["TC"]) ){
v = "#";
for(n=0; n<6; n++){
v += S.mid("0123456789ABCDEF", Azar(0,15), 1);
}
}
S(o).val(v+dec);
break;
case "textarea":
if( S.setup.systemFields.test(o.name) ) break;
exp = o["eType"];
if( exp==null ){
exp = S.mid(S.mid(o.onfocus+"","{",-1));
if( exp=="" ) break;
if( S.count("/",exp)>0 ){
exp = S.mid(exp+"", "/", "/");
xLong = S.mid(exp, "{", "}");
exp = S.replace(exp, "{"+xLong+"}", "{1}");
}else{
exp = S.mid(exp, "'", "'");
if( exp=="#U" ) exp = "D";
if( exp=="#L" ) exp = "d";
if( exp=="#" ) exp = "#X";
if( S.type(S.keyCheck[exp])=="string" ){
exp = S.keyCheck[exp];
}else{
exp = S.keyCheck[exp][1][0];
}
}
}else{
if( S.count("/",exp)>0 ){
exp = S.mid(exp+"", "/", "/");
}else{
exp = S.mid(exp+"", "'", "'");
if( exp=="#U" ) exp = "D";
if( exp=="#L" ) exp = "d";
if( exp=="#" ) exp = "#X";
if( S.type(S.keyCheck[exp])=="string" ){
exp = S.keyCheck[exp];
}else{
exp = S.keyCheck[exp][1][0];
}
}
}
exp = toExp(exp, 1);
i = Azar(50,500);
while(v.length<i){
c = S.char(Azar(32,122));
if( exp.test(c) ){
v += ""+c;
if( Azar(0,10)==0 ) v+=" ";
else if( Azar(0,80)==0 ) v+=S.char(10);
}
}
v = S.replace(S.trim(v), "  "," ");
S(o).val(v);
break;
case "radio":
skipName = o.name;
var r = S("input[name='"+o.name+"']", win),
i = Azar(0,r.length-1);
v = r.dim[i].getAttribute("eValue");
S(r.dim[i], win).val(v);
break;
case "checkbox":
v = Azar(0,1)==0 ? "":"S";
S(o).val(v);
break;
case "range":
v = Azar(0, (d["max"]-d["min"])/d["step"])*d["step"];
S(o).val(v);
break;
case "password":
i = Azar(6, d["maxlength"]);
exp = toExp(S.keyCheck["@"], 1);
while(v.length<i){
c = S.char(Azar(32,122));
if( exp.test(c) ){
v += ""+c;
}
}
v = S.trim(v);
S(o).val(v);
break;
case "file":
break;
case "hidden":
break;
default:
}
});
return S.eventClear(window);
}
