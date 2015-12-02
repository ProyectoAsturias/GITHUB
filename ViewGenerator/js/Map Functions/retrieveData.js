var enabled = false;
var layersNames=[];
var activeFeature;
var layersLength;
var layersCounter;

$(document).ready(function(){
    RetrieveEventHandler();
});

/**
 * Adds event handler and JQuery data attribute on this button.
 * @method eventHandler
 * @return
 */
function RetrieveEventHandler() {
    $(".dataRetrieving").click(function () {
        toggleDataRetrieving();
        generateJSONLayers();
    });
}

/**
 * Switch between enable/disable on this tool.
 * @method toggleDataRetrieving
 * @return
 */
function toggleDataRetrieving(){
    enabled ? disableDataRetrieving() : enableDataRetrieving();
}
/**
 * Enables this tool.
 * @method enableDataRetrieving
 * @return
 */
function enableDataRetrieving() {
    var featuresSelected=[];
    if(select){
        map.getInteractions().forEach(function (interaction) {
            if(interaction instanceof ol.interaction.Select) {
                featuresSelected=interaction.getFeatures().getArray();
            }
        });
        showDataFromFeatures(featuresSelected);
        return;
    }
    enabled = true;
    /*activeVisibleFeatures();
    var seleccion = new ol.interaction.Select ({
        toggleCondition: ol.events.condition.never,
        multi:true
    });
    map.addInteraction(seleccion);*/
    map.on('singleclick', retrieveData);
    $(".dataRetrieving").css("border", "solid 3px green");
    $(".dataRetrieving").css("border-radius", "19px");
}

/**
 * Disables this tool.
 * @method disableDataRetrieving
 * @return
 */
function disableDataRetrieving(){
    enabled = false;
    $("#info").empty();
    map.un("singleclick", retrieveData);
    $(".dataRetrieving").css("border", "");
    /*map.getInteractions().forEach(function (interaction) {
        if(interaction instanceof ol.interaction.Select) {
            interaction.getFeatures().clear();
            interaction.un('select', function(e) {
                addselectedFeatures(e.selected);
                removeUnselectedFeatures(e.deselected);
            });
            map.removeInteraction(interaction)
        }
    });*/
}

/**
 * Detects click event position and download, for every layer visible, features on it.
 * @method retrieveData
 * @param {} evt
 * @return
 */
function retrieveData(evt) {
    var overlays=map.getOverlays();
    if (overlays.getArray().length != 0)
        map.removeOverlay(overlays.getArray()[0]);
    layersNames=[];
    $("#retrievedData").html("Cargando...");
    var view = map.getView();
    var viewResolution = view.getResolution();
    var coord= evt.coordinate;
    $('#mapContainer').append("<div id=\"info\"></div>");
    /*var overlay = new ol.Overlay({
        element:popup
    });
    map.addOverlay(overlay);
    overlay.setPosition(coord);*/
    $("#info").empty();
    $("#info").append("<ul class=\"menu5 nav nav-pills\"  id=\"layersHeader\" ><div><button type=\"button\" onclick='closeInfoWindow()' class=\"close\">&times;</button></div></ul><div id=\"dataTable\" class=\"tab-content\"></div>");

    var mapLayers = map.getLayers();
    if(mapLayers.getArray()[0].base)
        layersCounter=1;
    else
        layersCounter=0;
    layersLength=mapLayers.getLength();
    
    for (var i = 0; i<mapLayers.getLength(); i++){
        if (!mapLayers.item(i).get("visible")) continue;

        var source = mapLayers.item(i).getSource();
        if (!(source instanceof ol.source.TileWMS)) continue;
        var url = source.getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, view.getProjection(),
            {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50});
        if (url) getDataFromURL(url, mapLayers.item(i).name);
    }
}

/**
 * Starts an AJAX request to the specified URL.
 * @method getDataFromURL
 * @param {} url
 * @return
 */
function getDataFromURL(url, layerName) {
    $.ajax({url: url,
        success: function(resultData){
            if (resultData.features.length != 0){
                addDataToBeShown(resultData["features"]);}
        }
    });
}

function appendAttachedFile(featureId, attachedFile, layerName){
    var headerFound= false;
    $("#tableLayer"+layerName+" thead tr").each(function (tableElement){
        $(this).find("th").each(function (index, tablehead){
            if ($(tablehead).text() == "Ficheros adjuntos"){
                headerFound = true;
            }
        })
        if (!headerFound){
            $("#tableLayer"+layerName+" thead tr").append("<th>Ficheros adjuntos</th>");
            headerFound = true;
        }
    });
    $("#tableLayer"+layerName+" tbody tr").each(function (tableElement){
        if ($(this).find("td:first-child").text() == featureId ){
            if($(this).find(".tableAttachedElement").length == 0){
                $(this).append("<td class=\"tableAttachedElement\">"+"<div class='fileLink' onclick='downloadAttachedFile(\""+attachedFile.id_documento+"\");return false;'><a href='#'>"+attachedFile.nombre+"</a></div>"+"</td>");
            }else{
                if ($(this).find(".tableAttachedElement").html() == "-"){
                    $(this).find(".tableAttachedElement").html("<div class='fileLink' onclick='downloadAttachedFile(\""+attachedFile.id_documento+"\");return false;'><a href='#'>"+attachedFile.nombre+"</a></div>");
                }else{
                    $(this).find(".tableAttachedElement").append("<div class='fileLink' onclick='downloadAttachedFile(\""+attachedFile.id_documento+"\");return false;'><a href='#'>"+attachedFile.nombre+"</a></div>");
                }

            }
        }else{
            if (headerFound){
                if($(this).find(".tableAttachedElement").length == 0){
                    $(this).append("<td class=\"tableAttachedElement\">"+"-"+"</td>");
                }
            }
        }
    })
}

