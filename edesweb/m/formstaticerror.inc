<?PHP
global $_Form;
eInit();
?>
<!DOCTYPE HTML><HTML><HEAD></HEAD><BODY><SCRIPT type="text/javascript">
var Obj = window.frameElement.WOPENER;
top.eAlert(top.S.lng(212), 'Ya hay un registro igual', 'A', 'E', Obj._CampoFoco);
if( Obj._WOPENER._FilaLastInsert!=null ){
Obj._WOPENER._FilaLastInsert.style.textDecoration = "line-through";
}
Obj._FormStaticIni();
<?PHP
for($nf=0; $nf<count($_Form); $nf++){
if( $_Form[$nf][7]!='' ) echo "Obj.ePF('{$_Form[$nf][1]}', '{$_Form[$nf][7]}');\n";
}
?>
</SCRIPT></BODY></HTML>
<?PHP
eEnd();
?>
