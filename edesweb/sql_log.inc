<?PHP


// function qQueryLog()
/*
	- siempre se graba primero en el log y luego en la tabla destino, así siempre se queda registrado en el log
	- test de velocidad y estimar tiempo de ejecución
	- por linea de comandos: mysql -u USUARIO -p < /Ruta/Del/Archivo/archivo.sql
	- LOAD DATA INFILE 'employee1.txt' INTO TABLE employee;
*/


/* ejemplo:
	$total = qUpdateWithLog([
		"table"	=> "empre",
		"pk"	=> "cd_empre",
		"where"	=> "web='www.google.es'",
		"set"	=> "nm_loca='MADRID', cd_prov=(select cd_prov from prov where nm_prov='MADRID')"
	//	"set"	=> "nm_loca='PRUEBA-2', cd_prov=35"
	]);

	$total = qUpdateWithLog([
		"requests"=>1000,
		"table"	=> "el_pri_censo C join persona P on C.cd_persona=P.cd_persona",
		"pk"	=> "C.cd_el_primaria, C.cd_persona",
		"where"	=> "C.cd_el_primaria={$ActualizarPrimaria} and (C.estado<>P.estado or C.condi<>P.condi or C.dni<>P.dni or C.nombre<>P.nombre or C.apel1<>P.apel1 or C.apel2<>P.apel2 or C.telefono<>P.telefono or C.movil<>P.movil or C.tlf_tra<>P.tlf_tra or C.email<>P.email or C.cd_tipovia<>P.cd_tipovia or C.direccion<>P.direccion or C.num_via<>P.num_via or C.ppeb<>P.ppeb)",
		"set"	=> "C.estado=P.estado, C.condi=P.condi, C.dni=P.dni, C.nombre=P.nombre, C.apel1=P.apel1, C.apel2=P.apel2, C.telefono=P.telefono, C.movil=P.movil, C.tlf_tra=P.tlf_tra, C.email=P.email, C.cd_tipovia=P.cd_tipovia, C.direccion=P.direccion, C.num_via=P.num_via, C.ppeb=P.ppeb"
	]);
*/
function qUpdateWithLog($data){
	global $_User;
	
	$tableMain  = $data["table"];
	$set	= $data["set"];
	$where  = trim($data["where"]);
	$pk		= eNsp($data["pk"]);
	$requests  = $data["requests"];
	
	$alias = "";
	if( preg_match("/\./", $pk) ){
		$alias = $pk[0].".";
	}

	if( $requests=="" ) $requests = 1;
	$requesLog = "";

	$pkDim = explode(",", $pk);
	$pkDimOriginal = $pkDim;
	$pkTotal = count($pkDim);
	for($n=0; $n<$pkTotal; $n++){
		if( preg_match("/\./", $pkDim[$n]) ){
			list(,$pkDim[$n]) = explode(".", $pkDim[$n]);
		}
	}
	if( $where!="" ) $where = "where {$where}";
	
	$totalRec = 0;
	list($table) = explode(" ", $tableMain);
	
	qQuery("select {$alias}* from {$tableMain} {$where}", $pnt);
	while( $old=qArray($pnt) ){

		// calcula el indice del registro actual
			$claveLog = "";
			$whereOne = [];
			$whereOneOriginal = [];
			for($n=0; $n<$pkTotal; $n++){
				$whereOne[] = $pkDim[$n].'="'.$old[$pkDim[$n]].'"';
				$whereOneOriginal[] = $pkDimOriginal[$n].'="'.$old[$pkDim[$n]].'"';
				$claveLog .= $old[$pkDim[$n]];
			}
			$whereOne = implode(" and ", $whereOne);
			$whereOneOriginal = implode(" and ", $whereOneOriginal);
		
		// update del registro actual
			$sqlUpdate = "update {$tableMain} set {$set} where {$whereOneOriginal}";
			qQuery($sqlUpdate, $p2);
		
		// leemos el registro ya modificado
			$sqlNew = "select * from {$table} where {$whereOne}";
			qQuery($sqlNew, $p3);
			$new = qArray($p3);

		// calcula las diferencias
			$dif = [];
			foreach($new as $k=>$v){
				if( $old[$k]!=$v ){
					if( $v=="NULL" || $v=="" ){
						$dif[] = "{$k}=NULL";
					}else if( is_numeric($v) ){
						//$dif[] = "{$k}={$v}";
						$dif[] = $k.'="'.$v.'"';
					}else{
						$v = str_replace('"','&#34;',trim($v));
						$dif[] = $k.'="'.$v.'"';
					}			
				}
			}
			$dif = implode(",", $dif);
			$new = array();
			if( $dif=="" ) continue;

		$totalRec++;

		// graba en el log
			if( $requests==1 ){
				$sql = 'insert into gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "M", "'.$_User.'", "'.$table.'", "'.$claveLog.'", "'.str_replace('"','&#34;',$dif).'")';
				qQuery($sql, $p2);
			}else{
				if( $totalRec%$requests==1 ){
					$requesLog = 'insert into gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "M", "'.$_User.'", "'.$table.'", "'.$claveLog.'", "'.str_replace('"','&#34;',$dif).'")';
				}else{
					$requesLog .= ',("'.date('Y-m-d H:i:s').'", "M", "'.$_User.'", "'.$table.'", "'.$claveLog.'", "'.str_replace('"','&#34;',$dif).'")';
				}
				if( $totalRec%$requests==0 ){
					qQuery($requesLog, $p2);
					$requesLog = "";
				}
			}
	}
	if( $requesLog!='' ){
		qQuery($requesLog, $p2);
	}
	return $totalRec;
}


