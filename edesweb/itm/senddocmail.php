<?PHP
function eSendDocByMail( $File, $OriFichero, $_TReg, $_SubModo, $_TITLETOEXTRACT ){
$File = str_replace('\\','/',eScript($File));
$tmpN = explode('/',$File);
$NomFile = $tmpN[count($tmpN)-1];
$Dir = substr($File,0,strlen($File)-strlen($NomFile));
$tmpE = explode('.',$NomFile);
$Ext = $tmpE[count($tmpE)-1];
$NewFile = 'Doc·'.date('H·i·s').'.'.$Ext;
$nNewFile = str_replace( $NomFile, $NewFile, $File );
rename( eScript($File), eScript($nNewFile) );
if( substr($Dir,0,2)=='..' ) $Dir = substr($Dir,2);
$_SESSION['_PassToMail'] = $_POST['_doc_password_'];
$EMailTo = '';
if( $_POST['_doc_to_int_']>0 ) $EMailTo = '&_email_user='.$_POST['_doc_to_int_'];
if( $_POST['_email_to_ext_']<>'' ) $EMailTo = '&mail_to='.$_POST['_email_to_ext_'];
eInit();
?>
<script type="text/javascript">
try{window.frameElement.WOPENER.eHideBusy();}catch(e){};
top.eSWOpen(window,'edes.php?Fa:$a/d/email.edf&_FileToMail=<?=$NewFile?>&_PathToMail=<?=$Dir?><?=$EMailTo?>');
</script>
<?PHP
eEnd();
}
?>
