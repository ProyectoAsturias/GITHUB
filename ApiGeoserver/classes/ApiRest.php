<?php
ini_set("display_errors", "On");
error_reporting(E_ALL);

class ApiRest {
	var $serverUrl = '';
	var $username = '';
	var $password = '';

// Internal stuff
	public function __construct($serverUrl, $username = '', $password = '') {
		if (substr($serverUrl, -1) !== '/') $serverUrl .= '/';
		$this->serverUrl = $serverUrl;
		$this->username = $username;
		$this->password = $password;
	}

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
	public function listWorkspaces() {
		return json_decode($this->runApi('workspaces.json'));
	}

	public function createWorkspace($workspaceName) {
		return $this->runApi('workspaces', 'POST', '<workspace><name>'.htmlentities($workspaceName, ENT_COMPAT).'</name></workspace>');
	}

	public function deleteWorkspace($workspaceName) {
		return $this->runApi('workspaces/'.urlencode($workspaceName), 'DELETE');
	}

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
	public function enableWms($workspaceName){
		return $this->runApi('services/wms/workspaces/'.urlencode($workspaceName).'/settings.xml', 'PUT', '<wms><enabled>true</enabled></wms>');
	}

	public function disableWms($workspaceName){
		return $this->runApi('services/wms/workspaces/'.urlencode($workspaceName).'/settings.xml', 'PUT', '<wms><enabled>false</enabled></wms>');
	}

// Datastore APIs
	public function listDataStores($workspaceName) {
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/datastores.json'));
	}

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

	public function deleteDataStore($workspaceName, $datastoreName) {
		return $this->runApi('workspaces/'.urlencode($workspaceName).'/datastores/'.urlencode($datastoreName), 'DELETE');
	}

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
	public function listLayers($workspaceName, $datastoreName) {
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/datastores/'.urlencode($datastoreName).'/featuretypes.json'));
	}

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

	public function deleteLayer($workspaceName, $datastoreName, $layerName) {
		$this->runApi('layers/'.urlencode($layerName), 'DELETE');
		return $this->runApi('workspaces/'.urlencode($workspaceName).'/datastores/'.urlencode($datastoreName).'/featuretypes/'.urlencode($layerName), 'DELETE');
	}

	public function viewLayer($layerName, $workspaceName, $format = 'GML', $maxGMLFeatures = 1000000, $overrideServerURL = '') {
		// overrideServerURL = useful if using reverseproxy-like configurations
		if ($format == 'GML') {
			//die(urlencode($layerName).'/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='.urlencode($workspaceName).':'.urlencode($layerName).'&maxFeatures='.$maxGMLFeatures);
			return $this->authGet(urlencode($workspaceName).'/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='.urlencode($workspaceName).':'.urlencode($layerName).'&maxFeatures='.$maxGMLFeatures);
		} else if ($format == 'KML') {
			return $this->authGet(urlencode($workspaceName).'/wms/kml?layers='.urlencode($workspaceName).':'.urlencode($layerName));
		}
	}

	public function viewLayerLegend($workspaceName, $width = 20, $height = 20, $layerName) {
		return $this->authGet("wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=$width&HEIGHT=$height&LAYER=".urlencode($workspaceName).':'.urlencode($layerName));
	}

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

	public function executeWFSTransaction($WFSTRequest) {
		// WFS-T is just WFS really...
		return $this->wfsPost('', $WFSTRequest);
	}

// Group APIs
	public function listLayerGroups($workspaceName){
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/layergroups.json'));
	}

	public function listLayerGroup($workspaceName, $groupName){
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/layergroups/'.urlencode($groupName).'/featuretypes.json'));
	}

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
	
	public function deleteLayerGroup($workspaceName, $groupName){
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/layergroups/'.urlencode($groupName), 'DELETE'));
	}

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

