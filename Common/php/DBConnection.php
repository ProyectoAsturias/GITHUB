<?php
	/**
	 * Objeto de conexión con PostGreSQL.
	 */
	class DBConnection {
		/**
		 * Objeto conexión, necesario para las transacciones.
		 * @var resource
		 */
		var $conn;

		/**
		 * Host de la Base de Datos PostGreSQL al que conectar.
		 * @var string
		 */
		var $host;

		/**
		 * Puerto de la Base de Datos PostGreSQL al que conectar.
		 * @var string
		 */
		var $port;

		/**
		 * Nombre de la Base de Datos PostGreSQL al que conectar.
		 * @var string
		 */
		var $database;

		/**
		 * Esquema de la Base de Datos PostGreSQL al que conectar.
		 * @var string
		 */
		var $schema;

		/**
		 * Usuario de la base de datos PostGreSQL.
		 * @var string
		 */
		var $user;

		/**
		 * Contraseña de la base de datos PostGreSQL.
		 * @var string
		 */
		var $pass;


		public function __construct($database=null,$schema=null){$this->host="asturiasmodelo.dyndns.org";
			//$this->host="192.168.1.66";
			$this->host="asturiasmodelo.dyndns.org";
			$this->port="15432";
			//$this->port="5432";
			if ($database==null)
				//$this->database="Localgis";
				$this->database="geopista";
			else{
				$this->database="visores";
			}
			if ($schema==null)
				$this->schema="public";
			else
				$this->schema=$schema;
			$this->user="visores";
			$this->pass="1234";
			$this->conn = pg_connect("host=".$this->host." port=".$this->port." dbname=".$this->database." password=".$this->pass." user=".$this->user." password=".$this->pass)  or die('Error: '.pg_last_error());
		}
		
		/**
		 * Cierra la conexión existente a la Base de Datos.
		 */
		public function close(){
			pg_close($this->conn);
		}
	}
?>
