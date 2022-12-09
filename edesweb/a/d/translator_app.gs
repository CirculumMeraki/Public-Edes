<?php
if( eSqlType('pdo') ) eInclude('pdo');
if( $type=='A' ){
$titulo = 'GS-TRANSLATOR - APPLICATION';
$mostrar_tab0 = 0;
}else{
$titulo = 'GS-TRANSLATOR - EDES ENGINE';
$mostrar_tab0 = 1;
}
$selLangToEdit=array();
$deflang = $_SESSION['_LANGUAGE_'];
if($deflang=='') $deflang='es';
qQuery("select * from {$_SESSION['ShareDictionary']}gs_language where cd_gs_language='{$deflang}'");
$r=qArray();
$selLangToEdit[] = "<option value='{$r['cd_gs_language']}'>{$r['nm_gs_language']} [default language]</option>";
qQuery("select * from {$_SESSION['ShareDictionary']}gs_language where cd_gs_language<>'{$deflang}'");
while($r=qArray()){
$selLangToEdit[] = "<option value='{$r['cd_gs_language']}'>{$r['nm_gs_language']}</option>";
}
$selLangToEdit = implode('',$selLangToEdit);
eHTML();
?>
<?=_FileNoCache('edes.js')?>
<style>
body{
margin:5px;
padding:0px;
font-family:Verdana,Arial;
}
.porcen{
width:0%;
background-color:#6CB9FF;
}
.tabs{
border:0px solid red;
width:100%;
}
.tab{
padding:3px;
margin:1px;
float:left;
border-top:1px solid;
border-left:1px solid;
border-right:1px solid;
border-bottom:1px dotted;
cursor:pointer;
background-color:none;
}
.tabSelected{
padding:3px;
margin:1px;
float:left;
border-top:1px solid;
border-left:1px solid;
border-right:1px solid;
border-bottom:1px dotted;
cursor:pointer;
background-color:#FFC482;
}
.tabMain{
width:100%;
-height:100%;
border-top:1px solid;
padding:0px;
}
.tblMnto {
border-width: 0px none gray;
border-spacing: 2px;
border-collapse: collapse;
margin:0px;
}
.tblMnto th {
border-width: 1px solid gray;
padding: 1px;
background-color: #ECF7FF;
cursor:pointer;
}
.tblMnto td {
border: 1px solid #F1F1F1;
padding: 1px;
-background-color: white;
font-family:Verdana,Arial;
font-size:9pt;
}
.tblMnto input{
font-family:Verdana;
font-size:9pt;
}
.tab_menu{
background-color:#F4F4F4;
border-bottom:1px solid #A6A6A6;
padding:5px 5px 5px 5px;
}
.inp{
width:100%;
border:1px solid #FFFFFF;
background-color:none;
cursor:pointer;
}
.inpSel{
width:100%;
border:1px solid green;
background-color:#F2FFE4;
}
.untouched{
background-color:none;
cursor:default;
}
.touched{
background-color:#0000FF;
cursor:default;
}
.untouched_script{
background-color:none;
cursor:default;
}
.touched_script{
background-color:#FF0000;
cursor:pointer;
}
.untouched_wmtx{
background-color:none;
cursor:default;
}
.touched_wmtx{
background-color:#00FF00;
cursor:default;
}
</style>
<script type="text/javascript">
var root="edes.php?E:$a/d/translator_app_action.gs&";
var deflang="<?=$deflang;?>";
var order_ln='';
var order_ln_ad='';
var order_ln_menu='';
var order_ln_ad_menu='';
var curTab=null;
var TYPE='<?=$type;?>';
function init(){
document.onkeydown = ctlKeyb;
var bod=mgetPos(document.body);
var cab=mgetPos(eGO('cabecera'));
if( <?=$mostrar_tab0;?> ){
eGO('tabs0').style.display='block';
eGO('tab0').style.display='block';
eGO('tab0').style.height = bod.h - cab.h - 40;
}
if( TYPE=='E' ){
eGO('tab2').style.display='none';
eGO('tabs2').style.display='none';
}else{
eGO('tab2').style.height = bod.h - cab.h - 40;
showTab(2);
var tab2 = mgetPos(eGO('tab2'));
var tab2_menu = mgetPos(eGO('tab2_menu'));
eGO('tab2_table').style.height = tab2.h - tab2_menu.h -25;
montarMnto_Menu();
}
eGO('tab1').style.height = bod.h - cab.h - 40;
showTab(1);
var tab1 = mgetPos(eGO('tab1'));
var tab1_menu = mgetPos(eGO('tab1_menu'));
eGO('tab1_table').style.height = tab1.h - tab1_menu.h -25;
montarMnto_App();
top.eLoading(false,window);
}
function ctlKeyb(e){
e = (e)? e : event;
if( (e.target || e.srcElement).id.indexOf('w')==0 ){
switch( e.keyCode ){
case 40:
case 13:
var o = (e.target || e.srcElement).parentNode;
var  z= o.parentNode.rowIndex;
if( curTab==1 ){
if(z<eGO('tblMnto').rows.length-1)
eGO('tblMnto').rows[ z+1 ].cells[ o.cellIndex ].children[0].focus();
}else if( curTab==2 ){
if(z<eGO('tblMnto_Menu').rows.length-1)
eGO('tblMnto_menu').rows[ z+1 ].cells[ o.cellIndex ].children[0].focus();
}
break;
case 38:
var o = (e.target || e.srcElement).parentNode;
var  z= o.parentNode.rowIndex;
if( curTab==1 ){
if(z>1)
eGO('tblMnto').rows[ z-1 ].cells[ o.cellIndex ].children[0].focus();
}else if( curTab==2 ){
if(z>1)
eGO('tblMnto_Menu').rows[ z-1 ].cells[ o.cellIndex ].children[0].focus();
}
}
}
}
function eGO(i){
return DGI(i);
}
function showTab(k){
for(var x=0 ;x<10;x++){
try{
eGO('tab'+x).style.display=( (k==x)? 'inline' : 'none' );
eGO('tabs'+x).className = ( (k==x)? 'tabSelected' : 'tab' );
if(k==x) curTab=x;
}catch(e){
break;
}
}
}
function getDatos(){
if( confirm("WARNING: All unsaved translations will be lost!!") )
top.eCallSrv(window,root+"a=getDatos");
}
function montarMnto_App(ln,ad){
order_ln = ln;
order_ln_ad = ad;
if(order_ln==undefined)    order_ln='';
if(order_ln_ad==undefined) order_ln_ad='A';
eGO('tab1_table').innerHTML = '<b>LOADING...</b>';
var  s='a=montarMnto_App';
s    +='&lng='+order_ln;
s    +='&ad='+order_ln_ad;
s    +='&GS_TRANSCHANGE_TYPE='+TYPE;
top.eCallSrv(window,root+s);
}
function montarMnto_Menu(ln,ad){
order_ln_menu = ln;
order_ln_ad_menu = ad;
if(order_ln_menu==undefined)    order_ln_menu='';
if(order_ln_ad_menu==undefined) order_ln_ad_menu='A';
eGO('tab2_table').innerHTML = '<b>LOADING...</b>';
var  s='a=montarMnto_Menu';
s    +='&lng='+order_ln_menu;
s    +='&ad='+order_ln_ad_menu;
top.eCallSrv(window,root+s);
}
function selLang(l){
var o=eGO('selLangToEdit');
eGO('tblMnto').style.display='none';
for( var x=0 ; x<o.options.length ; x++ ){
var ol = o.options[x].value;
if(  l==ol ||  deflang==ol ){
eGO('collng_'+ol).style.display= 'inline';
}else{
eGO('collng_'+ol).style.display= 'none';
}
}
eGO('tblMnto').style.display='block';
}
function refresh_tabMain(){
selLang( eGO('selLangToEdit').value );
}
function markChanged(o,f){
eGO('wmt' +o.id.substring(3)).className = 'touched';
eGO('wmtx'+o.id.substring(3)).className = 'touched_wmtx';
if( f==1 ){
var word_val		= escape(o.value);
var comment			= escape(o.parentNode.nextSibling.firstChild.value);
var ids				= o.ids;
var cd_gs_language  = o.cd_gs_language;
}else{
var word_val		= escape(o.parentNode.previousSibling.firstChild.value);
var comment			= escape(o.value);
var ids				= escape(o.parentNode.previousSibling.firstChild.ids);
var cd_gs_language= escape(o.parentNode.previousSibling.firstChild.cd_gs_language);
}
var s='';
s  = 'id=' + o.id;
s += '&cd_gs_language=' + cd_gs_language;
s += "&ids="+ids;
s += '&word_val=' + word_val;
s += '&comment='+comment;
s += '&type='+TYPE;
top.eCallSrv(window,root+"a=save&"+s);
}
function markChanged_Menu(o,f){
eGO('wmt'+o.id.substring(3)).className = 'touched';
if( f==1 ){
var caption = escape(o.value);
var tip = escape(o.parentNode.nextSibling.firstChild.value);
}else{
var caption = escape(o.parentNode.previousSibling.firstChild.value);
var tip = escape(o.value);
}
s  = 'id=' + o.id;
s += "&ids="+o.ids;
s += '&caption=' + caption;
s += '&tip=' + tip;
s += '&cd_gs_language=' + o.cd_gs_language;
top.eCallSrv(window,root+"a=save_gs_op_lng&"+s);
}
function unmarkChanged(id){
var n=id.substring(3);
eGO('wmts'+n).className = 'untouched_script';
eGO('wmt'+n).className = 'untouched';
}
function unmarkChanged_Menu(id){
var n=id.substring(3);
eGO('wmts'+n).className = 'untouched_script';
eGO('wmt'+n).className = 'untouched';
}
function saveScripts(){
if( confirm("Confirm you want to update scripts with this translations.") )
top.eCallSrv(window,root+"a=savescripts");
}
function getScripts(id){
var o=eGO(id);
var s='';
s  = 'id=' + o.id;
s += '&cd_gs_language=' + o.cd_gs_language;
s += "&ids="+o.ids;
s += '&word_val=' + escape( o.value );
s += '&type='+TYPE;
top.eCallSrv(window,root+"a=getScripts&"+s);
}
function mgetPos(o){
var oL=oT=oH=oW=0;oH=o.offsetHeight;oW=o.offsetWidth;
while (o){oL+=o.offsetLeft;oT+=o.offsetTop;o=o.offsetParent}
return {x:oL,y:oT,w:oW, h:oH}
}
function mresize(o,w,h){with(o.style){posWidth=w;posHeight=h}}
function mposition(o,x,y,w,h){mmove(o,x,y);mresize(o,w,h)}
</script>
</HEAD>
<BODY scroll='yes' onload='init()'>
<div id='cabecera'>
<?=$titulo;?>
<br><br>
</div>
<div class='tabs'>
<div id='tabs0' class='tab' style='display:none' onclick='showTab(0)'>DATA</div>
<div id='tabs1' class='tab' onclick='showTab(1)'>TRANSLATIONS</div>
<div id='tabs2' class='tab' onclick='showTab(2)'>MENU TRANSLATIONS</div>
<div style='width:100%'></div>
</div>
<div id='tab0' class='tabMain' style='display:none;overflow:auto'>
<button onclick='getDatos()'>Renew script data</button>
&nbsp;&nbsp;
<button onclick='saveScripts()' title='Will save all translations to application and engine scripts.'>Commit translations to all scripts</button>
<br>
<table width='100%' style='border:1px solid #DDDDDD'>
<tr>
<td>
<span id='porcen' class='porcen'></span>
</td>
</tr>
<tr>
<td>
<span id='porcenmsg'></span>
</td>
</tr>
</table>
<div id='mensaDatos' style='overflow:auto'> </div>
</div>
<div id='tab1' class='tabMain' style='display:none;overflow:auto'>
<div id='tab1_menu' class='tab_menu'>
Show: <select id='selLangToEdit' onchange='montarMnto_App(this.value,"A")'><?=$selLangToEdit;?></select>
&nbsp;&nbsp;&nbsp;
<button onclick='montarMnto_App(eGO("selLangToEdit").value,order_ln_ad)' title='Refresh translation list.'>Refresh</button>
&nbsp;&nbsp;
<!--			<button onclick='saveScripts()' title='Will save all translations to application scripts.'>Save</button>  -->
</div>
<div id='tab1_table' style='overflow:auto'>
<!--			<table id='tblMnto' class='tblMnto'></table>  -->
</div>
</div>
<div id='tab2' class='tabMain' style='display:none;overflow:auto'>
<div id='tab2_menu' class='tab_menu'>
Show: <select id='selLangToEdit_Menu' onchange='montarMnto_Menu(this.value,"A")'><?=$selLangToEdit;?></select>
&nbsp;&nbsp;&nbsp;
<button onclick='montarMnto_Menu(eGO("selLangToEdit_Menu").value,order_ln_ad_menu)' title='Refresh translation list.'>Refresh</button>
</div>
<div id='tab2_table' style='overflow:auto'>
<!--			<table id='tblMnto_Menu' class='tblMnto'></table>  -->
</div>
</div>
</BODY>
</HTML>
