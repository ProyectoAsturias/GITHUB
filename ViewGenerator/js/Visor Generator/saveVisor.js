var visorBaseLayer = "Empty";

$(document).ready(function(){
    JSONEventHandler();
});

function JSONEventHandler() {
    $("#saveVisorButton").click(function () {
        saveVisorData(createJsonVisorData());
        saveVisorPreview();
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
    visorData["imageCode"]= extractImageCode();
    visorData["title"]= extractTitle();

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
    return {"center": map.getView().getCenter(), "zoom": map.getView().getZoom(), "WMSUrl": mapDetails["WMSUrl"], "baseLayer": visorBaseLayer, "entityId": mapDetails["entityId"] };
}

function getMapUrlsJSON(){
    return JSON.stringify(mapDetails["WMSUrl"]);
}

function extractImageCode(){
    console.log(visorData);
    if(!visorData || !visorData["imageCode"]){
        if(!previews.imageCode)
            return "0.gif";
        else
            return previews.imageCode;
    }
    else{
        return visorData["imageCode"];
    }
}

function extractTitle(){
    if(!visorData || !visorData["title"]){
        if(!previews.title)
            return visorName;
        else
            return previews.title;
    }
    else{
        return visorData["title"];
    }
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
    var topLimit = $(".ol-viewport").offset()["top"];
    var mapWidth = $(".ol-viewport").width();
    var mapHeight = $(".ol-viewport").height();
    var leftLimit = $(".ol-viewport").offset()["left"];
    if ($(".legendBar") !== undefined){
        var legendBar = {
            "position" : {"top" : ($(".legendBar").offset()["top"] - topLimit)*100/mapHeight, "left" : (($(".legendBar").offset()["left"]) - leftLimit)*100/mapWidth, "height": $(".legendBar").css("height"), "width": $(".legendBar").css("width")}
        }
        return legendBar;
    }else{
        return "";
    }
}

function saveVisorPreview(){
    var element = $("#mapContainer");
    var url="";
    html2canvas(element, {
        useCORS : true,
        onrendered : function (canvas) {
            url = canvas.toDataURL("image/png");
            $.ajax({
                type : "POST",
                url : "../php/uploadImage.php",
                data : {
                    tag:"saveVisorPreview",
                    visorName:visorName,
                    url: url
                },
                success:function (response){
                    console.log(response);
                },
                error:function(error){
                    console.log(error);
                }
            }); 
        }
    });
}