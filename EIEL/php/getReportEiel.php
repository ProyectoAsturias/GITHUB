<?php
    require_once("../../Common/php/TCConfig.php");
    require_once(__DIR__."/../../GeoserverApi/apiLocalgisFunc.php");
    require_once($loginTomcatJava);

$GLOBALS["ahoraRespondo"] = true;

    //$directorioPlantillasGenericas = "C:\Users\JOSE\Desktop\plantilla_informes_eiel";
    //$directorioPlantillasEntidad = "C:\Users\JOSE\Desktop\plantilla_informes_eiel";
    $directorioTemporal = sys_get_temp_dir();
	$directorioPlantillasGenericas = "/usr/local/LocalGIS.MODELO/admcar/classes/plantillas/eiel";
	$directorioPlantillasEntidad = "/usr/local/LocalGIS.MODELO/admcar/classes/plantillas/eiel";

    if (!isset($_POST["tag"])){
        if (!isset($_GET["tag"])){
            return "Petición inválida";
        }else{
            $tag = $_GET["tag"];
        }
    }else{
        $tag = $_POST["tag"];
    }

    switch ($tag){
        case "getEielTemplates":
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            echo json_encode(getEielTemplates($_POST["layerName"], $_SESSION["userEntityId"]));
            break;
        case "getLayerCategory":
            echo getLayerCategory($_POST["layerName"]);
            break;
        case "generateEielReport":
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            echo generateEielReport($_GET["layerName"],$_GET["template"],$_GET["townId"],$_SESSION["userEntityId"],$_GET["featureId"]);
            break;
    }

    function getLayerCategory($layerName){
        $dbCon = new DBConnection();
        $reportManager = new java("com.avanzait.report.GetFeatureReportAvanzait");
        $reportManager->__client->cancelProxyCreationTag = 0;
        $category = $reportManager->getCategoryByProccesedLayerName($dbCon->host, $dbCon->port, $dbCon->database, $dbCon->user, $dbCon->pass, $layerName);
        $reportManager->closeConnection(1);
        $dbCon->close();
        return $category;
    }

    function getEielTemplates($layerName, $entityId){
        global $directorioPlantillasGenericas;
        global $directorioPlantillasEntidad;

        $layerName = getOriginalLayerName($layerName);
        //return $layerName;
        if ($layerName == ""){ return false;}
        $reportManager = new java("com.avanzait.report.GetFeatureReportAvanzait");
        $reportManager->__client->cancelProxyCreationTag = 0;
        $category = getLayerCategory($layerName);
        $plantillas = $reportManager->getPlantillasInformes($layerName, $category, $entityId, $directorioPlantillasGenericas, $directorioPlantillasEntidad);
        $reportManager->closeConnection(1);
        if (count(java_values($plantillas)) == 0){
            return false;
        }
        return java_values($plantillas);
    }

    function generateEielReport($layerName, $template, $featureIds, $entityId, $townId){
        $layerName = getOriginalLayerName($layerName);
        $dbCon = new DBConnection();
        $reportManager = new java("com.avanzait.report.GetFeatureReportAvanzait");
        $reportManager->__client->cancelProxyCreationTag = 0;

        $resultReport = $reportManager->getReport($dbCon->host, $dbCon->port, $dbCon->database, $dbCon->user, $dbCon->pass, $layerName, $template, $townId, $entityId, $featureIds, "PDF", "es_ES");
        $reportManager->closeConnection(1);
        $dbCon->close();
		if (java_values($resultReport) == NULL){
            return "No se ha podido generar el informe. Posibles problemas:<br/>
                - No se puede conectar a la Base de Datos.<br/>
                - La plantilla utilizada para generar el informe no está correctamente compilada o faltan ficheros necesarios.<br/>
                - No existe esta relación Capa-Municipio-Entidad<br/>";
        }
        //$reportManager->saveInforme($resultReport, $townId, "PDF", basename($template), "C:\\Users\\JOSE\\Desktop\\tmp");

        header('Content-type: application/pdf');
        header('Content-Disposition: inline; filename="' . $townId."".basename($template, ".jrxml")."'");
        header('Content-Transfer-Encoding: binary');
        header('Accept-Ranges: bytes');
        return java_values($resultReport);
    }