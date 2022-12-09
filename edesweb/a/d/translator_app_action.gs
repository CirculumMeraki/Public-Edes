<?php
_FileNoCache('edes.js');
$deflang = $_SESSION['_LANGUAGE_'];
if($deflang=='') $deflang='es';
if( $_Sql=='pdo' ) eInclude('pdo');
switch( $_GET['a'] ){
case 'getDatos':
unlink( __FILE__.'.log'  );
echo <<<EOD
<script type="text/javascript">
_WOPENER.eGO('mensaDatos').innerHTML = ' ';
</script>
EOD;
ob_flush();
getDatos_edes('$lng/'      ,'lng','E');
getDatos_edes( eScript('') ,'lng,edf,gdf,ldf,fdf,idf,lst','A'); // Aplicación
getDatos_edes( eScript('../_datos/config/') , 'lng' ,'A' );
getDatos_edes( eScript('/http/'),'lng','A');
getDatos_gs_op();
echo <<<EOD
<script type="text/javascript">
_WOPENER.eGO('mensaDatos').innerHTML += "<br><b>Fin de proceso</b>";
</script>
EOD;
break;
case 'montarMnto_App':
montarMnto_App($lng,$ad,$GS_TRANSCHANGE_TYPE);
break;
case 'montarMnto_Menu':
montarMnto_Menu($lng,$ad);
break;
case 'save_gs_op_lng':
save_gs_op_lng();
break;
case 'save':
save_gs_transchange();
break;
case 'savescripts':
checkChangedScripts();
break;
case 'getScripts':
getScripts();
break;
}
function getScripts(){
global $id,$cd_gs_language,$word_val,$ids,$deflang,$type;
$ids=trim($ids);
if( substr($ids,strlen($ids)-1,1)==',' )
$ids=substr($ids,0,strlen($ids)-1);
if( trim($ids)=='' ){
return;
}
$ids="'".str_replace(',',"','",$ids)."'";
$word_val		= trim($word_val);
$word_val_md5	= md5($word_val);
$cdi_changed	= date('Y-m-d H:i:s');
$now=date('Y-m-d H:i:s');
$q="select * from gs_script where cd_gs_script in(
select cd_gs_script from gs_transchange where cd_gs_transchange in({$ids}) group by 1
)";
qQuery($q,$p1);
$s=array();
while($r=qArray($p1)){
qQuery("select word_id from gs_transchange where cd_gs_script={$r['cd_gs_script']} and cd_gs_transchange in({$ids})",$p2);
$wi=array();
while($rr=qArray($p2)){
$wi[] = $rr['word_id'];
}
$s[] = $r['filepath'].' ('.implode(' , ',$wi).')';
}
$s=implode("\\n",$s);
echo <<<EOD
<script type="text/javascript">
alert("SCRIPTS:\\n{$s}\\n\\nIDS:\\n{$ids}");
</script>
EOD;
}
function save_scripts(){
global $deflang;
ob_implicit_flush(1);
$scripts_pendientes = array();
qQuery("select cd_gs_script from gs_transchange where tf_script='S' group by cd_gs_script");
while($r=qArray()){
$scripts_pendientes[] = $r['cd_gs_script'];
}
$cp = count($scripts_pendientes);
echo <<<EOD
<script type="text/javascript">_WOPENER.eGO('mensaDatos').innerHTML += "Commit translations to all scripts<br>{$cp} scripts need to be updated<br><br>Starting...<br>";</script>
EOD;
ob_flush();
$cta_actualizados=0;
$err=array();
foreach( $scripts_pendientes as $k=>$cd_gs_script ){
qQuery("select nm_gs_script,filepath,type from gs_script where cd_gs_script='{$cd_gs_script}'",$p1);
$r=qArray($p1);
$filepath = trim($r['filepath']);
$d = _getLanguageFromScript( $filepath );
$line_start = $d[0]['line'];
$line_end   = $d[ count($d)-1 ]['line'];
if( $line_start>$line_end ){
$err[] = "(SC001) Can´t update script: {$r['nm_script']}";
continue;
}
$indentar = ( $r['type']=='E' )? false : true;
$newTag = _componerLanguageTag($cd_gs_script , $d , $indentar);
if( count($newTag)==0 ){
$err[] = "(SC002) Can´t update script: {$r['nm_gs_script']}";
continue;
}
$ret = _grabaScript( $filepath , $newTag , $line_start , $line_end , $r['type'] );
if( $ret!='' ){
$err[] = "(SC003) Can´t update script: {$r['nm_gs_script']} - Message: {$ret}";
continue;
}
qQuery("update gs_transchange set tf_script='' where cd_gs_script='{$cd_gs_script}'",$p2);
$cta_actualizados++;
echo <<<EOD
<script type="text/javascript">_WOPENER.eGO('mensaDatos').innerHTML += "* script updated: {$r['nm_gs_script']}<br>";</script>
EOD;
ob_flush();
}
$s='';
if( count($err) ){
$s.="ERRORES:<br>".implode("<br>",$err);
}
$s.="<hr>{$cta_actualizados} Scripts updated<br><br>End of process";
echo <<<EOD
<script type="text/javascript">
_WOPENER.eGO('mensaDatos').innerHTML += "{$s}";
</script>
EOD;
ob_flush();
}
function _grabaScript( $filepath , $newTag , $line_start , $line_end , $type ){
$a = file($filepath);
$ca=count($a);
$f=array();
for($l=0 ; $l<$ca ; $l++ ){
if( $l==$line_start ){
foreach($newTag as $k=>$v){
$f[]=$v."\n";
}
$l=$line_end+1;
}
$f[]=$a[$l];
}
if( $type=='A' ){
eScript($filepath,$bak_filepath,$b);
}else{
$edespath = eScript('$');
$edespath = substr($edespath,0,strlen($edespath)-1).'_bak/';
$bak_filepath = str_replace( eScript('$') , $edespath , $filepath );
}
$ret=CrearDirectorios($bak_filepath);
if( $ret!='' ){
return $ret;
}
if( !copy( $filepath , $bak_filepath ) ){
return "Imposible hacer backup de: {$filepath}";
}
$ret=file_put_contents( $filepath , $f);
if( $ret===false )
return 'Error grabando grabando el contenido.';
return '';
}
function _componerLanguageTag($cd_gs_script , $oldtag , $indentar){
global $deflang;
$tag = array();
$lng=array();
qQuery("select cd_gs_language from gs_transchange where cd_gs_script='{$cd_gs_script}' group by cd_gs_language",$p2);
while($r=qArray($p2)){
$lng0[] = $r['cd_gs_language'];
}
$lng=array();
foreach( $lng0 as $k=>$v ){
if( $v==$deflang )
$lng[] = $v;
}
foreach( $lng0 as $k=>$v ){
if( $v!=$deflang )
$lng[] = $v;
}
$lng0=null;
$x=explode('|',$oldtag[0]['txt']);
$tag[] = '[Language] ' . implode(',',$lng) . ( ( trim($x[1])=='' )? '' : ' | '.trim($x[1]) );
$t =array();
qQuery("select * from gs_transchange where cd_gs_script='{$cd_gs_script}' order by word_id,cd_gs_language",$p2);
while( $r=qArray($p2) ){
$r['word_val'] = trim($r['word_val']);
$t[ $r['word_id'] ][ $r['cd_gs_language'] ] = $r;
}
$w=array();
$max_word_len = 0;
$ll=array();
foreach( $t as $word_id=>$alang ){
$wl = strlen($word_id);
if( $max_word_len < $wl )  $max_word_len = $wl;
$v=array();
foreach( $lng as $k=>$cd_gs_language ){
$valor   = urldecode( $alang[$cd_gs_language]['word_val'] );
$valor   = str_replace("\\\\","\\",$valor);
$len	 = strlen($valor);
$comment = $alang[$cd_gs_language]['comment'];
if( $ll[$cd_gs_language] < $len )
$ll[$cd_gs_language] = $len;
$v[] = array( 'cd_gs_language'=>$cd_gs_language , 'valor'=>$valor , 'comment'=>$comment );
}
$w[$word_id] = $v;
}
$carRepeat = ( $indentar )? ' ':'';
foreach( $w as $word_id=>$av ){
$s = $word_id . str_repeat( $carRepeat , $max_word_len - strlen($word_id));
$comment='';
foreach($av as $k=>$v){
$s .= $carRepeat.'|'.$carRepeat. $v['valor'] . str_repeat( $carRepeat ,  $ll[$v['cd_gs_language']]  - strlen($v['valor'])  );
$comment = $v['comment'];
}
if( $comment!='' ){
$s .= $carRepeat.'~'.$carRepeat.urldecode($comment);
}
$tag[] = ( $indentar )? "\t".$s : $s;
}
return $tag;
}
function save_gs_transchange(){
global $id,$cd_gs_language,$word_val,$ids,$deflang,$type,$comment;
$ids=trim($ids);
if( substr($ids,strlen($ids)-1,1)==',' )
$ids=substr($ids,0,strlen($ids)-1);
if( trim($ids)=='' ){
return;
}
$ids="'".str_replace(',',"','",$ids)."'";
$word_val		= urlencode(trim($word_val));
$word_val_md5	= md5($word_val);
$comment		= trim($comment);
$cdi_changed	= date('Y-m-d H:i:s');
$now=date('Y-m-d H:i:s');
$q="update gs_transchange set word_val='{$word_val}', word_val_md5='{$word_val_md5}', cdi_changed='{$cdi_changed}', tf_changed='', tf_script='S', comment='{$comment}'
where cd_gs_transchange in({$ids})";
qQuery($q);
$tf_changed = ( $cd_gs_language==$deflang )? 'S':'';
qQuery("select cd_gs_script,word_id from gs_transchange where cd_gs_transchange in({$ids})",$p2);
while($r=qArray($p2)){
qQuery("update gs_transchange set comment='{$comment}', tf_changed='{$tf_changed}', tf_script='S'
where cd_gs_language<>'{$deflang}' and cd_gs_script='{$r['cd_gs_script']}' and word_id='{$r['word_id']}'",$p3);
}
echo <<<EOD
<script type="text/javascript">
_WOPENER.unmarkChanged('{$id}');
</script>
EOD;
}
function save_gs_op_lng(){
global $id,$ids,$caption,$tip,$cd_gs_language,$deflang;
$ids=trim($ids);
if( substr($ids,strlen($ids)-1,1)==',' )
$ids=substr($ids,0,strlen($ids)-1);
if( trim($ids)=='' ){
return;
}
$caption	= trim( $caption );
$tip		= trim( $tip );
$mmd5       = md5($caption.$tip);
$q="update {$_SESSION['ShareDictionary']}gs_op_lng
set caption='{$caption}', tip='{$tip}', md5='{$mmd5}' , tf_changed=''
where cd_gs_language='{$cd_gs_language}' and id in ({$ids})";
qQuery($q);
if( $cd_gs_language==$deflang ){
$q="update {$_SESSION['ShareDictionary']}gs_op_lng
set tf_changed='S'
where cd_gs_language<>'{$cd_gs_language}' and id in ({$ids})";
qQuery($q);
}
echo <<<EOD
<script type="text/javascript">
_WOPENER.unmarkChanged_Menu('{$id}');
</script>
EOD;
}
function dier($s){
echo <<<EOD
<script type="text/javascript">
alert("{$s}");
</script>
EOD;
exit;
}
function montarMnto_Menu($lng,$ad){
global $deflang;
if( $lng=='' ) $lng=$deflang;
if( $ad=='' ) $ad='A';
$ad= ( ($ad=='A')? 'D':'A' );
$col=array();
$th=array();
$th[]="\n<tr>\n";
$col[] = <<<EOD
<col>
<col>
EOD;
$th[] = <<<EOD
<th title='RED meas default language has changed, when click on it the system removes the warning.'>?</th>
<th title='BLUE indicates one update is in progess.'>?</th>
EOD;
qQuery("select * from {$_SESSION['ShareDictionary']}gs_language where cd_gs_language='{$lng}'");
$r=qArray();
$col[] = <<<EOD
<col id='menu_collng_{$r['cd_gs_language']}'        style='width:50%;white-space:nowrap;'>
<col id='menu_collng_tocado_{$r['cd_gs_language']}' style='width:50%;white-space:nowrap;'>
EOD;
$th[] = <<<EOD
<th title='Click here to change the sort order.' colspan=2 onclick='montarMnto_Menu(eGO("selLangToEdit_Menu").value,"{$ad}")'>{$r['cd_gs_language']} - {$r['nm_gs_language']}
EOD;
$th[]="</tr>\n";
$gs_op_lng=array();
$gs_op_deflang=array();
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op_lng order by md5");
while($r=qArray()){
$r['flg'] = 0;
$gs_op_lng[ $r['cd_gs_language'] ][ $r['md5'] ][] = $r;
if( $r['cd_gs_language']==$deflang )
$gs_op_deflang[ $deflang ][ $r['id'] ] = $r;
}
$t =array();
qQuery("select md5,count(*) as cta from {$_SESSION['ShareDictionary']}gs_op_lng
where cd_gs_language='{$lng}'
group by 1",$p1);
while($r=qArray($p1)){
$md5=$r['md5'];
foreach( $gs_op_lng[ $lng ][ $md5 ] as $k=>$v ){
$t[ $md5 ] .= $v['id'].',';
}
}
$title_caption	= '';
$title_tip		= '';
$showTitle		= ( ($lng!=$deflang)? true:false );
$counter		= 1;
foreach($t as $md5=>$aids){
$r0_gs_op_lng		= $gs_op_lng[ $lng ][ $md5 ][0];
$r_gs_op_deflang	= $gs_op_deflang[ $deflang ][ $r0_gs_op_lng['id'] ];
$caption				= encod( urldecode( trim($r0_gs_op_lng['caption']) ) );
$tip					= encod( urldecode( trim($r0_gs_op_lng['tip']) ) );
if( $showTitle ){
$title_caption			= "[{$deflang}] ".encod( urldecode( trim($r_gs_op_deflang['caption']) ) );
$title_tip				= "[{$deflang}] ".encod( urldecode( trim($r_gs_op_deflang['tip']) ) );
}
$class_tscr = ( ($r0_gs_op_lng['tf_changed']=='S')? 'touched_script':'untouched_script' );
$s =<<<EOD
<tr id='oneTR'>
<td id='wmts{$counter}' class='{$class_tscr}' onclick='if(this.className=="touched_script") markChanged_Menu( eGO("wmc{$counter}") ,1)'>&nbsp;&nbsp;</td>
<td id='wmt{$counter}' class='untouched'>&nbsp;&nbsp;</td>
<td id='lng'>
<input id='wmc{$counter}' title='{$title_caption}' class='inp' onfocus='this.className="inpSel"' onblur='this.className="inp"' onchange='markChanged_Menu(this,1)' value='{$caption}' cd_gs_language='{$lng}' ids='{$aids}'>
</td>
<td>
<input id='wmt{$counter}' title='{$title_tip}' class='inp' onfocus='this.className="inpSel"' onblur='this.className="inp"' onchange='markChanged_Menu(this,-1)' value='{$tip}' cd_gs_language='{$lng}' ids='{$aids}'>
</td>
</tr>
EOD;
$counter++;
$tr_ordenado[   str_replace(' ','_',$r0_gs_op_lng['caption'] )   ][] = $s;
}
if( $ad=='A' ){
krsort( $tr_ordenado  ,SORT_STRING );
}else{
ksort( $tr_ordenado  ,SORT_STRING );
}
$tr=array();
foreach($tr_ordenado as $k=>$v){
foreach($v as $k2=>$v2){
$tr[] = $v2;
}
}
$s  = implode("\n",$col);
$s .= implode("\n",$th);
$s .= implode("\n",$tr);
$s = str_replace('"','\"',$s);
$s = str_replace("\n",'',$s);
echo <<<EOD
<script type="text/javascript">
try{
_WOPENER.eGO('tab2_table').innerHTML = "<table id='tblMnto_Menu' class='tblMnto'>{$s}</table>";
}catch(e){
alert(e.message);
}
</script>
EOD;
}
function montarMnto_App($lng,$ad,$GS_TRANSCHANGE_TYPE){
global $deflang;
if( $lng=='' ) $lng=$deflang;
if( $ad=='' ) $ad='A';
$ad= ( ($ad=='A')? 'D':'A' );
$col=array();
$th=array();
$th[]="\n<tr>\n";
$col[] = <<<EOD
<col>
<col>
<col>
EOD;
$th[] = <<<EOD
<th title='GREEN meas changes are not saved to source scripts, to update scripts press save button.'>?</th>
<th title='RED meas default language has changed, when click on it the system removes the warning.'>?</th>
<th title='BLUE indicates one update is in progess.'>?</th>
EOD;
qQuery("select * from {$_SESSION['ShareDictionary']}gs_language where cd_gs_language='{$lng}'");
$r=qArray();
$col[] = <<<EOD
<col id='menu_collng_{$r['cd_gs_language']}'        style='width:50%;white-space:nowrap;'>
<col id='menu_collng_tocado_{$r['cd_gs_language']}' style='width:50%;white-space:nowrap;'>
EOD;
$th[] = <<<EOD
<th title='Click to change the sort order.' onclick='montarMnto_App(eGO("selLangToEdit").value,"{$ad}")'>{$r['cd_gs_language']} - {$r['nm_gs_language']}</th>
<th title='Comments are unique for all languages.'>Comments</th>
EOD;
$th[]="</tr>\n";
$gs_transchange=array();
$gs_transchange_deflang=array();
qQuery("select * from gs_transchange where type='{$GS_TRANSCHANGE_TYPE}' order by word_val_md5");
while($rr=qArray()){
$rr['flg'] = 0;
$gs_transchange[ $rr['cd_gs_language'] ][ $rr['word_val_md5'] ][] = $rr;
if( $rr['cd_gs_language']==$deflang ){
$gs_transchange_deflang[ $deflang ][ $rr['cd_gs_script'] ][ $rr['word_id'] ] = $rr;
}
}
$t =array();
qQuery("select word_val_md5,count(*) as cta from gs_transchange
where cd_gs_language='{$lng}' and type='{$GS_TRANSCHANGE_TYPE}'
group by 1",$p1);
while($r=qArray($p1)){
$md5=$r['word_val_md5'];
foreach( $gs_transchange[ $lng ][ $md5 ] as $k=>$rr ){
$t[ $md5 ] .= $rr['cd_gs_transchange'].',';
}
}
$title_word_id	= '';
$showTitle		= ( ($lng!=$deflang)? true:false );
$counter		= 100000;
foreach($t as $md5=>$aids){
$r0_gs_transchange		= $gs_transchange[ $lng ][ $md5 ][0];
$r_gs_transchange_deflang	= $gs_transchange_deflang[ $deflang ][ $r0_gs_transchange['cd_gs_script'] ][ $r0_gs_transchange['word_id'] ];
if( $showTitle ){
$tmp			= str_replace("'","&#39;", urldecode( trim($r_gs_transchange_deflang['word_val']) ) );
$tmp			= str_replace("\\","&#92;", $tmp );
$tmp			= str_replace("~","&#126;", $tmp );
$title_word_id	= "[$deflang] {$tmp}";
}
$class_tscr = ( ($r0_gs_transchange['tf_changed']=='S')? 'touched_script':'untouched_script' );
$word_val = encod( urldecode( trim($r0_gs_transchange['word_val']) ) );
$comment  = encod( urldecode( trim($r0_gs_transchange['comment']) ) );
$class_wmtx = ( $r0_gs_transchange['tf_script']=='S' )? 'touched_wmtx':'untouched_wmtx';
$s =<<<EOD
<tr id='oneTR'>
<td id='wmtx{$counter}' class='{$class_wmtx}' onclick='getScripts("wmc{$counter}")'>&nbsp;&nbsp;</td>
<td id='wmts{$counter}' class='{$class_tscr}' onclick='if(this.className=="touched_script") markChanged( eGO("wmc{$counter}") ,1)'>&nbsp;&nbsp;</td>
<td id='wmt{$counter}' class='untouched'>&nbsp;&nbsp;</td>
<td id='lng'>
<input id='wmc{$counter}' title='{$title_word_id}' class='inp' onfocus='this.className="inpSel"' onblur='this.className="inp"' onchange='markChanged(this,1)' value='{$word_val}' cd_gs_language='{$lng}' ids='{$aids}'>
</td>
<td>
<input id='wmt{$counter}' class='inp' onfocus='this.className="inpSel"' onblur='this.className="inp"' onchange='markChanged(this,-1)' value='{$comment}' cd_gs_language='{$lng}'>
</td>
</tr>
EOD;
$counter++;
$tr_ordenado[   str_replace(' ','_',$r0_gs_transchange['word_val'] )   ][] = $s;
}
if( $ad=='A' ){
krsort( $tr_ordenado ,SORT_STRING   );
}else{
ksort( $tr_ordenado  ,SORT_STRING   );
}
$tr=array();
foreach($tr_ordenado as $k=>$v){
foreach($v as $k2=>$v2){
$tr[] = $v2;
}
}
$s  = implode("\n",$col);
$s .= implode("\n",$th);
$s .= implode("\n",$tr);
$s = str_replace('"','\"',$s);
$s = str_replace("\n",'',$s);
echo <<<EOD
<script type="text/javascript">
try{
_WOPENER.eGO('tab1_table').innerHTML = "<table id='tblMnto' class='tblMnto'>{$s}</table>";
}catch(e){
alert(e.message);
}
</script>
EOD;
}
function OLD___montarMnto_App($lng,$ad,$GS_TRANSCHANGE_TYPE){
global $deflang;
if( $lng=='' ) $lng=$deflang;
if( $ad=='' ) $ad='A';
$ad= ( ($ad=='A')? 'D':'A' );
$col=array();
$th=array();
$th[]="\n<tr>\n";
$col[] = <<<EOD
<col>
<col>
<col>
EOD;
$th[] = <<<EOD
<th title='GREEN meas changes are not saved to source scripts, to update scripts press save button.'>?</th>
<th title='RED meas default language has changed, when click on it the system removes the warning.'>?</th>
<th title='BLUE indicates one update is in progess.'>?</th>
EOD;
qQuery("select * from {$_SESSION['ShareDictionary']}gs_language where cd_gs_language='{$lng}'");
$r=qArray();
$col[] = <<<EOD
<col id='menu_collng_{$r['cd_gs_language']}'        style='width:50%;white-space:nowrap;'>
<col id='menu_collng_tocado_{$r['cd_gs_language']}' style='width:50%;white-space:nowrap;'>
EOD;
$th[] = <<<EOD
<th title='Click here to change the sort order.' onclick='montarMnto_App(eGO("selLangToEdit").value,"{$ad}")'>{$r['cd_gs_language']} - {$r['nm_gs_language']}</th>
<th>Comments</th>
EOD;
$th[]="</tr>\n";
$gs_transchange=array();
$gs_transchange_deflang=array();
qQuery("select * from gs_transchange where type='{$GS_TRANSCHANGE_TYPE}' order by word_val_md5");
while($r=qArray()){
$r['flg'] = 0;
$gs_transchange[ $r['cd_gs_language'] ][ $r['word_val_md5'] ][] = $r;
if( $r['cd_gs_language']==$deflang )
$gs_transchange_deflang[ $deflang ][ $r['word_id'] ] = $r;
}
$t =array();
qQuery("select word_val_md5,count(*) as cta from gs_transchange
where cd_gs_language='{$lng}' and type='{$GS_TRANSCHANGE_TYPE}'
group by 1",$p1);
while($r=qArray($p1)){
$md5=$r['word_val_md5'];
foreach( $gs_transchange[ $lng ][ $md5 ] as $k=>$v ){
$t[ $md5 ] .= $v['word_id'].',';
}
}
$title_word_id	= '';
$showTitle		= ( ($lng!=$deflang)? true:false );
$counter		= 100000;
foreach($t as $md5=>$aids){
$r0_gs_transchange			= $gs_transchange[ $lng ][ $md5 ][0];
$r_gs_transchange_deflang	= $gs_transchange_deflang[ $deflang ][ $r0_gs_transchange['word_id'] ];
if( $showTitle ){
$tmp			= str_replace("'","&#39;", urldecode( trim($r_gs_transchange_deflang['word_val']) ) );
$tmp			= str_replace("\\","&#92;", $tmp );
$tmp			= str_replace("~","&#126;", $tmp );
$title_word_id	= "[$deflang] {$tmp}";
$tmp			= str_replace("'","&#39;", urldecode( trim($r_gs_transchange_deflang['comment']) ) );
$tmp			= str_replace("\\","&#92;", $tmp );
$tmp			= str_replace("~","&#126;", $tmp );
$title_comment	= "[$deflang] {$tmp}";
}
$class_tscr = ( ($r0_gs_transchange['tf_changed']=='S')? 'touched_script':'untouched_script' );
$word_val = encod( urldecode( trim($r0_gs_transchange['word_val']) ) );
$comment  = encod( urldecode( trim($r0_gs_transchange['comment']) ) );
$class_wmtx = ( $r0_gs_transchange['tf_script']=='S' )? 'touched_wmtx':'untouched_wmtx';
$s =<<<EOD
<tr id='oneTR'>
<td id='wmtx{$counter}' class='{$class_wmtx}' onclick='getScripts("wmc{$counter}")'>&nbsp;&nbsp;</td>
<td id='wmts{$counter}' class='{$class_tscr}' onclick='if(this.className=="touched_script") markChanged( eGO("wmc{$counter}") ,1)'>&nbsp;&nbsp;</td>
<td id='wmt{$counter}' class='untouched'>&nbsp;&nbsp;</td>
<td id='lng'>
<input id='wmc{$counter}' title='{$title_word_id}' class='inp' onfocus='this.className="inpSel"' onblur='this.className="inp"' onchange='markChanged(this,1)' value='{$word_val}' cd_gs_language='{$lng}' ids='{$aids}'>
</td>
<td>
<input id='wmt{$counter}' title='{$title_comment}' class='inp' onfocus='this.className="inpSel"' onblur='this.className="inp"' onchange='markChanged(this,-1)' value='{$comment}' cd_gs_language='{$lng}'>
</td>
</tr>
EOD;
$counter++;
$tr_ordenado[   str_replace(' ','_',$r0_gs_transchange['word_val'] )   ][] = $s;
}
if( $ad=='A' ){
krsort( $tr_ordenado  ,SORT_STRING   );
}else{
ksort( $tr_ordenado  ,SORT_STRING   );
}
$tr=array();
foreach($tr_ordenado as $k=>$v){
foreach($v as $k2=>$v2){
$tr[] = $v2;
}
}
$s  = implode("\n",$col);
$s .= implode("\n",$th);
$s .= implode("\n",$tr);
$s = str_replace('"','\"',$s);
$s = str_replace("\n",'',$s);
echo <<<EOD
<script type="text/javascript">
try{
_WOPENER.eGO('tab1_table').innerHTML = "<table id='tblMnto' class='tblMnto'>{$s}</table>";
}catch(e){
alert(e.message);
}
</script>
EOD;
}
function getDatos_gs_op(){
global $deflang;
$natratar=qCount("{$_SESSION['ShareDictionary']}gs_op", "");
echo <<<EOD
<script type="text/javascript">
_WOPENER.eGO('mensaDatos').innerHTML += "<br>Se van a procesar {$natratar} opciones de menú.";
</script>
EOD;
ob_flush();
qQuery("select * from {$_SESSION['ShareDictionary']}gs_language where tf_translation='S'");
while($r=qArray()){
$rlng[$r['cd_gs_language']] = $r;
}
$cta=0;
qQuery("select * from {$_SESSION['ShareDictionary']}gs_op order by seq,seq_parent", $p1);
while($r=qArray($p1)){
if( trim($r['caption'])=='' ) continue;
$r['caption'] = urlencode( trim( $r['caption'] ) );
$r['tip']     = urlencode( trim( $r['tip'] ) );
$mmd5         = md5($r['caption'].$r['tip']);
$tf_changed   = (( $r['md5']==$mmd5 )? '' : 'S');
foreach($rlng as $k=>$lenguas){
$cd_gs_language = $lenguas['cd_gs_language'];
$nr=qCount("{$_SESSION['ShareDictionary']}gs_op_lng", "id='{$r['cd_gs_op']}' and cd_gs_language='{$cd_gs_language}'");
if( $nr==0 ){
$q="insert into {$_SESSION['ShareDictionary']}gs_op_lng (id,cd_gs_language,caption,tip,md5) values(
'{$r['cd_gs_op']}',
'{$cd_gs_language}',
'{$r['caption']}',
'{$r['tip']}',
'{$mmd5}'
)";
qQuery($q,$p3);
}else{
if( $cd_gs_language==$deflang ){
qQuery("select md5 from {$_SESSION['ShareDictionary']}gs_op_lng where id='{$r['cd_gs_op']}' and cd_gs_language='{$cd_gs_language}'",$p2);
$rr=qArray($p2);
if( $rr['md5']!=$mmd5 ){
$q="update {$_SESSION['ShareDictionary']}gs_op_lng
set caption='{$r['caption']}', tip='{$r['tip']}', md5='{$mmd5}' , tf_changed='{$tf_changed}'
where id='{$r['cd_gs_op']}' and cd_gs_language='{$cd_gs_language}'";
qQuery($q,$p3);
$q="update {$_SESSION['ShareDictionary']}gs_op_lng set tf_changed='{$tf_changed}'	where id='{$r['cd_gs_op']}'";
qQuery($q,$p3);
}
}
}
}
$cta++;
$w= (($cta+1)*100)/$natratar;
echo <<<EOD
<script type="text/javascript">
_WOPENER.eGO('porcen').style.width = '{$w}%';
_WOPENER.eGO('porcenmsg').textContent = "Opciones de menú procesadas: {$cta} de {$natratar}";
</script>
EOD;
ob_flush();
}
echo <<<EOD
<script type="text/javascript">
_WOPENER.eGO('mensaDatos').innerHTML += "<br>Fin de proceso de los menús.";
</script>
EOD;
ob_flush();
}
function getDatos_edes($carpeta,$extensiones_a_buscar,$type){
global $deflang;
$gs_language=array();
qQuery("select * from {$_SESSION['ShareDictionary']}gs_language order by cd_gs_language");
while($r=qArray()){
$gs_language[$r['cd_gs_language']] = $r;
}
$extensiones = explode(',',$extensiones_a_buscar);
clearstatcache(true);
ob_implicit_flush(1);
$a=array();
$atratar=array();
getDir( eScript($carpeta) , $a);
foreach( $a as $k=>$dir){
$pinfo = pathinfo($dir);
if( in_array($pinfo['extension'],$extensiones) )
$atratar[] = $dir;
}
$a=null;
$natratar = count($atratar);
echo <<<EOD
<script type="text/javascript">
_WOPENER.eGO('mensaDatos').innerHTML += "<br>Se van a procesar {$natratar} archivos en: {$carpeta}";
</script>
EOD;
ob_flush();
llog("Se van a procesar {$natratar} archivos en: {$carpeta}");
foreach( $atratar as $k=>$archivo ){
$w= (($k+1)*100)/count($atratar);
if( $w%4==0 || true){
echo <<<EOD
<script type="text/javascript">
_WOPENER.eGO('porcen').style.width = '{$w}%';
_WOPENER.eGO('porcenmsg').textContent = '{$archivo}';
_WOPENER.eGO('mensaDatos').innerHTML += "<br>{$archivo}";
</script>
EOD;
ob_flush();
}
$filepath = realpath($archivo);
if( qCount('gs_script',"filepath='{$filepath}'")==0 ){
$nm_script	= basename($archivo);
$pinfo		= pathinfo($archivo);
$extension	= $pinfo['extension'];
qQuery("insert into gs_script(nm_gs_script,extension,filepath,type)
values('{$nm_script}','{$extension}','{$filepath}','{$type}')");
$cd_gs_script = qId();
}else{
qQuery("select * from gs_script where filepath='{$filepath}'");
$rs = qArray();
$cd_gs_script	= $rs['cd_gs_script'];
$nm_script		= $rs['nm_gs_script'];
$extension		= $rs['extension'];
}
$tag = _getLanguageFromScript( realpath($filepath) );
if( count($tag)==0 ) continue;
$a = $tag[0];
$err = array();
foreach( $a['langs'] as $indexLng=>$cd_gs_language ){
if( qCount("{$_SESSION['ShareDictionary']}gs_language", "cd_gs_language='{$cd_gs_language}'")==0 ){
$err[] = "No existe el lenguaje '{$cd_gs_language}' descrito en la línea {$a['line']} en el archivo: ".str_replace(chr(92),'/',$filepath);
llog( "No existe el lenguaje '{$cd_gs_language}' descrito en la línea {$a['line']} en el archivo: ".str_replace(chr(92),'/',$filepath) );
}
}
if( count($err) ){
$err = implode('<br>',$err);
echo <<<EOD
<script type="text/javascript">
_WOPENER.eGO('mensaDatos').innerHTML += "<br>{$err}";
</script>
EOD;
ob_flush();
}
foreach( $a['langs'] as $indexLng=>$cd_gs_language ){
for( $x=1 ; $x<count($tag) ; $x++ ){
$word_id		= $tag[$x]['word_id'];
$comment		= urlencode($tag[$x]['comment']);
if( strpos($word_id,"'")!==false ){
echo <<<EOD
<script type="text/javascript">
_WOPENER.eGO('mensaDatos').innerHTML += "<br>No se admiten comillas simple en la clave: {$word_id}";
</script>
EOD;
ob_flush();
}
$word_val		= $tag[$x]['word_vals'][$indexLng];
if( $word_val=='' && $cd_gs_language!=$deflang )
$word_val	= $tag[$x]['word_vals'][0];
$word_val		= urlencode(trim($word_val));
$word_val_md5	= md5($word_val);
$nr = qCount('gs_transchange',"cd_gs_script={$cd_gs_script} and cd_gs_language='{$cd_gs_language}' and word_id='{$word_id}' ");
if( $nr==0 ){
llog( str_replace('"',"\"","(N){$cd_gs_language} - {$word_id} - {$word_val}" ) );
$now = date('Y-m-d H:i:s');
$q = "insert into gs_transchange (cd_gs_script,cd_gs_language,word_id,word_val,word_val_md5,cdi_add,comment,type,word_val_old,word_val_md5_old)
values({$cd_gs_script},'{$cd_gs_language}','{$word_id}','{$word_val}','{$word_val_md5}','{$now}','{$comment}','{$type}','{$word_val}','{$word_val_md5}')";
llog($q);
qQuery($q);
}else{
llog( str_replace('"',"\"","(E){$cd_gs_language} - {$word_id} - {$word_val}" ) );
qQuery("select * from gs_transchange where cd_gs_script={$cd_gs_script} and cd_gs_language='{$cd_gs_language}' and word_id='{$word_id}' ");
$rt = qArray();
if( $word_val_md5 != $rt['word_val_md5'] ){
$q="update gs_transchange set tf_changed='S', word_val='{$word_val}', word_val_md5='{$word_val_md5}', word_val_old='{$word_val}', word_val_md5_old='{$word_val_md5}', comment='{$comment}'  where cd_gs_script={$cd_gs_script} and cd_gs_language='{$cd_gs_language}' and word_id='{$word_id}'";
llog($q);
qQuery($q);
$q="update gs_transchange set tf_changed='S' where cd_gs_script={$cd_gs_script} and word_id='{$word_id}'";
qQuery($q);
}
}
}
}
}
echo <<<EOD
<script type="text/javascript">
_WOPENER.eGO('mensaDatos').innerHTML += "<br>Fin de proceso de archivos en: {$carpeta}";
</script>
EOD;
ob_flush();
llog( "Fin de proceso de archivos en: {$carpeta}" );
}
function trimArray($a){
foreach($a as $k=>$v)
$a[$k] = trim($v);
return $a;
}
function _getLanguageFromScript($f){
$a = file($f);
$tag=array();
foreach( $a as $k=>$lin ){
$lin = trim($lin);
if( strtoupper(substr($lin,0,10))=='[LANGUAGE]' ){
$e = substr($lin,10);
$e = explode('|',$e);
$flag = trim($e[1]);
$langs = trimArray(explode(',',$e[0]));
foreach($langs as $kk=>$vv)
$langs[$kk] = strtolower($vv);
$tag[] = array( 'line'=>$k , 'txt'=>$lin , 'langs'=>$langs , 'flag'=>$flag);
break;
}
}
if( $tag!='' ){
for($x=$k+1;$x<count($a);$x++){
$lin = trim($a[$x]);
if( $lin=='' ) continue;
if( substr($lin,0,2)=='//' ) continue;
$c = substr($lin,0,1);
if( $c=='.' ) continue;
if( strpos('[¿#',$c)===false ){
$savLin = $lin;
$ult = strrpos($lin,'|');
$posComment = strrpos($lin,'~',$ult);
if( $posComment!==false ){
$comment = trim(substr($lin,$posComment+1));
$lin = substr($lin,0,$posComment);
}else{
$comment = '';
}
$traducciones = explode('|',$lin);
$word_id = trim(array_shift($traducciones));
$traducciones = trimArray($traducciones);
$tag[] = array( 'line'=>$x , 'txt'=>$savLin , 'word_id'=>$word_id , 'comment'=>$comment , 'word_vals'=>$traducciones);
}else{
break;
}
}
}
return $tag;
}
function getDir($ruta,&$a){
if (is_dir($ruta)) {
if ($dh = opendir($ruta)) {
while (($file = readdir($dh)) !== false) {
if (is_dir($ruta . $file) && $file!="." && $file!=".."){
getDir($ruta . $file . "/" , $a );
}elseif($file!="." && $file!=".."){
$a[] = $ruta . $file;
}
}
closedir($dh);
}
}
}
function encod($s){
$s = str_replace("'" ,"&#39;", $s);
$s = str_replace("\\","&#92;", $s );
$s = str_replace("~" ,"&#126;", $s );
return $s;
}
function CrearDirectorios( $BakFile ){
$tmp = explode( '/', $BakFile );
$sDir = '';
for( $n=0; $n<count($tmp)-1; $n++ ){
$sDir .= $tmp[$n].'/';
if( !is_dir( $sDir ) ) mkdir( $sDir, 0777 );
if( !is_writeable( $sDir ) ){
chmod( $sDir, 0777 );
}
}
return '';
}
function checkChangedScripts(){
global $deflang;
ob_implicit_flush(1);
$scripts_pendientes = array();
$scripts_actualizados=0;
qQuery("select cd_gs_script from gs_transchange where tf_script='S' group by cd_gs_script");
while($r=qArray()){
$scripts_pendientes[] = $r['cd_gs_script'];
}
$cp = count($scripts_pendientes);
mif_replace("Checking if any script needed to be updated has been modified by any programmer.<br>{$cp} scripts need to be updated<br><br>Start check...<br>");
$cta_actualizados=0;
$err=array();
foreach( $scripts_pendientes as $k=>$cd_gs_script ){
$se_puede_actualizar_el_script=true;
qQuery("select nm_gs_script,filepath,type from gs_script where cd_gs_script='{$cd_gs_script}'",$p1);
$r=qArray($p1);
$filepath = trim($r['filepath']);
mif("<span style='background-color:#FFC88F;width:100%'>SCRIPT: {$filepath} (cd_gs_script:{$cd_gs_script})</span>");
if( !file_exists($filepath) ){
mif("Error: el script ya no existe. (cd_gs_script={$cd_gs_script})<br");
continue;
}
$tag = _getLanguageFromScript( $filepath );
$a = $tag[0];
$err = array();
foreach( $a['langs'] as $indexLng=>$cd_gs_language ){
if( qCount("{$_SESSION['ShareDictionary']}gs_language","cd_gs_language='{$cd_gs_language}'")==0 )
mif("No existe el lenguaje '{$cd_gs_language}' descrito en la línea {$a['line']} en el archivo: ".str_replace(chr(92),'/',$filepath) );
}
foreach( $a['langs'] as $indexLng=>$cd_gs_language ){
for( $x=1 ; $x<count($tag) ; $x++ ){
$word_id		= $tag[$x]['word_id'];
$comment		= urlencode($tag[$x]['comment']);
$word_val		= $tag[$x]['word_vals'][$indexLng];
if( $word_val=='' && $cd_gs_language!=$deflang )
$word_val	= $tag[$x]['word_vals'][0];
$word_val		= urlencode(trim($word_val));
$word_val_md5	= md5($word_val);
$nr = qCount('gs_transchange',"cd_gs_script={$cd_gs_script} and cd_gs_language='{$cd_gs_language}' and word_id='{$word_id}' ");
if( $nr==0 ){
$now = date('Y-m-d H:i:s');
$q = "insert into gs_transchange(cd_gs_script,cd_gs_language,word_id,word_val,word_val_md5,cdi_add,comment,type,word_val_old,word_val_md5_old,tf_changed)
values({$cd_gs_script},'{$cd_gs_language}','{$word_id}','{$word_val}','{$word_val_md5}','{$now}','{$comment}','{$type}','{$word_val}','{$word_val_md5}','S')";
mif("[LNG:{$cd_gs_language}] Nueva variable '{$word_id}' con valor '{$word_val}'");
qQuery($q);
}else{
qQuery("select * from gs_transchange where cd_gs_script={$cd_gs_script} and cd_gs_language='{$cd_gs_language}' and word_id='{$word_id}' ");
$rt = qArray();
if( $word_val_md5 != $rt['word_val_md5_old'] ){
$se_puede_actualizar_el_script=false;
qQuery("update gs_transchange set tf_changed='S', word_val='{$word_val}', word_val_md5='{$word_val_md5}', word_val_old='{$word_val}', word_val_md5_old='{$word_val_md5}', comment='{$comment}'  where cd_gs_script={$cd_gs_script} and cd_gs_language='{$cd_gs_language}' and word_id='{$word_id}'");
qQuery("update gs_transchange set tf_changed='S' where cd_gs_script={$cd_gs_script} and word_id='{$word_id}'");
mif("[LNG:{$cd_gs_language}] En el script se ha modificado la variable '{$word_id}',<br>- en el script contiene: '{$word_val}'<br>- antes contenía: '{$rt['word_val_old']}'<br>- y se quiere actualizar por: '{$rt['word_val']}'<br>Se omitirá la actualización del script, prevalece lo que este tiene sobre lo que el traductor ha escrito.<hr>");
}else{
if( $rt['tf_changed']=='S' || $rt['word_val_md5']!=$rt['word_val_md5_old'] ){
qQuery("update gs_transchange set tf_changed='', word_val_old='{$rt['word_val']}', word_val_md5_old='{$rt['word_val_md5']}' where cd_gs_transchange={$rt['cd_gs_transchange']}",$p5);
}
}
}
}
}
$w=array();
for( $x=1 ; $x<count($tag) ; $x++ ){
$w[]= "'{$tag[$x]['word_id']}'";
}
if( count($w) ){
$aborrar=array();
qQuery("select cd_gs_transchange,cd_gs_language,word_id from gs_transchange where cd_gs_script={$cd_gs_script} and word_id not in (". implode(',',$w) .")",$p2);
while($rt=qArray($p2)){
$aborrar[] = $rt['cd_gs_transchange'];
mif("[LNG:{$cd_gs_language}] La variable '{$rt['word_id']}' ya no existe en el script, se elimina de la tabla gs_transchange.");
}
if( count($aborrar) ){
qQuery("delete from gs_transchange where cd_gs_transchange in(".implode(',',$aborrar).")");
}
}
if( !$se_puede_actualizar_el_script ){
mif("El script no se actualiza.");
continue;
}else{
$line_start = $tag[0]['line'];
$line_end   = $tag[ count($tag)-1 ]['line'];
if( $line_start>$line_end ){
miferr("Imposible actualizar el script, error: SC001. LS:{$line_start} LE:{$line_end}");
continue;
}
$indentar = ( $r['type']=='E' )? false : true;
$newTag = _componerLanguageTag($cd_gs_script , $tag , $indentar);
if( count($newTag)==0 ){
miferr("Imposible actualizar el script, error SC002.");
continue;
}
$ret = _grabaScript( $filepath , $newTag , $line_start , $line_end , $r['type'] );
if( $ret!='' ){
miferr("Imposible actualizar el script, error: SC003 - Message: {$ret}");
continue;
}
qQuery("update gs_transchange set tf_script='' where cd_gs_script='{$cd_gs_script}'",$p2);
$cta_actualizados++;
mif("Script actualizado correctamente");
$scripts_actualizados+=1;
}
}
mif("<hr>UPDATE ENDED. SCRIPTS UPDATED: {$scripts_actualizados}");
}
function mif($s,$cual='mensaDatos'){
echo <<<EOD
<script type="text/javascript">_WOPENER.eGO('{$cual}').innerHTML += "{$s}<br>";</script>
EOD;
ob_flush();
}
function miferr($s,$cual='mensaDatos'){
echo <<<EOD
<script type="text/javascript">_WOPENER.eGO('{$cual}').innerHTML += "<span style='background-color:#FF6160'>{$s}</span><br>";</script>
EOD;
ob_flush();
}
function mif_replace($s,$cual='mensaDatos'){
echo <<<EOD
<script type="text/javascript">_WOPENER.eGO('{$cual}').innerHTML = "{$s}<br>";</script>
EOD;
ob_flush();
}
function llog($s){
error_log($s."\n" ,3 , __FILE__.'.log');
}
?>