function downloadAttachedFile(fileId){
    var form = $('<form>', {
        "id": "downloadFile",
        "method": "post",
        "html": '<input type="text" id="" name="tag" value="getDocument" /><input type="text" name="idDocument" value="'+fileId+'"/>',
        "action": apiPath + "apiDatabase.php"
    }).appendTo(document.body).submit();
    $("#downloadFile").remove();
}

function getAttachedFiles(idFeature, layerName){
    var pv = true;
    if(un != ""){
        pv = false;
    }
    return $.ajax({
        type : "POST",
        url : apiPath + "apiDatabase.php",
        data : {
            tag : "getAttachDocuments",
            nameLayer: layerName,
            idFeature: idFeature,
            private: pv
        },
        success : function (response) {
            var attachFiles = JSON.parse(response);
            if (attachFiles.length > 0){
                //$("#div"+layerName+" .attachedFiles").append("<div class='horizontalPrintSeparator' style='width: 100%; margin-top: 5px; margin-bottom: 5px'></div> <h4>Ficheros adjuntos</h4>");
            }
            for (var i=0; i<attachFiles.length; i++){
                appendAttachedFile(idFeature, attachFiles[i], layerName);
            }
        },
        error : function (error) {

        }

    });
}


/**
 * Add features downloaded data to be shown.
 * @method addDataToBeShown
 * @param {} features
 * @return
 */

function addDataToBeShown(features){
    if (features==""){
        layersCounter++;
        if(layersCounter==layersLength)
            $("#info").empty();
        return;
    }
    features.forEach(function (feature){
        var layerName=feature.id.split(".")[0];
        layerName=layerName.replace(/ /g,"_");
        getAttachedFiles(feature.properties.id, layerName);
        getEielTemplates(layerName, feature.properties.id, feature.properties.id_municipio);
        if(layersNames.indexOf(layerName)==-1){
            layersNames.push(layerName);
            if(layersNames.length==1){
                $("#layersHeader").append("<li class=\"active\" id=\"layer"+layerName+"\"><a data-toggle=\"pill\" onclick=\"changePills('"+layerName+"')\" ><b>"+layerName+"</b></a>");
                activeFeature=layerName;
                var headTable="<div id='div"+layerName+"' class='layerTab tab-pane fade in active'><table id=\"tableLayer"+layerName+"\"><thead><tr>";
            }
            else {
                $("#layersHeader").append("<li id=\"layer"+layerName+"\"><a data-toggle=\"pill\" onclick=\"changePills('"+layerName+"')\"><b>"+layerName+"</b></a>");
                var headTable="<div id='div"+layerName+"' class='layerTab tab-pane fade'><table id=\"tableLayer"+layerName+"\"><thead><tr>";
            }
            $.each(feature.properties, function(key, value) {
                headTable +="<th>"+key+"</th>";
            });
            headTable +="</tr></thead><tbody></tbody></table>";
            headTable +="<div class=attachedFiles></div>"
            $("#dataTable").append(headTable);
        }
        var bodyTable="<tr>";
        $.each(feature.properties, function(key, value) {
            if (value == null) value = "-";
            bodyTable +="<td>"+value+"</td>";
        });
        bodyTable+="</tr>";
        $("#tableLayer"+layerName+" tbody").append(bodyTable);
    });
    makeInfoWIndowDraggable();
}

function changePills(layerName){
    $("#layer"+activeFeature).removeClass("active");
    $("#layer"+layerName).addClass("active");
    $("#div"+activeFeature).removeClass("active in");
    $("#div"+layerName).addClass("active in");
    activeFeature=layerName;
}

function closeInfoWindow(){
    $("#info").empty();
}


function showDataFromFeatures(features){

    $("#info").empty();
    $("#info").append("<ul class=\"menu5 nav nav-pills\"  id=\"layersHeader\" ><div><button type=\"button\" onclick='closeInfoWindow()' class=\"close\">&times;</button></div></ul><div id=\"dataTable\" class=\"tab-content\"></div>");

    layersNames=[];
    for(i=0;i<features.length;i++){
        var layerName=features[i].getId().split(".fid")[0];
        if(layersNames.indexOf(layerName)==-1){
            layersNames.push(layerName);
            if(layersNames.length==1){
                $("#layersHeader").append("<li class=\"active\" id=\"layer"+layerName+"\"><a data-toggle=\"pill\" onclick=\"changePills('"+layerName+"')\" ><b>"+layerName+"</b></a>");
                activeFeature=layerName;
                var headTable="<div id='div"+layerName+"' class='tab-pane fade in active'><table id=\"tableLayer"+layerName+"\"><thead>";
            }
            else {
                $("#layersHeader").append("<li id=\"layer"+layerName+"\"><a data-toggle=\"pill\" onclick=\"changePills('"+layerName+"')\"><b>"+layerName+"</b></a>");
                var headTable="<div id='div"+layerName+"' class='tab-pane fade'><table id=\"tableLayer"+layerName+"\"><thead>";
            }
            $.each(features[i].getProperties(), function(key, value) {
                if(key!="geometry")
                    headTable +="<th>"+key+"</th>";
            });
            headTable +="</thead></table>";
            $("#dataTable").append(headTable);
        }
        var bodyTable="<tbody><tr>";
        $.each(features[i].getProperties(), function(key, value) {
            if(key!="geometry")
                bodyTable +="<td>"+value+"</td>";
        });
        bodyTable+="</tr></tbody>";
        $("#tableLayer"+layerName+"").append(bodyTable);
        getAttachedFiles(features[i].getProperties().id, layerName);
        getEielTemplates(layerName, features[i].getProperties().id, features[i].getProperties().id_municipio);
    }
}
