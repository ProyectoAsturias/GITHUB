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
        case "clearMapInfo":
            echo clearMapInfo();
            break;
        case "getAttachDocuments":
            if(isset($_POST['nameLayer']) && isset($_POST['idFeature']) && isset($_POST['private'])){
                $nameLayer=$_POST['nameLayer'];
                $idFeature=$_POST['idFeature'];
                $private=$_POST['private'];
                echo getAttachDocuments($nameLayer,$idFeature,$private);
            }
            else
                echo "Error getAttach Documents. Params missed";
            break;
        case "getDocument":
            if(isset($_POST['idDocument'])){
                $idDocument=$_POST['idDocument'];
                $returnValue = getDocument($idDocument);
                if (!$returnValue)
                    echo $returnValue;
            }
            else
                echo "Error getDocument. Params missed";
            break;

        default:
            echo "Error apiDatabase: Function ".$_POST["tag"]." don't exists.";
    }
}
else
    echo "Error: Function don't exists (tag).";
?>
