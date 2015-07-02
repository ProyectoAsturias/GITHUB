function showListWms() {
	menuDatosWms();
	$('#selector').html("<div id=\"inputWms\" class=\"col-md-6\">" +
			"<select id=\"selectWms\" class=\"chosen-select\" tabindex=\"1\" data-placeholder=\"Seleccione un Wms\"></select>"+
			"<input type=\"text\"  id=\"wms\" value=\"Introduzca un WMS\" style=\"width:100%; border-radius: 7px; \"/>" +
			"<button onclick='loadWms()' id=\"loadWms\" class=\"btn btn-primary btn-block\" >Importar Wms</button>"+
		"</div>");
		
	$.ajax({
		type : "GET",
		url : apiPath+"getWms.php",
		success:function (response) {
			var wmsList = JSON.parse(response);
			$("#selectWms").empty();
			for(var i=0; i<wmsList.length; i++)
				$("#selectWms").append("<option value=\""+wmsList[i]+"\">"+wmsList[i]+"</option>");
			$('#selectWms').prop('selectedIndex', -1);
			$('.chosen-select').chosen({
				width:"100%",
				search_contains: true,
			});
		},
		error:function(error){
			//$("#selectWms").append("<option value='http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms'>http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms</option>");
			console.log("Ocurrió un error. Compruebe su conexión al servidor.");
		}
	});
}

function loadWms() {
	var wms;
	if($('#wms').val()!="Introduzca un WMS")
		wms=$('#wms').val();
	else if($("#selectWms").val()!=null)
		wms=$("#selectWms").val();
	else
		return;
	loadWmsTree(wms);
}