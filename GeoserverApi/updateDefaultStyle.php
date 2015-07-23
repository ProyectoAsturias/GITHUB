<?php
require_once("classes/ApiRest.php");
require_once("classes/Connection.php");
	if(isset($_POST['layerName']) && isset($_POST['styleName']) && isset($_POST['mapName']) ){
		$styleName=($_POST['styleName']);
		$mapName=$_POST['mapName'];
		$layerName=$_POST['layerName'];
		updateDefaultStyle($styleName,$mapName,$layerName);
	}

	/**
	 * Actualiza el estilo por defecto de una capa de Geoserver.
	 * @param string $styleName
	 * @param string $mapName
	 * @param string $layerName
	 */

	function updateDefaultStyle($styleName,$mapName,$layerName){
		$connection = new ServerConnection($mapName);
		$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
		if(($res=$geoserver->defaultStyleToLayer($layerName, $styleName , $mapName))!="")
			print("Advice: ".$res."\n");
		print(0);
	}
