<?php
    require_once("../../Common/php/DBConnection.php");
    require_once("../../Common/php/TCConfig.php");
    require_once($loginTomcatJava);

    $directorioPlantillasGenericas = "C:\Users\JOSE\Desktop\plantilla_informes_eiel";
    $directorioPlantillasEntidad = "C:\Users\JOSE\Desktop\plantilla_informes_eiel";
	//$directorioPlantillasGenericas = "/usr/local/LocalGIS.MODELO/admcar/classes/plantillas/eiel";
	//$directorioPlantillasEntidad = "/usr/local/LocalGIS.MODELO/admcar/classes/plantillas/eiel";

    if (!isset($_POST["tag"])){
        return;
    }
    $_POST["layerName"] = "PL";
    $_POST["featureId"] = "77";
    $_POST["townId"] = "33001";
    $_POST["entityId"] = "77";

    switch ($_POST["tag"]){
        case "getEielTemplates":
            echo json_encode(getEielTemplates($_POST["layerName"],$_POST["entityId"],$_POST["townId"],""));
            break;
        case "getLayerCategory":
            echo getLayerCategory($_POST["layerName"]);
            break;
        case "generateEielReport":
            echo generateEielReport("","","","","");
            break;
    }

    function getLayerCategory($layerName){
        $dbCon = new DBConnection();
        $closeConnection = 0; //0 mantiene la conexión abierta, 1 la cierra.
        $reportManager = new java("com.avanzait.report.GetFeatureReportAvanzait");
        $reportManager->__client->cancelProxyCreationTag = 0;
        $category = $reportManager->getCategoryByProccesedLayerName($dbCon->host, $dbCon->port, $dbCon->database, $dbCon->user, $dbCon->pass, $layerName, $closeConnection);
        $dbCon->close();
        return $category;
    }

    function getEielTemplates($layerName, $featureId, $townId){
        global $directorioPlantillasGenericas;
        global $directorioPlantillasEntidad;
        $reportManager = new java("com.avanzait.report.GetFeatureReportAvanzait");
        $reportManager->__client->cancelProxyCreationTag = 0;
        $category = getLayerCategory($layerName);
        $plantillas = $reportManager->getPlantillasInformes($layerName, $category, $_POST["entityId"], $directorioPlantillasGenericas, $directorioPlantillasEntidad);
        return java_values($plantillas);
    }

    function generateEielReport($layerName, $template, $townId, $entityId, $featureIds){
        $idFeatures = "1347965, 1154591";
        $dbCon = new DBConnection();
        $reportManager = new java("com.avanzait.report.GetFeatureReportAvanzait");
        $reportManager->__client->cancelProxyCreationTag = 0;
        $resultReport = $reportManager->getReport($dbCon->host, $dbCon->port, $dbCon->database, $dbCon->user, $dbCon->pass, $_POST["layerName"], "C:\\Users\\JOSE\\Desktop\\plantilla_informes_eiel\\EIEL_alumbrado_ALUM.jrxml", $_POST["townId"], $_POST["entityId"], $idFeatures, "PDF", "es_ES", 0);
        return var_dump(java_values($resultReport));
    }