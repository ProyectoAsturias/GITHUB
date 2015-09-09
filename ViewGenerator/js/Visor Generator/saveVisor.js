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
    $.ajax({
        url: "../../Tables/php/userContent.php",
        data: {
            "tag" : "saveVisorContent",
            "visorContent" : JSON.stringify(visorData),
            "visorName" : visorName
        },
        method: "POST",
        success: function (response) {
            console.log("Guardado");
            console.log(response);
        }
    });
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
            "id": $(this)[0].id ,
            "type": $(this)[0].classList[2],
            "position" : {"top" : $(this).css("top"), "left" : $(this).css("left")},
            "functions" : []};
        $(this).find(".function").each(function(){
            functionBar["functions"].push($(this).data("function"));
        });
        functionsStructure.push(functionBar);
    });
    console.log(functionsStructure);
    return functionsStructure;
}
