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
    $("#mapContainer").css("height", "100vh");
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
        $("#mapContainer").css("width", "101vw");
        $(".functionsBar").hide();
        $(".legendBar").hide();
        $(".wrapper").removeClass("col-md-12");
        map.updateSize();
    });
    $("#leftBarParent").animate({width: "toggle"}, 0);
    $("#hideInterface").css("background-image", "url('../../Common/images/hideInterface-right.png')");
    interfaceShown = false;
}