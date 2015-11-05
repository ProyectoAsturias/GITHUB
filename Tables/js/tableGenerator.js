var mapNames = [];
var layersPerMap = [];
var entityParams = []; //id,nombre,proyección y town de la entidad base del usuario

$(document).ready(function () {

	geoLogin();

	$("#userName").append(userName);
	version();
	//console.log(userEntityId);
	if (userEntityId == 0) {
		entityParams.push("PAsturias");
		entityParams.push("0");
		entityParams.push("25830");
		/*mun=[];
		mun.push(33001);
		entityParams.push(mun);*/
		startTables();
	} else {
		$.ajax({
			type : "POST",
			url : apiPath + "apiLocalgis.php",
			data : {
				tag : "getEntityData",
				entityId : userEntityId
			},
			success : function (response) {
				//console.log(response);
				//Si no devuelve nada, es generico
				entityParams = JSON.parse(response);

				startTables();
			},
			error : function (error) {
				alert("Error al cargar los parámetros base : " + error);
			}

		});
	}
});

function geoLogin () {
 var username = "privateUser";
 var password = "1234";
 var url = serverGS + "geoserver/j_spring_security_check";

 var ajax = $.ajax({
  data: "username=" + username + "&password=" + password,
  type: "POST",
  xhrFields: {
   withCredentials: true
  },
  contentType: "application/x-www-form-urlencoded",
  url: url
 });
}


function geoLogout () {
 var url = serverGS + "geoserver/j_spring_security_logout";

 var ajax = $.ajax({
  type: "GET",
  xhrFields: {
   withCredentials: true
  },
  url: url
 });
}

function version(){
	$.ajax({
		url : "../php/userContent.php",
		data : {
			tag : "getVersionInfo"
		},
		method : "POST",
		success : function (response) {
			var info = JSON.parse(response);
			if(info!=null){
				$('div[id=version]').html("Version "+info[0]+".");
				showVersionInfo(info);
			}
		}
	});
}

function showVersionInfo(info){
	$('div[id=version]').click(function(){
		var html = "<strong>"+info[0]+"</strong>. "+info[1]+".<br><br><ul><li>"+info[2]+"</li></ul>";
		$("#modalVersion .modal-body").empty();
		$("#modalVersion .modal-body").append(html);
		$("#modalVersion").modal("show");
	});
}

function createBubblesForLinks() {
	$('body').on('mouseenter', ".linkContainer a[title]", function (event) {
		var linkElement = $(this);
		if (layersPerMap[linkElement.html()] != undefined) {
			changeTitleForLinkElement(linkElement);
		}
		$(this).qtip({
			overwrite : false,
			hide : 'unfocus',
			show : {
				event : "click"
			}
		});
	});
}

function changeTitleForLinkElement(linkElement) {
	$("#table").find("tr").each(function (rowIndex, row) {
		if ($(row).find("td .linkContainer a").html() != undefined && $(row).find("td .linkContainer a").html() == linkElement.html()) {
			linkElement.prop("title", "<b>Este mapa contiene las capas:</b><br>" + layersPerMap[linkElement.html()].replace(/,/g, "<br>"));
		}
	})
}
function startTables() {
	createMapsTable($("#table"));
	mapsClickEventsHandler();
	createVisorsTable($("#tableVisors"));
	createBubblesForLinks();
	focusElement();
	//console.log(entityParams);
}

function createTable(target, columns, data) {
	target.bootstrapTable({
		columns : columns,
		data : data,
		uniqueId : "id",
		classes : 'table table-hover table-no-bordered',
		sortName: "date_update",
		sortOrder:"desc"
	});
}

function createMapsTable(target) {
	//console.log(entityParams[0]);
	retrieveUserMaps(function (jsonMaps) {
		//console.log(jsonMaps);
		var mapsData = JSON.parse(jsonMaps);
		var columns = [{
				checkbox : "true"
			}, {
				field : "image",
				title : "Imagen",
			}, {
				field : "id",
				title : "ID Mapa",
				sortable : "true"
			}, {
				field : "name",
				title : "Nombre",
				sortable : "true",
				formatter : "layersBubbleTooltip"
			}, {
				field : "description",
				title : "Descripción",
				formatter : "formatterDescriptionMap",
				titleTooltip : "click para editar descripción"
			}, {
				field : "date_update",
				title : "Última modificación",
				sortable : "true",
				formatter : "formatterDate"
			}, {
				field : "date_creation",
				title : "Fecha creación",
				sortable : "true",
				formatter : "formatterDate"
			}, {
				field : "WMS",
				title : "WMS",
				formatter : "WmsFormatter"
			}, {
				field : "editMap",
				title : "Editar Mapa",
				formatter : "formatterEditMap"
			}, {
				field : "published",
				title : "Publicado",
				sortable : "true",
				formatter : "publishedFormatter"
			}, {
				field : "synchronized",
				title : "Sincronizado",
				formatter : "synchronizedFormatter"
			}, {
				field : "entityId",
				title : "Id entidad",
				visible : false
			}
		];
		if (mapsData) {
			mapsData = convertBinaryDataToImages(mapsData);
		 }
		createTable(target, columns, mapsData);
		appendImages();
		downloadLayersInfoPerMap(mapsData);	
	});
}

