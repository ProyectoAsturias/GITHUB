<?php
	include "classes/Connection.php";

	if(isset($_POST['idMap'])){ //Las familias de un mapa
		$idMap=$_POST['idMap'];
		print(getFamilies($idMap));
	}
	else //Todas las familias
		print(getFamilies());

/**
 * Obtiene las familias de un mapa de LocalGis a través de su ID.
 * @param $idMap
 * @return string
 */
function getFamilies($idMap=null) {
		$connection = new ServerConnection();
		$where="";
		if($idMap!=null)
			$where=" AND r.id_map = '".$idMap."'";
		$query = "SELECT DISTINCT(lf.id_layerfamily), d.traduccion FROM maps_layerfamilies_relations as r, layerfamilies as lf , dictionary d WHERE r.id_layerfamily=lf.id_layerfamily AND lf.id_name=d.id_vocablo".$where;
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$connection->dbClose();
		$families = array();
		$i=0;
		while ($row = pg_fetch_row($result))
		    $families[$i++]= new LocalgisFamily($row[0],$row[1],false);

		//Ordenación (Burbuja)
		for($i=1;$i<sizeof($families);$i++){
			for($j=0;$j<sizeof($families)-$i;$j++){
				if($families[$j]->name>$families[$j+1]->name){
					$aux=$families[$j];
					$families[$j]=$families[$j+1];
					$families[$j+1]=$aux;
				}
			}
		}
		return json_encode($families);
	}
?>