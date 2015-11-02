var showLegend;
var legendLayersNames = [];
var previousHeight;

function resizeByCreateEvent(){
    $.widget("ui.resizable", $.ui.resizable, {
        resizeBy: function(newSize) {
            this._mouseStart($.Event("mousedown", { pageX: 0, pageY: 0 }));
            this.axis = 'se';
            var end = $.Event("mouseup", {
                pageX: newSize.width,
                pageY: newSize.height
            });
            this._mouseDrag(end);
            this._mouseStop(end);
        }
    });
}

function makeLegendResizable(){
    $(".legendBar").resizable({
        resize: function(event, ui) {
            $(".legendBar").css("max-height", parseInt($(window).height()) - 5 - parseInt($(".legendBar").css("top")));
            $("#legendContent").css("max-height", parseInt($(".legendBar").css("height"))-25);
        }
    });
    $(".legendBar").resizable("resizeBy", {

    });
}


function createLegendMap(urlWms){
    //var urlWms= server+"geoserver/"+map.name+"/wms";
    //var legendImg ="<img class=\"legendIcon\" src='"+urlWms+"?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+layerName+"' />";
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
                var result = searchLayerInLegend(capabilities.Layer.Layer[i].Name);
                if(!searchLayerInLegend(capabilities.Layer.Layer[i].Name)) {
                    contentHtml += "<div class=\"titleLayer\"><label for=\"" + capabilities.Layer.Layer[i].Name + "\">" + capabilities.Layer.Layer[i].Name + "</label></div><div class=\"imgLayer\" id=\"" + capabilities.Layer.Layer[i].Name + "\"><img crossOrigin=\"Anonymous\" src='" + urlWms + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + capabilities.Layer.Layer[i].Name + "&LEGEND_OPTIONS=forceLabels:on' /></div>";
                    legendLayersNames.push(capabilities.Layer.Layer[i].Name);
                }
            }
            $('#legendContent').append(contentHtml);
            showLegend=true;
        },
        error:function(error){
            alert("Ha fallado la petición GetCapabilities al mapa introducido, ("+ urlWms +") por favor, compruebe la integridad del mismo.");
        }
    });
}

function appendLayersObjectToLegend(){
    for(var i=0; i<legendLayersNames.length; i++){
        $(".titleLayer label[for='"+ legendLayersNames[i]+"']").append("<span class='glyphicon glyphicon-eye-open visibilityLayer' title=\"Visiblidad de capa\"></span>")
        $(".titleLayer label[for='"+ legendLayersNames[i]+"']").data("layer", searchLayerByName(legendLayersNames[i]));
    }
}

function eyeIconClickHandler() {
    $(".visibilityLayer").click(function (event) {
        for (var i=0; i<$(this).parent().data().layer.length; i++){
            if ($(this).parent().data().layer[i].getVisible()) {
                $(this).css("color", "rgb(120,0,0)");
                $(this).parent().data().layer[i].setVisible(false);
            } else {
                $(this).css("color", "black");
                $(this).parent().data().layer[i].setVisible(true);
            }
        }

    });
}

function assignLegendEventsHandlers(){
    hideLegend();
    closeLegend();
    eyeIconClickHandler();
    resizeByCreateEvent();
    makeLegendResizable();
}

function hideLegend(){
    $(".hideLegend").click(function(event){
        if(showLegend){
            $("#legendContent").hide();
            showLegend=false;
            previousHeight = $(".legendBar").css("height");
            $(".legendBar").css("height", 25)
        }
        else{
            $("#legendContent").show();
            showLegend=true;
            $(".legendBar").css("height", previousHeight)
        }
    });
}

function closeLegend(){
    $(".removeLegend").click(function(event){
        $(".legendBar").hide();
    });
}

function createEmptyLegend(){
    assignLegendEventsHandlers();
}

function searchLayerByName(layerName){
    var searchResult = [];
    for (var i=0; i<map.getLayers().getLength(); i++){
        if (map.getLayers().getArray()[i].name == layerName){
            searchResult.push(map.getLayers().getArray()[i]);
        }
    }
    if (searchResult.length == 0){
        return false;
    }else{
        return searchResult;
    }
}

function attachMap(wmsURL){
    addMapUrl(wmsURL);
    var treeData = addLayersAndGroupsFromWMS(wmsURL);
    createLayerTreeFromSource(treeDataSource);
    createLegendMap(wmsURL);
}

function searchLayerInLegend(layerName){
    var labels = $(".titleLayer label").toArray();
    for (var i = 0; i<labels.length; i++){
        if (labels[i].innerText == layerName){
            return true;
        }
    }
    return false;
}

