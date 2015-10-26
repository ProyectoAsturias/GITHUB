<?php
	require_once("../Common/php/DBConnection.php");
	require_once("apiGeoserverFunc.php");
	
	/**
	 * Devuelve una lista con los wms más comunmente utilizados.
	 * @return string
	 */
	function getWms() {
		$dbConnection = new DBConnection(true);
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

			$dbConnection = new DBConnection(true);
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
			$dbConnection = new DBConnection(true);
			$query="SELECT \"layersInfo\" FROM \"Maps\" WHERE name='".$mapName."'";
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$dbConnection->close();

			//Extraer solo los nombres de las capas (en orden)

			$attributes=[];
			while ($row = pg_fetch_row($result)){
				array_push($attributes,$row[0]);
			}
			return json_encode($attributes);
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

			$dbConnection = new DBConnection(null,"localgisvistas");
			$query="SELECT definition FROM pg_views WHERE viewname = '".$mapName.'_'.$layerName."'";
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$result = pg_fetch_result($result, 0,0);
			$from=explode("FROM",$result)[1];
			$query='DROP VIEW "'.$dbConnection->schema.'"."'.$mapName.'_'.$layerName.'"';
			pg_query($query) or die('Error: '.pg_last_error());	
			$query='CREATE VIEW "'.$dbConnection->schema.'"."'.$mapName.'_'.$layerName.'" AS '.$select_layer.' FROM '.$from;
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
	function updateMapInfo() {
		if (isset($_POST['mapName']) && isset($_POST['layersInfo'])) {
			$mapName = $_POST['mapName'];
			
			$dbConnection = new DBConnection(true);
			$query = "SELECT \"layersInfo\" FROM \"Maps\" WHERE \"name\"='".$mapName."'";
			$result = pg_query($query)or die('Error: '.pg_last_error());
			$layersInfoDB = pg_fetch_result($result, 0,0);

			//Si está vacio, el update
			$li=array();
			if($layersInfoDB!="" && $layersInfoDB!="[]"){
				$layers=$_POST['layersInfo'];
				$layerNames="";
				for($i=0;$i<sizeof($layers);$i++){
					$layer=$layers[$i];
					$layerName=$layer[0]["id"][0];
					$layerDB=layerInfoDB($layerName,$layersInfoDB);
					if($layerDB!=null)
						array_push($li,$layerDB);
					else
						array_push($li,$layer);	
				}
			}
			else
				$li=$_POST['layersInfo'];;
		
			$li=json_encode($li);	
			$acentos = array("á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú", "ñ", "Ñ");
                        $utf8 = array("\u00e1", "\u00e9", "\u00ed", "\u00f3", "\u00fa", "\u00c1", "\u00c9", "\u00cd", "\u00d3", "\u00da", "\u00f1", "\u00d1");
                        $li = str_replace($utf8, $acentos, $li);
			
			$query = "UPDATE \"Maps\" SET \"layersInfo\"='".$li."', date_update=NOW() WHERE \"name\"='".$mapName."'";
			$result = pg_query($query)or die('Error: '.pg_last_error());
			$dbConnection->close();

			return $result;
		} else
			return "Error: Layers information missed.";
	}

	/**
	 * Devuelve la informacion en base de datos de una capa
	 * @return layer
	 */
	function layerInfoDB($layerName,$layersInfoDB){
		 $layersInfoDB=json_decode($layersInfoDB);
                 $layerNames="";
                 for($i=0;$i<sizeof($layersInfoDB);$i++){
 	                $layerDB=$layersInfoDB[$i];
                        $layerNameDB=$layerDB[0]->id[0];
			if(strcmp($layerName,$layerNameDB)==0)
				return $layerDB;
                 }
                 return null;
	}

	function clearMapInfo(){
		if (isset($_POST['mapName'])){
			$mapName = $_POST['mapName'];

                        $dbConnection = new DBConnection(true);
			$query = "UPDATE \"Maps\" SET \"layersInfo\"='[]', date_update=NOW() WHERE \"name\"='".$mapName."'";
                        $result = pg_query($query)or die('Error: '.pg_last_error());
                        $dbConnection->close();
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
		$town=str_replace(array('"','[',']'),'',$town);
		$select_layer=str_replace("?T","'".$projection."'",$select_layer);
		$select_layer=str_replace("?M","".$town."",$select_layer);
		//echo $select_layer;
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
                                                    tables.name= '".$tC[0]."') as ".$tableColumns[0]."
                                                ON ".$tableColumns[0].".pattern=".$tC[0].".".$tC[1];
                                $select.=$tableColumns[0].".traduccion as ".$tC[1].",";
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
				$column=str_replace(" ","",trim($tableColumn[1]));
                $column=str_replace("\"","",$column);

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
                        $column="dictionary";
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
?>
