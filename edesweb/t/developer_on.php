<?PHP
include(eScript('$t/lp.gs'));
if( CheckLP() ){
?>
<script>
top.S.window('edes.php?Fa:$a/d/development.edf', {
title:'LOGIN DEVELOPMENT',
minimize:false,
maximize:false,
print:false,
modal:true
});
</script>
<?PHP
}
?>
