var googleLayer=true;
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
    else if(layerName=="GGM"){
      var html="<span data-label-placement>Google Maps</span> <span class=\"caret\"></span>";
      $("#baseLayerButton #baseButton").empty().append(html);
      googleMapLayer(map);
    }
}

function removeOldBaseLayer(){
	var layersArray=map.getLayers().getArray();
	for(var i=0;i<layersArray.length;i++){
		if(layersArray[i].base==true)
			map.removeLayer(layersArray[i])
	}
  //$('#gmap').hide();
}

function googleMapLayer(map){
  if (googleLayer){
    $("#gmap").addClass("fill");
    googleLayer=false;
    var gmap = new google.maps.Map(document.getElementById('gmap'), {
      disableDefaultUI: true,
      keyboardShortcuts: false,
      draggable: false,
      disableDoubleClickZoom: true,
      scrollwheel: false,
      streetViewControl: false
    })
    var view = map.getView();
    var center= view.getCenter();
    var zoom= view.getZoom();
    view.on('change:center', function() {
      var center = ol.proj.transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326');
      gmap.setCenter(new google.maps.LatLng(center[1], center[0]));
    });
    view.on('change:resolution', function() {
      gmap.setZoom(view.getZoom());
    });

    var olMapDiv = document.getElementById('olmap');
    var map = new ol.Map({
      interactions: ol.interaction.defaults({
        altShiftDragRotate: false,
        dragPan: false,
        rotate: false
      }).extend([new ol.interaction.DragPan({kinetic: null})]),
      target: olMapDiv,
      view: view
    });

    view.setCenter(center);
    view.setZoom(zoom);

    olMapDiv.parentNode.removeChild(olMapDiv);
    gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(olMapDiv);
  }
}