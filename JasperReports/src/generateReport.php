<?php
define('JAVA_INC_URL','http://localhost:9090/JavaBridge/java/Java.inc');
require_once("ReportGenerator.php");

$reportGenerator = null;

if (isset($_GET["tag"])){
    switch ($_GET["tag"]){
        case "downloadPdf":
            downloadPdf();
            break;
        case "getAvailableReports":
            echo getAvailableReports();
            break;
        case "getPreview":
            previewPdf();
            break;
        case "deleteReport":
            echo deleteReport();
            break;
    }
}

if (isset($_POST["reportName"])){
    startReport();
    addReportsField();
    exportToPdf();
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    $_SESSION["reportGenerator"] = $reportGenerator;
    //echo previewPdf();
    //exportToHtml();
}

function getAvailableReports(){
    $reports = Array();
    foreach(glob('../reports/*.jrxml') as $filename){
        array_push($reports, pathinfo($filename)["filename"]);
    }
    return json_encode($reports);
}

function deleteReport(){
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    if (isset($_SESSION["reportGenerator"])){
        $reportGenerator = $_SESSION["reportGenerator"];
        unlink($reportGenerator->outputPath);
    }
}

function startReport(){
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    if (isset($_SESSION["reportGenerator"])){
        global $reportGenerator;
        $reportGenerator = $_SESSION["reportGenerator"];
        $reportGenerator = new ReportGenerator(realpath(".")."/../reports/".$_POST["reportName"].".jrxml", $reportGenerator->outputPath, JAVA_INC_URL);
    }
    $reportGenerator->initializeReport();
}

function previewPdf(){
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    if (isset($_SESSION["reportGenerator"])){
        $reportGenerator = $_SESSION["reportGenerator"];
        return base64_encode(file_get_contents($reportGenerator->outputPath));
    }
}

function downloadPdf(){
    session_start();
    if (isset($_SESSION["reportGenerator"])){
        $reportGenerator = $_SESSION["reportGenerator"];
        $file = $reportGenerator->outputPath;
        $filename = basename($reportGenerator->outputPath);

        header('Content-type: application/pdf');
        header('Content-Disposition: inline; filename="' . $filename . '"');
        header('Content-Transfer-Encoding: binary');
        header('Content-Length: ' . filesize($file));
        header('Accept-Ranges: bytes');

        @readfile($file);
    }
}

function addReportsField(){
    global $reportGenerator;
    $reportGenerator->addReportTextField("title", $_POST["reportTitle"]);
    $reportGenerator->addReportTextField("description", $_POST["reportDescription"]);

    $imagedata = file_get_contents($_POST["mapImage"]);
    $reportGenerator->addReportImageField("mapImage", base64_encode($imagedata));

    if($_POST["legendData"] != ""){
        $reportGenerator->addReportLegend(json_decode($_POST["legendData"]));
    }


    $dataTables = json_decode($_POST["dataTables"]);
    if ($dataTables != ""){
        foreach($dataTables as $table){
            $reportGenerator->addReportTable($table);
        }
    }

}

function exportToPdf(){
    global $reportGenerator;
    return $reportGenerator->extractReportToPdf();
}

function exportToHtml(){
    global $reportGenerator;
    $reportGenerator->extractReportToHtml();
}


