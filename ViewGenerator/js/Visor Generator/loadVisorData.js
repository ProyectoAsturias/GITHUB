$(document).ready(function(){
    if (visorData != undefined){
        setMapDetails(visorData.mapDetails);
    }
    createMap();
    if (appendLayersObjectToLegend != undefined){
        $(document).ajaxStop(function(){
            appendLayersObjectToLegend();
            assignLegendEventsHandlers();
        })
    }
})

function replaceAllSubstring(text, target, replacement) {
    return text.split(target).join(replacement);
}