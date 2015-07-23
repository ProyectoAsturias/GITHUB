<?php
	require_once("classes/ApiRest.php");
	require_once("classes/Connection.php");

	if(isset($_POST['mapName']) && isset($_POST['layerName'])){	
		$mapName=$_POST['mapName'];
		$layerName=$_POST['layerName'];
		delLayer($mapName,$layerName);
	}

	/**
	 * Elimina una capa de un mapa de Geoserver.
	 * @param string $mapName
	 * @param string $layerName
	 */
	function delLayer($mapName,$layerName){
		$connection = new ServerConnection($mapName);
		$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
		if(($result=$geoserver->delLayer($mapName,$mapName,$layerName))!="")
			print("Advice: ".$result."\n");
		//Borrado de la capa en base de datos
		pg_query($connection->dbConn, 'DROP VIEW visores."'.$layerName.'"');
		print(0);
		$connection->dbClose();
	}
?>
