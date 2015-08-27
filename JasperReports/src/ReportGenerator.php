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
        $tableArray->add($tableObject->tableContent[0]);
        $tableArray->add($this->generateTableColumnsArrayList(array_slice($tableObject->tableHeaders,1)));
        $tableArray->add($this->generateTableValuesArrayList(array_slice($tableObject->tableContent,1)));
        return $tableArray;
    }

    private function generateTableColumnsArrayList($tableHeaders){
        $tableColumnsArray = new Java("java.util.ArrayList");
        foreach($tableHeaders as $header){
            $tableColumnsArray->add($header);
        }
        return $tableColumnsArray;
    }

    private function generateTableValuesArrayList($tableContent){
        $tableValuesArray = new Java("java.util.ArrayList");
        foreach($tableContent as $content){
            $tableValuesArray->add($content);
        }
        return $tableValuesArray;
    }

    private function generateLegendArrayList($legendObject){
        $legendArray = new Java("java.util.ArrayList");
        $legendArray->add($this->generateLegendArrayListLayerImages($legendObject->layersImage));
        $legendArray->add($this->generateLegendArrayListLayerTitle($legendObject->layersTitle));
        return $legendArray;
    }

    private function generateLegendArrayListLayerTitle($layersTitles){
        $layersTitlesArray = new Java("java.util.ArrayList");
        foreach($layersTitles as $title){
            $layersTitlesArray->add($title);
        }
        return $layersTitlesArray;
    }

    private function generateLegendArrayListLayerImages($layersImages){
        $layersImagesArray = new Java("java.util.ArrayList");
        foreach($layersImages as $image){
            $imagedata = file_get_contents($image);
            $layersImagesArray->add(base64_encode($imagedata));
        }
        return $layersImagesArray;
    }
}