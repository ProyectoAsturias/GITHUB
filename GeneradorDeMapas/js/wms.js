function showListWms() {
	menuDatosWms();
	$('#selector').html("<div id=\"inputWms\" class=\"col-md-6\">" +

			"<select id=\"selectWms\" class=\"chosen-select\" tabindex=\"1\" ></select>"+
			"<input type=\"text\"  id=\"wms\" placeholder=\"Introduzca un WMS\" style=\"width:100%; border-radius: 7px; \"/>" +
			"<button onclick='loadWms()' id=\"loadWms\" class=\"btn btn-info btn-block\" style=\"padding:0;\" >Importar Wms</button>"+
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
			$("#selectWms").append("<option value='http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms'>http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms</option>");
			$('.chosen-select').chosen({
				width:"100%",
				search_contains: true,
			});
			console.log("Ocurrió un error. Compruebe su conexión al servidor.");
		}
	});
}

function loadWms() {
	var wms;
	if($('#wms').val()!="")
		wms=$('#wms').val();
	else if($("#selectWms").val()!=null)
		wms=$("#selectWms").val();
	else
		return;
	loadWmsTree(wms);
}