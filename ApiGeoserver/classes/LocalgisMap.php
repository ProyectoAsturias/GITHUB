
<?php
	include "LocalgisFamily.php";

	class LocalgisMap {
		var $id;
		var $mapDescription;
		var $mapUnits;
		var $mapScale;
		var $mapProjection;
		var $mapSrid;
		var $mapName;
		var $image;
		var $id_entidad;
		var $projection_id;
		var $fecha_ins;
		var $fecha_mod;
		var $families;

		public function __construct($id, $xml, $image, $id_entidad, $projection_id, $fecha_ins, $fecha_mod, $getFamilies=true){
			$this->id=$id;
			if($xml!=""){
				$data=simplexml_load_string(utf8_encode($xml));
				$this->mapDescription=(string)$data->description;
				$this->mapUnits=(string)$data->mapUnits;
				$this->mapScale=(string)$data->mapScale;
				$this->mapProjection=(string)$data->mapProjection;
				$this->mapSrid=(string)$data->mapSrid;
				$this->mapName=str_replace(" ","_",$data->mapName);
			}
			$this->image=$image;
			$this->id_entidad=$id_entidad;
			$this->projection_id=$projection_id;
			$this->fecha_ins=$fecha_ins;
			$this->fecha_mod=$fecha_mod;
			if($getFamilies){
				$this->families=$this->getFamilies($this->id);
			}
		}

		public function getFamilies($idMap) {
			$connection = new ServerConnection();
			$query = "SELECT lf.id_layerfamily,lf.id_name FROM maps_layerfamilies_relations as r, layerfamilies as lf WHERE r.id_map = '".$idMap."' AND r.id_layerfamily=lf.id_layerfamily";
			$result = pg_query($query) or die('Error: '.pg_last_error());
			$families = array();
			$i = 0;
			while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
				$family_attributes = array();
				$j = 0;
			    foreach ($line as $col_value) {
			        $family_attributes[$j++]=$col_value;
			    }
			    $families[$i++]= new LocalgisFamily($family_attributes[0]);
			}
			return json_encode($families);
		}
	}
?>