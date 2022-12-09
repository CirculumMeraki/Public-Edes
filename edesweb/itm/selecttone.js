function eSelectColor(func){
if( S("#_SELECTCOLOR") ) S("#_SELECTCOLOR").nodeRemove();
var tabla = S("<table id='_SELECTCOLOR' class='TOOLBAR' cellspacing=0 cellpadding=0><tr><th class='TITULO'>Selecciona color</th><th class='TITULO' width=1px><i class='ICONWINDOW' op='C' onclick=S(S.toTag(S.event(window),'TABLE')).none()>5</i></th></tr><tr><td colspan=2><canvas></canvas><br><canvas></canvas></td></tr></table>").obj,
obj = tabla.rows[1].cells[0].children[0], contexto,
obj2 = tabla.rows[1].cells[0].children[2], contexto2,
ancho = alto = 15,
iColor = "#ffffff";
fColor = "#000000";
S(tabla).nodeEnd();
if(obj && obj.getContext){
S(obj).css({width:20*ancho, height:10*alto, cursor:"crosshair"});
obj.onclick = function(){
var ev = event,
p = obj.getContext('2d').getImageData(ev.offsetX, ev.offsetY, 1, 1).data,
hex = S.rgb2hex(p);
if( !event.ctrlKey && !event.altKey ) (func)(hex);
if( event.ctrlKey ) iColor = hex;
if( event.altKey ) fColor = hex;
tonos(hex);
}
contexto = obj.getContext('2d');
if(contexto){
var color =("fdedec,fadbd8,f5b7b1,f1948a,ec7063,e74c3c,cb4335,b03a2e,943126,78281f,"+
"f9ebea,f2d7d5,e6b0aa,d98880,cd6155,c0392b,a93226,922b21,7b241c,641e16,"+
"f5eef8,ebdef0,d7bde2,c39bd3,af7ac5,9b59b6,884ea0,76448a,633974,512e5f,"+
"f4ecf7,e8daef,d2b4de,bb8fce,a569bd,8e44ad,7d3c98,6c3483,5b2c6f,4a235a,"+
"ebf5fb,d6eaf8,aed6f1,85c1e9,5dade2,3498db,2e86c1,2874a6,21618c,1b4f72,"+
"eaf2f8,d4e6f1,a9cce3,7fb3d5,5499c7,2980b9,2471a3,1f618d,1a5276,154360,"+
"eafaf1,d5f5e3,abebc6,82e0aa,58d68d,2ecc71,28b463,239b56,1d8348,186a3b,"+
"e8f8f5,d1f2eb,a3e4d7,76d7c4,48c9b0,1abc9c,17a589,148f77,117864,0e6251,"+
"e8f6f3,d0ece7,a2d9ce,73c6b6,45b39d,16a085,138d75,117a65,0e6655,0b5345,"+
"e9f7ef,d4efdf,a9dfbf,7dcea0,52be80,27ae60,229954,1e8449,196f3d,145a32,"+
"fef9e7,fcf3cf,f9e79f,f7dc6f,f4d03f,f1c40f,d4ac0d,b7950b,9a7d0a,7d6608,"+
"fef5e7,fdebd0,fad7a0,f8c471,f5b041,f39c12,d68910,b9770e,9c640c,7e5109,"+
"fdf2e9,fae5d3,f5cba7,f0b27a,eb984e,e67e22,ca6f1e,af601a,935116,784212,"+
"fbeee6,f6ddcc,edbb99,e59866,dc7633,d35400,ba4a00,a04000,873600,6e2c00,"+
"ebe7e3,d8cfc7,c5b8ab,b2a090,9f8874,8c7158,664221,59391c,4c3118,3f2914,"+
"ffffff,fbfcfc,f7f9f9,f4f6f7,efefef,dfdfdf,d0d3d4,b3b6b7,979a9a,7b7d7d,"+
"f8f9f9,f2f3f4,e5e7e9,d7dbdd,cacfd2,bdc3c7,a6acaf,909497,797d7f,626567,"+
"f4f6f6,eaeded,d5dbdb,bfc9ca,aab7b8,95a5a6,839192,717d7e,5f6a6a,4d5656,"+
"f2f4f4,e5e8e8,ccd1d1,b2babb,99a3a4,7f8c8d,707b7c,616a6b,515a5a,424949,"+
"eaecee,d5d8dc,abb2b9,808b96,566573,2c3e50,273746,212f3d,1c2833,000000").split(","),
i,j,p=0;
for(i=0; i<20; i++){
for(j=0; j<10; j++){
contexto.fillStyle = "#"+color[p++];
contexto.fillRect(i*ancho, j*alto, ancho, alto);
}
}
}
S(obj2).css({width:20*ancho, height:15, cursor:"crosshair"});
obj2.onclick = function(){
var ev = event,
p = obj2.getContext('2d').getImageData(ev.offsetX, ev.offsetY, 1, 1).data,
hex = S.rgb2hex(p);
(func)(hex);
}
contexto2 = obj2.getContext('2d');
tonos("#808080");
}
S(S.event(window)).around(tabla, {type:"11,1,12,7,5,6,14"});
function tonos(hex){
var fondo=contexto2.createLinearGradient(0, 0, 300, 150);
fondo.addColorStop(0  ,iColor);
fondo.addColorStop(0.5,hex);
fondo.addColorStop(1  ,fColor);
contexto2.fillStyle = fondo;
contexto2.fillRect(0, 0, 300, 150);
}
}
