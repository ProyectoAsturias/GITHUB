<?php
    require_once "../../Common/php/DBConnection.php";

    //Hacer login con el servicio de localgis
    if (!isset($_POST["method"])){
        return;
    }

    if($_POST["method"] == "login"){
        echo json_encode(login($_POST["username"], $_POST["password"]));
    }
    elseif ($_POST["method"] == "logout"){
        logout();
    }

    function login($username, $password, $redirect=""){
        $connection=new DBConnection();
        //print("##".$password."##");
        
        $method = "aes-128-cbc";
        //falta aplicar PBEKeySpec con salt (actualmente no encripta correctamente)
        $password = openssl_encrypt($password, $method, 'GEOPISTA');
        //print("##".$password."##");

        /*$query="SELECT id,id_entidad FROM iuseruserhdr WHERE name = '".$username."' AND password='".$password."'";
        $result=pg_query($query) or die('Error: '.pg_last_error());
        $row=pg_fetch_row($result);
        $connection->close();*/

        //Provisional (sin pass)
        $query="SELECT id,id_entidad FROM iuseruserhdr WHERE name = '".$username."'";
        $result=pg_query($query) or die('Error: '.pg_last_error());
        $row=pg_fetch_row($result);
        $connection->close();

        $login=false;
        $userid=0;
        $entityid=0;
        if($row){
            $userid=$row[0];
            $entityid=$row[1];
            $login= true;
        }
        if ($login){
            session_start();
            $_SESSION["username"]=$username;
            $_SESSION["userid"]=$userid;
            $_SESSION["entityid"]=$entityid;
            updateSession();
            $loginResponse = new stdClass();
            $loginResponse->logged = true;
            $loginResponse->previousUrl = $_SERVER['HTTP_REFERER'];
            registerUser($userid,$username);
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

    function registerUser($userid,$username){
        $connection=new DBConnection("UserContent");
        $wms="http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx,http://ogc.larioja.org/wms/request.php,http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms";
        $query="INSERT INTO \"Users\" (id, name, wms) VALUES (".$userid.",'".$username."','".$wms."')";
        $result=pg_query($query);
        $connection->close();
    }
?>