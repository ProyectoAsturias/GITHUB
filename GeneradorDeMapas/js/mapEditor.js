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
	console.log(layer);
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

function addLayer(name,wms) {
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
	updateTreeLayer();
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