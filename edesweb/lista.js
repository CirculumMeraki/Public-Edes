// [Tecnología eDes]

/**********************************/
/* Compatible con los dos sistema */
/**********************************/

function eEvent(){			// obtiene el objeto donde se ha generado el evento
	return S.event(window);
}
function eEventClear(){					// anula la pulsación del teclado
	return S.eventClear(window);
}

/**********************************/

var W	= window,
	WE	= top,					// window.external;
	WO	= window.open,
	DB	= document.body,
	DGT	= document.getElementsByTagName,
	_WType = 1;
//var DF	= document.forms;


function eTrim( txt ){								//.(>FJ<)
	txt = txt.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+\s+/g,' ');
	return txt.replace(String.fromCharCode(0),'').replace(String.fromCharCode(13),'').replace(String.fromCharCode(10),'');
}
function Trim(x){ return eTrim(x); }				// OLD
String.prototype.trim = function(){ return this.replace(/^\s+|\s+$/g,'').replace(/\s+\s+/g,' '); }


function eClearEvent(men){							// (>JS<)
	try{
		S.eventClear(window);
		if( null!=men ) top.eAlert(S.lng(209), S.lng(216), 'A','W');
	}catch(e){}
	return false;
}
function AnulaKey(m){ return eClearEvent(m); }			// OLD

function _3CXClear(){
	setTimeout(function(){								// si es un informe se quita de todos los lados ?? no hace falta nunca estaría este dato
		S("tcxspan").each(function(k,o){
			o.outerHTML = o.innerText;					//S(o).HTML(o.innerHTML);
		});
		/*
		var dim=[];
		S("#BROWSE TH[td='T']").each(function(k,o){
			dim.push(o.cellIndex);
		});
		var cx = S("#_Call3CX",top);
		if( cx.length ){
			var tlf, prefix = cx.attr("ePrefix");
			S("tcxspan").each(function(k,o){															//S("#BROWSE td:nth-child(1) tcxspan")
				if( dim.indexOf(o.parentElement.cellIndex)>-1 ){
					tlf = (o.getAttribute("tcxhref")+"phone=").split("phone=");	//tlf = o.getAttribute("tcxhref");													//tlf = o.getAttribute("tcxhref").split("phone=")[1];
					o.title = "Llamar al "+tlf[1];
					o.target = "_blank";
					o.setAttribute("tcxhref", o.getAttribute("tcxhref").replace("phone=", "phone="+prefix));	//o.href = o.href.replace(tlf, prefix+tlf); // o.setAttribute("tcxhref", o.getAttribute("tcxhref").replace(tlf, prefix+tlf));
				}else{
					o.outerHTML = o.innerText;
				}
			});
		}
		*/
	}, 1000);
}

/*
var _DownElement=null;
function _StoreDownElement(){
	try{
		var Obj = S.event(window);
		if( Obj.tagName=='BODY' || Obj.tagName=='TABLE' ) return;
		_DownElement = Obj;
	}catch(e){}
}
*/

var n=0,
	_yHOrigen, _yEOrigen, _xVOrigen,		// Horizontal, Especial y Vertical
	_ColorOrigen = '',						// Color Titulos
	_cDeslizante = 0;						// Columnas deslizantes


var _OkChange = null;
function Cerrar(){							//document.onbeforeunload = Cerrar;													//.Descarga ventanas
	var txt = "";
	if( _OkChange!=null ){
		S("body").visible();		// document.body.style.visibility = "visible";
		txt = S.lng(199);			// Confirmar salir de la aplicación
		event.returnValue = txt;	// Gecko, Trident, Chrome 34+
	}
	return txt;						// Gecko, WebKit, Chrome <34
}


function eLoading(on){			// Quita la tapa cargando
	S.loading(window, on);
}

function _MovBody(){	// se llama desde el BODY de los listados para que la rueda del raton responda al body o al browse
	if( S.toTag(S.event(event), "TABLE", "=id=BROWSE") )	PaginarRueda()
}

function _MovTitulos(){
	//var o = S.event(event);
	setTimeout('MovTitulos();', 250);
	//if( !S.toTag(S.event(event), "TABLE", "=id=BROWSE") ) return S.eventClear(window);
}

var _InScroll=null, _IniMovTitulos=false;
function MovTitulos(){
	//if( typeof(_ModeCard)=="undefined" ) debugger;
	if( _ModeCard || DGI('TablaTH')==null || S("#BROWSE").attr("eCard")==1 ) return;
	if( document.body.style.visibility=="hidden" ){
		setTimeout('MovTitulos(1);',10);
		return;
	}
	if( !_IniMovTitulos ){
		TitulosON();
		_IniMovTitulos = true;
	}
	
	if( S("#TablaTH").obj.offsetWidth>0 && (S("#BROWSE").obj.offsetWidth!=S("#TablaTH").obj.children[0].offsetWidth || S.xy(DGI("TablaTH")).x!=S.xy(DGI("BROWSE")).x) ){
		S("#TablaTH").obj.innerHTML = S("#TablaTV").obj.innerHTML = S("#TablaTE").obj.innerHTML = "";
		TitulosON();
		//console.log(S("#BROWSE").obj.offsetWidth+" - "+S("#TablaTH").obj.offsetWidth);
	}

	//S([TablaTH,TablaTE,TablaTV]).none();

	//var s = S.scrollGet(document.body);
	//console.log( (document.body.offsetHeight + s["scrollTop"])+' == '+document.body.scrollHeight);		// detecta el final del scroll

	clearTimeout(_InScroll);
	_InScroll = setTimeout(function(){
		var i,Obj;
		if( document.body.getAttribute("DimScroll")!=null ){	// Scroll - se usa en "edescore.js"
			for(i in document.body.DimScroll){ 
				if( document.body.DimScroll[i]!=null ){
					Obj = document.body.DimScroll[i];
					if( Obj.sourceIndex==0 ) continue;			// BORRAR ENTRADA......
					//S(Obj).css({
					//	left: document.body.scrollLeft+Obj.xOffset;
					//	top: document.body.scrollTop+Obj.yOffset
					//});
					with( Obj.style ){
						left = document.body.scrollLeft+Obj.xOffset;
						top = document.body.scrollTop+Obj.yOffset;
					}
				}
			}
		}

		// Calcula 'X'
		var TablaTH = DGI('TablaTH');
		if( TablaTH==null ) return;

		var x = 1, el = DGI('BROWSE'),
			sa = S(el).css("borderLeftWidth"),
			Alto = el.offsetHeight;
		if( (sa+"").indexOf('px')>-1 ) x = parseInt(sa);


		if( el==null ) return;
		while( el!=null ){
			x += el.offsetLeft;			//y += el.offsetTop;
			el = el.offsetParent;
		}
		// x = x * _Zoom;
		TablaTH.style.left = (x-1)+"px";

		var s = S.scrollGet(document.body);

		// Titulo HORIZONTAL
			if( _yHOrigen<s["scrollTop"] && _yHOrigen+Alto-TablaTH.offsetHeight>s["scrollTop"] ){		// Se mueve el TH si el top de la patalla esta dentro de la tabla
				TablaTH.style.display = 'block';
				TablaTH.style.top  = (s["scrollTop"]-1)+"px";
				setTimeout(function(){
					DGI('TablaTH').style.top = (s["scrollTop"]-1)+"px";
				}, 250 );				// if( window.name!='_ISUBLIST' ){
			}else{
				TablaTH.style.display = 'none';
			}

		// Paginación incremental
			if( _PagIncremental && document.body.scrollHeight>document.body.clientHeight && DGI("DESDE").value<DGI("HASTA").value ){
				var _NumScreen = 1.5,
					Medida = s["scrollTop"] + (document.body.clientHeight*_NumScreen);
				if( Medida>document.body.scrollHeight && top.eReadyState(top.TLF) ) Paginar(">",1);
			}

		if( _cDeslizante==0 ) return;
		TablaTE.style.left = TablaTV.style.left = x+"px";

		// Titulos VERTICALES
			if( _xVOrigen<s["scrollLeft"] ){
				TablaTV.style.display = 'block';
				TablaTV.style.left = s["scrollLeft"]+"px";
			}else{
				TablaTV.style.display = 'none';
			}

		// Titulo ESQUINA
			if( _yEOrigen<s["scrollTop"] ){
				TablaTE.style.display = 'block';
				TablaTE.style.top = (s["scrollTop"]-1)+"px";
				if( _xVOrigen<s["scrollLeft"] ){
					TablaTE.style.left = s["scrollLeft"]+"px";
				}else{
					TablaTE.style.display = 'none';								//TablaTE.style.left = _xVOrigen;
				}
			}else if( _xVOrigen<s["scrollLeft"] ){
				with( TablaTE.style ){
					display = 'block';
					//posTop  = (_yHOrigen+((parseInt(S("#BROWSE.AltoTH"))==0)? 0:0))+"px";
					//posLeft = s["scrollLeft"]+"px";
					top  = (_yHOrigen+((parseInt(S("#BROWSE.AltoTH"))==0)? 0:0))+"px";
					left = s["scrollLeft"]+"px";
				}
			}else{
				TablaTE.style.display = 'none';
			}

		// recalcula anchos de la Esquina
			var dTE = S("#TablaTH TABLE TH").dim;
			S("#TablaTE").css("width:auto");
			S("#TablaTE TABLE").css("width:auto");

			S("#BROWSE TH[nc]").each(function(k,o){
				if( _cDeslizante>k ){
					dTE[k].style.width = px(o.offsetWidth);			//S(dTE[k]).text(k);
				}else return null;
			});

		//TITULO.textContent = TablaTE.children[0].cells[0].style.width+' / '+TablaTV.children[0].rows[0].cells[0].style.width;
		//TITULO.textContent = TablaTE.offsetWidth+' / '+TablaTV.offsetWidth;
	}, 50);
}


function _SCOnclick(){								// se hace click en las columnas deslizantes
	var Obj=S.event(window), p, Des=0;
	if( _MAXRECFULL && DGI('MAXREC')!=null ){
		var MaxRec = DGI('MAXREC').value*1,
			Desde = DGI('DESDE').value*1;
		Des = (Desde-1)*MaxRec;
	}
	if( Obj.tagName=='IMG' && Obj.src.indexOf('l_order.')>-1 ){
		var Sumar = S.toTag(Obj,'DIV').SlideCol;
		Obj = Obj.parentNode;
		if( _SortList==Obj.cellIndex+Sumar ){
			p = Obj.parentNode.rowIndex+1+(S("#BROWSE.AltoTH")*1)+Des;
			S(DGI("BROWSE").rows[p].cells[_SortList].children[0]).eventFire("click");
		}
		return eClearEvent();
	}
	if( Obj.tagName=='TD' ){
		p = Obj.parentNode.rowIndex;									//p = Obj.parentNode.rowIndex+1+(S("#BROWSE.AltoTH")*1)+Des;
		S(S("#BROWSE TBODY TR").dim[p].cells[0]).eventFire("click");	//S(DGI("BROWSE").rows[p].cells[0]).eventFire("click");
	}
	return eClearEvent();
}
function _SCTHOnclick(){
	var Obj=S.event(window);
	if( /^(IMG|I|SPAN)$/.test(Obj.tagName) ) Obj = Obj.parentNode;	//if( Obj.tagName=='SPAN' ) Obj = Obj.parentNode;
	if( Obj.tagName!='TH' || _NOSORT ) return;						//S(DGI("BROWSE").rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex]).eventFire('click');

	var eObj = DGI("BROWSE").rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex],
		ctrl = event && event.ctrlKey;

	_SortTD = eObj;
	SePulso();					//S.refresh(window);
	setTimeout(function(){
		var sortAsc = !S.is("underline",S(eObj).css("textDecoration")),		//flotante = S("#TablaTH").obj.children[0],
			type = S(eObj).attr("TD");										// thead flotante

		if( !type ){								// es un colspan
			S("#PROCESANDO",window).none();
			return;
		}else if( type[0]=="-" || type[0]=="+" ){	// numero
			type = "N";
		}else if( type=="F4" ){						// fecha
			type = "D";
		}else if( type=="P4" ){						// periodo
			type = "P";
		}else{										// string, S.combierte a mayusculas, s.no conbierte
			type = "S";
		}
		// I. es un icono

		S("#BROWSE").sort(S(eObj).attr("nc"), type, sortAsc?"asc":"desc", ctrl);			//S(oBROWSE).sort(S.cellIndex(eObj), type, sortAsc?"asc":"desc", ctrl);			//S(eObj).attr("nc")
		S("#PROCESANDO",window).none();
	}, 1);

	return eClearEvent();
}

function _RecalcSlideTH(){			// Recalcula el TH deslizante cuando hay [EditList] al modificar datos
	var Origen = DGI("BROWSE"),
		Destino = DGI('TablaTH');
	if( Origen==null || Destino==null || Destino.children.length==0 ) return;
	if( Destino.children.length==0 ) return;
	var oAltoTH = S(Origen).attr("AltoTH")*1, i,n;
	// Calcula el nuevo Ancho de cada celda
	Destino.style.width = px(Origen.offsetWidth);				//Destino.children[0].style.width = 1;
	for(i=0; i<=oAltoTH; i++){
		for(n=0; n<Origen.rows[i].cells.length; n++){
			if( Origen.rows[i].cells[n].offsetWidth>0 ){
				Destino.children[0].rows[i].cells[n].style.width = "1px";
				Destino.children[0].rows[i].cells[n].style.width = px(Origen.rows[i].cells[n].offsetWidth - 4);
			}
		}
	}
	Destino.children[0].style.width = Destino.style.width = px(Origen.offsetWidth);
	var x = 1, el = Origen,
		sa = S(Origen).css("borderLeftWidth");
	//if( sa.indexOf('px')>-1 ) 
	x = parseInt(sa);
	while( el!=null ){
		x += el.offsetLeft;
		el = el.offsetParent;
	}
	Destino.style.left = px(x);
}

function TitulosON(){
	var Origen = DGI("BROWSE");
	if( Origen==null ) return;
	var oAltoTH = S(Origen).attr("AltoTH")*1,
		classBrowse = DGI("BROWSE").className;

	// Titulos en HORIZONTAL
		var Destino = document.getElementById('TablaTH');
		//if( Destino==null ) return;
		Destino.innerHTML = '<table onclick="_SCTHOnclick()" AltoTH='+oAltoTH+' class="'+classBrowse+'" cellspacing=0px cellpadding=0px border=0px style="display:table;width:auto;">' +
								Origen.children[0].outerHTML +						//Origen.all[0].outerHTML +
								Origen.children[1].outerHTML +						//Origen.rows[0].outerHTML + 							//((oAltoTH==1)? Origen.rows[1].outerHTML : '' ) +
							'</table>';

		// Parametros de la tabla
		//with( Destino.children[0] ){	// cellSpacing = Origen.cellSpacing; cellPadding = Origen.cellPadding; border = Origen.border;
		//	className = 'BROWSE';		// Origen.className;
		//	id = '';					// Origen.id;
		//}
		Destino.children[0].id = "";

		with( Destino.children[0].style ){		// Linea superior e inferior del TH
			borderTop	 = '0px solid '+S(Origen).css("backgroundColor");
			borderBottom = '0px solid '+S(Origen).css("backgroundColor");
		}

		// Calcula 'X' e 'Y'
		var x = 1; y = 0, el = Origen;
		while( el!=null ){
			y += el.offsetTop;
			x += el.offsetLeft;
			el = el.offsetParent;
		}
		_yHOrigen = y;					//Origen.offsetTop + Origen.clientTop;	//_yHOrigen = Origen.parentNode.offsetTop + Origen.offsetTop;
		with( Destino.style ){
			width	= Origen.offsetWidth+"px";
			top		= _yHOrigen+"px";
			left	= x+"px";				//Origen.parentNode.offsetLeft + Origen.offsetLeft + Origen.clientLeft;
			display = "block";
		}

		// Estable Ancho y Alto de cada celda
		var i,n,w,padding=0;
		for(i=0; i<=oAltoTH; i++) for(n=0; n<Origen.rows[i].cells.length; n++){
			w = S(Origen.rows[i].cells[n]).css("width");			//w = Origen.rows[i].cells[n].offsetWidth;
			if( w>0 && S(Origen.rows[i].cells[n]).attr("NC")!="" ){
				if( padding==0 ){
					padding = S(Origen.rows[i].cells[n]).cssVal("paddingLeft")+S(Origen.rows[i].cells[n]).cssVal("paddingRight");
				}
				w-=padding;						//4;
				/*
				with( Destino.children[0].rows[i].cells[n].style ){
					width = (Origen.rows[i].cells[n].offsetWidth - 4)+"px";
					//height = (Origen.rows[i].cells[n].offsetHeight - 2)+"px";
				}
				*/
				/*
				Destino.children[0].rows[i].cells[n].style.width = "1px";
				Destino.children[0].rows[i].cells[n].style.width = w+"px";
				Destino.children[0].rows[i].cells[n].style.maxWidth = w+"px";
				*/
				S(Destino.children[0].rows[i].cells[n]).attr("NC", S(Origen.rows[i].cells[n]).attr("NC"));
				S(Destino.children[0].rows[i].cells[n]).attr("pCS", S(Origen.rows[i].cells[n]).attr("pCS"));
				if( _RD ){
					with( Destino.children[0].rows[i].cells[n] ){
						onmousemove = _RDCursorOver;
						onmouseleave = _RDCursorOut;
						onmousedown = _RDDown;
					}
				}
			}
		}

		//TablaTH.style.maxWidth = "auto";
		//TablaTH.style.width = "auto";
		//TablaTH.style.maxWidth = "auto";
		//TablaTH.style.width = TablaTH.offsetWidth+"px";
		S("TH", S(".BROWSE").dim[0]).each(function(k,o){									//console.log(k+"="+o.offsetWidth+' = '+S(o).css("width"));
			S("TH", S(".BROWSE").dim[1]).dim[k].style.maxWidth="auto";
			S("TH", S(".BROWSE").dim[1]).dim[k].style.width=S(o).css("width")+"px";
		});
		//Destino.children[0].style.width = px(Destino.style.width);
		//Destino.children[0].style.width = px(Destino.offsetWidth);

		///document.getElementById('TablaTH').children[0].style.width = Origen.offsetWidth+"px";

		Destino.style.display = "none";

		_xVOrigen = Origen.offsetLeft + Origen.offsetLeft + 3;		// Origen.parentNode.offsetLeft + 
		if( _cDeslizante==0 ){
			document.body.onscroll = MovTitulos;					// Evento
			return;
		}

		// Calcula las columnas visible mirando la primera fila de datos ---> ...ojo... con los informes <---
		var DimCol = new Array(),
			pRow = oAltoTH+1,
			nc=0, sId, n, txt = '<table class="'+classBrowse+' style="display:table;width:auto;">';
		if( Origen.rows[pRow] ){
			for(n=oAltoTH+1; n<Origen.rows.length; n++){		// Calcula la primera fila visible, por el calculo automático de la paginación
				if( Origen.rows[n].offsetHeight>0 ){
					pRow = n;
					break;
				}
			}
			for(n=0; n<Origen.rows[pRow].cells.length; n++){
				if( Origen.rows[pRow].cells[n].offsetWidth>0 ) DimCol[DimCol.length] = n;
			}
		}
		if( DimCol.length<_cDeslizante ) _cDeslizante = DimCol.length;

	// Datos columnas VERTICALES
		var Destino = document.getElementById('TablaTV');
		for(n=0; n<_cDeslizante; n++){
			sId = Origen.children[0].children[DimCol[n]].id;
			if( sId!='' ) sId = ' id='+sId;			// Para la alineación
			txt += Origen.children[0].children[DimCol[n]].outerHTML;									// 24-02-2010
		}
		Destino.innerHTML = txt+'</table>';

		try{
			Destino.SlideCol = DimCol[0];
		}catch(e){
			Destino.SlideCol = -1;
		}

		/*
		with( Destino.children[0] ){	//cellSpacing = Origen.cellSpacing; cellPadding = Origen.cellPadding; border = Origen.border;
			className = 'BROWSE';		//Origen.className;
			id		  = '';				//Origen.id;
		}
		*/

		//nc = 1;
		//for( n=0; n<_cDeslizante; n++ ) nc += Origen.rows[oAltoTH+1].cells[DimCol[n]].clientWidth + 2;
		//Destino.style.width = nc;
		nc = y - 1 + Origen.rows[0].offsetHeight+3;
		if( oAltoTH==1 ) nc += Origen.rows[1].offsetHeight+1;					// Destino.style.top = y - 1 + Origen.rows[1].cells[DimCol[0]].offsetTop;									//Origen.parentNode.offsetTop + 
		Destino.style.top = (nc-1)+"px";
		Destino.style.left = _xVOrigen+"px";

		var no, NewTR, td, menosAlto=(_ListTypeFormat=="S"?1:0);
		Destino = Destino.children[0];
		for(n=1+oAltoTH; n<Origen.rows.length; n++){		// Rellena las columnas
			//if( Origen.rows[n].offsetHeight==0 ) break;		// Para las filas ocultas y el cálculo de la pantalla
			no = n-oAltoTH;
			NewTR = Destino.insertRow(no-1);
			if( Origen.rows[n].getAttribute("eMark")!=null ) NewTR.setAttribute("eMark",0);
			if( Origen.rows[n].offsetHeight==0 ) NewTR.style.display="none";					// por el cálculo de las filas de un listado
			for(nc=0; nc<_cDeslizante; nc++){
				if( nc>=DimCol[nc] ){						//if( Origen.rows[n].getAttribute("edetail")!=null
					td = Origen.rows[n].cells[DimCol[nc]];
					NewTR.insertCell();
					with( NewTR ){
						cells[nc].innerHTML = td.innerHTML;
						//if( td.colspan==1 ){
						cells[nc].style.width = (td.offsetWidth-padding)+"px";			//-4
						cells[nc].style.height = (td.offsetHeight-padding-menosAlto)+"px";		//-4
						cells[nc].id = td.id;
						//className = 'Celda';			// 24-02-2010
					}
				}
			}
			if( Origen.rows[n].id!='' ) NewTR.id = Origen.rows[n].id;
			if( S(Origen.rows[n]).css("color") ) NewTR.style.color = S(Origen.rows[n]).css("color");
			if( S(Origen.rows[n]).css("backgroundColor")!="" && S(Origen.rows[n]).css("backgroundColor")!='transparent' ) NewTR.style.backgroundColor = S(Origen.rows[n]).css("backgroundColor");
			if( Origen.rows[n].className!='' ) NewTR.className = Origen.rows[n].className;
		}
		//if( Destino.rows.length>0 && Origen.rows[Origen.rows.length-1].className!='' ) Destino.rows[Destino.rows.length-1].className = Origen.rows[Origen.rows.length-1].className;
		Destino.onmouseover = DGI("BROWSE").onmouseover;
		Destino.onmouseout = DGI("BROWSE").onmouseout;
		if( DGI("BROWSE").onclick!=null ) Destino.onclick = _SCOnclick;

	// Título ESQUINA
		var Destino = document.getElementById('TablaTE');		//, sumaAnchos=0;
		Destino.innerHTML = '';
		Destino.innerHTML = '<table onclick="_SCTHOnclick()" class="'+classBrowse+' style="display:table;width:auto;">' + 
								Origen.children[0].outerHTML + 												//Origen.rows[0].outerHTML + //((oAltoTH==1)? Origen.rows[1].outerHTML : '' ) + 
								Origen.children[1].outerHTML +
							'</table>';
		/*
		nc = 0;
		for(n=0; n<Origen.rows[oAltoTH+1].cells.length; n++){
			if( Origen.rows[oAltoTH+1].cells[n].offsetWidth>0 ) nc++;
			if( nc>_cDeslizante ){
				Destino.children[0].children[0].children[n].style.display = 'none';
				Destino.rows[n].cells[n].style.display = 'none';
			}
		}
		with( Destino.children[0] ){		//cellSpacing = Origen.cellSpacing; cellPadding = Origen.cellPadding; border = Origen.border;
			className = 'Flotante';			//Origen.className;
			id		  = '';					//Origen.id;
		}
		*/

		for(n=0; n<=oAltoTH; n++){		// Copia atributos de los TH
			no = 0;
			for(nc=0; nc<Origen.rows[n].cells.length; nc++){
				td = Destino.children[0].rows[n].cells[nc];
				if( n==0 && no>=_cDeslizante ){
					td.style.display = 'none';
				}else if( td.getAttribute("nc")*1>=_cDeslizante ){
					td.style.display = 'none';
				}else if( Origen.rows[n].cells[nc].offsetWidth>padding ){															//sumaAnchos += Origen.rows[n].cells[nc].offsetWidth;
					td.style.display = "inline-block";
					td.style.width = (Origen.rows[n].cells[nc].offsetWidth-padding)+"px";		// -4
					td.style.height = (Origen.rows[n].cells[nc].offsetHeight-padding)+"px";		// -4
					td.style.textDecoration = Origen.rows[n].cells[nc].style.textDecoration;
					S(td).attr("NC", S(Origen.rows[n].cells[nc]).attr("NC"));
				}
				no += (td.colSpan||1);
			}
		}

		_yEOrigen = y;							//Origen.offsetTop + Origen.clientTop; -> Origen.parentNode.offsetTop + Origen.offsetTop;
		if( oAltoTH==1 ) _yEOrigen += Origen.rows[2].offsetHeight + 2;

		Destino.style.top = (_yEOrigen + Origen.clientTop)+"px";
		Destino.style.left = (Origen.parentNode.offsetLeft + Origen.offsetLeft)+"px";

		//Destino.parentNode.style.border='solid 3px #9966FF'; Destino.style.border='solid 1px yellow'; Destino.cells[0].style.border='solid 1px red';

		//document.body.onscroll = MovTitulos;						//.Evento

	// Tiene que poner el ancho a la tabla para que no se estreche al deslizarte cuando va por el ancho de la pantalla
		TablaTH.style.display = TablaTV.style.display = TablaTE.style.display = 'table';
		///TablaTH.style.width = TablaTH.offsetWidth+"px";
		TablaTV.style.width = TablaTV.offsetWidth+"px";
		TablaTE.style.width = TablaTV.offsetWidth+"px";
		//TablaTE.style.width = TablaTE.children[0].offsetWidth+"px";;
		//TablaTE.style.width = sumaAnchos+"px";			//TablaTE.offsetWidth+"px";
		TablaTH.style.display = TablaTV.style.display = TablaTE.style.display = 'none';
}