/*	ejemplo:
	$total = qDeleteToWithLog([
				"table"	 => "empre_tmp",
				"pk"	 => "pk, cif",
				"where"	 => "nm_loca='MADRID'"
	]);
	eTrace($total);
	eEnd();
*/

function qDeleteToWithLog($data){
	global $_User;

	$table = $data["table"];
	$where = $data["where"];
	$pk = eNsp($data["pk"]);

	$requests  = $data["requests"];
	if( $requests=="" ) $requests = 1;
	$requesLog = "";

	$totalRec = 0;
	$pk = eNsp($pk);
	$dimPk = explode(",", $pk);			// puede tener mas de un indice
	$totalPk = count($dimPk);
	if( $where!="" ) $where = "where {$where}";

	$sql = "select * from {$table} {$where}";
	//eTrace($sql);
	qQuery($sql, $p1);
	while( $r=qArray($p1) ){
		$totalRec++;

		// calcula la cadena del log y del insert
			$dim = [];
			$dimValores = [];
			foreach($r as $k=>$v){
				if( $v=="NULL" || $v=="" ){
					$dim[] = "{$k}=NULL";
					$dimValores[] = "NULL";
				}else if( is_numeric($v) ){
					//$dim[] = "{$k}='{$v}'";
					$dim[] = $k.'="'.$v.'"';
					//$dimValores[] = "'".$v."'";
					$dimValores[] = '"'.$v.'"';
				}else{
					$v = str_replace('"','&#34;',trim($v));
					$dim[] = $k.'="'.$v.'"';
					$dimValores[] = '"'.$v.'"';
				}			
			}
			$sqlLog = implode(",", $dim);

		// calcula la clave del log
			$dClave = "";
			$dWhere = [];
			for($n=0; $n<$totalPk; $n++){
				$dClave .= $r[$dimPk[$n]];
				$dWhere[] = $dimPk[$n].'="'.$r[$dimPk[$n]].'"';
			}
			$dWhere = implode(" and ", $dWhere);
		
		if( $requests==1 ){
			// graba en el log
				$sql = 'insert into gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "B", "'.$_User.'", "'.$table.'", "'.$dClave.'", "'.str_replace('"','&#34;',$sqlLog).'")';
				qQuery($sql, $p2);
		}else{
			if( $totalRec%$requests==1 ){
				// graba en el log
					$requesLog = 'insert into gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "B", "'.$_User.'", "'.$table.'", "'.$dClave.'", "'.str_replace('"','&#34;',$sqlLog).'")';
			}else{
				// graba en el log
					$requesLog .= ',("'.date('Y-m-d H:i:s').'", "B", "'.$_User.'", "'.$table.'", "'.$dClave.'", "'.str_replace('"','&#34;',$sqlLog).'")';
			}
			if( $totalRec%$requests==0 ){
				qQuery($requesLog, $p2);
				$requesLog = "";
			}
		}

		// borramos de la tabla destino
			$sqlDelete = "delete from {$table} where {$dWhere}";
			qQuery($sqlDelete, $p2);
	}
	if( $requesLog!='' ){
		qQuery($requesLog, $p2);
	}
	return $totalRec;
}

