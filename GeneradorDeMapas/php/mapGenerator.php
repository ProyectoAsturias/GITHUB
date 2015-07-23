<?php
session_start();
if(isset($_SESSION['username'])){
    header("Location: ./index.php");
}else{
    header("Location: ../../Login/php/loginView.php?errorMessage=".urlencode("Debe iniciar sesión para ver este contenido")."&requestURL=".urlencode("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"));
}

if(isset($_GET["mapName"]) && ($_GET["mapName"]!= "")){
    header("Location: ./index.php?mapName=".$_GET["mapName"]);
}else{
    header("Location: ../../Tables/php/tables.php?errorMessage=".urlencode("El nombre del mapa no puede ser vacío"));
}

