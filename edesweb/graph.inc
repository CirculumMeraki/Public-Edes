<?php
if( !isset($_SESSION['_User']) || $GLOBALS['_gsID'] != getmypid() ) exit;
function eGraph($TIPO, $usuCursor, $_Form, $_COLSOP, $TituloGrafica, $TitleCol, $TitleRow, $TituloLeyenda="", $Var=array()){
global $_GRAPHHIDECOL, $_GRAPHPERCENTAGE, $_FORMAT, $_SelVirtual, $_DimTHText;
$TituloGrafica = str_replace('&nbsp;',' ',$TituloGrafica);
$TitleCol = str_replace('&nbsp;',' ',$TitleCol);
$TitleRow = str_replace('&nbsp;',' ',$TitleRow);
$TituloLeyenda = str_replace('&nbsp;',' ',$TituloLeyenda);
if( function_exists('eGraphUser') ){
eGraphUser($TIPO, $_Form, $_COLSOP, $TituloGrafica, $TitleCol, $TitleRow, $TituloLeyenda);
}
static $Sufijo = '';
$TIPO = strtoupper($TIPO);
$GrillWidthMax = $_SESSION['_pxW_']-15-15-10;
if( isset($Var['GrillWidthMax']) ) $GrillWidthMax = $Var['GrillWidthMax'];
if( isset($Var['Decimals']) ) $UserDecimals = $Var['Decimals'];
$ConMapa = (isset($Var['map']) ? $Var['map']:true);
$TituloGrafica = str_replace("\n",' ',str_replace('<br>',' ',str_replace('<BR>',' ',$TituloGrafica)));
$TitleCol = str_replace("\n",' ',str_replace('<br>',' ',str_replace('<BR>',' ',$TitleCol)));
$TitleRow = str_replace("\n",' ',str_replace('<br>',' ',str_replace('<BR>',' ',$TitleRow)));
$TituloGrafica = str_replace('&quot;','"',$TituloGrafica);
$TitleCol = str_replace('&quot;','"',$TitleCol);
$TitleRow = str_replace('&quot;','"',$TitleRow);
$TituloGrafica = str_replace('&#34;','"',$TituloGrafica);
$TitleCol = str_replace('&#34;','"',$TitleCol);
$TitleRow = str_replace('&#34;','"',$TitleRow);
for( $n=0; $n<count($_Form); $n++ ){
$_Form[$n][0] = str_replace('&quot;','"',$_Form[$n][0]);
$_Form[$n][0] = str_replace('&nbsp;',' ',$_Form[$n][0]);
$_Form[$n][0] = str_replace('&lt;'  ,'<',$_Form[$n][0]);
$_Form[$n][0] = str_replace('&nbsp;',' ',$_Form[$n][0]);
if( $_Form[$n][_OFIELD]=='' ) $_COLSOP[$n] = '';
}
$TitleFontType = '$a/ttf/arialnb.ttf';	if( isset($Var['TitleFontType']) ) $TitleFontType = $Var['TitleFontType'];
$FontType	   = '$a/ttf/arial.ttf';	if( isset($Var['FontType']) )	   $FontType	  = $Var['FontType'];
$FontType = eScript($FontType);
$TitleFontType = eScript($TitleFontType);
$TitleFontSize    = 14;	if( isset($Var['TitleFontSize']) )		$TitleFontSize		= $Var['TitleFontSize'];
$TitleColFontSize = 12;	if( isset($Var['TitleColFontSize']) )	$TitleColFontSize	= $Var['TitleColFontSize'];
$TitleRowFontSize = 12;	if( isset($Var['TitleRowFontSize']) )	$TitleRowFontSize	= $Var['TitleRowFontSize'];
$DataFontSize     =  9;	if( isset($Var['DataFontSize']) )		$DataFontSize		= $Var['DataFontSize'];
$TitleRowCoordX = 0;
$GrillHeight = 250;		if( isset($Var['GrillHeight']) )	$GrillHeight	= $Var['GrillHeight'];
$GrillWidthMin = 250;	if( isset($Var['GrillWidthMin']) )	$GrillWidthMin	= $Var['GrillWidthMin'];
$GrillMarginTop = 0;	if( isset($Var['GrillMarginTop']) )	$GrillMarginTop	= $Var['GrillMarginTop'];
$GrillMarginLeft = 0;
$GrillMarginBottom = $DataFontSize; if( isset($Var['GrillMarginBottom']) ) $GrillMarginBottom = $Var['GrillMarginBottom'];
$BarMargin = 5;		if( isset($Var['BarMargin']) )		$BarMargin		= $Var['BarMargin'];
$BarSeparation = 1;	if( isset($Var['BarSeparation']) )	$BarSeparation	= $Var['BarSeparation'];
$BarWidth = 20;		if( isset($Var['BarWidth']) )		$BarWidth		= $Var['BarWidth'];
$BarValue = true;	if( isset($Var['BarValue']) )		$BarValue		= $Var['BarValue'];
if( $TitleRow!='' ){
$TitleRowCoordX = $TitleRowFontSize + $TitleRowFontSize*(1/2);
$GrillMarginLeft = $TitleRowFontSize + $TitleRowFontSize*(1/2) + $TitleRowFontSize*(1/2);
}
if( isset($Var['TitleRowCoordX']) ) $TitleRowCoordX = $Var['TitleRowCoordX'];
if( isset($Var['GrillMarginLeft']) ) $GrillMarginLeft = $Var['GrillMarginLeft'];
$GrillMarginRight = $TitleRowFontSize; if( isset($Var['GrillMarginRight']) ) $GrillMarginRight = $Var['GrillMarginRight'];
$ValueLeft = ceil(($BarWidth-$DataFontSize)/2);
$DatosCol = array();
$LabelX = array();
$vMax = 0;
$vMin = 0;
$TotalGrupos = 1;
$TotalColumnas = 0;
$AnchoGrupo = 0;
$LeyendMaxWidth = 0;
$NumDecimal = 0;
$i=0;
if( $TIPO=='P' ){
$UltLabel = ''; $MismoLabel = true; $DimColLabelX = array();
for($c=0; $c<count($usuCursor[0]); $c++){
if( $_COLSOP[$c]<>'+' ) continue;
if( $_Form[$c][6]=='*' || $_Form[$c][6]=='' ) continue;
if( isset($_GRAPHHIDECOL[$c]) && $_GRAPHHIDECOL[$c] ) continue;
if( $_Form[$c][0]=='' ){
$LabelX[$i] = '(vacío)';
}else{
$_Form[$c][0] = str_replace('&quot;','"',$_Form[$c][0]);
$LabelX[$i] = str_replace("\n",' ',str_replace('<br>',' ',str_replace('<BR>',' ',$_Form[$c][0])));
}
$LabelX[$i] = str_replace('&nbsp;',' ',$LabelX[$i]);
$LabelX[$i] = str_replace('<BR>',' ',$LabelX[$i]);
$LabelX[$i] = str_replace('<br>',' ',$LabelX[$i]);
$Leyenda[] = $LabelX[$i];
$DimColLabelX[$i] = $c;
if( $UltLabel=='' ){
$UltLabel = $LabelX[$i];
}else if( $UltLabel != $LabelX[$i] ) $MismoLabel = false;
$sa = _GraphTextSize($LabelX[$i], $DataFontSize, $FontType);
$LeyendMaxWidth = max($LeyendMaxWidth, $sa[0]);
$i++;
}
if( $MismoLabel ){
global $_THCOLSPAN, $_THCOLSPANDEF;
$LeyendMaxWidth = 0;
$nl = 0;

// if( $_SESSION["_User"]==88 ){
	// global $THCol, $THColPuntero, $_DimTHText;
	// ePrintR($_THCOLSPANDEF, $LabelX, $THCol, $DimColLabelX, $THColPuntero, $_DimTHText);
	// ePrintR($THColPuntero, $_DimTHText);
// }


if( count($_THCOLSPAN)>0 ){
	for($c=0; $c<count($LabelX); $c++){				// textos del $_Form
		$Col = $DimColLabelX[$c];

		$LabelX[$c] = str_replace('<br>'  ,' ',$_DimTHText[1][$Col]);
		$LabelX[$c] = str_replace('<BR>'  ,' ',$LabelX[$c]);
		$LabelX[$c] = str_replace('&nbsp;',' ',$LabelX[$c]);
		$Leyenda[$nl++] = $LabelX[$c];
		$sa = _GraphTextSize($LabelX[$c], $DataFontSize, $FontType);
		$LeyendMaxWidth = max($LeyendMaxWidth, $sa[0]);

		// for($i=0; $i<count($_THCOLSPANDEF); $i++){	// textos del doble TH
		// 	$Col -= $_THCOLSPANDEF[$i][0];
		// 	if( $Col<1 ){
		// 		$LabelX[$c] = str_replace('<br>'  ,' ',$_THCOLSPANDEF[$i][1]);
		// 		$LabelX[$c] = str_replace('<BR>'  ,' ',$LabelX[$c]);
		// 		$LabelX[$c] = str_replace('&nbsp;',' ',$LabelX[$c]);
		// 		$Leyenda[$nl++] = $LabelX[$c];
		// 		$sa = _GraphTextSize($LabelX[$c], $DataFontSize, $FontType);
		// 		$LeyendMaxWidth = max($LeyendMaxWidth, $sa[0]);
		// 		break;
		// 	}
		// }

	}
}


}
$i=0;
for($c=0; $c<count($usuCursor[0]); $c++){
if( $_COLSOP[$c]<>'+' ) continue;
if( $_Form[$c][6]=='*' || $_Form[$c][6]=='' ) continue;
if( isset($_GRAPHHIDECOL[$c]) && $_GRAPHHIDECOL[$c] ) continue;
$DataLengPx = _GraphTextSize($LabelX[$i], $DataFontSize, $FontType);
$LabelXHeight = max($LabelXHeight, $DataLengPx[0]);
for($f=0; $f<count($usuCursor); $f++){
$DatosCol[$i] += $usuCursor[$f][$c];
}
if( substr($_Form[$c][1],0,7)=='Campo__' ){
list(,$snd) = explode(',',$_Form[$c][4]);
$NumDecimal = max($NumDecimal,$snd);
}
$i++;
}
if( !$Var['NoData'] && $i<2 ) return array('',7);
}else if( $TIPO=='C' ){
$UltLabel = ''; $MismoLabel = true; $DimColLabelX = array();
for( $c=0; $c<count($usuCursor[0]); $c++ ){
if( $_COLSOP[$c]<>'+' ) continue;
if( $_Form[$c][6]=='*' || $_Form[$c][6]=='' ) continue;
if( isset($_GRAPHHIDECOL[$c]) && $_GRAPHHIDECOL[$c] ) continue;
if( $_Form[$c][0]=='' ){
$LabelX[$i] = '(vacío)';
}else{
$_Form[$c][0] = str_replace('&quot;','"',$_Form[$c][0]);
$LabelX[$i] = str_replace("\n",' ',str_replace('<br>',' ',str_replace('<BR>',' ',$_Form[$c][0])));
}
$DimColLabelX[$i] = $c;
if( $UltLabel=='' ){
$UltLabel = $LabelX[$i];
}else if( $UltLabel != $LabelX[$i] ) $MismoLabel = false;
if( substr($_Form[$c][1],0,7)=='Campo__' ){
list(,$snd) = explode(',',$_Form[$c][4]);
$NumDecimal = max($NumDecimal,$snd);
}
$i++;
}
if( $MismoLabel ){
global $_THCOLSPAN, $_THCOLSPANDEF;
if( count($_THCOLSPAN)>0 ){
	for( $c=0; $c<count($LabelX); $c++ ){
		$Col = $DimColLabelX[$c];


		$LabelX[$c] = str_replace('<br>',' ',$_DimTHText[1][$Col]);
		$LabelX[$c] = str_replace('<BR>',' ',$LabelX[$c]);
		$LabelX[$c] = str_replace('&nbsp;',' ',$LabelX[$c]);


		// for( $i=0; $i<count($_THCOLSPANDEF); $i++ ){
		// $Col -= $_THCOLSPANDEF[$i][0];
		// if( $Col<1 ){
		// $LabelX[$c] = str_replace('<br>',' ',$_THCOLSPANDEF[$i][1]);
		// $LabelX[$c] = str_replace('<BR>',' ',$LabelX[$c]);
		// $LabelX[$c] = str_replace('&nbsp;',' ',$LabelX[$c]);
		// break;
		// }
		// }

	}
}
}
$i=0;
for( $c=0; $c<count($usuCursor[0]); $c++ ){
if( $_COLSOP[$c]<>'+' ) continue;
if( $_Form[$c][6]=='*' || $_Form[$c][6]=='' ) continue;
if( isset($_GRAPHHIDECOL[$c]) && $_GRAPHHIDECOL[$c] ) continue;
$DataLengPx = _GraphTextSize( $LabelX[$i], $DataFontSize, $FontType );
$LabelXHeight = max( $LabelXHeight, $DataLengPx[0] );
for( $f=0; $f<count($usuCursor); $f++ ){
$DatosCol[$i] += $usuCursor[$f][$c];
}
$i++;
}
if( !$Var['NoData'] && $i<2 ) return array('',7);
}elseif( $TIPO=='R' ){
$nColsOp = 0;
$LabelDesdeCol = 0;
$tmp = $usuCursor[0][0];
$EsDistinto = false;
for($f=0; $f<count($usuCursor); $f++){
if( $tmp!=$usuCursor[$f][0] ){
$EsDistinto = true;
break;
}
}
if( !$EsDistinto ) $LabelDesdeCol++;
$DimConLabel = array();
for($c=0; $c<count($_COLSOP); $c++){
$DimConLabel[$c] = false;
if( $_Form[$c][6]=='*' || $_Form[$c][6]=='' ) continue;
if( $_COLSOP[$c]=='+' || $_COLSOP[$c]=='!' ) continue;
if( isset($_GRAPHHIDECOL[$c]) && $_GRAPHHIDECOL[$c] ) continue;
$Bak = $usuCursor[$f][$c];
for($f=0; $f<count($usuCursor); $f++){
if( $Bak!=$usuCursor[$f][$c] ){
$DimConLabel[$c] = true;
break;
}
}
}
for($f=0; $f<count($usuCursor); $f++){
$LabelX[$i] = '';
for($c=$LabelDesdeCol; $c<count($_COLSOP); $c++){
if( $_Form[$c][6]=='*' || $_Form[$c][6]=='' ) continue;
if( $_COLSOP[$c]=='+' || $_COLSOP[$c]=='!' ) continue;
if( isset($_GRAPHHIDECOL[$c]) && $_GRAPHHIDECOL[$c] ) continue;
if( !$DimConLabel[$c] ) continue;
if( $LabelX[$i]!='' ) $LabelX[$i] .= ' - ';
if( $usuCursor[$f][$c]=='' ){
$LabelX[$i] .= '(vacío)';
}else{
$usuCursor[$f][$c] = str_replace('&quot;','"',$usuCursor[$f][$c]);
if( $_Form[$c][3]=='SV' ){
$LabelX[$i] .= $_SelVirtual[$_Form[$c][1]][ $usuCursor[$f][$c] ];
$LabelX[$i] = str_replace('&lt;','<',$LabelX[$i]);
$LabelX[$i] = str_replace('&gt;','>',$LabelX[$i]);
$LabelX[$i] = str_replace('&nbsp;',' ',$LabelX[$i]);
$LabelX[$i] = str_replace("\n",' ',str_replace('<br>',' ',str_replace('<BR>',' ',$LabelX[$i])));
}else{
$LabelX[$i] .= str_replace("\n",' ',str_replace('<br>',' ',str_replace('<BR>',' ',$usuCursor[$f][$c])));
}
}
}
$DataLengPx = _GraphTextSize($LabelX[$i], $DataFontSize, $FontType);
$LabelXHeight = max($LabelXHeight, $DataLengPx[0]);
for($c=0; $c<count($usuCursor[$f]); $c++){
if( $_COLSOP[$c]<>'+' ) continue;
$DatosCol[$i] += $usuCursor[$f][$c];
$nColsOp++;
}
if( substr($_Form[$f][1],0,7)=='Campo__' ){
list(,$snd) = explode(',',$_Form[$f][4]);
$NumDecimal = max($NumDecimal,$snd);
}
$i++;
}
if( $i==0 || $nColsOp==0 ) return array('',8);
}elseif( $TIPO=='G' ){
for( $c=0; $c<count($_COLSOP); $c++ ){
if( isset($_GRAPHHIDECOL[$c]) && $_GRAPHHIDECOL[$c] ) continue;
if( $_Form[$c][6]=='*' || $_Form[$c][6]=='' ) continue;
if( $_COLSOP[$c]=='+' ) $i++;
}
if( $i<2 ) return array('',9);
$LabelDesdeCol = 0;
$tmp = $usuCursor[0][0];
$EsDistinto = false;
for( $f=0; $f<count($usuCursor); $f++ ){
if( $tmp!=$usuCursor[$f][0] ){
$EsDistinto = true;
break;
}
}
if( !$EsDistinto ) $LabelDesdeCol++;
$DimConLabel = array();
for( $c=0; $c<count($_COLSOP); $c++ ){
$DimConLabel[$c] = false;
if( $_Form[$c][6]=='*' || $_Form[$c][6]=='' ) continue;
if( $_COLSOP[$c]=='+' || $_COLSOP[$c]=='!' ) continue;
if( isset($_GRAPHHIDECOL[$c]) && $_GRAPHHIDECOL[$c] ) continue;
$Bak = $usuCursor[$f][$c];
for( $f=0; $f<count($usuCursor); $f++ ){
if( $Bak!=$usuCursor[$f][$c] ){
$DimConLabel[$c] = true;
break;
}
}
}
$i = 0;
for( $f=0; $f<count($usuCursor); $f++ ){
$LabelX[$i] = '';
for( $c=$LabelDesdeCol; $c<count($_COLSOP); $c++ ){
if( isset($_GRAPHHIDECOL[$c]) && $_GRAPHHIDECOL[$c] ) continue;
if( $_Form[$c][6]=='*' || $_Form[$c][6]=='' ) continue;
if( $_COLSOP[$c]=='+' || $_COLSOP[$c]=='!' ) continue;
if( !$DimConLabel[$c] ) continue;
if( $LabelX[$i]!='' ) $LabelX[$i] .= ' - ';
if( $usuCursor[$f][$c]=='' ){
$LabelX[$i] .= '(vacío)';
}else{
$usuCursor[$f][$c] = str_replace('&quot;','"',$usuCursor[$f][$c]);
if( $_Form[$c][3]=='SV' ){
$LabelX[$i] .= $_SelVirtual[ $_Form[$c][1] ][ $usuCursor[$f][$c] ];
$LabelX[$i] = str_replace('&lt;','<',$LabelX[$i]);
$LabelX[$i] = str_replace('&gt;','>',$LabelX[$i]);
$LabelX[$i] = str_replace('&nbsp;',' ',$LabelX[$i]);
$LabelX[$i] = str_replace("\n",' ',str_replace('<br>',' ',str_replace('<BR>',' ',$LabelX[$i])));
}else{
$LabelX[$i] .= str_replace("\n",' ',str_replace('<br>',' ',str_replace('<BR>',' ',$usuCursor[$f][$c])));
}
}
}
$DataLengPx = _GraphTextSize( $LabelX[$i], $DataFontSize, $FontType );
$LabelXHeight = max( $LabelXHeight, $DataLengPx[0] );
for( $c=0; $c<count($usuCursor[$f]); $c++ ){
if( $_COLSOP[$c]<>'+' ) continue;
if( $_Form[$c][6]=='*' ) continue;
if( $i==0 && $c==0 ){
$vMax = $usuCursor[$f][$c];
$vMin = $usuCursor[$f][$c];
}
$vMax = Max( $usuCursor[$f][$c], $vMax );
$vMin = Min( $usuCursor[$f][$c], $vMin );
}
if( substr($_Form[$f][1],0,7)=='Campo__' ){
list(,$snd) = explode(',',$_Form[$f][4]);
$NumDecimal = max($NumDecimal,$snd);
}
$i++;
}
$TotalGrupos = count($LabelX);
for( $c=0; $c<count($_COLSOP); $c++ ){
if( $_Form[$c][6]=='*' ) continue;
if( $_COLSOP[$c]=='+' ) $TotalColumnas++;
}
}else{
return array('',1);
}
if( isset($UserDecimals) ) $NumDecimal = $UserDecimals;
if( $TIPO<>'G' ){
if( ($TIPO=='C' || $TIPO=='P') && isset($_GRAPHPERCENTAGE[$TIPO]) ){
$TotalValor = 0;
for( $n=0; $n<count($DatosCol); $n++ ) $TotalValor += $DatosCol[$n];
for( $n=0; $n<count($DatosCol); $n++ ) $DatosCol[$n] = (100*$DatosCol[$n])/$TotalValor;
if( function_exists('eGraphUserData') ){
eGraphUserData( $TIPO, $_Form, $DatosCol );
}
}
for( $n=0; $n<count($DatosCol); $n++ ){
if( $n==0 ){
$vMax = $DatosCol[$n];
$vMin = $DatosCol[$n];
}
$vMax = Max( $DatosCol[$n], $vMax );
$vMin = Min( $DatosCol[$n], $vMin );
}
if( !$Var['NoData'] && ($vMax==$vMin && $TIPO<>'R') && $vMax==0 ) return array('',10);
$TotalColumnas = count($DatosCol);
}
if( $TIPO=='P' && $vMin<0 ) return array('',11);
if( $TituloGrafica!='' ){
$GrillMarginTop += ceil($TitleFontSize+($TitleFontSize*(1/3)));
$TituloGraficaY = $GrillMarginTop;
}
if( $TitleCol!='' ){
$GrillMarginTop += ceil($TitleFontSize*(1/3));
$GrillMarginTop += $TitleColFontSize;
$TitleColGraficaY = $GrillMarginTop;
}
$GrillMarginTop += ceil($TitleColFontSize*(2/3));
$vMaxMin = $vMax;
if( $vMin<0 ) $vMaxMin += abs($vMin);
{
$Multiplo = (int)($vMaxMin/7);
$xMultiplo = $Multiplo.'';
$Cada1 = ($xMultiplo[0].str_repeat('0',strlen($Multiplo)-1))*1;
$Cada2 = (($xMultiplo[0]+1).str_repeat('0',strlen($Multiplo)-1))*1;
$LineaCada = $Cada2;
$Dim = array();
for( $n=2; $n<=9; $n++ ) $Dim[$n] = $Cada2/$n;
for( $n=2; $n<=9; $n++ ) if( $Dim[$n]!= (int)$Dim[$n] ) $Dim[$n] = -1;
sort($Dim);
foreach($Dim as $k=>$v){
if( strlen($v.'')==1 && ($v==1 || $v==5) ){
$Cada1 = $v;
break;
}
if( substr($v.'',-1)=='0' ){
$Cada1 = $v;
break;
}
}
$BaseMinima = 0;
if( $vMin<0 ){
while( $BaseMinima>=$vMin ) $BaseMinima -= $Cada1;
$BaseMinima = abs($BaseMinima);
}
}
{
if( ($TIPO=='C' || $TIPO=='P') && isset($_GRAPHPERCENTAGE[$TIPO]) ){
$DatoMaxLong = _GraphTextSize( eNumberFormat(100,$_GRAPHPERCENTAGE[$TIPO]).' %', $DataFontSize, $FontType );
}else{
$DatoMaxLong = _GraphTextSize( eNumberFormat($vMax,$NumDecimal), $DataFontSize, $FontType );
}
$DatoMinLong = _GraphTextSize( eNumberFormat($vMin,$NumDecimal), $DataFontSize, $FontType );
$DatoLong = max( $DatoMaxLong[0], $DatoMinLong[0] );
$GrillMarginLeft += ceil($DatoLong+$DataFontSize);
$GrillPaddingTop = ceil($DatoLong+$DataFontSize/2+(($BarValue)?$DataFontSize:0));
if( $TIPO=='P' ){
$GrillWidth = $BarMargin*2 + $GrillHeight;
$LabelXHeight = (count($Leyenda)+1) * $DataFontSize * 1.5 + 10;
$GrillMarginLeft = $GrillMarginRight;
}else if( $TIPO<>'G' ){
$GrillWidth = $BarMargin*2 + $TotalColumnas*$BarWidth + ($TotalColumnas-1)*$BarSeparation;
}else{
$GrillWidth = $TotalGrupos*$BarMargin*2 + $TotalGrupos*$TotalColumnas*$BarWidth + $TotalGrupos*($TotalColumnas-1)*$BarSeparation;
}
}
$Alto  = $GrillMarginTop  + $GrillHeight + $GrillMarginBottom + $LabelXHeight + $DataFontSize;
$Ancho = $GrillMarginLeft + $GrillWidth  + $GrillMarginRight;
if( $TIPO=='P' ){
}else if( $Ancho < $GrillWidthMin ){
if( $TIPO=='G' ){
$BarWidth = ($GrillWidthMin - ($BarMargin*2 + ($TotalColumnas-1)*$BarSeparation)) / $TotalColumnas;
$BarWidth = ceil( $BarWidth / $TotalGrupos );
}else{
$BarWidth = ceil(($GrillWidthMin - ($BarMargin*2 + ($TotalColumnas-1)*$BarSeparation)) / $TotalColumnas);
}
if( $BarWidth<$TitleRowFontSize ) $BarWidth = $TitleRowFontSize;
$ValueLeft = ceil(($BarWidth-$DataFontSize)/2);
$GrillWidth = $BarMargin*2 + $TotalColumnas*$BarWidth + ($TotalColumnas-1)*$BarSeparation;
if( $TIPO=='G' ) $GrillWidth *= $TotalGrupos;
$Ancho = $GrillMarginLeft + $GrillWidth + $GrillMarginRight;
}else if( $Ancho > $GrillWidthMax ){
if( $TIPO<>'G' ){
}else{
$BarWidth = $DataFontSize+1;
$GrillWidth = $TotalGrupos*$BarMargin*2 + $TotalGrupos*$TotalColumnas*$BarWidth + $TotalGrupos*($TotalColumnas-1)*$BarSeparation;
$ValueLeft = ceil(($BarWidth-$DataFontSize)/2);
$Alto  = $GrillMarginTop + $GrillHeight + $GrillMarginBottom + $LabelXHeight + $DataFontSize;
$Ancho = $GrillMarginLeft + $GrillWidth + $GrillMarginRight;
}
}
$Long = _GraphTextSize( $TitleCol, $TitleColFontSize, $FontType );
if( $Long[0] > $GrillWidth ){
$NewLine = $TitleColFontSize+($TitleColFontSize*(2/3));
$GrillMarginTop += $NewLine;
$Alto += $NewLine;
$TitleColGraficaY += $NewLine;
}
if( $Ancho>$GrillWidthMax ) return array('',2);
if( !$Var['NoData'] && $TotalGrupos*$TotalColumnas==1 ) return array('',3);
if( $TIPO=='G' && count($usuCursor)==1 ) return array('',4);
if( $TIPO=='G' ){
$MaxLeyenda = 0;
$Leyenda = array();
$LeyendaWidth = array();
$i = 0; $AnchoLeyenda = 0;
for( $c=0; $c<count($usuCursor[0]); $c++ ){
if( $_Form[$c][6]=='*' ) continue;
if( $_COLSOP[$c]<>'+' ) continue;
$Label = (($_Form[$c][0]=='')?'(vacío)':str_replace('<BR>',' ',str_replace('<br>',' ',str_replace('·',' ',$_Form[$c][0]))));
$Leyenda[] = $Label;
$DataLengPx = _GraphTextSize( $Label, $DataFontSize, $FontType );
$a = ceil($DataLengPx[0]) + 17;
$MaxLeyenda = max( $a, $MaxLeyenda );
$LeyendaWidth[] = $a;
$AnchoLeyenda += $a;
if( $i>0 ) $AnchoLeyenda += 15;
$i++;
$LeyendMaxWidth = max( $LeyendMaxWidth, $DataLengPx[0] );
}
$Alto += $DataFontSize*3;
$x = $GrillMarginLeft;
for( $n=0; $n<count($Leyenda); $n++ ){
if( $x+$MaxLeyenda > $Ancho ){
$x = $GrillMarginLeft;
$Alto += $DataFontSize * 1.5;
}
$x += $MaxLeyenda+15;
}
}
{
$BarColor = array(
"#ff0000","#008000","#0000ff","#ff00ff","#800000",
"#00ff00","#ff7711","#00ffff",'#ffff00',"#edcba9",
"#008080","#000080","#808000","#800080","#000000",
"#C0DCC0","#A6CAF0","#A0A0A4","#808080","#AAAA00",
"#964B00","#123456","#cc9933","#7711ff","#6495ED"
);
$BarColorGradient = '#FFFFFF';
$BarBorderColor = '#cccccc';
$BarAxisColor  = '#cccccc';
$BarColorUser = false;
$GraphBorderColor = '#eeeeee';
$GraphLayerColor  = '#FFFFFF';
$TitleColor = '#000000';
$TitleRowColor = '#000000';
$TitleColColor = '#000000';
$DataColor   = '#000000';
$GrillColorOne = '#FBFBFB';
$GrillColorTwo = '#F7F7F7';
if( file_exists('../_datos/config/graph.inc' ) ) include('../_datos/config/graph.inc' );
qQuery("select cd_gs_color from {$_SESSION['ShareDictionary']}gs_color order by graph_ord", $co, true );
$n=0;
while( $r=qRow($co) ){
$BarColor[$n] = '#'.$r[0];
$n++;
}
if( $Ancho < $LeyendMaxWidth+17+$GrillMarginRight ) $Ancho = $LeyendMaxWidth+17+$GrillMarginRight;
$im = imageCreateTrueColor($Ancho,$Alto);
for( $n=0; $n<count($BarColor); $n++ ) $BarColor[$n] = _GraphColor($im,$BarColor[$n]);
foreach( $Var as $k=>$v ){
if( substr($k,0,8)=='BarColor' ){
$n = substr($k,8);
$BarColor[$n] = _GraphColor($im,$Var[$k]);
}elseif( substr_count($k,'Color')>0 ){
}
${$k} = $Var[$k];
}
$TitleFontType = eScript($TitleFontType);
$FontType = eScript($FontType);
$GraphBorderColor = _GraphColor($im,$GraphBorderColor);
$GraphLayerColor  = _GraphColor($im,$GraphLayerColor);
$TitleColor = _GraphColor($im,$TitleColor);
$TitleRowColor = _GraphColor($im,$TitleRowColor);
$TitleColColor = _GraphColor($im,$TitleColColor);
$DataColor   = _GraphColor($im,$DataColor);
$BarColorGradient = _GraphColor($im,$BarColorGradient);
$BarBorderColor = _GraphColor($im,$BarBorderColor);
$BarAxisColor  = _GraphColor($im,$BarAxisColor);
$GrillColorOne = _GraphColor($im,$GrillColorOne);
$GrillColorTwo = _GraphColor($im,$GrillColorTwo);
$ColorRojo   = _GraphColor($im,'#FF0000');
imageFilledRectangle( $im, 0, 0, $Ancho-1, $Alto-1, $GraphLayerColor );
if( $GraphBorderColor!='' ) imageRectangle( $im, 0, 0, $Ancho-1, $Alto-1, $GraphBorderColor );
}
{
if( $TIPO=='P' ){
if( $TituloGrafica!='' ){
$Long = _GraphTextSize( $TituloGrafica, $TitleFontSize, $TitleFontType );
if( $Long[0] <= $GrillWidth ){
$x = $GrillMarginLeft+(($GrillWidth-$Long[0])/2);
}else{
$x = ($GrillMarginLeft+$GrillWidth+$TitleRowFontSize-$Long[0])/2;
}
imageTTFText($im, $TitleFontSize, 0, $x,$TituloGraficaY, $TitleColor, $TitleFontType, $TituloGrafica );
}
if( $TitleCol!='' ){
$Long = _GraphTextSize( $TitleCol, $TitleColFontSize, $FontType );
if( $Long[0] <= $GrillWidth ){
$x = $GrillMarginLeft+(($GrillWidth-$Long[0])/2);
}else{
if( $Long[0] > $GrillWidth ){
list( $Txt1, $TitleCol ) = _DivideTexto( $TitleCol );
$Long = _GraphTextSize( $Txt1, $TitleColFontSize, $FontType );
if( $Long[0] <= $GrillWidth ) $x = $GrillMarginLeft+(($GrillWidth-$Long[0])/2);
imageTTFText( $im, $TitleColFontSize, 0, $x, $TitleColGraficaY-($TitleColFontSize+($TitleColFontSize*(2/3))), $TitleColColor, $FontType, $Txt1 );
$Long = _GraphTextSize( $TitleCol, $TitleColFontSize, $FontType );
$x = $GrillMarginLeft+(($GrillWidth-$Long[0])/2);
}else{
$x = ($GrillMarginLeft+$GrillWidth+$TitleRowFontSize-$Long[0])/2;
}
}
imageTTFText( $im, $TitleColFontSize, 0, $x, $TitleColGraficaY, $TitleColColor, $FontType, $TitleCol );
}
}else{
if( $TitleRow!='' ){
$Long = _GraphTextSize( $TitleRow, $TitleRowFontSize, $FontType );
if( $Long[0] <= $GrillHeight ){
$y = $GrillMarginTop+$Long[0]+(($GrillHeight-$Long[0])/2);
}else{
$y = $GrillMarginTop+$Long[0];
}
imageTTFText($im, $TitleRowFontSize, 90, $TitleRowCoordX,$y, $TitleRowColor, $FontType, $TitleRow );
}
if( $TituloGrafica!='' ){
$Long = _GraphTextSize( $TituloGrafica, $TitleFontSize, $TitleFontType );
if( $Long[0] <= $GrillWidth ){
$x = $GrillMarginLeft+(($GrillWidth-$Long[0])/2);
}else{
$x = ($GrillMarginLeft+$GrillWidth+$TitleRowFontSize-$Long[0])/2;
}
imageTTFText($im, $TitleFontSize, 0, $x,$TituloGraficaY, $TitleColor, $TitleFontType, $TituloGrafica );
}
if( $TitleCol!='' ){
$Long = _GraphTextSize( $TitleCol, $TitleColFontSize, $FontType );
if( $Long[0] <= $GrillWidth ){
$x = $GrillMarginLeft+(($GrillWidth-$Long[0])/2);
}else{
if( $Long[0] > $GrillWidth ){
list( $Txt1, $TitleCol ) = _DivideTexto( $TitleCol );
$Long = _GraphTextSize( $Txt1, $TitleColFontSize, $FontType );
if( $Long[0] <= $GrillWidth ) $x = $GrillMarginLeft+(($GrillWidth-$Long[0])/2);
imageTTFText( $im, $TitleColFontSize, 0, $x, $TitleColGraficaY-($TitleColFontSize+($TitleColFontSize*(2/3))), $TitleColColor, $FontType, $Txt1 );
$Long = _GraphTextSize( $TitleCol, $TitleColFontSize, $FontType );
$x = $GrillMarginLeft+(($GrillWidth-$Long[0])/2);
}else{
$x = ($GrillMarginLeft+$GrillWidth+$TitleRowFontSize-$Long[0])/2;
}
}
imageTTFText( $im, $TitleColFontSize, 0, $x, $TitleColGraficaY, $TitleColColor, $FontType, $TitleCol );
}
}
}
$GrillMarginTop += $GrillHeight;
$GrillBaseLine = $GrillMarginTop;
$DimMap = array();
{
if( $TIPO=='P' ){
imageFilledRectangle( $im, $GrillMarginLeft, $GrillMarginTop, $GrillMarginLeft+$GrillWidth-1, $GrillMarginTop-$GrillHeight+1, $GraphLayerColor );
}else{
imageFilledRectangle( $im, $GrillMarginLeft, $GrillMarginTop, $GrillMarginLeft+$GrillWidth-1, $GrillMarginTop-$GrillHeight+1, $GrillColorOne );
}
}
if( $TIPO=='P' ){
$cx = $GrillMarginLeft + $GrillWidth/2;
$cy = $GrillMarginTop - $GrillHeight/2;
$AddTxt = '';
$DatoMasLargo = 0;
for( $n=0; $n<count($DatosCol); $n++ ){
if( isset($_GRAPHPERCENTAGE[$TIPO]) ){
$a = _GraphTextSize( eNumberFormat($DatosCol[$n],$_GRAPHPERCENTAGE[$TIPO]).' %', $DataFontSize, $FontType );
$AddTxt = ' %';
}else{
$a = _GraphTextSize( eNumberFormat($DatosCol[$n],$NumDecimal), $DataFontSize, $FontType );
}
$DatoMasLargo = max( $DatoMasLargo, $a[0] );
}
$Radio = $GrillWidth-20-$DatoMasLargo*2;
$Total = 0;
for( $n=0; $n<count($DatosCol); $n++ ) $Total += $DatosCol[$n];
$nDM = 0;
$AnguloIni = 0;
for( $n=0; $n<count($DatosCol); $n++ ){
$Valor = $DatosCol[$n];
if( isset($_GRAPHPERCENTAGE[$TIPO]) ){
$ValorTxt = eNumberFormat($DatosCol[$n],$_GRAPHPERCENTAGE[$TIPO]).' %';
}else{
$ValorTxt = eNumberFormat($DatosCol[$n],$NumDecimal);
}
$Angulo = ($Valor * 360) / $Total;
if( $Angulo>1 ){
imageFilleDarc( $im, $cx, $cy, $Radio, $Radio, $AnguloIni, $AnguloIni+$Angulo, $BarColor[$n], IMG_ARC_PIE );
}else{
imageFilleDarc( $im, $cx, $cy, $Radio, $Radio, $AnguloIni, $AnguloIni+1      , $BarColor[$n], IMG_ARC_PIE );
}
$rAngulo = deg2rad($AnguloIni+$Angulo/2);
$Radio2 = $Radio/2+10;
$yy = ($Radio2*sin($rAngulo))+$cy;
$xx = ($Radio2*cos($rAngulo))+$cx;
$i = $AnguloIni+$Angulo/2;
$rAngulo = deg2rad($i);
$Radio2 = $Radio/2+7;
if( $i>=90 && $i<270 ){
$i22 = 180-$i;
$DataLengPx = imageTTFBBox($DataFontSize,0,$FontType,$ValorTxt);
$Radio2 = ($Radio/2)+7+$DataLengPx[2];
}else{
$i22 = 360-$i;
}
$yy = ($Radio2*sin($rAngulo))+$cy;
$xx = ($Radio2*cos($rAngulo))+$cx;
imageTTFText($im, $DataFontSize, $i22, $xx, $yy, $DataColor, $FontType, $ValorTxt );
if( $i>=90 && $i<270 ){
$rAngulo = deg2rad($i-1);
}else{
$rAngulo = deg2rad($i+1);
}
$DataLengPx = imageTTFBBox($DataFontSize,0,$FontType,$ValorTxt);
$LongTxt = $DataLengPx[2];
$Radio2 = $Radio/2+7;
$yy  = (($Radio2-7		   )*sin($rAngulo))+$cy;
$xx  = (($Radio2-7		   )*cos($rAngulo))+$cx;
$yy2 = (($Radio2+7+$LongTxt)*sin($rAngulo))+$cy;
$xx2 = (($Radio2+7+$LongTxt)*cos($rAngulo))+$cx;
imageLine( $im, $xx, $yy, $xx2, $yy2, $BarBorderColor );
$DimMap[$nDM][] = (int)$cx;
$DimMap[$nDM][] = (int)$cy;
$Cada = floor($Angulo/10);
if( $Cada<1 ) $Cada = 1;
$uii = -1;
for( $ii=$AnguloIni; $ii<$AnguloIni+$Angulo && $ii<360; $ii+=$Cada ){
$rAngulo = deg2rad($ii);
$Radio2 = $ii;
$yy = ($Radio2*sin($rAngulo))+$cy;
$xx = ($Radio2*cos($rAngulo))+$cx;
$i = $ii;
$rAngulo = deg2rad($i);
if( $i>=90 && $i<270 ){
$i22 = 180-$i;
}else{
$i22 = 360-$i;
}
$yy = ($Radio2*sin($rAngulo))+$cy;
$xx = ($Radio2*cos($rAngulo))+$cx;
if( $i>=90 && $i<270 ){
$rAngulo = deg2rad($i-1);
}else{
$rAngulo = deg2rad($i+1);
}
$DataLengPx = 0;
$LongTxt = 5;
$Radio2 = $Radio/2+0;
$yy  = (($Radio2-0		   )*sin($rAngulo))+$cy;
$xx  = (($Radio2-0		   )*cos($rAngulo))+$cx;
$yy2 = (($Radio2+0+$LongTxt)*sin($rAngulo))+$cy;
$xx2 = (($Radio2+0+$LongTxt)*cos($rAngulo))+$cx;
$DimMap[$nDM][] = (int)$xx;
$DimMap[$nDM][] = (int)$yy;
}
$ii = $AnguloIni+$Angulo;
$rAngulo = deg2rad($ii);
$Radio2 = $ii;
$yy = ($Radio2*sin($rAngulo))+$cy;
$xx = ($Radio2*cos($rAngulo))+$cx;
$i = $ii;
$rAngulo = deg2rad($i);
if( $i>=90 && $i<270 ){
$i22 = 180-$i;
}else{
$i22 = 360-$i;
}
$yy = ($Radio2*sin($rAngulo))+$cy;
$xx = ($Radio2*cos($rAngulo))+$cx;
if( $i>=90 && $i<270 ){
$rAngulo = deg2rad($i-1);
}else{
$rAngulo = deg2rad($i+1);
}
$DataLengPx = 0;
$LongTxt = 5;
$Radio2 = $Radio/2+0;
$yy  = (($Radio2-0		   )*sin($rAngulo))+$cy;
$xx  = (($Radio2-0		   )*cos($rAngulo))+$cx;
$yy2 = (($Radio2+0+$LongTxt)*sin($rAngulo))+$cy;
$xx2 = (($Radio2+0+$LongTxt)*cos($rAngulo))+$cx;
$DimMap[$nDM][] = (int)$xx;
$DimMap[$nDM][] = (int)$yy;
$AnguloIni += $Angulo;
$DimMap[$nDM+1] = $ValorTxt.' '.$TitleRow;
$DimMap[$nDM+2] = $LabelX[$n];
$nDM += 3;
}
}else if( $TIPO<>'P' ){
imageLine( $im, $GrillMarginLeft, $GrillMarginTop, $GrillMarginLeft, $GrillMarginTop-$GrillHeight+1, $DataColor );
if( !$BarValue ) $GrillPaddingTop = $DataFontSize;
$EsPar = true;
$DimZonas = array();
if( $LineaCada > 0 ){
$BaseVMin = ($vMin*$GrillHeight/$vMaxMin) - 0;
$BaseMinima = ($BaseMinima*$GrillHeight/$vMaxMin) - 0;
if( $vMin<0 ){
$a = ($vMin*($GrillHeight-$GrillPaddingTop))/$vMaxMin;
$BaseMinima -= ($BaseMinima + $a);
$BaseMinima++;
}
$x1 = $GrillMarginLeft;
$x2 = $GrillMarginLeft + $GrillWidth - 1;
for( $n=0; $n<$vMaxMin*2; $n+=$LineaCada ){
$a = ($n*($GrillHeight-$GrillPaddingTop))/$vMaxMin;
if( $a+$BaseMinima > $GrillHeight ) break;
$y1 = $GrillBaseLine - $a - $BaseMinima;
if( $EsPar && $n>0 ){
imageFilledRectangle( $im,	$x1+1, $y1+1, $x2, $Old-1, $GrillColorTwo );
}
$EsPar = !$EsPar;
$Old = $y1;
imageLine( $im, $x1, $y1, $x2, $y1, (($n==0) ? $DataColor : $BarAxisColor) );
$DimZonas['z'.$a] = true;
$DatoY = _GraphTextSize( eNumberFormat($n,0), $DataFontSize, $FontType );
$OffsetX = ceil($DatoY[0]+$DataFontSize/2);
imageTTFText($im, $DataFontSize, 0, $GrillMarginLeft-$OffsetX, $y1+$DataFontSize/2, $DataColor, $FontType, eNumberFormat($n,0) );
}
if( $EsPar ){
imageFilledRectangle( $im,	$x1+1, $Old-1, $x2, $GrillMarginTop-$GrillHeight+1, $GrillColorTwo );
}
if( $vMin<0 ){
for( $n=0; $n<$vMaxMin*2; $n+=$LineaCada ){
$a = ($n*($GrillHeight-$GrillPaddingTop))/$vMaxMin*-1;
if( $a+$BaseMinima < 0 ) break;
$y1 = $GrillBaseLine - $a - $BaseMinima;
if( $EsPar && $n>0 ){
imageFilledRectangle( $im,	$x1+1, $y1-1, $x2, $Old+1, $GrillColorTwo );
}
$EsPar = !$EsPar;
$Old = $y1;
imageLine( $im, $x1, $y1, $x2, $y1, (($n==0) ? $DataColor : $BarAxisColor) );
$DimZonas['z'.$a] = true;
$DatoY = _GraphTextSize( eNumberFormat($n*-1,0), $DataFontSize, $FontType );
$OffsetX = ceil($DatoY[0]+$DataFontSize/2);
imageTTFText($im, $DataFontSize, 0, $GrillMarginLeft-$OffsetX, $y1+$DataFontSize/2, $DataColor, $FontType, eNumberFormat($n*-1,0) );
}
if( $EsPar ){
imageFilledRectangle( $im,	$x1+1, $Old+1, $x2, $GrillMarginTop-1, $GrillColorTwo );
}
}
}
if( $LineaCada<>$Cada1 && $Cada1 > 0 ){
for( $n=0; $n<$vMaxMin*2; $n+=$Cada1 ){
$a = ($n*($GrillHeight-$GrillPaddingTop))/$vMaxMin;
if( $a+$BaseMinima > $GrillHeight ) break;
$y1 = $GrillBaseLine - $a - $BaseMinima;
if( $DimZonas['z'.$a] ){
imageLine( $im,	$GrillMarginLeft-2, $y1, $GrillMarginLeft+2, $y1, $DataColor );
}else{
imageLine( $im,	$GrillMarginLeft+1, $y1, $GrillMarginLeft+2, $y1, $BarAxisColor );
}
$i++;
}
}
if( $vMin<0 ){
if( $LineaCada<>$Cada1 && $Cada1 > 0 ){
for( $n=0; $n<$vMaxMin*2; $n+=$Cada1 ){
$a = ($n*($GrillHeight-$GrillPaddingTop))/$vMaxMin*-1;
if( $a+$BaseMinima < 0 ) break;
$y1 = $GrillBaseLine - $a - $BaseMinima;
if( $DimZonas['z'.$a] ){
imageLine( $im,	$GrillMarginLeft-2, $y1, $GrillMarginLeft+2, $y1, $DataColor );
}else{
imageLine( $im,	$GrillMarginLeft+1, $y1, $GrillMarginLeft+2, $y1, $BarAxisColor );
}
$i++;
}
}
}
if( $TIPO=='G' ){
$AnchoGrupo = $BarMargin*2 + $TotalColumnas*$BarWidth + ($TotalColumnas-1)*$BarSeparation;
$x = $AnchoGrupo;
for( $n=0; $n<$TotalGrupos-1; $n++ ){
imageLine( $im, $GrillMarginLeft+$x, $GrillMarginTop, $GrillMarginLeft+$x, $GrillMarginTop-$GrillHeight+1, $BarAxisColor );
$x += $AnchoGrupo;
}
}
}
$GrillBaseLine--;
if( $TIPO=='P' ){
}else if( $TIPO<>'G' ){
for( $n=0; $n<count($DatosCol); $n++ ){
$Valor = $DatosCol[$n];
$a = ($Valor*($GrillHeight-$GrillPaddingTop))/$vMaxMin;
$x = $GrillMarginLeft + $BarMargin + ($n*($BarWidth+$BarSeparation));
$y1 = $GrillBaseLine - $BaseMinima + (($a<0)? 2:0);
if( $BarColorUser ){
$ColorCol = $BarColor[$n];
}else{
$ColorCol = $BarColor[0];
}
if( $TIPO=='C' ) $ColorCol = $BarColor[$n];
if( $BarColorGradient=='' ){
imageFilledRectangle($im, $x, $y1, $x+$BarWidth-1, $y1-$a, $ColorCol);
}else{
if( $Valor<0 && $TotalGrupos==1 ) $ColorCol = $BarColor[1];
_GraphGradient($im, $x, $y1, $x+$BarWidth-1, $y1-$a, $ColorCol, $BarColorGradient, $BarLightPosition);
}
if( $BarBorderColor!='' && ($a>=1 || $a<=-1) ){
imageLine($im,	$x,				$y1	  , $x			  , $y1-$a, $BarBorderColor);
imageLine($im,	$x,				$y1-$a, $x+$BarWidth-1, $y1-$a, $BarBorderColor);
imageLine($im,	$x+$BarWidth-1,	$y1-$a, $x+$BarWidth-1, $y1	  , $BarBorderColor);
}
$MasLabel = '';
if( $BarValue ){
if( $Valor>=0 ){
if( $TIPO=='C' && isset($_GRAPHPERCENTAGE[$TIPO]) ){
$MasLabel = ' %';
$NumDecimal = $_GRAPHPERCENTAGE[$TIPO];
}
imageTTFText($im, $DataFontSize, 90, $x+$DataFontSize+$ValueLeft, $y1-$a-$DataFontSize/2, $DataColor, $FontType, eNumberFormat($Valor,$NumDecimal).$MasLabel );
}else{
imageTTFText($im, $DataFontSize, 90, $x+$DataFontSize+$ValueLeft, $y1-$DataFontSize/2, $DataColor, $FontType, eNumberFormat($Valor,$NumDecimal) );
}
}
$DimMap[] = array(
$x				, $y1	  , $x				, ($y1-$a),
$x				, ($y1-$a), ($x+$BarWidth-1), ($y1-$a),
($x+$BarWidth-1), ($y1-$a), ($x+$BarWidth-1), $y1,
($x+$BarWidth-1), $y1	  , $x				, $y1 );
$DimMap[] = eNumberFormat($Valor,$NumDecimal).$MasLabel.' '.$TitleRow;
$DimMap[] = $LabelX[$n];
}
}else{
$Leyenda = array();
$x = $GrillMarginLeft;
for( $f=0; $f<count($usuCursor); $f++ ){
$x += $BarMargin;
$i = 0;
for( $c=0; $c<count($usuCursor[$f]); $c++ ){
if( $_Form[$c][6]=='*' ) continue;
if( $_COLSOP[$c]<>'+' ) continue;
$Valor = $usuCursor[$f][$c];
$a = ($Valor*($GrillHeight-$GrillPaddingTop))/$vMaxMin;
$y1 = $GrillBaseLine - $BaseMinima + (($a<0)? 2:0);
$ColorCol = $BarColor[$i];
if( $BarColorGradient=='' ){
imageFilledRectangle( $im, $x, $y1, $x+$BarWidth-1, $y1-$a, $ColorCol );
}else{
_GraphGradient( $im, $x, $y1, $x+$BarWidth-1, $y1-$a, $ColorCol, $BarColorGradient, $BarLightPosition );
}
if( $BarBorderColor!='' && ($a>=1 || $a<=-1) ){
imageLine( $im,	$x,				$y1		, $x			, $y1-$a	, $BarBorderColor );
imageLine( $im,	$x,				$y1-$a	, $x+$BarWidth-1, $y1-$a	, $BarBorderColor );
imageLine( $im,	$x+$BarWidth-1,	$y1-$a	, $x+$BarWidth-1, $y1	, $BarBorderColor );
}
if( $BarValue ){
if( $Valor >=0 ){
imageTTFText($im, $DataFontSize, 90, $x+$DataFontSize+$ValueLeft, $y1-$a-$DataFontSize/2, $DataColor, $FontType, eNumberFormat($Valor,$NumDecimal) );
}else{
imageTTFText($im, $DataFontSize, 90, $x+$DataFontSize+$ValueLeft, $y1-$DataFontSize/2, $DataColor, $FontType, eNumberFormat($Valor,$NumDecimal) );
}
}
$Label = (($_Form[$c][0]=='')?'(vacío)':str_replace('<BR>',' ',str_replace('<br>',' ',str_replace('·',' ',$_Form[$c][0]))));
$DimMap[] = array(
$x				, $y1	  , $x				, ($y1-$a),
$x				, ($y1-$a), ($x+$BarWidth-1), ($y1-$a),
($x+$BarWidth-1), ($y1-$a), ($x+$BarWidth-1), $y1,
($x+$BarWidth-1), $y1	  , $x				, $y1 );
$DimMap[] = eNumberFormat($Valor,$NumDecimal).' '.$TitleRow;
if( $TIPO=='G' ){
$DimMap[] = $Label."\n".$LabelX[$f];
}else{
$DimMap[] = $Label;
}
if( $f==0 ){
$Leyenda[] = $Label;
}
$x += $BarWidth + $BarSeparation;
$i++;
}
$x += $BarMargin - $BarSeparation;
}
}
if( $TIPO<>'P' ){
imageLine( $im, $GrillMarginLeft, $GrillBaseLine+1, $GrillMarginLeft+$GrillWidth-1, $GrillBaseLine+1, $DataColor );
}
$LabelXHeight = 0;
if( $TIPO=='P' ){
$BarColorGradient = '';
$BarBorderColor = '';
$y = $GrillBaseLine+$GrillMarginBottom + 20;
$x = $GrillMarginLeft;
if( $TituloLeyenda=='' ) $TituloLeyenda = $TitleCol;
imageTTFText($im, $DataFontSize, 0, $x, $y, $DataColor, $FontType, $TituloLeyenda );
for( $n=0; $n<count($Leyenda); $n++ ){
$y += $DataFontSize * 1.5;
$x = $GrillMarginLeft;
if( $BarColorGradient=='' ){
imageFilledRectangle( $im, $x, $y, $x+12, $y-$DataFontSize, $BarColor[$n] );
}else{
_GraphGradient( $im, $x, $y, $x+12, $y-$DataFontSize, $BarColor[$n], $BarColorGradient, $BarLightPosition );
}
if( $BarBorderColor!='' ){
imageRectangle( $im, $x, $y, $x+12, $y-$DataFontSize, $BarBorderColor );
}
imageTTFText($im, $DataFontSize, 0, $x+17, $y, $DataColor, $FontType, $Leyenda[$n] );
}
}else if( $TIPO<>'G' ){
for( $n=0; $n<count($LabelX); $n++ ){
$x = $GrillMarginLeft + $BarMargin + ($n*($BarWidth+$BarSeparation));
$DataLengPx = _GraphTextSize( $LabelX[$n], $DataFontSize, $FontType );
$a = ceil($DataLengPx[0]);
imageTTFText($im, $DataFontSize, 90, $x+$DataFontSize+$ValueLeft, $GrillBaseLine+$GrillMarginBottom+$a, $DataColor, $FontType, $LabelX[$n] );
$LabelXHeight = ( $n==0 ) ? $a : max( $LabelXHeight, $a );
}
}else{
$y = 0;
$x = $GrillMarginLeft + $AnchoGrupo/2 - $DataFontSize/2;
for( $n=0; $n<count($LabelX); $n++ ){
$DataLengPx = _GraphTextSize( $LabelX[$n], $DataFontSize, $FontType );
$a = ceil($DataLengPx[0]);
imageTTFText($im, $DataFontSize, 90, $x+$DataFontSize, $GrillBaseLine+$GrillMarginBottom+$a, $DataColor, $FontType, $LabelX[$n] );
$LabelXHeight = ( $n==0 ) ? $a : max( $LabelXHeight, $a );
$x += $AnchoGrupo;
$y = max( $y, $GrillBaseLine+$GrillMarginBottom+$a );
}
$y += 20;
$x = $GrillMarginLeft;
if( $TituloLeyenda=='' ) $TituloLeyenda = $TitleCol;
imageTTFText($im, $DataFontSize, 0, $x, $y, $DataColor, $FontType, $TituloLeyenda );
$y += $DataFontSize * 1.5;
for( $n=0; $n<count($Leyenda); $n++ ){
if( $x+$MaxLeyenda > $Ancho && $n>0 ){
$y += $DataFontSize * 1.5;
$x = $GrillMarginLeft;
}
if( $BarColorGradient=='' ){
imageFilledRectangle( $im, $x, $y, $x+12, $y-$DataFontSize, $BarColor[$n] );
}else{
_GraphGradient( $im, $x, $y, $x+12, $y-$DataFontSize, $BarColor[$n], $BarColorGradient, $BarLightPosition );
}
if( $BarBorderColor!='' ){
imageRectangle( $im, $x, $y, $x+12, $y-$DataFontSize, $BarBorderColor );
}
imageTTFText($im, $DataFontSize, 0, $x+17, $y, $DataColor, $FontType, $Leyenda[$n] );
$x += $MaxLeyenda+15;
}
}
if( $Sufijo=='' ) $Sufijo = time();
$NomFile = '../_tmp/php/'.$_SESSION['_User'].'_'.$Sufijo.'.png';
if( file_exists($NomFile) ) @unlink($NomFile);
imagePNG($im, $NomFile);
imageDestroy($im);
$Sufijo++;
return array(_GraphImg($NomFile, $DimMap, $Sufijo-1, $Ancho, $Alto, $ConMapa), $Ancho, $Sufijo-1, substr($NomFile,2), $Alto);
}
function _GraphImg($NomFile, $DimMap, $t, $Ancho, $Alto, $ConMapa=true){
if( !$ConMapa ){
return '<img src="edes.php?R:'.substr($NomFile,2).'" width="'.$Ancho.'px" height="'.$Alto.'px" border="0" alt="">';
}
$txt = '<img src="edes.php?R:'.substr($NomFile,2).'" width="'.$Ancho.'px" height="'.$Alto.'px" border="0" alt="" USEMAP="#'.$t.'">';
$txt .= "<MAP NAME='{$t}'>";
for($n=0; $n<count($DimMap); $n+=3) for($c=0; $c<count($DimMap[$n]); $c++) $DimMap[$n][$c] = ceil($DimMap[$n][$c]);
for($n=0; $n<count($DimMap); $n+=3) $txt .= '<AREA SHAPE=POLY COORDS="'.implode(',',$DimMap[$n]).'" HREF="#" ALT="'.$DimMap[$n+1]."\n".$DimMap[$n+2].'">';
$txt .= '</MAP>';
return $txt;
}
function _hex2rgb($hex){
$hex = str_replace("#","",$hex);
if( strlen($hex)==3 )
return array( hexdec(substr($hex,0,1).substr($hex,0,1)), hexdec(substr($hex,1,1).substr($hex,1,1)), hexdec(substr($hex,2,1).substr($hex,2,1)) );
else
return array( hexdec(substr($hex,0,2)), hexdec(substr($hex,2,2)), hexdec(substr($hex,4,2)) );
}
function _GraphColor($im,$hex){
$rgb = _hex2rgb($hex);
return imageColorAllocate($im, $rgb[0], $rgb[1], $rgb[2] );
}
function _GraphTextSize($txt,$Size,$FontType){
$b = imageTTFBBox($Size,0,$FontType,$txt);
return array( $b[2], abs($b[7])+2 );
}
function _GraphGradient( $im, $x, $y, $x2, $y2, $Color, $ColorGradient, $BarLightPosition=2 ){
$Color = str_pad(dechex($Color),6,'0',STR_PAD_LEFT);
$ColorGradient = str_pad(dechex($ColorGradient),6,'0',STR_PAD_LEFT);
if( $BarLightPosition==0 ) $BarLightPosition = 2;
$ci = _hex2rgb($Color);
$cf = _hex2rgb($ColorGradient);
$Ancho = $x2-$x;
$c = abs(ceil($Ancho/$BarLightPosition));
$sc = $c;
$DimColor = array();
for( $l=0; $l<=$c; $l++ ){
$r = $ci[0]+ceil(($l*($cf[0]-$ci[0]))/$c);
$g = $ci[1]+ceil(($l*($cf[1]-$ci[1]))/$c);
$b = $ci[2]+ceil(($l*($cf[2]-$ci[2]))/$c);
$ColorA = imageColorAllocate( $im, $r, $g, $b );
$DimColor[] = $ColorA;
imageLine( $im, $x+$l, $y, $x+$l, $y2, $ColorA );
}
if( $BarLightPosition!=2 ){
$c = $Ancho-$c;
$DimColor = array();
for( $l=0; $l<=$c; $l++ ){
$r = $ci[0]+ceil(($l*($cf[0]-$ci[0]))/$c);
$g = $ci[1]+ceil(($l*($cf[1]-$ci[1]))/$c);
$b = $ci[2]+ceil(($l*($cf[2]-$ci[2]))/$c);
$ColorA = imageColorAllocate( $im, $r, $g, $b );
$DimColor[] = $ColorA;
}
}
$DimColor = array_reverse($DimColor);
for( $l=$sc+1; $l<$Ancho; $l++ ){
imageLine( $im, $x+$l, $y, $x+$l, $y2, $DimColor[$l-$sc] );
}
}
function _GraphGradient4( $im, $x1, $y1, $x2, $y2, $c=array('#FFFFFF','#FF0000','#00FF00','#0000FF') ){
$w = $x2-$x1-1;
$h = $y1-$y2+1;
if( strlen($c[0].'')>=6 ) for($i=0;$i<=3;$i++) $c[$i]=_hex2rgb($c[$i]);
$rgb = $c[0];
for( $x=0; $x<=$w; $x++ ){
for( $y=0; $y<=$h; $y++ ){
$col = imageColorAllocate($im,$rgb[0],$rgb[1],$rgb[2]);
imageSetPixel( $im, $x1+$x, $y2+$y, $col );
for( $i=0; $i<=2; $i++ ){
$rgb[$i] =	$c[0][$i]*(($w-$x)*($h-$y)/($w*$h))+
$c[1][$i]*($x     *($h-$y)/($w*$h))+
$c[2][$i]*(($w-$x)*$y     /($w*$h))+
$c[3][$i]*($x     *$y     /($w*$h));
}
}
}
}
function _DivideTexto( $TitleCol ){
$TitleCol = trim($TitleCol);
$m = ceil(strlen($TitleCol)/2)-1;
if( substr_count($TitleCol,' ')>0 ){
$b = 0;
$min = 99;
for( $i=0; $i<substr_count($TitleCol,' '); $i++ ){
if( abs($m-strpos($TitleCol,' ',$b)) < $min ){
$min = abs($m-strpos($TitleCol,' ',$b));
$p = strpos($TitleCol,' ',$b);
$b = $p+1;
}
}
$Iz = substr($TitleCol,0,$p);
$Dch = substr($TitleCol,$p+1);
}else{
list($Iz,$Dch) = explode('/',$TitleCol);
}
return array( trim($Iz), trim($Dch) );
}
?>
