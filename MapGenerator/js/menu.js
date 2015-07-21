function initMenu(){
	var menuHtml=	"<button onclick='showListWms()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Wms Externo</button>"+
					"<button onclick='showListMaps()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Mapas Localgis</button>"+
					"<button onclick='showListFamilies()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Capas Localgis</button>";
	$("#fuentesDatos").empty().append(menuHtml);
}

function menuDatosWms(){
	var menuHtml=	"<button onclick='showListWms()' class=\"btn btn-primary btn-block btn-info\" style=\"height:30%; min-height:4ex\"> Wms Externo</button>"+
					"<button onclick='showListMaps()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Mapas Localgis</button>"+
					"<button onclick='showListFamilies()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Capas Localgis</button>";
	$("#fuentesDatos").empty().append(menuHtml);
}

function menuDatosMapLocalgis(){
	var menuHtml=	"<button onclick='showListWms()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Wms Externo</button>"+
					"<button onclick='showListMaps()' class=\"btn btn-primary btn-block btn-info\" style=\"height:30%; min-height:4ex\"> Mapas Localgis</button>"+
					"<button onclick='showListFamilies()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Capas Localgis</button>";
	$("#fuentesDatos").empty().append(menuHtml);
}

function menuDatosLayersLocalgis(){
	var menuHtml=	"<button onclick='showListWms()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Wms Externo</button>"+
					"<button onclick='showListMaps()' class=\"btn btn-primary btn-block \" style=\"height:30%; min-height:4ex\"> Mapas Localgis</button>"+
					"<button onclick='showListFamilies()' class=\"btn btn-primary btn-block btn-info\" style=\"height:30%; min-height:4ex\"> Capas Localgis</button>";
	$("#fuentesDatos").empty().append(menuHtml);	
}

function back(){
	window.location="http://"+serverIp+"/Tables/php/tables.php";
}

function confirmCleanMap(){
	bootbox.confirm("El contenido del mapa será eliminado", function(result) {
		if (result)
			success("El contenido del mapa ha sido eliminado.");
	});
}

function success(message){
	bootbox.alert(message, function() {});
}

function showListWms() {
	menuDatosWms();
	$('#selector').html("<div id=\"inputWms\" class=\"col-md-6\">" +

			"<select id=\"selectWms\" class=\"chosen-select\" tabindex=\"1\" ></select>"+
			"<input type=\"text\"  id=\"wms\" placeholder=\"Introduzca un WMS\" style=\"width:100%; border-radius: 7px; \"/>" +
			"<button onclick='importWms()' id=\"importWms\" class=\"btn btn-info btn-block\" style=\"padding:0;\" >Importar Wms</button>"+
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

/**
* Muestra el listado de mapas de localgis disponibles
**/
function showListMaps(){
	menuDatosMapLocalgis();
	$('#selector').html("<div id=\"inputMaps\" class=\"col-md-6\">" +
			"<select id=\"selectMap\" class=\"chosen-select\" ></select>"+
			"<button onclick='importMap()' id=\"importMap\" class=\"btn btn-info btn-block\" style=\"padding:0;\">Importar Mapa</button>"+
		"</div>");
	$.ajax({
		type: "GET",
		url: apiPath+"getMaps.php",
		success: function(response) {
			var mapList=JSON.parse(response);
			for(var i=0;i<mapList.length; i++){
				var mapName= mapList[i].name;
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

function showListFamilies(){
	menuDatosLayersLocalgis();
	$('#selector').html("<div id=\"inputFamilies\" class=\"col-md-6\">" +
			"<select id=\"selectFamily\" class=\"chosen-select\" onchange=\"showListLayers();\"></select>"+
			"<button onclick='importFamily()' id=\"importFamilies\" class=\"btn btn-info btn-block\" style=\"padding:0; margin-bottom:10px;\">Importar Familia</button>"+
			"<select id=\"selectLayer\" class=\"chosen-select\" ></select>"+
			"<button onclick='importLayer()' id=\"importLayers\" class=\"btn btn-info btn-block\" style=\"padding:0;\">Importar Capa</button>"+
		"</div>");
	$.ajax({
		type : "GET",
		url : apiPath+"getFamilies.php",
		success : function (response) {
			var familyList = JSON.parse(response);
			$("#selectFamily").empty();
			for(var i=0; i<familyList.length; i++){
				var familyId=familyList[i].id;
				var familyName=familyList[i].name;
				$("#selectFamily").append("<option value=\""+familyId+"\" name=\""+familyName+"\">"+familyName+"</option>");
			}
			$('#selectFamily').prop('selectedIndex', -1);
			$(".chosen-select").trigger("chosen:updated");
			$('.chosen-select').chosen({width:"100%"});			
		}
	})
}

//Se llama, cuando hay una familia seleccionada
function showListLayers(){
	var idFamily=$("#selectFamily").val();
	$.ajax({
		type : "POST",
		url : apiPath+"getLayers.php",
		data :{
			idFamily: idFamily
		},
		success : function (response) {
			var layerList = JSON.parse(response);
			var layerId=0;
			var layerName="sdhfggh";
			$("#selectLayer").empty();
			for(var i=0; i<layerList.length; i++){
				var layerId=layerList[i].id;
				var layerName=layerList[i].name;
				$("#selectLayer").append("<option value=\""+layerId+"\" name=\""+layerName+"\">"+layerName+"</option>");
			}
			$('#selectLayer').prop('selectedIndex', -1);
			$(".chosen-select").trigger("chosen:updated");
			//$('.chosen-select').chosen({width:"100%"});
		}
	})
}