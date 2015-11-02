var visorBaseLayer = "Empty";

$(document).ready(function(){
    JSONEventHandler();
});

function JSONEventHandler() {
    $("#saveVisorButton").click(function () {
        saveVisorData(createJsonVisorData());
    });
}

/**
 * Creates a JSON with this visor data, mapDetails and functionsBar (check other methos for more info)
 * @method createJson
 * @return
 */
function createJsonVisorData() {
    addDataAttributes();
    var visorData = {};
    visorData["mapDetails"] = extractMapDetails();
    console.log(visorData);
    visorData["functionsBar"] = extractFunctionsBar();
    visorData["legendFrame"] = extractLegendFrame();
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
    return {"center": map.getView().getCenter(), "zoom": map.getView().getZoom(), "WMSUrl": mapDetails["WMSUrl"], "baseLayer": visorBaseLayer};
}

function getMapUrlsJSON(){
    return JSON.stringify(mapDetails["WMSUrl"]);
}

/**
 * Extracts every function bar in this visor and it's tools.
 * @method extractFunctionsBar
 * @return Array functionsStructure
 */
function extractFunctionsBar(){
    var topLimit = $(".ol-viewport").offset()["top"];
    var mapWidth = $(".ol-viewport").width();
    var mapHeight = $(".ol-viewport").height();
    var leftLimit = $(".ol-viewport").offset()["left"];
    var functionsStructure = new Array();
    $(".functionsBar").each(function(){
        var functionBar = {
            "id": $(this)[0].id ,
            "type": $(this)[0].classList[2],
            "position" : {"top" : ($(this).offset()["top"] - topLimit)*100/mapHeight, "left" : (($(this).offset()["left"]) - leftLimit)*100/mapWidth},
            "functions" : []};
        $(this).find(".function").each(function(){
            functionBar["functions"].push($(this).data("function"));
        });
        functionsStructure.push(functionBar);
    });
    console.log(functionsStructure);
    return functionsStructure;
}

function extractLegendFrame(){

    if ($(".legendBar") !== undefined){
        var legendBar = {
            "position": {"top": $(".legendBar").css("top"), "left": $(".legendBar").css("left"), "height": $(".legendBar").css("height"), "width": $(".legendBar").css("width")}
        }
        return legendBar;
    }else{
        return "";
    }
}

