var map;
var mapDetails={};
var layersNames=[];
var grupos=[];
var layersGroupedNames = [];

/**
 * Stores in array map details, such as source WMS url, center and zoom.
 * @method setMapDetails
 * @param {} sentMapDetails
 * @return
 */
function setMapDetails(sentMapDetails){
    setMapURL(sentMapDetails["WMSUrl"]);
    //mapDetails["WMSUrl"] = 'http://192.168.127.128:8080/geoserver/Prueba1/wms';
    //setMapURL("http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx");
    //mapDetails["WMSUrl"] = "http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms";
    setMapCenter(sentMapDetails["center"]);
    setMapZoomLevel(sentMapDetails["zoom"]);
    setBaseLayer(sentMapDetails["baseLayer"]);
}

function setMapURL(WMSUrl){
    mapDetails["WMSUrl"] = WMSUrl;
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


function createMap() {
    map = new ol.Map({
        target: 'map',  // The DOM element that will contains the map
        interactions: ol.interaction.defaults({ doubleClickZoom: false }),
        controls: ol.control.defaults({attribution: false}),
        renderer: 'canvas',
        view: new ol.View({
            projection: ('EPSG:4230', 'EPSG:900913'),
            center: mapDetails.center,
            zoom: mapDetails.zoomLevel
        })
    });

    if (mapDetails["WMSUrl"]) {
        try {
            addLayersAndGroupsFromWMS(mapDetails["WMSUrl"]);
            map.mapURL = mapDetails["WMSUrl"];

        }catch (error){
            console.log("WOP");
        }
    }
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
        var capabilitiesParser = parser.read(response);
        //console.log(capabilitiesParser);
        var bBox =capabilitiesParser.Capability.Layer.BoundingBox[0].extent;
        var extent = ol.extent.applyTransform(bBox, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));
        map.getView().fitExtent(extent, map.getSize());
        for(var i = 0; i < capabilitiesParser.Capability.Layer.Layer.length; i ++){
            //console.log(capabilitiesParser.Capability.Layer.Layer[i]);
            layersNames.push(capabilitiesParser.Capability.Layer.Layer[i].Name);
            //aqui debemos sacar el campo abstract, ya que nos dice si la capa es un grupo o no
            grupos.push(capabilitiesParser.Capability.Layer.Layer[i].Abstract)
        }
        for(var j = 0; j < layersNames.length; j ++) {
            if(grupos[j] && grupos[j].includes("Layer-Group")){
                addGroupToMap(j, WMSUrl);
                continue;
            }
            addLayerToMap(j, WMSUrl);
        }
    });
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

function addLayerToMap(layerIndex, WMSUrl){
    var nombre = layersNames[layerIndex];
    if (layersGroupedNames.indexOf(nombre) != -1){
        return;
    }
    var newlayer = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            crossOrigin:'anonymous',
            preload: Infinity,
            url: WMSUrl,
            serverType:'geoserver',
            params:{
                'LAYERS':""+nombre+"", 'TILED':true
            }
        })
    });
    newlayer.name = layersNames[layerIndex];
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