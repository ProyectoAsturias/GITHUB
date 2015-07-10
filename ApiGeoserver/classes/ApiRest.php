<?php
ini_set("display_errors", "On");
error_reporting(E_ALL);

/**
 * Clase principal para la comunicación con Geoserver. Todas las acciones ejecutadas en éste pasan por esta clase que ejecutará los CURL necesarios.
 */
class ApiRest {
	/**
	 * @var string
	 * Url que apunta a Geoserver
     */
	var $serverUrl = '';
	/**
	 * @var string
	 * Usuario de Geoserver con el que se ejecutarán las acciones.
     */
	var $username = '';
	/**
	 * @var string
	 * Contraseña del usuario.
     */
	var $password = '';

// Internal stuff
	/**
	 * Constructor de la clase.
	 * @param $serverUrl
	 * @param string $username
	 * @param string $password
     */
	public function __construct($serverUrl, $username = '', $password = '') {
		if (substr($serverUrl, -1) !== '/') $serverUrl .= '/';
		$this->serverUrl = $serverUrl;
		$this->username = $username;
		$this->password = $password;
	}

	/**
	 * Comprobación de la autenticación del usuario/contraseña proporcionadas en el constructor.
	 * @param $apiPath Ruta hasta la API de Geoserver.
	 * @return mixed|string Devuelve el resultado de la petición de autenticación si tiene éxito, si se produce un error de autenticación devuelve una String.
     */
	private function authGet($apiPath) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $this->serverUrl.$apiPath);
		curl_setopt($ch, CURLOPT_USERPWD, $this->username.":".$this->password); 
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$rslt = curl_exec($ch);
		$info = curl_getinfo($ch);
		
		if ($info['http_code'] == 401) {
			return 'Access denied. Check login credentials.';
		} else {
			return $rslt;
		}
	}

	/**
	 * Ejecución de operaciones sobre la API de Geoserver a través de peticiones CURL.
	 * @param $apiPath	Ruta hasta la API de Geoserver.
	 * @param string $method	Método que ejecutar sobre la API de Geoserver.
	 * @param string $data	Información a envíar en la petición CURL.
	 * @param string $contentType	Tipo de la información enviada.
	 * @return mixed|string Devuelve la respuesta a la petición o una String en caso de no tener los permisos necesarios.
     */
	private function runApi($apiPath, $method = 'GET', $data = '', $contentType = 'text/xml') {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $this->serverUrl.'rest/'.$apiPath);
		curl_setopt($ch, CURLOPT_USERPWD, $this->username.":".$this->password); 
		if ($method == 'POST') {
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		} else if ($method == 'DELETE' || $method == 'PUT') {
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
		}
		if ($data != '') {
			curl_setopt($ch, CURLOPT_HTTPHEADER, 
				array("Content-Type: $contentType",
				'Content-Length: '.strlen($data))
			);
		}
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		
		$rslt = curl_exec($ch);
		$info = curl_getinfo($ch);
		if ($info['http_code'] == 401) {
			return 'Access denied. Check login credentials.';
		} else {
			return $rslt;
		}
	}

// Workspace APIs
	/**
	 * Devuelve un listado de todos los workspaces existentes en el servidor Geoserver.
	 * @return mixed
     */
	public function listWorkspaces() {
		return json_decode($this->runApi('workspaces.json'));
	}

	/**
	 * Crea un workspace en el servidor Geoserver.
	 * @param $workspaceName
	 * @return mixed|string	Devuelve una String con el resultado de la petición
     */
	public function createWorkspace($workspaceName) {
		return $this->runApi('workspaces', 'POST', '<workspace><name>'.htmlentities($workspaceName, ENT_COMPAT).'</name></workspace>');
	}

	/**
	 * Elimina un workspace del servidor Geoserver.
	 * @param $workspaceName
	 * @return mixed|string	Devuelve una String con el resultado de la petición
     */
	public function deleteWorkspace($workspaceName) {
		return $this->runApi('workspaces/'.urlencode($workspaceName), 'DELETE');
	}

	/**
	 * Comprueba si existe o no un workspace en el servidor Geoserver.
	 * @param $workspaceName
	 * @return bool
     */
	public function existsWorkspace($workspaceName){
		$listWorkspaces=$this->listWorkspaces();
		if(isset($listWorkspaces->workspaces->workspace)){
			foreach ($listWorkspaces->workspaces->workspace as $ws)
			{
			    if($ws->name==$workspaceName)
			    	return true;
			};
		}
		return false;
	}

	/**
	 * Activa el servicio WMS para un Workspace existente en Geoserver.
	 * @param $workspaceName
	 * @return mixed|string Devuelve una String con el resultado de la petición
     */
	public function enableWms($workspaceName){
		return $this->runApi('services/wms/workspaces/'.urlencode($workspaceName).'/settings.xml', 'PUT', '<wms><enabled>true</enabled></wms>');
	}

	/**
	 * Desactiva el servicio WMS para un Workspace existente en Geoserver.
	 * @param $workspaceName
	 * @return mixed|string
     */
	public function disableWms($workspaceName){
		return $this->runApi('services/wms/workspaces/'.urlencode($workspaceName).'/settings.xml', 'PUT', '<wms><enabled>false</enabled></wms>');
	}

