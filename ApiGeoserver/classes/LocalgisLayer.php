<?php
	//include "getStyles.php";

	class LocalgisLayer {
		var $id;
		var $name;
		var $acl;
		var $id_default_style;
		//var $styles;

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