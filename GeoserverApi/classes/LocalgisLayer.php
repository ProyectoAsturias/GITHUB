<?php
	//include "getStyles.php";

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
		 * Nombre del ACL asignado en Localgis a esta capa.
		 * @var string
		 */
		var $acl;
		
		/**
		 * Id del estilo por defecto asignado a la capa.
		 * @var int
		 */
		var $id_default_style;
		
		//var $styles;

		/**
		 * @param int $id
		 * @param string $name
		 * @param string $acl
		 * @param int $id_default_style
		 * @param bool $getStyles
		 */
		public function __construct($id,$name,$acl,$id_default_style,$getStyles=null){
			$this->id=$id;
			$this->name=$name;
			$this->acl=$acl;
			$this->id_default_style=$id_default_style;
			//if($getStyles)
				//$this->styles=getStyles($this->id);
		}
	}
?>