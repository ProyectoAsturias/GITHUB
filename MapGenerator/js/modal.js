var globalLayer;
var defaultStyle;

$(document).ready(function(){
	assignEventsHandlers();
});

function assignEventsHandlers(){
	eyeIconClickHandler();
	deleteIconClickHandler();
	attributesClickHandler();
	layerInfoClickHandler();
	stylesClickHandler();
}

//EVENTOS

function eyeIconClickHandler(){
	$(".visibilityLayer").click(function(event){
		if ($(this).parent().data().layer.getVisible()){
			$(this).css("color", "lightgray");
			$(this).parent().data().layer.setVisible(false);
		}else{
			$(this).css("color", "black");
			$(this).parent().data().layer.setVisible(true);
		}
	});
}

function deleteIconClickHandler(){
	$(".removeLayer").click(function(event){
		var parent = $(this).parent();
		bootbox.confirm("¿Realmente desea eliminar esta capa?", function(result) {
			if (result){
				removeLayer(parent.data("layer"),function(response){
					parent.fadeOut("slow", function(){
						$(this).remove();
					});
				});
			}
		});
	});
}

function attributesClickHandler(){
	$(".attributesLayer").click(function(event){
		var parent = $(this).parent();
		getJSONLayer(parent.data("layer"), function(viewFeatures){
			//Rescatar atributos de MAP
			$.ajax({
		    	type: "POST",
		    	url:apiPath+'apiDatabase.php',
		    	data : {
					tag:"getLayerAttributes",
		            mapName: map.name,
					layerName: parent.data("layer").name
		        },
		    	success: function (response) {
		    		var dbLayers=JSON.parse(response);
				    //Que aparezcan con el tick solo los que están presentes (attributes)
					var modalHTML = "";
					dbLayers.forEach(function (dbLayer){
						if(dbLayer[0].id[0]==parent.data("layer").name){
							var listAttributes=dbLayer[0].features;
							listAttributes.forEach(function (attribute){
								var checked=false;
								viewFeatures.features.forEach(function (feature){
									if(feature==attribute){
										checked=true;
										modalHTML += "<div><input type='checkbox' style='vertical-align: middle' checked/><label>&nbsp;&nbsp;&nbsp;"+attribute+"</label></div>";
									}	
								})
								if(!checked)
									modalHTML += "<div><input type='checkbox' style='vertical-align: middle' unchecked/><label>&nbsp;&nbsp;&nbsp;"+attribute+"</label></div>";
							})
						}
					})
					$("#modalAttributes .modal-body").html(modalHTML);
					$("#modalAttributes").modal("show");
					globalLayer=parent.data("layer");
		    	},
		    	error:function(error){
		            console.log(error);
		    	}
			});
		})
	});
}

function layerInfoClickHandler(){
	$(".infoLayer").click(function(event){
		var parent = $(this).parent();
		appendModalLayer(map.name,parent.data("layer"));
	});
}


function stylesClickHandler(){
    $(".stylesLayer").click(function(event){
        var parent = $(this).parent();
        appendModalStyles(map.name,parent.data("layer"));
    });
}

//FUNCIONES

