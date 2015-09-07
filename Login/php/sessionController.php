<?php
    require_once "../../Common/php/DBConnection.php";

    //Hacer login con el servicio de localgis
    if (!isset($_POST["method"])){
        return;
    }

    if($_POST["method"] == "login"){
        echo json_encode(login($_POST["userName"], $_POST["password"]));
    }
    elseif ($_POST["method"] == "logout"){
        logout();
    }

    function login($userName, $password, $redirect=""){
        $connection=new DBConnection();
        //print("##".$password."##");
        
        $method = "aes-128-cbc";
        //falta aplicar PBEKeySpec con salt (actualmente no encripta correctamente)
        //$password = openssl_encrypt($password, $method, 'GEOPISTA');
        //print("##".$password."##");

        /*$query="SELECT id,id_entidad FROM iuseruserhdr WHERE name = '".$userName."' AND password='".$password."'";
        $result=pg_query($query) or die('Error: '.pg_last_error());
        $row=pg_fetch_row($result);
        $connection->close();*/

        //Provisional (sin pass)
        $query="SELECT id,id_entidad FROM iuseruserhdr WHERE name = '".$userName."'";
        $result=pg_query($query) or die('Error: '.pg_last_error());
        $row=pg_fetch_row($result);
        $connection->close();

        $login=true;
        $userId=0;
        $entityId=0;
        if($row){
            $userId=$row[0];
            $entityId=$row[1];
            $login= true;
        }
        //if ($login && $row[1]!=null){
        if ($login){
        session_start();
            $_SESSION["userName"]=$userName;
            $_SESSION["userId"]=$userId;
            $_SESSION["userEntityId"]=$entityId;
            //updateSession();
            $loginResponse = new stdClass();
            $loginResponse->logged = true;
            $loginResponse->previousUrl = $_SERVER['HTTP_REFERER'];
            registerUser($userId,$userName);
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
        return $_SESSION["userName"];
    }

    function registerUser($userId,$userName){
       /* $connection=new DBConnection("UserContent");
        $query="SELECT name FROM \"Users\" WHERE id='".$userId."' and name='".$userName."'";
        $result=pg_query($query);
        $row=pg_fetch_row($result);
        if($row[0]==''){
            $query="INSERT INTO \"Users\" (id, name) VALUES (".$userId.",'".$userName."')";
            $result=pg_query($query);
        }
        $connection->close();*/
    }
?>
