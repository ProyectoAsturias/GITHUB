<?php
	include "classes/Connection.php";

	if(isset($_POST['idMap'])){
		$idMap=$_POST['idMap'];
		print(getLayers($idMap));
	}
	else
		print(json_encode("Error: falta idMap"));

	function getLayers($idMap) {
		$connection = new ServerConnection();

		$query = "SELECT id_layerfamily FROM maps_layerfamilies_relations WHERE id_map=".$idMap." ORDER BY \"position\"";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$connection->dbClose();
		$layerfamilies = array();
		$i=0;
		while ($row = pg_fetch_row($result))
		    $layerfamilies[$i++]= $row[0];
		return json_encode($layerfamilies);
	}
?>