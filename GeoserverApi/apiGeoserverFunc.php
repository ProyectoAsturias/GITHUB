<?php
	require_once("classes/ApiRest.php");
	require_once("classes/LocalgisLayer.php");
	require_once("classes/LocalgisFamily.php");
	require_once("classes/LocalgisMap.php");
	require_once("classes/validateSld.php");
	require_once(dirname(__FILE__)."/../Common/php/GSConnection.php");
	require_once(dirname(__FILE__)."/../Common/php/DBConnection.php");
	require_once("apiDatabaseFunc.php");

	/**
	 * Crea un mapa en Geoserver. Genera un WorkSpace y un Datastore en Geoserver.
	 */
	function createMap(){	
		if(isset($_POST['town'])){
			#Creación del WS y el DS
			if(($result=$GLOBALS['geoserver']->createWorkspace($GLOBALS['gsConnection']->wsName))!="")
				print("Advice".$result."\n");
			else{
	        	    print("Workspace creado\n");
		            if(($result=$GLOBALS['geoserver']->initWsInfo($GLOBALS['gsConnection']->wsName))!="")
		            	print("Advice".$result."\n");
	        	    if(($result=$GLOBALS['geoserver']->initWmsInfo($GLOBALS['gsConnection']->wsName,$_POST['projection']))!="")
	            		print("Advice".$result."\n");
	    		}
	    		$dbConnection = new DBConnection(null,"localgisvistas");
				if(($result=$GLOBALS['geoserver']->createPostGISDatastore($GLOBALS['gsConnection']->wsName, $GLOBALS['gsConnection']->dsName, $dbConnection->schema, $dbConnection->database, $dbConnection->user, $dbConnection->pass, $dbConnection->host))!="")
				print("Advice".$result."\n");
			else
				print("Store creado\n");
			$dbConnection->close();
		}
		else
			echo "Error: entityId missed.";
	}
	
	/**
	 * Devuelve todos los datasources asociados a un workstore
	 */
	function getDataSources(){
		$datastoresString=$GLOBALS['geoserver']->listDatastores($GLOBALS['gsConnection']->wsName);
		$wmsstoresString=$GLOBALS['geoserver']->listWmsstoresUrls($GLOBALS['gsConnection']->wsName);
		return json_encode($datastoresString)."|".json_encode($wmsstoresString);
	}
	
	/**
	 * Elimina una mapa de Geoserver.
	 */
	function removeMap(){
		if(($result=$GLOBALS['geoserver']->delWorkspace($GLOBALS['gsConnection']->wsName))!="")
			print("Advice: ".$result."\n");
		else{
			delMapViews($GLOBALS['gsConnection']->wsName);
			return 0;
		}
	}
	
	/**
	 * Añade una capa al workspace
	 */	
	function addLayer(){
		//if(isset($_POST['layerId']) && isset($_POST['layerName']) && isset($_POST['mapId']) && isset($_POST['town'])){
		if(isset($_POST['layerId']) && isset($_POST['layerName']) && isset($_POST['mapId']) && isset($_POST['town']) && isset($_POST['projection'])){
			$layerId=$_POST['layerId'];
			$layerName=$_POST['layerName'];
			$mapId=$_POST['mapId'];
			$town=$_POST['town'];
			//$projection=$_SESSION['projection'];
			$projection=$_POST['projection'];
			$layerDescription="Capa de Localgis";

			/*echo $town;
			echo "-";
			echo $projection;*/
			//Las vistas creadas no pueden tener un nombre mayor de 62 caracteres (Restricción de postgres)
			$name=substr($GLOBALS['mapName']."_".$layerName,0,62);
			$layerName=substr($layerName,0,strlen($name)-strlen($GLOBALS['mapName']."_"));
			
			if(createDBView($layerId,$name,$projection,$town)>0){
				//echo $GLOBALS['gsConnection']->wsName."-".$GLOBALS['gsConnection']->dsName."-".$layerName."-".$layerDescription."-".$projection;
				if(($result=$GLOBALS['geoserver']->addLayer($GLOBALS['gsConnection']->wsName, $GLOBALS['gsConnection']->dsName, $layerName, $layerDescription, $projection))!="")
					print("Advice: ".$result."\n");
				else
					addStyles($layerId,$layerName,$mapId);
			}
			else
				print("Capa vacía");
		}
		else
			echo "Error: Parameters missed.";
	}

	/**
	 * Añade los estilos disponibles en Localgis a la capa
	 */
	function addStyles($layerId,$layerName,$mapId){
		require_once("apiLocalgisFunc.php");
		$styles = getStyles($layerId,$mapId);
		$result=0;
		$default=false;
		for($i=0;$i<sizeof($styles);$i++){
			$styleName=$styles[$i]->name;//."_".$i;
			//print("Estilo: ".$styleName."\n");
			if(($res=$GLOBALS['geoserver']->createStyle($GLOBALS['gsConnection']->wsName, $styles[$i]->sld, $styleName))!="")
				$result=$result."Advice: ".$res."\n";
			else{
				//Toma por defecto el primero
				if($default==false){
					$res=setDefaultStyle($layerName,$styles[0]->name);
					if($res=="")
						$default=true;
					$result=$result.$res;
				}
				if(($res=$GLOBALS['geoserver']->addStyleToLayer($layerName, $styleName, $GLOBALS['mapName']))!="")
					$result=$result."Advice: ".$res."\n";
			}
		}
		$GLOBALS['geoserver']->addStyleToLayer($layerName, "point", $GLOBALS['mapName']);
		$GLOBALS['geoserver']->addStyleToLayer($layerName, "line", $GLOBALS['mapName']);
		$GLOBALS['geoserver']->addStyleToLayer($layerName, "polygon", $GLOBALS['mapName']);
		$GLOBALS['geoserver']->addStyleToLayer($layerName, "generic", $GLOBALS['mapName']);	
		return $result;
	}

	/**
	 * Elimina una capa de un mapa de Geoserver.
	 * @return string
	 */
	function delLayer(){
		if(isset($_POST['layerName'])){	
			$layerName=$_POST['layerName'];

			if(($result=$GLOBALS['geoserver']->delLayer($GLOBALS['mapName'],$GLOBALS['mapName'],$layerName))!=""){
				print("Advice: ".$result."\n");
				return;
			}
			delView($layerName);
			return 0;
		}
		else
			echo "Error: Layer name missed.";
	}

    /**
	 * Activa el WMS de un Workspace de Geoserver.
	 * @return string
	 */
    function enableWms(){
		return $GLOBALS['geoserver']->enableWms($GLOBALS['mapName']);
    }

    /**
	 * Desactiva el WMS de un Workspace de Geoserver.
	 * @return string
	 */
    function disableWms(){
		return $GLOBALS['geoserver']->disableWms($GLOBALS['mapName']);
    }

	
	/**
	 * Añade un wmsstore dado un wms externo.
	 */	
	function addWms(){
		if(isset($_POST['wmsName']) && isset($_POST['wmsUrl']) && isset($_POST['listLayers']) ){
			$wmsName=$_POST['wmsName'];
			$wmsUrl=$_POST['wmsUrl'];
			$listLayers=$_POST['listLayers'];

			if($result=$GLOBALS['geoserver']->createWmsstore($GLOBALS['gsConnection']->wsName,$wmsName,$wmsUrl))
				print("Advice".$result."\n");
			else
				print("Wms Store creado\n");
			for($i=0;$i<sizeof($listLayers);$i++)
				addWmsLayer($wmsName,$listLayers[$i]);
		}
		else
			echo "Error: Parameters missed.";
	}

	/**
	 * Añade una capa wms al wmsstore.
	 * @param string $wmsName
	 * @param string $wmsLayerTitle
	 */	
	function addWmsLayer($wmsName,$wmsLayerTitle){
		$wmsLayerDescription="Capa wms externa";
		if(($result=$GLOBALS['geoserver']->addWmsLayer($GLOBALS['gsConnection']->wsName,$wmsName,$wmsLayerTitle,$wmsLayerDescription))!="")
			print("Advice: ".$result."\n");
	}



	/**
	 * Elimina una capa wms de un mapa de Geoserver.
	 */
	function delWmsLayer(){
		if(isset($_POST['layerName'])){
			$layerName=$_POST['layerName'];	

			$wmsName=$GLOBALS['geoserver']->getWmsstoreName($GLOBALS['gsConnection']->wsName,$layerName);

			if($result=$GLOBALS['geoserver']->delWmsLayer($GLOBALS['gsConnection']->wsName,$wmsName,$layerName))
				print("Advice".$result."\n");

			if($GLOBALS['geoserver']->countWmsLayers($GLOBALS['gsConnection']->wsName,$wmsName)==1)
				delWms($wmsName);
			return 0;
		}
		else
			echo "Error: Layer name missed.";

	}

	/**
	 * Elimina un wmsstore de Geoserver.
	 * @param string $wmsName
	 */
	function delWms($wmsName){
		if($result=$GLOBALS['geoserver']->delWmsstore($GLOBALS['gsConnection']->wsName,$wmsName)!="")
			print("Advice: ".$result."\n");
	}

	/**
	 * Actualiza la información de una capa de un wms de Geoserver.
	 */
	function updateLayerInfo(){
		if(isset($_POST['layerInfo']) && isset($_POST['layerName'])){
			$layerInfo=($_POST['layerInfo']);
			$layerName=$_POST['layerName'];

			if(($result=$GLOBALS['geoserver']->updateLayerInfo($GLOBALS['mapName'], $layerName, $layerInfo["description"], $layerInfo["keywords"], $layerInfo["title"],$layerInfo["isWmsLayer"]))!="")
				print("Advice".$result."\n");
			else
				print("Capa actualizada\n");	
		}
		else
			echo "Error: Parameters missed.";
	}

	/**
	 * Actualiza la información de un wms de Geoserver.
	 */
	function updateWmsInfo(){
		if(isset($_POST['wmsInfo'])){
			$wmsInfo=($_POST['wmsInfo']);

			if(($result=$GLOBALS['geoserver']->updateWmsInfo($GLOBALS['mapName'], $wmsInfo["description"], $wmsInfo["keywords"], $wmsInfo["title"]))!="")
				print("Advice".$result."\n");		
			if(($result=$GLOBALS['geoserver']->updateWsInfo($GLOBALS['mapName'],$wmsInfo["contactPerson"],$wmsInfo["contactOrganization"],$wmsInfo["contactPosition"],$wmsInfo["address"],$wmsInfo["addressType"],$wmsInfo["city"],$wmsInfo["stateOrProvince"],$wmsInfo["country"],$wmsInfo["postCode"],$wmsInfo["contactPhone"],$wmsInfo["fax"],$wmsInfo["email"]))!="")
				print("Advice".$result."\n");
		}
		else
			echo "Error: Wms infos missed.";
	}

	/**
	 * Establece el estilo por defecto para una capa.
	 */
	function setDefaultStyle($layerName=null,$styleName=null){
		if(isset($_POST['layerName']) && isset($_POST['styleName'])){
			$layerName=$_POST["layerName"];
			$styleName=$_POST["styleName"];
		}
		if($layerName!=null && $styleName !=null){
			if($res=$GLOBALS['geoserver']->defaultStyleToLayer($layerName, $styleName, $GLOBALS['mapName'])!="")
				print("Advice: ".$res."\n");
			//Check getMap, por si el estilo falla
			$urlWms = $GLOBALS['gsConnection']->url.'/'.$GLOBALS['mapName'].'/wms';
			$curl = 'curl "'.$urlWms.'?service=WMS&version=1.1.0&request=GetMap&layers='.$GLOBALS['mapName'].':'.$layerName.'&styles=&bbox=674750.9375,4774188.5,700558.875,4805054.0&width=642&height=768&srs=EPSG:25829&format=application/openlayers" -H "Authorization : Basic cHJpdmF0ZVVzZXI6MTIzNA==" | grep "Exception" |wc -l';
			$result=shell_exec($curl);
			$curl = 'curl "'.$urlWms.'?service=WMS&version=1.1.0&request=GetMap&layers='.$GLOBALS['mapName'].':'.$layerName.'&styles=&bbox=674750.9375,4774188.5,700558.875,4805054.0&width=642&height=768&srs=EPSG:25829&format=application/openlayers" -H "Authorization : Basic cHJpdmF0ZVVzZXI6MTIzNA=="';

			$error=shell_exec($curl);
			if ($result!=0){
				echo "Error: Estilo incorrecto, estilo actual establecido: Generic";
				echo "<br>Definición del error:".$error;
				if($res=$GLOBALS['geoserver']->defaultStyleToLayer($layerName, "generic", $GLOBALS['mapName'])!="")
	                                print("Advice: ".$res."\n");
			}
		}
		else
			echo "Error: Parameters missed.";
	}

	/*
	 * Añade un estilo a geoserver, y lo asigna a su capa.
	 */
	function uploadNewStyle() {
		if (isset($_FILES['inputSld']) && isset($_POST['layerName'])) {
			$sldFile = $_FILES['inputSld'];
			$styleName = $sldFile['name'];
			$styleName = explode(".", $styleName)[0];
			$layerName = $_POST['layerName'];
			$tempFile = file_get_contents($sldFile["tmp_name"]);
			$validate = new XmlParser();
			$valid = $validate->isXMLContentValid($tempFile);
			//print json_encode($content."hola");
		}
		else
			echo "Error: Parameters missed.";
		if ($valid) {
			if ($res = $GLOBALS['geoserver']->createStyle($GLOBALS['mapName'], $tempFile, $styleName) != "")
				print json_encode("Advice: ".$res."\n");
			//print json_encode("New style: ".$styleName."\n");
			if (($res = $GLOBALS['geoserver']->addStyleToLayer($layerName, $styleName, $GLOBALS['mapName'])) != "")
				$result = "Advice: ".$res."\n";
			//echo json_encode($result);
		} else
			echo "Error, sld mal formado.";
	}

	function reloadCache(){
		$gsConnection = new GSConnection();
		$geoserver = new ApiRest($gsConnection->url,$gsConnection->user,$gsConnection->pass);

		$geoserver->reload();
	}
	
	function removeStyle(){
		if (isset($_POST['styleName']) && isset($_POST['layerName'])) {
			$styleName=$_POST['styleName'];
			$layerName=$_POST['layerName'];
			$stylesXml="<layer><styles>";
			if (($styleList = $GLOBALS['geoserver']->listStyles($GLOBALS['mapName'], $layerName)) != ""){
				if($styleList->styles!=null){
					$styleList=$styleList->styles->style;
					foreach($styleList as $style){
						if ($style->name=="point" || $style->name=="line" || $style->name=="polygon")
							$stylesXml .="<style><name>".$style->name."</name></style>";
						else
							if($style->name!=$styleName)
								$stylesXml .="<style><name>".$style->name."</name><workspace>".$GLOBALS['mapName']."</workspace></style>";
					}
					$stylesXml.="</styles></layer>";
					if (($res = $GLOBALS['geoserver']->unasignStyle($stylesXml, $layerName , $GLOBALS['mapName'])) != "")
						print ("Advice: ".$res."\n");
					if (($res = $GLOBALS['geoserver']->delStyle($styleName, $GLOBALS['mapName'])) != "")
						print ("Advice: ".$res."\n");
				}
			}
		}
		else
			echo "Error: Parameters missed.";
	}
?>
