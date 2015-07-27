<?php
include "classes/ApiRest.php";
include "classes/Connection.php";
	if(isset($_POST['wmsInfo']) && isset($_POST['mapName']) ){
		$wmsInfo=($_POST['wmsInfo']);
		$mapName=$_POST['mapName'];
		updateWmsInfo($wmsInfo,$mapName);
	}
	/**
	 * Actualiza la información de un wms de Geoserver.
	 * @param object $wmsInfo
	 * @param string $mapName
	 */
	function updateWmsInfo($wmsInfo,$mapName){
		$connection = new ServerConnection($mapName);
		$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
		$geoserver->updateWmsInfo($mapName, $wmsInfo["description"], $wmsInfo["keywords"], $wmsInfo["title"]);			
		$geoserver->updateWsInfo($mapName,$wmsInfo["contactPerson"],$wmsInfo["contactOrganization"],$wmsInfo["contactPosition"],$wmsInfo["address"],$wmsInfo["addressType"],$wmsInfo["city"],$wmsInfo["stateOrProvince"],$wmsInfo["country"],$wmsInfo["postCode"],$wmsInfo["contactPhone"],$wmsInfo["fax"],$wmsInfo["email"]);
		$connection->dbClose();
	}
?>
