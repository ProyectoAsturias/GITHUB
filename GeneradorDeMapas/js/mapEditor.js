var map;

function initMap() {
	map = new ol.Map({
		target : 'map',
		renderer : 'canvas',
		view : new ol.View({
			center : [-434915.610107824, 5380511.6665677687],
			zoom : 8
		})
	});
}

function newLayer(name,wms) {
	
	var source = new ol.source.TileWMS({
			preload : Infinity,
			url : wms,
			params : {
				'LAYERS' : name,
				'TILED' : true
			}
		})
	var layer = new ol.layer.Tile({source:source})
	layer.name = name;
	updateLoadingBar(source);
	map.addLayer(layer);
	return layer;
}

function addGroup(name,wms,layers) {
	if(layers!=null){
		var layerGroup = new ol.layer.Group({
			layers : layers,
			name : name
		});
		layerGroup.name = name;
		map.addLayer(layerGroup);
		//LOADING
		updateTreeLayer();
	}
	else{
		requestLayersForGroup(name, wms, function (groupLayers) {
			if (groupLayers.length == 0) {
				addLayer(name,wms);
				return;
			}
			var layerGroup = new ol.layer.Group({
				layers : groupLayers
			});
			layerGroup.name = name;
			map.addLayer(layerGroup);
			//LOADING
			updateTreeLayer();
		});
	}
}
/*
*	addLayer primero llama a addLayer.php para introducir la capa en el ws de geoserver
*	Hay que cambiar la url del source de ol.
*/
function addLayer(layerId,layerName,mapId,mapName) {
	$.ajax({
		type : "GET",
		url : apiPath+"addLayer.php",
		data:{
			layerId: layerId,
			layerName: layerName,
			mapId: mapId,
			mapName: mapName,
		},
		success:function (response) {
			if(response !="0"){
				var layer = new ol.layer.Tile({
					source : new ol.source.TileWMS({
						preload : Infinity,
						url : wms,
						params : {
							'LAYERS' : name,
							'TILED' : true
						}
					}),
				});
				layer.name = name;
				map.addLayer(layer);
				generateNode(layer);
			}
		},
		error:function(error){
			alert("Error: "+error);
		}
	});
}

function delLayer(layerName,mapName){
	//primero debemos confirmar la operación de borrado de capa.
	
	//llamada a delLayer.php una vez confirmado el borrado de la capa
	$.ajax({
		type : "GET",
		url : apiPath+"delLayer.php",
		data:{
			layerName: layerName,
			mapName: mapName,
		},
		success:function (response) {
			//eliminamos la capa de ol
			map.removeLayer(layer);
		},
		error:function(error){
			alert("Error: "+error);
		}
	});
}

function requestLayersForGroup(groupName, wms, callback) {
	$.ajax({
		url : wms + "?request=DescribeLayer&service=WMS&version=1.1.1&outputformat=application/json&layers=" + groupName,
		type : "GET",
		complete : function (response) {
			try {
				var objectResponse = JSON.parse(response.responseText);
			} catch (error) {
				callback([]);
				return;
			}
			var groupLayers = [];
			objectResponse.layerDescriptions.forEach(function (layer) {
				var layerName = layer.layerName.split(":")[1];
				var groupLayer = new ol.layer.Tile({
					source : new ol.source.TileWMS({
						preload : Infinity,
						url : wms,
						servertype : "geoserver",
						params : {
							"LAYERS" : layerName,
							"TILED" : true
						}
					}),
					name : layerName
				});
				groupLayers.push(groupLayer);
			});
			callback(groupLayers);
		}
	});
}
/*
function editFeatures(layer){
	//desplegar una ventana modal para seleccionar las features
	
	//llamada a editFeatures.php para indicar que features se han seleccionado
	$.ajax({
		type : "GET",
		url : apiPath+"editFeatures.php",
		success:function (response) {
			
		},
		error:function(error){
			alert("Error: "+error);
		}
	});
}
*/
