<?php
	#FUNCIONES AUXILIARES#####

	require_once("../Common/php/DBConnection.php");
	require_once("classes/LocalgisStyle.php");

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

		pg_query('CREATE OR REPLACE VIEW visores."'.$layerName.'" AS '.$select_layer);

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
		$dbConnection = new DBConnection();
		pg_query('DROP VIEW visores."'.$GLOBALS['mapName'].'_'.$layerName.'"');
		$dbConnection->close();
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
		$query = "SELECT s.xml FROM layers_styles as l, styles as s WHERE l.id_style=s.id_style AND id_layer='".$layerId.$where."'";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		
		$styles = array();
		$numRows=pg_num_rows($result);
		if($numRows>0){
			while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
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
			}
		}
		$dbConnection->close();
		return $styles;
	}

?>