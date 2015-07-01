<?php
require_once ('DBConnect.php');
if (isset($_POST["tag"]) && $_POST["tag"] == "userMaps"){
    session_start();
    echo json_encode(downloadUserMaps($_SESSION["username"]));
}else{
    return false;
}

function downloadUserMaps($username){
    $connection = new DBConnect();
    $query = "SELECT id, name, description, date_creation, date_update, image FROM public.\"Maps\" WHERE owner='".$username."';";
    $result = pg_query($query) or die('Error: '.pg_last_error());
    return pg_fetch_all($result);
}