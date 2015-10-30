$(document).ready(function(){
    if (visorData != undefined){
        setMapDetails(visorData.mapDetails);
    }
    createMap();
    if (typeof appendLayersObjectToLegend == "function"){
        $(document).ajaxStop(function(){
            appendLayersObjectToLegend();
            assignLegendEventsHandlers();
            $(this).unbind("ajaxStop");
        })
    }
})

function replaceAllSubstring(text, target, replacement) {
    return text.split(target).join(replacement);
}