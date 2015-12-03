var globalWmsLayersInfo = [];
$(document).ready(function(){
    attachMapEventHandler();
})

function attachMapEventHandler(){
    $('.chosen-select').chosen({width:"80%",search_contains:true, placeholder_text_single: "Seleccione un WMS"});
    $.ajax({
        url: "../../Tables/php/userContent.php",
        data: {
            tag: "userActiveMaps"
        },
        method: "POST",
        success: function (response) {
		//console.log(response);
            var mapList=JSON.parse(response);
            $("#selectMap").empty();
            $("#selectMap").append("<option style='color: orange' value=\""+"Empty"+"\">"+"Eliminar mapas actuales"+"</option>");
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
        if ($("#selectMap").val() == "Empty"){
            attachMap("Empty");
        }else{
            var mapName=$("#selectMap").val();
            var entityId=$("#"+mapName).val();
            var urlMap=serverGS+"geoserver/"+mapName+"/wms";
            attachMap(urlMap,entityId);
        }
    });
}

function attachMap(wmsURL,entityId){
    globalWmsLayersInfo = getLayersInfoWms(wmsURL);
    if (wmsURL != ""){
        if (wmsURL != "Empty") {
            addMapUrl(wmsURL);
            var treeDataSource = addLayersAndGroupsFromWMS(wmsURL);
            createLayerTreeFromSource(treeDataSource);
            createLegendMap(wmsURL);
            if (entityId != undefined)
                setBbox(entityId);
        }else{
            setMapURL(new Array());
            map.getLayers().getArray().forEach(function (layer){
                map.removeLayer(layer);
            })
            var treeData = generateTreeData();
            createEmptyLegend();
        }
    }
}

function getLayersInfoWms(wmsUrl){
    return [
        {
            url: "http://asturiasmodelo.dyndns.org:8090/geoserver/Allande_braulio/wms",
            layers: [
                {
                    name: "Concejos",
                    transparency: 0.7,
                    visible: true
                },
                {
                    name: "Depuradora",
                    transparency: 0.5,
                    visible:false
                }
            ]
        },
        {
            url: "wms2",
            layers: [
                {
                    name: "layer3",
                    transparency: 0.6
                },
                {
                    name: "layer4",
                    transparency: 1
                }
            ]
        }
    ];
}