<?PHP
eTron();
$txt = $_POST["DATOS"];
$dim = json_decode($txt, true);
switch(json_last_error()) {
case JSON_ERROR_NONE:
eTron( ' - Sin errores');
break;
case JSON_ERROR_DEPTH:
eTron(' - Excedido tamaño máximo de la pila');
break;
case JSON_ERROR_STATE_MISMATCH:
eTron(' - Desbordamiento de buffer o los modos no coinciden');
break;
case JSON_ERROR_CTRL_CHAR:
eTron(' - Encontrado carácter de control no esperado');
break;
case JSON_ERROR_SYNTAX:
eTron(' - Error de sintaxis, JSON mal formado');
break;
case JSON_ERROR_UTF8:
eTron( ' - Caracteres UTF-8 malformados, posiblemente están mal codificados');
break;
default:
eTron(' - Error desconocido');
break;
}
$dim = json_decode(str_replace("&#34;", '"', $dim[0]), true);
switch(json_last_error()) {
case JSON_ERROR_NONE:
eTron( ' - Sin errores');
break;
case JSON_ERROR_DEPTH:
eTron(' - Excedido tamaño máximo de la pila');
break;
case JSON_ERROR_STATE_MISMATCH:
eTron(' - Desbordamiento de buffer o los modos no coinciden');
break;
case JSON_ERROR_CTRL_CHAR:
eTron(' - Encontrado carácter de control no esperado');
break;
case JSON_ERROR_SYNTAX:
eTron(' - Error de sintaxis, JSON mal formado');
break;
case JSON_ERROR_UTF8:
eTron( ' - Caracteres UTF-8 malformados, posiblemente están mal codificados');
break;
default:
eTron(' - Error desconocido');
break;
}
eTron("___".$dim["pregunta"]);
die("Grabado");
?>
