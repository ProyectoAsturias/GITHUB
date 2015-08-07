<?php
    require_once "../../Common/Twig/vendor/autoload.php";

    $loader = new Twig_Loader_Filesystem(__DIR__."/../templates");
    $twig = new Twig_Environment($loader, array(
        'debug' => true
    ));
    $twig->addExtension(new Twig_Extension_Debug());

    if(isset($_GET["errorMessage"])){
        $redirectError = $_GET["errorMessage"];
    }else{
        $redirectError = "";
    }

    if(isset($_GET["requestURL"])){
        $redirectURL = $_GET["requestURL"];
    }else{
        $redirectURL = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    }

    $redirectURL = "../../Tables/php/tables.php";

    session_start();
    if(isset($_SESSION['userName'])){
        echo $twig->render('loginIndex.html.twig', array(
            "logged" => true,
            "redirectURL" => $redirectURL,
            "redirectError" => $redirectError
        ));
    }else{
        echo $twig->render('loginIndex.html.twig', array(
            "logged" => false,
            "redirectUrl" => $redirectURL,
            "redirectError" => $redirectError
        ));
    }
?>