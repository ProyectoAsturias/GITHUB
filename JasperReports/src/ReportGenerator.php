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
        $this->reportParams->put("SUBREPORT_DIR", realpath("../reports/subreports/")."/");
        $this->reportParams->put("IMAGES_DIR", realpath("../images/")."/");
    }

    function extractReportToPdf(){
        $print = $this->fillManager->fillReport($this->report,$this->reportParams,new Java("net.sf.jasperreports.engine.JREmptyDataSource"));
        $jem = new JavaClass("net.sf.jasperreports.engine.JasperExportManager");
        $jem->exportReportToPDFFile($print, $this->outputPath);
    }

    function extractReportToDocx(){
        java_set_file_encoding("UTF-8");
        $exportador = new java("net.sf.jasperreports.engine.export.ooxml.JRDocxExporter");//libreria para Docx documentos word
        $parametrosExportados = java("net.sf.jasperreports.engine.JRExporterParameter");
        $print = $this->fillManager->fillReport($this->report,$this->reportParams,new Java("net.sf.jasperreports.engine.JREmptyDataSource"));
        $exportador->setParameter($parametrosExportados->JASPER_PRINT, $print);
        $this->javaOutputStream = new java("java.io.ByteArrayOutputStream");
        $exportador->setParameter($parametrosExportados->OUTPUT_FILE_NAME, $this->outputPath);
        $exportador->exportReport(); //Este código sirve para abrir el archivo generado desde el explorador
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
        $this->reportParams->put("legendData", $legendArrayList);
    }

    private function generateTableArrayList($tableObject){
        $tableArray = new Java("java.util.ArrayList");
        if (isset($tableObject->tableContent[0])){
            $tableArray->add($tableObject->layerName);
            $tableArray->add($this->generateTableColumnsArrayList($tableObject->tableHeaders));
            $tableArray->add($this->generateTableValuesArrayList($tableObject->tableContent));
            return $tableArray;
        }
        return null;
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
            $rowContent = new Java("java.util.ArrayList");
            foreach($content as $valueContent){
                $rowContent->add($valueContent);
            }
            $tableValuesArray->add($rowContent);
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