//multi_query(

/*	ejemplo:
	$total = qUpdateToWithLog([
		"origin"=>[
			"table"	 => "empre",
			"fields" => "112 as pk, cif, cd_empre, referencia, nm_empre, direccion, nm_loca, cd_prov, cd_postal, email, tlf1, tlf2, fax",		// muy importante "AS"
			"where"	 => "nm_loca='MADRID'"
		],
		"target"=>[
			"table"	 => "empre_tmp",
			"pk"	 => "pk, cif",
			"fields" => "pk, cif, cd_empre, referencia, nm_empre2, direccion, nm_loca, cd_prov, cd_postal, email, tlf1, tlf2, fax"
		]
	]);
	eTrace($total);
	eEnd();
*/

function qUpdateToWithLog($data){
	global $_User;

	$oTabla  = $data["origin"]["table"];
	$oCampos = $data["origin"]["fields"];
	$oWhere  = $data["origin"]["where"];
	
	$dTabla  = $data["target"]["table"];
	$dPk	 = eNsp($data["target"]["pk"]);
	$dCampos = eNsp($data["target"]["fields"]);
	
	$dimPk = explode(",", $dPk);			// puede tener mas de un indice
	$totalPk = count($dimPk);
	$dCampoDim = explode(",", $dCampos);
	
	$totalRec = 0;
	if( $oWhere!="" ) $oWhere = "where ".$oWhere;
	
	// se recorre todos los registros a modificar
	$oSql = "select {$oCampos} from {$oTabla} {$oWhere}";
	qQuery($oSql, $p1);
	while( $oRec=qArray($p1) ){
		
		// calcula la clave del log
			$claveLog = "";
			$claveDestinoDim = [];
			for($n=0; $n<$totalPk; $n++){
				$claveLog .= $oRec[$dimPk[$n]];
				$claveDestinoDim[] = $dimPk[$n]."='".$oRec[$dimPk[$n]]."'";
			}
			$claveDestino = implode(" and ", $claveDestinoDim);

		// select en la tabla destino
			$dSql = "select {$dCampos} from {$dTabla} where {$claveDestino}";
			qQuery($dSql, $p2);
			$dRec = qArray($p2);
			//eTrace($dSql);

		// si el registro ya no existe salta al siguiente
			$dExist = true;
			for($n=0; $n<$totalPk; $n++){
				if( $dRec[$dimPk[$n]]!=$oRec[$dimPk[$n]] ){
					$dExist = false;
					break;
				}
			}
			if( !$dExist ){							//eTrace("< Rec no existe");
				continue;
			}
		
		
		// calcula la cadena del log y del update
			$dim = [];
			$cambios = 0;
			$i = -1;
			foreach($oRec as $k=>$v){
				$i++;
				$k = $dCampoDim[$i];
				if( $dRec[$k]!=$v ){				//eTrace($dRec[$k]."!=".$v); 
					$cambios++;
					if( $v=="NULL" || $v=="" ){
						$dim[] = "{$k}=NULL";
					}else if( is_numeric($v) ){
						//$dim[] = "{$k}='{$v}'";
						$dim[] = $k.'="'.$v.'"';
					}else{
						$v = str_replace('"','&#34;',trim($v));
						$dim[] = $k.'="'.$v.'"';
					}
				}
			}
			if( $cambios==0 ){						//eTrace("< no hay cambios");
				continue;
			}
			$sqlLog = implode(",", $dim);
	
		$totalRec++;
			
		// graba en el log
			$sql = 'insert into gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "M", "'.$_User.'", "'.$dTabla.'", "'.$claveLog.'", "'.str_replace('"','&#34;',$sqlLog).'")';
			qQuery($sql, $p2);
		
		// modificamos en la tabla destino
			$sqlUpdate = "update {$dTabla} set {$sqlLog} where {$claveDestino}";	//eTrace("= ". $sqlUpdate );
			qQuery($sqlUpdate);

		//ePrintR($cambios, $oSql, $sqlUpdate, $sqlLog, $dim, $dClave, $sql, "PARAMETROS:", $oTabla, $oCampos, $oWhere, $dTabla, $dPk, $dCampos);
		//eTrace($sql);
	}
	return $totalRec;
}


