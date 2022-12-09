<?PHP
function eAddMonth( $txt, $n ){
if( $txt=='' ) $txt = date('Y-m');
if( $n==0 ) return $txt;
list( $ano, $mes ) = explode( '-', $txt );
if( $n > 0 ){
$mes += $n;
if( $mes > 12 ){
$ano += floor( $mes/12 );
$mes = $mes - (floor( $mes/12 )*12);
if( $mes==0 ){
$mes = 12;
$ano--;
}
}
}else if( $n < 0 ){
$ano += ceil( $n/12 );
$n = $n-(ceil( $n/12 )*12);
$mes += $n;
if( $mes<=0 ){
$ano--;
$mes += 12;
}
}
return( $ano.'-'.(($mes<10)? '0':'').$mes );
}
function eNum2String( $xNumero, $NDeci=0, $Salida='L', $SufijoNumero='', $SufijoDecimal='' ){
$xNumero = $xNumero*1;
$Salida = strtoupper($Salida);
$_xMas = array(
array( '', '' ),
array( 'mil', 'mil' ),
array( 'un millon', 'millones' ),
array( 'mil millones', 'mil millones' )
);
$txt = '';
$DimNum = explode( '.',$xNumero);
for( $i=0; $i<count($DimNum); $i++ ){
$Numero = $DimNum[$i];
if( $i>0 && $DimNum[$i]>0 ){
if( strlen( trim($Numero).'' ) > $NDeci ) $Numero = substr( $Numero, 0, $NDeci );
if( $Numero!='' ){
if( strlen($Numero) < $NDeci ) $Numero .= str_repeat( '0', $NDeci-strlen($Numero) );
}
if( $Numero > 0 ) $txt .= 'con ';
}
$LenNumero = strlen($Numero);
$Numero = str_pad( (string)$Numero, 3*ceil($LenNumero/3), '0', STR_PAD_LEFT );
$DimPartes = array('','');
$p = ceil($LenNumero/3)-1;
for( $n=0; $n<strlen($Numero); $n+=3 ){
$Trio = substr( $Numero, $n, 3 );
if( $Trio == 1 && ( $p==3 || $p==2 || $p==1 ) ){
}else if( $Trio == 0 ){
}else{
$txt .= _eNum2String( $Trio );
}
if( $Trio > 1 ){
$txt .= ' '.$_xMas[$p][1];
}else{
if( $Trio != 0 ) $txt .= ' '.$_xMas[$p][0];
}
$p--;
$txt .= ' ';
}
if( $i==0 ){
if( $SufijoNumero!='' ){
if( substr(trim($txt),-3)=='uno' ){
$txt  = substr(trim($txt),0,-3). 'un '._eNum2StringSufijo( $SufijoNumero , false ).' ';
}else if( substr(trim($txt),-6)=='millon' || substr(trim($txt),-8)=='millones' ){
$txt .= ' de '._eNum2StringSufijo( $SufijoNumero, true ).' ';
}else{
$txt .= _eNum2StringSufijo( $SufijoNumero , ( trim($txt)!='uno' ) ).' ';
}
}
}else{
if( $SufijoDecimal!='' && $SufijoNumero!='' ){
if( substr(trim($txt),-7)=='con uno' ){
$txt  = substr(trim($txt),0,-7).' con un '._eNum2StringSufijo( $SufijoDecimal , false ).' ';
}else{
$txt .= _eNum2StringSufijo( $SufijoDecimal , ( trim($txt)!='uno' ) ).' ';
}
}
}
$DimPartes[$i] = $txt;
}
$txt = $DimPartes[0].' '.$DimPartes[1];
if( $SufijoNumero=='' && $SufijoDecimal!='' ){
$SufijoNumero = $SufijoDecimal;
if( substr(trim($txt),-3)=='uno' ){
$txt  = substr(trim($txt),0,-3). 'un '._eNum2StringSufijo( $SufijoNumero , false ).' ';
}else if( substr(trim($txt),-6)=='millon' || substr(trim($txt),-8)=='millones' ){
$txt .= ' de '._eNum2StringSufijo( $SufijoNumero, true ).' ';
}else{
$txt .= _eNum2StringSufijo( $SufijoNumero , ( trim($txt)!='uno' ) ).' ';
}
}
$txt = trim(str_replace('  ',' ',str_replace('  ',' ',$txt)));
if( substr( $txt,0,4 )=='con ' ) $txt = 'cero '.$txt;
if( $Salida=='U' ) return strtoupper(str_replace('é','E',str_replace('ó','O',$txt)));
if( $Salida=='L' ) return $txt;
return ucfirst($txt);
}
function _eNum2String( $Numero ){
$txt = '';
$_xNumero  = explode( ',', ',uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez,once,doce,trece,catorce,quince,dieciséis,diecisiete,dieciocho,diecinueve,veinte,veintiuno,veintidós,veintitrés,veinticuatro,veinticinco,veintiséis,veintisiete,veintiocho,veintinueve' );
$_xDecena  = explode( ',', ',,veinte,treinta,cuarenta,cincuenta,sesenta,setenta,ochenta,noventa' );
$_xCentena = explode( ',', ',,doscientos,trescientos,cuatrocientos,quinientos,seiscientos,setecientos,ochocientos,novecientos' );
if( $Numero == 100 ){
$txt .= 'cien ';
}else if( $Numero > 100 && $Numero < 200 ){
$txt .= 'ciento ';
}else if( $Numero >= 200 ){
$txt .= $_xCentena[$Numero[0]*1].' ';
}
$Numero = substr( $Numero, 1 );
if( $Numero == 20 ){
$txt .= 'veinte';
}else if( $Numero > 20 && $Numero < 30 ){
$txt .= $_xNumero[$Numero*1];
}else if( $Numero >= 30 ){
$txt .= $_xDecena[$Numero[0]*1];
if( substr($Numero,-1) > 0 ) $txt .= ' y '.$_xNumero[substr($Numero,-1)*1];
}else if( $Numero != 0 ){
$txt .= $_xNumero[$Numero*1];
}
return $txt;
}
function _eNum2StringSufijo( $txt,$EnPlural ){
if( substr_count( $txt, '/' ) > 0 ){
$sTitulo = '';
$sc = '';
if( $EnPlural ){
for( $i=0; $i<strlen($txt); $i++ ){
$c = substr( $txt,$i, 1 );
if( !($sc != '<' && $c=='/') ) $sTitulo .= $c;
$sc = $c;
}
}else{
$Mem = true;
for( $i=0; $i<strlen($txt); $i++ ){
$c = substr( $txt,$i, 1 );
if( $sc != '<' && $c=='/' ){
$Mem = false;
}else if( substr_count(' .,:;()',$c) > 0 ){
$Mem = true;
}
if( $Mem ) $sTitulo .= $c;
$sc = $c;
}
}
return( $sTitulo );
}else return( $txt );
}
class eColor {
function Tone( $r, $t ){
if( $r[0]=='#' ) $r = substr($r,1);
if( strlen($r)==3 ) $r = substr($r,0,1).substr($r,0,1).substr($r,1,1).substr($r,1,1).substr($r,2,1).substr($r,2,1);
else if( strlen($r)<>6 ) return '#'.$r;
$g = hexdec(substr($r,2,2));
$b = hexdec(substr($r,4,2));
$r = hexdec(substr($r,0,2));
return( '#'.$this->Op($r,$t).$this->Op($g,$t).$this->Op($b,$t) );
}
public static function Op( $c, $t ){
if( $t==0 ){
}else if( $t>=100 ){
$c = 0;
}else if( $t<=-100 ){
$c = 255;
}else if( $t > 0 ){
$c -= floor(($t*$c)/100);
}else{
$c += floor(($t*-(255-$c))/100);
}
$c = dechex($c);
if( strlen($c)!=2 ) $c = '0'.$c;
return strToUpper($c);
}
}
?>