/**
*Primero pedimos la informacion actual del servicio Wms del mapa, a traves del GetCapabilities , y despues desplegamos la ventana modal para poder modificarlos
**/
function appendModalWms(){
	var parser = new ol.format.WMSCapabilities();
	//llamada al GetCapabilities
	$.ajax({
		type: "GET",
		dataType : 'text',
		url: serverGS+"geoserver/"+mapName+"/wms?request=getCapabilities&service=wms",
		success: function (response) {
			var service = parser.read(response);
			console.log(service);
			var modalHTML="<label for=\"title\">Título del servicio Wms</label>"+
					"<input type=\"text\" class=\"form-control\" id=\"title\" value=\""+service.Service.Title+"\">"+
					"<label for=\"abstract\">Descripción del servicio Wms</label>"+
					"<textarea rows=\"3\" class=\"form-control\" id=\"abstract\">"+service.Service.Abstract+"</textarea>"+
										"<label for=\"keywordList\">Palabras clave</label>"+
					"<select multiple class=\"form-control\" id=\"keywordList\" tabindex=\"1\">"
			for(var i=0; i<service.Service.KeywordList.length; i++)
				modalHTML +="<option value=\""+service.Service.KeywordList[i]+"\">"+service.Service.KeywordList[i]+"</option>"	
			modalHTML +="</select>"+
				"<button onclick='delKeyword()' id=\"delKeyword\" class=\"btn btn-info btn-block\" style=\"padding:0;\" >Eliminar palabra clave</button>"+
				"<input type=\"text\"  id=\"keyword\" style=\"width:100%; border-radius: 7px; \"/>" +
				"<button onclick='addKeyword()' id=\"addKeyword\" class=\"btn btn-info btn-block\" style=\"padding:0;\" >Añadir palabra clave</button>"+
				"</div>"+
				"<h3 style=\"textalign:center;\">Información de contacto</h3>"+
				"<div class=\"col-xs-12\" id=\"ContactInfo\">"+
					"<div class=\"col-xs-6\">"+
						"<label for=\"contactPerson\">Persona de contacto</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"contactPerson\" value=\""+service.Service.ContactInformation.ContactPersonPrimary.ContactPerson+" \">"+
						"<label for=\"contactPosition\">Puesto en la organización</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"contactPosition\" value=\""+service.Service.ContactInformation.ContactPosition+" \">"+
						"<label for=\"address\">Dirección</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"address\" value=\""+service.Service.ContactInformation.ContactAddress.Address+" \">"+
						"<label for=\"stateOrProvince\">Provincia/Estado</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"stateOrProvince\" value=\""+service.Service.ContactInformation.ContactAddress.StateOrProvince+" \">"+
						"<label for=\"postCode\">Cod.Postal</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"postCode\" value=\""+service.Service.ContactInformation.ContactAddress.PostCode+" \">"+
						"<label for=\"fax\">Fax</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"fax\" value=\""+service.Service.ContactInformation.ContactFacsimileTelephone+" \">"+
					"</div><div class=\"col-xs-6\">"+
						"<label for=\"contactOrganization\">Organización</label>"+
						"<input type=\"text\"  class=\"form-control\" id=\"contactOrganization\"  value=\""+service.Service.ContactInformation.ContactPersonPrimary.ContactOrganization+" \">"+
						"<label for=\"addressType\">Tipo de dirección</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"addressType\" value=\""+service.Service.ContactInformation.ContactAddress.AddressType+" \">"+
						"<label for=\"city\">Ciudad</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"city\" value=\""+service.Service.ContactInformation.ContactAddress.City+" \">"+
						"<label for=\"country\">Pais</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"country\" value=\""+service.Service.ContactInformation.ContactAddress.Country+" \">"+
						"<label for=\"contactPhone\">Teléfono</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"contactPhone\" value=\""+service.Service.ContactInformation.ContactVoiceTelephone+" \">"+
						"<label for=\"email\">E-mail</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"email\" value=\""+service.Service.ContactInformation.ContactElectronicMailAddress+" \">"+
					"</div>"
				
			//saca la ventana modal
			
			$("#modalWms .modal-body").html(modalHTML);
			$("#modalWms").modal("show");
			$('.modal .modal-body').css('overflow-y', 'auto'); 
			$('.modal .modal-body').css('max-height', $(window).height() * 0.8);
		}
	});
}

function updateWmsInfo(){
	var select = document.getElementById('keywordList');
	var keywords=[];
	for(var i=0; i<select.options.length;i++){
		keywords.push(select.options[i].value);
	}
	var wmsInfo = new Object();
	wmsInfo.title=$("#title").val();
	wmsInfo.description=$("#abstract").val();
	wmsInfo.contactPerson=$("#contactPerson").val();
	wmsInfo.contactOrganization= $("#contactOrganization").val();
	wmsInfo.contactPosition= $("#contactPosition").val();
	wmsInfo.addressType= $("#addressType").val();
	wmsInfo.address= $("#address").val();
	wmsInfo.city= $("#city").val();
	wmsInfo.stateOrProvince= $("#stateOrProvince").val();
	wmsInfo.country= $("#country").val();
	wmsInfo.postCode= $("#postCode").val();
	wmsInfo.contactPhone= $("#contactPhone").val();
	wmsInfo.fax= $("#fax").val();
	wmsInfo.email= $("#email").val();
	wmsInfo.keywords= keywords;
	$.ajax({
		url:apiPath+'apiGeoserver.php',
		data : {
			wmsInfo: wmsInfo,
			mapName: mapName,
			tag: "updateWmsInfo"
		},
		method: "POST",
		success: function (response) {
			console.log(response);
		},
		error:function(error){
			console.log("error");
		}
	});
}