/**
 * Returns the cell of the table by given (x;y) coordinates considering colSpan and rowSpan of the cells.
 * @param {HTMLElement} table - HTML table
 * @param {number} x - X position in table matrix
 * @param {number} y - Y position in table matrix
 * @returns {HTMLElement|null}
 */
 /*
var getTableCell = function (table, x, y) {
    var m = [], row, cell, xx, tx, ty, xxx, yyy;
    for(yyy = 0; yyy < table.rows.length; yyy++) {
        row = table.rows[yyy];
        for(xxx = 0; xxx < row.cells.length; xxx++) {
            cell = row.cells[xxx];
            xx = xxx;
            for(; m[yyy] && m[yyy][xx]; ++xx) {}
            for(tx = xx; tx < xx + cell.colSpan; ++tx) {
                for(ty = yyy; ty < yyy + cell.rowSpan; ++ty) {
                    if (!m[ty])
                        m[ty] = [];
                    m[ty][tx] = true;
                }
            }
            if (xx <= x && x < xx + cell.colSpan && yyy <= y && y < yyy + cell.rowSpan)
                return cell;
        }
    }
    return null;
};
*/

function eSlideColRefres(){
	/*
	var Origen = DGI("BROWSE"); if( null==Origen ) return;
	var oAltoTH = S(Origen).attr("AltoTH")*1;

	// Calcula las columnas visible mirando la primera fila de datos ---> ...ojo... con los informes <---
	var DimCol = new Array(),
		nc=0, sId, n, txt = '<table>', dimTH = S("#BROWSE TH[nc]").dim;
	//<table id="BROWSE" class="BROWSE col_0c col_1l col_2l col_3l col_4n col_5n col_6c col_7r col_8r col_9r col_10r col_11n col_12l col_13c col_14c col_15n c8858" style="display: table;">
	for(n=0; n<dimTH.length; n++){															//for(n=0; n<Origen.rows[oAltoTH+1].cells.length; n++){
		if( dimTH[n].offsetWidth>0 ) DimCol[DimCol.length] = n;		//if( Origen.rows[oAltoTH+1].cells[n].offsetWidth>0 ) DimCol[DimCol.length] = n;
	}
	if( DimCol.length<_cDeslizante ) _cDeslizante = DimCol.length;

	// Datos columnas VERTICALES
	//--------------------------
	var Destino = DGI('TablaTV');											//Destino.innerHTML = '';	//if( Destino.children.length>0 ) S(Destino.children[0]).nodeRemove();
	for(n=0; n<_cDeslizante; n++){
		sId = Origen.children[0].children[DimCol[n]].id;
		if( sId!='' ) sId = ' id='+sId;			// Para la alineación
		txt += Origen.children[0].children[DimCol[n]].outerHTML;			// 24-02-2010
	}
	Destino.innerHTML = txt+'</table>';
	try{
		Destino.SlideCol = DimCol[0];
	}catch(e){
		Destino.SlideCol = -1;
	}

	with( Destino.children[0] ){	//cellSpacing = Origen.cellSpacing; cellPadding = Origen.cellPadding; border = Origen.border;
		className = 'Flotante';		//Origen.className;
		id = '';					//Origen.id;
	}

	//nc = 1;
	//for( n=0; n<_cDeslizante; n++ ) nc += Origen.rows[oAltoTH+1].cells[DimCol[n]].clientWidth + 2;
	//Destino.style.width = nc;
	//	nc = y - 1 + Origen.rows[0].offsetHeight+3;
	//	if( oAltoTH==1 ) nc += Origen.rows[1].offsetHeight+1;					// Destino.style.top = y - 1 + Origen.rows[1].cells[DimCol[0]].offsetTop;									//Origen.parentNode.offsetTop + 
	//	Destino.style.top = px(nc);
	//	Destino.style.left = px(_xVOrigen);

	var xy = S("#BROWSE TBODY").xy();	//S.xy(Origen);
	Destino.style.top = px(xy.y);
	Destino.style.left = px(xy.x);

	var no, NewTR;
	Destino = Destino.children[0];

	var i = parseInt(S("#BROWSE.AltoTH"))+1,
		MaxRec = DGI('MAXREC').value*1,
		Desde = DGI('DESDE').value*1, td;

	//for( n=i+(Desde-1)*MaxRec; n<TR.length; n++ ){

	//for( n=1+oAltoTH; n<Origen.rows.length; n++ ){		// Rellena las columnas
	for(n=i+(Desde-1)*MaxRec; n<Origen.rows.length; n++){		// Rellena las columnas
		if( Origen.rows[n].offsetHeight==0 ) break;		// Para las filas ocultas y el cálculo de la pantalla
		no = n-oAltoTH;
		//NewTR = Destino.insertRow(no-1);
		NewTR = Destino.insertRow();
		for( nc=0; nc<_cDeslizante; nc++ ){
			td = Origen.rows[n].cells[DimCol[nc]];
			NewTR.insertCell();
			with( NewTR ){
				cells[nc].innerHTML = td.innerHTML;
				cells[nc].style.width = px(td.offsetWidth-4);
				cells[nc].style.height = px(td.offsetHeight);
				//className = 'Celda';			// 24-02-2010
			}
		}
		if( Origen.rows[n].id!='' ) NewTR.id = Origen.rows[n].id;
		if( S(Origen.rows[n]).css("color")!="" ) NewTR.style.color = S(Origen.rows[n]).css("color");
		if( S(Origen.rows[n]).css("backgroundColor")!="" && S(Origen.rows[n]).css("backgroundColor")!="transparent" ) NewTR.style.backgroundColor = S(Origen.rows[n]).css("backgroundColor");
		if( Origen.rows[n].className!='' ) NewTR.className = Origen.rows[n].className;
	}
	//if( Destino.rows.length>0 && Origen.rows[Origen.rows.length-1].className!='' ) Destino.rows[Destino.rows.length-1].className = Origen.rows[Origen.rows.length-1].className;
	Destino.onmouseover = DGI("BROWSE").onmouseover;
	Destino.onmouseout = DGI("BROWSE").onmouseout;
	if( DGI("BROWSE").onclick!=null ) Destino.onclick = _SCOnclick;
	MovTitulos();
	//DGI("BROWSE").onmouseover = FilaOn;
	//DGI("BROWSE").onmouseout = FilaOff;
	*/
}


//------------------------------------------------------------------
//.Quita los titulos flotantes antes de IMPRIMIR y despues los pone
//------------------------------------------------------------------
var _SeVeTH, _SeVeTV, _SeVeTE,		// Estado de Visibilidad de los SalvaTitulos
	_SeVeI, _SeVeL;					// Estado de la grafica y de las utilidades

function AntesPrint(){				// parseInt(S("#BROWSE.AltoTH")) = 1 => 2 TH			AltoTH = 0
	DGI("BROWSE").sBackground = S(document.body).css("backgroundColor");
	DGI("BROWSE").sFilter = S(document.body).css("filter");
	DGI("BROWSE").sWidth = S("#BROWSE").obj.style.width;
	document.body.style.backgroundColor = '#FFFFFF';
	document.body.style.filter = '';
	if( DGI("BROWSE").sWidth.indexOf("%")>-1 ) S("#BROWSE").css("width:auto");
	if( DGI("GRILL")!=null ){
		if( window.name=='IWORK' ) top.DGI("LogoEDes").style.display = 'none';
		DGI("GRILL").style.backgroundColor = '#FFFFFF';
		if( DGI("GRILL").offsetWidth>790 ) DGI("GRILL").style.zoom = 780/DGI("GRILL").offsetWidth;		// Por si no cabe a la hora de imprimir
		backgroundColor = '#FFFFFF';
		if( window.ChartPrint!=undefined ) ChartPrint(true);		// Before
	}

	//.Pone Cabecera al PAGINAR (1285,890)
	//$_PAGSETUP = array( 1285, 890, 15.0, 7.0, 1.0, 10.0 );	//Tamaño y margenes página
	_PAGROTATE = false;
	var _yHOJA = ((_PAGROTATE) ? 890:1285) - parseInt(document.body.style.marginTop) - parseInt(document.body.style.marginBottom);		//980 (595x842) 0.75
	//if( _PAGROTATE ) alert('Defina la orientación del papel en apaisado para esta impresión');
	var xTop = parseInt(DGI("BROWSE").rows[0].offsetHeight);
	if( parseInt(S("#BROWSE.AltoTH"))==1 ) xTop += parseInt(DGI("BROWSE").rows[1].offsetHeight) + parseInt(DGI("BROWSE").cellSpacing) + parseInt(DGI("BROWSE").cellPadding);
	var xTR = ( DGI("BROWSE").rows.length>(parseInt(S("#BROWSE.AltoTH"))+1) ) ? parseInt(DGI("BROWSE").rows[parseInt(S("#BROWSE.AltoTH"))+1].offsetHeight) + parseInt(DGI("BROWSE").cellSpacing) + parseInt(DGI("BROWSE").cellPadding) : 0,
		y = parseInt(document.body.style.marginTop)*-1,
		el = DGI("BROWSE").rows[0];
	while( el!=null ){
		y += el.offsetTop;
		el = el.offsetParent;
	}

	//var _A4Width = top._FIELDS["_A4Width"]*1,
	//	_A4Height = top._FIELDS["_A4Height"]*1,

	var Ini = Math.floor( ( _yHOJA - y - xTop ) / xTR )-1,
		Cada = Math.floor( ( _yHOJA - xTop ) / xTR )-1;
	if( !_PAGROTATE ) Ini--;

	//Cada = 10; Ini = 10;
	if( !_MAXRECFULL ){
		//debugger;
		//Ini = 1;
		//Cada = 10;
		for( var i=Ini; i<DGI("BROWSE").rows.length; i+=Cada ){
			var r = DGI("BROWSE").insertRow(i);
			//r.style.pageBreakAfter = 'always';					//tt.style.background = '#FFFFFF';
			r.style.pageBreakBefore = 'always';
			r.tmp = 1;
			var o = S(DGI("BROWSE").rows[0]).nodeCopy(),
				n = S(r).html(S(o.obj).html()).obj;				//n = r.insertBefore(o);
			n.tmp = 1;

			if( parseInt(S("#BROWSE.AltoTH"))==1 ){
				var r = DGI("BROWSE").insertRow(i+1);
				r.tmp = 1;
				var o = S(DGI("BROWSE").rows[1]).nodeCopy(),
					n = S(r).html(S(o.obj).html()).obj;			//n = r.insertBefore(o);
				n.tmp = 1;
			}
		}
	}

	//.Quita TH deslizantes y la Sombra
	_SeVeTH = TablaTH.style.display;
	_SeVeTV = TablaTV.style.display;
	_SeVeTE = TablaTE.style.display;
	if(DGI("UtilList")!=null) _SeVeL = DGI("UtilList").style.display;
	if(DGI("UtilListICO")!=null) _SeVeI = DGI("UtilListICO").style.display;
	//if( null!=DGI('GraLisG') ){					// grafica Microsoft
	//	_SeVeD = Grafica.style.display;
	//	_SeVeG = GraLisG.style.display;
	//	_SeVeT = GraLisT.style.display;
	//	GraLisG.style.display = GraLisT.style.display = 'none';
	//}
	if(DGI("UtilListICO")!=null) DGI("UtilListICO").style.display = 'none';
	if(DGI("UtilList")!=null) DGI("UtilList").style.display = 'none';
	TablaTH.style.display = TablaTV.style.display = TablaTE.style.display = 'none';
}

function ResetPrint(){
}

function DespuesPrint(){
	//.Quitar Cabecera al PAGINAR
	if( !_MAXRECFULL ){
		for(var i=DGI("BROWSE").rows.length-1; i>1; i--) if( DGI("BROWSE").rows[i].tmp==1 ) DGI("BROWSE").deleteRow(i);
	}
	TablaTH.style.display = _SeVeTH;
	TablaTV.style.display = _SeVeTV;
	TablaTE.style.display = _SeVeTE;
	if(DGI("UtilList")!=null) DGI("UtilList").style.display = _SeVeL;
	if(DGI("UtilListICO")!=null) DGI("UtilListICO").style.display = _SeVeI;
	//if( null!=DGI("GraLisT") ){
	//	Grafica.style.display = _SeVeD;
	//	GraLisG.style.display = _SeVeG;
	//	GraLisT.style.display = _SeVeT;			// grafica Microsoft
	//}
	document.body.style.background = DGI("BROWSE").sBackground;
	document.body.style.filter = DGI("BROWSE").sFilter;
	S("#BROWSE").css("width:"+DGI("BROWSE").sWidth);
	if( DGI('GRILL')!=null ){
		if( window.name=='IWORK' ) top.DGI("LogoEDes").style.display = 'block';
		DGI("GRILL").style.backgroundColor = 'transparent';
		DGI("GRILL").style.zoom = 1;
		if( window.ChartPrint!=undefined ) ChartPrint(false);			// After
	}
	//setTimeout('ResetPrint()',2000);
}

function _Imprimir(v){
	//top.PrintAPapel( window ); return;
	top.eAlertHide();
	if( v==-1 ) return;
	if( _LogImprimir!=undefined && DGI("BROWSE")!=null ){
		var Titulo = (DGI('GROUPTITLE')!=null) ? DGI('GROUPTITLE').outerHTML : '',
			TituloTxt = (DGI('GROUPTITLE')!=null) ? DGI('GROUPTITLE').textContent : '';
		//top.eCallSrvPost( 'edes.php?E:$logprint.php', { '_TITULO':Titulo, '_TITULOTXT':TituloTxt, '_TREG':DGI("BROWSE").rows.length-1-S("#BROWSE.AltoTH"), '_IMPRIMIR':DGI("BROWSE").outerHTML} );
		S.call('edes.php?E:$logprint.php', {'_TITULO':Titulo, '_TITULOTXT':TituloTxt, '_TREG':DGI("BROWSE").rows.length-1-S("#BROWSE.AltoTH"), '_IMPRIMIR':DGI("BROWSE").outerHTML});
	}
	//AntesPrint();

	var _A4Width = top._FIELDS["_A4Width"]*1, o, ancho,
		_A4Height = top._FIELDS["_A4Height"]*1,
		//c = S.screen(window),											//S.windowSize(win);
		body = S("body"),
		cBody = body.css("background-color"),
		textAlignBody = body.css("text-align"),
		oPAGINA = S("#PAGINA"),
		//ancho = oPAGINA.obj.offsetWidth,
		bak = oPAGINA.css("text-align,background-color"),
		wCONTENEDOR = S("#CONTENEDOR").css("width"),
		wPAGINA = S("#PAGINA").css("width"),
		bakTablaTH, bakTablaTV, bakTablaTE, hayTHeadScroll=S("#TablaTH").length;

	if( hayTHeadScroll ){
		bakTablaTH = S("#TablaTH").css("display");
		bakTablaTV = S("#TablaTV").css("display");
		bakTablaTE = S("#TablaTE").css("display");
		S("#TablaTH").none();
		S("#TablaTV").none();
		S("#TablaTE").none();
	}

	body.css("background-color:#ffffff");
	oPAGINA.css("text-align:left;background-color:#ffffff");
	S("#CONTENEDOR").css("width:1");
	S("#PAGINA").css("width:1;margin-left:2");
	body.css("text-align:left");
	//document.body.parentNode.style.width = _A4Width+"px"			// _A4Width=805
	//document.body.style.width = _A4Width+"px"						// _A4Width=1180/805

	ancho = oPAGINA.obj.offsetWidth;

	// ¿ cuando girar la página ?
	//S(window).rule("=@page{size: a4 landscape; margin: 0px;}","print");
	//S(window).rule("=@page{size: a4; margin: 0px;}","print");

	_A4Width *= 1180/805;
	_A4Height *= 1180/805;
	
	//if( (c.sw+20)>_A4Width ) body.css("width", _A4Width);
	if( (ancho+20)>_A4Width ) oPAGINA.css("zoom", _A4Width/(ancho+20));
	o = S("<span style='position:absolute;left:0px;top:0px;display:block;height:"+_A4Height+"px;width:"+_A4Width+"px;border:1px solid transparent;'></span>").nodeStart("body");
	//o = S("<span style='position:absolute;left:0px;top:0px;display:block;height:"+_A4Height+"px;width:"+_A4Width+"px;border:1px solid red;'></span>").nodeStart("body");

	window.focus();				//AntesPrint();
	window.print();				//window.external.ePrint();
	window.focus();

	S("#CONTENEDOR").css("width",wCONTENEDOR);
	oPAGINA.css("width:"+wPAGINA+"text-align:"+bak["text-align"]+";background-color:"+bak["background-color"]);
	body.css("text-align",textAlignBody);

	S(o).nodeRemove();
	body.css("background-color:"+cBody);
	
	if( hayTHeadScroll ){
		S("#TablaTH").css("display",bakTablaTH);
		S("#TablaTV").css("display",bakTablaTV);
		S("#TablaTE").css("display",bakTablaTE);
	}

	oPAGINA.css("zoom", 1);

	//DespuesPrint();
	return;
}
function Imprimir(){
	top.eAlert(S.lng(209), S.lng(218), 'A,C', 'P', _Imprimir);
}

//--------
// SOMBRA
//--------

function eDelHelp(){
	if( null!=top.eDelHelp ) top.eDelHelp();
}
eDelHelp();
window.onblur = eDelHelp;


function WidthSubTitle(){
	//var Obj = DGI('SubTitle');
	//if( Obj!=null ) Obj.style.width = px(DGI("BROWSE").offsetWidth);
}

function CondicionesLeft(){
	try{
		if( window.name=='_SUBLISTADO' ){
			_WOPENER.DGI('_Div_SUBLISTADO').style.display = 'none';
		}else{
			//setTimeout('top.eLoading(false,window);',1);
		}
	}catch(e){}
}

function PaginationBarCalc(){

	function insertaTr(tabla, pos, val){
		var oTR = tabla.insertRow(pos);
		oTR.insertCell().innerText = val;
		oTR.insertCell().innerText = val;
	}

	var oPB = S(".PaginationBar"); if( !oPB.length ) return;
	var txt="", n,
		DesdeList = DGI("DESDE").value,
		pagActual = DesdeList,
		PagMultiploDe = 5,					//_VisibleRows,
		//TPaginas = max,					//DGI("HASTA").value = max;
		TPaginas = DGI("HASTA").value;
		PrimerBoton = Math.ceil((pagActual/PagMultiploDe)-1)*PagMultiploDe+1,
		UltimoBoton = PrimerBoton+PagMultiploDe-1;

	if( UltimoBoton>TPaginas ) UltimoBoton = TPaginas;

	S(":HASTA").attr("TPAG", TPaginas)

	// pone quita botones
		if( PrimerBoton>1 ){
			n = PrimerBoton-1;																//PagMultiploDe;
			if( n<1 ) n=1;
			txt += "<span class='ButtonIn ROUNDED2 NoRight' eGroup='"+n+"'>...</span>";		// if(S.eventCode(event)==13){this.CS=1;PaginarDesde();}
		}

		for(n=PrimerBoton; n<=UltimoBoton; n++){
			txt += "<span class='ButtonIn ROUNDED2";
			if( pagActual==n ) txt += " Activated";
			if( PrimerBoton==n && n==1 ) txt += " NoRight";
			else if( TPaginas==n ) txt += " NoLeft";
			else txt += " NoCenter";														//else if( UltimoBoton==n && UltimoBoton<TPaginas ) echo " NoCenter";
			txt += "'>"+n+"</span>";
		}
		if( UltimoBoton<TPaginas ){
			n = UltimoBoton+1;
			if( n>TPaginas) n = TPaginas;													//ceil((n/PagMultiploDe)-1)*PagMultiploDe+1;
			txt += "<span class='ButtonIn ROUNDED2 NoLeft' eGroup='"+n+"'>...</span>";		// if(S.eventCode(event)==13){this.CS=1;PaginarDesde();}
		}
		S("#PaginationBarBT").html(txt);

	// reajusta el numero de páginas				//oPaginationBar.children[4]			// nº de paginas
		var tabla = S("#oDESDE_TABLE").obj,
			tr = tabla.rows, ntr=tr.length, total=TPaginas, n,i, borrar, oTR, oTD;
		if( ntr<total ){			//añadir
			for(n=ntr+1; n<=total; n++){
				oTR = tabla.insertRow();
				oTR.insertCell().innerText = n;
				oTR.insertCell().innerText = n;
			}
		}else if( ntr>total ){		// borrar
			borrar = ntr-total;
			for(n=0; n<borrar; n++){
				tabla.deleteRow(total);
			}
		}

	// reajusta el nº de registros por pag
		tabla = S("#oMAXREC_TABLE").obj;
		tr = tabla.rows;
		total = tr.length;
		for(n=0; n<total; n++){
			i = tr[n].cells[0].innerText*1;
			if( n==0 && _VisibleRows<i ){
				insertaTr(tabla, 0, _VisibleRows);
				break;
			}else if( _VisibleRows==i ){
				break;
			}else if( n>0 && _VisibleRows<i ){
				insertaTr(tabla, n, _VisibleRows);
				break;
			}
		}
		S(".PaginationBar").obj.children[6].children[0].children[0].textContent = _VisibleRows;	// nº de reg por pagina

	// Página Anterior/Siguiente
		if( pagActual==1 ) S("#PaginationBarIZ").class("=ButtonInNO OFF ROUNDED2 NoRight MasMargin");
		else S("#PaginationBarIZ").class("=ButtonIn ROUNDED2 NoRight MasMargin");
		if( TPaginas==pagActual ) S("#PaginationBarDR").class("=ButtonInNO OFF ROUNDED2 NoLeft MasMargin");
		else S("#PaginationBarDR").class("=ButtonIn ROUNDED2 NoLeft MasMargin");

	// Nº de Página
		S(".Button SPAN[eSelectSpan='oDESDE'] SPAN").text(pagActual);
		if( TPaginas==1 ){
			for(n=0; n<5; n++) S(S(".PaginationBar").obj.children[n]).none();
		}else{
			for(n=0; n<5; n++) S(S(".PaginationBar").obj.children[n]).display("inline-flex");
		}

	// al paginar en el cliente, si está al final en una pagina que tiene mas filas de las que caben en la pantalla y das a la última página y hay muy poquitas para que se vean los registros
		var d = S.screen(window);
		if( d.h<d.y ){
			S.scrollSet(document.body, 0);
			//Recalcula();
		}
}

function _CalcPaginacion(){
	if( window.name=="TLF" ) return;
	var nMaxRec = DGI('MAXREC'),
		AltoTH = S("#BROWSE.AltoTH")*1, max, tr, trs, zocalo=0, oPB = S(".PaginationBar");

	if( DGI("DESDE")!=null && _MaxVisibleRows>0 && S(":DESDE").attr("NREG")==1 ){		// && DGI('_Pie2')!=null
		if( !(nMaxRec!=null && nMaxRec.value!='') ){
			_VisibleRows = DGI("BROWSE").rows.length+AltoTH;
			if( _VisibleRows>=DGI("BROWSE").rows.length ) _VisibleRows = DGI("BROWSE").rows.length-1;
			/*
			if( _MAXRECFULL ){
				_VisibleRows = _MaxVisibleRows+AltoTH-1;		//+2;		//DGI("BROWSE").rows.length - 1;
				if( _VisibleRows>DGI("BROWSE").rows.length ) _VisibleRows = DGI("BROWSE").rows.length-1;	// - AltoTH - 1;
			}else{
				_VisibleRows = DGI("BROWSE").rows.length-1;		//-1;
			}
			*/
			//var Desc = _VisibleRows + AltoTH;
			//_VisibleRows += AltoTH;
			tr = _VisibleRows;

			if( S(".MENUFOOTLIST").length ){
				zocalo = S(".MENUFOOTLIST").obj.offsetHeight;
			}
			if( oPB.length ){
				zocalo = oPB.obj.offsetHeight+oPB.css("margin-top")+oPB.css("margin-bottom")-5;
			}

			// cuenta la altura de la tabla o el ToolsPaginate lo que esté mas abajo	#PAGINA
				var xy = S.xy(S("#BROWSE").obj),
					oCheck = S("#ToolsPaginate").obj,
					xy2;

				if( oCheck==null ){
					oCheck = DGI("BROWSE");
				}else{
					xy2 = S.xy(oCheck);
					if( xy2.t>xy.t ){
						xy = xy2;
					}else{
						oCheck = DGI("BROWSE");
					}
				}
				////S(".Pie")

			while( (S.screen(window).h-zocalo)<(xy.t+xy.h) && tr>0 ){			//while( document.body.clientHeight<(xy.t+xy.h) && tr>0 ){			//while( document.body.clientHeight<DGI('PAGINA').offsetHeight && tr>0 ){
				//if( _MAXRECFULL ){
					DGI("BROWSE").rows[tr].style.display = 'none';
					if( _cDeslizante>0 && DGI("TablaTV").children.length>0 ) DGI("TablaTV").children[0].rows[tr].style.display = 'none';
					tr--;
					xy = S.xy(oCheck);
				//}else{	// esto es porque en IE7 al ocultar filas con colspan no se oculta el tr aunque sí los td
				//	DGI("BROWSE").deleteRow(_VisibleRows--);		//nodeRemove();
				//	if( _cDeslizante>0 && DGI("TablaTV").children.length>0 ) DGI("TablaTV").children[0].deleteRow(Desc--);		//nodeRemove();
				//}
			}

			trs = S("#BROWSE TR");
			while( trs.dim[tr].offsetHeight==0 ) tr--

			_VisibleRows = tr-AltoTH;
			if( _VisibleRows<=0 ){									// si puede como mínimo se muestra un registro
				_VisibleRows = 1;									// evita cuelges
				if( trs.dim.length>(_VisibleRows+AltoTH) ){
					trs.dim[_VisibleRows+AltoTH].style.display = "";
				}
			}

			//console.log("Mostrar 1: "+_VisibleRows+' Desde='+(AltoTH+1));
			max = Math.ceil(_TotalRec/_VisibleRows);											//max = Math.ceil(_TotalRec/(_VisibleRows-AltoTH));			//if( (_TotalRec%_VisibleRows)>0 ) max++;

			if( DGI('_Pie2')!=null ) DGI('_Pie2').textContent = max;
			DGI("HASTA").value = max;
			DGI("HASTA").setAttribute("TPAG", max);
			DGI('DESDE').value = 1;						// Pagina
			DGI('DESDE').setAttribute("OldValue", 0);
			DGI('DESDE')["OldValue"] = 0;

			if( nMaxRec!=null && nMaxRec.value=='' ) DGI('MAXREC').value = _VisibleRows;		//(_VisibleRows - AltoTH);

			DGI("BROWSE").setAttribute("vDesde", AltoTH+1);
			DGI("BROWSE").setAttribute("vHasta", _VisibleRows+AltoTH);	//AltoTH+1+_VisibleRows);

			if( DGI('oHASTA')!=null ){								//max = Math.ceil( _TotalRec / (_VisibleRows - AltoTH) );
				DGI("oHASTA").value = max;
				DGI("oHASTA").setAttribute("TPAG", max);
				DGI("oMAXREC").value = _VisibleRows;				//(_VisibleRows - AltoTH);
			}

			if( oPB.length ){		// PaginationBar
				PaginationBarCalc();
			}

			if( S(".CONTENEDORCARD").length ){
				S(".CONTENEDORCARD .card").each(function(k,o){
					if( k>=_VisibleRows ) o.style.display = "none";
				});
			}
			//console.log("0 DESDE = "+parseInt(DGI('DESDE')["OldValue"]));

		}
	}else{
		if( nMaxRec!=null && nMaxRec.value=='' ){
			DGI('MAXREC').value = _VisibleRows;								//(DGI("BROWSE").rows.length - 1 - AltoTH);
			if( DGI('oMAXREC')!=null ) DGI("oMAXREC").value = _VisibleRows;	//(DGI("BROWSE").rows.length - 1 - AltoTH);
			if( DGI('_Pie2')!=null ){
				max = Math.ceil(_TotalRec/_VisibleRows);					//max = Math.ceil( _TotalRec / (DGI("BROWSE").rows.length - 1 - AltoTH) );
				DGI('_Pie2').textContent = DGI("HASTA").value = max;
				DGI("HASTA").setAttribute("TPAG", max);
				if( DGI('oHASTA')!=null ){									//max = Math.ceil( _TotalRec / (DGI("BROWSE").rows.length - 1 - AltoTH) );
					DGI("oHASTA").value = max;
					DGI("oHASTA").setAttribute("TPAG", max);
				}
			}
		}else{
			if( DGI('MAXREC')!=null ){
				_VisibleRows = DGI('MAXREC').value*1;
				PaginationBarCalc();
			}
		}
	}

	//if( _MaxVisibleRows>0 && document.body.scrollWidth <= document.body.clientWidth && document.body.scrollHeight <= document.body.clientHeight ) document.body.scroll = 'no';		//setTimeout( "document.body.scroll='no';",1);
	CondicionesLeft();
}

