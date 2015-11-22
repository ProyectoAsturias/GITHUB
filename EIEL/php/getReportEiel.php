<?php
    require_once("../../Common/php/DBConnection.php");
    require_once("../../Common/php/TCConfig.php");
    require_once($loginTomcatJava);

    //$directorioPlantillasGenericas = "C:\Users\JOSE\Desktop\plantilla_informes_eiel";
    //$directorioPlantillasEntidad = "C:\Users\JOSE\Desktop\plantilla_informes_eiel";
	$directorioPlantillasGenericas = "/usr/local/LocalGIS.MODELO/admcar/classes/plantillas/eiel";
	$directorioPlantillasEntidad = "/usr/local/LocalGIS.MODELO/admcar/classes/plantillas/eiel";

    if (!isset($_POST["tag"])){
        return;
    }
    $_POST["layerName"] = "PL";
    $_POST["featureId"] = "77";
    $_POST["townId"] = "33001";

    switch ($_POST["tag"]){
        case "getEielTemplates":
            echo json_encode(getEielTemplates($_POST["layerName"],$_POST["featureId"],$_POST["townId"],""));
            break;
        case "getLayerCategory":
            echo getLayerCategory($_POST["layerName"]);
            break;
    }

    function getLayerCategory($layerName){
        $dbCon = new DBConnection();
        $closeConnection = 1; //0 mantiene la conexión abierta, 1 la cierra.
        $reportManager = new java("com.avanzait.report.GetFeatureReportAvanzait");
        $reportManager->__client->cancelProxyCreationTag = 0;
        $category = $reportManager->getCategoryByProccesedLayerName($dbCon->host, $dbCon->port, $dbCon->database, $dbCon->user, $dbCon->pass, $layerName, $closeConnection);
        return $category;
    }

    function getEielTemplates($layerName, $featureId, $townId){
        global $directorioPlantillasGenericas;
        global $directorioPlantillasEntidad;
        $reportManager = new java("com.avanzait.report.GetFeatureReportAvanzait");
        $reportManager->__client->cancelProxyCreationTag = 0;
        $category = getLayerCategory($layerName);
        $plantillas = $reportManager->getPlantillasInformes($layerName, $category, $featureId, $directorioPlantillasGenericas, $directorioPlantillasEntidad);
        return java_values($plantillas);
    }