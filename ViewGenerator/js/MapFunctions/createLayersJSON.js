$(document).ready(function(){

});
var ajaxQueue = [];

function generateJSONLayers(){
    var mapLayers = map.getLayers();
    var layers = [];
    for (var i = 0; i<mapLayers.getLength(); i++) {
        if (!(mapLayers.item(i).getSource() instanceof ol.source.TileWMS)) {
            continue;
        }
        getJSONLayer(mapLayers.item(i), function(layerAttributes) {
            if (layerAttributes) {
                layers.push(layerAttributes);
            }
        });
    }
    $(document).ajaxStop(function(){
        sendLayersJSON(layers);
    });
}

function sendLayersJSON(layers){
    console.log(JSON.stringify(layers));
}

function getJSONLayer(layer, callback){
    getDescribeFeatureType(layer.getSource().getUrls()[0], layer.name, function(response){
        callback (parseDescribeFeatureType(response));
    });
}

function getDescribeFeatureType(url, layers, callback){
    $.ajax({
        url: url,
        data: {
            "SERVICE": "WFS",
            "REQUEST": "DescribeFeatureType",
            "Version": "1.1.0",
            "typeName": layers
        },
        method: "GET",
        disableCaching: false,
        success: function (response) {
            callback(response);
        }
    });
}

function parseDescribeFeatureType(XMLResponse){
    var context = new Jsonix.Context([XLink_1_0, XSD_1_0]);
    var unmarshaller = context.createUnmarshaller();
    var responseObject = unmarshaller.unmarshalDocument(XMLResponse);
    try {
        var featureAttributes = [];
        var elementNames = [];
        responseObject.value.element.forEach(function(element){
            elementNames.push(element.name);
        });
        responseObject.value.complexType.forEach(function(complexType){
            if (!complexType.complexContent.extension.sequence) return;
            complexType.complexContent.extension.sequence.element.forEach(function (element){
                featureAttributes.push(element.name);
            })
        });
        return {"id": elementNames, "features": featureAttributes};
    } catch (e) {

    }
}