var _iAncho = _iAlto = 0;			//. Ancho y Alto Inicial

function _DocHeight(){
    var d = document;
    return Math.max(d.body.scrollHeight, d.documentElement.scrollHeight, d.body.offsetHeight, d.documentElement.offsetHeight, d.body.clientHeight, d.documentElement.clientHeight);
}
function _DocWidth(){
    var d = document;
    return Math.max(d.body.scrollWidth, d.documentElement.scrollWidth, d.body.offsetWidth, d.documentElement.offsetWidth, d.body.clientWidth, d.documentElement.clientWidth);
}

function _Recalcula(Tipo, FijarY, nView){
	//if( top.__eSWCutOn ) return;
	//if( null!=DGI('TapaCARGANDO') ) TapaCARGANDO.style.display = 'none';
	//if( window.name=='FichaAux' ) return;						// ...ojo... window.name!='Visor'
	var n;
	if(_NOTITLE) PAGINA.style.padding = '0px 0px 0px 0px';
	//PAGINA.style.width = "";									//PAGINA.style.removeAttribute('width');

	if( S(window).windowIs() ){
		try{ if( _WinCaption ) document.body.style.backgroundImage=""; }catch(e){}

		//debugger; S(document.body).visible();

		if( S(window.frameElement).attr("eNORESIZE")!=undefined && S(window.frameElement).attr("eNORESIZE") ){
			S(document.body).visible();
			return;
		}

		if( _AutoSize[0]!=0 ){			//[WinList] Width, Height [, Scroll [, Title ]] 
			S(window).windowResize(_AutoSize[0], _AutoSize[1], true);
			if( _AutoSize[2] ) S("body").css("overflow:scroll");						//S("body").css("overflow:'auto'");
			if( _AutoSize[3]!="" ) S(window).windowCaption(_AutoSize[3]);
			S(document.body).visible();
			return;
		}else if( window.frameElement.getAttribute("_WIDTH") ){
			S(window).windowResize(window.frameElement.getAttribute("_WIDTH"), window.frameElement.getAttribute("_HEIGHT"), true);
			S(document.body).visible();
			return;
		}

		//var wh = S("#PAGINA").css("width,height");
		var obj = S("#PAGINA").obj,
			wh = {width:obj.scrollWidth, height:obj.scrollHeight};

		if( S(".PaginationBar").length ) wh["width"] = Math.max(wh["width"], S(".PaginationBar").obj.offsetWidth);

		//S(window).windowResize(document.body.scrollWidth, document.body.scrollHeight, true);
		S(window).windowResize(wh["width"], wh["height"], true);
		var s = S(document.body).scrollSet("#PAGINA"), ancho=0, alto=0, a;

		if(s.sw) alto = S.setup.scrollWidth;	//a = document.body.clientHeight; document.body.style.overflowX = "hidden"; a = document.body.clientHeight-a; document.body.style.overflowX = "scroll"; alto = a;
		if(s.sh) ancho = S.setup.scrollWidth;	//a = document.body.clientWidth; document.body.style.overflowY = "hidden"; a = document.body.clientWidth-a; document.body.style.overflowY = "scroll"; ancho = a;

		if( (ancho+alto)==0 ){
			S(document.body).visible();
			return;
		}
		ancho += 3;											// _DocHeight(); _DocWidth();

		/*
			if(s.sw){
				a = wh["height"];
				document.body.style.overflowX = "hidden";
				a = wh["height"]-a;
				document.body.style.overflowX = "auto";
				alto = a;
			}
			if(s.sh){
				a = wh["width"];
				document.body.style.overflowY = "hidden";
				a = wh["width"]-a;
				document.body.style.overflowY = "auto";
				ancho = a;
			}
		*/
		//S(window).windowResize(document.body.scrollWidth+ancho, document.body.scrollHeight+alto, true);
		//wh = S("#PAGINA").css("width,height");

		//var d = S("#PAGINA").css({width:1, height:1});
		//var d = S("#CONTENEDOR").css({width:"", height:""}), HGoogle=0, WGoogle=0;
		var d = S("#PAGINA").css({width:"", height:""}), HGoogle=0, WGoogle=0;		//2019-10-04
		if( S(".CHART_STORE").exists() ){											// si tiene los Chart de Google que calcula el alto y ancho
			HGoogle = S(".CHART_STORE").obj.offsetHeight+5;							//S(".CHART_STORE").obj.offsetTop+
			if( S(".CHART_STORE").obj.offsetWidth > d.obj.offsetWidth ) WGoogle = S(".CHART_STORE").obj.offsetWidth+5;
		}

		S(window).windowResize(d.obj.offsetWidth+WGoogle+ancho, d.obj.offsetHeight+5+HGoogle+alto, true);	// window.frameElement.name!="IWORK"
		//	.center();

		//S(window).windowResize(wh["width"]+ancho, wh["height"]+alto);
	}else if( window.name=="_SUBLISTADO" && _SUBLISTADO_ && _INSUBWIN_ && _WOPENER.frameElement.name!="IWORK" ){		// desde la ficha damos a dejar la ficha arriba y el listado debajo
		try{ 
			//S(S.toTag(_WOPENER.frameElement,"SPAN","*")).visible();
			_WOPENER.frameElement.contentWindow.document.body.getElementById("PAGINA").style.width = "100%";
			_WOPENER.frameElement.contentWindow.document.body.getElementById("PAGINA").style.height = "100%";
			//_WOPENER.frameElement.contentWindow.document.body.getElementById("_SUBLISTADO").style.width = "100%";	//(d.obj.offsetWidth+ancho)+"px";
			//_WOPENER.frameElement.contentWindow.document.body.getElementById("_SUBLISTADO").style.height = "100%";	//(d.obj.offsetHeight+5+alto+20)+"px";
		}catch(e){}
		S(S.toTag(_WOPENER.frameElement,"SPAN","*")).css({left:0, top:0});				///S(_WOPENER).goto(0,0);
		S(_WOPENER).windowResize("100%", "100%", 0, 0, false, true);	
	}else if( _WideListing>0 && S("#BROWSE").length && S("#BROWSE").obj.offsetWidth<S.screen(window).w*_WideListing/100 ){		// si el ancho del listado es mayor del 80% no lo pone al 80%
		S("#BROWSE, #CONTENEDOR").css("width:100%");
		S("#PAGINA").attr("eWith", _WideListing+"%");
		S("#PAGINA").css("width:"+_WideListing+"%");
	}

	S(document.body).scrollSet("#PAGINA");
	_CalcPaginacion();

	/*
	if( window.frameElement.name=="IWORK" ){
		S(document.body).scrollSet("#PAGINA");
	}else{
		var d = S("#PAGINA",window).css("width,height,margin-top,margin-right,margin-bottom,margin-left");
		S(window)
			.windowResize(d["width"]+d["margin-right"]+d["margin-left"], d["height"]+d["margin-top"]+d["margin-bottom"], window.frameElement.name!="IWORK")
			.center();
	}
	if( DGI("BROWSE").rows.length>DGI("BROWSE").getAttribute('AltoTH') ) TitulosON();		// Solo si hay filas en el listado se gestionan los titulos deslizantes
	return;
	*/
	// Solo si hay filas en el listado se gestionan los titulos deslizantes
	//if( DGI("BROWSE") && BROWSE.rows.length>1 && BROWSE.rows[1].cells[0]!=undefined ) document.body.onscroll = MovTitulos;						// TitulosON();		// Dentro de "Recalcula()"
	//try{ if( _WinCaption && top.eIsWindow(window) ) document.body.style.backgroundImage=""; }catch(e){}		//backgroundPosition = '-1024px';

	// Subventana
	//if( S(window.frameElement).attr("MODAL")!=undefined ){			//
	if( top.eIsWindow(window) ){		// Entra si es una subVentana
		var Alto = PAGINA.offsetHeight,
			Ancho = DGI("BROWSE").offsetWidth;					// var Ancho = PAGINA.offsetWidth;

		if( S(".PaginationBar").length ) Ancho = Math.max(Ancho, S(".PaginationBar").obj.offsetWidth);
		if( DGI('GRILL')!=null ) Ancho = Math.max(DGI('GRILL').offsetWidth, Ancho);
		if( !_NOTITLE ) Ancho += parseInt(S(PAGINA).css("paddingLeft"))+parseInt(S(PAGINA).css("paddingRight"));

		if( _AutoSize[3]!='' ) top.eSWSetCaption( window, _AutoSize[3] );

		//var swCreate = top._swCreate;
		//top._swCreate = false;
		top.eSWIResize(window, Ancho, Alto);
		//top._swCreate = swCreate;

		if( S(window.frameElement).attr("OX") ){
			if( FijarY ){
				top.eSWMove(window, window.frameElement.OX, window.frameElement.aY);
			}else{
				top.eSWMove(window, window.frameElement.OX, window.frameElement.OY);
			}
		}
		//_CalcPaginacion();

		Alto = document.body.scrollHeight;		//Alto = PAGINA.offsetHeight;
		Ancho = document.body.scrollWidth;		//Ancho = Math.max(document.body.scrollWidth, Ancho);		//Ancho = document.body.scrollWidth;		//Ancho = PAGINA.offsetWidth;

		for(n=0; n<2; n++){
			if( document.body.scrollWidth>document.body.clientWidth ){
				document.body.scroll = 'scroll';
				//if( !_NOTITLE ) Ancho += top._ScrollBar;													// Add 10-May-2012
				//Ancho += document.body.scrollWidth - document.body.clientWidth + 40;						//Ancho = document.body.offsetWidth + 40;
				Ancho = _DocWidth() + 17;
				//if( document.body.scroll=='auto' ) Ancho += 17;
				top.eSWIResize(window, Ancho, Alto);
				//top.eTron('3a');
			}else if( document.body.scrollWidth<document.body.clientWidth ){
				//Ancho = PAGINA.clientWidth;
				//Ancho = document.body.offsetWidth + 40;
				Ancho = _DocWidth();
				if( document.body.scroll=='scroll' ) Ancho += 17;
				top.eSWIResize(window, Ancho, Alto);
				//top.eTron('3b');
			}
			if( document.body.scrollHeight>document.body.clientHeight ){
				document.body.scroll = 'scroll';
				//if( !_NOTITLE ) Alto += top._ScrollBar;															// Add 10-May-2012
				//Alto = document.body.scrollHeight + (document.body.scrollHeight - document.body.clientHeight) + 40;
				Alto = _DocHeight() + 17;
				//if( document.body.scroll=='auto' ) Alto += 17;
				top.eSWIResize(window, Ancho, Alto);
				//top.eTron('3c');
				_CalcPaginacion();
			}else if( document.body.scrollHeight<document.body.clientHeight ){
				//Ancho = PAGINA.clientWidth;				//Alto = document.body.offsetHeight;
				//Alto = document.body.scrollHeight + (document.body.scrollHeight - document.body.clientHeight) + 40;
				Alto = _DocHeight();
				if( document.body.scroll=='scroll' ) Alto += 17;
				top.eSWIResize(window, Ancho, Alto);
				//top.eTron('3d');
				_CalcPaginacion();
			}
		}

		//if( DGI("BROWSE").rows.length>1 && DGI("BROWSE").rows[1].cells[0]!=undefined ) TitulosON();				// Solo si hay filas en el listado se gestionan los titulos deslizantes
		//ojo: 2018-04-10 - if( DGI("BROWSE").rows.length>DGI("BROWSE").getAttribute('AltoTH') ) TitulosON();		// Solo si hay filas en el listado se gestionan los titulos deslizantes
		//_CalcPaginacion();
		//top.eSWView(window);

		top.eSWLoading(window, 0);

	}else{
		//_CalcPaginacion();
		/*
		for( var n=0; n<2; n++ ){
			if( document.body.scrollHeight>document.body.clientHeight || document.body.scrollWidth>document.body.clientWidth ){
				document.body.scroll = 'auto';
				_CalcPaginacion();
			}
		}
		*/
		S(document.body).scrollSet("#PAGINA");

		//if( DGI("BROWSE").rows.length>1 && DGI("BROWSE").rows[1].cells[0]!=undefined ) TitulosON();		// Solo si hay filas en el listado se gestionan los titulos deslizantes
		// ¿? if( DGI("BROWSE").rows.length>DGI("BROWSE").getAttribute('AltoTH') ) TitulosON();		// Solo si hay filas en el listado se gestionan los titulos deslizantes

		if( S(window.frameElement).attr("eNORESIZE")!=null ){		//if( window.frameElement.eNORESIZE!=undefined && window.frameElement.eNORESIZE ){
			if( window.name=='_SUBLISTADO' ){						// ReBuscar
				// IgualaColorFondo
				/*
				var txt = S(document.body).css("filter");
				if( txt.indexOf('startcolorstr')>-1 && txt.indexOf('endcolorstr')>-1 ){
					var iColor = txt.substr(txt.indexOf('startcolorstr')+14,7),
						fColor = txt.substr(txt.indexOf('endcolorstr')+12,7);
					parent.document.body.style.filter = txt.replace(fColor,iColor);
				}
				*/
				//_WOPENER.eDisableButton(0);
				top.eLoading(0, window.parent);

			}else if( window.name=="_ISUBLIST" ){

				//S(document.body).visible();

				PAGINA.style.paddingLeft = PAGINA.style.paddingRight = "0px";
				var nTab = S(window.frameElement).attr("nTAB"),
					h = _WOPENER.DGI('TABNumber'+nTab).offsetHeight,
					Est1 = _WOPENER.DGI('TABNumber1').style.display,
					Est2 = _WOPENER.DGI('TABNumber'+nTab).style.display;

				//if( window.frameElement.nTAB>1 ) 
				_WOPENER.DGI('TABNumber'+nTab).style.display = '';	//block

				if( window.frameElement.getAttribute("eFixWidth")!=null ){
					window.frameElement.style.width = window.frameElement.getAttribute("eFixWidth");
				}else if( _WISubList<0 ){
					window.frameElement.style.width = px(DGI("BROWSE").offsetWidth);
					if( document.body.scrollWidth>document.body.clientWidth ){
						window.frameElement.style.width = px(DGI("BROWSE").offsetWidth+20);
					}
				}

				if( DGI("ToolsPaginate")!=null ) _HISubList = DGI("PAGINA").offsetHeight;

				if( /R/i.test(_HISubList) ){							//_HISubList = "10R"
					_HISubList = _HISubList.replace(/R/i,"")*1;
					var tr = DGI("BROWSE").rows;
					if( tr.length>_HISubList ){
						_HISubList = tr[_HISubList].offsetTop+DGI("BROWSE").offsetTop + tr[_HISubList].offsetHeight;
					}else{
						_HISubList = (tr[0].offsetHeight*_HISubList)+DGI("BROWSE").offsetTop+_HISubList+1;
					}
				}

				if( _HISubList<0 ){
					h = DGI("BROWSE").offsetHeight + DGI("BROWSE").offsetTop + top.eXY(BROWSE)[1] + 2;
					if( DGI("ToolsPaginate") ) h += DGI("ToolsPaginate").offsetHeight;
					if( window.frameElement.getAttribute("eFixHeight")==null ){
						window.frameElement.style.height = px(h);							//px(DGI("BROWSE").offsetHeight + DGI("BROWSE").offsetTop + top.eXY(BROWSE)[1]+2+((DGI("ToolsPaginate"))? DGI("ToolsPaginate").offsetHeight: 0));
					}else{
						window.frameElement.style.height = window.frameElement.getAttribute("eFixHeight");
					}
					setTimeout(function(){
						if( document.body.scrollWidth>document.body.clientWidth && window.frameElement.getAttribute("eFixWidth")==null ){
							window.frameElement.style.width = px(DGI("BROWSE").offsetWidth+20);
						}
					}, 1);
				}else if( _HISubList>0 ){
					if( window.frameElement.getAttribute("eFixHeight")==null ){
						window.frameElement.style.height = px(_HISubList);							//px(DGI("BROWSE").offsetHeight + DGI("BROWSE").offsetTop + top.eXY(BROWSE)[1]+2+((DGI("ToolsPaginate"))? DGI("ToolsPaginate").offsetHeight: 0));
						var d = S("body").scrollSet(S("#BROWSE").obj);								//var d = S(window.frameElement.contentWindow.document.body).scrollSet(S("#BROWSE").obj);		//{sw: true, sh: true}
						if( d.sw ){
							d = S.screen(window);													//d = S.screen(window.frameElement.contentWindow.document.body);
							window.frameElement.style.height = (_HISubList+d.ch-d.oh)+"px";
						}
					}else{
						window.frameElement.style.height = window.frameElement.getAttribute("eFixHeight");
					}
					setTimeout(function(){
						if( document.body.scrollWidth>document.body.clientWidth && window.frameElement.getAttribute("eFixWidth")==null ){
							window.frameElement.style.width = px(DGI("BROWSE").offsetWidth+20);
						}
					}, 1);
				}


				if( _WISubList<0 && _HISubList<0 ){
					window.document.body.style.overflowX = 'hidden';
					if( top.eIsWindow(_WOPENER) && _WOPENER.frameElement.getAttribute("_WIDTH") ) top.eSWIResize(_WOPENER,0);
				}
				if( DGI("BROWSE").offsetHeight<=document.body.clientHeight ){
					window.document.body.style.overflowY = 'hidden';
				}else if( DGI("BROWSE").offsetHeight>document.body.clientHeight ){
					window.document.body.style.overflowY = 'scroll';
				}

				/*
				with( _WOPENER.DGI("TABContainer").style ){
					removeAttribute('position');
					removeAttribute('left');
					removeAttribute('top');
					width = "1px";
					height= "1px";
				}
				*/
				S("#TABContainer",_WOPENER).css({
					position:"",
					left:"",
					top:"",
					width:1,
					height:1
				});

				if( Tipo==1 ) _WOPENER.Recalcula(1,FijarY);				// Al dar altas en las {ISubList}
				_WOPENER.ISubListCargada(window);

				_WOPENER.DGI('TABNumber1').style.display = Est1;
				_WOPENER.DGI('TABNumber'+nTab).style.display = Est2;

				//setTimeout(function(){
				//var w = S(document.body).scrollSet("#PAGINA");
				//document.body.style.overflowY = "hidden";
				//S("#TITULO").text("ddd");
				//document.body.style.overflowY = "scroll";
				//document.body.scrollTop = 2;
				//document.body.scrollTop = 1000;

				//document.documentElement.scrollTop = 10;
				//document.documentElement.scrollTop = 0;
				//},2000);

				if( _WOPENER.DGI('TABGroupInner')!=null ){				// GDF
					with( _WOPENER.DGI('TABGroupInner').style ){
						height = "1px";
						height = px(_WOPENER.DGI('TABBorder').offsetHeight-4);
					}
				}
			}
			window.focus();
		}
	}

	// Pone un grupo de columnas con el mismo ancho
	if( typeof(_ColsWidthJs)!='undefined' && DGI('BROWSE').eCols<35 ){
		var tmp = _ColsWidthJs.split(','), Max=0, nc, a;
		for(n=0; n<tmp.length; n++) Max = Math.max( Max, DGI('BROWSE').children[0].children[eGCol(tmp[n])].offsetWidth );
		var aAncho = parseInt(DGI('BROWSE').offsetWidth);
		for(n=0; n<tmp.length; n++){
			nc = eGCol(tmp[n]);
			a = parseInt(DGI('BROWSE').children[0].children[nc].offsetWidth);
			if( a>0 ){	// Solo en columnas visibles
				aAncho += (Max-a);
				DGI('BROWSE').children[0].children[nc].style.width = px(Max);
			}
		}
		DGI('BROWSE').style.width = px(aAncho);
		_RecalcSlideTH();
		if( window.frameElement.MODAL!=undefined ){
		   	_ColsWidthJs = undefined;
			_Recalcula(Tipo);
			return;
		}
	}

	if( typeof(nView)!="undefined" && typeof(_VIEWCSS)!="undefined" ){
		eViewCSS(_eViewCSS);			//S("#BROWSE").class(_VIEWCSS[nView]);
	}

	S(document.body).visible();
	S(document.body).scrollSet("#PAGINA");
	if( window.name=="_SUBLISTADO" && _SUBLISTADO_ && _INSUBWIN_ && _WOPENER.frameElement.name!="IWORK" ){		// desde la ficha damos a dejar la ficha arriba y el listado debajo en una subventana
		S(S.toTag(_WOPENER.frameElement,"SPAN","*")).visible();
	}

	eLoading(0);
}

/*
	function _setup(){													//echo ' onmousedown=S(this).class("+Click") onmouseout=S(this).class("-Click") onmouseup=S(this).class("-Click")';
		S(".AddButton").each(function(k,o){
			o.onmousedown = function(){S(this).class("+Click")}
			o.onmouseout = function(){S(this).class("-Click")}
			o.onmouseup = function(){S(this).class("-Click")}
		});
	}
*/

var _iniCalculator = false;
function Recalcula(n, FijarY){
	if( !_iniCalculator ){
		_iniCalculator = true;
		S(document.body)
			.on("keypress", _Calculator)
			.on("keydown", _Calculator)
			.on("mouseover", _CalculatorMem);
	}

	if( _DefaultOffset!="" ){
		S(window).rule(".BROWSE TH, .BROWSE TD { padding:"+_DefaultOffset+"px; }");
	}

	/*
	if( typeof(_NoRecalcList)!="undefined" ){
		S("#PAGINA").css("width:100%;height:100%;");
		S("BODY").visibility();
		return;
	}
	*/

	if( S("#BROWSE TBODY TR").length<2 ){	// si hay mas de un registro se podrá ordenar y filtrar
		S(window).rule("-th[oncontextmenu], td[oncontextmenu]");										//S(window).rule("th[oncontextmenu], td[oncontextmenu]", "{ cursor:default; animation-play-state: paused; }");
		S("#BROWSE").obj.oncontextmenu = null;															//S("#BROWSE[oncontextmenu]").on("contextmenu");		//S("TH[oncontextmenu]").on("contextmenu");
		S("#BROWSE THEAD TH").css("cursor:default");
		//S(window).rule("th[oncontextmenu], td[oncontextmenu]", "{ cursor:default; animation-play-state: paused; }");
		//S(window).rule("th[oncontextmenu], td[oncontextmenu]", "{ animation:stopFrames 1.5s infinite; -webkit-animation: stopFrames 1.5s infinite; }");
	}

	try{
		_WOPENER.eHideBusy();
	}catch(e){}

	//PAGINA.style.width = "";
	//CONTENEDOR.style.width = "";
	//BROWSE.style.width = "";

	if( typeof(_VIEWCSS)!="undefined" ){
		var n,max=0, p=-1;
		for(n=0; n<_VIEWCSS.length; n++){
			S("#BROWSE").class(_VIEWCSS[n]);
			if( S("#BROWSE").obj.offsetWidth > max ){					//max = Math.max(max, S("#BROWSE").obj.offsetWidth)
				max = S("#BROWSE").obj.offsetWidth;
				p = n;
			}
		}
		var k = _eViewCSS;
		eViewCSS(p);
		_eViewCSS = k;
	}

	//MovTitulos();

	//CONTENEDOR.style.width = px(DGI("BROWSE").offsetWidth);
	if( FijarY==undefined ) FijarY = false;
	//S("#BROWSE").scroll();

	setTimeout(function(){
		_Recalcula(n, (FijarY ? 1:0), p);

		var o = S(".MENUFOOTLIST");								// si tiene la etiqueta [OptionsInList] chequea el ancho del menú
		if( o.length ){
			var a = document.body.clientWidth;
			if(a==1) a = window.frameElement.offsetWidth;
			if( a<o.obj.offsetWidth ){
				S("#MenuFootRight").block();					// MenuFootLeft
			}
		}
		if( S(".ButtonMultiple").length ){					// [ChangeFilter] Calcula tamaño
			S(".ButtonMultiple").css({width: S("#BROWSE").obj.offsetWidth});
			S(".ButtonMultiple SPAN").css({width: S("#BROWSE").obj.offsetWidth-(S(".ButtonMultiple").obj.rows[0].cells[0].offsetWidth*2)});
		}

		if( S("TABLE[class=BODYLIST").length ){
			S('#ToolsPaginate').none();
			S("I").each(function(k,o){									//console.log(k+": "+o.innerText+" : "+o.outerHTML) 
				if( o.innerHTML=="(" ) S(S.toTag(o,"TR")).none();
			});
			document.body.onkeydown = null;
			document.body.onmousewheel = null;
		}

		_3CXClear();		// quita 3CX si lo tiene

		/*
		// coloca las lTools
		if( S("#UtilListICO").exists() ){			// window.frameElement.className=="ISubList"
			var c = S.screen(window),
				o = S.toTag(S("#UtilListICO").obj,"TABLE");
			S(o).css("left:"+(c.ow-o.offsetWidth+2));					//ojo: está alineado con "right" - S(S.toTag(S("#UtilListICO").obj,"TABLE")).css("right:"+(S("#UtilListICO").obj.offsetWidth+c.w-c.sw+2));
		}
		*/

		// al paginar en el cliente, si está al final en una pagina que tiene mas filas de las que caben en la pantalla y das a la última página y hay muy poquitas para que se vean los registros
			var d = S.screen(window);
			if( d.h<d.y ) S.scrollSet(document.body, 0);

		// hace falta porque no consigo justificarlo a la derecha con el css
		//	if( S(".ToolsTDDCH").length ) S(".ToolsTDDCH").css("width:auto");
		//	if( S(".ToolsTDDCH").length ) S(".ToolsTDDCH").css("width:100%");

	}, 250);															//setTimeout('_Recalcula('+n+','+((FijarY)?1:0)+');',250);

	_GetNumCol();
}

