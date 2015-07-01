<?php
	//Añade una nueva capa al WS
	require_once("classes/ApiRest.php");
	require_once("classes/Connection.php");


	if(isset($_POST['layerId']) && isset($_POST['layerName']) && isset($_POST['mapId']) && isset($_POST['mapName'])){
		$connection = new ServerConnection($mapName);
		$layerId=$_POST['layerId'];
		$layerName=$_POST['layerName'];
		$mapId=$_POST['mapId'];
		$mapName=$_POST['mapName'];
		$layerDescription="Capa localgis";
		
		#Activacion WS
		//print $geoserver->enableWms($connection->wsName);

		$query = "SELECT e.id_municipio FROM maps as m,entidades_municipios as e WHERE m.id_entidad=e.id_entidad AND m.id_map=".$mapName;
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$town = pg_fetch_result($result, 0,0);
		//39073;

		/*SIN ACABAR $query = 'SELECT *  FROM maps, spatial_ref_sys WHERE ';
		"SELECT srid, auth_name, auth_srid, srtext, proj4text FROM spatial_ref_sys where srtext like '%ED50 / UTM zone 30N%'"
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$projection = pg_fetch_result($result, 0,0);*/
		$projection=23030;
		$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
		addLayer($layerId,$layerName,$mapId,$mapName,$town,$projection,$connection,$geoserver);
		$connection->dbClose();
	}
		
	function addLayer($layerId,$layerName,$mapId,$mapName,$town,$projection,$connection,$geoserver){
		//Se rescata la query que forma la capa de Localgis
		$query = "SELECT selectquery FROM queries WHERE id_layer='".$layerId."'";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$select_layer = pg_fetch_result($result, 0,0);
		$select_layer=str_replace("?T","'".$projection."'",$select_layer);
		$select_layer=str_replace("?M","'".$town."'",$select_layer);

		pg_query($connection->dbConn, 'CREATE OR REPLACE VIEW "'.$connection->dsName.'"."'.$layerName.'" AS '.$select_layer);

		//Comprobamos que la tabla está vacia: Si lo está hay que incluir el srs, ya que geoserver no puede extraerlo al no haber datos geoespaciales.
		$q_select=pg_query($connection->dbConn, $select_layer);
		$proj=pg_fetch_all($q_select);

		if($proj==null)
			$proj=$projection;
		else{
			$layerDescription="Capa de Localgis";
			//print_r($connection->wsName.", ".$connection->dsName.", ".$layerName.", ".$layerDescription."\n");
			if(($result=$geoserver->addLayer($connection->wsName, $connection->dsName, $layerName, $layerDescription, $proj))!="")
				print("Advice: ".$result."\n");
			else{
				//print("Capa añadida");
				addStyles($layerId,$layerName,$mapId,$connection,$geoserver);
			}
		}
	}

	function addStyles($layerId,$layerName,$mapId,$connection,$geoserver){
		$query = "SELECT l.stylename, s.xml FROM layers_styles as l, styles as s WHERE l.id_style=s.id_style AND id_layer='".$layerId."' AND id_map='".$mapId."'";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$styles = array();
		while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
		    $styleName = $line["stylename"];
			$SLD = $line["xml"];
			$numSld=substr_count($SLD,"<UserStyle>");
			$exp=explode("<UserStyle>",$SLD);
			$header=$exp[0];
			$end=explode("</UserStyle>",$SLD)[$numSld];
			for($i=1;$i<=$numSld;$i++){
				$sld_xml=$header."<UserStyle>".$exp[$i];
				if($i!=$numSld)
					$sld_xml.=$end;
				if(($result=$geoserver->createStyle($sld_xml, $styleName."_".$i, $connection->wsName))!="")
					print("Advice: ".$result."\n");
				if(($result=$geoserver->addStyleToLayer($layerName, $styleName."_".$i, $connection->wsName))!="")
					print("Advice: ".$result."\n");
				//print("Estilo añadido");
			}
			//Toma por defecto el primero
			if(($result=$geoserver->defaultStyleToLayer($layerName, $styleName."_1", $connection->wsName))!="")
				print("Advice: ".$result."\n");
			//print("Estilo por defecto establecido");
			print(0);
		}
	}
?>