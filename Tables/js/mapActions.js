$(document).ready(function () {
	collapseMapIconEvent();
	createNewMapEventsHandler();
	deleteMapEventHandler();
	publicateMapEventHandler();
	unpublicateMapEventHandler();
	copyToClipBoard();
});

function collapseMapIconEvent() {
	$("#listMapsCollapse").click(function () {
		if ($("#listMapsCollapseIcon").attr('class') == "glyphicon glyphicon-collapse-down")
			$("#listMapsCollapseIcon").attr('class', "glyphicon glyphicon-collapse-up");
		else
			$("#listMapsCollapseIcon").attr('class', "glyphicon glyphicon-collapse-down");

		if ($("#listVisorsCollapseIcon").attr('class') == "glyphicon glyphicon-collapse-up")
			$("#listVisorsCollapseIcon").attr('class', "glyphicon glyphicon-collapse-down");
	});
}

function createNewMapEventsHandler() {
	$("#newMap").click(function () {
		//console.log(userEntityId);
		if (userEntityId == 0) {
			var html = "<select id=\"selectConcejo\" class=\"chosen-select\" tabindex=\"1\" onchange=\"setProjection();\" ></select>" +
				"<label for=\"newMapName\" style=\"margin-top:6px\">Nombre del nuevo mapa</label>" +
				"<input type=\"text\" id=\"newMapName\" style=\"width:100%; border-radius: 7px; margin-bottom:6px; \"/>" +
				"<label for=\"selectProjection\">Seleccione una proyección</label>" +
				"<select id=\"selectProjection\" class=\"chosen-select\" tabindex=\"1\" >" +
				"<option value=\"25829\">UTM-29</option>" +
				"<option value=\"25830\">UTM-30</option>" +
				"</select>" +
				"<label for=\"newMapDescription\" style=\"margin-top:6px\">Descripción del nuevo mapa</label>" +
				"<input type=\"text\" id=\"newMapDescription\" style=\"width:100%; border-radius: 7px; margin-bootom:6px; \"/>";

			$("#modalNewMap .modal-body").empty().append(html);
			$.ajax({
				url : apiPath + "apiLocalgis.php",
				data : {
					tag : "getEntityNames"
				},
				method : "POST",
				success : function (response) {
					//console.log(response);
					var concejos = JSON.parse(response);

					//console.log(concejos)
					for (var i = 0; i < concejos.length; i++)
						//console.log(concejos[i][0]+","+concejos[i][1]);
						$("#selectConcejo").append("<option value=\"" + concejos[i][1] + "\" >" + concejos[i][0] + "</option>");
					$('#selectConcejo').prop('selectedIndex', -1);
					//$('#selectProjection').prop('selectedIndex', -1);
					$(".chosen-select").trigger("chosen:updated");
					$('.chosen-select').chosen({
						width : "100%",
						search_contains : true,
						placeholder_text_single : "Seleccione una Entidad"
					});
				},
				error : function (response) {
					console.log(response);
				}
			})
			$("#modalNewMap").modal("show");
		} else {
			var html = "<label for=\"newMapName\" style=\"margin-top:6px\">Nombre del nuevo mapa</label>" +
				"<input type=\"text\" id=\"newMapName\" style=\"width:100%; border-radius: 7px; margin-bottom:6px; \"/>" +
				"<label for=\"selectProjection\">Seleccione una proyección</label>" +
				"<select id=\"selectProjection\" class=\"chosen-select\" tabindex=\"1\" >" +
				"<option value=\"25829\">UTM-29</option>" +
				"<option value=\"25830\">UTM-30</option>" +
				"</select>" +
				"<label for=\"newMapDescription\" style=\"margin-top:6px\">Descripción del nuevo mapa</label>" +
				"<input type=\"text\" id=\"newMapDescription\" style=\"width:100%; border-radius: 7px; margin-bootom:6px; \"/>";

			$("#modalNewMap .modal-body").empty().append(html);
			$('.chosen-select').chosen({
				width : "100%",
				search_contains : true,
				placeholder_text_single : "Seleccione una Entidad"
			});
			$("#modalNewMap").modal("show");
		}
		setProjection();
	});
	mapModalSaveButtonHandler();
}

function setProjection() {
	var prj;
	if (entityParams[3] != undefined) {
		prj = entityParams[2];
		setSelectProjection(prj);
	} else if ($("#selectConcejo").val() != null) {
		var entityId = $("#selectConcejo").val();
		console.log(entityId);
		$.ajax({
			type : "POST",
			url : apiPath + "apiLocalgis.php",
			data : {
				tag : "getEntityData",
				entityId : entityId
			},
			success : function (response) {
				result = JSON.parse(response);
				setSelectProjection(result[2]);
			},
			error : function (error) {
				alert("Error al cargar los parámetros base : " + error);
			}
		});
	}
}

