$(document).ready(function(){
    collapseMapIconEvent();
    createNewMapEventsHandler();
    deleteMapEventHandler();
    publicateMapEventHandler();
    unpublicateMapEventHandler();
    copyToClipBoard();
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
        console.log(userEntityId);
        if(userEntityId==0){
            var html=   "<select id=\"selectConcejo\" class=\"chosen-select\" tabindex=\"1\" ></select>"+
                        "<label for=\"newMapName\" style=\"margin-top:6px\">Nombre del nuevo mapa</label>"+
                        "<input type=\"text\" id=\"newMapName\" style=\"width:100%; border-radius: 7px; margin-bottom:6px; \"/>"+
                        "<label for=\"selectProjection\">Seleccione una proyección</label>"+
                        "<select id=\"selectProjection\" class=\"chosen-select\" tabindex=\"1\" >"+
                            "<option value=\"25829\">UTM-29</option>"+ 
                            "<option value=\"25830\">UTM-30</option>"+
                        "</select>";

            $("#modalNewMap .modal-body").empty().append(html);
            $.ajax({
                url: apiPath + "apiLocalgis.php",
                data:{
                    tag: "getEntityNames"
                },
                method: "POST",
                success: function(response){
                    //console.log(response);
                    var concejos=JSON.parse(response);

                    //console.log(concejos)
                    for(var i=0; i<concejos.length; i++)
                        $("#selectConcejo").append("<option value=\""+concejos[i][1]+"\" >"+concejos[i][0]+"</option>");
                    $('#selectConcejo').prop('selectedIndex', -1);
                    $(".chosen-select").trigger("chosen:updated");
                    $('.chosen-select').chosen({
                        width:"100%",
                        search_contains: true,
                    });
                },
                error:function(response){
                    console.log(response);
                }
            })
            $("#modalNewMap").modal("show");
        }
        else{
            var html="<label for=\"newMapName\" style=\"margin-top:6px\">Nombre del nuevo mapa</label>"+
                        "<input type=\"text\" id=\"newMapName\" style=\"width:100%; border-radius: 7px; margin-bottom:6px; \"/>"+
                        "<label for=\"selectProjection\">Seleccione una proyección</label>"+
                        "<select id=\"selectProjection\" class=\"chosen-select\" tabindex=\"1\" >"+
                            "<option value=\"25829\">UTM-29</option>"+ 
                            "<option value=\"25830\">UTM-30</option>"+
                        "</select>";
            $("#modalNewMap .modal-body").empty().append(html);
            $('.chosen-select').chosen({
                width:"100%",
                search_contains: true,
            }); 
            $("#modalNewMap").modal("show");
        }
    });
    mapModalSaveButtonHandler();
}

function mapModalSaveButtonHandler(){
    $("#createMapModal").click(function(){
        console.log(entityParams);
        var mapName = $("#newMapName").val();
        var projection=$("#selectProjection").val();
        var town=entityParams[2];
        var entityId;
        
        if($("#selectConcejo").val()==null){
            mapName="Asturias"+mapName; 
            entityId=0;
        }
        else{
            mapName=$("#selectConcejo option:selected").text()+mapName;
            entityId =$("#selectConcejo").val();
        }
        mapName=checkMapName(mapName);

        console.log(entityId);

        $.ajax({
            type: "POST",
            url : apiPath+"apiLocalgis.php",
            data : {
                tag:"getEntityData",
                entityId:entityId
            },
            success: function (response) {
                entityParams=JSON.parse(response);
                console.log(entityParams);

                var projection= $("#selectProjection").val();
                $.ajax({
                    url: apiPath + "apiGeoserver.php",
                    data:{
                        mapName: mapName,
                        projection: projection,
                        town: town,
                        tag: "createMap"
                    },
                    method: "POST",
                    success: function(response){
                        console.log(response);
                        if (response == 1){
                            console.log("Ya existe un mapa con ese nombre");
                            return;
                        }
                        saveNewMap(mapName, "Descripción del mapa", userName, entityId).then(function(result){
                            console.log(result);
                            if (result != ""){
                                //TODO: Mostrar mensaje de error
                                console.log(result);
                                return;
                            }
                            window.location.replace(mapPath+"php/mapGenerator.php?mapName="+mapName+'&id='+entityId);
                        });
                    },
                    error: function(error) {
                        console.log("Error al crear el mapa: ".error);               
                    }
                })
            },
            error:function(error){
                alert("Error al cargar los parámetros base : "+error);
            }
        });
    })
}

function checkMapName(text){
        var acentos  = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
        var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
        for (var i=0; i<acentos.length; i++) {
            text = text.replace(acentos.charAt(i), original.charAt(i));
        }
        text=text.split(' ').join('');
        text=text.split('.').join('');
        return text;
}

