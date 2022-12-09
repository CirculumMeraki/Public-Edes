<?=eHTML();?>
<LINK REL='stylesheet' HREF='<?=$_SESSION['_PathCSS']?>/ficha.css' TYPE='text/css'>
</HEAD>
<BODY>
<SCRIPT type="text/javascript">
top.eLoading(false,window);
<?PHP
if( $Tipo == 'F' ){
include( '../_datos/config/desktop.ini' );
echo 'var tmp = top.document.location.href.split("?");';
echo "window.external.AddFavorite( tmp[0], '".eFileGetVar("Setup.ApplicationName")."' );";
}
if( $Tipo == 'I' ){
?>
var tmp = top.document.location.href.split("?");
document.write( "<a id='INICIO' onclick=" + '"' );
document.write( "this.style.behavior='url(#default#homepage)';this.setHomePage('"+tmp[0]+"');" );
document.write( '"' + "style='display:none;'>Página de inicio</a>" );
S(INICIO).eventClick();
<?PHP
}
if( $Tipo == 'O' ){
echo 'window.external.ShowBrowserUI("OrganizeFavorites", null);';
}
?>
</SCRIPT>
</BODY>
</HTML>