// Datastore APIs
	/**
	 * Lista todos los DataStores asociados a un Workspace.
	 * @param $workspaceName
	 * @return mixed
     */
	public function listDataStores($workspaceName) {
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/datastores.json'));
	}

	/**
	 * Creación de un almacen de datos vinculado a una tabla en una base de datos postgresl.
	 * @param $workspaceName
	 * @param $datastoreName
	 * @param $databaseSchema
	 * @param $databaseName
	 * @param $databaseUser
	 * @param $databasePass
	 * @param string $databaseHost
	 * @param string $databasePort
	 * @return mixed|string
     */
	public function createPostGISDataStore($workspaceName, $datastoreName, $databaseSchema, $databaseName, $databaseUser, $databasePass, $databaseHost = 'localhost', $databasePort = '5432') {
		return $this->runApi('workspaces/'.urlencode($workspaceName).'/datastores', 'POST', '<dataStore>
			<name>'.htmlentities($datastoreName, ENT_COMPAT).'</name>
			<type>PostGIS</type>
			<enabled>true</enabled>
			<connectionParameters>
				<entry key="port">'.htmlentities($databasePort, ENT_COMPAT).'</entry>
				<entry key="Connection timeout">20</entry>
				<entry key="passwd">'.htmlentities($databasePass, ENT_COMPAT).'</entry>
				<entry key="dbtype">postgis</entry>
				<entry key="host">'.htmlentities($databaseHost, ENT_COMPAT).'</entry>
				<entry key="validate connections">true</entry>
				<entry key="encode functions">false</entry>
				<entry key="max connections">10</entry>
				<entry key="database">'.htmlentities($databaseName, ENT_COMPAT).'</entry>
				<entry key="namespace">http://'.htmlentities($workspaceName, ENT_COMPAT).'</entry>
				<entry key="schema">'.htmlentities($databaseSchema, ENT_COMPAT).'</entry>
				<entry key="Loose bbox">true</entry>
				<entry key="Expose primary keys">false</entry>
				<entry key="fetch size">1000</entry>
				<entry key="Max open prepared statements">50</entry>
				<entry key="preparedStatements">false</entry>
				<entry key="Estimated extends">true</entry>
				<entry key="user">'.htmlentities($databaseUser, ENT_COMPAT).'</entry>
				<entry key="min connections">1</entry>
			</connectionParameters>
			</dataStore>');
	}

	/**
	 * @return mixed|string
	 * @param $workspaceName
	 * @param $datastoreName
	 * @param $location
     */
	public function createShpDirDataStore($workspaceName, $datastoreName, $location) {
		return $this->runApi('workspaces/'.urlencode($workspaceName).'/datastores', 'POST', '<dataStore>
			<name>'.htmlentities($datastoreName, ENT_COMPAT).'</name>
			<type>Directory of spatial files (shapefiles)</type>
			<enabled>true</enabled>
			<connectionParameters>
				<entry key="memory mapped buffer">false</entry>
				<entry key="timezone">America/Boise</entry>
				<entry key="create spatial index">true</entry>
				<entry key="charset">ISO-8859-1</entry>
				<entry key="filetype">shapefile</entry>
				<entry key="cache and reuse memory maps">true</entry>
				<entry key="url">file:'.htmlentities($location, ENT_COMPAT).'</entry>
				<entry key="namespace">'.htmlentities($workspaceName, ENT_COMPAT).'</entry>
			</connectionParameters>
			</dataStore>');
	}

	/**
	 * Elimina un DataStore perteneciente a un Workspace.
	 * @param $workspaceName
	 * @param $datastoreName
	 * @return mixed|string
     */
	public function deleteDataStore($workspaceName, $datastoreName) {
		return $this->runApi('workspaces/'.urlencode($workspaceName).'/datastores/'.urlencode($datastoreName), 'DELETE');
	}

	/**
	 * Comprueba la existencia de un DataStore asignado a un Workspace.
	 * @param $workspaceName
	 * @param $datastoreName
	 * @return bool
     */
	public function existsDatastore($workspaceName, $datastoreName){
		$listDatastores=$this->listDataStores($workspaceName);
		if(isset($listDatastores->dataStores->dataStore)){
			foreach ($listDatastores->dataStores->dataStore as $ds)
			{
			    if($ds->name==$datastoreName)
			    	return true;
			};
		}
		return false;
	}


// Layer APIs
	/**
	 * Lista todas las capas de un DataStore asociado a un WorkSpace.
	 * @param $workspaceName
	 * @param $datastoreName
	 * @return mixed
     */
	public function listLayers($workspaceName, $datastoreName) {
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/datastores/'.urlencode($datastoreName).'/featuretypes.json'));
	}

	/**
	 * Añade una capa nueva a un DataStore asignado a un Workspace.
	 * @param $workspaceName	Workspace al que está asociado el DataStore.
	 * @param $datastoreName	DataStore en el que almacenar la capa.
	 * @param $layerName	Nombre de la capa.
	 * @param string $description	Descripción de la capa.
	 * @param $proj Proyección de la capa.
	 * @return mixed|string
     */
	public function addLayer($workspaceName, $datastoreName, $layerName, $description = '', $proj){
		/*return 'workspaces/'.urlencode($workspaceName).'/datastores/'.urlencode($datastoreName).'/featuretypes.xml'.' # POST # <featureType>'.
			'<name>'.$layerName.'</name>'.
			'<nativeName>'.$layerName.'</nativeName>'.
			'<description>'.htmlentities($description, ENT_COMPAT).'</description>'.
			'<store class="dataStore"><name>'.htmlentities($datastoreName, ENT_COMPAT).'</name></store>'.
			'</featureType>';*/
		$srs="";
		if($proj==null)
			$srs='<srs>EPSG:23030</srs>';
		$xml='<featureType>'.
			'<name>'.$layerName.'</name>'.
			'<nativeName>'.$layerName.'</nativeName>'.
			$srs.
			'<description>'.htmlentities($description, ENT_COMPAT).'</description>'.
			'<store class="dataStore"><name>'.htmlentities($datastoreName, ENT_COMPAT).'</name></store>'.
			'</featureType>';

		if($this->existsWorkspace($workspaceName) && $this->existsDatastore($workspaceName, $datastoreName))
			return $this->runApi('workspaces/'.urlencode($workspaceName).'/datastores/'.urlencode($datastoreName).'/featuretypes.xml', 'POST', $xml);
		return "Workspace or Datastore don't exists";
	}

	/**
	 * Elimina una capa de un DataStore asignado a un Workspace.
	 * @param $workspaceName
	 * @param $datastoreName
	 * @param $layerName
	 * @return mixed|string
     */
	public function deleteLayer($workspaceName, $datastoreName, $layerName) {
		$this->runApi('layers/'.urlencode($layerName), 'DELETE');
		return $this->runApi('workspaces/'.urlencode($workspaceName).'/datastores/'.urlencode($datastoreName).'/featuretypes/'.urlencode($layerName), 'DELETE');
	}

	/**
	 * Obtiene las Features asignadas a una Capa.
	 * @param $layerName
	 * @param $workspaceName
	 * @param string $format
	 * @param int $maxGMLFeatures
	 * @param string $overrideServerURL
	 * @return mixed|string
     */
	public function viewLayer($layerName, $workspaceName, $format = 'GML', $maxGMLFeatures = 1000000, $overrideServerURL = '') {
		// overrideServerURL = useful if using reverseproxy-like configurations
		if ($format == 'GML') {
			//die(urlencode($layerName).'/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='.urlencode($workspaceName).':'.urlencode($layerName).'&maxFeatures='.$maxGMLFeatures);
			return $this->authGet(urlencode($workspaceName).'/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='.urlencode($workspaceName).':'.urlencode($layerName).'&maxFeatures='.$maxGMLFeatures);
		} else if ($format == 'KML') {
			return $this->authGet(urlencode($workspaceName).'/wms/kml?layers='.urlencode($workspaceName).':'.urlencode($layerName));
		}
	}

	/**
	 * Obtiene la Leyenda de una Capa.
	 * @param $workspaceName
	 * @param int $width
	 * @param int $height
	 * @param $layerName
	 * @return mixed|string
     */
	public function viewLayerLegend($workspaceName, $width = 20, $height = 20, $layerName) {
		return $this->authGet("wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=$width&HEIGHT=$height&LAYER=".urlencode($workspaceName).':'.urlencode($layerName));
	}

	/**
	 * Ejecuta una petición Post sobre el servicio WFS de la API de Geoserver.
	 * @param $apiPath
	 * @param $post
	 * @return mixed|string
     */
	public function wfsPost($apiPath, $post) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $this->serverUrl.'wfs'.$apiPath);
		curl_setopt($ch, CURLOPT_USERPWD, $this->username.":".$this->password); 
		if ($post != '') {
			curl_setopt($ch, CURLOPT_HTTPHEADER, 
				array("Content-Type: text/xml",
				'Content-Length: '.strlen($post))
			);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
		}
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$rslt = curl_exec($ch);
		$info = curl_getinfo($ch);

		if ($info['http_code'] == 401) {
			return 'Access denied. Check login credentials.';
		} else {
			return $rslt;
		}
	}

	/**
	 * Ejecuta una petición sobre el servicio WFS.
	 * @param $WFSTRequest
	 * @return mixed|string
     */
	public function executeWFSTransaction($WFSTRequest) {
		// WFS-T is just WFS really...
		return $this->wfsPost('', $WFSTRequest);
	}

