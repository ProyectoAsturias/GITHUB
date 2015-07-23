<?php
	include "../Common/php/DBConnection.php";
	include "../Common/php/access.php";

	if(isset($_POST['idMap'])){
		$idMap=$_POST['idMap'];
		print(getLayers($idMap));
	}
	else
		print(json_encode("Error: falta idMap"));

	/**
	 * Obtiene las capas de un mapa de LocalGis a través de su ID.
	 * @param $idMap
	 * @return string
	 */
	function getLayers($idMap) {
		$connection = new ServerConnection();
		$query="SELECT id_layer FROM layers_styles WHERE id_map=".$idMap."  AND id_entidad in (".$idEntidad.") ORDER BY position";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$connection->dbClose();
		$layerfamilies = array();
		$i=0;
		while ($row = pg_fetch_row($result)){
			if(isAccessible($row[0]))
		    	$layerfamilies[$i++]= $row[0];
		}
		return json_encode($layerfamilies);
	}
?>