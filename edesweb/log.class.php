<?php
class MiLOG {
var $log_file;
var $max_size;
var $prefix;
function MiLOG( $fi='', $pre='Y-m-d H:i:s', $max=10000000) {
$this->log_file = trim($fi);
if( trim($pre)=='' ) $pre='Y-m-d H:i:s';
$this->prefix   = $pre;
$this->max_size = $max;
if( $this->log_file!='' ){
clearstatcache();
if( file_exists($this->log_file) && filesize($this->log_file) > $this->max_size ){
rename($this->log_file , dirname( $this->log_file).'/_'.date('Ymd').'_'.basename( $this->log_file) );
}
}
}
function push($m) {
error_log( date($this->prefix).'  '.$_SERVER['REMOTE_ADDR'].' '.$m."\n" , 3 , $this->log_file );
}
function reset(){
unlink( $this->log_file );
}
}
?>