/*
function __MovTH(){
	setTimeout(function(){
		// Solo si hay filas en el listado se gestionan los titulos deslizantes
		if( DGI("BROWSE") && BROWSE.rows.length>1 && BROWSE.rows[1].cells[0]!=undefined ) document.body.onscroll = MovTitulos;						// TitulosON();		// Dentro de "Recalcula()"
	},5000);
}
*/

/*
function eActiveWindow( tf ){		// true=Normal, false=Desactivado
	if( (typeof _GsStyleON)!='undefined' || window.name=="_ISUBLIST" ) return;
	//_eShadowShow( document.body, tf );
	top.eActiveWindow( window, tf );
	for( var n=0; n<frames.length; n++ ) try{ 
		frames[n].eActiveWindow(tf); 
	}catch(e){
		if( frames[n].frameElement.IFrameSys!=undefined ) continue;
		//_eShadowShow( frames[n].document.body, tf );
		top.eActiveWindow( frames[n], tf );
	}
}
*/


var _EdEditList = false, _DimPapel = new Array(), _DimColor = new Array();			// Se está editando un [EditList]
/*
var _DimAddCursor = new Array(), _nAddCursor=0;
function eNumberCursor(){				//  oncontextmenu='eNumberCursor()'
	_DimAddCursor = new Array();
	switch( _nAddCursor ){
		case 0:
			_DimAddCursor[_DimAddCursor.length] = 3;
			break;
		case 1:
			_DimAddCursor[_DimAddCursor.length] = 4;
			break;
		case 2:
			_DimAddCursor[_DimAddCursor.length] = 6;
			break;
		case 3:
			_DimAddCursor[_DimAddCursor.length] = 12;
			break;
		default:
			_nAddCursor = -1;
	}
	_nAddCursor++;
	return eClearEvent();
}
*/

//--------------------
// FILA de otro Color		_oCalculator
//--------------------

/*
function FilaOn( xObj ){
	var Obj = ( xObj==undefined ) ? S.event(window) : xObj;
	if( Obj==undefined ) return;
	if( Obj.tagName=='DIV' ) Obj = Obj.parentNode;
	if( Obj.tagName=='SPAN' ) Obj = Obj.parentNode;
	if( Obj.tagName=='IMG' ) Obj = Obj.parentNode;
	if( Obj.tagName=='TD' ){
		if( Obj.id=='CNT' ) Obj = S.toTag(Obj,'TD');		// En los listados se con textarea se mete la informacion dentro de un TD con su tabla
		if( Obj.id=='NO' ) return;
		_oCalculator = Obj;
		Obj = Obj.parentNode;
		if( Obj.className=='PieLista' || Obj.className=='PieListaGraf' ) return;
		_EdEditList = true;
		Obj._cN = Obj.className;
		var n,Des=0;
		for( n=0; n<Obj.cells.length; n++ ){
			_DimPapel[n] = Obj.cells[n].style.backgroundColor;
			_DimColor[n] = Obj.cells[n].style.color;
			with( Obj.cells[n].style ){
				backgroundColor = _PapelOn;
				color = _LapizOn;
			}
		}

		try{
			n = S("#BROWSE.AltoTH")*1;
			if( _MAXRECFULL ){
				var MaxRec = DGI('MAXREC').value*1;
				var Desde = DGI('DESDE').value*1;
				Des = (Desde-1)*MaxRec;
			}

			if( TablaTV.contains(Obj) ){
				var p = Obj.rowIndex+1+n+Des, i;
				var el = DGI("BROWSE").rows[p].cells;
				DGI("BROWSE").rows[p]._cN = DGI("BROWSE").rows[p].className;
				for( i=0; i<el.length; i++ ){
					_DimPapel[i] = el[i].style.backgroundColor;
					_DimColor[i] = el[i].style.color;
					with( el[i].style ){
						background = _PapelOn;
						color = _LapizOn;
					}
				}
			}else if( TablaTV.children[0]!=null ){							//alert(DGI('TablaTV').tagName); alert(DGI('TablaTV').children[0].tagName);
				var p = Obj.rowIndex-1-n-Des, i;
				var el = TablaTV.children[0].rows[p].cells;
				DGI("BROWSE").rows[p]._cN = DGI("BROWSE").rows[p].className;
				for( i=0; i<el.length; i++ ){
					_DimPapel[i] = el[i].style.backgroundColor;
					_DimColor[i] = el[i].style.color;
					with( el[i].style ){
						background = _PapelOn;
						color = _LapizOn;
					}
				}
			}
		}catch(e){}
	}
}

function FilaOff( xObj ){
	var Obj = ( xObj==undefined ) ? S.event(window) : xObj;
	if( Obj==undefined ) return;
	if( Obj.tagName=='DIV' ) Obj = Obj.parentNode;
	if( Obj.tagName=='SPAN' ) Obj = Obj.parentNode;
	if( Obj.tagName=='IMG' ) Obj = Obj.parentNode;
	if( Obj.tagName=='TD' ){
		_oCalculator = null;
		if( Obj.id=='CNT' ) Obj = S.toTag(Obj,'TD');		// En los listados se con textarea se mete la informacion dentro de un TD con su tabla
		if( Obj.id=='NO' ) return;
		if( Obj.eCheck!=undefined ){
			DGI('Sel_TrueFalse').style.display = 'none';
			document.onkeypress = '';
			document.onkeydown = '';
			_CellEdit.className = '';
		}
		Obj = Obj.parentNode;
		if( Obj.className=='PieLista' || Obj.className=='PieListaGraf' ) return;
		_EdEditList = false;
		Obj.className = Obj._cN;
		Obj.removeAttribute('_cN');
		var oc = Obj.cells,n;
		for( n=0; n<oc.length; n++ ) with( oc[n].style ){
			backgroundColor = _DimPapel[n];							//backgroundColor = '';	//_DimPapel[n];
			color = _DimColor[n];									//color = '';			//_DimColor[n];
		}
		try{
			var Des=0;
			if( _MAXRECFULL ){
				var MaxRec = DGI('MAXREC').value*1;
				var Desde = DGI('DESDE').value*1;
				Des = (Desde-1)*MaxRec;
			}

			var n = S("#BROWSE.AltoTH")*1;
			if( TablaTV.contains(Obj) ){
				var p = Obj.rowIndex+1+n+Des, i;
				var el = DGI("BROWSE").rows[p].cells;
				DGI("BROWSE").rows[p].className = DGI("BROWSE").rows[p]._cN;
				DGI("BROWSE").rows[p].removeAttribute('_cN');
				for( i=0; i<el.length; i++ ) with( el[i].style ){
					backgroundColor = _DimPapel[i];							//backgroundColor = '';		//_DimPapel[i];
					color = _DimColor[i];									//color = '';				//_DimColor[i];
				}
			}else if( TablaTV.children[0]!=null ){
				var p = Obj.rowIndex-1-n-Des, i;
				var el = TablaTV.children[0].rows[p].cells;
				DGI("BROWSE").rows[p].className = DGI("BROWSE").rows[p]._cN;
				DGI("BROWSE").rows[p].removeAttribute('_cN');
				for( i=0; i<el.length; i++ ) with( el[i].style ){
					backgroundColor = _DimPapel[i];							//backgroundColor = '';		// _DimPapel[i];
					color = _DimColor[i];									//color = '';				// _DimColor[i];
				}
			}
		}catch(e){}
	}
}
*/


//-------------------------------------------
// [#].Pone otro color a la ultima linea [#]
//-------------------------------------------
function ColorFilaTotales(){
	var el = DGI("BROWSE");
	var tRows = el.rows.length-1;
	//for( var n=0; n<el.rows[tRows].cells.length; n++ ) el.rows[tRows].cells[n].className = 'PieLista';
	el.rows[tRows].className = 'PieLista';
}

//-----------------//
// MENU UTILIDADES //
//-----------------//
/*
	function _xLIco(o){
		var a = (o==undefined) ? DGI("UtilListICO").offsetWidth : o.offsetWidth;
		var n = 0;
		try{ n = document.body.clientWidth+document.body.scrollLeft-a-3; }catch(e){}			//try{ n = document.body.scrollRight+30; }catch(e){}
		return n;
	}
	function _yLIco(){
		var n = 0;
		try{ n = document.body.scrollTop+3; }catch(e){}
		return n;
	}
	function _xLMenu(){
		var n = 0;
		try{ n = document.body.clientWidth+document.body.scrollLeft-DGI("UtilList").offsetWidth-4-DGI("UtilListICO").width; }catch(e){}
		return n;
	}
	function _yLMenu(){
		var n = 0;
		try{ n = document.body.scrollTop+3; }catch(e){}
		return n;
	}
*/

function uMenuLTools(Obj){				// SUBMENU ejecutado desde el Caption de la Subventana (icono menu)
	var n;
	if( S(window).windowIs() ){
		for(n=0; n<_LToolsIcons.length; n++){
			if( _LToolsIcons[n]!=null ){
				if( _LToolsIcons[n][2]=="CARD" ) delete _LToolsIcons[n];
				if( /^(E|A)$/.test(_LToolsIcons[n][1]) ) _LToolsIcons[n][1] = _INSUBWIN_ ? "E":"A";
			}
		}
	}else{
		for(n=0; n<_LToolsIcons.length; n++){
			if( _LToolsIcons[n]!=null ){
				if( /(>E<|>A<)/.test(_LToolsIcons[n][1]) ) _LToolsIcons[n][1] = _INSUBWIN_ ? "<i class='ICONOPTION'>E</i>":"<i class='ICONOPTION'>A</i>";
				if( /^(E|A)$/.test(_LToolsIcons[n][1]) ) _LToolsIcons[n][1] = _INSUBWIN_ ? "E":"A";
			}
		}
	}
	S(Obj||S.event(window)).menu(_LToolsIcons, {hide:true, function:_uMenuLTools, oncontextmenu:__MenuLTools, out:S("#UtilListICO").attr("out")});
	S("#UtilListICO").attr("out",false);
}

function eShowLTools(Modo, ini){	// (>FJ<) ini: se carga en el inicio
	var op;
	if( !top.eReadyState(window) ){
		//if( Modo==undefined ) setTimeout('eShowLTools()',250);
		//else setTimeout('eShowLTools("'+Modo+'")',250);
		setTimeout(function(){
			if( ini!=undefined ) eShowLTools(Modo, ini);
			else if( Modo==undefined ) eShowLTools();
			else eShowLTools(Modo, ini);
		}, 250);
		return( (event==null) ? '' : S.eventClear(window) );
	}
	if( DGI("BROWSE").rows.length-parseInt(S("#BROWSE.AltoTH"))-1 <= 0 ){
		top.eInfo(window,eLng(100));		//i:100|No hay registros
		return S.eventClear(window);		//eClearEvent();
	}
	//if( ok ){			//
	//if( eShowLTools.arguments.length==0 ){
	if( Modo==undefined ){	//eShowLTools.arguments.length==0 ){
		if( window.name=="_ISUBLIST" ) if( DGI('UtilList')!=null ) DGI("UtilList").onmouseleave = function anomymous(){ this.style.display='none'; }
		if( DGI('UtilListICO')!=null ){
			op = _INSUBWIN_ ? "1":"0";
			recorreDim(_LToolsIcons);
			uMenuLTools(DGI('UtilListICO'));								// se recoloque el eMenu
		}
		//DGI('t'+'SubMenu_'+(top._eMenu-1)).style.display = 'none';	// Oculta la tapa Modal del eMenu
	}else if( DGI('SubVentana')!=null ){
		//_INSUBWIN_ = new RegExp(S.upper(Modo+"")).test("2W");							//1/c.- Selección en la ventana actual / 2/w.- Selección en una subventana
		_INSUBWIN_ = /^(2|W)$/i.test(Modo);
		op = _INSUBWIN_ ? "1":"0";
		recorreDim(_LToolsIcons);
		setTimeout(function(){
			if( S("tr[earg='ModoSub'] i").length ){
				S("tr[earg='ModoSub'] i").text(_INSUBWIN_ ? "E":"A");
			}
		},1);

		/*
		var oModo = SubVentana.src.substr(SubVentana.src.indexOf('.gif')-1,1);
		if( Modo>2 ) Modo = 2;
		if( Modo<1 ) Modo = 3;
		SubVentana.src = SubVentana.src.replace('_'+oModo,'_'+(Modo-1));
		S(SubVentana).eventFire("click");															//ModoSubVentana();
		*/
	}

	//_INSUBWIN_ = (op==1);
	function recorreDim(dim){
		for(var n=0; n<dim.length; n++){
			if( typeof(dim[n])=="object" ){
				recorreDim(dim[n]);
			}else if( n==2 && /^(Mode0|Mode1)$/.test(dim[2]) ){
				dim[5] = (dim[2]!="Mode"+op) ? "class=ICONOFF":"";		//["Selección en una subventana", "E", "Mode1", "", "", "class=ICONOFF"]
				if( /^\<i /i.test(dim[1]) ){
					dim[1] = S.replace(dim[1],  [[" ICONOFF",""]]);
					if( dim[2]!="Mode"+op ){
						dim[1] = S.replace(dim[1],  [["ICONOPTION","ICONOPTION ICONOFF"]]);
						dim[1] = S.replace(dim[1],  [["ICONMENU","ICONMENU ICONOFF"]]);
					}
				}
			}else if( n==1 && dim.length>2 && typeof(dim[2])=="object" ){
				if( /^(E|A)$/.test(dim[1]) ){
					dim[1] = _INSUBWIN_ ? "E":"A";
				}else if( /(>E<|>A<)/.test(dim[1]) ){
					dim[1] = _INSUBWIN_ ? "<i class='ICONOPTION'>E</i>":"<i class='ICONOPTION'>A</i>";
				}
			}
		}
	}

	return( (event==null) ? '': S.eventClear(window) );
}
function ShowLTools(m){ return eShowLTools(m); }			// OLD

//--------
// BUSCAR
//--------

function aBuscar(txt){
	var n = S.eventCode(event);
	if( n==13 || n==9 ){
		_tSeek=-1;
		Buscar(txt,0);				//Buscar(BUSCAR.value,0);
		return eClearEvent();
	}
	if( DGI("BUSCAR").value.length>0 ){
		if( n==38 || n==37 ) Buscar(DGI("BUSCAR").value,-1);	// Arriba / izquierda
		if( n==40 || n==39 ) Buscar(DGI("BUSCAR").value,1);		// Abajo / derecha
	}
	switch( n ){
		case 36:
			if( !_PagIncremental ) Paginar('I');
			break;
		case 33:
			if( !_PagIncremental ) Paginar('<');
			break;
		case 34:
			if( !_PagIncremental ) Paginar('>');
			break;
		case 35:
			if( !_PagIncremental ) Paginar('F');
			break;
	}
}

function eBuscarFoco(){		// Se ejecuta al paginar (linea 8062)
	setTimeout('DGI("BUSCAR").focus();', 500);
}

function _VerLoBuscado(o, f, c, sTxt){
	function marcarText(o, sTxt){			// marca la palabra a buscar
		sTxt = document.body.innerHTML.match(new RegExp(sTxt, "gi"))[0];
		o.innerHTML = o.innerHTML.replace(new RegExp(sTxt, "gi"),'<mark>'+sTxt+'</mark>');
		setTimeout(function(){
			o.innerHTML = o.innerHTML.replace(new RegExp("(<mark>|</mark>)", "gi"),'');
		},500);
	}
 
	if( _MAXRECFULL && DGI('MAXREC')!=null ){
		var MaxRec = DGI('MAXREC').value*1,
			Desde = DGI('DESDE').value*1,
			Ini = ((Desde-1)*MaxRec),
			Fin = Ini+MaxRec;
		if( f<Ini || f>Fin ){																//alert( f+', '+Ini+' > '+Fin+'\n'+Math.ceil(f/MaxRec) );
			DGI('DESDE').value = Math.ceil(f/MaxRec);
			_PaginarFull('?');
		}
	}

	o = DGI("BROWSE").rows[f].cells[c];
	o.className = "SEEK";
	marcarText(o, sTxt);

	S("#BROWSE").obj["SeekFC"] = f+','+c;
	S("#BROWSE").obj["SeekCursor"] = o;

	if( _cDeslizante>0 && c<_cDeslizante ){											// && TablaTV.style.display!='none'
		S("#BROWSE").obj["SeekCursor2"] = TablaTV.children[0].rows[f-parseInt(S("#BROWSE.AltoTH"))-1].cells[c];
		S("#BROWSE").obj["SeekCursor2"].className = "SEEK";
		marcarText(S("#BROWSE").obj["SeekCursor2"], sTxt);
	}

	var xy = eXY(o),
		scroll = S.scrollGet(window),
		sc = S.screen(window);

	if( (scroll.scrollTop+DGI('TablaTH').offsetHeight)>xy[1] ){
		S.scrollSet(document.body, {top:xy[1]-(sc.ch/2)});
	}else if( !((xy[1]+xy[3])>scroll.scrollTop && (xy[1]+xy[3])<(scroll.scrollTop+sc.ch)) ){														//scroll.scrollTop = (xy[1]<document.body.clientHeight) ? 0 : xy[1]-(document.body.clientHeight/2);
		S.scrollSet(document.body, {top:(xy[1]<sc.ch) ? 0 : xy[1]-(sc.ch/2)});																		//left:scroll.scrollLeft, 
	}else if( DGI('TablaTH').offsetHeight>0 ){																										//if( DGI('TablaTH').offsetHeight+scroll.scrollTop>xy[1] ) document.body.scrollTop -= DGI('TablaTH').offsetHeight;
		if( (DGI('TablaTH').offsetHeight+scroll.scrollTop)>xy[1] ) S.scrollSet(document.body, {top:-DGI('TablaTH').offsetHeight});					//if( DGI('TablaTH').offsetHeight+scroll.scrollTop>xy[1] ) S.scrollSet(document.body, {left:scroll.scrollLeft, top:-DGI('TablaTH').offsetHeight});
	}

	//if( !(xy[0]>scroll.scrollLeft && xy[0]<scroll.scrollLeft+document.body.clientWidth) ){
	if( !((xy[0]+xy[2])>scroll.scrollLeft && (xy[0]+xy[2])<(scroll.scrollLeft+sc.cw)) ){																	//document.body.scrollLeft = (xy[0]<document.body.clientWidth) ? 0 : xy[0]-(document.body.clientWidth/2);
		S.scrollSet(document.body, {left:(xy[0]<sc.cw) ? 0 : xy[0]-(sc.cw/2)});																		//	S.scrollSet(document.body, {left:(xy[0]<sc.cw) ? 0 : xy[0]-(sc.cw/2), top:scroll.scrollTop});
	}else if( DGI('TablaTV').offsetWidth>0 ){																										//if( DGI('TablaTV').offsetWidth+scroll.scrollLeft>xy[0] ) document.body.scrollLeft = xy[0] - DGI('TablaTV').offsetWidth;
		if( (DGI('TablaTV').offsetWidth+scroll.scrollLeft)>(xy[0]+xy[2]) ) S.scrollSet(document.body, {left:xy[0] - DGI('TablaTV').offsetWidth});	//	if( DGI('TablaTV').offsetWidth+scroll.scrollLeft>xy[0] ) S.scrollSet(document.body, {left:xy[0] - DGI('TablaTV').offsetWidth, top:scroll.scrollTop});
	}
	//setTimeout('BuscarOff()',500);
	return;
}


//var _SeekColor = '';

function Buscar(txt, n){							// n=0 El primero, n=1 El siguiente, n=-1 El siguiente Hacias atras
	var sTxt = txt;
	//if( _SeekColor=='' ){
	//	_SeekColor = top.eGetCss( window, '.SeekInfo', 'filter' );
	//	if( _SeekColor=='' ) _SeekColor = 'progid:dximagetransform.microsoft.gradient(gradienttype=0,startcolorstr=#FACACA, endcolorstr=#ff0000)';
	//}
	try{
		S("#BROWSE").obj["SeekCursor"].className = "";
		S("#BROWSE").obj["SeekCursor2"].className = "";
	}catch(e){}

	try{
		if( event!=null && event.type=="contextmenu" ) txt = "^"+txt+"$";							//keypress / click / contextmenu
		eClearEvent();
		var Patron = new RegExp(txt.toUpperCase(), 'i');
	}catch(e){
		return eClearEvent();
	}

	var fi=parseInt(S("#BROWSE.AltoTH"))+1, ci=0, p=0, o;		// Fila Inicial
	if( n==-1 ){
		fi=DGI("BROWSE").rows.length-1;
		ci=DGI("BROWSE").rows[fi].cells.length-1;
	}

	if( S("#BROWSE").obj["SeekFC"]!=null && (n==1 || n==-1) ){
		var tmp = S("#BROWSE").obj["SeekFC"].split(',');
		fi = parseInt(tmp[0]);
		ci = tmp[1];
		p = 1;
	}

	var CheckCol = new Array(),c=0;
	for(f=0; f<DGI("BROWSE").children[0].children.length; f++){
		if( DGI("BROWSE").children[0].children[f].tagName=='COL' ){
			CheckCol[c++] = (DGI("BROWSE").children[0].children[f].style.display!='none');
		}
	}

	var c,f,sp=p,xy,cd=false;	// ColumnaDeslizante
	if( n>=0 ){					// Hacia adelante
		for(f=fi; f<DGI("BROWSE").rows.length; f++){
			for(c=ci; c<DGI("BROWSE").rows[f].cells.length; c++){
				if( CheckCol[c] && Patron.test(DGI("BROWSE").rows[f].cells[c].textContent.replace(/\s+$/g,'')) && DGI("BROWSE").rows[f].offsetHeight>0 ){										//if( Patron.test( DGI("BROWSE").rows[f].cells[c].textContent.toUpperCase() ) ){
					if( p<1 ){
						_VerLoBuscado(DGI("BROWSE").rows[f].cells[c], f, c, sTxt);
						return;
					}
					p--;
				}
			}
			ci = 0;
		}
	}else{						// Hacia atras
		for(f=fi; f>parseInt(S("#BROWSE.AltoTH")); f--){
			for(c=ci; c>=0; c--){
				if( CheckCol[c] && Patron.test(DGI("BROWSE").rows[f].cells[c].textContent.replace(/\s+$/g,'')) && DGI("BROWSE").rows[f].offsetHeight>0 ){										//if( Patron.test( DGI("BROWSE").rows[f].cells[c].textContent.toUpperCase() ) ){
					if( p<1 ){
						_VerLoBuscado(DGI("BROWSE").rows[f].cells[c], f, c, sTxt);
						return;
					}
					p--;
				}
			}
			ci = DGI("BROWSE").rows[f-1].cells.length-1;
		}
	}
	S("#BROWSE").obj["SeekFC"] = null;
	if( sp==0 ){
		S("body").tip(eLng(102),3);	//i:102|Cadena no encontrada
	}else{
		Buscar( sTxt, n );
	}
}

/*
function BuscarCadenaYSeleccionar(){
    var m = document.body.createTextRange();
    var n = m.getBookmark();
    m.moveToBookmark(n);
    m.findText("...Cadena...");
    m.select(); 
} 
*/

//-----------------
// MODO SUBVENTANA
//-----------------

//function eSubWindow(op){
//	for(var n=0; n<4; n++) SubVentana.src = SubVentana.src.replace('_'+n,'_'+op);
//	SubVentana.title = eLng(104+op);					//i:104|Selección en una subventana
//}


function ModoSubVentana(){
	if( SubVentana.src.indexOf('_0')>0 ){
		SubVentana.src = SubVentana.src.replace('_0','_1');
		SubVentana.title = eLng(104);	//i:104|Selección en una subventana
	}else if( SubVentana.src.indexOf('_1')>0 ){
		SubVentana.src = SubVentana.src.replace('_1','_2');
		SubVentana.title = eLng(105);	//i:105|Selección en ficha deslizante
	}else{
		SubVentana.src = SubVentana.src.replace('_2','_0');
		SubVentana.title = eLng(106);	//i:106|Selección en la ventana actual
	}
	return eClearEvent();
}


function eClearThousands(txt){
	return S.thousandsClear(txt);
	//if( txt=='' ) return 0;
	//return (txt.replace(/\./g,'').replace(/\,/g,'.'))*1;
}

function eShowThousands(Pts, Deci){				// (>JS<) Retorna un valor formateado con miles - "ERROR" con tres decimales
	return S.thousands(Pts, Deci);
	/*
	var Menos = '';
	if( Deci==undefined ) Deci = 0;

	//if( isNaN(Pts) ) return Pts;	//'';		// Si es texto
	if( typeof(Pts)=='number' ){
		if( Deci > 0 ) Pts = parseFloat(eRound(Pts,Deci));
		Pts = (Pts+'').replace('.',',');
	}else{
		if( Deci>0 && Pts.indexOf(',')==-1 ){
			Pts = Pts.replace('.',',');
		}else{
			Pts = Pts.replace(/\./g,'').replace(',','.');
		}
	}

	if( Pts.substring(0,1)=='-' ){
		Pts = Pts.substring(1);
		Menos = '-';
	}

	if( (_ShowZero==0 && Pts.replace(/0/g,'').replace('.','')=='') || ( _ShowZero==-1 && Pts=='' ) ) return '';

	var i,p,aDeci;
	if( Deci==undefined || Deci==null || Deci==0 ){
		Deci = 0;
	}else{
		Deci++;
	}
	if( Pts=='' ) Pts = '0';

	if( Pts.indexOf('.')==-1 ){
		Pts = Pts.replace(/^0+/g,'');
		if( Pts=='' ) Pts = '0';
	}else if( Pts.indexOf('.')==0 ){
		Pts += '0';
	}

	p = Pts.indexOf('.');
	if( p==-1 ){
	}else if( p>-1 && Deci==0 && Pts.length-p>Deci ){							// Redondea si no se muestran decimales pero si tiene
		if( Pts.substring(p+1,p+2) >= 5 ) Pts = (Pts*1)+1+'';
	}else if( Deci>0 ){														// Redondea si >= 5
		p = Pts.indexOf('.')+Deci;
		if( Pts.substring( p,p+1 )=='.' ) p++;
		if( Pts.substring( p,p+1 ) >= 5 ){
			Pts = Pts.substring( 0, p );
			var Redondeo = 1/Math.pow(10,Deci-1);
			var sPts = (((Pts*1)+Redondeo)+'').substring(0,p);
			if( Pts!=sPts ){
				Pts = sPts;
			}else{
				Pts = (Pts+'').replace('.','');
				Pts = Pts*1+1;
				Pts /= 100;
				Pts = (Pts+'').substring(0,p);
			}
		}
	}
	if( Deci==0 && Pts.indexOf('.')>-1 ) Pts = Pts.substring(0,Pts.indexOf('.'));

	Pts = Pts.replace('.',',')+'';
	var nValor = '', c = '';
	p = ( Pts.indexOf(',')!=-1 ) ? 5 : 0;
	for( i=Pts.length-1; i>=0; i-- ){
		if( p==3 ){
			nValor = '.'+nValor;
			p = 0;
		}
		c = Pts.substring(i,i+1);
		nValor = c+nValor;
		p++;
		if( c==',' ) p = 0;
	}
	if( Deci>0 ){
		if( nValor.indexOf(',')==-1 ){
			aDeci = Deci-1;
			nValor += ',';
		}else{
			aDeci = (Deci-(nValor.length-nValor.indexOf(',')));
		}
		if( aDeci>0 ){
			for( i=0; i<aDeci; i++ ) nValor += '0';
		}else if( aDeci<0 ){
			nValor = nValor.substring(0,nValor.length+aDeci);
		}
	}
	if( nValor.substring(0,1)==',' ) nValor = '0'+nValor;
	return( Menos+nValor );
	*/
}

