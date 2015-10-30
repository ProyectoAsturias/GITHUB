<?php
/*
 * This file uses Twig to create dynamically a visor, with data from a JSON. This JSON contains data for the map (center, zoom level and WMS target) and functions bars assigned to it.
 * When rendering tableIndex.html.twig we send him an array with the visor data, used there to render templates individually, so we only will have the needed HTML on the loaded page.
 *
 * JSON will be loaded from a Database, right now it's hardcoded.
 *
 * Every template will be in templates folder. In the case it will be moved, $loader variable (in this file) path must be updated, otherwise Twig won't be able to locate templates.
 * IMPORTANT: Every template MUST be named in lowercase and, in case of a function following the syntax "(functionName)_template.html.twig", otherwise it will cause troubles when rendering them since Twig won't be able to locate them on Unix systems.
 */
require_once "../../Common/Twig/vendor/autoload.php";
require_once "../../Tables/php/userContent.php";

$loader = new Twig_Loader_Filesystem(__DIR__."/../templates");
$twig = new Twig_Environment($loader, array(
    'debug' => true
));
$twig->addExtension(new Twig_Extension_Debug());


session_start();
if (isset($_SESSION['userName'])){
    $userName = $_SESSION['userName'];
}else{
    $userName = "";
}

$visorData = loadVisorContent($_GET["visorName"]);
//$visorData = loadVisorContent($_GET["visorName"]);
//$json = '{"mapDetails":{"center":[-385480.6330376505,6836280.051162561],"zoom":5,"WMSUrl":"http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms"},"functionsBar":[{"position":{"top":"650px","left":"275px"},"functions":["fullScreen","dataRetrieve","panTo","zoomOut","empty","panTo"]}]}';
//$visorData = json_decode($json);

echo $twig->render('index.html.twig', array(
    "userName" => $userName,
    "visorName" => $_GET["visorName"],
    "visorData" => json_decode($visorData[0]['content'])
));