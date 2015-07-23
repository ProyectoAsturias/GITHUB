<?php
	require_once("classes/ApiRest.php");
	require_once("classes/LocalgisLayer.php");
	require_once("classes/LocalgisStyle.php");
	require_once("classes/LocalgisFamily.php");
	require_once("classes/LocalgisMap.php");
	require_once("../Common/php/DBConnection.php");
		
	if(isset($_POST["tag"])){
        switch ($_POST["tag"]) {
            case "getMaps":
                echo getMaps();
                break;
            case "getFamilies":
                echo getFamilies();
                break;
            case "getLayers":
                echo getLayers();
                break;
            case "getMapLayers":
                echo getMapLayers();
                break;
            case "getWms":
                echo getWms();
                break;
            case "addWms":
                echo addWms();
                break;
            case "delWms":
                echo delWms();
                break;
            case "editFeatures":
                echo editFeatures();
                break;
            case "synchrony":
            	echo checkLayerSynchrony();
            	break;
            default:
            	echo "Error: Function ".$_POST["tag"]."don't exists.";
        }
    }
    else
    	echo "Error: Function don't exists (tag).";

	/**
	 * Devuelve una lista con todos los mapas existentes en Localgis.
	 * @return string
	 */
	function getMaps() {
		$dbConnection = new DBConnection("UserContent");
		$query = "SELECT m.id_map, d.traduccion ,m.xml, m.image, m.id_entidad, m.projection_id, m.fecha_ins, m.fecha_mod  FROM maps as m , dictionary as d WHERE m.id_name=d.id_vocablo AND d.locale='es_ES' AND m.id_entidad in (".$_SESSION["entityid"].") ORDER BY d.traduccion";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$dbConnection->close();

		$maps = array();
		$i=0;
		while ($row = pg_fetch_row($result))
		    $maps[$i++] = new LocalgisMap($row[0],$row[1],$row[2],$row[3],$row[4],$row[5],$row[6],$row[7]);
		return json_encode($maps);
	}

	/**
	 * Obtiene las familias de LocalGis para uno o todos los mapas.
	 * @return string
	 */
	function getFamilies() {
		$where="";
		if(isset($_POST['idMap'])) //Las familias de un mapa
			$where=" AND r.id_map = '".$idMap."'";

		$dbConnection = new DBConnection();
		$query = "SELECT lf.id_layerfamily , d.traduccion FROM maps_layerfamilies_relations as r, layerfamilies as lf , dictionary d WHERE r.id_layerfamily=lf.id_layerfamily AND lf.id_name=d.id_vocablo AND id_entidad in (".$_SESSION["entityid"].") AND d.locale='es_ES' ".$where." ORDER By lf.id_layerfamily";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$dbConnection->close();

		$families = array();
		$i=0;
		while ($row = pg_fetch_row($result))
		    $families[$i++]= new LocalgisFamily($row[0],$row[1]);
		return json_encode($families);
	}

	/**
	 * Obtiene todas las capas de una familia de LocalGis .
	 * @return string
	 */
	function getLayers() {
		if(isset($_POST['idFamily'])){ 
			$idFamily=$_POST['idFamily'];

			$dbConnection = new DBConnection();
			$query = "SELECT l.id_layer,d.traduccion FROM layerfamilies_layers_relations as r,layers as l , dictionary d WHERE r.id_layerfamily='".$idFamily."' AND r.id_layer=l.id_layer AND l.id_name=d.id_vocablo AND d.locale='es_ES' AND id_entidad in (".$_SESSION["entityid"].") ORDER BY d.traduccion";			
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$dbConnection->close();

			$layers = array();
			$i=0;
			while ($row = pg_fetch_row($result))
				if(isAccessible($row[0]))
			    	$layers[$i++]= new LocalgisLayer($row[0],$row[1]);
			return json_encode($layers);
		}
		else
			echo "Error: Id family missed.";
	}

	/**
	 * Obtiene las capas de un mapa de LocalGis.
	 * @return string
	 */
	function getMapLayers() {
		if(isset($_POST['idMap'])){
			$idMap=$_POST['idMap'];

			$dbConnection = new DBConnection();
			$query="SELECT ls.id_layer,d.traduccion FROM layers_styles as ls, layers as l , dictionary d WHERE id_map=".$idMap." AND l.id_layer=ls.id_layer AND l.id_name=d.id_vocablo AND d.locale='es_ES' AND ls.id_entidad in (".$_SESSION["entityid"].") ORDER BY position";
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$dbConnection->close();

			$layers = array();
			$i=0;
			while ($row = pg_fetch_row($result)){
				if(isAccessible($row[0]))
					$layers[$i++]= new LocalgisLayer($row[0],$row[1]);
			}
			return json_encode($layers);
		}
		else
			echo "Error: Id map missed.";
	}

	/**
	 * Devuelve una lista con los wms más comunmente utilizados.
	 * @return string
	 */
	function getWms() {
		$dbConnection = new DBConnection();
		$query="SELECT wms FROM Users WHERE id=".$_SESSION["userid"];
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$dbConnection->close();

		$row = pg_fetch_row($result);
		$wms = "";
		if(sizeof($row)>0)
			$wms=explode(",",$row);

		return json_encode($wms);
	}

	/**
	 * Añade un wms a la lista de wms comunes.
	 * @return string
	 */
	function addWms() {
		if(isset($_POST['wms'])){
			$wms=$_POST['wms'];
			$wmsList=json_decode(getWms());
			$wmsList=array_push($wmsList, $wms);
			$wmsString="";
			for($i=0;$i<sizeof($wmsList)-1;$i++)
				$wmsString.=$wmsList[$i].",";
			$wmsString.=$wmsList[$i+1];

			$dbConnection = new DBConnection("UserContent");
			$query="UPDATE Users SET wms=".$wmsString." WHERE id=".$_SESSION["userid"];
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$dbConnection->close();

			return $result;
		}
		else
			echo "Error: Wms url missed.";
	}

	/**
	 * Elimina un wms de la lista de wms comunes.
	 * @return string
	 */
	function delWms() {
		if(isset($_POST['id_wms'])){
			$id_wms=$_POST['id_wms'];
			$wmsList=json_decode(getWms());
			$wmsList=array_push($wmsList, $wms);
			$wmsString="";
			for($i=0;$i<sizeof($wmsList)-1;$i++){
				if($i!=$id_wms)
					$wmsString.=$wmsList[$i].",";
			}
			if($i+1!=$id_wms)
				$wmsString.=$wmsList[$i+1];

			$dbConnection = new DBConnection("UserContent");
			$query="UPDATE Users SET wms=".$wmsString." WHERE id=".$_SESSION["userid"];
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$dbConnection->close();

			return $result;
		}
		else
			echo "Error: Wms url missed.";
	}

    /**
	 * Modifica la vista de la capa en base de datos.
	 * @return string
	 */
	function editFeatures() {
		if(isset($_POST['layerName']) and isset($_POST['mapName']) and isset($_POST['select_layer'])){
			$layerName=$_POST['layerName'];
			$mapName=$_POST['mapName'];
			$select_layer=$_POST['select_layer'];

			$dbConnection = new DBConnection();
			$query="CREATE OR REPLACE VIEW visores.\"".$mapName."_".$layerName."\" AS ".$select_layer;
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$dbConnection->close();

			return $result;
		}
		else
			echo "Error: Parameters missed.";
	}

	/**
	 * Comprueba si una capa está sincronizada.
	 * @return bool
	 */
	function checkLayerSynchrony() {
		if(isset($_POST['layerName']) and isset($_POST['mapName']) and isset($_POST['columns'])){
			$layerName=$_POST['layerName'];
			$mapName=$_POST['mapName'];
			$columns=$_POST['columns'];
			
			$dbConnection = new DBConnection();
			$query="SELECT column_name FROM information_schema.columns WHERE table_name='".$mapName."_".$layerName."' and table_schema='visores'";
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$columsView = pg_fetch_row($result);

			$dbConnection->close();
			if(sizeof(array_diff($columns,$columsView))==0)
				return true;
			return false;
		}
		else
			echo "Error: Parameters missed.";
	}


	#FUNCIONES AUXILIARES#####

	/**
	 * Creación de la vista de la capa.
	 */
	function createDBView($layerId,$projection,$town){
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
		$dbConnection->close();

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

		pg_query($dbConnection->dbConn, 'CREATE OR REPLACE VIEW visores."'.$layerName.'" AS '.$select_layer);

		//Comprobamos que la tabla está vacia: Si lo está hay que incluir el srs, ya que geoserver no puede extraerlo al no haber datos geoespaciales.
		/*$q_select=pg_query($dbConnection->dbConn, $select_layer);
		$proj=pg_fetch_all($q_select);
		if($proj==null)
			$proj=$projection;*/
		
	}

	/**
	 *Borrado de la capa en base de datos
	 */
	function delView($layerName){
		$dbConnection = new DBConnection();
		pg_query($dbConnection->dbConn, 'DROP VIEW visores."'.$layerName.'"');
		$dbConnection->dbClose();
	}

	/**
	 * Devuelve una lista de estilos para una capa
	 * @return object
	 */
	function getStyles($layerId,$mapId){
		$where="";
		if($mapId>=0)
			$where=" AND id_map='".$mapId."'";

		$dbConnection = new DBConnection();
		$query = "SELECT l.stylename, s.xml FROM layers_styles as l, styles as s WHERE l.id_style=s.id_style AND id_layer='".$layerId.$where."'";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		
		$styles = array();
		$numRows=pg_num_rows($result);
		if($numRows>0){
			while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
			    $styleName = $row["stylename"];
				$SLD = $row["xml"];
				$numSld=substr_count($SLD,"<UserStyle>");
				$exp=explode("<UserStyle>",$SLD);
				$header=$exp[0];
				$end=explode("</UserStyle>",$SLD)[$numSld];
				for($i=1;$i<=$numSld;$i++){
					$sld_xml=$header."<UserStyle>".$exp[$i];
					if($i!=$numSld)
						$sld_xml.=$end;
					$style = new LocalgisStyle($styleName,$sld_xml);
					array_push($styles, $style);
				}
			}
		}
		$dbConnection->close();
		return $styles;
	}

?>