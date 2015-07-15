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
require_once "../../Twig/vendor/autoload.php";

$loader = new Twig_Loader_Filesystem(__DIR__."/../templates");
$twig = new Twig_Environment($loader, array(
    'debug' => true
));
$twig->addExtension(new Twig_Extension_Debug());

$json = "{\"mapDetails\":{\"center\":[-424339.90999686107,5372327.873439357],\"zoom\":14},\"functionsBar\":[{\"position\":{\"top\":\"-500px\",\"left\":\"278px\"},\"functions\":[\"draw\",\"zoomIn\",\"zoomOut\",\"clickCoordinates\",\"areaZoom\",\"printMap\",\"panTo\",\"fullScreen\",\"dataRetrieve\"]}]}";

$visorData = json_decode($json);

echo $twig->render('index.twig', array(
    "visorData" => $visorData
));