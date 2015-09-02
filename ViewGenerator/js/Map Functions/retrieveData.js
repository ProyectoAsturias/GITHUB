var enabled = false;

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
    $("#retrievedData").html("Cargando...");
    var view = map.getView();
    var viewResolution = view.getResolution();

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
        console.log(feature["properties"]);
    });
}