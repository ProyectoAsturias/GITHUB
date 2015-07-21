<?php
	require_once("classes/ApiRest.php");
	require_once("classes/Connection.php");


	if(isset($_POST['mapName']) && isset($_POST['layerName'])){
		$mapName=$_POST['mapName'];
		$layerName=$_POST['layerName'];	
		delWmsLayer($mapName,$layerName);	
	}
	else
		print(json_encode("Error: faltan parámetros"));

	/**
	 * Elimina una capa wms de un mapa de Geoserver.
	 * @param string $mapName
	 * @param string $layerName
	 */
	function delWmsLayer($mapName,$layerName){
		$connection = new ServerConnection($mapName);
		$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
		$wmsName=$geoserver->getWmsstoreName($connection->wsName,$layerName);
		if($result=$geoserver->delWmsLayer($connection->wsName,$wmsName,$layerName))
			print("Advice".$result."\n");

		if($geoserver->countWmsLayers($connection->wsName,$wmsName)==1)
			delWms($wmsName,$connection,$geoserver);
		$connection->dbClose();
	}

	/**
	 * Elimina un wmsstore de Geoserver.
	 * @param string $wmsName
	 * @param object $connection
	 * @param object $geoserver
	 */
	function delWms($wmsName,$connection,$geoserver){
		if($result=$geoserver->delWmsstore($connection->wsName,$wmsName)!="")
			print("Advice: ".$result."\n");
	}
?>