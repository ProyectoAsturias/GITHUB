<?php
	require_once("apiLocalgisFunc.php");

	if(isset($_POST["tag"])){
		session_start();
		$whereEntity="";
		if($_SESSION["entityId"]!=0)
			$whereEntity="AND id_entidad=".$_SESSION["entityId"];
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
            default:
            	echo "Error apiLocalgis: Function ".$_POST["tag"]." don't exists.";
        }
    }
    else
    	echo "Error: Function don't exists (tag).";
?>