function setSelectProjection(prj) {
	console.log(prj);
	//$(".chosen-select").trigger("chosen:updated");
	if (prj == 25830)
		$('#selectProjection').prop('selectedIndex', 1);
	else
		$('#selectProjection').prop('selectedIndex', 0);
	$(".chosen-select").trigger("chosen:updated");
}

function mapModalSaveButtonHandler() {
	$("#createMapModal").click(function () {
		var mapName = $("#newMapName").val();
		var projection = $("#selectProjection").val();

		var entityId;
		console.log(mapName);
		if (mapName == "") {
			alert("El nombre del mapa no puede estar vacío");
			return;
		}

		mapName = checkMapName(mapName);

		console.log(entityId);
		console.log(mapName);

		if (entityParams[1] != 0) {
			mapName = entityParams[0] + "_" + mapName;
			entityId = entityParams[1];

			mun = entityParams[3];
			createMap(mapName, entityId, mun, projection);
		} else {
			console.log($("#selectConcejo option:selected").text());
			if ($("#selectConcejo option:selected").text() == "") {
				alert("Debe escoger un municipio");
				return;
			}
			mapName = $("#selectConcejo option:selected").text() + "_" + mapName;
			entityId = $("#selectConcejo").val();

			$.ajax({
				type : "POST",
				url : apiPath + "apiLocalgis.php",
				data : {
					tag : "getEntityData",
					entityId : entityId
				},
				success : function (response) {
					result = JSON.parse(response);
					//console.log(entityParams[3]);//entityParams);
					mun = result[3];
					createMap(mapName, entityId, mun, projection);
				},
				error : function (error) {
					alert("Error al cargar los parámetros base : " + error);
				}
			});
		}

	})
}

function createMap(mapName, entityId, mun, projection) {
	console.log(mapName + "," + entityId + "," + mun + "," + projection);
	$.ajax({
		url : apiPath + "apiGeoserver.php",
		data : {
			mapName : mapName,
			projection : projection,
			town : mun,
			tag : "createMap"
		},
		method : "POST",
		success : function (response) {
			console.log(response);
			if (response.indexOf("already exists") != -1) {
				alert("Ya existe un mapa con ese nombre, por favor introduzca otro.");
				return;
			}
			var description = $("#newMapDescription").val();
			saveNewMap(mapName, description, userName, entityId).then(function (result) {
				console.log(result);
				if (result != "") {
					//TODO: Mostrar mensaje de error
					console.log(result);
					return;
				}
				window.location.replace(mapPath + "php/mapGenerator.php?mapName=" + mapName + '&id=' + entityId);
			});
		},
		error : function (error) {
			console.log("Error al crear el mapa: ".error);
		}
	})
}

function checkMapName(text) {
	var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
	var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
	for (var i = 0; i < acentos.length; i++) {
		text = text.replace(acentos.charAt(i), original.charAt(i));
	}
	text = text.split(' ').join('');
	text = text.split('.').join('');
	return text;
}

function saveNewMap(mapName, mapDescription, mapOwner, entityId) {
	return $.ajax({
		url : "./userContent.php",
		data : {
			tag : "saveMap",
			mapName : mapName,
			mapDescription : mapDescription,
			mapOwner : mapOwner,
			entityId : entityId
		},
		method : "POST",
		success : function (response) {
			console.log(response);
		},
		error : function (error) {
			console.log("Error al guardar el mapa:" + error);

		}
	});
}

function deleteMapEventHandler() {
	$(".deleteMaps").click(function () {
		if ($("#table").bootstrapTable('getSelections').length != 0)
			$("#modalDeleteMaps").modal("show");
	})
	mapModalDeleteButtonHandler();
}

function mapModalDeleteButtonHandler() {
	$("#deleteMapsModal").click(function () {
		var mapsId = [];
		$("#table").bootstrapTable('getSelections').forEach(function (row) {
			removeMap(row).then(function (response) {
				mapsId.push(row.id);
				$("#table").bootstrapTable('remove', {
					field : 'id',
					values : mapsId
				});
				$("#modalDeleteMaps").modal("hide");
			})
		})
	})
}

function removeMap(map) {
	return $.ajax({
		url : apiPath + "apiGeoserver.php",
		data : {
			mapName : map.name,
			tag : "removeMap"
		},
		method : "POST",
		success : function (response) {
			if (response == 0)
				console.log("Borrado ->" + map.name)
			else
					console.log(response);
			$.ajax({
				url : "./userContent.php",
				data : {
					tag : "deleteMap",
					mapName : map.name
				},
				method : "POST",
				success : function (response) {
					console.log(response);
				}
			});
		},
		error : function (error) {
			console.log("Error al eliminar el mapa:" + error);
		}

	});
}

