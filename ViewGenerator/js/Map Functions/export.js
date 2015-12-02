$(document).ready(function(){
	$(document).ajaxStop(function(){
		exportEventHandler();	
	})
})

function exportEventHandler(){
	$(".export").click(function(){	
		var htmlModal = "<label for=\"mapList\">Lista de mapas</label><select id=\"mapList\" class=\"chosen-select\" tabindex=\"1\" onchange=\"populateLayerSelect();\"></select>" +
			"<label for=\"layerList\">Capa a exportar</label><select id=\"layerList\" class=\"chosen-select\" tabindex=\"1\"></select>"+
			"<label for=\"formatList\">Formato de exportación</label><select id=\"formatList\" class=\"chosen-select\" tabindex=\"1\"></select>"
		
	        $("#exportModal .modal-body").empty();
       		$("#exportModal .modal-body").append(htmlModal);
	        $('.chosen-select').chosen({
	                width : "100%",
        	        search_contains : true
	        });
	
		populateFormatSelect();
		populateMapSelect();
                $('#mapList').prop('selectedIndex', -1);
                $('#layerList').prop('selectedIndex', -1);
                $('#formatList').prop('selectedIndex', -1);
		$('.chosen-select').trigger("chosen:updated");
		$("#exportModal").modal("show");
	});
}

function populateFormatSelect(){
	$("#formatList").append("<option value=GML2>GML2</option>");	
	$("#formatList").append("<option value=GML3>GML3</option>");
	$("#formatList").append("<option value=shape-zip>shapefile</option>");
	$("#formatList").append("<option value=JSON>JSON</option>");
	$("#formatList").append("<option value=JSONP>JSONP</option>");
	$("#formatList").append("<option value=CSV>CSV</option>");
}

function getFormatToExport(){
	return $("#formatList").val();
}

function populateMapSelect(){
	treeDataSource.forEach(function (map){
		$("#mapList").append("<option value="+map.name+">"+map.name+"</option");
	})
}

function getMapToExport(){
	return $("#mapList").val();
}

function populateLayerSelect(){
	var mapIndex= $("#mapList").find(":selected").index();
	treeDataSource[mapIndex].layers.forEach(function (layer){
		$("#layerList").append("<option value="+layer.name+">"+layer.name+"</option");
	})
	$('#layerList').prop('selectedIndex', -1);	
	$('.chosen-select').trigger("chosen:updated");	
}

function getLayerToExport(){
	return $("#layerList").val();
}

function layerExport(){
	var mapName=getMapToExport();
	var layerName=getLayerToExport();
	var format=getFormatToExport();
	if(mapName && layerName && format){
		window.open(serverGS+"geoserver/"+mapName+"/wfs?request=GetFeature&service=wfs&version=1.0.0&typename="+layerName+"&outputformat="+format,'_blank');
	
		//window.location = serverGS+"geoserver/"+mapName+"/wfs?request=GetFeature&service=wfs&version=1.0.0&typename="+layerName+"&outputformat="+format;
	}
	else
		alert("Complete todos los campos");
}
