/**
* Muestra el listado de mapas de localgis disponibles
**/
function showListMaps(){
	menuDatosMapLocalgis();
	$('#selector').html("<div id=\"inputMaps\" class=\"col-md-6\">" +
			"<select id=\"selectMap\" class=\"chosen-select\" ></select>"+
			"<button onclick='importMap()' id=\"importMap\" class=\"btn btn-primary btn-block\">Importar Mapa</button>"+
		"</div>");
	$.ajax({
		type: "GET",
		url: apiPath+"getMaps.php",
		success: function(response) {
			var mapList=JSON.parse(response);
			for(var i=0;i<mapList.length; i++){
				var mapName= mapList[i].mapName;
				var mapId = mapList[i].id;
				$("#selectMap").append("<option value=\""+mapId+"\" name=\""+mapName+"\">"+mapName+"</option>");
			}
			$('#selectMap').prop('selectedIndex', -1);
			$('.chosen-select').chosen({width:"100%"});
		},
		error:function(error){
			alert("Error: "+error);
		}
	});
}

/*function showListFamilies(){
	menuDatosFamiliesLocalgis();
	$('#selector').html("<div id=\"inputFamilies\" class=\"col-md-6\">" +
			"<select id=\"selectFamilies\" class=\"chosen-select\" ></select>"+
			"<button onclick='importFamily()' id=\"importFamilies\" class=\"btn btn-primary btn-block\">Importar Familia</button>"+
		"</div>");
	$ajax({
		type : "GET",
		url : apiPath+"getFamilies.php",
		success : function (response) {
			var familyList = JSON.parse(response);
			for(var family in familyList)
				$("#selectMap").append("<option value=\""+family+"\">"+family+"</option>");
			$('#selectFamilies').prop('selectedIndex', -1);
			$('.chosen-select').chosen({width:"100%"});
		}
	})
}

//Se llama, cuando hay una familia seleccionada
function showListLayers(idFamily){
	$('#listLayers').html("<select data-placeholder=\"Seleccione una capa\" id=\"selectLayers\" class=\"chosen-select\" style=\"width:350px;\" tabindex=\"1\">" +
	"</select><button>Añadir capa</button>");
	$ajax({
		type : "GET",
		url : apiPath+"getLayers.php",
		data :{
			id: idFamily
		},
		success : function (response) {
			var layerList = JSON.parse(response);
			var htmlListLayers = "";
			for(var layer in layersList)
				htmlListLayers += "<option value=\"" + layer + "\"></option>";
			$("#selectLayers").html=htmlListLayers;
		}
	})
}*/

/**
* Carga el mapa completo en Geoserver
**/
function importMap(){
	var id=$("#selectMap").val();
	var mapName=$("#selectMap").find('option:selected').attr("name");

	console.log(id);
	console.log(mapName);

	$.ajax({
		type: "POST",
		url: apiPath+"createLocalgisMap.php",
		data:{
			id: id,
			mapName: mapName
		},
		success: function(response){
			console.log(response);
			if(response!="1" && response!="2"){
				console.log("Mapa creado correctamente "+response);
				var wms=server+"geoserver/"+mapName+"/wms";
				console.log(wms+"?request=getCapabilities&service=wms");
				loadWmsTree(wms);
			}
			else
				console.log("El mapa no ha podido crearse");
		},
		error: function(error) {
			console.log("Error al cargar el mapa: ".error);				 
		}
	});
}

/*
//Carga la familia completa en OpenLayers
function importFamily(){
	//Sacar las capas que contiene
}

//Carga la capa en Openlayers
function importLayer(){

}*/