/*	ejemplo:
	$total = qInsertToWithLog([
		"origin"=>[
			"table"	 => "empre",
			"fields" => "112 as pk, cif, cd_empre, referencia, nm_empre, direccion, nm_loca, cd_prov, cd_postal, email, tlf1, tlf2, fax",		// muy importante "AS"
			"where"	 => "nm_loca='MADRID'"
		],
		"target"=>[
			"table"	 => "empre_tmp",
			"pk"	 => "pk, cif",
			"fields" => "pk, cif, cd_empre, referencia, nm_empre2, direccion, nm_loca, cd_prov, cd_postal, email, tlf1, tlf2, fax"
		]
	]);
	eTrace($total);
*/

function qInsertToWithLog($data){
	global $_User;

	$oTabla  = $data["origin"]["table"];
	$oCampos = $data["origin"]["fields"];
	$oWhere  = $data["origin"]["where"];
	
	$dTabla  = $data["target"]["table"];
	$dPk	 = eNsp($data["target"]["pk"]);
	$dCampos = $data["target"]["fields"];
	$requests  = $data["requests"];
	
	$dimPk = explode(",", $dPk);			// puede tener mas de un indice
	$totalPk = count($dimPk);
	if( $requests=="" ) $requests = 1;
	$requesLog = "";
	$requesTable = "";

	$totalRec = 0;
	if( $oWhere!="" ) $oWhere = "where ".$oWhere;
	
	// se recorre todos los registros a copiar
	$oSql = "select {$oCampos} from {$oTabla} {$oWhere}";
	qQuery($oSql, $p1);
	while( $r=qArray($p1) ){
		$totalRec++;

		// calcula la cadena del log y del insert
			$dim = [];
			$dimValores = [];
			foreach($r as $k=>$v){
				if( $v=="NULL" || $v=="" ){
					$dim[] = "{$k}=NULL";
					$dimValores[] = "NULL";
				}else if( is_numeric($v) ){
					//$dim[] = "{$k}='{$v}'";
					$dim[] = $k.'="'.$v.'"';
					//$dimValores[] = "'".$v."'";
					$dimValores[] = '"'.$v.'"';
				}else{
					$v = str_replace('"','&#34;',trim($v));
					$dim[] = $k.'="'.$v.'"';
					$dimValores[] = '"'.$v.'"';
				}			
			}
			$sqlLog = implode(",", $dim);

		// calcula la clave del log
			$dClave = "";
			for($n=0; $n<$totalPk; $n++){
				$dClave .= $r[$dimPk[$n]];
			}
		
		if( $requests==1 ){
			// graba en el log
				$sql = 'insert into gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "A", "'.$_User.'", "'.$dTabla.'", "'.$dClave.'", "'.str_replace('"','&#34;',$sqlLog).'")';
				qQuery($sql, $p2);
			
			// insertamos en la tabla destino
				$sqlInsert = "insert into {$dTabla} ({$dCampos}) values (".implode(",",$dimValores).")";
				qQuery($sqlInsert, $p2);
		}else{
			if( $totalRec%$requests==1 ){
				// graba en el log
					$requesLog = 'insert into gs_log (cdi, operacion, cd_gs_user, tabla, clave, sqlexe) values ("'.date('Y-m-d H:i:s').'", "A", "'.$_User.'", "'.$dTabla.'", "'.$dClave.'", "'.str_replace('"','&#34;',$sqlLog).'")';
				// insertamos en la tabla destino
					$requesTable = "insert into {$dTabla} ({$dCampos}) values (".implode(',',$dimValores).')';
			}else{
				// graba en el log
					$requesLog	 .= ',("'.date('Y-m-d H:i:s').'", "A", "'.$_User.'", "'.$dTabla.'", "'.$dClave.'", "'.str_replace('"','&#34;',$sqlLog).'")';
				// insertamos en la tabla destino
					$requesTable .= ',('.implode(",",$dimValores).')';
			}
			if( $totalRec%$requests==0 ){
				qQuery($requesLog, $p2);
				qQuery($requesTable, $p2);
				$requesLog = "";
				$requesTable = "";
			}
		}
		
		//ePrintR($oSql, $sqlInsert, $sqlLog, $dim, $dClave, $sql, "PARAMETROS:", $oTabla, $oCampos, $oWhere, $dTabla, $dPk, $dCampos);
	}
	if( $requesLog!='' ){
		qQuery($requesLog, $p2);
		qQuery($requesTable, $p2);
	}
	return $totalRec;
}

?>
