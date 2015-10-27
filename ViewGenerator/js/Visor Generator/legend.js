var showLegend;
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
		height: "1"
	});
}

function createLegendMap(urlWms){
	var parser = new ol.format.WMSCapabilities();
	$.ajax({
		type : "GET",
		jsonp : "callback",
		dataType : 'text',
		url : urlWms+'?request=getCapabilities&service=wms',
		crossDomain : true,
		success: function (response){
			if ($(".legendBar").hasClass("ui-resizable")){
				$(".legendBar").resizable("destroy");
			}
			var service = parser.read(response);
			var capabilities = service.Capability;
			var contentHtml="";
				for(var i=0; i<capabilities.Layer.Layer.length; i++){
					var result = searchLayerInLegend(capabilities.Layer.Layer[i].Name);
					console.log("Capa " + capabilities.Layer.Layer[i].Name + result);
					if(!searchLayerInLegend(capabilities.Layer.Layer[i].Name)) {
						contentHtml += "<div class=\"titleLayer\"><label for=\"" + capabilities.Layer.Layer[i].Name + "\">" + capabilities.Layer.Layer[i].Name + "</label></div><div class=\"imgLayer\" id=\"" + capabilities.Layer.Layer[i].Name + "\"><img crossOrigin=\"Anonymous\" src='" + urlWms + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + capabilities.Layer.Layer[i].Name + "&LEGEND_OPTIONS=forceLabels:on' /></div>";
					}
				}
				$('#legendContent').append(contentHtml);
			showLegend=true;
			assignLegendEventsHandlers();
		},
		error:function(error){
			alert("Ha fallado la petición GetCapabilities al mapa introducido, ("+ urlWms +") por favor, compruebe la integridad del mismo.");
		}
	})
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

function assignLegendEventsHandlers(){
	hideLegend();
	closeLegend();
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
	if ($(".legendBar").hasClass("ui-resizable")){
		$(".legendBar").resizable("destroy");
	}
	var legendHtml="<div id=\"titleMap\"><label for=\"legendContent\">Leyenda</label>"+
		"<span class='glyphicon glyphicon-remove removeLegend legend'></span>"+
		"<span class='glyphicon glyphicon-minus hideLegend legend'></span></div>"+
		"<div id=\"legendContent\"></div>";
	$('.legendBar').empty();
	$('.legendBar').append(legendHtml);
	assignLegendEventsHandlers();
}
