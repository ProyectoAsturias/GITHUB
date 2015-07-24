<?php
//Hacer login con el servicio de localgis
if (!isset($_POST["method"])){
    return;
}

if($_POST["method"] == "login"){
    echo json_encode(login($_POST["username"], $_POST["password"]));
}elseif ($_POST["method"] == "logout"){
    logout();
}

function login($username, $password, $redirect=""){
    /*$connection=new ServerConnection();
    $query="SELECT id,id_entidad FROM iuseruserhdr WHERE name = '".$username."' AND password='".$password."'";
    $result=pg_query($query) or die('Error: '.pg_last_error());
    $row=pg_fetch_row($result);
    $connection->dbClose();

    $login=false;
    if($row.lenght!=0){
        $userid=$row[0];
        $entityid=$row[0];
        $login= true;
    }*/
    $login = true;
    if ($login){
        session_start();
        $_SESSION["username"]=$username;
        $_SESSION["userid"]=$userid;
        $_SESSION["entityid"]=$entityid;
        updateSession();
        $loginResponse = new stdClass();
        $loginResponse->logged = true;
        $loginResponse->previousUrl = $_SERVER['HTTP_REFERER'];
        return $loginResponse;
    }else{
        $loginResponse = new stdClass();
        $loginResponse->logged = false;
        $loginResponse->errorMessage = "Error en la autenticación.";
        return $loginResponse;
    }
}

function logout(){
    session_start();
    session_unset();
    session_destroy();
}

function updateSession(){
    if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 86400)) {
        logout();
    }
    $_SESSION['LAST_ACTIVITY'] = time();
}

function getUsername(){
    return $_SESSION["username"];
}

