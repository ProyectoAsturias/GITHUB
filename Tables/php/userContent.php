<?php
    require_once("../../Common/php/DBConnection.php");
    require_once("../../GeoserverApi/classes/ApiRest.php");
    require_once("../../Common/php/TCConfig.php");

    if(isset($_POST["tag"]) || isset($_GET["tag"])){
        if(isset($_POST["tag"])){
            $tag = $_POST["tag"];
        }else{
            $tag = $_GET["tag"];
        }
        session_start();
        $dbConnection = new DBConnection(true);
        switch ($tag) {
            case "userMaps":
                echo json_encode(downloadUserMaps($_SESSION["userName"]));
                break;
            case "userVisors":
                echo json_encode(downloadUserVisors($_SESSION["userName"]));
                break;
	    case "entityMaps":
               echo json_encode(downloadEntityMaps($_POST["userEntityId"]));
               break;
            case "entityVisors":
                echo json_encode(downloadEntityVisors($_POST["userEntityId"]));
                break;
            case "saveMap":
                echo json_encode(saveMap($_POST["mapName"],$_POST["mapDescription"],$_POST["mapOwner"],$_POST["entityId"],$_POST["town"],$_POST["projection"]));
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
            case "updateDescriptionMap":
                echo json_encode(updateDescriptionMap($_POST["mapName"],$_POST["mapDescription"]));
                break;
	        case "updateDescriptionView":
                echo json_encode(updateDescriptionView($_POST["viewName"],$_POST["viewDescription"]));
                break;
            case "saveMapBaselayer":
                echo json_encode(saveMapBaselayer($_POST["mapName"], $_POST["baselayerName"]));
                break;
            case "loadMapBaselayer":
                echo json_encode(loadMapBaselayer($_POST["mapName"]));
                break;
            case "userMapNames":
                echo json_encode(downloadUserMapNames($_SESSION["userName"]));
                break;
    	    case "getMapVars":
        		echo json_encode(getMapVars($_POST["mapName"]));
        		break;
    	    case "getVersionInfo":
        		echo json_encode(getVersionInfo());
        		break;
    	    case "userActiveMaps":
                echo json_encode(downloadUserActiveMaps($_SESSION["userName"]));
               	break;
	        case "getMiniImages":
                echo json_encode(getMiniImages($_POST["userEntityId"]));
                break;
            case "getMapProjection":
                if(isset($_GET['callback'])){ // Si es una petición cross-domain
                    echo $_GET['callback'].'('.json_encode(geMapProjection($_GET["nameLayer"])).')';
                    break;
                }
                echo json_encode(geMapProjection($_GET["nameLayer"]));
                break;
            default:
                echo "Error userContent: Function ".$tag." don't exists.";
        }
        $dbConnection->close();
    }

    function downloadUserMaps($userName){
        $query = "SELECT id, name, description, date_creation, \"layersInfo\", date_update, published, image, \"entityId\"  FROM public.\"Maps\" WHERE owner='".$userName."';";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return pg_fetch_all($result);
    }

    function downloadUserVisors($userName){
        $query = "SELECT id, name, description, date_creation, date_update FROM public.\"Visors\" WHERE owner='".$userName."';";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return pg_fetch_all($result);
    }

    function downloadEntityMaps($entityId){
	$query="";
	if($entityId!=0)
	    $query = "SELECT id, name, description, date_creation, date_update, published, \"entityId\"  FROM public.\"Maps\" WHERE \"entityId\"='".$entityId."';";
	else
            $query = "SELECT id, name, description, date_creation, date_update, published, \"entityId\"  FROM public.\"Maps\" ;";	
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return pg_fetch_all($result);
    }

    function downloadEntityVisors($entityId){
        /*$query = "SELECT id, name, description, date_creation, date_update FROM public.\"Visors\" WHERE \"entityId\"='".$entityId."';";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return pg_fetch_all($result);*/
    }
    function saveMap($mapName, $mapDescription, $userName, $entityId, $town, $projection){
        $query = "INSERT INTO public.\"Maps\" (name, description, owner, \"entityId\", town, projection) VALUES ('".$mapName."','".$mapDescription."','".$userName."','".$entityId."','".json_encode($town)."','".$projection."');";
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
        $dbConnection = new DBConnection(true);
        $query = "SELECT content FROM public.\"Visors\" WHERE name='".$visorName."';";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        $content=pg_fetch_all($result);
    	$dbConnection->close();
    	return $content;
    }

    function deleteMap($mapName){
        $query = "DELETE FROM public.\"Maps\" WHERE name='".$mapName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    function deleteVisor($visorName){
        $dbConnection = new DBConnection(true);
        $query = "DELETE FROM public.\"Visors\" WHERE name='".$visorName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
	$dbConnection->close();
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
    function updateDescriptionMap($mapName, $mapDescription){
        $query = "UPDATE \"Maps\" SET date_update=now(), description='".$mapDescription."' WHERE name='".$mapName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

	/**
     *Actualización de la descripción de la vista
     */
    function updateDescriptionView($viewName, $viewDescription){
        $query = "UPDATE \"Visors\" SET date_update=now(), description='".$viewDescription."' WHERE name='".$viewName."'";
	$result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;	
    }

    function downloadUserMapNames($userName){
        $query = "SELECT name FROM public.\"Maps\" WHERE owner='".$userName."';";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return pg_fetch_all($result);
    }

    function saveMapBaselayer($mapName, $baselayerName){
        $query = "UPDATE public.\"Maps\" SET baselayer = '".$baselayerName."' WHERE name = '".$mapName."';";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return $result;
    }

    function loadMapBaseLayer($mapName){
        $dbConnection = new DBConnection(true);
        $query = "SELECT baselayer FROM public.\"Maps\" WHERE name='".$mapName."';";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        $baseLayer=pg_fetch_all($result);
		$dbConnection->close();
		return $baseLayer;
    }
	
	function getMapVars($mapName){
		$query = "SELECT town,projection FROM public.\"Maps\" WHERE name='".$mapName."';";
        	$result = pg_query($query) or die('Error: '.pg_last_error());
		$vars = pg_fetch_row($result); 
		return $vars;
	}
	
	function getVersionInfo(){
		$query = "SELECT * FROM public.\"Versions\" ORDER BY release_date DESC LIMIT 1";
        $result = pg_query($query) or die('Error: '.pg_last_error());
		$info=pg_fetch_row($result);
		return $info;
	}
	
	function downloadUserActiveMaps($userName){
		$query = "SELECT id, name, description, date_creation, \"layersInfo\", date_update, published, image, \"entityId\"  FROM public.\"Maps\" WHERE published=true";//AND owner='".$userName."'
		$result = pg_query($query) or die('Error: '.pg_last_error());
		return pg_fetch_all($result);
	}

	function getMiniImages($entityId){
    	$query="";
        if($entityId!=0)
    	    $query = "SELECT id, image  FROM public.\"Maps\" WHERE \"entityId\"='".$entityId."'";
        else
    	    $query = "SELECT id, image  FROM public.\"Maps\" ;";   
        $result = pg_query($query) or die('Error: '.pg_last_error());
    	return pg_fetch_all($result);
	}

    function geMapProjection($mapName){
        $query="";
        $query = "SELECT projection  FROM public.\"Maps\" WHERE \"name\"='".$mapName."'";
        $result = pg_query($query) or die('Error: '.pg_last_error());
        return pg_fetch_all($result);
    }

?>
