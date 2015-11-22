<?php
	require_once("apiLocalgisFunc.php");

if(isset($_POST["tag"])){
    $whereEntity="";
    if(isset($_POST['entityId'])){
        $whereEntity="AND id_entidad=".$_POST['entityId'];
    }

        switch ($_POST["tag"]) {
            case "getMaps":
                echo getMaps();
                break;
            case "getFamilies":
                echo getFamilies();
                break;
            case "getLayers":
                echo getLayers();
                break;
            case "getMapLayers":
                echo getMapLayers();
                break;
            case "getWmsLayers":
            	echo getWmsLayers();
            	break;
            case "synchrony":
            	echo checkLayerSynchrony();
            	break;
            case "getEntityData":
                echo getEntityData();
                break;
            case "getEntityNames":
                echo getEntityNames();
                break;
            case "getBbox":
                echo getBbox();
                break;
	    case "getOriginalLayerName":
		echo getOriginalLayerName();
		break;	
            default:
            	echo "Error apiLocalgis: Function ".$_POST["tag"]." don't exists.";
        }
    }
    else
    	echo "Error: Function don't exists (tag).";
?>
