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
				addLayer(capabilities.Layer.Layer[i].Name,wms);
				//var layer = newLayer(capabilities.Layer.Layer[i].Name,wms)
				//layers.push(layer);
			}
			//addGroup(title,wms,layers);
		},
		error:function(error){
			alert("Error: "+error);
		}
	});
}