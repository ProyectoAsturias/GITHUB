
<?php

	include "classes/ApiRest.php";
	include "classes/Connection.php";
	include "classes/LocalgisMap.php";

	
	print(getMaps());
	

	function getMaps() {
		$connection = new ServerConnection();
		$query = 'SELECT * FROM maps';
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$connection->dbClose();
		$maps = array();
		$i=0;
		while ($row = pg_fetch_row($result))
		    $maps[$i++]= new LocalgisMap($row[0],$row[2],$row[3],$row[4],$row[5],$row[6],$row[7],false);

		//Ordenación (Burbuja)
		for($i=1;$i<sizeof($maps);$i++){
			for($j=0;$j<sizeof($maps)-$i;$j++){
				if($maps[$j]->mapName>$maps[$j+1]->mapName){
					$aux=$maps[$j];
					$maps[$j]=$maps[$j+1];
					$maps[$j+1]=$aux;
				}
			}
		}
		return json_encode($maps);
	}
?>