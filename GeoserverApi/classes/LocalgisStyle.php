<?php
	/**
	 * Clase que representa un estilo de una capa de LocalGis.
	 */
	class LocalgisStyle {
		/**
		 * Nombre del estilo.
		 * @var string
		 */
		var $name;
		
		/**
		 * Estilo en formato xml.
		 * @var string
		 */
		var $sld;

		/**
		 * @param string $name
		 * @param string $sld
		 */
		public function __construct($name,$sld){
			//$this->name=utf8_encode($name);
			$this->name=$name;
			$this->sld=$sld;
		}
	}
?>
