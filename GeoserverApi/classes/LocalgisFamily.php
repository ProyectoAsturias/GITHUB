<?php
	/**
	 * Clase que representa una familia de capas de LocalGis.
	 */
	class LocalgisFamily {
		/**
		 * Id de la familia.
		 * @var int
		 */
		var $id;
		
		/**
		 * Nombre de la familia.
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