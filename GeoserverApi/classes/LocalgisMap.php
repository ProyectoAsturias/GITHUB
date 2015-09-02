<?php
	/**
	 * Clase que representa un mapa de LocalGis.
	 */
	class LocalgisMap {
		/**
		 * Id del mapa.
		 * @var int
		 */
		var $id;
		
		/**
		 * Descripción del mapa.
		 * @var string
		 */
		var $description;
		
		/**
		 * Unidades del mapa.
		 * @var string
		 */
		var $units;
		
		/**
		 * Escala del mapa.
		 * @var string
		 */
		var $scale;
		
		/**
		 * Proyección del mapa.
		 * @var string
		 */
		var $projection;
		
		/**
		 * Srid del mapa.
		 * @var string
		 */
		var $srid;
		
		/**
		 * Nombre del mapa.
		 * @var string
		 */
		var $name;
		
		/**
		 * Imagen del mapa.
		 * @var string
		 */
		var $image;
		
		/**
		 * ID de la entidad del mapa.
		 * @var int
		 */
		var $id_entidad;
		
		/**
		 * ID de la proyección del mapa.
		 * @var int
		 */
		var $projection_id;
		
		/**
		 * Fecha de la creación del mapa.
		 * @var int
		 */
		var $fecha_ins;
		
		/**
		 * Fecha de la última de modificación del mapa.
		 * @var int
		 */
		var $fecha_mod;

		/**
		 * @param int $id
		 * @param string $xml 
		 * @param string $image
		 * @param int $id_entidad
		 * @param int $projection_id
		 * @param date $fecha_ins
		 * @param date $fecha_mod
		 * @param bool $getFamilies
		 */
		public function __construct($id, $name, $xml, $image, $id_entidad, $projection_id, $fecha_ins, $fecha_mod){
			$this->id=$id;
			$this->name=str_replace(" ","_",utf8_encode($name));
			if($xml!=""){
				$data=simplexml_load_string(utf8_encode($xml));
				$this->description=(string)$data->description;
				$this->units=(string)$data->mapUnits;
				$this->scale=(string)$data->mapScale;
				$this->projection=(string)$data->mapProjection;
				$this->srid=(string)$data->mapSrid;
			}
			$this->image=$image;
			$this->id_entidad=$id_entidad;
			$this->projection_id=$projection_id;
			$this->fecha_ins=$fecha_ins;
			$this->fecha_mod=$fecha_mod;
		}
	}
?>
