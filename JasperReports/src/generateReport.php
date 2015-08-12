<?php
define('JAVA_INC_URL','http://localhost:9090/JavaBridge/java/Java.inc');
require_once("ReportGenerator.php");

$reportGenerator = null;

switch ($_GET["tag"]){
    case "downloadPdf":
        downloadPdf();
        break;
}

if (isset($_POST["reportPath"])){
    startReport();
    addReportsField();
    exportToPdf();
    session_start();
    $_SESSION["reportGenerator"] = $reportGenerator;
    //exportToHtml();
}

function startReport(){
    global $reportGenerator;
    $reportGenerator = new ReportGenerator($_POST["reportPath"], realpath(".")."/../tmpReports/".$_POST["fileName"].".pdf", JAVA_INC_URL);
    $reportGenerator->initializeReport();
}

function downloadPdf(){
    session_start();
    if (isset($_SESSION["reportGenerator"])){
        $reportGenerator = $_SESSION["reportGenerator"];
        $reportGenerator->downloadPdf();
    }

}

function addReportsField(){
    global $reportGenerator;
    $reportGenerator->addReportTextField("title", "Título del informe");
    $reportGenerator->addReportTextField("description", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit magna scelerisque ex consequat, ultrices vehicula augue placerat. Nam tincidunt, ligula id dapibus maximus, ipsum velit molestie ante, id viverra quam lectus quis magna. Quisque ac quam eu erat consectetur euismod ut ac nulla. Aenean vestibulum, arcu non viverra semper, tellus nibh facilisis sem, eu porta neque lacus nec urna. Sed sed pellentesque lorem. Quisque pulvinar aliquam lectus, a malesuada enim tincidunt ut. Aenean volutpat ac arcu et consequat. Aliquam tempus arcu non nibh pellentesque, cursus scelerisque ligula suscipit. Etiam neque massa, hendrerit at luctus eu, lacinia quis nisi. Ut pellentesque lorem in nisl sodales, quis ultrices dolor pretium. Vivamus vel mattis lacus, id lacinia enim.
Generados 5 párrafos, 459 palabras, 3117 bytes de Lorem Ipsum");

    $imagedata = file_get_contents($_POST["mapImage"]);
    $reportGenerator->addReportImageField("mapImage", base64_encode($imagedata));

    $reportGenerator->addReportTable(null);
    $reportGenerator->addReportTable(null);
    $reportGenerator->addReportTable(null);
    $reportGenerator->addReportTable(null);
    $reportGenerator->addReportTable(null);
    $reportGenerator->addReportTable(null);

    $reportGenerator->addReportLegend(null);
}

function exportToPdf(){
    global $reportGenerator;
    return $reportGenerator->extractReportToPdf();
}

function exportToHtml(){
    global $reportGenerator;
    $reportGenerator->extractReportToHtml();
}


