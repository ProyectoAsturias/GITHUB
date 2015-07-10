var map;

$(document).ready(function(){
	assignEventsHandlers();
});


function initMap() {
	map = new ol.Map({
		target : 'map',
		renderer : 'canvas',
		view : new ol.View({
			center : [-434915.610107824, 5380511.6665677687],
			zoom : 8
		})
	});
	console.log(mapName);
	//map.name=;
	//map.id=;
}

/*function newLayer(name,wms) {
	var layer = new ol.layer.Tile({
		source : new ol.source.TileWMS({
function newLayer(name,wms) {
	
	var source = new ol.source.TileWMS({
			preload : Infinity,
			url : wms,
			params : {
				'LAYERS' : name,
				'TILED' : true
			}
		})
	});
	layer.name = name;
	return layer;
}*/

function newLayer(name,wms) {
	var source = new ol.source.TileWMS({
		preload : Infinity,
		url : wms,
		params : {
			'LAYERS' : name,
			'TILED' : true
		}
	})
	var layer = new ol.layer.Tile({source:source});
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
			mapName: mapName
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
					})
				});
				layer.name = name;
				map.addLayer(layer);
				generateNode(layer);
			}
		},
		error:function(error){
			console.log("No funcionó el servidor");
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

function reorderOpenlayersMap(indexFrom, indexTo){
	var movedLayer = map.getLayers().removeAt(indexFrom);
	map.getLayers().insertAt(indexTo, movedLayer);
}

function assignEventsHandlers(){
	eyeIconClickHandler();
	deleteIconClickHandler();
	attributesClickHandler();
}

function eyeIconClickHandler(){
	$(".visibilityLayer").click(function(event){
		if ($(this).parent().data().layer.getVisible()){
			$(this).css("color", "lightgray");
			$(this).parent().data().layer.setVisible(false);
		}else{
			$(this).css("color", "black");
			$(this).parent().data().layer.setVisible(true);
		}
	});
}

function deleteIconClickHandler(){
	$(".removeLayer").click(function(event){
		var parent = $(this).parent();
		bootbox.confirm("¿Realmente desea eliminar esta capa?", function(result) {
			if (result){
				//TODO: Ajax al fichero delLayer con el nombre de la capa y el del mapa.
				removeLayer(parent.data("layer"),function(response){
					parent.fadeOut("slow", function(){
						$(this).remove();
					});
				});
			}
		});
	});
}

function attributesClickHandler(){
	$(".attributesLayer").click(function(event){
		var parent = $(this).parent();
		getJSONLayer(parent.data("layer"), function(attributes){
			var modalHTML = "";
			attributes.features.forEach(function (feature){
				console.log(feature);
				modalHTML += "<div><input type='checkbox' style='vertical-align: middle'/><label>&nbsp;&nbsp;&nbsp;"+feature+"</label></div>"
			})
			$("#modalAttributes .modal-body").html(modalHTML);
			$("#modalAttributes").modal("show");
		})
	});
}

function removeLayer(layer, callback) {
	console.log(map.title);
	$.ajax({
		type: "GET",
		//url : apiPath+"delLayer.php",
		url: "",
		data: {
			layerName: layer.name,
			mapName: map.mapName
		},
		success: function (response) {
			map.removeLayer(layer);
			callback(response);
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
