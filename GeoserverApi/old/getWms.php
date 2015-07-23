<?php
	include "classes/ApiRest.php";
	include "classes/Connection.php";
	include "classes/LocalgisMap.php";

	print(getMaps());

	/**
	 * Devuelve en formato JSON una lista con los mapas más comunmente utilizados.
	 * @return string
	 */
	function getMaps() {
		/*$query = 'SELECT * FROM wms';
		$result = pg_query($query) or die('Error: '.pg_last_error());*/
		$wms = array();
		//$i = 0;
		/*while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
			$wms[$i++]= "";
		}*/
		$wms[0]="http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx";
		$wms[1]="http://ogc.larioja.org/wms/request.php";
		$wms[2]="http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms";
		$wms[3]="http://www.ign.es/wms-inspire/pnoa-ma";
		return json_encode($wms);
	}
?>