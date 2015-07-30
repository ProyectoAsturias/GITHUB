$(document).ready(function(){
    if (visorData != ""){
        setMapDetails(visorData.mapDetails);
    }
    createMap();
    createLegendMap();
})

function replaceAllSubstring(text, target, replacement) {
    return text.split(target).join(replacement);
}