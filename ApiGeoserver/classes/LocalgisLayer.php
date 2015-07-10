<?php
	//include "getStyles.php";

/**
 * Clase que representa una capa de Localgis.
 */
class LocalgisLayer {
	/**
	 * Id de la capa.
	 * @var
     */
	var $id;
	/**
	 * Nombre de la capa.
	 * @var
     */
	var $name;
	/**
	 * Nombre del ACL asignado en Localgis a esta capa.
	 * @var
     */
	var $acl;
	/**
	 * Id del estilo por defecto asignado a la capa.
	 * @var
     */
	var $id_default_style;
		//var $styles;

	/**
	 * @param $id
	 * @param $name
	 * @param $acl
	 * @param $id_default_style
	 * @param null $getStyles
     */
	public function __construct($id,$name,$acl,$id_default_style,$getStyles=null){
			//print($id.",".$name.",".$acl.",".$id_default_style);
			$this->id=$id;
			$this->name=$name;
			$this->acl=$acl;
			$this->id_default_style=$id_default_style;
			//if($getStyles)
				//$this->styles=getStyles($this->id);
		}
	}
?>