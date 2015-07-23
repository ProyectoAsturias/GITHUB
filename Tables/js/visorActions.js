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
        $("#modalNewVisor").modal("show");
    });
    visorModalSaveButtonHandler();
}

function visorModalSaveButtonHandler(){
    $("#createVisorModal").click(function(){
        var visorName = $("#modalNewVisor .modal-body input").val();
        /*$.ajax({
            url: "../"+apiPath+"createEmptyMap.php",
            data:{
                name: visorName
            },
            success: function(response){
                saveNewVisor(visorName, "Descripción del visor", username).then(function(result){
                    if (result != ""){
                        console.log("Ha ocurrido un error en la Base de Datos.");
                        return;
                    }
                    //window.location.replace(viewPath+"php/mapGenerator.php?mapName="+$("#modalNewVisor .modal-body input").val());
                });
            }
        })*/
    })
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
    $(".deletevisors").click(function(){
        deleteSelectedVisors();
    })
}

function deleteSelectedVisors(){
    var visorsId = [];
    $("#table").bootstrapTable('getSelections').forEach(function (row){
        removeVisor(row).then(function(response){
            visorsId.push(row.id);
            $("#table").bootstrapTable('remove', {field: 'id', values: visorsId});
        });
    })

}

function removeVisor(visor){
    return $.ajax({
        //url: apiPath + "/delMap.php",
        url: "",
        data: {
            "visorName" : visor.name,
            "visorId" : visor.id
        },
        method: "POST",
        success: function(response){
            console.log("Borrado ->" + visor.id)
        }
    });
}