interfaceShown = true;
$(document).ready(function (){
    $(".ol-viewport").append('<div id="hideInterface"></div>');
    hideInterfaceHandler();
})

function hideInterfaceHandler(){
    $("#hideInterface").on("click", function(event){
        if (interfaceShown)
            hideInterface();
        else
            showInterface();
    })
}

function showInterface(){
    $("#mapContainer").css("height", "85vh");
    $("#toolBarMax").removeClass("col-md-12");
    $("#toolBarMax").addClass("col-md-10");
    map.updateSize();
    $("#allTools").animate({height: "toggle"}, 0);
    $("#leftBarParent").animate({width: "toggle"}, 0);
    $(".functionsBar").show();
    $(".legendBar").show();
    $("#hideInterface").css("background-image", "url('../../Common/images/hideInterface-left.png')");
    interfaceShown = true;
}

function hideInterface(){
    $("#allTools").animate({height: "toggle"}, 0, function(){
        $("#mapContainer").css("height", "99vh");
        $("#toolBarMax").removeClass("col-md-10");
        $("#toolBarMax").addClass("col-md-12");
        $(".functionsBar").hide();
        $(".legendBar").hide();
        map.updateSize();
    });
    $("#leftBarParent").animate({width: "toggle"}, 0);
    $("#hideInterface").css("background-image", "url('../../Common/images/hideInterface-right.png')");
    interfaceShown = false;
}