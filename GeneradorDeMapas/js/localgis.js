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
				$(".chosen-select").trigger("chosen:updated");
			}
			$('#selectFamily').prop('selectedIndex', -1);
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
				$(".chosen-select").trigger("chosen:updated");
			}
			$('#selectLayer').prop('selectedIndex', -1);
			//$('.chosen-select').chosen({width:"100%"});
		}
	})
}

/**
* Carga el mapa completo en Geoserver
**/
function importMap(){
	if($("#selectMap").val()!=null){
		var id=$("#selectMap").val();
		var name=$("#selectMap").find('option:selected').attr("name");

		map.mapName = name;
		console.log(id);
		console.log(name);

		$.ajax({
			type: "POST",
			url: apiPath+"createLocalgisMap.php",
			data:{
				id: id,
				mapName: name
			},
			success: function(response){
				console.log(response);
				if(response!="1" && response!="2"){
					console.log("Mapa creado correctamente "+response);
					var wms=server+"geoserver/Map_"+name+"/wms";
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
	else{
		console.log("Selector de mapas vacío.");
	}
}

//Carga la familia completa en OpenLayers
function importFamily(){
	if($("#selectFamily").val()!=null){
		var id=$("#selectFamily").val();

		console.log(id);

		$.ajax({
			type: "POST",
			url: apiPath+"getLayers.php",
			data:{
				idFamily: id
			},
			success: function(response){
				var layerList = JSON.parse(response);
				for(var i=0; i<layerList.length; i++){
					importLayer(layerList[i]);
				}
			},
			error: function(error) {
				console.log("Error al cargar la familia de capas: ".error);				 
			}
		});
	}
	else{
		console.log("Selector de familias vacío.");
	}
}

//Carga la capa al ws
function importLayer(layer){
	var id;
	var name;
	if(layer!=null){
		id=layer.id;
		name=layer.name;
	}
	else{
		var id=$("#selectLayer").val();
		var name=$("#selectLayer").find('option:selected').attr("name");
	}

	if(id!=null){
		$.ajax({
			type: "POST",
			url: apiPath+"addLayer.php",
			data:{
				layerId: id,
				layerId: name,
				mapId: map.id,
				mapName: map.name,
			},
			success: function(response){
				console.log(response);
			},
			error: function(error) {
				console.log("Error al cargar la capa: ".error);				 
			}
		});
	}
	else{
		console.log("Selector de capas vacío.");
	}	
}
