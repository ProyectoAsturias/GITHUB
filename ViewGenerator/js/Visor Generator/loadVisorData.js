$(document).ready(function(){
    if (visorData != undefined){
        setMapDetails(visorData.mapDetails);
    }
    createMap();
    setFunctionsBarPosition(visorData.functionsBar);
    setLegendBarPosition(visorData.legendFrame);
    if (typeof appendLayersObjectToLegend == "function"){
        $(document).ajaxStop(function(){
            //appendLayersObjectToLegend();
            assignLegendEventsHandlers();
            $(this).unbind("ajaxStop");
        })
    }
})

function setLegendBarPosition(legendFrame){
    var leftBarWidth = $("#leftBar").width();
    if (leftBarWidth == null) {
        leftBarWidth == 0;
    }else {
        leftBarWidth += 20;
    }
    var topBarHeight = $("#allTools").height();
    if (topBarHeight == null){
        topBarHeight = 0;
    }else{
        topBarHeight += 10;
    }
    $(".legendBar").css("top", ($(".ol-viewport").height()/100)*legendFrame.position.top + topBarHeight)
    $(".legendBar").css("left", ($(".ol-viewport").width()/100)*legendFrame.position.left + leftBarWidth)
    $(".legendBar").css("height", legendFrame.position.height);
    $(".legendBar").css("width", legendFrame.position.width);
}

function setFunctionsBarPosition(functionsBar){
    var leftBarWidth = $("#leftBar").width();
    if (leftBarWidth == null) {
        leftBarWidth == 0;
    }else {
        leftBarWidth += 20;
    }
    var topBarHeight = $("#allTools").height();
    if (topBarHeight == null){
        topBarHeight = 0;
    }else{
        topBarHeight += 10;
    }
    console.log(leftBarWidth);
    functionsBar.forEach(function (functionBar){
        $("#"+functionBar.id).css("top", ($(".ol-viewport").height()/100)*functionBar.position.top + topBarHeight)
        $("#"+functionBar.id).css("left", ($(".ol-viewport").width()/100)*functionBar.position.left + leftBarWidth)
    })
}

function replaceAllSubstring(text, target, replacement) {
    return text.split(target).join(replacement);
}