$(document).ready(function () {
	assignEventsHandlers();
	leftBarResizable();
});

function drawTree() {
	$.ajax({
		type : "POST",
                url : apiPath + "apiGeoserver.php",
                data : {
	                tag : "getDataSources",
                        mapName : map.name
                },
                success : function(response){
					console.log(response);
			stores=response.split("|");
			dataStores=JSON.parse(stores[0].replace("|","")).dataStores.dataStore;
			wmsStores=JSON.parse(stores[1].replace("|",""));
			for(var i=0;i<dataStores.length;i++){
				wms=serverGS+"geoserver/"+dataStores[i].name;
				loadWmsTree(wms)
			}
			for(var i=0;i<wmsStores.length;i++){
				url=wmsStores[i];
				//loadExternWmsTree(url);
                        }
		},
                error : function (error) {
                        console.log("Error al recuperar los datasources:" + error);
                }
        });
}

function loadWmsTree(wms) {
	//console.log(auth);
	//console.log(wms + requestCapabilities);
	var parser = new ol.format.WMSCapabilities();
	$.ajax({
		type : "GET",
		jsonp : "callback",
		dataType : 'text',
		url : wms + requestCapabilities,
		/*headers: {
       	                //Authorization: "Basic "+auth
                },*/
		/*xhrFields: {
  				withCredentials: true
  		},*/
		success : function (response) {
			var service = parser.read(response);
			var capabilities = service.Capability;
			var title = service.Service.Title;
			//var mapName = service
			var bBox = [];
			//console.log(capabilities.Layer.Layer);
			if (capabilities.Layer.Layer != undefined) {
				$.ajax({
					type : "POST",
					url : apiPath + "apiLocalgis.php",
					data : {
						tag : "getBbox",
						entityId : entityId,
					},
					success : function (response) {
						var BboxResponse = response;
						getMapInfo(map.name).then(function (response){
							var layersOrderInfo = JSON.parse(response).map;
							var split1 = BboxResponse.split(",")[0].split("(")[1].split(" ");
							var split2 = BboxResponse.split(",")[1].split(")")[0].split(" ");
							bBox.push(parseFloat(split1[0]), parseFloat(split1[1]), parseFloat(split2[0]), parseFloat(split2[1]));
							var extent = ol.extent.applyTransform(bBox, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));
							map.getView().fitExtent(extent, map.getSize());
							if (layersOrderInfo != null){
								console.log(layersOrderInfo);
								for (var h = 0; h<layersOrderInfo.length; h++){
									var layerOrdering = layersOrderInfo[h];
									for (var i = 0; i < capabilities.Layer.Layer.length; i++) {
										if (!searchLayerByName(capabilities.Layer.Layer[i].Name) && layerOrdering.name == capabilities.Layer.Layer[i].Name) {
											var style = "";
											var layer;
											if (capabilities.Layer.Layer[i].Style != null && capabilities.Layer.Layer[i].Style[0].Name)
												style = capabilities.Layer.Layer[i].Style[0].Name;
											if (capabilities.Layer.Layer[i].cascaded == 1) {
												layer = addLayerWms(capabilities.Layer.Layer[i].Name, wms+"/wms");
												layer.wms = true;
											} else {
												layer = addLayer(capabilities.Layer.Layer[i].Name, wms+"/wms", style, bBox, layerOrdering.visibility, layerOrdering.opacity);
												layer.wms = false;
											}
										}
									}
								}
								updateTreeLayer();
							}else{
								/*for (var i = 0; i < capabilities.Layer.Layer.length; i++) {
									if (!searchLayerByName(capabilities.Layer.Layer[i].Name)) {
										var style = "";
										if (capabilities.Layer.Layer[i].Style != null && capabilities.Layer.Layer[i].Style[0].Name)
											style = capabilities.Layer.Layer[i].Style[0].Name;
										addLayer(capabilities.Layer.Layer[i].Name, wms+"/wms", style, bBox, 1, 1);
									}
								}*/
							}
						});

						//console.log(response);
					},
					error : function (response) {
						console.log(response);
					}
				})
			}
		},
		error : function (error) {
			alert("Error treemap: " + error);
		}
	});
}

