<?php
	require_once("../Common/php/DBConnection.php");
	require_once("apiGeoserverFunc.php");
	
	/**
	 * Devuelve una lista con los wms más comunmente utilizados.
	 * @return string
	 */
	function getWms() {
		$dbConnection = new DBConnection("UserContent");
		$query='SELECT wms FROM "Users" WHERE id='.$_SESSION["userId"];
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$dbConnection->close();

		$row = pg_fetch_row($result);
		$wms = "";
		if(sizeof($row[0])>0)
			$wms=explode(",",$row[0]);

		return json_encode($wms);
	}

	/**
	 * Actualiza la lista de wms comunes.
	 * @return string
	 */
	function updateWmsList() {
		if (isset($_POST['wms'])) {
			$wms = $_POST['wms'];
			$wmsString = "";
			for ($i = 0; $i < sizeof($wms) - 1; $i++)
				$wmsString = $wmsString . $wms[$i].",";
			$wmsString = $wmsString . $wms[$i];

			$dbConnection = new DBConnection("UserContent");
			$query = "UPDATE \"Users\" SET wms='".$wmsString."' WHERE id=".$_SESSION["userid"];
			$result = pg_query($query)or die('Error: '.pg_last_error());
			$dbConnection->close();

			return $result;
		} else
			echo "Error: Wms url missed.";
	}

	/**
	 * Obtiene la lista de atributos de una capa en el momento que se importó.
	 * @return string
	 */
	function getLayerAttributes(){
		if(isset($_POST['layerName']) && isset($_POST['mapName'])){
			$layerName=$_POST['layerName'];
			$mapName=$_POST['mapName'];
			$dbConnection = new DBConnection("UserContent");
			$query="SELECT \"layersInfo\" FROM \"Maps\" WHERE name='".$mapName."'";
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$dbConnection->close();

			//Extraer solo los nombres de las capas (en orden)

			$attributes=[];
			while ($row = pg_fetch_row($result)){
				array_push($attributes,$row[0]);
			}
			$attributes = substr(str_replace("\\","",json_encode($attributes)),2,-2);
			return $attributes;
		}
		else
			echo "Error: Layer name missed.";
	}

	/**
	 * Modifica la vista de la capa en base de datos.
	 * @return string
	 */
	function editView() {
		if(isset($_POST['layerName']) && isset($_POST['mapName']) && isset($_POST['select_layer'])){
			$layerName=$_POST['layerName'];
			$mapName=$_POST['mapName'];
			$select_layer='SELECT "'.str_replace(',','","',$_POST['select_layer']).'"';

			$dbConnection = new DBConnection(null,"localgisVistas");
			$query="SELECT definition FROM pg_views WHERE viewname = '".$mapName.'_'.$layerName."'";
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$result = pg_fetch_result($result, 0,0);
			$from=explode("FROM",$result)[1];
			$query='CREATE OR REPLACE VIEW "'.$dbConnection->schema.'"."'.$mapName.'_'.$layerName.'" AS '.$select_layer.' FROM '.$from;
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$dbConnection->close();
			reloadCache();
			return $result;
		}
		else
			echo "Error: Parameters missed.";
	}

	/**
	 *	Se actualiza el orden de las capas y su transparencia
	 *  @return string
	 */
	function updateMapInfo(){
		if(isset($_POST['mapName']) && isset($_POST['layersInfo'])){
			$mapName = $_POST['mapName'];
			$layersInfo = json_encode($_POST['layersInfo']);
			$dbConnection = new DBConnection("UserContent");
			$query="UPDATE \"Maps\" SET \"layersInfo\"='".$layersInfo."' WHERE \"name\"='".$mapName."'";
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$dbConnection->close();

			return $result;
		}
		else
			echo "Error: Layers information missed.";
	}

	/**
	 *	Se actualiza la descripción del mapa
	 *  @return string
	 */
	function updateMapDescription(){
		if(isset($_POST['mapName']) && isset($_POST['description'])){
			$mapName=$_POST['mapName'];
			$description=$_POST['description'];
			$dbConnection = new DBConnection("UserContent");
			$query="UPDATE Maps SET description=".$description." WHERE name=".$mapName;
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$dbConnection->close();

			return $result;
		}
		else
			echo "Error: Parameters missed.";
	}

	//FUNCIONES AUXILIARES

	/**
	 * Creación de la vista de la capa.
	 */
	function createDBView($layerId,$layerName,$projection,$town){
		/*$where="";
		if($mapId<0)
			$where="' AND id_map='".$mapId."'";

		$query = "SELECT e.id_municipio FROM maps as m,entidades_municipios as e WHERE m.id_entidad=e.id_entidad".$where;
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$town = pg_fetch_result($result, 0,0);*/
		//39073;

		/*SIN ACABAR $query = 'SELECT *  FROM maps, spatial_ref_sys WHERE ';
		"SELECT srid, auth_name, auth_srid, srtext, proj4text FROM spatial_ref_sys where srtext like '%ED50 / UTM zone 30N%'"
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$projection = pg_fetch_result($result, 0,0);*/
		//$projection=23030;
		//print($projection);
		$dbConnection = new DBConnection();
		$query = "SELECT selectquery FROM queries WHERE id_layer='".$layerId."'";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$select_layer = pg_fetch_result($result, 0,0);
		

		$select_layer=str_replace("?T","'".$projection."'",$select_layer);
		$select_layer=str_replace("?M","'".$town."'",$select_layer);

		//SELECT id, id_via, numvia, denominacion, fechaalta, fechabaja, id_municipio, transform("GEOMETRY", '23030') as "GEOMETRY", length, valido, fuente FROM TramosVia  
		//WHERE TramosVia.ID_Municipio in ('39073') and valido = 1
		/*$select_string=explode(" FROM ",$select_layer)[0];
		$where_string=explode(" WHERE ",$select_layer)[1];
		$from=explode(",",str_replace(" ","",explode(" WHERE ",explode(" FROM ",$select_layer)[1])[0]));
		$from_string="";
		for($i=0;$i<sizeof($from);$i++)
			$from_string=$from_string."public.".$from[$i];
		print($select_string." FROM ".$from_string." WHERE ".$where_string);*/

		pg_query('CREATE OR REPLACE VIEW "localgisVistas"."'.$layerName.'" AS '.$select_layer);

		//Comprobamos que la tabla está vacia: Si lo está hay que incluir el srs, ya que geoserver no puede extraerlo al no haber datos geoespaciales.
		/*$q_select=pg_query($dbConnection->dbConn, $select_layer);
		$proj=pg_fetch_all($q_select);
		if($proj==null)
			$proj=$projection;*/
		$dbConnection->close();
	}

	/**
	 *Borrado de la capa en base de datos
	 */
	function delView($layerName){
		$dbConnection = new DBConnection(null,"localgisVistas");
		pg_query('DROP VIEW '.$dbConnection->schema.'."'.$GLOBALS['mapName'].'_'.$layerName.'"');
		$dbConnection->close();
	}
	
	/**
	 *Borrado de todas las vistas de un mapa
	 */
	function delMapViews($mapName){
		$dbConnection = new DBConnection(null,"localgisVistas");
		$result=pg_query("SELECT table_name FROM information_schema.tables WHERE table_name like '".$mapName."_%' AND table_schema = '".$dbConnection->schema."'");
		while ($row = pg_fetch_row($result))
			pg_query('DROP VIEW "'.$dbConnection->schema.'"."'.$row[0].'"');
		$dbConnection->close();
	}
?>