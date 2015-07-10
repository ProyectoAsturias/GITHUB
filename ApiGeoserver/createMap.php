<?php
	require_once("classes/ApiRest.php");
	require_once("classes/Connection.php");
	require_once("classes/LocalgisMap.php");
	require_once("addLayer.php");
	/*
		Un mapa tiene una o varias familias de capas. Y estas a su vez una o varias capas
	*/
/**
 * Crea un mapa en Geoserver. Si el ID del mapa pertenece a uno de LocalGis, se conecta a la base de datos y a través de Querys importa las capas del mapa de LocalGis.
 * @param $mapId
 * @param $mapName
 */
function createGeoserverMap($mapId,$mapName){
		$connection = new ServerConnection($mapName);
		$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
		pg_query($connection->dbConn, 'CREATE SCHEMA "'.$connection->dsName.'" AUTHORIZATION '.$connection->dbUser);
		print(pg_last_error());
		#Creación del WS y el DS
		if(($result=$geoserver->createWorkspace($connection->wsName))!="")
			print("Advice".$result."\n");
		else
			print("Workspace creado\n");

		if(($result=$geoserver->createPostGISDataStore($connection->wsName, $connection->dsName, $connection->dsName, $connection->dbName, $connection->dbUser, $connection->dbPass, $connection->dbHost))!="")
			print("Advice".$result."\n");
		else
			print("Store creado\n");

		if($mapId!=-1){
			$query = 'SELECT DISTINCT(layers.name),layers.id_layer FROM maps_layerfamilies_relations, layerfamilies_layers_relations, layers WHERE maps_layerfamilies_relations.id_map='.$mapId.' AND maps_layerfamilies_relations.id_layerfamily=layerfamilies_layers_relations.id_layerfamily AND layerfamilies_layers_relations.id_layer = layers.id_layer';
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$layerList=array();
			while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
				$layer=array();
			    foreach ($line as $col_value) {
			    	array_push($layer, $col_value);
			    }
			    array_push($layerList,$layer);
			}
			//var_dump($layerList);
			$layerDescription="Capa localgis";
			
			#Activacion WS
			//print $geoserver->enableWms($connection->wsName);

			$query = "SELECT e.id_municipio FROM maps as m,entidades_municipios as e WHERE m.id_entidad=e.id_entidad AND m.id_map=".$mapId;
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$town = pg_fetch_result($result, 0,0);
			//39073;


			/*SIN ACABAR $query = 'SELECT *  FROM maps, spatial_ref_sys WHERE ';
			"SELECT srid, auth_name, auth_srid, srtext, proj4text FROM spatial_ref_sys where srtext like '%ED50 / UTM zone 30N%'"
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$projection = pg_fetch_result($result, 0,0);*/
			$projection=23030;
			#Creamos una vista por cada capa y Añadimos las capas al DS
			foreach($layerList as $layer){
				$layerName=$layer[0];
				$layerId=$layer[1];
				print $layerName.": #".$layerId."\n";
				addLayer($layerId,$layerName,$mapId,$mapName,$town,$projection,$connection,$geoserver);
			}
		}
		pg_close($connection->dbConn);
	}
?>