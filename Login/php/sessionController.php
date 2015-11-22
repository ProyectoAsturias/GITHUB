<?php
    require_once("../../Common/php/DBConnection.php");
    require_once("../../Common/php/TCConfig.php");
    require_once($loginTomcatJava);

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
	$encripter = new java("com.avanzait.encriptar.EncriptarPasswordAvanzait");
	$connection=new DBConnection();        
	$where=" AND bloqueado=FALSE AND fecha_proxima_modificacion > NOW()";
	$query="SELECT password FROM iuseruserhdr WHERE name = '".$userName."'".$where;
	$result=pg_query($query) or die('Error: '.pg_last_error());
	$row=pg_fetch_row($result);
	if(!$row){
		$loginResponse = new stdClass();
		$loginResponse->logged = false;
		$loginResponse->errorMessage = "Error en la autenticación, consulte a su administrador.";
		return $loginResponse;
	}
	$type=substr(explode("}",$row[0])[0],1);
	$encPassword="";
	switch($type){
		case "TYPE1":
			//$encPassword = $encripter->encriptar(explode("}",$row[0])[1], 1);
			$encPassword = $encripter->encriptar($password, '1');
			break;
		case "TYPE2":
			//$encPassword = $encripter->encriptar(explode("}",$row[0])[1], 2);
			$encPassword = $encripter->encriptar($password, '2');
			break;
		default:
			//$encPassword = $encripter->encriptar($row[0], 1);
			$encPassword = $encripter->encriptar($password, '3');
			break;
	}			
	//return $encPassword;
        $query="SELECT id,id_entidad FROM iuseruserhdr WHERE name = '".$userName."' AND password='".$encPassword."'".$where;
        $result=pg_query($query) or die('Error: '.pg_last_error());
        $row=pg_fetch_row($result);
        $connection->close();

        $login=false;
        $userId=0;
        $entityId=0;
        if($row){
            $userId=$row[0];
            $entityId=$row[1];
            $login= true;
        }
        if ($login && $row[1]!=null){
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
        }
	else{
            $loginResponse = new stdClass();
            $loginResponse->logged = false;
            $loginResponse->errorMessage = "Error en la autenticación, consulte a su administrador.";
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
        $connection=new DBConnection(true);
        $query="SELECT name FROM \"Users\" WHERE id='".$userId."' and name='".$userName."'";
        $result=pg_query($query);
        $row=pg_fetch_row($result);
        if($row[0]==''){
            $query="INSERT INTO \"Users\" (id, name) VALUES (".$userId.",'".$userName."')";
            $result=pg_query($query);
        }
        $connection->close();
    }
?>

