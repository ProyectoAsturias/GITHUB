var googleLayer=true;
var gmap;
function baseLayer(layerName){
	removeOldBaseLayer();
    saveBaseLayer(layerName);
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
    }else if (layerName == "Empty"){
      var html="<span data-label-placement>Sin capa base</span> <span class=\"caret\"></span>";
      $("#baseLayerButton #baseButton").empty().append(html);
    }
}

function removeOldBaseLayer(){
  var layersArray=map.getLayers().getArray();
  for(var i=0;i<layersArray.length;i++){
  	if(layersArray[i].base==true)
  		map.removeLayer(layersArray[i])
  }
  /*if (gmap != undefined){
    gmap = undefined;
    $('#gmap').hide();
  }*/
  //$('#gmap').hide();
}

function googleMapLayer(map){
  if (googleLayer){
    $("#gmap").addClass("fill");
    googleLayer=false;
    gmap = new google.maps.Map(document.getElementById('gmap'), {
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

function saveBaseLayer(layerName){
  if (typeof(mapName) !== "undefined"){
    saveMapBaseLayer(mapName, layerName);
  }else if (typeof(visorName) !== "undefined"){
    visorBaseLayer = layerName;
  }
}

function saveMapBaseLayer(mapName, layerName){
  $.ajax({
    url: "../../Tables/php/userContent.php",
    data: {
      "tag" : "saveMapBaselayer",
      "mapName" : mapName,
      "baselayerName" : layerName
    },
    method: "POST",
    success: function (response) {
      console.log(response);
    }
  });
}