function loadExternWmsTree(wms) {
        var parser = new ol.format.WMSCapabilities();
        $.ajax({
                type : "GET",
                jsonp : "callback",
                dataType : 'text',
                url : wms + requestCapabilities,
                success : function (response) {
                        var service = parser.read(response);
                        var capabilities = service.Capability;
                        var title = service.Service.Title;
                        var layers = [];
                        if (capabilities.Layer.Layer != undefined) {
                        	for (var i = 0; i < capabilities.Layer.Layer.length; i++) {
	                                if (!searchLayerByName(capabilities.Layer.Layer[i].Name)) {
						var bBox=[-7.18211729951, 42.88231008548, -4.51116461875, 43.65924484073];
                                                //addLayerWms(capabilities.Layer.Layer[i].Name, wms+"/wms");
						addLayer(capabilities.Layer.Layer[i].Name, wms+"/wms", "",bBox, 1, 1);
                                        }
                                       	updateTreeLayer();
                                }
                        }
                },
                error : function (error) {
                        alert("Error treemap: " + error);
                }
        });
}

function makeNodesSortable() {
	var indexFrom,
	indexTo;

	$("#layersList ol").sortable({
		group : 'simple_with_animation',
		pullPlaceholder : false,
		handle : '.layerName',
		onDrop : function ($item, container, _super) {
			var $clonedItem = $('<li/>').css({
					height : 0
				});
			$item.before($clonedItem);
			$clonedItem.animate({
				'height' : $item.height()
			});

			$item.animate($clonedItem.position(), function () {
				$clonedItem.detach();
				_super($item, container);
			});
		},
		onDrop : function ($item, container, _super, event) {
			$item.removeClass(container.group.options.draggedClass).removeAttr("style");
			$("body").removeClass(container.group.options.bodyClass);
			var indexTo = map.getLayers().getLength() - 1 - $item.index();
			reorderOpenlayersMap(indexFrom, indexTo);
			saveDatabaseMap();
		},
		onDragStart : function ($item, container, _super, event) {
			var offset = $item.offset(),
			pointer = container.rootGroup.pointer;
			adjustment = {
				left : pointer.left - offset.left,
				top : pointer.top - offset.top
			};
			_super($item, container);
			indexFrom = map.getLayers().getLength() - 1 - $item.index();
		},
		onDrag : function ($item, position) {
			$item.css({
				left : position.left - adjustment.left,
				top : position.top - adjustment.top
			});
		},
		over : function (event, ui) {
			$(this).addClass("ui-state-highlight");
		}
	});
}

function updateTreeLayer() {
	generateLayerListHTML();
	makeNodesSortable();
	assignEventsHandlers();
	saveDatabaseMap();
}

function generateLayerListHTML() {
	$("#layersList ol").empty();
	var reverseLayers = map.getLayers().getArray().slice(0).reverse();
	reverseLayers.forEach(function (layer) {
		if (!layer.base)
			generateNode(layer);
	});
	//console.log("sadfsdf");
	makeNodesSortable();
}

function generateNode(layer) {
	//console.log(layer);
	var node = $("<li class='nodeLine' title='" + layer.name + "'><div class='layerName'>" + layer.name + "</div><div class='treeIcons'>" +
			"<span class='glyphicon glyphicon-remove removeLayer' title=\"Borrar capa\"></span>" +
			"<span class='glyphicon glyphicon-eye-open visibilityLayer' title=\"Visiblidad de capa\"></span>" +
			"<span class='glyphicon glyphicon-cog attributesLayer' title=\"Seleccionar atributos\"></span>" +
			"<span class='glyphicon glyphicon-tint stylesLayer' title=\"Seleccionar estilo\"></span>" +
			"<span class='glyphicon glyphicon-list-alt infoLayer' title=\"Editar datos de la capa\"></span>" +
			"</div></li>")
		.data("layer", layer)
		.appendTo($("#layersList ol"));
	if (!layer.getVisible()) {
		//console.log(node.find(".visibilityLayer"));
		node.find(".visibilityLayer").css("color", "lightgray");
	}
}

function leftBarResizable() {
	$("#menucapas").resizable({
		handles : "e",
		resize : function (event, ui) {
			map.updateSize();
		}
	});
}
