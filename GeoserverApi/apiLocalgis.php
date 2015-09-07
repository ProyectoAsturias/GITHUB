<?php
	require_once("apiLocalgisFunc.php");

	if(isset($_POST["tag"])){
		session_start();
		$whereEntity="";
        if(isset($_SESSION["entityId"]))
            $whereEntity="AND id_entidad=".$_SESSION["entityId"];
        else if(isset($_POST['entityId'])){
            $whereEntity="AND id_entidad=".$_POST['entityId'];
            $_SESSION["entityId"]=$_POST['entityId'];
        }
        else {
			$whereEntity="AND id_entidad=".$_SESSION["userEntityId"];
            $_SESSION["entityId"]=null;
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
            default:
            	echo "Error apiLocalgis: Function ".$_POST["tag"]." don't exists.";
        }
    }
    else
    	echo "Error: Function don't exists (tag).";
?>