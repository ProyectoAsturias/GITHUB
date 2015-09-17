<?php

require_once "../../Common/Twig/vendor/autoload.php";
require_once "../../Tables/php/userContent.php";


$loader = new Twig_Loader_Filesystem(__DIR__."/../templates");
$twig = new Twig_Environment($loader, array(
    'debug' => true
));
$twig->addExtension(new Twig_Extension_Debug());

session_start();
if (!isset($_SESSION['userName'])){
    header("Location: ../../Login/php/loginView.php?errorMessage=".urlencode("Debe iniciar sesión para ver este contenido")."&requestURL=".urlencode("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"));
}

if(isset($_GET["mapName"]) && ($_GET["mapName"]!= "") && isset($_GET["id"]) && ($_GET["id"]!= "")){
    $baseLayer = loadMapBaseLayer($_GET["mapName"]);
    echo $twig->render('index.html.twig', array(
        "userName" => $_SESSION["userName"],
        "mapName" => $_GET["mapName"],
        "entityId" => $_GET["id"],
        "baselayer" => $baseLayer[0]["baselayer"]
    ));
}else{
    header("Location: ../../Tables/php/tables.php?errorMessage=".urlencode("El nombre del mapa no puede ser vacío"));
}