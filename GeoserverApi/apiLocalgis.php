<?php
	require_once("classes/ApiRest.php");
	require_once("classes/LocalgisLayer.php");
	require_once("classes/LocalgisFamily.php");
	require_once("classes/LocalgisMap.php");
	require_once("../Common/php/DBConnection.php");
	require_once("apiAux.php");

		
	if(isset($_POST["tag"])){
		session_start();
		$whereEntity="";
		if($_SESSION["entityid"]!=0)
			$whereEntity="AND m.id_entidad=".$_SESSION["entityid"];
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
            case "addCommonWms":
                echo addCommonWms();
                break;
            case "delCommonWms":
                echo delCommonWms();
                break;
            case "editFeatures":
                echo editFeatures();
                break;
            case "synchrony":
            	echo checkLayerSynchrony();
            	break;
            default:
            	echo "Error apiLocalgis: Function ".$_POST["tag"]." don't exists.";
        }
    }
    else
    	echo "Error: Function don't exists (tag).";

	function isAccessible($idlayer){
		//Comprobación de acl
		return true;
	}

	/**
	 * Devuelve una lista con todos los mapas existentes en Localgis.
	 * @return string
	 */
	function getMaps() {
		$dbConnection = new DBConnection();
		$query = "SELECT DISTINCT(m.id_map), d.traduccion ,m.xml, m.image, m.id_entidad, m.projection_id, m.fecha_ins, m.fecha_mod  FROM maps as m , dictionary as d WHERE m.id_name=d.id_vocablo AND d.locale='es_ES' ".$GLOBALS['whereEntity']." ORDER BY d.traduccion";
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
		$query = "SELECT DISTINCT(lf.id_layerfamily) , d.traduccion FROM maps_layerfamilies_relations as r, layerfamilies as lf , dictionary d WHERE r.id_layerfamily=lf.id_layerfamily AND lf.id_name=d.id_vocablo ".$GLOBALS['whereEntity']." AND d.locale='es_ES' ".$where." ORDER By d.traduccion";
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
			$query = "SELECT DISTINCT(l.id_layer),d.traduccion FROM layerfamilies_layers_relations as r,layers as l , dictionary d WHERE r.id_layerfamily='".$idFamily."' AND r.id_layer=l.id_layer AND l.id_name=d.id_vocablo AND d.locale='es_ES' ".$GLOBALS['whereEntity']." ORDER BY d.traduccion";			
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
			$query="SELECT ls.id_layer,d.traduccion FROM layers_styles as ls, layers as l , dictionary d WHERE id_map=".$idMap." AND l.id_layer=ls.id_layer AND l.id_name=d.id_vocablo AND d.locale='es_ES' ".$GLOBALS['whereEntity']." ORDER BY position";
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
		$dbConnection = new DBConnection("UserContent");
		$query="SELECT wms FROM \"Users\" WHERE id=".$_SESSION["userid"];
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$dbConnection->close();

		$row = pg_fetch_row($result);
		$wms = "";
		if(sizeof($row[0])>0)
			$wms=explode(",",$row[0]);

		return json_encode($wms);
	}

	/**
	 * Añade un wms a la lista de wms comunes.
	 * @return string
	 */
	function addCommonWms() {
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
	function delCommonWms() {
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
?>