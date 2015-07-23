<?php
	require_once("classes/ApiRest.php");
	require_once("classes/LocalgisLayer.php");
	require_once("classes/LocalgisFamily.php");
	require_once("classes/LocalgisMap.php");
	require_once("../Common/php/GSConnection.php");

	if(isset($_POST['mapName'])){
		$mapName=$_POST['mapName'];
		$gsConnection = new GSConnection($mapName);
		$geoserver = new ApiRest($gsConnection->url,$gsConnection->user,$gsConnection->pass);
		if(isset($_POST["tag"])){
	        switch ($_POST["tag"]) {
	        	case "createMap":
	                echo createMap();
	                break;
	            case "removeMap":
	                echo removeMap();
	                break;
	            case "addLayer":
	                echo addLayer();
	                break;
	            case "delLayer":
	                echo delLayer();
	                break;
	            case "addWms":
	                echo addWms();
	                break;
	            case "delWmsLayer":
	                echo delWmsLayer();
	                break;
	            case "enableWms":
	                echo enableWms();
	                break;
	            case "disableWms":
	                echo disableWms();
	                break;
	            case "updateWmsInfo":
	                echo updateWmsInfo();
	                break;
	            case "updateLayerInfo":
	                echo updateLayerInfo();
	                break;
	            case "setDefaultStyle":
	                echo setDefaultStyle();
	                break;
	            default:
            		echo "Error: Function ".$_POST["tag"]."don't exists.";
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
		else
			print("Workspace creado\n");

		if(($result=$GLOBALS['geoserver']->createPostGISDatastore($GLOBALS['gsConnection']->wsName, $GLOBALS['gsConnection']->dsName, 'visores', 'Localgis', $GLOBALS['gsConnection']->user, $GLOBALS['gsConnection']->pass, $GLOBALS['gsConnection']->host))!="")
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
			print(0);
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

			createDBView($layerId,$projection,$town);
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
		for($i=0;$i<sizeof($styles);$i++){
			if(($res=$GLOBALS['geoserver']->createStyle($GLOBALS['gsConnection']->wsName, $styles[$i]->sld, $styles[$i]->name."_".$i))!="")
				print("Advice: ".$res."\n");
			//if(($res=$GLOBALS['geoserver']->addStyleToLayer($layerName, $styleName."_".$i, $GLOBALS['gsConnection']->wsName))!="")
				//print("Advice: ".$res."\n");
			//print("Estilo añadido");
		}
		//Toma por defecto el primero
		setDefaultStyle($layerName,$styles->name."_1");
		print(0);
	}

	/**
	 * Elimina una capa de un mapa de Geoserver.
	 * @return string
	 */
	function delLayer($mapName,$layerName){
		if(isset($_POST['layerName'])){	
			$layerName=$_POST['layerName'];

			if(($result=$GLOBALS['geoserver']->delLayer($mapName,$mapName,$layerName))!=""){
				print("Advice: ".$result."\n");
				return;
			}
			delView($layerName);
			print(0);
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

			if($result=$GLOBALS['geoserver']->createWmsstore($GLOBALS['connection']->wsName,$wmsName,$wmsUrl))
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
		if(($result=$GLOBALS['geoserver']->addWmsLayer($GLOBALS['connection']->wsName,$wmsName,$wmsLayerTitle,$wmsLayerDescription))!="")
			print("Advice: ".$result."\n");
	}



	/**
	 * Elimina una capa wms de un mapa de Geoserver.
	 */
	function delWmsLayer($mapName,$layerName){
		if(isset($_POST['layerName'])){
			$layerName=$_POST['layerName'];	

			$wmsName=$GLOBALS['geoserver']->getWmsstoreName($connection->wsName,$layerName);

			if($result=$GLOBALS['geoserver']->delWmsLayer($connection->wsName,$wmsName,$layerName))
				print("Advice".$result."\n");

			if($GLOBALS['geoserver']->countWmsLayers($GLOBALS['connection']->wsName,$wmsName)==1)
				delWms($wmsName);
		}
		else
			echo "Error: Layer name missed.";

	}

	/**
	 * Elimina un wmsstore de Geoserver.
	 * @param string $wmsName
	 */
	function delWms($wmsName){
		if($result=$GLOBALS['geoserver']->delWmsstore($GLOBALS['connection']->wsName,$wmsName)!="")
			print("Advice: ".$result."\n");
	}

	/**
	 * Actualiza la información de una capa de un wms de Geoserver.
	 */
	function updateLayerInfo(){
		if(isset($_POST['layerInfo']) && isset($_POST['layerName'])){
			$layerInfo=($_POST['layerInfo']);
			$layerName=$_POST['layerName'];

			if(($result=$GLOBALS['geoserver']->updateLayerInfo($mapName, $layerName, $layerInfo["description"], $layerInfo["keywords"], $layerInfo["title"],$layerInfo["isWmsLayer"]))!="")
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

			$GLOBALS['geoserver']->updateWmsInfo($mapName, $wmsInfo["description"], $wmsInfo["keywords"], $wmsInfo["title"]);			
			$GLOBALS['geoserver']->updateWsInfo($mapName,$wmsInfo["contactPerson"],$wmsInfo["contactOrganization"],$wmsInfo["contactPosition"],$wmsInfo["address"],$wmsInfo["addressType"],$wmsInfo["city"],$wmsInfo["stateOrProvince"],$wmsInfo["country"],$wmsInfo["postCode"],$wmsInfo["contactPhone"],$wmsInfo["fax"],$wmsInfo["email"]);
		}
	}

	/**
	 * Establece el estilo por defecto para una capa.
	 */
	function setDefaultStyle($layerName,$styleName){
		if(($res=$GLOBALS['geoserver']->defaultStyleToLayer($layerName, $styleName, $GLOBALS['gsConnection']->wsName))!="")
			print("Advice: ".$res."\n");
	}
?>