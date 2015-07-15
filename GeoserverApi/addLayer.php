<?php
	//Añade una nueva capa al WS
	require_once("classes/ApiRest.php");
	require_once("classes/Connection.php");


	if(isset($_POST['layerId']) && isset($_POST['layerName']) && isset($_POST['mapId']) && isset($_POST['mapName']) && isset($_POST['town']) && isset($_POST['projection'])){
		$layerId=$_POST['layerId'];
		$layerName=$_POST['layerName'];
		$mapId=$_POST['mapId'];
		$mapName=$_POST['mapName'];
		$town=$_POST['town'];
		$projection=$_POST['projection'];
		$connection = new ServerConnection($mapName);
		$layerDescription="Capa localgis";
		#Activacion WS
		//print $geoserver->enableWms($connection->wsName);

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
		print($projection);
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
		//SELECT id, id_via, numvia, denominacion, fechaalta, fechabaja, id_municipio, transform("GEOMETRY", '23030') as "GEOMETRY", length, valido, fuente FROM TramosVia  
		//WHERE TramosVia.ID_Municipio in ('39073') and valido = 1
		/*$select_string=explode(" FROM ",$select_layer)[0];
		$where_string=explode(" WHERE ",$select_layer)[1];
		$from=explode(",",str_replace(" ","",explode(" WHERE ",explode(" FROM ",$select_layer)[1])[0]));
		$from_string="";
		for($i=0;$i<sizeof($from);$i++)
			$from_string=$from_string."public.".$from[$i];
		print($select_string." FROM ".$from_string." WHERE ".$where_string);*/

		pg_query($connection->dbConn, 'CREATE OR REPLACE VIEW visores."'.$layerName.'" AS '.$select_layer);

		//Comprobamos que la tabla está vacia: Si lo está hay que incluir el srs, ya que geoserver no puede extraerlo al no haber datos geoespaciales.
		/*$q_select=pg_query($connection->dbConn, $select_layer);
		$proj=pg_fetch_all($q_select);
		if($proj==null)
			$proj=$projection;*/
		$layerDescription="Capa de Localgis";
		//print_r($connection->wsName.", ".$connection->dsName.", ".$layerName.", ".$layerDescription."\n");
		if(($result=$geoserver->addLayer($connection->wsName, $connection->dsName, $layerName, $layerDescription, $projection))!="")
			print("Advice: ".$result."\n");
		else{
			//print("Capa añadida");
			addStyles($layerId,$layerName,$mapId,$connection,$geoserver);
		}
	}

	function addStyles($layerId,$layerName,$mapId,$connection,$geoserver){
		$where="";
		if($mapId>=0)
			$where=" AND id_map='".$mapId."'";
		$query = "SELECT l.stylename, s.xml FROM layers_styles as l, styles as s WHERE l.id_style=s.id_style AND id_layer='".$layerId.$where."'";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$styles = array();
		$numRows=pg_num_rows($result);
		if($numRows>0){
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
					if(($res=$geoserver->createStyle($sld_xml, $styleName."_".$i, $connection->wsName))!="")
						print("Advice: ".$res."\n");
					//if(($res=$geoserver->addStyleToLayer($layerName, $styleName."_".$i, $connection->wsName))!="")
						//print("Advice: ".$res."\n");
					//print("Estilo añadido");
				}
				//Toma por defecto el primero
				if(($res=$geoserver->defaultStyleToLayer($layerName, $styleName."_1", $connection->wsName))!="")
					print("Advice: ".$res."\n");
				//print("Estilo por defecto establecido");
				print(0);
			}
		}
	}
?>