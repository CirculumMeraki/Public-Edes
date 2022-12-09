var _SubSubListPk = 0,
	_pCol=[];					// posicion de cada campo en el listado

function eInsertRow(tabla){
	var oTR = document.createElement("TR");
	S("TBODY", tabla).obj.appendChild(oTR);
	return oTR;
}

function eRowsFree(tabla, mensa){						// chequea que no se metan mas registro de los permitidos
	if( S(tabla.parentNode).attr("eMaxRow")!=-1 && S("TR[libre]", tabla).dim.length==0 && S("TBODY", tabla).obj.rows.length>=S(tabla.parentNode).attr("eMaxRow")*1 ){
		if( mensa==undefined || mensa ) top.eInfoError(window, 'No se admiten mas datos');
		return false;
	}
	return true;
}

function slObj(Obj){
	if( S.type(Obj)=="string" ){
		if( Obj[0]!="[" ) Obj = "["+Obj+"]";
		Obj = DGI(Obj);
	}
	return Obj;
}

function _GetPCol(Obj){									// posicion de cada campo en el listado
	Obj = slObj(Obj);
	_pCol=[];
	S("TH[campo]",Obj).each(function(k,o){
		var c = S.splitLast(" ", " "+S(o).attr("campo").replace("."," "))[1];
		_pCol[c] = S(o).attr("nc")*1-1;
	});
}

function eSLGet(id, exp, visible){
	//if( S.left(id,1)!="[" ) id = "["+id+"]";
	var tabla = slObj(id),							//DGI(id),
		oTR = S("TR", S("TBODY", tabla)).dim,
		oTH = S("TH[nc]", tabla).dim,
		tCells = oTH.length, tipo=[], block=[],
		txt=S(".TABHeaderTitle").obj.innerText+"~", xTH="", xTR, f,c,v, dim=[], dimRow=[], tr;
	//	exp = (exp!=undefined || exp==true);			// exp=undefined || false>devuelve matriz, exp!=undefined>devuelve txt
	exp = (exp || false);			// exp=undefined || false>devuelve matriz, exp!=undefined>devuelve txt
	if(visible==undefined) visible = false;

	_GetPCol(tabla);								// posicion de cada campo en el listado

	//tr = S(tabla).toTag("tr");					// obj = tabla.parentElement.parentElement;
	//tr = tabla.rows[tr.rowIndex-1];

	tr = S(tabla).toTag("tr");
	var tr2 = S(tr).toTag("tr"),
		table2 = S(tr).toTag("table");
	txt += S.trim(S(table2.rows[tr2.rowIndex-1]).text());				//class="TABMenu"
	/*
	if( S(".TABMenu", tr).length ){
		txt += S(".TABMenu", tr).text();
	}else{
		txt += S(".HR_txt", tr).text();
	}
	*/
	txt += "~";
	for(c=0; c<tCells; c++){				// tipo de datos y su visibilidad
		tipo[c] = S(oTH[c]).attr("TD");
		block[c] = ((oTH[c].offsetWidth>0 && oTH[c].getAttribute("campo")!="''") || visible);
		if( block[c] ){
			txt += "|"+tipo[c];
			xTH += "|"+oTH[c].textContent;
		}
	}
	txt += "~"+xTH;
	for(f=0; f<oTR.length; f++){			// recopila los datos				//console.log('TR: '+f);
		if( oTR[f].getAttribute("LIBRE")==1 ) continue;
		txt += "~";
		xTR = "";
		dimRow = [];
		for(c=1; c<tCells; c++){
			if( !exp || block[c] ){
				v = oTR[f].cells[c].textContent;									//console.log( c+': '+tipo[c]+' : '+v );
				switch( tipo[c] ){
					case '+': case '-': case '+,': case '-,':
						v = eClearThousands(v)*1;
						break;
					case 'C':
						v = (v=="j")?"S":"";
						break;
				}
				xTR += "|"+v;
				dimRow.push(v);
			}
		}
		if(!exp) dim.push(dimRow);												//dim.push(S.mid(xTR,1,0).split("|"));
		txt += xTR;
	}
	if(!exp) return dim;
	return txt;
}


function eISLCount(script){								// cuenta las filas rellenas de una ISubList
	var n=0;
	S(".ISubList").each(function(ik, io){
		if( io.src.indexOf(script)>-1 ){
			S("TBODY TR", S("#BROWSE", io.contentWindow).obj).each(function(pk, o){
				if( o.id!="PieLista" && o.getAttribute("LIBRE")!=1 && o.cells[0].tagName=="TD" ) n++;
			});
			return null;
		}
	});
	return n;
}

function eSLCount(Obj){									// cuenta las filas rellenas de una SubList
	Obj = slObj(Obj);
	var n=0;
	S("TBODY TR",Obj).each(function(pk, o){
		if( o.id!="PieLista" && o.getAttribute("LIBRE")!=1 && o.cells[0].tagName=="TD" ) n++;
	});
	return n;
}

function eSLInsertRow(Obj){								// igual que "eSubListInsert()"
	Obj = slObj(Obj);
	Obj.setAttribute("ENVIAR", 1);
	var n;
	for(n=1; n<Obj.rows.length-S(Obj).attr("COLSOP"); n++){
		if( S(Obj.rows[n]).attr("LIBRE")!=undefined ){
			Obj.rows[n].removeAttribute('LIBRE');
			Obj.parentNode.scrollTop = Obj.offsetHeight;
			return Obj.rows[n];
		}
	}
	var tc = Obj.rows[1].cells.length,
		oTR = eInsertRow(Obj);
	oTR.style.fontStyle = "italic";
	oTR.setAttribute("isNew", 1);
	for(n=0; n<tc; n++) oTR.insertCell();
	Obj.parentNode.scrollTop = Obj.offsetHeight;
	eSLReorder(Obj)
	return oTR;
}

function eSLRecalcColsOp(Obj){
	Obj = slObj(Obj);
	var s_ShowZero=_ShowZero, t, c, Total, f,
		AltoTH = S(Obj).attr("AltoTH")*1;
	_ShowZero = 1;
	for(c=0; c<Obj.rows[AltoTH].cells.length; c++){
		t = S(Obj.rows[AltoTH].cells[c]).attr("ColOp");			//t = Obj.rows[AltoTH].cells[c].ColOp;
		if( t!=undefined ){
			Total = 0;
			for(f=1; f<Obj.rows.length; f++){
				if( S(Obj.rows[f]).attr('LIBRE')==undefined && Obj.rows[f].id!='PieLista' ){
					switch( t ){
						case '+':
							Total += eClearThousands(Obj.rows[f].cells[c].textContent)*1;
							break;
						case 'C': case 'c':
							Total++;
							break;
						case '#':
							if( eTrim(Obj.rows[f].cells[c].textContent)!='' ) Total++;
							break;
					}
				}
			}
			Obj.rows[Obj.rows.length-1].cells[c].textContent = eShowThousands( Total, Obj.rows[AltoTH].cells[c].getAttribute("DCM") );
		}
	}
	_ShowZero = s_ShowZero;
	//_oSubLista = Obj;
}

function eSLReset(Obj){									// limpia la sublista
	Obj = slObj(Obj);
	var op = S(Obj).attr("colsop"),
		nf = S(Obj.parentNode).attr("nf"), n,c;
	for(n=0; n<Obj.rows.length-nf; n++){
		 Obj.deleteRow(1);
	}
	for(n=1; n<Obj.rows.length; n++){
		if( Obj.rows[n].id!="PieLista" && S(Obj.rows[n]).attr("libre")!=1 ){
			S(Obj.rows[n]).attr("libre", 1);
			for(c=0; c<Obj.rows[n].cells.length; c++) Obj.rows[n].cells[c].innerHTML = "&nbsp;";
		}
	}
	if(op==1) eSLRecalcColsOp(Obj);
}

function _FormularioLimpioPara(Obj, Op){				// SubListas con SubFichas
	// Muestra la SubFicha si está oculta
	if( !_CARD ){
		var tabla = S.toTag(Obj,'SPAN'),
			tr = S.toTag(Obj,'TR');
		tabla = S.toTag(tr,'TABLE');
		eShowGroup(tabla.rows[tr.rowIndex-2], false, true);
	}

	//_FormularioPaste(document.forms[Obj.slFORM].elements, Obj.slDESDE, Obj.slHASTA+1, Op);		// Restaura los valores memorizados
	_FormularioPaste(Obj.slFORM.elements, Obj.slDESDE, Obj.slHASTA+1, Op);		// Restaura los valores memorizados

	var Dim = new Array(), Tit = new Array(), xDim = new Array();
	Dim['I']='insert'; Dim['U']='update'; Dim['D']='delete'; Dim['V']='view';
	Tit['I']=eLng(84); Tit['U']=eLng(85); Tit['D']=eLng(86); Tit['V']=eLng(87);		//i:84|A INSERTAR //i:85|A MODIFICAR //i:86|A BORRAR //i:87|A CONSULTAR
	xDim['I']=top.eLng(226); xDim['U']=top.eLng(227); xDim['D']=top.eLng(228); xDim['V']='view';	//var xDim = new Array(); xDim['I']='Insertar'; xDim['U']='Modificar'; xDim['D']='Borrar'; xDim['V']='view';

	Obj.slTITLE.style.whiteSpace = 'nowrap';
	//Obj.slTITLE.textContent = ' '+eTrim(Obj.slOLDTITLE)+' '+Tit[Op]+' ';
	//alert(Obj.slOP.outerHTML);

	//Obj.slOP.style.visibility = 'visible';
	//S.toTag(Obj.slOP, "TABLE").style.visibility = 'visible';
	if( !_CARD ) S(S.toTag(Obj.slTITLE, "TABLE")).visible();

	if( Obj.slOP.tagName=="IMG" ){
		if( Op=='I' && Obj.slOP.OpInsert!=undefined ){
			Obj.slOP.src = 'g/op_insert_off.gif';
			Obj.slOP.parentNode.disabled = true;
		}else{
			if( Dim[Op]=='view' ){
				Obj.slOP.style.visibility = 'hidden';
			}else{
				Obj.slOP.src = 'g/op_'+Dim[Op]+'_0.gif';
			}
			Obj.slOP.parentNode.disabled = false;
		}
	}else{
		if( Op=='I' && Obj.slOP.OpInsert!=undefined ){
			S.toTag(Obj.slOP, "A").disabled = true;
		}else{
			if( Dim[Op]=='view' ){										//S.toTag(Obj.slOP, "TABLE").visible();
				S.toTag(Obj.slOP, "SPAN").style.visibility = 'hidden';	//S.toTag(Obj.slOP, "TABLE").style.visibility = 'hidden';
			}else{
				S.toTag(Obj.slOP, "SPAN").style.visibility = 'visible';	//Obj.slOP.src = 'g/op_'+Dim[Op]+'_0.gif';
			}
			S.toTag(Obj.slOP, "A").disabled = false;
		}
		Obj.slOP.innerText = Op;
		//Obj.slOP.className = "ICONINPUT ICON"+S.upper(xDim[Op]);
		//Obj.slOP.parentNode.parentNode.cells[1].innerText = xDim[Op];
		Obj.slOP.parentNode.childNodes[1].textContent = xDim[Op];		//var nObj = S(Obj.slOP.parentNode).html(S(Obj.slOP).HTML()+xDim[Op]); Obj.slOP = S("I",nObj).obj;
	}


	//alert( Obj.slOP.src+'\n'+Obj.slOP.outerHTML );
	//Obj.slOP.title = Obj.slTITLE.textContent;
	Obj.MODO = Op;
	//for( n=Obj.slPTR; n<=Obj.slUTR; n++ ) Obj.slTABLE[n].style.display = 'block';
	if( Op=='I' || Op=='U' ){
		if( Obj.slPRIMERO.className=='READONLY' ){
			for( var n=Obj.slDESDE; n<=Obj.slHASTA-1; n++ ){									//alert(  document.forms[Obj.slFORM].elements[n].name+'\n'+ document.forms[Obj.slFORM].elements[n].className+'\n'+document.forms[Obj.slFORM].elements[n].outerHTML );
				//if( document.forms[Obj.slFORM].elements[n].className!='READONLY' ){
				if( Obj.slFORM.elements[n].className!='READONLY' ){
					//eFocus( document.forms[Obj.slFORM].elements[n] );
					eFocus(Obj.slFORM.elements[n]);
					break;
				}
			}
		}else eFocus(Obj.slPRIMERO);
	}
	if( top.eIsWindow(window) ) Recalcula(1);		// Para recalcular las subventanas ( sale el descensor )
}


function _eSLRelation(Obj){								// SubSubList Normales
	var SL = DGI('['+Obj.RELATION+']'),
		AltoTH = S(SL).attr("AltoTH")*1,	
		r = 1+AltoTH,
		ur = r-1,
		dCol = Obj.RELATIONCOL,
		Valor = eGF(Obj.FIELDPARENT),
		ok,Alto,c;
	// Muestra los registros del padre
	for( c=1+AltoTH; c<SL.rows.length; c++ ){
		ok = (eTrim(SL.rows[c].cells[dCol].textContent)==Valor);
		SL.rows[c].style.display = ((ok)?'block':'none');
		if( ok ){
			r++;
			if( r==SL.parentNode.NF ) Alto = SL.rows[c].offsetTop+parseInt(SL.rows[c].offsetHeight)+2;
			ur = c;
		}
	}
	if( r<SL.parentNode.NF ){
		for( c=ur+1; c<SL.rows.length; c++ ) if( SL.rows[c].LIBRE==1 ){
			SL.rows[c].style.display = 'block';
			r++;
			if( r>=SL.parentNode.NF ){
				Alto = SL.rows[c].offsetTop+parseInt(SL.rows[c].offsetHeight)+2;
				break;
			}
		}
		// Crea TR nuevos limpios si hace falta
		if( r<SL.parentNode.NF ){
			var n,c,fi,ce;
			for(n=r; n<SL.parentNode.NF; n++){
				//fi = SL.insertRow();
				fi = eInsertRow(SL);
				S(fi).attr("LIBRE", 1);
				for(c=0; c<SL.children[0].all.length; c++) fi.insertCell().innerHTML = "&nbsp;";
			}
			Alto = fi.offsetTop+parseInt(fi.offsetHeight)+2;
		}
	}
	//top.eTrace( SL.id+', '+SL.parentNode.NF+'\n'+AltoNFilas(SL.id,SL.parentNode.NF) );
	DGI('c'+SL.id).style.height = Alto;
	setTimeout(function(){
		DGI('c'+SL.id).style.height = Alto;
		top.eScrollTH(DGI('c'+SL.id));
	},350);
	//DGI('c'+SL.id).style.height = AltoNFilas(SL.id,SL.parentNode.NF);		// la visible tiene que ser la primera
	_FormularioLimpioPara( SL, ((Obj.MODO=='U')?'I':'V') );		// Solo si el Padre está en modo "U" el hijo se pone en modo "I" en otro caso en modo "V"
	setTimeout( function(){ THScroll(SL.id,0); }, 250 );
	// Recalcula la ventana
	if( top.eIsWindow(window) ) top.eSWIResize(window);			//if( top.eIsWindow(window) ) top.eSWIResize(window,DGI('TABBorder').offsetWidth+top._ScrollBar+40,DGI('TABBorder').offsetHeight+top._ScrollBar+40);	//,document.body.scrollWidth+top._ScrollBar,document.body.scrollHeight+top._ScrollBar);
	//setTimeout(function(){
	//	DGI('c'+SL.id).style.height = AltoNFilas(SL.id,SL.parentNode.NF);
	//	if( top.eIsWindow(window) ) top.eSWIResize(window,DGI('TABBorder').offsetWidth+top._ScrollBar+40,DGI('TABBorder').offsetHeight+top._ScrollBar+40);	//,document.body.scrollWidth+top._ScrollBar,document.body.scrollHeight+top._ScrollBar);
	//},500 );
	//return eClearEvent();
}

function eSubList(Op){
	eSLAction(null, Op);
}

function eSLAction(xObj, Op, SM, oEvent){				// Ejecuta una op de una sublista mediante un icono de la SubLista	//alert(_Mode);
	S.public(1);
	_SLAction(xObj, Op, SM, oEvent);
	S.public(0);
}
function _SLAction(xObj, Op, SM, oEvent){				// Ejecuta una op de una sublista mediante un icono de la SubLista	//alert(_Mode);
	if( Op==undefined ){
		Op = xObj;
		xObj = null;
	}
	if( xObj==null ){
		var o = oEvent || S.event(window);
		if( o.disabled ) return eClearEvent();
		xObj = top.eSubStr(S.toTag(o,'TABLE').id, 1, -1);
	}
	Op = Op.toUpperCase();

	var Obj = DGI('['+xObj+']'),
		AltoTH = S(Obj).attr("AltoTH")*1, n, c;

	if( Obj.disabled && /(I|U|E|D|DA)/.test(Op) ) return S.eventClear(window);		// op validas: F,

	if( Op=='I' ){							// SubSubList
		if( !eRowsFree(Obj) ) return;
		if( Obj.SUBLISTPADRE!=undefined ){
			var el = DGI(Obj.SUBLISTPADRE);
			if( eGF(el.FIELDPARENT)=='' ){
				top.eInfo(window, eLng(197, DGI(Obj.SUBLISTPADRE).slOLDTITLE));				//i:197|Falta seleccionar la subficha "#"
				return;
			}else if( el.MODO=='I' ){
				top.eInfo(window, eLng(198, DGI(Obj.SUBLISTPADRE).slOLDTITLE));				//i:198|La subficha "#" no puede estar en modo alta
				return;
			}
		}
	}

	if( Op=='F' || Op=='E' ){
		var NumFieldNom = -1, p;
		for(p=0; p<_SaveList.length; p++){
			var Dim = _SaveList[p].split('|');
			if( Dim[0]==Obj.id ){
				for(c=0; c<Obj.rows[AltoTH].cells.length; c++){
					var tmp = S(Obj.rows[AltoTH].cells[c]).attr("CAMPO").split('.');
					if( tmp[tmp.length-1]==Dim[4] || S(Obj.rows[AltoTH].cells[c]).attr("CAMPO")==Dim[4] ){
						NumFieldNom = c;
						break;
					}
				}
				if( NumFieldNom!=-1 ) break;
			}
		}
		if( NumFieldNom==-1 ){
			alert('Definición erronea');
			return;
		}

		//var sFILE = Obj.FILE;
		//if( sFILE.substr(0,1)=='>' ) sFILE = sFILE.substr(1);
		var o = S.toTag(oEvent || S.event(window),'TR'), c, CAMPO, tmp;
		for(c=0; c<Obj.rows[AltoTH].cells.length; c++){
			CAMPO = S(Obj.rows[AltoTH].cells[c]).attr("CAMPO");
			tmp = CAMPO.split('.');
			if( CAMPO==S(Obj).attr("FIELDFILE") || tmp[tmp.length-1]==S(Obj).attr("FIELDFILE") ){
				var nFile = eTrim(o.cells[c].textContent);
				if( nFile=='' ){
					top.eInfo(window,eLng(169));		//169|No hay fichero
					return eClearEvent();
				}
				//if( nFile.indexOf(':') > -1 ){								// Local
					//VerFile('>'+nFile);
				if( o.cells[c].getAttribute("NumFile")!=null ){
					S.preview(o.cells[c].getAttribute("numFile"), window);
				}else if( o.cells[c].getAttribute("NewValue")!=null && o.cells[c].getAttribute("NewValue")!="" ){
					VerFile('>'+o.cells[c].getAttribute("NewValue"));
				}else{															// Servidor
					var down = (event && event.type=="contextmenu")?"1":"0";
					if( S(Obj).attr("oDIR")=="" ){		// Fichero grabado en ddbb
						for(var p=0; p<_SaveList.length; p++){
							var Dim = _SaveList[p].split('|');
							if( Dim[0]==Obj.id ){						// campo,tabla,ntx,valor,extension,NomFile
								var xNomSrv = S(S.toTag(o,'TABLE')).attr("FILECONTENT")+'|'+Dim[1]+'|'+Dim[4]+'|'+o.cells[NumFieldNom].textContent+'|'+nFile+((_DB=='')?'':'&_DB='+_DB);
								top.eCallSrv(window, 'edes.php?D:*'+xNomSrv+"&_DOWN="+down);
								return eClearEvent();
							}
						}
					}
					var Dim = nFile.split('.'),					//top.eFileType(NomFile);
						NomSrv = S(Obj).attr("SUBDIR")+'/'+S(Obj).attr("ePrefix")+eTrim(o.cells[NumFieldNom].textContent)+'.'+Dim[Dim.length-1];
						//NomLocal = '{dir}tmp/'+eTrim(o.cells[NumFieldNom].textContent)+'.'+Dim[Dim.length-1];		// 02-11-2009	//var NomLocal = S(Obj).attr("SUBDIR")+'/'+eTrim(o.cells[2].textContent);
					if( Op=='E' ){												// Ver el fichero en local o en servidor	if( event.type=='contextmenu' ){					// ENVIA EL FICHERO MODIFICADO alert( event.button );
						return eClearEvent();
						//top.eDocUpdate( NomSrv, NomLocal, null, window );		//eDocUpdate("/_datos/doc/2.doc","/_datos/doc/ticket.doc");
					}else if( Op=='F' ){
						top.eCallSrv(window, 'edes.php?D:'+NomSrv+'&FILE='+nFile+'&SUBLIST=1'+"&_DOWN="+down);
					}
					return eClearEvent();
				}
			}
		}
		return;
	}else if( Op=='DA' ){					// DeleteAll
		var oTR;
		for(n=Obj.rows.length-1; n>AltoTH; n--){
			oTR = Obj.rows[n];
			if( oTR.id!='PieLista' ) S(oTR).attr("LIBRE",1);	
			for(c=0; c<oTR.cells.length; c++) oTR.cells[c].innerHTML = "&nbsp;";
		}
		return;
	}

	// posicion de cada campo en el listado
		pCol=[];
		S("TH[campo]",Obj).each(function(k,o){
			var c = S.splitLast(" ", " "+S(o).attr("campo").replace("."," "))[1];
			pCol[c] = S(o).attr("nc")*1-1;
		});

	// Si es FormOnLine con SubFicha
	for(n=0; n<_SaveOnLine.length; n++){											// Primer y último campo
		var tmp = _SaveOnLine[n].split('|');
		if( xObj==tmp[0] ){
			var Obj = DGI('['+xObj+']');
			if( Obj.slTABLE==undefined ) _eSLConfig(xObj);
			Obj.MODO = Op;
			var o = oEvent || S.event(window);
			while( o.tagName!='TABLE' ){
				if( o.tagName=='TR' ) break;
				o = o.parentNode;
			}
			if( o.tagName!='TR' ) return eClearEvent();

			if( SM==undefined ){
				//alert('eSLAction:INI '+SM+' - MODO: '+Obj.MODO);			// Siempre despues de hacer todo
				try{
					var w = eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('L', 'S', Obj.MODO, o.rowIndex, (Obj.MODO=='I')?null:o, window, pCol);		// slMODE, slROW	( slID ) Before
					if( typeof(w)=='boolean' && !w ) return;
				}catch(e){}
			}
			_FormularioLimpioPara(Obj, Op);
			if( Op!='I' ){
				if( SM==undefined ){
					Obj.FILA = o.rowIndex;
					Obj.setAttribute("FILA", o.rowIndex);
				}
				_FormularioModificaIncr(Obj);
			}
			if( SM==undefined ){
				//alert('eSLAction:FIN');			// Siempre después de hacer todo
				try{
					eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('L', 'E', Obj.MODO, o.rowIndex, (Obj.MODO=='I')?null:o, window, pCol);		// slMODE, slROW	( slID ) Before
				}catch(e){}
			}
			if( Obj.getAttribute('RELATION')!=null ) _eSLRelation( Obj );		// SubSubList
			return eClearEvent();
		}
	}

	// Si es FormStatic con SubVentana
	var Obj = DGI('m['+xObj+']');
	if( Obj==null ){
		top.eAlert(S.lng(212), eLng(141,xObj,Op), 'A','E');		//i:141|Falta por definir la etiqueta <b>"{slMenu}"</b><br>del objeto <b>"#1"</b><br>en el modo <b>"#2"</b>
		return;
	}

	var o = oEvent || S.event(window);
	while(o.tagName!='TABLE'){
		if( o.tagName=='TR' ) break;
		o = o.parentNode;
	}
	if( o.tagName!='TR' ) return eClearEvent();
	o.parentNode.parentNode.FILA = o.rowIndex;

	var Dim = new Array(); Dim['I']='a'; Dim['U']='mR'; Dim['D']='bR'; Dim['V']='cR';
	gsClickSMenu(Obj, 'F'+Dim[Op]);
	eClearEvent();
}


