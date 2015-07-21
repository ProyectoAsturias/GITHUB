$(document).ready(function(){
    PanEventHandler();
});

/**
 * Add event handler to this tool button and Jquery data attribute.
 * @method PanEventHandler
 * @return
 */
function PanEventHandler() {
    $("#panTo").click(function () {
        var coordinates = [parseInt($("#panToDestination").val().split(",")[0]), parseInt($("#panToDestination").val().split(",")[1])];
        panToPosition(coordinates);
    });
}


/**
 * Pans (moves map center) to specifed coordinates.
 * @method panToPosition
 * @param {} coordinates[]
 * @return
 */
function panToPosition(coordinates){
    var pan = ol.animation.pan({
        duration: 2000,
        source: /** @type {ol.Coordinate} */ (map.getView().getCenter())
    });
    map.beforeRender(pan);
    console.log(coordinates);
    map.getView().setCenter(coordinates);
}
