top.S.init(window, "all");
var W = window,
WO = window.open,
DB = document.body,
WE = top,
_TError = 0,
_ShowError = 1,
_WOPENER = null,
_PSOURCE = top.S.url(window,'_PSOURCE'),
_OpenStartTime = Date.parse(new Date()),
_Source = (location.href+'');
if( !window.frameElement.WOPENER ) window.frameElement.WOPENER = window.parent;
try{
_WOPENER = window.frameElement.WOPENER;
}catch(e){
_WOPENER = top;
}
function px(v){
return v+((v==v*1)?"px":"");
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
function eOkWOpener(){
return top.eReadyState(_WOPENER);
}
function ePPF(c,v,CC,ok){ _WOPENER.ePF(c,v,CC); }
function ePGF(c,ok){ return _WOPENER.eGF(c); }
function ePGO(c,ok){ return _WOPENER.eGO(c); }
function eCallSrv(win,url,cond){ top.eCallSrv((typeof win=='object') ? win : window, url, cond); }
function _eCallSrv(win,url,cond){ top.eCallSrv(win,url,cond); }
function _eInit(){
try{
if( !top.eReadyState(window) && ((Date.parse(new Date()) - _OpenStartTime)/1000)<10 ){
setTimeout('_eInit()',500);
}else{
document.body.onhelp = function anonymous(){ top.gsHelpErr(window); return false; }
document.body.onselectstart = function anonymous(){return false;}
if( window.frameElement.id=='ICALL' ) return;
var sv = top.eIsWindow(window);
if( sv ){
top.eSWLoading(window, false, true);
}else{
top.eLoading(false, window);
}
var dw = top._Width,
dh = top._Height;
if( sv ){
dw -= 8;
dh -= 28;
}
var w = document.body.scrollWidth,
h = document.body.scrollHeight, mw=mh=0;
if( document.body.scrollWidth>dw ) mw = 17;
if( document.body.scrollHeight>dh ){
mh = 17;
if( mw==0 ) mw = 17;
}
if( (mh+mw)>0 ){
document.body.style.overflow = 'scroll';
w+=mw; h+=mh;
}else{
document.body.style.overflow = 'hidden';
}
if( sv && !window.frameElement.eNORESIZE ) top.eSWIResize(window, w, h);
document.body.style.overflow = (document.body.scrollHeight>document.body.clientHeight || document.body.scrollWidth>document.body.clientWidth) ? 'auto':'hidden';
if( sv ) top.eSWView(window);
}
}catch(e){
if( top._TronCallSrv ) for(var i in e) alert(i+': '+e[i]);
setTimeout('_eInit()',500);
}
}
setTimeout('_eInit()',1000);
if( _Source.indexOf('edes.php?')>-1 ){
var tmp = _Source.split('edes.php?');
if( tmp.length>1 ) tmp = tmp[1].split(':');
if( tmp.length>1 ) tmp = tmp[1].split('&');
_Source = tmp[0];
}
