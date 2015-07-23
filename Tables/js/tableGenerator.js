$(document).ready(function(){
    createMapsTable($("#table"));
    linkToEditMaps();
    createVisorsTable($("#table2"));
});

function createTable(target, columns, data){
    target.bootstrapTable({
        columns: columns,
        data: data,
        classes: 'table table-hover table-no-bordered'
    });
}

function createMapsTable(target){
    console.log(target);
    retrieveUserMaps(function(jsonMaps){
        var mapsData = JSON.parse(jsonMaps);
        var columns = [{checkbox: "true"},{field:"image", title: ""}, {field: "id", title: "ID Mapa", sortable: "true"},{field:"name", title:"Nombre", sortable: "true"},
            {field:"description", title:"Descripción"},{field:"date_update", title:"Última modificación", sortable: "true"}, {field:"date_creation", title:"Fecha creación", sortable: "true"},
            {field: "published", title: "Publicado", sortable: "true", formatter:"publishedFormatter"},{field:"synchronized", title:"Sincronizado", formatter:"synchronizedFormatter"}];
        if (mapsData){
            mapsData = convertBinaryDataToImages(mapsData);
        }
        createTable(target, columns, mapsData);
    });
}

function createVisorsTable(target){
    retrieveUserVisors(function(jsonVisors){
        var visorsData = JSON.parse(jsonVisors);
        var columns = [{checkbox: "true"}, {field: "id", title: "ID Visor", sortable: "true"},{field:"name", title:"Nombre", sortable: "true"},
            {field:"description", title:"Descripción"},{field:"date_update", title:"Última modificación", sortable: "true"}, {field:"date_creation", title:"Fecha creación", sortable: "true"}];
        createTable(target, columns, visorsData);
    });
}

function retrieveUserMaps(callback){
    $.ajax({
        url: "../php/userContent.php",
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
        url: "../php/userContent.php",
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
        map.image = "<img src='../../Common/images/cabeceraLogoAsturias.gif'/>";
    });
    return mapsData;
}

function publishedFormatter(value, row, index){
    if(row.published=="t")
        return "<span class='glyphicon glyphicon-ok-sign' style='color:green;'></span>";
    else
        return "<span class='glyphicon glyphicon-remove-sign' style='color:red;'></span>";
}

function synchronizedFormatter(value, row, index){
    return "<span class='glyphicon glyphicon-refresh' style='color:green; font-size: 1.2em;'></span>";
}

function linkToEditMaps(){
    $("#table").on("click-row.bs.table", function(event, row){
        window.location.href = mapPath+'php/mapGenerator.php?mapName='+row.name;
    })
}
