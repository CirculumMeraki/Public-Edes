<!DOCTYPE HTML>
<HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"><TITLE> INSTALACIONES </TITLE>
<LINK REL='stylesheet' HREF='<?=$_SESSION['_PathCSS']?>/lista.css' TYPE='text/css'>
<STYLE>
TD { cursor: hand; }
TH { cursor: default; }
</STYLE>
<SCRIPT type="text/javascript">
var tmp = top.document.location.href.split('?');
var _url = tmp[0];
function Instalar(){
var Obj = event.srcElement;
if( Obj.tagName != 'TD' ) return;
var Tipo = 'left=0; top=0; status=1; resizable=1; scrollbars=1; toolbar=1; location=1; menubar=1; directories=1; width='+(screen.width-10)+'; height='+(screen.availHeight-45)+';';
switch( Obj.Producto*1 ){
case 1:
Url = 'http://ardownload.adobe.com/pub/adobe/reader/win/6.x/6.0/esp/AdbeRdr60_esp.exe';
break;
case 2:
Url = 'http://ardownload.adobe.com/pub/adobe/reader/win/6.x/6.0/esp/AdbeRdr60_esp_full.exe';
break;
case 3:
Url = 'http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash';
break;
case 4:
<?PHP  include( '../_datos/config/desktop.ini' ); ?>
window.external.AddFavorite( _url, '<?= eFileGetVar("Setup.ApplicationName"); ?>' );
return;
case 5:
window.external.ShowBrowserUI("OrganizeFavorites",null);
return;
case 6:
INICIO.fireEvent('onclick');
return;
case 7:
window.external.ShowBrowserUI("PrivacySettings",null);
return;
case 8:
Url = 'http://www.microsoft.com/downloads/';
break;
default:
top.eAlert( top._xMESSAGE, 'Producto no definido.', 'A', 'W' );
return;
}
window.open( Url, 'Instal', Tipo, true );
}
top.eLoading(false,window);
</SCRIPT>
</HEAD>
<BODY onhelp='return false;' oncontextmenu='return false;'><BR><BR>
<CENTER><TABLE id=BROWSE border=0 onclick='Instalar()'cellspacing=1 cellpadding=5><COL class='Celda'>
<TR><TH>INSTALACIONES</TH></TR>
<TR><TD Producto=1>ADOBE sencillo</TD></TR>
<TR><TD Producto=2>ADOBE completo</TD></TR>
<TR><TD Producto=3>FLASH</TD></TR>
<TR><TD Producto=8>Internet Explorer</TD></TR>
<TR><TH>CONFIGURACION</TH></TR>
<TR><TD Producto=4>Añadir a favoritos</TD></TR>
<TR><TD Producto=5>Organizar favoritos</TD></TR>
<TR><TD Producto=6>Página de inicio</TD></TR>
<TR><TD Producto=7>Propiedades IE</TD></TR>
</TABLE>
</CENTER>
<a id='INICIO' onclick="this.style.behavior='url(#default#homepage)';this.setHomePage(_url);" style='display:none;'>Página de inicio</a>
</BODY>
</HTML>
