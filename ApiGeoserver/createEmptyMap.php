<?php
/**
 * Crea un mapa vacío en Geoserver con el nombre enviado por parámetro POST
*/
	include "createMap.php";
	if(isset($_POST['mapName'])){
		$mapName=$_POST['mapName'];
		if (checkMapExists($mapName)){
			echo 1;
			return;
		}
		createGeoserverMap(-1,$mapName);
	}
	/*else if(isset($argv) && count($argv)==2){
		createGeoserverMap(-1,$argv[1]);
	}
	else{
		print("Use: ".$argv[0]." <map name>\n");
		exit;
	}*/

function checkMapExists($mapName){
	$connection = new ServerConnection($mapName);
	$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
	if ($geoserver->existsWorkspace($mapName)){
		return true;
	}
	return false;
}
?>