<?php
include "classes/ApiRest.php";
include "classes/Connection.php";
	if(isset($_POST['mapName']) ){
		$mapName=$_POST['mapName'];
		$connection = new ServerConnection($mapName);
		$connection->dbClose();

		$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
		return $geoserver->enableWms($mapName);
	}
?>
