<?PHP
include("../_datos/config/sql.ini");
eInclude($_Sql);
$poll = $_POST["POLL"];
if( $_POST["DELETE"]!="" ){
$dim = explode(",", $_POST["DELETE"]);
for($n=0; $n<count($dim); $n++){
$question = $dim[$n];
qQuery("delete from gs_question where cd_gs_poll={$poll} and cd_gs_question={$question}");
}
}
$txt = $_POST["DATOS"];
$dim = json_decode($txt, true);
switch(json_last_error()) {
case JSON_ERROR_NONE:
break;
case JSON_ERROR_DEPTH:
eTron('1- Excedido tamaño máximo de la pila');
break;
case JSON_ERROR_STATE_MISMATCH:
eTron('1- Desbordamiento de buffer o los modos no coinciden');
break;
case JSON_ERROR_CTRL_CHAR:
eTron('1- Encontrado carácter de control no esperado');
break;
case JSON_ERROR_SYNTAX:
eTron('1- Error de sintaxis, JSON mal formado');
break;
case JSON_ERROR_UTF8:
eTron('1- Caracteres UTF-8 malformados, posiblemente están mal codificados');
break;
default:
eTron('1- Error desconocido');
break;
}
for($n=0; $n<count($dim); $n++){
$txt = $dim[$n];
$txt = str_replace(
array("&#34;", "\n"  , "\r"  , "/"   ,"\\"),
array('"'    , "<br>", "<br>", "\\/" ,"\\\\"),
$dim[$n]
);
$json = json_decode($txt, true);
switch(json_last_error()) {
case JSON_ERROR_NONE:
break;
case JSON_ERROR_DEPTH:
eTron('2- Excedido tamaño máximo de la pila');
break;
case JSON_ERROR_STATE_MISMATCH:
eTron('2- Desbordamiento de buffer o los modos no coinciden');
break;
case JSON_ERROR_CTRL_CHAR:
eTron('2- Encontrado carácter de control no esperado');
break;
case JSON_ERROR_SYNTAX:
eTron('2- Error de sintaxis, JSON mal formado');
break;
case JSON_ERROR_UTF8:
eTron('2- Caracteres UTF-8 malformados, posiblemente están mal codificados');
break;
default:
eTron('2- Error desconocido');
break;
}
$dim[$n] = utf8_decode($dim[$n]);
$json['pregunta'] = utf8_decode($json['pregunta']);
$json['pregunta'] = str_replace("'", '&#39;', $json['pregunta']);
$json['orden'] = $n+1;
$json['json'] = str_replace("'", '&#39;', $dim[$n]);
$preguntaLeng = strlen($json['json']);
if( qCount("gs_question", "cd_gs_poll={$poll} and cd_gs_question={$json['cd_gs_question']}")>0 ){
qQuery("update gs_question set
cd_gs_poll={$poll}, cd_gs_question={$json['cd_gs_question']}, orden={$json['orden']}, pregunta='{$json['pregunta']}', respuesta_type='{$json['respuesta_type']}', respuesta_con_salto='{$json['respuesta_con_salto']}', pregunta_leng={$preguntaLeng}, json='{$json['json']}', marcar_tr='{$json['marcar_tr']}'
where cd_gs_poll={$poll} and cd_gs_question={$json['cd_gs_question']}"
);
}else{
qQuery("insert into gs_question (cd_gs_poll,cd_gs_question,orden,pregunta,respuesta_type,respuesta_con_salto,pregunta_leng,json,marcar_tr) values ({$poll}, {$json['cd_gs_question']}, {$json['orden']},'{$json['pregunta']}', '{$json['respuesta_type']}', '{$json['respuesta_con_salto']}', {$preguntaLeng}, '{$json['json']}', '{$json['marcar_tr']}')");
}
}
die("Grabado");
?>