function appendModalLayer(nameMap,layer){
	mapName= nameMap;
	globalLayer=layer;
	console.log(globalLayer);
	var layerName= layer.name;
	var parser = new ol.format.WMSCapabilities();
	//llamada al GetCapabilities
	$.ajax({
		type: "GET",
		dataType : 'text',
		url: server+"geoserver/"+mapName+"/wms?request=getCapabilities&service=wms",
		success: function (response) {
			var service = parser.read(response);
			var capabilities = service.Capability;
			var layers = [];
			for(var i=0; i<capabilities.Layer.Layer.length; i++){
				if (layerName==capabilities.Layer.Layer[i].Name){
					var pickLayer= capabilities.Layer.Layer[i];
				}
			}
			var htmlTitle=	"<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>"+
							"<h4 class=\"modal-title\">Modificar Datos de la capa: "+layerName+"</h4>"
			$("#modalLayer .modal-header").html(htmlTitle);
			var modalHTML="<label for=\"title\">Título de la capa</label>"+
					"<input type=\"text\" class=\"form-control\" id=\"title\" value=\""+pickLayer.Title+"\">"+
					"<label for=\"abstract\">Descripción de la capa</label>"+
					"<textarea rows=\"3\" class=\"form-control\" id=\"abstract\">"+pickLayer.Abstract+"</textarea>"+
					"<label for=\"keywordList\">Palabras clave</label>"+
					"<select multiple class=\"form-control\" id=\"keywordList\" tabindex=\"1\">"
			for(var i=0; i<pickLayer.KeywordList.length; i++)
			modalHTML +="<option value=\""+pickLayer.KeywordList[i]+"\">"+pickLayer.KeywordList[i]+"</option>"	
			modalHTML +="</select>"+
					"<button onclick='delKeyword()' id=\"delKeyword\" class=\"btn btn-info btn-block\" style=\"padding:0;\" >Eliminar palabra clave</button>"+
					"<input type=\"text\"  id=\"keyword\" style=\"width:100%; border-radius: 7px; \"/>" +
					"<button onclick='addKeyword()' id=\"addKeyword\" class=\"btn btn-info btn-block\" style=\"padding:0;\" >Añadir palabra clave</button>"+
				"</div>"

			$("#modalLayer .modal-body").html(modalHTML);
			$("#modalLayer").modal("show");
			$('.modal .modal-body').css('overflow-y', 'auto'); 
			$('.modal .modal-body').css('max-height', $(window).height() * 0.8);
		},
		error:function(error){
			console.log("Error en el getCapabilities:"+error);
		}
	});
}

function addKeyword(){
    var keyword= $('#keyword').val();
    keyword=keyword.trim();
    var checkKeyword=true;
    if (keyword) {
		$("#keywordList option").each(function () {
			var listKeyword = $(this).val();
			if (listKeyword == keyword)
				checkKeyword = false;
		});
		if (checkKeyword)
	        $("#keywordList").append("<option value=\""+keyword+"\">"+keyword+"</option>");
		$('#keyword').val("");
	}
}

function delKeyword(){
	$("#keywordList option:selected").remove();
}

function updateLayerInfo(){
	var layerInfo = new Object();
	console.log(globalLayer)
	var layerName = globalLayer.name;
	layerInfo.isWmsLayer=globalLayer.wms;
	layerInfo.title=$("#title").val();
	layerInfo.description=$("#abstract").val();
	var select = document.getElementById('keywordList');
	var keywords=[""];
	for(var i=0; i<select.options.length;i++){
		keywords.push(select.options[i].value);
	}
	layerInfo.keywords= keywords;
	$.ajax({
		url: apiPath+"apiGeoserver.php",
		data : {
			layerInfo: layerInfo,
			layerName: layerName,
			mapName: mapName,
			tag: "updateLayerInfo"
		},
		method: "POST",
		success: function (response) {
			console.log(response);
		},
		error:function(error){
			console.log("error");
		}
	});
}

