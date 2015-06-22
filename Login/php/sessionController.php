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
    $login= true; //Llamada al servicio de Localgis
    if ($login){
        session_start();
        $_SESSION["username"] = $username;
        updateSession();
        $loginResponse = new stdClass();
        $loginResponse->logged = true;
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

