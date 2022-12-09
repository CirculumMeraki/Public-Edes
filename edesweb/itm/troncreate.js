var _gsTronCreate;
function gsTronCreate(On){
top.eTron();
On = !(On || false);
_gsTronCreate = On;
if( !On ) return;
var Dim = document.getElementsByTagName('script'), n;
for(n=0; n<Dim.length; n++){
if( Dim[n].src!='' ){
top.ObjDescarga.startDownload(Dim[n].src, function(txt){ List( txt ); });
}else{
List(Dim[n].innerHTML);
}
}
function List(txt){
var Existe;
txt.replace(/^function\s+(\w*)\s?\(/gm, function($0, $1){
try{
if( $1=='_StoreDownElement' || $1=='gsTronCreate' || $1=='List' || $1=='Exe' ) return;
Existe = typeof(eval($1));
window[$1] = Exe(eval($1));
}catch(e){}
}
);
}
function Exe(fn){
return function(){
var nom, p, txt='', ff=(fn+''), uNom;
try{
do{
(ff+'').replace(/^function\s+(\w*)\s?\(/, function($0,$1){ nom=$1; });
ff = nom;
if( txt!='' ) txt += ' << ';
txt += nom+'(';
try{
var arg = eval(nom).arguments;
p = arg.length;
}catch(e){
txt += ')';
break;
}
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
case 'undefined':
txt += arg[p];
break;
default:
txt += arg[p];
}
}
txt += ')';
}while( ff!='anonymous' && (ff=eval(nom).caller+'') && ff!=null && ff!='null' && ff!='undefined' && ff!='' );
}catch(e){
for(var i in e) top.eTron('ERROR: '+i+': '+e[i]);
txt += ' )';
}
if( _gsTronCreate ) top.eTron(txt);
return fn.apply(this, arguments);
};
}
}
gsTronCreate();
function gsDebugNumFunction(texto){
var patron = /function /g, n;
while( (coincidencia = patron.exec(texto)) != null ){
n = coincidencia.index;
top.eTron(n+'  '+texto.substr( n+9, texto.indexOf('(',n)-n-9 )+'()');
}
var coincidencias = texto.match(patron),
numApariciones = coincidencias.length;
top.eTron(numApariciones+' Funciones');
}
