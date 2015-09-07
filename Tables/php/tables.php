<?php
	require_once "../../Common/Twig/vendor/autoload.php";
	
	$loader = new Twig_Loader_Filesystem(__DIR__."/../templates");
	$twig = new Twig_Environment($loader, array(
	    'debug' => true
	));
	$twig->addExtension(new Twig_Extension_Debug());

	session_start();
	if(isset($_SESSION['userName']) && isset($_SESSION["userEntityId"])){
	    echo $twig->render("tableIndex.html.twig", array(
	        "userName" => $_SESSION["userName"],
	        "userEntityId" => $_SESSION["userEntityId"]
	    ));
	}
	else{
	    header("Location: ../../Login/php/loginView.php?errorMessage=".urlencode("Debe iniciar sesión para ver este contenido")."&requestURL=".urlencode("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"));
	}
?>
