var showLegend;
var legendLayersNames = [];

function createLegendMap(){
    //var urlWms= server+"geoserver/"+map.name+"/wms";
    //var legendImg ="<img class=\"legendIcon\" src='"+urlWms+"?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+layerName+"' />";
    var urlWms = map.mapURL;
    if (urlWms == undefined){
        createEmptyLegend();
        return;
    }
    var parser = new ol.format.WMSCapabilities();
    $.ajax({
        type : "GET",
        jsonp : "callback",
        dataType : 'text',
        url : urlWms+'?request=getCapabilities&service=wms',
        crossDomain : true,
        success: function (response){
            var service = parser.read(response);
            var capabilities = service.Capability;
            var contentHtml="";
            for(var i=0; i<capabilities.Layer.Layer.length; i++){
                contentHtml +="<div class=\"titleLayer\"><label id=\""+capabilities.Layer.Layer[i].Name+"\">"+capabilities.Layer.Layer[i].Name+"</label></div><div class=\"imgLayer\" id=\""+capabilities.Layer.Layer[i].Name+"\"><img crossOrigin=\"Anonymous\" src='"+urlWms+"?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+capabilities.Layer.Layer[i].Name+"&LEGEND_OPTIONS=forceLabels:on' /></div>";
                legendLayersNames.push(capabilities.Layer.Layer[i].Name);
            }
            console.log(legendLayersNames);
            var legendHtml="<div id=\"titleMap\"><label for=\"legendContent\">LEYENDA</label>"+
                "<span class='glyphicon glyphicon-remove removeLegend legend'></span>"+
                "<span class='glyphicon glyphicon-minus hideLegend legend'></span></div>"+
                "<div id=\"legendContent\"></div>";
            $('.legendBar').empty();
            //console.log(legendHtml);
            $('.legendBar').append(legendHtml);
            $('#legendContent').append(contentHtml);
            showLegend=true;
            appendLayersObjectToLegend();
            assignLegendEventsHandlers();
        },
        error:function(error){
            alert("Ha fallado la petición GetCapabilities al mapa introducido, por favor, compruebe la integridad del mismo.");
        }
    });
}

function appendLayersObjectToLegend(){
    for(var i=0; i<legendLayersNames.length; i++){
        $(".titleLayer #"+ legendLayersNames[i]).append("<span class='glyphicon glyphicon-eye-open visibilityLayer' title=\"Visiblidad de capa\"></span>")
        $(".titleLayer #"+ legendLayersNames[i]).data("layer", searchLayerByName(legendLayersNames));
    }
}

function eyeIconClickHandler() {
    $(".visibilityLayer").click(function (event) {

        if ($(this).parent().data().layer.getVisible()) {
            $(this).css("color", "rgb(120,0,0)");
            $(this).parent().data().layer.setVisible(false);
        } else {
            $(this).css("color", "black");
            $(this).parent().data().layer.setVisible(true);
        }
    });
}

function assignLegendEventsHandlers(){
    hideLegend();
    closeLegend();
    eyeIconClickHandler();
}

function hideLegend(){
    $(".hideLegend").click(function(event){
        if(showLegend){
            $("#legendContent").hide();
            showLegend=false;
        }
        else{
            $("#legendContent").show();
            showLegend=true;
        }
    });
}

function closeLegend(){
    $(".removeLegend").click(function(event){
        $(".legendBar").hide();
    });
}

function createEmptyLegend(){
    var legendHtml="<div id=\"titleMap\"><label for=\"legendContent\">Leyenda</label>"+
        "<span class='glyphicon glyphicon-remove removeLegend legend'></span>"+
        "<span class='glyphicon glyphicon-minus hideLegend legend'></span></div>"+
        "<div id=\"legendContent\"></div>";
    $('.legendBar').empty();
    $('.legendBar').append(legendHtml);
}

function searchLayerByName(layerName){
    for (var i=0; i<map.getLayers().getLength(); i++){
        if (map.getLayers().getArray()[i].name == layerName){
            return map.getLayers().getArray()[i];
        }
    }
    return false;
}
