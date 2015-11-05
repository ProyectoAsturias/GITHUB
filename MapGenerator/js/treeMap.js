$(document).ready(function () {
	assignEventsHandlers();
	leftBarResizable();
});

function drawTree() {
	var wms = serverGS + "geoserver/" + map.name;
	//console.log(wms);
	loadWmsTree(wms);
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
			var layers = [];
			var bBox = [];
			//console.log(capabilities.Layer.Layer);
			if (capabilities.Layer.Layer != undefined) {
				$.ajax({
					type : "POST",
					url : apiPath + "apiLocalgis.php",
					data : {
						tag : "getBbox",
						entityId : entityId
					},
					success : function (response) {
						//console.log(response);
						var split1 = response.split(",")[0].split("(")[1].split(" ");
						var split2 = response.split(",")[1].split(")")[0].split(" ");
						bBox.push(parseFloat(split1[0]), parseFloat(split1[1]), parseFloat(split2[0]), parseFloat(split2[1]));
						var extent = ol.extent.applyTransform(bBox, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));
						map.getView().fitExtent(extent, map.getSize());
						var layersVisibility=[];
						getLayersVisibility(map.name,function(response){
							var lv=JSON.parse(response);
							//console.log(lv);
							for (var i=lv.length-1;i>=0;i--){
								var vinfo=[];
								vinfo.push(lv[i][1]);	
								vinfo.push(lv[i][2]);
								layersVisibility.push(vinfo);
							}
							for (var i = 0; i < capabilities.Layer.Layer.length; i++) {
								if (!searchLayerByName(capabilities.Layer.Layer[i].Name)) {
									var style = "";
									var layer;
									var visible = layersVisibility[i][0];
									var opacity = layersVisibility[i][1];
									if(visible=="false")
										visible=false;
									else
										visible=true;
									if (capabilities.Layer.Layer[i].Style != null && capabilities.Layer.Layer[i].Style[0].Name)
										style = capabilities.Layer.Layer[i].Style[0].Name;
									if (capabilities.Layer.Layer[i].cascaded == 1) {
										layer = addLayerWms(capabilities.Layer.Layer[i].Name, wms+"/wms");
										layer.wms = true;
									} else {
										layer = addLayer(capabilities.Layer.Layer[i].Name, wms+"/wms", style, bBox, visible, opacity);
										layer.wms = false;
									}
									layers.push(layer);
								}
							}
							updateTreeLayer();
						})
					},
					error : function (response) {
						console.log(response);
					}
				})
			}
			updateTreeLayer();
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
