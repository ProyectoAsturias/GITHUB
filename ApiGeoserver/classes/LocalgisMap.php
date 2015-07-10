
<?php
	//include "getFamilies.php";

/**
 * Clase que representa un mapa de LocalGis.
 */
class LocalgisMap {
		var $id;
		var $description;
		var $usnits;
		var $scale;
		var $projection;
		var $srid;
		var $name;
		var $image;
		var $id_entidad;
		var $projection_id;
		var $fecha_ins;
		var $fecha_mod;
		//var $families;

		public function __construct($id, $xml, $image, $id_entidad, $projection_id, $fecha_ins, $fecha_mod, $getFamilies=true){
			$this->id=$id;
			if($xml!=""){
				$data=simplexml_load_string(utf8_encode($xml));
				$this->description=(string)$data->description;
				$this->units=(string)$data->mapUnits;
				$this->scale=(string)$data->mapScale;
				$this->projection=(string)$data->mapProjection;
				$this->srid=(string)$data->mapSrid;
				$this->name=str_replace(" ","_",$data->mapName);
			}
			$this->image=$image;
			$this->id_entidad=$id_entidad;
			$this->projection_id=$projection_id;
			$this->fecha_ins=$fecha_ins;
			$this->fecha_mod=$fecha_mod;
			//if($getFamilies)
				//$this->families=getFamilies($this->id);
		}
	}
?>