var eDes = {
date: "dd-mm-yyyy",
month: "yyyy-mm",
decimal: ",",
showZero: 0,
separador: ".",
accentOn:  "·ÈÌÛ˙‚ÍÓÙ˚‡ËÏÚ˘¸„ıÒ¡…Õ”⁄¬ Œ‘€¿»Ã“Ÿ‹—√’",
accentOff: "aeiouaeiouaeiou¸aoÒAEIOUAEIOUAEIOU‹—AO" }
if( !String.prototype.trim ) String.prototype.trim = function(){ return this.replace(/^\s+|\s+$/g,'').replace(/\s\s/g,' ') };
if( !String.prototype.ltrim ) String.prototype.ltrim = function(){ return this.replace(/^\s+/,'') };
if( !String.prototype.rtrim ) String.prototype.rtrim = function(){ return this.replace(/\s+$/,'') };
if( !String.prototype.code ) String.prototype.code = function(n){ return this.charCodeAt(n) };
String.prototype.upper = function(){ return this.toUpperCase(); }
String.prototype.lower = function(){ return this.toLowerCase(); }
String.prototype.capitalize = function(){
return this.toLowerCase().replace(/\b./g, function(a){ return a.toUpperCase(); });
}
String.prototype.capitalizeFirst = function() {
var s = this.toLowerCase();
return s.charAt(0).toUpperCase() + s.slice(1);
}
String.prototype.capitalizeAcento = function(){
return this.toLowerCase().replace(/^.|\s\S/g, function(a){ return a.toUpperCase(); });
}
String.prototype.accentRemove = function(){
var o = (r= S.accentOn).split(""),
d = S.accentOff.split("");
return this.replace( new RegExp('['+r+']','gi'), function(c,p,s){
return c.replace( new RegExp(c,'gi'), d[o.indexOf(c)] );
})
}
String.prototype.cssCapitalize = function(){
return this.toLowerCase().replace(/-[A-Za-z]/g, function(a){ return a.substr(1).toUpperCase(); });
}
if( !String.prototype.repeat ) String.prototype.repeat = function(n){
return Array(n).join(this);
}
if( !String.prototype.reverse ) String.prototype.reverse = function(){
return this.split("").reverse().join("");
}
function eChar(n){ return String.fromCharCode(n) }
function eCode(x,n){ return x.charCodeAt(n) }
function eDebugCath(e){
if( top._M_=='' ) return false;
var Nom='';
try{
(eDebugCath.caller+'').replace(/^function\s+(\w*)\s?\(/, function($0,$1){ Nom = $1; });
}catch(e){
return false;
}
var txt = '<font color="blue">'+Nom+'</font>(';
try{
var arg = eval(Nom).arguments;
var p = arg.length;
for( p=0; p<arg.length; p++ ){
if( p>0 ) txt += ', ';
switch( typeof(arg[p]) ){
case 'string':
txt += '"'+arg[p]+'"';
break;
case 'number':
txt += arg[p];
break;
case 'object':
txt += '[object.'+(arg[p].name||arg[p].id)+']';
break;
case 'function':
txt += '[function]';
break;
default:
txt += arg[p];
}
}
}catch(e){}
txt += ')';
try{
var ff = (eval(Nom).caller+'');
do{
(ff+'').replace( /^function\s+(\w*)\s?\(/, function($0,$1){ Nom = $1; } );
if( ff!='undefined' && ff!='null' ){
ff = Nom;
txt += ' << '+Nom+'()';
}
}while( ff!='anonymous' && (ff = eval(Nom).caller+'') && ff!=null && ff!='null' && ff!='undefined' && ff!='' );
}catch(e){}
txt += ' <font color="red">ERROR: '+e.description+'</font>';
top.eTron(txt,1);
S.lng(212) = txt;
top._SaveError( 0 );
return eClearEvent();
}
function eReplace( obj, att ){
var arg = arguments, n;
if( eType(obj)=='html' ){
if( eType(arg[2])=='array' ){
for( n=0; n<arg[2].length; n++ ){
obj.setAttribute( att, obj.getAttribute(att).replace(arg[2][n][0],arg[2][n][1]) );
}
}else{
for( n=2; n<arg.length; n+=2 ){
obj.setAttribute( att, obj.getAttribute(att).replace(arg[n],arg[n+1]) );
}
}
}else{
if( eType(arg[1])=='array' ){
for( n=0; n<arg[1].length; n++ ){
obj = obj.replace( new RegExp( arg[1][n][0], 'g' ), arg[1][n][1] );
}
}else{
for( n=1; n<arg.length; n+=2 ){
obj = obj.replace( new RegExp( arg[n], 'g' ), arg[n+1] );
}
}
return obj;
}
}
function eStrUntil( txt, Chr ){
return ( txt.indexOf(Chr)>-1 ) ? txt.substr(0,txt.indexOf(Chr)) : txt;
}
function eMid( txt, Ini, Long ){
if( Ini<0 ) Ini = txt.length+Ini;
if( Long==undefined ) Long = txt.length;
return txt.substr(Ini,Long);
}
function eXY( el, Obj ){
var oRect = el.getBoundingClientRect();
var xy = new Array( oRect.left-2+document.body.scrollLeft, oRect.top-2+document.body.scrollTop, el.clientWidth, el.clientHeight );
if( Obj!=null && Obj!=undefined ){
if( Obj.offsetWidth  + xy[0] > document.body.scrollWidth  ) xy[0] -= Obj.offsetWidth  - el.offsetWidth;
if( Obj.offsetHeight + xy[1] > document.body.scrollHeight ) xy[1] -= Obj.offsetHeight - el.offsetHeight;
if( xy[0] < 0 ) xy[0] += (Obj.offsetWidth /2);
if( xy[1] < 0 ) xy[1] += (Obj.offsetHeight/2);
if( xy[0] < 0 || xy[0]+Obj.offsetWidth  > document.body.scrollWidth  ) xy[0] = (document.body.scrollWidth -Obj.offsetWidth )/2;
if( xy[1] < 0 || xy[1]+Obj.offsetHeight > document.body.scrollHeight ) xy[1] = (document.body.scrollHeight-Obj.offsetHeight)/2;
}
if( xy[0] < 0 ) xy[0] = 0;
if( xy[1] < 0 ) xy[1] = 0;
return xy;
}
function eXYWindow( win, xy ){
if( typeof(xy)=="undefined" ) xy = [0,0];
var oRect;
if( win.name!='Main' ){
oRect = win.frameElement.getBoundingClientRect();
}else{
return xy;
oRect = top.DGI('IWORK').getBoundingClientRect();
}
xy[0] += oRect.left;
xy[1] += oRect.top;
if( win.name!='Main' ) xy = eXYWindow( win._WOPENER, xy );
return xy;
}
function eSplitOne( c, txt ){
var p = txt.indexOf(c);
return (p==-1) ? [txt] : [ txt.substr(0,p), txt.substr(p+1) ];
}
function eLoadCore( win ){
var o = win.document.createElement('script');
o.text = document.getElementById('eDesCore').text;
win.document.getElementsByTagName('head')[0].appendChild(o);
}