function createVisorsTable(target) {
	retrieveUserVisors(function (jsonVisors) {
		var visorsData = JSON.parse(jsonVisors);
		var columns = [{
				checkbox : "true"
			}, {
				field : "id",
				title : "ID Visor",
				sortable : "true"
			}, {
				field : "name",
				title : "Nombre",
				sortable : "true"
			}, {
				field : "description",
				title : "Descripción",
				formatter : "formatterDescriptionView"
			}, {
				field : "date_update",
				title : "Última modificación",
				sortable : "true",
				formatter : "formatterDate"
			}, {
				field : "date_creation",
				title : "Fecha creación",
				sortable : "true",
				formatter : "formatterDate"
			}, {
				field : "editVisor",
				title : "Editar Visor",
				formatter : "formatterEditVisor"
			}, {
				field : "Visor",
				title : "Visor",
				formatter : "FormatterAccessToVisor"
			}, {
				title : "Descargar",
				formatter : "downloadVisorLink"
			}
		];
		createTable(target, columns, visorsData);
	});
}

function retrieveUserMaps(callback) {
	$.ajax({
		url : "../php/userContent.php",
		data : {
			tag : "entityMaps",
			userEntityId : userEntityId
		},
		method : "POST",
		success : function (response) {
			//console.log(response);
			callback(response);
		}
	});
}

function retrieveUserVisors(callback) {
	$.ajax({
		url : "../php/userContent.php",
		data : {
			tag : "userVisors"
		},
		method : "POST",
		success : function (response) {
			callback(response);
		}
	});
}

function publishedFormatter(value, row, index) {
	if (row.published == "t")
		return "<span class='glyphicon glyphicon-ok-sign' style='color:green;'></span>";
	else
		return "<span class='glyphicon glyphicon-remove-sign' style='color:red;'></span>";
}

function WmsFormatter(value, row, index) {
	if (row.published == "t")
		return "<button class='btn btn-success btn-block' title=\"Obtener link Wms\" onclick=\"getWmsLink('" + row.name + "')\">Enlace WMS</button>";
}

function synchronizedFormatter(value, row, index) {
	return "<span class='glyphicon glyphicon-refresh' style='color:green; font-size: 1.2em;'></span>";
}

function formatterDescriptionMap(value, row, index) {
	value = value.replace(/\n/g, "<br>");
	return "<p>" + value + "</p><span class=' glyphicon glyphicon-pencil descButton' style='color:grey; font-size: 1.2em;' onclick=\"editDescriptionMap('" + row.name + "','" + value + "','" + row.id + "')\"></span>";
}

function formatterDescriptionView(value, row, index) {
	value = value.replace(/\n/g, "<br>");
	return "<div id='"+row.name+"'><p>" +  value + "</p><span class=' glyphicon glyphicon-pencil descButton' style='color:grey; font-size: 1.2em;' onclick=\"editDescriptionView('" + row.name + "','"+value+"','" + row.id + "')\"></span></div>";
}

function formatterEditMap(value, row, index) {
	return "<button class='btn btn-success btn-block' onclick=\"editMap('" + row.name + "','" + row.published + "','" + row.entityId + "')\">Editar Mapa</button>";
}

function formatterEditVisor(value, row, index) {
	return "<button class='btn btn-success btn-block' title='Editar este visor' onclick=\"editVisor('" + row.name + "')\">Editar Visor</button>";
}

function FormatterAccessToVisor(value, row, index) {
	return "<button class='btn btn-success btn-block' title='Acceder a este visor' onclick=\"accessVisor('" + row.name + "')\">Visor</button>";
}

function formatterDate(value,row,index){
	/*var dateVal = new Date(value);
	var h;
	if(dateVal.getHours()<10)
		h="0"+dateVal.getHours();
	else
		h=dateVal.getHours();
	if(dateVal.getMinutes()<10)
		m="0"+dateVal.getMinutes();	
	else
		m=dateVal.getMinutes();
        if(dateVal.getSeconds()<10)
                s="0"+dateVal.getSeconds();
        else
                s=dateVal.getSeconds();	
	var dateFormat = dateVal.getDay()+"/"+dateVal.getMonth()+"/"+dateVal.getFullYear()+" "+h+":"+m+":"+s;
	return dateFormat;*/
	var dateFormat = new moment(value);//,"YY");// "DD-MM-YYYY HH:mm:ss");
	return dateFormat.format("DD-MM-YYYY HH:mm:ss");
}

