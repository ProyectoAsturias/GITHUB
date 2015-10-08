var enabled = false;
var layersNames=[];
var activeFeature;

$(document).ready(function(){
    RetrieveEventHandler();
});

/**
 * Adds event handler and JQuery data attribute on this button.
 * @method eventHandler
 * @return
 */
function RetrieveEventHandler() {
    $(".dataRetrieving").click(function () {
        toggleDataRetrieving();
        generateJSONLayers();
    });
}

/**
 * Switch between enable/disable on this tool.
 * @method toggleDataRetrieving
 * @return
 */
function toggleDataRetrieving(){
    enabled ? disableDataRetrieving() : enableDataRetrieving();
}

/**
 * Enables this tool.
 * @method enableDataRetrieving
 * @return
 */
function enableDataRetrieving() {
    enabled = true;
    map.on('singleclick', retrieveData);
}

/**
 * Disables this tool.
 * @method disableDataRetrieving
 * @return
 */
function disableDataRetrieving(){
    enabled = false;
    map.un("singleclick", retrieveData);
}

/**
 * Detects click event position and download, for every layer visible, features on it.
 * @method retrieveData
 * @param {} evt
 * @return
 */
function retrieveData(evt) {
    //console.log(evt);
    var overlays=map.getOverlays();
    map.removeOverlay(overlays.b[0]);
    layersNames=[];
    $("#retrievedData").html("Cargando...");
    var view = map.getView();
    var viewResolution = view.getResolution();
    var coord= evt.coordinate;
    var popup = $("<div id=\"info\"></div>");
    var overlay = new ol.Overlay({
        element:popup
    });
    map.addOverlay(overlay);
    overlay.setPosition(coord);
    $("#info").empty();
    $("#info").append("<ul class=\"menu5 nav nav-pills\"  id=\"layersHeader\"></ul><div id=\"dataTable\" class=\"tab-content\"></div>");

    var mapLayers = map.getLayers();
    for (var i = 0; i<mapLayers.getLength(); i++){
        if (!mapLayers.item(i).get("visible")) continue;

        var source = mapLayers.item(i).getSource();
        if (!(source instanceof ol.source.TileWMS)) continue;
        //console.log(new ol.format.WFS().readFeatureCollectionMetadata(source));
        var url = source.getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, view.getProjection(),
            {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50});
        if (url) getDataFromURL(url);
    }
}

/**
 * Starts an AJAX request to the specified URL.
 * @method getDataFromURL
 * @param {} url
 * @return
 */
function getDataFromURL(url) {
    $.ajax({url: url,
        success: function(resultData){
            addDataToBeShown(resultData["features"]);
        }});
}

/**
 * Add features downloaded data to be shown.
 * @method addDataToBeShown
 * @param {} features
 * @return
 */

function addDataToBeShown(features){
    if (!features) return;
    features.forEach(function (feature){
        console.log(feature);
        var layerName=feature.id.split(".")[0];
        layerName=layerName.replace(/ /g,"_");
        if(layersNames.indexOf(layerName)==-1){
            layersNames.push(layerName);
            if(layersNames.length==1){
                $("#layersHeader").append("<li class=\"active\" id=\"layer"+layerName+"\"><a data-toggle=\"pill\" onclick=\"changePills('"+layerName+"')\" ><b>"+layerName+"</b></a>");
                activeFeature=layerName;
                var headTable="<table id=\""+layerName+"\" class=\"tab-pane fade in active\"><tr>";
            }
            else {
                $("#layersHeader").append("<li id=\"layer"+layerName+"\"><a data-toggle=\"pill\" onclick=\"changePills('"+layerName+"')\"><b>"+layerName+"</b></a>");
                var headTable="<table id=\""+layerName+"\" class=\"tab-pane fade\"><tr>";
            }
            $.each(feature.properties, function(key, value) {
                headTable +="<th>"+key+"</th>";
            });
            headTable +="</tr></table>";
            $("#dataTable").append(headTable);
        }
        var bodyTable="<tr>";
        $.each(feature.properties, function(key, value) {
            bodyTable +="<td>"+value+"</td>";
        });
        bodyTable+="</tr>";
        $("#"+layerName+"").append(bodyTable);
    });
}

function changePills(layerName){
    $("#layer"+activeFeature).removeClass("active");
    $("#layer"+layerName).addClass("active");
    $("#"+activeFeature).removeClass("active in");
    $("#"+layerName).addClass("active in");
    activeFeature=layerName;
}