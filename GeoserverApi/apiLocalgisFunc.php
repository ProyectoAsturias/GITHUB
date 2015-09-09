<?php
	require_once("classes/ApiRest.php");
	require_once("classes/LocalgisStyle.php");
	require_once("classes/LocalgisLayer.php");
	require_once("classes/LocalgisFamily.php");
	require_once("classes/LocalgisMap.php");
	require_once("../Common/php/DBConnection.php");
	require_once("apiDatabaseFunc.php");


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
			$query = "SELECT DISTINCT(l.id_layer),d.traduccion FROM layerfamilies_layers_relations as r,layers as l , dictionary d WHERE r.id_layerfamily='".$idFamily."' AND r.id_layer=l.id_layer AND l.id_name=d.id_vocablo AND d.locale='es_ES' ORDER BY d.traduccion";			
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
			$where="";
			if(isset($_SESSION["entityId"]))
	            $where="AND l.id_entidad=".$_SESSION["entityId"];
	        else if(isset($_POST['entityId']))
	            $where="AND l.id_entidad=".$_POST['entityId'];
			$query="SELECT ls.id_layer,d.traduccion FROM layers_styles as ls, layers as l , dictionary d WHERE id_map=".$idMap." AND l.id_layer=ls.id_layer AND l.id_name=d.id_vocablo AND d.locale='es_ES' ".$where." ORDER BY position";
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
	 * Obtiene las Ortofotos de un mapa de LocalGis.
	 * @return string
	 */
	function getWmsLayers() {
		if(isset($_POST['idMap'])){
			$idMap=$_POST['idMap'];
			$dbConnection = new DBConnection();
			$query="SELECT l.url,l.name, l.srs, l.format, l.visible FROM maps_wms_relations r, map_server_layers l WHERE l.id=r.id_mapserver_layer AND r.id_map=".$idMap." AND l.activa=1 ORDER BY r.position";
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
	 * Comprueba si una capa está sincronizada.
	 * @return bool
	 */
	function checkLayerSynchrony() {
		if(isset($_POST['layerName']) and isset($_POST['mapName']) and isset($_POST['columns'])){
			$layerName=$_POST['layerName'];
			$mapName=$_POST['mapName'];
			$columns=$_POST['columns'];
			
			$dbConnection = new DBConnection();
			$query="SELECT column_name FROM information_schema.columns WHERE table_name='".$mapName."_".$layerName."' and table_schema='localgisVistas'";
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

	/**
	 * Devuelve una lista de estilos para una capa
	 * @return object
	 */
	function getStyles($layerId,$mapId){
		$where="";
		if($mapId>=0)
			$where=" AND id_map='".$mapId."'";

		$dbConnection = new DBConnection();
		$query = "SELECT DISTINCT(s.xml) FROM layers_styles as l, styles as s WHERE l.id_style=s.id_style AND id_layer='".$layerId.$where."'";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		
		$styles = array();
		$numRows=pg_num_rows($result);
		if($numRows>0){
			while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
				$SLD = $row["xml"];
				$numSld=substr_count($SLD,"<UserStyle>");
				$exp=explode("<UserStyle>",$SLD);
				$header=$exp[0];
				$end=explode("</UserStyle>",$SLD)[$numSld];
				for($i=1;$i<=$numSld;$i++){
					$sld_xml=$header."<UserStyle>".$exp[$i];
					if($i!=$numSld)
						$sld_xml.=$end;
					$styleName = explode("</Name>",explode("<Name>",$sld_xml)[2])[0];
					var_dump($styleName);
					$styleName = explode(":_:",$styleName)[1];
					var_dump($styleName);
					$style = new LocalgisStyle($styleName,$sld_xml);
					array_push($styles, $style);
				}
				//$style= new LocalgisStyle($styleName,$SLD);
				//array_push($styles, $style);
			}


			/*while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
				$SLD = $row["xml"];
				$styleName = str_replace(" ", "_", explode("</Name>",explode("<Name>",$SLD)[1])[0]);
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
				$style= new LocalgisStyle($styleName,$SLD);
				array_push($styles, $style);
			}*/
		}
		$dbConnection->close();
		return $styles;
	}

	/**
	 * Devuelve los parámetros de entidad
	 * @return object
	 */
	function getEntityData(){
		$params=array();
		$dbConnection = new DBConnection();
		$query = "SELECT replace(nombreoficial,' ','')as name,id_entidad,srid FROM entidad_supramunicipal WHERE 1=1 ".$GLOBALS['whereEntity'];
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$numRows=pg_num_rows($result);
		while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
			array_push($params,$row['name']);
			array_push($params,$row['id_entidad']);
			array_push($params,$row['srid']);
		}
		$query = "SELECT id_municipio FROM entidades_municipios WHERE 1=1 ".$GLOBALS['whereEntity'];
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$numRows=pg_num_rows($result);
		while ($row = pg_fetch_array($result, null, PGSQL_ASSOC))
			array_push($params,$row['id_municipio']);
		$dbConnection->close();
		return json_encode($params);
	}

	/**
	 * Devuelve los nombres de todas las entidades
	 * @return object
	 */
	function getEntityNames(){
		$params=array();
		$dbConnection = new DBConnection();
		$query = "SELECT replace(nombreoficial,' ','')as name, id_entidad FROM entidad_supramunicipal ORDER BY name";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$numRows=pg_num_rows($result);
		while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
			$p=[$row['name'],$row['id_entidad']];
			array_push($params,$p);
		}
		return json_encode($params);
	}
?>
