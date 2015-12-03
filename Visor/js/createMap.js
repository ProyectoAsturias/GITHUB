var map;
var mapDetails={};
var layersNames=[];
var grupos=[];
var layersGroupedNames = [];
var treeDataSource = [];
var vectorLayers=[];

/**
 * Stores in array map details, such as source WMS url, center and zoom.
 * @method setMapDetails
 * @param {} sentMapDetails
 * @return
 */
function setMapDetails(sentMapDetails){
    setMapURL(sentMapDetails["WMSUrl"]);
    setMapEntity(sentMapDetails["entityId"]);
    setMapCenter(sentMapDetails["center"]);
    setMapZoomLevel(sentMapDetails["zoom"]);
    setBaseLayer(sentMapDetails["baseLayer"]);
}

function setMapURL(WMSUrlArray){
    mapDetails["WMSUrl"] = [];
}

function addMapUrl(WMSUrl){
    mapDetails["WMSUrl"].push(WMSUrl);
}

function setMapEntity(entityId){
    mapDetails["entityId"] = entityId;
}

function setMapCenter(center){
    mapDetails["center"] = center;
}

function setMapZoomLevel(zoomLevel){
    mapDetails["zoomLevel"] = zoomLevel;
}

function setBaseLayer(layerName){
    mapDetails["baseLayer"] = layerName;
}

function setMapName(wmsUrl){
    var pattern = /^(.+)(geoserver\/)(.+)(\/wms)$/;
    var match = wmsUrl.match(pattern)
    map.name = match[3];
}

function createMap() {
    map = new ol.Map({
        target: 'olmap',  // The DOM element that will contains the map
        interactions: ol.interaction.defaults({ doubleClickZoom: false }),
        controls: ol.control.defaults({attribution: false}),
        renderer: 'canvas',
        view: new ol.View({
            //projection: ('EPSG:4230', 'EPSG:900913'),
            center: mapDetails.center,
            zoom: mapDetails.zoomLevel
        })
    });
    $(".imagenFooterVisor").append("<img src=\""+visorData["imageCode"]+"\">");
    if (visorData != null){
        visorData.mapDetails.WMSUrl.forEach(function (url){
            attachMap(url);
        })
    }


    map.addControl(new ol.control.ScaleLine());
    if (typeof (toolsDraggable) == "function"){
        toolsDraggable();
    }
    baseLayer(mapDetails["baseLayer"]);
}

function destroyMap(){
    map.setTarget(null);
}

function addBaseOSMLayer(){
    var osmLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    osmLayer.name = "OpenStreet Maps";
    osmLayer.base = true;
    map.addLayer(osmLayer);
}

function setBbox(entityId){
    $.ajax({
        type: "POST",
        url : apiPath+"apiLocalgis.php",
        data : {
            tag:"getBbox",
            entityId:entityId
        },
        success: function (response) {
            var bBox=[];
            var split1 = response.split(",")[0].split("(")[1].split(" ");
            var split2 = response.split(",")[1].split(")")[0].split(" ");
            bBox.push(parseFloat(split1[0]),parseFloat(split1[1]),parseFloat(split2[0]),parseFloat(split2[1]));
            var extent=ol.extent.applyTransform(bBox, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));
            map.getView().fitExtent(extent, map.getSize());
        },
        error: function (response){
        }
    })
}

function updateMap(){
    destroyMap();
    setMapCenter(map.getView().getCenter());
    setMapZoomLevel(map.getView().getZoom());
    createMap();
}

function resetGlobalVariables(){
    layersNames=[];
    grupos=[];
    layersGroupedNames = [];
}

function addLayersAndGroupsFromWMS(WMSUrl){
    var dataMap = {url: WMSUrl};
    dataMap.name = WMSUrl.split("/")[WMSUrl.split("/").length-2];
    resetGlobalVariables();
    var parser = new ol.format.WMSCapabilities();
    $.ajax({
        type: "GET",
        jsonp: "callback",
        dataType: 'text',
        url: WMSUrl + '?request=getcapabilities&service=wms',
        crossDomain : true
    })
        .then(function(response) {
            //Si estás leyendo este código, lo siento, no hay tiempo para reformatear el código repetido. Pero si has llegado hasta aquí vas bien :D Te has ganado un café.
            dataMap.layers = [];
            var capabilitiesParser = parser.read(response);
            var layersOrderInfo = findLayersCollectionForWms(WMSUrl);
            if (layersOrderInfo != null){
                layersOrderInfo.reverse().forEach(function (layerOrdering){
                    for(var i = 0; i < capabilitiesParser.Capability.Layer.Layer.length; i ++){
                        if (capabilitiesParser.Capability.Layer.Layer[i].Name == layerOrdering.name){
                            if(capabilitiesParser.Capability.Layer.Layer[i].cascaded==1){
                                dataMap.layers.push(addLayerWmsToMap(capabilitiesParser.Capability.Layer.Layer[i].Name,WMSUrl, layerOrdering.transparency));
                            }
                            else{
                                var layer=addLayerToMap(capabilitiesParser.Capability.Layer.Layer[i].Name,WMSUrl, layerOrdering.transparency, layerOrdering.visible);
                                dataMap.layers.push(layer);
                            }
                        }
                    }
                });
            }else{
                for(var i = 0; i < capabilitiesParser.Capability.Layer.Layer.length; i ++){
                     if(capabilitiesParser.Capability.Layer.Layer[i].cascaded==1){
                        dataMap.layers.push(addLayerWmsToMap(capabilitiesParser.Capability.Layer.Layer[i].Name,WMSUrl));
                     }
                     else{
                        var layer=addLayerToMap(capabilitiesParser.Capability.Layer.Layer[i].Name,WMSUrl, 1, true);
                        dataMap.layers.push(layer);
                     }
                }
            }
            treeDataSource.push(dataMap);
            return treeDataSource;
        });
}

