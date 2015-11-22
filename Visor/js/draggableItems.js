var draggableButton = false;
$(document).ready(function (){
    $("#mapContainer").append('<div id="toolsDraggable"></div>');
    draggableButtonHandler();
    enableToolsDraggable();
})

function draggableButtonHandler(){
    $("#toolsDraggable").on("click", function(event){
        if (draggableButton)
            toolsFixed();
        else
            enableToolsDraggable();
    })
}

function toolsDraggable(){
    makeFunctionsBarDraggable();
    makeScaleDraggable();
    makeLegendBarDraggable();
    makeTreeViewDraggable();
    makeInfoWIndowDraggable();
    makeSearchWindowDraggable();
}

function toolsFixed(){
    makeFunctionsBarFixed();
    makeScaleFixed();
    makeLegendBarFixed();
    makeTreeViewFixed();
    makeInfoWindowFixed();
    makeSearchWindowFixed();
    $("#toolsDraggable").css("border", "solid 2px red");
    draggableButton=false;
}

function enableToolsDraggable(){
    enableFunctionsBarDraggable();
    enableInfoWindowDraggable();
    enableScaleDraggable();
    enableLegendBarDraggable();
    enableTreeViewDraggable();
    enableSearchWindowDraggable();
    $("#toolsDraggable").css("border", "solid 2px white");
    draggableButton=true;
}

/**
 * Make every element with class functionBar draggable.
 * @method makeFunctionsBarDraggable
 * @return
 */
function makeFunctionsBarDraggable() {
    $(".functionsBar").draggable({
        containment: $(".ol-viewport"),
        cancel: ".functionContainer",
        disabled: true
    });
}

function makeScaleDraggable() {
    $(".ol-scale-line").draggable({
        containment: $(".ol-viewport"),
        disabled: true
    })
}

function makeLegendBarDraggable() {
    $(".legendBar").draggable({
        containment: $(".ol-viewport"),
        cancel: ".functionContainer",
        disabled: true
    });
}

function makeTreeViewDraggable(){
    $("#layersTreeWrapper").draggable({
        containment: $(".ol-viewport"),
        disabled: true
    });
}

function makeInfoWIndowDraggable() {
    $("#info").draggable({
        containment: $(".ol-viewport")
    });
    $("#info").resizable({
   
    });
}

function makeSearchWindowDraggable(){
    $("#searchWindow").draggable({
        containment: $(".ol-viewport"),
        disabled: true
    }); 
}

function makeFunctionsBarFixed(){
    $( ".functionsBar" ).draggable( "option", "disabled", true );
}

function makeScaleFixed(){
    $( ".ol-scale-line" ).draggable( "option", "disabled", true );
}

function makeLegendBarFixed(){
    $( ".legendBar" ).draggable( "option", "disabled", true );
}

function makeTreeViewFixed(){
    $( "#layersTreeWrapper" ).draggable( "option", "disabled", true );
}

function makeInfoWindowFixed(){
    $( "#info" ).draggable( "option", "disabled", true );
}

function makeSearchWindowFixed(){
    $( "#searchWindow" ).draggable( "option", "disabled", true );
}

function enableFunctionsBarDraggable(){
    $( ".functionsBar" ).draggable( "option", "disabled", false );
}

function enableScaleDraggable(){
    $( ".ol-scale-line" ).draggable( "option", "disabled", false );
}

function enableLegendBarDraggable(){
    $( ".legendBar" ).draggable( "option", "disabled", false );
}

function enableTreeViewDraggable(){
    $( "#layersTreeWrapper" ).draggable( "option", "disabled", false );
}

function enableInfoWindowDraggable(){
    $( "#info" ).draggable( "option", "disabled", false );
}

function enableSearchWindowDraggable(){
    $( "#searchWindow" ).draggable( "option", "disabled", false );
}