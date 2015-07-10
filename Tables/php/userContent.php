<?php
require_once ('DBConnect.php');
require_once("../../ApiGeoserver/classes/ApiRest.php");
require_once("../../ApiGeoserver/classes/Connection.php");


if (isset($_POST["tag"]) && $_POST["tag"] == "userMaps"){
    session_start();
    echo json_encode(downloadUserMaps($_SESSION["username"]));
}elseif (isset($_POST["tag"]) && $_POST["tag"] == "userVisors") {
    session_start();
    echo json_encode(downloadUserVisors($_SESSION["username"]));
}elseif (isset($_POST["tag"]) && $_POST["tag"] == "saveMap"){
        session_start();
        echo json_encode(saveMap($_POST["mapName"],$_POST["mapDescription"],$_POST["mapOwner"]));
}else{
    return false;
}

function downloadUserMaps($username){
    $connection = new DBConnect();
    $query = "SELECT id, name, description, date_creation, date_update, image FROM public.\"Maps\" WHERE owner='".$username."';";
    $result = pg_query($query) or die('Error: '.pg_last_error());
    return pg_fetch_all($result);
}

function downloadUserVisors($username){
    $connection = new DBConnect();
    $query = "SELECT id, name, description, date_creation, date_update FROM public.\"Visors\" WHERE owner='".$username."';";
    $result = pg_query($query) or die('Error: '.pg_last_error());
    return pg_fetch_all($result);
}

function saveMap($mapName, $mapDescription, $username){
    $connection = new DBConnect();
    $query = "INSERT INTO public.\"Maps\" (name, description, owner) VALUES ('".$mapName."','".$mapDescription."','".$username."');";
    $result = pg_query($query) or die('Error: '.pg_last_error());
    return $result;
}