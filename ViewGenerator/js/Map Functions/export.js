$(document).ready(function(){
    $(document).ajaxStop(function(){
        populateLayerSelect();
        exportMapEventHandler();
    })
})

function exportMapEventHandler(){
    $(".export").click(function(){
        console.log("ey");
        exportMap("shapefile")
    });
}

function getLayerToExport(){

}

function exportMap(format){
    window.location = "http://192.168.127.129:8080/geoserver/Prueba1/wfs?request=GetFeature&service=wfs&version=1.0.0&typename=bez_arbolado_1&outputformat=SHAPE-ZIP";
}

function populateLayerSelect(){
    map.getLayers().getArray().forEach(function (layer){
        $("#layerSelect").append("<option value="+layer.name+">"+layer.name+"</option");
    })
}
