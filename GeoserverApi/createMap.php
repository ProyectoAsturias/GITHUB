<?php
	require_once("classes/ApiRest.php");
	require_once("classes/Connection.php");

	if(isset($_POST['mapName'])){
		$mapName=$_POST['mapName'];
		createGeoserverMap($mapName);
	}
	else if(isset($argv) && count($argv)==2){
		createGeoserverMap($argv[1]);
	}
	else{
		print("Use: ".$argv[0]." <map name>\n");
		exit;
	}
	
	/**
	 * Crea un mapa en Geoserver. Genera un WorkSpace y un Datastore en Geoserver.
	 * @param string $mapName
	 */
	function createGeoserverMap($mapName){
		$connection = new ServerConnection($mapName);
		$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
		#Creación del WS y el DS
		if(($result=$geoserver->createWorkspace($connection->wsName))!="")
			print("Advice".$result."\n");
		else
			print("Workspace creado\n");

		if(($result=$geoserver->createPostGISDatastore($connection->wsName, $connection->dsName, 'visores', $connection->dbName, $connection->dbUser, $connection->dbPass, $connection->dbHost))!="")
			print("Advice".$result."\n");
		else
			print("Store creado\n");
		$connection->dbClose();	
	}
?>