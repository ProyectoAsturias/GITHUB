<?php
	require_once(dirname(__FILE__)."/../Common/php/DBConnection.php");
	require_once("apiGeoserverFunc.php");
	/**
	 * Devuelve una lista con los wms de un uaurio, mas los comunes
	 * @return string
	 */
	function getWms() {
		$dbConnection = new DBConnection(true);
		$query='SELECT wms FROM "CommonWms"';
                $result1 = pg_query($query) or die('Error: '.pg_last_error());
		$query='SELECT wms FROM "Users" WHERE id='.$_SESSION["userId"];
		$result2 = pg_query($query) or die('Error: '.pg_last_error());
		$dbConnection->close();

		$wms = [];
		while ($row = pg_fetch_row($result1)){
			array_push($wms,$row[0]);
                }	
		$row = pg_fetch_row($result2);
		if(sizeof($row[0])>0){
			$userWms=explode(",",$row[0]);
			$wms=array_merge($wms,$userWms);
		}
		return json_encode($wms);
	}

	/**
         * Devuelve una lista con los wms de un usuario.
         * @return string
         */
        function getUserWms() {
                $dbConnection = new DBConnection(true);
                $query='SELECT wms FROM "Users" WHERE id='.$_SESSION["userId"];
                $result = pg_query($query) or die('Error: '.pg_last_error());
                $dbConnection->close();

                $wms = [];
                $row = pg_fetch_row($result);
                if(sizeof($row[0])>0){
                        $wms=explode(",",$row[0]);
                }
                return json_encode($wms);
        }

	/**
	 * Actualiza la lista de wms de un usuario.
	 * @return string
	 */
        function updateUserWmsList() {
                $wmsString = "";
                if (isset($_POST['wms'])) {
                        $wms = $_POST['wms'];
                        for ($i = 0; $i < sizeof($wms) - 1; $i++)
                                $wmsString = $wmsString . $wms[$i].",";
                        $wmsString = $wmsString . $wms[$i];
                }
                $dbConnection = new DBConnection(true);
                $query = "UPDATE \"Users\" SET wms='".$wmsString."' WHERE id=".$_SESSION["userId"];
                $result = pg_query($query)or die('Error: '.pg_last_error());
                $dbConnection->close();
                return $result;
        }

	/**
	 * Obtiene la lista de atributos de una capa en el momento que se importó.
	 * @return string
	 */
	function getLayerAttributes(){
		if(isset($_POST['layerName']) && isset($_POST['mapName'])){
			$layerName=$_POST['layerName'];
			$mapName=$_POST['mapName'];
			$dbConnection = new DBConnection(true);
			$query="SELECT attributes FROM \"Maps\" as m,\"Layers\" as l WHERE m.id=l.id_map AND m.name='".$mapName."' AND l.name='".$layerName."'";
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$result = pg_fetch_result($result, 0,0);	
			$dbConnection->close();
			return $result;
		}
		else
			echo "Error: Layer name missed.";
	}

	/**
	 * Modifica la vista de la capa en base de datos.
	 * @return string
	 */
	function editView() {
		if(isset($_POST['layerName']) && isset($_POST['mapName']) && isset($_POST['selected_att'])){
			$layerName=$_POST['layerName'];
			$mapName=$_POST['mapName'];
			$selected_att=$_POST['selected_att'];
			$dbConnection = new DBConnection(true);
			$query="SELECT query FROM \"Layers\" AS l, \"Maps\" AS m WHERE l.id_map=m.id AND m.name = '".$mapName."' AND l.name='".$layerName."'";
                        $result = pg_query($query) or die('Error: '.pg_last_error());
                        $queryResult = pg_fetch_result($result, 0,0);
			$dbConnection->close();	
			if($queryResult==""){
				$dbConnection = new DBConnection(null,"localgisvistas");
				$query="SELECT definition FROM pg_views WHERE viewname = '".$mapName.'_'.$layerName."'";
				$result = pg_query($query) or die('Error: '.pg_last_error());
				$queryResult = pg_fetch_result($result, 0,0);
				$dbConnection->close();	
				$dbConnection = new DBConnection(true);
				$query = "SELECT id FROM \"Maps\" WHERE name='".$mapName."'";
	                        $result = pg_query($query)or die('Error: '.pg_last_error());
        	                $idMap = pg_fetch_result($result, 0,0);
                                $query="UPDATE \"Layers\" SET query='".$queryResult."' WHERE name='".$layerName."' AND id_map='".$idMap."'";
                                pg_query($query) or die('Error: '.pg_last_error());
                                $dbConnection->close();		
			}
			$exp=multiexplode(array("FROM","from","From"),$queryResult);
			$select=$exp[0];
			$from="";

			if(sizeof($exp)>1)
				$from=substr($queryResult,strlen($select));
			else
				$from=$exp[1];
			$dbConnection = new DBConnection(null,"localgisvistas");	
			$query='DROP VIEW "'.$dbConnection->schema.'"."'.$mapName.'_'.$layerName.'"';
			pg_query($query) or die('Error: '.pg_last_error());	

			//Formamos el nuevo select
			$select=substr($select,6);
			$att=explode(",",$select);
			$select_layer="SELECT ";
			$j=0;
			for($i=0;$i<sizeof($att);$i++){
				$a="";
				if(strpos($att[$i],'(')!=false && strpos($att[$i],')')==false && strpos($att[$i+1],')')!=false)
					$a=$att[$i].','.$att[++$i];
				else
					$a=$att[$i];
				$column="";
				if(strpos($a,'GEOMETRY')!=false)
					$column=$a;
				else{
					if($selected_att[$j]==1)
						$column=$a;
					$j++;
				}
				if($column!=""){
					$select_layer.=$column;
					if($i<sizeof($att)-1)
						$select_layer.=",";
				}
			}
			if(substr($select_layer,-1)==",")
                                $select_layer=substr($select_layer,0,strlen($select_layer)-1);
			$query='CREATE VIEW "'.$dbConnection->schema.'"."'.$mapName.'_'.$layerName.'" AS '.$select_layer.' '.$from;
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$dbConnection->close();
			reloadCache();
		}
		else
			echo "Error: Parameters missed.";
	}

	/**
	 *	Se actualiza el orden de las capas, su visibilidad y su transparencia
	 *  @return string
	 */
	function saveMapInfo() {
		if (isset($_POST['mapName']) && isset($_POST['layerName']) && isset($_POST['position']) && isset($_POST['visibility']) && isset($_POST['opacity'])) {
			$mapName=$_POST['mapName'];
			$layerName=$_POST['layerName'];
			$position=$_POST['position'];
			$visibility=$_POST['visibility'];
			$opacity=$_POST['opacity'];
			$dbConnection = new DBConnection(true);
	                $query = "SELECT id FROM \"Maps\" WHERE name='".$mapName."'";
	                $result = pg_query($query)or die('Error: '.pg_last_error());
			$idMap = pg_fetch_result($result, 0,0);
			$query = "SELECT count(*) FROM \"Layers\" WHERE name='".$layerName."' AND id_map='".$idMap."'";
			$result = pg_query($query)or die('Error: '.pg_last_error());
                        $updateable = pg_fetch_result($result, 0,0);	
			if($updateable==1){
	        	        $query = "UPDATE \"Layers\" SET visibility='".$visibility."',opacity='".$opacity."',position='".$position."' WHERE name='".$layerName."' AND id_map='".$idMap."'";
        	        	$result = pg_query($query)or die('Error: '.pg_last_error());
			}
			else{
				if(isset($_POST['query']) && isset($_POST['attributes'])){
					$formQuery=$_POST['query'];
					$attributes=$_POST['attributes'];
					$query = "INSERT INTO \"Layers\" (id_map, visibility, opacity, position, query, attributes, name) VALUES('".$idMap."','".$visibility."','".$opacity."','".$position."','".$formQuery."','".$attributes."','".$layerName."')";
                        	        $result = pg_query($query)or die('Error: '.pg_last_error());	
				}
				else
					return "Error: Layers information missed.";	
			}
	                $dbConnection->close();
        	        return $result;
		} else
			return "Error: Layers information missed.";
	}

	function getMapInfo(){
		if (isset($_POST['mapName'])){
			$mapName=$_POST['mapName'];
			$dbConnection = new DBConnection(true);
        	        $query = "SELECT l.name,visibility,opacity FROM \"Layers\" AS l, \"Maps\" AS m WHERE m.id=l.id_map AND m.name='".$mapName."' ORDER BY position";
                	$result = pg_query($query)or die('Error: '.pg_last_error());
			$mapInfo="{\"map\":[";
			while ($row = pg_fetch_row($result)){
	                        $layerInfo="{\"name\":\"".$row[0]."\",\"visibility\":".$row[1].",\"opacity\":".$row[2].",\"position\":".$row[3]."},";
				$mapInfo.=$layerInfo;
			}
			$mapInfo=substr($mapInfo,0,-1);
			$mapInfo.="]}";
			$dbConnection->close();	
			return $mapInfo;	
		}
		return "Error: Map name missed.";	
	}

	function deleteLayerInfo(){
		if (isset($_POST['mapName']) && isset($_POST['layerName'])){
                        $mapName = $_POST['mapName'];
			$layerName = $_POST['layerName'];
                        $dbConnection = new DBConnection(true);
                        $query = "SELECT id FROM \"Maps\" WHERE name='".$mapName."'";
			$result = pg_query($query)or die('Error: '.pg_last_error());
                        $idMap = pg_fetch_result($result, 0,0);	
                        $query = "DELETE FROM \"Layers\"  WHERE id_map=".$idMap." AND name='".$layerName."'";
                        $result = pg_query($query)or die('Error: '.pg_last_error());
                        $dbConnection->close();
                        return $result;
                }
                else
                        return "Error: Layers information missed.";
	}

	/**
	 *	Se actualiza la descripción del mapa
	 *  @return string
	 */
	function updateMapDescription(){
		if(isset($_POST['mapName']) && isset($_POST['description'])){
			$mapName=$_POST['mapName'];
			$description=$_POST['description'];
			$dbConnection = new DBConnection(true);
			$query="UPDATE \"Maps\" SET description=".$description.", date_update=NOW() WHERE name=".$mapName;
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
		$dbConnection = new DBConnection();
		$query = "SELECT selectquery FROM queries WHERE id_layer='".$layerId."'";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$select_layer = pg_fetch_result($result, 0,0);
		
		$query = "SELECT versionable FROM layers WHERE id_layer='".$layerId."'";
                $result = pg_query($query) or die('Error: '.pg_last_error());
                $versionable = pg_fetch_result($result, 0,0);
	
		if($versionable=="1")
			$select_layer=$select_layer."AND revision_expirada=9999999999";
		
		$town=str_replace(array('"','[',']'),'',$town);
		$select_layer=str_replace("?T","'".$projection."'",$select_layer);
		$select_layer=str_replace("?M","".$town."",$select_layer);
		$select_layer=traduceQuery($select_layer);
		$result = pg_query($select_layer) or die('Error: '.pg_last_error());
		if(pg_num_rows($result)>0)
			pg_query('CREATE OR REPLACE VIEW "localgisvistas"."'.$layerName.'" AS '.$select_layer)or die('Error: '.pg_last_error().' '.$select_layer);

		$dbConnection->close();
		return pg_num_rows($result);
	}

	function multiexplode ($delimiters,$string) {
   		for($i=0;$i<sizeof($delimiters);$i++){
			$str=explode($delimiters[$i],$string);
			if(sizeof($str)>1)
				return $str; 
		} 
		return  $string;
	}

	function traduceQuery($query){
		$split1=multiexplode(array("FROM","From","from"),$query);
		/*if(sizeof($split1)<2)
                        $split1=explode("FROM",$query);*/
                $select=multiexplode(array("SELECT","Select","select"),$split1[0]);
		/*if(sizeof($select)<2)
			$select=explode("Select",$split1[0]);	*/
                $select=trim($select[1]);
                $split2=multiexplode(array("WHERE","Where","where"),$split1[1]);
		/*if(sizeof($split2)<2)
                        $split2=explode("Where",$split1[1]);*/
                $from=$split2[0];
                $where="";
                if(sizeof($split2)>1)
                        $where=" WHERE".$split2[1];

                $split3=explode(",",$select);
                $tableColumns=array();
                $select="";
                for($i=0;$i<sizeof($split3);$i++){
                        $tC=explode(".",$split3[$i]);
			$tableName=trim($tC[0]);
                        $tableColumns=traduce($tC,$tradCount);
                        if($tableColumns!=null){
                                $from.=" LEFT JOIN (
                                                SELECT
                                                    domainnodes.pattern,
                                                    dictionary.traduccion
                                                FROM
                                                    public.columns,
                                                    public.domains,
                                                    public.domainnodes,
                                                    public.tables,
                                                    public.dictionary
                                                WHERE
                                                    columns.id_domain = domains.id AND
                                                    domainnodes.id_domain = domains.id AND
                                                    tables.id_table = columns.id_table AND
                                                    dictionary.id_vocablo = domainnodes.id_description AND
                                                    dictionary.locale = 'es_ES' AND
                                                    tables.name= '".$tableName."') as ".$tableColumns[0]."
                                                ON ".$tableColumns[0].".pattern='".$tableName.".".$tableColumns[1]."'";
                                $select.=$tableColumns[0].".traduccion as ".$tableColumns[1].",";
                        }
                        else
                                $select.=$split3[$i].",";
                                //$select.="\"".$tC[0]."\".\"".$tC[1]."\",";
                }
                $select=substr($select,0,-1);
                return "SELECT ".$select." FROM".$from.$where;
	}	

	function traduce($tableColumn,&$tradCount){
                if(sizeof($tableColumn)!=2 ||$tableColumn[1]=="id" || $tableColumn[1]=="id_municipio" || $tableColumn[1]=="\"id\"" || $tableColumn[1]=="\"id_municipio\"")
                        return null;
                $table=str_replace(" ","",trim($tableColumn[0]));
                $table=str_replace("\"","",$table);
		$column=trim($tableColumn[1]);
                $column=str_replace("\"","",$column);
	
                $column=multiexplode(array(" AS "," as "),$column);
		if(sizeof($column)>1)
			$column=$column[0];
		$column=str_replace(" ","",$column);

                $query=
                        "SELECT
                          dictionary.traduccion
                        FROM
                          public.columns,
                          public.domains,
                          public.domainnodes,
                          public.tables,
                          public.dictionary
                        WHERE
                          columns.id_domain = domains.id AND
                          domainnodes.id_domain = domains.id AND
                          tables.id_table = columns.id_table AND
                          dictionary.id_vocablo = domainnodes.id_description AND
                          dictionary.locale = 'es_ES' AND
                          tables.name='".$table."' AND
                          columns.name='".$column."'";
                $result = pg_query($query) or die('Error: '.pg_last_error());
                $count=pg_num_rows($result);
                if($count>0){
                        $table="s".$tradCount;
                        $tradCount++;
                        $result =  array($table,$column);
                        return $result;
                }
                else
                        return null;

        }

	/**
	 *Borrado de la capa en base de datos
	 */
	function delView($layerName){
		$dbConnection = new DBConnection(null,"localgisvistas");
		pg_query('DROP VIEW "'.$dbConnection->schema.'"."'.$GLOBALS['mapName'].'_'.$layerName.'"');
		$dbConnection->close();
	}
	
	/**
	 *Borrado de todas las vistas de un mapa
	 */
	function delMapViews($mapName){
		$dbConnection = new DBConnection(null,"localgisvistas");
		$result=pg_query("SELECT table_name FROM information_schema.tables WHERE table_name like '".$mapName."_%' AND table_schema = '".$dbConnection->schema."'");
		while ($row = pg_fetch_row($result))
			pg_query('DROP VIEW "'.$dbConnection->schema.'"."'.$row[0].'"');
		$dbConnection->close();
	}

	function getAttachDocuments($nameLayer,$idFeature,$private){
		$dbConnection = new DBConnection();

		$query="";
		$query = "select id_layer from layers,dictionary where traduccion like '".$nameLayer."' and id_name=id_vocablo and locale='es_ES'";
		$result=pg_query($query);
		while ($row = pg_fetch_row($result))
			$idLayer=$row[0];
		if($private==true)
		$query="SELECT d.id_documento, d.nombre,d.is_imgdoctext FROM documento d, anexofeature a WHERE d.id_documento=a.id_documento AND a.id_layer='".$idLayer."' AND a.id_feature='".$idFeature."' AND publico=1";
		else
		$query="SELECT d.id_documento, d.nombre,d.is_imgdoctext FROM documento d, anexofeature a WHERE d.id_documento=a.id_documento AND a.id_layer='".$idLayer."' AND a.id_feature='".$idFeature."'";
		$result=pg_query($query);
		$attach=[];
		while ($row = pg_fetch_assoc($result))
			array_push($attach,$row);
		$dbConnection->close();
		return json_encode($attach);
	}
		/**
		 *Devuelve un documento adjunto, dado un nombre
		 */
		function getDocument($idDocument){
			$dbConnection = new DBConnection();
			$query="SELECT extract(year from fecha_alta) as year,extract(month from fecha_alta) as month,mime_type, d.nombre  FROM documento d, documento_tipos dt WHERE d.tipo=dt.tipo AND id_documento='".$idDocument."'";
			$result=pg_query($query);
			$dir = "";
			while ($row = pg_fetch_assoc($result)){
				$year=$row["year"];
				$month=$row["month"];
				$type=$row["mime_type"];
				$fileName = $row["nombre"];
				if(strlen($month)==1)
					$month='0'.$month;
				$dir=$year.$month;
			}
			$dbConnection->close();
			$path="/usr/local/LocalGIS.MODELO/admcar/classes/documentos/".$dir."/".$idDocument;
			if (file_exists($path)) {
				header('Content-Description: File Transfer');
				header('Content-Type: application/'.$type);
				header('Content-Disposition: attachment; filename="'.$fileName.'"');
				header('Expires: 0');
				header('Cache-Control: must-revalidate');
				header('Pragma: public');
				header('Content-Length: ' . filesize($path));
				readfile($path);
				exit;
			}
			return false;
		}
		
		function uploadImage(){
			if(isset($_POST['mapName']) && isset($_POST['url'])){
				$mapName=$_POST['mapName'];
				$img=$_POST['url'];
				$dbConnection = new DBConnection("visores");
				$query="UPDATE \"Maps\" SET image='".$img."' , date_update=NOW() WHERE name='".$mapName."'";
				$result = pg_query($query) or die('Error: '.pg_last_error());
				$dbConnection->close();
				return $result;
			}
			else
				echo "Error: Parameters missed.";
		}
?>
