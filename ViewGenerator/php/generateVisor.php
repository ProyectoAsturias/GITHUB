<?php

require_once "../../Common/Twig/vendor/autoload.php";


$loader = new Twig_Loader_Filesystem(__DIR__."/../templates");
$twig = new Twig_Environment($loader, array(
    'debug' => true
));
$twig->addExtension(new Twig_Extension_Debug());

session_start();
if (!isset($_SESSION['username'])) header("Location: ../../Login/php/loginView.php?errorMessage=".urlencode("Debe iniciar sesión para ver este contenido")."&requestURL=".urlencode("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"));

if(isset($_GET["visorName"]) && ($_GET["visorName"]!= "")){
    echo $twig->render('Visor Generator/visorgenerator.html.twig', array(
        "functions" => ["areazoom", "clickcoordinates", "dataretrieve", "draw", "fullscreen", "panto", "printmap", "zoomin", "zoomout", "empty"],
        "username" => $_SESSION["username"],
        "visorName" => $_GET["visorName"],
    ));
}else{
    header("Location: ../../Tables/php/tables.php?errorMessage=".urlencode("El nombre del visor no puede ser vacío"));
}


