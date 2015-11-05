var map;
var layersCounter = 0;
var maxLayers = 1;
var layersList = [];
var town;
var projection;
/**
 * Inicialización de la variable map de openlayers 3
 **/
function initMap() {
	//Zoom depende de si es asturias o un concejo
	var center = getCenter();
	var zoom = 7;

	$("#mapNameStyle").append("<h2>" + mapName + "</h2>");
	$("#mapNameStyle").prop('title', ""+mapName+"");

	map = new ol.Map({
			target : 'olmap',
			renderer : 'canvas',
			view : new ol.View({
				center : center,
				zoom : zoom
			})
		});
	map.name = mapName;
	setLoadedBaseLayer();
	getMapVars();
	//setLayerOrder();
	//setLayersVisibility();
}

/**
 * Obtiene las variables del mapa y dibuja el arbol de capas.
 **/
function getMapVars() {
	$.ajax({
		type : "POST",
		url : "../../Tables/php/userContent.php",
		data : {
			tag : "getMapVars",
			mapName : map.name
		},
		success : function (response) {
			var vars = JSON.parse(response);
			town=vars[0];
			projection=vars[1];
			drawTree();
		},
		error : function (error) {
			alert("Error al tomar el punto central de la entidad : " + error);
		}
	});
}

/**
 * Obtiene el centro de la entidad
 **/
function getCenter() {
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
function addLayer(name, wms, style, bBox, visible, opacity) {
	var extent = ol.extent.applyTransform(bBox, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));
	var projExtent = ol.proj.get('EPSG:3857').getExtent();
	var startResolution = ol.extent.getWidth(projExtent) / 1024;
	var resolutions = new Array(22);
	for (var i = 0, ii = resolutions.length; i < ii; ++i) {
		resolutions[i] = startResolution / Math.pow(2, i);
	}
	var tileGrid = new ol.tilegrid.TileGrid({
			extent : extent,
			resolutions : resolutions,
			tileSize : [1024, 1024]
		});

	var source = new ol.source.TileWMS({
			crossOrigin:'anonymous',
			preload : Infinity,
			url : wms,
			params : {
				'LAYERS' : name,
				'TILED' : true,
				'STYLES' : style,
			},
			serverType : 'geoserver',
			tileGrid : tileGrid
	});

	var layer = new ol.layer.Tile({
		source : source,
		visible : visible,
		opacity : opacity
	});

	layer.name = name;
	updateLoadingBar(source);
	map.addLayer(layer);
	//console.log(layer.getSource().getParams());
	return layer;
}

