<?php
	require_once("apiLocalgisFunc.php");

	if(isset($_POST["tag"])){
		session_start();
		$whereEntity="";
		if($_SESSION["entityid"]!=0)
			$whereEntity="AND m.id_entidad=".$_SESSION["entityid"];
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
            default:
            	echo "Error apiLocalgis: Function ".$_POST["tag"]." don't exists.";
        }
    }
    else
    	echo "Error: Function don't exists (tag).";
?>