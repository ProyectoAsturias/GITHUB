$(document).ready(function(){
    if (visorData != undefined){
        setMapDetails(visorData.mapDetails);
        //console.log(visorData);
    }
    createMap();
    createLegendMap();
})

function replaceAllSubstring(text, target, replacement) {
    return text.split(target).join(replacement);
}