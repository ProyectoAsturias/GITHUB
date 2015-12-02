interfaceShown = true;
$(document).ready(function (){
    $("#mapContainer").append('<div id="hideInterface" title="Ocultar interfaz"></div>');
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
    $("#layersTreeWrapper").show();
    $(".imagenFooterVisor").show();
    $("#hideInterface").css("background-image", "url('../../Common/images/hideInterface-left.png')");
    interfaceShown = true;
}

function hideInterface(){
    $(".functionsBar").hide();
    $(".legendBar").hide();
    $(".imagenFooterVisor").hide();
    $("#layersTreeWrapper").hide();
    $("#hideInterface").css("background-image", "url('../../Common/images/hideInterface-right.png')");
    interfaceShown = false;
}