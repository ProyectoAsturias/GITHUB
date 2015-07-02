$(document).ready(function(){
	assignEventsHandlers();
});

function loadWmsTree(wms) {
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
			console.log(wms+"?request=getCapabilities&service=wms");
			for(var i=0; i<capabilities.Layer.Layer.length; i++){
				var layer = addLayer(capabilities.Layer.Layer[i].Name,wms)
				layers.push(layer);
			}
			updateTreeLayer();
		},
		error:function(error){
			alert("Error: "+error);
		}
	});

	//Temporal
	var osmLayer = new ol.layer.Tile({
		source: new ol.source.OSM()
	});
	osmLayer.name = "OpenStreet Maps";
	map.addLayer(osmLayer);
}

function reorderOpenlayersMap(indexFrom, indexTo){
	console.log(indexFrom + "  " + indexTo);
	var movedLayer = map.getLayers().removeAt(indexFrom);
	map.getLayers().insertAt(indexTo, movedLayer);
}

function assignEventsHandlers(){
	eyeIconClickHandler();
	deleteIconClickHandler();
}

function eyeIconClickHandler(){
	$(".glyphicon-eye-open").click(function(event){
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
	$(".glyphicon-remove").click(function(event){
		var parent = $(this).parent();
		removeLayer(parent.data("layer"),function(response){
			parent.fadeOut("slow", function(){
				$(this).remove();
			});
		});
	});
}

function removeLayer(layer, callback){
	/*$.ajax({
		type : "GET",
		url : apiPath+"delLayer.php",
		data:{
			layerName: layer.name,
			mapName: mapName,
		},
		success:function (response) {
			//eliminamos la capa de ol
			map.removeLayer(layer);
		},
		error:function(error){
			alert("Error: "+error);
		}
	});*/
	map.removeLayer(layer);
	callback();
	//$.ajax({
	//})
}