function publicateMapEventHandler() {
	$(".publicateMaps").click(function () {
		if ($("#table").bootstrapTable('getSelections').length != 0)
			$("#modalPublicateMaps").modal("show");
	})
	mapModalPublicateButtonHandler();
}

function mapModalPublicateButtonHandler() {
	$("#publicateMapsModal").click(function () {
		$("#table").bootstrapTable('getSelections').forEach(function (row) {
			publicateMap(row.name).then(function (response) {
				$("#modalPublicateMaps").modal("hide");
				if (response == "") {
					row.published = "t";
					$("#table").bootstrapTable('updateRow', {
						index : getMapRowIndexById(row.id),
						row : row
					});
					appendImages();
				} else
					alert("Error: No se pudo publicar el mapa");
			})
		})
	})
}

function publicateMap(mapName) {
	return $.ajax({
		url : apiPath + "apiGeoserver.php",
		data : {
			mapName : mapName,
			tag : "enableWms"
		},
		method : "POST",
		success : function (response) {
			console.log(response);
			if (response == "") {
				$.ajax({
					url : "./userContent.php",
					data : {
						mapName : mapName,
						tag : "publicateMap"
					},
					method : "POST",
					success : function (response) {
						console.log("Mapa " + response + " publicado.");
					},
					error : function (error) {
						console.log("Error al publicar el mapa:" + error);
					}
				});
			} else
				console.log("Error al publicar el mapa:" + response + ".");
		},
		error : function (error) {
			console.log("Error al publicar el mapa:" + error);
		}
	});
}

function unpublicateMapEventHandler() {
	$(".unpublicateMaps").click(function () {
		if ($("#table").bootstrapTable('getSelections').length != 0)
			$("#modalUnpublicateMaps").modal("show");
	})
	mapModalUnpublicateButtonHandler();
}

function mapModalUnpublicateButtonHandler() {
	$("#unpublicateMapsModal").click(function () {
		$("#table").bootstrapTable('getSelections').forEach(function (row) {
			unpublicateMap(row).then(function (response) {
				console.log(response);
				$("#modalUnpublicateMaps").modal("hide");
				if (response == "") {
					row.published = "f";
					$("#table").bootstrapTable('updateRow', {
						index : getMapRowIndexById(row.id),
						row : row
					});
					appendImages();
				} else
					alert("Error: No se pudo despublicar el mapa: " + response);
			})
		})
	})
}

function unpublicateMap(map) {
	return $.ajax({
		url : apiPath + "apiGeoserver.php",
		data : {
			mapName : map.name,
			tag : "disableWms"
		},
		method : "POST",
		success : function (response) {
			if (response == "") {
				$.ajax({
					url : "./userContent.php",
					data : {
						tag : "unpublicateMap",
						mapName : map.name
					},
					method : "POST",
					success : function (response) {
						console.log("Mapa " + response + " despublicado.");
					},
					error : function (error) {
						console.log("Error al despublicar el mapa:" + error);
					}
				});
			} else
				console.log("Error al despublicar el mapa:" + response + ".");
		},
		error : function (error) {
			alert("Error al despublicar el mapa:" + error);
		}
	});
}

function activateWmsMap(mapName, entityId) {
	publicateMap(mapName);
	$(document).ajaxStop(function () {
		window.location.href = mapPath + 'php/mapGenerator.php?mapName=' + mapName + '&id=' + entityId;
	});
}

function getMapRowIndexById(mapId) {
	$("#table").find("tr").each(function (rowIndex, row) {
		if ($(row).find("td")[2] != undefined && $(row).find("td").eq(2).html() == mapId) {
			return ($(row).data("index"));
		}
	})
}

function copyToClipBoard() {
	var client = new ZeroClipboard($('#copyToClipBoard'));
	client.on('ready', function (event) {
		client.on('copy', function (event) {
			event.clipboardData.setData('text/plain', event.target.value);
		});
		client.on('aftercopy', function (event) {});
	});
	client.on('error', function (event) {
		ZeroClipboard.destroy();
	});
}

function getWmsLink(mapName) {
	var headHtml = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>" +
		"<h4 class=\"modal-title\">Link WMS:" + mapName + "</h4>";
	var bodyHtml = "<label for=\"linkWms\">Presione Ctrl+C para copiar</label><textarea rows=\"2\" class=\"form-control\" id=\"linkWms\" style=\"resize:none;\">" + serverGS + "geoserver/" + mapName + "/wms?request=getCapabilities&service=WMS</textarea>";
	$("#modalWmsLink .modal-header").empty().append(headHtml);
	$("#modalWmsLink .modal-body").empty().append(bodyHtml);
	$("#modalWmsLink").modal("show");
}
