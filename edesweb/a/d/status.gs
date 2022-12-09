<?PHP
eHTML();
_FileNoCache('edes.js');
?>
<STYLE TYPE="text/css">
BODY {
SCROLLBAR-FACE-COLOR: #a2b0b7;
FONT-SIZE: 16px;
BACKGROUND: #e5ebef;
MARGIN: 7px 0px 0px;
SCROLLBAR-HIGHLIGHT-COLOR: #a2b0b7;
SCROLLBAR-SHADOW-COLOR: #a2b0b7;
SCROLLBAR-3DLIGHT-COLOR: #777d80;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-TRACK-COLOR: #cfe2f0;
FONT-FAMILY: ARIAL;
SCROLLBAR-DARKSHADOW-COLOR: #777d80;
SCROLLBAR-BASE-COLOR: #a2b0b7;
}
TABLE {
BACKGROUND: #000000;
FONT-SIZE: 16px;
}
TH { WHITE-SPACE: nowrap; }
TR { BGCOLOR: #FF3300; COLOR: #000000 }
TD { BGCOLOR: #3366FF; COLOR: #000000 }
#CONFIG TABLE {
BACKGROUND: #000000;
COLOR: #0a00af;
FONT-SIZE: 100%;
border: 0px;
}
#CONFIG TH {
BACKGROUND: #9C9ACE;
COLOR: #000000;
FONT-SIZE: 100%;
PADDING-TOP: 5px;
border: 0px;
}
#CONFIG TD {
WHITE-SPACE: nowrap;
BACKGROUND: #FFFFCC;
COLOR: #000066;
border: 0px;
}
</STYLE>
</HEAD><BODY onload='top.eBodyBackground(window)'>
<CENTER>
<?PHP
$Agente = $_SERVER['HTTP_USER_AGENT'];
echo "<table id=CONFIG>";
echo '<col><col>';
echo "<tr><th> Agente				</th><td>".wordwrap($Agente,(strlen($Agente)/2)+6,'<br>')."</td></tr>";
echo "<tr><th> Versión PHP			</th><td>".PHP_VERSION."</td></tr>";
echo "<tr><th> Sistema Operativo	</th><td>".PHP_OS."</td></tr>";
echo "<tr><th> HOST NAME			</th><td>".php_uname('n')."</td></tr>";
echo '</table><br>';
echo '<table id=CONFIG>';
echo '<tr><th>	PROPIEDAD</th><th>ESTADO</th><th>CONTROL</th></tr>';
?>
<SCRIPT type="text/javascript">
document.write( "<tr><td>Charset				</td><td>"+ document.charset			+"</td><td>windows-1252	</td></tr>" );
document.write( "<tr><td>Default Charset	</td><td>"+ document.defaultCharset	+"</td><td>windows-1252	</td></tr>" );
</SCRIPT>
<?PHP
echo '<tr><td> Tipo de Compresión					</td><td>'. $_SERVER['HTTP_ACCEPT_ENCODING']					.'</td><td>gzip, deflate</td></tr>';
echo '<tr><td> Vida del script/sesión				</td><td>'. get_cfg_var(max_execution_time)				.' sg</td><td>30 sg			</td></tr>';
echo '<tr><td> Byts para el script					</td><td>'. get_cfg_var(memory_limit)							.'</td><td>16M				</td></tr>';
echo '<tr><td> Nivel de informacion de errores	</td><td>'. get_cfg_var(error_reporting)						.'</td><td>5				</td></tr>';
echo '<tr><td> "php_errormsg"							</td><td>'. get_cfg_var(track_errors)							.'</td><td>1				</td></tr>';
echo '<tr><td> Magic quotes							</td><td>'. get_magic_quotes_gpc()								.'</td><td>1				</td></tr>';
echo '<tr><td> Magic quotes runtime					</td><td>'. get_magic_quotes_runtime()							.'</td><td>0				</td></tr>';
echo '<tr><td> "variables_order"						</td><td>'. get_cfg_var(variables_order)						.'</td><td>EGPCS			</td></tr>';
echo '<tr><td> "register_argc_argv"					</td><td>'. get_cfg_var(register_argc_argv)					.'</td><td>1				</td></tr>';
echo '<tr><td> "register_globals"					</td><td>'. get_cfg_var(register_globals)						.'</td><td>1				</td></tr>';
echo '<tr><td> "short_open_tag"						</td><td>'. get_cfg_var(short_open_tag)						.'</td><td>1				</td></tr>';
echo '<tr><td> "browscap"								</td><td>'. get_cfg_var(browscap)								.'</td><td>#				</td></tr>';
echo '<tr><td> "auto_detect_line_endings"			</td><td>'. (get_cfg_var('auto_detect_line_endings')*1)	.'</td><td>1				</td></tr>';
echo '<tr><td> PHP versión								</td><td>'. phpversion()											.'</td><td>4.3.4			</td></tr>';
echo '</table>';
echo '<br>';
$DimModulo = explode(',','apache,session,ftp,pdf,zlib,mysql,mysqli,informix,Zend Optimizer');
echo '<table id=CONFIG>';
echo '<col st-yle="width:30%"><col style="text-align:center"><col>';
echo '<tr><th>MODULOS CARGADOS</th><th>ESTADO</th><th>OTROS MODULOS</th></tr>';
for( $n=0; $n<count($DimModulo); $n++ ){
echo '<tr><td>'.$DimModulo[$n].'</td><td>'.( (extension_loaded($DimModulo[$n])) ? 'Si' : 'NO' ).'</td>';
if( $n==0 ){
echo '<td rowspan='.count($DimModulo).'>';
$txt = '';
foreach( get_loaded_extensions() as $key => $value ) if( !in_array( $value, $DimModulo ) ) $txt .= $value.', ';
echo wordwrap( $txt, strlen($txt)/count($DimModulo), '<br>' );
echo '</td>';
}
echo '</tr>';
}
echo '</table>';
echo '<br>';
echo '</CENTER>';
phpInfo();
echo '<pre>';
echo "<u>VARIABLES DE SESION:</u>\n";
print_r($_SESSION);
echo "\n\n";
$Dim = ini_get_all();
echo "<u>OPCIONES DE CONFIGURACION:</u>\n";
foreach( $Dim as $kp=>$vp ){
echo "\t".$kp.":\n";
foreach( $vp as $k=>$v ){
echo "\t\t".$k.' = '.$v."\n";
}
}
echo '</pre>';
?>
<SCRIPT type="text/javascript">
if( window.name=='IWORK' ){
top.eAutoMenu();
top.eLoading(false,window);
}else{
top.eSWResize( window );
}
</SCRIPT>
</BODY></HTML>
