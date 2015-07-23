$(document).ready(function(){
    makeFunctionsBarDraggable();
    makeToolsSortable();
    $(".ol-scale-line").draggable({
        containment: $(".ol-viewport")
    })
});

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
        helper: "clone",
        revert: false,
        tolerance: "pointer",
        over: function () {
            removeIntention = false;
        },
        out: function () {
            removeIntention = true;
        },
        beforeStop: function (event, ui) {
            if(removeIntention == true){
                ui.item.remove();
            }
        },
        receive: function(event, ui){
            var index = $(this).children().index($(ui.item[0]));
            if (index == -1) return;
            var element = $(ui.item[0]).clone(true).removeClass('box ui-draggable ui-draggable-dragging').addClass('box-clone');
            $(this).children(':eq('+index+')').after(element);
        }
    });

    $("#allTools").sortable({
        connectWith: ".functionsBar",
        cursor: "move",
        placeholder: "ui-state-highlight",
        opacity: "0.5",
        revert: false,
        tolerance: "pointer",
        helper: "clone",
        sort: function(e, ui) {
            $(ui.placeholder).html($(ui.item).html());
            $(ui.placeholder).addClass($(ui.item).attr('class'));
        },
        out: function(e, ui){
            $("#allTools").find('div:hidden').show();
        },
        stop: function(event, ui) {
            $(this).sortable('cancel');
        }
    });
}