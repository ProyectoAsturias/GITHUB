<?php
	include "classes/Connection.php";
	include "classes/LocalgisMap.php";

	print(getMaps());
	
	/**
	 * Devuelve una lista con todos los mapas existentes en Localgis.
	 * @return string
	 */
	function getMaps() {
		$connection = new ServerConnection();
		$query = "SELECT m.id_map, d.traduccion ,m.xml, m.image, m.id_entidad, m.projection_id, m.fecha_ins, m.fecha_mod  FROM maps as m , dictionary as d WHERE m.id_name=d.id_vocablo AND d.locale='es_ES' AND m.id_entidad in (".$idEntidad.") ORDER BY d.traduccion";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$connection->dbClose();
		$maps = array();
		$i=0;
		while ($row = pg_fetch_row($result))
		    $maps[$i++] = new LocalgisMap($row[0],$row[1],$row[2],$row[3],$row[4],$row[5],$row[6],$row[7],false);
		return json_encode($maps);
	}
?>