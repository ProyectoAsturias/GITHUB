var map;
var layersCounter=0;
var maxLayers=1;
var layersList=[];
/**
* Inicialización de la variable map de openlayers 3
**/
function initMap() {
	//Zoom depende de si es asturias o un concejo
	var center = getCenter();
	var zoom = 7;

	//console.log(mapName);
	$("#editWmsButton").append("<h2>"+mapName+"</h2>");
	//console.log(userName);
	$("#userName").append(userName);

	map = new ol.Map({
		target : 'olmap',
		renderer : 'canvas',
		view : new ol.View({
			center : center,
			zoom : zoom
		})
	});
	map.name=mapName;
	setLoadedBaseLayer();
	drawTree();
}

/**
* Obtiene el centro de la entidad
**/
function getCenter(){
	/*$.ajax({
		type: "POST",
		url : apiPath+"apiLocalgis.php",
		data : {
			tag:"getCenter",
			entityId: entityId
		},
		success: function (response) {
			center=JSON.parse(response);
		},
		error:function(error){
			alert("Error al tomar el punto central de la entidad : "+error);
		}
	});*/
	return [-540136.8999724974, 5213958.799933833];
}

/**
* Añade una capa sobre el objeto map
**/
function addLayer(name,wms,style) {
	//console.log(map.name+":"+name);
	//console.log(wms);
	var source = new ol.source.TileWMS({
		preload : Infinity,
		url : wms,
		params : {
			'LAYERS' : name,
			'TILED' : true,
			'STYLES': style,
		}
	})
	var layer = new ol.layer.Tile({source:source});
	layer.name = name;
	updateLoadingBar(source);
	map.addLayer(layer);
	//console.log(layer.getSource().getParams());
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
				if(response==0){
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
			var modalList="";
			$("#modalLayersWms .modal-header").empty().append("<h4 class=\"modal-title\">Seleccione capas a importar</h4>");
			for(var i=0; i<capabilities.Layer.Layer.length; i++){
				modalList+="<label><input type=\"checkbox\" value=\""+capabilities.Layer.Layer[i].Name+"\" class=\"checkboxLayers\"></input>  "+capabilities.Layer.Layer[i].Name+"</label></br>";
			}
			var modalFooter="<button type=\"button\" onclick=\"importLayersWms('"+wms+"','"+title+"')\" class=\"btn btn-success\" data-dismiss=\"modal\">Importar Capas</button>"+
                "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>";
			$("#modalLayersWms .modal-body").empty().append(modalList);
			$("#modalLayersWms .modal-footer").empty().append(modalFooter);
			$("#modalLayersWms").modal("show");
		},
		error:function(error){
			alert("Error al importar un wms: "+error);
		}
	});
}

function importLayersWms(wms,title){
	var listLayers=[];
	$(".checkboxLayers").each(function(){
		if($(this).is(':checked'))
			listLayers.push($(this).val());
	});
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
			console.log(response);
			drawTree();
		},
		error: function(error) {
			console.log("Error al cargar el mapa: ".error);				 
		}
	});
}


