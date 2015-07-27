<?php
	require_once("classes/ApiRest.php");
	require_once("classes/LocalgisLayer.php");
	require_once("classes/LocalgisFamily.php");
	require_once("classes/LocalgisMap.php");
	require_once("../Common/php/GSConnection.php");
	require_once("../Common/php/DBConnection.php");
	require_once("apiAux.php");

	if(isset($_POST['mapName'])){
		$mapName=$_POST['mapName'];
		$gsConnection = new GSConnection($mapName);
		$geoserver = new ApiRest($gsConnection->url,$gsConnection->user,$gsConnection->pass);
		if(isset($_POST["tag"])){
	        switch ($_POST["tag"]) {
	        	case "createMap":
	                print(createMap());
	                break;
	            case "removeMap":
	                print(removeMap());
	                break;
	            case "addLayer":
	                print(addLayer());
	                break;
	            case "delLayer":
	                print(delLayer());
	                break;
	            case "addWms":
	                print(addWms());
	                break;
	            case "delWmsLayer":
	                print(delWmsLayer());
	                break;
	            case "enableWms":
	                print(enableWms());
	                break;
	            case "disableWms":
	                print(disableWms());
	                break;
	            case "updateWmsInfo":
	                print(updateWmsInfo());
	                break;
	            case "updateLayerInfo":
	                print(updateLayerInfo());
	                break;
	            case "setDefaultStyle":
	                print(setDefaultStyle());
	                break;
	            default:
            		echo "Error: Function apiGeoserver".$_POST["tag"]." don't exists.";
	        }
	    }
	    else
	    	echo "Error: Function don't exists (tag).";
	}
	else
		echo "Error: Map name missed.";

	/**
	 * Crea un mapa en Geoserver. Genera un WorkSpace y un Datastore en Geoserver.
	 */
	function createMap(){
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
    	$dbConnection = new DBConnection("Localgis","visores");
		if(($result=$GLOBALS['geoserver']->createPostGISDatastore($GLOBALS['gsConnection']->wsName, $GLOBALS['gsConnection']->dsName, $dbConnection->schema, $dbConnection->database, $dbConnection->user, $dbConnection->pass, $dbConnection->host))!="")
			print("Advice".$result."\n");
		else
			print("Store creado\n");
	}

	/**
	 * Elimina una mapa de Geoserver.
	 */
	function removeMap(){
		if(($result=$GLOBALS['geoserver']->delWorkspace($GLOBALS['gsConnection']->wsName))!="")
			print("Advice: ".$result."\n");
		else
			return 0;
	}
	
	/**
	 * Añade una capa al workspace
	 */	
	function addLayer(){
		if(isset($_POST['layerId']) && isset($_POST['layerName']) && isset($_POST['mapId']) && isset($_POST['town']) && isset($_POST['projection'])){
			$layerId=$_POST['layerId'];
			$layerName=$_POST['layerName'];
			$mapId=$_POST['mapId'];
			$town=$_POST['town'];
			$projection=$_POST['projection'];
			$layerDescription="Capa de Localgis";

			createDBView($layerId,$GLOBALS['mapName']."_".$layerName,$projection,$town);
			if(($result=$GLOBALS['geoserver']->addLayer($GLOBALS['gsConnection']->wsName, $GLOBALS['gsConnection']->dsName, $layerName, $layerDescription, $projection))!="")
				print("Advice: ".$result."\n");
			else
				addStyles($layerId,$layerName,$mapId);
		}
		else
			echo "Error: Parameters missed.";
	}

	/**
	 * Añade un estilo a una capa
	 */
	function addStyles($layerId,$layerName,$mapId){
		$styles = getStyles($layerId,$mapId);
		$result=0;
		for($i=0;$i<sizeof($styles);$i++){
			$styleName=$styles[$i]->name."_".$i;
			print("Estilo: ".$styleName."\n");
			if(($res=$GLOBALS['geoserver']->createStyle($GLOBALS['gsConnection']->wsName, $styles[$i]->sld, $styleName))!="")
				$result="Advice: ".$res."\n";
			//Toma por defecto el primero
			if($i==0)
				$result=setDefaultStyle($layerName,$styles[0]->name."_0");
			if(($res=$GLOBALS['geoserver']->addStyleToLayer($layerName, $styleName, $GLOBALS['mapName']))!="")
				$result="Advice: ".$res."\n";
		}
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
	function setDefaultStyle($layerName,$styleName){
		if($layerName==null && $styleName==null){
			$layerName=$_POST["layerName"];
			$styleName=$_POST["styleName"];
		}
		if($res=$GLOBALS['geoserver']->defaultStyleToLayer($layerName, $styleName, $GLOBALS['mapName'])!="")
			print("Advice: ".$res."\n");
		print("Default style: ".$styleName."\n");
	}
?>