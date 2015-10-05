$(document).ready(function(){
    attachMapEventHandler();
})

function removeReportHandler(){
    window.onbeforeunload = function(){

    }
}

function attachMapEventHandler(){
    $('.chosen-select').chosen({width:"80%",search_contains:true, placeholder_text_single: "Seleccione un WMS", allow_single_deselect: true});
    $.ajax({
        url: "../../Tables/php/userContent.php",
        data: {
            tag: "userMapNames"
        },
        method: "POST",
        success: function (response) {
            var mapList=JSON.parse(response); 
            $("#selectMap").empty();
            $("#selectMap").append("<option style='color: orange' value=\""+"Empty"+"\">"+"Eliminar mapa incrustado"+"</option>");
            for(var i=0; i<mapList.length; i++)
                $("#selectMap").append("<option value=\""+mapList[i].name+"\">"+mapList[i].name+"</option>");
            $('#selectMap').prop('selectedIndex', -1);
            $(".chosen-select").trigger("chosen:updated");
            
        }
    });
    $("#attachMapButton").click(function(){
        if ($("#selectMap").val() == "Empty"){
            attachMap("Empty");
        }else{
            var urlMap=serverGS+"geoserver/"+$("#selectMap").val()+"/wms";
            attachMap(urlMap);
        }
    });
}

function attachMap(wmsURL){
    if (wmsURL != ""){
        if (wmsURL == "Empty"){
            setMapURL(undefined);
            updateMap();
            var treeData = generateTreeData();
            createLayerTree(treeData);
            createEmptyLegend();
        }else{
            setMapURL(wmsURL);
            updateMap();
            map.mapURL = wmsURL;
            updateTreeLayer();
            createLegendMap();
        }
    }
}
