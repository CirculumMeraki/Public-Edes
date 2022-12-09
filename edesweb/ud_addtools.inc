<?PHP
die("w1w");
if( strtoupper($tmp[2])=='ECOLORSELECT' || strtoupper($tmp[2])=='ETONESELECT' ){
global $_JSEND, $_JSINCLUDE;
if( $Opcion=='a' || $Opcion=='mR' ){
if( $tmp[3]!='' ) $tmp[3] = ';'.str_replace('"','&quot;',$tmp[3]);
$tmp[2] = strtoupper($tmp[2])=='ECOLORSELECT' ? "eColorSelect":"eToneSelect";
if( strlen($tmp[4])<2 ){
if( $tmp[4]=="" ) $tmp1 = 61442;
else if( strtoupper($tmp[4])=="C" ) $tmp1 = 184;
else if( strtoupper($tmp[4])=="B" ) $tmp1 = 185;
$_ADDCODE[$tmp[1]]['A'] .= '<I class="ICONINPUT" onclick="'.$tmp[2].'(undefined,1)'.$tmp[3].'" title="Seleccionar color">&#'.$tmp1.';</I>';
}else{
$_ADDCODE[$tmp[1]]['A'] .= '<img src="'.(($tmp[4]!='')?$tmp[4]:'g/t_color.png').'" onclick="'.$tmp[2].'(undefined,1)'.$tmp[3].'" title="Seleccionar color">';
}
$_JSEND .= "eGO('{$tmp[1]}').style.color = top.eColorContrastBW(eGF('{$tmp[1]}'));";
array_push($_ONCHANGE, array($tmp[1], '_SetColor("'.$tmp[1].'");', '', ''));
$_JSINCLUDE['$itm/'.strtolower($tmp[2]).'.js'] = 1;
}
$_JSEND .= "eGO('{$tmp[1]}').style.color = top.eColorContrastBW(eGF('{$tmp[1]}'));";
$_JSEND .= "if( eGF('{$tmp[1]}')!='' ) eGO('{$tmp[1]}').style.backgroundColor = eGF('{$tmp[1]}');";
}elseif( strtoupper($tmp[2])=='ELABELSELECT' ){
if( strtolower($tmp[1])=='button' ) $tmp[1] = 'button';
if( $tmp[3]!='' ) $tmp[3] = ';'.str_replace('"','&quot;',$tmp[3]);
$_ADDCODE[$tmp[1]]['A'] .= '<img src="'.(($tmp[4]!='')?$tmp[4]:'g/label_sel.png').'" onclick="eLabelSelect()'.$tmp[3].'" title="Posición de la primera etiqueta">';
$_PDFLABELTOOLS = true;
}elseif( strtoupper($tmp[2])=='INSERTAUX' ){
if( $tmp[3]=='' ) $tmp[3] = 'Insertar dato en tabla auxiliar';
$_ADDCODE[$tmp[1]]['A'] .= '<img id="'.$tmp[1].'_" src="g/t_op_insert_sel.png" onclick="_InsertSelect()" title="'.$tmp[3].'">';
}elseif( strtoupper($tmp[2])=='EDEFAULTS' && substr_count(',a,b,c,m,', ",{$_Mode},")>0 ){
if( $_DEFAULTALL ) break;
if( $tmp[3]=='' ) $tmp[3] = 'Establece valores por defecto';
if( $tmp[5]=="" ) $tmp[5] = "false";
if( $tmp[1]<>"" ) $_ADDTOOLSCP = ",'".str_replace(" ","",trim($tmp[1]))."'";
$_TITLEICON[] = '<i id="_eDefaults_" style="font-size:70%" class="ICONTITLE OFF" onclick="eDefaults('.$tmp[5].$_ADDTOOLSCP.')" title="'.$tmp[3].'">h</i>';
$_DEFAULTALL = true;
$_DEFAULTBYMODE = (strtoupper($tmp[5])=='TRUE' || $tmp[5]==1);
}
?>
