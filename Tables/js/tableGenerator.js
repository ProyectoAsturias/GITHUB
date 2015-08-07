var mapNames=[];
var entityParams=[];

$(document).ready(function(){
    $("#userName").append(userName);

    $.ajax({
        type: "POST",
        url : apiPath+"apiLocalgis.php",
        data : {
            tag:"getEntityData",
            entityId:entityId
        },
        success: function (response) {
            //Si no devuelve nada, es de la entidad 0
            entityParams=JSON.parse(response);
            console.log(entityParams);
            clearCookies();
            setCookie("town", entityParams[2],1);
            createMapsTable($("#table"));
            mapsClickEventsHandler();
            createVisorsTable($("#tableVisors"));
            linkToEditVisors();
        },
        error:function(error){
            alert("Error al cargar los parámetros base : "+error);
        }
    });
});

function createTable(target, columns, data){
    target.bootstrapTable({
        columns: columns,
        data: data,
        uniqueId:"id",
        classes: 'table table-hover table-no-bordered'
    });
}

function createMapsTable(target){
    retrieveUserMaps(function(jsonMaps){
        var mapsData = JSON.parse(jsonMaps);
        var columns = [{checkbox: "true"},{field:"image", title: "Imagen"}, {field: "id", title: "ID Mapa", sortable: "true"},{field:"name", title:"Nombre", sortable: "true"},
            {field:"description", title:"Descripción"},{field:"date_update", title:"Última modificación", sortable: "true"}, {field:"date_creation", title:"Fecha creación", sortable: "true"},
            {field: "published", title: "Publicado", sortable: "true", formatter:"publishedFormatter"},{field:"synchronized", title:"Sincronizado", formatter:"synchronizedFormatter"}];   
        if (mapsData){
            mapsData = convertBinaryDataToImages(mapsData);
        }
        createTable(target, columns, mapsData);
		appendImages(mapsData);
    });
}

function createVisorsTable(target){
    retrieveUserVisors(function(jsonVisors){
        var visorsData = JSON.parse(jsonVisors);
        var columns = [{checkbox: "true"}, {field: "id", title: "ID Visor", sortable: "true"},{field:"name", title:"Nombre", sortable: "true"},
            {field:"description", title:"Descripción"},{field:"date_update", title:"Última modificación", sortable: "true"}, {field:"date_creation", title:"Fecha creación", sortable: "true"},
            {title: "Descargar", formatter:"downloadVisorLink"}];
        createTable(target, columns, visorsData);
    });
}

function retrieveUserMaps(callback){
    $.ajax({
        url: "../php/userContent.php",
        data: {
            tag: "userMaps"
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
            tag: "userVisors"
        },
        method: "POST",
        success: function (response) {
            callback(response);
        }
    });
}

function convertBinaryDataToImages(mapsData){
    mapsData.forEach(function (map){
	   map.image="<div id=\""+map.name+"\" class=\"imgMap\"></div>";
       mapNames.push(map.name);
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

function downloadVisorLink(value, row, index){
    return "<a href='../php/downloadVisor.php?visorName="+row.name+"' download=''><span class='glyphicon glyphicon-download'></span></a>";

}

function mapsClickEventsHandler(){
    $('#table').on("sort.bs.table", function(event,name,order){
        appendImages();
    });
    $('#table').on("click-cell.bs.table", function(event,field,value,row){
        if(field=="image"){
            if(row.published=="t")
                window.location.href = mapPath+'php/mapGenerator.php?mapName='+row.name;
            else{
                var html="<button type=\"button\" onclick=\"activateWmsMap('"+row.name+"')\" class=\"btn btn-success\">Publicar y editar</button>"+
                  "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>";
                $("#modalActivateWmsMaps .modal-footer").empty();
                $("#modalActivateWmsMaps .modal-footer").append(html);
                $("#modalActivateWmsMaps").modal("show");
            }
         }
        else if(field=="description"){
            var headHtml ="<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>"+
                        "<h4 class=\"modal-title\">Cambiar descripción del mapa:"+row.name+"</h4>";
            var bodyHtml = "<label for=\"description\">Descripción del Mapa</label>"+
                           "<textarea rows=\"3\" class=\"form-control\" id=\"description\" style=\"resize:none;\">"+row.description+"</textarea>";
            var footerHtml= "<button type=\"button\" id=\"updateDescription\" data-dismiss=\"modal\" onclick=\"updateDescription('"+row.name+"','"+row.id+"')\" class=\"btn btn-success\">Guardar</button>"+
                            "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>";

            $("#modalUpdateDescription .modal-header").empty().append(headHtml);
            $("#modalUpdateDescription .modal-body").empty().append(bodyHtml);  
            $("#modalUpdateDescription .modal-footer").empty().append(footerHtml);
            $("#modalUpdateDescription").modal("show");
        }
    })
}

function linkToEditVisors(){
    $('#tableVisors').on("click-cell.bs.table", function(event,field,value,row){
        if(field=="name"){
            window.location.href = viewPath + "php/generateVisor.php?visorName=" + row.name;
        }
    });
}

function appendImages(){
    if(mapNames){
        mapNames.forEach(function (mapName){
            getImageMap(mapName);   
        });
    }
}

function getImageMap(mapName) {
    var html = "";
    var parser = new ol.format.WMSCapabilities();
    var urlWms = server + 'geoserver/' + mapName + '/wms';
    $.ajax({
        type : "GET",
        dataType : 'text',
        url : urlWms + '?request=getCapabilities&service=wms',
        crossDomain : true,
        success : function (response) {
            var service = parser.read(response);
            if (service.Capability && service.Capability.Layer.Layer) {
                var layersNames = "";
                for (var i = 0; i < service.Capability.Layer.Layer.length - 1; i++) {
                    layersNames += service.Capability.Layer.Layer[i].Name + ",";
                }
                layersNames += service.Capability.Layer.Layer[i].Name;
                var bBox = "" + service.Capability.Layer.BoundingBox[0].extent[0] + "," + service.Capability.Layer.BoundingBox[0].extent[1] + "," + service.Capability.Layer.BoundingBox[0].extent[2] + "," + service.Capability.Layer.BoundingBox[0].extent[3] + "";

            }
            html = "<img class=\"imageMap\" onerror=\"if (this.src != 'error.jpg') this.src = '../../Common/images/noPreview.jpg';\" src='" + urlWms + "?REQUEST=GetMap&service=wms&format=image/jpeg&WIDTH=120&HEIGHT=120&LAYERS=" + layersNames + "&srs=EPSG:4326&bbox=" + bBox + "' />";
            $("#" + mapName + "").empty();
            $("#" + mapName + "").append(html);
        }
    });
}


function updateDescription(mapName,id){
    var mapDescription=$('#description').val();
    $.ajax({
        url: "../php/userContent.php",
        data: {
            tag : "updateDescription",
            mapName : mapName,
            mapDescription: mapDescription,
        },
        method: "POST",
        success: function (response) {
            console.log(response);
            var row=$("#table").bootstrapTable('getRowByUniqueId',""+id+"");
            console.log(row);
            row.description = mapDescription;
            $("#table").bootstrapTable('updateRow', {index: getMapRowIndexById(row.id), row: row});
            appendImages();
            console.log("Descripción de Mapa actualizada.");
        },
        error: function (error){
            console.log("Error al actualizar descripción del mapa:"+error);
        }
    });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
    console.log(document.cookie);
}

function clearCookies(){
    document.cookie = "projection=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "town=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}