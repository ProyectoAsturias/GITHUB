//getReportEiel();
getLayerCategory();
getEielTemplates();
function getReportEiel(){
    $.ajax({
        type : "POST",
        url : server+"EIEL/php/getReportEiel.php",
        data : {
            tag : "getEielTemplates"
        },
        success : function (projectionResponse) {
            console.log(projectionResponse);
        },
        error : function (error){

        }
    });
}

function getEielTemplates(layerName, featureId, townId){
    return $.ajax({
        type : "POST",
        url : server+"EIEL/php/getReportEiel.php",
        data : {
            tag : "getEielTemplates",
            layerName: layerName,
            featureId: featureId,
            townId: townId
        },
        success : function (templatesFound) {
		console.log(templatesFound);
            if (templatesFound != ""){
                appendEielLink(layerName, featureId, townId, JSON.parse(templatesFound));
            }
        },
        error : function (error){

        }
    });
}

function getLayerCategory(layerName){
    return $.ajax({
        type : "POST",
        url : server+"EIEL/php/getReportEiel.php",
        data : {
            tag : "getLayerCategory",
            layerName: layerName
        },
        success : function (category) {
            console.log(category);
        },
        error : function (error){

        }
    });
}


function appendEielLink(layerName, featureId, featureTown, templates){
    $("#tableLayer"+layerName+" thead tr").each(function (tableElement){
        var headerFound= false;
        $(this).find("th").each(function (index, tablehead){
            if ($(tablehead).text() == "Informe EIEL"){
                headerFound = true;
            }
        })
        if (!headerFound){
            $("#tableLayer"+layerName+" thead tr").append("<th>Informe EIEL</th>");
        }
    });
    $("#tableLayer"+layerName+" tbody tr").each(function (index, tableElement){
        if ($(this).find("td:first-child").text() == featureId ){
            $(this).append("<td><a>"+"Generar informe"+"</a></td>").on("click",function (){
                deployEielModalWindow(layerName, featureId, featureTown, templates);
            });
        }
    })
}

function deployEielModalWindow(layerName, featureId, featureTown, templates){
    console.log(templates);
    console.log("Vamos");
    $("#eielModal .modal-content .modal-header h4").html("Generar Informe: Capa" + layerName);
    $("#eielModal #templateSelect").empty();
    for (var i=0; i<templates.length; i++){
        $("#eielModal #templateSelect").append("<option value="+templates[i][1]+">"+templates[i][0]+"</option>");
    }
    $("#eielModal .modal-footer").empty();
    $("#eielModal .modal-footer").append('<button type="button" class="btn btn-success">Descargar</button>').on("click",function(){
        console.log($("#eielModal #templateSelect").find(":selected"));
    })
    $("#eielModal .modal-footer").append('<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>')
    $("#eielModal").modal("show");
}
