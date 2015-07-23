$(document).ready(function(){
    createMapsTable($("#table"));
    createVisorsTable($("#table2"));
    $("#newMap").click(function(){
        $("#modalNewMap").modal("show");
    });
    $("#createMapModal").click(function(){
        $.ajax({
            url: "../"+apiPath+"createEmptyMap.php",
            data:{
                name: $("#modalNewMap .modal-body input").val()
            },
            success: function(response){
                window.location.replace("../../GeneradorDeMapas/php/mapGenerator.php?mapName="+$("#modalNewMap .modal-body input").val());
            }
        })
    })
    $("#newVisor").click(function(){
        $("#modalNewVisor").modal("show");
    });
    $("#createVisorModal").click(function(){
        $.ajax({
            //TEMPORAL
            //url: "../"+apiPath+"createVisor.php",
            url: "../../GeneradorVisores/php/generateVisor.php",
            data:{
                visorName: $("#modalNewVisor .modal-body input").val()
            },
            success: function(response){
                window.location.replace("../../GeneradorVisores/php/generateVisor.php?visorName="+$("#modalNewVisor .modal-body input").val());
            }
        })
    })
});

function createTable(target, columns, data){
    target.bootstrapTable({
        columns: columns,
        data: data,
        classes: 'table table-hover table-no-bordered'
    });
}

function createMapsTable(target){
    retrieveUserMaps(function(jsonMaps){
        var mapsData = JSON.parse(jsonMaps);
        var columns = [{checkbox: "true"},{field:"image", title: ""}, {field: "id", title: "ID Mapa", sortable: "true"},{field:"name", title:"Nombre", sortable: "true"},
            {field:"description", title:"Descripción"},{field:"date_update", title:"Última modificación", sortable: "true"}, {field:"date_creation", title:"Fecha creación", sortable: "true"},
            {field:"synchronized", title:"Sincronizado", formatter:"synchronizedFormatter"}];
        mapsData = convertBinaryDataToImages(mapsData);
        createTable(target, columns, mapsData);
    });
}

function createVisorsTable(target){
    retrieveUserVisors(function(jsonVisors){
        console.log(jsonVisors);
        var visorsData = JSON.parse(jsonVisors);
        var columns = [{checkbox: "true"}, {field: "id", title: "ID Visor", sortable: "true"},{field:"name", title:"Nombre", sortable: "true"},
            {field:"description", title:"Descripción"},{field:"date_update", title:"Última modificación", sortable: "true"}, {field:"date_creation", title:"Fecha creación", sortable: "true"}];
        createTable(target, columns, visorsData);
    });
}

function retrieveUserMaps(callback){
    $.ajax({
        url: "./userContent.php",
        data: {
            "tag": "userMaps"
        },
        method: "POST",
        success: function (response) {
            callback(response);
        }
    });
}

function retrieveUserVisors(callback){
    $.ajax({
        url: "./userContent.php",
        data: {
            "tag": "userVisors"
        },
        method: "POST",
        success: function (response) {
            callback(response);
        }
    });
}

function convertBinaryDataToImages(mapsData){
    mapsData.forEach(function (map){
        map.image = "<img src='../../Common/images/CabeceraLogoAsturias.gif'/>";
    })
    return mapsData;
}

function synchronizedFormatter(value, row, index){
    if (index == 2){
        return "<span class='glyphicon glyphicon-refresh' style='color:green; font-size: 1.2em;'></span>";
    }
    return "<span class='glyphicon glyphicon-refresh' style='color:green; font-size: 1.2em;'></span>";
}