<?PHP
session_start(); if( !isset($_SESSION['_User']) ) exit;
if( $argv[0][0]!='/' ) $argv[0] = '/'.$argv[0];
eHTML('$a/u/fichero.gs');
?>
<style>
#cssCabecera {
COLOR: #c2d1d9;
BACKGROUND: #000099;
margin:0px;
}
#cssCuerpo {
COLOR: #000099;
BACKGROUND: #FFFFFF;
padding: 2px 3px 2px 3px;
}
IMG {
cursor:pointer;
}
</style>
<SCRIPT type="text/javascript">
function Regresar(){
parent.DGI('Directorio').style.display = 'block';
window.frameElement.style.display = 'none';
}
</SCRIPT>
<?PHP
echo '</HEAD><BODY topmargin=0px bottommargin=0px leftmargin=0px rightmargin=0px>';
echo '<TABLE border=0px cellspacing=1px cellpadding=0px width=100% height=100%>';
echo "<TR style='position:relative; top:0px'><TH id=cssCabecera align=left>&nbsp;<img src='edes.php?R:".'$'."a/g/tree.gif' onclick='Regresar()'> {$argv[0]}</TH></TR>";
echo '<TR><TD id=cssCuerpo width=100% height=100%>';
echo '<div style="width:100%;height:100%;overflow:auto; float:left;">';
show_source( eScript($argv[0]) );
echo '</div></TD></TR></TABLE>';
echo "</BODY></HTML>";
exit;
