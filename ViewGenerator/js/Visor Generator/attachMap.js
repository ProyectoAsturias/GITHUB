$(document).ready(function(){
    attachMapEventHandler();
})

function attachMapEventHandler(){
    $('.chosen-select').chosen({width:"80%",search_contains:true});
    $.ajax({
        url: "../../../Tables/php/userContent.php",
        data: {
            tag: "userMapNames"
        },
        method: "POST",
        success: function (response) {
            var mapList=JSON.parse(response); 
            $("#selectMap").empty();
            for(var i=0; i<mapList.length; i++)
                $("#selectMap").append("<option value=\""+mapList[i].name+"\">"+mapList[i].name+"</option>");
            $('#selectMap').prop('selectedIndex', -1);
            $(".chosen-select").trigger("chosen:updated");
            
        }
    });
    $("#attachMapButton").click(function(){
        var urlMap=server+"geoserver/"+$("#selectMap").val()+"/wms";
        attachMap(urlMap);
    });
}

function attachMap(wmsURL){
    console.log(wmsURL);
    if (wmsURL != ""){
        setMapURL(wmsURL);
        updateMap();
        map.mapURL = wmsURL;
        updateTreeLayer();
        createLegendMap();
    }
}
