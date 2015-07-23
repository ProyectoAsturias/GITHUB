<?php
	//Se le asigna un estilo por defecto a una layer
	include "classes/ApiRest.php";
	geoserver->defaultStyleToLayer($layerName, $styleName."_1", $connection->wsName);
?>