<?php
    require_once("../../Common/php/DBUserContentConnect.php");
    require_once("../../GeoserverApi/classes/ApiRest.php");
    require_once("../../GeoserverApi/classes/Connection.php");

    if(isset($_POST["tag"])){
        session_start();
        switch ($_POST["tag"]) {
            case "userMaps":
                echo json_encode(downloadUserMaps($_SESSION["username"]));
                break;
            case "userVisors":
                echo json_encode(downloadUserVisors($_SESSION["username"]));
                break;
            case "saveMap":
                echo json_encode(saveMap($_POST["mapName"],$_POST["mapDescription"],$_POST["mapOwner"]));
                break;
            case "saveVisor":
                echo json_encode(saveVisor($_POST["visorName"],$_POST["visorDescription"],$_POST["visorOwner"]));
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
        }
    }

    function downloadUserMaps($username){
        $connection = new DBUserContentConnect();
        $query = "SELECT id, name, description, date_creation, date_update, published, image  FROM public.\"Maps\" WHERE owner='".$username."';";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return pg_fetch_all($result);
    }

    function downloadUserVisors($username){
        $connection = new DBUserContentConnect();
        $query = "SELECT id, name, description, date_creation, date_update FROM public.\"Visors\" WHERE owner='".$username."';";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return pg_fetch_all($result);
    }

    function saveMap($mapName, $mapDescription, $username){
        $connection = new DBUserContentConnect();
        $query = "INSERT INTO public.\"Maps\" (name, description, owner) VALUES ('".$mapName."','".$mapDescription."','".$username."');";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    function saveVisor($visorName, $visorDescription, $username){
        $connection = new DBUserContentConnect();
        $query = "INSERT INTO public.\"Visors\" (name, description, owner) VALUES ('".$visorName."','".$visorDescription."','".$username."');";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    function deleteMap($mapName){
        $connection = new DBUserContentConnect();
        $query = "DELETE FROM public.\"Maps\" WHERE name='".$mapName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    function deleteVisor($visorName){
        $connection = new DBUserContentConnect();
        $query = "DELETE FROM public.\"Visors\" WHERE name='".$visorName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    function cloneMap($mapName){
        /*$connection = new DBUserContentConnect();
        $query = "DELETE FROM public.\"Maps\" WHERE name='".$mapName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;*/
    }

    function publicateMap($mapName){
        $connection = new DBUserContentConnect();
        $query = "UPDATE \"Maps\" SET date_update=now(), published='true' WHERE name='".$mapName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    function unpublicateMap($mapName){
        $connection = new DBUserContentConnect();
        $query = "UPDATE \"Maps\" SET date_update=now(), published='false' WHERE name='".$mapName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }
?>