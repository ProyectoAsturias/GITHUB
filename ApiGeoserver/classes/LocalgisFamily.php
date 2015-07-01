<?php
	//include "getLayers.php";

	class LocalgisFamily {
		var $id;
		var $name;
		//var $layers;

		public function __construct($id, $name, $getLayers=true){
			$this->id=$id;
			$this->name=utf8_decode($name);
			//if($getLayers)
				//$this->layers=getLayers($this->id);
		}
	}
?>