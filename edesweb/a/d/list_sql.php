<?PHP
if( $_GET['_dynamic_generation']=='S' ){
$cd_gs_list_store = str_replace('cd_gs_list_store=','',$_GET["_FILTER"]);
if( !$_HndDBSystem ) qConnectSystem();
$_HndDBSystem->qQuery( "select * from gs_list_store where cd_gs_list_store={$cd_gs_list_store}" );
$Dim = $_HndDBSystem->qArray();
foreach( $Dim as $k=>$v ){
if( !is_numeric($k) ) $_POST[$k] = str_replace('&#43;','+',$v);
}
$Dim = explode('~~',$_POST['ls_definition']);
for( $n=1; $n<count($Dim); $n+=2 ){
$_POST[$Dim[$n]] = str_replace('&#43;','+',$Dim[$n+1]);
}
$_HndDBSystem->qFree();
}
$_DEBUG = 0;
$xDebug = 0;
$_GET['_LISTEMPTY'] = 1;
$xFields = '';
foreach( $_POST as $k=>$v ){
$_POST[$k] = str_replace('&#43;' ,'+' ,$_POST[$k]);
$_POST[$k] = str_replace('&#39;' ,"'" ,$_POST[$k]);
$_POST[$k] = str_replace('&#34;' ,'"' ,$_POST[$k]);
$_POST[$k] = str_replace('&quot;','"' ,$_POST[$k]);
$_POST[$k] = str_replace('&#92;' ,'\\',$_POST[$k]);
$_POST[$k] = str_replace('&amp;' ,'&' ,$_POST[$k]);
if( substr($k,0,8)=='_colsop_' && $v<>'' ) $_POST[$k] = strtoupper($v);
if( substr($k,0,7)=='_field_' && $v<>'' ){
if( $xFields<>'' ) $xFields .= ',';
$xFields .= $v;
}
if( $k[0]=='_' ) $_PDFLABELHIDDEN[$k] = 'NOTTOSHOW';
}
if( $xFields<>'' ) $_POST['_sql'] = str_replace('#',$xFields,$_POST['_sql']);
$_PDFLABELHIDDEN['nm_gs_list_store'] = 'NOTTOSHOW';
$_PDFLABELHIDDEN['ls_definition'] = 'NOTTOSHOW';
$_PDFLABELHIDDEN['dct_sql'] = 'NOTTOSHOW';
$_PDFLABELHIDDEN['cd_gs_user'] = "NotToShow";
$_PDFLABELHIDDEN['cdi_insert'] = "NotToShow";
$_PDFLABELHIDDEN['cdi_update'] = "NotToShow";
$_PDFLABELHIDDEN['cd_gs_list_store'] = "NotToShow";
if( $_POST['_ddbb']!='' ){
$tmp = explode(',',$_POST['_ddbb']);
$_OtroDiccionario = true;
$tmp[0] = str_replace(' ','',$tmp[0]);
if( substr_count($tmp[0],',') == 0 ){
if( $tmp[0][0]=='>' ) $tmp[0] = trim(substr($tmp[0],1));
$_DB = $tmp[0];
if( substr_count(str_replace('\\','/',$tmp[0]),'/')==0 ) $tmp[0] = '/_datos/config/'.$tmp[0];
if( substr_count($tmp[0],'.')==0 ) $tmp[0] .= '.ini';
if( $tmp[0][0]=='~' ){
$_SqdDefinitionFile = str_replace('~','../..',$tmp[0]);
}else{
$_SqdDefinitionFile = eScript($tmp[0]);
}
include( $_SqdDefinitionFile );
}else{
list( $_Sql, $_SqlHostName, $_SqlDiccionario, $_SqlUsuario, $_SqlPassword, $_SqlPDOConnect ) = explode( ',', $tmp[0] );
if( $_SqlHostName[0]=='$' ) $_SqlHostName = ${$_SqlHostName};
}
list( $_Sql, $_SqlPDOType ) = explode( ':', str_replace(' ','',$_Sql) );
if( $_Sql=='pdo' && $_SqlPDOConnect!='' ) $_SqlPDOConnect = eval('return ("'.$_SqlPDOConnect.'");');
}
include_once( $Dir_.$_Sql.'.inc' );
$_DimEDF[] = '[Expire]20'."\n";
$_DimEDF[] = '[Title]='.$_POST['nm_gs_list_store']."|l\n";
$_DimEDF[] = '[SubTitle]'."\n";
if( trim($_POST['_dblimit'])<>'' ) $_DimEDF[] = '[DBLimit]'.$_POST['_dblimit']."\n";
$_DimEDF[] = '[PDFVar] PDF_Grid = true'."\n";
$xDivide = false;
if( $_POST['_grid']<>'' && $_POST['_grid'][0]=='·' ){
$_POST['_grid'] = substr($_POST['_grid'],1);
$xDivide = true;
}
$xAncho = array();
$xDimAncho = array();
$xDecimales = array();
$xTipo = array();
$xFormatearF4 = false;
$usuCursor = array();
qQuery($_POST['_sql']);
while( $r=qRow() ){
$usuCursor[] = $r;
for( $n=0; $n<count($r); $n++ ){
$r[$n] = trim($r[$n]);
if( strlen($r[$n])>$xAncho[$n] ) $xAncho[$n] = strlen($r[$n]);
$xDimAncho[$n][strlen($r[$n].'')]++;
if( $r[$n]<>'' && $xTipo[$n]<>'N' ){
if( $xDebug ) eTrace($r[$n]);
if( is_numeric($r[$n]) ){
$numero = $r[$n]*1;
if( $numero==$r[$n] ){
if( substr_count($r[$n],'.')==1 ){
list(,$nDecimales) = explode('.',$r[$n]);
$xDecimales[$n] = strlen(trim($nDecimales));
$xTipo[$n] = '+,';
if( $xDebug ) eTrace('1: +,');
}else{
if( $r[$n]=='0' ){
$xTipo[$n] = '+';
if( $xDebug ) eTrace('2: +');
}else if( $r[$n][0]!='0' ){
$xTipo[$n] = '+';
if( $xDebug ) eTrace('3: +');
}else{
$xTipo[$n] = 'N';
if( $xDebug ) eTrace('4: N');
}
}
}else{
$xTipo[$n] = 'N';
if( $xDebug ) eTrace('5: N');
}
}else if( strlen($r[$n])==10 && substr_count($r[$n],'-')==2 ){
$xTipo[$n] = 'F4';
$xFormatearF4 = true;
if( $xDebug ) eTrace('6: F4');
}else{
$xTipo[$n] = 'N';
if( $xDebug ) eTrace('7: N');
}
}
}
}
$_TReg = count($usuCursor);
$xCHARTROW = '';
$xGrid = '';
$xColsOp = '';
$xFormat = '';
$xTHColSpan = array();
$xColumnas = count($usuCursor[0]);
$xColsOpSubTitle = array();
$xColsOpPrefix = array();
$xColsOpSpan = '';
$v = -1;
$_DimEDF[] = '[Fields]'."\n";
for( $n=0; $n<$xColumnas; $n++ ){
if( $xDecimales[$n]>0 ){
$xLong = ($xAncho[$n]-1-$xDecimales[$n])+floor(($xAncho[$n]-1-$xDecimales[$n]-1)/3).','.$xDecimales[$n];
}else{
$xLong = $xAncho[$n]+floor(($xAncho[$n]-1)/3);
}
$xCentrar = '';
if( count($xDimAncho[$n])==1 ){
$xCentrar = '=';
}else if( count($xDimAncho[$n])==2 ){
if( $xDimAncho[$n]['0']>0 ){
$xCentrar = '=';
}else if( $xDimAncho[$n]['10']>0 ){
}
}
$xCampo = 'campo'.$n;
if( $_POST['_field_'.$n]<>'' ) $xCampo = $_POST['_field_'.$n];
if( $_POST['_colsop_'.$n]=='G' ){
if( $_POST['_grid']<>'' ){
$ColTPC = '';
if( $_POST['_grid'][0]=='%' ){
$_POST['_grid'] = substr($_POST['_grid'],1);
$ColTPC = '%';
}
$xGrid = '[Grid] '.$xCampo.' | '.$ColTPC.' | '.$_POST['_grid']."\n";
}
}
if( $_POST['_colsop_'.$n]=='S' && $_POST['_th2_'.$n]<>'' ){
$tmp = explode('/',$_POST['_th2_'.$n]);
if( trim($tmp[0])<>'' ) $xColsOpPrefix[] = trim($tmp[0]);
if( trim($tmp[1])<>'' ) $xColsOpSubTitle[] = trim($tmp[1]);
if( $n==0 && trim($tmp[2])<>'' ) $xColsOpSpan = '|'.trim($tmp[2]);
$_POST['_th2_'.$n] = '';
}
if( $_POST['_colsop_'.$n]=='+' ) $xCHARTROW .= ','.$n;
$xColsOp .= $_POST['_colsop_'.$n].',';
$xFormat .= $_POST['_format_'.$n].',';
if( $_POST['_th2_'.$n]<>'' ){
if( $_POST['_th2_'.$n]=='=' ){
$xTHColSpan[$v][1] = 'campo'.$n;
}else{
$v++;
$xTHColSpan[$v][0] = 'campo'.$n;
$xTHColSpan[$v][2] = $_POST['_th2_'.$n];
}
}
$xTH = $_POST['_th_'.$n];
if( $xTH=='' ) $xTH = $xCampo;
if( $xTH==($xTH*1) && $xTH<>'' ) $xTH = '&nbsp;'.$xTH;
if( $xTH=='' ) $xTH = '&nbsp;'.($n+1);
if( $xDivide && substr_count($xTH,' ')>0 ){
$b = 0;
$min = 99;
for( $i=0; $i<substr_count($xTH,' '); $i++ ){
if( abs($m-strpos($xTH,' ',$b)) < $min ){
$min = abs($m-strpos($xTH,' ',$b));
$p = strpos($xTH,' ',$b);
$b = $p+1;
}
}
$xTH = substr($xTH,0,$p).'<BR>'.substr($xTH,$p+1);
}
$_DimEDF[] = $xTH.'|'.$xCampo.'|'.$xTipo[$n].'|T|'.$xLong.'||-||'.$xCentrar.'|'."\n";;
}
if( str_replace(',','',$xColsOp)<>'' ){
$xColsOpSubTitle = implode(',',$xColsOpSubTitle);
$_DimEDF[] = '[ColsOp]'.$xColsOp."|{$xColsOpSubTitle}{$xColsOpSpan}\n";
}
if( str_replace(',','',$xFormat)<>'' ) $_DimEDF[] = '[Format]'.$xFormat."\n";
if( count($xColsOpPrefix)>0 ) $_DimEDF[] = '[ColsOpPrefix]'.implode('|',$xColsOpPrefix)."\n";
if( trim($_POST['_ReportRow'])=='S' && str_replace(',','',$xCHARTROW)<>'' ) $_DimEDF[] = '[ChartRow]'.substr($xCHARTROW,1)."|100\n";
if( trim($_POST['_ReportCol'])=='S' ) eChartCol();
if( $xGrid<>'' ) $_DimEDF[] = $xGrid;
$txt = '';
for( $n=0; $n<count($xTHColSpan); $n++ ){
if( $txt<>'' ) $txt .= '|';
$txt .= $xTHColSpan[$n][0].','.$xTHColSpan[$n][1].','.$xTHColSpan[$n][2];
}
if( $txt<>'' ) $_DimEDF[] = '[THColSpan]'.$txt."\n";
if( $xFormatearF4 ){
for($f=0; $f<count($usuCursor); $f++){
for($c=0; $c<$xColumnas; $c++){
if( $xTipo[$c]=='F4' ){
if( $usuCursor[$f][$c]=='' ){
}else if( isZero($usuCursor[$f][$c]) ){
$usuCursor[$f][$c] = '';
}else{
}
}
}
}
}
if( $xDebug==2 ) ePrintR($_DimEDF, $xDimAncho, $xAncho, $xTipo, $xDecimales, $xColsOp, $xFormat);
unset($xAncho, $xTipo, $xDecimales, $nDecimales, $xLong, $xDimAncho, $xCentrar, $xDebug, $xFormatearF4, $xColumnas, $xFields, $xTHColSpan, $k, $v, $txt, $xCampo, $ColTPC, $xColsOpPrefix);
?>
