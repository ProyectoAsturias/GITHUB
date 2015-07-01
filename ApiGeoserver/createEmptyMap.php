<?php
	include "createMap.php";
	if(isset($_POST['mapName'])){
		$mapName="Map_".$_POST['mapName'];
		createGeoserverMap(-1,$mapName);
	}
	else if(isset($argv) && count($argv)==2){
		createGeoserverMap(-1,$argv[1]);
	}
	else{
		print("Use: ".$argv[0]." <map name>\n");
		exit;
	}
?>