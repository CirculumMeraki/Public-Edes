function ControlFRM( eObj ){
if( ControlFRM.arguments.length == 0 ){
if( null == event ) return;
var el = S.event(window);
}else{
var el = eObj;
}
if( undefined != _ControlFRM[el.name,el.value] ){
_ControlFRM[el.name,el.value] = _ControlFRM[el.name,el.value].replace(' ','');
var tmp = _ControlFRM[el.name,el.value].split(';');
var On = tmp[1].split(',');
var Off = tmp[2].split(',');
var Obj, i, tipo = tmp[0].substring(0,1), del = (tmp[0].substring(1,2)=='B');
if( tipo=='C' ){
for( i=0; i<Off.length; i++ ){
if( Off[i].length > 0 ){
Obj = Obj.DGI(Off[i]);
Obj.style.display = 'none';
if( del ) Obj.value = '';
}
}
for( i=0; i<On.length; i++ ){
if( On[i].length > 0 ) DGI(On[i]).style.display = 'block';
}
}else if( tipo=='D' ){
for( i=0; i<Off.length; i++ ){
if( Off[i].length > 0 ){
Obj = DGI(Off[i]);
Obj.readOnly = true;
Obj.style.backgroundColor = 'transparent';
if( del ) Obj.value = '';
}
}
for( i=0; i<On.length; i++ ){
if( On[i].length > 0 ){
Obj = DGI(On[i]);
Obj.readOnly = false;
Obj.style.backgroundColor = '';
}
}
}else if( tipo=='T' ){
NumTR = -1;
if( Off.length > 0 ){
for( i=0; i<Off.length; i++ ){
var PunCondi = false;
var xCond = '';
if( Off[i].indexOf(':') > -1 ){
var stmp = Off[i].split(':');
Off[i] = stmp[0];
xCond = stmp[1];
var PunCondi = true;
}
if( PunCondi ){
_DefCampo[Off[i]].Condicion = xCond;
for( var p=0; p<_cForm.length; p++ ){
if( _cForm[p].Nombre == Off[i] ){
_cForm[p].Condicion = xCond;
break;
}
}
}
Obj = DGI(Off[i]);
while( !(Obj.tagName == 'TR' && Obj.id==']' ) ) Obj = Obj.parentNode;
if( Obj.tagName == 'TR' && Obj.id==']' ) Obj.style.display = 'none';
}
}
if( On.length > 0 ){
for( i=0; i<On.length; i++ ){
var PunCondi = false;
var xCond = '';
if( On[i].indexOf(':') > -1 ){
var stmp = On[i].split(':');
On[i] = stmp[0];
xCond = stmp[1];
var PunCondi = true;
}
if( PunCondi ){
_DefCampo[On[i]].Condicion = xCond;
for( var p=0; p<_cForm.length; p++ ){
if( _cForm[p].Nombre == On[i] ){
_cForm[p].Condicion = xCond;
break;
}
}
}
Obj = DGI(On[i]);
while( !(Obj.tagName == 'TR' && Obj.id==']' ) ) Obj = Obj.parentNode;
if( Obj.tagName == 'TR' && Obj.id==']' ) Obj.style.display = 'block';
}
}
}
}
}
