$(document).ready(function (){
    attachFullScreenControl();
    customizeFullScreenButton();
    FullScreenEventHandler();
});

/**
 * Creates and adds a default Openlayer3 full screen control to the map.
 * @method attachFullScreenControl
 * @return
 */
function attachFullScreenControl() {
    var fullScreenControl = new ol.control.FullScreen({});
    map.addControl(fullScreenControl);
}

/**
 * Adds click event handler and JQuery data attribute for this tool button.
 * @method FullScreenEventHandler
 * @return
 */
function FullScreenEventHandler() {
    $("#fullScreen").on("click", function (event) {
        $("#fullScreenDefaultButton").trigger("click");
    });
}


/**
 * Changes the default Openlayers3 button style and makes the button invisble, giving control to his parent div.
 * @method customizeFullScreenButton
 * @return
 */
function customizeFullScreenButton() {
    $(".ol-full-screen button").attr("id","fullScreenDefaultButton");
    removeChildrenClass($(".ol-full-screen"));
    $("#fullScreenDefaultButton").addClass("invisibleFullScreenButton");
}

/**
 * Removes the element and its children's classes.
 * @method removeChildrenClass
 * @param {} element
 * @return
 */
function removeChildrenClass(element){
    element.removeClass();
    element.children().each(function(){
        $(this).removeClass();
        removeChildrenClass($(this));
    });
}