//---------------------------------------------------------------------------------------------------------------------------------------------------


function _FormularioReadOnly(t, Desde, Hasta, Op){		// Memoriza los valores de los campos actuales
	if( t==undefined ){
		t = document.FRM1.elements;
		Desde = 0;
		Hasta = t.length;
		if( DGI("zTitulo")!=null ) DGI("zTitulo").TITULO = DGI("zTitulo").textContent;
	}
	for(var n=Desde; n<Hasta; n++){
		if( t[n].tagName=='FIELDSET' || t[n].type=='button' ) continue;
		t[n].readOnly = true;															//t[n].eDisabled = true;
		t[n].className = 'READONLY';
		if( t[n].type=="checkbox" ){
			_eCheck( t[n].name, t[n].eReadOnly );				//if( t[n].getAttribute('CheckBox')!=null ) _eCheck( t[n].name, t[n].eReadOnly );
		}else if( t[n].type=="radio" ){
			_eRadio( t[n].name, t[n].eReadOnly );				//else if( t[n].getAttribute('RadioButton')!=null ) _eRadio( t[n].name, t[n].eReadOnly );
		}else if( DGI('_INPUT_'+t[n].name)!=null ){
			DGI('_INPUT_'+t[n].name).readOnly = t[n].eReadOnly;
		}else{
			if( S(t[n]).attr("eFileName")!=null ){
				//t[n].disabled = false;				// para habilitar en los campos file el click en el campo
				S(eIndex(t[n].sourceIndex+1)).visibility(Op=='a' || Op=='m' || Op=='A' || Op=='M' || Op=='I' || Op=='U');
			}
		}
	}
}

function _FormularioCopy(t, Desde, Hasta){				// Memoriza los valores de los campos actuales
	if( t==undefined ){
		t = document.FRM1.elements;
		Desde = 0;
		Hasta = t.length;
		if( DGI("zTitulo")!=undefined ) DGI("zTitulo").TITULO = DGI("zTitulo").textContent;
	}
	var c, Obj, n, oIMG=null;
	for(c=Desde; c<Hasta; c++){															//for( var n=0; n<t.length; n++ ){
		if( t[c].tagName=='FIELDSET' || t[c].type=='button' ) continue;					//if( t[c].type=='radio' ) continue;
		t[c].BAK = t[c].value;															//alert( 'cp: '+t[c].name+'\n'+t[c].BAK );	//alert( t[c].name+'\n:'+t[c].value);

		if( /^(?:CHECKBOX|RADIO)$/i.test(t[c].type) ){
			t[c].BAK = t[c].checked;													//alert( 'cp: '+t[c].name+'\n'+t[c].BAK );	//alert( t[c].name+'\n:'+t[c].value);
		}else{
			t[c].BAK = t[c].value;														//alert( 'cp: '+t[c].name+'\n'+t[c].BAK );	//alert( t[c].name+'\n:'+t[c].value);
		}

		if( t[c].getAttribute("eUpload")!=null ) t[c].setAttribute("eBakUpload", t[c].getAttribute("eUpload"));
		t[c].eReadOnly = t[c].readOnly;													//if( t[c].readOnly ) t[c].readOnly = false;
		t[c].eDisabled = t[c].disabled;
		t[c].eClass = t[c].className;													//alert( n+': '+t[c].name+'\n'+t[c].BAK+'\n'+t[c].eBakUpload+'\n'+t[c].eReadOnly+'\n'+t[c].eDisabled+'\n'+t[c].eClass );
		//eIconNext(t[c], "M");
	}
}

/*
function eIconNext( Obj, On ){							// pone el icono que está a la derecha "hidden" para ponerolo "visibility" solo en "a" y "mR"
	var c, Obj, n, oIMG=null;
	if( t[c].offsetWidth>0 ){
		Obj = t[c];
		n=1;
		try{
			if( eIndex(Obj.sourceIndex+n).tagName=='NOBR' ) n++;
			if( Obj.name.indexOf('_INPUT_')>-1 ){
				// Si el select no se ha abirto nunca es el "else" si no es el "if"
				if( eIndex(Obj.sourceIndex+n).tagName=='IMG' ) oIMG = eIndex(Obj.sourceIndex+n);
				else if( eIndex(Obj.sourceIndex+n).nextSibling.tagName=='IMG' ) oIMG = eIndex(Obj.sourceIndex+n).nextSibling;
			}else if( eIndex(Obj.sourceIndex+n).tagName=='INPUT' ){
				if( eIndex(Obj.sourceIndex+n).readOnly ){
					n++;
					if( eIndex(Obj.sourceIndex+n).tagName=='IMG' ) oIMG = eIndex(Obj.sourceIndex+n);
				}
			}else if( eIndex(Obj.sourceIndex+n).tagName=='IMG' ){
				oIMG = eIndex(Obj.sourceIndex+n);
			}else if( Obj.name==undefined ){
			}else if( Obj.tagName=='INPUT' ){
				if( eIndex(Obj.sourceIndex+1).tagName=='IMG' ) oIMG = eIndex(Obj.sourceIndex+1);
			}
			if( oIMG!=null && oIMG.offsetWidth>0 ){
				while( oIMG.tagName=='IMG' ){
					oIMG.setAttribute("eDisabled",1);
					S(oIMG).hidden(); 
					oIMG = eIndex(oIMG.sourceIndex+1);
				}
			}
		}catch(e){}
	}
}
*/

function _FormularioPaste(t, Desde, Hasta, Op){			// Restaura los valores memorizados
	if( t==undefined ){
		if(Op==null) Op = '';										// ...ojo...ultimo
		t = document.FRM1.elements;
		Desde = 0;
		Hasta = t.length;
		try{
			_CampoFoco.focus();																//SiguienteCampo(0);
		}catch(e){}
	}
	var n, Ini, Fin;
	for(n=Desde; n<Hasta; n++){																//for( var n=0; n<t.length; n++ ){
		if( t[n].tagName=='FIELDSET' || t[n].type=='button' ) continue;						//if( t[n].type=='radio' ) continue;
		if( t[n].className=='error' ) t[n].className = 'EDITABLE';							//alert( 'Chequea: '+t[n].outerHTML);

		// Limpia la selección de los campos select y limpia los subselect
		if( t[n].name.substring(0,7)=='_INPUT_' ){
			if( t[n].value!='' && t[n].BAK=='' ){
				try{
					if( t[n].IND!=-1 ) DGI(t[n].name.substr(7)+'_TABLE').rows[t[n].IND].cells[1].id = '';		// Quita la ultima seleccion
				}catch(e){}
				try{
					if( t[n].onchange!=null ){
						if( (t[n].onchange+'').indexOf('S.selectReset(')>-1 ){
							Ini = (t[n].onchange+'').split('S.selectReset(');
							Fin = Ini[1].split(')');
							eval('S.selectReset('+Fin[0]+');');
						}
					}
				}catch(e){}
			}
		}

		try{
			if( t[n].type!="file" ) t[n].value = t[n].BAK;							// t[n].type = "text"; t[n].value = t[n].BAK; t[n].type = "file";
		}catch(e){
			//for(i in e) console.log(arguments.callee.name+' > '+t[n].name+' = '+i+': '+e[i]);
		}

		if( /^(?:CHECKBOX|RADIO)$/i.test(t[n].type) ){
			t[n].checked = t[n].BAK;
		}else{
			if( t[n].getAttribute("NumFile") ) t[n].removeAttribute("NumFile");
			if( t[n].eBakUpload!=undefined ){
				t[n].setAttribute("eUpload", t[n].getAttribute("eBakUpload"));		// ...ojo...	sField.title = Obj.sTITLE;
				 //_ViewFilePC(t[n], '');											// Mostrar el icono del ver File del PC activo ON / OFF
			}
			if( t[n].BAK==undefined ) t[n].BAK = '';								// Pasa en G7 / Clientes / Documentos
			if( t[n].type!="file" ) t[n].value = t[n].BAK;
			if( t[n].eHTML!=undefined ) eGO(t[n].name+'_').textContent = '';
		}

		if( t[n].SubMode=='A' ){
			if( Op!='I' ){
				t[n].readOnly = true;
				t[n].className = 'READONLY';
			}else{
				t[n].readOnly = t[n].eReadOnly;
				t[n].className = 'EDITABLE';
			}
			t[n].disabled = t[n].readOnly;			//t[n].eDisabled;
		}else{
			t[n].readOnly = t[n].eReadOnly;
			t[n].disabled = t[n].readOnly;			//t[n].eDisabled;
			t[n].className = (t[n].eReadOnly || Op=='D' || Op=='V') ? 'READONLY' : 'EDITABLE';		// Si Op='D' (delete) Op='V' (view) todo desabilitado
			if( t[n].className=='READONLY' ) t[n].readOnly = true;
			if( S(t[n]).attr("eFileName")!=null ){
				t[n].disabled = false;				// para abilitar en los campos file el click en el campo
				S(eIndex(t[n].sourceIndex+1)).visibility(Op=='a' || Op=='m' || Op=='A' || Op=='M' || Op=='I' || Op=='U');
			}
		}
		if( DGI('_INPUT_'+t[n].name)!=null ){
			DGI('_INPUT_'+t[n].name).readOnly = t[n].eReadOnly;
			DGI('_INPUT_'+t[n].name).disabled = t[n].eReadOnly;
		}
	}
}


function _FormularioModifica(){							// SubLista->SubVentana (al final de la carga). Solo si Ficha (_Obj=='F') se ejecuta desde la SubVentana
	var DimMode = {'a':'I','A':'I','m':'U','b':'D','c':'V'}, CAMPO,
		DCampo = _ChildrenData[3].split(','),
		OCampo = _ChildrenData[4].split(','),
		Obj = _WOPENER.DGI(_ChildrenData[0]),								//mObj = _WOPENER.DGI("m"+_ChildrenData[0]),
		OpExe = S("#OpExe").obj, o;
	if( Obj==null ){
		top.eAlert(S.lng(212), eLng(88,_ChildrenData[0]), 'A','E');			//i:88|El objeto "#" no existe
		return;
	}

	var oTR = Obj.rows[Obj.FILA];
	_Mode = Obj.MODO;

	// posicion de cada campo en el listado
		pCol=[];
		S("TH[campo]",Obj).each(function(k,o){
			var c = S.splitLast(" ", " "+S(o).attr("campo").replace("."," "))[1];
			pCol[c] = S(o).attr("nc")*1-1;
		});

	try{
		var w = _WOPENER.eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('L', 'S', DimMode[Obj.MODO], (Obj.MODO=='a')?-1:Obj.FILA, (Obj.MODO=='a')?null:oTR, window, pCol);		// Start
		if( typeof(w)=='boolean' && !w ) return;
	}catch(e){}		//for( var i in e ) alert(i+': '+e[i]);

	if( Obj.MODO!='a' ){
		if( Obj.MODO=="m" ){
			_FormularioPaste(null, null, null, Obj.MODO);
		}else{
			_FormularioReadOnly(null, null, null, Obj.MODO);
		}
		var AltoTH = S(Obj).attr("AltoTH")*1, n,d, oTD;
		for(n=0; n<Obj.rows[AltoTH].cells.length; n++){
			oTD = oTR.cells[n];
			for(d=0; d<DCampo.length; d++){
				CAMPO = S(Obj.rows[AltoTH].cells[n]).attr("CAMPO");
				if( CAMPO==DCampo[d] || (CAMPO.indexOf('.')==1 && CAMPO.substring(2)==DCampo[d]) ){								//alert( DCampo[d]+'\n'+OCampo[d]+'\n'+DGI('_INPUT_'+OCampo[d]));
					if( OCampo[d]!='IMG' && OCampo[d].substring(0,1)!='*' ){
						//o = S(":"+OCampo[d]).obj;
						if( eGO(OCampo[d]).type=="checkbox" ){						//if( eGO(OCampo[d]).getAttribute('CheckBox')!=null ){
							//ePF( OCampo[d], ((oTD.innerHTML.indexOf('tf_1.')>-1) ? _CheckBoxSave[0] : _CheckBoxSave[1]) );		// S / ''
							ePF(OCampo[d], ((oTD.innerText=="j") ? _CheckBoxSave[0] : _CheckBoxSave[1]));		// S / ''
						}else if( eGO(OCampo[d]).type=="radio" ){					//}else if( eGO(OCampo[d]).getAttribute('RadioButton')!=null ){
							ePF(OCampo[d], oTD.textContent);
						}else{
							if( Obj.rows[AltoTH].cells[n].getAttribute("MILES") ){
								//S(":"+OCampo[d]).obj.value = oTD.textContent;
								ePF(OCampo[d], eClearThousands(oTD.textContent));
							}else{
								//if( DGI(OCampo[d]).getAttribute('iSS')!=null ){
								//	//ePF( OCampo[d], eTrim(oTD.textContent) );
								//	eGO(OCampo[d]).value = eTrim(oTD.textContent);
								//}else
								//if( DGI(OCampo[d]).getAttribute('SS')!=null ){
								//	_DimRelationFields[_DimRelationFields.length] = 'ePutRelationFields("'+OCampo[d]+'", "'+eTrim(oTD.textContent)+'");';
									//ePutRelationFields(OCampo[d], eTrim(oTD.textContent));
									//S(":"+OCampo[d]).attr("SetValue", eTrim(oTD.textContent));
								//}else{
									if( eGO(OCampo[d]).tagName=='TEXTAREA' ){
										if( S(":"+OCampo[d]).attr("eHTML")!=null ){
											ePF(OCampo[d], eTrim(oTD.innerHTML));								//oTD.textContent = eGF(OCampo[d]).replace(/\r\n/g,'<BR>');
										}else{
											ePF(OCampo[d], S.replace(eTrim(oTD.innerHTML), "<br>", S.char(10)));
										}
										//if( S(":"+OCampo[d]).attr("eHTML")!=null ){
										//ePF( OCampo[d], eTrim(oTD.innerHTML) );								//oTD.textContent = eGF(OCampo[d]).replace(/\r\n/g,'<BR>');
										//oTD.innerHTML = S.replace(S(":"+OCampo[d]).val(), S.char(10), "<br>");						//eGF(OCampo[d]); - chr(10)				//oTD.textContent = eGF(OCampo[d]).replace(/\r\n/g,'<BR>');
									}else{
										if( S(':_INPUT_'+OCampo[d]).length==0 ){
											S(":"+OCampo[d]).obj.value = eTrim(oTD.textContent);
											//ePF( OCampo[d], eTrim(oTD.textContent) );						//oTD.textContent = eGF(OCampo[d]).replace(/\r\n/g,'<BR>');
										}else{
											if( DGI('_INPUT_'+OCampo[d]).getAttribute('SS')!=null ){
												_DimRelationFields[_DimRelationFields.length] = 'ePutRelationFields("'+OCampo[d]+'", "'+eTrim(oTD.textContent)+'",1);';
												//ePutRelationFields(OCampo[d], eTrim(oTD.textContent), 1);
											}else{
												ePF(OCampo[d], eTrim(oTD.textContent));
											}
										}
										//ePF( OCampo[d], eTrim(oTD.textContent) );							//ePF( OCampo[d], eTrim(oTD.textContent).replace(/(<BR>)+/gi,'\r\n') );
										//ePF( OCampo[d], eTrim(oTD.textContent), S(':_INPUT_'+OCampo[d]).length==0 );
									}
									if( S(oTD).attr("NUMFILE") && S(":_FILE_"+OCampo[d]).exists() ){
										S(":"+OCampo[d]).attr("NUMFILE", S(oTD).attr("NUMFILE"));			// numero temporal del fichero de sublistas
									}
								//}
							}
						}
						if( Obj.MODO=='b' || Obj.MODO=='c' ){
							var e = eGO(OCampo[d]);
							if( eGO(OCampo[d]).type=="checkbox" ){									//if( eGO(OCampo[d]).getAttribute('CheckBox')!=null ){
								_eCheck(OCampo[d], false);
							}else if( eGO(OCampo[d]).type=="radio" ){								//}else if( eGO(OCampo[d]).getAttribute('RadioButton')!=null ){
								_eRadio(OCampo[d], false);
							}else{
								e.readOnly = true;
								if( DGI('_INPUT_'+OCampo[d])!=null ) DGI('_INPUT_'+OCampo[d]).readOnly = true;
							}
						}
					}else if( OCampo[d].substring(0,1)=='*' ){
						ePF('_INPUT_'+OCampo[d].substring(1), eTrim(oTD.textContent), false);									//ePF( OCampo[d], eTrim(oTD.textContent).replace(/(<BR>)+/gi,'\r\n') );
					}
					break;
				}
			}
		}
		_ExeDimRelationFields();	// undefinde, undefined, undefined, );
	}

	OpExe.style.visibility = 'visible';		//OpExe.style.display = 'block';
	OpExe.title = '';

	_ModeSubList = Obj.MODO;					// Define en la SubVentana el modo en que se está ejecutando
	switch( Obj.MODO ){
		case "a":
			_FormularioPaste(null, null, null, Obj.MODO);
			S("I",OpExe).text("I");
			OpExe.childNodes[1].textContent = eLng(136);							//S(OpExe).html(S("I",OpExe).HTML()+eLng(136));
			if( _FieldFocus!="" ) setTimeout('eFocus("'+_FieldFocus+'");',100);														//setTimeout('SiguienteCampo("'+_FieldFocus+'");',100);
			break;
		case "m":
			S("I",OpExe).text("U");
			OpExe.childNodes[1].textContent = eLng(137);							//S(OpExe).html(S("I",OpExe).HTML()+eLng(137));
			if( _FieldFocus!="" ) setTimeout('eFocus("'+_FieldFocus+'");',100);														//setTimeout('SiguienteCampo("'+_FieldFocus+'");',100);
			break;
		case "b":
			S("I",OpExe).text("D");
			OpExe.childNodes[1].textContent = eLng(138);							//S(OpExe).html(S("I",OpExe).HTML()+eLng(138));
			break;
		case "c":
			OpExe.style.visibility = 'hidden';		//OpExe.style.display = 'none';
			break;
	}

	try{
		var w = _WOPENER.eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('L', 'E', DimMode[Obj.MODO], (Obj.MODO=='a')?-1:Obj.FILA, (Obj.MODO=='a')?null:oTR, window, pCol);		// Start
		if( typeof(w)=='boolean' && !w ) return;
	}catch(e){}		//for(var i in e) alert(i+': '+e[i]);
}