function addGroup(name, wms, layers) {
	if (layers != null) {
		var layerGroup = new ol.layer.Group({
				layers : layers,
				name : name
			});
		layerGroup.name = name;
		map.addLayer(layerGroup);
		updateTreeLayer();
	} else {
		requestLayersForGroup(name, wms, function (groupLayers) {
			if (groupLayers.length == 0) {
				addLayer(name, wms);
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

function reorderOpenlayersMap(indexFrom, indexTo) {
	var movedLayer = map.getLayers().removeAt(indexFrom);
	map.getLayers().insertAt(indexTo, movedLayer);
}

function removeLayer(layer, callback) {
	if (!layer.wms) {
		//console.log("Capa Normal");
		console.log(layer.name);
		$.ajax({
			type : "POST",
			url : apiPath + "apiGeoserver.php",
			data : {
				tag : "delLayer",
				mapName : map.name,
				layerName : layer.name
			},
			success : function (response) {
				//console.log("##" + response + "##");
				if (response == 0)
					map.removeLayer(layer);
				else
					console.log(response);
				callback(response);
			},
			error : function (error) {
				alert("Error al eliminar una capa : " + error);
			}
		});
	} else {
		//console.log("Capa WMS");
		$.ajax({
			type : "POST",
			url : apiPath + "apiGeoserver.php",
			data : {
				tag : "delWmsLayer",
				mapName : map.name,
				wmsName : layer.wms,
				layerName : layer.name
			},
			success : function (response) {
				//console.log("##"+response+"##");
				if (response == 0) 
					map.removeLayer(layer);
				else
                                        console.log(response);
				callback(response);
			},
			error : function (error) {
				alert("Error al eliminar una capa wms: " + error);
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
		url : wms + requestCapabilities,
		crossDomain : true,
		/*headers: {
                        "Authorization": "Basic "+auth
                },*/
		success : function (response) {
			//console.log(response)
			var parser = new ol.format.WMSCapabilities();
			var service = parser.read(response);
			var capabilities = service.Capability;
			var title = service.Service.Title;
			title = title.replace(/ /gi, '_');
			var modalList = "";
			$("#modalLayersWms .modal-header").empty().append("<h4 class=\"modal-title\">Seleccione capas a importar</h4>");
			modalList += "<label><input type=\"checkbox\" value=0 class=\"checkboxLayers\" onClick=\"selectAll(this)\"></input>Todas</label></br>";
			for (var i = 0; i < capabilities.Layer.Layer.length; i++) {
				modalList += "<label><input type=\"checkbox\" value=\"" + capabilities.Layer.Layer[i].Name + "\" class=\"checkboxLayers\"></input>  " + capabilities.Layer.Layer[i].Name + "</label></br>";
			}
			var modalFooter = "<button type=\"button\" onclick=\"importLayersWms('" + wms + "','" + title + "')\" class=\"btn btn-success\" data-dismiss=\"modal\">Importar Capas</button>" +
				"<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>";
			$("#modalLayersWms .modal-body").empty().append(modalList);
			$("#modalLayersWms .modal-footer").empty().append(modalFooter);
			$("#modalLayersWms").modal("show");
		},
		error : function (error) {
			alert("Error al importar un wms: " + error);
		}
	});
}

function importLayersWms(wms, title) {
	var listLayers = [];
	$(".checkboxLayers").each(function () {
		if ($(this).is(':checked') && $(this).val() != "0")
			listLayers.push($(this).val());
	});
	$.ajax({
		type : "POST",
		url : apiPath + "apiGeoserver.php",
		data : {
			tag : 'addWms',
			mapName : map.name,
			wmsName : title,
			wmsUrl : wms,
			listLayers : listLayers
		},
		success : function (response) {
			console.log(response);
			drawTree();
		},
		error : function (error) {
			console.log("Error al cargar el mapa: ".error);
		}
	});
}

/**
 * Carga el mapa completo en Geoserver
 **/
function importMap() {
	$("#modalLayersWms .modal-body").empty();
	if ($("#selectMap").val() != null) {
		var mapId = $("#selectMap").val();
		var mapName = $("#selectMap option:selected").text();
		$("#modalCounterLayers .modal-header").empty().append(" <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\">Importando Mapa<div id=\"loadingGif\"></div></h4>");
		//console.log("Importando map: " + mapName + " #" + mapId);
		$("#modalCounterLayers .modal-errors").empty();
		$.ajax({
			type : "POST",
			url : apiPath + "apiLocalgis.php",
			data : {
				tag : "getMapLayers",
				idMap : mapId
			},
			success : function (response) {
				//console.log(response);
				$("#modalLayersWms .modal-header").empty().append("<h4 class=\"modal-title\">Seleccione capas a importar</h4>");
				var modalList = "<h4>Capas</h4>";
				var idList = "";
				var layerList = JSON.parse(response);
				if (layerList.length > 1)
					modalList += "<label><input type=\"checkbox\" value=0 class=\"checkboxLayers\" onClick=\"selectAll(this)\"></input>Todas</label></br>";
				for (var i = 0; i < layerList.length; i++) {
					modalList += "<label><input type=\"checkbox\" value=\"" + layerList[i].name + "\" class=\"checkboxLayers\"></input>  " + layerList[i].name + "</label></br>";
					var name = layerList[i].name.split(" ").join("_");
					idList += "<input type=\"hidden\" id=\"id" + name + "\" value=\"" + layerList[i].id + "\" />";
				}
				var modalFooter = "<button type=\"button\" onclick=\"importLayersMap('" + mapId + "','" + mapName + "')\" class=\"btn btn-success\" data-dismiss=\"modal\">Importar Capas</button>" +
					"<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>";
				$("#modalLayersWms .modal-body").append(modalList);
				$("#modalLayersWms .modal-body").append(idList);
				$("#modalLayersWms .modal-footer").empty().append(modalFooter);
				$.ajax({
					type : "POST",
					url : apiPath + "apiLocalgis.php",
					data : {
						tag : "getWmsLayers",
						idMap : mapId,
					},
					success : function (response) {
						//console.log(response);

						var wmsList = "";
						var ortoFotos = JSON.parse(response);
						if (ortoFotos.length) {
							var modalList = "<h4>Ortofotos</h4>";
							for (var i = 0; i < ortoFotos.length; i++) {
								var wms = ortoFotos[i].id.split("?")[0];
								modalList += "<label><input type=\"checkbox\" value=\"" + ortoFotos[i].name + "\" class=\"checkboxLayers\">" + ortoFotos[i].name + "</label></input></br>";
								var name = ortoFotos[i].name.split(" ").join("_");
								wmsList += "<input type=\"hidden\" id=\"wms" + name + "\" value=\"" + wms + "\" />";
							}
							$("#modalLayersWms .modal-body").append(modalList);
							$("#modalLayersWms .modal-body").append(wmsList);
						}

						$("#modalLayersWms").modal("show");
					},
					error : function (error) {
						console.log(error);
					}
				})
			}
		})
	} else
		console.log("Selector de mapas vacío.");
}

function importLayersMap(id, name) {
	var listLayers = [];
	var j = 0;
	$("#modalCounterLayers .modal-header").empty().append(" <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\">Importando Mapa " + name + "<div id=\"loadingGif\"></div></h4>");
	layersCounter = 1;
	var modalList = "";
	$(".checkboxLayers").each(function () {
		if ($(this).is(':checked') && $(this).val() != "0") {
			listLayers.push($(this).val());
			j++;
			var layerName=$(this).val().split(" ").join("_");
			//console.log(j)
			modalList += "<label for=\"layer" + layerName + "\">" + $(this).val() + "</label><div id=\"layer" + layerName + "\" class=\"updatedLayer\"><div id=\"loadingGif\"></div></div></br>";
		}
	});
	maxLayers = j;
	
        $("#modalCounterLayers .modal-body").empty().append(modalList)
        $("#modalCounterLayers .modal-errors").empty();
        $("#modalCounterLayers .modal-footer").empty();
	$("#modalCounterLayers").modal({
		backdrop : "static"
	});

	for (var i = 0; i < listLayers.length; i++) {
		var idName = listLayers[i].split(" ").join("_");
		if ($("#wms" + idName).val()) {
			var wms = $("#wms" + idName).val();
			name = listLayers[i];
			importOrtofoto(name, wms);
		} 
		else {

			var layerImport = {
				name : listLayers[i],
				id : $("#id" + idName).val()
			}
			importLayer(layerImport);
		}
	}
}

function importOrtofoto(name, wms) {
	var listLayers = [name];
	var wmsName = "Ortofoto";
	$.ajax({
		type : "POST",
		url : apiPath + "apiGeoserver.php",
		data : {
			tag : 'addWms',
			mapName : map.name,
			wmsName : wmsName,
			wmsUrl : wms,
			listLayers : listLayers
		},
		success : function (response) {
			if (response == ""){
				var layerName=name.split(" ").join("_");
				$("#layer" + layerName + "").empty().append("<span class='glyphicon glyphicon-ok-sign' style='color:green;'></span>");
			}
			else if(response=="Error: Estilo incorrecto, estilo actual establecido: Generic"){
				var layerName=name.split(" ").join("_");
                                $("#layer" + layerName + "").empty().append("<a id='link"+layerName+"'>Informe de errores </a><span class='glyphicon glyphicon-ok-sign' style='color:orange;'></span>");
				$("#link"+layerName).on('click', function() {
                                	var modalErrorInfo = "<div id='errorInfo'><h4>Infome de error "+layerName+":</h4></br><textbox>"+response+"</textbox></div>";
                                        $("#modalCounterLayers .modal-errors").empty().append(modalErrorInfo);
                                });
			}
			else{
				//console.log(response);
				var layerName=name.split(" ").join("_");
				$("#layer" + layerName + "").empty().append("<a id='link"+layerName+"'>Informe de errores </a><span class='glyphicon glyphicon-remove-sign' style='color:red;'></span>");
				$("#link"+layerName).on('click', function() {

					var modalErrorInfo = "<div id='errorInfo'><h4>Infome de error "+layer.name+":</h4></br><textbox>"+response+"</textbox></div>";
			                $("#modalCounterLayers .modal-errors").empty().append(modalErrorInfo);
				});
				//TRATAMIENTO DE RESPUESTAS
				//+="<bold>"+layer.name+": </bold>"+response+"</br>";
				//alert("La capa " + name + " no ha podido cargarse. \n ERROR:" + response);
			}
			layersCounter++;
			//console.log(layersCounter);
			//console.log(maxLayers);
			if (layersCounter >  maxLayers)
				$("#modalCounterLayers").modal("hide");
		},
		error : function (error) {
			console.log("Error al cargar el mapa: ".error);
		}
	});
}

/**
 * Carga la familia completa en OpenLayers
 **/
function importFamily() {
	$("#modalLayersWms .modal-body").empty();
	if ($("#selectFamily").val() != null) {
		var id = $("#selectFamily").val(); ;
		var nameFamily = $("#selectFamily option:selected").text();
		$("#modalCounterLayers .modal-header").empty().append(" <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\">Importando Familia" + name + "<div id=\"loadingGif\"></div></h4>");
		//console.log("Importando familia: " + name + " #" + id);
		$("#modalCounterLayers .modal-errors").empty();
		$.ajax({
			type : "POST",
			url : apiPath + "apiLocalgis.php",
			data : {
				tag : "getLayers",
				idFamily : id
			},
			success : function (response) {
				//console.log(response);
				$("#modalLayersWms .modal-header").empty().append("<h4 class=\"modal-title\">Seleccione capas a importar</h4>");
				var modalList = "<h4>Capas</h4>";
				var idList = "";
				var layerList = JSON.parse(response);
				if (layerList.length > 1)
					modalList += "<label><input type=\"checkbox\" value=0 class=\"checkboxLayers\" onClick=\"selectAll(this)\"></input>Todas</label></br>";
				for (var i = 0; i < layerList.length; i++) {
					modalList += "<label><input type=\"checkbox\" value=\"" + layerList[i].name + "\" class=\"checkboxLayers\"></input>  " + layerList[i].name + "</label></br>";
					var name = layerList[i].name.split(" ").join("_");
					idList += "<input type=\"hidden\" id=\"id" + name + "\" value=\"" + layerList[i].id + "\" />";
				}
				var modalFooter = "<button type=\"button\" onclick=\"importLayersFamily('" + id + "','" + nameFamily + "')\" class=\"btn btn-success\" data-dismiss=\"modal\">Importar Capas</button>" +
					"<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>";
				$("#modalLayersWms .modal-body").append(modalList);
				$("#modalLayersWms .modal-body").append(idList);
				$("#modalLayersWms .modal-footer").empty().append(modalFooter);
				$("#modalLayersWms").modal("show");
			},
			error : function (error) {
				console.log("Error al cargar la familia de capas: ".error);
			}
		});
	} else {
		console.log("Selector de familias vacío.");
	}
}

function importLayersFamily(id, name) {
	var listLayers = [];
	var j = 0;
	$("#modalCounterLayers .modal-header").empty().append(" <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\">Importando Familia " + name + "<div id=\"loadingGif\"></div></h4>");
	layersCounter = 1;
	var modalList = "";
	$(".checkboxLayers").each(function () {
		if ($(this).is(':checked') && $(this).val() != "0") {
			listLayers.push($(this).val());
			j++;
			var layerName=$(this).val().split(" ").join("_");
			modalList += "<label for=\"layer" + layerName + "\">" + $(this).val() + "</label><div id=\"layer" + layerName + "\" class=\"updatedLayer\"><div id=\"loadingGif\"></div></div></br>";
		}
	});
	maxLayers = j;
	$("#modalCounterLayers .modal-body").empty();
	$("#modalCounterLayers .modal-errors").empty();
	$("#modalCounterLayers .modal-body").append(modalList);
	$("#modalCounterLayers").modal({
		backdrop : "static"
	});
	for (var i = 0; i < listLayers.length; i++) {
		var name = listLayers[i].split(" ").join("_")
			var layerImport = {
			name : listLayers[i],
			id : $("#id" + name).val()
		}
		importLayer(layerImport);
	}
}


/**
 * Limpia la informacion de las capas para el mapa actual
 **/
function clearLayersInfo() {
	$.ajax({
		type : "POST",
		url : apiPath + "apiDatabase.php",
		data : {
			tag : "clearMapInfo",
			mapName : map.name
		},
		success : function (response) {
			//console.log(response);
		},
		error : function (error) {
			console.log("Error al guardar la información en MAPS: ".error);
		}
	});

}

/**
 * Carga la capa al ws
 **/
function importLayer(layer, mapId) {
	//console.log(mapId);
	mapId || (mapId = -1);
	var id;
	var name;
	if (layer != null) {
		id = layer.id;
		name = layer.name;
	} else {
		if ($("#selectLayer").val() != null) {
			layersCounter = 1;
			id = $("#selectLayer").val();
			name = $("#selectLayer").find('option:selected').attr("name");
			var layerName=name.split(" ").join("_");
			$("#modalCounterLayers .modal-header").empty().append("<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\">Importando Capa<div id=\"loadingGif\"></div></h4>");
			var modalList = "<label for=\"layer"+layerName+"\">" + name + "</label><div id=\"layer"+layerName+"\" class=\"updatedLayer\"><div id=\"loadingGif\"></div></div></br>";
			$("#modalCounterLayers .modal-body").empty();
			$("#modalCounterLayers .modal-errors").empty();
			$("#modalCounterLayers .modal-body").append(modalList);
			$("#modalCounterLayers").modal({
				backdrop : "static"
			});
		} else {
			console.log("Selector de capas vacío.");
		}
	}
	if (id != null) {
		$.ajax({
			type : "POST",
			url : apiPath + "apiGeoserver.php",
			data : {
				tag : "addLayer",
				layerId : id,
				layerName : name,
				mapId : mapId,
				mapName : map.name,
				town : town,
				projection : projection
			},
			success : function (response) {
				if (response == ""){
					var layerName=name.split(" ").join("_");
					$("#layer" + layerName + "").empty().append("<span class='glyphicon glyphicon-ok-sign' style='color:green;'></span>");
				}
				else if(response.indexOf("Error: Estilo incorrecto")>-1){
                                	var layerName=name.split(" ").join("_");
	                                $("#layer" + layerName + "").empty().append("<a id='link"+layerName+"'>Informe de errores </a><span class='glyphicon glyphicon-ok-sign' style='color:orange;'></span>");
					$("#link"+layerName).on('click', function() {

                                                var modalErrorInfo = "<div id='errorInfo'><h4>Infome de error "+layerName+":</h4></br><textbox>"+response+"</textbox></div>";
                                                $("#modalCounterLayers .modal-errors").empty().append(modalErrorInfo);
                                        });
                       		}	
				else{
					//console.log(response);
					var layerName=name.split(" ").join("_");
					$("#layer" + layerName + "").empty().append("<a id='link"+layerName+"'>Informe de errores </a><span class='glyphicon glyphicon-remove-sign' style='color:red;'></span>");
					$("#link"+layerName).on('click', function() {

						var modalErrorInfo = "<div id='errorInfo'><h4>Infome de error "+layerName+":</h4></br><textbox>"+response+"</textbox></div>";
	                    			$("#modalCounterLayers .modal-errors").empty().append(modalErrorInfo);
					});
					//TRATAMIENTO DE RESPUESTAS
					//+="<bold>"+layer.name+": </bold>"+response+"</br>";
					//alert("La capa " + name + " no ha podido cargarse. \n ERROR:" + response);
				}
				if (layersCounter ==  maxLayers){
					//$("#modalCounterLayers").modal("hide");
					$("#loadingGif").hide();
		                        var modalFooter = "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>";
		                        $("#modalCounterLayers .modal-footer").empty().append(modalFooter);
				}
				drawTree();
				layersCounter++;
			},
			error : function (error) {
				console.log("Error al cargar la capa: ".error);
			}
		});
	} else {
		console.log("Selector de capas vacío.");
	}
}

function clearMap() {
	$("#modalLayerClear .modal-header").empty().append(" <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\" id=\"modalClearCount\">Comenzando la eliminación<div id=\"loadingGif\"></div></h4>");
	$("#modalLayerClear").modal({
		backdrop : "static"
	});
	//$("#modalLayerClear").modal("show");
	var total=map.getLayers().getArray().length;
	var listLayers = map.getLayers();
	var i=0;
	listLayers.forEach(function (layer) {
		removeLayer(layer, function (response) {
			i++;
			$("#modalClearCount").html("Eliminando capas: "+i+" de "+total+"<div id=\"loadingGif\"></div>");
			drawTree();
			if (map.getLayers().getArray().length == 0) {
				$("#modalLayerClear").modal("hide");
				success("El contenido del mapa ha sido eliminado.");
				drawTree();
			}
		});
	});
}

function addLayerWms(name, wms) {
	var format = 'image/png';
	var layer = new ol.layer.Image({
			source : new ol.source.ImageWMS({
				crossOrigin:'anonymous',
				ratio : 1,
				url : wms,
				params : {
					'FORMAT' : format,
					'VERSION' : '1.1.1',
					STYLES : '',
					LAYERS : name,
				}
			})
		});
	layer.name = name;
	map.addLayer(layer);
	return layer;
}

function setLoadedBaseLayer() {
	if (loadedBaselayer != undefined) {
		baseLayer(loadedBaselayer);
	}
}

function selectAll(source) {
	checkboxes = document.getElementsByClassName('checkboxLayers');
	for (var i = 0, n = checkboxes.length; i < n; i++) {
		checkboxes[i].checked = source.checked;
	}
}

