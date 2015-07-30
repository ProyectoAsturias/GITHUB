$(document).ready(function(){
    attachMapEventHandler();
})

function attachMapEventHandler(){
    $("#attachMapButton").click(function(){
        attachMap($("#attachMapText").val());
    });
}

function attachMap(wmsURL){
    console.log(wmsURL);
    if (wmsURL != ""){
        setMapURL(wmsURL);
        updateMap();
        map.mapURL = wmsURL;
        updateTreeLayer();
        createLegendMap();
    }
}
