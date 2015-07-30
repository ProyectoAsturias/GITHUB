var map;

/**
* Inicialización de la variable map de openlayers 3
**/
function initMap() {
	//console.log(mapName);
	$("#editWmsButton").append("<h2>"+mapName+"</h2>");
	//console.log(userName);
	$("#userName").append(userName);
	map = new ol.Map({
		target : 'map',
		renderer : 'canvas',
		view : new ol.View({
			center : [-434915.610107824, 5380511.6665677687],
			zoom : 8
		})
	});
	map.name=mapName;
	map.town=39073;
	map.projection=23030;
	drawTree();
}

/**
* Añade una capa sobre el objeto map
**/
function addLayer(name,wms) {
	//console.log(map.name+":"+name);
	//console.log(wms);
	var source = new ol.source.TileWMS({
		preload : Infinity,
		url : wms,
		params : {
			'LAYERS' : map.name+":"+name,
			'TILED' : true,
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
			updateTreeLayer();
		});
	}
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

function removeLayer(layer, callback) {
	if(!layer.wms){
		console.log("Capa Normal");
		$.ajax({
			type: "POST",
			url : apiPath+"apiGeoserver.php",
			data : {
				tag:"delLayer",
				mapName: map.name,
				layerName: layer.name
			},
			success: function (response) {
				console.log("##"+response+"##");
				if(response=="\n0"){
					//console.log(layer.name);
					map.removeLayer(layer);
					//console.log(map.getLayers().getArray().length);
				}
				updateDatabaseMap();
				callback(response);
			},
			error:function(error){
				alert("Error al eliminar una capa : "+error);
			}
		});
	}
	else{
		console.log("Capa WMS");
		$.ajax({
			type: "POST",
			url : apiPath+"apiGeoserver.php",
			data : {
				tag:"delWmsLayer",
				mapName: map.name,
				wmsName: layer.wms,
				layerName: layer.name
			},
			success: function (response) {
				//console.log("##"+response+"##");
				if(response=="\n0"){
					//console.log(layer.name);
					map.removeLayer(layer);
					//console.log(map.getLayers().getArray().length);
				}
				callback(response);
			},
			error:function(error){
				alert("Error al eliminar una capa wms: "+error);
			}
		});
	}
}

/**
* Carga un wms en Geoserver
**/
function importWms(wms) {
	/*var wms;
	if($('#wms').val()!="")
		wms=$('#wms').val();
	else if($("#selectWms").val()!=null)
		wms=$("#selectWms").val();
	else
		return;*/
	//Obtener title y lista de capas que forman el wms
	$.ajax({
		type : "GET",
		jsonp : "callback",
		dataType : 'text',
		url : wms+'?request=getCapabilities&service=wms',
		crossDomain : true,
		success:function (response) {
			//console.log(response)
			var parser = new ol.format.WMSCapabilities();
			var service = parser.read(response);
			var capabilities = service.Capability;
			var title = service.Service.Title;
			title=title.replace(/ /gi,'_');
			var listLayers = [];
			
			for(var i=0; i<capabilities.Layer.Layer.length; i++)
				listLayers.push(capabilities.Layer.Layer[i].Name);
			$.ajax({
				type: "POST",
				url: apiPath+"apiGeoserver.php",
				data:{
					tag: 'addWms',
					mapName: map.name,
					wmsName: title,
					wmsUrl: wms,
					listLayers: listLayers
				},
				success: function(response){

					//console.log(response);

					drawTree();
				},
				error: function(error) {
					console.log("Error al cargar el mapa: ".error);				 
				}
			});

		},
		error:function(error){

			alert("Error al importar un wms: "+error);

		}
	});
}

/**
* Carga el mapa completo en Geoserver
**/
function importMap(){
	if($("#selectMap").val()!=null){
		var id=$("#selectMap").val();

		console.log("Importando map: #"+id);
		$.ajax({
			type: "POST",
			url : apiPath+"apiLocalgis.php",
			data : {
				tag:"getMapLayers",
				idMap: id
			},
			success: function(response){
				//console.log(response);
				var layerList = JSON.parse(response);
				for(var i=0; i<layerList.length; i++){
					importLayer(layerList[i]);
				}
				//Guardar campos en MAP
				saveAttributes(id,layerList);
				//Importar ortofoto
				$.ajax({
					type: "POST",
					url : apiPath+"apiLocalgis.php",
					data : {
						tag:"getWmsLayers",
						idMap: id,
					},
					success: function(response){
						var ortoFotos=JSON.parse(response);
						for(var i=0; i<ortoFotos.length; i++){
							var wms=ortoFotos[i].id.split("?");
							console.log(wms[0]);
							importWms(wms[0]);
						}
					},
					error: function(response){
						console.log(response);
					}
				})
			},
			error: function(error) {
				console.log("Error al cargar el mapa: ".error);				 
			}
		});
	}
	else{
		console.log("Selector de mapas vacío.");
	}
}

/**
* Carga la familia completa en OpenLayers
**/
function importFamily(familyId){	
	if($("#selectFamily").val()!=null || familyId!=null){
		var id=$("#selectFamily").val() || familyId;

		console.log("Importando familia: #"+id);

		$.ajax({
			type: "POST",
			url : apiPath+"apiLocalgis.php",
			data : {
				tag:"getLayers",
				idFamily: id
			},
			success: function(response){
				//console.log(response);
				var layerList = JSON.parse(response);
				for(var i=0; i<layerList.length; i++){
					importLayer(layerList[i]);
				}
			},
			error: function(error) {
				console.log("Error al cargar la familia de capas: ".error);				 
			}
		});
	}
	else{
		console.log("Selector de familias vacío.");
	}
}

/**
* Actualiza el mapa de la base de datos propia, extrayendo los campos de cada capa
**/
function updateDatabaseMap(){
	var layersInfo=[];
	var reverseLayers = map.getLayers().getArray().slice(0).reverse();
	var i=0;
	reverseLayers.forEach(function (layer) {
		if(layer.base!=true){
			layersInfo.push(layer.name);
		}
	});
	reverseLayers.forEach(function (layer) {
		if(layer.base!=true){
			getJSONLayer(layer, function(viewAttributes){
				var index = layersInfo.indexOf(viewAttributes.id[0]);
				layersInfo[index]=[viewAttributes,layer.getOpacity()];
				updateDatabaseMapInfo(i++,layersInfo);
			})
		}
	});
}

/**
* Actualiza el mapa de la base de datos propia
**/
function updateDatabaseMapInfo(i,layersInfo){
	if(i==map.getLayers().getArray().slice(0).reverse().length-2){
		$.ajax({
			type: "POST",
			url : apiPath+"apiDatabase.php",
			data : {
				tag:"updateMapInfo",
				mapName: map.name,
				layersInfo: layersInfo
			},
			success: function(response){
				console.log(response);
			},
			error: function(error) {
				console.log("Error al guardar la información en MAPS: ".error);				 
			}
		});
	}
}

/**
* Carga la capa al ws
**/
function importLayer(layer,mapId){
	mapId || (mapId=-1);
	var id;
	var name;
	if(layer!=null){
		id=layer.id;
		name=layer.name;
	}
	else{
		id=$("#selectLayer").val();
		name=$("#selectLayer").find('option:selected').attr("name");
	}
	if(id!=null){
		$.ajax({
			type: "POST",
			url : apiPath+"apiGeoserver.php",
			data : {
				tag:"addLayer",
				layerId: id,
				layerName: name,
				mapId: mapId,
				mapName: map.name,
				town: map.town,
				projection: map.projection
			},
			success: function(response){
				console.log("Importando capa: #"+name);
				console.log(response);
				//update MAP Table
				updateDatabaseMap();
				drawTree();
			},
			error: function(error) {
				console.log("Error al cargar la capa: ".error);				 
			}
		});
	}
	else{
		console.log("Selector de capas vacío.");
	}	
}

function clearMap(){
	console.log("ClearMap");
	var listLayers=map.getLayers();
	listLayers.forEach(function(layer){
		if(layer.name!="OpenStreet Maps"){
			removeLayer(layer,function(response){
				if(map.getLayers().getArray().length==1){
					success("El contenido del mapa ha sido eliminado.");
					drawTree();
				}
			});
		}
	});
}

