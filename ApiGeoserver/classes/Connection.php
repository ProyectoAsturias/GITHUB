<?php
	class ServerConnection {
		#Info database
		var $dbSchema;
		var $dbConn;
		var $dbUser;
		#Info geoserver
		var $gsHost;
		var $gsUser;
		var $gsPassword;
		var $wsName;
		var $dsName;

		public function __construct($mapName=""){
			$this->dbSchema="public";
			$this->dbName="Localgis";
			$this->dbUser="postgres";
			$this->dbPass="1234";
			$this->dbHost="localhost";
			$this->gsHost="192.168.1.2";
			$this->gsUser="admin";
			$this->gsPassword="geoserver";
			$this->wsName=$mapName;
			$this->dsName=$mapName;
			$this->dbConn = pg_connect("host=".$this->dbHost." dbname=".$this->dbName." user=".$this->dbUser." password=".$this->dbPass)  or die('Error: '.pg_last_error());
		}

		public function dbClose(){
			pg_close($this->dbConn);
		}
	}
?>
