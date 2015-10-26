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

		/**i
		 * @param string $name
		 * @param string $sld
		 */
		public function __construct($name,$sld){
			//$this->name=utf8_encode($name);
			$this->name=$name;
			$this->sld=$this->applyTraducctions($sld);
		}

		private function applyTraducctions($sld){
			if ($sld=="")
				return null;
			$simpleXml = simplexml_load_string($sld);
			//if($simpleXml->children('sld',true) and $simpleXml->children('sld',true)->NamedLayer->UserStyle->FeatureTypeStyle and $simpleXml->children('sld',true)->NamedLayer->UserStyle->FeatureTypeStyle->Rule){
			if($simpleXml and $simpleXml->NamedLayer and $simpleXml->NamedLayer->UserStyle and $simpleXml->NamedLayer->UserStyle->FeatureTypeStyle and $simpleXml->NamedLayer->UserStyle->FeatureTypeStyle->Rule){	
				//$rules=$simpleXml->children('sld',true)->NamedLayer->UserStyle->FeatureTypeStyle->Rule;
				$rules=$simpleXml->NamedLayer->UserStyle->FeatureTypeStyle->Rule;
				foreach($rules as $rule){
					if($rule->TextSymbolizer and $rule->TextSymbolizer->Label and $rule->TextSymbolizer->Label->children('ogc',true)){
						$text=$rule->TextSymbolizer->Label->children('ogc',true)->PropertyName;		
						$trad=$this->traduce($text);
						if($trad!="")
							$rule->TextSymbolizer->Label->children('ogc',true)->PropertyName=$trad;		
						//var_dump($rule->TextSymbolizer->Label->children('ogc',true)->PropertyName);
					}
				}
				return $simpleXml->asXML();
			}
			return null;	
		}
		
		private function traduce($text){
			//La conex con base de datos ya viene de antes
		 	//$dbCon = new DBConnection();
			$query="SELECT DISTINCT columns.name
                                FROM
                                  public.layers,
                                  public.attributes,
                                  public.columns,
                                  public.dictionary
                                WHERE
                                  attributes.id_layer = layers.id_layer AND
                                  attributes.id_column = columns.id AND
                                  dictionary.id_vocablo = attributes.id_alias AND
                                  dictionary.locale = 'es_ES' AND
                                  dictionary.traduccion = '".$text."';";
			//var_dump($query);
                        $result = pg_query($query) or die('Error: '.pg_last_error());
			//var_dump($result);
			$trad="";
			$numrows = pg_num_rows($result);
		
			if($numrows==1)
				$trad = pg_fetch_result($result, 0, 0);

                        //$dbCon->close();
			return $trad;	
		}
	}
?>
