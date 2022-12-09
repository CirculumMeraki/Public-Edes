<!DOCTYPE HTML><HTML><HEAD><META http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"><TITLE></TITLE>
<STYLE TYPE="text/css">
BODY {
BACKGROUND: #f2f2f2;
BACKGROUND: #f0f5ff;
FONT-FAMILY: ARIAL;
FONT-SIZE: 16px;
margin: 0;
}
CENTER {
BACKGROUND: #f2f2f2;
}
TABLE {
FONT-SIZE: 16px;
BACKGROUND: #330066;
}
TR { BGCOLOR: #FF3300; COLOR: #000000}
TD { BGCOLOR: #3366FF; COLOR: #000000 }
#CONFIG TABLE {
BACKGROUND: #000000;
COLOR: #0a00af;
FONT-SIZE: 100%;
SCROLLBAR-ARROW-COLOR: #ffffff;
SCROLLBAR-BASE-COLOR: #dd8800;
border: 0px;
}
#CONFIG TH {
BACKGROUND: #0000CC;
COLOR: #FFFFFF;
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
</HEAD><BODY onhelp='top.HelpIFRAME();return false;' oncontextmenu='return false;' onselectstart='return false' ondragstart='return false'>
<CENTER>
<?PHP
echo '<br>';
$Agente = $_SERVER['HTTP_USER_AGENT'];
echo "<table id=CONFIG cellspacing=1 cellpadding=2 border=0>";
echo "<tr><th> Agente </th><td>{$Agente}</td></tr>";
echo "<tr><th> Versión PHP </th><td>".PHP_VERSION."</td></tr>";
echo "<tr><th> Sistema Operativo </th><td>".PHP_OS."</td></tr>";
echo '</table><br>';
echo "<table id=CONFIG cellspacing=1 cellpadding=2 border=0>";
echo "<tr><th>PROPIEDAD</th><th>ESTADO</th><th>CONTROL</th></tr>";
?>
<SCRIPT type="text/javascript">
document.write( "<tr><td>Charset				</td><td>"+ document.charset			+"</td><td>windows-1252	</td></tr>" );
document.write( "<tr><td>Default Charset	</td><td>"+ document.defaultCharset	+"</td><td>windows-1252	</td></tr>" );
</SCRIPT>
<?PHP
echo '<tr><td> "magic_quotes_gpc"					</td><td>'. get_cfg_var(magic_quotes_gpc)			.'</td><td>1				</td></tr>';
echo '<tr><td> "php_errormsg"							</td><td>'. get_cfg_var(track_errors)				.'</td><td>1				</td></tr>';
echo '<tr><td> "register_argc_argv"					</td><td>'. get_cfg_var(register_argc_argv)		.'</td><td>1				</td></tr>';
echo '<tr><td> "register_globals"					</td><td>'. get_cfg_var(register_globals)			.'</td><td>1				</td></tr>';
echo '<tr><td> "short_open_tag"						</td><td>'. get_cfg_var(short_open_tag)			.'</td><td>1				</td></tr>';
echo '<tr><td> Tipo de Compresión					</td><td>'. $GLOBALS['HTTP_ACCEPT_ENCODING']		.'</td><td>gzip, deflate</td></tr>';
echo '<tr><td> Vida del script/sesión				</td><td>'. get_cfg_var(max_execution_time)	.' sg</td><td>30 sg			</td></tr>';
echo '<tr><td> Byts para el script					</td><td>'. get_cfg_var(memory_limit)				.'</td><td>16M				</td></tr>';
echo '<tr><td> "variables_order"						</td><td>'. get_cfg_var(variables_order)			.'</td><td>GPCS			</td></tr>';
echo '<tr><td> Nivel de informacion de errores	</td><td>'. get_cfg_var(error_reporting)			.'</td><td>5				</td></tr>';
echo '<tr><td> Magic quotes							</td><td>'. get_magic_quotes_gpc()					.'</td><td>1				</td></tr>';
echo '<tr><td> Magic quotes runtime					</td><td>'. get_magic_quotes_runtime()				.'</td><td>0				</td></tr>';
echo '<tr><td> PHP versión								</td><td>'. phpversion()								.'</td><td>4.3.4			</td></tr>';
echo '</table>';
echo '<br>';
$DimModulo = explode(',','apache,session,ftp,pdf,zlib,mysql,mysqli,informix,Zend Optimizer');
echo '<table id=CONFIG cellspacing=1 cellpadding=2 border=0 width=1>';
echo '<col><col align=center>';
echo '<tr><th nowrap>MODULOS CARGADOS</th><th>ESTADO</th></tr>';
for( $n=0; $n<count($DimModulo); $n++ ){
echo '<tr><td>'.$DimModulo[$n].'</td><td>'.( (extension_loaded($DimModulo[$n])) ? 'Si' : 'NO' ).'</td></tr>';
}
echo '<tr><td colspan=2>';
foreach( get_loaded_extensions() as $key => $value ){
if( !in_array( $value, $DimModulo ) ) echo $value.', ';
}
echo '</td></tr>';
echo '</table>';
echo '<br>';
phpInfo();
echo '</CENTER>';
echo '</BODY></HTML>';
exit;
