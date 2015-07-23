$(document).ready(function(){
	assignEventsHandlers();
});

function drawTree(){
	if (!searchLayerByName("OpenStreet Maps")){
    	var osmLayer = new ol.layer.Tile({
    		source: new ol.source.OSM()
    	});
    	osmLayer.name = "OpenStreet Maps";
    	map.addLayer(osmLayer);
   	};
	var wms=server+"geoserver/"+map.name+"/wms";
	//console.log(wms);
	loadWmsTree(wms);
}

function loadWmsTree(wms) {
	var parser = new ol.format.WMSCapabilities();
	$.ajax({
		type : "GET",
		jsonp : "callback",
		dataType : 'text',
		url : wms+'?request=getCapabilities&service=wms',
		crossDomain : true,
		success:function (response) {
			//console.log(response);
			if(response.search("Service WMS is disabled")<0){
				var service = parser.read(response);
				var capabilities = service.Capability;
				var title = service.Service.Title;
				var layers = [];
				//console.log(wms+"?request=getCapabilities&service=wms");
				if(capabilities.Layer.Layer!=undefined){
					for(var i=0; i<capabilities.Layer.Layer.length; i++){
						if (!searchLayerByName(capabilities.Layer.Layer[i].Name)){
							var layer = addLayer(capabilities.Layer.Layer[i].Name,wms);
							if(capabilities.Layer.Layer[i].cascaded==1)
								layer.wms=true;
							else
								layer.wms=false;
							layers.push(layer);
						}
					}
				}
				updateTreeLayer();
			}
			else
				alert("Debe activar el servicio WMS para acceder al mapa.");
		},
		error:function(error){
			alert("Error al cargar el arbol de capas: "+error);
		}
	});
}

function makeNodesSortable(){
	var indexFrom, indexTo;

	$("#layersList ol").sortable({
		group: 'simple_with_animation',
		pullPlaceholder: false,
		onDrop: function  ($item, container, _super) {
			var $clonedItem = $('<li/>').css({height: 0});
			$item.before($clonedItem);
			$clonedItem.animate({'height': $item.height()});

			$item.animate($clonedItem.position(), function  () {
				$clonedItem.detach();
				_super($item, container);
			});
		},
		onDragStart: function ($item, container, _super, event) {
			var offset = $item.offset(),
				pointer = container.rootGroup.pointer;
			adjustment = {
				left: pointer.left - offset.left,
				top: pointer.top - offset.top
			};
			_super($item, container);
			indexFrom = map.getLayers().getLength()-1-$item.index();
		},
		onDrag: function ($item, position) {
			$item.css({
				left: position.left - adjustment.left,
				top: position.top - adjustment.top
			});
		},
		onDrop: function ($item, container, _super, event) {
			$item.removeClass(container.group.options.draggedClass).removeAttr("style");
			$("body").removeClass(container.group.options.bodyClass);
			var indexTo =  map.getLayers().getLength()-1-$item.index();
			reorderOpenlayersMap(indexFrom, indexTo);
		}
	});
}

function updateTreeLayer() {
	generateLayerListHTML();
	makeNodesSortable();
	assignEventsHandlers();
}

function generateLayerListHTML(){
	$("#layersList ol").empty();
	var reverseLayers = map.getLayers().getArray().slice(0).reverse();
	reverseLayers.forEach(function (layer) {
		generateNode(layer);
	});
	makeNodesSortable();
}

function generateNode(layer){
	var node = $("<li>"+layer.name +
	"<span class='glyphicon glyphicon-remove removeLayer'></span>" +
	"<span class='glyphicon glyphicon-eye-open visibilityLayer' ></span>" +
	"<span class='glyphicon glyphicon-cog attributesLayer'></span>" +
	"<span class='glyphicon glyphicon-tint stylesLayer'></span>" +
	"<span class='glyphicon glyphicon-list-alt infoLayer'></span>" +
	"</li>")
		.data("layer", layer)
		.appendTo($("#layersList ol"));
}
