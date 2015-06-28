<?php

	include "ApiRest.php";
	include "Connection.php";
	include "LocalgisMap.php";

	//$connection = new ServerConnection();
	print(getMaps());
	//$connection->dbClose();

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
		$wms[4]="http://localhost:8080/geoserver/Concejo1/wms";
		return json_encode($wms);
	}
?>