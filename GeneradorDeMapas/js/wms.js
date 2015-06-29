function showListWms() {
	alert(apiPath+"getWms.php");
	$('#selector').html("<select id=\"selectWms\" class=\"chosen-select\" style=\"width:250px;\" tabindex=\"1\"></select>"+
		"<div id=\"inputWms\">" +
			"<label>Introduzca Wms:</label>" +
			"<input type=\"text\"  id=\"wms\"/>" +
		"</div>"+
		"<button onclick='loadWms()' id=\"loadWms\" class=\"btn btn-primary \">Importar Wms</button>");
	$.ajax({
		type : "GET",
		url : apiPath+"getWms.php",
		success:function (response) {
			var wmsList = JSON.parse(response);
			$("#selectWms").empty();
			for(var i=0; i<wmsList.length; i++)
				$("#selectWms").append("<option value=\""+wmsList[i]+"\">"+wmsList[i]+"</option>");
			$('#selectWms').prop('selectedIndex', -1);
		},
		error:function(error){
			alert("Error: "+error);
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