function appendModalStyles(nameMap,layer){
    mapName= nameMap;
    globalLayer=layer;  
	var styleName="";
    var layerName= layer.name;
    var htmlTitle=	"<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>"+
					"<h4 class=\"modal-title\">Seleccionar estilo : "+layerName+"</h4>"
	$("#modalStyles .modal-header").html(htmlTitle); 
    var parser = new ol.format.WMSCapabilities();
    //llamada al GetCapabilities
    $.ajax({
        type: "GET",
        dataType : 'text',
        url: server+"geoserver/"+mapName+"/wms?request=getCapabilities&service=wms",
        success: function (response) {
            var service = parser.read(response);
            var capabilities = service.Capability;
            var layers = [];
			var styleSrc="";
            for(var i=0; i<capabilities.Layer.Layer.length; i++){
                    if (layerName==capabilities.Layer.Layer[i].Name){
                            var pickLayer= capabilities.Layer.Layer[i];
                    }
            }
			defaultStyle=pickLayer.Style[0].Name;
			var srcStyle =pickLayer.Style[0].LegendURL[0].OnlineResource;
			var valueOpacity=globalLayer.getOpacity();
            var modalHTML="<label for=\"defaultStyle\">Estilo por defecto </label>"+
				"<div><img id='legendStyle' src=\""+srcStyle+"\" /></div>"+
                                    "<input type=\"text\" readonly  class=\"form-control\" id=\"defaultStyle\" value=\""+pickLayer.Style[0].Name+"\">"+
				"<label for=\"opacityBar\">Transparencia</label>"+
				"<input class='opacity' id=\"opacityBar\" value=\""+valueOpacity+"\" type='range' min='0' max='1' step='0.01'/>"+
                                    "<label for=\"styleList\">Estilos disponibles</label>"+
                                    "<select multiple class=\"form-control\" id=\"styleList\" tabindex=\"1\">"
            for(var i=1; i<pickLayer.Style.length; i++){
            	modalHTML +="<option ondblclick=\"selectStyle()\" value=\""+pickLayer.Style[i].Name+"\">"+pickLayer.Style[i].Name+"</option>";
				styleSrc +="<input type=\"hidden\" id=\""+pickLayer.Style[i].Name+"\" value=\""+pickLayer.Style[i].LegendURL[0].OnlineResource+"\" \>";
			}
                    modalHTML +="</select><div id=\"styleSrc\">"+styleSrc+"</div>"+
                                    "<button onclick='selectStyle()' id=\"selectStyle\" class=\"btn btn-info btn-block\" style=\"padding:0;\" >Seleccionar estilo</button>"+
									"<label for=\"inputSld\">Carga un archivo SLD</label>"+
									"<input id=\"inputSld\" name=\"inputSld\" type=\"file\" class=\"file-loading\">"+
									"<div id=\"buttonStyles\"></div>"+
					             "</div>"
		$("#modalStyles .modal-body").html(modalHTML);

		$('#inputSld').fileinput({
		    uploadUrl:apiPath+"apiGeoserver.php", 
		    uploadAsync: true,
		    uploadExtraData:{
			    tag:"uploadNewStyle",
			    mapName:mapName,
			    layerName:layerName,
		    },
		    allowedFileExtensions: ["sld", "xml"],
		    previewClass:"bg-warning",
		    dropZoneEnabled: false, 
		});

		$("#inputSld").on('fileuploaded', function(event,data ) {
			//console.log(data);
		    styleName=data.files[0].name.split(".");
		    styleSource=getStyleSrc(styleName[0],layerName);
		    $("#styleList").prepend("<option value=\""+styleName[0]+"\" ondblclick=\"selectStyle()\">"+styleName[0]+"</option>");
		    $("#styleSrc").append("<input type=\"hidden\" id=\""+styleName[0]+"\" value=\""+styleSource+"\" \>");
		});

        $("#inputSld").on('fileuploaderror', function(event,data ) {
                console.log(data);
                console.log("error");
        });
        $("#modalStyles").modal("show");

		},
		error: function(error){
			console.log(error);
		}
	})
}

function getStyleSrc(styleName,layerName){
	var parser = new ol.format.WMSCapabilities();
	$.ajax({
        type: "GET",
        dataType : 'text',
        url: server+"geoserver/"+mapName+"/wms?request=getCapabilities&service=wms",
        success: function (response) {
            var service = parser.read(response);
            for(var i=0; i<service.Capability.Layer.Layer.length; i++){
               	if (layerName==service.Capability.Layer.Layer[i].Name)
                    var pickLayer= service.Capability.Layer.Layer[i];    
            }
            for(var i=1; i<pickLayer.Style.length; i++){
            	if (styleName==pickLayer.Style[i].Name)
            		console.log(pickLayer.Style[i].LegendURL[0].OnlineResource);
            		//return pickLayer.Style[i].LegendURL[0].OnlineResource;
			}        
       	}
    })	
}

function selectStyle(){
	var newDefaultStyle=$("#styleList option:selected").val();
	var newStyleSource=document.getElementById(newDefaultStyle).value;
	document.getElementById("defaultStyle").value=newDefaultStyle;
	var prueba=document.getElementById('legendStyle');
	document.getElementById("legendStyle").src=newStyleSource;
}

