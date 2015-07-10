<?php
/**
 * Crea un mapa en Geoserver con el ID y el nombre de un mapa de LocalGis.
 */
	include "createMap.php";
	if(isset($_POST['id']) && isset($_POST['mapName'])){
		$mapId=$_POST['id'];
		$mapName="Map_".$_POST['mapName'];
		createGeoserverMap($mapId,$mapName);
	}
	else if(isset($argv) && count($argv)==3){
		createGeoserverMap($argv[1],"Map_".$argv[2]);
	}
	else{
		print("Use: ".$argv[0]." <map id(537)> <map name>\n");
		exit;
	}
?>