function _DuplicaCampoFile(oTabla, oTD, oFile, dbIndex){
	var win = S.objWindow(oTabla);

	oTabla.setAttribute("oDIR", S(oFile).attr("oDIR"));								// Directorio destino
	oTabla.setAttribute("DBINDEX", dbIndex);
	oTD.textContent = oFile.value;													// eGF(OCampo[d]); 		//oTD.setAttribute("ENVIAR", 1);	// Indica enviar el fichero
	oTD.setAttribute("eUpload", oFile.getAttribute("eUpload"));						// oTD.setAttribute("eFileUpdate", S.date("H,i,s,m,d,Y", oFile.files[0].lastModifiedDate));
	oTD.setAttribute("NewValue", oFile.getAttribute("NewValue"));
	oTabla.setAttribute("ePrefix", oFile.getAttribute("ePrefix"));

	if( oTD.getAttribute("NewValue")!=null && oTD.getAttribute("NewValue")!="" ){	// mueve el campo FILE al padre y le da un numero temporal
		var slNumFile = S(oFile).attr("NUMFILE");									// var slNumFile = S(":"+OCampo[d]).attr("NUMFILE");
		if( slNumFile ){
			S(":_FILE_"+slNumFile, win).nodeRemove();
		}else{
			win._slNumFile++;
			slNumFile = win._slNumFile;
		}

		var o = S(":_FILE_"+oFile.name).obj,										// var o = S(":_FILE_"+OCampo[d]),
			cont = o.parentNode,
			name = o.name,
			id = o.id,
			vBak = o.getAttribute("BAK"),
			oFORM = oFile.form,														// oFORM = S.toTag(oTabla,'FORM');
			hFORM = oFile.form,														// oFORM = S.toTag(oTabla,'FORM'); ***nuevo***
			bak = S("<input name='_TMP_' type='file' class='EDITABLE' style='display:none'>").obj;		// bak = S(o).nodeCopy();

		S(oTD).attr("NUMFILE", slNumFile);											// obj.eDivide = 0 / 1;
		oFile.removeAttribute("NUMFILE");
		
		// El campo file actual se renombra como "_FILE_1/2/..."
			S(o).attr("NUMFILE", slNumFile);
			o.name = "_FILE_"+slNumFile;
			o.id = "_FILE_"+slNumFile;												// el.NUMFILE = OCampo[d]+'_'+_slNumFile;
			o.setAttribute("eSizeFile", oFile.getAttribute("eSizeFile"));
			o.setAttribute("eFileUpdate", oFile.getAttribute("eFileUpdate"));
			//S(o).none();

		if( oTabla.getAttribute("formstatic")==1 ){									// if( oFORM==null ){	// 2020-04-01
			var ot = S.toTag(oTabla, 'TABLE', 1);
			if( S.left(ot.id,9)=="TABNumber" ){
				oFORM = S(":FRM"+S.mid(ot.id,9,0), win).obj;						// oFORM = S("FORM", ot).obj;
			}
		}
		//if( o.form!==oFORM ) 
		//S(o).nodeMove(oFORM);														// S(o).nodeMove(_WOPENER.document.FRM1);
		//S(o).nodeMoveFirst(oFORM);

		oFORM.appendChild(o);														// FRM1
		bak.name = name;
		bak.id = id;
		//bak.form = oFORM;
		bak.setAttribute("BAK", vBak);
		//S(bak).nodeEnd(cont);														// fijo -> padre
		S(bak).nodeEnd(hFORM);														// fijo -> padre	***nuevo***
		//S(bak).nodeBegin(cont);
	}
}


