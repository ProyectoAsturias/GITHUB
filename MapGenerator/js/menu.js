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
	window.location=server+"Tables/php/tables.php"+"?previous="+mapName;
}

function confirmSaveMap(){
	bootbox.prompt("Introduzca el nombre del mapa.", function(result) {
		if (result != null)
			success("Mapa guardado correctamente.");
	});
}

function confirmClearMap(){
	bootbox.confirm("El contenido del mapa será eliminado", function(result) {
		if (result)
			clearMap();
	});
}

function success(message){
	bootbox.console.log(message, function() {});
}

function showListWms() {
	menuDatosWms();
	 $('#selector').html("<div id=\"inputWms\" class=\"col-xs-6\">" +
    "<select id=\"selectWms\" class=\"chosen-select\" tabindex=\"1\" ></select>"+
    "<input type=\"text\"  id=\"wms\" placeholder=\"Introduzca un WMS\" style=\"width:100%; border-radius: 7px; \"/>" +
    "<button onclick='selectWms()' id=\"importWms\" class=\"btn btn-info btn-block\" style=\"padding:0;\" >Importar Wms</button>"+
    "</div><div id=\"buttonWmsList\" class=\"col-xs-2\">"+
    "<button onclick='editWmsList()' id=\"editWmsList\" class=\"btn btn-info btn-block\" style=\"height:100%;\" >Editar Lista Wms</button></div>");
	$('.chosen-select').chosen({
		width:"100%",
		search_contains: true,
		placeholder_text_single: "Seleccione un WMS"
	});
	$.ajax({
		type : "POST",
		url : apiPath+"apiDatabase.php",
		data : {
			tag:"getWms"
		},
		success:function (response) {
			console.log(response)
			var wmsList = JSON.parse(response);
			$("#selectWms").empty();
			console.log(wmsList);
			for(var i=0; i<wmsList.length; i++)
				$("#selectWms").append("<option value=\""+wmsList[i]+"\">"+wmsList[i]+"</option>");
			$('#selectWms').prop('selectedIndex', -1);
			$('.chosen-select').trigger("chosen:updated");
		},
		error:function(error){
			$("#selectWms").append("<option value='http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms'>http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms</option>");
			$('.chosen-select').chosen({
				width:"100%",
				search_contains:true,
				placeholder_text_single: "Seleccione un WMS"
			});
			console.log("Ocurrió un error. Compruebe su conexión al servidor.");
			console.log("Error al mostrar la lista de wms: "+error);
		}
	});
}

/**
*  Selecciona la Url del Wms antes de importarlo
**/
function selectWms(){
var wms;
	if($('#wms').val()!="")
		wms=$('#wms').val();
	else if($("#selectWms").val()!=null)
		wms=$("#selectWms").val();
	else
		return;
	importWms(wms);
}

/**
* Muestra el listado de mapas de localgis disponibles
**/
function selectWms(){
	var wms;
	if($('#wms').val()!="")
		wms=$('#wms').val();
	else if($("#selectWms").val()!=null)
		wms=$("#selectWms").val();
	else
		return;
	importWms(wms);
}

/**
 * Muestra el listado de mapas de localgis disponibles
 **/
function showListMaps(){
	console.log(entityId);
	menuDatosMapLocalgis();
	$('#selector').html("<div id=\"inputMaps\" class=\"col-xs-6\">" +
	"<select id=\"selectMap\" class=\"chosen-select\" ></select>"+
	"<button onclick='importMap()' id=\"importMap\" class=\"btn btn-info btn-block\" style=\"padding:0;\">Importar Mapa</button>"+
	"</div>");
	$('.chosen-select').chosen({width:"100%",search_contains:true,placeholder_text_single: "Seleccione un Mapa"});
	$.ajax({
		type: "POST",
		url : apiPath+"apiLocalgis.php",
		data : {
			tag:"getMaps",
			entityId:entityId
		},
		success: function(response) {
			//console.log(response);
			var mapList=JSON.parse(response);
			for(var i=0;i<mapList.length; i++){
				var mapName= mapList[i].name;
				var mapId = mapList[i].id;
				$("#selectMap").append("<option value=\""+mapId+"\" name=\""+mapName+"\">"+mapName+"</option>");
			}
			$('#selectMap').prop('selectedIndex', -1);
			$('.chosen-select').trigger("chosen:updated");
		},
		error:function(error){
			console.log("Error al mostrar la lista de mapas: "+error);
		}
	});
}

