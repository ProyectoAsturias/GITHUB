<?php
	include "classes/ApiRest.php";
	include "classes/Connection.php";
	include "classes/LocalgisFamily.php";

	$idFamily=400;
	$family = new LocalgisFamily($idFamily);
	print(json_encode($family));
?>