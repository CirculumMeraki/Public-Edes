<?PHP
if( !isset($_SESSION['_User']) ) exit;
if( $_gsID != getmypid() ) exit;
$LCComparar = explode(',',str_replace(' ','',$_LISTCOMPARE[0]));
$LCCampos = explode(',',str_replace(' ','',$_LISTCOMPARE[1]));
for( $c=0; $c<count($LCComparar); $c++ ){
for( $n=0; $n<count($_Form); $n++ ){
if( $LCComparar[$c] == $_Form[$n][1] ){
$LCComparar[$c] = $n;
break;
}
}
}
$DimOri = array();
while( $row = qRow() ) $DimOri[] = $row;
list( $oi, $of ) = explode(' and ',$MemDBRange[$LCCampos[0]]);
$oi = trim(str_replace('=','="',$oi));
$of = trim($of).'"';
list( $di, $df ) = explode(' and ',str_replace($LCCampos[1],$LCCampos[0],$MemDBRange[$LCCampos[1]]) );
$di = trim(str_replace('=','="',$di));
$df = trim($df).'"';
if( $_gs_formato_=='P' || $_gs_formato_=='X' ){
$oi = str_replace('"',"'",$oi);
$di = str_replace('"',"'",$di);
$of = str_replace('"',"'",$of);
$df = str_replace('"',"'",$df);
}
if( $of=='"' && $df=='"' ){
list(,$oi) = explode(' ',$oi);
list(,$di) = explode(' ',$di);
$_DBADDFILTER = str_replace($oi,$di,$_DBADDFILTER);
}else{
$_DBADDFILTER = str_replace($oi,$di,$_DBADDFILTER);
$_DBADDFILTER = str_replace($of,$df,$_DBADDFILTER);
}
if( $_LISTCOMPARE[3]=='' ){
$ConBancos = array('','');
}else{
$ConBancos = explode(',',str_replace(' ','',strtoupper($_LISTCOMPARE[3])));
}
if( $_LISTCOMPARE[2]=='' ){
$_LISTCOMPARE[2] = '';
for( $c=0; $c<count($_Form); $c++ ){
if( $c>0 ) $_LISTCOMPARE[2] .= ',';
$_LISTCOMPARE[2] .= $c.'';
}
for( $n=0; $n<count($_Form); $n++ ){
$Si = false;
for( $c=0; $c<count($LCComparar); $c++ ){
if( $LCComparar[$c] == $n ){
$Si = true;
break;
}
}
if( !$Si ){
if( $_LISTCOMPARE[2]!='' ) $_LISTCOMPARE[2] .= ',';
$_LISTCOMPARE[2] .= $n.'';
}
}
}
$LCIndice = explode(',',str_replace(' ','',$_LISTCOMPARE[2]));
$LCOrigen = array();
$tmp = array();
for( $n=0; $n<count($LCIndice); $n++ ) $tmp[$LCIndice[$n]] = false;
for( $n=0; $n<count($LCIndice); $n++ ){
if( $tmp[$LCIndice[$n]] == true ){
$LCOrigen[] = 'D';
}else{
$LCOrigen[] = 'O';
}
$tmp[$LCIndice[$n]] = true;
}
$tmpLCCursor = '../_tmp/php/'.str_replace('/','_',$OriFichero).".{$_User}.sql";
if( $_gs_formato_ == 'P' || $_gs_formato_ == 'X' || isset($_REG_) ){
error_reporting(_ERROR_REPORTING); include( $tmpLCCursor ); error_reporting(5);
if( $_TantoPorCiento ){
for( $n=0; $n<count($_COLSOP); $n++ ) if( $_COLSOP[$n]=='%' ) $_COLSOP[$n] = '+';
}
}else{
qSelect( $_DBTABLE, $Campos, $_DBADDFILTER, $_DBORDER.$_DBGROUPBY, $p );
$DimDes = array();
while( $row = qRow($p) ) $DimDes[] = $row;
$usuCursor = array();
$to=count($DimOri)-1; $td = count($DimDes)-1;
$po=-1; $pd=-1; $pu=0;
$eo = (count($DimOri)>0);
$ed = (count($DimDes)>0);
$otxt = '';
$dtxt = '';
while( $to>$po || $td>$pd ){
if( $eo && $to>$po ){
$po++;
$otxt = '';
for( $c=0; $c<count($LCComparar); $c++ ) $otxt .= $DimOri[$po][$LCComparar[$c]].'|';
$od = $po.': '; for( $c=0; $c<count($LCIndice); $c++ ) $od .= $DimOri[$po][$c].'|';
}
if( $ed && $td>$pd ){
$pd++;
$dtxt = '';
for( $c=0; $c<count($LCComparar); $c++ ) $dtxt .= $DimDes[$pd][$LCComparar[$c]].'|';
$dd = $pd.': '; for( $c=0; $c<count($LCIndice); $c++ ) $dd .= $DimDes[$pd][$c].'|';
}
if( $otxt==$dtxt ){
for( $c=0; $c<count($LCIndice); $c++ ){
if( $LCOrigen[$c] == 'D' ){
$usuCursor[$pu][$c] = $DimDes[$pd][ $LCIndice[$c] ];
}else{
$usuCursor[$pu][$c] = $DimOri[$po][ $LCIndice[$c] ];
}
}
$eo = true;
$ed = true;
$otxt = '';
$dtxt = '';
}else if( $dtxt=='' ){
for( $c=0; $c<count($LCIndice); $c++ ){
if( $LCOrigen[$c] == 'D' ){
$usuCursor[$pu][$c] = '';
}else{
$usuCursor[$pu][$c] = $DimOri[$po][ $LCIndice[$c] ];
}
}
for( $c=0; $c<count($LCComparar); $c++ ) $usuCursor[$pu][$LCComparar[$c]] = $DimOri[$po][$LCComparar[$c]];
$eo = true ; $otxt = '';
}else if( $otxt=='' ){
for( $c=0; $c<count($LCIndice); $c++ ){
if( $LCOrigen[$c] == 'D' ){
$usuCursor[$pu][$c] = $DimDes[$pd][ $LCIndice[$c] ];
}else{
$usuCursor[$pu][$c] = '';
}
}
for( $c=0; $c<count($LCComparar); $c++ ) $usuCursor[$pu][$LCComparar[$c]] = $DimDes[$pd][$LCComparar[$c]];
$ed = true ; $dtxt = '';
}else if( $otxt < $dtxt ){
if( $ConBancos[1]=='NB' ){
$eo = true ; $otxt = '';
$ed = false; //$dtxt = '';
continue;
}
for( $c=0; $c<count($LCIndice); $c++ ){
if( $LCOrigen[$c] == 'D' ){
$usuCursor[$pu][$c] = '';
}else{
$usuCursor[$pu][$c] = $DimOri[$po][ $LCIndice[$c] ];
}
}
for( $c=0; $c<count($LCComparar); $c++ ) $usuCursor[$pu][$LCComparar[$c]] = $DimOri[$po][$LCComparar[$c]];
$eo = true ; $otxt = '';
$ed = false; //$dtxt = '';
}else if( $otxt > $dtxt ){
if( $ConBancos[0]=='NB' ){
$eo = false; //$otxt = '';
$ed = true ; $dtxt = '';
continue;
}
for( $c=0; $c<count($LCIndice); $c++ ){
if( $LCOrigen[$c] == 'D' ){
$usuCursor[$pu][$c] = $DimDes[$pd][ $LCIndice[$c] ];
}else{
$usuCursor[$pu][$c] = '';
}
}
for( $c=0; $c<count($LCComparar); $c++ ) $usuCursor[$pu][$LCComparar[$c]] = $DimDes[$pd][$LCComparar[$c]];
$eo = false; //$otxt = '';
$ed = true ; $dtxt = '';
}else if( $otxt=='' && $dtxt=='' ){
die('Error: ListCompare');
}
$pu++;
}
if( $_TantoPorCiento ){
for( $n=0; $n<count($_COLSOP); $n++ ){
if( $_COLSOP[$n]=='%' ){
$_COLSOP[$n] = '+';
$total = 0;
for( $l=0; $l<count($usuCursor); $l++ ) $total += $usuCursor[$l][$n];
for( $l=0; $l<count($usuCursor); $l++ ) $usuCursor[$l][$n] = ($usuCursor[$l][$n]*100)/$total;
}
}
}
$txt  = '<'.'?PHP'.$__Enter;
$txt .= '$'.$LCCampos[0]." = unserialize('".serialize( ${$LCCampos[0]} )."');".$__Enter;
$txt .= '$'.$LCCampos[1]." = unserialize('".serialize( ${$LCCampos[1]} )."');".$__Enter;
$txt .= '$usuCursor'." = unserialize('".serialize( $usuCursor )."');".$__Enter;
$txt .= '?'.'>';
$fd = fopen($tmpLCCursor,'w');
fwrite( $fd, $txt );
fclose( $fd );
}
$oForm = $_Form; $_Form = array();
$oALIGN = $_ALIGN; $_ALIGN = array();
$oCOLSCOLOR = $_COLSCOLOR; $_COLSCOLOR = array();
$uCOLSOP = $_COLSOP; $_COLSOP = array();
$vCOLSOP = $oCOLSOP; $oCOLSOP = array();
$oCOLSWIDTH = $_COLSWIDTH; $_COLSWIDTH = array();
$oFORMAT = $_FORMAT; $_FORMAT = array();
$oFORMATTOTALS = $_FORMATTOTALS; $_FORMATTOTALS = array();
$oNOZERO = $_NOZERO; $_NOZERO = array();
$oNOZEROFORMATTOTALS = $_NOZEROFORMATTOTALS; $_NOZEROFORMATTOTALS = array();
$oOpCol = $_OpCol; $_OpCol = array();
$oOpSubCol = $_OpSubCol; $_OpSubCol = array();
$oPDFCOL = $_PDFCOL; $_PDFCOL = array();
$oPDFCOLBORDER = $_PDFCOLBORDER; $_PDFCOLBORDER = array();
$oPDFCOLSSHADE = $_PDFCOLSSHADE; $_PDFCOLSSHADE = array();
$oPDFTH = $_PDFTH; $_PDFTH = array();
$oROWCOLOR = $_ROWCOLOR; $_ROWCOLOR = array();
$oTIPTH = $_TIPTH; $_TIPTH = array();
for( $c=0; $c<count($LCIndice); $c++ ){
$_Form[] = $oForm[ $LCIndice[$c] ];
$_ALIGN[] = $oALIGN[ $LCIndice[$c] ];
$_COLSCOLOR[] = $oCOLSCOLOR[ $LCIndice[$c] ];
if( count($uCOLSOP)>0 ) $_COLSOP[] = $uCOLSOP[ $LCIndice[$c] ];
if( count($uCOLSOP)>0 ) $_oCOLSOP[] = $vCOLSOP[ $LCIndice[$c] ];
$_COLSWIDTH[] = $oCOLSWIDTH[ $LCIndice[$c] ];
$_FORMAT[] = $oFORMAT[ $LCIndice[$c] ];
$_FORMATTOTALS[] = $oFORMATTOTALS[ $LCIndice[$c] ];
$_NOZERO[] = $oNOZERO[ $LCIndice[$c] ];
$_NOZEROFORMATTOTALS[] = $oNOZEROFORMATTOTALS[ $LCIndice[$c] ];
$_OpCol[] = $oOpCol[ $LCIndice[$c] ];
$_OpSubCol[] = $oOpSubCol[ $LCIndice[$c] ];
$_PDFCOL[] = $oPDFCOL[ $LCIndice[$c] ];
$_PDFCOLBORDER[] = $oPDFCOLBORDER[ $LCIndice[$c] ];
$_PDFCOLSSHADE[] = $oPDFCOLSSHADE[ $LCIndice[$c] ];
$_PDFTH[] = $oPDFTH[ $LCIndice[$c] ];
$_ROWCOLOR[] = $oROWCOLOR[ $LCIndice[$c] ];
$_TIPTH[] = $oTIPTH[ $LCIndice[$c] ];
}
unset($oForm,$oALIGN,$oCOLSCOLOR,$uCOLSOP,$vCOLSOP,$oCOLSWIDTH,$oFORMAT,$oFORMATTOTALS,$oNOZERO,$oNOZEROFORMATTOTALS,$oOpCol,$oOpSubCol,$oPDFCOL,$oPDFCOLBORDER,$oPDFCOLSSHADE,$oPDFTH,$oROWCOLOR,$oTIPTH);
if( count($_LISTCOMPARETH)>0 ){
for( $c=0; $c<count($_LISTCOMPARETH); $c++ ){
if( $_LISTCOMPARETH[$c]!='=' ){
$_Form[$c][0] = $_LISTCOMPARETH[$c];
$_PDFTH[$c] = $_LISTCOMPARETH[$c];
}
}
}
if( count($_PDFLISTCOMPARETH)>0 ){
for( $c=0; $c<count($_PDFLISTCOMPARETH); $c++ ){
if( $_PDFLISTCOMPARETH[$c]!='=' ) $_PDFTH[$c] = $_PDFLISTCOMPARETH[$c];
}
}
$NCampos = count($_Form);
?>
