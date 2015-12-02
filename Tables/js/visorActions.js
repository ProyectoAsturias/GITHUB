$(document).ready(function(){
    collapseVisorIconEvent();
    createNewVisorEventsHandler();
    deleteVisorEventHandler();
});

function collapseVisorIconEvent(){
    $("#listVisorsCollapse").click(function(){
        if($("#listVisorsCollapseIcon").attr('class')=="glyphicon glyphicon-collapse-down")
            $("#listVisorsCollapseIcon").attr('class',"glyphicon glyphicon-collapse-up");
        else
            $("#listVisorsCollapseIcon").attr('class',"glyphicon glyphicon-collapse-down");
        if($("#listMapsCollapseIcon").attr('class')=="glyphicon glyphicon-collapse-up")
            $("#listMapsCollapseIcon").attr('class',"glyphicon glyphicon-collapse-down");
    });
}

function createNewVisorEventsHandler(){
    $("#newVisor").click(function(){
        var html="<label for=\"newVisorName\" style=\"margin-top:6px\">Nombre del nuevo Visor</label>"+
                "<input type=\"text\" id=\"newVisorName\" style=\"width:100%; border-radius: 7px; margin-bottom:6px; \"/>"+
                "<label for=\"newVisorName\" style=\"margin-top:6px\">Descripción</label>"+
                "<input type=\"text\" id=\"newVisorDescription\" style=\"width:100%; border-radius: 7px; margin-bottom:6px; \"/>";
        $("#modalNewVisor .modal-body").empty().append(html);
        $("#modalNewVisor").modal("show");
    });
    visorModalSaveButtonHandler();
}

function visorModalSaveButtonHandler() {
    $("#createVisorModal").click(function () {
        var visorName = $("#newVisorName").val();
        var description = $("#newVisorDescription").val();
        saveNewVisor(visorName, description, userName).then(function (result) {
            if (result != "") {
                console.log("Ha ocurrido un error en la Base de Datos.");
                return;
            }
            window.location.replace(viewPath + "php/generateVisor.php?visorName=" + visorName);
        });
    });
}

function saveNewVisor (visorName, visorDescription, visorOwner){
    return $.ajax({
        url: "./userContent.php",
        data: {
            "tag" : "saveVisor",
            "visorName" : visorName,
            "visorDescription" : visorDescription,
            "visorOwner" : visorOwner
        },
        method: "POST",
        success: function (response) {
            console.log(response);
        }
    });
}

function deleteVisorEventHandler(){
    $(".deleteVisors").click(function(){
        deleteSelectedVisors();
    })
}

function deleteSelectedVisors(){
    var visorsId = [];
    $("#tableVisors").bootstrapTable('getSelections').forEach(function (row){
        removeVisor(row).then(function(response){
            visorsId.push(row.id);
            $("#tableVisors").bootstrapTable('remove', {field: 'id', values: visorsId});
        });
    })

}

function removeVisor(visor){
    return $.ajax({
        url: "./userContent.php",
        data: {
            "tag": "deleteVisor",
            "visorName" : visor.name,
        },
        method: "POST",
        success: function(response){
            console.log("Borrado ->" + visor.id)
        }
    });
}

function getViewRowIndexById(viewId){
    $("#tableVisors").find("tr").each(function (rowIndex, row){
        console.log($(row).find("td")[1]);
        if ($(row).find("td")[1] != undefined && $(row).find("td").eq(1).html() == viewId){
            return ($(row).data("index"));
        }
    })
}

function miniImage(viewName) {
        var headHtml = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>" +
                "<h4 class=\"modal-title\">Mini imagen del visor: " + viewName + "</h4>";
        var injectedHtml="<img style='max-height:200px;max-width:200px;' src=\""+server+"visores/"+viewName+"/preview.png\" onclick=\'window.open(\""+server+"Visor/php/visor.php?visorName="+viewName+"\");\'</img>";
        var bodyHtml = "<label for=\"linkWms\">Seleccione el texto y presione Ctrl+C para copiar</label><textarea rows=\"4\" class=\"form-control\" id=\"linkWms\" style=\"resize:none;\">"+injectedHtml+"</textarea></br>";
	bodyHtml=bodyHtml+"<label for=\"linkWms\">Resultado:</label></br><center>"+injectedHtml+"</center></div>";
        $("#modalWmsLink .modal-header").empty().append(headHtml);
        $("#modalWmsLink .modal-body").empty().append(bodyHtml);
        $("#modalWmsLink").modal("show");
        copyToClipBoard();
}
