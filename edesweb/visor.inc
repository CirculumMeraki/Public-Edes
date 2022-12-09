<?PHP
if( !isset($_SESSION['_User']) ) exit;
if( $_gsID != getmypid() ) exit;
if( $_gsTron ) eTron('{9}'.$Dir_.'visor.inc');
if( $File!='' ){
$df = fopen( $File, 'r' );
$txt = fread( $df, filesize($File) );
fclose($df);
}
$i = strpos( strtoupper($txt), '<BODY>' );
if( $i===false ){
$i = strpos( strtoupper($txt), '<BODY' );
$i = strpos( strtoupper($txt), '>', $i )+1;
}else{
$i += 6;
}
$f = strpos( strtoupper($txt), '</BODY>');
if( $i > 0 && $f > $i ){
$txt = substr($txt,$i,$f-$i);
}
if( isset($HIHE) && $HIHE==0 ){
$i = strpos($txt,'<'.'!-- [HelpIni] --'.'>');
$f = strpos($txt,'<'.'!-- [HelpEnd] --'.'>');
$txt = substr( $txt, $i+18, $f-$i-18 );
$txt = substr(chop($txt),0,-6);
$i = strpos($txt,'>');
$txt = substr( $txt, $i+1 );
$i = strpos($txt,'<TR>');
$f = strpos($txt,'<TR>', $i+1);
$txt = substr( $txt, 0, $i ).substr( $txt, $f );
}
$txt = str_replace( ' ','##32;', $txt );
$txt = urlencode( $txt );
$__TITLE = '';
$__FONTSIZE = '14';
$__FONTFAMILY = 'ARIAL';
$__COLOR = '#000066';
$__BACKGROUND = '#FFFFCC';
$__WIDTH = 600;
$__HEIGHT = 400;
$__LEFT = 0;
$__TOP = 0;
$__PADDING ='20 10 10 10';
$__COLORTH = '#000099';
$__BACKGROUNDTH = '#cccccc';
$xCSS = "/http/{$_SESSION['_PathCSS']}/visor.css";
if( substr_count( $File, '/_datos/config/about.htm' )==1 ) $xCSS = "/http/{$_SESSION['_PathCSS']}/about.css";
if( $CSS!='' ) $xCSS = $CSS;
$xCSS = eScript($xCSS);
if( file_exists($xCSS) ){
$Estilo = file($xCSS);
for( $n=0; $n<count($Estilo); $n++ ){
$tmp = explode('/'.'*',$Estilo[$n]);
$tmp = explode(':',$tmp[0]);
$tmp[0] = strtoupper(str_replace('-','',$tmp[0]));
$tmp[0] = trim(str_replace(' ','',$tmp[0]));
$Comando = '__'.$tmp[0];
$tmp[1] = trim(str_replace(';','',$tmp[1]));
switch( $tmp[0] ){
case 'TITLE':
case 'FONTSIZE':
case 'FONTFAMILY':
case 'COLOR':
case 'BACKGROUND':
case 'COLORTH':
case 'BACKGROUNDTH':
case 'WIDTH':
case 'HEIGHT':
case 'LEFT':
case 'TOP':
${$Comando} = $tmp[1];
break;
case 'PADDING':
$tmp[1] = str_replace('  ',' ',$tmp[1]);
if( substr_count($__PADDING,' ')==3 ) ${$Comando} = $tmp[1];
break;
}
}
}
if( $TITLE!='' ) $__TITLE = $TITLE;
$__TITLE = trim($__TITLE);
$__STYLE = ''; if( $STYLE!='' ) $__STYLE = $STYLE;
$xWIDTH = false;
if( $WIDTH != '' ){
if( substr_count( $WIDTH, '%' ) ){
$WIDTH = str_replace('%','',$WIDTH);
if( $WIDTH > 90 ) $WIDTH = 90;
$xWIDTH = true;
}
$__WIDTH = $WIDTH;
}
$xHEIGHT = false;
if( $HEIGHT != '' ){
if( substr_count( $HEIGHT, '%' ) ){
$HEIGHT = str_replace('%','',$HEIGHT);
if( $HEIGHT > 90 ) $HEIGHT = 90;
$xHEIGHT = true;
}
$__HEIGHT = $HEIGHT;
}
$CentrarLEFT = false;
$xLEFT = false;
if( $LEFT != '' ){
if( substr_count( $LEFT, '%' ) ){
$LEFT = str_replace('%','',$LEFT);
$xLEFT = true;
}else if( $LEFT==-1 ) $CentrarLEFT = true;
$__LEFT = $LEFT;
}
$CentrarTOP = false;
$xTOP = false;
if( $TOP != '' ){
if( substr_count( $TOP, '%' ) ){
$TOP = str_replace('%','',$TOP);
$xTOP = true;
}else if( $TOP==-1 ) $CentrarTOP = true;
$__TOP = $TOP;
}
eHTML('$visor.inc');
?>
<LINK rel="StyleSheet" type="Text/css" href="<?=$_SESSION['_PathCSS']?>/visor.css">
</HEAD>
<BODY>
<SCRIPT type="text/javascript">
var txt = unescape('<?PHP
if( $File!='../d/' ){
echo rtrim($txt);
}else{
include( eScript( $SCRIPT ) );
}
?>').replace(/##32;/g,' ');
var aHeight = <?= $__HEIGHT; ?>*1;
var aWidth = <?= $__WIDTH; ?>*1;
var aLeft = <?= $__LEFT; ?>*1;
var aTop = <?= $__TOP; ?>*1;
var oLeft = <?= $__LEFT; ?>*1;
var oTop = <?= $__TOP; ?>*1;
<?PHP
if( $xWIDTH	 ) echo 'aWidth = (aWidth*screen.width)/100;';
if( $xHEIGHT ) echo 'aHeight = (aHeight*screen.availHeight)/100;';
if( $xLEFT	 ) echo 'aLeft = (aLeft*screen.width)/100;';
if( $xTOP	 ) echo 'aTop = (aTop*screen.availHeight)/100;';
if( $CentrarLEFT ) echo 'aLeft = (screen.width-aWidth)/2;';
if( $CentrarTOP ) echo 'aTop = (screen.availHeight-aHeight)/2;';
?>
var NewTxt = '<TABLE on-click="parent._oPopup.hide()" border=0px cellspacing=0px cellpadding=0px h-eight='+aHeight+'px style="cursor:default; font-size:<?= $__FONTSIZE; ?>px; margin:0px; padding:0px; border: 2px outset <?= $__BACKGROUNDTH; ?>; w-idth:'+aWidth+'px; h-eight:'+aHeight+'px;">';
<?PHP
if( $__TITLE!='' ) echo "NewTxt += '<TR height=1px>".
"<TH style=\"color:{$__COLORTH}; background:{$__BACKGROUNDTH};\">{$__TITLE}</TH>".
"</TR>';";
?>
NewTxt += '<TR><TD style="background:<?= $__BACKGROUNDTH; ?>\">'+
'<DIV id=VISOR style="SCROLLBAR-FACE-COLOR:#dfdfca; SCROLLBAR-HIGHLIGHT-COLOR:#dfdfca; SCROLLBAR-SHADOW-COLOR:#dfdfca; SCROLLBAR-3DLIGHT-COLOR:#afaf9e; SCROLLBAR-DARKSHADOW-COLOR:#afaf9e; SCROLLBAR-ARROW-COLOR:#838376; SCROLLBAR-TRACK-COLOR:#efefd8; SCROLLBAR-BASE-COLOR:#6c7b82; text-align:justify; background:<?= $__BACKGROUND; ?>; width:'+(aWidth-5)+';border:1px outset <?= $__BACKGROUNDTH; ?>; height:100%; overflow:auto; float:left; scroll:auto; margin:0px; padding:<?= $__PADDING; ?>px;<?= $__STYLE; ?>">'+txt+'</DIV></TD></TR></TABLE>';
var win = top.S.window('',{title:'AYUDA'});
top.S(win).windowWrite(NewTxt)
</SCRIPT>
</BODY></HTML>
<?PHP
eEnd();
exit;
?>
