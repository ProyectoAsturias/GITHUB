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
    enabled = true;
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
    map.un("singleclick", retrieveData);
    $(".dataRetrieving").css("border", "");
}

/**
 * Detects click event position and download, for every layer visible, features on it.
 * @method retrieveData
 * @param {} evt
 * @return
 */
function retrieveData(evt) {
    //console.log(evt);
    var overlays=map.getOverlays();
    if (overlays.getArray().length != 0)
        map.removeOverlay(overlays.getArray()[0]);
    layersNames=[];
    $("#retrievedData").html("Cargando...");
    var view = map.getView();
    var viewResolution = view.getResolution();
    var coord= evt.coordinate;
    var popup = $("<div id=\"info\"></div>");
    var overlay = new ol.Overlay({
        element:popup
    });
    map.addOverlay(overlay);
    overlay.setPosition(coord);
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
        //console.log(new ol.format.WFS().readFeatureCollectionMetadata(source));
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
                addDataToBeShown(resultData["features"]);
                for (var h=0; h<resultData.features.length; h++){
                    getAttachedFiles(resultData.features[h].properties.id, layerName).then(function(result){
                        var attachFiles = JSON.parse(result);
                        for (var i=0; i<attachFiles.length; i++){
                            appendAttachedFile(attachFiles[i], layerName);
                        }
                    });
                }
            }
        }});
}

function appendAttachedFile(attachedFile, layerName){
    console.log(layerName);
    var attachHtml = "<div class='fileSquare' title="+attachedFile.nombre+">";
    if (attachedFile.is_imgdoctext == "I"){
        attachHtml += "<img src='../templates/images/image-icon.png'/>"
    }else{
        attachHtml += "<img src='../templates/images/document-icon.png'/>"
    }
    attachHtml += "<div class='fileLink' onclick='downloadAttachedFile(\""+attachedFile.id_documento+"\");return false;'><a href='#'>"+attachedFile.nombre+"</a></div>";
    $("#div"+layerName+" .attachedFiles").append(attachHtml+"</div>");
}

function downloadAttachedFile(fileId){
    var form = $('<form>', {
        "id": "downloadFile",
        "method": "post",
        "html": '<input type="text" id="" name="tag" value="getDocument" /><input type="text" name="idDocument" value="'+fileId+'"/>',
        "action": apiPath + "apiDatabase.php"
    }).appendTo(document.body).submit();
    //$("#downloadFile").remove();
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
            console.log(response);
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
        if(layersNames.indexOf(layerName)==-1){
            //console.log("hola");
            layersNames.push(layerName);
            if(layersNames.length==1){
                $("#layersHeader").append("<li class=\"active\" id=\"layer"+layerName+"\"><a data-toggle=\"pill\" onclick=\"changePills('"+layerName+"')\" ><b>"+layerName+"</b></a>");
                activeFeature=layerName;
                var headTable="<div id='div"+layerName+"' class='tab-pane fade in active'><table id=\"tableLayer"+layerName+"\"><tr>";
            }
            else {
                $("#layersHeader").append("<li id=\"layer"+layerName+"\"><a data-toggle=\"pill\" onclick=\"changePills('"+layerName+"')\"><b>"+layerName+"</b></a>");
                var headTable="<div id='div"+layerName+"' class='tab-pane fade'><table id=\"tableLayer"+layerName+"\"><tr>";
            }
            $.each(feature.properties, function(key, value) {
                headTable +="<th>"+key+"</th>";
            });
            headTable +="</tr></table>";
            headTable +="<div class=attachedFiles><div class='horizontalPrintSeparator' style='width: 100%; margin-top: 5px; margin-bottom: 5px'></div> <h4>Ficheros adjuntos</h4></div>"
            $("#dataTable").append(headTable);
        }
        var bodyTable="<tr>";
        $.each(feature.properties, function(key, value) {
            bodyTable +="<td>"+value+"</td>";
        });
        bodyTable+="</tr>";
        $("#tableLayer"+layerName+"").append(bodyTable);
    });
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