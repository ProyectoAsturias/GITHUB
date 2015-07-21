<?php
	//Añade una nueva capa al WS
	require_once("classes/ApiRest.php");
	require_once("classes/Connection.php");


	if(isset($_POST['mapName']) && isset($_POST['wmsName']) && isset($_POST['wmsUrl']) && isset($_POST['listLayers']) ){
		$mapName=$_POST['mapName'];
		$wmsName=$_POST['wmsName'];
		$wmsUrl=$_POST['wmsUrl'];
		$listLayers=$_POST['listLayers'];		
		addWms($mapName,$wmsName,$wmsUrl,$listLayers);
	}
	else
		print(json_encode("Error: faltan parámetros"));
	
	/**
	 * Añade un wmsstore dado un wms externo.
	 * @param string $mapName
	 * @param string $wmsName
	 * @param string $wmsUrl
	 * @param string $listLayers
	 */	
	function addWms($mapName,$wmsName,$wmsUrl,$listLayers){
		$connection = new ServerConnection($mapName);
		$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
		if($result=$geoserver->createWmsstore($connection->wsName,$wmsName,$wmsUrl))
			print("Advice".$result."\n");
		else
			print("Wms Store creado\n");
		for($i=0;$i<sizeof($listLayers);$i++)
			addWmsLayer($wmsName,$listLayers[$i],$connection,$geoserver);
		$connection->dbClose();
	}

	/**
	 * Añade una capa wms al wmsstore.
	 * @param string $wmsName
	 * @param string $wmsLayerTitle
	 * @param object $connection
	 * @param object $geoserver
	 */	
	function addWmsLayer($wmsName,$wmsLayerTitle,$connection,$geoserver){
		$wmsLayerDescription="Capa wms externa";
		if(($result=$geoserver->addWmsLayer($connection->wsName,$wmsName,$wmsLayerTitle,$wmsLayerDescription))!="")
			print("Advice: ".$result."\n");
	}
?>