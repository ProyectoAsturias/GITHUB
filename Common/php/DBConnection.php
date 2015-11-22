<?php
	require_once("configuration.php");
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


		public function __construct($database=null,$schema=null){
			$this->host=$GLOBALS["DBHOST"];
			$this->port=$GLOBALS["DBPORT"];
			if ($database==null)
				$this->database=$GLOBALS["DBLOCALGIS"];
			else{
				$this->database=$GLOBALS["DBVISORES"];
			}
			if ($schema==null)
				$this->schema=$GLOBALS["DBSCHEMA"];
			else
				$this->schema=$schema;
			$this->user=$GLOBALS["DBUSER"];
			$this->pass=$GLOBALS["DBPASS"];
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