function saveNewMap (mapName, mapDescription, mapOwner, entityId){
    return $.ajax({
        url: "./userContent.php",
        data: {
            tag : "saveMap",
            mapName : mapName,
            mapDescription : mapDescription,
            mapOwner : mapOwner,
            entityId: entityId
        },
        method: "POST",
        success: function (response) {
            console.log(response);
        },
        error: function (error){
            console.log("Error al guardar el mapa:"+error);

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
        url: apiPath + "apiGeoserver.php",
        data:{
            mapName: map.name,
            tag: "removeMap"
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
                    tag : "deleteMap",
                    mapName : map.name
                },
                method: "POST",
                success: function (response) {
                    console.log(response);
                }
            });
        },
        error: function (error){
            console.log("Error al eliminar el mapa:"+error);
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
                $("#modalPublicateMaps").modal("hide");
                if(response=="\n"){  
                    row.published = "t";
                    $("#table").bootstrapTable('updateRow', {index: getMapRowIndexById(row.id), row: row});
                    appendImages();
                }
                else
                    alert("Error: No se pudo publicar el mapa");
            })
        })
    })
}

function publicateMap(map){
    return $.ajax({
        url: apiPath + "apiGeoserver.php",
        data:{
            mapName: map.name,
            tag: "enableWms"
        },
        method: "POST",
        success: function(response){
            console.log(response);
            if(response=="\n"){  
                $.ajax({
                    url: "./userContent.php",
                    data: {
                        mapName : map.name,
                        tag : "publicateMap"
                    },
                    method: "POST",
                    success: function (response) {
                        console.log("Mapa "+response+" publicado.");
                    },
                    error: function (error){
                        console.log("Error al publicar el mapa:"+error);
                    }
                });
            }
            else
                console.log("Error al publicar el mapa:"+response+".");
        },
        error: function (error){
            console.log("Error al publicar el mapa:"+error);
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
                if(response="\n"){
                    row.published = "f";
                    $("#table").bootstrapTable('updateRow', {index: getMapRowIndexById(row.id), row: row});
                    appendImages();
                }
                else
                    alert("Error: No se pudo despublicar el mapa");
            })
        })
    })
}

function unpublicateMap(map){
    return $.ajax({
        url: apiPath + "apiGeoserver.php",
        data:{
            mapName: map.name,
            tag: "disableWms"
        },
        method: "POST",
        success: function(response){
            if(response=="\n"){
                $.ajax({
                    url: "./userContent.php",
                    data: {
                        tag : "unpublicateMap",
                        mapName : map.name
                    },
                    method: "POST",
                    success: function (response) {
                        console.log("Mapa "+response+" despublicado.");
                    },
                    error: function (error){
                        console.log("Error al despublicar el mapa:"+error);
                    }
                });
            }
            else
                console.log("Error al despublicar el mapa:"+response+".");
        },
        error: function (error){
            console.log("Error al despublicar el mapa:"+error);
        }
    });
}

function activateWmsMap(mapName,entityId){
	publicateMap(mapName);
	$( document ).ajaxStop(function() {
		//console.log("se cambia");
		window.location.href = mapPath+'php/mapGenerator.php?mapName='+mapName+'&id='+entityId;
	});
}

function getMapRowIndexById(mapId){
    $("#table").find("tr").each(function (rowIndex, row){
        if ($(row).find("td")[2] != undefined && $(row).find("td").eq(2).html() == mapId){
            return ($(row).data("index"));
        }
    })
}

function copyToClipBoard(){
    var client = new ZeroClipboard( $('#copyToClipBoard') );
    client.on( 'ready', function(event) {
        // console.log( 'movie is loaded' );

        client.on( 'copy', function(event) {
            event.clipboardData.setData('text/plain', event.target.value);
        });

        client.on( 'aftercopy', function(event) {
            //console.log('Copied text to clipboard: ' + event.data['text/plain']);
        });
    });

    client.on( 'error', function(event) {
        //console.log( 'ZeroClipboard error of type "' + event.name + '": ' + event.message );
        ZeroClipboard.destroy();
    });
}

function getWmsLink(mapName){
    var headHtml ="<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>"+
                "<h4 class=\"modal-title\">Link WMS:"+mapName+"</h4>";
    var bodyHtml = "<textarea rows=\"2\" class=\"form-control\" id=\"linkWms\" style=\"resize:none;\">"+server+"geoserver/"+mapName+"/wms?request=getCapabilities&service=WMS</textarea>";
    $("#modalWmsLink .modal-header").empty().append(headHtml);
    $("#modalWmsLink .modal-body").empty().append(bodyHtml);
    $("#modalWmsLink").modal("show");
}
