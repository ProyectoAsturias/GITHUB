<?php

class DBConnect {
    var $dbSchema;
    var $dbConn;
    var $dbUser;
    var $dbHost;
    var $dbName;
    var $dbPass;

    public function __construct(){
        $this->dbName = "Asturias";
        $this->dbHost = "localhost";
        $this->dbSchema = "public";
        $this->dbUser = "postgres";
        $this->dbPass = "1234";
        $this->dbConn = pg_connect("host=".$this->dbHost." dbname=".$this->dbName." user=".$this->dbUser." password=".$this->dbPass)  or die('Error: '.pg_last_error());
    }

    public function dbClose(){
        pg_close($this->dbConn);
    }
}