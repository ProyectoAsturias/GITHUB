var globalLayer;

/**
*Primero pedimos la informacion actual del servicio Wms del mapa, a traves del GetCapabilities , y despues desplegamos la ventana modal para poder modificarlos
**/
function appendModalWms(){
	var parser = new ol.format.WMSCapabilities();
	//llamada al GetCapabilities
	$.ajax({
		type: "GET",
		dataType : 'text',
		url: server+"geoserver/"+mapName+"/wms?request=getCapabilities&service=wms",
		success: function (response) {
			var service = parser.read(response);
			console.log(service);
			var modalHTML="<label for=\"title\">Titulo del servicio Wms</label>"+
					"<input type=\"text\" class=\"form-control\" id=\"title\" value=\""+service.Service.Title+"\">"+
					"<label for=\"abstract\">Descripci�n del servicio Wms</label>"+
					"<textarea rows=\"3\" class=\"form-control\" id=\"abstract\">"+service.Service.Abstract+"</textarea>"+
										"<label for=\"keywordList\">Palabras clave</label>"+
					"<select multiple class=\"form-control\" id=\"keywordList\" tabindex=\"1\">"
			for(var i=0; i<service.Service.KeywordList.length; i++)
				modalHTML +="<option value=\""+service.Service.KeywordList[i]+"\">"+service.Service.KeywordList[i]+"</option>"	
			modalHTML +="</select>"+
				"<button onclick='delKeyword()' id=\"delKeyword\" class=\"btn btn-info btn-block\" style=\"padding:0;\" >Eliminar palabra clave</button>"+
				"<input type=\"text\"  id=\"keyword\" style=\"width:100%; border-radius: 7px; \"/>" +
				"<button onclick='addKeyword()' id=\"addKeyword\" class=\"btn btn-info btn-block\" style=\"padding:0;\" >A�adir palabra clave</button>"+
				"</div>"+
				"<h3 style=\"textalign:center;\">Informaci�n de contacto</h3>"+
				"<div class=\"col-xs-12\" id=\"ContactInfo\">"+
					"<div class=\"col-xs-6\">"+
						"<label for=\"contactPerson\">Persona de contacto</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"contactPerson\" value=\""+service.Service.ContactInformation.ContactPersonPrimary.ContactPerson+" \">"+
						"<label for=\"contactPosition\">Puesto en la organizaci�n</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"contactPosition\" value=\""+service.Service.ContactInformation.ContactPosition+" \">"+
						"<label for=\"address\">Direcci�n</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"address\" value=\""+service.Service.ContactInformation.ContactAddress.Address+" \">"+
						"<label for=\"stateOrProvince\">Provincia/Estado</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"stateOrProvince\" value=\""+service.Service.ContactInformation.ContactAddress.StateOrProvince+" \">"+
						"<label for=\"postCode\">Cod.Postal</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"postCode\" value=\""+service.Service.ContactInformation.ContactAddress.PostCode+" \">"+
						"<label for=\"fax\">Fax</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"fax\" value=\""+service.Service.ContactInformation.ContactFacsimileTelephone+" \">"+
					"</div><div class=\"col-xs-6\">"+
						"<label for=\"contactOrganization\">Organizaci�n</label>"+
						"<input type=\"text\"  class=\"form-control\" id=\"contactOrganization\"  value=\""+service.Service.ContactInformation.ContactPersonPrimary.ContactOrganization+" \">"+
						"<label for=\"addressType\">Tipo de direcci�n</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"addressType\" value=\""+service.Service.ContactInformation.ContactAddress.AddressType+" \">"+
						"<label for=\"city\">Ciudad</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"city\" value=\""+service.Service.ContactInformation.ContactAddress.City+" \">"+
						"<label for=\"country\">Pais</label>"+
						"<input type=\"text\" class=\"form-control\" id=\"country\" value=\""+service.Service.ContactInformation.ContactAddress.Country+" \">"+
						"<label for=\"contactPhone\">Tel�fono</label>"+
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
			var modalHTML="<label for=\"title\">Titulo de la capa</label>"+
					"<input type=\"text\" class=\"form-control\" id=\"title\" value=\""+pickLayer.Title+"\">"+
					"<label for=\"abstract\">Descripci�n de la capa</label>"+
					"<textarea rows=\"3\" class=\"form-control\" id=\"abstract\">"+pickLayer.Abstract+"</textarea>"+
					"<label for=\"keywordList\">Palabras clave</label>"+
					"<select multiple class=\"form-control\" id=\"keywordList\" tabindex=\"1\">"
			for(var i=0; i<pickLayer.KeywordList.length; i++)
			modalHTML +="<option value=\""+pickLayer.KeywordList[i]+"\">"+pickLayer.KeywordList[i]+"</option>"	
			modalHTML +="</select>"+
					"<button onclick='delKeyword()' id=\"delKeyword\" class=\"btn btn-info btn-block\" style=\"padding:0;\" >Eliminar palabra clave</button>"+
					"<input type=\"text\"  id=\"keyword\" style=\"width:100%; border-radius: 7px; \"/>" +
					"<button onclick='addKeyword()' id=\"addKeyword\" class=\"btn btn-info btn-block\" style=\"padding:0;\" >A�adir palabra clave</button>"+
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
    if(keyword)
        $("#keywordList").append("<option value=\""+keyword+"\">"+keyword+"</option>");
    $('#keyword').val("");
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
			var styleSrc="";
                        for(var i=0; i<capabilities.Layer.Layer.length; i++){
                                if (layerName==capabilities.Layer.Layer[i].Name){
                                        var pickLayer= capabilities.Layer.Layer[i];
                                }
                        }
			var srcStyle =pickLayer.Style[0].LegendURL[0].OnlineResource;
			var valueOpacity=globalLayer.getOpacity();
                        var modalHTML="<label for=\"defaultStyle\">Estilo por defecto </label>"+
					"<div><img id='legendStyle' src=\""+srcStyle+"\" /></div>"+
                                        "<input type=\"text\" readonly  class=\"form-control\" id=\"defaultStyle\" value=\""+pickLayer.Style[0].Name+"\">"+
					"<label for=\"opacityBar\">Transparencia</label>"+
					"<input class='opacity' id=\"opacityBar\" onchange='setOpacity()' value=\""+valueOpacity+"\" type='range' min='0' max='1' step='0.01'/>"+
                                        "<label for=\"styleList\">Estilos disponibles</label>"+
                                        "<select multiple class=\"form-control\" id=\"styleList\" tabindex=\"1\">"
                        for(var i=1; i<pickLayer.Style.length; i++){
                        	modalHTML +="<option value=\""+pickLayer.Style[i].Name+"\">"+pickLayer.Style[i].Name+"</option>";
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
				uploadUrl: apiPath+"styleUpload.php", 
				uploadAsync: true,
				allowedFileExtensions: ["sld"],
				previewClass:"bg-warning",
				dropZoneEnabled: false,	
			});
			$("#inputSld").on('fileuploaded', function(event,data ) {
        			//console.log(data);
				var styleName= data.files[0].name.split(".");
				//console.log(styleName[0]);
				$("#modalStyles .modal-body").empty();
				appendModalStyles(mapName,layer);
			});
                        $("#inputSld").on('fileuploaderror', function(event,data ) {
                                //console.log(data);
                                //console.log("error");
                        });
                        $("#modalStyles").modal("show");

		},
		error: function(error){
			console.log(error);
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
}

function updateStyle(){
	var newDefaultStyle=document.getElementById("defaultStyle").value;
        $.ajax({
                type: "POST",
                data : {
                        mapName: mapName,
			layerName:globalLayer.name,
			styleName:newDefaultStyle,
                },
                url:apiPath+'updateDefaultStyle.php',
                success: function (response) {
                        console.log(response);
                },
                error:function(error){
                        console.log("error");
                }
        });
}
