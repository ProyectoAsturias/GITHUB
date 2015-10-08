$(document).ready(function(){
    attachMapEventHandler();
})

function attachMapEventHandler(){
    $('.chosen-select').chosen({width:"80%",search_contains:true, placeholder_text_single: "Seleccione un WMS"});
    $.ajax({
        url: "../../Tables/php/userContent.php",
        data: {
            tag: "userMapNames"
        },
        method: "POST",
        success: function (response) {
            var mapList=JSON.parse(response);
            console.log(mapList);
            $("#selectMap").empty();
            var hiddenList="";
            for(var i=0; i<mapList.length; i++){
                $("#selectMap").append("<option value=\""+mapList[i].name+"\">"+mapList[i].name+"</option>");
                hiddenList+="<input type=\"hidden\" id=\""+mapList[i].name+"\" value=\""+mapList[i].entityId+"\">";
            }
            $('#selectMap').append(hiddenList);
            $('#selectMap').prop('selectedIndex', -1);
            $(".chosen-select").trigger("chosen:updated");
        }
    });
    $("#attachMapButton").click(function(){
        var mapName=$("#selectMap").val();
        var entityId=$("#"+mapName).val();
        var urlMap=serverGS+"geoserver/"+mapName+"/wms";
        attachMap(urlMap,entityId);
    });
}

function attachMap(wmsURL,entityId){
    console.log(wmsURL);
    if (wmsURL != ""){
        setMapURL(wmsURL);
        setMapEntity(entityId);
        updateMap();
        map.mapEntity= entityId;
        map.mapURL = wmsURL;
        updateTreeLayer();
        createLegendMap();
    }
}