function showListFamilies(){
	menuDatosLayersLocalgis();
	$('#selector').html("<div id=\"inputFamilies\" class=\"col-xs-6\">"+
	"<select id=\"selectFamily\" class=\"chosen-select\" onchange=\"showListLayers();\"></select>"+
	"<button onclick='importFamily()' id=\"importFamilies\" class=\"btn btn-info btn-block\" style=\"padding:0; margin-bottom:10px;\">Importar Familia</button>"+
	"<select id=\"selectLayer\" class=\"chosen-select\" ></select>"+
	"<button onclick='importLayer()' id=\"importLayers\" class=\"btn btn-info btn-block\" style=\"padding:0;\">Importar Capa</button>"+
	"</div>");
	$('#selectFamily').chosen({width:"100%",search_contains:true,placeholder_text_single: "Seleccione una Familia"});
	$('#selectLayer').chosen({width:"100%",search_contains:true,placeholder_text_single: "Seleccione una Capa"});
	$.ajax({
		type : "POST",
		url : apiPath+"apiLocalgis.php",
		data : {
			tag:"getFamilies",
			entityId:entityId
		},
		success : function (response) {
			//console.log(response);
			var familyList = JSON.parse(response);
			$("#selectFamily").empty();
			for(var i=0; i<familyList.length; i++){
				var familyId=familyList[i].id;
				var familyName=familyList[i].name;
				$("#selectFamily").append("<option value=\""+familyId+"\" name=\""+familyName+"\">"+familyName+"</option>");
			}
			$('#selectFamily').prop('selectedIndex', -1);
			$(".chosen-select").trigger("chosen:updated");
		},
		error:function(error){
			console.log("Error al mostrar la lista de familias: "+error);
		}
	})
	var getLayers = true;
	$.ajax({
		type : "POST",
		url : apiPath + "apiLocalgis.php",
		data : {
			tag : "getLayers",
			getLayers : getLayers
		},
		success : function (response) {
			//console.log(response);
			var layerList = JSON.parse(response);
			$("#selectLayer").empty();
			for (var i = 0; i < layerList.length; i++) {
				var layerId = layerList[i].id;
				var layerName = layerList[i].name;
				$("#selectLayer").append("<option value=\"" + layerId + "\" name=\"" + layerName + "\">" + layerName + "</option>");
			}
			$('#selectLayer').prop('selectedIndex', -1);
			$(".chosen-select").trigger("chosen:updated");
		},
		error : function (error) {
			console.log("Error al mostrar la lista de familias: " + error);
		}
	})
}

//Se llama, cuando hay una familia seleccionada
function showListLayers(){
	var idFamily=$("#selectFamily").val();
	$.ajax({
		type : "POST",
		url : apiPath+"apiLocalgis.php",
		data : {
			tag:"getLayers",
			idFamily: idFamily
		},
		success : function (response) {
			//console.log(response);
			var layerList = JSON.parse(response);
			var layerId=0;
			var layerName="";
			$("#selectLayer").empty();
			for(var i=0; i<layerList.length; i++){
				var layerId=layerList[i].id;
				var layerName=layerList[i].name;
				$("#selectLayer").append("<option value=\""+layerId+"\" name=\""+layerName+"\">"+layerName+"</option>");
			}
			$('#selectLayer').prop('selectedIndex', -1);
			$(".chosen-select").trigger("chosen:updated");
			//$('.chosen-select').chosen({width:"100%"});
		},
		error:function(error){
			console.log("Error al mostrar la lista de capas: "+error);
		}
	})
}

function utf8_decode(str_data) {
	var tmp_arr = [],
		i = 0,
		ac = 0,
		c1 = 0,
		c2 = 0,
		c3 = 0,
		c4 = 0;

	str_data += '';

	while (i < str_data.length) {
		c1 = str_data.charCodeAt(i);
		if (c1 <= 191) {
			tmp_arr[ac++] = String.fromCharCode(c1);
			i++;
		} else if (c1 <= 223) {
			c2 = str_data.charCodeAt(i + 1);
			tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
			i += 2;
		} else if (c1 <= 239) {
			// http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
			c2 = str_data.charCodeAt(i + 1);
			c3 = str_data.charCodeAt(i + 2);
			tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		} else {
			c2 = str_data.charCodeAt(i + 1);
			c3 = str_data.charCodeAt(i + 2);
			c4 = str_data.charCodeAt(i + 3);
			c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
			c1 -= 0x10000;
			tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
			tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
			i += 4;
		}
	}

	return tmp_arr.join('');
}
