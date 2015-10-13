var activatedWmsWindow=false;
$(document).ready(function(){
	wmsButtonEventHandler();
});

function wmsButtonEventHandler(){
  	$(".wmsimport").click(function () {
        if(!activatedWmsWindow)
        	openWmsImportwindow();
    });
}

function openWmsImportwindow(){
	activatedWmsWindow=true;
	var wmsImportWindow="<div id=\"wmsImportWindow\">"+
					        "<div class=\"modal-content\">"+
					            "<div class=\"modal-header\">"+
					                "<button type=\"button\" onclick=\"cancel()\" class=\"close\" >&times;</button>"+
                					"<h4 class=\"modal-title\">Importar WMS</h4>"+
					            "</div>"+
					            "<div class=\"modal-body\">"+
					            	"<label for=\"wmsImport\">Introduzca Wms</label>"+
					            	"<input type=\"text\" class=\"form-control\" id=\"wmsImport\">"+
					            	"<button onclick='importWms()' id=\"delKeyword\" class=\"btn btn-success btn-block\"  >Importar Wms</button>"+
					            "</div>"+
					        "</div>"+
						"</div>";
	$('#map').append(wmsImportWindow);
	$("#wmsImportWindow").draggable({
        containment: $(".ol-viewport"),
    });
}

function importWms(){
	var wms=$("#wmsImport").val();
	wms = wms.trim();
	wms = wms.split("?");
	wms = wms[0];
	$.ajax({
		type : "GET",
		jsonp : "callback",
		dataType : 'text',
		url : wms+'?request=getCapabilities&service=wms',
		crossDomain : true,
		success:function (response) {
			var parser = new ol.format.WMSCapabilities();
			var service = parser.read(response);
			console.log(service);
			var capabilities = service.Capability;
			var title = service.Service.Title;
			title=title.replace(/ /gi,'_');
			var modalList="";
			for(var i=0; i<capabilities.Layer.Layer.length; i++){
				modalList+="<label><input type=\"checkbox\" value=\""+capabilities.Layer.Layer[i].Name+"\" class=\"checkboxLayers\"></input>  "+capabilities.Layer.Layer[i].Name+"</label></br>";
			}
			modalList+="<button type=\"button\" onclick=\"importLayersWms('"+wms+"')\" class=\"btn btn-success btn-block\">Importar Capas</button>";
			$("#wmsImportWindow .modal-header").empty().append("<button type=\"button\" onclick=\"cancel()\" class=\"close\" >&times;</button><h4 class=\"modal-title\">Seleccione capas a importar</h4>");
			$("#wmsImportWindow .modal-body").empty().append(modalList);
		},
		error:function(error){
			alert("Error al importar un wms: "+error);
		}
	});
}

function importLayersWms(wms){
	$(".checkboxLayers").each(function(){
		if($(this).is(':checked')){
			var check=checkLayer($(this).val());
			if(check)
				addLayerWms($(this).val(),wms);
		}
	});
	$("#wmsImportWindow .modal-header").empty().append("<button type=\"button\" onclick=\"cancel()\" class=\"close\" >&times;</button><h4 class=\"modal-title\">Importar WMs</h4>");
	$("#wmsImportWindow .modal-body").empty().append("<label for=\"close\">Wms Importado con éxito</label><button type=\"button\" id=\"close\" onclick=\"cancel()\" class=\"btn btn-success btn-block\">Cerrar</button>");
}

function checkLayer(name){
	var check=true;
	var layers=map.getLayers().getArray();
	for(var i=0; i<layers.length; i++){
		if(layers[i].name==name)
			check=false;
	}
	return check;
}

function addLayerWms(name,wmsUrl){
    console.log("entra");
    var format = 'image/png';
    var layer = new ol.layer.Image({
        source: new ol.source.ImageWMS({
          ratio: 1,
          url: wmsUrl,
          params: {
            'FORMAT': format,
            'VERSION': '1.1.1',
            STYLES: '',
            LAYERS:  name,
          }
        })
    });
    layer.name = name;
    map.addLayer(layer);
	addLegendLayer(name,wmsUrl);
	return layer;
}

function addLegendLayer(name, wms){
	var legendLayer="<div class=\"titleLayer\"><label for=\""+name+"\">"+name+"</label></div><div class=\"imgLayer\" id=\""+name+"\"><img crossOrigin=\"Anonymous\" src='"+wms+"?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+name+"&LEGEND_OPTIONS=forceLabels:on' /></div>";
	$('#legendContent').append(legendLayer);
}

function cancel(){
	activatedWmsWindow=false;
	$("#wmsImportWindow").remove();
}