function getReportEiel(layerName, chosenTemplate, townId, featureId){
    var win = window.open(server+"EIEL/php/getReportEiel.php?tag=generateEielReport&layerName="+layerName+"&template="+encodeURIComponent(chosenTemplate)+"&townId="+townId+"&featureId="+featureId,
        '_blank');
    win.focus();
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
            //console.log(templatesFound);
            if (templatesFound != "false"){
                appendEielLink(layerName, featureId, townId, JSON.parse(templatesFound));
            }
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
            if ($(this).find("#"+layerName+featureId+featureTown).length != 0) return;
            $(this).append("<td><a id="+layerName+featureId+featureTown+">"+"Generar informe"+"</a></td>");
            $(this).find("#"+layerName+featureId+featureTown).each(function (){
                $(this).on("click",function (){
                    deployEielModalWindow(layerName, featureId, featureTown, templates);
                });
            })
        }
    })
}

function deployEielModalWindow(layerName, featureId, featureTown, templates) {
    $("#eielModal .modal-content .modal-header h4").html("Generar Informe: Capa '" + layerName+"'");
    $("#eielInfo").remove();
    $("#eielModal .modal-content .modal-header").append("<div id=\"eielInfo\"> Id Elemento: " + featureId + " | Id Municipio: " + featureTown + "</div>");
    $("#eielModal #templateSelect").empty();
    for (var i = 0; i < templates.length; i++) {
        $("#eielModal #templateSelect").append("<option value=" + templates[i][1] + ">" + templates[i][0] + "</option>");
    }
    $("#eielModal .modal-footer #downloadReportEIEL").off("click");
    $("#eielModal .modal-footer").empty();
    $("#eielModal .modal-footer").append('<button id="downloadReportEIEL" type="button" class="btn btn-success">Descargar</button>');
    $("#eielModal .modal-footer #downloadReportEIEL").on("click", function () {
        getReportEiel(layerName, $("#eielModal #templateSelect").find(":selected").val(), featureId, featureTown);
    })
    $("#eielModal .modal-footer").append('<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>')
    $("#eielModal").modal("show");
}
