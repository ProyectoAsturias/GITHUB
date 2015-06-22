<?php
//Hacer login con el servicio de localgis
if (!isset($_POST["method"])){
    echo var_dump($_POST);
    echo "Ningún método especificado";
    return;
}

if($_POST["method"] == "login"){
    loginAttempt($_POST["username"], $_POST["password"]);
}elseif ($_POST["method"] == "logout"){
    logout();
}

function loginAttempt($username, $password, $redirect=""){
    $login= true; //Llamada al servicio de Localgis
    if ($login){
        $_SESSION["username"] = $username;
        updateSession();
        return true;
    }else{
        return false;
    }
}

function logout(){
    if (isset($_SESSION["username"])) {
        session_unset();
        session_destroy();
    }
}

function updateSession(){
    if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 36000)) {
        logout();
    }
    $_SESSION['LAST_ACTIVITY'] = time();
}