function layersBubbleTooltip(value, row, index) {
	var content = "";
	if (row.layersInfo == null) {
		content = "Este mapa no tiene ninguna capa asignada";
	} else {
		var parsedContent = JSON.parse(row.layersInfo);
		console.log(parsedContent);
	}

	var htmlObject = $('<div >', {
			html : "<a title='" + content + "'>" + value + "</a>",
			class : "linkContainer"
		});

	var wrapper = document.createElement("div");
	wrapper.appendChild(htmlObject.get(0));
	var htmlString = wrapper.innerHTML;
	delete wrapper;

	return htmlString;
}

function downloadVisorLink(value, row, index) {
	return "<a href='../php/downloadVisor.php?visorName=" + row.name + "' title='Descargar este visor en formato Zip' download=''><span class='glyphicon glyphicon-download'></span></a>";
}

function mapsClickEventsHandler() {
	$('#table').on("click-cell.bs.table", function (event, field, value, row) {
		if (field == "image") {
				window.location.href = mapPath + 'php/mapGenerator.php?mapName=' + row.name + '&id=' + row.entityId;
			/*else {
				var html = "<button type=\"button\" onclick=\"activateWmsMap('" + row.name + "','" + row.entityId + "')\" class=\"btn btn-success\">Publicar y editar</button>" +
					"<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>";
				$("#modalActivateWmsMaps .modal-footer").empty();
				$("#modalActivateWmsMaps .modal-footer").append(html);
				$("#modalActivateWmsMaps").modal("show");
			}*/
		}
	})
	$("#listMapsCollapse").on("click", function(){
	        history.pushState({previous: "#listMapsCollapse"}, "", location.pathname);
        })
        $("#listVisorsCollapse").on("click", function(){
        	history.pushState({previous: "#listVisorsCollapse"}, "", location.pathname);
        })

}

function editDescriptionMap(mapName, description, id) {
	description = description.replace(/<br>/g , "\n");
	var headHtml = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>" +
		"<h4 class=\"modal-title\">Cambiar descripción del mapa:" + mapName + "</h4>";
	var bodyHtml = "<label for=\"description\">Descripción del Mapa</label>" +
		"<textarea rows=\"3\" class=\"form-control\" id=\"description\" style=\"resize:none;\">" + description + "</textarea>";
	var footerHtml = "<button type=\"button\" id=\"updateDescription\" data-dismiss=\"modal\" onclick=\"updateDescriptionMap('" + mapName + "','" + id + "')\" class=\"btn btn-success\">Guardar</button>" +
		"<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>";
	$("#modalUpdateDescription .modal-header").empty().append(headHtml);
	$("#modalUpdateDescription .modal-body").empty().append(bodyHtml);
	$("#modalUpdateDescription .modal-footer").empty().append(footerHtml);
	$("#modalUpdateDescription").modal("show");
}

function editDescriptionView(visorName, description, id) {
	description = description.replace(/<br>/g , "\n");
	var headHtml = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>" +
		"<h4 class=\"modal-title\">Cambiar descripción del mapa:" + visorName + "</h4>";
	var bodyHtml = "<label for=\"description\">Descripción del Mapa</label>" +
		"<textarea rows=\"3\" class=\"form-control\" id=\"description\" style=\"resize:none;\">" + description + "</textarea>";
	var footerHtml = "<button type=\"button\" id=\"updateDescription\" data-dismiss=\"modal\" onclick=\"updateDescriptionView('" + visorName + "','" + id + "')\" class=\"btn btn-success\">Guardar</button>" +
		"<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>";
	$("#modalUpdateDescription .modal-header").empty().append(headHtml);
	$("#modalUpdateDescription .modal-body").empty().append(bodyHtml);
	$("#modalUpdateDescription .modal-footer").empty().append(footerHtml);
	$("#modalUpdateDescription").modal("show");
}

function editMap(mapName, published, entityId) {
	//if (published == "t")
		window.location.href = mapPath + 'php/mapGenerator.php?mapName=' + mapName + '&id=' + entityId;
	/*else {
		var html = "<button type=\"button\" onclick=\"activateWmsMap('" + mapName + "','" + entityId + "')\" class=\"btn btn-success\">Publicar y editar</button>" +
			"<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>";
		$("#modalActivateWmsMaps .modal-footer").empty();
		$("#modalActivateWmsMaps .modal-footer").append(html);
		$("#modalActivateWmsMaps").modal("show");
	}*/
}

function accessVisor(viewName) {
	window.location.href = installationPath + "Visor/php/visor.php?visorName=" + viewName;
}

function editVisor(viewName) {
	window.location.href = viewPath + "php/generateVisor.php?visorName=" + viewName;
}

