<?php
    require_once("apiDatabaseFunc.php");

	if(isset($_POST["tag"])){
		session_start();
        switch ($_POST["tag"]) {
            case "getWms":
                echo getWms();
                break;
            case "updateWmsList":
                echo updateWmsList();
                break;
            case "getLayerAttributes":
                echo getLayerAttributes();
                break;
            case "editView":
                echo editView();
                break;
            case "updateMapDescription":
                echo updateMapDescription();
                break;
            case "updateMapInfo":
                echo updateMapInfo();
                break;
            default:
            	echo "Error apiDatabase: Function ".$_POST["tag"]." don't exists.";
        }
    }
    else
        echo "Error: Function don't exists (tag).";
?>