function eRound( num, dec, miles ){							// (>FJ<) -> "Math.round"
	var p = Math.pow(10,dec),
		r = (Math.round(num*p)/p)+'',
		t = r.split('.'), n;
	if( dec>0 ){
		if( t[1]==undefined ) t[1]='';
		for(n=t[1].length; n<dec; n++) t[1] += '0';
		if( miles!=undefined && miles ) return eShowThousands( t[0]+','+t[1], dec );														//return Valor;
		return t[0]+'.'+t[1];
	}else{
		return t[0]+'';
	}
}


function _PDFConGRILL(){			// Manda los Chart como gráficos al servidor para sacarlos por el PDF
	if( DGI("GRILL").rows[0].cells.length==1 ){
		var Obj = DGI("GRILL").rows[0].cells[0].children[0];
	}else{
		var Obj = DGI("GRILL").rows[0];
	}
	var oColor = S(Obj).css("backgroundColor");
	DGI("GRILL").style.backgroundColor = '#FFFFFF';
	setTimeout('_PDF_ConGRILL("'+oColor+'")',10);
}

function _PDF_ConGRILL( oColor ){			// Manda los Chart como gráficos al servidor para sacarlos por el PDF
	/* REORDENA
	var NOrden = '';
	for( var n=1; n<DGI("BROWSE").rows.length; n++ ) NOrden += ','+DGI("BROWSE").rows[n].Orden;
	*/

	_Win = window;
	if( DGI("GRILL").rows[0].cells.length==1 ){
		var Obj = DGI("GRILL").rows[0].cells[0].children[0];
	}else{
		var Obj = DGI("GRILL").rows[0];
	}

	var oX = document.body.scrollLeft,
		oY = document.body.scrollTop;
	var Ancho = Obj.scrollWidth,
		Alto = Obj.scrollHeight,
		DimXY = top.eXY( Obj ),
		ConAutoMenu = false;
	if( document.body.clientWidth<Ancho ){
		if( window.name=='IWORK' ){
			if( top._MenuOnOff==2 ){
				top.eAutoMenu();
				ConAutoMenu = true;
			}
		}
	}
	if( window.name=='IWORK' ) top.DGI("LogoEDes").style.display = 'none';

	if( Ancho>document.body.clientWidth ) Ancho = document.body.clientWidth;
	if( Alto>document.body.clientHeight ) Alto = document.body.clientHeight;

	document.body.scrollLeft = 0;
	document.body.scrollTop = DimXY[1]-40;

	/*
	if( _Win.name=='IWORK' ){
		var DimOFF = top.eXY( top.DGI(_Win.name) );
	}else{
		var DimOFF = [0,0];
	}
	*/
	var DimOFF = top.eXY(top.DGI(window.frameElement.id)),
		sx = DimXY[0]+DimOFF[0]+1-document.body.scrollLeft,						//.Ojo si es un iframe ????
		sy = DimXY[1]+DimOFF[1]+2-document.body.scrollTop;

	/*
	if( _Win.name=='IWORK' ){
		alert('IWORK');
		if( sy<DimOFF[1]+2 ){
			Alto += sy-DimOFF[1]+2;
			sy = DimOFF[1]+2;
		}
		if( sx<DimOFF[0]+1 ){
			Ancho += sx-DimOFF[0]+1;
			sx = DimOFF[0]+1;
		}
		if( (DimXY[0] + Ancho)>_Win.document.body.clientWidth ) Ancho = _Win.document.body.clientWidth - DimXY[0];
		if( (DimXY[1] + Alto)>_Win.document.body.clientHeight ) Alto = _Win.document.body.clientHeight - DimXY[1];
	}else{
		if( sx<0 ){
			Ancho += sx;
			sx = 0;
		}
		if( sy<0 ){
			Alto += sy;
			sy = 0;
		}
		if( (sx + Ancho)>screen.width ) Ancho = screen.width - sx;
		if( (sy + Alto)>screen.availHeight ) Alto = screen.availHeight - sy;
	}
	*/

	window.external.eCaptureScreen( sx+2, sy+1, Ancho-2, Alto-3, 'grill' );

	DGI("GRILL").style.backgroundColor = oColor;
	document.body.scrollLeft = px(oX);
	document.body.scrollTop = px(oY);

	if( ConAutoMenu ) top.eAutoMenu(0);
	if( window.name=='IWORK' ) top.DGI("LogoEDes").style.display = 'block';

	top.eFilePut( '{dir}tmp/grill.png', '/_tmp/php/'+_User+'.png' );
	S(DGI("ExePDF")).eventFire("click");

	//var ori = location.href.substring(0,location.href.indexOf('edes.php'))+'grill.jpg';
	//top.eCallSrv( window, 'edes.php?E:$pdf_gc.gs&op=g&img='+escape('c:\\\\edes\\tmp\\grill.jpg')+'&ori='+ori );		//TLF.location.replace('edes.php?E:$pdf_gc.gs&op=g&img='+escape('c:\\\\grill.jpg')+'&ori='+ori);
}

function ePPF(txt, valor, ConChange){										//(>FJ<) Put campo/field
	return window.frameElement.WOPENER.ePF(txt, valor, ConChange);
}

function ePGO( field ){														//(>FJ<) GetObjeto( NomCampo )
	return S(":"+field, _WOPENER).obj;											//return window.frameElement.WOPENER.ePGO( field );
}


function ePGF( NomCampo ){													//(>FJ<).Get del Valor del campo
	return window.frameElement.WOPENER.eGF( NomCampo );
}

function eViewDoc(File, oNomFile){
	var o = S.event(window), down=(event.type=="contextmenu"), NomFile;
	if( File==undefined ) File = o.getAttribute("eFile");					// "<img src='{$NomIcono}' onclick='eVD()' oncontextmenu='eVD()' eFile='{$NomFile}' eField='{$CampoNomFile}' title='".$_UPLOADFILE[$xCampo]['TITLE']."'>";
	if( File!=null && File[0]=="!" ) return eClearEvent();
	if( oNomFile==undefined ) oNomFile = o.getAttribute("eField");
	NomFile = File.replace(/\\/g,'/');
	NomFile = NomFile.split('/');
	NomFile = NomFile[NomFile.length-1];
	if(oNomFile) NomFile = eGF(oNomFile);
	if( !down && /(\.gif|\.png|\.jpg|\.jpeg|\.pdf|\.mp4)$/i.test(File) ){
		top.S.window("edes.php?E:$img.php&IMG="+File);
	}else{
		S.callSrv("edes.php?D:"+File+"&_DOWN=1&FILE='"+NomFile.replace(/'/g,'"')+"'");		//top.eCallSrv(window, "edes.php?D:"+File+"&FILE='"+NomFile.replace(/'/g,'"')+"'");
	}
	return eClearEvent();
}
function eVD(File, NomFile){
	var o = S.event(window),
		oTR = S.toTag(o,"TR","*");
	if( S.is("line-through", S(oTR).css("textDecoration")) ){
		S.error("El registro ha sido borrado");
		return eClearEvent();
	}
	if( File==undefined ) File = S(o).attr("eFile");
	if( NomFile==undefined ) NomFile = S(o).attr("eField");
	return eViewDoc(File, NomFile);
}

function _ImgRefresh(o, txt){		// para refrescar la imagen desde la ficha
	setTimeout(function(){
		o.innerHTML = txt; 
	}, 3000);
}

//function eUpdateDoc( File ){
//	top.eDocUpdate( File );
//	return eClearEvent();
//}
//function eUD( File ){ return eUpdateDoc( File ); }


var _eBlink=false, __eBlink=null;
function eBlink( tf ){					// Parpadea el TITULO
	clearTimeout(__eBlink);
	if( tf==undefined ){
		DGI("GROUPTITLE").style.visibility = (_eBlink) ? 'visible' : 'hidden';
		_eBlink = !_eBlink;
		__eBlink = setTimeout("eBlink()",(_eBlink)?250:750);
	}else{
		DGI("GROUPTITLE").style.visibility = (tf) ? 'visible' : 'hidden';
	}
}


function _RecalcColsOp(){						// Recalcula el [ColsOp] dinamicamente
	var tabla = DGI("BROWSE"),
		f = tabla.rows.length-1,
		altoTH = parseInt(S("#BROWSE.AltoTH"))+1,
		Obj = tabla.rows, c,
		tmp = tabla.children[0].children,
		registros = Obj.length-1,
		tmp2, Total;
	if( tabla.rows[f].className!='PieLista' && tabla.rows[f].className!='PieListaGraf' ) return;
	//var s_ShowZero = _ShowZero; _ShowZero = 1;
	for(c=0; c<tmp.length; c++){
		tmp2 = tmp[c].getAttribute("eColsOp");
		Total = 0;
		if( tmp2==undefined || tmp2=='' ) continue;
		for(f=altoTH; f<registros; f++){
			if( Obj[f].offsetHeight==0 || S.is("line-through", S(Obj[f]).css("textDecoration")) ) continue;
			switch( tmp2 ){
				case '+':
					Total += eClearThousands( Obj[f].cells[c].textContent )*1;
					break;
				case 'C': case 'c':
					Total++;
					break;
				case '#':
					if( eTrim( Obj[f].cells[c].textContent )!='' ) Total++;
					break;
			}
		}
		Obj[registros].cells[c].textContent = eShowThousands(Total, tabla.children[0].children[c].getAttribute("DCM"));		//Obj[Obj.length-1].cells[c].textContent = eShowThousands( Total, Obj[parseInt(S("#BROWSE.AltoTH"))].cells[c].DCM );
		//Obj[registros].cells[c].textContent = eRound(Total, tabla.children[0].children[c].getAttribute("DCM"), true);
	}
	//_ShowZero = s_ShowZero;
}
function eRecalcColsOp(){						// Recalcula el [ColsOp] dinamicamente
	_RecalcColsOp();
}

function _SetCaption( tag ){		// Al hacer click sobre el título o sobre las condiciones lo copiará en el captión de la subventana
	if( top.eIsWindow(window) && S.event(window).tagName==tag ){
		var txt = S.event(window).textContent;
		if( event.ctrlKey ){
			var Obj = top.DGI('swV_'+window.frameElement.id.substring(4)).rows[0].cells[0];
			//Obj.title = '';
			txt = Obj.children[0].innerHTML+' · '+txt;
		}
		top.eSWSetCaption( window, txt );
		top.eSWFocus( window, true );
	}
}


//----------------
// [ChangeFilter]
//----------------

function _ChangeFilter2(Op, OpTextContent, Obj, OpObj, oTabla, NmCampo){
	if( Op==null ) return;							//NmCampo = NmCampo["arg"];
	FieldCondi[NmCampo].value = Op;
	if( FieldCondi['_INPUT_'+NmCampo]!=undefined ) FieldCondi['_INPUT_'+NmCampo].value = Op;
	FieldCondi.removeAttribute('target');							// Con Control en una subventana
	FieldCondi.removeAttribute('action');
	if( !S.is("&_EMPTYLIST=1", FieldCondi.action) ) FieldCondi.action += "&_EMPTYLIST=1";

	if( event && event.ctrlKey ){
		var NewPag = S.window("-"),					//, {modal:true} top.eSWOpen(window, '-', '', false, -5,-3);
			dim = S(":FieldCondi").fields(), 
			txt="<html><head></head><body><form action='"+FieldCondi.action+"&_PSOURCE=WDESKTOP' method='POST'>", k;
		for(k in dim){
			txt += "<textarea name='"+dim[k].name+"'>"+dim[k].value+"</textarea>";
		}
		txt+="</form></body></html>";
		NewPag.document.write(txt);
		NewPag.document.getElementsByTagName("FORM")[0].submit();
		/*
			S.windowView(NewPag);
			return;
			S.each(S(":FieldCondi").fields().dim, function(k,o){
				//d-ebugger;
			});
			S.each(["r","mozR","webkitR","msR"], function(o,i){
				if( e[i+"equestFullscreen"] ) e[i+"equestFullscreen"]();
			});
			S(S(":FieldCondi").fields()).each(function(k,o){
				//d-ebugger;
			});
			NewPag.document.write('<body>Procesando...</body>');		//+eLng(126)+ // i:126|Procesando...
			S(NewPag).windowWrite('<html><head></head><body>Procesando...</body></html>');		//+eLng(126)+ // i:126|Procesando...
			S(NewPag).windowWrite('<html><head></head><body>'+txt+'</body></html>');		//+eLng(126)+ // i:126|Procesando...
			var MemForm = S(":FieldCondi").nodeCopy();
			MemForm.obj.action = location.href;
			S(MemForm.obj, NewPag).nodeEnd(); NewPag.document.body.appendChild(MemForm);
			S('<span>MemForm</span>',NewPag).nodeEnd();
			S('<span>MemForm</span>',NewPag).nodeEnd("body");
			//top.S.sessionReset(NewPag.DGI('FieldCondi').action);
			NewPag.DGI('FieldCondi').submit();
		*/
	}else{
		if( top.eIsWindow(window) ) top.eSWLoading(window, 1);
		else top.eLoading(1, window);
		//top.S.sessionReset(DGI('FieldCondi').action);
		if( S("input[name='_ChangeFilter_']",FieldCondi).length==0 ) S("<input name='_ChangeFilter_' value=''>").nodeEnd(FieldCondi);
		FieldCondi['_ChangeFilter_'].value = "";	//"|"+_ChangeFilterLabel;
		if( Op=="" ){
			FieldCondi['_ChangeFilter_'].value = NmCampo+"|"+_ChangeFilterLabel;
		}
		//FieldCondi['_INPUT_'+NmCampo].value = "";
		FieldCondi.submit();
	}
	return eClearEvent();
}
var _ChangeFilterLabel = "";
function _ChangeFilter(Campo){
	//var dim = eval('_DIM_'+Campo), i;
	//for(i in dim){ if( i==FieldCondi[Campo].value ){ delete dim[i]; break; }}	// El valor actual se descarta
	var o = S.event(window),x,oVal="";
	_ChangeFilterLabel = "";
	if( o.tagName=="I" ) o = o.parentNode;
	//if( o.tagName=="LI" ){
		x = S.replace(o.childNodes[0].textContent, [[">",":"],["<",":"],["=",":"]]);
		_ChangeFilterLabel = x.split(":")[0];
		oVal = x.split(":")[1];
	//}

	S(o).menu(eval('_DIM_'+Campo), {function:_ChangeFilter2, off:oVal, "+x":20, "+y":-2}, Campo);			//	top.eMenu(window, o, eval('_DIM_'+Campo), _ChangeFilter2, true, false, Campo);
}


//-----------
// [TipForm]
//-----------

function eTipFormHide(Gen){ S.tip(); }
function eTipForm(txt){ S(oDes).tip(txt); }


var _OnDownload="";
function _SetDownload(){
	_OnDownload = "&_DOWN=1";
	setTimeout("_OnDownload=''",500);
	S.eventFire(S.event(window), "click");
	return S.eventClear(window);
}
function _HelpMenu(Op, i,o,p, tabla, VarUser){		// Se llama desde la etiqueta [Help]
	if( Op!=null ) if( VarUser[0]==undefined ) VarUser = new Array(VarUser);
	if( Op!='H' ) top.eInfo(window,S.lng(219),-1);
	if( S.type(VarUser)=="string" ) VarUser = [VarUser];
	if( /\(.*?\)/.test(VarUser[0]) ){						// función de usuario
		eval(VarUser[0]);
		return;
	}
	VarUser[0] = S.replace(VarUser[0], ",TITLEICON","", "/","_", ",",".");
	var ev = o ? S.windowObject(o).event : window.event, eCtrlKey=null;
	if( ev ){
		if( S('#ListHelpIcons').attr("eCtrlKey")!=null ) eCtrlKey = true;
		else eCtrlKey = ev.ctrlKey;
	}
	switch( Op ){
		case 'H':	// HTM
			var ayuda = S.replace(VarUser[0], "$", "\\$", "-", "\\-");
			if( !S.is(".", ayuda) && S("#HELP_"+ayuda).exists() ){
				top.eInfoHide(window);												
				txt = S("#HELP_"+ayuda).html();			//.replace("<i>", "<i style='font-family:inherit;font-style:italic;'>");
				top.S.info(txt);
				top.S(".TIP").class("+HELP");
				return S.eventClear(ev);
			}else{
				top.gsHelp(VarUser[0], ev, eCtrlKey);
			}
			break;
		case 'C':	// CHM
			var pk = VarUser[0]+'.chm';
			if( top._M_!="" && null!=ev && eCtrlKey ){					// Edita la ayuda
				try{
					S.window("edes.php?Fa:$t/help.edf&_HELP="+escape(pk), {title:"Fichero de ayuda: "+pk});
				}catch(e){}
				return S.eventClear(ev);
			}else{
				top.eCallSrv(window, 'edes.php?D:/help/doc/'+VarUser[0]+'.chm::'+VarUser[1]+'.htm' );	//+'&FILE="AYUDA '+VarUser+'"');
			}
			break;
		case 'P':	// PDF
		case 'V':	// VIDEO - mp4
			var pk = VarUser[0]+((Op=='P')?'.pdf':'.mp4');
			if( top._M_!="" && null!=ev && eCtrlKey ){					// Edita la ayuda
				try{
					S.window("edes.php?Fa:$t/help.edf&_HELP="+escape(pk), {title:"Fichero de ayuda: "+pk});
				}catch(e){}
				return S.eventClear(ev);
			}else{
				top.eCallSrv(window, 'edes.php?D:/help/doc/'+pk+_OnDownload+'&FILE="AYUDA '+VarUser[0]+'"');
			}
			break;
	}
	top.eInfoHide();
	if( S('#ListHelpIcons').exists() ) S('#ListHelpIcons').attr("eCtrlKey",null);

}

function gsHelp(url, icons, eve){		// en edicion.js
	var menu = [["-Ayuda"]],
		o = eve.target;
	if( o.getAttribute("eObjClick")!=null ){
		o = S(o).obj["eObjClick"];
		o.removeAttribute("eObjClick");
	}
	if( S.is("H", icons) ) menu.push(['Ver ayuda', "g/help_htm.png", "H"]);
	if( S.is("P", icons) ) menu.push(['Ayuda en formato PDF', "g/help_pdf.png", "P"]);
	if( S.is("V", icons) ) menu.push(['Video tutorial', "g/help_avi.png", "V"]);
	if( S.is("C", icons) ) menu.push(['Ayuda en formato CHM', "g/help_chm.png", "C"]);
	S(o).menu(menu, {function:_HelpMenu, trigger:eve.target, oncontextmenu:_SetDownload}, url);	//, __arg:[url]
}

//--------------------------

function eD2S(d,s){ 								// (>FJ<)
	if( d=='' ) return '';
	if( s==undefined ) s='';
	d = d.replace(/\//,'-');
	var tmp = d.split('-');
	if( tmp[1].length<2 ) tmp[1] = '0'+tmp[1];
	return tmp[2]+s+tmp[1]+s+tmp[0];		//return d.substring(6,10) + d.substring(3,5) + d.substring(0,2);
}

// getCursorPos: Me devuelve la posición de inicio y fin de la selección o la posición del cursor en el campo 
function getCursorPos( campo ){ 
    if( document.selection ){												// IE Support 
        campo.focus();														// Set focus on the element 
        var oSel = document.selection.createRange();						// To get cursor position, get empty selection range 
        oSel.moveStart('character',-campo.value.length);					// Move selection start to 0 position 
        campo.selectionEnd = oSel.text.length;								// The caret position is selection length 
        oSel.setEndPoint('EndToStart',document.selection.createRange()); 
        campo.selectionStart = oSel.text.length; 
    } 
    return { start: campo.selectionStart, end: campo.selectionEnd }; 
}

// COLOCACIÓN DEL CURSOR: Da el foco a la caja colocando el cursor de inserción en la posición pos 
function putCursorPos(Obj,pos){  
    if( typeof document.selection != 'undefined' && document.selection ){	//método IE 
        var tex=Obj.value; 
        Obj.value='';  
        Obj.focus(); 
        var str = document.selection.createRange();  
        Obj.value=tex; 
        str.move("character", pos);  
        str.moveEnd("character", 0);  
        str.select(); 
    }else if( typeof Obj.selectionStart != 'undefined' ){					//método estándar 
        Obj.setSelectionRange(pos,pos);  
        Obj.focus();														//ojo da error, salta el evento y no debe
    } 
}  


/////////////////////
// Filtro de filas //
/////////////////////

	function _FilterSetScroll(oFilter){
		var xy = eXY(oFilter),
			s = S.scrollGet(document.body);
		oFilter.xOffset = xy[0]-s["scrollLeft"]+2;
		oFilter.yOffset = xy[1]-s["scrollTop"]+2;
	}

	function _FilterExe(txt, Buscar, Mark){
		var n = S.eventCode(event);
		if( n==8 ){
			var Obj = S.event(window),
				Dim = getCursorPos(Obj),
				p = Dim['start'];
			if( p==0 ) return eClearEvent();
			Obj.value = Obj.value.substr(0,p-1)+Obj.value.substr(p);
			putCursorPos( Obj, p-1 );
			return true;
		}else if( n==13 || n==121 ){		// Enter / F10
		}else if( n==36 ){					// Inicio
			putCursorPos( S.event(window), 0 );
			return eClearEvent();
		}else if( n==35 ){					// Final
			var Obj = S.event(window);
			putCursorPos( Obj, Obj.value.length );
			return eClearEvent();
		}else if( Buscar==undefined ) return true;
		eClearEvent();
		top.eInfo(window,'Filtrando...',-1);
		setTimeout(function(){_FilterExe2(txt,Buscar,n,Mark);},100);
		return true;
	}
	function _FilterClear(fi, FILA, cSlideCol, Desc, RowSlide){
		var f, total=FILA.length;
		for(f=fi; f<total; f++) if( FILA[f].className.indexOf('TRHidden')>-1 ){
			FILA[f].className = FILA[f].className.replace(/\s*TRHidden/g,'');
			if( cSlideCol ) RowSlide[f-Desc].className = RowSlide[f-Desc].className.replace(/\s*TRHidden/g,'');
		}
		if( DGI("BROWSE").getAttribute('FilterON')!=null ) DGI("BROWSE").removeAttribute('FilterON');
		_RecalcSlideTH();

		// Recalcula para el scroll
		var ns, oSpan = S("SPAN#UtilFilter").dim, xy,Obj;
		for(ns=0; ns<oSpan.length; ns++){										//top.eTron( '['+ns+'] '+oSpan[ns].id );
			//if( oSpan[ns].id!='UtilFilter' ) continue;
			_FilterSetScroll(oSpan[ns]);
		}

		// Restaura GREENBAR
		if( S("#BROWSE").attr("eGreenBar")!=null ){
			S("#BROWSE").class("+GREENBAR");
		}

		setTimeout("MovTitulos();",100);
		top.eInfoHide(window);

		if( typeof _ChartDynamic!='undefined' && _ChartDynamic ){
			S.chartRedraw(window);
		}
		return false;
	}
	function _FilterExeNewPag(){	
		if( S("SPAN#UtilFilter").length>0 && DGI("BROWSE").getAttribute('FilterON')==1 ){
			top.eInfo(window,'Filtrando...',-1);
			setTimeout(function(){
				_FilterExe2("",1);		//S("#BROWSE").visible();
			},100);
		}								//else S("#BROWSE").visible();
	}
	function _FilterExe2(txt, Buscar, n, Mark){
		var fi = parseInt(S("#BROWSE.AltoTH"))+1, FILA=DGI("BROWSE").rows, f,					// Fila Inicial
			cSlideCol = (_cDeslizante>0 && DGI("TablaTV").children.length>0),
			Desc = parseInt(S("#BROWSE.AltoTH"))+1, RowSlide;

		if( cSlideCol ) RowSlide = DGI("TablaTV").children[0].rows;
		if( n!=121 && Buscar==-1 ) return _FilterClear(fi, FILA, cSlideCol, Desc, RowSlide);

		var DimCond = new Array(), ac=0, Obj, eRequired,
			ns, oSpan = S("SPAN#UtilFilter").dim, xy;

		if( Mark==undefined ) Mark = -1;

		// Quita GREENBAR
		if( S("#BROWSE").attr("eGreenBar")!=null ){
			S("#BROWSE").class("-GREENBAR");
		}

		for(ns=0; ns<oSpan.length; ns++){										//top.eTron( '['+ns+'] '+oSpan[ns].id );
			//if( oSpan[ns].id!='UtilFilter' ) continue;
			Obj = oSpan[ns];													//top.eTron('  ok: '+Obj.NC); 

			_FilterSetScroll(oSpan[ns]);

			var nc = Obj.NC, op,ok,v, tcd=parseInt(Obj["TC"]),
				TD = Obj.td, nCond,txt,Patron,sv,
				oInput = Obj.getElementsByTagName('INPUT');

			for(nCond=0; nCond<oInput.length; nCond++){
				txt = eTrim(oInput[nCond].value);
				eRequired = oInput[nCond].eRequired;
				Patron = '';
			
				try{
					if( txt=='' ){
						continue;
					}else if( txt=='=' ){
						txt = "^\s*$";
						Patron = new RegExp( txt, 'i' );
						op = '*';
					}else if( txt=='>' || txt=='<' ){
						txt = "[A-Z0-9\,\.\-@\(\)\{\}]+";
						Patron = new RegExp( txt, 'i' );
						op = '*';
					}else if( txt.substr(0,1)=='>' || txt.substr(0,1)=='<' ){
						op = txt.substr(0,1);
						txt = txt.substr(1);
						if( txt.substr(0,1)=='=' ){
							op += txt.substr(0,1);
							txt = txt.substr(1);
						}
						if( txt=='' && op=='<' ){
							txt = "^\s*$";
							Patron = new RegExp( txt, 'i' );
							op = '*';
						}
					}else{
						if( txt.substr(0,1)=='=' ) txt = txt.substr(1);					//txt = "^"+txt.substr(1)+"$";
						txt = ( txt.substr(0,1)!='*' ) ? "^"+txt : txt.substr(1);
						txt = ( txt.substr(txt.length-1)!='*' ) ? txt+"$" : txt.substr(0,txt.length-1);
						if( txt.indexOf('*')>-1 ) txt = txt.replace(/\*/g,'[A-Z0-9]*');
						Patron = new RegExp( txt.toUpperCase(), 'i' );
						op = '*';
					}
				}catch(e){ return; }			
				
				if( op!='*' ){
					switch( TD ){	// Tipo de Campo
						case '-,': case '+,': case '-': case '+':
							txt = eClearThousands(txt);	
							break;
						case 'F4':
							if( txt.length==10 ) txt = eD2S(txt);
							else TD='';
							break;
						case 'P4':
							if( txt.length==7 ) txt = eD2S(txt);
							else TD='';
							break;
						case 'CDI':
							break;
						default:
					}
				}																		
				//top.eTron('Cond '+ac+' =  '+op+'/'+nc+' : '+txt +' : '+Patron );
				//top.eTron((eRequired=='true')?'SI':'No');
				DimCond[ac++] = new Array(op,txt,Patron,nc,TD,eRequired);
			}
		}
		DimCond.sort( function(a,b){ return((a[5])?-1:1); } );
		//top.eTron( 'Total condiciones: '+ac ); for( nCond=0; nCond<ac; nCond++ ) top.eTron('Condición:'+nCond+'   Op:'+DimCond[nCond][0]+'   NCol: '+DimCond[nCond][2]+'   Texto: '+DimCond[nCond][1] +'   Patron: '+DimCond[nCond][2]+'   Obligatorio: '+((DimCond[nCond][5])?'Si':'No') );

		if( ac==0 ) return _FilterClear( fi, FILA, cSlideCol, Desc, RowSlide );

		DGI("BROWSE").setAttribute('FilterON',1);

		var TotalTR = FILA.length - ((FILA[FILA.length-1].className=='PieLista')?1:0);

		for(f=fi; f<TotalTR; f++){
			ok = false;

			if( FILA[f].className.indexOf('TRHidden')==-1 && Mark<0 ){
				FILA[f].className += ' TRHidden';
				if( cSlideCol ) RowSlide[f-Desc].className += ' TRHidden';
			}

			for(nCond=0; nCond<ac; nCond++){
				op = DimCond[nCond][0];
				txt = DimCond[nCond][1];
				Patron = DimCond[nCond][2];
				nc = DimCond[nCond][3];
				TD = DimCond[nCond][4];
				eRequired = DimCond[nCond][5];

				sv = v = FILA[f].cells[nc].innerHTML.replace(/\s+$/g,'');
			
				if( op=='*' ){
					ok = Patron.test(v);					//top.eTron('   '+op+' : '+Patron+ ' : '+((ok)?'SI':'no') );
				}else{
					switch( TD ){
						case '-,': case '+,': case '-': case '+':
							v = eClearThousands(sv);
							break;
						case 'F4': case 'P4':
							v = eD2S(sv);
							break;
						case 'CDI':
							break;
						default:
					}
					switch( op ){
						case '>' : ok = v> txt; break;
						case '>=': ok = v>=txt; break;
						case '<' : ok = v< txt; break;
						case '<=': ok = v<=txt; break;
						default: ok = false;
					}										//top.eTron('   '+op+' : '+v+' : '+txt+ ' : '+((ok)?'SI':'no') );
				}
			
				//top.eTron('EXE Fila:'+f+'   Cond:'+nCond+'   Op:'+op+'   NCol: '+nc+'   Texto: '+txt +'   Patron: '+Patron+'   Celda: '+v+'   Obligatorio: '+((eRequired==true)?'Si':'No')+'   OK: '+((ok)?'[Si]':'No') );
				//top.eTron( ((ok)?'Ok':'')+' - '+((eRequired)?'eRequired':''));

				if( Mark>-1 ){		// [JSSelRows]
					if( ok ){
						if( Mark==0 ){
							FILA[f].setAttribute("SEL",1);
						}else{
							FILA[f].removeAttribute("SEL");
						}
						SeleccionaMarca( FILA[f] );
						if( !eRequired ) break;
					}else if( eRequired ){
						if( FILA[f].getAttribute("SEL")!=null ) SeleccionaMarca( FILA[f] );
						break;
					}
				}else if( ok ){
					FILA[f].className = FILA[f].className.replace(/\s*TRHidden/g,'');
					if( cSlideCol ) RowSlide[f-Desc].className = RowSlide[f-Desc].className.replace(/\s*TRHidden/g,'');
					if( !eRequired ) break;
				}else if( eRequired ){
					if( FILA[f].className.indexOf('TRHidden')==-1 ){
						FILA[f].className += ' TRHidden';
						if( cSlideCol ) RowSlide[f-Desc].className += ' TRHidden';
					}
					break;
				}
			}
		}
		_RecalcSlideTH();
		setTimeout("MovTitulos();",100);
		top.eInfoHide(window);

		if( typeof _ChartDynamic!='undefined' && _ChartDynamic ){
			S.chartRedraw(window);
		}
		return true;
	}

	function _FilterKey(){
		try{
			event.keyCode = String.fromCharCode(S.eventCode(event)).toUpperCase().charCodeAt(0);
		}catch(e){}
	}

	function _FilterView(Obj){
		if( event && event.ctrlKey && top._D_!="" ) return true;		// Para dejar pasar el SubMenu de desarrollo
		if( _ChangeFilterMemory ) return eClearEvent();
		//if( event.altKey ) Mas = 'a';
		//if( event.shiftLeft ) Mas = 's';

		var tabla = S.toTag(Obj,'TABLE'),
			oObj = Obj;
		if( tabla.id!="BROWSE" ){
			Obj = DGI("BROWSE").rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex],
			tabla = S.toTag(Obj,'TABLE');
		}
		if( tabla.children[2].rows.length==0 ) return;	// filas del listado, sin cabecera ni pie

		/*
		var TR = S.toTag(Obj,'TABLE').rows,n,TReg=0;
		if( TR.length<5 ){
			for( n=1; n<TR.length; n++ ) if( !(TR[n].className=='PieLista' || TR[n].cells[0].tagName=='TH') ){
				if( ++TReg>1 ) break;
			}
			if( TReg<2 ) return;
		}
		*/

		var oFilter,
			s = S.scrollGet(document.body);
		if( !Obj["oFilter"] ){									//if( !S(Obj).attr('oFilter') ){	//if( Obj.getAttribute('oFilter')==null ){
			//oFilter = S('#oUtilFilter').nodeCopy().obj;
			//oFilter = S.clone(S('#oUtilFilter').obj);
			//oFilter = S(oFilter).nodeEnd("body").obj;
			//var txt = S('#oUtilFilter').obj.outerHTML;
			//oFilter = S(txt).nodeEnd("body").obj;

			oFilter = S('#oUtilFilter').nodeCopy().obj;
			oFilter.id = 'UtilFilter';
			with( oFilter.children[0].rows[1].cells[0] ){
				textContent = Obj.textContent;
				title = Obj.title;
			}
			oFilter.oTD = Obj;
			Obj.oFilter = oFilter;

			if( document.body.vZIndex==undefined ) document.body.vZIndex = 1;
			document.body.vZIndex = parseInt(document.body.vZIndex)+2;
			oFilter.style.zIndex = document.body.vZIndex;

			var n = parseInt(oFilter["TC"])+1, thScroll;
			oFilter["TC"] = n;
			with( oFilter.getElementsByTagName('INPUT')[0] ){
				value = '';
				id = 'ColFilter'+(n-1);
				eRequired = false;
			}
			document.body.appendChild(oFilter);

			Obj.BColor = S(Obj).css("backgroundColor");
			Obj.CColor = S(Obj).css("color");
			S(Obj).css({backgroundColor:'#cf4000',color:'#ffffff'});

			var dim = [Obj];
			if( DGI("TablaTH").children.length>0 ) dim[1] = DGI("TablaTH").children[0].rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex];
			if( DGI("TablaTE").children.length>0 ) dim[2] = DGI("TablaTE").children[0].rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex];

			S(dim).css({
				backgroundColor:'#cf4000',
				color:'#ffffff'
			});

			Obj.oFilter = oFilter;

			S(oFilter).attr({				//S(Obj).attr({
				NC: S(Obj).attr("NC"),
				td: S(Obj).attr("td")
			});
		}else{
			oFilter = Obj.oFilter;
		}

		// Guardar si tiene GREENBAR
		if( S("#BROWSE").attr("eGreenBar")==null && S.is("GREENBAR", S("#BROWSE").class().split(" ")) ){
			S("#BROWSE").attr("eGreenBar",1);
		}
		/*
		oFilter.style.display = 'block';
		var xy = top.eXY(Obj,oFilter,window),
			py = xy[1]-oFilter.offsetHeight;			//+xy[3];
		if( py<s["scrollTop"] ) py = s["scrollTop"];	//if( py<document.body.scrollTop ) py = document.body.scrollTop;

		// Se sale por la derecha cuando hay scroll
		if( (xy[0]-s["scrollLeft"]+oFilter.offsetWidth+10) > document.body.offsetWidth ){				//	if( (xy[0]-document.body.scrollLeft+oFilter.offsetWidth+10) > document.body.offsetWidth ){
			xy[0] -= ((xy[0]-s["scrollLeft"]+oFilter.offsetWidth+10) - document.body.offsetWidth);		//	xy[0] -= ((xy[0]-document.body.scrollLeft+oFilter.offsetWidth+10) - document.body.offsetWidth);
		}
		*/
		S(oObj).around(oFilter, {type:"7,5,6,2,3,4,10,9,8,11,12,1,13,14"});

		S(oFilter).css({
			display: 'table',
			//left: xy[0]-s["scrollLeft"],				//left: xy[0]+document.body.scrollLeft,
			//top: py-s["scrollTop"],
			zIndex: document.body.vZIndex
		}).toScroll()
		  .move(null, S(".TITULO",oFilter));
		oFilter.getElementsByTagName('INPUT')[0].focus();
		eClearEvent();
	}

	function _FilterAdd(){
		var Obj = S.toTag(S.event(window),'TR'),
			oFilter = S.toTag(Obj,'SPAN'),
			n = (S(oFilter).attr("TC")*1)+1;
		//oFilter["TC"] = n--;
		var oTR = S(Obj).nodeCopy().obj;
		with( oTR.getElementsByTagName('INPUT')[0] ){
			value = '';
			id = 'ColFilter'+n;
			eRequired = false;
		}
		top.SwapImg(oTR.getElementsByTagName('IMG')[1],'_1','_0');
		oTR.getElementsByTagName('IMG')[2].style.visibility = 'visible';
		var newTR = Obj.parentNode.parentNode.insertRow(Obj.rowIndex+1);
		newTR.outerHTML = oTR.outerHTML;
		_FilterSetScroll(oFilter);													//top.eTagShadow( window, oFilter );
		DGI('ColFilter'+n).focus();
		S(oFilter).attr("TC",n);
	}
	function _FilterDel(){
		var Obj = S.toTag(S.event(window),'TR'),
			oFilter = S.toTag(Obj,'SPAN');
		Obj = S.toTag(Obj,'TR');
		var nextFocus = Obj.parentNode.parentNode.rows[Obj.rowIndex-1].cells[0].children[0];
		S(Obj).nodeRemove();
		_FilterSetScroll(oFilter);
		nextFocus.focus();							//DGI('ColFilter'+n).focus();
	}
	function _FilterSet(){
		var Obj = S.event(window),
			oInput = S.toTag(Obj,'TR').cells[0].children[0];
		if( Obj.src.indexOf('_1')>-1 ){
			top.SwapImg(Obj,'_1','_0');
		}else{
			top.SwapImg(Obj,'_0','_1');
		}
		oInput.eRequired = (Obj.src.indexOf('_1')>-1);
	}
	function _FilterHelp(){
		var oFilter = S.toTag(S.event(window),'SPAN');
		_FilterSetScroll(oFilter);
		top.eFileHelp("$filter_list");
		return eClearEvent();
	}
	function _FilterTHColor(Obj){
		var dim = [Obj];
		if( DGI("TablaTH").children.length>0 ) dim[1] = DGI("TablaTH").children[0].rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex];
		if( DGI("TablaTE").children.length>0 ) dim[2] = DGI("TablaTE").children[0].rows[Obj.parentNode.rowIndex].cells[Obj.cellIndex];
		S(dim).css({
			backgroundColor: Obj.BColor,
			color: Obj.CColor
		});
		Obj.removeAttribute('oFilter');
	}

	function _FilterClose(){		// Cuando se cierra una ventana ¿quitar su filtro?
		var Obj = S.toTag(S.event(window),'SPAN'),n;
		if( Obj.id=="oUtilFilter" ){					//evita cerrar si se pulsa en la copia maestra, se utiliza al edita "core.css"
			S(Obj).nodeRemove();
			return;
		}
		_FilterTHColor(Obj.oTD);
		S(Obj.oTD).attr("oFilter","");				//Obj.oTD.removeAttribute('oFilter');
		Obj.removeAttribute('oTD');
		S(Obj).nodeRemove();
		// Si no hay mas filtros muestra todas las filas
		if( S("#UtilFilter").length>1 ) return;
		//Obj = document.getElementsByTagName('SPAN');
		//for( n=0; n<Obj.length; n++ ) if( Obj[n].id=='UtilFilter' ) return;			
		top.eInfo(window,'Eliminando Filtro...',-1);
		setTimeout(function(){_FilterExe2('',-1);},100);
	}
	function _FilterCloseAll(SoloClose){
		var Obj = S("SPAN#UtilFilter").dim,			//, Obj = document.getElementsByTagName('SPAN')
			n, t=Obj.length;
		for(n=t-1; n>=0; n--){					// if( Obj[n].id=='UtilFilter' ){
			_FilterTHColor(Obj[n].oTD);
			//S(Obj[n]).nodeRemove();				//top.eTagClose(Obj[n]);
			S(Obj[n].oTD).attr("oFilter","");		//Obj[n].oTD.removeAttribute('oFilter');
			Obj[n].removeAttribute('oTD');
			S(Obj[n]).nodeRemove();
		}
		if( SoloClose ) return;
		top.eInfo(window,'Eliminando Filtro...',-1);
		setTimeout(function(){_FilterExe2('',-1);},100);
		eClearEvent();
	}

	function _FilterMini(){
		var obj = S.toTag(S.event(window),'SPAN');
		if( obj.id=="oUtilFilter" ){					//evita minimizar si se pulsa en la copia maestra, se utiliza al edita "core.css"
			S(obj).nodeRemove();
		}else{
			S(obj).none();
		}
	}
	function _FilterSort2(){
		var Dim=new Array(), ns, o,
			oSpan = S("SPAN#UtilFilter").dim,		//, oSpan = document.getElementsByTagName('SPAN')
			//s = S.scrollGet(document.body),
			y = 0;	//s["scrollTop"];
		for(ns=0; ns<oSpan.length; ns++){
			//o = oSpan[ns];
			//if( o.id!='UtilFilter' ) continue;
			//Dim[Dim.length] = new Array(parseInt(o.NC),o);
			Dim[Dim.length] = new Array(parseInt(oSpan[ns].NC), oSpan[ns]);
		}
		Dim.sort( function(a,b){ return((a[0]>b[0])?1:-1); } );
		for(ns=0; ns<Dim.length; ns++){
			o = Dim[ns][1];
			S(o).css({
				left:0,								//s["scrollLeft"],				//left:document.body.scrollLeft,
				top:y,								//top:y+document.body.scrollTop,
				display:'table'
			});
			o.xOffset = 0;							//s["scrollLeft"];		// Para el desplazamiento con el scroll		//o.xOffset = document.body.scrollLeft;		// Para el desplazamiento con el scroll
			o.yOffset = y;							//px(y);				//top.eTagShadow( window, o );	// Muestra la sombra
			y += o.offsetHeight+5;
		}
		eClearEvent();
	}
	function _FilterSort(){ 
		setTimeout('_FilterSort2();',100);
		return eClearEvent();
	}

	function _FilterGroup(oImg){
		var Obj = S.toTag(S.event(window),'SPAN'),
			nc = Obj.NC, Dim = new Array(), oDim = new Array(),
			fi = parseInt(S("#BROWSE.AltoTH"))+1, FILA=DGI("BROWSE").rows, f, v,		// Fila Inicial
			TotalTR = FILA.length - ((FILA[FILA.length-1].className=='PieLista')?1:0);

		for(f=fi; f<TotalTR; f++){
			v = FILA[f].cells[nc].innerHTML.replace(/\s+$/g,'');
			if( Dim[v]==undefined ) Dim[v] = 1;
		}

		f=0; for(v in Dim) oDim[f++] = v;
		oDim.sort(function(a,b){return((a.toUpperCase()>b.toUpperCase())?1:-1)});				//oDim.sort();
		
		Dim = new Array('-Menú'); for( f=0; f<Math.min(25,oDim.length); f++ ) Dim[f+1]=oDim[f];
		if( oDim.length>25 ) Dim[25] = '...';

		top.eMenu(window, S.event(window), Dim, function(Op,Txt){
			if( Op==null || Txt=='...' ) return;
			// Si se selecciona una imagen ? hay que poder filtrarla ???
			//if( Txt=='' && S.event(window).outerHTML!='' ) Txt = S.event(window).outerHTML;
			//alert(Txt+'\n'+Op+'\n'+S.event(window).outerHTML);
			S.toTag(oImg,'TR').getElementsByTagName('INPUT')[0].value = Txt;
		});
		eClearEvent();
	}


