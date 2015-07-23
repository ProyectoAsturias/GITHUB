<?php
	include "classes/Connection.php";
	include "classes/LocalgisLayer.php";

	if(isset($_POST['idFamily'])){
		$idFamily=$_POST['idFamily'];
		print(getLayers($idFamily));
	}
	else
		print(json_encode("Error: falta idFamily"));
	//print(getLayers(17));

	/**
	 * Obtiene todas las capas de una familia de LocalGis a través de su Id.
	 * @param $idFamily
	 * @return string
	 */
	function getLayers($idFamily) {
		$connection = new ServerConnection();
		$query = "SELECT l.id_layer,d.traduccion,l.acl,l.id_styles FROM layerfamilies_layers_relations as r,layers as l , dictionary d WHERE r.id_layerfamily='".$idFamily."' AND r.id_layer=l.id_layer AND l.id_name=d.id_vocablo AND d.locale='es_ES' AND id_entidad in (".$idEntidad.") ORDER BY d.traduccion";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$connection->dbClose();
		$layers = array();
		$i=0;
		while ($row = pg_fetch_row($result))
		    $layers[$i++]= new LocalgisLayer($row[0],$row[1],$row[2],$row[3],false);
		return json_encode($layers);
	}
?>