function setOpacity(){
	var opacity=document.getElementById('opacityBar').value
	globalLayer.setOpacity(opacity);
	updateDatabaseMap();
}

function updateStyle(){
	var newDefaultStyle=document.getElementById("defaultStyle").value;
	setOpacity();

	if(defaultStyle!=newDefaultStyle){
    	$.ajax({
        	type: "POST",
        	url:apiPath+'apiGeoserver.php',
        	data : {
				tag:"setDefaultStyle",
                mapName: mapName,
				layerName:globalLayer.name,
				styleName:newDefaultStyle,
            },
        	success: function (response) {
				globalLayer.getSource().updateParams({
					'LAYERS' : map.name+":"+globalLayer.name,
					'TILED' : true,
					'STYLES': newDefaultStyle,
				});
        	},
        	error:function(error){
                console.log(error);
        	}
    	});
	}
}

function saveAttributes(){
	var att="";
	//Crear lista con los atributos checked
	$(".modal-body").children().each(function(){
		if(($($(this)).children('input')).is(':checked'))
			att=att+","+$($(this)).children('label').html().replace(/&nbsp;/g,"");
	});
	if(att=="")
		console.log("Debe haber al menos un atributo.");
	else{
		var select_layer=att.substr(1);

		$.ajax({
	    	type: "POST",
	    	url:apiPath+'apiDatabase.php',
	    	data : {
				tag:"editView",
	            mapName: map.name,
				layerName: globalLayer.name,
				select_layer: select_layer
	        },
	    	success: function (response) {
	            console.log(response);
	    	},
	    	error:function(error){
	            console.log(error);
	    	}
		});
	}
}

function editWmsList() {
	var htmlModal = "<label for=\"wmsList\">Lista de Wms disponible</label>" +
		"<select multiple class=\"form-control\" id=\"wmsList\" tabindex=\"1\">" +
		"</select>" +
		"<button onclick='delWmsUrl()' id=\"ButtonDelWms\" class=\"btn btn-info btn-block\" style=\"margin-top:5px;margin-bottom:5px\" >Eliminar Wms</button>" +
		"<input type=\"text\"  id=\"newWmsUrl\" style=\"width:100%; border-radius: 7px; \"/>" +
		"<button onclick='addWmsUrl()' id=\"ButtonAddWms\" class=\"btn btn-info btn-block\" style=\"margin-top:5px\" >Añadir Wms</button>";
	$("#modalWmsList .modal-body").empty();
	$("#modalWmsList .modal-body").append(htmlModal);
	$("#modalWmsList").modal("show");
	$.ajax({
		type : "POST",
		url : apiPath + "apiDatabase.php",
		data : {
			tag : "getWms"
		},
		success : function (response) {
			console.log(response);
			var wmsList = JSON.parse(response);
			//$("#wmsList").empty();
			for (var i = 0; i < wmsList.length; i++) {
				$("#wmsList").append("<option value=\"" + wmsList[i] + "\">" + wmsList[i] + "</option>");
			}
			$('#wmsList').prop('selectedIndex', -1);
		},
		error : function (error) {
			$("#selectWms").append("<option value='http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms'>http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms</option>");
			console.log("Ocurrió un error. Compruebe su conexión al servidor.");
			console.log("Error al mostrar la lista de wms: " + error);
		}
	});
}

function addWmsUrl() {
	var newWmsUrl = $('#newWmsUrl').val();
	var checkUrl = true;
	newWmsUrl = newWmsUrl.trim();
	newWmsUrl = newWmsUrl.split("?");
	newWmsUrl = newWmsUrl[0];
	if (newWmsUrl) {
		$("#wmsList option").each(function () {
			var listUrl = $(this).val();
			if (listUrl == newWmsUrl)
				checkUrl = false;
		});
		if (checkUrl) {
			$("#wmsList").append("<option value=\"" + newWmsUrl + "\">" + newWmsUrl + "</option>");
			$('#newWmsUrl').val("");
		}
	}
}

function delWmsUrl() {
	$("#wmsList option:selected").remove();
}

function updateWmsList() {
	var newWmsList = [];
	$("#wmsList option").each(function () {
		newWmsList.push($(this).val());
	});
	console.log(newWmsList);
	$.ajax({
		type : "POST",
		url : apiPath + "apiDatabase.php",
		data : {
			tag : "updateWmsList",
			wms : newWmsList
		},
		success : function (response) {
			console.log(response);
		},
		error : function (response) {
			console.log(response);
		}
	});
	$('#selector').empty();
	showListWms();
}
