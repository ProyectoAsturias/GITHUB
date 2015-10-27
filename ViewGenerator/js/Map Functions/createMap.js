var map;
var mapDetails={};
var layersNames=[];
var grupos=[];
var layersGroupedNames = [];
var treeDataSource = [];

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
    console.log(mapDetails);
}

function setMapURL(WMSUrlArray){
    mapDetails["WMSUrl"] = [];
}

function addMapUrl(WMSUrl){
    mapDetails["WMSUrl"].push(WMSUrl);
    console.log(mapDetails);
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

    visorData.mapDetails.WMSUrl.forEach(function (url){
        attachMap(url);
    })

    map.addControl(new ol.control.ScaleLine());
    if (typeof (toolsDraggable) == "function"){
        toolsDraggable();
    }
    //console.log(mapDetails["baseLayer"]);
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
            console.log(response);
            var bBox=[];
            var split1 = response.split(",")[0].split("(")[1].split(" ");
            var split2 = response.split(",")[1].split(")")[0].split(" ");
            bBox.push(parseFloat(split1[0]),parseFloat(split1[1]),parseFloat(split2[0]),parseFloat(split2[1]));
            var extent=ol.extent.applyTransform(bBox, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));
            map.getView().fitExtent(extent, map.getSize());
        },
        error: function (response){
            console.log(response);
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
            dataMap.layers = [];
            var capabilitiesParser = parser.read(response);
            //console.log(capabilitiesParser);
            for(var i = 0; i < capabilitiesParser.Capability.Layer.Layer.length; i ++){
                if (!searchLayerByName(capabilitiesParser.Capability.Layer.Layer[i].Name)){
                    if(capabilitiesParser.Capability.Layer.Layer[i].cascaded==1){
                        dataMap.layers.push(addLayerWmsToMap(capabilitiesParser.Capability.Layer.Layer[i].Name,WMSUrl));
                    }
                    else{
                        var layer=addLayerToMap(capabilitiesParser.Capability.Layer.Layer[i].Name,WMSUrl);
                        dataMap.layers.push(layer);
                    }
                }
            }
            treeDataSource.push(dataMap);
            return treeDataSource;
    });
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
            addLayerToMap(groupIndex, WMSUrl);
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
    console.log("entra");
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
    map.addLayer(layer);
    return layer;
}

function addLayerToMap(name, WMSUrl){
    var newlayer = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            crossOrigin:'anonymous',
            preload: Infinity,
            url: WMSUrl,
            serverType:'geoserver',
            params:{
                'LAYERS':""+name+"", 'TILED':true
            }
        })
    });
    newlayer.name = name;
    map.addLayer(newlayer);
    return newlayer;
}

function searchAndRemoveLayer(layerToRemove){
    map.getLayers().forEach(function(layer){
        if (layer.name == layerToRemove.name){
            map.removeLayer(layer);
        }
    });
}