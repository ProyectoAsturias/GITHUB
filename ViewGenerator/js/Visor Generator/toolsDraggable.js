function toolsDraggable(){
    makeFunctionsBarDraggable();
    makeToolsSortable();
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

function makeToolsSortable(){
    $(".functionsBar").sortable({
        connectWith: ".functionsBar",
        opacity: "0.7",
        cursor: "move",
        placeholder: "ui-state-highlight",
        revert: false,
        tolerance: "pointer",
        helper: "clone",
        over: function () {
            removeIntention = false;
        },
        sort: function(e, ui) {
            $(ui.placeholder).html($(ui.item).html());
            $(ui.placeholder).addClass($(ui.item).attr('class'));
        },
        out: function () {
            removeIntention = true;
        },
        beforeStop: function (event, ui) {
            if(removeIntention == true){
                ui.item.remove();
            }
        },
    }).disableSelection();

    $("#allTools").sortable({
        connectWith: ".functionsBar",
        cursor: "move",
        placeholder: "ui-state-highlight",
        opacity: "0.7",
        revert: false,
        tolerance: "pointer",
        helper: "clone",
        start: function(event, ui) {
            $('#allTools').find('div:hidden').show();
            clone = $(ui.item).clone();
            before = $(ui.item).prev();
        },
        sort: function(e, ui) {
            $(ui.placeholder).html($(ui.item).html());
            $(ui.placeholder).addClass($(ui.item).attr('class'));
        },
        beforeStop: function(event, ui){
            if (ui.item[0].parentElement.id=="allTools")
                 $(ui.item).remove();
        },
        stop: function(event, ui) {
            if(ui.item[0].parentElement){
                var funciones=ui.item[0].parentElement.children;
                if(ui.item[0].parentElement.classList[2]=="horizontal"){
                    if (funciones.length>13)
                        funciones[13].remove();
                }
                else if(ui.item[0].parentElement.classList[2]=="vertical"){
                        if (funciones.length>9)
                            funciones[9].remove();         
                }
            }
            before.after(clone);
            //$(this).sortable('cancel');
        }
    }).disableSelection();
}

function makeLegendBarDraggable() {
    $(".legendBar").draggable({
        containment: $(".ol-viewport"),
        cancel: ".functionContainer"
    });
}

