$(document).ready(function(){
    createNewMapEventsHandler();
    deleteMapEventHandler();
});

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
            url: "../"+apiPath+"createEmptyMap.php",
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
                    window.location.replace("../../GeneradorDeMapas/php/mapGenerator.php?mapName="+mapName);
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
        deleteSelectedMaps();
    })
}

function deleteSelectedMaps(){
    var mapsId = [];
    $("#table").bootstrapTable('getSelections').forEach(function (row){
        removeMap(row).then(function(response){
            mapsId.push(row.id);
            $("#table").bootstrapTable('remove', {field: 'id', values: mapsId});
        });
    })

}

function removeMap(map){
    return $.ajax({
        //url: apiPath + "/delMap.php",
        url: "",
        data: {
            "mapName" : map.name,
            "mapId" : map.id
        },
        method: "POST",
        success: function(response){
            console.log("Borrado ->" + map.id)
        }
    });
}