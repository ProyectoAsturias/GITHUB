<?php
	require_once("classes/ApiRest.php");
	require_once("classes/Connection.php");

	if(isset($_POST['mapName'])){	
		$mapName=$_POST['mapName'];
		delWs($mapName);
	}
	else
		print("Nombre del mapa no definido.");

	/**
	 * Elimina una workstore Geoserver.
	 * @param $mapName
	 */
	function delWs($mapName){
		$connection = new ServerConnection($mapName);
		$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
		if(($result=$geoserver->delWorkspace($connection->wsName))!="")
			print("Advice: ".$result."\n");
		else
			print(0);
		$connection->dbClose();
	}
?>
