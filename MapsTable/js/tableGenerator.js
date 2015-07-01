$(document).ready(function(){
    createMapsTable($("#table"));
    //createMapsTable($("#table2"), data);
    //createMapsTable($("#table3"), data);
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
            {field:"description", title:"Descripción"},{field:"date_update", title:"Última modificación", sortable: "true"}, {field:"date_creation", title:"Fecha creación", sortable: "true"}];
        mapsData = convertBinaryDataToImages(mapsData);
        createTable(target, columns, mapsData);
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

function convertBinaryDataToImages(mapsData){
    mapsData.forEach(function (map){
        map.image = "<img src='../../GeneradorMapas/images/CabeceraLogoAsturias.gif'/>";
    })
    return mapsData;
}