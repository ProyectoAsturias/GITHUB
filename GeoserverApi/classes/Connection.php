<?php
	/**
	 * Objeto que encapsula la conexión al servidor PostGreSQL y Geoserver.
	 */
	class ServerConnection {
		#Info database
		/**
		 * Host de la Base de Datos PostGreSQL al que conectar.
		 * @var string
		 */
		var $dbHost;

		/**
		 * Puerto de la Base de Datos PostGreSQL al que conectar.
		 * @var string
		 */
		var $dbPort;

		/**
		 * Nombre de la Base de Datos PostGreSQL al que conectar.
		 * @var string
		 */
		var $dbName;

		/**
		 * Esquema de la Base de Datos PostGreSQL al que conectar.
		 * @var string
		 */
		var $dbSchema;

		/**
		 * Objeto conexión, necesario para las transacciones.
		 * @var resource
		 */
		var $dbConn;

		/**
		 * Usuario de la base de datos PostGreSQL.
		 * @var string
		 */
		var $dbUser;

		#Info geoserver
		/**
		 * Dirección del Host del servidor Geoserver.
		 * @var string
		 */
		var $gsHost;

		/**
		 * Usuario de Geoserver.
		 * @var string
		 */
		var $gsUser;

		/**
		 * Contraseña del usuario de Geoserver.
		 * @var string
		 */
		var $gsPassword;

		/**
		 * Nombre del Workspace sobre el que operará Geoserver.
		 * @var string
		 */
		var $wsName;

		/**
		 * Nombre del DataStore asignado al Workspace.
		 * @var string
		 */
		var $dsName;

		/**
		 * Configura le objeto Conexión en función del nombre de un Mapa.
		 * @param string $mapName
		 */
		public function __construct($mapName="",$dbSchema=null){
			$this->dbHost="localhost";
			//$this->dbHost="avanzastore.dyndns.org";
			$this->dbPort="5432";
			//$this->dbPort="15432";
			$this->dbName="Localgis";
			//$this->dbName="geopista";

			if ($dbSchema==null)
				$this->dbSchema="public";
			else
				$this->dbSchema=$dbSchema;
			$this->dbUser="postgres";
			$this->dbPass="1234";
			


			$this->gsHost="localhost";
			$this->gsUser="admin";
			$this->gsPassword="geoserver";
			$this->wsName=$mapName;
			$this->dsName=$mapName;

			$this->dbConn = pg_connect("host=".$this->dbHost." port=".$this->dbPort." dbname=".$this->dbName." user=".$this->dbUser." password=".$this->dbPass)  or die('Error: '.pg_last_error());
		}
		
		/**
		 * Cierra la conexión existente a la Base de Datos.
		 */
		public function dbClose(){
			pg_close($this->dbConn);
		}
	}
?>