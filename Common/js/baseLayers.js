function baseLayer(layerName){
	removeOldBaseLayer();
	if (layerName=="OSM"){
    	var osmLayer = new ol.layer.Tile({
    		source: new ol.source.OSM()
    	});
    	osmLayer.name = "OpenStreet Maps";
    	osmLayer.base = true;
    	map.getLayers().insertAt(0,osmLayer);
    	var html="<span data-label-placement>OpenStreet Map</span> <span class=\"caret\"></span>";
    	$("#baseLayerButton #baseButton").empty().append(html);
   	}
   	else if(layerName=="BAL"){
   		var bingAerialLayer= new ol.layer.Tile({
   			source: new ol.source.BingMaps({
        		key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
        		imagerySet:'Aerial'
        	})
   		})
    	bingAerialLayer.name = "Bing Aerial Layer";
    	bingAerialLayer.base = true;
    	map.getLayers().insertAt(0,bingAerialLayer);
    	var html="<span data-label-placement>Bing Aerial Layer</span> <span class=\"caret\"></span>";
    	$("#baseLayerButton #baseButton").empty().append(html);
   	}
   	else if(layerName=="MQS"){
   		var mapQuest= new ol.layer.Tile({
      		source: new ol.source.MapQuest({layer: 'sat'})
  		})
  		mapQuest.name= "Map Quest Sat";
  		mapQuest.base = true;
  		map.getLayers().insertAt(0,mapQuest);
    	var html="<span data-label-placement>Map Quest Satelite</span> <span class=\"caret\"></span>";
    	$("#baseLayerButton #baseButton").empty().append(html);
   	}
}

function removeOldBaseLayer(){
	var layersArray=map.getLayers().getArray();
	for(var i=0;i<layersArray.length;i++){
		if(layersArray[i].base==true)
			map.removeLayer(layersArray[i])
	}
}