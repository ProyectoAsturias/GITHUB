<?php
	include "createMap.php";
	if(isset($_POST['id']) && isset($_POST['mapName'])){
		$mapId=$_POST['id'];
		$mapName=$_POST['mapName'];
		createGeoserverMap($mapId,$mapName);
	}
	else if(isset($argv) && count($argv)==3){
		createGeoserverMap($argv[1],$argv[2]);
	}
	else{
		print("Use: ".$argv[0]." <map id(537)> <map name>\n");
		exit;
	}
?>