function loadDefaultGif(value, row, index){
	return("<img src='"+row.image+"' class=\"imageMap\">");
}

function updateDescriptionMap(mapName, id) {
	var mapDescription = $('#description').val();
	$.ajax({
		url : "../php/userContent.php",
		data : {
			tag : "updateDescriptionMap",
			mapName : mapName,
			mapDescription : mapDescription,
		},
		method : "POST",
		success : function (response) {
			console.log(response);
			var row = $("#table").bootstrapTable('getRowByUniqueId', "" + id + "");
			//console.log(row);
			row.description = mapDescription;
			$("#table").bootstrapTable('updateRow', {
				index : getMapRowIndexById(row.id),
				row : row
			});
			appendImages();
			console.log("Descripción de Mapa actualizada.");
		},
		error : function (error) {
			console.log("Error al actualizar descripción del mapa:" + error);
		}
	});
}

function updateDescriptionView(viewName, id) {
	var viewDescription = $('#description').val();
	$.ajax({
		url : "../php/userContent.php",
		data : {
			tag : "updateDescriptionView",
			viewName : viewName,
			viewDescription : viewDescription,
		},
		method : "POST",
		success : function (response) {
			var row = $("#tableVisors").bootstrapTable('getRowByUniqueId', "" + id + "");
			row.description = viewDescription;
			$("#tableVisors").bootstrapTable('updateRow', {
				index : getViewRowIndexById(id),
				row : row
			});
			console.log("Descripción de Mapa actualizada.");
		},
		error : function (error) {
			console.log("Error al actualizar descripción del mapa:" + error);
		}
	});
}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
}

function focusElement(){
	focusVisorElement(getQueryVariable("previous"));
	focusMapElement(getQueryVariable("previous"));
}

function focusVisorElement(previousElement){
	$("#tableVisors").on("post-body.bs.table", function(){
		if (previousElement != undefined){
			if ($("#tableVisors #"+previousElement).length != 0){
				$("#listVisorsCollapse").trigger("click");
			}
			location.href="#"+previousElement;
			history.pushState({previous: "#listVisorsCollapse"}, "", location.pathname);
			$("#tableVisors").off("post-body.bs.table");
		}
	})
}
			
function focusMapElement(previousElement){
	$("#table").on("post-body.bs.table", function(){
		if (previousElement != undefined){
			location.href="#"+previousElement;
			history.pushState({previous: previousElement}, "", location.pathname);
			$("#table").off("post-body.bs.table");
		}
	})
}

function downloadLayersInfoPerMap(mapsData){
	//console.log(mapsData);
	if (mapsData) {
		mapsData.forEach(function (mapData) {
			getLayersMap(mapData.name, mapData.entityId);
		});
	 }
}

function getLayersMap(mapName){
	var parser = new ol.format.WMSCapabilities();
	var urlWms = serverGS + 'geoserver/' + mapName + '/wms';
	$.ajax({
		type : "GET",
		dataType : 'text',
		url : urlWms + requestCapabilities,
		crossDomain : true,
		success : function (response) {
			var service = parser.read(response);
			if (service.Capability && service.Capability.Layer.Layer) {
				var layersNames = "";
				for (var i = 0; i < service.Capability.Layer.Layer.length; i++) {
					layersNames += service.Capability.Layer.Layer[i].Name + ",";
				}
				layersPerMap[mapName] = layersNames;
			}
		}
	})
}

function convertBinaryDataToImages(mapsData) {
	mapsData.forEach(function (map) {
		map.image = "<div class=\"divImg\"><img src='../../Common/images/loading-120.gif' class=\"imageMap\"></div>";
	});
	return mapsData;
}

function appendImages() {
	$.ajax({
		url : "../php/userContent.php",
		data : {
			tag : "getMiniImages",
			userEntityId : userEntityId
		},
		method : "POST",
		success : function (response) {
			//console.log(response);
			var mapImages=JSON.parse(response);
			//console.log(mapImages);
			for(i=0;i<mapImages.length;i++){
				var row = $("#table").bootstrapTable('getRowByUniqueId', "" +mapImages[i].id + "");
				//console.log(row);
				row.image = "<div class=\"divImg\"><img src='"+mapImages[i].image+"' class=\"imageMap\"></div>";
				$("#table").bootstrapTable('updateRow', {
					index : getMapRowIndexById(mapImages[i].id),
					row : row
				});
			}
		}
	});
}

window.onload = function(e){
	try{
		if (history.state.previous == "#listVisorsCollapse") {
			$("#tableVisors").on("post-body.bs.table", function(){
				$("" + history.state.previous).trigger("click");
				$("#tableVisors").off("post-body.bs.table");
			})
		}
	} catch (e){
		return;
	}
}
