<?php
include "classes/ApiRest.php";
include "classes/Connection.php";
	if(isset($_POST['layerInfo']) && isset($_POST['layerName']) && isset($_POST['mapName']) ){
		$layerInfo=($_POST['layerInfo']);
		$mapName=$_POST['mapName'];
		$layerName=$_POST['layerName'];
		echo ($mapName);
		echo ($layerName);
		var_dump($layerInfo);
		$connection = new ServerConnection($mapName);
		$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
		if(($result=$geoserver->updateLayerInfo($mapName, $layerName, $layerInfo["description"], $layerInfo["keywords"], $layerInfo["title"],$layerInfo["isWmsLayer"]))!=""){
			print("Advice".$result."\n");
		}
		else{
			print("Capa actualizada\n");
		}		
		$connection->dbClose();
	}
?>
