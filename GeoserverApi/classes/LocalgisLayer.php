<?php
	/**
	 * Clase que representa una capa de LocalGis.
	 */
	class LocalgisLayer {
		/**
		 * Id de la capa.
		 * @var int
		 */
		var $id;
		
		/**
		 * Nombre de la capa.
		 * @var string
		 */
		var $name;

		/**
		 * @param int $id
		 * @param string $name
		 */
		public function __construct($id,$name){
			$this->id=$id;
			$this->name=utf8_encode($name);
		}
	}
?>