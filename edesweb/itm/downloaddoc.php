<?PHP
function eDownloadDoc( $oNomFile ){
eInit();
?>
<script type="text/javascript">
var _File = '';
function uOpciones(	Op ){
if( Op==2 ) return;
if( Op==-1 ){
top.eRun('explorer','/select,'+_File);
}
}
var oFile='<?=$oNomFile?>',
dFile='<?='Doc·'.date('H·i·s').substr($oNomFile,strrpos($oNomFile,'.'))?>';
try{window.frameElement.WOPENER.eHideBusy();}catch(e){};
var Dir = top.eDirectorySelect('Seleccionar directorio', 'MyDocuments', true);
if( Dir!='' ){
_File = Dir+'\\'+dFile
var Dir = Dir.replace(/\\/g,'/');
top.eInfo(window, 'Descargando...');
setTimeout(function(){
top.eFileGet(oFile, Dir+'/'+dFile);
top.eInfoHide();
top.eAlert('Fichero descargado','<b>"'+Dir+'/'+dFile+'"</b>', "A,C|Aceptar,Abrir Explorer", "DI", uOpciones);
},250);
}
</script>
<?PHP
eEnd();
}
?>