function findLayersCollectionForWms(WmsUrl){
    if (globalWmsLayersInfo == undefined) return;
    for (var i=0; i<globalWmsLayersInfo.length; i++) {
        if (globalWmsLayersInfo[i].url == WmsUrl) {
            return globalWmsLayersInfo[i].layers;
        }
    }
}

function searchLayerByName(layerName){
    var searchResult = [];
    for (var i=0; i<map.getLayers().getLength(); i++){
        if (map.getLayers().getArray()[i].name == layerName){
            searchResult.push(map.getLayers().getArray()[i]);
        }
    }
    if (searchResult.length == 0){
        return false;
    }else{
        return searchResult;
    }
}

function addGroupToMap(groupIndex, WMSUrl) {
    var nombre=layersNames[groupIndex];
    requestLayersForGroup(nombre, WMSUrl, function(layersInGroup){
        if(layersInGroup.length == 0){
            addLayerToMap(groupIndex, WMSUrl, 1, true);
            return;
        }
        var layerGroup = new ol.layer.Group({
            layers: layersInGroup
        });
        layerGroup.name = nombre;
        map.addLayer(layerGroup);
    });
}

function requestLayersForGroup(groupName, WMSUrl, callback){
    $.ajax({
        url: WMSUrl + "?request=DescribeLayer&service=WMS&version=1.1.1&outputformat=application/json&layers=" + groupName,
        type: "GET",
        complete: function (response){
            try{
                var objectResponse = JSON.parse(response.responseText);
            }catch(error){
                callback([]);
                return;
            }
            var groupLayers = [];
            objectResponse.layerDescriptions.forEach(function (layer){
                var groupLayer = new ol.layer.Tile({
                    source: new ol.source.TileWMS({
                        crossOrigin:'anonymous',
                        preload: Infinity,
                        url: WMSUrl,
                        servertype: "geoserver",
                        params:{ "LAYERS": layer.layerName.split(":")[1], "TILED": true}
                    })
                });
                groupLayer.name = layer.layerName.split(":")[1];
                layersGroupedNames.push(layer.layerName.split(":")[1]);
                searchAndRemoveLayer(groupLayer);
                groupLayers.push(groupLayer);
            });
            callback(groupLayers);
        }
    });
}

function addLayerWmsToMap(name, wmsUrl){
    var format = 'image/png';
    var layer = new ol.layer.Image({
        source: new ol.source.ImageWMS({
          ratio: 1,
          url: wmsUrl,
          params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            STYLES: '',
            LAYERS:  name,
          }
        })
    });
    layer.name = name;
    layer.wms=true;
    map.addLayer(layer);
    return layer;
}

function addLayerToMap(name, WMSUrl, opacity, visibility){
	var projExtent = ol.proj.get('EPSG:3857').getExtent();
    var startResolution = ol.extent.getWidth(projExtent) / 1024;
    var resolutions = new Array(22);
    for (var i = 0, ii = resolutions.length; i < ii; ++i) {
        resolutions[i] = startResolution / Math.pow(2, i);
    }
    var tileGrid = new ol.tilegrid.TileGrid({
        extent : projExtent,
        resolutions : resolutions,
        tileSize : [1024, 1024]
    });
    var newlayer = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            crossOrigin:'anonymous',
            preload: Infinity,
            url: WMSUrl,
            serverType:'geoserver',
			tileGrid: tileGrid,
            params:{
                'LAYERS':""+name+"", 'TILED':true
            }
        })
    });
    newlayer.name = name;
    newlayer.wms=false;
    newlayer.setOpacity(opacity);
    newlayer.setVisible(visibility);
    map.addLayer(newlayer);
    return newlayer;
}

function addVectorLayer(name, mapName, projectionCode){
    if (projectionCode=="25829"){
        proj4.defs("EPSG:25829","+proj=utm +zone=29 +ellps=GRS80 +units=m +no_defs");
        var projection=ol.proj.get('EPSG:25829');
        var code="EPSG:"+projectionCode;
    }
    else{
        proj4.defs("EPSG:25830","+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs");
        var projection=ol.proj.get('EPSG:25830');
        var code="EPSG:"+projectionCode;        
    }
	var url=serverGS+"geoserver/"+mapName+"/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+name+"&maxFeatures=340000&outputFormat=application/json";
	$.ajax({
		url: url,
		success:function (data) {
			// first add features 
			var vector = new ol.layer.Vector({
				source: new ol.source.Vector(),
                visible:false,
				opacity:0
			});
			map.addLayer(vector);
			var format = new ol.format.GeoJSON({
			});
			var features = format.readFeatures(data, {
				dataProjection: code,
				featureProjection: 'EPSG:3857'
			});
            vector.name="vector"+name;
           // console.log(map.getLayers());
			vector.getSource().addFeatures(features);
			vectorLayers.push(vector);
		}
	});
}

function searchAndRemoveLayer(layerToRemove){
    map.getLayers().forEach(function(layer){
        if (layer.name == layerToRemove.name){
            map.removeLayer(layer);
        }
    });
}