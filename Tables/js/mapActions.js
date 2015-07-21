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
            url: apiPath+"createMap.php",
            data:{
                mapName: mapName
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
            "tag" : "saveMap",
            "mapName" : mapName,
            "mapDescription" : mapDescription,
            "mapOwner" : mapOwner
        },
        method: "POST",
        success: function (response) {
            console.log(response);
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
        url: apiPath + "removeMap.php",
        data: {
            "mapName" : map.name
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
                    "tag" : "deleteMap",
                    "mapName" : map.name
                },
                method: "POST",
                success: function (response) {
                    console.log(response);
                }
            });
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
                row.published = "t";
                $("#modalPublicateMaps").modal("hide");
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
        url: apiPath + "enableWms.php",
        data: {
            "mapName" : map.name
        },
        method: "POST",
        success: function(response){
            if(response==0)
                console.log("Publicado ->" + map.name)
            else
                console.log();
            $.ajax({
                url: "./userContent.php",
                data: {
                    "tag" : "publicateMap",
                    "mapName" : map.name
                },
                method: "POST",
                success: function (response) {
                    console.log(response);
                }
            });
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
                row.published = "f";
                $("#modalUnpublicateMaps").modal("hide");
                $("#table").bootstrapTable('updateRow', {index: getMapRowIndexById(row.id), row: row});
            })
        })
    })
}

function unpublicateMap(map){
    return $.ajax({
        url: apiPath + "disableWms.php",
        data: {
            "mapName" : map.name
        },
        method: "POST",
        success: function(response){
            if(response=="")
                console.log("Despublicado ->" + map.name)
            else
                console.log();
            $.ajax({
                url: "./userContent.php",
                data: {
                    "tag" : "unpublicateMap",
                    "mapName" : map.name
                },
                method: "POST",
                success: function (response) {
                    console.log(response);
                }
            });
        }
    });
}

function getMapRowIndexById(mapId){
    $("#table").find("tr").each(function (rowIndex, row){
        if ($(row).find("td")[2] != undefined && $(row).find("td").eq(2).html() == mapId){
            return ($(row).data("index"));
        }
    })
}