/**
* Carga el mapa completo en Geoserver
**/
function importMap(){
	if($("#selectMap").val()!=null){
		var id=$("#selectMap").val();
		$("#modalCounterLayers .modal-header").empty().append("<h4 class=\"modal-title\">Importando Mapa</h4>");
		console.log("Importando map: #"+id);
		$.ajax({
			type: "POST",
			url : apiPath+"apiLocalgis.php",
			data : {
				tag:"getMapLayers",
				idMap: id
			},
			success: function(response){
				console.log(response);
				layersCounter=1;
				var modalList="";
				var layerList = JSON.parse(response);
				maxLayers=layerList.length;
				for(var i=0; i<layerList.length; i++){
					j=i+1;
					modalList+="<label for=\"layerName"+j+"\">"+layerList[i].name+"</label><div id=\"layerName"+j+"\" class=\"updatedLayer\"><span class='glyphicon glyphicon-remove-sign' style='color:red;'></span></div></br>";
				}
				$("#modalCounterLayers .modal-body").empty();
				$("#modalCounterLayers .modal-body").append(modalList);
				$("#modalCounterLayers").modal("show");

				for(var i=0; i<layerList.length; i++){
					importLayer(layerList[i]);
				}
				//Guardar campos en MAP
				//saveAttributes(id,layerList);
				//Importar ortofoto
				$.ajax({
					type: "POST",
					url : apiPath+"apiLocalgis.php",
					data : {
						tag:"getWmsLayers",
						idMap: id,
					},
					success: function(response){
						//console.log(response);
						var ortoFotos=JSON.parse(response);
						for(var i=0; i<ortoFotos.length; i++){
							var wms=ortoFotos[i].id.split("?");
							console.log(wms[0]);
							importWms(wms[0]);
						}
					},
					error: function(error){
						console.log(error);
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
		$("#modalCounterLayers .modal-header").empty().append(" <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\">Importando Familia<div id=\"loadingGif\"></div></h4>");
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
				layersCounter=1;
				var modalList="";
				var layerList = JSON.parse(response);
				maxLayers=layerList.length;
				for(var i=0; i<layerList.length; i++){
					j=i+1;
					modalList+="<label for=\"layerName"+j+"\">"+layerList[i].name+"</label><div id=\"layerName"+j+"\" class=\"updatedLayer\"><span class='glyphicon glyphicon-remove-sign' style='color:red;'></span></div></br>";
				}
				$("#modalCounterLayers .modal-body").empty();
				$("#modalCounterLayers .modal-body").append(modalList);
				$("#modalCounterLayers").modal({backdrop: "static"});
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
	console.log("updateDatabaseMap");
	var layersInfo=[];
	var reverseLayers = map.getLayers().getArray().slice(0).reverse();
	var i=0;
	console.log(reverseLayers);
	reverseLayers.forEach(function (layer) {
		if(layer.base!=true){
			layersInfo.push(layer.name);
		}
	});
	console.log(layersInfo);
	reverseLayers.forEach(function (layer) {
		if(layer.base!=true){
			console.log("Mete capa en info");
			getJSONLayer(layer, function(viewAttributes){
				console.log(viewAttributes);
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
	//console.log("AXO AXO");
	//console.log(mapId);
	mapId || (mapId=-1);
	var id;
	var name;
	if(layer!=null){
		id=layer.id;
		name=layer.name;
	}
	else{
		layersCounter=1;
		id=$("#selectLayer").val();
		name=$("#selectLayer").find('option:selected').attr("name");
		$("#modalCounterLayers .modal-header").empty().append("<h4 class=\"modal-title\">Importando Familia</h4>");
		var modalList ="<label for=\"layerName1\">"+name+"</label><div id=\"layerName1\" class=\"updatedLayer\"><span class='glyphicon glyphicon-remove-sign' style='color:red;'></span></div></br>";		
		$("#modalCounterLayers .modal-body").empty();
		$("#modalCounterLayers .modal-body").append(modalList);
		$("#modalCounterLayers").modal("show");		
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
				mapName: map.name
			},
			success: function(response){
				//console.log(response);
				if(response=="")
					$("#layerName"+layersCounter+"").empty().append("<span class='glyphicon glyphicon-ok-sign' style='color:green;'></span>");
				layersCounter++;
				drawTree();
				//update MAP Table
				updateDatabaseMap();
				if(layersCounter>maxLayers)
					$("#modalCounterLayers").modal("hide");
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
		removeLayer(layer,function(response){
			if(map.getLayers().getArray().length==1){
				success("El contenido del mapa ha sido eliminado.");
				drawTree();
			}
		});
	});
}


function addLayerWms(name,wms){
	var format = 'image/png';
	var layer = new ol.layer.Image({
		source: new ol.source.ImageWMS({
		  ratio: 1,
		  url: wms,
		  params: {
			'FORMAT': format,
			'VERSION': '1.1.1',  
			STYLES: '',
			LAYERS:  name,
		  }
		})
	});
	layer.name = name;
	map.addLayer(layer);
	return layer;
}

function setLoadedBaseLayer(){
	if (loadedBaselayer != undefined){
		baseLayer(loadedBaselayer);
	}
}