// Group APIs
	/**
	 * Lista todos los grupos de Capas de un Workspace.
	 * @param $workspaceName
	 * @return mixed
     */
	public function listLayerGroups($workspaceName){
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/layergroups.json'));
	}

	/**
	 * Lista todas las capas de un grupo perteneciente a un Workspace.
	 * @param $workspaceName
	 * @param $groupName
	 * @return mixed
     */
	public function listLayerGroup($workspaceName, $groupName){
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/layergroups/'.urlencode($groupName).'/featuretypes.json'));
	}

	/**
	 * Crea un Grupo asignado a un Workspace conteniendo las Capas indicadas por parámetro.
	 * @param $workspaceName
	 * @param $groupName
	 * @param $layers Objeto que contiene el nombre de las capas que formarán el grupo.
	 * @return mixed|string
     */
	public function createLayerGroup($workspaceName, $groupName, $layers){
		$layersXml="";
		$stylesXml="";
		$aux=array();
		foreach ($layers as $layerName) {

			if(!in_array($layerName, $aux, true)){
				array_push($aux,$layerName);
				$layersXml=$layersXml.'<layer>'.htmlentities($workspaceName.':'.$layerName, ENT_COMPAT).'</layer>';
				$stylesXml=$stylesXml.'<style></style>';
			}
		}

		return $this->runApi('workspaces/'.urlencode($workspaceName).'/layergroups', 'POST',
			'<layerGroup>
			  <name>'.htmlentities($groupName, ENT_COMPAT).'</name>
			  <layers>'.$layersXml.'</layers>
			  <styles>'.$stylesXml.'</styles>
			</layerGroup>');
	}

	/**
	 * Elimina un Grupo de un Workspace.
	 * @param $workspaceName
	 * @param $groupName
	 * @return mixed
     */
	public function deleteLayerGroup($workspaceName, $groupName){
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/layergroups/'.urlencode($groupName), 'DELETE'));
	}

	/**
	 * Añade una capa a un grupo ya existente.
	 * @param $workspaceName
	 * @param $groupName
	 * @param $layerName
	 * @return mixed|string
     */
	public function addLayerToLayerGroup($workspaceName, $groupName, $layerName){
		$layersXml="";
		$stylesXml="";
		$listGroup = $this->listLayerGroup($workspaceName, $groupName);
		$aux=array();
		if(isset($listGroup->layerGroup->publishables->published)){
			$published=$listGroup->layerGroup->publishables->published;
			if(is_array($published)){
				foreach ($published as $ft){
					array_push($aux,$ft->name);
					$layersXml=$layersXml.'<layer>'.htmlentities($workspaceName.':'.$ft->name, ENT_COMPAT).'</layer>';
	    			$stylesXml=$stylesXml.'<style></style>';
				};
			}
		}

		if(!in_array($layerName, $aux, true)){
    		$layersXml=$layersXml.'<layer>'.htmlentities($workspaceName.':'.$layerName, ENT_COMPAT).'</layer>';
    		$stylesXml=$stylesXml.'<style></style>';
    	}

		return $this->runApi('workspaces/'.urlencode($workspaceName).'/layergroups/'.urlencode($groupName), 'PUT',
			  '<layerGroup>
				  <layers>'.$layersXml.'</layers>
				  <styles>'.$stylesXml.'</styles>
			  </layerGroup>');
	}

	/**
	 * Añade un estilo a un Grupo de Capas.
	 * @param $workspaceName
	 * @param $groupName
	 * @param $styleName
	 * @return mixed|string
     */
	public function addStyleToLayerGroup($workspaceName, $groupName, $styleName){
		return $this->runApi('workspaces/'.urlencode($workspaceName).'/layergroups/'.urlencode($groupName), 'PUT','
			  <styles>
			  	<style>'.htmlentities($styleName, ENT_COMPAT).'</style>
			  </styles>');
	}

	/**
	 * Elimina una Capa de un Grupo ya existente.
	 * @param $workspaceName
	 * @param $groupName
	 * @return mixed
     */
	public function deleleLayerFromLayerGroup($workspaceName, $groupName){
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/layergroups/'.urlencode($groupName), 'DELETE'));
	}

// Style APIs
	/**
	 * Lista los estilos de una Capa.
	 * @param $layerName
	 * @param $workspaceName
	 * @return mixed
     */
	public function listStyles($layerName,$workspaceName) {
		return json_decode($this->runApi('layers/'.urlencode($workspaceName).":".urlencode($layerName).'/styles.json'));
	}

	/**
	 * Crea un estilo que se almacena en un Workspace.
	 * @param $SLD
	 * @param $styleName
	 * @param $workspaceName
	 * @return mixed|string
     */
	public function createStyle($SLD, $styleName, $workspaceName) {
		//curl -v -u admin:geoserver -XPOST -H 'Content-type: application/xml' -d '<style><name>tmp</name><filename>sld.prueba</filename></style>' http://localhost:8080/geoserver/rest/workspaces/Arbolado/styles
		$dir='styles/';
		$file_sld = $styleName.'.sld';
		if (!file_exists($dir) || !is_dir($dir))
			mkdir($dir,0777);
		$SLD=str_replace(",", " ", $SLD);
		$fp = fopen($dir.$file_sld, 'w');
		fwrite($fp, $SLD);
		fclose($fp);

		$style='<style><name>'.htmlentities($styleName, ENT_COMPAT).'</name><filename>'.htmlentities($dir.$file_sld, ENT_COMPAT).'</filename></style>';
		$result=$this->runApi('workspaces/'.urlencode($workspaceName).'/styles', 'POST', $style);
		if ($result!="")
			return $result;
		else
			$this->uploadSldStyle($dir.$file_sld, $styleName, $workspaceName);
	}

	/**
	 * Sube un fichero SLD para ser asignado a un estilo de un Workspace.
	 * @param $url_file
	 * @param $styleName
	 * @param $workspaceName
     */
	public function uploadSldStyle($url_file, $styleName, $workspaceName) {
		$curl='curl -u admin:geoserver -XPUT -H "Content-type: application/vnd.ogc.sld +xml" -d @'.$url_file.' http://localhost:8080/geoserver/rest/workspaces/'.$workspaceName.'/styles/'.$styleName;
		shell_exec($curl);
		//return $this->runApi('workspaces/'.htmlentities($workspaceName, ENT_COMPAT).'/styles/'.htmlentities($styleName, ENT_COMPAT), 'PUT', '@'.htmlentities($url_file, ENT_COMPAT));
	}

	/**
	 * Añade un estilo a una capa.
	 * @param $layerName
	 * @param $styleName
	 * @param $workspaceName
	 * @return mixed|string
     */
	public function addStyleToLayer($layerName, $styleName, $workspaceName) {
		return $this->runApi('layers/'.htmlentities($workspaceName, ENT_COMPAT).':'.htmlentities($layerName, ENT_COMPAT).'/styles', 'POST', '<style><name>'.htmlentities($workspaceName, ENT_COMPAT).':'.htmlentities($styleName, ENT_COMPAT).'</name></style>');
	}

	/**
	 * Asigna un estilo de una capa como Estilo por defecto.
	 * @param $layerName
	 * @param $styleName
	 * @param $workspaceName
	 * @return mixed|string
     */
	public function defaultStyleToLayer($layerName, $styleName, $workspaceName) {
		return $this->runApi('layers/'.htmlentities($workspaceName, ENT_COMPAT).':'.htmlentities($layerName, ENT_COMPAT), 'PUT', '<layer><defaultStyle><name>'.htmlentities($workspaceName, ENT_COMPAT).':'.htmlentities($styleName, ENT_COMPAT).'</name></defaultStyle></layer>');
	}

	/**
	 * Elimina un estilo de un Workspace.
	 * @param $styleName
	 * @param $workspaceName
	 * @return mixed|string
     */
	public function deleteStyle($styleName,$workspaceName) {
		print($styleName."...".$workspaceName);
		return $this->runApi('workspaces/'.htmlentities($workspaceName, ENT_COMPAT)."/styles/".htmlentities($styleName, ENT_COMPAT), 'DELETE');
	}
}
