function showListWms() {

		$('#selector').html("<div id=\"inputWms\" class=\"col-md-4\">" +
			"<select id=\"selectWms\" class=\"chosen-select\" tabindex=\"1\" style=\"height:25%\"></select>"+
			"<input type=\"text\"  id=\"wms\" value=\"Introduzca un WMS\" style=\"width:100%; border-radius: 7px; height:25%;\"/>" +
			"<button onclick='loadWms()' id=\"loadWms\" class=\"btn btn-primary btn-block\" style=\"height:25%\">Importar Wms</button>"+
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
			$('.chosen-select').chosen({width:"100%"});
		},
		error:function(error){
			alert("Error: "+error);
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