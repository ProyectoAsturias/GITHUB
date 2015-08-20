<?php

class ReportGenerator {
    var $reportURL;
    var $outputPath;

    var $compileManager;
    var $report;
    var $fillManager;
    var $reportParams;

    function __construct($reportURL, $outputURL, $JavaIncUrl){
        require_once($JavaIncUrl);

        $this->reportURL = $reportURL;
        $this->outputPath = $outputURL;
    }

    function initializeReport(){
        $this->compileManager = new JavaClass("net.sf.jasperreports.engine.JasperCompileManager");
        $this->report = $this->compileManager->compileReport($this->reportURL);
        $this->fillManager = new JavaClass("net.sf.jasperreports.engine.JasperFillManager");
        $this->reportParams = new Java("java.util.HashMap");
        $this->reportParams->__client->cancelProxyCreationTag = 0;
        $this->reportParams->put("dataTables", new Java("java.util.ArrayList"));
        $this->reportParams->put("legendData", new Java("java.util.ArrayList"));
        $this->reportParams->put("SUBREPORT_DIR", realpath("../reports/"));
    }

    function extractReportToPdf(){
        $print = $this->fillManager->fillReport($this->report,$this->reportParams,new Java("net.sf.jasperreports.engine.JREmptyDataSource"));
        $jem = new JavaClass("net.sf.jasperreports.engine.JasperExportManager");
        $jem->exportReportToPDFFile($print, $this->outputPath);
    }

    function extractReportToHtml(){
        $print = $this->fillManager->fillReport($this->report,$this->reportParams,new Java("net.sf.jasperreports.engine.JREmptyDataSource"));
        $jem = new JavaClass("net.sf.jasperreports.engine.JasperExportManager");
        $jem->exportReportToHtmlFile($print, $this->outputPath.".html");
    }

    function addReportTextField($key, $value){
        $this->reportParams->put($key, $value);
    }

    function addReportImageField($key, $value){
        $base64ImageCode = new Java("java.lang.String", $value);
        $this->reportParams->put($key, $base64ImageCode);
    }

    function addReportTable($tableObject){
        $tableArrayList = $this->generateTableArrayList($tableObject);
        $this->reportParams->get("dataTables")->add($tableArrayList);
    }

    function addReportLegend($legendObject){
        $legendArrayList = $this->generateLegendArrayList($legendObject);
        //$this->reportParams->get("legendData")->add($legendArrayList);  //Hay que añadir lista de imagenes y modificar el subreport;
        $this->reportParams->put("legendData", $legendArrayList);
    }

    private function generateTableArrayList($tableObject){
        $tableArray = new Java("java.util.ArrayList");
        $tableArray->add("CapaName");
        $tableArray->add($this->generateTableColumnsArrayList());
        $tableArray->add($this->generateTableValuesArrayList());
        return $tableArray;
    }

    private function generateTableColumnsArrayList(){
        $tableColumnsArray = new Java("java.util.ArrayList");
        $tableColumnsArray->add("Campo1");
        $tableColumnsArray->add("Campo2");
        $tableColumnsArray->add("Campo3");
        $tableColumnsArray->add("Campo4");
        $tableColumnsArray->add("eageagaa");
        $tableColumnsArray->add("Cameageagpo2");
        $tableColumnsArray->add("Cameageagpo3");
        $tableColumnsArray->add("Caeageateatmpo4");
        return $tableColumnsArray;
    }

    private function generateTableValuesArrayList(){
        $tableValuesArray = new Java("java.util.ArrayList");
        $tableValuesArray->add("Valor1");
        $tableValuesArray->add("Valortweatea2");
        $tableValuesArray->add("Vageaelor3");
        $tableValuesArray->add("Valogegaaegaer4");
        $tableValuesArray->add("Valor1");
        $tableValuesArray->add("Valorteagearweatea2");
        $tableValuesArray->add("Vageeagaegaelor3");
        $tableValuesArray->add("Valogegawerqwraegaer4");
        return $tableValuesArray;
    }

    private function generateLegendArrayList($legendObject){
        $legendArray = new Java("java.util.ArrayList");
        $legendArray->add("Capa1");
        $legendArray->add("Capa2");
        $legendArray->add("Capa3");
        $legendArray->add("Capa4");
        $legendArray->add("Capa5");
        $legendArray->add("Capa6");
        return $legendArray;
    }
}