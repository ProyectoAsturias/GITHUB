<?php

require_once "../../Twig/vendor/autoload.php";

$loader = new Twig_Loader_Filesystem(__DIR__."/../templates");
$twig = new Twig_Environment($loader, array(
    'debug' => true
));
$twig->addExtension(new Twig_Extension_Debug());

session_start();
if(isset($_SESSION['username'])){
    echo $_SESSION["username"];
    echo $twig->render('/login/index.html.twig', array(
        "logged" => true
    ));
    echo "Ya había sesión" . $_SESSION["username"];
}else{
    echo $twig->render('/login/index.html.twig', array(
        "logged" => false
    ));
}

