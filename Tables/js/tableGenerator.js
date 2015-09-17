var mapNames=[];
var entityParams=[];//id,nombre,proyección y town de la entidad base del usuario

$(document).ready(function(){
    $("#userName").append(userName);
    console.log(userEntityId);
    if(userEntityId==0){
	entityParams.push("PAsturias");
        entityParams.push("0");
        entityParams.push("25830");
	/*mun=[];
	mun.push(33001);
        entityParams.push(mun);*/
	startTables();
    }
    else{
    	$.ajax({
            type: "POST",
            url : apiPath+"apiLocalgis.php",
            data : {
                tag:"getEntityData",
                entityId:userEntityId
            },
            success: function (response) {
                //console.log(response);
                //Si no devuelve nada, es generico
                entityParams=JSON.parse(response);
                startTables();
            },
            error:function(error){
            	alert("Error al cargar los parámetros base : "+error);
            }
	});
    }
});

function startTables(){
	createMapsTable($("#table"));
        mapsClickEventsHandler();
        createVisorsTable($("#tableVisors"));
        //linkToEditVisors();
        console.log(entityParams);
}


function createTable(target, columns, data){
    target.bootstrapTable({
        columns: columns,
        data: data,
        uniqueId:"id",
        classes: 'table table-hover table-no-bordered'
    });
}

function createMapsTable(target){
    //console.log(entityParams[0]);
    retrieveUserMaps(function(jsonMaps){
	//console.log(jsonMaps);
        var mapsData = JSON.parse(jsonMaps);
        var columns = [{checkbox: "true"},
		{field:"image", title: "Imagen"}, 
		{field: "id", title: "ID Mapa", sortable: "true"},
		{field:"name", title:"Nombre", sortable: "true"},
        {field:"description", title:"Descripción", titleTooltip:"click para editar descripción"},
		{field:"date_update", title:"Última modificación", sortable: "true"},
		{field:"date_creation", title:"Fecha creación", sortable: "true"},
        {field: "WMS", title: "WMS", formatter:"WmsFormatter"},
        {field: "published", title: "Publicado", sortable: "true", formatter:"publishedFormatter"},
        {field:"synchronized", title:"Sincronizado", formatter:"synchronizedFormatter"},
        {field:"entityId", title: "Id entidad", visible:false}];
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
        var columns = [{checkbox: "true"}, 
	    {field: "id", title: "ID Visor", sortable: "true"},
	    {field:"name", title:"Nombre", sortable: "true"},
            {field:"description", title:"Descripción"},
	    {field:"date_update", title:"Última modificación", sortable: "true"}, 
	    {field:"date_creation", title:"Fecha creación", sortable: "true"},
            {field:"editVisor", title:"Editar Visor",formatter:"formatterEditVisor"},
	    {field:"Visor", title:"Visor", formatter:"FormatterAccessToVisor"},
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
	   map.image="<div id=\""+map.name+"\" class=\"imgMap\" title=\"Haga click en la imagen para editar el mapa\"></div>";
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

function WmsFormatter(value, row, index){
    return "<button class='btn btn-success btn-block' title=\"Obtener link Wms\" onclick=\"getWmsLink('"+row.name+"')\">Link WMS</button>";
}

function synchronizedFormatter(value, row, index){
    return "<span class='glyphicon glyphicon-refresh' style='color:green; font-size: 1.2em;'></span>";
}

function formatterEditVisor(value, row, index){
    return "<button class='btn btn-success btn-block' onclick=\"editVisor('"+row.name+"')\">Editar Visor</button>";
}

function FormatterAccessToVisor(value, row, index){
    return "<button class='btn btn-success btn-block' onclick=\"accessVisor('"+row.name+"')\">Visor</button>";
}

function downloadVisorLink(value, row, index){
    return "<a href='../php/downloadVisor.php?visorName="+row.name+"' download=''><span class='glyphicon glyphicon-download'></span></a>";
}

function mapsClickEventsHandler(){
    $('#table').on("sort.bs.table", function(event,name,order){
        appendImages();
    });
    $('#table').on("search.bs.table", function(){
        appendImages();
    });    
    $('#table').on("click-cell.bs.table", function(event,field,value,row){
        if(field=="image"){
            if(row.published=="t")
                window.location.href = mapPath+'php/mapGenerator.php?mapName='+row.name+'&id='+row.entityId;
            else{
                var html="<button type=\"button\" onclick=\"activateWmsMap('"+row.name+"','"+row.entityId+"')\" class=\"btn btn-success\">Publicar y editar</button>"+
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

function accessVisor(viewName){
    window.location.href = installationPath + "Visor/php/visor.php?visorName=" + viewName;
}

function editVisor(viewName){
    window.location.href = viewPath + "php/generateVisor.php?visorName=" + viewName;
}

/*function linkToEditVisors(){
    $('#tableVisors').on("click-cell.bs.table", function(event,field,value,row){
        if(field=="name"){
            window.location.href = viewPath + "php/generateVisor.php?visorName=" + row.name;
        }
    });
}*/

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
            html = "<img class=\"imageMap\" onerror=\"if (this.src != 'error.jpg') this.src = '../../Common/images/noPreview.jpg';\" alt=\"Vista previa no disponible\" src='" + urlWms + "?REQUEST=GetMap&service=wms&format=image/jpeg&WIDTH=120&HEIGHT=120&LAYERS=" + layersNames + "&srs=EPSG:4326&bbox=" + bBox + "' />";
            $("#" + mapName + "").empty();
            $("#" + mapName + "").append(html);
        },
        error: function(error) {
            html = "<img class=\"imageMap\" src = '../../Common/images/noPreview.jpg';\" />";
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
            //console.log(row);
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
            //console.log(row);
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
