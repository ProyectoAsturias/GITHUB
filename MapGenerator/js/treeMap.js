$(document).ready(function(){
	assignEventsHandlers();
});

function drawTree(){
	var wms=serverGS+"geoserver/"+map.name+"/wms";
	console.log(wms);
	loadWmsTree(wms);
}

function loadWmsTree(wms) {
	console.log(wms);
	var parser = new ol.format.WMSCapabilities();
	$.ajax({
		type : "GET",
		jsonp : "callback",
		dataType : 'text',
		url : wms+'?request=getCapabilities&service=wms',
		crossDomain : true,
		success:function (response) {
			var service = parser.read(response);
			var capabilities = service.Capability;
			var title = service.Service.Title;
			var layers = [];
			console.log(capabilities.Layer.Layer);
			if(capabilities.Layer.Layer!=undefined){
				var bBox=capabilities.Layer.BoundingBox[0].extent;
				var extent=ol.extent.applyTransform(bBox, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));
				map.getView().fitExtent(extent, map.getSize());
				for(var i=0; i<capabilities.Layer.Layer.length; i++){
					if (!searchLayerByName(capabilities.Layer.Layer[i].Name)){
						var style="";
						if(capabilities.Layer.Layer[i].Style!=null && capabilities.Layer.Layer[i].Style[0].Name)
							 style=capabilities.Layer.Layer[i].Style[0].Name;
						var layer = addLayer(capabilities.Layer.Layer[i].Name,wms,style);
						if(capabilities.Layer.Layer[i].cascaded==1)
							layer.wms=true;
						else
							layer.wms=false;
						layers.push(layer);
					}
				}
				//console.log(map.getLayers());
			}
			updateTreeLayer();
		},
		error:function(error){
			alert("Error: "+error);
		}
	});
}

function makeNodesSortable(){
	var indexFrom, indexTo;

	$("#layersList ol").sortable({
		group: 'simple_with_animation',
		pullPlaceholder: false,
		handle: '.layerName',
		onDrop: function  ($item, container, _super) {
			var $clonedItem = $('<li/>').css({height: 0});
			$item.before($clonedItem);
			$clonedItem.animate({'height': $item.height()});

			$item.animate($clonedItem.position(), function  () {
				$clonedItem.detach();
				_super($item, container);
			});
		},
		onDrop: function ($item, container, _super, event) {
			$item.removeClass(container.group.options.draggedClass).removeAttr("style");
			$("body").removeClass(container.group.options.bodyClass);
			var indexTo =  map.getLayers().getLength()-1-$item.index();
			reorderOpenlayersMap(indexFrom, indexTo);
			updateDatabaseMap();
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
		over: function (event, ui) {
			$( this ).addClass( "ui-state-highlight" );
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
		if(!layer.base)
			generateNode(layer);
	});
	console.log("sadfsdf");
	makeNodesSortable();
}

function generateNode(layer){
	var node = $("<li><div class='layerName'>"+layer.name +"</div>" +
	"<span class='glyphicon glyphicon-remove removeLayer' title=\"Borrar capa\"></span>" +
	"<span class='glyphicon glyphicon-eye-open visibilityLayer' title=\"Visiblidad de capa\"></span>" +
	"<span class='glyphicon glyphicon-cog attributesLayer' title=\"Seleccionar atributos\"></span>" +
	"<span class='glyphicon glyphicon-tint stylesLayer' title=\"Seleccionar estilo\"></span>" +
	"<span class='glyphicon glyphicon-list-alt infoLayer' title=\"Editar datos de la capa\"></span>" +
	"</li>")
		.data("layer", layer)
		.appendTo($("#layersList ol"));
}

