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
    /*retrieveUserVisors(function(jsonVisors){
        var visorsData = JSON.parse(jsonVisors);
        var columns = [{checkbox: "true"}, {field: "id", title: "ID Visor", sortable: "true"},{field:"name", title:"Nombre", sortable: "true"},
            {field:"description", title:"Descripción"},{field:"date_update", title:"Última modificación", sortable: "true"}, {field:"date_creation", title:"Fecha creación", sortable: "true"}];
        createTable(target, columns, visorsData);
    });*/
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
        var imageMap=getImageMap(map.name);
        map.image=imageMap;
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

function getImageMap(mapName) {
   /* var html="";
    var parser = new ol.format.WMSCapabilities();
    var urlWms = server+'geoserver/'+mapName+'/wms';
    $.ajax({
        type : "GET",
        jsonp : "callback",
        dataType : 'text',
        url : urlWms+'?request=getCapabilities&service=wms',
        crossDomain : true,
        async: false,
        success:function (response) {
            var service = parser.read(response);
            if(service.Capability!=undefined && service.Capability.Layer.Layer!=undefined){
                var layersNames="";
                for(var i=0; i<service.Capability.Layer.Layer.length-1; i++){
                    layersNames +=service.Capability.Layer.Layer[i].Name+",";
                }
                layersNames +=service.Capability.Layer.Layer[i].Name;
                var bBox=""+service.Capability.Layer.BoundingBox[0].extent[0]+","+service.Capability.Layer.BoundingBox[0].extent[1]+","+service.Capability.Layer.BoundingBox[0].extent[2]+","+service.Capability.Layer.BoundingBox[0].extent[3]+"";
                html="<img class=\"imageMap\" src='"+urlWms+"?REQUEST=GetMap&service=wms&format=image%2Fjpeg&WIDTH=120&HEIGHT=120&LAYERS="+layersNames+"&srs=EPSG%3A4326&bbox="+bBox+"' />";
                console.log(layersNames);
                console.log(bBox);
            } 
        }           
    });
    console.log(html);
    return html;*/
}