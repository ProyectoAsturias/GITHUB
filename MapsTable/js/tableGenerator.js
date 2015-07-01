$(document).ready(function(){
    var data = [{
        id: "1",
        image: "<img src='../../GeneradorMapas/images/CabeceraLogoAsturias.gif'/>",
        mapName: "Mapa 1",
        mapDescription: "Primer mapa de prueba",
        fecha_mod: "16/7/2011"
    }, {
        id: "2",
        image: "<img src='../../GeneradorMapas/images/CabeceraLogoAsturias.gif'/>",
        mapName: "Mapa 2",
        mapDescription: "Segundo mapa de prueba, esta descripción es algo más larga para comprobar como se comporta al exportar un PDF.",
        fecha_mod: "16/7/2012"
    },{
        id: "3",
        image: "<img src='../../GeneradorMapas/images/CabeceraLogoAsturias.gif'/>",
        mapName: "Mapa 3",
        mapDescription: "Segundo mapa de prueba, esta descripción es algo más larga para comprobar como se comporta al exportar un PDF.",
        fecha_mod: "16/7/2012"
    },{
        id: "4",
        image: "<img src='../../GeneradorMapas/images/CabeceraLogoAsturias.gif'/>",
        mapName: "Mapa 4",
        mapDescription: "Segundo mapa de prueba, esta descripción es algo más larga para comprobar como se comporta al exportar un PDF.",
        fecha_mod: "16/7/2012"
    }];
    createMapsTable($("#table"), data);
    createMapsTable($("#table2"), data);
    createMapsTable($("#table3"), data);
});

function createTable(target, columns, data){
    target.bootstrapTable({
        columns: columns,
        data: data,
        classes: 'table table-hover table-no-bordered'
    });
}

function createMapsTable(target, data){
    retrieveUserMaps(function(response){
        console.log(response);
    });
    var columns = [{checkbox: "true"},{field:"image", title: ""}, {field: "id", title: "ID Mapa", sortable: "true"},{field:"mapName", title:"Nombre", sortable: "true"} ,{field:"mapDescription", title:"Descripción"},{field:"fecha_mod", title:"Última modificación", sortable: "true"}];
    createTable(target, columns, data);
}

function retrieveUserMaps(callback){
    $.ajax({
        url: "http://localhost:63342/TestTemplatesAsturias/AsturiasWMS/MapsTable/php/userContent.php",
        data: {
            "tag": "userMaps"
        },
        method: "POST",
        success: function (response) {
            callback(response);
        }
    });
}