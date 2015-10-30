interfaceShown = true;
$(document).ready(function (){
    $("#mapContainer").append('<div id="hideInterface"></div>');
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
    $(".functionsBar").show();
    $(".legendBar").show();
    $("#hideInterface").css("background-image", "url('../../Common/images/hideInterface-left.png')");
    interfaceShown = true;
}

function hideInterface(){
    $(".functionsBar").hide();
    $(".legendBar").hide();
    $("#hideInterface").css("background-image", "url('../../Common/images/hideInterface-right.png')");
    interfaceShown = false;
}