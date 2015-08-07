<?php
    require_once("../../Common/php/DBConnection.php");
    require_once("../../GeoserverApi/classes/ApiRest.php");

    if(isset($_POST["tag"])){
        session_start();
        $dbConnection = new DBConnection("UserContent");
        switch ($_POST["tag"]) {
            case "userMaps":
                echo json_encode(downloadUserMaps($_SESSION["userName"]));
                break;
            case "userVisors":
                echo json_encode(downloadUserVisors($_SESSION["userName"]));
                break;
            case "saveMap":
                echo json_encode(saveMap($_POST["mapName"],$_POST["mapDescription"],$_POST["mapOwner"]));
                break;
            case "saveVisor":
                echo json_encode(saveVisor($_POST["visorName"],$_POST["visorDescription"],$_POST["visorOwner"]));
                break;
            case "saveVisorContent":
                echo json_encode(saveVisorContent($_POST["visorName"],$_POST["visorContent"]));
                break;
            case "loadVisorContent":
                echo json_encode(loadVisorContent($_POST["visorName"],$_POST["visorContent"]));
                break;
            case "deleteMap":
                echo json_encode(deleteMap($_POST["mapName"]));
                break;
            case "deleteVisor":
                echo json_encode(deleteVisor($_POST["visorName"]));
                break;
            case "cloneMap":
                echo json_encode(cloneMap($_POST["mapName"]));
                break;
            case "publicateMap":
                echo json_encode(publicateMap($_POST["mapName"]));
                break;
            case "unpublicateMap":
                echo json_encode(unpublicateMap($_POST["mapName"]));
                break;
            case "updateDescription":
                echo updateDescription($_POST["mapName"],$_POST["mapDescription"]);
                break;
            efault:
                echo "Error userContent: Function ".$_POST["tag"]." don't exists.";
        }
        $dbConnection->close();
    }

    function downloadUserMaps($userName){
        $query = "SELECT id, name, description, date_creation, date_update, published, image  FROM public.\"Maps\" WHERE owner='".$userName."';";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return pg_fetch_all($result);
    }

    function downloadUserVisors($userName){
        $query = "SELECT id, name, description, date_creation, date_update FROM public.\"Visors\" WHERE owner='".$userName."';";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return pg_fetch_all($result);
    }

    function saveMap($mapName, $mapDescription, $userName){
        $query = "INSERT INTO public.\"Maps\" (name, description, owner) VALUES ('".$mapName."','".$mapDescription."','".$userName."');";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    function saveVisor($visorName, $visorDescription, $userName){
        $query = "INSERT INTO public.\"Visors\" (name, description, owner) VALUES ('".$visorName."','".$visorDescription."','".$userName."');";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    function saveVisorContent($visorName, $visorContent){
        $query = "UPDATE public.\"Visors\" SET content = '".$visorContent."' WHERE name = '".$visorName."';";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    function loadVisorContent($visorName){
        $dbConnection = new DBConnection("UserContent");
        $query = "SELECT content FROM public.\"Visors\" WHERE name='".$visorName."';";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return pg_fetch_all($result);
    }

    function deleteMap($mapName){
        $query = "DELETE FROM public.\"Maps\" WHERE name='".$mapName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    function deleteVisor($visorName){
        $connection = new DBConnection("UserContent");
        $query = "DELETE FROM public.\"Visors\" WHERE name='".$visorName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    function cloneMap($mapName){
        /*$query = "DELETE FROM public.\"Maps\" WHERE name='".$mapName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;*/
    }

    function publicateMap($mapName){
        $query = "UPDATE \"Maps\" SET date_update=now(), published='true' WHERE name='".$mapName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    function unpublicateMap($mapName){
        $query = "UPDATE \"Maps\" SET date_update=now(), published='false' WHERE name='".$mapName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    /**
     *Actualización de la descripción del mapa
     */
    function updateDescription($mapName, $mapDescription){
        $query = "UPDATE \"Maps\" SET date_update=now(), description='".$mapDescription."' WHERE name='".$mapName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return json_encode($result);
    }
?>