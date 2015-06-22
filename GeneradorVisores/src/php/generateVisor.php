<?php
require_once "../../Twig/vendor/autoload.php";

$loader = new Twig_Loader_Filesystem(__DIR__."/../templates");
$twig = new Twig_Environment($loader, array(
    'debug' => true
));
$twig->addExtension(new Twig_Extension_Debug());

echo $twig->render('/Visor Generator/visorgenerator.html.twig', array(
    "functions" => ["areazoom", "clickcoordinates", "dataretrieve", "draw", "fullscreen", "panto", "printmap", "zoomin", "zoomout"]
));
