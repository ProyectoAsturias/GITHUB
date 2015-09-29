function toolsDraggable(){
    makeFunctionsBarDraggable();
    $(".ol-scale-line").draggable({
        containment: $(".ol-viewport")
    })
    makeLegendBarDraggable();
}

/**
 * Make every element with class functionBar draggable.
 * @method makeFunctionsBarDraggable
 * @return
 */
function makeFunctionsBarDraggable() {
    $(".functionsBar").draggable({
        containment: $(".ol-viewport"),
        cancel: ".functionContainer"
    });
}

function makeLegendBarDraggable() {
    $(".legendBar").draggable({
        containment: $(".ol-viewport"),
        cancel: ".functionContainer"
    });
}