	public function addStyleToLayerGroup($workspaceName, $groupName, $styleName){
		return $this->runApi('workspaces/'.urlencode($workspaceName).'/layergroups/'.urlencode($groupName), 'PUT','
			  <styles>
			  	<style>'.htmlentities($styleName, ENT_COMPAT).'</style>
			  </styles>');
	}

	public function deleleLayerFromLayerGroup($workspaceName, $groupName){
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/layergroups/'.urlencode($groupName), 'DELETE'));
	}

// Style APIs
	public function listStyles($layerName,$workspaceName) {	
		return json_decode($this->runApi('layers/'.urlencode($workspaceName).":".urlencode($layerName).'/styles.json'));
	}

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

	public function uploadSldStyle($url_file, $styleName, $workspaceName) {
		$curl='curl -u admin:geoserver -XPUT -H "Content-type: application/vnd.ogc.sld +xml" -d @'.$url_file.' http://localhost:8080/geoserver/rest/workspaces/'.$workspaceName.'/styles/'.$styleName;
		shell_exec($curl);
		//return $this->runApi('workspaces/'.htmlentities($workspaceName, ENT_COMPAT).'/styles/'.htmlentities($styleName, ENT_COMPAT), 'PUT', '@'.htmlentities($url_file, ENT_COMPAT));
	}

	public function addStyleToLayer($layerName, $styleName, $workspaceName) {
		return $this->runApi('layers/'.htmlentities($workspaceName, ENT_COMPAT).':'.htmlentities($layerName, ENT_COMPAT).'/styles', 'POST', '<style><name>'.htmlentities($workspaceName, ENT_COMPAT).':'.htmlentities($styleName, ENT_COMPAT).'</name></style>');
	}

	public function defaultStyleToLayer($layerName, $styleName, $workspaceName) {
		return $this->runApi('layers/'.htmlentities($workspaceName, ENT_COMPAT).':'.htmlentities($layerName, ENT_COMPAT), 'PUT', '<layer><defaultStyle><name>'.htmlentities($workspaceName, ENT_COMPAT).':'.htmlentities($styleName, ENT_COMPAT).'</name></defaultStyle></layer>');
	}

	public function deleteStyle($styleName,$workspaceName) {
		print($styleName."...".$workspaceName);
		return $this->runApi('workspaces/'.htmlentities($workspaceName, ENT_COMPAT)."/styles/".htmlentities($styleName, ENT_COMPAT), 'DELETE');
	}
	
	
// GetCapabilities Info API

	public function updateWmsInfo($workspaceName, $description, $keywords, $title){
		$length= sizeof($keywords);
		$xmlKeywords='<keywords>';
		for($i=0;$i<$length;$i++)
			$xmlKeywords .='<string>'.$keywords[$i].'</string>';
		$xmlKeywords .='</keywords>';
		
		$xml='<wms>'.
			'<workspace><name>'.$workspaceName.'</name></workspace>'.
			'<enabled>true</enabled>'.
			'<name>WMS</name>'.
			'<title>'.$title.'</title>'.
			'<abstrct>'.$description.'</abstrct>'.
			$xmlKeywords.
			'</wms>';
		return $this->runApi('services/wms/workspaces/'.urlencode($workspaceName).'/settings.xml', 'PUT', $xml);
	}
	
	public function updateWsInfo($workspaceName, $contactPerson, $contactOrganization, $contactPosition, $address, $addressType, $city, $stateOrProvince, $country, $postCode, $contactPhone, $fax, $email){
		$xml=	'<settings>'.
					'<workspace>'.
						'<name>'.$workspaceName.'</name>'.
					'</workspace>'.
					'<contact>'.
						'<address>'.$address.'</address>'.
						'<addressCity>'.$city.'</addressCity>'.
						'<addressCountry>'.$country.'</addressCountry>'.
						'<addressPostalCode>'.$postCode.'</addressPostalCode>'.
						'<addressState>'.$stateOrProvince.'</addressState>'.
						'<addressType>'.$addressType.'</addressType>'.
						'<contactEmail>'.$email.'</contactEmail>'.
						'<contactFacsimile>'.$fax.'</contactFacsimile>'.
						'<contactOrganization>'.$contactOrganization.'</contactOrganization>'.
						'<contactPerson>'.$contactPerson.'</contactPerson>'.
						'<contactPosition>'.$contactPosition.'</contactPosition>'.
						'<contactVoice>'.$contactPhone.'</contactVoice>'.
					'</contact>'.
				'</settings>';
			return $this->runApi('workspaces/'.urlencode($workspaceName).'/settings.xml', 'PUT', $xml);
	}

	public function updateLayerInfo($workspaceName, $layerName, $description, $keywords, $title, $isWmsLayer){
		$length= sizeof($keywords);
		$xmlKeywords='<keywords>';
		for($i=1;$i<$length;$i++)
			$xmlKeywords .='<string>'.$keywords[$i].'</string>';
		$xmlKeywords .='</keywords>';
		//Comprobamos primero si la capa pertenece al datastore con la variable $store	
		if ($isWmsLayer=="false"){
			$xml='<featureType>'.
					'<title>'.$title.'</title>'.
					'<abstract>'.$description.'</abstract>'.
					$xmlKeywords.
					'<enabled>true</enabled>'.
					'</featureType>';
			return $this->runApi('workspaces/'.urlencode($workspaceName).'/datastores/'.urlencode($workspaceName).'/featuretypes/'.urlencode($layerName).'.xml', 'PUT', $xml);
		}
		else{
			$xml='<wmsLayer>'.
					'<title>'.$title.'</title>'.
					'<abstract>'.$description.'</abstract>'.
					$xmlKeywords.
					'<enabled>true</enabled>'.
					'</wmsLayer>'
			$wmsStore=$this->getWmsstoreName($workspaceName,$layerName);
			return $this->runApi('workspaces/'.urlencode($workspaceName).'/wmsstores/'.urlencode($wmsStore).'/wmslayers/'.urlencode($layerName).'.xml', 'PUT', $xml);
		}
	}
	
	//wms
	public function listWmsstores($workspaceName) {
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/wmsstores.json'));
	}

	public function listWmsLayers($workspaceName, $wmsstoreName) {
		return json_decode($this->runApi('workspaces/'.urlencode($workspaceName).'/wmsstores/'.urlencode($wmsstoreName).'/wmslayers.json'));
	}

	public function addWmsLayer($workspaceName, $wmsstoreName, $wmsTitle, $description = ''){
		$xml='<wmsLayer>
		<name>'.$wmsTitle.'</name>
		</wmsLayer>';
		return $this->runApi('workspaces/'.urlencode($workspaceName).'/wmsstores/'.urlencode($wmsstoreName).'/wmslayers.xml', 'POST', $xml);
	}

	public function delWmsLayer($workspaceName, $wmsstoreName, $layerName) {
		$this->runApi('layers/'.urlencode($workspaceName).":".urlencode($layerName), 'DELETE');
		return $this->runApi('workspaces/'.urlencode($workspaceName).'/wmsstores/'.urlencode($wmsstoreName).'/wmslayers/'.urlencode($layerName), 'DELETE');
	}

	public function listWmsSize($workspaceName, $wmsstoreName) {
		$listWmsLayers=$this->listWmsLayers($workspaceName, $wmsstoreName);
		if($listWmsLayers!=null){
			$listWmsLayers=$listWmsLayers->wmsLayers->wmsLayer;
			return sizeof($listWmsLayers);
		}
		else
			return 0;
	}
	
	public function getWmsstoreName($workspaceName,$layerName){
		$listWmsstores=$this->listWmsstores($workspaceName)->wmsStores->wmsStore;
		foreach ($listWmsstores as $wmsstore){
		$listWmsLayers=$this->listWmsLayers($workspaceName, $wmsstore->name)->wmsLayers->wmsLayer;
		foreach ($listWmsLayers as $wmsLayer){
			if($wmsLayer->name==$layerName)
				return $wmsstore->name;
			};
		};
		return null;
	}
	
}
