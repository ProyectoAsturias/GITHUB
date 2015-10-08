<?php

require_once "../../Common/Twig/vendor/autoload.php";
require_once "../../Tables/php/userContent.php";


$loader = new Twig_Loader_Filesystem(__DIR__."/../templates");
$twig = new Twig_Environment($loader, array(
    'debug' => true
));
$twig->addExtension(new Twig_Extension_Debug());

session_start();
if (!isset($_SESSION['userName'])) header("Location: ../../Login/php/loginView.php?errorMessage=".urlencode("Debe iniciar sesión para ver este contenido")."&requestURL=".urlencode("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"));

if(isset($_GET["visorName"]) && ($_GET["visorName"]!= "")){

    $visorData = loadVisorContent($_GET["visorName"]);
    
    echo $twig->render('Visor Generator/visorgenerator.html.twig', array(
        "functions" => ["areazoom" , "clickcoordinates" , "configuration" , "dataretrieve" , "draw" , "export" , "fullscreen" , "help" , "homeinfo" , "lastview" ,"mail" , "panto" , "printmap" , "selection" , "update" ,"zoomin", "zoomout", "wmsimport", "empty"],
        "userName" => $_SESSION["userName"],
        "visorName" => $_GET["visorName"],
        "visorData" => json_decode($visorData[0]['content'])
    ));
}else{
    header("Location: ../../Tables/php/tables.php?errorMessage=".urlencode("El nombre del visor no puede ser vacío"));
}


