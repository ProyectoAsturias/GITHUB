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
            publicateMap(row.name).then(function(response){
                $("#modalPublicateMaps").modal("hide");
            })
        })
    })
}

function publicateMap(mapName){
    return $.ajax({
        url: apiPath + "enableWms.php",
        data: {
            "mapName" : mapName
        },
        method: "POST",
        success: function(response){
            if(response==0)
                console.log("Publicado ->" + mapName)
            else
                console.log(response);
            $.ajax({
                url: "./userContent.php",
                data: {
                    "tag" : "publicateMap",
                    "mapName" : mapName
                },
                method: "POST",
                success: function (response) {
                    console.log(response);
                    createMapsTable($("#table"));
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
                $("#modalUnpublicateMaps").modal("hide");
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
            console.log(response);
            if(response=="")
                console.log("Despublicado ->" + map.name)
            else
                console.log(response);
            $.ajax({
                url: "./userContent.php",
                data: {
                    "tag" : "unpublicateMap",
                    "mapName" : map.name
                },
                method: "POST",
                success: function (response) {
                    console.log(response);
                    createMapsTable($("#table"));
                }
            });
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
