var map;

$(document).ready(function(){
	assignEventsHandlers();
});

/**
* Inicialización de la variable map de openlayers 3
**/
function initMap() {
	console.log(mapName);
	$("#editWmsButton").append("<h2>"+mapName+"</h2>");
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
	console.log(map.name+":"+name);
	console.log(wms);
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

function assignEventsHandlers(){
	eyeIconClickHandler();
	deleteIconClickHandler();
	attributesClickHandler();
	layerInfoClickHandler();
	stylesClickHandler();
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

function layerInfoClickHandler(){
	$(".infoLayer").click(function(event){
		var parent = $(this).parent();
		appendModalLayer(map.name,parent.data("layer"));
	});
}

function stylesClickHandler(){
        $(".stylesLayer").click(function(event){
                var parent = $(this).parent();
                appendModalStyles(map.name,parent.data("layer"));
        });
}

function removeLayer(layer, callback) {
	if(!layer.wms){
		console.log("Capa Normal");
		$.ajax({
			type: "POST",
			url : apiPath+"delLayer.php",
			data: {
				mapName: map.name,
				layerName: layer.name
			},
			success: function (response) {
				console.log(response);
				if(response==0)
					map.removeLayer(layer);
				callback(response);
			}
		});
	}
	else{
		console.log("Capa WMS");
		$.ajax({
			type: "POST",
			url : apiPath+"delWmsLayer.php",
			data: {
				mapName: map.name,
				wmsName: layer.wms,
				layerName: layer.name
			},
			success: function (response) {
				console.log(response);
				if(response==0)
					map.removeLayer(layer);
				callback(response);
			}
		});
	}
}

/**
* Carga un wms en Geoserver
**/
function importWms() {
	var wms;
	if($('#wms').val()!="")
		wms=$('#wms').val();
	else if($("#selectWms").val()!=null)
		wms=$("#selectWms").val();
	else
		return;
	//Obtener title y lista de capas que forman el wms
	$.ajax({
		type : "GET",
		jsonp : "callback",
		dataType : 'text',
		url : wms+'?request=getCapabilities&service=wms',
		crossDomain : true,
		success:function (response) {
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
				url: apiPath+"addWms.php",
				data:{
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

		},
		error:function(error){
			alert("Error: "+error);
		}
	});
}

/**
* Carga el mapa completo en Geoserver
**/
function importMap(){
	if($("#selectMap").val()!=null){
		var id=$("#selectMap").val();
		$.ajax({
			type: "POST",
			url: apiPath+"getFamilyLayers.php",
			data:{
				idMap: id
			},
			success: function(response){
				var layerList = JSON.parse(response);
				for(var i=0; i<layerList.length; i++){
					importFamily(layerList[i]);
				}
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
		$.ajax({
			type: "POST",
			url: apiPath+"getLayers.php",
			data:{
				idFamily: id
			},
			success: function(response){
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
		var id=$("#selectLayer").val();
		var name=$("#selectLayer").find('option:selected').attr("name");
	}
	if(id!=null){
		$.ajax({
			type: "POST",
			url: apiPath+"addLayer.php",
			data:{
				layerId: id,
				layerName: map.name+"_"+name,
				mapId: mapId,
				mapName: map.name,
				town: map.town,
				projection: map.projection
			},
			success: function(response){
				console.log(response);
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
