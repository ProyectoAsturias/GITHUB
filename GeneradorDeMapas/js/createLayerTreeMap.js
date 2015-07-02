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
	"<span class='glyphicon glyphicon-remove'></span>" +
	"<span class='glyphicon glyphicon-eye-open' ></span>" +
	"<span class='glyphicon glyphicon-cog'></span>" +
	"<span class='glyphicon glyphicon-tint'></span>" +
	"</li>")
		.data("layer", layer)
		.appendTo($("#layersList ol"));
}
