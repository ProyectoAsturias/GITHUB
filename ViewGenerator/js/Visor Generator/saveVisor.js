$(document).ready(function(){
    JSONEventHandler();
});

function JSONEventHandler() {
    $("#saveVisorButton").click(function () {
        saveVisorData(createJson());
    });
}

/**
 * Creates a JSON with this visor data, mapDetails and functionsBar (check other methos for more info)
 * @method createJson
 * @return
 */
function createJson() {
    addDataAttributes();
    var visorData = {};
    visorData["mapDetails"] = extractMapDetails();
    visorData["functionsBar"] = extractFunctionsBar();
    return visorData;
}

function saveVisorData(visorData) {
    console.log(JSON.stringify(visorData));
}

/**
 * Extracts to an array the map center and zoom level.
 * @method extractMapDetails
 * @return ObjectExpression
 */
function extractMapDetails(){
    return {"center": map.getView().getCenter(), "zoom": map.getView().getZoom(), "WMSUrl": map.mapURL};
}

/**
 * Extracts every function bar in this visor and it's tools.
 * @method extractFunctionsBar
 * @return Array functionsStructure
 */
function extractFunctionsBar(){
    var functionsStructure = new Array();
    $(".functionsBar").each(function(){
        var functionBar = {
            "position" : {"top" : $(this).css("top"), "left" : $(this).css("left")},
            "functions" : []};
        $(this).find(".function").each(function(){
            functionBar["functions"].push($(this).data("function"));
        });
        functionsStructure.push(functionBar);
    });
    return functionsStructure;
}
