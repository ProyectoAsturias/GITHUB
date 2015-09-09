<?php
    require_once("../../Common/pclzip/pclzip.lib.php");
    echo generateZipVisor();

    function saveHtmlFile(){
        ob_start();
        include("../../Visor/php/visor.php");
        $visorHtml = ob_get_contents();
        ob_end_clean();
        file_put_contents(sys_get_temp_dir()."/".$_GET["visorName"].".html", $visorHtml);
        return sys_get_temp_dir()."/".$_GET["visorName"].".html";
    }

    function generateZipVisor(){
        //$files = includeDirForZipping($files, "../../ViewGenerator/js/Map Functions");

        $zipname = $_GET["visorName"].'.zip';
        $zip = new PclZip($zipname);

        $zip->add(saveHtmlFile(), PCLZIP_OPT_REMOVE_ALL_PATH, PCLZIP_OPT_ADD_PATH, "Visor/html");
        $zip->add("../../ViewGenerator/js/Map Functions",PCLZIP_OPT_REMOVE_PATH, "../../");
        $zip->add("../../ViewGenerator/js/Visor Generator/legend.js",PCLZIP_OPT_REMOVE_PATH, "../../");
        $zip->add("../../ViewGenerator/css/",PCLZIP_OPT_REMOVE_PATH, "../../");
        $zip->add("../../ViewGenerator/templates/images/",PCLZIP_OPT_REMOVE_PATH, "../../");
        $zip->add("../../Visor/css/visorStyle.css",PCLZIP_OPT_REMOVE_PATH, "../../");
        $zip->add("../../Visor/css/printVisor.css",PCLZIP_OPT_REMOVE_PATH, "../../");

        $zip->add("../../Common/css/",PCLZIP_OPT_REMOVE_PATH, "../../");
        $zip->add("../../Common/bootstrap-3.3.4",PCLZIP_OPT_REMOVE_PATH, "../../");
        $zip->add("../../Common/js/",PCLZIP_OPT_REMOVE_PATH, "../../");
        $zip->add("../../Common/jsPDF/jsPDF.js",PCLZIP_OPT_REMOVE_PATH, "../../");
        $zip->add("../../Common/html2canvas/html2canvas.js",PCLZIP_OPT_REMOVE_PATH, "../../");
        $zip->add("../../Common/canvas2image/canvas2image.js",PCLZIP_OPT_REMOVE_PATH, "../../");


        if(file_exists($zipname)) {
            header('Content-Type: application/zip');
            header('Content-disposition: attachment; filename='.$zipname);
            header('Content-Length: ' . filesize($zipname));
            readfile($zipname);
        }
        //unlink($zipname);
    }

    function includeDirForZipping($array, $dirPath){
        if ($handle = opendir($dirPath)) {
            while (false !== ($entry = readdir($handle))) {
                if ($entry != "." && $entry != "..") {
                    array_push($array, $entry);
                }
            }
        }
        return $array;
    }
?>