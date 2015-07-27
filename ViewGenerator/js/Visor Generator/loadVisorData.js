$(document).ready(function(){
    if (visorData != ""){
        setMapDetails(visorData.mapDetails);
    }
    createMap();
})

function replaceAllSubstring(text, target, replacement) {
    return text.split(target).join(replacement);
}