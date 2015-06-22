<?php

require_once "../../Common/Twig/vendor/autoload.php";

$loader = new Twig_Loader_Filesystem(__DIR__."/../templates");
$twig = new Twig_Environment($loader, array(
    'debug' => true
));
$twig->addExtension(new Twig_Extension_Debug());

session_start();
if(isset($_SESSION['username'])){
    echo $twig->render('index.html.twig', array(
        "logged" => true
    ));
}else{
    echo $twig->render('index.html.twig', array(
        "logged" => false
    ));
}