var _oSubLista;
function _FormularioASubLista(){						// SubVentana->SubList - Del Formulario a la SubLista, solo si FICHA ( _Obj=='F' )
	var DimMode = {'a':'I','A':'I','m':'U','b':'D','c':'V'},
		DCampo = _ChildrenData[3].split(','), n, d, ModeCheck = '',
		OCampo = _ChildrenData[4].split(','),
		Obj = _WOPENER.DGI(_ChildrenData[0]),
		CAMPO;

	// posicion de cada campo en el listado
		pCol=[];
		S("TH[campo]",Obj).each(function(k,o){
			var c = S.splitLast(" ", " "+S(o).attr("campo").replace("."," "))[1];
			pCol[c] = S(o).attr("nc")*1-1;
		});

	try{
		var w = _WOPENER.eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('F', 'S', DimMode[Obj.MODO], (Obj.MODO.toUpperCase()=='A')?-1:Obj.rows[Obj.FILA].rowIndex, (Obj.MODO.toUpperCase()=='A')?null:Obj.rows[Obj.FILA], window, pCol);		// Start
		if( typeof(w)=='boolean' && !w ) return;
	}catch(e){}


	// Evita duplicados en la sublista
	if( Obj.getAttribute('SLUNIQUE')!=null && (Obj.MODO=='m' || Obj.MODO=='a' || Obj.MODO=='A') ){
		var n,i,d,igual;
		for(n=0; n<_DimChildrenData.length; n++){
			if( _DimChildrenData[n][0]==Obj.id ){
				for(i=0; i<_DimChildrenData[n].length; i++) _ChildrenData[i] = _DimChildrenData[n][i];
				break;
			}
		}

		var UCampo = Obj.getAttribute("SLUNIQUE").split('|'),					// Campos únicos
			xUCampo = (UCampo.length==2) ? eTrim(UCampo[1]) : 'Registro duplicado',
			AltoTH = S(Obj).attr("AltoTH")*1;
			UFCampo = UNCampo = '';

		UCampo = S.nsp(UCampo[0]).split(',');
		for(d=0; d<UCampo.length; d++){
			UCampo[d] = eTrim(UCampo[d]);
			for(n=0; n<OCampo.length; n++){
				DCampo[n] = eTrim(DCampo[n]);
				if( DCampo[n]==UCampo[d] ){
					if( UFCampo!='' ){
						UFCampo += ',';
						UNCampo += ',';
					}
					if( OCampo[n][0]=="*" ){							// para los select
						UFCampo += "_INPUT_"+S.mid(OCampo[n],1,0);
					}else{
						UFCampo += OCampo[n];
					}
					UNCampo += ''+n;
				}
			}
		}
		if( UNCampo=='' ){
			alert('ERROR:\n{slUnique} mal definido');
			return;
		}

		UFCampo = UFCampo.split(',');
		UNCampo = UNCampo.split(',');		//alert( UFCampo+'\n'+UNCampo );
		for(n=1+parseInt(AltoTH); n<Obj.rows.length-S(Obj).attr("COLSOP"); n++){
			if( Obj.rows[n].getAttribute('LIBRE')==undefined ){
				igual = UFCampo.length;
				for(d=0; d<UFCampo.length; d++){
					if( ((Obj.MODO=='m' && Obj.getAttribute("FILA")!=n) || Obj.MODO=='a') ){
						if( DGI(UFCampo[d]).type=="checkbox" ){
							if( (eTrim(Obj.rows[n].cells[UNCampo[d]].textContent)=="j" && DGI(UFCampo[d]).value=="S") || (eTrim(Obj.rows[n].cells[UNCampo[d]].textContent)!="j" && DGI(UFCampo[d]).value=="") ){
								igual--;
							}
						}else if( eTrim(Obj.rows[n].cells[UNCampo[d]].textContent)==DGI(UFCampo[d]).value ){
							igual--;
						}
					}
				}
				if( igual==0 ){
					_SLRegDupicado = Obj.rows[n].cells;
					for(d=0; d<Obj.rows[n].cells.length; d++) Obj.rows[n].cells[d].style.backgroundColor = 'red';
					Obj.parentNode.scrollTop = Obj.rows[n].offsetTop - Obj.rows[AltoTH].offsetHeight;
					top.eAlert(S.lng(212), xUCampo.replace(/\#/g,n), 'A', 'E', window.SLRegDuplicado);
					return false;
				}
			}
		}
	}

	// movido el 2018-12-07
	var NomFunc='', Nom = _ChildrenData[0].substring(1,_ChildrenData[0].length-1);
	try{ NomFunc = typeof(_WOPENER.eval('JSCheck'+Nom)); }catch(e){}													//alert( 'NomFunc: '+NomFunc );
	if( NomFunc=='function' || NomFunc=='object' ){		// Chequeo en la función de usuario {slJSCheck}		//alert( '1: '+Obj.id+'\n2: '+ Obj.MODO+'\n3: '+ ((Obj.MODO=='I')? -1 : Obj.FILA)+'\n4: '+ Obj.rows+'\n5: '+Nom+'\n6: '+ModeCheck );
		if( !_WOPENER.eval('JSCheck'+Nom)(Obj.id, ModeCheck, ((ModeCheck=='I')? -1 : Obj.FILA), Obj.rows, window, pCol) ) return false;		//_WOPENER.eval('JSCheck'+Nom)( Obj.id, Obj.MODO, ((Obj.MODO=='I')? -1 : Obj.FILA), Obj.rows );
	}

	switch( Obj.MODO ){
		case "A":
		case "a":
			ModeCheck = 'I';
			Obj.MODO = 'a';
			d = 0;
			for(n=1; n<Obj.rows.length-S(Obj).attr("COLSOP"); n++){
				if( S(Obj.rows[n]).attr("LIBRE")!=undefined ){
					Obj.rows[n].removeAttribute('LIBRE');
					d = n;
					Obj.MODO = 'A';
					var oTR = Obj.rows[n];
					break;
				}
			}
			if( d>0 ) break;
			/*
			if( S(Obj).attr("COLSOP")==1 ){
				var oTR = Obj.insertRow(Obj.rows.length-1);
			}else{
				var oTR = Obj.insertRow();
			}
			*/
			var oTR = eInsertRow(Obj);
			Obj.FILA = oTR.rowIndex;
			Obj.setAttribute("FILA", oTR.rowIndex);
			oTR.style.fontStyle = "italic";
			break;
		case "m":
			ModeCheck = 'U';
			var oTR = Obj.rows[Obj.FILA];
			oTR.style.fontStyle = "italic";
			break;
		case "b":
			ModeCheck = 'D';
			S("TD",Obj.rows[Obj.FILA]).each(function(pk, o){		// borra el fichero temporal si se modifico
				if( S(o).attr("NUMFILE") ){
					S(":_FILE_"+S(o).attr("NUMFILE"), _WOPENER).nodeRemove();
				}
			});
			Obj.deleteRow(Obj.FILA);
			//if( !_WOPENER._Question ) _WOPENER._UpdateForm = true;	//top.eTron('Se modifico CHR');
			break;
		case "c":
			return eClearEvent();
	}

	var AltoTH = S(Obj).attr("AltoTH")*1;
	if( Obj.MODO=='a' || Obj.MODO=='A' || Obj.MODO=='m' ){
		//if( !_WOPENER._Question ) _WOPENER._UpdateForm = true;		//top.eTron('Se modifico CHR');

		//S("TH[CAMPO]",Obj).each(function(pk, oTD){
		//	CAMPO = S(oTD).attr("CAMPO");
		//});
		//var Dim = S("TH[CAMPO]",Obj).dim;
		//for(n=0; n<Dim.length; n++){
			//var oTD = (Obj.MODO=='a') ? oTR.insertCell() : Dim[n];

		for(n=0; n<Obj.rows[AltoTH].cells.length; n++){
			var oTD = (Obj.MODO=='a') ? oTR.insertCell() : oTR.cells[n];
			for(d=0; d<DCampo.length; d++){
				if( DCampo[d]=='' ) continue;
				CAMPO = S(Obj.rows[AltoTH].cells[n]).attr("CAMPO");																				//CAMPO = S(Dim[n]).attr("CAMPO");
				if( CAMPO==DCampo[d] || (CAMPO.indexOf('.')==1 && CAMPO.substring(2)==DCampo[d]) ){												//console.log( n+","+d+" ["+OCampo[d]+"]");
					if( OCampo[d]=='IMG' ){
						if( Obj.MODO=='a' || Obj.MODO=='A' ) oTD.innerHTML = _ChildrenData[8].replace("<br>","\n");

					}else if( OCampo[d].substring(0,1)=='*' ){
						oTD.textContent = S(":"+OCampo[d].substring(1)).option();					// oTD.textContent = eSelectValue(OCampo[d].substring(1));
					}else{
						if( Obj.rows[AltoTH].cells[n].getAttribute("MILES") ){
							oTD.textContent = S(":"+OCampo[d]).obj.value;	//eShowThousands(eGF(OCampo[d]), Obj.rows[AltoTH].cells[n].getAttribute("DCM"));					// valores numéricos con miles
						}else{

							// Campo tipo FILE: _FormularioASubLista() / SubVentana->SubList
							if( S(eGO(OCampo[d])).attr("oDIR")!=undefined ){
								if( eGF(OCampo[d])!='' ){													// Si se ha mofificado el fichero
									_DuplicaCampoFile(Obj, oTD, eGO(OCampo[d]), _DBINDEX);					// nuevo sistema de envio de ficheros: tabla, td, file, dbIndex
									/* para Enviar fichero directamente
										Obj.setAttribute("oDIR", S(eGO(OCampo[d])).attr("oDIR"));				// Directorio destino
										Obj.setAttribute("DBINDEX", _DBINDEX);
										oTD.textContent = eGF(OCampo[d]);										//oTD.setAttribute("ENVIAR", 1);	// Indica enviar el fichero
										oTD.setAttribute("eUpload", eGO(OCampo[d]).getAttribute("eUpload"));						//oTD.setAttribute("eFileUpdate", S.date("H,i,s,m,d,Y", oFile.files[0].lastModifiedDate));
										oTD.setAttribute("NewValue", eGO(OCampo[d]).getAttribute("NewValue"));
										Obj.setAttribute("ePrefix", eGO(OCampo[d]).getAttribute("ePrefix"));
										if( oTD.getAttribute("NewValue")!=null ){				// mueve el campo FILE al padre y le da un numero temporal
											var slNumFile = S(":"+OCampo[d]).attr("NUMFILE");
											if( slNumFile ){
												S(":_FILE_"+slNumFile, _WOPENER).nodeRemove();
											}else{
												_WOPENER._slNumFile++;
												slNumFile = _WOPENER._slNumFile;
											}

											var o = S(":_FILE_"+OCampo[d]),
												cont = o.obj.parentNode,
												bak = S("<input name='_TMP_' type='file' class='EDITABLE'>").obj,				//bak = S(o).nodeCopy();
												name = o.obj.name,
												id = o.obj.id,
												vBak = o.obj.BAK;

											S(oTD).attr("NUMFILE", slNumFile);													// obj.eDivide = 0 / 1;
											S(o.obj).attr("NUMFILE", slNumFile);
											
											o.obj.name = "_FILE_"+slNumFile;
											o.obj.id = "_FILE_"+slNumFile;														// el.NUMFILE = OCampo[d]+'_'+_slNumFile;

											S(o).none();
											S(o).nodeMove(S.toTag(Obj,'FORM'));													//S(o).nodeMove(_WOPENER.document.FRM1);

											bak.name = name;
											bak.id = id;
											bak.setAttribute("BAK", vBak);
											S(bak).nodeEnd(cont);							// fijo -> padre
										}
									*/

									// muestra el icono de ver el documento
									if( S("TD[newvalue]", oTR).length==1 && S(".ICON-DESCARGAR", oTR).length==1 ){
										S.visibility(S(".ICON-DESCARGAR", oTR), /^(png|jpg|jpeg|gif|bmp|tif|tiff|pdf|csv|txt|mp4)$/i.test(S.fileType(S(oTD).text())));										//S.visibility(S(".ICON-DESCARGAR", oTR), /^(png|jpg|jpeg|gif|bmp|tif|tiff|pdf|csv|txt|mp4)$/i.test(S.fileType(S("TD[newvalue]").attr("NewValue"))));
									}
								}

							}else{
								if( eGO(OCampo[d]).type=="checkbox" ){				//if( eGO(OCampo[d]).getAttribute('CheckBox')!=null ){
									//oTD.innerHTML = '<img src="g/tf_'+((eGF(OCampo[d])==_CheckBoxSave[0])?'1':'0')+'.gif">';		// S
									oTD.innerHTML = '<i class="ICONINPUT">'+((eGF(OCampo[d])==_CheckBoxSave[0])?'j':'i')+'</i>';		// S
								}else if( eGO(OCampo[d]).type=="radio" ){			//}else if( eGO(OCampo[d]).getAttribute('RadioButton')!=null ){
									oTD.textContent = eGF(OCampo[d]);
								}else if( eGO(OCampo[d]).tagName=='TEXTAREA' ){
									if( S(":"+OCampo[d]).attr("eHTML")!=null ){
										oTD.innerHTML = S(":"+OCampo[d]).val();
									}else{
										oTD.innerHTML = S.replace(S(":"+OCampo[d]).val(), S.char(10), "<br>");						//eGF(OCampo[d]); - chr(10)				//oTD.textContent = eGF(OCampo[d]).replace(/\r\n/g,'<BR>');
									}
								}else{
									oTD.textContent = S(":"+OCampo[d]).obj.value;		//oTD.textContent = eGF(OCampo[d]);		//oTD.textContent = eGF(OCampo[d]).replace(/\r\n/g,'<BR>');
								}
							}
						}
					}
					break;
				}
			}
		}
	}


	if( Obj.MODO=='a' || Obj.MODO=='A' ){
		Obj.parentNode.scrollTop = Obj.offsetHeight;
	}
	Obj.setAttribute("ENVIAR", 1);
	
	if( S(Obj).attr("COLSOP") ){				// Operaciones en Columna
		var s_ShowZero=_ShowZero, c, t, Total, f;
		_ShowZero = 1;
		for(c=0; c<Obj.rows[AltoTH].cells.length; c++){
			t = S(Obj.rows[AltoTH].cells[c]).attr("ColOp");			//t = Obj.rows[AltoTH].cells[c].ColOp;
			if( t!=undefined ){
				Total = 0;
				for(f=1; f<Obj.rows.length; f++){
					if( S(Obj.rows[f]).attr('LIBRE')==undefined && Obj.rows[f].id!='PieLista'  ){
						switch( t ){
							case '+':
								Total += eClearThousands( Obj.rows[f].cells[c].textContent )*1;
								break;
							case 'C': case 'c':
								Total++;
								break;
							case '#':
								if( eTrim( Obj.rows[f].cells[c].textContent )!='' ) Total++;
								break;
						}
					}
				}
				Obj.rows[Obj.rows.length-1].cells[c].textContent = eShowThousands( Total, Obj.rows[AltoTH].cells[c].getAttribute("DCM") );
			}
		}
		_ShowZero = s_ShowZero;
	}


	if(_ChildrenData[6]!=''){					// Operaciones en Columna
		var s_ShowZero=_ShowZero; _ShowZero=1, Total, f,
			tmp = _ChildrenData[6].split(',');
		for(n=0; n<tmp.length; n++){
			tmp[n] = eTrim(tmp[n]);
			if( tmp[n]!='' ){
				Total = 0;
				for(f=1+parseInt(AltoTH); f<Obj.rows.length; f++){
					if( S(Obj.rows[f]).attr('LIBRE')==undefined && Obj.rows[f].id!='PieLista'  ){
						switch( tmp[n] ){
							case '+':
								Total += eClearThousands( Obj.rows[f].cells[n].textContent )*1;
								break;
							case 'C': case 'c':
								Total++;
								break;
							case '#':
								if( eTrim( Obj.rows[f].cells[n].textContent )!='' ) Total++;
								break;
						}
					}
				}
				Obj.rows[Obj.rows.length-1].cells[n].textContent = eShowThousands( Total, Obj.rows[AltoTH].cells[n].getAttribute("DCM") );
			}
		}
		_ShowZero = s_ShowZero;
	}


	if( _ChildrenData[7]!='' ){					// Funcion de usuario
		if( Obj.MODO=='b' ) oTR = null;
		eval(_ChildrenData[7])(oTR);
	}

	/*	// movido el 2018-12-07
	var NomFunc='', Nom = _ChildrenData[0].substring(1,_ChildrenData[0].length-1);
	try{ NomFunc = typeof(_WOPENER.eval('JSCheck'+Nom)); }catch(e){}													//alert( 'NomFunc: '+NomFunc );
	if( NomFunc=='function' || NomFunc=='object' ){		// Chequeo en la función de usuario {slJSCheck}		//alert( '1: '+Obj.id+'\n2: '+ Obj.MODO+'\n3: '+ ((Obj.MODO=='I')? -1 : Obj.FILA)+'\n4: '+ Obj.rows+'\n5: '+Nom+'\n6: '+ModeCheck );
		_WOPENER.eval('JSCheck'+Nom)(Obj.id, ModeCheck, ((ModeCheck=='I')? -1 : Obj.FILA), Obj.rows, window);		//_WOPENER.eval('JSCheck'+Nom)( Obj.id, Obj.MODO, ((Obj.MODO=='I')? -1 : Obj.FILA), Obj.rows );
	}
	*/

	if( Obj.MODO=='b' ){							// Para mantener siempre el mismo nº de filas visibles
		oTR = null;
		if( Obj.rows.length<S(Obj).attr("TRVISIBLES") ){
			/*
			if( S(Obj).attr("COLSOP")==1 ){
				var oTR = Obj.insertRow(Obj.rows.length-1);
			}else{
				var oTR = Obj.insertRow();
			}
			*/
			oTR = eInsertRow(Obj);
			S(oTR).attr("LIBRE",1);
			for(n=0; n<Obj.rows[AltoTH].cells.length; n++) oTR.insertCell().innerHTML = "&nbsp;";
		}
	}

	eSLReorder(Obj);
	_FormularioPaste(null, null, null, Obj.MODO);
	_FormStaticConect = false;
	_oSubLista = Obj;

	try{
		var w = _WOPENER.eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('F', 'E', DimMode[Obj.MODO], (Obj.MODO=='b')?-1:oTR.rowIndex, (Obj.MODO=='b')?null:oTR, window, pCol);		// Start
		if( typeof(w)=='boolean' && !w ) return eClearEvent();
	}catch(e){}

	setTimeout(function(){
		S(_oSubLista.parentNode).eventFire("scroll");
		if( Obj.MODO=='m' || Obj.MODO=='b' ){
			S.window(window);												//S(window).window();		//S.windowHidden(window);		//top._eSWMini( window.frameElement.id.substring(4) );
		}
	}, 250);

	return eClearEvent();
}

// FormOnLine

function _slOption( el ){								// Se ejecuta con la barra espaciadora -> despues ejecutará "_slClick( Obj )"
	var k = S.eventCode(event),
		Char = String.fromCharCode(k).toUpperCase();
	if( k==13 ){
		var sl = el.children[0].name.substring(6);
		if( event.shiftLeft ){
			eFocus(DGI('['+sl+']').slULTIMO);
		}else{
			eFocus(DGI('['+sl+']').slPRIMERO);
		}
	}
	if( Char==' ' || k==119 || k==121 ){
		S(el).eventFire("click");										// F8 / F10 || k==121 / F12:123
	}
	return eClearEvent();
}

function _eSLConfig(txt){
	if( _Mode=='A' ) return;

	if( !_CARD ){
		var TCampos = 0,					// Evita que en Consultas de error cuando no se muestra la sublista
			Primero = Ultimo = null, MaxFile=0, n,i;
		for(n=0; n<_DimChildrenData.length; n++){										// Primer y último campo
			if( _DimChildrenData[n][0]=='['+txt+']' ){
				var oNomObj = _DimChildrenData[n][3].split(','),
					NomObj = _DimChildrenData[n][4].split(',');
				for(i=0; i<NomObj.length; i++){
					if( oNomObj[i]==_DBINDEX ){
						alert('ERROR: El campo "'+oNomObj[i]+'" no puede estar dentro de [EditList]');
						return;
					}

					oNomObj[i] = oNomObj[i].replace(/&#44;/g,',');
					if( oNomObj[i].indexOf(')')>-1 ){
						var tmp = oNomObj[i].split(')');
						oNomObj[i] = eTrim(tmp[tmp.length-1]);
					}

					if( NomObj[i]=='IMG' ) continue;
					if( NomObj[i].substring(0,1)=='*' ) NomObj[i] = NomObj[i].substring(1);		// Por la seleccion del "textContent" ( *Campo )
					_InFormOnLine[NomObj[i]] = 1;																// Campo de [FormOnLine], evita chequearlo al hacer submit
					if( NomObj[i].substring(0,1)!="'" && NomObj[i].substring(0,1)!='"' ){
						var Obj = DGI(NomObj[i]);

						if( Obj==null && (_Mode=='cR' || _Mode=='bR') ) continue;
						TCampos++;

						//if( Obj==null ) continue;

						Obj.setAttribute("F10", 1);	// = true;					// Para aceptar las subfichas con F10
						//if( _DefCampo[ NomObj[i] ].Tipo.toUpperCase()=='F' ){					// 'file' Crea un contenedor para el fichero
						/*
						if( Obj.type=='file' ){									// 'file' Crea un contenedor para el fichero
							_InFormOnLine['_FILE_'+NomObj[i]] = 1;				// Campo de [FormOnLine], evita chequearlo al hacer submit

							DGI('['+txt+']').FILE = NomObj[i];					// Campo file en el Formulario virtual				//document.FRM1.enctype='multipart/form-data';

							var tmp = _DimChildrenData[n][1].split(',');
							for( var p=0; p<tmp.length; p++ ){
								var tmp2 = tmp[p].split('=');
								if( tmp2[1]==NomObj[i] ){						// if( eTrim(tmp2[1])==NomObj[i] ){
									DGI('['+txt+']').FIELDFILE = tmp2[0];		// Campo file en la ddbb // eTrim(tmp2[0]) 
									//DGI('['+txt+']').sTITLE = eGO(tmp2[0]).title;	// a.archivo
									break;
								}
							}

							if( _Mode=='mR' ){		// Cuenta los campos file a generar
								var ObjTABLA = DGI('['+txt+']');
								for( var r=1; r<ObjTABLA.rows.length; r++ ){
									if( eTrim(ObjTABLA.rows[r].cells[i].textContent)!='' ) MaxFile++;
								}
							}
							//var ta = document.createElement('SPAN');		// Contenedor para ocultar los campos FILE
							//ta.id = '_SPAN['+txt+']'; ta.style.display = 'none'; document.body.appendChild(ta);
						}
						*/
						if( Obj.TYPEFILE!=undefined ) DGI('['+txt+']').FIELDFILE = oNomObj[i];		// Para cR,bR
						/* para Enviar fichero directamente
							if( Obj.getAttribute("eByts")!=null && (Obj.getAttribute("eByts")*1)>(S.setup.maxFileUploads*1) ){				//*1.35
								Obj.setAttribute("eByts", S.setup.maxFileUploads/1.35);
								S.info("Tamaño máximo de fichero superado.<br>Se establecerá en "+eShowThousands(Obj.getAttribute("eByts"))+" Bytes");
							}
						*/
						//if( Obj.getAttribute('CheckBox')!=null ){
						//	DGI(Obj.sourceIndex+1).F10 = true;
						//}else if( Obj.getAttribute('RadioButton')!=null ){
						//}else 
						if( DGI('_INPUT_'+Obj.name)!=null ){
							DGI('_INPUT_'+Obj.name).setAttribute("F10",1);	// = true;					// Para aceptar las subfichas con F10
						}else if( Obj.eDefault!=undefined ) Obj.value = Obj.eDefault;
						if( Primero==null ) Primero = Obj.sourceIndex;
						Ultimo = Obj.sourceIndex;
					}
				}
			}
		}
		if( TCampos==0 ) return;

		var Restar = 0;
		//if( document.body.children[Ultimo].type=='checkbox' ){
		//	Ultimo++;				// Si es un checkbox el último se le tiene que sumar 1 porque tiene mas elementos
		//	Restar = 1;
		//}

		var pTR = uTR = Titulo = null, oTable, p, t;		//, dim;

		//SubMenu....................: <tr d="]" ttr="-"><td class="TABMenuContainer"><table class="TABMenu"><tbody><tr><td class="TABMenuSeparator">&nbsp;</td><td class="TABMenuOn">...
		//Linea sin titulo...........: <tr st="" ttr="-"><td><div class="Separator"></div>
		//linea con titulo...........: <tr st="" ttr="-"><td><table><tbody><tr><td><hr></td><th class="HR_txt">&nbsp;&nbsp;...&nbsp;&nbsp;
		//linea con titulo (tipo TAB): <tr st="" ttr="-"><td class="TABMenuOne"><table class="TABMenu"><tbody><tr><td class="TABMenuSeparator">&nbsp;</td><td class="TABMenuOn TABOnly">...

		for(p=Primero-1; p>0; p--){									// Busca el primero y el titulo
			e = S(eIndex(p)).toTag("TR");
			oTable = S(e).toTag("TABLE");
			if( oTable.className=="TABMiddle" || oTable.className=="TABStyle" ){						//dim = S("TR[ttr='-']",oTable).dim;
				i = e.rowIndex;
				for(n=i; n>=0; n--){
					if( oTable.rows[n].getAttribute("ttr")=="-" ){		// el TR que delimita la SubList por encima
						e = oTable.rows[n];
						pTR = e;
						if(	S(".TABMenuOn", e).length ){
							Titulo = S(".TABMenuOn", e).obj;
							break;
						}else if( S(".HR_txt", e).length ){
							Titulo = S(".HR_txt", e).obj;
							break;
						}else if( S(".Separator", e).length ){
							Titulo = S(".Separator", e).obj;
							break;
						}
					}
				}
				break;
			}else if( oTable.className=="Columns" ){
				e = oTable.rows[e.rowIndex];
				pTR = e;
				Titulo = S("legend", S(e).toTag("TR",1)).obj;
				break;
			}
		}

		/*
		for(n=Primero-1; n>0; n--){															// Busca el primero y el titulo
			e = eIndex(n);						//e = document.body.children[n];
			if( (e.tagName=='TH' && e.className=='HR_txt') || e.className=='TABMenu' ){
				Titulo = e;
				if( e.className=='TABMenu' || e.className=='HR_txt' ){
					pTR = Titulo.parentNode.parentNode;
					Titulo = pTR.children[0];					//Titulo.parentNode;
				}
				if( pTR!=null ) break;
			}
			if( ',INPUT,TEXTAREA,BODY,'.indexOf(','+e.tagName+',') > -1 ) break;			// && e.name.substr(0,6)!='_FILE_' && e.name!='MAX_FILE_SIZE'
			if( e.sT!=undefined ){
				pTR = e;					//if( e.tagName=='TR' && e.id==']' ) pTR = e;
				if( Titulo!=null ) break;
			}
		}
		if( Titulo!=null && Titulo.children.length==1 ){
			Titulo = Titulo.children[0];
		}else if( Titulo.className=='TABMenu' ){
		}
		*/

		n = Ultimo-1;
		e = eIndex(n);						//e = document.body.children[n];
		while( e.tagName!='TR' && e.id!=']' && n>0 ) e = eIndex(--n);						//e = document.body.children[--n];
		uTR = e;
		var Obj = DGI('['+txt+']');			//SubLista
		//for(n=Ultimo+1; n<document.children.length; n++){									// Busca el último
		t = eIndex();
		for(n=Ultimo+1; n<t; n++){												// Busca el último
			e = eIndex(n);														// e = document.body.children[n];
			if( e.type=='checkbox' && e.className=='slBUTTON' ){				// e.tagName=='A' || e.tagName=='A' -> Para los checkbox
				//Obj.slOP = eIndex(n+2);										// document.body.children[n+2];
				for(p=n+1; p<t; p++){
					Obj.slOP = eIndex(p);
					if( Obj.slOP.tagName=="I" ) break;
				}
				break;
			}
			if( 'TEXTAREA,HR'.indexOf(e.tagName)>-1 ) break;											//INPUT,
			if( e.tagName=='DIV' && e.id=='OpExe' ) break;
		}
		if( Obj.slOP==undefined ){
			// Si no lo encuentra lo busca desde la tabla de la SubList
			var el = DGI('c['+txt+']');
			for(n=el.sourceIndex-1; n>0; n--){
				e = eIndex(n);																			//e = document.body.children[n];
				if( ',INPUT,TEXTAREA,'.indexOf(','+e.tagName+',')>-1 ){
					Obj.slOP = e;
					if( e.type=='checkbox' && e.className=='slBUTTON' ) Obj.slOP = eIndex(n+2);			//document.body.children[n+2];
					break;
				}
			}
			if( Obj.slOP==undefined ){
				alert('Objeto ['+txt+'] {slMenu} no encontrado');
				return;
			}
		}

		if( pTR==null || uTR==null || Titulo==null ){
			Obj = 'Error en Objeto ['+txt+'] ';
			if( pTR==null ) alert(Obj+'primer campo no encontrado');	//TR donde está el título del inicio de la subLista
			if( uTR==null ) alert(Obj+'último campo no encontrado');
			if( Titulo==null ) alert(Obj+'título no encontrado');		//TD donde está el título de la subFicha
			return;
		}

		var TB = S.toTag(pTR,'TABLE'), r;				// tabla TABNumber1													//while( TB.tagName!='TABLE' ) TB = TB.parentNode;
		Obj.slOLDTITLE = eTrim(Titulo.textContent);		// título de la subFicha
		Obj.slTITLE = Titulo;							// objeto TD donde está el titulo
		Obj.slTITLE.style.whiteSpace = 'nowrap';																			//Obj.slTITLE.textContent = '  SUBFICHA '+eTrim(Obj.slOLDTITLE)+'  ';		//+' A INSERTAR '
		Obj.slOP.title = Obj.slTITLE.textContent;		// título de ls SubFicha												//S.toTag(Obj.slOP,"TABLE").onmouseenter = function(){S(this).tip(Obj.slTITLE.textContent,-1);}

		Obj.slTABLE = TB.rows;							// solo marca que está definido - TRs de TABNumber1
		Obj.slPRIMERO = eIndex(Primero);				// Primer Input de la SubFicha										//document.body.children[Primero];
		Obj.slULTIMO = eIndex(Ultimo-Restar);			// Ültimo Input de la SubFicha										//document.body.children[Ultimo-Restar];		//alert( Obj.slULTIMO.name );

		Obj.slPTR = pTR.rowIndex;						// no se usa
		Obj.slUTR = uTR.rowIndex;						// no se usa
		Obj.slFORM = Obj.slPRIMERO.form;				// formulario donde está ls subFicha								//Obj.slFORM = _DefCampo[Obj.slPRIMERO.name].Formulario-1;

		Obj.MODO = 'I';
		Obj.slDESDE = null;								//nº del primer campo del formulario subFicha
		Obj.slHASTA = null;								//nº del último campo del formulario subFicha
		Obj.slCheckDESDE = null;						//nº del primer campo del formulario subFicha en la matriz _cForm
		Obj.slCheckHASTA = null;						//nº del último campo del formulario subFicha en la matriz _cForm

		// Prepara el hacer una copia de la página inicial del Formulario incrustado
		var el = Obj.slFORM.elements;
		for(n=0; n<el.length; n++){
			if( Obj.slHASTA==null ){
				if( el[n].name==Obj.slULTIMO.name || el[n].name=='_INPUT_'+Obj.slULTIMO.name ) Obj.slHASTA = n+1;							// || el[n].name=='_FILE_'+Obj.slULTIMO.name
			}
			if( Obj.slDESDE==null ){
				if( el[n].name==Obj.slPRIMERO.name || el[n].name=='_INPUT_'+Obj.slPRIMERO.name ) Obj.slDESDE = n;							// || el[n].name=='_FILE_'+Obj.slPRIMERO.name
			}
		}
		for(n=0; n<_cForm.length; n++){
			if( Obj.slCheckHASTA==null ){
				if( _cForm[n].Nombre==Obj.slULTIMO.name || _cForm[n].Nombre=='_INPUT_'+Obj.slULTIMO.name ) Obj.slCheckHASTA = n+1;			// || _cForm[n].Nombre=='_FILE_'+Obj.slULTIMO.name
			}
			if( Obj.slCheckDESDE==null ){
				if( _cForm[n].Nombre==Obj.slPRIMERO.name || _cForm[n].Nombre=='_INPUT_'+Obj.slPRIMERO.name ) Obj.slCheckDESDE = n;			// || _cForm[n].Nombre=='_FILE_'+Obj.slPRIMERO.name
			}
		}
		/* TEST
			var TB			 = TABNumber1 (object tabla)		S.toTag(pTR,'TABLE'), r;				// tabla TABNumber1													//while( TB.tagName!='TABLE' ) TB = TB.parentNode;
			* Obj.slOLDTITLE	 = "Concepto"				// título de ls SubFicha		// título de la subFicha
			* Obj.slTITLE		 = oTD (donde está "Concepto");							// objeto TD donde está el titulo
			* Obj.slOP.title	 = "Concepto"				// título de ls SubFicha												//S.toTag(Obj.slOP,"TABLE").onmouseenter = function(){S(this).tip(Obj.slTITLE.textContent,-1);}

			* Obj.slOP		 = ___op__deta (objeto input)
			Obj.slTABLE		 = [TB.rows];							// TRs de TABNumber1
			* Obj.slPRIMERO		 = _cd_fc_pedido_detalle (object) / _cd_fc_pedido_detalle	// Primer Input de la SubFicha										//document.body.children[Primero];
			- Obj.slULTIMO		 = _importe (object) / _suplido					// Ültimo Input de la SubFicha										//document.body.children[Ultimo-Restar];		//alert( Obj.slULTIMO.name );

											Obj.slPTR = pTR.rowIndex;						// no se usa
											Obj.slUTR = uTR.rowIndex;						// no se usa
			* Obj.slFORM		= FRM1 (object)				// formulario donde está ls subFicha								//Obj.slFORM = _DefCampo[Obj.slPRIMERO.name].Formulario-1;

			* Obj.MODO		= 'I'
			- Obj.slDESDE		= 15 / 14				//nº del primer campo del formulario subFicha
			Obj.slHASTA		= 26 / 28				//nº del último campo del formulario subFicha
			* Obj.slCheckDESDE	= 14					//nº del primer campo del formulario subFicha en la matriz _cForm
			- Obj.slCheckHASTA	= 25 / 29				//nº del último campo del formulario subFicha en la matriz _cForm
		*/
	}else{
		//S("SPAN[id='c[_deta]']").obj.sourceIndex
		//S(".TABMenuOne, .HR_txt, .Separator, .Columns").each(function(k,o){ console.log(o.sourceIndex+" > "+o.outerHTML) });
		
		var iSubList = S("SPAN[id='c["+txt+"]']").obj.sourceIndex,
			Obj = DGI('['+txt+']'), siTitleSubList=null;												// objeto SubLista

		S("SPAN[id='c["+txt+"]']").css("display:contents");

		Obj.slOP = S(":___op_"+txt).obj;
		Obj.MODO = 'I';
		Obj.slTABLE = 1;					// solo marca que está definido

		S(".card-header, .card-title").each(function(k,o){						//S(".TABMenuOne, .HR_txt, .Separator, .Columns").each(function(k,o){
			if( o.sourceIndex<iSubList ) siTitleSubList = o.sourceIndex;
		});

		S(".card-header, .card-title").each(function(k,o){						//S(".TABMenuOne, .HR_txt, .Separator, .Columns").each(function(k,o){
			if( o.sourceIndex<iSubList && o.sourceIndex<siTitleSubList ){
				pTR = o;
				Titulo = o;
				Obj.slTITLE = o;
				Obj.slOP.title = o.textContent;
				Obj.slOLDTITLE = o.textContent;
			}
		});
		S("FORM").each(function(k,o){
			if( o.sourceIndex<iSubList ) Obj.slFORM = o;
		});

		var el = Obj.slFORM.elements;
		Obj.slDESDE = null;
		for(n=0; n<el.length; n++){
			if( el[n].sourceIndex>Titulo.sourceIndex && el[n].sourceIndex<siTitleSubList ){
				if( Obj.slDESDE==null ){
					Obj.slPRIMERO = el[n];
					Obj.slDESDE = n;
				}
				if( !/^_INPUT_/.test(el[n].name) ){
					Obj.slULTIMO = el[n];
					Obj.slHASTA = n;
				}
			}
		}

		for(n=0; n<_cForm.length; n++){
			if( Obj.slCheckHASTA==null ){
				if( _cForm[n].Nombre==Obj.slULTIMO.name || _cForm[n].Nombre=='_INPUT_'+Obj.slULTIMO.name ) Obj.slCheckHASTA = n+1;			// || _cForm[n].Nombre=='_FILE_'+Obj.slULTIMO.name
			}
			if( Obj.slCheckDESDE==null ){
				if( _cForm[n].Nombre==Obj.slPRIMERO.name || _cForm[n].Nombre=='_INPUT_'+Obj.slPRIMERO.name ) Obj.slCheckDESDE = n;			// || _cForm[n].Nombre=='_FILE_'+Obj.slPRIMERO.name
			}
		}
		

		//Obj.slOLDTITLE = eTrim(Titulo.textContent);		// título de la subFicha
		///Obj.slTITLE = Titulo;							// objeto TD donde está el titulo
		Obj.slTITLE.style.whiteSpace = 'nowrap';																			//Obj.slTITLE.textContent = '  SUBFICHA '+eTrim(Obj.slOLDTITLE)+'  ';		//+' A INSERTAR '
		///Obj.slOP.title = Obj.slTITLE.textContent;		// título de la SubFicha												//S.toTag(Obj.slOP,"TABLE").onmouseenter = function(){S(this).tip(Obj.slTITLE.textContent,-1);}

		//sin uso:	Obj.slTABLE = TB.rows;							// TRs de TABNumber1
		//Obj.slPRIMERO = eIndex(Primero);				// Primer Input de la SubFicha										//document.body.children[Primero];
		//Obj.slULTIMO = eIndex(Ultimo-Restar);			// Ültimo Input de la SubFicha										//document.body.children[Ultimo-Restar];		//alert( Obj.slULTIMO.name );

			//Obj.slPTR = pTR.rowIndex;						// no se usa
			//Obj.slUTR = uTR.rowIndex;						// no se usa
		//Obj.slFORM = Obj.slPRIMERO.form;				// formulario donde está ls subFicha								//Obj.slFORM = _DefCampo[Obj.slPRIMERO.name].Formulario-1;

		//Obj.MODO = 'I';
		//Obj.slDESDE = null;								//nº del primer campo del formulario subFicha
		//Obj.slHASTA = null;								//nº del último campo del formulario subFicha
		//	Obj.slCheckDESDE = null;						//nº del primer campo del formulario subFicha
		//	Obj.slCheckHASTA = null;						//nº del último campo del formulario subFicha
	}

	_FormularioCopy(Obj.slFORM.elements, Obj.slDESDE, Obj.slHASTA);																		//_FormularioCopy(document.forms[Obj.slFORM].elements, Obj.slDESDE, Obj.slHASTA);

	for(r=0; r<MaxFile; r++){
		n = r+1;
		// Clonando elemento
		var el = DGI(Obj.FILE),			//alert(el.name+'\n'+Obj.FILE);		//var el = document.getElementsByName( Obj.FILE );
			oClone = S(el).nodeCopy();
		DGI('_SPANFILE').appendChild(oClone);								//document.body.appendChild( oClone );					//document.FRM1.appendChild( oClone );	//el.parentNode.appendChild( oClone );					//alert( el.outerHTML+'\n'+el.sourceIndex+'\n\n' + oClone.outerHTML+'\n'+oClone.sourceIndex);
		S(el).nodeSwap(oClone);
		Obj.rows[n].NUMFILE = n;
		el.name = Obj.FILE+'_'+n;
		el.id = Obj.FILE+'_'+n;
		el.NUMFILE = Obj.FILE+'_'+n;
		_WOPENER._slNumFile++;
	}

	// Si la SubLista (con subFicha) no tiene op de altas pondrá los campos desabilitados ?????
	var Obj2 = DGI('m['+txt+']');
	if( Obj2!=null ){
		TCampos = 0;
		Obj2 = Obj2.getElementsByTagName("TD");			//Obj2 = Obj2.cells;
		for(n=0; n<Obj2.length; n++) if( Obj2[n].getAttribute('gsOP')=='I' ) TCampos = 1;
		if( TCampos==0 ){
			Obj.IniInsert = 0;
			_FormularioLimpioPara(Obj, 'V');
			_FormularioReadOnly(Obj.slFORM.elements, Obj.slDESDE, Obj.slHASTA, Obj.MODO);								//_FormularioReadOnly(document.forms[Obj.slFORM].elements, Obj.slDESDE, Obj.slHASTA);
		}
	}

	// SubSubList
	if( Obj.getAttribute('SUBLISTPADRE')!=null ){				// Desavilita los campos de la SubList Hija
		_FormularioLimpioPara(Obj, 'V');
	}
	if( Obj.getAttribute('RELATION')!=null ){					// Calcula campos de relación
		var SL = DGI('['+Obj.RELATION+']'), c,n,tmp, tmp2,
			dCampo = Obj.RELATIONFIELD, oCampo = hCampo = '', dCol = -1;
		//setTimeout( function(){ DGI('c['+Obj.RELATION+']').style.height = AltoNFilas( '['+Obj.RELATION+']', DGI('['+Obj.RELATION+']').parentNode.NF )+'px'; },500 );
		// Destino
		for(c=0; c<SL.rows[0].cells.length; c++){
			if( S(SL.rows[0].cells[c]).attr("CAMPO")==dCampo ){			// Campo de relación					alert( SL.rows[0].cells[c].outerHTML );
				dCol = c;
				break;
			}
		}
		// Origen
		for(n=0; n<_DimChildrenData.length; n++){
			if( _DimChildrenData[n][0]==Obj.id ){				//alert( _DimChildrenData[n][1] );			//alert( _DimChildrenData[n][0] );
				tmp = _DimChildrenData[n][1].split(',');
				for(c=0; c<tmp.length; c++){
					tmp2 = tmp[c].split('=');
					var tmp3 = tmp2[0].split('.'); if( tmp3.length==2 ) tmp2[0] = tmp3[1];			//top.eFileType(NomFile);
					if( tmp2[0]==dCampo ){
						oCampo = tmp2[1];						//alert( tmp2[1] );
						break;
					}
				}
			}else if( _DimChildrenData[n][0]=='['+Obj.RELATION+']' ){
				tmp = _DimChildrenData[n][1].split(',');
				for(c=0; c<tmp.length; c++){
					tmp2 = tmp[c].split('=');
					var tmp3 = tmp2[0].split('.'); if( tmp3.length==2 ) tmp2[0] = tmp3[1];			//top.eFileType(NomFile);
					if( tmp2[0]==dCampo ){
						hCampo = tmp2[1];						//alert( tmp2[1] );
						break;
					}
				}
			}
		}
		if( dCol>-1 && oCampo!='' ){							//alert( oCampo+'\n'+dCol+'\n'+SL.id );
			SL.SUBLISTPADRE = Obj.id;
			Obj.RELATIONCOL = dCol;
			Obj.FIELDPARENT = oCampo;
			Obj.FIELDCHILD = hCampo;
		}
	}
}


function _slDelChildren(Obj){							// SubSubList
	//alert( 'Borrar Hijos\n'+Obj.outerHTML );
	var TABLA = DGI('['+Obj.RELATION+']'), n, 
		Valor = eGF(Obj.FIELDPARENT),
		TR = TABLA.rows;
	TABLA.setAttribute("ENVIAR", 1);
	for(n=TR.length-1; n>0; n--){
		if( TR[n].id!='PieLista' && TR[n].cells[Obj.RELATIONCOL].textContent==Valor ) TABLA.deleteRow(n);
	}
}

var _SLRegDupicado;
function SLRegDuplicado(){
	for(var d=0; d<_SLRegDupicado.length; d++) _SLRegDupicado[d].style.backgroundColor = '';
}

function _slClick(Obj){									// Se ejecuta con un click al dar A,B,M - con SubFichas
	if( Obj.disabled ) return eClearEvent();			// Si está desabilitado no ejecuta la acción, SubList de SubList - //if( top.__eAlert ) return eClearEvent();
	S(Obj.children[0]).hidden();						// oculta el boton si tiene alguna espera el submit de la subficha

	if( !top.eReadyState(window) ){						// top._swCreate || || !top.eReadyStateLocal(window) || !top.eReadyState(top.TLF)) && top._UltimaURL.indexOf('edes.php?D:')==-1 && top._UltimaURL.indexOf('&DOWNLOAD=')==-1 && top._UltimaURL.indexOf('&_gs_formato_=')==-1 ){		// Evita problemas con XP-SP2
		setTimeout(function(){
			_slClick(Obj);
		}, 1000);
		return false;
	}
	//if( !S.isReady(window, function(){ _slClick(Obj) }) ) return false;

	var FilaTocada=null, sMODO="", n,i,d;
	try{
		if( !top.eReadyState(top.TLF) && top._UltimaURL.indexOf('edes.php?D:')==-1 && top._UltimaURL.indexOf('&DOWNLOAD=')==-1 && top._UltimaURL.indexOf('&_gs_formato_=')==-1 ){		// Evita problemas con XP-SP2 // alert('Chequeando condiciones');
			setTimeout(function(){
				_slClick(Obj);
			}, 1000);
			return false;
		}
	}catch(e){											//for( i in e ) alert(i+': '+e[i]); //if( e['number']==-2147024891 || e['number']==-2147467259 ) _CallSrv('edes.php?r:/_datos/config/empty_page.htm');		//.Acceso denegado // if( e['number']==-2147024891 ) parent.frames.TLF.location.replace('edes.php?R:/_datos/config/empty_page.htm');		//.Acceso denegado / Error no especificado
		return false;
	}
	S.public(1);
	S(Obj.children[0]).visible();						// muestra el botón del submit de la subficha
	__slClick(Obj);
	S.public(0);
	/*	// debería ocultarse el icono de insertar y el F10 de la sublista y que apareciera si se borra algún registro
	if( !eRowsFree(Obj, false) ){
		S(eIndex(S(":_op_"+S("I", Obj).attr("name").substring(6)).obj.sourceIndex+2)).hidden();
	}
	*/
}
function __slClick(Obj){								// Se ejecuta con un click al dar A,B,M - con SubFichas
	var FilaTocada=null, sMODO="", n,i,d;
	if( DGI('edMENUS')!=null && edMENUS.style.display=='block' ) edSave();

	var Nom = S("I", Obj).attr("name").substring(6),						//var Nom = Obj.children[0].name.substring(6),
		Obj = DGI('['+Nom+']');											//if( Obj.SubSubList!=undefined ) eval(Obj.SubSubList);
	if( Obj.MODO=='D' && Obj.getAttribute('FIELDPARENT')!=null ){
		_slDelChildren(Obj);													// SubSubList
		//if( !_Question ) _UpdateForm = true;	//top.eTron('Se modifico CHR');
	}

	if( Obj.MODO=='I' ){
		if( !eRowsFree(Obj) ) return;
		if( Obj.getAttribute('RELATIONFIELD')!=null ){			// Relation Padre
			var el = DGI(Obj.RELATIONFIELD);
			if( eGF(Obj.FIELDPARENT)==0 ){
				_SubSubListPk--;
				ePF(Obj.FIELDPARENT, _SubSubListPk);
			}

		}else if( Obj.getAttribute('SUBSUBLIST')!=null ){		// Relation Hijo
			var el = DGI(Obj.SUBLISTPADRE);
			if( eGF(el.FIELDPARENT)!=0 ){
				ePF(el.FIELDCHILD, eGF(el.FIELDPARENT));
			}
		}
	}else{
		FilaTocada = Obj.rows[Obj.FILA];
	}

	// posicion de cada campo en el listado
		pCol=[];
		S("TH[campo]",Obj).each(function(k,o){
			var c = S.splitLast(" ", " "+S(o).attr("campo").replace("."," "))[1];
			pCol[c] = S(o).attr("nc")*1-1;
		});

	try{
		var w = eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('F', 'S', Obj.MODO, -1, (Obj.MODO=='I')?null:FilaTocada, window, pCol);		// Start
		if( typeof(w)=='boolean' && !w ) return;
	}catch(e){}		//for( var i in e ) alert(i+': '+e[i]);

	var AltoTH = S(Obj).attr("AltoTH")*1,
		okForm = Ok_Formulario(Obj.slFORM, Obj.slCheckDESDE, Obj.slCheckHASTA, Obj.MODO);

	//top.TLF.document.write('_slClick<br>');
	if( Obj.MODO=='D' || okForm ){
		var NomFunc = '';
		try{ NomFunc = typeof(eval('JSCheck'+Nom)); }catch(e){}
		if( NomFunc=='function' || NomFunc=='object' ){				// Chequeo en la función de usuario {slJSCheck}
			_ErrMensaje = _ErrCampo = '', _ErrForm = -1;
			if( !eval('JSCheck'+Nom)(Obj.id, Obj.MODO, ((Obj.MODO=='I')? -1 : Obj.FILA), Obj.rows, window, pCol) ) return false;			//if( !eval( 'JSCheck'+Nom+'("'+Obj.id+'","'+Obj.MODO+'",'+( (Obj.MODO=='I')? -1 : Obj.FILA )+')' ) ) return false;
			if( _ErrForm==-1 ){
				top.eAlert(S.lng(212), 'Error no definido: '+_ErrMensaje, 'A', 'E');		//alert( 'Error no definido: '+_ErrMensaje );
				return false;
			}else if( _ErrMensaje.length>0 ){
				_ConError = true;
				//	_ErrForm = 1;
				var tmp = _ErrCampo.split(',');
				for(i=0; i<tmp.length; i++){
					if( eGO(tmp[i]).className!="READONLY" ){
						eGO(tmp[i]).className = 'error';
						if( DGI('_INPUT_'+tmp[i])!=null ) DGI('_INPUT_'+tmp[i]).className = 'error';
					}
				}
				_ErrCampo = tmp[0];

				Obj = eGetFocus( eGO(_ErrCampo) );															//Obj = eval( 'document.FRM'+_ErrForm+'.'+_ErrCampo );
				//if( top.__eAlert ) return false;
				top.eAlert('ERRORES ENCONTRADOS', _ErrMensaje, 'A', 'W', Obj);					//alert( "ERRORES ENCONTRADOS:\n\n"+_ErrMensaje );
				return false;
			}
		}

		// Evita duplicados en la sublista
		if( Obj.getAttribute('SLUNIQUE')!=null && (Obj.MODO=='U' || Obj.MODO=='I') ){

			for(n=0; n<_DimChildrenData.length; n++){
				if( _DimChildrenData[n][0]==Obj.id ){
					for(i=0; i<_DimChildrenData[n].length; i++) _ChildrenData[i] = _DimChildrenData[n][i];
					break;
				}
			}

			var DCampo = _ChildrenData[3].split(','), n, d;
				OCampo = _ChildrenData[4].split(','),
				UCampo = Obj.getAttribute("SLUNIQUE").split('|'),					// Campos únicos
				xUCampo = (UCampo.length==2) ? eTrim(UCampo[1]) : 'Registro duplicado';

			UCampo = S.nsp(UCampo[0]).split(',');
			var UFCampo = UNCampo = '';
			for(d=0; d<UCampo.length; d++){
				UCampo[d] = eTrim(UCampo[d]);
				for(n=0; n<OCampo.length; n++){
					DCampo[n] = eTrim(DCampo[n]);
					if( DCampo[n]==UCampo[d] ){
						if( UFCampo!='' ){
							UFCampo += ',';
							UNCampo += ',';
						}
						if( OCampo[n][0]=="*" ){							// para los select
							UFCampo += "_INPUT_"+S.mid(OCampo[n],1,0);
						}else{
							UFCampo += OCampo[n];
						}
						UNCampo += ''+n;
					}
				}
			}
			if( UNCampo=='' ){
				alert('ERROR:\n{slUnique} mal definido');
				return;
			}

			UFCampo = UFCampo.split(',');
			UNCampo = UNCampo.split(',');		//alert( UFCampo+'\n'+UNCampo );
			for(n=1+parseInt(AltoTH); n<Obj.rows.length-S(Obj).attr("COLSOP"); n++){
				if( Obj.rows[n].getAttribute('LIBRE')==undefined ){
					var igual = UFCampo.length;
					for(d=0; d<UFCampo.length; d++){
						if( ((Obj.MODO=='U' && Obj.getAttribute("FILA")!=n) || Obj.MODO=='I') ){
							if( DGI(UFCampo[d]).type=="checkbox" ){
								if( (eTrim(Obj.rows[n].cells[UNCampo[d]].textContent)=="j" && DGI(UFCampo[d]).value=="S") || (eTrim(Obj.rows[n].cells[UNCampo[d]].textContent)!="j" && DGI(UFCampo[d]).value=="") ){
									igual--;
								}
							}else if( eTrim(Obj.rows[n].cells[UNCampo[d]].textContent)==DGI(UFCampo[d]).value ){
								igual--;
							}
						}
					}
					if( igual==0 ){
						_SLRegDupicado = Obj.rows[n].cells;
						for(d=0; d<Obj.rows[n].cells.length; d++) Obj.rows[n].cells[d].style.backgroundColor = 'red';
						Obj.parentNode.scrollTop = Obj.rows[n].offsetTop - Obj.rows[AltoTH].offsetHeight;
						top.eAlert(S.lng(212), xUCampo.replace(/\#/g,n), 'A', 'E', window.SLRegDuplicado);
						return false;
					}
				}
			}
		}

		sMODO = Obj.MODO;
		FilaTocada = _FormularioASubListaIncr(Obj);		// problema

		eSLReorder(Obj);
		/*
		// Ordenación de la Sublista si procede
		if( Obj.getAttribute('SortCol')!=undefined ){
			_SortSubList( Obj.rows[AltoTH].cells[ Obj.getAttribute('SortCol') ], 'A' );				// Reordena la SubLista
			if( FilaTocada!=null ){
				Obj.parentNode.scrollTop = FilaTocada.offsetTop-FilaTocada.offsetHeight-3;	// Pone el registro tocado visible
			}
		}
		*/
	}

	//eClearEvent();
	//alert('_slClick:FIN - '+Obj.MODO);			// Siempre despues de hacer todo

	if( okForm ){
		try{
			eval('FUNCTION_'+Obj.id.substring(1,Obj.id.length-1))('F', 'E', sMODO, Obj.FILA, FilaTocada, window, pCol);		// End
			if( sMODO=='I' ) Obj.parentNode.scrollTop = FilaTocada.offsetTop-FilaTocada.offsetHeight-3;						// Pone el registro tocado visible
		}catch(e){}
	}

	// Recalcula tamaño
	//Obj = DGI('c['+Nom+']');
	//Obj.style.width = Obj.children[0].offsetWidth + Obj.offsetWidth - Obj.clientWidth;		//+ Obj.clientLeft;
	//alert(Obj.outerHTML );

	if( Obj.MODO=='I' && Obj.getAttribute('SUBSUBLIST')!=null ){						// SubSubList
		DGI('c'+Obj.id).style.height = AltoNFilas(Obj.id,Obj.parentNode.NF)+"px";			// Obj.id == '[__documento]';
		setTimeout(function(){ THScroll(Obj.id,0) }, 250);
	}
}


function _AnchoTab(Obj){
	var AnchoSpan = Obj.parentNode.offsetWidth, t;
	while( t=S.toTag(Obj,'TABLE') ){
		if( i.id=='PAGINA' ) break;
		if( t.id.substring(0,9)=='TABNumber' ){
			AnchoSpan = t.offsetWidth;
			break;
		}
	}
	return Array(t, AnchoSpan);
}


//var _slNumFile=0;																		// Número de fichero de las sublistas
function _FormularioASubListaIncr(Obj){					// SubFicha->SubLista - Se puede unir con "_FormularioASubLista()"
	var FilaTocada=null, n,i;
	if( Obj==undefined ){
		Obj = _WOPENER.DGI(_ChildrenData[0]);
	}else{
		for(n=0; n<_DimChildrenData.length; n++){
			if( _DimChildrenData[n][0]==Obj.id ){
				for(i=0; i<_DimChildrenData[n].length; i++) _ChildrenData[i] = _DimChildrenData[n][i];
				break;
			}
		}
	}

	var DCampo = _ChildrenData[3].split(','), n, d, oTR,
		OCampo = _ChildrenData[4].split(','),
		Reutilizar = false;

	switch( Obj.MODO ){
		case "I":
			d = 0;
			for(n=1; n<Obj.rows.length-S(Obj).attr("COLSOP"); n++){
				if( S(Obj.rows[n]).attr("LIBRE")!=undefined ){
					Obj.rows[n].removeAttribute('LIBRE');
					d = n;
					Reutilizar = true;
					oTR = Obj.rows[n];
					oTR.style.fontStyle = "italic";
					oTR.style.display = '';			//block
					oTR.setAttribute('isNew',1);
					break;
				}
			}
			if( d>0 ) break;
			/*
			if( S(Obj).attr("COLSOP")==1 ){
				oTR = Obj.insertRow(Obj.rows.length-1);
			}else{
				oTR = Obj.insertRow();
			}
			*/
			oTR = eInsertRow(Obj);
			Obj.FILA = oTR.rowIndex;
			Obj.setAttribute("FILA", oTR.rowIndex);
			oTR.style.fontStyle = "italic";
			oTR.setAttribute("isNew", 1);
			break;
		case "U":
			oTR = Obj.rows[Obj.FILA];
			oTR.style.fontStyle = "italic";
			break;
		case "D":
			S("TD",Obj.rows[Obj.FILA]).each(function(pk, o){		// borra el fichero temporal si se modifico
				if( S(o).attr("NUMFILE") ){
					S(":_FILE_"+S(o).attr("NUMFILE"),_WOPENER).nodeRemove();
				}
			});
			Obj.deleteRow(Obj.FILA);
			//if( !_WOPENER._Question ) _WOPENER._UpdateForm = true;
			break;
		case "V":
			eClearEvent();
			return null;
	}

	var AltoTH = S(Obj).attr("AltoTH")*1, oTD, tmp, NomCol;

	if( Obj.MODO=='I' || Obj.MODO=='U' ){
		for(n=0; n<Obj.rows[AltoTH].cells.length; n++){
			oTD = ( Obj.MODO=='I' && !Reutilizar ) ? oTR.insertCell() : oTR.cells[n];
			for(d=0; d<DCampo.length; d++){
				DCampo[d] = eTrim(DCampo[d]).replace(/&#44;/g,',');

				if( DCampo[d].indexOf(')')>-1 ){
					tmp = DCampo[d].split(')');
					DCampo[d] = eTrim(tmp[tmp.length-1]);
				}else if( DCampo[d].indexOf(' ')>-1 ){
					tmp = DCampo[d].split(' ');
					DCampo[d] = eTrim(tmp[tmp.length-1]);
				}

				NomCol = S(Obj.rows[AltoTH].cells[n]).attr("CAMPO");
				if( NomCol.indexOf(')')>-1 ){
					tmp = NomCol.split(')');
					NomCol = eTrim(tmp[tmp.length-1]);
				}else if( NomCol.indexOf(' ')>-1 ){
					tmp = NomCol.split(' ');
					NomCol = eTrim(tmp[tmp.length-1]);
				}

				if( NomCol==DCampo[d] ){
					if( OCampo[d]=='IMG' ){
						if( Obj.MODO=='I' ) oTD.innerHTML = _ChildrenData[8].replace("<br>","\n");
					}else if( OCampo[d][0]=="*" ){													//.substring(0,1)=='*' ){
						oTD.textContent = S(":"+OCampo[d].substring(1)).option();					// oTD.textContent = eSelectValue(OCampo[d].substring(1));
					}else{
						//if( Obj.rows[AltoTH].cells[n].getAttribute("MILES") ){
						//if( Obj.rows[AltoTH].cells[n].getAttribute("DCM")!=null ){
						if( /^(\+|\+\,|\-|\-\,|P4|F4|CDI|T)$/.test(S(":"+OCampo[d]).attr("tc")) ){
							oTD.textContent = S(":"+OCampo[d]).obj.value;
							//	oTD.textContent = eShowThousands(S(":"+OCampo[d]).val(), Obj.rows[AltoTH].cells[n].getAttribute("DCM"));	//eShowThousands(eGF(OCampo[d]), Obj.rows[AltoTH].cells[n].getAttribute("DCM"));		// valores numéricos con miles
							//}else{
							//	oTD.textContent = eShowThousands(S(":"+OCampo[d]).val(),  eGO(OCampo[d]).getAttribute("DCM"));				//eShowThousands(eGF(OCampo[d]), eGO(OCampo[d]).getAttribute("DCM"));					// valores numéricos con miles
							//}
						}else{
							if( eGO(OCampo[d]).type=="checkbox" ){								//if( eGO(OCampo[d]).getAttribute('CheckBox')!=null ){
								//oTD.innerHTML = '<img src="g/tf_'+((eGF(OCampo[d])=="S")?'1':'0')+'.gif">';							// S - '<img src="g/tf_'+((eGF(OCampo[d]).checked)?'1':'0')+'.gif">';
								oTD.innerHTML = '<i class="ICONINPUT'+((eGF(OCampo[d])==_CheckBoxSave[0])?'">j':' OFF">i')+'</i>';		// S
							}else if( eGO(OCampo[d]).type=="radio" ){							//}else if( eGO(OCampo[d]).getAttribute('RadioButton')!=null ){
								oTD.textContent = "";
								S(":"+OCampo[d]).each(function(pk, obj){
									if( obj.checked ){
										oTD.textContent = obj.getAttribute("eValue");			//oTD.textContent = S(obj).attr("eValue");
									}
								});
								//oTD.textContent = eGF(OCampo[d]);
							}else{
								if( eGO(OCampo[d]).tagName=='TEXTAREA' ){
									if( S(":"+OCampo[d]).attr("eHTML")!=null ){
										oTD.innerHTML = S(":"+OCampo[d]).val();
									}else{
										oTD.innerHTML = S.replace(S(":"+OCampo[d]).val(), S.char(10), "<br>");						//eGF(OCampo[d]); - chr(10)				//oTD.textContent = eGF(OCampo[d]).replace(/\r\n/g,'<BR>');
									}
								}else{
									oTD.textContent = eGF(OCampo[d]);							//oTD.textContent = eGF(OCampo[d]).replace(/\r\n/g,'<BR>');
								}

								// Campo tipo FILE: _FormularioASubListaIncr(Obj) / SubFicha->SubLista
								if( eGO(OCampo[d]).getAttribute("eUpload")!=null ){				//if( !(Obj.MODO=='U' && eGO(OCampo[d]).type=='file' && eGF(OCampo[d])=='') ){
									/* Envía el fichero directamente
										oTD.setAttribute("nId", Date.parse(new Date())/1000);
										S.file(eGO("_FILE_"+OCampo[d]), '/_tmp/php/'+_User+"_"+oTD.getAttribute("nId"), "", 100);			// manda el fichero al servidor
										oTD.setAttribute("eUpload", eGO(OCampo[d]).getAttribute("eUpload"));
										oTD.setAttribute("NewValue", eGO(OCampo[d]).getAttribute("NewValue"));
										eGO(OCampo[d]).setAttribute("NewValue", "");
									*/
									_DuplicaCampoFile(Obj, oTD, eGO(OCampo[d]), _DBINDEX);					// nuevo sistema de envio de ficheros: tabla, td, file, dbIndex
									if( S("TD[newvalue]", oTR).length==1 && S(".ICON-DESCARGAR", oTR).length==1 ){
										S.visibility(S(".ICON-DESCARGAR", oTR), /^(png|jpg|jpeg|gif|bmp|tif|tiff|pdf|csv|txt|mp4)$/i.test(S.fileType(S(oTD).text())));										//S.visibility(S(".ICON-DESCARGAR", oTR), /^(png|jpg|jpeg|gif|bmp|tif|tiff|pdf|csv|txt|mp4)$/i.test(S.fileType(S("TD[newvalue]").attr("NewValue"))));
									}
								}
							}
						}
					}
					break;
				}
			}
		}
		FilaTocada = oTR;
	}

	if( Obj.MODO=='I' ){
		/*
		if( Obj.FILE!='' ){
			// Clonando elemento
			var DimAncho = _AnchoTab( Obj );			// Para mantener el ancho de la ficha
			var el = document.getElementById( Obj.FILE );
			var oClone = el.cloneNode();
			document.getElementById('_SPANFILE').appendChild( oClone );
			el.swapNode(oClone);
			oTR.NUMFILE = ++_slNumFile;
			el.NUMFILE = Obj.FILE+'_'+_slNumFile;
		}
		*/
	}else if( Obj.MODO=='U' || Obj.MODO=='D' ){
		if( _FormularioASubListaIncr.arguments.length==0 ){
			S.windowHidden(window);		//top._eSWMini( window.frameElement.id.substring(4) );
		}else{
			// Minimiza el FormOnLine
			//for( n=Obj.slPTR; n<=Obj.slUTR; n++ ) Obj.slTABLE[n].style.display = 'none';
		}
	}

	Obj.setAttribute("ENVIAR", 1);

	if( _ChildrenData[9]!='' ){				// Operaciones en Columna
		var s_ShowZero=_ShowZero, _ShowZero=1,
			tmp=_ChildrenData[9].split(','),
			c, f, Total;
		for(c=0; c<tmp.length; c++){
			if( tmp[c]!='' ){
				Total = 0;
				for(f=1; f<Obj.rows.length; f++){
					if( S(Obj.rows[f]).attr('LIBRE')==null && Obj.rows[f].id!='PieLista'  ){
						switch( tmp[c] ){
							case '+':
								Total += eClearThousands( Obj.rows[f].cells[c].textContent )*1;
								break;
							case 'C': case 'c':
								Total++;
								break;
							case '#':
								if( eTrim( Obj.rows[f].cells[c].textContent )!='' ) Total++;
								break;
						}
					}
				}
				//console.log('total = '+eShowThousands( Total, Obj.rows[AltoTH].cells[c].getAttribute("DCM") )+' decimales: '+Obj.rows[AltoTH].cells[c].getAttribute("DCM"));
				Obj.rows[Obj.rows.length-1].cells[c].textContent = eShowThousands( Total, Obj.rows[AltoTH].cells[c].getAttribute("DCM") );
			}
		}
		_ShowZero = s_ShowZero;
	}

	if( _ChildrenData[7]!='' ){				// Funcion de usuario
		if( Obj.MODO=='D' ) oTR = null;
		eval(_ChildrenData[7])(oTR);
	}

	if( Obj.MODO=='D' ){					// Para mantener siempre el mismo nº de filas visibles
		oTR = null;
		var TRVisibles = Obj.rows.length;	// SubListas normales
		if( Obj.SUBSUBLIST!=undefined ){	// SubListas con [RelationSubList] Cuentra los registros hijos y los vacios
			TRVisibles = 0;
			var SL = DGI('['+DGI(Obj.SUBLISTPADRE).RELATION+']'),c,ok,
				dCol = DGI(Obj.SUBLISTPADRE).RELATIONCOL,
				Valor = eGF(DGI(Obj.SUBLISTPADRE).FIELDPARENT);
			for(c=1+parseInt(S(SL).attr("AltoTH")); c<SL.rows.length; c++){
				ok = (eTrim(SL.rows[c].cells[dCol].textContent)==Valor);
				if( ok || SL.rows[c].LIBRE==1 ) TRVisibles++;
			}
		}
	
		if( TRVisibles<S(Obj).attr("TRVISIBLES") ){
			/*
			if( S(Obj).attr("COLSOP")==1 ){
				var oTR = Obj.insertRow(Obj.rows.length-1);
			}else{
				var oTR = Obj.insertRow();
			}
			*/
			var oTR = eInsertRow(Obj);
			S(oTR).attr("LIBRE",1);
			for(n=0; n<Obj.rows[AltoTH].cells.length; n++) oTR.insertCell().innerHTML = "&nbsp;";
		}
	}

	eSLReorder(Obj);

	//_FormularioPaste( document.forms[Obj.slFORM].elements, Obj.slDESDE, Obj.slHASTA+1 );
	_FormStaticConect = false;
	_oSubLista = Obj;
	if( _FormularioASubListaIncr.arguments.length>0 && Obj.MODO=='I' ){
		//if( !eFocus( document.forms[Obj.slFORM].elements[ Obj.slDESDE ] ) ){
			//SiguienteCampo( _DefCampo[ document.forms[Obj.slFORM].elements[ Obj.slDESDE ].name ].Indice );
			SiguienteCampo(Obj.slFORM.elements[ Obj.slDESDE ].name);
		//}
	}

	if( Obj.MODO=='I' ) Obj.parentNode.scrollTop = Obj.offsetHeight;

	if( Obj.getAttribute('IniInsert')==0 ){		// No tiene la opción 'Insert'
		_FormularioLimpioPara( Obj, 'V' );
		_FormularioReadOnly(Obj.slFORM.elements, Obj.slDESDE, Obj.slHASTA, Obj.MODO);									//_FormularioReadOnly( document.forms[Obj.slFORM].elements, Obj.slDESDE, Obj.slHASTA );
	}else{
		_FormularioLimpioPara(Obj, 'I');		//eSLAction( Obj.id.substring(1,Obj.id.length-1), 'I' );
	}

	setTimeout(function(){
		S(_oSubLista.parentNode).eventFire("scroll");
	}, 250 );
	eClearEvent();

	if( Obj.offsetHeight>Obj.parentNode.offsetHeight ) _AjustaCampos();								// Nuevo 04-11-2013
	return FilaTocada;
}


function eSubListUnique(tabla, reg){					// comprueba si ya existe un registro con los mismos valores
	var tmp2 = (tabla.getAttribute("SLUNIQUE") || "").split('|'),
		campo = S.nsp(tmp2[0]).split(","),
		dim = eSLGet(tabla),
		pos=[], dupli=[], indice,n,f,
		restar = (S("TH[nc='0']", tabla).attr("campo")=="''")? 1:0;
	if( tmp2[0]=="" ) return true;
	for(n=0; n<campo.length; n++) pos[campo[n]] = S(S("TH[campo='"+campo[n]+"']", tabla)).attr("nc")*1-restar;	// resta
	// chequea la sublista actual
	for(f=0; f<dim.length; f++){
		indice = "";
		for(n=0; n<campo.length; n++) indice += ","+dim[f][pos[campo[n]]];
		if( !dupli[indice] ) dupli[indice]=0;
		dupli[indice]++;
		if( dupli[indice]>1 ){
			top.eInfoError(window, tmp2[1]);
			return false;
		}
	}
	// chequea el nuevo registro
	indice = "";
	for(n=0; n<campo.length; n++) indice += ","+reg[pos[campo[n]]+restar];
	if( !dupli[indice] ) dupli[indice]=0;
	dupli[indice]++;
	if( dupli[indice]>1 ){
		top.eInfoError(window, tmp2[1]);
		return false;
	}
	return true;
}

function eSubListInsert(id, Dim){						// Da de alta registros en la SubLista mediante una función, igual que "eSLInsertRow()"
	var Tabla = DGI('['+id+']'),
		AltoTH = S(Tabla).attr("AltoTH")*1,
		op = S(Tabla).attr("COLSOP")==null ? 0:1,
		def = [],										//S("TH[nc]", Tabla).attr("nc, td, dcm, miles"),
		Reutilizar = false, d=-1, oTR, oTD, n, x, xIcon,xClick,xTitle,xTmp;
		Obj = S("TBODY", Tabla).obj;

	if( !eSubListUnique(Tabla, Dim) ) return false;

	S("TH[nc]", Tabla).each(function(k,o){
		def[k] = S(o).attr("nc, td, dcm, miles");
	});

	for(n=0; n<Obj.rows.length; n++){
		if( S(Obj.rows[n]).attr("LIBRE")!=undefined ){
			Obj.rows[n].removeAttribute('LIBRE');
			d = n;
			Reutilizar = true;
			oTR = Obj.rows[n];
			break;
		}
	}
	if( d==-1 ){
		/*
		if( S(Tabla).attr("COLSOP")==1 ){
			oTR = Obj.insertRow(Obj.rows.length-1);
		}else{
			oTR = Obj.insertRow();
		}
		*/
		oTR = eInsertRow(Tabla);
	}
	oTR.style.fontStyle = "italic";
	for(n=0; n<Tabla.rows[0].cells.length; n++){			//for(n=0; n<Obj.rows[AltoTH].cells.length; n++){
		oTD = Reutilizar ? oTR.cells[n] : oTR.insertCell();
		if( n==0 && Dim[n][0]=="[" ){
			oTD.innerHTML = "";
			while(Dim[n][0]=="[" ){
				x = xIcon = S.mid(Dim[n],"[","]");
				xClick = xTitle = "";
				if( S.is(",", x) ){
					xTmp = (x+",,").split(",");
					xIcon = xTmp[0];
					xTitle = xTmp[1];
					xClick = xTmp[2];
				}
				switch(xIcon.toUpperCase()){
					case 'U':
						oTD.innerHTML += '<i class="ICONINPUT ICONUPDATE" onmouseenter=S(this).tip("'+(xTitle||"Modificar")+'",-1) onclick=eSubList("u")>U</i>';
						break;
					case 'D':
						oTD.innerHTML += '<i class="ICONINPUT ICONDELETE" onmouseenter=S(this).tip("'+(xTitle||"Borrar")+'",-1) onclick=eSubList("d")>D</i>';
						break;
					case 'V':
						oTD.innerHTML += '<i class="ICONINPUT ICONVIEW" onmouseenter=S(this).tip("'+(xTitle||"Consultar")+'",-1) onclick=eSubList("v")>V</i>';
						break;
					case 'F':
						if( xClick=="" ) xClick = '",-1) onclick=eSubList("f")';
						else xClick = '",-1) onclick='+xClick;
						oTD.innerHTML += '<i class="ICONINPUT ICONVIEW" onmouseenter=S(this).tip("'+(xTitle||"Descargar fichero")+xClick+'>F</i>';
						break;
					default:
				}
				Dim[n] = S.trim(S.replace(Dim[n], "["+x+"]", ""));
			}
		}else{
			switch(def[n]["td"]){
				case '+': case '-':
					Dim[n] = S.thousands(Dim[n], 0);
					break;
				case '+,': case '-,':
					Dim[n] = S.thousands(Dim[n], def["dcm"]);
					break;
				case 'C':
					Dim[n] = (Dim[n]=="S") ? '<i class="ICONINPUT">j</i>':'<i class="ICONINPUT OFF">i</i>';
					break;
			}
			oTD.innerHTML = Dim[n];
		}
	}
	Tabla.setAttribute("ENVIAR", 1);
	Tabla.parentNode.scrollTop = Tabla.offsetHeight;
	S(Tabla.parentNode).eventFire("scroll");

	if( op==1 ) eSLRecalcColsOp(Tabla);
	eSLReorder(Tabla);

	_UpdateForm = true;
	eClearEvent();
	return true;
}

function eSubListDelete(id, nTR){						// Da de baja registros en la SubLista
	var TABLA = DGI('['+id+']'), oDIV = TABLA.parentNode, n;
	if( typeof(nTR)=="undefined" ){
		S("TR",TABLA).each(function(k,o){
			if( o.cells[0].tagName!="TH" && o.id!="PieLista" ) deleteRow(o);
		});
	}else{
		deleteRow(TABLA.rows[nTR]);
	}

	TABLA.setAttribute("ENVIAR", 1);
	oDIV.scrollTop = oDIV.scrollLeft = 0;
	S(oDIV).eventFire("scroll");

	if( S(TABLA).attr("COLSOP")==1 ) eSLRecalcColsOp(TABLA);
	eSLReorder(TABLA);
	eClearEvent();

	function deleteRow(o){
		S(o).attr("LIBRE", 1);
		for(var n=0; n<o.cells.length; n++) o.cells[n].innerHTML = "&nbsp;";
	}
}


function _FormularioModificaIncr(Obj){					// SubList->SubFicha / Coge los datos de la SubLista y los pasa al formulario
	var n,i;
	if( Obj==undefined ){
		Obj = _WOPENER.DGI(_ChildrenData[0]);
	}else{
		for(n=0; n<_DimChildrenData.length; n++){
			if( _DimChildrenData[n][0]==Obj.id ){
				_ChildrenData = new Array();					// 2014-04-23
				for(i=0; i<_DimChildrenData[n].length; i++) _ChildrenData[i] = _DimChildrenData[n][i];
				break;
			}
		}
	}

	var DCampo = _ChildrenData[3].split(','),
		OCampo = _ChildrenData[4].split(','),
		oTR = Obj.rows[Obj.FILA],
		AltoTH = S(Obj).attr("AltoTH")*1,
		oTD, d, tmp, NomCol, e, tc;

	if( Obj.MODO!='I' ){																			//_Mode = Obj.MODO;
		for(n=0; n<Obj.rows[AltoTH].cells.length; n++){
			oTD = oTR.cells[n];
			for(d=0; d<DCampo.length; d++){
				OCampo[d] = eTrim(OCampo[d]);		
				DCampo[d] = eTrim(DCampo[d]);

				DCampo[d] = DCampo[d].replace(/&#44;/g,',');
				if( DCampo[d].indexOf(')')>-1 ){
					tmp = DCampo[d].split(')');
					DCampo[d] = eTrim(tmp[tmp.length-1]);
				}else if( DCampo[d].indexOf(' ')>-1 ){
					tmp = DCampo[d].split(' ');
					DCampo[d] = eTrim(tmp[tmp.length-1]);
				}

				NomCol = S(Obj.rows[AltoTH].cells[n]).attr("CAMPO");
				if( NomCol.indexOf(')')>-1 ){
					tmp = NomCol.split(')');
					NomCol = eTrim(tmp[tmp.length-1]);
				}else if( NomCol.indexOf(' ')>-1 ){
					tmp = NomCol.split(' ');
					NomCol = eTrim(tmp[tmp.length-1]);
				}

				if( NomCol==DCampo[d] ){
					if( OCampo[d]!='IMG' && OCampo[d].substring(0,1)!='*' ){
						if( eGO(OCampo[d]).type=="checkbox" ){									//if( eGO(OCampo[d]).getAttribute('CheckBox')!=null ){
							//ePF( OCampo[d], ((oTD.innerHTML.indexOf('tf_1.')>-1) ? _CheckBoxSave[0]:_CheckBoxSave[1]) );		// S / ''
							ePF(OCampo[d], ((oTD.innerText=="j") ? _CheckBoxSave[0] : _CheckBoxSave[1]));		// S / ''
						}else if( eGO(OCampo[d]).type=="radio" ){								//}else if( eGO(OCampo[d]).getAttribute('RadioButton')!=null ){
							ePF(OCampo[d], eTrim(oTD.textContent));
						}else{
							tc = S(":"+OCampo[d]).attr("tc");
							if( /^(\+|\+\,|\-|\-\,|P4|F4|CDI|T)$/.test(tc) ){					//if( Obj.rows[AltoTH].cells[n].getAttribute("MILES") ){
								S(":"+OCampo[d]).set(oTD.textContent);
								//S(":"+OCampo[d]).val(S.dataFormat(oTD.textContent, tc, "d"));	//ePF(OCampo[d], eClearThousands(oTD.textContent));
								//ePF(OCampo[d], eClearThousands(oTD.textContent));

							//}else if( /^(P4|F4|CDI|T)$/.test(tc) ){
							//	S(":"+OCampo[d]).val(S.dataFormat(oTD.textContent, tc, "d"));	//ePF(OCampo[d], eClearThousands(oTD.textContent));

							}else{
								//if( DGI(OCampo[d]).getAttribute('iSS')!=null ){
								//	_DimRelationFields[_DimRelationFields.length] = 'ePutRelationFields("'+OCampo[d]+'", "'+eTrim(oTD.textContent)+'");';
								//console.log( OCampo[d]+" = "+eTrim(oTD.textContent) );
								//	//ePF( OCampo[d], eTrim(oTD.textContent) );
								//	eGO(OCampo[d]).value = eTrim(oTD.textContent);
								//}else
								//if( DGI(OCampo[d]).getAttribute('SS')!=null ){
								//	_DimRelationFields[_DimRelationFields.length] = 'ePutRelationFields("'+OCampo[d]+'", "'+eTrim(oTD.textContent)+'");';
								//	ePutRelationFields(OCampo[d], eTrim(oTD.textContent));
									//ePF(OCampo[d], eTrim(oTD.textContent));							//oTD.textContent = eGF(OCampo[d]).replace(/\r\n/g,'<BR>');
									//S(":"+OCampo[d]).attr("SetValue", eTrim(oTD.textContent));
								//}else{
									if( eGO(OCampo[d]).tagName=='TEXTAREA' ){
										if( S(":"+OCampo[d]).attr("eHTML")!=null ){
											ePF(OCampo[d], eTrim(oTD.innerHTML));								//oTD.textContent = eGF(OCampo[d]).replace(/\r\n/g,'<BR>');
										}else{
											ePF(OCampo[d], S.replace(eTrim(oTD.innerHTML), "<br>", S.char(10)));
										}
									}else{
										if( S(':_INPUT_'+OCampo[d]).length==0 ){
											ePF(OCampo[d], eTrim(oTD.textContent));						//oTD.textContent = eGF(OCampo[d]).replace(/\r\n/g,'<BR>');
										}else{
											if( DGI('_INPUT_'+OCampo[d]).getAttribute('SS')!=null || DGI('_INPUT_'+OCampo[d]).getAttribute('i_SS')!=null ){
												_DimRelationFields[_DimRelationFields.length] = 'ePutRelationFields("'+OCampo[d]+'", "'+eTrim(oTD.textContent)+'",1);';
												//ePutRelationFields(OCampo[d], eTrim(oTD.textContent), 1);
											}else{
												ePF(OCampo[d], eTrim(oTD.textContent));
											}
										}
										//ePF( OCampo[d], eTrim(oTD.textContent), S(':_INPUT_'+OCampo[d]).length==0 );						//oTD.textContent = eGF(OCampo[d]).replace(/\r\n/g,'<BR>');
									}
									//ePF( OCampo[d], eTrim(oTD.textContent) );

									/* para Enviar fichero directamente
									if( eGO(OCampo[d]).getAttribute("eUpload")!=null ){
										if( oTD.getAttribute("eUpload")==null ) oTD.setAttribute("eUpload", 0);
										eGO(OCampo[d]).setAttribute("eBakUpload", oTD.getAttribute("eUpload"));
										if( oTD.getAttribute("NewValue")==null ) oTD.setAttribute("NewValue", "");
										eGO(OCampo[d]).setAttribute("NewValue", oTD.getAttribute("NewValue"));
										//_ViewFilePC(eGO(OCampo[d]));
									}
									*/

									// nuevo sistema de envio de ficheros
									if( S(oTD).attr("NUMFILE") && S(":_FILE_"+OCampo[d]).exists() ){
										S(":"+OCampo[d]).attr("NUMFILE", S(oTD).attr("NUMFILE"));			// numero temporal del fichero de sublistas
									}

								//}
							}
						}
						if( Obj.MODO=='D' || Obj.MODO=='V' ){
							e = eGO(OCampo[d]);
							if( e.type=="checkbox" ){							//if( e.getAttribute('CheckBox')!=null ){
								_eCheck(e.name, 0);
							}else if( e.type=="radio" ){						//}else if( e.getAttribute('RadioButton')!=null ){
								_eRadio(e.name, 0);
							}else{
								e.readOnly = true;
								if( DGI('_INPUT_'+OCampo[d])!=null ) DGI('_INPUT_'+OCampo[d]).readOnly = true;
							}
						}
					}else if( OCampo[d].substring(0,1)=='*' ){
						ePF('_INPUT_'+OCampo[d].substring(1), eTrim(oTD.textContent), false);
					}
					break;
				}
			}
		}
		_ExeDimRelationFields();	// undefinde, undefined, undefined, );

		/*
		alert('_FormularioModificaIncr:FIN');			// Siempre despues de hacer todo
		// Function de Usuario
		try{
			eval( 'FUNCTION_'+Obj.id.substring( 1,Obj.id.length-1))('L', 'S', Obj.MODO, Obj.FILA, pCol);		// slMODE, slROW	( slID )	After
		}catch(e){}
		*/
	}
}


function _SortSubList(el, AD){							// Ordenar manualmente listados
	return;
	var Obj = (el==undefined)?S.event(window):el;
	if( Obj.tagName!='TH' ) return;
	var SubLista = Obj.parentNode.parentNode.parentNode,
		oTD = Obj,
		col = oTD.cellIndex,
		co = oTD.NC*1,																// Nº de columna a ordenar
		nTH = oTD.parentNode.rowIndex,
		tCol = oTD.td,																//
		Obj = SubLista.rows,
		aTH = 0,
		tRow = Obj.length,
		ori,mov,r,p,f,val='';

	if( Obj[tRow-1].className=='PieLista' || Obj[tRow-1].cells[col].className ) tRow--;

	for(f=0; f<=aTH; f++){
		for(r=0; r<Obj[f].cells.length; r++) Obj[f].cells[r].style.textDecoration = '';		//.Quita toda la ordenacion
	}

	//if( SubLista.SortCol==null || SubLista.SortCol!=co ){								// Si es la misma columna no calcula su valor
		for(r=aTH+1; r<tRow; r++){
			if( Obj[r].getAttribute("LIBRE")!=null ) break;
			val = Obj[r].cells[co].textContent;
			switch( tCol ){
				case '0':
					break;
				case '+': case '-': case '*':
				case '+,': case '-,':
					val = S.thousandsClear(val);
					break;
				case 'P4':
				case 'F4':
				case 'CDI':
				case 'T':
					val = S.dataFormat(val, tCol, "d");									//val = val.substring(6,10) + val.substring(3,5) + val.substring(0,2);
					break;
				default:
					val = val.toUpperCase();
			}
			Obj[r].vSort = val;
		}
	//}

	if( (Obj[nTH].cells[col].getAttribute('ord')==null && AD==undefined) || AD=='A' ){
		Obj[nTH].cells[col].style.textDecoration = 'underline';
		Obj[nTH].cells[col].ord = 1;
		for(r=(aTH+1); r<tRow-1; r++){
			if( Obj[r].getAttribute("LIBRE")!=null || Obj[r].id=='PieLista' ) break;
			mov = 0;
			ori = Obj[r].vSort;
			for(p=r+1; p<tRow; p++){
				if( Obj(p).getAttribute("LIBRE")!=null || Obj(p).id=='PieLista' ) break;
				if( ori>Obj(p).vSort ){
					mov = p;
					ori = Obj(p).vSort;
				}
			}
			if( mov>0 ) S(Obj[r]).nodeSwap(Obj(mov));
		}
	}else{
		Obj[nTH].cells[col].style.textDecoration = 'overline';
		Obj[nTH].cells[col].ord = null;
		for(r=tRow-1; r>(aTH+1); r--){
			if( Obj[r].getAttribute("LIBRE")!=null || Obj[r].id=='PieLista' ) continue;
			mov = 0;
			ori = Obj[r].vSort;
			for(p=r-1; p>aTH; p--){
				if( Obj(p).getAttribute("LIBRE")!=null || Obj(p).id=='PieLista' ) continue;
				if( ori>Obj(p).vSort ){
					mov = p;
					ori = Obj(p).vSort;
				}
			}
			if( mov>0 ) S(Obj[r]).nodeSwap(Obj(mov));
		}
	}

	SubLista.SortCol = co;
	//eHideBusy( win );
}

// eFocusTag / Close

function eFocusTag(o, oDIV){
	if( o.length==undefined ) o = eXY(o);
	var CW = document.body.clientWidth,
		CH = document.body.clientHeight,
		DIV, i, c = new Array(0			, 0				, CW		, o[1]+2	,0			, o[1]+o[3]+4	, CW		, CH-o[3]-4	,0			, o[1]+2		, o[0]+2	, o[3]+2	,o[0]+o[2]+2	, o[1]+2		, CW-o[2]-2	, o[3]+2	);
	for(i=0; i<16; i+=4){
		DIV = document.createElement('DIV');
		DIV.id = '_SubList_'+i;
		DIV.className = "OFF";
		S(DIV).css({background:"#000000", position:"absolute", zIndex:100, left:px(c[i]), top:px(c[i+1]), width:px(c[i+2]), height:px(c[i+3])});	//top.eStyle(DIV, 'background:#000000;position:absolute; zIndex:100;', 'left',px(c[i]), 'top',px(c[i+1]), 'width',px(c[i+2]), 'height',px(c[i+3]));
		document.body.appendChild(DIV);
	}
	//junto: S('<i class="ICONINPUT" title="Cerrar ordenación" onclick="eSLSort(null,null,'+"'c"+oDIV.id+"'"+')" id="close'+oDIV.id+'" class="ON" style="position:absolute;left:0px;top:0px;display:none">5</i>').nodeEnd(document.body);
}
function eFocusTagRemove(){
	for(var i=0; i<16; i+=4) S("#_SubList_"+i).nodeRemove();	//DGI('_SubList_'+i).nodeRemove();
}

// slSort

var _SLSortCapture = null;
function eSLSortCapture(){
	var o = S.event(window);
	//if( o.tagName=='IMG' && o.src.indexOf('fl_close.png')>-1 ) return true;		// para la subventana
	if( /^(I|IMG)$/.test(o.tagName) ) o = o.parentNode;
	if( o.tagName!='TD' ) return eClearEvent();
	var oTR = S.toTag(o,'TR'), n;
	if( oTR.id=="PieLista" || S(oTR).attr("LIBRE")==1 ) return;

	if( _SLSortCapture==null ){
		_SLSortCapture = oTR;
		S(oTR).class("OFF");
	}else if( S(oTR).class()=="OFF" ){
		S(oTR).class("-OFF");
		_SLSortCapture = null;
	}else{
		var oTABLE = S.toTag(oTR,"TABLE"), Dim=[],
			i = _SLSortCapture.rowIndex, d=i, p,
			h = oTR.rowIndex;
		S(_SLSortCapture).class("-OFF");
		S.toTag(oTR,"TABLE").setAttribute("ENVIAR", 1);							//S(S.toTag(oTR,"TABLE")).attr("ENVIAR",1);			//setAttribute("ENVIAR", 1);
		S("TR", oTABLE).each(function(k,o){
			Dim[o.rowIndex] = o.cloneNode(true);
			// memoriza el atributo eClickBAK
			if( o.cells[0].tagName!="TH" && o.cells[0].children.length ){
				for(p=0; p<o.cells[0].children.length; p++){
					Dim[o.rowIndex].cells[0].children[p]["eClickBAK"] = o.cells[0].children[p]["eClickBAK"];
				}
			}
		});
		if( oTR.rowIndex>_SLSortCapture.rowIndex ){		// sube trs
			for(n=d+1; n<=h; n++){
				oTABLE.rows[n-1].parentNode.replaceChild(Dim[n], oTABLE.rows[n-1]);
			}
		}else{											// baja trs
			for(n=d-1; n>=h; n--){
				oTABLE.rows[n+1].parentNode.replaceChild(Dim[n], oTABLE.rows[n+1]);
			}
		}
		oTABLE.rows[h].parentNode.replaceChild(Dim[i], oTABLE.rows[h]);
		_SLSortCapture = null;
		S(oTABLE).scroll();
		eSLReorder(oTABLE);		// renumera las filas
	}
	/*
		var oTABLE = S.toTag(oTR,'TABLE'),
			oDIV = oTABLE.parentNode;

		oDIV.TRSort = oTR;
		var n, i, c = eXY(oDIV);
		c[0]+=2;
		c[1] += oTABLE.rows[0].offsetHeight+2;
		c[3] += c[1];

		var xy = eXY(oTR);

		// Crea una copia del TR a mover
		var dDIV = document.createElement('DIV');

		dDIV.id = 'SubListTableMov';
		dDIV.className = 'SubLista';
		S(dDIV).css({position:"absolute", borderWidth:"0px", zIndex:101, left:px(xy[0]-1), top:px(xy[1]+1)});

		var dTABLE = document.createElement('TABLE');
		dTABLE.cellSpacing = oTABLE.cellSpacing;
		dTABLE.cellPadding = oTABLE.cellPadding;								
		dTABLE.border = "0px";
		S(dTABLE).attr("cols", S(oTABLE).attr("cols"));
		
		var CGROUP = document.createElement("COLGROUP");
		dTABLE.appendChild(CGROUP);	
		S(S(oTABLE.children[0]).nodeCopy()).nodeSwap(CGROUP);
		
		var dTR = dTABLE.insertRow();
		//dTR = S(S(oTR).nodeCopy()).nodeSwap(dTR);
		dTR.outerHTML = oTR.outerHTML;
		dTR.onmousedown = null;
		
		dDIV.appendChild(dTABLE);
		dDIV = document.body.appendChild(dDIV);

		for(n=0; n<dTR.cells.length; n++){
			if( oTR.cells[n].offsetWidth>0 ){
				dTR.cells[n].style.whiteSpace = S(oTR.cells[n]).css("whiteSpace");
				dTR.cells[n].style.width = oTR.cells[n].offsetWidth-4;
				for(i=0; i<7; i++) if( dTR.cells[n].offsetWidth > oTR.cells[n].offsetWidth ){
					dTR.cells[n].style.width = parseInt(dTR.cells[n].style.width)-1;
				}
				dTR.cells[n].className = "OFF";
			}
		}
		
		//top.eTagShadow( window, dDIV );
		
		oTR.style.visibility = 'hidden';
		
		dDIV.onmousedown = function(){
			top.eTagMove(window, dDIV, c, function( Dir ){													//top.eTron(Dir+': '+oDIV.scrollTop);				
				if( oDIV.Interval!=undefined ) clearInterval(oDIV.Interval);
				if( Dir=='U' ){
					oDIV.Interval = setInterval(function(){ oDIV.scrollTop = oDIV.scrollTop-oTR.offsetHeight; }, 250 );
					return;
				}else if( Dir=='D' ){
					oDIV.Interval = setInterval(function(){ oDIV.scrollTop = oDIV.scrollTop+oTR.offsetHeight; }, 250 );
					return;
				}else if( Dir=='S' ) return;
				var dy = eXY(dTABLE)[1],
					y = eXY(oDIV);
				y = y[1]-oDIV.scrollTop;
				var TR = oTABLE.rows,n,p;
				oDIV.TRSort.style.visibility = 'visible';							//top.eTron( 'oDIV ['+ oDIV.outerHTML +']'); top.eTron( 'dy ['+ dy +']'); top.eTron( 'y ['+ y +']');
				for(n=0; n<TR.length; n++){											//top.eTron( n+': '+dy +' >= ['+ y +'] <= '+(y+TR[n].offsetHeight) );		
					if( (dy>=y && dy<=y+TR[n].offsetHeight) || TR[n].LIBRE==1 ){	//top.eTron( '  En posicion = '+n );				
						p = n; if( n>=oDIV.TRSort.rowIndex ) p++;
						if( p==0 ) p=1;
						if( TR[n].LIBRE==1 ) p--;									//top.eTron( 'Fila ['+ p +']');
						var nTR = oTABLE.insertRow(p);
						S(oDIV.TRSort).nodeSwap(nTR);
						S(nTR).nodeRemove();
						break;		
					}
					y += TR[n].offsetHeight+1;
				}
				// Reordena la columna
				p = 1;
				for(n=1; n<TR.length; n++){											//top.eTron( n+': '+dy +' >= ['+ y +'] <= '+(y+TR[n].offsetHeight) );		
					if( TR[n].LIBRE==1 ) break;
					TR[n].cells[S(oTABLE).attr("SortCol")].textContent = p++;
				}
				oTABLE.setAttribute("ENVIAR", 1);			// Indicar que se modifico
				// Cursor flotante
				S(dDIV).nodeRemove();
			}
		) };																		//nDIV.onmousedown = function(){top.eTagMove(window)};
		
		//dTABLE.style.width = oTABLE.offsetWidth;	
		S(dDIV).eventFire("mousedown");
	*/
	S.eventClear(window);
}

function eSLReorder(oTABLE){							// renumera las filas
	var i = oTABLE.getAttribute("SortCol"), n=0, td,
		manual = oTABLE.getAttribute("SortManual");
	if( i==null ) return;
	if( manual==null ){
		td = S("TH[nc='"+i+"']", oTABLE).attr("td");
		if( td==null ) td = "";
		else if( td=="F4" ) td = "D";
		else if( td=="P4" ) td = "P";
		else if( td[0]=="+" || td[0]=="-" || td[0]=="*" ) td = "N";
		S(oTABLE).sort(i, td);
	}else{
		oTABLE.setAttribute("ENVIAR", 1);
		S("TBODY TR", oTABLE).each(function(k,o){
			if( o.cells[i].tagName=="TD" && o.id!="PieLista" && o.getAttribute("LIBRE")==null ){
				o.cells[i].innerText = ++n;
			}
		});
	}

	// reordenación manual, al mover filas se quita el disabled por eso hay que volver a ponerlo
	if( oTABLE.eSort==1 ){
		S("IMG,I", oTABLE.parentElement).each(function(k,o){		// refresca la desactivación de iconos, se perdia al reordenar
			if( !(o.tagName=="I" && o.innerText=="|") ){
				o.disabled = true;
				S(o).class("+OFF");
			}
		});
	}
}


function eSLSort(oTABLE, SortCol, pDIV){				// Crea una copia de la SubLista
	/*
		...ojo... y si el TH se ha hecho scroll ???
		...ojo... sin con control no cabe por la derecha lo centrará o lo justificará a la izquierda
		...el botón de cerrar en el primer TH a la izquierda

		if( oTABLE!=undefined ){					// Tablas externas
			oTABLE.SortCol = SortCol;
			var oDIV = oTABLE.parentNode;
			oDIV.onmousedown = eSLSortCapture;
			oDIV.onselectstart = function(){return false;};
			return;
		}
	*/
	var o = S.event(window),
		oTABLE = S.toTag(o,'TABLE'),			//if( oTABLE.MODO!='I' ){}
		oDIV = oTABLE.parentNode;

	if( pDIV!=undefined ){
		oDIV = pDIV;
		oTABLE = oDIV.children(0);
	}

	if( S(oTABLE).attr("SortCol")==null || _Mode!='mR' ){
		top.eInfoError(window,'La SubLista no tiene ordenación manual');
		return false;
	}

	if( o.Activo==undefined || o.Activo==0 ){
		o.Activo = 1;
		oTABLE.eSort = 1;
		o.className = '';
		top.eInfo(window,'Activada la ordenación manual',1);
		//o.title = 'Desactivar la ordenación manual';
		o.onmouseenter = function(){ S(this).tip("Desactivar la ordenación manual",-2) };
		S('TD>i[onclick], TD>img[onclick]', oTABLE).each(function(k,o){
			o["eClickBAK"] = o.onclick;
			o.onclick = null;
		});
	}else{
		//junto: S(DGI("close"+oTABLE.id)).none();
		o.Activo = 0;
		oTABLE.eSort = 0;
		o.className = 'OFF';
		oDIV.onmousedown = null;
		top.eInfo(window,'Desactivada la ordenación manual',1);
		//o.title = 'Activar la ordenación manual';
		o.onmouseenter = function(){ S(this).tip("Activar la ordenación manual",-2) };
		if( _SLSortCapture!=null ){
			S(_SLSortCapture).class("-OFF");
			_SLSortCapture = null;
		}
		if( DGI('SubListSort')==null ){
			// Activa iconos y eventos
			S("IMG,I", oDIV).each(function(k,o){
				if( !(o.tagName=="I" && o.innerText=="|") ){		//<i class="ICONINPUT">|</i>
					o.disabled = false;
					S(o).class("-OFF");
				}
			});
			/*
			var o = oDIV.getElementsByTagName('IMG'), n;
			for(n=0; n<o.length; n++){
				if( o[n].src.indexOf('l_order.')==-1 ){
					o[n].disabled = false;
					o[n].className = "";
				}
			}
			*/
			oTABLE.oncontextmenu = oTABLE.bakMenu;
			oTABLE.rows[0].onclick = oTABLE.rows[0].BakClick;
			eFocusTagRemove();
		}

		S('TD>i[onclick], TD>img[onclick]', oTABLE).each(function(k,o){
			o.onclick = o["eClickBAK"];
		});

		return;
	}
	var CW = document.body.clientWidth,
		CH = document.body.clientHeight,
		oxy = eXY(oDIV);
	
	//if( !event.ctrlKey ){
		// Desactiva iconos y eventos
		S("IMG,I", oDIV).each(function(k,o){
			if( !(o.tagName=="I" && o.innerText=="|") ){
				o.disabled = true;
				S(o).class("+OFF");
			}
		});
		/*
		var o = oDIV.getElementsByTagName('IMG'), n;
			for(n=0; n<o.length; n++){
				if( o[n].src.indexOf('l_order.')==-1 ){
					o[n].disabled = true;
					o[n].className = "OFF";
				}
			}
		}
		*/
		oTABLE.bakMenu = oTABLE.oncontextmenu;
		oTABLE.rows[0].BakClick = oTABLE.rows[0].onclick;
		oTABLE.oncontextmenu = oTABLE.rows[0].onclick = function(){return false};

		eFocusTag(oxy, oDIV);

		//junto: S(oDIV).around(DGI("close"+oTABLE.id), {type:"10", margin:3, display:"block"});
		//junto: S(DGI("close"+oTABLE.id)).css("background:#8a8a8a,z-index:9999999");

		oDIV.onmousedown = eSLSortCapture;
		oDIV.onselectstart = function(){return false;};
		//return;
	//}
	
	/*
		var DIV = document.createElement('DIV');
		DIV.id = 'SubListSort';
		DIV.className = 'ISubListBODY';				//'SubLista';
		DIV.onmousedown = eSLSortCapture;
		DIV.onselectstart = function(){return false};
		DIV.oDIV = oDIV;
		S(DIV).css({position:"absolute", zIndex:100, left:px(oxy[0]), top:px(oxy[1])});
		DIV.innerHTML = oTABLE.outerHTML;
		DIV.children[0].id = 'SubListaTABLE';	
		DIV.onscroll = function(){ THScroll('SubListaTABLE',0) }
		DIV.scrollTop = "0px";

		var o = DIV.getElementsByTagName('IMG'), n;
		for( n=0; n<o.length; n++ ){
			o[n].disabled = true;
			o[n].className = "OFF";
		}
		DIV.children[0].oncontextmenu = DIV.children[0].rows[0].onclick = function(){return false};
		
		//with( DIV.children[0].rows[0].style ){		//DIV.children[0].rows[0].style.top = 0;
		//	removeAttribute('position');
		//	removeAttribute('left');
		//	removeAttribute('top');
		//}
		S(DIV.children[0].rows[0]).css({position:"", left:"", top:""});

		document.body.appendChild(DIV);
		
		if( oxy[1]+DIV.offsetHeight>CH ){		// Sube la subventana si se sale por fuera
			n = CH-DIV.offsetHeight-10;
			if( n<0 ){
				n = 10;
				DIV.style.height = px(CH-20);
				DIV.style.overflowY = 'auto';
			}
			DIV.style.top = px(n);
		}
		
		var IMG = document.createElement('IMG');
		IMG.src = 'g/fl_close.png';
		S(IMG).css({position:"absolute", left:"0px", top:"3px", cursor:"pointer", zIndex:2000});
		DIV.appendChild(IMG);
			
		setTimeout( function(){
			IMG.style.left = px(DIV.offsetWidth-IMG.offsetWidth-5);
			IMG.onclick = function(){									// Copia los registros en la sublista original
				if( DIV.id=='SubListSort' ){
					// Activa los iconos
					var o = DIV.getElementsByTagName('IMG'), n;
					for(n=0; n<o.length; n++){
						o[n].disabled = false;
						o[n].className = "";
					}
					// Traspasa los TR			
					var oTR = DIV.children[0].rows,
						dTR = DIV.oDIV.children[0].rows;
					for(n=1; n<oTR.length; n++){								//top.eTron( n+': '+dy +' >= ['+ y +'] <= '+(y+TR[n].offsetHeight) );		
						if( S(oTR[n]).attr("LIBRE")==1 ) break;
						S(oTR[n]).nodeSwap(dTR[n]);
					}
					S(DIV.oDIV.children[0]).attr("ENVIAR", 1);			// Indicar que se modifico
					// Desactiva el icono de ordenación
					var o = dTR[0].getElementsByTagName('IMG'), n;
					for(n=0; n<o.length; n++){
						if( o[n].src.indexOf('l_order.')>-1 ){
							o[n].className = "OFF";						//top.eInfo(window,'Desactivada la ordenación manual',1);
							o[n].title = 'Activar la ordenación manual';
							o[n].Activo = 0;
						}
					}
				}
				S(DIV).nodeRemove();			//top.eTagClose( DIV, true );
			};
		}, 100);

		//top.eTagShadow( window, DIV, true );
	*/
}


//----------------------
// SubMenu en SubListas
//----------------------

function gsSubMenu(txt){								// Se llama desde las SubListas
	var o = S.event(window),
		tr = o.parentNode,
		tabla = S.toTag(o,"TABLE"),
		ops = S(tabla).attr("opSubMenu"), n, menu=[["-Menú"]];
	if( S(tabla).class("?col_0n") || o.tagName!="TD" || tr.id=='PieLista' ) return;
	if( S.is("I", ops) ) menu.push(["Alta","I","I"]);					// 0-label, 1-icon, 2-url/submenu/title/parametro a funcion, 3- submenu/title, 4- title
	if( S(tr).attr("LIBRE")!=1 ){
		if( S.is("U", ops) ) menu.push(["Modificar","U","U"]);
		if( S.is("D", ops) ) menu.push(["Borrar","D","D"]);
		if( S.is("V", ops) ) menu.push(["Consultar","V","V"]);
		if( S.is("V", ops) ) menu.push(["-"]);
		if( S.is("V", ops) ) menu.push(["Exportar a Excel","v","XLS"]);
	}
	if( menu.length>1 ){
		S(o).menu(menu, {
			function:function(op, xtd, trigger, tr, table, arg){
				if( op=="XLS" ){
					top.eInfo(window, top.eLng(225), 3);
					setTimeout(function(){
						top.eCallSrvPost("edes.php?E:$dexcel.php", {DATOS:eSLGet(S.mid(arg[1],1,0), 1)});						//S.call("edes.php?E:$dexcel.php", {DATOS:eSLGet(S.mid(arg[1],1,0))});
					},1);
					S.eventClear(window);
				}else{
					eSLAction(S.mid(arg[1],"[","]"), S.lower(op), null, arg[0]);
				}
			},
			point: 1
		}, [o, txt]);
	}
	return S.eventClear(window);
	/*
		var o = S.event(window);							//alert( o.cellIndex );
		while( o.tagName != 'TABLE' ){
			if( o.tagName == 'TR' ) break;
			o = o.parentNode;
		}
		if( o.tagName != 'TR' ){
			eClearEvent();
			return false;
		}
		o.parentNode.parentNode.FILA = o.rowIndex;

		var Ver;
		<? PHP  if( $_Development || $_SESSION['_D_']!='' ){ ? >
			if( event.ctrlKey ){
				Ver = DGI('m'+o.parentNode.parentNode.id).gsEXE;
				if( Ver!='' ){
					//top._VerEditar = 10;
					top.gsEdit(window, Ver );
				}
				return eClearEvent();
			}
		<? PHP  } ? >

		Ver = (o.rowIndex==0) ? 'none':'block';			// 'none'==TH, 'block'=TD

		// Para cuando se pone un titulo a las sublista seleccionar la siguiente fila
		if( o.SaltaTR != undefined ) o = o.parentNode.parentNode.rows[1];
		var Obj = DGI(txt);		// SubMenú
		while( Obj.Indice.indexOf(' ') != -1 ) Obj.Indice = Obj.Indice.replace(' ','');

		if( Obj.Indice!='' ){								// Altas/Modificaciones directas al servidor, si está vacío será de una SubLista con "FormStatic"
			var dato = Obj.Indice.split(',');
			var tmp = dato[0].split('=');
			Obj.PADRE = tmp[0]+'='+o.cells[tmp[1]].textContent;
			var tmp = dato[1].split('=');
			Obj.SEEK = tmp[0]+'='+o.cells[tmp[1]].textContent;
			Obj.PADRE = Obj.PADRE.replace(/\s/g,'');
			Obj.SEEK = Obj.SEEK.replace(/\s/g,'');
		}

		for( var i=0; i<Obj.rows.length; i++ ){						// Fila vacia/reutilizable solo mostrar el alta
			if( Obj.rows[i].cells[0].gsOP=='I' ){
				Obj.rows[i].style.display = 'block';
			}else{
				Obj.rows[i].style.display = ( o.getAttribute("LIBRE")!=null && o.LIBRE==1 ) ? 'none' : Ver;
			}
		}

		var el = S.event(window);
		var x = document.body.scrollLeft-o.offsetParent.offsetParent.scrollLeft;			//.Por el desplazamiento de la SubVentana
		var y = document.body.scrollTop -o.offsetParent.offsetParent.scrollTop;
		while( el != null ){
			y += el.offsetTop;
			x += el.offsetLeft;
			el = el.offsetParent;
		}
		Obj.style.display = 'block';
		if( Obj.clientHeight == 0 ){
			Obj.style.display = 'none';
		}else{
			var x = event.screenX-event.clientX+3;			//.Por el desplazamiento de la SubVentana
			var y = event.screenY-event.clientY+3;
			var x = document.body.scrollLeft+event.clientX-3;			//.Por el desplazamiento de la SubVentana
			var y = document.body.scrollTop+event.clientY-Obj.offsetHeight+3;
			Obj.style.left = px(x);
			Obj.style.top = px(y);
		}
		eClearEvent();
	*/
}
/*
	function mOver(){
		var Obj = S.event(window);
		if( Obj.tagName == 'TD' ) Obj.className = 'ON';
	}

	function mOut(){
		var Obj = S.event(window);
		if( Obj.tagName == 'TABLE' ){
			Obj.style.display = 'none';
		}else{
			Obj.className = '';
		}
	}
*/

var _gsMenuON,											//.ID del menu que ha generado el evento
	_gsSMWin = null;													//.Puntero de nueva ventana

function gsClickSMenu(Obj, Op){
	if( Op==undefined ) var Op = S.event(window).gsOP;

	if( S(Obj).attr("gsEXE")=="" ){												// FormOnLine con SubFicha
		Obj.style.display = 'none';
		eSLAction( Obj.id.substring(2,Obj.id.length-1), Op, 1 );
		return;
	}

	if( Obj.PADRE==undefined ){
		if( Obj.Indice ) while( Obj.Indice.indexOf(' ')!=-1 ) Obj.Indice = Obj.Indice.replace(' ','');
		if( Obj.Indice ){										// Altas/Modificaciones directas al servidor, si está vacío será de una SubLista con "FormStatic"
			var o = DGI(Obj.id.substring(1));
			// Para cuando se pone un titulo a las sublista seleccionar la siguiente fila
			if( o.SaltaTR != undefined ) o = o.parentNode.parentNode.rows[1];
			var dato = Obj.Indice.split(',');
			var tmp = dato[0].split('=');
			Obj.PADRE = tmp[0]+'='+o.cells[tmp[1]].textContent;
			var tmp = dato[1].split('=');
			Obj.SEEK = tmp[0]+'='+o.cells[tmp[1]].textContent;
			Obj.PADRE = Obj.PADRE.replace(/\s/g,'');
			Obj.SEEK = Obj.SEEK.replace(/\s/g,'');
		}
	}

	var sPadre = Obj.PADRE,
		Titulo = S(DGI(Obj.id.substring(1))).attr("WTITLE");		//DGI(Obj.id.substring(1)).WTITLE;
	if( S.trim(Titulo)=='' ) Titulo = '...';						//SUBVENTANA';

	if( Op=='Fa' && S(Obj).attr("FS")=="false" ){
		if( _Accion=='A' ){
			sPadre = 'conexion='+_Connection_;
		}else{
			var txt = Obj.id.replace('m[','['),
				tmp = sPadre.split('=');
			sPadre = tmp[0]+'='+DGI(txt).PADRE;
		}
	}

	Obj.style.display = 'none';

	var x = y = undefined,
		oSL = DGI(Obj.id.substring(1));
	if( !isNaN(S(oSL).attr("CX")) ) x = S(oSL).attr("CX")*1;			//if( S(oSL).attr("CX")!='' ) x = S(oSL).attr("CX")*1;
	if( !isNaN(S(oSL).attr("CY")) ) y = S(oSL).attr("CY")*1;			//if( S(oSL).attr("CY")!='' ) y = S(oSL).attr("CY")*1;

	if( S(Obj).attr("FS")=="true" ){
		var Orden = 'edes.php?Fa:'+ S(Obj).attr("gsEXE"),							// + '&_ASSIGN=a&'+sPadre + '&_SEEK&'+escape(Obj.SEEK);
			sOp = Op;
		if( sOp.substring(0,1)=='F' ) sOp = sOp.substring(1,2);
		DGI(Obj.id.substring(1)).MODO = sOp;
		_gsSMWin = top.eSWSetIcon(DGI(Obj.id.substring(1)), window, Orden, Titulo, true, undefined, undefined, x,y);			//, undefined,undefined, 400,400 );
	}else{
		var Orden = 'edes.php?'+ Op+':'+ S(Obj).attr("gsEXE") + '&_ASSIGN=a&'+sPadre + '&_SEEK&'+escape(Obj.SEEK);
		_gsSMWin = top.eSWOpen(window, Orden, Titulo, undefined, undefined, undefined, x,y);
	}
	Obj.WINDOW = _gsSMWin;											// Objeto Ventana para poder ocultarla al cambiar de solapa
}

function gsResetLista( xObj ){							// Se llama desde 'abcm'
	//alert('ojo');
	xObj = '['+xObj+']';
	var p = DGI('c'+xObj).scrollTop,
		sTit = DGI(xObj).WTITLE;								//alert( DGI(xObj).outerHTML );alert( _gsSMWin);alert( _gsSMWin.DGI('_Copia').innerHTML);
	DGI(xObj).outerHTML = _gsSMWin.DGI('_Copia').innerHTML;
	DGI(xObj).WTITLE = sTit;
	DGI('c'+xObj).scrollTop = p;
	THScroll( xObj );
}

//.Fin:----- SubMenu en SubListas -----


function _SubListPrecalculo(nmFile, alto, ancho, conTitle){
	if( conTitle ){		// Para que se renderice bien
		setTimeout(function(){
			DGI(nmFile).rows[0].cells[0].style.display = 'table-block';
		}, 1);
	}
	if( alto!="" ){
		DGI("c"+nmFile).style.height = AltoNFilas(nmFile, alto)+"px";
		setTimeout(function(){
			var o = DGI("c"+nmFile);
			if( o.scrollHeight>o.clientHeight ){
				o.style.height = (o.scrollHeight+(o.scrollHeight-o.clientHeight))+"px";
			}
		}, 100);
	}

	if( ancho!="" ){
		DGI("c"+nmFile).style.width = "10000px";
		DGI(nmFile).style.width = DGI(nmFile).offsetWidth+"px";
		DGI("c"+nmFile).style.overflowX = "auto";
		DGI("c"+nmFile).style.width = px(ancho);
	}
}