// ListMultiSelec


function eListMultiSelec(){
	var sk = event.shiftKey,										// help: puede marcar un grupo de filas con shiftKey
		oTD = S.event(window),
		o = S.toTag(oTD,"TR"), c, td,
		runFunc = S(":LISTMULTISELECT").attr("eUserFunction");

	if( o==null || o.tagName!="TR" || o.getAttribute("disabled") ) return;
	if( oTD.className=="JSOnClickRow" ){		// [JSOnClickRow] l || NumRow
		_oTD = oTD;
		_Celda = oTD;
		_GetNumCol();
		SelecUsu();
		return;
	}
	td = S(o.cells[o.cells.length-1]).obj;
	if( td.tagName=="TD" ){

		if( sk ){
			var pk = S("#BROWSE").attr("SeekCampos").split(":"),	//SeekCampos="cd_tipoproveedor:0" 
				tr = S("TBODY",S("#BROWSE")).obj.rows,
				t = tr.length,
				c = tr[0].cells.length-1, txt="", i, pTR=-1,
				uTR=td.parentNode.rowIndex-(S("#BROWSE").attr("AltoTH")*1)-1;

			for(i=0; i<t; i++) if( tr[i].offsetHeight>0 ){
				if( pTR==-1 && tr[i].cells[c].innerText=="j" ){
					pTR = i;
				}
				tr[i].cells[c].innerText = "";
				tr[i].className = "";
			}
			if( pTR==-1 ) pTR = 0;
			if( uTR<pTR ){
				i = uTR;
				uTR = pTR;
				pTR = i;
			}

			for(i=pTR; i<=uTR; i++) if( tr[i].offsetHeight>0 ){
				if( runFunc!="" ){
					if( !window[runFunc](tr[i], tr[i].cells[c], "I", "I") ) continue;
				}
				tr[i].cells[c].innerText = "j";
				tr[i].className = "MarkedRow";
				_OkChange = 1;
			}
			return eClearEvent();

		}else{
			if( runFunc!="" ){
				if( !window[runFunc](td.parentNode, td, "I", "I") ) return eClearEvent();		// Funcion de usuario para anular la pulsación
			}
			c = S(o.cells[o.cells.length-1]).text();
			S(o).class(c=="j"?"":"MarkedRow");
			S(o.cells[o.cells.length-1]).text(c=="j"?"":"j");
		}
		_OkChange = 1;
	}else if( td.tagName=="TH" ){
		SeleccionaLinea();
	}
}

function eListMultiSelectOk(){
	var pk = S("#BROWSE").attr("SeekCampos").split(":"),	//SeekCampos="cd_tipoproveedor:0" 
		p = pk[1]*1,
		tr = S("TBODY",S("#BROWSE")).obj.rows,
		t = tr.length,
		c = tr[0].cells.length-1, txt="", i,
		conTR = (S(":LISTMULTISELECT").attr("eTR")=="ROW"),
		conMiles = (/(\+|\-)/.test(S("#BROWSE TH[nc='"+p+"']").attr("td")));
	if( isNaN(p) ){
		S.error("El campo del [DBIndex] no encontrado");
		return;
	}
	for(i=0; i<t; i++){
		if( tr[i].cells[c].innerText=="j" ){
			if( txt!="" ) txt += ",";
			if( conTR ){
				txt += i;
			}else if( conMiles ){
				txt += eClearThousands(tr[i].cells[p].innerText);
			}else{
				txt += tr[i].cells[p].innerText;
			}
		}
	}
	if(txt!="" ){
		_OkChange = null;
		i = S(":LISTMULTISELECT").attr("eJS");
		if( i!=null && i!="" ){
			window[i](txt.split(","));
		}else{
			S("BODY").hidden();
			S(":_PK_MULTISELECT_").val(txt);
			//top.S.sessionReset(S(":LISTMULTISELECT").obj.action);
			S(":LISTMULTISELECT").obj.submit();
		}
	}else S.info("No hay ninguna selección");
}

function eListMultiSelecMenu(){
	var o = S.event(window);
	S(o).menu([
			["-Menú"],
			["Marcar todo","","C"],
			["Desmarcar todo","","U"],
			["Invertir selección","","I"]
		], {hide:true, function:function(k){
		var pk = S("#BROWSE").attr("SeekCampos").split(":"),	//SeekCampos="cd_tipoproveedor:0" 
			tr = S("TBODY",S("#BROWSE")).obj.rows,
			t = tr.length,
			c = tr[0].cells.length-1, txt="", i,
			uFunc = ( S(":LISTMULTISELECT").attr("eUserFunction")!="" );
		for(i=0; i<t; i++) if( tr[i].offsetHeight>0 ){
			if( tr[i].getAttribute("disabled") ) continue;
			if( uFunc ){
				if( !window[S(":LISTMULTISELECT").attr("eUserFunction")](tr[i], tr[i].cells[c], k, "M") ) continue;		// Funcion de usuario para anular la pulsación
			}
			if( k=="D" ){										// Desmarcar todo / UnCheck
				tr[i].cells[c].innerText = "";
				tr[i].className = "";
			}else if( k=="C" ){									// Marcar todo / Check
				tr[i].cells[c].innerText = "j";
				tr[i].className = "MarkedRow";
			}else if( tr[i].cells[c].innerText=="j" ){			// Desmarcar el marcado
				tr[i].className = "";
				tr[i].cells[c].innerText = "";
			}else{												// Marcar el no marcado
				tr[i].className = "MarkedRow";
				tr[i].cells[c].innerText = "j";
			}
		}
	}});
	return S.eventClear(window);
}


var _eViewCSS = 0;
function eViewCSS(n){					// Establece la vista del listado a visualizar
	var o = S(".VIEWCONTAINER");
	S("I",o).class("+OFF");
	S(S(".VIEWCONTAINER").obj.children[n]).class("-OFF");			//S(o.obj.parentNode.children[n]).class("-OFF");

	/*
	CONTENEDOR.style.width = "1px";
	PAGINA.style.width = "1px";
	if( DGI("SubTitle")!=null ) SubTitle.style.width = "1px";
	BROWSE.style.width = "1px";
	*/
	//if( DGI("SubTitle")!=null ) SubTitle.style.display = "table-cell";
	//BROWSE.style.display = "";

	S("#BROWSE").class(_VIEWCSS[n]);

	var tmp = _VIEWCSS[n].split(" "), t=tmp.length, n,i;
	S("TH[nc]",S("#BROWSE")).none();
	for(i=0; i<t; i++){
		if( tmp[i].indexOf("col_")==0 && tmp[i].indexOf("n")==-1 ){
			S("TH[nc='"+S.mid(tmp[i],4,-1)+"']", "#BROWSE").css("display:");
		}
	}

	//S("body").visible();
	if( DGI("SubTitle")!=null ) WidthSubTitle();
	//BROWSE.style.display = "";
	//if( DGI("SubTitle")!=null ) SubTitle.style.display = "";

	//	if( DGI("SubTitle")!=null ) SubTitle.style.width = "";
	//	CONTENEDOR.style.width = "";
	//	PAGINA.style.width = "";
	//	BROWSE.style.width = "";

	//	S("TH[nc]",S("#BROWSE"))
	//S("TH",S("#BROWSE")).dim[4].getAttribute("NC")
	//S("TH[nc='1']",S("#BROWSE")).obj
	_eViewCSS = n;
}


function _RecalcOptionsInList(){					// refresca la página al cerrar la subventana cuando es [OptionsInList] sin registros
	setTimeout(function(){
		location.href = location.href+"";
	}, 1);
	return true;
}

// Marca/Memoriza las filas visitadas al paginar

	var _DimVisited = [];
	function eVisitedGet(){
		var seek = S("#BROWSE").attr("SeekCampos"), dim;
		if( seek && seek.split(",").length==1 ){			//"cd_etapa:0"
			seek = seek.split(":")[1]*1;
			dim = S("#BROWSE TR.Visited");
			if( dim.length>0 ){
				S(dim.col(seek)).each(function(k,o){
					_DimVisited[o.innerText] = 1;
				});
			}
		}
	}

	function eVisitedPut(){
		if( _DimVisited.length>0 ){
			var seek = S("#BROWSE").attr("SeekCampos").split(":")[1]*1;
			S(S("#BROWSE").col(seek)).each(function(k,o){
				if( _DimVisited[o.innerText] ){
					S.toTag(o, "TR").className = "Visited";
				}
			});
		}
	}

