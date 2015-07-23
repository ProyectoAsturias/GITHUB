$(document).ready(function(){
    collapseMapIconEvent();
    createNewMapEventsHandler();
    deleteMapEventHandler();
    //cloneMapEventHandler();
    publicateMapEventHandler();
    unpublicateMapEventHandler();
});

function collapseMapIconEvent(){
    $("#listMapsCollapse").click(function(){
        if($("#listMapsCollapseIcon").attr('class')=="glyphicon glyphicon-collapse-down")
            $("#listMapsCollapseIcon").attr('class',"glyphicon glyphicon-collapse-up");
        else
            $("#listMapsCollapseIcon").attr('class',"glyphicon glyphicon-collapse-down");

        if($("#listVisorsCollapseIcon").attr('class')=="glyphicon glyphicon-collapse-up")
            $("#listVisorsCollapseIcon").attr('class',"glyphicon glyphicon-collapse-down");
    });
}

function createNewMapEventsHandler(){
    $("#newMap").click(function(){
        $("#modalNewMap").modal("show");
    });
    mapModalSaveButtonHandler();
}

function mapModalSaveButtonHandler(){
    $("#createMapModal").click(function(){
        var mapName = $("#modalNewMap .modal-body input").val();
        $.ajax({
            url: apiPath + "apiGeoserver.php",
            data:{
                mapName: mapName,
                tag: "createMap"
            },
            method: "POST",
            success: function(response){
                if (response == 1){
                    console.log("Ya existe un mapa con ese nombre");
                    return;
                }
                saveNewMap(mapName, "Descripción del mapa", username).then(function(result){
                    if (result != ""){
                        //TODO: Mostrar mensaje de error
                        console.log(result);
                        return;
                    }
                    window.location.replace(mapPath+"php/mapGenerator.php?mapName="+mapName);
                });
            },
			error: function(error) {
				console.log("Error al crear el mapa: ".error);				 
			}
        })
    })
}

function saveNewMap (mapName, mapDescription, mapOwner){
    return $.ajax({
        url: "./userContent.php",
        data: {
            tag : "saveMap",
            mapName : mapName,
            mapDescription : mapDescription,
            mapOwner : mapOwner
        },
        method: "POST",
        success: function (response) {
            console.log(response);
        },
        error: function (error){
            console.log("Error al guardar el mapa:"+error);

        }
    });
}

function deleteMapEventHandler(){
    $(".deleteMaps").click(function(){
        if($("#table").bootstrapTable('getSelections').length!=0)
            $("#modalDeleteMaps").modal("show");
    })
    mapModalDeleteButtonHandler();
}

function mapModalDeleteButtonHandler(){
    $("#deleteMapsModal").click(function(){
        var mapsId=[];
        $("#table").bootstrapTable('getSelections').forEach(function (row){
            removeMap(row).then(function(response){
                mapsId.push(row.id);
                $("#table").bootstrapTable('remove', {field: 'id', values: mapsId});
                $("#modalDeleteMaps").modal("hide");
            })
        })
    })
}

function removeMap(map){
    return $.ajax({
        url: apiPath + "apiGeoserver.php",
        data:{
            mapName: map.name,
            tag: "removeMap"
        },
        method: "POST",
        success: function(response){
            if(response==0)
                console.log("Borrado ->" + map.name)
            else
                console.log(response);
            $.ajax({
                url: "./userContent.php",
                data: {
                    tag : "deleteMap",
                    mapName : map.name
                },
                method: "POST",
                success: function (response) {
                    console.log(response);
                }
            });
        },
        error: function (error){
            console.log("Error al eliminar el mapa:"+error);
        }

    });
}

function publicateMapEventHandler(){
    $(".publicateMaps").click(function(){
        if($("#table").bootstrapTable('getSelections').length!=0)
            $("#modalPublicateMaps").modal("show");
    })
    mapModalPublicateButtonHandler();
}

function mapModalPublicateButtonHandler(){
    $("#publicateMapsModal").click(function(){
        $("#table").bootstrapTable('getSelections').forEach(function (row){
            publicateMap(row).then(function(response){
                $("#modalPublicateMaps").modal("hide");
                row.published = "t";
                $("#table").bootstrapTable('updateRow', {index: getMapRowIndexById(row.id), row: row});
            })
        })
        /*$( document ).ajaxStop(function() {
        	alert("HUE");
  			$("#table").bootstrapTable('refresh');
		});*/
    })
}

function publicateMap(map){
    return $.ajax({
        url: apiPath + "apiGeoserver.php",
        data:{
            mapName: map.name,
            tag: "enableWms"
        },
        method: "POST",
        success: function(response){
            console.log(response);
            if(response==""){  
                $.ajax({
                    url: "./userContent.php",
                    data: {
                        mapName : map.name,
                        tag : "publicateMap"
                    },
                    method: "POST",
                    success: function (response) {
                        console.log("Mapa "+response+" publicado.");
                    },
                    error: function (error){
                        console.log("Error al publicar el mapa:"+error);
                    }
                });
            }
            else
                console.log("Error al publicar el mapa:"+response);
        },
        error: function (error){
            console.log("Error al publicar el mapa:"+error);
        }
    });
}

function unpublicateMapEventHandler(){
    $(".unpublicateMaps").click(function(){
        if($("#table").bootstrapTable('getSelections').length!=0)
            $("#modalUnpublicateMaps").modal("show");
    })
    mapModalUnpublicateButtonHandler();
}

function mapModalUnpublicateButtonHandler(){
    $("#unpublicateMapsModal").click(function(){
        $("#table").bootstrapTable('getSelections').forEach(function (row){
            unpublicateMap(row).then(function(response){
                $("#modalUnpublicateMaps").modal("hide");
                row.published = "f";
                $("#table").bootstrapTable('updateRow', {index: getMapRowIndexById(row.id), row: row});
            })
        })
        /*$( document ).ajaxStop(function() {
        	alert("HUE");
  			$("#table").bootstrapTable('refresh');
		});*/
    })
}

function unpublicateMap(map){
    return $.ajax({
        url: apiPath + "apiGeoserver.php",
        data:{
            mapName: map.name,
            tag: "disableWms"
        },
        method: "POST",
        success: function(response){
            if(response==""){
                $.ajax({
                    url: "./userContent.php",
                    data: {
                        tag : "unpublicateMap",
                        mapName : map.name
                    },
                    method: "POST",
                    success: function (response) {
                        console.log("Mapa "+response+" despublicado.");
                    },
                    error: function (error){
                        console.log("Error al despublicar el mapa:"+error);
                    }
                });
            }
            else
                console.log("Error al despublicar el mapa:"+response);
        },
        error: function (error){
            console.log("Error al despublicar el mapa:"+error);
        }
    });
}

function activateWmsMap(mapName){
	publicateMap(mapName);
	$( document ).ajaxStop(function() {
		console.log("se cambia");
		window.location.href = mapPath+'php/mapGenerator.php?mapName='+mapName;
	});
}

function getMapRowIndexById(mapId){
    $("#table").find("tr").each(function (rowIndex, row){
        if ($(row).find("td")[2] != undefined && $(row).find("td").eq(2).html() == mapId){
            return ($(row).data("index"));
        }
    })
}
