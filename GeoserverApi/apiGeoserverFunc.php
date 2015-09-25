<?php
	require_once("classes/ApiRest.php");
	require_once("classes/LocalgisLayer.php");
	require_once("classes/LocalgisFamily.php");
	require_once("classes/LocalgisMap.php");
	require_once("classes/validateSld.php");
	require_once("../Common/php/GSConnection.php");
	require_once("../Common/php/DBConnection.php");
	require_once("apiDatabaseFunc.php");

	/**
	 * Crea un mapa en Geoserver. Genera un WorkSpace y un Datastore en Geoserver.
	 */
	function createMap(){
		if(isset($_POST['projection']) && isset($_POST['town'])){
			$_SESSION["projection"]=$_POST['projection'];
			$_SESSION["town"]=$_POST['town'];
			#Creación del WS y el DS
			if(($result=$GLOBALS['geoserver']->createWorkspace($GLOBALS['gsConnection']->wsName))!="")
				print("Advice".$result."\n");
			else{
	            print("Workspace creado\n");
	            if(($result=$GLOBALS['geoserver']->initWsInfo($GLOBALS['gsConnection']->wsName))!="")
	            	print("Advice".$result."\n");
	            if(($result=$GLOBALS['geoserver']->initWmsInfo($GLOBALS['gsConnection']->wsName))!="")
	            	print("Advice".$result."\n");
	    	}
	    	//La conexión no se utiliza, solo se usan las variables
	    	$dbConnection = new DBConnection(null,"localgisVistas");
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
		if(isset($_POST['layerId']) && isset($_POST['layerName']) && isset($_POST['mapId'])){
			$layerId=$_POST['layerId'];
			$layerName=$_POST['layerName'];
			$mapId=$_POST['mapId'];
			$town=$_SESSION['town'];
			$projection=$_SESSION['projection'];
			$layerDescription="Capa de Localgis";
			echo implode(",",$town);
			echo "-";
			echo $projection."-";

			echo createDBView($layerId,$GLOBALS['mapName']."_".$layerName,$projection,$town);
			if(($result=$GLOBALS['geoserver']->addLayer($GLOBALS['gsConnection']->wsName, $GLOBALS['gsConnection']->dsName, $layerName, $layerDescription, $projection))!="")
				print("Advice: ".$result."\n");
			//else
				//addStyles($layerId,$layerName,$mapId);
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
		for($i=0;$i<sizeof($styles);$i++){
			$styleName=$styles[$i]->name;//."_".$i;
			print("Estilo: ".$styleName."\n");
			if(($res=$GLOBALS['geoserver']->createStyle($GLOBALS['gsConnection']->wsName, $styles[$i]->sld, $styleName))!="")
				$result=$result."Advice: ".$res."\n";
			//Toma por defecto el primero
			if($i==0)
				$result=$result.setDefaultStyle($layerName,$styles[0]->name);//."_0");
			if(($res=$GLOBALS['geoserver']->addStyleToLayer($layerName, $styleName, $GLOBALS['mapName']))!="")
				$result=$result."Advice: ".$res."\n";
		}
		print($GLOBALS['geoserver']->addStyleToLayer($layerName, "point", $GLOBALS['mapName']));
		$GLOBALS['geoserver']->addStyleToLayer($layerName, "line", $GLOBALS['mapName']);
		$GLOBALS['geoserver']->addStyleToLayer($layerName, "polygon", $GLOBALS['mapName']);
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
			print("Default style: ".$styleName."\n");
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
		$GLOBALS['geoserver']->reload();
	}
?>
