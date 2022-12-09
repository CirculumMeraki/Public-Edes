function eModCSS( Regla, Atributo, Valor, FileCSS ){
if( FileCSS!=undefined ){
FileCSS = FileCSS.replace(/\\/g,'/');
if( FileCSS.indexOf('/') == -1 ) FileCSS = top._PathCSS+'/'+FileCSS;
}
Atributo = Atributo.toUpperCase();
var SS = document.styleSheets, st, ct, v, i,r,d, dato;
for( r=0; r<SS.length; r++ ){
if( FileCSS==undefined || SS[r].href.indexOf(FileCSS) > -1 ){
for( i=0; i<SS[r].rules.length; i++ ){
st = SS[r].rules[i].selectorText;
ct = SS[r].rules[i].style.cssText;
if( st==Regla ){
dato = ct.split(';');
for( d=0; d<dato.length; d++ ){
v = dato[d].split(':');
v[0] = v[0].replace(/^\s+/g,'').replace(/\s+$/g,'');
if( v[0]==Atributo ){
SS[r].rules[i].style.cssText = SS[r].rules[i].style.cssText.replace(v[1]+';',Valor+';');
break;
}
}
}
}
}
}
}