// PUBLIC

	function _toPublic(){
		S("*[pp='1']").each(function(k,o){
			if( o.onchange ) o.onchange = _Public(o.onchange);
			if( o.onclick ) o.onclick = _Public(o.onclick);
			if( o.oncontextmenu ) o.oncontextmenu = _Public(o.oncontextmenu);
		});
	}
	function _Public(fn){
		return function(){
			if( event ){
				_RowEdit = null;
				var obj = S.event(event);
				if( S.toTag(obj, "TABLE", "id=BROWSE") ) _RowEdit = S.toTag(obj,"TR").rowIndex;		// tabla ".HTML_IN_TD"
			}

			if( _RowEdit==null ){
				var ok = fn.apply(this, arguments);
				return ok;
			}

			var cu,c,v,
				oTR = BROWSE.rows[_RowEdit];									//window["_$_"]=[];
			S("#BROWSE TH[nc]").each(function(k,o){
				var cu = c = S(o).attr("campo"),								//S(o).attr("campo,td,te")
					t = S(o).attr("td,te");
				if( c[0]=="*" ) cu = S.left(c,1,0);
				//if( c.indexOf(" ")>-1 ) var tmp = c.split(" ");
				//v = eGF(c);													//console.log(cu+" = "+v);
				try{
					if( t["te"]=='T' && '+,-,*,'.indexOf(t["td"])>-1 ){
						v = S.thousandsClear(oTR.cells[k].textContent);
					}else{
						v = S.trim(oTR.cells[k].textContent);
					}
				}catch(e){
					alert(cu+' / eGF', _Source, -1, eGF);
				}
				window["$"+cu] = v;												//window["_$_"][cu] = v;
			});
			var ok = fn.apply(this, arguments);
			//for(cu in window["_$_"]) if(window["_$_"][cu]!=window["$"+cu]){
			//	ePF(cu, window["$"+cu]);										// actualiza el valor
			//}
			if(event) S.eventClear(event);
			return ok;
		};
	}	


	function ePublic(n){
		var cu,c,v;
		if( n==1 ){
			window["_$_"]=[];
			S("#BROWSE TH[nc]").each(function(k,o){
				var cu = c = S(o).attr("campo,nc");
				if( c["nc"]!=null ){
					if( c["campo"][0]=="*" ) cu["campo"] = S.left(c["campo"],1,0);
					v = eGF(cu["campo"]);
					window["$"+cu["campo"]] = v;
					window["_$_"][cu["campo"]] = v;
				}
			});
		}else{
			var Obj = _Celda;
			if( Obj.tagName=='IMG' || Obj.tagName=='I' ) Obj = Obj.parentNode;
			if( Obj.tagName=='TD' ) Obj = Obj.parentNode;

			for(cu in window["_$_"]) if(window["_$_"][cu]!=window["$"+cu]){
				ePF(cu, window["$"+cu]);														// actualiza el valor
				if( S(".BROWSE THEAD TH[nc='"+_NumCol[cu]+"']").attr("td")=="F4" ){
					if( window["$"+cu]!='' ) window["$"+cu] = top.eDTS(window["$"+cu], "-");
				}
				if( _CmpAEditar!="" ) elUpdate(Obj.cells[_NumCol[cu]], window["$"+cu]);
			}
		}
	};

	function eLeft(txt,n){
		return S.left(txt,n);
	}
	function eRight(txt,n){
		return S.right(txt,n);
	}
	function eMid(txt,i,f){
		return S.mid(txt,i,f);
	}


// SubMenu LTOOLS oculto a la derecha

	function _LToolsView(ver){
		if( S(window).windowIs() ) return;

		var o = S(".MENULTOOLS");
		if( o.length==0 ) return;			// en [OptionInList] si no hay registros no está el submenú LTools
		if( ver!=undefined && ver==1 ){								// evita que se oculte si te pones encima
			clearTimeout(o.attr("eHide"));
			return;
		}
		//if( S("TR[earg='CARD']",o).length ) S("TR[earg='CARD']",o).nodeRemove();

		var h = o.obj.offsetHeight,
			c = S.screen(window),
			sh = c.h,
			y = event.clientY,
			ml = S(".MENUFOOTLIST");
		if( event.offsetX>=(c.x+c.w-c.sb) ){
			y -= h/2;
			if( y<0 ) y = 0;
			else{
				if( c.oh!=c.ch ) y += c.sb;
				if( ml.length==1 ) sh -= ml.obj.offsetHeight;		// Descuenta el SubMenú del [OptionInList] ".MENUFOOTLIST"
				if( (y+h)>sh ){
					y = sh-h;
					if( c.oh!=c.ch ) y -= c.sb;
				}				
			}
			o.css("top",y).visible();
			o.attr("eHide", setTimeout(function(){					// oculta al segundo
				o.attr("eHide", o.hidden());
			},1000));
		}
	}
	function _LToolsViewClick(ev){
		var o = S.event(ev),
			oTR = S.toTag(o, "TR"),
			nTR = oTR.rowIndex;
		if( typeof(_LToolsIcons[nTR+1][2])=="string" ){
			_uMenuLTools(_LToolsIcons[nTR+1][2], _LToolsIcons[nTR+1][2], null, oTR);
		}else if( _LToolsIcons[nTR+1][2]==undefined ){									// cuando se copia el icono del LToos de arriba al menu lateral
			if( !/^(I|IMG)$/.test(o.tagName) ){
				S.eventClear(ev);
				oTR.cells[0].children[0].onclick();
			}
		}else{
			S(S.event(window)).menu(_LToolsIcons[nTR+1][2], {hide:true, function:_uMenuLTools, oncontextmenu:__MenuLTools, out:S("#UtilListICO").attr("out")});
		}
		S(".MENULTOOLS").hidden();
	}


/*
// Ordenar columnas del listado mediante subVentana
	function _sortDefList(){
		S("#BROWSE TH[nc]").dim[1]
	}
*/

// insert dinamico

	function _insertDinamyc(cmp, val, rowMod){
		if( rowMod!=undefined ){
			_Celda = _Fila.cells[0];
		}else{
			_Celda = _FilaLastInsert.cells[0];
		}
		ePF(cmp, val);
		var q = S(".CONTENEDORCARD .card[ePK='-1']");
		if( q.length ){
			q.attr("ePK", val);
		}
	}

// Pasa de listado a Card (tarjetas)

	function eCardLoad(){
		if( S("STYLE[type='NO']",top).length ){
			S('<style title="styleCARD" name="styleCARD" type="NO">'+S("STYLE[type='NO']",top).obj.innerText+'</style>').nodeEnd();
		}
	}

	function _CardClick(o){
		var oCard = S.toTag(S.event(window), "div", "className=card"), eTR;
		if( oCard==null ) return;
		eTR = S(oCard).attr("eTR")*1+1;
		S.eventClear(window);
		S("#BROWSE TBODY TR:nth-child("+eTR+") TD:nth-child(1)").eventFire("click");		// ejecuta la fila
		S("body").visible();
	}

	function eCard(on){							// FALTA: Si el listado es mas ancho que la pantalla no lo hace bien
		if( S(window).windowIs() ) return;		// FALTA: card y sublistado

		// si hay CARD personalizados
		var oDimCard = S(".CONTENEDORCARD");
		if( oDimCard.length ){
			_ModeCard = on;
			if(on){
				S(".BROWSE").none();
				var oAncho = S("#PAGINA").css("width"),
					oToolBar = S(".ToolsBar");
				S("#PAGINA").css("width:90%");
				S("#PAGINA").attr("oAncho", oAncho);
				var ancho = oToolBar.css("width")+oToolBar.css("padding-left")+oToolBar.css("padding-right");
				oDimCard.css("width:"+ancho+"px;display:block");

				if( oDimCard.attr("eIgual")==null ){
					oDimCard.attr("eIgual", 1);
					var maxAncho=0, w;
					S(".card", oDimCard).each(function(k,o){
						w = o.offsetWidth;
						if( w==0 ){
							o.style.display = "table";
							maxAncho = Math.max(maxAncho, o.offsetWidth);
							o.style.display = "none";
						}else{
							maxAncho = Math.max(maxAncho, o.offsetWidth);
						}
					});
					S(".CONTENEDORCARD .card").css("width:"+maxAncho);												//S(".card", oDimCard).each(function(k,o){ o.style.width = maxAncho });
				}
			}else{
				oDimCard.none();
				S("#PAGINA").css("width:"+S("#PAGINA").attr("oAncho"));
				S("#PAGINA").css("display:inline-table");
				S(".BROWSE").css("display:table");
				//if( S("#MENUCARDFLOAT").length ) S("#MENUCARDFLOAT").hidden();
			}
			Recalcula();
			return;
		}

		var o = S("#BROWSE"),
			eCard = o.attr("eCard");			//eNoRecalc = o.attr("eNoRecalc");
		
		if( on && (eCard==null || eCard==0) ){
			//S("#CONTENEDOR").attr("eWidthBak", S("#CONTENEDOR").css("width"));
			//S("#CONTENEDOR").css("width:"+S("#CONTENEDOR").css("width"));
			//S("#CONTENEDOR").css("width:"+(S.screen(window).w-20));
			//S("#PAGINA").css("color:1px solid red;width:"+(S.screen(window).w-30));

			//if( eNoRecalc==null ){
			if( eCard==null ){			// para calcular ancho th
				S('<table id="COPYBROWSE" class="BROWSE" style="position:absolute;left:0px;top:0px;visibility:hidden"><tbody><tr><td>xxx</td></tr></tbody></table>').nodeEnd();
			}

			//S("#BROWSE").class("="+S.replace(S("#BROWSE").class(), "GREENBAR", "bakGREENBAR"));			// no porque desabilita el menu de fila
			
			var oculta = S("#BROWSE").class().match(/col_[0-9]{1,2}n/g), borde="", newCss=[], nOculto=0;
			S.each(oculta, function(k, txt){
				var c = txt.match(/[0-9]{1,2}/g)[0]*1+1;
				newCss.push("=#BROWSE td:nth-of-type("+c+"){display:none;}");
				nOculto++;
			});
		
			var eWidth = S("#PAGINA").attr("eWith"), hTop = 0;
			if( eWidth!=null ){
				S("#PAGINA").attr("eWith", S("#PAGINA").obj.style.width);
			}
	
			var wContenido=0, wLabel=0, hContent=0;
			S("#BROWSE TBODY TR:nth-of-type(1) TD").each(function(k,o){						// mayor ancho
				wContenido = Math.max(wContenido, o.offsetWidth);
				hTop = S(o).css("paddingTop");
				hContent = Math.max(hContent, o.offsetHeight-(hTop*2));
			});
			
			var txt = S("#BROWSE TH[nc]").dim, n, wTest=S("#COPYBROWSE TR TD"), c;
			for(n=0; n<txt.length; n++){
				var oTH = S("#BROWSE TH[nc='"+n+"']").obj, img, text=" ";
				if( oTH.children.length && oTH.children[0].tagName!="BR" ){
					img = oTH.children[0];
					if( /^(I|IMG|svg)$/.test(img.tagName) ){
						c = 'content: "*";';
						if( img.tagName=="IMG" ){
							//var svg = new XMLSerializer().serializeToString(img),
							//	base64 = window.btoa(svg);												//"data:image/png;base64,
							//c = 'content: url(data:image/'+S.fileType(img.src)+';base64,'+base64+');';
							//newCss.push('=#BROWSE td:nth-of-type('+(n+1)+'):before {content: url(data:image/'+S.fileType(img.src)+';base64,'+base64+');}');
							//c = 'content: " ";  display: block;height: 20px; width: 20px;background-image: url("data:image/'+S.fileType(img.src)+';base64,'+base64+'");';
							//newCss.push('=#BROWSE td:nth-of-type('+(n+1)+'):before {content: " ";  display: block;height: 20px; width: 20px;background-image: url("data:image/'+S.fileType(img.src)+';base64,'+base64+'");}');
							//c = 'content: "*";';
						}else if( img.tagName=="I" ){
							c = 'content: "'+img.innerText+'";font-family:eDes;top:0px;';		//newCss.push('=#BROWSE td:nth-of-type('+(n+1)+'):before {content: "'+img.innerText+'";font-family:eDes;top:0px;}');
							//c = 'content: "*";';
						}else{
							//c = "*";
							//newCss.push('=#BROWSE td:nth-of-type('+(n+1)+'):before {content: "'+c+'";}');
							//c = 'content: url("data:image/svg+xml; utf8, '+escape(img.outerHTML)+'");';				//newCss.push('=#BROWSE td:nth-of-type('+(n+1)+'):before {content: url("data:image/svg+xml; utf8, '+img.outerHTML+'");}');
							//c = 'content: "*";';
						}
					}else{
						text = S.trim(img.innerHTML.replace(/<br>/gi, " "));
						c = 'content: "'+text+'";';
					}
				}else{
					text = S.trim(oTH.innerHTML.replace(/<br>/gi, " "));
					c = 'content: "'+text+'";';
				}
				newCss.push('=#BROWSE td:nth-of-type('+(n+1)+'):before {'+c+'}');

				if( oTH.offsetWidth>0 ){
					wTest.html('<b>'+text+'</b>');
					wLabel = Math.max(wLabel, wTest.obj.offsetWidth);
					if( borde=="" ){
						borde = '+#BROWSE tbody tr {border: 1px solid '+S.rgb2hex(S(oTH).css("backgroundColor"))+';}';
						newCss.push(borde);
					}
				}
			}
		
			wLabel += 5;																									// separación entre el label y el contenido
			newCss.push('=#BROWSE tbody tr {width:'+(wLabel+wContenido)+'px;}');											// ancho total del Card
			newCss.push('=#BROWSE td {padding-left:'+wLabel+'px; height:'+hContent+'px;}');									// deja espacio para el Label y pone el alto de cada celda
			if( (text.length-nOculto)>1 ){
				newCss.push('+#BROWSE td {border-bottom: 1px solid '+S.rgb2hex(S("#BROWSE").css("backgroundColor"))+';}');	// color entre filas
			}
			newCss.push(borde);
			newCss.push('=#BROWSE td:before {top: '+hTop+'px;}');															// distancia del Label al top de la celda

			S(':styleCARD').obj.type = "text/css";																			//S('#TARJETA').obj.type = "text/css";
			for(n=0; n<newCss.length; n++){
				S(window).rule(newCss[n], "styleCARD");					//console.log(newCss[n]);
			}
			
			S("#GROUPTITLE").css({marginLeft: S("#BROWSE TBODY TR:nth-child(1)").css("margin-left")});
			if( eWidth!=null ) S("#PAGINA").css("width", "auto");
			S("#BROWSE").class("+NO_SHADOW");

			//o.attr("eNoRecalc", 1);
			o.attr("eCard", 1);
			// recalcular barra de scroll

			Recalcula();

		}else if( !on && eCard==1 ){
			//S("#BROWSE").class("="+S.replace(S("#BROWSE").class(), "bakGREENBAR", "GREENBAR"));
			//S("#CONTENEDOR").attr("eWidthBak", S("#CONTENEDOR").css("width"));
			//S("#CONTENEDOR").attr("width", "auto");

			S("#BROWSE").class("-NO_SHADOW");
			S("#GROUPTITLE").css({marginLeft: "auto"});
			S("#PAGINA").css("width", S("#PAGINA").attr("eWith"));

			o.attr("eCard", 0);
			S(':styleCARD').obj.type = "NO";																				//S('#TARJETA').obj.type = "NO";			//S('#TARJETA').obj.type = (on)?"text/css":"NO";
		}
	}


	function _CardEvent(Card){
		var win = Card.win;
		Card.on("mouseenter", function(ev){
			clearTimeout(win._CardSobre);
			var oCard = S.event(ev),
				xy = S.xy(oCard),
				el = S.xy(S("#MENUCARDFLOAT", win).obj);
			if( S(oCard).attr("eDelete")!=null ) return;						// si el CARD está borrado no muestra el menu
			S("#MENUCARDFLOAT", win).attr("eTR", oCard.getAttribute("eTR"));
			S("#MENUCARDFLOAT", win).visible().css("left:"+(xy.x+xy.w-el.w-5)+";top:"+(xy.y+xy.h-el.h-5));
		});
		Card.on("mouseleave", function(ev){
			win._CardSobre = setTimeout(function(){
				S("#MENUCARDFLOAT", win).hidden();
			}, 1);
		});
	}

	function _CardEvents(){
		setTimeout(function(){
			if( !S("#MENUTRFLOAT").length ) return;
			var menuCard = '<span id="MENUCARDFLOAT" class="MENUTROPACITY NOBREAK"></span>',							// style="position:absolute; left:0px; top:0px; visibility:hidden; padding-left:15px; padding-right:5px;"
				oMenu = S(menuCard).nodeEnd();

			S(oMenu).html(S("#MENUTRFLOAT").html());
			S("#MENUTRFLOAT *").each(function(k,o){
				S("#MENUCARDFLOAT *").dim[k].onclick = o.onclick;
			});
			S(oMenu).css("position:absolute;visibility:hidden;");

			S(oMenu).on("mouseenter", function(ev){
				clearTimeout(_CardSobre);
				var o = S.event(ev);
				S(o).class("-MENUTROPACITY");
			});
			S(oMenu).on("mouseleave", function(ev){
				var o = S.event(ev);
				S(o).class("+MENUTROPACITY");
			});

			var _CardSobre=null;
			S(".card").on("mouseenter", function(ev){
				clearTimeout(_CardSobre);
				var oCard = S.event(ev),
					xy = S.xy(oCard),
					el = S.xy(S("#MENUCARDFLOAT").obj);
				if( S(oCard).attr("eDelete")!=null ) return;						// si el CARD está borrado no muestra el menu
				S("#MENUCARDFLOAT").attr("eTR", oCard.getAttribute("eTR"));
				S("#MENUCARDFLOAT").visible().css("left:"+(xy.x+xy.w-el.w-5)+";top:"+(xy.y+xy.h-el.h-5));
			});
			S(".card").on("mouseleave", function(ev){
				_CardSobre = setTimeout(function(){
					S("#MENUCARDFLOAT").hidden();
				}, 1);
			});
		}, 1000);
	}

// ListSetup: Configura las columnas a visualizar en el listado

	function _ListSetup(obj){			// solo sobre las columnas que tienen label
		var oTabla = S("#BROWSE"),
			aClass =  oTabla.class(),
			oClass = oTabla.attr("classBak"),
			dim =  oTabla.class().match(/col_[0-9]{1,2}(l|c|r|n)/g),
			th = S("TH[nc]", oTabla).dim, n, tmp, title, i=0,
			oMenu = [["-Columnas visibles"]], bak=[], cv,iz,dch, oTH;

// si el TH está en la fila = 1 no se puede ocultar

		for(n=0; n<th.length; n++){
			oTH = S("TH[nc='"+n+"']", oTabla).obj;

			tmp = oTabla.class().match(RegExp('col_'+n+'(l|c|r|n)'));
			title = "";
			if( S('#_TIP_H_'+n).length ) title = S('#_TIP_H_'+n).text();
			if( S.trim(oTH.innerHTML)!="" ){
				bak[i] = (tmp[1]!="n");
				cv = S(oTH).attr("cv");
				if( cv ){
					iz = "<b>";
					dch = "</b>";
				}else{
					iz = "";
					dch = "";
				}
				if( oTH.innerText!=oTH.getAttribute("campo") ){
					var txt = oTH.innerHTML;
					if( oTH.children.length>0 && S.right(txt,4)=="</i>" ){	// pone el icono, si lo tiene, al tamaño que tiene en el th
						txt = S.replace(txt, 'style="', 'style="font-size:'+S(oTH.children[0]).css("font-size")+'px;');
					}
					if( oTH.parentNode.rowIndex==1 ){
						oMenu.push([iz+S.replace(txt+dch, "<br>", " "), "[][c][-]", tmp[0], title, null, "color:#bbbbbb", "OFF"]);		// Quita los saltos de linea: oTH.innerHTML
					}else{
						oMenu.push([iz+S.replace(txt+dch, "<br>", " "), "[]"+(tmp[1]!="n"? "c":""), tmp[0], title]);			// Quita los saltos de linea: oTH.innerHTML
					}
					i++;
				}
			}
		}

		oMenu.push(["=Aceptar", "", "A",null,null,"margin:20px;padding:20px;"]);											//dim.push([n, "", "", "", "", "background:"+n+";color:"+top.eColorContrastBW2(n)]);		// ["1. Principal", "", "", "", "", "background:#2471A3;color:#FFFFFF"]

		S(obj).menu(oMenu, {noMark:true, scroll:true, type:"18,16,3,2,4,11,12,1,7,6,5,13,14", function:function(o,b,c){			//  [false, "col_1l", "Movimiento"]
			var n, change=[], nc, cv=0, save="", oDesTH=null, oDesTE=null;
				
			if( S("#TablaTH").obj.children.length ) oDesTH = S("#TablaTH").obj.children[0];
			if( S("#TablaTE").obj.children.length ) oDesTE = S("#TablaTE").obj.children[0];

			for(n=0; n<o.length; n++){
				if( o[n][0] ) cv++;
				if( o[n][0]!=bak[n] ) change.push([o[n][0], o[n][1]]);
			}
			if( cv==0 ){
				S.error("El listado tiene que tener alguna columna visible");
				return;
			}

			for(n=0; n<change.length; n++){
				nc = S.mid(change[n][1],4,-1);
				//if( change[n][1]==undefined ) return;																		// desactiva los campos con doble th
				if( change[n][0] ){																// visualizar
					tmp =  oClass.match(RegExp('col_'+nc+'(l|c|r|n)'));
					aClass = S.replace(aClass, change[n][1], tmp[0]);
					S(".BROWSE TH[nc='"+nc+"']", oTabla).display("table-cell");
					if( oDesTH!=null && S(".BROWSE TH[nc='"+nc+"']", oDesTH).length ) S(".BROWSE TH[nc='"+nc+"']", oDesTH).display("table-cell");
					if( oDesTE!=null && S(".BROWSE TH[nc='"+nc+"']", oDesTE).length ) S(".BROWSE TH[nc='"+nc+"']", oDesTE).display("table-cell");
				}else{																			// ocultar
					if( !oTabla.class("?bak"+change[n][1]) ) aClass += " bak"+change[n][1];
					aClass = S.replace(aClass, change[n][1], S.left(change[n][1],0,-1)+"n");
					S(".BROWSE TH[nc='"+nc+"']", oTabla).none();
					if( oDesTH!=null && S(".BROWSE TH[nc='"+nc+"']", oDesTH).length ) S(".BROWSE TH[nc='"+nc+"']", oDesTH).none();
					if( oDesTE!=null && S(".BROWSE TH[nc='"+nc+"']", oDesTE).length ) S(".BROWSE TH[nc='"+nc+"']", oDesTE).none();
				}
			}
			if( change.length ){
				oTabla.class(aClass);
				for(n=0; n<o.length; n++){
					nc = S.mid(o[n][1],4,-1);
					save += S(".BROWSE TH[nc='"+nc+"']", oTabla).attr("oCampo")+"="+(o[n][0]? 1:0)+"|";
				}
				S.call("E:$listsetup.php", {source:_Source, data:save}, {info:true});
				Recalcula();
				if( oDesTH!=null || oDesTE!=null ) _MovTitulos();
			}
		}});
	}

// Filtrar filas en listado si es ta [MaxRec] FULL

	function _filterTR(obj){
		// transforma la cadena de busqueda en una expresión regular
			var val = S.lower(S.trim(obj.value)), n, visible=[],
				lowerOn = S.setup.accent.lowerOn,											// "áéíóúâêîôûàèìòùäëïöü"
				lowerOff = S.setup.accent.lowerOff,											// "aeiouaeiouaeiouaeiou"
				com = "+.*()|=";
			for(n=0; n<com.length; n++) val = S.replace(val, com[n], "\\"+com[n]); 
			val = S.replace(val, "?", ".");													// cualquier caracter
			for(n=0; n<lowerOn.length; n++) val = S.replace(val, lowerOn[n], lowerOff[n]); 
			for(n=0; n<5; n++) val = S.replace(val, lowerOff[n], "("+lowerOff[n]+"|"+lowerOn[n]+"|"+lowerOn[n+5]+"|"+lowerOn[n+10]+"|"+lowerOn[n+15]+")");								// vocal con cualquier acento
			var exp = new RegExp(val, "i");

		// columnas visibles
			S("#BROWSE TH[nc]").each(function(k,o){
				if( o.offsetWidth>0 ) visible.push(k);
			});

		// busca por fila en la concatenación de sus celdas
			var oTR = S("#BROWSE TBODY TR").dim,
				t = oTR.length, txt, i, it=visible.length;
			/*
			for(n=0; n<t; n++){
				txt = ""; for(i=0; i<it; i++) txt += "~"+oTR[n].cells[visible[i]].textContent;
				oTR[n].style.display = exp.test(txt)? "" : "none";
			}
			*/

			if( S(".PaginationBar").length ){
				if( val=="" ){
					_PaginarFullFilter = false;
					S(".PaginationBar").block();
					for(n=0; n<t; n++) oTR[n].style.display = "none";
					var Desde = DGI('DESDE').value*1,
						MaxRec = sMaxRec = DGI('MAXREC').value*1,
						vDesde = (Desde-1)*MaxRec;
					for(n=vDesde; n<t; n++){
						oTR[n].style.display = '';
						if( --MaxRec<1 ) break;
					}
				}else{
					_PaginarFullFilter = true;
					S(".PaginationBar").none();
					for(n=0; n<t; n++){
						txt = ""; for(i=0; i<it; i++) txt += "~"+oTR[n].cells[visible[i]].textContent;
						oTR[n].style.display = exp.test(txt)? "" : "none";
					}
				}
			}else{
				for(n=0; n<t; n++){
					txt = ""; for(i=0; i<it; i++) txt += "~"+oTR[n].cells[visible[i]].textContent;
					oTR[n].style.display = exp.test(txt)? "" : "none";
				}
			}
	}
	/*
		function _filterTRClick(ev, o){		// onclick="_filterTRClick(event, this)"
			//debugger;
			console.log( o.tagName +' - '+ev.offsetX+' - '+(ev.clientX-ev.offsetX) +' - '+o.offsetWidth );		//+' : '+o.outerHTML
		}
		#spanFilterTR:after {
			font-family:eDes;
			font-size:7px;
			content: ".";	/ * "\142" * /
			-right:10px;	/ * {$iconSelectRight}; * /
			-top:3px;		/ * {$iconSelectTop}; * /
			left:-25px;
			bottom:3px;
			position:relative;
			color:#dddddd;
		}
	*/

// Cambiar filtro en lisdaos

	function eFilterSelect(field, title, dim){
		var win = window;
		
		if( S(":"+field, ":FieldCondi", win).length==0 ){				// añadir el input al formulario si no está
			S("<input name='"+field+"'>").nodeEnd(":FieldCondi", win);		
		}
		
		var val = S(":"+field, ":FieldCondi", win).val(),
			op = S.replace(val ,"'","", '"','', "(","", ")","").split(","), oMenu=[], n,		// con expresion regular
			bak = op.sort().join(","), newFilter=[];

		// genera el menú		
			oMenu = [["-"+title]];
			for(n=0; n<dim.length; n++){
				oMenu.push([dim[n][1], "[]["+(S.is(dim[n][0], op)?"C":"")+"]", dim[n][0]]);		//, null, null, "color:#bbbbbb"
			}
			oMenu.push(["=Aceptar", "", "A", null, null, "margin:20px;padding:20px;"]);
		
		S(S.event(window)).menu(oMenu, {noMark:true, scroll:true, type:"18,16,3,2,4,11,12,1,7,6,5,13,14", function:function(o,b,c){			//[true, "pk", "label"]
			for(n=0; n<o.length; n++) if( o[n][0] ) newFilter.push(o[n][1]);
			newFilter = newFilter.sort().join(",");
			
			if( newFilter!=bak ){		// si cambió el filtro
				newFilter = S.replace(newFilter,",","','");
				if( newFilter!="" && S.count(",", newFilter)>0 ){
					newFilter = "('"+newFilter+"')";
				}
				S(":"+field, ":FieldCondi", win).val(newFilter);				//console.log("Nuevo valor:"+newFilter);				
				o = S(":FieldCondi", win).obj;
				if( o.action.indexOf("_EMPTYLIST")==-1 ) o.action += "&_EMPTYLIST=1";
				var act = S.mid(o.action, "?", ":");
				o.action = S.replace(o.action, "edes.php?"+act+":", "edes.php?L"+act[1]+"l:");			// si es un GDF se ataca a otro script, que se grabe en el fuente <meta ...>
				o.target = "";
				o.submit();
			}
		}});		
	}

	function eFilterOne(op, label, trigger, oTr, oTable, field){
		if( op==null ) return;
		var win = window;			//S.event(

		if( S(":"+field, ":FieldCondi", win).length==0 ){				// añadir el input al formulario si no está
			S("<input name='"+field+"'>").nodeEnd(":FieldCondi", win);		
		}

		S(":"+field, ":FieldCondi", win).val(op);
		o = S(":FieldCondi", win).obj;
		if( o.action.indexOf("_EMPTYLIST")==-1 ) o.action += "&_EMPTYLIST=1";
		var act = S.mid(o.action, "?", ":");
		o.action = S.replace(o.action, "edes.php?"+act+":", "edes.php?L"+act[1]+"l:");			// si es un GDF se ataca a otro script, que se grabe en el fuente <meta ...>
		o.target = "";
		o.submit();
	}

