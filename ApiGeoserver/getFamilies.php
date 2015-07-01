<?php
	include "classes/ApiRest.php";
	include "classes/Connection.php";
	include "classes/LocalgisMap.php";

	$idMap=537;
	$map = new LocalgisMap($idMap);
	print(json_encode($map));
?>