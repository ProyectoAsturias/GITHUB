var showLegend;

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
				contentHtml +="<div class=\"titleLayer\"><label for=\""+capabilities.Layer.Layer[i].Name+"\">"+capabilities.Layer.Layer[i].Name+"</label></div>"+
								"<div class=\"imgLayer\" id=\""+capabilities.Layer.Layer[i].Name+"\"><img src='"+urlWms+"?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+capabilities.Layer.Layer[i].Name+"&LEGEND_OPTIONS=forceLabels:on' /></div>"
			}
			var legendHtml="<div id=\"titleMap\"><label for=\"legendContent\">LEYENDA</label>"+
								"<span class='glyphicon glyphicon-remove removeLegend'></span>"+
								"<span class='glyphicon glyphicon-minus hideLegend'></span></div>"+
							"<div id=\"legendContent\"></div>";
			$('.legendBar').empty();				
			$('.legendBar').append(legendHtml);
			$('#legendContent').append(contentHtml);
			showLegend=true;
			assignLegendEventsHandlers();
		},
		error:function(error){
			alert("Error: "+error);
		}
	});
}

function assignLegendEventsHandlers(){
	hideLegend();
	closeLegend();
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
		"<span class='glyphicon glyphicon-remove removeLegend'></span>"+
		"<span class='glyphicon glyphicon-minus hideLegend'></span></div>"+
		"<div id=\"legendContent\"></div>";
	$('.legendBar').empty();
	$('.legendBar').append(legendHtml);
}