// Funciones para la paginación

	function _NuevaPaginaIni(win, v){
		var Origen = S("#BROWSE", win).obj,
			Destino = S("#BROWSE").obj,
			DesdeList = v["DesdeList"],
			HastaList = v["HastaList"],
			TotalReg = v["TotalReg"],
			TotalReg_RowsOnPage = v["TotalReg_RowsOnPage"],
			_CARDSHOW = v["_CARDSHOW"],
			_CHARTCOL = v["_CHARTCOL"],
			_ChartMax = v["_ChartMax"],
			_ChartMin = v["_ChartMin"],
			_FunctionLastPage = v["_FunctionLastPage"],
			_FunctionNextPage = v["_FunctionNextPage"],
			_ISLOPMenu = v["_ISLOPMenu"],
			_ISUBLIST = v["_ISUBLIST"],
			_ISUBLISTTOOLS = v["_ISUBLISTTOOLS"],
			_LToolsType = v["_LToolsType"],
			_OnClickEditList = v["_OnClickEditList"],
			_PAGINCR = v["_PAGINCR"],
			_RD = v["_RD"],
			_REG_ = v["_REG_"],
			_REG_RowsOnPage_1 = v["_REG_RowsOnPage_1"],
			_RowsOnPage = v["_RowsOnPage"],
			_TGrupos = v["_TGrupos"],
			_TIPO_ = v["_TIPO_"],
			_TIPTD = v["_TIPTD"],
			_TOTALSROWS = v["_TOTALSROWS"],
			_VIEW__VIEWFORMAT = v["_VIEW__VIEWFORMAT"],
			_WINCAPTION = v["_WINCAPTION"],
			box = v["box"],
			floor_REG_RowsOnPage_1 = v["floor_REG_RowsOnPage_1"]
		;
		var oCard = S(".CONTENEDORCARD"),
			viewCard = oCard.length;

		//if( dim["_TGrupos"]==0 ) _FilterCloseAll(true);		// Cierra las ventanas de filtro

		// Memoriza los anchos mas desfavorables
		// var _WOPENER = window.frameElement.WOPENER,
		///	Destino = Destino, 
		///	Origen = Origen,

		var	TRec = Destino.rows.length,
			nl = parseInt(Destino.getAttribute("AltoTH"))+1,
			oAnchoCOL, oAnchoTD, dAnchoCOL, dAnchoTD, n,
			slt = S.scrollGet(S("BODY").obj);							// SecrollLeftTop

		Origen.className = Destino.className;							// restablece las clases, ya que las clases para el ancho y color de la columna es un número aleatorio

		//var css = S("#configCSS").obj.innerText;

		try{																			//document.body.style.visibility = "hidden";
			// cuando estas desarrollando y visualizas las columnas oculta de un listado y luego paginas
			if( top._M_!="" ){
				var oTH = S("TH", Origen).dim,
					dTH = S("TH", Destino).dim, bak;

				bak = S(Destino).attr("classbak");
				if( bak==null ){
					S(Origen).obj.removeAttribute("classbak");
				}else{
					S(Origen).attr("classbak", (bak!=null )? bak:null);
				}
				S(Origen).obj.className = S(Destino).class();

				for(n=0; n<oTH.length; n++){
					bak = dTH[n].getAttribute("displayBak");
					if( bak==null ){
						oTH[n].removeAttribute("displayBak");
					}else{
						oTH[n].setAttribute("displayBak", bak);
					}
					oTH[n].style.display = dTH[n].style.display;
				}
			}

			while( TRec>nl && Destino.rows[nl].cells[0].colSpan>1 ) nl++;
			if( TRec>nl && _AnchoCols.length==0 ){										//_AnchoCols[Destino.getAttribute("eCols")] = Destino.offsetWidth*1;
				for(n=0; n<Destino.getAttribute("eCols"); n++){
					_AnchoCols[n] = Destino.rows[nl].cells[n].offsetWidth*1;
				}
			}
		}catch(e){}																		//for( var i in e ) alert(i+'\n\n'+e[i]);

		//function WidthSubTitle(){}
		function _RDPaginar(){
			var xSpan = '<SPAN style="overflow-x:hidden; float:left; white-space:nowrap; text-overflow:ellipsis; width:100%;">',
				oDIV = DGI('_RDColDIV'),
				rh, r, c;
			for(rh=0; rh<=parseInt(Origen.getAttribute("AltoTH")); rh++) for(c=0; c<Origen.rows[rh].cells.length; c++){
				if( Origen.rows[rh].cells[c].NC!=undefined && oDIV.getAttribute('IniCol'+c)!=undefined ){
					Origen.rows[rh].cells[c].innerHTML = Origen.rows[rh].cells[c].innerHTML;
					for(r=parseInt(Origen.AltoTH)+1; r<Origen.rows.length; r++) Origen.rows[r].cells[c].innerHTML = xSpan+Origen.rows[r].cells[c].innerHTML+'</SPAN>';
				}
			}
		}
		if( _RD!='' ) _RDPaginar();

		// Tipo paginación: Incremental / de sustitución

		// top.eTestSg();
		// window.onresizeend = null;

		Origen.setAttribute('FilterON', Destino.getAttribute('FilterON'));
		Origen.setAttribute('eOrder', Destino.getAttribute('eOrder'));
		Origen.style.display = "inline-table";
		if( _PAGINCR ){
			var oRows = Origen.rows,
				oTotal = oRows.length,
				dTotal = Destino.rows.length;
			for(n=Origen.getAttribute("AltoTH")+1; n<oTotal; n++) S(Destino.insertRow(dTotal++)).nodeSwap(oRows[n]);
		}else{
			var eMenu = Destino["eMenu"],			// MenuFlotante
				eFunc = Destino["func"];

			S(Origen).css("width:100%");
			Destino.outerHTML = Origen.outerHTML;

			if( eMenu!=undefined ){									// MenuFlotante
				S(window).menuRow("#BROWSE", eMenu, eFunc);
				S(eMenu).hidden();
				S("*[op]", eMenu).css({visibility:""});
			}
		}

		S.scrollSet(S("BODY").obj, {left:slt.scrollLeft, top:slt.scrollTop});							// SecrollLeftTop

		//S("#BROWSE").hidden();
		//window.onresizeend = MovTitulos;
		//top.eTestSg();

		// Pone los anchos mas desfavorables
		Destino = S("#BROWSE").obj;		//Destino;
		Destino.style.width = "";
		var TRec = Destino.rows.length;
			nl = parseInt(Destino.getAttribute("AltoTH"))+1;

		//console.table(_AnchoCols);		
		try{
			while( TRec>nl && Destino.rows[nl].cells[0].colSpan>1 ) nl++;
			if( TRec>nl ){
				for(n=0; n<Destino.getAttribute("eCols"); n++){
					if( _AnchoCols[n]>Destino.rows[nl].cells[n].offsetWidth && _VIEW__VIEWFORMAT ){
						//Destino.style.width = (parseInt(Destino.offsetWidth) + _AnchoCols[n] - Destino.rows[nl].cells[n].offsetWidth)+"px";
						Destino.rows[nl].cells[n].style.width = _AnchoCols[n]+"px";				//Destino.rows[nl].cells[n].style.width = Destino.children[0].children[n].style.width = _AnchoCols[n]+"px";
					}else{
						//Destino.style.width = (parseInt(Destino.offsetWidth) + (Destino.rows[nl].cells[n].offsetWidth-_AnchoCols[n]) )+"px";
						_AnchoCols[n] = Destino.rows[nl].cells[n].offsetWidth*1;
					}
				}
			}
		}catch(e){}																			//for(var i in e) alert(i+'\n\n'+e[i]);
		//console.table(_AnchoCols);		

		//if( _AnchoCols[Destino.getAttribute("eCols")] < Destino.offsetWidth*1 ){
		//	_AnchoCols[Destino.getAttribute("eCols")] = Destino.style.width = Destino.offsetWidth*1;
		//}
		//top.eTron(_AnchoCols[3]+', '+Destino.offsetWidth);
		//Destino.onclick = SeleccionaLinea;

		document.body.setAttribute('SePagino', 1);											// Para saber como hacer el Reload desde el top
		if(DGI("_Pie")) DGI("_Pie").textContent = _REG_RowsOnPage_1;
		if(DGI("_Pie2")) DGI("_Pie2").textContent = TotalReg_RowsOnPage;
		DGI("DESDE").setAttribute("OldValue", DesdeList);
		DGI("DESDE").value = DesdeList;
		DGI("DESDE").setAttribute('NREG', _REG_+1);
		DGI("DESDE").setAttribute('NPAG', floor_REG_RowsOnPage_1);
		DGI("TIPO").value = _TIPO_;
		DGI("HASTA").value = HastaList;
		DGI("HASTA").setAttribute("TPAG", HastaList);
		DGI("MAXREC").value = _RowsOnPage;
		if( DGI("oMAXREC")!=null ) DGI("oMAXREC").value = _RowsOnPage;

		//< ?PHP  if( $_CURSOR && count($_EDITLIST)==0 ){ ? >
		//	//Destino.onmouseover = FilaOn;
		//	//Destino.onmouseout = FilaOff;
		//< ?PHP  } ? >

		if( DGI('islPageUp')!=null ){
			if( _REG_==0 ){										//DGI('islPageUp').disabled = true; DGI('islPageUp').className = "OFF";
				S("#islPageUp").class("+OFF");					//DGI('islPageDown').disabled = false; DGI('islPageDown').className = '';
				S("#islPageDown").class("-OFF");
			}else if( HastaList==floor_REG_RowsOnPage_1 ){		//DGI('islPageUp').disabled = false; DGI('islPageUp').className = '';
				S("#islPageUp").class("-OFF");					//DGI('islPageDown').disabled = true; DGI('islPageDown').className = "OFF";
				S("#islPageDown").class("+OFF");
			}
		}

		if( _WINCAPTION ){
			if( DGI("_Pie")!=null ){		// Pone la paginación en la subventana
				top.eSWSetStatus(window, DGI("_Pie").parentNode.textContent);
			}
		}

		if( DGI("DESDE").getAttribute('CS')==1 ){
			DGI("DESDE").select();
			DGI("DESDE").setAttribute("CS", 0);
		}

		if( _LToolsType=='E' || _LToolsType=='S' || _LToolsType=='b' || _ISUBLISTTOOLS=="E" ){		// Interno / Externo

			if( DGI("oDESDE") ){
				DGI("oDESDE").setAttribute("OldValue", DesdeList);
				if(DGI("oDESDE")) DGI("oDESDE").value = DesdeList;
				DGI("oDESDE").setAttribute('NREG', _REG_+1);
				DGI("oDESDE").setAttribute('NPAG', floor_REG_RowsOnPage_1);
				DGI('oDESDE').value = DesdeList;
				DGI("oHASTA").value = HastaList;
				if(DGI("oHASTA")) DGI("oHASTA").setAttribute("TPAG", HastaList);
				DGI("oMAXREC").value = _RowsOnPage;
				if( DGI("oDESDE").getAttribute('CS')==1 ){
					if( DGI("oDESDE").offsetWidth>0 ) DGI("oDESDE").select();
					DGI("oDESDE").setAttribute("CS",0);
				}

				if( _LToolsType=='b' ){	// Barra
					if( DesdeList==1 ) S("#PaginationBarIZ").class("=ButtonInNO OFF ROUNDED2 NoRight MasMargin");
					else S("#PaginationBarIZ").class("=ButtonIn ROUNDED2 NoRight MasMargin");

					if( HastaList==DesdeList ) S("#PaginationBarDR").class("=ButtonInNO OFF ROUNDED2 NoLeft MasMargin");
					else S("#PaginationBarDR").class("=ButtonIn ROUNDED2 NoLeft MasMargin");
					
						var tabla = S("#oDESDE_TABLE").obj,
							tr = tabla.rows, ntr=tr.length, total=HastaList, n, borrar, oTR, oTD;
						// reajusta el numero de páginas
							if( ntr<total ){			//añadir
								for(n=ntr+1; n<=total; n++){
									oTR = tabla.insertRow();
									oTR.insertCell().innerText = n;
									oTR.insertCell().innerText = n;
								}
							}else if( ntr>total ){		// borrar
								borrar = ntr-total;
								for(n=0; n<borrar; n++){
									tabla.deleteRow(total);
								}
							}
						// pone quita botones
							var oPaginationBar = S(".PaginationBar").obj;
							for(n=0; n<=5; n++){
								oPaginationBar.children[n].style.display = ((_RowsOnPage==TotalReg)? "none":"inline-flex");		// botones paginas y paginas
							}
						// $_GET["_VisibleRows"]

					S(".Button SPAN[eSelectSpan='oDESDE'] SPAN").text(DesdeList);
					S("#PaginationBarBT").html(box);
				}
			}
		}

		// Pinta tarjetas
			if( _CARDSHOW && _ISUBLIST==false ){
				_CardEvents();
			}

		if( viewCard ){
			S(".CONTENEDORCARD").HTML(oCard.HTML());
			if( _ModeCard ) eCard(1);
		}

		S('.SELECT').none();
		eHideBusy();
		MovTitulos();
		TitulosON();
		MovTitulos();
		eHideBusy();
		_RecalcSlideTH();
		WidthSubTitle();

		if( _ISUBLIST==true && _ISLOPMenu!='' ){
			Destino.onclick = opISubList;
			Destino.oncontextmenu = opISubList;
			Destino.style.cursor = 'pointer';
		}else{
			//Destino.onclick = SeleccionaLinea;
			//S("#BROWSE").on("click", function(){ SeleccionaLinea(); });
		}

		if( _CHARTCOL>0 ) ChartWidth(_ChartMax, _ChartMin);
		if( _TOTALSROWS && _REG_TotalReg_RowsOnPage ) ColorFilaTotales();		// [#].Pone otro color a la ultima linea [#]

		if( _OnClickEditList ) Destino.onclick = elEdit;			//EditTD;';		// NoSave 

		if( _TIPTD>0 ){
			_MasInfoEvent();						//echo 'Destino.onmouseover = MasInfoOn;'; echo 'Destino.onmouseout = MasInfoOff;';
		}
		if( _FunctionNextPage!='' ) eval(_FunctionNextPage+';');

		if( !_ISUBLIST ){
			Recalcula(1, true);						//Recalcula solo si el ancho es mayor
			eDelHelp();								//MovTitulos();
		}

		if( !_PAGINCR ){
			MovTitulos();
		}

		if( typeof(ChartReload)!="undefined" ) ChartReload();		// [CHARTGRID]
		if( _FunctionLastPage!='' && _REG_TotalReg_RowsOnPage ) eval(_FunctionLastPage+";");
		if( PAGINA.style.width=="" ) PAGINA.style.width = "";			//PAGINA.style.removeAttribute('width');
		try{
			S.loading(window, 0);					//top.eLoadingHidden(0, window);
		}catch(e){}

		_MovTitulos();								//if( DGI('TablaTV').offsetWidth>0 ) setTimeout('MovTitulos();',100);

		if( DGI('BUSCAR')!=null && DGI('BUSCAR').offsetWidth>0 ) eBuscarFoco();
		eVisitedPut();
		//document.body.focus();
	}

	function _NuevaPaginaEnd(win, _TGrupos){
		var slt = S.scrollGet(S("BODY").obj);										// SecrollLeftTop
		//_Reajusta();
		TitulosON();
		S.scrollSet(S("BODY").obj, {left:slt.scrollLeft, top:slt.scrollTop});		// SecrollLeftTop
		if( _TGrupos==0 ) _FilterExeNewPag();										// Cierra las ventanas de filtro
		S.scrollSet(window, {left:0, top:0});										// recoloca el listado desde el principio
		_toPublic();
		_3CXClear();																// quita 3CX si lo tiene
		top.eClearPag(win);
	}


// Calculadora


	/*
		if( Obj.tagName=='DIV' ) Obj = Obj.parentNode;
		if( Obj.tagName=='SPAN' ) Obj = Obj.parentNode;
		if( Obj.tagName=='IMG' ) Obj = Obj.parentNode;
		if( Obj.tagName=='TD' ){
			if( Obj.id=='CNT' ) Obj = S.toTag(Obj,'TD');		// En los listados se con textarea se mete la informacion dentro de un TD con su tabla
			if( Obj.id=='NO' ) return;
			_oCalculator = Obj;
	*/

	var _oCalculator = null,
		_CalculatorOFF = false;

	function _CalculatorGet(){
		var Obj = DGI('CALCULATOR');
		if( Obj==null ){
			Obj = S(S.resouce("CALCULATOR")).nodeEnd("body").obj;
		}
		return Obj;
	}

	function _CalculatorMem(){
		if( _CalculatorOFF ) return true;
		_oCalculator = S.event(window);
	}

	function _Calculator(){					// Enter (Alzar mayúsculas)		_Calculator
		if( _CalculatorOFF ) return true;
		if( !_oCalculator ) return;
		if( /^(?:IMG|I)$/i.test(_oCalculator.tagName) ) _oCalculator = _oCalculator.parentNode;
		if( _oCalculator.tagName!="TD" ) return;
		var key = S.eventCode(event);

		if( _oCalculator==null && event.type=='keydown' && key==13  ){
			_oCalculator = S.event(window);
			return;
		}
		if( _oCalculator==null ) return;
		if( event.type=='keydown' && (key==13 || key==67) ) IniFin();
		else if( event.type=='keypress' ){
			var Op = String.fromCharCode(key);
			if( '\+\-\/\*\%'.indexOf(Op)>-1 ){				// % Este, sobre este %
				var Obj = _CalculatorGet();
				if( S(Obj).attr("Estado")==1 ){
					Add();
					if( '+,-,'.indexOf(Obj.td)>-1 && Obj.children[0].rows.length>2 && Op=='%' ){
						Calcular(Obj, '%');
					}else if( 'F4P4'.indexOf(Obj.td)>-1 && Obj.children[0].rows.length>2 ) Calcular(Obj);
				}
			}else if( Op.toUpperCase()=='C' || Op.toUpperCase()=='=' ){				// Iniciar/Finalizar Calculadora
				IniFin();
			}else if( Op.toUpperCase()=='M' || Op.toUpperCase()=='G' ){				// Recupera ultimo resultado
				_CalculatorClose();
				var Obj = _CalculatorGet();
				if( Op.toUpperCase()=='M' && Obj.oRes==undefined ) return;
				if( Op.toUpperCase()=='G' && top._CalculatorRes==undefined ) return;
				Show(Obj,1);
				Obj.td = Obj.oTD;
				var tr = Obj.children[0].insertRow();
				tr.insertCell().textContent = ' ';
				var o = tr.insertCell();
				o.textContent = (Op.toUpperCase()=='M')? Obj.oRes : top._CalculatorRes;
				o.style.textAlign = "right";
				tr.insertCell().textContent = ' ';
				//top.eTagShadow( window, Obj );
			}else if( Op.toUpperCase()=='S' ){				// Suma la columna si es numerica si no cuenta si no está vacio
				if( _oCalculator.colSpan>1 ) return;
				_CalculatorClose();
				var Obj = _CalculatorGet(), nc = _oCalculator.cellIndex;
				S(Obj).attr("td", S(DGI('BROWSE').children[0].children[nc]).attr("td"));
				var Res = 0, TR = DGI('BROWSE').rows,
					tRow = TR.length,
					d = S(DGI('BROWSE').children[0].children[nc]).attr("nd");									// Nº de decimales
				if( TR[tRow-1].className=='PieListaGraf' ) tRow-=2;
				else if( TR[tRow-1].className=='PieLista' ) tRow--;
				var aTH = DGI('BROWSE').getAttribute('AltoTH')*1+1;
				if( '+,-,'.indexOf(Obj.td)>-1 ){
					var sD = 0, tmp;
					for( n=aTH; n<tRow; n++ ){
						try{
							if( TR[n].offsetHeight==0 ) continue;
							v = eClearThousands(TR[n].cells[nc].textContent);
							if( !isNaN(v) ){
								Res += v;
								tmp = TR[n].cells[nc].textContent.split(',');
								if( tmp.length>1 ) sD = eTrim(tmp[1]).length;
							}
						}catch(e){}
					}
					if( isNaN(Res) ) return;
					if(d==undefined) d=sD;
					Res = eShowThousands(Res, d);
				}else{
					for(n=aTH; n<tRow; n++){
						try{
							if( TR[n].offsetHeight==0 ) continue;
							if( eTrim(TR[n].cells[nc].innerHTML)!='' ) Res++;
						}catch(e){}
					}
					Res = eShowThousands(Res);
				}
				Obj.oTD = Obj.td;
				Obj.oRes = Res;
				top._CalculatorRes = Res;
				Show(Obj,0);
				Add(Res);
				S(Obj).attr("Estado", 1);
			}
			return true;
		}

		function Show(Obj, op){
			S(Obj).attr("Estado", op);
			Obj.style.display = "table";								//if( eXY(Obj)[1]<document.body.scrollTop ) Obj.style.top = document.body.scrollTop;
			S(Obj).move(false, Obj.children[0].rows[0].cells[1]);
			S(Obj).css("position:fixed");
		}

		function Add(v){
			if( v==undefined && eTrim(_oCalculator.textContent)=='' ) return false;
			var Obj = _CalculatorGet(),
				Op = String.fromCharCode(S.eventCode(event)).toUpperCase();

			if( v==undefined ){
				var td = S(DGI("BROWSE").children[0].children[_oCalculator.cellIndex]).attr("td");
				if( '+,-,F4P4'.indexOf(td)==-1 ) return false;
				if( S(Obj).attr("td")==undefined ) S(Obj).attr("td",td);
				else if( '+,-,'.indexOf(td)>-1 && '+,-,'.indexOf(S(Obj).attr("td"))>-1 ){
				}else if( td.substr(0,1)!=S(Obj).attr("td").substr(0,1) ) return false;

			}
			if( Op=="C" || Op=="=" ) Op = "";
			if( 'F4P4'.indexOf(td)>-1 && Obj.children[0].rows.length==2 ) Op='-';

			tr = S(Obj.children[0]).tr("i", null, [
				"",
				{text:(v==undefined)? _oCalculator.textContent : v, css:"text-align:right;font-family:numbers"},
				(Obj.children[0].rows.length>1 && v==undefined) ? Op : " "
			]);

			if( S(Obj).attr("Estado")==1 || (v==undefined && S(Obj).attr("Estado")==0) ){
				_oCalculator.style.border = "1px solid #cf4000";
				tr.Obj = _oCalculator;
				_oCalculator.pInCalc = tr;
			}
			return true;
		}

		function Calcular(Obj, xOp){		//Falla sumar fechas
			if( Obj.children[0].rows.length<3 ){
				_CalculatorClose();
				return;
			}
			S(Obj).attr("Estado",0);

			var Res = Obj.children[0].rows[1].cells[1].textContent, n,v,
				tmp = eTrim(Obj.children[0].rows[1].cells[1].textContent).split(','), d=0,
				td = S(Obj).attr("td");

			if( tmp.length>1 ) d = tmp[1].length;

			if( xOp=='%' ){
				Res = eClearThousands(Res);
				var por = eClearThousands(Obj.children[0].rows[2].cells[1].textContent);
				Res = (por*100)/Res;
				if( Res=='Infinity' ) _CalculatorClose();
				else Res = eShowThousands(Res, 2);

			}else if( td=='F4' ){
				Res = eShowThousands(parseInt(top.eDaysInDates( Obj.children[0].rows[2].cells[1].textContent, Res)));

			}else if( td=='P4' ){
				Res = eShowThousands(top.ePeriodDiff(Res, Obj.children[0].rows[2].cells[1].textContent));

			}else if( '+,-,'.indexOf(S(Obj).attr("td"))>-1 ){
				Res = eClearThousands(Res);
				for(n=2; n<Obj.children[0].rows.length; n++){
					v = eClearThousands(Obj.children[0].rows[n].cells[1].textContent), n;
					switch( eTrim(Obj.children[0].rows[n].cells[2].textContent) ){
						case '+': Res += v; break;
						case '-': Res -= v; break;
						case '*': Res *= v; break;
						case '/': Res /= v; break;
					}
				}
				if( isNaN(Res) ) return;
				Res = eShowThousands(Res, d);
				Obj.oTD = td;
				Obj.oRes = Res;
				top._CalculatorRes = Res;
			}
			Obj.children[0].rows[Obj.children[0].rows.length-1].className = "Linea";		//style.border="1px solid red"
			Add(Res);
		}

		function IniFin(){
			var Obj = _CalculatorGet();
			if( S(Obj).attr("Estado")==0 ){
				S(Obj).attr("td",null);												//Obj.removeAttribute('td');
				while( Obj.children[0].rows.length>1 ){
					if( Obj.children[0].rows[1].Obj!=undefined ) Obj.children[0].rows[1].Obj.style.border = '';
					Obj.children[0].deleteRow(1);
				}
				if( Add() ) Show(Obj, 1);
				else _CalculatorClose();
			}else if( S(Obj).attr("Estado")==1 ){			// Resultado
				Calcular(Obj);
			}
			S.eventClear();
		}
	}
	function _CalculatorClose(){
		var o = S.event(event);
		if( o.tagName=="I" && o.innerText!="5" ){
			S(o).help("$calculator", event);
			return S.eventClear(window);
		}
		var Obj = _CalculatorGet();
		if( Obj==null ) return;
		S(Obj).attr({Estado:0, td:null});												//Obj.removeAttribute('td');
		while( Obj.children[0].rows.length>1 ){
			if( Obj.children[0].rows[1].Obj!=undefined ) Obj.children[0].rows[1].Obj.style.border = '';
			Obj.children[0].deleteRow(1);
		}
		S(Obj).none();								//top.eTagClose(Obj);
	}


	function addEvent(obj, eve, func, captura){
		if( obj.attachEvent ){
			obj.attachEvent('on'+eve, func);
		}else if( obj.addEventListener ){
			obj.addEventListener(eve, func, captura);
		}else return false;
		return true;
	}
