<?php
	//Elimina una capa del DS
	require_once("classes/ApiRest.php");
	require_once("classes/Connection.php");

	if(isset($_POST['layerName']) && isset($_POST['mapName'])){
		$layerName=$_POST['layerName'];
		$mapName=$_POST['mapName'];
		delLayer($layerName,$mapName);
	}
	//delLayer("scbarbol1","Map_Arbolado");

/**
 * Elimina una capa de un mapa de Geoserver.
 * @param $layerName
 * @param $mapName
 */
function delLayer($layerName,$mapName){
		$connection = new ServerConnection($mapName);
		$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
		//Borrado de los estilos asociados
		$styleList=$geoserver->listStyles($layerName,$connection->wsName)->styles->style;
		foreach($styleList as $style)
			delStyle($style->name,$connection->wsName,$geoserver);
		//Borrado de la capa
		if(($result=$geoserver->deleteLayer($mapName,$mapName,$layerName))!="")
			print("Advice: ".$result."\n");
		print("Borrado satisfactorio");
		print(0);
		$connection->dbClose();
	}

/**
 * Elimina un estilo de un Workspace de Geoserver.
 * @param $name
 * @param $wsName
 * @param $geoserver
 */
function delStyle($name,$wsName,$geoserver){
		if(($result=$geoserver->deleteStyle($name,$wsName))!="")
			print(1); //El estilo no se ha borrado porque otra capa hace uso de él.
			//print("Advice: ".$result."\n");
	}
?>