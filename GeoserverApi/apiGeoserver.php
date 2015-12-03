<?php
	require_once("apiGeoserverFunc.php");
	
	if(isset($_POST['mapName'])){
		session_start();
		$mapName=$_POST['mapName'];
		$gsConnection = new GSConnection($mapName);
		$geoserver = new ApiRest($gsConnection->url,$gsConnection->user,$gsConnection->pass);
		if(isset($_POST["tag"])){
	        switch ($_POST["tag"]) {
	        	case "createMap":
	                print(createMap());
	                break;
		    case "getDataSources":
			print(getDataSources());
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
	            case "uploadNewStyle":
					print(uploadNewStyle());
					break;
				case "removeStyle":
					print(removeStyle());
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
?>
