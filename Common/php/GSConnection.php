<?php
	/**
	 * Objeto de conexión con Geoserver.
	 */
	class GSConnection {
		/**
		 * Dirección del Host del servidor Geoserver.
		 * @var string
		 */
		var $host;

		/**
		 * Puerto de Geoserver.
		 * @var string
		 */
		var $port;

		/**
		 * Usuario de Geoserver.
		 * @var string
		 */
		var $user;

		/**
		 * Contraseña del usuario de Geoserver.
		 * @var string
		 */
		var $pass;

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
		 * Url del servidor.
		 * @var string
		 */
		var $url;

		

		/**
		 * Configura le objeto Conexión en función del nombre de un Mapa.
		 * @param string $mapName
		 */
		public function __construct($mapName=""){
			$this->host="192.168.1.66";
			$this->port="8090";
			$this->user="admin";
			$this->pass="geoserver";
			$this->wsName=$mapName;
			$this->dsName=$mapName;
			$this->url='http://'.$this->host.':'.$this->port.'/geoserver';
		}
	}
?>
